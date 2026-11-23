// Vorlesen für die Toolbox-Arbeitsblätter (Umbau 21.11.): sammelt jede Geschichte (Baustein „geschichte“) aller Blätter, gibt ihr
// einen festen Hör-Code und schreibt je Bereich und Sprache tmp/hefte/<modul>/spuren.json für tools/hefte/audio.py.
//   npx tsx --tsconfig tsconfig.scripts.json tools/hefte/toolbox-spuren.ts            → Spurlisten schreiben (danach audio.py je Modul)
//   npx tsx --tsconfig tsconfig.scripts.json tools/hefte/toolbox-spuren.ts --liste    → src/blatt/hoeren.json aus den fertigen MP3s
// Code: tb<Kürzel der Blattnummer>[f]-<Nummer><a|b…>, z. B. G-20 (Deutsch) → tbg-20a, französisch → tbgf-20a.
// Die Nummern ändern sich nicht (neue Blätter kommen hinten dazu), darum bleiben die Codes gültig.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { nummerieren } from '../../src/blatt/nummern'
import { bausteinPfade } from '../../src/blatt/hoeren'
import type { Blatt, Sprache } from '../../src/blatt/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const ordner = join(ROOT, 'src/data/blaetter')
const dateien: Record<string, Blatt[]> = {}
for (const d of readdirSync(ordner)) if (d.endsWith('.json')) dateien[d] = JSON.parse(readFileSync(join(ordner, d), 'utf8'))
const blaetter = nummerieren(dateien)

const BEREICH: Record<string, { de: string; fr: string }> = {}
type Spur = { code: string; titel: string; art: 'lesen'; lektion: number; teile: { text: string }[] }
const module = new Map<string, { sprache: Sprache; titel: { de: string; fr: string }; spuren: Spur[] }>()
const liste: Record<string, Partial<Record<Sprache, Record<string, string>>>> = {}
// Ohne Hördatei: S-143 „KI klug nutzen“ – Antwort C mischt Deutsch und Französisch (eine Stimme liest den anderen Teil
// falsch); damit die drei Antworten gleich behandelt werden, haben auch A und B keinen QR-Code
const AUSLASSEN = new Set(['tbs-143a', 'tbs-143b', 'tbs-143c', 'tbsf-143a', 'tbsf-143b', 'tbsf-143c'])

// Ohne Hördateien (Auftrag 23.11.2026: Hörtexte nur in Deutsch und Französisch): Mathe-Blätter und Kernkompetenz Rechnen
const ohneHoeren = (b: Blatt, kuerzel: string) => kuerzel === 'ma' || b.id.startsWith('mathe-') || /^kk-r\d/.test(b.id)

for (const b of blaetter) {
  const [kuerzel, num] = b.nr.toLowerCase().split('-')
  if (ohneHoeren(b, kuerzel)) continue
  for (const sprache of ['de', 'fr'] as Sprache[]) {
    const inhalt = b[sprache]
    if (!inhalt) continue
    const modul = 'tb' + kuerzel.replace(/[^a-z]/g, '') + (sprache === 'fr' ? 'f' : '')
    // Geschichten: Buchstaben a, b, …; längere Lesetexte (ab 35 Wörtern, Stufe C4–ES): x, y, z – getrennt gezählt, damit
    // die Codes der Geschichten gleich bleiben
    let buchstabe = 0
    let textNr = 0
    // gleicher Text wie auf dem deutschen Blatt (z. B. Deutsch-Blätter auf Französisch): deutsche Hördatei mitbenutzen
    const deutsch = sprache === 'fr' && b.de ? new Map(bausteinPfade(b.de.bausteine).map(([x, p]) => [p, x])) : undefined
    const jugend = b.stufen.some((s) => s === 'C4' || s === 'ES') && !b.stufen.includes('C1') && !b.stufen.includes('C2')
    for (const [baustein, pfad] of bausteinPfade(inhalt.bausteine)) {
      const lesetext = baustein.art === 'text' && jugend && !baustein.klein && baustein.text.split(/\s+/).length >= 35
      if (baustein.art !== 'geschichte' && !lesetext) continue
      const code = baustein.art === 'geschichte' ? `${modul}-${num}${'abcdefgh'[buchstabe++]}` : `${modul}-${num}${'xyzuvw'[textNr++]}`
      const de = deutsch?.get(pfad)
      if (de && 'text' in de && de.text === baustein.text) {
        const deCode = liste[b.id]?.de?.[pfad]
        if (deCode) ((liste[b.id] ??= {}).fr ??= {})[pfad] = deCode
        continue
      }
      if (AUSLASSEN.has(code)) continue
      if (!module.has(modul)) {
        BEREICH[modul] ??= { de: `Toolbox · Arbeitsblätter ${b.nr.split('-')[0]}`, fr: `Toolbox · fiches ${b.nr.split('-')[0]}` }
        module.set(modul, { sprache, titel: BEREICH[modul], spuren: [] })
      }
      const zt = baustein.art === 'geschichte' ? baustein.titel : undefined
      const titel = `${b.nr} · ${inhalt.titel}${zt ? ' – ' + zt : ''}`
      const teile = [...(zt ? [{ text: zt }] : []), { text: baustein.text }]
      module.get(modul)!.spuren.push({ code, titel, art: 'lesen', lektion: Number(num) || 0, teile })
      ;((liste[b.id] ??= {})[sprache] ??= {})[pfad] = code
    }
  }
}

if (process.argv.includes('--liste')) {
  // nur Codes, deren MP3 es gibt
  let n = 0
  for (const id of Object.keys(liste)) for (const sp of Object.keys(liste[id]) as Sprache[]) for (const [p, code] of Object.entries(liste[id][sp]!)) {
    if (existsSync(join(ROOT, 'h/a', code + '.mp3'))) n++
    else delete liste[id][sp]![p]
  }
  writeFileSync(join(ROOT, 'src/blatt/hoeren.json'), JSON.stringify(liste) + '\n')
  console.log(`src/blatt/hoeren.json: ${n} Geschichten mit Hördatei`)
} else {
  for (const [modul, m] of module) {
    mkdirSync(join(ROOT, 'tmp/hefte', modul), { recursive: true })
    writeFileSync(join(ROOT, 'tmp/hefte', modul, 'spuren.json'), JSON.stringify({ modul, titel: m.titel, sprache: m.sprache, spuren: m.spuren }, null, 1))
    console.log(`${modul}: ${m.spuren.length} Geschichten (${m.sprache})`)
  }
}

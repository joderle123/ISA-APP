// Seitenprüfung aller Arbeitsblätter (Deutsch und – wo vorhanden – Französisch):
//   • die Seite „Für die Lehrperson“ ist genau EINE Seite,
//   • der Schülerteil hat höchstens 2 Seiten (C1 und C2: 1 Seite),
//   • Bereich Spielschule: Schülerteil höchstens 2 Seiten (Bildkarten + Blatt), für die Lehrperson 2 Seiten
//     (Lehrerseite + „Aktivitäten & Ideen“), dazu je 1 Seite „Forschen“ (mit `experiment`) und „Beobachten &
//     Begleiten“; jede Zusatzseite (Klassenraster, Portfolio-Blatt, Elternbrief, Forscherblatt) genau 1 Seite,
//   • keine leere Seite (nur Kopf/Fußzeile),
//   • jede Seite trägt den Urheber-Vermerk des Bereichs in der Sprache des Blatts (urheberschaft in
//     src/lib/urheber.ts) und daneben in der Fußzeile das CDSE-Logo (src/lib/cdse-logo.ts) – außer in der
//     Spielschule (Michèle Wagner, ohne CDSE und ohne Logo).
//   npx tsx --tsconfig tsconfig.scripts.json scripts/blatt-seiten.tsx [id|bereich …] [--datei=tmp/…/x.json]
//   (--datei: zusätzlich Blätter aus einer Datei außerhalb von src/data/blaetter prüfen, z. B. Entwürfe)
// Braucht python3 mit PyMuPDF für die Textprüfung. Fehler → Exit-Code 1.
import { renderToBuffer } from '@react-pdf/renderer'
import { mkdtempSync, readFileSync, readdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { BlattDokument } from '../src/blatt/pdf/BlattDokument'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import type { Blatt, Sprache } from '../src/blatt/typen'
import { nummerieren } from '../src/blatt/nummern'
import { urheberschaft } from '../src/lib/urheber'
import { hatBegleiten, zusaetzeVon, type Zusatz } from '../src/blatt/spielschule'
import { experimentVon } from '../src/blatt/forschen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const auswahl = process.argv.slice(2).filter((a) => !a.startsWith('--'))

const ordner = join(ROOT, 'src/data/blaetter')
const dateien: Record<string, Blatt[]> = {}
for (const d of readdirSync(ordner)) if (d.endsWith('.json')) dateien[d] = JSON.parse(readFileSync(join(ordner, d), 'utf8'))
for (const a of process.argv.slice(2)) if (a.startsWith('--datei=')) dateien[a.slice(8)] = JSON.parse(readFileSync(a.slice(8), 'utf8')) // Name wie spielschule-3.json → Bereich und Nummer
const alle = nummerieren(dateien)
const liste = auswahl.length ? alle.filter((b) => auswahl.some((a) => a === b.id || a === b.bereich || a === b.nr)) : alle

const tmp = mkdtempSync(join(tmpdir(), 'blatt-seiten-'))
const auftraege: { datei: string; blatt: Blatt & { nr: string }; sprache: Sprache; teil: 'schueler' | 'lehrer' | Zusatz }[] = []
for (const blatt of liste) {
  for (const sprache of ['de', 'fr'] as Sprache[]) {
    if (sprache === 'fr' && !blatt.fr) continue
    for (const teil of ['schueler', 'lehrer'] as const) {
      const datei = join(tmp, `${blatt.nr}_${sprache}_${teil}.pdf`)
      const buf = await renderToBuffer(<BlattDokument blatt={blatt} opt={{ sprache, nr: blatt.nr, schueler: teil === 'schueler', lehrer: teil === 'lehrer' }} />)
      writeFileSync(datei, buf)
      auftraege.push({ datei, blatt, sprache, teil })
    }
    // Spielschule: jede Zusatzseite einzeln (wie in der App angeboten)
    for (const z of zusaetzeVon(blatt, sprache)) {
      const datei = join(tmp, `${blatt.nr}_${sprache}_${z}.pdf`)
      writeFileSync(datei, await renderToBuffer(<BlattDokument blatt={blatt} opt={{ sprache, nr: blatt.nr, schueler: false, lehrer: false, zusaetze: [z] }} />))
      auftraege.push({ datei, blatt, sprache, teil: z })
    }
  }
}

// Seiten zählen und leere Seiten finden (Text ohne Fußzeile „CDSE Toolbox … Seite x / y“, ohne
// Urheber-Vermerk „© …“ und ohne das Logo daneben); je Seite außerdem, welcher Vermerk darauf steht
// und wie oft ein Bild in der Fußzeile steht (unterste 45 pt; das Logo)
const py = `
import json, sys, pymupdf
auftrag = json.load(open(sys.argv[1]))
out = {}
for f in auftrag['dateien']:
    d = pymupdf.open(f)
    seiten = []
    for p in d:
        t = p.get_text()
        zeilen = [z for z in t.splitlines() if z.strip() and not any(m in z for m in auftrag['marken']) and not z.strip().startswith(('Seite ', 'Page ', '©'))]
        bilder = p.get_image_info()
        fuss = [b for b in bilder if p.rect.height - b['bbox'][1] < 45]
        seiten.append({'inhalt': len(''.join(zeilen)) + (len(bilder) - len(fuss)) * 50 + len(p.get_drawings()), 'vermerk': auftrag['vermerk'][f] in t, 'logos': len(fuss)})
    out[f] = seiten
print(json.dumps(out))
`
const listeDatei = join(tmp, 'liste.json')
const marken = [...new Set(auftraege.flatMap((a) => Object.values(urheberschaft(a.blatt.bereich).marke)))]
const vermerk = Object.fromEntries(auftraege.map((a) => [a.datei, urheberschaft(a.blatt.bereich).text[a.sprache]]))
writeFileSync(listeDatei, JSON.stringify({ dateien: auftraege.map((a) => a.datei), vermerk, marken }))
const ergebnis = JSON.parse(execFileSync('python3', ['-c', py, listeDatei], { maxBuffer: 64 * 1024 * 1024 }).toString()) as Record<string, { inhalt: number; vermerk: boolean; logos: number }[]>

let fehler = 0
for (const a of auftraege) {
  const seiten = ergebnis[a.datei] ?? []
  const wo = `${a.blatt.nr} ${a.blatt.id} ${a.sprache.toUpperCase()} ${a.teil === 'lehrer' ? 'Lehrerseite' : a.teil === 'schueler' ? 'Schülerteil' : a.teil}`
  const spielschule = a.blatt.bereich === 'spielschule'
  const begleiten = hatBegleiten(a.blatt, ((a.sprache === 'fr' && a.blatt.fr) || a.blatt.de).lehrer.spielschule)
  const forschen = experimentVon(a.blatt, a.sprache) ? 1 : 0
  const max =
    a.teil === 'lehrer' ? (spielschule ? 2 + (begleiten ? 1 : 0) + forschen : 1) : a.teil !== 'schueler' ? 1 : spielschule ? 2 : a.blatt.stufen.every((s) => s === 'C1' || s === 'C2') ? 1 : 2
  const probleme: string[] = []
  if (seiten.length > max) probleme.push(`${seiten.length} Seiten (erlaubt: ${max})`)
  const u = urheberschaft(a.blatt.bereich)
  seiten.forEach(({ inhalt, vermerk, logos }, i) => {
    if (inhalt < 40) probleme.push(`Seite ${i + 1} ist (fast) leer`)
    if (u.logo && logos !== 1) probleme.push(`Seite ${i + 1}: ohne CDSE-Logo in der Fußzeile`)
    if (!u.logo && logos > 0) probleme.push(`Seite ${i + 1}: Logo in der Fußzeile, obwohl der Bereich keines trägt`)
    if (!vermerk) probleme.push(`Seite ${i + 1}: ohne Urheber-Vermerk „${u.text[a.sprache]}“`)
  })
  if (probleme.length) {
    fehler++
    console.log(`✗ ${wo}: ${probleme.join(' · ')}`)
  }
}
rmSync(tmp, { recursive: true, force: true })
console.log(`\n${liste.length} Blätter, ${auftraege.length} PDF-Teile geprüft – ${fehler} mit Problemen`)
process.exit(fehler ? 1 : 0)

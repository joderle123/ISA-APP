// Prüfliste Luxemburgisch: alle LB-Wörter, Sätze der Woche und LB-Elternbriefe der Spielschul-Einheiten, die noch
// nicht von einer Muttersprachlerin gegengelesen sind (geprueft: false) – jedes Wort nur einmal, mit deutscher
// Bedeutung und den Einheiten, in denen es vorkommt. Dazu die festen LB-Überschriften aus src/blatt/spielschule.ts.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/lb-liste.ts [datei.json …] [--alle] [--md=liste.md] [--csv=liste.csv]
//   --alle  auch bereits geprüfte Einträge
//   --md    als Markdown-Tabelle speichern (zum Ausdrucken), --csv für eine Tabellenkalkulation (Spalte „Korrektur“)
// Nach der Prüfung: Korrekturen in die Einheiten übernehmen und dort `geprueft: true` setzen.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Blatt } from '../src/blatt/typen'
import { BRIEF_TEXT } from '../src/blatt/spielschule'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const alle = args.includes('--alle')
const wert = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3)
const ordner = join(ROOT, 'src/data/blaetter')
const dateien = [
  ...readdirSync(ordner).filter((d) => d.startsWith('spielschule') && d.endsWith('.json')).map((d) => join(ordner, d)),
  ...args.filter((a) => a.endsWith('.json') && !a.startsWith('--')),
]

interface Eintrag {
  art: 'Wort' | 'Satz' | 'Brief' | 'Überschrift'
  lb: string
  de: string
  einheiten: string[]
}
const eintraege = new Map<string, Eintrag>()
function add(art: Eintrag['art'], lb: string | undefined, de: string | undefined, einheit: string) {
  if (!lb?.trim()) return
  const key = `${art}|${lb.trim()}|${(de ?? '').trim()}`
  const e = eintraege.get(key) ?? { art, lb: lb.trim(), de: (de ?? '').trim(), einheiten: [] }
  if (!e.einheiten.includes(einheit)) e.einheiten.push(einheit)
  eintraege.set(key, e)
}

for (const datei of dateien) {
  const blaetter = JSON.parse(readFileSync(datei, 'utf8')) as Blatt[]
  for (const b of blaetter) {
    const s = b.woche?.sprachen
    if (s && (alle || s.geprueft !== true)) {
      for (const w of s.woerter ?? []) add('Wort', w.lb, w.de, b.id)
      add('Satz', s.satz?.lb, s.satz?.de, b.id)
    }
    const lb = b.woche?.elternbrief?.lb
    const de = b.woche?.elternbrief?.de
    if (lb && (alle || lb.geprueft !== true)) for (const k of ['woche', 'idee', 'bitte'] as const) add('Brief', lb[k], de?.[k], b.id)
  }
}
// feste Überschriften (Elternbrief, Seite „Beobachten & Begleiten“)
for (const k of ['anrede', 'woche', 'idee', 'bitte', 'woerter', 'satz'] as const) add('Überschrift', BRIEF_TEXT.lb[k], BRIEF_TEXT.de[k], 'alle Einheiten')

const liste = [...eintraege.values()].sort((a, b) => a.art.localeCompare(b.art) || a.lb.localeCompare(b.lb, 'lb'))
const titel: Record<Eintrag['art'], string> = { Wort: 'Wörter der Woche', Satz: 'Sätze der Woche', Brief: 'Elternbriefe', Überschrift: 'Feste Überschriften' }

// Konsole: kurz und gruppiert
for (const art of ['Wort', 'Satz', 'Brief', 'Überschrift'] as const) {
  const teil = liste.filter((e) => e.art === art)
  if (!teil.length) continue
  console.log(`\n${titel[art]} (${teil.length})`)
  for (const e of teil) console.log(`  ${e.lb.padEnd(32)} ${e.de.padEnd(32)} ${e.einheiten.length > 3 ? `${e.einheiten.length} Einheiten` : e.einheiten.join(', ')}`)
}
console.log(`\n${liste.length} Einträge${alle ? '' : ' (nur ungeprüfte)'} aus ${dateien.length} Dateien`)

const md = wert('md')
if (md) {
  const zeilen = [
    '# Prüfliste Lëtzebuergesch – Spielschule',
    '',
    'Bitte jede Zeile gegen LOD (lod.lu) prüfen: Schreibweise, Artikel, Genus. Stimmt etwas nicht, die richtige Form in „Korrektur“ eintragen.',
    '',
  ]
  for (const art of ['Wort', 'Satz', 'Brief', 'Überschrift'] as const) {
    const teil = liste.filter((e) => e.art === art)
    if (!teil.length) continue
    zeilen.push(`## ${titel[art]}`, '', '| Nr. | Lëtzebuergesch | Deutsch | Einheiten | ok | Korrektur |', '|---|---|---|---|---|---|')
    teil.forEach((e, i) => zeilen.push(`| ${i + 1} | ${e.lb.replace(/\|/g, '/')} | ${e.de.replace(/\|/g, '/')} | ${e.einheiten.length > 3 ? `${e.einheiten.length} Einheiten` : e.einheiten.join(', ')} | ☐ | |`))
    zeilen.push('')
  }
  writeFileSync(md, zeilen.join('\n'))
  console.log('✓', md)
}
const csv = wert('csv')
if (csv) {
  const q = (x: string) => `"${x.replace(/"/g, '""')}"`
  const zeilen = ['Art;Lëtzebuergesch;Deutsch;Einheiten;ok;Korrektur', ...liste.map((e) => [e.art, e.lb, e.de, e.einheiten.join(', '), '', ''].map(q).join(';'))]
  writeFileSync(csv, '﻿' + zeilen.join('\n'))
  console.log('✓', csv)
}

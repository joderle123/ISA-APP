// Forscherkartei Spielschule als PDF: alle Experimente der Woche (Deckblatt, Inhalt, je Experiment eine Seite,
// Register nach Phänomenen), nach Jahreszeiten und Themen geordnet.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/forscherkartei.tsx [ausgabeordner] [--fr] [--png] [--datei=x.json …] [--nur-datei]
// Ohne Ordner landen die PDFs in tmp/forscherkartei (nicht im Repo). Ohne --fr nur Deutsch.
// --datei: zusätzlich Einheiten aus einer Datei (Entwürfe), --nur-datei: nur diese. Mit --png jede Seite als Bild.
// Prüft, dass die Kartei so viele Seiten hat wie geplant (jedes Experiment genau eine Seite) – sonst Exit-Code 1.
import { renderToFile } from '@react-pdf/renderer'
import { mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { ForscherkarteiDokument, forscherkarteiDateiname, karteiAufbau, karteiEintraege, type KarteiQuelle } from '../src/blatt/pdf/Forscherkartei'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { nummerieren } from '../src/blatt/nummern'
import type { Blatt, Sprache } from '../src/blatt/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const ziel = args.find((a) => !a.startsWith('--')) ?? join(ROOT, 'tmp/forscherkartei')
mkdirSync(ziel, { recursive: true })

const quellen: KarteiQuelle[] = []
if (!args.includes('--nur-datei')) {
  const ordner = join(ROOT, 'src/data/blaetter')
  const dateien: Record<string, Blatt[]> = {}
  for (const d of readdirSync(ordner)) if (d.startsWith('spielschule') && d.endsWith('.json')) dateien[d] = JSON.parse(readFileSync(join(ordner, d), 'utf8'))
  for (const b of nummerieren(dateien)) quellen.push({ blatt: b, nr: b.nr })
}
let x = 0
for (const a of args.filter((a) => a.startsWith('--datei='))) for (const b of JSON.parse(readFileSync(a.slice(8), 'utf8')) as Blatt[]) quellen.push({ blatt: b, nr: `X-${String(++x).padStart(2, '0')}` })

const sprachen: Sprache[] = args.includes('--fr') ? ['de', 'fr'] : ['de']
for (const sprache of sprachen) {
  const eintraege = karteiEintraege(quellen, sprache)
  const soll = karteiAufbau(eintraege, sprache).gesamt
  const datei = join(ziel, forscherkarteiDateiname(sprache))
  await renderToFile(<ForscherkarteiDokument blaetter={quellen} sprache={sprache} />, datei)
  const seiten = readFileSync(datei, 'latin1').match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0
  if (seiten !== soll) {
    console.error(`✗ ${datei}: ${seiten} Seiten statt ${soll} – eine Experiment-Seite läuft über, die Seitenzahlen in Inhalt und Register stimmen nicht.`)
    process.exitCode = 1
  }
  if (args.includes('--png')) execFileSync('python3', ['-c', `import pymupdf,sys\nd=pymupdf.open(sys.argv[1])\nfor i,p in enumerate(d): p.get_pixmap(dpi=int(sys.argv[2])).save(sys.argv[1][:-4]+'-%02d.png'%(i+1))`, datei, '80'])
  console.log(`✓ ${datei}: ${eintraege.length} Experimente, ${seiten} Seiten`)
}

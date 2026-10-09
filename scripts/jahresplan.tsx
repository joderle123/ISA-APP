// Jahresplan Spielschule als PDF (A4 quer): Drei-Jahres-Rad mit Festkalender, Wochenübersicht und
// Kompetenzlandkarte je Jahr, Joker und Register. Der Plan steht in src/data/spielschule-jahresplan.json
// (erzeugt von scripts/spielschule-jahresplan.ts); Titel und Experimente kommen aus den Blättern.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/jahresplan.tsx [ausgabeordner] [--png]
// Ohne Ordner landet das PDF in tmp/jahresplan (nicht im Repo). Mit --png jede Seite als Bild.
// Exit-Code 1, wenn eine Seite überläuft (mehr Seiten als geplant) oder der Plan nicht zu den Einheiten passt.
import { renderToFile } from '@react-pdf/renderer'
import { mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { JahresplanDokument, JAHRESPLAN_SEITEN, jahresplanDateiname, jahresplanFehler, type JahresplanQuelle } from '../src/blatt/pdf/Jahresplan'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { nummerieren } from '../src/blatt/nummern'
import type { Blatt } from '../src/blatt/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const ziel = args.find((a) => !a.startsWith('--')) ?? join(ROOT, 'tmp/jahresplan')
mkdirSync(ziel, { recursive: true })

const ordner = join(ROOT, 'src/data/blaetter')
const dateien: Record<string, Blatt[]> = {}
for (const d of readdirSync(ordner)) if (d.startsWith('spielschule') && d.endsWith('.json')) dateien[d] = JSON.parse(readFileSync(join(ordner, d), 'utf8'))
const quellen: JahresplanQuelle[] = nummerieren(dateien).map((b) => ({ blatt: b, nr: b.nr }))

const fehler = jahresplanFehler(quellen)
for (const f of fehler) console.error('✗ ' + f)
if (fehler.length) process.exitCode = 1

const datei = join(ziel, jahresplanDateiname())
await renderToFile(<JahresplanDokument blaetter={quellen} />, datei)
const seiten = readFileSync(datei, 'latin1').match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0
if (seiten !== JAHRESPLAN_SEITEN) {
  console.error(`✗ ${datei}: ${seiten} Seiten statt ${JAHRESPLAN_SEITEN} – eine Seite läuft über.`)
  process.exitCode = 1
}
if (args.includes('--png')) execFileSync('python3', ['-c', `import pymupdf,sys\nd=pymupdf.open(sys.argv[1])\nfor i,p in enumerate(d): p.get_pixmap(dpi=int(sys.argv[2])).save(sys.argv[1][:-4]+'-%02d.png'%(i+1))`, datei, args.find((a) => a.startsWith('--dpi='))?.slice(6) ?? '80'])
console.log(`${process.exitCode ? '✗' : '✓'} ${datei}: ${seiten} Seiten`)

// Setzt Förderfach-Einheiten so, wie sie im Lehrerhandbuch stehen (Übersichtsseite und Schritt für
// Schritt), auf Deutsch und Französisch – zum Ansehen, ohne das ganze Handbuch zu setzen.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/foerderfach-einheit.tsx <entwurf.json …> [--png] [--ordner=pfad]
// Meldet je Sprache die Seitenzahl und ob die Übersicht (Ziele, Ablauf, Material, Vorbereitung,
// Kopiervorlagen, Wortspeicher, Achtung) auf eine A4-Seite passt – sonst ✗ (Exit-Code 1).
// Ausgabe: tmp/foerderfach-einheit/<id>_<de|fr>.pdf, mit --png jede Seite als Bild (<id>_<de|fr>-1.png …).
import { Document, renderToFile } from '@react-pdf/renderer'
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { EinheitSeiten } from '../src/foerderfach/pdf/Handbuch'
import { blattById, planVon } from '../src/foerderfach/daten'
import type { Blatt } from '../src/blatt/typen'
import type { EinheitenDatei, Sprache } from '../src/foerderfach/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const png = args.includes('--png')
const ziel = args.find((a) => a.startsWith('--ordner='))?.slice(9) ?? join(ROOT, 'tmp/foerderfach-einheit')
mkdirSync(ziel, { recursive: true })

function seitenzahl(datei: string): number {
  return readFileSync(datei, 'latin1').match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0
}

// Alle Blätter: fertige und die aller Entwürfe (gemeinsame Blätter legt eine andere Einheit an)
const blaetter = new Map<string, Blatt>(blattById)
const ordner = join(ROOT, 'src/data/foerderfach/entwurf')
for (const d of existsSync(ordner) ? readdirSync(ordner).filter((x) => x.endsWith('.json')) : []) {
  try {
    for (const b of (JSON.parse(readFileSync(join(ordner, d), 'utf8')) as EinheitenDatei).blaetter ?? []) blaetter.set(b.id, b)
  } catch {
    // ein Entwurf, der gerade geschrieben wird, ist noch kein gültiges JSON
  }
}

for (const datei of args.filter((a) => a.endsWith('.json'))) {
  const d = JSON.parse(readFileSync(datei, 'utf8')) as EinheitenDatei
  for (const b of d.blaetter ?? []) blaetter.set(b.id, b)
  for (const e of d.einheiten) {
    const plan = planVon(e.klasse)
    for (const sprache of ['de', 'fr'] as Sprache[]) {
      const pdf = join(ziel, `${e.id}_${sprache}.pdf`)
      const marken = new Map<string, number>()
      await renderToFile(
        <Document>
          <EinheitSeiten e={e} plan={plan} sprache={sprache} blaetter={blaetter} marken={marken} />
        </Document>,
        pdf,
      )
      const n = seitenzahl(pdf)
      const uebersicht = (marken.get(`s-${e.id}`) ?? 2) - (marken.get(`c-${e.id}`) ?? 1)
      const passt = uebersicht <= 1
      if (!passt) process.exitCode = 1
      console.log(`${passt ? '✓' : '✗'} ${e.id} ${sprache}: ${n} Seiten, Übersicht ${passt ? 'auf einer Seite' : `auf ${uebersicht} Seiten – kürzen (Material, Vorbereitung, Achtung)`}  ${pdf}`)
      if (png) execFileSync('python3', ['-c', `import pymupdf,sys\nd=pymupdf.open(sys.argv[1])\nfor i,p in enumerate(d): p.get_pixmap(dpi=70).save(sys.argv[1][:-4]+'-%d.png'%(i+1))`, pdf])
    }
  }
}

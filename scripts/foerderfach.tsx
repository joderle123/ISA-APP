// Förderfach „Skills fir d’Liewen“ als PDF – Lehrerhandbuch und Schülerheft (Muster 7e),
// Deutsch und Französisch:
//   npx tsx --tsconfig tsconfig.scripts.json scripts/foerderfach.tsx [ausgabeordner] [--png]
// Ohne Ordner landen die PDFs in tmp/foerderfach (nicht im Repo). Mit --png zusätzlich jede
// Seite als Bild (PyMuPDF), zum Ansehen.
// Reihenfolge: zuerst das Schülerheft (es liefert die Seitenzahlen für die Verweise im
// Handbuch), dann das Handbuch in zwei Durchläufen (der erste sammelt die Seitenzahlen für
// das Inhaltsverzeichnis, der zweite setzt sie ein).
import { renderToFile } from '@react-pdf/renderer'
import { mkdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { HandbuchDokument, type HandbuchDaten } from '../src/foerderfach/pdf/Handbuch'
import { SchuelerheftDokument } from '../src/foerderfach/pdf/Schuelerheft'
import { EINHEITEN, HANDBUCH, PLAENE, blattById, planVon } from '../src/foerderfach/daten'
import type { Klasse, Sprache } from '../src/foerderfach/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const ziel = args.find((a) => !a.startsWith('--')) ?? join(ROOT, 'tmp/foerderfach')
mkdirSync(ziel, { recursive: true })

const klasse: Klasse = '7e'
const plan = planVon(klasse)
const einheiten = EINHEITEN.filter((e) => e.klasse === klasse)
const sprachen: Sprache[] = ['de', 'fr']

const NAME: Record<Sprache, { handbuch: string; heft: string }> = {
  de: { handbuch: 'Lehrerhandbuch', heft: 'Schuelerheft' },
  fr: { handbuch: 'Guide-enseignant', heft: 'Cahier-eleve' },
}
const dateiname = (art: 'handbuch' | 'heft', sprache: Sprache) => `Skills-fir-d-Liewen_${klasse}_${NAME[sprache][art]}_${sprache.toUpperCase()}.pdf`

function seitenzahl(datei: string): number {
  return readFileSync(datei, 'latin1').match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0
}

function bilder(datei: string) {
  if (!args.includes('--png')) return
  execFileSync('python3', ['-c', `import pymupdf,sys\nd=pymupdf.open(sys.argv[1])\nfor i,p in enumerate(d): p.get_pixmap(dpi=int(sys.argv[2])).save(sys.argv[1][:-4]+'-%02d.png'%(i+1))`, datei, '80'])
}

const heftSeiten: Record<Sprache, Map<string, number>> = { de: new Map(), fr: new Map() }
for (const sprache of sprachen) {
  const datei = join(ziel, dateiname('heft', sprache))
  await renderToFile(<SchuelerheftDokument plan={plan} einheiten={einheiten} blaetter={blattById} sprache={sprache} seiten={heftSeiten[sprache]} />, datei)
  const fehlt = einheiten.flatMap((e) => e.blaetter).filter((id) => !heftSeiten[sprache].has(id))
  if (fehlt.length) {
    console.error(`✗ ${datei}: Blätter ohne Seite im Heft: ${fehlt.join(', ')}`)
    process.exitCode = 1
  }
  console.log('✓', datei, `(${seitenzahl(datei)} Seiten)`, [...heftSeiten[sprache]].map(([id, s]) => `${id} S. ${s}`).join(', '))
  bilder(datei)
}

const daten: HandbuchDaten = { klasse, plaene: PLAENE, einheiten, text: HANDBUCH, blaetter: blattById, heftSeiten }
for (const sprache of sprachen) {
  const datei = join(ziel, dateiname('handbuch', sprache))
  const marken = new Map<string, number>()
  await renderToFile(<HandbuchDokument daten={daten} sprache={sprache} marken={marken} />, datei)
  const kontrolle = new Map<string, number>()
  await renderToFile(<HandbuchDokument daten={daten} sprache={sprache} marken={kontrolle} seiten={marken} />, datei)
  for (const [id, s] of marken) {
    if (kontrolle.get(id) !== s) {
      console.error(`✗ ${datei}: Abschnitt ${id} steht auf Seite ${kontrolle.get(id)}, im Inhalt ${s}`)
      process.exitCode = 1
    }
  }
  console.log('✓', datei, `(${seitenzahl(datei)} Seiten)`, [...kontrolle].map(([id, s]) => `${id} S. ${s}`).join(', '))
  bilder(datei)
}

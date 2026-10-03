// Setzt Förderfach-Einheiten so, wie sie im Lehrerhandbuch stehen (Übersichtsseite und Schritt für
// Schritt), auf Deutsch und Französisch – zum Ansehen, ohne das ganze Handbuch zu setzen.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/foerderfach-einheit.tsx <entwurf.json …> [--png] [--ordner=pfad] [--ausgabe=annexe]
// Meldet je Sprache die Seitenzahl und ob die Übersicht (Ziele, Ablauf, Material, Vorbereitung,
// Kopiervorlagen, Wortspeicher, Achtung) auf eine A4-Seite passt – sonst ✗ (Exit-Code 1).
// Ausgabe: tmp/foerderfach-einheit/<id>_<de|fr>.pdf, mit --png jede Seite als Bild (<id>_<de|fr>-1.png …).
// --ausgabe=annexe: Einheiten der Annexe (Ids a7-e01 …) aus dem Plan und den Entwürfen in src/data/foerderfach/annexe,
// nur Deutsch (siehe scripts/foerderfach-ausgabe.ts).
import { Document, renderToFile } from '@react-pdf/renderer'
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { EinheitSeiten } from '../src/foerderfach/pdf/Handbuch'
import { ladeDaten, ladeEntwurf, waehleAusgabeAus } from './foerderfach-ausgabe'
import type { Blatt } from '../src/blatt/typen'
import type { Sprache } from '../src/foerderfach/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const wahl = waehleAusgabeAus(args)
const { SKILLKARTEN, blattById, planVon } = ladeDaten(wahl)
const sprachen: Sprache[] = wahl.annexe ? ['de'] : ['de', 'fr']
const png = args.includes('--png')
const ziel = args.find((a) => a.startsWith('--ordner='))?.slice(9) ?? join(ROOT, 'tmp/foerderfach-einheit')
mkdirSync(ziel, { recursive: true })

function seitenzahl(datei: string): number {
  return readFileSync(datei, 'latin1').match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0
}

// Alle Blätter: fertige und die aller Entwürfe (gemeinsame Blätter legt eine andere Einheit an)
const blaetter = new Map<string, Blatt>(blattById)
const ordner = wahl.entwurf
for (const d of existsSync(ordner) ? readdirSync(ordner).filter((x) => x.endsWith('.json')) : []) {
  try {
    for (const b of ladeEntwurf(join(ordner, d), wahl).blaetter ?? []) blaetter.set(b.id, b)
  } catch {
    // ein Entwurf, der gerade geschrieben wird, ist noch kein gültiges JSON
  }
}

for (const datei of args.filter((a) => a.endsWith('.json'))) {
  const d = ladeEntwurf(datei, wahl)
  for (const b of d.blaetter ?? []) blaetter.set(b.id, b)
  for (const e of d.einheiten) {
    const plan = planVon(e.klasse)
    if (!plan) {
      console.log(`– ${e.id}: kein Plan für die ${e.klasse} (plan-${e.klasse}.json fehlt) – nicht gesetzt`)
      process.exitCode = 1
      continue
    }
    for (const sprache of sprachen) {
      const pdf = join(ziel, `${e.id}_${sprache}.pdf`)
      const marken = new Map<string, number>()
      // Seitenverweise wie im fertigen Handbuch (Heft S. …, Vorlage S. …), mit dreistelligen Platzhaltern
      const heft = new Map<string, number>([...e.blaetter, ...(e.vorlagen ?? [])].map((id) => [id, 188]))
      const seiten = new Map<string, number>([...e.blaetter, ...(e.vorlagen ?? [])].map((id) => [`v-${id}`, 188]))
      for (const tr of [1, 2, 3]) heft.set(`m${tr}`, 188)
      await renderToFile(
        <Document>
          <EinheitSeiten e={e} plan={plan} sprache={sprache} blaetter={blaetter} marken={marken} heft={heft} seiten={seiten} karte={SKILLKARTEN[e.klasse]?.find((k) => k.einheit === e.id)} />
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

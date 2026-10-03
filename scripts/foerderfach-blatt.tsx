// Setzt die Schülerblätter von Förderfach-Entwürfen so, wie sie im Schülerheft stehen (Farbe der
// Klassenstufe, ohne Lehrerseite), auf Deutsch und Französisch, und meldet die Seitenzahl.
//   npx tsx --tsconfig tsconfig.scripts.json scripts/foerderfach-blatt.tsx <entwurf.json …> [--png] [--ordner=pfad] [--ausgabe=annexe]
// Ausgabe: tmp/foerderfach-blatt/<blatt-id>_<de|fr>.pdf (mit --png zusätzlich jede Seite als Bild).
// Mehr als zwei Seiten sind ein Fehler (Exit-Code 1).
// --ausgabe=annexe: Blätter der Annexe (Ids a7-…), nur Deutsch, „Annexe“ in Kopf und Fuß (siehe scripts/foerderfach-ausgabe.ts).
// Statt eines Entwurfs geht auch eine Liste von Blättern, z. B. die Werkzeug-Blätter der Annexe:
//   npm run foerderfach:blatt -- --ausgabe=annexe src/data/foerderfach/annexe/werkzeuge.json --png
import { Document, renderToFile } from '@react-pdf/renderer'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { BlattSeiten } from '../src/blatt/pdf/BlattDokument'
import { FACH, STUFE_FARBEN, TX } from '../src/foerderfach/fach'
import { klasseVonId, ladeEntwurf, waehleAusgabeAus } from './foerderfach-ausgabe'
import type { Blatt } from '../src/blatt/typen'
import type { Sprache } from '../src/foerderfach/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const wahl = waehleAusgabeAus(args)
const png = args.includes('--png')
const ziel = args.find((a) => a.startsWith('--ordner='))?.slice(9) ?? join(ROOT, 'tmp/foerderfach-blatt')
mkdirSync(ziel, { recursive: true })

function seitenzahl(datei: string): number {
  return readFileSync(datei, 'latin1').match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0
}

for (const datei of args.filter((a) => a.endsWith('.json'))) {
  const d = ladeEntwurf(datei, wahl)
  // Entwurf { einheiten, blaetter } oder eine Liste von Blättern (annexe/werkzeuge.json)
  const blaetter = Array.isArray(d) ? (d as unknown as Blatt[]) : (d.blaetter ?? [])
  for (const b of blaetter) {
    const klasse = klasseVonId(wahl, b.id) ?? '7e'
    for (const sprache of (wahl.annexe ? ['de'] : ['de', 'fr']) as Sprache[]) {
      const t = TX[sprache]
      const pdf = join(ziel, `${b.id}_${sprache}.pdf`)
      await renderToFile(
        <Document>
          <BlattSeiten
            blatt={b}
            opt={{ sprache, schueler: true, lehrer: false, farben: STUFE_FARBEN[klasse], heft: { reiter: t.heft, meta: `${FACH.name}  ·  ${klasse}`, fuss: `${FACH.name} · ${klasse}` } }}
          />
        </Document>,
        pdf,
      )
      const n = seitenzahl(pdf)
      if (n > 2) process.exitCode = 1
      console.log(`${n > 2 ? '✗' : '✓'} ${b.id} ${sprache}: ${n} Seite(n)${n > 2 ? ' – höchstens 2' : ''}  ${pdf}`)
      if (png) execFileSync('python3', ['-c', `import pymupdf,sys\nd=pymupdf.open(sys.argv[1])\nfor i,p in enumerate(d): p.get_pixmap(dpi=70).save(sys.argv[1][:-4]+'-%d.png'%(i+1))`, pdf])
    }
  }
}

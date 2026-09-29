// Modulheft als PDF (Heft für die Jugendlichen und Lösungsheft für die Lehrperson):
//   npx tsx --tsconfig tsconfig.scripts.json scripts/modulheft.tsx [ausgabeordner] [--fr] [--png]
// Ohne Ordner landen die PDFs in tmp/modulheft (nicht im Repo). Ohne --fr nur Deutsch.
// Mit --png zusätzlich jede Seite als Bild (PyMuPDF), zum Ansehen.
import { renderToFile } from '@react-pdf/renderer'
import { mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { ModulheftDokument, heftSeiten } from '../src/blatt/pdf/Modulheft'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { MODULE, modulheftDateiname } from '../src/blatt/module'
import type { Blatt, Sprache } from '../src/blatt/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const ziel = args.find((a) => !a.startsWith('--')) ?? join(ROOT, 'tmp/modulheft')
mkdirSync(ziel, { recursive: true })

const ordner = join(ROOT, 'src/data/blaetter')
const blaetter = new Map<string, Blatt>()
for (const d of readdirSync(ordner)) if (d.endsWith('.json')) for (const b of JSON.parse(readFileSync(join(ordner, d), 'utf8')) as Blatt[]) blaetter.set(b.id, b)

const sprachen: Sprache[] = args.includes('--fr') ? ['de', 'fr'] : ['de']
for (const modul of MODULE) {
  for (const sprache of sprachen) {
    for (const loesungen of [false, true]) {
      const datei = join(ziel, modulheftDateiname(modul, sprache, loesungen))
      await renderToFile(<ModulheftDokument modul={modul} blaetter={blaetter} sprache={sprache} loesungen={loesungen} />, datei)
      // Der Inhalt rechnet mit festen Seitenzahlen: eine Lektion mit mehr oder weniger Seiten verschiebt alles danach.
      const seiten = readFileSync(datei, 'latin1').match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0
      const soll = heftSeiten(modul, loesungen).gesamt
      if (seiten !== soll) {
        console.error(`✗ ${datei}: ${seiten} Seiten statt ${soll} – eine Lektion hat nicht ${loesungen ? '1 Seite' : '2 Seiten'}, die Seitenzahlen im Inhalt stimmen nicht.`)
        process.exitCode = 1
      }
      if (args.includes('--png')) execFileSync('python3', ['-c', `import pymupdf,sys\nd=pymupdf.open(sys.argv[1])\nfor i,p in enumerate(d): p.get_pixmap(dpi=int(sys.argv[2])).save(sys.argv[1][:-4]+'-%02d.png'%(i+1))`, datei, '70'])
      console.log('✓', datei)
    }
  }
}

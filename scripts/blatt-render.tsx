// Rendert Arbeitsblätter als PDF (und auf Wunsch als PNG über PyMuPDF).
//   npx tsx --tsconfig tsconfig.scripts.json scripts/blatt-render.tsx <ausgabeordner> [id|bereich|datei.json ...] [--png] [--fr] [--katalog]
// Ohne Auswahl: alle Blätter aus src/data/blaetter/*.json.
import { renderToFile } from '@react-pdf/renderer'
import { mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { BlattDokument } from '../src/blatt/pdf/BlattDokument'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { katalogBlaetter } from './blatt-katalog'
import type { Blatt, Sprache } from '../src/blatt/typen'
import { nummerieren } from '../src/blatt/nummern'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))

const args = process.argv.slice(2)
const ziel = args[0] ?? 'blatt-ausgabe'
const png = args.includes('--png')
const auswahl = args.slice(1).filter((a) => !a.startsWith('--'))
mkdirSync(ziel, { recursive: true })

function alleBlaetter(): { blatt: Blatt; nr: string }[] {
  const ordner = join(ROOT, 'src/data/blaetter')
  const dateien: Record<string, Blatt[]> = {}
  for (const d of readdirSync(ordner)) if (d.endsWith('.json')) dateien[d] = JSON.parse(readFileSync(join(ordner, d), 'utf8'))
  return nummerieren(dateien).map((b) => ({ blatt: b, nr: b.nr }))
}

let liste: { blatt: Blatt; nr: string }[] = []
if (args.includes('--katalog')) liste = katalogBlaetter().map((b, i) => ({ blatt: b, nr: `K-${String(i + 1).padStart(2, '0')}` }))
else {
  const alle = alleBlaetter()
  if (!auswahl.length) liste = alle
  for (const a of auswahl) {
    if (a.endsWith('.json')) {
      const l = JSON.parse(readFileSync(a, 'utf8')) as Blatt[]
      l.forEach((x, i) => liste.push({ blatt: x, nr: `X-${String(i + 1).padStart(2, '0')}` }))
    } else liste.push(...alle.filter((x) => x.blatt.id === a || x.blatt.bereich === a || x.nr === a))
  }
}

const sprachen: Sprache[] = args.includes('--fr') ? ['de', 'fr'] : ['de']
for (const { blatt, nr } of liste) {
  for (const sprache of sprachen) {
    if (sprache === 'fr' && !blatt.fr) continue
    const datei = join(ziel, `${nr}_${blatt.id}${sprache === 'fr' ? '_fr' : ''}.pdf`)
    await renderToFile(<BlattDokument blatt={blatt} opt={{ sprache, nr }} />, datei)
    if (png) execFileSync('python3', ['-c', `import pymupdf,sys\nd=pymupdf.open(sys.argv[1])\nfor i,p in enumerate(d): p.get_pixmap(dpi=int(sys.argv[2])).save(sys.argv[1][:-4]+'-%d.png'%(i+1))`, datei, '80'])
    console.log('✓', datei)
  }
}

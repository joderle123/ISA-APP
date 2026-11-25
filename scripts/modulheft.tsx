// Modulheft als PDF (Heft für die Jugendlichen und Lösungsheft für die Lehrperson):
//   npx tsx --tsconfig tsconfig.scripts.json scripts/modulheft.tsx [ausgabeordner] [--fr] [--png]
// Ohne Ordner landen die PDFs in tmp/modulheft (nicht im Repo). Ohne --fr nur Deutsch.
// Mit --png zusätzlich jede Seite als Bild (PyMuPDF), zum Ansehen.
import { renderToFile, renderToBuffer } from '@react-pdf/renderer'
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { ModulheftDokument, LektionDokument, heftSeiten, heftSchluessel, modulLektionen } from '../src/blatt/pdf/Modulheft'
import { registriereSchriften } from '../src/blatt/pdf/stil'
import { MODULE, modulheftDateiname } from '../src/blatt/module'
import HEFTSEITEN_JSON from '../src/blatt/heftseiten.json'
import type { Blatt, Sprache } from '../src/blatt/typen'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const ziel = args.find((a) => !a.startsWith('--')) ?? join(ROOT, 'tmp/modulheft')
mkdirSync(ziel, { recursive: true })

const HEFTSEITEN_DATEI = join(ROOT, 'src/blatt/heftseiten.json')
// dasselbe Objekt, das Modulheft.tsx liest: Änderungen gelten sofort beim nächsten Rendern
const HEFTSEITEN = HEFTSEITEN_JSON as Record<string, Record<string, number>>
const zaehle = (pdf: string) => pdf.match(/\/Type\s*\/Page(?!s)/g)?.length ?? 0

const ordner = join(ROOT, 'src/data/blaetter')
const blaetter = new Map<string, Blatt>()
for (const d of readdirSync(ordner)) if (d.endsWith('.json')) for (const b of JSON.parse(readFileSync(join(ordner, d), 'utf8')) as Blatt[]) blaetter.set(b.id, b)

const sprachen: Sprache[] = args.includes('--fr') ? ['de', 'fr'] : ['de']
const nur = args.find((a) => a.startsWith('--nur='))?.slice(6)   // z. B. --nur=mathe-m3
for (const modul of MODULE.filter((m) => !nur || m.id === nur)) {
  for (const sprache of sprachen) {
    for (const loesungen of [false, true]) {
      const datei = join(ziel, modulheftDateiname(modul, sprache, loesungen))
      await renderToFile(<ModulheftDokument modul={modul} blaetter={blaetter} sprache={sprache} loesungen={loesungen} />, datei)
      // Der Inhalt rechnet mit den Seiten je Lektion (Standard 2, Lösungen 1; längere stehen gemessen in heftseiten.json).
      // Stimmt die Summe nicht, werden die Lektionen einzeln gezählt, gespeichert und das Heft neu gerendert.
      let seiten = zaehle(readFileSync(datei, 'latin1'))
      // Hefte mit gemessenen Lektionen immer neu zählen (eine Lektion kann wachsen, eine andere schrumpfen)
      if (seiten !== heftSeiten(modul, loesungen, sprache).gesamt || HEFTSEITEN[heftSchluessel(modul, sprache, loesungen)]) {
        const je = loesungen ? 1 : 2
        const gemessen: Record<string, number> = {}
        for (const l of modulLektionen(modul)) {
          if (!blaetter.has(l.id)) continue
          const n = zaehle((await renderToBuffer(<LektionDokument modul={modul} lektion={l.id} blaetter={blaetter} sprache={sprache} loesungen={loesungen} />)).toString('latin1'))
          if (n !== je) gemessen[l.id] = n
        }
        const k = heftSchluessel(modul, sprache, loesungen)
        if (Object.keys(gemessen).length) HEFTSEITEN[k] = gemessen
        else delete HEFTSEITEN[k]
        writeFileSync(HEFTSEITEN_DATEI, JSON.stringify(HEFTSEITEN, null, 2) + '\n')
        console.log(`  ↻ ${k}: Seiten je Lektion gezählt`, Object.values(gemessen).join(' '))
        await renderToFile(<ModulheftDokument modul={modul} blaetter={blaetter} sprache={sprache} loesungen={loesungen} />, datei)
        seiten = zaehle(readFileSync(datei, 'latin1'))
        const soll = heftSeiten(modul, loesungen, sprache).gesamt
        if (seiten !== soll) {
          console.error(`✗ ${datei}: ${seiten} Seiten statt ${soll} – die Seitenzahlen im Inhalt stimmen nicht.`)
          process.exitCode = 1
        }
      }
      if (args.includes('--png')) execFileSync('python3', ['-c', `import pymupdf,sys\nd=pymupdf.open(sys.argv[1])\nfor i,p in enumerate(d): p.get_pixmap(dpi=int(sys.argv[2])).save(sys.argv[1][:-4]+'-%02d.png'%(i+1))`, datei, '70'])
      console.log('✓', datei)
    }
  }
}

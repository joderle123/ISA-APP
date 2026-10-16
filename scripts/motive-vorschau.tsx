// Kontaktbogen farbiger Motive (Name darunter) in 18 mm und 40 mm, dazu Graustufen-Fassung (PNG).
//   npx tsx --tsconfig tsconfig.scripts.json scripts/motive-vorschau.tsx <ausgabeordner> [--neu | --alle | name,name,…] [--mm=40,18] [--dpi=110]
// --neu = alle Motive aus src/blatt/motive-neu.ts (Standard), --alle = jedes Motiv der Toolbox,
// sonst eine kommagetrennte Liste von Motivnamen (ohne „motiv:“).
// Je Größe entstehen <ordner>/kontakt-<mm>mm.pdf, -<nr>.png (Farbe) und -grau-<nr>.png (Graustufen).
import { renderToFile, Document, Page, View, Text } from '@react-pdf/renderer'
import { mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { Zeichnen } from '../src/blatt/pdf/Zeichnen'
import { motivZeichnung, MOTIV_NAMEN } from '../src/blatt/motive'
import { palette } from '../src/blatt/zeichnung'
import { BEREICHE } from '../src/blatt/katalog'
import { NEU } from '../src/blatt/motive-neu'
import { registriereSchriften } from '../src/blatt/pdf/stil'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))

const args = process.argv.slice(2)
const ziel = args[0] ?? 'tmp/design/motive'
const opt = (n: string, std: string) => (args.find((a) => a.startsWith(`--${n}=`)) ?? `--${n}=${std}`).split('=')[1]
const mms = opt('mm', '40,18').split(',').map(Number)
const dpi = Number(opt('dpi', '110'))
const auswahl = args.slice(1).filter((a) => !a.startsWith('--'))
const namen: string[] = args.includes('--alle') ? MOTIV_NAMEN : auswahl.length ? auswahl[0].split(',') : Object.keys(NEU)
mkdirSync(ziel, { recursive: true })

const PT = 72 / 25.4
const pal = palette(BEREICHE[0].farben)

for (const mm of mms) {
  const b = mm * PT
  const zellB = b + (mm >= 30 ? 22 : 14)
  const proSeite = Math.max(1, Math.floor((595 - 28) / zellB)) * Math.max(1, Math.floor((842 - 28) / (b + 24)))
  const seiten: string[][] = []
  for (let i = 0; i < namen.length; i += proSeite) seiten.push(namen.slice(i, i + proSeite))
  const datei = join(ziel, `kontakt-${mm}mm.pdf`)
  await renderToFile(
    <Document>
      {seiten.map((s, i) => (
        <Page key={i} size="A4" style={{ padding: 14, flexDirection: 'row', flexWrap: 'wrap', alignContent: 'flex-start' }}>
          {s.map((n) => (
            <View key={n} style={{ width: zellB, height: b + 24, alignItems: 'center' }}>
              <View style={{ width: b, height: b, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FBFBF8' }}>
                <Zeichnen z={motivZeichnung(n)} p={pal} breite={b} hoehe={b} />
              </View>
              <Text style={{ fontSize: 6.5, marginTop: 3, color: '#444' }}>{n}</Text>
            </View>
          ))}
        </Page>
      ))}
    </Document>,
    datei,
  )
  for (const f of readdirSync(ziel)) if (f.startsWith(`kontakt-${mm}mm-`) && f.endsWith('.png')) unlinkSync(join(ziel, f))
  execFileSync('pdftoppm', ['-r', String(dpi), '-png', datei, join(ziel, `kontakt-${mm}mm`)])
  for (const f of readdirSync(ziel)) {
    if (f.startsWith(`kontakt-${mm}mm-`) && f.endsWith('.png') && !f.includes('grau')) {
      execFileSync('convert', [join(ziel, f), '-colorspace', 'Gray', join(ziel, f.replace(`kontakt-${mm}mm-`, `kontakt-${mm}mm-grau-`))])
    }
  }
  console.log('✓', datei, `(${namen.length} Motive, ${seiten.length} Seiten)`)
}

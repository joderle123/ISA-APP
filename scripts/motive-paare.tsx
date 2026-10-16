// Gegenüberstellung Piktogramm ↔ Motiv für alle Paare aus ICON_MOTIV (zur Sichtprüfung der Zuordnung).
//   npx tsx --tsconfig tsconfig.scripts.json scripts/motive-paare.tsx <ausgabeordner> [--mm=22] [--dpi=110]
// Meldet außerdem Paare, deren Motiv oder Piktogramm nicht existiert (Exit-Code 1).
import { renderToFile, Document, Page, View, Text } from '@react-pdf/renderer'
import { mkdirSync, readdirSync, unlinkSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { Zeichnen } from '../src/blatt/pdf/Zeichnen'
import { motivZeichnung, MOTIV_NAMEN } from '../src/blatt/motive'
import { iconZeichnung, hatIcon, palette } from '../src/blatt/zeichnung'
import { BEREICHE } from '../src/blatt/katalog'
import { ICON_MOTIV } from '../src/blatt/motive-neu'
import { registriereSchriften } from '../src/blatt/pdf/stil'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
registriereSchriften((d) => join(ROOT, 'src/assets/fonts/pdf', d))
const args = process.argv.slice(2)
const ziel = args[0] ?? 'tmp/design/motive/paare'
const opt = (n: string, std: string) => (args.find((a) => a.startsWith(`--${n}=`)) ?? `--${n}=${std}`).split('=')[1]
const mm = Number(opt('mm', '22'))
const dpi = Number(opt('dpi', '110'))
mkdirSync(ziel, { recursive: true })

const fehler: string[] = []
const paare = Object.entries(ICON_MOTIV)
for (const [i, m] of paare) {
  if (!hatIcon(i)) fehler.push(`Piktogramm fehlt: ${i}`)
  if (!MOTIV_NAMEN.includes(m)) fehler.push(`Motiv fehlt: ${m} (für ${i})`)
}
const PT = 72 / 25.4
const b = mm * PT
const pal = palette(BEREICHE[0].farben)
const proSeite = 5 * 11
const seiten: [string, string][][] = []
for (let i = 0; i < paare.length; i += proSeite) seiten.push(paare.slice(i, i + proSeite))
const datei = join(ziel, 'paare.pdf')
await renderToFile(
  <Document>
    {seiten.map((s, k) => (
      <Page key={k} size="A4" style={{ padding: 16, flexDirection: 'row', flexWrap: 'wrap', alignContent: 'flex-start' }}>
        {s.map(([i, m]) => (
          <View key={i} style={{ width: (595 - 32) / 5, height: b + 22, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: b, height: b, alignItems: 'center', justifyContent: 'center' }}>
                <Zeichnen z={iconZeichnung(i)} p={pal} breite={b * 0.7} />
              </View>
              <View style={{ width: b, height: b, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FBFBF8' }}>
                <Zeichnen z={motivZeichnung(m)} p={pal} breite={b} hoehe={b} />
              </View>
            </View>
            <Text style={{ fontSize: 5.5, marginTop: 2, color: '#444' }}>{i} → {m}</Text>
          </View>
        ))}
      </Page>
    ))}
  </Document>,
  datei,
)
for (const f of readdirSync(ziel)) if (f.startsWith('paare-') && f.endsWith('.png')) unlinkSync(join(ziel, f))
execFileSync('pdftoppm', ['-r', String(dpi), '-png', datei, join(ziel, 'paare')])
console.log(`✓ ${datei} (${paare.length} Paare, ${seiten.length} Seiten)`)
if (fehler.length) {
  console.error(fehler.join('\n'))
  process.exit(1)
}

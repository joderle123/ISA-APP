// Kontaktbogen aller Zeichnungen (Gesichter, Figuren, Motive, Piktogramme).
// Aufruf: npx tsx --tsconfig tsconfig.scripts.json scripts/blatt-bilder-test.tsx <out.pdf>
import { renderToFile, Document, Page, View, Text } from '@react-pdf/renderer'
import { Zeichnen } from '../src/blatt/pdf/Zeichnen'
import { bildZeichnung, palette, ICON_NAMEN } from '../src/blatt/zeichnung'
import { BEREICHE } from '../src/blatt/katalog'
import { GEFUEHLE } from '../src/blatt/gesichter'
import { FIGUR_NAMEN, POSEN } from '../src/blatt/figuren'
import { MOTIV_NAMEN } from '../src/blatt/motive'

const out = process.argv[2] || 'bilder.pdf'
const p = palette(BEREICHE[0].farben)
const p2 = palette(BEREICHE[2].farben)
const Zelle = ({ id, b, pal = p }: { id: string; b: number; pal?: typeof p }) => (
  <View style={{ width: b + 16, alignItems: 'center', marginBottom: 10 }}>
    <Zeichnen z={bildZeichnung(id)} p={pal} breite={b} />
    <Text style={{ fontSize: 6, marginTop: 3, color: '#666' }}>{id}</Text>
  </View>
)
await renderToFile(
  <Document>
    <Page size="A4" style={{ padding: 24, flexDirection: 'row', flexWrap: 'wrap' }}>
      {GEFUEHLE.map((g) => <Zelle key={g} id={'gesicht:' + g} b={70} />)}
    </Page>
    <Page size="A4" style={{ padding: 24, flexDirection: 'row', flexWrap: 'wrap' }}>
      {FIGUR_NAMEN.map((f) => <Zelle key={f} id={'figur:' + f + ':froh'} b={70} />)}
      {POSEN.map((po, i) => <Zelle key={po} id={'figur:' + FIGUR_NAMEN[i % 6] + ':' + GEFUEHLE[i] + ':' + po} b={70} />)}
    </Page>
    <Page size="A4" style={{ padding: 24, flexDirection: 'row', flexWrap: 'wrap' }}>
      {MOTIV_NAMEN.map((m) => <Zelle key={m} id={'motiv:' + m} b={110} pal={p2} />)}
    </Page>
    <Page size="A4" style={{ padding: 18, flexDirection: 'row', flexWrap: 'wrap' }}>
      {ICON_NAMEN.slice(0, 140).map((m) => <Zelle key={m} id={'icon:' + m} b={24} />)}
    </Page>
  </Document>,
  out,
)
console.log('ok', out)

// ---------------------------------------------------------------------------
// Booklet je Klassenstufe (Lehrerhandbuch 7e, 6e, 5e) als PDF:
//   Deckblatt · Inhalt
//   Teil A  Das Fach: Überblick, Kompetenzbereiche, Doppelstunde, Rahmen und Sicherheit,
//           Methodenkoffer, Eltern und Kollegium (mit Elternbrief DE und FR), Material
//   Teil B  Der Jahresplan und der Jahresweg (Plakat)
//   Teil C  Die Einheiten, Kapitel für Kapitel: Kapitelseite, dann jede Einheit mit ihren
//           Kopiervorlagen direkt dahinter
//   Teil D  Kopiervorlagen für jede Stunde (Werkzeug-Blätter)
//   Anhang  Glossar Deutsch–Französisch · Notizen (füllen auf ein Vielfaches von 4 auf) · Rückseite
// Seitenzahlen (Inhalt, Jahresplan, Verweise) kommen aus einem ersten Durchlauf (Marken, siehe
// scripts/foerderfach.tsx); die Seiten im Schülerheft aus dem vorher gesetzten Schülerheft.
// ---------------------------------------------------------------------------

import { Document, Page, View, Text, Svg, Path, Circle } from '@react-pdf/renderer'
import type { Blatt } from '../../blatt/typen'
import { BlattSeiten, blattInhalt } from '../../blatt/pdf/BlattDokument'
import { NEUTRAL, type Palette } from '../../blatt/zeichnung'
import { SCHRIFT } from '../../blatt/pdf/stil'
import { QUELLEN } from '../../blatt/quellen'
import { URHEBER_NAME } from '../../lib/urheber'
import { FACH, KOMPETENZEN, PHASEN, STUFE_FARBEN, TX, trimesterName, type FachTx } from '../fach'
import type { ElternBrief, Einheit, HandbuchText, Jahresplan, Kapitel, Klasse, Kompetenz, PlanEinheit, Schritt, Sprache } from '../typen'
import {
  Absatz,
  BREITE,
  Deckblatt,
  Fett,
  Fuss,
  Kleinlabel,
  Kopf,
  KompetenzChip,
  KompetenzPunkte,
  Marke,
  type Marken,
  NotizenSeite,
  Plakette,
  Punktliste,
  Rueckseite,
  SeitenTitel,
  WARM,
  Zwischentitel,
  seitenStil,
  stufenPalette,
  ty,
  versal,
} from './teile'

export interface HandbuchDaten {
  /** Alle Jahrespläne (die Kompetenzseite zeigt die Ziele aller drei Jahre) */
  plaene: Jahresplan[]
  /** Alle ausgearbeiteten Einheiten; jedes Heft nimmt die seiner Klassenstufe */
  einheiten: Einheit[]
  text: Record<Sprache, HandbuchText>
  blaetter: Map<string, Blatt>
  /** Werkzeug-Blätter je Klassenstufe (Teil D) */
  werkzeuge: Record<Klasse, string[]>
}

/** Platzhalter für Seitenzahlen im ersten Durchlauf – so breit wie die echten, damit sich nichts verschiebt */
const PLATZHALTER = 188
const vorlageId = (blatt: string) => `v-${blatt}`
/** Werkzeug-Blätter (für jede Stunde) beginnen mit „ff-“, die Blätter der Einheiten mit „ff7-“, „ff6-“, „ff5-“ */
const istWerkzeug = (id: string) => id.startsWith('ff-')

const ROT = '#B4533A'
const ROT_ZART = '#FBF1EC'
const GRUEN = '#2F855A'
const GRUEN_ZART = '#EEF6F0'
const BLAU = '#2E6DA4'
const BLAU_ZART = '#EDF3FA'

const quelle = (schluessel: string) => QUELLEN[schluessel] ?? ''

/** Seitenzahl aus dem ersten Durchlauf (dort ein Platzhalter) */
function seiteVon(seiten: Marken | undefined, id: string): number | undefined {
  return seiten ? seiten.get(id) : PLATZHALTER
}

function Quellen({ liste }: { liste: string[] }) {
  return (
    <View wrap={false} style={{ marginTop: 10 }}>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 7.2, color: NEUTRAL.leise, marginBottom: 1.5 }}>{TX.de.quellen}</Text>
      {liste.map((q, i) => (
        <Text key={i} style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, lineHeight: 1.4, color: NEUTRAL.sehrLeise }}>
          {ty(q, 'de')}
        </Text>
      ))}
    </View>
  )
}

function Kasten({ titel, text, farbe, grund, rahmen }: { titel: string; text: string; farbe: string; grund: string; rahmen?: boolean }) {
  return (
    <View wrap={false} style={{ flex: 1, backgroundColor: grund, borderRadius: 9, padding: 10, borderLeftWidth: rahmen ? 3 : 0, borderLeftColor: farbe }}>
      <Kleinlabel farbe={farbe} style={{ marginBottom: 3 }}>
        {titel}
      </Kleinlabel>
      <Absatz groesse={8.8}>{text}</Absatz>
    </View>
  )
}

/** Kopfzeile für Teil A */
function KopfA({ t, klasse, p }: { t: FachTx; klasse: Klasse; p: Palette }) {
  return <Kopf reiter={t.teilA} meta={`${FACH.name}  ·  ${t.lehrerhandbuch} ${klasse}`} p={p} />
}

// --- Inhalt ----------------------------------------------------------------------------------------------

interface InhaltZeile {
  id: string
  titel: string
  /** 0 = Abschnitt, 1 = Kapitel, 2 = Einheit */
  ebene?: 0 | 1 | 2
  nr?: string
}
interface InhaltTeil {
  titel: string
  /** Gruppen bleiben zusammen (z. B. ein Kapitel mit seinen Einheiten) */
  gruppen: InhaltZeile[][]
}

function InhaltPunkte({ z, sprache, seiten, p }: { z: InhaltZeile; sprache: Sprache; seiten?: Marken; p: Palette }) {
  const einheit = z.ebene === 2
  const kapitel = z.ebene === 1
  const groesse = einheit ? 9 : 10.5
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: einheit ? 3.2 : kapitel ? 9 : 7, marginLeft: einheit ? 24 : 0 }}>
      {einheit && z.nr ? <Text style={{ width: 20, marginLeft: -24, marginRight: 4, textAlign: 'right', fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.2, color: p.tief }}>{z.nr}</Text> : null}
      <Text style={{ fontFamily: einheit ? SCHRIFT.jugend : SCHRIFT.titel, fontWeight: einheit ? 400 : 800, fontSize: groesse, color: kapitel ? p.tief : NEUTRAL.text }}>{ty(z.titel, sprache)}</Text>
      <View style={{ flex: 1, marginHorizontal: 6, marginBottom: 3, borderBottomWidth: 1, borderBottomColor: NEUTRAL.rahmen, borderStyle: 'dotted' }} />
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: einheit ? 600 : 800, fontSize: groesse, color: NEUTRAL.text, width: 24, textAlign: 'right' }}>{String(seiteVon(seiten, z.id) ?? '')}</Text>
    </View>
  )
}

function InhaltSeiten({ sprache, p, klasse, teile, text, seiten }: { sprache: Sprache; p: Palette; klasse: Klasse; teile: InhaltTeil[]; text: HandbuchText; seiten?: Marken }) {
  const t = TX[sprache]
  return (
    <Page size="A4" style={seitenStil}>
      <Kopf reiter={t.lehrerhandbuch} meta={`${FACH.name}  ·  ${klasse}`} p={p} />
      <SeitenTitel titel={t.inhalt} p={p} sprache={sprache} />
      <View wrap={false} style={{ flexDirection: 'row', backgroundColor: p.zart, borderRadius: 9, padding: 11, paddingLeft: 12, marginBottom: 6 }}>
        <View style={{ width: 3, borderRadius: 2, backgroundColor: p.tief, marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: p.tief, marginBottom: 3 }}>{ty(text.vorwort.titel, sprache)}</Text>
          <Absatz groesse={8.8}>{ty(text.vorwort.text.replaceAll('{klasse}', klasse), sprache)}</Absatz>
        </View>
      </View>
      {teile.map((teil, ti) => (
        <View key={ti}>
          <View minPresenceAhead={60} style={{ marginTop: 14, paddingBottom: 3, borderBottomWidth: 0.8, borderBottomColor: p.mittel }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 11.5, color: p.tief }}>{teil.titel}</Text>
          </View>
          {teil.gruppen.map((g, gi) => (
            <View key={gi} wrap={false}>
              {g.map((z) => (
                <InhaltPunkte key={z.id} z={z} sprache={sprache} seiten={seiten} p={p} />
              ))}
            </View>
          ))}
        </View>
      ))}
      <Fuss links={FACH.name} titel={t.inhalt} sprache={sprache} />
    </Page>
  )
}

// --- Teil A: das Fach ---------------------------------------------------------------------------------------

function UeberblickSeite({ sprache, p, klasse, text, marken }: { sprache: Sprache; p: Palette; klasse: Klasse; text: HandbuchText; marken?: Marken }) {
  const t = TX[sprache]
  const u = text.ueberblick
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id="a1" marken={marken} />
      <KopfA t={t} klasse={klasse} p={p} />
      <SeitenTitel titel={u.titel} unter={u.einleitung} p={p} sprache={sprache} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4, marginTop: 2 }}>
        {u.fakten.map((f, i) => (
          <View key={i} style={{ width: '33.33%', padding: 4 }}>
            <View style={{ backgroundColor: p.zart, borderRadius: 9, paddingVertical: 8, paddingHorizontal: 10, minHeight: 58 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 24, lineHeight: 1.25, color: p.tief, marginBottom: 1 }}>{f.zahl}</Text>
              <Absatz groesse={8.4} style={{ lineHeight: 1.35 }}>
                {ty(f.text, sprache)}
              </Absatz>
            </View>
          </View>
        ))}
      </View>
      <Zwischentitel p={p} oben={16}>
        {ty(u.wirkung.titel, sprache)}
      </Zwischentitel>
      <Absatz groesse={9.4}>{ty(u.wirkung.text, sprache)}</Absatz>
      <View style={{ flexDirection: 'row', marginTop: 8, marginHorizontal: -4 }}>
        {u.wirkung.punkte.map((x, i) => (
          <View key={i} style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={{ borderTopWidth: 2.5, borderTopColor: p.tief, paddingTop: 6 }}>
              <Fett groesse={9.2}>{ty(x.titel, sprache)}</Fett>
              <Absatz groesse={8.3} farbe={NEUTRAL.leise} style={{ lineHeight: 1.4, marginTop: 2 }}>
                {ty(x.text, sprache)}
              </Absatz>
            </View>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        <Kasten titel={u.nicht.titel} text={ty(u.nicht.text, sprache)} farbe={ROT} grund={ROT_ZART} rahmen />
        <View style={{ width: 10 }} />
        <Kasten titel={u.material.titel} text={ty(u.material.text, sprache)} farbe={NEUTRAL.leise} grund={NEUTRAL.flaeche} />
      </View>
      <Quellen liste={[quelle('durlak2011'), quelle('taylor2017')]} />
      <Fuss links={FACH.name} titel={ty(u.titel, sprache)} sprache={sprache} />
    </Page>
  )
}

function KompetenzSeite({ sprache, p, klasse, text, plaene, marken }: { sprache: Sprache; p: Palette; klasse: Klasse; text: HandbuchText; plaene: Jahresplan[]; marken?: Marken }) {
  /** Die Spalte der eigenen Klassenstufe ist leicht getönt */
  const grund = (k: Klasse) => (k === klasse ? STUFE_FARBEN[k].zart : undefined)
  const t = TX[sprache]
  const k = text.kompetenzen
  const spalte1 = 0.3
  const rest = (1 - spalte1) / plaene.length
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id="a2" marken={marken} />
      <KopfA t={t} klasse={klasse} p={p} />
      <SeitenTitel titel={k.titel} unter={k.einleitung} p={p} sprache={sprache} />
      <View style={{ borderWidth: 0.8, borderColor: NEUTRAL.rahmen, borderRadius: 9, marginTop: 4 }}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.rahmen, backgroundColor: NEUTRAL.flaeche, borderTopLeftRadius: 9, borderTopRightRadius: 9 }}>
          <View style={{ width: `${spalte1 * 100}%`, padding: 8, justifyContent: 'flex-end' }}>
            <Kleinlabel>{t.kompetenzen}</Kleinlabel>
          </View>
          {plaene.map((pl) => (
            <View key={pl.klasse} style={{ width: `${rest * 100}%`, padding: 8, borderLeftWidth: 0.8, borderLeftColor: NEUTRAL.rahmen, backgroundColor: grund(pl.klasse), borderTopRightRadius: pl === plaene[plaene.length - 1] ? 9 : 0 }}>
              <View style={{ height: 3, borderRadius: 2, backgroundColor: STUFE_FARBEN[pl.klasse].tief, marginBottom: 5 }} />
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 13, color: STUFE_FARBEN[pl.klasse].tief }}>{pl.klasse}</Text>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.6, color: NEUTRAL.leise, marginTop: 1 }}>{ty(pl.titel[sprache], sprache)}</Text>
            </View>
          ))}
        </View>
        <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.rahmen }}>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.8, color: NEUTRAL.leise }}>{t.zielMatrix}</Text>
        </View>
        {KOMPETENZEN.map((kd, i) => (
          <View key={kd.id} wrap={false} style={{ flexDirection: 'row', borderBottomWidth: i < KOMPETENZEN.length - 1 ? 0.8 : 0, borderBottomColor: NEUTRAL.rahmen }}>
            <View style={{ width: `${spalte1 * 100}%`, padding: 8, flexDirection: 'row' }}>
              <Plakette name={kd.bild} d={22} farbe="#FFFFFF" grund={kd.farbe} />
              <View style={{ marginLeft: 7, flex: 1 }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, lineHeight: 1.2, color: NEUTRAL.text }}>{kd.name[sprache]}</Text>
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: kd.farbe, marginTop: 1 }}>{kd.fach[sprache]}</Text>
                <Absatz groesse={7.8} farbe={NEUTRAL.leise} style={{ lineHeight: 1.35, marginTop: 3 }}>
                  {ty(k.bereiche[kd.id], sprache)}
                </Absatz>
              </View>
            </View>
            {plaene.map((pl) => (
              <View key={pl.klasse} style={{ width: `${rest * 100}%`, padding: 8, borderLeftWidth: 0.8, borderLeftColor: NEUTRAL.rahmen, backgroundColor: grund(pl.klasse) }}>
                <Absatz groesse={8.3} style={{ lineHeight: 1.38 }}>
                  {ty(pl.ziele[kd.id][sprache], sprache)}
                </Absatz>
              </View>
            ))}
          </View>
        ))}
      </View>
      <Absatz groesse={8.8} farbe={NEUTRAL.leise} style={{ marginTop: 10 }}>
        {ty(k.hinweis, sprache)}
      </Absatz>
      <Quellen liste={[quelle('casel2020')]} />
      <Fuss links={FACH.name} titel={ty(k.titel, sprache)} sprache={sprache} />
    </Page>
  )
}

/** Die 100 Minuten als Balken: Breite je Phase nach Minuten. */
function Zeitleiste({ ablauf, sprache }: { ablauf: HandbuchText['doppelstunde']['ablauf']; sprache: Sprache }) {
  const ende = Number(ablauf[ablauf.length - 1].min.split('–')[1])
  const teile = ablauf.map((a) => {
    const [von, bis] = a.min.split('–').map(Number)
    return { ...a, von, bis }
  })
  return (
    <View style={{ marginTop: 4, marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', height: 26, borderRadius: 6, overflow: 'hidden' }}>
        {teile.map((a, i) => (
          <View key={i} style={{ width: ((a.bis - a.von) / ende) * BREITE, backgroundColor: PHASEN[a.phase].farbe, borderRightWidth: i < teile.length - 1 ? 1.2 : 0, borderRightColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
            {a.bis - a.von >= 10 ? <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, color: '#FFFFFF' }}>{ty(a.titel, sprache)}</Text> : null}
          </View>
        ))}
      </View>
      <View style={{ height: 12, marginTop: 2 }}>
        {[0, ...teile.map((a) => a.bis)].map((m, i) => (
          <Text key={i} style={{ position: 'absolute', left: Math.min(BREITE - 14, Math.max(0, (m / ende) * BREITE - 7)), width: 14, textAlign: m === 0 ? 'left' : m === ende ? 'right' : 'center', fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.leise }}>
            {String(m)}
          </Text>
        ))}
      </View>
    </View>
  )
}

function DoppelstundeSeite({ sprache, p, klasse, text, marken }: { sprache: Sprache; p: Palette; klasse: Klasse; text: HandbuchText; marken?: Marken }) {
  const t = TX[sprache]
  const d = text.doppelstunde
  const halb = Math.ceil(d.klasse.punkte.length / 2)
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id="a3" marken={marken} />
      <KopfA t={t} klasse={klasse} p={p} />
      <SeitenTitel titel={d.titel} unter={d.einleitung} p={p} sprache={sprache} />
      <Zeitleiste ablauf={d.ablauf} sprache={sprache} />
      {d.ablauf.map((a, i) => (
        <View key={i} wrap={false} style={{ flexDirection: 'row', paddingVertical: 4.5, borderBottomWidth: i < d.ablauf.length - 1 ? 0.6 : 0, borderBottomColor: NEUTRAL.haarlinie }}>
          <Text style={{ width: 46, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: NEUTRAL.text }}>{a.min}</Text>
          <View style={{ width: 128, flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: PHASEN[a.phase].farbe, marginTop: 2.5, marginRight: 6 }} />
            <Fett groesse={9}>{ty(a.titel, sprache)}</Fett>
          </View>
          <View style={{ flex: 1 }}>
            <Absatz groesse={8.8} style={{ lineHeight: 1.4 }}>
              {ty(a.text, sprache)}
            </Absatz>
          </View>
        </View>
      ))}
      <Zwischentitel p={p} oben={16}>
        {ty(d.rituale.titel, sprache)}
      </Zwischentitel>
      <View style={{ flexDirection: 'row', marginHorizontal: -4 }}>
        {d.rituale.punkte.map((r, i) => (
          <View key={i} style={{ flex: 1, paddingHorizontal: 4 }}>
            <View style={{ backgroundColor: p.zart, borderRadius: 9, padding: 9, minHeight: 64 }}>
              <Fett groesse={9} farbe={p.tief}>
                {ty(r.titel, sprache)}
              </Fett>
              <Absatz groesse={8.3} style={{ lineHeight: 1.38, marginTop: 2 }}>
                {ty(r.text, sprache)}
              </Absatz>
            </View>
          </View>
        ))}
      </View>
      <Zwischentitel p={p} oben={16}>
        {ty(d.klasse.titel, sprache)}
      </Zwischentitel>
      <View style={{ flexDirection: 'row' }}>
        {[d.klasse.punkte.slice(0, halb), d.klasse.punkte.slice(halb)].map((liste, s) => (
          <View key={s} style={{ flex: 1, marginRight: s ? 0 : 16 }}>
            {liste.map((x, i) => (
              <View key={i} wrap={false} style={{ flexDirection: 'row', marginBottom: 7 }}>
                <View style={{ width: 4.5, height: 4.5, borderRadius: 2.25, backgroundColor: p.tief, marginTop: 5, marginRight: 7 }} />
                <View style={{ flex: 1 }}>
                  <Fett groesse={9}>{ty(x.titel, sprache)}</Fett>
                  <Absatz groesse={8.4} farbe={NEUTRAL.leise} style={{ lineHeight: 1.38 }}>
                    {ty(x.text, sprache)}
                  </Absatz>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
      <Fuss links={FACH.name} titel={ty(d.titel, sprache)} sprache={sprache} />
    </Page>
  )
}

function SicherheitSeite({ sprache, p, klasse, text, marken }: { sprache: Sprache; p: Palette; klasse: Klasse; text: HandbuchText; marken?: Marken }) {
  const t = TX[sprache]
  const s = text.sicherheit
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id="a4" marken={marken} />
      <KopfA t={t} klasse={klasse} p={p} />
      <SeitenTitel titel={s.titel} unter={s.einleitung} p={p} sprache={sprache} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 }}>
        {s.grundsaetze.map((g, i) => (
          <View key={i} style={{ width: '50%', paddingHorizontal: 5, marginBottom: 10 }}>
            <View style={{ borderTopWidth: 2.5, borderTopColor: p.tief, paddingTop: 6 }}>
              <Fett groesse={9.6}>{ty(g.titel, sprache)}</Fett>
              <Absatz groesse={8.8} style={{ lineHeight: 1.42, marginTop: 2 }}>
                {ty(g.text, sprache)}
              </Absatz>
            </View>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', marginTop: 6 }}>
        <View wrap={false} style={{ flex: 1.15, backgroundColor: ROT_ZART, borderRadius: 10, padding: 12, borderLeftWidth: 3, borderLeftColor: ROT }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 11, color: '#8A3A24', marginBottom: 6 }}>{ty(s.anvertrauen.titel, sprache)}</Text>
          {s.anvertrauen.schritte.map((x, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 5 }}>
              <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: ROT, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, color: '#FFFFFF' }}>{String(i + 1)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Absatz groesse={9}>{ty(x, sprache)}</Absatz>
              </View>
            </View>
          ))}
        </View>
        <View style={{ width: 12 }} />
        <View wrap={false} style={{ flex: 1, borderWidth: 1, borderColor: p.mittel, borderRadius: 10, padding: 12 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 11, color: p.tief, marginBottom: 4 }}>{ty(s.hilfe.titel, sprache)}</Text>
          <Absatz groesse={8.8} farbe={NEUTRAL.leise}>
            {ty(s.hilfe.text, sprache)}
          </Absatz>
          {s.hilfe.nummern.map((n, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: i ? 0.6 : 0, borderTopColor: NEUTRAL.haarlinie, paddingVertical: 4, marginTop: i ? 0 : 4 }}>
              <Absatz groesse={8.4} style={{ flex: 1, paddingRight: 6, lineHeight: 1.3 }}>
                {ty(n.name, sprache)}
              </Absatz>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: NEUTRAL.text }}>{n.nummer}</Text>
            </View>
          ))}
        </View>
      </View>
      <View wrap={false} style={{ marginTop: 14, flexDirection: 'row', backgroundColor: p.zart, borderRadius: 9, padding: 11, paddingLeft: 12 }}>
        <View style={{ width: 3, borderRadius: 2, backgroundColor: p.tief, marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: p.tief, marginBottom: 3 }}>{ty(s.noten.titel, sprache)}</Text>
          <Absatz groesse={9}>{ty(s.noten.text, sprache)}</Absatz>
        </View>
      </View>
      <Fuss links={FACH.name} titel={ty(s.titel, sprache)} sprache={sprache} />
    </Page>
  )
}

/** Methodenkoffer: Gruppen paarweise nebeneinander, jede Gruppe bleibt zusammen. */
function MethodenSeiten({ sprache, p, klasse, text, marken }: { sprache: Sprache; p: Palette; klasse: Klasse; text: HandbuchText; marken?: Marken }) {
  const t = TX[sprache]
  const m = text.methoden
  const paare: (typeof m.gruppen)[] = []
  for (let i = 0; i < m.gruppen.length; i += 2) paare.push(m.gruppen.slice(i, i + 2))
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id="a5" marken={marken} />
      <KopfA t={t} klasse={klasse} p={p} />
      <SeitenTitel titel={m.titel} unter={m.einleitung} p={p} sprache={sprache} />
      {paare.map((paar, pi) => (
        <View key={pi} wrap={false} style={{ flexDirection: 'row', marginTop: pi ? 12 : 2 }}>
          {paar.map((g, gi) => (
            <View key={gi} style={{ flex: 1, marginLeft: gi ? 14 : 0 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1.4, borderBottomColor: p.tief, paddingBottom: 3, marginBottom: 4 }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10.5, color: NEUTRAL.text, flex: 1 }}>{ty(g.titel, sprache)}</Text>
                {g.wann ? (
                  <View style={{ backgroundColor: p.zart, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 1.5 }}>
                    <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: p.tief }}>{`${g.wann} ${t.min}`}</Text>
                  </View>
                ) : null}
              </View>
              {g.text ? (
                <Absatz groesse={7.9} farbe={NEUTRAL.leise} style={{ lineHeight: 1.38, marginBottom: 3 }}>
                  {ty(g.text, sprache)}
                </Absatz>
              ) : null}
              {g.eintraege.map((x, i) => (
                <View key={i} style={{ marginTop: 3.5 }}>
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.2, lineHeight: 1.4, color: NEUTRAL.text }}>
                    <Text style={{ fontWeight: 600 }}>{`${ty(x.titel, sprache)}${sprache === 'fr' ? ' : ' : ': '}`}</Text>
                    {ty(x.text, sprache)}
                  </Text>
                </View>
              ))}
            </View>
          ))}
          {paar.length < 2 ? <View style={{ flex: 1, marginLeft: 14 }} /> : null}
        </View>
      ))}
      <Fuss links={FACH.name} titel={ty(m.titel, sprache)} sprache={sprache} />
    </Page>
  )
}

function ElternSeite({ sprache, p, klasse, text, marken }: { sprache: Sprache; p: Palette; klasse: Klasse; text: HandbuchText; marken?: Marken }) {
  const t = TX[sprache]
  const e = text.eltern
  const halb = Math.ceil(e.punkte.length / 2)
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id="a6" marken={marken} />
      <KopfA t={t} klasse={klasse} p={p} />
      <SeitenTitel titel={e.titel} unter={e.einleitung} p={p} sprache={sprache} />
      <View style={{ flexDirection: 'row' }}>
        {[e.punkte.slice(0, halb), e.punkte.slice(halb)].map((liste, s) => (
          <View key={s} style={{ flex: 1, marginLeft: s ? 16 : 0 }}>
            {liste.map((x, i) => (
              <View key={i} wrap={false} style={{ borderTopWidth: 2.5, borderTopColor: p.tief, paddingTop: 6, marginBottom: 12 }}>
                <Fett groesse={9.6}>{ty(x.titel, sprache)}</Fett>
                <Absatz groesse={8.8} style={{ lineHeight: 1.42, marginTop: 2 }}>
                  {ty(x.text, sprache)}
                </Absatz>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View wrap={false} style={{ marginTop: 6, borderWidth: 1, borderColor: p.mittel, borderRadius: 10, padding: 12 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10.5, color: p.tief, marginBottom: 4 }}>{ty(e.kollegium.titel, sprache)}</Text>
        <Absatz groesse={9} style={{ lineHeight: 1.5 }}>
          {ty(e.kollegium.text, sprache)}
        </Absatz>
      </View>
      <Fuss links={FACH.name} titel={ty(e.titel, sprache)} sprache={sprache} />
    </Page>
  )
}

/** Elternbrief als Kopiervorlage, in seiner eigenen Sprache – mit Rückmeldeabschnitt zum Abtrennen. */
function BriefSeite({ brief, briefSprache, sprache, p, klasse, marken }: { brief: ElternBrief; briefSprache: Sprache; sprache: Sprache; p: Palette; klasse: Klasse; marken?: Marken }) {
  const t = TX[sprache]
  const b = (x: string) => ty(x, briefSprache)
  const linie = (label: string, flex = 1) => (
    <View style={{ flex, marginRight: 14 }}>
      <View style={{ height: 20, borderBottomWidth: 0.9, borderBottomColor: NEUTRAL.linie }} />
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.6, color: NEUTRAL.leise, marginTop: 2 }}>{b(label)}</Text>
    </View>
  )
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id={`brief-${briefSprache}`} marken={marken} />
      <Kopf reiter={t.kopiervorlage} meta={`${FACH.name}  ·  ${t.lehrerhandbuch} ${klasse}  ·  ${brief.seite}`} p={p} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, marginBottom: 22 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: p.tief, letterSpacing: 0.6 }}>{versal(FACH.name)}</Text>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9, color: NEUTRAL.leise }}>{briefSprache === 'fr' ? '[Lycée], le [date]' : '[Schule], den [Datum]'}</Text>
      </View>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 13, color: NEUTRAL.text, marginBottom: 14 }}>{b(brief.betreff)}</Text>
      <Absatz groesse={10} style={{ marginBottom: 8 }}>
        {b(brief.anrede)}
      </Absatz>
      {brief.absaetze.map((x, i) => (
        <Absatz key={i} groesse={10} style={{ marginBottom: 8, lineHeight: 1.55 }}>
          {b(x)}
        </Absatz>
      ))}
      <Absatz groesse={10} style={{ marginTop: 4 }}>
        {b(brief.gruss)}
      </Absatz>
      <Absatz groesse={9.4} farbe={NEUTRAL.leise} style={{ marginTop: 18 }}>
        {b(brief.unterschrift)}
      </Absatz>
      <View wrap={false} style={{ marginTop: 'auto' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: NEUTRAL.linie, borderStyle: 'dashed' }} />
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise, marginHorizontal: 6 }}>{briefSprache === 'fr' ? 'à découper' : 'hier abtrennen'}</Text>
          <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: NEUTRAL.linie, borderStyle: 'dashed' }} />
        </View>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: NEUTRAL.text, marginBottom: 6 }}>{b(brief.abschnitt.titel)}</Text>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          {brief.abschnitt.felder.map((f, i) => (
            <View key={i} style={{ flex: i ? 1 : 2.4, flexDirection: 'row' }}>
              {linie(f)}
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
          <View style={{ width: 10, height: 10, borderWidth: 1, borderColor: NEUTRAL.linie, borderRadius: 2, marginRight: 7, marginTop: 1 }} />
          <Absatz groesse={9.2}>{b(brief.abschnitt.bestaetigung)}</Absatz>
        </View>
        <Absatz groesse={9} farbe={NEUTRAL.leise}>
          {b(brief.abschnitt.frage)}
        </Absatz>
        {[0, 1].map((i) => (
          <View key={i} style={{ height: 20, borderBottomWidth: 0.9, borderBottomColor: NEUTRAL.linie }} />
        ))}
        <View style={{ flexDirection: 'row', marginTop: 8 }}>{linie(brief.abschnitt.unterschrift)}</View>
      </View>
      <Fuss links={FACH.name} titel={brief.seite} sprache={sprache} />
    </Page>
  )
}

function MaterialSeite({ sprache, p, klasse, text, marken }: { sprache: Sprache; p: Palette; klasse: Klasse; text: HandbuchText; marken?: Marken }) {
  const t = TX[sprache]
  const m = text.material
  const halb = Math.ceil(m.gruppen.length / 2)
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id="a7" marken={marken} />
      <KopfA t={t} klasse={klasse} p={p} />
      <SeitenTitel titel={m.titel} unter={m.einleitung} p={p} sprache={sprache} />
      <View style={{ flexDirection: 'row' }}>
        {[m.gruppen.slice(0, halb), m.gruppen.slice(halb)].map((liste, s) => (
          <View key={s} style={{ flex: 1, marginLeft: s ? 16 : 0 }}>
            {liste.map((g, i) => (
              <View key={i} wrap={false} style={{ backgroundColor: NEUTRAL.flaeche, borderRadius: 9, padding: 11, marginBottom: 12 }}>
                <Kleinlabel farbe={p.tief} style={{ marginBottom: 5 }}>
                  {g.titel}
                </Kleinlabel>
                {g.punkte.map((x, j) => (
                  <View key={j} style={{ flexDirection: 'row', marginBottom: 3.5 }}>
                    <View style={{ width: 8, height: 8, borderWidth: 0.9, borderColor: NEUTRAL.leise, borderRadius: 1.5, marginTop: 2.6, marginRight: 7, backgroundColor: '#FFFFFF' }} />
                    <View style={{ flex: 1 }}>
                      <Absatz groesse={8.8} style={{ lineHeight: 1.4 }}>
                        {ty(x, sprache)}
                      </Absatz>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
      <Fuss links={FACH.name} titel={ty(m.titel, sprache)} sprache={sprache} />
    </Page>
  )
}

// --- Teil B: Jahresplan und Jahresweg ----------------------------------------------------------------------------

function nummernVon(e: PlanEinheit): string {
  const n = e.termine ?? 1
  return n > 1 ? `${e.nr}–${e.nr + n - 1}` : String(e.nr)
}

function Abzeichen({ text, grund, farbe, rahmen }: { text: string; grund: string; farbe: string; rahmen?: string }) {
  return (
    <View style={{ backgroundColor: grund, borderRadius: 3, paddingHorizontal: 4, paddingVertical: 1.2, marginLeft: 5, borderWidth: rahmen ? 0.7 : 0, borderColor: rahmen }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.4, letterSpacing: 0.4, color: farbe }}>{versal(text)}</Text>
    </View>
  )
}

function NummerKreis({ e, p, d = 16 }: { e: PlanEinheit; p: Palette; d?: number }) {
  const nr = nummernVon(e)
  const breit = nr.length > 2
  return (
    <View style={{ minWidth: d, height: d, paddingHorizontal: breit ? 4 : 0, borderRadius: d / 2, backgroundColor: e.wahl ? '#FFFFFF' : p.tief, borderWidth: e.wahl ? 1.1 : 0, borderColor: p.tief, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: d * 0.475, color: e.wahl ? p.tief : '#FFFFFF' }}>{nr}</Text>
    </View>
  )
}

function PlanZeile({ e, sprache, p, t, seite }: { e: PlanEinheit; sprache: Sprache; p: Palette; t: FachTx; seite?: number }) {
  return (
    <View wrap={false} style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 1.9, borderBottomWidth: 0.5, borderBottomColor: NEUTRAL.haarlinie }}>
      <View style={{ width: 34, alignItems: 'flex-start', paddingTop: 1 }}>
        <NummerKreis e={e} p={p} />
      </View>
      <View style={{ flex: 1, paddingRight: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: NEUTRAL.text }}>{ty(e.titel[sprache], sprache)}</Text>
          {e.neu ? <Abzeichen text={t.neuKurz} grund={WARM} farbe={NEUTRAL.tinte} /> : null}
          {e.wahl ? <Abzeichen text={t.wahlKurz} grund="#FFFFFF" farbe={p.tief} rahmen={p.tief} /> : null}
          {(e.termine ?? 1) > 1 ? <Abzeichen text={t.termine(e.termine ?? 1)} grund={NEUTRAL.flaeche} farbe={NEUTRAL.leise} /> : null}
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.7, lineHeight: 1.25, color: NEUTRAL.leise, marginTop: 0.3 }}>{ty(e.kurz[sprache], sprache)}</Text>
        {e.hinweis ? <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 7.2, color: ROT, marginTop: 1 }}>{`! ${ty(e.hinweis[sprache], sprache)}`}</Text> : null}
      </View>
      <View style={{ paddingTop: 4, alignItems: 'flex-end' }}>
        <KompetenzPunkte aktiv={e.kompetenzen} d={6.5} />
        {seite ? <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: p.tief, marginTop: 3 }}>{t.seiteKurz(seite)}</Text> : null}
      </View>
    </View>
  )
}

function TrimesterKopf({ tr, bereich, sprache, p }: { tr: 1 | 2 | 3; bereich: string; sprache: Sprache; p: Palette }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingBottom: 3, borderBottomWidth: 1.2, borderBottomColor: p.tief }}>
      <Kleinlabel farbe={p.tief}>{trimesterName(tr, sprache)}</Kleinlabel>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, marginLeft: 8, flex: 1 }}>{bereich}</Text>
    </View>
  )
}

function KapitelKopf({ k, sprache, p, t }: { k: Kapitel; sprache: Sprache; p: Palette; t: FachTx }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
      <Plakette name={k.bild} d={15} farbe={p.tief} grund={p.zart} />
      <Text style={{ marginLeft: 6, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: p.tief }}>{`${t.kapitel} ${k.nr} · ${ty(k.titel[sprache], sprache)}`}</Text>
      <Text style={{ marginLeft: 6, flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 7.8, color: NEUTRAL.leise }}>{ty(k.leitfrage[sprache], sprache)}</Text>
    </View>
  )
}

/** Einheiten-Nummern eines Kapitels oder Trimesters, z. B. „Einheiten 6–8“ */
function bereichText(liste: PlanEinheit[], t: FachTx): string {
  const nr = liste.flatMap((e) => Array.from({ length: e.termine ?? 1 }, (_, i) => e.nr + i))
  if (!nr.length) return ''
  return nr.length > 1 ? `${t.einheiten} ${nr[0]}–${nr[nr.length - 1]}` : `${t.einheit} ${nr[0]}`
}

function JahresplanSeiten({ plan, sprache, text, marken, seiten, fertig }: { plan: Jahresplan; sprache: Sprache; text: HandbuchText; marken?: Marken; seiten?: Marken; fertig: Set<string> }) {
  const t = TX[sprache]
  const p = stufenPalette(plan.klasse)
  const trimester: (1 | 2 | 3)[] = [1, 2, 3]
  /** Seite der Einheit in diesem Heft (nur, wenn sie ausgearbeitet ist) */
  const seite = (e: PlanEinheit) => (fertig.has(e.id) ? seiteVon(seiten, `c-${e.id}`) : undefined)
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id="b-plan" marken={marken} />
      <Kopf reiter={`${t.jahresplan} ${plan.klasse}`} meta={`${FACH.name}  ·  ${t.teilB}`} p={p} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
        <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: p.tief, alignItems: 'center', justifyContent: 'center', marginRight: 11 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 17, color: '#FFFFFF' }}>{plan.klasse}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 19, lineHeight: 1.15, color: NEUTRAL.text, letterSpacing: -0.3 }}>{ty(plan.titel[sprache], sprache)}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.4, color: NEUTRAL.leise, marginTop: 2 }}>{ty(plan.untertitel[sprache], sprache)}</Text>
        </View>
      </View>
      <Absatz groesse={8.8} style={{ lineHeight: 1.45 }}>
        {ty(plan.faden[sprache], sprache)}
      </Absatz>
      <View style={{ marginTop: 7, paddingVertical: 6, paddingHorizontal: 8, backgroundColor: NEUTRAL.flaeche, borderRadius: 7 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
          {KOMPETENZEN.map((k) => (
            <KompetenzChip key={k.id} id={k.id} sprache={sprache} groesse={7.4} />
          ))}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
            <View style={{ width: 8.5, height: 8.5, borderRadius: 4.25, borderWidth: 1.1, borderColor: p.tief, marginRight: 4 }} />
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.text }}>{t.wahl}</Text>
          </View>
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, lineHeight: 1.35, color: NEUTRAL.leise, marginTop: 1 }}>{ty(text.plaene.einleitung, sprache)}</Text>
      </View>
      {trimester.map((tr) => {
        const kapitel = plan.kapitel.filter((k) => k.trimester === tr)
        const einheiten = plan.einheiten.filter((e) => kapitel.some((k) => k.id === e.kapitel))
        return (
          <View key={tr}>
            {kapitel.map((k, ki) => {
              const liste = plan.einheiten.filter((e) => e.kapitel === k.id)
              return (
                <View key={k.id}>
                  {/* Trimester- und Kapitelkopf bleiben mit der ersten Einheit zusammen */}
                  <View wrap={false}>
                    {ki === 0 ? <TrimesterKopf tr={tr} bereich={bereichText(einheiten, t)} sprache={sprache} p={p} /> : null}
                    <KapitelKopf k={k} sprache={sprache} p={p} t={t} />
                    {liste[0] ? <PlanZeile e={liste[0]} sprache={sprache} p={p} t={t} seite={seite(liste[0])} /> : null}
                  </View>
                  {liste.slice(1).map((e) => (
                    <PlanZeile key={e.id} e={e} sprache={sprache} p={p} t={t} seite={seite(e)} />
                  ))}
                </View>
              )
            })}
          </View>
        )
      })}
      <Fuss links={FACH.name} titel={`${t.jahresplan} ${plan.klasse} · ${ty(plan.titel[sprache], sprache)}`} sprache={sprache} />
    </Page>
  )
}

/** Plakat „Unser Weg durch die 7e“: die Kapitel als Stationen auf einem Weg in drei Reihen (Trimester). */
function JahreswegSeite({ plan, sprache, text, marken }: { plan: Jahresplan; sprache: Sprache; text: HandbuchText; marken?: Marken }) {
  const t = TX[sprache]
  const p = stufenPalette(plan.klasse)
  const reihen = ([1, 2, 3] as const).map((tr) => plan.kapitel.filter((k) => k.trimester === tr))
  const spalten = Math.max(...reihen.map((r) => r.length))
  const zelle = BREITE / spalten
  const oben = 74
  const abstand = 200
  const d = 58
  const hoehe = oben + 2 * abstand + 130
  /** Mittelpunkt der Station: die mittlere Reihe läuft von rechts nach links */
  const punkt = (r: number, i: number, n: number) => {
    const versatz = (spalten - n) * zelle * 0.5
    const x = r === 1 ? BREITE - versatz - zelle * (i + 0.5) : versatz + zelle * (i + 0.5)
    return { x, y: oben + r * abstand }
  }
  const punkte = reihen.flatMap((r, ri) => r.map((_, i) => punkt(ri, i, r.length)))
  // Weg: gerade Stücke in den Reihen, Bögen an den Enden
  let weg = ''
  punkte.forEach((q, i) => {
    if (!i) {
      weg = `M ${q.x - zelle * 0.45} ${q.y} L ${q.x} ${q.y}`
      return
    }
    const v = punkte[i - 1]
    if (v.y === q.y) {
      weg += ` L ${q.x} ${q.y}`
      return
    }
    const rechts = q.x > BREITE / 2
    const kante = rechts ? Math.max(v.x, q.x) + zelle * 0.36 : Math.min(v.x, q.x) - zelle * 0.36
    const r = rechts ? -20 : 20
    weg += ` L ${kante + r} ${v.y} Q ${kante} ${v.y} ${kante} ${v.y + 20} L ${kante} ${q.y - 20} Q ${kante} ${q.y} ${kante + r} ${q.y} L ${q.x} ${q.y}`
  })
  const letzter = punkte[punkte.length - 1]
  weg += ` L ${letzter.x + zelle * 0.45} ${letzter.y}`
  const start = reihen.map((_, ri) => reihen.slice(0, ri).reduce((n, r) => n + r.length, 0))
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id="b-weg" marken={marken} />
      <Kopf reiter={t.kopiervorlage} meta={`${FACH.name}  ·  ${t.teilB}  ·  ${ty(text.jahresweg.titel, sprache)}`} p={p} />
      <View style={{ alignItems: 'center', marginTop: 2 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 30, color: p.tief, letterSpacing: -0.5 }}>{ty(text.jahresweg.plakat.replaceAll('{klasse}', plan.klasse), sprache)}</Text>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 11, color: NEUTRAL.leise, marginTop: 4 }}>{`${FACH.name} · ${ty(plan.titel[sprache], sprache)}`}</Text>
      </View>
      <View style={{ height: hoehe, marginTop: 10 }}>
        <Svg width={BREITE} height={hoehe} style={{ position: 'absolute', left: 0, top: 0 }}>
          <Path d={weg} stroke={p.zart} strokeWidth={30} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Path d={weg} stroke={p.mittel} strokeWidth={1.6} fill="none" strokeDasharray="6 7" strokeLinecap="round" />
          {punkte.map((q, i) => (
            <Circle key={i} cx={q.x} cy={q.y} r={d / 2 + 5} fill="#FFFFFF" stroke={p.mittel} strokeWidth={1} />
          ))}
        </Svg>
        {reihen.map((_, ri) => (
          <Text key={`t${ri}`} style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', top: oben + ri * abstand - d / 2 - 34, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, letterSpacing: 1, color: p.tief }}>
            {versal(trimesterName((ri + 1) as 1 | 2 | 3, sprache))}
          </Text>
        ))}
        {reihen.flatMap((r, ri) =>
          r.map((k, i) => {
            const q = punkte[start[ri] + i]
            return (
              <View key={k.id} style={{ position: 'absolute', left: q.x - zelle / 2, top: q.y - d / 2, width: zelle, alignItems: 'center' }}>
                <Plakette name={k.bild} d={d} farbe="#FFFFFF" grund={p.tief} />
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, lineHeight: 1.2, color: NEUTRAL.text, marginTop: 11, textAlign: 'center', paddingHorizontal: 4 }}>{`${k.nr} · ${ty(k.titel[sprache], sprache)}`}</Text>
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.6, lineHeight: 1.3, color: NEUTRAL.leise, marginTop: 2, textAlign: 'center', paddingHorizontal: 6 }}>{ty(k.leitfrage[sprache], sprache)}</Text>
                <View style={{ width: 11, height: 11, borderWidth: 1, borderColor: p.tief, borderRadius: 2, marginTop: 5 }} />
              </View>
            )
          }),
        )}
      </View>
      <View style={{ position: 'absolute', left: 40, right: 40, bottom: 66 }}>
        <Absatz groesse={8} farbe={NEUTRAL.leise} style={{ textAlign: 'center' }}>
          {ty(text.jahresweg.text, sprache)}
        </Absatz>
      </View>
      <Fuss links={FACH.name} titel={ty(text.jahresweg.titel, sprache)} sprache={sprache} />
    </Page>
  )
}

// --- Teil C: Kapitel und Einheiten -----------------------------------------------------------------------------------

function KapitelSeite({ k, plan, einheiten, sprache, marken, seiten, heft }: { k: Kapitel; plan: Jahresplan; einheiten: Einheit[]; sprache: Sprache; marken?: Marken; seiten?: Marken; heft?: Marken }) {
  const t = TX[sprache]
  const p = stufenPalette(plan.klasse)
  const liste = plan.einheiten.filter((e) => e.kapitel === k.id)
  const kompetenzen = KOMPETENZEN.filter((kd) => liste.some((e) => e.kompetenzen.includes(kd.id))).map((kd) => kd.id)
  // Kapitelende: Skills-Kompass (6e) oder Skills-Buch (5e) in der letzten ausgearbeiteten Einheit des Kapitels
  const letzte = [...liste].reverse().map((e) => einheiten.find((x) => x.id === e.id)).find(Boolean)
  const ende = letzte?.blaetter.find((id) => id === 'ff-skills-kompass' || id === 'ff-skills-buch')
  // Notizfeld: so viele Zeilen, wie sicher noch auf die Seite passen (geschätzt, eher knapp)
  const zeilen = (text: string, zeichen: number) => Math.ceil(text.length / zeichen)
  const belegt =
    46 + 150 + (k.worum ? 16 + zeilen(k.worum[sprache], 88) * 16.8 : 0) + 34 +
    liste.reduce((h, e) => h + 18 + 16 + zeilen(e.kurz[sprache], 95) * 12.4 + (e.hinweis ? 12 : 0), 0) +
    (ende ? 58 : 0) + 30
  const notizZeilen = Math.floor((756 - belegt - 40) / 22) - 1
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id={`k-${k.id}`} marken={marken} />
      <Kopf reiter={`${t.kapitel} ${k.nr}`} meta={`${FACH.name}  ·  ${plan.klasse}  ·  ${t.teil(2, t.teilC)}`} p={p} />
      <View style={{ backgroundColor: p.zart, borderRadius: 14, padding: 22, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Kleinlabel farbe={p.tief}>{`${trimesterName(k.trimester, sprache)} · ${bereichText(liste, t)}`}</Kleinlabel>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 8 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 54, lineHeight: 1, color: p.tief, marginRight: 12 }}>{String(k.nr)}</Text>
            <Text style={{ flex: 1, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 24, lineHeight: 1.12, color: NEUTRAL.text, letterSpacing: -0.3, marginBottom: 4 }}>{ty(k.titel[sprache], sprache)}</Text>
          </View>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 12, lineHeight: 1.4, color: NEUTRAL.leise, marginTop: 8 }}>{ty(k.leitfrage[sprache], sprache)}</Text>
        </View>
        <Plakette name={k.bild} d={78} farbe="#FFFFFF" grund={p.tief} />
      </View>
      {k.worum ? (
        <Absatz groesse={10.4} style={{ marginTop: 16, lineHeight: 1.6 }}>
          {ty(k.worum[sprache], sprache)}
        </Absatz>
      ) : null}
      <Zwischentitel p={p} oben={18}>
        {t.imKapitel}
      </Zwischentitel>
      {liste.map((e) => {
        const s = einheiten.some((x) => x.id === e.id) ? seiteVon(seiten, `c-${e.id}`) : undefined
        return (
          <View key={e.id} wrap={false} style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 7, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie }}>
            <View style={{ width: 34, paddingTop: 1, alignItems: 'flex-start' }}>
              <NummerKreis e={e} p={p} d={20} />
            </View>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 11, color: NEUTRAL.text }}>{ty(e.titel[sprache], sprache)}</Text>
                {e.neu ? <Abzeichen text={t.neuKurz} grund={WARM} farbe={NEUTRAL.tinte} /> : null}
                {e.wahl ? <Abzeichen text={t.wahlKurz} grund="#FFFFFF" farbe={p.tief} rahmen={p.tief} /> : null}
              </View>
              <Absatz groesse={8.8} farbe={NEUTRAL.leise} style={{ lineHeight: 1.4, marginTop: 1 }}>
                {ty(e.kurz[sprache], sprache)}
              </Absatz>
              {e.hinweis ? <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8, color: ROT, marginTop: 2 }}>{`! ${ty(e.hinweis[sprache], sprache)}`}</Text> : null}
            </View>
            <View style={{ alignItems: 'flex-end', paddingTop: 3 }}>
              <KompetenzPunkte aktiv={e.kompetenzen} d={7} />
              {s ? <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: p.tief, marginTop: 5 }}>{t.seiteKurz(s)}</Text> : null}
            </View>
          </View>
        )
      })}
      {ende ? (
        <View wrap={false} style={{ marginTop: 14, flexDirection: 'row', alignItems: 'center', backgroundColor: NEUTRAL.flaeche, borderRadius: 9, padding: 10 }}>
          <Plakette name={ende === 'ff-skills-kompass' ? 'icon:compass' : 'icon:book'} d={24} farbe="#FFFFFF" grund={p.tief} />
          <Absatz groesse={9} style={{ marginLeft: 9, flex: 1 }}>
            {ty(`${t.kapitelEnde(ende === 'ff-skills-kompass' ? (sprache === 'fr' ? 'une entrée dans la boussole des skills' : 'ein Eintrag im Skills-Kompass') : sprache === 'fr' ? 'une page dans le livre des skills' : 'eine Seite im Skills-Buch')}${heft?.get(ende) ? ` (${t.heftKurz(heft.get(ende)!)})` : ''}.`, sprache)}
          </Absatz>
        </View>
      ) : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
        {kompetenzen.map((id: Kompetenz) => (
          <KompetenzChip key={id} id={id} sprache={sprache} groesse={8.4} />
        ))}
      </View>
      {notizZeilen > 1 ? (
        <View wrap={false} style={{ marginTop: 14, borderWidth: 0.8, borderColor: NEUTRAL.rahmen, borderRadius: 9, paddingHorizontal: 11, paddingTop: 8 }}>
          <Kleinlabel>{t.notizen}</Kleinlabel>
          {Array.from({ length: notizZeilen }, (_, i) => (
            <View key={i} style={{ height: 22, borderBottomWidth: i < notizZeilen - 1 ? 0.5 : 0, borderBottomColor: NEUTRAL.haarlinie }} />
          ))}
        </View>
      ) : null}
      <Fuss links={FACH.name} titel={`${t.kapitel} ${k.nr} · ${ty(k.titel[sprache], sprache)}`} sprache={sprache} />
    </Page>
  )
}

/** Verweis im Schritt und in der Ablauf-Zeile: Seite im Schülerheft, sonst Seite der Kopiervorlage im Handbuch */
function HeftVerweis({ text, p }: { text?: string; p: Palette }) {
  if (!text) return null
  return (
    <View style={{ borderWidth: 0.8, borderColor: p.tief, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1.2, marginLeft: 6 }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.8, letterSpacing: 0.3, color: p.tief }}>{text}</Text>
    </View>
  )
}

function KleineTabelle({ tabelle, sprache, p }: { tabelle: NonNullable<Schritt['tabelle']>; sprache: Sprache; p: Palette }) {
  const n = tabelle.spalten.length
  const breite = (i: number) => (n === 2 ? (i ? '62%' : '38%') : `${100 / n}%`)
  return (
    <View style={{ marginTop: 7, borderWidth: 0.8, borderColor: NEUTRAL.rahmen, borderRadius: 7 }}>
      <View wrap={false} style={{ flexDirection: 'row', backgroundColor: p.zart, borderTopLeftRadius: 7, borderTopRightRadius: 7, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.rahmen }}>
        {tabelle.spalten.map((s, i) => (
          <View key={i} style={{ width: breite(i), paddingHorizontal: 7, paddingVertical: 4 }}>
            <Fett groesse={8.2}>{ty(s, sprache)}</Fett>
          </View>
        ))}
      </View>
      {tabelle.zeilen.map((z, r) => (
        <View key={r} wrap={false} style={{ flexDirection: 'row', borderBottomWidth: r < tabelle.zeilen.length - 1 ? 0.6 : 0, borderBottomColor: NEUTRAL.haarlinie }}>
          {z.map((x, i) => (
            <View key={i} style={{ width: breite(i), paddingHorizontal: 7, paddingVertical: 3 }}>
              <Absatz groesse={8.2} style={{ lineHeight: 1.3, fontWeight: i === 0 ? 600 : 400 }}>
                {ty(x, sprache)}
              </Absatz>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

function SchrittBlock({ s, nr, sprache, p, t, verweis }: { s: Schritt; nr: number; sprache: Sprache; p: Palette; t: FachTx; verweis?: string }) {
  const ph = PHASEN[s.phase]
  const [auf, zu] = t.anf
  const zitat = (x: string) => ty(`${auf}${sprache === 'fr' ? ' ' : ''}${x}${sprache === 'fr' ? ' ' : ''}${zu}`, sprache)
  const kaesten = [
    s.tipp ? { titel: t.tipp, text: s.tipp, farbe: GRUEN, grund: GRUEN_ZART } : null,
    s.wennEsKippt ? { titel: t.kippt, text: s.wennEsKippt, farbe: ROT, grund: ROT_ZART } : null,
  ].filter((x): x is { titel: string; text: string; farbe: string; grund: string } => !!x)
  return (
    <View style={{ marginTop: 13 }}>
      <View minPresenceAhead={80} wrap={false} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        <View style={{ width: 21, height: 21, borderRadius: 10.5, backgroundColor: ph.farbe, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.6, color: '#FFFFFF' }}>{String(nr)}</Text>
        </View>
        <Text style={{ marginLeft: 8, flex: 1, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 11.5, color: NEUTRAL.text }}>{ty(s.titel, sprache)}</Text>
        <HeftVerweis text={verweis} p={p} />
        <Text style={{ marginLeft: 8, fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8, color: ph.farbe }}>{`${s.dauer} ${t.min} · ${ph.name[sprache]}`}</Text>
      </View>
      <View style={{ marginLeft: 29 }}>
        <Absatz groesse={9.4}>{ty(s.text, sprache)}</Absatz>
        {s.sagen?.length ? (
          <View wrap={false} style={{ marginTop: 7, backgroundColor: NEUTRAL.flaeche, borderLeftWidth: 3, borderLeftColor: ph.farbe, borderRadius: 6, paddingVertical: 7, paddingHorizontal: 9 }}>
            <Kleinlabel style={{ marginBottom: 2 }}>{t.sagen}</Kleinlabel>
            {s.sagen.map((x, i) => (
              <Absatz key={i} groesse={9.2} style={{ marginTop: i ? 3 : 1 }}>
                {zitat(x)}
              </Absatz>
            ))}
          </View>
        ) : null}
        {s.punkte?.length ? (
          <View style={{ marginTop: 7 }}>
            <Punktliste punkte={s.punkte} p={p} sprache={sprache} groesse={9} />
          </View>
        ) : null}
        {s.tabelle ? <KleineTabelle tabelle={s.tabelle} sprache={sprache} p={p} /> : null}
        {kaesten.length ? (
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            {kaesten.map((k, i) => (
              <View key={i} wrap={false} style={{ flex: 1, marginLeft: i ? 8 : 0, backgroundColor: k.grund, borderRadius: 8, padding: 8 }}>
                <Kleinlabel farbe={k.farbe} style={{ marginBottom: 2 }}>
                  {k.titel}
                </Kleinlabel>
                <Absatz groesse={8.6} style={{ lineHeight: 1.42 }}>
                  {ty(k.text, sprache)}
                </Absatz>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  )
}

/** Wortspeicher: Wortpaare in der Sprache des Hefts zuerst, in drei Spalten */
function Wortspeicher({ woerter, sprache, p, t }: { woerter: Einheit['woerter']; sprache: Sprache; p: Palette; t: FachTx }) {
  if (!woerter?.length) return null
  const andere: Sprache = sprache === 'fr' ? 'de' : 'fr'
  return (
    <View wrap={false} style={{ marginTop: 12, borderWidth: 0.8, borderColor: p.mittel, borderRadius: 9, paddingHorizontal: 10, paddingVertical: 8 }}>
      <Kleinlabel farbe={p.tief} style={{ marginBottom: 4 }}>{`${t.wortspeicher} · ${t.sprachen[0]} – ${t.sprachen[1]}`}</Kleinlabel>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {woerter.map((w, i) => (
          <View key={i} style={{ width: '33.33%', paddingRight: 8, marginTop: 2.5 }}>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.4, lineHeight: 1.3, color: NEUTRAL.text }}>
              <Text style={{ fontWeight: 600 }}>{ty(w[sprache], sprache)}</Text>
              <Text style={{ color: NEUTRAL.leise }}>{` – ${ty(w[andere], andere)}`}</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

/** `fliessend`: die Schritte beginnen direkt nach der Übersicht statt auf einer neuen Seite (wenn die Übersicht nicht auf eine Seite passt) */
function EinheitSeiten({ e, plan, sprache, blaetter, seiten, marken, heft, fliessend }: { e: Einheit; plan: Jahresplan; sprache: Sprache; blaetter: Map<string, Blatt>; seiten?: Marken; marken?: Marken; heft?: Marken; fliessend?: boolean }) {
  const t = TX[sprache]
  const x = e[sprache]
  const pe = plan.einheiten.find((u) => u.id === e.id)!
  const kap = plan.kapitel.find((k) => k.id === pe.kapitel)!
  const p = stufenPalette(plan.klasse)
  const vorlageSeite = (id: string) => seiteVon(seiten, vorlageId(id))
  /** Blätter im Schülerheft zeigen die Heftseite, Kopiervorlagen für die Lehrkraft die Seite im Handbuch */
  const verweis = (id?: string): string | undefined => {
    if (!id) return undefined
    const h = e.blaetter.includes(id) ? heft?.get(id) : undefined
    if (h) return t.heftKurz(h)
    const v = vorlageSeite(id)
    return v ? t.vorlageSeite(v) : undefined
  }
  const blattZuZeile = (i: number): string | undefined => (x.ablauf.length === x.schritte.length ? x.schritte[i]?.blatt : undefined)
  const alleBlaetter = [...e.blaetter, ...(e.vorlagen ?? [])]
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id={`c-${e.id}`} marken={marken} />
      <Kopf reiter={`${t.einheit} ${pe.nr}`} meta={`${FACH.name}  ·  ${plan.klasse}  ·  ${t.kapitel} ${kap.nr} · ${ty(kap.titel[sprache], sprache)}`} p={p} />
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, paddingRight: 14 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Kleinlabel farbe={p.tief}>{`${t.einheit} ${pe.nr} · ${e.dauer} ${t.min}`}</Kleinlabel>
            {pe.wahl ? <Abzeichen text={t.wahlKurz} grund="#FFFFFF" farbe={p.tief} rahmen={p.tief} /> : null}
            {pe.neu ? <Abzeichen text={t.neuKurz} grund={WARM} farbe={NEUTRAL.tinte} /> : null}
          </View>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 22, lineHeight: 1.15, color: NEUTRAL.text, letterSpacing: -0.3, marginTop: 4 }}>{ty(x.titel, sprache)}</Text>
          <Absatz groesse={10} farbe={NEUTRAL.leise} style={{ marginTop: 4 }}>
            {ty(x.kurz, sprache)}
          </Absatz>
        </View>
        <Plakette name={kap.bild} d={48} farbe={p.tief} grund={p.zart} />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
        {pe.kompetenzen.map((k: Kompetenz) => (
          <KompetenzChip key={k} id={k} sprache={sprache} groesse={8.4} />
        ))}
      </View>
      {pe.hinweis ? <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8.4, color: ROT, marginTop: 2 }}>{`! ${ty(pe.hinweis[sprache], sprache)}`}</Text> : null}

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <View style={{ flex: 1.55, paddingRight: 16 }}>
          <Kleinlabel>{t.ziele}</Kleinlabel>
          <Absatz groesse={8.4} farbe={NEUTRAL.leise} style={{ marginTop: 2, marginBottom: 2 }}>
            {t.zieleUnter}
          </Absatz>
          <Punktliste punkte={x.ziele} p={p} sprache={sprache} groesse={9.2} />
          <Kleinlabel style={{ marginTop: 12, marginBottom: 3 }}>{t.ablauf}</Kleinlabel>
          {x.ablauf.map((a, i) => {
            const ph = PHASEN[a.phase]
            return (
              <View key={i} wrap={false} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 3.2, borderBottomWidth: i < x.ablauf.length - 1 ? 0.5 : 0, borderBottomColor: NEUTRAL.haarlinie }}>
                <Text style={{ width: 38, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: NEUTRAL.text }}>{a.min}</Text>
                <View style={{ width: 3, alignSelf: 'stretch', borderRadius: 1.5, backgroundColor: ph.farbe, marginRight: 7 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 6.6, letterSpacing: 0.5, color: ph.farbe }}>{versal(ph.name[sprache])}</Text>
                  <Absatz groesse={8.8} style={{ lineHeight: 1.3 }}>
                    {ty(a.titel, sprache)}
                  </Absatz>
                </View>
                <HeftVerweis text={verweis(blattZuZeile(i))} p={p} />
              </View>
            )
          })}
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: NEUTRAL.flaeche, borderRadius: 10, padding: 11 }}>
            <Kleinlabel style={{ marginBottom: 4 }}>{t.material}</Kleinlabel>
            {x.material.map((m, i) => (
              <View key={i} style={{ flexDirection: 'row', marginBottom: 3 }}>
                <View style={{ width: 7.5, height: 7.5, borderWidth: 0.9, borderColor: NEUTRAL.leise, borderRadius: 1.5, marginTop: 2.6, marginRight: 6, backgroundColor: '#FFFFFF' }} />
                <View style={{ flex: 1 }}>
                  <Absatz groesse={8.4} style={{ lineHeight: 1.38 }}>
                    {ty(m, sprache)}
                  </Absatz>
                </View>
              </View>
            ))}
            {x.vorbereitung?.length ? (
              <>
                <Kleinlabel style={{ marginTop: 8, marginBottom: 4 }}>{t.vorbereitung}</Kleinlabel>
                <Punktliste punkte={x.vorbereitung} p={p} sprache={sprache} groesse={8.4} />
              </>
            ) : null}
          </View>
          {alleBlaetter.length ? (
            <View style={{ marginTop: 10, borderWidth: 0.8, borderColor: p.mittel, borderRadius: 10, padding: 10 }}>
              <Kleinlabel farbe={p.tief} style={{ marginBottom: 4 }}>
                {t.kopiervorlagen}
              </Kleinlabel>
              {alleBlaetter.map((id) => {
                const b = blaetter.get(id)
                const h = e.blaetter.includes(id) ? heft?.get(id) : undefined
                const v = vorlageSeite(id)
                return (
                  <View key={id} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 }}>
                    <Absatz groesse={8.4} style={{ flex: 1, lineHeight: 1.35 }}>
                      {b ? ty(blattInhalt(b, sprache).titel, sprache) : id}
                    </Absatz>
                    <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.6, color: p.tief, marginLeft: 6, marginTop: 1 }}>{[v ? t.seiteKurz(v) : '', h ? t.heftKurz(h) : ''].filter(Boolean).join(' · ')}</Text>
                  </View>
                )
              })}
            </View>
          ) : null}
        </View>
      </View>

      <Wortspeicher woerter={e.woerter} sprache={sprache} p={p} t={t} />

      {/* Achtung gehört zur Vorbereitung: auf die Übersichtsseite, vor die Schritte */}
      {x.achtung ? (
        <View wrap={false} style={{ marginTop: 10, backgroundColor: ROT_ZART, borderLeftWidth: 3, borderLeftColor: ROT, borderRadius: 7, padding: 10 }}>
          <Kleinlabel farbe="#8A3A24" style={{ marginBottom: 2 }}>
            {t.achtung}
          </Kleinlabel>
          <Absatz groesse={8.8}>{ty(x.achtung, sprache)}</Absatz>
        </View>
      ) : null}

      <View break={!fliessend}>
        <Zwischentitel p={p} oben={fliessend ? 18 : 0}>
          {t.schrittFuerSchritt}
        </Zwischentitel>
      </View>
      <Marke id={`s-${e.id}`} marken={marken} fliess />
      {x.schritte.map((s, i) => (
        <SchrittBlock key={i} s={s} nr={i + 1} sprache={sprache} p={p} t={t} verweis={verweis(s.blatt)} />
      ))}

      {x.bruecke ? (
        <View wrap={false} style={{ marginTop: 16, backgroundColor: p.zart, borderRadius: 9, padding: 10, flexDirection: 'row' }}>
          <View style={{ width: 3, borderRadius: 2, backgroundColor: p.tief, marginRight: 9 }} />
          <View style={{ flex: 1 }}>
            <Kleinlabel farbe={p.tief} style={{ marginBottom: 2 }}>
              {t.ausblick}
            </Kleinlabel>
            <Absatz groesse={9.4}>{ty(`${t.anf[0]}${sprache === 'fr' ? ' ' : ''}${x.bruecke}${sprache === 'fr' ? ' ' : ''}${t.anf[1]}`, sprache)}</Absatz>
          </View>
        </View>
      ) : null}
      {x.differenzierung ? (
        <View wrap={false} style={{ marginTop: 12 }}>
          <Kleinlabel style={{ marginBottom: 4 }}>{t.differenzierung}</Kleinlabel>
          <View style={{ flexDirection: 'row' }}>
            <Kasten titel={t.leichter} text={ty(x.differenzierung.leichter, sprache)} farbe={BLAU} grund={BLAU_ZART} />
            <View style={{ width: 8 }} />
            <Kasten titel={t.schwerer} text={ty(x.differenzierung.schwerer, sprache)} farbe={BLAU} grund={BLAU_ZART} />
          </View>
        </View>
      ) : null}
      {x.kurzfassung ? (
        <View wrap={false} style={{ marginTop: 8, borderWidth: 0.8, borderColor: NEUTRAL.rahmen, borderRadius: 9, padding: 10 }}>
          <Kleinlabel style={{ marginBottom: 2 }}>{t.kurzfassung}</Kleinlabel>
          <Absatz groesse={8.8}>{ty(x.kurzfassung, sprache)}</Absatz>
        </View>
      ) : null}
      {x.hintergrund ? (
        <View wrap={false} style={{ marginTop: 12, borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 9 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: NEUTRAL.text, marginBottom: 3 }}>{t.hintergrund}</Text>
          <Absatz groesse={9}>{ty(x.hintergrund, sprache)}</Absatz>
          {x.quellen?.length ? <Quellen liste={x.quellen} /> : null}
        </View>
      ) : null}
      <Fuss links={FACH.name} titel={`${t.einheit} ${pe.nr} · ${ty(x.titel, sprache)}`} sprache={sprache} />
    </Page>
  )
}

// --- Kopiervorlagen ----------------------------------------------------------------------------------------------------

interface VorlagenEintrag {
  id: string
  reiter: string
  meta: string
}

function VorlagenSeiten({ liste, klasse, sprache, blaetter, marken }: { liste: VorlagenEintrag[]; klasse: Klasse; sprache: Sprache; blaetter: Map<string, Blatt>; marken?: Marken }) {
  return (
    <>
      {liste.map((x) => {
        const b = blaetter.get(x.id)
        if (!b) return null
        return (
          <BlattSeiten
            key={x.id}
            blatt={b}
            opt={{
              sprache,
              schueler: true,
              lehrer: false,
              farben: STUFE_FARBEN[klasse],
              heft: { reiter: x.reiter, meta: x.meta, fuss: `${FACH.name} · ${klasse}` },
              seite: marken
                ? (n) => {
                    const alt = marken.get(vorlageId(x.id))
                    if (alt === undefined || n < alt) marken.set(vorlageId(x.id), n)
                  }
                : undefined,
            }}
          />
        )
      })}
    </>
  )
}

// --- Anhang: Glossar ---------------------------------------------------------------------------------------------------

interface GlossarEintrag {
  wort: string
  anderes: string
  einheiten: number[]
}

/** Artikel und „sich“ zählen beim Sortieren nicht mit */
const ohneArtikel = (s: string) =>
  s
    .replace(/^(der|die|das|den|dem|des|ein|eine|sich|le|la|les|l’|l'|un|une|se|s’|s')\s*/i, '')
    .replace(/^[„“«»"\s]+/, '')
    .toLowerCase()

export function glossarVon(einheiten: Einheit[], plan: Jahresplan, sprache: Sprache): GlossarEintrag[] {
  const andere: Sprache = sprache === 'fr' ? 'de' : 'fr'
  const map = new Map<string, GlossarEintrag>()
  for (const e of einheiten) {
    const nr = plan.einheiten.find((u) => u.id === e.id)?.nr ?? 0
    for (const w of e.woerter ?? []) {
      const schluessel = w[sprache].trim()
      const alt = map.get(schluessel)
      if (alt) {
        if (!alt.einheiten.includes(nr)) alt.einheiten.push(nr)
      } else map.set(schluessel, { wort: w[sprache], anderes: w[andere], einheiten: [nr] })
    }
  }
  return [...map.values()].sort((a, b) => ohneArtikel(a.wort).localeCompare(ohneArtikel(b.wort), sprache))
}

/** Geschätzte Zeilenhöhe eines Eintrags (zwei Spalten mit je rund 24 Zeichen pro Zeile) */
const eintragHoehe = (x: GlossarEintrag) => Math.max(Math.ceil(x.wort.length / 23), Math.ceil(x.anderes.length / 23), 1) * 11.2 + 5

function GlossarSeiten({ eintraege, sprache, p, klasse, text, marken }: { eintraege: GlossarEintrag[]; sprache: Sprache; p: Palette; klasse: Klasse; text: HandbuchText; marken?: Marken }) {
  const t = TX[sprache]
  // Einträge auf Seiten und Spalten verteilen (erste Seite mit Titel hat weniger Platz)
  const seiten: GlossarEintrag[][][] = []
  let i = 0
  while (i < eintraege.length) {
    const platz = seiten.length ? 690 : 560
    const spalten: GlossarEintrag[][] = []
    for (let s = 0; s < 2; s++) {
      const spalte: GlossarEintrag[] = []
      let h = 0
      while (i < eintraege.length && h + eintragHoehe(eintraege[i]) <= platz) {
        h += eintragHoehe(eintraege[i])
        spalte.push(eintraege[i++])
      }
      spalten.push(spalte)
    }
    seiten.push(spalten)
  }
  return (
    <>
      {seiten.map((spalten, si) => (
        <Page key={si} size="A4" style={seitenStil}>
          {si === 0 ? <Marke id="g" marken={marken} /> : null}
          <Kopf reiter={t.anhang} meta={`${FACH.name}  ·  ${t.lehrerhandbuch} ${klasse}`} p={p} />
          {si === 0 ? <SeitenTitel titel={text.glossar.titel} unter={text.glossar.text} p={p} sprache={sprache} /> : null}
          <View style={{ flexDirection: 'row' }}>
            {spalten.map((spalte, s) => (
              <View key={s} style={{ flex: 1, marginLeft: s ? 18 : 0 }}>
                <View style={{ flexDirection: 'row', borderBottomWidth: spalte.length ? 1.2 : 0, borderBottomColor: p.tief, paddingBottom: 3, marginBottom: 2, opacity: spalte.length ? 1 : 0 }}>
                  <Text style={{ flex: 1, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, letterSpacing: 0.6, color: p.tief }}>{versal(t.sprachen[0])}</Text>
                  <Text style={{ flex: 1, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, letterSpacing: 0.6, color: p.tief }}>{versal(t.sprachen[1])}</Text>
                  <Text style={{ width: 30, textAlign: 'right', fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, color: p.tief }}>{t.einheit.slice(0, 3) + '.'}</Text>
                </View>
                {spalte.map((x, j) => (
                  <View key={j} style={{ flexDirection: 'row', paddingVertical: 2, borderBottomWidth: 0.4, borderBottomColor: NEUTRAL.haarlinie }}>
                    <Text style={{ flex: 1, paddingRight: 4, fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8.2, lineHeight: 1.35, color: NEUTRAL.text }}>{ty(x.wort, sprache)}</Text>
                    <Text style={{ flex: 1, paddingRight: 4, fontFamily: SCHRIFT.jugend, fontSize: 8.2, lineHeight: 1.35, color: NEUTRAL.leise }}>{ty(x.anderes, sprache === 'fr' ? 'de' : 'fr')}</Text>
                    <Text style={{ width: 30, textAlign: 'right', fontFamily: SCHRIFT.jugend, fontSize: 7.6, lineHeight: 1.45, color: NEUTRAL.leise }}>{x.einheiten.join(', ')}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
          <Fuss links={FACH.name} titel={ty(text.glossar.titel, sprache)} sprache={sprache} />
        </Page>
      ))}
    </>
  )
}

// --- Booklet ------------------------------------------------------------------------------------------------------------

export function bookletTitel(klasse: Klasse, sprache: Sprache): string {
  return `${FACH.name} – ${TX[sprache].lehrerhandbuch} ${klasse}`
}

/** Kopiervorlagen direkt nach jeder Einheit: ihre eigenen Blätter (ohne Werkzeuge), jedes nur beim ersten Mal. */
function vorlagenJeEinheit(einheiten: Einheit[], blaetter: Map<string, Blatt>): Map<string, string[]> {
  const gedruckt = new Set<string>()
  const map = new Map<string, string[]>()
  for (const e of einheiten) {
    const liste: string[] = []
    for (const id of [...e.blaetter, ...(e.vorlagen ?? [])]) {
      if (istWerkzeug(id) || gedruckt.has(id) || !blaetter.has(id)) continue
      gedruckt.add(id)
      liste.push(id)
    }
    map.set(e.id, liste)
  }
  return map
}

/** Teil D: Werkzeug-Blätter der Klassenstufe und alle, die ihre Einheiten zusätzlich nutzen */
export function werkzeugeVon(daten: HandbuchDaten, klasse: Klasse): string[] {
  const einheiten = daten.einheiten.filter((e) => e.klasse === klasse)
  return [...new Set([...daten.werkzeuge[klasse], ...einheiten.flatMap((e) => e.blaetter).filter(istWerkzeug)])].filter((id) => daten.blaetter.has(id))
}

/**
 * Ein Heft für eine Klassenstufe. `marken` sammelt beim Setzen die Seitenzahlen (erster Durchlauf),
 * `seiten` liefert sie für Inhalt und Verweise (zweiter Durchlauf), `heft` die Seiten der Blätter im
 * Schülerheft. `notizen` = Anzahl Notizseiten, damit die Seitenzahl ein Vielfaches von 4 wird.
 * `fliessen`: Einheiten, deren Übersicht nicht auf eine Seite passt – ihre Schritte folgen direkt.
 */
export function BookletDokument({ daten, klasse, sprache, marken, seiten, heft, notizen = 0, stand, fliessen }: { daten: HandbuchDaten; klasse: Klasse; sprache: Sprache; marken?: Marken; seiten?: Marken; heft?: Marken; notizen?: number; stand: string; fliessen?: Set<string> }) {
  const t = TX[sprache]
  const text = daten.text[sprache]
  const plan = daten.plaene.find((pl) => pl.klasse === klasse)!
  const einheiten = plan.einheiten.map((pe) => daten.einheiten.find((e) => e.id === pe.id)).filter((e): e is Einheit => !!e)
  const jeEinheit = vorlagenJeEinheit(einheiten, daten.blaetter)
  const werkzeuge = werkzeugeVon(daten, klasse)
  const glossar = glossarVon(einheiten, plan, sprache)
  const p = stufenPalette(klasse)
  const briefe: Sprache[] = sprache === 'fr' ? ['fr', 'de'] : ['de', 'fr']
  const teilC = t.teil(2, t.teilC)
  const teilD = t.teil(3, t.teilD)

  const teile: InhaltTeil[] = [
    {
      titel: t.teilA,
      gruppen: [
        [
          { id: 'a1', titel: text.ueberblick.titel },
          { id: 'a2', titel: text.kompetenzen.titel },
          { id: 'a3', titel: text.doppelstunde.titel },
          { id: 'a4', titel: text.sicherheit.titel },
          { id: 'a5', titel: text.methoden.titel },
          { id: 'a6', titel: text.eltern.titel },
          ...briefe.map((b) => ({ id: `brief-${b}`, titel: daten.text[b].brief.seite, ebene: 2 as const })),
          { id: 'a7', titel: text.material.titel },
        ],
      ],
    },
    {
      titel: t.teilB,
      gruppen: [
        [
          { id: 'b-plan', titel: `${t.jahresplan} ${klasse} · ${plan.titel[sprache]}` },
          { id: 'b-weg', titel: text.jahresweg.titel },
        ],
      ],
    },
  ]
  if (einheiten.length) {
    teile.push({
      titel: teilC,
      gruppen: plan.kapitel.map((k) => [
        { id: `k-${k.id}`, titel: `${t.kapitel} ${k.nr} · ${k.titel[sprache]}`, ebene: 1 as const },
        ...einheiten
          .filter((e) => plan.einheiten.find((u) => u.id === e.id)?.kapitel === k.id)
          .map((e) => ({ id: `c-${e.id}`, titel: e[sprache].titel, ebene: 2 as const, nr: nummernVon(plan.einheiten.find((u) => u.id === e.id)!) })),
      ]),
    })
  }
  teile.push({ titel: teilD, gruppen: [werkzeuge.map((id) => ({ id: vorlageId(id), titel: blattInhalt(daten.blaetter.get(id)!, sprache).titel }))] })
  if (glossar.length) teile.push({ titel: t.anhang, gruppen: [[{ id: 'g', titel: text.glossar.titel }]] })

  return (
    <Document title={bookletTitel(klasse, sprache)} author={URHEBER_NAME} creator="CDSE" producer="CDSE" language={sprache}>
      <Deckblatt plan={plan} sprache={sprache} art="handbuch" />
      <InhaltSeiten sprache={sprache} p={p} klasse={klasse} teile={teile} text={text} seiten={seiten} />
      <UeberblickSeite sprache={sprache} p={p} klasse={klasse} text={text} marken={marken} />
      <KompetenzSeite sprache={sprache} p={p} klasse={klasse} text={text} plaene={daten.plaene} marken={marken} />
      <DoppelstundeSeite sprache={sprache} p={p} klasse={klasse} text={text} marken={marken} />
      <SicherheitSeite sprache={sprache} p={p} klasse={klasse} text={text} marken={marken} />
      <MethodenSeiten sprache={sprache} p={p} klasse={klasse} text={text} marken={marken} />
      <ElternSeite sprache={sprache} p={p} klasse={klasse} text={text} marken={marken} />
      {briefe.map((b) => (
        <BriefSeite key={b} brief={daten.text[b].brief} briefSprache={b} sprache={sprache} p={p} klasse={klasse} marken={marken} />
      ))}
      <MaterialSeite sprache={sprache} p={p} klasse={klasse} text={text} marken={marken} />
      <JahresplanSeiten plan={plan} sprache={sprache} text={text} marken={marken} seiten={seiten} fertig={new Set(einheiten.map((e) => e.id))} />
      <JahreswegSeite plan={plan} sprache={sprache} text={text} marken={marken} />
      {einheiten.length
        ? plan.kapitel.map((k) => {
            const imKapitel = einheiten.filter((e) => plan.einheiten.find((u) => u.id === e.id)?.kapitel === k.id)
            return [
              <KapitelSeite key={k.id} k={k} plan={plan} einheiten={einheiten} sprache={sprache} marken={marken} seiten={seiten} heft={heft} />,
              ...imKapitel.map((e) => {
                const nr = plan.einheiten.find((u) => u.id === e.id)!.nr
                return [
                  <EinheitSeiten key={e.id} e={e} plan={plan} sprache={sprache} blaetter={daten.blaetter} seiten={seiten} marken={marken} heft={heft} fliessend={fliessen?.has(e.id)} />,
                  <VorlagenSeiten
                    key={`${e.id}-v`}
                    liste={(jeEinheit.get(e.id) ?? []).map((id) => ({
                      id,
                      reiter: e.blaetter.includes(id) ? `${t.einheit} ${nr} · ${t.kopiervorlage}` : `${t.einheit} ${nr} · ${t.fuerLehrkraft}`,
                      meta: `${FACH.name}  ·  ${klasse}${e.blaetter.includes(id) && heft?.get(id) ? `  ·  ${t.heftSeite(heft.get(id)!)}` : ''}`,
                    }))}
                    klasse={klasse}
                    sprache={sprache}
                    blaetter={daten.blaetter}
                    marken={marken}
                  />,
                ]
              }),
            ]
          })
        : null}
      <VorlagenSeiten
        liste={werkzeuge.map((id) => ({ id, reiter: t.kopiervorlage, meta: `${FACH.name}  ·  ${klasse}  ·  ${teilD}${heft?.get(id) ? `  ·  ${t.heftSeite(heft.get(id)!)}` : ''}` }))}
        klasse={klasse}
        sprache={sprache}
        blaetter={daten.blaetter}
        marken={marken}
      />
      {glossar.length ? <GlossarSeiten eintraege={glossar} sprache={sprache} p={p} klasse={klasse} text={text} marken={marken} /> : null}
      {Array.from({ length: notizen }, (_, i) => (
        <NotizenSeite key={i} klasse={klasse} sprache={sprache} />
      ))}
      <Rueckseite plan={plan} plaene={daten.plaene} sprache={sprache} text={text} stand={stand} />
    </Document>
  )
}

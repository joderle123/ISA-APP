// ---------------------------------------------------------------------------
// Booklet je Klassenstufe (Lehrerhandbuch 7e, 6e, 5e) als PDF:
//   Deckblatt · Inhalt
//   Teil A  Das Fach (Überblick, Kompetenzbereiche, Doppelstunde, Rahmen)
//   Teil B  Der Jahresplan der Klassenstufe
//   Teil C  Ausgearbeitete Einheiten (falls vorhanden)
//   Teil C/D Kopiervorlagen für das Schülerheft
//   Notizen (füllen auf ein Vielfaches von 4 Seiten auf) · Rückseite
// Seitenzahlen im Inhalt und die Verweise auf die Kopiervorlagen kommen aus
// einem ersten Durchlauf (Marken, siehe scripts/foerderfach.tsx).
// ---------------------------------------------------------------------------

import { Document, Page, View, Text } from '@react-pdf/renderer'
import type { Blatt } from '../../blatt/typen'
import { BlattSeiten, blattInhalt } from '../../blatt/pdf/BlattDokument'
import { NEUTRAL, type Palette } from '../../blatt/zeichnung'
import { SCHRIFT } from '../../blatt/pdf/stil'
import { QUELLEN } from '../../blatt/quellen'
import { URHEBER_NAME } from '../../lib/urheber'
import { FACH, KOMPETENZEN, PHASEN, STUFE_FARBEN, TX, trimesterName, type FachTx } from '../fach'
import type { Einheit, HandbuchText, Jahresplan, Klasse, Kompetenz, PlanEinheit, Schritt, Sprache } from '../typen'
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
  /** Kopiervorlagen, die in jedes Heft gehören (vor den Blättern der Einheiten) */
  vorlagen: string[]
}

/** Platzhalter für Seitenzahlen im ersten Durchlauf – gleich breit wie die echten, damit sich nichts verschiebt */
const PLATZHALTER = 88
const vorlageId = (blatt: string) => `v-${blatt}`

const ROT = '#B4533A'
const ROT_ZART = '#FBF1EC'
const GRUEN = '#2F855A'
const GRUEN_ZART = '#EEF6F0'

const quelle = (schluessel: string) => QUELLEN[schluessel] ?? ''

function Quellen({ liste, sprache }: { liste: string[]; sprache: Sprache }) {
  const t = TX[sprache]
  return (
    <View wrap={false} style={{ marginTop: 10 }}>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 7.2, color: NEUTRAL.leise, marginBottom: 1.5 }}>{t.quellen}</Text>
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

// --- Inhalt ----------------------------------------------------------------------------------------------

interface InhaltEintrag {
  id: string
  titel: string
  unter?: string
}

function InhaltSeite({ sprache, p, klasse, teile, text, vorwort, seiten }: { sprache: Sprache; p: Palette; klasse: Klasse; teile: { titel: string; eintraege: InhaltEintrag[] }[]; text: HandbuchText; vorwort: string; seiten?: Marken }) {
  const t = TX[sprache]
  return (
    <Page size="A4" style={seitenStil}>
      <Kopf reiter={t.lehrerhandbuch} meta={`${FACH.name}  ·  ${klasse}`} p={p} />
      <SeitenTitel titel={t.inhalt} p={p} sprache={sprache} />
      {teile.map((teil, ti) => (
        <View key={ti} wrap={false} style={{ marginTop: ti ? 13 : 4 }}>
          <View style={{ paddingBottom: 3, borderBottomWidth: 0.8, borderBottomColor: p.mittel }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 11.5, color: p.tief }}>{teil.titel}</Text>
          </View>
          {teil.eintraege.map((e) => (
            <View key={e.id} style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 7 }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10.5, color: NEUTRAL.text }}>{ty(e.titel, sprache)}</Text>
                  <View style={{ flex: 1, marginHorizontal: 6, marginBottom: 3.2, borderBottomWidth: 1, borderBottomColor: NEUTRAL.rahmen, borderStyle: 'dotted' }} />
                  <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10.5, color: NEUTRAL.text, width: 20, textAlign: 'right' }}>{String(seiten ? (seiten.get(e.id) ?? '') : PLATZHALTER)}</Text>
                </View>
                {e.unter ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.4, lineHeight: 1.35, color: NEUTRAL.leise, marginTop: 1 }}>{ty(e.unter, sprache)}</Text> : null}
              </View>
            </View>
          ))}
        </View>
      ))}
      <View wrap={false} style={{ marginTop: 22, flexDirection: 'row', backgroundColor: p.zart, borderRadius: 9, padding: 11, paddingLeft: 12 }}>
        <View style={{ width: 3, borderRadius: 2, backgroundColor: p.tief, marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: p.tief, marginBottom: 3 }}>{ty(text.vorwort.titel, sprache)}</Text>
          <Absatz groesse={9.2}>{ty(vorwort, sprache)}</Absatz>
        </View>
      </View>
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
      <Kopf reiter={t.teilA} meta={`${FACH.name}  ·  ${t.lehrerhandbuch} ${klasse}`} p={p} />
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
      <Quellen liste={[quelle('durlak2011'), quelle('taylor2017')]} sprache={sprache} />
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
      <Kopf reiter={t.teilA} meta={`${FACH.name}  ·  ${t.lehrerhandbuch} ${klasse}`} p={p} />
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
      <Quellen liste={[quelle('casel2020')]} sprache={sprache} />
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
      <Kopf reiter={t.teilA} meta={`${FACH.name}  ·  ${t.lehrerhandbuch} ${klasse}`} p={p} />
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
      <Kopf reiter={t.teilA} meta={`${FACH.name}  ·  ${t.lehrerhandbuch} ${klasse}`} p={p} />
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

// --- Teil B: Jahresplan ----------------------------------------------------------------------------------------

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

function PlanZeile({ e, sprache, p, t }: { e: PlanEinheit; sprache: Sprache; p: Palette; t: FachTx }) {
  const nr = nummernVon(e)
  const breit = nr.length > 2
  return (
    <View wrap={false} style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 1.9, borderBottomWidth: 0.5, borderBottomColor: NEUTRAL.haarlinie }}>
      <View style={{ width: 34, alignItems: 'flex-start', paddingTop: 1 }}>
        <View style={{ minWidth: 16, height: 16, paddingHorizontal: breit ? 4 : 0, borderRadius: 8, backgroundColor: e.wahl ? '#FFFFFF' : p.tief, borderWidth: e.wahl ? 1.1 : 0, borderColor: p.tief, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.6, color: e.wahl ? p.tief : '#FFFFFF' }}>{nr}</Text>
        </View>
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
      <View style={{ paddingTop: 4 }}>
        <KompetenzPunkte aktiv={e.kompetenzen} d={6.5} />
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

function KapitelKopf({ k, sprache, p, t }: { k: Jahresplan['kapitel'][number]; sprache: Sprache; p: Palette; t: FachTx }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
      <Plakette name={k.bild} d={15} farbe={p.tief} grund={p.zart} />
      <Text style={{ marginLeft: 6, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: p.tief }}>{`${t.kapitel} ${k.nr} · ${ty(k.titel[sprache], sprache)}`}</Text>
      <Text style={{ marginLeft: 6, flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 7.8, color: NEUTRAL.leise }}>{ty(k.leitfrage[sprache], sprache)}</Text>
    </View>
  )
}

function JahresplanSeiten({ plan, sprache, text, marken }: { plan: Jahresplan; sprache: Sprache; text: HandbuchText; marken?: Marken }) {
  const t = TX[sprache]
  const p = stufenPalette(plan.klasse)
  const trimester: (1 | 2 | 3)[] = [1, 2, 3]
  const bereich = (liste: PlanEinheit[]) => {
    const nr = liste.flatMap((e) => Array.from({ length: e.termine ?? 1 }, (_, i) => e.nr + i))
    return nr.length ? `${t.einheiten} ${nr[0]}–${nr[nr.length - 1]}` : ''
  }
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id={`b-${plan.klasse}`} marken={marken} />
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
                    {ki === 0 ? <TrimesterKopf tr={tr} bereich={bereich(einheiten)} sprache={sprache} p={p} /> : null}
                    <KapitelKopf k={k} sprache={sprache} p={p} t={t} />
                    {liste[0] ? <PlanZeile e={liste[0]} sprache={sprache} p={p} t={t} /> : null}
                  </View>
                  {liste.slice(1).map((e) => (
                    <PlanZeile key={e.id} e={e} sprache={sprache} p={p} t={t} />
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

// --- Teil C: Einheit ---------------------------------------------------------------------------------------------

function HeftVerweis({ seite, t, p }: { seite?: number; t: FachTx; p: Palette }) {
  if (!seite) return null
  return (
    <View style={{ borderWidth: 0.8, borderColor: p.tief, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1.2, marginLeft: 6 }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.8, letterSpacing: 0.3, color: p.tief }}>{t.vorlageSeite(seite)}</Text>
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

function SchrittBlock({ s, nr, sprache, p, t, heftSeite }: { s: Schritt; nr: number; sprache: Sprache; p: Palette; t: FachTx; heftSeite?: number }) {
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
        <HeftVerweis seite={heftSeite} t={t} p={p} />
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

function EinheitSeiten({ e, plan, sprache, blaetter, seiten, marken }: { e: Einheit; plan: Jahresplan; sprache: Sprache; blaetter: Map<string, Blatt>; seiten?: Marken; marken?: Marken }) {
  /** Seite der Kopiervorlage in diesem Heft (erster Durchlauf: Platzhalter) */
  const vorlageSeite = (id: string): number | undefined => (seiten ? seiten.get(vorlageId(id)) : PLATZHALTER)
  const t = TX[sprache]
  const x = e[sprache]
  const pe = plan.einheiten.find((u) => u.id === e.id)!
  const kap = plan.kapitel.find((k) => k.id === pe.kapitel)!
  const p = stufenPalette(plan.klasse)
  const blattZuZeile = (i: number): string | undefined => (x.ablauf.length === x.schritte.length ? x.schritte[i]?.blatt : undefined)
  return (
    <Page size="A4" style={seitenStil}>
      <Marke id={`c-${e.id}`} marken={marken} />
      <Kopf reiter={`${t.einheit} ${pe.nr}`} meta={`${FACH.name}  ·  ${plan.klasse}  ·  ${t.kapitel} ${kap.nr} · ${ty(kap.titel[sprache], sprache)}`} p={p} />
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, paddingRight: 14 }}>
          <Kleinlabel farbe={p.tief}>{`${t.einheit} ${pe.nr} · ${e.dauer} ${t.min}`}</Kleinlabel>
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
            const blatt = blattZuZeile(i)
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
                <HeftVerweis seite={blatt ? vorlageSeite(blatt) : undefined} t={t} p={p} />
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
          {e.blaetter.length ? (
            <View style={{ marginTop: 10, borderWidth: 0.8, borderColor: p.mittel, borderRadius: 10, padding: 10 }}>
              <Kleinlabel farbe={p.tief} style={{ marginBottom: 4 }}>
                {t.kopiervorlagen}
              </Kleinlabel>
              {e.blaetter.map((id) => {
                const b = blaetter.get(id)
                return (
                  <View key={id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                    <Absatz groesse={8.6} style={{ flex: 1 }}>
                      {b ? ty(blattInhalt(b, sprache).titel, sprache) : id}
                    </Absatz>
                    <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.6, color: p.tief }}>{vorlageSeite(id) ? `${t.seite} ${vorlageSeite(id)}` : ''}</Text>
                  </View>
                )
              })}
            </View>
          ) : null}
        </View>
      </View>

      {/* Achtung gehört zur Vorbereitung: auf die Übersichtsseite, vor die Schritte */}
      {x.achtung ? (
        <View wrap={false} style={{ marginTop: 14, backgroundColor: ROT_ZART, borderLeftWidth: 3, borderLeftColor: ROT, borderRadius: 7, padding: 10 }}>
          <Kleinlabel farbe="#8A3A24" style={{ marginBottom: 2 }}>
            {t.achtung}
          </Kleinlabel>
          <Absatz groesse={9}>{ty(x.achtung, sprache)}</Absatz>
        </View>
      ) : null}

      <View break>
        <Zwischentitel p={p} oben={0}>
          {t.schrittFuerSchritt}
        </Zwischentitel>
      </View>
      {x.schritte.map((s, i) => (
        <SchrittBlock key={i} s={s} nr={i + 1} sprache={sprache} p={p} t={t} heftSeite={s.blatt ? vorlageSeite(s.blatt) : undefined} />
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
      {x.hintergrund ? (
        <View wrap={false} style={{ marginTop: 12, borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 9 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: NEUTRAL.text, marginBottom: 3 }}>{t.hintergrund}</Text>
          <Absatz groesse={9}>{ty(x.hintergrund, sprache)}</Absatz>
          {x.quellen?.length ? <Quellen liste={x.quellen} sprache={sprache} /> : null}
        </View>
      ) : null}
      <Fuss links={FACH.name} titel={`${t.einheit} ${pe.nr} · ${ty(x.titel, sprache)}`} sprache={sprache} />
    </Page>
  )
}

// --- Kopiervorlagen ----------------------------------------------------------------------------------------------------

function VorlagenSeiten({ ids, klasse, sprache, blaetter, marken }: { ids: string[]; klasse: Klasse; sprache: Sprache; blaetter: Map<string, Blatt>; marken?: Marken }) {
  const t = TX[sprache]
  return (
    <>
      {ids.map((id) => {
        const b = blaetter.get(id)
        if (!b) return null
        return (
          <BlattSeiten
            key={id}
            blatt={b}
            opt={{
              sprache,
              schueler: true,
              lehrer: false,
              farben: STUFE_FARBEN[klasse],
              heft: { reiter: t.kopiervorlage, meta: `${FACH.name}  ·  ${klasse}  ·  ${t.kopiervorlagen}`, fuss: `${FACH.name} · ${klasse}` },
              seite: marken
                ? (n) => {
                    const alt = marken.get(vorlageId(id))
                    if (alt === undefined || n < alt) marken.set(vorlageId(id), n)
                  }
                : undefined,
            }}
          />
        )
      })}
    </>
  )
}

// --- Booklet ------------------------------------------------------------------------------------------------------------

export function bookletTitel(klasse: Klasse, sprache: Sprache): string {
  return `${FACH.name} – ${TX[sprache].lehrerhandbuch} ${klasse}`
}

/** Kopiervorlagen eines Hefts: die für jede Stunde, dann die Blätter der Einheiten (ohne Doppelte). */
export function vorlagenVon(daten: HandbuchDaten, klasse: Klasse): string[] {
  const einheiten = daten.einheiten.filter((e) => e.klasse === klasse)
  return [...new Set([...daten.vorlagen, ...einheiten.flatMap((e) => e.blaetter)])].filter((id) => daten.blaetter.has(id))
}

/**
 * Ein Heft für eine Klassenstufe. `marken` sammelt beim Setzen die Seitenzahlen (erster Durchlauf),
 * `seiten` liefert sie für Inhalt und Verweise (zweiter Durchlauf). `notizen` = Anzahl Notizseiten,
 * damit die Seitenzahl ein Vielfaches von 4 wird (Druck als Broschüre).
 */
export function BookletDokument({ daten, klasse, sprache, marken, seiten, notizen = 0, stand }: { daten: HandbuchDaten; klasse: Klasse; sprache: Sprache; marken?: Marken; seiten?: Marken; notizen?: number; stand: string }) {
  const t = TX[sprache]
  const text = daten.text[sprache]
  const plan = daten.plaene.find((pl) => pl.klasse === klasse)!
  const einheiten = daten.einheiten.filter((e) => e.klasse === klasse)
  const vorlagen = vorlagenVon(daten, klasse)
  const p = stufenPalette(klasse)
  const teile: { titel: string; eintraege: InhaltEintrag[] }[] = [
    {
      titel: t.teilA,
      eintraege: [
        { id: 'a1', titel: text.ueberblick.titel },
        { id: 'a2', titel: text.kompetenzen.titel },
        { id: 'a3', titel: text.doppelstunde.titel },
        { id: 'a4', titel: text.sicherheit.titel },
      ],
    },
    { titel: t.teilB, eintraege: [{ id: `b-${klasse}`, titel: `${t.jahresplan} ${klasse} · ${plan.titel[sprache]}`, unter: plan.untertitel[sprache] }] },
  ]
  if (einheiten.length) {
    teile.push({
      titel: t.teil(teile.length, t.muster),
      eintraege: einheiten.map((e) => {
        const pe = plan.einheiten.find((u) => u.id === e.id)
        return { id: `c-${e.id}`, titel: `${t.einheit} ${pe?.nr ?? ''} · ${e[sprache].titel}`, unter: e[sprache].kurz }
      }),
    })
  }
  teile.push({
    titel: t.teil(teile.length, t.kopiervorlagen),
    eintraege: vorlagen.map((id) => ({ id: vorlageId(id), titel: blattInhalt(daten.blaetter.get(id)!, sprache).titel })),
  })
  const vorwort = (einheiten.length ? text.vorwort.mitEinheit : text.vorwort.ohneEinheit).replaceAll('{klasse}', klasse)
  return (
    <Document title={bookletTitel(klasse, sprache)} author={URHEBER_NAME} creator="CDSE" producer="CDSE" language={sprache}>
      <Deckblatt plan={plan} sprache={sprache} art="handbuch" />
      <InhaltSeite sprache={sprache} p={p} klasse={klasse} teile={teile} text={text} vorwort={vorwort} seiten={seiten} />
      <UeberblickSeite sprache={sprache} p={p} klasse={klasse} text={text} marken={marken} />
      <KompetenzSeite sprache={sprache} p={p} klasse={klasse} text={text} plaene={daten.plaene} marken={marken} />
      <DoppelstundeSeite sprache={sprache} p={p} klasse={klasse} text={text} marken={marken} />
      <SicherheitSeite sprache={sprache} p={p} klasse={klasse} text={text} marken={marken} />
      <JahresplanSeiten plan={plan} sprache={sprache} text={text} marken={marken} />
      {einheiten.map((e) => (
        <EinheitSeiten key={e.id} e={e} plan={plan} sprache={sprache} blaetter={daten.blaetter} seiten={seiten} marken={marken} />
      ))}
      <VorlagenSeiten ids={vorlagen} klasse={klasse} sprache={sprache} blaetter={daten.blaetter} marken={marken} />
      {Array.from({ length: notizen }, (_, i) => (
        <NotizenSeite key={i} klasse={klasse} sprache={sprache} />
      ))}
      <Rueckseite plan={plan} plaene={daten.plaene} sprache={sprache} text={text} stand={stand} />
    </Document>
  )
}

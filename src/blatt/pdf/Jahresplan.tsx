// ---------------------------------------------------------------------------
// Jahresplan Spielschule: das Drei-Jahres-Rad als PDF (A4 quer). Deckblatt mit
// dem Rad und Inhalt, „So nutzen Sie den Plan“, Festkalender und Ferien, die
// drei Jahre auf einen Blick, je Jahr eine Übersicht (36 Wochenkarten in sechs
// Abschnitten zwischen den Ferien) und eine Kompetenzlandkarte (Lernbereiche ×
// Trimester), dann die Joker und ein Register aller Einheiten.
// Welche Einheit in welcher Woche steht: src/data/spielschule-jahresplan.json
// (scripts/spielschule-jahresplan.ts). Titel, Experimente und Lernbereiche kommen
// aus den Blättern – so bleibt der Plan bei Textänderungen aktuell.
// Alle Maße sind fest: Jede Seite passt genau auf eine Seite (das Skript
// scripts/jahresplan.tsx prüft die Seitenzahl).
// ---------------------------------------------------------------------------

import { Document, Page, View, Text, Svg, G, Rect, Line, Circle, Path, Text as SText } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import PLAN_JSON from '../../data/spielschule-jahresplan.json'
import type { Blatt, DomaeneId } from '../typen'
import { bereichById, themaLabel } from '../katalog'
import { NEUTRAL, palette, type Palette } from '../zeichnung'
import { experimentVon, forscherZeichnung, THEMA_BILD } from '../forschen'
import { DOMAENEN } from '../spielschule'
import { Zeichnen } from './Zeichnen'
import { SCHRIFT, typo } from './stil'
import { urheberschaft } from '../../lib/urheber'
import {
  ABSCHNITTE,
  ANKER,
  DOMAENE_KURZ,
  FEIERTAGE,
  FERIEN,
  FESTE,
  JAHRE,
  JOKER_ARTEN,
  MONAT_DER_WOCHE,
  THEMA_FARBE,
  TRIMESTER,
  WOCHEN,
  festeDerWoche,
  type Fest,
  type JahrId,
  type JahresplanDaten,
} from '../jahresplan'

const PLAN = PLAN_JSON as JahresplanDaten
/** Spielschule: Michèle Wagner, ohne CDSE und ohne Logo (lib/urheber.ts). */
const U = urheberschaft('spielschule')
const DATEI = 'Jahresplan_Spielschule.pdf'

export function jahresplanDateiname(): string {
  return DATEI
}

export interface JahresplanQuelle {
  blatt: Blatt
  /** Blattnummer, z. B. 'SP-23' */
  nr?: string
}

// --- Maße (A4 quer) ------------------------------------------------------------------------------------------

const B = 841.89
const H = 595.28
const RAND = 26
const OBEN = 22
const UNTEN = 38
const INNEN_B = B - 2 * RAND
const TRENNER = 12
const SPALTE = (INNEN_B - 5 * (TRENNER + 4)) / 6
const KARTE_H = 57
const KARTE_ABSTAND = 2.5
const FEST_H = 9.5

/** Seiten in fester Reihenfolge – Inhalt und Prüfskript nutzen dieselbe Liste. */
const SEITEN = [
  { id: 'deckblatt', titel: 'Deckblatt' },
  { id: 'nutzen', titel: 'So nutzen Sie den Plan' },
  { id: 'kalender', titel: 'Festkalender und Ferien' },
  { id: 'blick', titel: 'Die drei Jahre auf einen Blick' },
  ...JAHRE.flatMap((j) => [
    { id: 'jahr-' + j, titel: `Jahr ${j}: die 36 Wochen` },
    { id: 'karte-' + j, titel: `Jahr ${j}: Kompetenzlandkarte` },
  ]),
  { id: 'joker', titel: 'Joker: Einheiten für besondere Wochen' },
  { id: 'register', titel: 'Register: alle Einheiten' },
]
const seite = (id: string) => SEITEN.findIndex((s) => s.id === id) + 1

/** So viele Seiten muss das PDF haben (scripts/jahresplan.tsx). */
export const JAHRESPLAN_SEITEN = SEITEN.length

// --- Daten -----------------------------------------------------------------------------------------------------

interface Einheit {
  id: string
  nr: string
  titel: string
  thema: string
  experiment: string
  domaenen: DomaeneId[]
  vorlauf3: boolean
}

interface Ctx {
  e: Map<string, Einheit>
  p: Palette
  /** {sp-id} → SP-Nummer */
  nr: (text: string) => string
}

function kontext(quellen: JahresplanQuelle[]): Ctx {
  const e = new Map<string, Einheit>()
  for (const { blatt, nr } of quellen) {
    if (blatt.bereich !== 'spielschule') continue
    e.set(blatt.id, {
      id: blatt.id,
      nr: nr ?? '',
      titel: blatt.de.titel,
      thema: blatt.thema,
      experiment: experimentVon(blatt, 'de')?.titel ?? '',
      domaenen: blatt.woche?.domaenen ?? [],
      vorlauf3: blatt.de.lehrer.spielschule?.freitag?.vorlauf === 3,
    })
  }
  const nr = (text: string) => text.replace(/\{(sp-[a-z0-9-]+)\}/g, (_, id: string) => e.get(id)?.nr ?? id)
  return { e, p: palette(bereichById.get('spielschule')!.farben), nr }
}

function einheit(c: Ctx, id: string): Einheit {
  return c.e.get(id) ?? { id, nr: '?', titel: id, thema: '', experiment: '', domaenen: [], vorlauf3: false }
}

/** Woche (1–36) einer Einheit je Jahr. */
function wochenVon(id: string): { j: JahrId; w: number }[] {
  return JAHRE.flatMap((j) => PLAN.jahre[j].flatMap((x, i) => (x === id ? [{ j, w: i + 1 }] : [])))
}

const ankerIds = new Set(ANKER.map((a) => a.einheit))
const DOMS = DOMAENEN

function mische(hex: string, anteil: number): string {
  const n = parseInt(hex.slice(1), 16)
  const m = (x: number) => Math.round(x * anteil + 255 * (1 - anteil))
  return '#' + [m(n >> 16), m((n >> 8) & 255), m(n & 255)].map((x) => x.toString(16).padStart(2, '0')).join('')
}
const themaFarbe = (t: string) => THEMA_FARBE[t] ?? NEUTRAL.leise
const themaPalette = (t: string): Palette => {
  const f = themaFarbe(t)
  return { ...palette({ tief: f, mittel: mische(f, 0.45), zart: mische(f, 0.14) }), tinte: f }
}
const themaName = (t: string) => themaLabel('spielschule', t, 'de')
const ty = (x: string) => typo(x, 'de')

// --- Kleine Bausteine ------------------------------------------------------------------------------------------

function ThemaBild({ thema, d, ton }: { thema: string; d: number; ton?: string }) {
  const id = THEMA_BILD[thema] ?? 'icon:circle'
  const icon = id.startsWith('icon:')
  const g = icon ? d * 0.62 : d * 0.86
  const z = forscherZeichnung(id)
  return (
    <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: ton ?? mische(themaFarbe(thema), 0.14), alignItems: 'center', justifyContent: 'center' }}>
      <Zeichnen z={icon ? { ...z, w: Math.max(1.2, Math.min(2.4, (2.1 * 24) / g)) } : z} p={themaPalette(thema)} breite={g} hoehe={g} />
    </View>
  )
}

/** Sechs feste Plätze für die Lernbereiche: Buchstabe im Farbkreis, wenn die Woche ihn hat, sonst ein Pünktchen. */
function Domaenen({ liste, d = 7.4 }: { liste: DomaeneId[]; d?: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {DOMS.map((x) =>
        liste.includes(x.id) ? (
          <View key={x.id} style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: x.farbe, alignItems: 'center', justifyContent: 'center', marginRight: 1.4 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: d * 0.6, color: '#FFFFFF', lineHeight: 1 }}>{DOMAENE_KURZ[x.id]}</Text>
          </View>
        ) : (
          <View key={x.id} style={{ width: d, height: d, alignItems: 'center', justifyContent: 'center', marginRight: 1.4 }}>
            <View style={{ width: 1.8, height: 1.8, borderRadius: 0.9, backgroundColor: NEUTRAL.rahmen }} />
          </View>
        ),
      )}
    </View>
  )
}

function DomaeneKreis({ id, d }: { id: DomaeneId; d: number }) {
  const x = DOMS.find((y) => y.id === id)!
  return (
    <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: x.farbe, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: d * 0.58, color: '#FFFFFF', lineHeight: 1 }}>{DOMAENE_KURZ[id]}</Text>
    </View>
  )
}

/** Fest-Zeichen: Stern (festes Datum), offener Stern (beweglich, nach Ostern), Raute (Welttag). */
function FestZeichen({ art, d = 7, farbe }: { art: Fest['art']; d?: number; farbe: string }) {
  const stern = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z'
  return (
    <Svg width={d} height={d} viewBox="0 0 24 24">
      {art === 'anlass' ? (
        <Path d="M12 3l8 9-8 9-8-9z" fill={farbe} />
      ) : art === 'beweglich' ? (
        <Path d={stern} fill="#FFFFFF" stroke={farbe} strokeWidth={2.6} strokeLinejoin="round" />
      ) : (
        <Path d={stern} fill={farbe} />
      )}
    </Svg>
  )
}

function Sanduhr({ d = 7, farbe }: { d?: number; farbe: string }) {
  return (
    <Svg width={d} height={d} viewBox="0 0 24 24">
      <Path d="M6 3h12M6 21h12M7 3c0 5 10 6 10 9s-10 4-10 9M17 3c0 5-10 6-10 9s10 4 10 9" fill="none" stroke={farbe} strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  )
}

const FEST_FARBE = THEMA_FARBE.feste

const FEST_KURZ: Record<string, string> = {
  schueberfouer: 'Schueberfouer',
  sprachen: 'Tag der Sprachen 26.9.',
  kinderrechte: 'Kinderrechte 20.11.',
  kleeschen: 'Kleeschen 6.12.',
  liichtmessdag: 'Liichtmëssdag 2.2.',
  fuesent: 'Fuesent',
  buergbrennen: 'Buergbrennen',
  eimaischen: 'Éimaischen',
  buch: 'Welttag des Buches 23.4.',
  nationalfeierdag: 'Nationalfeierdag 23.6.',
}

function FestZeile({ f, hier, c }: { f: Fest; hier: boolean; c: Ctx }) {
  return (
    <View style={{ height: FEST_H, flexDirection: 'row', alignItems: 'center', paddingLeft: 1 }}>
      <FestZeichen art={f.art} farbe={FEST_FARBE} />
      <Text style={{ marginLeft: 3, flex: 1, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.4, color: FEST_FARBE, maxLines: 1, textOverflow: 'ellipsis' }}>
        {(FEST_KURZ[f.id] ?? f.name) + (hier && f.art === 'rueckblick' ? ' (Rückblick)' : '')}
        {hier ? null : <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, color: NEUTRAL.leise }}>{`  →\u00A0${einheit(c, f.einheit).nr}`}</Text>}
      </Text>
    </View>
  )
}

function Kopf({ reiter, meta, p }: { reiter: string; meta: string; p: Palette }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <View style={{ backgroundColor: p.tief, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{reiter.toUpperCase()}</Text>
      </View>
      <Text style={{ marginLeft: 8, flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3, maxLines: 1, textOverflow: 'ellipsis' }}>{meta}</Text>
    </View>
  )
}

function Fuss({ titel }: { titel: string }) {
  return (
    <View fixed style={{ position: 'absolute', left: RAND, right: RAND, bottom: 14, borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 4.5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: NEUTRAL.marke, letterSpacing: 0.4 }}>{`Jahresplan · ${U.marke.de}`}</Text>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise, marginLeft: 6, flex: 1, maxLines: 1, textOverflow: 'ellipsis' }}>{ty(titel)}</Text>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.5, color: NEUTRAL.sehrLeise, marginRight: 10 }}>Ferien und Feste jedes Jahr im Schulkalender des MENJE prüfen</Text>
        <Text style={{ width: 30, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.5, color: NEUTRAL.text, textAlign: 'right' }} render={({ pageNumber }) => String(pageNumber)} />
      </View>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6, color: NEUTRAL.sehrLeise, marginTop: 2.5, letterSpacing: 0.15 }}>{U.text.de}</Text>
    </View>
  )
}

const seitenStil = { paddingHorizontal: RAND, paddingTop: OBEN, paddingBottom: UNTEN }

function Seitentitel({ titel, unter, p, rechts, unten = 8 }: { titel: string; unter?: string; p: Palette; rechts?: ReactNode; unten?: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: unten }}>
      <View style={{ flex: 1 }}>
        <View style={{ width: 24, height: 3.2, borderRadius: 2, backgroundColor: p.tief, marginBottom: 5 }} />
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 19, color: NEUTRAL.text, letterSpacing: -0.3, lineHeight: 1.1 }}>{ty(titel)}</Text>
          {unter ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.6, color: NEUTRAL.leise, marginLeft: 9, marginBottom: 2.5, flex: 1 }}>{ty(unter)}</Text> : null}
        </View>
      </View>
      {rechts}
    </View>
  )
}

function Absatz({ children, groesse = 8.6, farbe = NEUTRAL.text, oben = 0 }: { children: ReactNode; groesse?: number; farbe?: string; oben?: number }) {
  return <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: groesse, lineHeight: 1.42, color: farbe, marginTop: oben }}>{children}</Text>
}

function B_({ children }: { children: ReactNode }) {
  return <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600 }}>{children}</Text>
}

function Punkt({ children, p, groesse = 8.4 }: { children: ReactNode; p: Palette; groesse?: number }) {
  return (
    <View style={{ flexDirection: 'row', marginTop: 3 }}>
      <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: p.tief, marginTop: groesse * 0.55, marginRight: 6 }} />
      <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontSize: groesse, lineHeight: 1.42, color: NEUTRAL.text }}>{children}</Text>
    </View>
  )
}

function Kasten({ titel, p, children, ton, stil }: { titel: string; p: Palette; children: ReactNode; ton?: string; stil?: object }) {
  return (
    <View style={{ backgroundColor: ton ?? p.zart, borderRadius: 8, padding: 10, paddingLeft: 11, ...stil }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.6, color: p.tief, marginBottom: 2 }}>{ty(titel)}</Text>
      {children}
    </View>
  )
}

// --- Wochenkarte -----------------------------------------------------------------------------------------------

/** Lange Titel mit Doppelpunkt („Bodenroboter: Programmieren ohne Bildschirm“) passen nicht in zwei Zeilen der
 *  Karte: dort nur der Teil vor dem Doppelpunkt. */
function kartenTitel(t: string, max = 38): string {
  return t.length > max && t.includes(': ') ? t.slice(0, t.indexOf(': ')) : t
}

function WochenKarte({ w, e, h = KARTE_H }: { w: number; e: Einheit; h?: number }) {
  const f = themaFarbe(e.thema)
  const anker = ankerIds.has(e.id)
  return (
    <View style={{ height: h, flexDirection: 'row', borderRadius: 4.5, borderWidth: 0.6, borderColor: NEUTRAL.rahmen, backgroundColor: '#FFFFFF' }}>
      <View style={{ width: 3.4, backgroundColor: f, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }} />
      <View style={{ flex: 1, paddingLeft: 4.5, paddingRight: 3.5, paddingTop: 2.6, paddingBottom: 2.4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 9 }}>
          <View style={{ backgroundColor: NEUTRAL.text, borderRadius: 2.5, paddingHorizontal: 2.6, height: 8.4, justifyContent: 'center', minWidth: 11 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.2, color: '#FFFFFF', textAlign: 'center', lineHeight: 1 }}>{String(w)}</Text>
          </View>
          <Text style={{ marginLeft: 3.5, flex: 1, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.4, color: f, letterSpacing: 0.2 }}>{e.nr}</Text>
          <ThemaBild thema={e.thema} d={10} />
        </View>
        <Text style={{ marginTop: 1.1, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.5, lineHeight: 1.06, color: NEUTRAL.text, maxLines: 2, textOverflow: 'ellipsis' }}>{ty(kartenTitel(e.titel))}</Text>
        {e.experiment ? (
          <Text style={{ marginTop: 1, fontFamily: SCHRIFT.jugend, fontSize: 5.9, lineHeight: 1.12, color: NEUTRAL.leise, maxLines: 2, textOverflow: 'ellipsis' }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 5.4, color: NEUTRAL.sehrLeise }}>{'EXP  '}</Text>
            {ty(e.experiment)}
          </Text>
        ) : null}
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Domaenen liste={e.domaenen} d={7} />
          <View style={{ flex: 1 }} />
          {e.vorlauf3 ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 2 }}>
              <Sanduhr d={6.4} farbe={NEUTRAL.leise} />
              <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 5.4, color: NEUTRAL.leise, marginLeft: 1 }}>3 Wo.</Text>
            </View>
          ) : null}
          {anker ? <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 5.4, color: NEUTRAL.leise, marginLeft: 3, letterSpacing: 0.3 }}>JEDES JAHR</Text> : null}
        </View>
      </View>
    </View>
  )
}

// --- Ferien-Trenner (senkrecht) --------------------------------------------------------------------------------

function Trenner({ name, h }: { name: string; h: number }) {
  const mx = TRENNER / 2
  const my = h / 2
  return (
    <View style={{ width: TRENNER, marginHorizontal: 2, height: h }}>
      <Svg width={TRENNER} height={h}>
        <Rect x={0} y={0} width={TRENNER} height={h} rx={3} fill={NEUTRAL.flaeche} />
        {Array.from({ length: Math.floor(h / 7) }, (_, i) => (
          <Line key={i} x1={0} y1={i * 7 + 7} x2={TRENNER} y2={i * 7 + 7 - TRENNER} stroke={NEUTRAL.haarlinie} strokeWidth={0.6} />
        ))}
        <Rect x={1.5} y={my - name.length * 2.6 - 4} width={TRENNER - 3} height={name.length * 5.2 + 8} fill={NEUTRAL.flaeche} />
        <SText x={mx} y={my} textAnchor="middle" fill={NEUTRAL.leise} transform={`rotate(-90 ${mx} ${my}) translate(0 2.4)`} style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.6, letterSpacing: 0.8 }}>
          {name.toUpperCase()}
        </SText>
      </Svg>
    </View>
  )
}

// --- Seite: Jahr (36 Wochenkarten) -----------------------------------------------------------------------------

function JahrSeite({ j, c }: { j: JahrId; c: Ctx }) {
  const p = c.p
  const ids = PLAN.jahre[j]
  const zaehl = DOMS.map((d) => ids.filter((id) => einheit(c, id).domaenen.includes(d.id)).length)
  const spaltenH = 440
  const ferienName = (nach: number) => FERIEN.find((f) => f.nach === nach)?.name ?? ''
  const trimX = (von: number, bis: number) => {
    const a = ABSCHNITTE.findIndex((x) => x.von === von)
    const z = ABSCHNITTE.findIndex((x) => x.bis === bis)
    const x0 = a * (SPALTE + TRENNER + 4)
    const x1 = z * (SPALTE + TRENNER + 4) + SPALTE
    return { left: x0, width: x1 - x0 }
  }
  return (
    <Page size="A4" orientation="landscape" style={seitenStil}>
      <Kopf reiter={`Jahr ${j}`} meta="Jahresplan Spielschule  ·  Drei-Jahres-Rad  ·  36 Themenwochen von der Rentrée bis Mitte Juli" p={p} />
      <Seitentitel
        titel={`Jahr ${j}`}
        unter={`${ids.filter((x) => !ankerIds.has(x)).length} Einheiten im Rad und ${ANKER.length} Anker (jedes Jahr) · Lernbereiche im Jahr:`}
        p={p}
        unten={6}
        rechts={
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 1 }}>
            {DOMS.map((d, i) => (
              <View key={d.id} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 7 }}>
                <DomaeneKreis id={d.id} d={11} />
                <Text style={{ marginLeft: 2.5, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: NEUTRAL.text }}>{String(zaehl[i])}</Text>
              </View>
            ))}
          </View>
        }
      />
      {/* Trimester */}
      <View style={{ height: 12, position: 'relative' }}>
        {TRIMESTER.map((t) => {
          const x = trimX(t.von, t.bis)
          return (
            <View key={t.nr} style={{ position: 'absolute', left: x.left, width: x.width, top: 0, height: 11, borderTopWidth: 1.2, borderTopColor: p.mittel, borderLeftWidth: 1.2, borderLeftColor: p.mittel, borderRightWidth: 1.2, borderRightColor: p.mittel, borderTopLeftRadius: 3, borderTopRightRadius: 3, alignItems: 'center' }}>
              <Text style={{ marginTop: -5.5, backgroundColor: '#FFFFFF', paddingHorizontal: 5, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.6, color: p.tief }}>{`${t.nr}. TRIMESTER · ${t.zeit.toUpperCase()}`}</Text>
            </View>
          )
        })}
      </View>
      <View style={{ flexDirection: 'row' }}>
        {ABSCHNITTE.map((a, ai) => (
          <View key={a.nr} style={{ flexDirection: 'row' }}>
            <View style={{ width: SPALTE }}>
              <View style={{ height: 20, marginBottom: 2 }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, color: NEUTRAL.text }}>{`Abschnitt ${a.nr}`}</Text>
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.4, color: NEUTRAL.leise, marginTop: 1 }}>{`${a.zeit} · ${a.bis - a.von + 1} Wochen`}</Text>
              </View>
              {Array.from({ length: a.bis - a.von + 1 }, (_, k) => {
                const w = a.von + k
                const id = ids[w - 1]
                const feste = festeDerWoche(w, id)
                return (
                  <View key={w} style={{ marginBottom: KARTE_ABSTAND }}>
                    {feste.map((f) => (
                      <FestZeile key={f.id} f={f} hier={f.einheit === id} c={c} />
                    ))}
                    <WochenKarte w={w} e={einheit(c, id)} />
                  </View>
                )
              })}
              {a.nr === 4 ? <Absatz groesse={6.2} farbe={NEUTRAL.leise} oben={2}>{'Ostern früh oder spät: Dieser Abschnitt hat 3 bis 7 Wochen. Kürzer – letzte Woche ohne Fest als Joker zurückgeben; länger – einen Joker einsetzen.'}</Absatz> : null}
            </View>
            {ai < ABSCHNITTE.length - 1 ? <Trenner name={ferienName(a.bis)} h={spaltenH} /> : null}
          </View>
        ))}
      </View>
      <Fuss titel={`Jahr ${j}: die 36 Wochen`} />
    </Page>
  )
}

// --- Seite: Kompetenzlandkarte ---------------------------------------------------------------------------------

function KarteSeite({ j, c }: { j: JahrId; c: Ctx }) {
  const p = c.p
  const ids = PLAN.jahre[j]
  const zelle = (d: DomaeneId, von: number, bis: number) => ids.slice(von - 1, bis).flatMap((id, i) => (einheit(c, id).domaenen.includes(d) ? [{ id, w: von + i }] : []))
  const max = 10
  const spalteB = 138
  const kopfB = 150
  const vergleich = JAHRE.map((jj) => DOMS.map((d) => PLAN.jahre[jj].filter((id) => einheit(c, id).domaenen.includes(d.id)).length))
  const themen = [...new Set(ids.map((id) => einheit(c, id).thema))].sort((a, b) => ids.filter((x) => einheit(c, x).thema === b).length - ids.filter((x) => einheit(c, x).thema === a).length || themaName(a).localeCompare(themaName(b), 'de'))
  return (
    <Page size="A4" orientation="landscape" style={seitenStil}>
      <Kopf reiter={`Jahr ${j}`} meta="Jahresplan Spielschule  ·  Kompetenzlandkarte: Lernbereiche des Plan d’études × Trimester" p={p} />
      <Seitentitel titel={`Jahr ${j}: Kompetenzlandkarte`} unter="Wie oft kommt jeder Lernbereich vor? Gezählt sind Themenwochen – eine Woche zählt für bis zu drei Bereiche." p={p} />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: kopfB + 3 * spalteB + 64 }}>
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: p.mittel, paddingBottom: 4 }}>
            <Text style={{ width: kopfB, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, letterSpacing: 0.6, color: NEUTRAL.leise }}>LERNBEREICH</Text>
            {TRIMESTER.map((t) => (
              <View key={t.nr} style={{ width: spalteB, paddingLeft: 8 }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: NEUTRAL.text }}>{`${t.nr}. Trimester`}</Text>
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.6, color: NEUTRAL.leise }}>{`Woche ${t.von}–${t.bis} · ${t.zeit}`}</Text>
              </View>
            ))}
            <View style={{ width: 64, paddingLeft: 8 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: NEUTRAL.text }}>Jahr</Text>
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.6, color: NEUTRAL.leise }}>36 Wochen</Text>
            </View>
          </View>
          {DOMS.map((d) => {
            const summe = ids.filter((id) => einheit(c, id).domaenen.includes(d.id)).length
            return (
              <View key={d.id} style={{ flexDirection: 'row', height: 66, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.haarlinie, alignItems: 'stretch' }}>
                <View style={{ width: kopfB, flexDirection: 'row', alignItems: 'center', paddingRight: 8 }}>
                  <DomaeneKreis id={d.id} d={17} />
                  <View style={{ marginLeft: 7, flex: 1 }}>
                    <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.2, lineHeight: 1.2, color: NEUTRAL.text }}>{ty(d.de)}</Text>
                    <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.3, lineHeight: 1.25, color: NEUTRAL.leise, marginTop: 1.5 }}>{typo(d.fr, 'fr')}</Text>
                  </View>
                </View>
                {TRIMESTER.map((t) => {
                  const liste = zelle(d.id, t.von, t.bis)
                  const n = liste.length
                  return (
                    <View key={t.nr} style={{ width: spalteB, padding: 4, paddingLeft: 8 }}>
                      <View style={{ flex: 1, borderRadius: 6, backgroundColor: mische(d.farbe, 0.05 + 0.2 * Math.min(1, n / max)), padding: 5, paddingTop: 4 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 15, color: d.farbe, width: 22, lineHeight: 1 }}>{String(n)}</Text>
                          <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                            {liste.map((x) => (
                              <View key={x.w} style={{ width: 6.5, height: 6.5, borderRadius: 1.5, backgroundColor: d.farbe, marginRight: 1.6, marginBottom: 1.6 }} />
                            ))}
                          </View>
                        </View>
                        <Text style={{ marginTop: 3, fontFamily: SCHRIFT.jugend, fontSize: 5.9, lineHeight: 1.3, color: NEUTRAL.text, maxLines: 3, textOverflow: 'ellipsis' }}>
                          {liste.map((x) => einheit(c, x.id).nr.replace('SP-', '')).join(' · ')}
                        </Text>
                      </View>
                    </View>
                  )
                })}
                <View style={{ width: 64, paddingLeft: 8, justifyContent: 'center' }}>
                  <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 17, color: NEUTRAL.text, lineHeight: 1 }}>{String(summe)}</Text>
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.4, color: NEUTRAL.leise, marginTop: 2 }}>{`in ${Math.round((summe / WOCHEN) * 100)} % der Wochen`}</Text>
                </View>
              </View>
            )
          })}
          <Absatz groesse={6.8} farbe={NEUTRAL.leise} oben={6}>
            {'Kästchen = Themenwochen, Zahlen darunter = SP-Nummern. Leitlinie im Plan: jeder Lernbereich in jedem Trimester mindestens zweimal (Sprache, Mathematik: dreimal; Welt, Zusammenleben: viermal). Wer eine Woche tauscht, nimmt eine Einheit mit denselben Buchstaben – dann bleibt die Karte im Lot.'}
          </Absatz>
        </View>
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Kasten titel="Drei Jahre im Vergleich" p={p} stil={{ marginBottom: 9 }}>
            <View style={{ flexDirection: 'row', marginTop: 3, marginBottom: 2 }}>
              <View style={{ width: 22 }} />
              {JAHRE.map((jj) => (
                <Text key={jj} style={{ flex: 1, textAlign: 'center', fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, color: jj === j ? p.tief : NEUTRAL.leise }}>{jj}</Text>
              ))}
            </View>
            {DOMS.map((d, di) => (
              <View key={d.id} style={{ flexDirection: 'row', alignItems: 'center', height: 13 }}>
                <View style={{ width: 22 }}>
                  <DomaeneKreis id={d.id} d={9.5} />
                </View>
                {JAHRE.map((jj, ji) => (
                  <Text key={jj} style={{ flex: 1, textAlign: 'center', fontFamily: SCHRIFT.titel, fontWeight: jj === j ? 800 : 700, fontSize: 8.4, color: jj === j ? NEUTRAL.text : NEUTRAL.leise }}>{String(vergleich[ji][di])}</Text>
                ))}
              </View>
            ))}
          </Kasten>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.4, letterSpacing: 0.6, color: NEUTRAL.leise, marginBottom: 3 }}>{`THEMEN IM JAHR ${j}`}</Text>
          {themen.map((t) => {
            const liste = ids.filter((x) => einheit(c, x).thema === t)
            return (
              <View key={t} style={{ flexDirection: 'row', alignItems: 'center', height: 15 }}>
                <ThemaBild thema={t} d={12} />
                <View style={{ width: 2.6, height: 9, borderRadius: 1, backgroundColor: themaFarbe(t), marginLeft: 3 }} />
                <Text style={{ marginLeft: 3.5, flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.text, maxLines: 1, textOverflow: 'ellipsis' }}>{ty(themaName(t))}</Text>
                <Text style={{ width: 12, textAlign: 'right', fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.8, color: NEUTRAL.text }}>{String(liste.length)}</Text>
              </View>
            )
          })}
        </View>
      </View>
      <Fuss titel={`Jahr ${j}: Kompetenzlandkarte`} />
    </Page>
  )
}

// --- Seite: drei Jahre auf einen Blick -------------------------------------------------------------------------

function BlickSeite({ c }: { c: Ctx }) {
  const p = c.p
  const zeileH = 11.4
  const wocheB = 22
  const zeitB = 30
  const festB = 118
  const jahrB = (INNEN_B - wocheB - zeitB - festB) / 3
  const zelle = (id: string, key: string) => {
    const e = einheit(c, id)
    return (
      <View key={key} style={{ width: jahrB, flexDirection: 'row', alignItems: 'center', paddingRight: 6 }}>
        <View style={{ width: 3, height: zeileH - 3, borderRadius: 1, backgroundColor: themaFarbe(e.thema), marginRight: 4 }} />
        <Text style={{ width: 25, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.4, color: themaFarbe(e.thema) }}>{e.nr.replace('SP-', '')}</Text>
        <Text style={{ width: jahrB - 82, fontFamily: SCHRIFT.jugend, fontWeight: ankerIds.has(id) ? 600 : 400, fontSize: 6.9, color: NEUTRAL.text, maxLines: 1, textOverflow: 'ellipsis' }}>{ty(kartenTitel(e.titel))}</Text>
        <View style={{ flex: 1 }} />
        <Domaenen liste={e.domaenen} d={5.6} />
      </View>
    )
  }
  return (
    <Page size="A4" orientation="landscape" style={seitenStil}>
      <Kopf reiter="Auf einen Blick" meta="Jahresplan Spielschule  ·  Drei-Jahres-Rad: Jahr A, B und C nebeneinander" p={p} />
      <Seitentitel titel="Die drei Jahre auf einen Blick" unter="Für die Teamsitzung: Welche Woche, welche Einheit – in allen drei Jahren. Nummern = SP-Nummern, fett = Anker (jedes Jahr)." p={p} />
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: p.mittel, paddingBottom: 2.5, marginBottom: 1 }}>
        <Text style={{ width: wocheB, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.6, color: NEUTRAL.leise }}>WO.</Text>
        <Text style={{ width: zeitB, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.6, color: NEUTRAL.leise }}>ZEIT</Text>
        <Text style={{ width: festB, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.6, color: NEUTRAL.leise }}>FEST / ANLASS</Text>
        {JAHRE.map((j) => (
          <Text key={j} style={{ width: jahrB, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, color: p.tief }}>{`Jahr ${j}`}</Text>
        ))}
      </View>
      {Array.from({ length: WOCHEN }, (_, i) => {
        const w = i + 1
        const fe = FESTE.filter((f) => f.woche === w)
        const ferien = FERIEN.find((f) => f.nach === w && f.id !== 'sommer')
        return (
          <View key={w}>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: zeileH, backgroundColor: i % 2 ? '#FFFFFF' : NEUTRAL.flaeche, borderRadius: 2 }}>
              <Text style={{ width: wocheB, paddingLeft: 3, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: NEUTRAL.text }}>{String(w)}</Text>
              <Text style={{ width: zeitB, fontFamily: SCHRIFT.jugend, fontSize: 6.4, color: NEUTRAL.leise }}>{MONAT_DER_WOCHE[i]}</Text>
              <View style={{ width: festB, flexDirection: 'row', alignItems: 'center', paddingRight: 4 }}>
                {fe.length ? <FestZeichen art={fe[0].art} d={6} farbe={FEST_FARBE} /> : null}
                <Text style={{ marginLeft: 3, flex: 1, fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 6.3, color: FEST_FARBE, maxLines: 1, textOverflow: 'ellipsis' }}>{fe.map((f) => f.name).join(' · ')}</Text>
              </View>
              {JAHRE.map((j) => zelle(PLAN.jahre[j][i], j))}
            </View>
            {ferien ? (
              <View style={{ height: 6.2, flexDirection: 'row', alignItems: 'center', marginVertical: 0.6 }}>
                <View style={{ flex: 1, height: 0.6, backgroundColor: NEUTRAL.rahmen }} />
                <Text style={{ marginHorizontal: 6, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 5.4, letterSpacing: 0.8, color: NEUTRAL.sehrLeise }}>{`${ferien.name.toUpperCase()} · ${ferien.dauer === 1 ? '1 WOCHE' : ferien.dauer + ' WOCHEN'}`}</Text>
                <View style={{ flex: 1, height: 0.6, backgroundColor: NEUTRAL.rahmen }} />
              </View>
            ) : null}
          </View>
        )
      })}
      <Fuss titel="Die drei Jahre auf einen Blick" />
    </Page>
  )
}

// --- Seite: So nutzen Sie den Plan -----------------------------------------------------------------------------

function NutzenSeite({ c }: { c: Ctx }) {
  const p = c.p
  const imRad = new Set(JAHRE.flatMap((j) => PLAN.jahre[j]))
  const beispiel = einheit(c, PLAN.jahre.A[8])
  const themen = Object.keys(THEMA_FARBE)
  const spalte = (INNEN_B - 2 * 16) / 3
  return (
    <Page size="A4" orientation="landscape" style={seitenStil}>
      <Kopf reiter="Anleitung" meta="Jahresplan Spielschule  ·  Auswahlempfehlung, Tauschregeln, Legende" p={p} />
      <Seitentitel titel="So nutzen Sie den Plan" unter={`${c.e.size} Einheiten reichen für mehr als drei Schuljahre – der Plan wählt aus und verteilt sie.`} p={p} />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: spalte, marginRight: 16 }}>
          <Kasten titel="Das Rad: drei Jahre, keine Wiederholung" p={p}>
            <Absatz groesse={8.2}>
              Ein Kind bleibt bis zu drei Jahre in der Spielschule (Précoce, Préscolaire 1 und 2). Darum dreht sich der Plan in drei Jahren: <B_>A, B, C</B_> – dann wieder A. So erlebt kein Kind dieselbe Themenwoche zweimal – außer den drei Ankern.
            </Absatz>
          </Kasten>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.6, color: NEUTRAL.text, marginTop: 9, marginBottom: 1 }}>Die Auswahl</Text>
          <Punkt p={p}>
            <B_>36 Wochen je Jahr</B_> von der Rentrée bis Mitte Juli, in sechs Abschnitten zwischen den Ferien.
          </Punkt>
          <Punkt p={p}>
            <B_>{`${ANKER.length} Anker`}</B_> stehen jedes Jahr gleich: {ANKER.map((a) => `${einheit(c, a.einheit).titel} (${einheit(c, a.einheit).nr})`).join(', ')}. {'Neue Kinder, Kleeschen und der Wechsel in den Cycle 2 kommen jedes Jahr.'}
          </Punkt>
          <Punkt p={p}>
            <B_>{`${imRad.size - ANKER.length} Einheiten`}</B_> stehen je einmal im Rad – ausgewogen nach Themen und nach den sechs Lernbereichen des Plan d’études (Kompetenzlandkarte je Jahr).
          </Punkt>
          <Punkt p={p}>
            <B_>{`${PLAN.joker.length} Joker`}</B_> bleiben frei: Schnee-Wochen, Besuche, Wünsche der Kinder, Vertiefungen (S. {seite('joker')}).
          </Punkt>
          <Punkt p={p}>
            <B_>Luxemburger Feste</B_> stehen in jedem Jahr an ihrem Termin (Stern). Die ganze Einheit dazu kommt einmal im Rad; in den anderen Jahren reicht ein Festtag mit Ideen aus der Einheit (Pfeil{'\u00A0'}→{'\u00A0'}SP-Nummer; S.{'\u00A0'}{seite('kalender')}).
          </Punkt>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.6, color: NEUTRAL.text, marginTop: 9, marginBottom: 1 }}>Welches Jahr?</Text>
          <Absatz groesse={8.2}>
            Im ersten Jahr mit Jahr A beginnen, danach B und C. Am besten arbeiten alle Spielschulklassen der Schule im selben Jahr: Material, Ausflüge und Feste lassen sich dann teilen. Das laufende Jahr im Klassenbuch notieren.
          </Absatz>
        </View>
        <View style={{ width: spalte, marginRight: 16 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.6, color: NEUTRAL.text, marginBottom: 1 }}>Tauschen ist erlaubt</Text>
          <Punkt p={p}>
            <B_>Im Abschnitt frei schieben.</B_> Zwischen zwei Ferien darf jede Woche ohne Fest den Platz wechseln.
          </Punkt>
          <Punkt p={p}>
            <B_>Feste bleiben am Termin.</B_> Bewegliche Feste (offener Stern) hängen an Ostern: Fuesent, Buergbrennen, Éimaischen – die Woche jedes Jahr neu bestimmen.
          </Punkt>
          <Punkt p={p}>
            <B_>Jahreszeiten bleiben in ihrer Zeit.</B_> Herbst, Winter, Frühling und Sommer nur in ihrer Jahreszeit tauschen.
          </Punkt>
          <Punkt p={p}>
            <B_>Joker einsetzen:</B_> eine Woche ohne Fest gegen einen Joker tauschen – möglichst mit denselben Buchstaben (Lernbereiche), dann bleibt die Kompetenzlandkarte im Lot. Die getauschte Einheit wird zum Joker.
          </Punkt>
          <Punkt p={p}>
            <B_>Ostern verschiebt Abschnitt 4 und 5.</B_> Ist ein Abschnitt kürzer, die letzte Woche ohne Fest zum Joker machen; ist er länger, einen Joker einsetzen.
          </Punkt>
          <Punkt p={p}>
            <B_>Kurze Wochen</B_> (1. Mai, 9. Mai, Christi Himmelfahrt, 23. Juni): die Einheit auf vier Tage kürzen, das Experiment bleibt.
          </Punkt>
          <Punkt p={p}>
            <B_>Kinder entscheiden mit:</B_> Einmal im Trimester wählt die Kinderkonferenz ({einheit(c, 'sp-kinderkonferenz').nr}) einen Joker für eine Woche.
          </Punkt>
          <Punkt p={p}>
            <B_>Vorlauf beachten:</B_> Einheiten mit Sanduhr brauchen 3 Wochen Vorbereitung (Besuch, Termin, Einwilligung) – rechtzeitig anfragen.
          </Punkt>
          <Kasten titel="Bei einem Verlust" p={p} ton={NEUTRAL.flaeche} stil={{ marginTop: 9 }}>
            <Absatz groesse={7.8}>
              {`„${einheit(c, 'sp-abschied-wiedersehen').titel}“ (${einheit(c, 'sp-abschied-wiedersehen').nr}) steht am Ende eines Jahres – sie passt aber jederzeit, wenn ein Kind einen Verlust erlebt. Dann vorziehen.`}
            </Absatz>
          </Kasten>
        </View>
        <View style={{ width: spalte }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.6, color: NEUTRAL.text, marginBottom: 4 }}>So lesen Sie eine Wochenkarte</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: SPALTE }}>
              <FestZeile f={FESTE.find((f) => f.id === 'kinderrechte')!} hier c={c} />
              <WochenKarte w={9} e={beispiel} />
            </View>
            <View style={{ flex: 1, marginLeft: 8, position: 'relative', height: FEST_H + KARTE_H }}>
              {(
                [
                  ['Fest oder Anlass der Woche', 0.8],
                  ['Woche · SP-Nummer · Themenbild', 13.2],
                  ['Titel der Einheit', 22.8],
                  ['EXP = Experiment der Woche', 31.2],
                  ['Lernbereiche (Buchstaben)', 56],
                ] as [string, number][]
              ).map(([x, top]) => (
                <Text key={x} style={{ position: 'absolute', top, left: 0, fontFamily: SCHRIFT.jugend, fontSize: 6.8, color: NEUTRAL.leise }}>{`← ${x}`}</Text>
              ))}
            </View>
          </View>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.2, letterSpacing: 0.6, color: NEUTRAL.leise, marginTop: 8, marginBottom: 2 }}>LERNBEREICHE DES PLAN D’ÉTUDES</Text>
          {DOMS.map((d) => (
            <View key={d.id} style={{ flexDirection: 'row', alignItems: 'center', height: 11.5 }}>
              <DomaeneKreis id={d.id} d={8.6} />
              <Text style={{ marginLeft: 5, fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.text }}>{ty(d.de)}</Text>
            </View>
          ))}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
            {[
              ['fest', 'festes Datum'],
              ['beweglich', 'beweglich (Ostern)'],
              ['anlass', 'Welttag'],
            ].map(([a, t]) => (
              <View key={a} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 9 }}>
                <FestZeichen art={a as Fest['art']} d={7} farbe={FEST_FARBE} />
                <Text style={{ marginLeft: 3, fontFamily: SCHRIFT.jugend, fontSize: 6.8, color: NEUTRAL.text }}>{t}</Text>
              </View>
            ))}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Sanduhr d={7} farbe={NEUTRAL.leise} />
              <Text style={{ marginLeft: 3, fontFamily: SCHRIFT.jugend, fontSize: 6.8, color: NEUTRAL.text }}>3 Wochen Vorlauf</Text>
            </View>
          </View>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.2, letterSpacing: 0.6, color: NEUTRAL.leise, marginTop: 8, marginBottom: 2 }}>THEMEN (FARBE UND BILD)</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {themen.map((t) => (
              <View key={t} style={{ width: '50%', flexDirection: 'row', alignItems: 'center', height: 12.4 }}>
                <ThemaBild thema={t} d={10} />
                <View style={{ width: 3, height: 8, backgroundColor: themaFarbe(t), marginLeft: 3, borderRadius: 1 }} />
                <Text style={{ marginLeft: 3, flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 6.6, color: NEUTRAL.text, maxLines: 1, textOverflow: 'ellipsis' }}>{ty(themaName(t))}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={{ position: 'absolute', left: RAND, right: RAND, bottom: UNTEN + 16, flexDirection: 'row', borderTopWidth: 1, borderTopColor: p.mittel, paddingTop: 9 }}>
        {[
          [String(c.e.size), 'Einheiten in der Sammlung'],
          ['3', 'Jahre im Rad: A, B, C'],
          [String(WOCHEN), 'Themenwochen je Jahr'],
          [String(ANKER.length), 'Anker: jedes Jahr gleich'],
          [String(imRad.size - ANKER.length), 'Einheiten je einmal im Rad'],
          [String(PLAN.joker.length), 'Joker für besondere Wochen'],
          [String(FESTE.length), 'Feste und Welttage'],
        ].map(([z, t]) => (
          <View key={t} style={{ flex: 1, paddingRight: 8 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 22, color: p.tief, lineHeight: 1 }}>{z}</Text>
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, marginTop: 3, lineHeight: 1.3 }}>{t}</Text>
          </View>
        ))}
      </View>
      <Fuss titel="So nutzen Sie den Plan" />
    </Page>
  )
}

// --- Seite: Festkalender und Ferien ----------------------------------------------------------------------------

function KalenderSeite({ c }: { c: Ctx }) {
  const p = c.p
  // Band: Sommer-Ende (1,5) + 36 Wochen + Ferien (7) + Sommer (1,5)
  const einheiten = 1.5 + WOCHEN + FERIEN.filter((f) => f.id !== 'sommer').reduce((s, f) => s + f.dauer, 0) + 1.5
  const u = INNEN_B / einheiten
  const xWoche = (w: number) => (1.5 + (w - 1) + FERIEN.filter((f) => f.id !== 'sommer' && f.nach < w).reduce((s, f) => s + f.dauer, 0)) * u
  const bandY = 30
  const bandH = 50
  const festY = bandY + bandH + 8
  const svgH = 150
  const ferienBloecke = [
    { name: 'Sommer', x: 0, b: 1.5 * u },
    ...FERIEN.filter((f) => f.id !== 'sommer').map((f) => ({ name: f.name, x: xWoche(f.nach) + u, b: f.dauer * u })),
    { name: 'Sommer', x: INNEN_B - 1.5 * u, b: 1.5 * u },
  ]
  // Monatsanfänge (ungefähr): erste Woche je Monat
  const monate = MONAT_DER_WOCHE.flatMap((m, i) => (i === 0 || MONAT_DER_WOCHE[i - 1] !== m ? [{ m, w: i + 1 }] : []))
  // Feste: Bahnen gegen Überlappen
  const bahnen: number[] = []
  const feste = [...FESTE].sort((a, b) => a.woche - b.woche).map((f) => {
    const x = xWoche(f.woche) + u / 2
    const breite = (f.name.length + 6) * 3.6
    let bahn = 0
    while (bahnen[bahn] !== undefined && bahnen[bahn] > x - 4) bahn++
    bahnen[bahn] = x + breite
    return { f, x, bahn }
  })
  const fest = FESTE.filter((f) => f.art === 'fest' || f.art === 'rueckblick')
  const beweglich = FESTE.filter((f) => f.art === 'beweglich')
  const anlass = FESTE.filter((f) => f.art === 'anlass')
  const jahrVon = (id: string) => {
    const w = wochenVon(id)
    return w.length === 3 ? 'jedes Jahr' : w.map((x) => `Jahr ${x.j}`).join(', ')
  }
  const tabelle = (titel: string, liste: Fest[], zeichen: Fest['art']) => (
    <View style={{ marginBottom: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.9, borderBottomColor: p.mittel, paddingBottom: 2.5, marginBottom: 1 }}>
        <FestZeichen art={zeichen} d={8} farbe={FEST_FARBE} />
        <Text style={{ marginLeft: 4, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.8, color: NEUTRAL.text }}>{titel}</Text>
      </View>
      {liste.map((f, i) => (
        <View key={f.id} style={{ flexDirection: 'row', paddingVertical: 2.4, paddingHorizontal: 3, backgroundColor: i % 2 ? '#FFFFFF' : NEUTRAL.flaeche, borderRadius: 2 }}>
          <Text style={{ width: 82, fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 7.3, color: NEUTRAL.text }}>{ty(f.name)}</Text>
          <Text style={{ width: 96, fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.text, paddingRight: 4 }}>{ty(f.datum)}</Text>
          <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 7, lineHeight: 1.3, color: NEUTRAL.leise, paddingRight: 4 }}>{ty(f.regel)}</Text>
          <Text style={{ width: 92, fontFamily: SCHRIFT.jugend, fontSize: 6.8, color: NEUTRAL.text }}>
            <Text style={{ fontWeight: 600 }}>{`${einheit(c, f.einheit).nr}`}</Text>
            {` · Woche ${f.woche} · ${jahrVon(f.einheit)}`}
          </Text>
        </View>
      ))}
    </View>
  )
  return (
    <Page size="A4" orientation="landscape" style={seitenStil}>
      <Kopf reiter="Kalender" meta="Jahresplan Spielschule  ·  Ferienrhythmus und Luxemburger Festkalender" p={p} />
      <Seitentitel titel="Festkalender und Ferien" unter="Lage im Schuljahr ohne feste Daten: Ferien und Feste jedes Jahr im Schulkalender des MENJE prüfen." p={p} />
      <Svg width={INNEN_B} height={svgH}>
        {/* Trimester */}
        {TRIMESTER.map((t) => {
          const x0 = xWoche(t.von)
          const x1 = xWoche(t.bis) + u
          return (
            <G key={t.nr}>
              <Path d={`M${x0 + 1} 20 L${x0 + 1} 14 L${x1 - 1} 14 L${x1 - 1} 20`} fill="none" stroke={p.mittel} strokeWidth={1.2} />
              <Rect x={(x0 + x1) / 2 - 58} y={8} width={116} height={11} fill="#FFFFFF" />
              <SText x={(x0 + x1) / 2} y={16.5} textAnchor="middle" fill={p.tief} style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.6 }}>{`${t.nr}. TRIMESTER · ${t.zeit.toUpperCase()}`}</SText>
            </G>
          )
        })}
        {/* Wochen */}
        {Array.from({ length: WOCHEN }, (_, i) => {
          const w = i + 1
          const a = ABSCHNITTE.findIndex((x) => w >= x.von && w <= x.bis)
          return (
            <G key={w}>
              <Rect x={xWoche(w) + 0.6} y={bandY} width={u - 1.2} height={bandH} rx={2} fill={a % 2 ? p.zart : mische(p.mittel, 0.55)} />
              <SText x={xWoche(w) + u / 2} y={bandY + bandH - 5} textAnchor="middle" fill={NEUTRAL.text} style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.4 }}>
                {String(w)}
              </SText>
            </G>
          )
        })}
        {/* Monate */}
        {monate.map(({ m, w }) => (
          <G key={m}>
            <Line x1={xWoche(w) + 0.6} y1={bandY + 2} x2={xWoche(w) + 0.6} y2={bandY + 13} stroke={p.tief} strokeWidth={0.8} />
            <SText x={xWoche(w) + 2.6} y={bandY + 9} fill={p.tief} style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.4 }}>
              {m}
            </SText>
          </G>
        ))}
        {/* Ferien */}
        {ferienBloecke.map((f, i) => {
          const mx = f.x + f.b / 2
          const my = bandY + bandH / 2
          return (
            <G key={i}>
              <Rect x={f.x + 0.6} y={bandY} width={f.b - 1.2} height={bandH} rx={2} fill={NEUTRAL.flaeche} stroke={NEUTRAL.rahmen} strokeWidth={0.6} />
              <SText x={mx} y={my} textAnchor="middle" fill={NEUTRAL.leise} transform={`rotate(-90 ${mx} ${my}) translate(0 2.3)`} style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: f.name.length > 11 ? 5.4 : 6.2, letterSpacing: 0.3 }}>
                {f.name.toUpperCase()}
              </SText>
            </G>
          )
        })}
        {/* Feste */}
        {feste.map(({ f, x, bahn }) => (
          <Line key={f.id} x1={x} y1={bandY + bandH} x2={x} y2={festY + 6 + bahn * 17 - 3} stroke={FEST_FARBE} strokeWidth={0.7} />
        ))}
        {feste.map(({ f, x, bahn }) => {
          const y = festY + 6 + bahn * 17
          return (
            <G key={f.id}>
              <Circle cx={x} cy={y} r={3} fill={f.art === 'beweglich' ? '#FFFFFF' : FEST_FARBE} stroke={FEST_FARBE} strokeWidth={1.2} />
              <Rect x={x + 4.5} y={y - 4.6} width={f.name.length * 3.75 + 3} height={16} fill="#FFFFFF" />
              <SText x={x + 6} y={y + 2.4} fill={FEST_FARBE} style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.8 }}>
                {f.name}
              </SText>
              <SText x={x + 6} y={y + 10} fill={NEUTRAL.leise} style={{ fontFamily: SCHRIFT.jugend, fontSize: 5.8 }}>
                {f.art === 'beweglich' ? 'nach Ostern' : f.datum}
              </SText>
            </G>
          )
        })}
      </Svg>
      <View style={{ flexDirection: 'row', marginTop: 2 }}>
        <View style={{ flex: 1, marginRight: 16 }}>
          {tabelle('Feste mit festem Datum', fest, 'fest')}
          {tabelle('Bewegliche Feste: von Ostern aus rechnen', beweglich, 'beweglich')}
          {tabelle('Welttage – passen zu einer Einheit', anlass, 'anlass')}
          <View style={{ marginTop: 2, borderWidth: 1, borderColor: p.tief, borderRadius: 8, padding: 8, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ width: 92, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: p.tief }}>Jedes Jahr prüfen</Text>
            <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 7.4, lineHeight: 1.4, color: NEUTRAL.text }}>
              Daten jedes Jahr im Schulkalender des MENJE prüfen. Zuerst das Osterdatum suchen – daran hängen Fuesent, Buergbrennen, Éimaischen, Christi Himmelfahrt und Pfingsten, also auch die Länge der Abschnitte 4 bis 6.
            </Text>
          </View>
        </View>
        <View style={{ width: 250 }}>
          <Kasten titel="Ferien (Lage ohne Daten)" p={p}>
            {FERIEN.map((f) => (
              <View key={f.id} style={{ flexDirection: 'row', marginTop: 2.5 }}>
                <Text style={{ width: 70, fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 7.2, color: NEUTRAL.text }}>{f.name}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.text, lineHeight: 1.3 }}>{f.id === 'sommer' ? f.zeit : `nach Woche ${f.nach} · ${f.zeit}`}</Text>
                  {f.inne ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.4, color: NEUTRAL.leise, lineHeight: 1.3 }}>{ty(f.inne)}</Text> : null}
                </View>
              </View>
            ))}
          </Kasten>
          <Kasten titel="Kurze Wochen (Feiertage)" p={p} ton={NEUTRAL.flaeche} stil={{ marginTop: 8 }}>
            {FEIERTAGE.map((f) => (
              <View key={f.name} style={{ flexDirection: 'row', marginTop: 2 }}>
                <Text style={{ width: 82, fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 7.2, color: NEUTRAL.text }}>{f.name}</Text>
                <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.leise, lineHeight: 1.3 }}>{f.regel}</Text>
              </View>
            ))}
          </Kasten>
        </View>
      </View>
      <Fuss titel="Festkalender und Ferien" />
    </Page>
  )
}

// --- Seite: Joker ----------------------------------------------------------------------------------------------

function JokerSeite({ c }: { c: Ctx }) {
  const p = c.p
  const arten = JOKER_ARTEN.map((a) => ({ ...a, liste: PLAN.joker.filter((x) => x.art === a.id) })).filter((a) => a.liste.length)
  // zwei Spalten in der Reihenfolge der Arten, ohne eine Art zu teilen: die Teilung mit der kürzeren längsten Spalte
  const last = (l: typeof arten) => l.reduce((s, a) => s + a.liste.length + 1.6, 0)
  let teil = 1
  for (let k = 1; k < arten.length; k++) if (Math.max(last(arten.slice(0, k)), last(arten.slice(k))) < Math.max(last(arten.slice(0, teil)), last(arten.slice(teil)))) teil = k
  const spalten = [arten.slice(0, teil), arten.slice(teil)]
  return (
    <Page size="A4" orientation="landscape" style={seitenStil}>
      <Kopf reiter="Joker" meta="Jahresplan Spielschule  ·  Einheiten, die nicht im Rad stehen" p={p} />
      <Seitentitel titel="Joker: Einheiten für besondere Wochen" unter={`${PLAN.joker.length} Einheiten stehen nicht im Rad. Sie ersetzen eine Woche ohne Fest – wenn Wetter, Gelegenheit oder die Kinder es wollen.`} p={p} />
      <View style={{ flexDirection: 'row' }}>
        {spalten.map((sp, si) => (
          <View key={si} style={{ flex: 1, marginRight: si ? 0 : 16 }}>
            {sp.map((a) => (
              <View key={a.id} style={{ marginBottom: 7 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.9, borderBottomColor: p.mittel, paddingBottom: 3, marginBottom: 2 }}>
                  <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: p.zart, alignItems: 'center', justifyContent: 'center' }}>
                    <Zeichnen z={{ ...forscherZeichnung(a.bild), w: 2 }} p={{ ...p, tinte: p.tief }} breite={10} hoehe={10} />
                  </View>
                  <Text style={{ marginLeft: 6, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: p.tief }}>{a.name}</Text>
                  <Text style={{ marginLeft: 7, flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 7.2, color: NEUTRAL.leise }}>{ty(c.nr(a.text))}</Text>
                </View>
                {a.liste.map((x, i) => {
                  const e = einheit(c, x.einheit)
                  return (
                    <View key={x.einheit} style={{ flexDirection: 'row', alignItems: 'center', height: 24, paddingHorizontal: 3, backgroundColor: i % 2 ? '#FFFFFF' : NEUTRAL.flaeche, borderRadius: 3 }}>
                      <View style={{ width: 3, height: 19, borderRadius: 1, backgroundColor: themaFarbe(e.thema), marginRight: 4 }} />
                      <ThemaBild thema={e.thema} d={13} />
                      <View style={{ width: 150, marginLeft: 5 }}>
                        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.6, color: NEUTRAL.text, maxLines: 1, textOverflow: 'ellipsis' }}>
                          <Text style={{ color: themaFarbe(e.thema) }}>{`${e.nr}  `}</Text>
                          {ty(e.titel)}
                        </Text>
                        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.2, color: NEUTRAL.leise, marginTop: 1, maxLines: 1, textOverflow: 'ellipsis' }}>{`EXP ${ty(e.experiment)}`}</Text>
                      </View>
                      <View style={{ flex: 1, marginLeft: 6 }}>
                        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.9, lineHeight: 1.25, color: NEUTRAL.text, maxLines: 2, textOverflow: 'ellipsis' }}>{ty(c.nr(x.grund))}</Text>
                      </View>
                      <View style={{ width: 84, alignItems: 'flex-end' }}>
                        <Domaenen liste={e.domaenen} d={6.6} />
                        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 5.9, color: NEUTRAL.leise, marginTop: 1.5, maxLines: 1 }}>{ty(x.passt)}</Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            ))}
            {si === 1 ? <Tauschliste p={p} /> : null}
          </View>
        ))}
      </View>
      <Fuss titel="Joker: Einheiten für besondere Wochen" />
    </Page>
  )
}

/** Zum Ausfüllen: welche Woche gegen welchen Joker getauscht wurde. */
function Tauschliste({ p }: { p: Palette }) {
  const sp: [string, number][] = [
    ['Jahr / Woche', 58],
    ['statt Einheit', 112],
    ['Joker', 112],
    ['warum?', 0],
  ]
  return (
    <View style={{ marginTop: 4 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 3 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: p.tief }}>Getauscht in diesem Schuljahr</Text>
        <Text style={{ marginLeft: 7, flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.leise }}>Die verdrängte Einheit wird zum Joker. Eintragen – so weiß das Team, was die Kinder schon erlebt haben.</Text>
      </View>
      <View style={{ flexDirection: 'row', borderBottomWidth: 0.9, borderBottomColor: p.mittel, paddingBottom: 2 }}>
        {sp.map(([t, w]) => (
          <Text key={t} style={{ ...(w ? { width: w } : { flex: 1 }), paddingLeft: 3, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.8, color: NEUTRAL.leise }}>{t}</Text>
        ))}
      </View>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} style={{ height: 17, borderBottomWidth: 0.6, borderBottomColor: NEUTRAL.rahmen, flexDirection: 'row' }}>
          {sp.slice(0, 3).map(([t, w]) => (
            <View key={t} style={{ width: w, borderRightWidth: 0.6, borderRightColor: NEUTRAL.haarlinie }} />
          ))}
        </View>
      ))}
    </View>
  )
}

// --- Seite: Register -------------------------------------------------------------------------------------------

function RegisterSeite({ c }: { c: Ctx }) {
  const p = c.p
  const alle = [...c.e.values()]
  const joker = new Set(PLAN.joker.map((x) => x.einheit))
  const proSpalte = Math.ceil(alle.length / 4)
  const spalten = [0, 1, 2, 3].map((i) => alle.slice(i * proSpalte, (i + 1) * proSpalte))
  const wo = (id: string) => {
    const w = wochenVon(id)
    if (w.length === 3 && ankerIds.has(id)) return `A B C · ${w[0].w}`
    if (w.length) return w.map((x) => `${x.j} ${x.w}`).join(', ')
    return joker.has(id) ? 'Joker' : '–'
  }
  return (
    <Page size="A4" orientation="landscape" style={seitenStil}>
      <Kopf reiter="Register" meta="Jahresplan Spielschule  ·  Alle Einheiten nach SP-Nummer: Jahr und Woche" p={p} />
      <Seitentitel titel="Register: alle Einheiten" unter={`Wo steht welche Einheit? A 7 = Jahr A, Woche 7 · A B C = jedes Jahr (Anker) · Joker: S. ${seite('joker')}`} p={p} />
      <View style={{ flexDirection: 'row' }}>
        {spalten.map((sp, si) => (
          <View key={si} style={{ flex: 1, marginRight: si < 3 ? 12 : 0 }}>
            {sp.map((e, i) => {
              const j = joker.has(e.id)
              return (
                <View key={e.id} style={{ flexDirection: 'row', alignItems: 'center', height: 13.4, paddingHorizontal: 3, backgroundColor: i % 2 ? '#FFFFFF' : NEUTRAL.flaeche, borderRadius: 2 }}>
                  <View style={{ width: 2.6, height: 9, borderRadius: 1, backgroundColor: themaFarbe(e.thema), marginRight: 3.5 }} />
                  <Text style={{ width: 30, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.8, color: NEUTRAL.text }}>{e.nr}</Text>
                  <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 6.8, color: j ? NEUTRAL.leise : NEUTRAL.text, maxLines: 1, textOverflow: 'ellipsis' }}>{ty(kartenTitel(e.titel, 30))}</Text>
                  <Text style={{ width: 42, textAlign: 'right', fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.6, color: j ? p.tief : NEUTRAL.text }}>{wo(e.id)}</Text>
                </View>
              )
            })}
          </View>
        ))}
      </View>
      <Fuss titel="Register: alle Einheiten" />
    </Page>
  )
}

// --- Deckblatt mit dem Rad ---------------------------------------------------------------------------------------

function Rad({ c, cx, cy }: { c: Ctx; cx: number; cy: number }) {
  // 36 Wochen + Ferien + Sommerlücke (oben)
  const ferien = FERIEN.filter((f) => f.id !== 'sommer')
  const luecke = 4
  const gesamt = WOCHEN + ferien.reduce((s, f) => s + f.dauer, 0) + luecke
  const grad = 360 / gesamt
  const posWoche = (w: number) => luecke / 2 + (w - 1) + ferien.filter((f) => f.nach < w).reduce((s, f) => s + f.dauer, 0)
  const ring = { A: [150, 182], B: [114, 146], C: [78, 110] } as Record<JahrId, [number, number]>
  const pt = (r: number, a: number) => {
    const rad = ((a - 90) * Math.PI) / 180
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
  }
  const sektor = (r0: number, r1: number, a0: number, a1: number) => {
    const [x0, y0] = pt(r1, a0)
    const [x1, y1] = pt(r1, a1)
    const [x2, y2] = pt(r0, a1)
    const [x3, y3] = pt(r0, a0)
    return `M${x0} ${y0} A${r1} ${r1} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 0 0 ${x3} ${y3} Z`
  }
  const monate = MONAT_DER_WOCHE.flatMap((m, i) => (i === 0 || MONAT_DER_WOCHE[i - 1] !== m ? [{ m, w: i + 1 }] : []))
  return (
    <G>
      {JAHRE.map((j) => {
        const [r0, r1] = ring[j]
        return PLAN.jahre[j].map((id, i) => {
          const e = einheit(c, id)
          const a0 = posWoche(i + 1) * grad + 0.5
          const a1 = a0 + grad - 1
          const [tx, ty2] = pt((r0 + r1) / 2, (a0 + a1) / 2)
          return (
            <G key={j + i}>
              <Path d={sektor(r0, r1, a0, a1)} fill={themaFarbe(e.thema)} />
              <SText x={tx} y={ty2 + 1.9} textAnchor="middle" fill="#FFFFFF" style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: j === 'C' ? 5 : 5.6 }}>
                {e.nr.replace('SP-', '')}
              </SText>
            </G>
          )
        })
      })}
      {/* Ferien als graue Bögen */}
      {ferien.map((f) => {
        const a0 = (posWoche(f.nach) + 1) * grad + 0.5
        const a1 = a0 + f.dauer * grad - 1
        return <Path key={f.id} d={sektor(78, 182, a0, a1)} fill={NEUTRAL.flaeche} />
      })}
      {/* Feste: Sterne außen */}
      {FESTE.filter((f) => f.art !== 'anlass').map((f) => {
        const a = (posWoche(f.woche) + 0.5) * grad
        const [x, y] = pt(190, a)
        return <Circle key={f.id} cx={x} cy={y} r={2.6} fill={f.art === 'beweglich' ? '#FFFFFF' : FEST_FARBE} stroke={FEST_FARBE} strokeWidth={1} />
      })}
      {/* Monate */}
      {monate.map(({ m, w }) => {
        const a = (posWoche(w) + 0.5) * grad
        const [x, y] = pt(204, a)
        return (
          <SText key={m} x={x} y={y + 2.4} textAnchor="middle" fill={NEUTRAL.leise} style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7 }}>
            {m}
          </SText>
        )
      })}
      {/* Jahre in der Sommerlücke */}
      {JAHRE.map((j) => {
        const [r0, r1] = ring[j]
        return (
          <SText key={j} x={cx} y={cy - (r0 + r1) / 2 + 3.6} textAnchor="middle" fill={NEUTRAL.text} style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10 }}>
            {j}
          </SText>
        )
      })}
      <SText x={cx} y={cy - 196} textAnchor="middle" fill={NEUTRAL.leise} style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 6.4, letterSpacing: 0.8 }}>
        SOMMER
      </SText>
      <SText x={cx} y={cy - 4} textAnchor="middle" fill={NEUTRAL.text} style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 12 }}>
        36 Wochen
      </SText>
      <SText x={cx} y={cy + 9} textAnchor="middle" fill={NEUTRAL.leise} style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.4 }}>
        je Jahr · Rentrée bis Juli
      </SText>
    </G>
  )
}

function Deckblatt({ c }: { c: Ctx }) {
  const p = c.p
  const weiss = (o: number) => `rgba(255,255,255,${o})`
  const links = 330
  const inhalt = SEITEN.filter((s) => s.id !== 'deckblatt' && !s.id.startsWith('karte-'))
  return (
    <Page size="A4" orientation="landscape" style={{ padding: 0, flexDirection: 'row' }}>
      <View style={{ width: links, height: H, backgroundColor: p.tief, paddingHorizontal: 34, paddingTop: 44 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.5, letterSpacing: 1.6, color: p.mittel }}>SPIELSCHULE · CYCLE 1</Text>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 44, lineHeight: 1.05, color: '#FFFFFF', marginTop: 10, letterSpacing: -1 }}>Jahresplan</Text>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 18, lineHeight: 1.2, color: '#FFFFFF', marginTop: 8, letterSpacing: -0.3 }}>Drei-Jahres-Rad mit Festkalender und Kompetenzlandkarte</Text>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.6, lineHeight: 1.5, color: weiss(0.9), marginTop: 12 }}>
          {`${c.e.size} Themenwochen auf drei Schuljahre verteilt: je Jahr 36 Wochen von der Rentrée bis Mitte Juli, ausgewogen nach Themen und Lernbereichen des Plan d’études, mit Luxemburger Festen an ihrem Termin. ${ANKER.length} Anker kommen jedes Jahr, ${PLAN.joker.length} Joker bleiben frei.`}
        </Text>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, letterSpacing: 1.2, color: p.mittel, marginTop: 22, marginBottom: 4 }}>INHALT</Text>
        {inhalt.map((s) => (
          <View key={s.id} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 2.6, borderBottomWidth: 0.5, borderBottomColor: mische(p.tief, 0.7) }}>
            <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8.6, color: '#FFFFFF' }}>{s.id.startsWith('jahr-') ? `${s.titel.split(':')[0]}: Wochen und Kompetenzlandkarte` : s.titel}</Text>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.6, color: '#FFFFFF' }}>{s.id.startsWith('jahr-') ? `${seite(s.id)}–${seite(s.id) + 1}` : String(seite(s.id))}</Text>
          </View>
        ))}
        <View style={{ position: 'absolute', left: 34, right: 34, bottom: 26 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.5, color: '#FFFFFF', letterSpacing: 0.4 }}>{U.marke.de}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.5, color: weiss(0.75), marginTop: 2 }}>{U.text.de}</Text>
        </View>
      </View>
      <View style={{ flex: 1, height: H }}>
        <Svg width={B - links} height={H}>
          <Rad c={c} cx={(B - links) / 2} cy={H / 2 + 6} />
        </Svg>
        <View style={{ position: 'absolute', left: 18, right: 18, bottom: 18, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {Object.keys(THEMA_FARBE).map((t) => (
            <View key={t} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 4, marginBottom: 3 }}>
              <View style={{ width: 6.5, height: 6.5, borderRadius: 1.5, backgroundColor: themaFarbe(t), marginRight: 2.5 }} />
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.2, color: NEUTRAL.leise }}>{ty(themaName(t))}</Text>
            </View>
          ))}
        </View>
        <Text style={{ position: 'absolute', left: 18, top: 18, fontFamily: SCHRIFT.jugend, fontSize: 6.8, color: NEUTRAL.leise, width: 160, lineHeight: 1.4 }}>
          Außen Jahr A, in der Mitte B, innen C. Zahlen = SP-Nummern, grau = Ferien, Punkte = Feste.
        </Text>
      </View>
    </Page>
  )
}

// --- Dokument --------------------------------------------------------------------------------------------------

/** Der ganze Jahresplan. `blaetter`: alle Blätter (andere Bereiche werden übergangen). */
export function JahresplanDokument({ blaetter }: { blaetter: JahresplanQuelle[] }) {
  const c = kontext(blaetter)
  return (
    <Document title="Jahresplan – Spielschule (Cycle 1)" author={U.name} creator={U.marke.de} producer={U.marke.de} language="de">
      <Deckblatt c={c} />
      <NutzenSeite c={c} />
      <KalenderSeite c={c} />
      <BlickSeite c={c} />
      {JAHRE.flatMap((j) => [<JahrSeite key={'j' + j} j={j} c={c} />, <KarteSeite key={'k' + j} j={j} c={c} />])}
      <JokerSeite c={c} />
      <RegisterSeite c={c} />
    </Document>
  )
}

/** Für das Prüfskript: Einheiten im Plan, die es nicht (mehr) gibt, und Einheiten, die weder im Rad noch Joker sind. */
export function jahresplanFehler(blaetter: JahresplanQuelle[]): string[] {
  const c = kontext(blaetter)
  const fehler: string[] = []
  const imPlan = new Set([...JAHRE.flatMap((j) => PLAN.jahre[j]), ...PLAN.joker.map((x) => x.einheit)])
  for (const id of imPlan) if (!c.e.has(id)) fehler.push(`Einheit im Plan unbekannt: ${id}`)
  for (const id of c.e.keys()) if (!imPlan.has(id)) fehler.push(`Einheit fehlt im Plan: ${id}`)
  for (const j of JAHRE) {
    if (PLAN.jahre[j].length !== WOCHEN) fehler.push(`Jahr ${j}: ${PLAN.jahre[j].length} statt ${WOCHEN} Wochen`)
    const doppelt = PLAN.jahre[j].filter((x, i, a) => a.indexOf(x) !== i)
    if (doppelt.length) fehler.push(`Jahr ${j}: doppelt ${doppelt.join(', ')}`)
  }
  return fehler
}

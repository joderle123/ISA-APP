// ---------------------------------------------------------------------------
// Forscherkartei Spielschule: alle Experimente der Woche in einem PDF – nach
// Jahreszeiten (Herbst, Winter, Frühling, Sommer) und danach nach den übrigen
// Themen geordnet. Deckblatt, Inhalt, je Experiment eine Seite (die Lehrerseite
// „Forschen“ mit Kartei-Kopf und fortlaufender Seitenzahl) und hinten ein
// Register nach Phänomenen. Inhalt und Register werden hier von Hand auf Seiten
// verteilt (feste Zeilenhöhen) – so stehen die Seitenzahlen schon beim Setzen fest.
// ---------------------------------------------------------------------------

import { Document, Page, View, Text, Svg, G, Rect, Line, Circle, Path } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { Blatt, Experiment, PhaenomenId, Sprache } from '../typen'
import { bereichById, THEMEN, themaLabel } from '../katalog'
import { NEUTRAL, palette, type Palette } from '../zeichnung'
import { experimentVon, KARTEI_THEMEN, PHAENOMENE, THEMA_BILD, forscherZeichnung } from '../forschen'
import { Zeichnen } from './Zeichnen'
import { ForschenSeite } from './Forschen'
import { SCHRIFT, SEITE, typo } from './stil'
import { urheberschaft } from '../../lib/urheber'

/** Die Forscherkartei gehört zur Spielschule: Michèle Wagner, ohne CDSE und ohne Logo (lib/urheber.ts). */
const U = urheberschaft('spielschule')

const SEITE_B = 595.28
/** Höhe für Inhalt und Register je Seite (A4 minus Ränder, Kopf und Seitentitel, etwas Luft). */
const LISTE_H = 841.89 - SEITE.oben - (SEITE.unten + 6) - 27 - 46 - 14

const TX = {
  de: {
    kartei: 'Forscherkartei',
    bereich: 'Spielschule · Cycle 1',
    unter: 'Experimente der Woche',
    satz: (n: number) => `${n} ${n === 1 ? 'Experiment' : 'Experimente'} zum Vermuten, Beobachten und Erklären – eins für jede Themenwoche, nach Jahreszeiten und Themen geordnet.`,
    themen: 'Die Themen im Jahr',
    anzahl: (n: number) => (n === 1 ? '1 Experiment' : `${n} Experimente`),
    seiten: (a: number, b: number) => (a === b ? `S. ${a}` : `S. ${a}–${b}`),
    soArbeiten: 'So arbeiten Sie mit der Kartei',
    hinweise: [
      'Jede Seite ist ein Experiment: Forscherfrage, Material, Schritte und Sicherheit – zum Kopieren oder Laminieren.',
      'Immer in drei Schritten: Vermuten – Beobachten – Erklären. Zuerst raten die Kinder, dann probieren sie, dann wird erklärt.',
      'Das Forscherblatt für die Kinder gibt es bei jeder Einheit in der Toolbox als eigene Seite. Hinten: Register nach Phänomenen.',
    ],
    inhalt: 'Inhalt',
    fortsetzung: 'Fortsetzung',
    register: 'Register nach Phänomenen',
    registerKurz: 'Register',
    anhang: 'Anhang',
    leer: 'Noch keine Einheit hat ein Experiment der Woche.',
    datei: 'Forscherkartei_Spielschule.pdf',
  },
  fr: {
    kartei: 'Fichier d’expériences',
    bereich: 'Préscolaire · Cycle 1',
    unter: 'L’expérience de la semaine',
    satz: (n: number) => `${n} ${n === 1 ? 'expérience' : 'expériences'} pour supposer, observer et expliquer – une par semaine à thème, classées par saisons et par thèmes.`,
    themen: 'Les thèmes de l’année',
    anzahl: (n: number) => (n === 1 ? '1 expérience' : `${n} expériences`),
    seiten: (a: number, b: number) => (a === b ? `p. ${a}` : `p. ${a}–${b}`),
    soArbeiten: 'Comment utiliser ce fichier',
    hinweise: [
      'Chaque page est une expérience : question, matériel, étapes et sécurité – à photocopier ou à plastifier.',
      'Toujours en trois temps : supposer – observer – expliquer. D’abord les enfants devinent, puis ils essaient, puis on explique.',
      'La fiche du chercheur pour les enfants se trouve dans chaque unité de la Toolbox, sur une page à part. À la fin : un index par phénomène.',
    ],
    inhalt: 'Sommaire',
    fortsetzung: 'suite',
    register: 'Index par phénomène',
    registerKurz: 'Index',
    anhang: 'Annexe',
    leer: 'Aucune unité n’a encore d’expérience de la semaine.',
    datei: 'Fichier-experiences_Prescolaire_FR.pdf',
  },
}

export function forscherkarteiDateiname(sprache: Sprache): string {
  return TX[sprache].datei
}

export interface KarteiQuelle {
  blatt: Blatt
  /** Blattnummer, z. B. 'SP-23' */
  nr?: string
}

export interface KarteiEintrag extends KarteiQuelle {
  exp: Experiment
  thema: string
}

/** Reihenfolge der Themen: Jahreszeiten zuerst, dann die übrigen Spielschul-Themen wie im Katalog. */
function themenReihe(): string[] {
  return [...KARTEI_THEMEN, ...THEMEN.filter((t) => t.bereich === 'spielschule' && !KARTEI_THEMEN.includes(t.id)).map((t) => t.id)]
}

/** Alle Experimente der Sprache, nach Thema (Kalender) und innerhalb des Themas in der Reihenfolge der Einheiten. */
export function karteiEintraege(liste: KarteiQuelle[], sprache: Sprache): KarteiEintrag[] {
  const reihe = themenReihe()
  const rang = (t: string) => (reihe.includes(t) ? reihe.indexOf(t) : reihe.length)
  const pos = new Map(liste.map((q, i) => [q.blatt, i]))
  return liste
    .flatMap((q) => {
      const exp = experimentVon(q.blatt, sprache)
      return exp ? [{ ...q, exp, thema: q.blatt.thema }] : []
    })
    .sort((a, b) => rang(a.thema) - rang(b.thema) || (pos.get(a.blatt) ?? 0) - (pos.get(b.blatt) ?? 0))
}

// --- Seitenaufteilung ---------------------------------------------------------------------------

const H = { gruppe: 34, zeile: 17, rKopf: 24, rZeile: 14.5 }

type InhaltTeil = { art: 'thema'; thema: string } | { art: 'zeile'; e: number } | { art: 'register' }
type RegisterTeil = { art: 'kopf'; id: PhaenomenId } | { art: 'zeile'; e: number }

export interface KarteiAufbau {
  eintraege: KarteiEintrag[]
  /** Seiten des Inhalts, je eine Liste von Teilen */
  inhalt: InhaltTeil[][]
  /** Registerseiten mit je zwei Spalten */
  register: RegisterTeil[][][]
  /** Seite des ersten Experiments */
  start: number
  /** Seite der ersten Registerseite */
  registerStart: number
  gesamt: number
}

export function karteiAufbau(eintraege: KarteiEintrag[], sprache: Sprache): KarteiAufbau {
  // Register: Phänomene alphabetisch (in der Sprache), je Phänomen die Experimente; zwei Spalten je Seite
  const register: RegisterTeil[][][] = []
  const gruppen = PHAENOMENE.map((ph) => ({ ph, e: eintraege.flatMap((x, i) => (x.exp.phaenomene.includes(ph.id) ? [i] : [])) }))
    .filter((g) => g.e.length)
    .sort((a, b) => a.ph[sprache].localeCompare(b.ph[sprache], sprache))
  let spalte: RegisterTeil[] = []
  let platz = LISTE_H
  const neueSpalte = () => {
    const seite = register[register.length - 1]
    if (!seite || seite.length === 2) register.push([spalte])
    else seite.push(spalte)
    spalte = []
    platz = LISTE_H
  }
  register.push([])
  for (const g of gruppen) {
    if (platz < H.rKopf + H.rZeile) neueSpalte()
    spalte.push({ art: 'kopf', id: g.ph.id })
    platz -= H.rKopf
    for (const e of g.e) {
      if (platz < H.rZeile) {
        neueSpalte()
        spalte.push({ art: 'kopf', id: g.ph.id })
        platz -= H.rKopf
      }
      spalte.push({ art: 'zeile', e })
      platz -= H.rZeile
    }
  }
  if (spalte.length) neueSpalte()
  // Inhalt: Themen-Kopf bleibt mit mindestens einer Zeile zusammen; geht ein Thema weiter, kommt sein Kopf wieder.
  const inhalt: InhaltTeil[][] = [[]]
  let frei = LISTE_H
  const neueSeite = () => {
    inhalt.push([])
    frei = LISTE_H
  }
  let thema = ''
  eintraege.forEach((e, i) => {
    if (e.thema !== thema) {
      if (frei < H.gruppe + H.zeile) neueSeite()
      inhalt[inhalt.length - 1].push({ art: 'thema', thema: e.thema })
      frei -= H.gruppe
      thema = e.thema
    } else if (frei < H.zeile) {
      neueSeite()
      inhalt[inhalt.length - 1].push({ art: 'thema', thema: e.thema })
      frei -= H.gruppe
    }
    inhalt[inhalt.length - 1].push({ art: 'zeile', e: i })
    frei -= H.zeile
  })
  if (gruppen.length) {
    if (frei < H.gruppe + H.zeile) neueSeite()
    inhalt[inhalt.length - 1].push({ art: 'register' })
  }

  const registerSeiten = register.filter((s) => s.length)
  const start = 2 + inhalt.length
  const registerStart = start + eintraege.length
  return { eintraege, inhalt, register: registerSeiten, start, registerStart, gesamt: registerStart - 1 + registerSeiten.length }
}

// --- Kopf und Fuß ----------------------------------------------------------------------------------

function KarteiKopf({ reiter, meta, p }: { reiter: string; meta: string; p: Palette }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
      <View style={{ backgroundColor: p.tief, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{reiter.toUpperCase()}</Text>
      </View>
      <Text style={{ marginLeft: 8, flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3, maxLines: 1, textOverflow: 'ellipsis' }}>{meta}</Text>
    </View>
  )
}

function KarteiFuss({ titel, sprache }: { titel: string; sprache: Sprache }) {
  return (
    <View fixed style={{ position: 'absolute', left: SEITE.rand, right: SEITE.rand, bottom: 16, borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 4.5, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: NEUTRAL.marke, letterSpacing: 0.4 }}>{`${TX[sprache].kartei} · ${U.marke[sprache]}`}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise, marginLeft: 6, flex: 1, maxLines: 1, textOverflow: 'ellipsis' }}>{typo(titel, sprache)}</Text>
          <Text style={{ width: 46, marginLeft: 8, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.5, color: NEUTRAL.text, textAlign: 'right' }} render={({ pageNumber }) => String(pageNumber)} />
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6, color: NEUTRAL.sehrLeise, marginTop: 2.5, letterSpacing: 0.15 }}>{U.text[sprache]}</Text>
      </View>
    </View>
  )
}

const seitenStil = { paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }

function Plakette({ id, d, p, ton }: { id: string; d: number; p: Palette; ton?: string }) {
  const icon = id.startsWith('icon:') || id.startsWith('forschen:')
  const g = icon ? d * 0.54 : d * 0.8
  const z = forscherZeichnung(id)
  return (
    <View style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: ton ?? p.zart, alignItems: 'center', justifyContent: 'center' }}>
      <Zeichnen z={icon ? { ...z, w: Math.max(0.9, Math.min(1.9, (2.1 * 24) / g)) } : z} p={p} breite={g} hoehe={g} />
    </View>
  )
}

function Seitentitel({ titel, p, zusatz }: { titel: string; p: Palette; zusatz?: string }) {
  return (
    <View style={{ height: 46 }}>
      <View style={{ width: 26, height: 3.5, borderRadius: 2, backgroundColor: p.tief, marginBottom: 7 }} />
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 22, color: NEUTRAL.text, letterSpacing: -0.3 }}>{titel}</Text>
        {zusatz ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 9.5, color: NEUTRAL.leise, marginLeft: 8, marginBottom: 3 }}>{zusatz}</Text> : null}
      </View>
    </View>
  )
}

// --- Deckblatt -------------------------------------------------------------------------------------

/** Der Wattepad-Regenbogen als Zeichnung: Tablett mit sieben Pads, Pipette mit Tropfen, Lupe. */
function Deko({ p }: { p: Palette }) {
  const pads = ['#E05A4E', '#EE9A4D', '#F2C94C', '#7DB46C', '#4F86C6', '#9B7FC8', '#E05A4E']
  const y = 318
  const x0 = 352
  const r = 15.5
  const abstand = 32
  return (
    <Svg width={SEITE_B} height={470} style={{ position: 'absolute', left: 0, top: 0 }}>
      {Array.from({ length: 28 }, (_, i) => (
        <Line key={'x' + i} x1={i * 22} y1={0} x2={i * 22} y2={470} stroke="#FFFFFF" strokeWidth={0.5} strokeOpacity={0.07} />
      ))}
      {Array.from({ length: 22 }, (_, i) => (
        <Line key={'y' + i} x1={0} y1={i * 22} x2={SEITE_B} y2={i * 22} stroke="#FFFFFF" strokeWidth={0.5} strokeOpacity={0.07} />
      ))}
      {/* Tablett */}
      <Rect x={x0 - 26} y={y - 30} width={abstand * 6 + 52} height={60} rx={12} fill="#FFFFFF" fillOpacity={0.12} stroke="#FFFFFF" strokeWidth={1.6} />
      {pads.map((f, i) => {
        const cx = x0 + i * abstand
        const gemischt = i % 2 === 1
        return (
          <G key={'p' + i}>
            <Circle cx={cx} cy={y} r={r} fill="#FFFFFF" />
            <Circle cx={cx} cy={y} r={gemischt ? r * 0.72 : r * 0.86} fill={f} fillOpacity={gemischt ? 0.78 : 1} />
            <Circle cx={cx} cy={y} r={r} fill="none" stroke="#FFFFFF" strokeWidth={1.4} />
          </G>
        )
      })}
      {/* Pipette über dem vierten Pad */}
      <Path d={`M${x0 + 3 * abstand - 7} 200 L${x0 + 3 * abstand - 7} 168 A7 7 0 0 1 ${x0 + 3 * abstand + 7} 168 L${x0 + 3 * abstand + 7} 200 Z`} fill={p.mittel} stroke="#FFFFFF" strokeWidth={1.8} />
      <Line x1={x0 + 3 * abstand - 11} y1={200} x2={x0 + 3 * abstand + 11} y2={200} stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
      <Path d={`M${x0 + 3 * abstand - 5} 200 L${x0 + 3 * abstand - 5} 248 L${x0 + 3 * abstand} 260 L${x0 + 3 * abstand + 5} 248 L${x0 + 3 * abstand + 5} 200`} fill="#FFFFFF" fillOpacity={0.14} stroke="#FFFFFF" strokeWidth={1.8} strokeLinejoin="round" />
      <Line x1={x0 + 3 * abstand} y1={222} x2={x0 + 3 * abstand} y2={246} stroke="#9FD0F0" strokeWidth={3} strokeLinecap="round" />
      <Path d={`M${x0 + 3 * abstand} 268 Q${x0 + 3 * abstand - 4.5} 276 ${x0 + 3 * abstand} 279 Q${x0 + 3 * abstand + 4.5} 276 ${x0 + 3 * abstand} 268 Z`} fill="#9FD0F0" />
      {/* Lupe */}
      <Circle cx={505} cy={128} r={38} fill="#FFFFFF" fillOpacity={0.1} stroke="#FFFFFF" strokeWidth={2.4} />
      <Line x1={532} y1={155} x2={560} y2={183} stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" />
      <Path d="M484 116 Q492 100 510 100" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeOpacity={0.7} />
      {/* Tropfen */}
      {[
        [402, 120, 1],
        [430, 160, 0.7],
        [380, 180, 0.55],
      ].map(([x, yy, s], i) => (
        <Path key={'t' + i} d={`M${x} ${yy} q${-9 * s} ${13 * s} 0 ${19 * s} q${9 * s} ${-6 * s} 0 ${-19 * s} z`} fill="#FFFFFF" fillOpacity={0.55} />
      ))}
    </Svg>
  )
}

function Deckblatt({ aufbau, sprache, p }: { aufbau: KarteiAufbau; sprache: Sprache; p: Palette }) {
  const t = TX[sprache]
  const e = aufbau.eintraege
  const themen = themenReihe().filter((th) => e.some((x) => x.thema === th))
  const weiss = (o: number) => `rgba(255,255,255,${o})`
  return (
    <Page size="A4" style={{ padding: 0 }}>
      {/* ab 16 Themen (6 Reihen) braucht die Themenliste mehr Platz */}
      <View style={{ height: themen.length > 15 ? 372 : 470, backgroundColor: p.tief }}>
        <Deko p={p} />
        <View style={{ position: 'absolute', left: 48, top: 56, width: 290 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.5, letterSpacing: 1.6, color: p.mittel }}>{t.bereich.toUpperCase()}</Text>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: sprache === 'fr' ? 38 : 44, lineHeight: 1.08, color: '#FFFFFF', marginTop: 10, letterSpacing: -1 }}>{typo(t.kartei, sprache)}</Text>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 21, lineHeight: 1.18, color: '#FFFFFF', marginTop: 10, letterSpacing: -0.3 }}>{typo(t.unter, sprache)}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 10.5, lineHeight: 1.5, color: weiss(0.88), marginTop: 14 }}>{typo(t.satz(e.length), sprache)}</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 48, paddingTop: 22 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, letterSpacing: 1.2, color: NEUTRAL.leise }}>{typo(t.themen, sprache).toUpperCase()}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
          {themen.length ? (
            themen.map((th) => {
              const seiten = e.flatMap((x, i) => (x.thema === th ? [aufbau.start + i] : []))
              return (
                <View key={th} style={{ width: '33.3%', flexDirection: 'row', alignItems: 'center', marginBottom: 9, paddingRight: 8 }}>
                  <Plakette id={THEMA_BILD[th] ?? 'icon:search'} d={28} p={p} />
                  <View style={{ marginLeft: 8, flex: 1 }}>
                    <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, lineHeight: 1.2, color: NEUTRAL.text }}>{typo(themaLabel('spielschule', th, sprache), sprache)}</Text>
                    <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.6, color: NEUTRAL.leise, marginTop: 1 }}>{`${t.anzahl(seiten.length)} · ${t.seiten(seiten[0], seiten[seiten.length - 1])}`}</Text>
                  </View>
                </View>
              )
            })
          ) : (
            <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 10, color: NEUTRAL.leise }}>{t.leer}</Text>
          )}
        </View>
        <View wrap={false} style={{ marginTop: 6, flexDirection: 'row', backgroundColor: p.zart, borderRadius: 9, padding: 11, paddingLeft: 12 }}>
          <View style={{ width: 3, borderRadius: 2, backgroundColor: p.tief, marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: p.tief, marginBottom: 3 }}>{t.soArbeiten}</Text>
            {t.hinweise.map((x, i) => (
              <View key={i} style={{ flexDirection: 'row', marginTop: 2 }}>
                <View style={{ width: 4.5, height: 4.5, borderRadius: 2.25, backgroundColor: p.tief, marginTop: 5, marginRight: 7 }} />
                <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 9, lineHeight: 1.45, color: NEUTRAL.text }}>{typo(x, sprache)}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={{ position: 'absolute', left: 48, right: 48, bottom: 26, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 6 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.5, color: NEUTRAL.marke, letterSpacing: 0.4 }}>{U.marke[sprache]}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.5, color: NEUTRAL.sehrLeise, marginTop: 2 }}>{U.text[sprache]}</Text>
        </View>
      </View>
    </Page>
  )
}

// --- Inhalt und Register -------------------------------------------------------------------------

function Gruppenkopf({ bild, titel, p, zusatz }: { bild: string; titel: string; p: Palette; zusatz?: string }) {
  return (
    <View style={{ height: H.gruppe, justifyContent: 'flex-end' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 25, borderBottomWidth: 0.8, borderBottomColor: p.mittel, marginBottom: 2 }}>
        <Plakette id={bild} d={20} p={p} />
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 11, color: p.tief, marginLeft: 7 }}>{titel}</Text>
        {zusatz ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8, color: NEUTRAL.leise, marginLeft: 6 }}>{zusatz}</Text> : null}
      </View>
    </View>
  )
}

function InhaltSeite({ teile, aufbau, sprache, p, erste }: { teile: InhaltTeil[]; aufbau: KarteiAufbau; sprache: Sprache; p: Palette; erste: boolean }) {
  const t = TX[sprache]
  const ty = (x: string) => typo(x, sprache)
  let z = 0
  const zeile = (titel: string, unter: string, seite: number, key: string) => (
    <View key={key} style={{ height: H.zeile, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, backgroundColor: z++ % 2 ? '#FFFFFF' : NEUTRAL.flaeche, borderRadius: 3 }}>
      <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 9, color: NEUTRAL.text, maxLines: 1, textOverflow: 'ellipsis' }}>{ty(titel)}</Text>
      <Text style={{ width: 190, marginLeft: 10, fontFamily: SCHRIFT.jugend, fontSize: 7.8, color: NEUTRAL.leise, maxLines: 1, textOverflow: 'ellipsis' }}>{unter}</Text>
      <Text style={{ width: 26, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: NEUTRAL.text, textAlign: 'right' }}>{String(seite)}</Text>
    </View>
  )
  return (
    <Page size="A4" style={seitenStil}>
      <KarteiKopf reiter={t.kartei} meta={`${t.bereich}  ·  ${t.unter}`} p={p} />
      <Seitentitel titel={t.inhalt} p={p} zusatz={erste ? undefined : t.fortsetzung} />
      {teile.map((x, i) => {
        if (x.art === 'thema') {
          z = 0
          return <Gruppenkopf key={i} bild={THEMA_BILD[x.thema] ?? 'icon:search'} titel={ty(themaLabel('spielschule', x.thema, sprache))} p={p} />
        }
        if (x.art === 'register') {
          z = 0
          return (
            <View key={i}>
              <Gruppenkopf bild="icon:list-check" titel={t.anhang} p={p} />
              {zeile(t.register, '', aufbau.registerStart, 'r')}
            </View>
          )
        }
        const e = aufbau.eintraege[x.e]
        const unter = [e.nr, blattTitel(e.blatt, sprache)].filter(Boolean).join(' · ')
        return zeile(e.exp.titel, ty(unter), aufbau.start + x.e, String(i))
      })}
      {!aufbau.eintraege.length ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 10, color: NEUTRAL.leise, marginTop: 12 }}>{t.leer}</Text> : null}
      <KarteiFuss titel={erste ? t.inhalt : `${t.inhalt} (${t.fortsetzung})`} sprache={sprache} />
    </Page>
  )
}

function blattTitel(b: Blatt, sprache: Sprache): string {
  return ((sprache === 'fr' && b.fr) || b.de).titel
}

function RegisterSeite({ spalten, aufbau, sprache, p, erste }: { spalten: RegisterTeil[][]; aufbau: KarteiAufbau; sprache: Sprache; p: Palette; erste: boolean }) {
  const t = TX[sprache]
  const ty = (x: string) => typo(x, sprache)
  const ph = new Map(PHAENOMENE.map((x) => [x.id, x]))
  return (
    <Page size="A4" style={seitenStil}>
      <KarteiKopf reiter={t.registerKurz} meta={`${t.kartei}  ·  ${t.bereich}`} p={p} />
      <Seitentitel titel={t.register} p={p} zusatz={erste ? undefined : t.fortsetzung} />
      <View style={{ flexDirection: 'row' }}>
        {[0, 1].map((s) => (
          <View key={s} style={{ flex: 1, marginRight: s ? 0 : 20 }}>
            {(spalten[s] ?? []).map((x, i) =>
              x.art === 'kopf' ? (
                <View key={i} style={{ height: H.rKopf, justifyContent: 'flex-end' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.8, borderBottomColor: p.mittel, paddingBottom: 2, marginBottom: 1.5 }}>
                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: p.tief, marginRight: 6 }} />
                    <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.4, color: p.tief, flex: 1, maxLines: 1, textOverflow: 'ellipsis' }}>{ty(ph.get(x.id)?.[sprache] ?? x.id)}</Text>
                  </View>
                </View>
              ) : (
                <View key={i} style={{ height: H.rZeile, flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
                  <Text style={{ flex: 1, fontFamily: SCHRIFT.jugend, fontSize: 8.4, color: NEUTRAL.text, maxLines: 1, textOverflow: 'ellipsis' }}>{ty(aufbau.eintraege[x.e].exp.titel)}</Text>
                  <Text style={{ width: 22, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: NEUTRAL.text, textAlign: 'right' }}>{String(aufbau.start + x.e)}</Text>
                </View>
              ),
            )}
          </View>
        ))}
      </View>
      <KarteiFuss titel={t.register} sprache={sprache} />
    </Page>
  )
}

// --- Dokument --------------------------------------------------------------------------------------------

/** Die ganze Forscherkartei einer Sprache. `blaetter`: alle Blätter (andere Bereiche und Einheiten ohne Experiment werden übergangen). */
export function ForscherkarteiDokument({ blaetter, sprache = 'de' }: { blaetter: KarteiQuelle[]; sprache?: Sprache }) {
  const t = TX[sprache]
  const p = palette(bereichById.get('spielschule')!.farben)
  const aufbau = karteiAufbau(karteiEintraege(blaetter, sprache), sprache)
  return (
    <Document title={`${t.kartei} – ${t.bereich}`} author={U.name} creator={U.marke.de} producer={U.marke.de} language={sprache}>
      <Deckblatt aufbau={aufbau} sprache={sprache} p={p} />
      {aufbau.inhalt.map((teile, i) => (
        <InhaltSeite key={'i' + i} teile={teile} aufbau={aufbau} sprache={sprache} p={p} erste={i === 0} />
      ))}
      {aufbau.eintraege.map((e) => {
        const thema = themaLabel('spielschule', e.thema, sprache)
        const titel = blattTitel(e.blatt, sprache)
        const kopf: ReactNode = <KarteiKopf reiter={thema} meta={[t.kartei, e.nr, titel].filter(Boolean).join('  ·  ')} p={p} />
        return (
          <ForschenSeite
            key={e.blatt.id}
            exp={e.exp}
            sprache={sprache}
            p={p}
            kopf={kopf}
            fuss={<KarteiFuss titel={e.exp.titel} sprache={sprache} />}
            titel={e.exp.titel}
            unter={[e.nr, titel].filter(Boolean).join(' · ')}
          />
        )
      })}
      {aufbau.register.map((spalten, i) => (
        <RegisterSeite key={'r' + i} spalten={spalten} aufbau={aufbau} sprache={sprache} p={p} erste={i === 0} />
      ))}
    </Document>
  )
}

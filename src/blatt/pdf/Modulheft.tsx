// ---------------------------------------------------------------------------
// Modulheft: ein ganzes Modul (z. B. Mathe Modul 2) als ein Heft – Deckblatt,
// Inhalt, alle Lektionen mit fortlaufenden Seitenzahlen, Wortschatz
// Deutsch – Französisch und „Mein Lernstand“. Als Lösungsheft: Deckblatt,
// Inhalt und die Seiten für die Lehrperson (Ziel, Ablauf, Lösungen).
// Die Lektionen sind die Arbeitsblätter selbst (BlattSeiten im Heft-Modus).
// ---------------------------------------------------------------------------

import { Document, Page, View, Text, Svg, Rect, Line, Path, Image } from '@react-pdf/renderer'
import type { ReactNode } from 'react'
import type { Blatt, Sprache } from '../typen'
import type { Modul } from '../module'
import { bereichById } from '../katalog'
import { NEUTRAL, palette, type Palette } from '../zeichnung'
import { Plakette, type Ctx } from './bausteine'
import { BlattSeiten, blattInhalt, type HeftAngaben } from './BlattDokument'
import { MASSE, SCHRIFT, SEITE, typo } from './stil'
import { URHEBER, URHEBER_NAME } from '../../lib/urheber'
import { CDSE_LOGO, CDSE_LOGO_SEITEN } from '../../lib/cdse-logo'

const SEITE_B = 595.28
const WARM = '#F2C14E'

const TX = {
  de: {
    modul: 'Modul',
    lektion: 'Lektion',
    lektionen: 'Lektionen',
    inhalt: 'Inhalt',
    anhang: 'Anhang',
    wortschatz: 'Wortschatz',
    wortschatzUnter: 'Die Fachwörter auf Deutsch und auf Französisch.',
    sprachen: ['Deutsch', 'Französisch'],
    lernstand: 'Mein Lernstand',
    lernstandUnter: 'Kreuze nach jeder Lektion an, wie sicher du bist. So siehst du, was du schon kannst.',
    optionen: ['sicher', 'geht so', 'noch nicht'],
    ziel: 'Mein Ziel:',
    zielSpalte: 'Mein Ziel',
    name: 'Name',
    klasse: 'Klasse',
    schuljahr: 'Schuljahr',
    aufEinenBlick: 'Das lernst du in diesem Heft',
    soArbeitest: 'So arbeitest du mit dem Heft',
    arbeitsweise: [
      'Jede Lektion hat zwei Seiten: zuerst die Regel mit einem Beispiel, dann die Aufgaben.',
      'Die Punkte an der Aufgabennummer zeigen die Stufe: § Basis, §§ Kern, §§§ Plus. Fang mit der Basis an.',
      'Am Ende jeder Lektion steht ein Kurz-Check. Hinten im Heft: der Wortschatz Deutsch – Französisch und dein Lernstand.',
    ],
    gutKann: 'Das kann ich schon gut:',
    hilfe: 'Hier brauche ich noch Hilfe:',
    loesungen: 'Lösungen und Hinweise',
    loesungenUnter: 'Für die Lehrperson: Ziel, Ablauf, fachlicher Hintergrund und Lösungen zu allen 12 Lektionen.',
    lehrerHinweise: [
      'Das Heft für die Jugendlichen gibt es als eigene Datei. Jede Lektion umfasst dort zwei Seiten.',
      'Die Punkte an den Aufgaben zeigen die Stufe: 1 = Basis, 2 = Kern, 3 = Plus. Aufgabe 6 ist jeweils für alle, die fertig sind.',
      'Lektionen 10 und 12 enthalten Messaufgaben: das Heft in Originalgröße (100 %) drucken, nicht „an Seite anpassen“.',
    ],
    hinweise: 'Hinweise',
  },
  fr: {
    modul: 'Module',
    lektion: 'Leçon',
    lektionen: 'Leçons',
    inhalt: 'Sommaire',
    anhang: 'Annexe',
    wortschatz: 'Vocabulaire',
    wortschatzUnter: 'Les mots techniques en français et en allemand.',
    sprachen: ['Français', 'Allemand'],
    lernstand: 'Où j’en suis',
    lernstandUnter: 'Après chaque leçon, coche à quel point tu es sûr·e de toi. Tu vois ainsi ce que tu sais déjà faire.',
    optionen: ['sûr·e', 'à peu près', 'pas encore'],
    ziel: 'Mon objectif :',
    zielSpalte: 'Mon objectif',
    name: 'Nom',
    klasse: 'Classe',
    schuljahr: 'Année scolaire',
    aufEinenBlick: 'Ce que tu apprends dans ce cahier',
    soArbeitest: 'Comment utiliser ce cahier',
    arbeitsweise: [
      'Chaque leçon a deux pages : d’abord la règle avec un exemple, puis les exercices.',
      'Les points à côté du numéro indiquent le niveau : § base, §§ standard, §§§ approfondissement. Commence par la base.',
      'Chaque leçon se termine par un petit bilan. À la fin du cahier : le vocabulaire français – allemand et ton bilan.',
    ],
    gutKann: 'Ce que je sais déjà bien faire :',
    hilfe: 'Là où j’ai encore besoin d’aide :',
    loesungen: 'Solutions et conseils',
    loesungenUnter: 'Pour l’enseignant·e : objectif, déroulement, repères théoriques et solutions des 12 leçons.',
    lehrerHinweise: [
      'Le cahier pour les jeunes existe sous forme de fichier séparé. Chaque leçon y occupe deux pages.',
      'Les points à côté des exercices indiquent le niveau : 1 = base, 2 = standard, 3 = approfondissement. L’exercice 6 est pour ceux qui ont fini.',
      'Les leçons 10 et 12 contiennent des mesures : imprimer le cahier en taille réelle (100 %), pas « ajuster à la page ».',
    ],
    hinweise: 'Conseils',
  },
} satisfies Record<Sprache, Record<string, string | string[]>>

type Tx = (typeof TX)['de']

/** Lektionen des Moduls in Reihenfolge, mit Nummer und Thema */
export function modulLektionen(modul: Modul): { id: string; nr: number; thema: number }[] {
  const out: { id: string; nr: number; thema: number }[] = []
  modul.themen.forEach((th, ti) => th.lektionen.forEach((id) => out.push({ id, nr: out.length + 1, thema: ti })))
  return out
}

/** Seitenzahlen im Heft: Deckblatt 1, Inhalt 2, dann je Lektion zwei Seiten (Lösungsheft: eine), danach der Anhang. */
export function heftSeiten(modul: Modul, loesungen: boolean) {
  const lektionen = modulLektionen(modul)
  const je = loesungen ? 1 : 2
  const start = new Map(lektionen.map((l, i) => [l.id, 3 + i * je]))
  const nachLektionen = 3 + lektionen.length * je
  return { start, wortschatz: nachLektionen, lernstand: nachLektionen + 1, gesamt: loesungen ? nachLektionen - 1 : nachLektionen + 1 }
}

// --- Kopf und Fuß der Heftseiten (wie auf den Blättern) ------------------------------

function HeftKopf({ reiter, meta, p }: { reiter: string; meta: string; p: Palette }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
      <View style={{ backgroundColor: p.tief, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2.2 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, letterSpacing: 0.9, color: '#FFFFFF' }}>{reiter.toUpperCase()}</Text>
      </View>
      <Text style={{ marginLeft: 8, fontFamily: SCHRIFT.jugend, fontSize: 7.4, color: NEUTRAL.leise, letterSpacing: 0.3 }}>{meta}</Text>
    </View>
  )
}

function HeftFuss({ fuss, titel, sprache, seitenzahl = true }: { fuss: string; titel: string; sprache: Sprache; seitenzahl?: boolean }) {
  const h = 19
  return (
    <View fixed style={{ position: 'absolute', left: SEITE.rand, right: SEITE.rand, bottom: 16, borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 4.5, flexDirection: 'row', alignItems: 'center' }}>
      <Image src={CDSE_LOGO} style={{ width: h * CDSE_LOGO_SEITEN, height: h, marginRight: 8 }} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7, color: NEUTRAL.marke, letterSpacing: 0.4 }}>{fuss}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7, color: NEUTRAL.sehrLeise, marginLeft: 6, flex: 1, maxLines: 1, textOverflow: 'ellipsis' }}>{titel}</Text>
          {seitenzahl ? <Text style={{ width: 46, marginLeft: 8, fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.5, color: NEUTRAL.text, textAlign: 'right' }} render={({ pageNumber }) => String(pageNumber)} /> : null}
        </View>
        <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6, color: NEUTRAL.sehrLeise, marginTop: 2.5, letterSpacing: 0.15 }}>{URHEBER[sprache]}</Text>
      </View>
    </View>
  )
}

const seitenStil = { paddingHorizontal: SEITE.rand, paddingTop: SEITE.oben, paddingBottom: SEITE.unten + 6 }

function ctxFuer(p: Palette, sprache: Sprache): Ctx {
  return { m: MASSE.jugend, p, sprache, nummern: new Map(), breite: SEITE_B - SEITE.rand * 2 }
}

/** Stufenpunkte wie an den Aufgaben (für die Erklärung im Inhalt) */
function Punkte({ n, p }: { n: number; p: Palette }) {
  const d = 5
  return (
    <View style={{ flexDirection: 'row', marginHorizontal: 2, marginBottom: 1 }}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={{ width: d, height: d, borderRadius: d / 2, marginRight: 1.6, backgroundColor: i <= n ? p.tief : '#FFFFFF', borderWidth: 0.8, borderColor: i <= n ? p.tief : NEUTRAL.sehrLeise }} />
      ))}
    </View>
  )
}

/** Text mit Platzhaltern § (Stufenpunkte) als Reihe aus Wörtern */
function MitPunkten({ text, p, groesse }: { text: string; p: Palette; groesse: number }) {
  const woerter = text.split(/\s+/).filter(Boolean)
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
      {woerter.map((w, i) =>
        /^§+[.,:;]?$/.test(w) ? (
          <View key={i} style={{ marginRight: groesse * 0.28 }}>
            <Punkte n={w.replace(/[^§]/g, '').length} p={p} />
          </View>
        ) : (
          <Text key={i} style={{ fontFamily: SCHRIFT.jugend, fontSize: groesse, lineHeight: 1.5, color: NEUTRAL.text, marginRight: groesse * 0.28 }}>
            {w}
          </Text>
        ),
      )}
    </View>
  )
}

/** „So arbeitest du mit dem Heft“ bzw. Hinweise für die Lehrperson (auf dem Deckblatt) */
function Arbeitsweise({ sprache, p, loesungen }: { sprache: Sprache; p: Palette; loesungen: boolean }) {
  const t: Tx = TX[sprache]
  const ty = (s: string) => typo(s, sprache)
  return (
    <View wrap={false} style={{ marginTop: 6, flexDirection: 'row', backgroundColor: p.zart, borderRadius: 9, padding: 11, paddingLeft: 12 }}>
      <View style={{ width: 3, borderRadius: 2, backgroundColor: p.tief, marginRight: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, color: p.tief, marginBottom: 3 }}>{loesungen ? t.hinweise : t.soArbeitest}</Text>
        {(loesungen ? t.lehrerHinweise : t.arbeitsweise).map((x, i) => (
          <View key={i} style={{ flexDirection: 'row', marginTop: 2 }}>
            <View style={{ width: 4.5, height: 4.5, borderRadius: 2.25, backgroundColor: p.tief, marginTop: 5.5, marginRight: 7 }} />
            <View style={{ flex: 1 }}>
              <MitPunkten text={ty(x)} p={p} groesse={9.4} />
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

// --- Deckblatt ---------------------------------------------------------------------------

function Deko({ p }: { p: Palette }) {
  // Hunderterfeld mit 0,45, Pizza mit drei Vierteln, Winkel und Strecke [AB] – in Weiß auf der Bandfarbe
  const hx = 372
  const hy = 150
  const k = 15
  const pie = { x: 402, y: 388, r: 50 }
  const sektor = (i: number) => {
    const a0 = -Math.PI / 2 + (i * Math.PI) / 2
    const a1 = a0 + Math.PI / 2
    return `M${pie.x} ${pie.y} L${pie.x + pie.r * Math.cos(a0)} ${pie.y + pie.r * Math.sin(a0)} A${pie.r} ${pie.r} 0 0 1 ${pie.x + pie.r * Math.cos(a1)} ${pie.y + pie.r * Math.sin(a1)} Z`
  }
  const vx = 474
  const vy = 440
  const w = (50 * Math.PI) / 180
  return (
    <Svg width={SEITE_B} height={470} style={{ position: 'absolute', left: 0, top: 0 }}>
      {Array.from({ length: 28 }, (_, i) => (
        <Line key={'x' + i} x1={i * 22} y1={0} x2={i * 22} y2={470} stroke="#FFFFFF" strokeWidth={0.5} strokeOpacity={0.07} />
      ))}
      {Array.from({ length: 22 }, (_, i) => (
        <Line key={'y' + i} x1={0} y1={i * 22} x2={SEITE_B} y2={i * 22} stroke="#FFFFFF" strokeWidth={0.5} strokeOpacity={0.07} />
      ))}
      <Rect x={hx} y={hy} width={10 * k} height={10 * k} fill="#FFFFFF" fillOpacity={0.08} />
      <Rect x={hx} y={hy} width={4 * k} height={10 * k} fill={p.mittel} />
      <Rect x={hx + 4 * k} y={hy} width={k} height={5 * k} fill={p.mittel} />
      {Array.from({ length: 9 }, (_, i) => (
        <Line key={'hv' + i} x1={hx + (i + 1) * k} y1={hy} x2={hx + (i + 1) * k} y2={hy + 10 * k} stroke="#FFFFFF" strokeWidth={0.9} strokeOpacity={0.55} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <Line key={'hh' + i} x1={hx} y1={hy + (i + 1) * k} x2={hx + 10 * k} y2={hy + (i + 1) * k} stroke="#FFFFFF" strokeWidth={0.5} strokeOpacity={0.35} />
      ))}
      <Rect x={hx} y={hy} width={10 * k} height={10 * k} fill="none" stroke="#FFFFFF" strokeWidth={1.6} />
      {[0, 1, 2, 3].map((i) => (
        <Path key={'p' + i} d={sektor(i)} fill={i < 3 ? WARM : '#FFFFFF'} fillOpacity={i < 3 ? 1 : 0.08} stroke="#FFFFFF" strokeWidth={1.6} strokeLinejoin="round" />
      ))}
      <Path d={`M${vx} ${vy} L${vx + 26} ${vy} A26 26 0 0 0 ${vx + 26 * Math.cos(w)} ${vy - 26 * Math.sin(w)} Z`} fill="#FFFFFF" fillOpacity={0.25} />
      <Line x1={vx} y1={vy} x2={vx + 92} y2={vy} stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
      <Line x1={vx} y1={vy} x2={vx + 88 * Math.cos(w)} y2={vy - 88 * Math.sin(w)} stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
      <Line x1={430} y1={96} x2={552} y2={70} stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
      {[
        [430, 96],
        [552, 70],
      ].map(([x, y], i) => (
        <Path key={'k' + i} d={`M${x - 5} ${y - 5} L${x + 5} ${y + 5} M${x - 5} ${y + 5} L${x + 5} ${y - 5}`} stroke={WARM} strokeWidth={2} strokeLinecap="round" />
      ))}
    </Svg>
  )
}

function DekoText2() {
  return (
    <>
          <View style={{ position: 'absolute', left: 519, top: 306 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 17, color: '#FFFFFF' }}>0,45</Text>
          </View>
          <View style={{ position: 'absolute', left: 460, top: 350, alignItems: 'center' }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 14, color: WARM, lineHeight: 1 }}>3</Text>
            <View style={{ width: 14, height: 1.6, backgroundColor: WARM, marginVertical: 2 }} />
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 14, color: WARM, lineHeight: 1 }}>4</Text>
          </View>
          <View style={{ position: 'absolute', left: 418, top: 100 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 12, color: '#FFFFFF' }}>A</Text>
          </View>
          <View style={{ position: 'absolute', left: 548, top: 46 }}>
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 12, color: '#FFFFFF' }}>B</Text>
          </View>
    </>
  )
}

const ROT = '#E8735A'

/** Modul 3: Balkendiagramm mit Mittelwert, Thermometer, Flächen-Karo und Runden am Zahlenstrahl */
function Deko3({ p }: { p: Palette }) {
  const basis = 262
  const balken = [72, 114, 54, 96]
  const mittel = balken.reduce((a, b) => a + b, 0) / balken.length
  const k = 16
  const fx = 380
  const fy = 300
  const nx0 = 392
  const nx1 = 552
  const ny = 424
  const px = nx0 + 0.7 * (nx1 - nx0)
  return (
    <Svg width={SEITE_B} height={470} style={{ position: 'absolute', left: 0, top: 0 }}>
      {Array.from({ length: 28 }, (_, i) => (
        <Line key={'x' + i} x1={i * 22} y1={0} x2={i * 22} y2={470} stroke="#FFFFFF" strokeWidth={0.5} strokeOpacity={0.07} />
      ))}
      {Array.from({ length: 22 }, (_, i) => (
        <Line key={'y' + i} x1={0} y1={i * 22} x2={SEITE_B} y2={i * 22} stroke="#FFFFFF" strokeWidth={0.5} strokeOpacity={0.07} />
      ))}
      {/* Balkendiagramm */}
      <Line x1={376} y1={basis} x2={512} y2={basis} stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" />
      <Line x1={376} y1={basis} x2={376} y2={120} stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" />
      {[30, 60, 90, 120].map((h) => (
        <Line key={'g' + h} x1={376} y1={basis - h} x2={512} y2={basis - h} stroke="#FFFFFF" strokeWidth={0.6} strokeOpacity={0.25} />
      ))}
      {balken.map((h, i) => (
        <Rect key={'b' + i} x={386 + i * 31} y={basis - h} width={21} height={h} fill={i === 1 ? WARM : p.mittel} stroke="#FFFFFF" strokeWidth={1.2} />
      ))}
      <Line x1={378} y1={basis - mittel} x2={512} y2={basis - mittel} stroke={WARM} strokeWidth={2} strokeDasharray="5 4" />
      {/* Thermometer */}
      <Rect x={537} y={62} width={16} height={186} rx={8} fill="#FFFFFF" fillOpacity={0.12} stroke="#FFFFFF" strokeWidth={1.6} />
      <Rect x={541} y={176} width={8} height={78} fill={ROT} />
      <Path d={`M545 248 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0`} fill={ROT} stroke="#FFFFFF" strokeWidth={1.6} />
      {Array.from({ length: 8 }, (_, i) => (
        <Line key={'t' + i} x1={529} y1={80 + i * 20} x2={i % 2 ? 534 : 536} y2={80 + i * 20} stroke="#FFFFFF" strokeWidth={1} strokeOpacity={0.8} />
      ))}
      <Line x1={553} y1={160} x2={563} y2={160} stroke="#FFFFFF" strokeWidth={1.8} />
      {/* Fläche 6 × 4 */}
      <Rect x={fx} y={fy} width={6 * k} height={4 * k} fill={p.mittel} />
      {Array.from({ length: 5 }, (_, i) => (
        <Line key={'fv' + i} x1={fx + (i + 1) * k} y1={fy} x2={fx + (i + 1) * k} y2={fy + 4 * k} stroke="#FFFFFF" strokeWidth={0.8} strokeOpacity={0.6} />
      ))}
      {Array.from({ length: 3 }, (_, i) => (
        <Line key={'fh' + i} x1={fx} y1={fy + (i + 1) * k} x2={fx + 6 * k} y2={fy + (i + 1) * k} stroke="#FFFFFF" strokeWidth={0.8} strokeOpacity={0.6} />
      ))}
      <Rect x={fx} y={fy} width={6 * k} height={4 * k} fill="none" stroke="#FFFFFF" strokeWidth={1.6} />
      {/* Zahlenstrahl: 4,7 → 5 */}
      <Line x1={nx0 - 12} y1={ny} x2={nx1 + 16} y2={ny} stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" />
      {Array.from({ length: 11 }, (_, i) => (
        <Line key={'z' + i} x1={nx0 + (i * (nx1 - nx0)) / 10} y1={ny - (i % 5 ? 4 : 7)} x2={nx0 + (i * (nx1 - nx0)) / 10} y2={ny + (i % 5 ? 4 : 7)} stroke="#FFFFFF" strokeWidth={i % 5 ? 1 : 1.6} />
      ))}
      <Path d={`M${px} ${ny - 10} Q${(px + nx1) / 2} ${ny - 40} ${nx1 - 2} ${ny - 12}`} fill="none" stroke={WARM} strokeWidth={2} strokeLinecap="round" />
      <Path d={`M${nx1 - 10} ${ny - 18} L${nx1 - 2} ${ny - 12} L${nx1 - 11} ${ny - 8}`} fill="none" stroke={WARM} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d={`M${px} ${ny} m-4.5 0 a4.5 4.5 0 1 0 9 0 a4.5 4.5 0 1 0 -9 0`} fill={WARM} />
    </Svg>
  )
}

function DekoText3() {
  const t = (x: number, y: number, s: string, farbe = '#FFFFFF', gr = 12) => (
    <View style={{ position: 'absolute', left: x, top: y }}>
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: gr, color: farbe }}>{s}</Text>
    </View>
  )
  return (
    <>
      {t(486, 323, '24 cm²', '#FFFFFF', 15)}
      {t(566, 154, '0 °C', '#FFFFFF', 8)}
      {t(386, 434, '4')}
      {t(548, 434, '5')}
      {t(494, 393, '4,7', WARM)}
    </>
  )
}

function Deckblatt({ modul, sprache, p, loesungen }: { modul: Modul; sprache: Sprache; p: Palette; loesungen: boolean }) {
  const t: Tx = TX[sprache]
  const band = loesungen ? '#1F2A44' : p.tief
  const lektionen = modulLektionen(modul)
  const bereich = (i: number) => {
    const nr = lektionen.filter((l) => l.thema === i).map((l) => l.nr)
    return nr.length > 1 ? `${t.lektionen} ${nr[0]}–${nr[nr.length - 1]}` : `${t.lektion} ${nr[0]}`
  }
  const c = ctxFuer(p, sprache)
  const weiss = (o: number) => `rgba(255,255,255,${o})`
  return (
    <Page size="A4" style={{ padding: 0 }}>
      <View style={{ height: 470, backgroundColor: band }}>
        {modul.nr === 3 ? <Deko3 p={p} /> : <Deko p={p} />}
        <View style={{ position: 'absolute', left: 48, top: 56, width: 300 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9.5, letterSpacing: 1.6, color: p.mittel }}>{`${modul.fach[sprache].toUpperCase()} · ${modul.klasse}`}</Text>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 54, lineHeight: 1.05, color: '#FFFFFF', marginTop: 10, letterSpacing: -1 }}>{`${t.modul} ${modul.nr}`}</Text>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 23, lineHeight: 1.18, color: '#FFFFFF', marginTop: 12, letterSpacing: -0.3 }}>{typo(modul.titel[sprache], sprache)}</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 10.5, lineHeight: 1.5, color: weiss(0.86), marginTop: 14 }}>{typo(loesungen ? t.loesungenUnter : modul.untertitel[sprache], sprache)}</Text>
          {loesungen ? (
            <View style={{ alignSelf: 'flex-start', marginTop: 16, backgroundColor: WARM, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 4 }}>
              <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, letterSpacing: 1, color: '#1F2A44' }}>{t.loesungen.toUpperCase()}</Text>
            </View>
          ) : null}
        </View>
        {modul.nr === 3 ? <DekoText3 /> : <DekoText2 />}
      </View>

      <View style={{ paddingHorizontal: 48, paddingTop: 24 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, letterSpacing: 1.2, color: NEUTRAL.leise }}>{t.aufEinenBlick.toUpperCase()}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
          {modul.themen.map((th, i) => (
            <View key={i} style={{ width: '33.3%', flexDirection: 'row', alignItems: 'center', marginBottom: 14, paddingRight: 10 }}>
              <Plakette c={c} id={th.bild} d={36} />
              <View style={{ marginLeft: 9, flex: 1 }}>
                <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10, lineHeight: 1.25, color: NEUTRAL.text }}>{typo(th.titel[sprache], sprache)}</Text>
                <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8, color: NEUTRAL.leise, marginTop: 1.5 }}>{bereich(i)}</Text>
              </View>
            </View>
          ))}
        </View>
        <Arbeitsweise sprache={sprache} p={p} loesungen={loesungen} />
      </View>

      {!loesungen ? (
        <View style={{ position: 'absolute', left: 48, right: 48, bottom: 66, flexDirection: 'row' }}>
          {[
            [t.name, 3],
            [t.klasse, 1.2],
            [t.schuljahr, 1.6],
          ].map(([label, f], i) => (
            <View key={i} style={{ flex: f as number, marginLeft: i ? 16 : 0 }}>
              <View style={{ height: 22, borderBottomWidth: 1, borderBottomColor: NEUTRAL.linie }} />
              <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 7.6, color: NEUTRAL.leise, marginTop: 3 }}>{label as string}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={{ position: 'absolute', left: 48, right: 48, bottom: 26, flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.6, borderTopColor: NEUTRAL.haarlinie, paddingTop: 6 }}>
        <Image src={CDSE_LOGO} style={{ width: 22 * CDSE_LOGO_SEITEN, height: 22, marginRight: 9 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.5, color: NEUTRAL.marke, letterSpacing: 0.4 }}>CDSE Toolbox</Text>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 6.5, color: NEUTRAL.sehrLeise, marginTop: 2 }}>{URHEBER[sprache]}</Text>
        </View>
      </View>
    </Page>
  )
}

// --- Inhalt ----------------------------------------------------------------------------------

function Leiter() {
  return <View style={{ flex: 1, marginHorizontal: 6, marginBottom: 3.2, borderBottomWidth: 1, borderBottomColor: NEUTRAL.rahmen, borderStyle: 'dotted' }} />
}

function Zeile({ nr, titel, unter, seite, p }: { nr: string | number; titel: string; unter?: string; seite: number; p: Palette }) {
  return (
    <View wrap={false} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 7 }}>
      <View style={{ width: 17, height: 17, borderRadius: 8.5, backgroundColor: p.tief, alignItems: 'center', justifyContent: 'center', marginRight: 9, marginTop: 0.5 }}>
        <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8.4, color: '#FFFFFF', lineHeight: 1 }}>{String(nr)}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10.5, color: NEUTRAL.text }}>{titel}</Text>
          <Leiter />
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10.5, color: NEUTRAL.text, width: 20, textAlign: 'right' }}>{String(seite)}</Text>
        </View>
        {unter ? <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.4, lineHeight: 1.35, color: NEUTRAL.leise, marginTop: 1 }}>{unter}</Text> : null}
      </View>
    </View>
  )
}

function InhaltSeite({ modul, blaetter, sprache, p, loesungen }: { modul: Modul; blaetter: Map<string, Blatt>; sprache: Sprache; p: Palette; loesungen: boolean }) {
  const t: Tx = TX[sprache]
  const seiten = heftSeiten(modul, loesungen)
  const lektionen = modulLektionen(modul)
  const c = ctxFuer(p, sprache)
  const ty = (s: string) => typo(s, sprache)
  return (
    <Page size="A4" style={seitenStil}>
      <HeftKopf reiter={`${t.modul} ${modul.nr}`} meta={`${modul.fach[sprache]}  ·  ${ty(modul.titel[sprache])}`} p={p} />
      <View style={{ width: 26, height: 3.5, borderRadius: 2, backgroundColor: p.tief, marginBottom: 7 }} />
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 22, color: NEUTRAL.text, letterSpacing: -0.3 }}>{loesungen ? `${t.inhalt} · ${t.loesungen}` : t.inhalt}</Text>
      {modul.themen.map((th, ti) => (
        <View key={ti} wrap={false} style={{ marginTop: 13 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 3, borderBottomWidth: 0.8, borderBottomColor: p.mittel }}>
            <Plakette c={c} id={th.bild} d={22} />
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 11.5, color: p.tief, marginLeft: 7 }}>{ty(th.titel[sprache])}</Text>
          </View>
          {lektionen
            .filter((l) => l.thema === ti)
            .map((l) => {
              const b = blaetter.get(l.id)
              if (!b) return null
              return <Zeile key={l.id} nr={l.nr} titel={ty(blattInhalt(b, sprache).titel)} unter={ty(modul.lernziele[l.id]?.[sprache] ?? '')} seite={seiten.start.get(l.id) ?? 0} p={p} />
            })}
        </View>
      ))}
      {!loesungen ? (
        <View wrap={false} style={{ marginTop: 13 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 3, borderBottomWidth: 0.8, borderBottomColor: p.mittel }}>
            <Plakette c={c} id="icon:bookmark" d={22} />
            <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 11.5, color: p.tief, marginLeft: 7 }}>{t.anhang}</Text>
          </View>
          <Zeile nr="A" titel={t.wortschatz} seite={seiten.wortschatz} p={p} />
          <Zeile nr="B" titel={t.lernstand} seite={seiten.lernstand} p={p} />
        </View>
      ) : null}
      <HeftFuss fuss={`${modul.fach[sprache]} · ${t.modul} ${modul.nr}`} titel={loesungen ? `${t.inhalt} · ${t.loesungen}` : t.inhalt} sprache={sprache} />
    </Page>
  )
}

// --- Anhang: Wortschatz und Lernstand ------------------------------------------------------------

function WortschatzSeite({ modul, sprache, p }: { modul: Modul; sprache: Sprache; p: Palette }) {
  const t: Tx = TX[sprache]
  const c = ctxFuer(p, sprache)
  const ty = (s: string) => typo(s, sprache)
  const block = (ti: number) => {
    const th = modul.themen[ti]
    const woerter = modul.wortschatz.filter((w) => w.thema === ti)
    return (
      <View key={ti} wrap={false} style={{ marginBottom: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Plakette c={c} id={th.bild} d={20} />
          <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 10.5, color: p.tief, marginLeft: 7 }}>{ty(th.titel[sprache])}</Text>
        </View>
        {woerter.map((w, i) => {
          const [a, b] = sprache === 'fr' ? [w.fr, w.de] : [w.de, w.fr]
          return (
            <View key={i} style={{ flexDirection: 'row', paddingVertical: 3.4, paddingHorizontal: 6, backgroundColor: i % 2 ? '#FFFFFF' : NEUTRAL.flaeche, borderRadius: 3 }}>
              <Text style={{ width: '53%', paddingRight: 6, fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 9, lineHeight: 1.3, color: NEUTRAL.text }}>{typo(a, sprache)}</Text>
              <Text style={{ width: '47%', fontFamily: SCHRIFT.jugend, fontSize: 9, lineHeight: 1.3, color: NEUTRAL.leise }}>{typo(b, sprache === 'fr' ? 'de' : 'fr')}</Text>
            </View>
          )
        })}
      </View>
    )
  }
  // zwei Spalten mit etwa gleich vielen Wörtern
  const zahl = modul.themen.map((_, i) => modul.wortschatz.filter((w) => w.thema === i).length + 2)
  const haelfte = zahl.reduce((a, b) => a + b, 0) / 2
  let summe = 0
  let grenze = 0
  while (grenze < zahl.length - 1 && summe + zahl[grenze] / 2 < haelfte) summe += zahl[grenze++]
  const aufteilung = [modul.themen.map((_, i) => i).slice(0, grenze), modul.themen.map((_, i) => i).slice(grenze)]
  return (
    <Page size="A4" style={seitenStil}>
      <HeftKopf reiter={t.anhang} meta={`${modul.fach[sprache]}  ·  ${t.modul} ${modul.nr}`} p={p} />
      <View style={{ width: 26, height: 3.5, borderRadius: 2, backgroundColor: p.tief, marginBottom: 7 }} />
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 22, color: NEUTRAL.text, letterSpacing: -0.3 }}>{t.wortschatz}</Text>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 10.2, color: NEUTRAL.leise, marginTop: 4, marginBottom: 12 }}>{ty(t.wortschatzUnter)}</Text>
      <View style={{ flexDirection: 'row', marginBottom: 6, paddingHorizontal: 6 }}>
        {[0, 1].map((s) => (
          <View key={s} style={{ flex: 1, flexDirection: 'row', marginRight: s ? 0 : 18 }}>
            <Text style={{ width: '53%', fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.6, letterSpacing: 0.8, color: NEUTRAL.leise }}>{t.sprachen[0].toUpperCase()}</Text>
            <Text style={{ width: '47%', fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 7.6, letterSpacing: 0.8, color: NEUTRAL.leise }}>{t.sprachen[1].toUpperCase()}</Text>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row' }}>
        {aufteilung.map((spalte, s) => (
          <View key={s} style={{ flex: 1, marginRight: s ? 0 : 18 }}>
            {spalte.map((ti) => block(ti))}
          </View>
        ))}
      </View>
      <HeftFuss fuss={`${modul.fach[sprache]} · ${t.modul} ${modul.nr}`} titel={t.wortschatz} sprache={sprache} />
    </Page>
  )
}

function LernstandSeite({ modul, blaetter, sprache, p }: { modul: Modul; blaetter: Map<string, Blatt>; sprache: Sprache; p: Palette }) {
  const t: Tx = TX[sprache]
  const ty = (s: string) => typo(s, sprache)
  const lektionen = modulLektionen(modul)
  const spalten = [3.4, 0.9, 0.9, 0.9]
  const kopf = (inhalt: ReactNode, i: number) => (
    <View key={i} style={{ flex: spalten[i], alignItems: i ? 'center' : 'flex-start', justifyContent: 'center', paddingHorizontal: 6, paddingVertical: 5 }}>
      {inhalt}
    </View>
  )
  return (
    <Page size="A4" style={seitenStil}>
      <HeftKopf reiter={t.anhang} meta={`${modul.fach[sprache]}  ·  ${t.modul} ${modul.nr}`} p={p} />
      <View style={{ width: 26, height: 3.5, borderRadius: 2, backgroundColor: p.tief, marginBottom: 7 }} />
      <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 22, color: NEUTRAL.text, letterSpacing: -0.3 }}>{t.lernstand}</Text>
      <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 10.2, lineHeight: 1.45, color: NEUTRAL.leise, marginTop: 4, marginBottom: 12 }}>{ty(t.lernstandUnter)}</Text>
      <View style={{ borderWidth: 0.8, borderColor: NEUTRAL.rahmen, borderRadius: 8 }}>
        <View style={{ flexDirection: 'row', backgroundColor: p.zart, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.rahmen }}>
          {[t.zielSpalte, ...t.optionen].map((x, i) => kopf(<Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 8.4, color: NEUTRAL.text }}>{ty(x)}</Text>, i))}
        </View>
        {lektionen.map((l, r) => {
          const b = blaetter.get(l.id)
          return (
            <View key={l.id} wrap={false} style={{ flexDirection: 'row', borderBottomWidth: r < lektionen.length - 1 ? 0.8 : 0, borderBottomColor: NEUTRAL.rahmen, minHeight: 34 }}>
              <View style={{ flex: spalten[0], flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 4 }}>
                <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: p.tief, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
                  <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 8, color: '#FFFFFF', lineHeight: 1 }}>{String(l.nr)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: SCHRIFT.titel, fontWeight: 800, fontSize: 9, color: NEUTRAL.text }}>{b ? ty(blattInhalt(b, sprache).titel) : ''}</Text>
                  <Text style={{ fontFamily: SCHRIFT.jugend, fontSize: 8.2, lineHeight: 1.3, color: NEUTRAL.leise }}>{ty(modul.lernziele[l.id]?.[sprache] ?? '')}</Text>
                </View>
              </View>
              {[1, 2, 3].map((i) => (
                <View key={i} style={{ flex: spalten[i], alignItems: 'center', justifyContent: 'center', borderLeftWidth: 0.8, borderLeftColor: NEUTRAL.rahmen }}>
                  <View style={{ width: 11, height: 11, borderRadius: 5.5, borderWidth: 1.1, borderColor: NEUTRAL.leise }} />
                </View>
              ))}
            </View>
          )
        })}
      </View>
      {[t.gutKann, t.hilfe].map((frage, i) => (
        <View key={i} wrap={false} style={{ marginTop: 16 }}>
          <Text style={{ fontFamily: SCHRIFT.jugend, fontWeight: 600, fontSize: 10.2, color: NEUTRAL.text }}>{ty(frage)}</Text>
          {[0, 1].map((j) => (
            <View key={j} style={{ height: 23, borderBottomWidth: 0.8, borderBottomColor: NEUTRAL.linie }} />
          ))}
        </View>
      ))}
      <HeftFuss fuss={`${modul.fach[sprache]} · ${t.modul} ${modul.nr}`} titel={t.lernstand} sprache={sprache} />
    </Page>
  )
}

// --- Heft und Lösungsheft ---------------------------------------------------------------------------

export function ModulheftDokument({ modul, blaetter, sprache = 'de', loesungen = false }: { modul: Modul; blaetter: Map<string, Blatt>; sprache?: Sprache; loesungen?: boolean }) {
  const t: Tx = TX[sprache]
  const lektionen = modulLektionen(modul)
  const erstes = blaetter.get(lektionen[0]?.id ?? '')
  const p = palette((bereichById.get(erstes?.bereich ?? 'mathe') ?? bereichById.get('mathe')!).farben)
  const titel = `${modul.fach[sprache]} – ${t.modul} ${modul.nr}: ${typo(modul.titel[sprache], sprache)}${loesungen ? ` (${t.loesungen})` : ''}`
  return (
    <Document title={titel} author={URHEBER_NAME} creator="CDSE Toolbox" producer="CDSE Toolbox" language={sprache === 'fr' ? 'fr' : 'de'}>
      <Deckblatt modul={modul} sprache={sprache} p={p} loesungen={loesungen} />
      <InhaltSeite modul={modul} blaetter={blaetter} sprache={sprache} p={p} loesungen={loesungen} />
      {lektionen.map((l) => {
        const b = blaetter.get(l.id)
        if (!b) return null
        const thema = modul.themen[l.thema].titel[sprache]
        const heft: HeftAngaben = {
          reiter: `${t.lektion} ${l.nr}`,
          meta: `${modul.fach[sprache]}  ·  ${t.modul} ${modul.nr}  ·  ${typo(thema, sprache)}`,
          fuss: `${modul.fach[sprache]} · ${t.modul} ${modul.nr} · ${t.lektion} ${l.nr}`,
          lernziel: modul.lernziele[l.id]?.[sprache],
          zielWort: t.ziel,
        }
        return <BlattSeiten key={l.id} blatt={b} opt={{ sprache, schueler: !loesungen, lehrer: loesungen, heft }} />
      })}
      {!loesungen ? <WortschatzSeite modul={modul} sprache={sprache} p={p} /> : null}
      {!loesungen ? <LernstandSeite modul={modul} blaetter={blaetter} sprache={sprache} p={p} /> : null}
    </Document>
  )
}

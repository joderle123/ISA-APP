// ---------------------------------------------------------------------------
// Farbige Motive für die Spielschule (Cycle 1): Menschen und Dinge des Alltags.
// Gleicher Strich wie motive.ts und die Figuren (Tinte als Umriss, flache, warme
// Farben). Menschen nutzen die Proportionen und Gesichtszüge der Figuren, damit
// Karten mit `figur:` und `motiv:` zusammenpassen. Jedes Motiv muss auf einer
// Bildkarte (≈ 18 mm hoch) noch zu erkennen sein: klare Umrisse, keine Schrift.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { gesichtsZuege } from './gesichter'
import { haarHinten, haarVorne, masse, tube, type Mass, type Typ } from './figuren'

const T = 'tinte'
type VB = [number, number, number, number]

// --- Farben ------------------------------------------------------------------
const ROT = '#D9574A'
const ROT_D = '#A9423A'
const ORANGE = '#EE9A4D'
const GELB = '#F2C94C'
const GELB_D = '#D9A62E'
const GRUEN = '#7DB46C'
const GRUEN_D = '#4F8A45'
const HELLGRUEN = '#B9DC9A'
const BLAU = '#5B8BD0'
const BLAU_D = '#34507F'
const HELLBLAU = '#A9D2EE'
const GLAS = '#E3EEF7'
const LILA = '#9B7FC8'
const ROSA = '#EFA7B6'
const BRAUN = '#9A6A44'
const HOLZ = '#DDB27A'
const HOLZ_D = '#B07D4A'
const CREME = '#FFF4DC'
const GRAU = '#A8B0BD'
const DUNKEL = '#4A5262'
const METALL = '#CDD5DE'
const WANGE = '#F4A9A0'
const LICHT = '#FFD34D'

// Hauttöne (wie die Figuren, dazu ein dunklerer)
const H1 = '#F6DDC8'
const H2 = '#F0CDAD'
const H3 = '#DDB08A'
const H4 = '#C58C66'
const H5 = '#9C6A48'
const H6 = '#74472E'

// --- Bausteine ------------------------------------------------------------------
const z = (vb: VB, formen: Form[], w = 2.4): Zeichnung => ({ vb, formen, w })
const g = (tf: string, formen: Form[], o?: number): Form => ({ t: 'g', tf, formen, o })
const glanz = (d: string, w = 3, o = 0.85): Form => ({ t: 'path', d, s: 'papier', f: 'none', w, o })
const linie = (d: string, w = 2, s = T): Form => ({ t: 'path', d, s, f: 'none', w })

/** Saubere Gesamtsilhouette: erst dick umranden, dann ohne Rand füllen (wie motive.ts). */
function silhouette(formen: Form[], fuellung: string, strich = 4.4): Form[] {
  const mit = (f: Form, extra: { s: string; w?: number; f: string }): Form =>
    f.t === 'g' ? { ...f, formen: f.formen.map((x) => mit(x, extra)) } : ({ ...f, ...extra } as Form)
  return [...formen.map((f) => mit(f, { s: T, w: strich, f: T })), ...formen.map((f) => mit(f, { s: 'none', f: fuellung }))]
}

/** Gelber Schein hinter einem Teil (Körperteile hervorheben). */
function schein(formen: Form[], breite = 9): Form[] {
  const mit = (f: Form): Form => (f.t === 'g' ? { ...f, formen: f.formen.map(mit) } : ({ ...f, s: LICHT, f: LICHT, w: breite, o: undefined, dash: undefined } as Form))
  return formen.map(mit)
}

// --- Gesichter (Raster 100 × 100 wie gesichter.ts) ---------------------------------
type Ausdruck = 'lacht' | 'laechelt' | 'sanft' | 'traurig'

const WANGEN: Form[] = [
  { t: 'ellipse', cx: 26, cy: 60, rx: 7, ry: 4.5, f: WANGE, s: 'none', o: 0.85 },
  { t: 'ellipse', cx: 74, cy: 60, rx: 7, ry: 4.5, f: WANGE, s: 'none', o: 0.85 },
]
const AUGEN: Form[] = [35, 65].flatMap((x): Form[] => [
  { t: 'ellipse', cx: x, cy: 43, rx: 4.6, ry: 5.8, f: T, s: 'none' },
  { t: 'circle', cx: x + 1.7, cy: 40.8, r: 1.6, f: 'papier', s: 'none' },
])
const BRAUEN: Form[] = [linie('M27 31 Q35 27 43 31', 3), linie('M57 31 Q65 27 73 31', 3)]
const BRAUEN_SORGE: Form[] = [linie('M27 32 L42 28', 3), linie('M73 32 L58 28', 3)]
const LACHMUND: Form[] = [
  { t: 'path', d: 'M31 60 Q50 63 69 60 Q66 82 50 82 Q34 82 31 60 Z', f: T, s: T, w: 2.4 },
  { t: 'path', d: 'M40 76 Q50 70 60 76 Q56 81 50 81 Q44 81 40 76 Z', f: '#E8837A', s: 'none' },
]

function zuege(a: Ausdruck): Form[] {
  switch (a) {
    case 'lacht':
      return [...WANGEN, ...BRAUEN, ...AUGEN, ...LACHMUND]
    case 'laechelt':
      return [...WANGEN, ...BRAUEN, ...AUGEN, linie('M34 63 Q50 77 66 63', 3.4)]
    case 'sanft':
      return [...WANGEN, ...BRAUEN_SORGE, ...AUGEN, linie('M39 65 Q50 72 61 65', 3.4)]
    case 'traurig':
      return gesichtsZuege('traurig')
  }
}

/** Gesichtszüge (100er-Raster) auf einen Kopf setzen – wie figuren.ts. */
function aufKopf(formen: Form[], kx: number, ky: number, kr: number): Form {
  const k = (kr * 0.96) / 43
  return g(`translate(${(kx - 50 * k).toFixed(2)} ${(ky + 2 - 52 * k).toFixed(2)}) scale(${k.toFixed(4)})`, formen)
}

/** Runde Brille im 100er-Raster. */
const BRILLE: Form[] = [
  { t: 'circle', cx: 35, cy: 43, r: 11, f: '#EAF3FA', s: T, w: 3, o: 0.9 },
  { t: 'circle', cx: 65, cy: 43, r: 11, f: '#EAF3FA', s: T, w: 3, o: 0.9 },
  linie('M46 42 Q50 38.5 54 42', 3),
  linie('M24 41 L12 38', 3),
  linie('M76 41 L88 38', 3),
]

// --- Ganze Figur (Raster 100 × 160 wie figuren.ts) -----------------------------------
type P = [number, number]
interface Arm {
  /** Kontrollpunkt (Ellbogen) und Hand */
  c: P
  h: P
}
interface FigurPlan {
  t: Typ
  gesicht?: Form[]
  armL?: Arm | null
  armR?: Arm | null
  /** Fußpunkte (Ende der Beine) */
  fussL?: P
  fussR?: P
  hinten?: Form[]
  nachTorso?: Form[]
  nachKopf?: Form[]
  vorne?: Form[]
  schatten?: boolean
}

function schuh(x: number, y: number, rechts: boolean, winkel = 0): Form {
  const d = rechts ? `M10 5 Q10 -3 1 -3 Q-5 -3 -5 5 Z` : `M-10 5 Q-10 -3 -1 -3 Q5 -3 5 5 Z`
  return g(`translate(${x} ${y}) rotate(${winkel})`, [{ t: 'path', d, f: T, s: T, w: 1.5 }])
}

function figur(p: FigurPlan): Form[] {
  const t = p.t
  const m = masse(t.alter)
  const { kx, ky, kr, schulterY: sY, shirtUnten: sU, fussY, breite: b } = m
  const out: Form[] = []
  if (p.schatten !== false) out.push({ t: 'ellipse', cx: kx, cy: fussY + 3, rx: 26, ry: 3.2, f: 'hellgrau', s: 'none' })
  out.push(...(p.hinten ?? []))
  const hy = sU - 4
  const fl = p.fussL ?? [kx - 9, fussY - 4]
  const fr = p.fussR ?? [kx + 9, fussY - 4]
  out.push(...tube(`M${kx - 8} ${hy} L${fl[0]} ${fl[1]}`, t.hose, 10))
  out.push(...tube(`M${kx + 8} ${hy} L${fr[0]} ${fr[1]}`, t.hose, 10))
  if (!p.fussL) out.push(schuh(fl[0], fl[1], false))
  if (!p.fussR) out.push(schuh(fr[0], fr[1], true))
  out.push(...haarHinten(t, m))
  out.push({ t: 'rect', x: kx - 5, y: ky + kr - 4, b: 10, h: sY - ky - kr + 8, f: t.haut, s: T, w: 2 })
  out.push({
    t: 'path',
    d: `M${kx - b} ${sY + 6} Q${kx - b} ${sY} ${kx - b + 7} ${sY - 1} L${kx + b - 7} ${sY - 1} Q${kx + b} ${sY} ${kx + b} ${sY + 6} L${kx + b + 2} ${sU - 3} Q${kx + b + 2} ${sU} ${kx + b - 2} ${sU} L${kx - b + 2} ${sU} Q${kx - b - 2} ${sU} ${kx - b - 2} ${sU - 3} Z`,
    f: t.shirt,
    s: T,
    w: 2.4,
  })
  out.push({ t: 'path', d: `M${kx - 6} ${sY - 1} Q${kx} ${sY + 6} ${kx + 6} ${sY - 1}`, f: t.haut, s: T, w: 2 })
  out.push(...(p.nachTorso ?? []))
  out.push({ t: 'circle', cx: kx - kr, cy: ky + 2, r: kr * 0.2, f: t.haut, s: T, w: 2 })
  out.push({ t: 'circle', cx: kx + kr, cy: ky + 2, r: kr * 0.2, f: t.haut, s: T, w: 2 })
  out.push({ t: 'circle', cx: kx, cy: ky, r: kr, f: t.haut, s: T, w: 2.4 })
  out.push(...haarVorne(t, m))
  out.push(aufKopf(p.gesicht ?? zuege('lacht'), kx, ky, kr))
  out.push(...(p.nachKopf ?? []))
  const sy = sY + 4
  const lx = kx - b + 3
  const rx = kx + b - 3
  const d = t.alter === 'kind' ? 8.5 : 8
  const unten = sU - 8
  const armL: Arm | null = p.armL === undefined ? { c: [lx - 7, sy + 18], h: [lx - 6, unten + 3] } : p.armL
  const armR: Arm | null = p.armR === undefined ? { c: [rx + 7, sy + 18], h: [rx + 6, unten + 3] } : p.armR
  for (const [a, x] of [[armL, lx], [armR, rx]] as [Arm | null, number][]) {
    if (!a) continue
    out.push(...tube(`M${x} ${sy} Q${a.c[0]} ${a.c[1]} ${a.h[0]} ${a.h[1]}`, t.shirt, d))
    out.push({ t: 'circle', cx: a.h[0], cy: a.h[1], r: 5, f: t.haut, s: T, w: 2.2 })
  }
  out.push(...(p.vorne ?? []))
  return out
}

const kind = (haar: Typ['haar'], haarFarbe: string, haut: string, shirt: string, hose = '#3E4A60', extra?: string): Typ => ({ haar, haarFarbe, haut, shirt, hose, alter: 'kind', extra })
const hand = (x: number, y: number, haut: string, r = 5): Form => ({ t: 'circle', cx: x, cy: y, r, f: haut, s: T, w: 2.2 })
const herz = (x: number, y: number, s = 1, f = ROT): Form =>
  g(`translate(${x} ${y}) scale(${s})`, [{ t: 'path', d: 'M0 6 Q-10 -1 -7 -6 Q-4 -10 0 -5 Q4 -10 7 -6 Q10 -1 0 6 Z', f, s: T, w: 1.8 }])

// --- 1. Menschen zusammen ---------------------------------------------------------------
function freunde(): Zeichnung {
  const a = kind('locken', '#231E1C', H5, GELB)
  const b = kind('zopf', '#B5532F', H1, GRUEN, '#4F6D99')
  return z([14, 0, 156, 160], [
    ...figur({ t: a, armR: { c: [80, 80], h: [86, 99] } }),
    g('translate(72 0)', figur({ t: b, armL: { c: [20, 80], h: [14, 99] } })),
    hand(86, 99, H5),
  ])
}

function gruppe(): Zeichnung {
  const a = kind('lang', '#2A2522', H3, ROT)
  const b = kind('tuch', '#5E9F9C', H4, GELB, '#4A4F66')
  const c = kind('kappe', '#7A5236', H2, ORANGE, '#4F6D99', BLAU)
  return z([18, 0, 216, 160], [
    ...figur({ t: a, armR: { c: [78, 80], h: [83, 99] } }),
    g('translate(66 0)', figur({ t: b, armL: { c: [22, 80], h: [17, 99] }, armR: { c: [78, 80], h: [83, 99] } })),
    g('translate(132 0)', figur({ t: c, armL: { c: [22, 80], h: [17, 99] } })),
    hand(83, 99, H3),
    hand(149, 99, H4),
  ])
}

function familie(): Zeichnung {
  const gross: Typ = { haar: 'locken', haarFarbe: '#231E1C', haut: H5, shirt: '#5E9F9C', hose: '#36405A', alter: 'erwachsen' }
  const klein = kind('zopf', '#231E1C', H5, GELB, '#4F6D99')
  const baby: Form[] = [
    ...tube('M31 53 Q22 66 24 78', gross.shirt, 8),
    { t: 'path', d: 'M30 66 Q34 58 50 60 Q64 62 62 72 Q60 80 46 80 Q30 80 30 66 Z', f: '#BFE3D0', s: T, w: 2.2 },
    linie('M40 62 Q44 70 40 79', 1.6, '#7FB59B'),
    { t: 'circle', cx: 30, cy: 64, r: 10, f: H5, s: T, w: 2.2 },
    linie('M29 54.5 Q26 50 30 49', 1.8),
    aufKopf(zuege('laechelt'), 30, 64, 10),
  ]
  return z([12, -3, 138, 163], [
    ...figur({
      t: gross,
      armL: null,
      armR: { c: [82, 70], h: [84, 99] },
      vorne: [...baby, ...tube('M24 78 Q34 86 54 80', gross.shirt, 8), hand(55, 79, H5)],
    }),
    g('translate(62 0)', figur({ t: klein, armL: { c: [24, 84], h: [22, 99] } })),
    hand(84, 99, H5),
  ])
}

function babyMotiv(): Zeichnung {
  const strampler = '#F7D774'
  return z([10, 4, 104, 116], [
    { t: 'ellipse', cx: 60, cy: 114, rx: 40, ry: 4, f: 'hellgrau', s: 'none' },
    ...tube('M46 96 L32 106', strampler, 15),
    ...tube('M74 96 L88 106', strampler, 15),
    { t: 'ellipse', cx: 28, cy: 108, rx: 8, ry: 6.5, f: H2, s: T, w: 2.2 },
    { t: 'ellipse', cx: 92, cy: 108, rx: 8, ry: 6.5, f: H2, s: T, w: 2.2 },
    { t: 'path', d: 'M60 60 Q38 60 36 86 Q36 106 60 106 Q84 106 84 86 Q82 60 60 60 Z', f: strampler, s: T, w: 2.4 },
    { t: 'path', d: 'M47 66 Q60 84 73 66 Z', f: 'papier', s: T, w: 2 },
    { t: 'circle', cx: 60, cy: 92, r: 2, f: T, s: 'none' },
    ...tube('M44 70 Q32 70 28 58', strampler, 9),
    { t: 'circle', cx: 27, cy: 55, r: 6, f: H2, s: T, w: 2.2 },
    linie('M94 56 L100 36', 3.4),
    { t: 'circle', cx: 101, cy: 31, r: 9, f: ROT, s: T, w: 2.2 },
    { t: 'circle', cx: 98, cy: 28, r: 2.2, f: 'papier', s: 'none' },
    ...tube('M76 70 Q90 72 93 60', strampler, 9),
    { t: 'circle', cx: 93, cy: 58, r: 6, f: H2, s: T, w: 2.2 },
    { t: 'circle', cx: 34, cy: 40, r: 5.5, f: H2, s: T, w: 2 },
    { t: 'circle', cx: 86, cy: 40, r: 5.5, f: H2, s: T, w: 2 },
    { t: 'circle', cx: 60, cy: 38, r: 26, f: H2, s: T, w: 2.4 },
    linie('M57 12.5 Q55 6 59 3.5 M62 12.5 Q63.5 7 68 6', 2.6, '#8A6440'),
    aufKopf(zuege('lacht'), 60, 38, 26),
  ])
}

/** Brustbild (Raster 120 breit, Kopf bei 60/50, Rumpf bis 124). */
interface BrustPlan {
  t: Typ
  gesicht?: Form[]
  kleid?: string
  hinten?: Form[]
  nachRumpf?: Form[]
  nachKopf?: Form[]
  /** Arme mit Händen; fehlt er, hängen die Arme angewinkelt vorne. */
  armL?: Arm | null
  armR?: Arm | null
  vorne?: Form[]
  oben?: number
  vb?: VB
}
const BK: Mass = { kx: 60, ky: 50, kr: 25, schulterY: 82, shirtUnten: 124, fussY: 124, breite: 36 }

function brust(p: BrustPlan): Zeichnung {
  const t = p.t
  const kleid = p.kleid ?? t.shirt
  const { kx, ky, kr } = BK
  const out: Form[] = [...(p.hinten ?? [])]
  out.push(...haarHinten(t, BK))
  out.push({ t: 'rect', x: kx - 7, y: ky + kr - 6, b: 14, h: 18, f: t.haut, s: T, w: 2.2 })
  out.push({ t: 'path', d: 'M26 124 L26 99 Q26 84 42 82 L78 82 Q94 84 94 99 L94 124 Z', f: kleid, s: T, w: 2.4 })
  out.push({ t: 'path', d: 'M51 82 Q60 93 69 82', f: t.haut, s: T, w: 2.2 })
  out.push(...(p.nachRumpf ?? []))
  out.push({ t: 'circle', cx: kx - kr, cy: ky + 2, r: 5, f: t.haut, s: T, w: 2.2 })
  out.push({ t: 'circle', cx: kx + kr, cy: ky + 2, r: 5, f: t.haut, s: T, w: 2.2 })
  out.push({ t: 'circle', cx: kx, cy: ky, r: kr, f: t.haut, s: T, w: 2.4 })
  out.push(...haarVorne(t, BK))
  out.push(aufKopf(p.gesicht ?? zuege('lacht'), kx, ky, kr))
  out.push(...(p.nachKopf ?? []))
  const armL = p.armL === undefined ? { c: [16, 112] as P, h: [40, 116] as P } : p.armL
  const armR = p.armR === undefined ? { c: [104, 112] as P, h: [80, 116] as P } : p.armR
  for (const [a, x] of [[armL, 30], [armR, 90]] as [Arm | null, number][]) {
    if (!a) continue
    out.push(...tube(`M${x} 92 Q${a.c[0]} ${a.c[1]} ${a.h[0]} ${a.h[1]}`, kleid, 12))
    out.push({ t: 'circle', cx: a.h[0], cy: a.h[1], r: 6.5, f: t.haut, s: T, w: 2.2 })
  }
  out.push(...(p.vorne ?? []))
  const oben = p.oben ?? 18
  return z(p.vb ?? [0, oben, 120, 128 - oben], out)
}

const erw = (haar: Typ['haar'], haarFarbe: string, haut: string, shirt: string, extra?: string): Typ => ({ haar, haarFarbe, haut, shirt, hose: '#3E4A60', alter: 'erwachsen', extra })

function oma(): Zeichnung {
  const t = erw('dutt', '#D3D6DB', H4, '#B57BA8')
  return brust({
    t,
    oben: 6,
    gesicht: [...zuege('lacht'), ...BRILLE],
    nachRumpf: [
      { t: 'path', d: 'M51 82 L60 94 L69 82', f: 'none', s: T, w: 2 },
      { t: 'path', d: 'M60 94 L60 124', f: 'none', s: T, w: 2 },
      { t: 'circle', cx: 55, cy: 104, r: 2.4, f: CREME, s: T, w: 1.5 },
      { t: 'circle', cx: 55, cy: 116, r: 2.4, f: CREME, s: T, w: 1.5 },
    ],
    armL: { c: [16, 114], h: [54, 114] },
    armR: { c: [104, 114], h: [66, 114] },
  })
}

function opa(): Zeichnung {
  const t = erw('glatze-bart', '#D3D6DB', H1, '#6E9AC2')
  return brust({
    t,
    gesicht: [...zuege('laechelt'), ...BRILLE],
    kleid: '#6E9AC2',
    nachRumpf: [
      { t: 'path', d: 'M42 82 L54 104 L60 90 L66 104 L78 82', f: '#8DB87C', s: T, w: 2 },
      { t: 'circle', cx: 60, cy: 110, r: 2.4, f: CREME, s: T, w: 1.5 },
    ],
    armR: { c: [108, 86], h: [104, 62] },
  })
}

function kindTroesten(): Zeichnung {
  const a = kind('kurz', '#D5AE5E', H1, '#6C8FC6')
  const b = kind('lang', '#231E1C', H5, '#F2B04C', '#4F6D99')
  return z([16, -2, 140, 162], [
    ...figur({ t: a, gesicht: zuege('traurig') }),
    g('translate(58 0)', figur({ t: b, gesicht: zuege('sanft'), armL: { c: [14, 56], h: [2, 66] } })),
    herz(80, 12, 1.1),
  ])
}

function keksHaelfte(x: number, y: number, rechts: boolean): Form {
  const d = 'M0 -11 Q-12 -11 -12 0 Q-12 11 0 11 L3 7 L-1 3 L3 -1 L-1 -5 L3 -8 Z'
  return g(`translate(${x} ${y}) scale(${rechts ? -1 : 1} 1)`, [
    { t: 'path', d, f: '#D29A5A', s: T, w: 2.2 },
    { t: 'circle', cx: -6, cy: -4, r: 1.8, f: '#5A3A28', s: 'none' },
    { t: 'circle', cx: -4, cy: 5, r: 1.8, f: '#5A3A28', s: 'none' },
    { t: 'circle', cx: -9, cy: 2, r: 1.5, f: '#5A3A28', s: 'none' },
  ])
}

function teilen(): Zeichnung {
  const a = kind('kurz', '#231E1C', H4, GRUEN)
  const b = kind('zopf', '#4A3426', H2, LILA, '#4F6D99')
  return z([14, 0, 160, 160], [
    ...figur({ t: a, armL: { c: [22, 92], h: [38, 92] }, armR: { c: [78, 92], h: [84, 90] }, vorne: [keksHaelfte(36, 86, false), hand(38, 92, H4)] }),
    g('translate(76 0)', figur({ t: b, armL: { c: [22, 92], h: [18, 90] } })),
    keksHaelfte(90, 84, true),
    hand(84, 90, H4),
    hand(94, 90, H2),
  ])
}

// --- 2. Menschen in Berufen und Rollen ------------------------------------------------------
const kittel = (innen: string): Form[] => [
  { t: 'path', d: 'M50 82 L60 104 L70 82 Z', f: innen, s: T, w: 2 },
  linie('M44 83 L56 112', 2),
  linie('M76 83 L64 112', 2),
  { t: 'rect', x: 70, y: 98, b: 14, h: 11, rx: 2, f: 'papier', s: T, w: 1.8 },
  { t: 'rect', x: 73, y: 92, b: 3, h: 8, rx: 1, f: BLAU, s: T, w: 1.2 },
]
const stethoskop: Form[] = [
  ...tube('M50 82 Q42 96 46 108', DUNKEL, 3),
  ...tube('M70 82 Q78 94 74 102', DUNKEL, 3),
  { t: 'circle', cx: 46, cy: 111, r: 5.5, f: METALL, s: T, w: 2 },
  { t: 'circle', cx: 74, cy: 104, r: 3, f: DUNKEL, s: T, w: 1.6 },
]

function aerztin(): Zeichnung {
  return brust({ t: erw('lang', '#2A2522', H4, 'papier'), nachRumpf: [...kittel(HELLBLAU), ...stethoskop], armL: { c: [16, 112], h: [38, 120] } })
}

function arzt(): Zeichnung {
  return brust({ t: erw('kurz', '#231E1C', H6, 'papier'), nachRumpf: [...kittel('#9BD3BD'), ...stethoskop] })
}

function feuerwehrfrau(): Zeichnung {
  const jacke = '#2F3B57'
  const streifen = '#F2D55C'
  return brust({
    t: erw('zopf', '#4A3426', H2, jacke),
    oben: 6,
    nachRumpf: [
      { t: 'path', d: 'M46 82 L52 92 L60 84 L68 92 L74 82 Z', f: jacke, s: T, w: 2 },
      { t: 'rect', x: 27, y: 104, b: 66, h: 6, f: streifen, s: T, w: 1.6 },
    ],
    nachKopf: [
      { t: 'path', d: 'M33 40 Q33 12 60 12 Q87 12 87 40 Z', f: ROT, s: T, w: 2.4 },
      linie('M60 12 L60 22', 2),
      { t: 'path', d: 'M27 40 Q60 33 93 40 Q94 46 87 46 Q60 40 33 46 Q26 46 27 40 Z', f: ROT_D, s: T, w: 2.2 },
      { t: 'path', d: 'M53 22 L67 22 L67 30 Q60 36 53 30 Z', f: GELB, s: T, w: 1.8 },
      glanz('M40 30 Q42 20 50 17', 3, 0.7),
    ],
  })
}

function busfahrer(): Zeichnung {
  const hemd = '#A9C8EA'
  return brust({
    t: erw('kurz', '#8A6440', H2, hemd),
    hinten: [
      { t: 'rect', x: 2, y: 22, b: 116, h: 104, rx: 12, f: GLAS, s: T, w: 2.4 },
      linie('M10 36 Q30 30 40 30', 3, 'papier'),
    ],
    nachRumpf: [{ t: 'path', d: 'M57 86 L63 86 L65 104 L60 109 L55 104 Z', f: BLAU_D, s: T, w: 1.8 }],
    armL: { c: [18, 112], h: [28, 106] },
    armR: { c: [102, 112], h: [92, 106] },
    vorne: [
      { t: 'ellipse', cx: 60, cy: 112, rx: 34, ry: 12, f: 'none', s: T, w: 9 },
      { t: 'ellipse', cx: 60, cy: 112, rx: 34, ry: 12, f: 'none', s: DUNKEL, w: 5 },
      linie('M30 113 L52 113 M68 113 L90 113', 4.5, T),
      { t: 'ellipse', cx: 60, cy: 113, rx: 9, ry: 5, f: DUNKEL, s: T, w: 2 },
      hand(28, 106, H2, 6.5),
      hand(92, 106, H2, 6.5),
    ],
    oben: 20,
  })
}

function baeckerin(): Zeichnung {
  return brust({
    t: erw('lang', '#D5AE5E', H1, 'papier'),
    oben: 0,
    nachRumpf: [
      { t: 'path', d: 'M51 82 Q60 93 69 82 L66 86 Q60 92 54 86 Z', f: ROT, s: T, w: 1.8 },
      ...[50, 70].flatMap((x): Form[] => [{ t: 'circle', cx: x, cy: 98, r: 2.2, f: GRAU, s: T, w: 1.3 }, { t: 'circle', cx: x, cy: 108, r: 2.2, f: GRAU, s: T, w: 1.3 }]),
    ],
    nachKopf: [
      { t: 'path', d: 'M38 32 Q26 22 34 12 Q38 2 50 6 Q56 -2 66 4 Q78 0 84 10 Q94 18 82 32 Z', f: 'papier', s: T, w: 2.4 },
      linie('M50 18 Q52 24 50 30 M68 16 Q66 24 70 30', 1.8),
      { t: 'rect', x: 36, y: 28, b: 48, h: 10, rx: 3, f: 'papier', s: T, w: 2.2 },
    ],
    armL: { c: [16, 112], h: [36, 112] },
    armR: { c: [104, 112], h: [84, 112] },
    vorne: [
      { t: 'ellipse', cx: 60, cy: 112, rx: 25, ry: 12, f: '#D99A55', s: T, w: 2.4 },
      linie('M46 106 Q50 112 47 118 M58 104 Q62 112 59 120 M70 105 Q74 112 71 118', 2, '#9C6230'),
      glanz('M44 104 Q52 101 60 101', 2.4, 0.7),
      hand(36, 112, H1, 6.5),
      hand(84, 112, H1, 6.5),
    ],
  })
}

function bauarbeiterin(): Zeichnung {
  const weste = '#F08A3C'
  const reflex = '#F4F1E4'
  return brust({
    t: erw('zopf', '#231E1C', H5, BLAU),
    kleid: BLAU,
    oben: 8,
    nachRumpf: [
      { t: 'path', d: 'M30 124 L30 96 Q30 86 44 84 L52 84 L60 100 L68 84 L76 84 Q90 86 90 96 L90 124 Z', f: weste, s: T, w: 2.2 },
      { t: 'rect', x: 30, y: 104, b: 60, h: 5, f: reflex, s: T, w: 1.4 },
      { t: 'rect', x: 30, y: 114, b: 60, h: 5, f: reflex, s: T, w: 1.4 },
    ],
    nachKopf: [
      { t: 'path', d: 'M35 40 Q35 14 60 14 Q85 14 85 40 Z', f: GELB, s: T, w: 2.4 },
      { t: 'path', d: 'M52 16 L52 39 M68 16 L68 39', s: GELB_D, f: 'none', w: 2.4 },
      { t: 'rect', x: 27, y: 38, b: 66, h: 7, rx: 3.5, f: GELB, s: T, w: 2.2 },
      glanz('M40 32 Q41 22 48 18', 3, 0.7),
    ],
    armL: { c: [18, 114], h: [44, 109] },
    armR: { c: [100, 106], h: [70, 85] },
    vorne: [
      ...tube('M30 122 L86 70', HOLZ, 5),
      { t: 'path', d: 'M26 117.5 L34 126.5', s: T, f: 'none', w: 9 },
      { t: 'path', d: 'M26 117.5 L34 126.5', s: HOLZ, f: 'none', w: 5 },
      g('translate(88 68) rotate(-132)', [
        { t: 'path', d: 'M-12 -4 L12 -4 L12 14 Q12 26 0 30 Q-12 26 -12 14 Z', f: METALL, s: T, w: 2.4 },
        linie('M0 -4 L0 6', 2),
        glanz('M-7 2 L-7 16', 2.4, 0.9),
      ]),
      hand(44, 109, H5, 6.5),
      hand(70, 85, H5, 6.5),
    ],
  })
}

function polizist(): Zeichnung {
  const uni = '#34507F'
  return brust({
    t: erw('kurz', '#2A2522', H3, uni),
    oben: 8,
    nachRumpf: [
      { t: 'path', d: 'M48 82 L54 92 L60 86 L66 92 L72 82 Z', f: '#A9C8EA', s: T, w: 1.8 },
      { t: 'path', d: 'M72 96 L80 94 L88 96 L88 104 Q80 110 72 104 Z', f: GELB, s: T, w: 1.8 },
    ],
    nachKopf: [
      { t: 'path', d: 'M30 26 Q36 12 60 12 Q84 12 90 26 Q88 34 82 36 L38 36 Q32 34 30 26 Z', f: uni, s: T, w: 2.4 },
      { t: 'rect', x: 37, y: 31, b: 46, h: 8, rx: 2, f: '#1F2A44', s: T, w: 2 },
      { t: 'path', d: 'M38 39 Q60 48 82 39 Z', f: T, s: T, w: 2.2 },
      { t: 'path', d: 'M60 17 L63 22 L68 23 L64 27 L65 32 L60 29.5 L55 32 L56 27 L52 23 L57 22 Z', f: GELB, s: T, w: 1.2 },
    ],
    armR: { c: [108, 86], h: [104, 62] },
  })
}

function verkaeufer(): Zeichnung {
  const obst: Form[] = [
    { t: 'circle', cx: 16, cy: 98, r: 7, f: ROT, s: T, w: 2 },
    { t: 'circle', cx: 30, cy: 97, r: 7, f: ROT, s: T, w: 2 },
    { t: 'circle', cx: 23, cy: 92, r: 7, f: '#E05C4E', s: T, w: 2 },
    { t: 'path', d: 'M88 104 Q84 92 92 88 Q92 82 96 82 Q100 84 99 90 Q104 96 100 104 Z', f: HELLGRUEN, s: T, w: 2 },
    { t: 'path', d: 'M102 104 Q98 92 106 88 Q106 82 110 82 Q114 84 113 90 Q118 96 114 104 Z', f: '#A9CF7E', s: T, w: 2 },
  ]
  return brust({
    t: erw('kurz', '#4A3426', H3, '#F2B04C'),
    oben: 0,
    hinten: [
      { t: 'path', d: 'M4 0 L116 0 L116 12 Q109 20 102 12 Q95 20 88 12 Q81 20 74 12 Q67 20 60 12 Q53 20 46 12 Q39 20 32 12 Q25 20 18 12 Q11 20 4 12 Z', f: 'papier', s: T, w: 2.2 },
      ...[4, 32, 60, 88].map((x): Form => ({ t: 'path', d: `M${x} 0 L${x + 14} 0 L${x + 14} 12 Q${x + 7} 20 ${x} 12 Z`, f: ROT, s: T, w: 2 })),
      linie('M8 14 L8 102 M112 14 L112 102', 4, HOLZ_D),
    ],
    nachRumpf: [{ t: 'path', d: 'M44 88 L76 88 L78 124 L42 124 Z', f: GRUEN, s: T, w: 2 }, linie('M44 88 L50 82 M76 88 L70 82', 2)],
    armL: null,
    armR: { c: [106, 92], h: [100, 74] },
    vorne: [
      { t: 'circle', cx: 101, cy: 66, r: 8, f: ROT, s: T, w: 2 },
      linie('M101 58 L102 54', 2),
      hand(100, 74, H3, 6.5),
      { t: 'rect', x: 2, y: 102, b: 116, h: 24, rx: 3, f: HOLZ, s: T, w: 2.4 },
      linie('M2 114 L118 114', 1.8, HOLZ_D),
      ...obst,
    ],
  })
}

function clown(): Zeichnung {
  const kragen: Form[] = []
  const farben = [ROT, BLAU, GRUEN, GELB, LILA]
  for (let i = 0; i < 9; i++) {
    const a = Math.PI * (0.05 + (0.9 * i) / 8)
    kragen.push({ t: 'circle', cx: 60 - Math.cos(a) * 30, cy: 84 + Math.sin(a) * 8, r: 7.5, f: farben[i % farben.length], s: T, w: 2 })
  }
  return brust({
    t: erw('locken', ORANGE, H1, GELB),
    oben: 2,
    gesicht: [...zuege('lacht'), { t: 'circle', cx: 50, cy: 54, r: 10, f: ROT, s: T, w: 3 }, { t: 'circle', cx: 46.5, cy: 50.5, r: 3, f: 'papier', s: 'none' }],
    nachRumpf: [
      { t: 'circle', cx: 60, cy: 104, r: 4.5, f: ROT, s: T, w: 2 },
      { t: 'circle', cx: 60, cy: 117, r: 4.5, f: BLAU, s: T, w: 2 },
      ...kragen,
    ],
    nachKopf: [
      { t: 'path', d: 'M50 26 L52 8 L70 8 L72 26 Z', f: GRUEN, s: T, w: 2.2 },
      { t: 'rect', x: 44, y: 24, b: 34, h: 5, rx: 2.5, f: GRUEN_D, s: T, w: 2 },
      { t: 'rect', x: 52, y: 17, b: 18, h: 4, f: ROT, s: T, w: 1.4 },
    ],
  })
}

function ritterin(): Zeichnung {
  const stahl = '#B9C2CE'
  return brust({
    t: erw('kurz', '#B5532F', H3, stahl),
    oben: 0,
    gesicht: zuege('lacht'),
    nachRumpf: [
      ...[66, 75, 84, 93].map((y, i): Form => ({ t: 'ellipse', cx: 36 - i * 1.5, cy: y, rx: 5.5, ry: 6, f: '#B5532F', s: T, w: 2 })),
      { t: 'rect', x: 29, y: 99, b: 9, h: 4, rx: 2, f: GRUEN, s: T, w: 1.4 },
      { t: 'path', d: 'M40 86 L80 86 L80 124 L40 124 Z', f: BLAU, s: T, w: 2.2 },
      { t: 'path', d: 'M60 96 L63 102 L70 103 L65 108 L66 115 L60 112 L54 115 L55 108 L50 103 L57 102 Z', f: GELB, s: T, w: 1.6 },
    ],
    nachKopf: [
      { t: 'path', d: 'M32 60 L32 42 Q32 16 60 16 Q88 16 88 42 L88 60 L80 60 L80 44 Q80 36 60 36 Q40 36 40 44 L40 60 Z', f: stahl, s: T, w: 2.4 },
      linie('M60 16 L60 36', 2),
      glanz('M38 36 Q39 24 48 20', 3, 0.7),
      { t: 'path', d: 'M60 16 Q56 2 70 0 Q80 0 84 6 Q74 4 70 10 Q66 14 60 16 Z', f: ROT, s: T, w: 2 },
    ],
    armL: { c: [18, 106], h: [30, 104] },
    vorne: [
      { t: 'path', d: 'M12 92 L46 92 L46 106 Q46 120 29 127 Q12 120 12 106 Z', f: ROT, s: T, w: 2.4 },
      { t: 'path', d: 'M29 98 L32 104 L38 105 L34 109 L35 116 L29 113 L23 116 L24 109 L20 105 L26 104 Z', f: GELB, s: T, w: 1.5 },
    ],
  })
}

function magier(): Zeichnung {
  const robe = '#6E58B8'
  const stern = (x: number, y: number, s = 1): Form =>
    g(`translate(${x} ${y}) scale(${s})`, [{ t: 'path', d: 'M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z', f: GELB, s: 'none' }])
  return brust({
    t: erw('glatze-bart', '#8A6440', H4, robe),
    oben: -8,
    nachRumpf: [stern(46, 104, 1.2), stern(74, 112, 1), { t: 'path', d: 'M70 94 Q64 100 70 106 Q62 106 62 100 Q62 94 70 94 Z', f: GELB, s: 'none' }],
    nachKopf: [
      { t: 'path', d: 'M34 36 Q48 26 54 2 Q58 -10 70 -4 Q66 -2 66 4 Q72 24 86 36 Z', f: robe, s: T, w: 2.4 },
      { t: 'path', d: 'M22 38 Q60 26 98 38 Q60 46 22 38 Z', f: '#5A4699', s: T, w: 2.2 },
      stern(56, 20, 1.2),
      stern(70, 28, 0.9),
      stern(62, 6, 0.8),
    ],
    armR: { c: [106, 96], h: [100, 76] },
    vorne: [
      ...tube('M100 76 L112 48', T, 3),
      { t: 'path', d: 'M112 38 L114.5 44 L121 45 L116 49 L117.5 56 L112 52.5 L106.5 56 L108 49 L103 45 L109.5 44 Z', f: GELB, s: T, w: 1.6 },
      hand(100, 76, H4, 6.5),
    ],
  })
}

function schauspieler(): Zeichnung {
  const vorhang = '#C9473E'
  return brust({
    t: erw('kurz', '#231E1C', H5, '#3E8C86'),
    oben: 0,
    hinten: [
      { t: 'path', d: 'M0 0 L26 0 Q22 40 30 70 Q18 80 20 126 L0 126 Z', f: vorhang, s: T, w: 2.2 },
      { t: 'path', d: 'M120 0 L94 0 Q98 40 90 70 Q102 80 100 126 L120 126 Z', f: vorhang, s: T, w: 2.2 },
      linie('M10 4 Q8 60 8 124 M110 4 Q112 60 112 124', 1.6, ROT_D),
      { t: 'path', d: 'M0 0 L120 0 L120 8 Q110 16 100 8 Q90 16 80 8 Q70 16 60 8 Q50 16 40 8 Q30 16 20 8 Q10 16 0 8 Z', f: GELB_D, s: T, w: 2 },
    ],
    nachRumpf: [{ t: 'path', d: 'M51 82 L60 96 L69 82', f: 'papier', s: T, w: 2 }],
    nachKopf: [
      { t: 'path', d: 'M62 22 Q78 2 100 6 Q88 10 82 20 Z', f: GELB, s: T, w: 2 },
      { t: 'path', d: 'M38 30 Q40 14 60 14 Q80 14 82 30 Z', f: LILA, s: T, w: 2.4 },
      { t: 'path', d: 'M24 32 Q60 22 96 32 Q60 40 24 32 Z', f: '#7A63B0', s: T, w: 2.2 },
    ],
    armR: { c: [110, 86], h: [106, 60] },
  })
}

// --- 3. Körperteile am Kind ---------------------------------------------------------------------
const KK: Mass = { kx: 60, ky: 54, kr: 38, schulterY: 94, shirtUnten: 120, fussY: 120, breite: 40 }
const kopfKind = kind('kurz', '#2A2522', H3, '#6C8FC6')

/** Großer Kinderkopf mit Schultern (Raster 120 × 120). `teil` liegt über dem Gesicht. */
function kopfbild(o: { t?: Typ; zuege?: Form[]; teil?: Form[]; ohr?: Form[]; haarSchein?: boolean }): Zeichnung {
  const t = o.t ?? kopfKind
  const { kx, ky, kr } = KK
  const hinten = haarHinten(t, KK)
  return z([0, 4, 120, 116], [
    ...(o.haarSchein ? schein(hinten, 10) : []),
    ...hinten,
    { t: 'rect', x: 51, y: 84, b: 18, h: 16, f: t.haut, s: T, w: 2.2 },
    { t: 'path', d: 'M14 120 Q16 98 42 96 L78 96 Q104 98 106 120 Z', f: t.shirt, s: T, w: 2.4 },
    { t: 'path', d: 'M50 96 Q60 106 70 96', f: t.haut, s: T, w: 2.2 },
    { t: 'circle', cx: kx - kr, cy: ky + 2, r: 7.5, f: t.haut, s: T, w: 2.2 },
    ...(o.ohr ?? [{ t: 'circle', cx: kx + kr, cy: ky + 2, r: 7.5, f: t.haut, s: T, w: 2.2 } as Form]),
    { t: 'circle', cx: kx, cy: ky, r: kr, f: t.haut, s: T, w: 2.6 },
    ...haarVorne(t, KK),
    aufKopf([...(o.zuege ?? zuege('laechelt')), ...(o.teil ?? [])], kx, ky, kr),
  ], 2.4)
}

const NASE: Form = { t: 'path', d: 'M43 59 Q42 49 50 48 Q58 49 57 59 Q54 62 50 61 Q46 62 43 59 Z', f: '#C99366', s: T, w: 2.6 }

function nase(): Zeichnung {
  const ohne = [...WANGEN, ...BRAUEN, ...AUGEN, linie('M37 69 Q50 78 63 69', 3.4)]
  return kopfbild({ zuege: ohne, teil: [...schein([NASE], 10), NASE, glanz('M46 53 Q48 51 50 51', 2, 0.7)] })
}

function mund(): Zeichnung {
  const lippe: Form[] = [
    { t: 'path', d: 'M30 61 Q50 64 70 61 Q67 84 50 84 Q33 84 30 61 Z', f: T, s: T, w: 2.4 },
    { t: 'path', d: 'M34 63 Q50 66 66 63 L65 67 Q50 69 35 67 Z', f: 'papier', s: 'none' },
    { t: 'path', d: 'M40 78 Q50 71 60 78 Q56 83 50 83 Q44 83 40 78 Z', f: '#E8837A', s: 'none' },
  ]
  return kopfbild({ zuege: [...WANGEN, ...BRAUEN, ...AUGEN], teil: [...schein([lippe[0]], 10), ...lippe] })
}

function augeGross(x: number): Form[] {
  return [
    { t: 'ellipse', cx: x, cy: 43, rx: 10, ry: 8.5, f: 'papier', s: T, w: 2.6 },
    { t: 'circle', cx: x, cy: 43.5, r: 6, f: '#7A5236', s: 'none' },
    { t: 'circle', cx: x, cy: 43.5, r: 3, f: T, s: 'none' },
    { t: 'circle', cx: x + 2.2, cy: 41, r: 1.8, f: 'papier', s: 'none' },
    linie(`M${x - 8} 36 L${x - 11} 32 M${x} 34.5 L${x} 30 M${x + 8} 36 L${x + 11} 32`, 2.2),
  ]
}

function auge(): Zeichnung {
  return kopfbild({
    zuege: [...WANGEN, ...BRAUEN.map((f) => g('translate(0 -4)', [f])), linie('M37 66 Q50 76 63 66', 3.4)],
    teil: [...schein([{ t: 'ellipse', cx: 35, cy: 43, rx: 10, ry: 8.5 }], 12), ...augeGross(35), ...augeGross(65)],
  })
}

function ohr(): Zeichnung {
  const { kx, ky, kr } = KK
  const x = kx + kr + 1
  const y = ky + 2
  const form: Form = { t: 'ellipse', cx: x, cy: y, rx: 9, ry: 12.5, f: kopfKind.haut, s: T, w: 2.4 }
  return kopfbild({
    ohr: [...schein([form], 10), form, linie(`M${x - 2} ${y + 7} Q${x + 5} ${y + 4} ${x + 4} ${y - 3} Q${x + 2} ${y - 8} ${x - 3} ${y - 6}`, 2)],
  })
}

function haare(): Zeichnung {
  return kopfbild({ t: kind('lang', '#B5532F', H1, GRUEN), zuege: zuege('lacht'), haarSchein: true })
}

const KOERPER_KIND = kind('kurz', '#4A3426', H4, ORANGE, '#4F6D99')

function bauch(): Zeichnung {
  const t = KOERPER_KIND
  const bauchForm: Form = { t: 'path', d: 'M31 86 Q50 80 69 86 Q76 97 70 108 L30 108 Q24 97 31 86 Z', f: t.haut, s: T, w: 2.4 }
  return z([12, 4, 76, 120], figur({
    t,
    nachTorso: [
      ...schein([bauchForm], 9),
      bauchForm,
      { t: 'path', d: 'M30 81 Q50 75 70 81 L71 88 Q50 82 29 88 Z', f: t.shirt, s: T, w: 2.2 },
      { t: 'path', d: 'M29 105 L71 105 L71 111 Q71 113 68 113 L32 113 Q29 113 29 111 Z', f: t.hose, s: T, w: 2 },
      { t: 'path', d: 'M47.5 97 Q50 101 52.5 97', f: 'none', s: T, w: 2.2 },
    ],
    armL: { c: [20, 78], h: [31, 85] },
    armR: { c: [80, 78], h: [69, 85] },
  }))
}

function arm(): Zeichnung {
  const t = KOERPER_KIND
  return z([12, 2, 90, 158], figur({
    t,
    hinten: schein([{ t: 'path', d: 'M66 67 Q84 54 88 26' }, { t: 'circle', cx: 88, cy: 24, r: 7 }], 20),
    armR: { c: [84, 54], h: [88, 26] },
  }))
}

function bein(): Zeichnung {
  const t = KOERPER_KIND
  return z([0, 2, 100, 158], figur({
    t,
    hinten: schein([{ t: 'path', d: 'M42 108 L18 136' }, { t: 'circle', cx: 14, cy: 140, r: 6 }], 22),
    fussL: [18, 136],
    nachTorso: [schuh(18, 137, false, 40)],
    armL: { c: [24, 70], h: [12, 76] },
    armR: { c: [76, 70], h: [88, 76] },
  }))
}

function fuss(): Zeichnung {
  const zehen: [number, number, number][] = [
    [41, 30, 11.5],
    [58.5, 24, 8],
    [71, 27, 7.2],
    [81, 33.5, 6.4],
    [88.5, 42, 5.6],
  ]
  const teile: Form[] = [
    { t: 'path', d: 'M30 46 Q30 32 46 32 L76 34 Q92 40 90 56 Q88 80 78 100 Q70 116 54 116 Q36 116 34 98 Q30 76 30 46 Z' },
    ...zehen.map(([cx, cy, r]): Form => ({ t: 'circle', cx, cy, r })),
  ]
  return z([20, 12, 80, 108], [
    ...silhouette(teile, H2, 4.8),
    ...zehen.map(([cx, cy, r]): Form => ({ t: 'ellipse', cx: cx + r * 0.05, cy: cy - r * 0.32, rx: r * 0.52, ry: r * 0.42, f: '#FBEDE2', s: T, w: 1.4 })),
    linie('M36 60 Q42 76 40 92', 1.8, '#C99366'),
  ])
}

/** Offene Kinderhand in Hautfarbe (motive.ts: `hand` ist eine helle Schreibvorlage). */
function handOffen(): Zeichnung {
  const finger: [number, number, number, number][] = [
    [62, 150, 58, -54],
    [76, 122, 80, -16],
    [100, 116, 90, -3],
    [123, 120, 82, 9],
    [142, 134, 60, 22],
  ]
  const b = 28
  const kapsel = (x: number, y: number, l: number, w: number): Form =>
    g(`translate(${x} ${y}) rotate(${w})`, [{ t: 'rect', x: -b / 2, y: -l, b, h: l + b / 2, rx: b / 2 }])
  const teile: Form[] = [{ t: 'rect', x: 54, y: 110, b: 102, h: 110, rx: 44 }, ...finger.map(([x, y, l, w]) => kapsel(x, y, l, w))]
  const naegel = finger.map(([x, y, l, w]): Form =>
    g(`translate(${x} ${y}) rotate(${w})`, [{ t: 'rect', x: -7, y: -l + 4, b: 14, h: 14, rx: 6, f: '#FBEDE2', s: T, w: 2 }]),
  )
  return z([0, 8, 200, 220], [
    ...silhouette(teile, H2, 6),
    ...naegel,
    linie('M78 178 Q104 196 132 176', 3, '#C99366'),
    linie('M86 156 Q108 150 128 160', 3, '#C99366'),
  ], 3)
}

// --- 4. Kleidung und Gepäck -----------------------------------------------------------------------
const tropfen = (x: number, y: number, s = 1): Form =>
  g(`translate(${x} ${y}) scale(${s})`, [{ t: 'path', d: 'M0 -7 Q-5 -1 -5 2.5 Q-5 7 0 7 Q5 7 5 2.5 Q5 -1 0 -7 Z', f: HELLBLAU, s: T, w: 1.8 }])

function rippen(x1: number, x2: number, y1: number, y2: number, abstand: number, farbe: string): Form[] {
  const out: Form[] = []
  for (let x = x1 + abstand; x < x2 - abstand / 2; x += abstand) out.push(linie(`M${x.toFixed(1)} ${y1} L${x.toFixed(1)} ${y2}`, 1.5, farbe))
  return out
}

function winterjacke(): Zeichnung {
  const j = ROT
  const d = ROT_D
  return z([4, 0, 112, 112], [
    { t: 'path', d: 'M34 30 Q32 2 60 2 Q88 2 86 30 Z', f: j, s: T, w: 2.4 },
    { t: 'path', d: 'M42 28 Q42 10 60 10 Q78 10 78 28 Z', f: CREME, s: T, w: 2.2 },
    { t: 'path', d: 'M38 28 Q22 30 18 50 L12 96 L32 98 L36 58 Z', f: j, s: T, w: 2.4 },
    { t: 'path', d: 'M82 28 Q98 30 102 50 L108 96 L88 98 L84 58 Z', f: j, s: T, w: 2.4 },
    linie('M17 58 L35 61 M14 80 L33 82', 2, d),
    linie('M103 58 L85 61 M106 80 L87 82', 2, d),
    { t: 'path', d: 'M12 92 L32 94 L32 103 L11 101 Z', f: d, s: T, w: 2.2 },
    { t: 'path', d: 'M108 92 L88 94 L88 103 L109 101 Z', f: d, s: T, w: 2.2 },
    { t: 'path', d: 'M36 26 L84 26 L88 104 Q88 108 84 108 L36 108 Q32 108 32 104 Z', f: j, s: T, w: 2.4 },
    linie('M34 50 Q60 55 86 50 M33 74 Q60 79 87 74', 2, d),
    { t: 'path', d: 'M44 24 L76 24 L76 34 Q60 38 44 34 Z', f: j, s: T, w: 2.2 },
    { t: 'line', x1: 60, y1: 34, x2: 60, y2: 108, s: DUNKEL, w: 4.5 },
    { t: 'line', x1: 60, y1: 34, x2: 60, y2: 108, s: METALL, w: 2, dash: '2 2' },
    { t: 'rect', x: 56.5, y: 38, b: 7, h: 11, rx: 2, f: METALL, s: T, w: 1.8 },
    linie('M40 84 L47 97 M80 84 L73 97', 2.6),
    glanz('M40 34 Q38 42 39 46', 3, 0.6),
  ])
}

function pulli(): Zeichnung {
  const p = '#6C8FC6'
  const r = '#4E6FA6'
  return z([4, 4, 112, 100], [
    { t: 'path', d: 'M38 18 Q22 22 18 42 L12 88 L30 90 L34 50 Z', f: p, s: T, w: 2.4 },
    { t: 'path', d: 'M82 18 Q98 22 102 42 L108 88 L90 90 L86 50 Z', f: p, s: T, w: 2.4 },
    { t: 'path', d: 'M17.5 46 L33.5 48 L32.5 58 L16 57 Z', f: GELB, s: T, w: 1.8 },
    { t: 'path', d: 'M102.5 46 L86.5 48 L87.5 58 L104 57 Z', f: GELB, s: T, w: 1.8 },
    { t: 'path', d: 'M11.5 86 L30.5 88 L29.5 98 L10.5 96 Z', f: r, s: T, w: 2.2 },
    { t: 'path', d: 'M108.5 86 L89.5 88 L90.5 98 L109.5 96 Z', f: r, s: T, w: 2.2 },
    { t: 'path', d: 'M36 16 Q48 12 60 13 Q72 12 84 16 L88 90 L32 90 Z', f: p, s: T, w: 2.4 },
    { t: 'path', d: 'M34.2 46 L85.8 46 L86.4 58 L33.6 58 Z', f: GELB, s: T, w: 1.8 },
    { t: 'rect', x: 32, y: 88, b: 56, h: 12, rx: 2, f: r, s: T, w: 2.2 },
    ...rippen(32, 88, 90, 98, 6, '#344E7E'),
    { t: 'ellipse', cx: 60, cy: 16, rx: 16, ry: 7, f: r, s: T, w: 2.2 },
    { t: 'ellipse', cx: 60, cy: 15, rx: 10, ry: 3.6, f: '#2E3F63', s: T, w: 1.6 },
  ])
}

function hose(): Zeichnung {
  const j = '#4F79B8'
  const d = '#3A5C92'
  return z([16, 2, 88, 116], [
    { t: 'path', d: 'M30 12 L90 12 L96 108 L66 108 L60 48 L54 108 L24 108 Z', f: j, s: T, w: 2.4 },
    { t: 'path', d: 'M30 8 L90 8 L90.4 20 L29.6 20 Z', f: d, s: T, w: 2.2 },
    { t: 'rect', x: 38, y: 5, b: 5, h: 17, rx: 1.5, f: d, s: T, w: 1.6 },
    { t: 'rect', x: 77, y: 5, b: 5, h: 17, rx: 1.5, f: d, s: T, w: 1.6 },
    { t: 'circle', cx: 64, cy: 14, r: 3, f: METALL, s: T, w: 1.6 },
    linie('M64 20 Q64 36 60 44', 2, d),
    linie('M31 22 Q40 30 47 20 M89 22 Q80 30 73 20', 2, d),
    { t: 'path', d: 'M24 102 L54 102 L54 112 L23.5 112 Z', f: '#7FA3D6', s: T, w: 2.2 },
    { t: 'path', d: 'M66 102 L96 102 L96.5 112 L66 112 Z', f: '#7FA3D6', s: T, w: 2.2 },
  ])
}

function bommel(x: number, y: number, r: number, f = CREME): Form[] {
  const teile: Form[] = [{ t: 'circle', cx: x, cy: y, r: r * 0.75 }]
  for (let i = 0; i < 9; i++) {
    const a = (Math.PI * 2 * i) / 9
    teile.push({ t: 'circle', cx: x + Math.cos(a) * r * 0.62, cy: y + Math.sin(a) * r * 0.62, r: r * 0.42 })
  }
  return silhouette(teile, f, 3.6)
}

function muetze(): Zeichnung {
  return z([12, 4, 96, 92], [
    { t: 'path', d: 'M22 74 Q20 28 60 26 Q100 28 98 74 Z', f: ROT, s: T, w: 2.4 },
    linie('M40 72 Q36 46 48 30 M60 72 L60 27 M80 72 Q84 46 72 30', 2, ROT_D),
    { t: 'path', d: 'M18 68 Q60 60 102 68 L102 88 Q60 80 18 88 Z', f: '#E8786C', s: T, w: 2.4 },
    ...[24, 31, 38, 45, 52, 59, 66, 73, 80, 87, 94].map((x) => linie(`M${x} ${68 - Math.sin(((x - 18) / 84) * Math.PI) * 6.5} L${x} ${88 - Math.sin(((x - 18) / 84) * Math.PI) * 6.5}`, 1.5, ROT_D)),
    ...bommel(60, 22, 15),
  ])
}

function schal(): Zeichnung {
  const s1 = GRUEN
  const st = GELB
  const fransen = (x1: number, x2: number, y: number): Form[] => {
    const out: Form[] = []
    for (let x = x1 + 3; x < x2 - 1; x += 4) out.push(linie(`M${x} ${y} L${x - 0.5} ${y + 7}`, 2))
    return out
  }
  return z([12, 8, 96, 106], [
    { t: 'ellipse', cx: 60, cy: 34, rx: 34, ry: 16, f: 'none', s: T, w: 19 },
    { t: 'ellipse', cx: 60, cy: 34, rx: 34, ry: 16, f: 'none', s: s1, w: 13.6 },
    ...fransen(70, 92, 96),
    { t: 'path', d: 'M62 42 L84 42 L92 97 L70 98 Z', f: s1, s: T, w: 2.4 },
    { t: 'path', d: 'M67 68 L88.2 70 L89.4 78 L68 77 Z', f: st, s: T, w: 1.8 },
    { t: 'path', d: 'M69 84 L90.4 86 L91.3 92 L69.8 92 Z', f: st, s: T, w: 1.8 },
    ...fransen(36, 60, 104),
    { t: 'path', d: 'M42 40 L66 40 L60 104 L36 103 Z', f: s1, s: T, w: 2.4 },
    { t: 'path', d: 'M39.8 72 L62.8 72 L62 80 L39 80 Z', f: st, s: T, w: 1.8 },
    { t: 'path', d: 'M38.3 88 L61.3 88 L60.7 95 L37.6 95 Z', f: st, s: T, w: 1.8 },
    { t: 'rect', x: 42, y: 34, b: 26, h: 16, rx: 6, f: s1, s: T, w: 2.4 },
  ])
}

function faeustling(x: number, y: number, winkel: number, spiegel: boolean): Form {
  const teile: Form[] = [
    { t: 'rect', x: -17, y: -36, b: 36, h: 64, rx: 18 },
    g('translate(-15 -2) rotate(-28)', [{ t: 'rect', x: -7, y: -15, b: 14, h: 26, rx: 7 }]),
  ]
  return g(`translate(${x} ${y}) rotate(${winkel}) scale(${spiegel ? -1 : 1} 1)`, [
    ...silhouette(teile, BLAU, 4.6),
    { t: 'rect', x: -19, y: 20, b: 40, h: 16, rx: 4, f: CREME, s: T, w: 2.4 },
    ...rippen(-19, 21, 22, 34, 5, '#D8C7A0'),
    herz(2, -12, 1.3, ROT),
  ])
}

function handschuhe(): Zeichnung {
  return z([6, 6, 108, 96], [faeustling(36, 56, -10, true), faeustling(84, 56, 10, false)])
}

function stiefel(farbe: string, dunkel: string): Form[] {
  return [
    { t: 'path', d: 'M28 12 L62 12 L62 60 Q64 70 78 72 Q96 76 96 88 L96 94 L26 94 Z', f: farbe, s: T, w: 2.4 },
    { t: 'path', d: 'M24 92 L98 92 L98 98 Q98 102 94 102 L28 102 Q24 102 24 98 Z', f: DUNKEL, s: T, w: 2.2 },
    { t: 'rect', x: 25, y: 6, b: 40, h: 10, rx: 3, f: dunkel, s: T, w: 2.2 },
    glanz('M34 22 L34 72', 3.4, 0.7),
  ]
}

function gummistiefel(): Zeichnung {
  return z([6, 0, 118, 106], [g('translate(18 -2)', stiefel(GELB_D, '#B98A20')), ...stiefel(GELB, GELB_D)])
}

function socke(): Zeichnung {
  const k = '#6CB7D9'
  return z([16, 2, 90, 104], [
    { t: 'path', d: 'M30 8 L60 8 L60 56 Q60 64 70 66 L86 68 Q102 70 102 86 Q102 102 86 102 L46 102 Q28 102 28 84 Z', f: k, s: T, w: 2.4 },
    { t: 'path', d: 'M29.4 30 L60 30 L60 40 L29 40 Z', f: GELB, s: T, w: 1.8 },
    { t: 'path', d: 'M28.9 50 L60 50 L60.5 60 L28.6 60 Z', f: GELB, s: T, w: 1.8 },
    { t: 'path', d: 'M28.4 74 Q28 102 46 102 L52 102 Q40 92 42 74 Z', f: ROT, s: T, w: 2 },
    { t: 'path', d: 'M84 68.5 Q102 70 102 86 Q102 102 86 102 L84 102 Q92 86 84 68.5 Z', f: ROT, s: T, w: 2 },
    { t: 'path', d: 'M30 4 L60 4 L60 14 L30 14 Z', f: ROT, s: T, w: 2.2 },
    ...rippen(30, 60, 5, 13, 5, ROT_D),
  ])
}

function schlafanzug(): Zeichnung {
  const s1 = '#A9C8EA'
  const d = '#7FA6D0'
  const stern = (x: number, y: number, k = 1): Form =>
    g(`translate(${x} ${y}) scale(${k})`, [{ t: 'path', d: 'M0 -4.5 L1.3 -1.4 L4.5 -1.2 L2 1 L2.8 4.3 L0 2.5 L-2.8 4.3 L-2 1 L-4.5 -1.2 L-1.3 -1.4 Z', f: GELB, s: T, w: 0.8 }])
  return z([4, 2, 112, 124], [
    { t: 'path', d: 'M38 64 L82 64 L88 122 L64 122 L60 86 L56 122 L32 122 Z', f: s1, s: T, w: 2.4 },
    { t: 'path', d: 'M32.5 114 L56 114 L56 122 L32 122 Z', f: d, s: T, w: 2 },
    { t: 'path', d: 'M64 114 L87.3 114 L88 122 L64 122 Z', f: d, s: T, w: 2 },
    stern(46, 96), stern(74, 104), stern(70, 84, 0.8),
    { t: 'path', d: 'M40 8 Q24 12 20 28 L14 60 L30 62 L34 32 Z', f: s1, s: T, w: 2.4 },
    { t: 'path', d: 'M80 8 Q96 12 100 28 L106 60 L90 62 L86 32 Z', f: s1, s: T, w: 2.4 },
    { t: 'path', d: 'M14.3 56 L30.5 58 L29.8 64 L13.5 62 Z', f: d, s: T, w: 2 },
    { t: 'path', d: 'M105.7 56 L89.5 58 L90.2 64 L106.5 62 Z', f: d, s: T, w: 2 },
    { t: 'path', d: 'M38 6 L82 6 L86 70 L34 70 Z', f: s1, s: T, w: 2.4 },
    { t: 'path', d: 'M46 6 L60 22 L50 28 L40 10 Z', f: d, s: T, w: 2 },
    { t: 'path', d: 'M74 6 L60 22 L70 28 L80 10 Z', f: d, s: T, w: 2 },
    linie('M60 22 L60 70', 2),
    ...[34, 46, 58].map((y): Form => ({ t: 'circle', cx: 64, cy: y, r: 2.4, f: 'papier', s: T, w: 1.4 })),
    { t: 'path', d: 'M78 32 Q70 38 76 46 Q66 46 66 39 Q66 31 78 32 Z', f: GELB, s: T, w: 1.4 },
    stern(46, 42), stern(50, 60, 0.8), stern(24, 40, 0.8), stern(96, 44, 0.8),
  ])
}

function regenjacke(): Zeichnung {
  const j = GELB
  const d = GELB_D
  return z([0, 0, 120, 112], [
    tropfen(10, 22, 1.1), tropfen(110, 16, 1.1), tropfen(8, 66), tropfen(112, 58), tropfen(108, 98, 1.1), tropfen(12, 104, 0.9),
    { t: 'path', d: 'M36 30 Q34 2 60 2 Q86 2 84 30 Z', f: j, s: T, w: 2.4 },
    { t: 'path', d: 'M44 28 Q44 12 60 12 Q76 12 76 28 Z', f: d, s: T, w: 2.2 },
    { t: 'path', d: 'M38 28 Q24 30 22 50 L18 98 L34 98 L37 58 Z', f: j, s: T, w: 2.4 },
    { t: 'path', d: 'M82 28 Q96 30 98 50 L102 98 L86 98 L83 58 Z', f: j, s: T, w: 2.4 },
    { t: 'path', d: 'M38 26 L82 26 L86 108 L34 108 Z', f: j, s: T, w: 2.4 },
    linie('M60 28 L60 108', 2),
    ...[44, 62, 80].map((y): Form => ({ t: 'rect', x: 54, y, b: 12, h: 4.5, rx: 2.2, f: BRAUN, s: T, w: 1.4 })),
    { t: 'path', d: 'M38 80 L52 80 L52 100 L38 100 Z', f: j, s: T, w: 2 },
    { t: 'path', d: 'M37 78 L53 78 L53 85 L37 85 Z', f: d, s: T, w: 2 },
    { t: 'path', d: 'M68 80 L82 80 L82 100 L68 100 Z', f: j, s: T, w: 2 },
    { t: 'path', d: 'M67 78 L83 78 L83 85 L67 85 Z', f: d, s: T, w: 2 },
    glanz('M42 34 L41 70', 3, 0.7),
  ])
}

function kappe(): Zeichnung {
  return z([4, 18, 108, 74], [
    { t: 'path', d: 'M36 62 Q10 60 6 72 Q6 82 24 80 Q48 78 68 66 Z', f: BLAU_D, s: T, w: 2.4 },
    { t: 'path', d: 'M30 66 Q28 26 64 24 Q100 26 100 64 Q66 72 30 66 Z', f: BLAU, s: T, w: 2.4 },
    linie('M64 24 Q50 40 50 67 M64 24 Q82 40 84 66', 2, BLAU_D),
    { t: 'path', d: 'M42 44 L44.3 49 L49.5 49.5 L45.5 53 L46.8 58 L42 55.3 L37.2 58 L38.5 53 L34.5 49.5 L39.7 49 Z', f: GELB, s: T, w: 1.4 },
    { t: 'ellipse', cx: 64, cy: 24, rx: 5, ry: 3, f: BLAU_D, s: T, w: 1.8 },
    glanz('M76 34 Q86 40 90 50', 3, 0.6),
  ])
}

function koffer(): Zeichnung {
  const k = '#4E9CB0'
  const d = '#3A7F92'
  return z([8, 2, 104, 108], [
    { t: 'path', d: 'M46 22 L46 12 Q46 8 50 8 L70 8 Q74 8 74 12 L74 22', s: T, f: 'none', w: 8 },
    { t: 'path', d: 'M46 22 L46 12 Q46 8 50 8 L70 8 Q74 8 74 12 L74 22', s: DUNKEL, f: 'none', w: 4 },
    { t: 'circle', cx: 30, cy: 102, r: 6, f: T, s: T, w: 2 },
    { t: 'circle', cx: 90, cy: 102, r: 6, f: T, s: T, w: 2 },
    { t: 'rect', x: 16, y: 20, b: 88, h: 80, rx: 10, f: k, s: T, w: 2.6 },
    { t: 'rect', x: 32, y: 20, b: 7, h: 80, f: d, s: T, w: 1.8 },
    { t: 'rect', x: 81, y: 20, b: 7, h: 80, f: d, s: T, w: 1.8 },
    { t: 'circle', cx: 60, cy: 46, r: 9, f: GELB, s: T, w: 2 },
    linie('M60 32 L60 35 M60 57 L60 60 M46 46 L49 46 M71 46 L74 46 M50 36 L52 38 M68 54 L70 56 M70 36 L68 38 M50 56 L52 54', 2, GELB_D),
    herz(60, 76, 1.5, ROT),
    glanz('M22 30 L22 52', 3, 0.6),
  ])
}

function rucksack(): Zeichnung {
  const k = '#E8774E'
  const d = '#C65E38'
  return z([14, 0, 92, 112], [
    { t: 'path', d: 'M50 16 Q50 4 60 4 Q70 4 70 16', s: T, f: 'none', w: 7 },
    { t: 'path', d: 'M50 16 Q50 4 60 4 Q70 4 70 16', s: d, f: 'none', w: 3.5 },
    { t: 'path', d: 'M28 44 Q22 70 26 102', s: T, f: 'none', w: 8 },
    { t: 'path', d: 'M92 44 Q98 70 94 102', s: T, f: 'none', w: 8 },
    { t: 'path', d: 'M28 44 Q22 70 26 102', s: d, f: 'none', w: 4.5 },
    { t: 'path', d: 'M92 44 Q98 70 94 102', s: d, f: 'none', w: 4.5 },
    { t: 'path', d: 'M28 42 Q28 14 60 14 Q92 14 92 42 L92 100 Q92 108 84 108 L36 108 Q28 108 28 100 Z', f: k, s: T, w: 2.6 },
    { t: 'path', d: 'M28 44 Q28 16 60 16 Q92 16 92 44 Q60 56 28 44 Z', f: d, s: T, w: 2.4 },
    { t: 'rect', x: 56, y: 44, b: 8, h: 14, rx: 2, f: GELB, s: T, w: 1.8 },
    { t: 'rect', x: 36, y: 66, b: 48, h: 34, rx: 9, f: GELB, s: T, w: 2.4 },
    { t: 'line', x1: 42, y1: 73, x2: 78, y2: 73, s: T, w: 1.8, dash: '2.5 2' },
    { t: 'rect', x: 70, y: 72, b: 5, h: 9, rx: 2, f: METALL, s: T, w: 1.4 },
    glanz('M34 50 L34 92', 3, 0.5),
  ])
}

// --- 5. Tisch und Küche ------------------------------------------------------------------------------
const dampf = (xs: number[], y: number, h = 26): Form[] =>
  xs.map((x) => linie(`M${x} ${y} Q${x - 6} ${y - h * 0.3} ${x} ${y - h * 0.55} Q${x + 6} ${y - h * 0.8} ${x} ${y - h}`, 3, GRAU))

function becher(): Zeichnung {
  return z([12, 12, 98, 98], [
    { t: 'path', d: 'M76 42 Q98 40 98 62 Q98 84 76 82', s: T, f: 'none', w: 12 },
    { t: 'path', d: 'M76 42 Q98 40 98 62 Q98 84 76 82', s: ROT, f: 'none', w: 6.5 },
    { t: 'path', d: 'M24 30 L78 30 L76 96 Q76 104 68 104 L34 104 Q26 104 26 96 Z', f: ROT, s: T, w: 2.6 },
    { t: 'ellipse', cx: 51, cy: 30, rx: 27, ry: 7, f: ROT_D, s: T, w: 2.4 },
    { t: 'ellipse', cx: 51, cy: 31, rx: 22, ry: 4.6, f: '#8A5A3A', s: 'none' },
    ...[[38, 52], [58, 60], [44, 82], [66, 86], [64, 44], [34, 70]].map(([cx, cy]): Form => ({ t: 'circle', cx, cy, r: 4, f: 'papier', s: 'none' })),
    glanz('M32 42 L33 90', 3, 0.5),
  ])
}

function teller(): Zeichnung {
  return z([0, 32, 120, 56], [
    { t: 'ellipse', cx: 60, cy: 64, rx: 54, ry: 20, f: 'papier', s: T, w: 2.6 },
    { t: 'ellipse', cx: 60, cy: 64, rx: 46, ry: 16, f: 'none', s: BLAU, w: 3 },
    { t: 'ellipse', cx: 60, cy: 66, rx: 32, ry: 10, f: '#EEF2F7', s: T, w: 1.8 },
    { t: 'path', d: 'M24 66 Q28 82 60 84 Q92 82 96 66', f: 'none', s: GRAU, w: 1.6, o: 0.7 },
  ])
}

function tasse(): Zeichnung {
  const k = '#6CB7D9'
  return z([6, 0, 108, 104], [
    ...dampf([46, 60, 74], 34, 30),
    { t: 'ellipse', cx: 60, cy: 92, rx: 46, ry: 10, f: 'papier', s: T, w: 2.4 },
    { t: 'ellipse', cx: 60, cy: 90, rx: 28, ry: 5, f: 'none', s: GRAU, w: 1.6 },
    { t: 'path', d: 'M84 50 Q104 50 102 66 Q100 80 82 80', s: T, f: 'none', w: 10 },
    { t: 'path', d: 'M84 50 Q104 50 102 66 Q100 80 82 80', s: k, f: 'none', w: 5 },
    { t: 'path', d: 'M28 42 L92 42 Q92 74 76 86 Q70 90 60 90 Q50 90 44 86 Q28 74 28 42 Z', f: k, s: T, w: 2.6 },
    { t: 'path', d: 'M30.5 58 L89.5 58 Q88.5 64 87 68 L33 68 Q31.5 64 30.5 58 Z', f: 'papier', s: T, w: 1.6 },
    { t: 'ellipse', cx: 60, cy: 42, rx: 32, ry: 7, f: '#B5793F', s: T, w: 2.4 },
  ])
}

function loeffel(): Zeichnung {
  return z([14, 6, 92, 100], [
    g('translate(60 56) rotate(38)', [
      { t: 'path', d: 'M-3.5 -10 L-6 38 Q-6 46 0 46 Q6 46 6 38 L3.5 -10 Z', f: METALL, s: T, w: 2.4 },
      { t: 'ellipse', cx: 0, cy: -28, rx: 14, ry: 20, f: METALL, s: T, w: 2.6 },
      { t: 'ellipse', cx: -1, cy: -29, rx: 9, ry: 14, f: '#E9EEF3', s: 'none' },
      glanz('M-5 -38 Q-7 -30 -5 -22', 3, 0.9),
      glanz('M-2 6 L-3 36', 2, 0.8),
    ]),
  ])
}

function kanne(): Zeichnung {
  const k = '#E59E57'
  const d = '#C97E3A'
  return z([2, 12, 116, 92], [
    { t: 'path', d: 'M30 66 Q14 62 10 44 L4 40 L8 35 L17 42 Q24 54 36 56 Z', f: k, s: T, w: 2.4 },
    { t: 'path', d: 'M90 50 Q112 50 110 68 Q108 86 88 86', s: T, f: 'none', w: 11 },
    { t: 'path', d: 'M90 50 Q112 50 110 68 Q108 86 88 86', s: k, f: 'none', w: 6 },
    { t: 'rect', x: 34, y: 92, b: 52, h: 8, rx: 3, f: d, s: T, w: 2.2 },
    { t: 'path', d: 'M32 94 Q14 72 26 50 Q38 34 60 34 Q82 34 94 50 Q106 72 88 94 Z', f: k, s: T, w: 2.6 },
    linie('M23 66 Q60 74 97 66', 4.5, CREME),
    { t: 'path', d: 'M40 37 Q60 24 80 37 Z', f: d, s: T, w: 2.2 },
    { t: 'circle', cx: 60, cy: 25, r: 5.5, f: d, s: T, w: 2 },
    glanz('M32 56 Q36 46 44 42', 3, 0.7),
  ])
}

function milch(): Zeichnung {
  return z([16, 0, 84, 112], [
    { t: 'path', d: 'M46 16 L66 8 L66 3 L46 11 Z', f: '#E4E8EE', s: T, w: 2 },
    { t: 'path', d: 'M46 16 L66 8 L86 26 L66 34 Z', f: '#F1F4F8', s: T, w: 2.2 },
    { t: 'path', d: 'M66 34 L86 26 L86 98 L66 106 Z', f: '#DDE3EA', s: T, w: 2.4 },
    { t: 'path', d: 'M66 66 Q76 58 86 58 L86 98 L66 106 Z', f: BLAU_D, s: T, w: 2 },
    { t: 'path', d: 'M26 106 L26 34 L46 16 L66 34 L66 106 Z', f: 'papier', s: T, w: 2.6 },
    { t: 'path', d: 'M26 66 Q36 59 46 65 Q56 71 66 64 L66 106 L26 106 Z', f: BLAU, s: T, w: 2 },
    { t: 'path', d: 'M46 74 Q38 86 38 91 Q38 98 46 98 Q54 98 54 91 Q54 86 46 74 Z', f: 'papier', s: T, w: 2 },
  ])
}

function brot(): Zeichnung {
  const kruste = '#D99A55'
  return z([2, 34, 116, 66], [
    { t: 'ellipse', cx: 56, cy: 96, rx: 52, ry: 3.5, f: 'hellgrau', s: 'none' },
    { t: 'path', d: 'M8 88 Q4 54 36 46 Q52 42 66 44 Q94 48 96 80 L96 92 L12 92 Q8 92 8 88 Z', f: kruste, s: T, w: 2.6 },
    linie('M30 56 Q38 62 34 76 M50 50 Q60 58 56 74 M70 52 Q80 60 76 74', 4.5, '#F3D29E'),
    glanz('M20 62 Q26 52 36 50', 3, 0.6),
    { t: 'path', d: 'M80 96 L80 70 Q80 54 96 54 Q112 54 112 70 L112 96 Z', f: '#B9773D', s: T, w: 2.6 },
    { t: 'path', d: 'M84.5 94 L84.5 71 Q84.5 59 96 59 Q107.5 59 107.5 71 L107.5 94 Z', f: '#F6E2B8', s: 'none' },
    ...[[92, 70], [101, 76], [94, 84], [103, 88], [90, 92]].map(([cx, cy]): Form => ({ t: 'circle', cx, cy, r: 1.4, f: '#D9B98F', s: 'none' })),
  ])
}

function mehl(): Zeichnung {
  const koerner = [56, 64, 72, 80]
  return z([14, 4, 84, 106], [
    { t: 'path', d: 'M30 24 L34 8 L66 8 L70 24 Z', f: '#E6DAC4', s: T, w: 2.2 },
    linie('M38 9 L36 22 M46 9 L45 22 M54 9 L55 22 M62 9 L64 22', 1.4, '#C9B48E'),
    { t: 'path', d: 'M28 24 L72 24 L78 100 Q78 106 72 106 L28 106 Q22 106 22 100 Z', f: '#F6EFE2', s: T, w: 2.6 },
    linie('M50 96 L50 50', 3, GELB_D),
    ...koerner.flatMap((y): Form[] => [
      g(`translate(45 ${y}) rotate(-35)`, [{ t: 'ellipse', cx: 0, cy: 0, rx: 3.6, ry: 6.5, f: GELB, s: T, w: 1.4 }]),
      g(`translate(55 ${y}) rotate(35)`, [{ t: 'ellipse', cx: 0, cy: 0, rx: 3.6, ry: 6.5, f: GELB, s: T, w: 1.4 }]),
    ]),
    { t: 'ellipse', cx: 50, cy: 46, rx: 3.6, ry: 6.5, f: GELB, s: T, w: 1.4 },
    { t: 'path', d: 'M72 108 Q74 96 85 96 Q96 96 98 108 Z', f: 'papier', s: T, w: 2 },
    ...[[80, 92], [90, 90], [86, 86]].map(([cx, cy]): Form => ({ t: 'circle', cx, cy, r: 1.6, f: GRAU, s: 'none' })),
  ])
}

function teig(): Zeichnung {
  const schuessel = '#7FB2D9'
  return z([4, 2, 112, 104], [
    { t: 'ellipse', cx: 60, cy: 60, rx: 50, ry: 10, f: '#5E92BE', s: T, w: 2.4 },
    ...tube('M72 46 L98 8', HOLZ, 5),
    { t: 'path', d: 'M22 62 Q20 42 40 40 Q48 26 66 30 Q86 28 92 44 Q102 50 98 62 Z', f: '#F3D9A6', s: T, w: 2.4 },
    linie('M44 46 Q52 50 60 46 M70 40 Q76 44 82 42', 2, '#D9B77E'),
    glanz('M40 44 Q46 36 54 35', 2.6, 0.7),
    { t: 'path', d: 'M10 60 Q60 78 110 60 Q106 98 74 104 L46 104 Q14 98 10 60 Z', f: schuessel, s: T, w: 2.6 },
    glanz('M22 74 Q26 88 36 94', 3, 0.6),
  ])
}

function ofen(): Zeichnung {
  return z([12, 4, 96, 104], [
    { t: 'rect', x: 22, y: 102, b: 10, h: 5, f: DUNKEL, s: T, w: 1.6 },
    { t: 'rect', x: 88, y: 102, b: 10, h: 5, f: DUNKEL, s: T, w: 1.6 },
    { t: 'rect', x: 18, y: 8, b: 84, h: 96, rx: 6, f: '#E4E8EE', s: T, w: 2.6 },
    { t: 'path', d: 'M18 26 L18 14 Q18 8 24 8 L96 8 Q102 8 102 14 L102 26 Z', f: GRAU, s: T, w: 2.4 },
    { t: 'circle', cx: 31, cy: 17, r: 4.5, f: DUNKEL, s: T, w: 1.6 },
    { t: 'circle', cx: 45, cy: 17, r: 4.5, f: DUNKEL, s: T, w: 1.6 },
    { t: 'rect', x: 66, y: 13, b: 26, h: 8, rx: 2, f: '#3A4152', s: T, w: 1.6 },
    linie('M70 17 L82 17', 2.4, ORANGE),
    { t: 'rect', x: 30, y: 32, b: 60, h: 6, rx: 3, f: METALL, s: T, w: 2 },
    { t: 'rect', x: 28, y: 44, b: 64, h: 50, rx: 6, f: '#F6B35A', s: T, w: 2.6 },
    { t: 'ellipse', cx: 60, cy: 62, rx: 24, ry: 12, f: '#FAD48A', s: 'none' },
    linie('M30 82 L90 82', 3, DUNKEL),
    ...[42, 60, 78].map((cx): Form => ({ t: 'ellipse', cx, cy: 77, rx: 7, ry: 4.5, f: '#C98B4F', s: T, w: 1.6 })),
  ])
}

function sternPfad(cx: number, cy: number, R: number, r: number): string {
  const p: string[] = []
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (Math.PI * i) / 5
    const q = i % 2 ? r : R
    p.push(`${(cx + Math.cos(a) * q).toFixed(1)} ${(cy + Math.sin(a) * q).toFixed(1)}`)
  }
  return 'M' + p.join(' L') + ' Z'
}

function ausstechform(): Zeichnung {
  const s1 = sternPfad(46, 48, 36, 16)
  const s2 = sternPfad(50, 54, 36, 16)
  return z([4, 6, 112, 100], [
    { t: 'path', d: s2, f: 'none', s: T, w: 10 },
    { t: 'path', d: s2, f: 'none', s: '#9AA3B0', w: 6 },
    { t: 'path', d: s1, f: 'none', s: T, w: 10 },
    { t: 'path', d: s1, f: 'none', s: METALL, w: 6 },
    { t: 'path', d: sternPfad(88, 80, 22, 10), f: '#E3A95E', s: T, w: 2.6 },
    ...[[84, 76], [92, 82], [88, 70], [80, 84], [96, 76]].map(([cx, cy]): Form => ({ t: 'circle', cx, cy, r: 1.5, f: 'papier', s: 'none' })),
  ])
}

function topf(): Zeichnung {
  return z([4, 6, 112, 98], [
    ...dampf([44, 60, 76], 32, 24),
    { t: 'rect', x: 6, y: 54, b: 18, h: 9, rx: 4, f: DUNKEL, s: T, w: 2 },
    { t: 'rect', x: 96, y: 54, b: 18, h: 9, rx: 4, f: DUNKEL, s: T, w: 2 },
    { t: 'path', d: 'M20 50 L100 50 L96 96 Q95 102 88 102 L32 102 Q25 102 24 96 Z', f: ROT, s: T, w: 2.6 },
    glanz('M30 60 L32 92', 3, 0.6),
    { t: 'path', d: 'M16 50 Q60 32 104 50 Q104 54 100 54 L20 54 Q16 54 16 50 Z', f: METALL, s: T, w: 2.4 },
    { t: 'rect', x: 51, y: 34, b: 18, h: 8, rx: 4, f: DUNKEL, s: T, w: 2 },
  ])
}

function kelle(): Zeichnung {
  return z([10, 4, 96, 104], [
    ...tube('M50 70 Q66 40 92 12', METALL, 6),
    { t: 'circle', cx: 90, cy: 15, r: 2, f: 'papier', s: T, w: 1.4 },
    { t: 'path', d: 'M14 72 Q14 102 38 102 Q62 102 62 72 Z', f: METALL, s: T, w: 2.6 },
    { t: 'ellipse', cx: 38, cy: 72, rx: 24, ry: 6, f: ORANGE, s: T, w: 2.4 },
    glanz('M22 80 Q24 94 34 97', 3, 0.8),
  ])
}

function salat(): Zeichnung {
  const aussen: Form[] = [
    { t: 'circle', cx: 32, cy: 70, r: 24 },
    { t: 'circle', cx: 46, cy: 50, r: 24 },
    { t: 'circle', cx: 74, cy: 50, r: 24 },
    { t: 'circle', cx: 88, cy: 70, r: 24 },
    { t: 'circle', cx: 60, cy: 76, r: 28 },
  ]
  return z([4, 22, 112, 84], [
    ...silhouette(aussen, GRUEN, 4.8),
    linie('M30 84 Q22 72 16 62 M90 84 Q98 72 104 62 M44 60 Q42 46 36 38 M76 60 Q78 46 84 38', 2, GRUEN_D),
    { t: 'path', d: 'M32 94 Q24 74 36 62 Q44 54 54 60 Q60 52 68 58 Q80 54 86 64 Q96 76 88 94 Z', f: HELLGRUEN, s: T, w: 2.2 },
    { t: 'path', d: 'M44 96 Q40 80 50 74 Q56 68 62 74 Q70 70 76 78 Q80 86 76 96 Z', f: '#DDEFC0', s: T, w: 2 },
    linie('M60 76 Q58 86 60 96 M44 66 Q50 74 50 84 M76 66 Q70 74 70 84', 1.8, GRUEN_D),
  ])
}

// --- 6. Bad und Zuhause ------------------------------------------------------------------------------
function seife(): Zeichnung {
  const blase = (cx: number, cy: number, r: number): Form[] => [
    { t: 'circle', cx, cy, r, f: '#EAF5FB', s: '#5E8DB4', w: 2 },
    { t: 'path', d: `M${cx - r * 0.5} ${cy - r * 0.15} Q${cx - r * 0.45} ${cy - r * 0.5} ${cx - r * 0.1} ${cy - r * 0.55}`, s: 'papier', f: 'none', w: 2 },
  ]
  return z([6, 2, 108, 100], [
    { t: 'rect', x: 14, y: 58, b: 88, h: 38, rx: 16, f: '#E07F95', s: T, w: 2.6 },
    { t: 'rect', x: 14, y: 50, b: 88, h: 30, rx: 15, f: ROSA, s: T, w: 2.6 },
    { t: 'ellipse', cx: 58, cy: 65, rx: 26, ry: 7, f: 'none', s: '#D06A82', w: 2 },
    ...blase(32, 32, 11), ...blase(58, 22, 8), ...blase(78, 36, 13), ...blase(98, 16, 6.5), ...blase(46, 50, 6),
  ])
}

function handtuch(): Zeichnung {
  const k = '#5E9F9C'
  return z([4, 2, 112, 110], [
    { t: 'rect', x: 8, y: 8, b: 9, h: 20, rx: 2.5, f: GRAU, s: T, w: 2 },
    { t: 'rect', x: 103, y: 8, b: 9, h: 20, rx: 2.5, f: GRAU, s: T, w: 2 },
    { t: 'rect', x: 10, y: 14, b: 100, h: 7, rx: 3.5, f: METALL, s: T, w: 2.2 },
    { t: 'path', d: 'M26 22 Q26 10 36 10 L84 10 Q94 10 94 22 L92 100 L28 100 Z', f: k, s: T, w: 2.6 },
    linie('M27 24 L93 24', 2, '#4A8580'),
    { t: 'path', d: 'M28.6 76 L91.4 76 L91.2 82 L28.8 82 Z', f: CREME, s: T, w: 1.6 },
    { t: 'path', d: 'M28.9 87 L91.1 87 L91 92 L29 92 Z', f: CREME, s: T, w: 1.6 },
    ...[32, 38, 44, 50, 56, 62, 68, 74, 80, 86].map((x) => linie(`M${x} 100 L${x} 107`, 2)),
  ])
}

function waschbecken(): Zeichnung {
  return z([4, 2, 112, 108], [
    { t: 'rect', x: 54, y: 30, b: 12, h: 16, rx: 2, f: METALL, s: T, w: 2 },
    { t: 'path', d: 'M60 32 Q60 16 72 16 L80 16', s: T, f: 'none', w: 9 },
    { t: 'path', d: 'M60 32 Q60 16 72 16 L80 16', s: METALL, f: 'none', w: 5 },
    { t: 'rect', x: 76, y: 12, b: 7, h: 12, rx: 2, f: METALL, s: T, w: 1.8 },
    { t: 'rect', x: 52, y: 22, b: 16, h: 5, rx: 2.5, f: BLAU, s: T, w: 1.6 },
    { t: 'ellipse', cx: 60, cy: 54, rx: 52, ry: 13, f: 'papier', s: T, w: 2.6 },
    { t: 'ellipse', cx: 60, cy: 56, rx: 41, ry: 8, f: '#CFE3F3', s: T, w: 1.8 },
    { t: 'line', x1: 79.5, y1: 24, x2: 79.5, y2: 56, s: '#7FB2D9', w: 4 },
    tropfen(84, 44, 0.8),
    { t: 'path', d: 'M8 55 Q12 88 44 92 L76 92 Q108 88 112 55 Q60 74 8 55 Z', f: 'papier', s: T, w: 2.6 },
    { t: 'path', d: 'M48 92 L44 108 L76 108 L72 92 Z', f: 'papier', s: T, w: 2.4 },
  ])
}

function zahnbuerste(): Zeichnung {
  return z([6, 6, 108, 96], [
    g('translate(58 56) rotate(-30)', [
      { t: 'rect', x: -52, y: -6.5, b: 66, h: 13, rx: 6.5, f: BLAU, s: T, w: 2.4 },
      { t: 'rect', x: -36, y: -6.5, b: 16, h: 13, rx: 3, f: GRUEN, s: T, w: 1.8 },
      { t: 'path', d: 'M12 -4 L30 -3 L30 3 L12 4 Z', f: BLAU, s: T, w: 2 },
      { t: 'rect', x: 28, y: -5, b: 26, h: 10, rx: 4, f: BLAU, s: T, w: 2.2 },
      { t: 'rect', x: 30, y: -18, b: 22, h: 13, rx: 2, f: 'papier', s: T, w: 2 },
      linie('M35 -17 L35 -6 M41 -17 L41 -6 M47 -17 L47 -6', 1.6, HELLBLAU),
      { t: 'path', d: 'M28 -20 Q30 -30 38 -26 Q42 -32 48 -26 Q54 -30 56 -21 Q42 -17 28 -20 Z', f: 'papier', s: T, w: 2 },
      linie('M34 -23 Q42 -27 50 -23', 2.2, '#5BB0D8'),
    ]),
  ])
}

function zahnpasta(): Zeichnung {
  return z([2, 28, 110, 58], [
    { t: 'rect', x: 6, y: 34, b: 9, h: 46, rx: 1.5, f: GRAU, s: T, w: 2 },
    linie('M8.5 38 L12.5 38 M8.5 44 L12.5 44 M8.5 50 L12.5 50 M8.5 56 L12.5 56 M8.5 62 L12.5 62 M8.5 68 L12.5 68 M8.5 74 L12.5 74', 1.4),
    { t: 'path', d: 'M14 35 L74 42 Q84 44 84 52 L84 62 Q84 70 74 72 L14 79 Z', f: 'papier', s: T, w: 2.6 },
    { t: 'path', d: 'M30 37 L58 40.3 L58 73.7 L30 77 Z', f: BLAU, s: T, w: 2 },
    linie('M30 57 L58 57', 4, ROT),
    { t: 'rect', x: 83, y: 49, b: 8, h: 16, rx: 1.5, f: METALL, s: T, w: 2 },
    { t: 'rect', x: 90, y: 45, b: 18, h: 24, rx: 4, f: ROT, s: T, w: 2.4 },
    linie('M95 47 L95 67 M100 47 L100 67 M105 47 L105 67', 1.4, ROT_D),
  ])
}

function spiegel(): Zeichnung {
  return z([16, 0, 88, 112], [
    g('rotate(-14 60 60)', [
      { t: 'rect', x: 53, y: 72, b: 14, h: 40, rx: 7, f: LILA, s: T, w: 2.4 },
      { t: 'ellipse', cx: 60, cy: 40, rx: 33, ry: 37, f: LILA, s: T, w: 2.6 },
      { t: 'ellipse', cx: 60, cy: 40, rx: 25, ry: 29, f: '#D6E8F5', s: T, w: 2.2 },
      glanz('M44 34 L58 18', 4.5, 0.95),
      glanz('M48 46 L68 24', 3, 0.95),
      { t: 'circle', cx: 60, cy: 88, r: 2.5, f: GELB, s: T, w: 1.2 },
    ]),
  ])
}

function sofa(): Zeichnung {
  const k = '#6C8FC6'
  const h = '#8FAEDC'
  return z([0, 22, 120, 76], [
    { t: 'rect', x: 18, y: 88, b: 7, h: 8, f: HOLZ_D, s: T, w: 1.6 },
    { t: 'rect', x: 95, y: 88, b: 7, h: 8, f: HOLZ_D, s: T, w: 1.6 },
    { t: 'path', d: 'M14 64 L14 36 Q14 28 22 28 L98 28 Q106 28 106 36 L106 64 Z', f: k, s: T, w: 2.6 },
    { t: 'rect', x: 20, y: 34, b: 39, h: 30, rx: 7, f: h, s: T, w: 2.2 },
    { t: 'rect', x: 61, y: 34, b: 39, h: 30, rx: 7, f: h, s: T, w: 2.2 },
    { t: 'rect', x: 12, y: 74, b: 96, h: 16, rx: 4, f: k, s: T, w: 2.4 },
    { t: 'rect', x: 18, y: 62, b: 42, h: 14, rx: 5, f: h, s: T, w: 2.2 },
    { t: 'rect', x: 60, y: 62, b: 42, h: 14, rx: 5, f: h, s: T, w: 2.2 },
    { t: 'rect', x: 4, y: 50, b: 18, h: 40, rx: 8, f: k, s: T, w: 2.4 },
    { t: 'rect', x: 98, y: 50, b: 18, h: 40, rx: 8, f: k, s: T, w: 2.4 },
    g('translate(34 54) rotate(-12)', [{ t: 'rect', x: -11, y: -10, b: 22, h: 20, rx: 6, f: GELB, s: T, w: 2.2 }]),
  ])
}

function tisch(): Zeichnung {
  return z([2, 22, 116, 82], [
    { t: 'rect', x: 34, y: 40, b: 6, h: 46, f: HOLZ_D, s: T, w: 2 },
    { t: 'rect', x: 100, y: 38, b: 6, h: 50, f: HOLZ_D, s: T, w: 2 },
    { t: 'path', d: 'M8 46 L30 30 L112 30 L90 46 Z', f: HOLZ, s: T, w: 2.6 },
    { t: 'path', d: 'M8 46 L90 46 L90 54 L8 54 Z', f: HOLZ_D, s: T, w: 2.4 },
    { t: 'path', d: 'M90 46 L112 30 L112 38 L90 54 Z', f: '#9C6A3A', s: T, w: 2.2 },
    { t: 'rect', x: 12, y: 54, b: 8, h: 46, f: HOLZ, s: T, w: 2.2 },
    { t: 'rect', x: 80, y: 54, b: 8, h: 46, f: HOLZ, s: T, w: 2.2 },
    glanz('M24 42 L40 34', 2.4, 0.6),
  ])
}

function stuhl(): Zeichnung {
  return z([14, 2, 86, 108], [
    { t: 'rect', x: 76, y: 56, b: 6, h: 44, f: HOLZ_D, s: T, w: 2 },
    { t: 'rect', x: 44, y: 56, b: 6, h: 38, f: HOLZ_D, s: T, w: 2 },
    { t: 'rect', x: 45, y: 8, b: 6, h: 46, f: HOLZ, s: T, w: 2.2 },
    { t: 'rect', x: 79, y: 6, b: 6, h: 50, f: HOLZ, s: T, w: 2.2 },
    { t: 'rect', x: 42, y: 8, b: 46, h: 12, rx: 3, f: ROT, s: T, w: 2.2 },
    { t: 'rect', x: 44, y: 28, b: 42, h: 7, rx: 2, f: HOLZ, s: T, w: 2 },
    { t: 'path', d: 'M22 64 L62 64 L86 52 L46 52 Z', f: ROT, s: T, w: 2.4 },
    { t: 'path', d: 'M22 64 L62 64 L62 70 L22 70 Z', f: ROT_D, s: T, w: 2.2 },
    { t: 'path', d: 'M62 64 L86 52 L86 58 L62 70 Z', f: ROT_D, s: T, w: 2.2 },
    { t: 'rect', x: 23, y: 70, b: 7, h: 38, f: HOLZ, s: T, w: 2.2 },
    { t: 'rect', x: 55, y: 70, b: 7, h: 38, f: HOLZ, s: T, w: 2.2 },
  ])
}

function bett(): Zeichnung {
  return z([0, 14, 120, 86], [
    { t: 'rect', x: 22, y: 86, b: 6, h: 10, f: HOLZ_D, s: T, w: 1.8 },
    { t: 'rect', x: 94, y: 86, b: 6, h: 10, f: HOLZ_D, s: T, w: 1.8 },
    { t: 'path', d: 'M6 96 L6 32 Q6 20 14 20 Q22 20 22 32 L22 96 Z', f: HOLZ_D, s: T, w: 2.4 },
    { t: 'rect', x: 18, y: 68, b: 88, h: 20, rx: 3, f: HOLZ, s: T, w: 2.4 },
    { t: 'rect', x: 20, y: 58, b: 84, h: 12, rx: 4, f: 'papier', s: T, w: 2 },
    { t: 'path', d: 'M22 58 Q20 44 32 44 L44 44 Q54 44 52 58 Z', f: 'papier', s: T, w: 2.2 },
    { t: 'path', d: 'M44 52 Q72 44 104 52 L104 74 L44 74 Z', f: '#6CB7D9', s: T, w: 2.4 },
    { t: 'path', d: 'M44 52 Q50 50 56 49 L56 74 L44 74 Z', f: 'papier', s: T, w: 2 },
    ...[[68, 58], [84, 64], [96, 56], [74, 70]].map(([x, y]): Form => ({ t: 'circle', cx: x, cy: y, r: 2.6, f: GELB, s: 'none' })),
    { t: 'path', d: 'M98 96 L98 50 Q98 42 105 42 Q112 42 112 50 L112 96 Z', f: HOLZ_D, s: T, w: 2.4 },
  ])
}

function regal(): Zeichnung {
  return z([10, 4, 100, 108], [
    { t: 'rect', x: 14, y: 8, b: 92, h: 100, rx: 3, f: HOLZ, s: T, w: 2.6 },
    { t: 'rect', x: 20, y: 14, b: 80, h: 88, f: '#F3E2C8', s: T, w: 2 },
    { t: 'rect', x: 20, y: 40, b: 80, h: 6, f: HOLZ, s: T, w: 2 },
    { t: 'rect', x: 20, y: 72, b: 80, h: 6, f: HOLZ, s: T, w: 2 },
    { t: 'rect', x: 26, y: 16, b: 8, h: 24, rx: 1, f: ROT, s: T, w: 1.8 },
    { t: 'rect', x: 34, y: 18, b: 7, h: 22, rx: 1, f: BLAU, s: T, w: 1.8 },
    { t: 'rect', x: 41, y: 15, b: 9, h: 25, rx: 1, f: GELB, s: T, w: 1.8 },
    { t: 'rect', x: 50, y: 19, b: 6, h: 21, rx: 1, f: GRUEN, s: T, w: 1.8 },
    g('rotate(16 62 40)', [{ t: 'rect', x: 57, y: 18, b: 7, h: 22, rx: 1, f: LILA, s: T, w: 1.8 }]),
    { t: 'circle', cx: 84, cy: 30, r: 9, f: GRUEN, s: T, w: 2 },
    { t: 'path', d: 'M84 21 L84 39 M75 30 Q84 26 93 30', f: 'none', s: GRUEN_D, w: 1.6 },
    { t: 'circle', cx: 36, cy: 62, r: 10, f: ROT, s: T, w: 2 },
    linie('M27 60 Q36 66 45 60', 3, 'papier'),
    { t: 'rect', x: 56, y: 58, b: 14, h: 14, rx: 1.5, f: GELB, s: T, w: 1.8 },
    { t: 'rect', x: 70, y: 58, b: 14, h: 14, rx: 1.5, f: BLAU, s: T, w: 1.8 },
    { t: 'rect', x: 63, y: 46, b: 14, h: 12, rx: 1.5, f: ROT, s: T, w: 1.8 },
    { t: 'rect', x: 26, y: 84, b: 32, h: 18, rx: 2, f: ORANGE, s: T, w: 2 },
    { t: 'rect', x: 64, y: 96, b: 30, h: 6, rx: 1, f: GRUEN, s: T, w: 1.6 },
    { t: 'rect', x: 66, y: 90, b: 26, h: 6, rx: 1, f: ROT, s: T, w: 1.6 },
    { t: 'rect', x: 65, y: 84, b: 28, h: 6, rx: 1, f: GELB, s: T, w: 1.6 },
  ])
}

function spielzeugkiste(): Zeichnung {
  return z([4, 0, 112, 106], [
    { t: 'path', d: 'M14 46 L22 12 L98 12 L106 46 Z', f: HOLZ_D, s: T, w: 2.4 },
    { t: 'circle', cx: 34, cy: 42, r: 15, f: ROT, s: T, w: 2.4 },
    linie('M20 38 Q34 46 48 38', 3.4, 'papier'),
    { t: 'circle', cx: 56, cy: 24, r: 5.5, f: '#C98B4F', s: T, w: 2 },
    { t: 'circle', cx: 76, cy: 24, r: 5.5, f: '#C98B4F', s: T, w: 2 },
    { t: 'circle', cx: 66, cy: 36, r: 13, f: '#C98B4F', s: T, w: 2.4 },
    { t: 'ellipse', cx: 66, cy: 41, rx: 6, ry: 4.5, f: '#EBC9A0', s: T, w: 1.6 },
    { t: 'circle', cx: 66, cy: 39.5, r: 1.8, f: T, s: 'none' },
    { t: 'circle', cx: 61, cy: 33, r: 1.8, f: T, s: 'none' },
    { t: 'circle', cx: 71, cy: 33, r: 1.8, f: T, s: 'none' },
    g('rotate(12 92 40)', [{ t: 'rect', x: 83, y: 30, b: 18, h: 18, rx: 2, f: GELB, s: T, w: 2.2 }, { t: 'circle', cx: 92, cy: 39, r: 4, f: BLAU, s: 'none' }]),
    { t: 'rect', x: 10, y: 46, b: 100, h: 56, rx: 4, f: HOLZ, s: T, w: 2.6 },
    linie('M10 65 L110 65 M10 84 L110 84', 1.8, HOLZ_D),
    { t: 'path', d: sternPfad(60, 74, 13, 6), f: GELB, s: T, w: 2 },
  ])
}

// --- 7. Licht, Verkehr, Baustelle, Theater ------------------------------------------------------------------
function laterne(): Zeichnung {
  return z([4, 0, 112, 108], [
    { t: 'circle', cx: 50, cy: 66, r: 42, f: LICHT, s: 'none', o: 0.3 },
    ...tube('M50 14 L112 4', HOLZ_D, 4),
    linie('M50 14 L50 34', 2),
    { t: 'path', d: 'M50 14 Q46 10 50 7', s: T, f: 'none', w: 2 },
    { t: 'circle', cx: 50, cy: 66, r: 30, f: ORANGE, s: T, w: 2.6 },
    { t: 'ellipse', cx: 50, cy: 66, rx: 20, ry: 30, f: 'none', s: '#C97E3A', w: 1.8 },
    { t: 'ellipse', cx: 50, cy: 66, rx: 9, ry: 30, f: 'none', s: '#C97E3A', w: 1.8 },
    { t: 'ellipse', cx: 50, cy: 66, rx: 12, ry: 15, f: '#FFE7A0', s: 'none', o: 0.95 },
    { t: 'path', d: 'M50 58 L52.5 63.5 L58 64 L54 68 L55.3 73.5 L50 70.6 L44.7 73.5 L46 68 L42 64 L47.5 63.5 Z', f: GELB, s: '#C97E3A', w: 1.2 },
    { t: 'rect', x: 36, y: 33, b: 28, h: 7, rx: 2, f: DUNKEL, s: T, w: 2 },
    { t: 'rect', x: 36, y: 92, b: 28, h: 7, rx: 2, f: DUNKEL, s: T, w: 2 },
  ])
}

function taschenlampe(): Zeichnung {
  return z([0, 14, 120, 80], [
    { t: 'path', d: 'M70 46 L120 20 L120 88 L70 62 Z', f: LICHT, s: 'none', o: 0.5 },
    linie('M76 44 L116 26 M76 64 L116 82', 1.6, GELB_D),
    { t: 'rect', x: 4, y: 45, b: 8, h: 18, rx: 2, f: DUNKEL, s: T, w: 2 },
    { t: 'rect', x: 10, y: 43, b: 46, h: 22, rx: 6, f: BLAU, s: T, w: 2.6 },
    linie('M18 46 L18 62 M24 46 L24 62', 1.8, BLAU_D),
    { t: 'rect', x: 34, y: 38, b: 12, h: 6, rx: 2, f: ROT, s: T, w: 1.8 },
    { t: 'path', d: 'M54 42 L70 34 L70 74 L54 66 Z', f: BLAU_D, s: T, w: 2.4 },
    { t: 'ellipse', cx: 70, cy: 54, rx: 4.5, ry: 20, f: '#FFF3B0', s: T, w: 2.2 },
  ])
}

function ledKerze(): Zeichnung {
  return z([20, 0, 80, 112], [
    { t: 'circle', cx: 60, cy: 30, r: 26, f: LICHT, s: 'none', o: 0.3 },
    { t: 'rect', x: 32, y: 100, b: 56, h: 9, rx: 3, f: GRAU, s: T, w: 2 },
    { t: 'rect', x: 37, y: 46, b: 46, h: 56, rx: 4, f: CREME, s: T, w: 2.6 },
    { t: 'path', d: 'M37 50 Q37 44 44 44 L76 44 Q83 44 83 50 Q74 54 66 50 Q58 56 50 50 Q44 54 37 50 Z', f: '#F7E6C4', s: T, w: 2 },
    { t: 'path', d: 'M60 12 Q49 28 51 36 Q53 45 60 45 Q67 45 69 36 Q71 28 60 12 Z', f: GELB, s: T, w: 2.2 },
    { t: 'path', d: 'M60 25 Q55 33 56 37 Q57 41 60 41 Q63 41 64 37 Q65 33 60 25 Z', f: ORANGE, s: 'none' },
    { t: 'circle', cx: 60, cy: 88, r: 4, f: ROT, s: T, w: 1.6 },
    glanz('M44 58 L44 92', 3, 0.7),
  ])
}

function zebrastreifen(): Zeichnung {
  const streifen: Form[] = []
  for (let i = 0; i < 6; i++) {
    const o1 = 33 + i * 10
    const u1 = 9 + i * 18.4
    streifen.push({ t: 'path', d: `M${o1} 36 L${o1 + 6} 36 L${u1 + 11} 92 L${u1} 92 Z`, f: 'papier', s: T, w: 1.8 })
  }
  return z([0, 16, 120, 92], [
    { t: 'rect', x: 0, y: 16, b: 120, h: 20, f: HELLGRUEN, s: 'none' },
    { t: 'path', d: 'M-2 30 L122 30 L122 36 L-2 36 Z', f: '#D6DBE2', s: T, w: 2 },
    { t: 'path', d: 'M-2 36 L122 36 L122 92 L-2 92 Z', f: '#7A828F', s: T, w: 2.4 },
    linie('M4 62 L14 62 M106 62 L116 62', 3, 'papier'),
    ...streifen,
    { t: 'path', d: 'M-2 92 L122 92 L122 99 L-2 99 Z', f: '#C3C9D2', s: T, w: 2.2 },
    { t: 'rect', x: -2, y: 99, b: 124, h: 10, f: '#E4E8EE', s: 'none' },
  ])
}

function bushaltestelle(): Zeichnung {
  const gruen = '#3E8C5A'
  return z([0, 2, 120, 106], [
    { t: 'rect', x: 44, y: 24, b: 66, h: 56, f: GLAS, s: T, w: 2 },
    { t: 'rect', x: 42, y: 22, b: 5, h: 82, f: GRAU, s: T, w: 1.8 },
    { t: 'rect', x: 107, y: 22, b: 5, h: 82, f: GRAU, s: T, w: 1.8 },
    { t: 'rect', x: 38, y: 14, b: 78, h: 9, rx: 2, f: BLAU_D, s: T, w: 2.2 },
    { t: 'rect', x: 54, y: 74, b: 46, h: 6, rx: 2, f: HOLZ, s: T, w: 1.8 },
    { t: 'rect', x: 58, y: 80, b: 4, h: 22, f: DUNKEL, s: T, w: 1.4 },
    { t: 'rect', x: 92, y: 80, b: 4, h: 22, f: DUNKEL, s: T, w: 1.4 },
    { t: 'rect', x: 18, y: 32, b: 5, h: 72, f: GRAU, s: T, w: 1.8 },
    { t: 'rect', x: 6, y: 6, b: 29, h: 29, rx: 6, f: gruen, s: T, w: 2.4 },
    { t: 'rect', x: 11, y: 12, b: 19, h: 13, rx: 3, f: 'papier', s: 'none' },
    { t: 'rect', x: 13, y: 14, b: 15, h: 5, rx: 1, f: gruen, s: 'none' },
    { t: 'circle', cx: 15.5, cy: 27, r: 2.6, f: 'papier', s: 'none' },
    { t: 'circle', cx: 25.5, cy: 27, r: 2.6, f: 'papier', s: 'none' },
    linie('M2 104 L118 104', 2.4),
  ])
}

function bus(): Zeichnung {
  const k = '#F2B04C'
  return z([2, 2, 116, 108], [
    { t: 'rect', x: 26, y: 96, b: 15, h: 12, rx: 3, f: T, s: T, w: 1.6 },
    { t: 'rect', x: 79, y: 96, b: 15, h: 12, rx: 3, f: T, s: T, w: 1.6 },
    linie('M18 38 L10 34 M102 38 L110 34', 2.6),
    { t: 'rect', x: 4, y: 26, b: 8, h: 18, rx: 3, f: DUNKEL, s: T, w: 1.8 },
    { t: 'rect', x: 108, y: 26, b: 8, h: 18, rx: 3, f: DUNKEL, s: T, w: 1.8 },
    { t: 'rect', x: 16, y: 6, b: 88, h: 94, rx: 14, f: k, s: T, w: 2.6 },
    { t: 'rect', x: 26, y: 12, b: 68, h: 11, rx: 3, f: '#3A4152', s: T, w: 2 },
    linie('M33 17.5 L87 17.5', 3, '#FFB347'),
    { t: 'rect', x: 22, y: 28, b: 76, h: 40, rx: 6, f: GLAS, s: T, w: 2.4 },
    { t: 'circle', cx: 40, cy: 46, r: 7, f: H3, s: T, w: 1.8 },
    { t: 'path', d: 'M33 44 Q33 37 40 37 Q47 37 47 44 Q40 41 33 44 Z', f: '#4A3426', s: T, w: 1.4 },
    { t: 'path', d: 'M28 68 Q28 56 40 56 Q52 56 52 68 Z', f: BLAU, s: T, w: 1.8 },
    { t: 'ellipse', cx: 44, cy: 64, rx: 10, ry: 3.4, f: 'none', s: T, w: 2.6 },
    linie('M60 28 L60 68', 2.2),
    glanz('M70 34 L90 52', 3, 0.9),
    { t: 'circle', cx: 32, cy: 82, r: 6.5, f: '#FFF3B0', s: T, w: 2.2 },
    { t: 'circle', cx: 88, cy: 82, r: 6.5, f: '#FFF3B0', s: T, w: 2.2 },
    { t: 'rect', x: 46, y: 77, b: 28, h: 10, rx: 3, f: '#E09A33', s: T, w: 1.8 },
    { t: 'rect', x: 20, y: 92, b: 80, h: 8, rx: 3, f: DUNKEL, s: T, w: 2 },
  ])
}

function bagger(): Zeichnung {
  return z([2, 4, 116, 98], [
    { t: 'rect', x: 22, y: 38, b: 5, h: 18, rx: 1, f: DUNKEL, s: T, w: 1.6 },
    { t: 'rect', x: 8, y: 80, b: 74, h: 18, rx: 9, f: DUNKEL, s: T, w: 2.4 },
    ...[18, 34, 50, 66].map((cx): Form => ({ t: 'circle', cx: cx + 3, cy: 89, r: 5, f: GRAU, s: T, w: 1.6 })),
    { t: 'rect', x: 12, y: 56, b: 64, h: 24, rx: 3, f: GELB, s: T, w: 2.4 },
    { t: 'rect', x: 12, y: 70, b: 64, h: 10, f: GELB_D, s: T, w: 2 },
    { t: 'path', d: 'M38 56 L38 24 Q38 20 42 20 L64 20 Q70 20 70 26 L70 56 Z', f: GELB, s: T, w: 2.4 },
    { t: 'path', d: 'M44 26 L62 26 Q64 26 64 28 L64 46 L44 46 Z', f: GLAS, s: T, w: 2 },
    ...tube('M66 52 L96 18', GELB, 10),
    ...tube('M96 18 L106 58', GELB, 8),
    linie('M74 50 L90 30', 3, METALL),
    { t: 'circle', cx: 96, cy: 18, r: 4, f: DUNKEL, s: T, w: 1.6 },
    { t: 'path', d: 'M98 56 L116 58 L114 74 Q104 80 94 70 Z', f: DUNKEL, s: T, w: 2.2 },
    { t: 'path', d: 'M114 74 L118 78 M108 77 L110 82 M101 76 L101 81', s: T, f: 'none', w: 2.4 },
  ])
}

function kran(): Zeichnung {
  const zick = (x1: number, x2: number, y1: number, y2: number, n: number, quer: boolean): string => {
    const p: string[] = []
    for (let i = 0; i <= n; i++) {
      const t = i / n
      p.push(quer ? `${(x1 + (x2 - x1) * t).toFixed(1)} ${i % 2 ? y2 : y1}` : `${i % 2 ? x2 : x1} ${(y1 + (y2 - y1) * t).toFixed(1)}`)
    }
    return 'M' + p.join(' L')
  }
  return z([0, 0, 120, 120], [
    linie('M46 3 L114 17 M46 3 L8 17', 1.6),
    { t: 'path', d: 'M40 17 L46 2 L52 17 Z', f: GELB, s: T, w: 2 },
    { t: 'rect', x: 40, y: 24, b: 12, h: 90, f: GELB, s: T, w: 2.4 },
    linie(zick(40, 52, 24, 114, 9, false), 1.6),
    { t: 'rect', x: 6, y: 16, b: 110, h: 8, f: GELB, s: T, w: 2.2 },
    linie(zick(6, 116, 16, 24, 22, true), 1.4),
    { t: 'rect', x: 8, y: 24, b: 18, h: 13, rx: 1, f: GRAU, s: T, w: 2 },
    { t: 'rect', x: 52, y: 24, b: 14, h: 13, rx: 2, f: GELB, s: T, w: 2 },
    { t: 'rect', x: 55, y: 27, b: 8, h: 6, rx: 1, f: GLAS, s: T, w: 1.4 },
    { t: 'rect', x: 88, y: 24, b: 10, h: 5, f: DUNKEL, s: T, w: 1.4 },
    linie('M93 29 L93 70', 1.8),
    { t: 'path', d: 'M93 70 L93 75 Q88 77 89 81 Q92 85 96 81', s: T, f: 'none', w: 2.6 },
    linie('M93 76 L80 90 M93 76 L106 90', 1.6),
    { t: 'rect', x: 76, y: 90, b: 34, h: 14, rx: 1, f: ROT, s: T, w: 2.2 },
    linie('M76 97 L110 97 M88 90 L88 97 M100 97 L100 104 M82 97 L82 104', 1.4, ROT_D),
    { t: 'rect', x: 32, y: 112, b: 28, h: 6, f: GRAU, s: T, w: 2 },
    linie('M0 118 L120 118', 2.4),
  ])
}

function helm(): Zeichnung {
  return z([4, 22, 112, 72], [
    { t: 'path', d: 'M22 76 Q20 30 60 28 Q100 30 98 76 Z', f: GELB, s: T, w: 2.6 },
    { t: 'path', d: 'M52 29 Q60 26 68 29 L70 74 L50 74 Z', f: '#F7D877', s: T, w: 2.2 },
    linie('M34 72 Q34 46 44 34 M86 72 Q86 46 76 34', 2, GELB_D),
    { t: 'path', d: 'M8 78 Q60 66 112 78 Q114 86 104 88 Q60 80 16 88 Q6 86 8 78 Z', f: GELB_D, s: T, w: 2.4 },
    glanz('M30 60 Q30 44 40 36', 3.4, 0.7),
  ])
}

function buehne(): Zeichnung {
  const v = '#C9473E'
  return z([0, 0, 120, 100], [
    { t: 'rect', x: 8, y: 10, b: 104, h: 70, f: '#3A4152', s: T, w: 2 },
    { t: 'path', d: 'M52 10 L68 10 L88 82 L32 82 Z', f: '#FCE7A6', s: 'none', o: 0.9 },
    { t: 'path', d: 'M2 78 L118 78 L118 86 L2 86 Z', f: HOLZ, s: T, w: 2.4 },
    { t: 'rect', x: 2, y: 86, b: 116, h: 12, f: HOLZ_D, s: T, w: 2.4 },
    linie('M30 86 L30 98 M60 86 L60 98 M90 86 L90 98', 1.6, '#8E5E32'),
    { t: 'ellipse', cx: 60, cy: 82, rx: 26, ry: 4, f: LICHT, s: 'none', o: 0.8 },
    { t: 'path', d: 'M0 0 L38 0 Q30 30 36 52 Q24 52 22 78 L0 78 Z', f: v, s: T, w: 2.4 },
    { t: 'path', d: 'M120 0 L82 0 Q90 30 84 52 Q96 52 98 78 L120 78 Z', f: v, s: T, w: 2.4 },
    linie('M10 6 Q8 40 10 76 M22 6 Q18 30 22 50 M110 6 Q112 40 110 76 M98 6 Q102 30 98 50', 1.6, ROT_D),
    { t: 'rect', x: 26, y: 48, b: 12, h: 6, rx: 3, f: GELB, s: T, w: 1.6 },
    { t: 'rect', x: 82, y: 48, b: 12, h: 6, rx: 3, f: GELB, s: T, w: 1.6 },
    { t: 'path', d: 'M0 0 L120 0 L120 9 Q110 17 100 9 Q90 17 80 9 Q70 17 60 9 Q50 17 40 9 Q30 17 20 9 Q10 17 0 9 Z', f: ROT_D, s: T, w: 2 },
    linie('M0 3.5 L120 3.5', 2, GELB),
  ])
}

function krone(): Zeichnung {
  return z([4, 14, 112, 80], [
    { t: 'path', d: 'M18 86 L12 38 L38 62 L60 28 L82 62 L108 38 L102 86 Z', f: GELB, s: T, w: 2.6 },
    { t: 'circle', cx: 12, cy: 36, r: 5.5, f: GELB, s: T, w: 2.2 },
    { t: 'circle', cx: 60, cy: 24, r: 6.5, f: GELB, s: T, w: 2.2 },
    { t: 'circle', cx: 108, cy: 36, r: 5.5, f: GELB, s: T, w: 2.2 },
    { t: 'ellipse', cx: 60, cy: 54, rx: 5, ry: 7, f: ROT, s: T, w: 2 },
    { t: 'rect', x: 16, y: 74, b: 88, h: 16, rx: 3, f: GELB_D, s: T, w: 2.4 },
    { t: 'circle', cx: 36, cy: 82, r: 4.5, f: ROT, s: T, w: 1.8 },
    { t: 'circle', cx: 60, cy: 82, r: 5.5, f: BLAU, s: T, w: 1.8 },
    { t: 'circle', cx: 84, cy: 82, r: 4.5, f: GRUEN, s: T, w: 1.8 },
    glanz('M24 46 L28 70', 3, 0.7),
  ])
}

function maske(): Zeichnung {
  return z([2, 14, 116, 80], [
    { t: 'path', d: 'M100 42 Q106 14 118 12 Q116 30 106 46 Z', f: ROSA, s: T, w: 2 },
    linie('M104 44 Q108 30 116 16', 1.4, '#D06A82'),
    { t: 'path', d: 'M10 56 Q4 62 6 72 M8 58 Q2 66 4 78', s: LILA, f: 'none', w: 2.4 },
    { t: 'path', d: 'M60 46 Q76 34 96 38 Q112 42 108 60 Q104 78 84 76 Q70 74 60 64 Q50 74 36 76 Q16 78 12 60 Q8 42 24 38 Q44 34 60 46 Z', f: LILA, s: T, w: 2.6 },
    { t: 'path', d: 'M60 46 Q76 34 96 38 Q112 42 108 60', f: 'none', s: GELB, w: 2.6 },
    { t: 'path', d: 'M60 46 Q44 34 24 38 Q8 42 12 60', f: 'none', s: GELB, w: 2.6 },
    { t: 'ellipse', cx: 36, cy: 57, rx: 12, ry: 8, f: 'papier', s: T, w: 2.4 },
    { t: 'ellipse', cx: 84, cy: 57, rx: 12, ry: 8, f: 'papier', s: T, w: 2.4 },
    ...[[60, 58], [24, 70], [96, 70], [48, 44], [72, 44]].map(([cx, cy]): Form => ({ t: 'circle', cx, cy, r: 2.2, f: GELB, s: 'none' })),
  ])
}

// --- Verzeichnis ----------------------------------------------------------------------------------
export const DINGE: Record<string, () => Zeichnung> = {
  // Menschen zusammen
  freunde,
  gruppe,
  familie,
  baby: babyMotiv,
  oma,
  opa,
  'kind-troesten': kindTroesten,
  teilen,
  // Berufe und Rollen
  aerztin,
  arzt,
  feuerwehrfrau,
  busfahrer,
  baeckerin,
  bauarbeiterin,
  polizist,
  verkaeufer,
  clown,
  ritterin,
  magier,
  schauspieler,
  // Körper
  nase,
  mund,
  auge,
  ohr,
  haare,
  bauch,
  arm,
  bein,
  fuss,
  'hand-offen': handOffen,
  // Kleidung und Gepäck
  winterjacke,
  pulli,
  hose,
  muetze,
  schal,
  handschuhe,
  gummistiefel,
  socke,
  schlafanzug,
  regenjacke,
  kappe,
  koffer,
  rucksack,
  // Tisch und Küche
  becher,
  teller,
  tasse,
  loeffel,
  kanne,
  milch,
  brot,
  mehl,
  teig,
  ofen,
  ausstechform,
  topf,
  kelle,
  salat,
  // Bad und Zuhause
  seife,
  handtuch,
  waschbecken,
  zahnbuerste,
  zahnpasta,
  spiegel,
  sofa,
  tisch,
  stuhl,
  bett,
  regal,
  spielzeugkiste,
  // Licht, Verkehr, Baustelle, Theater
  laterne,
  taschenlampe,
  'led-kerze': ledKerze,
  zebrastreifen,
  bushaltestelle,
  bus,
  bagger,
  kran,
  helm,
  buehne,
  krone,
  maske,
}

export const DINGE_NAMEN = Object.keys(DINGE)

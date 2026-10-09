// ---------------------------------------------------------------------------
// Farbige Motive für die Spielschule (Cycle 1), Runde 2: Obst und Gemüse, Wetter,
// Sand und Garten, Fabeltier und Krabbeltiere, Alltagsdinge und Fahrzeuge.
// Gleicher Strich wie motive-dinge.ts und motive-lernen.ts (Tinte als Umriss,
// flache warme Farben, abgerundete Formen, keine Schrift, keine Marken). Farben und
// Bausteine kommen von dort, damit alles zusammenpasst. Jedes Motiv muss auf einer
// Karte (ca. 35 mm, mindestens 18 mm) und im Schwarzweißdruck noch zu erkennen sein:
// jede Fläche hat eine Kontur (wichtig für `modus: "anmalen"`).
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { masse, tube } from './figuren'
import {
  BLAU, BLAU_D, BRAUN, CREME, DUNKEL, GELB, GELB_D, GLAS, GRAU, GRUEN, GRUEN_D, H3, HELLGRUEN, HOLZ, HOLZ_D, LICHT, METALL, ORANGE, ROSA, ROT, ROT_D, WANGE,
  figur, g, glanz, kind, linie, silhouette, sternPfad, tropfen, z,
} from './motive-dinge'

const T = 'tinte'
const SAND = '#F1DFAE'
const SAND_D = '#D9C187'

// --- kleine Helfer ------------------------------------------------------------------
const rr = (x: number, y: number, b: number, h: number, f: string, rx = 3, w = 2.2): Form => ({ t: 'rect', x, y, b, h, rx, f, s: T, w })
const pf = (d: string, f: string, w = 2.2): Form => ({ t: 'path', d, f, s: T, w })
const kr = (cx: number, cy: number, r: number, f: string, w = 2.2): Form => ({ t: 'circle', cx, cy, r, f, s: T, w })
const el = (cx: number, cy: number, rx: number, ry: number, f: string, w = 2.2, winkel = 0): Form => {
  const e: Form = { t: 'ellipse', cx: winkel ? 0 : cx, cy: winkel ? 0 : cy, rx, ry, f, s: w ? T : 'none', w }
  return winkel ? g(`translate(${cx} ${cy}) rotate(${winkel})`, [e]) : e
}
const boden = (cx: number, cy: number, rx: number, ry = 3.4): Form => ({ t: 'ellipse', cx, cy, rx, ry, f: 'hellgrau', s: 'none' })
const punkt = (cx: number, cy: number, r: number, f: string): Form => ({ t: 'circle', cx, cy, r, f, s: 'none' })
const drehen = (winkel: number, cx: number, cy: number, formen: Form[]): Form => g(`rotate(${winkel} ${cx} ${cy})`, formen)

/** Funkeln: kleiner vierzackiger Stern. */
const funke = (x: number, y: number, s = 1, f = GELB): Form =>
  g(`translate(${x} ${y}) scale(${s})`, [{ t: 'path', d: 'M0 -7 Q1 -1 7 0 Q1 1 0 7 Q-1 1 -7 0 Q-1 -1 0 -7 Z', f, s: T, w: 1.4 }])

/** Freundliches Punktauge mit Glanzlicht. */
const auge = (x: number, y: number, r = 3): Form[] => [punkt(x, y, r, T), punkt(x + r * 0.35, y - r * 0.4, r * 0.36, 'papier')]
/** Großes Auge mit weißem Rand. */
const augeHell = (x: number, y: number, r = 5): Form[] => [kr(x, y, r, 'papier', 1.4), ...auge(x + r * 0.12, y + r * 0.1, r * 0.62)]

/** Ring (Ellipse mit Loch) als ein Pfad. */
const ringPfad = (cx: number, cy: number, ra: number, rb: number, ia: number, ib: number): string =>
  `M${cx - ra} ${cy} A${ra} ${rb} 0 1 1 ${cx + ra} ${cy} A${ra} ${rb} 0 1 1 ${cx - ra} ${cy} Z M${cx - ia} ${cy} A${ia} ${ib} 0 1 0 ${cx + ia} ${cy} A${ia} ${ib} 0 1 0 ${cx - ia} ${cy} Z`

/** Rad von der Seite: Reifen, Nabe, optional Speichen. */
function reifen(cx: number, cy: number, r: number, dicke: number, nabe: string, speichen = 0, reifenFarbe = DUNKEL): Form[] {
  const out: Form[] = [pf(ringPfad(cx, cy, r, r, r - dicke, r - dicke), reifenFarbe, 2.4)]
  for (let i = 0; i < speichen; i++) {
    const a = (Math.PI * 2 * i) / speichen
    out.push(linie(`M${cx} ${cy} L${(cx + Math.cos(a) * (r - dicke)).toFixed(1)} ${(cy + Math.sin(a) * (r - dicke)).toFixed(1)}`, 1.2, GRAU))
  }
  out.push(kr(cx, cy, Math.max(3, r * 0.26), nabe, 1.8))
  return out
}

/** Sichel für den Schatten einer Kugel (rechts unten). */
function schattenKugel(cx: number, cy: number, r: number, f: string): Form {
  const p = (w: number, k: number) => `${(cx + r * k * Math.cos(w)).toFixed(1)} ${(cy + r * k * Math.sin(w)).toFixed(1)}`
  const a1 = (-35 * Math.PI) / 180
  const a2 = (100 * Math.PI) / 180
  const m = (30 * Math.PI) / 180
  return { t: 'path', d: `M${p(a1, 1)} A${r} ${r} 0 0 1 ${p(a2, 1)} Q${p(m, 0.5)} ${p(a1, 1)} Z`, f, s: 'none' }
}

// =============================================================================
// 1  Obst, Gemüse, Essen
// =============================================================================

function apfel(): Zeichnung {
  return z([0, 2, 110, 114], [
    boden(55, 110, 36),
    ...tube('M55 36 Q55 24 62 13', HOLZ_D, 4.4),
    pf('M60 24 Q72 6 94 12 Q88 34 60 24 Z', GRUEN, 2.2),
    linie('M63 23 Q78 17 90 14', 1.4, GRUEN_D),
    pf('M55 36 C48 24 30 22 20 34 C8 48 10 74 22 92 C30 104 42 108 55 103 C68 108 80 104 88 92 C100 74 102 48 90 34 C80 22 62 24 55 36 Z', ROT, 2.6),
    pf('M44 33 Q55 43 66 33 Q55 38 44 33 Z', ROT_D, 1.4),
    glanz('M25 50 Q22 64 28 78', 4.2, 0.65),
    glanz('M31 41 Q35 36 41 35', 3, 0.6),
  ])
}

function zitrone(): Zeichnung {
  const gelb = '#F6DB4A'
  const gelbD = '#E5BE2E'
  const scheibe: Form[] = []
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i
    const a1 = a - 0.34
    const a2 = a + 0.34
    const p = (w: number, r: number) => `${(114 + Math.cos(w) * r).toFixed(1)} ${(76 + Math.sin(w) * r).toFixed(1)}`
    scheibe.push(pf(`M${p(a, 3)} L${p(a1, 19)} A19 19 0 0 1 ${p(a2, 19)} Z`, '#FBEC8C', 1.4))
  }
  return z([0, 4, 146, 104], [
    boden(60, 98, 50),
    drehen(-18, 52, 52, [
      pf('M70 24 Q80 6 100 8 Q96 28 70 24 Z', GRUEN, 2),
      pf('M6 52 Q12 48 20 44 Q30 22 52 22 Q74 22 84 44 Q92 48 98 52 Q92 56 84 60 Q74 82 52 82 Q30 82 20 60 Q12 56 6 52 Z', gelb, 2.6),
      punkt(40, 36, 1.3, gelbD),
      punkt(62, 70, 1.3, gelbD),
      punkt(74, 38, 1.3, gelbD),
      punkt(34, 64, 1.3, gelbD),
      punkt(54, 30, 1.3, gelbD),
      glanz('M30 40 Q38 30 50 28', 4, 0.7),
    ]),
    kr(114, 76, 28, gelbD, 2.6),
    kr(114, 76, 24, CREME, 1.8),
    ...scheibe,
  ])
}

function mandarine(): Zeichnung {
  const frucht = '#F29A3F'
  const frD = '#DD7C25'
  const spalte = (x: number, y: number, w: number): Form =>
    g(`translate(${x} ${y}) rotate(${w})`, [
      pf('M-14 -2 Q-12 -22 4 -22 Q18 -20 16 -2 Q14 18 -2 20 Q-16 18 -14 -2 Z', '#F8B65A', 2.2),
      linie('M-6 -14 Q-9 -2 -5 12 M4 -14 Q7 -2 4 12', 1.4, '#F09A36'),
    ])
  return z([0, 4, 134, 104], [
    boden(50, 98, 44),
    ...tube('M44 30 Q44 20 50 14', HOLZ_D, 3.6),
    pf('M48 20 Q58 6 76 10 Q70 28 48 20 Z', GRUEN, 2),
    pf('M44 62 m-40 0 a40 34 0 1 0 80 0 a40 34 0 1 0 -80 0 Z', frucht, 2.6),
    pf('M36 30 Q44 34 52 30 L50 36 Q44 38 38 36 Z', GRUEN_D, 1.4),
    ...[[22, 52], [34, 78], [58, 84], [64, 46], [50, 56], [26, 66], [70, 70], [40, 46]].map(([x, y]) => punkt(x, y, 1.5, frD)),
    glanz('M16 50 Q16 38 28 32', 4.2, 0.65),
    spalte(98, 56, 12),
    spalte(116, 74, -20),
  ])
}

function karotte(): Zeichnung {
  const orange = '#F28A36'
  const rille = '#D86F1E'
  return z([6, -10, 104, 120], [
    drehen(38, 54, 62, [
      pf('M50 32 Q34 20 26 -2 Q44 2 52 30 Z', GRUEN, 2.2),
      pf('M50 32 Q64 20 74 0 Q58 4 50 32 Z', GRUEN, 2.2),
      pf('M50 32 Q42 8 52 -10 Q62 8 52 32 Z', '#9DCB82', 2.2),
      pf('M34 36 Q34 27 50 27 Q66 27 66 36 Q64 82 54 114 Q52 120 50 120 Q48 120 46 114 Q36 82 34 36 Z', orange, 2.6),
      linie('M36 48 L46 51 M54 62 L64 59 M38 74 L47 77 M52 88 L60 86 M44 100 L50 102', 2, rille),
      glanz('M40 40 Q41 64 46 88', 3.4, 0.55),
    ]),
  ])
}

function rosine(): Zeichnung {
  const rz = (cx: number, cy: number, b: number, w: number): Form =>
    g(`translate(${cx} ${cy}) rotate(${w}) scale(${b / 12})`, [
      pf('M-13 0 Q-12 -7 -5 -8 Q0 -10 6 -7 Q11 -9 14 -3 Q16 2 11 5 Q8 9 2 8 Q-4 10 -9 7 Q-14 5 -13 0 Z', '#5E3553', 1.8),
      linie('M-9 -2 Q-4 3 0 -2 Q3 -6 7 -2 M-6 5 Q0 2 5 4', 1, '#2F1A2D'),
      linie('M-9 -4 Q-5 -7 -1 -6', 1.6, '#A67A9C'),
    ])
  return z([0, 10, 164, 106], [
    boden(76, 108, 66),
    // Rosinen drinnen: Haufen über dem Rand
    el(70, 56, 52, 10, '#EADFC8', 2.4),
    rz(30, 54, 11, -20), rz(46, 49, 11, 24), rz(62, 47, 11, -12), rz(78, 48, 11, 18), rz(94, 50, 11, -22), rz(108, 54, 11, 16),
    rz(38, 40, 11, 14), rz(54, 36, 11, -24), rz(70, 35, 11, 20), rz(86, 37, 11, -10), rz(100, 41, 11, 26),
    rz(48, 26, 11, -8), rz(64, 23, 11, 22), rz(80, 24, 11, -18), rz(93, 28, 11, 10),
    rz(60, 12, 11, 8), rz(75, 12, 11, -14),
    // Schale vorne
    pf('M18 54 Q70 74 122 54 Q118 100 70 102 Q22 100 18 54 Z', CREME, 2.6),
    pf('M18.6 58 Q70 78 121.4 58 L120.6 66 Q70 86 19.4 66 Z', BLAU, 1.8),
    rr(50, 98, 40, 7, BLAU_D, 3, 2),
    glanz('M28 76 Q32 88 44 92', 3.2, 0.8),
    // ein paar Rosinen daneben
    rz(138, 98, 11, 24), rz(152, 86, 11, -30), rz(130, 84, 11, 8),
  ])
}

function flasche(): Zeichnung {
  const koerper = 'M26 26 L44 26 L44 48 Q44 56 54 62 Q60 66 60 76 L60 116 Q60 122 54 122 L16 122 Q10 122 10 116 L10 76 Q10 66 16 62 Q26 56 26 48 Z'
  return z([2, 4, 66, 128], [
    boden(35, 126, 28),
    pf(koerper, GLAS, 2.6),
    { t: 'path', d: 'M10.4 80 Q22 76 35 80 Q48 84 59.6 80 L59.6 116 Q59.6 121.6 54 121.6 L16 121.6 Q10.4 121.6 10.4 116 Z', f: '#F0DE8E', s: 'none' },
    linie('M10.4 80 Q22 76 35 80 Q48 84 59.6 80', 2, '#C8B25A'),
    rr(25, 8, 20, 20, HOLZ, 4, 2.4),
    linie('M29 14 L41 14 M29 20 L41 20', 1.4, HOLZ_D),
    rr(14, 90, 42, 24, 'papier', 3, 2),
    rr(14, 90, 42, 7, ROT, 2, 1.8),
    tropfen(35, 106, 0.8),
    pf(koerper, 'none', 2.6),
    glanz('M17 70 L16 112', 3.4, 0.9),
    glanz('M31 32 L31 46', 3, 0.9),
  ])
}

// =============================================================================
// 2  Wetter und Jahreszeit
// =============================================================================

function sonne(): Zeichnung {
  const strahlen: Form[] = []
  for (let i = 0; i < 12; i++) {
    const a = (Math.PI * 2 * i) / 12
    const lang = i % 2 === 0
    const tip = lang ? 61 : 54
    const half = lang ? 0.19 : 0.17
    const P = (w: number, r: number) => `${(65 + Math.cos(w) * r).toFixed(1)} ${(65 + Math.sin(w) * r).toFixed(1)}`
    strahlen.push(pf(`M${P(a - half, 38)} L${P(a, tip)} L${P(a + half, 38)} Z`, lang ? '#F5A93A' : '#F8BE48', 2.2))
  }
  return z([0, 0, 130, 130], [
    ...strahlen,
    kr(65, 65, 33, '#F9D44A', 2.8),
    kr(65, 65, 25, '#FBE27A', 0),
    glanz('M44 54 Q47 43 58 38', 4.4, 0.8),
  ])
}

const WOLKE_KREISE: [number, number, number][] = [[40, 56, 21], [66, 38, 26], [98, 44, 22], [118, 60, 18]]

function wolke(): Zeichnung {
  const teile: Form[] = [...WOLKE_KREISE.map(([cx, cy, r]): Form => ({ t: 'circle', cx, cy, r })), { t: 'rect', x: 24, y: 54, b: 112, h: 26, rx: 13 }]
  return z([8, 8, 144, 84], [
    boden(76, 88, 60),
    ...silhouette(teile, '#F2F7FC', 4.6),
    { t: 'path', d: 'M26 66 Q26 80 38 80 L110 80 Q124 80 124 66 Q76 76 26 66 Z', f: '#D9E7F4', s: 'none' },
    glanz('M50 34 Q56 24 68 22', 4.2, 0.95),
    glanz('M26 56 Q27 52 30 49', 3, 0.9),
  ])
}

function regen(): Zeichnung {
  const kreise: [number, number, number][] = [[44, 40, 20], [70, 28, 24], [100, 34, 20], [120, 46, 16]]
  const teile: Form[] = [...kreise.map(([cx, cy, r]): Form => ({ t: 'circle', cx, cy, r })), { t: 'rect', x: 26, y: 40, b: 112, h: 28, rx: 14 }]
  return z([8, 4, 144, 128], [
    ...silhouette(teile, '#C9D6E4', 4.6),
    { t: 'path', d: 'M28 54 Q28 66 40 66 L112 66 Q124 66 124 54 Q76 64 28 54 Z', f: '#A8BBD0', s: 'none' },
    glanz('M52 24 Q58 16 68 14', 4, 0.8),
    tropfen(36, 86, 1.25), tropfen(66, 98, 1.25), tropfen(96, 86, 1.25), tropfen(122, 98, 1.25),
    tropfen(50, 116, 1.05), tropfen(82, 120, 1.05), tropfen(110, 118, 0.9),
  ])
}

function schneemann(): Zeichnung {
  const weiss = '#F6F9FC'
  const schatt = '#D9E6F2'
  return z([0, 0, 130, 172], [
    pf('M4 154 Q36 144 65 150 Q96 144 126 154 Q124 166 100 168 L30 168 Q6 166 4 154 Z', '#EAF2F9', 2.2),
    // Arme aus Zweigen
    ...tube('M44 92 L12 74 M24 82 L14 66', HOLZ_D, 3.4),
    ...tube('M86 92 L118 76 M106 84 L116 68', HOLZ_D, 3.4),
    // Kugeln
    kr(65, 126, 36, weiss, 2.6),
    schattenKugel(65, 126, 34, schatt),
    kr(65, 82, 27, weiss, 2.6),
    schattenKugel(65, 82, 25, schatt),
    kr(65, 46, 20, weiss, 2.6),
    schattenKugel(65, 46, 18.5, schatt),
    // Knöpfe
    kr(65, 76, 3, DUNKEL, 1), kr(65, 90, 3, DUNKEL, 1), kr(65, 104, 3, DUNKEL, 1),
    // Schal
    ...tube('M44 63 Q65 76 86 63', ROT, 8.5),
    pf('M76 69 L82 98 L92 94 L87 66 Z', ROT, 2.2),
    linie('M80 80 L90 77 M81 88 L91 85', 1.6, 'papier'),
    // Gesicht
    ...auge(58, 42, 2.8), ...auge(72, 42, 2.8),
    pf('M65 46 L90 51 L65 54 Z', ORANGE, 1.8),
    punkt(52, 54, 1.7, T), punkt(56, 58, 1.7, T), punkt(62, 60, 1.7, T), punkt(69, 60, 1.7, T), punkt(75, 56, 1.7, T),
    // Zylinder
    rr(51, 2, 28, 22, DUNKEL, 4, 2.4),
    rr(51, 15, 28, 6, ROT, 0, 1.6),
    el(65, 25, 25, 5, DUNKEL, 2.4),
    glanz('M56 6 L56 12', 2.4, 0.5),
    funke(112, 30, 0.7, 'papier'),
    funke(14, 36, 0.6, 'papier'),
  ])
}

function blume(): Zeichnung {
  const blatt = (d: string): Form => pf(d, GRUEN, 2.2)
  return z([4, 4, 92, 146], [
    boden(50, 147, 30),
    ...tube('M50 146 Q50 110 50 70', GRUEN, 5),
    blatt('M50 134 Q20 130 10 92 Q44 98 50 134 Z'),
    linie('M48 128 Q30 118 18 100', 1.4, GRUEN_D),
    blatt('M50 122 Q80 118 90 86 Q58 90 50 122 Z'),
    linie('M52 116 Q70 106 82 92', 1.4, GRUEN_D),
    pf('M50 80 Q22 76 22 48 Q22 30 26 16 Q42 26 48 48 Z', '#E5707A', 2.4),
    pf('M50 80 Q78 76 78 48 Q78 30 74 16 Q58 26 52 48 Z', '#E5707A', 2.4),
    pf('M50 82 Q34 72 36 46 Q38 26 50 10 Q62 26 64 46 Q66 72 50 82 Z', ROT, 2.6),
    glanz('M44 52 Q42 36 47 22', 3.4, 0.6),
    pf('M45 80 Q50 88 55 80 Q50 76 45 80 Z', GRUEN_D, 1.4),
  ])
}

function eiswuerfel(): Zeichnung {
  const sechseck = 'M65 14 L108 38 L108 86 L65 110 L22 86 L22 38 Z'
  return z([0, 0, 130, 130], [
    el(65, 112, 46, 7, '#D4E8F7', 1.8),
    { t: 'path', d: 'M65 14 L108 38 L65 62 L22 38 Z', f: '#DDF0FB', s: T, w: 2.4 },
    { t: 'path', d: 'M22 38 L65 62 L65 110 L22 86 Z', f: '#B3D8F2', s: T, w: 2.4 },
    { t: 'path', d: 'M108 38 L65 62 L65 110 L108 86 Z', f: '#8DC2E8', s: T, w: 2.4 },
    linie('M65 62 L65 14 M65 62 L22 86 M65 62 L108 86', 1.8, 'papier'),
    linie('M65 62 L65 14 M65 62 L22 86 M65 62 L108 86', 0.9, '#7DB2DB'),
    pf(sechseck, 'none', 3),
    glanz('M31 50 L31 76', 4.4, 0.95),
    glanz('M48 26 L62 20', 3.4, 0.95),
    glanz('M76 80 L76 98', 3, 0.5),
    funke(114, 18, 0.9, 'papier'),
    funke(14, 20, 0.65, 'papier'),
    tropfen(112, 108, 0.8),
    tropfen(18, 114, 0.65),
  ])
}

// =============================================================================
// 3  Sand, Garten, Burg
// =============================================================================

function giesskanne(): Zeichnung {
  const k = '#5BAE7C'
  const kD = '#3F8A5E'
  return z([0, -2, 160, 130], [
    boden(92, 124, 52),
    // Bügel oben und Griff hinten
    ...tube('M66 54 Q74 4 114 58', kD, 6),
    ...tube('M114 62 Q148 60 146 90 Q144 116 116 112', kD, 6),
    // langer Ausguss, steigt über den Rand
    ...tube('M64 108 L28 36', k, 8),
    // Körper
    pf('M62 56 L118 56 L121 116 Q121 122 115 122 L64 122 Q58 122 58 116 Z', k, 2.6),
    linie('M60.4 70 L119.6 70 M59.2 106 L120.8 106', 2, kD),
    el(90, 56, 28, 7, kD, 2.4),
    el(90, 57, 22, 4.2, '#2F4A3A', 0),
    glanz('M67 76 L68 100', 3.6, 0.7),
    // Brause
    g('translate(24 26) rotate(-28)', [
      pf('M-6 16 L-17 0 L17 0 L6 16 Z', kD, 2.2),
      el(0, 0, 18, 7.5, METALL, 2.4),
      ...[-11, -5.5, 0, 5.5, 11].map((x) => punkt(x, 0.6, 1.5, T)),
    ]),
    // Wasser
    tropfen(10, 14, 0.95), tropfen(4, 32, 0.85), tropfen(8, 52, 0.85), tropfen(20, 68, 0.75),
    tropfen(24, 84, 0.65),
  ])
}

function eimer(): Zeichnung {
  return z([8, 8, 128, 126], [
    boden(72, 130, 46),
    // Bügel
    ...tube('M32 62 Q70 -14 108 62', GELB_D, 4.6),
    // Sandhaufen im Eimer
    pf('M36 58 Q46 40 72 38 Q98 40 104 58 Z', SAND, 2.4),
    punkt(56, 52, 1.5, SAND_D), punkt(76, 48, 1.5, SAND_D), punkt(90, 54, 1.5, SAND_D), punkt(66, 55, 1.5, SAND_D),
    // Eimer
    pf('M30 56 L110 56 L98 122 Q97 128 90 128 L50 128 Q43 128 42 122 Z', ROT, 2.6),
    pf('M34.6 82 L105.4 82 L103.6 94 L36.4 94 Z', GELB, 1.8),
    kr(55, 88, 2.6, ROT, 1.4), kr(70, 88, 2.6, ROT, 1.4), kr(85, 88, 2.6, ROT, 1.4),
    rr(26, 50, 88, 12, ROT_D, 5, 2.6),
    kr(32, 62, 4, METALL, 1.8),
    kr(108, 62, 4, METALL, 1.8),
    glanz('M38 68 L47 118', 3.6, 0.6),
  ])
}

function schaufel(): Zeichnung {
  const b = BLAU
  return z([-6, -6, 130, 150], [
    boden(66, 142, 36),
    drehen(32, 60, 70, [
      // Griffring
      pf(ringPfad(60, 22, 19, 16, 10, 8), b, 2.6),
      // Schaft
      rr(53, 36, 14, 46, b, 5, 2.6),
      linie('M56 46 L64 46 M56 52 L64 52 M56 58 L64 58', 1.4, BLAU_D),
      // Schaufelblatt
      pf('M38 82 Q38 74 48 74 L72 74 Q82 74 82 82 L86 112 Q86 136 60 140 Q34 136 34 112 Z', b, 2.6),
      pf('M43 84 L77 84 L80 112 Q79 130 60 133 Q41 130 40 112 Z', '#8DB4E4', 1.8),
      pf('M42 110 Q50 98 60 100 Q70 98 78 110 Q77 128 60 132 Q43 128 42 110 Z', SAND, 1.6),
      punkt(54, 116, 1.4, SAND_D), punkt(66, 112, 1.4, SAND_D), punkt(62, 124, 1.4, SAND_D),
      glanz('M40 88 L42 106', 3, 0.7),
    ]),
  ])
}

function burg(): Zeichnung {
  const stein = '#E4DACF'
  const steinD = '#CBBFB1'
  const zinnen = (x0: number, y: number, n: number, abstand: number, breite: number, hoehe: number, f = stein): Form[] =>
    Array.from({ length: n }, (_, i) => rr(x0 + i * abstand, y, breite, hoehe + 4, f, 1.5, 2.2))
  const ziegel = (d: string): Form => linie(d, 1.2, steinD)
  return z([0, -8, 180, 158], [
    pf('M2 140 Q90 132 178 140 L178 150 L2 150 Z', HELLGRUEN, 2.2),
    // Bergfried hinten
    ...zinnen(62, 8, 5, 12.5, 7.5, 8),
    rr(62, 14, 56, 66, stein, 2, 2.6),
    ziegel('M70 30 L86 30 M96 38 L110 38 M68 62 L82 62 M98 66 L112 66'),
    pf('M84 60 L84 48 Q90 41 96 48 L96 60 Z', DUNKEL, 2),
    linie('M90 14 L90 -4', 2.4),
    pf('M90 -4 L108 1 L90 7 Z', GELB, 1.8),
    // Mauer
    ...zinnen(38, 74, 5, 22.5, 12, 8),
    rr(38, 80, 104, 62, stein, 2, 2.6),
    ziegel('M50 96 L70 96 M112 96 L130 96 M46 112 L62 112 M118 116 L134 116 M52 128 L68 128 M114 130 L128 130'),
    // Tor
    pf('M76 142 L76 112 Q76 96 90 96 Q104 96 104 112 L104 142 Z', HOLZ_D, 2.6),
    linie('M90 97 L90 142 M83 100 L83 142 M97 100 L97 142', 1.4, BRAUN),
    kr(98, 122, 1.6, GELB, 1),
    // Seitentürme
    rr(6, 56, 36, 86, stein, 2, 2.6),
    rr(138, 56, 36, 86, stein, 2, 2.6),
    ziegel('M12 74 L26 74 M20 100 L36 100 M12 124 L24 124 M146 74 L160 74 M152 102 L166 102 M146 126 L158 126'),
    pf('M2 58 L24 14 L46 58 Z', ROT, 2.6),
    pf('M134 58 L156 14 L178 58 Z', ROT, 2.6),
    rr(21, 74, 6, 14, DUNKEL, 3, 1.6),
    rr(153, 74, 6, 14, DUNKEL, 3, 1.6),
    rr(21, 100, 6, 14, DUNKEL, 3, 1.6),
    rr(153, 100, 6, 14, DUNKEL, 3, 1.6),
    linie('M24 14 L24 -6', 2.2),
    pf('M24 -6 L38 -2 L24 3 Z', BLAU, 1.6),
    linie('M156 14 L156 -6', 2.2),
    pf('M156 -6 L170 -2 L156 3 Z', BLAU, 1.6),
  ])
}

function drache(): Zeichnung {
  const gruen = '#7DB46C'
  const fluegel = '#F4B15A'
  const spitze = (x: number, y: number, w = 0): Form => g(`translate(${x} ${y}) rotate(${w})`, [pf('M-6 3 L0 -11 L6 3 Z', ORANGE, 2.2)])
  return z([0, -2, 178, 126], [
    boden(76, 118, 62),
    // Schwanz mit Spitze
    ...tube('M44 86 Q10 98 10 68 Q10 50 26 50', gruen, 12),
    pf('M24 40 L40 50 L24 60 Z', ORANGE, 2.2),
    // Rückenstacheln
    spitze(40, 66, -34), spitze(48, 58, -22), spitze(58, 53, -10),
    // Hörner
    pf('M106 26 L100 8 L116 22 Z', CREME, 2.2),
    pf('M118 24 L122 6 L131 24 Z', CREME, 2.2),
    // Körper, Hals, Kopf, Beine
    ...silhouette(
      [
        { t: 'ellipse', cx: 74, cy: 78, rx: 38, ry: 28 },
        { t: 'path', d: 'M92 74 Q96 54 104 36 L130 38 Q126 58 114 82 Z' },
        { t: 'circle', cx: 118, cy: 40, r: 19 },
        { t: 'ellipse', cx: 138, cy: 48, rx: 17, ry: 11 },
        { t: 'rect', x: 48, y: 90, b: 20, h: 22, rx: 9 },
        { t: 'rect', x: 86, y: 90, b: 20, h: 22, rx: 9 },
        { t: 'ellipse', cx: 56, cy: 111, rx: 15, ry: 6.5 },
        { t: 'ellipse', cx: 98, cy: 111, rx: 15, ry: 6.5 },
      ],
      gruen,
      5,
    ),
    // Bauch
    pf('M80 70 Q104 66 110 84 Q104 100 84 100 Q72 98 80 70 Z', SAND, 1.6),
    linie('M84 80 Q94 84 106 80 M82 90 Q94 94 104 90', 1.2, SAND_D),
    // Zehen
    linie('M50 111 L50 116 M56 112 L56 117 M62 111 L62 116 M92 111 L92 116 M98 112 L98 117 M104 111 L104 116', 1.6),
    // Flügel (Fledermausform)
    pf('M88 66 Q68 48 54 16 Q64 28 70 26 Q72 14 80 6 Q82 22 90 26 Q98 24 102 20 Q98 44 98 66 Z', fluegel, 2.4),
    linie('M90 64 L58 20 M90 64 L80 12 M92 64 L100 24', 1.4, '#D9822E'),
    // Gesicht
    ...augeHell(124, 34, 5.6),
    punkt(147, 44, 1.8, T),
    linie('M132 53 Q142 59 151 52', 2),
    el(122, 48, 5, 3, WANGE, 0),
    // kleine freundliche Flamme
    pf('M153 46 Q160 36 168 40 Q165 44 172 48 Q162 54 153 50 Z', ORANGE, 1.8),
    pf('M156 47 Q161 42 165 45 Q163 47 166 49 Q161 51 156 49 Z', GELB, 0),
  ])
}

function rakete(): Zeichnung {
  return z([-14, -16, 154, 176], [
    drehen(38, 60, 80, [
      // Flamme
      pf('M45 112 Q36 134 60 152 Q84 134 75 112 Z', ORANGE, 2.4),
      pf('M52 112 Q48 128 60 140 Q72 128 68 112 Z', GELB, 1.6),
      // Flossen
      pf('M34 74 Q12 90 10 120 L34 104 Z', ROT, 2.4),
      pf('M86 74 Q108 90 110 120 L86 104 Z', ROT, 2.4),
      rr(46, 104, 28, 9, DUNKEL, 3, 2.2),
      // Rumpf
      pf('M60 8 Q86 30 86 76 L86 106 Q86 108 84 108 L36 108 Q34 108 34 106 L34 76 Q34 30 60 8 Z', '#EEF2F7', 2.6),
      pf('M60 8 Q75 20 80 40 L40 40 Q45 20 60 8 Z', ROT, 2.4),
      pf('M34.4 92 L85.6 92 L85.6 100 L34.4 100 Z', BLAU, 1.6),
      kr(60, 66, 15, METALL, 2.6),
      kr(60, 66, 10.5, '#8EC3E8', 2),
      glanz('M54 61 Q56 57 61 56', 3, 0.95),
      glanz('M40 56 L40 84', 3, 0.75),
    ]),
    funke(12, 18, 0.9, GELB),
    funke(130, 112, 0.8, GELB),
    funke(-2, 112, 0.6, 'papier'),
  ])
}

// =============================================================================
// 4  Fisch, Käfer, Spinne, Glühwürmchen
// =============================================================================

function fisch(): Zeichnung {
  const koerper = '#F2873A'
  const flosse = '#F7B25E'
  const blase = (x: number, y: number, r: number): Form[] => [kr(x, y, r, '#E8F4FC', 1.6), glanz(`M${x - r * 0.45} ${y - r * 0.1} Q${x - r * 0.4} ${y - r * 0.5} ${x} ${y - r * 0.55}`, 1.6, 0.95)]
  return z([0, 0, 144, 106], [
    boden(76, 100, 52),
    pf('M104 52 L136 28 Q130 52 136 76 Z', flosse, 2.4),
    pf('M54 28 Q64 8 88 14 Q86 22 84 30 Z', flosse, 2.4),
    pf('M60 76 Q66 94 84 96 Q82 86 82 78 Z', flosse, 2.4),
    pf('M18 52 Q34 24 70 24 Q104 26 114 52 Q104 78 70 80 Q34 80 18 52 Z', koerper, 2.6),
    pf('M30 66 Q50 76 78 74 Q100 72 110 58 Q104 74 70 80 Q34 80 30 66 Z', '#F9C98A', 0),
    linie('M66 36 Q72 42 66 48 M78 44 Q84 50 78 56 M66 58 Q72 64 66 70 M90 36 Q96 42 90 48 M92 58 Q98 62 92 68', 1.6, '#C95F1E'),
    linie('M50 36 Q43 52 50 68', 2.2, '#C95F1E'),
    g('translate(74 58) rotate(-22)', [pf('M-12 0 Q-8 -7 6 -5 Q14 -2 12 4 Q0 8 -12 0 Z', flosse, 1.8)]),
    ...augeHell(35, 45, 6.4),
    linie('M18 56 Q26 62 33 58', 2),
    el(40, 58, 5, 3, WANGE, 0),
    ...blase(12, 30, 5.5),
    ...blase(6, 16, 3.8),
    ...blase(16, 7, 3),
  ])
}

function kaefer(): Zeichnung {
  const decke = '#A9683A'
  const dunkel = '#4B3427'
  const bein = (d: string): Form => linie(d, 3.4, dunkel)
  return z([0, 0, 112, 122], [
    boden(56, 118, 34),
    bein('M26 56 L9 46 L3 54'), bein('M24 72 L6 72 L2 82'), bein('M26 90 L10 100 L6 110'),
    bein('M86 56 L103 46 L109 54'), bein('M88 72 L106 72 L110 82'), bein('M86 90 L102 100 L106 110'),
    linie('M49 14 Q40 4 33 8 M63 14 Q72 4 79 8', 2.4),
    kr(32, 8.5, 3.8, dunkel, 1.6), kr(80, 8.5, 3.8, dunkel, 1.6),
    pf('M56 40 Q88 40 90 76 Q90 112 56 116 Q22 112 22 76 Q24 40 56 40 Z', decke, 2.6),
    linie('M56 42 L56 115', 2),
    linie('M40 48 Q35 76 41 106 M72 48 Q77 76 71 106', 1.6, '#7C4A26'),
    glanz('M32 62 Q30 76 33 92', 3.6, 0.55),
    pf('M56 22 Q84 22 84 38 Q70 46 56 46 Q42 46 28 38 Q28 22 56 22 Z', '#6E4A32', 2.4),
    glanz('M38 30 Q44 26 52 26', 2.6, 0.5),
    kr(56, 17, 11, dunkel, 2.4),
    ...augeHell(51, 15, 3.6),
    ...augeHell(61, 15, 3.6),
  ])
}

function spinne(): Zeichnung {
  const kroerper = '#7B62AE'
  const kroerperD = '#5C4891'
  const beine = (spiegel: boolean): Form[] => {
    const wege = ['M56 62 L28 30 L12 46', 'M52 68 L20 54 L4 78', 'M52 76 L18 80 L6 106', 'M56 86 L28 100 L22 122']
    return wege.flatMap((d) => {
      const dd = spiegel ? d.replace(/(-?\d+(\.\d+)?) (-?\d+(\.\d+)?)/g, (_, x, __, y) => `${130 - Number(x)} ${y}`) : d
      return tube(dd, kroerperD, 4)
    })
  }
  return z([0, 0, 130, 130], [
    linie('M65 0 L65 26', 2),
    ...beine(false),
    ...beine(true),
    kr(65, 46, 23, kroerper, 2.6),
    kr(58, 38, 3.2, '#B7A2DD', 1.2),
    kr(73, 40, 2.6, '#B7A2DD', 1.2),
    kr(66, 52, 2.4, '#B7A2DD', 1.2),
    glanz('M48 36 Q51 28 58 25', 3, 0.5),
    kr(65, 76, 19, kroerper, 2.6),
    ...augeHell(57, 72, 6.6),
    ...augeHell(73, 72, 6.6),
    linie('M58 84 Q65 91 72 84', 2.4),
    el(50, 82, 4.6, 2.8, WANGE, 0),
    el(80, 82, 4.6, 2.8, WANGE, 0),
  ])
}

function gluehwuermchen(): Zeichnung {
  const braun = '#6E4A32'
  const dunkel = '#4B3427'
  return z([0, 0, 134, 108], [
    { t: 'circle', cx: 98, cy: 68, r: 46, f: LICHT, s: 'none', o: 0.2 },
    { t: 'circle', cx: 98, cy: 68, r: 33, f: LICHT, s: 'none', o: 0.28 },
    linie('M40 78 L36 92 M54 80 L52 96 M66 78 L68 94', 2.6, dunkel),
    // Flügel
    el(66, 34, 28, 11, '#E3EEF9', 1.8, -26),
    el(76, 38, 24, 9, '#D3E4F4', 1.8, -12),
    // Körper
    el(62, 56, 26, 15, braun, 2.6, -6),
    el(98, 68, 21, 14, '#FFE766', 2.6, 14),
    linie('M86 62 Q88 70 90 78 M98 58 Q100 68 102 78', 1.6, '#E3B52C'),
    glanz('M88 58 Q94 54 102 56', 3, 0.85),
    // Kopf
    kr(34, 52, 14, dunkel, 2.4),
    linie('M30 40 Q24 28 15 26 M38 39 Q38 26 32 18', 2.2),
    kr(15, 26, 2.6, dunkel, 1.4), kr(32, 18, 2.6, dunkel, 1.4),
    ...augeHell(30, 51, 4.4),
    linie('M32 60 Q36 64 41 60', 1.8, 'papier'),
    funke(116, 22, 0.9, GELB),
    funke(122, 98, 0.7, GELB),
    funke(14, 86, 0.6, GELB),
    funke(78, 98, 0.55, 'papier'),
  ])
}

// =============================================================================
// 5  Dinge: Schlüssel, Plätzchen, Schatten, Matsch, Warnweste, Fahrkarte
// =============================================================================

function schluessel(): Zeichnung {
  return z([-4, -4, 134, 134], [
    boden(64, 122, 36),
    drehen(-40, 62, 62, [
      pf('M52 52 L112 52 Q116 52 116 56 L116 60 Q116 64 112 64 L52 64 Z', GELB, 2.6),
      pf('M92 62 L92 78 Q92 82 96 82 L100 82 Q104 82 104 78 L104 62 Z', GELB, 2.4),
      pf('M106 62 L106 74 Q106 78 110 78 L114 78 Q118 78 118 74 L118 62 Z', GELB, 2.4),
      rr(54, 46, 8, 24, GELB_D, 3, 2.2),
      pf(ringPfad(32, 58, 25, 25, 12, 12), GELB, 2.6),
      glanz('M16 46 Q22 36 34 34', 4, 0.8),
      glanz('M68 55 L88 55', 2.6, 0.7),
    ]),
  ])
}

function plaetzchen(): Zeichnung {
  const teig = '#E2AE6B'
  const teigD = '#C98F4D'
  const krume = (x: number, y: number, r: number): Form => el(x, y, r, r * 0.7, '#6B4630', 1.3, 25)
  const herz = (s: number): string => {
    const p = (x: number, y: number) => `${(x * s).toFixed(1)} ${(y * s).toFixed(1)}`
    return `M${p(0, 20)} Q${p(-30, 2)} ${p(-22, -12)} Q${p(-14, -24)} ${p(0, -10)} Q${p(14, -24)} ${p(22, -12)} Q${p(30, 2)} ${p(0, 20)} Z`
  }
  return z([0, 0, 152, 106], [
    boden(76, 100, 66),
    // Stern mit Zuckerguss
    g('translate(100 40) rotate(12)', [
      pf(sternPfad(0, 0, 33, 17), teig, 2.6),
      pf(sternPfad(0, 0, 22, 11), '#FFF6EA', 1.6),
      kr(0, -2, 2.4, ROT, 1), kr(-8, 7, 2.2, BLAU, 1), kr(8, 7, 2.2, GRUEN, 1),
    ]),
    // runder Keks mit Schokostückchen
    kr(42, 62, 31, teig, 2.6),
    kr(42, 62, 25, teigD, 0),
    kr(42, 62, 25, teig, 0),
    krume(30, 50, 5), krume(52, 46, 5), krume(60, 68, 5), krume(40, 76, 5), krume(28, 68, 4.4), krume(46, 62, 4),
    glanz('M22 52 Q24 42 34 36', 3.4, 0.6),
    // Herz
    g('translate(112 80)', [pf(herz(1.1), teig, 2.6), pf(herz(0.72), ROSA, 1.6)]),
    glanz('M104 76 Q106 72 110 72', 2.4, 0.9),
    // Krümel
    el(14, 94, 2.4, 1.6, teig, 1.2), el(72, 96, 2.2, 1.5, teig, 1.2),
  ])
}

function schatten(): Zeichnung {
  const t = kind('kurz', '#4A3426', H3, GELB, '#4F6D99')
  const { kx, fussY } = masse('kind')
  const boden0 = fussY + 1
  const lang = 0.95 // wie weit der Schatten nach rechts fällt
  const tief = 0.5 // Breite des Körpers wird zur Tiefe auf dem Boden
  const flach = 0.1
  const dunkel = '#566074'
  // Schattenumriss des winkenden Kindes: liegt flach auf dem Boden, Füße bei den Füßen
  const teile: Form[] = [
    { t: 'circle', cx: 50, cy: 36, r: 23 },
    { t: 'path', d: 'M31 66 Q31 60 40 60 L60 60 Q69 60 69 66 L71 114 L29 114 Z' },
    { t: 'path', d: 'M33 68 L22 108 L32 110 L40 74 Z' },
    { t: 'path', d: 'M67 68 L84 46 L92 52 L74 76 Z' },
    { t: 'rect', x: 40, y: 108, b: 10, h: 44, rx: 4 },
    { t: 'rect', x: 51, y: 108, b: 10, h: 44, rx: 4 },
    { t: 'ellipse', cx: 41, cy: 151, rx: 10, ry: 5 },
    { t: 'ellipse', cx: 59, cy: 151, rx: 10, ry: 5 },
  ]
  const e = (kx + lang * boden0).toFixed(1)
  const f = (boden0 * (1 + flach) - tief * kx).toFixed(1)
  return z([-6, 0, 206, 190], [
    pf('M-4 148 Q60 140 126 146 Q172 142 200 148 L200 184 Q100 192 -4 184 Z', HELLGRUEN, 2.4),
    g(`matrix(0 ${tief} ${-lang} ${-flach} ${e} ${f})`, silhouette(teile, dunkel, 4)),
    ...figur({ t, schatten: false, armR: { c: [80, 68], h: [86, 46] } }),
    // Sonne links oben
    ...Array.from({ length: 8 }, (_, i): Form => {
      const w = (Math.PI * 2 * i) / 8
      return linie(`M${(16 + Math.cos(w) * 13).toFixed(1)} ${(18 + Math.sin(w) * 13).toFixed(1)} L${(16 + Math.cos(w) * 19).toFixed(1)} ${(18 + Math.sin(w) * 19).toFixed(1)}`, 2.6, GELB_D)
    }),
    kr(16, 18, 9, GELB, 2),
  ])
}

function matsch(): Zeichnung {
  const lehm = '#9B6B43'
  const lehmD = '#7A4F2F'
  const druck = '#5C3A22'
  const rille = '#B58A5E'
  const spritzer = (x: number, y: number, s: number, w: number): Form =>
    g(`translate(${x} ${y}) rotate(${w}) scale(${s})`, [pf('M0 -7 Q5 0 4.8 3.6 Q3 7.6 0 7.6 Q-3 7.6 -4.8 3.6 Q-5 0 0 -7 Z', lehm, 1.8)])
  return z([0, 0, 144, 108], [
    pf('M14 60 Q8 36 36 30 Q60 22 84 28 Q116 22 128 46 Q138 68 110 82 Q84 96 52 90 Q18 88 14 60 Z', lehm, 2.6),
    pf('M26 60 Q22 44 44 40 Q64 34 84 38 Q108 34 116 50 Q120 64 102 72 Q80 80 54 77 Q28 75 26 60 Z', lehmD, 0),
    // Stiefelabdruck: Vorderfuß, Absatz, Profilrillen
    g('translate(70 58) rotate(-24) scale(0.78)', [
      pf('M-17 -8 Q-21 -34 -8 -40 Q0 -43 9 -40 Q21 -34 17 -8 Q0 -3 -17 -8 Z', druck, 2),
      pf('M-14 4 Q0 10 14 4 Q17 22 9 30 Q0 34 -9 30 Q-17 22 -14 4 Z', druck, 2),
      linie('M-11 -34 L11 -34 M-14 -26 L14 -26 M-14 -18 L14 -18 M-13 -11 L13 -11', 3, rille),
      linie('M-9 13 L9 13 M-10 21 L10 21', 3, rille),
    ]),
    // Blasen
    kr(104, 50, 4.2, '#B88A5E', 1.4), kr(111, 60, 2.8, '#B88A5E', 1.2), kr(34, 54, 3.4, '#B88A5E', 1.3),
    glanz('M34 38 Q46 30 62 30', 3, 0.35),
    // Spritzer
    spritzer(14, 28, 1.2, -30), spritzer(26, 14, 0.9, -12), spritzer(132, 30, 1.2, 35), spritzer(122, 14, 0.9, 20), spritzer(138, 80, 0.8, 60),
    spritzer(8, 80, 0.8, -60),
  ])
}

function warnweste(): Zeichnung {
  const gelb = '#F2E23A'
  const band = '#BCC5D2'
  return z([8, 0, 104, 130], [
    boden(60, 125, 38),
    pf('M46 6 L32 8 Q26 9 26 16 Q28 36 38 50 Q28 64 28 80 L26 114 Q26 120 32 120 L88 120 Q94 120 94 114 L92 80 Q92 64 82 50 Q92 36 94 16 Q94 9 88 8 L74 6 L60 46 Z', gelb, 2.6),
    pf('M46 6 Q60 18 74 6 L60 46 Z', '#CFC52C', 2),
    // Streifen
    pf('M36.4 8 L46 6 L46 120 L28 120 L28.6 100 L30 80 Q30 64 38 50 Q30 36 36.4 8 Z', gelb, 0),
    rr(36, 9, 10, 111, band, 0, 1.8),
    rr(74, 9, 10, 111, band, 0, 1.8),
    rr(27.4, 78, 65.2, 9, band, 0, 1.8),
    rr(26.8, 98, 66.4, 9, band, 0, 1.8),
    linie('M60 48 L60 120', 1.8),
    rr(57.6, 49, 4.8, 9, METALL, 1.5, 1.4),
    glanz('M39 14 L39 40', 2.2, 0.8),
  ])
}

function fahrkarte(): Zeichnung {
  const umriss = 'M18 14 L94 14 A6 6 0 0 0 106 14 L132 14 Q140 14 140 22 L140 74 Q140 82 132 82 L106 82 A6 6 0 0 0 94 82 L18 82 Q10 82 10 74 L10 22 Q10 14 18 14 Z'
  return z([0, 0, 152, 100], [
    boden(76, 94, 62),
    drehen(-7, 76, 48, [
      pf(umriss, CREME, 2.6),
      pf('M18 14 L94 14 L94 32 L10 32 L10 22 Q10 14 18 14 Z', BLAU, 2),
      linie('M20 23 L88 23', 2.6, 'papier'),
      linie('M100 22 L100 74', 1.8, GRAU),
      // Bus-Zeichen
      rr(24, 42, 52, 26, GELB, 7, 2.2),
      rr(29, 47, 11, 9, GLAS, 2, 1.6), rr(44, 47, 11, 9, GLAS, 2, 1.6), rr(59, 47, 11, 9, GLAS, 2, 1.6),
      kr(37, 70, 5, DUNKEL, 1.6), kr(63, 70, 5, DUNKEL, 1.6),
      // Streifen und Lochung
      ...[[112, 2.4], [116, 1.2], [119, 3], [124, 1.4], [128, 2.4]].map(([x, b]): Form => ({ t: 'rect', x, y: 24, b, h: 30, f: T, s: 'none' })),
      kr(120, 68, 4.6, 'papier', 1.8),
    ]),
  ])
}

// =============================================================================
// 6  Fahrzeuge
// =============================================================================

function auto(): Zeichnung {
  const k = BLAU
  return z([2, 14, 148, 76], [
    boden(76, 86, 64),
    pf('M8 62 L8 52 Q8 44 18 42 L40 40 Q52 20 74 20 L100 20 Q116 22 124 40 L138 44 Q146 46 146 56 L146 62 L128 62 A16 16 0 0 0 96 62 L54 62 A16 16 0 0 0 22 62 Z', k, 2.6),
    pf('M45 40 Q54 25 68 24 L68 40 Z', GLAS, 2.2),
    pf('M74 24 L98 24 Q110 26 117 40 L74 40 Z', GLAS, 2.2),
    kr(92, 34, 6.4, H3, 1.6),
    pf('M86 33 Q86 26 92 26 Q98 26 98 33 Q92 30 86 33 Z', '#4A3426', 1.2),
    linie('M71 24 L71 62', 1.8, BLAU_D),
    rr(77, 47, 9, 3.4, METALL, 1.5, 1.4),
    glanz('M100 38 L116 42', 2.6, 0.7),
    el(141, 52, 5, 4.2, '#FFF3B0', 1.8),
    rr(9, 46, 6, 10, ORANGE, 2, 1.6),
    rr(4, 59, 142, 6, METALL, 3, 1.8),
    ...reifen(38, 64, 14, 8, METALL),
    ...reifen(112, 64, 14, 8, METALL),
  ])
}

function zug(): Zeichnung {
  const schwellen: Form[] = []
  for (let x = 6; x < 200; x += 16) schwellen.push(linie(`M${x} 94 L${x} 100`, 2.4, GRAU))
  return z([0, -14, 202, 122], [
    ...schwellen,
    linie('M0 95 L202 95', 3),
    // Wagen
    rr(6, 36, 72, 42, GELB, 6, 2.6),
    rr(4, 32, 76, 8, DUNKEL, 3, 2.2),
    ...[14, 34, 54].map((x): Form => rr(x, 45, 17, 15, GLAS, 3, 2)),
    rr(6, 66, 72, 5, GELB_D, 0, 1.6),
    kr(26, 82, 8, DUNKEL, 2), kr(26, 82, 3, METALL, 1.2),
    kr(58, 82, 8, DUNKEL, 2), kr(58, 82, 3, METALL, 1.2),
    rr(76, 64, 14, 5, DUNKEL, 2, 1.8),
    // Lok: Kessel, Führerhaus
    rr(94, 46, 62, 34, BLAU, 13, 2.6),
    rr(90, 28, 34, 52, BLAU, 5, 2.6),
    rr(86, 23, 42, 8, DUNKEL, 3, 2.2),
    rr(97, 36, 21, 17, GLAS, 3, 2),
    rr(88, 68, 68, 6, BLAU_D, 0, 1.6),
    // Schornstein
    pf('M134 48 L136 30 L129 21 L153 21 L146 30 L148 48 Z', DUNKEL, 2.4),
    kr(156, 62, 4.4, '#FFF3B0', 1.6),
    rr(152, 76, 12, 6, DUNKEL, 2, 1.6),
    // Dampf
    kr(138, 10, 6.5, 'papier', 2), kr(150, 3, 8, 'papier', 2), kr(166, -4, 6, 'papier', 2),
    // Räder
    kr(106, 85, 11, DUNKEL, 2), kr(106, 85, 4.4, ROT, 1.4),
    kr(130, 85, 11, DUNKEL, 2), kr(130, 85, 4.4, ROT, 1.4),
    kr(148, 88, 7, DUNKEL, 2), kr(148, 88, 3, ROT, 1.2),
    linie('M106 85 L130 85', 2.4, GRAU),
  ])
}

function fahrrad(): Zeichnung {
  const r = ROT
  return z([0, 4, 152, 100], [
    boden(76, 100, 66),
    ...reifen(34, 70, 29, 5, METALL, 8),
    ...reifen(118, 70, 29, 5, METALL, 8),
    kr(68, 70, 8, METALL, 1.8),
    ...tube('M34 70 L68 70', r, 4.6),
    ...tube('M34 70 L60 36', r, 4.6),
    ...tube('M68 70 L58 34', r, 4.6),
    ...tube('M60 37 L104 36', r, 4.6),
    ...tube('M68 70 L106 44', r, 4.6),
    ...tube('M106 44 L118 70', DUNKEL, 4),
    ...tube('M104 36 L99 20', DUNKEL, 4),
    ...tube('M90 22 Q100 16 112 22', DUNKEL, 4),
    kr(112, 22, 3.4, GELB, 1.6),
    pf('M46 29 Q60 22 74 29 Q73 34 60 33 Q48 34 46 29 Z', DUNKEL, 2),
    ...tube('M68 70 L74 82', DUNKEL, 3.4),
    rr(69, 80, 13, 5, DUNKEL, 2, 1.8),
  ])
}

function traktor(): Zeichnung {
  const k = ROT
  const profil: Form[] = []
  for (let i = 0; i < 14; i++) {
    const a = (360 / 14) * i
    profil.push(g(`rotate(${a} 44 76)`, [rr(40.5, 42, 7, 7, DUNKEL, 2, 1.8)]))
  }
  return z([4, 0, 154, 112], [
    boden(80, 108, 70),
    // Chassis
    rr(44, 72, 90, 9, DUNKEL, 3, 2.2),
    // Motorhaube
    rr(80, 50, 64, 28, k, 9, 2.6),
    linie('M132 56 L132 74 M138 56 L138 74', 1.8, ROT_D),
    rr(78, 46, 56, 8, ROT_D, 3, 2),
    ...tube('M108 48 L108 22', DUNKEL, 6),
    kr(112, 12, 4.6, 'papier', 1.8), kr(120, 6, 3.4, 'papier', 1.6),
    // Fahrerhaus
    rr(24, 16, 52, 58, k, 6, 2.6),
    rr(30, 22, 40, 34, GLAS, 4, 2.2),
    linie('M50 22 L50 56', 2),
    glanz('M34 28 L44 28', 2.4, 0.9),
    rr(20, 8, 60, 8, DUNKEL, 4, 2.2),
    // Vorderrad
    ...reifen(126, 90, 17, 7, GELB),
    // Hinterrad mit Profil
    ...profil,
    pf(ringPfad(44, 76, 31, 31, 21, 21), DUNKEL, 2.6),
    kr(44, 76, 12, GELB, 2.2),
    kr(44, 76, 3.6, DUNKEL, 1.4),
    pf('M10 72 Q12 40 44 40 Q76 40 78 72 L72 72 Q70 46 44 46 Q18 46 16 72 Z', k, 2.4),
    kr(144, 58, 4.4, '#FFF3B0', 1.6),
  ])
}

function flugzeug(): Zeichnung {
  const rumpf = '#EEF2F7'
  const fenster: Form[] = [34, 47, 60, 73, 86, 99].map((x) => kr(x, 44, 3.8, '#8EC3E8', 1.6))
  return z([0, 0, 174, 100], [
    drehen(-8, 87, 48, [
      // hinterer Flügel und Höhenleitwerk
      pf('M78 34 L102 8 L116 8 L102 38 Z', '#C5CEDA', 2.2),
      pf('M26 42 L8 50 L18 54 L40 46 Z', '#C5CEDA', 2),
      pf('M22 38 L10 8 L30 8 L46 34 Z', BLAU, 2.4),
      // Rumpf
      pf('M12 46 Q12 32 30 30 L118 30 Q152 30 160 46 Q152 62 118 62 L30 62 Q12 60 12 46 Z', rumpf, 2.6),
      pf('M13 52 L157 52 Q151 60 118 62 L30 62 Q15 60 13 52 Z', BLAU, 1.6),
      pf('M128 35 Q144 35 152 45 L130 45 Z', '#8EC3E8', 2),
      ...fenster,
      glanz('M30 36 L110 35', 2.6, 0.9),
      // vorderer Flügel mit Triebwerk
      pf('M62 52 L100 52 L80 90 Q78 94 70 94 L52 94 Z', '#D5DCE6', 2.6),
      el(84, 76, 15, 8, METALL, 2.4, -25),
      el(97, 70, 3.4, 6.4, DUNKEL, 1.6, -25),
    ]),
  ])
}

function schiff(): Zeichnung {
  const wellen = 'M0 100 Q12 92 25 100 T50 100 T75 100 T100 100 T125 100 T150 100 L150 128 L0 128 Z'
  return z([0, 0, 150, 128], [
    // Mast und Segel
    linie('M74 84 L74 8', 3.4),
    pf('M78 14 L78 78 L126 78 Z', '#FBF6E8', 2.4),
    pf('M78 48 L102 48 L112 62 L78 62 Z', ROT, 1.6),
    pf('M70 22 L70 78 L26 78 Z', '#F9E3A0', 2.4),
    pf('M74 8 L94 14 L74 20 Z', GELB, 1.8),
    // Rumpf
    pf('M16 82 L134 82 Q128 106 106 114 L44 114 Q22 106 16 82 Z', ROT, 2.6),
    rr(14, 78, 122, 8, ROT_D, 4, 2.2),
    kr(46, 96, 4.4, GLAS, 1.8), kr(72, 98, 4.4, GLAS, 1.8), kr(98, 96, 4.4, GLAS, 1.8),
    glanz('M24 90 Q28 98 36 104', 2.8, 0.55),
    // Wasser
    pf(wellen, '#BFDDF2', 2.2),
    linie('M18 112 Q28 108 38 112 M96 116 Q106 112 116 116', 2, '#7FA6C4'),
  ])
}

function roller(): Zeichnung {
  const deck = '#4FA8C4'
  return z([0, 0, 116, 134], [
    boden(56, 128, 50),
    // Lenkstange
    ...tube('M88 106 L92 116', DUNKEL, 4),
    ...tube('M88 104 L84 24', METALL, 5.4),
    rr(68, 12, 34, 10, ROT, 5, 2.4),
    // Trittbrett
    pf('M12 96 L84 96 Q88 96 88 100 L88 104 Q88 108 84 108 L16 108 Q10 108 10 102 Q10 96 12 96 Z', deck, 2.6),
    linie('M24 102 L44 102 M54 102 L74 102', 1.8, 'papier'),
    kr(88, 98, 3.4, GELB, 1.6),
    // Räder
    pf('M10 112 Q10 88 30 88 L36 98 L22 106 Z', deck, 2.2),
    ...reifen(20, 114, 13, 7, GELB),
    ...reifen(92, 114, 13, 7, GELB),
  ])
}

export const ALLTAG: Record<string, () => Zeichnung> = {
  // Obst, Gemüse, Essen
  apfel,
  zitrone,
  mandarine,
  karotte,
  rosine,
  flasche,
  // Wetter und Jahreszeit
  sonne,
  wolke,
  regen,
  schneemann,
  blume,
  eiswuerfel,
  // Sand, Garten, Burg
  giesskanne,
  eimer,
  schaufel,
  burg,
  drache,
  rakete,
  // Fisch, Käfer, Spinne, Glühwürmchen
  fisch,
  kaefer,
  spinne,
  gluehwuermchen,
  // Schlüssel, Plätzchen, Schatten, Matsch, Warnweste, Fahrkarte
  schluessel,
  plaetzchen,
  schatten,
  matsch,
  warnweste,
  fahrkarte,
  // Fahrzeuge
  auto,
  zug,
  fahrrad,
  traktor,
  flugzeug,
  schiff,
  roller,
}

export const ALLTAG_NAMEN = Object.keys(ALLTAG)


// ---------------------------------------------------------------------------
// Farbige Motive für die Spielschule (Cycle 1): Lernen und Forschen, Schule und
// Bücher, Bewegung und Bühne, dazu zwei Figuren für die Melusina-Sage (fee, ritter).
// Gleicher Strich wie motive-dinge.ts (Tinte als Umriss, flache warme Farben,
// abgerundete Formen, keine Schrift, keine Marken). Farben und Bausteine kommen
// von dort, damit alles zusammenpasst. Jedes Motiv muss auf einer Karte
// (ca. 35 mm, mindestens 18 mm) und im Schwarzweißdruck noch zu erkennen sein:
// jede Fläche hat eine Kontur (wichtig für `modus: "anmalen"`).
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { masse, tube, type Typ } from './figuren'
import {
  BLAU, BLAU_D, CREME, DUNKEL, GELB, GELB_D, GLAS, GRAU, GRUEN, GRUEN_D, H3, H4, HELLBLAU, HOLZ, HOLZ_D, LICHT, LILA, METALL, ORANGE, ROSA, ROT, ROT_D,
  aufKopf, figur, g, glanz, hand as handKreis, linie, silhouette, sternPfad, tropfen, z, zuege,
} from './motive-dinge'

const T = 'tinte'

// --- kleine Helfer ------------------------------------------------------------------
const rr = (x: number, y: number, b: number, h: number, f: string, rx = 3, w = 2.2): Form => ({ t: 'rect', x, y, b, h, rx, f, s: T, w })
const pf = (d: string, f: string, w = 2.2): Form => ({ t: 'path', d, f, s: T, w })
const kr = (cx: number, cy: number, r: number, f: string, w = 2.2): Form => ({ t: 'circle', cx, cy, r, f, s: T, w })
const el = (cx: number, cy: number, rx: number, ry: number, f: string, w = 2.2): Form => ({ t: 'ellipse', cx, cy, rx, ry, f, s: w ? T : 'none', w })
const boden = (cx: number, cy: number, rx: number, ry = 3.4): Form => ({ t: 'ellipse', cx, cy, rx, ry, f: 'hellgrau', s: 'none' })
const punkt = (cx: number, cy: number, r: number, f: string): Form => ({ t: 'circle', cx, cy, r, f, s: 'none' })
const stern = (cx: number, cy: number, R: number, f = GELB, w = 1.6): Form => pf(sternPfad(cx, cy, R, R * 0.45), f, w)

/** Funkeln: kleiner vierzackiger Stern. */
const funke = (x: number, y: number, s = 1, f = GELB): Form =>
  g(`translate(${x} ${y}) scale(${s})`, [{ t: 'path', d: 'M0 -7 Q1 -1 7 0 Q1 1 0 7 Q-1 1 -7 0 Q-1 -1 0 -7 Z', f, s: T, w: 1.4 }])


/** Punkte auf einer quadratischen Kurve (für Rollen und Schläuche als gefüllte, ausmalbare Formen). */
function bogen(a: [number, number], c: [number, number], b: [number, number], n = 12): [number, number][] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n
    return [(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1]] as [number, number]
  })
}

/** Rolle oder Schlauch: Kette aus Kreisen, als eine Silhouette mit Umriss gezeichnet. */
function rolle(punkte: [number, number][], r: number, farbe: string, strich = 4.4): Form[] {
  return silhouette(punkte.map(([cx, cy]): Form => ({ t: 'circle', cx, cy, r })), farbe, strich)
}

/** Ring (Ellipse mit Loch) als ein Pfad. */
const ringPfad = (cx: number, cy: number, ra: number, rb: number, ia: number, ib: number): string =>
  `M${cx - ra} ${cy} A${ra} ${rb} 0 1 1 ${cx + ra} ${cy} A${ra} ${rb} 0 1 1 ${cx - ra} ${cy} Z M${cx - ia} ${cy} A${ia} ${ib} 0 1 0 ${cx + ia} ${cy} A${ia} ${ib} 0 1 0 ${cx - ia} ${cy} Z`

// =============================================================================
// 1  Forschen und Entdecken
// =============================================================================

function leuchttisch(): Zeichnung {
  return z([0, 0, 150, 112], [
    { t: 'ellipse', cx: 80, cy: 40, rx: 70, ry: 32, f: LICHT, s: 'none', o: 0.3 },
    linie('M80 3 L80 11 M52 6 L55 13 M108 6 L105 13 M24 17 L31 22 M136 17 L129 22', 2.6, GELB_D),
    boden(76, 107, 58),
    rr(18, 80, 9, 26, HOLZ_D, 2, 2),
    rr(114, 80, 9, 26, HOLZ_D, 2, 2),
    pf('M8 66 L118 66 L118 86 Q118 90 114 90 L12 90 Q8 90 8 86 Z', DUNKEL, 2.6),
    pf('M118 66 L142 34 L142 58 L118 90 Z', '#363E4E', 2.4),
    pf('M8 66 L32 34 L142 34 L118 66 Z', DUNKEL, 2.6),
    pf('M18 62 L40 37 L134 37 L112 62 Z', '#FFF6C2', 1.8),
    el(48, 50, 14, 9, '#F28B82', 2),
    pf('M62 60 L92 60 L77 40 Z', '#7DB6EE', 2),
    { t: 'ellipse', cx: 63, cy: 54, rx: 11, ry: 8, f: '#F7D45A', s: T, w: 2, o: 0.82 },
    pf('M98 60 L114 60 L126 42 L110 42 Z', '#8CD28B', 2),
    glanz('M25 58 L38 42', 2.4, 0.9),
    kr(104, 78, 3.8, GELB, 1.6),
    linie('M22 78 L42 78', 2.4, GRAU),
  ])
}

function lupe(): Zeichnung {
  return z([4, 4, 108, 108], [
    boden(52, 106, 34, 3),
    g('rotate(-42 46 46)', [
      pf('M40 70 L52 70 L53 108 Q53 114 46 114 Q39 114 39 108 Z', HOLZ, 2.4),
      rr(36, 62, 20, 12, ROT, 4, 2.4),
      linie('M42 80 L42 104', 2, HOLZ_D),
    ]),
    kr(46, 46, 36, ROT, 2.6),
    kr(46, 46, 29, GLAS, 2.4),
    { t: 'circle', cx: 46, cy: 46, r: 29, f: HELLBLAU, s: 'none', o: 0.55 },
    glanz('M28 36 Q31 26 41 22', 4, 0.95),
    glanz('M25 47 Q25 44 26 42', 3, 0.95),
  ])
}

function magnet(): Zeichnung {
  const nagel = (x: number, y: number, w: number): Form =>
    g(`translate(${x} ${y}) rotate(${w})`, [rr(-2, -9, 4, 16, METALL, 1.5, 1.6), rr(-4.5, -11, 9, 3.5, GRAU, 1.5, 1.6)])
  return z([8, 0, 104, 112], [
    boden(60, 108, 36, 3),
    nagel(32, 16, -12),
    nagel(88, 14, 14),
    linie('M18 34 L12 28 M102 34 L108 28 M60 30 L60 22', 2.6, GELB_D),
    pf('M24 34 L48 34 L48 66 A12 12 0 0 0 60 78 L60 102 A36 36 0 0 1 24 66 Z', ROT, 2.6),
    pf('M96 34 L72 34 L72 66 A12 12 0 0 1 60 78 L60 102 A36 36 0 0 0 96 66 Z', BLAU, 2.6),
    rr(22, 28, 28, 13, METALL, 2, 2.2),
    rr(70, 28, 28, 13, METALL, 2, 2.2),
    glanz('M31 50 L31 68', 3.4, 0.7),
  ])
}

function kompass(): Zeichnung {
  const marken: Form[] = []
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i
    const gross = i % 2 === 0
    const r1 = gross ? 25 : 28
    const r2 = 34
    marken.push(linie(`M${(56 + Math.sin(a) * r1).toFixed(1)} ${(68 - Math.cos(a) * r1).toFixed(1)} L${(56 + Math.sin(a) * r2).toFixed(1)} ${(68 - Math.cos(a) * r2).toFixed(1)}`, gross ? 3.4 : 2, T))
  }
  return z([4, 2, 104, 120], [
    boden(56, 118, 38, 3),
    { t: 'circle', cx: 56, cy: 12, r: 8, f: 'none', s: T, w: 8 },
    { t: 'circle', cx: 56, cy: 12, r: 8, f: 'none', s: METALL, w: 3.6 },
    rr(48, 18, 16, 10, GELB_D, 3, 2.2),
    kr(56, 68, 46, GELB_D, 2.6),
    kr(56, 68, 38, CREME, 2.2),
    ...marken,
    g('rotate(32 56 68)', [
      pf('M56 28 L65 68 L47 68 Z', ROT, 2.2),
      pf('M56 108 L65 68 L47 68 Z', 'papier', 2.2),
    ]),
    kr(56, 68, 4.5, DUNKEL, 1.8),
    glanz('M24 52 Q27 42 36 36', 3.4, 0.7),
  ])
}

function knete(): Zeichnung {
  return z([2, 4, 126, 100], [
    boden(66, 99, 56),
    // große rote Kugel
    pf('M34 52 Q32 28 58 24 Q86 22 92 46 Q96 72 68 78 Q38 80 34 52 Z', '#E4675A', 2.6),
    glanz('M46 40 Q50 32 60 30', 4, 0.8),
    // ausgestochener gelber Stern
    g('translate(0 4)', [pf(sternPfad(106, 56, 17, 8), '#D9A62E', 2.4)]),
    pf(sternPfad(106, 56, 17, 8), '#F5CB4C', 2.4),
    glanz('M99 50 L103 46', 2.6, 0.85),
    // kleine blaue Kugel
    pf('M14 78 Q12 64 28 62 Q44 62 44 78 Q42 92 28 93 Q14 92 14 78 Z', '#6C9BD8', 2.4),
    glanz('M20 72 Q22 67 28 66', 3, 0.8),
    // grüne Rolle, eingerollt
    ...rolle([...bogen([50, 92], [74, 98], [98, 90]), ...bogen([98, 90], [112, 84], [108, 72])], 6.5, '#8CCB6A'),
    linie('M62 90 L63 95 M76 92 L76 97 M90 91 L91 95', 1.6, '#4F8A45'),
  ])
}

function sanduhr(): Zeichnung {
  const sand = '#F2CF6B'
  return z([4, 0, 72, 124], [
    boden(40, 120, 30, 3),
    rr(8, 4, 64, 12, HOLZ, 3, 2.4),
    rr(8, 104, 64, 12, HOLZ, 3, 2.4),
    rr(10, 16, 6, 88, HOLZ_D, 2, 2),
    rr(64, 16, 6, 88, HOLZ_D, 2, 2),
    pf('M20 16 Q20 46 38 58 L38 62 Q20 74 20 104 L60 104 Q60 74 42 62 L42 58 Q60 46 60 16 Z', GLAS, 2.4),
    pf('M25 40 Q26 50 37 58 L43 58 Q54 50 55 40 Q40 46 25 40 Z', sand, 1.8),
    pf('M25 104 Q26 90 35 82 Q40 78 45 82 Q54 90 55 104 Z', sand, 1.8),
    linie('M40 58 L40 82', 2, GELB_D),
    glanz('M26 22 Q26 36 31 46', 3.4, 0.9),
  ])
}

function wasseruhr(): Zeichnung {
  const wasser = '#9CC9EA'
  return z([0, 0, 100, 132], [
    boden(50, 128, 44, 3),
    rr(8, 120, 84, 8, HOLZ, 3, 2.4),
    rr(10, 6, 7, 116, HOLZ_D, 2, 2),
    rr(83, 6, 7, 116, HOLZ_D, 2, 2),
    // oberes Gefäß mit Loch
    pf('M20 10 L80 10 L72 46 Q71 50 66 50 L34 50 Q29 50 28 46 Z', GLAS, 2.4),
    pf('M23 22 L77 22 L72 45 Q71 48 66 48 L34 48 Q29 48 28 45 Z', wasser, 1.8),
    linie('M23 22 Q36 18 50 22 Q64 26 77 22', 2, '#5E8DB4'),
    rr(46, 50, 8, 8, METALL, 2, 1.8),
    tropfen(50, 70, 1),
    tropfen(50, 86, 0.8),
    // unteres Gefäß mit Strichen
    pf('M26 76 L74 76 L74 114 Q74 120 68 120 L32 120 Q26 120 26 114 Z', GLAS, 2.4),
    pf('M28 104 L72 104 L72 114 Q72 118 68 118 L32 118 Q28 118 28 114 Z', wasser, 1.8),
    linie('M66 86 L74 86 M66 94 L74 94 M66 102 L74 102', 2),
    glanz('M32 82 L32 98', 3, 0.9),
  ])
}

// =============================================================================
// 2  Schule, Bücher, Malen
// =============================================================================

function schule(): Zeichnung {
  const fenster = (x: number, y: number): Form[] => [
    rr(x, y, 15, 17, GLAS, 2, 2),
    linie(`M${x + 7.5} ${y} L${x + 7.5} ${y + 17} M${x} ${y + 8.5} L${x + 15} ${y + 8.5}`, 1.6),
  ]
  const wand = '#F2C58E'
  return z([0, 0, 160, 120], [
    boden(80, 113, 72, 3),
    // Seitenflügel
    rr(6, 58, 52, 52, wand, 2, 2.4),
    rr(102, 58, 52, 52, wand, 2, 2.4),
    rr(2, 51, 60, 9, ROT_D, 2.5, 2.4),
    rr(98, 51, 60, 9, ROT_D, 2.5, 2.4),
    ...fenster(14, 68), ...fenster(36, 68), ...fenster(14, 90), ...fenster(36, 90),
    ...fenster(108, 68), ...fenster(130, 68), ...fenster(108, 90), ...fenster(130, 90),
    // Mittelbau mit Giebel
    rr(50, 38, 60, 72, wand, 2, 2.6),
    pf('M42 40 L80 10 L118 40 Z', ROT, 2.6),
    kr(80, 27, 8.5, 'papier', 2.2),
    linie('M80 27 L80 21 M80 27 L85 29', 2),
    ...fenster(58, 48), ...fenster(87, 48),
    // Tür mit Stufen
    pf('M66 110 L66 84 Q66 76 80 76 Q94 76 94 84 L94 110 Z', BLAU_D, 2.4),
    linie('M80 77 L80 110', 2),
    kr(76, 96, 1.6, GELB, 1),
    kr(84, 96, 1.6, GELB, 1),
    rr(62, 108, 36, 5, '#D6DBE2', 1.5, 2),
    // Fahne
    linie('M30 51 L30 24', 2.4),
    pf('M30 24 L48 29 L30 35 Z', GELB, 2),
  ])
}

function pinsel(): Zeichnung {
  const farbe = ROT
  return z([4, 4, 112, 112], [
    // Farbstrich unten
    pf('M10 106 Q30 94 52 104 Q76 114 104 100 Q106 110 98 114 Q74 120 52 112 Q28 106 14 114 Q6 112 10 106 Z', farbe, 2.2),
    g('rotate(38 60 60)', [
      pf('M56 6 Q60 2 64 6 Q67 28 69 50 L51 50 Q53 28 56 6 Z', BLAU, 2.4),
      rr(49, 50, 22, 4, GELB, 2, 1.8),
      pf('M51 54 L69 54 L68 74 L52 74 Z', METALL, 2.2),
      linie('M52 60 L68 60 M52.5 66 L67.5 66', 1.6, GRAU),
      pf('M52 74 L68 74 Q74 90 60 108 Q46 90 52 74 Z', farbe, 2.4),
      pf('M52 74 L68 74 L69 82 Q60 86 51 82 Z', CREME, 1.8),
      glanz('M56 40 L58 20', 2.6, 0.7),
    ]),
  ])
}

function radiergummi(): Zeichnung {
  const kruemel: [number, number, number][] = [[18, 70, -20], [32, 78, 30], [8, 78, 10], [26, 64, 60]]
  return z([0, 0, 130, 92], [
    boden(66, 84, 52, 3),
    ...kruemel.map(([x, y, w]): Form => g(`translate(${x} ${y}) rotate(${w})`, [el(0, 0, 4.4, 2.6, '#F4B6BD', 1.4)])),
    g('rotate(-12 70 46)', [
      // Block
      pf('M20 30 L32 14 L118 14 L106 30 Z', '#F9D3D6', 2.4),
      pf('M106 30 L118 14 L118 44 L106 60 Z', '#E58FA0', 2.4),
      rr(20, 30, 86, 30, '#F4A9B7', 6, 2.6),
      // Pappe
      pf('M54 30 L66 14 L118 14 L106 30 Z', BLAU, 2.4),
      pf('M106 30 L118 14 L118 44 L106 60 Z', BLAU_D, 2.4),
      rr(54, 30, 52, 30, BLAU, 4, 2.6),
      { t: 'rect', x: 66, y: 30, b: 8, h: 30, f: 'papier', s: T, w: 1.8 },
      glanz('M28 38 L28 52', 3.4, 0.75),
    ]),
  ])
}

function buch(): Zeichnung {
  return z([0, 4, 140, 104], [
    boden(70, 104, 58, 3),
    // Einband
    pf('M4 30 Q38 20 70 32 Q102 20 136 30 L136 94 Q102 86 70 98 Q38 86 4 94 Z', BLAU, 2.6),
    // Seitenstapel
    pf('M9 90 Q38 82 70 94 Q102 82 131 90 L131 94 Q102 87 70 98 Q38 87 9 94 Z', 'papier', 1.8),
    // Seiten
    pf('M70 30 Q40 16 9 26 L9 86 Q40 78 70 90 Z', CREME, 2.4),
    pf('M70 30 Q100 16 131 26 L131 86 Q100 78 70 90 Z', CREME, 2.4),
    // Bild links: Sonne und Hügel
    rr(18, 32, 42, 38, HELLBLAU, 3, 2),
    punkt(31, 43, 5.5, GELB),
    pf('M18 68 L18 60 Q38 44 60 60 L60 68 Q60 70 57 70 L21 70 Q18 70 18 68 Z', GRUEN, 1.8),
    // Bild rechts: Regenbogen
    rr(80, 32, 42, 38, '#FDE9E4', 3, 2),
    pf('M86 66 Q86 44 101 44 Q116 44 116 66 L110 66 Q110 50 101 50 Q92 50 92 66 Z', ROT, 1.2),
    pf('M92 66 Q92 50 101 50 Q110 50 110 66 L104 66 Q104 56 101 56 Q98 56 98 66 Z', GELB, 1.2),
    pf('M98 66 Q98 56 101 56 Q104 56 104 66 Z', BLAU, 1.2),
    // Lesezeichen
    pf('M112 84 L112 102 L118 97 L124 102 L124 86 Z', ROT, 1.8),
    linie('M70 30 L70 90', 2),
  ])
}

function buecherregal(): Zeichnung {
  const farben = [ROT, BLAU, GELB, GRUEN, ORANGE, LILA, '#4E9CB0', ROSA]
  const reihe = (y0: number, y1: number, startX: number, liste: [number, number][], schief = -1): Form[] => {
    const out: Form[] = []
    let x = startX
    liste.forEach(([b, h], i) => {
      const f = farben[(i * 3 + Math.round(y0 / 10)) % farben.length]
      const book: Form[] = [
        rr(0, 0, b, h, f, 1.2, 1.8),
        linie(`M1 ${h * 0.22} L${b - 1} ${h * 0.22} M1 ${h * 0.78} L${b - 1} ${h * 0.78}`, 1.4, 'papier'),
      ]
      if (i === schief) out.push(g(`translate(${x + b + 4} ${y1}) rotate(14)`, [g(`translate(${-b} ${-h})`, book)]))
      else out.push(g(`translate(${x} ${y1 - h})`, book))
      x += b + 1.6
    })
    return out
  }
  return z([4, 2, 112, 124], [
    rr(10, 6, 100, 114, HOLZ, 4, 2.6),
    rr(16, 12, 88, 102, '#F3E2C8', 1, 2),
    ...reihe(0, 42, 20, [[9, 24], [8, 28], [10, 22], [7, 26], [9, 29], [11, 23], [8, 27]], -1),
    rr(16, 42, 88, 5, HOLZ, 1, 2),
    ...reihe(10, 77, 20, [[10, 26], [8, 30], [9, 25], [11, 28], [8, 24], [9, 29]], 5),
    rr(16, 77, 88, 5, HOLZ, 1, 2),
    ...reihe(20, 112, 20, [[8, 24], [10, 29], [9, 25], [8, 28], [11, 23], [9, 27], [10, 26]], -1),
  ])
}

// =============================================================================
// 3  Bewegung, Musik, Zirkus
// =============================================================================

function mikrofon(): Zeichnung {
  const gitter: Form[] = []
  for (const d of [-13, -6.5, 0, 6.5, 13]) {
    const h = Math.sqrt(24 * 24 - d * d) - 2.5
    gitter.push({ t: 'line', x1: 50 - h, y1: 34 + d, x2: 50 + h, y2: 34 + d, s: '#8E98A8', w: 1.5 })
    gitter.push({ t: 'line', x1: 50 + d, y1: 34 - h, x2: 50 + d, y2: 34 + h, s: '#8E98A8', w: 1.5 })
  }
  return z([0, 0, 120, 130], [
    boden(66, 124, 24, 3),
    linie('M70 18 Q82 36 70 54 M80 10 Q98 36 80 62', 3.4, GELB_D),
    g('rotate(-22 55 75)', [
      pf('M38 62 L62 62 L58 112 Q58 120 50 120 Q42 120 42 112 Z', BLAU, 2.6),
      rr(34, 54, 32, 12, GELB, 4, 2.4),
      kr(50, 34, 24, METALL, 2.8),
      ...gitter,
      rr(45, 82, 10, 6, 'papier', 3, 1.6),
      glanz('M34 24 Q38 16 46 13', 3.6, 0.95),
      rr(40, 108, 20, 8, DUNKEL, 3, 2),
    ]),
  ])
}

function trommel(): Zeichnung {
  return z([0, 0, 120, 116], [
    boden(60, 110, 46),
    pf('M16 46 L16 86 Q16 100 60 100 Q104 100 104 86 L104 46 Z', ROT, 2.6),
    linie('M18 54 L35 93 L52 54 L68 96 L86 54 L102 90', 6, T),
    linie('M18 54 L35 93 L52 54 L68 96 L86 54 L102 90', 3, CREME),
    { t: 'path', d: 'M16 84 Q16 100 60 100 Q104 100 104 84', f: 'none', s: T, w: 8 },
    { t: 'path', d: 'M16 84 Q16 100 60 100 Q104 100 104 84', f: 'none', s: METALL, w: 4.2 },
    el(60, 46, 44, 13, METALL, 2.6),
    el(60, 46, 39, 9.8, '#FFF4DC', 1.8),
    g('translate(26 6) rotate(35.3)', [rr(0, -3, 58.8, 6, HOLZ, 3, 2.2)]),
    g('translate(94 6) rotate(144.7)', [rr(0, -3, 58.8, 6, HOLZ, 3, 2.2)]),
    kr(74, 40, 5.5, HOLZ_D, 2),
    kr(46, 40, 5.5, HOLZ_D, 2),
  ])
}

function zirkuszelt(): Zeichnung {
  const xs = [20, 40, 60, 80, 100, 120]
  const dach: Form[] = []
  const wand: Form[] = [{ t: 'rect', x: 20, y: 58, b: 100, h: 48, f: 'papier', s: T, w: 2.6 }]
  for (let i = 0; i < 5; i++) {
    const a = xs[i]
    const b = xs[i + 1]
    const m = (a + b) / 2
    dach.push(pf(`M70 4 L${a} 60 Q${m} 74 ${b} 60 Z`, i % 2 === 0 ? ROT : 'papier', 2.4))
    wand.push({ t: 'rect', x: a, y: 60, b: b - a, h: 46, f: i % 2 === 0 ? 'papier' : ROT, s: T, w: 2 })
  }
  return z([10, -16, 120, 130], [
    boden(70, 110, 56),
    ...wand,
    pf('M60 106 L60 88 Q60 74 70 74 Q80 74 80 88 L80 106 Z', DUNKEL, 2.4),
    pf('M60 106 L60 88 Q60 78 63 75 Q62 90 64 106 Z', ROT_D, 1.6),
    pf('M80 106 L80 88 Q80 78 77 75 Q78 90 76 106 Z', ROT_D, 1.6),
    ...dach,
    linie('M70 4 L70 -10', 2.4),
    pf('M70 -12 L90 -6 L70 0 Z', GELB, 2),
    kr(70, 4, 3, GELB_D, 1.6),
  ])
}

function turnmatte(): Zeichnung {
  const gruen = '#74B86C'
  const gruenD = '#4F8A45'
  return z([0, 0, 150, 98], [
    boden(80, 93, 66),
    // Bank hinten
    rr(14, 26, 8, 38, HOLZ_D, 2, 2),
    rr(80, 26, 8, 38, HOLZ_D, 2, 2),
    rr(8, 60, 20, 5, HOLZ_D, 2, 1.8),
    rr(74, 60, 20, 5, HOLZ_D, 2, 1.8),
    rr(16, 42, 70, 5, ROT, 2, 2),
    rr(4, 14, 98, 13, HOLZ, 3.5, 2.6),
    linie('M12 19 L94 19', 1.6, HOLZ_D),
    // Matte vorne: dick, mit Nähten und Griffen
    pf('M30 72 Q24 72 28 66 L50 52 Q52 48 58 48 L136 48 Q144 48 138 54 L116 70 Q114 72 108 72 Z', gruen, 2.6),
    { t: 'path', d: 'M55 72 L83 48 M85 72 L113 48', f: 'none', s: 'papier', w: 1.8, dash: '4 3' },
    pf('M114 72 L142 50 Q144 52 144 56 L144 64 L114 88 Z', gruenD, 2.4),
    rr(24, 72, 90, 16, gruen, 6, 2.6),
    rr(38, 77, 14, 6, GELB, 3, 1.8),
    rr(86, 77, 14, 6, GELB, 3, 1.8),
    glanz('M30 79 L30 83', 3, 0.8),
  ])
}

function rad(): Zeichnung {
  const profil: Form[] = []
  for (let i = 0; i < 20; i++) {
    const a = (Math.PI * 2 * i) / 20
    profil.push(linie(`M${(55 + Math.cos(a) * 39.8).toFixed(1)} ${(55 + Math.sin(a) * 39.8).toFixed(1)} L${(55 + Math.cos(a) * 44.4).toFixed(1)} ${(55 + Math.sin(a) * 44.4).toFixed(1)}`, 3.2, '#7A8396'))
  }
  const speichen: Form[] = []
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI * 2 * i) / 8 + Math.PI / 8
    speichen.push(g(`rotate(${((a * 180) / Math.PI).toFixed(1)} 55 55)`, [rr(55, 51.6, 33, 6.8, HOLZ, 3.2, 2)]))
  }
  return z([4, 4, 102, 102], [
    boden(55, 104, 40, 3),
    kr(55, 55, 47, DUNKEL, 2.8),
    ...profil,
    kr(55, 55, 38, HOLZ, 2.4),
    kr(55, 55, 30, '#FBF3E4', 2.2),
    ...speichen,
    kr(55, 55, 10, HOLZ_D, 2.2),
    kr(55, 55, 3, DUNKEL, 1.2),
    { t: 'path', d: 'M20 40 Q26 24 42 17', f: 'none', s: 'papier', w: 3.6, o: 0.55 },
  ])
}

function fallschirm(): Zeichnung {
  const xs = [8, 32.8, 57.6, 82.4, 107.2, 132]
  const farben = [ROT, GELB, BLAU, GELB, ROT]
  const kappe: Form[] = []
  for (let i = 0; i < 5; i++) {
    const a = xs[i]
    const b = xs[i + 1]
    const m = (a + b) / 2
    const ca = 70 + (a - 70) * 0.92
    const cb = 70 + (b - 70) * 0.92
    kappe.push(pf(`M70 8 Q${ca} 14 ${a} 62 Q${m} 52 ${b} 62 Q${cb} 14 70 8 Z`, farben[i], 2.4))
  }
  const hand = (x: number): Form[] => [...tube(`M${x < 70 ? 63 : 77} 118 Q${x < 70 ? 56 : 84} 118 ${x < 70 ? 56 : 84} 110`, '#4F79B8', 7), kr(x < 70 ? 56 : 84, 106, 4.4, H4, 1.8)]
  return z([0, 0, 140, 150], [
    // Schnüre
    ...xs.map((x): Form => linie(`M${x} 62 Q${x + (70 - x) * 0.3} 90 ${x < 70 ? 56 : x > 70 ? 84 : 70} 106`, 1.6)),
    // kleine Spielfigur
    ...hand(40),
    ...hand(100),
    rr(61, 116, 18, 24, '#4F79B8', 7, 2.2),
    rr(63, 134, 6, 10, DUNKEL, 3, 1.6),
    rr(71, 134, 6, 10, DUNKEL, 3, 1.6),
    kr(70, 108, 10.5, H3, 2.2),
    { t: 'path', d: 'M60 106 Q60 96 70 96 Q80 96 80 106 Q74 101 70 102 Q66 101 60 106 Z', f: '#4A3426', s: T, w: 1.6 },
    punkt(66.5, 109, 1.5, T),
    punkt(73.5, 109, 1.5, T),
    { t: 'path', d: 'M66.5 113.5 Q70 116 73.5 113.5', f: 'none', s: T, w: 1.4 },
    ...kappe,
    kr(70, 8, 3, GELB_D, 1.6),
    glanz('M30 34 Q40 22 56 16', 3.4, 0.7),
  ])
}

// =============================================================================
// 4  Zuhause, Garten, Müll
// =============================================================================

function muelltonne(): Zeichnung {
  return z([0, 0, 130, 134], [
    boden(60, 129, 36, 3),
    // Tonne
    pf('M26 54 L94 54 L88 118 Q87 123 82 123 L38 123 Q33 123 32 118 Z', GRUEN, 2.6),
    linie('M44 68 L46 112 M60 68 L60 112 M76 68 L74 112', 2.2, GRUEN_D),
    kr(40, 123, 6, DUNKEL, 2),
    kr(80, 123, 6, DUNKEL, 2),
    glanz('M31 68 L35 108', 3.4, 0.6),
    rr(24, 52, 72, 6, '#33402F', 2, 2),
    // Deckel steht links offen
    g('rotate(9 94 50)', [rr(18, 40, 82, 12, GRUEN_D, 5, 2.6), rr(44, 34, 32, 8, GRUEN_D, 4, 2.2)]),
    // Papierkugel fliegt hinein
    linie('M18 30 Q14 40 22 48', 2, GRAU),
    g('translate(26 14) rotate(-15)', [
      pf('M-10 -2 Q-12 -10 -3 -11 Q4 -14 9 -8 Q14 -2 8 6 Q2 12 -5 9 Q-12 6 -10 -2 Z', 'papier', 2.2),
      linie('M-5 -4 L2 -1 L-2 5 M3 -7 L5 2', 1.4, GRAU),
    ]),
  ])
}

function gartenschlauch(): Zeichnung {
  return z([0, 0, 152, 104], [
    boden(52, 98, 50, 3.2),
    pf(ringPfad(52, 80, 49, 22, 35, 8), GRUEN, 2.6),
    pf(ringPfad(52, 66, 45, 20.5, 31, 6.5), GRUEN, 2.6),
    pf(ringPfad(52, 52, 41, 19, 27, 5), GRUEN, 2.6),
    { t: 'ellipse', cx: 52, cy: 52, rx: 27, ry: 5, f: 'hellgrau', s: 'none' },
    glanz('M14 78 Q16 86 28 90', 2.6, 0.7),
    // Schlauchende zur Düse
    ...rolle(bogen([86, 52], [104, 52], [108, 36]), 4.8, GRUEN, 3.8),
    g('translate(110 30) rotate(-38)', [
      rr(-7, -12, 14, 16, GELB, 3, 2.2),
      rr(-5, -24, 10, 14, ORANGE, 3, 2.2),
      linie('M-4 -18 L4 -18', 1.6),
    ]),
    // Wasserstrahl
    linie('M120 14 Q132 8 144 16 M122 24 Q136 20 148 32 M118 6 Q124 -1 134 1', 2.8, '#7FB2D9'),
    tropfen(140, 8, 0.8),
    tropfen(148, 24, 0.75),
    tropfen(132, 36, 0.7),
  ])
}

// =============================================================================
// 5  Sage: Wasserfee und Ritter
// =============================================================================

function fee(): Zeichnung {
  const haar = '#B5532F'
  const haut = H3
  const top = LILA
  const schwanz = '#4FA8C4'
  const schuppe = '#2F7F9C'
  const schuppen: Form[] = []
  const reihen: [number, number][][] = [
    [[53, 104], [62, 104], [71, 104]],
    [[57.5, 112], [66.5, 112], [75.5, 112]],
    [[62, 120], [71, 120], [80, 120]],
    [[74, 129], [83, 129], [92, 130]],
    [[96, 131], [105, 130]],
  ]
  for (const r of reihen) for (const [x, y] of r) schuppen.push(linie(`M${x - 4.4} ${y - 2.2} Q${x} ${y + 5.6} ${x + 4.4} ${y - 2.2}`, 1.6, schuppe))
  return z([2, -4, 150, 164], [
    // Wasser
    { t: 'path', d: 'M2 146 Q16 138 30 146 T58 146 T86 146 T114 146 T142 146 L150 146 L150 160 L2 160 Z', f: '#CFE3F3', s: T, w: 2.2 },
    linie('M16 154 Q24 150 32 154 M96 154 Q104 150 112 154', 2, '#7FA6C4'),
    // Flügel
    pf('M52 66 C36 42 16 32 12 46 C8 62 28 78 52 80 Z', '#D7ECF8', 2.2),
    pf('M72 66 C88 42 108 32 112 46 C116 62 96 78 72 80 Z', '#D7ECF8', 2.2),
    linie('M48 68 Q30 52 18 44 M48 74 Q30 68 14 54', 1.4, '#7FA6C4'),
    linie('M76 68 Q94 52 106 44 M76 74 Q94 68 110 54', 1.4, '#7FA6C4'),
    // Haare hinten
    pf('M42 40 Q38 14 62 14 Q86 14 82 40 L88 78 Q80 92 72 78 L52 78 Q44 92 36 78 Z', haar, 2.4),
    // Schwanz
    pf('M44 96 C44 126 66 142 94 142 C110 142 120 136 126 128 L124 120 C118 124 112 124 104 124 C90 124 80 116 80 96 Z', schwanz, 2.6),
    ...schuppen,
    pf('M125 124 C128 112 138 102 148 100 C146 110 144 118 138 123 C144 128 146 136 144 144 C136 142 128 136 125 124 Z', '#9CD4E4', 2.4),
    linie('M132 122 L142 108 M132 124 L140 136', 1.6, schuppe),
    glanz('M48 108 Q50 120 58 128', 3, 0.55),
    // Oberkörper
    ...tube('M46 70 Q34 80 40 98', haut, 8),
    kr(40, 99, 4.6, haut, 2),
    rr(57, 54, 10, 12, haut, 2, 2),
    pf('M46 66 Q46 60 56 60 L68 60 Q78 60 78 66 L80 96 Q62 100 44 96 Z', top, 2.4),
    pf('M54 60 Q62 70 70 60', haut, 2),
    rr(43, 91, 38, 7, '#7C66B0', 3, 2),
    kr(62, 94.5, 2.6, GELB, 1.4),
    // Ärmel und Arm mit Zauberstab
    ...tube('M76 70 Q94 70 98 54', haut, 8),
    kr(98, 52, 4.6, haut, 2),
    kr(46, 69, 8, top, 2.2),
    kr(78, 69, 8, top, 2.2),
    { t: 'path', d: 'M100 50 L112 32', f: 'none', s: T, w: 4.6 },
    { t: 'path', d: 'M100 50 L112 32', f: 'none', s: HOLZ, w: 2.2 },
    kr(98, 52, 4.6, haut, 2),
    stern(114, 28, 9, GELB, 1.8),
    // Kopf
    kr(62, 40, 18, haut, 2.4),
    aufKopf(zuege('lacht'), 62, 40, 18),
    pf('M43 39 Q43 19 62 19 Q81 19 81 39 Q76 29 64 30 Q54 33 50 24 Q46 30 43 39 Z', haar, 2.2),
    pf('M43 40 Q36 60 42 80 Q50 70 50 56 Z', haar, 2.2),
    pf('M81 40 Q88 60 82 80 Q74 70 74 56 Z', haar, 2.2),
    stern(52, 24, 4.4, GELB, 1.2),
    // Funkeln und Tropfen
    funke(24, 22, 1, GELB),
    funke(128, 62, 0.8, GELB),
    funke(130, 14, 0.7, 'papier'),
    tropfen(18, 112, 1),
    tropfen(30, 128, 0.8),
  ])
}

function ritter(): Zeichnung {
  const stahl = '#B9C2CE'
  const t: Typ = { haar: 'kurz', haarFarbe: '#8A6440', haut: H3, shirt: stahl, hose: '#7F8A9A', alter: 'erwachsen' }
  const { kx } = masse('erwachsen')
  return z([0, -22, 100, 182], [
    ...figur({
      t,
      armL: { c: [18, 60], h: [24, 78] },
      armR: { c: [82, 56], h: [82, 70] },
      nachTorso: [
        pf('M31 47 L69 47 L71 98 Q50 104 29 98 Z', BLAU, 2.4),
        rr(28, 80, 44, 6, HOLZ_D, 2, 1.8),
        rr(46, 79, 8, 8, GELB, 1.5, 1.6),
        stern(50, 64, 8, GELB, 1.5),
        pf('M40 45 Q50 56 60 45', stahl, 2),
      ],
      vorne: [
        // Schwert
        pf('M78 66 L78 22 L82 12 L86 22 L86 66 Z', METALL, 2.2),
        linie('M82 18 L82 62', 1.4, GRAU),
        rr(72, 64, 20, 5, GELB_D, 2, 2),
        rr(80, 68, 4, 14, HOLZ_D, 1.5, 1.6),
        kr(82, 85, 3.6, GELB_D, 1.6),
        handKreis(82, 72, H3, 5.4),
        // Schild
        pf('M6 66 L40 66 L40 88 Q40 106 23 116 Q6 106 6 88 Z', ROT, 2.6),
        stern(23, 87, 11, GELB, 1.8),
        // Helm
        pf(`M${kx - 20} 28 L${kx - 20} 16 Q${kx - 20} -3 ${kx} -3 Q${kx + 20} -3 ${kx + 20} 16 L${kx + 20} 28 L${kx + 15} 28 L${kx + 15} 16 Q${kx} 8 ${kx - 15} 16 L${kx - 15} 28 Z`, stahl, 2.4),
        glanz(`M${kx - 15} 8 Q${kx - 13} 0 ${kx - 6} -1`, 3, 0.85),
        pf(`M${kx - 6} -2 Q${kx - 14} -14 ${kx} -19 Q${kx + 16} -20 ${kx + 20} -8 Q${kx + 8} -10 ${kx + 6} -2 Z`, ROT, 2),
      ],
    }),
  ])
}

export const LERNEN: Record<string, () => Zeichnung> = {
  // Forschen und Entdecken
  leuchttisch,
  lupe,
  magnet,
  kompass,
  knete,
  sanduhr,
  wasseruhr,
  // Schule, Bücher, Malen
  schule,
  pinsel,
  radiergummi,
  buch,
  buecherregal,
  // Bewegung, Musik, Zirkus
  mikrofon,
  trommel,
  zirkuszelt,
  turnmatte,
  rad,
  fallschirm,
  // Zuhause, Garten, Müll
  muelltonne,
  gartenschlauch,
  // Sage
  fee,
  ritter,
}

export const LERNEN_NAMEN = Object.keys(LERNEN)

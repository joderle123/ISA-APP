// ---------------------------------------------------------------------------
// Neue farbige Motive, Teil 1: Dinge und Zeichen, die auf Karten und in Auswahlrastern
// am häufigsten vorkommen und bisher nur als graues Piktogramm da waren (Fußball,
// Puzzle, Tropfen, Herz, Würfel, Glühbirne, Palette …). Gleicher Strich wie
// motive-alltag.ts: Tinte als Umriss, flache warme Flächen, weiße Glanzlichter,
// jede Fläche mit Kontur (wichtig für `modus: "anmalen"`), keine Schrift.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { tube } from './figuren'
import {
  BLAU, CREME, DUNKEL, GELB, GELB_D, GRAU, GRUEN, H1, H2, H4, HOLZ, HOLZ_D, LICHT, LILA, METALL, ORANGE, ROT, ROT_D, g, glanz, herz as herzKlein, linie, silhouette, z,
} from './motive-dinge'
import { T, boden, drehen, el, funke, klippKreis, kr, pf, poly, puzzleTeil, punkt, rr, schattenKugel, vieleck } from './motive-neu-helfer'

// =============================================================================
// Spiel und Sport
// =============================================================================

function fussball(): Zeichnung {
  const cx = 60
  const cy = 58
  const R = 48
  const mitte = vieleck(cx, cy, 15, 5, -90)
  const rand = Array.from({ length: 5 }, (_, i) => {
    const w = -90 + 72 * i
    const a = (w * Math.PI) / 180
    return klippKreis(vieleck(cx + Math.cos(a) * 58, cy + Math.sin(a) * 58, 19, 5, w + 180), cx, cy, R - 1)
  })
  const spokes = mitte.map(([x, y], i) => {
    const a = ((-90 + 72 * i) * Math.PI) / 180
    return `M${x.toFixed(1)} ${y.toFixed(1)} L${(cx + Math.cos(a) * 40).toFixed(1)} ${(cy + Math.sin(a) * 40).toFixed(1)}`
  })
  return z([0, 0, 120, 124], [
    boden(60, 112, 38),
    kr(cx, cy, R, 'papier', 2.8),
    schattenKugel(cx, cy, R - 1.4, '#DCE3EC'),
    ...rand.map((p) => poly(p, T, 1.6)),
    ...spokes.map((d) => linie(d, 2.2)),
    poly(mitte, T, 2),
    glanz('M26 40 Q32 26 46 20', 4.4, 0.95),
    kr(cx, cy, R, 'none', 2.8),
  ])
}

function puzzle(): Zeichnung {
  const a = puzzleTeil(6, 34, 58, [1, 1, 0, 0])
  const b = puzzleTeil(66.6, 34, 58, [-1, 0, 1, -1])
  return z([0, 14, 140, 102], [
    boden(70, 110, 56),
    pf(b, '#F2B84B', 2.6),
    glanz('M78 100 Q78 104 86 104', 3.6, 0.75),
    pf(a, '#6FA3DD', 2.6),
    glanz('M16 46 Q16 42 22 42 L34 42', 3.6, 0.75),
    glanz('M16 60 L16 74', 3.6, 0.75),
  ])
}

function tropfen(): Zeichnung {
  const d = 'M50 8 C50 8 14 52 14 78 C14 99 30 114 50 114 C70 114 86 99 86 78 C86 52 50 8 50 8 Z'
  return z([0, 0, 100, 128], [
    el(50, 118, 36, 6, '#CFE5F5', 2),
    pf(d, '#6DB3E6', 2.8),
    { t: 'path', d: 'M50 112 C70 112 86 99 86 78 C86 66 80 54 73 43 C76 70 68 102 34 108 C39 111 44 112 50 112 Z', f: '#4F97D2', s: 'none' },
    glanz('M28 76 Q27 92 38 102', 5, 0.85),
    glanz('M36 56 Q42 44 48 36', 3.2, 0.7),
    pf(d, 'none', 2.8),
  ])
}

function herz(): Zeichnung {
  const d = 'M60 106 C22 76 6 56 6 36 C6 18 20 8 34 8 C46 8 55 15 60 26 C65 15 74 8 86 8 C100 8 114 18 114 36 C114 56 98 76 60 106 Z'
  return z([0, 0, 120, 116], [
    boden(60, 111, 32),
    pf(d, ROT, 2.8),
    { t: 'path', d: 'M60 106 C98 76 114 56 114 36 C114 28 111 22 106 17 C108 52 86 84 52 102 Z', f: ROT_D, s: 'none', o: 0.45 },
    glanz('M20 38 Q18 26 28 20 Q34 17 40 18', 4.6, 0.9),
    pf(d, 'none', 2.8),
    funke(106, 12, 0.8, 'papier'),
  ])
}

function wuerfel(): Zeichnung {
  // Isometrisch: oben Raute, links und rechts Seitenflächen
  const oben = poly([[60, 8], [110, 34], [60, 60], [10, 34]], '#FFF9EC', 2.6)
  const links = poly([[10, 34], [60, 60], [60, 114], [10, 88]], '#F3E5C8', 2.6)
  const rechts = poly([[110, 34], [60, 60], [60, 114], [110, 88]], '#E2CFA4', 2.6)
  const pip = (x: number, y: number, r = 5.2): Form => kr(x, y, r, ROT, 1.4)
  // linke Fläche: Punkt (u, v) → x = 10 + 50u, y = 34 + 26u + 54v
  const L = (u: number, v: number): [number, number] => [10 + 50 * u, 34 + 26 * u + 54 * v]
  const Rr = (u: number, v: number): [number, number] => [60 + 50 * u, 60 - 26 * u + 54 * v]
  const O = (u: number, v: number): [number, number] => [60 - 50 * u + 50 * v, 8 + 26 * u + 26 * v]
  const links5 = [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]].map(([u, v]) => pip(...L(u, v)))
  const rechts3 = [[0.22, 0.25], [0.5, 0.5], [0.78, 0.75]].map(([u, v]) => pip(...Rr(u, v)))
  const oben2 = [[0.3, 0.3], [0.7, 0.7]].map(([u, v]) => pip(...O(u, v), 4.6))
  return z([0, 0, 120, 124], [
    boden(60, 117, 44),
    oben,
    links,
    rechts,
    ...oben2,
    ...links5,
    ...rechts3,
    glanz('M17 36 L17 46', 3, 0.9),
  ])
}

function bauklotz(): Zeichnung {
  const oben = poly([[60, 14], [110, 38], [60, 62], [10, 38]], '#F7D774', 2.6)
  const links = poly([[10, 38], [60, 62], [60, 112], [10, 88]], '#7FAEE3', 2.6)
  const rechts = poly([[110, 38], [60, 62], [60, 112], [110, 88]], '#E9786C', 2.6)
  // Stern auf der linken, Kreis auf der rechten Fläche (flach verzerrt wie die Flächen)
  const stern = g('matrix(1 0.52 0 1 0 0) translate(35 52)', [pf('M0 -14 L4 -5 L14 -4 L7 3 L9 13 L0 8 L-9 13 L-7 3 L-14 -4 L-4 -5 Z', 'papier', 1.8)])
  const kreis = g('matrix(1 -0.52 0 1 0 0) translate(85 112)', [{ t: 'circle', cx: 0, cy: 0, r: 13, f: 'papier', s: T, w: 1.8 }])
  return z([0, 6, 120, 118], [
    boden(60, 117, 44),
    oben,
    links,
    rechts,
    stern,
    kreis,
    glanz('M17 42 L17 52', 3, 0.9),
    glanz('M32 26 L50 18', 3, 0.9),
  ])
}

// =============================================================================
// Sinne: Auge, Ohr, Handschlag
// =============================================================================

function augeGross(): Zeichnung {
  const form = 'M8 50 Q70 -6 132 50 Q70 106 8 50 Z'
  // Wimpern: Fuß auf dem oberen Lid, Spitze nach außen
  const wimpern: [number, number, number, number][] = [[26, 30, 12, 14], [42, 20, 30, 7], [58, 15, 54, 2], [82, 15, 86, 2], [98, 20, 110, 7], [114, 30, 128, 14]]
  return z([0, -8, 140, 118], [
    el(70, 100, 52, 5, 'hellgrau', 0),
    ...wimpern.map(([x1, y1, x2, y2]) => linie(`M${x1} ${y1 + 6} L${x2} ${y2 + 4}`, 3.6)),
    pf(form, 'papier', 2.8),
    kr(70, 50, 29, '#6BA9D6', 2.4),
    kr(70, 50, 21, '#4E8BBF', 0),
    kr(70, 50, 12, T, 0),
    punkt(61, 40, 6, 'papier'),
    punkt(78, 58, 2.8, 'papier'),
    { t: 'path', d: form, f: 'none', s: T, w: 2.8 },
  ])
}

/** Ohr von der Seite (Raster ca. 100 × 128); mit `klang` kleine Schallbögen links davon. */
export function ohrFormen(klang: boolean): Form[] {
  const aussen = 'M64 6 C34 6 22 28 24 50 C25 66 34 72 38 86 C42 104 52 120 70 120 C88 120 96 104 92 88 C90 78 96 72 102 62 C112 34 94 6 64 6 Z'
  return [
    pf(aussen, H2, 2.8),
    linie('M62 24 C44 24 40 44 46 56 C52 68 60 70 58 84', 3.2, '#C99366'),
    linie('M66 44 C58 44 56 54 62 60 C66 64 70 66 70 74', 2.6, '#C99366'),
    pf('M52 94 C54 104 62 108 70 106 C70 98 62 92 52 94 Z', '#E8B88E', 1.8),
    glanz('M38 44 Q36 32 46 22', 3.4, 0.7),
    ...(klang ? [linie('M14 50 Q8 64 14 78', 3.2, BLAU), linie('M4 40 Q-4 64 4 88', 3.2, BLAU)] : []),
  ]
}

function ohrGross(): Zeichnung {
  return z([-4, 0, 134, 128], [boden(66, 124, 34), ...ohrFormen(true)])
}

function naseNah(): Zeichnung {
  const teile: Form[] = [
    { t: 'ellipse', cx: 55, cy: 44, rx: 16, ry: 34 },
    { t: 'circle', cx: 55, cy: 76, r: 20 },
    { t: 'ellipse', cx: 36, cy: 80, rx: 11, ry: 10 },
    { t: 'ellipse', cx: 74, cy: 80, rx: 11, ry: 10 },
  ]
  return z([0, 0, 110, 112], [
    boden(55, 106, 36),
    ...silhouette(teile, H2, 5),
    linie('M30 72 Q26 83 34 91', 2.2, '#C99366'),
    linie('M80 72 Q84 83 76 91', 2.2, '#C99366'),
    el(46, 87, 5.2, 3.4, '#7A4B2E', 0, 15),
    el(64, 87, 5.2, 3.4, '#7A4B2E', 0, -15),
    el(52, 71, 6, 4, '#FBE4D0', 0, -20),
    glanz('M50 22 Q47 42 51 60', 3.4, 0.7),
    linie('M12 58 Q5 70 12 82', 3.2, BLAU),
    linie('M98 58 Q105 70 98 82', 3.2, BLAU),
  ])
}

function haendedruck(): Zeichnung {
  const finger = (x: number, y: number): Form => drehen(40, x, y, [rr(x - 5.5, y - 15, 11, 30, H1, 5.5, 2.2)])
  return z([14, 0, 132, 104], [
    boden(80, 100, 54),
    // Ärmel
    rr(-4, 38, 42, 52, BLAU, 8, 2.6),
    rr(30, 40, 11, 48, CREME, 3, 2.2),
    rr(122, 38, 42, 52, ORANGE, 8, 2.6),
    rr(119, 40, 11, 48, CREME, 3, 2.2),
    // linke Hand (hinten, dunklere Haut)
    pf('M40 46 L66 42 Q90 40 104 52 Q110 60 102 68 L92 74 L64 80 L40 82 Z', H4, 2.4),
    // rechte Hand (vorn, hellere Haut) mit vier Fingern über der linken
    pf('M122 46 L106 44 Q92 46 86 54 L80 68 Q82 76 96 78 L122 82 Z', H1, 2.4),
    finger(86, 76),
    finger(76, 70),
    finger(68, 62),
    finger(62, 54),
    // Daumen der linken Hand oben
    pf('M62 46 Q74 32 92 34 Q106 36 104 44 Q98 48 86 46 Q76 44 68 52 Z', H4, 2.4),
    herzKlein(80, 16, 1.4),
  ])
}

// =============================================================================
// Licht, Farbe, Spuren
// =============================================================================

function gluehbirne(): Zeichnung {
  const glas = 'M60 14 C34 14 20 34 20 54 C20 70 30 78 36 90 L36 100 L84 100 L84 90 C90 78 100 70 100 54 C100 34 86 14 60 14 Z'
  const strahlen = Array.from({ length: 7 }, (_, i) => {
    const a = ((-160 + i * 50) * Math.PI) / 180
    const r1 = 56
    const r2 = 68
    return linie(`M${(60 + Math.cos(a) * r1).toFixed(1)} ${(56 + Math.sin(a) * r1).toFixed(1)} L${(60 + Math.cos(a) * r2).toFixed(1)} ${(56 + Math.sin(a) * r2).toFixed(1)}`, 3.4, GELB_D)
  })
  return z([-8, -10, 136, 152], [
    { t: 'ellipse', cx: 60, cy: 54, rx: 54, ry: 50, f: LICHT, s: 'none', o: 0.25 },
    ...strahlen,
    pf(glas, '#FFE57A', 2.8),
    { t: 'path', d: 'M60 100 L84 100 L84 90 C90 78 100 70 100 54 C100 46 97 38 92 31 C94 56 84 84 60 100 Z', f: '#F3C94A', s: 'none', o: 0.55 },
    linie('M48 92 L48 70 Q54 58 60 70 Q66 58 72 70 L72 92', 2.4),
    glanz('M31 50 Q30 38 38 30', 4.4, 0.95),
    pf(glas, 'none', 2.8),
    rr(34, 100, 52, 10, METALL, 3, 2.4),
    rr(36, 110, 48, 9, GRAU, 3, 2.4),
    rr(38, 119, 44, 8, METALL, 3, 2.4),
    pf('M48 127 L72 127 Q70 136 60 136 Q50 136 48 127 Z', DUNKEL, 2.2),
  ])
}

function palette(): Zeichnung {
  const brett = 'M70 8 C30 8 6 34 8 62 C10 92 40 106 68 100 C82 97 80 84 90 80 C102 76 108 86 122 82 C138 76 136 42 114 24 C102 13 86 8 70 8 Z'
  const kleckse: [number, number, string][] = [[34, 36, ROT], [56, 24, GELB], [82, 24, BLAU], [106, 38, GRUEN], [28, 64, LILA]]
  return z([0, 0, 152, 114], [
    boden(72, 107, 54),
    pf(brett, HOLZ, 2.8),
    glanz('M22 56 Q18 44 26 34', 3.4, 0.6),
    el(56, 74, 8, 6.5, 'papier', 2.4, -20),
    ...kleckse.map(([x, y, f]): Form => g(`translate(${x} ${y})`, [
      pf('M-10 -2 Q-12 -10 -3 -11 Q4 -14 9 -8 Q14 -2 8 4 Q2 9 -5 7 Q-11 5 -10 -2 Z', f, 2),
      glanz('M-6 -4 Q-4 -8 0 -8', 2.4, 0.8),
    ])),
    // Pinsel quer
    ...tube('M96 106 L132 66', HOLZ_D, 5),
    pf('M130 68 L140 58 L146 64 L136 74 Z', METALL, 1.8),
    pf('M140 58 Q146 48 138 46 Q130 48 134 54 Z', ROT, 1.8),
  ])
}

function fussspuren(): Zeichnung {
  const sohle = (rechts: boolean): Form[] => {
    const s = rechts ? 1 : -1
    const teile: Form[] = [
      { t: 'ellipse', cx: 0, cy: -12, rx: 11.5, ry: 16 },
      { t: 'ellipse', cx: 1 * s, cy: 13, rx: 8.5, ry: 10 },
      { t: 'rect', x: -7, y: -2, b: 14, h: 14, rx: 6 },
      { t: 'circle', cx: -9 * s, cy: -34, r: 5.2 },
      { t: 'circle', cx: -2 * s, cy: -39, r: 4.6 },
      { t: 'circle', cx: 5 * s, cy: -38, r: 4.2 },
      { t: 'circle', cx: 11 * s, cy: -33, r: 3.8 },
      { t: 'circle', cx: 14 * s, cy: -26, r: 3.2 },
    ]
    return silhouette(teile, '#E8A56A', 3.4)
  }
  const spur = (x: number, y: number, w: number, rechts: boolean, s = 1): Form => g(`translate(${x} ${y}) rotate(${w}) scale(${s})`, sohle(rechts))
  return z([0, -2, 120, 164], [
    spur(34, 136, -8, false),
    spur(82, 100, 8, true),
    spur(36, 64, -8, false, 0.88),
    spur(80, 36, 8, true, 0.76),
  ])
}

export const NEU_DINGE: Record<string, () => Zeichnung> = {
  fussball,
  puzzle,
  tropfen,
  herz,
  wuerfel,
  bauklotz,
  'auge-nah': augeGross,
  'ohr-nah': ohrGross,
  'nase-nah': naseNah,
  haendedruck,
  gluehbirne,
  palette,
  fussspuren,
}

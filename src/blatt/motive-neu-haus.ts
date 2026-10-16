// ---------------------------------------------------------------------------
// Neue farbige Motive, Teil 4: Dinge für Zuhause, Schule und Unterwegs (Korb, Paket,
// Glocke, Geschenk, Sprechblasen, Kissen, Tür, Werkzeug, Uhr, Wecker …).
// Stil wie motive-alltag.ts: Tinte als Umriss, flache warme Flächen, weiße Glanzlichter,
// jede Fläche mit Kontur (wichtig für `modus: "anmalen"`), keine Schrift, keine Marken.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { tube } from './figuren'
import {
  BLAU, CREME, DUNKEL, GELB, GELB_D, GLAS, GRAU, GRUEN, HELLBLAU, HOLZ, HOLZ_D, LICHT, LILA, METALL, ORANGE, ROSA, ROT, ROT_D, g, glanz, linie, silhouette, z,
} from './motive-dinge'
import { T, boden, drehen, el, kr, pf, poly, punkt, rr } from './motive-neu-helfer'

const GOLD = '#F4C842'
const GOLD_D = '#D9A62E'

// =============================================================================
// Haushalt
// =============================================================================

function korb(): Zeichnung {
  const koerper = 'M16 52 L114 52 L102 100 Q100 107 93 107 L37 107 Q30 107 28 100 Z'
  const xl = (y: number) => 16 + (12 * (y - 52)) / 48
  const xr = (y: number) => 114 - (12 * (y - 52)) / 48
  const flecht: Form[] = []
  ;[64, 76, 88].forEach((y, r) => {
    flecht.push(linie(`M${xl(y).toFixed(1)} ${y} L${xr(y).toFixed(1)} ${y}`, 1.8, HOLZ_D))
    for (let x = 26 + (r % 2) * 8; x < 106; x += 16) {
      if (x > xl(y + 6) + 3 && x < xr(y + 6) - 3) flecht.push(linie(`M${x} ${y - 11} L${x} ${y + 1}`, 1.8, HOLZ_D))
    }
  })
  for (let x = 34; x < 98; x += 16) flecht.push(linie(`M${x} 89 L${x} 101`, 1.8, HOLZ_D))
  return z([0, 0, 130, 114], [
    boden(65, 110, 48),
    ...tube('M30 52 C28 4 102 4 100 52', HOLZ_D, 7),
    pf(koerper, HOLZ, 2.6),
    ...flecht,
    rr(10, 44, 110, 13, HOLZ_D, 6, 2.6),
    glanz('M20 50 L60 50', 2.6, 0.5),
  ])
}

function thermometer(): Zeichnung {
  const rohr = 'M24 20 Q24 6 35 6 Q46 6 46 20 L46 90 Q58 97 58 112 Q58 132 35 132 Q12 132 12 112 Q12 97 24 90 Z'
  const saeule = 'M31.5 38 Q31.5 34 35 34 Q38.5 34 38.5 38 L38.5 99 Q48 103 48 112 Q48 125 35 125 Q22 125 22 112 Q22 103 31.5 99 Z'
  const striche: Form[] = [24, 38, 52, 66, 80].map((y, i) => linie(`M50 ${y} L${i % 2 ? 56 : 62} ${y}`, 2.2))
  return z([0, 0, 72, 142], [
    boden(35, 138, 26),
    pf(rohr, GLAS, 2.8),
    pf(saeule, ROT, 1.8),
    glanz('M17 108 Q16 118 23 124', 3.2, 0.9),
    glanz('M29 14 L29 28', 3, 0.9),
    ...striche,
    pf(rohr, 'none', 2.8),
  ])
}

function paket(): Zeichnung {
  const oben: [number, number][] = [[62, 12], [112, 36], [62, 60], [12, 36]]
  const links: [number, number][] = [[12, 36], [62, 60], [62, 112], [12, 88]]
  const rechts: [number, number][] = [[112, 36], [62, 60], [62, 112], [112, 88]]
  const R = (u: number, v: number): [number, number] => [62 + 50 * u, 60 - 26 * u + 52 * v]
  return z([0, 4, 124, 120], [
    boden(62, 117, 46),
    poly(oben, '#EACF9E', 2.6),
    poly(links, '#D5AC6E', 2.6),
    poly(rechts, '#BF9156', 2.6),
    poly([[28.7, 28], [95.3, 28], [112, 36], [95.3, 44], [28.7, 44], [12, 36]], CREME, 1.8),
    poly([R(0.25, 0.35), R(0.75, 0.35), R(0.75, 0.7), R(0.25, 0.7)], 'papier', 1.8),
    linie(`M${R(0.33, 0.48).join(' ')} L${R(0.67, 0.48).join(' ')}`, 1.6, GRAU),
    linie(`M${R(0.33, 0.6).join(' ')} L${R(0.55, 0.6).join(' ')}`, 1.6, GRAU),
    glanz('M20 40 L56 58', 2.4, 0.5),
  ])
}

function glocke(): Zeichnung {
  return z([-6, 0, 136, 124], [
    boden(62, 119, 34),
    linie('M14 40 Q6 52 14 64', 3, GOLD_D),
    linie('M6 30 Q-4 52 6 74', 3, GOLD_D),
    linie('M110 40 Q118 52 110 64', 3, GOLD_D),
    linie('M118 30 Q128 52 118 74', 3, GOLD_D),
    kr(62, 106, 9, GOLD_D, 2.4),
    kr(62, 12, 6, GOLD_D, 2.4),
    pf('M62 14 C42 14 34 30 34 52 C34 74 26 82 16 94 L108 94 C98 82 90 74 90 52 C90 30 82 14 62 14 Z', GOLD, 2.8),
    { t: 'path', d: 'M108 94 C98 82 90 74 90 52 C90 40 87 30 82 24 C84 56 92 80 100 94 Z', f: GOLD_D, s: 'none', o: 0.55 },
    rr(12, 90, 100, 12, '#E5B233', 6, 2.6),
    glanz('M46 30 Q42 46 44 64', 4.2, 0.85),
  ])
}

function feder(): Zeichnung {
  const blatt = 'M60 4 C84 16 96 44 92 72 C90 84 86 90 80 94 L90 100 C80 110 70 114 62 118 C44 104 26 84 24 58 C22 34 40 14 60 4 Z'
  const rechts = 'M60 6 C84 16 96 44 92 72 C90 84 86 90 80 94 L90 100 C80 110 70 114 62 118 C62 80 62 40 60 6 Z'
  const l: Form[] = ['M60 40 C50 36 42 30 36 22', 'M60 56 C48 52 38 46 30 38', 'M60 72 C48 68 36 62 28 54', 'M60 88 C50 84 40 78 32 70', 'M61 102 C54 98 46 92 40 86'].map((d) => linie(d, 1.8, '#5E9CC8'))
  const r: Form[] = ['M61 36 C70 30 80 24 86 16', 'M61 52 C72 46 84 40 92 32', 'M61 68 C74 62 86 56 94 50', 'M61 84 C74 80 84 76 90 70', 'M62 98 C72 96 82 94 88 92'].map((d) => linie(d, 1.8, '#5E9CC8'))
  return z([0, 0, 120, 142], [
    boden(62, 138, 28),
    drehen(24, 60, 70, [
      pf(blatt, '#A9D5F0', 2.6),
      { t: 'path', d: rechts, f: '#86BCE3', s: 'none', o: 0.7 },
      ...l,
      ...r,
      linie('M60 6 C58 50 60 96 58 136', 2.8),
      glanz('M38 40 Q32 56 34 72', 3, 0.8),
    ]),
  ])
}

function geschenk(): Zeichnung {
  const schleife = (spieg: boolean): Form =>
    g(spieg ? 'translate(120 0) scale(-1 1)' : 'translate(0 0)', [pf('M60 42 C40 12 18 20 28 38 C34 48 50 46 60 42 Z', GELB, 2.4)])
  return z([0, 0, 120, 124], [
    boden(60, 119, 44),
    rr(16, 58, 88, 56, ROT, 4, 2.6),
    ...[[30, 74], [42, 96], [76, 72], [90, 98], [68, 104]].map(([x, y]) => punkt(x, y, 2.6, 'papier')),
    rr(10, 42, 100, 22, ROT_D, 4, 2.6),
    rr(51, 42, 18, 72, GELB, 0, 2.4),
    rr(51, 42, 18, 22, '#F8DB6C', 0, 2.4),
    schleife(false),
    schleife(true),
    kr(60, 40, 7, GELB, 2.4),
    glanz('M22 68 L22 100', 3, 0.5),
  ])
}

// =============================================================================
// Sprechen
// =============================================================================

function blase(cx: number, cy: number, rx: number, ry: number, schwanz: 'l' | 'r', f: string, strich = 4.4): Form[] {
  const s = schwanz === 'l' ? -1 : 1
  const tail = `M${cx + s * rx * 0.42} ${cy + ry * 0.7} L${cx + s * rx * 0.78} ${cy + ry * 1.38} L${cx + s * rx * 0.02} ${cy + ry * 0.92} Z`
  return silhouette([{ t: 'ellipse', cx, cy, rx, ry }, { t: 'path', d: tail, f: T, s: T }], f, strich)
}

function sprechblase(): Zeichnung {
  return z([0, 0, 120, 112], [
    ...blase(60, 50, 52, 40, 'l', '#BFE0F5', 5),
    kr(38, 50, 6.5, DUNKEL, 0),
    kr(60, 50, 6.5, DUNKEL, 0),
    kr(82, 50, 6.5, DUNKEL, 0),
    glanz('M22 38 Q28 26 42 22', 4, 0.9),
  ])
}

function sprechblasen(): Zeichnung {
  return z([0, 0, 124, 114], [
    ...blase(46, 38, 40, 30, 'l', '#BFE0F5', 5),
    linie('M26 32 L66 32', 3.4, BLAU),
    linie('M26 44 L52 44', 3.4, BLAU),
    ...blase(80, 72, 38, 28, 'r', '#FBE08A', 5),
    linie('M60 66 L100 66', 3.4, GELB_D),
    linie('M60 78 L86 78', 3.4, GELB_D),
  ])
}

// =============================================================================
// Kissen, Tür
// =============================================================================

function kissen(): Zeichnung {
  const form = 'M12 22 Q60 6 108 22 Q98 60 108 98 Q60 114 12 98 Q22 60 12 22 Z'
  return z([0, 0, 120, 120], [
    boden(60, 114, 46),
    pf(form, '#9CC6EC', 2.8),
    { t: 'path', d: 'M22 30 Q60 18 98 30 Q90 60 98 90 Q60 102 22 90 Q30 60 22 30 Z', f: 'none', s: 'papier', w: 2, dash: '4 3.4' },
    ...[[34, 44], [86, 44], [34, 78], [86, 78]].map(([x, y]) => linie(`M60 60 L${x} ${y}`, 1.6, '#6FA3DD')),
    ...[[44, 36], [76, 36], [44, 86], [76, 86], [24, 60], [96, 60]].map(([x, y]) => punkt(x, y, 2.4, 'papier')),
    kr(60, 60, 6, '#5B8BD0', 2),
    glanz('M22 28 Q36 18 54 16', 3.6, 0.85),
    ...[[10, 20], [110, 20], [10, 100], [110, 100]].map(([x, y]) => kr(x, y, 5.2, GELB, 2)),
  ])
}

function tuer(): Zeichnung {
  const platte = (x: number, y: number, h: number): Form => rr(x, y, 26, h, '#7FAEE3', 3, 2)
  return z([0, 0, 120, 132], [
    rr(10, 4, 100, 122, HOLZ_D, 4, 2.6),
    rr(18, 12, 84, 114, BLAU, 3, 2.6),
    platte(28, 22, 38),
    platte(66, 22, 38),
    platte(28, 74, 42),
    platte(66, 74, 42),
    rr(86, 64, 8, 18, GOLD_D, 3, 1.8),
    kr(90, 72, 5.4, GOLD, 2),
    rr(6, 126, 108, 6, GRAU, 2, 2.2),
    glanz('M24 20 L24 118', 2.8, 0.45),
  ])
}

// =============================================================================
// Werkzeug, Uhr, Wecker
// =============================================================================

function werkzeug(): Zeichnung {
  const hammer: Form[] = [
    rr(54, 34, 14, 86, HOLZ, 5, 2.4),
    rr(54, 84, 14, 36, ROT, 5, 2.4),
    rr(30, 12, 62, 28, '#9AA5B5', 6, 2.6),
    rr(30, 12, 18, 28, '#7C8899', 6, 2.4),
    glanz('M54 18 L84 18', 3, 0.7),
  ]
  const schluessel: Form[] = [
    rr(54, 38, 14, 82, '#7FAEE3', 7, 2.4),
    pf('M53 7.3 A20 20 0 1 0 69 7.3 L69 22 A8 8 0 0 1 53 22 Z', METALL, 2.6),
    glanz('M44 24 Q44 18 48 14', 3, 0.8),
  ]
  return z([0, 0, 124, 132], [
    boden(62, 128, 44),
    drehen(-42, 62, 66, schluessel),
    drehen(42, 62, 66, hammer),
  ])
}

function zifferblatt(cx: number, cy: number, r: number, lang = 4): Form[] {
  const ticks: Form[] = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180
    const l = i % 3 === 0 ? lang + 3 : lang
    const p = (rad: number) => `${(cx + Math.sin(a) * rad).toFixed(1)} ${(cy - Math.cos(a) * rad).toFixed(1)}`
    return linie(`M${p(r)} L${p(r - l)}`, i % 3 === 0 ? 2.6 : 1.8)
  })
  const zeiger = (grad: number, laenge: number, w: number): Form =>
    linie(`M${cx} ${cy} L${(cx + Math.sin((grad * Math.PI) / 180) * laenge).toFixed(1)} ${(cy - Math.cos((grad * Math.PI) / 180) * laenge).toFixed(1)}`, w)
  return [...ticks, zeiger(305, r * 0.5, 3.8), zeiger(60, r * 0.74, 3), kr(cx, cy, 3.8, T, 0)]
}

function uhr(): Zeichnung {
  return z([0, 0, 120, 124], [
    boden(60, 116, 44),
    kr(60, 60, 52, '#5B8BD0', 2.8),
    kr(60, 60, 43, 'papier', 2),
    ...zifferblatt(60, 60, 40),
    glanz('M22 42 Q28 28 42 20', 3.6, 0.7),
  ])
}

function wecker(): Zeichnung {
  const glocke = (x: number, w: number): Form => g(`translate(${x} 36) rotate(${w})`, [pf('M-16 8 Q-16 -14 0 -14 Q16 -14 16 8 Z', GOLD, 2.4)])
  return z([0, 0, 124, 130], [
    boden(62, 125, 40),
    pf('M38 100 L28 120 L46 110 Z', DUNKEL, 2),
    pf('M86 100 L96 120 L78 110 Z', DUNKEL, 2),
    glocke(30, -32),
    glocke(94, 32),
    linie('M62 24 L62 34', 3.4),
    rr(52, 20, 20, 7, DUNKEL, 3, 2),
    kr(62, 72, 42, ROT, 2.8),
    kr(62, 72, 33, 'papier', 2),
    ...zifferblatt(62, 72, 31, 3.6),
    glanz('M32 48 Q38 36 50 30', 3.6, 0.7),
  ])
}

// =============================================================================
// Schule und Büro
// =============================================================================

function pflaster(): Zeichnung {
  const loecher: Form[] = [14, 26].flatMap((x) => [38, 52, 66].map((y): Form => punkt(x + 4, y, 2.1, '#F9D2DA')))
  const loecher2: Form[] = [102, 114].flatMap((x) => [38, 52, 66].map((y): Form => punkt(x - 4 + 8, y, 2.1, '#F9D2DA')))
  return z([-6, 0, 152, 112], [
    boden(70, 102, 56),
    drehen(-24, 70, 54, [
      rr(6, 26, 128, 56, '#F4A9B8', 10, 2.8),
      ...loecher,
      ...loecher2,
      rr(46, 26, 48, 56, '#FFF4DC', 3, 2.4),
      linie('M46 40 L94 40 M46 68 L94 68', 1.4, '#E8D5B0'),
      g('translate(70 54) scale(1.7)', [pf('M0 5 Q-8 -1 -6 -5 Q-3 -8 0 -4 Q3 -8 6 -5 Q8 -1 0 5 Z', ROT, 1.2)]),
      glanz('M14 32 L38 32', 2.8, 0.6),
    ]),
  ])
}

function lineal(): Zeichnung {
  const striche: Form[] = Array.from({ length: 27 }, (_, i) => {
    const x = 12 + i * 4.6
    const l = i % 10 === 0 ? 16 : i % 5 === 0 ? 11 : 6
    return linie(`M${x.toFixed(1)} 24 L${x.toFixed(1)} ${24 + l}`, i % 5 === 0 ? 2 : 1.5)
  })
  return z([-4, -6, 148, 104], [
    boden(70, 94, 56),
    drehen(-14, 70, 46, [
      rr(4, 24, 132, 44, '#F6D26A', 5, 2.6),
      ...striche,
      kr(124, 52, 4.4, 'papier', 1.8),
      glanz('M12 62 L100 62', 2.6, 0.6),
    ]),
  ])
}

function notizbuch(): Zeichnung {
  const ringe: Form[] = [20, 38, 56, 74, 92].map((y) => rr(8, y, 22, 8, METALL, 4, 1.8))
  return z([0, 0, 104, 132], [
    boden(54, 127, 36),
    rr(20, 8, 76, 114, ORANGE, 6, 2.8),
    rr(26, 114, 64, 10, '#FFF4DC', 3, 2),
    rr(38, 28, 46, 32, 'papier', 4, 2.2),
    linie('M45 40 L77 40', 2.6, GRAU),
    linie('M45 50 L68 50', 2.6, GRAU),
    rr(80, 8, 7, 114, DUNKEL, 2, 1.8),
    ...ringe,
    glanz('M34 70 L34 104', 3, 0.5),
  ])
}

function schuesselForm(f: string, inhalt: string, tupfer: string): Form[] {
  return [
    pf('M8 46 L122 46 Q120 84 94 95 Q80 100 65 100 Q50 100 36 95 Q10 84 8 46 Z', f, 2.8),
    { t: 'path', d: 'M12 70 Q65 84 118 70 L116 78 Q65 92 14 78 Z', f: 'papier', s: 'none', o: 0.9 },
    el(65, 46, 57, 10, f, 2.8),
    el(65, 47, 49, 6.5, inhalt, 1.8),
    ...[[50, 46], [66, 49], [82, 46], [58, 45]].map(([x, y]) => punkt(x, y, 2.6, tupfer)),
    glanz('M16 56 Q18 68 28 78', 3.4, 0.8),
  ]
}

function schuessel(): Zeichnung {
  return z([0, 0, 130, 108], [boden(65, 100, 50), ...schuesselForm('#7FAEE3', '#DCEBF8', '#DCEBF8').slice(0, 4), glanz('M16 56 Q18 68 28 78', 3.4, 0.8)])
}

function suppe(): Zeichnung {
  const dampf: Form[] = [44, 66, 88].map((x, i) => linie(`M${x} ${34 - (i % 2) * 4} Q${x - 6} ${24 - (i % 2) * 4} ${x} ${14 - (i % 2) * 4} Q${x + 6} ${4 - (i % 2) * 4} ${x} ${-4 - (i % 2) * 4}`, 2.8, '#B9C5D6'))
  return z([0, -8, 130, 116], [boden(65, 100, 50), ...dampf, ...schuesselForm('#7FAEE3', '#F2A24A', '#F8CE82')])
}

function leiter(): Zeichnung {
  const xl = (y: number) => 8 + (12 * (148 - y)) / 144
  const xr = (y: number) => 82 - (12 * (148 - y)) / 144
  const sprossen: Form[] = [24, 48, 72, 96, 120].map((y) => poly([[xl(y) + 6, y - 5], [xr(y) - 6, y - 5], [xr(y) - 6, y + 5], [xl(y) + 6, y + 5]], HOLZ_D, 2.2))
  return z([0, 0, 90, 156], [
    boden(45, 152, 38),
    ...sprossen,
    poly([[xl(148) , 148], [xl(148) + 12, 148], [xl(4) + 10, 4], [xl(4), 4]], HOLZ, 2.6),
    poly([[xr(148) - 12, 148], [xr(148), 148], [xr(4), 4], [xr(4) - 10, 4]], HOLZ, 2.6),
    rr(6, 146, 16, 5, DUNKEL, 2, 1.6),
    rr(68, 146, 16, 5, DUNKEL, 2, 1.6),
    glanz('M14 120 L22 30', 2.6, 0.5),
  ])
}

function stiftebecher(): Zeichnung {
  const stift = (x: number, y: number, w: number, f: string): Form =>
    g(`translate(${x} ${y}) rotate(${w} 0 62)`, [
      rr(-6.5, 0, 13, 66, f, 2, 2.2),
      pf('M-6.5 0 L6.5 0 L0 -13 Z', '#F1D6A8', 2),
      pf('M-2.6 -7.6 L2.6 -7.6 L0 -13 Z', DUNKEL, 1.4),
    ])
  return z([0, 0, 118, 146], [
    boden(56, 141, 38),
    stift(34, 22, -16, ROT),
    stift(52, 14, -4, BLAU),
    stift(70, 20, 8, GRUEN),
    stift(86, 28, 20, GELB),
    pf('M20 62 L92 62 L86 130 Q85 137 78 137 L34 137 Q27 137 26 130 Z', '#6FA3DD', 2.8),
    el(56, 62, 36, 7, '#5B8BD0', 2.6),
    el(56, 63, 30, 4.6, '#2F4A6E', 0),
    ...[[36, 86], [56, 100], [76, 84], [46, 118], [68, 120]].map(([x, y]) => punkt(x, y, 3.2, 'papier')),
    glanz('M30 78 L33 124', 3, 0.7),
  ])
}

function knochen(): Zeichnung {
  const teile: Form[] = [
    { t: 'rect', x: 26, y: 28, b: 88, h: 22, rx: 11 },
    { t: 'circle', cx: 26, cy: 24, r: 14 },
    { t: 'circle', cx: 26, cy: 54, r: 14 },
    { t: 'circle', cx: 114, cy: 24, r: 14 },
    { t: 'circle', cx: 114, cy: 54, r: 14 },
  ]
  return z([0, -4, 140, 94], [
    boden(70, 82, 54),
    drehen(-16, 70, 39, [
      ...silhouette(teile, '#FFF4DC', 5),
      { t: 'path', d: 'M40 48 L100 48', f: 'none', s: '#E8D5B0', w: 4 },
      glanz('M18 18 Q22 14 28 14', 2.8, 0.9),
      glanz('M106 18 Q110 14 116 14', 2.8, 0.9),
    ]),
  ])
}

// =============================================================================
// Geräte
// =============================================================================

const APPS = [ROT, GELB, GRUEN, BLAU, LILA, ORANGE, ROSA, HELLBLAU, '#F2C94C']

function handyKoerper(innen: Form[], punktRot = false): Form[] {
  return [
    rr(6, 4, 68, 134, DUNKEL, 14, 2.8),
    rr(12, 16, 56, 106, '#E4F1FB', 5, 1.8),
    rr(32, 8, 16, 3.6, '#2B3140', 2, 0),
    rr(30, 126, 20, 4, '#2B3140', 2, 0),
    ...innen,
    ...(punktRot ? [kr(70, 10, 8.5, ROT, 2.2)] : []),
  ]
}

function handy(): Zeichnung {
  const raster: Form[] = []
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) raster.push(rr(19 + c * 16.4, 24 + r * 17, 13, 13, APPS[r * 3 + c], 4, 1.6))
  return z([0, 0, 80, 142], [
    boden(40, 139, 28),
    ...handyKoerper([...raster, rr(17, 82, 46, 30, '#C9D8E8', 6, 1.6), ...[0, 1, 2].map((c): Form => rr(21 + c * 14.6, 89, 11, 11, APPS[3 + c * 2 % 6], 3.5, 1.4))]),
    glanz('M16 20 L30 20', 2.2, 0.8),
  ])
}

function handyChat(): Zeichnung {
  return z([-2, -2, 84, 146], [
    boden(40, 139, 28),
    ...handyKoerper(
      [
        rr(17, 24, 34, 17, '#C9D8E8', 8, 1.8),
        linie('M23 33 L44 33', 2.4, GRAU),
        rr(29, 46, 34, 17, '#9BD3A6', 8, 1.8),
        linie('M35 55 L56 55', 2.4, GRUEN),
        rr(17, 68, 40, 17, '#C9D8E8', 8, 1.8),
        linie('M23 77 L50 77', 2.4, GRAU),
        rr(17, 92, 28, 18, '#FBE08A', 9, 1.8),
        punkt(26, 101, 2.2, DUNKEL), punkt(31, 101, 2.2, DUNKEL), punkt(36, 101, 2.2, DUNKEL),
      ],
      true,
    ),
  ])
}

function telefon(): Zeichnung {
  const tasten: Form[] = [0, 1, 2].flatMap((c) => [0, 1].map((r): Form => kr(40 + c * 20, 72 + r * 14, 5, 'papier', 1.6)))
  return z([0, 0, 120, 112], [
    boden(60, 107, 50),
    pf('M10 100 L110 100 L102 62 Q100 56 94 56 L26 56 Q20 56 18 62 Z', ROT, 2.8),
    ...tasten,
    ...tube('M24 44 Q60 14 96 44', DUNKEL, 12),
    rr(10, 40, 26, 24, DUNKEL, 8, 2.6),
    rr(84, 40, 26, 24, DUNKEL, 8, 2.6),
    glanz('M34 34 Q60 18 84 32', 2.6, 0.5),
  ])
}

function kerze(): Zeichnung {
  return z([0, 0, 84, 142], [
    boden(42, 138, 32),
    el(42, 126, 32, 8, METALL, 2.6),
    // Flamme und Schein
    { t: 'ellipse', cx: 42, cy: 28, rx: 24, ry: 26, f: LICHT, s: 'none', o: 0.28 },
    pf('M42 8 C48 20 56 26 56 36 C56 46 50 52 42 52 C34 52 28 46 28 36 C28 28 36 24 42 8 Z', ORANGE, 2.4),
    pf('M42 26 C46 32 49 36 49 41 C49 46 46 49 42 49 C38 49 35 46 35 41 C35 36 40 32 42 26 Z', '#F8DB6C', 1.6),
    linie('M42 52 L42 62', 3),
    pf('M22 64 Q42 58 62 64 L62 120 Q42 126 22 120 Z', '#FFF4DC', 2.6),
    pf('M22 64 Q42 70 62 64 Q58 70 56 76 Q54 82 50 76 Q48 70 42 71 Q36 70 34 80 Q32 90 28 80 Q26 72 22 64 Z', 'papier', 2),
    linie('M24 100 Q42 106 60 100', 3, '#7FAEE3'),
    glanz('M28 82 L28 112', 3, 0.7),
  ])
}

function ausweis(): Zeichnung {
  return z([0, 0, 124, 100], [
    boden(62, 94, 50),
    rr(48, 4, 28, 12, '#CDD5DE', 6, 2.2),
    rr(10, 12, 104, 76, '#A9D2EE', 8, 2.8),
    rr(10, 12, 104, 16, BLAU, 8, 2.6),
    rr(18, 38, 32, 40, 'papier', 4, 2),
    kr(34, 53, 7, '#C9D8E8', 1.8),
    pf('M20 78 Q20 64 34 64 Q48 64 48 78 Z', '#C9D8E8', 1.8),
    linie('M58 44 L104 44', 3.2, BLAU),
    linie('M58 56 L96 56', 3.2, BLAU),
    ...[0, 1, 2, 3, 4, 5, 6, 7].map((i): Form => linie(`M${60 + i * 5.4} 68 L${60 + i * 5.4} 80`, i % 3 === 0 ? 3 : 1.8)),
    glanz('M18 18 L40 18', 2.4, 0.6),
  ])
}

function muenze(cx: number, cy: number, f = GOLD, d = '#E5B233'): Form[] {
  return [
    { t: 'path', d: `M${cx - 34} ${cy} L${cx - 34} ${cy + 10} A34 11 0 0 0 ${cx + 34} ${cy + 10} L${cx + 34} ${cy} Z`, f: d, s: T, w: 2.4 },
    el(cx, cy, 34, 11, f, 2.4),
    el(cx, cy, 24, 6.6, 'none', 1.6),
  ]
}

function muenzen(): Zeichnung {
  const stapel = [88, 74, 60, 46].flatMap((y) => muenze(46, y))
  return z([0, 0, 134, 112], [
    boden(66, 104, 56),
    ...muenze(46, 88),
    ...muenze(46, 74),
    ...muenze(46, 60),
    ...muenze(46, 46),
    ...(stapel.length ? [] : []),
    // stehende Münze
    kr(98, 66, 28, GOLD, 2.8),
    kr(98, 66, 21, '#FADC6A', 1.8),
    { t: 'path', d: 'M98 52 L102 61 L112 62 L104 69 L106 79 L98 74 L90 79 L92 69 L84 62 L94 61 Z', f: GOLD_D, s: T, w: 1.6 },
    glanz('M78 56 Q82 46 92 42', 3.4, 0.85),
    glanz('M18 50 L18 80', 2.6, 0.6),
  ])
}

export const NEU_HAUS: Record<string, () => Zeichnung> = {
  korb,
  thermometer,
  paket,
  glocke,
  feder,
  geschenk,
  sprechblase,
  sprechblasen,
  kissen,
  tuer,
  werkzeug,
  uhr,
  wecker,
  pflaster,
  lineal,
  notizbuch,
  schuessel,
  suppe,
  leiter,
  stiftebecher,
  knochen,
  handy,
  'handy-chat': handyChat,
  telefon,
  kerze,
  ausweis,
  muenzen,
}

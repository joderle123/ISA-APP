// ---------------------------------------------------------------------------
// Neue farbige Motive, Teil 5: Obst, Gemüse und Essen (Banane, Traube, Kirsche, Melone,
// Paprika, Käse, Torte, Eis, Kakao, Nudelsalat, Chips, Käsebrötchen).
// Stil wie motive-alltag.ts: Tinte als Umriss, flache warme Flächen, weiße Glanzlichter,
// jede Fläche mit Kontur, keine Schrift, keine Marken.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { tube } from './figuren'
import {
  BLAU, BRAUN, CREME, GELB, GELB_D, GRUEN, GRUEN_D, HOLZ_D, LILA, ROSA, ROT, ROT_D, glanz, linie, z,
} from './motive-dinge'
import { T, boden, drehen, el, kr, pf, poly, punkt, rr } from './motive-neu-helfer'

const BANANE = '#F6D955'
const BANANE_D = '#E8BE3A'

function blatt(d: string, f = GRUEN): Form {
  return pf(d, f, 2.2)
}

function banane(): Zeichnung {
  const haut = 'M24 14 L42 14 C44 56 78 76 124 72 L132 78 C62 116 12 80 24 14 Z'
  return z([0, 0, 140, 112], [
    boden(76, 106, 50),
    poly([[25, 15], [41, 15], [39, 3], [27, 3]], BRAUN, 2.2),
    pf(haut, BANANE, 2.8),
    { t: 'path', d: 'M132 78 C62 116 12 80 24 14 L31 14 C26 64 62 98 124 78 Z', f: BANANE_D, s: 'none' },
    linie('M35 18 C36 58 70 76 118 74', 1.8, GELB_D),
    pf('M124 72 L132 78 L127 83 L121 77 Z', '#6B4A2E', 1.8),
    glanz('M30 26 C31 50 44 66 62 76', 3.2, 0.7),
  ])
}

function traube(): Zeichnung {
  const reihen: [number, number][][] = [
    [[34, 44], [58, 44], [82, 44], [106, 44]],
    [[46, 66], [70, 66], [94, 66]],
    [[58, 88], [82, 88]],
    [[70, 110]],
  ]
  const beeren: Form[] = reihen.flat().flatMap(([x, y], i): Form[] => [
    kr(x, y, 13.5, i % 3 === 1 ? '#8A6CBB' : LILA, 2.2),
    glanz(`M${x - 7} ${y - 3} Q${x - 6} ${y - 8} ${x - 1} ${y - 9}`, 2.4, 0.85),
  ])
  return z([0, -4, 130, 140], [
    boden(70, 130, 30),
    ...tube('M70 32 Q66 16 74 4', HOLZ_D, 4),
    ...beeren,
    blatt('M74 14 Q96 -2 120 10 Q106 32 76 24 Z'),
    linie('M78 18 Q96 10 112 12', 1.4, GRUEN_D),
  ])
}

function kirsche(): Zeichnung {
  const frucht = (x: number, y: number): Form[] => [
    kr(x, y, 20, ROT, 2.6),
    { t: 'path', d: `M${x + 12} ${y - 14} Q${x + 24} ${y + 4} ${x + 6} ${y + 18} Q${x + 22} ${y + 14} ${x + 20} ${y - 2} Z`, f: ROT_D, s: 'none', o: 0.5 },
    pf(`M${x - 5} ${y - 18} Q${x} ${y - 13} ${x + 5} ${y - 18}`, ROT_D, 1.6),
    glanz(`M${x - 12} ${y - 2} Q${x - 12} ${y - 10} ${x - 5} ${y - 12}`, 3.4, 0.85),
  ]
  return z([0, 0, 124, 116], [
    boden(62, 112, 46),
    ...tube('M40 70 Q44 30 72 10', '#8A9A4A', 3.4),
    ...tube('M88 74 Q84 36 72 10', '#8A9A4A', 3.4),
    ...frucht(40, 90),
    ...frucht(88, 94),
    blatt('M72 12 Q92 -2 114 12 Q94 26 72 12 Z'),
    linie('M76 13 Q92 8 106 12', 1.4, GRUEN_D),
  ])
}

function melone(): Zeichnung {
  const kerne: [number, number, number][] = [[46, 36, -20], [68, 50, 10], [92, 36, 20], [112, 50, -10], [62, 30, 8], [84, 56, -15], [36, 52, 30], [122, 34, 14]]
  return z([0, 0, 150, 96], [
    boden(75, 90, 58),
    pf('M4 18 L146 18 A71 71 0 0 1 4 18 Z', '#5FA35A', 2.8),
    pf('M11 18 L139 18 A64 64 0 0 1 11 18 Z', '#F6F7E0', 2),
    pf('M17 18 L133 18 A58 58 0 0 1 17 18 Z', '#EE6A63', 2),
    ...kerne.map(([x, y, w]) => el(x, y, 3.2, 5.2, T, 0, w)),
    glanz('M26 28 Q34 46 54 56', 3.4, 0.55),
  ])
}

function paprika(): Zeichnung {
  const koerper = 'M55 28 C30 24 12 40 14 70 C16 100 34 112 52 108 C58 112 66 112 72 108 C90 112 104 98 102 70 C100 42 82 24 55 28 Z'
  return z([0, 0, 116, 124], [
    boden(58, 118, 42),
    pf(koerper, ROT, 2.8),
    { t: 'path', d: 'M72 108 C90 112 104 98 102 70 C101 56 96 44 88 36 C96 62 90 96 62 110 Z', f: ROT_D, s: 'none', o: 0.5 },
    linie('M40 34 C30 60 34 92 46 106', 2, ROT_D),
    linie('M70 32 C80 58 78 90 66 106', 2, ROT_D),
    pf('M44 32 Q42 14 56 8 Q72 14 66 32 Q56 36 44 32 Z', GRUEN, 2.4),
    glanz('M22 52 Q20 70 28 88', 4.2, 0.7),
    glanz('M50 14 Q54 11 58 12', 2.4, 0.7),
  ])
}

function kaese(): Zeichnung {
  return z([0, 0, 160, 106], [
    boden(80, 100, 62),
    poly([[30, 92], [142, 30], [126, 14], [14, 78]], '#FBE9A6', 2.6),
    poly([[30, 92], [142, 92], [142, 30]], '#F5C84C', 2.6),
    el(120, 72, 9, 7.5, '#E2A92E', 1.8),
    el(128, 86, 5.5, 4.5, '#E2A92E', 1.6),
    el(100, 84, 6, 5, '#E2A92E', 1.6),
    el(112, 52, 4, 3.4, '#E2A92E', 1.4),
    el(62, 66, 6, 3.2, '#F0D27A', 1.6, -28),
    el(92, 46, 5, 2.8, '#F0D27A', 1.6, -28),
    glanz('M40 86 L80 64', 3, 0.7),
  ])
}

function kuchen(): Zeichnung {
  const kerze = (x: number, f: string): Form[] => [
    rr(x - 3.2, 28, 6.4, 24, f, 2, 1.8),
    pf(`M${x} 8 Q${x + 6} 16 ${x} 24 Q${x - 6} 16 ${x} 8 Z`, GELB, 1.6),
    linie(`M${x} 24 L${x} 28`, 1.6),
  ]
  return z([0, 0, 134, 134], [
    boden(67, 128, 58),
    el(67, 120, 62, 9, 'papier', 2.4),
    rr(12, 80, 110, 38, '#A9744C', 8, 2.8),
    pf('M12 88 Q12 82 20 82 L114 82 Q122 82 122 88 L122 96 Q118 104 112 94 Q108 88 102 98 Q96 106 90 96 Q84 90 78 98 Q72 106 66 96 Q60 90 54 98 Q48 106 42 96 Q36 90 30 98 Q24 106 20 96 Q14 92 12 96 Z', ROSA, 2.2),
    rr(28, 52, 78, 32, '#F6C9D4', 8, 2.8),
    pf('M28 60 Q28 54 36 54 L98 54 Q106 54 106 60 L106 66 Q102 74 96 64 Q90 58 84 68 Q78 76 72 66 Q66 60 60 70 Q54 78 48 68 Q42 62 36 70 Q30 74 28 66 Z', 'papier', 2),
    ...kerze(46, BLAU),
    ...kerze(67, ROT),
    ...kerze(88, GRUEN),
    ...[[40, 106], [62, 108], [86, 106], [106, 108]].map(([x, y]) => punkt(x, y, 3, ROSA)),
    glanz('M18 94 L18 110', 2.6, 0.5),
  ])
}

function eis(): Zeichnung {
  const L = (t: number): [number, number] => [34 + 26 * t, 78 + 68 * t]
  const R = (t: number): [number, number] => [86 - 26 * t, 78 + 68 * t]
  const gitter: Form[] = []
  for (let t = 0; t < 0.8; t += 0.2) {
    gitter.push(linie(`M${L(t).join(' ')} L${R(t + 0.2).join(' ')}`, 1.6, '#B5823F'))
    gitter.push(linie(`M${R(t).join(' ')} L${L(t + 0.2).join(' ')}`, 1.6, '#B5823F'))
  }
  return z([0, 0, 120, 152], [
    boden(60, 148, 30),
    poly([[34, 78], [86, 78], [60, 146]], '#E8BC76', 2.8),
    ...gitter,
    kr(60, 62, 30, '#F4A9B8', 2.6),
    pf('M30 66 Q34 80 44 72 Q52 84 60 72 Q68 84 76 72 Q86 80 90 66 Z', '#F4A9B8', 2.4),
    kr(60, 36, 24, '#FFF1C9', 2.6),
    glanz('M42 54 Q40 66 46 74', 3.4, 0.8),
    glanz('M46 28 Q50 20 58 18', 3.2, 0.8),
    ...tube('M60 12 Q62 4 70 2', GRUEN_D, 2.2),
    kr(60, 14, 7, ROT, 2),
    punkt(58, 12, 1.8, 'papier'),
  ])
}

function kakao(): Zeichnung {
  const tasse = 'M18 42 L92 42 L88 100 Q87 108 80 108 L30 108 Q23 108 22 100 Z'
  const dampf: Form[] = [42, 64].map((x, i) => linie(`M${x} ${34 - i * 3} Q${x - 6} ${24 - i * 3} ${x} ${14 - i * 3} Q${x + 6} ${4 - i * 3} ${x} ${-6 - i * 3}`, 2.8, '#B9C5D6'))
  return z([0, -10, 124, 128], [
    boden(56, 114, 44),
    ...dampf,
    ...tube('M90 54 Q116 54 112 76 Q108 94 86 92', '#3F8F82', 7),
    pf(tasse, '#5BAE9F', 2.8),
    { t: 'path', d: 'M92 42 L88 100 Q87 108 80 108 L70 108 Q80 80 80 42 Z', f: '#3F8F82', s: 'none', o: 0.5 },
    el(55, 42, 37, 8, '#5BAE9F', 2.6),
    el(55, 43, 31, 5.4, '#7A4B2E', 1.6),
    rr(38, 38, 12, 8, 'papier', 3, 1.6),
    rr(56, 40, 12, 8, 'papier', 3, 1.6),
    ...[[34, 68], [58, 82], [74, 64], [44, 92]].map(([x, y]) => punkt(x, y, 3, 'papier')),
    glanz('M28 54 L30 94', 3.2, 0.7),
  ])
}

function schuesselMit(f: string): Form[] {
  return [
    pf('M8 56 L122 56 Q120 90 94 100 Q80 104 65 104 Q50 104 36 100 Q10 90 8 56 Z', f, 2.8),
    { t: 'path', d: 'M12 78 Q65 92 118 78 L116 86 Q65 100 14 86 Z', f: 'papier', s: 'none', o: 0.9 },
    el(65, 56, 57, 10, f, 2.8),
  ]
}

function nudelsalat(): Zeichnung {
  const nudel = (x: number, y: number, w: number): Form =>
    drehen(w, x, y, [...tube(`M${x - 11} ${y + 2} Q${x} ${y - 9} ${x + 11} ${y + 2}`, '#F3DDA0', 8.5)].map((fm) => fm)) as Form
  const stuecke: Form[] = [
    nudel(36, 50, -25), nudel(60, 46, 15), nudel(86, 48, -15), nudel(106, 52, 30),
    nudel(46, 34, 35), nudel(72, 30, -30), nudel(96, 34, 20),
    nudel(58, 16, 10), nudel(82, 18, -20),
    kr(48, 44, 6.4, ROT, 1.8), kr(100, 42, 6.4, ROT, 1.8), kr(70, 22, 6.4, ROT, 1.8),
    kr(66, 42, 5.6, GRUEN, 1.8), kr(86, 28, 5.6, GRUEN, 1.8), kr(40, 26, 5.6, GRUEN, 1.8),
    kr(76, 52, 4.6, GELB, 1.6), kr(56, 28, 4.6, GELB, 1.6), kr(104, 28, 4.6, GELB, 1.6),
  ]
  return z([0, 0, 130, 112], [
    boden(65, 108, 52),
    el(65, 58, 50, 12, '#F3DDA0', 2.4),
    ...stuecke,
    ...schuesselMit('#C3B2E3'),
    glanz('M16 66 Q18 78 28 86', 3.4, 0.8),
  ])
}

function chips(): Zeichnung {
  const chip = (x: number, y: number, w: number, rx = 21, ry = 14): Form => drehen(w, x, y, [
    el(x, y, rx, ry, '#F6D26A', 2.4),
    linie(`M${x - rx * 0.55} ${y - 2} Q${x - rx * 0.25} ${y - ry * 0.55} ${x} ${y - 2} Q${x + rx * 0.25} ${y + ry * 0.45} ${x + rx * 0.55} ${y}`, 1.6, '#E2A92E'),
  ])
  return z([0, 0, 134, 112], [
    boden(67, 108, 54),
    chip(116, 92, 20, 15, 10.5),
    chip(18, 94, -20, 14, 10),
    chip(40, 38, -30),
    chip(94, 34, 25),
    chip(68, 18, 6, 20, 13),
    chip(32, 62, 20),
    chip(104, 58, -15),
    chip(68, 46, 0),
    ...schuesselMit('#EE9A4D'),
    glanz('M16 68 Q18 80 28 88', 3.4, 0.7),
  ])
}

function kaesebroetchen(): Zeichnung {
  const kerne: [number, number][] = [[40, 26], [58, 20], [78, 22], [96, 30], [68, 34], [50, 38], [88, 40]]
  return z([0, 0, 134, 108], [
    boden(67, 102, 54),
    pf('M10 70 Q10 84 24 86 L110 86 Q124 84 124 70 Z', '#E5B170', 2.6),
    pf('M8 66 Q16 58 24 66 Q32 58 40 66 Q48 58 56 66 Q64 58 72 66 Q80 58 88 66 Q96 58 104 66 Q112 58 120 66 L124 74 L10 74 Z', GRUEN, 2.2),
    pf('M18 62 L112 58 L122 76 L28 82 Z', '#FBE08A', 2.4),
    pf('M28 82 L40 98 L52 80 Z', '#FBE08A', 2.2),
    el(66, 62, 54, 6, '#F3DDA0', 0),
    pf('M8 54 Q8 12 66 12 Q124 12 124 54 Q124 62 112 62 L20 62 Q8 62 8 54 Z', '#D9953F', 2.8),
    { t: 'path', d: 'M124 54 Q124 62 112 62 L96 62 Q116 50 112 28 Q124 36 124 54 Z', f: '#B9762B', s: 'none', o: 0.55 },
    ...kerne.map(([x, y]) => el(x, y, 3.4, 1.9, CREME, 1.2, 20)),
    glanz('M22 40 Q26 26 42 20', 4, 0.7),
  ])
}

export const NEU_ESSEN: Record<string, () => Zeichnung> = {
  banane,
  traube,
  kirsche,
  melone,
  paprika,
  kaese,
  kuchen,
  eis,
  kakao,
  nudelsalat,
  chips,
  kaesebroetchen,
}

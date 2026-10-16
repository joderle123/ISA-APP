// ---------------------------------------------------------------------------
// Neue farbige Motive, Teil 6: Jungtiere und Kuscheltier (Kalb, Lamm, Ferkel, Welpe,
// Kätzchen), Kaninchen (kein Hase!), Teddy und Lerche (Gegenstück zur Eule).
// Gleicher Strich und gleiche Gesichter wie motive-tiere.ts: kleine Punktaugen mit Glanz,
// rosa Wangen, flache Farben, Tinte-Kontur, keine Schrift.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { tube } from './figuren'
import { DUNKEL, GELB, GRUEN_D, ROSA, ROT, WANGE, glanz, linie, silhouette, z } from './motive-dinge'
import { T, auge, boden, drehen, el, kr, pf, poly, punkt, rr } from './motive-neu-helfer'

const WEISS = 'papier'
const FELL_BRAUN = '#8A5A3C'
const RUESSEL = '#F4B9B2'
const RUESSEL_D = '#E2938C'

const wange = (x: number, y: number, rx = 4.4, ry = 2.8): Form => ({ t: 'ellipse', cx: x, cy: y, rx, ry, f: WANGE, s: 'none', o: 0.85 })
const augeHell = (x: number, y: number, r = 4.4): Form[] => [kr(x, y, r, WEISS, 1.4), ...auge(x + 0.3, y + 0.3, r * 0.6)]
const huf = (x: number, y1: number, y2: number, b: number, fell: string, hufFarbe = '#6E4F3C'): Form[] => [
  rr(x, y1, b, y2 - y1, fell, b * 0.4, 2.2),
  rr(x, y2 - 7, b, 7, hufFarbe, 2.4, 2),
]

function kalb(): Zeichnung {
  return z([0, 0, 148, 114], [
    boden(66, 106, 52),
    ...tube('M24 56 Q10 62 12 84', WEISS, 2.4),
    pf('M12 80 Q4 88 9 95 Q17 91 16 81 Z', FELL_BRAUN, 1.6),
    ...huf(28, 66, 102, 12, WEISS),
    ...huf(44, 66, 102, 12, WEISS),
    ...huf(84, 66, 102, 12, WEISS),
    ...huf(100, 66, 102, 12, WEISS),
    el(62, 64, 42, 25, WEISS, 2.6),
    el(46, 54, 13, 9, FELL_BRAUN, 0, -15),
    el(74, 74, 11, 7, FELL_BRAUN, 0, 10),
    // Kopf von vorn
    el(88, 44, 11, 7, FELL_BRAUN, 2.2, -25),
    el(124, 44, 11, 7, FELL_BRAUN, 2.2, 25),
    el(88, 44, 6, 3.6, ROSA, 0, -25),
    el(124, 44, 6, 3.6, ROSA, 0, 25),
    kr(106, 46, 21, WEISS, 2.6),
    el(97, 38, 9, 8, FELL_BRAUN, 0),
    ...auge(98, 41, 3.2),
    ...auge(114, 41, 3.2),
    el(106, 58, 12, 9, ROSA, 2.2),
    punkt(101, 58, 1.8, T),
    punkt(111, 58, 1.8, T),
    pf('M104 20 Q100 12 106 10 Q112 12 108 22 Z', FELL_BRAUN, 1.6),
    glanz('M32 54 Q42 44 56 44', 3, 0.7),
  ])
}

function lamm(): Zeichnung {
  const wolle: Form[] = [
    { t: 'circle', cx: 38, cy: 64, r: 22 },
    { t: 'circle', cx: 56, cy: 46, r: 24 },
    { t: 'circle', cx: 80, cy: 52, r: 22 },
    { t: 'circle', cx: 64, cy: 66, r: 24 },
    { t: 'circle', cx: 88, cy: 70, r: 18 },
    { t: 'circle', cx: 24, cy: 52, r: 12 },
  ]
  return z([0, 0, 146, 112], [
    boden(66, 106, 50),
    rr(34, 82, 10, 20, DUNKEL, 4, 2.2),
    rr(54, 84, 10, 18, DUNKEL, 4, 2.2),
    rr(82, 84, 10, 18, DUNKEL, 4, 2.2),
    rr(98, 80, 10, 22, DUNKEL, 4, 2.2),
    ...silhouette(wolle, '#FFF6E2', 4.6),
    { t: 'path', d: 'M44 80 Q66 90 90 80 Q96 70 98 62 Q80 84 44 80 Z', f: '#EBDDC0', s: 'none', o: 0.8 },
    glanz('M44 44 Q50 34 62 32', 3.4, 0.9),
    // Kopf
    el(106, 62, 8, 14, '#5E4B45', 2.2, 70),
    el(120, 56, 8, 14, '#5E4B45', 2.2, -70),
    el(114, 64, 15, 17, '#6E5A52', 2.4),
    pf('M104 50 Q108 38 114 44 Q120 38 124 50 Q114 54 104 50 Z', '#FFF6E2', 2),
    ...augeHell(108, 62, 4.4),
    ...augeHell(122, 62, 4.4),
    el(115, 72, 4.4, 3, '#3F342F', 0),
    pf('M110 77 Q115 81 120 77', 'none', 1.6),
  ])
}

function ferkel(): Zeichnung {
  return z([0, 0, 134, 112], [
    boden(66, 106, 50),
    pf('M22 60 Q6 58 8 46 Q10 38 18 42 Q22 46 18 50', 'none', 2.2),
    rr(34, 76, 12, 24, RUESSEL, 4, 2.2),
    rr(34, 94, 12, 6, RUESSEL_D, 2, 1.8),
    rr(52, 78, 12, 22, RUESSEL, 4, 2.2),
    rr(52, 94, 12, 6, RUESSEL_D, 2, 1.8),
    el(58, 62, 40, 28, RUESSEL, 2.6),
    rr(84, 78, 12, 22, RUESSEL, 4, 2.2),
    rr(84, 94, 12, 6, RUESSEL_D, 2, 1.8),
    rr(100, 76, 12, 24, RUESSEL, 4, 2.2),
    rr(100, 94, 12, 6, RUESSEL_D, 2, 1.8),
    glanz('M32 50 Q38 40 50 38', 3.4, 0.7),
    // Ohren und Kopf
    pf('M86 40 L84 14 L104 28 Z', RUESSEL_D, 2.2),
    pf('M126 40 L128 14 L108 28 Z', RUESSEL_D, 2.2),
    kr(106, 52, 24, RUESSEL, 2.6),
    ...auge(97, 44, 3.4),
    ...auge(115, 44, 3.4),
    wange(90, 58),
    wange(122, 58),
    el(106, 62, 12, 9, RUESSEL_D, 2.2),
    punkt(101, 62, 2, T),
    punkt(111, 62, 2, T),
  ])
}

function welpe(): Zeichnung {
  const fell = '#D9A56A'
  return z([0, 0, 124, 124], [
    boden(62, 118, 44),
    ...tube('M88 106 Q112 104 110 84', fell, 8),
    el(62, 92, 30, 25, fell, 2.6),
    el(62, 98, 17, 18, '#F6E9D3', 0),
    el(46, 112, 10, 6.5, '#F6E9D3', 2.2),
    el(78, 112, 10, 6.5, '#F6E9D3', 2.2),
    // Ohren
    el(30, 44, 12, 22, '#7B5236', 2.4, 14),
    el(94, 44, 12, 22, '#7B5236', 2.4, -14),
    kr(62, 46, 31, fell, 2.6),
    el(74, 40, 12, 12, '#7B5236', 0),
    el(62, 58, 17, 13, '#F6E9D3', 2.2),
    ...augeHell(48, 42, 5.4),
    ...augeHell(76, 42, 5.4),
    el(62, 52, 6.4, 4.6, T, 0),
    punkt(60.4, 50.6, 1.4, WEISS),
    pf('M52 61 Q62 70 72 61', 'none', 2),
    pf('M56 65 Q62 80 68 65 Z', ROSA, 1.8),
    ...tube('M44 76 Q62 84 80 76', ROT, 3.4),
    kr(62, 84, 4.6, GELB, 1.8),
    wange(38, 54),
    wange(86, 54),
  ])
}

function kaetzchen(): Zeichnung {
  const fell = '#F0A860'
  const streif = '#C97B35'
  const ohr = (pkt: [number, number][], innen: [number, number][]): Form[] => [poly(pkt, fell, 2.4), poly(innen, ROSA, 0)]
  return z([0, 0, 134, 120], [
    boden(62, 114, 46),
    ...tube('M80 102 Q116 104 110 70', fell, 9),
    ...ohr([[30, 44], [32, 10], [56, 26]], [[35, 38], [36, 20], [48, 28]]),
    ...ohr([[82, 44], [80, 10], [56, 26]], [[77, 38], [76, 20], [64, 28]]),
    el(56, 94, 27, 22, fell, 2.6),
    el(56, 100, 14, 16, '#FFF4DC', 0),
    el(44, 112, 9, 6, '#FFF4DC', 2.2),
    el(68, 112, 9, 6, '#FFF4DC', 2.2),
    kr(56, 46, 28, fell, 2.6),
    linie('M56 20 L56 30 M47 22 L49 31 M65 22 L63 31', 2.2, streif),
    ...[[44, 46], [68, 46]].flatMap(([x, y]) => [kr(x, y, 7, WEISS, 1.6), el(x, y + 0.5, 3, 5.4, T, 0), punkt(x + 1.4, y - 2, 1.5, WEISS)]),
    pf('M52 56 L60 56 L56 61 Z', ROSA, 1.4),
    pf('M56 61 Q52 67 47 64 M56 61 Q60 67 65 64', 'none', 1.6),
    linie('M30 54 L14 51 M30 58 L14 60', 1.4),
    linie('M82 54 L98 51 M82 58 L98 60', 1.4),
    wange(36, 58),
    wange(76, 58),
    // Wollknäuel
    kr(106, 100, 12, ROT, 2.4),
    linie('M97 96 Q106 90 114 98 M96 103 Q106 98 116 104 M100 109 Q108 104 114 108', 1.4, '#F3B4A6'),
  ])
}

function kaninchen(): Zeichnung {
  const fell = '#F4EFE6'
  return z([0, -4, 120, 128], [
    boden(60, 118, 44),
    el(60, 92, 31, 25, fell, 2.6),
    el(46, 112, 10, 6.5, fell, 2.2),
    el(74, 112, 10, 6.5, fell, 2.2),
    // kurze Ohren
    el(44, 18, 9, 17, '#B6BCC8', 2.4, -10),
    el(76, 18, 9, 17, '#B6BCC8', 2.4, 10),
    el(44, 19, 4.4, 11, ROSA, 0, -10),
    el(76, 19, 4.4, 11, ROSA, 0, 10),
    kr(60, 44, 24, fell, 2.6),
    el(46, 54, 12, 10, fell, 2.2),
    el(74, 54, 12, 10, fell, 2.2),
    el(68, 40, 10, 9, '#B6BCC8', 0),
    ...auge(50, 40, 3.6),
    ...auge(70, 40, 3.6),
    pf('M56 47 L64 47 L60 52 Z', ROSA, 1.4),
    pf('M60 52 Q55 58 51 55 M60 52 Q65 58 69 55', 'none', 1.6),
    rr(57, 55, 6, 8, WEISS, 1.4, 1.4),
    linie('M34 50 L20 46 M34 54 L20 55', 1.3),
    linie('M86 50 L100 46 M86 54 L100 55', 1.3),
    wange(40, 52),
    wange(80, 52),
    { t: 'path', d: 'M84 78 Q92 92 80 112 Q90 108 91 92 Q91 82 84 78 Z', f: '#DAD3C6', s: 'none' },
    linie('M44 86 Q50 92 46 100 M54 90 Q60 96 56 104', 1.4, '#CFC7B8'),
    glanz('M40 82 Q40 74 48 70', 3, 0.7),
  ])
}

function teddy(): Zeichnung {
  const fell = '#B07D4A'
  const hell = '#D9B07A'
  return z([0, 0, 124, 128], [
    boden(62, 122, 46),
    // Beine und Arme hinter dem Bauch
    el(32, 108, 16, 12, fell, 2.4, -10),
    el(92, 108, 16, 12, fell, 2.4, 10),
    el(30, 108, 8, 6.4, hell, 1.6, -10),
    el(94, 108, 8, 6.4, hell, 1.6, 10),
    el(62, 92, 32, 31, fell, 2.6),
    el(62, 96, 20, 22, hell, 0),
    el(28, 82, 10, 17, fell, 2.4, 32),
    el(96, 82, 10, 17, fell, 2.4, -32),
    // Flicken am Bein
    rr(84, 98, 14, 12, '#E5707A', 2, 1.6),
    linie('M86 101 L96 107 M96 101 L86 107', 1.2, 'papier'),
    // Kopf
    kr(36, 22, 11, fell, 2.4),
    kr(88, 22, 11, fell, 2.4),
    kr(36, 23, 5.6, hell, 0),
    kr(88, 23, 5.6, hell, 0),
    kr(62, 44, 28, fell, 2.6),
    el(62, 54, 13, 10, '#E8C99A', 2),
    ...auge(51, 40, 3.4),
    ...auge(73, 40, 3.4),
    el(62, 50, 5.4, 3.8, T, 0),
    pf('M58 58 Q62 63 66 58', 'none', 1.8),
    linie('M62 54 L62 58', 1.6),
    wange(42, 52),
    wange(82, 52),
    // Schleife
    poly([[62, 74], [44, 66], [44, 82]], ROT, 2),
    poly([[62, 74], [80, 66], [80, 82]], ROT, 2),
    kr(62, 74, 4.8, '#B8433A', 1.8),
    glanz('M40 26 Q42 16 50 14', 3.2, 0.5),
  ])
}

function lerche(): Zeichnung {
  const ruecken = '#B98A5A'
  const fluegel = '#8A6440'
  const brust = '#F3E3C3'
  const teile: Form[] = [
    drehen(-18, 62, 72, [{ t: 'ellipse', cx: 62, cy: 72, rx: 36, ry: 25 }]),
    { t: 'circle', cx: 98, cy: 44, r: 18 },
    { t: 'polygon', p: '34,78 6,98 16,104 46,92', f: T, s: T },
  ]
  const strich: Form[] = [[78, 68], [88, 62], [72, 78], [84, 76], [66, 88], [78, 88]].map(([x, y]) => linie(`M${x} ${y} L${x + 1.5} ${y + 5}`, 1.6, fluegel))
  return z([0, 0, 138, 116], [
    boden(62, 111, 40),
    linie('M58 92 L56 106 M72 92 L72 106', 2.6, '#D98B2B'),
    linie('M40 110 Q44 100 48 108 M76 110 Q78 100 84 110 M86 110 Q92 100 96 110', 2.2, GRUEN_D),
    ...silhouette(teile, ruecken, 5),
    pf('M70 56 Q92 56 108 54 Q112 70 92 88 Q74 100 54 92 Q56 70 70 56 Z', brust, 2),
    ...strich,
    pf('M26 64 Q40 46 72 54 Q66 78 42 86 Q24 82 26 64 Z', fluegel, 2.2),
    linie('M34 62 Q44 58 56 60 M32 70 Q44 66 58 70 M36 78 Q46 74 56 78', 1.4, ruecken),
    pf('M88 30 Q92 14 106 14 L100 24 L110 24 L98 32 Z', fluegel, 2),
    el(106, 48, 11, 9, brust, 0),
    ...auge(100, 40, 3.6),
    pf('M112 42 L132 38 L114 47 Z', '#F0A43A', 2),
    pf('M114 47 L130 51 L112 52 Z', '#F0A43A', 2),
    wange(108, 52, 3.6, 2.4),
    pf('M120 22 L120 10 L132 7 L132 19', 'none', 2),
    kr(117, 23, 4, DUNKEL, 1.6),
    kr(129, 20, 4, DUNKEL, 1.6),
  ])
}

export const NEU_TIERE: Record<string, () => Zeichnung> = {
  kalb,
  lamm,
  ferkel,
  welpe,
  kaetzchen,
  kaninchen,
  teddy,
  lerche,
}

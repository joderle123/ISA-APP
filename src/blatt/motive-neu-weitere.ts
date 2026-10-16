// ---------------------------------------------------------------------------
// Neue farbige Motive, Teil 9: weitere häufige Piktogramme ohne Motiv (Controller, Kamera,
// Megafon, T-Shirt, Schere, Fahne, Kalender, Rettungsring, Salzstreuer, Gehirn, Schuh,
// Fernseher, Tafel, Hammer, Konfetti, Besteck, Tasche, Rechenrahmen, Schutzschild, Blatt,
// Theatermasken, Stoppuhr, Toilettenpapier, Pfote, Burgturm, Pappbecher, geschlossenes Auge,
// Gehen). Stil wie motive-alltag.ts: Tinte als Umriss, flache warme Flächen, jede Fläche
// mit Kontur, keine Schrift, keine Marken, keine Landesflaggen.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { tube } from './figuren'
import { NEU_DINGE } from './motive-neu-dinge'
import {
  BLAU, CREME, DUNKEL, GELB, GELB_D, GLAS, GRAU, GRUEN, GRUEN_D, H2, HOLZ, HOLZ_D, METALL, ORANGE, ROSA, ROT, ROT_D,
  aufKopf, figur, g, glanz, kind, linie, schuh, silhouette, sternPfad, z, zuege,
} from './motive-dinge'
import { T, boden, drehen, el, kr, pf, poly, punkt, ringPfad, rr } from './motive-neu-helfer'

// =============================================================================
// Geräte
// =============================================================================

function controller(): Zeichnung {
  const knopf = (x: number, y: number, f: string): Form => kr(x, y, 6.4, f, 2)
  return z([0, 0, 130, 104], [
    boden(65, 100, 52),
    pf('M30 30 Q10 30 8 68 Q6 98 22 98 Q34 98 40 84 L90 84 Q96 98 108 98 Q124 98 122 68 Q120 30 100 30 Z', '#8E7CC3', 2.8),
    { t: 'path', d: 'M8 68 Q6 98 22 98 Q34 98 40 84 L90 84 Q96 98 108 98 Q124 98 122 68 Q118 80 96 78 L34 78 Q12 80 8 68 Z', f: '#6F5FA8', s: 'none', o: 0.55 },
    pf('M32 44 L42 44 L42 54 L52 54 L52 64 L42 64 L42 74 L32 74 L32 64 L22 64 L22 54 L32 54 Z', DUNKEL, 2),
    rr(52, 46, 26, 8, DUNKEL, 4, 2),
    knopf(92, 44, GELB),
    knopf(104, 56, ROT),
    knopf(92, 68, BLAU),
    knopf(80, 56, GRUEN),
    glanz('M22 40 Q30 34 44 34', 3.2, 0.8),
  ])
}

function kamera(): Zeichnung {
  return z([0, 0, 130, 108], [
    boden(65, 104, 54),
    pf('M30 30 L38 16 L62 16 L70 30 Z', '#3F8F82', 2.4),
    rr(86, 20, 14, 9, ROT, 3, 2),
    rr(8, 28, 114, 70, '#5BAE9F', 10, 2.8),
    rr(8, 28, 114, 20, '#3F8F82', 10, 2.6),
    rr(8, 38, 114, 10, '#3F8F82', 0, 0),
    rr(18, 34, 18, 10, '#FFE98A', 3, 1.8),
    kr(66, 66, 28, '#4A5262', 2.6),
    kr(66, 66, 20, '#7FAEE3', 2),
    kr(66, 66, 11, '#2F4A6E', 0),
    punkt(58, 58, 5, 'papier'),
    punkt(74, 74, 2.4, 'papier'),
    kr(106, 38, 3.4, 'papier', 1.6),
    glanz('M18 58 L18 86', 3, 0.5),
  ])
}

function megafon(): Zeichnung {
  return z([0, 0, 142, 116], [
    boden(66, 110, 52),
    drehen(-8, 66, 56, [
      rr(32, 56, 14, 32, DUNKEL, 4, 2.2),
      pf('M10 44 L36 44 L96 14 Q106 10 106 22 L106 78 Q106 90 96 86 L36 58 L10 58 Z', ORANGE, 2.6),
      poly([[58, 32], [68, 27], [68, 73], [58, 69]], 'papier', 2),
      rr(2, 42, 12, 18, DUNKEL, 4, 2.2),
      el(104, 50, 9, 37, '#F6B66F', 2.4),
      glanz('M22 47 L40 47', 2.6, 0.7),
    ]),
    linie('M118 36 Q126 54 118 72', 3.2, BLAU),
    linie('M126 26 Q138 54 126 82', 3.2, BLAU),
  ])
}

function fernseher(): Zeichnung {
  return z([0, 0, 130, 116], [
    boden(65, 111, 50),
    linie('M65 24 L38 4 M65 24 L94 4', 2.6),
    kr(38, 4, 3, DUNKEL, 1.4),
    kr(94, 4, 3, DUNKEL, 1.4),
    rr(26, 98, 16, 8, DUNKEL, 3, 2),
    rr(88, 98, 16, 8, DUNKEL, 3, 2),
    rr(10, 22, 110, 78, '#E8B87A', 10, 2.8),
    rr(20, 32, 84, 58, '#9CC6EC', 6, 2.2),
    pf('M20 78 Q44 60 64 74 Q84 62 104 76 L104 84 Q104 90 98 90 L26 90 Q20 90 20 84 Z', '#8DBF7A', 1.8),
    kr(84, 48, 7, GELB, 1.8),
    kr(112, 46, 4.2, ROT, 1.8),
    kr(112, 60, 4.2, BLAU, 1.8),
    glanz('M26 38 L40 38', 3, 0.85),
  ])
}

function stoppuhr(): Zeichnung {
  const striche: Form[] = Array.from({ length: 12 }, (_, i): Form => {
    const a = (i * 30 * Math.PI) / 180
    const p = (r: number) => `${(60 + Math.sin(a) * r).toFixed(1)} ${(76 - Math.cos(a) * r).toFixed(1)}`
    return linie(`M${p(35)} L${p(i % 3 === 0 ? 29 : 31.5)}`, i % 3 === 0 ? 2.4 : 1.6)
  })
  return z([0, 0, 124, 132], [
    boden(60, 127, 40),
    rr(52, 4, 16, 10, METALL, 3, 2.2),
    rr(56, 13, 8, 12, METALL, 2, 2),
    g('rotate(40 60 76)', [rr(54, 22, 12, 8, METALL, 3, 2.2)]),
    kr(60, 76, 46, '#5B8BD0', 2.8),
    kr(60, 76, 38, 'papier', 2.2),
    ...striche,
    kr(60, 58, 8, 'none', 1.6),
    linie('M60 76 L82 56', 3.4),
    kr(60, 76, 4.4, ROT, 1.8),
    glanz('M26 56 Q32 42 46 36', 3.8, 0.8),
  ])
}

function tafel(): Zeichnung {
  return z([0, 0, 142, 112], [
    boden(71, 107, 58),
    rr(8, 8, 126, 82, HOLZ, 6, 2.8),
    rr(16, 16, 110, 66, '#6FA58A', 3, 2),
    // Kreidezeichnung ohne Schrift: Sonne, Haus, Welle
    kr(40, 36, 8, 'none', 0),
    { t: 'circle', cx: 40, cy: 36, r: 8, f: 'none', s: 'papier', w: 2.4 },
    linie('M40 22 L40 18 M54 36 L58 36 M26 36 L22 36 M50 26 L53 23 M30 26 L27 23', 2.2, 'papier'),
    { t: 'polygon', p: '66,66 66,48 82,36 98,48 98,66', f: 'none', s: 'papier', w: 2.4 },
    { t: 'rect', x: 77, y: 54, b: 10, h: 12, rx: 0, f: 'none', s: 'papier', w: 2.2 },
    linie('M22 70 Q30 64 38 70 T54 70', 2.4, 'papier'),
    rr(8, 90, 126, 8, HOLZ_D, 3, 2.4),
    rr(30, 83, 16, 7, 'papier', 2, 1.8),
    rr(96, 82, 22, 9, GELB, 2, 1.8),
    glanz('M20 20 L20 40', 2.6, 0.35),
  ])
}

// =============================================================================
// Kleidung, Schule, Werkzeug
// =============================================================================

function tshirt(): Zeichnung {
  return z([0, 0, 130, 120], [
    boden(65, 115, 44),
    pf('M44 14 L12 32 L26 60 L40 52 L40 108 Q40 112 44 112 L86 112 Q90 112 90 108 L90 52 L104 60 L118 32 L86 14 Q65 28 44 14 Z', '#7FAEE3', 2.8),
    { t: 'path', d: 'M90 52 L104 60 L118 32 L86 14 Q92 26 90 52 Z', f: '#5B8BD0', s: 'none', o: 0.5 },
    pf('M44 14 Q65 34 86 14 Q65 24 44 14 Z', '#F6F9FC', 2.2),
    pf(sternPfad(65, 68, 15, 6.6), GELB, 2),
    glanz('M48 50 L48 100', 3, 0.5),
  ])
}

function schere(): Zeichnung {
  const stueck = (w: number, f: string): Form =>
    drehen(w, 60, 58, [
      poly([[54, 58], [66, 58], [64, 8], [58, 2]], METALL, 2.4),
      linie('M60 14 L60 52', 1.4, 'papier'),
      rr(55, 56, 10, 24, METALL, 3, 2.2),
      pf(ringPfad(60, 100, 15, 19, 8.5, 12), f, 2.4),
    ])
  return z([0, 0, 120, 128], [
    boden(60, 124, 40),
    stueck(17, ROT),
    stueck(-17, BLAU),
    kr(60, 58, 5.4, GRAU, 2.2),
  ])
}

function hammer(): Zeichnung {
  return z([-16, -16, 144, 148], [
    boden(56, 113, 36),
    drehen(38, 56, 60, [
      rr(50, 34, 12, 76, HOLZ, 5, 2.6),
      rr(50, 86, 12, 24, ROT, 5, 2.4),
      pf('M22 14 L92 14 Q98 14 98 20 L98 36 Q98 40 92 40 L22 40 Q14 40 10 30 L16 26 L10 20 Q14 14 22 14 Z', '#9AA5B5', 2.8),
      rr(22, 14, 22, 26, '#7C8899', 0, 0),
      glanz('M50 20 L88 20', 3, 0.7),
    ]),
  ])
}

function rechenrahmen(): Zeichnung {
  const zeilen: Form[] = []
  const links = [3, 5, 2, 4]
  links.forEach((a, i) => {
    const y = 32 + i * 16
    zeilen.push(linie(`M18 ${y} L112 ${y}`, 2, DUNKEL))
    for (let j = 0; j < a; j++) zeilen.push(kr(26 + j * 10, y, 4.8, ROT, 1.6))
    for (let j = 0; j < 8 - a; j++) zeilen.push(kr(104 - j * 10, y, 4.8, BLAU, 1.6))
  })
  return z([0, 0, 130, 112], [
    boden(65, 108, 52),
    rr(8, 8, 114, 92, HOLZ, 6, 2.8),
    rr(18, 18, 94, 72, CREME, 2, 2),
    ...zeilen,
    rr(16, 98, 12, 6, HOLZ_D, 2, 2),
    rr(102, 98, 12, 6, HOLZ_D, 2, 2),
  ])
}

function kalender(): Zeichnung {
  const kaestchen: Form[] = []
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) kaestchen.push(rr(21 + c * 16, 56 + r * 18, 11, 11, (r === 1 && c === 2) ? ROT : (r === 2 && c === 4) ? GELB : '#E4EBF2', 2.4, 1.6))
  return z([0, 0, 120, 124], [
    boden(60, 119, 46),
    rr(10, 20, 100, 96, 'papier', 8, 2.8),
    rr(10, 20, 100, 28, ROT, 8, 2.6),
    rr(10, 36, 100, 12, ROT, 0, 0),
    linie('M10 48 L110 48', 2.4),
    rr(32, 10, 8, 22, METALL, 4, 2.2),
    rr(80, 10, 8, 22, METALL, 4, 2.2),
    ...kaestchen,
    glanz('M16 28 L40 28', 2.6, 0.6),
  ])
}

function schutzschild(): Zeichnung {
  return z([0, 0, 120, 126], [
    boden(60, 121, 38),
    pf('M60 8 L108 22 L108 58 Q108 92 60 114 Q12 92 12 58 L12 22 Z', BLAU, 2.8),
    pf('M60 18 L98 30 L98 58 Q98 84 60 102 Q22 84 22 58 L22 30 Z', '#8EB5E6', 2),
    pf(sternPfad(60, 62, 24, 10.5), 'papier', 2.2),
    glanz('M24 34 L24 56', 3.4, 0.7),
  ])
}

function blatt(): Zeichnung {
  return z([-8, -8, 128, 140], [
    boden(56, 119, 34),
    drehen(-18, 56, 62, [
      ...tube('M30 112 Q36 100 44 90', HOLZ_D, 3),
      pf('M22 100 Q8 50 40 22 Q66 4 98 6 Q104 44 84 76 Q62 104 22 100 Z', GRUEN, 2.8),
      { t: 'path', d: 'M22 100 Q50 62 98 6 Q104 44 84 76 Q62 104 22 100 Z', f: '#6FA55F', s: 'none', o: 0.5 },
      linie('M24 100 Q54 64 94 12', 2.6, GRUEN_D),
      linie('M50 70 L44 52 M62 56 L56 36 M44 82 L26 74 M70 62 L90 66 M60 78 L78 84', 1.8, GRUEN_D),
      glanz('M30 44 Q38 30 52 22', 3.2, 0.8),
    ]),
  ])
}

// =============================================================================
// Essen und Haushalt
// =============================================================================

function besteck(): Zeichnung {
  const gabel: Form[] = [
    ...[0, 7.8, 15.6].map((x): Form => rr(x, 0, 4.4, 28, METALL, 2.2, 1.8)),
    rr(0, 22, 20, 14, METALL, 6, 2.2),
    rr(7.5, 34, 5, 60, METALL, 2.5, 2.2),
  ]
  return z([0, 0, 142, 112], [
    boden(71, 106, 52),
    g('translate(10 8)', gabel),
    kr(71, 56, 40, '#DCEEFA', 2.6),
    kr(71, 56, 28, 'papier', 1.8),
    g('translate(114 8)', [pf('M0 0 Q14 6 14 42 L0 42 Z', METALL, 2.2), rr(0, 40, 10, 54, METALL, 4, 2.2)]),
    glanz('M48 40 Q54 32 62 30', 3, 0.8),
  ])
}

function salzstreuer(): Zeichnung {
  const koerper = 'M14 40 L66 40 L62 108 Q61 114 55 114 L25 114 Q19 114 18 108 Z'
  return z([0, 0, 80, 122], [
    boden(40, 118, 28),
    pf(koerper, GLAS, 2.6),
    { t: 'path', d: 'M15 70 L65 70 L62 108 Q61 114 55 114 L25 114 Q19 114 18 108 Z', f: '#F7F9FB', s: 'none' },
    ...[[28, 84], [44, 92], [34, 102], [52, 80], [26, 96], [48, 106]].map(([x, y]): Form => punkt(x, y, 1.5, '#B9C5D6')),
    glanz('M22 48 L24 100', 3, 0.9),
    pf(koerper, 'none', 2.6),
    pf('M10 40 Q10 20 40 16 Q70 20 70 40 Z', METALL, 2.6),
    rr(8, 38, 64, 8, GRAU, 3, 2.4),
    ...[[30, 28], [40, 24], [50, 28], [36, 33], [46, 33]].map(([x, y]): Form => punkt(x, y, 1.8, DUNKEL)),
  ])
}

function konfetti(): Zeichnung {
  const stueck = (x: number, y: number, w: number, f: string): Form => drehen(w, x, y, [rr(x - 3, y - 1.8, 6, 3.6, f, 1, 1.2)])
  return z([0, 0, 126, 122], [
    boden(48, 118, 40),
    ...tube('M72 56 Q92 34 82 12', ROSA, 2.4),
    ...tube('M76 64 Q104 54 112 30', BLAU, 2.4),
    ...tube('M68 50 Q66 30 50 20', GRUEN, 2.4),
    pf('M8 116 L56 52 L72 68 Z', GELB, 2.8),
    linie('M22 98 L40 106 M32 84 L52 92 M42 70 L62 78', 2.2, ROT),
    el(64, 60, 18, 7, ROT, 2.4, 50),
    stueck(100, 14, 30, ROT), stueck(112, 44, -20, GRUEN), stueck(94, 76, 50, BLAU), stueck(38, 14, -30, GELB), stueck(60, 8, 10, ROSA),
    kr(98, 54, 3.4, GELB, 1.4), kr(116, 70, 3, ROSA, 1.4), kr(24, 36, 3.4, BLAU, 1.4), kr(86, 28, 3, ROT, 1.4), kr(44, 34, 2.8, GRUEN, 1.4),
  ])
}

function einkaufstasche(): Zeichnung {
  return z([0, 0, 112, 126], [
    boden(56, 121, 42),
    drehen(24, 70, 40, [rr(64, 8, 14, 50, '#E5B170', 7, 2.4), linie('M68 18 L74 22 M68 30 L74 34', 1.4, '#B07D4A')]),
    kr(34, 36, 13, ROT, 2.4),
    pf('M34 24 Q38 14 46 16 Q42 24 34 24 Z', GRUEN, 1.6),
    ...tube('M36 48 Q36 20 56 20 Q76 20 76 48', '#5E9F4F', 4.4),
    pf('M16 46 L96 46 L92 114 Q91 120 85 120 L27 120 Q21 120 20 114 Z', '#8DBF7A', 2.8),
    rr(16, 46, 80, 12, '#6FA55F', 0, 2.2),
    g('translate(56 88) scale(1.7)', [pf('M0 5 Q-8 -1 -6 -5 Q-3 -8 0 -4 Q3 -8 6 -5 Q8 -1 0 5 Z', 'papier', 1.2)]),
    glanz('M24 66 L24 108', 3, 0.5),
  ])
}

function papiertuete(): Zeichnung {
  return z([0, 0, 100, 126], [
    boden(50, 121, 36),
    pf('M20 36 L80 36 L84 112 Q84 118 78 118 L22 118 Q16 118 16 112 Z', '#D9B07A', 2.8),
    pf('M18 36 Q28 18 38 30 Q50 12 62 30 Q72 18 82 36 Z', '#C99A62', 2.6),
    linie('M24 48 L76 48', 2, '#B07D4A'),
    kr(50, 84, 13, ROSA, 2.2),
    g('translate(50 85) scale(1.4)', [pf('M0 5 Q-8 -1 -6 -5 Q-3 -8 0 -4 Q3 -8 6 -5 Q8 -1 0 5 Z', ROT, 1.2)]),
    glanz('M22 60 L22 108', 3, 0.5),
  ])
}

function pappbecher(): Zeichnung {
  return z([0, 0, 92, 132], [
    boden(46, 127, 28),
    rr(34, 14, 24, 14, '#5C6373', 4, 2.2),
    pf('M16 36 L76 36 L68 118 Q67 124 61 124 L31 124 Q25 124 24 118 Z', 'papier', 2.8),
    poly([[20, 62], [72, 62], [69, 94], [23, 94]], '#D9B07A', 2.4),
    g('translate(46 78) scale(1.4)', [pf('M0 5 Q-8 -1 -6 -5 Q-3 -8 0 -4 Q3 -8 6 -5 Q8 -1 0 5 Z', ROT, 1.2)]),
    rr(12, 26, 68, 12, '#5C6373', 5, 2.6),
    glanz('M24 44 L28 112', 2.6, 0.7),
  ])
}

function fahne(): Zeichnung {
  return z([0, 0, 124, 130], [
    boden(40, 126, 30),
    rr(18, 8, 6, 118, '#8A5A3C', 3, 2.2),
    kr(21, 8, 6, GELB, 2),
    pf('M24 16 Q48 6 72 16 T120 16 L120 74 Q96 84 72 74 T24 74 Z', '#5BAE9F', 2.8),
    { t: 'path', d: 'M24 74 L24 16 Q48 6 72 16 T120 16 L120 74 Q96 84 72 74 T24 74 Z', f: 'none', s: 'none' },
    kr(72, 46, 14, GELB, 2.2),
    glanz('M32 24 Q42 20 54 22', 3.2, 0.6),
  ])
}

function rettungsring(): Zeichnung {
  const seg = (a1: number, a2: number, f: string): Form => {
    const P = (a: number, r: number) => `${(65 + Math.cos((a * Math.PI) / 180) * r).toFixed(1)} ${(62 + Math.sin((a * Math.PI) / 180) * r).toFixed(1)}`
    return pf(`M${P(a1, 50)} A50 50 0 0 1 ${P(a2, 50)} L${P(a2, 21)} A21 21 0 0 0 ${P(a1, 21)} Z`, f, 2.4)
  }
  return z([0, 0, 130, 126], [
    boden(65, 120, 46),
    seg(-45, 45, ROT),
    seg(45, 135, 'papier'),
    seg(135, 225, ROT),
    seg(225, 315, 'papier'),
    { t: 'circle', cx: 65, cy: 62, r: 35.5, f: 'none', s: HOLZ, w: 3, dash: '7 5' },
    glanz('M30 36 Q38 24 52 18', 3.6, 0.8),
  ])
}

function toilettenpapier(): Zeichnung {
  return z([0, 0, 112, 126], [
    boden(56, 122, 38),
    el(56, 98, 34, 10, 'papier', 2.6),
    rr(22, 36, 68, 62, 'papier', 0, 0),
    linie('M22 36 L22 98 M90 36 L90 98', 2.6),
    el(56, 98, 34, 10, 'papier', 0),
    { t: 'path', d: 'M22 98 Q56 114 90 98', f: 'none', s: T, w: 2.6 },
    rr(22, 62, 68, 10, '#CFE6F7', 0, 0),
    linie('M22 62 Q56 72 90 62 M22 72 Q56 82 90 72', 1.6, '#7FAEE3'),
    el(56, 36, 34, 10, 'papier', 2.6),
    el(56, 36, 13, 4.6, '#D9B07A', 1.8),
    el(56, 37, 9.5, 3, '#8A5A3C', 0),
    pf('M30 100 L30 120 Q38 116 46 120 Q54 116 62 120 L62 106 Z', 'papier', 2.2),
    glanz('M28 48 L28 90', 3, 0.8),
  ])
}

// =============================================================================
// Körper, Geist, Bühne
// =============================================================================

function gehirn(): Zeichnung {
  const form = 'M65 10 C40 4 14 20 16 44 C6 52 8 74 24 80 C28 96 50 104 65 96 C80 104 102 96 106 80 C122 74 124 52 114 44 C116 20 90 4 65 10 Z'
  return z([0, 0, 130, 112], [
    boden(65, 107, 46),
    pf(form, '#F2A3B5', 2.8),
    linie('M65 12 C60 30 70 40 62 54 C56 66 68 78 64 94', 2.6, '#D9738A'),
    linie('M24 46 C34 40 40 48 36 58 M40 24 C50 22 54 32 46 38 M22 72 C34 70 38 62 46 66 M36 88 C44 84 50 78 58 82', 2.4, '#D9738A'),
    linie('M106 46 C96 40 90 48 94 58 M90 24 C80 22 76 32 84 38 M108 72 C96 70 92 62 84 66 M94 88 C86 84 80 78 72 82', 2.4, '#D9738A'),
    glanz('M28 34 Q36 20 52 16', 3.6, 0.85),
  ])
}

function sneaker(): Zeichnung {
  return z([0, 0, 144, 96], [
    boden(72, 90, 58),
    pf('M12 64 L12 34 Q12 24 24 26 L44 30 Q56 40 70 32 L86 16 Q94 10 102 18 L112 46 Q134 48 134 64 Z', ROT, 2.8),
    pf('M112 46 Q134 48 134 64 L102 64 Q108 56 112 46 Z', '#F2B8B0', 2.2),
    linie('M24 58 Q58 48 98 58', 3, 'papier'),
    linie('M60 34 L72 42 M68 26 L80 34 M78 18 L90 26', 2.6, 'papier'),
    rr(8, 64, 130, 18, 'papier', 9, 2.8),
    linie('M18 72 L128 72', 1.6, '#C9D8E8'),
    glanz('M18 34 L18 52', 3, 0.7),
  ])
}

function augeZu(): Zeichnung {
  const kurve = (t: number): [number, number] => [(1 - t) ** 2 * 12 + 2 * (1 - t) * t * 70 + t ** 2 * 128, (1 - t) ** 2 * 36 + 2 * (1 - t) * t * 84 + t ** 2 * 36]
  const wimpern: Form[] = [0.12, 0.28, 0.44, 0.56, 0.72, 0.88].map((t): Form => {
    const [x, y] = kurve(t)
    const dx = (t - 0.5) * 22
    return linie(`M${x.toFixed(1)} ${y.toFixed(1)} L${(x + dx).toFixed(1)} ${(y + 13).toFixed(1)}`, 3.6)
  })
  return z([0, -2, 140, 80], [
    el(70, 76, 52, 4, 'hellgrau', 0),
    pf('M12 36 Q70 84 128 36 Q70 60 12 36 Z', H2, 2.6),
    ...wimpern,
    glanz('M34 42 Q50 54 68 58', 3, 0.7),
  ])
}

function theatermasken(): Zeichnung {
  const maske = (cx: number, cy: number, w: number, f: string, froh: boolean): Form =>
    g(`translate(${cx} ${cy}) rotate(${w})`, [
      pf('M0 -34 Q30 -36 34 -10 Q34 26 0 40 Q-34 26 -34 -10 Q-30 -36 0 -34 Z', f, 2.8),
      pf(froh ? 'M-23 -10 Q-14 -20 -5 -12 Q-14 -4 -23 -10 Z' : 'M-23 -14 Q-14 -6 -5 -10 Q-14 -18 -23 -14 Z', DUNKEL, 1.6),
      pf(froh ? 'M23 -10 Q14 -20 5 -12 Q14 -4 23 -10 Z' : 'M23 -14 Q14 -6 5 -10 Q14 -18 23 -14 Z', DUNKEL, 1.6),
      linie(froh ? 'M-22 -22 Q-14 -28 -6 -22 M22 -22 Q14 -28 6 -22' : 'M-22 -22 L-6 -26 M22 -22 L6 -26', 2.4),
      linie(froh ? 'M-14 12 Q0 28 14 12' : 'M-14 26 Q0 12 14 26', 3.4),
      glanz('M-22 -24 Q-16 -30 -8 -31', 2.6, 0.8),
    ])
  return z([0, 0, 146, 116], [
    boden(73, 110, 54),
    maske(98, 66, 12, '#7FAEE3', false),
    ...tube('M104 30 Q116 22 124 30', ROT, 2.4),
    maske(48, 56, -12, '#F4C842', true),
    ...tube('M40 22 Q26 14 18 22', ROT, 2.4),
  ])
}

function pfote(): Zeichnung {
  const f = '#A9744C'
  return z([0, 0, 120, 114], [
    boden(60, 109, 38),
    el(26, 50, 9, 13, f, 2.6, -28),
    el(47, 28, 9.5, 14, f, 2.6, -8),
    el(73, 28, 9.5, 14, f, 2.6, 8),
    el(94, 50, 9, 13, f, 2.6, 28),
    pf('M60 56 C40 56 22 76 26 92 C30 106 48 100 60 100 C72 100 90 106 94 92 C98 76 80 56 60 56 Z', f, 2.8),
    glanz('M42 70 Q46 64 54 62', 3.4, 0.5),
    glanz('M44 22 Q46 18 50 17', 2.4, 0.5),
  ])
}

function gehen(): Zeichnung {
  const t = kind('locken', '#3A2B22', '#C58C66', '#6FB39A', '#4F6D99')
  return z([0, 0, 100, 164], [
    boden(50, 158, 28),
    ...figur({
      t,
      gesicht: zuege('lacht'),
      armL: { c: [22, 86], h: [26, 104] },
      armR: { c: [78, 84], h: [74, 100] },
      fussL: [38, 148],
      fussR: [64, 146],
      schatten: false,
      vorne: [schuh(38, 150, false, 6), schuh(64, 148, true, -4)],
    }),
  ])
}

function burgturm(): Zeichnung {
  const stein = '#D3C7B0'
  const steinD = '#B5A98F'
  const zinnen: Form[] = [20, 33, 46, 59, 72].map((x): Form => rr(x, 26, 9, 16, stein, 1, 2.2))
  const fugen: Form[] = [60, 82, 104].flatMap((y): Form[] => [linie(`M22 ${y} L78 ${y}`, 1.4, steinD)])
  return z([0, 0, 100, 146], [
    boden(50, 141, 38),
    linie('M50 26 L50 4', 2.6),
    pf('M50 4 L72 10 L50 16 Z', ROT, 1.8),
    ...zinnen,
    pf('M22 40 L78 40 L82 134 L18 134 Z', stein, 2.8),
    rr(16, 38, 68, 8, steinD, 2, 2.4),
    ...fugen,
    pf('M38 134 L38 100 Q38 86 50 86 Q62 86 62 100 L62 134 Z', '#8A5A3C', 2.4),
    pf('M44 64 L44 54 Q44 48 50 48 Q56 48 56 54 L56 64 Z', DUNKEL, 2),
    glanz('M26 50 L28 126', 3, 0.5),
  ])
}

// =============================================================================
// Verhalten, Gefühle, Spielschule: Stall, Papierball, Handschuh und Werkzeuge der Kurse
// =============================================================================

function stall(): Zeichnung {
  return z([0, 0, 140, 122], [
    boden(70, 117, 62),
    pf('M6 52 L30 20 L70 8 L110 20 L134 52 Z', '#7A5C4A', 2.8),
    rr(14, 50, 112, 66, ROT, 3, 2.8),
    rr(54, 26, 32, 22, 'papier', 3, 2.2),
    linie('M70 26 L70 48 M54 37 L86 37', 1.8),
    ...[26, 38, 90, 102, 114].map((x): Form => linie(`M${x} 54 L${x} 112`, 1.6, ROT_D)),
    rr(42, 70, 56, 46, '#B9433A', 2, 2.6),
    { t: 'rect', x: 44, y: 72, b: 52, h: 42, rx: 1, f: 'none', s: 'papier', w: 3 },
    linie('M44 72 L96 114 M96 72 L44 114 M70 72 L70 114', 3, 'papier'),
    glanz('M16 58 L16 70', 2.6, 0.6),
  ])
}

function papierball(): Zeichnung {
  return z([0, 0, 112, 114], [
    boden(56, 108, 40),
    pf('M55 10 L74 18 L96 14 L100 38 L92 56 L98 78 L80 94 L58 100 L34 96 L14 80 L18 56 L10 36 L28 20 Z', 'papier', 2.8),
    poly([[55, 10], [52, 40], [28, 20]], '#E4E8EE', 0),
    poly([[66, 44], [92, 56], [98, 78], [58, 76]], '#E4E8EE', 0),
    poly([[18, 56], [40, 58], [34, 96], [14, 80]], '#E4E8EE', 0),
    linie('M55 10 L52 40 L34 52 M74 18 L66 44 L92 56 M18 56 L40 58 L34 96 M66 44 L58 76 L80 94 M40 58 L58 76 M52 40 L66 44', 1.8, GRAU),
    linie('M70 30 L84 28 M24 70 L30 76', 1.4, '#B9C5D6'),
    pf('M55 10 L74 18 L96 14 L100 38 L92 56 L98 78 L80 94 L58 100 L34 96 L14 80 L18 56 L10 36 L28 20 Z', 'none', 2.8),
  ])
}

function handschuh(): Zeichnung {
  const fb = 12
  const fx = (i: number) => 31 + i * 13.6
  const hoehe = [46, 56, 50, 38]
  const teile: Form[] = [
    { t: 'rect', x: 30, y: 58, b: 56, h: 48, rx: 14 },
    ...hoehe.map((h, i): Form => ({ t: 'rect', x: fx(i), y: 62 - h, b: fb, h: h + 8, rx: fb / 2 })),
    g('rotate(-36 34 98)', [{ t: 'rect', x: 22, y: 60, b: 17, h: 46, rx: 8.5 }]),
  ]
  const out: Form[] = [...silhouette(teile, ROT, 4.6)]
  for (let i = 0; i < 3; i++) out.push(linie(`M${(fx(i + 1) - 0.8).toFixed(1)} 64 L${(fx(i + 1) - 0.8).toFixed(1)} ${(62 - Math.min(hoehe[i], hoehe[i + 1]) + 8).toFixed(1)}`, 1.8, '#A9423A'))
  out.push(glanz('M38 72 L38 96', 3, 0.5))
  out.push(rr(26, 100, 64, 24, CREME, 6, 2.6), linie('M30 108 L86 108 M30 116 L86 116', 2.4, ROT))
  return z([-4, -2, 122, 134], [boden(58, 128, 36), ...out])
}

function radio(): Zeichnung {
  const dial: Form[] = [0, 1, 2, 3, 4, 5, 6].map((i): Form => linie(`M${84 + i * 5} 46 L${84 + i * 5} ${i % 2 ? 50 : 53}`, 1.4))
  return z([0, 0, 140, 112], [
    boden(70, 107, 54),
    ...tube('M34 32 Q34 14 52 14 L88 14 Q106 14 106 32', DUNKEL, 4),
    rr(10, 30, 120, 70, '#EE9A4D', 10, 2.8),
    rr(10, 30, 120, 14, '#F6B66F', 10, 0),
    kr(46, 68, 25, '#F6B66F', 2.4),
    kr(46, 68, 17, 'none', 1.8),
    ...[[40, 62], [52, 62], [40, 74], [52, 74], [46, 68]].map(([x, y]): Form => punkt(x, y, 2, DUNKEL)),
    rr(80, 40, 40, 18, '#FBE9C0', 3, 2),
    ...dial,
    linie('M100 41 L100 57', 2, ROT),
    kr(92, 78, 7.4, DUNKEL, 2),
    kr(112, 78, 7.4, DUNKEL, 2),
    linie('M92 74 L92 78 M112 74 L112 78', 1.6, 'papier'),
    glanz('M16 38 L40 38', 2.8, 0.7),
  ])
}

function richterhammer(): Zeichnung {
  return z([-6, 0, 136, 112], [
    boden(70, 106, 52),
    rr(24, 88, 82, 14, HOLZ_D, 4, 2.6),
    rr(34, 78, 62, 12, HOLZ, 4, 2.6),
    drehen(-26, 72, 62, [
      rr(66, 44, 10, 56, HOLZ, 5, 2.4),
      rr(42, 18, 58, 30, HOLZ, 9, 2.8),
      rr(42, 18, 11, 30, HOLZ_D, 5, 2.2),
      rr(89, 18, 11, 30, HOLZ_D, 5, 2.2),
      glanz('M58 24 L84 24', 3, 0.6),
    ]),
    linie('M18 56 L8 50 M16 70 L4 70', 3, GELB_D),
  ])
}

function toilette(): Zeichnung {
  return z([0, 0, 114, 130], [
    boden(57, 126, 42),
    rr(56, 8, 46, 42, 'papier', 6, 2.6),
    kr(79, 18, 4.4, BLAU, 1.8),
    pf('M16 56 L102 56 Q104 88 76 100 L76 106 L88 106 L88 118 L30 118 L30 106 L42 106 L42 100 Q14 88 16 56 Z', 'papier', 2.8),
    { t: 'path', d: 'M102 56 Q104 88 76 100 L76 106 L88 106 L88 118 L74 118 Q82 90 94 56 Z', f: '#DCEEFA', s: 'none', o: 0.9 },
    el(59, 56, 44, 10, '#DCEEFA', 2.6),
    el(59, 57, 34, 6, '#B9D6EC', 1.8),
    glanz('M24 66 Q26 80 36 90', 3.2, 0.9),
  ])
}

function gedankenKopf(): Zeichnung {
  const wolke: Form[] = [{ t: 'circle', cx: 92, cy: 26, r: 14 }, { t: 'circle', cx: 110, cy: 16, r: 15 }, { t: 'circle', cx: 128, cy: 26, r: 13 }, { t: 'circle', cx: 110, cy: 36, r: 13 }]
  return z([0, -4, 144, 136], [
    boden(50, 128, 40),
    pf('M12 132 Q14 110 50 108 Q86 110 88 132 Z', BLAU, 2.6),
    kr(50, 80, 34, H2, 2.6),
    pf('M16 76 Q14 44 50 42 Q86 44 84 76 Q70 56 50 56 Q30 56 16 76 Z', '#4A3426', 2.4),
    aufKopf(zuege('sanft'), 50, 82, 34),
    kr(80, 56, 3.6, 'papier', 1.8),
    kr(88, 46, 5.2, 'papier', 1.8),
    ...silhouette(wolke, 'papier', 4.6),
    linie('M98 28 q6 -9 12 0 t12 0', 2.4, BLAU),
  ])
}

function herzklopfen(): Zeichnung {
  return z([-4, 4, 150, 116], [
    g('translate(11 4) scale(0.92)', NEU_DINGE.herz().formen),
    linie('M14 34 L4 28 M10 58 L0 58 M14 82 L4 90', 3.4, ROT),
    linie('M128 34 L138 28 M132 58 L142 58 M128 82 L138 90', 3.4, ROT),
  ])
}

export const NEU_WEITERE: Record<string, () => Zeichnung> = {
  controller,
  kamera,
  megafon,
  fernseher,
  stoppuhr,
  tafel,
  tshirt,
  schere,
  hammer,
  rechenrahmen,
  kalender,
  schutzschild,
  blatt,
  besteck,
  salzstreuer,
  konfetti,
  einkaufstasche,
  papiertuete,
  pappbecher,
  gehirn,
  schuh: sneaker,
  'auge-zu': augeZu,
  theatermasken,
  pfote,
  gehen,
  burgturm,
  fahne,
  rettungsring,
  toilettenpapier,
  stall,
  papierball,
  handschuh,
  radio,
  richterhammer,
  toilette,
  'gedanken-kopf': gedankenKopf,
  herzklopfen,
}

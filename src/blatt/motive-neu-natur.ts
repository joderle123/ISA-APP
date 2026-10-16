// ---------------------------------------------------------------------------
// Neue farbige Motive, Teil 7: Natur, Draußen und Dinge zum Spielen (Schneeflocke, Flamme,
// Lagerfeuer, Setzling, Gewitter, Zelt, Sandkasten, Samenkorn, Blumentopf, Schneckenhaus,
// Bälle, Brille, Taschentuch, Schließfach).
// Stil wie motive-alltag.ts: Tinte als Umriss, flache warme Flächen, weiße Glanzlichter,
// jede Fläche mit Kontur, keine Schrift, keine Marken.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { tube } from './figuren'
import {
  BLAU, BLAU_D, DUNKEL, GELB, GRAU, GRUEN, GRUEN_D, HELLGRUEN, HOLZ, HOLZ_D, METALL, ORANGE, ROSA, ROT, g, glanz, linie, silhouette, tropfen, z,
} from './motive-dinge'
import { T, boden, drehen, el, kr, pf, poly, punkt, ringPfad, rr } from './motive-neu-helfer'

const SAND = '#F1DFAE'
const SAND_D = '#D9C187'

// =============================================================================
// Wetter und Feuer
// =============================================================================

function schneeflocke(): Zeichnung {
  const arm = (w: number): Form =>
    g(`translate(62 62) rotate(${w})`, [
      { t: 'rect', x: -4.5, y: -54, b: 9, h: 54, rx: 4.5 },
      g('translate(0 -26) rotate(50)', [{ t: 'rect', x: -3.5, y: -19, b: 7, h: 19, rx: 3.5 }]),
      g('translate(0 -26) rotate(-50)', [{ t: 'rect', x: -3.5, y: -19, b: 7, h: 19, rx: 3.5 }]),
      g('translate(0 -42) rotate(50)', [{ t: 'rect', x: -3.5, y: -12, b: 7, h: 12, rx: 3.5 }]),
      g('translate(0 -42) rotate(-50)', [{ t: 'rect', x: -3.5, y: -12, b: 7, h: 12, rx: 3.5 }]),
    ])
  const teile: Form[] = [0, 60, 120, 180, 240, 300].map(arm)
  return z([0, 0, 124, 124], [
    ...silhouette([...teile, { t: 'circle', cx: 62, cy: 62, r: 11 }], '#CFE6F7', 5),
    kr(62, 62, 6, 'papier', 1.8),
    ...[0, 60, 120, 180, 240, 300].map((w): Form => g(`translate(62 62) rotate(${w})`, [linie('M0 -14 L0 -48', 1.6, 'papier')])),
  ])
}

function flamme(): Zeichnung {
  return z([0, 0, 100, 134], [
    boden(50, 128, 28),
    pf('M50 6 C58 30 84 44 84 82 C84 108 68 124 50 124 C32 124 16 108 16 84 C16 64 28 54 34 40 C40 48 42 56 46 58 C50 42 46 24 50 6 Z', '#F08A3C', 2.8),
    pf('M50 54 C56 68 68 76 68 94 C68 108 60 116 50 116 C40 116 32 108 32 96 C32 82 44 76 50 54 Z', '#F7D152', 2),
    pf('M50 86 C54 92 58 96 58 102 C58 108 54 112 50 112 C46 112 42 108 42 102 C42 96 46 92 50 86 Z', '#FFF1C9', 1.6),
    glanz('M26 80 Q26 70 32 64', 3, 0.5),
  ])
}

function feuer(): Zeichnung {
  const stein = (x: number, y: number, rx: number, ry: number): Form[] => [el(x, y, rx, ry, '#B7BEC9', 2.4), glanz(`M${x - rx * 0.5} ${y - ry * 0.3} Q${x - rx * 0.3} ${y - ry * 0.7} ${x} ${y - ry * 0.7}`, 2.4, 0.8)]
  const holz = (w: number): Form =>
    drehen(w, 70, 94, [
      rr(28, 86, 84, 16, '#8A5A3C', 8, 2.6),
      el(30, 94, 5, 8, '#D9B07A', 2),
      el(110, 94, 5, 8, '#D9B07A', 2),
      linie('M44 92 L96 92', 1.4, '#6E4430'),
    ])
  return z([0, 0, 140, 124], [
    boden(70, 120, 60),
    pf('M70 12 C78 32 100 44 100 76 C100 96 88 104 70 104 C52 104 40 96 40 78 C40 62 50 54 54 42 C60 50 62 56 66 58 C70 44 66 28 70 12 Z', '#F08A3C', 2.8),
    pf('M70 54 C76 66 88 72 88 86 C88 96 80 100 70 100 C60 100 52 96 52 88 C52 78 64 72 70 54 Z', '#F7D152', 2),
    pf('M30 62 C34 74 44 78 44 90 C44 98 38 100 32 100 C26 100 22 94 22 88 C22 80 30 76 30 62 Z', '#F7D152', 2.2),
    pf('M112 56 C108 70 98 74 98 88 C98 96 104 100 110 100 C116 100 120 94 120 88 C120 80 112 74 112 56 Z', '#F7D152', 2.2),
    holz(-14),
    holz(14),
    ...stein(22, 106, 13, 9),
    ...stein(42, 112, 13, 8),
    ...stein(98, 112, 13, 8),
    ...stein(118, 106, 13, 9),
  ])
}

function gewitter(): Zeichnung {
  const kreise: [number, number, number][] = [[44, 42, 22], [74, 28, 26], [106, 36, 22], [126, 52, 16]]
  const teile: Form[] = [...kreise.map(([cx, cy, r]): Form => ({ t: 'circle', cx, cy, r })), { t: 'rect', x: 26, y: 42, b: 118, h: 30, rx: 15 }]
  return z([8, 0, 150, 142], [
    ...silhouette(teile, '#9AA6B8', 4.6),
    { t: 'path', d: 'M28 56 Q28 70 42 70 L128 70 Q142 70 142 56 Q86 66 28 56 Z', f: '#7F8CA0', s: 'none' },
    glanz('M54 24 Q60 14 72 12', 4, 0.6),
    tropfen(34, 96, 1.2),
    tropfen(130, 100, 1.2),
    tropfen(52, 120, 1),
    tropfen(116, 124, 1),
    pf('M88 62 L64 98 L80 98 L70 134 L106 88 L90 88 L102 62 Z', GELB, 2.6),
    glanz('M84 70 L72 90', 2.4, 0.8),
  ])
}

// =============================================================================
// Zelt, Sandkasten, Pflanzen
// =============================================================================

function zelt(): Zeichnung {
  return z([0, 0, 144, 116], [
    pf('M0 100 Q36 94 72 100 Q108 94 144 100 L144 112 L0 112 Z', HELLGRUEN, 2.4),
    linie('M72 12 L8 100 M72 12 L136 100', 1.6, GRAU),
    poly([[72, 8], [132, 98], [12, 98]], ORANGE, 2.8),
    poly([[72, 8], [100, 98], [44, 98]], '#F6B66F', 2.4),
    poly([[72, 40], [92, 98], [52, 98]], DUNKEL, 2.2),
    poly([[72, 40], [62, 98], [52, 98]], '#6B7488', 1.6),
    poly([[72, 40], [82, 98], [92, 98]], '#6B7488', 1.6),
    linie('M72 8 L72 40', 2.4),
    pf('M72 8 L90 14 L72 20 Z', ROT, 1.8),
    glanz('M32 84 L58 40', 3, 0.5),
    linie('M12 98 L2 108 M132 98 L142 108', 2.2, HOLZ_D),
  ])
}

function sandkasten(): Zeichnung {
  return z([0, 0, 140, 116], [
    boden(70, 108, 62),
    poly([[8, 50], [70, 74], [70, 98], [8, 74]], HOLZ, 2.6),
    poly([[132, 50], [70, 74], [70, 98], [132, 74]], HOLZ_D, 2.6),
    linie('M8 62 L70 86 M132 62 L70 86', 1.6, HOLZ_D),
    poly([[70, 26], [132, 50], [70, 74], [8, 50]], '#E8C48C', 2.6),
    poly([[70, 34], [118, 50], [70, 66], [22, 50]], SAND, 2.2),
    pf('M44 52 Q58 40 76 52 Q64 60 44 52 Z', SAND_D, 0),
    // Eimer und Schaufel
    pf('M86 36 L110 36 L106 56 L90 56 Z', BLAU, 2.2),
    el(98, 36, 12, 3.6, '#7FAEE3', 2),
    ...tube('M88 36 Q98 20 108 36', BLAU_D, 1.8),
    ...tube('M38 52 L54 30', ROT, 3.4),
    poly([[28, 54], [40, 48], [44, 56], [34, 60]], ROT, 1.8),
    glanz('M90 40 L92 52', 2, 0.7),
  ])
}

function setzling(): Zeichnung {
  return z([0, 0, 120, 126], [
    ...tube('M60 90 Q56 64 60 40', GRUEN, 5),
    pf('M60 56 Q30 56 20 30 Q52 26 60 56 Z', GRUEN, 2.4),
    linie('M56 52 Q40 46 28 34', 1.4, GRUEN_D),
    pf('M60 46 Q90 44 102 16 Q70 14 60 46 Z', '#B9DC9A', 2.4),
    linie('M64 42 Q82 36 94 22', 1.4, GRUEN_D),
    pf('M8 114 Q16 88 60 86 Q104 88 112 114 Z', '#9A6A44', 2.8),
    ...[[30, 104], [48, 98], [70, 100], [88, 106], [60, 108], [100, 98]].map(([x, y]): Form => punkt(x, y, 2.2, '#7A4F30')),
    glanz('M22 106 Q28 96 40 92', 3, 0.35),
  ])
}

function samenkorn(): Zeichnung {
  const korn = (x: number, y: number, w: number, k: number): Form =>
    g(`translate(${x} ${y}) rotate(${w}) scale(${k})`, [
      pf('M0 -38 C18 -16 28 8 18 28 C10 42 -10 42 -18 28 C-28 8 -18 -16 0 -38 Z', '#8A5A3C', 3),
      pf('M0 -30 C12 -12 20 8 14 26 C6 12 4 -10 0 -30 Z', '#B07D4A', 0),
      glanz('M-9 -2 Q-12 12 -7 24', 4.4, 0.8),
    ])
  return z([0, 0, 124, 112], [
    boden(62, 106, 46),
    korn(22, 74, -30, 0.52),
    korn(102, 70, 32, 0.52),
    korn(62, 62, 2, 0.88),
  ])
}

function blumentopf(): Zeichnung {
  return z([0, 0, 120, 128], [
    boden(60, 123, 44),
    pf('M26 52 L94 52 L86 106 Q85 112 79 112 L41 112 Q35 112 34 106 Z', '#D9774B', 2.8),
    { t: 'path', d: 'M94 52 L86 106 Q85 112 79 112 L68 112 Q80 84 82 52 Z', f: '#B9603A', s: 'none', o: 0.55 },
    el(60, 44, 40, 8, '#6E4F3C', 2.6),
    rr(18, 38, 84, 18, '#E58B5C', 5, 2.8),
    ...[34, 46, 58, 70, 82].map((x): Form => punkt(x, 84, 2.6, 'papier')),
    rr(24, 112, 72, 9, '#C0623A', 4, 2.6),
    glanz('M34 62 L38 100', 3.2, 0.55),
    glanz('M26 46 L60 46', 2.6, 0.55),
  ])
}

function schneckenhaus(): Zeichnung {
  const punkte: string[] = []
  for (let i = 0; i <= 90; i++) {
    const t = (i / 90) * 6 * Math.PI
    const r = 4 + (34 * t) / (6 * Math.PI)
    punkte.push(`${(54 + Math.cos(t) * r).toFixed(1)} ${(50 + Math.sin(t) * r).toFixed(1)}`)
  }
  return z([0, 0, 128, 112], [
    boden(64, 106, 48),
    ...silhouette([{ t: 'circle', cx: 54, cy: 50, r: 44 }, g('translate(96 84) rotate(-32)', [{ t: 'ellipse', cx: 0, cy: 0, rx: 27, ry: 19 }])], '#E7B06A', 5.6),
    { t: 'path', d: `M${punkte.join(' L')}`, f: 'none', s: '#B97A38', w: 3.4 },
    el(98, 84, 17, 10.6, '#F6D6B0', 2, -32),
    pf('M86 76 Q96 70 110 76 Q98 76 90 84 Z', '#9A6330', 0),
    glanz('M24 34 Q32 20 48 14', 4, 0.8),
  ])
}

// =============================================================================
// Bälle und Dinge in der Hand
// =============================================================================

function ball(): Zeichnung {
  const farben = [ROT, 'papier', BLAU, GELB, 'papier', GRUEN]
  const keile: Form[] = farben.map((f, i) => {
    const a1 = ((-90 + 60 * i) * Math.PI) / 180
    const a2 = ((-90 + 60 * (i + 1)) * Math.PI) / 180
    const p = (a: number) => `${(60 + Math.cos(a) * 48).toFixed(1)} ${(58 + Math.sin(a) * 48).toFixed(1)}`
    return pf(`M60 58 L${p(a1)} A48 48 0 0 1 ${p(a2)} Z`, f, 2.2)
  })
  return z([0, 0, 120, 124], [
    boden(60, 114, 40),
    ...keile,
    kr(60, 58, 7, 'papier', 2.2),
    kr(60, 58, 48, 'none', 2.8),
    glanz('M26 38 Q32 26 46 20', 4.2, 0.85),
  ])
}

function basketball(): Zeichnung {
  return z([0, 0, 120, 124], [
    boden(60, 114, 40),
    kr(60, 58, 48, '#EE8A3A', 2.8),
    { t: 'path', d: 'M60 10 L60 106 M12 58 L108 58', f: 'none', s: T, w: 2.4 },
    { t: 'path', d: 'M23 24 Q48 58 23 92 M97 24 Q72 58 97 92', f: 'none', s: T, w: 2.4 },
    glanz('M26 38 Q32 26 46 20', 4.2, 0.6),
    kr(60, 58, 48, 'none', 2.8),
  ])
}

function igelball(): Zeichnung {
  const spitzen: Form[] = Array.from({ length: 22 }, (_, i): Form =>
    g(`translate(60 62) rotate(${(360 / 22) * i})`, [{ t: 'polygon', p: '-6.5,-30 6.5,-30 0,-52', f: T, s: T }]),
  )
  return z([0, 0, 120, 124], [
    boden(60, 117, 38),
    ...silhouette([...spitzen, { t: 'circle', cx: 60, cy: 62, r: 36 }], '#5BAE9F', 5),
    kr(60, 62, 26, '#7CC4B4', 0),
    glanz('M36 50 Q40 38 52 34', 4, 0.8),
  ])
}

function knetball(): Zeichnung {
  return z([0, 0, 120, 124], [
    boden(60, 114, 40),
    pf('M60 12 C92 10 110 34 108 62 C106 90 86 108 60 108 C32 108 12 90 12 62 C12 34 30 14 60 12 Z', '#F2B84B', 2.8),
    el(44, 70, 8.5, 6.5, '#E39F2E', 1.8, -20),
    el(66, 80, 9, 6.5, '#E39F2E', 1.8, 10),
    el(78, 56, 8, 6, '#E39F2E', 1.8, 30),
    { t: 'path', d: 'M108 62 C106 90 86 108 60 108 C80 98 94 80 96 52 C96 40 92 30 86 22 C100 30 109 44 108 62 Z', f: '#E39F2E', s: 'none', o: 0.55 },
    glanz('M26 44 Q30 28 46 22', 4.2, 0.85),
  ])
}

function brille(): Zeichnung {
  return z([0, 0, 152, 84], [
    boden(76, 80, 56),
    ...tube('M16 36 L3 28', ROT, 4),
    ...tube('M136 36 L149 28', ROT, 4),
    kr(42, 42, 27, '#DCEEFA', 0),
    kr(110, 42, 27, '#DCEEFA', 0),
    pf(ringPfad(42, 42, 29, 29, 23, 23), ROT, 2.6),
    pf(ringPfad(110, 42, 29, 29, 23, 23), ROT, 2.6),
    ...tube('M70 38 Q76 28 82 38', ROT, 4.6),
    glanz('M28 32 Q32 24 40 22', 3.4, 0.9),
    glanz('M96 32 Q100 24 108 22', 3.4, 0.9),
  ])
}

function taschentuch(): Zeichnung {
  return z([0, 0, 120, 124], [
    boden(60, 118, 46),
    pf('M26 60 C20 40 28 26 40 12 C46 22 54 18 58 26 C66 36 66 50 62 60 Z', '#F3F8FC', 2.4),
    pf('M50 60 C44 40 54 22 68 6 C76 18 84 14 90 24 C98 36 100 50 96 60 Z', 'papier', 2.6),
    linie('M64 58 Q60 40 68 22 M82 58 Q84 42 80 28', 1.4, '#C9D8E8'),
    rr(12, 54, 96, 58, '#9CC6EC', 9, 2.8),
    rr(12, 72, 96, 18, 'papier', 0, 2.2),
    ...[26, 42, 58, 74, 90].map((x): Form => g(`translate(${x} 81) scale(0.9)`, [pf('M0 5 Q-8 -1 -6 -5 Q-3 -8 0 -4 Q3 -8 6 -5 Q8 -1 0 5 Z', ROSA, 1.3)])),
    glanz('M20 98 L50 98', 2.6, 0.7),
  ])
}

function schliessfach(): Zeichnung {
  const tuer = (x: number, f: string): Form[] => [
    rr(x, 12, 32, 108, f, 3, 2.4),
    linie(`M${x + 6} 22 L${x + 26} 22 M${x + 6} 28 L${x + 26} 28 M${x + 6} 34 L${x + 26} 34`, 2, T),
    rr(x + 22, 66, 5, 18, METALL, 2.4, 1.8),
    kr(x + 9, 76, 2.8, DUNKEL, 0),
    glanz(`M${x + 5} 44 L${x + 5} 108`, 2.6, 0.5),
  ]
  return z([0, 0, 130, 134], [
    boden(65, 129, 54),
    rr(6, 4, 118, 122, '#B7C0CC', 4, 2.8),
    ...tuer(12, '#7FAEE3'),
    ...tuer(49, '#F2B84B'),
    ...tuer(86, '#8DBF7A'),
    rr(4, 124, 122, 5, GRAU, 2, 2),
  ])
}

export const NEU_NATUR: Record<string, () => Zeichnung> = {
  schneeflocke,
  flamme,
  feuer,
  gewitter,
  zelt,
  sandkasten,
  setzling,
  samenkorn,
  blumentopf,
  schneckenhaus,
  ball,
  basketball,
  igelball,
  knetball,
  brille,
  taschentuch,
  schliessfach,
}

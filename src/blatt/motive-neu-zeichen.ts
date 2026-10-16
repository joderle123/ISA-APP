// ---------------------------------------------------------------------------
// Neue farbige Motive, Teil 2: Himmel, Musik, Auszeichnungen, Schreibzeug, Treppe.
// Stil wie motive-alltag.ts (Tinte als Umriss, flache warme Flächen, weiße Glanzlichter,
// jede Fläche mit Kontur, keine Schrift).
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { tube } from './figuren'
import {
  BLAU, BLAU_D, DUNKEL, GELB, GELB_D, GRAU, HOLZ, HOLZ_D, METALL, ROSA, ROT, g, glanz, linie, sternPfad, z,
} from './motive-dinge'
import { boden, drehen, el, funke, kr, pf, poly, rr } from './motive-neu-helfer'

const STERN_GELB = '#F7D152'
const STERN_HELL = '#FBE88F'

// =============================================================================
// Himmel
// =============================================================================

const stern5 = (cx: number, cy: number, R: number, f = STERN_GELB, w = 2.6): Form => pf(sternPfad(cx, cy, R, R * 0.5), f, w)

function stern(): Zeichnung {
  return z([0, 0, 124, 120], [
    boden(62, 114, 34),
    stern5(62, 62, 54, STERN_GELB, 3),
    pf(sternPfad(62, 64, 28, 17), STERN_HELL, 0),
    funke(112, 18, 0.8, 'papier'),
    funke(14, 90, 0.6, 'papier'),
  ])
}

function sterne(): Zeichnung {
  return z([0, 0, 140, 122], [
    stern5(56, 72, 44, STERN_GELB, 2.8),
    stern5(112, 36, 22, '#F8B94D', 2.6),
    stern5(24, 24, 15, STERN_HELL, 2.4),
    funke(116, 96, 0.7, 'papier'),
    funke(14, 82, 0.6, 'papier'),
  ])
}

function mond(): Zeichnung {
  return z([0, 0, 124, 124], [
    // Sichel: große Scheibe minus kleine (Schnittpunkte vorab berechnet)
    pf('M62 14 A48 48 0 1 0 106.3 80.4 A40 40 0 0 1 62 14 Z', '#F8DD74', 3),
    el(40, 82, 7, 5.5, '#F0C75A', 1.8, -20),
    el(32, 56, 4.4, 3.4, '#F0C75A', 1.6, 10),
    el(58, 100, 4.6, 3.6, '#F0C75A', 1.6, 30),
    glanz('M30 36 Q36 26 46 20', 3.8, 0.85),
    stern5(100, 22, 10, STERN_GELB, 1.8),
    stern5(112, 54, 6, STERN_HELL, 1.5),
    funke(80, 104, 0.6, 'papier'),
  ])
}

// =============================================================================
// Musik
// =============================================================================

function noten(): Zeichnung {
  const kopf = (x: number, y: number, f: string): Form[] => [
    el(x, y, 17, 12.5, f, 2.6, -22),
    glanz(`M${x - 9} ${y - 3} Q${x - 6} ${y - 8} ${x} ${y - 9}`, 2.6, 0.7),
  ]
  return z([0, 0, 124, 124], [
    boden(60, 118, 44),
    rr(47.5, 24, 6, 70, '#2D3447', 2, 1.8),
    rr(98.5, 14, 6, 68, '#2D3447', 2, 1.8),
    poly([[49, 24], [104, 12], [104, 34], [49, 46]], BLAU_D, 2.4),
    glanz('M54 28 L98 18', 2.6, 0.5),
    ...kopf(34, 96, BLAU),
    ...kopf(86, 84, BLAU),
    funke(14, 28, 0.7, STERN_GELB),
    funke(116, 62, 0.6, STERN_GELB),
  ])
}

function kopfhoerer(): Zeichnung {
  const band = 'M24 74 C22 18 106 18 104 74'
  const muschel = (x: number, f: string, spieg: boolean): Form[] => [
    rr(x, 62, 26, 46, f, 12, 2.6),
    rr(spieg ? x - 4 : x + 14, 68, 16, 34, DUNKEL, 8, 2.2),
    glanz(`M${x + (spieg ? 9 : 7)} 72 L${x + (spieg ? 9 : 7)} 84`, 3, 0.7),
  ]
  return z([0, 6, 128, 112], [
    boden(64, 112, 46),
    ...tube(band, BLAU_D, 8),
    glanz('M34 50 Q40 32 56 27', 3, 0.55),
    ...muschel(10, ROT, false),
    ...muschel(92, ROT, true),
  ])
}

// =============================================================================
// Treppe, Stift, Auszeichnungen, Ziel
// =============================================================================

function treppe(): Zeichnung {
  const farben = ['#F6D26A', '#F2B65A', '#EE9A4D', '#E5707A']
  const stufen: Form[] = farben.flatMap((f, i): Form[] => {
    const x = 6 + i * 28
    const h = 24 + i * 22
    return [
      rr(x, 112 - h, 28, h, f, 1, 2.4),
      rr(x, 112 - h, 28, 8, 'papier', 1, 2),
    ]
  })
  return z([0, 0, 124, 124], [
    boden(62, 117, 56),
    ...stufen,
    // Fähnchen auf der obersten Stufe
    linie('M100 24 L100 4', 2.6),
    pf('M100 4 L118 10 L100 17 Z', ROT, 1.8),
  ])
}

function stift(): Zeichnung {
  const l = [
    rr(40, 4, 24, 18, ROSA, 6, 2.4),
    rr(40, 22, 24, 12, METALL, 1, 2.4),
    linie('M40 28 L64 28', 1.6, GRAU),
    rr(40, 34, 24, 74, GELB, 1, 2.4),
    { t: 'path', d: 'M40 34 L40 108 L47 108 L47 34 Z', f: GELB_D, s: 'none', o: 0.55 } as Form,
    linie('M52 36 L52 106', 1.6, GELB_D),
    glanz('M44 40 L44 100', 2.6, 0.75),
    pf('M40 108 L64 108 L52 134 Z', '#F1D6A8', 2.4),
    pf('M46.4 122 L57.6 122 L52 134 Z', DUNKEL, 1.6),
  ]
  return z([0, 0, 120, 124], [boden(60, 119, 36), drehen(38, 52, 68, [g('translate(8 -8)', l)])])
}

function pokal(): Zeichnung {
  const gold = '#F4C842'
  const goldD = '#D9A62E'
  return z([-6, 0, 136, 134], [
    boden(62, 129, 38),
    ...tube('M30 22 Q4 22 8 44 Q12 64 38 66', goldD, 7),
    ...tube('M94 22 Q120 22 116 44 Q112 64 86 66', goldD, 7),
    pf('M26 10 L98 10 L94 54 Q90 82 62 86 Q34 82 30 54 Z', gold, 2.8),
    { t: 'path', d: 'M98 10 L94 54 Q90 82 62 86 Q80 70 86 44 L88 10 Z', f: goldD, s: 'none', o: 0.5 },
    rr(26, 6, 72, 9, '#FADC6A', 4, 2.6),
    pf(sternPfad(62, 44, 17, 8), 'papier', 1.8),
    glanz('M36 22 Q36 42 42 56', 4, 0.8),
    rr(54, 86, 16, 18, goldD, 2, 2.4),
    rr(38, 104, 48, 10, gold, 3, 2.4),
    rr(28, 114, 68, 13, HOLZ_D, 4, 2.6),
    glanz('M36 118 L60 118', 2.2, 0.5),
  ])
}

function medaille(): Zeichnung {
  const gold = '#F4C842'
  const goldD = '#D9A62E'
  return z([0, -2, 104, 138], [
    boden(52, 131, 30),
    poly([[20, 4], [42, 4], [70, 62], [48, 66]], ROT, 2.4),
    poly([[84, 4], [62, 4], [34, 62], [56, 66]], BLAU, 2.4),
    linie('M26 8 L52 56', 1.6, 'papier'),
    linie('M78 8 L52 56', 1.6, 'papier'),
    kr(52, 90, 34, gold, 2.8),
    kr(52, 90, 25, '#FADC6A', 2.2),
    pf(sternPfad(52, 90, 17, 8), goldD, 1.8),
    glanz('M30 78 Q34 66 46 60', 4, 0.85),
  ])
}

function zielscheibe(): Zeichnung {
  const ringe: [number, string][] = [[50, ROT], [38, 'papier'], [26, ROT], [14, 'papier'], [6, ROT]]
  return z([0, -6, 132, 126], [
    boden(54, 114, 44),
    ...ringe.map(([r, f]) => kr(56, 62, r, f, 2.4)),
    // Pfeil: Schaft vom Mittelpunkt nach rechts oben, Federn am Ende
    ...tube('M56 62 L106 18', HOLZ, 4.4),
    poly([[98, 28], [112, 14], [117, 21], [108, 27]], BLAU, 1.8),
    poly([[90, 18], [106, 6], [110, 13], [101, 18]], BLAU, 1.8),
    pf('M56 62 L52 70 L60 66 Z', DUNKEL, 1.2),
  ])
}

export const NEU_ZEICHEN: Record<string, () => Zeichnung> = {
  stern,
  sterne,
  mond,
  noten,
  kopfhoerer,
  treppe,
  stift,
  pokal,
  medaille,
  zielscheibe,
}

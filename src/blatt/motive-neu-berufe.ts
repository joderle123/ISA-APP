// ---------------------------------------------------------------------------
// Neue farbige Motive, Teil 8: Einsatzfahrzeuge, Hilfe und Gesundheit, Bewegung und Bühne
// (Feuerwehrauto, Krankenwagen, Lastwagen, Stethoskop, Rollstuhl, Artistin, Notfallkarte,
// Kühlpack, Klangschale, Löschdecke, Küchenwecker, Laufen).
// Stil wie motive-alltag.ts. Wichtig: kein rotes Kreuz auf weißem Grund (geschütztes Zeichen) –
// Erste-Hilfe-Zeichen sind grün (ISO), keine Schrift, keine Marken.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { tube, type Typ } from './figuren'
import { BLAU, DUNKEL, GELB, GRAU, GRUEN, H2, METALL, ORANGE, ROT, ROT_D, erw, figur, g, glanz, kind, linie, schuh, z, zuege } from './motive-dinge'
import { T, boden, drehen, el, funke, kr, pf, punkt, ringPfad, rr } from './motive-neu-helfer'

const REIFEN = '#4A5262'
const HOLZ_KLOEPPEL = '#DDB27A'

function rad(cx: number, cy: number, r: number): Form[] {
  return [kr(cx, cy, r, REIFEN, 2.4), kr(cx, cy, r * 0.5, METALL, 1.8), kr(cx, cy, r * 0.16, DUNKEL, 0)]
}

function feuerwehrauto(): Zeichnung {
  const leiter: Form[] = [
    linie('M16 22 L100 22 M16 30 L100 30', 3, GRAU),
    ...Array.from({ length: 9 }, (_, i): Form => linie(`M${22 + i * 9.5} 22 L${22 + i * 9.5} 30`, 2, GRAU)),
  ]
  return z([0, 0, 172, 104], [
    boden(86, 98, 76),
    ...leiter,
    rr(8, 32, 102, 42, ROT, 5, 2.6),
    rr(8, 52, 102, 8, 'papier', 0, 1.8),
    rr(16, 36, 24, 14, ROT_D, 3, 1.8),
    rr(44, 36, 24, 14, ROT_D, 3, 1.8),
    rr(72, 36, 24, 14, ROT_D, 3, 1.8),
    pf('M110 74 L110 40 Q110 30 120 30 L142 30 Q150 30 156 44 L164 56 Q166 60 166 66 L166 74 Z', ROT, 2.6),
    pf('M118 36 L140 36 Q146 36 150 46 L118 46 Z', '#DCEEFA', 2),
    glanz('M122 40 L130 40', 2.4, 0.9),
    rr(118, 8, 24, 10, BLAU, 4, 2.2),
    rr(124, 18, 12, 12, '#8E9BB0', 2, 2),
    rr(160, 62, 8, 6, GELB, 2, 1.6),
    rr(4, 70, 164, 8, '#8E9BB0', 3, 2.2),
    ...rad(40, 78, 15),
    ...rad(138, 78, 15),
  ])
}

function krankenwagen(): Zeichnung {
  return z([0, 0, 172, 104], [
    boden(86, 98, 76),
    rr(8, 20, 104, 54, 'papier', 6, 2.6),
    pf('M112 74 L112 34 Q112 26 122 26 L144 26 Q152 26 158 42 L164 54 Q166 58 166 64 L166 74 Z', 'papier', 2.6),
    rr(8, 52, 104, 10, '#F29A4D', 0, 1.8),
    pf('M112 52 L166 52 L166 62 L112 62 Z', '#F29A4D', 1.8),
    pf('M120 32 L142 32 Q148 32 152 44 L120 44 Z', '#DCEEFA', 2),
    glanz('M124 36 L132 36', 2.4, 0.9),
    rr(120, 8, 28, 11, BLAU, 4, 2.2),
    glanz('M126 12 L134 12', 2, 0.8),
    // grünes Kreuz auf der Seite
    kr(40, 36, 13, GRUEN, 2.2),
    pf('M37 28 L43 28 L43 33 L48 33 L48 39 L43 39 L43 44 L37 44 L37 39 L32 39 L32 33 L37 33 Z', 'papier', 0),
    rr(62, 28, 38, 8, '#DCEEFA', 2, 1.6),
    rr(160, 62, 8, 6, GELB, 2, 1.6),
    rr(4, 70, 164, 8, '#8E9BB0', 3, 2.2),
    ...rad(40, 78, 15),
    ...rad(138, 78, 15),
  ])
}

function lastwagen(): Zeichnung {
  const kisten: Form[] = [0, 1, 2].flatMap((i) => [rr(16 + i * 30, 26, 28, 24, '#E8B87A', 2, 1.8), linie(`M${16 + i * 30} 38 L${44 + i * 30} 38`, 1.4, '#B07D4A')])
  return z([0, 0, 176, 104], [
    boden(88, 98, 78),
    rr(6, 14, 108, 56, '#F2B84B', 5, 2.6),
    ...kisten,
    rr(16, 52, 88, 12, '#E39F2E', 2, 1.6),
    pf('M114 74 L114 34 Q114 26 124 26 L146 26 Q154 26 160 42 L168 54 Q170 58 170 64 L170 74 Z', BLAU, 2.6),
    pf('M122 32 L144 32 Q150 32 154 44 L122 44 Z', '#DCEEFA', 2),
    glanz('M126 36 L134 36', 2.4, 0.9),
    rr(164, 62, 8, 6, GELB, 2, 1.6),
    rr(4, 70, 168, 8, '#8E9BB0', 3, 2.2),
    ...rad(30, 80, 15),
    ...rad(62, 80, 15),
    ...rad(142, 80, 15),
  ])
}

function stethoskop(): Zeichnung {
  return z([0, 0, 124, 128], [
    boden(62, 124, 38),
    ...tube('M34 18 Q30 54 56 66', '#4F6D99', 4.4),
    ...tube('M90 18 Q94 54 68 66', '#4F6D99', 4.4),
    ...tube('M62 64 Q62 96 78 100', '#4F6D99', 4.4),
    kr(34, 14, 6, METALL, 2.2),
    kr(90, 14, 6, METALL, 2.2),
    rr(56, 58, 12, 12, METALL, 3, 2),
    kr(88, 102, 18, METALL, 2.6),
    kr(88, 102, 12, '#E4EBF2', 1.8),
    kr(88, 102, 4, GRAU, 0),
    glanz('M76 92 Q80 86 88 85', 3, 0.9),
  ])
}

function rollstuhl(): Zeichnung {
  const speichen: Form[] = Array.from({ length: 8 }, (_, i): Form => {
    const a = (i * 45 * Math.PI) / 180
    return linie(`M50 82 L${(50 + Math.cos(a) * 26).toFixed(1)} ${(82 + Math.sin(a) * 26).toFixed(1)}`, 1.3, GRAU)
  })
  return z([0, 0, 146, 124], [
    boden(72, 118, 62),
    // Rückenlehne mit Griff
    ...tube('M34 22 L34 66', DUNKEL, 4),
    ...tube('M22 20 L36 20', DUNKEL, 4),
    rr(30, 28, 12, 38, BLAU, 4, 2.2),
    // Sitz
    rr(32, 62, 76, 12, BLAU, 5, 2.4),
    ...tube('M104 66 L124 100', DUNKEL, 4),
    rr(114, 98, 22, 7, DUNKEL, 3, 2),
    ...tube('M44 74 L100 74', DUNKEL, 4),
    ...tube('M56 40 L96 40 L100 62', DUNKEL, 3.4),
    // kleines Vorderrad
    ...tube('M106 74 L112 100', DUNKEL, 3),
    ...rad(112, 106, 11),
    // großes Rad
    kr(50, 82, 32, 'none', 0),
    pf(ringPfad(50, 82, 34, 34, 28, 28), REIFEN, 2.4),
    ...speichen,
    kr(50, 82, 6, METALL, 2),
    pf(ringPfad(50, 82, 27, 27, 25, 25), METALL, 1.4),
    glanz('M26 70 Q30 60 40 54', 2.6, 0.5),
  ])
}

function notfallkarte(): Zeichnung {
  return z([0, 0, 124, 100], [
    boden(62, 94, 50),
    rr(52, 4, 20, 10, '#CDD5DE', 5, 2.2),
    rr(10, 12, 104, 78, 'papier', 8, 2.8),
    rr(10, 12, 104, 20, GRUEN, 8, 2.6),
    rr(10, 24, 104, 8, GRUEN, 0, 0),
    kr(32, 62, 18, GRUEN, 2.4),
    pf('M28 51 L36 51 L36 58 L43 58 L43 66 L36 66 L36 73 L28 73 L28 66 L21 66 L21 58 L28 58 Z', 'papier', 0),
    linie('M58 48 L102 48', 3.2, GRAU),
    linie('M58 60 L98 60', 3.2, GRAU),
    linie('M58 72 L90 72', 3.2, GRAU),
    linie('M18 22 L50 22', 2.6, 'papier'),
  ])
}

function kuehlpack(): Zeichnung {
  return z([0, 0, 130, 120], [
    boden(65, 114, 48),
    drehen(-14, 65, 58, [
      pf('M18 22 Q18 14 28 14 L100 14 Q112 14 112 24 L112 90 Q112 102 100 102 L28 102 Q18 102 18 92 Z', '#8EC8E8', 2.8),
      linie('M24 40 L106 40 M24 64 L106 64 M24 88 L106 88', 1.6, '#5E9CC8'),
      linie('M46 20 L46 96 M82 20 L82 96', 1.6, '#5E9CC8'),
      rr(26, 14, 78, 10, '#CFE6F7', 3, 2),
      g('translate(65 62) scale(0.5)', [
        { t: 'path', d: 'M0 -30 L0 30 M-26 -15 L26 15 M-26 15 L26 -15', f: 'none', s: 'papier', w: 6 } as Form,
      ]),
      glanz('M26 48 L26 90', 3.2, 0.85),
    ]),
    funke(112, 14, 0.9, 'papier'),
    funke(14, 100, 0.7, 'papier'),
  ])
}

function klangschale(): Zeichnung {
  const gold = '#E5B233'
  return z([0, 0, 146, 116], [
    boden(66, 110, 50),
    // Kissen
    pf('M16 96 Q16 86 28 86 L104 86 Q116 86 116 96 Q116 106 104 106 L28 106 Q16 106 16 96 Z', ROT, 2.6),
    punkt(66, 96, 3.4, ROT_D),
    // Schale
    pf('M12 44 L120 44 Q116 80 90 88 Q78 91 66 91 Q54 91 42 88 Q16 80 12 44 Z', gold, 2.8),
    { t: 'path', d: 'M120 44 Q116 80 90 88 Q78 91 66 91 Q90 80 100 44 Z', f: '#C8921F', s: 'none', o: 0.55 },
    el(66, 44, 54, 9, '#F4C842', 2.6),
    el(66, 45, 46, 5.6, '#9A6A2A', 1.6),
    linie('M24 62 Q66 74 108 62', 1.6, '#C8921F'),
    linie('M32 72 Q66 83 100 72', 1.6, '#C8921F'),
    glanz('M20 52 Q24 68 38 78', 3.6, 0.75),
    // Klöppel
    ...tube('M104 12 L134 40', HOLZ_KLOEPPEL, 5),
    kr(104, 12, 8, '#B07D4A', 2.2),
    linie('M40 28 Q34 20 40 12 M30 32 Q20 20 30 8', 2.2, '#B9C5D6'),
    linie('M92 30 Q98 22 92 14', 2.2, '#B9C5D6'),
  ])
}

function loeschdecke(): Zeichnung {
  return z([0, 0, 124, 132], [
    boden(62, 127, 44),
    ...tube('M30 74 L30 118', DUNKEL, 3),
    ...tube('M94 74 L94 118', DUNKEL, 3),
    rr(24, 114, 12, 8, DUNKEL, 3, 1.8),
    rr(88, 114, 12, 8, DUNKEL, 3, 1.8),
    pf('M30 70 L94 70 L100 110 L24 110 Z', '#D8D2C2', 2.4),
    linie('M32 82 L92 82 M30 96 L94 96', 1.6, '#B9B2A0'),
    rr(14, 8, 96, 66, ROT, 8, 2.8),
    pf('M14 38 Q62 54 110 38 L110 22 Q110 8 98 8 L26 8 Q14 8 14 22 Z', '#E5707A', 2.4),
    g('translate(62 50) scale(1.4)', [pf('M0 -16 C4 -8 12 -4 12 6 C12 13 7 16 0 16 C-7 16 -12 13 -12 6 C-12 0 -8 -4 -6 -9 C-3 -6 -2 -4 0 -3 C2 -8 0 -12 0 -16 Z', 'papier', 0), pf('M0 4 C3 7 5 9 5 11 C5 13 3 14 0 14 C-3 14 -5 13 -5 11 C-5 9 -3 7 0 4 Z', ROT, 0)]),
    glanz('M22 18 L22 30', 3, 0.7),
  ])
}

function kuechenwecker(): Zeichnung {
  const kreisSektor = 'M62 70 L62 38 A32 32 0 0 1 94 70 Z'
  const striche: Form[] = Array.from({ length: 12 }, (_, i): Form => {
    const a = (i * 30 * Math.PI) / 180
    const p = (rr2: number) => `${(62 + Math.sin(a) * rr2).toFixed(1)} ${(70 - Math.cos(a) * rr2).toFixed(1)}`
    return linie(`M${p(33)} L${p(i % 3 === 0 ? 27 : 29.5)}`, i % 3 === 0 ? 2.4 : 1.6)
  })
  return z([0, 0, 124, 128], [
    boden(62, 122, 42),
    rr(48, 12, 28, 12, DUNKEL, 4, 2.2),
    rr(56, 22, 12, 8, DUNKEL, 2, 2),
    kr(62, 70, 46, GELB, 2.8),
    kr(62, 70, 36, 'papier', 2.2),
    pf(kreisSektor, ROT, 1.8),
    ...striche,
    linie('M62 70 L62 38', 2.8),
    kr(62, 70, 4.4, T, 0),
    glanz('M28 48 Q34 34 48 28', 3.8, 0.8),
  ])
}

function laufen(): Zeichnung {
  const t = kind('kurz', '#4A3426', H2, ORANGE, '#4F6D99')
  const figurFormen = figur({
    t,
    gesicht: zuege('lacht'),
    armL: { c: [18, 80], h: [12, 96] },
    armR: { c: [86, 82], h: [80, 62] },
    fussL: [24, 140],
    fussR: [78, 128],
    schatten: false,
    vorne: [schuh(24, 142, true, -30), schuh(80, 130, true, -12)],
  })
  return z([-12, 0, 138, 170], [
    boden(50, 158, 40),
    linie('M-4 62 L-12 62 M-2 78 L-12 78 M0 94 L-8 94', 2.4, '#B9C5D6'),
    g('rotate(8 50 150)', figurFormen),
  ])
}

function artistin(): Zeichnung {
  const t = erw('dutt', '#3A2B22', H2, '#E5707A')
  const kostuem: Typ = { ...t, hose: '#E5707A' }
  const figurFormen = figur({
    t: kostuem,
    gesicht: zuege('lacht'),
    armL: { c: [14, 56], h: [8, 30] },
    armR: { c: [86, 56], h: [92, 30] },
    fussL: [38, 148],
    fussR: [62, 148],
    schatten: false,
    nachTorso: [
      pf('M32 70 L68 70 L66 80 L34 80 Z', GELB, 1.6),
      ...[40, 50, 60].map((x): Form => funke(x, 75, 0.38, 'papier')),
    ],
    nachKopf: [pf('M56 8 Q60 -10 74 -8 Q68 2 62 10 Z', GELB, 1.8), pf('M60 6 Q64 -4 72 -6', 'none', 1.2)],
    vorne: [schuh(38, 150, false), schuh(62, 150, true)],
  })
  return z([-22, -14, 144, 226], [
    boden(50, 208, 50),
    kr(50, 180, 30, '#7FAEE3', 2.8),
    pf('M22 170 Q50 184 78 170', 'none', 2),
    ...[0, 1, 2].map((i): Form => funke(34 + i * 16, 190, 0.5, 'papier')),
    glanz('M30 164 Q34 156 44 152', 3, 0.7),
    ...figurFormen,
  ])
}

export const NEU_BERUFE: Record<string, () => Zeichnung> = {
  feuerwehrauto,
  krankenwagen,
  lastwagen,
  stethoskop,
  rollstuhl,
  notfallkarte,
  kuehlpack,
  klangschale,
  loeschdecke,
  kuechenwecker,
  laufen,
  artistin,
}

// ---------------------------------------------------------------------------
// „Wachsende“ Motive für Kurse: dasselbe Bild in fünf Stufen, jede Stufe ein Teil
// vollständiger (wie `bruecke-1` … `bruecke-5`). Das Bild wächst mit dem Kurs mit.
//   werkzeugkiste-1 … 5  Werkzeugkiste: ein Werkzeug mehr je Stufe (fehlende als gestrichelte Plätze)
//   turm-1 … 5           Turm aus Bausteinen: ein Klotz mehr je Stufe, ganz oben eine Fahne
//   blume-1 … 5          Samen – Keimling – Pflanze mit Knospe – Knospe öffnet sich – Blume
//   rucksack-1 … 5       Rucksack wird gepackt: leer, Buch, Federmappe, Trinkflasche, zu und bereit
//   insel-1 … 5          Insel wird bebaut (für 13–16: ruhige, flache Formen, keine Gesichter):
//                        Insel, Palme, Hütte, Steg mit Boot, Leuchtturm
// Stil wie motive-alltag.ts: Tinte als Umriss, flache warme Flächen, jede Fläche mit Kontur.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { tube } from './figuren'
import {
  BLAU, BRAUN, CREME, DUNKEL, GELB, GELB_D, GRAU, GRUEN, GRUEN_D, HELLGRUEN, HOLZ, METALL, ORANGE, ROT, ROT_D, g, glanz, linie, sternPfad, tropfen, z,
} from './motive-dinge'
import { T, boden, el, kr, pf, poly, punkt, rr } from './motive-neu-helfer'

/** Platzhalter für ein Teil, das noch fehlt (wie die gestrichelten Abschnitte der Brücke). */
const fehlt = (f: Form): Form => ({ ...f, f: 'none', s: GRAU, w: 1.6, dash: '3.5 3' }) as Form

// =============================================================================
// Werkzeugkiste
// =============================================================================

function werkzeugkiste(stufe: number): Zeichnung {
  const KISTE = '#D9574A'
  const xs = [30, 54, 78, 102, 126]
  const werkzeug: ((x: number) => Form[])[] = [
    (x) => [rr(x - 4.5, 24, 9, 52, HOLZ, 3, 2.2), rr(x - 15, 10, 30, 15, '#9AA5B5', 3, 2.4), rr(x - 15, 10, 9, 15, '#7C8899', 3, 2)],
    (x) => [rr(x - 6, 22, 12, 40, GELB, 5, 2.2), rr(x - 6, 22, 12, 10, ROT, 4, 2), linie(`M${x - 3} 40 L${x - 3} 56 M${x + 3} 40 L${x + 3} 56`, 1.4, GELB_D)],
    (x) => [
      g(`rotate(-7 ${x} 74)`, [rr(x - 9, 20, 7, 56, ROT, 3, 2.2)]),
      g(`rotate(7 ${x} 74)`, [rr(x + 2, 20, 7, 56, ROT, 3, 2.2)]),
      rr(x - 5, 16, 10, 12, METALL, 3, 2),
    ],
    (x) => [
      rr(x - 4.5, 30, 9, 46, '#7FAEE3', 4, 2.2),
      g(`translate(${x} 24) scale(0.78)`, [pf('M-7 -18.7 A20 20 0 1 0 7 -18.7 L7 -4 A7 7 0 0 1 -7 -4 Z', METALL, 2.8)]),
    ],
    (x) => [rr(x - 4, 28, 8, 8, DUNKEL, 2, 1.8), rr(x - 14, 34, 28, 34, '#F2B84B', 7, 2.4), kr(x, 50, 7, 'papier', 1.8), linie(`M${x - 14} 62 L${x + 14} 62`, 1.6, '#E39F2E')],
  ]
  const innen: Form[] = [rr(14, 48, 132, 26, '#7E3A33', 4, 2.4)]
  const tools: Form[] = xs.flatMap((x, i): Form[] =>
    i < stufe ? werkzeug[i](x) : [fehlt({ t: 'rect', x: x - 8, y: 28, b: 16, h: 44, rx: 6 } as Form)],
  )
  return z([0, 0, 160, 124], [
    boden(80, 119, 70),
    ...innen,
    ...tools,
    rr(8, 66, 144, 50, KISTE, 6, 2.8),
    rr(8, 66, 144, 13, ROT_D, 5, 2.6),
    rr(66, 76, 28, 12, METALL, 4, 2.2),
    kr(80, 82, 2.4, DUNKEL, 0),
    rr(2, 80, 10, 22, METALL, 3, 2),
    rr(148, 80, 10, 22, METALL, 3, 2),
    linie('M16 88 L16 108', 3, 'papier'),
  ])
}

// =============================================================================
// Turm aus Bausteinen
// =============================================================================

function turm(stufe: number): Zeichnung {
  const bloecke: { w: number; f: string; dx: number; deko: (cx: number, cy: number) => Form[] }[] = [
    { w: 78, f: ROT, dx: 0, deko: (cx, cy) => [kr(cx, cy, 6.4, 'papier', 1.6)] },
    { w: 70, f: GELB, dx: 4, deko: (cx, cy) => [pf(sternPfad(cx, cy, 8, 3.8), 'papier', 1.6)] },
    { w: 62, f: BLAU, dx: -3, deko: (cx, cy) => [poly([[cx - 7, cy + 6], [cx + 7, cy + 6], [cx, cy - 7]], 'papier', 1.6)] },
    { w: 54, f: GRUEN, dx: 3, deko: (cx, cy) => [-9, 0, 9].map((d): Form => punkt(cx + d, cy, 3, 'papier')) },
    { w: 46, f: ORANGE, dx: -2, deko: (cx, cy) => [linie(`M${cx - 10} ${cy + 3} L${cx - 5} ${cy - 3} L${cx} ${cy + 3} L${cx + 5} ${cy - 3} L${cx + 10} ${cy + 3}`, 2.2, 'papier')] },
  ]
  const h = 23
  const out: Form[] = [boden(50, 146, 46)]
  bloecke.slice(0, stufe).forEach((b, i) => {
    const y = 140 - h * (i + 1)
    const cx = 50 + b.dx
    out.push(rr(cx - b.w / 2, y, b.w, h, b.f, 4, 2.6), glanz(`M${cx - b.w / 2 + 6} ${y + 5} L${cx - b.w / 2 + 22} ${y + 5}`, 2.6, 0.7), ...b.deko(cx, y + h / 2 + 1))
  })
  if (stufe >= 5) {
    const top = 140 - h * 5
    out.push(linie(`M48 ${top} L48 ${top - 22}`, 2.8), pf(`M48 ${top - 22} L68 ${top - 16} L48 ${top - 10} Z`, ROT, 2))
  }
  return z([0, -3, 100, 150], out)
}

// =============================================================================
// Blume
// =============================================================================

function blume(stufe: number): Zeichnung {
  const blattL = (y: number, k: number): Form => pf(`M50 ${y} Q${50 - 22 * k} ${y} ${50 - 28 * k} ${y - 16 * k} Q${50 - 8 * k} ${y - 18 * k} 50 ${y} Z`, GRUEN, 2.2)
  const blattR = (y: number, k: number): Form => pf(`M50 ${y} Q${50 + 22 * k} ${y} ${50 + 28 * k} ${y - 16 * k} Q${50 + 8 * k} ${y - 18 * k} 50 ${y} Z`, HELLGRUEN, 2.2)
  const erde: Form[] = [
    pf('M4 142 Q12 120 50 118 Q88 120 96 142 Z', '#9A6A44', 2.8),
    ...[[24, 134], [42, 128], [62, 130], [78, 136], [52, 138]].map(([x, y]): Form => punkt(x, y, 2.2, '#7A4F30')),
  ]
  const out: Form[] = []
  if (stufe === 1) {
    out.push(...erde)
    out.push(g('translate(50 112) rotate(-20)', [pf('M0 -9 C6 -4 8 2 5 7 C3 10 -3 10 -5 7 C-8 2 -6 -4 0 -9 Z', '#8A5A3C', 2), glanz('M-2 -3 Q-3 2 -1 5', 2, 0.8)]))
    out.push(tropfen(30, 84, 1.3), tropfen(72, 70, 1.3), tropfen(58, 96, 1))
    return z([0, 0, 100, 150], out)
  }
  const spitze = stufe === 2 ? 96 : 60
  out.push(...tube(`M50 124 Q47 ${(124 + spitze) / 2} 50 ${spitze}`, GRUEN, 4.6))
  out.push(blattL(stufe === 2 ? 98 : 106, stufe === 2 ? 0.8 : 1.05), blattR(stufe === 2 ? 98 : 92, stufe === 2 ? 0.8 : 1.05))
  if (stufe === 3) {
    out.push(pf('M50 62 C40 56 38 40 50 26 C62 40 60 56 50 62 Z', '#F2A3B5', 2.4))
    out.push(pf('M50 64 Q40 62 40 54 Q46 58 50 56 Q54 58 60 54 Q60 62 50 64 Z', GRUEN, 1.8))
    out.push(glanz('M46 50 Q45 40 50 33', 2.2, 0.7))
  }
  if (stufe === 4) {
    const petal = (w: number): Form => g(`translate(50 56) rotate(${w})`, [pf('M0 0 C-9 -6 -9 -24 0 -34 C9 -24 9 -6 0 0 Z', '#F2A3B5', 2.2)])
    out.push(kr(50, 44, 7, GELB, 2), petal(-34), petal(34), petal(0))
    out.push(pf('M50 64 Q38 62 38 52 Q45 58 50 56 Q55 58 62 52 Q62 62 50 64 Z', GRUEN, 1.8))
  }
  if (stufe === 5) {
    const bl: Form[] = Array.from({ length: 10 }, (_, i): Form => g(`translate(50 38) rotate(${i * 36})`, [{ t: 'ellipse', cx: 0, cy: -21, rx: 8, ry: 15, f: '#F2A3B5', s: T, w: 2.2 }]))
    out.push(...bl, kr(50, 38, 13, GELB, 2.4), punkt(46, 34, 2, GELB_D), punkt(54, 36, 2, GELB_D), punkt(49, 43, 2, GELB_D), punkt(55, 29, 1.8, GELB_D))
  }
  out.push(...erde)
  return z([0, 0, 100, 150], out)
}

// =============================================================================
// Rucksack
// =============================================================================

function rucksack(stufe: number): Zeichnung {
  const KOERPER = '#6FA3DD'
  const DUNKEL_B = '#4F82C0'
  const vorne = 'M22 52 Q60 62 98 52 L102 116 Q102 126 92 126 L28 126 Q18 126 18 116 Z'
  const out: Form[] = [boden(66, 132, 56)]
  // Henkel hinten
  out.push(...tube('M44 36 Q60 14 78 36', DUNKEL_B, 6))
  if (stufe < 5) {
    // Hinterwand und Inhalt
    out.push(pf('M24 48 Q24 32 60 32 Q96 32 96 48 L98 60 L22 60 Z', DUNKEL_B, 2.6), el(60, 50, 37, 9, '#2F4A6E', 2.4))
    if (stufe >= 2) out.push(rr(36, 12, 26, 44, '#7DBE7A', 3, 2.4), linie('M42 12 L42 56', 1.6, '#4F8A45'), rr(58, 12, 4, 44, 'papier', 1, 1.6))
    if (stufe >= 3) out.push(rr(60, 28, 30, 24, GELB, 6, 2.4), linie('M62 38 L88 38', 1.6, GELB_D), rr(70, 44, 10, 5, GELB_D, 2, 1.6))
  }
  if (stufe >= 4) {
    // Trinkflasche in der Seitentasche
    out.push(rr(102, 66, 18, 52, '#CFE6F7', 6, 2.4), rr(104, 58, 14, 10, ROT, 3, 2.2), rr(102, 88, 18, 14, ROT, 2, 1.8), glanz('M106 72 L106 84', 2.6, 0.9))
    out.push(pf('M98 80 L106 78 L106 112 L98 114 Z', DUNKEL_B, 2))
  }
  out.push(pf(vorne, KOERPER, 2.8))
  // Vordertasche
  out.push(rr(32, 80, 56, 36, DUNKEL_B, 6, 2.4), linie('M36 90 L84 90', 1.8, 'papier'), rr(56, 88, 8, 6, METALL, 2, 1.6))
  if (stufe < 5) out.push(glanz('M24 66 L24 108', 3, 0.5))
  if (stufe >= 5) {
    // Klappe zu mit Schnalle, Schlüsselanhänger
    out.push(pf('M18 56 Q22 28 60 28 Q98 28 102 56 Q60 78 18 56 Z', DUNKEL_B, 2.8))
    out.push(rr(52, 52, 16, 22, METALL, 3, 2.2), rr(56, 56, 8, 10, DUNKEL, 2, 1.6))
    out.push(glanz('M32 44 Q38 36 50 34', 3, 0.5))
    out.push(...tube('M92 104 Q100 112 98 122', DUNKEL, 2), pf(sternPfad(98, 128, 7, 3.2), GELB, 1.6))
  }
  return z([0, 0, 132, 146], out)
}

// =============================================================================
// Insel
// =============================================================================

function insel(stufe: number): Zeichnung {
  const WASSER = '#C9E1F2'
  const SAND = '#E9D7A4'
  const GRAS = '#8DB87C'
  const palme = (): Form[] => {
    const blatt = (w: number): Form => g(`translate(92 38) rotate(${w})`, [pf('M0 0 Q14 -16 36 -6 Q20 -6 0 0 Z', GRUEN, 2)])
    return [
      ...tube('M92 80 Q98 58 92 40', '#9B7650', 5),
      blatt(-165), blatt(-130), blatt(-95), blatt(-45), blatt(-8), blatt(25),
      kr(88, 44, 3.6, BRAUN, 1.6),
      kr(96, 45, 3.6, BRAUN, 1.6),
    ]
  }
  const huette = (): Form[] => [
    rr(122, 56, 34, 26, '#F6E7C8', 2, 2.4),
    poly([[117, 58], [139, 36], [161, 58]], '#C9694A', 2.6),
    rr(134, 62, 10, 20, '#8A5A3C', 2, 1.8),
    rr(146, 62, 8, 8, '#DCEEFA', 1, 1.6),
    rr(145, 30, 6, 10, '#B9B2A0', 1, 1.8),
  ]
  const leuchtturm = (): Form[] => [
    ...[
      [[36, 84], [54, 84], [52.6, 66], [37.4, 66]],
      [[37.4, 66], [52.6, 66], [51.4, 50], [38.6, 50]],
      [[38.6, 50], [51.4, 50], [50.6, 38], [39.4, 38]],
    ].map((p, i) => poly(p as [number, number][], i === 1 ? ROT : 'papier', 2.2)),
    rr(34, 33, 22, 6, DUNKEL, 2, 2),
    rr(39, 20, 12, 14, '#FFE98A', 2, 2.2),
    poly([[36, 21], [54, 21], [45, 10]], ROT, 2.2),
    linie('M60 22 L68 18 M60 27 L70 27 M60 32 L68 36', 2.4, GELB_D),
    linie('M30 22 L22 18 M30 27 L20 27 M30 32 L22 36', 2.4, GELB_D),
  ]
  const steg = (): Form[] => [
    rr(150, 96, 48, 5, '#B07D4A', 1, 2.2),
    ...[156, 172, 188].map((x): Form => rr(x, 100, 4, 14, '#8A5A3C', 1, 1.8)),
    ...[158, 174, 190].map((x): Form => linie(`M${x - 5} 112 Q${x} 109 ${x + 5} 112`, 1.6, '#7FA6C4')),
  ]
  const boot = (): Form[] => [
    pf('M96 108 L124 108 L118 120 L102 120 Z', ROT, 2.4),
    linie('M110 108 L110 80', 2.4),
    pf('M112 82 L112 106 L128 106 Z', 'papier', 2),
    pf('M108 86 L108 106 L96 106 Z', CREME, 2),
  ]
  const out: Form[] = [
    rr(0, 100, 200, 40, WASSER, 0, 0),
    pf('M14 106 Q22 78 62 70 Q92 62 128 68 Q168 72 186 106 Z', SAND, 2.8),
    pf('M28 90 Q40 74 66 70 Q96 62 128 68 Q158 72 174 90 Q150 82 124 84 Q92 80 28 90 Z', GRAS, 2.4),
    ...[[56, 84], [150, 82], [112, 78]].map(([x, y]): Form => linie(`M${x} ${y} Q${x + 2} ${y - 6} ${x + 5} ${y - 1} M${x + 3} ${y} Q${x + 7} ${y - 8} ${x + 9} ${y - 1}`, 1.6, GRUEN_D)),
  ]
  if (stufe < 2) out.push(el(72, 90, 7, 4.4, '#B7BEC9', 1.8), el(112, 94, 5, 3.4, '#B7BEC9', 1.6))
  if (stufe >= 5) out.push(...leuchtturm())
  if (stufe >= 2) out.push(...palme())
  if (stufe >= 3) out.push(...huette())
  // vorderes Wasser verdeckt den Inselfuß
  out.push(pf('M0 104 Q12 98 24 104 T48 104 T72 104 T96 104 T120 104 T144 104 T168 104 T192 104 L200 104 L200 140 L0 140 Z', WASSER, 0))
  out.push(linie('M0 104 Q12 98 24 104 T48 104 T72 104 T96 104 T120 104 T144 104 T168 104 T192 104 T216 104', 2.2, '#7FA6C4'))
  out.push(linie('M20 120 Q30 116 40 120 M120 126 Q130 122 140 126', 1.8, '#7FA6C4'))
  if (stufe >= 4) out.push(...steg(), ...boot())
  return z([0, 0, 200, 140], out)
}

export const NEU_WACHSEND: Record<string, () => Zeichnung> = {}
for (let i = 1; i <= 5; i++) {
  NEU_WACHSEND[`werkzeugkiste-${i}`] = () => werkzeugkiste(i)
  NEU_WACHSEND[`turm-${i}`] = () => turm(i)
  NEU_WACHSEND[`blume-${i}`] = () => blume(i)
  NEU_WACHSEND[`rucksack-${i}`] = () => rucksack(i)
  NEU_WACHSEND[`insel-${i}`] = () => insel(i)
}

// ---------------------------------------------------------------------------
// Neue farbige Motive, Teil 3: Gesten (Hand von vorn, Ärmel unten) und Schilder als reine
// Bildzeichen ohne Schrift. Gleicher Strich wie motive-alltag.ts. Die Schilder folgen den
// bekannten Formen: Stopp = rotes Achteck, Verbot = roter Ring mit Balken, Gebot = blauer
// Kreis, Warnung = gelbes Dreieck, Rettung = grünes Rechteck.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'
import { BLAU, CREME, GRUEN, H2, ROT, g, linie, silhouette, z } from './motive-dinge'
import { ohrFormen } from './motive-neu-dinge'
import { T, kr, pf, poly, ringPfad, rr, vieleck } from './motive-neu-helfer'

// =============================================================================
// Hände
// =============================================================================

const HAUT = H2
const HAUT_D = '#C99366'

/** Offene Hand von vorn (Raster 110 × 150): Handfläche, vier Finger, Daumen zur Seite, Ärmel unten. */
function offeneHand(aermel: string): Form[] {
  const fb = 13.6
  const fx = (i: number) => 28 + i * 14.4
  const hoehe = [56, 66, 58, 48]
  const teile: Form[] = [
    { t: 'rect', x: 26, y: 62, b: 60, h: 58, rx: 16 },
    ...hoehe.map((h, i): Form => ({ t: 'rect', x: fx(i), y: 66 - h, b: fb, h: h + 8, rx: fb / 2 })),
    g('rotate(-32 24 106)', [{ t: 'rect', x: 12, y: 68, b: 20, h: 50, rx: 10 }]),
  ]
  const out: Form[] = [...silhouette(teile, HAUT, 4.4)]
  for (let i = 0; i < 3; i++) {
    const bis = 66 - Math.min(hoehe[i], hoehe[i + 1]) + 6
    out.push(linie(`M${(fx(i + 1) - 0.2).toFixed(1)} 68 L${(fx(i + 1) - 0.2).toFixed(1)} ${bis.toFixed(1)}`, 2))
  }
  out.push(linie('M34 98 Q40 92 48 96', 1.6, HAUT_D))
  out.push(rr(18, 116, 74, 32, aermel, 9, 2.6), rr(16, 112, 78, 11, CREME, 4, 2.4))
  return out
}

/** Faust von der Seite (Raster 130 × 128), Ärmel links, vier Finger als Wülste rechts; Daumen nach oben oder quer über den Fingern. */
function faust(aermel: string, daumen: 'hoch' | 'quer' = 'hoch'): Form[] {
  const wuelste: Form[] = [0, 1, 2, 3].map((i): Form => ({ t: 'rect', x: 56, y: 54 + i * 15, b: 58, h: 15, rx: 7.5 }))
  const teile: Form[] = [{ t: 'rect', x: 32, y: 52, b: 80, h: 64, rx: 16 }, ...wuelste]
  if (daumen === 'hoch') teile.push({ t: 'rect', x: 38, y: 6, b: 26, h: 64, rx: 13 })
  const out: Form[] = [...silhouette(teile, HAUT, 4.4)]
  for (const w of wuelste) out.push({ ...w, f: HAUT, s: T, w: 2.2 } as Form)
  if (daumen === 'hoch') out.push(linie('M42 62 Q50 70 62 66', 1.6, HAUT_D))
  else out.push(rr(44, 78, 52, 20, HAUT, 10, 2.4))
  out.push(rr(2, 50, 36, 68, aermel, 9, 2.6), rr(34, 48, 10, 72, CREME, 4, 2.4))
  return out
}

/** Hand von vorn mit gestreckten Fingern und eingerollten Fingerknöcheln (Raster 110 × 150), Daumen quer davor. */
function fingerHand(gestreckt: 1 | 2, aermel: string): Form[] {
  const fb = 13.6
  const fx = (i: number) => 28 + i * 14.4
  const hoehe = [60, 66]
  const knoechel: Form[] = []
  for (let i = gestreckt; i < 4; i++) knoechel.push({ t: 'circle', cx: fx(i) + fb / 2, cy: 70, r: 7.8 })
  const finger: Form[] = Array.from({ length: gestreckt }, (_, i): Form => ({ t: 'rect', x: fx(i), y: 66 - hoehe[i], b: fb, h: hoehe[i] + 10, rx: fb / 2 }))
  const teile: Form[] = [{ t: 'rect', x: 26, y: 68, b: 60, h: 52, rx: 16 }, ...finger, ...knoechel]
  const out: Form[] = [...silhouette(teile, HAUT, 4.4)]
  for (let i = gestreckt; i < 4; i++) out.push(linie(`M${(fx(i) + fb / 2).toFixed(1)} 80 L${(fx(i) + fb / 2).toFixed(1)} 92`, 1.8, HAUT_D))
  if (gestreckt === 2) out.push(linie(`M${(fx(0) + fb + 0.2).toFixed(1)} 72 L${(fx(0) + fb + 0.2).toFixed(1)} 24`, 2))
  out.push(rr(22, 90, 44, 19, HAUT, 9.5, 2.4))
  out.push(rr(18, 116, 74, 32, aermel, 9, 2.6), rr(16, 112, 78, 11, CREME, 4, 2.4))
  return out
}

const FAUST_VB: [number, number, number, number] = [0, 2, 130, 126]

function daumenHoch(): Zeichnung {
  return z(FAUST_VB, faust(GRUEN))
}

function daumenRunter(): Zeichnung {
  return z(FAUST_VB, [g('translate(0 130) scale(1 -1)', faust(ROT))])
}

function faustZu(): Zeichnung {
  return z([-6, 14, 150, 114], [
    ...faust(ROT, 'quer'),
    linie('M120 36 L130 28 M124 52 L136 50 M120 68 L130 74', 3, ROT),
  ])
}

function stoppHand(): Zeichnung {
  return z([-8, -8, 120, 158], [
    ...offeneHand(ROT),
    linie('M98 26 L106 18', 3, ROT),
    linie('M102 42 L110 40', 3, ROT),
    linie('M12 26 L4 18', 3, ROT),
  ])
}

function einFinger(): Zeichnung {
  return z([0, -4, 110, 154], fingerHand(1, BLAU))
}

function zweiFinger(): Zeichnung {
  return z([0, -4, 110, 154], fingerHand(2, BLAU))
}

function ohrZu(): Zeichnung {
  return z([0, 0, 124, 128], [
    g('translate(20 17.6) scale(0.72)', ohrFormen(false)),
    pf(ringPfad(62, 64, 60, 60, 49, 49), ROT, 2.6),
    g('rotate(-45 62 64)', [rr(8, 58, 108, 12, ROT, 3, 2.6)]),
  ])
}

// =============================================================================
// Schilder
// =============================================================================

const WEISS = 'papier'

function schildStopp(): Zeichnung {
  const a = vieleck(50, 50, 47, 8, -67.5)
  const b = vieleck(50, 50, 40, 8, -67.5)
  return z([0, 0, 100, 100], [
    poly(a, ROT, 3),
    { t: 'polygon', p: b.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' '), f: 'none', s: WEISS, w: 2.6 },
  ])
}

function schildVerbot(): Zeichnung {
  return z([0, 0, 100, 100], [
    kr(50, 50, 46, WEISS, 2.6),
    pf(ringPfad(50, 50, 46, 46, 35, 35), ROT, 2.6),
    g('rotate(-45 50 50)', [rr(10, 44, 80, 12, ROT, 2, 2.6)]),
  ])
}

function schildSchutzbrille(): Zeichnung {
  const w = (f: Form): Form => ({ ...f, f: WEISS, s: 'none' }) as Form
  return z([0, 0, 100, 100], [
    kr(50, 50, 46, BLAU, 2.8),
    { t: 'circle', cx: 50, cy: 50, r: 40, f: 'none', s: WEISS, w: 1.6 },
    // Gläser (Wannenform) mit Steg und Band
    w({ t: 'rect', x: 20, y: 38, b: 26, h: 24, rx: 9 }),
    w({ t: 'rect', x: 54, y: 38, b: 26, h: 24, rx: 9 }),
    { t: 'path', d: 'M44 46 Q50 41 56 46', f: 'none', s: WEISS, w: 4 },
    { t: 'path', d: 'M20 46 L12 44 M80 46 L88 44', f: 'none', s: WEISS, w: 4 },
    { t: 'rect', x: 25, y: 43, b: 16, h: 14, rx: 5, f: BLAU, s: 'none', o: 0.35 },
    { t: 'rect', x: 59, y: 43, b: 16, h: 14, rx: 5, f: BLAU, s: 'none', o: 0.35 },
  ])
}

function schildHandschuhe(): Zeichnung {
  const w = (f: Form): Form => ({ ...f, f: WEISS, s: 'none' }) as Form
  const finger = (x: number, top: number): Form => w({ t: 'rect', x, y: top, b: 8, h: 40 - (top - 20), rx: 4 })
  return z([0, 0, 100, 100], [
    kr(50, 50, 46, BLAU, 2.8),
    { t: 'circle', cx: 50, cy: 50, r: 40, f: 'none', s: WEISS, w: 1.6 },
    finger(30, 24),
    finger(39, 18),
    finger(48, 20),
    finger(57, 27),
    w({ t: 'rect', x: 29, y: 40, b: 37, h: 30, rx: 11 }),
    g('rotate(-35 33 60)', [w({ t: 'rect', x: 20, y: 46, b: 9, h: 24, rx: 4.5 })]),
    w({ t: 'rect', x: 31, y: 66, b: 33, h: 16, rx: 3 }),
    { t: 'path', d: 'M32 69 L66 69', f: 'none', s: BLAU, w: 2 },
  ])
}

function schildNotausgang(): Zeichnung {
  const w = (d: string, bw = 5): Form => ({ t: 'path', d, f: 'none', s: WEISS, w: bw })
  return z([0, 0, 100, 100], [
    rr(4, 4, 92, 92, GRUEN, 12, 2.8),
    // Tür mit Öffnung
    { t: 'rect', x: 62, y: 20, b: 30, h: 60, rx: 2, f: WEISS, s: 'none' },
    { t: 'rect', x: 67, y: 25, b: 20, h: 55, f: GRUEN, s: 'none' },
    { t: 'polygon', p: '67,25 57,30 57,80 67,80', f: WEISS, s: 'none' },
    // laufende Person
    { t: 'circle', cx: 38, cy: 29, r: 6.5, f: WEISS, s: 'none' },
    w('M36 40 L42 56 L34 70'),
    w('M42 56 L52 66 L50 78'),
    w('M38 44 L26 48 M38 44 L50 40 L55 34'),
    // Pfeil
    w('M14 84 L40 84 M34 78 L40 84 L34 90', 4),
  ])
}

function schildStrom(): Zeichnung {
  return z([0, 4, 100, 92], [
    pf('M50 10 L93 86 L7 86 Z', '#F7D152', 3.4),
    pf('M57 32 L38 58 L49 58 L43 76 L64 47 L52 47 Z', T, 2),
  ])
}

function schildErsteHilfe(): Zeichnung {
  return z([0, 0, 100, 100], [
    rr(4, 4, 92, 92, GRUEN, 12, 2.8),
    { t: 'path', d: 'M40 18 L60 18 L60 40 L82 40 L82 60 L60 60 L60 82 L40 82 L40 60 L18 60 L18 40 L40 40 Z', f: WEISS, s: 'none' },
  ])
}

function schildRadweg(): Zeichnung {
  const w = (d: string, bw = 5): Form => ({ t: 'path', d, f: 'none', s: WEISS, w: bw })
  return z([0, 0, 100, 100], [
    kr(50, 50, 46, BLAU, 2.8),
    { t: 'circle', cx: 50, cy: 50, r: 40, f: 'none', s: WEISS, w: 1.6 },
    { t: 'circle', cx: 30, cy: 62, r: 12, f: 'none', s: WEISS, w: 4.6 },
    { t: 'circle', cx: 70, cy: 62, r: 12, f: 'none', s: WEISS, w: 4.6 },
    w('M30 62 L43 40 L63 40 L70 62 M43 40 L52 62 L30 62 M63 40 L58 33 L66 33', 4.4),
    w('M40 34 L48 34 M44 34 L43 40', 4.4),
    { t: 'circle', cx: 52, cy: 62, r: 2.4, f: WEISS, s: 'none' },
  ])
}

export const NEU_GESTEN: Record<string, () => Zeichnung> = {
  'daumen-hoch': daumenHoch,
  'daumen-runter': daumenRunter,
  'stopp-hand': stoppHand,
  'geste-daumen': daumenHoch,
  faust: faustZu,
  'geste-ein-finger': einFinger,
  'geste-zwei-finger': zweiFinger,
  'geste-ohr-zu': ohrZu,
  'schild-stopp': schildStopp,
  'schild-verbot': schildVerbot,
  'schild-schutzbrille': schildSchutzbrille,
  'schild-handschuhe': schildHandschuhe,
  'schild-notausgang': schildNotausgang,
  'schild-strom': schildStrom,
  'schild-erste-hilfe': schildErsteHilfe,
  'schild-radweg': schildRadweg,
}

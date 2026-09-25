// ---------------------------------------------------------------------------
// Größere Zeichnungen (Motive) im selben Strich wie Piktogramme und Gesichter.
// Einige Bausteine (Vulkan, Eisberg, Hand, Körper …) legen Text darüber; die
// Maße hier sind deshalb fest und in den Bausteinen wiederverwendet.
// ---------------------------------------------------------------------------

import type { Form, Zeichnung } from './zeichnung'

const T = 'tinte'
const WASSER = '#E3EEF7'
const EIS_UNTEN = '#CFE1EF'
const GRUEN = '#8DB87C'
const GRUEN_HELL = '#C4DDB6'
const ROT = '#D2574B'
const GELB = '#EFC44A'
const AMPELGRUEN = '#4FA36C'
const LAVA = '#DE6A3F'
const FELS = '#EFE7DE'

/** Umriss-Technik: erst alle Formen dick umranden, dann ohne Rand füllen →
 *  eine saubere Gesamtsilhouette ohne innere Linien. */
function silhouette(formen: Form[], fuellung: string, strich = 5): Form[] {
  const mit = (f: Form, extra: { s: string; w?: number; f: string }): Form =>
    f.t === 'g' ? { ...f, formen: f.formen.map((x) => mit(x, extra)) } : ({ ...f, ...extra } as Form)
  return [...formen.map((f) => mit(f, { s: T, w: strich, f: T })), ...formen.map((f) => mit(f, { s: 'none', f: fuellung }))]
}

function kapsel(x: number, y: number, breite: number, laenge: number, winkel: number): Form {
  return { t: 'g', tf: `translate(${x} ${y}) rotate(${winkel})`, formen: [{ t: 'rect', x: -breite / 2, y: -laenge, b: breite, h: laenge + breite / 2, rx: breite / 2 }] }
}

// --- Vulkan ----------------------------------------------------------------------
export const VULKAN = { vb: [0, 0, 200, 170] as [number, number, number, number], krater: 50, mitte: 100, fuss: 164 }

function vulkan(): Zeichnung {
  return {
    vb: VULKAN.vb,
    w: 2.4,
    formen: [
      { t: 'path', d: 'M84 40 Q76 30 84 22 Q82 10 94 9 Q100 0 110 7 Q122 6 120 20 Q128 28 118 40 Z', f: 'hellgrau', s: T, w: 2.2 },
      { t: 'circle', cx: 72, cy: 22, r: 3.2, f: LAVA, s: 'none' },
      { t: 'circle', cx: 132, cy: 16, r: 2.6, f: LAVA, s: 'none' },
      { t: 'circle', cx: 64, cy: 38, r: 2.2, f: LAVA, s: 'none' },
      { t: 'circle', cx: 140, cy: 34, r: 3, f: LAVA, s: 'none' },
      { t: 'path', d: 'M14 164 L78 52 Q84 44 92 49 Q100 54 108 49 Q116 44 122 52 L186 164 Z', f: FELS, s: T, w: 2.6 },
      { t: 'path', d: 'M79 52 Q86 58 92 52 Q100 60 108 52 Q114 58 121 52 Q126 64 118 72 Q113 66 111 80 Q108 92 104 78 Q101 68 97 82 Q93 94 89 76 Q86 66 81 72 Q75 64 79 52 Z', f: LAVA, s: T, w: 1.6 },
      { t: 'path', d: 'M40 118 Q52 112 58 120', s: T, f: 'none', w: 1.6, o: 0.5 },
      { t: 'path', d: 'M142 128 Q150 120 160 126', s: T, f: 'none', w: 1.6, o: 0.5 },
      { t: 'line', x1: 4, y1: 164, x2: 196, y2: 164, s: T, w: 2.6 },
    ],
  }
}

// --- Eisberg ------------------------------------------------------------------------
export const EISBERG = { vb: [0, 0, 200, 210] as [number, number, number, number], wasser: 62 }

function eisberg(): Zeichnung {
  const wellen = Array.from({ length: 10 }, (_, i) => `Q${i * 20 + 5} ${58} ${i * 20 + 10} ${62} T${i * 20 + 20} ${62}`).join(' ')
  return {
    vb: EISBERG.vb,
    w: 2.4,
    formen: [
      { t: 'rect', x: 0, y: 62, b: 200, h: 148, f: WASSER, s: 'none' },
      { t: 'path', d: 'M52 62 L136 62 L166 112 L154 168 L114 202 L62 192 L34 142 Z', f: EIS_UNTEN, s: T, w: 2.2 },
      { t: 'path', d: 'M70 62 L88 24 L98 32 L110 12 L128 44 L136 62 Z', f: 'papier', s: T, w: 2.4 },
      { t: 'path', d: 'M96 34 L104 22 L110 30', s: T, f: 'none', w: 1.6, o: 0.6 },
      { t: 'path', d: `M0 62 ${wellen}`, s: '#7FA6C4', f: 'none', w: 2 },
      { t: 'path', d: 'M20 96 Q26 92 32 96', s: '#7FA6C4', f: 'none', w: 1.6 },
      { t: 'path', d: 'M172 150 Q178 146 184 150', s: '#7FA6C4', f: 'none', w: 1.6 },
    ],
  }
}

// --- Batterie ------------------------------------------------------------------------
function batterie(stand = 3): Zeichnung {
  const seg: Form[] = []
  for (let i = 0; i < 5; i++)
    seg.push({ t: 'rect', x: 10 + i * 22.6, y: 11, b: 18.5, h: 42, rx: 4, f: i < stand ? 'mittel' : 'papier', s: i < stand ? 'tief' : 'grau', w: 1.6, dash: i < stand ? undefined : '3 2.5' })
  return {
    vb: [0, 0, 146, 64],
    w: 2.4,
    formen: [
      { t: 'rect', x: 2, y: 3, b: 128, h: 58, rx: 11, f: 'papier', s: T, w: 2.6 },
      { t: 'rect', x: 130, y: 20, b: 11, h: 24, rx: 4, f: T, s: T, w: 2 },
      ...seg,
    ],
  }
}

// --- Ampel ----------------------------------------------------------------------------
function ampel(): Zeichnung {
  return {
    vb: [0, 0, 60, 150],
    formen: [
      { t: 'rect', x: 4, y: 2, b: 52, h: 146, rx: 16, f: '#3A4152', s: T, w: 2.4 },
      { t: 'circle', cx: 30, cy: 28, r: 17, f: ROT, s: T, w: 2 },
      { t: 'circle', cx: 30, cy: 75, r: 17, f: GELB, s: T, w: 2 },
      { t: 'circle', cx: 30, cy: 122, r: 17, f: AMPELGRUEN, s: T, w: 2 },
      { t: 'path', d: 'M20 22 Q24 16 30 16', s: 'papier', f: 'none', w: 2.4, o: 0.7 },
    ],
  }
}

// --- Waage --------------------------------------------------------------------------------
function waage(): Zeichnung {
  const schale = (x: number): Form[] => [
    { t: 'line', x1: x, y1: 30, x2: x - 22, y2: 78, s: T, w: 1.6 },
    { t: 'line', x1: x, y1: 30, x2: x + 22, y2: 78, s: T, w: 1.6 },
    { t: 'path', d: `M${x - 28} 78 Q${x} 98 ${x + 28} 78 Z`, f: 'mittel', s: T, w: 2.2 },
  ]
  return {
    vb: [0, 0, 220, 140],
    formen: [
      { t: 'path', d: 'M88 136 L132 136 L122 124 L98 124 Z', f: 'zart', s: T, w: 2.2 },
      { t: 'line', x1: 110, y1: 124, x2: 110, y2: 30, s: T, w: 3 },
      { t: 'line', x1: 36, y1: 30, x2: 184, y2: 30, s: T, w: 3 },
      ...schale(36),
      ...schale(184),
      { t: 'circle', cx: 110, cy: 28, r: 6, f: 'tief', s: T, w: 2 },
    ],
  }
}

// --- Hand ------------------------------------------------------------------------------------
/** Finger: [x, y, Länge, Winkel] – Daumen, Zeige-, Mittel-, Ring-, kleiner Finger */
export const HAND_FINGER: [number, number, number, number][] = [
  [64, 152, 62, -52],
  [76, 122, 84, -16],
  [100, 116, 94, -3],
  [123, 120, 86, 9],
  [142, 134, 64, 22],
]
export const HAND = { vb: [0, 0, 200, 236] as [number, number, number, number], breite: 27 }

/** Spitze eines Fingers in viewBox-Koordinaten. */
export function fingerSpitze(i: number): [number, number] {
  const [x, y, l, w] = HAND_FINGER[i]
  const r = (w * Math.PI) / 180
  const d = l - HAND.breite / 2
  return [x + Math.sin(r) * d, y - Math.cos(r) * d]
}

function hand(): Zeichnung {
  const teile: Form[] = [
    { t: 'rect', x: 56, y: 112, b: 100, h: 112, rx: 42 },
    ...HAND_FINGER.map(([x, y, l, w]) => kapsel(x, y, HAND.breite, l, w)),
  ]
  return { vb: HAND.vb, formen: [...silhouette(teile, 'zart', 5)] }
}

// --- Körper -------------------------------------------------------------------------------------
export const KOERPER = { vb: [0, 0, 140, 300] as [number, number, number, number] }

function koerper(): Zeichnung {
  const teile: Form[] = [
    { t: 'circle', cx: 70, cy: 34, r: 25 },
    { t: 'rect', x: 62, y: 52, b: 16, h: 18, rx: 4 },
    { t: 'rect', x: 38, y: 64, b: 64, h: 104, rx: 22 },
    kapsel(42, 76, 17, 98, 192),
    kapsel(98, 76, 17, 98, 168),
    { t: 'circle', cx: 22, cy: 172, r: 10 },
    { t: 'circle', cx: 118, cy: 172, r: 10 },
    { t: 'g', tf: 'translate(56 158) rotate(180)', formen: [{ t: 'rect', x: -10.5, y: -120, b: 21, h: 130, rx: 10.5 }] },
    { t: 'g', tf: 'translate(84 158) rotate(180)', formen: [{ t: 'rect', x: -10.5, y: -120, b: 21, h: 130, rx: 10.5 }] },
    { t: 'ellipse', cx: 50, cy: 284, rx: 16, ry: 9 },
    { t: 'ellipse', cx: 90, cy: 284, rx: 16, ry: 9 },
  ]
  return { vb: KOERPER.vb, formen: silhouette(teile, 'papier', 4.4) }
}

// --- Schildkröte (Schildkröten-Trick) -------------------------------------------------------------
function schildkroete(rein = false): Zeichnung {
  const beine: Form[] = rein
    ? []
    : [
        { t: 'rect', x: 38, y: 72, b: 18, h: 22, rx: 8, f: GRUEN_HELL, s: T, w: 2.2 },
        { t: 'rect', x: 104, y: 72, b: 18, h: 22, rx: 8, f: GRUEN_HELL, s: T, w: 2.2 },
        { t: 'path', d: 'M26 70 L14 74 L26 78 Z', f: GRUEN_HELL, s: T, w: 2 },
        { t: 'circle', cx: 140, cy: 60, r: 16, f: GRUEN_HELL, s: T, w: 2.4 },
        { t: 'circle', cx: 145, cy: 55, r: 2.6, f: T, s: 'none' },
        { t: 'path', d: 'M140 66 Q146 70 151 65', s: T, f: 'none', w: 2 },
      ]
  return {
    vb: [0, 0, 170, 104],
    formen: [
      { t: 'ellipse', cx: 82, cy: 97, rx: 64, ry: 4, f: 'hellgrau', s: 'none' },
      ...beine,
      { t: 'path', d: 'M24 80 Q24 18 82 18 Q138 18 138 80 Z', f: GRUEN, s: T, w: 2.6 },
      { t: 'path', d: 'M62 30 L102 30 L112 54 L94 74 L70 74 L52 54 Z', f: 'none', s: '#4F7A43', w: 2 },
      { t: 'path', d: 'M52 54 L28 60 M112 54 L134 60 M62 30 L52 22 M102 30 L112 22 M70 74 L66 80 M94 74 L98 80', s: '#4F7A43', f: 'none', w: 2 },
      { t: 'rect', x: 20, y: 76, b: 122, h: 9, rx: 4.5, f: '#6E9A60', s: T, w: 2.2 },
    ],
  }
}

// --- Baum mit Wurzeln ----------------------------------------------------------------------------
export const BAUM = { vb: [0, 0, 220, 250] as [number, number, number, number], boden: 176 }

function baum(): Zeichnung {
  const krone: Form[] = [
    { t: 'circle', cx: 110, cy: 62, r: 46 },
    { t: 'circle', cx: 66, cy: 82, r: 34 },
    { t: 'circle', cx: 154, cy: 82, r: 34 },
    { t: 'circle', cx: 84, cy: 40, r: 30 },
    { t: 'circle', cx: 138, cy: 42, r: 30 },
    { t: 'circle', cx: 110, cy: 100, r: 34 },
  ]
  return {
    vb: BAUM.vb,
    formen: [
      { t: 'path', d: 'M96 176 Q98 140 100 120 L120 120 Q122 140 124 176 Z', f: '#B08A64', s: T, w: 2.4 },
      ...silhouette(krone, GRUEN_HELL, 4.4),
      { t: 'path', d: 'M108 118 Q100 104 88 100 M112 116 Q122 100 134 98', s: T, f: 'none', w: 2 },
      { t: 'line', x1: 8, y1: 176, x2: 212, y2: 176, s: T, w: 2.4 },
      { t: 'path', d: 'M102 176 Q90 196 62 204 Q44 208 32 226', s: '#8A6A4A', f: 'none', w: 3 },
      { t: 'path', d: 'M106 176 Q100 208 88 236', s: '#8A6A4A', f: 'none', w: 3 },
      { t: 'path', d: 'M114 176 Q122 206 136 234', s: '#8A6A4A', f: 'none', w: 3 },
      { t: 'path', d: 'M118 176 Q134 196 160 202 Q178 206 190 224', s: '#8A6A4A', f: 'none', w: 3 },
      { t: 'path', d: 'M72 202 Q66 214 58 218 M150 200 Q154 214 164 220', s: '#8A6A4A', f: 'none', w: 2 },
    ],
  }
}

// --- Berg mit Fahne (Ziel) ------------------------------------------------------------------------
function berg(): Zeichnung {
  return {
    vb: [0, 0, 220, 160],
    formen: [
      { t: 'path', d: 'M6 154 L84 44 L110 70 L138 30 L214 154 Z', f: 'zart', s: T, w: 2.6 },
      { t: 'path', d: 'M122 56 L138 30 L152 54 Q145 50 138 56 Q130 50 122 56 Z', f: 'papier', s: T, w: 2 },
      { t: 'line', x1: 138, y1: 30, x2: 138, y2: 6, s: T, w: 2.4 },
      { t: 'path', d: 'M138 6 L160 12 L138 19 Z', f: 'tief', s: T, w: 2 },
      { t: 'path', d: 'M36 150 Q70 132 60 118 Q52 104 86 96 Q118 90 104 76 Q96 64 126 58', s: 'tief', f: 'none', w: 2.4, dash: '5 4' },
      { t: 'line', x1: 2, y1: 154, x2: 218, y2: 154, s: T, w: 2.6 },
    ],
  }
}

// --- Insel (Ruhe-Ort) -----------------------------------------------------------------------------
function insel(): Zeichnung {
  return {
    vb: [0, 0, 220, 140],
    formen: [
      { t: 'circle', cx: 176, cy: 34, r: 16, f: GELB, s: T, w: 2.2 },
      { t: 'path', d: 'M40 112 Q70 78 110 80 Q154 82 180 112 Z', f: '#F1DFAE', s: T, w: 2.4 },
      { t: 'path', d: 'M104 82 Q100 58 108 30', s: '#9B7650', f: 'none', w: 5 },
      { t: 'path', d: 'M108 30 Q88 20 70 32 Q88 28 100 36 Z', f: GRUEN, s: T, w: 2 },
      { t: 'path', d: 'M108 30 Q126 16 146 26 Q128 26 116 36 Z', f: GRUEN, s: T, w: 2 },
      { t: 'path', d: 'M108 30 Q100 10 84 8 Q98 18 102 32 Z', f: GRUEN, s: T, w: 2 },
      { t: 'path', d: 'M108 30 Q124 40 128 58 Q118 44 106 38 Z', f: GRUEN, s: T, w: 2 },
      { t: 'rect', x: 0, y: 110, b: 220, h: 30, f: WASSER, s: 'none' },
      { t: 'path', d: 'M0 112 Q14 106 28 112 T56 112 T84 112 T112 112 T140 112 T168 112 T196 112 T224 112', s: '#7FA6C4', f: 'none', w: 2.2 },
      { t: 'path', d: 'M30 128 Q38 124 46 128 M150 130 Q158 126 166 130', s: '#7FA6C4', f: 'none', w: 1.8 },
    ],
  }
}

// --- Stoppschild ------------------------------------------------------------------------------------
function stopp(): Zeichnung {
  const r = 46
  const p = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 8) * (2 * i + 1)
    return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
  const hand: Form[] = [
    { t: 'path', d: 'M38 66 L38 40 Q38 36 42 36 Q46 36 46 40 L46 52 L46 32 Q46 28 50 28 Q54 28 54 32 L54 52 L54 34 Q54 30 58 30 Q62 30 62 34 L62 54 L62 42 Q62 38 66 38 Q70 38 70 42 L70 64 Q70 80 54 80 Q44 80 38 72 L30 60 Q28 56 32 54 Q35 53 38 57 Z', f: 'papier', s: 'papier', w: 1 },
  ]
  return { vb: [0, 0, 100, 100], formen: [{ t: 'polygon', p, f: ROT, s: T, w: 2.6 }, ...hand] }
}

// --- Brücke ----------------------------------------------------------------------------------------
function bruecke(): Zeichnung {
  const planken: Form[] = []
  for (let i = 0; i < 9; i++) planken.push({ t: 'line', x1: 54 + i * 14, y1: 62 + Math.sin((i / 8) * Math.PI) * -10, x2: 54 + i * 14, y2: 74 + Math.sin((i / 8) * Math.PI) * -10, s: T, w: 1.6 })
  return {
    vb: [0, 0, 220, 120],
    formen: [
      { t: 'path', d: 'M0 70 L48 70 L56 120 L0 120 Z', f: 'zart', s: T, w: 2.4 },
      { t: 'path', d: 'M220 70 L172 70 L164 120 L220 120 Z', f: 'zart', s: T, w: 2.4 },
      { t: 'path', d: 'M48 70 Q110 42 172 70 L172 80 Q110 52 48 80 Z', f: '#D9B98F', s: T, w: 2.6 },
      ...planken,
      { t: 'path', d: 'M48 48 Q110 20 172 48', s: T, f: 'none', w: 2.6 },
      { t: 'line', x1: 48, y1: 48, x2: 48, y2: 72, s: T, w: 2.6 },
      { t: 'line', x1: 172, y1: 48, x2: 172, y2: 72, s: T, w: 2.6 },
      { t: 'line', x1: 79, y1: 37, x2: 79, y2: 60, s: T, w: 1.8 },
      { t: 'line', x1: 110, y1: 34, x2: 110, y2: 56, s: T, w: 1.8 },
      { t: 'line', x1: 141, y1: 37, x2: 141, y2: 60, s: T, w: 1.8 },
    ],
  }
}

// --- Ballon -------------------------------------------------------------------------------------------
function ballon(): Zeichnung {
  return {
    vb: [0, 0, 100, 150],
    formen: [
      { t: 'path', d: 'M50 102 Q46 112 52 120 Q58 128 50 140', s: T, f: 'none', w: 2 },
      { t: 'path', d: 'M50 100 Q14 88 14 50 Q14 12 50 12 Q86 12 86 50 Q86 88 50 100 Z', f: 'mittel', s: T, w: 2.6 },
      { t: 'path', d: 'M44 100 L56 100 L52 108 L48 108 Z', f: 'tief', s: T, w: 2 },
      { t: 'path', d: 'M30 36 Q34 24 46 22', s: 'papier', f: 'none', w: 4, o: 0.9 },
    ],
  }
}

// --- Werkzeugkiste ---------------------------------------------------------------------------------------
function werkzeugkiste(): Zeichnung {
  return {
    vb: [0, 0, 200, 130],
    formen: [
      { t: 'path', d: 'M72 40 L72 22 Q72 14 80 14 L120 14 Q128 14 128 22 L128 40', s: T, f: 'none', w: 5 },
      { t: 'rect', x: 14, y: 40, b: 172, h: 84, rx: 10, f: 'tief', s: T, w: 2.6 },
      { t: 'rect', x: 14, y: 40, b: 172, h: 24, rx: 10, f: 'mittel', s: T, w: 2.6 },
      { t: 'rect', x: 88, y: 56, b: 24, h: 16, rx: 3, f: 'papier', s: T, w: 2.2 },
    ],
  }
}

// --- Haus (sicherer Ort) ------------------------------------------------------------------------------------
function haus(): Zeichnung {
  return {
    vb: [0, 0, 200, 170],
    formen: [
      { t: 'path', d: 'M30 78 L100 16 L170 78', s: T, f: 'none', w: 3 },
      { t: 'path', d: 'M46 70 L46 160 L154 160 L154 70 L100 24 Z', f: 'zart', s: T, w: 2.6 },
      { t: 'rect', x: 86, y: 108, b: 28, h: 52, rx: 3, f: 'mittel', s: T, w: 2.4 },
      { t: 'circle', cx: 107, cy: 136, r: 2.2, f: T, s: 'none' },
      { t: 'rect', x: 58, y: 88, b: 20, h: 20, rx: 2, f: 'papier', s: T, w: 2.2 },
      { t: 'rect', x: 122, y: 88, b: 20, h: 20, rx: 2, f: 'papier', s: T, w: 2.2 },
      { t: 'path', d: 'M100 58 Q92 48 86 56 Q82 64 100 76 Q118 64 114 56 Q108 48 100 58 Z', f: 'tief', s: T, w: 2 },
      { t: 'line', x1: 16, y1: 160, x2: 184, y2: 160, s: T, w: 2.6 },
    ],
  }
}

// --- Wasserglas ---------------------------------------------------------------------------------------
function wasserglas(): Zeichnung {
  return {
    vb: [0, 0, 80, 100],
    formen: [
      { t: 'path', d: 'M18 40 L62 40 L57 92 Q56 96 52 96 L28 96 Q24 96 23 92 Z', f: '#CFE3F3', s: 'none' },
      { t: 'path', d: 'M12 8 L68 8 L58 92 Q57 97 52 97 L28 97 Q23 97 22 92 Z', f: 'none', s: T, w: 3 },
      { t: 'path', d: 'M18 40 Q30 36 40 40 Q50 44 62 40', f: 'none', s: '#7FA6C4', w: 2.4 },
      { t: 'path', d: 'M24 18 L28 80', f: 'none', s: 'papier', w: 3, o: 0.9 },
    ],
  }
}

const MOTIVE: Record<string, () => Zeichnung> = {
  wasserglas,
  vulkan,
  eisberg,
  batterie: () => batterie(3),
  'batterie-leer': () => batterie(1),
  'batterie-voll': () => batterie(5),
  ampel,
  waage,
  hand,
  koerper,
  schildkroete: () => schildkroete(false),
  'schildkroete-panzer': () => schildkroete(true),
  baum,
  berg,
  insel,
  stopp,
  bruecke,
  ballon,
  werkzeugkiste,
  haus,
}

export const MOTIV_NAMEN = Object.keys(MOTIVE)

export function motivZeichnung(name: string): Zeichnung {
  const m = MOTIVE[name]
  return m ? m() : { vb: [0, 0, 24, 24], formen: [] }
}

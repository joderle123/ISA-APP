// ---------------------------------------------------------------------------
// Anziehpuppe (Spielschule): ein Kind in Unterwäsche und Kleidungsstücke, die
// genau darauf passen. Alles im Raster der Figuren (100 × 160, Füße auf y ≈ 152),
// Kopf und Haare wie bei den Figuren (src/blatt/figuren.ts).
// ---------------------------------------------------------------------------

import type { Kleidungsstueck } from './typen'
import type { Form, Zeichnung } from './zeichnung'
import { FIGUREN, haarHinten, haarVorne, masse } from './figuren'
import { gesichtsZuege } from './gesichter'

const T = '#1B2233'

export const KLEIDER: Kleidungsstueck[] = ['muetze', 'sonnenhut', 'schal', 'handschuhe', 'jacke', 'regenjacke', 'pulli', 'tshirt', 'kleid', 'hose', 'kurzehose', 'stiefel', 'gummistiefel', 'sandalen']

/** Linie als „Rohr“ mit Rand (wie Arme und Beine der Figuren). */
function rohr(x1: number, y1: number, x2: number, y2: number, dicke: number, farbe: string): Form[] {
  const d = `M${x1} ${y1} L${x2} ${y2}`
  return [
    { t: 'path', d, s: T, f: 'none', w: dicke + 2.6 },
    { t: 'path', d, s: farbe, f: 'none', w: dicke },
  ]
}

const ARM = { l: [33, 68, 19, 103] as const, r: [67, 68, 81, 103] as const }
const BEIN = { l: [42, 108, 41, 146] as const, r: [58, 108, 59, 146] as const }

/** Das Kind zum Anziehen: Haut und Haare wie die Figur, Unterhemd und Unterhose, barfuß, Arme leicht abgespreizt. */
export function puppeZeichnung(figur = 'mia'): Zeichnung {
  const f = FIGUREN[figur] ?? FIGUREN.mia
  // Kappe gehört zur Kleidung: die Puppe hat darunter kurze Haare (Mütze und Hut passen sonst nicht)
  const t = f.haar === 'kappe' ? { ...f, haar: 'kurz' as const } : f
  const m = masse('kind')
  const H = t.haut
  const formen: Form[] = [{ t: 'ellipse', cx: 50, cy: 155, rx: 30, ry: 3.2, f: 'hellgrau', s: 'none' }]
  // Beine und Füße
  for (const s of ['l', 'r'] as const) {
    const [a, b, c, d] = BEIN[s]
    formen.push(...rohr(a, b, c, d, 10.5, H))
    formen.push({ t: 'ellipse', cx: s === 'l' ? 36 : 64, cy: 150, rx: 7.5, ry: 3.8, f: H, s: T, w: 2 })
  }
  formen.push(...haarHinten(t, m))
  formen.push({ t: 'rect', x: 45, y: 54, b: 10, h: 12, f: H, s: T, w: 2 })
  // Arme
  for (const s of ['l', 'r'] as const) {
    const [a, b, c, d] = ARM[s]
    formen.push(...rohr(a, b, c, d, 8.5, H))
    formen.push({ t: 'circle', cx: c, cy: d + 2, r: 5.5, f: H, s: T, w: 2.2 })
  }
  // Unterhemd und Unterhose
  formen.push({ t: 'path', d: 'M31 69 Q31 63 38 62 L62 62 Q69 63 69 69 L70 106 L30 106 Z', f: '#EEF1F5', s: T, w: 2.2 })
  formen.push({ t: 'path', d: 'M44 62 Q50 70 56 62', f: H, s: T, w: 1.8 })
  formen.push({ t: 'path', d: 'M30 102 L70 102 L70 112 Q66 118 58 118 L50 114 L42 118 Q34 118 30 112 Z', f: '#DCE3EE', s: T, w: 2.2 })
  // Kopf
  formen.push({ t: 'circle', cx: 27, cy: 38, r: 4.6, f: H, s: T, w: 2 })
  formen.push({ t: 'circle', cx: 73, cy: 38, r: 4.6, f: H, s: T, w: 2 })
  formen.push({ t: 'circle', cx: 50, cy: 36, r: 23, f: H, s: T, w: 2.4 })
  formen.push(...haarVorne(t, m))
  const k = (23 * 0.96) / 43
  formen.push({ t: 'g', tf: `translate(${50 - 50 * k} ${38 - 52 * k}) scale(${k})`, formen: gesichtsZuege('froh', ['dampf', 'zzz', 'frage', 'funken', 'schweiss']) })
  return { vb: [8, 0, 84, 160], formen, w: 2.4 }
}

export interface Teil {
  /** Name des Stücks (bei Paaren mit -l / -r) */
  name: string
  formen: Form[]
  /** Umriss-Box im Raster [x0, y0, x1, y1] (mit Strichbreite) */
  box: [number, number, number, number]
}

const FARBE: Record<Kleidungsstueck, string> = {
  muetze: '#D9523F',
  sonnenhut: '#EBCB7A',
  schal: '#4F86C6',
  handschuhe: '#D9523F',
  jacke: '#4F86C6',
  regenjacke: '#F2C94C',
  pulli: '#5DAE6B',
  tshirt: '#EE9A3E',
  kleid: '#B58AD6',
  hose: '#4F6D99',
  kurzehose: '#C9A66B',
  stiefel: '#8B6443',
  gummistiefel: '#4FA36C',
  sandalen: '#A8794F',
}

function dunkler(hex: string, f = 0.78): string {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.round(((n >> 16) & 255) * f)
  const g = Math.round(((n >> 8) & 255) * f)
  const b = Math.round((n & 255) * f)
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
}

function oberteil(farbe: string, unten: number, aermel: 'lang' | 'kurz' | 'keine', extra: Form[] = [], weit = 0): Form[] {
  const out: Form[] = []
  if (aermel !== 'keine') {
    for (const s of ['l', 'r'] as const) {
      const [a, b, c, d] = ARM[s]
      const f = aermel === 'lang' ? 0.86 : 0.36
      out.push(...rohr(a, b - 1, a + (c - a) * f, b - 1 + (d - b + 1) * f, 13, farbe))
    }
  }
  const x0 = 29 - weit
  const x1 = 71 + weit
  out.push({ t: 'path', d: `M${x0 + 1} 70 Q${x0 + 1} 61 ${x0 + 9} 60 L${x1 - 9} 60 Q${x1 - 1} 61 ${x1 - 1} 70 L${x1 + 1} ${unten - 4} Q${x1 + 1} ${unten} ${x1 - 3} ${unten} L${x0 + 3} ${unten} Q${x0 - 1} ${unten} ${x0 - 1} ${unten - 4} Z`, f: farbe, s: T, w: 2.2 })
  out.push({ t: 'path', d: 'M43 60 Q50 69 57 60', f: 'none', s: T, w: 1.8 })
  out.push(...extra)
  return out
}

function stiefel(seite: 'l' | 'r', farbe: string, gummi: boolean): Form[] {
  const sp = (x: number) => (seite === 'l' ? x : 100 - x)
  const d = `M${sp(34.5)} 124 L${sp(48.5)} 124 L${sp(48.5)} 149 Q${sp(48.5)} 155 ${sp(42)} 155 L${sp(28)} 155 Q${sp(24.5)} 155 ${sp(25.5)} 150.5 Q${sp(27)} 146 ${sp(34.5)} 145 Z`
  const out: Form[] = [{ t: 'path', d, f: farbe, s: T, w: 2.2 }, { t: 'path', d: `M${sp(26)} 152 L${sp(48.5)} 152`, s: T, f: 'none', w: 1.6 }]
  if (gummi) out.push({ t: 'rect', x: Math.min(sp(34.5), sp(48.5)), y: 124, b: 14, h: 5, f: dunkler(farbe), s: T, w: 1.8 })
  else out.push({ t: 'path', d: `M${sp(36)} 132 L${sp(47)} 132`, s: dunkler(farbe, 0.6), f: 'none', w: 1.6 })
  return out
}

/** Die Teile eines Kleidungsstücks (Paare als zwei Teile). */
export function kleidungTeile(k: Kleidungsstueck, ausmalen = false): Teil[] {
  const F = ausmalen ? '#FFFFFF' : FARBE[k]
  const D = ausmalen ? '#FFFFFF' : dunkler(FARBE[k])
  switch (k) {
    case 'muetze':
      return [{ name: k, box: [23, 0, 77, 38], formen: [
        { t: 'path', d: 'M27 31 Q27 9 50 9 Q73 9 73 31 Z', f: F, s: T, w: 2.2 },
        { t: 'path', d: 'M38 14 L38 28 M50 10 L50 28 M62 14 L62 28', f: 'none', s: D, w: 1.4 },
        { t: 'rect', x: 25, y: 26, b: 50, h: 10, rx: 4.5, f: D, s: T, w: 2.2 },
        { t: 'circle', cx: 50, cy: 7, r: 5.5, f: ausmalen ? '#FFFFFF' : '#F4F6F9', s: T, w: 2 },
      ] }]
    case 'sonnenhut':
      return [{ name: k, box: [12, 0, 88, 31], formen: [
        { t: 'ellipse', cx: 50, cy: 23, rx: 36, ry: 6.5, f: F, s: T, w: 2.2 },
        { t: 'path', d: 'M32 23 Q32 3 50 3 Q68 3 68 23 Z', f: F, s: T, w: 2.2 },
        { t: 'rect', x: 32, y: 15, b: 36, h: 5.5, f: ausmalen ? '#FFFFFF' : '#D9523F', s: T, w: 1.8 },
      ] }]
    case 'schal':
      return [{ name: k, box: [35, 54, 65, 98], formen: [
        { t: 'rect', x: 52, y: 60, b: 11, h: 32, rx: 3, f: F, s: T, w: 2.2 },
        { t: 'path', d: 'M54 92 L54 96 M57.5 92 L57.5 96 M61 92 L61 96', f: 'none', s: T, w: 1.6 },
        { t: 'rect', x: 37, y: 56, b: 26, h: 11, rx: 5.5, f: F, s: T, w: 2.2 },
        { t: 'path', d: 'M52 72 L63 72 M52 82 L63 82', f: 'none', s: ausmalen ? T : '#FFFFFF', w: 2 },
      ] }]
    case 'handschuhe':
      return (['l', 'r'] as const).map((s) => {
        const [, , c, d] = ARM[s]
        const cx = c
        const cy = d + 2
        const dx = s === 'l' ? 1 : -1
        return {
          name: `${k}-${s}`,
          box: [cx - 10.5, cy - 13, cx + 10.5, cy + 11.5] as [number, number, number, number],
          formen: [
            { t: 'ellipse', cx: cx + dx * 5.5, cy: cy - 3.5, rx: 3.4, ry: 4.6, f: F, s: T, w: 2 },
            { t: 'ellipse', cx, cy: cy + 1, rx: 7.6, ry: 8.6, f: F, s: T, w: 2.2 },
            { t: 'rect', x: cx - 7, y: cy - 11, b: 14, h: 5, rx: 2, f: D, s: T, w: 1.8 },
          ] as Form[],
        }
      })
    case 'jacke':
    case 'regenjacke': {
      const extra: Form[] =
        k === 'jacke'
          ? [
              { t: 'path', d: 'M50 64 L50 118', f: 'none', s: T, w: 1.8 },
              { t: 'rect', x: 34, y: 96, b: 10, h: 8, rx: 1.5, f: 'none', s: T, w: 1.5 },
              { t: 'rect', x: 56, y: 96, b: 10, h: 8, rx: 1.5, f: 'none', s: T, w: 1.5 },
            ]
          : [
              { t: 'path', d: 'M36 61 Q50 49 64 61 Q50 67 36 61 Z', f: D, s: T, w: 2 },
              ...[76, 90, 104].map((y) => ({ t: 'rect', x: 47, y, b: 6, h: 3, rx: 1.4, f: T, s: 'none' }) as Form),
            ]
      return [{ name: k, box: [9, 47, 91, 121], formen: oberteil(F, 118, 'lang', extra, 2) }]
    }
    case 'pulli':
      return [{ name: k, box: [11, 57, 89, 117], formen: oberteil(F, 114, 'lang', [
        { t: 'rect', x: 29, y: 80, b: 42, h: 7, f: ausmalen ? '#FFFFFF' : '#FFFFFF', s: ausmalen ? T : 'none', w: 1.4 },
        { t: 'path', d: 'M29 109 L71 109', f: 'none', s: T, w: 1.4 },
      ]) }]
    case 'tshirt':
      return [{ name: k, box: [20, 57, 80, 115], formen: oberteil(F, 112, 'kurz', [{ t: 'circle', cx: 50, cy: 86, r: 6, f: ausmalen ? '#FFFFFF' : '#F2C94C', s: T, w: 1.6 }]) }]
    case 'kleid':
      return [{ name: k, box: [17, 57, 83, 139], formen: [
        ...oberteil(F, 98, 'kurz'),
        { t: 'path', d: 'M32 94 L68 94 L81 132 Q50 139 19 132 Z', f: F, s: T, w: 2.2 },
        { t: 'path', d: 'M31 96 L69 96', f: 'none', s: D, w: 3 },
        { t: 'path', d: 'M28 122 Q50 127 72 122', f: 'none', s: T, w: 1.4 },
      ] }]
    case 'hose':
    case 'kurzehose': {
      const bis = k === 'hose' ? 146 : 124
      return [{ name: k, box: [27, 99, 73, bis + 4], formen: [
        ...rohr(42, 115, 41, bis, 15.5, F),
        ...rohr(58, 115, 59, bis, 15.5, F),
        { t: 'path', d: 'M31 104 L69 104 L68 120 L50 122 L32 120 Z', f: F, s: 'none' },
        { t: 'path', d: 'M31.2 106 L32.6 121 M68.8 106 L67.4 121', f: 'none', s: T, w: 2.2 },
        { t: 'rect', x: 30, y: 101, b: 40, h: 8, rx: 2.5, f: D, s: T, w: 2.2 },
        { t: 'path', d: 'M50 109 L50 121', f: 'none', s: T, w: 1.6 },
      ] }]
    }
    case 'stiefel':
    case 'gummistiefel':
      return (['l', 'r'] as const).map((s) => ({
        name: `${k}-${s}`,
        box: (s === 'l' ? [23, 122, 50, 157] : [50, 122, 77, 157]) as [number, number, number, number],
        formen: stiefel(s, F, k === 'gummistiefel'),
      }))
    case 'sandalen':
      return (['l', 'r'] as const).map((s) => {
        const cx = s === 'l' ? 36 : 64
        return {
          name: `${k}-${s}`,
          box: [cx - 11, 143, cx + 11, 157] as [number, number, number, number],
          formen: [
            { t: 'ellipse', cx, cy: 152.5, rx: 9.5, ry: 3.4, f: F, s: T, w: 2 },
            { t: 'path', d: `M${cx - 6} 151 Q${cx - 4} 145 ${cx} 145.5 Q${cx + 4} 145 ${cx + 6} 151`, f: 'none', s: D, w: 3 },
          ] as Form[],
        }
      })
  }
}

/** Schnittlinie rund um ein Teil im Abstand `rand`: graue Kontur (Linie unter weißer, breiterer Linie), dann
 *  weiß gestrichelt überlagert → gestrichelte Linie rund um die Gesamtform. Drei Ebenen, unter dem Teil zeichnen;
 *  Ebene 3 mit flachen Linienenden (cap 'butt'). */
export function schnittKontur(formen: Form[], rand: number): [Form[], Form[], Form[]] {
  const mit = (f: Form, w: (alt: number) => number, s: string, dash?: string): Form => {
    if (f.t === 'g') return { ...f, formen: f.formen.map((x) => mit(x, w, s, dash)) }
    const alt = f.s && f.s !== 'none' ? (f.w ?? 2.2) : 0
    return { ...f, f: f.f && f.f !== 'none' ? s : 'none', s, w: w(alt), dash, o: undefined } as Form
  }
  return [
    formen.map((f) => mit(f, (a) => a + 2 * rand + 1.1, '#5A6376')),
    formen.map((f) => mit(f, (a) => a + 2 * rand, '#FFFFFF')),
    formen.map((f) => mit(f, (a) => a + 2 * rand + 3, '#FFFFFF', '2.6 2.2')),
  ]
}

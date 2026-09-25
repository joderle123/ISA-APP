// ---------------------------------------------------------------------------
// Gefühlsgesichter: aus wenigen Bausteinen (Augen, Brauen, Mund, Extras)
// zusammengesetzt, damit alle Gesichter denselben Strich und dieselben
// Proportionen haben. Raster 100 × 100.
// ---------------------------------------------------------------------------

import type { Gefuehl, Sprache } from './typen'
import type { Form, Zeichnung } from './zeichnung'

export const GEFUEHLE: Gefuehl[] = [
  'froh',
  'traurig',
  'wuetend',
  'aengstlich',
  'ueberrascht',
  'angeekelt',
  'ruhig',
  'stolz',
  'verlegen',
  'muede',
  'nervoes',
  'enttaeuscht',
  'gelangweilt',
  'verwirrt',
  'aufgeregt',
  'besorgt',
  'neutral',
]

export const GEFUEHL_WORT: Record<Gefuehl, { de: string; fr: string }> = {
  froh: { de: 'froh', fr: 'joyeux·se' },
  traurig: { de: 'traurig', fr: 'triste' },
  wuetend: { de: 'wütend', fr: 'en colère' },
  aengstlich: { de: 'ängstlich', fr: 'effrayé·e' },
  ueberrascht: { de: 'überrascht', fr: 'surpris·e' },
  angeekelt: { de: 'angeekelt', fr: 'dégoûté·e' },
  ruhig: { de: 'ruhig', fr: 'calme' },
  stolz: { de: 'stolz', fr: 'fier·ère' },
  verlegen: { de: 'verlegen', fr: 'gêné·e' },
  muede: { de: 'müde', fr: 'fatigué·e' },
  nervoes: { de: 'nervös', fr: 'nerveux·se' },
  enttaeuscht: { de: 'enttäuscht', fr: 'déçu·e' },
  gelangweilt: { de: 'gelangweilt', fr: 'ennuyé·e' },
  verwirrt: { de: 'verwirrt', fr: 'perdu·e' },
  aufgeregt: { de: 'aufgeregt', fr: 'excité·e' },
  besorgt: { de: 'besorgt', fr: 'inquiet·ète' },
  neutral: { de: 'neutral', fr: 'neutre' },
}

export function istGefuehl(x: string): x is Gefuehl {
  return (GEFUEHLE as string[]).includes(x)
}

export function gefuehlWort(g: Gefuehl, sprache: Sprache = 'de'): string {
  return GEFUEHL_WORT[g][sprache]
}

// --- Bausteine ---------------------------------------------------------------

const L = 50 - 15 // Augenmitte links
const R = 50 + 15 // Augenmitte rechts
const AY = 43 // Augenhöhe

type Augen = 'punkt' | 'froh' | 'zu' | 'weit' | 'halb' | 'schmal' | 'unten' | 'seite' | 'oben' | 'glanz'
type Brauen = 'keine' | 'ruhig' | 'hoch' | 'boese' | 'sorge' | 'schief' | 'leicht-sorge'
type Mund = 'lachen' | 'laecheln' | 'klein-laecheln' | 'flach' | 'traurig' | 'klein-traurig' | 'o' | 'klein-o' | 'welle' | 'zaehne' | 'ekel' | 'schief' | 'gaehnen'
type Extra = 'wangen' | 'traene' | 'schweiss' | 'zzz' | 'frage' | 'dampf' | 'rot' | 'funken' | 'nase-kraus'

interface Plan {
  augen: Augen
  brauen: Brauen
  mund: Mund
  extras?: Extra[]
}

const PLAENE: Record<Gefuehl, Plan> = {
  froh: { augen: 'froh', brauen: 'ruhig', mund: 'lachen', extras: ['wangen'] },
  traurig: { augen: 'unten', brauen: 'sorge', mund: 'traurig', extras: ['traene'] },
  wuetend: { augen: 'schmal', brauen: 'boese', mund: 'zaehne', extras: ['rot', 'dampf'] },
  aengstlich: { augen: 'weit', brauen: 'sorge', mund: 'welle', extras: ['schweiss'] },
  ueberrascht: { augen: 'weit', brauen: 'hoch', mund: 'o' },
  angeekelt: { augen: 'schmal', brauen: 'schief', mund: 'ekel', extras: ['nase-kraus'] },
  ruhig: { augen: 'zu', brauen: 'ruhig', mund: 'klein-laecheln' },
  stolz: { augen: 'zu', brauen: 'hoch', mund: 'laecheln', extras: ['wangen', 'funken'] },
  verlegen: { augen: 'seite', brauen: 'leicht-sorge', mund: 'schief', extras: ['wangen'] },
  muede: { augen: 'halb', brauen: 'ruhig', mund: 'gaehnen', extras: ['zzz'] },
  nervoes: { augen: 'glanz', brauen: 'sorge', mund: 'welle', extras: ['schweiss'] },
  enttaeuscht: { augen: 'unten', brauen: 'leicht-sorge', mund: 'klein-traurig' },
  gelangweilt: { augen: 'halb', brauen: 'keine', mund: 'flach' },
  verwirrt: { augen: 'punkt', brauen: 'schief', mund: 'schief', extras: ['frage'] },
  aufgeregt: { augen: 'glanz', brauen: 'hoch', mund: 'lachen', extras: ['funken'] },
  besorgt: { augen: 'punkt', brauen: 'sorge', mund: 'klein-traurig' },
  neutral: { augen: 'punkt', brauen: 'ruhig', mund: 'flach' },
}

const W = 3.4 // Strichstärke

function augen(a: Augen): Form[] {
  const beide = (fn: (x: number) => Form[]) => [...fn(L), ...fn(R)]
  switch (a) {
    case 'punkt':
      return beide((x) => [{ t: 'ellipse', cx: x, cy: AY, rx: 4.3, ry: 5.6, f: 'tinte', s: 'none' }])
    case 'froh':
      return beide((x) => [{ t: 'path', d: `M${x - 7} ${AY + 3} Q${x} ${AY - 7} ${x + 7} ${AY + 3}`, s: 'tinte', f: 'none', w: W }])
    case 'zu':
      return beide((x) => [{ t: 'path', d: `M${x - 7} ${AY - 1} Q${x} ${AY + 7} ${x + 7} ${AY - 1}`, s: 'tinte', f: 'none', w: W }])
    case 'weit':
      return beide((x) => [
        { t: 'circle', cx: x, cy: AY, r: 8, f: 'papier', s: 'tinte', w: W - 0.6 },
        { t: 'circle', cx: x, cy: AY + 0.5, r: 3.6, f: 'tinte', s: 'none' },
      ])
    case 'glanz':
      return beide((x) => [
        { t: 'ellipse', cx: x, cy: AY, rx: 5.4, ry: 6.8, f: 'tinte', s: 'none' },
        { t: 'circle', cx: x + 1.8, cy: AY - 2.4, r: 1.8, f: 'papier', s: 'none' },
      ])
    case 'halb':
      return beide((x) => [
        { t: 'path', d: `M${x - 7} ${AY} L${x + 7} ${AY}`, s: 'tinte', f: 'none', w: W },
        { t: 'path', d: `M${x - 5.5} ${AY} Q${x} ${AY + 7.5} ${x + 5.5} ${AY} Z`, f: 'tinte', s: 'none' },
      ])
    case 'schmal':
      return beide((x) => [{ t: 'path', d: `M${x - 6.5} ${AY + 1} Q${x} ${AY - 3.5} ${x + 6.5} ${AY + 1} Q${x} ${AY + 4} ${x - 6.5} ${AY + 1} Z`, f: 'tinte', s: 'tinte', w: 1.5 }])
    case 'unten':
      return beide((x) => [{ t: 'ellipse', cx: x, cy: AY + 2.5, rx: 4, ry: 4.8, f: 'tinte', s: 'none' }])
    case 'seite':
      return beide((x) => [{ t: 'ellipse', cx: x + 3, cy: AY + 1, rx: 3.8, ry: 5, f: 'tinte', s: 'none' }])
    case 'oben':
      return beide((x) => [{ t: 'ellipse', cx: x + 1, cy: AY - 2.5, rx: 3.8, ry: 5, f: 'tinte', s: 'none' }])
  }
}

function brauen(b: Brauen): Form[] {
  const y = AY - 13
  const linie = (d: string): Form => ({ t: 'path', d, s: 'tinte', f: 'none', w: W - 0.4 })
  switch (b) {
    case 'keine':
      return []
    case 'ruhig':
      return [linie(`M${L - 8} ${y + 1} Q${L} ${y - 3} ${L + 8} ${y + 1}`), linie(`M${R - 8} ${y + 1} Q${R} ${y - 3} ${R + 8} ${y + 1}`)]
    case 'hoch':
      return [linie(`M${L - 8} ${y - 2} Q${L} ${y - 8} ${L + 8} ${y - 2}`), linie(`M${R - 8} ${y - 2} Q${R} ${y - 8} ${R + 8} ${y - 2}`)]
    case 'boese':
      return [linie(`M${L - 9} ${y - 3} L${L + 8} ${y + 4}`), linie(`M${R + 9} ${y - 3} L${R - 8} ${y + 4}`)]
    case 'sorge':
      return [linie(`M${L - 9} ${y + 3} Q${L} ${y + 1} ${L + 7} ${y - 5}`), linie(`M${R + 9} ${y + 3} Q${R} ${y + 1} ${R - 7} ${y - 5}`)]
    case 'leicht-sorge':
      return [linie(`M${L - 8} ${y + 2} L${L + 7} ${y - 2}`), linie(`M${R + 8} ${y + 2} L${R - 7} ${y - 2}`)]
    case 'schief':
      return [linie(`M${L - 8} ${y - 3} Q${L} ${y - 8} ${L + 8} ${y - 3}`), linie(`M${R - 8} ${y + 2} L${R + 8} ${y + 1}`)]
  }
}

function mund(m: Mund): Form[] {
  const s = { s: 'tinte', f: 'none', w: W } as const
  switch (m) {
    case 'lachen':
      return [
        { t: 'path', d: 'M31 60 Q50 63 69 60 Q66 82 50 82 Q34 82 31 60 Z', f: 'tinte', s: 'tinte', w: W - 1, },
        { t: 'path', d: 'M40 76 Q50 70 60 76 Q56 81 50 81 Q44 81 40 76 Z', f: 'mittel', s: 'none' },
      ]
    case 'laecheln':
      return [{ t: 'path', d: 'M33 63 Q50 78 67 63', ...s }]
    case 'klein-laecheln':
      return [{ t: 'path', d: 'M39 65 Q50 72 61 65', ...s }]
    case 'flach':
      return [{ t: 'path', d: 'M39 68 L61 68', ...s }]
    case 'traurig':
      return [{ t: 'path', d: 'M35 74 Q50 61 65 74', ...s }]
    case 'klein-traurig':
      return [{ t: 'path', d: 'M40 71 Q50 65 60 71', ...s }]
    case 'o':
      return [{ t: 'ellipse', cx: 50, cy: 70, rx: 7.5, ry: 9.5, f: 'tinte', s: 'none' }]
    case 'klein-o':
      return [{ t: 'ellipse', cx: 50, cy: 69, rx: 4.5, ry: 5.5, f: 'tinte', s: 'none' }]
    case 'welle':
      return [{ t: 'path', d: 'M34 70 Q38 65 42 70 T50 70 T58 70 T66 70', ...s, w: W - 0.4 }]
    case 'zaehne':
      return [
        { t: 'rect', x: 34, y: 62, b: 32, h: 13, rx: 5, f: 'papier', s: 'tinte', w: W - 0.6 },
        { t: 'line', x1: 34.5, y1: 68.5, x2: 65.5, y2: 68.5, s: 'tinte', w: 1.8 },
        { t: 'line', x1: 42, y1: 62.5, x2: 42, y2: 74.5, s: 'tinte', w: 1.6 },
        { t: 'line', x1: 50, y1: 62.5, x2: 50, y2: 74.5, s: 'tinte', w: 1.6 },
        { t: 'line', x1: 58, y1: 62.5, x2: 58, y2: 74.5, s: 'tinte', w: 1.6 },
      ]
    case 'ekel':
      return [
        { t: 'path', d: 'M34 70 Q40 64 46 69 Q52 74 58 68 Q62 65 66 67', ...s },
        { t: 'path', d: 'M52 71 Q55 79 60 76 Q61 72 58 69', f: 'mittel', s: 'tinte', w: 2.2 },
      ]
    case 'schief':
      return [{ t: 'path', d: 'M38 70 Q48 67 62 64', ...s }]
    case 'gaehnen':
      return [{ t: 'ellipse', cx: 50, cy: 70, rx: 6, ry: 7.5, f: 'tinte', s: 'none' }]
  }
}

function extras(e: Extra[]): Form[] {
  const out: Form[] = []
  for (const x of e) {
    switch (x) {
      case 'wangen':
        // Wangen immer warm rosa – nie in der Bereichsfarbe (sonst grüne Wangen im Bereich Alltag)
        out.push({ t: 'ellipse', cx: 26, cy: 60, rx: 7, ry: 4.5, f: '#F4A9A0', s: 'none', o: 0.8 })
        out.push({ t: 'ellipse', cx: 74, cy: 60, rx: 7, ry: 4.5, f: '#F4A9A0', s: 'none', o: 0.8 })
        break
      case 'rot':
        out.push({ t: 'ellipse', cx: 26, cy: 59, rx: 8, ry: 5, f: '#D9483B', s: 'none', o: 0.3 })
        out.push({ t: 'ellipse', cx: 74, cy: 59, rx: 8, ry: 5, f: '#D9483B', s: 'none', o: 0.3 })
        break
      case 'traene':
        out.push({ t: 'path', d: 'M31 52 Q26 61 28.5 64.5 Q31 67.5 33.5 64.5 Q36 61 31 52 Z', f: '#A9D2EE', s: 'tinte', w: 1.8 })
        break
      case 'schweiss':
        out.push({ t: 'path', d: 'M83 22 Q77 32 80 36 Q83 39 86 36 Q89 32 83 22 Z', f: '#A9D2EE', s: 'tinte', w: 1.8 })
        break
      case 'zzz':
        out.push({ t: 'path', d: 'M74 12 L84 12 L74 22 L84 22', s: 'tinte', f: 'none', w: 2.4 })
        out.push({ t: 'path', d: 'M87 2 L94 2 L87 9 L94 9', s: 'tinte', f: 'none', w: 2 })
        break
      case 'frage':
        out.push({ t: 'path', d: 'M79 8 Q79 1 86 1 Q93 1 93 7.5 Q93 12 88 14 Q86 15 86 19', s: 'tief', f: 'none', w: 3 })
        out.push({ t: 'circle', cx: 86, cy: 25, r: 2.1, f: 'tief', s: 'none' })
        break
      case 'dampf':
        out.push({ t: 'path', d: 'M14 18 Q9 13 14 8 Q19 3 14 -2', s: 'tief', f: 'none', w: 2.6 })
        out.push({ t: 'path', d: 'M86 18 Q91 13 86 8 Q81 3 86 -2', s: 'tief', f: 'none', w: 2.6 })
        break
      case 'funken':
        out.push({ t: 'path', d: 'M88 14 L90 19 L95 21 L90 23 L88 28 L86 23 L81 21 L86 19 Z', f: 'tief', s: 'none' })
        out.push({ t: 'path', d: 'M10 8 L11.3 11.2 L14.5 12.5 L11.3 13.8 L10 17 L8.7 13.8 L5.5 12.5 L8.7 11.2 Z', f: 'tief', s: 'none' })
        break
      case 'nase-kraus':
        out.push({ t: 'path', d: 'M44 55 Q47 53 50 55 Q53 53 56 55', s: 'tinte', f: 'none', w: 1.8 })
        break
    }
  }
  return out
}

/** Gesicht allein (ohne Kreis-Hintergrund), für Figuren. Raster 100 × 100. */
export function gesichtsZuege(g: Gefuehl, ohne: Extra[] = []): Form[] {
  const p = PLAENE[g]
  const ex = (p.extras ?? []).filter((x) => !ohne.includes(x))
  // Wangen und Röte unter die Gesichtszüge legen
  const unten = ex.filter((x) => x === 'wangen' || x === 'rot')
  const oben = ex.filter((x) => x !== 'wangen' && x !== 'rot')
  return [...extras(unten), ...brauen(p.brauen), ...augen(p.augen), ...mund(p.mund), ...extras(oben)]
}

export function gesichtZeichnung(g: Gefuehl): Zeichnung {
  return {
    vb: [0, 0, 100, 100],
    w: W,
    formen: [{ t: 'circle', cx: 50, cy: 52, r: 43, f: 'zart', s: 'tinte', w: W }, ...gesichtsZuege(g)],
  }
}

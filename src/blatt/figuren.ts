// ---------------------------------------------------------------------------
// Figuren für Bildgeschichten: wenige feste Kinder (und Erwachsene) im selben
// Strich wie die Gefühlsgesichter. Gefühl und Haltung sind wählbar:
//   'figur:mia:froh:winken', 'figur:noah:wuetend:verschraenkt'
// Raster 100 × 160 (Füße auf y = 152).
// ---------------------------------------------------------------------------

import type { Gefuehl } from './typen'
import type { Form, Zeichnung } from './zeichnung'
import { gesichtsZuege, istGefuehl } from './gesichter'

export type Pose = 'stehen' | 'winken' | 'verschraenkt' | 'zeigen' | 'jubeln' | 'melden' | 'stopp' | 'haende-gesicht' | 'geben'

export const POSEN: Pose[] = ['stehen', 'winken', 'verschraenkt', 'zeigen', 'jubeln', 'melden', 'stopp', 'haende-gesicht', 'geben']

type Haar = 'kurz' | 'lang' | 'zopf' | 'locken' | 'tuch' | 'kappe' | 'dutt' | 'glatze-bart'

interface Typ {
  haar: Haar
  haarFarbe: string
  haut: string
  shirt: string
  hose: string
  /** Proportionen: Kind, Jugendliche/r, Erwachsene/r */
  alter: 'kind' | 'jugend' | 'erwachsen'
  extra?: string
}

export const FIGUREN: Record<string, Typ> = {
  mia: { haar: 'lang', haarFarbe: '#4A3426', haut: '#F2D2B6', shirt: '#E59E57', hose: '#4F6D99', alter: 'kind' },
  noah: { haar: 'kurz', haarFarbe: '#2A2522', haut: '#DDB08A', shirt: '#6C8FC6', hose: '#3E4A60', alter: 'kind' },
  lea: { haar: 'zopf', haarFarbe: '#D5AE5E', haut: '#F6DDC8', shirt: '#86B477', hose: '#4F6D99', alter: 'kind' },
  sami: { haar: 'locken', haarFarbe: '#231E1C', haut: '#9C6A48', shirt: '#D8899A', hose: '#3E4A60', alter: 'kind' },
  amira: { haar: 'tuch', haarFarbe: '#5C6FA8', haut: '#D6A57F', shirt: '#9B87C8', hose: '#4A4F66', alter: 'kind' },
  tom: { haar: 'kappe', haarFarbe: '#7A5236', haut: '#F0CDAD', shirt: '#DDBF55', hose: '#4F6D99', alter: 'kind', extra: '#C2554A' },
  jana: { haar: 'lang', haarFarbe: '#6B4630', haut: '#C58C66', shirt: '#5E9F9C', hose: '#36405A', alter: 'jugend' },
  ben: { haar: 'kurz', haarFarbe: '#8A6440', haut: '#F2D3BA', shirt: '#7C8698', hose: '#36405A', alter: 'jugend' },
  lehrerin: { haar: 'dutt', haarFarbe: '#5A4032', haut: '#EFCFB3', shirt: '#B36B6B', hose: '#3E4A60', alter: 'erwachsen' },
  lehrer: { haar: 'glatze-bart', haarFarbe: '#3A2B22', haut: '#8C5A3E', shirt: '#5C7A9A', hose: '#3A4254', alter: 'erwachsen' },
}

export const FIGUR_NAMEN = Object.keys(FIGUREN)

const T = '#1B2233'

function tube(d: string, farbe: string, dicke: number): Form[] {
  return [
    { t: 'path', d, s: T, f: 'none', w: dicke + 3 },
    { t: 'path', d, s: farbe, f: 'none', w: dicke },
  ]
}

function hand(x: number, y: number, haut: string, r = 5): Form {
  return { t: 'circle', cx: x, cy: y, r, f: haut, s: T, w: 2.2 }
}

interface Mass {
  kx: number
  ky: number
  kr: number
  schulterY: number
  shirtUnten: number
  fussY: number
  breite: number
}

function masse(alter: Typ['alter']): Mass {
  if (alter === 'jugend') return { kx: 50, ky: 30, kr: 19, schulterY: 53, shirtUnten: 106, fussY: 152, breite: 21 }
  if (alter === 'erwachsen') return { kx: 50, ky: 24, kr: 17.5, schulterY: 45, shirtUnten: 102, fussY: 152, breite: 22 }
  return { kx: 50, ky: 36, kr: 23, schulterY: 63, shirtUnten: 112, fussY: 152, breite: 19 }
}

function haarHinten(t: Typ, m: Mass): Form[] {
  const { kx: x, ky: y, kr: r } = m
  const hf = t.haarFarbe
  switch (t.haar) {
    case 'lang':
      return [{ t: 'path', d: `M${x - r - 3} ${y + 2} Q${x - r - 4} ${y - r - 3} ${x} ${y - r - 3} Q${x + r + 4} ${y - r - 3} ${x + r + 3} ${y + 2} L${x + r + 4} ${y + r + 12} Q${x + r - 6} ${y + r + 16} ${x + r - 10} ${y + r + 4} L${x - r + 10} ${y + r + 4} Q${x - r + 6} ${y + r + 16} ${x - r - 4} ${y + r + 12} Z`, f: hf, s: T, w: 2.2 }]
    case 'zopf':
      return [{ t: 'path', d: `M${x + r - 4} ${y - r + 6} Q${x + r + 16} ${y - r + 2} ${x + r + 13} ${y + 8} Q${x + r + 10} ${y + 20} ${x + r + 3} ${y + 12} Q${x + r + 8} ${y} ${x + r - 2} ${y - 6} Z`, f: hf, s: T, w: 2.2 }]
    case 'tuch':
      return [{ t: 'path', d: `M${x - r - 4} ${y + 4} Q${x - r - 5} ${y - r - 6} ${x} ${y - r - 6} Q${x + r + 5} ${y - r - 6} ${x + r + 4} ${y + 4} Q${x + r + 6} ${y + r + 10} ${x + r - 2} ${y + r + 14} L${x - r + 2} ${y + r + 14} Q${x - r - 6} ${y + r + 10} ${x - r - 4} ${y + 4} Z`, f: hf, s: T, w: 2.2 }]
    case 'dutt':
      return [{ t: 'circle', cx: x, cy: y - r - 5, r: 8, f: hf, s: T, w: 2.2 }]
    default:
      return []
  }
}

function haarVorne(t: Typ, m: Mass): Form[] {
  const { kx: x, ky: y, kr: r } = m
  const hf = t.haarFarbe
  switch (t.haar) {
    case 'kurz':
      return [{ t: 'path', d: `M${x - r - 1} ${y + 1} Q${x - r - 2} ${y - r - 2} ${x + 2} ${y - r - 2} Q${x + r + 2} ${y - r} ${x + r + 1} ${y + 1} Q${x + r - 2} ${y - r + 9} ${x + r - 9} ${y - r + 9} Q${x + 2} ${y - r + 13} ${x - 8} ${y - r + 7} Q${x - r + 3} ${y - r + 10} ${x - r - 1} ${y + 1} Z`, f: hf, s: T, w: 2.2 }]
    case 'lang':
    case 'zopf':
      return [{ t: 'path', d: `M${x - r} ${y - 2} Q${x - r + 1} ${y - r - 1} ${x} ${y - r - 1} Q${x + r - 1} ${y - r - 1} ${x + r} ${y - 2} Q${x + r - 6} ${y - r + 9} ${x + 4} ${y - r + 10} Q${x - 6} ${y - r + 8} ${x - r} ${y - 2} Z`, f: hf, s: T, w: 2.2 }]
    case 'locken': {
      const out: Form[] = []
      const n = 9
      for (let i = 0; i < n; i++) {
        const a = Math.PI * (1.08 + (0.84 * i) / (n - 1))
        out.push({ t: 'circle', cx: x + Math.cos(a) * (r - 1), cy: y - 2 + Math.sin(a) * (r - 1), r: r * 0.36, f: hf, s: T, w: 2 })
      }
      out.push({ t: 'path', d: `M${x - r + 2} ${y - 4} Q${x} ${y - r - 6} ${x + r - 2} ${y - 4} Q${x} ${y - r + 6} ${x - r + 2} ${y - 4} Z`, f: hf, s: 'none' })
      return out
    }
    case 'tuch':
      return [{ t: 'path', d: `M${x - r + 1} ${y - 3} Q${x - r + 3} ${y - r - 2} ${x} ${y - r - 2} Q${x + r - 3} ${y - r - 2} ${x + r - 1} ${y - 3} Q${x + r - 8} ${y - r + 7} ${x} ${y - r + 7} Q${x - r + 8} ${y - r + 7} ${x - r + 1} ${y - 3} Z`, f: hf, s: T, w: 2.2 }]
    case 'kappe':
      return [
        { t: 'path', d: `M${x - r + 1} ${y - 9} Q${x - r} ${y - r - 4} ${x} ${y - r - 4} Q${x + r} ${y - r - 4} ${x + r - 1} ${y - 9} Z`, f: t.extra ?? '#C2554A', s: T, w: 2.2 },
        { t: 'path', d: `M${x - r - 2} ${y - 9} Q${x} ${y - 3} ${x + r + 2} ${y - 9} Q${x + r + 2} ${y - 13} ${x + r - 2} ${y - 13} Q${x} ${y - 8} ${x - r + 2} ${y - 13} Q${x - r - 2} ${y - 13} ${x - r - 2} ${y - 9} Z`, f: t.extra ?? '#C2554A', s: T, w: 2.2 },
        { t: 'circle', cx: x, cy: y - r - 4, r: 2.2, f: T, s: 'none' },
      ]
    case 'dutt':
      return [{ t: 'path', d: `M${x - r - 1} ${y + 2} Q${x - r - 1} ${y - r - 2} ${x} ${y - r - 2} Q${x + r + 1} ${y - r - 2} ${x + r + 1} ${y + 2} Q${x + r - 4} ${y - r + 8} ${x} ${y - r + 8} Q${x - r + 4} ${y - r + 8} ${x - r - 1} ${y + 2} Z`, f: t.haarFarbe, s: T, w: 2.2 }]
    case 'glatze-bart':
      return [
        { t: 'path', d: `M${x - r + 1} ${y + 3} Q${x - r + 1} ${y + r + 3} ${x} ${y + r + 3} Q${x + r - 1} ${y + r + 3} ${x + r - 1} ${y + 3} Q${x + r - 5} ${y + 12} ${x} ${y + 12} Q${x - r + 5} ${y + 12} ${x - r + 1} ${y + 3} Z`, f: t.haarFarbe, s: T, w: 2 },
        { t: 'path', d: `M${x - r} ${y - 3} Q${x - r + 2} ${y - r + 1} ${x - r + 8} ${y - r + 3}`, s: t.haarFarbe, f: 'none', w: 3.5 },
        { t: 'path', d: `M${x + r} ${y - 3} Q${x + r - 2} ${y - r + 1} ${x + r - 8} ${y - r + 3}`, s: t.haarFarbe, f: 'none', w: 3.5 },
      ]
    default:
      return []
  }
}

function arme(pose: Pose, t: Typ, m: Mass): { hinten: Form[]; vorne: Form[] } {
  const sy = m.schulterY + 4
  const lx = m.kx - m.breite + 3
  const rx = m.kx + m.breite - 3
  const d = t.alter === 'kind' ? 8.5 : 8
  const unten = m.shirtUnten - 8
  const H = t.haut
  const arm = (pfad: string, hx: number, hy: number) => [...tube(pfad, t.shirt, d), hand(hx, hy, H)]
  const links_unten = arm(`M${lx} ${sy} Q${lx - 7} ${sy + 18} ${lx - 6} ${unten}`, lx - 6, unten + 3)
  const rechts_unten = arm(`M${rx} ${sy} Q${rx + 7} ${sy + 18} ${rx + 6} ${unten}`, rx + 6, unten + 3)
  switch (pose) {
    case 'winken':
      return { hinten: [], vorne: [...links_unten, ...arm(`M${rx} ${sy} Q${rx + 14} ${sy - 4} ${rx + 16} ${sy - 26}`, rx + 17, sy - 30)] }
    case 'melden':
      return { hinten: [], vorne: [...links_unten, ...arm(`M${rx} ${sy} Q${rx + 6} ${sy - 14} ${rx + 6} ${sy - 36}`, rx + 6, sy - 40)] }
    case 'jubeln':
      return {
        hinten: [],
        vorne: [
          ...arm(`M${lx} ${sy} Q${lx - 12} ${sy - 8} ${lx - 16} ${sy - 30}`, lx - 17, sy - 34),
          ...arm(`M${rx} ${sy} Q${rx + 12} ${sy - 8} ${rx + 16} ${sy - 30}`, rx + 17, sy - 34),
        ],
      }
    case 'zeigen':
      return { hinten: [], vorne: [...links_unten, ...arm(`M${rx} ${sy} Q${rx + 12} ${sy + 4} ${rx + 26} ${sy + 2}`, rx + 29, sy + 2)] }
    case 'geben':
      return { hinten: [], vorne: [...links_unten, ...arm(`M${rx} ${sy} Q${rx + 8} ${sy + 14} ${rx + 22} ${sy + 14}`, rx + 25, sy + 13)] }
    case 'stopp':
      return {
        hinten: [],
        vorne: [
          ...links_unten,
          ...tube(`M${rx} ${sy} Q${rx + 12} ${sy + 2} ${rx + 22} ${sy - 6}`, t.shirt, d),
          { t: 'g', tf: `translate(${rx + 23} ${sy - 12}) rotate(-12)`, formen: [
            { t: 'rect', x: -3.6, y: 1, b: 13, h: 5.5, rx: 2.75, f: H, s: T, w: 2 },
            { t: 'rect', x: -7, y: -10, b: 11, h: 19, rx: 5.2, f: H, s: T, w: 2.2 },
            { t: 'line', x1: -3.4, y1: -9.5, x2: -3.4, y2: -4, s: T, w: 1.2 },
            { t: 'line', x1: 0.2, y1: -9.5, x2: 0.2, y2: -4, s: T, w: 1.2 },
          ] },
        ],
      }
    case 'verschraenkt':
      return {
        hinten: [],
        vorne: [
          ...tube(`M${lx} ${sy} Q${lx - 4} ${sy + 18} ${m.kx + 8} ${sy + 20}`, t.shirt, d),
          ...tube(`M${rx} ${sy} Q${rx + 4} ${sy + 16} ${m.kx - 8} ${sy + 16}`, t.shirt, d),
          hand(m.kx + 10, sy + 19, H, 4.2),
          hand(m.kx - 10, sy + 15, H, 4.2),
        ],
      }
    case 'haende-gesicht':
      return {
        hinten: [],
        vorne: [
          ...arm(`M${lx} ${sy} Q${lx - 8} ${sy + 8} ${m.kx - m.kr + 4} ${m.ky + 8}`, m.kx - m.kr + 4, m.ky + 5),
          ...arm(`M${rx} ${sy} Q${rx + 8} ${sy + 8} ${m.kx + m.kr - 4} ${m.ky + 8}`, m.kx + m.kr - 4, m.ky + 5),
        ],
      }
    default:
      return { hinten: [], vorne: [...links_unten, ...rechts_unten] }
  }
}

export function figurZeichnung(typName: string, gefuehl?: string, pose?: string): Zeichnung {
  const t = FIGUREN[typName]
  if (!t) return { vb: [0, 0, 100, 160], formen: [] }
  const g: Gefuehl = gefuehl && istGefuehl(gefuehl) ? gefuehl : 'neutral'
  const p: Pose = (POSEN as string[]).includes(pose ?? '') ? (pose as Pose) : 'stehen'
  const m = masse(t.alter)
  const { kx, ky, kr, schulterY, shirtUnten, fussY, breite } = m
  const formen: Form[] = []

  // Bodenschatten
  formen.push({ t: 'ellipse', cx: 50, cy: fussY + 3, rx: 26, ry: 3.2, f: 'hellgrau', s: 'none' })

  // Beine
  const hueftY = shirtUnten - 4
  formen.push(...tube(`M${kx - 8} ${hueftY} L${kx - 9} ${fussY - 4}`, t.hose, 10))
  formen.push(...tube(`M${kx + 8} ${hueftY} L${kx + 9} ${fussY - 4}`, t.hose, 10))
  formen.push({ t: 'path', d: `M${kx - 19} ${fussY + 1} Q${kx - 19} ${fussY - 7} ${kx - 10} ${fussY - 7} Q${kx - 4} ${fussY - 7} ${kx - 4} ${fussY + 1} Z`, f: T, s: T, w: 1.5 })
  formen.push({ t: 'path', d: `M${kx + 19} ${fussY + 1} Q${kx + 19} ${fussY - 7} ${kx + 10} ${fussY - 7} Q${kx + 4} ${fussY - 7} ${kx + 4} ${fussY + 1} Z`, f: T, s: T, w: 1.5 })

  // Haare hinten, Hals
  formen.push(...haarHinten(t, m))
  formen.push({ t: 'rect', x: kx - 5, y: ky + kr - 4, b: 10, h: schulterY - ky - kr + 8, f: t.haut, s: T, w: 2 })

  const a = arme(p, t, m)
  formen.push(...a.hinten)

  // Oberkörper
  const b = breite
  formen.push({
    t: 'path',
    d: `M${kx - b} ${schulterY + 6} Q${kx - b} ${schulterY} ${kx - b + 7} ${schulterY - 1} L${kx + b - 7} ${schulterY - 1} Q${kx + b} ${schulterY} ${kx + b} ${schulterY + 6} L${kx + b + 2} ${shirtUnten - 3} Q${kx + b + 2} ${shirtUnten} ${kx + b - 2} ${shirtUnten} L${kx - b + 2} ${shirtUnten} Q${kx - b - 2} ${shirtUnten} ${kx - b - 2} ${shirtUnten - 3} Z`,
    f: t.shirt,
    s: T,
    w: 2.4,
  })
  formen.push({ t: 'path', d: `M${kx - 6} ${schulterY - 1} Q${kx} ${schulterY + 6} ${kx + 6} ${schulterY - 1}`, f: t.haut, s: T, w: 2 })

  // Kopf mit Ohren
  formen.push({ t: 'circle', cx: kx - kr, cy: ky + 2, r: kr * 0.2, f: t.haut, s: T, w: 2 })
  formen.push({ t: 'circle', cx: kx + kr, cy: ky + 2, r: kr * 0.2, f: t.haut, s: T, w: 2 })
  formen.push({ t: 'circle', cx: kx, cy: ky, r: kr, f: t.haut, s: T, w: 2.4 })
  formen.push(...haarVorne(t, m))

  // Gesicht (100er-Raster → Kopf)
  const k = (kr * 0.96) / 43
  formen.push({ t: 'g', tf: `translate(${kx - 50 * k} ${ky + 2 - 52 * k}) scale(${k})`, formen: gesichtsZuege(g, ['dampf', 'zzz', 'frage', 'funken', 'schweiss']) })

  formen.push(...a.vorne)
  return { vb: [0, 0, 100, 160], formen, w: 2.4 }
}

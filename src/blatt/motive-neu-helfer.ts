// ---------------------------------------------------------------------------
// Kleine Helfer für die neuen Motive (motive-neu-*.ts): dieselben Kürzel wie in
// motive-alltag.ts und motive-lernen.ts, dazu ein paar Werkzeuge für Kugeln,
// Puzzleteile und Fünfecke. Farben und Bausteine kommen aus motive-dinge.ts.
// ---------------------------------------------------------------------------

import type { Form } from './zeichnung'
import { g } from './motive-dinge'

export const T = 'tinte'

export const rr = (x: number, y: number, b: number, h: number, f: string, rx = 3, w = 2.2): Form => ({ t: 'rect', x, y, b, h, rx, f, s: w ? T : 'none', w })
export const pf = (d: string, f: string, w = 2.2): Form => ({ t: 'path', d, f, s: w ? T : 'none', w })
export const kr = (cx: number, cy: number, r: number, f: string, w = 2.2): Form => ({ t: 'circle', cx, cy, r, f, s: w ? T : 'none', w })
export const el = (cx: number, cy: number, rx: number, ry: number, f: string, w = 2.2, winkel = 0): Form => {
  const e: Form = { t: 'ellipse', cx: winkel ? 0 : cx, cy: winkel ? 0 : cy, rx, ry, f, s: w ? T : 'none', w }
  return winkel ? g(`translate(${cx} ${cy}) rotate(${winkel})`, [e]) : e
}
export const boden = (cx: number, cy: number, rx: number, ry = 3.4): Form => ({ t: 'ellipse', cx, cy, rx, ry, f: 'hellgrau', s: 'none' })
export const punkt = (cx: number, cy: number, r: number, f: string): Form => ({ t: 'circle', cx, cy, r, f, s: 'none' })
export const drehen = (winkel: number, cx: number, cy: number, formen: Form[]): Form => g(`rotate(${winkel} ${cx} ${cy})`, formen)
export const poly = (punkte: [number, number][], f: string, w = 2.2): Form => ({
  t: 'polygon',
  p: punkte.map(([x, y]) => `${+x.toFixed(1)},${+y.toFixed(1)}`).join(' '),
  f,
  s: w ? T : 'none',
  w,
})
/** Gerade Linie als Form (statt Pfad). */
export const strich = (x1: number, y1: number, x2: number, y2: number, w = 2, s = T): Form => ({ t: 'line', x1, y1, x2, y2, s, w })

/** Funkeln: kleiner vierzackiger Stern. */
export const funke = (x: number, y: number, s = 1, f = '#F2C94C'): Form =>
  g(`translate(${x} ${y}) scale(${s})`, [{ t: 'path', d: 'M0 -7 Q1 -1 7 0 Q1 1 0 7 Q-1 1 -7 0 Q-1 -1 0 -7 Z', f, s: T, w: 1.4 }])

/** Freundliches Punktauge mit Glanzlicht. */
export const auge = (x: number, y: number, r = 3): Form[] => [punkt(x, y, r, T), punkt(x + r * 0.35, y - r * 0.4, r * 0.36, 'papier')]

/** Ring (Ellipse mit Loch) als ein Pfad. */
export const ringPfad = (cx: number, cy: number, ra: number, rb: number, ia: number, ib: number): string =>
  `M${cx - ra} ${cy} A${ra} ${rb} 0 1 1 ${cx + ra} ${cy} A${ra} ${rb} 0 1 1 ${cx - ra} ${cy} Z M${cx - ia} ${cy} A${ia} ${ib} 0 1 0 ${cx + ia} ${cy} A${ia} ${ib} 0 1 0 ${cx - ia} ${cy} Z`

/** Regelmäßiges Vieleck als Punktliste (Mitte, Radius, Ecken, Startwinkel in Grad; 0° = rechts, −90° = oben). */
export function vieleck(cx: number, cy: number, r: number, n: number, start = -90): [number, number][] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((start + (360 / n) * i) * Math.PI) / 180
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as [number, number]
  })
}

/** Schneidet ein konvexes Vieleck mit einem Kreis (Sutherland–Hodgman gegen ein 64-Eck). */
export function klippKreis(punkte: [number, number][], cx: number, cy: number, r: number): [number, number][] {
  const n = 64
  const k = Array.from({ length: n }, (_, i) => [cx + Math.cos((i / n) * Math.PI * 2) * r, cy + Math.sin((i / n) * Math.PI * 2) * r] as [number, number])
  let aus = punkte
  for (let i = 0; i < n; i++) {
    const a = k[i]
    const b = k[(i + 1) % n]
    const innen = (p: [number, number]) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]) >= 0
    const schnitt = (p: [number, number], q: [number, number]): [number, number] => {
      const d1 = (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])
      const d2 = (b[0] - a[0]) * (q[1] - a[1]) - (b[1] - a[1]) * (q[0] - a[0])
      const t = d1 / (d1 - d2)
      return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]
    }
    const neu: [number, number][] = []
    for (let j = 0; j < aus.length; j++) {
      const p = aus[j]
      const q = aus[(j + 1) % aus.length]
      if (innen(p)) {
        neu.push(p)
        if (!innen(q)) neu.push(schnitt(p, q))
      } else if (innen(q)) neu.push(schnitt(p, q))
    }
    aus = neu
    if (!aus.length) break
  }
  return aus
}

/** Sichel für den Schatten einer Kugel (rechts unten). */
export function schattenKugel(cx: number, cy: number, r: number, f: string): Form {
  const p = (w: number, k: number) => `${(cx + r * k * Math.cos(w)).toFixed(1)} ${(cy + r * k * Math.sin(w)).toFixed(1)}`
  const a1 = (-35 * Math.PI) / 180
  const a2 = (100 * Math.PI) / 180
  const m = (30 * Math.PI) / 180
  return { t: 'path', d: `M${p(a1, 1)} A${r} ${r} 0 0 1 ${p(a2, 1)} Q${p(m, 0.5)} ${p(a1, 1)} Z`, f, s: 'none' }
}

type Kante = 1 | 0 | -1

/** Puzzleteil: Quadrat (x, y, Seite s); je Kante Nase (1), glatt (0) oder Loch (−1), im Uhrzeigersinn oben, rechts, unten, links. */
export function puzzleTeil(x: number, y: number, s: number, kanten: [Kante, Kante, Kante, Kante]): string {
  const ecken: [number, number][] = [[x, y], [x + s, y], [x + s, y + s], [x, y + s]]
  const f = (n: number) => +n.toFixed(2)
  let d = `M${f(x)} ${f(y)}`
  for (let i = 0; i < 4; i++) {
    const a = ecken[i]
    const b = ecken[(i + 1) % 4]
    const e = kanten[i]
    const dx = (b[0] - a[0]) / s
    const dy = (b[1] - a[1]) / s
    // nach außen (im Uhrzeigersinn): (dy, −dx)
    const nx = dy
    const ny = -dx
    const P = (u: number, v: number) => `${f(a[0] + dx * u * s + nx * v * s * (e || 1))} ${f(a[1] + dy * u * s + ny * v * s * (e || 1))}`
    if (!e) {
      d += ` L${f(b[0])} ${f(b[1])}`
      continue
    }
    const r = 0.13 * s
    const sweep = e > 0 ? 1 : 0
    d += ` L${P(0.4, 0)} L${P(0.42, 0.1)} A${f(r)} ${f(r)} 0 1 ${sweep} ${P(0.58, 0.1)} L${P(0.6, 0)} L${f(b[0])} ${f(b[1])}`
  }
  return d + ' Z'
}

// ---------------------------------------------------------------------------
// Zeichnungen unabhängig vom Ausgabeformat: eine Liste einfacher Formen, die
// sowohl ins PDF (@react-pdf) als auch in die App (SVG im Browser) übersetzt
// wird. Farben sind Rollen ('tinte', 'tief', 'mittel', 'zart' …) und werden
// erst beim Zeichnen mit den Farben des Bereichs gefüllt – so passt jede
// Zeichnung automatisch zum Blatt.
// ---------------------------------------------------------------------------

import ICONS from './bilder/icons.json'
import type { Farben } from './katalog'
import type { BildId } from './typen'
import { gesichtZeichnung, istGefuehl } from './gesichter'
import { figurZeichnung } from './figuren'
import { motivZeichnung } from './motive'

/** Farbrollen; alles andere wird als CSS-Farbe (#rrggbb) gelesen. */
export type Rolle = 'tinte' | 'tief' | 'mittel' | 'zart' | 'papier' | 'grau' | 'hellgrau' | 'haut' | 'haar' | 'none'

interface Stil {
  /** Füllung */
  f?: Rolle | string
  /** Linie */
  s?: Rolle | string
  /** Linienstärke (in Einheiten der viewBox) */
  w?: number
  /** Deckkraft */
  o?: number
  /** gestrichelt, z. B. '2 2' */
  dash?: string
}

export type Form =
  | ({ t: 'path'; d: string } & Stil)
  | ({ t: 'circle'; cx: number; cy: number; r: number } & Stil)
  | ({ t: 'ellipse'; cx: number; cy: number; rx: number; ry: number } & Stil)
  | ({ t: 'rect'; x: number; y: number; b: number; h: number; rx?: number } & Stil)
  | ({ t: 'line'; x1: number; y1: number; x2: number; y2: number } & Stil)
  | ({ t: 'polyline' | 'polygon'; p: string } & Stil)
  /** Gruppe mit SVG-Transformation, z. B. 'translate(10 20) scale(0.5)' */
  | { t: 'g'; tf: string; formen: Form[]; o?: number }

export interface Zeichnung {
  /** viewBox: [x, y, Breite, Höhe] */
  vb: [number, number, number, number]
  formen: Form[]
  /** Standard-Linienstärke, wenn eine Form keine eigene hat. */
  w?: number
}

export interface Palette extends Farben {
  tinte: string
  grau: string
  hellgrau: string
  papier: string
  haut: string
  haar: string
}

export const NEUTRAL = {
  tinte: '#1B2233',
  text: '#1B2233',
  leise: '#5A6376',
  sehrLeise: '#8A93A3',
  linie: '#8F98A8',
  rahmen: '#C9D0DA',
  haarlinie: '#DDE2E9',
  flaeche: '#F4F6F9',
  papier: '#FFFFFF',
  marke: '#2E3A9C',
}

export function palette(f: Farben): Palette {
  return {
    ...f,
    tinte: NEUTRAL.tinte,
    grau: '#9AA2B1',
    hellgrau: '#E4E8EE',
    papier: '#FFFFFF',
    haut: '#F3DCC8',
    haar: '#4A3B33',
  }
}

export function farbe(wert: string | undefined, p: Palette): string | undefined {
  if (!wert || wert === 'none') return wert === 'none' ? 'none' : undefined
  if (wert.startsWith('#')) return wert
  return (p as unknown as Record<string, string>)[wert] ?? wert
}

type IconMap = Record<string, Form[]>
const icons = ICONS as unknown as IconMap

export function hatIcon(name: string): boolean {
  return Object.prototype.hasOwnProperty.call(icons, name)
}

export const ICON_NAMEN: string[] = Object.keys(icons)

/** Piktogramm als Zeichnung (24er-Raster, Linie 2). */
export function iconZeichnung(name: string): Zeichnung {
  const formen = icons[name]
  if (!formen) return { vb: [0, 0, 24, 24], formen: [{ t: 'circle', cx: 12, cy: 12, r: 9, s: 'grau', dash: '2 2' }], w: 1.6 }
  return {
    vb: [0, 0, 24, 24],
    formen: formen.map((f) => ({ s: 'tinte', f: 'none', ...f, ...('f' in f && f.f === 'ink' ? { f: 'tinte' } : {}) }) as Form),
    w: 1.7,
  }
}

/** Löst einen Bild-Verweis ('icon:…', 'gesicht:…', 'figur:…', 'motiv:…') auf. */
export function bildZeichnung(id: BildId): Zeichnung {
  const [art, ...rest] = id.split(':')
  if (art === 'icon') return iconZeichnung(rest[0] ?? '')
  if (art === 'gesicht') {
    const g = rest[0] ?? 'neutral'
    return gesichtZeichnung(istGefuehl(g) ? g : 'neutral')
  }
  if (art === 'figur') return figurZeichnung(rest[0] ?? 'mia', rest[1], rest[2])
  if (art === 'motiv') return motivZeichnung(rest[0] ?? '')
  return iconZeichnung(id)
}

/** Prüft einen Bild-Verweis (für das Prüfskript). */
export function bildGueltig(id: BildId): boolean {
  const [art, name] = id.split(':')
  if (art === 'icon') return hatIcon(name ?? '')
  if (art === 'gesicht') return istGefuehl(name ?? '')
  if (art === 'figur' || art === 'motiv') return bildZeichnung(id).formen.length > 0
  return false
}

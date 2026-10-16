// ---------------------------------------------------------------------------
// „Blatt 2.0“ – Gestaltung nach Alter und Thema (Design-Umbau 16.10.2026).
//
//   C1–C2  Bilderbuch: farbige Motive statt Piktogramme, getönte Karten, großes Leitbild im Kopf
//   C3     lebendig: Motive, wo es eines gibt, sonst Duotone-Piktogramme
//   C4–ES  Magazin: Kopfband in der Bereichsfarbe, Duotone-Piktogramme, Jugendfiguren
//
// Die Bausteine lesen das aus `Ctx.design`; ohne Angabe (Lehrerseiten, Zusatzseiten) bleibt alles wie gehabt.
// Farben bleiben zart: in Schwarz-Weiß-Kopien soll nur Weiß bis Hellgrau entstehen, Linien und Text tragen den Kontrast.
// ---------------------------------------------------------------------------

import type { Blatt, Layout, Stufe } from '../typen'
import { STUFEN_REIHE, type Farben } from '../katalog'
import { jugendFiguren } from '../icon-motiv'

export type AlterStil = 'c1' | 'c2' | 'c3' | 'c4' | 'es'

export interface Design {
  alter: AlterStil
  /** farbige Motive statt Piktogramme (C1–C3) */
  motive: boolean
  /** Duotone-Piktogramme: Linie in Tinte, Flächen zart in Bereichsfarbe (C3–ES) */
  duotone: boolean
  /** ruhiger Magazin-Kopf, Kästen und Tabellen in der Bereichsfarbe (C4–ES) */
  magazin: boolean
  /** Kinderfigur → Jugendfigur (nur C4–ES) */
  figuren?: Map<string, string>
}

/** Altersstufe des Layouts: Das Layout der Stufe (oder der Fassung „Größer“) bestimmt den Stil; ‚mittel‘ gilt für C3 und C4. */
export function alterStil(layout: Layout, stufen: Stufe[]): AlterStil {
  if (layout === 'bild') return 'c1'
  if (layout === 'gross') return 'c2'
  if (layout === 'jugend') return 'es'
  const erste = [...stufen].sort((a, b) => STUFEN_REIHE.indexOf(a) - STUFEN_REIHE.indexOf(b))[0]
  return erste === 'C3' || erste === 'C2' || erste === 'C1' ? 'c3' : 'c4'
}

export function designVon(blatt: Blatt, layout: Layout, bausteineText: string): Design {
  const alter = alterStil(layout, blatt.stufen)
  const jung = alter === 'c1' || alter === 'c2' || alter === 'c3'
  return {
    alter,
    motive: jung,
    duotone: alter === 'c3' || alter === 'c4' || alter === 'es',
    magazin: !jung,
    figuren: jung ? undefined : jugendFiguren(bausteineText + ' ' + (blatt.bild ?? '')),
  }
}

// --- Farben -------------------------------------------------------------------------------------------

/** Farbe mit Weiß mischen (anteil 0 = weiß, 1 = volle Farbe). */
export function aufhellen(hex: string, anteil: number): string {
  const n = parseInt(hex.slice(1), 16)
  const k = (v: number) => Math.round(255 - (255 - v) * anteil).toString(16).padStart(2, '0')
  return `#${k((n >> 16) & 255)}${k((n >> 8) & 255)}${k(n & 255)}`
}

/** Zwei Farben mischen (t = 0 → a, t = 1 → b). */
export function mischen(a: string, b: string, t: number): string {
  const x = parseInt(a.slice(1), 16)
  const y = parseInt(b.slice(1), 16)
  const k = (s: number) => Math.round(((x >> s) & 255) * (1 - t) + ((y >> s) & 255) * t).toString(16).padStart(2, '0')
  return `#${k(16)}${k(8)}${k(0)}`
}

/** Farbverlauf einer Skala in der Bereichsfarbe: 0 = fast weiß … 1 = kräftig (tief). */
export function verlauf(f: Farben, t: number): string {
  return t < 0.5 ? mischen(aufhellen(f.mittel, 0.35), f.mittel, t * 2) : mischen(f.mittel, f.tief, (t - 0.5) * 2 * 0.85)
}

/** Wasserfarbe (Gläser, Wasser in Zeichnungen) – kühl, hell genug für Schwarz-Weiß. */
export const WASSER = { fuell: '#9CCBEA', hell: '#EAF4FB', linie: '#4F86B3' }

/** Zarte Töne für Sektoren (Netz): Rot, Orange, Gelb, Grün, Blau, Lila, Rosa, Türkis, Braun, Grau – hell, aber unterscheidbar. */
export const SEKTOR_TOENE = ['#F7D9D4', '#FAE3CC', '#F7EDC0', '#DCEBD2', '#D3E4F3', '#E5DBF0', '#F6D8E4', '#CFEAE6', '#EADBCB', '#E1E5EB']

/** Akzentfarben nach Thema: Gefühle – Wut rot, Angst lila, Trauer blau, Freude gelb, Ruhe grün (wie Gefühlsrad und Körperbild); Skills-Kurs
 *  (ES) – Wut warm, Freundschaft und Liebe weich, Gefühle regulieren ruhig grün. */
const GEFUEHL_AKZENT: Record<string, Farben> = {
  wut: { tief: '#B8402F', mittel: '#EBB9B0', zart: '#FBEDEA' },
  angst: { tief: '#6E4A9E', mittel: '#CFC0E3', zart: '#F2EEF8' },
  trauer: { tief: '#2F5F99', mittel: '#B5CBE6', zart: '#EBF1F9' },
  freude: { tief: '#8F6A00', mittel: '#F0DA8E', zart: '#FCF6DD' },
  beruhigen: { tief: '#3F7A52', mittel: '#BBD9C4', zart: '#EAF4EE' },
  /** Skills-Kurs: Freundschaft und Beziehungen – weich, ein warmes Rosé */
  freundschaft: { tief: '#A64A72', mittel: '#E6BDD0', zart: '#FAEEF4' },
}

/** Akzentfarben eines Blatts, wenn sein Thema eine eigene Farbe hat (sonst undefined: Bereichsfarbe). */
export function akzentFarben(blatt: Pick<Blatt, 'bereich' | 'thema'>): Farben | undefined {
  if (blatt.bereich === 'gefuehle') return GEFUEHL_AKZENT[blatt.thema]
  if (blatt.bereich === 'skills') {
    if (blatt.thema === 'wut') return GEFUEHL_AKZENT.wut
    if (blatt.thema === 'freundschaft' || blatt.thema === 'liebe') return GEFUEHL_AKZENT.freundschaft
    if (blatt.thema === 'regulieren') return GEFUEHL_AKZENT.beruhigen
  }
  return undefined
}

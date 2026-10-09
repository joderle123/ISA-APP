// Passgenau – kleine Hilfen ohne Abhängigkeiten (Browser und Node).
import type { Layout, Stufe } from '../typen'

/** FNV-1a 32 Bit als 8 Hex-Zeichen: Prüfsumme `h` und fester Zufallswert. */
export function hash8(s: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(16).padStart(8, '0')
}

/** Fester Zufallswert in [0, 1) aus einem Text – gleiche Eingabe, gleicher Wert. */
export function hash01(s: string): number {
  return parseInt(hash8(s), 16) / 4294967296
}

export const STUFEN: Stufe[] = ['C1', 'C2', 'C3', 'C4', 'ES']

/** Stufe aus dem Alter (wie zyklusAusAlter im Hub): bis 5 C1, 6–7 C2, 8–9 C3, 10–11 C4, ab 12 ES. */
export function stufeAusAlter(alter: number): Stufe {
  return alter <= 5 ? 'C1' : alter <= 7 ? 'C2' : alter <= 9 ? 'C3' : alter <= 11 ? 'C4' : 'ES'
}

export function layoutAusStufe(s: Stufe): Layout {
  return s === 'C1' ? 'bild' : s === 'C2' ? 'gross' : s === 'ES' ? 'jugend' : 'mittel'
}

/** Altersband einer Stufe in Jahren. */
export const STUFE_ALTER: Record<Stufe, [number, number]> = { C1: [3, 5], C2: [6, 7], C3: [8, 9], C4: [10, 11], ES: [12, 18] }

/** Kleinster Abstand zwischen einer Stufe und einer Liste von Stufen (0 = gleich). */
export function stufenAbstand(ref: Stufe, stufen: Stufe[]): number {
  const i = STUFEN.indexOf(ref)
  let best = 9
  for (const s of stufen) best = Math.min(best, Math.abs(STUFEN.indexOf(s) - i))
  return best
}

/** Tage zwischen zwei ISO-Daten (b − a). */
export function tageZwischen(a: string, b: string): number {
  return Math.round((Date.parse(b.slice(0, 10)) - Date.parse(a.slice(0, 10))) / 86400000)
}

/** Wörter eines Texts (ohne Satzzeichen). */
export function woerter(s: string): number {
  return s.split(/\s+/).filter((w) => /[\p{L}\d]/u.test(w)).length
}

/** Kleinschreibung ohne Akzente, ß → ss (wie norm() in material.js). */
export function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
}

export function runde(x: number, stellen = 2): number {
  const f = 10 ** stellen
  return Math.round(x * f) / f
}

/** Altersband für Ereignisse und „Aus der Praxis“. */
export function altersband(alter: number): string {
  return alter <= 5 ? '3–5' : alter <= 7 ? '6–7' : alter <= 10 ? '8–10' : alter <= 13 ? '11–13' : '14–16+'
}

/** ELDiB-Code („V-21“, „SOZ-14“) – nicht „kompetenz:…“ (Schwerpunkt bei dünnen Daten). */
export function istEldib(code: string): boolean {
  return /^[A-Z]{1,4}-\d{1,3}$/.test(code)
}

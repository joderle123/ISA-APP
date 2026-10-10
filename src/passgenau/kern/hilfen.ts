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

/** Satzgrenze ohne Abkürzungen („z. B.“, „d. h.“, „u. a.“, „ca.“, „bzw.“, „Nr.“, „S.“, „p. ex.“): Blind-Bewertung 9.10. –
 *  „(z.“ stand als abgeschnittener Satz im Planblatt. */
export const SATZ_GRENZE = /(?<!(?:^|[\s(„«])(?:[A-Za-zäöüÄÖÜ]|ca|bzw|vgl|ggf|usw|etc|evtl|inkl|Nr|Min|max|min|bspw|ex|cf|env|Mme|ev|resp)\.)(?<=[.!?])\s+/
/** Wie SATZ_GRENZE, aber nur vor einem Satzanfang (Großbuchstabe, Anführungszeichen, Klammer). */
export const SATZ_GRENZE_GROSS = /(?<!(?:^|[\s(„«])(?:[A-Za-zäöüÄÖÜ]|ca|bzw|vgl|ggf|usw|etc|evtl|inkl|Nr|Min|max|min|bspw|ex|cf|env|Mme|ev|resp)\.)(?<=[.!?])\s+(?=[A-ZÄÖÜ„«(])/
/** Wie SATZ_GRENZE, trennt zusätzlich nach „;“ (Listen in der Vorbereitung). */
export const SATZ_GRENZE_SEMI = /(?<!(?:^|[\s(„«])(?:[A-Za-zäöüÄÖÜ]|ca|bzw|vgl|ggf|usw|etc|evtl|inkl|Nr|Min|max|min|bspw|ex|cf|env|Mme|ev|resp)\.)(?<=[.;!?])\s+/

/** Figuren in Übungen tragen manchmal den Vornamen des Kindes („Mia ist ärgerlich“, Blatt „Mia und die Spielregel“) – das
 *  Kind fühlt sich gemeint (Blind-Bewertung 9). Der Name wird durch einen anderen ersetzt, der im Text noch nicht vorkommt. */
const ERSATZ_NAMEN = ['Nora', 'Lio', 'Jana', 'Ben', 'Lina', 'Timo', 'Ella', 'Max', 'Sara', 'Leo']
/** Figuren der Übungen – heißen anders, wenn sie dem Vornamen ähneln (Blind-Bewertung 10: „Tom“ auf dem Blatt für Tomás) */
const FIGUREN = ['Tom', 'Mia', 'Noah', 'Lea', 'Sami', 'Amira', 'Ben', 'Lina', 'Leo', 'Nora', 'Emma', 'Paul', 'Luca', 'Yara', 'Ali', 'Max', 'Sara', 'Elif', 'Jonas', 'Finn', 'Timo', 'Ella', 'Lio', 'Jana', 'Mila', 'Nico', 'Luis', 'Anna', 'Tim', 'Lukas']
const ohneAkzent = (t: string) => t.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
function aehnlich(a: string, b: string): boolean {
  const x = ohneAkzent(a)
  const y = ohneAkzent(b)
  // … auch kurze Namen mit gleichem Anfang (Blind-Bewertung 11: „Noah“ neben dem Kind „Noé“)
  return x === y || (Math.min(x.length, y.length) >= 3 && (x.startsWith(y) || y.startsWith(x) || x.slice(0, 3) === y.slice(0, 3))) || (Math.min(x.length, y.length) <= 4 && x.slice(0, 2) === y.slice(0, 2))
}
const wortRe = (w: string) => new RegExp(`(?<!\\p{L})${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'gu')
export function ohneEigenenNamen<T>(x: T, vorname: string | null | undefined): T {
  const n = (vorname ?? '').trim()
  if (n.length < 2 || x == null) return x
  let s = JSON.stringify(x)
  const namen = [n, ...FIGUREN.filter((f) => f !== n && aehnlich(f, n))].filter((w) => wortRe(w).test(s))
  if (!namen.length) return x
  for (const w of namen) {
    const ersatz = ERSATZ_NAMEN.find((e) => !aehnlich(e, n) && !s.includes(e)) ?? 'Nora'
    s = s.replace(wortRe(w), ersatz)
  }
  return JSON.parse(s) as T
}

export type UmwArt = 'laenge' | 'hohlmass' | 'masse' | 'flaeche' | 'volumen'
export interface Abakus { titel: string; einheiten: string[]; spalten: number; namen: string[]; neben?: Record<string, string> }
export const ABAKUS: Record<UmwArt, Abakus>
export interface Eintrag { art: UmwArt; ziffern: Record<number, string>; nullen: number[]; kommaNach: number; spalten: number; ergebnis: string }
export function artVon(einheit: string, art?: string): UmwArt | null
export function eintragen(aufgabe: string, artWunsch?: string): Eintrag | null
export function passt(e: Eintrag | null, loesung: string): boolean
export interface UmwZeile { text: string; nr: number; beispiel: boolean; e: Eintrag }
export function zerlegePaeckchen(items: string[]): { rest: { text: string; nr: number }[]; gruppen: { art: UmwArt; zeilen: UmwZeile[] }[] }

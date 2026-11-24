// Sprache der REAL-TALK-Hefte (Auftrag 24.11.2026: „übersetze REAL TALK 01 auch auf Französisch“).
// Die festen Texte im Bauplan (bau.tsx, stunde-bau.ts) stehen als Paar L('deutsch', 'französisch') direkt an ihrer Stelle.
// Gebaut wird Französisch mit der Kennung „…-fr“ (z. B. m1-fr → inhalt/m1-fr.ts). Deutsch bleibt unverändert.
export type Sprache = 'de' | 'fr'
let aktuell: Sprache = 'de'
export const setzeSprache = (s: Sprache) => { aktuell = s }
export const sprache = (): Sprache => aktuell
/** fester Text in der aktuellen Sprache */
export const L = (de: string, fr: string): string => (aktuell === 'fr' ? fr : de)

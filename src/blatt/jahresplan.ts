// ---------------------------------------------------------------------------
// Jahresplan Spielschule (Cycle 1): das Drei-Jahres-Rad. Feste Bausteine, die
// das Planungsskript (scripts/spielschule-jahresplan.ts) und das PDF
// (src/blatt/pdf/Jahresplan.tsx) gemeinsam nutzen: Abschnitte zwischen den
// Ferien, Trimester, Ferienblöcke, Feste und Anlässe, Themenfarben und die
// Buchstaben der Lernbereiche. Welche Einheit in welcher Woche steht, steht in
// src/data/spielschule-jahresplan.json (vom Skript erzeugt, nur Einheiten-ids).
//
// Ferien und Feste stehen bewusst ohne genaue Daten: Der Schulkalender des
// MENJE legt sie jedes Jahr neu fest, bewegliche Feste hängen an Ostern.
// ---------------------------------------------------------------------------

import type { DomaeneId } from './typen'

export type JahrId = 'A' | 'B' | 'C'
export const JAHRE: JahrId[] = ['A', 'B', 'C']

/** Themenwochen je Schuljahr (Mitte September bis Mitte Juli, ohne Ferien). */
export const WOCHEN = 36

/** Abschnitte zwischen zwei Ferien. `zeit`: ungefähre Lage, ohne genaue Daten. */
export interface Abschnitt {
  nr: number
  von: number
  bis: number
  zeit: string
}

export const ABSCHNITTE: Abschnitt[] = [
  { nr: 1, von: 1, bis: 6, zeit: 'Mitte Sept. – Ende Okt.' },
  { nr: 2, von: 7, bis: 13, zeit: 'Nov. – Mitte Dez.' },
  { nr: 3, von: 14, bis: 19, zeit: 'Jan. – Mitte Feb.' },
  { nr: 4, von: 20, bis: 24, zeit: 'Ende Feb. – vor Ostern' },
  { nr: 5, von: 25, bis: 30, zeit: 'nach Ostern – Mai' },
  { nr: 6, von: 31, bis: 36, zeit: 'Juni – Mitte Juli' },
]

/** Ungefährer Monat je Woche (Rentrée Mitte September, Ostern Ende März/April). */
export const MONAT_DER_WOCHE: string[] = [
  'Sept.', 'Sept.', 'Sept.', 'Okt.', 'Okt.', 'Okt.',
  'Nov.', 'Nov.', 'Nov.', 'Nov.', 'Dez.', 'Dez.', 'Dez.',
  'Jan.', 'Jan.', 'Jan.', 'Jan.', 'Feb.', 'Feb.',
  'Feb.', 'März', 'März', 'März', 'März',
  'Apr.', 'Apr.', 'Apr.', 'Mai', 'Mai', 'Mai',
  'Juni', 'Juni', 'Juni', 'Juni', 'Juli', 'Juli',
]

/** Die drei Trimester des Fondamental: bis Weihnachten, bis Ostern, bis zum Sommer. */
export const TRIMESTER = [
  { nr: 1, von: 1, bis: 13, zeit: 'Sept. – Dez.' },
  { nr: 2, von: 14, bis: 24, zeit: 'Jan. – Ostern' },
  { nr: 3, von: 25, bis: 36, zeit: 'Ostern – Juli' },
]

/** Ferienblöcke nach Woche `nach` (Lage und Länge ungefähr; Daten im Schulkalender des MENJE). */
export interface Ferien {
  id: string
  name: string
  nach: number
  /** Länge in Wochen (Sommer: Platz im Kalenderband) */
  dauer: number
  zeit: string
  /** Feiertage in den Ferien */
  inne?: string
}

export const FERIEN: Ferien[] = [
  { id: 'toussaint', name: 'Toussaint', nach: 6, dauer: 1, zeit: 'Ende Okt. / Anfang Nov. · 1 Woche', inne: 'Allerheiligen (1.11.)' },
  { id: 'weihnachten', name: 'Weihnachten', nach: 13, dauer: 2, zeit: 'Ende Dez. / Anfang Jan. · 2 Wochen', inne: 'Chrëschtdag, Neijoer' },
  { id: 'fuesvakanz', name: 'Fuesvakanz', nach: 19, dauer: 1, zeit: 'Februar · 1 Woche', inne: 'oft um Fuesent' },
  { id: 'ouschtervakanz', name: 'Ouschtervakanz', nach: 24, dauer: 2, zeit: 'März / April um Ostern · 2 Wochen', inne: 'Ouschteren, meist auch Ostermontag (Éimaischen)' },
  { id: 'paeischtvakanz', name: 'Päischtvakanz', nach: 30, dauer: 1, zeit: 'Mai / Juni um Pfingsten · 1 Woche', inne: 'meist mit Pfingstmontag' },
  { id: 'sommer', name: 'Sommerferien', nach: 36, dauer: 8, zeit: 'Mitte Juli bis Mitte September', inne: 'Schueberfouer (Ende Aug. – Anfang Sept.)' },
]

/** Feste und Anlässe. `art`: fest = festes Datum, beweglich = hängt an Ostern, rueckblick = liegt in den Ferien,
 *  anlass = Welttag, nur im Jahr der passenden Einheit markiert. Feste stehen in jedem Jahr im Raster; die ganze
 *  Einheit dazu steht einmal im Rad (Kleeschen: jedes Jahr). */
export interface Fest {
  id: string
  name: string
  datum: string
  woche: number
  art: 'fest' | 'beweglich' | 'rueckblick' | 'anlass'
  /** Die Einheit zum Fest */
  einheit: string
  /** So findet man die Woche */
  regel: string
}

export const FESTE: Fest[] = [
  { id: 'schueberfouer', name: 'Schueberfouer', datum: 'Ende Aug. – Anfang Sept.', woche: 2, art: 'rueckblick', einheit: 'sp-schueberfouer', regel: 'Liegt in den Sommerferien: als Rückblick nach Schulbeginn (Woche 2).' },
  { id: 'sprachen', name: 'Tag der Sprachen', datum: '26. September', woche: 2, art: 'anlass', einheit: 'sp-sprachen-geschichtensack', regel: 'Europäischer Tag der Sprachen: Woche um den 26.9.' },
  { id: 'kinderrechte', name: 'Tag der Kinderrechte', datum: '20. November', woche: 9, art: 'anlass', einheit: 'sp-kinderrechte', regel: 'Internationaler Tag der Kinderrechte: Woche um den 20.11.' },
  { id: 'kleeschen', name: 'Kleeschen', datum: '6. Dezember', woche: 11, art: 'fest', einheit: 'sp-kleeschen', regel: 'Woche vor dem 6.12. – der Tag selbst ist im Fondamental in der Regel schulfrei.' },
  { id: 'liichtmessdag', name: 'Liichtmëssdag', datum: '2. Februar', woche: 18, art: 'fest', einheit: 'sp-laternen', regel: 'Woche um den 2.2.: Laternen basteln, Lichterlied, am Abend von Tür zu Tür.' },
  { id: 'fuesent', name: 'Fuesent', datum: '47 Tage vor Ostern (Fastnacht)', woche: 19, art: 'beweglich', einheit: 'sp-fuesend', regel: 'Woche vor Fuesent. Fällt Fuesent in die Fuesvakanz: die Woche vor den Ferien.' },
  { id: 'buergbrennen', name: 'Buergbrennen', datum: '1. Fastensonntag, 6 Wochen vor Ostern', woche: 20, art: 'beweglich', einheit: 'sp-buergbrennen', regel: 'Woche vor dem Buergsonndeg; liegt er in den Ferien: danach als Rückblick.' },
  { id: 'eimaischen', name: 'Éimaischen', datum: 'Ostermontag', woche: 24, art: 'beweglich', einheit: 'sp-eimaischen', regel: 'Ostermontag liegt meist in der Ouschtervakanz: Einheit in der Woche davor.' },
  { id: 'buch', name: 'Welttag des Buches', datum: '23. April', woche: 25, art: 'anlass', einheit: 'sp-buecherreise', regel: 'Welttag des Buches: Woche um den 23.4. (Bibliothek 3 Wochen vorher anfragen).' },
  { id: 'nationalfeierdag', name: 'Nationalfeierdag', datum: '23. Juni', woche: 33, art: 'fest', einheit: 'sp-nationalfeierdag', regel: 'Der 23.6. ist schulfrei: Einheit in der Woche davor.' },
]

/** Feiertage, die eine Woche verkürzen (Daten im Schulkalender prüfen). */
export const FEIERTAGE: { name: string; regel: string }[] = [
  { name: '1. Mai', regel: 'Tag der Arbeit' },
  { name: '9. Mai', regel: 'Europatag' },
  { name: 'Christi Himmelfahrt', regel: '39 Tage nach Ostern (Donnerstag)' },
  { name: 'Pfingstmontag', regel: '50 Tage nach Ostern, meist in der Päischtvakanz' },
  { name: '23. Juni', regel: 'Nationalfeierdag' },
]

/** Einheiten, die jedes Jahr in derselben Woche stehen (neue Kinder, Kleeschen, Übergang in den Cycle 2). */
export const ANKER: { einheit: string; woche: number; grund: string }[] = [
  { einheit: 'sp-willkommen', woche: 1, grund: 'Jedes Jahr kommen neue Kinder.' },
  { einheit: 'sp-kleeschen', woche: 11, grund: 'Kleeschen kommt jedes Jahr.' },
  { einheit: 'sp-bald-schulkind', woche: 35, grund: 'Jedes Jahr wechseln die Großen in den Cycle 2.' },
]

/** Joker-Arten: Einheiten, die nicht im Rad stehen und bei Gelegenheit eine Woche ersetzen. */
export const JOKER_ARTEN: { id: JokerArt; name: string; text: string; bild: string }[] = [
  { id: 'wetter', name: 'Wetter-Joker', text: 'Nur, wenn das Wetter mitspielt – dann sofort einschieben.', bild: 'icon:cloud-snow' },
  { id: 'gelegenheit', name: 'Gelegenheit', text: 'Wenn sich ein Besuch, ein Ausflug oder ein Anlass ergibt.', bild: 'icon:map-pin' },
  { id: 'wunsch', name: 'Wunsch der Kinder', text: 'Wenn die Kinderkonferenz ({sp-kinderkonferenz}) sich das Thema wünscht.', bild: 'icon:friends' },
  { id: 'vertiefung', name: 'Vertiefung', text: 'Wenn ein Thema die Kinder weiter trägt.', bild: 'icon:search' },
]
export type JokerArt = 'wetter' | 'gelegenheit' | 'wunsch' | 'vertiefung'

/** Inhalt von src/data/spielschule-jahresplan.json */
export interface JahresplanDaten {
  hinweis: string
  wochen: number
  /** je Jahr die Einheiten-ids der Wochen 1 … 36 */
  jahre: Record<JahrId, string[]>
  /** Einheiten, die nicht im Rad stehen */
  joker: { einheit: string; art: JokerArt; grund: string; passt: string }[]
}

/** Farbe je Spielschul-Thema (Balken im Raster, Segmente im Rad). Dazu immer das Themenbild – auch in
 *  Schwarz-Weiß-Kopien lesbar. */
export const THEMA_FARBE: Record<string, string> = {
  ich: '#2A7F86',
  gefuehle: '#BE3F67',
  koerper: '#C0603F',
  familie: '#9C7424',
  herbst: '#C8621A',
  winter: '#4A82C0',
  fruehling: '#5A9A40',
  sommer: '#C9900E',
  tiere: '#7A862C',
  essen: '#D24A3A',
  farben: '#5157C2',
  unterwegs: '#5D7891',
  feste: '#B0368B',
  fantasie: '#7D59A8',
  kunst: '#D06A90',
  sprachen: '#17958A',
  forschen: '#2E7A60',
}

/** Kurzbuchstabe je Lernbereich (Reihenfolge wie im Plan d'études): Mathe, Sprache, Welt, Psychomotorik,
 *  Kreativer Ausdruck, Zusammenleben. */
export const DOMAENE_KURZ: Record<DomaeneId, string> = {
  'logique-math': 'M',
  langage: 'S',
  monde: 'W',
  psychomotricite: 'P',
  expression: 'K',
  'vivre-ensemble': 'Z',
}

export function abschnittVon(woche: number): Abschnitt {
  return ABSCHNITTE.find((a) => woche >= a.von && woche <= a.bis)!
}

export function trimesterVon(woche: number): number {
  return TRIMESTER.find((t) => woche >= t.von && woche <= t.bis)!.nr
}

/** Feste und Anlässe einer Woche in einem Jahr: Feste immer, Anlässe nur, wenn ihre Einheit in dieser Woche steht. */
export function festeDerWoche(woche: number, einheit: string): Fest[] {
  return FESTE.filter((f) => f.woche === woche && (f.art !== 'anlass' || f.einheit === einheit))
}

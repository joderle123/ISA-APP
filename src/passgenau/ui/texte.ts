// Passgenau – Bezeichnungen der Oberfläche (Rollen, Phasen, Formate, Tagesform, Interessen, Themen).
// Nur Anzeige: Schlüssel kommen aus dem Vertrag (src/passgenau/typen.ts) und vom Hub.
import type { Bogen, FormatWunsch, Layout, Profil, Rolle, Schwerpunkt, Stufe, Tagesform } from '../typen'
import { eldibGoalById } from '../../data/taxonomy'

export const ROLLE_NAME: Record<Rolle | 'blatt' | 'wahl', string> = {
  ankommen: 'Ankommen',
  einstieg: 'Einstieg',
  kern: 'Kern',
  uebung: 'Übung',
  bewegung: 'Bewegung',
  spiel: 'Spiel',
  regulation: 'Regulation',
  reflexion: 'Reflexion',
  abschluss: 'Abschluss',
  transfer: 'Transfer',
  blatt: 'Übung · Blatt',
  wahl: 'Wahlkarte',
}

export const PHASE_NAME: Record<Bogen | 'leicht', string> = {
  wahrnehmen: 'Wahrnehmen',
  verstehen: 'Verstehen',
  ueben: 'Üben',
  uebertragen: 'Übertragen',
  reflektieren: 'Rückblick & Feiern',
  leicht: 'Heute leicht',
}
export const PHASE_KURZ: Record<Bogen | 'leicht', string> = {
  wahrnehmen: 'Wahrn.',
  verstehen: 'Verst.',
  ueben: 'Üben',
  uebertragen: 'Übertr.',
  reflektieren: 'Rückbl.',
  leicht: 'leicht',
}

/** Bogen je Anzahl Sitzungen (Konzept 5.6) – nur zur Anzeige „So wird die Folge“ */
export const BOGEN_ANZEIGE: Record<number, Bogen[]> = {
  1: ['ueben'],
  3: ['verstehen', 'ueben', 'uebertragen'],
  4: ['verstehen', 'ueben', 'uebertragen', 'reflektieren'],
  6: ['wahrnehmen', 'verstehen', 'ueben', 'ueben', 'uebertragen', 'reflektieren'],
  8: ['wahrnehmen', 'verstehen', 'ueben', 'ueben', 'ueben', 'uebertragen', 'uebertragen', 'reflektieren'],
  10: ['wahrnehmen', 'verstehen', 'verstehen', 'ueben', 'ueben', 'ueben', 'uebertragen', 'uebertragen', 'uebertragen', 'reflektieren'],
}

export const FORMAT_NAME: Record<string, string> = {
  schreiben: 'Schreibaufgaben',
  ankreuzen: 'Ankreuzen',
  malen: 'Malen',
  basteln: 'Basteln',
  lesen: 'Lesen',
  geschichte: 'Geschichten',
  comic: 'Comics',
  gespraech: 'Gespräch',
  rollenspiel: 'Rollenspiel',
  bewegung: 'Bewegung',
  spiel: 'Spiele',
  musik: 'Musik',
  sinne: 'Sinne',
  atmen: 'Atmen & Ruhe',
  denkmodell: 'Denkmodelle',
  plan: 'Pläne',
  karten: 'Bildkarten',
  digital: 'Digital',
  skala: 'Skalen',
}

export const FORMAT_WUNSCH: [FormatWunsch, string][] = [
  ['bewegung', 'mehr Bewegung'],
  ['kreativ', 'mehr Kreatives'],
  ['gespraech', 'mehr Gespräch'],
  ['spiel', 'mehr Spiel'],
  ['wenig-schreiben', 'wenig Schreiben'],
]

export const SCHWERPUNKTE: [Schwerpunkt, string][] = [
  ['verstehen', 'Verstehen'],
  ['ueben', 'Üben'],
  ['uebertragen', 'Übertragen in den Alltag'],
  ['selbstbild', 'Selbstbild'],
  ['beziehung', 'Beziehung'],
]

export const TAGESFORM: [Tagesform, string, string][] = [
  ['aufgedreht', 'aufgedreht', 'lauf'],
  ['muede', 'müde', 'wolke'],
  ['traurig', 'traurig', 'herz'],
  ['wuetend', 'wütend', 'blitz'],
  ['aufgewuehlt', 'aufgewühlt', 'welle'],
  ['aengstlich', 'ängstlich', 'augen'],
  ['rueckzug', 'zieht sich zurück', 'person'],
  ['will-nicht', 'will nicht', 'x'],
]
export const TF_NAME = Object.fromEntries(TAGESFORM.map(([k, n]) => [k, n])) as Record<Tagesform, string>

export const LAYOUT_NAME: Record<Layout, string> = { bild: 'Bildblatt', gross: 'groß', mittel: 'mittel', jugend: 'jugendgerecht' }
export const STUFEN: Stufe[] = ['C1', 'C2', 'C3', 'C4', 'ES']
export const LAYOUT_FUER_STUFE: Record<Stufe, Layout> = { C1: 'bild', C2: 'gross', C3: 'mittel', C4: 'mittel', ES: 'jugend' }

export const SPRACHE_NAME: Record<string, string> = { de: 'Deutsch', fr: 'Französisch', pt: 'Portugiesisch', lb: 'Luxemburgisch' }

export const LESEN = ['kaum', 'wenig', 'mittel', 'viel']
export const SCHREIBEN = ['nichts', 'Wörter', 'kurz', 'Sätze']
export const BILD = ['', 'normal', 'viele', 'fast nur']
export function zugangText(z: Profil['zugang']): string {
  return (
    ['kaum Text', 'eher wenig Text', 'mittel viel Text', 'viel Text'][z.lesen] +
    ' · ' +
    ['kein Schreiben', 'wenig Schreiben', 'kurze Sätze', 'Sätze schreiben'][z.schreiben] +
    ' · ' +
    ['', 'Bilder normal', 'viele Bilder', 'fast nur Bilder'][z.bild]
  )
}

/** Feste Interessen-Liste (Konzept 3.2: 40 Chips, einmal angeklickt bleiben sie beim Kind) – Schlüssel wie im Hub
 *  (hub-quellen/passgenau.js INTERESSEN, `hallo.interessen`) */
export const INTERESSEN: [string, string][] = [
  ['fussball', 'Fußball'], ['tiere', 'Tiere'], ['pferde', 'Pferde'], ['hunde', 'Hunde'], ['katzen', 'Katzen'],
  ['zeichnen', 'Zeichnen'], ['basteln', 'Basteln'], ['bauen', 'Bauen & Lego'], ['musik', 'Musik'], ['singen', 'Singen'],
  ['tanzen', 'Tanzen'], ['gaming', 'Gaming'], ['natur', 'Natur'], ['kochen', 'Kochen & Backen'], ['autos', 'Autos & Fahrzeuge'],
  ['weltall', 'Weltall'], ['dinosaurier', 'Dinosaurier'], ['superhelden', 'Superhelden'], ['lesen', 'Bücher & Geschichten'], ['comics', 'Comics'],
  ['sport', 'Sport'], ['schwimmen', 'Schwimmen'], ['radfahren', 'Radfahren'], ['klettern', 'Klettern'], ['basketball', 'Basketball'],
  ['theater', 'Theater'], ['fotografieren', 'Fotografieren'], ['technik', 'Technik'], ['roboter', 'Roboter'], ['experimente', 'Experimente'],
  ['meer', 'Meer & Fische'], ['insekten', 'Insekten'], ['garten', 'Garten'], ['mode', 'Mode'], ['zaubern', 'Zaubern'],
  ['puzzles', 'Puzzles & Rätsel'], ['brettspiele', 'Brettspiele'], ['feuerwehr', 'Feuerwehr'], ['ritter', 'Ritter & Burgen'], ['filme', 'Filme & Serien'],
]
export const INTERESSE_NAME = Object.fromEntries(INTERESSEN) as Record<string, string>
export function interesseName(k: string): string {
  return INTERESSE_NAME[k] ?? k.charAt(0).toUpperCase() + k.slice(1)
}

/** Themen-Schlüssel (wie material.js im Hub) → Anzeige */
export const THEMA_NAME: Record<string, string> = {
  wut: 'Wut & Impulse',
  angst: 'Angst & Sorgen',
  freundschaft: 'Freundschaft & Streit',
  trauer: 'Trauer & Verlust',
  familie: 'Familie',
  schule: 'Schule & Lernen',
  mobbing: 'Ausgrenzung & Mobbing',
  selbstwert: 'Selbstwert',
  konzentration: 'Konzentration',
  medien: 'Handy & Medien',
  motivation: 'Motivation',
  pruefung: 'Prüfungen',
  koerper: 'Körper',
  schlaf: 'Schlaf & Müdigkeit',
  rueckzug: 'Rückzug',
  ankommen: 'Ankommen & Sprache',
  regeln: 'Regeln & Grenzen',
  gefuehle: 'Gefühle',
  stress: 'Stress',
  veraenderung: 'Veränderung',
  beziehung: 'Beziehung',
}
export function themaName(k: string): string {
  return THEMA_NAME[k] ?? k.charAt(0).toUpperCase() + k.slice(1)
}

export const THEMA_ART: Record<string, string> = {
  vorfall: 'Vorfall',
  notiz: 'Notiz',
  beobachtung: 'Beobachtung',
  gespraech: 'Gespräch',
  reunion: 'Réunion',
  screening: 'Screening',
  klassenbuch: 'Klassenbuch',
}

export const VORSICHT_NAME: Record<string, [string, string]> = {
  familie: ['Familie', 'Fragen zur Familie nur „wenn du magst“'],
  trauer: ['Trauer', 'keine Geschichten über Trennung oder Tod'],
  koerper: ['Körper', 'keine Übungen mit Berührung oder Körperbildern'],
  heikel: ['Heikles Thema', 'nie automatisch als Stundenthema'],
}

export const DAUMEN_GRUENDE: [import('../typen').DaumenGrund, string][] = [
  ['zu-lang', 'zu lang'],
  ['zu-kindlich', 'zu kindlich'],
  ['zu-schwer', 'zu schwer'],
  ['passt-nicht', 'passt nicht zum Kind'],
  ['mag-nicht', 'mag ich nicht'],
]


/** Häufige Förderziele für „Ohne Kind planen“ (Codes aus dem ELDiB-Katalog) */
export const ZIELE_OHNE_KIND = ['V-10', 'V-15', 'V-18', 'V-21', 'V-22', 'K-12', 'K-17', 'K-26', 'K-31', 'SOZ-14', 'SOZ-19', 'SOZ-32', 'SOZ-34', 'SOZ-37']

/** „V-21“ → „Kontrolle“ (Kurzname aus dem ELDiB-Katalog) */
export function zielKurz(code: string): string {
  return eldibGoalById.get(code)?.label ?? ''
}

/** ISO-Datum → „2.10.“ */
export function datumKurz(iso?: string | null): string {
  if (!iso) return ''
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  return m ? `${+m[3]}.${+m[2]}.` : iso
}
export function heuteIso(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
export function altersband(alter: number): string {
  const v = Math.max(3, alter - 1)
  return `${v}-${alter + 1}`
}

export const QUELLE_ZIEL: Record<string, string> = {
  pei: 'Förderziel aus dem PEI',
  eldib: 'aus der ELDiB-Einschätzung',
  vorgemerkt: 'vorgemerkt aus Beobachtungen',
  andere: 'anderes Ziel',
}

/** Sozialform (Aufgabe 151) */
export const SOZIALFORM_NAME: Record<'einzeln' | 'zu-zweit' | 'kleingruppe', string> = { einzeln: 'Einzel', 'zu-zweit': 'zu zweit', kleingruppe: 'Kleingruppe' }

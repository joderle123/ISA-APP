// SOLO – Hefte für die Bezugszeit (Einzelarbeit mit einem Jugendlichen). Gleiche Gestaltung wie REAL TALK,
// aber aus Bausteinen: Jede Seite ist eine Liste von Blöcken. Texte: **fett**, ==markiert==.
import type { Clip, Frage } from './typen'

export interface Karte { titel: string; icon: string; zeilen: string[]; eigen?: string }

export type Block =
  /** Fließtext */
  | { art: 'text'; x: string[] }
  /** schwarze Box mit nummerierten Punkten (z. B. „Der Deal“) */
  | { art: 'regeln'; titel: string; punkte: string[] }
  /** Kasten mit Text (hell oder Akzentfarbe) */
  | { art: 'kasten'; titel?: string; label?: string; x: string; akzent?: boolean; linien?: number }
  /** Aufgaben-Box; `band` ist das kleine Etikett darüber, sonst bekommt die Box einen Buchstaben (A, B …) */
  | { art: 'fragen'; titel: string; wie?: string; zeit?: string; kontext?: string; band?: [string, string]; fragen: Frage[] }
  /** kurze Geschichte mit einer erfundenen Person */
  | { art: 'szene'; bild: string; name: string; text: string; frage: string }
  /** drei (oder sechs) Kästen */
  | { art: 'fakten'; titel: string; fakten: { t: string; x: string }[] }
  /** Video mit QR-Code – nur geprüfte Links */
  | { art: 'clip'; clip: Clip }
  /** ein Satz in Handschrift, optional mit Schreiblinien */
  | { art: 'marker'; label: string; x: string; linien?: number }
  /** Experiment bis zum nächsten Mal: Wette vorher, Ergebnis nachher */
  | { art: 'experiment'; titel: string; x: string }
  /** Karten für die Tasche (86 × 55 mm) */
  | { art: 'karten'; karten: Karte[] }
  /** Gesprächsfragen in drei Tiefen – der Jugendliche wählt die Stufe */
  | { art: 'tiefe'; fragen: [string[], string[], string[]] }
  /** Logbuch: eine Zeile je Bezugszeit */
  | { art: 'logbuch'; zeilen: number }
  /** Schlusszeile: Wie war es? Datum */
  | { art: 'check' }
  /** zwei Spalten */
  | { art: 'zwei'; links: Block[]; rechts: Block[] }

export interface SoloSeite { titel: string; unter: string; sticker?: string; bloecke: Block[] }

export interface QuizFrage { f: string; o: string[]; r: number; warum?: string }

export interface Solo {
  id: string
  /** '03' */
  nr: string
  datei: string
  reihe: 'Start' | 'Thema'
  thema: string
  headline: string
  farbe: string
  stand: string
  bild: string
  sticker: string
  /** Seite 1 hat den großen Kopf; Titel und Unterzeile der ersten Seite werden nicht gedruckt */
  seiten: SoloSeite[]
  /** Quiz für Kahoot, die Toolbox oder mündlich (höchstens 120 Zeichen je Frage, 75 je Antwort) */
  quiz?: QuizFrage[]
  /** Seite(n) für die Bezugsperson */
  begleitung: {
    fakten: [string, string][]
    wann: string[]
    ziel: string
    ablauf: [string, string][]
    haltung: string[]
    hinweise: string[]
    achtung: string
    anschluss?: string
    hintergrund: string
    quellen: string
    /** weitere Videos nur für die Bezugsperson */
    extra?: Clip[]
  }
}

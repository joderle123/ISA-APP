// ---------------------------------------------------------------------------
// Arbeitsblätter (Toolbox v2) – Datenmodell.
//
// Ein Blatt ist reiner Inhalt (JSON in src/data/blaetter/*.json). Aussehen,
// Schriften, Abstände und Zeichnungen kommen aus dem Gestaltungssystem
// (src/blatt/pdf). So sehen alle Blätter einheitlich aus, und Inhalte lassen
// sich ohne Layout-Kenntnisse schreiben und prüfen.
// ---------------------------------------------------------------------------

import type { AgeLevel } from '../types/material'

export type Stufe = AgeLevel

/** Themenbereiche der Blätter (bewusst keine Schulfächer). */
export type Bereich = 'gefuehle' | 'verhalten' | 'miteinander' | 'lernen' | 'alltag' | 'werkzeuge' | 'skills' | 'selbstreflexion'

/**
 * Gestaltung nach Alter:
 *  - bild   → Spielschule (C1): große Bilder, kaum Text, kurze Anleitung für Erwachsene
 *  - gross  → C2: große Schrift, weite Linien
 *  - mittel → C3/C4
 *  - jugend → Sekundarschule: ruhiger, sachlicher Satz
 */
export type Layout = 'bild' | 'gross' | 'mittel' | 'jugend'

export type Sprache = 'de' | 'fr'

export type Sozialform = 'einzeln' | 'gruppe' | 'klasse'

/**
 * Bild-Verweis:
 *  - 'icon:<name>'                  → Piktogramm (Tabler Icons, siehe bilder/icons.json)
 *  - 'gesicht:<gefuehl>'            → Gefühlsgesicht (siehe Gefuehl)
 *  - 'figur:<typ>[:<gefuehl>[:<pose>]]' → Kinderfigur, z. B. 'figur:mia:froh:winken'
 *  - 'motiv:<name>'                 → größere Zeichnung (Vulkan, Eisberg, Batterie …)
 */
export type BildId = string

export type Gefuehl =
  | 'froh'
  | 'traurig'
  | 'wuetend'
  | 'aengstlich'
  | 'ueberrascht'
  | 'angeekelt'
  | 'ruhig'
  | 'stolz'
  | 'verlegen'
  | 'muede'
  | 'nervoes'
  | 'enttaeuscht'
  | 'gelangweilt'
  | 'verwirrt'
  | 'aufgeregt'
  | 'besorgt'
  | 'neutral'

/** Arbeitsanweisungs-Symbole (vor allem für Kinder, die noch nicht lesen). */
export type Symbol =
  | 'malen'
  | 'schreiben'
  | 'lesen'
  | 'schneiden'
  | 'kleben'
  | 'ankreuzen'
  | 'einkreisen'
  | 'verbinden'
  | 'sprechen'
  | 'zuhoeren'
  | 'nachdenken'
  | 'zeigen'
  | 'partner'
  | 'gruppe'

/** Farbwörter für Legenden (Körper, Ampel …). */
export type Farbwort = 'rot' | 'orange' | 'gelb' | 'gruen' | 'blau' | 'lila' | 'grau' | 'braun'

export interface Stufentext {
  titel: string
  text?: string
}

export type Baustein =
  // --- Struktur & Text -----------------------------------------------------
  | { art: 'aufgabe'; text: string; hinweis?: string; symbole?: Symbol[] }
  | { art: 'text'; text: string; klein?: boolean }
  | { art: 'info'; titel?: string; text?: string; punkte?: string[]; symbol?: 'tipp' | 'wissen' | 'achtung' | 'merke' | 'hilfe' }
  | { art: 'geschichte'; titel?: string; text: string; bild?: BildId }
  | { art: 'bild'; bild: BildId; groesse?: 's' | 'm' | 'l' | 'xl'; text?: string; ausrichtung?: 'links' | 'mitte' | 'rechts' }
  | { art: 'spalten'; links: Baustein[]; rechts: Baustein[]; verhaeltnis?: '1:1' | '2:1' | '1:2' }
  | { art: 'abstand'; hoehe?: number }
  | { art: 'seitenumbruch' }
  // --- Schreiben -------------------------------------------------------------
  | { art: 'linien'; anzahl: number; label?: string }
  | { art: 'frage'; text: string; linien?: number }
  | { art: 'satzanfaenge'; items: string[]; linien?: number }
  | { art: 'feld'; label?: string; hoehe?: number; beispiel?: string; zeichnen?: boolean }
  | { art: 'tabelle'; spalten: string[]; zeilen: number; beispiel?: string[]; breiten?: number[]; /** Erste Spalte vorab nummerieren, beginnend mit dieser Zahl. */ nummern?: number }
  | { art: 'wennDann'; zeilen: number; beispiele?: { wenn: string; dann: string }[]; wenn?: string; dann?: string }
  | { art: 'dialog'; zeilen: { wer: string; text?: string }[] }
  | { art: 'vertrag'; titel?: string; text: string; unterschriften: string[] }
  // --- Auswählen & Einschätzen ----------------------------------------------
  | { art: 'ankreuzen'; titel?: string; items: string[]; spalten?: 1 | 2 | 3; frei?: number }
  | { art: 'bilder'; bilder: { bild: BildId; text?: string }[]; spalten?: 2 | 3 | 4; modus?: 'einkreisen' | 'ankreuzen' | 'anmalen' | 'nur' }
  | { art: 'wortspeicher'; titel?: string; items: string[] }
  | { art: 'skala'; frage?: string; von: string; bis: string; stufen?: 5 | 10 | 11; gesichter?: boolean }
  | { art: 'einschaetzung'; items: string[]; optionen: string[] }
  | { art: 'zuordnen'; links: string[]; rechts: string[]; titel?: [string, string] }
  | { art: 'gefuehle'; gefuehle: Gefuehl[]; modus?: 'benennen' | 'einkreisen' | 'nur'; leer?: number; spalten?: number }
  /** Gefühlsrad nach Willcox: innen Grundgefühle, außen genauere Wörter. Ohne `felder` gelten die
   *  Standardwörter; `aussenLeer` lässt den Außenring zum Selbstausfüllen frei. */
  | { art: 'gefuehlsrad'; felder?: { wort: string; farbe: Farbwort; aussen: string[] }[]; aussenLeer?: boolean; mitte?: string }
  // --- Denk- und Bildmodelle -------------------------------------------------
  | { art: 'ampel'; stufen: [Stufentext, Stufentext, Stufentext]; linien?: number }
  | { art: 'thermometer'; stufen: Stufentext[]; linien?: number }
  | { art: 'vulkan'; stufen?: [Stufentext, Stufentext, Stufentext] }
  | { art: 'eisberg'; oben: string; unten: string; beispielOben?: string; beispielUnten?: string }
  | { art: 'koerper'; legende?: { farbe: Farbwort; text: string }[]; frage?: string }
  | { art: 'batterie'; laden: string; leeren: string; linien?: number }
  | { art: 'waage'; links: string; rechts: string; zeilen?: number }
  | { art: 'leiter'; stufen: number; oben?: string; unten?: string; beispiele?: string[] }
  | { art: 'zielscheibe'; ringe: string[]; mitte?: string }
  | { art: 'hand'; finger?: string[]; mitte?: string }
  | { art: 'mindmap'; mitte: string; aeste?: string[]; anzahl?: number }
  | { art: 'schritte'; items: Stufentext[]; stil?: 'liste' | 'kette' | 'weg'; linien?: number }
  | { art: 'plan'; ziel?: string; tage?: string[]; zeilen: string[]; symbol?: 'gesicht' | 'kasten' | 'stern' }
  | { art: 'tagesplan'; zeilen: { zeit?: string; text?: string; bild?: BildId }[]; leer?: number }
  | { art: 'atmen'; uebung: 'quadrat' | 'ballon' | 'blume' | 'fuenf-sinne' | 'finger' }
  // --- Selbstreflexion: Grafiken zum Füllen, Ausmalen und Einzeichnen ---------
  /** Gläser mit Beschriftung: Strich = so voll soll es sein, ausmalen = so voll ist es jetzt. `leer` = Gläser zum Selbstbeschriften. */
  | { art: 'glaeser'; items: string[]; leer?: number; spalten?: 3 | 4 | 5 | 6; legende?: [string, string]; skala?: boolean }
  /** Netz aus Lebensbereichen: jeder Bereich ein Tortenstück mit 5 oder 10 Ringen zum Ausmalen (innen = wenig, außen = viel). */
  | { art: 'netz'; bereiche: string[]; stufen?: 5 | 10 }
  /** Leeres Diagramm zum Einzeichnen einer Kurve (Stimmung, Energie, Lebenslinie). */
  | { art: 'kurve'; x: string[]; oben: string; unten: string; mitte?: string; linien?: [string, string]; hoehe?: number }
  /** 24-Stunden-Kreise zum Ausmalen (ein oder zwei), darunter die Farblegende. */
  | { art: 'tageskreis'; titel: string[]; legende: { farbe: Farbwort; text: string }[] }
  /** Kalender aus Kästchen (Wochentage als Spalten) zum Ausmalen, mit Farblegende. */
  | { art: 'farbkalender'; wochen?: number; legende: { farbe: Farbwort; text: string }[] }
  // --- Bildgeschichten & Karten ---------------------------------------------
  | { art: 'comic'; felder: ComicFeld[]; spalten?: 2 | 3 }
  | { art: 'karten'; karten: { titel?: string; text?: string; bild?: BildId }[]; spalten?: 2 | 3 | 4; hoehe?: number }
  // --- Abschluss -------------------------------------------------------------
  | { art: 'rueckblick'; frage?: string }
  | { art: 'notfall'; eintraege?: { name: string; nummer: string }[]; text?: string }

export type BausteinArt = Baustein['art']

export interface ComicFeld {
  /** Bis zu zwei Figuren, z. B. ['figur:noah:wuetend', 'figur:mia:traurig']. */
  figuren?: BildId[]
  /** Kleines Requisit (Piktogramm), z. B. 'icon:ball-football'. */
  requisit?: BildId
  /** Vorgegebener Text in der Sprechblase. Leer + blase → Blase zum Ausfüllen. */
  text?: string
  /** Wer spricht: 0 = erste Figur, 1 = zweite. */
  sprecher?: 0 | 1
  /** 'sprechen' (Standard) | 'denken' | 'keine' */
  blase?: 'sprechen' | 'denken' | 'keine'
  /** Zeile unter dem Bild. */
  untertitel?: string
  /** Leeres Feld zum Selbstzeichnen. */
  leer?: boolean
}

export interface Lehrerseite {
  /** Worum es geht, 1–2 Sätze. */
  ziel: string
  /** Ablauf in kurzen, konkreten Schritten. */
  ablauf: string[]
  /** Fachlicher Hintergrund, 3–6 Sätze, sachlich. */
  hintergrund: string
  /** Nur Quellen aus der geprüften Liste (siehe BLATT-STIL.md). */
  quellen?: string[]
  differenzierung?: { leichter?: string; schwerer?: string }
  /** Impulsfragen für das Gespräch. */
  impulse?: string[]
  tipps?: string[]
  /** Wann mehr Hilfe nötig ist (z. B. Responsable oder Psychologin informieren). */
  achtung?: string
  /** Zusätzliches Material (Schere, Kleber …). */
  material?: string
}

export interface BlattInhalt {
  titel: string
  untertitel?: string
  /** Kurze Anleitung für Erwachsene (v. a. Spielschule), steht klein über den Aufgaben. */
  anleitung?: string
  bausteine: Baustein[]
  lehrer: Lehrerseite
}

export interface Blatt {
  /** Stabil, klein, mit Bindestrichen – wird für Deep-Links genutzt. */
  id: string
  bereich: Bereich
  /** Thema innerhalb des Bereichs (siehe katalog.ts). */
  thema: string
  stufen: Stufe[]
  layout?: Layout
  sozialform: Sozialform[]
  /** z. B. '20–30 Min.' */
  dauer: string
  /** ELDiB-Ziele, z. B. 'V-21', 'K-26', 'SOZ-37'. */
  eldib: string[]
  schlagworte: string[]
  /** Leitbild für Kopf und Karte. */
  bild?: BildId
  /** Verwandte Blätter (ids). */
  verwandt?: string[]
  /** Gehört zum Skills-Kurs: Einheit(en), in denen das Blatt vorkommt (z. B. ['j1-e01']). */
  kurs?: string[]
  de: BlattInhalt
  fr?: BlattInhalt
}

/** Blatt mit vergebener Nummer (z. B. 'G-07'), wie es die App verwendet. */
export interface NummeriertesBlatt extends Blatt {
  nr: string
}

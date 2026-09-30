// ---------------------------------------------------------------------------
// Förderfach „Skills fir d’Liewen“ – sozio-emotionales Lernen in der Voie de
// préparation (7e, 6e, 5e). Eigenständig neben dem Skills-Kurs der Annexe
// (src/kurs, src/data/kurs), der unverändert bleibt: gleiche Grundidee, aber
// für Klassen von rund 20 Jugendlichen, eine Doppelstunde (100 Min.) pro
// Woche, Lehrkräfte des Lycée ohne psychologische Vorbildung, Deutsch und
// Französisch, ohne Noten.
// Daten: src/data/foerderfach/*.json · Leitfaden: src/foerderfach/README.md
// ---------------------------------------------------------------------------

import type { AblaufZeile, Phase, Schritt } from '../kurs/typen'
import type { Sprache } from '../blatt/typen'

export type { AblaufZeile, Phase, Schritt, Sprache }

/** Text in beiden Sprachen. */
export type Zweisprachig = Record<Sprache, string>

export type Klasse = '7e' | '6e' | '5e'

/** Die fünf Kompetenzbereiche (nach CASEL, 2020). */
export type Kompetenz = 'kennen' | 'steuern' | 'verstehen' | 'miteinander' | 'entscheiden'

/** Ein Eintrag im Jahresplan. Ausgearbeitete Einheiten stehen zusätzlich in einheiten-<klasse>.json. */
export interface PlanEinheit {
  /** stabil, z. B. 'ff7-e01' */
  id: string
  /** laufende Nummer im Jahr; bei zwei Terminen die des ersten */
  nr: number
  /** Kapitel-Id, z. B. 'ff7-k1' */
  kapitel: string
  titel: Zweisprachig
  /** Eine Zeile für den Plan (höchstens 115 Zeichen): was passiert. */
  kurz: Zweisprachig
  /** 1–3 Kompetenzbereiche, der wichtigste zuerst */
  kompetenzen: Kompetenz[]
  /** Einheit des Skills-Kurses, auf der die Einheit beruht (nur zur Nachverfolgung, erscheint nicht im Druck) */
  basis?: string
  /** neu für das Fach geschrieben */
  neu?: boolean
  /** Wahleinheit: vertieft, entfällt zuerst, wenn Stunden ausfallen */
  wahl?: boolean
  /** Anzahl Doppelstunden (Standard 1) */
  termine?: number
  /** Hinweis im Plan, z. B. „Gemeinsam mit dem SePAS“ */
  hinweis?: Zweisprachig
}

export interface Kapitel {
  /** z. B. 'ff7-k1' */
  id: string
  nr: number
  trimester: 1 | 2 | 3
  titel: Zweisprachig
  leitfrage: Zweisprachig
  /** Piktogramm, z. B. 'icon:door-enter' */
  bild: string
}

export interface Jahresplan {
  klasse: Klasse
  titel: Zweisprachig
  untertitel: Zweisprachig
  /** 2–4 Sätze: roter Faden des Jahres */
  faden: Zweisprachig
  /** Jahresziele je Kompetenzbereich, ohne Subjekt („benennen Gefühle …“) – gedruckt als „Am Ende der 7e …“ */
  ziele: Record<Kompetenz, Zweisprachig>
  kapitel: Kapitel[]
  einheiten: PlanEinheit[]
}

/** Sprachabhängiger Teil einer ausgearbeiteten Einheit (Felder wie im Skills-Kurs, siehe src/kurs/typen.ts). */
export interface EinheitText {
  titel: string
  kurz: string
  /** 2–4 Ziele, mit Verb beginnend */
  ziele: string[]
  material: string[]
  vorbereitung?: string[]
  ablauf: AblaufZeile[]
  schritte: Schritt[]
  /** Ausblick auf die nächste Einheit (ein Satz, wörtlich) */
  bruecke?: string
  /** Fachlicher Hintergrund (300–900 Zeichen, Quellen im Text) */
  hintergrund?: string
  /** Nur Texte aus src/blatt/quellen.ts */
  quellen?: string[]
  /** Sensible Punkte und wann handeln */
  achtung?: string
}

/** Eine ausgearbeitete Einheit. Minuten, Phasen und Blätter müssen in beiden Sprachen gleich sein. */
export interface Einheit {
  /** wie im Jahresplan, z. B. 'ff7-e01' */
  id: string
  klasse: Klasse
  /** Minuten, meist 100 */
  dauer: number
  /** Blätter des Schülerhefts (Ids aus blaetter.json) in der Reihenfolge der Einheit */
  blaetter: string[]
  de: EinheitText
  fr: EinheitText
}

export interface EinheitenDatei {
  einheiten: Einheit[]
}

// --- Texte des Lehrerhandbuchs (Teil A) ------------------------------------------------

export interface TitelText {
  titel: string
  text: string
}

export interface HandbuchText {
  /** Kurzer Hinweis auf der Inhaltsseite (Entwurf, Aufbau) */
  vorwort: TitelText
  ueberblick: {
    titel: string
    einleitung: string
    fakten: { zahl: string; text: string }[]
    wirkung: { titel: string; text: string; punkte: TitelText[] }
    nicht: TitelText
    material: TitelText
  }
  kompetenzen: {
    titel: string
    einleitung: string
    /** Beschreibung je Bereich (die Namen stehen in fach.ts) */
    bereiche: Record<Kompetenz, string>
    hinweis: string
  }
  doppelstunde: {
    titel: string
    einleitung: string
    ablauf: { min: string; phase: Phase; titel: string; text: string }[]
    rituale: { titel: string; punkte: TitelText[] }
    klasse: { titel: string; punkte: TitelText[] }
  }
  sicherheit: {
    titel: string
    einleitung: string
    grundsaetze: TitelText[]
    anvertrauen: { titel: string; schritte: string[] }
    hilfe: { titel: string; text: string; nummern: { name: string; nummer: string }[] }
    noten: TitelText
  }
  plaene: {
    titel: string
    einleitung: string
  }
}

export type HandbuchDatei = Record<Sprache, HandbuchText>

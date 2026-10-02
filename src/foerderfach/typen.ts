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
  /** 2–3 Sätze: worum es im Kapitel geht (Kapitelseite im Handbuch) */
  worum?: Zweisprachig
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
  /**
   * Wochen-Mission: ein kleiner Auftrag für den Alltag bis zur nächsten Stunde, an die Jugendlichen
   * gerichtet („du“ / « tu »), 60–180 Zeichen. Steht im Schülerheft („Meine Wochen-Missionen“) und im
   * Handbuch unter dem Ausblick; die Brücke der nächsten Stunde fragt kurz nach.
   */
  mission?: string
  /** Fachlicher Hintergrund (300–900 Zeichen, Quellen im Text) */
  hintergrund?: string
  /** Nur Texte aus src/blatt/quellen.ts */
  quellen?: string[]
  /** Sensible Punkte und wann handeln */
  achtung?: string
  /** Für gemischte Klassen: einfacher (Sprache, Lesen, Schreiben) und anspruchsvoller */
  differenzierung?: { leichter: string; schwerer: string }
  /** Wenn nur eine Stunde (50 Min.) bleibt: welche Schritte, was entfällt, was sich verschieben lässt */
  kurzfassung?: string
}

/** Eine ausgearbeitete Einheit. Minuten, Phasen und Blätter müssen in beiden Sprachen gleich sein. */
export interface Einheit {
  /** wie im Jahresplan, z. B. 'ff7-e01' */
  id: string
  klasse: Klasse
  /** Minuten, meist 100 */
  dauer: number
  /** Blätter des Schülerhefts (Ids aus blaetter*.json) in der Reihenfolge der Einheit */
  blaetter: string[]
  /** Kopiervorlagen nur für die Lehrkraft (Karten zum Ausschneiden): im Handbuch nach der Einheit, nicht im Schülerheft */
  vorlagen?: string[]
  /** Wortspeicher: 3–6 Schlüsselwörter der Einheit in beiden Sprachen (steht an der Tafel, landet im Glossar) */
  woerter: Zweisprachig[]
  de: EinheitText
  fr: EinheitText
}

/** Skill-Karte zum Ausschneiden (am Ende des Schülerhefts): ein Skill mit Symbol und drei Schritten. */
export interface SkillKarteText {
  /** Name des Skills wie im Titel des Skill-Schritts („Skill: …“), höchstens 28 Zeichen */
  name: string
  /** Wann hilft der Skill? Höchstens 70 Zeichen */
  wann: string
  /** Genau drei kurze Schritte (je höchstens 80 Zeichen), an die Jugendlichen gerichtet */
  schritte: string[]
}

export interface SkillKarte {
  /** z. B. 'ff7-k-54321' */
  id: string
  /** Piktogramm aus src/blatt/bilder/icons.json, z. B. 'icon:eye' */
  bild: string
  /** Einheit, in der der Skill eingeführt wird */
  einheit: string
  de: SkillKarteText
  fr: SkillKarteText
}

export type SkillKartenDatei = Record<Klasse, SkillKarte[]>

export interface EinheitenDatei {
  einheiten: Einheit[]
  /** Nur in Entwürfen (src/data/foerderfach/entwurf): die Schülerblätter dieser Einheiten */
  blaetter?: import('../blatt/typen').Blatt[]
}

// --- Texte des Lehrerhandbuchs (Teil A) ------------------------------------------------

export interface TitelText {
  titel: string
  text: string
}

/** Methoden für alle Einheiten: Varianten, Ersatz, Hilfe bei Unruhe (Teil A) */
export interface MethodenGruppe {
  titel: string
  /** Minuten im Ablauf, z. B. „0–10“ (optional) */
  wann?: string
  text?: string
  eintraege: TitelText[]
}

/** Elternbrief als Kopiervorlage – steht in jedem Heft auf Deutsch und auf Französisch. */
export interface ElternBrief {
  /** Überschrift der Seite im Heft, z. B. „Elternbrief (Deutsch)“ */
  seite: string
  betreff: string
  anrede: string
  absaetze: string[]
  gruss: string
  unterschrift: string
  abschnitt: { titel: string; felder: string[]; bestaetigung: string; frage: string; unterschrift: string }
}

export interface HandbuchText {
  /** Kurzer Hinweis auf der Inhaltsseite (Aufbau des Hefts); {klasse} wird ersetzt */
  vorwort: { titel: string; text: string }
  /** „Bevor Sie starten“: die häufigsten Sorgen vor den ersten Stunden mit kurzen Antworten (Teil A, vorn) */
  start: { titel: string; einleitung: string; fragen: TitelText[] }
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
  methoden: { titel: string; einleitung: string; gruppen: MethodenGruppe[] }
  eltern: { titel: string; einleitung: string; punkte: TitelText[]; kollegium: TitelText }
  brief: ElternBrief
  material: { titel: string; einleitung: string; gruppen: { titel: string; punkte: string[] }[] }
  /** Plakat „Unser Weg durch die 7e“: Seitentitel im Heft, Hinweis; {klasse} wird ersetzt */
  jahresweg: { titel: string; text: string; plakat: string }
  glossar: { titel: string; text: string }
  /** Schülerheft: Inhaltsseite, Wochen-Missionen, Wörterliste, Rückseite mit Hilfe */
  heft: {
    inhalt: string
    jedeStunde: string
    missionen: string
    missionenText: string
    /** Skill-Karten zum Ausschneiden: Überschrift und Hinweis */
    karten: string
    kartenText: string
    /** Beschriftung unter dem Kästchen zum Abhaken */
    geschafft: string
    woerter: string
    woerterText: string
    hilfeTitel: string
    hilfeText: string
    notizen: string
  }
  /** Rückseite des Hefts */
  rueckseite: { titel: string; text: string; dieses: string }
}

export type HandbuchDatei = Record<Sprache, HandbuchText>

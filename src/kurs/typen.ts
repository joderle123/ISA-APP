// ---------------------------------------------------------------------------
// Skills-Kurs – Datenmodell.
//
// Ein Kurs für Kleingruppen von Jugendlichen (ca. 12–16 Jahre), aufgebaut in
// Kursjahren → Modulen → Einheiten (je ca. 100 Min.). Die Einheiten sind reiner
// Inhalt (JSON in src/data/kurs/*.json); die Schülerblätter sind normale
// Toolbox-Blätter im Bereich „skills“ (src/data/blaetter/skills*.json).
// Leitfaden für Inhalte: src/kurs/KURS-STIL.md
// ---------------------------------------------------------------------------

/** Phasen einer Einheit – bestimmen Farbe und Symbol im Ablauf. */
export type Phase =
  | 'ankommen' // Check-in, Ankommen
  | 'bruecke' // Rückblick auf die letzte Einheit, Thema nennen
  | 'input' // kurzer Input, ruhige Übung
  | 'uebung' // Hauptteil: Übung, Gespräch, Arbeitsblatt
  | 'pause' // Pause / Imbiss
  | 'aktiv' // Bewegung, Spiel, Natur, Rollenspiel
  | 'skill' // Skill / Achtsamkeit zum Runterkommen
  | 'abschluss' // Réckbléck, Skills-Pass, Ausblick

export interface AblaufZeile {
  /** z. B. '0–10' */
  min: string
  phase: Phase
  /** Kurz, was passiert (≤ 60 Zeichen). */
  titel: string
}

export interface Schritt {
  titel: string
  /** Minuten */
  dauer: number
  phase: Phase
  /** Anleitung für die Leitung: sachlich, im Infinitiv/Imperativ, konkret. */
  text: string
  /** Wörtliche Impulse: So kann die Leitung es sagen (ohne Anführungszeichen). */
  sagen?: string[]
  /** Aufzählung, z. B. Sätze für „Ein Schritt nach vorn“ oder Situationen. */
  punkte?: string[]
  /** Kleine Tabelle, z. B. die Anspannungsskala. */
  tabelle?: { spalten: string[]; zeilen: string[][] }
  /** Praxis-Tipp. */
  tipp?: string
  /** Wenn es kippt: was tun, wenn die Übung nicht funktioniert oder es unruhig wird. */
  wennEsKippt?: string
  /** Schülerblatt in diesem Schritt (Toolbox-Id). */
  blatt?: string
}

export interface Einheit {
  /** stabil, z. B. 'j1-e07' */
  id: string
  /** laufende Nummer im Kursjahr */
  nr: number
  jahr: number
  /** Modul-Id, z. B. 'j1-m2' */
  modul: string
  titel: string
  /** Ein Satz: Worum geht es heute? */
  kurz: string
  /** Minuten, meist 100 */
  dauer: number
  /** 2–4 Ziele, beginnend mit einem Verb („erkennen …“, „probieren … aus“). */
  ziele: string[]
  /** Material zum Abhaken. */
  material: string[]
  /** Was vorher vorzubereiten ist (optional). */
  vorbereitung?: string[]
  /** Schülerblätter (Toolbox-Ids) in der Reihenfolge der Einheit. */
  blaetter: string[]
  ablauf: AblaufZeile[]
  schritte: Schritt[]
  /** Ausblick auf die nächste Einheit (ein Satz, wörtlich). */
  bruecke?: string
  /** Fachlicher Hintergrund für die Leitung (300–900 Zeichen, Quellen im Text). */
  hintergrund?: string
  /** Nur Texte aus src/blatt/quellen.ts (wörtlich). */
  quellen?: string[]
  /** Sensible Punkte: was nicht in der Gruppe vertiefen, wann handeln. */
  achtung?: string
  /** Joker-Einheit (flexibel einsetzbar, nicht in der Reihe). */
  joker?: boolean
  /** Nur Joker: wann die Einheit passt, z. B. „nach Einheit 8“, „jederzeit, am besten im Frühling“. */
  passt?: string
}

export interface Modul {
  /** z. B. 'j1-m2' */
  id: string
  jahr: number
  nr: number
  titel: string
  leitfrage: string
  /** 2–4 Sätze */
  worum: string
  /** Ein Satz: Ziel am Ende des Moduls. */
  zielAmEnde: string
  einheiten: string[]
}

export interface Kursjahr {
  nr: number
  titel: string
  untertitel: string
  /** 2–4 Sätze: roter Faden des Jahres */
  faden: string
  module: string[]
  /** Joker-Einheiten dieses Jahres (Ids) */
  joker?: string[]
}

/** Grundlagen, die für das ganze Jahr gelten (Rituale, Rahmen, Methoden-Pool). */
export interface Abschnitt {
  titel: string
  text?: string
  punkte?: string[]
  tabelle?: { spalten: string[]; zeilen: string[][] }
}

export interface KursDatei {
  jahr?: Kursjahr
  module?: Modul[]
  einheiten?: Einheit[]
  /** Nur in grundlagen.json */
  grundlagen?: { id: string; titel: string; abschnitte: Abschnitt[] }[]
}

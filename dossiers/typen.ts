// Inhalt einer Ausgabe von „REAL TALK“ (ein Heft je Modul des Skills-Kurses). Texte: **fett** ist erlaubt.
export interface Frage {
  f: string
  linien?: number
  kreis?: string[]
  kreuz?: string[]
  /** Kästchen untereinander statt nebeneinander */
  unter?: boolean
  /** Anspannung 0–100, eine Zeile je Eintrag (z. B. 'vorher', 'nachher') */
  skala?: string[]
  /** Satzanfänge mit Schreiblinie */
  satz?: string[]
  /** Tabelle zum Ankreuzen: Zeilen (Aussagen) × Spalten */
  raster?: { spalten: string[]; zeilen: string[] }
  /** Entscheidung: je Möglichkeit zwei leere Spalten (z. B. „kostet mich“ / „bringt mir“) */
  preis?: { kopf: [string, string]; optionen: string[] }
  /** kleine Kästchen für eine Zahl (Punkte, Wertung) */
  zahl?: string[]
  /** Linie von … bis …, Position markieren */
  strich?: [string, string]
  /** freies Feld (Höhe in mm) zum Zeichnen oder Schreiben */
  feld?: number
}
export interface Move { titel: string; wie: string; zeit: string; kontext?: string; fragen: Frage[] }
export interface Track {
  /** Nummer der Kurs-Einheit */
  nr: number
  titel: string
  unter: string
  kurz: string
  /** Szene: kurze Geschichte mit einer erfundenen Person */
  szene: { bild: string; name: string; text: string; frage: string }
  faktenTitel?: string
  fakten: { t: string; x: string }[]
  mythen: [string, string][]
  merk: string
  moveUnter: string
  moves: Move[]
  challenge: { titel: string; wie: string; x: string }
  line: { titel: string; x: string; feld?: number; linien?: number }
  woche: string
  hilfe?: boolean
  leitung: { einsatz: string; loesungen: string[]; impulse: string[]; material: string; blaetter: string }
}
export interface Heft {
  id: string
  /** '05' */
  nr: string
  datei: string
  thema: string
  headline: string
  /** Akzentfarbe der Ausgabe */
  farbe: string
  stand: string
  cover: { bild: string; zeilen: string[]; sticker: string }
  ansage: { text: string[]; zitat: string; regeln: string[]; so: [string, string][] }
  cast: { bild: string; name: string; x: string }[]
  warm: { titel: string; text: string; fragen: Frage[] }
  tracks: Track[]
  hot: { unter: string; regeln: string; takes: string[] }
  quiz: { unter: string; wort: string; fragen: { f: string; o: string[]; r: number }[] }
  karten: { titel: string; icon: string; zeilen: string[]; eigen?: string }[]
  abspann: { saetze: string[]; posten: string[] }
  hilfeText?: string
  leitung: {
    fakten: [string, string][]; wozu: string; lernziele: string[]; start: string; schluss: string
    hilfe: string[]; forder: string[]; gespraech: string; druck: string[]; hot: string; achtung: string; hintergrund: string; quellen: string
  }
}

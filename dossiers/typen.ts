// Inhalt eines Skills-Dossiers (ein Heft je Modul). Texte: **fett** ist erlaubt.
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
  /** verbinden: [links, rechts] */
  paare?: [string[], string[]]
  sort?: { spalten: string[]; woerter: string[] }
  /** Tabelle zum Ankreuzen: Zeilen (Aussagen) × Spalten */
  raster?: { spalten: string[]; zeilen: string[] }
}
export interface Mission { lab?: string; bild: string; wie: string; zeit: string; titel: string; zeile: string; kontext?: string; fragen: Frage[] }
export interface Einheit {
  /** Nummer der Kurs-Einheit */
  nr: number
  farbe: number
  titel: string
  unter: string
  kurz: string
  stempel: string
  bild: string
  intro: string
  pA: [string, string]
  ideen: { t: string; x: string }[]
  pB: [string, string]
  karten: { bild: string; name: string; tag?: string; ort: string; x: string }[]
  pC: [string, string]
  chips: [string, string?][]
  wusst: { t?: string; x: string }
  tun: {
    icon: string; titel: string; unter: string; dreier: [string, string, string]
    missionen: Mission[]
    bonus: { bild: string; titel: string; x: string; linien?: number }
    mitmach: { titel: string; x: string }
    sternText: string; merke?: string; woche: string; hilfe?: boolean
  }
  leitung: { einsatz: string; loesungen: string[]; impulse: string[]; material: string; blaetter: string }
}
export interface Dossier {
  id: string; datei: string; band: string; titel: string; unter: string; fuss: string; stand: string
  wort: { station: string; pass: string }
  farbe: [string, string]
  hilfeText?: string
  deck: {
    figuren: { bild: string; blase?: string }[]; ecken: [string, string]; zaehler: string[]
    pass: { icon: string; titel: string; rechts: string; name: string; gruppe: string; felder: [string, string][]; stub: string; stubBild: string }
  }
  anleitung: {
    icon: string; titel: string; unter: string; schrittTitel: string
    schritte: { bild: string; t: string; x: string }[]
    werkzeugTitel: string; werkzeug: { bild: string; name: string; x: string }[]
    leuteTitel: string; leute: { bild: string; name: string; x: string }[]
    regelnTitel: string; regeln: string[]
  }
  uebersicht: { icon: string; titel: string; unter: string; zielTitel: string; ziele: string[]; warm: { titel: string; text: string; fragen: Frage[] }; passText: string }
  einheiten: Einheit[]
  raetsel: { titel: string; unter: string; wer: { x: string; l: string }[]; bank: string[]; sort: { titel: string; frage: string; spalten: string[]; woerter: string[]; loesung: string[][]; hoehe?: number } }
  quiz: { titel: string; unter: string; wort: string; fragen: { f: string; o: string[]; r: number; e: number }[]; rf: { x: string; r: boolean; w?: string }[] }
  rueckblick: { titel: string; unter: string; sternTitel: string; satzTitel: string; saetze: string[]; werkzeugTitel: string; werkzeugFrage: string; urkunde: { klein: string; titel: string; text: string; bild: string } }
  leitung: {
    fakten: [string, string][]; wozu: string; lernziele: string[]; start: string; schluss: string
    hilfe: string[]; forder: string[]; gespraech: string; druck: string[]; stempel: string[]; achtung: string; hintergrund: string; quellen: string
  }
}

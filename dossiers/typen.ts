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
  /** Regler 0–10, eine Zeile je Eintrag */
  regler?: string[]
  /** Satzanfänge mit Schreiblinie */
  satz?: string[]
  /** Tabelle zum Ankreuzen: Zeilen (Aussagen) × Spalten */
  raster?: { spalten: string[]; zeilen: string[] }
  /** Entscheidung: je Möglichkeit zwei leere Spalten (z. B. „kostet mich“ / „bringt mir“) */
  preis?: { kopf: [string, string]; optionen: string[]; /** Überschrift der ersten Spalte (Standard: Möglichkeit) */ erste?: string }
  /** kleine Kästchen für eine Zahl (Punkte, Wertung) */
  zahl?: string[]
  /** Gitter 3×3 mit Text und Platz für einen Namen (Bingo „Finde jemanden, der …“) */
  gitter?: string[]
  /** mehrere Linien untereinander: [links, rechts] je Zeile */
  striche?: [string, string][]
  /** Linie von … bis …, Position markieren */
  strich?: [string, string]
  /** freies Feld (Höhe in mm) zum Zeichnen oder Schreiben */
  feld?: number
  /** Kette: Kästchen mit Pfeilen zum Eintragen (leerer Text = leeres Kästchen, sonst fester Text) – z. B. Spuren in Reihenfolge */
  kette?: string[]
  /** Wörter in einem Kasten, die man zuordnen oder einsetzen soll */
  wortkasten?: string[]
  /** Akku zum Ausmalen (Beschriftung links), z. B. „Mein Akku heute“ */
  akku?: string
  /** Verbinden: links und rechts je eine Spalte mit Punkten, Linien ziehen */
  verbinden?: [string[], string[]]
}
export interface Clip { titel: string; kanal: string; url: string; dauer: string; frage: string }
export interface Film { titel: string; jahr: number; fsk: number | null; laenge: string; worum: string; achte: string[]; achtung?: string }
export interface Move { titel: string; wie: string; zeit: string; kontext?: string; fragen: Frage[] }
/** Bausteine einer Stunde (Hefte mit zusammenhängendem Stundenablauf, seit 16.11.2026) */
export type Baustein =
  | { art: 'text'; x: string[] }
  /** Fall: Person, kurze Geschichte, auf Wunsch eine Zeitleiste (Uhrzeit, was passiert) und Fragen */
  | { art: 'fall'; bild: string; name: string; text: string; zeitleiste?: [string, string][]; fragen?: Frage[] }
  /** Protokoll eines Gesprächs: wer sagt, denkt oder tut was */
  | { art: 'chat'; titel?: string; zeilen: { zeit?: string; wer: string; x: string; art?: 'sagt' | 'denkt' | 'tut' }[]; fragen?: Frage[] }
  /** Ein Dokument (Akte) – und daneben, was nicht drinsteht */
  | { art: 'akte'; titel: string; kopf: string; eintraege: string[]; stempel: string; daneben: { titel: string; punkte: string[] }; fragen?: Frage[] }
  /** Modell: Punkte mit Erklärung und Warnzeichen. Zum Mitarbeiten (24.11.2026): `luecke` = leere Linie für ein weiteres
   *  Warnzeichen, `anzeige` = Tankanzeige zum Ausmalen (Beschriftung), `beweis` = kurze Linie unten (z. B. „Spur“) */
  | { art: 'modell'; punkte: { icon: string; t: string; x: string; warn?: string; luecke?: boolean }[]; warnTitel?: string; anzeige?: string; beweis?: string }
  /** Spuren (Beweisstücke) zu einem Fall: Buchstabe, Quelle, kurzer Text – Jugendliche ermitteln selbst (24.11.2026) */
  | { art: 'spuren'; spuren: { k: string; icon: string; quelle: string; x: string }[]; fragen?: Frage[] }
  /** Video mit Aufträgen: vor dem Schauen, beim Schauen, danach */
  | { art: 'clip'; clip: Clip; vorher: Frage[]; dabei: string[]; nachher: Frage[] }
  | { art: 'fragen'; kontext?: string; fragen: Frage[] }
  /** Große Aktion für die Gruppe (15–30 Minuten) mit allem, was man dafür braucht */
  | { art: 'aktion'; ziel: string; material: string; schritte: string[]; runden?: { t: string; x: string }[]; regeln?: string[]; wertung?: { kopf: string[]; zeilen: string[] }; zu3?: string; /** Zeilen zum Festhalten (z. B. die besten Ideen der Runde) */ notiz?: { titel: string; linien: number }; auswertung?: string[] }
  /** Karten zum Ausschneiden (Situationen, Wörter, Rollen) */
  | { art: 'karten'; hinweis?: string; spalten: number; hoehe?: number; /** ein Wort je Karte, groß gesetzt */ wort?: boolean; karten: { t: string; x?: string; marke?: string }[] }
  /** Tabelle: Text in der Zelle oder leer zum Ausfüllen */
  | { art: 'tabelle'; kopf: string[]; zeilen: string[][]; breiten?: string; hoehe?: number }
  /** Auswahl: je Gruppe ein paar Möglichkeiten zum Ankreuzen */
  | { art: 'menue'; titel: string; gruppen: { t: string; punkte: string[] }[] }
  /** Gesprächsanstoß: Sprechblase „Redet darüber“ mit ein bis drei Fragen (freiwillig, ohne Schreiben) */
  | { art: 'reden'; x: string[]; titel?: string }
  | { art: 'merk'; x: string }
  | { art: 'woche'; x: string; kaestchen?: string[] }
export interface Station { titel: string; zeit: string; wie: string; icon: string; /** ein Satz für die Leitung: worauf es bei dieser Station ankommt */ leitung?: string; /** Fortsetzung oder Material zur Station davor (zählt nicht neu) */ fort?: boolean; bausteine: Baustein[] }
/** Eine Stunde: Leitfrage, Ziele und die Seiten in der Reihenfolge des Ablaufs */
export interface Stunde { frage: string; dauer: string; kannst: string[]; seiten: { stationen: Station[] }[] }
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
  challenge: { titel: string; wie: string; x: string; /** Hinweis für die kleine Gruppe (drei Jugendliche) */ zu3?: string; /** Zeitpunkt in der Einheit */ wann?: 'Start' | 'Mitte' | 'Schluss' }
  line: { titel: string; x: string; feld?: number; linien?: number; /** Kästchen zum Abhaken, z. B. Wochentage */ kaestchen?: string[] }
  woche: string
  hilfe?: boolean
  /** kurzes Video zum Track (QR-Code). Nur geprüfte Links eintragen. */
  clip?: Clip
  /** Die Einheit als zusammenhängende Stunde – ersetzt Doppelseite und Sessions dieses Tracks */
  stunde?: Stunde
  /** Gruppen-Aktionen (Sessions) zu diesem Track */
  gruppe: { titel: string; wer: string; zeit: string; material: string; schritte: string[]; /** schwerere Variante */ level2?: string; frage: string; /** Zeitpunkt in der Einheit */ wann?: 'Start' | 'Mitte' | 'Schluss'; /** Hinweis für die kleine Gruppe (drei Jugendliche) */ zu3?: string }[]
  leitung: { einsatz: string; loesungen: string[]; impulse: string[]; material: string; blaetter: string; /** je Station ein Satz: worauf es ankommt (Hefte mit Stunden) */ stationen?: string[] }
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
  /** Film des Trimesters – nur in einer Ausgabe je Trimester (höchstens ein Film) */
  kino?: { filme: Film[]; /** neun Dinge, die man im Hauptfilm entdecken kann */ bingo: string[]; nachher: string[]; geprueft: string }
  /** Ersatzfilm für die Leitung (steht nur im Jahresplan) */
  reserve?: Film[]
  /** Datum, an dem die Video-Links geprüft wurden */
  geprueft?: string
  hot: { unter: string; regeln: string; takes: string[] }
  quiz: { unter: string; wort: string; fragen: { f: string; o: string[]; r: number }[] }
  karten: { titel: string; icon: string; zeilen: string[]; eigen?: string }[]
  abspann: { saetze: string[]; posten: string[]; /** letzter Satz der Seite (Standard: Hinweis auf die nächste Ausgabe) */ schluss?: string }
  hilfeText?: string
  leitung: {
    fakten: [string, string][]; wozu: string; lernziele: string[]; start: string; schluss: string
    hilfe: string[]; forder: string[]; gespraech: string; druck: string[]; hot: string; achtung: string; hintergrund: string; quellen: string
  }
}

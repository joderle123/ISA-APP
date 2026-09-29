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
export type Bereich = 'gefuehle' | 'verhalten' | 'miteinander' | 'lernen' | 'alltag' | 'werkzeuge' | 'skills' | 'selbstreflexion' | 'mathe'

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
  /** `stufe` (Mathe): kleine Punkte neben der Nummer – 1 Basis, 2 Kern, 3 Plus; unauffällig, nur als Orientierung. */
  | { art: 'aufgabe'; text: string; hinweis?: string; symbole?: Symbol[]; stufe?: 1 | 2 | 3 }
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
  | { art: 'tabelle'; spalten: string[]; zeilen: number; beispiel?: string[]; breiten?: number[]; /** Erste Spalte vorab nummerieren, beginnend mit dieser Zahl. */ nummern?: number; /** Vorgegebene Zeilen (z. B. Aufgaben, Preise) vor den leeren. */ werte?: string[][] }
  | { art: 'wennDann'; zeilen: number; beispiele?: { wenn: string; dann: string }[]; wenn?: string; dann?: string }
  | { art: 'dialog'; zeilen: { wer: string; text?: string }[] }
  | { art: 'vertrag'; titel?: string; text: string; unterschriften: string[] }
  // --- Auswählen & Einschätzen ----------------------------------------------
  | { art: 'ankreuzen'; titel?: string; items: string[]; spalten?: 1 | 2 | 3; frei?: number }
  /** `klein`: kompakte Reihe (Piktogramm auf getöntem Kreis, Text daneben) – z. B. Alltagsbeispiele auf Mathe-Blättern. */
  | { art: 'bilder'; bilder: { bild: BildId; text?: string }[]; spalten?: 2 | 3 | 4; modus?: 'einkreisen' | 'ankreuzen' | 'anmalen' | 'nur'; klein?: boolean }
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
  // --- Mathe ----------------------------------------------------------------
  /** Schriftliche Rechnungen, Komma unter Komma (jede Ziffer in einem Kästchen). Ohne `ergebnis` bleibt die
   *  Ergebniszeile leer. `auffuellen`: fehlende Nachkommastellen als 0 in der Akzentfarbe zeigen (für Beispiele). */
  | { art: 'rechnungen'; items: Rechnung[]; spalten?: 1 | 2 | 3 | 4; auffuellen?: boolean }
  /** Rechenkästchen (Karopapier) für eigene Rechnungen. */
  | { art: 'kaestchen'; zeilen: number; label?: string }
  /** Kassenbon: Posten mit Preisen; ohne `summe` bleibt die Summe zum Ausrechnen leer. */
  | { art: 'bon'; titel?: string; posten: { text: string; preis: string }[]; summe?: string; fuss?: string }
  /** Rechenpäckchen: kurze Aufgaben in Spalten. Im Text: `___` Antwortlinie, `[]` Kästchen (für <, >, =),
   *  `{35}` vorgegebene Antwort in der Akzentfarbe (Beispiel), `#3/4#` Bruch mit Bruchstrich. */
  | { art: 'paeckchen'; items: string[]; spalten?: 1 | 2 | 3 | 4; buchstaben?: boolean }
  /** Stellenwerttafel: `stellen` z. B. ['Z', 'E', 'z', 'h'], das Komma steht nach der Stelle Nr. `komma` (ab 1).
   *  Zeilen mit `zahl` sind ausgefüllt (Beispiel), ohne `zahl` leer zum Eintragen. */
  | { art: 'stellentafel'; stellen: string[]; komma: number; zeilen: { label?: string; zahl?: string }[] }
  /** Hunderterfelder (10 × 10 = 1 Ganzes): `gefaerbt` Kästchen sind gefärbt, spaltenweise (erst ganze Zehntel).
   *  `text` steht darunter, ohne `text` eine Schreiblinie. */
  | { art: 'hunderterfeld'; felder: { gefaerbt?: number; text?: string; label?: string }[]; spalten?: 2 | 3 | 4 }
  /** Zahlenstrahl über die ganze Breite. Werte mit Komma als Text („0,25“). `zahlen` werden beschriftet,
   *  `punkte` sind Pfeile mit Buchstaben (ohne `name`: leerer Kasten zum Eintragen). */
  | { art: 'zahlenstrahl'; von: string; bis: string; schritt: string; fein?: string; zahlen?: string[]; punkte?: { wert: string; name?: string }[] }
  /** Bruchbilder: Kreise, Rechtecke, Streifen, Mengen und die Bruchwand. */
  | { art: 'bruchbilder'; items: Bruchbild[]; spalten?: 1 | 2 | 3 | 4 }
  /** Einheiten-Treppe (l – dl – cl – ml, t – kg – g): nach unten malnehmen, nach oben teilen. */
  | { art: 'treppe'; stufen: string[]; runter: string; rauf: string; beispiel?: string }
  /** Komma-Sprünge bei · und : 10, 100, 1000: Ziffern in Kästchen, Bögen für jeden Sprung. Ohne `ergebnis` zum Einzeichnen. */
  | { art: 'kommasprung'; items: { zahl: string; op: '·' | ':'; faktor: 10 | 100 | 1000; ergebnis?: string; label?: string; boegen?: boolean }[]; spalten?: 1 | 2 | 3 }
  /** Geometrie in Originalgröße: Maße in mm (zum Nachmessen muss das Blatt in 100 % gedruckt werden). */
  | { art: 'geo'; felder: GeoFeld[]; spalten?: 1 | 2 | 3 | 4 }
  // --- Bildgeschichten & Karten ---------------------------------------------
  | { art: 'comic'; felder: ComicFeld[]; spalten?: 2 | 3 }
  | { art: 'karten'; karten: { titel?: string; text?: string; bild?: BildId }[]; spalten?: 2 | 3 | 4; hoehe?: number }
  // --- Abschluss -------------------------------------------------------------
  | { art: 'rueckblick'; frage?: string }
  | { art: 'notfall'; eintraege?: { name: string; nummer: string }[]; text?: string }

export type BausteinArt = Baustein['art']

/** Eine schriftliche Rechnung: Zahlen als Text mit Komma („12,5“), Operator '+' oder '-'. */
export interface Rechnung {
  zeilen: string[]
  op?: '+' | '-'
  ergebnis?: string
  /** Kleine Überschrift, z. B. „a)“ oder „Beispiel“. */
  label?: string
}

/** Ein Bruchbild. Beschriftung: `bruch` als Bruch mit Bruchstrich ('3/4'; '' = leerer Bruch zum Ausfüllen),
 *  `text` als Zeile darunter ('' = Schreiblinie), `ankreuzen` als kleine Auswahl (z. B. ['ja', 'nein']). */
export interface Bruchbild {
  /** kreis, rechteck (2 Reihen bei 4, 6, 8 Teilen), streifen, menge (Punkte), wand (Bruchstreifen untereinander) */
  form: 'kreis' | 'rechteck' | 'streifen' | 'menge' | 'wand'
  /** Anzahl der Teile (kreis, rechteck, streifen) */
  teile?: number
  /** gefärbte Teile – bei `menge` gefärbte Gruppen */
  gefaerbt?: number
  /** Teile absichtlich ungleich groß (Fehler finden) */
  ungleich?: boolean
  /** menge: Anzahl der Punkte; `gruppen` > 0 kreist sie in so viele gleiche Gruppen ein */
  anzahl?: number
  gruppen?: number
  /** wand: Nenner der Streifen, z. B. [1, 2, 3, 4] */
  nenner?: number[]
  bruch?: string
  text?: string
  label?: string
  ankreuzen?: string[]
}

/** Ein Feld mit einer Zeichnung in Originalgröße; alle Maße in mm, Ursprung oben links, y nach unten. */
export interface GeoFeld {
  /** Breite (Standard: ganze Spalte) und Höhe in mm */
  b?: number
  h: number
  label?: string
  /** Zeile unter der Zeichnung ('' = Schreiblinie) */
  text?: string
  /** Hintergrund: Karo (5 mm) oder Punkte (5 mm) */
  raster?: 'karo' | 'punkte'
  elemente: GeoElement[]
}

export type GeoPunkt = [number, number] | string

/** Winkel in Grad, gegen den Uhrzeigersinn ab „nach rechts“ (wie im Heft). */
export type GeoElement =
  /** Punkt als kleines Kreuz mit Namen; `lage` = wo der Name steht (o, u, l, r, ol, or, ul, ur) */
  | { t: 'punkt'; name?: string; x: number; y: number; lage?: 'o' | 'u' | 'l' | 'r' | 'ol' | 'or' | 'ul' | 'ur'; kreuz?: boolean }
  /** Strecke (von–bis), Halbgerade (ab `von` durch `bis` bis zum Rand) oder Gerade (durch beide bis zu den Rändern).
   *  `name` steht am Ende (z. B. „g“), `stil` 'strasse' zeichnet eine breite helle Straße. */
  | { t: 'linie'; von: GeoPunkt; bis: GeoPunkt; art?: 'strecke' | 'halbgerade' | 'gerade'; farbe?: 'tinte' | 'tief' | 'grau'; stil?: 'strasse' | 'dick' | 'gestrichelt'; name?: string; mass?: string }
  /** Winkel mit Scheitel (x, y), Schenkel in Richtung a1 und a2, Länge r; `marke`: Bogen bzw. Quadrat bei 90° */
  | { t: 'winkel'; x: number; y: number; a1: number; a2: number; r?: number; r2?: number; marke?: boolean; name?: string }
  /** Vieleck; `seiten` Beschriftung je Seite (von Ecke i zu i+1), `ecken` Namen, `rechte` Ecken mit rechtem Winkel */
  | { t: 'vieleck'; punkte: [number, number][]; seiten?: string[]; ecken?: string[]; rechte?: number[]; fuellung?: boolean }
  | { t: 'text'; x: number; y: number; text: string; klein?: boolean; fett?: boolean; mitte?: boolean }
  /** Lineal: Oberkante bei y, die 0 bei x0, `cm` lang */
  | { t: 'lineal'; x0: number; y: number; cm: number }
  /** Uhr mit Stunden- und Minutenzeiger */
  | { t: 'uhr'; x: number; y: number; r: number; h: number; m?: number }
  /** Laptop von der Seite: Scharnier (x, y), Tastatur nach rechts, Bildschirm im Winkel `winkel` */
  | { t: 'laptop'; x: number; y: number; winkel: number; l?: number }
  /** Helle Fläche (Häuserblock, Park, Wasser) für Pläne */
  | { t: 'flaeche'; x: number; y: number; b: number; h: number; ton?: 'grau' | 'gruen' | 'blau'; rx?: number }

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
  /** Lösungen (Mathe), kurz je Aufgabe: „1) 6,8 · 8,75 …“. */
  loesungen?: string[]
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

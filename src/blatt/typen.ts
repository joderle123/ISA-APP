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
export type Bereich = 'gefuehle' | 'verhalten' | 'miteinander' | 'lernen' | 'alltag' | 'werkzeuge' | 'skills' | 'selbstreflexion' | 'mathe' | 'spielschule'

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

/** Farbwörter für Legenden (Körper, Ampel …) und Farbpunkte im Text (`{rot}`, siehe BLATT-STIL.md). */
export type Farbwort = 'rot' | 'orange' | 'gelb' | 'gruen' | 'blau' | 'lila' | 'grau' | 'braun' | 'schwarz' | 'weiss' | 'rosa' | 'hellblau'

/** Spielschule: ein Bild mit kurzem Wort darunter (Karten zum Ausschneiden, Spielfelder …). */
export interface SpielBild {
  bild: BildId
  text?: string
}

/** Fertige Formen für `punkte_verbinden` (Punkte in fester Reihenfolge, siehe src/blatt/spielschule.ts). */
export type PunkteForm = 'stern' | 'haus' | 'herz' | 'fisch' | 'boot' | 'ballon' | 'apfel' | 'tanne' | 'drachen' | 'schmetterling'

/** Kleidung für die Anziehpuppe. */
export type Kleidungsstueck =
  | 'muetze'
  | 'sonnenhut'
  | 'schal'
  | 'handschuhe'
  | 'jacke'
  | 'regenjacke'
  | 'pulli'
  | 'tshirt'
  | 'kleid'
  | 'hose'
  | 'kurzehose'
  | 'stiefel'
  | 'gummistiefel'
  | 'sandalen'

export interface Stufentext {
  titel: string
  text?: string
}

export type Baustein =
  // --- Struktur & Text -----------------------------------------------------
  /** `stufe` (Mathe): kleine Punkte neben der Nummer – 1 Basis, 2 Kern, 3 Plus; unauffällig, nur als Orientierung.
   *  `niveau` (Spielschule): Zeichen neben der Nummer – 'einstieg' (Keimling: die einfachste Aufgabe) oder
   *  'stern' (Stern-Aufgabe für ältere oder schnellere Kinder). */
  | { art: 'aufgabe'; text: string; hinweis?: string; symbole?: Symbol[]; stufe?: 1 | 2 | 3; niveau?: 'einstieg' | 'stern' }
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
  /** `woerter`: eigene Wörter unter den Gesichtern (statt der Standardwörter, z. B. « content » statt « joyeux·se »). */
  | { art: 'gefuehle'; gefuehle: Gefuehl[]; modus?: 'benennen' | 'einkreisen' | 'nur'; leer?: number; spalten?: number; woerter?: string[] }
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
  /** Spielschule: Forscherblatt zum Experiment der Woche – „Ich vermute“, „Ich sehe“, „So war es“ (eine ganze Seite). */
  | ({ art: 'forscherblatt' } & Forscherblatt)
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
  /** Rechtecke und Quadrate auf Zentimeter-Karo in Originalgröße (1 Kästchen = 1 cm²): zum Auszählen, zum Nachmessen
   *  (`kaestchen: false`) oder als leeres Karo zum Selberzeichnen (`feld`). */
  | { art: 'flaeche'; felder: FlaecheFeld[]; spalten?: 1 | 2 | 3 | 4 }
  /** Thermometer (°C) als senkrechter Zahlenstrahl mit Minusgraden: `wert` = rote Säule (ablesen), ohne `wert` zum
   *  Einfärben; `ziel` = Marke, mit `pfeil` die Änderung als Pfeil (über die 0 in zwei Teilen). */
  | { art: 'temperatur'; von: number; bis: number; items: TemperaturItem[]; spalten?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 }
  /** Komma-Sprünge bei · und : 10, 100, 1000: Ziffern in Kästchen, Bögen für jeden Sprung. Ohne `ergebnis` zum Einzeichnen. */
  | { art: 'kommasprung'; items: { zahl: string; op: '·' | ':'; faktor: 10 | 100 | 1000; ergebnis?: string; label?: string; boegen?: boolean }[]; spalten?: 1 | 2 | 3 }
  /** Geometrie in Originalgröße: Maße in mm (zum Nachmessen muss das Blatt in 100 % gedruckt werden). */
  | { art: 'geo'; felder: GeoFeld[]; spalten?: 1 | 2 | 3 | 4 }
  /** Säulendiagramm (`liegend`: Balken nach rechts) mit Achsen, Skala und Gitter. Ohne Wert (`null` oder ohne `werte`)
   *  kein Balken – zum Selberzeichnen; leere Kategorie '' = Schreiblinie. `achsen`: [Kategorien-Achse, Werte-Achse].
   *  `zahlen` schreibt die Werte an die Balken, `einheiten` teilt sie in Kästchen (Ausgleichen), `linie` = gestrichelte
   *  Linie quer mit Legende (z. B. Mittelwert). */
  | { art: 'diagramm'; kategorien: string[]; werte?: (number | null)[]; max: number; schritt: number; fein?: number; achsen?: [string, string]; titel?: string; liegend?: boolean; zahlen?: boolean; einheiten?: boolean; linie?: { wert: number; text?: string }; hoehe?: number }
  /** Strichliste mit Häufigkeit: Striche in Fünferbündeln (der fünfte quer). Ohne `striche` bzw. `anzahl` bleibt das Feld
   *  leer. `kopf`: Spaltentitel, `daten`: Urliste darüber zum Abhaken, `summe`: Zeile „Gesamt“ (true = leer, Zahl = ausgefüllt). */
  | { art: 'strichliste'; kopf?: [string, string, string]; zeilen: { text: string; striche?: number; anzahl?: number }[]; daten?: string[]; summe?: boolean | number }
  // --- Bildgeschichten & Karten ---------------------------------------------
  | { art: 'comic'; felder: ComicFeld[]; spalten?: 2 | 3 }
  | { art: 'karten'; karten: { titel?: string; text?: string; bild?: BildId }[]; spalten?: 2 | 3 | 4; hoehe?: number }
  // --- Spielschule: Blätter zum Tun (Schneiden, Kleben, Falten, Spielen) – je eine ganze Seite ----------
  /** Bildfolge: 3–6 Bilder in der RICHTIGEN Reihenfolge angeben. Auf dem Blatt stehen oben nummerierte Klebefelder
   *  1, 2, 3 …, unten die Bilder gemischt auf einem Streifen zum Ausschneiden (`gemischt: false` = nicht mischen). */
  | { art: 'schneiden_kleben'; bilder: SpielBild[]; gemischt?: boolean }
  /** Memory zum Ausschneiden: jedes Bild ergibt ein Paar (`paar` = anderes Bild als Gegenstück, z. B. das Tierkind).
   *  4–8 Paare. `rueckseite`: Rückseiten unter einer Faltlinie – Blatt falten, kleben, dann schneiden (bis 6 Paare). */
  | { art: 'memory'; bilder: (SpielBild & { paar?: BildId })[]; rueckseite?: boolean }
  /** Labyrinth vom Start- zum Zielbild. Aus `seed` erzeugt (immer lösbar, genau ein Weg), Gänge mindestens 15 mm.
   *  `stufe` 1 (klein, für 3-Jährige) bis 3. */
  | { art: 'labyrinth'; start: BildId; ziel: BildId; stufe?: 1 | 2 | 3; seed?: number }
  /** Würfel-Laufweg: 10–16 Felder (Bild und/oder kurzes Wort/Handlung) als Schlangenweg mit Start und Ziel, darunter
   *  Spielfiguren zum Ausschneiden (`figuren`, Standard: vier Kinder). */
  | { art: 'laufweg'; felder: { bild?: BildId; text?: string }[]; start?: BildId; ziel?: BildId; figuren?: BildId[] }
  /** Mini-Buch aus einem Blatt (einmal schneiden, falten): Titelseite, 6 Innenseiten (Bild oder leerer Malrahmen,
   *  kurzes Wort), Rückseite „Das Buch von ___“. */
  | { art: 'minibuch'; titel: string; titelbild?: BildId; seiten: { bild?: BildId; text?: string }[] }
  /** Punkte verbinden 1–n (4–10 Punkte): fertige `form` oder eigene `punkte` (x, y in 0–100, im Uhrzeigersinn).
   *  `gruppen`: neben jeder Zahl die Menge als Punkte. */
  | { art: 'punkte_verbinden'; form?: PunkteForm; punkte?: [number, number][]; gruppen?: boolean }
  /** Klappbild „Wer versteckt sich?“: 2–6 Fenster mit Bild; Klappen zum Ausschneiden, an der Lasche falten und auf
   *  den Klebestreifen über dem Fenster kleben. `klappe` = Bild auf allen Klappen (Tür, Busch …). */
  | { art: 'klappbild'; bilder: SpielBild[]; klappe?: BildId }
  /** Fädelkarte: große Form mit Lochmarken (Lochzange) am Rand, Motiv in der Mitte. */
  | { art: 'faedelkarte'; form?: 'kreis' | 'oval' | 'herz' | 'stern' | 'quadrat'; bild?: BildId; loecher?: number; ausmalen?: boolean }
  /** Bastelbogen: Maske (Augenlöcher, `ohren`), Krone, Stirnband (mit `bild` oder `ohren`) oder Fahne (`farben` als
   *  Streifen zum Ausmalen, leer = eigene Fahne). Krone und Stirnband mit Streifen zum Verlängern. */
  | { art: 'bastelbogen'; vorlage: 'maske' | 'krone' | 'stirnband' | 'fahne'; bild?: BildId; ohren?: 'katze' | 'hase' | 'baer' | 'maus'; farben?: Farbwort[] }
  /** Suchbild: Szene mit verstreuten Bildern; darunter „Finde: 3 ×“ mit Zählkästchen. `suchen` 1–4 Bilder (je 1–6 Mal),
   *  `ablenker` andere Bilder (je `anzahl`, Standard 2). Lage aus `seed`. */
  | { art: 'suchbild'; suchen: { bild: BildId; anzahl: number }[]; ablenker?: { bild: BildId; anzahl?: number }[]; szene?: 'wiese' | 'wald' | 'wasser' | 'schnee' | 'zimmer' | 'nacht'; seed?: number }
  /** Anziehpuppe: Kind (Haare und Haut wie `figur`) und Kleidung zum Ausschneiden in passender Größe. */
  | { art: 'anziehpuppe'; figur?: string; kleider: Kleidungsstueck[]; ausmalen?: boolean }
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

/** Ein Rechteck auf Zentimeter-Karo, in Originalgröße (Maße in cm). */
export interface FlaecheFeld {
  /** Länge (waagrecht) und Breite (senkrecht) in cm; 0 und 0 = kein Rechteck (leeres Karo, dann `feld` angeben) */
  l: number
  b: number
  /** Karo-Feld in cm [Breite, Höhe] mit Karo auch um das Rechteck (zum Selberzeichnen); das Rechteck liegt mittig */
  feld?: [number, number]
  /** cm²-Kästchen im Rechteck (Standard: ja); false = nur der Umriss zum Nachmessen */
  kaestchen?: boolean
  /** so viele Kästchen reihenweise färben (z. B. eine Reihe) */
  gefaerbt?: number
  /** Seitenlängen anschreiben: [oben, rechts], z. B. ['6 cm', '4 cm'] */
  masse?: [string, string]
  label?: string
  /** Zeile unter der Zeichnung ('' = Schreiblinie) */
  text?: string
}

/** Ein Thermometer: `wert` füllt die Säule, `ziel` setzt eine Marke, `pfeil` zeichnet die Änderung von `wert` nach `ziel`. */
export interface TemperaturItem {
  wert?: number
  ziel?: number
  pfeil?: boolean
  label?: string
  /** Zeile darunter ('' = Schreiblinie) */
  text?: string
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
  /** Spielschule: zweite Seite „Aktivitäten & Ideen“ für die ganze Themenwoche. */
  spielschule?: Spielideen
}

/** Spielschule: Art einer Aktivität (Symbol und Farbe auf der Seite „Aktivitäten & Ideen“). */
export type AktivitaetArt = 'kreis' | 'bewegung' | 'gestalten' | 'sprache' | 'musik' | 'sinne' | 'zaehlen' | 'spiel' | 'draussen' | 'ruhe' | 'kochen' | 'theater'

export interface Aktivitaet {
  art: AktivitaetArt
  titel: string
  /** 2–3 Sätze: was die Kinder tun, wie die Erwachsenen es anleiten. */
  text: string
  /** z. B. '10 Min.' */
  dauer?: string
  material?: string
}

/** Alles für eine Themenwoche in der Spielschule (Seite „Aktivitäten & Ideen“).
 *  Die Felder ab `beobachtung` sind optional und füllen die Seite „Beobachten & Begleiten“ – sie stehen in jeder
 *  Sprachfassung (de/fr) in deren Sprache. Was für beide Fassungen gleich ist oder mehrere Sprachen nebeneinander
 *  zeigt (Domänen, Wörterstreifen, Satz der Woche, Elternbrief), steht einmal in `Blatt.woche`. */
export interface Spielideen {
  /** Wörter der Woche mit Artikel: „der Igel“, « le hérisson » (6–10). */
  wortschatz: string[]
  /** 5–6 Aktivitäten, verschiedene Arten. */
  aktivitaeten: Aktivitaet[]
  /** Eigener Reim oder Fingerspiel (selbst geschrieben, keine geschützten Lieder), mit Bewegungen. */
  reim?: { titel: string; zeilen: string[]; gesten?: string }
  /** Ideen für die Spielecken (Bauecke, Puppenecke, Malatelier, Lese-Ecke …), 2–4. */
  ecken?: string[]
  /** Ein Tipp für zu Hause, 1–2 Sätze (kurz, auf „Aktivitäten & Ideen“). Der ganze Brief: `Blatt.woche.elternbrief`. */
  eltern?: string
  // --- Beobachten & Begleiten (optional) ---------------------------------------------------------------
  /** Beobachtungsfenster: genau 3 „Ich kann …“-Punkte, beobachtbar, je mit einem ELDiB-Ziel. Die drei Stufen
   *  (mit Hilfe · allein · zeigt es anderen) sind fest. Dieselben Punkte stehen im Klassenraster und auf dem
   *  Portfolio-Blatt des Kindes. */
  beobachtung?: Beobachtungspunkt[]
  /** Mitbestimmung: eine echte Entscheidung der Kinder in dieser Woche, dazu die Frage fürs Fragenplakat am Montag. */
  entscheiden?: { text: string; frage?: string }
  /** Je eine kurze Zeile für die drei Jahrgänge des Cycle 1. */
  stufen?: Altersstufen
  /** „Zugang für alle“: 2–3 kurze Anpassungen (Realgegenstand, Gebärde, Bildplan, Reizreduktion …). */
  zugang?: string[]
  /** Eine Zeile „Mehrsprachig“: wie Familiensprachen in dieser Woche vorkommen. */
  mehrsprachig?: string
  /** Freitags-Karte: was man vor dem Start wissen und besorgen muss. Die Angaben ohne Text (Vorlauf, Küche,
   *  Ausflug, Besuch, Material) müssen in DE und FR gleich sein. */
  freitag?: Freitagskarte
  /** Experiment der Woche: eigene Lehrerseite „Forschen“ (nach „Aktivitäten & Ideen“), Forscherblatt als
   *  Zusatzseite und eine Seite in der Forscherkartei. */
  experiment?: Experiment
}

/** Ein Ding oder ein Schritt mit eigenem Bild (sonst sucht die Seite das Bild über Stichwörter). */
export interface Bildtext {
  text: string
  bild: BildId
}

/** Phänomene für das Register der Forscherkartei (Bezeichnungen DE/FR in src/blatt/forschen.ts). */
export type PhaenomenId =
  | 'farben' | 'wasser-wandert' | 'schwimmen' | 'loesen' | 'waerme' | 'verdunsten' | 'luft' | 'licht' | 'magnet'
  | 'schall' | 'pflanzen' | 'lebewesen' | 'sinne' | 'kraefte' | 'gewicht' | 'stoffe' | 'oberflaeche' | 'elektrizitaet'

/** Spielschule: Experiment der Woche (je Sprachfassung, in deren Sprache). Längen siehe BLATT-STIL.md –
 *  das Prüfskript hält sie ein, damit die Seite nie überläuft. */
export interface Experiment {
  /** Name des Experiments, z. B. „Der Wattepad-Regenbogen“. */
  titel: string
  /** Forscherfrage, wie man sie den Kindern stellt („Wohin wandern die Farben?“). */
  frage: string
  /** 3–8 Dinge, mit Menge. Bild per Stichwort (Wattepad, Pipette, Wasser …) oder selbst: { text, bild }. */
  material: (string | Bildtext)[]
  /** 3–5 Schritte, je ein Satz oder zwei. Piktogramm per Stichwort (tropfen, legen, warten …) oder { text, bild }. */
  schritte: (string | Bildtext)[]
  /** Vermuten: wie die Kinder ihre Vermutung zeigen (Frage, Daumen, Bildkarten) und was sie oft sagen. */
  vermutung: string
  /** Beobachten: worauf die Kinder achten, was die Erwachsenen fragen. */
  beobachten: string
  /** Erklären: „Warum?“ in Kindersprache, 1–2 kurze Sätze. */
  warumKind: string
  /** Fachlicher Hintergrund für Erwachsene, sachlich. */
  hintergrund: string
  /** 1–3 Zeilen; Standardsätze als 'standard:<schlüssel>' (src/blatt/spielschule.ts). */
  sicherheit: string[]
  /** Weiterforschen: eine Variante oder Frage für die nächsten Tage. */
  weiter: string
  /** z. B. '20 Min.' */
  dauer: string
  /** 1–2 Phänomene für das Register der Forscherkartei (in DE und FR dieselben). */
  phaenomene: PhaenomenId[]
  /** Forscherblatt als Zusatzseite: Bilder für „Ich vermute“ und „So war es“ (ohne: Daumen hoch/runter). */
  forscherblatt?: Forscherblatt
}

/** Forscherblatt (Kinderseite): drei große Rahmen mit Piktogrammen, ohne Lesen. */
export interface Forscherblatt {
  /** Forscherfrage zum Vorlesen (≤ 60 Zeichen). Auf der Zusatzseite: die Frage des Experiments. */
  frage?: string
  /** Bild neben der Frage. */
  bild?: BildId
  /** „Ich vermute“: 2–3 Bilder zum Einkreisen; ohne Angabe Daumen hoch / Daumen runter. */
  vermuten?: ForscherWahl[]
  /** „Ich sehe“: ein großer Rahmen (frei) oder zwei Rahmen „vorher“ und „nachher“. */
  sehen?: 'frei' | 'vorher-nachher'
  /** „So war es“: 2–3 Bilder zum Einkreisen (ohne Angabe dieselben wie bei „Ich vermute“) oder drei Gesichter. */
  ergebnis?: ForscherWahl[] | 'gesichter'
  /** Namenszeile oben (Standard: ja; auf Seite 2 nötig, weil dort der Kopf ohne Namen steht). */
  name?: boolean
}

export interface ForscherWahl {
  bild: BildId
  /** Wort unter dem Bild (≤ 18 Zeichen), für Erwachsene zum Vorlesen. */
  text?: string
}

/** Ein Punkt im Beobachtungsfenster, z. B. { text: 'Ich zähle bis 5 und zeige auf jedes Ding.', eldib: 'KOG-22' }. */
export interface Beobachtungspunkt {
  /** „Ich kann …“-Satz aus Sicht des Kindes (DE „Ich …“, FR « Je … »), ≤ 70 Zeichen, beobachtbar. */
  text: string
  /** Ein ELDiB-Ziel, z. B. 'KOG-22'. */
  eldib: string
}

/** Cycle 1: Précoce (3–4 Jahre), Préscolaire 1 (4–5), Préscolaire 2 (5–6) – je eine kurze Zeile. */
export interface Altersstufen {
  precoce: string
  p1: string
  p2: string
}

/** Freitags-Karte. `sicherheit`: höchstens 3 Zeilen; Standardsätze als 'standard:<schlüssel>' (siehe
 *  src/blatt/spielschule.ts: spiesse, pusten, fotos, hitze, kleinteile, allergien, messer, wasser). */
export interface Freitagskarte {
  /** Vorlauf in Wochen: 0 = sofort startklar, 1 = eine Woche, 3 = drei Wochen (Termine, Einwilligungen). */
  vorlauf: 0 | 1 | 3
  /** Herd, Ofen oder Kochplatte nötig */
  kueche?: boolean
  /** Ausflug außerhalb des Schulgeländes */
  ausflug?: boolean
  /** Besuch in der Klasse (Familie, Fachperson) */
  besuch?: boolean
  /** Material-Ampel: standard = in jeder Spielschule da, besorgen = einkaufen/sammeln, selten = ausleihen/bestellen */
  material: 'standard' | 'besorgen' | 'selten'
  /** Plan B in einer Zeile (Regen, kein Schnee, keine Küche …). */
  planB?: string
  /** Die (höchstens) 3 wichtigsten Risiken der Woche. */
  sicherheit?: string[]
}

/** Lernbereiche des Plan d'études Cycle 1 (feste ids, Bezeichnungen in src/blatt/spielschule.ts). */
export type DomaeneId = 'logique-math' | 'langage' | 'monde' | 'psychomotricite' | 'expression' | 'vivre-ensemble'

/** Spielschule: was für beide Sprachfassungen gleich ist oder mehrere Sprachen nebeneinander zeigt. */
export interface Themenwoche {
  /** Lernbereiche des Plan d'études Cycle 1 (1–3). */
  domaenen?: DomaeneId[]
  /** Wörterstreifen DE/FR/LB/PT und Satz der Woche. */
  sprachen?: Sprachschicht
  /** Brief an die Familien (eigene Seite, als Zusatz-Download). */
  elternbrief?: Elternbrief
}

/** Mehrsprachiger Wörterstreifen und Satz der Woche. Luxemburgisch wird normal gedruckt, bleibt aber mit
 *  `geprueft: false` markiert, bis eine Muttersprachlerin es gegen LOD geprüft hat (Liste: scripts/lb-liste.ts). */
export interface Sprachschicht {
  /** 6–8 Wörter, je mit Artikel: { de: 'der Apfel', fr: 'la pomme', lb: 'den Apel', pt: 'a maçã' }.
   *  `bild` optional – sonst das Bild der Bildkarte mit demselben deutschen Titel. */
  woerter: WochenWort[]
  /** Satzmuster der Woche, z. B. „Ich möchte …, bitte.“ */
  satz?: { de: string; fr: string; lb?: string; pt?: string }
  /** Luxemburgisch (Wörter und Satz) von einer Muttersprachlerin geprüft? */
  geprueft: boolean
}

export interface WochenWort {
  de: string
  fr: string
  lb: string
  pt?: string
  bild?: BildId
}

/** Elternbrief: DE und FR Pflicht, PT und LB optional (LB mit `geprueft`). */
export interface Elternbrief {
  de: Brieftext
  fr: Brieftext
  pt?: Brieftext
  lb?: Brieftext & { geprueft: boolean }
}

export interface Brieftext {
  /** Ein Absatz „Das machen wir“ (2–3 Sätze). */
  woche: string
  /** Eine Alltagsidee ohne Kosten (1–2 Sätze). */
  idee: string
  /** Eine Bitte an die Familien: ein Wort, Lied, Rezept … mitbringen (1–2 Sätze). */
  bitte: string
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
  /** Nur Spielschule: Domänen, Wörterstreifen DE/FR/LB/PT, Satz der Woche, Elternbrief (für beide Sprachfassungen). */
  woche?: Themenwoche
  de: BlattInhalt
  fr?: BlattInhalt
}

/** Blatt mit vergebener Nummer (z. B. 'G-07'), wie es die App verwendet. */
export interface NummeriertesBlatt extends Blatt {
  nr: string
}

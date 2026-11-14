// SOLO AKTION – Hefte zum Machen für die Bezugszeit: je Thema acht Aktionen, eine Seite je Aktion.
// Wenig Text, einfache Sprache, Ankreuzen und Zeichnen statt Schreiben (auch für Jugendliche mit Förderbedarf).
import type { Clip, Frage } from './typen'
import type { Karte } from './solo-typen'

export type Zone =
  /** Aufgaben wie in SOLO (Ankreuzen, Kreise, Regler, Raster …) */
  | { art: 'fragen'; fragen: Frage[] }
  /** leere Tabelle zum Eintragen: erste Spalte Beschriftung */
  | { art: 'tabelle'; kopf: string[]; zeilen: string[] }
  /** je Zeile ein Satz und zwei Kästchen für Zahlen (du / Gegenüber) */
  | { art: 'werte'; kopf: [string, string]; zeilen: string[]; von?: string; bis?: string }
  /** Körper-Umriss zum Anmalen und Wörter zum Ankreuzen */
  | { art: 'koerper'; woerter: string[] }
  /** drei Ringe um einen Punkt (innen, Mitte, außen) zum Hineinschreiben */
  | { art: 'ringe'; ringe: [string, string, string] }
  /** leere Bildfelder zum Zeichnen (2 je Reihe), jedes mit Titel */
  | { art: 'felder'; titel: string[] }
  /** farbiger Kasten mit einem wichtigen Text zum Vorlesen */
  | { art: 'hinweis'; label: string; titel: string; x: string }
  /** kurze Geschichte in Bildern: Icon und ein Satz je Feld */
  | { art: 'comic'; bilder: [string, string][] }
  /** Auswahl mit Icons und Kästchen */
  | { art: 'wahl'; punkte: [string, string][] }
  /** Video mit QR-Code */
  | { art: 'clip'; clip: Clip }
  /** Sätze mit Daumen hoch / runter für beide */
  | { art: 'daumen'; saetze: string[] }
  /** Wochen-Gitter: Zeilen × Mo–So */
  | { art: 'woche'; zeilen: string[] }
  /** Karten für die Tasche */
  | { art: 'karten'; karten: Karte[] }

export interface Aktion {
  titel: string
  icon: string
  zeit: string
  wer: string
  material: string
  /** Figur neben den Schritten (Open Peeps) */
  bild?: string
  /** höchstens fünf kurze Schritte */
  schritte: string[]
  zonen: Zone[]
  /** ein Satz zum Merken */
  aha: string
  /** für die Bezugsperson */
  ziel: string
  tipp: string
}

export interface AktionsHeft {
  id: string
  nr: string
  datei: string
  thema: string
  headline: string
  farbe: string
  stand: string
  bild: string
  sticker: string
  /** drei kurze Sätze auf der ersten Seite */
  start: string[]
  aktionen: Aktion[]
  /** letzte Seite: Auftrag für die Woche */
  woche: Aktion
  begleitung: { material: string; achtung: string; mehr: string }
}

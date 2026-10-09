// ---------------------------------------------------------------------------
// Module als Heft: Mathe-Modul 2 (5e, MA-01 bis MA-12) und Modul 3 (5e, MA-13 bis MA-21).
// Themen und Reihenfolge, Lernziele („Mein Ziel“) und der Wortschatz
// Deutsch – Französisch für Deckblatt, Inhalt und Anhang des Modulhefts.
// ---------------------------------------------------------------------------

import type { Bereich, Sprache } from './typen'

type Zweisprachig = Record<Sprache, string>

export interface ModulThema {
  titel: Zweisprachig
  /** Piktogramm, z. B. 'icon:decimal' */
  bild: string
  /** Blatt-ids in der Reihenfolge der Lektionen */
  lektionen: string[]
}

export interface Modul {
  id: string
  nr: number
  /** Bereich der Toolbox, in dem das Heft zum Herunterladen steht */
  bereich: Bereich
  fach: Zweisprachig
  klasse: string
  titel: Zweisprachig
  untertitel: Zweisprachig
  themen: ModulThema[]
  /** „Mein Ziel: …“ je Lektion (Blatt-id) */
  lernziele: Record<string, Zweisprachig>
  /** Fachwörter je Thema (Index in `themen`) */
  wortschatz: { thema: number; de: string; fr: string }[]
}

export const MATHE_MODUL_2: Modul = {
  id: 'mathe-m2',
  nr: 2,
  bereich: 'mathe',
  fach: { de: 'Mathe', fr: 'Mathématiques' },
  klasse: '5e',
  titel: { de: 'Dezimalzahlen, Brüche, Größen und Geometrie', fr: 'Nombres décimaux, fractions, grandeurs et géométrie' },
  untertitel: { de: '12 Lektionen mit Regel, Beispiel und Übungen in drei Stufen – aus dem Alltag, nicht aus dem Lehrbuch.', fr: '12 leçons avec règle, exemple et exercices sur trois niveaux – tirés du quotidien, pas du manuel.' },
  themen: [
    { titel: { de: 'Dezimalzahlen', fr: 'Nombres décimaux' }, bild: 'icon:decimal', lektionen: ['mathe-m2-zehntel-hundertstel', 'mathe-m2-vergleichen-ordnen', 'mathe-m2-komma-unter-komma', 'mathe-m2-komma-springt'] },
    { titel: { de: 'Brüche', fr: 'Fractions' }, bild: 'icon:pizza', lektionen: ['mathe-m2-haelfte-drittel-viertel', 'mathe-m2-bruchteil-menge'] },
    { titel: { de: 'Kapazität und Masse', fr: 'Capacité et masse' }, bild: 'icon:scale', lektionen: ['mathe-m2-kapazitaet', 'mathe-m2-masse'] },
    { titel: { de: 'Punkt, Gerade, Strecke', fr: 'Point, droite, segment' }, bild: 'icon:line', lektionen: ['mathe-m2-punkt-gerade-strecke', 'mathe-m2-strecken-messen'] },
    { titel: { de: 'Winkel und Umfang', fr: 'Angles et périmètre' }, bild: 'icon:angle', lektionen: ['mathe-m2-winkel', 'mathe-m2-umfang'] },
  ],
  lernziele: {
    'mathe-m2-zehntel-hundertstel': { de: 'Ich lese Dezimalzahlen und kenne Zehntel und Hundertstel.', fr: 'Je lis les nombres décimaux et je connais les dixièmes et les centièmes.' },
    'mathe-m2-vergleichen-ordnen': { de: 'Ich vergleiche und ordne Dezimalzahlen.', fr: 'Je compare et je range des nombres décimaux.' },
    'mathe-m2-komma-unter-komma': { de: 'Ich addiere und subtrahiere Dezimalzahlen.', fr: 'J’additionne et je soustrais des nombres décimaux.' },
    'mathe-m2-komma-springt': { de: 'Ich rechne mal und geteilt durch 10, 100 und 1000.', fr: 'Je multiplie et je divise par 10, 100 et 1000.' },
    'mathe-m2-haelfte-drittel-viertel': { de: 'Ich erkenne Hälfte, Drittel und Viertel als gleiche Teile.', fr: 'Je reconnais la moitié, le tiers et le quart comme des parts égales.' },
    'mathe-m2-bruchteil-menge': { de: 'Ich berechne den Bruchteil einer Menge.', fr: 'Je calcule la fraction d’une quantité.' },
    'mathe-m2-kapazitaet': { de: 'Ich kenne l, dl, cl und ml und rechne sie um.', fr: 'Je connais l, dl, cl et ml et je les convertis.' },
    'mathe-m2-masse': { de: 'Ich kenne t, kg und g und rechne sie um.', fr: 'Je connais t, kg et g et je les convertis.' },
    'mathe-m2-punkt-gerade-strecke': { de: 'Ich unterscheide Punkt, Gerade, Halbgerade und Strecke.', fr: 'Je distingue point, droite, demi-droite et segment.' },
    'mathe-m2-strecken-messen': { de: 'Ich messe Strecken genau und finde den Mittelpunkt.', fr: 'Je mesure des segments avec précision et je trouve le milieu.' },
    'mathe-m2-winkel': { de: 'Ich unterscheide spitze, rechte und stumpfe Winkel.', fr: 'Je distingue les angles aigus, droits et obtus.' },
    'mathe-m2-umfang': { de: 'Ich berechne den Umfang von Quadrat, Rechteck und Dreieck.', fr: 'Je calcule le périmètre du carré, du rectangle et du triangle.' },
  },
  wortschatz: [
    { thema: 0, de: 'die Dezimalzahl', fr: 'le nombre décimal' },
    { thema: 0, de: 'das Komma', fr: 'la virgule' },
    { thema: 0, de: 'das Zehntel', fr: 'le dixième' },
    { thema: 0, de: 'das Hundertstel', fr: 'le centième' },
    { thema: 0, de: 'die Stellentafel', fr: 'le tableau de numération' },
    { thema: 0, de: 'vergleichen', fr: 'comparer' },
    { thema: 0, de: 'ordnen', fr: 'ranger' },
    { thema: 0, de: 'runden', fr: 'arrondir' },
    { thema: 0, de: 'addieren', fr: 'additionner' },
    { thema: 0, de: 'subtrahieren', fr: 'soustraire' },
    { thema: 0, de: 'Komma unter Komma', fr: 'virgule sous virgule' },
    { thema: 0, de: 'das Komma verschieben', fr: 'déplacer la virgule' },
    { thema: 1, de: 'der Bruch', fr: 'la fraction' },
    { thema: 1, de: 'der Zähler', fr: 'le numérateur' },
    { thema: 1, de: 'der Nenner', fr: 'le dénominateur' },
    { thema: 1, de: 'die Hälfte', fr: 'la moitié' },
    { thema: 1, de: 'ein Drittel', fr: 'un tiers' },
    { thema: 1, de: 'ein Viertel', fr: 'un quart' },
    { thema: 1, de: 'gleich große Teile', fr: 'des parts égales' },
    { thema: 1, de: 'der Bruchteil einer Menge', fr: 'la fraction d’une quantité' },
    { thema: 2, de: 'die Kapazität', fr: 'la capacité' },
    { thema: 2, de: 'der Liter, der Deziliter', fr: 'le litre, le décilitre' },
    { thema: 2, de: 'der Zentiliter, der Milliliter', fr: 'le centilitre, le millilitre' },
    { thema: 2, de: 'die Masse, das Gewicht', fr: 'la masse' },
    { thema: 2, de: 'die Tonne', fr: 'la tonne' },
    { thema: 2, de: 'das Kilogramm, das Gramm', fr: 'le kilogramme, le gramme' },
    { thema: 2, de: 'umrechnen', fr: 'convertir' },
    { thema: 3, de: 'der Punkt', fr: 'le point' },
    { thema: 3, de: 'die Gerade', fr: 'la droite' },
    { thema: 3, de: 'die Halbgerade', fr: 'la demi-droite' },
    { thema: 3, de: 'die Strecke', fr: 'le segment' },
    { thema: 3, de: 'der Schnittpunkt', fr: 'le point d’intersection' },
    { thema: 3, de: 'das Lineal', fr: 'la règle' },
    { thema: 3, de: 'die Länge', fr: 'la longueur' },
    { thema: 3, de: 'der Mittelpunkt', fr: 'le milieu' },
    { thema: 4, de: 'der Winkel', fr: 'l’angle' },
    { thema: 4, de: 'spitz, recht, stumpf', fr: 'aigu, droit, obtus' },
    { thema: 4, de: 'der Scheitel, der Schenkel', fr: 'le sommet, le côté' },
    { thema: 4, de: 'das Geodreieck', fr: 'l’équerre' },
    { thema: 4, de: 'der Umfang', fr: 'le périmètre' },
    { thema: 4, de: 'die Seite', fr: 'le côté' },
    { thema: 4, de: 'das Quadrat, das Rechteck', fr: 'le carré, le rectangle' },
    { thema: 4, de: 'das Dreieck', fr: 'le triangle' },
  ],
}

export const MATHE_MODUL_3: Modul = {
  id: 'mathe-m3',
  nr: 3,
  bereich: 'mathe',
  fach: { de: 'Mathe', fr: 'Mathématiques' },
  klasse: '5e',
  titel: { de: 'Dezimalzahlen, Fläche, Temperatur und Statistik', fr: 'Nombres décimaux, aire, température et statistique' },
  untertitel: { de: '9 Lektionen mit Regel, Beispiel und Übungen in drei Stufen – runden, rechnen, messen und Daten auswerten.', fr: '9 leçons avec règle, exemple et exercices sur trois niveaux – arrondir, calculer, mesurer et analyser des données.' },
  themen: [
    { titel: { de: 'Dezimalzahlen weiterrechnen', fr: 'Calculer avec les nombres décimaux' }, bild: 'icon:receipt', lektionen: ['mathe-m3-runden', 'mathe-m3-mal-ganze-zahl', 'mathe-m3-geteilt-ganze-zahl'] },
    { titel: { de: 'Flächeninhalt', fr: 'Aire' }, bild: 'icon:layout-grid', lektionen: ['mathe-m3-flaecheninhalt', 'mathe-m3-flaecheneinheiten'] },
    { titel: { de: 'Temperatur', fr: 'Température' }, bild: 'icon:temperature', lektionen: ['mathe-m3-temperatur'] },
    { titel: { de: 'Daten und Statistik', fr: 'Données et statistique' }, bild: 'icon:chart-bar', lektionen: ['mathe-m3-diagramme-lesen', 'mathe-m3-strichliste', 'mathe-m3-mittelwert'] },
  ],
  lernziele: {
    'mathe-m3-runden': { de: 'Ich runde Dezimalzahlen auf die Einheit.', fr: 'J’arrondis des nombres décimaux à l’unité.' },
    'mathe-m3-mal-ganze-zahl': { de: 'Ich multipliziere eine Dezimalzahl mit einer ganzen Zahl.', fr: 'Je multiplie un nombre décimal par un nombre entier.' },
    'mathe-m3-geteilt-ganze-zahl': { de: 'Ich dividiere eine Dezimalzahl durch eine ganze Zahl.', fr: 'Je divise un nombre décimal par un nombre entier.' },
    'mathe-m3-flaecheninhalt': { de: 'Ich berechne den Flächeninhalt von Rechteck und Quadrat.', fr: 'Je calcule l’aire du rectangle et du carré.' },
    'mathe-m3-flaecheneinheiten': { de: 'Ich kenne die Flächeneinheiten und wandle benachbarte Einheiten um.', fr: 'Je connais les unités d’aire et je convertis des unités voisines.' },
    'mathe-m3-temperatur': { de: 'Ich lese Temperaturen ab, auch unter null, und berechne Änderungen.', fr: 'Je lis des températures, aussi au-dessous de zéro, et je calcule des variations.' },
    'mathe-m3-diagramme-lesen': { de: 'Ich lese Informationen aus einem Balkendiagramm ab.', fr: 'Je lis des informations dans un diagramme en bâtons.' },
    'mathe-m3-strichliste': { de: 'Ich führe eine Strichliste und bestimme die Häufigkeit.', fr: 'Je tiens une liste de comptage et je détermine l’effectif.' },
    'mathe-m3-mittelwert': { de: 'Ich berechne den Mittelwert einer Datenreihe.', fr: 'Je calcule la moyenne d’une série de données.' },
  },
  wortschatz: [
    { thema: 0, de: 'runden', fr: 'arrondir' },
    { thema: 0, de: 'ungefähr', fr: 'environ' },
    { thema: 0, de: 'aufrunden, abrunden', fr: 'arrondir à l’unité supérieure, inférieure' },
    { thema: 0, de: 'die Einheit (ganze Zahl)', fr: 'l’unité (nombre entier)' },
    { thema: 0, de: 'multiplizieren, malnehmen', fr: 'multiplier' },
    { thema: 0, de: 'die Nachkommastelle', fr: 'la décimale' },
    { thema: 0, de: 'der Überschlag', fr: 'l’estimation' },
    { thema: 0, de: 'dividieren, teilen', fr: 'diviser' },
    { thema: 0, de: 'der Rest', fr: 'le reste' },
    { thema: 0, de: 'gerecht teilen', fr: 'partager équitablement' },
    { thema: 1, de: 'der Flächeninhalt', fr: 'l’aire' },
    { thema: 1, de: 'die Länge, die Breite', fr: 'la longueur, la largeur' },
    { thema: 1, de: 'das Rechteck, das Quadrat', fr: 'le rectangle, le carré' },
    { thema: 1, de: 'der Quadratzentimeter (cm²)', fr: 'le centimètre carré (cm²)' },
    { thema: 1, de: 'der Quadratmeter (m²)', fr: 'le mètre carré (m²)' },
    { thema: 1, de: 'die Flächeneinheit', fr: 'l’unité d’aire' },
    { thema: 1, de: 'das Ar, das Hektar', fr: 'l’are, l’hectare' },
    { thema: 1, de: 'umwandeln', fr: 'convertir' },
    { thema: 2, de: 'die Temperatur', fr: 'la température' },
    { thema: 2, de: 'das Thermometer', fr: 'le thermomètre' },
    { thema: 2, de: 'Grad Celsius (°C)', fr: 'degré Celsius (°C)' },
    { thema: 2, de: 'die Minusgrade', fr: 'les températures négatives' },
    { thema: 2, de: 'der Gefrierpunkt (0 °C)', fr: 'le point de congélation (0 °C)' },
    { thema: 2, de: 'steigen, sinken', fr: 'monter, baisser' },
    { thema: 3, de: 'das Balkendiagramm', fr: 'le diagramme en bâtons' },
    { thema: 3, de: 'die Achse', fr: 'l’axe' },
    { thema: 3, de: 'die Häufigkeit', fr: 'l’effectif' },
    { thema: 3, de: 'die Strichliste', fr: 'la liste de comptage' },
    { thema: 3, de: 'das Bündel zu 5', fr: 'le paquet de 5' },
    { thema: 3, de: 'der Mittelwert, der Durchschnitt', fr: 'la moyenne' },
    { thema: 3, de: 'die Summe', fr: 'la somme' },
    { thema: 3, de: 'die Anzahl der Werte', fr: 'le nombre de valeurs' },
  ],
}

export const MODULE: Modul[] = [MATHE_MODUL_2, MATHE_MODUL_3]

/** Anzahl der Lektionen (Blätter) eines Moduls */
export function lektionenZahl(modul: Modul): number {
  return modul.themen.reduce((n, t) => n + t.lektionen.length, 0)
}

/** Dateiname des Hefts, z. B. Mathe_Modul-2_Heft.pdf oder Mathematiques_Modul-2_Solutions_FR.pdf */
export function modulheftDateiname(modul: Modul, sprache: Sprache, loesungen: boolean): string {
  const teil = sprache === 'fr' ? (loesungen ? 'Solutions' : 'Cahier') : loesungen ? 'Loesungen' : 'Heft'
  const fach = modul.fach[sprache].normalize('NFD').replace(/[̀-ͯ]/g, '')
  return `${fach}_Modul-${modul.nr}_${teil}${sprache === 'fr' ? '_FR' : ''}.pdf`
}

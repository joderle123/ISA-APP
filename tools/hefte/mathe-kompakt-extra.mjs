// Zusätze für die kompakten Mathe-Hefte der Module 1, 2 und 4–9 (Modul 3 hat seine eigenen in mathe-kompakt.mjs).
// Rückmeldung der Mathelehrerin (25./26.11.2026): „Fit bleiben = Wiederholung aus den Modulen davor, vor jedem Kapitel“,
// „die schönen Übungen mit Bildern“, Umwandlungstabelle bei jeder Umwandlung, Brüche übereinander, „moy“.

// „Fit für das Kapitel“: vor jedem Kapitel (Thema) Aufgaben aus früheren Kapiteln und Modulen, die man dafür braucht.
// Schlüssel: Kapitel-Titel wie im Programm (mit „und“ statt „&“). gens: [Erzeuger-Typ, Anzahl]
export const FIT_WEITERE = {
  1: {
    'Rechnen': [{ text: 'aus Modul 1: Zahlen bis 1.000.000 – Stellenwert und Runden', gens: [['stellenwert', 3], ['runden', 3]] }],
    'Größen: Länge, Geld, Zeit': [{ text: 'aus Modul 1: Kopfrechnen und Einmaleins', gens: [['kopfAdd', 2], ['kopfSub', 2], ['einmaleins', 2]] }],
    'Einfache Figuren': [{ text: 'aus Modul 1: Längen umrechnen und mal 10, 100, 1000', gens: [['laenge', 3], ['malZehn', 3]] }],
  },
  2: {
    'Dezimalzahlen': [
      { text: 'aus Modul 1: Stellenwert und mal 10, 100, 1000', gens: [['stellenwert', 3], ['malZehn', 3]] },
      { text: 'aus Modul 1: Rechnen mit Geld', gens: [['geld', 3]] },
    ],
    'Brüche – erste Schritte': [
      { text: 'aus Modul 1: Einmaleins', gens: [['einmaleins', 4]] },
      { text: 'aus Modul 1: Teile vom Kreis', gens: [['kreisTeile', 2]] },
    ],
    'Kapazität und Masse': [
      { text: 'aus Modul 2: Dezimalzahlen mal und geteilt durch 10, 100, 1000', gens: [['dezimalMalZehn', 4]] },
      { text: 'aus Modul 1: Längen umrechnen', gens: [['laenge', 3]] },
    ],
    'Punkt, Gerade und Strecke': [{ text: 'aus Modul 1: Figuren erkennen und Längen umrechnen', gens: [['figurBenennen', 2], ['laenge', 3]] }],
    'Winkel und Umfang': [
      { text: 'aus Modul 2: Dezimalzahlen addieren und subtrahieren', gens: [['dezimalAddSub', 3]] },
      { text: 'aus Modul 1: Figuren erkennen', gens: [['figurBenennen', 3]] },
    ],
  },
  4: {
    'Teilbarkeit': [
      { text: 'aus Modul 1: Einmaleins', gens: [['einmaleins', 4]] },
      { text: 'aus Modul 3: Dezimalzahl mal ganze Zahl', gens: [['dezimalMalGanz', 2]] },
    ],
    'Brüche verstehen': [
      { text: 'aus Modul 2: Bruchteil einer Menge', gens: [['bruchteil', 3]] },
      { text: 'aus Modul 4: Teilbarkeit', gens: [['teilbar', 3]] },
    ],
    'Prozente im Alltag': [
      { text: 'aus Modul 4: Brüche und Dezimalzahlen', gens: [['bruchDezimal', 3]] },
      { text: 'aus Modul 3: Dezimalzahlen mal und geteilt', gens: [['dezimalMalGanz', 2], ['dezimalDurchGanz', 2]] },
    ],
    'Dreiecke und Winkel': [{ text: 'aus Modul 2: Winkelarten und Umfang', gens: [['winkelArt', 3], ['umfang', 3]] }],
  },
  5: {
    'Negative Zahlen (ℤ)': [
      { text: 'aus Modul 3: Temperatur und Temperaturänderung', gens: [['tempAenderung', 3]] },
      { text: 'aus Modul 2: Dezimalzahlen vergleichen', gens: [['dezimalVergleich', 3]] },
    ],
    'Proportionalität und Dreisatz': [
      { text: 'aus Modul 4: Prozentwert', gens: [['prozentwert', 3]] },
      { text: 'aus Modul 3: Dezimalzahl mal und geteilt durch eine ganze Zahl', gens: [['dezimalMalGanz', 2], ['dezimalDurchGanz', 2]] },
    ],
    'Das Koordinatensystem': [{ text: 'aus Modul 5: negative Zahlen vergleichen', gens: [['negVergleich', 4]] }],
    'Umfang und Fläche': [
      { text: 'aus Modul 3: Fläche von Rechteck und Quadrat', gens: [['flaecheRechteck', 3]] },
      { text: 'aus Modul 4: Fläche des Dreiecks', gens: [['dreieckFlaeche', 3]] },
    ],
  },
  6: {
    'Rechnen mit Vorzeichen': [{ text: 'aus Modul 5: negative Zahlen vergleichen und Temperaturänderung', gens: [['negVergleich', 3], ['tempAenderung', 3]] }],
    'Buchstabenrechnen (Terme)': [
      { text: 'aus Modul 6: Punkt vor Strich', gens: [['prioritaet', 3]] },
      { text: 'aus Modul 6: Plus und Minus mit negativen Zahlen', gens: [['negAddSub', 3]] },
    ],
  },
  7: {
    'Gleichungen': [{ text: 'aus Modul 6: Terme berechnen und zusammenfassen', gens: [['termEinsetzen', 3], ['termReduzieren', 3]] }],
    'Geld: Konto und Zinsen': [
      { text: 'aus Modul 6: Plus und Minus mit negativen Zahlen', gens: [['negAddSub', 3]] },
      { text: 'aus Modul 4: Prozentwert', gens: [['prozentwert', 3]] },
    ],
    'Volumen': [{ text: 'aus Modul 3: Flächeninhalt und Flächeneinheiten', gens: [['flaecheRechteck', 3], ['flaecheEinheit', 3]] }],
  },
  8: {
    'Teiler und Vielfache': [{ text: 'aus Modul 4: Teilbarkeit und Quersumme', gens: [['teilbar', 3], ['quersumme', 3]] }],
    'Potenzen und Wurzeln': [
      { text: 'aus Modul 1: Einmaleins', gens: [['einmaleins', 3]] },
      { text: 'aus Modul 3: Fläche von Rechteck und Quadrat', gens: [['flaecheRechteck', 3]] },
    ],
    'Brüche': [
      { text: 'aus Modul 4: Brüche kürzen und gleichnamige Brüche addieren', gens: [['bruchKuerzen', 3], ['bruchAddSub', 3]] },
      { text: 'aus Modul 8: kgV und ggT', gens: [['kgvGgt', 2]] },
    ],
    'Dreiecke konstruieren': [{ text: 'aus Modul 4: Winkel im Dreieck', gens: [['winkelDritter', 3], ['winkelArt', 3]] }],
  },
  9: {
    'Rationale Zahlen und Rechenregeln': [{ text: 'aus Modul 5 und 6: negative Zahlen', gens: [['negVergleich', 3], ['relMult', 3]] }],
    'Monome und Polynome': [{ text: 'aus Modul 6: Terme zusammenfassen und Klammern auflösen', gens: [['termReduzieren', 3], ['klammern', 3]] }],
    'Pythagoras': [{ text: 'aus Modul 8: Potenzen und Wurzeln', gens: [['potenz', 3], ['wurzel', 3]] }],
    'Geraden und Symmetrie': [{ text: 'aus Modul 5: Koordinatensystem und Geraden', gens: [['koordinaten', 3], ['geraden', 2]] }],
  },
}

// Französische Kapitel-Titel (Deckblatt, Inhalt, Wörterliste des Hefts)
export const THEMEN_FR = {
  1: ['Nombres jusqu’à 1 000 000', 'Calculer', 'Grandeurs : longueur, argent, temps', 'Figures simples'],
  4: ['Divisibilité', 'Comprendre les fractions', 'Les pourcentages au quotidien', 'Triangles et angles'],
  5: ['Nombres négatifs (ℤ)', 'Proportionnalité et règle de trois', 'Le repère', 'Périmètre et aire'],
  6: ['Calculer avec des signes', 'Calcul littéral (expressions)'],
  7: ['Équations', 'Argent : compte et intérêts', 'Volumes'],
  8: ['Multiples et diviseurs', 'Puissances et racines', 'Fractions', 'Construire des triangles'],
  9: ['Nombres rationnels et priorités', 'Monômes et polynômes', 'Pythagore', 'Droites et symétrie'],
}

// Übungen mit Bildern und Wünsche je Lektion (wie EXTRA in mathe-kompakt.mjs: Index der Lektion im Modul, ab 1).
// Mögliche Felder: nachRegel, vorne, hinten, bilder {basis, kern, plus}, mehrBeispiele, thermometer, diagramme, striche, ohneBasis
// Bilder je Lektion: Bild zur Regel (grafik/grafikUnten) und eine Übung mit Bild (hinten) – mathe-kompakt-bilder.mjs
export { BILDER as EXTRA_WEITERE } from './mathe-kompakt-bilder.mjs'

// Mathematik · Modul 5 „Negative Zahlen, Dreisatz und Flächen“ (Voie de préparation) – multimodales Modulheft.
// Lektionen, Erklärungen und Übungen: aus dem Mathe-Programm (CNES-Referenzrahmen „Mathématiques – voie préparatoire“).
// Neu hier: Hörszenen aus dem Alltag, Bilder, Schreibaufträge „Erklären“. Personen, Preise und Zahlen: ausgedacht.

import { matheModul, matheLektionen } from './mathe-gemeinsam.mjs'
import { zahlenstrahl, thermometer, koordinaten, flaechenFiguren } from './mathe-bilder.mjs'

export const MODUL = matheModul(5, {
  titelFr: 'Nombres négatifs, règle de trois et aires',
  unterFr: 'Les nombres au-dessous de zéro, la proportionnalité et la règle de trois, le repère et de nouvelles aires.',
  deckbild: ['finn:froh:rad', 'amira:froh:zeigen', 'tom:froh:laessig'],
  blasen: [{ t: '−12 °C!', x: 18, y: 112 }, { t: 'Zurück auf 1 …', x: 112, y: 98 }, { t: 'P(3;5)', x: 166, y: 150 }],
  themenIcons: ['temperature-minus', 'arrows-right-left', 'chart-dots', 'circle'],
  aussprache: { '\\(([−-]?\\d+);\\s?([−-]?\\d+)\\)': ' \\1, \\2 ', 'π': 'Pi' },
})

const zeichenfeld = (h = 60) => `<div style="border:0.6mm dashed var(--f);border-radius:3mm;height:${h}mm"></div>`

const EXTRAS = [
  // 1 Zahlen unter null
  {
    fr: 'Je reconnais les nombres négatifs dans la vie quotidienne et je sais ce que signifie le signe moins.',
    bild: ['lina:froh:stehen', 'opa:froh:erklaeren'],
    erklBild: zahlenstrahl(-5, 5, { teile: 10, zahlen: [-5, -3, 0, 3, 5], marken: [{ w: -3, t: '−3' }, { w: 2, t: '+2' }] }),
    hoeren: {
      was: 'Im Parkhaus', wo: 'Parkhaus · Aufzug zum Kino', titel: 'Etage minus 2',
      situation: 'Lina und ihr Opa gehen ins Kino. Sie parken im Parkhaus unter der Erde.',
      bild: ['opa:froh:erklaeren', 'lina:froh:stehen'], sprecher: { Opa: 'm2', Lina: 'w3' },
      text: [
        ['Opa', 'So, wir parken auf Etage minus 2. Merk dir das bitte!'],
        ['Lina', 'Minus 2 heißt: zwei Etagen unter der Erde. Das Erdgeschoss ist die Null.'],
        ['Opa', 'Genau. Und das Kino ist im dritten Stock, also plus 3.'],
        ['Lina', 'Von minus 2 bis plus 3 … das sind 5 Etagen nach oben.'],
        ['Opa', 'Draußen ist es kalt: minus 5 Grad. Und im Kino sind es plus 21 Grad.'],
        ['Lina', 'Brrr! Minus 5 ist fünf Grad unter null. Gut, dass wir gleich drinnen sind!'],
      ],
      vor: [{ art: 'mc', auftrag: '„Drei Grad unter null“ schreibt man … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['+3 °C', '−3 °C', '30 °C'], r: 1 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Schreibe die Zahlen mit Vorzeichen.', stufe: 1, kopf: ['', 'Zahl'], breiten: [60, 40], zeilen: [['Etage im Parkhaus', '[−2]'], ['Etage des Kinos', '[+3]'], ['Temperatur draußen', '[−5 °C]'], ['Temperatur im Kino', '[+21 °C]'], ['Etagen nach oben', '[5]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Findet negative Zahlen im Alltag (Aufzug, Thermometer, Tiefgarage, Meerestiefe). Erklärt, was das Minus bedeutet.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['−2 bedeutet: zwei … unter null.', 'Null ist die Grenze.', '−10 ist tiefer als −2.'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre einem jüngeren Kind, was −7 °C bedeutet.', anfaenge: ['Das Minus bedeutet …', 'Es ist kälter als …'] },
  },
  // 2 Negative Zahlen vergleichen und ordnen
  {
    fr: 'Je compare et je range des nombres positifs et négatifs sur la droite graduée.',
    bild: ['ben:froh:handy', 'lehrerin:froh:erklaeren'],
    erklBild: zahlenstrahl(-10, 5, { teile: 15, zahlen: [-10, -5, 0, 5], marken: [{ w: -8, t: '−8' }, { w: -2, t: '−2' }] }),
    hoeren: {
      was: 'Das Europawetter', wo: 'Fernsehen · Wetter am Abend', titel: 'Wo ist es am kältesten?',
      situation: 'Im Fernsehen kommt das Wetter für Europa. Ben schreibt die Temperaturen auf.',
      bild: ['lehrerin:froh:erklaeren', 'ben:froh:handy'], sprecher: { Wetterfrau: 'w1', Ben: 'm3' },
      text: [
        ['Wetterfrau', 'Guten Abend! Hier sind die Temperaturen heute früh in Europa. In Oslo waren es minus 8 Grad. In Helsinki minus 12 Grad.'],
        ['Wetterfrau', 'In Luxemburg war es minus 1 Grad. In Paris plus 3 Grad. Und in Lissabon angenehme plus 11 Grad.'],
        ['Ben', 'Am kältesten war es also in Helsinki: minus 12 ist die kleinste Zahl.'],
        ['Ben', 'Und minus 1 in Luxemburg ist wärmer als minus 8 in Oslo, weil minus 1 näher an der Null liegt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist kälter? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['−8 °C', '−2 °C'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Schreibe die Temperaturen.', stufe: 1, kopf: ['Stadt', 'Temperatur'], breiten: [50, 50], zeilen: [['Oslo', '[−8 °C]'], ['Helsinki', '[−12 °C]'], ['Luxemburg', '[−1 °C]'], ['Paris', '[+3 °C]'], ['Lissabon', '[+11 °C]']] },
        { art: 'ordnen', auftrag: 'Ordne von kalt (1) nach warm (5).', stufe: 2, teile: ['Helsinki', 'Oslo', 'Luxemburg', 'Paris', 'Lissabon'], ordnung: [2, 4, 0, 3, 1] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Temperatur-Reihe: Jede Person bekommt eine Karte mit einer Temperatur (−9 bis +9). Stellt euch ohne Sprechen von kalt nach warm auf. Dann prüft laut.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['−4 ist kleiner als −1.', 'Ich stehe links von dir, weil …'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, warum −3 größer ist als −7, obwohl 7 größer ist als 3.', anfaenge: ['Auf dem Zahlenstrahl liegt −3 …', 'Je weiter rechts, desto …'] },
  },
  // 3 Temperaturänderungen
  {
    fr: 'Je calcule des variations (des sauts) sur la droite graduée, par exemple pour des températures.',
    bild: ['finn:froh:stehen', 'lehrer:froh:zeigen'],
    erklBild: `<div style="display:flex;gap:10mm;justify-content:center;align-items:center">${thermometer(-10, 10, -9, { schritt: 5 })}${thermometer(-10, 10, 2, { schritt: 5 })}<div style="font-size:12.5pt">Gipfel −9 °C<br>Tal +2 °C<br>Unterschied: 11 Grad</div></div>`,
    hoeren: {
      was: 'Im Skilager', wo: 'Skilager · Gondel zum Gipfel', titel: 'Oben ist es eisig',
      situation: 'Die Klasse ist im Skilager. Finn fährt mit Herrn Mesenberg in der Gondel nach oben.',
      bild: ['lehrer:froh:zeigen', 'finn:froh:stehen'], sprecher: { 'Herr Mesenberg': 'm1', Finn: 'm3' },
      text: [
        ['Herr Mesenberg', 'Unten im Tal sind es plus 2 Grad. Oben auf dem Gipfel minus 9 Grad.'],
        ['Finn', 'Wie groß ist der Unterschied? Von plus 2 bis zur Null sind es 2 Grad, dann noch 9 Grad bis minus 9.'],
        ['Herr Mesenberg', 'Also?'],
        ['Finn', '11 Grad Unterschied! Oben ist es 11 Grad kälter.'],
        ['Herr Mesenberg', 'Richtig. Und heute Mittag soll es oben um 4 Grad wärmer werden.'],
        ['Finn', 'Von minus 9 um 4 Grad wärmer … das sind minus 5 Grad. Immer noch kalt!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Von −2 °C auf +3 °C wird es … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['1 Grad wärmer', '5 Grad wärmer', '5 Grad kälter'], r: 1 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['Tal: [+2] °C · Gipfel: [−9] °C', 'Unterschied: [11] Grad', 'Mittags auf dem Gipfel: −9 °C + 4 °C = [−5] °C'] }],
      nach: [{ art: 'sprechen', auftrag: 'Eine Person nennt eine Start-Temperatur und eine Änderung („−3 °C, 7 Grad wärmer“). Die anderen zeigen den Sprung auf einem Zahlenstrahl.', stufe: 2, karten: [
        { titel: 'Tipp', text: ['Erst bis zur Null zählen,', 'dann weiter.', 'Wärmer = nach oben, kälter = nach unten.'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre mit dem Thermometer, wie du den Unterschied zwischen +4 °C und −6 °C findest.', anfaenge: ['Von +4 °C bis 0 °C …', 'Von 0 °C bis −6 °C …', 'Zusammen …'] },
  },
  // 4 Proportional – Tabelle
  {
    fr: 'Je reconnais dans un tableau si deux grandeurs sont proportionnelles.',
    bild: ['lea:froh:handy', 'ben:verwirrt:stehen'],
    hoeren: {
      was: 'Parkhaus und Bäckerei', wo: 'In der Stadt · am Samstag', titel: 'Doppelt so viel?',
      situation: 'Lea und Ben vergleichen Preise. Ist es immer „doppelt so viel – doppelt so teuer“?',
      bild: ['lea:froh:handy', 'ben:verwirrt:stehen'], sprecher: { Lea: 'w2', Ben: 'm3' },
      text: [
        ['Lea', 'Ein Brötchen kostet 50 Cent. Zwei Brötchen 1 Euro, vier Brötchen 2 Euro.'],
        ['Ben', 'Doppelt so viele Brötchen, doppelt so viel Geld. Das ist proportional.'],
        ['Lea', 'Und das Parkhaus hier? Die erste Stunde kostet 2 Euro, jede weitere Stunde 1 Euro.'],
        ['Ben', 'Eine Stunde: 2 Euro. Zwei Stunden: 3 Euro. Vier Stunden: 5 Euro.'],
        ['Lea', 'Zwei Stunden sind doppelt so lang wie eine, aber 3 Euro sind nicht das Doppelte von 2 Euro.'],
        ['Ben', 'Also ist das Parkhaus nicht proportional!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Proportional heißt: doppelt so viel → … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['doppelt so teuer', 'gleich teuer'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze die Tabellen.', stufe: 1, kopf: ['', '1', '2', '4'], breiten: [40, 20, 20, 20], zeilen: [['Brötchen → Preis', '[0,50 €]', '[1 €]', '[2 €]'], ['Stunden Parken → Preis', '[2 €]', '[3 €]', '[5 €]']] },
        { art: 'mc', auftrag: 'Was ist proportional? Kreuze an.', stufe: 2, fragen: [{ f: '', o: ['die Brötchen', 'das Parkhaus'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Proportional oder nicht? Diskutiert: Anzahl Kinokarten und Preis · Alter und Körpergröße · Liter Benzin und Preis · Handy-Tarif mit Grundgebühr.', stufe: 3, karten: [
        { titel: 'Sätze', text: ['Doppelt so viel …, also …', 'Das ist nicht proportional, weil …'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre mit einem eigenen Beispiel, woran du an einer Tabelle Proportionalität erkennst.', anfaenge: ['Mein Beispiel: …', 'Wenn ich verdopple, …'] },
  },
  // 5 Proportionalität im Graph
  {
    fr: 'Je reconnais la proportionnalité sur un graphique (points sur une droite passant par l’origine).',
    bild: ['amira:froh:rad', 'verkaeuferin:froh:erklaeren'],
    erklBild: koordinaten([['A', 1, 2], ['B', 2, 4], ['C', 3, 6]], { n: 7, linien: [[0, 0, 3.5, 7]], beschriftung: ['kg', '€'] }),
    hoeren: {
      was: 'Fahrradverleih', wo: 'Fahrradverleih am See · Sommerferien', titel: '3 Euro pro Stunde',
      situation: 'Amira will ein Fahrrad ausleihen. Die Verkäuferin erklärt die Preise.',
      bild: ['verkaeuferin:froh:erklaeren', 'amira:froh:rad'], sprecher: { Verkäuferin: 'w1', Amira: 'w2' },
      text: [
        ['Verkäuferin', 'Ein Fahrrad kostet 3 Euro pro Stunde. Keine Grundgebühr.'],
        ['Amira', 'Also 1 Stunde 3 Euro, 2 Stunden 6 Euro, 3 Stunden 9 Euro.'],
        ['Verkäuferin', 'Genau. Und 0 Stunden kosten 0 Euro.'],
        ['Amira', 'Wenn ich die Punkte zeichne, liegen sie auf einer Geraden durch den Nullpunkt. Das ist proportional!'],
        ['Verkäuferin', 'Das E-Bike kostet anders: 4 Euro Grundgebühr und dann 2 Euro pro Stunde.'],
        ['Amira', 'Dann beginnt die Linie bei 4 Euro, nicht bei null. Nicht proportional.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Ein proportionaler Graph ist … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Gerade durch den Nullpunkt', 'eine Kurve', 'eine Gerade, die bei 4 beginnt'], r: 0 }] }],
      beim: [{ art: 'frei', auftrag: 'Hör zu. Zeichne die Punkte für das Fahrrad (Stunden → Euro) und verbinde sie.', stufe: 2, html: koordinaten([['0', 0, 0], ['1', 1, 3], ['2', 2, 6], ['3', 3, 9]], { n: 10, leer: true, linien: [[0, 0, 3.33, 10]], linienLeer: true, beschriftung: ['h', '€'] }) }],
      nach: [{ art: 'sprechen', auftrag: 'Vergleicht die beiden Angebote: Ab wie vielen Stunden ist das Fahrrad teurer als das E-Bike? Rechnet in einer Tabelle.', stufe: 3, karten: [
        { titel: 'Hilfe', text: ['Fahrrad: 3 € · Stunden', 'E-Bike: 4 € + 2 € · Stunden', 'Vergleiche 1, 2, 3, 4, 5 Stunden.'] }] }],
    },
    erklaeren: { auftrag: 'Woran erkennst du im Graph, dass das E-Bike-Angebot nicht proportional ist? Erkläre.', anfaenge: ['Die Linie beginnt …', 'Bei proportional …'] },
  },
  // 6 Dreisatz
  {
    fr: 'Je résous des problèmes de proportionnalité avec la règle de trois en passant par l’unité.',
    bild: ['chloe:froh:tasse', 'lehrerin:froh:erklaeren'],
    hoeren: {
      was: 'Pfannkuchen für alle', wo: 'Schulküche · Kochkurs', titel: 'Für 24 statt für 4',
      situation: 'Das Rezept ist für 4 Personen. Die Klasse hat 24 Schüler. Chloe rechnet mit dem Dreisatz.',
      bild: ['lehrerin:froh:erklaeren', 'chloe:froh:tasse'], sprecher: { 'Frau Kremer': 'w1', Chloe: 'w2' },
      text: [
        ['Frau Kremer', 'Für 4 Personen brauchen wir 200 Gramm Mehl. Wir sind aber 24.'],
        ['Chloe', 'Zuerst zurück auf 1: Für eine Person sind es 200 geteilt durch 4, also 50 Gramm.'],
        ['Frau Kremer', 'Gut. Und dann?'],
        ['Chloe', 'Dann hoch auf 24: 50 mal 24 sind 1.200 Gramm Mehl.'],
        ['Frau Kremer', 'Und die Milch? Für 4 Personen sind es 4 Deziliter.'],
        ['Chloe', 'Für eine Person 1 Deziliter, für 24 Personen 24 Deziliter. Das sind 2,4 Liter.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Beim Dreisatz rechnest du zuerst … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['auf 1 zurück', 'gleich auf das Ergebnis'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und ergänze den Dreisatz.', stufe: 1, kopf: ['Personen', 'Mehl', 'Milch'], breiten: [34, 33, 33], zeilen: [['4', '200 g', '4 dl'], ['1', '[50 g]', '[1 dl]'], ['24', '[1.200 g]', '[24 dl = 2,4 l]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Wählt ein einfaches Rezept für 2 Personen und rechnet es für eure Gruppe um (Dreisatz).', stufe: 3, karten: [
        { titel: 'Schema', text: ['2 Personen → …', '1 Person → … (geteilt durch 2)', '… Personen → … (mal …)'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre die drei Schritte des Dreisatzes mit dem Beispiel: 3 Hefte kosten 6 €. Was kosten 5 Hefte?', anfaenge: ['1. Ich schreibe: …', '2. Zurück auf 1: …', '3. Hoch auf 5: …'], zeilen: 6 },
  },
  // 7 Dreisatz-Sachaufgaben
  {
    fr: 'Je résous des problèmes en les traduisant en règle de trois.',
    bild: ['noah:froh:rad', 'mia:froh:rad'],
    hoeren: {
      was: 'Eine Radtour', wo: 'Radweg an der Mosel · Ausflug', titel: '75 Kilometer?',
      situation: 'Noah und Mia planen eine Radtour. Wie weit kommen sie? Wie viel Wasser brauchen sie?',
      bild: ['noah:froh:rad', 'mia:froh:rad'], sprecher: { Noah: 'm3', Mia: 'w2' },
      text: [
        ['Noah', 'In 2 Stunden sind wir 30 Kilometer gefahren.'],
        ['Mia', 'Dann fahren wir in einer Stunde 15 Kilometer.'],
        ['Noah', 'Und in 5 Stunden? 15 mal 5 … 75 Kilometer!'],
        ['Mia', 'Das ist zu weit für heute. Und das Wasser: Für 4 Personen nehmen wir 3 Liter mit.'],
        ['Noah', 'Morgen kommen 12 Leute mit. 3 Liter für 4 Personen … das sind 9 Liter für 12 Personen.'],
        ['Mia', 'Richtig: Dreimal so viele Leute, dreimal so viel Wasser.'],
      ],
      vor: [{ art: 'mc', auftrag: 'In 2 Stunden 30 km. In 1 Stunde? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['15 km', '60 km', '28 km'], r: 0 }] }],
      beim: [{ art: 'rechnen', auftrag: 'Hör zu und rechne mit dem Dreisatz. Schreibe einen Antwortsatz.', stufe: 2, items: [{ a: '2 h → 30 km. 5 h → ? km', l: '1 h → 15 km; 5 h → 75 km', raum: 3 }, { a: '4 Personen → 3 l Wasser. 12 Personen → ? l', l: '12 Personen → 9 l', raum: 3 }] }],
      nach: [{ art: 'sprechen', auftrag: 'Erfindet selbst eine Dreisatz-Aufgabe aus dem Alltag. Die andere Gruppe löst sie.', stufe: 3, karten: [
        { titel: 'Ideen', text: ['Zeit und Weg', 'Personen und Pizza', 'Liter und Preis', 'Stunden und Lohn'] }] }],
    },
    erklaeren: { auftrag: 'Schreibe eine eigene Dreisatz-Aufgabe mit Lösung und Antwortsatz.', anfaenge: ['Aufgabe: …', 'Lösung: …', 'Antwort: …'], zeilen: 7 },
  },
  // 8 Koordinatensystem
  {
    fr: 'Je place des points avec leurs coordonnées (x ; y) et je lis des coordonnées.',
    bild: ['sami:froh:blatt', 'lea:froh:blatt'],
    erklBild: koordinaten([['P', 4, 1], ['Q', 2, 3]], { n: 6 }),
    hoeren: {
      was: 'Schiffe versenken', wo: 'Pause · Spiel auf Papier', titel: 'Treffer bei (3;5)!',
      situation: 'Sami und Lea spielen ein Koordinaten-Spiel. Sami nennt Punkte. Trage sie ein!',
      bild: ['sami:froh:blatt', 'lea:froh:blatt'], sprecher: { Sami: 'm3', Lea: 'w2' },
      text: [
        ['Sami', 'Ich rate: Punkt A bei 3 und 5. Also 3 nach rechts, 5 nach oben.'],
        ['Lea', 'Treffer! Mein Schiff liegt bei A, 3 und 5.'],
        ['Sami', 'Dann Punkt B: 4 und 5.'],
        ['Lea', 'Wieder Treffer! Noch ein Feld fehlt.'],
        ['Sami', 'Punkt C: 5 und 5.'],
        ['Lea', 'Versenkt! Jetzt bin ich dran: Punkt D bei 1 und 2.'],
        ['Sami', 'Wasser! Daneben.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Bei P(4;1) gehst du zuerst … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['4 nach rechts', '4 nach oben'], r: 0 }] }],
      beim: [{ art: 'frei', auftrag: 'Hör zu. Trage die Punkte A, B, C und D ein.', stufe: 1, html: koordinaten([['A', 3, 5], ['B', 4, 5], ['C', 5, 5], ['D', 1, 2]], { n: 6, leer: true }) }],
      nach: [{ art: 'sprechen', auftrag: 'Spielt selbst: Jede Person versteckt zwei Schiffe (je 3 Punkte) im Koordinatensystem 0 bis 6. Ratet abwechselnd.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Ich rate (2;4).', 'Treffer! / Wasser!', 'Versenkt!'] }] }],
    },
    erklaeren: { auftrag: 'Warum ist (2;5) ein anderer Punkt als (5;2)? Erkläre.', anfaenge: ['Die erste Zahl sagt …', 'Die zweite Zahl sagt …'] },
  },
  // 9 Geraden
  {
    fr: 'Je trace des droites passant par deux points et je reconnais des droites parallèles, perpendiculaires et sécantes.',
    bild: ['yusuf:froh:zeigen', 'chloe:froh:handy'],
    hoeren: {
      was: 'Den Weg erklären', wo: 'In der Stadt · am Bahnhof', titel: 'Parallel zur Bahn',
      situation: 'Chloe fragt Yusuf nach dem Weg zum Schwimmbad. Yusuf beschreibt die Straßen.',
      bild: ['yusuf:froh:zeigen', 'chloe:froh:handy'], sprecher: { Yusuf: 'm1', Chloe: 'w2' },
      text: [
        ['Chloe', 'Wie komme ich zum Schwimmbad?'],
        ['Yusuf', 'Siehst du die Bahngleise? Die Hauptstraße läuft genau parallel dazu. Die beiden Linien treffen sich nie.'],
        ['Chloe', 'Okay. Und dann?'],
        ['Yusuf', 'Geh die Hauptstraße entlang bis zur Brückenstraße. Die kreuzt die Hauptstraße senkrecht, im rechten Winkel.'],
        ['Chloe', 'Wie ein Pluszeichen.'],
        ['Yusuf', 'Genau. An dem Schnittpunkt ist eine Ampel. Dort biegst du ab. Das Schwimmbad ist gleich da.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Zwei Geraden, die sich nie treffen, sind … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['parallel', 'senkrecht', 'schneidend'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Wie liegen die Linien zueinander?', stufe: 1, kopf: ['Linien', 'Lage'], breiten: [55, 45], zeilen: [['Bahngleise und Hauptstraße', '[parallel]'], ['Hauptstraße und Brückenstraße', '[senkrecht]'], ['Wo sie sich kreuzen: …', '[der Schnittpunkt (Ampel)]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Sucht im Klassenzimmer parallele und senkrechte Linien (Fenster, Tafel, Tisch). Zeigt und erklärt.', stufe: 2, karten: [
        { titel: 'Wörter', text: ['parallel – wie Schienen', 'senkrecht – wie ein Plus', 'Schnittpunkt – wo sie sich treffen'] }] }],
    },
    ueben: [{ art: 'frei', auftrag: 'Zeichne die Gerade durch A(1;1) und B(5;3). Zeichne eine parallele Gerade durch C(1;4).', stufe: 2, html: koordinaten([], { n: 7, linien: [[1, 1, 5, 3], [1, 4, 5, 6]], linienLeer: true }) }],
    erklaeren: { auftrag: 'Erkläre den Unterschied zwischen „parallel“ und „senkrecht“ mit Beispielen aus dem Alltag.', anfaenge: ['Parallel sind zum Beispiel …', 'Senkrecht sind …'] },
  },
  // 10 Parallelogramm
  {
    fr: 'Je calcule le périmètre et l’aire d’un parallélogramme.',
    bild: ['opa:froh:erklaeren', 'tom:froh:stehen'],
    erklBild: flaechenFiguren([{ art: 'parallelogramm', g: '6 cm', h: '4 cm', name: 'A = g · h = 24 cm²' }]),
    hoeren: {
      was: 'Parkplätze markieren', wo: 'Parkplatz der Schule · neue Markierung', titel: 'Schräge Parkplätze',
      situation: 'Herr Becker markiert neue Parkplätze. Sie sind schräg – wie Parallelogramme.',
      bild: ['opa:froh:erklaeren', 'tom:froh:stehen'], sprecher: { 'Herr Becker': 'm2', Tom: 'm3' },
      text: [
        ['Herr Becker', 'Jeder Parkplatz ist ein Parallelogramm. Die Grundseite ist 2,5 Meter lang.'],
        ['Tom', 'Und die Höhe? Nicht die schräge Linie, sondern senkrecht gemessen.'],
        ['Herr Becker', 'Genau, die Höhe ist 5 Meter. Die schräge Seite ist länger, 5,5 Meter.'],
        ['Tom', 'Fläche gleich Grundseite mal Höhe: 2,5 mal 5 … das sind 12,5 Quadratmeter.'],
        ['Herr Becker', 'Und wie viel Farbe brauchen wir für den Rand eines Parkplatzes?'],
        ['Tom', 'Der Umfang: 2 mal 2,5 plus 2 mal 5,5 … das sind 16 Meter Linie.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Für die Fläche des Parallelogramms brauchst du … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die senkrechte Höhe', 'die schräge Seite'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und rechne.', stufe: 2, kopf: ['', 'Maße', 'Ergebnis'], breiten: [28, 40, 32], zeilen: [['Fläche', '[g = 2,5 m, h = 5 m]', '[12,5 m²]'], ['Umfang', '[2 · 2,5 m + 2 · 5,5 m]', '[16 m]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Schneidet ein Parallelogramm aus Papier. Schneidet ein Dreieck ab und legt es auf die andere Seite: Was entsteht? Erklärt die Formel.', stufe: 3, karten: [
        { titel: 'Sätze', text: ['Es entsteht ein Rechteck.', 'Darum ist A = g · h.'] }] }],
    },
    erklaeren: { auftrag: 'Warum rechnet man beim Parallelogramm mit der Höhe und nicht mit der schrägen Seite? Erkläre.', anfaenge: ['Wenn ich ein Dreieck abschneide …', 'Dann …'] },
  },
  // 11 Trapez
  {
    fr: 'Je calcule le périmètre et l’aire d’un trapèze.',
    bild: ['sami:froh:rad', 'lehrer:froh:erklaeren'],
    erklBild: flaechenFiguren([{ art: 'trapez', a: '8 cm', c: '4 cm', h: '3 cm', name: 'A = (8 + 4) ÷ 2 · 3 = 18 cm²' }]),
    hoeren: {
      was: 'Die Skate-Rampe streichen', wo: 'Skatepark · Malaktion', titel: 'Wie viel Farbe?',
      situation: 'Die Seitenwand der Skate-Rampe ist ein Trapez. Sami und Herr Mesenberg wollen sie bemalen.',
      bild: ['lehrer:froh:erklaeren', 'sami:froh:rad'], sprecher: { 'Herr Mesenberg': 'm1', Sami: 'm3' },
      text: [
        ['Herr Mesenberg', 'Die Seitenwand ist ein Trapez. Unten ist sie 4 Meter lang, oben 2 Meter.'],
        ['Sami', 'Und die Höhe?'],
        ['Herr Mesenberg', '1,5 Meter.'],
        ['Sami', 'Ich nehme den Durchschnitt der parallelen Seiten: 4 plus 2 sind 6, geteilt durch 2 sind 3. Dann mal die Höhe: 3 mal 1,5 sind 4,5 Quadratmeter.'],
        ['Herr Mesenberg', 'Super. Es gibt zwei Seitenwände.'],
        ['Sami', 'Also 9 Quadratmeter. Eine Dose Farbe reicht für 5 Quadratmeter – wir brauchen 2 Dosen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Ein Trapez hat … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['zwei parallele Seiten', 'keine parallelen Seiten', 'drei Ecken'], r: 0 }] }],
      beim: [{ art: 'rechnen', auftrag: 'Hör zu und rechne.', stufe: 2, items: [{ a: 'Eine Seitenwand: (4 m + 2 m) ÷ 2 · 1,5 m = ?', l: '4,5 m²', raum: 2.5 }, { a: 'Zwei Seitenwände = ?', l: '9 m²', raum: 1.5 }, { a: 'Eine Dose reicht für 5 m². Wie viele Dosen?', l: '2 Dosen', raum: 1.5 }] }],
      nach: [{ art: 'sprechen', auftrag: 'Sucht Trapeze im Alltag (Tasche, Lampenschirm, Dach). Schätzt die Maße und rechnet die Fläche.', stufe: 3, karten: [
        { titel: 'Formel', text: ['A = (a + c) ÷ 2 · h', 'a und c sind die parallelen Seiten.'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre den „Durchschnitt-Trick“ beim Trapez mit eigenen Worten.', anfaenge: ['Ich nehme den Durchschnitt von …', 'Dann ist es wie ein Rechteck …'] },
  },
  // 12 Kreis
  {
    fr: 'Je calcule le périmètre et l’aire d’un cercle avec π ≈ 3,14.',
    bild: ['ben:froh:tasse', 'jana:froh:erklaeren'],
    erklBild: flaechenFiguren([{ art: 'kreis', r: '5 cm', name: 'U = 2 · 3,14 · 5 = 31,4 cm · A = 3,14 · 5 · 5 = 78,5 cm²' }]),
    hoeren: {
      was: 'Eine große oder zwei kleine?', wo: 'Pizzeria · Bestellung für zwei', titel: 'Der Pizza-Trick',
      situation: 'Ben und Jana wollen Pizza teilen. Eine große Pizza (30 cm) kostet genauso viel wie zwei kleine (je 20 cm).',
      bild: ['ben:froh:tasse', 'jana:froh:erklaeren'], sprecher: { Ben: 'm3', Jana: 'w2' },
      text: [
        ['Ben', 'Zwei kleine Pizzen sind mehr als eine große, oder? Zweimal 20 Zentimeter sind 40!'],
        ['Jana', 'Moment! Wir müssen die Fläche rechnen, nicht den Durchmesser.'],
        ['Ben', 'Die große Pizza hat 30 Zentimeter Durchmesser, also 15 Zentimeter Radius.'],
        ['Jana', 'Fläche: 3,14 mal 15 mal 15 … das sind ungefähr 706 Quadratzentimeter.'],
        ['Ben', 'Eine kleine Pizza hat 10 Zentimeter Radius: 3,14 mal 10 mal 10 sind 314. Zwei kleine: 628 Quadratzentimeter.'],
        ['Jana', 'Die große Pizza ist also mehr! Wir nehmen die große.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Der Radius ist … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['der halbe Durchmesser', 'der doppelte Durchmesser'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und rechne.', stufe: 2, kopf: ['', 'Radius', 'Fläche'], breiten: [36, 28, 36], zeilen: [['große Pizza (30 cm)', '[15 cm]', '[≈ 706 cm²]'], ['kleine Pizza (20 cm)', '[10 cm]', '[314 cm²]'], ['zwei kleine Pizzen', '–', '[628 cm²]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Messt runde Dinge (Teller, Uhr, Dose). Berechnet Umfang und Fläche. Prüft den Umfang mit einer Schnur!', stufe: 3, karten: [
        { titel: 'Formeln', text: ['U = 2 · 3,14 · r', 'A = 3,14 · r · r'] }] }],
    },
    erklaeren: { auftrag: 'Ben dachte: „Zwei kleine Pizzen sind mehr.“ Erkläre, warum er sich geirrt hat.', anfaenge: ['Ben hat nur …', 'Man muss aber …'] },
  },
  // 13 Zusammengesetzte Figuren
  {
    fr: 'Je calcule l’aire de figures composées de plusieurs formes.',
    bild: ['nele:froh:blatt', 'opa:froh:stehen'],
    erklBild: flaechenFiguren([{ art: 'haus', b: '6 m', h1: '4 m', h2: '2 m', name: 'Rechteck 6 · 4 + Dreieck (6 · 2) ÷ 2' }]),
    hoeren: {
      was: 'Das Gartenhaus streichen', wo: 'Schulgarten · Gartenhaus', titel: 'Rechteck plus Dreieck',
      situation: 'Die Giebelwand des Gartenhauses soll neu gestrichen werden. Nele rechnet die Fläche aus.',
      bild: ['opa:froh:stehen', 'nele:froh:blatt'], sprecher: { 'Herr Becker': 'm2', Nele: 'w3' },
      text: [
        ['Herr Becker', 'Die Wand ist unten ein Rechteck: 6 Meter breit und 4 Meter hoch. Oben ist das Dach-Dreieck, 2 Meter hoch.'],
        ['Nele', 'Ich zerlege: Rechteck 6 mal 4 sind 24 Quadratmeter.'],
        ['Herr Becker', 'Und das Dreieck?'],
        ['Nele', '6 mal 2 geteilt durch 2 … 6 Quadratmeter. Zusammen 30 Quadratmeter.'],
        ['Herr Becker', 'Aber die Tür streichen wir nicht. Sie ist 1 Meter breit und 2 Meter hoch.'],
        ['Nele', 'Dann ziehe ich 2 Quadratmeter ab: 28 Quadratmeter bleiben zum Streichen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Eine zusammengesetzte Figur … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['zerlegt man in einfache Figuren', 'kann man nicht berechnen'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und rechne.', stufe: 2, kopf: ['Teil', 'Rechnung', 'Fläche'], breiten: [30, 40, 30], zeilen: [['Rechteck', '[6 m · 4 m]', '[24 m²]'], ['Dreieck', '[(6 m · 2 m) ÷ 2]', '[6 m²]'], ['minus Tür', '[1 m · 2 m]', '[− 2 m²]'], ['zum Streichen', '', '[28 m²]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Zeichnet den Grundriss eines Traumzimmers aus Rechtecken (L-Form). Tauscht und berechnet die Fläche des anderen.', stufe: 3, karten: [
        { titel: 'So geht’s', text: ['1. Zerlegen', '2. Einzeln rechnen', '3. Addieren oder abziehen'] }] }],
    },
    ueben: [{ art: 'frei', auftrag: 'Zeichne eine eigene Figur aus einem Rechteck und einem Dreieck. Schreibe die Maße dazu und berechne die Fläche.', stufe: 3, html: zeichenfeld(60) }],
    erklaeren: { auftrag: 'Erkläre in drei Schritten, wie du die Fläche einer L-förmigen Figur berechnest.', anfaenge: ['1. …', '2. …', '3. …'] },
  },
]

export const LEKTIONEN = matheLektionen(5, EXTRAS)

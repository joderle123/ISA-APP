// Mathematik · Modul 3 „Dezimalzahlen, Fläche, Temperatur und Statistik“ (Voie de préparation) – multimodales Modulheft.
// Lektionen, Erklärungen und Übungen: aus dem Mathe-Programm (CNES-Referenzrahmen „Mathématiques – voie préparatoire“).
// Neu hier: Hörszenen aus dem Alltag, Bilder, Schreibaufträge „Erklären“. Personen, Preise und Zahlen: ausgedacht.

import { matheModul, matheLektionen } from './mathe-gemeinsam.mjs'
import { thermometer, balkendiagramm, kaestchenFlaeche, treppe, zahlenstrahl } from './mathe-bilder.mjs'

export const MODUL = matheModul(3, {
  titelFr: 'Nombres décimaux, aire, température et statistique',
  unterFr: 'Arrondir et calculer avec des nombres décimaux, calculer des aires, lire des températures et analyser des données.',
  deckbild: ['ben:froh:handy', 'jana:froh:stehen-zeigen', 'yusuf:froh:laptop'],
  blasen: [{ t: '≈ 5 €', x: 18, y: 112 }, { t: '−3 °C brrr!', x: 112, y: 98 }, { t: 'Im Schnitt 11!', x: 160, y: 150 }],
  themenIcons: ['receipt', 'layout-grid', 'temperature', 'chart-bar'],
})

const zeichenfeld = (h = 60) => `<div style="border:0.6mm dashed var(--f);border-radius:3mm;height:${h}mm"></div>`

const EXTRAS = [
  // 1 Dezimalzahlen runden
  {
    fr: 'J’arrondis des nombres décimaux à l’unité.',
    bild: ['ben:froh:handy', 'verkaeuferin:froh:stehen'],
    erklBild: zahlenstrahl(7, 8, { teile: 10, zahlen: [7, 8], marken: [{ w: 7.4, t: '7,4 ≈ 7' }, { w: 7.6, t: '7,6 ≈ 8' }] }),
    hoeren: {
      was: 'Im Supermarkt', wo: 'Supermarkt · an der Kasse', titel: 'Reichen 20 Euro?',
      situation: 'Ben kauft für das Klassenfrühstück ein. Er hat 20 Euro. Er rechnet mit gerundeten Preisen.',
      bild: ['ben:froh:handy', 'verkaeuferin:froh:stehen'], sprecher: { Ben: 'm3', Kassiererin: 'w1' },
      text: [
        ['Ben', 'Ich habe Brot für 4,87 Euro, Käse für 2,35 Euro, Obst für 6,49 Euro und Saft für 3,60 Euro.'],
        ['Kassiererin', 'Hast du genug Geld dabei?'],
        ['Ben', 'Ich runde schnell: 4,87 sind ungefähr 5 Euro. 2,35 ungefähr 2 Euro. 6,49 ungefähr 6 Euro. Und 3,60 ungefähr 4 Euro.'],
        ['Kassiererin', 'Und zusammen?'],
        ['Ben', '5 plus 2 plus 6 plus 4 … ungefähr 17 Euro. Das reicht!'],
        ['Kassiererin', 'Richtig. Genau sind es 17,31 Euro. Du bekommst 2,69 Euro zurück.'],
      ],
      vor: [{ art: 'mc', auftrag: '4,87 € sind ungefähr … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['4 €', '5 €', '48 €'], r: 1 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Schreibe die Preise und runde auf ganze Euro.', stufe: 1, kopf: ['Ware', 'Preis', 'gerundet'], breiten: [34, 33, 33], zeilen: [['Brot', '[4,87 €]', '[≈ 5 €]'], ['Käse', '[2,35 €]', '[≈ 2 €]'], ['Obst', '[6,49 €]', '[≈ 6 €]'], ['Saft', '[3,60 €]', '[≈ 4 €]'], ['zusammen', '[17,31 €]', '[≈ 17 €]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Einkaufs-Spiel: Eine Person nennt vier Preise mit Cent. Die anderen runden und sagen schnell, ob 20 € reichen.', stufe: 2, karten: [
        { titel: 'Regel', text: ['Schau auf die erste Ziffer nach dem Komma.', '0 bis 4: abrunden.', '5 bis 9: aufrunden.'] }] }],
    },
    erklaeren: { auftrag: 'Warum ist Runden beim Einkaufen praktisch? Erkläre mit einem Beispiel.', anfaenge: ['Beim Einkaufen …', 'Zum Beispiel: …'] },
  },
  // 2 Dezimalzahl mal ganze Zahl
  {
    fr: 'Je multiplie un nombre décimal par un nombre entier.',
    bild: ['jana:froh:stehen-zeigen', 'verkaeuferin:froh:erklaeren'],
    hoeren: {
      was: 'Im Schwimmbad', wo: 'Schwimmbad · Kasse', titel: 'Sechs Eintrittskarten',
      situation: 'Jana kauft Eintrittskarten für ihre Gruppe. Sie rechnet mit Dezimalzahlen.',
      bild: ['verkaeuferin:froh:erklaeren', 'jana:froh:stehen-zeigen'], sprecher: { Kassiererin: 'w1', Jana: 'w2' },
      text: [
        ['Kassiererin', 'Hallo! Eine Karte für Jugendliche kostet 4,50 Euro.'],
        ['Jana', 'Wir sind sechs. 4,50 mal 6 … zuerst ohne Komma: 450 mal 6 sind 2.700. Dann zwei Stellen nach dem Komma: 27,00. Also 27 Euro.'],
        ['Kassiererin', 'Super gerechnet. Möchtet ihr auch Schwimmnudeln? Eine kostet 1,25 Euro.'],
        ['Jana', 'Drei Stück, bitte. 1,25 mal 3 … 125 mal 3 sind 375, mit zwei Stellen nach dem Komma: 3,75 Euro.'],
        ['Kassiererin', 'Genau. Zusammen sind das 30,75 Euro.'],
        ['Jana', 'Hier sind 35 Euro.'],
        ['Kassiererin', 'Und 4,25 Euro zurück. Viel Spaß!'],
      ],
      vor: [{ art: 'mc', auftrag: '2,5 · 2 = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['4,10', '5', '50'], r: 1 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['6 Karten: 4,50 € · 6 = [27,00] €', '3 Schwimmnudeln: 1,25 € · 3 = [3,75] €', 'zusammen: [30,75] €', 'bezahlt 35 €, zurück: [4,25] €'] }],
      nach: [{ art: 'sprechen', auftrag: 'Plant einen Ausflug für eure Gruppe: Wählt einen Preis pro Person und rechnet für 4, 5 und 8 Personen.', stufe: 2, karten: [
        { titel: 'Preise', text: ['Kino: 7,50 €', 'Bus: 2,40 €', 'Minigolf: 5,80 €', 'Eis: 1,90 €'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre in drei Schritten, wie du 2,4 · 3 rechnest.', anfaenge: ['1. Ich rechne ohne Komma: …', '2. Ich zähle die Stellen …', '3. Ich setze das Komma …'] },
  },
  // 3 Dezimalzahl geteilt durch ganze Zahl
  {
    fr: 'Je divise un nombre décimal par un nombre entier.',
    bild: ['noah:froh:tasse', 'mia:froh:handy'],
    hoeren: {
      was: 'Die Rechnung teilen', wo: 'Pizzeria · nach dem Essen', titel: 'Jeder zahlt gleich viel',
      situation: 'Vier Freunde waren Pizza essen. Sie wollen die Rechnung gerecht teilen.',
      bild: ['noah:froh:tasse', 'mia:froh:handy'], sprecher: { Noah: 'm3', Mia: 'w2' },
      text: [
        ['Noah', 'Die Rechnung ist 38,60 Euro. Wir sind vier.'],
        ['Mia', 'Ich teile: 38 geteilt durch 4 ist 9, Rest 2. Jetzt kommt das Komma. Dann 26 geteilt durch 4 ist 6, Rest 2. Dann 20 geteilt durch 4 ist 5.'],
        ['Noah', 'Also 9,65 Euro für jeden.'],
        ['Mia', 'Probe: 9,65 mal 4 … das sind 38,60. Stimmt!'],
        ['Noah', 'Und das Wasser für 4,50 Euro teilen nur wir drei, Lea hat Saft getrunken.'],
        ['Mia', '4,50 geteilt durch 3 sind 1,50 Euro pro Person.'],
      ],
      vor: [{ art: 'mc', auftrag: '8,4 ÷ 2 = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['4,2', '42', '4,02'], r: 0 }] }],
      beim: [{ art: 'rechnen', auftrag: 'Hör zu. Rechne mit.', stufe: 2, items: [{ a: 'Pizza: 38,60 € ÷ 4 = ?', l: '9,65 €', raum: 4 }, { a: 'Probe: 9,65 € · 4 = ?', l: '38,60 €', raum: 3 }, { a: 'Wasser: 4,50 € ÷ 3 = ?', l: '1,50 €', raum: 3 }] }],
      nach: [{ art: 'sprechen', auftrag: 'Teilt gerecht: Erfindet eine Rechnung (zum Beispiel 25,80 €) und teilt sie durch 2, 3 oder 4 Personen. Macht immer die Probe.', stufe: 3, karten: [
        { titel: 'Tipp', text: ['Kommt das Komma: Komma ins Ergebnis!', 'Rest? Eine Null anhängen.', 'Probe: Ergebnis mal Anzahl.'] }] }],
    },
    erklaeren: { auftrag: 'Was machst du, wenn beim Teilen ein Rest bleibt? Erkläre mit 4,50 ÷ 3.', anfaenge: ['4 ÷ 3 = 1, Rest …', 'Dann nehme ich …', 'Ergebnis: …'] },
  },
  // 4 Flächeninhalt
  {
    fr: 'Je calcule l’aire du rectangle et du carré.',
    bild: ['opa:froh:erklaeren', 'lina:froh:stehen'],
    erklBild: kaestchenFlaeche(6, 4, { text: '6 · 4 = 24 Kästchen' }),
    hoeren: {
      was: 'Ein neuer Boden', wo: 'Jugendraum der Schule · Renovierung', titel: 'Wie viele Teppichfliesen?',
      situation: 'Der Jugendraum bekommt einen neuen Boden. Lina hilft Herrn Becker beim Rechnen.',
      bild: ['opa:froh:erklaeren', 'lina:froh:stehen'], sprecher: { 'Herr Becker': 'm2', Lina: 'w3' },
      text: [
        ['Herr Becker', 'Der Raum ist 6 Meter lang und 4 Meter breit. Wie groß ist die Fläche?'],
        ['Lina', 'Länge mal Breite: 6 mal 4 sind 24 Quadratmeter.'],
        ['Herr Becker', 'Eine Teppichfliese ist ein Quadrat mit 1 Meter Seitenlänge. Wie viele brauchen wir?'],
        ['Lina', 'Eine Fliese ist 1 Quadratmeter. Also brauchen wir 24 Fliesen.'],
        ['Herr Becker', 'Eine Fliese kostet 12 Euro.'],
        ['Lina', '24 mal 12 … das sind 288 Euro.'],
        ['Herr Becker', 'Und die Ecke mit dem Sofa ist ein Quadrat von 2 mal 2 Metern. Da legen wir einen weichen Teppich.'],
        ['Lina', '2 mal 2 sind 4 Quadratmeter. Dann brauchen wir für den Rest nur 20 Fliesen!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Der Flächeninhalt eines Rechtecks ist … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Länge mal Breite', 'Länge plus Breite'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und rechne.', stufe: 1, kopf: ['', 'Rechnung', 'Ergebnis'], breiten: [32, 36, 32], zeilen: [['ganzer Raum', '[6 m · 4 m]', '[24 m²]'], ['Preis aller Fliesen', '[24 · 12 €]', '[288 €]'], ['Sofa-Ecke', '[2 m · 2 m]', '[4 m²]'], ['Fliesen ohne Sofa-Ecke', '[24 − 4]', '[20 Fliesen]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Messt euer Klassenzimmer (oder einen Tisch) und berechnet die Fläche. Wie viele Blätter Papier würden den Tisch bedecken?', stufe: 3, karten: [
        { titel: 'Sätze', text: ['Der Tisch ist … cm lang und … cm breit.', 'Die Fläche ist … cm².', 'Ein Blatt hat ungefähr 600 cm².'] }] }],
    },
    ueben: [{ art: 'frei', auftrag: 'Zeichne auf dem Kästchenpapier ein Rechteck mit 12 Kästchen. Findest du zwei verschiedene Rechtecke?', stufe: 2, html: `<div class="rechnen"><div class="rk" style="height:55mm"><span class="l">z. B. 6 · 2 und 4 · 3 (auch 12 · 1)</span></div></div>` }],
    erklaeren: { auftrag: 'Erkläre den Unterschied zwischen Umfang und Flächeninhalt mit einem Beispiel aus dem Alltag.', anfaenge: ['Der Umfang ist …', 'Der Flächeninhalt ist …', 'Zum Beispiel: …'] },
  },
  // 5 Flächeneinheiten
  {
    fr: 'Je connais les unités d’aire et je convertis des unités voisines.',
    bild: ['opa:froh:stehen', 'finn:ueberrascht:stehen'],
    erklBild: treppe(['km²', 'ha', 'a', 'm²', 'dm²', 'cm²'], ['· 100', '· 100', '· 100', '· 100', '· 100']),
    hoeren: {
      was: 'Auf dem Bauernhof', wo: 'Bauernhof · Klassenausflug', titel: 'Zwei Hektar Weizen',
      situation: 'Die Klasse besucht einen Bauernhof. Der Bauer erzählt von seinen Feldern.',
      bild: ['opa:froh:stehen', 'finn:ueberrascht:stehen'], sprecher: { Bauer: 'm2', Finn: 'm3' },
      text: [
        ['Bauer', 'Dieses Weizenfeld ist 2 Hektar groß.'],
        ['Finn', 'Wie viele Quadratmeter sind das?'],
        ['Bauer', 'Ein Hektar sind 10.000 Quadratmeter. Also hat das Feld 20.000 Quadratmeter.'],
        ['Finn', 'Wow! Und der Gemüsegarten?'],
        ['Bauer', 'Er ist 3 Ar groß. Ein Ar sind 100 Quadratmeter.'],
        ['Finn', 'Dann sind das 300 Quadratmeter.'],
        ['Bauer', 'Richtig. Und der Hühnerstall hat 25 Quadratmeter.'],
        ['Finn', 'Das ist ein Viertel von einem Ar!'],
      ],
      vor: [{ art: 'mc', auftrag: '1 m² = … dm². Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['10', '100', '1.000'], r: 1 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['Weizenfeld: 2 ha = [20.000] m²', 'Gemüsegarten: 3 a = [300] m²', 'Hühnerstall: [25] m² = ein Viertel von [1 a]'] }],
      nach: [{ art: 'sprechen', auftrag: 'Ordnet nach der Größe und nennt die passende Einheit: ein Handy, ein Klassenzimmer, ein Fußballfeld, Luxemburg.', stufe: 2, karten: [
        { titel: 'Einheiten', text: ['cm² – ein Handy', 'm² – ein Zimmer', 'ha – ein Fußballfeld (ungefähr 0,7 ha)', 'km² – ein Land'] }] }],
    },
    erklaeren: { auftrag: 'Warum ist 1 m² = 100 dm² und nicht 10 dm²? Erkläre mit einer Zeichnung oder mit Worten.', anfaenge: ['1 m = 10 dm.', 'Ein Quadrat mit 1 m Seite hat …', 'Also …'], zeilen: 6 },
  },
  // 6 Temperatur
  {
    fr: 'Je lis des températures, aussi au-dessous de zéro, et je calcule des variations.',
    bild: ['lea:froh:handy'],
    erklBild: `<div style="display:flex;gap:10mm;justify-content:center">${thermometer(-10, 20, -3)}${thermometer(-10, 20, 5)}</div><div style="text-align:center;font-size:12pt;margin-top:1mm">morgens −3 °C → mittags +5 °C: 8 Grad wärmer</div>`,
    hoeren: {
      was: 'Der Wetterbericht', wo: 'Radio · Wetter am Morgen', titel: 'Frostig am Morgen',
      situation: 'Im Radio kommt der Wetterbericht. Hör gut zu und schreibe die Temperaturen auf.',
      bild: ['lea:froh:handy', 'lehrer:froh:erklaeren'], sprecher: { Wettersprecher: 'm1' },
      text: [
        ['Wettersprecher', 'Guten Morgen, hier ist das Wetter für heute. Im Norden ist es frostig: In Clervaux haben wir jetzt minus 4 Grad. Am Mittag steigt die Temperatur auf plus 3 Grad.'],
        ['Wettersprecher', 'In Luxemburg-Stadt ist es jetzt minus 1 Grad. Mittags wird es 5 Grad warm.'],
        ['Wettersprecher', 'Im Süden, in Remich an der Mosel, haben wir jetzt 0 Grad. Am Mittag sind es angenehme 7 Grad.'],
        ['Wettersprecher', 'Heute Nacht wird es wieder kalt: In Clervaux sinkt die Temperatur auf minus 6 Grad. Fahren Sie vorsichtig!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist kälter? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['−4 °C', '−1 °C'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Ergänze die Tabelle und berechne die Änderung.', stufe: 2, kopf: ['Ort', 'morgens', 'mittags', 'Änderung'], breiten: [30, 22, 22, 26], zeilen: [['Clervaux', '[−4 °C]', '[+3 °C]', '[7 Grad wärmer]'], ['Luxemburg-Stadt', '[−1 °C]', '[+5 °C]', '[6 Grad wärmer]'], ['Remich', '[0 °C]', '[+7 °C]', '[7 Grad wärmer]']] }, { art: 'fragen', auftrag: 'Clervaux: von +3 °C am Mittag auf −6 °C in der Nacht. Um wie viel Grad wird es kälter?', stufe: 3, fragen: [{ f: '', l: '9 Grad (3 bis 0, dann 6 weiter)' }] }],
      nach: [{ art: 'sprechen', auftrag: 'Spielt Wetterbericht: Eine Person liest Temperaturen für drei Orte vor. Die anderen sagen, wo es am wärmsten und am kältesten ist.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['In … ist es am kältesten: …', 'Von … bis … sind es … Grad.', 'Es wird … Grad wärmer.'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, wie du von −3 °C bis +5 °C rechnest. Benutze das Thermometer als Hilfe.', anfaenge: ['Von −3 °C bis 0 °C sind es …', 'Von 0 °C bis +5 °C sind es …', 'Zusammen: …'] },
  },
  // 7 Diagramme lesen
  {
    fr: 'Je lis des informations dans un diagramme en bâtons.',
    bild: ['yusuf:froh:laptop', 'lehrerin:froh:erklaeren'],
    erklBild: balkendiagramm([['Apfel', 6], ['Banane', 4], ['Birne', 2], ['Traube', 5]], { titel: 'Lieblingsobst der Klasse', einheit: 'Kinder' }),
    hoeren: {
      was: 'Ergebnisse einer Umfrage', wo: 'Klassenrat · Ergebnisse vorstellen', titel: 'Welcher Sport?',
      situation: 'Yusuf stellt die Ergebnisse seiner Umfrage vor: Welchen Sport machen die Schüler der Klasse am liebsten?',
      bild: ['yusuf:froh:laptop', 'lehrerin:froh:erklaeren'], sprecher: { Yusuf: 'm1', 'Frau Kremer': 'w1' },
      text: [
        ['Yusuf', 'Ich habe 24 Schüler gefragt: Welchen Sport machst du am liebsten?'],
        ['Yusuf', 'Fußball haben 8 Schüler gewählt. Basketball 5 Schüler. Schwimmen 3 Schüler.'],
        ['Frau Kremer', 'Und Tanzen?'],
        ['Yusuf', 'Tanzen haben 6 Schüler gewählt. Und 2 Schüler fahren am liebsten Skateboard.'],
        ['Frau Kremer', 'Danke, Yusuf. Was ist also der beliebteste Sport?'],
        ['Yusuf', 'Fußball, mit 8 Stimmen. Am wenigsten beliebt ist Skateboard mit 2 Stimmen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'In einem Balkendiagramm zeigt der höchste Balken … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['den größten Wert', 'den kleinsten Wert'], r: 0 }] }],
      beim: [
        { art: 'frei', auftrag: 'Hör zu. Zeichne die Balken in das Diagramm.', stufe: 2, html: balkendiagramm([['Fußball', 8], ['Basket', 5], ['Schwimmen', 3], ['Tanzen', 6], ['Skate', 2]], { leer: true, einheit: 'Schüler', max: 10 }) },
        { art: 'fragen', auftrag: 'Prüfe: Sind es zusammen 24 Schüler?', stufe: 2, fragen: [{ f: '', l: '8 + 5 + 3 + 6 + 2 = 24 – ja' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht eine Umfrage in der Klasse (zum Beispiel: Lieblingsfarbe oder Lieblingsessen) und zeichnet ein Balkendiagramm.', stufe: 3, karten: [
        { titel: 'Sätze', text: ['Am beliebtesten ist …', '… haben … Schüler gewählt.', '… doppelt so viele wie …'] }] }],
    },
    erklaeren: { auftrag: 'Warum ist ein Diagramm oft besser als eine Liste mit Zahlen? Erkläre.', anfaenge: ['Im Diagramm sieht man …', 'In einer Liste muss man …'] },
  },
  // 8 Strichliste und Häufigkeit
  {
    fr: 'Je tiens une liste de comptage et je détermine l’effectif.',
    bild: ['sami:froh:blatt', 'nele:froh:zeigen'],
    hoeren: {
      was: 'Eine Verkehrszählung', wo: 'Vor der Schule · Projekt Schulweg', titel: 'Autos, Busse, Fahrräder',
      situation: 'Sami und Nele haben 15 Minuten lang den Verkehr vor der Schule gezählt. Sie berichten.',
      bild: ['sami:froh:blatt', 'nele:froh:zeigen'], sprecher: { Sami: 'm3', Nele: 'w3' },
      text: [
        ['Sami', 'Bei den Autos haben wir vier Fünferbündel und drei einzelne Striche.'],
        ['Nele', 'Das sind 4 mal 5 plus 3, also 23 Autos.'],
        ['Sami', 'Bei den Bussen: ein Fünferbündel und ein Strich.'],
        ['Nele', 'Also 6 Busse. Bei den Fahrrädern haben wir zwei Bündel und vier Striche.'],
        ['Sami', 'Das sind 14 Fahrräder! Und Lastwagen: nur zwei Striche.'],
        ['Nele', 'Zusammen sind es 23 plus 6 plus 14 plus 2 … 45 Fahrzeuge in 15 Minuten.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Ein Fünferbündel in der Strichliste hat … Striche. Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['4', '5', '10'], r: 1 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Zeichne die Strichliste und schreibe die Häufigkeit.', stufe: 1, kopf: ['Fahrzeug', 'Strichliste', 'Häufigkeit'], breiten: [24, 50, 26], zeilen: [['Autos', '[4 Fünferbündel + 3 Striche]', '[23]'], ['Busse', '[1 Fünferbündel + 1 Strich]', '[6]'], ['Fahrräder', '[2 Fünferbündel + 4 Striche]', '[14]'], ['Lastwagen', '[2 Striche]', '[2]'], ['zusammen', '', '[45]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Würfelt 30-mal und führt eine Strichliste. Welche Zahl kam am häufigsten? Vergleicht mit anderen Gruppen.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Die 4 kam … Mal.', 'Am häufigsten kam …', 'Zusammen sind es 30 Würfe.'] }] }],
    },
    erklaeren: { auftrag: 'Warum macht man in einer Strichliste Fünferbündel? Erkläre.', anfaenge: ['Mit Bündeln kann man …', 'Ohne Bündel …'] },
  },
  // 9 Mittelwert
  {
    fr: 'Je calcule la moyenne d’une série de données.',
    bild: ['amira:froh:stehen', 'lehrer:froh:zeigen'],
    erklBild: balkendiagramm([['Tom', 4], ['Mia', 6], ['Ben', 8]], { titel: 'Bonbons: 4 + 6 + 8 = 18 · 18 ÷ 3 = 6', max: 8 }),
    hoeren: {
      was: 'Nach dem Basketball-Training', wo: 'Sporthalle · Basketball-AG', titel: 'Im Durchschnitt 11 Punkte',
      situation: 'Amira hat in vier Spielen Punkte gesammelt. Ihr Trainer rechnet den Durchschnitt aus.',
      bild: ['lehrer:froh:zeigen', 'amira:froh:stehen'], sprecher: { Trainer: 'm1', Amira: 'w2' },
      text: [
        ['Trainer', 'Amira, du hast in vier Spielen so viele Punkte gemacht: 12, 8, 15 und 9.'],
        ['Amira', 'Wie viele Punkte mache ich im Durchschnitt?'],
        ['Trainer', 'Zuerst addieren wir: 12 plus 8 plus 15 plus 9.'],
        ['Amira', 'Das sind 44 Punkte.'],
        ['Trainer', 'Dann teilen wir durch die Anzahl der Spiele, also durch 4.'],
        ['Amira', '44 geteilt durch 4 sind 11. Im Durchschnitt mache ich 11 Punkte pro Spiel!'],
        ['Trainer', 'Genau. Und wenn du im nächsten Spiel 16 Punkte machst?'],
        ['Amira', 'Dann sind es 60 Punkte in 5 Spielen, also 12 im Durchschnitt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Der Mittelwert von 2, 4 und 6 ist … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['4', '6', '12'], r: 0 }] }],
      beim: [{ art: 'rechnen', auftrag: 'Hör zu und rechne.', stufe: 2, items: [{ a: 'Summe: 12 + 8 + 15 + 9 = ?', l: '44 Punkte', raum: 2 }, { a: 'Mittelwert: 44 ÷ 4 = ?', l: '11 Punkte', raum: 2 }, { a: 'Mit dem 5. Spiel (16 Punkte): Mittelwert = ?', l: '60 ÷ 5 = 12 Punkte', raum: 3 }] }],
      nach: [{ art: 'sprechen', auftrag: 'Jeder in der Gruppe wirft fünfmal einen Papierball in den Papierkorb. Notiert die Treffer und berechnet den Mittelwert der Gruppe.', stufe: 3, karten: [
        { titel: 'So geht’s', text: ['1. Alle Werte addieren.', '2. Durch die Anzahl teilen.', '3. Prüfen: Liegt der Mittelwert dazwischen?'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre einem Mitschüler, was der Mittelwert bedeutet. Benutze das Wort „gerecht verteilen“.', anfaenge: ['Der Mittelwert ist …', 'Wenn man alles gerecht verteilt, …'] },
  },
]

export const LEKTIONEN = matheLektionen(3, EXTRAS)

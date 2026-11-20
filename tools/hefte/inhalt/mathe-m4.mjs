// Mathematik · Modul 4 „Teilbarkeit, Brüche, Prozente und Dreiecke“ (Voie de préparation) – multimodales Modulheft.
// Lektionen, Erklärungen und Übungen: aus dem Mathe-Programm (CNES-Referenzrahmen „Mathématiques – voie préparatoire“).
// Neu hier: Hörszenen aus dem Alltag, Bilder, Schreibaufträge „Erklären“. Personen, Preise und Zahlen: ausgedacht.

import { matheModul, matheLektionen } from './mathe-gemeinsam.mjs'
import { bruchstreifen, kreisBruch, hunderterfeld, dreiecksarten, dreieckHoehe, winkelarten, zahlenstrahl } from './mathe-bilder.mjs'

export const MODUL = matheModul(4, {
  titelFr: 'Divisibilité, fractions, pourcentages et triangles',
  unterFr: 'Des diviseurs aux fractions et aux pourcentages, jusqu’aux triangles – le cœur de l’année.',
  deckbild: ['chloe:froh:handy', 'sami:froh:stehen-zeigen', 'nele:froh:tasse'],
  blasen: [{ t: '−25 %!', x: 18, y: 112 }, { t: '3/4 Pizza für mich', x: 108, y: 98 }, { t: 'Quersumme?', x: 164, y: 150 }],
  themenIcons: ['divide', 'chart-pie', 'percentage', 'triangle'],
})

const zeichenfeld = (h = 60) => `<div style="border:0.6mm dashed var(--f);border-radius:3mm;height:${h}mm"></div>`
const B = (z, n) => `{{${z}/${n}}}` // Bruch im Heft

const EXTRAS = [
  // 1 Teilbar durch 2, 5, 10
  {
    fr: 'Je vois au dernier chiffre si un nombre est divisible par 2, 5 ou 10.',
    bild: ['lehrer:froh:zeigen', 'ben:froh:stehen'],
    hoeren: {
      was: 'Teams im Sportunterricht', wo: 'Sporthalle · Teams bilden', titel: 'Geht das auf?',
      situation: 'Herr Kuedes will gleich große Teams bilden. Geht es ohne Rest auf?',
      bild: ['lehrer:froh:zeigen', 'ben:froh:stehen'], sprecher: { 'Herr Kuedes': 'm1', Ben: 'm3' },
      text: [
        ['Herr Kuedes', 'Heute sind 24 Schüler da. Können wir Paare bilden, also Zweierteams?'],
        ['Ben', '24 endet auf 4, das ist gerade. Also geht es durch 2: 12 Paare.'],
        ['Herr Kuedes', 'Und Fünferteams?'],
        ['Ben', 'Nein. Eine Zahl ist nur durch 5 teilbar, wenn sie auf 0 oder 5 endet.'],
        ['Herr Kuedes', 'Richtig. Morgen kommt die Parallelklasse dazu, dann sind wir 30.'],
        ['Ben', '30 endet auf 0. Das geht durch 2, durch 5 und durch 10! Wir können 3 Zehnerteams für Fußball bilden.'],
        ['Herr Kuedes', 'Perfekt. Und 6 Fünferteams für Basketball.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Eine Zahl ist durch 10 teilbar, wenn sie auf … endet. Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['0', '5', '2'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Teilbar? Kreuze an.', stufe: 1, kopf: ['Schüler', 'durch 2', 'durch 5', 'durch 10'], breiten: [28, 24, 24, 24], zeilen: [['24', '[x]', '', ''], ['30', '[x]', '[x]', '[x]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Zahlenblitz: Eine Person nennt eine Zahl. Die anderen sagen schnell: durch 2? durch 5? durch 10?', stufe: 1, karten: [
        { titel: 'Regeln', text: ['durch 2: Endziffer 0, 2, 4, 6, 8', 'durch 5: Endziffer 0 oder 5', 'durch 10: Endziffer 0'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, warum jede Zahl, die durch 10 teilbar ist, auch durch 2 und durch 5 teilbar ist.', anfaenge: ['Eine Zahl durch 10 endet auf …', 'Die 0 ist …'] },
  },
  // 2 Teilbar durch 3 und 9
  {
    fr: 'Je calcule la somme des chiffres pour vérifier la divisibilité par 3 et par 9.',
    bild: ['amira:froh:laptop', 'yusuf:froh:erklaeren'],
    hoeren: {
      was: 'Geld gerecht verteilen', wo: 'Klassenrat · Klassenkasse', titel: 'Die Quersumme verrät es',
      situation: 'Die Klasse hat 735 Euro gesammelt. Das Geld soll gerecht auf Projekte verteilt werden.',
      bild: ['amira:froh:laptop', 'yusuf:froh:erklaeren'], sprecher: { Amira: 'w2', Yusuf: 'm1' },
      text: [
        ['Amira', 'Wir haben 735 Euro. Können wir das auf drei Projekte gleich verteilen, ohne Cent?'],
        ['Yusuf', 'Ich bilde die Quersumme: 7 plus 3 plus 5 sind 15. 15 ist durch 3 teilbar. Also ja!'],
        ['Amira', 'Dann bekommt jedes Projekt 735 geteilt durch 3 … 245 Euro.'],
        ['Yusuf', 'Und durch 9? 15 ist nicht durch 9 teilbar. Also geht 735 nicht durch 9.'],
        ['Amira', 'Und wenn wir noch 3 Euro bekommen? Dann haben wir 738 Euro.'],
        ['Yusuf', 'Quersumme: 7 plus 3 plus 8 sind 18. 18 ist durch 9 teilbar! Dann geht es auch durch 9.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Die Quersumme von 123 ist … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['6', '123', '15'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['Zahl', 'Quersumme', 'durch 3?', 'durch 9?'], breiten: [25, 25, 25, 25], zeilen: [['735', '[15]', '[ja]', '[nein]'], ['738', '[18]', '[ja]', '[ja]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Quersummen-Duell: Jede Person schreibt eine dreistellige Zahl. Die andere prüft mit der Quersumme: durch 3? durch 9?', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Die Quersumme ist …', '… ist durch 3 teilbar, also …', '… ist nicht durch 9 teilbar.'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre einem Mitschüler, was die Quersumme ist und wofür man sie braucht.', anfaenge: ['Die Quersumme ist …', 'Wenn die Quersumme durch 3 teilbar ist, …'] },
  },
  // 3 Teilbar durch 4, 6, 25
  {
    fr: 'J’applique toutes les règles de divisibilité et je les combine.',
    bild: ['nele:froh:zeigen', 'opa:froh:erklaeren'],
    hoeren: {
      was: 'Tische für das Schulfest', wo: 'Mensa · Aufbau für das Schulfest', titel: '132 Gäste',
      situation: 'Für das Schulfest kommen 132 Gäste. Nele und Herr Becker planen die Tische.',
      bild: ['opa:froh:erklaeren', 'nele:froh:zeigen'], sprecher: { 'Herr Becker': 'm2', Nele: 'w3' },
      text: [
        ['Herr Becker', 'Wir haben 132 Gäste. An einen kleinen Tisch passen 4 Personen. Geht das auf?'],
        ['Nele', 'Ich schaue auf die letzten zwei Ziffern: 32. 32 ist durch 4 teilbar. Also ja: 33 Tische.'],
        ['Herr Becker', 'Und die großen Tische für 6 Personen?'],
        ['Nele', 'Durch 6 heißt: durch 2 und durch 3. 132 ist gerade, und die Quersumme ist 6. Also ja: 22 Tische.'],
        ['Herr Becker', 'Und die Lose? Sie kommen in Rollen zu 25 Stück. Wir brauchen 132 Lose.'],
        ['Nele', '132 endet auf 32, nicht auf 00, 25, 50 oder 75. Das geht nicht auf. Wir brauchen 6 Rollen, dann haben wir 150 Lose.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Eine Zahl ist durch 6 teilbar, wenn sie … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['durch 2 und durch 3 teilbar ist', 'auf 6 endet'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['132 durch …', 'Warum?', 'Ergebnis'], breiten: [20, 50, 30], zeilen: [['4', '[letzte zwei Ziffern 32 sind durch 4 teilbar]', '[33 Tische]'], ['6', '[gerade und Quersumme 6]', '[22 Tische]'], ['25', '[endet nicht auf 00, 25, 50, 75]', '[geht nicht – 6 Rollen]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Detektiv-Spiel: Nennt eine Zahl, die durch 4 und durch 25 teilbar ist. Was fällt euch auf?', stufe: 3, karten: [
        { titel: 'Tipp', text: ['Durch 4 und durch 25 → durch 100!', 'Beispiele: 100, 200, 1.000'] }] }],
    },
    erklaeren: { auftrag: 'Ist 360 durch 6 teilbar? Erkläre deine Antwort mit zwei Regeln.', anfaenge: ['360 ist durch 2 teilbar, weil …', '360 ist durch 3 teilbar, weil …', 'Also …'] },
  },
  // 4 Was ist ein Bruch?
  {
    fr: 'Je lis et j’écris des fractions et je reconnais la fraction d’une quantité.',
    bild: ['finn:froh:tasse', 'mia:froh:stehen'],
    erklBild: `<div style="display:flex;gap:10mm;align-items:center;justify-content:center">${kreisBruch(4, 3, 30)}<div style="font-size:13pt">Zähler 3 → 3 Teile genommen<br>Nenner 4 → in 4 Teile geteilt</div></div>`,
    hoeren: {
      was: 'Pizza-Abend', wo: 'Jugendhaus · Pizza-Abend', titel: 'Drei Achtel sind weg!',
      situation: 'Im Jugendhaus gibt es Pizza. Finn und Mia sprechen über die Stücke.',
      bild: ['finn:froh:tasse', 'mia:froh:stehen'], sprecher: { Finn: 'm3', Mia: 'w2' },
      text: [
        ['Finn', 'Die große Pizza ist in 8 gleiche Stücke geschnitten.'],
        ['Mia', 'Ich habe schon 3 Stücke gegessen. Das sind drei Achtel.'],
        ['Finn', 'Der Nenner ist 8, weil die Pizza in 8 Teile geteilt ist. Der Zähler ist 3, weil du 3 Stücke hast.'],
        ['Mia', 'Genau. Wie viel ist noch da?'],
        ['Finn', '8 minus 3 … fünf Achtel. Ich nehme zwei Stücke, das sind zwei Achtel.'],
        ['Mia', 'Dann bleiben noch drei Achtel für Lea und Tom.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Bei einem Bruch zeigt der Nenner … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['in wie viele Teile man teilt', 'wie viele Teile man nimmt'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Schreibe die Brüche.', stufe: 1, kopf: ['Wer?', 'Stücke', 'Bruch'], breiten: [34, 33, 33], zeilen: [['Mia', '[3]', '[3/8]'], ['Finn', '[2]', '[2/8]'], ['für Lea und Tom', '[3]', '[3/8]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Teilt ein Blatt in gleiche Teile und malt einen Bruch an. Die andere Person sagt den Bruch: Zähler und Nenner.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Das Blatt hat … gleiche Teile.', '… Teile sind angemalt.', 'Das sind … .'] }] }],
    },
    ueben: [{ art: 'frei', auftrag: `Male an: ${B(1, 4)}, ${B(2, 3)} und ${B(5, 8)}.`, stufe: 1, html: `<div style="display:grid;gap:3mm">${bruchstreifen(4, 0)}${bruchstreifen(3, 0)}${bruchstreifen(8, 0)}</div>` }],
    erklaeren: { auftrag: `Erkläre mit einem Bild aus dem Alltag, was ${B(3, 4)} bedeutet.`, anfaenge: ['Ich teile … in 4 gleiche Teile.', 'Dann nehme ich …'] },
  },
  // 5 Zahlenstrahl, vergleichen, ordnen
  {
    fr: 'Je range des fractions de même dénominateur et je les place sur une droite graduée.',
    bild: ['sami:froh:handy', 'lea:froh:laptop'],
    erklBild: zahlenstrahl(0, 1, { teile: 8, zahlen: [0, 1], marken: [{ w: 3 / 8, t: '3/8' }, { w: 5 / 8, t: '5/8' }] }),
    hoeren: {
      was: 'Download-Rennen', wo: 'Im Bus · auf dem Handy', titel: 'Wer ist schneller fertig?',
      situation: 'Sami und Lea laden ein Spiel herunter. Sie vergleichen, wie weit der Download ist.',
      bild: ['sami:froh:handy', 'lea:froh:laptop'], sprecher: { Sami: 'm3', Lea: 'w2' },
      text: [
        ['Sami', 'Mein Download-Balken ist in 5 Teile geteilt. Zwei Fünftel sind schon fertig.'],
        ['Lea', 'Bei mir sind es schon vier Fünftel!'],
        ['Sami', 'Der Nenner ist gleich, also vergleichen wir nur die Zähler: 4 ist mehr als 2. Du bist weiter.'],
        ['Lea', 'Und Ben hat geschrieben: Bei ihm ist es ein Fünftel.'],
        ['Sami', 'Dann ist die Reihenfolge: Ben mit einem Fünftel, ich mit zwei Fünfteln, du mit vier Fünfteln.'],
        ['Lea', 'Und bei fünf Fünfteln ist der Download fertig – das ist ein Ganzes!'],
      ],
      vor: [{ art: 'mc', auftrag: `Was ist größer: ${B(3, 8)} oder ${B(5, 8)}? Kreuze an.`, stufe: 1, fragen: [{ f: '', o: [B(3, 8), B(5, 8)], r: 1 }] }],
      beim: [{ art: 'ordnen', auftrag: 'Hör zu. Ordne: Wer ist am wenigsten weit (1), wer am weitesten (3)?', stufe: 1, teile: [`Ben: ${B(1, 5)}`, `Sami: ${B(2, 5)}`, `Lea: ${B(4, 5)}`], ordnung: [2, 0, 1] }],
      nach: [{ art: 'sprechen', auftrag: 'Zeichnet einen Zahlenstrahl von 0 bis 1 mit 10 Teilen. Eine Person nennt einen Bruch (Zehntel), die andere zeigt ihn.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['3/10 liegt zwischen … und …', '… ist größer als …, weil …'] }] }],
    },
    erklaeren: { auftrag: 'Warum reicht es bei gleichem Nenner, nur die Zähler zu vergleichen? Erkläre.', anfaenge: ['Der gleiche Nenner bedeutet: …', 'Dann …'] },
  },
  // 6 Erweitern und Kürzen
  {
    fr: 'J’amplifie et je simplifie des fractions et je reconnais des fractions égales.',
    bild: ['noah:wuetend:verschraenkt', 'chloe:froh:erklaeren'],
    erklBild: `<div style="display:grid;gap:2mm">${bruchstreifen(2, 1, { text: '1/2' })}${bruchstreifen(4, 2, { text: '2/4' })}${bruchstreifen(8, 4, { text: '4/8 – alle gleich viel!' })}</div>`,
    hoeren: {
      was: 'Streit um Pizza', wo: 'Pause · auf dem Schulhof', titel: 'Wer hat mehr?',
      situation: 'Noah und Chloe haben gleich große Pizzen gekauft. Noah denkt, Chloe hat mehr.',
      bild: ['noah:wuetend:verschraenkt', 'chloe:froh:erklaeren'], sprecher: { Noah: 'm3', Chloe: 'w2' },
      text: [
        ['Noah', 'Das ist unfair! Du hast vier Stücke, ich nur zwei!'],
        ['Chloe', 'Warte. Meine Pizza war in 8 Stücke geschnitten. Ich habe vier Achtel.'],
        ['Noah', 'Und meine in 4 Stücke. Ich habe zwei Viertel.'],
        ['Chloe', 'Zwei Viertel – erweitere mit 2: Dann sind es vier Achtel. Genau so viel wie ich!'],
        ['Noah', 'Hm. Und beides ist die Hälfte der Pizza?'],
        ['Chloe', 'Richtig. Vier Achtel kann man durch 4 kürzen: ein Halb. Wir haben gleich viel.'],
        ['Noah', 'Okay … Frieden. Aber deine Stücke sind kleiner!'],
      ],
      vor: [{ art: 'mc', auftrag: `Ist ${B(1, 2)} gleich ${B(2, 4)}? Kreuze an.`, stufe: 1, fragen: [{ f: '', o: ['ja', 'nein'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['Chloe hat [4/8], Noah hat [2/4].', 'Erweitern mit 2: 2/4 = [4/8].', 'Kürzen durch 4: 4/8 = [1/2].'] }],
      nach: [{ art: 'sprechen', auftrag: 'Bruch-Paare finden: Schreibt Brüche auf Karten (1/2, 2/4, 3/6, 1/3, 2/6 …). Findet die gleichwertigen Paare.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['… ist gleich …, weil ich mit … erweitere.', 'Ich kürze durch …'] }] }],
    },
    erklaeren: { auftrag: `Erkläre, warum ${B(6, 8)} und ${B(3, 4)} gleich viel sind.`, anfaenge: ['Ich kürze 6/8 durch …', 'Dann …'] },
  },
  // 7 Gleichnamige Brüche addieren und subtrahieren
  {
    fr: 'J’additionne et je soustrais des fractions de même dénominateur.',
    bild: ['jana:froh:tasse', 'ben:froh:stehen'],
    hoeren: {
      was: 'Eine Saftmischung', wo: 'Küche der Schule · Kochkurs', titel: 'Drei Zehntel plus vier Zehntel',
      situation: 'Im Kochkurs mischen Jana und Ben einen Saft. Sie messen in Zehntel Liter.',
      bild: ['jana:froh:tasse', 'ben:froh:stehen'], sprecher: { Jana: 'w2', Ben: 'm3' },
      text: [
        ['Jana', 'Ins Glas kommen drei Zehntel Liter Orangensaft.'],
        ['Ben', 'Und vier Zehntel Liter Apfelsaft.'],
        ['Jana', 'Zusammen: drei Zehntel plus vier Zehntel sind sieben Zehntel Liter. Der Nenner bleibt 10.'],
        ['Ben', 'Dann noch ein Zehntel Liter Wasser. Das sind acht Zehntel.'],
        ['Jana', 'Wir trinken jetzt zwei Zehntel. Acht Zehntel minus zwei Zehntel …'],
        ['Ben', '… sind sechs Zehntel. Gekürzt: drei Fünftel Liter bleiben übrig.'],
      ],
      vor: [{ art: 'mc', auftrag: `${B(2, 8)} + ${B(3, 8)} = ? Kreuze an.`, stufe: 1, fragen: [{ f: '', o: [B(5, 8), B(5, 16)], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und rechne.', stufe: 1, saetze: ['3/10 l + 4/10 l = [7/10] l', '7/10 l + 1/10 l = [8/10] l', '8/10 l − 2/10 l = [6/10] l = [3/5] l'] }],
      nach: [{ art: 'sprechen', auftrag: 'Erfindet ein Rezept mit Zehntel Litern (drei Zutaten). Rechnet aus, wie viel es zusammen ist.', stufe: 3, karten: [
        { titel: 'Regel', text: ['Nenner bleibt gleich.', 'Nur die Zähler rechnen.', 'Am Ende kürzen, wenn möglich.'] }] }],
    },
    erklaeren: { auftrag: `Tom rechnet: ${B(2, 8)} + ${B(3, 8)} = ${B(5, 16)}. Erkläre seinen Fehler.`, anfaenge: ['Tom hat auch die Nenner …', 'Richtig ist: …'] },
  },
  // 8 Brüche und Dezimalzahlen
  {
    fr: 'Je transforme des fractions importantes en nombres décimaux et inversement.',
    bild: ['verkaeuferin:froh:stehen', 'lina:froh:stehen'],
    hoeren: {
      was: 'Auf dem Markt', wo: 'Wochenmarkt · am Käsestand', titel: 'Ein Viertel Kilo, bitte!',
      situation: 'Lina kauft auf dem Markt ein. Die Verkäuferin spricht in Brüchen, die Waage zeigt Dezimalzahlen.',
      bild: ['verkaeuferin:froh:stehen', 'lina:froh:stehen'], sprecher: { Verkäuferin: 'w1', Lina: 'w3' },
      text: [
        ['Lina', 'Guten Tag! Ein Viertel Kilo Käse, bitte.'],
        ['Verkäuferin', 'Gern. Die Waage zeigt 0,250 Kilogramm. Ein Viertel ist 0,25.'],
        ['Lina', 'Und ein halbes Kilo Tomaten.'],
        ['Verkäuferin', 'Ein Halb ist 0,5. Hier: 0,5 Kilogramm. Noch etwas?'],
        ['Lina', 'Ja, drei Viertel Kilo Äpfel.'],
        ['Verkäuferin', 'Drei Viertel sind 0,75. Die Waage zeigt 0,75 Kilogramm. Perfekt!'],
        ['Lina', 'Dann habe ich zusammen 0,25 plus 0,5 plus 0,75 … 1,5 Kilogramm, also eineinhalb Kilo!'],
      ],
      vor: [{ art: 'mc', auftrag: `${B(1, 2)} = ? Kreuze an.`, stufe: 1, fragen: [{ f: '', o: ['0,5', '0,2', '1,2'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['Ware', 'Bruch', 'Dezimalzahl'], breiten: [34, 33, 33], zeilen: [['Käse', '[1/4 kg]', '[0,25 kg]'], ['Tomaten', '[1/2 kg]', '[0,5 kg]'], ['Äpfel', '[3/4 kg]', '[0,75 kg]'], ['zusammen', '[1 1/2 kg]', '[1,5 kg]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Memory: Schreibt Paare auf Karten (1/2 und 0,5; 1/4 und 0,25; 3/4 und 0,75; 1/10 und 0,1; 1/5 und 0,2). Spielt Memory.', stufe: 1, karten: [
        { titel: 'Wichtige Paare', text: ['1/2 = 0,5', '1/4 = 0,25', '3/4 = 0,75', '1/10 = 0,1'] }] }],
    },
    erklaeren: { auftrag: `Erkläre, wie du ${B(1, 5)} in eine Dezimalzahl umwandelst.`, anfaenge: ['Ich erweitere auf den Nenner 10: …', 'Dann schreibe ich …'] },
  },
  // 9 Was ist Prozent?
  {
    fr: 'Je comprends % comme une fraction de dénominateur 100 et je lis des pourcentages.',
    bild: ['mia:besorgt:handy', 'noah:froh:stehen'],
    erklBild: `<div style="display:flex;gap:8mm;justify-content:center;align-items:end">${hunderterfeld(50)}${hunderterfeld(25)}${hunderterfeld(10)}</div><div style="display:flex;gap:8mm;justify-content:center;font-family:Lexend;font-weight:700"><span style="width:34mm;text-align:center">50 % = 1/2</span><span style="width:34mm;text-align:center">25 % = 1/4</span><span style="width:34mm;text-align:center">10 % = 1/10</span></div>`,
    hoeren: {
      was: 'Der Akku ist fast leer', wo: 'Im Zug · auf dem Weg nach Hause', titel: 'Nur noch 10 Prozent!',
      situation: 'Mia und Noah sitzen im Zug. Ihre Handys zeigen Prozentzahlen an.',
      bild: ['mia:besorgt:handy', 'noah:froh:stehen'], sprecher: { Mia: 'w2', Noah: 'm3' },
      text: [
        ['Mia', 'Oh nein, mein Akku hat nur noch 10 Prozent. Das ist ein Zehntel!'],
        ['Noah', 'Meiner hat noch 50 Prozent – die Hälfte.'],
        ['Mia', 'Kannst du mir deine Powerbank geben? Sie ist zu 75 Prozent voll.'],
        ['Noah', 'Klar. 75 Prozent sind drei Viertel.'],
        ['Mia', 'Und schau, mein Spiel ist zu 25 Prozent geladen. Ein Viertel …'],
        ['Noah', 'Bei 100 Prozent ist alles voll – das Ganze. Lad lieber den Akku zuerst!'],
      ],
      vor: [{ art: 'mc', auftrag: '50 % sind … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Hälfte', 'ein Viertel', 'alles'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['Was?', 'Prozent', 'Bruch'], breiten: [40, 30, 30], zeilen: [['Mias Akku', '[10 %]', '[1/10]'], ['Noahs Akku', '[50 %]', '[1/2]'], ['Powerbank', '[75 %]', '[3/4]'], ['Spiel geladen', '[25 %]', '[1/4]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Sucht Prozentzahlen im Alltag (Handy, Etiketten, Werbung). Sagt sie als Bruch: „50 % – das ist die Hälfte“.', stufe: 2, karten: [
        { titel: 'Wichtige Prozente', text: ['100 % = alles', '50 % = 1/2', '25 % = 1/4', '10 % = 1/10'] }] }],
    },
    ueben: [{ art: 'frei', auftrag: 'Male im Hunderterfeld 30 % an. Wie viele Kästchen sind das?', stufe: 1, html: `<div style="display:flex;gap:8mm;align-items:center">${hunderterfeld(0, { groesse: 40 })}<div class="rechnen" style="flex:1"><div class="rk" style="height:14mm"><span class="l">30 Kästchen</span></div></div></div>` }],
    erklaeren: { auftrag: 'Erkläre: Was bedeutet „Prozent“? Benutze das Hunderterfeld.', anfaenge: ['Prozent heißt …', 'Im Hunderterfeld …'] },
  },
  // 10 Prozentwert berechnen
  {
    fr: 'Je calcule combien représentent x % d’une quantité.',
    bild: ['lehrerin:froh:erklaeren', 'yusuf:froh:blatt'],
    hoeren: {
      was: 'Ergebnisse einer Schulumfrage', wo: 'Schulradio · Pausenprogramm', titel: '20 Prozent fahren Rad',
      situation: 'Im Schulradio werden die Ergebnisse einer Umfrage vorgestellt. 250 Schüler haben mitgemacht.',
      bild: ['lehrerin:froh:erklaeren', 'yusuf:froh:blatt'], sprecher: { Moderatorin: 'w1', Yusuf: 'm1' },
      text: [
        ['Moderatorin', 'Hallo, hier ist das Schulradio! 250 Schüler haben bei unserer Umfrage mitgemacht. Yusuf, wie kommen sie zur Schule?'],
        ['Yusuf', '40 Prozent kommen mit dem Bus. 10 Prozent von 250 sind 25, also sind 40 Prozent 100 Schüler.'],
        ['Moderatorin', 'Und mit dem Fahrrad?'],
        ['Yusuf', '20 Prozent. Das sind 2 mal 25, also 50 Schüler.'],
        ['Moderatorin', 'Und zu Fuß?'],
        ['Yusuf', '30 Prozent, also 75 Schüler. Und der Rest, 10 Prozent, kommt mit dem Auto: 25 Schüler.'],
        ['Moderatorin', 'Super! Prüfen wir: 100 plus 50 plus 75 plus 25 sind 250. Stimmt genau!'],
      ],
      vor: [{ art: 'mc', auftrag: '10 % von 250 sind … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['10', '25', '2.500'], r: 1 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und rechne.', stufe: 2, kopf: ['Weg', 'Prozent', 'Schüler'], breiten: [40, 30, 30], zeilen: [['Bus', '[40 %]', '[100]'], ['Fahrrad', '[20 %]', '[50]'], ['zu Fuß', '[30 %]', '[75]'], ['Auto', '[10 %]', '[25]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Rechnet im Kopf mit dem 10-%-Trick: 10 % von 80, 30 % von 80, 50 % von 80 …', stufe: 2, karten: [
        { titel: 'Tricks', text: ['10 % = ÷ 10', '50 % = ÷ 2', '25 % = ÷ 4', '20 % = 2 · 10 %'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre den „10-%-Trick“ mit dem Beispiel 30 % von 60 €.', anfaenge: ['Zuerst rechne ich 10 %: …', 'Dann …'] },
  },
  // 11 Rabatt
  {
    fr: 'Je calcule le nouveau prix après une réduction de x %.',
    bild: ['chloe:froh:handy', 'verkaeuferin:froh:erklaeren'],
    hoeren: {
      was: 'Schlussverkauf im Sportgeschäft', wo: 'Sportgeschäft · Soldes', titel: 'Minus 25 Prozent!',
      situation: 'Es ist Schlussverkauf. Chloe sucht neue Sportschuhe und eine Jacke.',
      bild: ['verkaeuferin:froh:erklaeren', 'chloe:froh:handy'], sprecher: { Verkäuferin: 'w1', Chloe: 'w2' },
      text: [
        ['Verkäuferin', 'Heute gibt es 25 Prozent Rabatt auf alle Schuhe!'],
        ['Chloe', 'Diese Schuhe kosten 80 Euro. 25 Prozent sind ein Viertel: 80 geteilt durch 4 sind 20 Euro Rabatt.'],
        ['Verkäuferin', 'Genau. Dann zahlst du nur noch 60 Euro.'],
        ['Chloe', 'Und die Jacke? Sie kostet 60 Euro, mit 30 Prozent Rabatt.'],
        ['Verkäuferin', '10 Prozent sind 6 Euro, also sind 30 Prozent 18 Euro.'],
        ['Chloe', '60 minus 18 … dann kostet die Jacke 42 Euro. Ich nehme beides: 102 Euro.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Rabatt bedeutet … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['der Preis wird kleiner', 'der Preis wird größer'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und rechne.', stufe: 2, kopf: ['', 'alter Preis', 'Rabatt', 'in Euro', 'neuer Preis'], breiten: [16, 20, 18, 20, 26], zeilen: [['Schuhe', '[80 €]', '[25 %]', '[20 €]', '[60 €]'], ['Jacke', '[60 €]', '[30 %]', '[18 €]', '[42 €]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Rollenspiel Schlussverkauf: Eine Person nennt einen Preis und einen Rabatt. Die andere rechnet den neuen Preis.', stufe: 2, karten: [
        { titel: 'Beispiele', text: ['T-Shirt: 20 €, −50 %', 'Rucksack: 40 €, −25 %', 'Ball: 30 €, −10 %'] }] }],
    },
    erklaeren: { auftrag: 'Eine Werbung sagt: „−50 % und dann noch −50 %! Alles gratis!“ Stimmt das? Erkläre mit 100 €.', anfaenge: ['Erst −50 %: …', 'Dann noch −50 % von …', 'Also …'], zeilen: 6 },
  },
  // 12 Erhöhung
  {
    fr: 'Je calcule le nouveau prix après une augmentation de x %.',
    bild: ['ben:ueberrascht:stehen', 'chef:froh:erklaeren'],
    hoeren: {
      was: 'Neue Preise in der Pizzeria', wo: 'Pizzeria · an der Theke', titel: 'Alles wird teurer',
      situation: 'Ben bestellt in seiner Lieblingspizzeria. Die Preise sind gestiegen.',
      bild: ['chef:froh:erklaeren', 'ben:ueberrascht:stehen'], sprecher: { Pizzabäcker: 'm2', Ben: 'm3' },
      text: [
        ['Ben', 'Eine Pizza Margherita, bitte. Die kostet 12 Euro, oder?'],
        ['Pizzabäcker', 'Leider nicht mehr. Wir haben die Preise um 10 Prozent erhöht.'],
        ['Ben', '10 Prozent von 12 Euro sind 1,20 Euro. Dann kostet sie jetzt 13,20 Euro.'],
        ['Pizzabäcker', 'Richtig. Das Mehl und der Strom sind teurer geworden.'],
        ['Ben', 'Und das Getränk? Vorher 2 Euro.'],
        ['Pizzabäcker', 'Auch plus 10 Prozent: 2,20 Euro.'],
        ['Ben', 'Zusammen 15,40 Euro. Gut, dass ich 20 Euro dabeihabe!'],
      ],
      vor: [{ art: 'mc', auftrag: '30 € + 10 % = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['33 €', '40 €', '31 €'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und rechne.', stufe: 2, kopf: ['', 'alter Preis', '+ 10 %', 'neuer Preis'], breiten: [22, 26, 26, 26], zeilen: [['Pizza', '[12 €]', '[1,20 €]', '[13,20 €]'], ['Getränk', '[2 €]', '[0,20 €]', '[2,20 €]'], ['zusammen', '', '', '[15,40 €]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Was wäre, wenn alles 10 % teurer würde? Rechnet für drei Dinge, die ihr oft kauft (Busticket, Getränk, Snack).', stufe: 3, karten: [
        { titel: 'So geht’s', text: ['10 % berechnen', 'zum alten Preis addieren', 'oder: alter Preis · 110 %'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre den Unterschied zwischen Rabatt und Aufschlag mit eigenen Beispielen.', anfaenge: ['Beim Rabatt …', 'Beim Aufschlag …'] },
  },
  // 13 Dreiecke erkennen
  {
    fr: 'Je nomme les triangles selon leurs angles et selon leurs côtés.',
    bild: ['lea:froh:zeigen', 'finn:froh:stehen'],
    erklBild: dreiecksarten(),
    hoeren: {
      was: 'Dreiecke in der Stadt', wo: 'Stadtrundgang · Mathe draußen', titel: 'Überall Dreiecke!',
      situation: 'Die Klasse macht einen Mathe-Rundgang durch die Stadt. Lea und Finn suchen Dreiecke.',
      bild: ['lea:froh:zeigen', 'finn:froh:stehen'], sprecher: { Lea: 'w2', Finn: 'm3' },
      text: [
        ['Lea', 'Schau, das Verkehrsschild „Vorfahrt gewähren“! Es ist ein Dreieck mit drei gleich langen Seiten.'],
        ['Finn', 'Das ist ein gleichseitiges Dreieck. Alle Winkel sind gleich, je 60 Grad.'],
        ['Lea', 'Und das Dach von dem Haus da? Zwei Seiten sind gleich lang, die untere ist länger.'],
        ['Finn', 'Gleichschenklig! Und mein Geodreieck hat einen rechten Winkel und zwei gleiche Seiten.'],
        ['Lea', 'Also ist es rechtwinklig und gleichschenklig – zwei Namen gleichzeitig!'],
        ['Finn', 'Und der Kleiderbügel im Schaufenster ist ganz flach. Oben hat er einen Winkel, der größer ist als 90 Grad.'],
        ['Lea', 'Ein stumpfwinkliges Dreieck!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Ein Dreieck mit einem 90°-Winkel heißt … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['spitzwinklig', 'rechtwinklig', 'stumpfwinklig'], r: 1 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Welches Dreieck ist es?', stufe: 1, kopf: ['Ding', 'Dreieck'], breiten: [45, 55], zeilen: [['Verkehrsschild', '[gleichseitig]'], ['Dach', '[gleichschenklig]'], ['Geodreieck', '[rechtwinklig und gleichschenklig]'], ['Kleiderbügel', '[stumpfwinklig]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Dreieck-Jagd: Findet im Schulhaus oder auf Bildern drei Dreiecke. Gebt jedem zwei Namen (Seiten und Winkel).', stufe: 3, karten: [
        { titel: 'Namen', text: ['gleichseitig · gleichschenklig · ungleichseitig', 'spitzwinklig · rechtwinklig · stumpfwinklig'] }] }],
    },
    erklaeren: { auftrag: 'Kann ein Dreieck zwei rechte Winkel haben? Erkläre (du darfst zeichnen).', anfaenge: ['Wenn ich zwei rechte Winkel zeichne, …', 'Also …'] },
  },
  // 14 Winkel messen und zeichnen
  {
    fr: 'Je mesure des angles avec l’équerre et je trace des angles de mesure donnée.',
    bild: ['opa:froh:erklaeren', 'sami:froh:stehen'],
    erklBild: winkelarten({ winkel: [50, 90, 130] }),
    hoeren: {
      was: 'Eine Rampe bauen', wo: 'Werkraum · Skate-Rampe bauen', titel: '30 Grad – nicht mehr!',
      situation: 'Sami baut mit Herrn Becker eine kleine Rampe. Der Winkel muss stimmen.',
      bild: ['opa:froh:erklaeren', 'sami:froh:stehen'], sprecher: { 'Herr Becker': 'm2', Sami: 'm3' },
      text: [
        ['Herr Becker', 'Die Rampe darf nicht zu steil sein. Der Winkel zum Boden soll 30 Grad haben.'],
        ['Sami', 'Ich lege das Geodreieck an: die Null genau auf die Ecke, die Grundlinie auf den Boden.'],
        ['Herr Becker', 'Und was liest du ab?'],
        ['Sami', '45 Grad. Das ist zu steil!'],
        ['Herr Becker', 'Dann machen wir die Rampe länger. Miss noch einmal.'],
        ['Sami', 'Jetzt sind es 30 Grad. Ein spitzer Winkel – perfekt.'],
        ['Herr Becker', 'Und die Stütze hinten steht genau senkrecht: 90 Grad.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Beim Messen kommt die Null des Geodreiecks … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['genau auf den Scheitel (die Ecke)', 'irgendwo auf die Linie'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['Messung', 'Winkel', 'Art'], breiten: [40, 30, 30], zeilen: [['1. Versuch', '[45°]', '[spitz – zu steil]'], ['2. Versuch', '[30°]', '[spitz – richtig]'], ['Stütze hinten', '[90°]', '[recht]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Zeichne einen Winkel (geheim). Dein Partner oder deine Partnerin schätzt ihn und misst ihn dann. Wer schätzt am besten?', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Ich schätze ungefähr … Grad.', 'Gemessen: … Grad.', 'Das ist ein … Winkel.'] }] }],
    },
    ueben: [{ art: 'frei', auftrag: 'Zeichne mit dem Geodreieck: einen Winkel von 40°, einen von 90° und einen von 120°.', stufe: 2, html: zeichenfeld(55) }],
    erklaeren: { auftrag: 'Erkläre in drei Schritten, wie man einen Winkel von 50° zeichnet.', anfaenge: ['1. Ich zeichne …', '2. Ich lege …', '3. Ich verbinde …'] },
  },
  // 15 Höhe im Dreieck
  {
    fr: 'Je construis la hauteur d’un triangle relative à une base.',
    bild: ['finn:froh:zeigen', 'mia:froh:stehen'],
    erklBild: dreieckHoehe(),
    hoeren: {
      was: 'Das Zelt im Zeltlager', wo: 'Zeltlager · Zelt aufbauen', titel: 'Wie hoch ist das Zelt?',
      situation: 'Finn und Mia bauen ein Zelt auf. Von vorne sieht es aus wie ein Dreieck.',
      bild: ['finn:froh:zeigen', 'mia:froh:stehen'], sprecher: { Finn: 'm3', Mia: 'w2' },
      text: [
        ['Finn', 'Von vorne ist unser Zelt ein Dreieck. Der Boden ist die Grundseite: 2 Meter breit.'],
        ['Mia', 'Und wie hoch ist es?'],
        ['Finn', 'Ich messe von der Spitze genau senkrecht nach unten bis zum Boden. Das ist die Höhe: 1,5 Meter.'],
        ['Mia', 'Senkrecht heißt: im rechten Winkel zum Boden, oder?'],
        ['Finn', 'Genau. Nicht schräg an der Zeltwand entlang – die ist länger, 1,8 Meter.'],
        ['Mia', 'Dann passe ich gerade so hinein: Ich bin 1,48 Meter groß!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Die Höhe steht auf der Grundseite … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['im rechten Winkel (senkrecht)', 'schräg'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Länge'], breiten: [60, 40], zeilen: [['Grundseite (Boden)', '[2 m]'], ['Höhe (senkrecht)', '[1,5 m]'], ['schräge Zeltwand', '[1,8 m]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Zeichnet ein großes Dreieck auf ein Blatt. Zeichnet mit dem Geodreieck die Höhe ein. Erklärt einander jeden Schritt.', stufe: 3, karten: [
        { titel: 'Wörter', text: ['Grundseite, Spitze', 'senkrecht, rechter Winkel', 'Höhe, Lot'] }] }],
    },
    ueben: [{ art: 'frei', auftrag: 'Zeichne ein Dreieck mit der Grundseite 8 cm. Konstruiere die Höhe und miss sie.', stufe: 2, html: zeichenfeld(60) }],
    erklaeren: { auftrag: 'Warum ist die Höhe meistens kürzer als die schrägen Seiten? Erkläre.', anfaenge: ['Die Höhe ist der kürzeste Weg …', 'Die schräge Seite …'] },
  },
  // 16 Flächeninhalt Dreieck
  {
    fr: 'Je calcule l’aire d’un triangle avec la formule (base · hauteur) ÷ 2.',
    bild: ['nele:froh:blatt', 'lehrerin:froh:erklaeren'],
    erklBild: dreieckHoehe({ g: '6 cm', h: '4 cm' }),
    hoeren: {
      was: 'Eine Wimpelkette basteln', wo: 'Kunstraum · Deko für das Schulfest', titel: 'Wie viel Stoff?',
      situation: 'Nele bastelt eine Wimpelkette aus Stoff. Jeder Wimpel ist ein Dreieck.',
      bild: ['lehrerin:froh:erklaeren', 'nele:froh:blatt'], sprecher: { 'Frau Sommer': 'w1', Nele: 'w3' },
      text: [
        ['Frau Sommer', 'Ein Wimpel ist ein Dreieck: Die Grundseite oben ist 20 Zentimeter, die Höhe 30 Zentimeter.'],
        ['Nele', 'Grundseite mal Höhe geteilt durch 2: 20 mal 30 sind 600, geteilt durch 2 sind 300 Quadratzentimeter.'],
        ['Frau Sommer', 'Richtig. Wir brauchen 10 Wimpel.'],
        ['Nele', '10 mal 300 … das sind 3.000 Quadratzentimeter Stoff.'],
        ['Frau Sommer', 'Unser Stoffstück ist 100 Zentimeter mal 60 Zentimeter.'],
        ['Nele', 'Das sind 6.000 Quadratzentimeter. Das reicht sicher – auch wenn beim Schneiden Reste bleiben.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Die Fläche eines Dreiecks ist … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['(g · h) ÷ 2', 'g + h', 'g · h · 2'], r: 0 }] }],
      beim: [{ art: 'rechnen', auftrag: 'Hör zu und rechne.', stufe: 2, items: [{ a: 'Ein Wimpel: (20 cm · 30 cm) ÷ 2 = ?', l: '300 cm²', raum: 2 }, { a: '10 Wimpel = ?', l: '3.000 cm²', raum: 2 }, { a: 'Stoffstück: 100 cm · 60 cm = ?', l: '6.000 cm² – das reicht', raum: 2 }] }],
      nach: [{ art: 'sprechen', auftrag: 'Schneidet ein Rechteck aus Papier diagonal durch. Was fällt euch auf? Erklärt die Formel mit dem Papier.', stufe: 3, karten: [
        { titel: 'Sätze', text: ['Zwei gleiche Dreiecke ergeben ein Rechteck.', 'Darum teilt man durch 2.'] }] }],
    },
    erklaeren: { auftrag: 'Warum teilt man bei der Dreiecksfläche durch 2? Erkläre mit einer Zeichnung oder mit Worten.', anfaenge: ['Ein Dreieck ist die Hälfte von …', 'Darum …'], zeilen: 6 },
  },
]

export const LEKTIONEN = matheLektionen(4, EXTRAS)

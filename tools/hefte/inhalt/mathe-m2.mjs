// Mathematik · Modul 2 „Dezimalzahlen, Größen und Geometrie“ (Voie de préparation) – multimodales Modulheft.
// Lektionen, Erklärungen und Übungen: aus dem Mathe-Programm (CNES-Referenzrahmen „Mathématiques – voie préparatoire“).
// Neu hier: Hörszenen aus dem Alltag, Bilder, Schreibaufträge „Erklären“. Personen, Preise und Zahlen: ausgedacht.

import { matheModul, matheLektionen } from './mathe-gemeinsam.mjs'
import { dezimaltafel, bruchstreifen, kreisBruch, linienarten, winkelarten, umfangFiguren, treppe } from './mathe-bilder.mjs'

export const MODUL = matheModul(2, {
  titelFr: 'Nombres décimaux, grandeurs et géométrie',
  unterFr: 'Les nombres à virgule, les premières fractions, la capacité et la masse, le point, la droite, le segment, les angles et le périmètre.',
  deckbild: ['lea:froh:rad', 'finn:froh:stehen-zeigen', 'amira:froh:tasse'],
  blasen: [{ t: '3,45 €', x: 18, y: 112 }, { t: 'Ein Viertel für dich!', x: 108, y: 98 }, { t: '90°', x: 168, y: 150 }],
  themenIcons: ['decimal', 'chart-pie', 'scale', 'line', 'angle'],
})

const zeichenfeld = (h = 60) => `<div style="border:0.6mm dashed var(--f);border-radius:3mm;height:${h}mm"></div>`

const EXTRAS = [
  // 1 Zehntel und Hundertstel
  {
    fr: 'Je lis et j’écris les nombres décimaux et je connais les dixièmes et les centièmes.',
    bild: ['lea:froh:stehen', 'lehrer:froh:erklaeren'],
    erklBild: dezimaltafel([['3,45', '3,45'], ['0,05', '0,05'], ['12,7', '12,7']]),
    hoeren: {
      was: 'Beim Sportfest', wo: 'Sportplatz · 60-Meter-Lauf', titel: '8,45 Sekunden!',
      situation: 'Herr Kuedes stoppt die Zeiten beim 60-Meter-Lauf. Er ruft sie laut. Schreib mit!',
      bild: ['lehrer:froh:erklaeren', 'lea:froh:stehen'], sprecher: { 'Herr Kuedes': 'm1', Lea: 'w2', Finn: 'm3' },
      text: [
        ['Herr Kuedes', 'Lea, deine Zeit: 8 Komma 45 Sekunden.'],
        ['Lea', 'Also 8 Sekunden, 4 Zehntel und 5 Hundertstel?'],
        ['Herr Kuedes', 'Genau. Finn, du hast 9 Komma 3 Sekunden.'],
        ['Finn', 'Das sind 9 Sekunden und 3 Zehntel.'],
        ['Herr Kuedes', 'Richtig. Amira hat 8 Komma 07 Sekunden. Achtung: Die Null steht bei den Zehnteln!'],
        ['Lea', 'Also 8 Sekunden und 7 Hundertstel. Wow, sie ist schnell!'],
        ['Herr Kuedes', 'Und Noah hat genau 10 Sekunden. Das kann man auch so schreiben: 10 Komma 00.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Ein Zehntel ist … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['0,1', '0,01', '10'], r: 0 }] }],
      beim: [{ art: 'frei', auftrag: 'Hör zu. Trage die Zeiten (in Sekunden) in die Stellenwerttafel ein.', stufe: 1, html: dezimaltafel([['Lea', '8,45'], ['Finn', '9,3'], ['Amira', '8,07'], ['Noah', '10,00']], { leer: true, ganz: ['Z', 'E'], teile: ['z', 'h'] }) }],
      nach: [{ art: 'sprechen', auftrag: 'Stoppt mit dem Handy 10 Sekunden – ohne hinzuschauen! Wer kommt am nächsten an 10,00 Sekunden? Lest eure Zeiten laut vor.', stufe: 2, karten: [
        { titel: 'So liest du', text: ['9,87 → neun Komma acht sieben', '10,05 → zehn Komma null fünf', 'Die 8 sind 8 Zehntel.'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre den Unterschied zwischen 0,5 und 0,05. Denke an Zehntel und Hundertstel.', anfaenge: ['In 0,5 steht die 5 bei den …', 'In 0,05 steht die 5 bei den …', 'Also ist …'] },
  },
  // 2 Vergleichen und ordnen
  {
    fr: 'Je compare et je range des nombres décimaux.',
    bild: ['finn:verwirrt:stehen', 'mia:froh:erklaeren'],
    hoeren: {
      was: 'Beim Weitsprung', wo: 'Sportfest · Sandgrube', titel: 'Wer springt am weitesten?',
      situation: 'Mia und Finn schauen auf die Ergebnisliste vom Weitsprung. Finn ist sich nicht sicher.',
      bild: ['finn:verwirrt:stehen', 'mia:froh:erklaeren'], sprecher: { Finn: 'm3', Mia: 'w2' },
      text: [
        ['Finn', 'Schau mal: Ben ist 3,45 Meter gesprungen, Jana 3,5 Meter. Ben hat gewonnen, oder? 45 ist doch mehr als 5!'],
        ['Mia', 'Nein, Achtung! Du musst Stelle für Stelle vergleichen. Die Meter sind gleich: 3 und 3.'],
        ['Finn', 'Und dann die Zehntel?'],
        ['Mia', 'Genau. Bei Ben 4 Zehntel, bei Jana 5 Zehntel. Also ist Jana weiter gesprungen.'],
        ['Finn', 'Ah, jetzt verstehe ich: 3,5 ist das Gleiche wie 3,50. Und 3,50 ist mehr als 3,45.'],
        ['Mia', 'Richtig. Und Sami ist 3,09 Meter gesprungen, Nele 3,4 Meter.'],
        ['Finn', 'Dann ist Sami Letzter, denn er hat 0 Zehntel. Und Nele hat 3,40 – das ist weniger als Ben.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Welche Zahl ist größer? Kreuze an.', stufe: 1, fragen: [{ f: '0,4 oder 0,25?', o: ['0,4', '0,25'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und schreibe die Weiten auf.', stufe: 1, kopf: ['Name', 'Weite (m)'], breiten: [50, 50], zeilen: [['Ben', '[3,45]'], ['Jana', '[3,5]'], ['Sami', '[3,09]'], ['Nele', '[3,4]']] },
        { art: 'ordnen', auftrag: 'Die Siegerliste: Wer ist auf Platz 1, 2, 3, 4?', stufe: 2, teile: ['Jana (3,50 m)', 'Ben (3,45 m)', 'Nele (3,40 m)', 'Sami (3,09 m)'], ordnung: [2, 0, 3, 1] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Messt in der Klasse eure Handspanne in Metern (zum Beispiel 0,18 m). Ordnet euch von der kleinsten zur größten Spanne.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Meine Spanne ist 0,19 Meter.', '0,19 ist größer als 0,17, weil …', 'Die Zehntel sind gleich, also …'] }] }],
    },
    erklaeren: { auftrag: 'Finn sagt: „3,45 ist größer als 3,5, weil 45 mehr ist als 5.“ Erkläre ihm seinen Fehler.', anfaenge: ['Finn, du musst …', '3,5 ist dasselbe wie …', 'Also ist …'] },
  },
  // 3 Addieren und subtrahieren
  {
    fr: 'J’additionne et je soustrais des nombres décimaux.',
    bild: ['amira:froh:stehen-zeigen', 'ben:froh:gehen'],
    hoeren: {
      was: 'Der Staffellauf', wo: 'Stadion · Staffel 4 mal 100 Meter', titel: 'Fast ein Rekord!',
      situation: 'Die Klasse läuft eine Staffel. Amira rechnet die Zeiten der vier Läufer zusammen.',
      bild: ['amira:froh:stehen-zeigen', 'ben:froh:gehen'], sprecher: { Amira: 'w2', Ben: 'm3' },
      text: [
        ['Ben', 'Wie schnell waren wir? Sag mal die Zeiten!'],
        ['Amira', 'Du bist in 15,2 Sekunden gelaufen. Lea in 14,85 Sekunden. Finn in 16,1 Sekunden und Jana in 14,6 Sekunden.'],
        ['Ben', 'Und zusammen?'],
        ['Amira', 'Ich schreibe Komma unter Komma: 15,20 plus 14,85 plus 16,10 plus 14,60. Das sind 60,75 Sekunden.'],
        ['Ben', 'Der Schulrekord ist 58,9 Sekunden. Wie viel fehlt uns?'],
        ['Amira', '60,75 minus 58,90 … uns fehlen 1,85 Sekunden.'],
        ['Ben', 'Nicht schlecht! Nächstes Jahr schaffen wir den Rekord.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Beim schriftlichen Rechnen mit Dezimalzahlen schreibst du … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Komma unter Komma', 'die letzte Ziffer untereinander'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Notiere die Zeiten.', stufe: 1, kopf: ['Läufer', 'Zeit (s)'], breiten: [50, 50], zeilen: [['Ben', '[15,2]'], ['Lea', '[14,85]'], ['Finn', '[16,1]'], ['Jana', '[14,6]']] },
        { art: 'rechnen', auftrag: 'Rechne schriftlich nach.', stufe: 2, items: [{ a: 'Gesamtzeit: 15,2 + 14,85 + 16,1 + 14,6 = ?', l: '60,75 s', raum: 4 }, { a: 'Unterschied zum Rekord: 60,75 − 58,9 = ?', l: '1,85 s', raum: 4 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Kauft im Klassen-Kiosk ein: Eine Person nennt drei Preise, die andere rechnet die Summe und das Rückgeld von 10 €.', stufe: 2, karten: [
        { titel: 'Preise', text: ['Wasser: 0,85 €', 'Brötchen: 1,40 €', 'Apfel: 0,60 €', 'Müsliriegel: 1,25 €', 'Saft: 1,75 €'] }] }],
    },
    erklaeren: { auftrag: 'Warum schreibt man bei 3,5 − 1,25 zuerst 3,50? Erkläre.', anfaenge: ['3,5 und 3,50 sind …', 'So haben beide Zahlen …', 'Dann kann ich …'] },
  },
  // 4 Mal und geteilt durch 10, 100, 1000
  {
    fr: 'Je multiplie et je divise des nombres décimaux par 10, 100 et 1 000.',
    bild: ['nele:froh:laptop', 'lehrerin:froh:erklaeren'],
    hoeren: {
      was: 'Bestellung im Sekretariat', wo: 'Sekretariat · Schulmaterial bestellen', titel: 'Hundert Hefte, bitte!',
      situation: 'Nele hilft im Sekretariat. Frau Kiesser bestellt Material für die ganze Schule.',
      bild: ['lehrerin:froh:erklaeren', 'nele:froh:laptop'], sprecher: { 'Frau Kiesser': 'w1', Nele: 'w3' },
      text: [
        ['Frau Kiesser', 'Ein Heft kostet 1,25 Euro. Wir brauchen 10 Hefte für die Klasse 7P2.'],
        ['Nele', '1,25 mal 10 … das Komma rutscht eine Stelle nach rechts: 12,50 Euro.'],
        ['Frau Kiesser', 'Sehr gut. Und für die ganze Schule brauchen wir 100 Hefte.'],
        ['Nele', 'Dann rutscht das Komma zwei Stellen: 125 Euro.'],
        ['Frau Kiesser', 'Ein Paket Papier mit 1.000 Blatt kostet 4,80 Euro. Wie viel kostet ein Blatt?'],
        ['Nele', '4,80 geteilt durch 1.000 … das Komma rutscht drei Stellen nach links: 0,0048 Euro. Das ist weniger als ein Cent!'],
        ['Frau Kiesser', 'Genau. Papier ist billig – aber wir sparen trotzdem.'],
      ],
      vor: [{ art: 'mc', auftrag: '3,5 · 10 = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['3,50', '35', '350'], r: 1 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['10 Hefte: 1,25 € · 10 = [12,50] €', '100 Hefte: 1,25 € · 100 = [125] €', '1 Blatt Papier: 4,80 € ÷ 1.000 = [0,0048] €'] }],
      nach: [{ art: 'sprechen', auftrag: 'Komma-Spiel: Eine Person nennt eine Dezimalzahl und „mal 10“, „mal 100“ oder „geteilt durch 10“. Die anderen sagen das Ergebnis.', stufe: 1, karten: [
        { titel: 'Regel', text: ['mal → Komma nach rechts', 'geteilt → Komma nach links', '10 → 1 Stelle · 100 → 2 · 1.000 → 3'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre mit eigenen Worten, wie du 7 ÷ 100 rechnest.', anfaenge: ['7 ist dasselbe wie 7,0 …', 'Bei ÷ 100 rutscht das Komma …', 'Ergebnis: …'] },
  },
  // 5 Hälfte, Drittel, Viertel
  {
    fr: 'Je reconnais la moitié, le tiers et le quart comme des parts égales.',
    bild: ['sami:froh:tasse', 'chloe:froh:stehen'],
    erklBild: `<div style="display:flex;gap:8mm;justify-content:center;align-items:end">${kreisBruch(2, 1)}${kreisBruch(3, 1)}${kreisBruch(4, 1)}</div><div style="display:flex;gap:8mm;justify-content:center;font-family:Lexend;font-weight:700;margin-top:1mm"><span style="width:26mm;text-align:center">eine Hälfte</span><span style="width:26mm;text-align:center">ein Drittel</span><span style="width:26mm;text-align:center">ein Viertel</span></div>`,
    hoeren: {
      was: 'Eine Geburtstagsparty', wo: 'Bei Sami · Geburtstagsfeier', titel: 'Jeder ein Viertel!',
      situation: 'Bei Samis Geburtstagsfeier wird Essen geteilt. Alle sollen gleich viel bekommen.',
      bild: ['sami:froh:tasse', 'chloe:froh:stehen'], sprecher: { Sami: 'm3', Chloe: 'w2' },
      text: [
        ['Sami', 'Die Pizza ist da! Wir sind vier. Ich schneide sie in vier gleiche Stücke.'],
        ['Chloe', 'Dann bekommt jeder ein Viertel.'],
        ['Sami', 'Und den Kuchen teilen wir zu dritt, Noah isst keinen Kuchen.'],
        ['Chloe', 'Drei gleiche Stücke – also bekommt jeder ein Drittel.'],
        ['Sami', 'Und die Tafel Schokolade? Die teilen wir zwei.'],
        ['Chloe', 'Dann bekommt jeder die Hälfte. Aber Achtung: Die Stücke müssen gleich groß sein, sonst ist es kein Viertel!'],
        ['Sami', 'Stimmt. Ein Viertel ist nicht einfach „ein Stück“, sondern ein Stück von vier gleichen Stücken.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Ein Ganzes hat … Viertel. Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['2', '3', '4'], r: 2 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Wie wird geteilt?', stufe: 1, kopf: ['Essen', 'Wie viele Personen?', 'Jeder bekommt …'], breiten: [28, 32, 40], zeilen: [['Pizza', '[4]', '[ein Viertel]'], ['Kuchen', '[3]', '[ein Drittel]'], ['Schokolade', '[2]', '[die Hälfte]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Faltet ein Blatt Papier: Wie bekommt ihr Hälften? Viertel? Achtel? Zeigt und erklärt.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Ich falte einmal: zwei Hälften.', 'Ich falte zweimal: vier Viertel.', 'Die Teile sind gleich groß.'] }] }],
    },
    ueben: [{ art: 'frei', auftrag: 'Male an: links die Hälfte, in der Mitte ein Drittel, rechts drei Viertel.', stufe: 1, html: `<div style="display:flex;gap:10mm;justify-content:center">${kreisBruch(2, 0, 30)}${kreisBruch(3, 0, 30)}${kreisBruch(4, 0, 30)}</div>` }],
    erklaeren: { auftrag: 'Leo schneidet eine Pizza in vier Stücke: ein großes und drei kleine. Ist das große Stück ein Viertel? Erkläre.', anfaenge: ['Nein, denn …', 'Ein Viertel ist …'] },
  },
  // 6 Bruchteil einer Menge
  {
    fr: 'Je calcule la fraction d’une quantité.',
    bild: ['yusuf:froh:blatt', 'lehrerin:froh:zeigen'],
    erklBild: `${bruchstreifen(3, 1, { text: 'ein Drittel von 12 = 4' })}<div style="height:2mm"></div>${bruchstreifen(3, 2, { text: 'zwei Drittel von 12 = 8' })}`,
    hoeren: {
      was: 'Eine Umfrage in der Klasse', wo: 'Klasse 7P2 · Morgenkreis', titel: 'Wie kommst du zur Schule?',
      situation: 'Yusuf hat eine Umfrage gemacht: Wie kommen die 24 Schüler der Klasse zur Schule?',
      bild: ['yusuf:froh:blatt', 'lehrerin:froh:zeigen'], sprecher: { Yusuf: 'm1', 'Frau Kremer': 'w1' },
      text: [
        ['Yusuf', 'In unserer Klasse sind 24 Schüler. Ein Drittel kommt mit dem Bus.'],
        ['Frau Kremer', 'Wie viele Schüler sind das?'],
        ['Yusuf', '24 geteilt durch 3 … das sind 8 Schüler.'],
        ['Frau Kremer', 'Richtig. Und wer kommt zu Fuß?'],
        ['Yusuf', 'Ein Viertel kommt zu Fuß. 24 geteilt durch 4 sind 6 Schüler.'],
        ['Frau Kremer', 'Und mit dem Fahrrad?'],
        ['Yusuf', 'Ein Sechstel, also 4 Schüler. Und die anderen 6 kommen mit dem Auto.'],
        ['Frau Kremer', 'Prüfen wir: 8 plus 6 plus 4 plus 6 … das sind 24. Perfekt!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Ein Drittel von 12 ist … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['3', '4', '36'], r: 1 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und rechne.', stufe: 1, kopf: ['Weg zur Schule', 'Bruchteil', 'Rechnung', 'Schüler'], breiten: [26, 22, 30, 22], zeilen: [['Bus', '[ein Drittel]', '[24 ÷ 3]', '[8]'], ['zu Fuß', '[ein Viertel]', '[24 ÷ 4]', '[6]'], ['Fahrrad', '[ein Sechstel]', '[24 ÷ 6]', '[4]'], ['Auto', '–', '[24 − 8 − 6 − 4]', '[6]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Macht eine kleine Umfrage in der Gruppe (zum Beispiel: Lieblingsfarbe). Sagt das Ergebnis mit Brüchen: „Die Hälfte mag …“.', stufe: 3, karten: [
        { titel: 'Sätze', text: ['Von 8 Personen mögen 4 Blau: das ist die Hälfte.', '2 von 8 sind ein Viertel.'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre in zwei Schritten, wie du drei Viertel von 20 berechnest.', anfaenge: ['Zuerst teile ich …', 'Dann nehme ich …', 'Ergebnis: …'] },
  },
  // 7 Kapazität
  {
    fr: 'Je connais l, dl, cl et ml et je les convertis.',
    bild: ['ben:froh:tasse', 'lehrer:froh:erklaeren'],
    erklBild: treppe(['l', 'dl', 'cl', 'ml'], ['· 10', '· 10', '· 10']),
    hoeren: {
      was: 'Vorbereitung für das Sportfest', wo: 'Lehrerzimmer · vor dem Sportfest', titel: 'Wie viel Wasser brauchen wir?',
      situation: 'Ben und Herr Mesenberg planen die Getränke für das Sportfest.',
      bild: ['lehrer:froh:erklaeren', 'ben:froh:tasse'], sprecher: { 'Herr Mesenberg': 'm1', Ben: 'm3' },
      text: [
        ['Herr Mesenberg', 'Beim Sportfest sind 30 Schüler. Jeder soll mindestens 5 Deziliter Wasser trinken.'],
        ['Ben', '30 mal 5 Deziliter sind 150 Deziliter.'],
        ['Herr Mesenberg', 'Und wie viele Liter sind das?'],
        ['Ben', '10 Deziliter sind 1 Liter. Also sind 150 Deziliter 15 Liter.'],
        ['Herr Mesenberg', 'Eine Flasche hat 1,5 Liter. Wie viele Flaschen kaufen wir?'],
        ['Ben', '15 geteilt durch 1,5 … das sind 10 Flaschen.'],
        ['Herr Mesenberg', 'Super. Und für den Saft: Ein Becher hat 20 Zentiliter. Wie viele Milliliter sind das?'],
        ['Ben', '1 Zentiliter sind 10 Milliliter, also 200 Milliliter.'],
      ],
      vor: [{ art: 'mc', auftrag: '1 l = … dl. Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['10', '100', '1.000'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['30 Schüler · 5 dl = [150] dl', '150 dl = [15] l', '15 l ÷ 1,5 l = [10] Flaschen', 'Ein Becher: 20 cl = [200] ml'] }],
      nach: [{ art: 'sprechen', auftrag: 'Schätzt: Wie viel passt in eine Tasse, einen Eimer, eine Badewanne, einen Löffel? Nennt die passende Einheit.', stufe: 2, karten: [
        { titel: 'Einheiten', text: ['ml – ein Löffel', 'dl – ein Glas', 'l – eine Flasche, ein Eimer'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre: Warum ist 2 l mehr als 150 cl?', anfaenge: ['Ich rechne alles in … um.', '2 l = …', 'Also …'] },
  },
  // 8 Masse
  {
    fr: 'Je connais t, kg et g et je les convertis.',
    bild: ['mia:froh:stehen', 'verkaeuferin:froh:erklaeren'],
    hoeren: {
      was: 'Bei der Post', wo: 'Postschalter · ein Paket verschicken', titel: 'Unter 2 Kilogramm?',
      situation: 'Mia schickt ein Paket an ihre Brieffreundin. Ein Paket bis 2 kg ist günstiger.',
      bild: ['verkaeuferin:froh:erklaeren', 'mia:froh:stehen'], sprecher: { Postangestellte: 'w1', Mia: 'w2' },
      text: [
        ['Mia', 'Guten Tag! Ich möchte dieses Paket verschicken. Was kostet das?'],
        ['Postangestellte', 'Bis 2 Kilogramm kostet es 6 Euro, darüber 9 Euro. Was ist drin?'],
        ['Mia', 'Ein Buch mit 450 Gramm, ein Pullover mit 600 Gramm und Schokolade mit 300 Gramm.'],
        ['Postangestellte', 'Und der Karton wiegt 250 Gramm. Ich lege es auf die Waage …'],
        ['Mia', '450 plus 600 plus 300 plus 250 … das sind 1.600 Gramm.'],
        ['Postangestellte', 'Richtig: 1,6 Kilogramm. Das ist unter 2 Kilogramm, also 6 Euro.'],
        ['Mia', 'Dann passen sogar noch 400 Gramm hinein. Schade, dass ich keine Kekse dabeihabe!'],
      ],
      vor: [{ art: 'mc', auftrag: '1 kg = … g. Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['100', '1.000', '10.000'], r: 1 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was ist im Paket?', stufe: 1, kopf: ['Inhalt', 'Gewicht'], breiten: [50, 50], zeilen: [['Buch', '[450 g]'], ['Pullover', '[600 g]'], ['Schokolade', '[300 g]'], ['Karton', '[250 g]'], ['zusammen', '[1.600 g = 1,6 kg]']] },
        { art: 'fragen', auftrag: 'Wie viel Gramm passen noch bis 2 kg?', stufe: 2, fragen: [{ f: '', l: '2.000 g − 1.600 g = 400 g' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Schätzt das Gewicht von fünf Dingen aus eurer Tasche. Wiegt sie dann (Küchenwaage) oder vergleicht in der Hand.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Ich schätze: ungefähr … g.', 'Das ist schwerer / leichter als …', '1.000 g = 1 kg'] }] }],
    },
    erklaeren: { auftrag: 'Was ist schwerer: 1 kg Federn oder 1.000 g Steine? Erkläre.', anfaenge: ['1 kg ist dasselbe wie …', 'Also …'] },
  },
  // 9 Punkt, Gerade, Halbgerade, Strecke
  {
    fr: 'Je distingue point, droite, demi-droite et segment.',
    bild: ['chloe:froh:blatt', 'lehrerin:froh:erklaeren'],
    erklBild: linienarten(),
    hoeren: {
      was: 'Ein Geometrie-Diktat', wo: 'Mathestunde · Geometrie', titel: 'Zeichne genau!',
      situation: 'Frau Sommer diktiert eine Zeichnung. Zeichne mit Lineal und spitzem Bleistift mit.',
      bild: ['lehrerin:froh:erklaeren', 'chloe:froh:blatt'], sprecher: { 'Frau Sommer': 'w1', Chloe: 'w2' },
      text: [
        ['Frau Sommer', 'Zeichnet zwei Punkte A und B. Verbindet sie mit dem Lineal: Das ist die Strecke \\[AB\\]. Sie hat einen Anfang und ein Ende.'],
        ['Chloe', 'Kann ich die Strecke messen?'],
        ['Frau Sommer', 'Ja, nur eine Strecke kann man messen. Jetzt zeichnet zwei Punkte C und D. Zeichnet eine Linie durch C und D, die auf beiden Seiten weitergeht: die Gerade (CD).'],
        ['Chloe', 'Eine Gerade hat also kein Ende.'],
        ['Frau Sommer', 'Genau. Zum Schluss zeichnet einen Punkt E. Von dort geht eine Linie durch den Punkt F und weiter, ohne Ende: die Halbgerade \\[EF).'],
        ['Chloe', 'Sie beginnt bei E, aber sie hört nie auf – wie ein Lichtstrahl!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Welche Linie kann man messen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Gerade', 'die Halbgerade', 'die Strecke'], r: 2 }] }],
      beim: [
        { art: 'frei', auftrag: 'Hör zu und zeichne: die Strecke \\[AB\\], die Gerade (CD) und die Halbgerade \\[EF).', stufe: 1, html: zeichenfeld(60) },
        { art: 'tabelle', auftrag: 'Ergänze.', stufe: 2, kopf: ['Linie', 'Anfang?', 'Ende?', 'Schreibweise'], breiten: [28, 22, 22, 28], zeilen: [['Strecke', '[ja]', '[ja]', '[[AB]]'], ['Gerade', '[nein]', '[nein]', '[(CD)]'], ['Halbgerade', '[ja]', '[nein]', '[[EF)]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Sucht im Klassenzimmer Beispiele: Was sieht aus wie eine Strecke? Was ist wie eine Halbgerade?', stufe: 2, karten: [
        { titel: 'Ideen', text: ['die Kante vom Tisch', 'ein Lichtstrahl', 'ein Lineal'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre den Unterschied zwischen einer Strecke und einer Halbgeraden.', anfaenge: ['Eine Strecke hat …', 'Eine Halbgerade hat …'] },
  },
  // 10 Strecken messen und Mittelpunkt
  {
    fr: 'Je mesure des segments avec précision et je trouve le milieu.',
    bild: ['opa:froh:erklaeren', 'noah:froh:stehen'],
    hoeren: {
      was: 'Ein Plakat aufhängen', wo: 'Eingangshalle · Plakat für das Schulfest', titel: 'Genau in die Mitte!',
      situation: 'Noah hilft Herrn Becker. Das Plakat soll genau in der Mitte der Wand hängen.',
      bild: ['opa:froh:erklaeren', 'noah:froh:stehen'], sprecher: { 'Herr Becker': 'm2', Noah: 'm3' },
      text: [
        ['Herr Becker', 'Die Wand ist 4 Meter 60 breit. Wo ist die Mitte?'],
        ['Noah', '4 Meter 60 sind 460 Zentimeter. Die Hälfte sind 230 Zentimeter.'],
        ['Herr Becker', 'Gut. Und das Plakat ist 84 Zentimeter breit. Wo ist seine Mitte?'],
        ['Noah', 'Bei 42 Zentimetern.'],
        ['Herr Becker', 'Dann kommt der Nagel genau bei 230 Zentimetern. Miss bitte ab der linken Ecke, mit der Null am Anfang!'],
        ['Noah', 'Okay … 230 Zentimeter. Hier!'],
        ['Herr Becker', 'Perfekt. Und der Rahmen für das kleine Bild ist 15 Zentimeter und 4 Millimeter breit. Wie viele Millimeter sind das?'],
        ['Noah', '154 Millimeter. Die Mitte ist dann bei 77 Millimetern.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Beim Messen legst du das Lineal … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['mit der 0 am Anfang an', 'mit der 1 am Anfang an'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Länge', 'Mitte bei …'], breiten: [30, 36, 34], zeilen: [['Wand', '[4 m 60 cm = 460 cm]', '[230 cm]'], ['Plakat', '[84 cm]', '[42 cm]'], ['kleiner Rahmen', '[15 cm 4 mm = 154 mm]', '[77 mm]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Messt drei Dinge auf eurem Tisch genau in cm und mm (Heft, Bleistift, Radiergummi). Findet jeweils die Mitte.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Das Heft ist 29 cm 7 mm lang.', 'Das sind 297 mm.', 'Die Mitte ist bei …'] }] }],
    },
    ueben: [{ art: 'frei', auftrag: 'Zeichne eine Strecke \\[AB\\] mit 9 cm 4 mm. Miss und markiere den Mittelpunkt M.', stufe: 2, html: zeichenfeld(35) }],
    erklaeren: { auftrag: 'Erkläre, wie man den Mittelpunkt einer Strecke findet.', anfaenge: ['Zuerst messe ich …', 'Dann teile ich …', 'Zum Schluss …'] },
  },
  // 11 Winkel
  {
    fr: 'Je distingue les angles aigus, droits et obtus.',
    bild: ['sami:froh:rad', 'lea:froh:zeigen'],
    erklBild: winkelarten(),
    hoeren: {
      was: 'Im Skatepark', wo: 'Skatepark · nach der Schule', titel: 'Spitz, recht oder stumpf?',
      situation: 'Sami und Lea sind im Skatepark. Sie entdecken überall Winkel.',
      bild: ['sami:froh:rad', 'lea:froh:zeigen'], sprecher: { Sami: 'm3', Lea: 'w2' },
      text: [
        ['Lea', 'Schau mal auf die Uhr am Kiosk: Es ist genau 3 Uhr. Die Zeiger bilden eine Ecke wie ein Blatt Papier.'],
        ['Sami', 'Das ist ein rechter Winkel – 90 Grad.'],
        ['Lea', 'Und die kleine Rampe da? Sie ist ganz flach. Zwischen Boden und Rampe ist ein enger, spitzer Winkel.'],
        ['Sami', 'Genau, spitz – kleiner als 90 Grad.'],
        ['Lea', 'Und die Bank hat eine schräge Lehne. Zwischen Sitz und Lehne ist der Winkel weit offen.'],
        ['Sami', 'Größer als 90 Grad – das ist ein stumpfer Winkel. Darauf sitzt man bequem!'],
        ['Lea', 'Und um 1 Uhr? Dann bilden die Zeiger einen spitzen Winkel. Um 5 Uhr einen stumpfen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Ein rechter Winkel hat … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['45 Grad', '90 Grad', '180 Grad'], r: 1 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Welcher Winkel ist es? Kreuze an.', stufe: 1, kopf: ['', 'spitz', 'recht', 'stumpf'], breiten: [40, 20, 20, 20], zeilen: [['Uhr um 3 Uhr', '', '[x]', ''], ['flache Rampe', '[x]', '', ''], ['Bank mit schräger Lehne', '', '', '[x]'], ['Uhr um 1 Uhr', '[x]', '', ''], ['Uhr um 5 Uhr', '', '', '[x]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Winkel-Jagd: Sucht im Schulhaus je zwei spitze, rechte und stumpfe Winkel. Prüft mit dem Geodreieck oder einer Heftecke.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Hier ist ein rechter Winkel: …', 'Er ist enger als die Heftecke, also spitz.'] }] }],
    },
    ueben: [{ art: 'frei', auftrag: 'Wie heißen die Winkel? Schreibe spitz, recht oder stumpf.', stufe: 1, html: winkelarten({ leer: true, winkel: [120, 30, 90, 160] }) }],
    erklaeren: { auftrag: 'Wie kannst du ohne Geodreieck prüfen, ob ein Winkel spitz, recht oder stumpf ist? Erkläre.', anfaenge: ['Ich nehme die Ecke von …', 'Wenn der Winkel enger ist, …'] },
  },
  // 12 Umfang
  {
    fr: 'Je calcule le périmètre du carré, du rectangle et du triangle.',
    bild: ['opa:froh:stehen', 'amira:froh:zeigen'],
    erklBild: umfangFiguren([{ art: 'quadrat', a: '5 cm', name: 'U = 4 · 5 cm = 20 cm' }, { art: 'rechteck', a: '6 cm', b: '4 cm', name: 'U = 2 · (6 + 4) = 20 cm' }, { art: 'dreieck', a: '5 cm', b: '4 cm', c: '3 cm', name: 'U = 3 + 4 + 5 = 12 cm' }]),
    hoeren: {
      was: 'Ein Zaun für das Schulbeet', wo: 'Schulgarten · Projekt „Grüne Schule“', titel: 'Wie viel Zaun?',
      situation: 'Amira und Herr Becker bauen einen Zaun um das neue Gemüsebeet.',
      bild: ['opa:froh:stehen', 'amira:froh:zeigen'], sprecher: { 'Herr Becker': 'm2', Amira: 'w2' },
      text: [
        ['Herr Becker', 'Das Beet ist ein Rechteck: 6 Meter lang und 4 Meter breit. Wie viel Zaun brauchen wir?'],
        ['Amira', 'Einmal rundherum: 6 plus 4 plus 6 plus 4 … das sind 20 Meter.'],
        ['Herr Becker', 'Genau. Ein Meter Zaun kostet 5 Euro.'],
        ['Amira', '20 mal 5 … das macht 100 Euro.'],
        ['Herr Becker', 'Und der Sandkasten für den Kindergarten nebenan ist ein Quadrat mit 3 Meter Seitenlänge.'],
        ['Amira', '4 mal 3 Meter sind 12 Meter. Noch mal 60 Euro.'],
        ['Herr Becker', 'Super gerechnet. Dann bestelle ich 32 Meter Zaun.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Der Umfang ist … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Länge einmal rundherum', 'die Fläche innen'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und rechne.', stufe: 1, kopf: ['', 'Maße', 'Umfang', 'Preis (5 € pro m)'], breiten: [22, 28, 26, 24], zeilen: [['Beet (Rechteck)', '[6 m und 4 m]', '[20 m]', '[100 €]'], ['Sandkasten (Quadrat)', '[3 m]', '[12 m]', '[60 €]'], ['zusammen', '', '[32 m]', '[160 €]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Messt den Umfang von eurem Tisch, eurem Heft und der Tafel. Wer schätzt am besten?', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Ich schätze: … cm.', 'Gemessen: … cm.', 'U = 2 · (Länge + Breite)'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, warum man beim Quadrat einfach „4 mal die Seite“ rechnen darf.', anfaenge: ['Ein Quadrat hat …', 'Alle Seiten sind …', 'Deshalb …'] },
  },
]

export const LEKTIONEN = matheLektionen(2, EXTRAS)

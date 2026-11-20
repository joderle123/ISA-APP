// Mathematik · Modul 1 „Zahlen, Rechnen, Größen und Figuren“ (Voie de préparation) – multimodales Modulheft.
// Lektionen, Erklärungen und Übungen: aus dem Mathe-Programm (CNES-Referenzrahmen „Mathématiques – voie préparatoire“).
// Neu hier: Hörszenen aus dem Alltag (Zahlen hören und rechnen), Bilder, Schreibaufträge „Erklären“.
// Personen, Preise und Zahlen in den Hörszenen: ausgedacht.

import { matheModul, matheLektionen } from './mathe-gemeinsam.mjs'
import { stellentafel, zahlenstrahl, figuren, kreisTeile, symmetrieBuchstaben, treppe } from './mathe-bilder.mjs'

export const MODUL = matheModul(1, {
  titelFr: 'Nombres, calcul, grandeurs et figures',
  unterFr: 'Le socle : les grands nombres, les quatre opérations, les grandeurs et les figures simples.',
  deckbild: ['yusuf:froh:erklaeren', 'mia:froh:stehen-zeigen', 'noah:froh:laessig'],
  blasen: [{ t: '1.000.000!', x: 16, y: 110 }, { t: 'Wie viel kostet das?', x: 112, y: 98 }, { t: '7 · 8 = 56', x: 162, y: 150 }],
  themenIcons: ['numbers', 'calculator', 'ruler-measure', 'shape'],
})

const S = (z) => z // Lesbarkeit

const EXTRAS = [
  // 1 Stellenwerttafel
  {
    fr: 'Je lis et j’écris les nombres jusqu’à 1 000 000 et je connais la valeur de chaque chiffre.',
    bild: ['yusuf:froh:erklaeren', 'mia:ueberrascht:stehen'],
    erklBild: stellentafel([['347.025', '347025'], ['305', '305'], ['eine Million', '1000000']], { stellen: ['M', 'HT', 'ZT', 'T', 'H', 'Z', 'E'] }),
    hoeren: {
      was: 'Ein Zahlen-Quiz im Radio', wo: 'Radio · Sendung „Zahlen-Quiz“', titel: 'Das große Zahlen-Quiz',
      situation: 'Ben und Amira spielen beim Zahlen-Quiz im Radio. Hör gut zu: Es gibt große Zahlen!',
      bild: ['lehrerin:froh:erklaeren', 'ben:froh:stehen'], sprecher: { Moderatorin: 'w1', Ben: 'm3', Amira: 'w2' },
      text: [
        ['Moderatorin', 'Willkommen beim großen Zahlen-Quiz! Erste Frage an Ben: Wie viele Sekunden hat ein Tag?'],
        ['Ben', 'Ein Tag hat 86.400 Sekunden.'],
        ['Moderatorin', 'Richtig! Amira, wie viele Minuten hat eine Woche?'],
        ['Amira', 'Eine Woche hat 10.080 Minuten.'],
        ['Moderatorin', 'Super! Jetzt eine schwere Frage: Ein Stadion hat 52.307 Plätze. Wie viele Zehntausender hat diese Zahl?'],
        ['Ben', 'Fünf Zehntausender!'],
        ['Moderatorin', 'Genau. Und jetzt der Punktestand: Ben hat 98.750 Punkte. Amira hat 120.500 Punkte. Amira gewinnt!'],
        ['Amira', 'Juhu! Danke schön!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Eine Zahl mit Hunderttausendern hat … Stellen. Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['4', '5', '6'], r: 2 }] }],
      beim: [{ art: 'frei', auftrag: 'Hör zu. Trage die Zahlen in die Stellenwerttafel ein.', stufe: 1, html: stellentafel([['Sekunden an einem Tag', '86400'], ['Minuten in einer Woche', '10080'], ['Plätze im Stadion', '52307'], ['Punkte von Ben', '98750'], ['Punkte von Amira', '120500']], { leer: true }) }],
      nach: [{ art: 'sprechen', auftrag: 'Zahlen-Diktat: Sag deinem Partner oder deiner Partnerin fünf große Zahlen. Er oder sie schreibt sie in Ziffern. Dann tauscht ihr.', stufe: 2, karten: [
        { titel: 'Vorlesen', text: ['dreihundertzweitausend', 'fünfundvierzigtausendsechzig', 'eine Million'] },
        { titel: 'Prüfen', text: ['Stimmt die Zahl?', 'Wo steht die Null?', 'Wie viele Stellen?'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre: Warum ist die 7 in 347.025 mehr wert als die 7 in 75?', anfaenge: ['In 347.025 steht die 7 an der …-Stelle.', 'In 75 steht die 7 …', 'Also …'] },
  },
  // 2 Vergleichen und ordnen
  {
    fr: 'Je compare et je range les nombres jusqu’à 1 000 000.',
    bild: ['mia:froh:handy', 'noah:froh:laptop'],
    erklBild: zahlenstrahl(0, 20000, { teile: 20, zahlen: [0, 10000, 20000], marken: [{ w: 9900, t: '9.900' }, { w: 12500, t: '12.500' }] }),
    hoeren: {
      was: 'Ein Gespräch über Videos', wo: 'In der Pause · auf dem Schulhof', titel: 'Wer hat mehr Klicks?',
      situation: 'Mia und Noah haben Videos ins Netz gestellt. Sie vergleichen die Klicks.',
      bild: ['mia:froh:handy', 'noah:froh:stehen'], sprecher: { Mia: 'w2', Noah: 'm3' },
      text: [
        ['Mia', 'Schau mal, mein Skate-Video hat schon 12.450 Klicks!'],
        ['Noah', 'Nicht schlecht. Mein Koch-Video hat 12.540 Klicks.'],
        ['Mia', 'Das ist fast gleich. Wer hat mehr?'],
        ['Noah', 'Die Zehntausender und die Tausender sind gleich. Dann schauen wir auf die Hunderter: Bei dir ist es eine 4, bei mir eine 5. Also habe ich mehr!'],
        ['Mia', 'Hm. Und Linas Tanz-Video? Es hat 9.980 Klicks.'],
        ['Noah', 'Diese Zahl hat nur vier Stellen. Also ist sie die kleinste.'],
        ['Mia', 'Und das Video von der Schulband hat 102.300 Klicks!'],
        ['Noah', 'Wow, sechs Stellen! Das ist klar die größte Zahl.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Welche Zahl ist größer? Kreuze an.', stufe: 1, fragen: [{ f: '9.999 oder 10.000?', o: ['9.999', '10.000'], r: 1 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wie viele Klicks hat jedes Video?', stufe: 1, kopf: ['Video', 'Klicks'], breiten: [50, 50], zeilen: [['Skate-Video (Mia)', '[12.450]'], ['Koch-Video (Noah)', '[12.540]'], ['Tanz-Video (Lina)', '[9.980]'], ['Schulband', '[102.300]']] },
        { art: 'ordnen', auftrag: 'Ordne die Videos: von wenig Klicks (1) bis viele Klicks (4).', stufe: 2, teile: ['Tanz-Video', 'Skate-Video', 'Koch-Video', 'Schulband'], ordnung: [2, 0, 3, 1] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Schreibt jeder eine Zahl zwischen 10.000 und 99.999 auf einen Zettel. Vergleicht laut: Wer hat die größere Zahl? Warum?', stufe: 2, karten: [
        { titel: 'So vergleichst du', text: ['Meine Zahl hat … Stellen.', 'Die Zehntausender sind gleich.', 'Bei den Tausendern: 4 ist kleiner als 7.', 'Also ist … größer.'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, wie du 34.800 und 34.200 vergleichst. Benutze die Wörter „Stelle“ und „größer“.', anfaenge: ['Beide Zahlen haben …', 'Ich vergleiche von links: …', 'Bei den Hundertern …'] },
  },
  // 3 Runden
  {
    fr: 'J’arrondis les nombres à la dizaine, à la centaine et au millier.',
    bild: ['jana:froh:laptop', 'lehrerin:froh:erklaeren'],
    erklBild: zahlenstrahl(40, 50, { teile: 10, zahlen: [40, 45, 50], marken: [{ w: 47, t: '47 → 50' }] }),
    hoeren: {
      was: 'Ein Artikel für die Schülerzeitung', wo: 'Redaktion der Schülerzeitung', titel: 'Rund 9.000 Euro!',
      situation: 'Jana schreibt einen Artikel über den Stadtlauf. Frau Sommer hilft ihr beim Runden.',
      bild: ['jana:froh:laptop', 'lehrerin:froh:erklaeren'], sprecher: { Jana: 'w2', 'Frau Sommer': 'w1' },
      text: [
        ['Jana', 'Frau Sommer, beim Stadtlauf waren genau 3.487 Läufer. Soll ich das so in den Artikel schreiben?'],
        ['Frau Sommer', 'In einem Artikel rundet man oft. Runde auf Hunderter.'],
        ['Jana', 'Die Zehnerziffer ist eine 8, also runde ich auf: ungefähr 3.500 Läufer.'],
        ['Frau Sommer', 'Sehr gut. Und die Zuschauer?'],
        ['Jana', 'Es waren 12.360 Zuschauer. Auf Tausender gerundet sind das ungefähr 12.000.'],
        ['Frau Sommer', 'Richtig, denn die Hunderterziffer ist eine 3. Und das gesammelte Geld für das Tierheim?'],
        ['Jana', '8.950 Euro. Auf Tausender gerundet: 9.000 Euro!'],
        ['Frau Sommer', 'Perfekt. Dann schreib als Titel: „Rund 9.000 Euro für das Tierheim“.'],
      ],
      vor: [{ art: 'mc', auftrag: '„Rund 50 Euro“ heißt … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['genau 50 Euro', 'ungefähr 50 Euro'], r: 1 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'genaue Zahl', 'gerundet auf', 'gerundete Zahl'], breiten: [28, 24, 22, 26], zeilen: [['Läufer', '[3.487]', 'Hunderter', '[3.500]'], ['Zuschauer', '[12.360]', 'Tausender', '[12.000]'], ['Geld (Euro)', '[8.950]', 'Tausender', '[9.000]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Sucht in einer Zeitung oder im Internet drei große Zahlen. Rundet sie und sagt sie der Klasse: „Ungefähr …“.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Genau sind es …', 'Auf Hunderter gerundet: ungefähr …', 'Die Ziffer rechts ist …, also runde ich auf / ab.'] }] }],
    },
    erklaeren: { auftrag: 'Jana schreibt: „3.487 Läufer ≈ 3.400“. Was hat sie falsch gemacht? Erkläre.', anfaenge: ['Die Ziffer rechts von der Hunderterstelle ist …', 'Bei 5, 6, 7, 8, 9 …', 'Richtig ist …'] },
  },
  // 4 Vorgänger, Nachfolger, Folgen
  {
    fr: 'Je trouve le prédécesseur et le successeur et je continue des suites de nombres.',
    bild: ['finn:froh:stehen', 'lehrer:froh:erklaeren'],
    hoeren: {
      was: 'Am Start eines Laufs', wo: 'Stadtlauf · Startbereich', titel: 'Startnummer 1.099',
      situation: 'Finn holt seine Startnummer für den Stadtlauf ab. Ein Helfer erklärt ihm alles.',
      bild: ['lehrer:froh:erklaeren', 'finn:froh:stehen'], sprecher: { Helfer: 'm1', Finn: 'm3' },
      text: [
        ['Helfer', 'Hallo! Welche Startnummer hast du?'],
        ['Finn', 'Die 1.099.'],
        ['Helfer', 'Gut. Deine Freundin hat die Nummer direkt danach, also den Nachfolger.'],
        ['Finn', 'Das ist die 1.100!'],
        ['Helfer', 'Genau. Die Gruppen starten nacheinander. Die erste Gruppe startet um 10 Uhr, dann kommt alle 15 Minuten eine neue Gruppe: 10 Uhr, 10 Uhr 15, 10 Uhr 30 …'],
        ['Finn', 'Dann startet die fünfte Gruppe um 11 Uhr.'],
        ['Helfer', 'Richtig! Und beim Ziel gibt es Punkte für die Klassenwertung: Platz 3 bekommt 100 Punkte, Platz 2 bekommt 200 Punkte und Platz 1 bekommt 400 Punkte. Immer das Doppelte!'],
        ['Finn', 'Dann sollte es für einen Rekord 800 Punkte geben!'],
        ['Helfer', 'Ha, gute Idee! Viel Glück!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Der Nachfolger von 99 ist … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['98', '100', '990'], r: 1 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['Finns Startnummer: [1.099]. Der Nachfolger: [1.100].', 'Startzeiten: 10:00 – 10:15 – [10:30] – [10:45] – [11:00]. Regel: [+ 15 Minuten]', 'Punkte: 100 – 200 – 400 – [800]. Regel: [· 2]'] }],
      nach: [{ art: 'sprechen', auftrag: 'Zahlenfolgen-Spiel: Eine Person sagt drei Zahlen einer Folge. Die anderen finden die Regel und sagen die nächste Zahl.', stufe: 2, karten: [
        { titel: 'Beispiele', text: ['5, 10, 15 …', '1.000, 2.000, 3.000 …', '2, 4, 8 …'] },
        { titel: 'Sätze', text: ['Die Regel ist: immer plus …', 'Die nächste Zahl ist …'] }] }],
    },
    erklaeren: { auftrag: 'Erfinde eine eigene Zahlenfolge mit fünf Zahlen. Schreibe die Regel dazu.', anfaenge: ['Meine Folge: …', 'Die Regel ist: …'] },
  },
  // 5 Kopfrechnen
  {
    fr: 'J’additionne et je soustrais de tête jusqu’à 1 000.',
    bild: ['yusuf:froh:zeigen-hoch', 'lea:nervoes:stehen'],
    hoeren: {
      was: 'Ein Quiz in der Klasse', wo: 'Klassenzimmer · Quizstunde', titel: 'Team Rot gegen Team Blau',
      situation: 'Frau Kremer macht ein Quiz. Die Teams sammeln Punkte. Rechne im Kopf mit!',
      bild: ['lehrerin:froh:erklaeren', 'yusuf:froh:zeigen-hoch'], sprecher: { 'Frau Kremer': 'w1', Yusuf: 'm1', Lea: 'w2' },
      text: [
        ['Frau Kremer', 'Zwischenstand: Team Rot hat 340 Punkte, Team Blau hat 290 Punkte. Die nächste Frage ist 150 Punkte wert: Was ist die Hauptstadt von Frankreich?'],
        ['Yusuf', 'Paris!'],
        ['Frau Kremer', 'Richtig! Team Blau bekommt 150 Punkte. Wie viele Punkte habt ihr jetzt?'],
        ['Yusuf', '290 plus 150 … Erst 200 plus 100 sind 300, dann 90 plus 50 sind 140. Zusammen 440!'],
        ['Frau Kremer', 'Super gerechnet. Team Rot, jetzt seid ihr dran. Achtung: Eine falsche Antwort kostet 60 Punkte. Was ist die Hauptstadt von Portugal?'],
        ['Lea', 'Hm … Madrid?'],
        ['Frau Kremer', 'Leider falsch, es ist Lissabon. Team Rot verliert 60 Punkte.'],
        ['Lea', 'Oh nein! 340 minus 60 … wir haben nur noch 280.'],
        ['Frau Kremer', 'Genau. Und wie viele Punkte liegt Team Blau vorne?'],
        ['Yusuf', 'Von 280 bis 440 … das sind 160 Punkte!'],
      ],
      vor: [{ art: 'mc', auftrag: '300 + 200 = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['50', '500', '5.000'], r: 1 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze die Punkte.', stufe: 1, kopf: ['Team', 'vorher', 'plus / minus', 'nachher'], breiten: [22, 24, 28, 26], zeilen: [['Blau', '[290]', '[+ 150]', '[440]'], ['Rot', '[340]', '[− 60]', '[280]']] },
        { art: 'fragen', auftrag: 'Wie viele Punkte liegt Team Blau vorne? Rechne.', stufe: 2, fragen: [{ f: '', l: '440 − 280 = 160 Punkte' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Kopf-Kette: Nennt eine Startzahl. Reihum sagt jede Person „plus 30“ oder „minus 50“ – alle rechnen im Kopf weiter.', stufe: 2, karten: [
        { titel: 'Tricks', text: ['Erst die Hunderter, dann die Zehner.', 'Bis zum Zehner auffüllen.', 'Minus: Wie viel fehlt bis …?'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre deinen Trick für 199 + 199 im Kopf.', anfaenge: ['199 ist fast …', 'Ich rechne zuerst …', 'Dann …'] },
  },
  // 6 Schriftlich addieren und subtrahieren
  {
    fr: 'J’additionne et je soustrais en colonnes jusqu’à 1 000 000.',
    bild: ['amira:froh:laptop', 'ben:froh:erklaeren'],
    hoeren: {
      was: 'Die Klassenkasse', wo: 'Klassenrat · Planung der Klassenfahrt', titel: 'Reicht das Geld?',
      situation: 'Amira und Ben planen die Klassenfahrt. Sie rechnen die Kosten zusammen. Notiere die Zahlen!',
      bild: ['amira:froh:laptop', 'ben:froh:erklaeren'], sprecher: { Amira: 'w2', Ben: 'm3' },
      text: [
        ['Amira', 'Also, für die Klassenfahrt haben wir 5.000 Euro in der Kasse.'],
        ['Ben', 'Der Bus kostet 1.245 Euro.'],
        ['Amira', 'Die Jugendherberge kostet 2.380 Euro für alle zusammen.'],
        ['Ben', 'Und die Eintritte für das Museum und den Kletterpark kosten 476 Euro.'],
        ['Amira', 'Dann rechnen wir schriftlich: 1.245 plus 2.380 plus 476.'],
        ['Ben', 'Das macht zusammen 4.101 Euro.'],
        ['Amira', 'Und 5.000 minus 4.101 … dann bleiben 899 Euro übrig!'],
        ['Ben', 'Super! Davon können wir am letzten Abend Pizza für alle bestellen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Beim schriftlichen Rechnen schreibst du … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Einer unter Einer, Zehner unter Zehner', 'die Zahlen nebeneinander'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Notiere die Kosten.', stufe: 1, kopf: ['Was?', 'Euro'], breiten: [60, 40], zeilen: [['Bus', '[1.245]'], ['Jugendherberge', '[2.380]'], ['Eintritte', '[476]'], ['Geld in der Kasse', '[5.000]']] },
        { art: 'rechnen', auftrag: 'Rechne schriftlich nach.', stufe: 2, items: [{ a: '1.245 + 2.380 + 476 = ?', l: '4.101 €', raum: 4 }, { a: '5.000 − 4.101 = ?', l: '899 €', raum: 4 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Plant einen Klassenausflug mit 1.000 Euro. Wählt drei Kosten aus und rechnet: Reicht das Geld?', stufe: 3, karten: [
        { titel: 'Ideen', text: ['Bus: 385 €', 'Kino: 264 €', 'Picknick: 148 €', 'Schwimmbad: 216 €', 'Zoo: 432 €'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, was „1 im Sinn“ beim schriftlichen Addieren bedeutet. Zeige es an 456 + 278.', anfaenge: ['Bei den Einern: 6 + 8 = …', 'Ich schreibe … und merke mir …', 'Bei den Zehnern …'], zeilen: 6 },
  },
  // 7 Mal und geteilt durch 10, 100, 1000
  {
    fr: 'Je multiplie et je divise de tête par 10, 100 et 1 000.',
    bild: ['nele:froh:stehen', 'opa:froh:erklaeren'],
    hoeren: {
      was: 'Einkauf für das Schulfest', wo: 'Beim Hausmeister · vor dem Schulfest', titel: '1.000 Becher!',
      situation: 'Nele hilft Herrn Becker, dem Hausmeister. Sie bestellen alles für das Schulfest.',
      bild: ['opa:froh:erklaeren', 'nele:froh:stehen'], sprecher: { 'Herr Becker': 'm2', Nele: 'w3' },
      text: [
        ['Herr Becker', 'Für das Schulfest brauchen wir 1.000 Becher. In einem Paket sind 100 Becher. Wie viele Pakete bestellen wir?'],
        ['Nele', '1.000 geteilt durch 100 … das sind 10 Pakete.'],
        ['Herr Becker', 'Richtig. Servietten gibt es in Packungen zu 10 Stück. Wir brauchen 300 Servietten.'],
        ['Nele', '300 geteilt durch 10 sind 30 Packungen.'],
        ['Herr Becker', 'Und wir verkaufen 100 Lose. Ein Los kostet 3 Euro.'],
        ['Nele', '3 mal 100 … das sind 300 Euro für die Klassenkasse!'],
        ['Herr Becker', 'Und die Tombola hat 1.000 Lose zu 2 Euro.'],
        ['Nele', '2 mal 1.000 sind 2.000 Euro. Wow!'],
      ],
      vor: [{ art: 'mc', auftrag: '10 Pakete mit je 100 Bechern sind … Becher. Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['110', '1.000', '10.000'], r: 1 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['Becher: 1.000 ÷ 100 = [10] Pakete', 'Servietten: 300 ÷ 10 = [30] Packungen', 'Lose: 3 € · 100 = [300] €', 'Tombola: 2 € · 1.000 = [2.000] €'] }],
      nach: [{ art: 'sprechen', auftrag: 'Blitzrunde: Eine Person nennt eine Aufgabe mit 10, 100 oder 1.000. Wer zuerst richtig antwortet, stellt die nächste Aufgabe.', stufe: 1, karten: [
        { titel: 'Beispiele', text: ['45 · 100', '6.000 ÷ 10', '7 · 1.000', '90.000 ÷ 1.000'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, warum bei 34 · 100 zwei Nullen dazukommen. Denke an die Stellenwerttafel.', anfaenge: ['Die 3 ist zuerst …', 'Nach · 100 ist sie …', 'Deshalb …'] },
  },
  // 8 Einmaleins
  {
    fr: 'Je connais bien les tables de multiplication.',
    bild: ['sami:froh:stehen', 'verkaeuferin:froh:erklaeren'],
    hoeren: {
      was: 'An der Kinokasse', wo: 'Kino · Samstagnachmittag', titel: 'Siebenmal Kino',
      situation: 'Sami geht mit sechs Freunden ins Kino. An der Kasse muss er schnell rechnen.',
      bild: ['verkaeuferin:froh:erklaeren', 'sami:froh:stehen'], sprecher: { Kassiererin: 'w1', Sami: 'm3' },
      text: [
        ['Kassiererin', 'Hallo! Wie viele Karten möchtest du?'],
        ['Sami', 'Sieben Karten für den Film um 15 Uhr, bitte. Wir sind sieben Freunde.'],
        ['Kassiererin', 'Eine Karte für Jugendliche kostet 8 Euro.'],
        ['Sami', '7 mal 8 … das sind 56 Euro.'],
        ['Kassiererin', 'Genau. Möchtet ihr Popcorn? Eine Tüte kostet 4 Euro.'],
        ['Sami', 'Ja, sechs Tüten, bitte. Das sind 24 Euro.'],
        ['Kassiererin', 'Ihr sitzt in Reihe 9. Der Saal hat 9 Reihen mit je 8 Plätzen.'],
        ['Sami', 'Dann hat der Saal 72 Plätze. Gar nicht so groß!'],
      ],
      vor: [{ art: 'mc', auftrag: '7 · 8 = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['54', '56', '63'], r: 1 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und rechne.', stufe: 1, kopf: ['Was?', 'Rechnung', 'Ergebnis'], breiten: [30, 36, 34], zeilen: [['Kinokarten', '[7 · 8 €]', '[56 €]'], ['Popcorn', '[6 · 4 €]', '[24 €]'], ['Plätze im Saal', '[9 · 8]', '[72 Plätze]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Einmaleins-Duell: Zwei Personen stehen. Die Lehrperson nennt eine Aufgabe. Wer zuerst richtig antwortet, gewinnt einen Punkt.', stufe: 1, karten: [
        { titel: 'Schwierige Aufgaben', text: ['6 · 7 = 42', '7 · 8 = 56', '8 · 9 = 72', '6 · 8 = 48'] }] }],
    },
    erklaeren: { auftrag: 'Welche Einmaleins-Aufgabe ist für dich am schwersten? Schreibe einen Trick, wie du sie dir merkst.', anfaenge: ['Am schwersten finde ich …', 'Mein Trick: …'] },
  },
  // 9 Längen
  {
    fr: 'Je connais les unités de longueur et je les convertis.',
    bild: ['mia:froh:gehen', 'lehrer:froh:zeigen'],
    erklBild: treppe(['km', 'm', 'dm', 'cm', 'mm'], ['· 1.000', '· 10', '· 10', '· 10']),
    hoeren: {
      was: 'Eine Wanderung', wo: 'Im Wald · Wanderung mit der Klasse', titel: 'Noch 800 Meter!',
      situation: 'Die Klasse wandert zu einem Wasserfall. Herr Mesenberg erklärt den Weg.',
      bild: ['lehrer:froh:zeigen', 'mia:muede:gehen'], sprecher: { 'Herr Mesenberg': 'm1', Mia: 'w2' },
      text: [
        ['Herr Mesenberg', 'So, wir sind am Parkplatz. Bis zur Brücke sind es 2 Kilometer.'],
        ['Mia', 'Und von der Brücke bis zum Wasserfall?'],
        ['Herr Mesenberg', 'Noch 800 Meter.'],
        ['Mia', 'Dann laufen wir 2 Kilometer und 800 Meter. Das sind 2.800 Meter.'],
        ['Herr Mesenberg', 'Genau. Und zurück nehmen wir den gleichen Weg.'],
        ['Mia', 'Also 2.800 Meter mal 2 … 5.600 Meter. Das sind 5 Kilometer und 600 Meter!'],
        ['Herr Mesenberg', 'Richtig. Der Wasserfall ist übrigens 12 Meter hoch.'],
        ['Mia', '12 Meter … das sind 1.200 Zentimeter. Höher als unser Schulhaus!'],
      ],
      vor: [{ art: 'mc', auftrag: '1 km = … m. Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['10', '100', '1.000'], r: 2 }] }],
      beim: [{ art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['Parkplatz bis Brücke: [2 km] = [2.000 m]', 'Brücke bis Wasserfall: [800 m]', 'Hinweg: [2.800 m] = 2 km [800 m]', 'Hin und zurück: [5.600 m] = [5 km] 600 m', 'Wasserfall: 12 m = [1.200 cm]'] }],
      nach: [{ art: 'sprechen', auftrag: 'Schätzt und messt: Wie lang ist euer Klassenzimmer? Wie hoch ist die Tür? Sagt die Länge in m und in cm.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Ich schätze: ungefähr …', 'Wir haben gemessen: …', 'Das sind … cm.'] }] }],
    },
    erklaeren: { auftrag: 'Wie lang ist ein Weg, den du oft gehst (echt oder ausgedacht)? Schätze und schreibe die Länge in km und in m.', anfaenge: ['Mein Weg geht von … bis …', 'Ich schätze: … km = … m'] },
  },
  // 10 Geld
  {
    fr: 'Je calcule avec des euros : sommes, monnaie rendue et prix.',
    bild: ['noah:froh:stehen', 'verkaeuferin:froh:stehen'],
    hoeren: {
      was: 'In der Bäckerei', wo: 'Bäckerei · morgens vor der Schule', titel: 'Und das Rückgeld?',
      situation: 'Noah kauft in der Bäckerei ein. Er bezahlt mit einem 10-Euro-Schein.',
      bild: ['verkaeuferin:froh:stehen', 'noah:froh:stehen'], sprecher: { Verkäuferin: 'w1', Noah: 'm3' },
      text: [
        ['Verkäuferin', 'Guten Morgen! Was darf es sein?'],
        ['Noah', 'Guten Morgen! Zwei Croissants, bitte.'],
        ['Verkäuferin', 'Ein Croissant kostet 1,20 Euro. Zwei Croissants kosten 2,40 Euro. Noch etwas?'],
        ['Noah', 'Ja, ein Brot, bitte.'],
        ['Verkäuferin', 'Das Brot kostet 3,50 Euro. Zusammen sind das 5,90 Euro.'],
        ['Noah', 'Hier sind 10 Euro.'],
        ['Verkäuferin', 'Danke. Dann bekommst du 4,10 Euro zurück. Schönen Tag!'],
        ['Noah', 'Danke, Ihnen auch!'],
      ],
      vor: [{ art: 'mc', auftrag: '100 Cent = … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['1 Euro', '10 Euro'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Schreibe den Kassenzettel.', stufe: 1, kopf: ['Ware', 'Preis'], breiten: [60, 40], zeilen: [['2 Croissants', '[2,40 €]'], ['1 Brot', '[3,50 €]'], ['Summe', '[5,90 €]'], ['bezahlt', '[10,00 €]'], ['Rückgeld', '[4,10 €]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Rollenspiel Bäckerei: Eine Person verkauft, eine kauft drei Dinge. Rechnet die Summe und das Rückgeld.', stufe: 2, karten: [
        { titel: 'Preise', text: ['Croissant: 1,20 €', 'Brötchen: 0,50 €', 'Brot: 3,50 €', 'Kuchen: 2,80 €', 'Saft: 1,50 €'] },
        { titel: 'Sätze', text: ['Was darf es sein?', 'Das macht … Euro.', 'Sie bekommen … zurück.'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, wie man an der Kasse das Rückgeld „hochzählt“: Der Einkauf kostet 7,30 €, du zahlst mit 10 €.', anfaenge: ['Von 7,30 € bis 8 € sind es …', 'Von 8 € bis 10 € sind es …', 'Zusammen: …'] },
  },
  // 11 Uhr und Zeit
  {
    fr: 'Je lis l’heure et je calcule des durées.',
    bild: ['lea:nervoes:handy', 'ben:froh:stehen'],
    hoeren: {
      was: 'Am Busbahnhof', wo: 'Busbahnhof · morgens', titel: 'Der Bus um 7 Uhr 42',
      situation: 'Lea und Ben warten auf den Bus. Eine Ansage kommt aus dem Lautsprecher.',
      bild: ['lea:nervoes:handy', 'ben:froh:stehen'], sprecher: { Ansage: 'm2', Lea: 'w2', Ben: 'm3' },
      text: [
        ['Ansage', 'Achtung, eine Durchsage: Der Bus der Linie 8 um 7 Uhr 30 hat heute 12 Minuten Verspätung.'],
        ['Lea', 'Oh nein! Dann kommt er erst um 7 Uhr 42.'],
        ['Ben', 'Die Fahrt dauert 25 Minuten. Dann sind wir um 8 Uhr 07 an der Schule.'],
        ['Lea', 'Aber die Schule beginnt um 8 Uhr! Wir sind 7 Minuten zu spät.'],
        ['Ben', 'Schau, die Linie 5 fährt um 7 Uhr 35. Sie braucht nur 20 Minuten.'],
        ['Lea', 'Dann sind wir um 7 Uhr 55 da. Super, nehmen wir die Linie 5!'],
      ],
      vor: [{ art: 'mc', auftrag: '1 Stunde = … Minuten. Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['30', '60', '100'], r: 1 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und ergänze den Fahrplan.', stufe: 1, kopf: ['Linie', 'Abfahrt', 'Fahrzeit', 'Ankunft'], breiten: [16, 28, 28, 28], zeilen: [['8 (mit Verspätung)', '[7:42]', '[25 Minuten]', '[8:07]'], ['5', '[7:35]', '[20 Minuten]', '[7:55]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Fragt euch gegenseitig: Wann beginnt …? Wann endet …? Wie lange dauert …?', stufe: 2, karten: [
        { titel: 'Fragen', text: ['Wann beginnt die erste Stunde?', 'Wie lange dauert die Pause?', 'Wie lange bist du in der Schule?'] }] }],
    },
    ueben: [{ art: 'uhren', auftrag: 'Wie spät ist es? Schreibe die Uhrzeit.', stufe: 1, zeiten: ['7:45', '9:10', '2:30', '4:55'], loesungen: ['7:45 / 19:45', '9:10 / 21:10', '2:30 / 14:30', '4:55 / 16:55'] }],
    erklaeren: { auftrag: 'Schreibe einen Schultag auf (echt oder ausgedacht): Wann beginnt er, wann endet er? Wie lange dauert er?', anfaenge: ['Die Schule beginnt um …', 'Sie endet um …', 'Das sind … Stunden und … Minuten.'] },
  },
  // 12 Figuren
  {
    fr: 'Je reconnais et je nomme le carré, le rectangle, le triangle et le cercle.',
    bild: ['ben:froh:handy', 'chloe:froh:blatt'],
    erklBild: figuren(),
    hoeren: {
      was: 'Ein Bild-Diktat am Telefon', wo: 'Am Telefon · nachmittags', titel: 'Zeichne, was du hörst!',
      situation: 'Ben beschreibt Chloe am Telefon ein Bild. Chloe zeichnet. Zeichne auch mit!',
      bild: ['ben:froh:handy', 'chloe:froh:blatt'], sprecher: { Ben: 'm3', Chloe: 'w2' },
      text: [
        ['Ben', 'Hast du einen Stift? Zeichne zuerst ein großes Quadrat in die Mitte.'],
        ['Chloe', 'Okay. Ein Quadrat hat vier gleich lange Seiten.'],
        ['Ben', 'Genau. Oben auf das Quadrat zeichnest du ein Dreieck. Das ist das Dach.'],
        ['Chloe', 'Fertig. Es ist ein Haus!'],
        ['Ben', 'Richtig. Unten in der Mitte zeichnest du ein schmales Rechteck: die Tür.'],
        ['Chloe', 'Und die Fenster?'],
        ['Ben', 'Links und rechts von der Tür je ein kleines Quadrat. Und oben im Dach ein kleiner Kreis.'],
        ['Chloe', 'Und am Himmel rechts ein großer Kreis: die Sonne!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Welche Figur hat drei Ecken? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['das Quadrat', 'das Dreieck', 'der Kreis'], r: 1 }] }],
      beim: [
        { art: 'frei', auftrag: 'Hör zu und zeichne das Bild.', stufe: 1, html: '<div style="border:0.6mm dashed var(--f);border-radius:3mm;height:70mm"></div>' },
        { art: 'tabelle', auftrag: 'Zähle die Figuren in deinem Bild.', stufe: 2, kopf: ['Figur', 'Anzahl'], breiten: [60, 40], zeilen: [['Quadrate', '[3]'], ['Dreiecke', '[1]'], ['Rechtecke', '[1]'], ['Kreise', '[2]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Bild-Diktat: Zeichne geheim ein Bild aus vier Figuren. Beschreibe es. Dein Partner oder deine Partnerin zeichnet. Vergleicht!', stufe: 3, karten: [
        { titel: 'Wörter', text: ['oben, unten, links, rechts', 'in der Mitte, neben, auf', 'groß, klein, schmal'] }] }],
    },
    erklaeren: { auftrag: 'Beschreibe ein Ding aus deinem Alltag mit Figuren (zum Beispiel ein Handy, ein Fenster, eine Uhr).', anfaenge: ['Ein … sieht aus wie …', 'Es hat … Ecken und … Seiten.'] },
  },
  // 13 Kreis
  {
    fr: 'Je connais les parties du cercle et je trace un cercle au compas.',
    bild: ['lina:froh:zeigen', 'opa:froh:stehen'],
    erklBild: kreisTeile(),
    hoeren: {
      was: 'Im Gartenmarkt', wo: 'Gartenmarkt · Samstag', titel: 'Ein Trampolin mit 3 Metern',
      situation: 'Lina und ihr Opa wollen ein Trampolin kaufen. Ein Verkäufer berät sie.',
      bild: ['opa:froh:stehen', 'lina:froh:zeigen'], sprecher: { Verkäufer: 'm1', Lina: 'w3', Opa: 'm2' },
      text: [
        ['Verkäufer', 'Dieses Trampolin ist rund. Es hat einen Durchmesser von 300 Zentimetern.'],
        ['Lina', 'Dann ist der Radius 150 Zentimeter, also die Hälfte.'],
        ['Opa', 'Unser Garten ist aber nur 4 Meter breit. Passt das?'],
        ['Verkäufer', '300 Zentimeter sind 3 Meter. Das passt gut, es bleibt noch 1 Meter Platz.'],
        ['Lina', 'Und dieser runde Gartentisch?'],
        ['Verkäufer', 'Er hat einen Radius von 60 Zentimetern.'],
        ['Lina', 'Dann ist der Durchmesser 120 Zentimeter. Da passen vier Stühle rundherum!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Der Durchmesser ist … so lang wie der Radius. Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['halb', 'doppelt', 'dreimal'], r: 1 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Durchmesser', 'Radius'], breiten: [30, 35, 35], zeilen: [['Trampolin', '[300 cm = 3 m]', '[150 cm]'], ['Gartentisch', '[120 cm]', '[60 cm]']] }],
      nach: [{ art: 'sprechen', auftrag: 'Sucht runde Dinge im Klassenzimmer. Messt den Durchmesser und berechnet den Radius.', stufe: 2, karten: [
        { titel: 'Sätze', text: ['Die Uhr hat einen Durchmesser von … cm.', 'Der Radius ist die Hälfte: … cm.'] }] }],
    },
    ueben: [{ art: 'frei', auftrag: 'Zeichne mit dem Zirkel einen Kreis mit dem Radius 3 cm. Markiere den Mittelpunkt M, einen Radius r und einen Durchmesser d.', stufe: 2, html: '<div style="border:0.6mm dashed var(--f);border-radius:3mm;height:72mm"></div>' }],
    erklaeren: { auftrag: 'Erkläre den Unterschied zwischen Radius und Durchmesser mit einem Beispiel.', anfaenge: ['Der Radius geht vom … bis …', 'Der Durchmesser geht …', 'Zum Beispiel: …'] },
  },
  // 14 Symmetrie
  {
    fr: 'Je reconnais des figures symétriques et je trouve les axes de symétrie.',
    bild: ['sami:froh:blatt', 'lea:froh:zeigen'],
    erklBild: symmetrieBuchstaben(['A', 'H', 'E', 'F'], ['s', 'sw', 'w', '']),
    hoeren: {
      was: 'Ein Logo für die Schülerzeitung', wo: 'AG Schülerzeitung', titel: 'Nur symmetrische Buchstaben!',
      situation: 'Die Schülerzeitung bekommt ein neues Logo. Es soll nur symmetrische Buchstaben haben.',
      bild: ['lehrerin:froh:erklaeren', 'sami:froh:blatt'], sprecher: { 'Frau Sommer': 'w1', Sami: 'm3', Lea: 'w2' },
      text: [
        ['Frau Sommer', 'Für das neue Logo wollen wir nur symmetrische Buchstaben. Welche passen?'],
        ['Sami', 'Das A ist symmetrisch. Die Spiegelachse geht senkrecht durch die Mitte.'],
        ['Lea', 'Das M auch! Und das T und das H.'],
        ['Sami', 'Und das E? Wenn man es senkrecht faltet, passt es nicht.'],
        ['Frau Sommer', 'Stimmt. Aber falte es waagerecht! Dann passen die beiden Hälften genau aufeinander.'],
        ['Lea', 'Und das F? Senkrecht nicht, waagerecht auch nicht. Das F ist nicht symmetrisch.'],
        ['Frau Sommer', 'Genau. Welcher Name passt also für unsere Zeitung: „OTTO“ oder „FRIDA“?'],
        ['Sami', '„OTTO“! Alle Buchstaben sind symmetrisch.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Eine Figur ist symmetrisch, wenn … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['beide Hälften beim Falten genau aufeinanderpassen', 'sie groß ist'], r: 0 }] }],
      beim: [{ art: 'tabelle', auftrag: 'Hör zu. Wie ist die Spiegelachse? Kreuze an.', stufe: 1, kopf: ['Buchstabe', 'senkrecht', 'waagerecht', 'keine'], breiten: [25, 25, 25, 25], zeilen: [['A', '[x]', '', ''], ['E', '', '[x]', ''], ['F', '', '', '[x]'], ['H', '[x]', '[x]', ''], ['T', '[x]', '', '']] }],
      nach: [{ art: 'sprechen', auftrag: 'Findet Wörter, die nur aus symmetrischen Großbuchstaben bestehen (zum Beispiel OTTO). Wer findet die meisten?', stufe: 3, karten: [
        { titel: 'Symmetrische Buchstaben', text: ['A H I M O T U V W X Y', 'B C D E K (waagerecht)'] }] }],
    },
    ueben: [{ art: 'frei', auftrag: 'Zeichne bei jedem Buchstaben die Spiegelachse ein (senkrecht oder waagerecht). Ein Buchstabe hat keine.', stufe: 1, html: symmetrieBuchstaben(['M', 'B', 'T', 'R', 'X', 'D'], ['s', 'w', 's', '', 'sw', 'w']) }],
    erklaeren: { auftrag: 'Schreibe deinen Vornamen oder ein anderes Wort in Großbuchstaben. Welche Buchstaben sind symmetrisch? Wie liegt die Achse?', anfaenge: ['Mein Wort: …', 'Symmetrisch sind: …', 'Nicht symmetrisch: …'] },
  },
]

export const LEKTIONEN = matheLektionen(1, EXTRAS)

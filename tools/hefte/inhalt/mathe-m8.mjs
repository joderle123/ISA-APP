// Mathematik · Modul 8 „Teiler, Potenzen, Brüche und Dreiecke“ (Voie de préparation) – multimodales Modulheft.
// Lektionen, Erklärungen und Übungen: aus dem Mathe-Programm (Programm VP Mathematik, Modul 8: Vielfache und Teiler, kgV und ggT,
// Potenzen und Zehnerpotenzen, Quadratwurzel, Brüche mit verschiedenen Nennern, Bruchteile, Bruch – Dezimalzahl – Prozent,
// Dreiecke konstruieren, Höhen, Mittelsenkrechte und Winkelhalbierende).
// Neu hier: Szenen aus dem Alltag, Bilder, Schreibaufträge „Erklären“. Personen, Preise und Zahlen: ausgedacht.

import { matheModul, matheLektionen } from './mathe-gemeinsam.mjs'

const B = (z, n) => `{{${z}/${n}}}` // Bruch im Heft

export const MODUL = matheModul(8, {
  titelFr: 'Diviseurs, puissances, fractions et triangles',
  unterFr: 'Multiples et diviseurs, puissances et racines carrées, fractions de dénominateurs différents et construction de triangles.',
  deckbild: ['tom:froh:stehen', 'chloe:froh:erklaeren', 'noah:froh:laessig'],
  blasen: [{ t: 'kgV(4; 6) = 12', x: 12, y: 112 }, { t: '2⁵ = 32', x: 116, y: 98 }, { t: '√81 = 9', x: 166, y: 150 }],
  themenIcons: ['divide', 'superscript', 'chart-pie', 'triangle'],
})

const EXTRAS = [
  // 1 Vielfache und Teiler
  {
    fr: 'Je trouve les multiples et tous les diviseurs d’un nombre. Je sais ce qu’est un nombre premier.',
    bild: ['noah:froh:stehen', 'lehrer:froh:zeigen'],
    hoeren: {
      was: 'Teams für das Turnier', wo: 'Turnhalle · Teams einteilen', titel: 'Niemand bleibt draußen',
      situation: 'In der Sportstunde sollen gleich große Teams gebildet werden. Noah hilft dem Sportlehrer beim Einteilen.',
      bild: ['lehrer:froh:zeigen', 'noah:froh:stehen'], sprecher: { Sportlehrer: 'm2', Noah: 'm3' },
      text: [
        ['Sportlehrer', 'Wir sind heute 24. Ich will gleich große Teams, und niemand soll draußen bleiben.'],
        ['Noah', 'Teams zu 4 – das sind 6 Teams. Teams zu 6 gehen auch: dann sind es 4 Teams.'],
        ['Sportlehrer', 'Und Teams zu 5?'],
        ['Noah', '24 durch 5 geht nicht auf. Vier Leute blieben übrig.'],
        ['Sportlehrer', 'Welche Teamgrößen gehen also?'],
        ['Noah', 'Alle Teiler von 24: 1, 2, 3, 4, 6, 8, 12 und 24. Teams zu 1 oder zu 24 sind aber langweilig.'],
        ['Sportlehrer', 'Morgen sind wir nur 23.'],
        ['Noah', '23 hat nur die Teiler 1 und 23. Das ist eine Primzahl. Da müssen Sie mitspielen!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Welche Zahl ist ein Teiler von 24? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['6', '5', '7'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 1, saetze: ['Teams zu 4 → [6] Teams', 'Teams zu 6 → [4] Teams', 'T(24) = {1; 2; 3; 4; [6]; [8]; 12; 24}', '23 hat nur die Teiler 1 und [23] → eine Primzahl'] }],
      nach: [{ art: 'sprechen', auftrag: 'Wie viele seid ihr in der Klasse? Welche Teamgrößen gehen ohne Rest? Was macht ihr, wenn die Zahl eine Primzahl ist?', stufe: 2, karten: [
        { titel: 'Teiler finden', text: ['in Paaren suchen', '1 · 24, 2 · 12, 3 · 8, 4 · 6', 'Primzahl: nur 1 und sich selbst'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre den Unterschied zwischen einem Teiler und einem Vielfachen mit einem eigenen Beispiel.', anfaenge: ['Ein Teiler von … ist …', 'Ein Vielfaches von … ist …', 'Zum Beispiel …'] },
  },
  // 2 kgV und ggT
  {
    fr: 'Je détermine le ppcm et le pgcd de deux ou trois nombres et je les utilise dans des problèmes.',
    bild: ['jana:froh:erklaeren', 'tom:froh:stehen'],
    hoeren: {
      was: 'Einkauf für das Grillfest', wo: 'Supermarkt · Grillfest der Klasse', titel: 'Kein Würstchen ohne Brötchen',
      situation: 'Jana und Tom kaufen für das Grillfest der Klasse ein. Es soll nichts übrig bleiben.',
      bild: ['jana:froh:erklaeren', 'tom:froh:stehen'], sprecher: { Jana: 'w2', Tom: 'm3' },
      text: [
        ['Jana', 'Würstchen gibt es nur in Packungen zu 8. Brötchen in Tüten zu 6.'],
        ['Tom', 'Und es soll kein Würstchen ohne Brötchen übrig bleiben.'],
        ['Jana', 'Dann brauchen wir eine Zahl, die in der 8er-Reihe und in der 6er-Reihe steht. 8, 16, 24 … und 6, 12, 18, 24. Die kleinste ist 24.'],
        ['Tom', 'Also 3 Packungen Würstchen und 4 Tüten Brötchen. Das ist das kgV.'],
        ['Jana', 'Und die 36 Muffins und 48 Apfelstücke? Ich will möglichst viele gleiche Teller.'],
        ['Tom', 'Da suchen wir den größten gemeinsamen Teiler von 36 und 48: 12.'],
        ['Jana', 'Also 12 Teller mit je 3 Muffins und 4 Apfelstücken. Perfekt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'kgV von 8 und 6? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['24', '48', '2'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['V(8): 8, 16, [24] … · V(6): 6, 12, 18, [24] …', 'kgV(8; 6) = [24] → [3] Packungen Würstchen, [4] Tüten Brötchen', 'ggT(36; 48) = [12] → je [3] Muffins und [4] Apfelstücke'] }],
      nach: [{ art: 'sprechen', auftrag: 'Erfindet eine eigene Party-Aufgabe mit kgV („Wann geht es auf?“) und eine mit ggT („Wie verteilen wir gleich?“). Tauscht mit einer anderen Gruppe und löst.', stufe: 3, karten: [
        { titel: 'Welche Frage?', text: ['Wann wieder zusammen? → kgV', 'Wie gleich aufteilen? → ggT'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, woran du bei einer Sachaufgabe erkennst, ob du das kgV oder den ggT brauchst. Gib je ein Beispiel.', anfaenge: ['Ich brauche das kgV, wenn …', 'Ich brauche den ggT, wenn …', 'Beispiel: …'], zeilen: 6 },
  },
  // 3 Potenzen
  {
    fr: 'J’écris des produits de facteurs égaux sous forme de puissance, je calcule des carrés et des cubes et j’utilise les puissances de 10.',
    bild: ['lea:froh:handy', 'yusuf:froh:erklaeren'],
    hoeren: {
      was: 'Speicherplatz im Handy', wo: 'Pause · Handys vergleichen', titel: '64, 128, 256 – warum diese Zahlen?',
      situation: 'Lea und Yusuf vergleichen ihre Handys. Lea wundert sich über die Zahlen beim Speicher.',
      bild: ['lea:froh:handy', 'yusuf:froh:erklaeren'], sprecher: { Lea: 'w2', Yusuf: 'm1' },
      text: [
        ['Lea', 'Mein Handy hat 64 Gigabyte, deins 128. Warum immer so komische Zahlen?'],
        ['Yusuf', 'Das sind Zweierpotenzen. 2 hoch 6 ist 64, 2 hoch 7 ist 128.'],
        ['Lea', '2 mal 2 mal 2 mal 2 mal 2 mal 2 … ja, das gibt 64.'],
        ['Yusuf', 'Und das nächste Modell hat 2 hoch 8.'],
        ['Lea', 'Das ist das Doppelte von 128: 256 Gigabyte.'],
        ['Yusuf', 'Ein Gigabyte sind übrigens etwa eine Milliarde Byte. Das ist 10 hoch 9 – eine 1 mit neun Nullen.'],
        ['Lea', 'Dann ist mein Handy-Speicher ungefähr 64 mal 10 hoch 9 Byte groß. Riesig!'],
      ],
      vor: [{ art: 'mc', auftrag: '2⁶ = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['64', '12', '36'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['2⁶ = 2 · 2 · 2 · 2 · 2 · 2 = [64]', '2⁷ = [128] · 2⁸ = [256]', '1 Milliarde = 1.000.000.000 = 10 hoch [9]'] }],
      nach: [{ art: 'sprechen', auftrag: 'Verdoppel-Runde: Startet bei 1. Jede Person verdoppelt laut (2, 4, 8 …). In welcher Runde seid ihr über 1.000? Schreibt die Zahl als Potenz von 2.', stufe: 2, karten: [
        { titel: 'Potenz', text: ['Basis = welche Zahl', 'Hochzahl = wie oft mal', '10ⁿ = 1 mit n Nullen'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, warum 3² nicht 6 ist. Schreib ein Beispiel, an dem man den Unterschied gut sieht.', anfaenge: ['3² bedeutet …', '3 · 2 bedeutet …', 'Man sieht den Unterschied, wenn …'] },
  },
  // 4 Quadratwurzel
  {
    fr: 'Je calcule la racine carrée des carrés parfaits de tête, j’estime les autres racines et je les calcule avec la calculatrice.',
    bild: ['finn:froh:zeigen', 'lehrerin:froh:erklaeren'],
    hoeren: {
      was: 'Kunstrasen für den Schulhof', wo: 'Schulhof · neues Spielfeld', titel: 'Wie lang wird jede Seite?',
      situation: 'Auf dem Schulhof sollen zwei quadratische Spielfelder mit Kunstrasen entstehen. Finn hilft beim Planen.',
      bild: ['finn:froh:zeigen', 'lehrerin:froh:erklaeren'], sprecher: { Finn: 'm3', Lehrerin: 'w1' },
      text: [
        ['Finn', 'Die Firma liefert 81 Quadratmeter Kunstrasen für das große Feld. Es soll ein Quadrat werden. Wie lang wird jede Seite?'],
        ['Lehrerin', 'Welche Zahl mal sich selbst gibt 81?'],
        ['Finn', '9 mal 9. Also 9 Meter.'],
        ['Lehrerin', 'Und für das kleine Feld gibt es 50 Quadratmeter.'],
        ['Finn', '7 mal 7 ist 49, 8 mal 8 ist 64. Also etwas mehr als 7 Meter – ganz nah an 7.'],
        ['Lehrerin', 'Und mit dem Taschenrechner?'],
        ['Finn', 'Wurzel aus 50 … 7,07 Meter. Gut geschätzt!'],
      ],
      vor: [{ art: 'mc', auftrag: '√81 = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['9', '40,5', '8'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 1, saetze: ['√81 = [9] m, weil 9 · 9 = 81', '7 · 7 = [49] und 8 · 8 = [64]', '√50 ≈ [7,07] m'] }],
      nach: [{ art: 'sprechen', auftrag: 'Schätz-Duell: Eine Person nennt eine Zahl bis 200. Die anderen schätzen die Wurzel auf eine Stelle nach dem Komma. Der Taschenrechner entscheidet.', stufe: 2, karten: [
        { titel: 'Schätzen', text: ['Quadratzahl davor und danach suchen', 'Näher an welcher?', 'Dann Taschenrechner'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, wie du √30 ohne Taschenrechner schätzt.', anfaenge: ['Ich suche zwei Quadratzahlen …', 'Darum liegt √30 …', 'Näher an …, weil …'] },
  },
  // 5 Brüche mit verschiedenen Nennern
  {
    fr: 'J’additionne et je soustrais des fractions de dénominateurs différents (dénominateur commun = ppcm) et je simplifie.',
    bild: ['chloe:froh:tasse', 'ben:froh:erklaeren'],
    hoeren: {
      was: 'Pfannkuchen backen', wo: 'Schulküche · Rezept lesen', titel: 'Reicht das Mehl noch?',
      situation: 'Chloe und Ben backen Pfannkuchen in der Schulküche. Im Rezept stehen Brüche.',
      bild: ['chloe:froh:tasse', 'ben:froh:erklaeren'], sprecher: { Chloe: 'w2', Ben: 'm3' },
      text: [
        ['Chloe', 'Für den Teig brauchen wir einen halben Liter Milch und einen Viertelliter Wasser. Passt das zusammen in den Messbecher mit drei Viertel Litern?'],
        ['Ben', 'Ein halber Liter sind zwei Viertel. Zwei Viertel plus ein Viertel sind drei Viertel. Passt genau.'],
        ['Chloe', 'Und das Mehl: Wir haben noch zwei Drittel von der Packung. Wir brauchen eine halbe Packung.'],
        ['Ben', 'Drittel und Halbe … der gemeinsame Nenner ist 6. Zwei Drittel sind vier Sechstel, eine Hälfte sind drei Sechstel.'],
        ['Chloe', 'Vier Sechstel minus drei Sechstel – ein Sechstel bleibt übrig.'],
        ['Ben', 'Für den nächsten Pfannkuchen-Tag reicht das nicht. Wir schreiben Mehl auf die Einkaufsliste.'],
      ],
      vor: [{ art: 'mc', auftrag: `${B(1, 2)} + ${B(1, 4)} = ? Kreuze an.`, stufe: 1, fragen: [{ f: '', o: [B(3, 4), B(2, 6), B(1, 8)], r: 0 }] }],
      beim: [{ art: 'rechnen', auftrag: 'Rechne mit.', stufe: 2, items: [{ a: `Milch und Wasser: ${B(1, 2)} + ${B(1, 4)} = ?`, l: `${B(2, 4)} + ${B(1, 4)} = ${B(3, 4)} l`, raum: 1 }, { a: `Mehl: ${B(2, 3)} − ${B(1, 2)} = ?`, l: `${B(4, 6)} − ${B(3, 6)} = ${B(1, 6)} Packung`, raum: 1 }] }],
      nach: [{ art: 'sprechen', auftrag: 'Rezept-Detektive: Sucht ein Rezept mit Bruch-Mengen (½, ¼, ⅓). Rechnet aus, wie viel man für die doppelte Menge braucht – oder was von einer Packung übrig bleibt.', stufe: 3, karten: [
        { titel: 'Gleichnamig machen', text: ['kgV der Nenner', 'beide Brüche erweitern', 'Zähler rechnen', 'kürzen'] }] }],
    },
    erklaeren: { auftrag: `Tom rechnet: ${B(1, 2)} + ${B(1, 3)} = ${B(2, 5)}. Erkläre seinen Fehler und rechne richtig.`, anfaenge: ['Tom hat …', 'Man darf nicht …', 'Richtig ist: …'] },
  },
  // 6 Bruchteile; mal und geteilt
  {
    fr: 'Je calcule une fraction d’un nombre ou d’une grandeur. Je multiplie et je divise des fractions de même dénominateur.',
    bild: ['mia:froh:stehen', 'verkaeuferin:froh:erklaeren'],
    hoeren: {
      was: 'Schlussverkauf', wo: 'Modegeschäft · Schlussverkauf', titel: 'Ein Drittel billiger',
      situation: 'Mia ist im Schlussverkauf. Auf den Schildern stehen Brüche statt Prozente.',
      bild: ['mia:froh:stehen', 'verkaeuferin:froh:erklaeren'], sprecher: { Mia: 'w2', Verkäuferin: 'w1' },
      text: [
        ['Mia', 'Auf dem Schild steht: ein Drittel billiger. Die Jacke kostet 90 Euro.'],
        ['Verkäuferin', 'Ein Drittel von 90 Euro – wie viel ist das?'],
        ['Mia', '90 durch 3 sind 30 Euro Rabatt. Dann zahle ich noch 60 Euro.'],
        ['Verkäuferin', 'Oder du rechnest direkt zwei Drittel von 90: 90 durch 3, mal 2.'],
        ['Mia', 'Auch 60. Und die Schuhe kosten 80 Euro. Hier steht: Sie zahlen nur drei Viertel.'],
        ['Verkäuferin', 'Drei Viertel heißt: 80 durch 4, mal 3.'],
        ['Mia', '60 Euro. Für beides zahle ich 120 statt 170 Euro – 50 Euro gespart.'],
      ],
      vor: [{ art: 'mc', auftrag: `${B(1, 3)} von 90 € = ? Kreuze an.`, stufe: 1, fragen: [{ f: '', o: ['30 €', '45 €', '270 €'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['Rabatt: 90 : 3 = [30] €', `Preis: ${B(2, 3)} von 90 € = [60] €`, `Schuhe: ${B(3, 4)} von 80 € = 80 : 4 · 3 = [60] €`, 'Gespart: 170 € − 120 € = [50] €'] }],
      nach: [{ art: 'sprechen', auftrag: 'Prospekt-Check: Schreibt drei Rabatt-Schilder mit Brüchen („ein Viertel billiger“ …). Die anderen rechnen den neuen Preis. Welches Angebot spart am meisten?', stufe: 2, karten: [
        { titel: 'Bruchteil', text: ['durch den Nenner', 'mal den Zähler', '„von“ heißt mal'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, warum „ein Drittel billiger“ dasselbe ist wie „zwei Drittel vom Preis zahlen“.', anfaenge: ['Der ganze Preis sind …', 'Wenn ein Drittel wegfällt, …', 'Darum …'] },
  },
  // 7 Bruch, Dezimalzahl, Prozent
  {
    fr: 'Je convertis des fractions en nombres décimaux et en pourcentages, et inversement.',
    bild: ['amira:froh:laptop', 'noah:froh:stehen'],
    hoeren: {
      was: 'Die Klassen-Umfrage', wo: 'Klassenzimmer · Plakat gestalten', titel: '15 von 25',
      situation: 'Amira und Noah haben in der Klasse eine Umfrage gemacht. Jetzt gestalten sie ein Plakat mit dem Ergebnis.',
      bild: ['amira:froh:laptop', 'noah:froh:stehen'], sprecher: { Amira: 'w2', Noah: 'm3' },
      text: [
        ['Amira', 'Bei unserer Umfrage haben 15 von 25 gesagt, dass sie ein Haustier haben.'],
        ['Noah', 'Als Bruch: 15 Fünfundzwanzigstel. Gekürzt durch 5: drei Fünftel.'],
        ['Amira', 'Für das Plakat brauche ich Prozent. Drei Fünftel sind sechs Zehntel, also 0,6.'],
        ['Noah', '0,6 mal 100 – das sind 60 Prozent.'],
        ['Amira', 'Und 5 von 25 haben eine Katze.'],
        ['Noah', 'Ein Fünftel. Das sind 0,2 – also 20 Prozent.'],
        ['Amira', 'Dann schreibe ich aufs Plakat: 60 Prozent haben ein Haustier, 20 Prozent eine Katze.'],
      ],
      vor: [{ art: 'mc', auftrag: `${B(3, 5)} = … Prozent? Kreuze an.`, stufe: 1, fragen: [{ f: '', o: ['60 %', '35 %', '3,5 %'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['Haustier: 15 von 25 = [3/5] = [0,6] = [60] %', 'Katze: 5 von 25 = [1/5] = [0,2] = [20] %'] }],
      nach: [{ art: 'sprechen', auftrag: 'Macht in der Klasse eine Mini-Umfrage mit einer Ja/Nein-Frage (z. B. „Fährst du mit dem Bus?“). Schreibt das Ergebnis als Bruch, Dezimalzahl und Prozent auf ein Plakat.', stufe: 3, karten: [
        { titel: 'Umwandeln', text: ['Bruch → Zähler : Nenner', 'Dezimalzahl → mal 100', 'Prozent → über 100, kürzen'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, wie man 0,35 in Prozent und als gekürzten Bruch schreibt.', anfaenge: ['0,35 mal 100 …', 'Als Bruch: …', 'Gekürzt: …'] },
  },
  // 8 Dreiecke konstruieren
  {
    fr: 'Je construis des triangles avec la règle, l’équerre et le compas (trois côtés, deux côtés et l’angle compris, un côté et deux angles). Je vérifie si un triangle est possible.',
    bild: ['tom:froh:stehen', 'chef:froh:erklaeren'],
    hoeren: {
      was: 'In der Werkstatt', wo: 'Schreinerei · Schnupperpraktikum', titel: 'Erst zeichnen, dann sägen',
      situation: 'Tom macht ein Schnupperpraktikum in einer Schreinerei. Für ein Eckregal braucht man ein dreieckiges Brett.',
      bild: ['chef:froh:erklaeren', 'tom:froh:stehen'], sprecher: { Meister: 'm2', Tom: 'm3' },
      text: [
        ['Meister', 'Für das Eckregal brauchen wir ein dreieckiges Brett: 30, 40 und 50 Zentimeter.'],
        ['Tom', 'Soll ich gleich sägen?'],
        ['Meister', 'Erst zeichnen. Im Maßstab 1 zu 10: 3, 4 und 5 Zentimeter. Mit dem Zirkel.'],
        ['Tom', 'Unten 5 Zentimeter. Zirkel auf 3, Bogen. Zirkel auf 4, Bogen von der anderen Ecke. Da schneiden sie sich.'],
        ['Meister', 'Miss mal den Winkel oben.'],
        ['Tom', 'Genau 90 Grad! Das passt perfekt in die Zimmerecke.'],
        ['Meister', 'Und ein Brett mit 20, 25 und 50 Zentimetern?'],
        ['Tom', '20 plus 25 sind 45 – weniger als 50. Die Bögen treffen sich nie. So ein Brett gibt es nicht.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was zeichnest du vor der genauen Konstruktion? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Planfigur (Skizze)', 'gleich die Lösung', 'nur die längste Seite'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['Maßstab 1 : 10: 30 cm → [3] cm, 40 cm → [4] cm, 50 cm → [5] cm', 'Der Winkel oben ist [90]°.', '20 + 25 = [45] < 50 → [kein] Dreieck'] }],
      nach: [{ art: 'sprechen', auftrag: 'Konstruiert alle das Regal-Dreieck (3 cm, 4 cm, 5 cm). Legt eure Zeichnungen übereinander. Wo gibt es Unterschiede – und warum?', stufe: 2, karten: [
        { titel: 'Konstruieren', text: ['Planfigur', 'eine Seite zeichnen', 'Bögen oder Winkel', 'verbinden, nachmessen'] }] }],
    },
    erklaeren: { auftrag: 'Beschreibe Schritt für Schritt, wie du ein Dreieck aus drei Seiten (SSS) mit dem Zirkel konstruierst.', anfaenge: ['Zuerst …', 'Dann stelle ich den Zirkel …', 'Wo sich die Bögen …'], zeilen: 6 },
  },
  // 9 Höhen, Mittelsenkrechte, Winkelhalbierende
  {
    fr: 'Je trace les hauteurs d’un triangle (aussi dans un triangle obtusangle), la médiatrice d’un segment et la bissectrice d’un angle.',
    bild: ['lina:froh:zeigen', 'sami:froh:stehen'],
    hoeren: {
      was: 'Der Treffpunkt', wo: 'Karte · drei Dörfer', titel: 'Gleich weit für alle',
      situation: 'Lina, Sami und Mia wohnen in drei verschiedenen Dörfern. Sie suchen einen Treffpunkt, zu dem alle gleich weit fahren.',
      bild: ['lina:froh:zeigen', 'sami:froh:stehen'], sprecher: { Lina: 'w2', Sami: 'm3' },
      text: [
        ['Lina', 'Ich wohne in Altdorf, du in Bergen und Mia in Neudorf. Wo treffen wir uns, damit alle gleich weit fahren?'],
        ['Sami', 'Für zwei Dörfer ist es einfach: Alle Punkte auf der Mittelsenkrechten sind von beiden gleich weit weg.'],
        ['Lina', 'Also zeichne ich die Mittelsenkrechte zwischen meinem und deinem Dorf.'],
        ['Sami', 'Und dann die zwischen meinem Dorf und Mias Dorf. Wo sich die zwei Linien schneiden, ist der Punkt für alle drei.'],
        ['Lina', 'Auf der Karte ist das … am Sportplatz! Von dort sind es zu jedem Dorf 4 Kilometer.'],
        ['Sami', 'Und die dritte Mittelsenkrechte geht auch durch diesen Punkt. So können wir kontrollieren.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Ein Punkt auf der Mittelsenkrechten von AB ist … Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['gleich weit von A und B entfernt', 'näher bei A', 'immer genau in der Mitte von AB'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 1, saetze: ['Auf der Mittelsenkrechten ist jeder Punkt von beiden Dörfern [gleich] weit weg.', 'Zwei Mittelsenkrechten schneiden sich im [Treffpunkt].', 'Die [dritte] Mittelsenkrechte geht zur Kontrolle auch durch diesen Punkt.'] }],
      nach: [{ art: 'sprechen', auftrag: 'Zeichnet drei Punkte (eure „Dörfer“) auf ein Blatt. Konstruiert den Treffpunkt mit zwei Mittelsenkrechten. Prüft mit dem Zirkel: Ist er von allen gleich weit weg?', stufe: 3, karten: [
        { titel: 'Drei Linien', text: ['Höhe: Ecke ⊥ Seite', 'Mittelsenkrechte: durch die Mitte, ⊥', 'Winkelhalbierende: Winkel halbieren'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre den Unterschied zwischen einer Höhe und einer Mittelsenkrechten im Dreieck. Zeichne eine kleine Skizze dazu.', anfaenge: ['Eine Höhe geht …', 'Eine Mittelsenkrechte geht …', 'Der Unterschied: …'], zeilen: 6 },
  },
]

export const LEKTIONEN = matheLektionen(8, EXTRAS)

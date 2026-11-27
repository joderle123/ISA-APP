// Mathematik · Modul 9 „Rationale Zahlen, Polynome und Pythagoras“ (Voie de préparation) – Modulheft.
// Lektionen, Erklärungen und Übungen: aus dem Mathe-Programm (Programm VP Mathematik, Modul 9: rationale Zahlen vergleichen und
// ordnen, Rechenregeln und Klammern, Monome und Polynome, ausmultiplizieren und ausklammern, Quadrat und Quadratwurzel,
// Satz des Pythagoras und Umkehrung, Längen in Körpern, Parallele und Senkrechte durch einen Punkt, achsensymmetrische Figuren).
// Neu hier: Szenen aus dem Alltag, Bilder, Schreibaufträge „Erklären“. Personen, Preise und Zahlen: ausgedacht.

import { matheModul, matheLektionen } from './mathe-gemeinsam.mjs'

const B = (z, n) => `{{${z}/${n}}}` // Bruch im Heft

export const MODUL = matheModul(9, {
  titelFr: 'Nombres rationnels, polynômes et Pythagore',
  unterFr: 'Comparer des nombres rationnels, calculer avec des monômes et des polynômes, appliquer le théorème de Pythagore et construire avec précision.',
  deckbild: ['lina:froh:zeigen', 'yusuf:froh:zeigen-hoch', 'amira:froh:stehen-zeigen'],
  blasen: [{ t: 'a² + b² = c²', x: 12, y: 112 }, { t: '2x(x + 5)', x: 116, y: 98 }, { t: '−0,75 < 0,5', x: 164, y: 150 }],
  themenIcons: ['math-equal-greater', 'math-x-plus-y', 'vector-triangle', 'line'],
})

const EXTRAS = [
  // 1 Rationale Zahlen vergleichen und ordnen
  {
    fr: 'Je compare et je range des nombres rationnels (décimaux et fractions, positifs et négatifs) sur la droite graduée et avec < et >.',
    bild: ['lea:froh:handy', 'ben:froh:stehen'],
    hoeren: {
      was: 'Die Wetter-App', wo: 'Bushaltestelle · früh am Morgen', titel: 'Wo ist es am kältesten?',
      situation: 'Lea und Ben warten auf den Bus. Lea schaut in die Wetter-App: In der Nacht war es fast überall unter null.',
      bild: ['lea:froh:handy', 'ben:froh:stehen'], sprecher: { Lea: 'w2', Ben: 'm3' },
      text: [
        ['Lea', 'In der Wetter-App steht für heute Nacht: Clervaux minus 3,5 Grad, Vianden minus drei Viertel Grad, Luxemburg minus 1,2 Grad.'],
        ['Ben', 'Wo war es am kältesten? Minus 3,5 ist am weitesten unter null.'],
        ['Lea', 'Und minus drei Viertel – das sind minus 0,75. Das ist wärmer als minus 1,2.'],
        ['Ben', 'Also von kalt nach warm: minus 3,5, minus 1,2, minus 0,75.'],
        ['Lea', 'Und Remich hatte plus 0,5 Grad. Da war es am wärmsten.'],
        ['Ben', 'Am Zahlenstrahl ganz rechts. Dann fahre ich heute lieber nach Remich.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist kälter: −3,5 °C oder −1,2 °C? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['−3,5 °C', '−1,2 °C'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: [`−${B(3, 4)} = [−0,75]`, 'Von kalt nach warm: [−3,5] < [−1,2] < [−0,75] < [0,5]'] }],
      nach: [{ art: 'sprechen', auftrag: 'Schaut in eine Wetter-App (oder nehmt die Karte der Lehrperson). Ordnet die Temperaturen von fünf Orten. Wo ist der Unterschied am größten?', stufe: 2, karten: [
        { titel: 'Ordnen', text: ['links = kleiner', 'negativ < 0 < positiv', 'Brüche → Dezimalzahl'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, warum −5 kleiner ist als −2, obwohl 5 größer ist als 2.', anfaenge: ['Am Zahlenstrahl …', 'Bei Temperaturen …', 'Darum …'] },
  },
  // 2 Rechenregeln und Klammern
  {
    fr: 'Je calcule des expressions avec parenthèses, puissances et nombres négatifs en respectant les priorités.',
    bild: ['finn:verwirrt:stehen', 'chloe:froh:erklaeren'],
    hoeren: {
      was: 'Streit um eine Rechnung', wo: 'Pause · Gruppenchat', titel: '23 oder 35?',
      situation: 'Im Gruppenchat steht eine Rechenaufgabe. Finn und Chloe haben verschiedene Ergebnisse.',
      bild: ['finn:verwirrt:stehen', 'chloe:froh:erklaeren'], sprecher: { Finn: 'm3', Chloe: 'w2' },
      text: [
        ['Finn', 'Im Chat stand: 3 plus 4 mal 5. Ich sage 35.'],
        ['Chloe', 'Ich sage 23. Punkt vor Strich: 4 mal 5 sind 20, plus 3 sind 23.'],
        ['Finn', 'Und wenn ich wirklich zuerst 3 plus 4 rechnen will?'],
        ['Chloe', 'Dann musst du Klammern setzen: Klammer auf, 3 plus 4, Klammer zu, mal 5. Dann sind es 35.'],
        ['Finn', 'Und minus 2 hoch 2? Mein Taschenrechner sagt minus 4.'],
        ['Chloe', 'Weil zuerst die Potenz kommt: 2 hoch 2 ist 4, dann das Minus davor. Mit Klammern um die minus 2 ist es plus 4.'],
      ],
      vor: [{ art: 'mc', auftrag: '3 + 4 · 5 = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['23', '35', '27'], r: 0 }] }],
      beim: [{ art: 'rechnen', auftrag: 'Rechne mit.', stufe: 2, items: [{ a: '3 + 4 · 5', l: '23', raum: 1 }, { a: '(3 + 4) · 5', l: '35', raum: 1 }, { a: '−2²  und  (−2)²', l: '−4 und 4', raum: 1 }] }],
      nach: [{ art: 'sprechen', auftrag: 'Klammer-Rätsel: Schreibt 2 + 6 · 3 − 1 an. Wie viele verschiedene Ergebnisse könnt ihr nur mit Klammern erreichen?', stufe: 3, karten: [
        { titel: 'Reihenfolge', text: ['1. Klammern', '2. Potenzen', '3. Punkt (· :)', '4. Strich (+ −)'] }] }],
    },
    erklaeren: { auftrag: 'Finn rechnet 3 + 4 · 5 = 35. Erkläre seinen Fehler und wie er Klammern setzen müsste, damit 35 stimmt.', anfaenge: ['Finn hat …', 'Richtig ist …', 'Mit Klammern …'] },
  },
  // 3 Monome und Polynome addieren und subtrahieren
  {
    fr: 'Je reconnais monômes et polynômes, je réduis les termes semblables et j’additionne et je soustrais des polynômes.',
    bild: ['jana:froh:erklaeren', 'tom:froh:stehen'],
    hoeren: {
      was: 'Lichterketten für das Schulfest', wo: 'Schulhof · Bühnen planen', titel: 'Wie viele Meter Lichterkette?',
      situation: 'Jana und Tom planen zwei Bühnen für das Schulfest. Die Länge steht noch nicht fest. Rundherum soll eine Lichterkette hängen.',
      bild: ['jana:froh:erklaeren', 'tom:froh:stehen'], sprecher: { Jana: 'w2', Tom: 'm3' },
      text: [
        ['Jana', 'Die große Bühne ist x Meter lang und 4 Meter breit.'],
        ['Tom', 'Rundherum: x plus 4 plus x plus 4 – also 2x plus 8.'],
        ['Jana', 'Die kleine Bühne ist einen Meter kürzer und 3 Meter breit.'],
        ['Tom', 'Dann 2 mal Klammer x minus 1, plus 2 mal 3. Das sind 2x minus 2 plus 6, also 2x plus 4.'],
        ['Jana', 'Zusammen: 2x plus 8 plus 2x plus 4.'],
        ['Tom', 'x zu x, Zahl zu Zahl: 4x plus 12.'],
        ['Jana', 'Wenn die große Bühne 6 Meter lang wird?'],
        ['Tom', '4 mal 6 plus 12 – wir brauchen 36 Meter Lichterkette.'],
      ],
      vor: [{ art: 'mc', auftrag: '2x + 8 + 2x + 4 = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['4x + 12', '16x', '4x + 8'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['Große Bühne: 2x + [8]', 'Kleine Bühne: 2(x − 1) + 2 · 3 = [2x + 4]', 'Zusammen: [4x + 12]', 'Für x = 6: [36] m'] }],
      nach: [{ art: 'sprechen', auftrag: 'Zeichnet zwei Rechtecke mit Seiten wie (x + 2) und 3. Schreibt den Umfang beider als Polynom und fasst zusammen. Die anderen prüfen mit einer Zahl für x.', stufe: 3, karten: [
        { titel: 'Zusammenfassen', text: ['nur Gleichartiges', 'x² zu x²', 'x zu x', 'Zahl zu Zahl'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, warum man 3x² + 2x nicht zu 5x² oder 5x³ zusammenfassen darf.', anfaenge: ['x² bedeutet …', 'x bedeutet …', 'Darum …'] },
  },
  // 4 Ausmultiplizieren
  {
    fr: 'Je multiplie des monômes entre eux et je développe le produit d’un monôme par un polynôme.',
    bild: ['yusuf:froh:laptop', 'opa:froh:erklaeren'],
    hoeren: {
      was: 'Die neue Terrasse', wo: 'Garten · Terrasse planen', titel: 'Wie groß wird die Fläche?',
      situation: 'Yusuf plant mit seinem Opa eine Terrasse. Ein Teil der Länge steht noch nicht fest.',
      bild: ['opa:froh:erklaeren', 'yusuf:froh:laptop'], sprecher: { Opa: 'm2', Yusuf: 'm1' },
      text: [
        ['Opa', 'Die Terrasse wird 3 Meter breit. Die Länge wissen wir noch nicht: x Meter für die Platten, dazu 2 Meter für die Bank.'],
        ['Yusuf', 'Dann ist die Fläche 3 mal Klammer x plus 2.'],
        ['Opa', 'Und wie viel ist das ohne Klammer?'],
        ['Yusuf', 'Ich nehme jedes Stück mal 3: 3 mal x plus 3 mal 2. Das sind 3x plus 6 Quadratmeter.'],
        ['Opa', 'Und wenn die Terrasse 2x breit und x plus 5 lang wird?'],
        ['Yusuf', '2x mal x ist 2x², 2x mal 5 ist 10x. Also 2x² plus 10x.'],
        ['Opa', 'Prüf es mal mit x gleich 2.'],
        ['Yusuf', '4 Meter mal 7 Meter sind 28. Und 2 mal 4 plus 20 sind auch 28. Passt!'],
      ],
      vor: [{ art: 'mc', auftrag: '3(x + 2) = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['3x + 6', '3x + 2', 'x + 6'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['3(x + 2) = [3x] + [6]', '2x(x + 5) = [2x²] + [10x]', 'Probe für x = 2: 4 · 7 = [28] und 8 + 20 = [28]'] }],
      nach: [{ art: 'sprechen', auftrag: 'Zeichnet ein Rechteck, das in zwei Teile geteilt ist (z. B. 4 breit, x + 3 lang). Schreibt die Fläche einmal mit Klammer und einmal ausmultipliziert. Prüft mit einer Zahl.', stufe: 2, karten: [
        { titel: 'Ausmultiplizieren', text: ['Bögen zeichnen', 'jedes Glied mal', 'Vorzeichen beachten', 'x · x = x²'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre mit einem Rechteck, warum 3(x + 2) = 3x + 6 ist.', anfaenge: ['Das Rechteck ist …', 'Ich teile es in …', 'Darum …'] },
  },
  // 5 Ausklammern
  {
    fr: 'Je factorise par le plus grand facteur commun et je connais les mots développer et factoriser.',
    bild: ['mia:froh:stehen', 'lehrer:froh:erklaeren'],
    hoeren: {
      was: 'Die Hausaufgabe', wo: 'Klassenzimmer · Hausaufgaben besprechen', titel: 'Richtig – aber noch nicht fertig',
      situation: 'Mia zeigt dem Mathelehrer ihre Hausaufgabe. Sie hat ausgeklammert und ist unsicher.',
      bild: ['mia:froh:stehen', 'lehrer:froh:erklaeren'], sprecher: { Mia: 'w2', Mathelehrer: 'm2' },
      text: [
        ['Mia', 'Ich habe 12x plus 18 ausgeklammert: 2 mal Klammer 6x plus 9. Ist das falsch?'],
        ['Mathelehrer', 'Multiplizier mal aus. Was kommt heraus?'],
        ['Mia', '12x plus 18. Also stimmt es!'],
        ['Mathelehrer', 'Es stimmt, aber es geht noch weiter. In der Klammer haben 6 und 9 noch einen gemeinsamen Teiler.'],
        ['Mia', 'Die 3! Dann ist es 2 mal 3 – also 6 mal Klammer 2x plus 3.'],
        ['Mathelehrer', 'Genau. Nimm gleich den größten gemeinsamen Teiler, den ggT von 12 und 18.'],
        ['Mia', 'Der ggT ist 6. Das nächste Mal suche ich zuerst den ggT.'],
      ],
      vor: [{ art: 'mc', auftrag: 'ggT von 12 und 18? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['6', '2', '36'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['12x + 18 = 2([6x + 9]) – stimmt, ist aber nicht fertig', 'ggT(12; 18) = [6]', '12x + 18 = 6([2x + 3])'] }],
      nach: [{ art: 'sprechen', auftrag: 'Fehler-Jagd: Jede Person schreibt eine Ausklammer-Aufgabe mit einem kleinen Fehler (falscher Faktor oder falsches Vorzeichen). Die anderen finden ihn mit der Probe.', stufe: 3, karten: [
        { titel: 'Ausklammern', text: ['ggT suchen', 'vor die Klammer', 'jedes Glied teilen', 'Probe: ausmultiplizieren'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, wie du mit der Probe prüfst, ob du richtig ausgeklammert hast. Nimm 8x − 20 als Beispiel.', anfaenge: ['Ich klammere aus: …', 'Dann multipliziere ich …', 'Wenn …, dann …'] },
  },
  // 6 Quadrat und Quadratwurzel
  {
    fr: 'Je calcule des carrés et des racines carrées, aussi avec des nombres décimaux et la calculatrice, et j’arrondis de façon sensée.',
    bild: ['chloe:froh:blatt', 'noah:froh:laptop'],
    hoeren: {
      was: 'Das Poster', wo: 'Kunstraum · Poster zuschneiden', titel: 'Wie lang ist eine Seite?',
      situation: 'Chloe möchte ein quadratisches Poster für die Ausstellung. Es darf einen halben Quadratmeter groß sein.',
      bild: ['chloe:froh:blatt', 'noah:froh:laptop'], sprecher: { Chloe: 'w2', Noah: 'm3' },
      text: [
        ['Chloe', 'Mein Poster soll ein Quadrat sein und 0,5 Quadratmeter groß.'],
        ['Noah', 'Dann ist die Seite die Wurzel aus 0,5. Schätzen: 0,7 mal 0,7 sind 0,49.'],
        ['Chloe', 'Also ungefähr 0,7 Meter – 70 Zentimeter. Und genau?'],
        ['Noah', 'Taschenrechner: 0,7071… Auf Zentimeter gerundet sind das 71 Zentimeter.'],
        ['Chloe', 'Probe: 0,71 mal 0,71 – 0,5041. Ein kleines bisschen zu groß.'],
        ['Noah', 'Dann schneid 70,7 Zentimeter, wenn du ganz genau sein willst.'],
      ],
      vor: [{ art: 'mc', auftrag: '0,7² = ? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['0,49', '1,4', '4,9'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['0,7 · 0,7 = [0,49]', '√0,5 ≈ [0,71] m = [71] cm', 'Probe: 0,71² = [0,5041]'] }],
      nach: [{ art: 'sprechen', auftrag: 'Messt eine quadratische Fläche im Raum (Fliese, Tischplatte, Notizzettel). Berechnet die Fläche. Gebt nur die Fläche an die andere Gruppe – sie rechnet die Seite zurück.', stufe: 2, karten: [
        { titel: 'Quadrat und Wurzel', text: ['Seite → Fläche: quadrieren', 'Fläche → Seite: Wurzel', 'erst schätzen, dann rechnen'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, warum √0,49 = 0,7 ist und nicht 0,07.', anfaenge: ['0,7 · 0,7 = …', '0,07 · 0,07 = …', 'Darum …'] },
  },
  // 7 Der Satz des Pythagoras
  {
    fr: 'Je connais le théorème de Pythagore, je calcule le côté manquant d’un triangle rectangle et j’utilise la réciproque.',
    bild: ['sami:froh:stehen', 'lehrerin:froh:erklaeren'],
    hoeren: {
      was: 'Das Hochbeet', wo: 'Schulgarten · Hochbeet bauen', titel: 'Ist die Ecke wirklich gerade?',
      situation: 'Sami baut mit der Gärtnerin der Schule ein Hochbeet. Die Ecke soll genau rechtwinklig werden – ohne Geodreieck.',
      bild: ['sami:froh:stehen', 'lehrerin:froh:erklaeren'], sprecher: { Sami: 'm3', Gärtnerin: 'w1' },
      text: [
        ['Sami', 'Wie prüfe ich, ob die Ecke genau rechtwinklig ist? Ein Geodreieck ist viel zu klein.'],
        ['Gärtnerin', 'Miss 60 Zentimeter an der einen Seite und 80 an der anderen. Dann die Schräge dazwischen.'],
        ['Sami', 'Warum genau diese Zahlen?'],
        ['Gärtnerin', 'Weil 60 zum Quadrat plus 80 zum Quadrat genau 100 zum Quadrat ist: 3.600 plus 6.400 sind 10.000.'],
        ['Sami', 'Die Schräge ist 98 Zentimeter.'],
        ['Gärtnerin', 'Dann ist die Ecke nicht rechtwinklig – sie ist etwas zu spitz. Drück die Bretter ein bisschen auseinander.'],
        ['Sami', 'Jetzt: genau 100 Zentimeter. Ein rechter Winkel!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Welche Seite ist im rechtwinkligen Dreieck die längste? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Hypotenuse', 'eine Kathete', 'alle sind gleich lang'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['60² + 80² = [3.600] + [6.400] = [10.000]', '√10.000 = [100] cm', 'Gemessen 98 cm → die Ecke ist [nicht] rechtwinklig'] }],
      nach: [{ art: 'sprechen', auftrag: 'Prüft im Schulhaus oder auf dem Hof eine Ecke mit der 60-80-100-Regel (oder 30-40-50). Ist sie wirklich rechtwinklig? Erklärt, warum die Regel funktioniert.', stufe: 3, karten: [
        { titel: 'Pythagoras', text: ['a² + b² = c²', 'c liegt gegenüber dem rechten Winkel', 'Umkehrung: Gilt es, ist das Dreieck rechtwinklig.'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre, wie man mit einem Maßband und dem Satz des Pythagoras prüft, ob eine Ecke rechtwinklig ist.', anfaenge: ['Ich messe …', 'Dann rechne ich …', 'Wenn …, dann …'], zeilen: 6 },
  },
  // 8 Pythagoras im Alltag und in Körpern
  {
    fr: 'Je repère des triangles rectangles dans la vie quotidienne et dans les solides et je calcule des longueurs (échelle, diagonale, diagonale de l’espace).',
    bild: ['lina:froh:zeigen', 'chef:froh:erklaeren'],
    hoeren: {
      was: 'Eine Rampe für alle', wo: 'Schuleingang · Rampe planen', titel: 'Wie lang wird die Rampe?',
      situation: 'Am Eingang der Schule gibt es drei Stufen. Der Hausmeister plant eine Rampe, damit auch Personen im Rollstuhl hineinkommen. Lina hilft beim Rechnen.',
      bild: ['chef:froh:erklaeren', 'lina:froh:zeigen'], sprecher: { Hausmeister: 'm2', Lina: 'w2' },
      text: [
        ['Hausmeister', 'Die drei Stufen sind zusammen 50 Zentimeter hoch. Die Rampe darf nicht zu steil sein. Waagerecht braucht sie 6 Meter.'],
        ['Lina', 'Dann ist die Rampe selbst die Hypotenuse. 6 zum Quadrat plus 0,5 zum Quadrat – 36 plus 0,25 sind 36,25.'],
        ['Hausmeister', 'Und die Wurzel?'],
        ['Lina', 'Ungefähr 6,02 Meter. Nur 2 Zentimeter länger als 6 Meter!'],
        ['Hausmeister', 'Genau. Bei flachen Rampen ist die Schräge kaum länger. Wir bestellen 6,10 Meter, dann haben wir etwas Reserve.'],
        ['Lina', 'Gut, dass wir gerechnet haben. Sonst hätten Sie vielleicht 6,50 Meter bestellt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Welche Seite ist hier die Hypotenuse? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Rampe', 'die Höhe der Stufen', 'der Boden'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 2, saetze: ['6² + 0,5² = [36] + [0,25] = [36,25]', '√36,25 ≈ [6,02] m', 'Bestellt werden [6,10] m'] }],
      nach: [{ art: 'sprechen', auftrag: 'Sucht im Schulhaus Stellen, wo ein rechtwinkliges Dreieck versteckt ist (Treppe, Rampe, Regal, Tafel-Diagonale). Messt zwei Seiten, rechnet die dritte aus und messt nach.', stufe: 3, karten: [
        { titel: 'Sachaufgabe', text: ['Skizze zeichnen', 'rechter Winkel?', 'Hypotenuse markieren', 'rechnen, Antwortsatz'] }] }],
    },
    erklaeren: { auftrag: 'Beschreibe eine Situation aus deinem Alltag, in der du mit Pythagoras eine Länge berechnen kannst. Zeichne eine Skizze und rechne.', anfaenge: ['Meine Situation: …', 'Der rechte Winkel ist …', 'Ich rechne: …'], zeilen: 7 },
  },
  // 9 Parallele, Senkrechte und Spiegelbilder
  {
    fr: 'Je trace avec l’équerre la parallèle et la perpendiculaire à une droite passant par un point, et je construis des figures symétriques.',
    bild: ['amira:froh:stehen-zeigen', 'jana:froh:erklaeren'],
    hoeren: {
      was: 'Das Klassen-Logo', wo: 'Kunstraum · T-Shirt-Logo', titel: 'Links und rechts genau gleich',
      situation: 'Amira zeichnet das Logo für die T-Shirts der Klasse. Es soll achsensymmetrisch sein. Jana hilft mit dem Geodreieck.',
      bild: ['amira:froh:stehen-zeigen', 'jana:froh:erklaeren'], sprecher: { Amira: 'w2', Jana: 'w1' },
      text: [
        ['Amira', 'Das Logo soll links und rechts genau gleich aussehen.'],
        ['Jana', 'Dann zeichne zuerst die Spiegelachse in die Mitte. Danach nur die linke Hälfte.'],
        ['Amira', 'Und wie bekomme ich die rechte Hälfte genau hin?'],
        ['Jana', 'Jeden Eckpunkt spiegeln: Geodreieck mit der Mittellinie auf die Achse, senkrecht messen, auf der anderen Seite gleich weit abtragen.'],
        ['Amira', 'Die Spitze ist 3 Zentimeter links von der Achse – also kommt sie 3 Zentimeter nach rechts.'],
        ['Jana', 'Und die zwei Streifen unten sollen parallel sein. Dafür nimmst du die Hilfslinien vom Geodreieck.'],
        ['Amira', 'Fertig. Mit dem Spiegel geprüft – passt!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Ein Punkt liegt 3 cm links von der Achse. Wo liegt sein Spiegelpunkt? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['3 cm rechts von der Achse', '6 cm rechts von der Achse', 'auf der Achse'], r: 0 }] }],
      beim: [{ art: 'luecken', auftrag: 'Lies mit und ergänze.', stufe: 1, saetze: ['Zuerst die [Spiegelachse] zeichnen.', 'Jeden [Eckpunkt] senkrecht zur Achse spiegeln.', 'Parallele Streifen: mit den [Hilfslinien] des Geodreiecks.'] }],
      nach: [{ art: 'sprechen', auftrag: 'Entwerft zu zweit ein symmetrisches Logo (für eine Klasse, einen Verein oder ein Team). Eine Person zeichnet die Hälfte, die andere spiegelt. Prüft mit einem Spiegel.', stufe: 2, karten: [
        { titel: 'Geodreieck', text: ['Mittellinie → senkrecht', 'Hilfslinien → parallel', 'gleich weit → spiegeln'] }] }],
    },
    erklaeren: { auftrag: 'Erkläre jemandem, der das Geodreieck nicht kennt, wie man eine Parallele durch einen Punkt zeichnet.', anfaenge: ['Zuerst lege ich …', 'Dann schiebe ich …', 'Zum Schluss …'], zeilen: 6 },
  },
]

export const LEKTIONEN = matheLektionen(9, EXTRAS)

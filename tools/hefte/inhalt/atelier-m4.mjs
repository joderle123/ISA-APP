// Atelier · Modul 4 (6P) „Planen und zeichnen“ – Enseignement pratique, Voie de préparation.
// Transversale Kompetenzen (Leitfaden VP): Fiche technique lesen und erstellen, Grundrechnen anwenden, selbstständig planen.
// Multimodal: technische Zeichnung lesen (Linienarten, Bemaßung, Ansichten), Stückliste, Materialbedarf, Arbeitsplan,
// Projekt „Handyhalter“ von der Idee bis zum Plan. Kein offizieller Modul-Referenzrahmen öffentlich: begründeter Vorschlag.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { brettZeichnung, ansichten, linienarten } from './praxis-bilder.mjs'

export const MODUL = sachModul('atelier', 4, {
  titel: 'Planen und zeichnen',
  titelFr: 'Planifier et dessiner',
  unter: 'Skizzen und technische Zeichnungen lesen, Ansichten verstehen, eine Stückliste schreiben, Material berechnen und einen Arbeitsplan machen – für dein eigenes Projekt.',
  unterFr: 'Croquis, dessin technique, vues, nomenclature, calcul du matériel, plan de travail.',
  farbe: '#1f6aa0',
  deckbild: ['tom:froh:blatt', 'lea:froh:stehen-zeigen', 'sami:froh:stehen'],
  blasen: [{ t: 'Erst planen!', x: 8, y: 104 }, { t: 'Wie viel Holz?', x: 122, y: 92 }, { t: 'Ø 8', x: 178, y: 150 }],
  aussprache: { 'Ø(?! ?\\d)': 'das Durchmesser-Zeichen', '„mm“': '„Millimeter“', '\\bin mm\\b': 'in Millimetern', ' = ': ' gleich ', 'Ø ?(\\d+)': 'Durchmesser \\1 Millimeter', '(\\d+) × (\\d+) × (\\d+) mm': '\\1 mal \\2 mal \\3 Millimeter', '(\\d+) mm\\b': '\\1 Millimeter', '\\b1 : 2\\b': 'eins zu zwei', '\\b2 : 1\\b': 'zwei zu eins', '\\b1 : 1\\b': 'eins zu eins', '\\bPos\\.': 'Position' },
  themen: [
    { titel: { de: 'Zeichnungen lesen', fr: 'Lire un dessin' }, icon: 'ruler-measure', lektionen: 3 },
    { titel: { de: 'Planen', fr: 'Planifier' }, icon: 'clipboard-list', lektionen: 3 },
  ],
})

const PLAN = '#1f6aa0', IDEE = '#2f8a6b', HOLZ = '#a0612b'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Skizze und technische Zeichnung · Linienarten', titel: 'Von der Skizze zur Zeichnung', untertitel: 'Eine Idee im Kopf wird erst zur Skizze, dann zur genauen Zeichnung. Du lernst den Unterschied, die wichtigsten Linienarten und zeichnest selbst.',
    ziel: { de: 'Ich unterscheide Skizze und technische Zeichnung und kenne die wichtigsten Linienarten.', fr: 'Je distingue croquis et dessin technique et je connais les principaux types de traits.' },
    bild: ['tom:froh:blatt', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Zeichne!',
      aufgaben: [
        { art: 'fragen', auftrag: 'Zeichne in einer Minute aus dem Kopf einen Stuhl. Vergleicht: Würde ein Schreiner nach eurer Zeichnung den gleichen Stuhl bauen?', stufe: 1, fragen: [{ f: '', zeilen: 3, l: 'Individuelle Zeichnung; meist nicht – es fehlen Maße und genaue Ansichten.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Technisches Zeichnen (vereinfacht)', titel: 'Die Sprache der Technik',
      absaetze: [
        '### Die Skizze',
        'Eine **Skizze** zeichnet man schnell, **freihand**, mit Bleistift. Sie zeigt eine Idee. Sie muss nicht schön sein, aber man soll erkennen, was gemeint ist. Oft schreibt man schon die wichtigsten Maße dazu.',
        '### Die technische Zeichnung',
        'Eine **technische Zeichnung** ist genau: mit Lineal und Winkel gezeichnet, **maßstabsgerecht** und mit allen Maßen. Alle, die sie lesen, verstehen sie gleich – auf der ganzen Welt. Darum sagt man: Die technische Zeichnung ist die **Sprache der Technik**.',
        '### Die Linienarten',
        'Jede Linie hat eine Bedeutung. Eine **breite Volllinie** zeigt **sichtbare Kanten**. Eine **Strichlinie** zeigt **verdeckte Kanten**, die man von vorn nicht sieht. Eine **Strichpunktlinie** zeigt **Mittellinien**, zum Beispiel die Mitte einer Bohrung. Dünne Volllinien mit Pfeilen sind **Maßlinien**.',
        '### Der Maßstab',
        '**1 : 1** heißt: in Wirklichkeit gleich groß. **1 : 2** heißt: halb so groß gezeichnet. **2 : 1** heißt: doppelt so groß gezeichnet, für sehr kleine Teile. Maße schreibt man immer in **Millimetern**, ohne „mm“ dahinter.',
      ],
      woerter: [['die Skizze', 'le croquis'], ['freihand', 'à main levée'], ['die technische Zeichnung', 'le dessin technique'], ['maßstabsgerecht', 'à l’échelle'], ['die Kante', 'l’arête'], ['verdeckt', 'caché'], ['die Mittellinie', 'l’axe'], ['der Maßstab', 'l’échelle']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Skizze oder technische Zeichnung? Kreuze an.', stufe: 1, kopf: ['', 'Skizze', 'technische Zeichnung'], breiten: [56, 22, 22], zeilen: [['freihand gezeichnet', '[x]', ''], ['mit allen Maßen', '', '[x]'], ['maßstabsgerecht', '', '[x]'], ['schnell, um eine Idee zu zeigen', '[x]', '']] },
        { art: 'fragen', auftrag: 'Ein Teil ist in Wirklichkeit 200 mm lang. Wie lang ist es auf der Zeichnung im Maßstab 1 : 2?', stufe: 2, fragen: [{ f: '', l: '100 mm' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt · Planungstisch', titel: 'Tom hat eine Idee',
      situation: 'Tom will ein kleines Regal für seine Modellautos bauen. Er zeigt Herrn Steffen seine Zeichnung.',
      bild: ['tom:froh:blatt', 'lehrer:froh:erklaeren'], sprecher: { Tom: 'm3', 'Herr Steffen': 'm1' },
      text: [
        ['Tom', 'Herr Steffen, schauen Sie: Ich will ein Regal für meine Modellautos bauen. Hier ist meine Zeichnung.'],
        ['Herr Steffen', 'Schöne Idee! Das ist eine gute Skizze. Ich sehe sofort, was du willst: drei Fächer übereinander.'],
        ['Tom', 'Kann ich gleich anfangen zu sägen?'],
        ['Herr Steffen', 'Noch nicht ganz. Wie breit soll das Regal sein? Wie tief? Wie dick sind die Bretter?'],
        ['Tom', 'Hm … so ungefähr 40 Zentimeter breit.'],
        ['Herr Steffen', 'Ungefähr reicht für die Säge nicht. Miss zuerst deine Autos: Wie hoch ist das größte? Dann weißt du, wie hoch ein Fach sein muss.'],
        ['Tom', 'Das größte ist 6 Zentimeter hoch.'],
        ['Herr Steffen', 'Dann plane 8 Zentimeter pro Fach, damit du gut hineingreifen kannst. Und dann machen wir aus deiner Skizze eine technische Zeichnung – mit allen Maßen in Millimetern.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Fach in einem Regal? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Platz zwischen zwei Brettern, wo man etwas hinstellt', 'eine Schublade mit Schloss'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was will Tom bauen?', l: 'ein Regal mit drei Fächern für Modellautos' }, { f: 'Was fehlt in Toms Skizze?', zeilen: 2, l: 'genaue Maße: Breite, Tiefe, Brettdicke, Höhe der Fächer' }, { f: 'Wie hoch soll ein Fach sein? Warum?', zeilen: 2, l: '8 cm (80 mm), weil das größte Auto 6 cm hoch ist und man gut hineingreifen soll' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was würdet ihr gern in der Werkstatt bauen? Beschreibt eure Idee in drei Sätzen.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich möchte … bauen.', 'Es soll … groß sein.', 'Ich brauche …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Skizze und Zeichnung', punkte: ['**Skizze**: freihand, schnell, Idee', '**technische Zeichnung**: genau, maßstabsgerecht, alle Maße', 'Maße in **mm** (ohne Einheit)'] },
         { titel: 'Linienarten', nummern: true, punkte: ['**breite Volllinie**: sichtbare Kanten', '**Strichlinie**: verdeckte Kanten', '**Strichpunktlinie**: Mittellinien', 'Maßstab **1 : 2** = halb so groß'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Welche Linie zeigt was? Schreibe die Bedeutung.', stufe: 1, html: linienarten(), liste: [['1', 'sichtbare Kante (breite Volllinie)'], ['2', 'verdeckte Kante (Strichlinie)'], ['3', 'Mittellinie (Strichpunktlinie)']], spalten: 1 },
      { art: 'fragen', auftrag: 'Zeichne eine Skizze von einem Gegenstand in deinem Mäppchen (Radiergummi, Spitzer …). Schreibe drei Maße dazu, die du mit dem Lineal gemessen hast.', stufe: 2, fragen: [{ f: '', zeilen: 5, l: 'Individuelle Skizze mit drei gemessenen Maßen in mm.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre in eigenen Worten: Warum braucht man in der Technik genaue Zeichnungen?', stufe: 2,
        anfaenge: ['Genaue Zeichnungen braucht man, weil …', 'Ohne Maße …', 'Ein Beispiel: …'], zeilen: 6,
        beispiel: 'Genaue Zeichnungen braucht man, weil viele Menschen nach demselben Plan arbeiten. Ohne Maße baut jeder etwas anderes, und am Ende passt nichts zusammen. Ein Beispiel: Wenn eine Fabrik Schrauben macht und eine andere Fabrik die Muttern, müssen beide genau die gleichen Maße haben.' },
    ],
    check: ['Ich unterscheide Skizze und technische Zeichnung.', 'Ich kenne drei Linienarten.', 'Ich verstehe den Maßstab.'],
  },
  // ================================================================ 2
  {
    thema: 'Bemaßung lesen', titel: 'Was sagen die Zahlen?', untertitel: 'Maßlinien, Pfeile, Ø: In einer Zeichnung steht alles, was man zum Bauen braucht. Du liest die Maße eines Bretts mit zwei Bohrungen ab und rechnest damit.',
    ziel: { de: 'Ich lese Maße aus einer technischen Zeichnung ab und rechne damit.', fr: 'Je lis les cotes d’un dessin technique et je calcule avec elles.' },
    bild: ['lea:froh:stehen-zeigen', 'sami:verwirrt:stehen'],
    start: {
      was: 'Kennst du das Zeichen?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was bedeutet das Zeichen Ø vor einer Zahl? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Durchmesser (Breite eines Kreises)', 'Null', 'durchschnittlich'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Anleitung', titel: 'So liest du eine Bemaßung',
      material: ['eine technische Zeichnung', 'Bleistift', 'Lineal'],
      schritte: [
        { icon: 'ruler-measure', text: 'Suche die **Maßlinien**: dünne Linien mit **Pfeilen** an beiden Enden. Sie zeigen, **von wo bis wo** gemessen wird.' },
        { icon: 'arrows-horizontal', text: 'Die **Maßhilfslinien** führen von der Kante des Teils zur Maßlinie. So sieht man genau, welche Kante gemeint ist.' },
        { icon: 'number', text: 'Die **Maßzahl** steht über der Maßlinie. Sie ist immer in **Millimetern**, auch wenn „mm“ nicht dasteht.' },
        { icon: 'circle', text: '**Ø** vor einer Zahl bedeutet **Durchmesser**: so breit ist ein Loch oder ein rundes Teil.' },
        { icon: 'plus', text: 'Fehlt ein Maß, kann man es oft **ausrechnen**: zum Beispiel Gesamtlänge minus die anderen Maße.' },
      ],
      danach: ['In der Werkstatt misst man nie mit dem Lineal auf der Zeichnung nach – man nimmt immer die **Maßzahl**. Die Zeichnung kann kleiner oder größer sein als das echte Teil.'],
      woerter: [['die Bemaßung', 'la cotation'], ['die Maßlinie', 'la ligne de cote'], ['der Pfeil', 'la flèche'], ['die Maßzahl', 'la cote'], ['der Durchmesser', 'le diamètre'], ['die Bohrung', 'le perçage'], ['der Abstand', 'la distance'], ['ausrechnen', 'calculer']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'In welcher Einheit stehen die Maße auf einer Zeichnung?', l: 'in Millimetern' }, { f: 'Warum misst man nicht mit dem Lineal auf der Zeichnung nach?', zeilen: 2, l: 'Die Zeichnung kann kleiner oder größer sein als das echte Teil (Maßstab); es zählt die Maßzahl.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt', titel: 'Wo kommt das Loch hin?',
      situation: 'Sami soll in ein Brett zwei Löcher bohren. Er versteht die Zeichnung nicht ganz. Lea erklärt.',
      bild: ['sami:verwirrt:blatt', 'lea:froh:erklaeren'], sprecher: { Sami: 'm3', Lea: 'w3' },
      text: [
        ['Sami', 'Hier steht 20. Aber 20 was? Und von wo?'],
        ['Lea', 'Das sind 20 Millimeter. Schau: Die Maßlinie geht vom linken Rand bis zur Mitte vom Loch. Also: 20 Millimeter vom linken Rand bis zur Mitte des Lochs.'],
        ['Sami', 'Und das zweite Loch? Da steht kein Maß.'],
        ['Lea', 'Das Brett ist symmetrisch. Das zweite Loch ist auch 20 Millimeter vom Rand, aber vom rechten.'],
        ['Sami', 'Und wie weit sind die Löcher voneinander weg?'],
        ['Lea', 'Rechne: Das Brett ist 200 lang. Minus 20 links, minus 20 rechts. Das sind 160 Millimeter.'],
        ['Sami', 'Und Ø 8 heißt: Ich nehme den 8-Millimeter-Bohrer.'],
        ['Lea', 'Genau. Und die Mitte der Breite: 80 geteilt durch 2 – 40 Millimeter vom Rand.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „symmetrisch“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Beide Seiten sind spiegelgleich.', 'Es ist schief.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['Frage', 'Antwort'], breiten: [60, 40], zeilen: [['Abstand linkes Loch vom linken Rand', '[20 mm]'], ['Abstand rechtes Loch vom rechten Rand', '[20 mm]'], ['Abstand der Löcher voneinander', '[160 mm]'], ['Bohrer', '[8 mm]'], ['Lochmitte von der langen Kante', '[40 mm]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erklärt euch gegenseitig ein Maß aus der Zeichnung – so wie Lea.', stufe: 2, karten: [
        { titel: 'Hilfen', text: ['Die Maßlinie geht von … bis …', 'Das heißt: …', 'Man rechnet: …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Bemaßung', punkte: ['**Maßlinie** mit Pfeilen: von wo bis wo', '**Maßhilfslinie**: zur Kante', '**Maßzahl** in mm', '**Ø** = Durchmesser'] },
         { titel: 'Rechnen', punkte: ['fehlende Maße **ausrechnen**', 'Gesamtlänge **minus** Teilstücke', '**Mitte** = Maß geteilt durch 2', 'immer die **Maßzahl** nehmen, nie nachmessen'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Lies die Zeichnung und beantworte die Fragen.', stufe: 2, html: brettZeichnung({ laenge: 200, breite: 80, loch: 8, rand: 20 }),
        liste: [['Länge des Bretts', '200 mm'], ['Breite des Bretts', '80 mm'], ['Durchmesser der Löcher', '8 mm'], ['Abstand der Löcher', '160 mm'], ['Lochmitte von der langen Kante', '40 mm'], ['Fläche des Bretts in cm²', '20 cm × 8 cm = 160 cm²']], spalten: 2 },
      { art: 'rechnen', auftrag: 'Rechne die fehlenden Maße aus.', stufe: 3, spalten: 2, items: [{ a: 'Brett 300 mm lang, Loch 25 mm von jedem Ende. Abstand der Löcher?', l: '300 − 25 − 25 = 250 mm' }, { a: 'Leiste 450 mm, davon werden 2 Stücke à 180 mm gesägt (Schnitt 1 mm). Rest?', l: '450 − 180 − 1 − 180 − 1 = 88 mm' }, { a: 'Ein Brett ist 120 mm breit. Wo ist die Mitte?', l: '60 mm vom Rand' }, { a: 'Zeichnung im Maßstab 1 : 2: Eine Linie ist 45 mm lang. Wie lang ist das echte Teil?', l: '90 mm' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreibe in Sätzen das Brett aus der Zeichnung so genau, dass jemand es ohne Zeichnung bauen könnte.', stufe: 3,
        anfaenge: ['Das Brett ist …', 'Es hat …', 'Die Löcher sind …', 'Man braucht …'], zeilen: 6,
        beispiel: 'Das Brett ist 200 mm lang und 80 mm breit. Es hat zwei Löcher mit 8 mm Durchmesser. Die Löcher sind in der Mitte der Breite, also 40 mm von der langen Kante, und je 20 mm vom linken und vom rechten Ende entfernt. Man braucht einen 8-Millimeter-Bohrer.' },
    ],
    check: ['Ich erkenne Maßlinie, Maßhilfslinie und Maßzahl.', 'Ich weiß, was Ø bedeutet.', 'Ich rechne fehlende Maße aus.'],
  },
  // ================================================================ 3
  {
    thema: 'Ansichten · räumliches Denken', titel: 'Von vorn, von oben, von der Seite', untertitel: 'Ein Werkstück hat drei Dimensionen, das Papier nur zwei. Darum zeichnet man es aus verschiedenen Richtungen. Du lernst Vorderansicht, Draufsicht und Seitenansicht kennen und ordnest sie zu.',
    ziel: { de: 'Ich erkenne Vorderansicht, Draufsicht und Seitenansicht eines Werkstücks.', fr: 'Je reconnais la vue de face, de dessus et de côté d’une pièce.' },
    bild: ['noah:verwirrt:stehen', 'lea:froh:zeigen'],
    start: {
      was: 'Von oben',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie sieht ein Trinkglas von oben aus? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['wie ein Kreis', 'wie ein Rechteck', 'wie ein Dreieck'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Technisches Zeichnen (vereinfacht)', titel: 'Drei Blicke auf ein Teil',
      absaetze: [
        'Stell dir vor, du siehst eine Schachtel nur von vorn: Du weißt nicht, wie tief sie ist. Darum zeichnet man ein Werkstück aus **mehreren Richtungen**. Man nennt das **Ansichten**.',
        '**Vorderansicht:** Man schaut **von vorn** auf das Teil. Sie zeigt meist die wichtigste Form. Man sieht Breite und Höhe.',
        '**Draufsicht:** Man schaut **von oben** auf das Teil. Sie wird **unter** die Vorderansicht gezeichnet. Man sieht Breite und Tiefe.',
        '**Seitenansicht:** Man schaut **von der Seite**. Man sieht Tiefe und Höhe.',
        'In jeder Ansicht zeichnet man nur, was man aus dieser Richtung sieht – wie mit einem Foto, das ganz gerade aufgenommen ist. Kanten, die hinten versteckt sind, zeichnet man als **Strichlinie**.',
        'Am Anfang ist das schwer. Ein Trick: Nimm ein echtes Teil in die Hand und drehe es. Oder baue es aus Würfeln nach.',
      ],
      woerter: [['die Ansicht', 'la vue'], ['die Vorderansicht', 'la vue de face'], ['die Draufsicht', 'la vue de dessus'], ['die Seitenansicht', 'la vue de côté'], ['die Tiefe', 'la profondeur'], ['die Höhe', 'la hauteur'], ['drehen', 'tourner'], ['der Würfel', 'le cube']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was sieht man in welcher Ansicht? Kreuze an.', stufe: 1, kopf: ['Ansicht', 'Breite', 'Höhe', 'Tiefe'], breiten: [40, 20, 20, 20], zeilen: [['Vorderansicht', '[x]', '[x]', ''], ['Draufsicht', '[x]', '', '[x]'], ['Seitenansicht', '', '[x]', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt · mit Holzwürfeln', titel: 'Bau es nach!',
      situation: 'Noah findet Ansichten schwierig. Lea gibt ihm Holzwürfel.',
      bild: ['noah:verwirrt:stehen', 'lea:froh:zeigen'], sprecher: { Noah: 'm3', Lea: 'w3' },
      text: [
        ['Noah', 'Ich kapiere das mit den Ansichten nicht. Das sieht alles gleich aus.'],
        ['Lea', 'Warte. Hier sind Würfel. Bau mal eine Treppe: unten drei Würfel nebeneinander, darauf links noch einer.'],
        ['Noah', 'Okay. Fertig.'],
        ['Lea', 'Jetzt geh in die Hocke und schau genau von vorn. Was siehst du?'],
        ['Noah', 'Unten drei Quadrate, oben links eins. Wie ein L, das umgefallen ist.'],
        ['Lea', 'Das ist die Vorderansicht. Jetzt steh auf und schau genau von oben.'],
        ['Noah', 'Drei Quadrate in einer Reihe. Das obere sieht man nicht extra, es liegt ja auf dem linken.'],
        ['Lea', 'Genau! Das ist die Draufsicht. Und von rechts?'],
        ['Noah', 'Zwei Quadrate übereinander … Ah, jetzt verstehe ich es. Jede Ansicht zeigt nur das, was man von da aus sieht.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „in die Hocke gehen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Knie beugen und tief sitzen, ohne Stuhl', 'auf einen Stuhl steigen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was sieht Noah?', stufe: 1, kopf: ['Ansicht', 'Was sieht Noah?'], breiten: [35, 65], zeilen: [['von vorn', '[unten drei Quadrate, oben links eins (L-Form)]'], ['von oben', '[drei Quadrate in einer Reihe]'], ['von rechts', '[zwei Quadrate übereinander]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Baut zu zweit eine Figur aus Würfeln. Der andere beschreibt die drei Ansichten.', stufe: 2, karten: [
        { titel: 'Hilfen', text: ['Von vorn sehe ich …', 'Von oben sehe ich …', 'Von der Seite sehe ich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Drei Ansichten', punkte: ['**Vorderansicht**: von vorn – Breite und Höhe', '**Draufsicht**: von oben – Breite und Tiefe', '**Seitenansicht**: von der Seite – Tiefe und Höhe'] },
         { titel: 'Tipps', punkte: ['nur zeichnen, was man **aus dieser Richtung** sieht', 'versteckte Kanten: **Strichlinie**', 'schwer? **Würfel** bauen oder das Teil **drehen**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Links siehst du ein Werkstück (Winkel). Welche Ansicht ist A, B und C? Schreibe den Namen.', stufe: 2, html: ansichten(),
        liste: [['A', 'Draufsicht (von oben)'], ['B', 'Seitenansicht (von rechts)'], ['C', 'Vorderansicht (von vorn)']], spalten: 1 },
      { art: 'fragen', auftrag: 'Zeichne die drei Ansichten von einem einfachen Gegenstand (zum Beispiel einem Radiergummi oder einer Streichholzschachtel) in dein Heft.', stufe: 3, fragen: [{ f: '', zeilen: 5, l: 'Individuelle Zeichnung mit Vorderansicht, Draufsicht (darunter) und Seitenansicht.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreibe, was an Ansichten für dich schwer war und welcher Trick dir geholfen hat.', stufe: 2,
        anfaenge: ['Schwer war für mich …', 'Geholfen hat mir …', 'Jetzt verstehe ich, dass …'], zeilen: 5,
        beispiel: 'Schwer war für mich, mir vorzustellen, wie das Teil von oben aussieht. Geholfen hat mir, es mit Würfeln nachzubauen und mich wirklich darüber zu stellen. Jetzt verstehe ich, dass jede Ansicht nur das zeigt, was man aus dieser Richtung sieht.' },
    ],
    check: ['Ich kenne die drei Ansichten.', 'Ich ordne Ansichten einem Werkstück zu.', 'Ich zeichne einfache Ansichten selbst.'],
  },
  // ================================================================ 4
  {
    thema: 'Stückliste · Materialbedarf berechnen', titel: 'Was brauche ich – und wie viel?', untertitel: 'Bevor man anfängt, schreibt man eine Stückliste: alle Teile mit Anzahl, Maß und Material. Du schreibst eine Stückliste für einen Handyhalter und berechnest, wie viel Holz du brauchst und was es kostet.',
    ziel: { de: 'Ich schreibe eine Stückliste und berechne den Materialbedarf.', fr: 'J’établis une nomenclature et je calcule le besoin en matériel.' },
    bild: ['sami:froh:blatt', 'tom:froh:stehen'],
    start: {
      was: 'Einkaufsliste',
      aufgaben: [
        { art: 'fragen', auftrag: 'Wozu schreibt man vor dem Einkaufen eine Einkaufsliste? Was hat das mit der Werkstatt zu tun?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Damit man nichts vergisst und nicht zu viel kauft; in der Werkstatt ist das die Stückliste.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext', titel: 'Die Stückliste',
      absaetze: [
        'Eine **Stückliste** ist eine Tabelle mit **allen Teilen**, die man für ein Werkstück braucht. Sie hat meist diese Spalten: **Position** (Nummer des Teils), **Anzahl**, **Benennung** (Name), **Maße** (Länge × Breite × Dicke in mm) und **Material**.',
        '### Beispiel: Handyhalter',
        'Ein einfacher Handyhalter besteht aus einer **Grundplatte** (140 × 70 × 18 mm, Kiefer), einer schrägen **Stütze** (140 × 90 × 18 mm, Kiefer), einer **Leiste** vorne, damit das Handy nicht rutscht (140 × 15 × 10 mm, Buche), **4 Schrauben** aus Stahl (3,5 × 30 mm) und etwas **Holzleim**.',
        '### Materialbedarf berechnen',
        'Grundplatte und Stütze haben beide eine Seite von 140 mm und sind 18 mm dick. Man kann sie also aus **einem Brett** sägen, das 140 mm breit ist. Wie lang muss es sein? 70 mm + 90 mm = 160 mm. Dazu kommen die **Sägeschnitte** (je etwa 1 mm) und ein bisschen Reserve für saubere Kanten. Profis rechnen etwa **10 % mehr**, weil immer etwas Verschnitt entsteht.',
      ],
      woerter: [['die Stückliste', 'la nomenclature'], ['die Position', 'la position, le repère'], ['die Anzahl', 'la quantité'], ['die Benennung', 'la désignation'], ['die Grundplatte', 'la plaque de base'], ['die Stütze', 'le support'], ['der Verschnitt', 'la chute'], ['die Reserve', 'la réserve']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ergänze die Stückliste für den Handyhalter.', stufe: 1, kopf: ['Pos.', 'Anzahl', 'Benennung', 'Maße (mm)', 'Material'], breiten: [10, 12, 26, 30, 22], zeilen: [['1', '[1]', '[Grundplatte]', '[140 × 70 × 18]', '[Kiefer]'], ['2', '[1]', '[Stütze]', '[140 × 90 × 18]', '[Kiefer]'], ['3', '[1]', '[Leiste]', '[140 × 15 × 10]', '[Buche]'], ['4', '[4]', '[Schrauben]', '[3,5 × 30]', '[Stahl]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Holzlager der Schule', titel: 'Reicht das Brett?',
      situation: 'Sami und Tom holen Holz für fünf Handyhalter aus dem Lager. Sie müssen rechnen.',
      bild: ['sami:froh:blatt', 'tom:verwirrt:stehen'], sprecher: { Tom: 'm3', Sami: 'm2' },
      text: [
        ['Tom', 'Für einen Handyhalter brauchen wir 160 Millimeter von dem Kiefernbrett. Wir machen fünf. Also 800 Millimeter.'],
        ['Sami', 'Moment. Jeder Sägeschnitt nimmt einen Millimeter weg. Pro Halter sägen wir zweimal. Das sind zehn Schnitte.'],
        ['Tom', 'Also 810 Millimeter.'],
        ['Sami', 'Und Herr Steffen sagt immer: zehn Prozent Reserve. Zehn Prozent von 810 sind 81.'],
        ['Tom', 'Das macht 891. Also ungefähr 90 Zentimeter.'],
        ['Sami', 'Hier liegt ein Brett, das ist genau einen Meter lang. Das reicht!'],
        ['Tom', 'Und was kostet das? Hier steht: 6 Euro pro Meter.'],
        ['Sami', 'Dann sind es 6 Euro für alle fünf. Pro Handyhalter etwa 1,20 Euro für das Kiefernholz. Billig!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was sind 10 % von 100? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['10', '1', '100'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne die Rechnung.', stufe: 2, teile: ['5 × 160 mm = 800 mm', '10 Schnitte × 1 mm = 10 mm → 810 mm', '10 % Reserve: 81 mm → 891 mm', 'ein Brett von 1 m reicht', '6 € ÷ 5 = 1,20 € pro Halter'], ordnung: [3, 0, 4, 1, 2] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum rechnen Profis immer mit etwas Reserve?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Weil …', 'Wenn man genau so viel kauft, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Stückliste', punkte: ['**Pos.** – Nummer', '**Anzahl**', '**Benennung**', '**Maße** L × B × D in mm', '**Material**'] },
         { titel: 'Materialbedarf', nummern: true, punkte: ['Längen **addieren**', '**Sägeschnitte** dazu (je ca. 1 mm)', 'ca. **10 % Reserve**', 'passendes Brett wählen', '**Kosten** rechnen'] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Rechne den Materialbedarf.', stufe: 2, spalten: 2, items: [{ a: 'Ein Vogelhaus braucht Bretter mit 150, 150, 120 und 120 mm Länge. Wie viel ist das zusammen?', l: '540 mm' }, { a: 'Dazu 4 Sägeschnitte je 1 mm und 10 % Reserve. Wie lang muss das Brett sein? (gerundet)', l: '544 mm + 54 mm ≈ 600 mm' }, { a: 'Das Brett kostet 5 € pro Meter. Was kosten 60 cm?', l: '3 €' }, { a: 'Für 8 Vogelhäuser: Wie viele Meter Brett?', l: '8 × 0,6 m = 4,8 m' }] },
      { art: 'schneidekarten', auftrag: 'Stücklisten-Karten: Jede Gruppe zieht ein Werkstück und schreibt die Stückliste auf die Karte.', stufe: 3, neueSeite: true, titel: 'Stückliste', icon: 'clipboard-list', farbe: PLAN, spalten: 2,
        karten: [
          { text: '**Kleines Regal** für 3 Fächer', linien: 4 }, { text: '**Vogelhaus** mit Dach', linien: 4 },
          { text: '**Stiftebox** mit 4 Fächern', linien: 4 }, { text: '**Schlüsselbrett** mit 5 Haken', linien: 4 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre einem Mitschüler, wie man den Materialbedarf berechnet – mit einem eigenen Beispiel.', stufe: 2,
        anfaenge: ['Zuerst …', 'Dann …', 'Danach …', 'Zum Schluss …'], zeilen: 6,
        beispiel: 'Zuerst schreibe ich alle Teile in die Stückliste. Dann addiere ich die Längen der Teile, die aus demselben Brett kommen, zum Beispiel 200 + 200 + 100 = 500 mm. Danach rechne ich für jeden Schnitt 1 mm dazu und noch 10 % Reserve. Zum Schluss suche ich ein Brett, das lang genug ist, und rechne den Preis aus.' },
    ],
    check: ['Ich schreibe eine Stückliste.', 'Ich rechne Längen, Schnitte und Reserve zusammen.', 'Ich berechne die Materialkosten.'],
  },
  // ================================================================ 5
  {
    thema: 'Arbeitsplan · Zeit planen', titel: 'Schritt für Schritt zum Ziel', untertitel: 'Ein guter Arbeitsplan sagt, was in welcher Reihenfolge mit welchem Werkzeug passiert – und wie lange es dauert. Du schreibst einen Arbeitsplan und hörst, warum die Reihenfolge so wichtig ist.',
    ziel: { de: 'Ich erstelle einen Arbeitsplan mit Reihenfolge, Werkzeug und Zeit.', fr: 'J’établis un plan de travail avec l’ordre, les outils et le temps.' },
    bild: ['lea:froh:blatt', 'finn:verwirrt:stehen'],
    start: {
      was: 'Reihenfolge',
      aufgaben: [
        { art: 'ordnen', auftrag: 'In welcher Reihenfolge ziehst du dich an? Ordne.', stufe: 1, teile: ['Unterhemd anziehen', 'Pullover anziehen', 'Jacke anziehen', 'Jacke zumachen'], ordnung: [2, 0, 3, 1] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext', titel: 'Der Arbeitsplan',
      absaetze: [
        'Ein **Arbeitsplan** ist wie ein Fahrplan für dein Werkstück. Er hat meist diese Spalten: **Nummer**, **Arbeitsschritt**, **Werkzeug und Maschinen**, **Zeit** und **Prüfen**.',
        '### Die richtige Reihenfolge',
        'Manche Schritte müssen **vor** anderen kommen. Man bohrt Löcher, **bevor** man ein Teil an ein anderes schraubt – sonst kommt man nicht mehr heran. Man schleift, **bevor** man lackiert. Man **leimt** erst, wenn alle Teile gesägt, gebohrt und geschliffen sind – danach kann man sie kaum noch bearbeiten, und der Leim muss trocknen. Ganz zum Schluss wird **lackiert**.',
        '### Zeit einplanen',
        'Für jeden Schritt schätzt man die Zeit. **Wartezeiten** wie das Trocknen von Leim oder Lack plant man so, dass man in der Zeit etwas anderes machen kann.',
        '### Prüfen',
        'Nach wichtigen Schritten **prüft** man: Stimmen die Maße? Sitzt das Teil gerade? So findet man Fehler früh – nicht erst, wenn alles fertig ist.',
      ],
      woerter: [['der Arbeitsplan', 'le plan de travail'], ['der Arbeitsschritt', 'l’étape de travail'], ['die Reihenfolge', 'l’ordre'], ['leimen', 'coller'], ['trocknen', 'sécher'], ['lackieren', 'vernir'], ['schätzen', 'estimer'], ['prüfen', 'contrôler']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Warum bohrt man Löcher, bevor man die Teile zusammenschraubt?', zeilen: 2, l: 'Weil man sonst nicht mehr gut an die Stelle herankommt.' }, { f: 'Warum leimt man erst spät?', l: 'Weil man die Teile danach kaum noch bearbeiten kann und der Leim trocknen muss.' }, { f: 'Wozu prüft man zwischendurch?', l: 'Um Fehler früh zu finden.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt', titel: 'Zu früh lackiert',
      situation: 'Finn hat seinen Handyhalter schon lackiert. Jetzt will er noch die Leiste anschrauben.',
      bild: ['finn:enttaeuscht:stehen', 'lea:froh:erklaeren'], sprecher: { Finn: 'm3', Lea: 'w3' },
      text: [
        ['Finn', 'Mist! Ich habe den Halter lackiert, und jetzt soll ich noch die Leiste anschrauben und die Kanten schleifen.'],
        ['Lea', 'Oh nein. Wenn du jetzt schleifst, geht der Lack an den Kanten kaputt.'],
        ['Finn', 'Ich wollte schnell fertig werden. Ich habe gedacht, die Reihenfolge ist egal.'],
        ['Lea', 'Hast du keinen Arbeitsplan gemacht?'],
        ['Finn', 'Doch, aber nur im Kopf.'],
        ['Lea', 'Ich schreibe ihn immer auf. Schau: Erst sägen, dann bohren, dann schleifen, dann zusammenbauen, und ganz zum Schluss lackieren. Und nach jedem Schritt hake ich ab.'],
        ['Finn', 'Und was mache ich jetzt?'],
        ['Lea', 'Lass den Lack trocknen. Dann schleifst du die Stelle vorsichtig mit feinem Papier und lackierst sie noch einmal nach. Nicht schlimm – aber es kostet eine Stunde mehr.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „abhaken“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Häkchen setzen, wenn etwas erledigt ist', 'etwas abschneiden'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Welche Reihenfolge empfiehlt Lea?', stufe: 1, teile: ['sägen', 'bohren', 'schleifen', 'zusammenbauen', 'lackieren'], ordnung: [4, 2, 0, 3, 1] },
        { art: 'fragen', auftrag: 'Welchen Fehler hat Finn gemacht? Was muss er jetzt tun?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Er hat zu früh lackiert; jetzt muss er den Lack trocknen lassen, vorsichtig schleifen und nachlackieren.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: '„Nur im Kopf planen“ – wann reicht das, wann nicht?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Im Kopf reicht es, wenn …', 'Aufschreiben ist besser, wenn …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Arbeitsplan', punkte: ['**Nr.** und **Arbeitsschritt**', '**Werkzeug** und Maschinen', '**Zeit**', '**Prüfen**'] },
         { titel: 'Reihenfolge', nummern: true, punkte: ['**sägen**', '**bohren**', '**schleifen**', '**zusammenbauen** (leimen, schrauben)', '**lackieren** – zuletzt'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Schreibe den Arbeitsplan für den Handyhalter fertig.', stufe: 2, kopf: ['Nr.', 'Arbeitsschritt', 'Werkzeug', 'Zeit', 'Prüfen'], breiten: [8, 30, 26, 14, 22], zeilen: [['1', 'Teile anzeichnen', '[Bleistift, Lineal, Winkel]', '[15 min]', '[Maße nachmessen]'], ['2', '[Teile sägen]', '[Feinsäge, Zwinge]', '[20 min]', '[rechtwinklig?]'], ['3', '[Löcher vorbohren]', '[Handbohrer]', '[10 min]', '[an der richtigen Stelle?]'], ['4', '[schleifen 120 / 240]', '[Schleifpapier]', '[20 min]', '[glatt, keine Splitter?]'], ['5', '[leimen und schrauben]', '[Leim, Schraubendreher]', '[15 min + trocknen]', '[Handy hält?]'], ['6', '[lackieren]', '[Pinsel, Lack]', '[10 min + trocknen]', '[gleichmäßig?]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Arbeitsplan für eine Aufgabe aus deinem Alltag (zum Beispiel: Fahrrad putzen, Zimmer umräumen, Geburtstagskuchen backen).', stufe: 3,
        anfaenge: ['Mein Arbeitsplan: …', '1. …', '2. …', '3. …', '4. …', 'Prüfen: …'], zeilen: 7,
        beispiel: 'Mein Arbeitsplan: Fahrrad putzen. 1. Material holen: Eimer, Wasser, Schwamm, Bürste, Lappen (5 min). 2. Groben Dreck abbürsten (10 min). 3. Rahmen mit Schwamm waschen (15 min). 4. Kette trocknen und ölen (10 min). 5. Alles wegräumen (5 min). Prüfen: Läuft die Kette leise? Bremsen funktionieren?' },
    ],
    check: ['Ich schreibe einen Arbeitsplan.', 'Ich plane die richtige Reihenfolge.', 'Ich schätze Zeiten und plane Prüfungen ein.'],
  },
  // ================================================================ 6
  {
    thema: 'Mein Projekt planen', titel: 'Von der Idee zum Plan', untertitel: 'Jetzt planst du dein eigenes Werkstück: Skizze, Maße, Stückliste, Arbeitsplan. Du hörst, wie eine Gruppe ihr Projekt vorstellt, und prüfst deinen Plan mit einer Checkliste.',
    ziel: { de: 'Ich plane ein eigenes Werkstück vollständig.', fr: 'Je planifie entièrement une pièce personnelle.' },
    bild: ['tom:froh:blatt', 'lea:froh:stehen-zeigen'],
    start: {
      was: 'Meine Idee',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Was könntest du in der Werkstatt bauen, das du wirklich brauchst? Sammle Ideen.', stufe: 1, mitte: 'Mein Projekt', aeste: ['Handyhalter', { l: 'Stiftebox' }, { l: 'Schlüsselbrett' }, { l: 'Vogelhaus' }, { l: 'Regal' }, { l: 'Spiel' }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w1',
      quelle: 'Projekt-Anleitung', titel: 'In fünf Schritten zum Projektplan',
      material: ['Papier, Bleistift, Lineal', 'Vorlage Stückliste', 'Vorlage Arbeitsplan'],
      schritte: [
        { icon: 'bulb', text: '**Idee:** Was willst du bauen? Wofür brauchst du es? Wie groß darf es sein?' },
        { icon: 'pencil', text: '**Skizze:** Zeichne deine Idee freihand – von vorn und von oben. Schreibe die wichtigsten Maße dazu.' },
        { icon: 'clipboard-list', text: '**Stückliste:** Schreibe alle Teile mit Anzahl, Maßen und Material auf.' },
        { icon: 'calculator', text: '**Material berechnen:** Längen addieren, Sägeschnitte und 10 % Reserve dazu.' },
        { icon: 'list-numbers', text: '**Arbeitsplan:** Alle Schritte in der richtigen Reihenfolge, mit Werkzeug, Zeit und Prüfung.' },
      ],
      danach: ['Zeige deinen Plan der Lehrperson, **bevor** du anfängst. Gemeinsam prüft ihr, ob er machbar ist – mit dem Werkzeug, dem Material und der Zeit, die ihr habt.'],
      woerter: [['das Projekt', 'le projet'], ['die Idee', 'l’idée'], ['machbar', 'réalisable'], ['die Vorlage', 'le modèle'], ['vorstellen', 'présenter'], ['die Checkliste', 'la liste de contrôle'], ['verbessern', 'améliorer'], ['die Rückmeldung', 'le retour, le feedback']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Ordne die Schritte der Projektplanung.', stufe: 1, teile: ['Idee', 'Skizze mit Maßen', 'Stückliste', 'Material berechnen', 'Arbeitsplan', 'Plan der Lehrperson zeigen'], ordnung: [2, 5, 0, 3, 1, 4] },
      ],
    },
    hoeren: {
      was: 'Eine Präsentation', wo: 'Werkstatt · Projektvorstellung', titel: 'Unser Projekt: die Stiftebox',
      situation: 'Lea und Tom stellen der Klasse ihren Projektplan vor. Herr Steffen gibt eine Rückmeldung.',
      bild: ['lea:froh:erklaeren', 'tom:froh:blatt'], sprecher: { Lea: 'w3', Tom: 'm3', 'Herr Steffen': 'm1' },
      text: [
        ['Lea', 'Unser Projekt ist eine Stiftebox mit vier Fächern für den Schreibtisch. Die Box ist 160 Millimeter lang, 100 breit und 80 hoch.'],
        ['Tom', 'Hier ist unsere Stückliste: ein Boden, zwei lange und zwei kurze Seitenwände und drei Trennwände. Alles aus 10 Millimeter dickem Pappelsperrholz.'],
        ['Lea', 'Wir brauchen dafür ein Brett von etwa 70 Zentimetern – mit Reserve. Das kostet ungefähr 4 Euro.'],
        ['Tom', 'Unser Arbeitsplan hat sieben Schritte. Wir brauchen etwa vier Unterrichtsstunden.'],
        ['Herr Steffen', 'Sehr gut vorbereitet! Eine Frage: Wie haltet ihr die Trennwände fest?'],
        ['Lea', 'Mit Leim.'],
        ['Herr Steffen', 'Das kann klappen. Aber wenn ihr vorher eine kleine Nut sägt, halten sie viel besser. Schreibt das als Schritt in euren Plan.'],
        ['Tom', 'Okay, dann sind es acht Schritte. Danke!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Nut? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine schmale Rille im Holz, in die ein anderes Teil passt', 'ein Nagel'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze den Projektsteckbrief.', stufe: 1, kopf: ['', 'Stiftebox'], breiten: [35, 65], zeilen: [['Maße', '[160 × 100 × 80 mm]'], ['Material', '[10 mm Pappelsperrholz]'], ['Brett mit Reserve', '[ca. 70 cm, ca. 4 €]'], ['Zeit', '[ca. 4 Unterrichtsstunden]'], ['Verbesserung', '[Nut für die Trennwände]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Stellt euch gegenseitig eure Projektpläne vor. Gebt eine freundliche Rückmeldung: Was ist gut? Was könnte man verbessern?', stufe: 3, karten: [
        { titel: 'Rückmeldung geben', text: ['Mir gefällt, dass …', 'Eine Frage: …', 'Vielleicht könntest du …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Projektplan', nummern: true, punkte: ['**Idee**', '**Skizze** mit Maßen', '**Stückliste**', '**Material** berechnen', '**Arbeitsplan**'] },
         { titel: 'Vor dem Start', punkte: ['Plan der Lehrperson **zeigen**', '**machbar**? Werkzeug, Material, Zeit', '**Rückmeldung** annehmen und verbessern'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Mein Projektplan: Fülle die Karten für dein eigenes Werkstück aus. Klebe sie in dein Heft oder hänge sie an deinen Arbeitsplatz.', stufe: 3, neueSeite: true, titel: 'Mein Projekt', icon: 'bulb', farbe: IDEE, spalten: 2,
        karten: [
          { text: '**Idee und Zweck:** Was baue ich? Wofür?', linien: 3 }, { text: '**Skizze** (von vorn und von oben, mit Maßen)', linien: 5 },
          { text: '**Stückliste** (Pos., Anzahl, Teil, Maße, Material)', linien: 5 }, { text: '**Material und Kosten**', linien: 3 },
        ] },
      { art: 'tabelle', auftrag: 'Checkliste: Prüfe deinen Plan, bevor du ihn abgibst.', stufe: 2, kopf: ['Mein Plan hat …', 'ja', 'noch nicht'], breiten: [64, 18, 18], zeilen: [['eine Skizze mit allen wichtigen Maßen', '', ''], ['eine vollständige Stückliste', '', ''], ['eine Materialberechnung mit Reserve', '', ''], ['einen Arbeitsplan in der richtigen Reihenfolge', '', ''], ['Prüfschritte', '', ''], ['eine Zeitschätzung', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Werkstatt-Bericht: Wie bist du beim Planen vorgegangen? Was war leicht, was schwer? Was hast du nach der Rückmeldung verbessert?', stufe: 2,
        anfaenge: ['Mein Projekt ist …', 'Beim Planen war leicht …', 'Schwer war …', 'Nach der Rückmeldung habe ich …'], zeilen: 7,
        beispiel: 'Mein Projekt ist ein Schlüsselbrett mit fünf Haken für den Flur. Beim Planen war leicht, die Skizze zu machen. Schwer war die Materialberechnung, weil ich die Sägeschnitte vergessen hatte. Nach der Rückmeldung habe ich den Abstand der Haken auf 50 mm vergrößert, damit dicke Schlüsselbunde Platz haben.' },
    ],
    check: ['Ich plane ein Werkstück von der Idee bis zum Arbeitsplan.', 'Ich prüfe meinen Plan mit einer Checkliste.', 'Ich nehme Rückmeldungen an und verbessere meinen Plan.'],
  },
]

// Culture générale · Modul 2 (7P) – Schwerpunkt Biologie, Gesundheit und nachhaltige Entwicklung
// (MENJE-Leitfaden Voie de préparation: Module 2, 5, 8). Themen: Kennzeichen des Lebens, Pflanzen (Versuch),
// Waldtiere in Luxemburg, Nahrungsketten, gesund essen, Schlaf, Bewegung, Müll vermeiden und trennen.
// Gesundheitsangaben nach allgemein anerkannten Empfehlungen (WHO u. a.), vereinfacht und mit „etwa“.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { pflanze, nahrungskette, ernaehrungspyramide, teller, balken } from './sach-bilder.mjs'

export const MODUL = sachModul('culge', 2, {
  titel: 'Leben und gesund bleiben',
  titelFr: 'Le vivant et la santé',
  unter: 'Was lebt? Pflanzen im Versuch, Tiere im Wald, Nahrungsketten, gesund essen, gut schlafen, viel bewegen und Müll vermeiden – in acht Lektionen.',
  unterFr: 'Le vivant, les plantes, les animaux de la forêt, les chaînes alimentaires, bien manger, bien dormir, bouger et réduire les déchets.',
  farbe: '#3d8a3a',
  deckbild: ['lea:froh:stehen-zeigen', 'yusuf:froh:stehen', 'mia:froh:tasse'],
  blasen: [{ t: 'Lebt das?', x: 16, y: 112 }, { t: 'Was frisst wer?', x: 118, y: 98 }, { t: 'Gute Nacht!', x: 164, y: 150 }],
  themen: [
    { titel: { de: 'Lebewesen', fr: 'Les êtres vivants' }, icon: 'plant-2', lektionen: 4 },
    { titel: { de: 'Gesund leben', fr: 'Vivre en bonne santé' }, icon: 'heartbeat', lektionen: 3 },
    { titel: { de: 'Unsere Umwelt', fr: 'Notre environnement' }, icon: 'recycle', lektionen: 1 },
  ],
})

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Kennzeichen des Lebens', titel: 'Lebt das?', untertitel: 'Ein Roboter bewegt sich, ein Feuer wächst – aber leben sie? Du lernst die Kennzeichen des Lebens und prüfst Dinge wie eine Forscherin.',
    ziel: { de: 'Ich nenne die Kennzeichen des Lebens und entscheide, ob etwas lebt.', fr: 'Je cite les caractéristiques du vivant et je décide si quelque chose est vivant.' },
    bild: ['lea:verwirrt:stehen', 'noah:froh:erklaeren'],
    start: {
      was: 'Lebendig oder nicht?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was meinst du: Lebt das? Kreuze an. (Am Ende der Lektion prüfst du noch einmal.)', stufe: 1, kopf: ['', 'lebt', 'lebt nicht', 'weiß nicht'], breiten: [46, 18, 18, 18], zeilen: [['ein Baum', '[x]', '', ''], ['ein Roboterhund', '', '[x]', ''], ['ein Pilz', '[x]', '', ''], ['ein Feuer', '', '[x]', ''], ['ein Samenkorn', '[x]', '', '']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      titel: 'Woran erkennt man Leben?',
      absaetze: [
        'Menschen, Tiere, Pflanzen und Pilze sind **Lebewesen**. Steine, Wasser oder ein Auto sind **nicht lebendig**. Doch wie unterscheidet man sie? Forscherinnen und Forscher haben **Kennzeichen des Lebens** gesammelt. Ein Lebewesen hat **alle** diese Kennzeichen:',
        '### Die Kennzeichen',
        '**Ernährung**: Es nimmt Stoffe auf, die ihm Energie geben. **Atmung**: Es braucht Gase aus der Luft oder dem Wasser. **Wachstum**: Es wird größer und entwickelt sich. **Fortpflanzung**: Es kann Nachkommen bekommen. **Reizbarkeit**: Es reagiert auf seine Umwelt, zum Beispiel auf Licht oder Berührung. **Bewegung**: Es kann sich oder Teile von sich bewegen – auch Pflanzen drehen ihre Blätter zum Licht.',
        '### Vorsicht, Falle!',
        'Ein Feuer „frisst“ Holz, wird größer und braucht Luft. Trotzdem lebt es nicht: Es kann sich nicht selbst fortpflanzen und besteht nicht aus **Zellen**. Alle Lebewesen bestehen aus winzigen Bausteinen, den Zellen. Man sieht sie nur mit dem Mikroskop.',
      ],
      woerter: [['das Lebewesen', 'l’être vivant'], ['das Kennzeichen', 'la caractéristique'], ['die Ernährung', 'la nutrition'], ['die Atmung', 'la respiration'], ['das Wachstum', 'la croissance'], ['die Fortpflanzung', 'la reproduction'], ['die Reizbarkeit', 'la sensibilité (aux stimuli)'], ['die Zelle', 'la cellule']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Kennzeichen ist das? Verbinde.', stufe: 1, links: ['Eine Katze bekommt Junge.', 'Eine Sonnenblume dreht sich zur Sonne.', 'Ein Kind wird jedes Jahr größer.', 'Ein Fisch nimmt Sauerstoff aus dem Wasser.', 'Ein Hase frisst Löwenzahn.'], rechts: ['Fortpflanzung', 'Reizbarkeit und Bewegung', 'Wachstum', 'Atmung', 'Ernährung'] },
        { art: 'fragen', auftrag: 'Warum lebt ein Roboterhund nicht, obwohl er bellt und läuft?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Er wächst nicht, ernährt sich nicht, atmet nicht, pflanzt sich nicht fort und besteht nicht aus Zellen.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Diskussion', wo: 'Biologieunterricht · Klasse 7P2', titel: 'Ist ein Samenkorn lebendig?',
      situation: 'Frau Kremer stellt der Klasse eine Rätselfrage.',
      bild: ['lehrerin:froh:erklaeren', 'lea:verwirrt:stehen'], sprecher: { 'Frau Kremer': 'w1', Lea: 'w3', Noah: 'm3' },
      text: [
        ['Frau Kremer', 'Hier habe ich ein Bohnensamenkorn. Lebt es – ja oder nein?'],
        ['Lea', 'Nein. Es bewegt sich nicht, es frisst nicht, es macht gar nichts.'],
        ['Noah', 'Aber wenn man es in Erde steckt und gießt, wächst eine Pflanze. Also lebt es doch!'],
        ['Frau Kremer', 'Ihr habt beide gute Gründe. Das Samenkorn „schläft“: Es lebt, aber ganz langsam. Wir sagen: Es ruht.'],
        ['Lea', 'Wie lange kann es schlafen?'],
        ['Frau Kremer', 'Manche Samen viele Jahre. Wenn es Wasser, Wärme und Luft bekommt, wacht es auf. Das nennt man Keimen.'],
        ['Noah', 'Können wir das ausprobieren?'],
        ['Frau Kremer', 'Ja! Nächste Woche legen wir Bohnen auf feuchte Watte. Dann beobachtet ihr jeden Tag.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was braucht ein Samenkorn zum Keimen? Rate. Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Wasser', 'Wärme', 'Luft', 'Musik'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Lea meint, das Samenkorn lebt nicht.', true], ['Noah meint, es lebt, weil eine Pflanze daraus wächst.', true], ['Ein Samenkorn ist tot.', false], ['Wenn ein Samen aufwacht, nennt man das Keimen.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Sucht euch drei schwierige Fälle (zum Beispiel: Wolke, Virus, gefällter Baum) und diskutiert: Lebt das? Prüft jedes Kennzeichen.', stufe: 3, karten: [
        { titel: 'So diskutiert ihr', text: ['Ich glaube, das lebt, weil …', 'Ein Kennzeichen fehlt: …', 'Das ist schwierig, denn …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Kennzeichen des Lebens', punkte: ['**Ernährung** und **Atmung**', '**Wachstum** und **Entwicklung**', '**Fortpflanzung**', '**Reizbarkeit** und **Bewegung**', 'besteht aus **Zellen**'] },
         { titel: 'So prüfst du', nummern: true, punkte: ['Nimm die Liste der Kennzeichen.', 'Prüfe jedes Kennzeichen einzeln.', 'Nur wenn **alle** zutreffen: Es lebt.'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Prüfe das Feuer mit allen Kennzeichen. Kreuze an.', stufe: 2, kopf: ['Kennzeichen', 'ja', 'nein'], breiten: [60, 20, 20], zeilen: [['ernährt sich (braucht Holz)', '[x]', ''], ['braucht Luft', '[x]', ''], ['wird größer', '[x]', ''], ['pflanzt sich selbst fort', '', '[x]'], ['besteht aus Zellen', '', '[x]'], ['Ergebnis: Das Feuer …', '', '[x] lebt nicht']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre einem jüngeren Kind, woran man erkennt, ob etwas lebt. Nimm ein Beispiel.', stufe: 2,
        anfaenge: ['Etwas lebt, wenn …', 'Zum Beispiel …', 'Ein … lebt nicht, weil …'], zeilen: 7,
        beispiel: 'Etwas lebt, wenn es isst, atmet, wächst, Kinder bekommen kann und auf seine Umwelt reagiert. Zum Beispiel eine Katze: Sie frisst, atmet, wird größer, bekommt Junge und läuft weg, wenn es laut wird. Ein Stein lebt nicht, weil er nichts davon kann.' },
    ],
    check: ['Ich nenne die Kennzeichen des Lebens.', 'Ich prüfe Beispiele mit allen Kennzeichen.', 'Ich erkläre, warum ein Feuer nicht lebt.'],
  },
  // ================================================================ 2
  {
    thema: 'Pflanzen · Aufbau · Versuch', titel: 'Was Pflanzen brauchen', untertitel: 'Wurzel, Stängel, Blatt und Blüte: Du beschriftest eine Pflanze, hörst eine Gärtnerin und planst einen echten Versuch mit Kresse.',
    ziel: { de: 'Ich benenne die Teile einer Pflanze und führe einen Versuch mit Vermutung, Beobachtung und Ergebnis durch.', fr: 'Je nomme les parties d’une plante et je réalise une expérience (hypothèse, observation, résultat).' },
    bild: ['lea:froh:stehen', 'opa:froh:stehen'],
    start: {
      was: 'Pflanzen im Alltag',
      aufgaben: [
        { art: 'mc', auftrag: 'Welche Teile von Pflanzen isst du? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Wurzel (Karotte)', 'Blatt (Salat)', 'Frucht (Apfel)', 'Samen (Erbsen)', 'Stängel (Spargel)'], r: [0, 1, 2, 3, 4] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext mit Schaubild', art: 'text', stimme: 'w2', nummern: false,
      titel: 'Eine Pflanze – ein kleines Kraftwerk',
      absaetze: [
        'Die **Wurzeln** halten die Pflanze in der Erde fest. Mit ihnen nimmt sie **Wasser** und **Mineralstoffe** auf. Der **Stängel** trägt die Pflanze und leitet das Wasser nach oben – wie ein Rohr.',
        'In den grünen **Blättern** passiert etwas Erstaunliches: Mit **Licht**, Wasser und dem Gas **Kohlenstoffdioxid** aus der Luft stellt die Pflanze ihre eigene Nahrung her: Zucker. Dabei gibt sie **Sauerstoff** ab – den Sauerstoff, den wir atmen. Diesen Vorgang nennt man **Fotosynthese**.',
        'Die **Blüte** ist für die Fortpflanzung da. Insekten wie Bienen tragen Blütenstaub von Blüte zu Blüte. Danach entstehen **Früchte** mit **Samen**, aus denen neue Pflanzen wachsen.',
      ],
      bildHtml: pflanze({ breite: 72 }),
      woerter: [['die Wurzel', 'la racine'], ['der Stängel', 'la tige'], ['das Blatt', 'la feuille'], ['die Blüte', 'la fleur'], ['die Knospe', 'le bourgeon'], ['der Samen', 'la graine'], ['die Fotosynthese', 'la photosynthèse'], ['der Sauerstoff', 'l’oxygène']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte die Pflanze im Lesetext. Schreibe die Wörter zu den Nummern.', stufe: 1, html: '', liste: [['1', 'die Blüte'], ['2', 'das Blatt'], ['3', 'der Stängel'], ['4', 'die Wurzel'], ['5', 'die Knospe']], spalten: 3 },
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 2, saetze: ['Mit den [Wurzeln] nimmt die Pflanze Wasser auf.', 'In den Blättern macht die Pflanze aus Licht, Wasser und Kohlenstoffdioxid [Zucker].', 'Dabei gibt sie [Sauerstoff] ab.', 'Diesen Vorgang nennt man [Fotosynthese].'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Gemeinschaftsgarten · Samstag', titel: 'Warum ist meine Pflanze gelb?',
      situation: 'Lea hat eine Pflanze im Kinderzimmer. Sie wird gelb. Lea fragt eine Gärtnerin um Rat.',
      bild: ['lea:besorgt:stehen', 'verkaeuferin:froh:erklaeren'], sprecher: { Lea: 'w3', Gärtnerin: 'w1' },
      text: [
        ['Lea', 'Guten Tag. Meine Pflanze wird immer gelber. Ich gieße sie jeden Tag!'],
        ['Gärtnerin', 'Jeden Tag? Wie viel Wasser denn?'],
        ['Lea', 'Ein ganzes Glas. Ich will, dass sie genug hat.'],
        ['Gärtnerin', 'Das ist lieb gemeint, aber zu viel. Wenn die Erde immer nass ist, bekommen die Wurzeln keine Luft und faulen. Dann wird die Pflanze gelb.'],
        ['Lea', 'Oh nein. Und wo soll sie stehen?'],
        ['Gärtnerin', 'Hell, aber nicht direkt in der prallen Mittagssonne. Und nicht direkt über der Heizung.'],
        ['Lea', 'Sie steht im Schrank-Regal, ziemlich dunkel …'],
        ['Gärtnerin', 'Dann stell sie ans Fenster und gieß nur, wenn die Erde oben trocken ist. Steck einfach einen Finger hinein.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was kann einer Zimmerpflanze schaden? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['zu viel Wasser', 'zu wenig Licht', 'direkte Hitze von der Heizung', 'ein Platz am hellen Fenster'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was macht Lea falsch? Was rät die Gärtnerin?', stufe: 1, kopf: ['Lea macht …', 'Die Gärtnerin rät …'], breiten: [50, 50], zeilen: [['[jeden Tag ein ganzes Glas Wasser]', '[nur gießen, wenn die Erde oben trocken ist (Fingerprobe)]'], ['[Pflanze steht dunkel im Regal]', '[hell ans Fenster, aber nicht in die pralle Sonne]']] },
        { art: 'fragen', auftrag: 'Warum wird die Pflanze bei zu viel Wasser gelb?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Die Wurzeln bekommen keine Luft und faulen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erstellt zu zweit einen Pflegezettel für eine Pflanze in eurem Klassenzimmer.', stufe: 2, karten: [
        { titel: 'Pflegezettel', text: ['Licht: …', 'Wasser: …', 'Wärme: …', 'Wer kümmert sich?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Teile der Pflanze', punkte: ['**Wurzel**: festhalten, Wasser aufnehmen', '**Stängel**: tragen, leiten', '**Blatt**: Fotosynthese', '**Blüte**: Fortpflanzung → Frucht, Samen'] },
         { titel: 'Ein Versuch hat Schritte', nummern: true, punkte: ['**Frage**: Was will ich herausfinden?', '**Vermutung**: Was glaube ich?', '**Durchführung**: genau nach Plan', '**Beobachtung**: genau notieren', '**Ergebnis**: War die Vermutung richtig?'] }],
        [{ art: 'tipp', titel: 'Fair vergleichen', text: 'Bei einem Versuch änderst du **nur eine Sache** (zum Beispiel das Licht). Alles andere bleibt **gleich** (gleiche Samen, gleiches Wasser, gleiche Wärme).' }],
      ],
    },
    ueben: [
      { art: 'versuch', auftrag: 'Führt den Versuch in der Klasse durch. Beobachtet eine Woche lang.', stufe: 2,
        frage: 'Brauchen Kressesamen Licht zum Wachsen?',
        material: ['2 kleine Schalen', 'Watte', 'Kressesamen', 'Wasser', 'ein dunkler Schrank'],
        schritte: ['Legt in beide Schalen feuchte Watte.', 'Streut gleich viele Samen darauf.', 'Stellt Schale A ans Fenster, Schale B in den dunklen Schrank.', 'Haltet die Watte in beiden Schalen feucht.', 'Beobachtet jeden Tag und vergleicht nach einer Woche.'],
        loesung: { vermutung: 'z. B. Ohne Licht wächst die Kresse nicht.', beobachtung: 'Beide keimen. Kresse A ist grün und kräftig. Kresse B ist gelblich-weiß, lang und dünn.', ergebnis: 'Zum Keimen braucht Kresse kein Licht, aber zum gesunden, grünen Wachsen braucht sie Licht (Fotosynthese).' } },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Versuchsbericht: Was habt ihr gemacht, was beobachtet, was gelernt?', stufe: 2,
        anfaenge: ['Unsere Frage war: …', 'Wir haben …', 'Wir haben beobachtet, dass …', 'Das bedeutet: …'], zeilen: 8,
        beispiel: 'Unsere Frage war: Braucht Kresse Licht? Wir haben zwei Schalen mit Kresse gesät, eine am Fenster, eine im Schrank. Wir haben beobachtet, dass beide gekeimt sind, aber die Kresse im Schrank gelb und dünn war. Das bedeutet: Kresse braucht Licht, um grün und gesund zu wachsen.' },
    ],
    check: ['Ich benenne Wurzel, Stängel, Blatt und Blüte.', 'Ich erkläre die Fotosynthese mit einfachen Worten.', 'Ich führe einen Versuch Schritt für Schritt durch.'],
  },
  // ================================================================ 3
  {
    thema: 'Tiere im Wald · Wirbeltiere · Steckbrief', titel: 'Wer wohnt im Wald?', untertitel: 'Fuchs, Wildschwein, Specht und Feuersalamander: Du lernst Tiergruppen kennen, hörst einen Förster und schreibst einen Tier-Steckbrief.',
    ziel: { de: 'Ich ordne Waldtiere den Tiergruppen zu und schreibe einen Steckbrief.', fr: 'Je classe des animaux de la forêt et j’écris une fiche d’identité.' },
    bild: ['finn:ueberrascht:stehen', 'vater:froh:erklaeren'],
    start: {
      was: 'Spuren im Wald',
      aufgaben: [
        { art: 'mc', auftrag: 'Welche Tiere leben in Luxemburgs Wäldern? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Wildschwein', 'Reh', 'Fuchs', 'Löwe', 'Specht', 'Känguru'], r: [0, 1, 2, 4] }] },
      ],
    },
    lesen: {
      was: 'Steckbriefe', art: 'dokumente', stimme: 'w1',
      quelle: 'Infotafeln an einem Waldlehrpfad (Texte vereinfacht)', titel: 'Bewohner des Waldes',
      dokumente: [
        { stil: 'karte', stimme: 'm1', kopf: '**Der Rotfuchs** – Säugetier', text: ['Größe: etwa 70 cm (ohne Schwanz) · Nahrung: Mäuse, Insekten, Früchte, Abfälle', 'Der Fuchs ist schlau und anpassungsfähig. Er lebt im Wald, aber auch am Rand von Städten. Er jagt vor allem in der Dämmerung.'] },
        { stil: 'karte', stimme: 'w2', kopf: '**Der Buntspecht** – Vogel', text: ['Größe: etwa 23 cm · Nahrung: Insekten unter der Rinde, Samen', 'Mit seinem kräftigen Schnabel hämmert er Löcher in Bäume. So findet er Nahrung und baut seine Bruthöhle.'] },
        { stil: 'karte', stimme: 'm1', kopf: '**Das Wildschwein** – Säugetier', text: ['Größe: bis 1,60 m · Nahrung: Eicheln, Wurzeln, Würmer, Pilze', 'Wildschweine leben in Gruppen, den Rotten. Mit der Schnauze wühlen sie den Boden um. Im Frühling haben die Frischlinge braun-gelbe Streifen.'] },
        { stil: 'karte', stimme: 'w2', kopf: '**Der Feuersalamander** – Amphib (Lurch)', text: ['Größe: etwa 20 cm · Nahrung: Würmer, Schnecken, Insekten', 'Schwarz mit gelben Flecken – das warnt Feinde: Seine Haut ist giftig. Er mag feuchte Wälder mit Bächen, zum Beispiel im Müllerthal. Er ist geschützt.'] },
      ],
      woerter: [['das Säugetier', 'le mammifère'], ['der Vogel', 'l’oiseau'], ['das Amphib (der Lurch)', 'l’amphibien'], ['das Reptil', 'le reptile'], ['der Fisch', 'le poisson'], ['das Wirbeltier', 'le vertébré'], ['die Dämmerung', 'le crépuscule'], ['geschützt', 'protégé']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ergänze die Tabelle.', stufe: 1, kopf: ['Tier', 'Tiergruppe', 'Nahrung (zwei Beispiele)'], breiten: [26, 30, 44], zeilen: [['Rotfuchs', '[Säugetier]', '[Mäuse, Insekten]'], ['Buntspecht', '[Vogel]', '[Insekten, Samen]'], ['Wildschwein', '[Säugetier]', '[Eicheln, Würmer]'], ['Feuersalamander', '[Amphib]', '[Würmer, Schnecken]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Die gelben Flecken des Salamanders warnen Feinde.', true], ['Junge Wildschweine heißen Frischlinge.', true], ['Der Specht frisst vor allem Mäuse.', false], ['Der Fuchs lebt nur tief im Wald.', false]] },
      ],
    },
    hoeren: {
      was: 'Eine Waldführung', wo: 'Wald bei Echternach · Waldlehrpfad', titel: 'Mit dem Förster unterwegs',
      situation: 'Förster Laurent führt die Klasse durch den Wald. Plötzlich bleibt er stehen.',
      bild: ['vater:froh:zeigen', 'finn:ueberrascht:stehen'], sprecher: { 'Förster Laurent': 'm1', Finn: 'm3', Lina: 'w3' },
      text: [
        ['Förster Laurent', 'Pssst! Schaut mal auf den Boden. Was seht ihr?'],
        ['Finn', 'Die Erde ist ganz umgegraben. Wie mit einem kleinen Bagger!'],
        ['Förster Laurent', 'Das waren Wildschweine. Sie suchen Eicheln und Würmer. Heute Nacht war eine ganze Rotte hier.'],
        ['Lina', 'Sind Wildschweine gefährlich?'],
        ['Förster Laurent', 'Normalerweise laufen sie weg. Aber eine Mutter mit Frischlingen kann sich verteidigen. Darum: Abstand halten und ruhig weggehen.'],
        ['Finn', 'Und was ist das für ein Klopfen da oben?'],
        ['Förster Laurent', 'Ein Buntspecht! Er hämmert bis zu zwanzig Mal pro Sekunde gegen den Baum. Sein Kopf hält das aus, weil sein Schädel besonders gebaut ist.'],
        ['Lina', 'Warum lässt man den toten Baum dort stehen?'],
        ['Förster Laurent', 'Totholz ist voller Leben: Käfer, Pilze, Spechthöhlen. Ein Wald braucht auch alte und tote Bäume.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist Totholz? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['abgestorbene Bäume und Äste', 'Holz im Kamin', 'ein Spielzeug aus Holz'], r: 0 }] }],
      beim: [
        { art: 'luecken', auftrag: 'Hör zu und ergänze.', stufe: 1, saetze: ['Die Wildschweine suchen [Eicheln] und [Würmer].', 'Eine Gruppe Wildschweine heißt [Rotte].', 'Der Specht hämmert bis zu [zwanzig] Mal pro Sekunde.', 'Im Totholz leben Käfer, [Pilze] und Spechte.'] },
        { art: 'fragen', auftrag: 'Was soll man tun, wenn man Wildschweinen begegnet?', stufe: 2, fragen: [{ f: '', l: 'Abstand halten und ruhig weggehen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Waldregeln: Was sollte man im Wald tun und lassen? Erstellt zu zweit fünf Regeln.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['auf den Wegen bleiben', 'keinen Müll liegen lassen', 'leise sein', 'Hunde an die Leine', 'nichts anzünden'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Wirbeltiere (mit Wirbelsäule)', punkte: ['**Säugetiere**: Fell, trinken Milch (Fuchs, Reh)', '**Vögel**: Federn, legen Eier (Specht)', '**Reptilien**: Schuppen (Eidechse)', '**Amphibien**: feuchte Haut, Land und Wasser (Salamander, Frosch)', '**Fische**: Schuppen, Kiemen (Forelle)'] },
         { titel: 'Wirbellose (ohne Wirbelsäule)', punkte: ['Insekten (Käfer, Ameise)', 'Spinnen', 'Schnecken', 'Würmer'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Wirbeltier oder Wirbelloses? Kreuze an.', stufe: 1, kopf: ['', 'Wirbeltier', 'wirbellos'], breiten: [50, 25, 25], zeilen: [['Reh', '[x]', ''], ['Hirschkäfer', '', '[x]'], ['Waldeidechse', '[x]', ''], ['Regenwurm', '', '[x]'], ['Eichhörnchen', '[x]', ''], ['Weinbergschnecke', '', '[x]']] },
      { art: 'steckbrief', auftrag: 'Schreibe einen Steckbrief zu einem Waldtier deiner Wahl (Reh, Eichhörnchen, Dachs, Waldkauz …). Zeichne es.', stufe: 2, bildText: 'Zeichne hier dein Tier.', felder: ['Name', 'Tiergruppe', 'Größe', 'Nahrung', 'Lebensraum', 'Besonderheit'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Du bist ein Tier im Wald. Erzähle einen Tag aus deiner Sicht: Was frisst du? Wovor hast du Angst?', stufe: 2,
        anfaenge: ['Ich bin …', 'Wenn es dunkel wird, …', 'Am liebsten fresse ich …', 'Angst habe ich vor …'], zeilen: 8,
        beispiel: 'Ich bin ein Eichhörnchen. Wenn es hell wird, springe ich von Ast zu Ast. Am liebsten fresse ich Nüsse und Bucheckern. Im Herbst verstecke ich Vorräte im Boden. Angst habe ich vor dem Habicht und vor Autos auf der Straße.' },
    ],
    check: ['Ich nenne die fünf Gruppen der Wirbeltiere.', 'Ich ordne Waldtiere einer Gruppe zu.', 'Ich schreibe einen Tier-Steckbrief.'],
  },
  // ================================================================ 4
  {
    thema: 'Nahrungskette · Produzent · Konsument', titel: 'Fressen und gefressen werden', untertitel: 'Wer frisst wen? Du baust Nahrungsketten, hörst ein Wissensquiz und überlegst, was passiert, wenn ein Glied fehlt.',
    ziel: { de: 'Ich baue Nahrungsketten und erkläre, warum alle Glieder wichtig sind.', fr: 'Je construis des chaînes alimentaires et j’explique pourquoi chaque maillon est important.' },
    bild: ['yusuf:froh:erklaeren', 'chloe:ueberrascht:stehen'],
    start: {
      was: 'Wer frisst was?',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Verbinde: Wer frisst was?', stufe: 1, links: ['die Raupe', 'die Meise', 'der Fuchs', 'die Schnecke'], rechts: ['Blätter', 'Raupen und Samen', 'Mäuse', 'Salat'] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      titel: 'Alles hängt zusammen',
      absaetze: [
        'Im Frühling frisst eine **Raupe** das Blatt einer Eiche. Eine **Meise** fängt die Raupe und füttert damit ihre Jungen. Später erwischt ein **Sperber** die Meise. So entsteht eine **Nahrungskette**: Eiche → Raupe → Meise → Sperber.',
        '### Wer macht was?',
        'Am Anfang jeder Kette steht eine **Pflanze**. Sie ist der **Produzent**: Mit Sonnenlicht stellt sie ihre Nahrung selbst her. Tiere können das nicht. Sie sind **Konsumenten**: Sie fressen Pflanzen oder andere Tiere. Wenn Pflanzen und Tiere sterben, kommen die **Zersetzer**: Pilze, Bakterien und Würmer. Sie machen daraus wieder Erde mit Nährstoffen für neue Pflanzen.',
        '### Ein Netz',
        'In Wirklichkeit fressen die meisten Tiere mehr als eine Sache. Die Meise frisst auch Samen, der Fuchs auch Beeren. Viele Ketten bilden zusammen ein **Nahrungsnetz**. Fehlt ein Glied, spüren es viele andere.',
      ],
      bildHtml: nahrungskette([{ name: 'Eiche' }, { name: 'Raupe' }, { name: 'Meise' }, { name: 'Sperber' }], { rollen: ['Produzent', 'Konsument', 'Konsument', 'Konsument'] }),
      woerter: [['die Nahrungskette', 'la chaîne alimentaire'], ['das Nahrungsnetz', 'le réseau alimentaire'], ['der Produzent', 'le producteur'], ['der Konsument', 'le consommateur'], ['der Zersetzer', 'le décomposeur'], ['die Raupe', 'la chenille'], ['der Sperber', 'l’épervier'], ['die Nährstoffe', 'les nutriments']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Verbinde die Begriffe mit der Erklärung.', stufe: 1, links: ['Produzent', 'Konsument', 'Zersetzer'], rechts: ['stellt seine Nahrung mit Sonnenlicht selbst her', 'frisst Pflanzen oder Tiere', 'macht aus toten Lebewesen wieder Erde'], ordnung: [2, 0, 1] },
      ],
    },
    hoeren: {
      was: 'Ein Wissensquiz', wo: 'Schulradio · „Natur-Quiz“', titel: 'Was passiert, wenn …?',
      situation: 'Yusuf moderiert das Natur-Quiz. Chloé und Ben spielen gegeneinander.',
      bild: ['yusuf:froh:handy', 'chloe:ueberrascht:stehen'], sprecher: { Yusuf: 'm3', 'Chloé': 'w3', Ben: 'm2' },
      text: [
        ['Yusuf', 'Willkommen zum Natur-Quiz! Erste Frage: In einem Teich gibt es Algen, Kaulquappen und Fische. Wer ist der Produzent?'],
        ['Chloé', 'Die Algen! Sie machen mit Sonnenlicht ihre Nahrung.'],
        ['Yusuf', 'Richtig! Ein Punkt für Chloé. Zweite Frage: Was passiert, wenn alle Fische im Teich verschwinden?'],
        ['Ben', 'Dann gibt es viel mehr Kaulquappen, weil keiner sie frisst.'],
        ['Yusuf', 'Und dann?'],
        ['Ben', 'Hm … Dann fressen die vielen Kaulquappen fast alle Algen. Und dann haben sie selbst nichts mehr zu fressen!'],
        ['Yusuf', 'Genau! Ein Punkt für Ben. Das zeigt: Wenn ein Glied fehlt, gerät alles durcheinander. Letzte Frage: Wer räumt am Ende auf?'],
        ['Chloé', 'Die Zersetzer: Pilze und Bakterien!'],
        ['Yusuf', 'Unentschieden! Danke fürs Mitmachen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Kaulquappe? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein junger Frosch', 'ein kleiner Fisch', 'ein Insekt'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Wer ist im Teich der Produzent?', o: ['die Algen', 'die Fische', 'die Kaulquappen'], r: 0 }, { f: 'Wie endet das Quiz?', o: ['unentschieden', 'Chloé gewinnt', 'Ben gewinnt'], r: 0 }] },
        { art: 'ordnen', auftrag: 'Was passiert, wenn die Fische fehlen? Ordne.', stufe: 2, teile: ['Die Fische verschwinden.', 'Es gibt viel mehr Kaulquappen.', 'Die Kaulquappen fressen fast alle Algen.', 'Die Kaulquappen finden keine Nahrung mehr.'], ordnung: [2, 0, 3, 1] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht selbst ein „Was passiert, wenn …?“-Quiz. Denkt euch drei Fragen zu Nahrungsketten aus.', stufe: 3, karten: [
        { titel: 'Fragen-Ideen', text: ['Was passiert, wenn es keine Bienen mehr gibt?', 'Was passiert, wenn der Fuchs fehlt?', 'Was passiert ohne Zersetzer?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Nahrungskette', punkte: ['Der Pfeil **→** heißt: „wird gefressen von“.', 'Am Anfang: eine **Pflanze** (Produzent).', 'Danach: **Konsumenten**.', 'Am Ende räumen **Zersetzer** auf.'] },
         { title: '', titel: 'Gleichgewicht', punkte: ['Alle Glieder hängen zusammen.', 'Fehlt ein Glied, ändern sich **viele andere**.', 'Darum schützen wir auch kleine Tiere und Pflanzen.'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Ergänze die Nahrungsketten. Wähle aus: Gras, Fuchs, Maus, Hase, Habicht, Salat.', stufe: 2, html: nahrungskette([{ name: 'Gras' }, { name: 'Hase' }, { name: 'Fuchs' }], { leer: [0, 2] }) + nahrungskette([{ name: 'Getreide' }, { name: 'Maus' }, { name: 'Habicht' }], { leer: [1, 2] }) },
      { art: 'fragen', auftrag: 'Denk nach und antworte.', stufe: 3, fragen: [{ f: 'Ein Bauer spritzt Gift gegen Raupen. Was kann mit den Meisen passieren?', zeilen: 2, l: 'Die Meisen finden weniger Nahrung oder fressen vergiftete Raupen; es gibt weniger Meisen.' }, { f: 'Warum steht am Anfang jeder Nahrungskette eine Pflanze?', zeilen: 2, l: 'Nur Pflanzen stellen ihre Nahrung mit Sonnenlicht selbst her; alle Tiere hängen davon ab.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Zeichne eine Nahrungskette mit vier Gliedern aus dem Wald, dem Garten oder dem Wasser. Erkläre sie in Sätzen.', stufe: 2,
        anfaenge: ['Meine Nahrungskette: … → … → … → …', 'Der Produzent ist …', 'Wenn … fehlt, …'], zeilen: 7,
        beispiel: 'Meine Nahrungskette: Klee → Heuschrecke → Frosch → Storch. Der Produzent ist der Klee. Die Heuschrecke frisst den Klee, der Frosch die Heuschrecke, der Storch den Frosch. Wenn die Frösche fehlen, gibt es viel mehr Heuschrecken, und der Storch findet weniger Nahrung.' },
    ],
    check: ['Ich baue eine Nahrungskette.', 'Ich erkläre Produzent, Konsument und Zersetzer.', 'Ich erkläre, was passiert, wenn ein Glied fehlt.'],
  },
  // ================================================================ 5
  {
    thema: 'Ernährung · Pyramide · Zucker', titel: 'Gut essen – mit Genuss', untertitel: 'Was gehört auf den Teller? Du liest die Ernährungspyramide, rechnest Zucker in Würfeln und hörst ein Gespräch in der Schulkantine.',
    ziel: { de: 'Ich lese die Ernährungspyramide und bewerte, ob eine Mahlzeit ausgewogen ist.', fr: 'Je lis la pyramide alimentaire et j’évalue si un repas est équilibré.' },
    bild: ['mia:froh:tasse', 'ben:froh:stehen'],
    start: {
      was: 'Mein Frühstück',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist ein gutes Frühstück für einen langen Schultag? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Vollkornbrot mit Käse', 'Müsli mit Joghurt und Obst', 'nur ein Energydrink', 'ein Apfel und ein Glas Milch', 'gar nichts'], r: [0, 1, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Infotext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Infotext (vereinfacht, nach allgemeinen Ernährungsempfehlungen)', titel: 'Die Ernährungspyramide',
      absaetze: [
        'Unser Körper braucht viele verschiedene Stoffe: Energie, um zu lernen und zu spielen, Eiweiß für die Muskeln, Vitamine gegen Krankheiten. Kein Lebensmittel hat alles. Darum ist **Abwechslung** wichtig. Die **Ernährungspyramide** zeigt, wovon man **viel** und wovon man **wenig** essen sollte.',
        'Ganz unten stehen die **Getränke**: am besten Wasser oder ungesüßter Tee, über den Tag verteilt etwa 1,5 Liter. Darüber kommen **Gemüse und Obst** und **Getreide** wie Brot, Nudeln, Reis und Kartoffeln. In der Mitte stehen **Milchprodukte, Fleisch, Fisch und Eier** – sie sind wichtig, aber in kleineren Mengen. Oben stehen **Fette und Öle** und ganz oben **Süßes und Knabbereien**: Das darf man genießen, aber nur ab und zu.',
        '### Versteckter Zucker',
        'In vielen Getränken steckt viel Zucker. Eine Flasche Limonade (0,5 Liter) enthält oft über 50 Gramm Zucker – das sind etwa 17 Stück Würfelzucker. Die Weltgesundheitsorganisation empfiehlt, möglichst wenig zugesetzten Zucker zu essen und zu trinken.',
      ],
      bildHtml: ernaehrungspyramide({ breite: 118 }),
      woerter: [['die Ernährung', 'l’alimentation'], ['ausgewogen', 'équilibré'], ['die Abwechslung', 'la variété'], ['das Eiweiß', 'les protéines'], ['das Vitamin', 'la vitamine'], ['das Getreide', 'les céréales'], ['der Würfelzucker', 'le sucre en morceaux'], ['genießen', 'savourer']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wie oft? Kreuze an.', stufe: 1, kopf: ['', 'reichlich', 'mäßig', 'selten'], breiten: [46, 18, 18, 18], zeilen: [['Wasser', '[x]', '', ''], ['Äpfel und Karotten', '[x]', '', ''], ['Käse', '', '[x]', ''], ['Gummibärchen', '', '', '[x]'], ['Vollkornbrot', '[x]', '', ''], ['Limonade', '', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Schulkantine · Mittagspause', titel: 'Pommes oder Gemüse?',
      situation: 'Ben und Mia stehen in der Schlange in der Kantine. Es gibt zwei Menüs.',
      bild: ['ben:froh:stehen', 'mia:froh:tasse'], sprecher: { Ben: 'm3', Mia: 'w3', Köchin: 'w1' },
      text: [
        ['Köchin', 'Heute gibt es Menü eins: Hähnchen mit Reis und Gemüse. Oder Menü zwei: Schnitzel mit Pommes.'],
        ['Ben', 'Ganz klar: Schnitzel mit Pommes! Und eine Cola.'],
        ['Mia', 'Schon wieder? Du hattest gestern Pizza und vorgestern Burger.'],
        ['Ben', 'Na und? Es schmeckt eben.'],
        ['Mia', 'Klar, Pommes sind lecker. Aber dein Teller ist dann fast ganz gelb und braun. Wo ist das Gemüse?'],
        ['Ben', 'Okay, okay … Kann ich Schnitzel mit Reis und Gemüse haben, statt Pommes?'],
        ['Köchin', 'Kein Problem. Und Wasser steht gratis auf dem Tisch.'],
        ['Ben', 'Dann spare ich mir die Cola. Aber morgen gibt es wieder Pommes!'],
        ['Mia', 'Morgen ist morgen. Ab und zu ist völlig okay.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „ausgewogen essen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['von allem etwas, mit viel Gemüse und Obst', 'nur Gemüse', 'nur das, was am besten schmeckt'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was nimmt Ben am Ende?', stufe: 1, kopf: ['zuerst wollte Ben …', 'am Ende nimmt Ben …'], breiten: [50, 50], zeilen: [['[Schnitzel mit Pommes und eine Cola]', '[Schnitzel mit Reis und Gemüse und Wasser]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Ben hat gestern Pizza gegessen.', true], ['Mia findet, man darf nie Pommes essen.', false], ['Das Wasser kostet extra.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Stellt euch einen ausgewogenen Tagesplan (Frühstück, Pause, Mittag, Abend) zusammen. Vergleicht mit der Pyramide.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Zum Frühstück esse ich …', 'Da fehlt noch …', 'Das ist ausgewogen, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ausgewogen essen', punkte: ['**viel trinken**: Wasser, Tee', '**reichlich**: Gemüse, Obst, Getreide', '**mäßig**: Milch, Fleisch, Fisch, Eier', '**wenig**: Fett, Süßes, Chips'] },
         { titel: 'Der Teller-Trick', text: '**Halber Teller** Gemüse und Obst, **ein Viertel** Getreide oder Kartoffeln, **ein Viertel** Eiweiß (Fisch, Ei, Fleisch, Bohnen).', punkte: [] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Zucker in Würfeln: Ein Würfel Zucker wiegt etwa 3 Gramm. Rechne.', stufe: 2, spalten: 2, items: [
        { a: 'Eine Limonade hat 54 g Zucker. Wie viele Würfel sind das?', l: '54 ÷ 3 = 18 Würfel', raum: 2 },
        { a: 'Ein Fruchtjoghurt hat 15 g Zucker. Wie viele Würfel?', l: '15 ÷ 3 = 5 Würfel', raum: 2 },
        { a: 'Ein Eistee (0,5 l) hat 36 g Zucker. Wie viele Würfel?', l: '36 ÷ 3 = 12 Würfel', raum: 2 },
        { a: 'Wasser hat 0 g Zucker. Wie viele Würfel?', l: '0 Würfel', raum: 1 }] },
      { art: 'beschriften', auftrag: 'Schau den Teller an. Ist das Mittagessen aus dem Hörtext (Schnitzel mit Reis und Gemüse) ausgewogen? Begründe.', stufe: 3, html: teller({ breite: 62 }), liste: [['→', 'Ja, fast: Gemüse (halber Teller), Reis (Getreide) und Schnitzel (Eiweiß); Wasser statt Cola.']], spalten: 1 },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Plane ein ausgewogenes Klassenfrühstück für 20 Personen. Was kauft ihr ein? Begründe mit der Pyramide.', stufe: 2,
        anfaenge: ['Wir kaufen …', 'Zum Trinken gibt es …', 'Das ist ausgewogen, weil …'], zeilen: 7,
        beispiel: 'Wir kaufen Vollkornbrot, Käse, Joghurt, Äpfel, Bananen, Karotten und Gurken. Zum Trinken gibt es Wasser und ungesüßten Tee. Für alle, die Süßes mögen, gibt es ein bisschen Honig. Das ist ausgewogen, weil es viel Obst, Gemüse und Getreide gibt und nur wenig Süßes.' },
    ],
    check: ['Ich lese die Ernährungspyramide.', 'Ich rechne Zucker in Würfelzucker um.', 'Ich plane eine ausgewogene Mahlzeit.'],
  },
  // ================================================================ 6
  {
    thema: 'Schlaf · Bildschirm · Erholung', titel: 'Gut schlafen', untertitel: 'Warum brauchen Jugendliche so viel Schlaf? Du liest über den Schlaf, hörst einen Podcast und vergleichst zwei Schlafprotokolle.',
    ziel: { de: 'Ich erkläre, warum Schlaf wichtig ist, und nenne Tipps für guten Schlaf.', fr: 'J’explique pourquoi le sommeil est important et je donne des conseils pour bien dormir.' },
    bild: ['noah:muede:stehen', 'aerztin:froh:erklaeren'],
    start: {
      was: 'Müde?',
      aufgaben: [
        { art: 'mc', auftrag: 'Woran merkst du, dass du zu wenig geschlafen hast? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Ich kann mich schlecht konzentrieren.', 'Ich bin schneller gereizt.', 'Ich habe mehr Hunger auf Süßes.', 'Ich gähne oft.'], r: [0, 1, 2, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht, nach Empfehlungen von Schlafforschern)', titel: 'Was passiert, wenn wir schlafen?',
      absaetze: [
        'Schlafen sieht langweilig aus – doch dein Körper arbeitet die ganze Nacht. Das **Gehirn** sortiert, was du am Tag gelernt hast, und speichert es. Der Körper **repariert** sich, und bei Kindern und Jugendlichen wird nachts ein Wachstumshormon ausgeschüttet.',
        '### Wie viel Schlaf?',
        'Fachleute empfehlen für Jugendliche zwischen 13 und 18 Jahren **8 bis 10 Stunden** Schlaf pro Nacht, für Jüngere sogar 9 bis 12 Stunden. Viele schlafen deutlich weniger – oft wegen des Handys.',
        '### Bildschirm und Schlaf',
        'Spannende Videos, Spiele und Nachrichten halten das Gehirn wach. Außerdem kann das helle Licht von Bildschirmen das Einschlafen stören. Ein guter Tipp: **eine Stunde vor dem Schlafen** keine Bildschirme mehr, und das Handy nicht neben das Bett legen.',
        'Weitere Tipps: jeden Tag ungefähr zur **gleichen Zeit** ins Bett gehen, abends nicht zu schwer essen, tagsüber **draußen bewegen**, und im Zimmer soll es ruhig, dunkel und eher kühl sein.',
      ],
      woerter: [['der Schlaf', 'le sommeil'], ['einschlafen', 's’endormir'], ['speichern', 'mémoriser, enregistrer'], ['sich erholen', 'se reposer'], ['das Hormon', 'l’hormone'], ['der Bildschirm', 'l’écran'], ['gereizt', 'irritable'], ['die Konzentration', 'la concentration']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Im Schlaf speichert das Gehirn, was wir gelernt haben.', true], ['Jugendliche brauchen etwa 5 Stunden Schlaf.', false], ['Bildschirme vor dem Schlafen können das Einschlafen stören.', true], ['Es hilft, jeden Tag zur gleichen Zeit ins Bett zu gehen.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Podcast', wo: 'Podcast „Gesund in der Schule“', titel: 'Nur noch ein Video …',
      situation: 'Noah erzählt der Schulärztin von seinen Nächten.',
      bild: ['noah:muede:handy', 'aerztin:froh:erklaeren'], sprecher: { Noah: 'm3', Schulärztin: 'w1' },
      text: [
        ['Schulärztin', 'Noah, du siehst müde aus. Wann bist du gestern eingeschlafen?'],
        ['Noah', 'Ehrlich? So um halb eins. Ich wollte nur noch ein Video schauen … und dann noch eins.'],
        ['Schulärztin', 'Und wann stehst du auf?'],
        ['Noah', 'Um sechs Uhr dreißig. Mein Bus fährt um sieben.'],
        ['Schulärztin', 'Dann hast du nur sechs Stunden geschlafen. Für dein Alter sind acht bis zehn Stunden gut. Dir fehlen also zwei bis vier Stunden – jede Nacht.'],
        ['Noah', 'Das erklärt, warum ich in Mathe immer einschlafe …'],
        ['Schulärztin', 'Mach einen Versuch: Eine Woche lang legst du das Handy um einundzwanzig Uhr dreißig in die Küche. Du gehst um zweiundzwanzig Uhr ins Bett.'],
        ['Noah', 'In die Küche? Und wenn mir jemand schreibt?'],
        ['Schulärztin', 'Dann liest du es morgen. Die Nachricht läuft nicht weg – dein Schlaf schon.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie viele Stunden schläft jemand von 22 Uhr bis 6:30 Uhr? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['6 Stunden', '8 Stunden 30 Minuten', '10 Stunden'], r: 1 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Uhrzeit / Dauer'], breiten: [60, 40], zeilen: [['Noah schläft ein um …', '[halb eins (0:30)]'], ['Noah steht auf um …', '[6:30]'], ['Noah schläft …', '[6 Stunden]'], ['Empfohlen sind …', '[8 bis 10 Stunden]']] },
        { art: 'fragen', auftrag: 'Welchen Versuch schlägt die Schulärztin vor?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Eine Woche lang das Handy um 21:30 Uhr in die Küche legen und um 22 Uhr ins Bett gehen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was hält euch abends wach? Sammelt Ideen, wie man besser abschaltet.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['ein Buch lesen', 'ruhige Musik', 'Handy weglegen', 'Tagebuch schreiben'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Schlaf ist wichtig für …', punkte: ['**Lernen**: Das Gehirn speichert.', '**Wachsen** und Erholen', '**Laune** und Konzentration'] },
         { titel: 'Tipps für guten Schlaf', punkte: ['**8 bis 10 Stunden** (13–18 Jahre)', '1 Stunde vorher **kein Bildschirm**', '**gleiche** Schlafenszeit', 'ruhig, dunkel, kühl'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Zwei ausgedachte Schlafprotokolle. Vergleiche: Wer schläft genug?', stufe: 2,
        html: balken('Schlaf in Stunden (Montag bis Freitag, Durchschnitt)', [['Lina', 9], ['Noah', 6], ['empfohlen (mindestens)', 8]], { einheit: 'Std.', max: 10 }),
        liste: [['Lina:', '9 Stunden – genug'], ['Noah:', '6 Stunden – zu wenig (2 Stunden unter der Empfehlung)']], spalten: 1 },
      { art: 'rechnen', auftrag: 'Wie lange schläft die Person? Rechne.', stufe: 2, spalten: 2, items: [
        { a: 'von 21:30 Uhr bis 6:30 Uhr', l: '9 Stunden', raum: 1 },
        { a: 'von 23:45 Uhr bis 6:45 Uhr', l: '7 Stunden', raum: 1 },
        { a: 'von 22:15 Uhr bis 7:00 Uhr', l: '8 Stunden 45 Minuten', raum: 1 },
        { a: 'von 0:30 Uhr bis 6:30 Uhr', l: '6 Stunden', raum: 1 }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Ratgeber für Noah: fünf Tipps für besseren Schlaf. Begründe jeden Tipp kurz.', stufe: 2,
        anfaenge: ['Lieber Noah,', '1. …, weil …', '2. …', '3. …', 'Gute Nacht!'], zeilen: 8,
        beispiel: 'Lieber Noah, 1. Lege das Handy um 21:30 Uhr weg, weil Videos dich wach halten. 2. Geh jeden Tag um 22 Uhr ins Bett, dann gewöhnt sich dein Körper daran. 3. Lies vor dem Schlafen ein Buch. 4. Beweg dich am Nachmittag draußen. 5. Mach dein Zimmer dunkel und lüfte. Gute Nacht!' },
    ],
    check: ['Ich erkläre, warum Schlaf wichtig ist.', 'Ich weiß, wie viel Schlaf Jugendliche brauchen.', 'Ich nenne Tipps für guten Schlaf.'],
  },
  // ================================================================ 7
  {
    thema: 'Bewegung · Sport · Gesundheit', titel: 'Beweg dich!', untertitel: '60 Minuten am Tag: Du liest, was Bewegung im Körper bewirkt, hörst einen Sportlehrer und planst eine bewegte Woche.',
    ziel: { de: 'Ich erkläre, warum Bewegung gesund ist, und plane eine bewegte Woche.', fr: 'J’explique pourquoi l’activité physique est bonne pour la santé et je planifie une semaine active.' },
    bild: ['sami:aufgeregt:tanzen', 'lehrer:froh:stehen'],
    start: {
      was: 'Bewegung im Alltag',
      aufgaben: [
        { art: 'mc', auftrag: 'Was zählt alles als Bewegung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['mit dem Fahrrad zur Schule fahren', 'Treppe statt Aufzug', 'Tanzen', 'Fußball im Verein', 'mit dem Hund spazieren gehen'], r: [0, 1, 2, 3, 4] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht, nach Empfehlungen der Weltgesundheitsorganisation)', titel: 'Was Bewegung im Körper macht',
      absaetze: [
        'Die **Weltgesundheitsorganisation** empfiehlt Kindern und Jugendlichen: jeden Tag **mindestens 60 Minuten** Bewegung, bei der man ein bisschen ins Schwitzen oder außer Atem kommt. Dazu mehrmals pro Woche Übungen, die **Muskeln und Knochen** stärken, zum Beispiel Springen, Klettern oder Turnen.',
        '### Was passiert im Körper?',
        'Beim Sport schlägt das **Herz** schneller und pumpt mehr Blut durch den Körper. Die **Lunge** atmet tiefer. Die **Muskeln** werden stärker, die **Knochen** fester. Auch das Gehirn profitiert: Nach Bewegung kann man sich oft besser konzentrieren, und viele fühlen sich danach fröhlicher und weniger gestresst.',
        '### Sitzen, sitzen, sitzen',
        'In der Schule, im Bus, vor dem Bildschirm: Viele Jugendliche sitzen täglich viele Stunden. Fachleute raten, langes Sitzen öfter zu **unterbrechen** – schon kurze Pausen mit Aufstehen und Strecken helfen.',
      ],
      woerter: [['die Bewegung', 'l’activité physique, le mouvement'], ['der Muskel', 'le muscle'], ['der Knochen', 'l’os'], ['das Herz', 'le cœur'], ['die Lunge', 'le poumon'], ['außer Atem', 'essoufflé'], ['schwitzen', 'transpirer'], ['gestresst', 'stressé']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was passiert beim Sport? Verbinde.', stufe: 1, links: ['das Herz', 'die Lunge', 'die Muskeln', 'die Knochen', 'das Gehirn'], rechts: ['schlägt schneller', 'atmet tiefer', 'werden stärker', 'werden fester', 'kann sich danach besser konzentrieren'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Turnhalle · nach dem Sportunterricht', titel: 'Ich bin einfach unsportlich',
      situation: 'Sami mag den Sportunterricht nicht. Herr Mesenberg spricht mit ihm.',
      bild: ['sami:enttaeuscht:stehen', 'lehrer:froh:erklaeren'], sprecher: { 'Herr Mesenberg': 'm1', Sami: 'm3' },
      text: [
        ['Herr Mesenberg', 'Sami, du hast heute beim Laufen früh aufgehört. Alles okay?'],
        ['Sami', 'Ich bin einfach unsportlich. Die anderen sind immer schneller. Das ist peinlich.'],
        ['Herr Mesenberg', 'Es geht nicht darum, der Schnellste zu sein. Es geht darum, dass du dich gut fühlst. Was machst du gern?'],
        ['Sami', 'Tanzen. Zu Hause tanze ich jeden Abend zu Musikvideos.'],
        ['Herr Mesenberg', 'Das ist doch super Bewegung! Eine halbe Stunde Tanzen – da schwitzt man richtig.'],
        ['Sami', 'Wirklich? Das zählt?'],
        ['Herr Mesenberg', 'Natürlich. Und wenn du dann noch mit dem Fahrrad zur Schule fährst, hast du deine sechzig Minuten fast geschafft. Übrigens: Ab nächster Woche gibt es eine Tanz-AG in der Mittagspause.'],
        ['Sami', 'Echt? Da melde ich mich an!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie viele Minuten Bewegung pro Tag empfiehlt die WHO für Jugendliche? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['mindestens 15 Minuten', 'mindestens 60 Minuten', 'mindestens 3 Stunden'], r: 1 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Sami findet sich unsportlich.', true], ['Sami tanzt gern.', true], ['Herr Mesenberg sagt, Tanzen zählt nicht als Sport.', false], ['Es gibt eine Tanz-AG in der Mittagspause.', true]] },
        { art: 'fragen', auftrag: 'Worum geht es laut Herrn Mesenberg bei Bewegung?', stufe: 2, fragen: [{ f: '', l: 'Nicht darum, der Schnellste zu sein, sondern sich gut zu fühlen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erfindet eine „Bewegte Pause“ für eure Klasse: drei Übungen für fünf Minuten im Klassenzimmer.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Hampelmann', 'auf einem Bein stehen', 'Schultern kreisen', 'Treppe hoch und runter'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Bewegung (WHO-Empfehlung)', punkte: ['**60 Minuten** am Tag, etwas außer Atem', 'mehrmals pro Woche **Muskeln und Knochen** stärken', 'langes **Sitzen unterbrechen**'] },
         { titel: 'Bewegung tut gut für …', punkte: ['Herz und Lunge', 'Muskeln und Knochen', 'Konzentration und **Laune**'] }],
        [{ art: 'tipp', titel: 'Jede Bewegung zählt', text: 'Du musst nicht Profi sein. Fahrrad fahren, tanzen, Treppen steigen, mit Freunden Basketball spielen – alles zählt. Wichtig ist, dass es dir **Spaß** macht.' }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Samis Woche (ausgedacht): Schafft er jeden Tag 60 Minuten? Rechne.', stufe: 2, spalten: 2, items: [
        { a: 'Montag: Fahrrad 20 min + Tanzen 30 min', l: '50 min – fehlen 10 min', raum: 1 },
        { a: 'Dienstag: Sportunterricht 50 min + Fahrrad 20 min', l: '70 min – geschafft', raum: 1 },
        { a: 'Mittwoch: Tanz-AG 40 min + Spaziergang 25 min', l: '65 min – geschafft', raum: 1 },
        { a: 'Donnerstag: Bus, keine Bewegung, 15 min Tanzen', l: '15 min – fehlen 45 min', raum: 1 }] },
      { art: 'tabelle', auftrag: 'Plane eine bewegte Woche für dich oder eine ausgedachte Person. Ziel: jeden Tag 60 Minuten.', stufe: 3, kopf: ['Tag', 'Bewegung', 'Minuten'], breiten: [18, 62, 20], zeilen: [['Mo', '[z. B. Fahrrad, Fußball]', '[60]'], ['Di', '', ''], ['Mi', '', ''], ['Do', '', ''], ['Fr', '', ''], ['Sa', '', ''], ['So', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe ein Plakat für die Schule: „Beweg dich!“ Nenne drei gute Gründe und drei einfache Ideen.', stufe: 2,
        anfaenge: ['Beweg dich, weil …', 'Ideen: …', 'Unser Tipp: …'], zeilen: 7,
        beispiel: 'Beweg dich, weil dein Herz stärker wird, weil du dich danach besser konzentrierst und weil du gute Laune bekommst. Ideen: mit dem Fahrrad zur Schule, Treppe statt Aufzug, Tanz-AG in der Mittagspause. Unser Tipp: Such dir etwas, das dir Spaß macht!' },
    ],
    check: ['Ich nenne die Empfehlung: 60 Minuten Bewegung pro Tag.', 'Ich erkläre, was Bewegung im Körper bewirkt.', 'Ich plane eine bewegte Woche.'],
  },
  // ================================================================ 8
  {
    thema: 'Müll · Recycling · vermeiden', titel: 'Weniger Müll!', untertitel: 'Vermeiden, wiederverwenden, recyceln: Du lernst, wie Müll getrennt wird, hörst eine Müllsammelaktion und rechnest, wie viel Müll eine Klasse spart.',
    ziel: { de: 'Ich trenne Müll richtig und nenne Wege, Müll zu vermeiden.', fr: 'Je trie correctement les déchets et je cite des moyens de les réduire.' },
    bild: ['lio:froh:laessig', 'amira:froh:stehen'],
    start: {
      was: 'Mülldetektive',
      aufgaben: [
        { art: 'fragen', auftrag: 'Schau in den Mülleimer eurer Klasse (mit Handschuhen!). Was liegt dort am meisten?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Papier, Verpackungen von Pausenbroten, Trinkpäckchen' }] },
      ],
    },
    lesen: {
      was: 'Ein Infoblatt', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Infoblatt (vereinfacht; die Regeln können je nach Gemeinde etwas verschieden sein)', titel: 'Der beste Müll ist kein Müll',
      absaetze: [
        'In Luxemburg wirft jeder Mensch im Jahr mehrere hundert Kilogramm Abfall weg. Was können wir tun? Die wichtigste Regel heißt: **Vermeiden** – zum Beispiel eine Trinkflasche statt Einwegflaschen, eine Brotdose statt Alufolie. Danach kommt **Wiederverwenden**: Dinge reparieren, verschenken oder auf dem Flohmarkt verkaufen. Erst am Schluss kommt **Recyceln**: Aus Altem wird Neues gemacht.',
        '### Richtig trennen',
        '**Papier und Karton** kommen in die Papiertonne. **Glas** kommt in den Glascontainer, nach Farben getrennt. **Verpackungen aus Plastik, Metall und Getränkekartons** sammelt man in vielen Gemeinden im blauen Sack. **Essensreste und Gartenabfälle** gehören in die Biotonne – daraus wird Kompost oder Biogas. Was übrig bleibt, kommt in den **Restmüll**.',
        '### Gefährlicher Müll',
        '**Batterien**, alte Handys, Farben und Medikamente gehören niemals in den normalen Müll. Man gibt sie in Sammelstellen im Geschäft oder im **Recyclingzentrum** ab.',
      ],
      info: { titel: 'Die Reihenfolge', icon: 'recycle', punkte: ['1. **Vermeiden** – am besten!', '2. **Wiederverwenden** – reparieren, tauschen', '3. **Recyceln** – richtig trennen', '4. Restmüll – so wenig wie möglich'] },
      woerter: [['der Abfall (der Müll)', 'les déchets'], ['vermeiden', 'éviter'], ['wiederverwenden', 'réutiliser'], ['recyceln', 'recycler'], ['trennen', 'trier'], ['die Biotonne', 'la poubelle bio'], ['der Restmüll', 'les déchets résiduels'], ['das Recyclingzentrum', 'le centre de recyclage']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wohin gehört das? Kreuze an.', stufe: 1, kopf: ['', 'Papier', 'Glas', 'blauer Sack', 'Bio', 'Sammelstelle'], breiten: [30, 14, 14, 14, 14, 14], zeilen: [['Zeitung', '[x]', '', '', '', ''], ['leere Saftflasche aus Glas', '', '[x]', '', '', ''], ['Joghurtbecher', '', '', '[x]', '', ''], ['Bananenschale', '', '', '', '[x]', ''], ['alte Batterie', '', '', '', '', '[x]'], ['Getränkedose', '', '', '[x]', '', '']] },
      ],
    },
    hoeren: {
      was: 'Eine Reportage', wo: 'Am Fluss · Müllsammelaktion der Klasse', titel: 'Großputz am Ufer',
      situation: 'Die Klasse 7P2 sammelt Müll am Ufer. Lio interviewt seine Mitschülerin Amira für das Schulradio.',
      bild: ['lio:froh:handy', 'amira:froh:stehen'], sprecher: { Lio: 'm3', Amira: 'w2', 'Frau Sommer': 'w1' },
      text: [
        ['Lio', 'Hallo, hier ist Lio vom Schulradio, live vom Flussufer. Amira, was hast du gefunden?'],
        ['Amira', 'Unglaublich viel! Plastikflaschen, Chipstüten, sogar einen alten Schuh. Und überall Zigarettenstummel.'],
        ['Lio', 'Zigarettenstummel sind doch klein. Ist das schlimm?'],
        ['Amira', 'Ja! Frau Sommer hat erklärt, dass sie giftige Stoffe enthalten. Die gelangen ins Wasser und schaden Fischen.'],
        ['Frau Sommer', 'Und Plastik zerfällt nur sehr langsam. Eine Plastikflasche kann Hunderte von Jahren in der Natur bleiben. Sie zerbricht in winzige Teilchen – Mikroplastik.'],
        ['Lio', 'Wie viel haben wir heute gesammelt?'],
        ['Frau Sommer', 'Acht große Säcke in zwei Stunden. Ihr wart super!'],
        ['Amira', 'Am besten wäre es aber, wenn erst gar nichts hier landen würde.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist Mikroplastik? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['winzige Plastikteilchen', 'ein kleiner Plastikbecher', 'ein Mikroskop aus Plastik'], r: 0 }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Was hat Amira gefunden? (mehrere)', o: ['Plastikflaschen', 'Chipstüten', 'einen alten Schuh', 'Zigarettenstummel', 'ein Fahrrad'], r: [0, 1, 2, 3] }, { f: 'Wie viele Säcke hat die Klasse gesammelt?', o: ['acht', 'drei', 'achtzehn'], r: 0 }] },
        { art: 'fragen', auftrag: 'Warum sind Zigarettenstummel schlimm für die Natur?', stufe: 2, fragen: [{ f: '', l: 'Sie enthalten giftige Stoffe, die ins Wasser gelangen und Fischen schaden.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Plant eine Müllsammelaktion in der Nähe eurer Schule. Was braucht ihr? Was müsst ihr beachten?', stufe: 3, karten: [
        { titel: 'Planung', text: ['Wo?', 'Wann?', 'Material: Handschuhe, Säcke, Greifzangen', 'Sicherheit: nichts Spitzes anfassen'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Müll-Reihenfolge', nummern: true, punkte: ['**Vermeiden**', '**Wiederverwenden**', '**Recyceln**', 'Restmüll'] },
         { titel: 'Trennen', punkte: ['**Papier**: Zeitung, Karton', '**Glas**: Flaschen, Gläser', '**blauer Sack**: Plastik- und Metallverpackungen, Getränkekartons', '**Bio**: Essensreste, Garten', '**Sammelstelle**: Batterien, Handys'] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Eine Klasse mit 20 Schülerinnen und Schülern spart Müll. Rechne.', stufe: 2, spalten: 2, items: [
        { a: 'Jeder trinkt jeden Schultag aus einer Einwegflasche. Wie viele Flaschen sind das pro Woche (5 Tage)?', l: '20 · 5 = 100 Flaschen', raum: 2 },
        { a: 'Ein Schuljahr hat etwa 36 Wochen. Wie viele Flaschen spart die Klasse mit Trinkflaschen?', l: '100 · 36 = 3600 Flaschen', raum: 2 },
        { a: 'Eine Flasche wiegt 25 g. Wie viel Kilogramm Plastik sind das?', l: '3600 · 25 g = 90 000 g = 90 kg', raum: 2 }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Brief an die Schulleitung: Wie kann unsere Schule weniger Müll machen? Mach drei Vorschläge.', stufe: 2,
        anfaenge: ['Sehr geehrte Frau Direktorin, sehr geehrter Herr Direktor,', 'in unserer Schule gibt es viel Müll, zum Beispiel …', 'Wir schlagen vor: …', 'Mit freundlichen Grüßen'], zeilen: 9,
        beispiel: 'Sehr geehrte Frau Direktorin, in unserer Schule gibt es viel Müll, zum Beispiel Einwegflaschen und Verpackungen. Wir schlagen vor: 1. Trinkwasserbrunnen auf jedem Stockwerk. 2. In jeder Klasse Mülleimer für Papier, Verpackungen und Restmüll. 3. Ein Tauschregal für Bücher und Kleidung. Mit freundlichen Grüßen, die Klasse 7P2' },
    ],
    check: ['Ich kenne die Müll-Reihenfolge: vermeiden, wiederverwenden, recyceln.', 'Ich trenne Müll richtig.', 'Ich mache Vorschläge, wie man Müll spart.'],
  },
]

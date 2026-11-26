// Deutsch · Modul 1 „Ich und die anderen“ (Voie de préparation, A1) – multimodales Heft (Lesen, Hören, Regel, Üben, Schreiben).
// Themen und Grammatik nach dem Programm ALLUX 7P/6P/5P (CNES, 20/03/2019; Kann-Beschreibungen als Mindeststandards),
// Modul 1: Familie, Hobbys, Schule, Freundschaft; Präsens, W-Fragen, Verneinung mit „nicht“, Modalverb +
// Infinitiv, links/rechts/geradeaus, Groß- und Kleinschreibung (Nomen), Verb – Nomen – Adjektiv – Artikel.
// Alle Texte, Dialoge und Aufgaben sind selbst geschrieben; alle Personen sind ausgedacht.
// Persönliches nur freiwillig: Wer möchte, stellt eine ausgedachte Person vor. Keine Fragen zur eigenen Familie.
//
// Auszeichnung in Texten: [Lösung] = Lücke · **fett** · __Endung__ · ==markiert== · //kursiv//
// Hörtexte: hoeren.text = [[Sprecher, Satz], …]; hoeren.sprecher ordnet jeder Person eine Stimme zu (m1, w1, m2, w2, …).

export const MODUL = {
  id: 'deutsch-m1', kuerzel: 'de1', nr: 1, sprache: 'de', niveau: 'A1', klasse: 'Voie de préparation',
  dateiname: 'Deutsch_Modul-1',
  fach: { de: 'Deutsch', fr: 'Allemand' },
  titel: { de: 'Ich und die anderen', fr: 'Moi et les autres' },
  untertitel: { de: 'Sich vorstellen, Hobbys, Freundschaft, Schule: lesen, hören, sprechen und schreiben – in acht Einheiten.', fr: 'Se présenter, loisirs, amitié, école : lire, écouter, parler et écrire – en huit unités.' },
  farben: { tief: '#b4432e', mittel: '#eaa38f', zart: '#fbefe9', dunkel: '#7e2b1c' },
  deckbild: ['sami:froh:stehen', 'lina:froh:laessig', 'noah:froh:stehen-zeigen'],
  blasen: [{ t: 'Moien!', x: 22, y: 118 }, { t: 'Hallo!', x: 150, y: 106 }, { t: 'Salut!', x: 128, y: 150 }],
  themen: [
    { titel: { de: 'Ich und die anderen', fr: 'Moi et les autres' }, icon: 'users', lektionen: 3 },
    { titel: { de: 'Gefühle und Sätze', fr: 'Sentiments et phrases' }, icon: 'mood-happy', lektionen: 2 },
    { titel: { de: 'Zeit und Wege', fr: 'Le temps et le chemin' }, icon: 'clock', lektionen: 2 },
    { titel: { de: 'Feste und Karten', fr: 'Fêtes et cartes' }, icon: 'confetti', lektionen: 1 },
  ],
  anleitung: [
    'Jede Lektion hat fünf Teile: **Lesen**, **Hören**, **Regel**, **Üben** und **Schreiben**. Am Ende steht ein **Kurz-Check**.',
    'Bei jedem Text gibt es einen **QR-Code**. Halte die Kamera deines Handys darauf – dann hörst du den Text. Du kannst ihn so oft hören, wie du willst, auch langsamer.',
    'Die Punkte bei den Aufgaben zeigen die Stufe: ●○○ Basis · ●●○ Kern · ●●● Plus. Fang mit der Basis an.',
    'Unbekannte Wörter stehen neben dem Text, mit Französisch. Hinten im Heft findest du alle Wörter noch einmal.',
  ],
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Sich vorstellen', titel: 'Das bin ich', untertitel: 'Neue Klasse, neue Leute. Mit vier, fünf Sätzen stellst du dich vor – und schon seid ihr im Gespräch.',
    ziel: { de: 'Ich stelle mich vor: Name, Alter, Wohnort und was ich mag.', fr: 'Je me présente : nom, âge, lieu d’habitation et ce que j’aime.' },
    bild: ['sami:froh', 'noah:froh'],
    start: {
      was: 'Hallo in vielen Sprachen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'So sagen die Leute in deiner Klasse Hallo. Welche Sprache ist das? Verbinde.', stufe: 1,
          links: ['Moien!', 'Salut!', 'Olá!', 'Hallo!', 'Hi!'], rechts: ['Luxemburgisch', 'Französisch', 'Portugiesisch', 'Deutsch', 'Englisch'], ordnung: [2, 4, 0, 3, 1] },
        { art: 'rf', auftrag: 'Ein Steckbrief für die Schülerzeitung: Was schreibst du hinein? Was lieber nicht?', stufe: 1, spalten: ['ja', 'lieber nicht'],
          hilfe: 'Die Schülerzeitung lesen viele Leute. Private Dinge gehören nicht hinein.', saetze: [
          ['Vorname', true], ['Hobbys', true], ['Lieblingsfach', true], ['Adresse mit Hausnummer', false], ['Handynummer', false], ['Passwort', false]] },
      ],
    },
    lesen: {
      was: 'Steckbriefe aus der Schülerzeitung', art: 'profile', stimme: 'w1',
      quelle: 'Schülerzeitung · Seite 4', titel: 'Neu in der 7P2: Das sind wir!',
      profile: [
        { name: 'Sam, 13 Jahre', bild: 'sami:froh', stimme: 'm2', text: 'Hallo! Ich heiße Sam und bin dreizehn Jahre alt. Ich wohne in Junglinster, nicht weit von der Schule. Ich spiele gern Basketball und höre viel Musik. Mein Lieblingsfach ist Sport. Mathe mag ich nicht so gern. Ich bin neu hier und suche Leute für ein Basketball-Team!' },
        { name: 'Lina, 12 Jahre', bild: 'lina:froh', stimme: 'w2', text: 'Hi, ich bin Lina. Ich bin zwölf. Ich komme aus Ettelbrück, jetzt wohne ich in Larochette. Ich zeichne sehr gern, am liebsten Comics. Ich spreche vier Sprachen: Luxemburgisch, Französisch, Deutsch und ein bisschen Arabisch. Mein Lieblingsessen ist Pizza.' },
        { name: 'Yusuf, 14 Jahre', bild: 'yusuf:froh', stimme: 'm1', text: 'Moien! Ich heiße Yusuf. Ich bin vierzehn Jahre alt und wohne in Echternach. Jeden Morgen fahre ich 25 Minuten mit dem Bus. Ich koche gern und ich spiele Gitarre. In der Pause bin ich meistens auf dem Pausenhof. Sprich mich einfach an!' },
      ],
      woerter: [['der Steckbrief', 'la fiche d’identité'], ['das Lieblingsfach', 'la matière préférée'], ['suchen', 'chercher'], ['zeichnen', 'dessiner'], ['am liebsten', 'de préférence'], ['meistens', 'la plupart du temps'], ['jemanden ansprechen', 'aborder quelqu’un']],
      aufgaben: [
        { art: 'rf', auftrag: 'Lies die Steckbriefe. Richtig oder falsch? Kreuze an.', stufe: 1, saetze: [
          ['Sam ist dreizehn Jahre alt.', true], ['Sam mag Mathe sehr gern.', false], ['Lina wohnt jetzt in Larochette.', true],
          ['Lina spricht zwei Sprachen.', false], ['Yusuf fährt mit dem Bus zur Schule.', true], ['Yusuf spielt Klavier.', false]] },
        { art: 'wer', auftrag: 'Wer ist das? Kreuze an.', stufe: 2, personen: ['Sam', 'Lina', 'Yusuf'], saetze: [
          ['Die Person zeichnet Comics.', 'Lina'], ['Die Person sucht Leute für ein Team.', 'Sam'], ['Die Person kocht gern.', 'Yusuf'],
          ['Die Person wohnt nah bei der Schule.', 'Sam'], ['Die Person ist in der Pause auf dem Pausenhof.', 'Yusuf']] },
        { art: 'fragen', auftrag: 'Antworte in ganzen Sätzen.', stufe: 3, fragen: [
          { f: 'Wie alt ist Lina?', l: 'Lina ist zwölf Jahre alt.' }, { f: 'Wo wohnt Yusuf?', l: 'Yusuf wohnt in Echternach.' },
          { f: 'Was ist Sams Lieblingsfach?', l: 'Sams Lieblingsfach ist Sport.' }, { f: 'Wen möchtest du kennenlernen? Warum?', l: 'Ich möchte Lina kennenlernen. Ich zeichne auch gern.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch verstehen', wo: 'Pausenhof · erster Schultag', titel: 'Bist du auch neu hier?',
      situation: 'Es ist der erste Schultag. Noah steht allein auf dem Pausenhof. Da kommt Sam.',
      bild: ['noah:nervoes', 'sami:froh'], sprecher: { Noah: 'm1', Sam: 'm2' },
      text: [
        ['Sam', 'Hallo! Bist du auch neu hier?'], ['Noah', 'Ja. Ich bin ein bisschen nervös. Ich heiße Noah.'],
        ['Sam', 'Ich bin Sam. Freut mich! In welcher Klasse bist du?'], ['Noah', 'In der 7P2. Und du?'],
        ['Sam', 'Ich auch! Cool. Wie alt bist du?'], ['Noah', 'Ich bin vierzehn. Und du?'],
        ['Sam', 'Ich bin dreizehn. Wo wohnst du?'], ['Noah', 'In Heffingen. Ich fahre mit dem Bus. Und du?'],
        ['Sam', 'Ich wohne hier in Junglinster. Ich gehe zu Fuß zur Schule.'], ['Noah', 'Was machst du gern?'],
        ['Sam', 'Ich spiele gern Basketball. Und du?'], ['Noah', 'Ich skate gern. Und ich mag Musik.'],
        ['Sam', 'Super. Oh, es klingelt! Komm, wir gehen zusammen rein.'], ['Noah', 'Okay. Danke, Sam!'],
      ],
      vor: [
        { art: 'mc', auftrag: 'Schau das Bild an. Wie geht es Noah? Was glaubst du?', stufe: 1, fragen: [{ f: 'Noah ist …', o: ['fröhlich', 'nervös', 'wütend'], r: 1 }] },
      ],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [
          { f: 'In welcher Klasse sind Noah und Sam?', o: ['7P1', '7P2', '7P3'], r: 1 },
          { f: 'Wie kommt Noah zur Schule?', o: ['zu Fuß', 'mit dem Bus', 'mit dem Fahrrad'], r: 1 },
          { f: 'Was macht Noah gern?', o: ['Er spielt Basketball.', 'Er skatet.', 'Er zeichnet.'], r: 1 }] },
        { art: 'tabelle', auftrag: 'Hör noch einmal. Ergänze die Tabelle.', stufe: 2, kopf: ['', 'Noah', 'Sam'], breiten: [28, 36, 36],
          zeilen: [['Alter', '[14 Jahre]', '[13 Jahre]'], ['Wohnort', '[Heffingen]', '[Junglinster]'], ['Schulweg', '[mit dem Bus]', '[zu Fuß]'], ['Hobby', '[Skaten, Musik]', '[Basketball]']] },
      ],
      nach: [
        { art: 'sprechen', auftrag: 'Spielt das Gespräch zu zweit. Ändert die Namen, das Alter und den Wohnort.', stufe: 3, karten: [
          { titel: 'Person A fragt', text: ['Hallo! Bist du auch neu hier?', 'Wie alt bist du?', 'Wo wohnst du?', 'Was machst du gern?'] },
          { titel: 'Person B antwortet', text: ['Ja. Ich heiße …', 'Ich bin … Jahre alt.', 'Ich wohne in …', 'Ich … gern.'] }] },
      ],
    },
    regel: {
      reihen: [
        [{ titel: 'So stellst du dich vor', punkte: ['Ich **heiße** Sam. / Ich **bin** Sam.', 'Ich **bin** dreizehn Jahre alt.', 'Ich **wohne** in Junglinster.', 'Ich **komme** aus Ettelbrück.', 'Ich **mag** Musik. Ich **spiele** gern Basketball.'] },
         { titel: 'Verben: ich – du – er/sie', tabelle: { kopf: ['', 'heißen', 'wohnen', 'sein'], zeilen: [['ich', 'heiß__e__', 'wohn__e__', '**bin**'], ['du', 'heiß__t__', 'wohn__st__', '**bist**'], ['er / sie', 'heiß__t__', 'wohn__t__', '**ist**']] } }],
        [{ art: 'achtung', titel: 'Groß oder klein?', punkte: ['Der **Satzanfang** ist groß: ==I==ch wohne in …', '**Namen** sind groß: ==S==am, ==L==ina, ==J==unglinster.', '„sein“ ist anders: ich bin – du bist – er ist.'] },
         { art: 'tipp', titel: 'Tipp', text: 'Die Endung zeigt, wer etwas tut: ich wohn__e__ – du wohn__st__ – sie wohn__t__. Lern die Endungen wie ein Lied: **e – st – t**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Verben.', stufe: 1, woerter: ['heiße', 'bin', 'wohne', 'komme', 'mag', 'spiele'], saetze: [
        'Ich [heiße] Mila.', 'Ich [bin] vierzehn Jahre alt.', 'Ich [wohne] in Echternach.', 'Ich [komme] aus Portugal.', 'Ich [mag] Musik und Pizza.', 'Ich [spiele] gern Fußball.'] },
      { art: 'zuordnen', auftrag: 'Frage und Antwort: Was passt zusammen?', stufe: 1, links: ['Wie heißt du?', 'Wie alt bist du?', 'Wo wohnst du?', 'Woher kommst du?', 'Was machst du gern?'],
        rechts: ['Ich heiße Ayla.', 'Ich bin dreizehn.', 'In Grevenmacher.', 'Aus Italien.', 'Ich zeichne gern.'], ordnung: [3, 0, 4, 1, 2] },
      { art: 'tabelle', auftrag: 'Ergänze die Tabelle.', stufe: 2, kopf: ['', 'heißen', 'wohnen', 'kommen', 'sein'],
        zeilen: [['ich', 'heiße', '[wohne]', '[komme]', '[bin]'], ['du', '[heißt]', 'wohnst', '[kommst]', '[bist]'], ['er / sie', '[heißt]', '[wohnt]', 'kommt', '[ist]']] },
      { art: 'luecken', auftrag: 'Ergänze die Endung: -e, -st oder -t.', stufe: 2, saetze: [
        'Lina wohn[t|9] in Larochette.', 'Du komm[st|9] aus Ettelbrück.', 'Ich spiel[e|9] gern Gitarre.', 'Sam hör[t|9] viel Musik.', 'Wo wohn[st|9] du?', 'Yusuf koch[t|9] gern.'] },
      { art: 'abschreiben', auftrag: 'Schreib die Sätze richtig: Satzanfang und Namen groß.', stufe: 2, saetze: [
        ['ich heiße jo und wohne in junglinster.', 'Ich heiße Jo und wohne in Junglinster.'], ['mein freund ben spielt basketball.', 'Mein Freund Ben spielt Basketball.'], ['lina kommt aus ettelbrück.', 'Lina kommt aus Ettelbrück.']] },
    ],
    sprechen: [
      { art: 'interview', auftrag: 'Frag zwei Personen in der Klasse. Schreib die Antworten auf.', stufe: 3, spalten: ['Person 1', 'Person 2'],
        fragen: ['Wie heißt du?', 'Wie alt bist du?', 'Wo wohnst du?', 'Was machst du gern?'] },
    ],
    schreibenNeueSeite: true,
    schreiben: [
      { art: 'steckbrief', auftrag: 'Dein Steckbrief für die Schülerzeitung. Fülle ihn aus.', stufe: 1, felder: ['Name', 'Alter', 'Wohnort', 'Hobbys', 'Lieblingsfach', 'Lieblingsessen'],
        hilfe: 'Du darfst auch eine ausgedachte Person vorstellen.' },
      { art: 'schreiben', auftrag: 'Schreib jetzt einen Text wie Sam, Lina oder Yusuf. Schreib fünf Sätze oder mehr.', stufe: 2,
        anfaenge: ['Hallo! Ich heiße …', 'Ich bin … Jahre alt.', 'Ich wohne in …', 'Ich … gern …', 'Mein Lieblingsfach ist …', '… mag ich nicht so gern.'], zeilen: 8,
        beispiel: 'Hallo! Ich heiße Mila. Ich bin vierzehn Jahre alt. Ich wohne in Echternach. Ich tanze gern und höre Musik. Mein Lieblingsfach ist Kunst. Mathe mag ich nicht so gern.' },
    ],
    check: ['Ich stelle mich mit Name, Alter und Wohnort vor.', 'Ich verstehe kurze Steckbriefe.', 'Ich verstehe ein kurzes Gespräch zum Kennenlernen.', 'Ich kenne die Endungen: ich wohn-e, du wohn-st, er wohn-t.', 'Ich schreibe Satzanfänge und Namen groß.'],
  },
  // ================================================================ 2
  {
    thema: 'Hobbys', titel: 'Was machst du gern?', untertitel: 'Sport, Musik, Zocken, Zeichnen: Über Hobbys kann man immer reden. Dafür brauchst du die Verben im Präsens – und das kleine Wort „gern“.',
    ziel: { de: 'Ich sage, was ich gern mache und was ich gut kann.', fr: 'Je dis ce que j’aime faire et ce que je sais bien faire.' },
    bild: ['nele:froh:rollstuhl', 'lio:froh:stehen'],
    start: {
      was: 'Hobbys und Verben',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Verb passt? Verbinde.', stufe: 1, links: ['Fußball', 'Musik', 'Comics', 'Kuchen', 'Freunde', 'Videos'],
          rechts: ['spielen', 'hören', 'zeichnen', 'backen', 'treffen', 'schauen'], ordnung: [4, 0, 5, 2, 3, 1] },
        { art: 'mc', auftrag: 'Und du? Kreuze an, was du gern machst. Mehrere Kreuze sind möglich.', stufe: 1, fragen: [{ f: 'Ich … gern.', o: ['spiele Fußball', 'tanze', 'zeichne', 'koche', 'lese', 'zocke', 'schwimme', 'singe'], r: -1 }] },
      ],
    },
    lesen: {
      was: 'Eine Umfrage in der Pause', art: 'profile', stimme: 'w1',
      quelle: 'Schülerzeitung · Umfrage', titel: 'Was machst du in deiner Freizeit?',
      profile: [
        { name: 'Mia, 13', bild: 'mia:froh', stimme: 'w2', text: 'Ich lese sehr gern, am liebsten Mangas. Am Wochenende backe ich mit meiner Freundin Kuchen. Das können wir richtig gut! Sport mag ich nicht so gern. Aber ich schwimme manchmal.' },
        { name: 'Ben, 14', bild: 'ben:froh', stimme: 'm2', text: 'Ich spiele Fußball im Verein, zweimal pro Woche. Am Samstag haben wir oft ein Spiel. Abends zocke ich gern mit meinen Freunden. Aber nur eine Stunde – dann muss ich schlafen.' },
        { name: 'Nele, 12', bild: 'nele:froh:rollstuhl', stimme: 'w1', text: 'Ich spiele Rollstuhl-Basketball. Wir trainieren am Mittwoch in Mersch. Ich werfe gut, aber ich bin noch nicht so schnell. Unser Team ist super. Wir lachen viel!' },
        { name: 'Amira, 13', bild: 'amira:froh', stimme: 'w2', text: 'Ich tanze sehr gern. Mit meiner Schwester übe ich neue Tänze und wir filmen uns. Die Videos schauen nur wir – sie sind privat. Ich singe auch gern, aber ich singe nicht gut!' },
      ],
      woerter: [['die Freizeit', 'le temps libre'], ['die Umfrage', 'le sondage'], ['der Verein', 'le club'], ['zweimal pro Woche', 'deux fois par semaine'], ['zocken', 'jouer aux jeux vidéo'], ['trainieren', 's’entraîner'], ['werfen', 'lancer'], ['üben', 's’exercer'], ['privat', 'privé']],
      aufgaben: [
        { art: 'wer', auftrag: 'Wer macht was? Kreuze an. Manchmal passen zwei Personen.', stufe: 1, personen: ['Mia', 'Ben', 'Nele', 'Amira'], saetze: [
          ['… spielt in einem Team.', ['Ben', 'Nele']], ['… liest gern.', 'Mia'], ['… tanzt gern.', 'Amira'], ['… backt Kuchen.', 'Mia'], ['… zockt am Abend.', 'Ben'], ['… trainiert am Mittwoch.', 'Nele']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [
          ['Ben spielt dreimal pro Woche Fußball.', false], ['Nele wirft gut.', true], ['Amira singt sehr gut.', false], ['Amiras Tanzvideos sind privat.', true], ['Mia schwimmt manchmal.', true]] },
        { art: 'fragen', auftrag: 'Was kann die Person gut? Was nicht so gut? Schreib Sätze.', stufe: 3, fragen: [
          { f: 'Nele:', l: 'Nele wirft gut, aber sie ist noch nicht so schnell.' }, { f: 'Amira:', l: 'Amira tanzt gut, aber sie singt nicht gut.' }] },
      ],
    },
    hoeren: {
      was: 'Eine kurze Präsentation verstehen', wo: 'Klassenzimmer · Deutschstunde', titel: 'Mein Hobby: Skaten',
      situation: 'Lio stellt der Klasse sein Hobby vor. Er hat drei Bilder mitgebracht.',
      bild: ['lio:froh:stehen'], sprecher: { Lio: 'm2', 'Frau Sommer': 'w1' },
      text: [
        ['Frau Sommer', 'So, jetzt ist Lio dran. Bitte, Lio!'],
        ['Lio', 'Hallo zusammen! Mein Hobby ist Skaten. Ich skate seit zwei Jahren.'],
        ['Lio', 'Auf dem ersten Bild seht ihr mein Board. Es ist schwarz und ein bisschen alt. Aber ich liebe es.'],
        ['Lio', 'Ich skate dreimal pro Woche, meistens im Skatepark in Junglinster. Am Samstag fahre ich mit dem Bus nach Luxemburg. Dort ist der Skatepark sehr groß.'],
        ['Lio', 'Auf dem zweiten Bild seht ihr einen Trick. Er heißt Ollie. Den kann ich schon gut.'],
        ['Lio', 'Auf dem dritten Bild seht ihr meinen Helm. Der Helm ist sehr wichtig! Ich falle oft hin.'],
        ['Lio', 'Was kann ich noch nicht so gut? Ich kann noch nicht auf der Rampe fahren. Das übe ich jetzt.'],
        ['Lio', 'Danke fürs Zuhören! Habt ihr Fragen?'],
        ['Frau Sommer', 'Danke, Lio! Das war super.'],
      ],
      vor: [
        { art: 'mc', auftrag: 'Lio skatet. Was braucht man zum Skaten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Board', 'einen Helm', 'einen Ball', 'eine Gitarre'], r: [0, 1] }] },
      ],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [
          { f: 'Wie lange skatet Lio schon?', o: ['seit einem Jahr', 'seit zwei Jahren', 'seit drei Jahren'], r: 1 },
          { f: 'Wie oft skatet Lio?', o: ['einmal pro Woche', 'zweimal pro Woche', 'dreimal pro Woche'], r: 2 },
          { f: 'Wohin fährt er am Samstag?', o: ['nach Echternach', 'nach Luxemburg', 'nach Mersch'], r: 1 }] },
        { art: 'luecken', auftrag: 'Hör noch einmal und ergänze.', stufe: 2, saetze: [
          'Lios Board ist [schwarz] und ein bisschen alt.', 'Der Trick auf Bild 2 heißt [Ollie].', 'Der [Helm] ist sehr wichtig.', 'Lio kann noch nicht auf der [Rampe] fahren.'] },
      ],
      nach: [
        { art: 'sprechen', auftrag: 'Stell eine Frage an Lio. Deine Partnerin oder dein Partner antwortet wie Lio.', stufe: 3, karten: [
          { titel: 'Fragen', text: ['Wo skatest du?', 'Kannst du …?', 'Fällst du oft hin?', 'Wie alt ist dein Board?'] },
          { titel: 'Antworten', text: ['Ich skate in …', 'Ja, das kann ich gut. / Nein, das übe ich noch.', 'Ja, ich falle oft hin.', 'Es ist …'] }] },
      ],
    },
    regel: {
      reihen: [
        [{ titel: 'Verben im Präsens', tabelle: { kopf: ['', 'spielen', 'tanzen', 'lesen'], zeilen: [
          ['ich', 'spiel__e__', 'tanz__e__', 'les__e__'], ['du', 'spiel__st__', 'tanz__t__', '**liest**'], ['er / sie', 'spiel__t__', 'tanz__t__', '**liest**'],
          ['wir', 'spiel__en__', 'tanz__en__', 'les__en__'], ['ihr', 'spiel__t__', 'tanz__t__', 'les__t__'], ['sie', 'spiel__en__', 'tanz__en__', 'les__en__']] } },
         { titel: '„gern“ – so sagst du, was du magst', punkte: ['Ich spiele **gern** Fußball.', 'Ich spiele **nicht gern** Fußball.', '**gern** steht nach dem Verb.', 'Am liebsten … = das mag ich am meisten.'] }],
        [{ art: 'tipp', titel: 'Das kann ich gut', punkte: ['Ich **kann gut** werfen.', 'Ich **kann** noch **nicht so gut** singen.', 'Ich bin gut **in** Mathe. / Ich bin **nicht so gut in** Sport.'] },
         { art: 'achtung', titel: 'Kleine Ausnahmen', punkte: ['tanzen: du tanz__t__ (nicht: du tanzst)', 'lesen: du **liest**, er **liest**', 'fahren: du **fährst**, er **fährt**'] }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Endungen.', stufe: 1, saetze: [
        'Ich spiel[e|9] gern Basketball.', 'Wir hör[en|10] Musik.', 'Ben zock[t|9] am Abend.', 'Ihr tanz[t|9] super!', 'Du mach[st|10] Sport.', 'Mia und Amira sing[en|10] laut.'] },
      { art: 'tabelle', auftrag: 'Ergänze die Tabelle.', stufe: 2, kopf: ['', 'machen', 'hören', 'fahren'], zeilen: [
        ['ich', 'mache', '[höre]', '[fahre]'], ['du', '[machst]', 'hörst', '[fährst]'], ['er / sie', '[macht]', '[hört]', 'fährt'], ['wir', '[machen]', '[hören]', '[fahren]'], ['ihr', 'macht', '[hört]', '[fahrt]'], ['sie', '[machen]', 'hören', '[fahren]']] },
      { art: 'ordnen', auftrag: 'Bring die Wörter in die richtige Reihenfolge. Schreib die Nummern.', stufe: 2, hilfe: 'Lösung: Ich – spiele – gern – Gitarre.', teile: ['Ich', 'spiele', 'gern', 'Gitarre.'], ordnung: [2, 0, 3, 1] },
      { art: 'fragen', auftrag: 'Was machst du gern? Was machst du nicht gern? Schreib zwei Sätze.', stufe: 2, fragen: [{ f: 'gern:', l: 'Ich schwimme gern.' }, { f: 'nicht gern:', l: 'Ich koche nicht gern.' }] },
      { art: 'fragen', auftrag: 'Was kannst du gut? Was kannst du noch nicht so gut?', stufe: 3, fragen: [{ f: 'Ich kann gut …', l: 'Ich kann gut zeichnen.' }, { f: 'Ich kann noch nicht so gut …', l: 'Ich kann noch nicht so gut schwimmen.' }] },
    ],
    sprechen: [
      { art: 'interview', auftrag: 'Klassenspaziergang: Finde eine Person für jede Zeile. Frag: „Spielst du gern Fußball?“ Schreib den Namen auf.', stufe: 2, spalten: ['Name'],
        fragen: ['… spielt gern Fußball.', '… tanzt gern.', '… liest gern.', '… kann gut zeichnen.', '… kocht gern.', '… spielt ein Instrument.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen Text für die Umfrage: Was machst du in deiner Freizeit? Schreib sechs Sätze oder mehr.', stufe: 2,
        anfaenge: ['In meiner Freizeit …', 'Ich … gern …', 'Am liebsten …', 'Das kann ich gut: …', '… mag ich nicht so gern.', 'Am Wochenende …'], zeilen: 9,
        beispiel: 'In meiner Freizeit spiele ich gern Basketball. Am liebsten spiele ich mit meinen Freunden im Park. Ich höre auch gern Musik. Das kann ich gut: werfen. Kochen mag ich nicht so gern. Am Wochenende schlafe ich lange.' },
    ],
    check: ['Ich sage, was ich gern und nicht gern mache.', 'Ich verstehe eine kurze Umfrage.', 'Ich verstehe eine kurze Präsentation über ein Hobby.', 'Ich kenne die Formen im Präsens: ich, du, er/sie, wir, ihr, sie.', 'Ich sage, was ich gut kann und was noch nicht so gut.'],
  },
  // ================================================================ 3
  {
    thema: 'Freundschaft', titel: 'Wer? Wo? Wann?', untertitel: 'Mit W-Fragen erfährst du alles: Wer kommt mit? Wo treffen wir uns? Wann geht es los? So verabredest du dich.',
    ziel: { de: 'Ich stelle W-Fragen und verabrede mich.', fr: 'Je pose des questions avec qui, où, quand … et je donne rendez-vous.' },
    bild: ['finn:froh:handy', 'lea:froh'],
    start: {
      was: 'Fragewörter',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Fragewort passt zur Antwort? Verbinde.', stufe: 1, links: ['Wer?', 'Wo?', 'Wann?', 'Was?', 'Wie?', 'Woher?'],
          rechts: ['Lea und Finn.', 'Im Park.', 'Um vier Uhr.', 'Ein Konzert.', 'Super, danke!', 'Aus Portugal.'], ordnung: [3, 5, 1, 0, 4, 2] },
      ],
    },
    lesen: {
      was: 'Anzeigen an der Pinnwand', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Pinnwand im Jugendhaus Junglinster', titel: 'Suche Leute! – Neue Freunde finden',
      absaetze: [
        '**Band sucht Sänger oder Sängerin!** Wir sind drei Jungs aus der 7P1. Wir spielen Gitarre, Bass und Schlagzeug. Wir proben jeden Freitag um 16 Uhr im Jugendhaus, Raum 2. Du singst gern? Dann komm einfach vorbei! – Finn, Jo und Tom',
        '**Wer spielt Schach mit mir?** Ich bin 13 und spiele seit einem Jahr Schach. Ich bin nicht super gut, aber ich lerne schnell. Treffen am Dienstag in der Mittagspause, Bibliothek. – Lea, 7P3',
        '**Fußball am Samstag – wer kommt mit?** Wir spielen jeden Samstag um 10 Uhr auf dem Sportplatz hinter der Schule. Mädchen und Jungen, alle sind willkommen. Bring Wasser und gute Schuhe mit! – Ben, 7P2',
        '**Tipp vom Jugendhaus:** Ihr wollt euch treffen? Trefft euch am besten an einem bekannten Ort, zum Beispiel hier im Jugendhaus. Sagt euren Eltern, wo ihr seid.',
      ],
      woerter: [['die Pinnwand', 'le tableau d’affichage'], ['die Anzeige', 'l’annonce'], ['suchen', 'chercher'], ['proben', 'répéter'], ['das Schlagzeug', 'la batterie'], ['vorbeikommen', 'passer'], ['willkommen', 'bienvenu'], ['der Ort', 'le lieu']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Lies die drei Anzeigen. Ergänze die Tabelle.', stufe: 1, kopf: ['', 'Was?', 'Wann?', 'Wo?'], breiten: [16, 28, 28, 28], zeilen: [
          ['Finn', '[Band / Musik]', '[Freitag, 16 Uhr]', '[Jugendhaus, Raum 2]'], ['Lea', '[Schach]', '[Dienstag, Mittagspause]', '[Bibliothek]'], ['Ben', '[Fußball]', '[Samstag, 10 Uhr]', '[Sportplatz]']] },
        { art: 'mc', auftrag: 'Welche Anzeige passt? Kreuze an.', stufe: 2, fragen: [
          { f: 'Sara singt sehr gern.', o: ['Finn', 'Lea', 'Ben'], r: 0 }, { f: 'Tom spielt gern Fußball.', o: ['Finn', 'Lea', 'Ben'], r: 2 },
          { f: 'Yusuf denkt gern nach und hat am Dienstag Zeit.', o: ['Finn', 'Lea', 'Ben'], r: 1 }] },
        { art: 'fragen', auftrag: 'Lies den Tipp vom Jugendhaus (Absatz 4). Warum ist er wichtig? Schreib einen Satz.', stufe: 3, fragen: [{ f: '', l: 'An einem bekannten Ort ist man sicher, und die Eltern wissen, wo man ist.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Telefongespräch verstehen', wo: 'Am Telefon · Donnerstag', titel: 'Kommst du mit?',
      situation: 'Ben ruft Sam an. Er möchte am Samstag Fußball spielen. Sam hat eine Frage.',
      bild: ['ben:froh:handy', 'sami:verwirrt:handy'], sprecher: { Ben: 'm3', Sam: 'm2' },
      text: [
        ['Sam', 'Hallo?'], ['Ben', 'Hi Sam, hier ist Ben! Was machst du am Samstag?'], ['Sam', 'Am Samstag? Ich weiß noch nicht. Warum?'],
        ['Ben', 'Wir spielen Fußball. Kommst du mit?'], ['Sam', 'Cool, ja! Wann spielt ihr?'], ['Ben', 'Um zehn Uhr.'],
        ['Sam', 'Und wo?'], ['Ben', 'Auf dem Sportplatz hinter der Schule.'], ['Sam', 'Wer kommt noch?'],
        ['Ben', 'Lina, Yusuf, Tom und vielleicht Noah. Wir sind sechs oder sieben.'], ['Sam', 'Okay. Was muss ich mitbringen?'],
        ['Ben', 'Wasser und Sportschuhe. Ich bringe den Ball mit.'], ['Sam', 'Super. Wie lange spielen wir?'], ['Ben', 'Bis zwölf Uhr. Dann gehen wir vielleicht Pizza essen.'],
        ['Sam', 'Perfekt! Bis Samstag!'], ['Ben', 'Bis Samstag, tschüss!'],
      ],
      vor: [
        { art: 'mc', auftrag: 'Was fragt man bei einer Verabredung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Wann?', 'Wo?', 'Wer kommt mit?', 'Wie alt ist dein Opa?'], r: [0, 1, 2] }] },
      ],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze die Notiz von Sam.', stufe: 1, kopf: ['Frage', 'Antwort'], breiten: [35, 65], zeilen: [
          ['Was?', '[Fußball spielen]'], ['Wann?', '[Samstag, um 10 Uhr]'], ['Wo?', '[Sportplatz hinter der Schule]'], ['Wer?', '[Lina, Yusuf, Tom, vielleicht Noah]'], ['Mitbringen?', '[Wasser und Sportschuhe]']] },
        { art: 'rf', auftrag: 'Hör noch einmal. Richtig oder falsch?', stufe: 2, saetze: [
          ['Sam bringt den Ball mit.', false], ['Sie spielen bis zwölf Uhr.', true], ['Danach gehen sie vielleicht Pizza essen.', true]] },
      ],
      nach: [
        { art: 'sprechen', auftrag: 'Ruft euch an und verabredet euch. A lädt ein, B fragt nach.', stufe: 3, karten: [
          { titel: 'A lädt ein', text: ['Was machst du am …?', 'Wir … Kommst du mit?', 'Um … Uhr.', 'In / Auf / Im …'] },
          { titel: 'B fragt nach', text: ['Wann …?', 'Wo …?', 'Wer kommt noch?', 'Was muss ich mitbringen?'] }] },
      ],
    },
    regel: {
      reihen: [
        [{ titel: 'W-Fragen', punkte: ['**Wer** kommt mit? – Person', '**Was** machst du? – Sache', '**Wo** treffen wir uns? – Ort', '**Wann** beginnt das Spiel? – Zeit', '**Wie** heißt du? – Art und Weise', '**Woher** kommst du? · **Warum** fragst du?'] },
         { titel: 'Das Verb steht an Position 2', tabelle: { kopf: ['1', '2', 'Rest'], zeilen: [['Wann', '**spielt**', 'ihr?'], ['Wo', '**wohnst**', 'du?'], ['Was', '**bringst**', 'du mit?']] } }],
        [{ art: 'tipp', titel: 'Ja-/Nein-Fragen', text: 'Ohne Fragewort steht das Verb **vorn**: **Kommst** du mit? – Ja. / Nein. · **Spielst** du gern Schach?' },
         { art: 'achtung', titel: 'Am Ende: das Fragezeichen', text: 'Jede Frage endet mit **?** · Die Stimme geht bei W-Fragen am Ende nach unten, bei Ja-/Nein-Fragen nach oben ↗.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Fragewort.', stufe: 1, woerter: ['Wer', 'Wo', 'Wann', 'Was', 'Woher', 'Wie'], saetze: [
        '[Wo] wohnst du? – In Mersch.', '[Wann] beginnt die Probe? – Um 16 Uhr.', '[Wer] spielt Schlagzeug? – Jo.', '[Was] bringst du mit? – Wasser.', '[Woher] kommt Lina? – Aus Ettelbrück.', '[Wie] geht es dir? – Gut, danke.'] },
      { art: 'fragen', auftrag: 'Hier sind Antworten. Schreib die passende Frage.', stufe: 2, fragen: [
        { f: '… ? – Ich heiße Lea.', l: 'Wie heißt du?' }, { f: '… ? – Wir treffen uns im Park.', l: 'Wo treffen wir uns?' }, { f: '… ? – Das Spiel beginnt um zehn Uhr.', l: 'Wann beginnt das Spiel?' }, { f: '… ? – Finn und Jo kommen mit.', l: 'Wer kommt mit?' }] },
      { art: 'abschreiben', auftrag: 'Mach aus dem Satz eine Ja-/Nein-Frage.', stufe: 2, kopf: ['Satz', 'Frage'], saetze: [
        ['Du kommst mit.', 'Kommst du mit?'], ['Lea spielt Schach.', 'Spielt Lea Schach?'], ['Ihr habt am Samstag Zeit.', 'Habt ihr am Samstag Zeit?']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine Anzeige für die Pinnwand: Du suchst Leute für ein Hobby. Was? Wann? Wo? Wer darf mitmachen?', stufe: 2,
        anfaenge: ['Wer … mit mir?', 'Ich bin … und …', 'Wir treffen uns am … um …', 'Ort: …', 'Bring … mit!'], zeilen: 7,
        beispiel: 'Wer backt mit mir? Ich bin 13 und backe sehr gern Kuchen. Wir treffen uns am Mittwoch um 15 Uhr im Jugendhaus, in der Küche. Bring eine Schürze mit! – Mia, 7P2' },
      { art: 'schreiben', auftrag: 'Eine Nachricht an eine Freundin oder einen Freund: Lade sie oder ihn ein. Schreib drei Sätze.', stufe: 3, zeilen: 4,
        beispiel: 'Hi Noah! Wir spielen am Samstag um 10 Uhr Fußball auf dem Sportplatz. Kommst du mit?' },
    ],
    check: ['Ich kenne die Fragewörter wer, was, wo, wann, wie, woher.', 'Ich verstehe kurze Anzeigen.', 'Ich verstehe ein Telefongespräch und notiere Zeit und Ort.', 'Ich stelle Fragen mit dem Verb an Position 2.', 'Ich verabrede mich.'],
  },
  // ================================================================ 4
  {
    thema: 'Gefühle', titel: 'Wie geht’s dir?', untertitel: 'Müde, fröhlich, wütend oder krank? Du sagst, wie es dir geht – und auch einmal „Nein, heute nicht“.',
    ziel: { de: 'Ich sage, wie es mir geht, und verneine mit „nicht“ und „kein“.', fr: 'Je dis comment je vais et j’utilise la négation avec « nicht » et « kein ».' },
    bild: ['yusuf:muede', 'amira:froh'],
    start: {
      was: 'Gefühle',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Gefühl passt? Verbinde.', stufe: 1, links: ['Ich habe heute Geburtstag!', 'Ich habe nur fünf Stunden geschlafen.', 'Mein Handy ist kaputt!', 'Ich habe Fieber.', 'Morgen ist die Prüfung.'],
          rechts: ['fröhlich', 'müde', 'wütend', 'krank', 'nervös'], ordnung: [2, 4, 0, 3, 1] },
      ],
    },
    lesen: {
      was: 'Ein Chat in der Klassengruppe', art: 'chat', ich: 'Amira', stimmen: { Amira: 'w2', Yusuf: 'm1', Mia: 'w3', Ben: 'm3' },
      quelle: 'Klassenchat 7P2 · Dienstag, 15:12', titel: 'Training heute?',
      nachrichten: [
        ['Ben', 'Hey Leute, kommt ihr heute zum Training? 🏀 Um 17 Uhr in der Halle.'],
        ['Mia', 'Nein, ich kann leider nicht. Ich bin krank. Ich habe Kopfschmerzen und Fieber. 🤒'],
        ['Amira', 'Oh nein, gute Besserung, Mia! ❤️ Ich komme. Ich bin super fröhlich heute – ich habe 56 von 60 Punkten in Mathe!'],
        ['Yusuf', 'Glückwunsch, Amira! Ich komme nicht. Ich bin so müde. Ich habe keine Energie.'],
        ['Ben', 'Schade! Und morgen? Hast du morgen Zeit, Yusuf?'],
        ['Yusuf', 'Morgen ja. Heute nicht. Ich schlafe jetzt eine Stunde. 😴'],
        ['Mia', 'Danke, Amira. Ich bin nicht traurig. Ich schaue einen Film im Bett. 😄'],
      ],
      woerter: [['krank', 'malade'], ['Kopfschmerzen', 'mal de tête'], ['das Fieber', 'la fièvre'], ['Gute Besserung!', 'Bon rétablissement !'], ['müde', 'fatigué'], ['die Energie', 'l’énergie'], ['schade', 'dommage'], ['traurig', 'triste']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wie geht es den Personen? Kommen sie zum Training?', stufe: 1, kopf: ['', 'Wie geht es?', 'Training?'], breiten: [20, 50, 30], zeilen: [
          ['Mia', '[krank: Kopfschmerzen, Fieber]', '[nein]'], ['Amira', '[fröhlich: 56 Punkte in Mathe]', '[ja]'], ['Yusuf', '[müde, keine Energie]', '[nein, aber morgen]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [
          ['Das Training ist um 17 Uhr.', true], ['Mia ist traurig.', false], ['Yusuf hat morgen Zeit.', true], ['Amira hat eine schlechte Note.', false]] },
        { art: 'fragen', auftrag: 'Mia ist krank. Schreib ihr eine kurze, nette Nachricht.', stufe: 3, fragen: [{ f: '', l: 'Gute Besserung, Mia! Ich bringe dir morgen die Hausaufgaben.' }] },
      ],
    },
    hoeren: {
      was: 'Gefühle am Ton erkennen', wo: 'In der Schule · vier kurze Szenen', titel: 'Wie geht es ihnen?',
      situation: 'Du hörst vier kurze Szenen. In jeder Szene geht es einer Person anders.',
      bild: ['tom:wuetend', 'chloe:froh'], sprecher: { Frau: 'erz', Tom: 'm3', Chloe: 'w3', Noah: 'm1', Lina: 'w2', 'Herr Kuedes': 'm2' },
      text: [
        ['Frau', 'Szene eins.'], ['Tom', 'Nein! Das gibt es nicht! Mein Fahrrad ist weg. Ich bin so wütend!'],
        ['Frau', 'Szene zwei.'], ['Chloe', 'Juhu! Wir fahren am Freitag nach Paris! Ich freue mich so!'],
        ['Frau', 'Szene drei.'], ['Herr Kuedes', 'Noah, alles in Ordnung?'], ['Noah', 'Nein, nicht so gut. Mein Bauch tut weh. Ich bin krank, glaube ich.'],
        ['Frau', 'Szene vier.'], ['Lina', 'Morgen schreiben wir den Test … Ich kann das nicht. Ich bin so nervös.'],
      ],
      vor: [
        { art: 'mc', auftrag: 'Was sagt man, wenn man krank ist? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Mein Bauch tut weh.', 'Ich freue mich!', 'Ich habe Fieber.'], r: [0, 2] }] },
      ],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wie geht es der Person? Schreib: fröhlich – wütend – krank – nervös.', stufe: 1, kopf: ['Szene', 'Person', 'Gefühl'], breiten: [18, 32, 50], zeilen: [
          ['1', 'Tom', '[wütend]'], ['2', 'Chloe', '[fröhlich]'], ['3', 'Noah', '[krank]'], ['4', 'Lina', '[nervös]']] },
        { art: 'mc', auftrag: 'Hör noch einmal. Warum? Kreuze an.', stufe: 2, fragen: [
          { f: 'Tom ist wütend, denn …', o: ['sein Handy ist kaputt.', 'sein Fahrrad ist weg.'], r: 1 },
          { f: 'Chloe ist fröhlich, denn …', o: ['sie fährt nach Paris.', 'sie hat Geburtstag.'], r: 0 },
          { f: 'Lina ist nervös, denn …', o: ['morgen ist ein Test.', 'sie ist krank.'], r: 0 }] },
      ],
      nach: [
        { art: 'sprechen', auftrag: 'Was sagst du? Spielt die Szenen zu zweit. Antwortet nett.', stufe: 3, karten: [
          { titel: 'Jemand ist …', text: ['wütend: Mein Fahrrad ist weg!', 'krank: Mein Bauch tut weh.', 'nervös: Morgen ist der Test.'] },
          { titel: 'Du antwortest', text: ['Oh nein! Ich helfe dir suchen.', 'Gute Besserung! Geh zur Krankenstation.', 'Wir lernen zusammen. Du schaffst das!'] }] },
      ],
    },
    regel: {
      reihen: [
        [{ titel: '„nicht“ – das Gegenteil', punkte: ['Ich komme. → Ich komme **nicht**.', 'Ich bin müde. → Ich bin **nicht** müde.', 'Ich tanze gern. → Ich tanze **nicht** gern.', '**nicht** verneint ein Verb oder ein Adjektiv.'] },
         { titel: '„kein“ – kein Ding, keine Sache', tabelle: { kopf: ['', 'ein / eine', 'kein / keine'], zeilen: [['der', 'ein Ball', '**kein** Ball'], ['die', 'eine Idee', '**keine** Idee'], ['das', 'ein Handy', '**kein** Handy'], ['viele', 'Hausaufgaben', '**keine** Hausaufgaben']] } }],
        [{ art: 'tipp', titel: 'So fragst du nach', punkte: ['Wie geht es dir? / Wie geht’s?', '– Gut, danke! · Es geht. · Nicht so gut.', 'Was ist los? · Alles in Ordnung?'] },
         { art: 'achtung', titel: 'Wann „kein“?', text: 'Vor einem Nomen mit **ein/eine** oder ohne Artikel: Ich habe **keine** Zeit. Ich habe **keinen** Hunger. Sonst: **nicht**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: '„nicht“ oder „kein/keine“? Ergänze.', stufe: 1, saetze: [
        'Ich komme heute [nicht].', 'Yusuf hat [keine] Energie.', 'Mia ist [nicht] traurig.', 'Wir haben [keine] Hausaufgaben.', 'Das ist [kein] Problem.', 'Tom findet sein Fahrrad [nicht].'] },
      { art: 'abschreiben', auftrag: 'Sag das Gegenteil. Schreib den Satz mit „nicht“ oder „kein“.', stufe: 2, kopf: ['Satz', 'Gegenteil'], saetze: [
        ['Ich bin müde.', 'Ich bin nicht müde.'], ['Ben hat einen Ball.', 'Ben hat keinen Ball.'], ['Wir spielen heute.', 'Wir spielen heute nicht.'], ['Lina hat eine Idee.', 'Lina hat keine Idee.']] },
      { art: 'luecken', auftrag: 'Ergänze das Gefühl.', stufe: 2, woerter: ['müde', 'wütend', 'fröhlich', 'nervös', 'krank'], saetze: [
        'Ich habe Fieber. Ich bin [krank].', 'Ich habe nur vier Stunden geschlafen. Ich bin [müde].', 'Heute ist Ferienanfang! Ich bin [fröhlich].', 'Gleich ist der Test. Ich bin [nervös].', 'Jemand hat mein Heft genommen. Ich bin [wütend].'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Antworte Ben im Klassenchat: Kommst du zum Training? Wie geht es dir? Warum (nicht)? Schreib drei bis fünf Sätze.', stufe: 2,
        anfaenge: ['Hi Ben, …', 'Ich komme (nicht), …', 'Ich bin …', 'Ich habe (kein/keine) …', 'Morgen …'], zeilen: 6,
        beispiel: 'Hi Ben, ich komme heute leider nicht. Ich bin müde und ich habe keine Zeit. Ich habe noch viele Hausaufgaben. Morgen komme ich gern!' },
      { art: 'fragen', auftrag: 'Und du? Wie geht es dir heute? Schreib zwei Sätze. (Du musst nichts Privates schreiben.)', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Heute geht es mir gut. Ich bin ein bisschen müde.' }] },
    ],
    check: ['Ich sage, wie es mir geht.', 'Ich verstehe einen kurzen Chat.', 'Ich erkenne am Ton, wie es jemandem geht.', 'Ich verneine mit „nicht“.', 'Ich verneine mit „kein/keine“.'],
  },
  // ================================================================ 5
  {
    thema: 'Können, wollen, müssen', titel: 'Ich kann das!', untertitel: 'Ein Experiment, eine Durchsage, eine Bitte: Mit „können“, „wollen“ und „müssen“ sagst du, was geht, was du willst und was sein muss.',
    ziel: { de: 'Ich benutze können, wollen und müssen mit einem Verb am Satzende.', fr: 'J’utilise « können », « wollen » et « müssen » avec un verbe à la fin de la phrase.' },
    bild: ['lea:froh:zeigen-hoch', 'tom:ueberrascht'],
    start: {
      was: 'Was kannst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was kannst du schon? Kreuze an. Du kannst auch nichts ankreuzen.', stufe: 1, fragen: [{ f: 'Ich kann …', o: ['schwimmen', 'Rad fahren', 'kochen', 'ein Instrument spielen', 'drei Sprachen sprechen', 'zeichnen', 'jonglieren', 'pfeifen'], r: -1 }] },
        { art: 'zuordnen', auftrag: 'können, wollen oder müssen? Verbinde.', stufe: 1, links: ['Lea **kann** gut zeichnen.', 'Tom **will** Pilot werden.', 'Wir **müssen** um acht Uhr in der Schule sein.'],
          rechts: ['Das ist ihr Talent.', 'Das ist sein Traum.', 'Das ist eine Regel.'], ordnung: [1, 2, 0] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung verstehen', art: 'anleitung', stimme: 'w1',
      quelle: 'Naturwissenschaften · Experiment', titel: 'Die Luftballon-Rakete',
      material: ['einen Luftballon', 'einen Trinkhalm', 'eine Schnur (3 Meter)', 'Klebeband', 'zwei Stühle'],
      schritte: [
        { icon: 'needle-thread', text: 'Zuerst **musst** du die Schnur durch den Trinkhalm **ziehen**.' },
        { icon: 'armchair', text: 'Dann **musst** du die Schnur an zwei Stühle **binden**. Die Schnur muss gerade sein.' },
        { icon: 'balloon', text: 'Jetzt **kannst** du den Luftballon **aufblasen**. Du **musst** ihn gut **festhalten**!' },
        { icon: 'link', text: 'Dann **musst** du den Luftballon mit Klebeband an den Trinkhalm **kleben**.' },
        { icon: 'rocket', text: 'Jetzt **kannst** du den Luftballon **loslassen**. Was passiert?' },
      ],
      danach: ['**Warum fliegt die Rakete?** Die Luft will aus dem Ballon heraus. Sie strömt nach hinten – und der Ballon fliegt nach vorn. So funktioniert auch eine echte Rakete.', 'Du **willst** einen Wettbewerb **machen**? Baut zwei Raketen. Welche fliegt schneller?'],
      woerter: [['die Anleitung', 'le mode d’emploi'], ['der Trinkhalm', 'la paille'], ['die Schnur', 'la ficelle'], ['binden', 'attacher'], ['aufblasen', 'gonfler'], ['festhalten', 'tenir fermement'], ['loslassen', 'lâcher'], ['strömen', 'couler, s’échapper']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'In welcher Reihenfolge? Schreib die Nummern 1 bis 5.', stufe: 1, teile: ['die Schnur durch den Trinkhalm ziehen', 'die Schnur an zwei Stühle binden', 'den Luftballon aufblasen', 'den Ballon an den Trinkhalm kleben', 'den Ballon loslassen'], ordnung: [2, 4, 0, 3, 1] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Die Schnur muss gerade sein.', true], ['Du brauchst eine Schere.', false], ['Die Luft strömt nach vorn.', false], ['Eine echte Rakete funktioniert ähnlich.', true]] },
        { art: 'fragen', auftrag: 'Warum fliegt die Rakete? Erkläre mit eigenen Worten.', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Die Luft strömt aus dem Ballon nach hinten. Darum fliegt der Ballon nach vorn.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Durchsage verstehen', wo: 'Lautsprecher · Montagmorgen', titel: 'Achtung, eine Durchsage!',
      situation: 'Am Montag um 8:05 Uhr kommt eine Durchsage aus dem Lautsprecher. Danach sprechen Sam und Amira.',
      bild: ['sami:verwirrt', 'amira:froh'], sprecher: { Durchsage: 'w1', Sam: 'm2', Amira: 'w2' },
      text: [
        ['Durchsage', 'Guten Morgen, liebe Schülerinnen und Schüler. Hier sind drei wichtige Informationen.'],
        ['Durchsage', 'Erstens: Heute ist die große Turnhalle geschlossen. Die Klassen 7P1 und 7P2 haben Sport in der kleinen Halle.'],
        ['Durchsage', 'Zweitens: Am Freitag ist unser Schulfest. Wir brauchen Hilfe am Kuchenstand. Wer will helfen? Ihr könnt euch bis Mittwoch bei Frau Sommer melden.'],
        ['Durchsage', 'Drittens: Die Bibliothek ist heute Nachmittag geschlossen. Ihr könnt eure Bücher morgen zurückgeben. Danke und einen schönen Tag!'],
        ['Sam', 'Hast du das gehört? Wir haben Sport in der kleinen Halle.'], ['Amira', 'Ja. Und ich will am Kuchenstand helfen! Ich kann gut backen.'],
        ['Sam', 'Cool. Ich kann nicht backen. Aber ich kann Kuchen verkaufen!'], ['Amira', 'Dann müssen wir zu Frau Sommer. Komm, wir gehen in der Pause.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wo hört man Durchsagen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['in der Schule', 'am Bahnhof', 'im Supermarkt', 'im Bett'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör die Durchsage. Notiere die drei Informationen.', stufe: 1, kopf: ['', 'Was?', 'Wann? / Wo?'], breiten: [10, 50, 40], zeilen: [
          ['1', '[Sport in der kleinen Halle]', '[heute]'], ['2', '[Schulfest: Hilfe am Kuchenstand]', '[Freitag; melden bis Mittwoch]'], ['3', '[Bibliothek geschlossen]', '[heute Nachmittag]']] },
        { art: 'mc', auftrag: 'Hör das Gespräch. Kreuze an.', stufe: 2, fragen: [
          { f: 'Amira will …', o: ['am Kuchenstand helfen.', 'Sport machen.'], r: 0 }, { f: 'Sam kann …', o: ['gut backen.', 'Kuchen verkaufen.'], r: 1 }, { f: 'Wann gehen sie zu Frau Sommer?', o: ['in der Pause', 'am Freitag'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Bitten und Nachfragen: Spielt kurze Gespräche. Die Sätze helfen euch.', stufe: 3, karten: [
        { titel: 'Etwas nicht verstehen', text: ['Entschuldigung, das verstehe ich nicht.', 'Kannst du das bitte wiederholen?', 'Kannst du bitte langsamer sprechen?', 'Wie sagt man „le gâteau“ auf Deutsch?'] },
        { titel: 'Um Hilfe bitten', text: ['Kannst du mir bitte helfen?', 'Ich muss … Kannst du …?', 'Willst du mit mir …?', 'Danke! – Gern geschehen.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Die Satzklammer', tabelle: { kopf: ['', 'Modalverb (Position 2)', '…', 'Verb (am Ende)'], zeilen: [['Ich', '**kann**', 'gut', '__backen__.'], ['Amira', '**will**', 'am Kuchenstand', '__helfen__.'], ['Wir', '**müssen**', 'zu Frau Sommer', '__gehen__.']] } },
         { titel: 'können – wollen – müssen', tabelle: { kopf: ['', 'können', 'wollen', 'müssen'], zeilen: [['ich', 'kann', 'will', 'muss'], ['du', 'kann__st__', 'will__st__', 'muss__t__'], ['er / sie', 'kann', 'will', 'muss'], ['wir / sie', 'können', 'wollen', 'müssen'], ['ihr', 'könnt', 'wollt', 'müsst']] } }],
        [{ art: 'tipp', titel: 'Was bedeuten sie?', punkte: ['**können** = Fähigkeit oder Möglichkeit: Ich kann schwimmen.', '**wollen** = Wunsch, Plan: Ich will helfen.', '**müssen** = Pflicht, Regel: Ich muss lernen.'] },
         { art: 'achtung', titel: 'ich und er/sie: ohne Endung!', text: 'ich **kann** – er **kann** (nicht: er kannt). ich **will** – sie **will**. ich **muss** – er **muss**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die richtige Form.', stufe: 1, saetze: ['(können) Lea [kann] gut zeichnen.', '(wollen) Wir [wollen] am Schulfest helfen.', '(müssen) Du [musst] den Ballon festhalten.', '(können) [Kannst] du mir helfen?', '(müssen) Ihr [müsst] bis Mittwoch antworten.', '(wollen) Tom [will] Pilot werden.'] },
      { art: 'abschreiben', auftrag: 'Schreib den Satz mit dem Modalverb. Das Verb wandert ans Ende!', stufe: 2, kopf: ['Satz', 'mit Modalverb'], saetze: [
        ['Ich spiele Gitarre. (können)', 'Ich kann Gitarre spielen.'], ['Sam verkauft Kuchen. (wollen)', 'Sam will Kuchen verkaufen.'], ['Wir lernen für den Test. (müssen)', 'Wir müssen für den Test lernen.'], ['Du bläst den Ballon auf. (können)', 'Du kannst den Ballon aufblasen.']] },
      { art: 'fragen', auftrag: 'Schreib über dich. Je ein Satz.', stufe: 3, fragen: [{ f: 'Das kann ich: …', l: 'Ich kann gut Fußball spielen.' }, { f: 'Das will ich lernen: …', l: 'Ich will Gitarre spielen lernen.' }, { f: 'Das muss ich heute noch machen: …', l: 'Ich muss heute noch Mathe lernen.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine Nachricht an Frau Sommer: Du willst am Schulfest helfen. Was kannst du gut? Wann hast du Zeit?', stufe: 2,
        anfaenge: ['Liebe Frau Sommer,', 'ich will am Schulfest …', 'Ich kann gut …', 'Ich habe am … Zeit.', 'Viele Grüße'], zeilen: 7,
        beispiel: 'Liebe Frau Sommer, ich will am Schulfest helfen. Ich kann gut backen und ich kann auch Kuchen verkaufen. Ich habe am Freitag von 14 bis 16 Uhr Zeit. Viele Grüße, Amira' },
    ],
    check: ['Ich verstehe eine einfache Anleitung.', 'Ich verstehe eine Durchsage in der Schule.', 'Ich kenne die Formen von können, wollen und müssen.', 'Ich stelle das zweite Verb ans Satzende.', 'Ich sage, wenn ich etwas nicht verstehe.'],
  },
  // ================================================================ 6
  {
    thema: 'Uhrzeit und Tagesablauf', titel: 'Mein Tag', untertitel: 'Wann stehst du auf? Wann beginnt die Schule? Was isst du in der Pause? Du liest und erzählst einen Tag – mit der Uhrzeit.',
    ziel: { de: 'Ich sage die Uhrzeit und erzähle meinen Tag.', fr: 'Je dis l’heure et je raconte ma journée.' },
    bild: ['nele:froh:rollstuhl', 'jana:froh:tasse'],
    start: {
      was: 'Wie spät ist es?',
      aufgaben: [
        { art: 'uhren', auftrag: 'Wie spät ist es? Schreib die Uhrzeit wie im Alltag.', stufe: 1, hilfe: 'Zum Beispiel: Viertel nach sieben · halb eins · Viertel vor fünf · acht Uhr', zeiten: ['7:15', '12:30', '16:45', '8:00'], loesungen: ['Viertel nach sieben', 'halb eins', 'Viertel vor fünf', 'acht Uhr'] },
      ],
    },
    lesen: {
      was: 'Ein Tag aus Neles Leben', art: 'text', stimme: 'w1',
      quelle: 'Schülerzeitung · Serie „Ein Tag mit …“', titel: 'Ein Tag mit Nele',
      absaetze: [
        'Mein Wecker klingelt um **6:30 Uhr**. Ich stehe nicht gern früh auf! Ich ziehe mich an, frühstücke ein Müsli und packe meine Schultasche. Um **7:20 Uhr** kommt mein Bus. Der Bus hat eine Rampe für meinen Rollstuhl.',
        'Die Schule beginnt um **acht Uhr**. Am Montag haben wir zuerst Deutsch, dann Mathe. Um **Viertel nach zehn** ist die große Pause. Ich esse ein Brötchen und rede mit meinen Freundinnen.',
        'Um **zwölf Uhr** gehen wir in die Kantine. Heute gibt es Nudeln mit Tomatensoße – mein Lieblingsessen! Am Nachmittag haben wir noch zwei Stunden. Um **Viertel vor vier** ist die Schule aus.',
        'Am Mittwoch habe ich Training in Mersch. An den anderen Tagen mache ich zu Hause meine Hausaufgaben. Dann chatte ich ein bisschen oder ich lese. Um **sieben Uhr** essen wir zu Abend.',
        'Um **halb zehn** gehe ich ins Bett. Mein Handy liegt dann in der Küche. So schlafe ich besser!',
      ],
      woerter: [['der Wecker', 'le réveil'], ['aufstehen', 'se lever'], ['sich anziehen', 's’habiller'], ['frühstücken', 'prendre le petit-déjeuner'], ['die Rampe', 'la rampe'], ['die Pause', 'la récréation'], ['zu Abend essen', 'dîner'], ['ins Bett gehen', 'aller au lit']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wann macht Nele was? Ergänze die Uhrzeit.', stufe: 1, kopf: ['Was?', 'Wann?'], breiten: [60, 40], zeilen: [
          ['Der Wecker klingelt.', '[6:30 Uhr]'], ['Der Bus kommt.', '[7:20 Uhr]'], ['Die große Pause beginnt.', '[10:15 Uhr]'], ['Die Schule ist aus.', '[15:45 Uhr]'], ['Nele geht ins Bett.', '[21:30 Uhr]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Nele steht gern früh auf.', false], ['Der Bus hat eine Rampe.', true], ['In der Kantine gibt es heute Pizza.', false], ['Am Mittwoch hat Nele Training.', true], ['Nachts liegt Neles Handy in der Küche.', true]] },
        { art: 'fragen', auftrag: 'Warum liegt Neles Handy nachts in der Küche? Was denkst du darüber?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'So schläft sie besser. Ich finde das eine gute Idee.' }] },
      ],
    },
    hoeren: {
      was: 'Am Schulkiosk', wo: 'Schulkiosk · große Pause', titel: 'Was möchtest du?',
      situation: 'Große Pause. Lina und Sam stehen am Kiosk. Herr Becker verkauft Brötchen, Obst und Getränke.',
      bild: ['lina:froh', 'sami:froh'], sprecher: { 'Herr Becker': 'm1', Lina: 'w2', Sam: 'm2' },
      text: [
        ['Herr Becker', 'Guten Morgen! Was möchtest du?'], ['Lina', 'Guten Morgen! Ich möchte ein Käsebrötchen, bitte.'],
        ['Herr Becker', 'Gern. Möchtest du auch etwas trinken?'], ['Lina', 'Ja, ein Wasser, bitte. Was kostet das?'],
        ['Herr Becker', 'Das Brötchen kostet zwei Euro, das Wasser einen Euro. Zusammen drei Euro.'], ['Lina', 'Hier, bitte.'],
        ['Herr Becker', 'Danke! Und du?'], ['Sam', 'Ich möchte nur einen Apfel. Ich habe ein Pausenbrot dabei.'],
        ['Herr Becker', 'Ein Apfel kostet fünfzig Cent.'], ['Sam', 'Lina, möchtest du auch einen Apfel?'], ['Lina', 'Nein, danke. Ich mag keine Äpfel. Aber danke!'],
        ['Sam', 'Wie spät ist es? Wann ist die Pause zu Ende?'], ['Lina', 'Es ist zehn Uhr fünfundzwanzig. Die Pause ist um halb elf zu Ende.'], ['Sam', 'Oh, dann schnell!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was kann man am Schulkiosk kaufen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Brötchen', 'einen Apfel', 'ein Fahrrad', 'Wasser'], r: [0, 1, 3] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was kaufen Lina und Sam? Was kostet es?', stufe: 1, kopf: ['', 'Was?', 'Preis'], breiten: [16, 54, 30], zeilen: [['Lina', '[ein Käsebrötchen und ein Wasser]', '[3 Euro]'], ['Sam', '[einen Apfel]', '[50 Cent]']] },
        { art: 'rf', auftrag: 'Hör noch einmal. Richtig oder falsch?', stufe: 2, saetze: [['Sam hat ein Pausenbrot dabei.', true], ['Lina mag Äpfel.', false], ['Die Pause ist um halb elf zu Ende.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt die Szene am Kiosk. Bietet auch etwas an.', stufe: 3, karten: [
        { titel: 'Kaufen', text: ['Ich möchte …, bitte.', 'Was kostet das?', 'Hier, bitte. – Danke!'] },
        { titel: 'Anbieten', text: ['Möchtest du auch …?', '– Ja, gern! Danke.', '– Nein, danke. Ich mag kein/keine …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Die Uhrzeit', tabelle: { kopf: ['Uhr', 'offiziell (Radio, Bus)', 'im Alltag'], zeilen: [['7:00', 'sieben Uhr', 'sieben (Uhr)'], ['7:15', 'sieben Uhr fünfzehn', 'Viertel nach sieben'], ['7:30', 'sieben Uhr dreißig', '**halb acht** (!)'], ['7:45', 'sieben Uhr fünfundvierzig', 'Viertel vor acht']] } },
         { titel: 'Zeit am Satzanfang', punkte: ['Ich stehe **um** sieben Uhr auf.', '**Um sieben Uhr** stehe ich auf.', 'Das Verb bleibt an **Position 2**!', 'Wie spät ist es? – Es ist halb elf.', 'Wann …? – **Um** halb elf.'] }],
        [{ art: 'achtung', titel: 'halb acht = 7:30', text: 'Im Deutschen sagst du „halb“ **vor** der nächsten Stunde: halb acht = 7:30, halb zehn = 9:30. Auf Französisch: sept heures et demie.' },
         { art: 'tipp', titel: 'Verben mit zwei Teilen', text: 'auf|stehen: Ich **stehe** um sieben Uhr **auf**. · an|ziehen: Ich **ziehe** mich **an**. Der kleine Teil steht am Ende.' }],
      ],
    },
    ueben: [
      { art: 'uhren', auftrag: 'Wie spät ist es? Schreib es offiziell und im Alltag.', stufe: 2, zeiten: ['9:30', '13:15', '18:45', '21:00'], loesungen: ['neun Uhr dreißig · halb zehn', 'dreizehn Uhr fünfzehn · Viertel nach eins', 'achtzehn Uhr fünfundvierzig · Viertel vor sieben', 'einundzwanzig Uhr · neun Uhr'] },
      { art: 'abschreiben', auftrag: 'Beginne den Satz mit der Zeit. Achtung: Das Verb steht an Position 2!', stufe: 2, kopf: ['Satz', 'mit der Zeit am Anfang'], saetze: [
        ['Ich frühstücke um sieben Uhr.', 'Um sieben Uhr frühstücke ich.'], ['Die Schule beginnt um acht Uhr.', 'Um acht Uhr beginnt die Schule.'], ['Wir essen um zwölf Uhr in der Kantine.', 'Um zwölf Uhr essen wir in der Kantine.'], ['Ich gehe um halb zehn ins Bett.', 'Um halb zehn gehe ich ins Bett.']] },
      { art: 'tabelle', auftrag: 'Frau Sommer sagt die Termine. Trag sie in deine Agenda ein.', stufe: 2,
        hilfe: '„Am Montag schreiben wir den Mathetest. Am Mittwoch ist um 14 Uhr Training in der Halle. Am Donnerstag bringt ihr bitte eure Sportschuhe mit. Am Freitag ist um 15 Uhr das Schulfest.“',
        kopf: ['Tag', 'Was?', 'Wann? / Was mitbringen?'], breiten: [20, 45, 35], zeilen: [['Montag', '[Mathetest]', ''], ['Mittwoch', '[Training in der Halle]', '[14 Uhr]'], ['Donnerstag', '[Sport]', '[Sportschuhe]'], ['Freitag', '[Schulfest]', '[15 Uhr]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen Text für die Serie „Ein Tag mit …“. Erzähl deinen Schultag mit Uhrzeiten. Du darfst auch einen ausgedachten Tag beschreiben.', stufe: 2,
        anfaenge: ['Mein Wecker klingelt um …', 'Um … Uhr …', 'Die Schule beginnt …', 'In der Pause …', 'Am Nachmittag …', 'Um … gehe ich ins Bett.'], zeilen: 10,
        beispiel: 'Mein Wecker klingelt um sechs Uhr. Um halb sieben frühstücke ich. Um sieben Uhr fahre ich mit dem Bus zur Schule. Die Schule beginnt um acht Uhr. In der Pause esse ich ein Brötchen. Am Nachmittag spiele ich Fußball. Um zehn Uhr gehe ich ins Bett.' },
    ],
    check: ['Ich lese die Uhrzeit offiziell und im Alltag.', 'Ich verstehe einen Text über einen Tagesablauf.', 'Ich kaufe etwas am Kiosk und biete etwas an.', 'Ich beginne einen Satz mit der Zeit (Verb an Position 2).', 'Ich schreibe Termine in meine Agenda.'],
  },
  // ================================================================ 7
  {
    thema: 'Wege in der Schule', titel: 'Wo ist die Turnhalle?', untertitel: 'Neue Schule, viele Türen. Du liest einen Plan, fragst höflich nach dem Weg – und erklärst ihn selbst.',
    ziel: { de: 'Ich frage nach dem Weg und beschreibe ihn mit links, rechts und geradeaus.', fr: 'Je demande mon chemin et je l’explique avec à gauche, à droite et tout droit.' },
    bild: ['noah:verwirrt:stehen', 'lehrerin:froh:stehen-zeigen'],
    start: {
      was: 'Räume in der Schule',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was macht man hier? Verbinde.', stufe: 1, links: ['die Turnhalle', 'die Kantine', 'die Bibliothek', 'das Sekretariat', 'die Krankenstation', 'die Werkstatt'],
          rechts: ['Sport machen', 'zu Mittag essen', 'Bücher ausleihen', 'Fragen stellen, Formulare abgeben', 'Hilfe holen, wenn man krank ist', 'mit Holz und Metall arbeiten'], ordnung: [3, 0, 5, 1, 4, 2] },
      ],
    },
    lesen: {
      was: 'Einen Plan lesen', art: 'text', stimme: 'w1',
      quelle: 'Willkommensheft für neue Schülerinnen und Schüler', titel: 'So findest du dich zurecht: das Erdgeschoss',
      plan: { titel: 'ERDGESCHOSS', breite: 16, hoehe: 9, flure: [{ x: 0, y: 4, w: 16, h: 1.6 }, { x: 7, y: 5.6, w: 2, h: 3.4 }],
        raeume: [{ name: 'Kantine', x: 0, y: 0, w: 5, h: 4, farbe: '#fbefe9' }, { name: 'Bibliothek', marke: 'A', leer: true, x: 5, y: 0, w: 3.5, h: 4 }, { name: 'Sekretariat', marke: 'B', leer: true, x: 8.5, y: 0, w: 3, h: 4 },
          { name: 'Krankenstation', marke: 'C', leer: true, x: 11.5, y: 0, w: 2.6, h: 4 }, { name: 'WC', x: 14.1, y: 0, w: 1.9, h: 4, farbe: '#eef1f6' }, { name: 'Turnhalle', x: 0, y: 5.6, w: 7, h: 3.4, farbe: '#e9f6ed' },
          { name: 'Werkstatt', marke: 'D', leer: true, x: 9, y: 5.6, w: 4, h: 3.4 }, { name: 'Lehrerzimmer', x: 13, y: 5.6, w: 3, h: 3.4, farbe: '#eef1f6' }],
        treppen: [{ x: 14.4, y: 4.1 }], start: { x: 8, y: 9, text: 'Eingang' } },
      absaetze: [
        'Herzlich willkommen! Du kommst durch den **Eingang**. Dann gehst du **geradeaus** bis zum großen Flur.',
        '**Links** vom Eingang ist die **Turnhalle**. **Rechts** vom Eingang ist die **Werkstatt**. Dort arbeitet ihr mit Holz und Metall. **Neben** der Werkstatt ist das Lehrerzimmer.',
        'Im Flur siehst du ganz links die **Kantine**. **Neben** der Kantine ist die **Bibliothek**. Dort kannst du Bücher ausleihen und in Ruhe lernen.',
        'Neben der Bibliothek ist das **Sekretariat**. Hier bekommst du Hilfe, wenn du Fragen hast. **Zwischen** dem Sekretariat und den Toiletten ist die **Krankenstation**.',
        'Die **Treppe** ist rechts am Ende vom Flur. Im **ersten Stock** sind die Klassenzimmer.',
      ],
      woerter: [['das Erdgeschoss', 'le rez-de-chaussée'], ['der Eingang', 'l’entrée'], ['der Flur', 'le couloir'], ['geradeaus', 'tout droit'], ['links / rechts', 'à gauche / à droite'], ['neben', 'à côté de'], ['zwischen', 'entre'], ['ausleihen', 'emprunter'], ['der erste Stock', 'le premier étage']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Lies den Text. Welcher Raum ist A, B, C, D? Schreib die Namen auch in den Plan.', stufe: 1, kopf: ['A', 'B', 'C', 'D'], zeilen: [['[Bibliothek]', '[Sekretariat]', '[Krankenstation]', '[Werkstatt]']] },
        { art: 'rf', auftrag: 'Schau auf den Plan. Richtig oder falsch?', stufe: 2, saetze: [['Die Turnhalle ist links vom Eingang.', true], ['Die Kantine ist neben dem Lehrerzimmer.', false], ['Die Treppe ist am Ende vom Flur.', true], ['Die Klassenzimmer sind im Erdgeschoss.', false]] },
      ],
    },
    hoeren: {
      was: 'Wegbeschreibungen verstehen', wo: 'Erster Stock · am Morgen', titel: 'Entschuldigung, wo ist …?',
      situation: 'Noah ist im ersten Stock. Er steht oben an der Treppe. Er sucht drei Räume und fragt drei Personen.',
      bild: ['noah:verwirrt', 'lehrerin:froh'], sprecher: { Noah: 'm1', 'Frau Sommer': 'w1', Lea: 'w2', Ben: 'm3' },
      text: [
        ['Noah', 'Entschuldigung, Frau Sommer. Wo ist der Musiksaal, bitte?'], ['Frau Sommer', 'Der Musiksaal? Geh einfach geradeaus, bis zum Ende vom Flur. Er ist ganz links oben, neben Raum 101.'], ['Noah', 'Vielen Dank!'],
        ['Noah', 'Hallo Lea! Weißt du, wo der Computerraum ist?'], ['Lea', 'Ja, klar. Auch am Ende vom Flur, aber auf der anderen Seite. Er ist gegenüber vom Musiksaal.'], ['Noah', 'Gegenüber vom Musiksaal. Danke!'],
        ['Noah', 'Ben, wo ist der Kunstraum?'], ['Ben', 'Der Kunstraum ist neben dem Computerraum. Gegenüber von Raum 101.'], ['Noah', 'Super, danke! Jetzt finde ich alles.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie fragst du höflich nach dem Weg? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Entschuldigung, wo ist …, bitte?', 'Wo ist …? Schnell!', 'Weißt du, wo … ist?'], r: [0, 2] }] }],
      beim: [
        { art: 'plan', auftrag: 'Hör zu. Welcher Raum ist E, F, G? Schreib die Namen in den Plan.', stufe: 1, titel: 'ERSTER STOCK', breite: 16, hoehe: 9, flure: [{ x: 0, y: 4, w: 16, h: 1.6 }],
          raeume: [{ name: 'Musiksaal', marke: 'E', leer: true, x: 0, y: 0, w: 4, h: 4 }, { name: '101', x: 4, y: 0, w: 4, h: 4 }, { name: '102', x: 8, y: 0, w: 4, h: 4 }, { name: '103', x: 12, y: 0, w: 4, h: 4 },
            { name: 'Computerraum', marke: 'F', leer: true, x: 0, y: 5.6, w: 4, h: 3.4 }, { name: 'Kunstraum', marke: 'G', leer: true, x: 4, y: 5.6, w: 4, h: 3.4 }, { name: '104', x: 8, y: 5.6, w: 4, h: 3.4 }, { name: 'WC', x: 12, y: 5.6, w: 4, h: 3.4, farbe: '#eef1f6' }],
          treppen: [{ x: 14.4, y: 4.1 }], start: { x: 13.6, y: 4.8, text: '' } },
        { art: 'luecken', auftrag: 'Hör noch einmal. Ergänze.', stufe: 2, woerter: ['geradeaus', 'gegenüber', 'neben', 'Ende'], saetze: ['Geh einfach [geradeaus].', 'Der Musiksaal ist [neben] Raum 101.', 'Der Computerraum ist am [Ende] vom Flur.', 'Er ist [gegenüber] vom Musiksaal.'] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Arbeitet mit dem Plan vom Erdgeschoss. A fragt, B erklärt den Weg vom Eingang.', stufe: 3, karten: [
        { titel: 'A fragt', text: ['Entschuldigung, wo ist die Kantine?', 'Wie komme ich zur Bibliothek?', 'Wo ist das Sekretariat, bitte?'] },
        { titel: 'B erklärt', text: ['Du gehst geradeaus bis zum Flur.', 'Dann gehst du links / rechts.', 'Die … ist neben / gegenüber von …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Wege beschreiben', punkte: ['**geradeaus** ↑ · **links** ← · **rechts** →', 'Du gehst **geradeaus** bis zum Flur.', 'Dann gehst du **links**.', 'Die Kantine ist **ganz links**.', 'Die Treppe ist **am Ende** vom Flur.'] },
         { titel: 'Wo ist das?', punkte: ['**neben** der Kantine', '**gegenüber** vom Musiksaal', '**zwischen** dem Sekretariat und dem WC', '**im** Erdgeschoss · **im** ersten Stock', '**links / rechts vom** Eingang'] }],
        [{ art: 'tipp', titel: 'Höflich fragen', punkte: ['**Entschuldigung**, wo ist …, **bitte**?', 'Wie komme ich **zur** Turnhalle? (die → zur)', 'Wie komme ich **zum** Sekretariat? (das → zum)', '**Vielen Dank!** – Bitte, gern.'] },
         { art: 'achtung', titel: 'Erkennen reicht', text: 'Nach **neben, zwischen, im, vom** ändert sich der Artikel (der → dem). Das musst du jetzt noch nicht können. Lern die Ausdrücke wie Bausteine: **neben der Kantine**, **im ersten Stock**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Schau auf den Plan vom Erdgeschoss. Ergänze.', stufe: 1, woerter: ['links', 'rechts', 'neben', 'zwischen', 'Ende'], saetze: ['Die Turnhalle ist [links] vom Eingang.', 'Die Werkstatt ist [rechts] vom Eingang.', 'Die Bibliothek ist [neben] der Kantine.', 'Die Krankenstation ist [zwischen] dem Sekretariat und dem WC.', 'Die Treppe ist am [Ende] vom Flur.'] },
      { art: 'mc', auftrag: 'Du stehst am Eingang. Wohin gehst du? Kreuze an.', stufe: 2, fragen: [
        { f: '„Geh geradeaus bis zum Flur. Dann ganz links.“', o: ['Kantine', 'Turnhalle', 'Werkstatt'], r: 0 },
        { f: '„Geh nicht in den Flur. Die Tür ist direkt rechts.“', o: ['Lehrerzimmer', 'Werkstatt', 'Sekretariat'], r: 1 },
        { f: '„Geh geradeaus bis zum Flur, dann rechts bis zum Ende.“', o: ['Treppe', 'Bibliothek', 'Turnhalle'], r: 0 }] },
      { art: 'fragen', auftrag: 'Du stehst am Eingang. Beschreib den Weg zur Bibliothek.', stufe: 3, fragen: [{ f: '', zeilen: 3, l: 'Du gehst geradeaus bis zum Flur. Dann gehst du links. Die Bibliothek ist neben der Kantine.' }] },
    ],
    schreiben: [
      { art: 'frei', auftrag: 'Zeichne eine Skizze: der Weg von der Bushaltestelle zur Schule (oder zu einem Ort, den du gut kennst).', stufe: 2,
        html: '<div style="height:70mm;border:0.35mm dashed var(--linie);border-radius:3mm;background:repeating-linear-gradient(0deg,transparent 0 4.9mm,#eef1f6 4.9mm 5mm),repeating-linear-gradient(90deg,transparent 0 4.9mm,#eef1f6 4.9mm 5mm)"></div>' },
      { art: 'schreiben', auftrag: 'Beschreib den Weg zu deiner Skizze. Schreib vier Sätze oder mehr.', stufe: 2, anfaenge: ['Zuerst gehst du …', 'Dann …', 'Neben … ist …', 'Am Ende …'], zeilen: 6,
        beispiel: 'Zuerst gehst du geradeaus über die Straße. Dann gehst du rechts. Neben der Bäckerei ist ein kleiner Park. Am Ende vom Park siehst du die Schule.' },
    ],
    check: ['Ich lese einen einfachen Plan.', 'Ich frage höflich nach dem Weg.', 'Ich verstehe eine Wegbeschreibung.', 'Ich benutze links, rechts, geradeaus, neben, gegenüber.', 'Ich beschreibe einen Weg mit einer Skizze.'],
  },
  // ================================================================ 8
  {
    thema: 'Feste und Einladungen', titel: 'Du bist eingeladen!', untertitel: 'Eine Party, ein Geburtstag, ein Dankeschön: Du liest Einladungen, gratulierst – und schreibst selbst Karten.',
    ziel: { de: 'Ich schreibe eine Einladung und antworte auf Einladungen.', fr: 'J’écris une invitation et je réponds à des invitations.' },
    bild: ['amira:aufgeregt', 'ben:froh'],
    start: {
      was: 'Glückwünsche',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was sagst du wann? Verbinde.', stufe: 1, links: ['Alles Gute zum Geburtstag!', 'Gute Besserung!', 'Viel Glück!', 'Frohe Weihnachten!', 'Herzlichen Glückwunsch!'],
          rechts: ['Jemand hat Geburtstag.', 'Jemand ist krank.', 'Jemand hat morgen eine Prüfung.', 'Es ist der 24. Dezember.', 'Jemand hat einen Preis gewonnen.'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Eine Einladung und zwei Antworten', art: 'dokumente', stimme: 'w1',
      quelle: 'Einladung · Nachrichten', titel: 'Amira wird 13!',
      dokumente: [
        { stil: 'karte', kopf: '🎉 Einladung zu meiner Geburtstagsparty!', stimme: 'w2', text: ['Liebe Freundinnen, liebe Freunde,', 'ich werde 13 und möchte mit euch feiern! Die Party ist am **Samstag, 14. März**, von **15 bis 19 Uhr** im **Jugendhaus Junglinster**.', 'Es gibt Pizza, Saft und Musik. Wir tanzen und spielen Spiele. Bitte bringt gute Laune mit – Geschenke sind nicht wichtig!', 'Bitte antwortet bis **Mittwoch**.'], gruss: 'Eure Amira' },
        { stil: 'nachricht', kopf: 'Lina:', stimme: 'w3', text: ['Hi Amira, danke für die Einladung! Ich komme sehr gern. Soll ich Muffins mitbringen? Ich kann gut backen. 🧁'] },
        { stil: 'nachricht', kopf: 'Yusuf:', stimme: 'm1', text: ['Liebe Amira, vielen Dank für die Einladung! Leider kann ich nicht kommen. Am Samstag bin ich bei meinem Onkel in Belgien. Ich wünsche dir eine tolle Party! Wir feiern dann am Montag in der Pause, okay?'] },
      ],
      woerter: [['die Einladung', 'l’invitation'], ['feiern', 'faire la fête'], ['die gute Laune', 'la bonne humeur'], ['das Geschenk', 'le cadeau'], ['antworten', 'répondre'], ['leider', 'malheureusement'], ['sich wünschen', 'souhaiter']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Lies die Einladung. Ergänze die Informationen.', stufe: 1, kopf: ['Wer feiert?', 'Wann?', 'Wo?', 'Antwort bis?'], zeilen: [['[Amira]', '[Sa, 14. März, 15–19 Uhr]', '[Jugendhaus Junglinster]', '[Mittwoch]']] },
        { art: 'mc', auftrag: 'Lies die Antworten. Kreuze an.', stufe: 2, fragen: [
          { f: 'Lina …', o: ['kommt.', 'kommt nicht.'], r: 0 }, { f: 'Yusuf …', o: ['kommt.', 'kommt nicht.'], r: 1 }, { f: 'Warum kann Yusuf nicht kommen?', o: ['Er ist krank.', 'Er ist in Belgien.', 'Er hat Training.'], r: 1 }] },
        { art: 'fragen', auftrag: 'Was schreibt man in eine Absage? Finde in Yusufs Nachricht drei Teile.', stufe: 3, fragen: [{ f: '', zeilen: 3, l: 'Danke sagen – leider nicht kommen + Grund – eine tolle Party wünschen' }] },
      ],
    },
    hoeren: {
      was: 'Am Telefon gratulieren und auf der Party', wo: 'Telefon · Party im Jugendhaus', titel: 'Alles Gute, Amira!',
      situation: 'Am Samstagmorgen ruft Ben bei Amira an. Am Nachmittag ist die Party.',
      bild: ['ben:froh:handy', 'amira:froh:handy'], sprecher: { Ben: 'm3', Amira: 'w2', Lina: 'w1' },
      text: [
        ['Amira', 'Hallo?'], ['Ben', 'Hallo Amira! Hier ist Ben. Alles Gute zum Geburtstag!'], ['Amira', 'Oh, danke, Ben! Das ist so lieb.'],
        ['Ben', 'Ich komme heute gern zur Party. Was soll ich mitbringen?'], ['Amira', 'Vielleicht Chips? Lina bringt Muffins mit.'], ['Ben', 'Okay, ich bringe Chips mit. Bis später!'],
        ['Lina', 'Hier, Ben, möchtest du einen Muffin? Mit Schokolade!'], ['Ben', 'Ja, gern! Danke, Lina. Hm, lecker!'],
        ['Amira', 'Möchtest du auch etwas trinken, Ben? Es gibt Orangensaft und Apfelsaft.'], ['Ben', 'Einen Apfelsaft, bitte.'],
        ['Amira', 'Danke, dass ihr da seid! Das ist der beste Geburtstag!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was sagt man zum Geburtstag? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Alles Gute zum Geburtstag!', 'Gute Besserung!', 'Herzlichen Glückwunsch!'], r: [0, 2] }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Ben gratuliert am Telefon.', true], ['Ben bringt Muffins mit.', false], ['Lina bietet Ben einen Muffin an.', true], ['Ben trinkt einen Orangensaft.', false]] },
        { art: 'luecken', auftrag: 'Hör noch einmal. Ergänze.', stufe: 2, saetze: ['Was soll ich [mitbringen]?', 'Möchtest du einen [Muffin]?', 'Möchtest du auch etwas [trinken]?', 'Das ist der [beste] Geburtstag!'] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Party-Gespräche: Gratuliert und bietet etwas an.', stufe: 3, karten: [
        { titel: 'Gratulieren', text: ['Alles Gute zum Geburtstag!', 'Wie alt bist du jetzt?', 'Hier ist ein kleines Geschenk.'] },
        { titel: 'Anbieten und antworten', text: ['Möchtest du …?', '– Ja, gern! / Nein, danke.', 'Es gibt … und …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Nomen schreibt man groß', punkte: ['Nomen sind Namen für Dinge, Menschen, Tiere, Gefühle: die **P**arty, der **F**reund, die **L**aune.', 'Vor Nomen steht oft ein Artikel: **der, die, das** oder **ein, eine**.', 'Verben und Adjektive schreibt man klein: feiern, tanzen, lecker, toll.'] },
         { titel: 'der – die – das', tabelle: { kopf: ['der', 'die', 'das'], zeilen: [['der Saft', 'die Party', 'das Geschenk'], ['der Muffin', 'die Einladung', 'das Fest'], ['der Geburtstag', 'die Musik', 'das Spiel']] } }],
        [{ art: 'tipp', titel: 'Im Wörterbuch nachschlagen', text: 'Im Wörterbuch steht: **Ge|schenk**, //das//; -(e)s, -e. Das heißt: **das** Geschenk, viele **Geschenke**. Lern jedes Nomen immer **mit Artikel**!' },
         { art: 'achtung', titel: 'Groß oder klein?', text: '„Ich wünsche dir **v**iel **G**lück!“ – **Glück** ist ein Nomen (das Glück). **viel** ist kein Nomen. Frag: Kann ich „das“ oder „die“ davor sagen?' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Schreib richtig: Nomen groß, alles andere klein (außer am Satzanfang).', stufe: 1, saetze: [
        ['die party ist im jugendhaus.', 'Die Party ist im Jugendhaus.'], ['ich bringe einen kuchen mit.', 'Ich bringe einen Kuchen mit.'], ['wir tanzen und spielen spiele.', 'Wir tanzen und spielen Spiele.']] },
      { art: 'luecken', auftrag: 'der, die oder das? Ergänze. Du kannst im Wörterbuch nachschauen.', stufe: 2, saetze: ['[die|10] Einladung', '[der|10] Geburtstag', '[das|10] Geschenk', '[die|10] Musik', '[der|10] Saft', '[das|10] Fest'] },
      { art: 'tabelle', auftrag: 'Mini-Wörterbuch: Lies die Einträge. Ergänze Artikel und Mehrzahl.', stufe: 3, hilfe: 'Ku|chen, der; -s, -  ·  Ker|ze, die; -, -n  ·  Spiel, das; -(e)s, -e',
        kopf: ['Wort', 'Artikel', 'Mehrzahl'], zeilen: [['Kuchen', '[der]', '[die Kuchen]'], ['Kerze', '[die]', '[die Kerzen]'], ['Spiel', '[das]', '[die Spiele]']] },
    ],
    schreibenNeueSeite: true,
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine Einladung zu einem Fest (Geburtstag, Klassenfest, Filmabend …). Was? Wann? Wo? Antwort bis wann?', stufe: 2,
        anfaenge: ['Liebe …, lieber …,', 'ich lade dich / euch ein …', 'Das Fest ist am … um …', 'Es gibt …', 'Bitte antworte bis …', 'Dein / Deine …'], zeilen: 8,
        beispiel: 'Liebe Klasse, ich lade euch zu einem Filmabend ein! Er ist am Freitag, 20. März, um 18 Uhr im Jugendhaus. Es gibt Popcorn und Saft. Bitte antwortet bis Mittwoch. Euer Noah' },
      { art: 'schreiben', auftrag: 'Du warst auf der Party. Schreib eine kurze Dankeskarte an die Gastgeberin oder den Gastgeber.', stufe: 3, zeilen: 4,
        beispiel: 'Liebe Amira, danke für die tolle Party! Die Pizza war super und wir haben viel getanzt. Bis Montag! Dein Ben' },
    ],
    check: ['Ich verstehe eine Einladung und Antworten darauf.', 'Ich gratuliere und sage Glückwünsche.', 'Ich biete auf einer Party etwas an.', 'Ich schreibe Nomen groß und lerne sie mit Artikel.', 'Ich schreibe eine Einladung und eine Dankeskarte.'],
  },
]

// Deutsch · Modul 1 „Ich und die anderen“ (Voie de préparation, A1) – multimodales Heft (Lesen, Hören, Regel, Üben, Schreiben).
// Themen und Grammatik nach den öffentlichen „Kompetenzorientierten Bildungsstandards Deutsch für den Modularunterricht“
// (MENFP 2009), Modul 1: Familie, Hobbys, Schule, Freundschaft; Präsens, W-Fragen, Verneinung mit „nicht“, Modalverb +
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
  untertitel: { de: 'Sich vorstellen, Hobbys, Freundschaft, Schule: lesen, hören, sprechen und schreiben – in acht Lektionen.', fr: 'Se présenter, loisirs, amitié, école : lire, écouter, parler et écrire – en huit leçons.' },
  farben: { tief: '#b4432e', mittel: '#eaa38f', zart: '#fbefe9', dunkel: '#7e2b1c' },
  deckbild: ['sami:froh:stehen', 'lina:froh:laessig', 'noah:froh:stehen-zeigen'],
  blasen: [{ t: 'Moien!', x: 22, y: 118 }, { t: 'Hallo!', x: 150, y: 106 }, { t: 'Salut!', x: 128, y: 150 }],
  themen: [
    { titel: { de: 'Ich und die anderen', fr: 'Moi et les autres' }, icon: 'users', lektionen: 1 },
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
          { titel: 'Person A', text: 'Hallo! Bist du auch neu hier? · Wie alt bist du? · Wo wohnst du? · Was machst du gern?' },
          { titel: 'Person B', text: 'Ja. Ich heiße … · Ich bin … Jahre alt. · Ich wohne in … · Ich … gern.' }] },
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
]

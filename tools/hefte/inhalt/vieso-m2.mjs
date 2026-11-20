// Vie et société · Modul 2 (7P) „Zusammen leben“ – nach dem MENJE-Rahmenlehrplan „Leben und Gesellschaft“, 7. Klasse:
// Lernfeld „Zusammenleben in Gemeinschaften“ (Regeln, Gerechtigkeit, Menschenrechte), „Feste, Rituale und Traditionen“
// (Luxemburg, Feste der Religionen), „Religionen kennenlernen: das Judentum“, „Begegnung mit Vertrautem und Fremdem“,
// „Verantwortung in der Gemeinschaft“ (Ehrenamt). Viele Karten zum Ausschneiden (Regel-, Gerechtigkeits-, Rechte-,
// Fest-, Willkommens- und Ideenkarten). Religionen sachlich und respektvoll; Persönliches nur freiwillig; Personen ausgedacht.
import { sachModul } from './sachfach-gemeinsam.mjs'

export const MODUL = sachModul('vieso', 2, {
  titel: 'Zusammen leben',
  titelFr: 'Vivre ensemble',
  unter: 'Warum es Regeln braucht, was gerecht ist, Menschenrechte, Feste in Luxemburg und in vielen Religionen, das Judentum, neu sein – und gemeinsam helfen. Mit vielen Karten zum Ausschneiden.',
  unterFr: 'Règles, justice, droits humains, fêtes et religions, le judaïsme, être nouveau – et s’engager ensemble.',
  farbe: '#b5651d',
  deckbild: ['yusuf:froh:stehen', 'mia:froh:stehen-zeigen', 'lehrerin:froh:erklaeren'],
  blasen: [{ t: 'Ist das gerecht?', x: 12, y: 110 }, { t: 'Frohes Fest!', x: 130, y: 96 }, { t: 'Willkommen!', x: 164, y: 150 }],
  themen: [
    { titel: { de: 'Regeln und Rechte', fr: 'Règles et droits' }, icon: 'scale', lektionen: 3 },
    { titel: { de: 'Feste und Religionen', fr: 'Fêtes et religions' }, icon: 'confetti', lektionen: 3 },
    { titel: { de: 'Miteinander', fr: 'Ensemble' }, icon: 'users-group', lektionen: 2 },
  ],
})

const FRAGE = '#b5651d', DILEMMA = '#6d4bc4', RECHT = '#2f6db5', FEST = '#d0577b', IDEE = '#2f8a6b'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Regeln · Gemeinschaft · Gedankenexperiment', titel: 'Die Insel ohne Regeln', untertitel: 'Was passiert, wenn es keine Regeln gibt? Du liest ein Gedankenexperiment, hörst, wie eine Gruppe eigene Regeln findet, und prüfst Regeln mit Karten.',
    ziel: { de: 'Ich erkläre, warum Gemeinschaften Regeln brauchen, und prüfe, ob eine Regel sinnvoll und gerecht ist.', fr: 'J’explique pourquoi une communauté a besoin de règles et je vérifie si une règle est juste et utile.' },
    bild: ['ben:froh:stehen', 'jana:froh:stehen'],
    start: {
      was: 'Regeln überall',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Wo gibt es Regeln? Sammle Beispiele.', stufe: 1, mitte: 'Regeln', aeste: ['im Straßenverkehr', { l: 'in der Schule' }, { l: 'im Sport' }, { l: 'beim Spielen' }, { l: 'im Internet' }, { l: 'im Bus' }] },
      ],
    },
    lesen: {
      was: 'Ein Gedankenexperiment', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Geschichte (ausgedacht)', titel: 'Gestrandet',
      absaetze: [
        'Stell dir vor: Ein Schiff mit 24 Jugendlichen gerät in einen Sturm. Alle retten sich auf eine kleine Insel. Es gibt Fische, Kokosnüsse, eine Quelle – aber keine Erwachsenen und **keine Regeln**.',
        'Am ersten Tag ist alles ein Abenteuer. Jeder macht, was er will. Am zweiten Tag gibt es Streit: Die Stärksten nehmen sich die meisten Kokosnüsse. Zwei Jungen schlafen den ganzen Tag, andere sammeln Holz für alle. Das Feuer geht in der Nacht aus, weil niemand aufgepasst hat.',
        'Am dritten Tag ruft Lina alle zusammen: „So geht das nicht weiter. Wir brauchen Regeln!“ – „Wer bestimmt die?“, fragt Ben. „Ich bin am stärksten, also ich!“ – „Nein“, sagt Jana. „Wir bestimmen sie **zusammen**. Und sie gelten für **alle** – auch für dich.“',
        'Sie setzen sich in einen Kreis. Jeder darf etwas sagen. Am Ende haben sie fünf Regeln, und sie stimmen ab. Eine Regel heißt: **Wer eine Regel bricht, muss am nächsten Tag Wasser holen.** Ob das funktioniert?',
      ],
      woerter: [['die Regel', 'la règle'], ['die Gemeinschaft', 'la communauté'], ['stranden', 'échouer'], ['der Streit', 'la dispute'], ['abstimmen', 'voter'], ['gelten für', 'valoir pour'], ['eine Regel brechen', 'enfreindre une règle'], ['gerecht', 'juste']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Welche Probleme gibt es am zweiten Tag?', zeilen: 2, l: 'Die Stärksten nehmen die meisten Kokosnüsse, manche faulenzen, das Feuer geht aus.' }, { f: 'Wie finden die Jugendlichen ihre Regeln?', zeilen: 2, l: 'Sie setzen sich in einen Kreis, jeder darf etwas sagen, dann stimmen sie ab.' }] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Am ersten Tag gibt es schon viel Streit.', false], ['Ben will allein bestimmen, weil er der Stärkste ist.', true], ['Die Regeln gelten nur für die Kleinen.', false]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Auf der Insel · am Feuer', titel: 'Unsere fünf Regeln',
      situation: 'Die Jugendlichen auf der Insel beraten über ihre Regeln.',
      bild: ['jana:froh:stehen-zeigen', 'ben:verwirrt:stehen'], sprecher: { Lina: 'w2', Ben: 'm3', Jana: 'w3', Tom: 'm1' },
      text: [
        ['Lina', 'Erste Regel: Das Essen wird gerecht geteilt. Jeder bekommt gleich viel.'],
        ['Ben', 'Aber ich arbeite mehr, ich brauche mehr!'],
        ['Jana', 'Und wer krank ist, braucht vielleicht auch mehr. Gleich viel ist nicht immer gerecht.'],
        ['Tom', 'Okay: Jeder bekommt genug. Wer schwer arbeitet oder krank ist, bekommt etwas mehr.'],
        ['Lina', 'Zweite Regel: Jeder hilft jeden Tag zwei Stunden, beim Holz, Wasser oder Fischen.'],
        ['Jana', 'Dritte Regel: Niemand wird geschlagen oder ausgelacht.'],
        ['Tom', 'Vierte: Nachts wacht immer jemand am Feuer. Wir wechseln uns ab.'],
        ['Ben', 'Und fünfte: Wenn jemand eine Regel ändern will, reden wir alle darüber und stimmen ab.'],
        ['Lina', 'Super, Ben! Siehst du – du bestimmst doch mit.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine gute Regel? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Sie gilt für alle.', 'Sie ist verständlich.', 'Sie hilft der Gemeinschaft.', 'Sie nützt nur dem Stärksten.'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und notiere die fünf Regeln.', stufe: 1, kopf: ['Nr.', 'Regel'], breiten: [10, 90], zeilen: [['1', '[Essen wird gerecht geteilt: jeder genug, wer schwer arbeitet oder krank ist, etwas mehr]'], ['2', '[Jeder hilft jeden Tag zwei Stunden.]'], ['3', '[Niemand wird geschlagen oder ausgelacht.]'], ['4', '[Nachts wacht immer jemand am Feuer, abwechselnd.]'], ['5', '[Regeln ändern: alle reden darüber und stimmen ab.]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Regel ist die wichtigste? Welche würdet ihr noch hinzufügen?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Am wichtigsten finde ich …, weil …', 'Ich würde noch … hinzufügen.', 'Ich bin nicht einverstanden mit …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Wozu Regeln?', punkte: ['Sie **schützen** die Schwächeren.', 'Sie machen das Zusammenleben **planbar**.', 'Sie helfen, **Streit** zu lösen.'] },
         { titel: 'Eine gute Regel …', nummern: true, punkte: ['gilt für **alle**', 'ist **verständlich**', 'ist **gerecht**', 'kann **gemeinsam geändert** werden'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Regel-Karten: Schneidet die Karten aus. Prüft jede Regel zu zweit: Gilt sie für alle? Ist sie verständlich und gerecht? Legt sie auf zwei Stapel: „gute Regel“ und „Regel verbessern“.', stufe: 2, neueSeite: true, titel: 'Regel-Check', icon: 'scale', farbe: FRAGE, spalten: 2,
        karten: [
          { text: 'Im Bus dürfen nur die Großen sitzen.', frage: 'gute Regel oder verbessern?' },
          { text: 'Handys bleiben im Unterricht in der Tasche.', frage: 'gute Regel oder verbessern?' },
          { text: 'Wer zu spät kommt, muss die ganze Woche nachsitzen.', frage: 'gute Regel oder verbessern?' },
          { text: 'Beim Fußball in der Pause werden die Teams ausgelost.', frage: 'gute Regel oder verbessern?' },
          { text: 'Die Klassensprecherin bestimmt allein, wohin der Ausflug geht.', frage: 'gute Regel oder verbessern?' },
          { text: 'Wer etwas kaputt macht, hilft beim Reparieren.', frage: 'gute Regel oder verbessern?' },
          { text: 'Im Klassenchat werden keine Fotos ohne Erlaubnis geteilt.', frage: 'gute Regel oder verbessern?' },
          { text: 'Eine eigene Regel:', linien: 2, frage: 'gute Regel oder verbessern?' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe fünf Regeln für ein Zusammenleben, das du dir wünschst – auf der Insel, in der Klasse oder im Jugendhaus. Begründe eine Regel.', stufe: 2,
        zeilenAnfaenge: ['1. …', '2. …', '3. …', '4. …', '5. …', 'Regel … ist mir besonders wichtig, weil …'], zeilen: 7,
        beispiel: '1. Wir hören zu, wenn jemand spricht. 2. Niemand wird ausgelacht. 3. Wir teilen das Material. 4. Wer etwas kaputt macht, hilft beim Reparieren. 5. Regeln ändern wir gemeinsam. Regel 2 ist mir besonders wichtig, weil man sich nur traut, etwas zu sagen, wenn man keine Angst hat.' },
    ],
    check: ['Ich erkläre, warum Gemeinschaften Regeln brauchen.', 'Ich nenne Merkmale einer guten Regel.', 'Ich prüfe Regeln und begründe meine Meinung.'],
  },
  // ================================================================ 2
  {
    thema: 'Gerechtigkeit · gleich oder gerecht?', titel: 'Gleich ist nicht immer gerecht', untertitel: 'Drei Kinder, eine Pizza – wie teilt man gerecht? Du philosophierst über Gerechtigkeit, hörst einen Streit um eine Note und entscheidest in Dilemma-Situationen.',
    ziel: { de: 'Ich unterscheide „gleich“ und „gerecht“ und begründe, was ich gerecht finde.', fr: 'Je distingue « égal » et « juste » et je justifie ce que je trouve juste.' },
    bild: ['nele:froh:rollstuhl', 'finn:verwirrt:stehen'],
    start: {
      was: 'Die Pizza',
      aufgaben: [
        { art: 'mc', auftrag: 'Drei Freunde teilen eine Pizza: Ana hat seit dem Frühstück nichts gegessen, Ben hat gerade zu Mittag gegessen, Chris hat die Pizza bezahlt. Wie teilt man gerecht? Kreuze an, was du denkst. (Es gibt kein Richtig oder Falsch.)', stufe: 1, fragen: [{ f: '', o: ['Alle bekommen gleich viel.', 'Ana bekommt mehr, weil sie Hunger hat.', 'Chris bekommt mehr, weil er bezahlt hat.', 'Sie reden darüber und entscheiden zusammen.'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Was ist gerecht?',
      absaetze: [
        'Fast jeder hat schon einmal gerufen: „Das ist ungerecht!“ Aber was ist eigentlich **gerecht**? Darüber denken Menschen seit Tausenden von Jahren nach. Es gibt verschiedene Antworten.',
        '### Gleich verteilen',
        'Alle bekommen **gleich viel**. Das ist einfach und oft fair, zum Beispiel beim Wählen: Jede Stimme zählt gleich.',
        '### Nach Bedarf verteilen',
        'Wer **mehr braucht**, bekommt mehr. Ein Kind mit Brille bekommt eine Brille – nicht alle Kinder. Eine Schülerin mit Legasthenie bekommt mehr Zeit für einen Test. Das ist nicht „gleich“, aber viele finden es gerecht, weil alle dann **die gleiche Chance** haben.',
        '### Nach Leistung verteilen',
        'Wer **mehr leistet**, bekommt mehr. Wer viel trainiert, spielt im Spiel. Wer mehr arbeitet, verdient mehr.',
        'Oft muss man **abwägen**: Welche Art von Gerechtigkeit passt in dieser Situation? Darum ist es wichtig, darüber zu reden – und zu begründen.',
      ],
      woerter: [['gerecht / ungerecht', 'juste / injuste'], ['die Gerechtigkeit', 'la justice'], ['verteilen', 'distribuer, partager'], ['der Bedarf', 'le besoin'], ['die Leistung', 'la performance, le mérite'], ['die Chance', 'la chance, l’occasion'], ['die Legasthenie', 'la dyslexie'], ['abwägen', 'peser le pour et le contre']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Welche Art von Gerechtigkeit ist das? Kreuze an.', stufe: 2, kopf: ['Situation', 'gleich', 'nach Bedarf', 'nach Leistung'], breiten: [52, 16, 16, 16], zeilen: [['Jede Person hat bei der Wahl eine Stimme.', '[x]', '', ''], ['Ein Schüler im Rollstuhl bekommt einen Platz am Aufzug.', '', '[x]', ''], ['Die Beste im Wettlauf bekommt eine Medaille.', '', '', '[x]'], ['Alle bekommen ein Stück Kuchen gleicher Größe.', '[x]', '', ''], ['Wer krank war, bekommt mehr Zeit für die Hausaufgabe.', '', '[x]', '']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klasse 7P1 · nach der Stunde', titel: 'Mehr Zeit für Nele?',
      situation: 'Nele hat bei Tests mehr Zeit, weil sie Legasthenie hat. Finn findet das ungerecht.',
      bild: ['finn:verwirrt:stehen', 'nele:froh:rollstuhl'], sprecher: { Finn: 'm3', Nele: 'w3', 'Frau Sommer': 'w1' },
      text: [
        ['Finn', 'Frau Sommer, warum darf Nele beim Test zehn Minuten länger schreiben? Das ist unfair!'],
        ['Frau Sommer', 'Gute Frage, Finn. Nele, möchtest du es selbst erklären?'],
        ['Nele', 'Okay. Ich habe Legasthenie. Ich bin nicht dumm, aber Lesen und Schreiben dauern bei mir viel länger. Die Buchstaben tanzen manchmal.'],
        ['Finn', 'Oh. Das wusste ich nicht.'],
        ['Frau Sommer', 'Stell dir einen Wettlauf vor, bei dem einer einen schweren Rucksack tragen muss. Wenn er ein bisschen früher starten darf, ist das dann unfair?'],
        ['Finn', 'Hm, nein. Dann haben beide die gleiche Chance.'],
        ['Nele', 'Genau. Ich bekomme keine leichteren Aufgaben. Nur mehr Zeit.'],
        ['Finn', 'Sorry, Nele. Ich dachte, du hast einfach Glück.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist Legasthenie? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Schwierigkeit beim Lesen und Schreiben, die nichts mit Intelligenz zu tun hat', 'eine Krankheit, die ansteckt'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Nele bekommt leichtere Aufgaben.', false], ['Nele bekommt mehr Zeit.', true], ['Frau Sommer vergleicht das mit einem Wettlauf mit Rucksack.', true], ['Finn bleibt am Ende bei seiner Meinung.', false]] },
        { art: 'fragen', auftrag: 'Erkläre den Vergleich mit dem Rucksack.', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Wer einen Nachteil hat (schwerer Rucksack / Legasthenie), bekommt einen Ausgleich (früher starten / mehr Zeit). So haben alle die gleiche Chance.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wann ist es gerecht, jemanden anders zu behandeln? Findet Beispiele.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Es ist gerecht, wenn …', 'Es wäre ungerecht, wenn …', 'Es kommt darauf an, ob …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Drei Arten zu verteilen', punkte: ['**gleich**: alle gleich viel', '**nach Bedarf**: wer mehr braucht, bekommt mehr', '**nach Leistung**: wer mehr leistet, bekommt mehr'] },
         { titel: 'Chancengleichheit', punkte: ['Ein **Ausgleich** für einen Nachteil ist kein Vorteil.', 'Ziel: **gleiche Chancen** für alle', 'Gerecht sein heißt: **abwägen** und **begründen**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Gerechtigkeits-Karten: Zieht eine Karte. Ist das gerecht? Begründet mit „gleich“, „nach Bedarf“ oder „nach Leistung“.', stufe: 2, neueSeite: true, titel: 'Ist das gerecht?', icon: 'scale', farbe: DILEMMA, spalten: 2, typ: 'dilemma',
        karten: [
          { text: 'Beim Klassenausflug zahlen alle 20 Euro. Eine Familie kann sich das nicht leisten. Die Klasse sammelt Geld für die Schülerin.', frage: 'Gerecht?' },
          { text: 'Im Fußballverein spielen immer nur die Besten. Die anderen sitzen auf der Bank.', frage: 'Gerecht?' },
          { text: 'Die jüngste Schwester muss nie abwaschen.', frage: 'Gerecht?' },
          { text: 'Ein Schüler, der viel gelernt hat, und eine Schülerin, die abgeschrieben hat, bekommen dieselbe Note.', frage: 'Gerecht?' },
          { text: 'In der Kantine bekommen die Großen größere Portionen als die Kleinen.', frage: 'Gerecht?' },
          { text: 'Wer im Rollstuhl sitzt, darf den Aufzug benutzen, die anderen nicht.', frage: 'Gerecht?' },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 2, aussagen: ['Alle sollten in der Schule genau gleich behandelt werden.', 'Wer mehr arbeitet, soll mehr verdienen – egal, wie viel die anderen haben.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreibe eine Situation, in der du etwas ungerecht fandest (oder erfinde eine). Was wäre gerecht gewesen? Warum?', stufe: 2,
        anfaenge: ['Einmal …', 'Ich fand das ungerecht, weil …', 'Gerecht wäre gewesen, …', 'Denn …'], zeilen: 7,
        beispiel: 'Einmal durfte in der Pause immer dieselbe Gruppe den Basketballplatz benutzen. Ich fand das ungerecht, weil die anderen nie spielen konnten. Gerecht wäre gewesen, wenn sich die Gruppen jeden Tag abwechseln. Denn alle haben das gleiche Recht auf den Platz.' },
    ],
    check: ['Ich unterscheide gleich, nach Bedarf und nach Leistung.', 'Ich erkläre, was Chancengleichheit bedeutet.', 'Ich begründe, was ich gerecht finde.'],
  },
  // ================================================================ 3
  {
    thema: 'Menschenrechte · Würde', titel: 'Rechte für alle Menschen', untertitel: 'Würde, Freiheit, Bildung: Du lernst die Allgemeine Erklärung der Menschenrechte kennen, hörst einen Radiobeitrag und ordnest die Rechte nach Wichtigkeit.',
    ziel: { de: 'Ich nenne wichtige Menschenrechte und erkläre, warum sie für alle gelten.', fr: 'Je cite des droits humains importants et j’explique pourquoi ils valent pour tous.' },
    bild: ['amira:froh:stehen', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Was braucht jeder Mensch?',
      aufgaben: [
        { art: 'fragen', auftrag: 'Was braucht jeder Mensch, um gut leben zu können? Schreibe fünf Dinge auf.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Essen, Wasser, ein Zuhause, Sicherheit, Bildung, Freunde, Freiheit, Gesundheit …' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Alle Menschen sind frei und gleich',
      absaetze: [
        'Nach dem Zweiten Weltkrieg wollten viele Länder verhindern, dass Menschen jemals wieder so schrecklich behandelt werden. Am **10. Dezember 1948** beschlossen die **Vereinten Nationen** die **Allgemeine Erklärung der Menschenrechte**. Der 10. Dezember ist heute der **Tag der Menschenrechte**.',
        '### Was steht darin?',
        'Der erste Artikel lautet: „**Alle Menschen sind frei und gleich an Würde und Rechten geboren.**“ Die Erklärung hat 30 Artikel. Darin stehen zum Beispiel: das Recht auf **Leben** und **Sicherheit**, das Verbot von **Sklaverei** und **Folter**, die **Gleichheit vor dem Gesetz**, das Recht auf **Bildung**, die **Meinungsfreiheit** und die **Religionsfreiheit**.',
        '### Würde',
        'Ein wichtiges Wort ist **Würde**. Es bedeutet: Jeder Mensch ist wertvoll – egal, woher er kommt, wie er aussieht, welche Religion er hat, ob er arm oder reich ist. Würde muss man sich nicht verdienen. Man hat sie, weil man ein Mensch ist.',
        '### Und heute?',
        'Leider werden Menschenrechte in vielen Ländern verletzt. Organisationen und Gerichte setzen sich dafür ein, dass sie eingehalten werden. Auch im Alltag kann jeder etwas tun: niemanden ausgrenzen, andere Meinungen respektieren, für Schwächere eintreten.',
      ],
      woerter: [['die Menschenrechte', 'les droits humains'], ['die Würde', 'la dignité'], ['die Vereinten Nationen', 'les Nations unies'], ['die Erklärung', 'la déclaration'], ['die Sklaverei', 'l’esclavage'], ['die Folter', 'la torture'], ['die Meinungsfreiheit', 'la liberté d’expression'], ['verletzen', 'violer, enfreindre']],
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze.', stufe: 1, saetze: ['Die Erklärung der Menschenrechte wurde am 10. Dezember [1948] beschlossen.', 'Sie hat [30] Artikel.', '„Alle Menschen sind frei und gleich an [Würde] und Rechten geboren.“', 'Würde muss man sich nicht [verdienen].'] },
      ],
    },
    hoeren: {
      was: 'Ein Radiobeitrag', wo: 'Jugendradio · 10. Dezember', titel: 'Mein wichtigstes Recht',
      situation: 'Zum Tag der Menschenrechte fragt eine Reporterin Jugendliche nach ihrem wichtigsten Recht.',
      bild: ['amira:froh:handy', 'noah:froh:stehen'], sprecher: { Reporterin: 'w1', Amira: 'w2', Noah: 'm3', Chloé: 'w3' },
      text: [
        ['Reporterin', 'Heute ist Tag der Menschenrechte. Welches Recht ist dir am wichtigsten?'],
        ['Amira', 'Für mich die Religionsfreiheit. Ich darf glauben, was ich will – oder auch an nichts glauben. Und niemand darf mich deswegen schlecht behandeln.'],
        ['Noah', 'Ich finde das Recht auf Bildung am wichtigsten. Mein Brieffreund in einem anderen Land musste mit zwölf Jahren arbeiten statt zur Schule gehen. Das ist so unfair.'],
        ['Chloé', 'Bei mir ist es die Meinungsfreiheit. Ich darf sagen, was ich denke – auch über die Regierung.'],
        ['Reporterin', 'Darf man dann alles sagen?'],
        ['Chloé', 'Nein. Meinungsfreiheit heißt nicht, dass man andere beleidigen oder bedrohen darf. Die Würde der anderen gilt auch.'],
        ['Reporterin', 'Ein guter Gedanke zum Schluss. Danke euch!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet Religionsfreiheit? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Jeder darf glauben, was er will, oder an nichts glauben.', 'Alle müssen dieselbe Religion haben.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welches Recht ist wem am wichtigsten – und warum?', stufe: 1, kopf: ['Wer?', 'Recht', 'Warum?'], breiten: [18, 32, 50], zeilen: [['Amira', '[Religionsfreiheit]', '[Sie darf glauben, was sie will; niemand darf sie deshalb schlecht behandeln.]'], ['Noah', '[Recht auf Bildung]', '[Sein Brieffreund musste mit zwölf arbeiten statt zur Schule zu gehen.]'], ['Chloé', '[Meinungsfreiheit]', '[Sie darf sagen, was sie denkt, auch über die Regierung.]']] },
        { art: 'fragen', auftrag: 'Wo hat die Meinungsfreiheit eine Grenze?', stufe: 2, fragen: [{ f: '', l: 'Man darf andere nicht beleidigen oder bedrohen; die Würde der anderen gilt auch.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wo werden Menschenrechte auch bei uns im Alltag wichtig? Findet Beispiele aus Schule und Internet.', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Beleidigungen im Chat', 'jemand wird ausgeschlossen', 'Fotos ohne Erlaubnis'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Menschenrechte', punkte: ['**10. Dezember 1948**: Allgemeine Erklärung', '**30 Artikel**', 'gelten für **alle Menschen**', 'Grundlage: die **Würde**'] },
         { titel: 'Beispiele', punkte: ['Recht auf **Leben** und Sicherheit', 'Verbot von **Sklaverei** und **Folter**', '**Gleichheit** vor dem Gesetz', '**Bildung**, **Meinungs-** und **Religionsfreiheit**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Rechte-Karten: Schneidet die neun Karten aus. Legt sie zu zweit als Raute: oben das wichtigste Recht, dann zwei, dann drei, dann zwei, unten eins. Begründet eure Reihenfolge.', stufe: 2, neueSeite: true, titel: 'Menschenrecht', icon: 'scale', farbe: RECHT, spalten: 3,
        karten: [
          { text: '**Leben und Sicherheit**' }, { text: '**Bildung**' }, { text: '**Meinungsfreiheit**' },
          { text: '**Religionsfreiheit**' }, { text: '**Gleichheit vor dem Gesetz**' }, { text: '**keine Sklaverei**' },
          { text: '**keine Folter**' }, { text: '**Privatsphäre**' }, { text: '**Gesundheit**' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Welches Menschenrecht ist dir am wichtigsten? Schreibe einen kurzen Radiobeitrag wie im Hörtext.', stufe: 2,
        anfaenge: ['Mir ist das Recht auf … am wichtigsten.', 'Das bedeutet …', 'Es ist wichtig, weil …', 'Im Alltag …'], zeilen: 7,
        beispiel: 'Mir ist das Recht auf Gleichheit vor dem Gesetz am wichtigsten. Das bedeutet, dass für alle Menschen dieselben Regeln gelten, egal ob reich oder arm. Es ist wichtig, weil sonst die Mächtigen machen könnten, was sie wollen. Im Alltag heißt das für mich: Ich behandle alle fair, auch wenn ich jemanden nicht mag.' },
    ],
    check: ['Ich nenne wichtige Menschenrechte.', 'Ich erkläre, was Würde bedeutet.', 'Ich nenne Grenzen der Meinungsfreiheit.'],
  },
  // ================================================================ 4
  {
    thema: 'Feste und Traditionen in Luxemburg', titel: 'Ein Jahr voller Feste', untertitel: 'Liichtmëssdag, Buergbrennen, Éimaischen, Nationalfeiertag, Schueberfouer, Kleeschen: Du reist durch das luxemburgische Festjahr, hörst eine Erinnerung und gestaltest einen Festkalender.',
    ziel: { de: 'Ich beschreibe Feste und Traditionen in Luxemburg und erkläre, warum Traditionen Menschen verbinden.', fr: 'Je décris des fêtes et des traditions au Luxembourg et j’explique pourquoi les traditions relient les gens.' },
    bild: ['oma:froh:stehen', 'tom:froh:stehen'],
    start: {
      was: 'Lieblingsfest',
      aufgaben: [
        { art: 'fragen', auftrag: 'Welches Fest im Jahr magst du am liebsten? Warum? (Du kannst auch ein Fest erfinden.)', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuelle Antworten.' }] },
      ],
    },
    lesen: {
      was: 'Ein Festkalender', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Das luxemburgische Festjahr',
      absaetze: [
        '**Liichtmëssdag (2. Februar):** Am Abend ziehen Kinder mit Laternen von Haus zu Haus, singen ein Lied und bekommen Süßigkeiten.',
        '**Buergbrennen (Ende Februar oder März):** Am ersten Sonntag der Fastenzeit werden in vielen Dörfern große Feuer aus Holz und Stroh angezündet – die „Buerg“. Damit verabschiedet man symbolisch den Winter.',
        '**Éimaischen (Ostermontag):** In der Altstadt von Luxemburg und in Nospelt gibt es einen Markt mit kleinen Vogelpfeifen aus Ton, den **Péckvillercher**.',
        '**Nationalfeiertag (23. Juni):** Luxemburg feiert den Geburtstag des Großherzogs. Am Abend vorher gibt es einen Fackelzug und ein großes Feuerwerk in der Hauptstadt.',
        '**Schueberfouer (Ende August bis Anfang September):** Eines der größten Volksfeste der Region, mit Karussells und Ständen. Es gibt sie schon seit **1340**.',
        '**Kleeschen (6. Dezember):** Der Nikolaus bringt den Kindern Geschenke – begleitet vom finster aussehenden **Housécker**.',
      ],
      woerter: [['das Fest', 'la fête'], ['die Tradition', 'la tradition'], ['die Laterne', 'la lanterne'], ['die Fastenzeit', 'le carême'], ['das Feuerwerk', 'le feu d’artifice'], ['der Fackelzug', 'la retraite aux flambeaux'], ['das Volksfest', 'la fête foraine'], ['der Nikolaus', 'saint Nicolas']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Fest? Verbinde.', stufe: 1, links: ['Kinder ziehen mit Laternen von Haus zu Haus.', 'Große Feuer verabschieden den Winter.', 'Man kauft Vogelpfeifen aus Ton.', 'Feuerwerk zum Geburtstag des Großherzogs', 'Karussells seit 1340', 'Geschenke vom Nikolaus'], rechts: ['Liichtmëssdag', 'Buergbrennen', 'Éimaischen', 'Nationalfeiertag', 'Schueberfouer', 'Kleeschen'] },
      ],
    },
    hoeren: {
      was: 'Eine Erinnerung', wo: 'Erzählcafé im Jugendhaus', titel: 'Als ich klein war',
      situation: 'Beim Erzählcafé erzählt eine ältere Frau Tom, wie sie früher Feste gefeiert hat.',
      bild: ['oma:froh:sitzen', 'tom:froh:stehen'], sprecher: { 'Frau Schmit': 'w1', Tom: 'm3' },
      text: [
        ['Tom', 'Frau Schmit, welches Fest mochten Sie als Kind am liebsten?'],
        ['Frau Schmit', 'Den Liichtmëssdag! Wir haben unsere Laternen selbst gebastelt, aus einer Rübe mit einer Kerze drin. Und dann sind wir durchs ganze Dorf gelaufen.'],
        ['Tom', 'Aus einer Rübe? Heute kauft man die Laternen im Laden.'],
        ['Frau Schmit', 'Ja, und statt Schokolade gab es damals oft Äpfel oder Nüsse. Wir haben uns trotzdem riesig gefreut.'],
        ['Tom', 'Und die Schueberfouer?'],
        ['Frau Schmit', 'Da sind wir einmal im Jahr mit dem Zug in die Stadt gefahren. Das war ein großes Abenteuer. Ich habe mir immer gebrannte Mandeln gewünscht.'],
        ['Tom', 'Was ist heute anders?'],
        ['Frau Schmit', 'Vieles ist größer und bunter. Aber das Schönste ist gleich geblieben: dass man zusammenkommt. Darum gibt es Feste.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Erzählcafé? Rate!', stufe: 1, fragen: [{ f: '', o: ['ein Treffen, bei dem Menschen von früher erzählen', 'ein Café, in dem man nur Kaffee trinkt'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Früher und heute.', stufe: 1, kopf: ['', 'früher', 'heute'], breiten: [24, 38, 38], zeilen: [['Laterne', '[selbst gebastelt aus einer Rübe mit Kerze]', '[im Laden gekauft]'], ['Belohnung', '[Äpfel oder Nüsse]', '[Schokolade, Süßigkeiten]'], ['Schueberfouer', '[einmal im Jahr mit dem Zug, großes Abenteuer]', '[größer und bunter]']] },
        { art: 'fragen', auftrag: 'Was ist laut Frau Schmit das Schönste an Festen?', stufe: 1, fragen: [{ f: '', l: 'dass man zusammenkommt' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Traditionen kennt ihr aus anderen Ländern oder Regionen? Erzählt (freiwillig).', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Bei … feiert man …', 'Typisch ist …', 'Mir gefällt daran …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Festjahr in Luxemburg', punkte: ['**2. Februar**: Liichtmëssdag', '**Fastenzeit**: Buergbrennen', '**Ostermontag**: Éimaischen', '**23. Juni**: Nationalfeiertag', '**Ende August**: Schueberfouer', '**6. Dezember**: Kleeschen'] },
         { titel: 'Warum Traditionen?', punkte: ['Sie **verbinden** Menschen.', 'Sie geben dem Jahr einen **Rhythmus**.', 'Sie erinnern an **Geschichte**.', 'Sie **verändern** sich mit der Zeit.'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Fest-Karten: Schneidet die Karten aus und legt sie in die richtige Reihenfolge im Jahr. Auf die leeren Karten schreibt ihr Feste, die ihr selbst feiert oder kennt.', stufe: 2, neueSeite: true, titel: 'Fest', icon: 'confetti', farbe: FEST, spalten: 3,
        karten: [
          { text: '**Liichtmëssdag**', frage: 'Laternen, Lieder, Süßigkeiten' }, { text: '**Buergbrennen**', frage: 'Feuer gegen den Winter' }, { text: '**Éimaischen**', frage: 'Péckvillercher aus Ton' },
          { text: '**Nationalfeiertag**', frage: 'Fackelzug und Feuerwerk' }, { text: '**Schueberfouer**', frage: 'Karussells seit 1340' }, { text: '**Kleeschen**', frage: 'Nikolaus und Housécker' },
          { text: ' ', linien: 2, frage: 'mein Fest' }, { text: ' ', linien: 2, frage: 'mein Fest' }, { text: ' ', linien: 2, frage: 'mein Fest' },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 2, aussagen: ['Alte Traditionen sollte man genauso feiern wie früher.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erfinde ein neues Fest für deine Schule. Wann ist es? Was macht man? Was ist der Sinn?', stufe: 2,
        anfaenge: ['Unser Fest heißt …', 'Es findet am … statt.', 'Man …', 'Der Sinn des Festes ist …'], zeilen: 7,
        beispiel: 'Unser Fest heißt „Tag der Sprachen“. Es findet am letzten Freitag im September statt. Jede Klasse kocht etwas aus einem anderen Land und lernt ein Begrüßungslied in einer neuen Sprache. Der Sinn des Festes ist, dass wir die vielen Sprachen an unserer Schule feiern und uns besser kennenlernen.' },
    ],
    check: ['Ich nenne Feste und Traditionen in Luxemburg.', 'Ich ordne sie im Jahr ein.', 'Ich erkläre, warum Traditionen wichtig sind.'],
  },
  // ================================================================ 5
  {
    thema: 'Feste in Religionen und Kulturen', titel: 'Feste der Welt', untertitel: 'Weihnachten, Zuckerfest, Chanukka, Diwali, Frühlingsfest: Du lernst Feste aus verschiedenen Religionen und Kulturen kennen, hörst drei Jugendliche und spielst ein Fest-Memory.',
    ziel: { de: 'Ich beschreibe Feste verschiedener Religionen und Kulturen und begegne ihnen mit Respekt.', fr: 'Je décris des fêtes de différentes religions et cultures et je les respecte.' },
    bild: ['yusuf:froh:stehen', 'mia:froh:stehen'],
    start: {
      was: 'Was weißt du schon?',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Zu welcher Religion gehört das Fest? Verbinde.', stufe: 1, links: ['Ostern', 'Zuckerfest', 'Pessach'], rechts: ['Christentum', 'Islam', 'Judentum'] },
      ],
    },
    lesen: {
      was: 'Kurze Sachtexte', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtexte (vereinfacht)', titel: 'Fünf Feste',
      absaetze: [
        '**Weihnachten (Christentum):** Christinnen und Christen feiern am 25. Dezember die Geburt von **Jesus**. Viele schmücken einen Baum, gehen in die Kirche und schenken sich etwas.',
        '**Zuckerfest (Islam):** Im Monat **Ramadan** fasten viele Musliminnen und Muslime: Von Sonnenaufgang bis Sonnenuntergang essen und trinken sie nichts. Am Ende feiern sie das **Fest des Fastenbrechens** mit Familie, Freunden und Süßigkeiten.',
        '**Chanukka (Judentum):** Das Lichterfest dauert acht Tage. An einem besonderen Leuchter, der **Chanukkia**, wird jeden Abend ein Licht mehr angezündet. Es erinnert an ein Wunder im Tempel in Jerusalem.',
        '**Diwali (Hinduismus):** Beim Lichterfest werden Häuser mit Öllampen und Lichterketten geschmückt. Es feiert den Sieg des Lichts über die Dunkelheit und des Guten über das Böse.',
        '**Frühlingsfest (China):** Das chinesische Neujahr wird nach dem Mondkalender gefeiert, zwischen Ende Januar und Februar. Es gibt Feuerwerk, rote Dekoration und Drachentänze. Rot soll Glück bringen.',
        'Viele Feste haben etwas **gemeinsam**: Licht, gutes Essen, Familie und Freunde, Dankbarkeit – und die Hoffnung auf etwas Gutes.',
      ],
      woerter: [['die Religion', 'la religion'], ['das Christentum', 'le christianisme'], ['der Islam', 'l’islam'], ['das Judentum', 'le judaïsme'], ['der Hinduismus', 'l’hindouisme'], ['fasten', 'jeûner'], ['das Lichterfest', 'la fête des lumières'], ['der Mondkalender', 'le calendrier lunaire']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ergänze die Tabelle.', stufe: 1, kopf: ['Fest', 'Religion / Kultur', 'Typisch'], breiten: [24, 30, 46], zeilen: [['Weihnachten', '[Christentum]', '[Geburt von Jesus, Baum, Kirche, Geschenke]'], ['Zuckerfest', '[Islam]', '[Ende des Ramadan, Familie, Süßigkeiten]'], ['Chanukka', '[Judentum]', '[acht Tage, jeden Abend ein Licht mehr]'], ['Diwali', '[Hinduismus]', '[Öllampen, Licht siegt über Dunkelheit]'], ['Frühlingsfest', '[China]', '[Feuerwerk, Rot, Drachentanz]']] },
        { art: 'fragen', auftrag: 'Was haben viele Feste gemeinsam?', stufe: 2, fragen: [{ f: '', l: 'Licht, gutes Essen, Familie und Freunde, Dankbarkeit, Hoffnung' }] },
      ],
    },
    hoeren: {
      was: 'Drei Sprachnachrichten', wo: 'Projekt „Feste in unserer Klasse“', titel: 'So feiern wir',
      situation: 'Für ein Klassenprojekt erzählen drei Jugendliche in Sprachnachrichten von einem Fest, das sie feiern.',
      bild: ['yusuf:froh:handy', 'mia:froh:handy'], sprecher: { Yusuf: 'm3', Lea: 'w3', Mia: 'w2' },
      text: [
        ['Yusuf', 'Hallo! Ich erzähle vom Zuckerfest. Im Ramadan faste ich schon ein paar Tage mit – die ganzen dreißig Tage muss ich noch nicht. Am Fest ziehen wir neue Kleider an, besuchen Verwandte, und die Kinder bekommen kleine Geschenke. Und es gibt Baklava. Mein Lieblingsteil!'],
        ['Lea', 'Hi, ich bin Lea. Bei uns ist Weihnachten das größte Fest. Wir sind nicht so religiös, aber wir gehen am Heiligabend trotzdem in die Kirche, weil meine Oma das schön findet. Danach essen wir zusammen und packen Geschenke aus.'],
        ['Mia', 'Hallo! Meine Freundin hat mich zu Diwali eingeladen. Das war so schön: überall kleine Lichter, bunte Muster aus Farbpulver vor der Tür und ganz viele Süßigkeiten. Ich durfte mithelfen, die Lichter anzuzünden.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist Baklava? Rate!', stufe: 1, fragen: [{ f: '', o: ['ein süßes Gebäck mit Nüssen und Honig', 'eine Suppe'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wer erzählt von welchem Fest? Was ist typisch?', stufe: 1, kopf: ['Wer?', 'Fest', 'Typisch'], breiten: [16, 24, 60], zeilen: [['Yusuf', '[Zuckerfest]', '[neue Kleider, Verwandte besuchen, kleine Geschenke, Baklava]'], ['Lea', '[Weihnachten]', '[Kirche am Heiligabend, zusammen essen, Geschenke]'], ['Mia', '[Diwali]', '[Lichter, Muster aus Farbpulver, Süßigkeiten]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Fragen würdet ihr Yusuf, Lea oder Mia gern stellen? Achtet darauf, respektvoll zu fragen.', stufe: 2, karten: [
        { titel: 'Respektvoll fragen', text: ['Darf ich fragen, …?', 'Was bedeutet … für dich?', 'Wie fühlt sich … an?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Feste der Religionen', punkte: ['**Christentum**: Weihnachten, Ostern', '**Islam**: Zuckerfest, Opferfest', '**Judentum**: Pessach, Chanukka', '**Hinduismus**: Diwali'] },
         { titel: 'Respekt', punkte: ['**neugierig** und **freundlich** fragen', 'nicht **auslachen** oder **bewerten**', 'Niemand muss von sich erzählen.', 'Viele Feste teilen **Licht, Essen, Gemeinschaft**.'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Fest-Memory: Schneidet alle Karten aus und legt sie verdeckt hin. Deckt zwei Karten auf: Passen Fest und Beschreibung zusammen, dürft ihr sie behalten.', stufe: 1, neueSeite: true, titel: 'Memory', icon: 'confetti', farbe: FEST, spalten: 4,
        karten: [
          { text: '**Weihnachten**' }, { text: 'Geburt von Jesus, Christbaum' }, { text: '**Zuckerfest**' }, { text: 'Ende des Fastenmonats Ramadan' },
          { text: '**Chanukka**' }, { text: 'acht Tage, jeden Abend ein Licht mehr' }, { text: '**Diwali**' }, { text: 'Öllampen: Licht siegt über Dunkelheit' },
          { text: '**Frühlingsfest**' }, { text: 'chinesisches Neujahr, Rot bringt Glück' }, { text: '**Ostern**' }, { text: 'Auferstehung von Jesus, Frühling' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Text für das Klassenprojekt: Stell ein Fest vor, das du feierst, kennst oder gern einmal erleben möchtest.', stufe: 2,
        anfaenge: ['Ich stelle … vor.', 'Man feiert es …', 'Typisch ist …', 'Mir gefällt daran …'], zeilen: 7,
        beispiel: 'Ich stelle das chinesische Frühlingsfest vor. Man feiert es zwischen Ende Januar und Februar, je nach Mondkalender. Typisch sind Feuerwerk, rote Lampions und Drachentänze auf der Straße. Mir gefällt daran, dass die ganze Familie zusammenkommt und dass man sich für das neue Jahr Glück wünscht.' },
    ],
    check: ['Ich nenne Feste verschiedener Religionen und Kulturen.', 'Ich erkenne Gemeinsamkeiten zwischen Festen.', 'Ich frage respektvoll nach.'],
  },
  // ================================================================ 6
  {
    thema: 'Religionen kennenlernen · Judentum', titel: 'Das Judentum', untertitel: 'Tora, Synagoge, Schabbat: Du lernst Grundbegriffe des Judentums kennen, besuchst eine Synagoge und entdeckt jüdisches Leben in Luxemburg.',
    ziel: { de: 'Ich beschreibe wichtige Merkmale des Judentums und begegne der Religion mit Respekt.', fr: 'Je décris des caractéristiques importantes du judaïsme et je respecte cette religion.' },
    bild: ['noah:froh:stehen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Was weißt du schon?',
      aufgaben: [
        { art: 'fragen', auftrag: 'Was weißt du schon über das Judentum? Schreibe auf, was dir einfällt – auch Fragen.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Synagoge, Tora, Davidstern, Schabbat, Israel, Chanukka …' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Eine alte Religion',
      absaetze: [
        'Das **Judentum** ist eine sehr alte Religion. Jüdinnen und Juden glauben an **einen Gott**. Auch das Christentum und der Islam haben ihre Wurzeln im Judentum. Alle drei berufen sich auf **Abraham** und heißen darum **abrahamitische Religionen**.',
        '### Die Tora und die Synagoge',
        'Die wichtigste Schrift ist die **Tora**, die fünf Bücher Mose. Sie ist auf eine lange Schriftrolle geschrieben, in hebräischer Sprache. Im Gottesdienst wird aus ihr vorgelesen. Das Haus, in dem sich die Gemeinde zum Beten und Lernen trifft, heißt **Synagoge**. Die Gemeinde wird oft von einem **Rabbiner** oder einer Rabbinerin geleitet.',
        '### Schabbat',
        'Der **Schabbat** ist der Ruhetag. Er beginnt am **Freitagabend** und endet am **Samstagabend**. Viele Familien zünden Kerzen an, essen zusammen und ruhen sich aus. Mit 13 Jahren feiern Jungen ihre **Bar Mizwa**, Mädchen mit 12 ihre **Bat Mizwa**: Ab dann gelten sie in der Religion als erwachsen.',
        '### Jüdisches Leben in Luxemburg',
        'In Luxemburg leben jüdische Familien seit Jahrhunderten. Es gibt Synagogen zum Beispiel in **Luxemburg-Stadt** und in **Esch-sur-Alzette**. Im Zweiten Weltkrieg wurden viele luxemburgische Jüdinnen und Juden verfolgt und ermordet. Daran erinnern heute Gedenkorte.',
      ],
      woerter: [['der Glaube', 'la foi'], ['die Tora', 'la Torah'], ['die Schriftrolle', 'le rouleau'], ['die Synagoge', 'la synagogue'], ['der Rabbiner', 'le rabbin'], ['der Schabbat', 'le shabbat'], ['die Gemeinde', 'la communauté'], ['der Gedenkort', 'le lieu de mémoire']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet der Begriff? Verbinde.', stufe: 1, links: ['Tora', 'Synagoge', 'Schabbat', 'Bar / Bat Mizwa', 'Rabbiner'], rechts: ['die fünf Bücher Mose auf einer Schriftrolle', 'Haus zum Beten und Lernen', 'Ruhetag von Freitagabend bis Samstagabend', 'Fest: Man gilt in der Religion als erwachsen.', 'leitet die Gemeinde'] },
      ],
    },
    hoeren: {
      was: 'Eine Führung', wo: 'Synagoge · Besuch der Klasse', titel: 'Zu Besuch in der Synagoge',
      situation: 'Die Klasse besucht eine Synagoge. Eine Frau aus der Gemeinde führt sie durch den Raum.',
      bild: ['lehrerin:froh:zeigen', 'noah:ueberrascht:stehen'], sprecher: { 'Frau Weil': 'w1', Noah: 'm3', Jana: 'w3' },
      text: [
        ['Frau Weil', 'Willkommen! Die Jungen und Männer, die möchten, können eine Kippa aufsetzen, eine kleine Mütze. Sie zeigt Respekt vor Gott.'],
        ['Noah', 'Was ist in dem Schrank dort vorne?'],
        ['Frau Weil', 'Das ist der Toraschrein. Darin stehen die Torarollen. Jede ist von Hand geschrieben, auf Pergament. Eine Rolle zu schreiben dauert über ein Jahr.'],
        ['Jana', 'Über ein Jahr? Und wenn ein Fehler passiert?'],
        ['Frau Weil', 'Dann muss der Schreiber das Stück sehr sorgfältig verbessern. Die Tora wird mit großem Respekt behandelt. Man berührt die Schrift nicht mit dem Finger, sondern zeigt mit einem silbernen Zeiger.'],
        ['Noah', 'Und das Licht über dem Schrein brennt immer?'],
        ['Frau Weil', 'Ja, das ewige Licht. Es erinnert daran, dass Gott immer da ist. Habt ihr noch Fragen? Fragen sind hier immer willkommen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie verhält man sich beim Besuch eines Gotteshauses? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['leise sprechen', 'Regeln des Hauses beachten', 'fragen, wenn man etwas nicht weiß', 'laut Musik hören'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was ist eine Kippa?', l: 'eine kleine Mütze, die Respekt vor Gott zeigt' }, { f: 'Wie lange dauert es, eine Torarolle zu schreiben?', l: 'über ein Jahr' }, { f: 'Womit zeigt man beim Lesen auf die Schrift?', l: 'mit einem silbernen Zeiger' }, { f: 'Woran erinnert das ewige Licht?', l: 'dass Gott immer da ist' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche anderen Gotteshäuser kennt ihr (Kirche, Moschee, Tempel …)? Was ist ähnlich, was anders?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['In einer … gibt es …', 'Ähnlich ist …', 'Anders ist …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Judentum', punkte: ['Glaube an **einen Gott**', 'heilige Schrift: **Tora**', 'Gotteshaus: **Synagoge**', 'Ruhetag: **Schabbat** (Freitag- bis Samstagabend)'] },
         { titel: 'Feste und Rituale', punkte: ['**Pessach**: Auszug aus Ägypten', '**Jom Kippur**: Versöhnungstag', '**Chanukka**: Lichterfest', '**Bar / Bat Mizwa**: religiös erwachsen'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Begriffs-Karten: Schneidet die Karten aus. Eine Person zieht eine Karte und erklärt den Begriff, ohne ihn zu sagen. Die anderen raten.', stufe: 2, neueSeite: true, titel: 'Erklär mal!', icon: 'message-circle', farbe: FRAGE, spalten: 3,
        karten: [
          { text: '**Tora**' }, { text: '**Synagoge**' }, { text: '**Schabbat**' },
          { text: '**Kippa**' }, { text: '**Rabbiner**' }, { text: '**Chanukka**' },
          { text: '**Bar Mizwa**' }, { text: '**ewiges Licht**' }, { text: '**Abraham**' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Bericht über den Besuch in der Synagoge für die Schulwebsite.', stufe: 2,
        anfaenge: ['Am … hat unsere Klasse …', 'Wir haben gelernt, dass …', 'Besonders spannend war …', 'Ich habe noch eine Frage: …'], zeilen: 7,
        beispiel: 'Am Dienstag hat unsere Klasse eine Synagoge besucht. Wir haben gelernt, dass die Torarollen von Hand geschrieben werden und dass das über ein Jahr dauert. Besonders spannend war der silberne Zeiger, mit dem man beim Lesen zeigt. Ich habe noch eine Frage: Wie lernt man, Hebräisch zu lesen?' },
    ],
    check: ['Ich erkläre wichtige Begriffe des Judentums.', 'Ich beschreibe, was es in einer Synagoge gibt.', 'Ich verhalte mich respektvoll in einem Gotteshaus.'],
  },
  // ================================================================ 7
  {
    thema: 'Vertrautes und Fremdes · neu sein', titel: 'Neu hier', untertitel: 'Neue Schule, neues Land, neue Sprache: Du liest das Tagebuch eines neuen Mitschülers, hörst, wie die Klasse ihn willkommen heißt, und sammelst Willkommens-Ideen.',
    ziel: { de: 'Ich versetze mich in eine neue Person hinein und weiß, wie man jemanden willkommen heißt.', fr: 'Je me mets à la place d’une personne nouvelle et je sais comment l’accueillir.' },
    bild: ['lio:froh:stehen', 'amira:froh:stehen'],
    start: {
      was: 'Neu sein',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie fühlt man sich am ersten Tag an einem neuen Ort? Kreuze an (mehrere möglich). Du musst nicht von dir erzählen.', stufe: 1, fragen: [{ f: '', o: ['aufgeregt', 'unsicher', 'neugierig', 'allein', 'froh'], r: [0, 1, 2, 3, 4] }] },
      ],
    },
    lesen: {
      was: 'Ein Tagebuch', art: 'dokumente', stimme: 'm3',
      quelle: 'Tagebuch (ausgedacht)', titel: 'Tomás’ erste Wochen',
      dokumente: [
        { stil: 'notiz', stimme: 'm3', kopf: '**Montag, 1. Woche**', text: ['Heute war mein erster Schultag in Luxemburg. Ich verstehe fast nichts. Die anderen sprechen Luxemburgisch, die Lehrerin Deutsch, und im Französischunterricht verstehe ich ein bisschen. Ich habe in der Pause allein auf der Bank gesessen. Ich vermisse meine Freunde in Porto.'] },
        { stil: 'notiz', stimme: 'm3', kopf: '**Donnerstag, 2. Woche**', text: ['Heute hat mich ein Junge namens Lio gefragt, ob ich Fußball spielen will. Ich habe Ja gesagt – Fußball versteht jeder! Ich habe zwei Tore geschossen. Danach haben mich alle mit „Ronaldo“ angesprochen. Das war lustig, aber ich heiße Tomás.'] },
        { stil: 'notiz', stimme: 'm3', kopf: '**Freitag, 4. Woche**', text: ['Amira hat mir ein Heft mit wichtigen Wörtern auf Deutsch und Portugiesisch gemacht. Und ich habe der Klasse ein paar Wörter auf Portugiesisch beigebracht. Heute habe ich zum ersten Mal einen Witz auf Luxemburgisch verstanden. Ich glaube, das wird gut hier.'] },
      ],
      woerter: [['neu', 'nouveau'], ['vermissen', 'manquer (qqn manque à qqn)'], ['allein', 'seul'], ['ansprechen', 'aborder, appeler'], ['beibringen', 'apprendre (à qqn)'], ['der Witz', 'la blague'], ['fremd', 'étranger, inconnu'], ['willkommen heißen', 'accueillir']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wie verändert sich Tomás’ Gefühl? Ergänze.', stufe: 1, kopf: ['Wann?', 'Was passiert?', 'Wie fühlt er sich?'], breiten: [20, 50, 30], zeilen: [['1. Woche', '[versteht fast nichts, sitzt allein in der Pause]', '[allein, vermisst seine Freunde]'], ['2. Woche', '[Lio lädt ihn zum Fußball ein, er schießt zwei Tore]', '[froh, aber „Ronaldo“ stört ein bisschen]'], ['4. Woche', '[Amira macht ein Wörterheft, er versteht einen Witz]', '[zuversichtlich: „das wird gut hier“]']] },
        { art: 'fragen', auftrag: 'Warum stört es Tomás ein bisschen, dass alle ihn „Ronaldo“ nennen?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Er möchte mit seinem eigenen Namen angesprochen werden; der Spitzname macht ihn nur zum „Portugiesen, der Fußball spielt“.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Klassenrat', wo: 'Klasse 7P2 · Klassenrat', titel: 'Wie heißen wir Neue willkommen?',
      situation: 'Bald kommt noch eine neue Schülerin in die Klasse. Im Klassenrat sammeln die Jugendlichen Ideen.',
      bild: ['amira:froh:stehen-zeigen', 'lio:froh:stehen'], sprecher: { Amira: 'w2', Lio: 'm3', Tomás: 'm1', 'Herr Mesenberg': 'm2' },
      text: [
        ['Herr Mesenberg', 'Nächste Woche kommt eine neue Schülerin aus Syrien. Sie spricht Arabisch und etwas Englisch. Wie können wir ihr helfen?'],
        ['Amira', 'Ich spreche Arabisch! Ich kann ihr am Anfang übersetzen.'],
        ['Lio', 'Wir könnten Paten machen: Jeden Tag kümmert sich jemand anderes um sie, in der Pause und in der Kantine.'],
        ['Tomás', 'Darf ich etwas sagen? Für mich war das Schlimmste, allein in der Pause zu sitzen. Und bitte: Fragt sie nach ihrem Namen und benutzt ihn richtig.'],
        ['Herr Mesenberg', 'Sehr wichtig, Tomás. Was noch?'],
        ['Amira', 'Wir machen ein Willkommens-Plakat mit „Hallo“ in allen Sprachen der Klasse.'],
        ['Lio', 'Und wir fragen sie nicht sofort nach dem Krieg aus. Wenn sie erzählen will, hören wir zu.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Pate oder eine Patin in der Schule? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['jemand, der einem Neuen hilft und ihn begleitet', 'ein Lehrer'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Ideen haben die Jugendlichen?', stufe: 1, kopf: ['Wer?', 'Idee'], breiten: [22, 78], zeilen: [['Amira', '[übersetzen (Arabisch); Willkommens-Plakat mit „Hallo“ in allen Sprachen]'], ['Lio', '[Paten: jeden Tag kümmert sich jemand anderes; nicht nach dem Krieg ausfragen]'], ['Tomás', '[nicht allein in der Pause lassen; den Namen richtig benutzen]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum ist Lios letzter Satz wichtig? Sprecht darüber.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Lio meint, dass …', 'Manche Erinnerungen sind …', 'Man kann zeigen, dass man da ist, indem …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Neu sein ist schwer', punkte: ['neue **Sprache**, neue **Regeln**', 'Freunde **vermissen**', '**allein** sein in der Pause', 'braucht **Zeit**'] },
         { titel: 'Willkommen heißen', punkte: ['**ansprechen**, einladen', 'den **Namen** richtig benutzen', '**Paten** und Wörterhefte', 'nicht ausfragen – **zuhören**, wenn jemand erzählen will'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Willkommens-Karten: Schreibt auf die Karten „Hallo“ und „Willkommen“ in den Sprachen eurer Klasse. Auf die Rückseite oder die leeren Karten schreibt ihr Ideen, wie ihr Neuen helft. Hängt alles an eine Willkommens-Wand.', stufe: 2, neueSeite: true, titel: 'Willkommen!', icon: 'heart-handshake', farbe: IDEE, spalten: 3,
        karten: [
          { text: '**Moien!** (Luxemburgisch)', linien: 1 }, { text: '**Bonjour!** (Französisch)', linien: 1 }, { text: '**Olá!** (Portugiesisch)', linien: 1 },
          { text: '**Marhaba!** (Arabisch)', linien: 1 }, { text: '**Hello!** (Englisch)', linien: 1 }, { text: '**Hallo!** (Deutsch)', linien: 1 },
          { text: 'Meine Idee:', linien: 2 }, { text: 'Meine Idee:', linien: 2 }, { text: 'Meine Idee:', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Brief an die neue Schülerin, bevor sie kommt. Was möchtest du ihr sagen?', stufe: 2,
        anfaenge: ['Liebe neue Mitschülerin,', 'wir freuen uns, dass …', 'Bei uns …', 'Wenn du Hilfe brauchst, …'], zeilen: 7,
        beispiel: 'Liebe neue Mitschülerin, wir freuen uns, dass du bald in unsere Klasse kommst. Bei uns sprechen viele verschiedene Sprachen, und alle haben einmal neu angefangen. In der Pause spielen wir oft Basketball, du kannst gern mitmachen. Wenn du Hilfe brauchst, frag einfach Amira oder mich. Bis bald!' },
    ],
    check: ['Ich versetze mich in eine neue Person hinein.', 'Ich nenne Ideen, wie man Neue willkommen heißt.', 'Ich weiß, warum Namen und Zuhören wichtig sind.'],
  },
  // ================================================================ 8
  {
    thema: 'Verantwortung in der Gemeinschaft · Ehrenamt', titel: 'Gemeinsam helfen', untertitel: 'Jugendfeuerwehr, Pfadfinder, Tierheim, Lebensmittelladen für Menschen mit wenig Geld: Du lernst junge Menschen kennen, die sich engagieren, und planst ein Hilfsprojekt.',
    ziel: { de: 'Ich beschreibe, wie sich Menschen ehrenamtlich engagieren, und plane ein eigenes kleines Projekt.', fr: 'Je décris comment les gens s’engagent bénévolement et je planifie un petit projet.' },
    bild: ['sami:froh:stehen', 'chloe:froh:stehen'],
    start: {
      was: 'Helfen',
      aufgaben: [
        { art: 'mc', auftrag: 'Was bedeutet „ehrenamtlich“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man hilft freiwillig und bekommt kein Geld dafür.', 'Man arbeitet für viel Geld.', 'Man muss helfen, weil es Pflicht ist.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Drei Porträts', art: 'profile', stimme: 'w1',
      quelle: 'Porträts aus einer Jugendzeitschrift (Jugendliche ausgedacht)', titel: 'Wir machen mit!',
      profile: [
        { name: 'Sami, 14 – Jugendfeuerwehr', bild: 'sami:froh:brust', stimme: 'm3', text: 'Jeden zweiten Samstag üben wir: Schläuche ausrollen, Erste Hilfe, Funken. Echte Einsätze machen wir noch nicht, aber wir lernen alles dafür. Das Beste ist das Team. **Bei uns zählt jeder.**' },
        { name: 'Chloé, 13 – Tierheim', bild: 'chloe:froh:brust', stimme: 'w3', text: 'Ich gehe mittwochs ins Tierheim und führe Hunde aus, die kein Zuhause haben. Manche haben am Anfang Angst vor Menschen. Wenn ein Hund mir dann vertraut, ist das ein tolles Gefühl. **Tiere brauchen auch eine Stimme.**' },
        { name: 'Ben, 15 – Lebensmittelladen', bild: 'ben:froh:brust', stimme: 'm2', text: 'In unserem Ort gibt es einen Laden, in dem Menschen mit wenig Geld günstig einkaufen können. Ich helfe samstags beim Einräumen. Am Anfang war ich unsicher. Jetzt weiß ich: **Jeder kann in eine schwierige Lage kommen.**' },
      ],
      woerter: [['ehrenamtlich', 'bénévole'], ['sich engagieren', 's’engager'], ['die Jugendfeuerwehr', 'les jeunes sapeurs-pompiers'], ['der Pfadfinder', 'le scout'], ['das Tierheim', 'le refuge pour animaux'], ['vertrauen', 'faire confiance'], ['die Lage', 'la situation'], ['das Projekt', 'le projet']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ergänze.', stufe: 1, kopf: ['Wer?', 'Wo?', 'Was macht sie / er?', 'Warum?'], breiten: [14, 24, 34, 28], zeilen: [['Sami', '[Jugendfeuerwehr]', '[üben: Schläuche, Erste Hilfe, Funken]', '[Team, jeder zählt]'], ['Chloé', '[Tierheim]', '[führt Hunde aus]', '[Tiere brauchen eine Stimme]'], ['Ben', '[Lebensmittelladen]', '[hilft beim Einräumen]', '[jeder kann in eine schwierige Lage kommen]']] },
      ],
    },
    hoeren: {
      was: 'Ein Interview', wo: 'Schulradio', titel: 'Warum hilfst du?',
      situation: 'Im Schulradio fragt Mia Sami und Chloé, warum sie sich engagieren.',
      bild: ['mia:froh:handy', 'chloe:froh:stehen'], sprecher: { Mia: 'w2', Sami: 'm3', Chloé: 'w3' },
      text: [
        ['Mia', 'Sami, du opferst jeden zweiten Samstag. Warum?'],
        ['Sami', 'Am Anfang war es nur, weil mein Kumpel mitgemacht hat. Aber jetzt weiß ich, wie man hilft, wenn etwas passiert. Letzte Woche ist eine Frau im Supermarkt umgefallen, und ich wusste, was zu tun ist. Das fühlt sich gut an.'],
        ['Mia', 'Chloé, was hast du im Tierheim gelernt?'],
        ['Chloé', 'Geduld! Und Verantwortung. Wenn ich nicht komme, geht ein Hund nicht spazieren. Darum bin ich immer pünktlich.'],
        ['Mia', 'Was sagt ihr Leuten, die sagen: „Ich habe keine Zeit“?'],
        ['Sami', 'Man muss nicht jede Woche helfen. Auch einmal im Monat ist super.'],
        ['Chloé', 'Und es gibt so viele Möglichkeiten: Musikverein, Sportverein, Nachhilfe für Jüngere, Müllsammeln. Für jeden gibt es etwas.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bekommt man fürs Helfen, auch ohne Geld? Rate (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['neue Freunde', 'Erfahrung', 'ein gutes Gefühl', 'Ärger'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Sami ist am Anfang wegen eines Freundes zur Jugendfeuerwehr gegangen.', true], ['Sami wusste im Supermarkt nicht, was zu tun ist.', false], ['Chloé hat im Tierheim Geduld gelernt.', true], ['Man muss jede Woche helfen, sonst lohnt es sich nicht.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wo könntet ihr euch engagieren? Was passt zu euren Stärken?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich könnte mir vorstellen, …', 'Das passt zu mir, weil …', 'Ich weiß noch nicht, aber …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ehrenamt', punkte: ['**freiwillig** und **ohne Lohn**', 'z. B. Feuerwehr, Pfadfinder, Sportverein, Tierheim', 'Gemeinschaft **funktioniert** nur, wenn viele mithelfen'] },
         { titel: 'Was es mir bringt', punkte: ['**Erfahrung** und neue Fähigkeiten', '**Freunde** und Team', 'ein **gutes Gefühl**', 'Pluspunkt für **Bewerbungen**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Ideen-Karten: Schneidet die Karten aus. Wählt in der Gruppe ein Projekt, das ihr als Klasse wirklich machen könnt. Füllt die leere Karte mit eurem Plan.', stufe: 2, neueSeite: true, titel: 'Projektidee', icon: 'bulb', farbe: IDEE, spalten: 2,
        karten: [
          { text: '**Müll-Sammelaktion** im Park oder am Bach' }, { text: '**Lesepaten**: Jüngeren in der Grundschule vorlesen' },
          { text: '**Kuchenverkauf** für das Tierheim' }, { text: '**Besuch im Seniorenheim**: Spiele spielen, singen' },
          { text: '**Tauschbörse** für Kleidung und Bücher' }, { text: '**Willkommens-Paten** für neue Schülerinnen und Schüler' },
          { text: '**Unser Projekt:**\nWas? Wann? Wer macht was?', linien: 4 }, { text: '**Was wir brauchen:**', linien: 4 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Plane ein Hilfsprojekt für deine Klasse und schreibe einen Projektplan.', stufe: 2,
        anfaenge: ['Unser Projekt: …', 'Ziel: …', 'Wann und wo: …', 'Wer macht was: …', 'Was wir brauchen: …'], zeilen: 8,
        beispiel: 'Unser Projekt: Lesepaten. Ziel: Kinder aus der Grundschule bekommen mehr Freude am Lesen. Wann und wo: jeden zweiten Freitag in der Bibliothek der Grundschule. Wer macht was: Je zwei von uns lesen mit einer kleinen Gruppe, Amira kümmert sich um die Bücher, Lio macht den Plan. Was wir brauchen: Bücher, die Erlaubnis der Schulen und eine Lehrkraft, die uns begleitet.' },
    ],
    check: ['Ich erkläre, was Ehrenamt ist.', 'Ich nenne Beispiele für Engagement.', 'Ich plane ein kleines Hilfsprojekt.'],
  },
]

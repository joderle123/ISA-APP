// Sport · Modul 4 (6P) „Kraft und Fitness“ – Éducation physique et sportive, Voie de préparation.
// Muskeln kennen (Körperbild beschriften), Kraftübungen mit dem eigenen Körpergewicht, Zirkeltraining mit Stationskarten,
// Dehnen und Beweglichkeit, Fitness messen und Ziele setzen, eigener Trainingsplan. Gesundheit statt Aussehen:
// keine Bewertung von Körpern oder Gewicht; Vergleich nur mit sich selbst. Nele (Rollstuhl) hat passende Varianten.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { muskeln } from './praxis-bilder.mjs'

export const MODUL = sachModul('eduph', 4, {
  titel: 'Kraft und Fitness',
  titelFr: 'Force et condition physique',
  unter: 'Muskeln kennen, mit dem eigenen Körpergewicht trainieren, ein Zirkeltraining machen, richtig dehnen, die eigene Fitness messen und einen Trainingsplan schreiben.',
  unterFr: 'Muscles, exercices au poids du corps, circuit training, étirements, tests de condition physique et plan d’entraînement.',
  farbe: '#b8462e',
  deckbild: ['amira:stolz:stehen', 'ben:froh:stehen-zeigen', 'nele:froh:rollstuhl'],
  blasen: [{ t: 'Rücken gerade!', x: 8, y: 104 }, { t: 'Noch 10 Sekunden!', x: 116, y: 92 }, { t: 'Pause!', x: 184, y: 150 }],
  aussprache: { '(\\d+) ?s\\b': '\\1 Sekunden' },
  themen: [
    { titel: { de: 'Kraft', fr: 'Force' }, icon: 'barbell', lektionen: 3 },
    { titel: { de: 'Fit bleiben', fr: 'Rester en forme' }, icon: 'heartbeat', lektionen: 3 },
  ],
})

const KRAFT = '#b8462e', DEHN = '#2f8a6b'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Muskeln kennen', titel: 'Über 600 Muskeln', untertitel: 'Ohne Muskeln könntest du nicht stehen, atmen oder lachen. Du lernst, wie Muskeln arbeiten, wo die wichtigsten Muskelgruppen sind und welche Übung welchen Muskel trainiert.',
    ziel: { de: 'Ich kenne wichtige Muskelgruppen und weiß, wie Muskeln arbeiten.', fr: 'Je connais les principaux groupes musculaires et je sais comment fonctionnent les muscles.' },
    bild: ['ben:froh:stehen-zeigen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Spür mal!',
      aufgaben: [
        { art: 'fragen', auftrag: 'Leg eine Hand auf deinen Oberarm und beuge den Arm. Was spürst du?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Der Muskel vorn am Oberarm (Bizeps) wird dick und hart.' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Körperwissen (vereinfacht)', titel: 'Wie Muskeln arbeiten',
      absaetze: [
        'Der Mensch hat über **600 Muskeln**. Sie sind über **Sehnen** mit den Knochen verbunden. Wenn ein Muskel sich **zusammenzieht**, wird er kürzer und dicker – und zieht am Knochen. So bewegst du dich.',
        'Ein Muskel kann nur **ziehen**, nicht drücken. Darum arbeiten Muskeln oft als **Paar**: Der **Bizeps** vorn am Oberarm beugt den Arm, der **Trizeps** hinten streckt ihn wieder.',
        'Wichtige Muskelgruppen sind die **Brustmuskeln**: Sie brauchst du zum Drücken, zum Beispiel beim Liegestütz. Die **Bauchmuskeln** und die **Rückenmuskeln** halten den Oberkörper aufrecht. Die **Gesäßmuskeln** und die **Oberschenkelmuskeln** brauchst du zum Gehen, Springen und Treppensteigen. Die **Wadenmuskeln** heben die Ferse.',
        'Wenn du Muskeln trainierst, werden sie **kräftiger** und **ausdauernder**. Ein starker Rücken und ein starker Bauch schützen vor Rückenschmerzen. Wichtig: Muskeln wachsen in der **Pause** nach dem Training, nicht während des Trainings.',
      ],
      woerter: [['der Muskel', 'le muscle'], ['die Sehne', 'le tendon'], ['sich zusammenziehen', 'se contracter'], ['beugen', 'fléchir'], ['strecken', 'tendre'], ['der Bauch', 'le ventre'], ['der Rücken', 'le dos'], ['die Wade', 'le mollet']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte die Muskelgruppen.', stufe: 1, html: '<div class="voll">' + muskeln() + '</div>', liste: [['1', 'Brustmuskeln'], ['2', 'Bizeps'], ['3', 'Bauchmuskeln'], ['4', 'Oberschenkelmuskeln (vorn)'], ['5', 'Trizeps'], ['6', 'Rückenmuskeln'], ['7', 'Gesäßmuskeln'], ['8', 'Wadenmuskeln']], spalten: 2 },
      ],
    },
    hoeren: {
      was: 'Eine Trainer-Ansage', wo: 'Sporthalle', titel: 'Wo brennt es?',
      situation: 'Frau Diallo macht mit der Klasse kurze Übungen. Nach jeder Übung fragt sie: Welchen Muskel spürt ihr? Mach mit!',
      bild: ['lehrerin:froh:erklaeren', 'ben:froh:stehen-zeigen'], sprecher: { 'Frau Diallo': 'w1', Ben: 'm2', Nele: 'w3' },
      text: [
        ['Frau Diallo', 'Erste Übung: Stellt euch hin und geht zehnmal langsam auf die Zehenspitzen und wieder runter. … Und? Wo spürt ihr es?'],
        ['Ben', 'Hinten am Unterschenkel. In der Wade.'],
        ['Frau Diallo', 'Genau, die Wadenmuskeln. Zweite Übung: zehn Kniebeugen. Po nach hinten, als ob ihr euch auf einen Stuhl setzt. … Wo brennt es?'],
        ['Ben', 'Vorne an den Oberschenkeln. Und am Po.'],
        ['Frau Diallo', 'Richtig, Oberschenkel und Gesäß. Dritte Übung: Legt euch auf den Rücken, Knie angewinkelt. Hebt den Kopf und die Schultern ein kleines Stück. Halten! … Wo?'],
        ['Ben', 'Im Bauch!'],
        ['Frau Diallo', 'Die Bauchmuskeln. Wer im Rollstuhl sitzt: Bremsen fest! Drückt euch mit den Händen an den Rädern ein Stück hoch und lasst euch langsam wieder ab. Nele, wo spürst du das?'],
        ['Nele', 'Hinten am Oberarm.'],
        ['Frau Diallo', 'Genau, das ist der Trizeps. Sehr gut! Jetzt kennt ihr schon fünf Muskelgruppen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Kniebeuge? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['in die Knie gehen, als ob man sich setzt, und wieder aufstehen', 'auf den Knien laufen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Übung trainiert welchen Muskel?', stufe: 1, kopf: ['Übung', 'Muskel'], breiten: [55, 45], zeilen: [['auf die Zehenspitzen gehen', '[Wadenmuskeln]'], ['Kniebeugen', '[Oberschenkel und Gesäß]'], ['Kopf und Schultern heben (liegend)', '[Bauchmuskeln]'], ['im Rollstuhl hochdrücken', '[Trizeps]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Zeigt euch gegenseitig eine Übung. Der andere sagt, welcher Muskel arbeitet.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Bei dieser Übung …', 'Ich spüre es im …', 'Das ist der …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'So arbeiten Muskeln', punkte: ['über **600** Muskeln', 'mit **Sehnen** am Knochen', 'Muskeln können nur **ziehen**', 'arbeiten als **Paar** (Bizeps – Trizeps)', 'wachsen in der **Pause**'] },
         { titel: 'Muskelgruppen', punkte: ['**Brust**, **Bauch**, **Rücken**', '**Bizeps**, **Trizeps**', '**Gesäß**, **Oberschenkel**', '**Waden**'] }],
      ],
    },
    ueben: [
      { art: 'zuordnen', auftrag: 'Welcher Muskel arbeitet im Alltag? Verbinde.', stufe: 2, links: ['eine schwere Einkaufstasche hochheben (Arm beugen)', 'die Treppe hochsteigen', 'gerade sitzen, ohne sich anzulehnen', 'auf die Zehenspitzen stellen, um oben ins Regal zu greifen'], rechts: ['Bizeps', 'Oberschenkel und Gesäß', 'Bauch- und Rückenmuskeln', 'Wadenmuskeln'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welche Muskeln brauchst du bei deinem Lieblingssport oder deiner Lieblingsbewegung?', stufe: 2,
        anfaenge: ['Mein Lieblingssport ist …', 'Dabei brauche ich vor allem …', 'Ich merke das, wenn …'], zeilen: 5,
        beispiel: 'Mein Lieblingssport ist Basketball. Dabei brauche ich vor allem die Oberschenkel und die Waden zum Springen und die Arme zum Werfen. Ich merke das, wenn ich nach dem Training Muskelkater in den Beinen habe.' },
    ],
    check: ['Ich weiß, wie Muskeln arbeiten.', 'Ich kenne acht Muskelgruppen.', 'Ich weiß, welche Übung welchen Muskel trainiert.'],
  },
  // ================================================================ 2
  {
    thema: 'Kraftübungen mit dem eigenen Körper', titel: 'Kein Gerät nötig', untertitel: 'Für Kraft brauchst du kein Fitnessstudio. Dein Körper ist das Trainingsgerät. Du lernst fünf Grundübungen mit sauberer Technik – jeweils in einer leichten und einer schweren Variante.',
    ziel: { de: 'Ich mache fünf Kraftübungen mit sauberer Technik.', fr: 'Je réalise cinq exercices de renforcement avec une bonne technique.' },
    bild: ['amira:stolz:stehen', 'lehrerin:froh:zeigen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist bei Kraftübungen am wichtigsten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine saubere Technik', 'möglichst viele Wiederholungen, egal wie', 'möglichst schnell'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Trainings-Anleitung', titel: 'Fünf Grundübungen',
      material: ['eine Gymnastikmatte', 'eine Stoppuhr'],
      schritte: [
        { icon: 'arrow-down', text: '**Kniebeuge:** Füße schulterbreit, Po nach hinten wie zum Hinsetzen, Rücken gerade, Knie Richtung Zehen. //Leicht:// nur halb tief. //Schwer:// langsam runter, schnell hoch.' },
        { icon: 'stretching', text: '**Liegestütz:** Hände unter den Schultern, Körper gerade wie ein Brett. //Leicht:// auf den Knien oder an der Wand. //Schwer:// Füße auf eine Bank.' },
        { icon: 'minus', text: '**Unterarmstütz:** Auf Unterarmen und Zehen, Körper gerade, Bauch fest, Po nicht nach oben. //Leicht:// auf den Knien. //Schwer:// ein Bein anheben.' },
        { icon: 'walk', text: '**Ausfallschritt:** Großer Schritt nach vorn, hinteres Knie Richtung Boden, vorderes Knie über dem Fuß, Oberkörper aufrecht. //Leicht:// an der Wand festhalten. //Schwer:// langsam und tief, ohne Festhalten.' },
        { icon: 'arrow-up', text: '**Rückenstrecker:** Auf dem Bauch liegen, Blick zum Boden, Arme und Beine ein kleines Stück anheben. //Leicht:// nur die Arme. //Schwer:// Arme und Beine drei Sekunden oben halten.' },
      ],
      danach: ['**Sauber vor schnell:** Lieber fünf saubere Wiederholungen als zwanzig schlampige. **Weiteratmen!** Bei **Schmerz** sofort aufhören: Ein leichtes Brennen im Muskel ist normal, ein Stechen im Gelenk nicht.'],
      woerter: [['die Kniebeuge', 'le squat'], ['der Liegestütz', 'la pompe'], ['der Unterarmstütz', 'la planche'], ['der Ausfallschritt', 'la fente'], ['die Wiederholung', 'la répétition'], ['die Variante', 'la variante'], ['atmen', 'respirer'], ['der Schmerz', 'la douleur']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welcher Fehler – welche Korrektur? Verbinde.', stufe: 2, links: ['Beim Unterarmstütz ist der Po ganz oben.', 'Bei der Kniebeuge ist der Rücken rund.', 'Beim Liegestütz hängt der Bauch durch.', 'Man hält beim Üben die Luft an.'], rechts: ['Po senken, Körper wie ein Brett', 'Brust raus, Rücken gerade', 'Bauch anspannen', 'ruhig weiteratmen'] },
      ],
    },
    hoeren: {
      was: 'Eine Trainer-Ansage', wo: 'Sporthalle', titel: 'Technik-Check',
      situation: 'Amira zeigt der Klasse die Übungen. Frau Diallo korrigiert, damit alle sehen, worauf es ankommt.',
      bild: ['amira:stolz:stehen', 'lehrerin:froh:zeigen'], sprecher: { 'Frau Diallo': 'w1', Amira: 'w2' },
      text: [
        ['Frau Diallo', 'Amira zeigt uns die Kniebeuge. Schaut auf ihren Rücken. … Gerade, sehr gut. Und die Knie zeigen nach vorn, in Richtung der Zehen.'],
        ['Amira', 'Muss ich ganz tief runter?'],
        ['Frau Diallo', 'So tief, wie du sauber kommst. Für den Anfang reicht es, wenn die Oberschenkel fast waagerecht sind.'],
        ['Frau Diallo', 'Jetzt der Unterarmstütz. Halte ihn zwanzig Sekunden. … Stopp, Amira, dein Po geht langsam nach oben. Bauch fest, Po runter, bis der Körper gerade ist wie ein Brett.'],
        ['Amira', 'Puh, so ist es viel schwerer!'],
        ['Frau Diallo', 'Genau. So arbeitet der Bauch richtig. Wer zittert, darf auf die Knie gehen. Das ist keine Schande, das ist schlau.'],
        ['Frau Diallo', 'Und denkt daran: atmen! Ein … und aus. Nicht die Luft anhalten.'],
        ['Amira', 'Zwanzig Sekunden geschafft!'],
        ['Frau Diallo', 'Super. Jetzt ihr alle. Jeder wählt die leichte oder die schwere Variante – so, dass ihr es sauber schafft.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „waagerecht“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['flach wie der Boden', 'senkrecht wie eine Wand'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Bei der Kniebeuge zeigen die Knie in Richtung der Zehen.', true], ['Man muss bei der Kniebeuge ganz tief runter.', false], ['Beim Unterarmstütz geht Amiras Po nach oben.', true], ['Auf die Knie zu gehen ist eine Schande.', false], ['Man soll die Luft anhalten.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Beobachtet euch zu zweit bei einer Übung und gebt einen Technik-Tipp.', stufe: 2, karten: [
        { titel: 'Technik-Tipps', text: ['Dein Rücken ist …', 'Versuch, den Bauch …', 'Atme …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Fünf Grundübungen', punkte: ['**Kniebeuge**: Beine, Po', '**Liegestütz**: Brust, Arme', '**Unterarmstütz**: Bauch, Rücken', '**Ausfallschritt**: Beine', '**Rückenstrecker**: Rücken'] },
         { titel: 'Regeln', punkte: ['**sauber vor schnell**', '**leicht oder schwer** wählen', '**atmen**', 'Brennen im Muskel ok – **Schmerz**: aufhören'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mein Kraft-Protokoll: Wie viele saubere Wiederholungen schaffst du? (Unterarmstütz: Sekunden)', stufe: 1, kopf: ['Übung', 'Variante (leicht/schwer)', 'Woche 1', 'Woche 3'], breiten: [32, 28, 20, 20], zeilen: [['Kniebeuge', '', '', ''], ['Liegestütz', '', '', ''], ['Unterarmstütz (s)', '', '', ''], ['Ausfallschritt (pro Bein)', '', '', ''], ['Rückenstrecker', '', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welche Übung fällt dir leicht, welche schwer? Woran willst du arbeiten?', stufe: 1,
        anfaenge: ['Leicht fällt mir …', 'Schwer ist …, weil …', 'Ich will …'], zeilen: 5,
        beispiel: 'Leicht fällt mir die Kniebeuge. Schwer ist der Liegestütz, weil meine Arme schnell müde werden. Ich will drei Wochen lang die leichte Variante an der Wand üben und dann auf die Knie wechseln.' },
    ],
    check: ['Ich kenne fünf Grundübungen.', 'Ich mache sie mit sauberer Technik.', 'Ich wähle die passende Variante.'],
  },
  // ================================================================ 3
  {
    thema: 'Zirkeltraining', titel: 'Station für Station', untertitel: 'Beim Zirkeltraining geht man von Station zu Station. Belastung und Pause wechseln sich ab. Du lernst, wie ein Zirkel funktioniert, machst bei einer Ansage mit und baust einen Zirkel mit Stationskarten auf.',
    ziel: { de: 'Ich mache ein Zirkeltraining und protokolliere meine Leistung.', fr: 'Je fais un circuit training et je note mes performances.' },
    bild: ['yusuf:froh:gehen', 'nele:froh:rollstuhl'],
    start: {
      was: 'Rate mal!',
      aufgaben: [
        { art: 'mc', auftrag: 'Was bedeutet „30 Sekunden Belastung, 30 Sekunden Pause“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['30 Sekunden üben, dann 30 Sekunden ausruhen und wechseln', '30 Sekunden schlafen'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sportwissen', titel: 'So funktioniert ein Zirkeltraining',
      absaetze: [
        'Beim **Zirkeltraining** stehen in der Halle mehrere **Stationen**, zum Beispiel sechs bis acht. An jeder Station gibt es eine andere Übung. Alle trainieren gleichzeitig, jeder an einer Station.',
        'Es gibt eine feste **Belastungszeit**, zum Beispiel **30 Sekunden**. In dieser Zeit macht man so viele saubere Wiederholungen wie möglich. Dann kommt eine **Pause**, zum Beispiel ebenfalls 30 Sekunden. In der Pause geht man zur **nächsten** Station und zählt kurz die Wiederholungen.',
        'Gute Zirkel **wechseln** die Muskelgruppen ab: Beine, dann Arme, dann Bauch, dann wieder Beine. So kann sich ein Muskel erholen, während der nächste arbeitet.',
        'Nach einer Runde gibt es eine längere Pause von zwei bis drei Minuten. Wer will und kann, macht eine **zweite Runde**. Jeder trainiert in **seinem Tempo** – es zählt, dass du dich mit dir selbst verbesserst.',
      ],
      woerter: [['das Zirkeltraining', 'le circuit training'], ['die Station', 'l’atelier, le poste'], ['die Belastung', 'l’effort'], ['die Pause', 'la pause'], ['gleichzeitig', 'en même temps'], ['abwechseln', 'alterner'], ['sich erholen', 'récupérer'], ['die Runde', 'le tour']],
      aufgaben: [
        { art: 'rechnen', auftrag: 'Rechne die Zeit aus.', stufe: 2, spalten: 2, items: [{ a: '8 Stationen, je 30 s Belastung und 30 s Pause. Wie lange dauert eine Runde?', l: '8 × 60 s = 480 s = 8 Minuten' }, { a: 'Dazu 3 Minuten Pause und eine zweite Runde. Wie lange insgesamt?', l: '8 + 3 + 8 = 19 Minuten' }, { a: '6 Stationen, je 40 s Belastung und 20 s Pause. Eine Runde?', l: '6 Minuten' }, { a: 'Wie viele Sekunden arbeitet man bei 6 Stationen mit je 40 s?', l: '240 s = 4 Minuten' }] },
      ],
    },
    hoeren: {
      was: 'Eine Trainer-Ansage', wo: 'Sporthalle · Zirkel', titel: 'Wechsel!',
      situation: 'Der Zirkel läuft. Frau Diallo gibt die Kommandos. Hör zu – und wenn du kannst, mach an deiner Station mit.',
      bild: ['lehrerin:froh:zeigen', 'yusuf:froh:gehen'], sprecher: { 'Frau Diallo': 'w1' },
      text: [
        ['Frau Diallo', 'Alle an ihrer ersten Station? Dreißig Sekunden Belastung, dreißig Sekunden Pause. Achtung … los!'],
        ['Frau Diallo', 'Saubere Technik! Zählt eure Wiederholungen. … Noch zehn Sekunden! … Fünf, vier, drei, zwei, eins – Stopp!'],
        ['Frau Diallo', 'Pause. Schreibt eure Zahl auf und geht zur nächsten Station. Im Uhrzeigersinn. Trinkt einen Schluck, wenn ihr wollt.'],
        ['Frau Diallo', 'Achtung … los! Station zwei: Wer an den Liegestützen ist, darf an die Wand. Nele, an deiner Station drückst du das Theraband nach vorn.'],
        ['Frau Diallo', 'Noch zehn Sekunden … Stopp! Wechsel!'],
        ['Frau Diallo', 'Achtung … los! Hampelmann-Station: locker springen, Arme hoch. … Wer Seitenstechen hat, macht langsamer. … Stopp! Wechsel!'],
        ['Frau Diallo', 'Super, weiter so! Atmet tief. Achtung … los!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „im Uhrzeigersinn“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['in die Richtung, in die sich die Zeiger einer Uhr drehen', 'rückwärts'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wie lange dauern Belastung und Pause?', l: 'je 30 Sekunden' }, { f: 'Was macht man in der Pause?', zeilen: 2, l: 'Wiederholungen aufschreiben, zur nächsten Station gehen, etwas trinken' }, { f: 'In welche Richtung wechselt man?', l: 'im Uhrzeigersinn' }, { f: 'Was macht Nele an Station zwei?', l: 'Sie drückt das Theraband nach vorn.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Station war für euch am anstrengendsten? Warum?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Am anstrengendsten war …', 'weil …', 'Am meisten Spaß hat …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Zirkeltraining', punkte: ['**6–8 Stationen**', '**Belastung** (z. B. 30 s)', '**Pause** (z. B. 30 s) = Wechsel', 'nach der Runde **2–3 Minuten** Pause'] },
         { titel: 'Gut geplant', punkte: ['**Muskelgruppen** abwechseln', '**leichte** und **schwere** Varianten', 'jeder in **seinem** Tempo', 'Wiederholungen **aufschreiben**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Stationskarten: Schneidet die Karten aus und legt sie an die Stationen. Haltet die Reihenfolge ein – sie wechselt die Muskelgruppen ab.', stufe: 1, neueSeite: true, titel: 'Station', icon: 'barbell', farbe: KRAFT, spalten: 2,
        karten: [
          { text: '**1 · Kniebeugen**\nBeine · leicht: halb tief' }, { text: '**2 · Liegestütz**\nArme, Brust · leicht: an der Wand / Theraband' },
          { text: '**3 · Hampelmann**\nAusdauer · leicht: ohne Sprung' }, { text: '**4 · Unterarmstütz**\nBauch · leicht: auf den Knien' },
          { text: '**5 · Ausfallschritte**\nBeine · leicht: an der Wand halten' }, { text: '**6 · Rückenstrecker**\nRücken · leicht: nur Arme' },
          { text: '**7 · Seilspringen**\nAusdauer · leicht: auf der Stelle hüpfen' }, { text: '**8 · Ball-Wandwurf**\nArme · leicht: leichter Ball' },
        ] },
      { art: 'tabelle', auftrag: 'Mein Zirkel-Protokoll: Trage deine Wiederholungen ein.', stufe: 1, kopf: ['Station', 'Runde 1', 'Runde 2'], breiten: [50, 25, 25], zeilen: [['1 Kniebeugen', '', ''], ['2 Liegestütz', '', ''], ['3 Hampelmann', '', ''], ['4 Unterarmstütz (s)', '', ''], ['5 Ausfallschritte', '', ''], ['6 Rückenstrecker', '', ''], ['7 Seilspringen', '', ''], ['8 Ball-Wandwurf', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie hast du dich während und nach dem Zirkel gefühlt? An welcher Station warst du am stärksten?', stufe: 1,
        anfaenge: ['Während des Zirkels …', 'Danach …', 'Am stärksten war ich an Station …'], zeilen: 5,
        beispiel: 'Während des Zirkels war ich ziemlich außer Atem, vor allem beim Seilspringen. Danach war ich müde, aber auch stolz. Am stärksten war ich an Station 1, da habe ich 18 Kniebeugen geschafft.' },
    ],
    check: ['Ich weiß, wie ein Zirkeltraining funktioniert.', 'Ich wechsle die Stationen nach Kommando.', 'Ich protokolliere meine Wiederholungen.'],
  },
  // ================================================================ 4
  {
    thema: 'Dehnen und Beweglichkeit', titel: 'Locker bleiben', untertitel: 'Beweglichkeit hilft im Sport und im Alltag. Du lernst, wann und wie man richtig dehnt, machst bei einem ruhigen Cool-down mit und übst mit Dehnkarten.',
    ziel: { de: 'Ich dehne mich richtig und kenne den Unterschied zwischen Aufwärmen und Cool-down.', fr: 'Je m’étire correctement et je connais la différence entre échauffement et retour au calme.' },
    bild: ['mia:ruhig:sitzen', 'lehrerin:ruhig:erklaeren'],
    start: {
      was: 'Probier mal!',
      aufgaben: [
        { art: 'fragen', auftrag: 'Setz dich auf den Boden, Beine gestreckt. Wie weit kommst du mit den Händen Richtung Füße – ohne zu wippen?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuell (z. B. bis zu den Knien, bis zu den Schienbeinen, bis zu den Zehen).' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sportwissen', titel: 'Richtig dehnen',
      absaetze: [
        'Beim **Dehnen** werden Muskeln langsam in die Länge gezogen. Das hält sie **geschmeidig** und den Körper **beweglich**.',
        '**Vor dem Sport** dehnt man **dynamisch**: in Bewegung, mit Schwung, aber kontrolliert – zum Beispiel Beine schwingen oder Arme kreisen. Das gehört zum Aufwärmen.',
        '**Nach dem Sport**, beim **Cool-down**, kann man **ruhig** dehnen: Man geht langsam in die Dehnung, bis man ein leichtes **Ziehen** spürt, und hält die Position etwa **20 bis 30 Sekunden**. Dabei ruhig weiteratmen.',
        '**Wichtig:** Nicht **wippen** und nicht ruckartig ziehen. Dehnen darf ziehen, aber nicht **wehtun**. Jeder Körper ist anders beweglich – das ist ganz normal. Vergleiche dich nicht mit anderen, sondern schau, wie du dich mit der Zeit verbesserst.',
        'Ein ruhiges Cool-down mit Dehnen und tiefem Atmen hilft dem Körper, wieder **zur Ruhe** zu kommen. Viele fühlen sich danach entspannter.',
      ],
      woerter: [['dehnen', 'étirer'], ['geschmeidig', 'souple'], ['beweglich', 'mobile, souple'], ['dynamisch', 'dynamique'], ['das Cool-down', 'le retour au calme'], ['ziehen', 'tirer'], ['wippen', 'faire des à-coups'], ['entspannt', 'détendu']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Vor oder nach dem Sport? Kreuze an.', stufe: 1, kopf: ['', 'vorher (Aufwärmen)', 'nachher (Cool-down)'], breiten: [52, 24, 24], zeilen: [['Beine locker vor und zurück schwingen', '[x]', ''], ['Oberschenkel 25 Sekunden ruhig dehnen', '', '[x]'], ['Arme kreisen', '[x]', ''], ['im Liegen tief atmen und entspannen', '', '[x]']] },
      ],
    },
    hoeren: {
      was: 'Eine Trainer-Ansage', wo: 'Sporthalle · Cool-down', titel: 'Ruhig werden',
      situation: 'Nach dem Zirkel leitet Frau Diallo ein ruhiges Cool-down. Mach mit – langsam und ohne Druck.',
      bild: ['lehrerin:ruhig:erklaeren', 'mia:ruhig:sitzen'], sprecher: { 'Frau Diallo': 'w1' },
      text: [
        ['Frau Diallo', 'Wir werden jetzt ganz ruhig. Geht zwei Runden langsam durch die Halle und atmet tief ein … und lange aus.'],
        ['Frau Diallo', 'Stellt euch hin. Wir dehnen den vorderen Oberschenkel. Haltet euch an der Wand fest, nehmt einen Fuß in die Hand und zieht die Ferse sanft zum Po. Die Knie bleiben nebeneinander. Spürt ihr das Ziehen vorn am Oberschenkel? Halten … zwanzig Sekunden. Und Seite wechseln.'],
        ['Frau Diallo', 'Jetzt die Wade: großer Schritt nach vorn, Hände an die Wand, das hintere Bein gestreckt, die Ferse bleibt am Boden. Halten. … Und wechseln.'],
        ['Frau Diallo', 'Setzt euch auf die Matte. Ein Bein lang, das andere angewinkelt. Beugt euch langsam über das lange Bein – nicht wippen. Nur so weit, wie es angenehm zieht.'],
        ['Frau Diallo', 'Wer im Rollstuhl sitzt: Arme über den Kopf strecken, einen Arm nach links ziehen, dann nach rechts. Schultern kreisen.'],
        ['Frau Diallo', 'Zum Schluss legt ihr euch auf den Rücken. Augen zu, wenn ihr wollt. Atmet drei Mal tief in den Bauch. … Super. Langsam aufstehen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „sanft“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['vorsichtig, ohne Kraft', 'schnell und stark'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne die Teile des Cool-downs.', stufe: 1, teile: ['langsam gehen und tief atmen', 'vorderen Oberschenkel dehnen', 'Wade dehnen', 'im Sitzen über das lange Bein beugen', 'auf dem Rücken liegen und tief atmen'], ordnung: [3, 0, 4, 2, 1] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie fühlt ihr euch nach dem Cool-down im Vergleich zu vorher?', stufe: 1, karten: [
        { titel: 'Satzanfänge', text: ['Vorher war ich …', 'Jetzt fühle ich mich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Vor dem Sport', punkte: ['**dynamisch** dehnen', 'in **Bewegung**: schwingen, kreisen', 'gehört zum **Aufwärmen**'] },
         { titel: 'Nach dem Sport', punkte: ['**ruhig** dehnen', '**20–30 Sekunden** halten', '**nicht wippen**', 'ziehen ja, **wehtun nein**', '**atmen**'] }],
        [{ titel: 'Entspannen: anspannen – loslassen', nummern: true, punkte: ['bequem liegen oder sitzen, **Augen zu**', 'eine Körperstelle **5 Sekunden fest anspannen**: Fäuste, Schultern, Bauch, Beine', '**loslassen** und 10 Sekunden nachspüren', 'ruhig **atmen**: 4 Sekunden ein, 6 aus'] },
         { titel: 'Wann hilft das?', punkte: ['nach dem **Sport**', 'vor einer **Prüfung**', 'wenn du **nicht einschlafen** kannst', 'wenn du **wütend** bist'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Dehnkarten: Zieht drei Karten und dehnt jede Position 20 Sekunden – erst links, dann rechts.', stufe: 1, neueSeite: true, titel: 'Dehnen', icon: 'yoga', farbe: DEHN, spalten: 2,
        karten: [
          { text: '**Oberschenkel vorn**\nFerse zum Po ziehen, an der Wand festhalten.' }, { text: '**Wade**\nSchritt nach vorn, hintere Ferse am Boden.' },
          { text: '**Oberschenkel hinten**\nIm Sitzen über das gestreckte Bein beugen.' }, { text: '**Schulter**\nArm vor der Brust zur anderen Seite ziehen.' },
          { text: '**Trizeps**\nHand hinter den Kopf, Ellenbogen sanft nach unten drücken.' }, { text: '**Brust**\nHand an die Wand, Oberkörper langsam wegdrehen.' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Schreibe ein kurzes Cool-down-Programm (drei Übungen) für zu Hause oder nach dem Training.', stufe: 2,
        anfaenge: ['Zuerst …', 'Dann …', 'Zum Schluss …'], zeilen: 5,
        beispiel: 'Zuerst gehe ich zwei Minuten langsam und atme tief. Dann dehne ich den Oberschenkel vorn und die Wade, je 25 Sekunden pro Seite. Zum Schluss lege ich mich auf den Rücken und atme drei Mal tief in den Bauch.' },
    ],
    check: ['Ich weiß, wann man wie dehnt.', 'Ich halte Dehnungen ruhig und ohne Wippen.', 'Ich kenne ein Cool-down.', 'Ich kann mich mit Anspannen und Loslassen entspannen.'],
  },
  // ================================================================ 5
  {
    thema: 'Fitness messen · Ziele setzen', titel: 'Mein Fitness-Pass', untertitel: 'Wie fit bist du? Du machst einfache Fitnesstests, trägst deine Ergebnisse in deinen Fitness-Pass ein und setzt dir ein eigenes Ziel. Ben zeigt, wie ein gutes Ziel aussieht.',
    ziel: { de: 'Ich messe meine Fitness und setze mir ein erreichbares Ziel.', fr: 'Je mesure ma condition physique et je me fixe un objectif atteignable.' },
    bild: ['ben:aufgeregt:stehen', 'lehrerin:froh:blatt'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Welches Ziel ist besser? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['„In vier Wochen schaffe ich 30 Sekunden Unterarmstütz.“', '„Ich will fitter werden.“'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sportwissen', titel: 'Fitness messen – mit dir selbst vergleichen',
      absaetze: [
        'Fitness hat viele Teile: **Ausdauer**, **Kraft**, **Beweglichkeit**, **Schnelligkeit** und **Gleichgewicht**. Mit einfachen Tests kannst du jeden Teil messen – zum Beispiel einen **6-Minuten-Lauf**, **Unterarmstütz** auf Zeit, den **Standweitsprung** und eine **Rumpfbeuge** im Sitzen.',
        'Wichtig: Du vergleichst dich mit **dir selbst**. Menschen sind verschieden – im Körperbau, im Alter, in der Erfahrung. Spannend ist, wie **du** dich nach einigen Wochen Training verbesserst.',
        '### Ein gutes Ziel',
        'Ein gutes Ziel ist **klar** („30 Sekunden Unterarmstütz“ statt „fitter werden“), **messbar** (eine Zahl), **erreichbar** (nicht zu schwer, nicht zu leicht) und hat einen **Termin** („in vier Wochen“).',
        'Dazu gehört ein **Plan**: Was mache ich, um das Ziel zu erreichen? Zum Beispiel: „Dreimal pro Woche übe ich den Unterarmstütz, jedes Mal drei Durchgänge.“ Und dann: dranbleiben – und den Fortschritt aufschreiben.',
      ],
      woerter: [['die Fitness', 'la condition physique'], ['die Schnelligkeit', 'la vitesse'], ['messen', 'mesurer'], ['der Standweitsprung', 'le saut en longueur sans élan'], ['die Rumpfbeuge', 'la flexion du tronc'], ['das Ziel', 'l’objectif'], ['erreichbar', 'atteignable'], ['der Termin', 'l’échéance']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Gutes Ziel oder nicht? Kreuze an.', stufe: 2, kopf: ['Ziel', 'gut', 'noch nicht'], breiten: [64, 18, 18], zeilen: [['„Ich will stärker werden.“', '', '[x]'], ['„In 6 Wochen laufe ich 7 Runden im 6-Minuten-Lauf.“', '[x]', ''], ['„Morgen mache ich 100 Liegestütze.“', '', '[x]'], ['„In 4 Wochen springe ich 10 cm weiter als heute.“', '[x]', '']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Sporthalle · nach dem Fitnesstest', titel: 'Bens Ziel',
      situation: 'Ben hat seine Testergebnisse. Er ist enttäuscht. Frau Diallo hilft ihm, ein Ziel zu setzen.',
      bild: ['ben:enttaeuscht:stehen', 'lehrerin:froh:blatt'], sprecher: { Ben: 'm2', 'Frau Diallo': 'w1' },
      text: [
        ['Ben', 'Ich habe nur fünfzehn Sekunden Unterarmstütz geschafft. Yusuf hat eine ganze Minute. Ich bin so schlecht.'],
        ['Frau Diallo', 'Stopp. Yusuf trainiert seit zwei Jahren im Verein. Du vergleichst dich mit dir selbst. Wo willst du in vier Wochen sein?'],
        ['Ben', 'Eine Minute!'],
        ['Frau Diallo', 'Das ist sehr viel in vier Wochen. Was wäre erreichbar?'],
        ['Ben', 'Vielleicht dreißig Sekunden?'],
        ['Frau Diallo', 'Das ist ein gutes Ziel: klar, messbar, erreichbar und mit Termin. Und wie willst du es schaffen?'],
        ['Ben', 'Ich übe … jeden Tag?'],
        ['Frau Diallo', 'Dreimal pro Woche reicht. Muskeln brauchen Pausen. Mach jedes Mal drei Durchgänge, so lange es sauber geht, mit einer Minute Pause dazwischen.'],
        ['Ben', 'Okay. Montag, Mittwoch, Freitag. Ich schreibe es mir in den Fitness-Pass.'],
        ['Frau Diallo', 'Und in vier Wochen messen wir wieder.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Durchgang? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Mal eine Übung machen, bevor eine Pause kommt', 'ein Gang im Schulhaus'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und fülle Bens Fitness-Ziel aus.', stufe: 1, kopf: ['', 'Ben'], breiten: [30, 70], zeilen: [['heute', '[15 Sekunden Unterarmstütz]'], ['erstes Ziel (zu viel)', '[1 Minute]'], ['neues Ziel', '[30 Sekunden in 4 Wochen]'], ['Plan', '[3-mal pro Woche (Mo, Mi, Fr), je 3 Durchgänge, 1 Minute Pause]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum ist es nicht fair, sich immer mit den Besten zu vergleichen? Mit wem sollte man sich vergleichen?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Es ist nicht fair, weil …', 'Besser ist …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Fitness', punkte: ['**Ausdauer**, **Kraft**, **Beweglichkeit**', '**Schnelligkeit**, **Gleichgewicht**', 'mit **dir selbst** vergleichen'] },
         { titel: 'Gutes Ziel', nummern: true, punkte: ['**klar**', '**messbar**', '**erreichbar**', 'mit **Termin**', '**Plan** und dranbleiben'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mein Fitness-Pass: Mach die Tests und trage ein. In vier Wochen testest du noch einmal.', stufe: 1, kopf: ['Test', 'heute', 'in 4 Wochen'], breiten: [50, 25, 25], zeilen: [['6-Minuten-Lauf (Runden) / -Fahrt im Rollstuhl', '', ''], ['Unterarmstütz (Sekunden)', '', ''], ['Standweitsprung (cm)', '', ''], ['Rumpfbeuge im Sitzen (cm vor/nach den Zehen)', '', ''], ['Einbeinstand mit geschlossenen Augen (s)', '', '']] },
      { art: 'fragen', auftrag: 'Mein Ziel für die nächsten vier Wochen:', stufe: 2, fragen: [{ f: 'Mein Ziel (klar, messbar, erreichbar, mit Termin):', zeilen: 2, l: 'Individuell' }, { f: 'Mein Plan:', zeilen: 2, l: 'Individuell' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Nach vier Wochen – hast du dein Ziel erreicht? Was hat geholfen, was war schwierig?', stufe: 2,
        anfaenge: ['Mein Ziel war …', 'Geschafft habe ich …', 'Geholfen hat …', 'Schwierig war …'], zeilen: 6,
        beispiel: 'Mein Ziel war, im 6-Minuten-Lauf eine Runde mehr zu schaffen. Geschafft habe ich sogar eineinhalb Runden mehr. Geholfen hat, dass ich mit meiner Freundin zusammen gelaufen bin. Schwierig war es, am Freitag nach der Schule noch Lust zu haben.' },
    ],
    check: ['Ich mache einfache Fitnesstests.', 'Ich vergleiche mich mit mir selbst.', 'Ich setze mir ein gutes Ziel mit Plan.'],
  },
  // ================================================================ 6
  {
    thema: 'Projekt: Mein Trainingsplan', titel: 'Fit zu Hause', untertitel: 'Zum Abschluss schreibst du einen eigenen Trainingsplan für zu Hause – ohne Geräte. Du lernst, worauf es ankommt, und hörst, warum „mehr“ nicht immer „besser“ ist.',
    ziel: { de: 'Ich schreibe einen sinnvollen Trainingsplan für zu Hause.', fr: 'J’écris un plan d’entraînement adapté pour la maison.' },
    bild: ['amira:froh:blatt', 'lio:verwirrt:handy'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Je mehr man trainiert, desto besser – auch ohne Pausen.', false], ['Muskeln wachsen in der Pause.', true], ['Jugendliche brauchen für Muskeln Eiweißpulver.', false]] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Trainings-Anleitung', titel: 'So baust du deinen Trainingsplan',
      material: ['eine Matte oder ein Teppich', 'eine Uhr', 'dein Fitness-Pass'],
      schritte: [
        { icon: 'calendar', text: '**Wann?** Zwei- bis dreimal pro Woche, mit mindestens **einem Tag Pause** dazwischen. Schreib die Tage auf.' },
        { icon: 'flame', text: '**Aufwärmen:** Fünf Minuten – auf der Stelle laufen, Arme kreisen, Knie heben.' },
        { icon: 'barbell', text: '**Hauptteil:** Vier bis sechs Übungen, die verschiedene Muskeln trainieren. Zum Beispiel als Mini-Zirkel: je **30 Sekunden** Übung, **30 Sekunden** Pause, zwei Runden.' },
        { icon: 'yoga', text: '**Cool-down:** Fünf Minuten dehnen und ruhig atmen.' },
        { icon: 'chart-line', text: '**Fortschritt:** Schreib nach jedem Training auf, was du geschafft hast. Steigere dich langsam – zum Beispiel jede Woche eine Wiederholung mehr.' },
      ],
      danach: ['**Gut zu wissen:** Für Jugendliche reicht eine **normale, abwechslungsreiche Ernährung** – Eiweißpulver oder andere Mittel braucht man nicht. Und Vorsicht bei Fitness-Videos im Internet: Manche zeigen Übungen, die zu schwer oder ungesund sind, oder Körper, die bearbeitet wurden. Bei Fragen: Sportlehrerin oder Sportlehrer fragen.'],
      woerter: [['der Trainingsplan', 'le plan d’entraînement'], ['der Hauptteil', 'la partie principale'], ['der Fortschritt', 'le progrès'], ['steigern', 'augmenter'], ['abwechslungsreich', 'varié'], ['die Ernährung', 'l’alimentation'], ['das Eiweiß', 'les protéines'], ['bearbeiten', 'retoucher']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Ordne die Teile einer Trainingseinheit.', stufe: 1, teile: ['Aufwärmen (5 Minuten)', 'Hauptteil (Übungen)', 'Cool-down (Dehnen, Atmen)', 'Fortschritt aufschreiben'], ordnung: [2, 0, 3, 1] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pausenhof', titel: 'Jeden Tag 200 Liegestütze?',
      situation: 'Lio hat im Internet ein Video gesehen: „Jeden Tag 200 Liegestütze – in 30 Tagen zum Traumkörper.“ Amira ist skeptisch.',
      bild: ['lio:aufgeregt:handy', 'amira:besorgt:blatt'], sprecher: { Lio: 'm3', Amira: 'w2' },
      text: [
        ['Lio', 'Schau mal, das Video! Jeden Tag zweihundert Liegestütze, und nach dreißig Tagen hast du so einen Körper.'],
        ['Amira', 'Hm. Wie viele schaffst du jetzt?'],
        ['Lio', 'Na ja … zehn. Aber ich mache einfach mehr Durchgänge.'],
        ['Amira', 'Jeden Tag, ohne Pause? Frau Diallo hat gesagt, Muskeln wachsen in der Pause. Wenn du jeden Tag alles gibst, tun dir bald die Schultern weh.'],
        ['Lio', 'Aber der Typ im Video hat das auch geschafft.'],
        ['Amira', 'Vielleicht trainiert er seit Jahren. Und manche Videos sind bearbeitet. Weißt du, ob das echt ist?'],
        ['Lio', 'Nein … Und was mache ich stattdessen?'],
        ['Amira', 'Einen Plan wie im Heft. Dreimal pro Woche, verschiedene Übungen. Und jede Woche ein bisschen mehr. Ich mache mit, dann ist es lustiger.'],
        ['Lio', 'Okay. Montag, Mittwoch, Freitag nach der Schule. Und wir schreiben auf, was wir schaffen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „skeptisch“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man zweifelt, ob etwas stimmt.', 'Man glaubt alles sofort.'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Lio schafft im Moment zehn Liegestütze.', true], ['Amira findet die Idee mit dem Video super.', false], ['Amira sagt, Muskeln wachsen in der Pause.', true], ['Amira weiß sicher, dass das Video echt ist.', false], ['Am Ende planen sie dreimal pro Woche zusammen zu trainieren.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Woran erkennt man, ob ein Fitness-Video im Internet vertrauenswürdig ist?', stufe: 3, karten: [
        { titel: 'Ideen', text: ['Wer hat das Video gemacht?', 'Klingt das Versprechen zu gut?', 'Wird etwas verkauft?', 'Was sagt die Sportlehrerin?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Trainingsplan', nummern: true, punkte: ['**2–3-mal** pro Woche, Pausentage', '**Aufwärmen**', '**Hauptteil**: 4–6 Übungen', '**Cool-down**', '**Fortschritt** aufschreiben'] },
         { titel: 'Gut zu wissen', punkte: ['**Pausen** sind Training', 'langsam **steigern**', 'normale Ernährung reicht', 'Fitness-Videos **kritisch** anschauen'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mein Trainingsplan für zu Hause: Fülle ihn aus.', stufe: 2, kopf: ['', 'Was?', 'Wie lange / wie oft?'], breiten: [24, 46, 30], zeilen: [['Tage', '', ''], ['Aufwärmen', '', '5 Minuten'], ['Übung 1', '', ''], ['Übung 2', '', ''], ['Übung 3', '', ''], ['Übung 4', '', ''], ['Cool-down', '', '5 Minuten']] },
      { art: 'tabelle', auftrag: 'Mein Trainings-Tagebuch: Hake jedes Training ab und notiere eine Zahl (z. B. Wiederholungen).', stufe: 1, kopf: ['Woche', 'Training 1', 'Training 2', 'Training 3'], breiten: [16, 28, 28, 28], zeilen: [['1', '', '', ''], ['2', '', '', ''], ['3', '', '', ''], ['4', '', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Was nimmst du aus diesem Modul mit? Was willst du weitermachen?', stufe: 2,
        anfaenge: ['Gelernt habe ich …', 'Am meisten überrascht hat mich …', 'Weitermachen will ich …'], zeilen: 6,
        beispiel: 'Gelernt habe ich, dass man für Kraft kein Fitnessstudio braucht. Am meisten überrascht hat mich, dass Muskeln in der Pause wachsen. Weitermachen will ich mit meinem Mini-Zirkel am Montag und Donnerstag, zusammen mit einem Freund.' },
    ],
    check: ['Ich baue einen Trainingsplan mit allen Teilen.', 'Ich plane Pausen ein.', 'Ich schaue Fitness-Videos kritisch an.'],
  },
]

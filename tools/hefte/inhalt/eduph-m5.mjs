// Sport · Modul 5 (6P) „Rückschlagspiele“ – Éducation physique et sportive, Voie de préparation.
// Badminton (Griff, Schläge, Aufschlag, Feld beschriften), Tischtennis (Platte beschriften, Aufschlagregeln, Zählweise),
// Taktik, Rundlauf und Turnierformen mit Turnierplan (Rechnen), Para-Sport und Mini-Turnier organisieren.
// Regeln vereinfacht, Stand 2026. Nele (Rollstuhl) spielt Para-Badminton/Para-Tischtennis mit.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { spielfeld, tischtennis } from './praxis-bilder.mjs'

export const MODUL = sachModul('eduph', 5, {
  titel: 'Rückschlagspiele',
  titelFr: 'Sports de raquette',
  unter: 'Badminton und Tischtennis: den Schläger richtig halten, die wichtigsten Schläge und Regeln kennen, clever spielen – und ein eigenes Mini-Turnier organisieren.',
  unterFr: 'Badminton et tennis de table : prise de raquette, coups, règles, tactique et organisation d’un mini-tournoi.',
  farbe: '#2f7a8a',
  deckbild: ['lio:aufgeregt:stehen-zeigen', 'nele:froh:rollstuhl', 'chloe:froh:stehen'],
  blasen: [{ t: 'Aufschlag!', x: 8, y: 104 }, { t: '10 : 10!', x: 130, y: 92 }, { t: 'Gut gespielt!', x: 176, y: 150 }],
  aussprache: { '(\\d+) : (\\d+)': '\\1 zu \\2', 'km/h': 'Kilometer pro Stunde' },
  themen: [
    { titel: { de: 'Badminton', fr: 'Badminton' }, icon: 'ball-tennis', lektionen: 2 },
    { titel: { de: 'Tischtennis und Turnier', fr: 'Tennis de table et tournoi' }, icon: 'ping-pong', lektionen: 4 },
  ],
})

const RUECK = '#2f7a8a', TURNIER = '#d0662a'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Badminton: Griff und Schläge', titel: 'Der Federball fliegt', untertitel: 'Badminton ist eines der schnellsten Ballspiele der Welt. Du lernst, wie man den Schläger hält, die wichtigsten Schläge und übst mit einer Trainer-Ansage zu zweit.',
    ziel: { de: 'Ich halte den Badmintonschläger richtig und spiele Grundschläge.', fr: 'Je tiens correctement la raquette de badminton et je joue les coups de base.' },
    bild: ['lio:aufgeregt:stehen-zeigen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Rate mal!',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie schnell kann ein Federball bei Profis nach einem Schmetterball fliegen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['über 400 km/h', 'etwa 50 km/h', 'etwa 10 km/h'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sportwissen', titel: 'Griff und Grundschläge',
      absaetze: [
        '### Der Griff',
        'Halte den Schläger so, als ob du jemandem die **Hand gibst**. Die Schlägerfläche steht senkrecht zum Boden. Halte ihn **locker** – nicht festklammern. Erst im Moment des Schlags drückst du fester zu.',
        '### Die Grundschläge',
        '**Clear:** ein hoher, weiter Schlag bis ganz nach hinten ins gegnerische Feld. Damit gewinnst du Zeit. **Drop:** ein kurzer, weicher Schlag, der knapp hinter dem Netz herunterfällt. **Smash:** der Schmetterball – von oben, hart und steil nach unten. Gut, wenn der Ball hoch und nah am Netz ist.',
        '### Vorhand und Rückhand',
        'Auf der Seite deiner Schlaghand spielst du **Vorhand**, auf der anderen Seite **Rückhand**. Bei der Rückhand zeigt der Daumen am Griff nach oben, das gibt mehr Kraft.',
        '### Die Bereitschaftsstellung',
        'Zwischen den Schlägen gehst du zurück in die **Mitte** deines Feldes. Knie leicht gebeugt, Schläger vor dem Körper. So kommst du an jeden Ball.',
      ],
      woerter: [['der Schläger', 'la raquette'], ['der Federball', 'le volant'], ['der Griff', 'la prise'], ['locker', 'détendu'], ['der Schmetterball', 'le smash'], ['die Vorhand', 'le coup droit'], ['die Rückhand', 'le revers'], ['das Netz', 'le filet']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welcher Schlag ist das? Verbinde.', stufe: 1, links: ['hoch und weit bis nach hinten', 'kurz und weich, knapp hinter das Netz', 'von oben, hart und steil nach unten'], rechts: ['Clear', 'Drop', 'Smash'] },
      ],
    },
    hoeren: {
      was: 'Eine Trainer-Ansage', wo: 'Sporthalle · Badminton', titel: 'Zu zweit am Netz',
      situation: 'Frau Diallo erklärt eine Übung zu zweit. Hör gut zu, bevor ihr losspielt.',
      bild: ['lehrerin:froh:erklaeren', 'lio:aufgeregt:stehen-zeigen'], sprecher: { 'Frau Diallo': 'w1', Lio: 'm3' },
      text: [
        ['Frau Diallo', 'Jedes Paar hat einen Schläger pro Person und einen Federball. Prüft zuerst den Griff: Hand geben, locker halten.'],
        ['Frau Diallo', 'Erste Übung: Ihr spielt euch den Federball über das Netz zu, ganz ruhig und hoch. Ziel: zehnmal hin und her, ohne dass er auf den Boden fällt.'],
        ['Lio', 'Wir haben nur vier geschafft.'],
        ['Frau Diallo', 'Schlag nicht so fest, Lio. Lieber hoch als hart. Und nach jedem Schlag: zurück in die Mitte.'],
        ['Frau Diallo', 'Zweite Übung: Einer spielt einen hohen Clear nach hinten, der andere läuft zurück und spielt ihn wieder hoch. Fünfmal, dann wechseln.'],
        ['Frau Diallo', 'Dritte Übung: Drop. Ganz weich, knapp hinter das Netz. Der Partner läuft nach vorn.'],
        ['Lio', 'Jetzt hat es achtmal geklappt!'],
        ['Frau Diallo', 'Super. Nele, du spielst im Rollstuhl im vorderen Feld. Deine Partnerin spielt dir die Bälle so, dass du gut herankommst.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „hin und her“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['von einem zum anderen und zurück', 'nur in eine Richtung'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was ist die Aufgabe?', stufe: 1, kopf: ['Übung', 'Aufgabe'], breiten: [20, 80], zeilen: [['1', '[ruhig und hoch zuspielen, Ziel: 10-mal ohne Bodenkontakt]'], ['2', '[hoher Clear nach hinten, 5-mal, dann wechseln]'], ['3', '[Drop knapp hinter das Netz, Partner läuft nach vorn]']] },
        { art: 'fragen', auftrag: 'Welchen Tipp bekommt Lio?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'nicht so fest schlagen – lieber hoch als hart; nach jedem Schlag zurück in die Mitte' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie viele Ballwechsel habt ihr geschafft? Was hat geholfen?', stufe: 1, karten: [
        { titel: 'Satzanfänge', text: ['Wir haben … geschafft.', 'Geholfen hat …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Griff', punkte: ['wie **Hand geben**', '**locker** halten', 'Rückhand: Daumen **hoch**'] },
         { titel: 'Schläge', punkte: ['**Clear**: hoch und weit', '**Drop**: kurz hinter das Netz', '**Smash**: hart nach unten', 'danach zurück in die **Mitte**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mein Badminton-Protokoll: Wie viele Ballwechsel schafft ihr zu zweit?', stufe: 1, kopf: ['Übung', 'Versuch 1', 'Versuch 2', 'Versuch 3'], breiten: [40, 20, 20, 20], zeilen: [['ruhig hin und her', '', '', ''], ['Clear – Clear', '', '', ''], ['Drop – hoch zurück', '', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welcher Schlag gelingt dir schon? Welcher noch nicht? Warum?', stufe: 1,
        anfaenge: ['Gut gelingt mir …', 'Schwierig ist noch …', 'Ich übe …'], zeilen: 5,
        beispiel: 'Gut gelingt mir der Clear, weil ich den Federball schon hoch treffe. Schwierig ist noch der Drop, weil er oft zu weit fliegt. Ich übe, den Schläger beim Drop ganz weich zu halten.' },
    ],
    check: ['Ich halte den Schläger richtig.', 'Ich kenne Clear, Drop und Smash.', 'Ich gehe nach jedem Schlag in die Mitte.'],
  },
  // ================================================================ 2
  {
    thema: 'Badminton: Aufschlag, Feld und Regeln', titel: 'Einzel oder Doppel?', untertitel: 'Beim Badminton gibt es viele Linien – und nicht alle gelten immer. Du lernst das Feld, den Aufschlag und die Zählweise kennen.',
    ziel: { de: 'Ich kenne das Badmintonfeld, den Aufschlag und die Zählweise.', fr: 'Je connais le terrain de badminton, le service et le décompte des points.' },
    bild: ['chloe:froh:stehen', 'sami:verwirrt:stehen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Bis wie viele Punkte spielt man einen Satz im Badminton? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['21', '11', '15'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Badmintonregeln (vereinfacht, Stand 2026)', titel: 'Die wichtigsten Regeln',
      absaetze: [
        '**Zählweise:** Jeder Ballwechsel bringt einen Punkt – egal, wer aufgeschlagen hat. Ein Satz geht bis **21 Punkte**. Steht es 20 : 20, muss man mit **zwei Punkten** Vorsprung gewinnen – höchstens bis 30. Meistens spielt man zwei Gewinnsätze.',
        '**Aufschlag:** Man schlägt **diagonal** ins gegenüberliegende Feld. Der Federball wird **von unten** getroffen, unterhalb der Hüfte. Ist der eigene Punktestand gerade, zum Beispiel 0, 2 oder 4, schlägt man vom **rechten** Feld auf, bei ungerader Zahl vom **linken**.',
        '**Einzel und Doppel:** Beim **Einzel** ist das Feld **schmal und lang**: Die äußeren Seitenlinien zählen nicht. Beim **Doppel** ist es **breit**: Die äußeren Seitenlinien gelten. Beim Doppel-Aufschlag ist aber hinten schon die **hintere Aufschlaglinie** das Ende.',
        '**Fehler:** Der Federball landet im Aus, fällt auf die eigene Seite, geht unter dem Netz durch, oder ein Spieler berührt das Netz mit dem Schläger oder dem Körper.',
        'Der Ball auf der **Linie** ist **gut** – also im Feld.',
      ],
      woerter: [['der Aufschlag', 'le service'], ['diagonal', 'en diagonale'], ['der Satz', 'le set'], ['der Vorsprung', 'l’avance'], ['gerade (Zahl)', 'pair'], ['ungerade (Zahl)', 'impair'], ['das Einzel', 'le simple'], ['das Doppel', 'le double']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Jeder Ballwechsel bringt einen Punkt.', true], ['Beim Aufschlag trifft man den Federball von oben.', false], ['Bei 4 Punkten schlägt man vom rechten Feld auf.', true], ['Ein Ball auf der Linie ist im Aus.', false], ['Beim Einzel ist das Feld schmal und lang.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Sporthalle · erstes Spiel', titel: 'Wo stehe ich?',
      situation: 'Sami spielt sein erstes Einzel gegen Chloé. Er ist bei den Linien unsicher. Chloé erklärt.',
      bild: ['sami:verwirrt:stehen', 'chloe:froh:stehen'], sprecher: { Sami: 'm2', 'Chloé': 'w3' },
      text: [
        ['Sami', 'Wo muss ich hin zum Aufschlag? Es steht null zu null.'],
        ['Chloé', 'Null ist gerade. Also stellst du dich ins rechte Feld und schlägst diagonal in mein rechtes Feld.'],
        ['Sami', 'Okay. Und wie hoch darf ich den Ball treffen?'],
        ['Chloé', 'Unterhalb der Hüfte. Von unten nach oben.'],
        ['Sami', 'Punkt für mich! Eins zu null.'],
        ['Chloé', 'Jetzt hast du einen Punkt, das ist ungerade. Also schlägst du vom linken Feld auf.'],
        ['Sami', 'Dein Ball eben war ganz außen. War der drin oder im Aus?'],
        ['Chloé', 'Im Einzel zählt die innere Seitenlinie. Der Ball war zwischen den zwei Linien, also im Aus. Punkt für dich – zwei zu null.'],
        ['Sami', 'Puh, so viele Linien. Und im Doppel ist alles anders?'],
        ['Chloé', 'Fast. Im Doppel ist das Feld breiter. Das lernen wir nächste Woche.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „diagonal“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['schräg über Kreuz, von einer Ecke in die gegenüberliegende', 'gerade nach vorn'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Von welchem Feld schlägt Sami bei 0 : 0 auf? Warum?', zeilen: 2, l: 'vom rechten Feld, weil 0 eine gerade Zahl ist' }, { f: 'Wie trifft man beim Aufschlag den Ball?', l: 'unterhalb der Hüfte, von unten nach oben' }, { f: 'Von welchem Feld schlägt er bei 1 : 0 auf?', l: 'vom linken Feld' }, { f: 'Warum war der Ball im Aus?', zeilen: 2, l: 'Im Einzel zählt die innere Seitenlinie; der Ball war zwischen den beiden Linien.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt zu zweit ein kurzes Spiel bis 7 Punkte. Sagt vor jedem Aufschlag laut den Spielstand und das Aufschlagfeld.', stufe: 2, karten: [
        { titel: 'Ansagen', text: ['Drei zu zwei, ich schlage von links auf.', 'Punkt für dich.', 'Der war auf der Linie – gut!'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Zählen', punkte: ['jeder Ballwechsel = **1 Punkt**', 'Satz bis **21**', 'ab 20 : 20: **2 Punkte** Vorsprung', 'Linie = **gut**'] },
         { titel: 'Aufschlag und Feld', punkte: ['**diagonal**, von **unten**', 'gerade Punktzahl: **rechts**, ungerade: **links**', '**Einzel**: schmal und lang', '**Doppel**: breit'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Beschrifte das Badmintonfeld.', stufe: 2, html: '<div class="voll">' + spielfeld('badminton') + '</div>', liste: [['1', 'Netz'], ['2', 'vordere Aufschlaglinie'], ['3', 'Mittellinie'], ['4', 'Seitenlinie Einzel'], ['5', 'Seitenlinie Doppel'], ['6', 'hintere Aufschlaglinie Doppel']], spalten: 2 },
      { art: 'tabelle', auftrag: 'Von welchem Feld schlägst du auf? Kreuze an.', stufe: 2, kopf: ['dein Punktestand', 'rechts', 'links'], breiten: [50, 25, 25], zeilen: [['0', '[x]', ''], ['3', '', '[x]'], ['8', '[x]', ''], ['13', '', '[x]'], ['20', '[x]', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Erkläre einem Mitschüler, von wo man im Badminton aufschlägt und wie man zählt.', stufe: 2,
        anfaenge: ['Beim Aufschlag …', 'Wenn dein Punktestand gerade ist, …', 'Man spielt bis …'], zeilen: 5,
        beispiel: 'Beim Aufschlag schlägst du von unten und diagonal ins andere Feld. Wenn dein Punktestand gerade ist, stehst du rechts, sonst links. Man spielt bis 21, und bei 20 zu 20 braucht man zwei Punkte Vorsprung.' },
    ],
    check: ['Ich kenne die Linien im Einzel und im Doppel.', 'Ich weiß, von wo ich aufschlage.', 'Ich zähle richtig.'],
  },
  // ================================================================ 3
  {
    thema: 'Tischtennis: Platte, Aufschlag und Zählen', titel: 'Ping und Pong', untertitel: 'Tischtennis kann man fast überall spielen. Du lernst die Platte, den richtigen Aufschlag und wie man zählt – mit einem Spiel, bei dem es spannend wird.',
    ziel: { de: 'Ich kenne die Tischtennisregeln für Aufschlag und Zählen.', fr: 'Je connais les règles du service et du décompte au tennis de table.' },
    bild: ['tom:froh:stehen-zeigen', 'amira:aufgeregt:stehen'],
    start: {
      was: 'Schätze',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie schwer ist ein Tischtennisball ungefähr? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['knapp 3 Gramm', 'etwa 50 Gramm', 'etwa 300 Gramm'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Tischtennisregeln (vereinfacht, Stand 2026)', titel: 'Die wichtigsten Regeln',
      absaetze: [
        '**Die Platte** ist 2,74 Meter lang und in der Mitte durch ein **Netz** geteilt. Die weiße **Mittellinie** braucht man nur im Doppel.',
        '**Der Aufschlag:** Der Ball liegt ruhig auf der **flachen, offenen Hand**. Man wirft ihn **senkrecht** mindestens 16 Zentimeter hoch und schlägt ihn, wenn er wieder herunterfällt – **hinter** der Grundlinie. Der Ball muss zuerst auf der **eigenen** Seite aufspringen und dann über das Netz auf die andere Seite.',
        'Berührt der Ball beim Aufschlag das Netz und springt trotzdem richtig auf, wird der Aufschlag **wiederholt**.',
        '**Zählen:** Jeder Ballwechsel bringt einen Punkt. Ein Satz geht bis **11 Punkte**. Nach **zwei** Punkten wechselt der Aufschlag. Steht es **10 : 10**, wechselt der Aufschlag nach **jedem** Punkt, und man braucht **zwei Punkte** Vorsprung.',
        'Im Spiel darf der Ball auf jeder Seite nur **einmal** aufspringen. Man darf ihn nicht direkt aus der Luft schlagen, bevor er auf der eigenen Seite aufgesprungen ist.',
      ],
      woerter: [['die Platte', 'la table'], ['das Netz', 'le filet'], ['die Grundlinie', 'la ligne de fond'], ['senkrecht', 'verticalement'], ['aufspringen', 'rebondir'], ['wiederholen', 'rejouer'], ['der Ballwechsel', 'l’échange'], ['wechseln', 'changer']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte die Tischtennisplatte.', stufe: 1, html: '<div class="voll">' + tischtennis() + '</div>', liste: [['1', 'Netz'], ['2', 'Mittellinie (nur im Doppel)'], ['3', 'Grundlinie'], ['4', 'Seitenlinie']], spalten: 2 },
      ],
    },
    hoeren: {
      was: 'Ein Spiel', wo: 'Pausenhalle · Tischtennisplatte', titel: 'Zehn zu zehn',
      situation: 'Tom und Amira spielen. Es wird spannend. Achte auf den Spielstand und wer aufschlägt.',
      bild: ['tom:froh:stehen-zeigen', 'amira:aufgeregt:stehen'], sprecher: { Tom: 'm3', Amira: 'w2' },
      text: [
        ['Tom', 'Neun zu zehn. Du führst. Ich habe Aufschlag.'],
        ['Amira', 'Achtung, Tom, du hast den Ball nicht hochgeworfen. Der muss senkrecht von der flachen Hand nach oben. Eigentlich wäre das ein Punkt für mich – aber du darfst noch mal.'],
        ['Tom', 'Danke, das ist fair. … Punkt für mich! Zehn zu zehn.'],
        ['Amira', 'Jetzt wird es spannend. Ab zehn zu zehn wechselt der Aufschlag nach jedem Punkt. Ich bin dran.'],
        ['Amira', 'Oh, Netz! Aber er ist richtig drüben aufgesprungen.'],
        ['Tom', 'Beim Aufschlag heißt das: Wiederholung.'],
        ['Amira', 'Gut. … Punkt für mich. Elf zu zehn.'],
        ['Tom', 'Aber du hast noch nicht gewonnen. Du brauchst zwei Punkte Vorsprung. Mein Aufschlag. … Elf zu elf!'],
        ['Amira', 'Puh! Mein Aufschlag. … Zwölf zu elf. … Und jetzt du, Tom.'],
        ['Tom', 'Daneben. Dreizehn zu elf. Glückwunsch, Amira – das war ein gutes Spiel!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „Glückwunsch“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man freut sich mit jemandem über einen Erfolg.', 'Man ist wütend.'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Welchen Fehler macht Tom beim Aufschlag? Wie reagiert Amira?', zeilen: 2, l: 'Er wirft den Ball nicht hoch. Amira lässt ihn den Aufschlag wiederholen, obwohl es eigentlich ein Punkt für sie wäre.' }, { f: 'Was passiert ab 10 : 10 mit dem Aufschlag?', l: 'Er wechselt nach jedem Punkt.' }, { f: 'Warum wird Amiras Aufschlag wiederholt?', zeilen: 2, l: 'Der Ball hat das Netz berührt, ist aber richtig aufgesprungen.' }, { f: 'Wie endet das Spiel?', l: '13 : 11 für Amira' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Tom gratuliert Amira, obwohl er verloren hat. Was findet ihr daran gut? Wie schwer ist das?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde gut, dass …', 'Schwer ist es, wenn …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Aufschlag', nummern: true, punkte: ['Ball auf der **flachen Hand**', 'mind. **16 cm** senkrecht hochwerfen', '**hinter** der Grundlinie schlagen', 'erst **eigene**, dann andere Seite', 'Netz berührt, aber richtig: **wiederholen**'] },
         { titel: 'Zählen', punkte: ['Satz bis **11**', 'Aufschlag wechselt nach **2** Punkten', 'ab **10 : 10**: nach jedem Punkt', '**2 Punkte** Vorsprung'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Wer hat Aufschlag? Tom beginnt. Trage ein: T (Tom) oder A (Amira).', stufe: 3, kopf: ['Spielstand vor dem Punkt', 'Aufschlag'], breiten: [60, 40], zeilen: [['0 : 0', '[T]'], ['1 : 0', '[T]'], ['1 : 1', '[A]'], ['2 : 1', '[A]'], ['2 : 2', '[T]'], ['10 : 10', '[T]'], ['11 : 10', '[A]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Beschreibe ein spannendes Spiel (Tischtennis oder ein anderes Spiel). Wie hast du dich gefühlt?', stufe: 2,
        anfaenge: ['Es stand …', 'Dann …', 'Am Ende …', 'Ich habe mich … gefühlt.'], zeilen: 5,
        beispiel: 'Es stand 10 zu 10, und ich war richtig nervös. Dann habe ich einen Aufschlag ins Netz gespielt. Am Ende habe ich 12 zu 10 gewonnen. Ich habe mich stolz gefühlt, weil ich ruhig geblieben bin.' },
    ],
    check: ['Ich kenne die Teile der Platte.', 'Ich mache einen regelgerechten Aufschlag.', 'Ich zähle und weiß, wer aufschlägt.'],
  },
  // ================================================================ 4
  {
    thema: 'Taktik in Rückschlagspielen', titel: 'Clever spielen', untertitel: 'Nicht nur der Stärkste gewinnt, sondern oft der Klügste. Du lernst einfache Taktik-Regeln, hörst ein Coaching während eines Spiels und probierst sie aus.',
    ziel: { de: 'Ich wende einfache Taktik in Badminton und Tischtennis an.', fr: 'J’applique une tactique simple au badminton et au tennis de table.' },
    bild: ['yusuf:nervoes:stehen', 'lina:froh:erklaeren'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wohin spielst du den Ball, wenn dein Gegner ganz vorn am Netz steht? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['nach hinten, weit weg von ihm', 'direkt zu ihm', 'ins Netz'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sportwissen', titel: 'Fünf Taktik-Regeln',
      absaetze: [
        '**Spiel in die freie Ecke.** Schau, wo dein Gegner steht, und spiel den Ball dorthin, wo er **nicht** ist.',
        '**Lass den Gegner laufen.** Wechsle ab: einmal vorn, einmal hinten, einmal links, einmal rechts. So wird er müde und macht Fehler.',
        '**Zurück in die Mitte.** Nach jedem Schlag gehst du zurück in deine **Grundposition**. Von dort erreichst du jeden Ball.',
        '**Sicher statt riskant.** Wenn du in Not bist, spiel lieber einen sicheren, hohen Ball. Den harten Schlag hebst du dir für leichte Bälle auf.',
        '**Ruhig bleiben.** Nach einem Fehler kurz durchatmen und an den nächsten Punkt denken. Wer sich ärgert, macht oft gleich den nächsten Fehler.',
      ],
      woerter: [['die Taktik', 'la tactique'], ['die Ecke', 'le coin'], ['abwechseln', 'alterner'], ['die Grundposition', 'la position de base'], ['riskant', 'risqué'], ['in Not sein', 'être en difficulté'], ['durchatmen', 'respirer profondément'], ['sich ärgern', 's’énerver']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welche Taktik-Regel passt? Verbinde.', stufe: 2, links: ['Der Gegner steht links. Du spielst nach rechts.', 'Du spielst einmal kurz, dann lang, dann kurz.', 'Nach dem Schlag läufst du sofort zur Mitte.', 'Du hast einen Fehler gemacht und atmest tief durch.'], rechts: ['in die freie Ecke spielen', 'den Gegner laufen lassen', 'zurück in die Grundposition', 'ruhig bleiben'] },
      ],
    },
    hoeren: {
      was: 'Ein Coaching', wo: 'Sporthalle · Pause im Badminton-Spiel', titel: 'Satzpause',
      situation: 'Yusuf liegt im Badminton-Spiel hinten. In der Satzpause gibt ihm Lina als Coach Tipps.',
      bild: ['yusuf:nervoes:stehen', 'lina:froh:erklaeren'], sprecher: { Lina: 'w3', Yusuf: 'm3' },
      text: [
        ['Yusuf', 'Ich verliere nur. Sie ist einfach besser.'],
        ['Lina', 'Warte. Ich habe zugeschaut. Fällt dir etwas auf? Wo steht sie die ganze Zeit?'],
        ['Yusuf', 'Hm … ziemlich weit hinten.'],
        ['Lina', 'Genau. Und du spielst fast immer hohe Bälle nach hinten. Direkt zu ihr.'],
        ['Yusuf', 'Weil die am sichersten sind.'],
        ['Lina', 'Versuch mal kurze Drops, knapp hinter das Netz. Dann muss sie nach vorn rennen. Und danach wieder einen hohen Ball nach hinten.'],
        ['Yusuf', 'Sie laufen lassen.'],
        ['Lina', 'Und noch etwas: Nach jedem Schlag bleibst du stehen und schaust dem Ball nach. Geh sofort zurück in die Mitte.'],
        ['Yusuf', 'Okay. Drops, laufen lassen, zurück in die Mitte.'],
        ['Lina', 'Und atme durch, wenn ein Punkt danebengeht. Los, du schaffst das!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht ein Coach? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Er oder sie beobachtet und gibt Tipps.', 'Er oder sie spielt für einen.'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wo steht Yusufs Gegnerin meistens?', l: 'weit hinten' }, { f: 'Welchen Fehler macht Yusuf beim Spielen?', zeilen: 2, l: 'Er spielt fast immer hohe Bälle nach hinten, direkt zu ihr.' }, { f: 'Welche drei Tipps gibt Lina?', zeilen: 3, l: 'kurze Drops spielen und sie laufen lassen; nach jedem Schlag zurück in die Mitte; durchatmen nach einem Fehler' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Seid zu zweit Coach und Spieler. Der Coach beobachtet einen Satz und gibt in der Pause zwei Tipps.', stufe: 3, karten: [
        { titel: 'Coach', text: ['Mir ist aufgefallen, dass …', 'Versuch mal …', 'Du schaffst das!'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Taktik', nummern: true, punkte: ['in die **freie Ecke**', 'Gegner **laufen lassen**', 'zurück in die **Mitte**', '**sicher** statt riskant', '**ruhig** bleiben'] },
         { titel: 'Coaching', punkte: ['**beobachten**: Wo steht der Gegner?', 'höchstens **zwei** Tipps', '**positiv** formulieren', '**Mut** machen'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Taktik-Tafel: Mal ein Kreuz, wo dein Gegner steht. Zeichne dann mit Pfeilen drei Bälle, die ihn laufen lassen.', stufe: 3, html: '<div class="voll">' + spielfeld('badminton', { nummern: false }) + '</div>', liste: [['Meine Taktik in einem Satz:', 'Individuell']], spalten: 1 },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welche Taktik-Regel hast du ausprobiert? Hat sie funktioniert?', stufe: 2,
        anfaenge: ['Ich habe ausprobiert, …', 'Es hat funktioniert / nicht funktioniert, weil …', 'Nächstes Mal …'], zeilen: 5,
        beispiel: 'Ich habe ausprobiert, meinen Gegner laufen zu lassen: einmal kurz, einmal lang. Es hat funktioniert, weil er nach ein paar Ballwechseln müde wurde und Fehler gemacht hat. Nächstes Mal achte ich mehr darauf, selbst in die Mitte zurückzugehen.' },
    ],
    check: ['Ich kenne fünf Taktik-Regeln.', 'Ich spiele in die freie Ecke.', 'Ich bleibe nach Fehlern ruhig.'],
  },
  // ================================================================ 5
  {
    thema: 'Rundlauf und Turnierformen', titel: 'Jeder gegen jeden', untertitel: 'Es gibt viele Arten, ein Turnier zu spielen. Du lernst den Rundlauf beim Tischtennis, das Kaiserspiel und „Jeder gegen jeden“ kennen – und rechnest aus, wie viele Spiele das gibt.',
    ziel: { de: 'Ich kenne Turnierformen und erstelle einen Spielplan.', fr: 'Je connais des formules de tournoi et j’établis un calendrier des matchs.' },
    bild: ['noah:froh:gehen', 'mia:froh:stehen-zeigen'],
    start: {
      was: 'Rate mal!',
      aufgaben: [
        { art: 'mc', auftrag: 'Vier Personen spielen „jeder gegen jeden“. Wie viele Spiele gibt es? Kreuze an.', stufe: 2, fragen: [{ f: '', o: ['6', '4', '16'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Spielregeln', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Spielesammlung', titel: 'Drei Turnierformen',
      absaetze: [
        '### Rundlauf',
        'Alle stellen sich in zwei Gruppen an die beiden Enden der Tischtennisplatte. Wer den Ball geschlagen hat, läuft **um die Platte** auf die andere Seite und stellt sich hinten an. Wer einen Fehler macht, verliert ein **Leben**. Nach drei Fehlern ist man draußen – oder macht eine Zusatzaufgabe und darf wieder mitspielen.',
        '### Das Kaiserspiel',
        'Es gibt mehrere Platten oder Felder, von „Kaiser“ bis zum letzten Feld. Man spielt kurze Spiele, zum Beispiel **drei Minuten**. Wer gewinnt, geht **ein Feld nach oben**, wer verliert, ein Feld nach unten. So spielen bald alle gegen Gleichstarke.',
        '### Jeder gegen jeden',
        'Jeder spielt einmal gegen jeden anderen. Für einen Sieg gibt es **zwei Punkte**, für ein Unentschieden einen. Die Ergebnisse trägt man in eine **Tabelle** ein. Bei **vier** Personen gibt es **sechs** Spiele, bei **fünf** schon **zehn**.',
        'Bei allen Formen gilt: **ehrlich zählen**, Ergebnisse gleich aufschreiben, und nach dem Spiel die Hand geben.',
      ],
      woerter: [['das Turnier', 'le tournoi'], ['der Rundlauf', 'la ronde (ping-pong)'], ['das Leben (im Spiel)', 'la vie (au jeu)'], ['der Kaiser', 'l’empereur'], ['gleichstark', 'de même niveau'], ['der Sieg', 'la victoire'], ['das Unentschieden', 'le match nul'], ['die Tabelle', 'le tableau']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welche Turnierform ist das? Verbinde.', stufe: 1, links: ['Alle laufen um die Platte.', 'Gewinner gehen ein Feld nach oben.', 'Jeder spielt einmal gegen jeden.'], rechts: ['Rundlauf', 'Kaiserspiel', 'Jeder gegen jeden'] },
      ],
    },
    hoeren: {
      was: 'Eine Turnier-Ansage', wo: 'Sporthalle · Turnierleitung', titel: 'Das Kaiserturnier',
      situation: 'Noah und Mia leiten heute das Kaiserturnier im Tischtennis. Sie erklären der Klasse den Ablauf.',
      bild: ['noah:froh:gehen', 'mia:froh:stehen-zeigen'], sprecher: { Noah: 'm3', Mia: 'w3' },
      text: [
        ['Noah', 'Wir haben fünf Platten. Platte eins ist die Kaiserplatte, Platte fünf ist ganz unten.'],
        ['Mia', 'Jeder spielt drei Minuten. Wer nach drei Minuten mehr Punkte hat, gewinnt.'],
        ['Noah', 'Der Gewinner geht eine Platte nach oben, Richtung Kaiser. Der Verlierer geht eine Platte nach unten.'],
        ['Mia', 'Wer auf der Kaiserplatte gewinnt, bleibt dort. Wer auf Platte fünf verliert, bleibt auch dort.'],
        ['Noah', 'Ich pfeife den Start und das Ende. Bei unentschieden entscheidet der nächste Punkt.'],
        ['Mia', 'Und ganz wichtig: Ihr zählt selbst und ehrlich. Bei Streit holt ihr uns.'],
        ['Noah', 'Wer am Ende auf der Kaiserplatte steht, ist Kaiser oder Kaiserin des Tages.'],
        ['Mia', 'Achtung, alle an ihre Platten … und los!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht die Turnierleitung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie organisiert das Turnier und hilft bei Streit.', 'Sie spielt alle Spiele.'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Es gibt fünf Platten.', true], ['Ein Spiel dauert fünf Minuten.', false], ['Der Gewinner geht eine Platte nach oben.', true], ['Bei unentschieden entscheidet der nächste Punkt.', true], ['Die Turnierleitung zählt alle Punkte.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Turnierform findet ihr am fairsten? Warum?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Am fairsten finde ich …', 'weil …', 'Ein Nachteil ist …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Turnierformen', punkte: ['**Rundlauf**: um die Platte, Leben', '**Kaiserspiel**: Gewinner nach oben', '**Jeder gegen jeden**: Tabelle'] },
         { titel: 'Spiele zählen', punkte: ['4 Personen: **6** Spiele', '5 Personen: **10** Spiele', 'Sieg **2** Punkte, Unentschieden **1**', '**ehrlich** zählen'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Turnierplan „Jeder gegen jeden“: Trage alle Spiele für vier Personen (A, B, C, D) ein. Die Reihenfolge ist egal.', stufe: 2, kopf: ['Spiel', 'gegen', 'Ergebnis'], breiten: [20, 50, 30], zeilen: [['1', '[A – B]', ''], ['2', '[C – D]', ''], ['3', '[A – C]', ''], ['4', '[B – D]', ''], ['5', '[A – D]', ''], ['6', '[B – C]', '']] },
      { art: 'rechnen', auftrag: 'Rechne die Anzahl der Spiele aus. Tipp: Jeder spielt gegen alle anderen, jedes Spiel zählt nur einmal.', stufe: 3, spalten: 2, items: [{ a: '3 Personen', l: '3 Spiele' }, { a: '5 Personen', l: '10 Spiele' }, { a: '6 Personen', l: '15 Spiele (6 × 5 ÷ 2)' }, { a: 'Ein Spiel dauert 5 Minuten. Wie lange dauern 15 Spiele an einer Platte?', l: '75 Minuten' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie lief das Turnier für dich? Was war dir wichtiger – gewinnen oder gut spielen?', stufe: 2,
        anfaenge: ['Im Turnier …', 'Mir war wichtiger, …', 'Fair fand ich, dass …'], zeilen: 5,
        beispiel: 'Im Turnier bin ich von Platte drei bis auf Platte eins gekommen und dann wieder runter. Mir war wichtiger, gut zu spielen, als Kaiser zu werden. Fair fand ich, dass alle ehrlich gezählt haben.' },
    ],
    check: ['Ich kenne drei Turnierformen.', 'Ich erstelle einen Turnierplan.', 'Ich zähle ehrlich.'],
  },
  // ================================================================ 6
  {
    thema: 'Projekt: Ein Mini-Turnier für alle', titel: 'Unser Turnier – alle spielen mit', untertitel: 'Zum Schluss organisiert ihr ein Mini-Turnier, bei dem alle mitspielen können. Du lernst Para-Badminton und Para-Tischtennis kennen und überlegt, wie man Regeln anpasst.',
    ziel: { de: 'Ich organisiere mit anderen ein Turnier, bei dem alle mitspielen können.', fr: 'J’organise avec d’autres un tournoi auquel tout le monde peut participer.' },
    bild: ['nele:froh:rollstuhl', 'lio:froh:stehen-zeigen'],
    start: {
      was: 'Was weißt du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Gibt es Badminton und Tischtennis bei den Paralympics? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ja, beides', 'nur Tischtennis', 'nein'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sportwissen (Stand 2026)', titel: 'Para-Badminton und Para-Tischtennis',
      absaetze: [
        'Bei den **Paralympics** treten Sportlerinnen und Sportler mit Behinderungen an. **Tischtennis** ist dort schon lange dabei, **Badminton** seit den Spielen von Tokio 2021.',
        'Beim **Para-Badminton** im Rollstuhl ist das Feld **kleiner**: Man spielt im Einzel nur auf einer **Hälfte** der Breite, und der vordere Teil am Netz zählt nicht. Bei manchen Klassen spielen Menschen stehend, zum Beispiel mit einer Prothese.',
        'Beim **Para-Tischtennis** im Rollstuhl gelten fast die gleichen Regeln. Eine Besonderheit: Beim Aufschlag muss der Ball über die **Grundlinie** der anderen Seite gehen, nicht über die Seitenlinie.',
        'Für ein Schulturnier kann man **eigene Regeln** erfinden: zum Beispiel ein kleineres Feld, mehr Zeit, einen größeren Ball oder ein Team aus zwei Personen. Wichtig ist, dass das Spiel für **alle spannend** bleibt.',
      ],
      woerter: [['die Paralympics', 'les Jeux paralympiques'], ['die Behinderung', 'le handicap'], ['der Rollstuhl', 'le fauteuil roulant'], ['die Prothese', 'la prothèse'], ['die Besonderheit', 'la particularité'], ['anpassen', 'adapter'], ['spannend', 'passionnant'], ['die Klasse (im Sport)', 'la catégorie']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte mit dem Text.', stufe: 1, fragen: [{ f: 'Seit wann ist Badminton bei den Paralympics?', l: 'seit 2021' }, { f: 'Wie ist das Feld beim Para-Badminton im Rollstuhl?', zeilen: 2, l: 'kleiner: im Einzel nur eine Hälfte der Breite, der vordere Teil am Netz zählt nicht' }, { f: 'Nenne zwei Ideen, wie man Regeln für ein Schulturnier anpassen kann.', zeilen: 2, l: 'z. B. kleineres Feld, mehr Zeit, größerer Ball, Team aus zwei Personen' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klasse · Turnierplanung', titel: 'Wie spielen alle mit?',
      situation: 'Die Klasse plant ein Badminton-Turnier. Nele und Lio sind im Organisationsteam.',
      bild: ['nele:froh:rollstuhl', 'lio:froh:stehen-zeigen'], sprecher: { Lio: 'm3', Nele: 'w3' },
      text: [
        ['Lio', 'Wir machen ein Doppel-Turnier. Jedes Team hat zwei Personen. Was brauchen wir?'],
        ['Nele', 'Erst mal Regeln, damit ich mitspielen kann. Im Rollstuhl komme ich schlecht an Bälle ganz vorn am Netz.'],
        ['Lio', 'Wie beim Para-Badminton? Der vordere Teil zählt in deiner Hälfte nicht?'],
        ['Nele', 'Genau. Und mein Partner deckt vorn ab. Dann ist es für alle fair.'],
        ['Lio', 'Gut. Wie viele Teams haben wir?'],
        ['Nele', 'Zwölf Leute, also sechs Teams. Bei jeder gegen jeden wären das fünfzehn Spiele. Zu viele für eine Doppelstunde.'],
        ['Lio', 'Dann machen wir zwei Gruppen mit je drei Teams. Das sind drei Spiele pro Gruppe. Danach spielen die Gruppensieger das Finale.'],
        ['Nele', 'Super. Und wir brauchen Schiedsrichter, eine Ergebnistafel und jemanden, der die Zeit nimmt.'],
        ['Lio', 'Die Teams, die gerade nicht spielen, übernehmen das. Ich mache die Tabelle.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Finale? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['das letzte, entscheidende Spiel', 'das erste Spiel'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und fülle den Turnier-Plan aus.', stufe: 1, kopf: ['', 'Unser Turnier'], breiten: [34, 66], zeilen: [['Spielform', '[Doppel, Teams aus 2 Personen]'], ['Anzahl Teams', '[6]'], ['Ablauf', '[2 Gruppen mit je 3 Teams, dann Finale der Gruppensieger]'], ['Regel für Nele', '[vorderer Teil am Netz zählt in ihrer Hälfte nicht, Partner deckt vorn ab]'], ['Aufgaben', '[Schiedsrichter, Ergebnistafel, Zeitnehmer – von den Teams, die gerade nicht spielen]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Regeln würdet ihr anpassen, damit in eurer Klasse wirklich alle mitspielen können?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Damit alle mitspielen können, …', 'Fair wäre, wenn …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Para-Sport', punkte: ['Tischtennis und Badminton bei den **Paralympics**', 'Rollstuhl-Badminton: **kleineres Feld**', 'Regeln **anpassen** ist erlaubt'] },
         { titel: 'Turnier planen', nummern: true, punkte: ['**Spielform** wählen', '**Regeln** für alle', '**Spielplan** und Zeit', '**Aufgaben** verteilen', '**Ergebnisse** aufschreiben'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Turnier-Aufgabenkarten: Jede Person zieht eine Karte für das Turnier. Wechselt nach jeder Runde.', stufe: 2, neueSeite: true, titel: 'Turnier', icon: 'trophy', farbe: TURNIER, spalten: 2,
        karten: [
          { text: '**Schiedsrichter/in**\nZählt laut, entscheidet bei Linienbällen, bleibt fair.' }, { text: '**Zeitnehmer/in**\nStartet und stoppt die Spielzeit, ruft „noch eine Minute!“.' },
          { text: '**Ergebnistafel**\nTrägt alle Ergebnisse sofort in die Tabelle ein.' }, { text: '**Material**\nSorgt für Schläger und Bälle, sammelt am Ende alles ein.' },
          { text: '**Ansage**\nRuft die nächsten Spiele auf: „Team 3 gegen Team 5 an Feld 2!“' }, { text: '**Fair-Play-Beobachter/in**\nAchtet auf faires Verhalten und wählt am Ende das fairste Team.' },
        ] },
      { art: 'tabelle', auftrag: 'Ergebnistafel Gruppe A: Tragt die Ergebnisse ein (Sieg = 2 Punkte).', stufe: 1, kopf: ['Team', 'gegen Team 1', 'gegen Team 2', 'gegen Team 3', 'Punkte'], breiten: [20, 20, 20, 20, 20], zeilen: [['Team 1', '–', '', '', ''], ['Team 2', '', '–', '', ''], ['Team 3', '', '', '–', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie lief unser Turnier? Welche Aufgabe hattest du? Konnten wirklich alle mitspielen?', stufe: 2,
        anfaenge: ['Unser Turnier …', 'Meine Aufgabe war …', 'Alle konnten mitspielen, weil …', 'Verbessern würde ich …'], zeilen: 6,
        beispiel: 'Unser Turnier hat allen Spaß gemacht, auch wenn es etwas zu lange gedauert hat. Meine Aufgabe war die Ergebnistafel. Alle konnten mitspielen, weil wir die Regeln für das Feld angepasst haben. Verbessern würde ich, dass die Spiele nur vier statt fünf Minuten dauern.' },
    ],
    check: ['Ich kenne Para-Badminton und Para-Tischtennis.', 'Ich passe Regeln so an, dass alle mitspielen.', 'Ich übernehme eine Aufgabe im Turnier.'],
  },
]

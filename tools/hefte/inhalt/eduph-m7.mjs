// Sport · Modul 7 (5P) „Leichtathletik“ – Schwerpunkt „Agir“ (Programm EDUPH VP, Kap. VI: M1/M4/M7) – Éducation physique et sportive, Voie de préparation.
// Sprint (Laufbahn beschriften, Start, Technik, Geschwindigkeit rechnen), Staffel (Übergabe, Teamplan, Zeiten addieren),
// Weitsprung (vier Phasen als Bildfolge, Messen), Werfen und Stoßen (Technik, Sicherheit, Durchschnitt),
// Projekt Sportfest für alle (Para-Leichtathletik, Weitrollen, Dreikampf-Pass). Stand 2026.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { laufbahn, weitsprung } from './praxis-bilder.mjs'

export const MODUL = sachModul('eduph', 7, {
  titel: 'Leichtathletik',
  titelFr: 'Athlétisme',
  unter: 'Sprinten, Staffel laufen, weit springen und sicher werfen – Leistungen messen, ausrechnen und verbessern. Zum Schluss organisiert ihr ein Sportfest, bei dem alle mitmachen.',
  unterFr: 'Sprint, relais, saut en longueur, lancers, mesure des performances et fête sportive pour tous.',
  farbe: '#c8553d',
  deckbild: ['amira:aufgeregt:gehen', 'nele:froh:rollstuhl', 'ben:froh:stehen-zeigen'],
  blasen: [{ t: 'Auf die Plätze!', x: 8, y: 104 }, { t: 'Hopp!', x: 140, y: 92 }, { t: 'Bestleistung!', x: 176, y: 150 }],
  aussprache: { '\\bGuide\\b': 'Gaid' },
  themen: [
    { titel: { de: 'Laufen', fr: 'Courir' }, icon: 'run', lektionen: 2 },
    { titel: { de: 'Springen und Werfen', fr: 'Sauter et lancer' }, icon: 'ruler-measure', lektionen: 2 },
    { titel: { de: 'Sportfest', fr: 'Fête sportive' }, icon: 'trophy', lektionen: 1 },
  ],
})

const FEST = '#c8553d'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Sprint', titel: 'Auf die Plätze!', untertitel: 'Sprinten heißt: so schnell wie möglich laufen, aber nur kurz. Du lernst die Laufbahn, den Start und die richtige Technik kennen – und rechnest aus, wie schnell du bist.',
    ziel: { de: 'Ich starte richtig, sprinte mit guter Technik und messe meine Zeit.', fr: 'Je prends un bon départ, je sprinte avec une bonne technique et je mesure mon temps.' },
    bild: ['amira:aufgeregt:gehen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Was weißt du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie lang ist eine Runde auf der Laufbahn im Stadion? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['400 Meter', '100 Meter', '1000 Meter'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Leichtathletik (Stand 2026)', titel: 'Schnell wie der Wind',
      absaetze: [
        '### Die Laufbahn',
        'Eine Runde auf der **Laufbahn** ist **400 Meter** lang, gemessen auf der innersten Bahn. Gelaufen wird **gegen den Uhrzeigersinn**. Beim Sprint bleibt jede Person in ihrer eigenen **Bahn**. Den 100-Meter-Lauf läuft man auf der **Geraden**, ohne Kurve. Im **Innenraum** finden Sprung- und Wurfwettbewerbe statt.',
        '### Der Start',
        'Die Kommandos heißen: **„Auf die Plätze!“** – **„Fertig!“** – dann kommt der **Startschuss**. Profis starten aus dem **Tiefstart** mit Startblöcken. In der Schule nutzt man oft den **Hochstart**: ein Bein vorn, der Oberkörper nach vorn geneigt. Wer zu früh losläuft, macht einen **Fehlstart**.',
        '### Die Technik',
        'Lauf auf den **Fußballen**, nicht auf den Fersen. Die **Arme** schwingen eng am Körper vor und zurück, die Hände sind locker. Der Blick geht nach **vorn**. Lauf **durch** die Ziellinie hindurch und bremse erst danach.',
        '### Wie schnell bin ich?',
        'Die Geschwindigkeit rechnet man so: **Strecke geteilt durch Zeit**. Wer 100 Meter in 20 Sekunden läuft, schafft **5 Meter pro Sekunde**. Die schnellsten Menschen der Welt schaffen über 10 Meter pro Sekunde.',
      ],
      woerter: [['die Laufbahn', 'la piste'], ['die Bahn', 'le couloir'], ['die Gerade', 'la ligne droite'], ['der Startschuss', 'le signal de départ'], ['der Fehlstart', 'le faux départ'], ['der Fußballen', 'l’avant-pied'], ['die Ziellinie', 'la ligne d’arrivée'], ['die Geschwindigkeit', 'la vitesse']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Beschrifte die Laufbahn.', stufe: 1, html: '<div class="voll">' + laufbahn() + '</div>', liste: [['1', 'Startlinie 100 Meter'], ['2', 'Ziellinie'], ['3', 'Kurve'], ['4', 'Gerade'], ['5', 'Bahn'], ['6', 'Innenraum']], spalten: 3 },
      ],
    },
    hoeren: {
      was: 'Eine Trainer-Ansage', wo: 'Sportplatz · Sprinttraining', titel: 'Startsignal',
      situation: 'Frau Diallo erklärt das Sprinttraining. Danach misst sie die Zeiten von Amira und Sami.',
      bild: ['lehrerin:froh:erklaeren', 'sami:froh:stehen'], sprecher: { 'Frau Diallo': 'w1', Amira: 'w2', Sami: 'm2' },
      text: [
        ['Frau Diallo', 'Heute laufen wir 60 Meter. Jede Person bleibt in ihrer Bahn. Wir starten aus dem Hochstart.'],
        ['Frau Diallo', 'Bei „Auf die Plätze!“ stellt ihr euch an die Linie, ein Fuß vorn. Bei „Fertig!“ beugt ihr euch nach vorn und seid ganz still. Dann klatsche ich, und ihr lauft los.'],
        ['Sami', 'Und wenn jemand zu früh losläuft?'],
        ['Frau Diallo', 'Dann ist das ein Fehlstart, und alle starten noch einmal.'],
        ['Frau Diallo', 'Achtet auf die Arme: vor und zurück, nicht quer vor dem Körper. Und lauft durch das Ziel, nicht davor bremsen!'],
        ['Frau Diallo', 'Erster Lauf … Amira: 9 Komma 8 Sekunden. Sami: 10 Komma 4 Sekunden.'],
        ['Amira', 'Beim zweiten Mal will ich unter 9 Komma 5 bleiben.'],
        ['Frau Diallo', 'Gutes Ziel. Vergleicht euch vor allem mit euch selbst. Wer sich verbessert, hat gewonnen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Fehlstart? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man läuft zu früh los.', 'Man stolpert im Ziel.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und trage ein.', stufe: 1, kopf: ['', 'Angabe'], breiten: [40, 60], zeilen: [['Strecke', '[60 Meter]'], ['Startart', '[Hochstart]'], ['Startsignal', '[Klatschen]'], ['Zeit von Amira', '[9,8 Sekunden]'], ['Zeit von Sami', '[10,4 Sekunden]'], ['Amiras Ziel', '[unter 9,5 Sekunden]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Frau Diallo sagt: „Vergleicht euch vor allem mit euch selbst.“ Was meint sie? Findet ihr das richtig?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Sie meint, dass …', 'Ich finde das richtig, weil …', 'Aber …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Start', nummern: true, punkte: ['„**Auf die Plätze!**“', '„**Fertig!**“', '**Startsignal**: los!', 'zu früh = **Fehlstart**'] },
         { titel: 'Technik', punkte: ['auf den **Fußballen**', 'Arme **vor und zurück**', 'Blick nach **vorn**', '**durch** das Ziel laufen'] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Wie schnell? Rechne die Meter pro Sekunde aus.', stufe: 2, spalten: 2, items: [{ a: '100 Meter in 20 Sekunden', l: '5 Meter pro Sekunde' }, { a: '60 Meter in 10 Sekunden', l: '6 Meter pro Sekunde' }, { a: '50 Meter in 8 Sekunden', l: '6,25 Meter pro Sekunde' }, { a: 'Weltklasse: 100 Meter in knapp 10 Sekunden. Wie viele Meter pro Sekunde sind das ungefähr?', l: 'ungefähr 10 Meter pro Sekunde' }] },
      { art: 'tabelle', auftrag: 'Mein Sprint-Protokoll', stufe: 1, kopf: ['Lauf', 'Strecke', 'Zeit', 'Besser als vorher?'], breiten: [16, 24, 24, 36], zeilen: [['1', '', '', ''], ['2', '', '', ''], ['3', '', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie lief dein Sprint? Was willst du beim nächsten Mal verbessern?', stufe: 1,
        anfaenge: ['Mein Sprint …', 'Gut war …', 'Nächstes Mal achte ich auf …'], zeilen: 5,
        beispiel: 'Mein Sprint war schneller als letzte Woche. Gut war mein Start, weil ich ganz still gewartet habe. Nächstes Mal achte ich auf die Arme, weil sie noch quer vor dem Körper schwingen.' },
    ],
    check: ['Ich kenne die Laufbahn.', 'Ich starte richtig aus dem Hochstart.', 'Ich rechne aus, wie schnell ich bin.'],
  },
  // ================================================================ 2
  {
    thema: 'Staffellauf', titel: 'Stab weiter!', untertitel: 'Beim Staffellauf zählt das Team. Du lernst, wie man den Stab sicher übergibt, hörst eine Teambesprechung und rechnest Staffelzeiten aus.',
    ziel: { de: 'Ich übergebe den Staffelstab sicher in der Wechselzone.', fr: 'Je transmets le témoin de façon sûre dans la zone de transmission.' },
    bild: ['tom:froh:stehen-zeigen', 'mia:froh:gehen'],
    start: {
      was: 'Rate mal!',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie viele Personen laufen meistens in einer Staffel? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['4', '2', '10'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Leichtathletik (Stand 2026)', titel: 'Die Übergabe',
      absaetze: [
        'Bei der **Staffel** laufen meistens **vier** Personen nacheinander. Sie tragen einen **Staffelstab** und geben ihn weiter. Gewonnen hat das Team, dessen letzte Person zuerst im Ziel ist.',
        'Der Stab muss in der **Wechselzone** übergeben werden. Sie ist auf der Bahn markiert. Wird der Stab außerhalb übergeben, ist das Team **disqualifiziert**.',
        '**So klappt die Übergabe:** Die nächste Person läuft schon los, wenn die ankommende eine **Markierung** erreicht. Sie schaut dabei nach **vorn**, nicht zurück. Die ankommende Person ruft **„Hopp!“**. Dann streckt die nächste Person die Hand nach **hinten**, und der Stab wird hineingelegt.',
        'Fällt der Stab herunter, hebt ihn die Person auf, die ihn fallen gelassen hat. Wichtig ist: **Ruhe bewahren** und weiterlaufen.',
      ],
      woerter: [['die Staffel', 'le relais'], ['der Staffelstab', 'le témoin'], ['nacheinander', 'l’un après l’autre'], ['die Wechselzone', 'la zone de transmission'], ['disqualifiziert', 'disqualifié'], ['die Markierung', 'la marque'], ['ausstrecken', 'tendre'], ['aufheben', 'ramasser']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Bring die Übergabe in die richtige Reihenfolge.', stufe: 1, teile: ['Die ankommende Person erreicht die Markierung.', 'Die nächste Person läuft los und schaut nach vorn.', 'Die ankommende Person ruft „Hopp!“.', 'Die nächste Person streckt die Hand nach hinten.', 'Der Stab wird in die Hand gelegt.'], ordnung: [2, 4, 0, 3, 1] },
      ],
    },
    hoeren: {
      was: 'Eine Teambesprechung', wo: 'Sportplatz · vor dem Staffellauf', titel: 'Wer läuft wann?',
      situation: 'Tom, Mia, Yusuf und Lina sind ein Staffelteam. Sie planen die Reihenfolge.',
      bild: ['tom:froh:stehen-zeigen', 'mia:froh:stehen'], sprecher: { Tom: 'm3', Mia: 'w3', Yusuf: 'm2', Lina: 'w2' },
      text: [
        ['Tom', 'Wer läuft zuerst? Der Start ist wichtig.'],
        ['Mia', 'Ich! Ich bin beim Start immer schnell.'],
        ['Yusuf', 'Ich laufe gern auf der Geraden. Ich nehme die zweite Strecke.'],
        ['Lina', 'Dann bin ich Dritte. Und Tom läuft zum Schluss, er ist am schnellsten.'],
        ['Tom', 'Okay. Aber unsere Übergaben waren letztes Mal schlecht. Mia, du hast den Stab fast fallen gelassen.'],
        ['Mia', 'Weil du dich umgedreht hast und stehen geblieben bist.'],
        ['Lina', 'Dann üben wir es richtig: Wer übernimmt, läuft bei der Markierung los und schaut nach vorn. Wer ankommt, ruft „Hopp!“.'],
        ['Yusuf', 'Und wir legen vorher fest, mit welcher Hand jede Person den Stab nimmt. Dann gibt es kein Durcheinander.'],
        ['Tom', 'Super. Noch zwei Übungswechsel, dann starten wir.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „übernehmen“ beim Staffellauf? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['den Stab bekommen und weiterlaufen', 'den Stab abgeben und stehen bleiben'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wer läuft welche Strecke? Warum?', stufe: 1, kopf: ['Strecke', 'Name', 'Grund'], breiten: [16, 24, 60], zeilen: [['1', '[Mia]', '[beim Start immer schnell]'], ['2', '[Yusuf]', '[läuft gern auf der Geraden]'], ['3', '[Lina]', '[kein Grund genannt]'], ['4', '[Tom]', '[am schnellsten]']] },
        { art: 'fragen', auftrag: 'Was lief beim letzten Mal schief?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Mia hat den Stab fast fallen gelassen, weil Tom sich umgedreht hat und stehen geblieben ist.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Plant eure eigene Staffel: Wer läuft wann? Begründet eure Entscheidung.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['… läuft zuerst, weil …', 'Zum Schluss läuft …', 'Bei der Übergabe achten wir auf …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Staffel', punkte: ['**4** Personen nacheinander', 'Stab in der **Wechselzone** übergeben', 'außerhalb = **disqualifiziert**'] },
         { titel: 'Übergabe', nummern: true, punkte: ['bei der **Markierung** loslaufen', 'nach **vorn** schauen', '„**Hopp!**“ rufen', 'Hand nach **hinten**, Stab hinein'] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Staffelzeiten: Rechne aus.', stufe: 2, spalten: 2, items: [{ a: 'Team A: 15,2 + 14,8 + 15,5 + 13,9 Sekunden', l: '59,4 Sekunden' }, { a: 'Team B: 14,6 + 15,1 + 14,9 + 15,0 Sekunden', l: '59,6 Sekunden' }, { a: 'Welches Team gewinnt? Mit wie viel Vorsprung?', l: 'Team A, mit 0,2 Sekunden Vorsprung' }, { a: 'Mit besseren Übergaben spart ein Team 0,3 Sekunden pro Wechsel. Wie viel spart es bei 3 Wechseln?', l: '0,9 Sekunden' }] },
      { art: 'tabelle', auftrag: 'Unser Staffelplan', stufe: 2, kopf: ['Strecke', 'Name', 'nimmt den Stab mit …', 'Markierung bei'], breiten: [14, 30, 28, 28], zeilen: [['1', '', '– (Start)', '–'], ['2', '', '', ''], ['3', '', '', ''], ['4', '', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Was ist beim Staffellauf anders als beim Einzellauf? Wie war es für dich im Team?', stufe: 2,
        anfaenge: ['Anders ist, dass …', 'Im Team …', 'Bei der Übergabe …'], zeilen: 5,
        beispiel: 'Anders ist, dass man nicht nur für sich selbst läuft. Im Team war ich etwas nervös, weil ich niemanden enttäuschen wollte. Bei der Übergabe hat das Rufen von „Hopp!“ sehr geholfen.' },
    ],
    check: ['Ich kenne die Regeln der Staffel.', 'Ich übergebe den Stab sicher.', 'Ich rechne Staffelzeiten aus.'],
  },
  // ================================================================ 3
  {
    thema: 'Weitsprung', titel: 'Ab in die Grube!', untertitel: 'Beim Weitsprung kommt es auf den Anlauf, den Absprung und die Landung an. Du lernst die vier Phasen kennen, misst richtig und verfolgst einen Wettkampf.',
    ziel: { de: 'Ich kenne die Phasen des Weitsprungs und messe die Weite richtig.', fr: 'Je connais les phases du saut en longueur et je mesure correctement.' },
    bild: ['ben:aufgeregt:stehen-zeigen', 'chloe:froh:stehen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wo wird beim Weitsprung gemessen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['vom Balken bis zum nächsten Abdruck im Sand', 'vom Anfang des Anlaufs bis zur Mitte der Grube', 'von den Zehen bis zum Kopf'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Leichtathletik (Stand 2026)', titel: 'Vier Phasen',
      absaetze: [
        '**Anlauf:** Lauf mit immer höherem Tempo auf den Balken zu. Zähle deine Schritte, damit du den Balken triffst. Für den Anfang reichen 10 bis 15 Schritte.',
        '**Absprung:** Spring mit **einem** Bein vom **Absprungbalken** ab. Das andere Knie und die Arme schwingen kräftig nach oben. Wer über den Balken tritt, macht einen **ungültigen** Versuch.',
        '**Flug:** Der Körper ist gestreckt oder in einer Hockhaltung. Kurz vor der Landung bringst du die Beine nach **vorn**.',
        '**Landung:** Du landest mit beiden Füßen in der **Sandgrube** und fällst nach **vorn**, nicht nach hinten.',
        '**Messen:** Gemessen wird von der **vorderen Kante** des Absprungbalkens bis zum **nächsten Abdruck** im Sand. Das kann die Ferse sein, aber auch die Hand oder der Po. Darum ist es wichtig, nicht nach hinten zu fallen.',
      ],
      woerter: [['der Anlauf', 'la course d’élan'], ['der Absprung', 'l’impulsion'], ['der Balken', 'la planche'], ['die Sandgrube', 'la fosse de sable'], ['ungültig', 'non valable'], ['der Abdruck', 'la trace'], ['die Ferse', 'le talon'], ['messen', 'mesurer']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Wie heißen die vier Phasen? Schreib die Namen.', stufe: 1, html: '<div class="voll">' + weitsprung() + '</div>', liste: [['1', 'Anlauf'], ['2', 'Absprung'], ['3', 'Flug'], ['4', 'Landung']], spalten: 2 },
      ],
    },
    hoeren: {
      was: 'Eine Wettkampfszene', wo: 'Sportplatz · Weitsprung', titel: 'Gemessen wird …',
      situation: 'Lio und Chloé messen beim Weitsprung. Ben springt. Hör zu: Wie weit springt Ben?',
      bild: ['ben:aufgeregt:stehen-zeigen', 'chloe:froh:stehen'], sprecher: { Ben: 'm2', Lio: 'm3', 'Chloé': 'w3' },
      text: [
        ['Ben', 'Erster Versuch! … Wie weit?'],
        ['Lio', 'Moment. Du bist mit dem Fuß über den Balken getreten. Der Versuch ist ungültig.'],
        ['Ben', 'Mist. Dann fange ich meinen Anlauf einen Schritt weiter hinten an.'],
        ['Chloé', 'Zweiter Versuch … guter Sprung! Aber du bist nach hinten gefallen. Deine Hand ist hinter den Füßen im Sand.'],
        ['Lio', 'Dann messen wir bis zur Hand: drei Meter zehn.'],
        ['Ben', 'Ohne die Hand wären es fast dreieinhalb Meter gewesen!'],
        ['Chloé', 'Darum: Bei der Landung nach vorn fallen. Dritter Versuch.'],
        ['Ben', '… Und?'],
        ['Lio', 'Drei Meter achtundvierzig! Das ist dein bester Versuch.'],
        ['Chloé', 'Glückwunsch, Ben. Die beste Weite zählt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „ungültig“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Es zählt nicht.', 'Es ist besonders gut.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und trage Bens Versuche ein.', stufe: 2, kopf: ['Versuch', 'Weite', 'Bemerkung'], breiten: [16, 24, 60], zeilen: [['1', '[ungültig]', '[über den Balken getreten]'], ['2', '[3,10 m]', '[nach hinten gefallen, gemessen bis zur Hand]'], ['3', '[3,48 m]', '[bester Versuch]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Springt und gebt euch nach jedem Sprung einen Tipp: zu Anlauf, Absprung oder Landung.', stufe: 2, karten: [
        { titel: 'Tipp geben', text: ['Dein Anlauf …', 'Beim Absprung …', 'Bei der Landung …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Phasen', nummern: true, punkte: ['**Anlauf**: schneller werden', '**Absprung**: ein Bein, vom Balken', '**Flug**: Beine nach vorn', '**Landung**: nach vorn fallen'] },
         { titel: 'Messen', punkte: ['vom **Balken**', 'bis zum **nächsten Abdruck**', 'über den Balken = **ungültig**', 'die **beste** Weite zählt'] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Weiten vergleichen: Rechne aus.', stufe: 2, spalten: 2, items: [{ a: 'Wie viele Zentimeter sind 3,48 Meter?', l: '348 Zentimeter' }, { a: 'Ben springt 3,48 m, Chloé 3,72 m. Wie viel weiter springt Chloé?', l: '24 Zentimeter' }, { a: 'Lio springt erst 2,95 m, dann 3,20 m. Um wie viel hat er sich verbessert?', l: '25 Zentimeter' }, { a: 'Der Weltrekord liegt bei fast 9 Metern. Wie oft passt Bens Sprung ungefähr hinein?', l: 'etwa zweieinhalbmal' }] },
      { art: 'tabelle', auftrag: 'Mein Weitsprung-Protokoll', stufe: 1, kopf: ['Versuch', 'Weite in Metern', 'Tipp für den nächsten Sprung'], breiten: [16, 26, 58], zeilen: [['1', '', ''], ['2', '', ''], ['3', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welche Phase gelingt dir beim Weitsprung gut, welche noch nicht?', stufe: 2,
        anfaenge: ['Gut gelingt mir …', 'Noch schwierig ist …', 'Ich will üben, …'], zeilen: 5,
        beispiel: 'Gut gelingt mir der Anlauf, weil ich schnell bin. Noch schwierig ist der Absprung, weil ich den Balken oft nicht treffe. Ich will üben, meine Schritte zu zählen.' },
    ],
    check: ['Ich kenne die vier Phasen.', 'Ich weiß, wo gemessen wird.', 'Ich vergleiche Weiten und rechne Unterschiede aus.'],
  },
  // ================================================================ 4
  {
    thema: 'Werfen und Stoßen', titel: 'Weit, weiter, am weitesten', untertitel: 'Beim Werfen braucht man Technik und Vorsicht. Du lernst den Schlagwurf und das Kugelstoßen kennen, die wichtigsten Sicherheitsregeln – und rechnest mit deinen Weiten.',
    ziel: { de: 'Ich werfe mit guter Technik und halte die Sicherheitsregeln ein.', fr: 'Je lance avec une bonne technique et je respecte les règles de sécurité.' },
    bild: ['finn:verlegen:stehen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Rate mal!',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie schwer ist die Kugel beim Kugelstoßen der Männer? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['gut 7 Kilogramm', 'etwa 1 Kilogramm', 'etwa 20 Kilogramm'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Leichtathletik (Stand 2026)', titel: 'Werfen – aber sicher!',
      absaetze: [
        '### Der Schlagwurf',
        'Beim **Schlagwurf** mit einem kleinen Ball nimmst du ein paar Schritte **Anlauf**. Der Wurfarm geht weit nach **hinten**, der Körper ist gespannt wie ein **Bogen**. Dann schleuderst du den Ball schnell **über dem Kopf** nach vorn. Der Ellbogen ist dabei **hoch**. Wirf schräg nach oben, nicht flach.',
        '### Das Kugelstoßen',
        'Die **Kugel** wird nicht geworfen, sondern **gestoßen**. Sie liegt auf den Fingern und berührt den **Hals** unter dem Ohr. Aus den Beinen drückst du sie mit dem Arm nach vorn oben. Eine Kugel für Erwachsene wiegt 4 Kilogramm bei Frauen und gut 7 Kilogramm bei Männern. In der Schule nimmt man leichtere Kugeln.',
        '### Sicherheitsregeln',
        'Alle werfen von **einer Linie** in **eine Richtung**. Niemand steht oder läuft im **Wurfbereich**. Geworfen wird erst auf **Kommando**. Die Geräte holt man erst, wenn **alle** geworfen haben und die Lehrperson es erlaubt.',
      ],
      woerter: [['werfen', 'lancer'], ['stoßen', 'pousser'], ['der Bogen', 'l’arc'], ['schleudern', 'projeter'], ['der Ellbogen', 'le coude'], ['die Kugel', 'le poids'], ['der Wurfbereich', 'la zone de lancer'], ['das Kommando', 'le signal']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Kugel wird geworfen wie ein Ball.', false], ['Beim Schlagwurf ist der Ellbogen hoch.', true], ['Man holt den Ball sofort nach dem eigenen Wurf.', false], ['Alle werfen in die gleiche Richtung.', true], ['In der Schule nimmt man leichtere Kugeln.', true]] },
      ],
    },
    hoeren: {
      was: 'Eine Sicherheitsansage', wo: 'Sportplatz · Wurfstation', titel: 'Erst werfen, dann holen',
      situation: 'Frau Diallo erklärt die Regeln an der Wurfstation. In der zweiten Runde wird es gefährlich.',
      bild: ['lehrerin:besorgt:stehen', 'finn:verlegen:stehen'], sprecher: { 'Frau Diallo': 'w1', Finn: 'm3', Amira: 'w2' },
      text: [
        ['Frau Diallo', 'Alle stellen sich hinter die weiße Linie. Wir werfen mit kleinen Bällen, immer nur in Richtung Wiese.'],
        ['Frau Diallo', 'Ich rufe „Werfen!“, dann werfen alle. Danach rufe ich „Holen!“. Erst dann holt ihr eure Bälle.'],
        ['Frau Diallo', 'Zweite Runde. Alle zurück hinter die Linie. Werfen!'],
        ['Finn', 'Mein Ball von vorhin liegt noch da vorn. Ich hole ihn schnell …'],
        ['Frau Diallo', 'Stopp, Finn! Sofort zurück! Amira wirft gerade!'],
        ['Amira', 'Puh, ich habe gerade noch angehalten. Das war knapp.'],
        ['Frau Diallo', 'Ein Ball oder eine Kugel kann schwer verletzen. Darum gilt: Niemand ist im Wurfbereich, solange geworfen wird. Auch nicht für eine Sekunde.'],
        ['Finn', 'Tut mir leid. Ich warte auf „Holen!“.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Wurfstation? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Platz, an dem geworfen wird', 'ein Bahnhof'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Welche zwei Kommandos gibt Frau Diallo?', l: '„Werfen!“ und „Holen!“' }, { f: 'Was macht Finn falsch?', zeilen: 2, l: 'Er läuft in den Wurfbereich, um seinen Ball zu holen, obwohl gerade geworfen wird.' }, { f: 'Warum ist das gefährlich?', zeilen: 2, l: 'Ein Ball oder eine Kugel kann ihn treffen und schwer verletzen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum halten sich manche nicht an Sicherheitsregeln? Wie kann man sich gegenseitig daran erinnern, ohne zu streiten?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Manche denken …', 'Man könnte freundlich sagen: …', 'Wichtig ist, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Technik', punkte: ['Schlagwurf: Arm weit **hinten**', 'Körper wie ein **Bogen**', 'Abwurf **über dem Kopf**', 'die Kugel wird **gestoßen**'] },
         { titel: 'Sicherheit', nummern: true, punkte: ['alle hinter **einer Linie**', 'alle in **eine Richtung**', 'werfen nur auf **Kommando**', 'holen erst nach „**Holen!**“'] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Wurf-Auswertung: Rechne aus.', stufe: 2, spalten: 2, items: [{ a: 'Amira wirft 18 m, 22 m und 20 m. Was ist ihr bester Wurf?', l: '22 m' }, { a: 'Wie groß ist Amiras Durchschnitt?', l: '(18 + 22 + 20) ÷ 3 = 20 m' }, { a: 'Finn wirft 15 m, 19 m und 17 m. Wie groß ist sein Durchschnitt?', l: '17 m' }, { a: 'Um wie viele Meter ist Amiras Durchschnitt größer?', l: '3 m' }] },
      { art: 'tabelle', auftrag: 'Mein Wurf-Protokoll', stufe: 1, kopf: ['', 'Ball in Metern', 'Kugel in Metern'], breiten: [36, 32, 32], zeilen: [['Versuch 1', '', ''], ['Versuch 2', '', ''], ['Versuch 3', '', ''], ['bester Versuch', '', ''], ['Durchschnitt', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welche Sicherheitsregel ist für dich die wichtigste? Warum?', stufe: 2,
        anfaenge: ['Am wichtigsten finde ich …', 'weil …', 'Ich achte darauf, dass …'], zeilen: 5,
        beispiel: 'Am wichtigsten finde ich, dass man erst nach dem Kommando „Holen!“ in den Wurfbereich geht, weil ein Ball sonst jemanden am Kopf treffen kann. Ich achte darauf, dass ich auch meine Freunde daran erinnere.' },
    ],
    check: ['Ich kenne den Schlagwurf und das Kugelstoßen.', 'Ich halte alle Sicherheitsregeln ein.', 'Ich rechne den Durchschnitt meiner Würfe aus.'],
  },
  // ================================================================ 5
  {
    thema: 'Projekt: Sportfest für alle', titel: 'Jede Leistung zählt', untertitel: 'Zum Schluss organisiert ihr ein Leichtathletik-Fest. Du lernst Para-Leichtathletik kennen, passt Stationen an und dokumentierst deine eigenen Fortschritte.',
    ziel: { de: 'Ich plane mit anderen ein Sportfest, bei dem alle mitmachen können.', fr: 'J’organise avec d’autres une fête sportive à laquelle tout le monde peut participer.' },
    bild: ['nele:froh:rollstuhl', 'noah:froh:stehen-zeigen'],
    start: {
      was: 'Was weißt du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie heißt die Person, die mit einer blinden Läuferin zusammen läuft? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Begleitläuferin oder Begleitläufer', 'Schiedsrichterin oder Schiedsrichter', 'Zuschauerin oder Zuschauer'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sportwissen (Stand 2026)', titel: 'Leichtathletik für alle',
      absaetze: [
        'Bei den **Paralympics** gehört die Leichtathletik zu den größten Sportarten.',
        '**Im Rennrollstuhl** fahren Sportlerinnen und Sportler auf drei Rädern sehr schnell. Beim Marathon sind die Besten im Rollstuhl schneller als die schnellsten Läufer zu Fuß.',
        '**Mit Prothesen:** Manchen Menschen fehlt ein Bein oder ein Teil davon. Sie laufen oder springen mit einer **Sportprothese** aus Carbon. Die Prothese federt wie eine Sprungfeder.',
        '**Blinde Läuferinnen und Läufer** laufen mit einer **Begleitläuferin** oder einem **Begleitläufer**, englisch Guide. Beide sind mit einem kurzen **Band** an den Händen verbunden. Der Guide sagt an, wo es langgeht, aber er darf nicht ziehen.',
        'Für ein Schulsportfest gilt: Jede Person sammelt **eigene Punkte**, Stationen können **angepasst** werden, und jede **Verbesserung** zählt. Wer sich selbst übertrifft, hat eine **persönliche Bestleistung**.',
      ],
      woerter: [['der Rennrollstuhl', 'le fauteuil de course'], ['die Prothese', 'la prothèse'], ['federn', 'faire ressort'], ['blind', 'aveugle'], ['der Begleitläufer', 'le guide'], ['das Band', 'le lien'], ['übertreffen', 'dépasser'], ['die Bestleistung', 'le record personnel']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte mit dem Text.', stufe: 1, fragen: [{ f: 'Wie viele Räder hat ein Rennrollstuhl?', l: 'drei' }, { f: 'Woraus ist eine Sportprothese?', l: 'aus Carbon' }, { f: 'Was darf der Guide nicht?', l: 'ziehen' }, { f: 'Was ist eine persönliche Bestleistung?', zeilen: 2, l: 'die beste Leistung, die man selbst je geschafft hat – wenn man sich selbst übertrifft' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klasse · Planung Sportfest', titel: 'Ein Fest für alle',
      situation: 'Die Klasse plant ein Leichtathletik-Fest mit drei Stationen. Nele und Noah sind im Planungsteam.',
      bild: ['nele:froh:rollstuhl', 'noah:froh:stehen-zeigen'], sprecher: { Noah: 'm3', Nele: 'w3' },
      text: [
        ['Noah', 'Wir machen einen Dreikampf: Sprint, Weitsprung und Ballwurf.'],
        ['Nele', 'Gut. Beim Sprint fahre ich mit meinem Rollstuhl. Beim Weitsprung geht das nicht. Was mache ich da?'],
        ['Noah', 'Hm. Vielleicht stößt du dich mit dem Rollstuhl ab und rollst so weit wie möglich?'],
        ['Nele', 'Weitrollen nach drei Schwüngen – das ist lustig! Das können alle ausprobieren, nicht nur ich.'],
        ['Noah', 'Super Idee. Und wie vergeben wir Punkte?'],
        ['Nele', 'Nicht nur für die Besten. Jede Person schreibt ihre Leistung vom Training auf. Wer sich verbessert, bekommt Extrapunkte.'],
        ['Noah', 'Dann haben alle eine Chance. Und am Ende gibt es eine Urkunde für jede Person.'],
        ['Nele', 'Und wir brauchen Helfer: Zeitnehmer, Weitenmesser und jemanden, der die Punkte einträgt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Dreikampf? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Wettkampf mit drei Disziplinen', 'ein Streit zwischen drei Personen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und fülle den Plan aus.', stufe: 1, kopf: ['', 'Unser Sportfest'], breiten: [30, 70], zeilen: [['Disziplinen', '[Sprint, Weitsprung, Ballwurf]'], ['Idee für Nele', '[Weitrollen nach drei Schwüngen, für alle zum Ausprobieren]'], ['Punkte', '[Extrapunkte für jede Verbesserung]'], ['Am Ende', '[eine Urkunde für jede Person]'], ['Helfer', '[Zeitnehmer, Weitenmesser, Punkte eintragen]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was ist fairer: Punkte nur für die Besten oder auch für jede Verbesserung? Diskutiert.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Fairer finde ich …', 'Ein Vorteil ist …', 'Ein Nachteil ist …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Para-Leichtathletik', punkte: ['**Rennrollstuhl** mit drei Rädern', '**Sportprothese** aus Carbon', 'blind: mit **Guide**'] },
         { titel: 'Unser Fest', punkte: ['Stationen **anpassen**', 'jede **Verbesserung** zählt', '**Helfer** an jeder Station', '**Urkunde** für alle'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mein Dreikampf-Pass: Trage deine Leistungen ein.', stufe: 1, kopf: ['Station', 'im Training', 'beim Fest', 'verbessert?'], breiten: [40, 20, 20, 20], zeilen: [['Sprint, in Sekunden', '', '', ''], ['Weitsprung oder Weitrollen, in Metern', '', '', ''], ['Ballwurf, in Metern', '', '', '']] },
      { art: 'schneidekarten', auftrag: 'Stationskarten für das Sportfest: Schneidet sie aus und legt sie an die Stationen.', stufe: 2, neueSeite: true, titel: 'Sportfest', icon: 'trophy', farbe: FEST, spalten: 2,
        karten: [
          { text: '**Station Sprint**\n60 Meter, Hochstart oder Rollstuhl, zwei Versuche' }, { text: '**Station Weitsprung**\nAbsprungzone statt Balken, drei Versuche' },
          { text: '**Station Weitrollen**\ndrei Schwünge, dann rollen lassen, drei Versuche' }, { text: '**Station Ballwurf**\nhinter der Linie, nur auf Kommando, drei Versuche' },
          { text: '**Helfer: Zeit**\nStoppuhr starten, laut ansagen, sofort aufschreiben' }, { text: '**Helfer: Weite**\nMaßband, bis zum nächsten Abdruck messen' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Worauf bist du beim Sportfest stolz? Wo hast du dich verbessert?', stufe: 2,
        anfaenge: ['Stolz bin ich auf …', 'Verbessert habe ich mich …', 'Beim nächsten Fest …'], zeilen: 6,
        beispiel: 'Stolz bin ich auf meinen Ballwurf, weil ich vier Meter weiter geworfen habe als im Training. Verbessert habe ich mich auch beim Sprint. Beim nächsten Fest möchte ich als Helferin an der Zeitstation mitmachen.' },
    ],
    check: ['Ich kenne Para-Leichtathletik.', 'Ich passe Stationen so an, dass alle mitmachen können.', 'Ich dokumentiere meine Fortschritte.'],
  },
]

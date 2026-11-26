// Deutsch · Modul 4 „Kaufen, Mode und Taschengeld“ (Voie de préparation, ≈ A2.1–A2.2) – multimodales Heft.
// Themen und Grammatik nach dem Programm ALLUX 7P/6P/5P (CNES, 20/03/2019; Kann-Beschreibungen als Mindeststandards),
// Modul 4: Kaufen, Konsumartikel und Modetrends früher und heute, Taschengeld; Begründungen mit weil
// und denn, Possessivpronomen, Präteritum regelmäßiger Verben, Steigerung (Wiederholung), direkte Rede markieren,
// Artikel (bestimmt: ein Ding / allgemein: alle Dinge), Anleitungen für Automaten, Kleinanzeigen, Werbung.
// Lektion 5 (Mobbing wegen Marken): behutsam, ohne Bloßstellen; Hilfe: Kanner- a Jugendtelefon 116 111.
// Persönliches Geld: nur mit ausgedachten Beträgen („Stell dir vor …“) – niemand muss über das eigene Geld sprechen.
// Alle Texte selbst geschrieben, alle Personen und Marken ausgedacht.

export const MODUL = {
  id: 'deutsch-m4', kuerzel: 'de4', nr: 4, sprache: 'de', niveau: 'A2.1 – A2.2', klasse: 'Voie de préparation',
  dateiname: 'Deutsch_Modul-4',
  fach: { de: 'Deutsch', fr: 'Allemand' },
  titel: { de: 'Kaufen, Mode und Taschengeld', fr: 'Acheter, mode et argent de poche' },
  untertitel: { de: 'Taschengeld, Automaten, Kleinanzeigen, Mode früher und heute und Werbetricks: lesen, hören, sprechen und schreiben – in acht Einheiten.', fr: 'Argent de poche, distributeurs, petites annonces, la mode d’hier et d’aujourd’hui et les astuces de la pub : lire, écouter, parler et écrire – en huit unités.' },
  farben: { tief: '#b4432e', mittel: '#eaa38f', zart: '#fbefe9', dunkel: '#7e2b1c' },
  deckbild: ['sami:froh:handy', 'chloe:froh:laessig', 'ben:froh:stehen-zeigen'],
  blasen: [{ t: 'Was kostet das?', x: 12, y: 110 }, { t: 'Zu verkaufen!', x: 140, y: 102 }, { t: '€', x: 168, y: 150 }],
  themen: [
    { titel: { de: 'Mein Geld, meine Sachen', fr: 'Mon argent, mes affaires' }, icon: 'coin', lektionen: 2 },
    { titel: { de: 'Kaufen im Alltag', fr: 'Acheter au quotidien' }, icon: 'shopping-cart', lektionen: 1 },
    { titel: { de: 'Mode früher und heute', fr: 'La mode d’hier et d’aujourd’hui' }, icon: 'shirt', lektionen: 2 },
    { titel: { de: 'Kaufen, verkaufen, werben', fr: 'Acheter, vendre, faire de la pub' }, icon: 'tag', lektionen: 3 },
  ],
  anleitung: [
    'Jede Lektion hat fünf Teile: **Lesen**, **Hören**, **Regel**, **Üben** und **Schreiben**. Am Ende steht ein **Kurz-Check**.',
    'Bei jedem Text gibt es einen **QR-Code**. Halte die Kamera deines Handys darauf – dann hörst du den Text. Du kannst ihn so oft hören, wie du willst, auch langsamer.',
    'Die Punkte bei den Aufgaben zeigen die Stufe: ●○○ Basis · ●●○ Kern · ●●● Plus. Fang mit der Basis an.',
    'Über eigenes Geld musst du nicht sprechen. Bei manchen Aufgaben stellst du dir einfach eine Person vor.',
  ],
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Taschengeld · weil und denn', titel: 'Wofür gibst du dein Geld aus?', untertitel: 'Sparen oder ausgeben? Jugendliche schreiben im Forum über Taschengeld. Du sagst deine Meinung – und begründest sie.',
    ziel: { de: 'Ich verstehe Meinungen zum Taschengeld und begründe mit „weil“ und „denn“.', fr: 'Je comprends des avis sur l’argent de poche et je justifie avec « weil » et « denn ».' },
    bild: ['sami:froh:handy', 'mia:verwirrt'],
    start: {
      was: 'Wofür braucht man Geld?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wofür geben Jugendliche oft Geld aus? Kreuze an, was du glaubst.', stufe: 1, fragen: [{ f: '', o: ['Snacks und Getränke', 'Handyguthaben', 'Kleidung', 'Kino und Ausflüge', 'Geschenke', 'Bücher und Comics'], r: -1 }] },
        { art: 'zuordnen', auftrag: 'Was bedeutet das? Verbinde.', stufe: 1, links: ['sparen', 'ausgeben', 'leihen', 'verdienen'], rechts: ['Geld behalten, nicht kaufen', 'Geld für etwas bezahlen', 'etwas kurz geben, man bekommt es zurück', 'Geld für Arbeit bekommen'], ordnung: [2, 0, 3, 1] },
      ],
    },
    lesen: {
      was: 'Beiträge in einem Jugendforum', art: 'chat', ich: 'Nele', stimmen: { Sam: 'm2', Mia: 'w2', Nele: 'w1', Tom: 'm3' },
      quelle: 'Jugendforum · Thema: „Taschengeld – wie viel und wofür?“', titel: 'Was macht ihr mit eurem Taschengeld?',
      nachrichten: [
        ['Sam', 'Ich bekomme 20 € im Monat. Das meiste gebe ich für Snacks aus, **weil** ich nach dem Training immer Hunger habe. 😅 Am Ende vom Monat habe ich nichts mehr.'],
        ['Mia', 'Ich spare fast alles, **denn** ich will mir im Sommer ein Fahrrad kaufen. Ich habe schon 150 € gespart! Manchmal ist es schwer, nichts zu kaufen.'],
        ['Tom', 'Ich bekomme kein festes Taschengeld. Ich helfe meinem Nachbarn im Garten und verdiene so ein bisschen Geld. Das finde ich gut, **weil** ich es selbst verdient habe.'],
        ['Nele', 'Mein Tipp: Schreibt eure Ausgaben eine Woche lang auf! Ich war geschockt – 9 € nur für Getränke am Automaten. Jetzt nehme ich eine Wasserflasche von zu Hause mit.'],
        ['Mia', 'Gute Idee, Nele! Das mache ich auch. 👍'],
      ],
      woerter: [['das Taschengeld', 'l’argent de poche'], ['im Monat', 'par mois'], ['ausgeben', 'dépenser'], ['sparen', 'économiser'], ['fest', 'fixe'], ['verdienen', 'gagner (de l’argent)'], ['die Ausgabe', 'la dépense'], ['geschockt', 'choqué']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was machen die Jugendlichen mit ihrem Geld?', stufe: 1, kopf: ['', 'Was?', 'Warum?'], breiten: [16, 42, 42], zeilen: [['Sam', '[Snacks kaufen]', '[nach dem Training Hunger]'], ['Mia', '[sparen]', '[will ein Fahrrad kaufen]'], ['Tom', '[selbst verdienen, im Garten helfen]', '[er findet es gut, selbst zu verdienen]'], ['Nele', '[Ausgaben aufschreiben]', '[zu viel Geld für Getränke]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Sam hat am Ende vom Monat noch viel Geld.', false], ['Mia hat schon 150 € gespart.', true], ['Tom bekommt 20 € Taschengeld.', false], ['Nele hat 9 € für Getränke ausgegeben.', true]] },
        { art: 'fragen', auftrag: 'Welcher Tipp gefällt dir am besten? Begründe mit „weil“.', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Neles Tipp gefällt mir, weil man so sieht, wofür man Geld ausgibt.' }] },
      ],
    },
    hoeren: {
      was: 'Um einen Gefallen bitten', wo: 'Zu Hause · Freitagabend', titel: 'Kannst du mir 10 € vorstrecken?',
      situation: 'Ben möchte am Samstag mit seinen Freunden ins Kino. Aber sein Geld ist alle. Er fragt seine Tante. Sie wohnt bei der Familie.',
      bild: ['ben:verlegen', 'mutter:froh'], sprecher: { Ben: 'm3', Tante: 'w1' },
      text: [
        ['Ben', 'Tante Sara, hast du kurz Zeit? Ich habe eine Frage.'], ['Tante', 'Klar, was ist los?'],
        ['Ben', 'Morgen gehen alle ins Kino. Aber mein Taschengeld ist schon weg. Kannst du mir bitte zehn Euro vorstrecken?'],
        ['Tante', 'Hm. Warum ist dein Geld schon weg? Es ist doch erst der zwanzigste.'], ['Ben', 'Weil ich Pommes und Getränke gekauft habe … und ein Spiel fürs Handy.'],
        ['Tante', 'Okay. Ich gebe dir das Geld. Aber nächsten Monat bekommst du zehn Euro weniger. Einverstanden?'],
        ['Ben', 'Einverstanden! Danke! Und ich helfe dir dafür am Sonntag beim Einkaufen.'], ['Tante', 'Das ist ein Angebot! Und schreib mal auf, wofür du dein Geld ausgibst, ja?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie bittet man höflich um einen Gefallen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Kannst du mir bitte … ?', 'Gib mir sofort …!', 'Hättest du kurz Zeit?'], r: [0, 2] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Wie viel Geld braucht Ben?', o: ['5 €', '10 €', '20 €'], r: 1 }, { f: 'Wofür braucht er das Geld?', o: ['für das Kino', 'für ein Spiel', 'für Pommes'], r: 0 }, { f: 'Was passiert nächsten Monat?', o: ['Ben bekommt mehr Geld.', 'Ben bekommt 10 € weniger.', 'Ben bekommt kein Geld.'], r: 1 }] },
        { art: 'fragen', auftrag: 'Hör noch einmal. Warum ist Bens Geld schon weg?', stufe: 2, fragen: [{ f: '', l: 'Weil er Pommes, Getränke und ein Handyspiel gekauft hat.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Bittet euch um einen Gefallen. Reagiert mit Ja oder mit Nein.', stufe: 3, karten: [
        { titel: 'Bitten', text: ['Kannst du mir bitte … leihen?', 'Hättest du kurz Zeit? Ich brauche Hilfe bei …', 'Könntest du mir … geben?'] },
        { titel: 'Reagieren', text: ['Klar, gern!', 'Ja, aber nur bis morgen.', 'Tut mir leid, das geht nicht, weil …', 'Lieber nicht, denn …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Begründen: weil', punkte: ['Ich spare, **weil** ich ein Fahrrad **kaufen will**.', 'Nach **weil** steht das Verb **am Ende**.', 'Vor **weil** steht ein **Komma**.', 'Frage: **Warum**? – **Weil** …'] },
         { titel: 'Begründen: denn', punkte: ['Ich spare, **denn** ich **will** ein Fahrrad kaufen.', 'Nach **denn** bleibt der Satz **normal** (Verb an Position 2).', 'Auch vor **denn**: ein Komma.'] }],
        [{ art: 'tipp', titel: 'Vergleich', tabelle: { kopf: ['', 'Satz 2'], zeilen: [['…, weil', 'ich Hunger **habe**.'], ['…, denn', 'ich **habe** Hunger.']] } },
         { art: 'achtung', titel: 'Höflich bitten', text: '**Kannst du** mir bitte …? · **Könntest du** mir …? · **Hättest du** kurz Zeit? – Mit **bitte** und einem **Danke** klappt es fast immer besser.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Verb am Ende (nach „weil“).', stufe: 1, saetze: ['Sam kauft Snacks, weil er Hunger [hat].', 'Mia spart, weil sie ein Fahrrad kaufen [will].', 'Tom freut sich, weil er das Geld selbst verdient [hat].', 'Ben fragt seine Tante, weil sein Geld weg [ist].'] },
      { art: 'abschreiben', auftrag: 'Verbinde mit „weil“ und dann mit „denn“.', stufe: 2, kopf: ['zwei Sätze', 'mit weil / mit denn'], saetze: [['Ich gehe nicht mit. Ich habe kein Geld.', 'Ich gehe nicht mit, weil ich kein Geld habe. / …, denn ich habe kein Geld.'], ['Nele trinkt Wasser. Es ist billiger.', 'Nele trinkt Wasser, weil es billiger ist. / …, denn es ist billiger.']] },
      { art: 'fragen', auftrag: 'Was ist deine Meinung? Antworte mit „weil“ oder „denn“.', stufe: 3, fragen: [{ f: 'Sollen Jugendliche Taschengeld bekommen?', l: 'Ja, weil sie so lernen, mit Geld umzugehen.' }, { f: 'Ist Sparen wichtig?', l: 'Ja, denn dann kann man sich größere Wünsche erfüllen.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Stell dir vor: Du bekommst 25 € im Monat. Wofür gibst du sie aus? Was sparst du? Schreib einen Forumsbeitrag und begründe mit „weil“ und „denn“.', stufe: 2,
        anfaenge: ['Wenn ich 25 € hätte, …', 'Für … gebe ich … aus, weil …', '… € spare ich, denn …', 'Mein Tipp: …'], zeilen: 9,
        beispiel: 'Von 25 € gebe ich 10 € für Kino und Snacks aus, weil ich gern mit Freunden unterwegs bin. 15 € spare ich, denn ich will mir neue Kopfhörer kaufen. Mein Tipp: Nehmt Wasser von zu Hause mit!' },
    ],
    check: ['Ich verstehe Meinungen in einem Forum.', 'Ich verstehe, wenn jemand um einen Gefallen bittet.', 'Ich begründe mit „weil“ (Verb am Ende).', 'Ich begründe mit „denn“ (Verb an Position 2).', 'Ich bitte höflich um einen Gefallen.'],
  },
  // ================================================================ 2
  {
    thema: 'Possessivpronomen · Leihen', titel: 'Ist das deine Jacke?', untertitel: 'Im Fundbüro der Schule liegt viel: Jacken, Brillen, Ladekabel. Wem gehört was? Und: Kannst du mir deins leihen?',
    ziel: { de: 'Ich beschreibe meine Sachen und benutze mein, dein, sein, ihr …', fr: 'Je décris mes affaires et j’utilise mon, ton, son … (mein, dein, sein, ihr …).' },
    bild: ['lehrer:froh:stehen', 'jana:verwirrt'],
    start: {
      was: 'Wem gehört das?',
      aufgaben: [
        { art: 'luecken', auftrag: 'Ergänze: mein, dein, sein, ihr.', stufe: 1, saetze: ['Das ist Ben. Das ist [sein] Ball.', 'Das ist Lina. Das ist [ihr] Rucksack.', 'Ich habe ein Handy. Das ist [mein] Handy.', 'Du hast eine Mütze. Ist das [deine] Mütze?'] },
      ],
    },
    lesen: {
      was: 'Das Fundbüro der Schule', art: 'dokumente', stimme: 'w1',
      quelle: 'Aushang vor dem Sekretariat', titel: 'Fundbüro: Wer vermisst etwas?',
      dokumente: [
        { stil: 'notiz', kopf: '📦 Gefunden in dieser Woche', text: ['1 · eine **blaue Regenjacke**, Größe M, mit einem Schlüssel in der Tasche (Turnhalle, Montag)', '2 · eine **runde Brille** mit rotem Rahmen, in einem grünen Etui (Kantine, Dienstag)', '3 · ein **weißes Ladekabel** mit einem Sticker: ein kleiner Dino (Bibliothek, Mittwoch)', '4 · eine **Trinkflasche** aus Metall, silber, mit dem Namen „Jo“ (Pausenhof, Donnerstag)'] },
        { stil: 'karte', kopf: 'So bekommst du deine Sachen zurück', text: ['Komm in der Pause ins Sekretariat. Beschreib deinen Gegenstand **genau**: Farbe, Größe, besondere Merkmale. Dann bekommst du ihn zurück.', 'Nach den Ferien spenden wir alles, was niemand abgeholt hat.'] },
      ],
      woerter: [['das Fundbüro', 'les objets trouvés'], ['vermissen', 'chercher (un objet perdu)'], ['der Rahmen', 'la monture'], ['das Etui', 'l’étui'], ['das Ladekabel', 'le câble de chargement'], ['der Gegenstand', 'l’objet'], ['das Merkmal', 'la caractéristique'], ['spenden', 'faire don'], ['abholen', 'venir chercher']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Lies den Aushang. Wo und wann hat man die Sachen gefunden?', stufe: 1, kopf: ['Gegenstand', 'Wo?', 'Wann?'], zeilen: [['Regenjacke', '[Turnhalle]', '[Montag]'], ['Brille', '[Kantine]', '[Dienstag]'], ['Ladekabel', '[Bibliothek]', '[Mittwoch]'], ['Trinkflasche', '[Pausenhof]', '[Donnerstag]']] },
        { art: 'mc', auftrag: 'Wer bekommt was zurück? Kreuze den passenden Gegenstand an.', stufe: 2, fragen: [
          { f: 'Jana: „Meine Brille ist rund. Der Rahmen ist rot.“', o: ['1', '2', '3', '4'], r: 1 },
          { f: 'Finn: „Mein Kabel hat einen Dino-Sticker.“', o: ['1', '2', '3', '4'], r: 2 },
          { f: 'Jo: „Auf meiner Flasche steht mein Name.“', o: ['1', '2', '3', '4'], r: 3 }] },
      ],
    },
    hoeren: {
      was: 'Leihen und verleihen', wo: 'Klassenzimmer · vor der Mathestunde', titel: 'Kannst du mir deins leihen?',
      situation: 'Gleich beginnt die Mathestunde. Lio hat vieles vergessen. Er fragt Jana und Finn.',
      bild: ['lio:verlegen', 'jana:froh'], sprecher: { Lio: 'm2', Jana: 'w2', Finn: 'm3' },
      text: [
        ['Lio', 'Jana, mein Taschenrechner ist zu Hause. Kannst du mir deinen leihen?'], ['Jana', 'Tut mir leid, ich brauche meinen selbst. Aber frag Finn, er hat zwei.'],
        ['Lio', 'Finn, kannst du mir einen Taschenrechner leihen? Nur für die Stunde.'], ['Finn', 'Klar. Hier, nimm meinen alten. Aber bitte gib ihn mir nach der Stunde zurück.'],
        ['Lio', 'Danke! Ach, und mein Lineal … ich habe auch kein Lineal.'], ['Jana', 'Hier, du kannst meins haben. Ich habe heute zwei dabei.'],
        ['Lio', 'Ihr seid super! Morgen bringe ich euch zwei Kekse mit.'], ['Finn', 'Und morgen bringst du deine eigenen Sachen mit, okay?'], ['Lio', 'Versprochen!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was leihst du gern aus? Was nicht? Kreuze an, was du verleihen würdest.', stufe: 1, fragen: [{ f: '', o: ['einen Stift', 'mein Handy', 'meine Jacke', 'mein Passwort'], r: -1 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wer leiht Lio was?', stufe: 1, kopf: ['Gegenstand', 'Wer leiht es?', 'Bedingung / Grund'], zeilen: [['Taschenrechner', '[Finn]', '[nach der Stunde zurückgeben]'], ['Lineal', '[Jana]', '[sie hat heute zwei]']] },
        { art: 'mc', auftrag: 'Hör noch einmal. Kreuze an.', stufe: 2, fragen: [{ f: 'Warum leiht Jana den Taschenrechner nicht?', o: ['Sie braucht ihn selbst.', 'Er ist kaputt.'], r: 0 }, { f: 'Was bringt Lio morgen mit?', o: ['Kekse', 'Geld', 'Stifte'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Leihen und verleihen: Fragt nach Dingen aus eurem Mäppchen. Sagt Ja oder Nein mit Grund.', stufe: 3, karten: [
        { titel: 'Fragen', text: ['Kannst du mir deinen / deine / dein … leihen?', 'Darf ich kurz deinen … benutzen?', 'Hast du einen … für mich?'] },
        { titel: 'Antworten', text: ['Klar, hier ist meiner / meine / meins.', 'Tut mir leid, ich brauche ihn selbst.', 'Ja, aber gib ihn mir bitte zurück.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Possessivartikel', tabelle: { kopf: ['wer?', 'der / das', 'die / viele'], zeilen: [['ich', 'mein', 'mein**e**'], ['du', 'dein', 'dein**e**'], ['er / es', 'sein', 'sein**e**'], ['sie', 'ihr', 'ihr**e**'], ['wir', 'unser', 'unser**e**'], ['ihr', 'euer', 'eur**e**'], ['sie / Sie', 'ihr / Ihr', 'ihr**e** / Ihr**e**']] } },
         { titel: 'Beispiele', punkte: ['Das ist **mein** Rucksack. (der)', 'Das ist **meine** Brille. (die)', 'Das ist **mein** Handy. (das)', 'Das sind **meine** Schuhe. (viele)', 'Lina hat **ihre** Jacke. Ben hat **seine** Jacke.'] }],
        [{ art: 'tipp', titel: 'Ohne Nomen: meiner, meine, meins', text: 'Kannst du mir **deinen** Rechner leihen? – Klar, hier ist **meiner**. · Du kannst **meins** haben. (das Lineal)' },
         { art: 'achtung', titel: 'sein oder ihr?', text: 'Es kommt auf die **Person** an, nicht auf die Sache: **Ben** → **sein** Rucksack. **Lina** → **ihr** Rucksack.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze: sein, seine, ihr, ihre.', stufe: 1, saetze: ['Finn sucht [seine] Trinkflasche.', 'Jana hat [ihre] Brille gefunden.', 'Lio hat [sein] Lineal vergessen.', 'Mia vermisst [ihr] Ladekabel.'] },
      { art: 'luecken', auftrag: 'Ergänze: unser, unsere, euer, eure.', stufe: 2, saetze: ['Das ist [unser] Klassenzimmer.', 'Sind das [eure] Jacken?', 'Wo ist [euer] Lehrer?', '[Unsere] Schule hat ein Fundbüro.'] },
      { art: 'fragen', auftrag: 'Beschreib einen Gegenstand, der dir gehört, sehr genau (Farbe, Größe, Besonderheit).', stufe: 3, fragen: [{ f: '', zeilen: 3, l: 'Mein Mäppchen ist dunkelgrün und ziemlich groß. Es hat zwei Reißverschlüsse. Vorne ist ein kleiner Anstecker mit einem Fuchs.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Du hast etwas verloren. Schreib eine Nachricht an das Fundbüro: Was? Wann und wo verloren? Wie sieht es aus?', stufe: 2,
        anfaenge: ['Liebes Sekretariat,', 'ich habe am … meinen / meine / mein … verloren.', 'Er / Sie / Es ist …', 'Besonders ist …', 'Vielen Dank und viele Grüße'], zeilen: 7,
        beispiel: 'Liebes Sekretariat, ich habe am Freitag meine Mütze in der Turnhalle verloren. Sie ist grau und hat einen roten Streifen. Innen steht mein Name. Vielen Dank und viele Grüße, Jana (7P1)' },
    ],
    check: ['Ich verstehe einen Aushang vom Fundbüro.', 'Ich verstehe, wenn jemand etwas leihen will.', 'Ich benutze mein, dein, sein, ihr, unser, euer.', 'Ich frage höflich, ob ich etwas leihen kann.', 'Ich beschreibe einen Gegenstand genau.'],
  },
  // ================================================================ 3
  {
    thema: 'Automaten · Zahlen und Preise', titel: 'Wie funktioniert der Automat?', untertitel: 'Fahrkarte, Snack, Getränk: Du verstehst Anleitungen für Automaten – und Preise, auch wenn sie schnell gesagt werden.',
    ziel: { de: 'Ich verstehe Anleitungen für Automaten und sage Preise flüssig.', fr: 'Je comprends le mode d’emploi d’un distributeur et je dis les prix couramment.' },
    bild: ['noah:verwirrt:stehen', 'opa:froh:stehen-zeigen'],
    start: {
      was: 'Preise lesen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wie sagt man den Preis? Verbinde.', stufe: 1, links: ['0,80 €', '2,50 €', '4,99 €', '12,00 €', '1,05 €'], rechts: ['achtzig Cent', 'zwei Euro fünfzig', 'vier Euro neunundneunzig', 'zwölf Euro', 'ein Euro fünf'], ordnung: [3, 0, 4, 1, 2] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung am Fahrkartenautomaten', art: 'anleitung', stimme: 'w1',
      quelle: 'Bahnhof Trier · Fahrkartenautomat (für die Fahrt nach Hause)', titel: 'So kaufst du deine Fahrkarte',
      materialSprech: 'Du brauchst: ', material: ['Bargeld (Münzen oder Scheine) oder eine Bankkarte', 'dein Fahrziel'],
      schritte: [
        { icon: 'hand-finger', text: '**Tippe** auf den Bildschirm. **Wähle** die Sprache: Deutsch, Français oder English.' },
        { icon: 'map-pin', text: '**Gib** dein Ziel **ein**, zum Beispiel „Luxembourg“. **Wähle** „einfache Fahrt“ oder „Hin- und Rückfahrt“.' },
        { icon: 'users', text: '**Wähle** die Personen: Erwachsene oder Kinder/Jugendliche. Jugendliche bezahlen oft weniger.' },
        { icon: 'coin', text: '**Bezahle** mit Münzen, Scheinen oder Karte. Der Automat zeigt den Preis, zum Beispiel **8,40 €**.' },
        { icon: 'ticket', text: '**Nimm** deine Fahrkarte und dein Wechselgeld unten **heraus**. **Vergiss** deine Karte nicht!' },
      ],
      danach: ['**Achtung:** Bei Problemen drückst du den Knopf „Hilfe“. Gib deine Bankkarte und deinen PIN-Code nie fremden Personen!'],
      woerter: [['der Automat', 'le distributeur'], ['tippen', 'appuyer'], ['eingeben', 'saisir'], ['das Ziel', 'la destination'], ['die einfache Fahrt', 'l’aller simple'], ['die Hin- und Rückfahrt', 'l’aller-retour'], ['das Wechselgeld', 'la monnaie rendue'], ['der Knopf', 'le bouton']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Bring die Schritte in die richtige Reihenfolge.', stufe: 1, teile: ['die Sprache wählen', 'das Ziel eingeben', 'die Personen wählen', 'bezahlen', 'Fahrkarte und Wechselgeld herausnehmen'], ordnung: [3, 1, 4, 0, 2] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Man kann nur mit Münzen bezahlen.', false], ['Jugendliche bezahlen oft weniger.', true], ['Man soll den PIN-Code nie fremden Personen geben.', true], ['Das Wechselgeld kommt oben heraus.', false]] },
      ],
    },
    hoeren: {
      was: 'Eine Durchsage im Kaufhaus', wo: 'Kaufhaus „Zentrum“ · Eröffnung', titel: 'Große Eröffnung – tolle Angebote!',
      situation: 'Ein neues Kaufhaus öffnet in Luxemburg-Stadt. Über Lautsprecher hörst du die Angebote des Tages.',
      bild: ['chloe:aufgeregt', 'ben:froh'], sprecher: { Durchsage: 'm1', Chloe: 'w2', Ben: 'm3' },
      text: [
        ['Durchsage', 'Herzlich willkommen im neuen Kaufhaus Zentrum! Heute, zur Eröffnung, haben wir tolle Angebote für Sie.'],
        ['Durchsage', 'Im Erdgeschoss: Kopfhörer für nur neunzehn Euro neunzig – statt neunundzwanzig Euro.'],
        ['Durchsage', 'Im ersten Stock: alle Turnschuhe zwanzig Prozent billiger!'],
        ['Durchsage', 'Und im Café im zweiten Stock: ein Kakao und ein Muffin zusammen für nur drei Euro fünfzig.'],
        ['Durchsage', 'Um fünfzehn Uhr gibt es eine Modenschau mit Jugendmode. Viel Spaß beim Einkaufen!'],
        ['Chloe', 'Ben, hast du gehört? Die Kopfhörer kosten nur neunzehn neunzig!'], ['Ben', 'Ja, aber zuerst gehen wir ins Café. Kakao und Muffin für drei fünfzig – das ist ein Schnäppchen!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Angebot? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwas ist billiger als normal', 'etwas ist kaputt', 'etwas ist gratis für immer'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze die Angebote.', stufe: 1, kopf: ['Wo?', 'Was?', 'Preis / Rabatt'], zeilen: [['Erdgeschoss', '[Kopfhörer]', '[19,90 € statt 29 €]'], ['1. Stock', '[Turnschuhe]', '[20 % billiger]'], ['2. Stock, Café', '[Kakao + Muffin]', '[3,50 €]']] },
        { art: 'mc', auftrag: 'Hör noch einmal. Kreuze an.', stufe: 2, fragen: [{ f: 'Wann ist die Modenschau?', o: ['um 13 Uhr', 'um 15 Uhr', 'um 17 Uhr'], r: 1 }, { f: 'Wohin gehen Chloe und Ben zuerst?', o: ['zu den Kopfhörern', 'ins Café', 'zur Modenschau'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Preis-Spiel: A nennt einen Preis, B schreibt ihn auf. Dann tauscht ihr. Wer ist schneller?', stufe: 3, karten: [
        { titel: 'Preise für A', text: ['3,75 €', '12,99 €', '0,45 €', '108,50 €'] },
        { titel: 'Preise für B', text: ['6,20 €', '49,95 €', '1,10 €', '250,00 €'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Preise sprechen', tabelle: { kopf: ['geschrieben', 'gesprochen'], zeilen: [['0,50 €', 'fünfzig Cent'], ['1,00 €', 'ein Euro'], ['3,50 €', 'drei Euro fünfzig (oder: drei fünfzig)'], ['19,90 €', 'neunzehn Euro neunzig'], ['125 €', 'hundertfünfundzwanzig Euro']] } },
         { titel: 'Anleitungen für Automaten', punkte: ['Oft im **Imperativ**: **Tippe** … **Wähle** … **Nimm** …', 'Oder mit **Infinitiv**: Ziel **eingeben**. Karte **herausnehmen**.', 'Wichtige Wörter: wählen, eingeben, bestätigen, abbrechen, bezahlen'] }],
        [{ art: 'tipp', titel: 'Prozent', text: '**20 % billiger** = 20 von 100 weniger. Ein T-Shirt für 10 € kostet dann nur noch 8 €.' },
         { art: 'achtung', titel: 'Sicher bezahlen', text: 'Deinen **PIN-Code** sagst du niemandem – auch nicht Freunden. Halte beim Eintippen die Hand darüber.' }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Schreib die Preise in Wörtern.', stufe: 1, kopf: ['Preis', 'in Wörtern'], breiten: [25, 75], zeilen: [['2,30 €', '[zwei Euro dreißig]'], ['15,99 €', '[fünfzehn Euro neunundneunzig]'], ['0,75 €', '[fünfundsiebzig Cent]']] },
      { art: 'luecken', auftrag: 'Ergänze die Wörter aus der Anleitung.', stufe: 2, woerter: ['Tippe', 'Gib', 'Wähle', 'Nimm', 'Vergiss'], saetze: ['[Tippe] auf den Bildschirm.', '[Gib] dein Ziel ein.', '[Wähle] die Personen.', '[Nimm] dein Wechselgeld heraus.', '[Vergiss] deine Karte nicht!'] },
      { art: 'fragen', auftrag: 'Rechne: Ein Rucksack kostet 40 €. Heute ist er 25 % billiger. Was kostet er?', stufe: 3, fragen: [{ f: '', l: '40 € – 10 € = 30 €. Er kostet 30 €.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine Anleitung für einen Snack- oder Getränkeautomaten an deiner Schule (4–5 Schritte).', stufe: 2,
        anfaenge: ['1. Wähle …', '2. Wirf …', '3. Drücke …', '4. Nimm …'], zeilen: 7,
        beispiel: '1. Wähle dein Getränk und schau auf die Nummer. 2. Wirf das Geld ein. 3. Tippe die Nummer ein, zum Beispiel 24. 4. Nimm dein Getränk unten heraus. 5. Vergiss dein Wechselgeld nicht!' },
      { art: 'schreiben', auftrag: 'Notiz für eine Freundin: Schreib die drei besten Angebote aus dem Kaufhaus auf.', stufe: 1, zeilen: 3, beispiel: 'Kaufhaus Zentrum: Kopfhörer 19,90 € (statt 29 €) – Turnschuhe 20 % billiger – Kakao + Muffin 3,50 €!' },
    ],
    check: ['Ich verstehe eine Anleitung für einen Automaten.', 'Ich verstehe Angebote in einer Durchsage.', 'Ich sage und schreibe Preise.', 'Ich verstehe Prozent bei Rabatten.', 'Ich schreibe eine kurze Anleitung.'],
  },
  // ================================================================ 4
  {
    thema: 'Mode früher und heute · Präteritum', titel: 'Damals trug man Schlaghosen', untertitel: 'Eine Modedesignerin erzählt, wie sich die Mode verändert hat. Du lernst das Präteritum – die Zeit für Geschichten und Berichte.',
    ziel: { de: 'Ich verstehe ein Interview über Mode und erkenne das Präteritum.', fr: 'Je comprends une interview sur la mode et je reconnais le prétérit.' },
    bild: ['chef:froh:stehen', 'chloe:froh:stehen'],
    start: {
      was: 'Mode in vielen Jahrzehnten',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was glaubst du: Wann war das modern? Verbinde.', stufe: 1, links: ['Schlaghosen und bunte Muster', 'Schulterpolster und Neonfarben', 'weite Jeans und Kapuzenpullis', 'Selfies im Spiegel und Retro-Turnschuhe'], rechts: ['in den 1970er-Jahren', 'in den 1980er-Jahren', 'in den 1990er-Jahren', 'heute'], ordnung: [2, 0, 3, 1] },
      ],
    },
    lesen: {
      was: 'Ein Interview in einer Jugendzeitschrift', art: 'chat', ich: 'Interview', stimmen: { Interview: 'w2', 'Frau Lenz': 'w1' },
      quelle: 'Jugendzeitschrift · Interview', titel: 'Mode ist wie ein Kreis – Gespräch mit der Designerin Rosa Lenz',
      nachrichten: [
        ['Interview', 'Frau Lenz, Sie machen seit vierzig Jahren Mode. Wie hat alles angefangen?'],
        ['Frau Lenz', 'Als Kind nähte ich Kleider für meine Puppen. Meine Mutter zeigte mir die Nähmaschine. Mit 16 machte ich mein erstes eigenes Kleid.'],
        ['Interview', 'Wie war die Mode in Ihrer Jugend?'],
        ['Frau Lenz', 'In den Achtzigern war alles bunt! Wir trugen Neonfarben und große Schulterpolster. Viele Jugendliche färbten ihre Haare. Unsere Eltern fanden das schrecklich.'],
        ['Interview', 'Und heute?'],
        ['Frau Lenz', 'Heute kommt vieles zurück: weite Hosen, alte Turnschuhe, Vintage-Jacken. Mode ist wie ein Kreis. Aber eins ist neu: Viele Jugendliche kaufen gebraucht, auf Flohmärkten oder online. Das finde ich super.'],
        ['Interview', 'Haben Sie einen Tipp für unsere Leser?'], ['Frau Lenz', 'Ja: Tragt, was euch gefällt – nicht, was alle tragen. Stil hat nichts mit dem Preis zu tun.'],
      ],
      woerter: [['nähen', 'coudre'], ['die Nähmaschine', 'la machine à coudre'], ['die Schulterpolster', 'les épaulettes'], ['färben', 'teindre'], ['schrecklich', 'horrible'], ['gebraucht', 'd’occasion'], ['der Flohmarkt', 'le marché aux puces'], ['der Stil', 'le style']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Frau Lenz nähte als Kind Kleider für Puppen.', true], ['In den Achtzigern war die Mode grau und einfach.', false], ['Heute kommen alte Moden zurück.', true], ['Frau Lenz findet: Guter Stil ist teuer.', false]] },
        { art: 'tabelle', auftrag: 'Suche die Verben im Präteritum. Schreib die Grundform.', stufe: 2, kopf: ['Präteritum', 'Grundform'], zeilen: [['nähte', '[nähen]'], ['zeigte', '[zeigen]'], ['machte', '[machen]'], ['färbten', '[färben]']] },
        { art: 'fragen', auftrag: 'Was meint Frau Lenz mit „Mode ist wie ein Kreis“?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Alte Moden kommen nach vielen Jahren wieder zurück.' }] },
      ],
    },
    hoeren: {
      was: 'Hinweis auf eine Ausstellung', wo: 'Radio · Tipp für das Wochenende', titel: 'Ausstellung: 100 Jahre Jugendmode',
      situation: 'Im Radio gibt es einen Tipp für das Wochenende: eine Ausstellung im Museum.',
      bild: ['chloe:froh:handy'], sprecher: { Sprecherin: 'w1' },
      text: [
        ['Sprecherin', 'Unser Tipp für das Wochenende: Im Stadtmuseum gibt es eine neue Ausstellung: „100 Jahre Jugendmode“.'],
        ['Sprecherin', 'Sie zeigt Kleidung von Jugendlichen aus zehn Jahrzehnten – von der Schuluniform bis zum Kapuzenpulli.'],
        ['Sprecherin', 'Besonders spannend: In einem Raum dürft ihr alte Kleidung selbst anprobieren und Fotos machen.'],
        ['Sprecherin', 'Die Ausstellung ist von Dienstag bis Sonntag von zehn bis achtzehn Uhr geöffnet. Montags ist das Museum geschlossen.'],
        ['Sprecherin', 'Der Eintritt kostet für Erwachsene acht Euro. Für Jugendliche unter achtzehn ist er gratis!'],
        ['Sprecherin', 'Am Samstag um vierzehn Uhr gibt es eine kleine Modenschau mit Schülerinnen und Schülern. Viel Spaß!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Welche Informationen braucht man für einen Museumsbesuch? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Öffnungszeiten', 'Eintritt', 'Adresse', 'Lieblingsfarbe der Direktorin'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze den Veranstaltungshinweis.', stufe: 1, kopf: ['', 'Info'], breiten: [30, 70], zeilen: [['Was?', '[Ausstellung „100 Jahre Jugendmode“]'], ['Wo?', '[im Stadtmuseum]'], ['Geöffnet', '[Di–So, 10–18 Uhr; montags geschlossen]'], ['Eintritt', '[Erwachsene 8 €, Jugendliche gratis]'], ['Extra', '[Samstag 14 Uhr Modenschau; Kleidung anprobieren]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Verabredet euch für die Ausstellung. Wann geht ihr? Was kostet es?', stufe: 3, karten: [
        { titel: 'A', text: ['Hast du am Samstag Zeit?', 'Wollen wir in die Ausstellung gehen?', 'Um 14 Uhr ist eine Modenschau.'] },
        { titel: 'B', text: ['Ja, gern! Was kostet der Eintritt?', 'Wann ist das Museum offen?', 'Treffen wir uns um …?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Präteritum (regelmäßige Verben)', tabelle: { kopf: ['', 'machen', 'tragen*'], zeilen: [['ich', 'mach__te__', 'trug'], ['du', 'mach__test__', 'trugst'], ['er / sie', 'mach__te__', 'trug'], ['wir / sie', 'mach__ten__', 'trugen'], ['ihr', 'mach__tet__', 'trugt']] } },
         { titel: 'Wann benutzt man es?', punkte: ['Beim **Schreiben** von Geschichten, Berichten, Biografien.', 'Beim **Sprechen** nimmt man meistens das **Perfekt**.', 'Erkennungszeichen: **-te-**: sie nähte, wir spielten.', '* tragen ist unregelmäßig: trug'] }],
        [{ art: 'tipp', titel: 'Mit der Grammatiktabelle arbeiten', text: 'Hinten im Wörterbuch oder Grammatikheft steht eine **Verbtabelle**: Grundform – Präteritum – Partizip. Zum Beispiel: tragen – **trug** – getragen.' },
         { art: 'achtung', titel: '-ete nach d und t', text: 'arbeiten → arbeit**ete** · warten → wart**ete** · reden → red**ete**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Präteritum.', stufe: 1, saetze: ['(spielen) Früher [spielten] die Kinder draußen.', '(kaufen) Meine Oma [kaufte] ihre Kleider im Laden.', '(machen) Ich [machte] ein Foto.', '(arbeiten) Er [arbeitete] als Schneider.', '(sagen) Sie [sagte]: „Das ist modern!“'] },
      { art: 'tabelle', auftrag: 'Arbeite mit der Verbtabelle: Ergänze.', stufe: 2, hilfe: 'tragen – trug – getragen · finden – fand – gefunden · kommen – kam – gekommen', kopf: ['Grundform', 'Präteritum (er/sie)', 'Perfekt (er/sie)'], zeilen: [['tragen', '[trug]', '[hat getragen]'], ['finden', '[fand]', '[hat gefunden]'], ['kommen', '[kam]', '[ist gekommen]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Frag eine erwachsene Person: Was war in ihrer Jugend modern? Schreib einen kurzen Bericht im Präteritum.', stufe: 2,
        anfaenge: ['In den …-Jahren …', 'Die Jugendlichen trugen …', 'Viele kauften …', 'Die Eltern fanden …', 'Heute …'], zeilen: 9,
        beispiel: 'In den 1990er-Jahren war Mode ganz anders. Die Jugendlichen trugen weite Jeans und Kapuzenpullis. Viele kauften Turnschuhe mit dicken Sohlen. Die Eltern fanden das komisch. Heute sind diese Turnschuhe wieder modern.' },
    ],
    check: ['Ich verstehe ein Interview in einer Zeitschrift.', 'Ich verstehe einen Hinweis auf eine Ausstellung.', 'Ich erkenne das Präteritum (-te-).', 'Ich arbeite mit einer Verbtabelle.', 'Ich schreibe einen kurzen Bericht im Präteritum.'],
  },
  // ================================================================ 5
  {
    thema: 'Marken und Respekt · direkte Rede', titel: '„Die sind ja No-Name!“', untertitel: 'Ein Satz über Turnschuhe – und plötzlich lacht die halbe Klasse. Eine Geschichte über Marken, Mut und Respekt.',
    ziel: { de: 'Ich verstehe eine Geschichte über Mobbing, erkenne direkte Rede und weiß, wo ich Hilfe bekomme.', fr: 'Je comprends une histoire de harcèlement, je reconnais le discours direct et je sais où trouver de l’aide.' },
    bild: ['finn:traurig', 'nele:froh:rollstuhl'],
    start: {
      was: 'Was ist dir wichtig?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist dir bei Kleidung wichtig? Kreuze an. Es gibt kein Richtig oder Falsch.', stufe: 1, fragen: [{ f: '', o: ['bequem', 'billig', 'eine bekannte Marke', 'meine Lieblingsfarbe', 'gut für die Umwelt', 'so wie bei meinen Freunden'], r: -1 }] },
      ],
    },
    lesen: {
      was: 'Eine Geschichte aus der Schülerzeitung', art: 'text', stimme: 'w1',
      quelle: 'Schülerzeitung · Rubrik „Erlebt“ (Namen geändert)', titel: 'Die Turnschuhe',
      absaetze: [
        'Am Montag kam Finn mit neuen Turnschuhen in die Schule. Sie waren weiß und blau. Er war stolz, **denn** er hatte sie selbst ausgesucht.',
        'In der Pause zeigte Tom auf die Schuhe. „Was sind das denn für Schuhe?“, rief er laut. „Die sind ja No-Name! Hat deine Familie kein Geld?“ Ein paar Jungen lachten.',
        'Finn sagte nichts. Er wurde rot und ging weg. Am Dienstag kam er in seinen alten Schuhen. Und am Mittwoch wollte er nicht mehr in die Pause gehen.',
        'Nele hatte alles gesehen. Sie fuhr zu Finn und sagte: „Deine Schuhe sind cool. Und Tom war gemein.“ Dann sprach sie mit Frau Sommer.',
        'Frau Sommer redete in der Klassenstunde mit allen. Sie fragte: „Wie fühlt man sich, wenn alle lachen?“ Am Ende sagte Tom leise: „Es tut mir leid, Finn.“',
        'Finn sagt heute: „Nele hat mir sehr geholfen. Man muss nicht allein bleiben, wenn so etwas passiert.“',
      ],
      woerter: [['die Marke', 'la marque'], ['No-Name', 'sans marque'], ['aussuchen', 'choisir'], ['rufen', 'crier'], ['gemein', 'méchant'], ['rot werden', 'rougir'], ['sich entschuldigen', 's’excuser'], ['der Mut', 'le courage']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Was ist passiert? Bring die Sätze in die richtige Reihenfolge.', stufe: 1, teile: ['Finn kommt stolz mit neuen Schuhen.', 'Tom lacht über die Schuhe.', 'Finn will nicht mehr in die Pause.', 'Nele spricht mit Finn und mit Frau Sommer.', 'Tom entschuldigt sich.'], ordnung: [2, 0, 4, 1, 3] },
        { art: 'mc', auftrag: 'Wie geht es Finn? Kreuze an.', stufe: 2, fragen: [{ f: 'Am Montagmorgen ist Finn …', o: ['stolz', 'wütend', 'müde'], r: 0 }, { f: 'Nach der Pause ist Finn …', o: ['fröhlich', 'traurig und beschämt', 'gelangweilt'], r: 1 }] },
        { art: 'fragen', auftrag: 'Was hat Nele richtig gemacht? Schreib zwei Dinge.', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Sie hat Finn getröstet und gesagt, dass Tom gemein war. Sie hat mit der Lehrerin gesprochen.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch unter Freunden', wo: 'Nach der Schule · an der Bushaltestelle', titel: 'Was hättest du gemacht?',
      situation: 'Lina und Yusuf haben die Geschichte in der Schülerzeitung gelesen. Sie sprechen darüber.',
      bild: ['lina:nachdenklich', 'yusuf:froh'], sprecher: { Lina: 'w2', Yusuf: 'm1' },
      text: [
        ['Lina', 'Hast du die Geschichte mit den Turnschuhen gelesen?'], ['Yusuf', 'Ja. Das war wirklich gemein von Tom.'],
        ['Lina', 'Ich finde Marken nicht so wichtig. Meine Jacke ist vom Flohmarkt, und ich mag sie total.'],
        ['Yusuf', 'Ich habe früher auch nur Marken gewollt. Aber ehrlich: Die Sachen sind oft nur teurer, nicht besser.'],
        ['Lina', 'Was hättest du gemacht, wenn du dabei gewesen wärst?'], ['Yusuf', 'Ich glaube, ich hätte gesagt: „Hör auf, das ist nicht lustig.“ Aber das ist schwer, wenn alle lachen.'],
        ['Lina', 'Ja. Man kann auch später etwas tun. Mit der Person reden. Oder mit einer Lehrerin.'],
        ['Yusuf', 'Und es gibt das Kinder- und Jugendtelefon. Die Nummer ist eins eins sechs, eins eins eins. Das ist kostenlos.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was kann man tun, wenn jemand ausgelacht wird? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['„Hör auf!“ sagen', 'mitlachen', 'später mit der Person reden', 'mit einer Lehrerin sprechen'], r: [0, 2, 3] }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Lina findet Marken sehr wichtig.', false], ['Linas Jacke ist vom Flohmarkt.', true], ['Yusuf sagt: Markensachen sind oft nur teurer.', true], ['Das Jugendtelefon kostet Geld.', false]] },
        { art: 'luecken', auftrag: 'Hör noch einmal. Ergänze.', stufe: 2, saetze: ['„Hör auf, das ist nicht [lustig].“', 'Man kann auch [später] etwas tun.', 'Die Nummer vom Kinder- und Jugendtelefon ist [116 111].'] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Übt Sätze, die helfen. Sprecht sie ruhig und deutlich.', stufe: 3, karten: [
        { titel: 'Stopp sagen', text: ['Hör auf, das ist nicht lustig.', 'Lass ihn / sie in Ruhe.', 'Das ist gemein.'] },
        { titel: 'Hilfe anbieten', text: ['Alles okay? Willst du reden?', 'Komm, wir gehen zusammen.', 'Wir können mit Frau Sommer sprechen.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Direkte Rede markieren', punkte: ['Was jemand **genau** sagt, steht in **Anführungszeichen**: „…“', 'Tom rief: **„Die sind ja No-Name!“**', '**„Es tut mir leid“, sagte Tom.** (Komma nach dem Anführungszeichen)', 'Nach dem Doppelpunkt: **groß** weiter.'] },
         { titel: 'Begleitsatz', tabelle: { kopf: ['vorn', 'hinten'], zeilen: [['Nele sagte: „Deine Schuhe sind cool.“', '„Deine Schuhe sind cool“, sagte Nele.'], ['Er fragte: „Wie geht es dir?“', '„Wie geht es dir?“, fragte er.']] } }],
        [{ art: 'tipp', titel: 'Hilfe holen ist mutig', punkte: ['Rede mit einer Person, der du vertraust.', 'Kinder- und Jugendtelefon: **116 111** (kostenlos, anonym)', 'Im Notfall: **112**'] },
         { art: 'achtung', titel: 'Verben für den Begleitsatz', text: 'sagen · rufen · fragen · antworten · flüstern · erklären – im Präteritum: sagte, rief, fragte, antwortete, flüsterte' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Setze die Anführungszeichen und Satzzeichen richtig.', stufe: 1, saetze: [['Nele sagte deine Schuhe sind cool', 'Nele sagte: „Deine Schuhe sind cool.“'], ['Hör auf rief Lina', '„Hör auf!“, rief Lina.'], ['Frau Sommer fragte wie fühlt man sich', 'Frau Sommer fragte: „Wie fühlt man sich?“']] },
      { art: 'tabelle', auftrag: 'Wer sagt das in der Geschichte? Schreib den Satz als direkte Rede mit Begleitsatz.', stufe: 2, kopf: ['Satz', 'direkte Rede mit Begleitsatz'], breiten: [35, 65], zeilen: [['Es tut mir leid.', '[„Es tut mir leid“, sagte Tom leise.]'], ['Tom war gemein.', '[Nele sagte: „Tom war gemein.“]']] },
      { art: 'fragen', auftrag: 'Was könnte Finn zu Tom sagen? Schreib zwei Sätze als direkte Rede.', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Finn sagte: „Das hat mich verletzt.“ „Danke, dass du dich entschuldigt hast“, sagte er dann.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib das Ende der Geschichte neu: Was passiert, wenn jemand sofort „Stopp“ sagt? Benutze direkte Rede.', stufe: 2,
        anfaenge: ['Tom zeigte auf die Schuhe und rief: „…“', 'Da sagte … : „…“', 'Tom …', 'Finn …'], zeilen: 9,
        beispiel: 'Tom zeigte auf die Schuhe und rief: „Die sind ja No-Name!“ Da sagte Lina laut: „Hör auf, Tom. Das ist nicht lustig.“ Die anderen hörten auf zu lachen. Tom schaute auf den Boden. Finn lächelte Lina an. „Danke“, sagte er.' },
    ],
    check: ['Ich verstehe eine Geschichte über Mobbing.', 'Ich verstehe ein Gespräch über Marken und Respekt.', 'Ich setze Anführungszeichen bei direkter Rede.', 'Ich kenne Sätze, mit denen ich „Stopp“ sage oder Hilfe anbiete.', 'Ich weiß, wo ich Hilfe bekomme (116 111).'],
  },
  // ================================================================ 6
  {
    thema: 'Einkaufsbummel · Texte verbinden', titel: 'Unser Einkaufsbummel', untertitel: 'Ein Samstag in der Stadt: Du liest einen Bericht, hörst ein Beratungsgespräch und erzählst selbst – mit und, weil, dann, danach.',
    ziel: { de: 'Ich berichte über ein Ereignis (Wann? Wo? Was? Warum?) und verbinde Sätze.', fr: 'Je raconte un événement (quand ? où ? quoi ? pourquoi ?) et je relie des phrases.' },
    bild: ['amira:froh:stehen', 'chloe:froh:stehen'],
    start: {
      was: 'Geschäfte',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wo kauft man das? Verbinde.', stufe: 1, links: ['Brot und Brötchen', 'Medikamente', 'Bücher und Comics', 'Turnschuhe', 'Obst und Gemüse'], rechts: ['in der Bäckerei', 'in der Apotheke', 'in der Buchhandlung', 'im Schuhgeschäft', 'auf dem Markt'], ordnung: [3, 0, 4, 1, 2] },
      ],
    },
    lesen: {
      was: 'Ein Bericht über eine Shoppingtour', art: 'text', stimme: 'w2',
      quelle: 'Klassenblog · „Unser Samstag“ – von Amira', titel: 'Ein Samstag in Luxemburg-Stadt',
      absaetze: [
        'Letzten Samstag sind Chloe und ich mit dem Bus nach Luxemburg-Stadt gefahren. Wir wollten ein Geburtstagsgeschenk für Mia kaufen, **denn** sie wird nächste Woche 14.',
        'Zuerst sind wir in eine Buchhandlung gegangen, **weil** Mia Mangas liebt. Leider gab es den neuen Band noch nicht. **Dann** haben wir einen Laden für Bastelsachen gefunden.',
        'Dort hat uns eine Verkäuferin beraten. Wir haben ein Set für Armbänder gekauft – mit bunten Perlen. Es war **billiger als** ein Manga **und** viel kreativer!',
        '**Danach** hatten wir Hunger. Wir haben auf dem Markt Waffeln gegessen **und** Musik von einer Straßenband gehört. **Am Ende** sind wir um 17 Uhr müde, aber glücklich nach Hause gefahren.',
        'Mein Tipp: Macht vorher eine Liste und legt einen Betrag fest. Sonst kauft man zu viel!',
      ],
      woerter: [['der Einkaufsbummel', 'le lèche-vitrines, le shopping'], ['die Buchhandlung', 'la librairie'], ['der Band', 'le tome'], ['beraten', 'conseiller'], ['die Perle', 'la perle'], ['kreativ', 'créatif'], ['die Straßenband', 'le groupe de musique de rue'], ['den Betrag festlegen', 'fixer le montant']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wann? Wo? Was? Warum? Ergänze den Bericht.', stufe: 1, kopf: ['Frage', 'Antwort'], breiten: [25, 75], zeilen: [['Wann?', '[letzten Samstag]'], ['Wo?', '[in Luxemburg-Stadt]'], ['Was?', '[ein Geschenk für Mia kaufen]'], ['Warum?', '[Mia wird nächste Woche 14]']] },
        { art: 'ordnen', auftrag: 'In welcher Reihenfolge war es?', stufe: 2, teile: ['mit dem Bus fahren', 'in die Buchhandlung gehen', 'ein Armband-Set kaufen', 'Waffeln essen', 'nach Hause fahren'], ordnung: [2, 4, 0, 3, 1] },
        { art: 'fragen', auftrag: 'Warum haben sie keinen Manga gekauft?', stufe: 3, fragen: [{ f: '', l: 'Weil es den neuen Band noch nicht gab.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Beratungsgespräch', wo: 'Im Bastelladen', titel: 'Können Sie uns beraten?',
      situation: 'Amira und Chloe suchen ein Geschenk. Die Verkäuferin hilft ihnen.',
      bild: ['verkaeuferin:froh', 'amira:froh'], sprecher: { 'Verkäuferin': 'w1', Amira: 'w2', Chloe: 'w3' },
      text: [
        ['Verkäuferin', 'Hallo ihr zwei! Sucht ihr etwas Bestimmtes?'], ['Amira', 'Ja, ein Geschenk für eine Freundin. Sie wird 14. Können Sie uns beraten?'],
        ['Verkäuferin', 'Gern. Was macht sie gern?'], ['Chloe', 'Sie liest gern und sie ist sehr kreativ. Sie zeichnet viel.'],
        ['Verkäuferin', 'Wie viel möchtet ihr ausgeben?'], ['Amira', 'Höchstens zwanzig Euro.'],
        ['Verkäuferin', 'Dann habe ich zwei Ideen: ein Skizzenbuch mit Stiften für achtzehn Euro oder ein Set für Armbänder für fünfzehn Euro.'],
        ['Chloe', 'Was ist beliebter?'], ['Verkäuferin', 'Das Armband-Set. Damit kann man auch Armbänder für Freunde machen.'],
        ['Amira', 'Super, das nehmen wir. Können Sie es als Geschenk einpacken?'], ['Verkäuferin', 'Natürlich, das ist gratis.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was fragt eine Verkäuferin bei einer Beratung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Was macht die Person gern?', 'Wie viel möchtet ihr ausgeben?', 'Wie alt ist dein Hund?'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Ideen hat die Verkäuferin?', stufe: 1, kopf: ['Idee', 'Preis'], zeilen: [['[Skizzenbuch mit Stiften]', '[18 €]'], ['[Armband-Set]', '[15 €]']] },
        { art: 'mc', auftrag: 'Hör noch einmal. Kreuze an.', stufe: 2, fragen: [{ f: 'Wie viel wollen die Mädchen höchstens ausgeben?', o: ['15 €', '20 €', '25 €'], r: 1 }, { f: 'Was kostet das Einpacken?', o: ['nichts', '1 €', '2 €'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt ein Beratungsgespräch: Ihr sucht ein Geschenk für eine Person (ausgedacht).', stufe: 3, karten: [
        { titel: 'Kundschaft', text: ['Können Sie uns beraten?', 'Die Person mag …', 'Wir möchten höchstens … ausgeben.', 'Können Sie es einpacken?'] },
        { titel: 'Verkauf', text: ['Was macht die Person gern?', 'Wie viel möchtet ihr ausgeben?', 'Ich habe zwei Ideen: …', '… ist beliebter / billiger.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Texte verbinden', punkte: ['**und**: noch etwas dazu', '**weil / denn**: der Grund', '**dann, danach, später**: die Reihenfolge', '**zuerst … am Ende**: Anfang und Schluss', 'Nach **dann/danach** am Satzanfang: Verb an Position 2! **Danach hatten** wir Hunger.'] },
         { titel: 'Ein Bericht', tabelle: { kopf: ['Frage', 'Beispiel'], zeilen: [['Wann?', 'Letzten Samstag …'], ['Wo?', '… in Luxemburg-Stadt'], ['Was?', '… ein Geschenk kaufen'], ['Warum?', '…, weil / denn …'], ['Wie war es?', 'müde, aber glücklich']] } }],
        [{ art: 'tipp', titel: 'Steigerung (Wiederholung)', text: 'billig – billig**er als** – am billig**sten** · beliebt – beliebt**er** – am beliebt**esten** · gut – **besser** – am **besten**' },
         { art: 'achtung', titel: 'Bericht = Perfekt', text: 'Wenn du von gestern erzählst, nimm das **Perfekt**: Wir **sind** gefahren. Wir **haben** gekauft. Bei **sein/haben**: Es **war** toll. Wir **hatten** Hunger.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze: zuerst, dann, danach, am Ende, weil.', stufe: 1, woerter: ['Zuerst', 'Dann', 'Danach', 'Am Ende', 'weil'], saetze: ['[Zuerst] sind wir in die Buchhandlung gegangen.', '[Dann] haben wir einen Bastelladen gefunden.', 'Wir haben Waffeln gegessen, [weil] wir Hunger hatten.', '[Danach] haben wir Musik gehört.', '[Am Ende] sind wir nach Hause gefahren.'] },
      { art: 'abschreiben', auftrag: 'Beginne mit dem Wort in Klammern. Achtung: Verb an Position 2!', stufe: 2, kopf: ['Satz', 'neu'], saetze: [['Wir hatten danach Hunger. (Danach)', 'Danach hatten wir Hunger.'], ['Wir sind dann in den Park gegangen. (Dann)', 'Dann sind wir in den Park gegangen.'], ['Ich habe am Ende ein Eis gekauft. (Am Ende)', 'Am Ende habe ich ein Eis gekauft.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen Bericht über einen Ausflug oder einen Einkaufsbummel (echt oder erfunden). Beantworte: Wann? Wo? Was? Warum? Wie war es?', stufe: 2,
        anfaenge: ['Letzten … bin ich / sind wir …', 'Zuerst …', 'Dann …, weil …', 'Danach …', 'Am Ende …', 'Mein Tipp: …'], zeilen: 11,
        beispiel: 'Letzten Sonntag sind meine Cousine und ich nach Echternach gefahren. Zuerst haben wir den Markt besucht. Dann haben wir ein Eis gegessen, weil es sehr warm war. Danach sind wir am See spazieren gegangen. Am Ende waren wir müde, aber froh. Mein Tipp: Nehmt eine Wasserflasche mit!' },
    ],
    check: ['Ich verstehe einen Bericht über einen Einkaufsbummel.', 'Ich verstehe ein Beratungsgespräch.', 'Ich verbinde Sätze mit und, weil, dann, danach.', 'Ich setze das Verb nach „dann/danach“ an Position 2.', 'Ich berichte mit Wann? Wo? Was? Warum?'],
  },
  // ================================================================ 7
  {
    thema: 'Kleinanzeigen · Kaufen und Verkaufen', titel: 'Zu verkaufen!', untertitel: 'Ein Skateboard, das zu klein ist, eine Gitarre, die niemand spielt: Mit Kleinanzeigen verkaufst und kaufst du gebraucht – aber sicher.',
    ziel: { de: 'Ich verstehe und schreibe Kleinanzeigen und reagiere auf eine Anzeige.', fr: 'Je comprends et j’écris des petites annonces et je réponds à une annonce.' },
    bild: ['lio:froh:handy', 'tom:froh'],
    start: {
      was: 'Abkürzungen in Anzeigen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeuten die Abkürzungen? Verbinde.', stufe: 1, links: ['VB', 'NP', 'Tel.', 'ca.', 'gebr.'], rechts: ['Verhandlungsbasis: über den Preis kann man sprechen', 'Neupreis: so teuer war es neu', 'Telefon', 'circa: ungefähr', 'gebraucht'], ordnung: [3, 0, 4, 1, 2] },
      ],
    },
    lesen: {
      was: 'Kleinanzeigen am Schwarzen Brett', art: 'dokumente', stimme: 'w1',
      quelle: 'Schwarzes Brett im Jugendhaus', titel: 'Kaufen – Verkaufen – Tauschen',
      dokumente: [
        { stil: 'notiz', kopf: 'Skateboard zu verkaufen', text: ['Gebr. Skateboard, 80 cm, schwarz, sehr guter Zustand. Ist mir zu klein geworden. NP 90 €, jetzt **35 € VB**. Lio, Tel. über das Jugendhaus-Team.'] },
        { stil: 'notiz', kopf: 'Suche: Fahrradhelm', text: ['Suche einen Fahrradhelm, Größe M, gern in Rot oder Blau. Zahle bis **15 €**. Melde dich bei Jana (7P1) oder schreib einen Zettel ins Fach.'] },
        { stil: 'notiz', kopf: 'Tausche Comics', text: ['Ich habe 12 Comics (Abenteuer, Fantasy) und möchte sie gegen andere Comics oder Mangas **tauschen**. Kein Geld nötig! Ben, 7P2.'] },
        { stil: 'karte', kopf: '🛡️ Sicher kaufen und verkaufen', text: ['Trefft euch an einem öffentlichen Ort, zum Beispiel im Jugendhaus. Nehmt eine erwachsene Person mit. Gebt keine Adresse und kein Geld im Voraus. Und: Seht euch die Sache genau an, bevor ihr bezahlt.'] },
      ],
      woerter: [['die Kleinanzeige', 'la petite annonce'], ['das Schwarze Brett', 'le tableau d’affichage'], ['der Zustand', 'l’état'], ['tauschen', 'échanger'], ['verhandeln', 'négocier'], ['öffentlich', 'public'], ['im Voraus', 'à l’avance']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ergänze die Tabelle.', stufe: 1, kopf: ['Wer?', 'Was?', 'kaufen, verkaufen oder tauschen?', 'Preis'], zeilen: [['Lio', '[Skateboard]', '[verkaufen]', '[35 € VB]'], ['Jana', '[Fahrradhelm, Größe M]', '[kaufen]', '[bis 15 €]'], ['Ben', '[Comics]', '[tauschen]', '[kein Geld]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Lios Skateboard war neu 90 € teuer.', true], ['Über den Preis vom Skateboard kann man sprechen.', true], ['Ben will seine Comics verkaufen.', false], ['Man soll das Geld im Voraus schicken.', false]] },
        { art: 'fragen', auftrag: 'Nenne zwei Regeln für sicheres Kaufen und Verkaufen.', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'An einem öffentlichen Ort treffen, eine erwachsene Person mitnehmen, kein Geld im Voraus geben.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch über eine Anzeige', wo: 'Im Jugendhaus · Mittwoch', titel: 'Ist das Skateboard noch da?',
      situation: 'Tom hat Lios Anzeige gelesen. Er trifft Lio im Jugendhaus. Eine Betreuerin ist auch da.',
      bild: ['tom:froh', 'lio:froh'], sprecher: { Tom: 'm3', Lio: 'm2', Betreuerin: 'w1' },
      text: [
        ['Tom', 'Hi Lio! Ist das Skateboard aus deiner Anzeige noch da?'], ['Lio', 'Ja! Hier ist es. Schau es dir an.'],
        ['Tom', 'Es sieht gut aus. Die Rollen sind fast neu. Aber hier ist ein Kratzer.'], ['Lio', 'Ja, der ist klein. Man sieht ihn kaum.'],
        ['Tom', 'Du schreibst fünfunddreißig Euro VB. Würdest du es für dreißig verkaufen?'], ['Lio', 'Hm … zweiunddreißig. Und ich gebe dir noch neue Griptape-Streifen dazu.'],
        ['Tom', 'Abgemacht! Ich habe das Geld dabei.'], ['Betreuerin', 'Super, dass ihr das hier im Jugendhaus macht. Gebt euch die Hand – dann ist der Kauf fair.'],
        ['Lio', 'Danke, Tom. Viel Spaß damit!'], ['Tom', 'Danke! Ich probiere es gleich draußen aus.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was prüft man, bevor man etwas Gebrauchtes kauft? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ist es kaputt?', 'Funktioniert alles?', 'Welche Farbe hat das Auto des Verkäufers?'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Was findet Tom am Skateboard?', o: ['einen kleinen Kratzer', 'ein Loch', 'eine kaputte Rolle'], r: 0 }, { f: 'Für wie viel kauft Tom das Skateboard?', o: ['30 €', '32 €', '35 €'], r: 1 }, { f: 'Was bekommt Tom noch dazu?', o: ['einen Helm', 'Griptape-Streifen', 'eine Tasche'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Verhandelt den Preis für einen Gegenstand aus den Anzeigen. Bleibt freundlich.', stufe: 3, karten: [
        { titel: 'Kaufen', text: ['Ist … noch da?', 'Kann ich es mir ansehen?', 'Würdest du es für … verkaufen?', 'Abgemacht!'] },
        { titel: 'Verkaufen', text: ['Ja, hier ist es.', 'Es ist in gutem Zustand.', 'Für … kann ich es dir geben.', 'Dann gebe ich dir noch … dazu.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'So schreibst du eine Kleinanzeige', punkte: ['**Überschrift**: Was? (Verkaufe … / Suche … / Tausche …)', '**Beschreibung**: Größe, Farbe, Zustand', '**Preis**: … € / VB / zu verschenken', '**Kontakt**: über Schule oder Jugendhaus – **keine Privatadresse**!'] },
         { titel: 'Auf eine Anzeige antworten', punkte: ['Hallo …, ich habe deine Anzeige gelesen.', 'Ist … noch da?', 'Ich interessiere mich für …', 'Wann können wir uns treffen? – Im Jugendhaus?'] }],
        [{ art: 'tipp', titel: 'Telegrammstil', text: 'Anzeigen sind kurz: Oft fehlen **Artikel** und **Verb**: „Gebr. Skateboard, schwarz, sehr guter Zustand.“' },
         { art: 'achtung', titel: 'Online verkaufen', text: 'Nur mit Erlaubnis der Eltern. Keine Fotos von dir oder deinem Zuhause. Kein Geld im Voraus. Bei komischen Nachrichten: mit einer erwachsenen Person sprechen.' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Schreib die Anzeige im Telegrammstil (kurz).', stufe: 1, kopf: ['langer Satz', 'Telegrammstil'], saetze: [['Ich verkaufe eine gebrauchte Gitarre. Sie ist braun und in gutem Zustand.', 'Verkaufe gebr. Gitarre, braun, guter Zustand.'], ['Ich suche ein Fahrrad für Jugendliche. Ich bezahle bis zu 50 Euro.', 'Suche Jugendfahrrad, bis 50 €.']] },
      { art: 'fragen', auftrag: 'Antworte kurz auf Janas Anzeige (Fahrradhelm).', stufe: 2, fragen: [{ f: '', zeilen: 3, l: 'Hallo Jana, ich habe einen blauen Fahrradhelm, Größe M. Er ist fast neu. Du kannst ihn für 12 € haben. Wir können uns im Jugendhaus treffen. – Mia' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine Kleinanzeige: Du verkaufst, suchst oder tauschst etwas. Denk an die Sicherheitsregeln.', stufe: 2,
        anfaenge: ['Verkaufe / Suche / Tausche …', 'Farbe, Größe, Zustand: …', 'Preis: …', 'Kontakt: …'], zeilen: 6,
        beispiel: 'Verkaufe Keyboard für Anfänger. Schwarz, 61 Tasten, mit Netzteil, sehr guter Zustand. NP 80 €, jetzt 40 € VB. Kontakt: über das Jugendhaus-Team, fragt nach Nele.' },
    ],
    check: ['Ich verstehe Kleinanzeigen und Abkürzungen (VB, NP).', 'Ich verstehe ein Gespräch über einen Kauf.', 'Ich verhandle freundlich über einen Preis.', 'Ich schreibe eine Kleinanzeige im Telegrammstil.', 'Ich kenne Regeln für sicheres Kaufen und Verkaufen.'],
  },
  // ================================================================ 8
  {
    thema: 'Werbung verstehen · Artikel', titel: 'Kaufen mit Köpfchen', untertitel: '„Nur heute!“, „Alle haben es!“, „Gratis dazu!“: Werbung will, dass du kaufst. Du erkennst die Tricks – und schreibst ehrliche Werbung.',
    ziel: { de: 'Ich erkenne Werbetricks und unterscheide „das Handy“ (eins) und „das Handy“ (alle).', fr: 'Je reconnais les astuces publicitaires et je distingue l’article pour un objet précis ou pour tous.' },
    bild: ['sami:ueberrascht:handy', 'lea:nachdenklich'],
    start: {
      was: 'Werbung überall',
      aufgaben: [
        { art: 'mc', auftrag: 'Wo siehst oder hörst du Werbung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['im Handy / in Apps', 'im Radio', 'auf Plakaten', 'bei Videos', 'in der Zeitung', 'auf Kleidung'], r: [0, 1, 2, 3, 4, 5] }] },
      ],
    },
    lesen: {
      was: 'Drei Werbetexte', art: 'dokumente', stimme: 'w1',
      quelle: 'Werbung (ausgedacht)', titel: 'Kauf mich! – Drei Werbungen',
      dokumente: [
        { stil: 'karte', kopf: '⚡ ZAPP Energy – NUR HEUTE 2 für 1!', text: ['Mehr Power für Schule und Sport! **Alle** coolen Leute trinken ZAPP. Kauf jetzt – morgen ist das Angebot weg!'] },
        { stil: 'karte', kopf: '📱 Handyhülle „Glitzer“ – 9,99 €', text: ['Deine Hülle schützt dein Handy und macht es zum Star. **GRATIS dazu**: ein Glitzer-Sticker. Nur solange der Vorrat reicht!'] },
        { stil: 'karte', kopf: '🍎 Apfelchips „Knusper“', text: ['Aus Äpfeln aus Luxemburg, ohne Zucker. 100 g kosten 2,50 €. Schmecken knusprig – und sind ein guter Snack für die Pause.'] },
      ],
      danach: ['**Werbung arbeitet oft mit Tricks:** Sie macht **Zeitdruck** („Nur heute!“). Sie sagt, **alle** haben es. Sie schenkt **etwas Kleines** dazu. Oder sie zeigt **berühmte Personen**. Frag dich immer: **Brauche ich das wirklich?**'],
      woerter: [['die Werbung', 'la publicité'], ['der Trick', 'l’astuce'], ['der Zeitdruck', 'la pression du temps'], ['schützen', 'protéger'], ['solange der Vorrat reicht', 'dans la limite des stocks'], ['ehrlich', 'honnête'], ['wirklich', 'vraiment']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Welcher Trick steckt in der Werbung? Kreuze an oder schreib.', stufe: 1, kopf: ['Werbung', 'Trick'], breiten: [35, 65], zeilen: [['ZAPP Energy', '[Zeitdruck („nur heute“), alle haben es]'], ['Handyhülle', '[etwas gratis dazu, „solange der Vorrat reicht“]'], ['Apfelchips', '[fast keine Tricks: sachliche Informationen]']] },
        { art: 'fragen', auftrag: 'Welche Werbung findest du am ehrlichsten? Warum?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Die Werbung für Apfelchips, weil sie den Preis und die Zutaten nennt und keinen Druck macht.' }] },
      ],
    },
    hoeren: {
      was: 'Werbespots im Radio', wo: 'Radio · Werbepause', titel: 'Jetzt kommt Werbung!',
      situation: 'Im Radio laufen drei kurze Werbespots. Danach sprechen Sam und Lea darüber.',
      bild: ['sami:froh:handy', 'lea:froh'], sprecher: { Werbung1: 'm1', Werbung2: 'w1', Werbung3: 'm2', Sam: 'm2', Lea: 'w2' },
      text: [
        ['Werbung1', 'Du willst der Star im Team sein? Dann brauchst du die neuen Turnschuhe „Blitz“! Nur diese Woche zwanzig Prozent billiger. Lauf los – bevor sie weg sind!'],
        ['Werbung2', 'Fahrradladen Mersch: Wir reparieren dein Fahrrad schnell und günstig. Ein Check kostet zehn Euro. Montag bis Samstag geöffnet.'],
        ['Werbung3', 'Spiele das neue Handyspiel „Drachenland“ – gratis! Für noch mehr Spaß: Kauf dir Edelsteine im Spiel!'],
        ['Sam', 'Das Spiel ist gratis? Cool!'], ['Lea', 'Gratis zum Herunterladen. Aber dann soll man Edelsteine kaufen. Das kann teuer werden.'],
        ['Sam', 'Stimmt. Und die Turnschuhe – „Star im Team“, haha. Mit Schuhen wird man nicht besser.'], ['Lea', 'Am ehrlichsten war der Fahrradladen. Preis, Öffnungszeiten, fertig.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Werbespot? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine kurze Werbung im Radio oder Fernsehen', 'ein Sportplatz', 'ein Fleck auf der Hose'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was wird beworben? Welcher Trick?', stufe: 1, kopf: ['Spot', 'Produkt', 'Trick?'], zeilen: [['1', '[Turnschuhe „Blitz“]', '[Star sein; nur diese Woche billiger]'], ['2', '[Fahrradreparatur]', '[kein Trick, nur Informationen]'], ['3', '[Handyspiel „Drachenland“]', '[gratis, aber Käufe im Spiel]']] },
        { art: 'mc', auftrag: 'Hör das Gespräch. Welche Werbung finden Sam und Lea am ehrlichsten?', stufe: 2, fragen: [{ f: '', o: ['die Turnschuhe', 'den Fahrradladen', 'das Handyspiel'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Diskutiert: Kauft ihr manchmal Dinge wegen Werbung? Was hilft gegen Werbetricks?', stufe: 3, karten: [
        { titel: 'Meinung', text: ['Ich glaube, Werbung …', 'Manchmal kaufe ich …, weil …', 'Ich finde … nicht ehrlich, denn …'] },
        { titel: 'Tipps', text: ['eine Nacht darüber schlafen', 'Preise vergleichen', 'fragen: Brauche ich das wirklich?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Der Artikel: ein Ding oder alle?', punkte: ['**Ein bestimmtes Ding**: **Das** Handy auf dem Tisch ist neu. (genau dieses)', '**Alle Dinge dieser Art**: **Das** Handy ist heute sehr wichtig. (Handys allgemein)', 'Auch so: **Die** Werbung will, dass wir kaufen. = Werbung allgemein.', 'Oder ohne Artikel: **Werbung** ist überall.'] },
         { titel: 'Werbesprache', tabelle: { kopf: ['Trick', 'Beispiel'], zeilen: [['Zeitdruck', '„Nur heute!“'], ['Alle haben es', '„Alle coolen Leute …“'], ['Geschenk', '„Gratis dazu!“'], ['Superlativ', '„Der beste Saft der Welt!“']] } }],
        [{ art: 'tipp', titel: 'Gratis?', text: 'Viele Spiele und Apps sind „gratis“, verdienen aber Geld mit **Käufen im Spiel** oder mit **deinen Daten**. Sprich mit deinen Eltern, bevor du etwas kaufst.' },
         { art: 'achtung', titel: 'Ehrliche Werbung', text: 'Sie nennt **Preis**, **Inhalt** und **Eigenschaften** – ohne Druck und ohne Übertreibung.' }],
      ],
    },
    ueben: [
      { art: 'mc', auftrag: 'Ein bestimmtes Ding oder alle? Kreuze an.', stufe: 1, fragen: [
        { f: 'Das Fahrrad vor der Tür gehört mir.', o: ['ein bestimmtes', 'alle'], r: 0 },
        { f: 'Das Fahrrad ist gut für die Umwelt.', o: ['ein bestimmtes', 'alle'], r: 1 },
        { f: 'Der Hund ist ein Haustier.', o: ['ein bestimmtes', 'alle'], r: 1 },
        { f: 'Der Hund von Lina heißt Bello.', o: ['ein bestimmtes', 'alle'], r: 0 }] },
      { art: 'abschreiben', auftrag: 'Mach aus der Werbung eine ehrliche Werbung.', stufe: 3, kopf: ['mit Trick', 'ehrlich'], saetze: [['Der BESTE Saft der Welt – nur heute!', 'Orangensaft, 1 Liter, ohne Zucker, 2,20 €.'], ['Alle tragen jetzt diese Mütze!', 'Warme Mütze aus Wolle, in drei Farben, 15 €.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erfinde ein Produkt (z. B. für die Schule) und schreib zwei Werbungen: eine mit Tricks und eine ehrliche.', stufe: 2,
        anfaenge: ['Produkt: …', 'Werbung mit Tricks: „…“', 'Ehrliche Werbung: „…“', 'Ich finde die ehrliche Werbung besser, weil …'], zeilen: 9,
        beispiel: 'Produkt: eine Trinkflasche, die die Temperatur zeigt. Mit Tricks: „NUR HEUTE! Alle Profis trinken aus dieser Flasche!“ Ehrlich: „Trinkflasche aus Metall, 0,5 Liter, zeigt die Temperatur, 14 €.“ Ich finde die ehrliche Werbung besser, weil ich alle wichtigen Informationen bekomme.' },
    ],
    check: ['Ich erkenne Werbetricks in Texten.', 'Ich verstehe Werbespots im Radio.', 'Ich unterscheide: ein bestimmtes Ding oder alle Dinge.', 'Ich weiß: „gratis“ ist nicht immer gratis.', 'Ich schreibe eine ehrliche Werbung.'],
  },
]

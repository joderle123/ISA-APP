// Deutsch · Modul 4 „Kaufen, Mode und Taschengeld“ (Voie de préparation, ≈ A2.1–A2.2) – multimodales Heft.
// Themen und Grammatik nach den öffentlichen „Kompetenzorientierten Bildungsstandards Deutsch für den Modularunterricht“
// (MENFP 2009), Modul 4: Kaufen, Konsumartikel und Modetrends früher und heute, Taschengeld; Begründungen mit weil
// und denn, Possessivpronomen, Präteritum regelmäßiger Verben, Steigerung (Wiederholung), direkte Rede markieren,
// Artikel (bestimmt: ein Ding / allgemein: alle Dinge), Anleitungen für Automaten, Kleinanzeigen, Werbung.
// Lektion 5 (Mobbing wegen Marken): behutsam, ohne Bloßstellen; Hilfe: Kanner- a Jugendtelefon 116 111.
// Persönliches Geld: nur mit ausgedachten Beträgen („Stell dir vor …“) – niemand muss über das eigene Geld sprechen.
// Alle Texte selbst geschrieben, alle Personen und Marken ausgedacht.

export const MODUL = {
  id: 'deutsch-m4', kuerzel: 'de4', nr: 4, sprache: 'de', niveau: 'A2.1', klasse: 'Voie de préparation',
  dateiname: 'Deutsch_Modul-4',
  fach: { de: 'Deutsch', fr: 'Allemand' },
  titel: { de: 'Kaufen, Mode und Taschengeld', fr: 'Acheter, mode et argent de poche' },
  untertitel: { de: 'Taschengeld, Automaten, Kleinanzeigen, Mode früher und heute und Werbetricks: lesen, hören, sprechen und schreiben – in acht Lektionen.', fr: 'Argent de poche, distributeurs, petites annonces, la mode d’hier et d’aujourd’hui et les astuces de la pub : lire, écouter, parler et écrire – en huit leçons.' },
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
]

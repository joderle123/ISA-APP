// Deutsch · Modul 3 „Andere Länder, andere Sitten“ (Voie de préparation, ≈ A2.1) – multimodales Heft.
// Themen und Grammatik nach den öffentlichen „Kompetenzorientierten Bildungsstandards Deutsch für den Modularunterricht“
// (MENFP 2009), Modul 3: andere Länder, Essen und Trinken, Kleidung, Familie und Schule früher und heute;
// persönlicher Brief, Höflichkeit in der Anrede, bestimmter/unbestimmter Artikel, Adjektive und Steigerung,
// eingewanderte Wörter, Modalverben (Bedeutung, Verneinung von müssen/dürfen, Präteritum), Zeitangaben (vor, nach,
// in, seit; gestern, damals …), Erweiterung des Perfekts, Rezepte und Hausordnungen verstehen.
// Alle Texte selbst geschrieben, alle Personen ausgedacht. Fakten (Tiere, Feste, Rezept) nur allgemein bekannt und einfach.

export const MODUL = {
  id: 'deutsch-m3', kuerzel: 'de3', nr: 3, sprache: 'de', niveau: 'A2.1', klasse: 'Voie de préparation',
  dateiname: 'Deutsch_Modul-3',
  fach: { de: 'Deutsch', fr: 'Allemand' },
  titel: { de: 'Andere Länder, andere Sitten', fr: 'Autres pays, autres mœurs' },
  untertitel: { de: 'Briefe aus dem Ausland, Kleidung und Schnäppchen, Rezepte, Regeln und Schule früher: lesen, hören, sprechen und schreiben – in acht Lektionen.', fr: 'Lettres de l’étranger, vêtements et bonnes affaires, recettes, règles et l’école autrefois : lire, écouter, parler et écrire – en huit leçons.' },
  farben: { tief: '#b4432e', mittel: '#eaa38f', zart: '#fbefe9', dunkel: '#7e2b1c' },
  deckbild: ['opa:froh:stehen', 'mia:froh:laessig', 'yusuf:froh:stehen-zeigen'],
  blasen: [{ t: 'Olá!', x: 18, y: 112 }, { t: 'Früher …', x: 144, y: 100 }, { t: 'Lecker!', x: 120, y: 150 }],
  themen: [
    { titel: { de: 'Andere Länder', fr: 'Autres pays' }, icon: 'world', lektionen: 1 },
    { titel: { de: 'Kleidung, Tiere, Vergleiche', fr: 'Vêtements, animaux, comparaisons' }, icon: 'shirt', lektionen: 2 },
    { titel: { de: 'Essen und Trinken', fr: 'Manger et boire' }, icon: 'tools-kitchen-2', lektionen: 1 },
    { titel: { de: 'Regeln, früher und heute', fr: 'Règles, autrefois et aujourd’hui' }, icon: 'clock', lektionen: 3 },
    { titel: { de: 'Feste', fr: 'Fêtes' }, icon: 'confetti', lektionen: 1 },
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
    thema: 'Ein persönlicher Brief', titel: 'Liebe Grüße aus Porto', untertitel: 'Die 7P2 schreibt mit einer Klasse in Portugal. Rita erzählt, wie sie Geburtstag feiert – und stellt viele Fragen.',
    ziel: { de: 'Ich verstehe einen persönlichen Brief und antworte höflich.', fr: 'Je comprends une lettre personnelle et je réponds poliment.' },
    bild: ['amira:froh:laptop', 'mia:froh'],
    start: {
      was: 'Anrede und Gruß',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wie beginnt man, wie endet man? Verbinde.', stufe: 1, links: ['an eine Freundin', 'an einen Freund', 'an die Lehrerin', 'an eine Firma'], rechts: ['Liebe Rita, … Viele Grüße', 'Lieber Tom, … Bis bald!', 'Liebe Frau Sommer, … Viele Grüße', 'Sehr geehrte Damen und Herren, … Mit freundlichen Grüßen'], ordnung: [2, 0, 3, 1] },
      ],
    },
    lesen: {
      was: 'Eine E-Mail aus Portugal', art: 'dokumente', stimme: 'w2',
      quelle: 'Klassenbriefwechsel · E-Mail', titel: 'Post aus Porto',
      dokumente: [
        { stil: 'nachricht', kopf: 'Von: Rita · An: Klasse 7P2 · Betreff: Mein Geburtstag 🎂', stimme: 'w2', text: [
          'Liebe Mia, liebe 7P2,',
          'vielen Dank für euren Brief und die Fotos! Ich habe sie meiner Klasse gezeigt. Alle finden euer Schulgebäude sehr modern.',
          'Letzte Woche bin ich 13 geworden. Bei uns in Portugal singt man „Parabéns a você“ – das ist unser Geburtstagslied. Meine Oma hat einen großen Kuchen gebacken, mit Schokolade und Orangen. Am Abend sind meine Cousins gekommen, und wir haben bis Mitternacht gefeiert. Zum Geburtstag habe ich ein Fahrrad bekommen!',
          'In Porto ist es jetzt schon warm. Am Wochenende gehen wir oft an den Strand. Das Wasser ist aber noch sehr kalt, brrr!',
          'Jetzt habe ich Fragen an euch: Wie feiert ihr Geburtstag in Luxemburg? Was esst ihr gern? Und stimmt es, dass ihr drei Sprachen in der Schule lernt?',
          'Schreibt mir bald!'],
          gruss: 'Liebe Grüße, eure Rita' },
      ],
      woerter: [['der Briefwechsel', 'la correspondance'], ['das Gebäude', 'le bâtiment'], ['das Lied', 'la chanson'], ['bekommen', 'recevoir'], ['die Mitternacht', 'minuit'], ['der Strand', 'la plage'], ['stimmt es, dass …?', 'est-il vrai que … ?']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Rita ist 13 Jahre alt geworden.', true], ['Ritas Mutter hat den Kuchen gebacken.', false], ['Rita hat ein Fahrrad bekommen.', true], ['Das Wasser am Strand ist schon warm.', false], ['Rita stellt der Klasse drei Fragen.', true]] },
        { art: 'tabelle', auftrag: 'Wie feiert Rita Geburtstag? Ergänze.', stufe: 2, kopf: ['', 'bei Rita'], breiten: [30, 70], zeilen: [['Lied', '[„Parabéns a você“]'], ['Kuchen', '[mit Schokolade und Orangen, von der Oma]'], ['Gäste', '[die Cousins]'], ['Geschenk', '[ein Fahrrad]']] },
        { art: 'fragen', auftrag: 'Beantworte Ritas Fragen für dich. Je ein Satz.', stufe: 3, fragen: [{ f: 'Wie feiert ihr Geburtstag?', l: 'Wir essen Kuchen und ich lade Freunde ein.' }, { f: 'Was esst ihr gern?', l: 'Wir essen gern Pizza und Gromperekichelcher.' }, { f: 'Lernt ihr drei Sprachen?', l: 'Ja, wir lernen Deutsch, Französisch und Englisch – und sprechen Luxemburgisch.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Telefoninterview im Radio', wo: 'Jugendradio · Rubrik „Ruf mal an!“', titel: 'Wie lebt man in Montreal?',
      situation: 'Das Jugendradio ruft Jugendliche in anderen Ländern an. Heute: Léa (14) in Montreal, Kanada.',
      bild: ['chloe:froh:handy', 'finn:froh:handy'], sprecher: { Moderator: 'm1', 'Léa': 'w2' },
      text: [
        ['Moderator', 'Hallo Léa! Kannst du mich gut hören?'], ['Léa', 'Ja, sehr gut! Hallo nach Luxemburg!'],
        ['Moderator', 'Du wohnst in Montreal. Welche Sprache sprichst du dort?'], ['Léa', 'Zu Hause und in der Schule spreche ich Französisch. Aber viele Leute sprechen auch Englisch.'],
        ['Moderator', 'Und was machst du gern in deiner Freizeit?'], ['Léa', 'Im Winter gehe ich Schlittschuh laufen. Hier ist es im Winter sehr kalt – manchmal minus zwanzig Grad!'],
        ['Moderator', 'Minus zwanzig? Wow! Und was machst du nicht so gern?'], ['Léa', 'Ich mag keine langen Busfahrten. Meine Schule ist weit weg. Ich fahre jeden Tag fünfzig Minuten.'],
        ['Moderator', 'Hast du ein Lieblingsessen?'], ['Léa', 'Ja, Pancakes mit Ahornsirup! Den Sirup macht man hier aus einem Baum.'],
        ['Moderator', 'Lecker! Danke, Léa, und viele Grüße nach Kanada!'], ['Léa', 'Danke! Tschüss!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was weißt du über Kanada? Kreuze an, was du glaubst.', stufe: 1, fragen: [{ f: '', o: ['Im Winter ist es sehr kalt.', 'Man spricht dort Französisch und Englisch.', 'Kanada liegt in Afrika.'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was macht Léa gern? Was nicht so gern?', stufe: 1, kopf: ['gern 👍', 'nicht so gern 👎'], zeilen: [['[Schlittschuh laufen; Pancakes mit Ahornsirup essen]', '[lange Busfahrten]']] },
        { art: 'mc', auftrag: 'Hör noch einmal. Kreuze an.', stufe: 2, fragen: [{ f: 'Welche Sprache spricht Léa zu Hause?', o: ['Englisch', 'Französisch', 'Deutsch'], r: 1 }, { f: 'Wie kalt ist es manchmal im Winter?', o: ['minus 2 Grad', 'minus 12 Grad', 'minus 20 Grad'], r: 2 }, { f: 'Wie lange fährt Léa zur Schule?', o: ['15 Minuten', '50 Minuten', '2 Stunden'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Ihr seid das Radio. Interviewt euch: Was macht ihr gern in der Freizeit, was nicht?', stufe: 3, karten: [
        { titel: 'Fragen', text: ['Kannst du mich gut hören?', 'Was machst du gern in deiner Freizeit?', 'Was machst du nicht so gern?', 'Hast du ein Lieblingsessen?'] },
        { titel: 'Nachfragen', text: ['Wie bitte? Kannst du das wiederholen?', 'Hast du mich verstanden?', 'Meinst du …?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Höflich anreden', tabelle: { kopf: ['an …', 'Anfang', 'Ende'], zeilen: [['Freunde', 'Liebe Rita, / Lieber Tom, / Hallo …,', 'Viele Grüße · Bis bald!'], ['Lehrer/innen', 'Liebe Frau Sommer, / Lieber Herr Kuedes,', 'Viele Grüße'], ['Unbekannte', 'Sehr geehrte Frau …, / Sehr geehrter Herr …,', 'Mit freundlichen Grüßen']] } },
         { titel: 'du – ihr – Sie', punkte: ['**du**: Freunde, Familie, Kinder', '**ihr**: mehrere Freunde: Wie feiert **ihr**?', '**Sie**: Erwachsene, die du nicht gut kennst', 'In Briefen nach der Anrede: Komma, dann **klein** weiter.'] }],
        [{ art: 'tipp', titel: 'Bei Unklarheiten nachfragen', punkte: ['Wie bitte? · Kannst du das bitte wiederholen?', 'Was bedeutet …?', 'Hast du mich verstanden?'] },
         { art: 'achtung', titel: 'Nach der Anrede', text: 'Liebe Rita**,** – neue Zeile – **v**ielen Dank für … (klein!). Am Ende **kein** Punkt nach dem Gruß.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Anrede: Liebe, Lieber, Sehr geehrte, Sehr geehrter.', stufe: 1, saetze: ['[Lieber] Noah,', '[Liebe] Oma,', '[Sehr geehrte] Frau Weber,', '[Sehr geehrter] Herr Laurent,', '[Liebe] Lina und lieber Ben,'] },
      { art: 'tabelle', auftrag: 'du, ihr oder Sie? Schreib die Frage richtig.', stufe: 2, kopf: ['Situation', 'Frage'], breiten: [40, 60], zeilen: [['an deine Freundin', '[Wann hast du Geburtstag?]'], ['an zwei Freunde', '[Wann habt ihr Geburtstag?]'], ['an die Direktorin', '[Wann haben Sie Zeit?]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Antworte Rita: Bedanke dich, beantworte ihre Fragen und stell selbst zwei Fragen.', stufe: 2,
        anfaenge: ['Liebe Rita,', 'vielen Dank für …', 'Bei uns in Luxemburg …', 'Wir essen gern …', 'In der Schule lernen wir …', 'Jetzt habe ich Fragen: …', 'Liebe Grüße'], zeilen: 12,
        beispiel: 'Liebe Rita, vielen Dank für deine E-Mail! Bei uns in Luxemburg singt man zum Geburtstag „Happy Birthday“ oder ein Lied auf Luxemburgisch. Wir essen gern Pizza und Gromperekichelcher. In der Schule lernen wir Deutsch, Französisch und Englisch. Jetzt habe ich Fragen: Was machst du in den Ferien? Hast du Haustiere? Liebe Grüße, Mia' },
    ],
    check: ['Ich verstehe einen persönlichen Brief.', 'Ich verstehe ein Telefoninterview im Radio.', 'Ich beginne und beende Briefe richtig.', 'Ich unterscheide du, ihr und Sie.', 'Ich frage nach, wenn ich etwas nicht verstehe.'],
  },
  // ================================================================ 2
  {
    thema: 'Kleidung · Adjektive', titel: 'Die rote Jacke, bitte!', untertitel: 'Ein Prospekt, ein Verkaufsgespräch, eine Lieblingsjeans: Mit Adjektiven sagst du, wie etwas ist – und was es kostet.',
    ziel: { de: 'Ich beschreibe Kleidung mit Adjektiven und kaufe etwas ein.', fr: 'Je décris des vêtements avec des adjectifs et je fais un achat.' },
    bild: ['mia:froh:stehen', 'verkaeuferin:froh:stehen'],
    start: {
      was: 'Kleidung',
      aufgaben: [
        { art: 'symbole', auftrag: 'Wie heißen die Kleidungsstücke? Schreib das Wort mit Artikel.', stufe: 1, woerter: ['das T-Shirt', 'die Jacke', 'die Schuhe', 'die Schleife', 'die Tasche', 'der Kleiderbügel'],
          symbole: [['shirt', 'das T-Shirt'], ['jacket', 'die Jacke'], ['shoe', 'die Schuhe'], ['ribbon-health', 'die Schleife'], ['briefcase', 'die Tasche'], ['hanger', 'der Kleiderbügel']] },
      ],
    },
    lesen: {
      was: 'Ein Werbeprospekt', art: 'dokumente', stimme: 'w1',
      quelle: 'Prospekt · Laden „Kleiderkiste“ in Mersch', titel: 'Frühlings-Angebote!',
      dokumente: [
        { stil: 'karte', kopf: '🧥 Regenjacke „Wind“ – nur 39 €', text: ['Leicht, wasserdicht und mit großer Kapuze. In **Rot**, **Gelb** und **Dunkelblau**. Größen S bis XL. Perfekt für den Schulweg!'] },
        { stil: 'karte', kopf: '👖 Jeans „Classic“ – 29 € statt 45 €', text: ['Bequeme, weite Jeans aus Bio-Baumwolle. Hell- oder Dunkelblau. Nur diese Woche **35 % billiger**!'] },
        { stil: 'karte', kopf: '👟 Turnschuhe „Sprint“ – 55 €', text: ['Weiß mit grünen Streifen. Sehr leicht und gut für Sport. Größen 36 bis 45.'] },
        { stil: 'notiz', kopf: 'ℹ️ Gut zu wissen', text: ['Umtausch innerhalb von 14 Tagen – nur mit Kassenzettel. Öffnungszeiten: Montag bis Samstag, 9 bis 18 Uhr.'] },
      ],
      woerter: [['das Angebot', 'l’offre'], ['wasserdicht', 'imperméable'], ['die Kapuze', 'la capuche'], ['bequem', 'confortable'], ['weit / eng', 'large / serré'], ['die Baumwolle', 'le coton'], ['billiger', 'moins cher'], ['der Umtausch', 'l’échange'], ['der Kassenzettel', 'le ticket de caisse']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Lies den Prospekt. Ergänze die Tabelle.', stufe: 1, kopf: ['Produkt', 'Preis', 'Farben', 'Gut für …'], zeilen: [['Regenjacke', '[39 €]', '[Rot, Gelb, Dunkelblau]', '[Schulweg, Regen]'], ['Jeans', '[29 €]', '[Hell- oder Dunkelblau]', '[jeden Tag, bequem]'], ['Turnschuhe', '[55 €]', '[Weiß mit Grün]', '[Sport]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Die Jeans kostet normal 45 €.', true], ['Die Turnschuhe gibt es nur in Größe 36.', false], ['Man kann ohne Kassenzettel umtauschen.', false], ['Am Sonntag ist der Laden geschlossen.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Verkaufsgespräch', wo: 'Im Laden „Kleiderkiste“', titel: 'Haben Sie die Jacke auch in Gelb?',
      situation: 'Mia sucht eine Regenjacke. Sie spricht mit der Verkäuferin.',
      bild: ['mia:froh', 'verkaeuferin:froh'], sprecher: { 'Verkäuferin': 'w1', Mia: 'w2' },
      text: [
        ['Verkäuferin', 'Guten Tag! Kann ich dir helfen?'], ['Mia', 'Ja, gern. Ich suche eine Regenjacke. Die Jacke „Wind“ aus dem Prospekt.'],
        ['Verkäuferin', 'Ah ja, die ist sehr beliebt. Welche Größe hast du?'], ['Mia', 'Größe S, glaube ich.'],
        ['Verkäuferin', 'Hier ist eine rote Jacke in S.'], ['Mia', 'Hm, Rot gefällt mir nicht so. Haben Sie die Jacke auch in Gelb?'],
        ['Verkäuferin', 'Ja, hier. Möchtest du sie anprobieren? Die Umkleide ist dort hinten.'],
        ['Mia', 'Ja, danke. … Sie ist ein bisschen zu klein. Die Ärmel sind zu kurz.'], ['Verkäuferin', 'Dann probier doch die Größe M.'],
        ['Mia', 'Die passt perfekt! Was kostet sie?'], ['Verkäuferin', 'Neununddreißig Euro.'], ['Mia', 'Gut, die nehme ich.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was sagt man im Kleidergeschäft? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Kann ich das anprobieren?', 'Haben Sie das auch in Blau?', 'Ein Kilo Äpfel, bitte.'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Welche Farbe mag Mia nicht so?', o: ['Rot', 'Gelb', 'Blau'], r: 0 }, { f: 'Welche Größe kauft Mia?', o: ['S', 'M', 'L'], r: 1 }, { f: 'Was kostet die Jacke?', o: ['29 €', '39 €', '49 €'], r: 1 }] },
        { art: 'luecken', auftrag: 'Hör noch einmal und ergänze.', stufe: 2, saetze: ['Möchtest du sie [anprobieren]?', 'Die [Umkleide] ist dort hinten.', 'Die Ärmel sind zu [kurz].', 'Die passt [perfekt]!'] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt ein Verkaufsgespräch mit dem Prospekt.', stufe: 3, karten: [
        { titel: 'Kundin / Kunde', text: ['Ich suche …', 'Haben Sie … auch in …?', 'Kann ich … anprobieren?', 'Was kostet …? – Das nehme ich.'] },
        { titel: 'Verkäufer / Verkäuferin', text: ['Kann ich dir helfen?', 'Welche Größe hast du?', 'Die Umkleide ist …', 'Das kostet … Euro.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Adjektive', punkte: ['Adjektive sagen, **wie** etwas ist: **leicht**, **bequem**, **rot**.', 'Nach **sein**: ohne Endung: Die Jacke ist **gelb**.', 'Vor dem Nomen: mit Endung: die **gelb__e__** Jacke.', '**zu** + Adjektiv = nicht gut: zu klein, zu teuer.'] },
         { titel: 'bestimmt – unbestimmt', tabelle: { kopf: ['', 'unbestimmt', 'bestimmt'], zeilen: [['der', 'ein Pullover', 'der Pullover'], ['die', 'eine Jacke', 'die Jacke'], ['das', 'ein Kleid', 'das Kleid'], ['viele', '– Schuhe', 'die Schuhe']] } }],
        [{ art: 'tipp', titel: 'ein oder der?', text: 'Neu, noch unbekannt: Ich suche **eine** Jacke. Schon bekannt: **Die** Jacke ist zu klein. Im Laden: Ich nehme **die** gelbe Jacke.' },
         { art: 'achtung', titel: 'Kleidung: gefallen und passen', text: 'Die Jacke **gefällt** mir. (Ich finde sie schön.) · Die Jacke **passt** mir. (Sie hat die richtige Größe.)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: '„ein/eine“ oder „der/die/das“? Ergänze.', stufe: 1, saetze: ['Ich suche [eine] Jacke. [Die] Jacke soll gelb sein.', 'Hast du [ein] neues Handy? – Ja, [das] Handy ist super.', 'Mia kauft [einen] Pullover. [Der] Pullover ist blau.'] },
      { art: 'luecken', auftrag: 'Ergänze ein passendes Adjektiv: zu klein, zu teuer, bequem, wasserdicht, leicht.', stufe: 2, saetze: ['Die Schuhe kosten 120 €. Sie sind [zu teuer].', 'Die Jacke hält den Regen ab. Sie ist [wasserdicht].', 'Die Hose ist weich und weit. Sie ist [bequem].', 'Die Ärmel sind zu kurz. Die Jacke ist [zu klein].', 'Die Tasche wiegt fast nichts. Sie ist [leicht].'] },
      { art: 'fragen', auftrag: 'Gefällt es dir? Passt es dir? Schreib zu jedem Satz eine Antwort mit „gefallen“ oder „passen“.', stufe: 3, fragen: [{ f: 'Die Farbe ist super!', l: 'Die Farbe gefällt mir.' }, { f: 'Die Schuhe sind zu groß.', l: 'Die Schuhe passen mir nicht.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreib dein Lieblingskleidungsstück: Was ist es? Wie sieht es aus? Warum magst du es?', stufe: 2,
        anfaenge: ['Mein Lieblingskleidungsstück ist …', 'Es / Sie ist …', 'Ich habe es … gekauft / bekommen.', 'Ich trage es gern, weil …'], zeilen: 7,
        beispiel: 'Mein Lieblingskleidungsstück ist meine alte Jeans. Sie ist hellblau und sehr bequem. Ich habe sie vor zwei Jahren in Trier gekauft. Ich trage sie fast jeden Tag, weil sie so weich ist.' },
    ],
    check: ['Ich verstehe einen Werbeprospekt.', 'Ich verstehe ein Verkaufsgespräch.', 'Ich beschreibe Kleidung mit Adjektiven.', 'Ich weiß, wann „ein“ und wann „der“.', 'Ich kaufe höflich etwas ein.'],
  },
  // ================================================================ 3
  {
    thema: 'Vergleichen · Tiere', titel: 'Größer, schneller, am schnellsten', untertitel: 'Welches Tier ist das schnellste? Wo ist die Jacke billiger? Mit der Steigerung vergleichst du alles.',
    ziel: { de: 'Ich vergleiche mit „größer als“ und „am größten“ und beschreibe Tiere.', fr: 'Je compare avec « plus … que » et « le plus … » et je décris des animaux.' },
    bild: ['finn:ueberrascht', 'nele:froh:rollstuhl'],
    start: {
      was: 'Tiere',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Tier ist das? Verbinde.', stufe: 1, links: ['Es hat einen sehr langen Hals.', 'Es hat einen Rüssel und ist grau.', 'Es lebt im Meer und ist riesig.', 'Es hängt im Baum und ist sehr langsam.', 'Es hat Flecken und läuft sehr schnell.'], rechts: ['die Giraffe', 'der Elefant', 'der Blauwal', 'das Faultier', 'der Gepard'], ordnung: [3, 0, 4, 1, 2] },
      ],
    },
    lesen: {
      was: 'Tier-Rekorde', art: 'text', stimme: 'w1',
      quelle: 'Wissensmagazin für Jugendliche', titel: 'Wer ist der Champion?',
      absaetze: [
        'Der **Gepard** ist das **schnellste** Landtier. Auf kurzen Strecken läuft er über 100 Kilometer pro Stunde – **schneller als** ein Auto in der Stadt! Aber er wird schnell müde.',
        'Die **Giraffe** ist das **höchste** Tier. Sie wird über fünf Meter groß. Mit ihrem langen Hals frisst sie Blätter oben in den Bäumen. Dort kommen andere Tiere nicht hin.',
        'Der **Elefant** ist das **schwerste** Landtier. Ein Afrikanischer Elefant wiegt so viel wie vier Autos. Er hat **größere** Ohren **als** der Asiatische Elefant.',
        'Aber der **größte** Champion lebt im Meer: der **Blauwal**. Er ist **länger als** ein Bus und **schwerer als** jedes andere Tier – auch als die Dinosaurier!',
        'Und das **langsamste**? Das **Faultier**. Es schläft viele Stunden am Tag und bewegt sich ganz langsam. Langweilig? Nein, so spart es Energie!',
      ],
      woerter: [['das Landtier', 'l’animal terrestre'], ['die Strecke', 'la distance'], ['der Hals', 'le cou'], ['fressen', 'manger (animal)'], ['wiegen', 'peser'], ['schwer', 'lourd'], ['sich bewegen', 'bouger'], ['Energie sparen', 'économiser de l’énergie']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Welches Tier hat welchen Rekord?', stufe: 1, kopf: ['Rekord', 'Tier'], breiten: [55, 45], zeilen: [['das schnellste Landtier', '[der Gepard]'], ['das höchste Tier', '[die Giraffe]'], ['das schwerste Landtier', '[der Elefant]'], ['das größte Tier', '[der Blauwal]'], ['das langsamste Tier (im Text)', '[das Faultier]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Der Gepard läuft lange Zeit sehr schnell.', false], ['Die Giraffe frisst Blätter oben in den Bäumen.', true], ['Ein Elefant wiegt so viel wie vier Autos.', true], ['Der Blauwal ist kürzer als ein Bus.', false]] },
        { art: 'fragen', auftrag: 'Welches Tier findest du am interessantesten? Warum?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Das Faultier finde ich am interessantesten, weil es so langsam und entspannt ist.' }] },
      ],
    },
    hoeren: {
      was: 'Schnäppchen vergleichen', wo: 'Sprachnachricht · Samstag', titel: 'Wo ist es billiger?',
      situation: 'Yusuf will Kopfhörer kaufen. Er schickt Amira eine Sprachnachricht. Amira antwortet.',
      bild: ['yusuf:froh:handy', 'amira:froh:handy'], sprecher: { Yusuf: 'm1', Amira: 'w2' },
      text: [
        ['Yusuf', 'Hi Amira! Ich bin in der Stadt und suche Kopfhörer. Im Elektroladen kosten sie 49 Euro. Im Kaufhaus kosten die gleichen Kopfhörer 45 Euro. Im Kaufhaus sind sie also billiger.'],
        ['Yusuf', 'Aber im Elektroladen bekomme ich eine Tasche dazu. Was meinst du? Wo soll ich sie kaufen?'],
        ['Amira', 'Hi Yusuf! Schau mal im Internet. Im Online-Shop kosten sie nur 39 Euro – am billigsten!'],
        ['Amira', 'Aber Achtung: Der Versand kostet 6 Euro. Dann sind es auch 45 Euro, und du musst drei Tage warten.'],
        ['Amira', 'Ich finde: Das Kaufhaus ist am besten. Der Preis ist gut, und du hast die Kopfhörer sofort. Die Tasche brauchst du doch nicht, oder?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Schnäppchen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwas Gutes, das wenig kostet', 'ein kleiner Hund', 'ein teures Geschenk'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wie viel kosten die Kopfhörer?', stufe: 1, kopf: ['Elektroladen', 'Kaufhaus', 'Online-Shop'], zeilen: [['[49 € + Tasche]', '[45 €]', '[39 € + 6 € Versand]']] },
        { art: 'mc', auftrag: 'Hör noch einmal. Kreuze an.', stufe: 2, fragen: [{ f: 'Wo sind die Kopfhörer am billigsten (ohne Versand)?', o: ['im Elektroladen', 'im Kaufhaus', 'im Online-Shop'], r: 2 }, { f: 'Was empfiehlt Amira?', o: ['das Kaufhaus', 'den Online-Shop', 'den Elektroladen'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Vergleicht: Wo würdet ihr kaufen? Warum?', stufe: 3, karten: [
        { titel: 'Vergleichen', text: ['… ist billiger als …', '… ist am billigsten.', 'Im … geht es schneller.'] },
        { titel: 'Meinung sagen', text: ['Ich finde … am besten, weil …', 'Ich würde … kaufen.', 'Das stimmt, aber …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Die Steigerung', tabelle: { kopf: ['Grundform', 'Komparativ (+er)', 'Superlativ (am …sten)'], zeilen: [['schnell', 'schnell__er__', 'am schnell__sten__'], ['billig', 'billig__er__', 'am billig__sten__'], ['groß', 'gr__ö__ß__er__', 'am gr__ö__ß__ten__'], ['lang', 'l__ä__ng__er__', 'am l__ä__ng__sten__']] } },
         { titel: 'Vergleichen', punkte: ['**gleich**: so groß **wie** …', '**anders**: größer **als** …', 'Der Gepard ist schnell**er als** ein Auto.', 'Der Blauwal ist **so** schwer **wie** 30 Elefanten.'] }],
        [{ art: 'achtung', titel: 'Unregelmäßig!', text: 'gut – **besser** – am **besten** · viel – **mehr** – am **meisten** · gern – **lieber** – am **liebsten** · hoch – **höher** – am **höchsten**' },
         { art: 'tipp', titel: 'Vor dem Nomen', text: 'das **schnellste** Tier · der **größte** Wal · die **billigste** Jacke – mit Artikel und Endung **-e**.' }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Ergänze die Tabelle.', stufe: 1, kopf: ['Grundform', 'Komparativ', 'Superlativ'], zeilen: [['klein', '[kleiner]', '[am kleinsten]'], ['teuer', '[teurer]', '[am teuersten]'], ['alt', '[älter]', '[am ältesten]'], ['gut', '[besser]', '[am besten]']] },
      { art: 'luecken', auftrag: '„als“ oder „wie“? Ergänze.', stufe: 2, saetze: ['Die Giraffe ist größer [als] der Elefant.', 'Mein Bruder ist so alt [wie] ich – wir sind Zwillinge!', 'Online ist es billiger [als] im Laden.', 'Die rote Jacke ist so teuer [wie] die blaue.'] },
      { art: 'fragen', auftrag: 'Vergleiche dich mit einer Person aus deiner Familie oder einer berühmten Person. Zwei Sätze.', stufe: 3, fragen: [{ f: '', l: 'Ich bin kleiner als mein Cousin.' }, { f: '', l: 'Aber ich laufe schneller als er.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreib ein Tier, das du magst: Wie sieht es aus? Wo lebt es? Was kann es besonders gut? Vergleiche es mit einem anderen Tier.', stufe: 2,
        anfaenge: ['Mein Lieblingstier ist …', 'Es ist … und hat …', 'Es lebt …', 'Es kann besonders gut …', 'Es ist … als …'], zeilen: 8,
        beispiel: 'Mein Lieblingstier ist der Delfin. Er ist grau und hat eine lange Nase. Er lebt im Meer. Er kann besonders gut schwimmen und springen. Er ist kleiner als ein Wal, aber viel schneller.' },
    ],
    check: ['Ich verstehe einen Sachtext über Tier-Rekorde.', 'Ich verstehe eine Sprachnachricht über Preise.', 'Ich bilde Komparativ und Superlativ.', 'Ich vergleiche mit „als“ und „wie“.', 'Ich beschreibe ein Tier.'],
  },
  // ================================================================ 4
  {
    thema: 'Essen und Trinken', titel: 'Guten Appetit!', untertitel: 'Ein Rezept aus Luxemburg, Wörter aus aller Welt und eine Bestellung an der Imbissbude.',
    ziel: { de: 'Ich verstehe ein Rezept und bestelle etwas zu essen.', fr: 'Je comprends une recette et je commande quelque chose à manger.' },
    bild: ['opa:froh:tasse', 'lea:froh'],
    start: {
      was: 'Wörter aus aller Welt',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Diese Wörter sind ins Deutsche „eingewandert“. Aus welcher Sprache kommen sie?', stufe: 1, links: ['die Pizza', 'das Croissant', 'der Joghurt', 'das Sandwich', 'die Tomate'], rechts: ['Italienisch', 'Französisch', 'Türkisch', 'Englisch', 'aus einer Sprache in Mexiko (Nahuatl)'], ordnung: [1, 3, 0, 4, 2] },
      ],
    },
    lesen: {
      was: 'Ein Rezept', art: 'anleitung', stimme: 'w1',
      quelle: 'Kochbuch der 7P2 · Rezept von Opa Jos', titel: 'Gromperekichelcher (Kartoffelpuffer)',
      material: ['1 kg Kartoffeln', '2 Zwiebeln', '2 Eier', '3 Esslöffel Mehl', 'Petersilie', 'Salz und Pfeffer', 'Öl zum Braten'],
      schritte: [
        { icon: 'tools-kitchen-2', text: 'Die Kartoffeln **schälen** und fein **reiben**. Die Zwiebeln klein **schneiden**.' },
        { icon: 'droplet', text: 'Das Wasser aus den Kartoffeln gut **ausdrücken**. Sonst werden die Kichelcher nicht knusprig.' },
        { icon: 'egg', text: 'Kartoffeln, Zwiebeln, Eier, Mehl und gehackte Petersilie **mischen**. Mit Salz und Pfeffer **würzen**.' },
        { icon: 'flame', text: 'Viel Öl in einer Pfanne **heiß machen**. Achtung: Ein Erwachsener muss dabei sein!' },
        { icon: 'circle', text: 'Mit einem Löffel kleine Häufchen in die Pfanne **geben** und flach **drücken**. Von beiden Seiten goldbraun **braten**.' },
      ],
      danach: ['**Tipp von Opa Jos:** In Luxemburg isst man Gromperekichelcher oft mit Apfelmus. Und auf der Schobermesse kann man sie heiß kaufen.'],
      woerter: [['das Rezept', 'la recette'], ['schälen', 'éplucher'], ['reiben', 'râper'], ['ausdrücken', 'presser'], ['knusprig', 'croustillant'], ['würzen', 'assaisonner'], ['die Pfanne', 'la poêle'], ['braten', 'faire frire'], ['das Apfelmus', 'la compote de pommes']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was brauchst du für die Gromperekichelcher? Schreib die Mengen.', stufe: 1, kopf: ['Zutat', 'Menge'], breiten: [50, 50], zeilen: [['Kartoffeln', '[1 kg]'], ['Zwiebeln', '[2]'], ['Eier', '[2]'], ['Mehl', '[3 Esslöffel]']] },
        { art: 'ordnen', auftrag: 'Bring die Schritte in die richtige Reihenfolge.', stufe: 2, teile: ['Kartoffeln schälen und reiben', 'das Wasser ausdrücken', 'alles mischen und würzen', 'Öl heiß machen', 'braten, bis sie goldbraun sind'], ordnung: [2, 0, 4, 1, 3] },
        { art: 'fragen', auftrag: 'Warum muss man das Wasser aus den Kartoffeln drücken?', stufe: 3, fragen: [{ f: '', l: 'Sonst werden die Gromperekichelcher nicht knusprig.' }] },
      ],
    },
    hoeren: {
      was: 'An der Imbissbude', wo: 'Neue Imbissbude am Bahnhof', titel: 'Einmal Falafel, bitte!',
      situation: 'Ben und Lea probieren die neue Imbissbude am Bahnhof aus.',
      bild: ['ben:froh', 'lea:froh'], sprecher: { Verkäufer: 'm1', Ben: 'm3', Lea: 'w2' },
      text: [
        ['Verkäufer', 'Hallo, was darf es sein?'], ['Lea', 'Ich hätte gern einmal Falafel im Brot, bitte. Ohne Zwiebeln.'],
        ['Verkäufer', 'Gern. Mit scharfer Soße?'], ['Lea', 'Nein, lieber mild, bitte.'],
        ['Ben', 'Und für mich eine Portion Pommes mit Ketchup und ein Wasser.'], ['Verkäufer', 'Klein oder groß?'], ['Ben', 'Groß, bitte. Ich habe großen Hunger!'],
        ['Verkäufer', 'Zum Hier-Essen oder zum Mitnehmen?'], ['Lea', 'Zum Mitnehmen.'],
        ['Verkäufer', 'Das macht zusammen elf Euro fünfzig.'], ['Ben', 'Hier, bitte. … Lea, wie schmeckt dein Falafel?'], ['Lea', 'Mmh, super lecker! Viel besser als in der Kantine!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was isst du an einer Imbissbude am liebsten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Pommes', 'Falafel', 'Pizza', 'Salat'], r: -1 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was bestellen Lea und Ben?', stufe: 1, kopf: ['', 'Essen', 'Extras / Wünsche'], breiten: [16, 42, 42], zeilen: [['Lea', '[Falafel im Brot]', '[ohne Zwiebeln, milde Soße]'], ['Ben', '[große Portion Pommes, Wasser]', '[mit Ketchup]']] },
        { art: 'mc', auftrag: 'Hör noch einmal. Kreuze an.', stufe: 2, fragen: [{ f: 'Essen sie dort oder nehmen sie das Essen mit?', o: ['zum Hier-Essen', 'zum Mitnehmen'], r: 1 }, { f: 'Was kostet alles zusammen?', o: ['10,50 €', '11,50 €', '15,10 €'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt eine Bestellung an einer Imbissbude. Bittet um etwas Besonderes.', stufe: 3, karten: [
        { titel: 'Bestellen', text: ['Ich hätte gern …', 'Für mich bitte …', 'Ohne … / mit …, bitte.', 'Zum Mitnehmen, bitte.'] },
        { titel: 'Verkaufen', text: ['Was darf es sein?', 'Klein oder groß?', 'Zum Hier-Essen oder zum Mitnehmen?', 'Das macht … Euro.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Rezepte lesen', punkte: ['In Rezepten steht oft der **Infinitiv** am Ende: Die Kartoffeln **schälen**.', 'Erst die **Zutaten** mit Mengen, dann die **Schritte**.', 'Mengen: 1 **kg** (Kilogramm), 3 **EL** (Esslöffel), 1 **TL** (Teelöffel), 200 **ml** (Milliliter)'] },
         { titel: 'Eingewanderte Wörter', tabelle: { kopf: ['Wort', 'aus …'], zeilen: [['die Pizza, die Spaghetti', 'Italienisch'], ['das Croissant, die Pommes', 'Französisch'], ['der Joghurt, der Kiosk', 'Türkisch'], ['das Sandwich, der Snack', 'Englisch']] } }],
        [{ art: 'tipp', titel: 'Höflich bestellen', text: 'Ich **hätte gern** … · Ich **möchte** … · **Könnten** Sie mir … geben? – Das ist höflicher als „Ich will …“.' },
         { art: 'achtung', titel: 'Sicherheit in der Küche', text: 'Heißes Öl und Messer nur, wenn ein Erwachsener dabei ist. Hände waschen nicht vergessen!' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Verben aus dem Rezept.', stufe: 1, woerter: ['schälen', 'reiben', 'mischen', 'würzen', 'braten'], saetze: ['Die Kartoffeln [schälen].', 'Die Kartoffeln fein [reiben].', 'Alle Zutaten [mischen].', 'Mit Salz und Pfeffer [würzen].', 'Goldbraun [braten].'] },
      { art: 'abschreiben', auftrag: 'Mach die Bestellung höflicher.', stufe: 2, kopf: ['unhöflich', 'höflich'], saetze: [['Ich will Pommes.', 'Ich hätte gern Pommes, bitte.'], ['Gib mir ein Wasser!', 'Könnten Sie mir bitte ein Wasser geben?'], ['Ketchup!', 'Mit Ketchup, bitte.']] },
      { art: 'fragen', auftrag: 'Kennst du noch drei „eingewanderte“ Wörter im Deutschen? Woher kommen sie?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'das Restaurant (Französisch), der Kaffee (Arabisch/Türkisch), das Baby (Englisch)' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib das Rezept für ein Gericht, das du gern isst (oder ein ganz einfaches: Obstsalat, Sandwich …).', stufe: 2,
        anfaenge: ['Name: …', 'Zutaten: …', '1. Zuerst …', '2. Dann …', '3. Zum Schluss …'], zeilen: 10,
        beispiel: 'Obstsalat. Zutaten: 2 Äpfel, 2 Bananen, 1 Orange, 1 EL Zitronensaft. 1. Das Obst waschen und schälen. 2. In kleine Stücke schneiden. 3. Alles mischen und Zitronensaft darüber geben. Guten Appetit!' },
      { art: 'schreiben', auftrag: 'SMS an eine Freundin: Wie schmeckt es in der neuen Imbissbude? Zwei bis drei Sätze.', stufe: 3, zeilen: 3, beispiel: 'Hi Lina! Die neue Imbissbude am Bahnhof ist super. Die Falafel sind lecker und nicht teuer. Kommst du morgen mit?' },
    ],
    check: ['Ich verstehe ein einfaches Rezept.', 'Ich kenne Mengenangaben (kg, EL, ml).', 'Ich bestelle höflich an einer Imbissbude.', 'Ich kenne „eingewanderte“ Wörter.', 'Ich schreibe ein einfaches Rezept.'],
  },
  // ================================================================ 5
  {
    thema: 'Regeln · müssen und dürfen', titel: 'Das darfst du nicht!', untertitel: 'Hausordnung, Schulregeln, Erlaubnis und Verbot: Du verstehst Regeln – und weißt, was „nicht müssen“ und „nicht dürfen“ bedeuten.',
    ziel: { de: 'Ich verstehe Regeln und unterscheide „nicht müssen“ und „nicht dürfen“.', fr: 'Je comprends des règles et je distingue « nicht müssen » et « nicht dürfen ».' },
    bild: ['chloe:froh:erklaeren', 'lea:verwirrt'],
    start: {
      was: 'Schilder',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet das Schild? Verbinde.', stufe: 1, links: ['🚭', '📵', '🚲 ➜ 🅿️', '🤫'], rechts: ['Hier darf man nicht rauchen.', 'Hier darf man nicht telefonieren.', 'Fahrräder muss man hier abstellen.', 'Hier muss man leise sein.'], ordnung: [2, 0, 3, 1] },
      ],
    },
    lesen: {
      was: 'Eine Hausordnung', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Aushang im Jugendhaus Junglinster', titel: 'Hausordnung – damit sich alle wohlfühlen',
      absaetze: [
        'Das Jugendhaus ist für alle Jugendlichen von 12 bis 18 Jahren offen. Ihr **müsst** nichts bezahlen und ihr **müsst** euch nicht anmelden. Kommt einfach vorbei!',
        'Im ganzen Haus **darf** man **nicht** rauchen und keinen Alkohol trinken. Das gilt auch draußen vor der Tür.',
        'Ihr **dürft** eure eigene Musik mitbringen. Aber nach 20 Uhr **müsst** ihr leiser sein – die Nachbarn wollen schlafen.',
        'Am Kicker und am Billardtisch **darf** jede Gruppe 20 Minuten spielen. Dann sind die nächsten dran.',
        'Nach dem Kochen **müsst** ihr die Küche aufräumen. Das Geschirr **muss** man spülen – die Spülmaschine **dürft** ihr benutzen.',
        'Respekt ist das Wichtigste: Niemand **darf** andere auslachen, beleidigen oder ausschließen. Bei Problemen **könnt** ihr immer mit dem Team sprechen.',
      ],
      woerter: [['die Hausordnung', 'le règlement intérieur'], ['sich wohlfühlen', 'se sentir bien'], ['sich anmelden', 's’inscrire'], ['gelten', 'être valable'], ['die Nachbarn', 'les voisins'], ['aufräumen', 'ranger'], ['spülen', 'faire la vaisselle'], ['beleidigen', 'insulter'], ['ausschließen', 'exclure']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was ist erlaubt ✓, was ist verboten ✗, was ist eine Pflicht !? Schreib das Zeichen.', stufe: 1, kopf: ['Im Jugendhaus …', '✓ / ✗ / !'], breiten: [75, 25], zeilen: [['… rauchen', '[✗]'], ['… eigene Musik mitbringen', '[✓]'], ['… nach dem Kochen aufräumen', '[!]'], ['… die Spülmaschine benutzen', '[✓]'], ['… andere auslachen', '[✗]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Man muss für das Jugendhaus bezahlen.', false], ['Man muss sich nicht anmelden.', true], ['Jede Gruppe darf eine Stunde Kicker spielen.', false], ['Bei Problemen kann man mit dem Team sprechen.', true]] },
        { art: 'fragen', auftrag: 'Welche Regel findest du am wichtigsten? Warum?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Absatz 6, weil sich so alle sicher und wohlfühlen.' }] },
      ],
    },
    hoeren: {
      was: 'Regeln erklären und nachfragen', wo: 'Erster Schultag von Leonie in Junglinster', titel: 'Muss ich das wirklich?',
      situation: 'Leonie aus Trier ist für eine Woche Austauschschülerin in der 7P2. Chloe erklärt ihr die Regeln.',
      bild: ['chloe:froh', 'lea:verwirrt'], sprecher: { Chloe: 'w2', Leonie: 'w3' },
      text: [
        ['Leonie', 'Chloe, muss ich hier eine Schuluniform tragen?'], ['Chloe', 'Nein, du musst keine Uniform tragen. Du kannst anziehen, was du willst.'],
        ['Leonie', 'Super! Und darf ich in der Pause mein Handy benutzen?'], ['Chloe', 'Nein, im Schulgebäude darfst du das Handy nicht benutzen. Es muss im Rucksack bleiben. Hast du das verstanden?'],
        ['Leonie', 'Ja, verstanden: Handy im Rucksack. Und das Mittagessen? Muss ich in der Kantine essen?'], ['Chloe', 'Nein, das musst du nicht. Du darfst auch dein eigenes Pausenbrot mitbringen.'],
        ['Leonie', 'Wie bitte? Kannst du das wiederholen? Was ist ein Pausenbrot?'], ['Chloe', 'Ein Brot von zu Hause, für die Pause. Verstehst du?'],
        ['Leonie', 'Ah, ja! Bei uns heißt das auch so. Und muss ich heute die Hausaufgaben machen?'], ['Chloe', 'Du bist Gast – du musst nicht. Aber du darfst natürlich!'], ['Leonie', 'Haha, sehr lustig.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Welche Regeln gibt es an deiner Schule? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man darf im Gebäude nicht rennen.', 'Man muss eine Uniform tragen.', 'Man darf das Handy in der Pause benutzen.'], r: -1 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was muss Leonie? Was darf sie nicht? Was muss sie nicht?', stufe: 1, kopf: ['Thema', 'Regel'], breiten: [30, 70], zeilen: [['Schuluniform', '[muss sie nicht tragen]'], ['Handy im Gebäude', '[darf sie nicht benutzen, muss im Rucksack bleiben]'], ['Kantine', '[muss sie nicht, darf ein Pausenbrot mitbringen]'], ['Hausaufgaben', '[muss sie nicht machen (Gast)]']] },
        { art: 'mc', auftrag: 'Hör noch einmal. Wie fragen die beiden nach?', stufe: 2, fragen: [{ f: 'Leonie fragt:', o: ['Wie bitte? Kannst du das wiederholen?', 'Was soll das?'], r: 0 }, { f: 'Chloe fragt:', o: ['Hast du das verstanden?', 'Bist du müde?'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erklärt einer neuen Person die Regeln eurer Schule. Fragt nach, ob sie alles verstanden hat.', stufe: 3, karten: [
        { titel: 'Regeln erklären', text: ['Du musst …', 'Du musst nicht …', 'Du darfst …', 'Du darfst nicht …'] },
        { titel: 'Verstehen sichern', text: ['Hast du das verstanden?', 'Verstehst du?', 'Wie bitte?', 'Kannst du das bitte wiederholen?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Was bedeuten die Modalverben?', tabelle: { kopf: ['Verb', 'Bedeutung', 'Beispiel'], zeilen: [['müssen', 'Pflicht', 'Du **musst** aufräumen.'], ['dürfen', 'Erlaubnis', 'Ihr **dürft** Musik mitbringen.'], ['können', 'Möglichkeit', 'Ihr **könnt** mit dem Team sprechen.'], ['sollen', 'Rat / Auftrag', 'Du **sollst** leise sein.']] } },
         { art: 'achtung', titel: 'nicht müssen ≠ nicht dürfen', punkte: ['**nicht müssen** = nicht nötig, freiwillig: Du **musst nicht** bezahlen. (Du kannst, aber es ist nicht nötig.)', '**nicht dürfen** = verboten: Du **darfst nicht** rauchen.', 'Auf Französisch: ne pas être obligé ≠ ne pas avoir le droit'] }],
        [{ art: 'tipp', titel: 'Formen von dürfen', text: 'ich **darf** · du **darfst** · er/sie **darf** · wir **dürfen** · ihr **dürft** · sie **dürfen**' },
         { titel: '„kein“ und Modalverben', text: 'Du musst **keine** Uniform tragen. = Eine Uniform ist nicht nötig. · Du darfst **kein** Handy benutzen. = Verboten.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Formen von dürfen oder müssen.', stufe: 1, saetze: ['(dürfen) Hier [darf] man nicht rauchen.', '(müssen) Wir [müssen] die Küche aufräumen.', '(dürfen) [Darf] ich mein Handy benutzen?', '(müssen) Du [musst] nichts bezahlen.', '(dürfen) Ihr [dürft] Musik mitbringen.'] },
      { art: 'mc', auftrag: '„nicht müssen“ oder „nicht dürfen“? Kreuze an, was passt.', stufe: 2, fragen: [
        { f: 'Der Eintritt ist gratis. Du … bezahlen.', o: ['musst nicht', 'darfst nicht'], r: 0 },
        { f: 'Das ist gefährlich! Du … auf das Dach klettern.', o: ['musst nicht', 'darfst nicht'], r: 1 },
        { f: 'Morgen ist Feiertag. Wir … in die Schule gehen.', o: ['müssen nicht', 'dürfen nicht'], r: 0 },
        { f: 'In der Bibliothek … man laut telefonieren.', o: ['muss nicht', 'darf nicht'], r: 1 }] },
      { art: 'fragen', auftrag: 'Schreib drei Regeln für euer Klassenzimmer: eine mit „müssen“, eine mit „dürfen“ und eine mit „nicht dürfen“.', stufe: 3, fragen: [{ f: '', l: 'Wir müssen pünktlich sein.' }, { f: '', l: 'Wir dürfen Wasser trinken.' }, { f: '', l: 'Wir dürfen andere nicht auslachen.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine kurze Hausordnung (5 Regeln) für einen Ort, den du gut kennst: euer Klassenzimmer, das Jugendhaus, der Sportplatz …', stufe: 2,
        anfaenge: ['Hausordnung für …', '1. Hier muss man …', '2. Man darf …', '3. Man darf nicht …', '4. Man muss nicht …', '5. Bei Problemen …'], zeilen: 8,
        beispiel: 'Hausordnung für unser Klassenzimmer: 1. Hier muss man pünktlich sein. 2. Man darf Wasser trinken. 3. Man darf andere nicht auslachen. 4. Man muss nicht immer die richtige Antwort wissen. 5. Bei Problemen spricht man mit Frau Sommer.' },
    ],
    check: ['Ich verstehe eine Hausordnung.', 'Ich verstehe, wenn jemand Regeln erklärt.', 'Ich unterscheide „nicht müssen“ und „nicht dürfen“.', 'Ich frage nach, ob mein Gegenüber mich verstanden hat.', 'Ich schreibe einfache Regeln.'],
  },
  // ================================================================ 6
  {
    thema: 'Früher und heute', titel: 'Früher war alles anders', untertitel: 'Kreide statt Tablet, Samstag statt Wochenende: Opa Jos erzählt von seiner Schulzeit. Du lernst, wie man über früher spricht.',
    ziel: { de: 'Ich vergleiche früher und heute und benutze musste, durfte, konnte, wollte.', fr: 'Je compare autrefois et aujourd’hui et j’utilise musste, durfte, konnte, wollte.' },
    bild: ['opa:froh', 'yusuf:froh'],
    start: {
      was: 'Früher oder heute?',
      aufgaben: [
        { art: 'rf', auftrag: 'Früher (vor 60 Jahren) oder heute? Kreuze an.', stufe: 1, spalten: ['früher', 'heute'], saetze: [['Die Lehrerin schreibt mit Kreide an die Tafel.', true], ['Wir machen Hausaufgaben auf dem Tablet.', false], ['Man hat einen Brief geschrieben.', true], ['Man schickt eine Sprachnachricht.', false]] },
      ],
    },
    lesen: {
      was: 'Ein Interview mit einem Großvater', art: 'chat', ich: 'Yusuf', stimmen: { Yusuf: 'm2', 'Opa Jos': 'm1' },
      quelle: 'Projekt „Schule früher“ · Interview von Yusuf', titel: 'Opa Jos, wie war die Schule früher?',
      nachrichten: [
        ['Yusuf', 'Opa Jos, wann bist du in die Schule gegangen?'],
        ['Opa Jos', 'Das war vor über sechzig Jahren. Damals **musste** ich auch am Samstagmorgen in die Schule!'],
        ['Yusuf', 'Am Samstag? Echt? Wie war der Unterricht?'],
        ['Opa Jos', 'Sehr streng. Wir **durften** nicht sprechen. Wir **mussten** immer still sitzen und aufstehen, wenn der Lehrer kam.'],
        ['Yusuf', 'Hattet ihr Computer?'], ['Opa Jos', 'Nein! Wir **konnten** nur mit Füller und Heft schreiben. Der Lehrer hatte Kreide und eine große Tafel.'],
        ['Yusuf', 'Und in der Pause?'], ['Opa Jos', 'Da haben wir mit Murmeln gespielt. Ich **wollte** immer gewinnen – aber meistens hat mein Freund Pierre gewonnen.'],
        ['Yusuf', 'Was war besser als heute?'], ['Opa Jos', 'Hm … Wir waren viel draußen. Aber heute ist die Schule netter. Ihr **dürft** Fragen stellen. Das ist gut!'],
      ],
      woerter: [['damals', 'à l’époque'], ['streng', 'sévère'], ['still sitzen', 'rester assis tranquille'], ['der Füller', 'le stylo-plume'], ['die Kreide', 'la craie'], ['die Tafel', 'le tableau'], ['die Murmel', 'la bille']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Vergleiche: Schule früher und heute.', stufe: 1, kopf: ['', 'früher (Opa Jos)', 'heute (du)'], breiten: [24, 38, 38], zeilen: [['Samstag', '[Schule am Morgen]', ''], ['Unterricht', '[streng, nicht sprechen]', ''], ['Schreiben', '[Füller, Heft, Kreide, Tafel]', ''], ['Pause', '[mit Murmeln spielen]', '']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Opa Jos musste am Samstag in die Schule.', true], ['Die Schüler durften viel sprechen.', false], ['Opa Jos hat immer beim Murmelspiel gewonnen.', false], ['Opa Jos findet die Schule heute netter.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Schultag früher', wo: 'Oma erzählt · Sonntagnachmittag', titel: 'Mein Schultag 1965',
      situation: 'Mia fragt ihre Oma: Wie war ein Schultag, als du so alt warst wie ich?',
      bild: ['oma:froh', 'mia:froh'], sprecher: { Oma: 'w1', Mia: 'w2' },
      text: [
        ['Mia', 'Oma, wie war dein Schultag, als du zwölf warst?'],
        ['Oma', 'Oh, das war 1965. Ich musste um sechs Uhr aufstehen. Wir hatten keinen Bus. Ich bin eine halbe Stunde zu Fuß gegangen – auch im Winter, im Schnee.'],
        ['Oma', 'Die Schule hat um acht Uhr begonnen. Wir waren 38 Kinder in einer Klasse! Mädchen und Jungen saßen getrennt.'],
        ['Mia', '38 Kinder? Das ist ja viel! Was hast du mittags gegessen?'],
        ['Oma', 'Mittags bin ich nach Hause gegangen. Meine Mutter hat gekocht. Eine Kantine gab es damals nicht.'],
        ['Oma', 'Am Nachmittag musste ich meiner Mutter im Garten helfen. Erst dann konnte ich meine Hausaufgaben machen.'],
        ['Mia', 'Und was wolltest du damals werden?'], ['Oma', 'Lehrerin! Und das bin ich dann auch geworden.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was glaubst du: Wie war die Schule 1965? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Die Klassen waren größer.', 'Es gab überall Computer.', 'Viele Kinder sind zu Fuß gegangen.'], r: [0, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze Omas Tagesablauf.', stufe: 1, kopf: ['Wann?', 'Was?'], breiten: [30, 70], zeilen: [['6 Uhr', '[aufstehen]'], ['Schulweg', '[eine halbe Stunde zu Fuß]'], ['8 Uhr', '[Schulbeginn]'], ['mittags', '[nach Hause gehen, die Mutter kocht]'], ['nachmittags', '[im Garten helfen, dann Hausaufgaben]']] },
        { art: 'mc', auftrag: 'Hör noch einmal. Kreuze an.', stufe: 2, fragen: [{ f: 'Wie viele Kinder waren in Omas Klasse?', o: ['18', '28', '38'], r: 2 }, { f: 'Was wollte Oma werden?', o: ['Ärztin', 'Lehrerin', 'Köchin'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Interviewt eine ältere Person (Familie, Nachbarn, Lehrperson): Wie war die Schule früher? Stellt die Fragen hier.', stufe: 3, karten: [
        { titel: 'Fragen', text: ['Wann sind Sie in die Schule gegangen?', 'Wie sind Sie zur Schule gekommen?', 'Was mussten Sie machen?', 'Was durften Sie nicht?'] },
        { titel: 'Nachfragen', text: ['Wie bitte?', 'Können Sie das bitte wiederholen?', 'Was bedeutet …?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Modalverben im Präteritum', tabelle: { kopf: ['', 'müssen', 'dürfen', 'können', 'wollen'], zeilen: [['ich', 'musste', 'durfte', 'konnte', 'wollte'], ['du', 'musstest', 'durftest', 'konntest', 'wolltest'], ['er / sie', 'musste', 'durfte', 'konnte', 'wollte'], ['wir / sie', 'mussten', 'durften', 'konnten', 'wollten'], ['ihr', 'musstet', 'durftet', 'konntet', 'wolltet']] } },
         { titel: 'So erkennst du es', punkte: ['**kein Umlaut** im Präteritum: müssen → m**u**sste', 'Endung **-te**: muss**te**, konn**te**', 'Das zweite Verb steht **am Ende**: Ich musste früh **aufstehen**.', 'Auch: sein → **war**, haben → **hatte**'] }],
        [{ art: 'tipp', titel: 'Zeitwörter für früher und heute', text: '**früher, damals, vor 60 Jahren** ↔ **heute, jetzt, heutzutage**. Beispiel: **Damals** musste man laufen. **Heute** fährt der Bus.' },
         { art: 'achtung', titel: 'Perfekt oder Präteritum?', text: 'Beim Erzählen benutzt man meistens das **Perfekt**. Aber bei **sein, haben** und den **Modalverben** nimmt man lieber das **Präteritum**: Ich **war** müde. Ich **musste** laufen.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Modalverb im Präteritum.', stufe: 1, saetze: ['(müssen) Oma [musste] um sechs Uhr aufstehen.', '(dürfen) Die Kinder [durften] nicht sprechen.', '(können) Opa [konnte] nur mit dem Füller schreiben.', '(wollen) Ich [wollte] immer gewinnen.', '(müssen) Wir [mussten] still sitzen.'] },
      { art: 'abschreiben', auftrag: 'Setze die Sätze ins Präteritum (Vergangenheit).', stufe: 2, kopf: ['heute', 'früher'], saetze: [['Ich muss viel lernen.', 'Ich musste viel lernen.'], ['Wir dürfen draußen spielen.', 'Wir durften draußen spielen.'], ['Sie kann gut zeichnen.', 'Sie konnte gut zeichnen.'], ['Ihr wollt ins Kino gehen.', 'Ihr wolltet ins Kino gehen.']] },
      { art: 'fragen', auftrag: 'Als du klein warst (5 Jahre): Was musstest du? Was durftest du nicht? Was wolltest du werden?', stufe: 3, fragen: [{ f: 'Ich musste …', l: 'Ich musste um acht Uhr ins Bett gehen.' }, { f: 'Ich durfte nicht …', l: 'Ich durfte nicht allein über die Straße gehen.' }, { f: 'Ich wollte … werden.', l: 'Ich wollte Feuerwehrfrau werden.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen kurzen Bericht: Schule früher – Schule heute. Was ist besser? Was war besser?', stufe: 2,
        anfaenge: ['Früher mussten die Kinder …', 'Sie durften nicht …', 'Heute …', 'Besser finde ich …, weil …'], zeilen: 9,
        beispiel: 'Früher mussten die Kinder auch am Samstag in die Schule. Sie durften im Unterricht nicht sprechen. Heute dürfen wir Fragen stellen und in Gruppen arbeiten. Besser finde ich die Schule heute, weil die Lehrer netter sind. Aber früher waren die Kinder mehr draußen.' },
    ],
    check: ['Ich verstehe ein Interview über früher.', 'Ich verstehe, wenn jemand von einem Schultag früher erzählt.', 'Ich kenne musste, durfte, konnte, wollte.', 'Ich benutze früher, damals und heute.', 'Ich vergleiche früher und heute.'],
  },
  // ================================================================ 7
  {
    thema: 'Zeitangaben', titel: 'Seit wann? Vor einer Woche!', untertitel: 'Projektwoche, Nachrichten, Termine: Mit vor, nach, in und seit sagst du genau, wann etwas passiert.',
    ziel: { de: 'Ich benutze vor, nach, in und seit und verstehe kurze Nachrichten.', fr: 'J’utilise vor, nach, in et seit et je comprends de courtes informations.' },
    bild: ['lio:froh', 'jana:froh:blatt'],
    start: {
      was: 'Zeitwörter',
      aufgaben: [
        { art: 'ordnen', auftrag: 'Ordne die Wörter von früh nach spät. Heute ist Mittwoch.', stufe: 1, teile: ['vorgestern (Montag)', 'gestern (Dienstag)', 'heute (Mittwoch)', 'morgen (Donnerstag)', 'übermorgen (Freitag)'], ordnung: [3, 0, 4, 2, 1] },
      ],
    },
    lesen: {
      was: 'Schülerstimmen zur Projektwoche', art: 'profile', stimme: 'w1',
      quelle: 'Schülerzeitung · Rückblick', titel: 'Projektwoche „Unsere Schule wird grün“',
      profile: [
        { name: 'Lio, 7P2', bild: 'lio:froh', stimme: 'm2', text: 'Vor einer Woche hat die Projektwoche begonnen. Wir haben ein Hochbeet gebaut. Seit Montag wachsen dort Salat und Radieschen. In drei Wochen können wir ernten!' },
        { name: 'Jana, 7P1', bild: 'jana:froh', stimme: 'w2', text: 'Ich war in der Gruppe „Müll“. Nach dem Mittagessen haben wir jeden Tag den Schulhof sauber gemacht. Seit der Projektwoche gibt es in jeder Klasse drei Mülleimer. Ich finde das super.' },
        { name: 'Tom, 7P3', bild: 'tom:froh', stimme: 'm3', text: 'Wir haben Nistkästen für Vögel gebaut. Am Anfang war ich nicht motiviert. Aber nach zwei Tagen hat es mir Spaß gemacht. Seit gestern wohnt ein Vogel in meinem Kasten!' },
        { name: 'Nele, 7P2', bild: 'nele:froh:rollstuhl', stimme: 'w1', text: 'Meine Gruppe hat ein Video gedreht: „Spart Energie!“ Vor dem Projekt wusste ich nicht, wie viel Strom ein Handy-Ladegerät braucht. In zwei Wochen zeigen wir das Video beim Elternabend.' },
      ],
      woerter: [['die Projektwoche', 'la semaine de projets'], ['das Hochbeet', 'le potager surélevé'], ['wachsen', 'pousser'], ['ernten', 'récolter'], ['der Müll', 'les déchets'], ['der Nistkasten', 'le nichoir'], ['drehen (ein Video)', 'tourner (une vidéo)'], ['der Strom', 'l’électricité']],
      aufgaben: [
        { art: 'wer', auftrag: 'Wer sagt das? Kreuze an.', stufe: 1, personen: ['Lio', 'Jana', 'Tom', 'Nele'], saetze: [['Ein Vogel wohnt in meinem Kasten.', 'Tom'], ['Wir zeigen das Video beim Elternabend.', 'Nele'], ['Bald können wir ernten.', 'Lio'], ['Es gibt jetzt drei Mülleimer.', 'Jana']] },
        { art: 'tabelle', auftrag: 'Wann ist was passiert? Ergänze die Zeitangabe aus dem Text.', stufe: 2, kopf: ['Was?', 'Wann?'], breiten: [60, 40], zeilen: [['Die Projektwoche hat begonnen.', '[vor einer Woche]'], ['Salat und Radieschen wachsen.', '[seit Montag]'], ['Man kann ernten.', '[in drei Wochen]'], ['Ein Vogel wohnt im Kasten.', '[seit gestern]']] },
      ],
    },
    hoeren: {
      was: 'Kurznachrichten im Radio', wo: 'Jugendradio · Nachrichten um 17 Uhr', titel: 'Die Nachrichten für junge Leute',
      situation: 'Du hörst vier kurze Nachrichten im Jugendradio. Achte auf: Was? Wo? Wann?',
      bild: ['finn:froh:handy'], sprecher: { Sprecher: 'm1', Sprecherin: 'w1' },
      text: [
        ['Sprecher', 'Hier sind die Nachrichten für junge Leute.'],
        ['Sprecherin', 'Erstens: In Junglinster hat heute ein neuer Skatepark geöffnet. Seit zehn Uhr fahren dort Jugendliche mit Skateboards und Rollern. Der Park ist jeden Tag bis 21 Uhr offen.'],
        ['Sprecher', 'Zweitens: Vor drei Tagen hat in Luxemburg-Stadt ein Mathe-Wettbewerb für Schülerinnen und Schüler stattgefunden. 400 Jugendliche haben mitgemacht.'],
        ['Sprecherin', 'Drittens: Das Wetter. Morgen scheint die Sonne, aber nach dem Mittag kommt Regen. Nehmt einen Regenschirm mit!'],
        ['Sprecher', 'Und viertens: In zwei Wochen beginnen die Osterferien. Viele Jugendhäuser bieten dann Workshops an. Die Anmeldung läuft seit gestern.'],
        ['Sprecherin', 'Das waren die Nachrichten. Bis morgen!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Welche Fragen beantworten Nachrichten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Was ist passiert?', 'Wo?', 'Wann?', 'Was isst der Sprecher?'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze die Tabelle.', stufe: 1, kopf: ['Nachricht', 'Was?', 'Wann?'], breiten: [14, 52, 34], zeilen: [['1', '[neuer Skatepark in Junglinster]', '[heute, seit 10 Uhr]'], ['2', '[Mathe-Wettbewerb, 400 Jugendliche]', '[vor drei Tagen]'], ['3', '[Wetter: Sonne, dann Regen]', '[morgen, nach dem Mittag]'], ['4', '[Osterferien, Workshops]', '[in zwei Wochen]']] },
        { art: 'rf', auftrag: 'Hör noch einmal. Richtig oder falsch?', stufe: 2, saetze: [['Der Skatepark ist bis 21 Uhr offen.', true], ['Am Wettbewerb haben 40 Jugendliche mitgemacht.', false], ['Die Anmeldung für die Workshops läuft seit gestern.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht eure eigenen Klassen-Nachrichten: drei Nachrichten mit Was? Wo? Wann?', stufe: 3, karten: [
        { titel: 'Zeitangaben', text: ['vor einer Woche', 'seit gestern', 'in zwei Tagen', 'nach der Pause'] },
        { titel: 'Nachrichten-Sätze', text: ['Hier sind die Nachrichten …', 'Erstens: …', 'Das Wetter: …', 'Das waren die Nachrichten.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'vor, nach, in, seit (+ Dativ)', tabelle: { kopf: ['', 'Bedeutung', 'Beispiel'], zeilen: [['vor', 'Vergangenheit (fertig)', '**vor** einer Woche'], ['seit', 'begonnen und dauert noch', '**seit** einem Jahr, **seit** Montag'], ['in', 'Zukunft', '**in** zwei Wochen'], ['nach', 'später als …', '**nach** dem Essen, **nach** der Pause']] } },
         { titel: 'Die Endungen (Dativ)', punkte: ['der Tag → vor **einem** Tag, nach **dem** Tag', 'die Woche → vor **einer** Woche, nach **der** Pause', 'das Jahr → seit **einem** Jahr', 'viele: vor drei Tag**en**, in zwei Woche**n**'] }],
        [{ art: 'tipp', titel: 'Wörter für Zeitpunkte', text: '**vorgestern – gestern – heute – morgen – übermorgen** · **früher – damals – jetzt – bald – später**' },
         { art: 'achtung', titel: 'seit + Präsens!', text: 'Ich **wohne** seit zwei Jahren hier. (Ich wohne immer noch hier.) Nicht: ~~Ich habe seit zwei Jahren hier gewohnt.~~' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze: vor, seit, in, nach.', stufe: 1, woerter: ['vor', 'seit', 'in', 'nach'], saetze: ['[Seit] einem Jahr spiele ich Gitarre.', '[Vor] drei Tagen war der Wettbewerb.', '[In] zwei Wochen beginnen die Ferien.', '[Nach] dem Unterricht gehe ich ins Jugendhaus.'] },
      { art: 'luecken', auftrag: 'Ergänze die Endung: einem, einer, dem, der.', stufe: 2, saetze: ['vor ein[er|9] Woche', 'seit ein[em|9] Monat', 'nach d[er|9] Schule', 'in ein[em|9] Jahr', 'nach d[em|9] Training'] },
      { art: 'fragen', auftrag: 'Schreib über dich: drei Sätze mit seit, vor und in.', stufe: 3, fragen: [{ f: 'seit …', l: 'Seit zwei Jahren wohne ich in Mersch.' }, { f: 'vor …', l: 'Vor einer Woche war ich im Kino.' }, { f: 'in …', l: 'In drei Monaten habe ich Geburtstag.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen kurzen Bericht über ein Projekt, einen Ausflug oder eine Woche in der Schule. Benutze vor, seit, nach und in.', stufe: 2,
        anfaenge: ['Vor … haben wir …', 'Zuerst …', 'Nach … ', 'Seit … ', 'In … wollen wir …'], zeilen: 9,
        beispiel: 'Vor zwei Wochen haben wir einen Ausflug in den Wald gemacht. Zuerst haben wir Bäume gezählt. Nach dem Picknick haben wir Müll gesammelt. Seit dem Ausflug sammle ich auch zu Hause Plastik getrennt. In einem Monat wollen wir wieder hingehen.' },
      { art: 'schreiben', auftrag: 'Telegrammstil: Schreib eine kurze SMS an einen Freund. Du kommst später.', stufe: 1, zeilen: 2, beispiel: 'Bus kaputt. Komme 20 Min. später. Wartet bitte! Lina' },
    ],
    check: ['Ich verstehe Berichte über eine Projektwoche.', 'Ich verstehe die Hauptpunkte von kurzen Nachrichten.', 'Ich benutze vor, seit, in und nach.', 'Ich kenne vorgestern, gestern, morgen, übermorgen.', 'Ich schreibe eine SMS im Telegrammstil.'],
  },
  // ================================================================ 8
  {
    thema: 'Feste in vielen Kulturen', titel: 'Wie feierst du?', untertitel: 'Weihnachten, Chanukka, das Zuckerfest, Ostern, der Nationalfeiertag: In deiner Klasse feiern viele Menschen – auf viele Arten.',
    ziel: { de: 'Ich erzähle, wie bei mir ein Fest gefeiert wird, und beschreibe einen Ort, der mir gefällt.', fr: 'Je raconte comment on fête une fête chez moi et je décris un endroit que j’aime.' },
    bild: ['amira:froh', 'noah:froh'],
    start: {
      was: 'Feste im Jahr',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Fest? Verbinde.', stufe: 1, links: ['Am 6. Dezember bringt der Nikolaus (Kleeschen) Geschenke.', 'Man sucht bunte Eier.', 'Man zündet acht Tage lang Lichter an.', 'Nach dem Fastenmonat Ramadan feiert man.', 'Am 23. Juni feiert ganz Luxemburg.'], rechts: ['Kleeschen', 'Ostern', 'Chanukka', 'das Zuckerfest (Eid al-Fitr)', 'der Nationalfeiertag'], ordnung: [4, 1, 3, 0, 2] },
      ],
    },
    lesen: {
      was: 'Schülerstimmen zu Festen', art: 'profile', stimme: 'w1',
      quelle: 'Schülerzeitung · Thema „Feste“', titel: 'Unser liebstes Fest',
      profile: [
        { name: 'Amira: das Zuckerfest', bild: 'amira:froh', stimme: 'w2', text: 'Im Ramadan essen und trinken viele Muslime nicht, solange die Sonne scheint. Am Ende kommt das Zuckerfest. Wir ziehen neue Kleider an, besuchen die Familie und essen ganz viele Süßigkeiten. Die Kinder bekommen kleine Geschenke.' },
        { name: 'Noah: Chanukka', bild: 'noah:froh', stimme: 'm1', text: 'Chanukka ist ein jüdisches Fest und dauert acht Tage. Jeden Abend zünden wir eine Kerze mehr an. Meine Oma macht Latkes – das sind Kartoffelpuffer, fast wie Gromperekichelcher!' },
        { name: 'Lina: Weihnachten', bild: 'lina:froh', stimme: 'w3', text: 'Bei uns gibt es am 24. Dezember ein großes Essen mit der Familie. Danach packen wir die Geschenke aus. Das Schönste für mich ist der Weihnachtsbaum mit den Lichtern.' },
        { name: 'Ben: der Nationalfeiertag', bild: 'ben:froh', stimme: 'm3', text: 'Am Abend vor dem 23. Juni gibt es in Luxemburg-Stadt einen Fackelzug und ein großes Feuerwerk. Überall ist Musik. Ich darf mit meinem Onkel hingehen und lange aufbleiben!' },
      ],
      woerter: [['feiern', 'fêter'], ['der Ramadan', 'le ramadan'], ['solange', 'tant que'], ['jüdisch', 'juif'], ['die Kerze anzünden', 'allumer la bougie'], ['auspacken', 'déballer'], ['der Fackelzug', 'la retraite aux flambeaux'], ['das Feuerwerk', 'le feu d’artifice'], ['aufbleiben', 'veiller tard']],
      aufgaben: [
        { art: 'wer', auftrag: 'Zu welchem Fest passt das? Kreuze an.', stufe: 1, personen: ['Zuckerfest', 'Chanukka', 'Weihnachten', 'Nationalfeiertag'], saetze: [['acht Tage lang Kerzen', 'Chanukka'], ['ein Feuerwerk', 'Nationalfeiertag'], ['ein Baum mit Lichtern', 'Weihnachten'], ['nach dem Ramadan', 'Zuckerfest'], ['Kartoffelpuffer', 'Chanukka']] },
        { art: 'fragen', auftrag: 'Was ist bei allen Festen ähnlich? Schreib zwei Dinge.', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Man feiert mit der Familie. Es gibt besonderes Essen oder Lichter.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Podcast über ein Fest', wo: 'Podcast „Luxemburg erklärt“', titel: 'Was passiert am Nationalfeiertag?',
      situation: 'Im Schul-Podcast erklärt Frau Sommer den Nationalfeiertag. Finn stellt Fragen.',
      bild: ['lehrerin:froh:erklaeren', 'finn:froh'], sprecher: { 'Frau Sommer': 'w1', Finn: 'm3' },
      text: [
        ['Finn', 'Willkommen zu unserem Podcast! Heute ist Frau Sommer da. Frau Sommer, wann ist der Nationalfeiertag?'],
        ['Frau Sommer', 'Am 23. Juni. Man feiert den Geburtstag des Großherzogs. Aber die Party beginnt schon am Abend vorher, am 22. Juni.'],
        ['Finn', 'Was passiert am Abend?'], ['Frau Sommer', 'In Luxemburg-Stadt gibt es einen Fackelzug. Danach kommt ein großes Feuerwerk. Viele Leute feiern bis spät in der Nacht auf den Straßen.'],
        ['Finn', 'Und am 23. Juni selbst?'], ['Frau Sommer', 'Am Morgen gibt es eine Feier in der Kathedrale und eine Parade. Für die meisten Leute ist es ein freier Tag – auch für euch!'],
        ['Finn', 'Super! Feiern auch die Dörfer?'], ['Frau Sommer', 'Ja, viele Gemeinden haben eigene kleine Feste mit Musik.'],
        ['Finn', 'Danke, Frau Sommer! Das war unser Podcast. Bis zum nächsten Mal!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was weißt du schon über den Nationalfeiertag? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Er ist im Juni.', 'Es gibt ein Feuerwerk.', 'Es liegt Schnee.'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was passiert wann?', stufe: 1, kopf: ['Wann?', 'Was?'], breiten: [35, 65], zeilen: [['22. Juni, Abend', '[Fackelzug und Feuerwerk, Feiern auf der Straße]'], ['23. Juni, Morgen', '[Feier in der Kathedrale, Parade]'], ['23. Juni', '[freier Tag]']] },
        { art: 'rf', auftrag: 'Hör noch einmal. Richtig oder falsch?', stufe: 2, saetze: [['Man feiert den Geburtstag des Großherzogs.', true], ['Das Feuerwerk ist am Morgen.', false], ['Nur Luxemburg-Stadt feiert.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erzählt euch: Welches Fest feiert ihr gern? Wie feiert ihr? (Ihr könnt auch ein Schulfest wählen.)', stufe: 3, karten: [
        { titel: 'Fragen', text: ['Welches Fest magst du?', 'Wann ist es?', 'Was macht ihr da?', 'Was isst ihr?'] },
        { titel: 'Antworten', text: ['Ich mag … am liebsten.', 'Es ist im … / am …', 'Wir … zusammen.', 'Es gibt immer …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Über Feste sprechen', punkte: ['Wir **feiern** … · Das Fest ist **im** Dezember / **am** 23. Juni.', 'Man **isst** … · Man **zündet** Kerzen **an**.', 'Das Schönste für mich **ist** …', 'Ich **finde** … schön, **weil** …'] },
         { titel: 'Orte beschreiben', punkte: ['Am besten gefällt es mir **am Meer / in der Stadt / auf dem Dorf / in den Bergen**.', '…, **weil** es dort ruhig / spannend / schön ist.', 'Gut finde ich …, **nicht so gut** finde ich …'] }],
        [{ art: 'tipp', titel: 'Respekt', text: 'Jede Familie feiert anders – und manche feiern gar nicht. Alles ist okay. Du erzählst nur, was **du** erzählen möchtest.' },
         { art: 'achtung', titel: 'weil: Verb am Ende!', text: 'Ich mag das Meer, **weil** ich gern **schwimme**. Nach **weil** steht das Verb **am Ende**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: '„im“ oder „am“? Ergänze.', stufe: 1, saetze: ['Weihnachten ist [im] Dezember.', 'Der Nationalfeiertag ist [am] 23. Juni.', 'Das Feuerwerk ist [am] Abend.', 'Ostern ist [im] Frühling.'] },
      { art: 'abschreiben', auftrag: 'Verbinde die Sätze mit „weil“. Das Verb wandert ans Ende!', stufe: 2, kopf: ['zwei Sätze', 'ein Satz mit „weil“'], saetze: [['Ich mag das Meer. Ich schwimme gern.', 'Ich mag das Meer, weil ich gern schwimme.'], ['Ich mag Chanukka. Es gibt Latkes.', 'Ich mag Chanukka, weil es Latkes gibt.'], ['Ich bin müde. Das Fest war lang.', 'Ich bin müde, weil das Fest lang war.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreib ein Fest oder einen besonderen Tag, den du gern magst (Fest, Geburtstag, Schulfest, erster Ferientag …).', stufe: 2,
        anfaenge: ['Mein liebster Tag im Jahr ist …', 'Er ist im / am …', 'An diesem Tag …', 'Wir essen …', 'Das Schönste ist …, weil …'], zeilen: 8,
        beispiel: 'Mein liebster Tag im Jahr ist der erste Ferientag im Sommer. Er ist im Juli. An diesem Tag schlafe ich lange. Am Nachmittag fahre ich mit meinen Freunden zum See. Das Schönste ist, dass wir keine Hausaufgaben haben!' },
      { art: 'schreiben', auftrag: 'Wo gefällt es dir am besten: in der Stadt, auf dem Dorf, am Meer, in den Bergen? Warum? Was gefällt dir dort nicht so gut?', stufe: 3, zeilen: 5,
        beispiel: 'Am besten gefällt es mir am Meer, weil ich gern schwimme und die Luft gut ist. Nicht so gut finde ich, dass es dort im Sommer sehr voll ist.' },
    ],
    check: ['Ich verstehe Texte über Feste in verschiedenen Kulturen.', 'Ich verstehe einen kurzen Podcast.', 'Ich erzähle, wie ein Fest gefeiert wird.', 'Ich sage mit „weil“, warum mir etwas gefällt.', 'Ich beschreibe einen Ort, der mir gefällt.'],
  },
]

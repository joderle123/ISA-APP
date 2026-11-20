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
]

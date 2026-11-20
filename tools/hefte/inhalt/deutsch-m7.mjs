// Deutsch · Modul 7 „Medien und Werbung“ (Voie de préparation, B1) – multimodales Heft.
// Themen und Grammatik nach den öffentlichen „Kompetenzorientierten Bildungsstandards Deutsch für den Modularunterricht“
// (MENFP 2009), Modul 7: Medien, Neue Medien, Medienkonsum der Jugendlichen, Werbung; Verpackungen (Haltbarkeit,
// Zubereitung, Anwendung), Nachrichten über Unglücksfälle, Verkehrsmeldungen, Wetter, Radiointerviews, Durchsagen,
// Reisetagebuch, Internetrecherche und Poster, Netiquette, Werbesprache, Konzertkritik, Pro und Kontra;
// Relativsätze, indirekte Fragesätze, Indefinitpronomen, Adjektivableitungen, Abkürzungsverzeichnis.
// Alle Texte selbst geschrieben; Personen, Marken, Bands und Meldungen ausgedacht. Hilfe: 112, 116 111, BEE SECURE Helpline.

export const MODUL = {
  id: 'deutsch-m7', kuerzel: 'de7', nr: 7, sprache: 'de', niveau: 'B1', klasse: 'Voie de préparation',
  dateiname: 'Deutsch_Modul-7',
  fach: { de: 'Deutsch', fr: 'Allemand' },
  titel: { de: 'Medien und Werbung', fr: 'Médias et publicité' },
  untertitel: { de: 'Bildschirmzeit, Packungen, Nachrichten, Reiseberichte, Netiquette, Werbung, Musikkritiken und Diskussionen: kritisch lesen, hören, sprechen und schreiben.', fr: 'Temps d’écran, emballages, informations, récits de voyage, nétiquette, publicité, critiques musicales et débats : lire, écouter, parler et écrire avec un esprit critique.' },
  farben: { tief: '#b4432e', mittel: '#eaa38f', zart: '#fbefe9', dunkel: '#7e2b1c' },
  deckbild: ['mia:froh:handy', 'tom:aufgeregt:stehen', 'sami:froh:laessig'],
  blasen: [{ t: '#Anzeige?', x: 12, y: 112 }, { t: 'Echt jetzt?', x: 126, y: 100 }, { t: 'Fake!', x: 160, y: 150 }],
  themen: [
    { titel: { de: 'Medien im Alltag', fr: 'Les médias au quotidien' }, icon: 'device-mobile', lektionen: 3 },
    { titel: { de: 'Netz und Werbung', fr: 'Internet et publicité' }, icon: 'world-www', lektionen: 3 },
    { titel: { de: 'Musik und Meinungen', fr: 'Musique et opinions' }, icon: 'music', lektionen: 2 },
  ],
  anleitung: [
    'Jede Lektion hat fünf Teile: **Lesen**, **Hören**, **Regel**, **Üben** und **Schreiben**. Am Ende steht ein **Kurz-Check**.',
    'Bei jedem Text gibt es einen **QR-Code**. Halte die Kamera deines Handys darauf – dann hörst du den Text. Du kannst ihn so oft hören, wie du willst, auch langsamer.',
    'Die Punkte bei den Aufgaben zeigen die Stufe: ●○○ Basis · ●●○ Kern · ●●● Plus. Fang mit der Basis an.',
    'In Modul 7 geht es um Medien. Alle Marken, Bands und Meldungen sind ausgedacht. Wenn du über dich schreibst, entscheidest du selbst, was du erzählst.',
  ],
  // nur für die Vorlese-Stimme (Python-Regex)
  aussprache: {
    '(\\w+)/in\\b': '\\1 oder \\1in', '(?i)chatt': 'tschätt', '(?i)chat': 'tschätt', '\\bApp\\b': 'Äpp', '\\bApps\\b': 'Äpps', '\\bonline\\b': 'onlein',
    '(?i)\\b(ge)?post(e|en|et)\\b': '\\1poust\\2', '\\bScreenshot': 'Skrienschott', '\\bInfluencer': 'Influenser', '\\bSong': 'Ssong',
    '\\bBand\\b': 'Bänd', '\\blive\\b': 'leif', '\\bFans\\b': 'Fäns', '\\bHeadset\\b': 'Hedsett', '\\bSound\\b': 'Saund', '\\bGaming\\b': 'Geiming',
    '\\bPower\\b': 'Pauer', '@lena\\.glow': 'Lena Glou', '\\bGlow\\b': 'Glou', '#(\\w+)': 'Hashtag \\1', '\\bLENA15\\b': 'Lena fünfzehn',
    '(\\d+),(\\d\\d) ?€': '\\1 Euro \\2', '\\*': '', '(\\d+) ?%': '\\1 Prozent', '\\s?°C': ' Grad', '\\bBEE SECURE\\b': 'Bi Sekjur', '\\bHelpline\\b': 'Helplein',
    '\\bAIRSTEP X\\b': 'Ärstepp Ix', '\\bSURF FREE\\b': 'Sörf Frie', '\\bFake\\b': 'Feik', '\\bA(\\d+)\\b': 'A \\1', '\\bHip-Hop\\b': 'Hipp-Hopp',
  },
}

const balken = (titel, daten) => {
  const max = Math.max(...daten.map(([, n]) => n))
  return `<div style="font-size:11.5pt"><div style="font-family:Lexend;font-weight:700;margin-bottom:2.5mm">${titel}</div>${daten
    .map(([t, n]) => `<div style="display:grid;grid-template-columns:44mm 1fr 10mm;gap:3mm;align-items:center;margin:1.6mm 0"><span>${t}</span><span style="height:7mm;border-radius:2mm;background:var(--f);opacity:${0.45 + 0.55 * n / max};width:${(n / max) * 100}%"></span><b>${n}</b></div>`)
    .join('')}</div>`
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Medienkonsum · alle, einige, niemand', titel: 'Wie viel Bildschirm?', untertitel: 'Eine Umfrage in der Klasse und ein Radiointerview über Medien und Zukunft: Du liest Ergebnisse, sagst deine Meinung und fragst nach der Meinung der anderen.',
    ziel: { de: 'Ich verstehe Umfrageergebnisse über Medien und spreche über Mediennutzung.', fr: 'Je comprends les résultats d’un sondage sur les médias et je parle de leur usage.' },
    bild: ['mia:froh:handy', 'yusuf:froh:zocken'],
    start: {
      was: 'Medien-Wörter',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet das? Verbinde.', stufe: 1, links: ['streamen', 'chatten', 'posten', 'die App', 'der Bildschirm'], rechts: ['Filme oder Musik online schauen oder hören', 'kurze Nachrichten schreiben', 'etwas ins Internet stellen', 'ein Programm auf dem Handy', 'hier sieht man Bilder und Texte'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ergebnisse einer Umfrage', art: 'text', stimme: 'w2', nummern: true,
      quelle: 'Klassenzeitung · Umfrage mit 24 Jugendlichen', titel: 'Wir und die Bildschirme',
      absaetze: [
        'Wir haben in unserer Klasse eine Umfrage gemacht: Wie nutzen wir Handy, Computer und Fernseher? **Alle** 24 haben ein Handy. **Niemand** liest die Zeitung auf Papier.',
        'Die größte Gruppe ist jeden Tag **2 bis 4 Stunden** am Bildschirm. **Einige** sagen: „Am Wochenende ist es mehr.“ **Manche** schauen abends im Bett noch Videos – und sind morgens müde.',
        'Am liebsten schauen wir **Videos**. Danach kommen **Chatten** und **Spiele**. Fernsehen ist für **viele** nicht mehr wichtig: Serien schauen wir lieber auf dem Handy.',
        '**Fast alle** finden: Ohne Handy geht es nicht. Aber **einige** haben schon eine Pause gemacht. „Eine Woche ohne Handy war am Anfang schwer, dann eigentlich ganz entspannt“, schreibt **jemand** auf seinen Zettel.',
        'Unser Fazit: Bildschirme sind praktisch und machen Spaß. Aber **jeder** sollte darauf achten, dass genug Zeit für Schlaf, Sport und Freunde bleibt.',
      ],
      woerter: [['die Umfrage', 'le sondage'], ['nutzen', 'utiliser'], ['der Bildschirm', 'l’écran'], ['die Gruppe', 'le groupe'], ['manche', 'certains'], ['entspannt', 'détendu'], ['der Zettel', 'le bout de papier'], ['achten auf', 'faire attention à']],
      aufgaben: [
        { art: 'frei', auftrag: 'Lies das Diagramm aus der Umfrage.', stufe: 1, html: balken('Wie viele Stunden pro Tag bist du am Bildschirm? (24 Jugendliche)', [['weniger als 1 Stunde', 3], ['1 bis 2 Stunden', 8], ['2 bis 4 Stunden', 9], ['mehr als 4 Stunden', 4]]) },
        { art: 'rf', auftrag: 'Richtig oder falsch? Lies Text und Diagramm.', stufe: 1, saetze: [['Alle in der Klasse haben ein Handy.', true], ['Einige lesen die Zeitung auf Papier.', false], ['9 Jugendliche sind 2 bis 4 Stunden am Bildschirm.', true], ['Die meisten sind weniger als 1 Stunde am Bildschirm.', false], ['Fernsehen ist für viele nicht mehr wichtig.', true]] },
        { art: 'fragen', auftrag: 'Was ist das Fazit der Umfrage? Bist du einverstanden?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Bildschirme sind praktisch, aber man braucht genug Zeit für Schlaf, Sport und Freunde. Ich bin einverstanden, weil …' }] },
      ],
    },
    hoeren: {
      was: 'Ein Radiointerview', wo: 'Radio · Jugendsendung', titel: 'Und wie sieht deine Zukunft aus?',
      situation: 'Eine Radiomoderatorin spricht mit Noah und Amira über Medien und ihre Pläne für die Zukunft.',
      bild: ['lehrerin:froh:erklaeren', 'noah:froh'], sprecher: { Moderatorin: 'w1', Noah: 'm1', Amira: 'w2' },
      text: [
        ['Moderatorin', 'Hallo und willkommen bei „Junge Stimmen“! Heute im Studio: Noah und Amira. Noah, wie viel Zeit verbringst du am Handy?'],
        ['Noah', 'Ehrlich? Etwa drei Stunden am Tag. Meistens schaue ich Videos über Fußball und Technik.'],
        ['Moderatorin', 'Und du, Amira?'],
        ['Amira', 'Bei mir ist es weniger. Ich zeichne viel, und das mache ich lieber auf Papier. Aber manchmal zeige ich meine Bilder online.'],
        ['Moderatorin', 'Was meint ihr: Wie werden wir in zehn Jahren Medien nutzen?'],
        ['Noah', 'Ich glaube, dass vieles mit künstlicher Intelligenz passiert. Vielleicht hat dann jeder einen digitalen Assistenten.'],
        ['Amira', 'Das finde ich ein bisschen unheimlich. Ich hoffe, dass sich die Menschen trotzdem noch treffen und miteinander reden.'],
        ['Moderatorin', 'Und eure Pläne für die Zukunft?'],
        ['Amira', 'Ich möchte Grafikdesignerin werden. Dafür brauche ich beides: Papier und Computer.'],
        ['Noah', 'Ich will Elektroniker werden und später vielleicht Roboter bauen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Radiointerview? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Eine Person stellt Fragen, andere antworten.', 'Eine Person liest Nachrichten vor.', 'Man hört nur Musik.'], r: 0 }] }],
      beim: [
        { art: 'wer', auftrag: 'Hör zu. Wer sagt das?', stufe: 1, personen: ['Noah', 'Amira'], saetze: [['Ich bin etwa drei Stunden am Tag am Handy.', 'Noah'], ['Ich zeichne lieber auf Papier.', 'Amira'], ['Vieles passiert mit künstlicher Intelligenz.', 'Noah'], ['Das finde ich ein bisschen unheimlich.', 'Amira'], ['Ich möchte Grafikdesignerin werden.', 'Amira']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht selbst eine kleine Umfrage in der Klasse. Fragt nach der Meinung der anderen und sagt eure eigene.', stufe: 3, karten: [
        { titel: 'Fragen', text: ['Wie oft …?', 'Wie lange …?', 'Was machst du am liebsten am Handy?', 'Was meinst du: …?'] },
        { titel: 'Meinung', text: ['Ich finde, dass …', 'Meiner Meinung nach …', 'Und was denkst du?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Wie viele? Indefinitpronomen', tabelle: { kopf: ['', 'Beispiel'], zeilen: [['**alle** (100 %)', '**Alle** haben ein Handy.'], ['**fast alle**, **die meisten**', '**Die meisten** schauen Videos.'], ['**viele**', 'Für **viele** ist Fernsehen unwichtig.'], ['**einige**, **manche**', '**Einige** machen Pausen.'], ['**wenige**', 'Nur **wenige** lesen Zeitung.'], ['**niemand**, **keiner** (0 %)', '**Niemand** liest auf Papier.']] } }],
        [{ titel: 'jemand, niemand, jeder, etwas, nichts', punkte: ['**jemand** = eine Person (wer, weiß man nicht)', '**niemand** = keine Person · **jeder** = alle', '**etwas** ↔ **nichts**: Ich habe **etwas** gepostet. / Ich habe **nichts** gepostet.', 'Verb im Singular: Niemand **liest** … · Jeder **sollte** …'] },
         { art: 'tipp', titel: 'Diagramme lesen', text: 'Lies zuerst den **Titel**: Was wurde gefragt? Dann: **Wie viele** Personen? Was ist die **größte**, was die **kleinste** Gruppe?' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze: alle, einige, niemand, jemand, nichts.', stufe: 1, woerter: ['Alle', 'Einige', 'Niemand', 'jemand', 'nichts'], saetze: ['[Alle] 24 Jugendlichen haben ein Handy.', '[Einige] machen manchmal eine Handypause.', '[Niemand] liest die Zeitung auf Papier.', 'Hat [jemand] mein Ladekabel gesehen?', 'Heute habe ich noch [nichts] gepostet.'] },
      { art: 'fragen', auftrag: 'Schreib drei Sätze über das Diagramm. Benutze die größte Gruppe, einige, wenige.', stufe: 2, fragen: [{ f: '', zeilen: 3, l: '9 Jugendliche sind 2 bis 4 Stunden am Bildschirm – das ist die größte Gruppe. Einige sind mehr als 4 Stunden am Bildschirm. Nur wenige sind weniger als 1 Stunde am Bildschirm.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Wie nutzt du Medien? Schreib einen kurzen Text für die Klassenzeitung: Was ist gut, was ist zu viel? (Du darfst auch über eine ausgedachte Person schreiben.)', stufe: 2,
        anfaenge: ['Am liebsten …', 'Pro Tag bin ich ungefähr … am Bildschirm.', 'Gut finde ich, dass …', 'Zu viel ist es, wenn …', 'Mein Tipp: …'], zeilen: 10,
        beispiel: 'Am liebsten höre ich Musik und chatte mit meinen Freunden. Pro Tag bin ich ungefähr zwei Stunden am Bildschirm. Gut finde ich, dass ich immer erreichbar bin. Zu viel ist es, wenn ich abends nicht einschlafen kann. Mein Tipp: Das Handy nachts in die Küche legen!' },
    ],
    check: ['Ich verstehe Umfrageergebnisse und ein Diagramm.', 'Ich verstehe ein Radiointerview.', 'Ich sage meine Meinung und frage nach der Meinung anderer.', 'Ich benutze alle, einige, niemand, jemand.', 'Ich schreibe über Mediennutzung.'],
  },
  // ================================================================ 2
  {
    thema: 'Verpackungen · Adjektive mit -frei, -los, -bar', titel: 'Was steht auf der Packung?', untertitel: 'Haltbarkeit, Zubereitung, Anwendung: Du liest Packungen von Lebensmitteln und Medikamenten, hörst Durchsagen im Supermarkt – und bildest Adjektive.',
    ziel: { de: 'Ich verstehe wichtige Infos auf Verpackungen und Durchsagen im Geschäft.', fr: 'Je comprends les infos importantes des emballages et les annonces dans un magasin.' },
    bild: ['lina:verwirrt:blatt', 'verkaeuferin:froh:stehen'],
    start: {
      was: 'Auf der Packung',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet das? Verbinde.', stufe: 1, links: ['Mindestens haltbar bis 12.2027', 'Kühl lagern', 'Kann Spuren von Nüssen enthalten', 'Vor Gebrauch schütteln', 'Für Kinder unzugänglich aufbewahren'], rechts: ['mindestens bis Dezember 2027 gut', 'in den Kühlschrank stellen', 'gefährlich bei einer Nuss-Allergie', 'vorher die Flasche bewegen', 'so hinlegen, dass Kinder nicht drankommen'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Zwei Packungen', art: 'dokumente',
      quelle: 'Texte von zwei Packungen (ausgedachte Produkte)', titel: 'Was steht drauf?',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Fertigpizza Margherita**', text: ['**Zubereitung:** Backofen auf 220 °C vorheizen. Folie entfernen. Pizza auf dem Rost in der Mitte 12 bis 14 Minuten backen.', '**Lagerung:** tiefgekühlt bei minus 18 °C. Nach dem Auftauen nicht wieder einfrieren.', '**Zutaten:** Weizenmehl, Tomaten, Käse (Milch), Olivenöl, Salz, Hefe.'] },
        { stil: 'notiz', stimme: 'm1', kopf: '**Halstabletten mit Honig und Salbei**', text: ['**Anwendung:** Erwachsene und Jugendliche ab 12 Jahren: alle 2 bis 3 Stunden 1 Tablette langsam im Mund zergehen lassen. Höchstens 6 Tabletten pro Tag.', 'Kinder von 6 bis 11 Jahren: höchstens 3 Tabletten pro Tag. Nicht für Kinder unter 6 Jahren.', 'Wenn die Beschwerden länger als 3 Tage dauern oder Sie Fieber bekommen, fragen Sie Ihre Ärztin, Ihren Arzt oder in der Apotheke.', 'Für Kinder unzugänglich aufbewahren.'] },
      ],
      woerter: [['die Zubereitung', 'la préparation'], ['vorheizen', 'préchauffer'], ['tiefgekühlt', 'surgelé'], ['auftauen', 'décongeler'], ['die Anwendung', 'l’utilisation'], ['zergehen lassen', 'laisser fondre'], ['die Beschwerden', 'les symptômes'], ['unzugänglich', 'hors de portée']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Beantworte die Fragen.', stufe: 1, fragen: [{ f: 'Wie lange muss die Pizza backen?', l: '12 bis 14 Minuten' }, { f: 'Auf wie viel Grad heizt man den Ofen vor?', l: 'auf 220 Grad' }, { f: 'Wie viele Tabletten darf eine 13-Jährige pro Tag nehmen?', l: 'höchstens 6' }, { f: 'Was soll man tun, wenn man Fieber bekommt?', l: 'die Ärztin, den Arzt oder in der Apotheke fragen' }] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Man darf die Pizza nach dem Auftauen wieder einfrieren.', false], ['In der Pizza ist Milch.', true], ['Ein 8-jähriges Kind darf höchstens 3 Tabletten pro Tag nehmen.', true], ['Die Tabletten soll man schnell kauen.', false]] },
      ],
    },
    hoeren: {
      was: 'Durchsagen und ein Gespräch im Supermarkt', wo: 'Supermarkt', titel: 'Liebe Kundinnen und Kunden …',
      situation: 'Lina kauft im Supermarkt ein. Sie hört zwei Durchsagen. Danach fragt sie eine Verkäuferin um Hilfe.',
      bild: ['verkaeuferin:froh:stehen', 'lina:verwirrt'], sprecher: { Durchsage: 'm1', Lina: 'w2', Verkäuferin: 'w1' },
      text: [
        ['Durchsage', 'Liebe Kundinnen und Kunden! Heute im Angebot: frische Erdbeeren aus der Region, die Schale für nur zwei Euro neunundneunzig. Sie finden sie am Eingang.'],
        ['Durchsage', 'Eine Information: Wegen einer Reparatur ist die Kasse drei geschlossen. Bitte benutzen Sie die Kassen eins und zwei oder die Selbstbedienungskassen. Vielen Dank für Ihr Verständnis.'],
        ['Lina', 'Entschuldigung, können Sie mir helfen? Ich suche Kekse ohne Nüsse. Meine Freundin hat eine Allergie.'],
        ['Verkäuferin', 'Gern. Schau immer auf die Zutatenliste. Hier steht zum Beispiel: „Kann Spuren von Nüssen enthalten.“ Die sind also nicht sicher.'],
        ['Lina', 'Oh, das wusste ich nicht. Und diese hier?'],
        ['Verkäuferin', 'Die sind nussfrei. Das steht hier vorne, neben dem durchgestrichenen Nuss-Symbol.'],
        ['Lina', 'Super, danke! Und bis wann sind die haltbar?'],
        ['Verkäuferin', 'Mindestens bis März nächsten Jahres. Das Datum steht unten auf der Packung.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wo hört man Durchsagen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['im Supermarkt', 'am Bahnhof', 'im Kaufhaus', 'im eigenen Zimmer'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Was ist heute im Angebot?', o: ['Äpfel', 'Erdbeeren', 'Kekse'], r: 1 }, { f: 'Welche Kasse ist geschlossen?', o: ['Kasse 1', 'Kasse 2', 'Kasse 3'], r: 2 }, { f: 'Warum sucht Lina Kekse ohne Nüsse?', o: ['Sie mag keine Nüsse.', 'Ihre Freundin hat eine Allergie.'], r: 1 }, { f: 'Woran erkennt man die nussfreien Kekse?', o: ['am durchgestrichenen Nuss-Symbol', 'an der Farbe'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt Gespräche im Geschäft: Fragt nach Zutaten, Haltbarkeit oder Zubereitung.', stufe: 3, karten: [
        { titel: 'Kunde / Kundin', text: ['Entschuldigung, können Sie mir helfen?', 'Ist da … drin?', 'Bis wann ist das haltbar?', 'Wie bereitet man das zu?'] },
        { titel: 'Verkäufer/in', text: ['Das steht hier auf der Packung.', 'Das ist …frei.', 'Mindestens haltbar bis …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Adjektive bilden', tabelle: { kopf: ['Endung', 'Bedeutung', 'Beispiele'], zeilen: [['**-frei**', 'ohne', 'nussfrei, zuckerfrei, glutenfrei'], ['**-los**', 'ohne', 'kostenlos, farblos, hilflos'], ['**-arm**', 'mit wenig', 'zuckerarm, fettarm'], ['**-bar**', 'man kann es …', 'haltbar, essbar, waschbar'], ['**-ig**, **-lich**, **-isch**', 'hat etwas, ist wie …', 'salzig, gefährlich, typisch'], ['**un-**', 'nicht', 'ungesund, unzugänglich']] } }],
        [{ titel: 'Anweisungen auf Packungen', punkte: ['Oft im **Infinitiv**: **Kühl lagern.** · **Vor Gebrauch schütteln.**', 'Oder mit **Sie**: **Fragen Sie** Ihre Ärztin.', '**höchstens** = nicht mehr als', '**mindestens** = nicht weniger als'] },
         { art: 'achtung', titel: 'Medikamente', text: 'Lies immer die **Packungsbeilage**. Nimm nie mehr als angegeben. Bei Fragen: Ärztin, Arzt oder Apotheke. Im Notfall: **112**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Bilde das passende Adjektiv.', stufe: 1, saetze: ['(ohne Zucker) Dieser Saft ist [zuckerfrei].', '(kostet nichts) Der Eintritt ist [kostenlos].', '(man kann es waschen) Die Jacke ist [waschbar].', '(viel Salz) Die Chips sind sehr [salzig].', '(nicht gesund) Zu viel Zucker ist [ungesund].', '(eine Gefahr) Das Messer ist [gefährlich].'] },
      { art: 'abschreiben', auftrag: 'Schreib die Anweisung kurz – wie auf einer Packung.', stufe: 2, kopf: ['Satz', 'auf der Packung'], saetze: [['Sie müssen das Produkt kühl lagern.', 'Kühl lagern.'], ['Sie sollen die Flasche vor Gebrauch schütteln.', 'Vor Gebrauch schütteln.'], ['Sie müssen den Backofen vorheizen.', 'Backofen vorheizen.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erfinde ein Produkt (Snack, Getränk, Creme …) und schreib den Text für die Packung.', stufe: 2,
        anfaenge: ['Name: …', 'Zutaten: …', 'Zubereitung / Anwendung: …', 'Lagerung: …', 'Mindestens haltbar bis: …'], zeilen: 9,
        beispiel: 'Name: Sonnenriegel. Zutaten: Haferflocken, Honig, Äpfel, Kürbiskerne. Ohne Zuckerzusatz, nussfrei. Zubereitung: einfach auspacken und genießen. Lagerung: trocken lagern, nicht über 25 Grad. Mindestens haltbar bis: 06.2027.' },
    ],
    check: ['Ich verstehe Infos auf Lebensmittelpackungen.', 'Ich verstehe Hinweise zur Anwendung von Medikamenten.', 'Ich verstehe Durchsagen im Geschäft.', 'Ich bilde Adjektive mit -frei, -los, -bar und un-.', 'Ich frage im Geschäft nach Zutaten und Haltbarkeit.'],
  },
  // ================================================================ 3
  {
    thema: 'Nachrichten · W-Fragen', titel: 'Was ist passiert?', untertitel: 'Ein Zeitungsbericht über einen Sturm, Verkehrsmeldungen und Wetter im Radio: Du findest heraus, was, wann und wo passiert ist.',
    ziel: { de: 'Ich verstehe die wichtigsten Infos aus Nachrichten: was, wann, wo, wer.', fr: 'Je comprends l’essentiel des informations : quoi, quand, où, qui.' },
    bild: ['opa:besorgt:blatt', 'ben:ueberrascht'],
    start: {
      was: 'Die W-Fragen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welche Antwort passt zu welcher Frage? Verbinde.', stufe: 1, links: ['Was?', 'Wann?', 'Wo?', 'Wer?', 'Wie?', 'Warum?'], rechts: ['ein Sturm', 'in der Nacht auf Mittwoch', 'im Osten von Luxemburg', 'die Feuerwehr', 'mit bis zu 110 km/h', 'wegen eines Tiefs über der Nordsee'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    lesen: {
      was: 'Ein Zeitungsbericht', art: 'text', stimme: 'm1', nummern: true,
      quelle: 'Lokalzeitung (ausgedachte Meldung)', titel: 'Sturm in der Nacht: Bäume auf den Straßen',
      absaetze: [
        '**Junglinster/Echternach.** In der Nacht auf Mittwoch ist ein starker Sturm über den Osten Luxemburgs gezogen. Der Wind erreichte bis zu **110 Kilometer pro Stunde**.',
        'Viele Bäume **wurden** umgerissen. Die Feuerwehr **wurde** mehr als **80-mal** gerufen und arbeitete die ganze Nacht. **Verletzt wurde niemand.**',
        'Die Straße zwischen Junglinster und Echternach **wurde** am Morgen **gesperrt**, weil zwei große Bäume auf der Fahrbahn lagen. Die Busse fuhren deshalb mit Verspätung.',
        'In einigen Dörfern gab es bis 9 Uhr **keinen Strom**. Zwei Schulen blieben am Vormittag geschlossen.',
        'Der Wetterdienst sagt: Am Wochenende wird es ruhiger. Trotzdem soll man bei Sturm **nicht in den Wald gehen**.',
      ],
      woerter: [['der Sturm', 'la tempête'], ['erreichen', 'atteindre'], ['umreißen', 'renverser, arracher'], ['die Feuerwehr', 'les pompiers'], ['verletzt', 'blessé'], ['sperren', 'fermer (une route)'], ['die Fahrbahn', 'la chaussée'], ['der Strom', 'le courant']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Beantworte die W-Fragen.', stufe: 1, kopf: ['Frage', 'Antwort'], breiten: [25, 75], zeilen: [['Was?', '[ein starker Sturm]'], ['Wann?', '[in der Nacht auf Mittwoch]'], ['Wo?', '[im Osten Luxemburgs, zum Beispiel Junglinster und Echternach]'], ['Wer hat geholfen?', '[die Feuerwehr]'], ['Folgen?', '[Bäume umgerissen, Straße gesperrt, kein Strom, Schulen geschlossen]']] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Mehrere Menschen wurden verletzt.', false], ['Die Feuerwehr arbeitete die ganze Nacht.', true], ['Die Busse fuhren pünktlich.', false], ['Am Wochenende wird es ruhiger.', true]] },
      ],
    },
    hoeren: {
      was: 'Nachrichten, Verkehr und Wetter im Radio', wo: 'Radio · am Morgen', titel: 'Es ist sieben Uhr – die Nachrichten',
      situation: 'Ben hört am Morgen mit seinem Opa Radio, bevor er zur Schule geht: Nachrichten, Verkehr und Wetter.',
      bild: ['ben:verwirrt:handy', 'opa:froh'], sprecher: { Sprecherin: 'w1', Sprecher: 'm1', Ben: 'm3', Opa: 'm2' },
      text: [
        ['Sprecherin', 'Es ist sieben Uhr. Die Nachrichten. Nach dem Sturm in der Nacht räumt die Feuerwehr im Osten des Landes noch viele Straßen frei. Verletzt wurde niemand.'],
        ['Sprecher', 'Und jetzt der Verkehr. Auf der A7 Richtung Ettelbrück gibt es nach einem Unfall drei Kilometer Stau. Ein Fahrstreifen ist gesperrt.'],
        ['Sprecher', 'Die Straße zwischen Junglinster und Echternach bleibt bis zehn Uhr gesperrt. Die Busse fahren eine Umleitung und haben etwa zwanzig Minuten Verspätung.'],
        ['Sprecherin', 'Das Wetter: Heute ist es zuerst noch windig, am Nachmittag wird es freundlicher. Die Temperaturen liegen bei zwölf Grad.'],
        ['Ben', 'Opa, hast du gehört? Mein Bus hat zwanzig Minuten Verspätung.'],
        ['Opa', 'Dann hast du ja noch Zeit für ein Frühstück. Aber schreib deiner Lehrerin, dass du später kommst.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was hört man oft am Morgen im Radio? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Verkehr', 'Wetter', 'Nachrichten', 'Hausaufgaben'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze die Informationen.', stufe: 1, kopf: ['', 'Info'], breiten: [35, 65], zeilen: [['Uhrzeit', '[7 Uhr]'], ['Stau auf der A7', '[3 Kilometer, nach einem Unfall]'], ['Straße gesperrt bis', '[10 Uhr]'], ['Busse', '[Umleitung, etwa 20 Minuten Verspätung]'], ['Wetter', '[zuerst windig, später freundlicher, 12 Grad]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt eine Radiosendung: Eine Person liest Nachrichten, eine den Verkehr, eine das Wetter. Erfindet die Meldungen.', stufe: 3, karten: [
        { titel: 'Nachrichten', text: ['Es ist … Uhr. Die Nachrichten.', 'In … ist … passiert.', 'Verletzt wurde …'] },
        { titel: 'Verkehr', text: ['Auf der … gibt es …', '… ist gesperrt.'] },
        { titel: 'Wetter', text: ['Heute ist es …', 'Am Nachmittag …', 'Die Temperaturen …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Nachrichten verstehen: die W-Fragen', punkte: ['**Was** ist passiert? **Wann**? **Wo**?', '**Wer** war dabei? **Wie** ist es passiert? **Warum**?', 'Die wichtigsten Infos stehen meistens im **ersten Satz**.'] },
         { titel: 'Passiv in Nachrichten', punkte: ['Viele Bäume **wurden** umgerissen.', 'Die Straße **wurde** gesperrt.', 'Verletzt **wurde** niemand.', '**wurde / wurden** + Partizip II: Wer es getan hat, ist nicht wichtig.'] }],
        [{ art: 'tipp', titel: 'Stimmt die Nachricht?', text: 'Im Internet gibt es auch **falsche Nachrichten**. Prüfe: **Wer** schreibt das? Finde ich die Info auch in einer **zweiten Quelle**? Gibt es ein **Datum**?' },
         { art: 'achtung', titel: 'Bei Unwetter', text: 'Bei Sturm nicht in den Wald gehen. Im Notfall: **112**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze wurde oder wurden.', stufe: 1, saetze: ['Die Straße [wurde] am Morgen gesperrt.', 'Viele Bäume [wurden] umgerissen.', 'Die Feuerwehr [wurde] 80-mal gerufen.', 'Zwei Schulen [wurden] geschlossen.'] },
      { art: 'abschreiben', auftrag: 'Mach aus Stichwörtern eine kurze Nachricht.', stufe: 2, kopf: ['Stichwörter', 'Nachricht'], saetze: [['Dienstag · Brand in Bäckerei · Mersch · niemand verletzt', 'Am Dienstag hat es in einer Bäckerei in Mersch gebrannt. Verletzt wurde niemand.'], ['heute · Stau A1 · Unfall · 5 km', 'Heute gibt es auf der A1 nach einem Unfall 5 Kilometer Stau.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine kurze Nachricht für die Schülerzeitung über ein Ereignis an deiner Schule oder in deinem Ort (echt oder erfunden). Beantworte die W-Fragen.', stufe: 2,
        anfaenge: ['Am … ist in … passiert.', 'Dabei …', 'Die Feuerwehr / Die Schule / …', 'Zum Glück …'], zeilen: 9,
        beispiel: 'Am Montag ist in unserer Schule der Strom ausgefallen. Dabei waren gerade alle im Unterricht. Die Computer und das Licht gingen aus. Die Hausmeisterin hat das Problem nach einer Stunde gelöst. Zum Glück ist nichts kaputtgegangen.' },
    ],
    check: ['Ich verstehe einen kurzen Zeitungsbericht.', 'Ich verstehe Nachrichten, Verkehr und Wetter im Radio.', 'Ich finde Antworten auf die W-Fragen.', 'Ich erkenne das Passiv mit wurde.', 'Ich schreibe eine kurze Nachricht.'],
  },
  // ================================================================ 4
  {
    thema: 'Reiseberichte · indirekte Fragen', titel: 'Vier Tage Köln', untertitel: 'Ein Reisetagebuch im Internet, ein Telefonat unter Freunden und eine eigene Recherche: Am Ende gestaltest du ein Poster über ein Reiseziel.',
    ziel: { de: 'Ich verstehe Reiseberichte, stelle indirekte Fragen und präsentiere ein Reiseziel.', fr: 'Je comprends des récits de voyage, je pose des questions indirectes et je présente une destination.' },
    bild: ['mia:froh:handy', 'nele:aufgeregt'],
    start: {
      was: 'Unterwegs',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was passt zusammen? Verbinde.', stufe: 1, links: ['den Zug', 'in der Jugendherberge', 'bei einer Stadtführung', 'Souvenirs', 'eine Postkarte'], rechts: ['nehmen', 'übernachten', 'mitmachen', 'kaufen', 'schreiben'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Reisetagebuch im Internet', art: 'dokumente',
      quelle: 'Online-Forum „Unterwegs“ · Reisetagebuch', titel: 'Mias Reisetagebuch',
      dokumente: [
        { stil: 'nachricht', stimme: 'w2', kopf: '**Tag 1 – Montag:** Endlich in Köln!', text: ['Um 8 Uhr sind wir mit dem Jugendhaus in Luxemburg in den Zug gestiegen. In Koblenz mussten wir umsteigen. Nach etwa vier Stunden waren wir in Köln. Wenn man aus dem Bahnhof kommt, sieht man sofort den riesigen **Dom**! Unsere Jugendherberge liegt direkt am Rhein.'] },
        { stil: 'nachricht', stimme: 'w2', kopf: '**Tag 2 – Dienstag:** 533 Stufen', text: ['Heute sind wir auf den Südturm des Doms gestiegen: 533 Stufen! Oben war ich total kaputt, aber die Aussicht war es wert. Am Nachmittag waren wir im Schokoladenmuseum. Dort sieht man, wie Schokolade gemacht wird – und man darf probieren.'] },
        { stil: 'nachricht', stimme: 'w2', kopf: '**Tag 3 – Mittwoch:** Regen und Rhein', text: ['Leider hat es den ganzen Tag geregnet. Trotzdem haben wir eine Schifffahrt auf dem Rhein gemacht. Abends haben wir in der Jugendherberge Spiele gespielt. Übermorgen fahren wir schon zurück. Hat jemand einen Tipp, wo man in Köln gut und günstig essen kann?'] },
      ],
      woerter: [['die Jugendherberge', 'l’auberge de jeunesse'], ['umsteigen', 'changer (de train)'], ['riesig', 'énorme'], ['der Dom', 'la cathédrale'], ['die Stufe', 'la marche'], ['die Aussicht', 'la vue'], ['es wert sein', 'valoir la peine'], ['die Schifffahrt', 'la promenade en bateau']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was hat Mia an welchem Tag gemacht?', stufe: 1, kopf: ['Tag', 'Was hat Mia gemacht?'], breiten: [22, 78], zeilen: [['Montag', '[mit dem Zug nach Köln gefahren, in Koblenz umgestiegen]'], ['Dienstag', '[auf den Domturm gestiegen, im Schokoladenmuseum gewesen]'], ['Mittwoch', '[Schifffahrt auf dem Rhein, abends Spiele]']] },
        { art: 'fragen', auftrag: 'Beantworte die Fragen.', stufe: 2, fragen: [{ f: 'Wie war das Wetter am Mittwoch?', l: 'Es hat den ganzen Tag geregnet.' }, { f: 'Was möchte Mia im Forum wissen?', l: 'Wo man in Köln gut und günstig essen kann.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Telefonat unter Freunden', wo: 'Telefonat', titel: 'Weißt du, ob es noch Plätze gibt?',
      situation: 'Sami ruft Ben an. Er hat auf der Internetseite vom Jugendhaus ein Angebot gesehen: eine Fahrt zum Kletterpark.',
      bild: ['sami:froh:handy', 'ben:froh:handy'], sprecher: { Sami: 'm3', Ben: 'm1' },
      text: [
        ['Sami', 'Hey Ben, hast du kurz Zeit? Ich habe auf der Seite vom Jugendhaus etwas Cooles gesehen.'],
        ['Ben', 'Klar. Was denn?'],
        ['Sami', 'Im Mai gibt es eine Fahrt zum Kletterpark. Weißt du, ob du da Zeit hast?'],
        ['Ben', 'Das klingt super! Kannst du mir sagen, an welchem Tag das ist?'],
        ['Sami', 'Am Samstag, dem fünfzehnten Mai. Abfahrt ist um acht Uhr am Jugendhaus.'],
        ['Ben', 'Und weißt du, wie viel das kostet?'],
        ['Sami', 'Fünfzehn Euro, mit Mittagessen. Ich weiß aber nicht, ob es noch Plätze gibt.'],
        ['Ben', 'Dann frag doch mal nach, wie viele Plätze noch frei sind. Ich frage zu Hause, ob ich mitfahren darf.'],
        ['Sami', 'Mach ich. Ich schreibe dir gleich eine Nachricht. Bis dann!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie fragst du höflich nach einer Information? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Weißt du, ob …?', 'Kannst du mir sagen, wann …?', 'Sag sofort, wann!'], r: [0, 1] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Mach Notizen.', stufe: 1, kopf: ['', 'Info'], breiten: [30, 70], zeilen: [['Was?', '[Fahrt zum Kletterpark]'], ['Wann?', '[Samstag, 15. Mai]'], ['Abfahrt', '[8 Uhr am Jugendhaus]'], ['Preis', '[15 Euro mit Mittagessen]'], ['noch offen', '[Gibt es noch Plätze?]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Telefoniert mit einem Freund oder einer Freundin über ein Angebot im Internet (Konzert, Kurs, Ausflug). Benutzt indirekte Fragen.', stufe: 3, karten: [
        { titel: 'Fragen', text: ['Weißt du, ob …?', 'Kannst du mir sagen, wann / wo / wie viel …?', 'Ich frage mal nach, ob …'] },
        { titel: 'Beenden', text: ['Ich schreibe dir gleich.', 'Bis dann!'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Indirekte Fragen', punkte: ['**W-Frage:** Wann fährt der Bus? → Kannst du mir sagen, **wann** der Bus **fährt**?', '**Ja/Nein-Frage:** Gibt es noch Plätze? → Weißt du, **ob** es noch Plätze **gibt**?', 'Verb **am Ende** – wie bei weil und dass.'] },
         { titel: 'Typische Anfänge', punkte: ['Weißt du, …', 'Kannst du mir sagen, …', 'Können Sie mir sagen, …', 'Ich möchte wissen, …', 'Ich frage mal nach, …'] }],
        [{ art: 'tipp', titel: 'Eine Internetrecherche planen', text: '1. **Was** will ich wissen? 2. **Suchwörter** notieren. 3. **Zwei Quellen** vergleichen. 4. Wichtiges **mit eigenen Worten** aufschreiben. 5. **Quellen** für Texte und Bilder notieren.' },
         { art: 'achtung', titel: 'Indirekt ist höflicher', text: '„Wann kommt der Zug?“ ist okay. „**Können Sie mir sagen, wann** der Zug **kommt**?“ ist höflicher.' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Mach eine indirekte Frage.', stufe: 2, kopf: ['direkte Frage', 'indirekte Frage'], saetze: [['Wann beginnt das Konzert?', 'Weißt du, wann das Konzert beginnt?'], ['Ist der Kletterpark offen?', 'Weißt du, ob der Kletterpark offen ist?'], ['Wo ist die Jugendherberge?', 'Können Sie mir sagen, wo die Jugendherberge ist?'], ['Kostet die Führung etwas?', 'Ich möchte wissen, ob die Führung etwas kostet.']] },
      { art: 'tabelle', auftrag: 'Plane eine Recherche über ein Reiseziel deiner Wahl.', stufe: 2, kopf: ['Schritt', 'Meine Notizen'], breiten: [36, 64], zeilen: [['Reiseziel', ''], ['Was will ich wissen?', ''], ['Suchwörter', ''], ['Quelle 1', ''], ['Quelle 2', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Gestalte ein Poster über ein Reiseziel in Luxemburg oder anderswo. Schreib hier zuerst die Texte für dein Poster.', stufe: 2,
        anfaenge: ['… liegt in …', 'Man kommt hin mit …', 'Sehenswert ist …', 'Mein Tipp: …', 'Quellen: …'], zeilen: 10,
        beispiel: 'Vianden liegt im Norden von Luxemburg, an der Our. Man kommt mit dem Bus hin. Sehenswert ist das große Schloss auf dem Berg. Mit dem Sessellift fährt man hoch und hat eine tolle Aussicht. Mein Tipp: Im Herbst gibt es einen Nussmarkt. Quellen: Internetseite der Gemeinde, Reiseführer.' },
    ],
    check: ['Ich verstehe ein Reisetagebuch.', 'Ich verstehe ein Telefonat unter Freunden.', 'Ich stelle indirekte Fragen mit ob, wann, wo.', 'Ich plane eine Internetrecherche.', 'Ich präsentiere ein Reiseziel auf einem Poster.'],
  },
  // ================================================================ 5
  {
    thema: 'Netiquette · jemand, niemand', titel: 'Fair im Netz', untertitel: 'Regeln für den Klassenchat, Abkürzungen und ein Gespräch über ein geteiltes Foto: Du erklärst, wie man sich im Internet verhält – und wo man Hilfe bekommt.',
    ziel: { de: 'Ich verstehe und erkläre Regeln für das Verhalten im Internet.', fr: 'Je comprends et j’explique les règles de comportement sur Internet.' },
    bild: ['chloe:froh:handy', 'yusuf:besorgt'],
    start: {
      was: 'Abkürzungen im Chat',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeuten die Abkürzungen? Verbinde.', stufe: 1, links: ['LG', 'vllt', 'kA', 'bb', 'hdl'], rechts: ['Liebe Grüße', 'vielleicht', 'keine Ahnung', 'bis bald', 'hab dich lieb'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Regeln für den Klassenchat', art: 'text', stimme: 'w2', nummern: true,
      quelle: 'Von der Klasse gemeinsam beschlossen', titel: 'Netiquette: 7 Regeln für unseren Klassenchat',
      absaetze: [
        '**Wir sind freundlich.** Hinter jedem Namen sitzt ein Mensch. Was man nicht ins Gesicht sagen würde, schreibt man auch nicht.',
        '**Wir posten keine Fotos oder Videos von anderen ohne Erlaubnis.** Jeder entscheidet selbst über sein Bild.',
        '**Wir leiten keine privaten Nachrichten und keine Screenshots weiter.** Was jemand nur dir schreibt, bleibt bei dir.',
        '**Der Chat ist für die Schule.** Hausaufgaben, Termine, Fragen – ja. Kettenbriefe und Werbung – nein.',
        '**Nach 21 Uhr ist Ruhe.** Niemand muss nachts antworten.',
        '**Wir schreiben nicht alles in Großbuchstaben.** Das wirkt wie Schreien.',
        '**Wenn jemand verletzt wird, sagen wir es einer erwachsenen Person.** Das ist kein Petzen, sondern Hilfe.',
      ],
      woerter: [['die Erlaubnis', 'la permission'], ['weiterleiten', 'transférer'], ['der Kettenbrief', 'la chaîne (message)'], ['der Großbuchstabe', 'la majuscule'], ['wirken', 'avoir l’air'], ['verletzen', 'blesser'], ['petzen', 'cafarder'], ['beschließen', 'décider']],
      aufgaben: [
        { art: 'mc', auftrag: 'Gegen welche Regel verstößt die Person? Kreuze an.', stufe: 1, fragen: [{ f: 'Sami schickt um 23 Uhr zehn Sprachnachrichten.', o: ['Regel 2', 'Regel 5', 'Regel 6'], r: 1 }, { f: 'Lea postet ein lustiges Foto von Ben – ohne zu fragen.', o: ['Regel 2', 'Regel 4', 'Regel 7'], r: 0 }, { f: 'Jemand schreibt: „WER HAT MEIN HEFT???“', o: ['Regel 1', 'Regel 3', 'Regel 6'], r: 2 }, { f: 'Finn macht einen Screenshot von Mias privater Nachricht und schickt ihn weiter.', o: ['Regel 3', 'Regel 4', 'Regel 5'], r: 0 }] },
        { art: 'fragen', auftrag: 'Welche Regel findest du am wichtigsten? Warum?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Regel 2 ist am wichtigsten, weil jeder selbst über sein Foto entscheiden soll.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch über ein Problem im Chat', wo: 'Gespräch mit der Vertrauenslehrerin', titel: 'Das Foto ist überall',
      situation: 'Yusuf hat ein Problem: Ein peinliches Foto von ihm wurde im Klassenchat geteilt. Er spricht mit Frau Sommer.',
      bild: ['yusuf:traurig', 'lehrerin:ruhig:erklaeren'], sprecher: { Yusuf: 'm3', 'Frau Sommer': 'w1' },
      text: [
        ['Yusuf', 'Frau Sommer, haben Sie kurz Zeit? Gestern hat jemand ein Foto von mir in den Klassenchat gestellt. Ich bin beim Sport hingefallen. Alle lachen darüber.'],
        ['Frau Sommer', 'Danke, dass du zu mir kommst, Yusuf. Das war mutig. Wie geht es dir damit?'],
        ['Yusuf', 'Nicht gut. Ich will morgen gar nicht in die Schule.'],
        ['Frau Sommer', 'Das verstehe ich. Wir lösen das zusammen. Hast du schon geantwortet?'],
        ['Yusuf', 'Nein. Ich wollte erst etwas Gemeines zurückschreiben, aber dann habe ich es gelassen.'],
        ['Frau Sommer', 'Sehr gut. Mach bitte Screenshots als Beweis. Dann bitten wir die Person, das Foto zu löschen. Ich spreche auch mit der Klasse über eure Chat-Regeln.'],
        ['Yusuf', 'Und wenn das Foto schon woanders ist?'],
        ['Frau Sommer', 'Dann kann man es bei der Plattform melden. Und die BEE SECURE Helpline berät dich kostenlos. Du musst das nicht allein schaffen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was kann man tun, wenn im Chat etwas Gemeines passiert? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['mit einer erwachsenen Person sprechen', 'Screenshots als Beweis machen', 'etwas Gemeines zurückschreiben'], r: [0, 1] }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Das Foto zeigt Yusuf beim Sport.', true], ['Yusuf hat etwas Gemeines zurückgeschrieben.', false], ['Frau Sommer sagt: Mach Screenshots als Beweis.', true], ['Frau Sommer will mit der Klasse über die Regeln sprechen.', true], ['Die Beratung kostet Geld.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erklärt jüngeren Schülerinnen und Schülern drei Regeln für den Chat. Begründet jede Regel.', stufe: 3, karten: [
        { titel: 'Regeln erklären', text: ['Im Chat sollte man …, weil …', 'Man darf nie …', 'Wenn jemand …, dann …'] },
        { titel: 'Hilfe', text: ['Sprich mit einer erwachsenen Person.', 'BEE SECURE Helpline: 8002 1234', 'Kinder- und Jugendtelefon: 116 111'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Regeln erklären', punkte: ['Man **darf** keine Fotos ohne Erlaubnis posten.', 'Man **sollte** freundlich bleiben.', 'Man **muss** nachts **nicht** antworten. (= es ist nicht nötig)', 'Begründen: …, **weil** hinter jedem Namen ein Mensch sitzt.'] },
         { titel: 'jemand, niemand, etwas, nichts', punkte: ['**Jemand** hat ein Foto geteilt. (eine Person)', '**Niemand** muss nachts antworten. (keine Person)', 'Hat er **etwas** geschrieben? – Nein, **nichts**.', '**Jeder** entscheidet selbst über sein Bild.'] }],
        [{ titel: 'Abkürzungen', tabelle: { kopf: ['kurz', 'lang'], zeilen: [['LG', 'Liebe Grüße'], ['vllt', 'vielleicht'], ['kA', 'keine Ahnung'], ['bb', 'bis bald'], ['MfG', 'Mit freundlichen Grüßen (nur in Briefen und E-Mails)']] } },
         { art: 'achtung', titel: 'Hilfe holen', text: 'Wirst du im Netz beleidigt oder bloßgestellt? Mach Screenshots, antworte nicht, sprich mit einer erwachsenen Person. **BEE SECURE Helpline: 8002 1234** (gratis) · **116 111**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze: jemand, niemand, etwas, nichts, alle.', stufe: 1, woerter: ['Jemand', 'niemand', 'etwas', 'nichts', 'alle'], saetze: ['[Jemand] hat mein Foto geteilt.', 'Nach 21 Uhr muss [niemand] antworten.', 'Hast du [etwas] im Chat geschrieben?', 'Nein, ich habe [nichts] geschrieben.', 'Die Regeln gelten für [alle].'] },
      { art: 'abschreiben', auftrag: 'Schreib die Nachricht freundlich.', stufe: 2, kopf: ['unfreundlich', 'freundlich'], saetze: [['WER HAT MEIN LADEKABEL???', 'Hallo, hat jemand mein Ladekabel gesehen? Danke!'], ['Bist du blöd? Das war die falsche Seite.', 'Ich glaube, das war die falsche Seite. Es ist Seite 24.'], ['Antworte endlich!!!', 'Kannst du mir bitte antworten, wenn du Zeit hast?']] },
      { art: 'tabelle', auftrag: 'Abkürzungsverzeichnis: Sammelt Abkürzungen aus Chats, Schule und Anzeigen.', stufe: 2, kopf: ['Abkürzung', 'lange Form', 'Wo benutzt man sie?'], zeilen: [['z. B.', '[zum Beispiel]', '[überall]'], ['usw.', '[und so weiter]', '[in Texten]'], ['LG', '[Liebe Grüße]', '[im Chat, in Nachrichten]'], ['', '', ''], ['', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib Regeln für einen Gruppenchat (Sportverein, Klasse, Freunde). Erkläre jede Regel mit einem Grund.', stufe: 2,
        anfaenge: ['Regeln für unseren …-Chat', '1. Man darf nicht …, weil …', '2. Man sollte …, damit …', '3. Wenn jemand …, dann …'], zeilen: 10,
        beispiel: 'Regeln für unseren Fußball-Chat: 1. Man darf keine Fotos ohne Erlaubnis posten, weil jeder selbst über sein Bild entscheidet. 2. Man sollte nur über das Training schreiben, damit der Chat übersichtlich bleibt. 3. Wenn jemand beleidigt wird, dann sagen wir es dem Trainer. 4. Nach 21 Uhr schreibt niemand mehr.' },
    ],
    check: ['Ich verstehe Regeln für das Verhalten im Internet.', 'Ich verstehe ein Gespräch über ein Problem im Chat.', 'Ich erkläre Regeln und begründe sie.', 'Ich kenne Abkürzungen und lege ein Verzeichnis an.', 'Ich weiß, wo ich Hilfe bekomme.'],
  },
  // ================================================================ 6
  {
    thema: 'Werbung · Werbesprache', titel: 'Kauf mich!', untertitel: 'Anzeigen, ein Influencer-Post und Werbespots im Radio: Du erkennst die Tricks der Werbung – und gestaltest selbst eine ehrliche Anzeige.',
    ziel: { de: 'Ich erkenne Tricks der Werbesprache und gestalte eine eigene Anzeige.', fr: 'Je reconnais les astuces de la publicité et je crée ma propre annonce.' },
    bild: ['tom:verwirrt:handy', 'amira:froh:verschraenkt'],
    start: {
      was: 'Werbetricks',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welcher Trick steckt dahinter? Verbinde.', stufe: 1, links: ['„Nur heute!“', '„Die Nummer 1!“', '„Alle lieben es!“', '„Ab 9,99 €*“', '„Spür die Freiheit!“'], rechts: ['Zeitdruck', 'Superlativ', 'Alle machen mit.', 'Kleingedrucktes', 'Gefühle'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Drei Werbetexte', art: 'dokumente',
      quelle: 'Anzeigen und ein Post (ausgedachte Marken)', titel: 'Werbung überall',
      dokumente: [
        { stil: 'karte', stimme: 'm1', kopf: '**AIRSTEP X** – Schweben statt Laufen!', text: ['Die leichtesten Sportschuhe aller Zeiten. Unglaublich bequem, unschlagbar schnell.', 'Profis tragen sie. Und du?', '**Nur diese Woche:** 20 % Rabatt!'] },
        { stil: 'nachricht', stimme: 'w1', kopf: '**Handytarif SURF FREE**', text: ['Unbegrenzt surfen für nur **9,99 €*** im Monat!', 'Jetzt wechseln und gratis Kopfhörer sichern!', '*in den ersten 3 Monaten, danach 29,99 € im Monat. Mindestlaufzeit 24 Monate.'] },
        { stil: 'notiz', stimme: 'w2', kopf: '@lena.glow · **#Anzeige**', text: ['Ihr fragt mich ständig, warum meine Haut so strahlt. Mein Geheimnis: die neue Glow-Creme! Ich benutze sie jeden Morgen.', 'Mit meinem Code LENA15 bekommt ihr 15 % Rabatt. Link in meinem Profil!'] },
      ],
      woerter: [['schweben', 'planer'], ['bequem', 'confortable'], ['unschlagbar', 'imbattable'], ['der Rabatt', 'la réduction'], ['unbegrenzt', 'illimité'], ['die Mindestlaufzeit', 'la durée minimale'], ['strahlen', 'rayonner'], ['die Anzeige', 'la publicité']],
      aufgaben: [
        { art: 'wer', auftrag: 'Welcher Trick steckt in welcher Werbung? Kreuze an (manchmal mehrere).', stufe: 1, personen: ['AIRSTEP', 'SURF FREE', 'lena.glow'], saetze: [['ein Superlativ: „… aller Zeiten“', 'AIRSTEP'], ['Zeitdruck: „Nur diese Woche“', 'AIRSTEP'], ['Kleingedrucktes mit Sternchen', 'SURF FREE'], ['Eine bekannte Person empfiehlt das Produkt.', 'lena.glow'], ['Es gibt Rabatt.', ['AIRSTEP', 'lena.glow']], ['Etwas ist „gratis“.', 'SURF FREE']] },
        { art: 'fragen', auftrag: 'Beantworte die Fragen.', stufe: 2, fragen: [{ f: 'Wie viel kostet SURF FREE nach drei Monaten?', l: '29,99 € im Monat' }, { f: 'Woran erkennst du, dass der Post von @lena.glow Werbung ist?', l: 'an „#Anzeige“' }] },
      ],
    },
    hoeren: {
      was: 'Werbespots im Radio', wo: 'Radio · Werbepause', titel: 'Und jetzt: Werbung!',
      situation: 'Im Radio laufen zwei Werbespots. Danach sprechen Tom und Amira darüber.',
      bild: ['tom:aufgeregt', 'amira:verwirrt:verschraenkt'], sprecher: { Werbesprecher: 'm1', Werbesprecherin: 'w1', Tom: 'm3', Amira: 'w2' },
      text: [
        ['Werbesprecher', 'Hör deine Gegner, bevor sie dich hören! Das neue Headset „Ultra 7“. Kristallklarer Sound, dreißig Stunden Akku. Jetzt nur neunundvierzig Euro – solange der Vorrat reicht!'],
        ['Werbesprecherin', 'Familientag im Kino am Markt! Jeden Sonntag zahlen Kinder und Jugendliche bis sechzehn nur fünf Euro. Popcorn gratis dazu. Kommt vorbei!'],
        ['Tom', 'Das Headset will ich haben! Kristallklarer Sound!'],
        ['Amira', 'Warte mal. Was heißt denn „kristallklar“? Das sagt doch jede Werbung.'],
        ['Tom', 'Hm, stimmt. Und „solange der Vorrat reicht“ – das soll Druck machen, oder?'],
        ['Amira', 'Genau. Ich würde zuerst Tests im Internet lesen und Preise vergleichen.'],
        ['Tom', 'Okay, okay. Ich schlafe eine Nacht darüber.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was will ein Werbespot? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['dass wir etwas kaufen', 'dass wir uns das Produkt merken', 'dass wir lange nachdenken'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Wie lange hält der Akku des Headsets?', o: ['3 Stunden', '13 Stunden', '30 Stunden'], r: 2 }, { f: 'Wer zahlt am Sonntag nur fünf Euro im Kino?', o: ['alle', 'Kinder und Jugendliche bis 16', 'nur Erwachsene'], r: 1 }, { f: 'Was will Amira vor dem Kauf machen?', o: ['Tests lesen und Preise vergleichen', 'sofort kaufen'], r: 0 }] },
        { art: 'fragen', auftrag: 'Welcher Satz soll Druck machen? Warum?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: '„Solange der Vorrat reicht“ – man soll schnell kaufen, bevor alles weg ist.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Analysiert eine echte Werbung (Plakat, Video, Post). Welche Tricks benutzt sie? Wie wirkt sie auf euch?', stufe: 3, karten: [
        { titel: 'Analysieren', text: ['Die Werbung zeigt …', 'Der Trick ist: …', 'Das soll bewirken, dass …'] },
        { titel: 'Bewerten', text: ['Mich überzeugt das, weil …', 'Mich überzeugt das nicht, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Werbesprache', punkte: ['**Superlative:** die leichtesten, das beste …', '**Starke Adjektive:** unglaublich, unschlagbar, einzigartig', '**Imperativ:** Kauf! Hol dir …! Kommt vorbei!', '**du statt Sie:** Werbung will nah sein.', '**Englische Wörter:** Power, Sound, Glow'] },
         { titel: 'Verkaufstricks', punkte: ['**Zeitdruck:** Nur heute! Solange der Vorrat reicht!', '**Sternchen:** Das Wichtige steht klein unten.', '**Influencer:** Eine bekannte Person empfiehlt es.', '**Gratis-Geschenk:** Man fühlt sich beschenkt.'] }],
        [{ art: 'tipp', titel: 'Vor dem Kauf', text: '**Brauche ich das wirklich?** · Kleingedrucktes lesen · Preise vergleichen · Tests lesen · eine Nacht darüber schlafen.' },
         { art: 'achtung', titel: '#Anzeige', text: 'Bekommen Influencer Geld oder Geschenke für einen Post, muss **Werbung** oder **Anzeige** dabeistehen.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Bilde Adjektive mit un-, -bar, -los, -ig.', stufe: 1, saetze: ['(man kann es nicht schlagen) Der Preis ist [unschlagbar].', '(man kann es nicht glauben) Das ist [unglaublich].', '(ohne Kosten) Der Versand ist [kostenlos].', '(es gibt es nur einmal) Das Design ist [einzigartig].', '(man kann es tragen) Der Lautsprecher ist leicht [tragbar].'] },
      { art: 'abschreiben', auftrag: 'Mach aus dem Werbetext einen sachlichen Satz.', stufe: 2, kopf: ['Werbung', 'sachlich'], saetze: [['Die leichtesten Schuhe aller Zeiten!', 'Die Schuhe sind leicht.'], ['Unbegrenzt surfen für nur 9,99 €*!', 'Drei Monate kostet der Tarif 9,99 €, danach 29,99 € im Monat.'], ['Kristallklarer Sound!', 'Das Headset hat einen guten Klang.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Gestalte eine ehrliche Anzeige für ein Schulereignis (Flohmarkt, Schulfest, Sportturnier). Mit Werbespruch, aber ohne Tricks!', stufe: 2,
        anfaenge: ['Werbespruch: …', 'Was? …', 'Wann und wo? …', 'Was gibt es? …', 'Eintritt: …'], zeilen: 9,
        beispiel: 'Werbespruch: Alt raus, neu rein! Was? Großer Flohmarkt unserer Klasse. Wann und wo? Samstag, 10 bis 14 Uhr, in der Turnhalle. Was gibt es? Bücher, Spiele, Kleidung und selbst gebackene Kuchen. Eintritt: frei. Der Erlös geht an das Tierheim.' },
    ],
    check: ['Ich verstehe Anzeigen und lese das Kleingedruckte.', 'Ich verstehe Werbespots im Radio.', 'Ich erkenne Tricks der Werbesprache.', 'Ich bilde Adjektive mit un-, -bar, -los.', 'Ich gestalte eine ehrliche Anzeige.'],
  },
  // ================================================================ 7
  {
    thema: 'Musik und Film · Relativsätze', titel: 'Die Band, die alle hören', untertitel: 'Eine Konzertkritik, ein Radiointerview mit einer Band und eigene Kritiken: Du vergleichst, bewertest und beschreibst mit Relativsätzen.',
    ziel: { de: 'Ich verstehe Kritiken und Interviews über Musik und beschreibe mit Relativsätzen.', fr: 'Je comprends des critiques et des interviews sur la musique et je décris avec des relatives.' },
    bild: ['lea:froh:tanzen', 'sami:froh'],
    start: {
      was: 'Musikstile',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welcher Musikstil ist das? Verbinde.', stufe: 1, links: ['Rock', 'Hip-Hop', 'Klassik', 'Elektro', 'Pop'], rechts: ['laute Gitarren und Schlagzeug', 'Rap und starke Beats', 'Orchester, Geige, Klavier', 'Musik vom Computer, oft zum Tanzen', 'eingängige Melodien, oft im Radio'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Eine Konzertkritik', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Schülerzeitung · Konzertkritik (ausgedachte Band)', titel: 'Die Nachtfalter: Ein Abend voller Energie',
      absaetze: [
        'Am Freitag spielte die Band **Die Nachtfalter** im Jugendhaus Mersch. Der Saal, **der** eigentlich für 150 Leute gedacht ist, war mit über 200 Fans total voll.',
        'Die Sängerin Jo, **die** erst 19 Jahre alt ist, hat eine kraftvolle Stimme. Gitarrist Malik und Schlagzeugerin Ana spielten so laut, dass der Boden vibrierte.',
        'Am besten war der Song „Nachtbus“, **den** die Band zum ersten Mal live spielte. Das Lied erzählt von einer Freundschaft, **die** auf dem Heimweg im Nachtbus beginnt. Viele sangen schon beim zweiten Refrain mit.',
        'Nicht so gut: Der Ton war am Anfang zu leise, und die Pause war mit 30 Minuten zu lang.',
        '**Unser Fazit:** eine junge Band, **der** man die Freude am Spielen anmerkt. Vier von fünf Sternen!',
      ],
      woerter: [['die Kritik', 'la critique'], ['eigentlich', 'en fait'], ['kraftvoll', 'puissant'], ['vibrieren', 'vibrer'], ['live', 'sur scène'], ['der Refrain', 'le refrain'], ['der Ton', 'le son'], ['anmerken', 'remarquer']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Mehr als 200 Fans waren im Saal.', true], ['Die Sängerin ist 25 Jahre alt.', false], ['„Nachtbus“ wurde zum ersten Mal live gespielt.', true], ['Der Ton war die ganze Zeit perfekt.', false], ['Die Kritik gibt fünf Sterne.', false]] },
        { art: 'tabelle', auftrag: 'Was war gut, was nicht so gut?', stufe: 2, kopf: ['gut', 'nicht so gut'], zeilen: [['[die kraftvolle Stimme]', '[Ton am Anfang zu leise]'], ['[der Song „Nachtbus“]', '[Pause zu lang]'], ['[die Freude am Spielen]', '']] },
      ],
    },
    hoeren: {
      was: 'Ein Radiointerview mit einer Band', wo: 'Radio · Musiksendung', titel: 'Zu Gast: Die Nachtfalter',
      situation: 'Nach dem Konzert sind Jo und Malik von der Band im Radio. Der Moderator stellt Fragen.',
      bild: ['lea:froh:erklaeren', 'sami:froh:laessig'], sprecher: { Moderator: 'm1', Jo: 'w2', Malik: 'm3' },
      text: [
        ['Moderator', 'Herzlich willkommen, Jo und Malik! Wie habt ihr euch kennengelernt?'],
        ['Jo', 'In der Schule! Malik war der Junge, der in der Pause immer Gitarre gespielt hat. Ich habe einfach mitgesungen.'],
        ['Malik', 'Und Ana, die jetzt Schlagzeug spielt, kam ein Jahr später dazu. Sie ist die Schwester von einem Freund.'],
        ['Moderator', 'Euer Song „Nachtbus“ ist gerade sehr beliebt. Worum geht es?'],
        ['Jo', 'Um zwei Leute, die sich jeden Abend im Nachtbus sehen, aber nie miteinander reden. Bis eines Tages der Bus stehen bleibt.'],
        ['Moderator', 'Und was sind eure Pläne für die Zukunft?'],
        ['Malik', 'Wir nehmen im Sommer unser erstes Album auf. Und wir möchten einmal in einem richtig großen Saal spielen.'],
        ['Jo', 'Aber zuerst mache ich meine Ausbildung fertig. Musik ist toll, aber ein sicherer Beruf ist auch wichtig.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was fragt man eine Band im Interview? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Wie habt ihr euch kennengelernt?', 'Worum geht es in eurem Song?', 'Was habt ihr heute gefrühstückt?'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Wo haben sich Jo und Malik kennengelernt?', o: ['im Jugendhaus', 'in der Schule', 'im Nachtbus'], r: 1 }, { f: 'Wer spielt Schlagzeug?', o: ['Ana', 'Jo', 'Malik'], r: 0 }, { f: 'Worum geht es im Song „Nachtbus“?', o: ['um zwei Leute, die nie miteinander reden', 'um einen Busfahrer', 'um eine Reise'], r: 0 }, { f: 'Was macht Jo zuerst?', o: ['ein Album', 'ihre Ausbildung fertig'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Vergleicht und bewertet zwei Songs, Bands oder Filme, die ihr kennt.', stufe: 3, karten: [
        { titel: 'Vergleichen', text: ['… ist ruhiger / lauter / lustiger als …', 'Mir gefällt … besser, weil …'] },
        { titel: 'Bewerten', text: ['Ich gebe … Sterne, weil …', 'Der Song, den ich am liebsten höre, ist …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Relativpronomen im Nominativ, Akkusativ und Dativ', tabelle: { kopf: ['', 'maskulin', 'feminin', 'neutral', 'Plural'], zeilen: [['Nominativ', 'der', 'die', 'das', 'die'], ['Akkusativ', '**den**', 'die', 'das', 'die'], ['Dativ', '**dem**', '**der**', '**dem**', '**denen**']] } }],
        [{ titel: 'Beispiele', punkte: ['Malik ist der Junge, **der** Gitarre spielt. (Nominativ)', '„Nachtbus“ ist der Song, **den** ich am liebsten höre. (ich höre **den** Song)', 'Jo ist die Sängerin, **der** viele Fans folgen. (folgen + **der** Sängerin)', 'die Fans, **denen** das Konzert gefallen hat'] },
         { art: 'tipp', titel: 'Eine Kritik schreiben', text: '**Was?** Film, Song, Buch · **Worum geht es?** kurz, ohne das Ende zu verraten · **Was war gut, was nicht?** · **Fazit** mit Sternen.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Relativpronomen.', stufe: 1, saetze: ['Das ist die Band, [die] im Jugendhaus gespielt hat.', 'Der Song, [den] ich am liebsten höre, heißt „Nachtbus“.', 'Jo ist die Sängerin, [der] alle zuhören.', 'Das ist der Film, [den] wir am Freitag gesehen haben.', 'Die Fans, [denen] das Konzert gefallen hat, sangen mit.'] },
      { art: 'abschreiben', auftrag: 'Verbinde die Sätze mit einem Relativsatz.', stufe: 2, kopf: ['zwei Sätze', 'ein Satz'], saetze: [['Ich mag den Song. Malik hat ihn geschrieben.', 'Ich mag den Song, den Malik geschrieben hat.'], ['Das ist die Schlagzeugerin. Ich habe ihr ein Foto geschickt.', 'Das ist die Schlagzeugerin, der ich ein Foto geschickt habe.'], ['Wir sehen einen Film. Er spielt in Luxemburg.', 'Wir sehen einen Film, der in Luxemburg spielt.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine Kritik über einen Film, eine Serie, einen Song oder ein Buch. Erzähl kurz, worum es geht, und sag deine Meinung.', stufe: 2,
        anfaenge: ['Ich habe … gesehen / gehört / gelesen.', 'Es geht um …, der / die …', 'Gut gefallen hat mir …', 'Nicht so gut war …', 'Fazit: … von fünf Sternen, weil …'], zeilen: 11,
        beispiel: 'Ich habe den Film „Der Sommer, der alles änderte“ gesehen. Es geht um ein Mädchen, das in ein neues Dorf zieht und dort einen geheimen Garten findet. Gut gefallen hat mir die Musik, die sehr gut zur Geschichte passt. Nicht so gut war der Anfang, der ein bisschen langsam ist. Fazit: vier von fünf Sternen, weil der Film schön und spannend ist.' },
    ],
    check: ['Ich verstehe eine Konzertkritik.', 'Ich verstehe ein Radiointerview mit einer Band.', 'Ich vergleiche und bewerte Musik und Filme.', 'Ich bilde Relativsätze im Akkusativ und Dativ.', 'Ich schreibe eine Kritik.'],
  },
  // ================================================================ 8
  {
    thema: 'Pro und Kontra · Argumente', titel: 'Ein Freizeitzentrum für unser Dorf?', untertitel: 'Leserbriefe, eine Diskussion im Jugendforum und eigene Argumente: Du sammelst Pro und Kontra – und schreibst deine Stellungnahme.',
    ziel: { de: 'Ich verstehe Argumente, sammle Pro und Kontra und begründe meine Meinung.', fr: 'Je comprends des arguments, je liste le pour et le contre et je justifie mon avis.' },
    bild: ['noah:froh:erklaeren', 'opa:besorgt'],
    start: {
      was: 'Dafür oder dagegen?',
      aufgaben: [
        { art: 'rf', auftrag: 'Ist das ein Argument für ein Freizeitzentrum (Pro) oder dagegen (Kontra)?', stufe: 1, spalten: ['Pro', 'Kontra'], saetze: [['Jugendliche haben einen Treffpunkt.', true], ['Es wird lauter im Dorf.', false], ['Es gibt weniger Langeweile.', true], ['Der Bau kostet viel Geld.', false], ['Neue Freundschaften entstehen.', true]] },
      ],
    },
    lesen: {
      was: 'Leserbriefe im Gemeindeblatt', art: 'dokumente',
      quelle: 'Gemeindeblatt (ausgedachte Gemeinde)', titel: 'Neues Freizeitzentrum?',
      dokumente: [
        { stil: 'nachricht', stimme: 'w1', kopf: '**Gemeindeblatt:** Ihre Meinung ist gefragt!', text: ['Die Gemeinde plant ein Freizeitzentrum auf der Wiese neben der Schule: mit Skatepark, Musikraum und Jugendcafé. Kosten: etwa 2 Millionen Euro. Was meinen Sie? Schreiben Sie uns!'] },
        { stil: 'notiz', stimme: 'w2', kopf: 'Leserbrief von Elena (15)', text: ['Endlich! Bei uns gibt es für Jugendliche fast nichts. Wir treffen uns an der Bushaltestelle, weil wir keinen anderen Ort haben. Ein Freizeitzentrum wäre ein Treffpunkt für alle. Außerdem könnten wir dort Musik machen, statt nur am Handy zu hängen.'] },
        { stil: 'notiz', stimme: 'm2', kopf: 'Leserbrief von Herrn Thill (68)', text: ['Ich verstehe die Jugendlichen. Trotzdem bin ich dagegen. Erstens wohne ich direkt neben der Wiese, und ein Skatepark ist laut. Zweitens ist die Wiese wichtig für Vögel und Insekten. Warum baut man das Zentrum nicht im alten Feuerwehrhaus, das leer steht?'] },
      ],
      woerter: [['der Leserbrief', 'le courrier des lecteurs'], ['die Gemeinde', 'la commune'], ['die Wiese', 'le pré'], ['der Treffpunkt', 'le lieu de rencontre'], ['außerdem', 'en plus'], ['trotzdem', 'quand même'], ['dagegen sein', 'être contre'], ['leer stehen', 'être vide']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Sammle die Argumente.', stufe: 1, kopf: ['Pro (Elena)', 'Kontra (Herr Thill)'], zeilen: [['[ein Treffpunkt für alle]', '[Ein Skatepark ist laut.]'], ['[Musik machen statt Handy]', '[Die Wiese ist wichtig für Vögel und Insekten.]'], ['[Es gibt keinen anderen Ort.]', '']] },
        { art: 'fragen', auftrag: 'Welchen Vorschlag macht Herr Thill?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Man könnte das Zentrum im alten Feuerwehrhaus bauen, das leer steht.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Diskussion im Jugendforum', wo: 'Jugendforum der Gemeinde', titel: 'Wiese oder Feuerwehrhaus?',
      situation: 'Im Jugendforum diskutieren Jugendliche, Herr Thill und die Bürgermeisterin über das Freizeitzentrum.',
      bild: ['lehrerin:froh:erklaeren', 'noah:froh:erklaeren'], sprecher: { Bürgermeisterin: 'w1', Noah: 'm1', 'Herr Thill': 'm2', Lina: 'w2' },
      text: [
        ['Bürgermeisterin', 'Guten Abend! Heute geht es um eine Frage: Bauen wir das Freizeitzentrum auf der Wiese oder im alten Feuerwehrhaus? Wer möchte anfangen?'],
        ['Noah', 'Ich bin für die Wiese. Dort ist genug Platz für einen Skatepark. Im Feuerwehrhaus ist es viel zu eng.'],
        ['Herr Thill', 'Einerseits verstehe ich das. Andererseits wird es für die Nachbarn sehr laut, wenn der Skatepark bis spät abends offen ist.'],
        ['Lina', 'Darf ich etwas vorschlagen? Man könnte beides machen: das Café und den Musikraum im Feuerwehrhaus und nur einen kleinen Skatepark auf einem Teil der Wiese.'],
        ['Bürgermeisterin', 'Interessant. Und die Öffnungszeiten?'],
        ['Lina', 'Der Skatepark könnte um einundzwanzig Uhr schließen. Dann ist es nachts ruhig.'],
        ['Herr Thill', 'Hm. Mit diesen Regeln wäre ich einverstanden. Und der Rest der Wiese bleibt für die Natur?'],
        ['Bürgermeisterin', 'Das ist ein guter Kompromiss. Wir lassen den Plan prüfen und stellen ihn im nächsten Forum vor.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Kompromiss? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Beide Seiten bekommen einen Teil von dem, was sie wollen.', 'Eine Seite gewinnt alles.', 'Man streitet weiter.'], r: 0 }] }],
      beim: [
        { art: 'wer', auftrag: 'Hör zu. Wer sagt das?', stufe: 1, personen: ['Noah', 'Herr Thill', 'Lina'], saetze: [['Ich bin für die Wiese.', 'Noah'], ['Im Feuerwehrhaus ist es zu eng.', 'Noah'], ['Für die Nachbarn wird es sehr laut.', 'Herr Thill'], ['Man könnte beides machen.', 'Lina'], ['Der Skatepark könnte um 21 Uhr schließen.', 'Lina']] },
        { art: 'fragen', auftrag: 'Was ist am Ende der Kompromiss?', stufe: 2, fragen: [{ f: '', zeilen: 3, l: 'Café und Musikraum kommen ins Feuerwehrhaus, ein kleiner Skatepark auf einen Teil der Wiese. Er schließt um 21 Uhr. Der Rest der Wiese bleibt für die Natur.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt eine Diskussion im Jugendforum über ein anderes Thema: Handyverbot in der Pause? Längere Mittagspause? Jede Gruppe vertritt eine Seite.', stufe: 3, karten: [
        { titel: 'Argumentieren', text: ['Ich bin dafür / dagegen, weil …', 'Erstens … Zweitens …', 'Außerdem …'] },
        { titel: 'Reagieren', text: ['Einerseits …, andererseits …', 'Das stimmt, trotzdem …', 'Darf ich etwas vorschlagen?'] },
        { titel: 'Sich einigen', text: ['Ein guter Kompromiss wäre …', 'Damit wäre ich einverstanden.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Argumente verbinden', punkte: ['**Erstens** … **Zweitens** … **Außerdem** …', '**Einerseits** ist es laut, **andererseits** brauchen Jugendliche einen Ort.', 'Es ist laut. **Trotzdem** bin ich dafür.', 'Es gibt keinen Treffpunkt. **Deshalb** bin ich dafür.', 'Nach außerdem, trotzdem, deshalb: **Verb an Position 2**.'] },
         { titel: 'Eine Stellungnahme schreiben', punkte: ['**1. Einleitung:** Worum geht es?', '**2. Pro-Argumente**', '**3. Kontra-Argumente**', '**4. Meine Meinung** mit Begründung', '**5. Schluss:** Vorschlag oder Kompromiss'] }],
        [{ art: 'tipp', titel: 'Fair diskutieren', text: 'Lass die anderen **ausreden**. Kritisiere **Argumente**, nicht **Personen**. Sag, was am anderen Argument **richtig** ist – dann hört man dir besser zu.' },
         { art: 'achtung', titel: 'Vorschläge mit könnte und wäre', text: 'Man **könnte** beides machen. · Ein Freizeitzentrum **wäre** toll. · Damit **wäre** ich einverstanden.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze: deshalb, trotzdem, außerdem, einerseits, andererseits.', stufe: 1, woerter: ['Deshalb', 'Trotzdem', 'Außerdem', 'Einerseits', 'andererseits'], saetze: ['Es gibt keinen Treffpunkt. [Deshalb] brauchen wir ein Zentrum.', 'Ein Skatepark ist laut. [Trotzdem] bin ich dafür.', 'Wir könnten Musik machen. [Außerdem] gibt es ein Café.', '[Einerseits] ist die Wiese schön, [andererseits] ist dort viel Platz.'] },
      { art: 'tabelle', auftrag: 'Sammelt Pro und Kontra zum Thema „Handyverbot in der Pause“.', stufe: 2, kopf: ['Pro', 'Kontra'], zeilen: [['', ''], ['', ''], ['', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine Stellungnahme (einen Leserbrief) zum Freizeitzentrum oder zum Handyverbot in der Pause. Nenne Pro und Kontra und deine Meinung.', stufe: 2,
        anfaenge: ['Bei uns wird diskutiert, ob …', 'Dafür spricht, dass …', 'Andererseits …', 'Meiner Meinung nach …, weil …', 'Ein guter Kompromiss wäre …'], zeilen: 12,
        beispiel: 'Bei uns wird diskutiert, ob Handys in der Pause verboten werden sollen. Dafür spricht, dass wir dann mehr miteinander reden und uns mehr bewegen. Andererseits brauchen manche das Handy, um kurz nach Hause zu schreiben. Meiner Meinung nach ist ein Verbot zu streng, weil man das Handy auch sinnvoll benutzen kann. Ein guter Kompromiss wäre eine Handy-Ecke auf dem Schulhof.' },
    ],
    check: ['Ich verstehe Leserbriefe mit Argumenten.', 'Ich verstehe eine Diskussion in groben Zügen.', 'Ich sammle Pro- und Kontra-Argumente.', 'Ich verbinde Argumente mit außerdem, trotzdem, deshalb.', 'Ich schreibe eine Stellungnahme.'],
  },
]

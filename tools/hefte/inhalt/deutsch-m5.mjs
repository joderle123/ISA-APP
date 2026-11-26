// Deutsch · Modul 5 „Luxemburg entdecken“ (Voie de préparation, ≈ A2.2) – multimodales Heft.
// Themen und Grammatik nach dem Programm ALLUX 7P/6P/5P (CNES, 20/03/2019; Kann-Beschreibungen als Mindeststandards),
// Modul 5: Festigung der Module 1–4; Kultur, Geschichte und Persönlichkeiten einer Stadt (Luxemburg);
// Informationsmaterial, Wettervorhersage, Durchsagen am Bahnhof, Stadtführung, Nacherzählung (Rattenfänger von Hameln),
// Meinung und Vorurteile, Lieder und Bücher, fiktive Biografie; dass-Sätze, Relativsätze, unregelmäßige Verben im
// Präteritum, Perfekt (mündlich) und Präteritum (schriftlich), Personalpronomen im Dativ und Akkusativ, Akkusativobjekt,
// Clusterlernen. Fakten über Luxemburg und Persönlichkeiten: nur allgemein bekannte, gut belegte Eckdaten.
// Alle Texte selbst geschrieben; Jugendliche ausgedacht.

export const MODUL = {
  id: 'deutsch-m5', kuerzel: 'de5', nr: 5, sprache: 'de', niveau: 'A2.2 / A2+', klasse: 'Voie de préparation',
  dateiname: 'Deutsch_Modul-5',
  fach: { de: 'Deutsch', fr: 'Allemand' },
  titel: { de: 'Luxemburg entdecken', fr: 'Découvrir le Luxembourg' },
  untertitel: { de: 'Stadt, Geschichte und Persönlichkeiten, Bus und Bahn, Wetter, Sagen, Meinungen und Bücher: lesen, hören, sprechen und schreiben – in acht Einheiten.', fr: 'Ville, histoire et personnalités, bus et train, météo, légendes, opinions et livres : lire, écouter, parler et écrire – en huit unités.' },
  farben: { tief: '#b4432e', mittel: '#eaa38f', zart: '#fbefe9', dunkel: '#7e2b1c' },
  deckbild: ['lina:froh:stehen-zeigen', 'opa:froh:stehen', 'lio:froh:laessig'],
  blasen: [{ t: 'Moien!', x: 16, y: 112 }, { t: 'Ich finde, dass …', x: 126, y: 100 }, { t: 'Wow!', x: 160, y: 150 }],
  themen: [
    { titel: { de: 'Unterwegs in Luxemburg', fr: 'En route au Luxembourg' }, icon: 'map-2', lektionen: 3 },
    { titel: { de: 'Menschen und Geschichten', fr: 'Personnes et histoires' }, icon: 'book', lektionen: 2 },
    { titel: { de: 'Meinungen, Bücher, Lebenswege', fr: 'Opinions, livres, parcours' }, icon: 'messages', lektionen: 3 },
  ],
  anleitung: [
    'Jede Lektion hat fünf Teile: **Lesen**, **Hören**, **Regel**, **Üben** und **Schreiben**. Am Ende steht ein **Kurz-Check**.',
    'Bei jedem Text gibt es einen **QR-Code**. Halte die Kamera deines Handys darauf – dann hörst du den Text. Du kannst ihn so oft hören, wie du willst, auch langsamer.',
    'Die Punkte bei den Aufgaben zeigen die Stufe: ●○○ Basis · ●●○ Kern · ●●● Plus. Fang mit der Basis an.',
    'In Modul 5 wiederholst du viel aus den Modulen 1 bis 4. Die Kästen „Erinnerst du dich?“ helfen dir.',
  ],
}

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Sehenswürdigkeiten · Relativsätze', titel: 'Willkommen in der Hauptstadt', untertitel: 'Kasematten, Palast, Glasaufzug: Du liest einen Stadtführer, hörst eine Führung – und beschreibst Orte mit „der, die, das …“.',
    ziel: { de: 'Ich verstehe Infos über Sehenswürdigkeiten und beschreibe sie mit Relativsätzen.', fr: 'Je comprends des infos sur des lieux touristiques et je les décris avec des propositions relatives.' },
    bild: ['lina:froh:stehen-zeigen', 'lehrerin:froh:stehen'],
    start: {
      was: 'Was kennst du schon?',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was passt? Verbinde.', stufe: 1, links: ['die Kasematten', 'der Großherzogliche Palast', 'der Grund', 'der Kirchberg', 'der Panorama-Aufzug im Pfaffenthal'], rechts: ['lange Gänge im Felsen', 'hier arbeitet der Großherzog', 'ein altes Viertel unten im Tal', 'moderne Gebäude, auch von der EU', 'man fährt gratis nach oben und schaut ins Tal'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Stadtführer für Jugendliche', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Stadtführer · „Luxemburg in einem Tag“', titel: 'Fünf Orte, die du sehen musst',
      absaetze: [
        'Die **Altstadt** von Luxemburg ist seit 1994 Weltkulturerbe der UNESCO. Früher war die Stadt eine starke Festung. Viele Mauern und Türme sieht man heute noch.',
        'Die **Kasematten** sind Gänge, **die** man tief in den Felsen gegraben hat. Früher versteckten sich hier Soldaten, später auch die Menschen im Krieg. Heute kann man durch einen Teil der Gänge laufen.',
        'Der **Großherzogliche Palast** ist das Gebäude, **in dem** der Großherzog arbeitet. Im Sommer kann man ihn manchmal mit einer Führung besuchen.',
        'Der **Grund** ist ein Viertel, **das** unten im Tal an der Alzette liegt. Hier gibt es alte Häuser, kleine Brücken und gemütliche Cafés.',
        'Mit dem **Panorama-Aufzug** fährt man in wenigen Sekunden vom Pfaffenthal nach oben. Der Aufzug, **der** gratis ist, hat Glaswände. Die Aussicht ist super!',
      ],
      woerter: [['das Weltkulturerbe', 'le patrimoine mondial'], ['die Festung', 'la forteresse'], ['der Felsen', 'le rocher'], ['graben', 'creuser'], ['sich verstecken', 'se cacher'], ['das Viertel', 'le quartier'], ['der Aufzug', 'l’ascenseur'], ['die Aussicht', 'la vue']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Altstadt ist Weltkulturerbe.', true], ['Die Kasematten sind Gänge im Felsen.', true], ['Der Grund liegt oben auf dem Berg.', false], ['Der Panorama-Aufzug kostet viel Geld.', false]] },
        { art: 'tabelle', auftrag: 'Welcher Ort passt? Schreib ihn auf.', stufe: 2, kopf: ['Beschreibung', 'Ort'], breiten: [65, 35], zeilen: [['Hier arbeitet der Großherzog.', '[der Palast]'], ['Hier gibt es kleine Brücken und Cafés.', '[der Grund]'], ['Hier haben sich früher Soldaten versteckt.', '[die Kasematten]'], ['Man sieht durch Glaswände.', '[der Panorama-Aufzug]']] },
        { art: 'fragen', auftrag: 'Welchen Ort möchtest du besuchen? Warum?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Ich möchte die Kasematten besuchen, weil ich dunkle Gänge spannend finde.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Stadtführung', wo: 'Stadtführung · Place Guillaume II', titel: 'Bitte alle hierher!',
      situation: 'Die 7P2 macht eine Stadtführung. Die Stadtführerin erklärt viel. Manchmal fragen die Jugendlichen nach.',
      bild: ['lehrerin:froh:erklaeren', 'noah:verwirrt'], sprecher: { 'Stadtführerin': 'w1', Noah: 'm1', Lina: 'w2' },
      text: [
        ['Stadtführerin', 'Herzlich willkommen! Wir stehen hier auf dem Wilhelmsplatz. Die Leute in Luxemburg nennen ihn „Knuedler“. Hier ist jeden Mittwoch und Samstag Markt.'],
        ['Noah', 'Entschuldigung, können Sie das noch einmal sagen? Wie heißt der Platz?'], ['Stadtführerin', 'Knuedler. Das ist Luxemburgisch. Der Name kommt von einem Knoten, den die Mönche früher an ihrer Kleidung trugen.'],
        ['Stadtführerin', 'Jetzt gehen wir zum Palast. Er ist nur zwei Minuten von hier entfernt. Achtung, hier fahren Busse!'],
        ['Lina', 'Können Sie bitte genauer erklären, was der Großherzog macht?'],
        ['Stadtführerin', 'Gern. Der Großherzog ist das Staatsoberhaupt. Er vertritt das Land, zum Beispiel bei Besuchen aus dem Ausland. Die Regierung macht die tägliche Politik.'],
        ['Stadtführerin', 'Zum Schluss gehen wir zu den Kasematten. Bitte bleibt zusammen und nehmt eine Jacke mit – in den Gängen ist es kühl.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie bittest du um eine genauere Erklärung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Können Sie das genauer erklären?', 'Können Sie das noch einmal sagen?', 'Das ist langweilig.'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Wie nennen die Luxemburger den Wilhelmsplatz?', o: ['Knuedler', 'Grund', 'Kirchberg'], r: 0 }, { f: 'Wann ist dort Markt?', o: ['Montag und Freitag', 'Mittwoch und Samstag', 'jeden Tag'], r: 1 }, { f: 'Warum soll man eine Jacke mitnehmen?', o: ['Es regnet.', 'In den Gängen ist es kühl.', 'Es ist Winter.'], r: 1 }] },
        { art: 'fragen', auftrag: 'Hör noch einmal. Was macht der Großherzog? Was macht die Regierung?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Der Großherzog ist das Staatsoberhaupt und vertritt das Land. Die Regierung macht die tägliche Politik.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt eine kleine Stadtführung über einen Ort, den ihr kennt (Schule, Dorf, Lieblingsort). Die anderen fragen nach.', stufe: 3, karten: [
        { titel: 'Führen', text: ['Wir stehen hier vor …', 'Das ist der Ort, wo …', 'Früher …, heute …', 'Jetzt gehen wir zu …'] },
        { titel: 'Nachfragen', text: ['Können Sie das noch einmal sagen?', 'Können Sie das genauer erklären?', 'Was bedeutet …?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Relativsätze', punkte: ['Ein Relativsatz **erklärt** ein Nomen genauer.', 'Der Aufzug, **der** gratis **ist**, hat Glaswände.', 'Der Grund ist ein Viertel, **das** im Tal **liegt**.', 'Das Verb steht **am Ende**. Vorher und nachher: **Komma**.'] }],
        [{ titel: 'der, die, das (Nominativ)', tabelle: { kopf: ['Nomen', 'Relativpronomen', 'Beispiel'], zeilen: [['der Palast', '**der**', 'der Palast, **der** alt ist'], ['die Brücke', '**die**', 'die Brücke, **die** klein ist'], ['das Viertel', '**das**', 'das Viertel, **das** im Tal liegt'], ['die Gänge', '**die**', 'die Gänge, **die** dunkel sind']] } }],
        [{ art: 'tipp', titel: 'Clusterlernen', text: 'Schreib ein Wort in die Mitte (z. B. **Stadt**). Male Linien zu passenden Wörtern: Palast, Brücke, Markt, Bus … So merkst du dir Wörter in Gruppen.' },
         { art: 'achtung', titel: 'Erinnerst du dich? (Modul 2)', text: 'Höflich nachfragen mit **Sie**: Können **Sie** das wiederholen? · **Wie bitte?**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Relativpronomen: der, die, das.', stufe: 1, saetze: ['Das ist der Markt, [der] am Mittwoch ist.', 'Das ist die Brücke, [die] sehr alt ist.', 'Das ist das Café, [das] im Grund liegt.', 'Das sind die Gänge, [die] dunkel sind.'] },
      { art: 'abschreiben', auftrag: 'Verbinde die zwei Sätze mit einem Relativsatz.', stufe: 2, kopf: ['zwei Sätze', 'ein Satz'], saetze: [['Das ist ein Aufzug. Er ist gratis.', 'Das ist ein Aufzug, der gratis ist.'], ['Ich kenne ein Café. Es ist sehr gemütlich.', 'Ich kenne ein Café, das sehr gemütlich ist.'], ['Wir besuchen die Festung. Sie ist sehr alt.', 'Wir besuchen die Festung, die sehr alt ist.']] },
      { art: 'frei', auftrag: 'Clusterlernen: Schreib „Stadt“ in die Mitte und sammle mindestens zehn Wörter darum herum.', stufe: 2, html: '<div style="height:62mm;border:0.35mm dashed var(--linie);border-radius:3mm;position:relative"><div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border:0.5mm solid var(--f);border-radius:999px;padding:3mm 7mm;font-family:Lexend;font-weight:700;color:var(--f);font-size:14pt">die Stadt</div></div>' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen kurzen Stadtführer für deinen Wohnort oder einen Ort, den du gut kennst: drei Orte, die man sehen muss. Benutze Relativsätze.', stufe: 2,
        anfaenge: ['In … gibt es …', 'Der / die / das …, der / die / das …', 'Besonders schön ist …', 'Mein Tipp: …'], zeilen: 9,
        beispiel: 'In Mersch gibt es drei tolle Orte. Das Schloss, das in der Mitte liegt, ist sehr alt. Der Park, der neben dem Fluss ist, ist im Sommer schön. Und das Schwimmbad, das ganz neu ist, hat eine lange Rutsche. Mein Tipp: Kommt im Sommer!' },
    ],
    check: ['Ich verstehe Infos aus einem Stadtführer.', 'Ich verstehe eine Stadtführung, wenn deutlich gesprochen wird.', 'Ich bitte um eine genauere Erklärung.', 'Ich bilde Relativsätze mit der, die, das.', 'Ich lerne Wörter mit einem Cluster.'],
  },
  // ================================================================ 2
  {
    thema: 'Bus und Bahn · dass-Sätze', titel: 'Der Zug hat Verspätung', untertitel: 'In Luxemburg sind Bus und Bahn gratis. Aber wie kommt man nach Trier? Du verstehst Durchsagen, fragst am Schalter – und sagst, was du glaubst.',
    ziel: { de: 'Ich verstehe Durchsagen am Bahnhof und frage nach Verbindungen.', fr: 'Je comprends les annonces à la gare et je demande des correspondances.' },
    bild: ['ben:verwirrt:stehen', 'verkaeuferin:froh:stehen'],
    start: {
      was: 'Unterwegs',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was ist das? Verbinde.', stufe: 1, links: ['das Gleis', 'die Abfahrt', 'die Verspätung', 'umsteigen', 'der Fahrplan'], rechts: ['hier hält der Zug', 'der Zug fährt los', 'der Zug kommt später', 'den Zug wechseln', 'hier stehen alle Zeiten'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Infotext über Bus und Bahn', art: 'text', stimme: 'w1',
      quelle: 'Infoblatt für neue Schülerinnen und Schüler', titel: 'Gratis unterwegs – aber nicht überall',
      absaetze: [
        'Seit dem 1. März 2020 sind Busse, Züge und die Tram in Luxemburg für alle **kostenlos**. Luxemburg war das erste Land der Welt, das das für das ganze Land gemacht hat.',
        'Du brauchst also **keine Fahrkarte**, wenn du zum Beispiel von Junglinster nach Luxemburg-Stadt fährst. Nur für die **erste Klasse** im Zug muss man bezahlen.',
        'Aber Achtung: Fährst du über die Grenze, zum Beispiel nach **Trier** in Deutschland, brauchst du eine Fahrkarte. Die kaufst du am Automaten, am Schalter oder in einer App.',
        'Wo dein Bus fährt und wann er kommt, siehst du am **Fahrplan** an der Haltestelle oder in einer App. Viele Haltestellen zeigen auch, ob der Bus **Verspätung** hat.',
      ],
      woerter: [['kostenlos', 'gratuit'], ['die Tram', 'le tram'], ['die erste Klasse', 'la première classe'], ['die Grenze', 'la frontière'], ['der Schalter', 'le guichet'], ['der Fahrplan', 'l’horaire'], ['die Haltestelle', 'l’arrêt']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Bus und Bahn sind in Luxemburg seit 2020 gratis.', true], ['Für die erste Klasse muss man nicht bezahlen.', false], ['Nach Trier braucht man eine Fahrkarte.', true], ['Den Fahrplan findet man nur am Bahnhof.', false]] },
        { art: 'fragen', auftrag: 'Wo kann man eine Fahrkarte nach Trier kaufen? Nenne drei Möglichkeiten.', stufe: 2, fragen: [{ f: '', l: 'am Automaten, am Schalter, in einer App' }] },
      ],
    },
    hoeren: {
      was: 'Durchsagen und Fragen am Schalter', wo: 'Bahnhof Luxemburg', titel: 'Achtung an Gleis 4!',
      situation: 'Ben will mit seinem Opa nach Trier fahren. Zuerst hören sie eine Durchsage. Dann fragt Ben am Schalter.',
      bild: ['ben:verwirrt', 'opa:froh'], sprecher: { Durchsage: 'w1', Ben: 'm3', Mitarbeiter: 'm1' },
      text: [
        ['Durchsage', 'Achtung an Gleis vier. Der Regionalzug nach Trier, Abfahrt zehn Uhr zwölf, hat heute circa fünfzehn Minuten Verspätung. Wir bitten um Entschuldigung.'],
        ['Ben', 'Opa, hast du gehört? Ich glaube, dass wir noch Zeit haben. Ich frage mal am Schalter.'],
        ['Mitarbeiter', 'Guten Morgen! Was kann ich für dich tun?'], ['Ben', 'Guten Morgen. Ich brauche zwei Fahrkarten nach Trier, für mich und meinen Opa. Hin und zurück, bitte.'],
        ['Mitarbeiter', 'Gern. Du bist unter fünfzehn? Dann bekommst du einen günstigen Preis. Muss man unterwegs umsteigen? Nein, der Zug fährt direkt.'],
        ['Ben', 'Und von welchem Gleis fährt der Zug?'], ['Mitarbeiter', 'Von Gleis vier. Aber er hat Verspätung. Er fährt erst um zehn Uhr siebenundzwanzig.'],
        ['Ben', 'Danke! Opa, wir haben noch Zeit für einen Kakao.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was hört man oft am Bahnhof? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Gleis', 'Verspätung', 'Abfahrt', 'Pausenbrot'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze die Informationen.', stufe: 1, kopf: ['', 'Info'], breiten: [35, 65], zeilen: [['Ziel', '[Trier]'], ['Gleis', '[4]'], ['Abfahrt (geplant)', '[10:12 Uhr]'], ['Verspätung', '[ca. 15 Minuten]'], ['Abfahrt (neu)', '[10:27 Uhr]'], ['umsteigen?', '[nein, direkt]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt ein Gespräch am Schalter. Fragt nach Ziel, Gleis, Zeit und Preis.', stufe: 3, karten: [
        { titel: 'Reisende', text: ['Ich brauche eine Fahrkarte nach …', 'Hin und zurück, bitte.', 'Von welchem Gleis fährt der Zug?', 'Muss ich umsteigen?'] },
        { titel: 'Schalter', text: ['Was kann ich für dich tun?', 'Der Zug fährt um … von Gleis …', 'Du musst in … umsteigen.', 'Das kostet … Euro.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'dass-Sätze', punkte: ['Ich glaube, **dass** wir noch Zeit **haben**.', 'Er sagt, **dass** der Zug Verspätung **hat**.', 'Nach **dass**: Verb **am Ende** (wie bei **weil**).', 'Vor **dass**: **Komma**.'] },
         { titel: 'Typische Satzanfänge', tabelle: { kopf: ['Satz 1', 'dass-Satz'], zeilen: [['Ich glaube, …', 'dass es regnet.'], ['Ich hoffe, …', 'dass der Bus kommt.'], ['Ich weiß, …', 'dass Bus und Bahn gratis sind.'], ['Er sagt, …', 'dass er später kommt.']] } }],
        [{ art: 'tipp', titel: 'Am Bahnhof', text: '**Gleis** (wo?) · **Abfahrt / Ankunft** (wann?) · **umsteigen** (Zug wechseln) · **Hin- und Rückfahrt** · **Verspätung** (später)' },
         { art: 'achtung', titel: 'Erinnerst du dich? (Modul 4)', text: 'Bei **weil** steht das Verb auch am Ende: Ich warte, **weil** der Zug Verspätung **hat**.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Verb am Ende.', stufe: 1, saetze: ['Ich glaube, dass der Zug Verspätung [hat].', 'Ich weiß, dass Busse in Luxemburg gratis [sind].', 'Ben hofft, dass sie den Zug nicht [verpassen].', 'Der Mann sagt, dass der Zug direkt [fährt].'] },
      { art: 'abschreiben', auftrag: 'Schreib mit „dass“.', stufe: 2, kopf: ['Satz', 'mit dass'], saetze: [['Ich glaube: Es regnet morgen.', 'Ich glaube, dass es morgen regnet.'], ['Lina sagt: Der Bus kommt gleich.', 'Lina sagt, dass der Bus gleich kommt.'], ['Ich hoffe: Wir haben noch Zeit.', 'Ich hoffe, dass wir noch Zeit haben.']] },
      { art: 'fragen', auftrag: 'Erkläre ohne Karte: Wie kommt man von der Schule zur nächsten Bushaltestelle?', stufe: 3, fragen: [{ f: '', zeilen: 3, l: 'Du gehst aus dem Haupteingang und dann links. Nach hundert Metern kommt eine Ampel. Die Haltestelle ist direkt nach der Ampel.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Plant einen Ausflug mit Bus oder Bahn in Luxemburg. Schreib eine Nachricht an die Klasse: Wohin? Wann? Treffpunkt? Was brauchen wir?', stufe: 2,
        anfaenge: ['Hallo Klasse,', 'am … fahren wir nach …', 'Treffpunkt: …, um …', 'Wir brauchen keine Fahrkarte, weil …', 'Bringt … mit.'], zeilen: 8,
        beispiel: 'Hallo Klasse, am Freitag fahren wir mit dem Zug nach Clerf. Treffpunkt: Bahnhof Luxemburg, Gleis 2, um 8:30 Uhr. Wir brauchen keine Fahrkarte, weil Bus und Bahn gratis sind. Bringt ein Picknick und gute Schuhe mit!' },
    ],
    check: ['Ich verstehe einen Infotext über Bus und Bahn.', 'Ich verstehe Durchsagen am Bahnhof.', 'Ich frage am Schalter nach einer Verbindung.', 'Ich bilde dass-Sätze (Verb am Ende).', 'Ich erkläre einen Weg auch ohne Karte.'],
  },
  // ================================================================ 3
  {
    thema: 'Wetter und Vermutungen', titel: 'Morgen wird es sonnig', untertitel: 'Ausflug ja oder nein? Du liest die Wettervorhersage, hörst Werbung für einen Ausflug – und sagst, was du vermutest.',
    ziel: { de: 'Ich verstehe Wettervorhersagen und äußere Vermutungen.', fr: 'Je comprends les prévisions météo et j’exprime des suppositions.' },
    bild: ['mia:froh:handy', 'finn:nachdenklich'],
    start: {
      was: 'Wetterwörter',
      aufgaben: [
        { art: 'symbole', auftrag: 'Welches Wetter? Schreib das Wort.', stufe: 1, woerter: ['sonnig', 'bewölkt', 'Regen', 'Gewitter', 'Schnee', 'windig', 'Nebel', 'warm'],
          symbole: [['sun', 'sonnig'], ['cloud', 'bewölkt'], ['cloud-rain', 'Regen'], ['cloud-storm', 'Gewitter'], ['snowflake', 'Schnee'], ['wind', 'windig'], ['mist', 'Nebel'], ['temperature', 'warm']] },
      ],
    },
    lesen: {
      was: 'Eine Wettervorhersage', art: 'text', stimme: 'w1',
      quelle: 'Wetterseite · Vorhersage für das Wochenende', titel: 'Das Wetter in Luxemburg',
      absaetze: [
        '**Freitag:** Im Norden ist es am Morgen neblig. Am Nachmittag scheint überall die Sonne. Die Temperaturen steigen auf **18 Grad**.',
        '**Samstag:** Ein sonniger und warmer Tag mit bis zu **24 Grad**. Am Abend kommen von Westen Wolken. In der Nacht sind **Gewitter** möglich.',
        '**Sonntag:** Es regnet oft und es ist windig. Die Temperaturen fallen auf **14 Grad**. Am Abend wird es trockener.',
        '**Unser Tipp:** Für einen Ausflug ins Grüne ist der **Samstag** am besten. Denkt an Sonnencreme und genug Wasser!',
      ],
      woerter: [['die Vorhersage', 'la prévision'], ['neblig', 'brumeux'], ['steigen', 'monter'], ['möglich', 'possible'], ['fallen', 'baisser'], ['trocken', 'sec'], ['ins Grüne', 'à la campagne']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ergänze die Tabelle.', stufe: 1, kopf: ['Tag', 'Wetter', 'Temperatur'], zeilen: [['Freitag', '[morgens Nebel, dann Sonne]', '[18 °C]'], ['Samstag', '[sonnig, warm; nachts Gewitter]', '[24 °C]'], ['Sonntag', '[Regen, Wind]', '[14 °C]']] },
        { art: 'mc', auftrag: 'Welcher Tag passt am besten? Kreuze an.', stufe: 2, fragen: [{ f: 'Du willst im See schwimmen.', o: ['Freitag', 'Samstag', 'Sonntag'], r: 1 }, { f: 'Du willst lieber drinnen bleiben und einen Film schauen.', o: ['Freitag', 'Samstag', 'Sonntag'], r: 2 }] },
      ],
    },
    hoeren: {
      was: 'Ein Werbespot für einen Ausflug', wo: 'Radio · Werbung', titel: 'Abenteuer im Müllerthal!',
      situation: 'Im Radio läuft Werbung für einen Ausflug. Danach sprechen Mia und Finn.',
      bild: ['mia:aufgeregt', 'finn:froh'], sprecher: { Werbung: 'm1', Mia: 'w2', Finn: 'm3' },
      text: [
        ['Werbung', 'Felsen, Wälder, Wasserfälle: Erlebe das Müllerthal, die „Kleine Luxemburger Schweiz“!'],
        ['Werbung', 'Jeden Samstag gibt es eine geführte Wanderung für Familien und Jugendliche. Start ist um neun Uhr in Echternach. Die Wanderung dauert vier Stunden.'],
        ['Werbung', 'Für Jugendliche unter achtzehn ist sie gratis. Anmeldung im Tourismusbüro Echternach.'],
        ['Mia', 'Das klingt cool! Wollen wir am Samstag mitmachen?'], ['Finn', 'Vielleicht. Aber vier Stunden wandern? Ich glaube, dass das anstrengend ist.'],
        ['Mia', 'Wahrscheinlich machen wir viele Pausen. Und am Samstag scheint die Sonne.'], ['Finn', 'Okay, du hast recht. Vielleicht sehen wir ja einen Wasserfall. Ich bin dabei!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was will Werbung im Radio? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Lust auf etwas machen', 'genau informieren', 'Leute traurig machen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Ergänze die Infos zur Wanderung.', stufe: 1, kopf: ['', 'Info'], breiten: [30, 70], zeilen: [['Wo?', '[im Müllerthal, Start in Echternach]'], ['Wann?', '[jeden Samstag, 9 Uhr]'], ['Wie lange?', '[4 Stunden]'], ['Preis', '[gratis für Jugendliche unter 18]'], ['Anmeldung', '[im Tourismusbüro Echternach]']] },
        { art: 'mc', auftrag: 'Hör das Gespräch. Kreuze an.', stufe: 2, fragen: [{ f: 'Was glaubt Finn zuerst?', o: ['Die Wanderung ist zu kurz.', 'Die Wanderung ist anstrengend.'], r: 1 }, { f: 'Am Ende …', o: ['macht Finn mit.', 'bleibt Finn zu Hause.'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Plant einen Ausflug am Wochenende. Schaut auf die Wettervorhersage und äußert Vermutungen.', stufe: 3, karten: [
        { titel: 'Vermuten', text: ['Vielleicht …', 'Wahrscheinlich …', 'Ich glaube, dass …', 'Es kann sein, dass …'] },
        { titel: 'Zustimmen / anders sehen', text: ['Du hast recht.', 'Gute Idee!', 'Ich bin anderer Meinung.', 'Ich schlage vor, dass wir …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Wetter beschreiben', tabelle: { kopf: ['Nomen', 'Adjektiv', 'Verb'], zeilen: [['die Sonne', 'sonnig', 'die Sonne scheint'], ['der Regen', 'regnerisch', 'es regnet'], ['der Wind', 'windig', 'es windet'], ['der Schnee', '–', 'es schneit'], ['der Nebel', 'neblig', '–']] } }],
        [{ titel: 'Vermutungen', punkte: ['**Vielleicht** regnet es morgen.', '**Wahrscheinlich** scheint die Sonne.', 'Ich glaube, **dass** es warm wird.', 'Es **kann sein**, **dass** …', 'Morgen **wird** es sonnig. (Zukunft mit **werden**)'] }],
        [{ art: 'tipp', titel: 'Temperatur', text: '**18 Grad** (18 °C) · **minus 3 Grad** (–3 °C) · Es ist warm / kalt / heiß / kühl.' },
         { art: 'achtung', titel: 'Nach vielleicht: Verb an Position 2', text: '**Vielleicht regnet** es. (nicht: ~~Vielleicht es regnet~~)' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Wetterwörter.', stufe: 1, woerter: ['scheint', 'regnet', 'windig', 'Grad', 'Gewitter'], saetze: ['Die Sonne [scheint].', 'Es [regnet] den ganzen Tag.', 'Es ist sehr [windig].', 'Es sind 24 [Grad].', 'In der Nacht gibt es ein [Gewitter].'] },
      { art: 'abschreiben', auftrag: 'Beginne mit „Vielleicht“ oder „Wahrscheinlich“.', stufe: 2, kopf: ['Satz', 'neu'], saetze: [['Es regnet morgen. (vielleicht)', 'Vielleicht regnet es morgen.'], ['Wir machen eine Pause. (wahrscheinlich)', 'Wahrscheinlich machen wir eine Pause.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine Wettervorhersage für morgen in deinem Ort (ausgedacht oder echt) und einen Tipp für einen Ausflug.', stufe: 2,
        anfaenge: ['Morgen wird es …', 'Am Morgen …', 'Am Nachmittag …', 'Die Temperaturen …', 'Unser Tipp: …'], zeilen: 7,
        beispiel: 'Morgen wird es in Junglinster sonnig. Am Morgen ist es noch kühl, nur 9 Grad. Am Nachmittag steigen die Temperaturen auf 17 Grad. Abends kommt vielleicht etwas Regen. Unser Tipp: Ein Ausflug in den Wald, aber nehmt eine Jacke mit!' },
    ],
    check: ['Ich verstehe eine Wettervorhersage.', 'Ich verstehe einen Werbespot für einen Ausflug.', 'Ich äußere Vermutungen (vielleicht, wahrscheinlich, ich glaube, dass).', 'Ich sage, ob ich einverstanden bin oder eine andere Idee habe.', 'Ich schreibe eine kurze Wettervorhersage.'],
  },
  // ================================================================ 4
  {
    thema: 'Persönlichkeiten · Präteritum', titel: 'Berühmt aus Luxemburg', untertitel: 'Ein Nobelpreis, berühmte Fotos, ein Sieg bei der Tour de France: Du liest Biografien und lernst unregelmäßige Verben im Präteritum.',
    ziel: { de: 'Ich verstehe Biografien und erkenne unregelmäßige Verben im Präteritum.', fr: 'Je comprends des biographies et je reconnais les verbes irréguliers au prétérit.' },
    bild: ['opa:stolz', 'yusuf:froh'],
    start: {
      was: 'Perfekt oder Präteritum?',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welche Form gehört zusammen? Verbinde.', stufe: 1, links: ['er ist geboren', 'er hat gewonnen', 'er ist gegangen', 'er ist gestorben', 'er hat bekommen'], rechts: ['er wurde geboren', 'er gewann', 'er ging', 'er starb', 'er bekam'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Drei Biografien', art: 'profile', stimme: 'w1',
      quelle: 'Lexikon für Jugendliche', titel: 'Drei Menschen aus Luxemburg',
      profile: [
        { name: 'Gabriel Lippmann (1845–1921)', bild: 'opa:stolz', stimme: 'm1', text: 'Gabriel Lippmann **wurde** 1845 in Bonneweg geboren, das heute ein Teil von Luxemburg-Stadt ist. Er **ging** als Kind mit seiner Familie nach Frankreich. Später **wurde** er Professor für Physik in Paris. Er **erfand** eine Methode für Farbfotos. Dafür **bekam** er 1908 den Nobelpreis.' },
        { name: 'Edward Steichen (1879–1973)', bild: 'chef:stolz', stimme: 'm2', text: 'Edward Steichen **kam** 1879 in Bivange zur Welt. Als kleines Kind **zog** er mit seinen Eltern in die USA. Dort **wurde** er einer der bekanntesten Fotografen der Welt. 1955 **machte** er die große Ausstellung „The Family of Man“ mit Fotos von Menschen aus vielen Ländern. Heute **sieht** man sie im Schloss von Clerf.' },
        { name: 'Charly Gaul (1932–2005)', bild: 'yusuf:stolz', stimme: 'm3', text: 'Charly Gaul **war** ein Radrennfahrer. In den Bergen **fuhr** er schneller als alle anderen. Darum **nannte** man ihn „Engel der Berge“. 1958 **gewann** er die Tour de France – als erster Luxemburger seit vielen Jahren.' },
      ],
      woerter: [['geboren werden', 'naître'], ['zur Welt kommen', 'venir au monde'], ['die Methode', 'la méthode'], ['der Nobelpreis', 'le prix Nobel'], ['ziehen (umziehen)', 'déménager'], ['die Ausstellung', 'l’exposition'], ['der Radrennfahrer', 'le coureur cycliste'], ['gewinnen', 'gagner']],
      aufgaben: [
        { art: 'wer', auftrag: 'Wer war das? Kreuze an.', stufe: 1, personen: ['Lippmann', 'Steichen', 'Gaul'], saetze: [['… war Fotograf.', 'Steichen'], ['… bekam den Nobelpreis.', 'Lippmann'], ['… gewann die Tour de France.', 'Gaul'], ['… zog als Kind in die USA.', 'Steichen'], ['… war Professor in Paris.', 'Lippmann']] },
        { art: 'tabelle', auftrag: 'Suche die Verben im Präteritum. Schreib die Grundform.', stufe: 2, kopf: ['Präteritum', 'Grundform'], zeilen: [['wurde', '[werden]'], ['ging', '[gehen]'], ['erfand', '[erfinden]'], ['bekam', '[bekommen]'], ['zog', '[ziehen]'], ['fuhr', '[fahren]'], ['gewann', '[gewinnen]']] },
      ],
    },
    hoeren: {
      was: 'Eine Kurzpräsentation', wo: 'Klassenzimmer · Referat', titel: 'Meine Persönlichkeit: Charly Gaul',
      situation: 'Yusuf hält ein kurzes Referat über Charly Gaul. Er spricht frei – darum benutzt er das Perfekt.',
      bild: ['yusuf:froh:erklaeren'], sprecher: { Yusuf: 'm1', Lehrerin: 'w1' },
      text: [
        ['Yusuf', 'Ich stelle euch Charly Gaul vor. Ich habe ihn ausgewählt, weil ich selbst gern Rad fahre.'],
        ['Yusuf', 'Charly Gaul ist 1932 geboren. Er hat schon als Jugendlicher Radrennen gemacht.'],
        ['Yusuf', 'Er war klein und leicht. Darum ist er die Berge sehr schnell hochgefahren. Die Leute haben ihn „Engel der Berge“ genannt.'],
        ['Yusuf', 'Neunzehnhundertachtundfünfzig hat er die Tour de France gewonnen. Das war eine Sensation für Luxemburg!'],
        ['Yusuf', 'Was ich besonders finde: Bei Regen und Kälte ist er oft am stärksten gewesen.'],
        ['Yusuf', 'Danke fürs Zuhören! Habt ihr Fragen?'], ['Lehrerin', 'Sehr schön, Yusuf! Woher hast du die Informationen?'], ['Yusuf', 'Aus einem Lexikon und von einer Internetseite. Ich habe zwei Quellen verglichen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist bei einem Referat wichtig? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['laut und langsam sprechen', 'die Quellen nennen', 'nur vom Blatt ablesen'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu. Kreuze an.', stufe: 1, fragen: [{ f: 'Warum hat Yusuf Charly Gaul gewählt?', o: ['Er fährt selbst gern Rad.', 'Er kennt ihn persönlich.'], r: 0 }, { f: 'Wann war Gaul am stärksten?', o: ['bei Sonne und Hitze', 'bei Regen und Kälte'], r: 1 }, { f: 'Woher hat Yusuf die Infos?', o: ['aus einem Lexikon und einer Internetseite', 'von seinem Vater'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Stellt eine Person in einer Minute vor (Sport, Musik, Wissenschaft …). Sprecht im Perfekt.', stufe: 3, karten: [
        { titel: 'Aufbau', text: ['Ich stelle euch … vor.', 'Er / Sie ist … geboren.', 'Er / Sie hat … gemacht / gewonnen.', 'Besonders finde ich …'] },
        { titel: 'Recherche', text: ['Nutze zwei Quellen.', 'Vergleiche die Jahreszahlen.', 'Schreib die Quellen auf.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Unregelmäßige Verben im Präteritum', tabelle: { kopf: ['Grundform', 'Präteritum', 'Perfekt'], zeilen: [['sein', 'war', 'ist gewesen'], ['werden', 'wurde', 'ist geworden'], ['gehen', 'ging', 'ist gegangen'], ['kommen', 'kam', 'ist gekommen'], ['fahren', 'fuhr', 'ist gefahren'], ['gewinnen', 'gewann', 'hat gewonnen'], ['bekommen', 'bekam', 'hat bekommen']] } }],
        [{ titel: 'Schreiben oder sprechen?', punkte: ['**Schreiben** (Lexikon, Zeitung, Märchen): oft **Präteritum**: er gewann.', '**Sprechen** (Referat, Gespräch): oft **Perfekt**: er hat gewonnen.', 'Bei **sein**, **haben**, **werden**: auch beim Sprechen Präteritum: war, hatte, wurde.'] }],
        [{ art: 'tipp', titel: 'Internet-Recherche', text: 'Vergleiche **zwei Quellen**. Stimmen die Jahreszahlen? Schreib auf, **woher** du die Infos hast. Kopiere nicht – schreib mit eigenen Worten.' },
         { art: 'achtung', titel: 'Erinnerst du dich? (Modul 2)', text: 'Jahreszahlen: **1958** = neunzehnhundertachtundfünfzig. Ohne „in“: **1958** gewann er.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Präteritum.', stufe: 1, saetze: ['(sein) Charly Gaul [war] Radrennfahrer.', '(gewinnen) 1958 [gewann] er die Tour de France.', '(fahren) Er [fuhr] schnell die Berge hoch.', '(bekommen) Lippmann [bekam] den Nobelpreis.', '(kommen) Steichen [kam] 1879 zur Welt.'] },
      { art: 'abschreiben', auftrag: 'Schreib den Satz im Präteritum (wie im Lexikon).', stufe: 2, kopf: ['Perfekt (gesprochen)', 'Präteritum (geschrieben)'], saetze: [['Er ist nach Paris gegangen.', 'Er ging nach Paris.'], ['Sie hat den Preis gewonnen.', 'Sie gewann den Preis.'], ['Er ist Fotograf geworden.', 'Er wurde Fotograf.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Recherchiere eine Person aus Luxemburg oder deinem Herkunftsland (Sport, Musik, Kunst, Wissenschaft). Schreib eine kurze Biografie im Präteritum. Nenne deine Quellen.', stufe: 2,
        anfaenge: ['… wurde … in … geboren.', 'Als Kind …', 'Später …', 'Berühmt wurde er / sie, weil …', 'Quellen: …'], zeilen: 10,
        beispiel: 'Marie wurde 2001 in Ettelbrück geboren. Als Kind spielte sie viel Tischtennis. Später trainierte sie in einem großen Verein. Berühmt wurde sie, weil sie bei einem internationalen Turnier gewann. Quellen: Zeitungsartikel, Internetseite des Verbands.' },
    ],
    check: ['Ich verstehe kurze Biografien.', 'Ich verstehe ein kurzes Referat.', 'Ich kenne unregelmäßige Verben im Präteritum.', 'Ich weiß: schreiben → oft Präteritum, sprechen → oft Perfekt.', 'Ich recherchiere mit zwei Quellen.'],
  },
  // ================================================================ 5
  {
    thema: 'Sagen · Nacherzählen', titel: 'Der Mann mit der Flöte', untertitel: 'Eine Sage aus Deutschland und eine aus Luxemburg: Du liest, hörst und erzählst nach – mit zuerst, dann, plötzlich und am Ende.',
    ziel: { de: 'Ich verstehe Sagen und erzähle eine Geschichte mit eigenen Worten nach.', fr: 'Je comprends des légendes et je raconte une histoire avec mes propres mots.' },
    bild: ['opa:froh:erklaeren', 'lina:ueberrascht'],
    start: {
      was: 'Wörter aus der Sage',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeutet das? Verbinde.', stufe: 1, links: ['die Sage', 'die Flöte', 'versprechen', 'verschwinden', 'fremd'], rechts: ['eine sehr alte Geschichte', 'ein Instrument zum Blasen', 'sagen: Ich mache das sicher!', 'plötzlich nicht mehr da sein', 'man kennt die Person nicht'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Eine Sage aus Deutschland', art: 'text', stimme: 'erz', nummern: true,
      quelle: 'Eine alte Sage, neu erzählt', titel: 'Der Rattenfänger von Hameln',
      absaetze: [
        'Vor langer Zeit, im Jahr 1284, **gab** es in der Stadt **Hameln** sehr viele Ratten. Sie **fraßen** das Brot und das Korn. Die Menschen **wussten** nicht, was sie tun sollten.',
        'Eines Tages **kam** ein fremder Mann in die Stadt. Er **trug** bunte Kleider und **hatte** eine Flöte. Er **sagte**: „Ich befreie eure Stadt von den Ratten. Aber dafür will ich Geld.“ Der Bürgermeister **versprach** ihm viel Geld.',
        'Der Mann **spielte** auf seiner Flöte. Sofort **kamen** alle Ratten aus den Häusern und **liefen** hinter ihm her. Er **ging** zum Fluss Weser. Die Ratten **sprangen** ins Wasser und **ertranken**.',
        'Aber die Leute in Hameln **wollten** nicht bezahlen. „Das war doch ganz leicht“, **sagten** sie. Der Mann **wurde** wütend und **ging** weg.',
        'Am 26. Juni **kam** er zurück. Er **spielte** wieder auf seiner Flöte. Diesmal **kamen** die Kinder der Stadt und **folgten** ihm. Er **führte** sie aus der Stadt hinaus zu einem Berg. Dort **verschwanden** sie. Man **sah** sie nie wieder.',
        'Bis heute erzählt man diese Sage. In Hameln spielen Menschen sie im Sommer oft als Theater auf der Straße.',
      ],
      woerter: [['die Ratte', 'le rat'], ['fressen (fraß)', 'manger (animal)'], ['das Korn', 'le grain'], ['befreien', 'libérer'], ['versprechen (versprach)', 'promettre'], ['ertrinken (ertrank)', 'se noyer'], ['folgen', 'suivre'], ['verschwinden (verschwand)', 'disparaître']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Was passiert wann? Nummeriere von 1 bis 6.', stufe: 1, teile: ['In Hameln gibt es viele Ratten.', 'Ein fremder Mann mit einer Flöte kommt.', 'Der Bürgermeister verspricht ihm Geld.', 'Die Ratten folgen der Flöte in den Fluss.', 'Die Leute wollen nicht bezahlen.', 'Die Kinder folgen dem Mann und verschwinden.'], ordnung: [3, 0, 5, 2, 4, 1] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Der Mann trug graue Kleider.', false], ['Der Bürgermeister versprach ihm Geld.', true], ['Die Leute in Hameln bezahlten den Mann sofort.', false], ['Am 26. Juni kam der Mann zurück.', true]] },
        { art: 'fragen', auftrag: 'Was kann man aus der Sage lernen? Was meinst du?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Man muss ein Versprechen halten.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Sage aus Luxemburg', wo: 'Stadt Luxemburg · am Bockfelsen', titel: 'Die Sage von Melusina',
      situation: 'Lina und ihr Opa stehen auf dem Bockfelsen. Von hier sieht man weit ins Tal. Opa erzählt eine alte Sage.',
      bild: ['opa:froh:erklaeren', 'lina:ueberrascht'], sprecher: { Opa: 'm2', Lina: 'w2' },
      text: [
        ['Lina', 'Opa, du hast gesagt, dass es hier eine Sage gibt. Erzählst du sie mir?'],
        ['Opa', 'Gern. Vor über tausend Jahren lebte hier ein Graf. Er hieß Siegfried. Im Jahr neunhundertdreiundsechzig bekam er diesen Felsen und baute eine Burg. So fing die Stadt Luxemburg an.'],
        ['Opa', 'Siegfried heiratete eine wunderschöne Frau. Sie hieß Melusina. Aber sie hatte eine Bitte: Jeden Samstag wollte sie allein sein. Niemand durfte sie sehen.'],
        ['Lina', 'Komisch. Warum denn?'],
        ['Opa', 'Das wusste Siegfried auch nicht. Viele Jahre hielt er sein Versprechen. Aber eines Samstags war er zu neugierig. Er schaute durch das Schlüsselloch.'],
        ['Lina', 'Oh nein! Was hat er gesehen?'],
        ['Opa', 'Melusina saß in der Badewanne. Und statt Beinen hatte sie einen langen Fischschwanz! Sie war eine Meerjungfrau.'],
        ['Opa', 'Melusina merkte es. Sie schrie laut und verschwand im Felsen. Man erzählt, dass sie noch heute dort lebt.'],
        ['Lina', 'Das ist ja wie beim Rattenfänger! Jemand hält ein Versprechen nicht, und dann passiert etwas Schlimmes.'],
        ['Opa', 'Genau. Viele Sagen erzählen, wie wichtig ein Versprechen ist.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Sage? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine sehr alte Geschichte, die man weitererzählt', 'ein Artikel in der Zeitung', 'ein Rezept'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Siegfried baute eine Burg auf dem Felsen.', true], ['Melusina wollte jeden Sonntag allein sein.', false], ['Siegfried schaute durch das Schlüsselloch.', true], ['Melusina hatte einen Fischschwanz.', true], ['Am Ende blieb Melusina bei Siegfried.', false]] },
        { art: 'fragen', auftrag: 'Was ist bei beiden Sagen gleich?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Jemand hält ein Versprechen nicht. Dann passiert etwas Schlimmes.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erzählt eine der beiden Sagen zu zweit nach. Abwechselnd sagt jede Person einen Satz. Beim Sprechen dürft ihr das Perfekt benutzen.', stufe: 3, karten: [
        { titel: 'Erzählwörter', text: ['Vor langer Zeit …', 'Zuerst … · Dann …', 'Plötzlich …', 'Am Ende …'] },
        { titel: 'Im Perfekt erzählen', text: ['Der Mann hat Flöte gespielt.', 'Die Ratten sind ins Wasser gesprungen.', 'Siegfried hat durch das Schlüsselloch geschaut.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Geschichten erzählen', punkte: ['**Anfang:** Vor langer Zeit … · Es war einmal …', '**Reihenfolge:** Zuerst … · Dann … · Danach …', '**Spannung:** Plötzlich … · Auf einmal …', '**Schluss:** Am Ende … · Seitdem …', 'Danach kommt das **Verb an Position 2**: Dann **kam** der Mann.'] },
         { titel: 'Präteritum (er / sie / es)', tabelle: { kopf: ['regelmäßig: -te', 'unregelmäßig'], zeilen: [['spielen → spiel**te**', 'kommen → k**a**m'], ['sagen → sag**te**', 'laufen → l**ie**f'], ['folgen → folg**te**', 'springen → spr**a**ng'], ['schauen → schau**te**', 'verschwinden → verschw**a**nd']] } }],
        [{ art: 'tipp', titel: 'So erzählst du nach', text: 'Lies die Geschichte. Schreib **Stichwörter** auf: Wer? Wo? Was passiert? Erzähle dann **mit eigenen Worten** – nicht abschreiben!' },
         { art: 'achtung', titel: 'Erinnerst du dich? (Lektion 4)', text: 'Unregelmäßige Verben ändern den Vokal: geh**en** → g**i**ng, fahr**en** → f**u**hr, komm**en** → k**a**m.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Präteritum.', stufe: 1, saetze: ['(spielen) Der Mann [spielte] auf der Flöte.', '(laufen) Die Ratten [liefen] hinter ihm her.', '(versprechen) Der Bürgermeister [versprach] ihm Geld.', '(schauen) Siegfried [schaute] durch das Schlüsselloch.', '(verschwinden) Melusina [verschwand] im Felsen.'] },
      { art: 'luecken', auftrag: 'Ergänze die Erzählwörter.', stufe: 2, woerter: ['Vor langer Zeit', 'Zuerst', 'Dann', 'Plötzlich', 'Am Ende'], saetze: ['[Vor langer Zeit] gab es in Hameln viele Ratten.', '[Zuerst] spielte der Mann leise auf der Flöte.', '[Dann] liefen die Ratten zum Fluss.', '[Plötzlich] sprangen sie ins Wasser.', '[Am Ende] wollten die Leute nicht bezahlen.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erzähle die Sage vom Rattenfänger mit eigenen Worten nach – im Präteritum. Oder erzähle eine Sage oder ein Märchen aus einem anderen Land.', stufe: 2,
        anfaenge: ['Vor langer Zeit …', 'Eines Tages …', 'Dann …', 'Plötzlich …', 'Am Ende …'], zeilen: 11,
        beispiel: 'Vor langer Zeit gab es in Hameln viele Ratten. Eines Tages kam ein Mann mit einer Flöte. Er versprach, die Ratten wegzubringen. Dann spielte er, und die Ratten liefen in den Fluss. Aber die Leute bezahlten ihn nicht. Plötzlich kam er zurück und nahm die Kinder mit. Am Ende waren alle sehr traurig.' },
    ],
    check: ['Ich verstehe eine Sage.', 'Ich verstehe eine Geschichte, die jemand erzählt.', 'Ich ordne die Teile einer Geschichte.', 'Ich erzähle mit zuerst, dann, plötzlich, am Ende.', 'Ich schreibe eine Nacherzählung im Präteritum.'],
  },
  // ================================================================ 6
  {
    thema: 'Meinungen · Pronomen', titel: 'Stimmt das wirklich?', untertitel: 'Klischees über Luxemburg und über Jugendliche: Du liest eine Diskussion, hörst den Klassenrat – und sagst höflich, ob du zustimmst.',
    ziel: { de: 'Ich sage meine Meinung, stimme zu oder widerspreche höflich.', fr: 'Je donne mon avis, j’approuve ou je contredis poliment.' },
    bild: ['chloe:froh:erklaeren', 'sami:verwirrt:verschraenkt'],
    start: {
      was: 'Fakt oder Klischee?',
      aufgaben: [
        { art: 'rf', auftrag: 'Was meinst du? Kreuze an.', stufe: 1, spalten: ['Fakt', 'Klischee'], saetze: [['In Luxemburg spricht man Luxemburgisch, Französisch und Deutsch.', true], ['Alle Luxemburger sind reich.', false], ['Jugendliche sitzen nur am Handy.', false], ['Luxemburg ist eines der kleinsten Länder in Europa.', true], ['Mädchen können nicht gut rechnen.', false]] },
      ],
    },
    lesen: {
      was: 'Eine Diskussion im Jugendforum', art: 'chat', stimmen: { Moderation: 'erz', Ana_14: 'w2', 'Jo.lux': 'm1', Mika: 'm3' }, ich: 'Jo.lux',
      quelle: 'Jugendforum „Junge Stimmen“', titel: 'Thema der Woche',
      nachrichten: [
        ['Moderation', 'Thema der Woche: „In Luxemburg sind alle reich.“ Stimmt das? Was meint ihr?'],
        ['Ana_14', 'Das stimmt nicht! Klar, viele Leute verdienen gut. Aber das Leben ist hier auch sehr teuer, besonders die Wohnungen.'],
        ['Jo.lux', 'Ich gebe dir recht, Ana. Ein Klischee sagt: **alle**. Aber die Menschen sind doch verschieden.'],
        ['Mika', 'Ich sehe das ein bisschen anders. Im Vergleich zu vielen Ländern geht es Luxemburg sehr gut. Ein bisschen Wahrheit ist schon dabei.'],
        ['Ana_14', 'Okay, das verstehe ich. Aber man darf niemanden in eine Schublade stecken.'],
        ['Moderation', 'Danke für eure Meinungen! Nächste Woche: „Jugendliche sitzen nur am Handy.“'],
      ],
      woerter: [['das Klischee', 'le cliché'], ['das Vorurteil', 'le préjugé'], ['verdienen', 'gagner (de l’argent)'], ['teuer', 'cher'], ['verschieden', 'différent'], ['im Vergleich zu', 'par rapport à'], ['die Wahrheit', 'la vérité'], ['in eine Schublade stecken', 'mettre dans une case']],
      aufgaben: [
        { art: 'wer', auftrag: 'Wer sagt das? Kreuze an.', stufe: 1, personen: ['Ana_14', 'Jo.lux', 'Mika'], saetze: [['Das Leben in Luxemburg ist teuer.', 'Ana_14'], ['Ich stimme Ana zu.', 'Jo.lux'], ['Ich sehe das ein bisschen anders.', 'Mika'], ['Die Menschen sind verschieden.', 'Jo.lux'], ['Man darf niemanden in eine Schublade stecken.', 'Ana_14']] },
        { art: 'zuordnen', auftrag: 'Was macht die Person? Verbinde.', stufe: 2, links: ['Ich gebe dir recht.', 'Ich sehe das anders.', 'Da bin ich nicht sicher.', 'Okay, das verstehe ich.'], rechts: ['zustimmen', 'widersprechen', 'zweifeln', 'Verständnis zeigen'], ordnung: [1, 3, 0, 2] },
      ],
    },
    hoeren: {
      was: 'Eine Diskussion im Klassenrat', wo: 'Klassenrat · 7P2', titel: '„Jugendliche sitzen nur am Handy“',
      situation: 'Im Klassenrat sprechen die Jugendlichen über ein Klischee. Frau Sommer leitet das Gespräch.',
      bild: ['lehrerin:froh:erklaeren', 'chloe:froh'], sprecher: { 'Frau Sommer': 'w1', Noah: 'm1', Chloe: 'w2', Sami: 'm3' },
      text: [
        ['Frau Sommer', 'Heute sprechen wir über ein Klischee: „Jugendliche sitzen nur am Handy.“ Was meint ihr?'],
        ['Noah', 'Ich finde, dass das nicht stimmt. Ich spiele dreimal pro Woche Fußball. Da habe ich kein Handy dabei.'],
        ['Chloe', 'Ich gebe dir recht, Noah. Aber ehrlich: Abends bin ich oft lange am Handy. Ein bisschen stimmt es also.'],
        ['Sami', 'Ich sehe das anders. Erwachsene sitzen doch auch viel am Handy! Mein Opa schaut ständig Videos.'],
        ['Frau Sommer', 'Interessant. Sami, kannst du das genauer erklären? Ist das Handy das Problem?'],
        ['Sami', 'Nein, nicht das Handy. Das Problem ist, wenn man nichts anderes mehr macht.'],
        ['Chloe', 'Genau! Ich stimme dir zu. Man braucht auch Pausen ohne Bildschirm.'],
        ['Frau Sommer', 'Super. Dann halten wir fest: Klischees sind zu einfach. Man muss genau hinschauen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Mit welchen Sätzen stimmst du zu? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ich gebe dir recht.', 'Ich stimme dir zu.', 'Ich sehe das anders.'], r: [0, 1] }] }],
      beim: [
        { art: 'wer', auftrag: 'Hör zu. Wer sagt das?', stufe: 1, personen: ['Noah', 'Chloe', 'Sami'], saetze: [['Ich spiele dreimal pro Woche Fußball.', 'Noah'], ['Abends bin ich oft lange am Handy.', 'Chloe'], ['Erwachsene sitzen auch viel am Handy.', 'Sami'], ['Man braucht Pausen ohne Bildschirm.', 'Chloe']] },
        { art: 'fragen', auftrag: 'Was ist für Sami das Problem?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Das Problem ist, wenn man nichts anderes mehr macht.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Diskutiert in Gruppen ein Klischee: „Jugendliche lesen nicht mehr.“ oder „Wer gute Noten hat, ist ein Streber.“', stufe: 3, karten: [
        { titel: 'Zustimmen', text: ['Ich gebe dir recht.', 'Ich stimme dir zu.', 'Genau!'] },
        { titel: 'Widersprechen', text: ['Ich sehe das anders.', 'Da bin ich nicht sicher.', 'Ich finde nicht, dass …'] },
        { titel: 'Nachfragen', text: ['Kannst du das genauer erklären?', 'Wie meinst du das?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Personalpronomen', tabelle: { kopf: ['Nominativ', 'Akkusativ', 'Dativ'], zeilen: [['ich', 'mich', 'mir'], ['du', 'dich', 'dir'], ['er', 'ihn', 'ihm'], ['sie', 'sie', 'ihr'], ['es', 'es', 'ihm'], ['wir', 'uns', 'uns'], ['ihr', 'euch', 'euch'], ['sie / Sie', 'sie / Sie', 'ihnen / Ihnen']] } },
         { titel: 'Meinung mit Pronomen', punkte: ['Ich gebe **dir** recht. (Dativ)', 'Ich stimme **dir** zu. (Dativ)', 'Das gefällt **mir**. (Dativ)', 'Ich verstehe **dich**. (Akkusativ)', 'Kannst du **mir** das erklären?'] }],
        [{ art: 'tipp', titel: 'Klischee erkennen', text: 'Achtung bei **alle**, **immer**, **nie**, **typisch**. Oft steckt ein Klischee dahinter. Frag dich: **Stimmt das für jeden Menschen?**' },
         { art: 'achtung', titel: 'Wenn Worte wehtun', text: 'Wirst du oder wird jemand wegen eines Klischees ausgelacht oder ausgeschlossen? Sprich mit einer Lehrperson. Hilfe: **116 111** (gratis, anonym).' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Pronomen.', stufe: 1, saetze: ['(du) Chloe, ich gebe [dir] recht.', '(du) Noah, ich verstehe [dich].', '(er) Sami hat eine Idee. Ich stimme [ihm] zu.', '(sie) Ana erklärt es gut. Ich gebe [ihr] recht.', '(ich) Das Forum gefällt [mir].', '(wir) Frau Sommer, können Sie [uns] helfen?'] },
      { art: 'abschreiben', auftrag: 'Mach aus dem Klischee einen fairen Satz.', stufe: 3, kopf: ['Klischee', 'fairer Satz'], saetze: [['Alle Jugendlichen sind faul.', 'Manche Jugendliche sind manchmal faul, viele sind sehr aktiv.'], ['Wer eine Brille trägt, ist ein Streber.', 'Eine Brille sagt nichts über einen Menschen.'], ['Alte Menschen verstehen keine Technik.', 'Viele ältere Menschen benutzen Handy und Computer.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen Beitrag für das Forum: „Jugendliche sitzen nur am Handy.“ Sag deine Meinung und nenne zwei Gründe.', stufe: 2,
        anfaenge: ['Ich finde, dass …', 'Erstens …', 'Zweitens …', 'Ich gebe … recht, aber …', 'Mein Fazit: …'], zeilen: 9,
        beispiel: 'Ich finde, dass das Klischee nicht stimmt. Erstens machen viele Jugendliche Sport oder Musik. Zweitens nutzen wir das Handy auch für die Schule. Ich gebe Chloe recht, aber abends bin ich auch oft zu lange am Handy. Mein Fazit: Pausen sind wichtig!' },
    ],
    check: ['Ich verstehe eine Diskussion im Forum.', 'Ich verstehe, wer zustimmt und wer widerspricht.', 'Ich stimme höflich zu oder widerspreche.', 'Ich benutze Pronomen im Dativ und Akkusativ.', 'Ich erkenne Klischees.'],
  },
  // ================================================================ 7
  {
    thema: 'Bücher, Lieder, Filme · Akkusativ', titel: 'Das musst du lesen!', untertitel: 'Ein Plakat für die Lesenacht, zwei Buchtipps und eine Filmszene: Du sagst, was dir gefällt – und warum.',
    ziel: { de: 'Ich sage, was mir an einem Buch, Lied oder Film gefällt, und begründe es.', fr: 'Je dis ce qui me plaît dans un livre, une chanson ou un film, et je justifie.' },
    bild: ['amira:froh:blatt', 'tom:aufgeregt'],
    start: {
      was: 'Wie findest du es?',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was ist das Gegenteil? Verbinde.', stufe: 1, links: ['spannend', 'lustig', 'kurz', 'leicht', 'neu'], rechts: ['langweilig', 'traurig', 'lang', 'schwer', 'alt'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Ein Plakat und zwei Buchtipps', art: 'dokumente',
      quelle: 'Stadtbibliothek · Pinnwand', titel: 'Lesen macht Spaß!',
      dokumente: [
        { stil: 'karte', stimme: 'w1', kopf: '**Lesenacht in der Bibliothek!**', text: ['Freitag, 19 bis 23 Uhr · Stadtbibliothek · für 11 bis 15 Jahre · gratis', 'Vorlesen mit Taschenlampe, Bücher-Quiz, Pizza um 21 Uhr', 'Anmeldung bis Mittwoch. Bring Schlafsack, Kissen und dein Lieblingsbuch mit!'] },
        { stil: 'notiz', stimme: 'w2', kopf: 'Buchtipp von Amira (13): **„Das Geheimnis im Turm“**', text: ['Ein Mädchen findet im alten Turm ihrer Schule eine Karte. Zusammen mit zwei Freunden sucht sie einen Schatz. Das Buch ist **spannend** von der ersten bis zur letzten Seite!', 'Mir gefällt besonders, dass die Freunde sich immer helfen. Fünf Sterne!'] },
        { stil: 'notiz', stimme: 'm1', kopf: 'Buchtipp von Tom (14): **„Mein Jahr im Funkloch“**', text: ['Ein Junge muss ein Jahr ohne Handy auf einem Bauernhof leben. Am Anfang ist er sauer, dann lernt er viel. Das Buch ist **lustig**, aber am Ende auch ein bisschen traurig.', 'Ich empfehle es allen, die gern lachen. Nur der Anfang ist etwas langweilig. Vier Sterne.'] },
      ],
      woerter: [['die Lesenacht', 'la nuit de la lecture'], ['die Taschenlampe', 'la lampe de poche'], ['die Anmeldung', 'l’inscription'], ['der Schlafsack', 'le sac de couchage'], ['das Geheimnis', 'le secret'], ['der Schatz', 'le trésor'], ['empfehlen', 'recommander'], ['das Funkloch', 'la zone sans réseau']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Die Lesenacht kostet nichts.', true], ['Man muss sich nicht anmelden.', false], ['Um 21 Uhr gibt es Pizza.', true], ['Amira findet ihr Buch langweilig.', false], ['Tom empfiehlt sein Buch für Leute, die gern lachen.', true]] },
        { art: 'tabelle', auftrag: 'Vergleiche die zwei Buchtipps.', stufe: 2, kopf: ['', 'Amira', 'Tom'], breiten: [28, 36, 36], zeilen: [['Titel', '[Das Geheimnis im Turm]', '[Mein Jahr im Funkloch]'], ['Wie ist das Buch?', '[spannend]', '[lustig, am Ende traurig]'], ['Sterne', '[5]', '[4]']] },
      ],
    },
    hoeren: {
      was: 'Eine Filmszene', wo: 'Film zum Buch · „Das Geheimnis im Turm“', titel: 'Da ist etwas!',
      situation: 'Das ist eine Szene aus dem Film zum Buch. Lea und ihre Freunde Sami und Finn sind abends im alten Turm der Schule.',
      bild: ['lea:aengstlich', 'sami:nervoes'], sprecher: { Lea: 'w2', Sami: 'm3', Finn: 'm1', Hausmeister: 'm2' },
      text: [
        ['Lea', 'Psst! Leise! Hier ist die Tür zum Turm.'],
        ['Sami', 'Es ist so dunkel. Hast du die Taschenlampe?'],
        ['Lea', 'Ja, hier. Schaut mal, an der Wand! Da ist ein Zeichen – ein Stern mit drei Punkten.'],
        ['Finn', 'Den Stern kenne ich! Er ist auch auf der Karte, die wir gefunden haben.'],
        ['Sami', 'Hört ihr das? Da kommt jemand die Treppe hoch!'],
        ['Hausmeister', 'Hallo? Ist da jemand? Die Schule ist seit einer Stunde geschlossen!'],
        ['Lea', 'Schnell, hinter die Kiste! Und die Lampe aus!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was passt zu einer spannenden Filmszene? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Es ist dunkel.', 'Man flüstert.', 'Plötzlich kommt ein Geräusch.', 'Jemand liest ein Kochrezept vor.'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [{ f: 'Wo sind die drei?', o: ['im Keller', 'im alten Turm der Schule', 'in der Bibliothek'], r: 1 }, { f: 'Was ist an der Wand?', o: ['ein Stern mit drei Punkten', 'eine Uhr', 'ein Fenster'], r: 0 }, { f: 'Wer kommt die Treppe hoch?', o: ['eine Lehrerin', 'der Hausmeister', 'ein Hund'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was passiert wohl als Nächstes? Äußert Vermutungen und erfindet zusammen das Ende der Szene.', stufe: 3, karten: [
        { titel: 'Vermuten', text: ['Vielleicht …', 'Ich glaube, dass …', 'Wahrscheinlich …'] },
        { titel: 'Meinung', text: ['Mir gefällt die Szene, weil …', 'Ich finde sie spannend / lustig / gruselig.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Was gefällt dir?', punkte: ['Das Buch gefällt **mir**. (gefallen + Dativ)', 'Die Lieder gefall**en** **mir**. (Plural)', 'Ich **mag** den Film. (mögen + Akkusativ)', 'Ich empfehle **dir** (wem?) **das Buch** (was?).'] }],
        [{ titel: 'Das Akkusativobjekt (wen? was?)', tabelle: { kopf: ['', 'Nominativ', 'Akkusativ'], zeilen: [['maskulin', '**der** Film', 'Ich sehe **den** Film.'], ['feminin', '**die** Geschichte', 'Ich lese **die** Geschichte.'], ['neutral', '**das** Buch', 'Ich kaufe **das** Buch.'], ['Plural', '**die** Lieder', 'Ich höre **die** Lieder.']] } }],
        [{ art: 'tipp', titel: 'Eine Meinung begründen', text: 'Ich finde das Buch **spannend**, **weil** … · Mir gefällt besonders, **dass** … · Nicht so gut finde ich …' },
         { art: 'achtung', titel: 'Nur maskulin ändert sich!', text: 'der → **den** · ein → **einen** · kein → **keinen**. Bei die, das und im Plural bleibt alles gleich.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze den Artikel im Akkusativ.', stufe: 1, saetze: ['(ein) Ich lese gerade [einen] Krimi.', '(der) Hast du [den] Film schon gesehen?', '(das) Ich höre [das] Lied jeden Tag.', '(die) Mia empfiehlt mir [die] Serie.', '(kein) Ich habe [keinen] Lieblingsfilm.'] },
      { art: 'luecken', auftrag: 'Ergänze „gefallen“ oder das Pronomen.', stufe: 2, saetze: ['Das Buch [gefällt] mir sehr.', 'Die Lieder [gefallen] mir.', '(ich) Der Film gefällt [mir] nicht.', '(du) Gefällt [dir] die Serie?'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen Tipp für ein Buch, ein Lied oder einen Film. Du darfst auch etwas ausdenken.', stufe: 2,
        anfaenge: ['Mein Tipp: „…“', 'Es geht um …', 'Mir gefällt besonders, dass …', 'Nicht so gut finde ich …', 'Ich empfehle es allen, die …'], zeilen: 9,
        beispiel: 'Mein Tipp: das Lied „Sommer am See“. Es geht um Freunde, die zusammen Ferien machen. Mir gefällt besonders, dass die Musik so fröhlich ist. Nicht so gut finde ich, dass das Lied sehr kurz ist. Ich empfehle es allen, die gute Laune brauchen. Vier Sterne!' },
    ],
    check: ['Ich verstehe ein Plakat und Buchtipps.', 'Ich verstehe eine kurze Filmszene.', 'Ich sage, was mir gefällt, und begründe es.', 'Ich benutze den Akkusativ (den, einen, keinen).', 'Ich äußere Vermutungen, wie eine Geschichte weitergeht.'],
  },
  // ================================================================ 8
  {
    thema: 'Lebensgeschichten · Perfekt und Präteritum', titel: 'Ein Leben – eine Geschichte', untertitel: 'Warum kamen viele Menschen nach Luxemburg? Du liest eine Lebensgeschichte, hörst ein Interview – und erfindest selbst eine Biografie.',
    ziel: { de: 'Ich verstehe Lebensgeschichten und schreibe eine erfundene Biografie.', fr: 'Je comprends des récits de vie et j’écris une biographie inventée.' },
    bild: ['opa:stolz:stehen', 'mia:froh:blatt'],
    start: {
      was: 'Ein Leben',
      aufgaben: [
        { art: 'ordnen', auftrag: 'In welcher Reihenfolge passiert das meistens? Nummeriere.', stufe: 1, teile: ['Man wird geboren.', 'Man geht in den Kindergarten.', 'Man geht zur Schule.', 'Man macht eine Ausbildung.', 'Man arbeitet.', 'Man geht in Rente.'], ordnung: [4, 1, 5, 0, 3, 2] },
      ],
    },
    lesen: {
      was: 'Eine Lebensgeschichte', art: 'text', stimme: 'erz', nummern: true,
      quelle: 'Ausstellung „Menschen im Süden“ · Infotafel (ausgedachte Person, typische Geschichte)', titel: 'Von Italien ins Minett',
      absaetze: [
        'Enzo Moretti **wurde** 1938 in einem kleinen Dorf in Süditalien geboren. Seine Familie **war** arm. Mit 14 Jahren **musste** er schon auf den Feldern arbeiten.',
        'Im Jahr 1956 **kam** Enzo mit dem Zug nach **Esch an der Alzette**. Viele Italiener **arbeiteten** damals in den Stahlwerken im Süden Luxemburgs, im „Minett“. Die Arbeit **war** hart und heiß.',
        'Am Anfang **verstand** Enzo kein Wort Luxemburgisch. Abends **lernte** er Deutsch und Französisch. Er **fand** schnell Freunde – beim Fußball!',
        'Später **heiratete** Enzo eine Luxemburgerin. Sie **bekamen** zwei Kinder. 1998 **ging** Enzo in Rente.',
        'Heute sagt Enzo: „Ich bin Italiener **und** Luxemburger. Mein Herz hat zwei Hälften.“',
      ],
      woerter: [['das Dorf', 'le village'], ['arm', 'pauvre'], ['das Feld', 'le champ'], ['das Stahlwerk', 'l’aciérie'], ['hart', 'dur'], ['heiraten', 'se marier'], ['in Rente gehen', 'prendre sa retraite'], ['die Hälfte', 'la moitié']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ergänze den Zeitstrahl.', stufe: 1, kopf: ['Wann?', 'Was passierte?'], breiten: [26, 74], zeilen: [['1938', '[Enzo wurde in Süditalien geboren.]'], ['mit 14 Jahren', '[Er musste auf den Feldern arbeiten.]'], ['1956', '[Er kam nach Esch an der Alzette.]'], ['später', '[Er heiratete und bekam zwei Kinder.]'], ['1998', '[Er ging in Rente.]']] },
        { art: 'fragen', auftrag: 'Beantworte die Fragen.', stufe: 2, fragen: [{ f: 'Wo fand Enzo Freunde?', l: 'beim Fußball' }, { f: 'Was meint Enzo mit „Mein Herz hat zwei Hälften“?', zeilen: 2, l: 'Er fühlt sich als Italiener und als Luxemburger.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Interview', wo: 'Schülerzeitung · Interview', titel: 'Wie war Ihr erster Tag?',
      situation: 'Mia schreibt für die Schülerzeitung. Sie interviewt Herrn Moretti über seine ersten Jahre in Luxemburg.',
      bild: ['opa:froh', 'mia:froh:blatt'], sprecher: { Mia: 'w2', 'Herr Moretti': 'm2' },
      text: [
        ['Mia', 'Herr Moretti, danke, dass Sie mit mir sprechen. Wie war Ihr erster Tag in Luxemburg?'],
        ['Herr Moretti', 'Oh, daran erinnere ich mich gut! Ich bin morgens mit dem Zug angekommen. Es hat geregnet und es war kalt. Ich habe gedacht: Was mache ich hier?'],
        ['Mia', 'Und wie war die Arbeit im Stahlwerk?'],
        ['Herr Moretti', 'Sehr anstrengend. Ich habe oft nachts gearbeitet. Aber die Kollegen haben mir viel geholfen.'],
        ['Mia', 'Hatten Sie Heimweh?'],
        ['Herr Moretti', 'Ja, am Anfang sehr. Ich habe jede Woche einen Brief nach Hause geschrieben. Telefonieren war damals sehr teuer.'],
        ['Mia', 'Was ist Ihr Tipp für Jugendliche, die neu in einem Land sind?'],
        ['Herr Moretti', 'Lernt die Sprache und habt Mut! Und sucht euch ein Hobby. Beim Fußball habe ich meine besten Freunde gefunden.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie fragst du eine ältere Person höflich? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Wie war Ihr erster Tag?', 'Wie war dein erster Tag?'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Herr Moretti ist mit dem Zug angekommen.', true], ['An seinem ersten Tag hat die Sonne geschienen.', false], ['Er hat oft nachts gearbeitet.', true], ['Er hat jeden Tag nach Hause telefoniert.', false], ['Seine besten Freunde hat er beim Fußball gefunden.', true]] },
        { art: 'fragen', auftrag: 'Welchen Tipp gibt Herr Moretti?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Lernt die Sprache, habt Mut und sucht euch ein Hobby.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Rollenspiel: Eine Person spielt eine erfundene ältere Person, die andere interviewt sie. Dann tauscht ihr.', stufe: 3, karten: [
        { titel: 'Fragen (Sie)', text: ['Wo sind Sie geboren?', 'Wann sind Sie nach … gekommen?', 'Was war am Anfang schwer?', 'Was war besonders schön?'] },
        { titel: 'Antworten (Perfekt)', text: ['Ich bin in … geboren.', 'Ich habe … gelernt / gearbeitet.', 'Ich bin nach … gezogen.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Gesprochen oder geschrieben?', tabelle: { kopf: ['', 'Interview (Perfekt)', 'Infotafel (Präteritum)'], zeilen: [['ankommen', 'ich **bin** angekommen', 'er **kam** an'], ['arbeiten', 'ich **habe** gearbeitet', 'er **arbeitete**'], ['lernen', 'ich **habe** gelernt', 'er **lernte**'], ['finden', 'ich **habe** gefunden', 'er **fand**'], ['sein', 'ich **war**', 'er **war**']] } }],
        [{ titel: 'Zeitangaben im Lebenslauf', punkte: ['**1956** kam er nach Luxemburg.', '**Mit 14 Jahren** musste er arbeiten.', '**Zwei Jahre später** …', '**Am Anfang** … · **Später** … · **Heute** …', 'Danach: **Verb an Position 2**.'] }],
        [{ art: 'tipp', titel: 'Wusstest du?', text: 'In Luxemburg hat fast **die Hälfte** der Menschen einen ausländischen Pass. Viele Familien kamen zum Beispiel aus Italien oder Portugal.' },
         { art: 'achtung', titel: 'Trennbare Verben im Präteritum', text: 'ankommen → er **kam** am Morgen **an** · aufstehen → er **stand** früh **auf**' }],
      ],
    },
    ueben: [
      { art: 'abschreiben', auftrag: 'Aus dem Interview wird eine Biografie. Schreib im Präteritum.', stufe: 2, kopf: ['Interview (Perfekt)', 'Biografie (Präteritum)'], saetze: [['Ich bin 1956 angekommen.', 'Er kam 1956 an.'], ['Ich habe nachts gearbeitet.', 'Er arbeitete nachts.'], ['Ich habe Freunde gefunden.', 'Er fand Freunde.'], ['Ich habe Briefe geschrieben.', 'Er schrieb Briefe.']] },
      { art: 'luecken', auftrag: 'Ergänze die Zeitangaben.', stufe: 1, woerter: ['1956', 'Mit 14 Jahren', 'Am Anfang', 'Später', 'Heute'], saetze: ['[1956] kam Enzo nach Esch.', '[Mit 14 Jahren] musste er arbeiten.', '[Am Anfang] verstand er kein Luxemburgisch.', '[Später] heiratete er.', '[Heute] fühlt er sich als Italiener und Luxemburger.'] },
    ],
    schreibenNeueSeite: true,
    schreiben: [
      { art: 'steckbrief', auftrag: 'Erfinde eine Person. Mach zuerst einen Steckbrief.', stufe: 1, bildText: 'Zeichne die Person.', felder: ['Name', 'geboren (wann? wo?)', 'als Kind', 'ein wichtiges Erlebnis', 'Beruf / Hobby', 'heute'] },
      { art: 'schreiben', auftrag: 'Schreib jetzt die Biografie deiner erfundenen Person – im Präteritum.', stufe: 2,
        anfaenge: ['… wurde … in … geboren.', 'Als Kind …', 'Mit … Jahren …', 'Später …', 'Heute …'], zeilen: 10,
        beispiel: 'Lucie Martin wurde 1990 in Lyon geboren. Als Kind malte sie jeden Tag. Mit 18 Jahren zog sie nach Luxemburg und studierte Kunst. Später öffnete sie ein kleines Atelier im Grund. Heute malt sie Bilder von alten Häusern und gibt Kurse für Kinder.' },
    ],
    check: ['Ich verstehe eine Lebensgeschichte.', 'Ich verstehe ein Interview mit einer älteren Person.', 'Ich frage höflich mit „Sie“.', 'Ich weiß, wann man Perfekt und wann Präteritum benutzt.', 'Ich schreibe eine erfundene Biografie.'],
  },
]

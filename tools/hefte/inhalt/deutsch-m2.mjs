// Deutsch · Modul 2 „Stadt, Sport und große Ideen“ (Voie de préparation, A1+/A2.1) – multimodales Heft.
// Themen und Grammatik nach dem Programm ALLUX 7P/6P/5P (CNES, 20/03/2019; Kann-Beschreibungen als Mindeststandards),
// Modul 2: Besuch in einer fremden Stadt, Erfindungen und Entdeckungen, kurze Biografien, Sport;
// Stadtplan (Symbole, Planquadrat, Straßenverzeichnis), Imperativ in Wegbeschreibungen, zusammengesetzte Nomen,
// Satzmelodie und Satzzeichen, Perfekt (regelmäßig, einige unregelmäßige Verben), Lebenslauf, Personalpronomen
// (Dativ/Akkusativ erkennen), Aussehen beschreiben, eine Geschichte fortsetzen.
// Roter Faden: Die Klasse 7P2 fährt drei Tage nach Trier (Lektion 1–5). Trier-Fakten sind bewusst einfach gehalten;
// der Stadtplan ist vereinfacht (nicht maßstabsgetreu). Alle Texte selbst geschrieben, alle Jugendlichen ausgedacht.
// Biografien (Lektion 7): Melitta Bentz und Bertha Benz – nur allgemein bekannte Eckdaten.

// Vereinfachter Stadtplan von Trier (16 × 10 Einheiten, Raster A–F × 1–4)
const TRIER = {
  titel: 'Trier – Innenstadt (vereinfacht, nicht maßstabsgetreu)', breite: 16, hoehe: 10,
  fluss: { d: 'M 12 -4 C 20 30, 6 70, 15 104', b: 1.7, name: 'Mosel', tx: 0.75, ty: 6.6 },
  gruen: [{ x: 9.4, y: 5.9, w: 3.3, h: 2.1, name: 'Palastgarten' }],
  strassen: [
    { x1: 7.4, y1: 1.5, x2: 14.6, y2: 2.0, name: 'Theodor-Heuss-Allee', breit: true },
    { x1: 7.4, y1: 1.5, x2: 7.4, y2: 5.4, name: 'Simeonstraße' },
    { x1: 2.6, y1: 1.3, x2: 7.4, y2: 1.5 },
    { x1: 2.5, y1: 0.3, x2: 2.7, y2: 8.6, name: 'Zurlaubener Ufer' },
    { x1: 7.4, y1: 5.4, x2: 3.0, y2: 6.3, name: 'Fleischstraße' },
    { x1: 7.4, y1: 5.4, x2: 10.2, y2: 4.6, name: 'Sternstraße' },
    { x1: 7.4, y1: 5.4, x2: 8.2, y2: 8.6, name: 'Brotstraße' },
    { x1: 2.7, y1: 8.6, x2: 14.6, y2: 8.6, name: 'Kaiserstraße', breit: true },
    { x1: 10.2, y1: 4.6, x2: 11.2, y2: 8.6 },
  ],
  orte: [
    { x: 3.6, y: 1.3, icon: 'bed', name: 'Jugendherberge', pos: 'u' },
    { x: 7.4, y: 1.5, icon: 'building-castle', name: 'Porta Nigra', farbe: '#7e2b1c', pos: 'o' },
    { x: 8.4, y: 2.6, icon: 'info-circle', name: 'Tourist-Information', farbe: '#1f7a99' },
    { x: 14.6, y: 2.0, icon: 'train', name: 'Hauptbahnhof', farbe: '#475066', pos: 'o' },
    { x: 13.7, y: 3.4, icon: 'bus', name: 'Bus', links: true, farbe: '#475066' },
    { x: 7.4, y: 5.4, icon: 'fountain', name: 'Hauptmarkt', pos: 'l' },
    { x: 10.2, y: 4.6, icon: 'building-church', name: 'Dom', farbe: '#7e2b1c', pos: 'o' },
    { x: 12.3, y: 8.6, icon: 'columns', name: 'Kaiserthermen', farbe: '#7e2b1c', pos: 'o' },
    { x: 4.8, y: 6.9, icon: 'ice-cream', name: 'Eiscafé', farbe: '#d0577b', pos: 'u' },
    { x: 14.2, y: 6.2, icon: 'movie', name: 'Kino', links: true, farbe: '#d0577b' },
  ],
  legende: [['building-castle', 'Sehenswürdigkeit'], ['info-circle', 'Information'], ['train', 'Bahnhof'], ['bus', 'Bushaltestelle'], ['bed', 'Jugendherberge'], ['ice-cream', 'Café'], ['movie', 'Kino']],
}
const TRIER_RALLYE = { ...TRIER, weg: [[7.4, 1.5], [7.4, 5.4], [10.2, 4.6], [10.7, 6.3], [11.4, 7.6], [12.3, 8.6]] }

export const MODUL = {
  id: 'deutsch-m2', kuerzel: 'de2', nr: 2, sprache: 'de', niveau: 'A1 – A2.1', klasse: 'Voie de préparation',
  dateiname: 'Deutsch_Modul-2',
  fach: { de: 'Deutsch', fr: 'Allemand' },
  titel: { de: 'Stadt, Sport und große Ideen', fr: 'Ville, sport et grandes idées' },
  untertitel: { de: 'Eine Klassenfahrt nach Trier, Wege in der Stadt, Erfinderinnen und Sportler: lesen, hören, sprechen und schreiben – in acht Einheiten.', fr: 'Un voyage de classe à Trèves, s’orienter en ville, des inventrices et des sportifs : lire, écouter, parler et écrire – en huit unités.' },
  farben: { tief: '#b4432e', mittel: '#eaa38f', zart: '#fbefe9', dunkel: '#7e2b1c' },
  deckbild: ['amira:froh:stehen-zeigen', 'ben:froh:laessig', 'nele:froh:rollstuhl'],
  blasen: [{ t: 'Wo ist das?', x: 16, y: 112 }, { t: 'Geh geradeaus!', x: 138, y: 104 }, { t: 'Toll!', x: 150, y: 150 }],
  themen: [
    { titel: { de: 'Unterwegs in Trier', fr: 'En route à Trèves' }, icon: 'map-2', lektionen: 2 },
    { titel: { de: 'Wörter und Sätze', fr: 'Mots et phrases' }, icon: 'puzzle', lektionen: 2 },
    { titel: { de: 'Erzählen: Perfekt und Sport', fr: 'Raconter : passé composé et sport' }, icon: 'run', lektionen: 2 },
    { titel: { de: 'Große Ideen, echte Menschen', fr: 'Grandes idées, vraies personnes' }, icon: 'bulb', lektionen: 2 },
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
    thema: 'Einen Stadtplan lesen', titel: 'Willkommen in Trier!', untertitel: 'Die 7P2 fährt drei Tage nach Trier. Mit dem Stadtplan findet ihr alles: Sehenswürdigkeiten, Jugendherberge – und das beste Eiscafé.',
    ziel: { de: 'Ich lese einen Stadtplan: Symbole, Legende und Planquadrate.', fr: 'Je lis un plan de ville : symboles, légende et carrés.' },
    bild: ['amira:froh:stehen-zeigen', 'ben:froh:stehen'],
    start: {
      was: 'Symbole auf dem Stadtplan',
      aufgaben: [
        { art: 'symbole', auftrag: 'Was bedeuten die Symbole? Schreib das Wort.', stufe: 1, woerter: ['Bahnhof', 'Bushaltestelle', 'Jugendherberge', 'Kirche', 'Information', 'Kino', 'Café', 'Parkplatz'],
          symbole: [['train', 'Bahnhof'], ['bus', 'Bushaltestelle'], ['bed', 'Jugendherberge'], ['building-church', 'Kirche'], ['info-circle', 'Information'], ['movie', 'Kino'], ['ice-cream', 'Café'], ['parking', 'Parkplatz']] },
      ],
    },
    lesen: {
      was: 'Ein Flyer für Jugendliche', art: 'text', stimme: 'w1', stadtplan: TRIER,
      quelle: 'Tourist-Information Trier · Flyer', titel: 'Trier für Jugendliche – fünf Tipps',
      absaetze: [
        'Trier ist eine der ältesten Städte Deutschlands. Die Stadt liegt an der **Mosel** – mit dem Bus nur etwa eine Stunde von Junglinster entfernt. Hier sind unsere fünf Tipps für euch.',
        '**Die Porta Nigra:** Das „Schwarze Tor“ ist fast 1900 Jahre alt. Die Römer haben es gebaut. Ihr könnt hineingehen und von oben auf die Stadt schauen.',
        '**Der Hauptmarkt:** Hier ist immer etwas los. In der Mitte steht ein alter Brunnen. Rund um den Platz gibt es Cafés und Geschäfte.',
        '**Der Dom:** Er ist eine der ältesten Kirchen in Deutschland. Innen ist er sehr groß und ganz ruhig.',
        '**Die Kaiserthermen:** Das war ein riesiges Bad der Römer. Heute sind es Ruinen. Unter der Erde gibt es lange, dunkle Gänge – spannend!',
        '**Die Mosel:** Am Ufer könnt ihr spazieren gehen, Rad fahren oder ein Picknick machen. Von hier fahren auch Schiffe.',
      ],
      woerter: [['die Sehenswürdigkeit', 'le lieu touristique'], ['das Tor', 'la porte'], ['die Römer', 'les Romains'], ['bauen', 'construire'], ['der Brunnen', 'la fontaine'], ['das Bad', 'les bains'], ['die Ruine', 'la ruine'], ['der Gang', 'le couloir, le passage'], ['das Ufer', 'la rive']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Schau auf den Stadtplan. In welchem Planquadrat liegt der Ort?', stufe: 1, hilfe: 'Erst der Buchstabe (oben), dann die Zahl (links). Zum Beispiel: C1.',
          kopf: ['Porta Nigra', 'Hauptmarkt', 'Dom', 'Kaiserthermen', 'Jugendherberge', 'Hauptbahnhof'], zeilen: [['[C1]', '[C3]', '[D2]', '[E4]', '[B1]', '[F1]']] },
        { art: 'wer', auftrag: 'Lies den Flyer. Wo kann man das machen? Kreuze an.', stufe: 2, personen: ['Porta Nigra', 'Hauptmarkt', 'Kaiserthermen', 'Mosel'], saetze: [
          ['von oben auf die Stadt schauen', 'Porta Nigra'], ['durch dunkle Gänge gehen', 'Kaiserthermen'], ['ein Picknick machen', 'Mosel'], ['in ein Café gehen', 'Hauptmarkt'], ['mit dem Schiff fahren', 'Mosel']] },
        { art: 'fragen', auftrag: 'Welchen Tipp findest du am besten? Warum?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Ich finde die Kaiserthermen am besten. Die dunklen Gänge sind spannend.' }] },
      ],
    },
    hoeren: {
      was: 'In der Tourist-Information', wo: 'Tourist-Information · Dienstag, 11 Uhr', titel: 'Haben Sie einen Stadtplan?',
      situation: 'Die Klasse ist gerade in Trier angekommen. Amira und Ben gehen in die Tourist-Information an der Porta Nigra.',
      bild: ['amira:froh', 'verkaeuferin:froh'], sprecher: { Mitarbeiterin: 'w1', Amira: 'w2', Ben: 'm3' },
      text: [
        ['Mitarbeiterin', 'Guten Tag! Kann ich euch helfen?'], ['Amira', 'Guten Tag! Wir sind eine Schulklasse aus Luxemburg. Haben Sie einen Stadtplan für uns?'],
        ['Mitarbeiterin', 'Natürlich. Der Stadtplan ist gratis. Hier, bitte.'], ['Ben', 'Danke! Wo ist die Jugendherberge?'],
        ['Mitarbeiterin', 'Die Jugendherberge ist an der Mosel, im Planquadrat B1. Zu Fuß sind das zehn Minuten.'],
        ['Amira', 'Und was können wir heute Nachmittag machen?'],
        ['Mitarbeiterin', 'Um vierzehn Uhr gibt es eine Stadtführung für Jugendliche. Sie beginnt hier vor der Porta Nigra und dauert eine Stunde.'],
        ['Ben', 'Super! Und wo kann man gut Eis essen?'], ['Mitarbeiterin', 'Am Hauptmarkt und in der Fleischstraße gibt es viele Eiscafés.'],
        ['Amira', 'Vielen Dank! Auf Wiedersehen!'], ['Mitarbeiterin', 'Gern geschehen. Viel Spaß in Trier!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bekommt man in einer Tourist-Information? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['einen Stadtplan', 'Tipps für die Stadt', 'eine Pizza', 'Infos über Führungen'], r: [0, 1, 3] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu und kreuze an.', stufe: 1, fragen: [
          { f: 'Der Stadtplan kostet …', o: ['nichts.', 'zwei Euro.', 'fünf Euro.'], r: 0 },
          { f: 'Zu Fuß zur Jugendherberge braucht man …', o: ['fünf Minuten.', 'zehn Minuten.', 'eine Stunde.'], r: 1 },
          { f: 'Die Stadtführung beginnt …', o: ['um 11 Uhr.', 'um 14 Uhr.', 'um 16 Uhr.'], r: 1 }] },
        { art: 'tabelle', auftrag: 'Hör noch einmal. Ergänze die Notiz von Amira.', stufe: 2, kopf: ['', 'Notiz'], breiten: [30, 70], zeilen: [
          ['Jugendherberge', '[an der Mosel, Planquadrat B1]'], ['Stadtführung', '[14 Uhr, vor der Porta Nigra, 1 Stunde]'], ['Eis essen', '[am Hauptmarkt, in der Fleischstraße]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt die Szene in der Tourist-Information. Fragt nach drei Dingen.', stufe: 3, karten: [
        { titel: 'Gast', text: ['Haben Sie einen Stadtplan?', 'Wo ist …?', 'Was können wir heute machen?', 'Wo kann man gut … ?'] },
        { titel: 'Information', text: ['Natürlich, hier, bitte.', '… ist im Planquadrat …', 'Um … Uhr gibt es …', 'Am / In der … gibt es …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Einen Stadtplan lesen', punkte: ['Die **Legende** erklärt die **Symbole**.', 'Ein **Planquadrat** hat einen Buchstaben und eine Zahl: **C1**.', 'Das **Straßenverzeichnis** ist alphabetisch: **Brotstraße C3–C4**.', 'Ein Stadtplan ist **eingenordet**: Oben ist Norden.'] },
         { titel: 'Wo ist das?', tabelle: { kopf: ['', 'Beispiel'], zeilen: [['am + Platz/Fluss', '**am** Hauptmarkt · **an der** Mosel'], ['in + Straße', '**in der** Simeonstraße'], ['neben / gegenüber', '**neben** dem Dom'], ['im + Planquadrat', '**im** Planquadrat C1']] } }],
        [{ art: 'tipp', titel: 'So findest du ein Planquadrat', text: 'Finger auf den **Buchstaben** oben, dann nach unten bis zur **Zahl**. Wo sich die Linien treffen, ist dein Planquadrat.' },
         { art: 'achtung', titel: 'Höflich fragen', text: 'In der Tourist-Information sagst du **Sie**: **Haben Sie** einen Stadtplan? **Können Sie** mir helfen?' }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Straßenverzeichnis: Suche die Straßen im Stadtplan. Schreib die Planquadrate.', stufe: 1, kopf: ['Straße', 'Planquadrate'], breiten: [50, 50], zeilen: [
        ['Simeonstraße', '[C1 – C3]'], ['Sternstraße', '[C3 – D2]'], ['Kaiserstraße', '[B4 – F4]'], ['Theodor-Heuss-Allee', '[C1 – F1]']] },
      { art: 'luecken', auftrag: 'Ergänze: am, an der, in der, im.', stufe: 2, woerter: ['am', 'an der', 'in der', 'im'], saetze: ['Der Brunnen steht [am] Hauptmarkt.', 'Die Jugendherberge liegt [an der] Mosel.', 'Viele Geschäfte sind [in der] Simeonstraße.', 'Der Dom liegt [im] Planquadrat D2.'] },
      { art: 'fragen', auftrag: 'Du bist in der Tourist-Information. Schreib drei höfliche Fragen mit „Sie“.', stufe: 3, fragen: [{ f: '', l: 'Haben Sie einen Stadtplan?' }, { f: '', l: 'Können Sie mir sagen, wo der Dom ist?' }, { f: '', l: 'Wann beginnt die Stadtführung?' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib eine Postkarte aus Trier an eine Freundin oder einen Freund: Wo bist du? Was hast du gesehen? Was gefällt dir?', stufe: 2,
        anfaenge: ['Liebe … / Lieber …,', 'ich bin gerade in …', 'Heute …', 'Am besten finde ich …', 'Morgen …', 'Viele Grüße'], zeilen: 8,
        beispiel: 'Lieber Noah, ich bin gerade in Trier. Heute waren wir an der Porta Nigra. Sie ist sehr alt und groß. Am besten finde ich das Eiscafé am Hauptmarkt! Morgen gehen wir in die Kaiserthermen. Viele Grüße, Amira' },
    ],
    check: ['Ich verstehe die Symbole auf einem Stadtplan.', 'Ich finde einen Ort mit dem Planquadrat.', 'Ich verstehe einen kurzen Flyer.', 'Ich frage in der Tourist-Information höflich nach.', 'Ich schreibe eine Postkarte.'],
  },
  // ================================================================ 2
  {
    thema: 'Der Imperativ', titel: 'Geh geradeaus!', untertitel: 'Stadtrallye durch Trier: Ihr folgt einer Wegbeschreibung, fragt nach dem Weg – und beschreibt ihn selbst.',
    ziel: { de: 'Ich verstehe und gebe Wegbeschreibungen mit dem Imperativ.', fr: 'Je comprends et je donne des indications de chemin avec l’impératif.' },
    bild: ['noah:verwirrt:handy', 'oma:froh:stehen-zeigen'],
    start: {
      was: 'Aufforderungen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wer sagt das? Verbinde.', stufe: 1, links: ['Setzt euch, bitte!', 'Komm, wir gehen rein!', 'Bitte warten Sie hier!', 'Mach die Musik leiser!'],
          rechts: ['eine Lehrerin zu der Klasse', 'ein Freund zu einem Freund', 'ein Mann am Schalter zu einer Frau', 'eine Schwester zu ihrem Bruder'], ordnung: [2, 0, 3, 1] },
      ],
    },
    lesen: {
      was: 'Eine Stadtrallye', art: 'text', stimme: 'w1', stadtplan: TRIER_RALLYE,
      quelle: 'Stadtrallye für die 7P2 · Blatt 1', titel: 'Rallye: Von der Porta Nigra zu den Kaiserthermen',
      absaetze: [
        '**Startet** an der Porta Nigra. **Geht** die Simeonstraße immer geradeaus bis zum Hauptmarkt. **Zählt** die Eiscafés auf dem Weg!',
        'Am Hauptmarkt: **Sucht** den Brunnen. **Lest** das Schild: Wie heißt er? **Schreibt** den Namen auf.',
        '**Biegt** dann links in die Sternstraße **ab**. Am Ende der Straße seht ihr den Dom. **Geht** hinein, aber **seid** bitte leise!',
        '**Geht** am Dom vorbei nach Süden. Bald kommt ihr in den Palastgarten. **Macht** dort eine Pause und **trinkt** etwas.',
        '**Geht** durch den Park. Am Ende seht ihr die Kaiserthermen. **Wartet** dort auf Frau Sommer. **Vergesst** eure Antworten nicht!',
      ],
      woerter: [['die Rallye', 'le rallye'], ['zählen', 'compter'], ['das Schild', 'le panneau'], ['abbiegen', 'tourner'], ['vorbeigehen', 'passer devant'], ['nach Süden', 'vers le sud'], ['vergessen', 'oublier']],
      aufgaben: [
        { art: 'frei', auftrag: 'Zeichne den Rallye-Weg in den Stadtplan oben ein. Starte am roten Punkt.', stufe: 1, html: '<div class="hilfe" style="margin:0">Tipp: Lies Absatz für Absatz und folge mit dem Finger.</div>' },
        { art: 'ordnen', auftrag: 'In welcher Reihenfolge kommt die Gruppe an diesen Orten vorbei? Schreib 1 bis 5.', stufe: 2, teile: ['Porta Nigra', 'Hauptmarkt', 'Dom', 'Palastgarten', 'Kaiserthermen'], ordnung: [3, 1, 4, 0, 2] },
        { art: 'fragen', auftrag: 'Lies noch einmal. Was müssen die Gruppen bei der Rallye machen? Schreib drei Aufgaben.', stufe: 3, fragen: [{ f: '', zeilen: 3, l: 'Eiscafés zählen; den Namen vom Brunnen aufschreiben; im Dom leise sein; im Park eine Pause machen.' }] },
      ],
    },
    hoeren: {
      was: 'Nach dem Weg fragen', wo: 'Am Hauptbahnhof · Abend', titel: 'Wie komme ich zur Jugendherberge?',
      situation: 'Noah hat die Gruppe verloren. Er steht am Hauptbahnhof. Er fragt eine Frau nach dem Weg zur Jugendherberge.',
      bild: ['noah:besorgt', 'oma:froh'], sprecher: { Noah: 'm1', Frau: 'w1' },
      text: [
        ['Noah', 'Entschuldigung, können Sie mir helfen? Wie komme ich zur Jugendherberge?'],
        ['Frau', 'Zur Jugendherberge? Das ist nicht weit. Gehen Sie hier die Theodor-Heuss-Allee immer geradeaus.'],
        ['Noah', 'Geradeaus, okay.'], ['Frau', 'Nach etwa zehn Minuten sehen Sie ein großes, dunkles Tor. Das ist die Porta Nigra.'],
        ['Frau', 'Gehen Sie an der Porta Nigra vorbei und dann immer weiter geradeaus bis zur Mosel.'],
        ['Frau', 'An der Mosel sehen Sie die Jugendherberge schon. Sie ist auf der rechten Seite.'],
        ['Noah', 'Also: geradeaus, an der Porta Nigra vorbei, bis zur Mosel. Vielen Dank!'], ['Frau', 'Gern geschehen! Und rufen Sie Ihre Lehrerin an!'],
        ['Noah', 'Ja, das mache ich sofort. Danke!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Du hast deine Gruppe verloren. Was machst du? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ich rufe die Lehrerin an.', 'Ich frage jemanden nach dem Weg.', 'Ich gehe allein ins Kino.'], r: [0, 1] }] }],
      beim: [
        { art: 'mc', auftrag: 'Hör zu. Kreuze an.', stufe: 1, fragen: [
          { f: 'Wo ist Noah?', o: ['am Hauptbahnhof', 'am Hauptmarkt', 'am Dom'], r: 0 },
          { f: 'Welches Tor sieht Noah nach zehn Minuten?', o: ['das Brandenburger Tor', 'die Porta Nigra', 'das Schultor'], r: 1 },
          { f: 'Wo ist die Jugendherberge?', o: ['an der Mosel', 'neben dem Kino', 'hinter dem Dom'], r: 0 }] },
        { art: 'luecken', auftrag: 'Hör noch einmal. Ergänze die Wegbeschreibung.', stufe: 2, saetze: ['[Gehen] Sie hier die Theodor-Heuss-Allee immer [geradeaus].', 'Gehen Sie an der Porta Nigra [vorbei].', 'Gehen Sie weiter bis zur [Mosel].', 'Die Jugendherberge ist auf der [rechten] Seite.'] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Arbeitet mit dem Stadtplan. A fragt nach dem Weg, B erklärt. Dann tauscht ihr.', stufe: 3, karten: [
        { titel: 'A fragt (Start: Hauptbahnhof)', text: ['Entschuldigung, wie komme ich zum Dom?', '… zum Kino?', '… zum Eiscafé?'] },
        { titel: 'B erklärt', text: ['Geh(en Sie) geradeaus bis …', 'Bieg(en Sie) links / rechts ab.', 'Dann sehen Sie / siehst du …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Der Imperativ', tabelle: { kopf: ['', 'du', 'ihr', 'Sie'], zeilen: [['gehen', '**Geh**!', '**Geht**!', '**Gehen Sie**!'], ['kommen', '**Komm**!', '**Kommt**!', '**Kommen Sie**!'], ['lesen', '**Lies**!', '**Lest**!', '**Lesen Sie**!'], ['sein', '**Sei** leise!', '**Seid** leise!', '**Seien Sie** leise!']] } },
         { titel: 'So bildest du ihn', punkte: ['**du:** du gehst → **Geh!** (ohne -st, ohne „du“)', '**ihr:** ihr geht → **Geht!** (ohne „ihr“)', '**Sie:** Sie gehen → **Gehen Sie!**', 'Das Verb steht **vorn**. Am Ende: **!**'] }],
        [{ art: 'tipp', titel: 'Verben mit zwei Teilen', text: 'ab|biegen: **Biegt** links **ab**! · vorbei|gehen: **Geh** am Dom **vorbei**! Der kleine Teil steht am Ende.' },
         { art: 'achtung', titel: 'Freundlich bleiben', text: 'Mit **bitte** klingt ein Imperativ höflicher: **Komm bitte** mit! **Warten Sie bitte** hier!' }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Ergänze den Imperativ.', stufe: 1, kopf: ['Verb', 'du', 'ihr', 'Sie'], zeilen: [
        ['machen', '[Mach!]', '[Macht!]', '[Machen Sie!]'], ['trinken', '[Trink!]', 'Trinkt!', '[Trinken Sie!]'], ['warten', '[Warte!]', '[Wartet!]', 'Warten Sie!'], ['nehmen', 'Nimm!', '[Nehmt!]', '[Nehmen Sie!]']] },
      { art: 'abschreiben', auftrag: 'Mach aus dem Satz einen Imperativ.', stufe: 2, kopf: ['Satz', 'Imperativ'], saetze: [
        ['Du gehst geradeaus.', 'Geh geradeaus!'], ['Ihr biegt links ab.', 'Biegt links ab!'], ['Sie nehmen den Bus Nummer 3.', 'Nehmen Sie den Bus Nummer 3!'], ['Du bist pünktlich.', 'Sei pünktlich!']] },
      { art: 'fragen', auftrag: 'Du bist am Hauptbahnhof. Beschreib einer Freundin den Weg zum Hauptmarkt. Benutze den Imperativ.', stufe: 3, fragen: [{ f: '', zeilen: 3, l: 'Geh die Theodor-Heuss-Allee geradeaus bis zur Porta Nigra. Bieg links in die Simeonstraße ab. Geh geradeaus bis zum Hauptmarkt.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Eure Klasse kommt mit dem Zug in Trier an. Schreib eine Wegbeschreibung vom Hauptbahnhof zur Jugendherberge – für die ganze Klasse (ihr-Form).', stufe: 2,
        anfaenge: ['Liebe Klasse,', 'geht …', 'Dann …', 'An der Porta Nigra …', 'Bis zur Mosel …', 'Dort seht ihr …'], zeilen: 8,
        beispiel: 'Liebe Klasse, geht am Hauptbahnhof nach links. Geht dann die Theodor-Heuss-Allee immer geradeaus. Nach zehn Minuten seht ihr die Porta Nigra. Geht an der Porta Nigra vorbei und weiter geradeaus bis zur Mosel. Dort seht ihr die Jugendherberge rechts.' },
    ],
    check: ['Ich verstehe eine schriftliche Wegbeschreibung.', 'Ich zeichne einen Weg in einen Stadtplan ein.', 'Ich frage höflich nach dem Weg.', 'Ich bilde den Imperativ mit du, ihr und Sie.', 'Ich schreibe eine Wegbeschreibung.'],
  },
  // ================================================================ 3
  {
    thema: 'Zusammengesetzte Nomen', titel: 'Bahn + Hof = Bahnhof', untertitel: 'Aus zwei Wörtern wird ein neues: Stadt + Plan = Stadtplan. Du liest einen Bericht über einen Schüleraustausch – voller langer Wörter.',
    ziel: { de: 'Ich erkenne zusammengesetzte Nomen und finde den richtigen Artikel.', fr: 'Je reconnais les noms composés et je trouve le bon article.' },
    bild: ['chloe:froh', 'lea:froh'],
    start: {
      was: 'Wörter bauen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welche Wörter passen zusammen? Verbinde und schreib das neue Wort.', stufe: 1, links: ['die Stadt', 'der Fuß', 'die Jugend', 'das Haus', 'der Geburtstag'],
          rechts: ['der Plan', 'der Ball', 'die Herberge', 'die Aufgabe', 'die Party'], ordnung: [1, 4, 0, 3, 2] },
      ],
    },
    lesen: {
      was: 'Ein Bericht aus einem Jugendmagazin', art: 'text', stimme: 'w2',
      quelle: 'Jugendmagazin · Rubrik „Austausch“', titel: 'Eine Woche Deutschland: Chloe erzählt',
      absaetze: [
        'Ich heiße Chloe und gehe in die 7P2 in Junglinster. Im Mai war ich eine Woche in Trier – bei einem **Schüleraustausch**. Ich habe bei einer **Gastfamilie** gewohnt. Meine **Austauschpartnerin** heißt Leonie.',
        'Leonie wohnt in einer **Dachwohnung** mit ihren Eltern und einem **Hund**. Mein **Gästezimmer** war klein, aber gemütlich. Aus dem **Fenster** konnte ich die Mosel sehen.',
        'Jeden Morgen sind wir mit dem **Schulbus** gefahren. Leonies Schule ist ein großes **Schulzentrum** mit einer **Kletterwand** in der **Turnhalle**. Das **Mittagessen** in der **Schulkantine** war lecker – besonders die **Gemüsesuppe**!',
        'Am **Wochenende** haben wir eine **Radtour** an der Mosel gemacht. Am Abend gab es ein **Grillfest** im **Garten**. Leonie kommt im Juni zu mir nach Luxemburg. Ich freue mich schon!',
      ],
      woerter: [['der Austausch', 'l’échange'], ['die Gastfamilie', 'la famille d’accueil'], ['wohnen bei', 'habiter chez'], ['gemütlich', 'confortable, douillet'], ['die Kletterwand', 'le mur d’escalade'], ['lecker', 'délicieux'], ['die Radtour', 'la balade à vélo'], ['sich freuen', 'se réjouir']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Chloe war zwei Wochen in Trier.', false], ['Chloe hat bei einer Gastfamilie gewohnt.', true], ['In Leonies Turnhalle gibt es eine Kletterwand.', true], ['Die Gemüsesuppe war nicht gut.', false], ['Leonie kommt im Juni nach Luxemburg.', true]] },
        { art: 'tabelle', auftrag: 'Zerlege die Wörter aus dem Text. Schreib auch den Artikel.', stufe: 2, kopf: ['Wort', 'Teil 1', 'Teil 2'], zeilen: [
          ['der Schulbus', '[die Schule]', '[der Bus]'], ['die Gastfamilie', '[der Gast]', '[die Familie]'], ['die Radtour', '[das Rad]', '[die Tour]'], ['das Mittagessen', '[der Mittag]', '[das Essen]']] },
        { art: 'fragen', auftrag: 'Suche im Text noch drei zusammengesetzte Nomen. Schreib sie mit Artikel.', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'die Dachwohnung, das Gästezimmer, die Turnhalle, die Schulkantine, das Wochenende, das Grillfest' }] },
      ],
    },
    hoeren: {
      was: 'Ein Wörter-Quiz im Radio', wo: 'Jugendradio · Sendung „Wortbaustelle“', titel: 'Welches Wort suchen wir?',
      situation: 'Im Jugendradio gibt es ein Quiz. Der Moderator beschreibt ein Wort. Die Anruferin Mia rät.',
      bild: ['finn:froh:handy', 'mia:aufgeregt:handy'], sprecher: { Moderator: 'm1', Mia: 'w2' },
      text: [
        ['Moderator', 'Hallo und willkommen bei der Wortbaustelle! Heute am Telefon: Mia aus Echternach. Hallo, Mia!'], ['Mia', 'Hallo! Ich bin so aufgeregt!'],
        ['Moderator', 'Keine Sorge. Erstes Wort: Hier kaufst du eine Fahrkarte und wartest auf den Zug.'], ['Mia', 'Das ist der Bahnhof!'],
        ['Moderator', 'Richtig! Zweites Wort: Dieses Buch hilft dir. Du suchst ein Wort und findest es auf Französisch.'], ['Mia', 'Hm … das Wörterbuch!'],
        ['Moderator', 'Super! Drittes Wort: Hier spielen Kinder. Es gibt eine Rutsche und eine Schaukel.'], ['Mia', 'Der Spielplatz!'],
        ['Moderator', 'Genau! Und das letzte Wort: Du trägst sie im Winter auf dem Kopf. Sie ist warm.'], ['Mia', 'Die Wintermütze!'],
        ['Moderator', 'Vier von vier! Herzlichen Glückwunsch, Mia! Du gewinnst zwei Kinokarten!'], ['Mia', 'Juhu! Danke!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Quiz? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Spiel mit Fragen', 'ein Sport mit Ball', 'eine Speise'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Wörter sucht der Moderator? Schreib sie mit Artikel.', stufe: 1, kopf: ['', 'Wort'], breiten: [15, 85], zeilen: [['1', '[der Bahnhof]'], ['2', '[das Wörterbuch]'], ['3', '[der Spielplatz]'], ['4', '[die Wintermütze]']] },
        { art: 'mc', auftrag: 'Hör noch einmal. Kreuze an.', stufe: 2, fragen: [{ f: 'Mia kommt aus …', o: ['Echternach.', 'Trier.', 'Mersch.'], r: 0 }, { f: 'Mia gewinnt …', o: ['einen Ball.', 'zwei Kinokarten.', 'ein Buch.'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht selbst ein Wörter-Quiz. A beschreibt ein zusammengesetztes Nomen, B rät.', stufe: 3, karten: [
        { titel: 'Ideen', text: ['die Turnhalle', 'das Klassenzimmer', 'die Zahnbürste', 'der Regenschirm', 'das Handyfoto'] },
        { titel: 'So beschreibst du', text: ['Hier kann man …', 'Das braucht man für …', 'Es ist … und …', 'Man findet es in …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Zusammengesetzte Nomen', punkte: ['Bestimmungswort + **Grundwort**: die Stadt + der **Plan** = der Stadt**plan**.', 'Das **letzte Wort** bestimmt den Artikel: **der** Plan → **der** Stadtplan.', 'Das **erste Wort** sagt, was für ein Ding: ein Plan von der Stadt.', 'Man schreibt **zusammen** und nur den Anfang **groß**.'] },
         { titel: 'Beispiele', tabelle: { kopf: ['Teil 1', 'Teil 2', 'neues Wort'], zeilen: [['das Haus', 'die Aufgabe', '**die** Hausaufgabe'], ['der Fuß', 'der Ball', '**der** Fußball'], ['die Schule', 'das Heft', '**das** Schulheft'], ['das Rad', 'die Tour', '**die** Radtour']] } }],
        [{ art: 'tipp', titel: 'Kleine Verbindungsteile', text: 'Manchmal kommt ein Buchstabe dazwischen: der Geburtstag**s**kuchen, die Straße**n**bahn, das Gäst**e**zimmer.' },
         { art: 'achtung', titel: 'Auch Verben und Adjektive', text: 'Nicht nur Nomen bauen mit: **Fahr**karte (fahren), **Schreib**tisch (schreiben), **Groß**stadt (groß).' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Bilde das neue Wort mit Artikel.', stufe: 1, saetze: ['die Schule + die Tasche = [die Schultasche|45]', 'der Winter + die Jacke = [die Winterjacke|45]', 'das Glas + die Flasche = [die Glasflasche|45]', 'die Hand + der Schuh = [der Handschuh|45]', 'der Apfel + der Saft = [der Apfelsaft|45]'] },
      { art: 'tabelle', auftrag: 'Zerlege die Wörter. Schreib die Teile mit Artikel.', stufe: 2, kopf: ['Wort', 'Teil 1', 'Teil 2'], zeilen: [
        ['das Klassenzimmer', '[die Klasse]', '[das Zimmer]'], ['die Zahnbürste', '[der Zahn]', '[die Bürste]'], ['der Regenschirm', '[der Regen]', '[der Schirm]']] },
      { art: 'fragen', auftrag: 'Erfinde zwei neue, lustige Wörter. Erkläre sie.', stufe: 3, hilfe: 'Zum Beispiel: der Hausaufgabenroboter – ein Roboter, der die Hausaufgaben macht.',
        fragen: [{ f: '', l: 'die Pizzaschule – eine Schule, in der man nur Pizza backt.' }, { f: '', l: 'der Schlafstuhl – ein Stuhl, auf dem man im Unterricht schlafen kann.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen kurzen Bericht: Ein Tag in einer anderen Stadt (echt oder erfunden). Benutze mindestens fünf zusammengesetzte Nomen und unterstreiche sie.', stufe: 2,
        anfaenge: ['Am Wochenende war ich in …', 'Zuerst …', 'Dann …', 'Am Abend …', 'Am besten war …'], zeilen: 9,
        beispiel: 'Am Wochenende war ich in Luxemburg-Stadt. Zuerst bin ich mit dem Linienbus zum Bahnhof gefahren. Dann habe ich im Stadtpark ein Picknick gemacht. Am Nachmittag war ich im Kunstmuseum. Am Abend habe ich eine Gemüsepizza gegessen. Am besten war der Aussichtspunkt!' },
    ],
    check: ['Ich erkenne zusammengesetzte Nomen.', 'Ich finde den Artikel: Das letzte Wort bestimmt ihn.', 'Ich verstehe einen Bericht aus einem Jugendmagazin.', 'Ich verstehe ein Wörter-Quiz im Radio.', 'Ich bilde selbst neue Wörter.'],
  },
  // ================================================================ 4
  {
    thema: 'Satzmelodie und Satzzeichen', titel: 'Punkt, Frage, Ausruf!', untertitel: 'Hörst du, ob jemand etwas sagt, fragt oder ruft? Die Stimme verrät es – und beim Schreiben zeigen es die Satzzeichen.',
    ziel: { de: 'Ich erkenne Aussage, Frage und Aufforderung an der Stimme und setze die Satzzeichen.', fr: 'Je reconnais l’affirmation, la question et l’ordre à la voix et je mets la ponctuation.' },
    bild: ['tom:ueberrascht', 'jana:froh'],
    start: {
      was: 'Drei Satzzeichen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was passt? Verbinde.', stufe: 1, links: ['.', '?', '!'], rechts: ['Ich sage etwas: eine Aussage.', 'Ich will etwas wissen: eine Frage.', 'Ich rufe oder fordere etwas: ein Ausruf, eine Aufforderung.'], ordnung: [1, 2, 0] },
      ],
    },
    lesen: {
      was: 'Ein Gespräch im Bus', art: 'chat', ich: 'Jana', stimmen: { Tom: 'm3', Jana: 'w2', 'Frau Sommer': 'w1' },
      quelle: 'Im Bus zurück nach Junglinster', titel: 'Wo ist mein Handy?',
      nachrichten: [
        ['Tom', 'Jana! Hast du mein Handy gesehen?'], ['Jana', 'Nein. Wo hattest du es zuletzt?'],
        ['Tom', 'Im Eiscafé am Hauptmarkt. Oh nein! Ich habe es auf dem Tisch vergessen!'], ['Jana', 'Ganz ruhig. Ruf doch mal mit meinem Handy an.'],
        ['Tom', 'Gute Idee. Es klingelt … Jemand geht ran!'], ['Frau Sommer', 'Tom, ist alles in Ordnung?'],
        ['Tom', 'Ja! Die Kellnerin hat mein Handy. Sie schickt es mit der Post. Puh!'], ['Jana', 'Siehst du? Alles wird gut.'],
      ],
      woerter: [['zuletzt', 'la dernière fois'], ['vergessen', 'oublier'], ['Ganz ruhig!', 'Du calme !'], ['rangehen', 'décrocher'], ['die Kellnerin', 'la serveuse'], ['schicken', 'envoyer']],
      aufgaben: [
        { art: 'mc', auftrag: 'Lies das Gespräch. Kreuze an.', stufe: 1, fragen: [
          { f: 'Wo hat Tom sein Handy vergessen?', o: ['im Bus', 'im Eiscafé', 'im Dom'], r: 1 },
          { f: 'Wie bekommt Tom sein Handy zurück?', o: ['Die Kellnerin schickt es mit der Post.', 'Jana holt es.', 'Frau Sommer kauft ein neues.'], r: 0 }] },
        { art: 'tabelle', auftrag: 'Suche im Gespräch je ein Beispiel.', stufe: 2, kopf: ['Satzart', 'Beispiel aus dem Text'], breiten: [30, 70], zeilen: [
          ['Aussage .', '[Sie schickt es mit der Post.]'], ['Frage ?', '[Hast du mein Handy gesehen?]'], ['Aufforderung !', '[Ruf doch mal mit meinem Handy an.]']] },
      ],
    },
    hoeren: {
      was: 'Satzmelodie erkennen', wo: 'Sprachlabor', titel: 'Hörst du den Unterschied?',
      situation: 'Du hörst acht kurze Sätze. Manche Sätze haben dieselben Wörter – nur die Stimme ist anders.',
      bild: ['jana:froh', 'tom:froh'], sprecher: { Sprecherin: 'w1', Jana: 'w2', Tom: 'm2' },
      text: [
        ['Sprecherin', 'Satz eins.'], ['Tom', 'Du kommst mit.'],
        ['Sprecherin', 'Satz zwei.'], ['Jana', 'Du kommst mit?'],
        ['Sprecherin', 'Satz drei.'], ['Tom', 'Komm mit!'],
        ['Sprecherin', 'Satz vier.'], ['Jana', 'Wann fährt der Bus?'],
        ['Sprecherin', 'Satz fünf.'], ['Tom', 'Der Bus fährt um drei.'],
        ['Sprecherin', 'Satz sechs.'], ['Jana', 'Fährt der Bus um drei?'],
        ['Sprecherin', 'Satz sieben.'], ['Tom', 'Das ist ja toll!'],
        ['Sprecherin', 'Satz acht.'], ['Jana', 'Ist das toll?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Bei welcher Frage geht die Stimme am Ende nach oben ↗? Kreuze an.', stufe: 2, fragen: [{ f: '', o: ['Kommst du mit?', 'Wann kommst du?'], r: 0 }] }],
      beim: [
        { art: 'satzzeichen', auftrag: 'Hör zu. Welches Satzzeichen passt? Kreuze an.', stufe: 1, saetze: [['1 · Du kommst mit', '.'], ['2 · Du kommst mit', '?'], ['3 · Komm mit', '!'], ['4 · Wann fährt der Bus', '?'], ['5 · Der Bus fährt um drei', '.'], ['6 · Fährt der Bus um drei', '?'], ['7 · Das ist ja toll', '!'], ['8 · Ist das toll', '?']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Lest die Sätze vor: einmal als Aussage, einmal als Frage. Eure Partnerin oder euer Partner sagt: Punkt oder Fragezeichen?', stufe: 3, karten: [
        { titel: 'Sätze', text: ['Du hast Hunger', 'Lina kommt heute', 'Das ist dein Handy', 'Wir fahren nach Trier'] },
        { titel: 'So geht es', text: ['Aussage: Stimme ↘ am Ende', 'Frage: Stimme ↗ am Ende', 'Ausruf: laut und stark!'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Satzarten', tabelle: { kopf: ['Satzart', 'Verb', 'Stimme', 'Zeichen'], zeilen: [['Aussage', 'Position 2', '↘', '**.**'], ['W-Frage', 'Position 2', '↘', '**?**'], ['Ja-/Nein-Frage', 'Position 1', '↗', '**?**'], ['Aufforderung', 'Position 1', '↘ stark', '**!**']] } },
         { titel: 'Beispiele', punkte: ['Der Bus **fährt** um drei**.**', 'Wann **fährt** der Bus**?**', '**Fährt** der Bus um drei**?** ↗', '**Komm** mit**!**', 'Das ist ja toll**!** (Ausruf)'] }],
        [{ art: 'tipp', titel: 'Laut lesen hilft', text: 'Lies deinen Text laut. Wo die Stimme Pause macht, endet oft ein Satz. Setz dort einen Punkt, ein Fragezeichen oder ein Ausrufezeichen.' },
         { art: 'achtung', titel: 'Nach dem Zeichen: groß!', text: 'Nach **. ? !** beginnt ein neuer Satz – mit einem **großen** Buchstaben.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Setze das richtige Satzzeichen: . ? !', stufe: 1, saetze: ['Wo ist mein Handy[?|9]', 'Ich habe es im Café vergessen[.|9]', 'Ruf mich bitte an[!|9]', 'Hast du Zeit[?|9]', 'Das ist super[!|9]', 'Morgen fahren wir nach Hause[.|9]'] },
      { art: 'abschreiben', auftrag: 'Mach aus der Aussage eine Ja-/Nein-Frage.', stufe: 2, kopf: ['Aussage', 'Frage'], saetze: [['Tom hat sein Handy.', 'Hat Tom sein Handy?'], ['Ihr fahrt morgen nach Hause.', 'Fahrt ihr morgen nach Hause?'], ['Die Kellnerin schickt es.', 'Schickt die Kellnerin es?']] },
      { art: 'abschreiben', auftrag: 'Hier fehlen alle Satzzeichen und großen Buchstaben am Satzanfang. Schreib den Text richtig.', stufe: 3, kopf: ['so nicht', 'so ist es richtig'], saetze: [['wo ist Jana sie ist im Bus komm schnell', 'Wo ist Jana? Sie ist im Bus. Komm schnell!'], ['hast du Hunger ich habe noch Chips', 'Hast du Hunger? Ich habe noch Chips.']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib ein kurzes Gespräch (6 Sätze) zwischen zwei Personen auf der Klassenfahrt. Benutze alle drei Satzzeichen.', stufe: 2,
        anfaenge: ['A: Hast du …?', 'B: Nein, …', 'A: Oh nein! …', 'B: Komm, …!'], zeilen: 7,
        beispiel: 'Ben: Hast du meine Jacke gesehen? Lina: Nein. Wo hattest du sie? Ben: Im Dom! Lina: Komm, wir gehen zusammen zurück! Ben: Danke, Lina. Du bist super!' },
    ],
    check: ['Ich höre: Aussage, Frage oder Aufforderung.', 'Ich setze Punkt, Fragezeichen und Ausrufezeichen.', 'Ich bilde Ja-/Nein-Fragen.', 'Ich schreibe nach einem Satzzeichen groß weiter.', 'Ich lese Sätze mit der richtigen Melodie.'],
  },
  // ================================================================ 5
  {
    thema: 'Perfekt mit haben', titel: 'Was hast du gemacht?', untertitel: 'Gestern, am Wochenende, auf der Klassenfahrt: Wenn du von früher erzählst, brauchst du das Perfekt.',
    ziel: { de: 'Ich erzähle, was ich gemacht habe (Perfekt mit „haben“).', fr: 'Je raconte ce que j’ai fait (passé composé avec « haben »).' },
    bild: ['lina:froh:handy', 'sami:froh'],
    start: {
      was: 'Heute oder gestern?',
      aufgaben: [
        { art: 'rf', auftrag: 'Heute oder gestern? Kreuze an.', stufe: 1, spalten: ['heute', 'gestern'], saetze: [['Ich spiele Fußball.', true], ['Ich habe Fußball gespielt.', false], ['Wir haben Pizza gekauft.', false], ['Wir kaufen Pizza.', true], ['Lina hat ein Foto gemacht.', false]] },
      ],
    },
    lesen: {
      was: 'Ein Blog von der Klassenfahrt', art: 'text', stimme: 'w2',
      quelle: 'Klassenblog der 7P2 · Mittwoch, 21:30 Uhr', titel: 'Tag 2 in Trier – von Lina',
      absaetze: [
        'Heute war ein super Tag! Am Morgen haben wir in der Jugendherberge **gefrühstückt**. Ich habe drei Brötchen **gegessen** – ich hatte so einen Hunger!',
        'Um neun Uhr haben wir die Stadtrallye **gemacht**. Mein Team hat alle Fragen **beantwortet**. Am Hauptmarkt haben wir 14 Eiscafés **gezählt**. Wir haben aber nur eins **besucht**. 😉',
        'Im Dom haben wir ganz leise **geredet**. Sam hat ein Foto vom großen Fenster **gemacht**. Danach haben wir im Palastgarten **gepicknickt** und Frisbee **gespielt**.',
        'Am Nachmittag haben wir die Kaiserthermen **besichtigt**. In den dunklen Gängen hat Ben laut **gelacht** – das Echo war lustig!',
        'Am Abend haben wir in der Jugendherberge Karten **gespielt**. Jetzt bin ich müde. Morgen fahren wir schon nach Hause. Schade!',
      ],
      woerter: [['frühstücken', 'prendre le petit-déjeuner'], ['beantworten', 'répondre à'], ['zählen', 'compter'], ['reden', 'parler'], ['das Fenster', 'la fenêtre'], ['picknicken', 'pique-niquer'], ['besichtigen', 'visiter'], ['lachen', 'rire'], ['das Echo', 'l’écho']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Was hat die Klasse wann gemacht? Schreib die Reihenfolge.', stufe: 1, teile: ['gefrühstückt', 'die Stadtrallye gemacht', 'im Palastgarten gepicknickt', 'die Kaiserthermen besichtigt', 'Karten gespielt'], ordnung: [3, 0, 4, 1, 2] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Lina hat drei Brötchen gegessen.', true], ['Die Klasse hat 14 Eiscafés besucht.', false], ['Sam hat im Dom ein Foto gemacht.', true], ['Ben hat in den Gängen geweint.', false]] },
        { art: 'fragen', auftrag: 'Was hat Lina am Abend gemacht? Und wie fühlt sie sich?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Sie hat Karten gespielt. Sie ist müde und ein bisschen traurig, weil die Fahrt bald zu Ende ist.' }] },
      ],
    },
    hoeren: {
      was: 'Vom Wochenende erzählen', wo: 'Pausenhof · Montagmorgen', titel: 'Und, wie war dein Wochenende?',
      situation: 'Montagmorgen. Sam und Lina erzählen sich, was sie am Wochenende gemacht haben.',
      bild: ['sami:froh', 'lina:froh'], sprecher: { Sam: 'm2', Lina: 'w2' },
      text: [
        ['Sam', 'Hi Lina! Und, wie war dein Wochenende?'], ['Lina', 'Ganz gut! Am Samstag habe ich lange geschlafen – bis elf Uhr!'],
        ['Sam', 'Bis elf? Wow. Und dann?'], ['Lina', 'Dann habe ich mit meiner Cousine Kuchen gebacken. Am Abend haben wir einen Film geschaut.'],
        ['Sam', 'Welchen Film?'], ['Lina', 'Eine Komödie. Wir haben viel gelacht. Und du? Was hast du gemacht?'],
        ['Sam', 'Am Samstag habe ich ein Basketballspiel gehabt. Wir haben leider verloren – 48 zu 52.'], ['Lina', 'Oh, schade!'],
        ['Sam', 'Ja. Aber am Sonntag habe ich mit meinem Onkel gekocht. Wir haben Lasagne gemacht. Die war super!'],
        ['Lina', 'Lecker! Hast du auch die Hausaufgaben gemacht?'], ['Sam', 'Hausaufgaben? Oh nein … Welche Hausaufgaben?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was machst du gern am Wochenende? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['lange schlafen', 'Sport machen', 'Freunde treffen', 'kochen oder backen'], r: -1 }] }],
      beim: [
        { art: 'wer', auftrag: 'Hör zu. Wer hat das gemacht? Kreuze an.', stufe: 1, personen: ['Sam', 'Lina'], saetze: [['… hat lange geschlafen.', 'Lina'], ['… hat Kuchen gebacken.', 'Lina'], ['… hat Basketball gespielt.', 'Sam'], ['… hat Lasagne gemacht.', 'Sam'], ['… hat einen Film geschaut.', 'Lina']] },
        { art: 'mc', auftrag: 'Hör noch einmal. Kreuze an.', stufe: 2, fragen: [{ f: 'Wie ist das Spiel ausgegangen?', o: ['gewonnen, 52 zu 48', 'verloren, 48 zu 52', 'unentschieden'], r: 1 }, { f: 'Was hat Sam vergessen?', o: ['die Hausaufgaben', 'sein Handy', 'den Ball'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erzählt euch: Was habt ihr am Wochenende gemacht? (Ihr dürft auch etwas erfinden.)', stufe: 3, karten: [
        { titel: 'Fragen', text: ['Wie war dein Wochenende?', 'Was hast du am Samstag gemacht?', 'Und am Sonntag?', 'Hast du auch …?'] },
        { titel: 'Antworten', text: ['Ich habe … gespielt / gemacht / gekauft.', 'Am Samstag habe ich …', 'Leider habe ich …', 'Es war super / langweilig.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Das Perfekt mit haben', tabelle: { kopf: ['', 'haben (Pos. 2)', '…', 'Partizip (Ende)'], zeilen: [['Ich', '**habe**', 'Fußball', '__ge__spiel__t__.'], ['Wir', '**haben**', 'eine Rallye', '__ge__mach__t__.'], ['Hast', 'du', 'die Hausaufgaben', '__ge__mach__t__?']] } },
         { titel: 'So bildest du das Partizip', punkte: ['**ge** + Stamm + **t**: spielen → **ge**spiel**t**', 'kaufen → **ge**kauf**t** · lachen → **ge**lach**t**', 'warten → **ge**wart**et** (mit -et)', 'Wichtig: das Partizip steht **am Ende**.'] }],
        [{ art: 'tipp', titel: 'Ohne „ge“', text: 'Verben auf **-ieren** und mit **be-, ver-, er-**: telefonieren → telefonier**t**, besuchen → besuch**t**, beantworten → beantworte**t**.' },
         { art: 'achtung', titel: 'Wichtige unregelmäßige Verben', text: 'essen → gegessen · trinken → getrunken · lesen → gelesen · schreiben → geschrieben · backen → gebacken · sehen → gesehen' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze das Partizip.', stufe: 1, saetze: ['(spielen) Wir haben Frisbee [gespielt].', '(kaufen) Ich habe ein Eis [gekauft].', '(machen) Sam hat ein Foto [gemacht].', '(lachen) Ben hat laut [gelacht].', '(warten) Wir haben lange [gewartet].', '(hören) Habt ihr das Echo [gehört]?'] },
      { art: 'abschreiben', auftrag: 'Schreib den Satz im Perfekt.', stufe: 2, kopf: ['Präsens', 'Perfekt'], saetze: [['Ich spiele Karten.', 'Ich habe Karten gespielt.'], ['Lina macht ein Foto.', 'Lina hat ein Foto gemacht.'], ['Wir besuchen den Dom.', 'Wir haben den Dom besucht.'], ['Tom isst eine Pizza.', 'Tom hat eine Pizza gegessen.']] },
      { art: 'fragen', auftrag: 'Was hast du gestern gemacht? Schreib drei Sätze im Perfekt.', stufe: 3, fragen: [{ f: '', l: 'Ich habe Hausaufgaben gemacht.' }, { f: '', l: 'Ich habe mit meiner Freundin telefoniert.' }, { f: '', l: 'Ich habe eine Serie geschaut.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib einen Blogeintrag: Ein schöner Tag (Ausflug, Wochenende, Ferien – echt oder erfunden). Benutze das Perfekt.', stufe: 2,
        anfaenge: ['Heute / Am Samstag war …', 'Am Morgen habe ich …', 'Dann haben wir …', 'Am Nachmittag …', 'Am Abend …', 'Es war …'], zeilen: 9,
        beispiel: 'Am Samstag war ein schöner Tag. Am Morgen habe ich lange geschlafen. Dann haben wir im Park Fußball gespielt. Am Nachmittag habe ich mit meiner Freundin ein Eis gekauft. Am Abend haben wir einen Film geschaut. Es war super!' },
    ],
    check: ['Ich verstehe einen Blogeintrag im Perfekt.', 'Ich verstehe, wenn jemand vom Wochenende erzählt.', 'Ich bilde das Perfekt mit „haben“.', 'Ich kenne Partizipien ohne „ge“ (besucht, telefoniert).', 'Ich erzähle, was ich gemacht habe.'],
  },
  // ================================================================ 6
  {
    thema: 'Perfekt mit sein · Sport', titel: 'Ich bin gelaufen!', untertitel: 'Ein Rennen, ein Sturz, ein Ziel: Wer von Bewegung erzählt, braucht oft „sein“ im Perfekt. Und: Was denken Jugendliche über Sport?',
    ziel: { de: 'Ich erzähle von Erfolg und Misserfolg im Sport (Perfekt mit „sein“).', fr: 'Je raconte un succès ou un échec sportif (passé composé avec « sein »).' },
    bild: ['yusuf:stolz:gehen', 'nele:froh:rollstuhl'],
    start: {
      was: 'Sportarten',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Verb passt zur Sportart? Verbinde.', stufe: 1, links: ['Fußball', 'im Wasser', 'auf dem Rad', 'im Stadion 400 Meter', 'an der Kletterwand'], rechts: ['spielen', 'schwimmen', 'fahren', 'laufen', 'klettern'], ordnung: [3, 0, 4, 1, 2] },
      ],
    },
    lesen: {
      was: 'Eine Geschichte über einen Lauf', art: 'text', stimme: 'm1',
      quelle: 'Schülerzeitung · Rubrik „Mein großer Moment“', titel: 'Fünf Kilometer – von Yusuf',
      absaetze: [
        'Im Frühling habe ich für den Stadtlauf in Junglinster trainiert. Fünf Kilometer! Zweimal pro Woche bin ich mit meinem Freund Noah im Wald **gelaufen**.',
        'Am Sonntag war es so weit. Um zehn Uhr sind wir **gestartet**. Ich bin viel zu schnell **gelaufen**. Nach zwei Kilometern hatte ich Seitenstiche. Ich bin langsamer **geworden** und dann ein Stück **gegangen**.',
        'Dann bin ich auch noch **gestolpert** und **hingefallen**. Mein Knie hat geblutet. Ich wollte aufhören. Aber Noah ist bei mir **geblieben**. Er hat gesagt: „Komm, wir schaffen das zusammen!“',
        'Ich bin **aufgestanden** und wir sind langsam weiter**gelaufen**. Nach 34 Minuten sind wir ins Ziel **gekommen** – zusammen, Hand in Hand. Wir sind nur Platz 51 und 52 **geworden**. Aber ich war so stolz!',
        'Was habe ich gelernt? Fang langsam an. Und: Ein guter Freund ist wichtiger als ein Pokal.',
      ],
      woerter: [['trainieren', 's’entraîner'], ['der Stadtlauf', 'la course en ville'], ['Seitenstiche haben', 'avoir un point de côté'], ['stolpern', 'trébucher'], ['hinfallen', 'tomber'], ['bluten', 'saigner'], ['aufhören', 'arrêter'], ['das Ziel', 'l’arrivée'], ['stolz', 'fier']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Was ist passiert? Bring die Sätze in die richtige Reihenfolge.', stufe: 1, teile: ['Yusuf hat mit Noah trainiert.', 'Er ist zu schnell gestartet.', 'Er ist hingefallen.', 'Noah ist bei ihm geblieben.', 'Sie sind zusammen ins Ziel gekommen.'], ordnung: [2, 4, 0, 3, 1] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Der Lauf war fünf Kilometer lang.', true], ['Yusuf hat den Lauf gewonnen.', false], ['Yusuf ist hingefallen.', true], ['Noah ist allein weitergelaufen.', false]] },
        { art: 'fragen', auftrag: 'Yusuf ist nicht Erster geworden. Warum ist er trotzdem stolz?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Er hat nicht aufgehört und ist ins Ziel gekommen. Und sein Freund hat ihm geholfen.' }] },
      ],
    },
    hoeren: {
      was: 'Meinungen über Sport', wo: 'Schulradio · Umfrage', titel: 'Sport? Na klar! – Sport? Nein, danke!',
      situation: 'Das Schulradio macht eine Umfrage. Vier Jugendliche sagen, was sie über Sport denken.',
      bild: ['chloe:froh', 'finn:gelangweilt'], sprecher: { Reporterin: 'w1', Chloe: 'w2', Finn: 'm3', Nele: 'w3', Tom: 'm2' },
      text: [
        ['Reporterin', 'Hallo! Wir fragen heute: Wie findest du Sport? Chloe, du zuerst.'],
        ['Chloe', 'Sport? Na klar! Ich schwimme dreimal pro Woche. Letzten Monat bin ich bei einem Wettkampf Zweite geworden.'],
        ['Reporterin', 'Super! Und du, Finn?'], ['Finn', 'Sport? Nein, danke! Ich finde Sport langweilig. Ich spiele lieber Gitarre. Aber zur Schule fahre ich jeden Tag mit dem Rad – das ist auch Sport, oder?'],
        ['Reporterin', 'Klar! Nele, wie ist es bei dir?'], ['Nele', 'Ich liebe Rollstuhl-Basketball! Am Samstag haben wir gewonnen. Ich habe zwölf Punkte gemacht.'],
        ['Reporterin', 'Glückwunsch! Und Tom?'], ['Tom', 'Hm, früher habe ich Fußball gespielt. Aber im Winter bin ich gefallen und habe mir das Bein gebrochen. Jetzt gehe ich nur spazieren. Bald will ich wieder spielen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wie findest du Sport? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Na klar, super!', 'Es geht.', 'Nein, danke!'], r: -1 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Mag die Person Sport? Welchen Sport macht sie?', stufe: 1, kopf: ['', 'Sport? 👍 / 👎', 'Welcher Sport?'], breiten: [18, 32, 50], zeilen: [
          ['Chloe', '[👍]', '[Schwimmen]'], ['Finn', '[👎]', '[Rad fahren zur Schule]'], ['Nele', '[👍]', '[Rollstuhl-Basketball]'], ['Tom', '[jetzt Pause]', '[früher Fußball, jetzt spazieren gehen]']] },
        { art: 'mc', auftrag: 'Hör noch einmal. Kreuze an.', stufe: 2, fragen: [{ f: 'Chloe ist bei einem Wettkampf …', o: ['Erste geworden.', 'Zweite geworden.'], r: 1 }, { f: 'Nele hat … Punkte gemacht.', o: ['zehn', 'zwölf', 'zwanzig'], r: 1 }, { f: 'Was ist Tom passiert?', o: ['Er hat sich das Bein gebrochen.', 'Er hat sein Rad verloren.'], r: 0 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht selbst eine Umfrage in der Klasse: Sport – na klar oder nein, danke?', stufe: 3, karten: [
        { titel: 'Fragen', text: ['Wie findest du Sport?', 'Welchen Sport machst du?', 'Hast du schon einmal gewonnen?', 'Bist du schon einmal hingefallen?'] },
        { titel: 'Antworten', text: ['Ich finde Sport super / langweilig.', 'Ich spiele / schwimme / laufe …', 'Ja, ich bin … geworden.', 'Ja, ich bin … gefallen.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Perfekt mit sein', punkte: ['Bei **Bewegung von A nach B**: Ich **bin** gelaufen, gefahren, gegangen, gekommen.', 'Bei **Veränderung**: Ich **bin** hingefallen, aufgestanden, Zweite geworden.', 'Und bei: **sein** → ich bin gewesen, **bleiben** → ich bin geblieben.', 'Sonst meistens: **haben**.'] },
         { titel: 'Formen von sein', tabelle: { kopf: ['', 'sein', 'Partizip'], zeilen: [['ich', 'bin', 'gelaufen'], ['du', 'bist', 'gefahren'], ['er / sie', 'ist', 'gekommen'], ['wir / sie', 'sind', 'gegangen'], ['ihr', 'seid', 'geblieben']] } }],
        [{ art: 'tipp', titel: 'Unregelmäßige Partizipien mit -en', text: 'laufen → gelauf**en** · fahren → gefahr**en** · kommen → gekomm**en** · fallen → gefall**en** · gehen → gegang**en** · werden → geword**en**. Lerne sie als Liste!' },
         { art: 'achtung', titel: 'Trennbare Verben', text: 'hin|fallen → hin**ge**fallen · auf|stehen → auf**ge**standen · weiter|laufen → weiter**ge**laufen. Das **ge** steht in der Mitte.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: '„bin, bist, ist, sind, seid“ – ergänze.', stufe: 1, saetze: ['Ich [bin] fünf Kilometer gelaufen.', 'Noah [ist] bei Yusuf geblieben.', 'Wir [sind] zusammen ins Ziel gekommen.', '[Bist] du schon einmal hingefallen?', 'Ihr [seid] mit dem Bus gefahren.'] },
      { art: 'luecken', auftrag: '„haben“ oder „sein“? Ergänze die richtige Form.', stufe: 2, saetze: ['Chloe [ist] Zweite geworden.', 'Nele [hat] zwölf Punkte gemacht.', 'Tom [ist] im Winter gefallen.', 'Finn [hat] Gitarre gespielt.', 'Wir [sind] mit dem Rad zur Schule gefahren.', 'Ich [habe] viel Wasser getrunken.'] },
      { art: 'fragen', auftrag: 'Erzähl von einem Erfolg oder einem Misserfolg (Sport, Spiel, Schule …). Schreib drei Sätze im Perfekt.', stufe: 3, fragen: [{ f: '', zeilen: 3, l: 'Letztes Jahr bin ich beim Schwimmfest gestartet. Ich bin nur Vierte geworden. Aber ich habe meine beste Zeit geschwommen.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'SMS an einen Freund: Euer Team hat gespielt. Schreib das Ergebnis und was passiert ist.', stufe: 1, zeilen: 4, beispiel: 'Hi Ben! Wir haben 3:2 gewonnen! Ich habe ein Tor geschossen. Lina ist leider hingefallen, aber es geht ihr gut. Bis morgen!' },
      { art: 'schreiben', auftrag: 'Schreib eine Geschichte für die Rubrik „Mein großer Moment“. Was ist passiert? Wie hast du dich gefühlt? Was hast du gelernt?', stufe: 2,
        anfaenge: ['Letztes Jahr / Am Samstag …', 'Zuerst bin ich …', 'Dann ist … passiert.', 'Ich habe mich … gefühlt.', 'Am Ende …', 'Ich habe gelernt: …'], zeilen: 9,
        beispiel: 'Letzten Winter bin ich zum ersten Mal Schlittschuh gelaufen. Zuerst bin ich oft hingefallen. Ich habe mich ein bisschen dumm gefühlt. Dann hat mir meine Freundin geholfen. Am Ende bin ich allein gefahren! Ich habe gelernt: Üben lohnt sich.' },
    ],
    check: ['Ich verstehe eine Geschichte über Erfolg und Misserfolg.', 'Ich verstehe Meinungen über Sport.', 'Ich bilde das Perfekt mit „sein“ (Bewegung, Veränderung).', 'Ich kenne wichtige unregelmäßige Partizipien.', 'Ich schreibe eine kurze SMS über ein Sportergebnis.'],
  },
  // ================================================================ 7
  {
    thema: 'Kurze Biografien', titel: 'Wer hat das erfunden?', untertitel: 'Ein Kaffeefilter aus einem Schulheft, eine Autofahrt, die Geschichte schreibt: Du liest kurze Biografien und schreibst einen Lebenslauf.',
    ziel: { de: 'Ich verstehe kurze Biografien und schreibe einen tabellarischen Lebenslauf.', fr: 'Je comprends de courtes biographies et j’écris un CV sous forme de tableau.' },
    bild: ['amira:ueberrascht', 'lina:froh:zeigen-hoch'],
    start: {
      was: 'Jahreszahlen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wie spricht man die Jahreszahlen? Verbinde.', stufe: 1, links: ['1888', '1908', '1950', '2008', '2026'], rechts: ['achtzehnhundertachtundachtzig', 'neunzehnhundertacht', 'neunzehnhundertfünfzig', 'zweitausendacht', 'zweitausendsechsundzwanzig'], ordnung: [2, 0, 4, 1, 3] },
      ],
    },
    lesen: {
      was: 'Zwei kurze Biografien', art: 'profile', stimme: 'w1',
      quelle: 'Wissensseite · Erfinderinnen', titel: 'Zwei Frauen mit großen Ideen',
      profile: [
        { name: 'Melitta Bentz (1873–1950)', bild: 'oma:stolz', stimme: 'w1', text: 'Melitta Bentz hat in Dresden gelebt. Sie hat gern Kaffee getrunken. Aber im Kaffee war immer Kaffeesatz – das hat ihr nicht geschmeckt. 1908 hatte sie eine Idee: Sie hat Löschpapier aus dem Schulheft ihres Sohnes genommen und einen alten Topf mit Löchern benutzt. So hat sie den Kaffeefilter aus Papier erfunden. Danach hat sie eine eigene Firma gegründet.' },
        { name: 'Bertha Benz (1849–1944)', bild: 'mutter:stolz', stimme: 'w2', text: 'Bertha Benz war die Frau von Carl Benz. Carl hat eines der ersten Autos gebaut. Aber niemand wollte es kaufen. 1888 ist Bertha mit ihren zwei Söhnen heimlich von Mannheim nach Pforzheim gefahren – über 100 Kilometer! Unterwegs hat sie Benzin in einer Apotheke gekauft. Die Fahrt hat allen gezeigt: Das Auto funktioniert.' },
      ],
      woerter: [['erfinden', 'inventer'], ['der Kaffeesatz', 'le marc de café'], ['das Löschpapier', 'le papier buvard'], ['benutzen', 'utiliser'], ['die Firma gründen', 'fonder une entreprise'], ['heimlich', 'en secret'], ['das Benzin', 'l’essence'], ['die Apotheke', 'la pharmacie'], ['funktionieren', 'fonctionner']],
      aufgaben: [
        { art: 'wer', auftrag: 'Melitta oder Bertha? Kreuze an.', stufe: 1, personen: ['Melitta Bentz', 'Bertha Benz'], saetze: [['… hat in Dresden gelebt.', 'Melitta Bentz'], ['… ist über 100 Kilometer gefahren.', 'Bertha Benz'], ['… hat Papier aus einem Schulheft benutzt.', 'Melitta Bentz'], ['… hat Benzin in einer Apotheke gekauft.', 'Bertha Benz'], ['… hat eine Firma gegründet.', 'Melitta Bentz']] },
        { art: 'tabelle', auftrag: 'Ergänze die Jahreszahlen.', stufe: 2, kopf: ['Was?', 'Wann?'], breiten: [70, 30], zeilen: [['Melitta Bentz ist geboren.', '[1873]'], ['Sie hat den Kaffeefilter erfunden.', '[1908]'], ['Bertha Benz ist nach Pforzheim gefahren.', '[1888]'], ['Bertha Benz ist gestorben.', '[1944]']] },
        { art: 'fragen', auftrag: 'Warum war Berthas Fahrt so wichtig?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Niemand wollte das Auto kaufen. Die Fahrt hat gezeigt, dass das Auto funktioniert.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Präsentation verstehen', wo: 'Aula · Erfinder-Wettbewerb der Schule', titel: 'Von der Idee zur Erfindung',
      situation: 'Beim Erfinder-Wettbewerb der Schule stellt Lina ihre Erfindung vor. Sie zeigt dabei Bilder.',
      bild: ['lina:froh:erklaeren'], sprecher: { Lina: 'w2', Lehrer: 'm1' },
      text: [
        ['Lina', 'Guten Tag! Meine Erfindung heißt „Leuchtrucksack“.'],
        ['Lina', 'Zuerst: das Problem. Im Winter ist es morgens dunkel. Ich gehe zu Fuß zur Schule, und die Autos sehen mich schlecht. Das ist gefährlich.'],
        ['Lina', 'Dann hatte ich eine Idee: ein Rucksack, der leuchtet! Auf dem ersten Bild seht ihr meine Skizze.'],
        ['Lina', 'Danach habe ich ein Modell gebaut. Ich habe kleine Lampen an einen alten Rucksack genäht. Die Lampen bekommen Strom von einer Batterie.'],
        ['Lina', 'Auf dem zweiten Bild seht ihr meinen ersten Test. Er hat nicht funktioniert – die Batterie war zu schwach.'],
        ['Lina', 'Beim zweiten Test habe ich eine stärkere Batterie benutzt. Jetzt leuchtet der Rucksack drei Stunden lang.'],
        ['Lina', 'Mein Fazit: Man darf nicht aufgeben! Danke fürs Zuhören.'], ['Lehrer', 'Bravo, Lina! Habt ihr Fragen?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht man, bevor man etwas erfindet? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Problem finden', 'eine Skizze zeichnen', 'ein Modell bauen', 'sofort aufgeben'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. In welcher Reihenfolge hat Lina gearbeitet?', stufe: 1, teile: ['ein Problem gefunden', 'eine Skizze gezeichnet', 'ein Modell gebaut', 'den ersten Test gemacht', 'eine stärkere Batterie benutzt'], ordnung: [1, 3, 0, 4, 2] },
        { art: 'mc', auftrag: 'Hör noch einmal. Kreuze an.', stufe: 2, fragen: [{ f: 'Warum hat Lina die Idee gehabt?', o: ['Autos sehen sie im Dunkeln schlecht.', 'Ihr Rucksack war kaputt.'], r: 0 }, { f: 'Wie lange leuchtet der Rucksack jetzt?', o: ['eine Stunde', 'drei Stunden', 'den ganzen Tag'], r: 1 }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Stellt euch Fragen zu Linas Erfindung. Erfindet die Antworten.', stufe: 3, karten: [
        { titel: 'Fragen', text: ['Wie lange hast du gebaut?', 'Was hat das Modell gekostet?', 'Kann man ihn waschen?', 'Willst du ihn verkaufen?'] },
        { titel: 'Antworten', text: ['Ich habe … gebaut.', 'Es hat … gekostet.', 'Nein, aber …', 'Vielleicht …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Eine Biografie lesen', punkte: ['Biografien erzählen ein Leben: **geboren** – **gelebt** – **gearbeitet** – **gestorben**.', 'Sie stehen meist im **Perfekt** oder Präteritum.', 'Jahreszahlen: **1908** = neunzehnhundertacht, **2008** = zweitausendacht.', '**im Jahr 1908** oder einfach **1908** – ohne „in“!'] },
         { titel: 'Ein tabellarischer Lebenslauf', tabelle: { kopf: ['Teil', 'Beispiel'], zeilen: [['Name', 'Lina Becker'], ['Geburtstag / Ort', '3. Mai 2013, Ettelbrück'], ['Schule', 'seit 2025: Lycée in Junglinster'], ['Hobbys', 'Zeichnen, Erfinden'], ['Sprachen', 'Lux., Deutsch, Französisch']] } }],
        [{ art: 'tipp', titel: 'Wichtige Verben für Biografien', text: 'geboren sein · leben · wohnen · lernen · arbeiten · erfinden · gründen · heiraten · sterben (ist gestorben)' },
         { art: 'achtung', titel: 'Kein „in“ vor Jahreszahlen', text: 'Richtig: **1908** hat sie den Filter erfunden. Oder: **Im Jahr 1908** … Falsch: ~~In 1908~~.' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze die Biografie mit den Verben im Perfekt.', stufe: 1, woerter: ['ist geboren', 'hat gewohnt', 'hat erfunden', 'hat gegründet', 'ist gestorben'], saetze: ['Melitta Bentz [ist geboren|30] 1873.', 'Sie [hat gewohnt|30] in Dresden.', '1908 [hat|10] sie den Kaffeefilter [erfunden|22].', 'Dann [hat|10] sie eine Firma [gegründet|22].', 'Sie [ist gestorben|30] 1950.'] },
      { art: 'tabelle', auftrag: 'Schreib die Jahreszahlen in Wörtern.', stufe: 2, kopf: ['Zahl', 'in Wörtern'], breiten: [20, 80], zeilen: [['1849', '[achtzehnhundertneunundvierzig]'], ['1999', '[neunzehnhundertneunundneunzig]'], ['2013', '[zweitausenddreizehn]']] },
      { art: 'fragen', auftrag: 'Welche Erfindung findest du am wichtigsten? Warum?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Das Handy, weil man immer mit Freunden und Familie sprechen kann.' }] },
    ],
    schreibenNeueSeite: true,
    schreiben: [
      { art: 'frei', auftrag: 'Schreib deinen tabellarischen Lebenslauf. Du darfst auch eine ausgedachte Person nehmen.', stufe: 2,
        html: '<table class="raster"><colgroup><col style="width:32%"><col></colgroup><tr><th>Lebenslauf</th><th></th></tr>' + ['Name', 'Geburtstag', 'Geburtsort', 'Schule', 'Hobbys', 'Sprachen', 'Das kann ich gut', 'Mein Traumberuf'].map((x) => `<tr><td>${x}</td><td></td></tr>`).join('') + '</table>' },
      { art: 'schreiben', auftrag: 'Stell dir vor: Du erfindest etwas. Was ist das Problem? Was ist deine Idee? Wie funktioniert sie?', stufe: 3,
        anfaenge: ['Das Problem: …', 'Meine Idee: …', 'Zuerst habe ich …', 'Meine Erfindung …', 'Sie hilft …'], zeilen: 7,
        beispiel: 'Das Problem: Ich vergesse oft meine Schlüssel. Meine Idee: ein Schlüssel, der piept. Zuerst habe ich eine Skizze gezeichnet. Mein Schlüssel piept, wenn ich ohne ihn aus dem Haus gehe. Er hilft allen, die viel vergessen!' },
    ],
    check: ['Ich verstehe kurze Biografien.', 'Ich lese und schreibe Jahreszahlen.', 'Ich verstehe eine Präsentation über eine Erfindung.', 'Ich schreibe einen tabellarischen Lebenslauf.', 'Ich beschreibe eine eigene Idee.'],
  },
  // ================================================================ 8
  {
    thema: 'Personen beschreiben', titel: 'Wer ist es?', untertitel: 'Groß, lockige Haare, rotes Trikot: Du beschreibst, wie Menschen aussehen – und erkennst Wörter wie „ihm“ und „ihn“.',
    ziel: { de: 'Ich beschreibe das Aussehen von Personen und erkenne Pronomen wie ihm, ihr, ihn.', fr: 'Je décris l’apparence de personnes et je reconnais les pronoms ihm, ihr, ihn.' },
    bild: ['lio:froh:stehen', 'chloe:froh:stehen'],
    start: {
      was: 'Wörter zum Aussehen',
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was passt zusammen? Verbinde.', stufe: 1, links: ['die Haare', 'die Augen', 'die Größe', 'die Kleidung', 'das Gesicht'], rechts: ['kurz, lang, lockig, glatt', 'braun, blau, grün', 'groß, klein, mittelgroß', 'Trikot, Jacke, Mütze', 'rund, schmal, mit Bart'], ordnung: [2, 4, 0, 3, 1] },
      ],
    },
    lesen: {
      was: 'Personenraten', art: 'text', stimme: 'w1', nummern: true,
      quelle: 'Quiz-Seite · Sportfest der Schule', titel: 'Wer ist wer? – Vier Personen beim Sportfest',
      absaetze: [
        '**Person 1** ist groß und schlank. Sie trägt ein Kopftuch und ein grünes Trikot. Sie läuft beim 800-Meter-Lauf.',
        '**Person 2** ist mittelgroß. Er hat keine Haare auf dem Kopf, aber einen Bart. Er trägt eine dunkle Jacke und eine hellblaue Hose. Er ist der Trainer vom Basketballteam.',
        '**Person 3** sitzt im Rollstuhl. Sie hat blonde Haare mit einem Pony und trägt ein gestreiftes T-Shirt. Sie spielt Basketball und wirft sehr gut.',
        '**Person 4** hat eine Mütze auf dem Kopf. Er ist schlank und trägt ein schwarzes T-Shirt. Er macht beim Weitsprung mit und lacht immer.',
      ],
      woerter: [['schlank', 'mince'], ['das Kopftuch', 'le foulard'], ['das Trikot', 'le maillot'], ['der Bart', 'la barbe'], ['der Pony', 'la frange'], ['gestreift', 'rayé'], ['die Mütze', 'le bonnet'], ['der Weitsprung', 'le saut en longueur']],
      aufgaben: [
        { art: 'personen', auftrag: 'Wer ist wer? Schreib den Buchstaben neben die Person.', stufe: 1, bilder: ['lina:froh:stehen', 'lehrer:froh:stehen', 'nele:froh:rollstuhl', 'tom:froh:stehen'],
          saetze: [['Person 1 (800-Meter-Lauf)', 'A'], ['Person 2 (Trainer)', 'B'], ['Person 3 (Basketball)', 'C'], ['Person 4 (Weitsprung)', 'D']] },
        { art: 'fragen', auftrag: 'Wähle eine Person aus der Klasse oder einen Star. Beschreib sie in drei Sätzen. Die anderen raten.', stufe: 3, fragen: [{ f: '', zeilen: 3, l: 'Sie ist klein und hat lange, braune Haare. Sie trägt eine Brille. Heute hat sie einen roten Pullover an.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Durchsage beim Sportfest', wo: 'Sportplatz · Lautsprecher', titel: 'Wir suchen …',
      situation: 'Beim Sportfest kommt eine Durchsage. Ein Junge hat seine Gruppe verloren. Danach sprechen Ben und Lina.',
      bild: ['ben:verwirrt', 'lina:froh'], sprecher: { Durchsage: 'w1', Ben: 'm3', Lina: 'w2' },
      text: [
        ['Durchsage', 'Achtung, eine Durchsage! Wir suchen Max aus der Klasse 7P1. Max ist elf Jahre alt und ziemlich klein.'],
        ['Durchsage', 'Er hat kurze, hellbraune Haare. Er trägt ein hellblaues T-Shirt und eine schwarze Hose.'],
        ['Durchsage', 'Max, bitte komm zum Info-Zelt neben dem Eingang. Deine Lehrerin wartet dort auf dich. Danke!'],
        ['Ben', 'Lina, schau mal! Da drüben, bei der Wurstbude – das ist doch Max, oder?'],
        ['Lina', 'Hellbraune Haare, hellblaues T-Shirt … ja! Komm, wir sagen es ihm.'], ['Ben', 'Und dann bringen wir ihn zum Info-Zelt. Seine Lehrerin sucht ihn.'],
        ['Lina', 'Gute Idee. Ich rufe auch Frau Sommer an. Wir geben ihr Bescheid.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Wo hört man Durchsagen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['beim Sportfest', 'im Bahnhof', 'im Kino'], r: [0, 1] }] }],
      beim: [
        { art: 'personen', auftrag: 'Hör die Durchsage. Wer ist Max? Kreuze an: A, B oder C.', stufe: 1, bilder: ['finn:froh:stehen', 'noah:froh:stehen', 'lio:froh:stehen'], saetze: [['Max ist Person …', 'A']] },
        { art: 'tabelle', auftrag: 'Hör noch einmal. Ergänze den Steckbrief von Max.', stufe: 2, kopf: ['', 'Max'], breiten: [30, 70], zeilen: [['Alter', '[11 Jahre]'], ['Größe', '[ziemlich klein]'], ['Haare', '[kurz, hellbraun]'], ['Kleidung', '[hellblaues T-Shirt, schwarze Hose]'], ['Treffpunkt', '[Info-Zelt neben dem Eingang]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt „Wer ist es?“: A beschreibt eine Person aus dem Heft, B rät.', stufe: 3, karten: [
        { titel: 'A beschreibt', text: ['Die Person ist groß / klein.', 'Sie / Er hat … Haare.', 'Sie / Er trägt …', 'Sie / Er macht …'] },
        { titel: 'B fragt', text: ['Hat sie / er eine Brille?', 'Trägt sie / er eine Mütze?', 'Ist das …?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Aussehen beschreiben', punkte: ['Sie **ist** groß / klein / schlank.', 'Er **hat** kurze, rote Haare / blaue Augen.', 'Sie **trägt** eine Jacke / ein Trikot / eine Brille.', 'Er **hat** eine Mütze **auf**.'] },
         { titel: 'Pronomen erkennen', tabelle: { kopf: ['wer?', 'wen? (Akk.)', 'wem? (Dat.)'], zeilen: [['er (Max)', '**ihn**', '**ihm**'], ['sie (Lina)', '**sie**', '**ihr**'], ['sie (viele)', '**sie**', '**ihnen**']] } }],
        [{ art: 'tipp', titel: 'Beispiele aus dem Hörtext', punkte: ['Wir sagen es **ihm**. (Max → ihm)', 'Wir bringen **ihn** zum Zelt. (Max → ihn)', 'Wir geben **ihr** Bescheid. (Frau Sommer → ihr)'] },
         { art: 'achtung', titel: 'Erkennen reicht!', text: 'Du musst die Pronomen jetzt noch nicht immer richtig benutzen. Frag dich beim Lesen: **Wer ist gemeint?**' }],
      ],
    },
    ueben: [
      { art: 'luecken', auftrag: 'Ergänze: ist – hat – trägt.', stufe: 1, saetze: ['Lio [ist] schlank.', 'Er [hat] kurze, schwarze Haare.', 'Er [trägt] eine gestreifte Jacke.', 'Chloe [hat] eine Brille.', 'Sie [ist] mittelgroß.'] },
      { art: 'tabelle', auftrag: 'Wer ist gemeint? Schreib den Namen.', stufe: 2, kopf: ['Satz', 'gemeint ist …'], breiten: [65, 35], zeilen: [['Max hat seine Gruppe verloren. Wir helfen **ihm**.', '[Max]'], ['Frau Sommer wartet. Lina ruft **sie** an.', '[Frau Sommer]'], ['Das ist Nele. Gib **ihr** den Ball!', '[Nele]'], ['Wo ist Ben? Ich sehe **ihn** nicht.', '[Ben]']] },
      { art: 'fragen', auftrag: 'Beschreib eine Person aus einem Film oder einer Serie (Aussehen, Kleidung). Drei Sätze.', stufe: 3, fragen: [{ f: '', zeilen: 3, l: 'Er ist groß und hat lange, graue Haare. Er trägt einen langen, blauen Mantel. Er hat immer einen Stab in der Hand.' }] },
    ],
    schreibenNeueSeite: true,
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreib die Geschichte weiter. Benutze ein Wörterbuch für neue Wörter.', stufe: 2,
        hilfe: '„Es war der letzte Tag in Trier. Ben hat in den Kaiserthermen eine alte Münze gefunden. Sie war ganz grün und hatte ein Gesicht darauf. Plötzlich hat die Münze geleuchtet …“',
        anfaenge: ['Plötzlich …', 'Ben hat …', 'Dann ist … gekommen.', 'Am Ende …'], zeilen: 12,
        beispiel: 'Plötzlich hat die Münze gesprochen: „Hilf mir!“ Ben hat sie fallen lassen. Dann ist ein kleiner, alter Mann aus der Wand gekommen. Er hatte einen langen Bart und trug eine weiße Toga. „Ich bin ein Römer“, hat er gesagt. Ben hat die Münze zurückgegeben. Am Ende hat der Mann gelächelt und ist verschwunden.' },
    ],
    check: ['Ich beschreibe, wie eine Person aussieht.', 'Ich erkenne eine Person nach einer Beschreibung.', 'Ich verstehe eine Durchsage mit einer Personenbeschreibung.', 'Ich erkenne, wer mit ihm, ihr, ihn gemeint ist.', 'Ich schreibe eine Geschichte weiter.'],
  },
]

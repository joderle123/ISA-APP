// Atelier · Modul 3 (7P) „Sicher arbeiten“ – Enseignement pratique, Voie de préparation.
// Leitfaden VP: Die Kompetenz „respecte les consignes d’hygiène et de sécurité“ steht ausdrücklich in Modul 3 –
// darum hier Sicherheitszeichen, Schutzausrüstung, Gefahren erkennen, Erste Hilfe bei kleinen Verletzungen,
// Brandschutz und Strom in der Werkstatt. Erste Hilfe ersetzt keinen Kurs; Notruf 112.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { sicherheitsZeichen, stromkreis } from './praxis-bilder.mjs'

export const MODUL = sachModul('atelier', 3, {
  titel: 'Sicher arbeiten',
  titelFr: 'Travailler en sécurité',
  unter: 'Sicherheitszeichen lesen, die richtige Schutzausrüstung tragen, Gefahren erkennen, bei kleinen Verletzungen helfen, Brände verhindern und mit Strom sicher umgehen.',
  unterFr: 'Signalisation, équipement de protection, dangers, premiers secours, incendie, électricité.',
  farbe: '#d08a1e',
  deckbild: ['yusuf:froh:stehen', 'jana:froh:stehen-zeigen', 'finn:froh:stehen'],
  blasen: [{ t: 'Schutzbrille auf!', x: 8, y: 104 }, { t: 'Was heißt das Zeichen?', x: 112, y: 92 }, { t: '112!', x: 176, y: 150 }],
  aussprache: { '\\b230 V\\b': '230 Volt', '(\\d),5 V\\b': '\\1 Komma 5 Volt', '(\\d) V\\b': '\\1 Volt', '\\bFI-': 'Eff-I-', '\\bSTOP\\b': 'Stopp' },
  themen: [
    { titel: { de: 'Zeichen und Schutz', fr: 'Signes et protection' }, icon: 'helmet', lektionen: 2 },
    { titel: { de: 'Gefahren', fr: 'Dangers' }, icon: 'alert-triangle', lektionen: 2 },
    { titel: { de: 'Feuer und Strom', fr: 'Feu et électricité' }, icon: 'flame', lektionen: 2 },
  ],
})

const WARN = '#d08a1e', DILEMMA = '#6d4bc4', IDEE = '#2f8a6b', ROT = '#c0392b'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Sicherheitszeichen', titel: 'Zeichen, die warnen und schützen', untertitel: 'Blau, rot, gelb, grün: Sicherheitszeichen sprechen ohne Worte – überall auf der Welt. Du lernst ihre Farben und Formen, hörst eine Werkstatt-Führung und suchst Zeichen in deiner Schule.',
    ziel: { de: 'Ich erkenne Sicherheitszeichen an Farbe und Form und weiß, was sie bedeuten.', fr: 'Je reconnais les panneaux de sécurité à leur couleur et à leur forme et je sais ce qu’ils signifient.' },
    bild: ['jana:froh:zeigen', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Schon gesehen?',
      aufgaben: [
        { art: 'fragen', auftrag: 'Wo hast du schon grüne Schilder mit einem laufenden Männchen gesehen? Was bedeuten sie?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. in der Schule, im Kino, im Einkaufszentrum: Notausgang / Fluchtweg' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht, nach den Farben der internationalen Norm)', titel: 'Fünf Arten von Zeichen',
      absaetze: [
        'Sicherheitszeichen sieht man in Werkstätten, Schulen, Fabriken und Bahnhöfen. Sie sind auf der ganzen Welt **fast gleich**. So versteht man sie auch, wenn man die Sprache nicht spricht. Farbe und Form verraten schon viel.',
        '**Gebotszeichen** sind **rund und blau** mit einem weißen Bild. Sie sagen: **Das musst du tun!** Zum Beispiel: Schutzbrille tragen.',
        '**Verbotszeichen** sind **rund**, weiß mit **rotem Rand** und einem roten Querbalken. Sie sagen: **Das ist verboten!** Zum Beispiel: Feuer verboten.',
        '**Warnzeichen** sind **gelbe Dreiecke** mit schwarzem Rand. Sie sagen: **Achtung, Gefahr!** Zum Beispiel: Warnung vor Strom.',
        '**Rettungszeichen** sind **grüne Rechtecke**. Sie zeigen, wo es **Hilfe** gibt: Erste Hilfe, Notausgang, Sammelplatz.',
        '**Brandschutzzeichen** sind **rote Rechtecke**. Sie zeigen, wo ein **Feuerlöscher** oder ein Feuermelder hängt.',
      ],
      woerter: [['das Zeichen', 'le panneau, le signe'], ['das Gebot', 'l’obligation'], ['das Verbot', 'l’interdiction'], ['die Warnung', 'l’avertissement'], ['die Rettung', 'le sauvetage'], ['der Notausgang', 'la sortie de secours'], ['der Feuerlöscher', 'l’extincteur'], ['der Querbalken', 'la barre transversale']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Farbe und Form: Ergänze.', stufe: 1, kopf: ['Art', 'Form', 'Farbe', 'Bedeutung'], breiten: [24, 22, 22, 32], zeilen: [['Gebot', '[rund]', '[blau]', '[Das musst du tun.]'], ['Verbot', '[rund, Querbalken]', '[rot und weiß]', '[Das ist verboten.]'], ['Warnung', '[Dreieck]', '[gelb, schwarzer Rand]', '[Achtung, Gefahr!]'], ['Rettung', '[Rechteck]', '[grün]', '[Hier gibt es Hilfe.]'], ['Brandschutz', '[Rechteck]', '[rot]', '[Feuerlöscher, Feuermelder]']] },
      ],
    },
    hoeren: {
      was: 'Eine Führung', wo: 'Metallwerkstatt · erster Besuch', titel: 'Was sagen die Schilder?',
      situation: 'Herr Steffen führt die Klasse zum ersten Mal durch die Metallwerkstatt. Jana fragt nach den Schildern.',
      bild: ['lehrer:froh:zeigen', 'jana:aufgeregt:stehen'], sprecher: { 'Herr Steffen': 'm1', Jana: 'w2' },
      text: [
        ['Jana', 'Hier hängen ja überall Schilder! Was bedeutet das blaue mit der Brille?'],
        ['Herr Steffen', 'Blau und rund heißt: Das ist Pflicht. An dieser Schleifmaschine musst du immer eine Schutzbrille tragen. Funken und Metallsplitter fliegen sehr schnell.'],
        ['Jana', 'Und das gelbe Dreieck mit dem Blitz am Schrank?'],
        ['Herr Steffen', 'Warnung vor Strom. Das ist der Stromverteiler. Den öffne nur ich – oder ein Elektriker.'],
        ['Jana', 'Und das rote Schild da drüben?'],
        ['Herr Steffen', 'Ein rotes Rechteck zeigt den Feuerlöscher. Und das grüne über der Tür mit dem laufenden Männchen zeigt den Notausgang. Was steht davor?'],
        ['Jana', 'Ähm … ein Stapel Bretter.'],
        ['Herr Steffen', 'Genau. Und das darf nicht sein. Ein Notausgang muss immer frei bleiben. Hilfst du mir, die Bretter wegzuräumen?'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Funke? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein winziges glühendes Teilchen', 'ein kleiner Wassertropfen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welches Zeichen – wo – was bedeutet es?', stufe: 1, kopf: ['Zeichen', 'Wo?', 'Bedeutung'], breiten: [30, 30, 40], zeilen: [['blau, rund, Brille', '[an der Schleifmaschine]', '[Schutzbrille tragen ist Pflicht]'], ['gelbes Dreieck, Blitz', '[am Stromverteiler]', '[Warnung vor Strom]'], ['rotes Rechteck', '[am Feuerlöscher]', '[hier ist ein Feuerlöscher]'], ['grün, laufendes Männchen', '[über der Tür]', '[Notausgang]']] },
        { art: 'fragen', auftrag: 'Was war am Notausgang falsch?', stufe: 2, fragen: [{ f: '', l: 'Davor lag ein Stapel Bretter; ein Notausgang muss immer frei bleiben.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wo in eurer Schule gibt es Sicherheitszeichen? Sind alle Notausgänge frei?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Im Flur hängt …', 'In der Turnhalle …', 'Mir ist aufgefallen, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Formen und Farben', punkte: ['**blau, rund**: Gebot – musst du tun', '**rot, rund, Balken**: Verbot', '**gelbes Dreieck**: Warnung', '**grünes Rechteck**: Rettung', '**rotes Rechteck**: Brandschutz'] },
         { titel: 'Wichtig', punkte: ['Zeichen sind **weltweit** fast gleich', 'Notausgänge **immer frei**', 'Zeichen **nie** verdecken oder abreißen'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Was bedeuten diese Zeichen? Schreibe die Bedeutung auf die Linie.', stufe: 1, neueSeite: true, html: sicherheitsZeichen({ leer: true, spalten: 4 }) },
      { art: 'schneidekarten', auftrag: 'Zeichen-Detektive: Sucht in eurer Schule mindestens vier verschiedene Sicherheitszeichen. Notiert, wo sie hängen und was sie bedeuten.', stufe: 2, titel: 'Zeichen-Jagd', icon: 'search', farbe: WARN, spalten: 2,
        karten: [
          { text: '**Gebotszeichen** (blau, rund) – Wo? Was?', linien: 2 }, { text: '**Verbotszeichen** (rot, rund) – Wo? Was?', linien: 2 },
          { text: '**Warnzeichen** (gelb, Dreieck) – Wo? Was?', linien: 2 }, { text: '**Rettungs- oder Brandschutzzeichen** – Wo? Was?', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erfinde ein eigenes Sicherheitszeichen für einen Ort in deiner Schule (zum Beispiel: „Handy in der Werkstatt verboten“). Zeichne es und erkläre Farbe und Form.', stufe: 2,
        anfaenge: ['Mein Zeichen ist ein …', 'Die Farbe ist …, weil …', 'Es hängt …', 'Es bedeutet …'], zeilen: 6,
        beispiel: 'Mein Zeichen ist ein Verbotszeichen. Die Farbe ist rot und weiß, weil es etwas verbietet. Es zeigt ein Handy mit einem roten Querbalken. Es hängt an der Tür der Holzwerkstatt. Es bedeutet: In der Werkstatt bleibt das Handy in der Tasche.' },
    ],
    check: ['Ich erkenne fünf Arten von Sicherheitszeichen.', 'Ich weiß, was Farbe und Form bedeuten.', 'Ich weiß: Notausgänge bleiben frei.'],
  },
  // ================================================================ 2
  {
    thema: 'Persönliche Schutzausrüstung', titel: 'Gut geschützt', untertitel: 'Brille, Gehörschutz, Handschuhe, feste Schuhe: Für jede Arbeit gibt es den passenden Schutz. Du lernst, was du wann trägst – und warum Handschuhe an der Bohrmaschine gefährlich sind.',
    ziel: { de: 'Ich wähle die richtige Schutzausrüstung für eine Arbeit.', fr: 'Je choisis le bon équipement de protection pour un travail.' },
    bild: ['yusuf:froh:stehen', 'finn:verwirrt:stehen'],
    start: {
      was: 'Schutz im Alltag',
      aufgaben: [
        { art: 'mc', auftrag: 'Wo trägt man im Alltag Schutzausrüstung? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Helm beim Radfahren', 'Schienbeinschoner beim Fußball', 'Sonnenbrille im Sommer', 'Schwimmbrille beim Schwimmen', 'Hausschuhe'], r: [0, 1, 2, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Die richtige Ausrüstung',
      absaetze: [
        'In der Werkstatt schützt man den Körper mit **persönlicher Schutzausrüstung**. Welche man braucht, hängt von der Arbeit ab.',
        '**Schutzbrille:** beim Bohren, Schleifen, Sägen mit der Maschine und beim Arbeiten mit Chemikalien. Augen kann man nicht ersetzen.',
        '**Gehörschutz:** bei lauten Maschinen. Lärm macht das Gehör langsam und unbemerkt kaputt – und das heilt nicht mehr.',
        '**Handschuhe:** beim Arbeiten mit scharfen Blechen, heißen Teilen oder Chemikalien. **Aber Achtung:** An **Maschinen, die sich drehen** (Bohrmaschine, Drehbank), trägt man **keine Handschuhe**! Ein Handschuh kann sich verfangen und die ganze Hand mitreißen.',
        '**Staubmaske:** beim Schleifen, wenn viel feiner Staub entsteht.',
        '**Feste Schuhe:** schützen vor herunterfallenden Teilen. Sandalen und Flip-Flops sind tabu.',
        'Schutzausrüstung ist nicht „uncool“. Profis tragen sie jeden Tag – weil sie ihre Gesundheit für den Beruf brauchen.',
      ],
      woerter: [['die Schutzausrüstung', 'l’équipement de protection'], ['die Chemikalie', 'le produit chimique'], ['der Lärm', 'le bruit'], ['das Gehör', 'l’ouïe'], ['das Blech', 'la tôle'], ['sich drehen', 'tourner'], ['mitreißen', 'entraîner'], ['die Staubmaske', 'le masque anti-poussière']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was brauchst du? Kreuze an (manchmal mehrere).', stufe: 2, kopf: ['Arbeit', 'Brille', 'Gehörschutz', 'Handschuhe', 'Maske'], breiten: [40, 15, 15, 15, 15], zeilen: [['mit der Bohrmaschine bohren', '[x]', '', '', ''], ['scharfe Bleche tragen', '', '', '[x]', ''], ['mit der Schleifmaschine Holz schleifen', '[x]', '[x]', '', '[x]'], ['einen heißen Topf anfassen', '', '', '[x]', '']] },
        { art: 'fragen', auftrag: 'Warum trägt man an der Bohrmaschine keine Handschuhe?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Der Handschuh kann sich am drehenden Bohrer verfangen und die Hand mitreißen.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Metallwerkstatt', titel: 'Aber ich will meine Hände schützen!',
      situation: 'Finn will an der Bohrmaschine arbeiten und zieht Arbeitshandschuhe an. Yusuf hält ihn auf.',
      bild: ['finn:verwirrt:stehen', 'yusuf:besorgt:stehen'], sprecher: { Finn: 'm3', Yusuf: 'm2' },
      text: [
        ['Yusuf', 'Stopp, Finn! Zieh die Handschuhe aus!'],
        ['Finn', 'Warum? Ich will meine Hände schützen.'],
        ['Yusuf', 'An der Bohrmaschine nicht. Der Bohrer dreht sich ganz schnell. Wenn er den Stoff erwischt, wickelt er den Handschuh auf – mit deiner Hand drin.'],
        ['Finn', 'Echt? Das wusste ich nicht.'],
        ['Yusuf', 'Herr Steffen hat ein Video gezeigt, da hat sich eine Puppe mit Handschuh … na ja, das war nicht schön.'],
        ['Finn', 'Okay, okay. Und was brauche ich dann?'],
        ['Yusuf', 'Schutzbrille, Ärmel hochkrempeln, Werkstück mit der Zwinge festmachen. Und nie mit der Hand halten.'],
        ['Finn', 'Und wann trage ich Handschuhe?'],
        ['Yusuf', 'Wenn du die scharfen Bleche aus dem Regal holst. Da sind sie richtig.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „hochkrempeln“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Ärmel nach oben rollen', 'die Hose ausziehen'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Finn will an der Bohrmaschine Handschuhe tragen.', true], ['Yusuf findet das eine gute Idee.', false], ['An der Bohrmaschine braucht man eine Schutzbrille.', true], ['Das Werkstück hält man beim Bohren mit der Hand fest.', false], ['Bei scharfen Blechen sind Handschuhe richtig.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum tragen manche Jugendliche keine Schutzausrüstung, obwohl sie wissen, dass sie wichtig ist? Was könnte helfen?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Manche finden …', 'Vielleicht hilft …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Schutzausrüstung', punkte: ['**Brille**: Bohren, Schleifen, Chemikalien', '**Gehörschutz**: Lärm', '**Handschuhe**: scharfe Bleche, Hitze, Chemikalien', '**Staubmaske**: feiner Staub', '**feste Schuhe**: immer'] },
         { titel: 'Achtung!', punkte: ['**keine Handschuhe** an drehenden Maschinen', 'Ärmel **hochkrempeln**', 'Werkstück **einspannen**, nie mit der Hand halten'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Ausrüstungs-Spiel: Zieht eine Arbeitskarte. Welche Schutzausrüstung braucht ihr? Was dürft ihr auf keinen Fall tragen?', stufe: 2, neueSeite: true, titel: 'Was trage ich?', icon: 'helmet', farbe: WARN, spalten: 2,
        karten: [
          { text: 'Mit der Bohrmaschine ein Loch in ein Metallblech bohren.', linien: 2 },
          { text: 'Mit der Schleifmaschine einen Tisch abschleifen.', linien: 2 },
          { text: 'Scharfkantige Bleche ins Regal räumen.', linien: 2 },
          { text: 'Ein Holzstück mit Lack streichen.', linien: 2 },
          { text: 'Ein heißes Blech aus dem Ofen holen.', linien: 2 },
          { text: 'Mit der Stichsäge ein Brett zuschneiden.', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine kurze Nachricht an einen Freund, der beim Arbeiten nie eine Schutzbrille trägt, „weil sie doof aussieht“. Überzeuge ihn.', stufe: 3,
        anfaenge: ['Hey …,', 'ich weiß, die Brille …', 'Aber …', 'Bitte …'], zeilen: 6,
        beispiel: 'Hey Ben, ich weiß, die Brille sieht nicht super aus. Aber ein Metallsplitter im Auge ist viel schlimmer als ein komisches Foto. Augen kann man nicht ersetzen. Profis in der Werkstatt tragen sie auch jeden Tag. Bitte setz sie auf – mir zuliebe.' },
    ],
    check: ['Ich nenne fünf Teile der Schutzausrüstung.', 'Ich wähle den richtigen Schutz für eine Arbeit.', 'Ich weiß: keine Handschuhe an drehenden Maschinen.'],
  },
  // ================================================================ 3
  {
    thema: 'Gefahren erkennen · Ordnung', titel: 'Gefahren-Detektive', untertitel: 'Unfälle passieren oft wegen Kleinigkeiten: ein Kabel auf dem Boden, ein offenes Messer, eine nasse Stelle. Du lernst, Gefahren zu erkennen, bevor etwas passiert, und machst einen Gefahren-Rundgang.',
    ziel: { de: 'Ich erkenne Gefahren am Arbeitsplatz und schlage vor, wie man sie beseitigt.', fr: 'Je repère les dangers au poste de travail et je propose des solutions pour les éliminer.' },
    bild: ['jana:froh:handy', 'noah:verwirrt:stehen'],
    start: {
      was: 'Was kann passieren?',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Was kann in einer Werkstatt oder Küche gefährlich sein? Sammle.', stufe: 1, mitte: 'Gefahren', aeste: ['Kabel auf dem Boden', { l: 'scharfe Kanten' }, { l: 'heiße Flächen' }, { l: 'nasser Boden' }, { l: 'Lärm' }, { l: 'Chemikalien' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Erst sehen, dann handeln',
      absaetze: [
        'Die meisten Unfälle in Werkstätten und Küchen sind **keine Katastrophen**, sondern Stolpern, Schneiden, Verbrennen, Quetschen. Und fast alle hätte man **verhindern** können.',
        '### Typische Gefahren',
        '**Stolperfallen**: Kabel, Bretter oder Taschen auf dem Boden. **Rutschgefahr**: nasse oder ölige Stellen. **Scharfe Kanten**: Bleche, Messer, Glasscherben. **Hitze**: Herdplatten, Lötkolben, frisch geschweißte Teile. **Chemikalien**: Lacke, Kleber, Putzmittel (achte auf die Gefahrensymbole!). **Lärm und Staub**.',
        '### Die STOP-Reihenfolge',
        'Profis gehen so vor: Zuerst versucht man, die Gefahr **ganz zu beseitigen** (Kabel wegräumen). Wenn das nicht geht, wird sie **technisch** abgesichert (Schutzgitter an der Maschine). Dann kommen **Regeln** (nur mit Erlaubnis an die Maschine). Und zum Schluss die **persönliche Schutzausrüstung**. Die Anfangsbuchstaben helfen beim Merken: **S** wie Sache beseitigen, **T** wie Technik, **O** wie Organisation, also Regeln, **P** wie persönliche Schutzausrüstung.',
        '### Melden ist stark',
        'Wer eine Gefahr sieht, beseitigt sie, wenn es ungefährlich geht – oder **meldet** sie sofort der Lehrperson. Das ist kein Petzen, sondern Verantwortung.',
      ],
      woerter: [['die Gefahr', 'le danger'], ['der Unfall', 'l’accident'], ['verhindern', 'empêcher'], ['die Stolperfalle', 'le risque de trébucher'], ['rutschig', 'glissant'], ['die Scherbe', 'le tesson'], ['beseitigen', 'éliminer'], ['das Schutzgitter', 'la grille de protection']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Die STOP-Reihenfolge: Was kommt zuerst?', stufe: 2, teile: ['Gefahr ganz beseitigen', 'technisch absichern', 'Regeln aufstellen', 'Schutzausrüstung tragen'], ordnung: [2, 0, 3, 1] },
        { art: 'zuordnen', auftrag: 'Welche Gefahr – welche Lösung? Verbinde.', stufe: 1, links: ['Kabel quer über dem Gang', 'Öl auf dem Boden', 'Glasscherbe auf der Werkbank', 'offener Lackeimer'], rechts: ['Kabel an der Wand entlang legen', 'sofort aufwischen, Schild aufstellen', 'mit Handfeger und Schaufel entsorgen', 'Deckel drauf, an einen gut belüfteten Ort'] },
      ],
    },
    hoeren: {
      was: 'Ein Rundgang', wo: 'Werkstatt · Gefahren-Rundgang', titel: 'Wir finden alles!',
      situation: 'Jana und Noah machen mit einem Klemmbrett einen Gefahren-Rundgang durch die Werkstatt.',
      bild: ['jana:froh:blatt', 'noah:verwirrt:stehen'], sprecher: { Jana: 'w2', Noah: 'm3' },
      text: [
        ['Jana', 'Okay, Gefahr Nummer eins: Das Kabel von der Schleifmaschine liegt quer über dem Gang. Da stolpert jemand.'],
        ['Noah', 'Ich lege es an der Wand entlang. Erledigt. Nummer zwei?'],
        ['Jana', 'Da steht eine offene Dose mit Holzleim. Wenn die umfällt …'],
        ['Noah', 'Deckel drauf, ins Regal. Was ist mit der Säge da auf der Werkbank? Die Zähne zeigen nach außen.'],
        ['Jana', 'Gut gesehen! Die hängen wir an die Werkzeugwand.'],
        ['Noah', 'Und hier: Der Schutz an der Bandsäge ist hochgeklappt.'],
        ['Jana', 'Das fassen wir nicht an. Das melden wir Herrn Steffen. An Maschinen dürfen wir nichts verändern.'],
        ['Noah', 'Stimmt. Vier Gefahren, drei erledigt, eine gemeldet. Nicht schlecht für zehn Minuten.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Klemmbrett? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine feste Unterlage mit Klammer zum Schreiben', 'ein Brett zum Sägen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Gefahren finden Jana und Noah? Was tun sie?', stufe: 1, kopf: ['Gefahr', 'Was tun sie?'], breiten: [50, 50], zeilen: [['[Kabel quer über dem Gang]', '[an der Wand entlang legen]'], ['[offene Dose Holzleim]', '[Deckel drauf, ins Regal]'], ['[Säge mit Zähnen nach außen auf der Werkbank]', '[an die Werkzeugwand hängen]'], ['[Schutz an der Bandsäge hochgeklappt]', '[nicht anfassen, Herrn Steffen melden]']] },
        { art: 'fragen', auftrag: 'Warum beseitigen sie die letzte Gefahr nicht selbst?', stufe: 2, fragen: [{ f: '', l: 'An Maschinen dürfen Schüler nichts verändern; das macht die Lehrperson.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Gefahr darf man selbst beseitigen, welche muss man melden? Wo ist die Grenze?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Selbst machen kann ich …', 'Melden muss ich, wenn …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Typische Gefahren', punkte: ['**Stolpern**, **Rutschen**', '**scharfe Kanten**', '**Hitze**', '**Chemikalien**', '**Lärm** und **Staub**'] },
         { titel: 'STOP-Reihenfolge', nummern: true, punkte: ['Gefahr **beseitigen**', '**technisch** absichern', '**Regeln**', '**Schutzausrüstung**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Gefahren-Rundgang: Nehmt die Karten mit in eure Werkstatt oder Küche. Notiert jede Gefahr und was ihr getan habt. Gefahren an Maschinen meldet ihr nur!', stufe: 2, neueSeite: true, titel: 'Gefahr gefunden!', icon: 'alert-triangle', farbe: ROT, spalten: 2,
        karten: [
          { text: '**Gefahr 1** – Wo? Was?', linien: 2, frage: 'beseitigt ☐ gemeldet ☐' }, { text: '**Gefahr 2** – Wo? Was?', linien: 2, frage: 'beseitigt ☐ gemeldet ☐' },
          { text: '**Gefahr 3** – Wo? Was?', linien: 2, frage: 'beseitigt ☐ gemeldet ☐' }, { text: '**Gefahr 4** – Wo? Was?', linien: 2, frage: 'beseitigt ☐ gemeldet ☐' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Bericht über euren Gefahren-Rundgang an die Lehrperson.', stufe: 2,
        anfaenge: ['Am … haben wir einen Rundgang gemacht.', 'Wir haben … Gefahren gefunden.', 'Beseitigt haben wir …', 'Melden möchten wir …'], zeilen: 7,
        beispiel: 'Am Montag haben wir einen Rundgang durch die Holzwerkstatt gemacht. Wir haben vier Gefahren gefunden. Beseitigt haben wir ein Kabel im Gang, eine offene Leimdose und eine Säge auf der Werkbank. Melden möchten wir, dass der Schutz an der Bandsäge hochgeklappt war.' },
    ],
    check: ['Ich erkenne typische Gefahren.', 'Ich kenne die STOP-Reihenfolge.', 'Ich weiß, was ich selbst beseitigen darf und was ich melde.'],
  },
  // ================================================================ 4
  {
    thema: 'Erste Hilfe bei kleinen Verletzungen', titel: 'Kleine Verletzung – richtig reagieren', untertitel: 'Ein Schnitt, ein Splitter, eine Verbrennung: Du lernst, was du bei kleinen Verletzungen in Werkstatt und Küche tust, und hörst, wie Lea nach einem Unfall richtig geholfen hat.',
    ziel: { de: 'Ich helfe bei kleinen Verletzungen richtig und weiß, wann ich Hilfe hole.', fr: 'Je réagis correctement aux petites blessures et je sais quand appeler à l’aide.' },
    bild: ['lea:besorgt:stehen', 'lehrerin:ruhig:erklaeren'],
    start: {
      was: 'Was tust du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Du hast dich an der Herdplatte verbrannt. Was machst du zuerst? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Die Stelle unter kühles fließendes Wasser halten.', 'Butter oder Zahnpasta darauf.', 'Eis direkt auf die Haut.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Eine Übersicht', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Erste Hilfe (vereinfacht) – ersetzt keinen Erste-Hilfe-Kurs', titel: 'Erste Hilfe in Werkstatt und Küche',
      absaetze: [
        'Bei jeder Verletzung gilt: **Ruhe bewahren**, die Lehrperson **informieren**, bei schweren Verletzungen **112** rufen. Wer anderen hilft, trägt möglichst **Einmalhandschuhe**.',
        '**Schnitt:** Die Wunde unter klarem Wasser ausspülen. Ein Pflaster oder einen Verband darauf. Wenn es stark blutet: mit einem sauberen Tuch fest **draufdrücken**, Arm hochhalten, Hilfe holen.',
        '**Verbrennung:** Sofort **10 bis 20 Minuten** unter **kühles** (nicht eiskaltes) fließendes Wasser halten. Keine Butter, kein Mehl, keine Zahnpasta. Blasen nicht aufstechen. Große Verbrennungen: 112.',
        '**Splitter:** Mit einer sauberen Pinzette herausziehen – in die Richtung, aus der er gekommen ist –, dann desinfizieren. Tiefe Splitter oder Splitter unter dem Nagel: zur Ärztin.',
        '**Etwas im Auge:** **Nicht reiben!** Mit der Augenspülflasche oder klarem Wasser ausspülen. Bei Chemikalien: sofort mindestens 10 Minuten spülen, dann zum Arzt. Bei Metallsplittern: nicht selbst herausholen, Auge nicht berühren, sofort zum Arzt.',
        '**Quetschung oder Prellung:** Kühlen (ein Kühlpack in einem Tuch, nie direkt auf die Haut), hochlagern.',
      ],
      woerter: [['die Wunde', 'la plaie'], ['ausspülen', 'rincer'], ['der Verband', 'le pansement'], ['die Verbrennung', 'la brûlure'], ['die Blase', 'l’ampoule, la cloque'], ['die Pinzette', 'la pince à épiler'], ['desinfizieren', 'désinfecter'], ['die Prellung', 'la contusion']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was tust du? Verbinde.', stufe: 1, links: ['kleiner Schnitt', 'Verbrennung', 'Holzsplitter', 'Staub im Auge', 'Finger eingequetscht'], rechts: ['ausspülen, Pflaster', '10–20 Minuten kühles Wasser', 'mit Pinzette herausziehen, desinfizieren', 'nicht reiben, ausspülen', 'kühlen mit Kühlpack im Tuch'] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Auf eine Verbrennung gehört Butter.', false], ['Blasen sticht man nicht auf.', true], ['Bei einem Metallsplitter im Auge geht man zum Arzt.', true], ['Ein Kühlpack legt man direkt auf die Haut.', false]] },
      ],
    },
    hoeren: {
      was: 'Ein Bericht', wo: 'Lehrküche · nach einem Unfall', titel: 'Lea hilft',
      situation: 'Beim Kochen hat sich Ben an einem heißen Topf verbrannt. Lea erzählt der Lehrerin, was sie gemacht hat.',
      bild: ['lea:ruhig:erklaeren', 'lehrerin:ruhig:stehen'], sprecher: { Lehrerin: 'w1', Lea: 'w3' },
      text: [
        ['Lehrerin', 'Lea, erzähl bitte genau, was passiert ist.'],
        ['Lea', 'Ben wollte den Topf vom Herd nehmen, ohne Topflappen. Er hat sich den Handrücken verbrannt und laut geschrien.'],
        ['Lehrerin', 'Und dann?'],
        ['Lea', 'Ich habe zuerst den Herd ausgeschaltet, damit nichts anbrennt. Dann habe ich ihn zum Waschbecken gebracht und seine Hand unter kühles Wasser gehalten. Nicht eiskalt.'],
        ['Lehrerin', 'Wie lange?'],
        ['Lea', 'Ich habe auf die Uhr geschaut: fünfzehn Minuten. Noah hat Sie in der Zwischenzeit geholt.'],
        ['Lehrerin', 'Sehr gut. Und Ben wollte Zahnpasta drauf, habe ich gehört?'],
        ['Lea', 'Ja, das hat seine Oma immer gemacht. Aber wir haben gelernt, dass man das nicht macht.'],
        ['Lehrerin', 'Richtig. Du hast ruhig und genau richtig reagiert. Die Haut ist nur rot, keine Blasen. Ben braucht jetzt nur noch eine Pause. Wir schauen später noch einmal nach der Haut.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Topflappen? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein dicker Stoff, mit dem man heiße Töpfe anfasst', 'ein Putzlappen'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne, was Lea getan hat.', stufe: 1, teile: ['Herd ausgeschaltet', 'Ben zum Waschbecken gebracht', 'Hand 15 Minuten unter kühles Wasser gehalten', 'der Lehrerin alles erzählt'], ordnung: [2, 0, 3, 1] },
        { art: 'fragen', auftrag: 'Was hat Lea nicht gemacht, obwohl Ben es wollte? Warum?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Keine Zahnpasta auf die Verbrennung; das macht man nicht, nur kühles Wasser hilft.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Tipps gegen Verbrennungen habt ihr schon gehört? Was sagt die Erste Hilfe dazu? Was hilft wirklich?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Manche sagen …', 'Richtig ist …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Immer', punkte: ['**Ruhe** bewahren', 'Lehrperson **informieren**', 'schwere Verletzung: **112**', 'beim Helfen **Einmalhandschuhe**'] },
         { titel: 'Kurz und knapp', punkte: ['**Schnitt**: spülen, Pflaster – stark blutend: drücken', '**Verbrennung**: 10–20 min kühles Wasser', '**Splitter**: Pinzette, desinfizieren', '**Auge**: nicht reiben, spülen', '**Quetschung**: kühlen, hochlagern'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Erste-Hilfe-Übung: Zieht eine Karte. Eine Person spielt die verletzte Person, eine hilft, eine beobachtet mit der Checkliste aus „Gut zu wissen“.', stufe: 3, neueSeite: true, titel: 'Was tust du?', icon: 'first-aid-kit', farbe: ROT, spalten: 2, typ: 'dilemma',
        karten: [
          { text: 'Mia hat sich beim Gemüseschneiden in den Finger geschnitten. Es blutet ein bisschen.' },
          { text: 'Tom hat sich einen großen Holzsplitter in den Daumen gerammt.' },
          { text: 'Sami hat beim Schleifen Staub ins Auge bekommen und reibt.' },
          { text: 'Lina hat sich an der heißen Pfanne verbrannt. Es ist eine kleine Blase entstanden.' },
          { text: 'Finn hat sich den Finger in der Schraubzwinge eingequetscht.' },
          { text: 'Noah hat sich tief geschnitten. Es blutet sehr stark.' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Unfallbericht für eine der Karten: Was ist passiert? Was wurde getan? Was lernen wir daraus?', stufe: 2,
        anfaenge: ['Am … um … Uhr ist … passiert:', 'Erste Hilfe: …', 'Die Lehrperson …', 'Damit es nicht wieder passiert, …'], zeilen: 7,
        beispiel: 'Am Dienstag um 10 Uhr ist Mia beim Schneiden einer Karotte abgerutscht und hat sich in den Zeigefinger geschnitten. Erste Hilfe: Wunde unter Wasser ausgespült, Pflaster draufgeklebt. Die Lehrperson wurde sofort informiert. Damit es nicht wieder passiert, üben wir den Krallengriff noch einmal und legen ein feuchtes Tuch unter das Brett.' },
    ],
    check: ['Ich weiß, was ich bei Schnitt, Verbrennung und Splitter tue.', 'Ich weiß, wann ich 112 rufe.', 'Ich kenne falsche Hausmittel.'],
  },
  // ================================================================ 5
  {
    thema: 'Brandschutz · Feuerlöscher · Fluchtweg', titel: 'Wenn es brennt', untertitel: 'Feuer braucht drei Dinge. Nimm eins weg, und es geht aus. Du lernst das Feuer-Dreieck, warum man Fett nie mit Wasser löscht, wie ein Feuerlöscher funktioniert und was beim Feueralarm passiert.',
    ziel: { de: 'Ich erkläre, wie Brände entstehen und gelöscht werden, und verhalte mich beim Alarm richtig.', fr: 'J’explique comment un feu naît et s’éteint et je réagis correctement en cas d’alarme.' },
    bild: ['finn:ueberrascht:stehen', 'lehrer:ruhig:erklaeren'],
    start: {
      was: 'Feueralarm',
      aufgaben: [
        { art: 'mc', auftrag: 'Der Feueralarm geht los. Was machst du? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ruhig mit der Klasse zum Sammelplatz gehen.', 'Zuerst meine Sachen und das Handy suchen.', 'Mit dem Aufzug nach unten fahren.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Brandschutz (vereinfacht)', titel: 'Das Feuer-Dreieck',
      absaetze: [
        'Ein Feuer braucht **drei Dinge**: etwas, das brennt (**Brennstoff**, z. B. Holz, Papier, Öl), **Sauerstoff** aus der Luft und **Hitze**. Das nennt man das **Feuer-Dreieck**. Fehlt eine Seite, geht das Feuer aus.',
        '### Löschen',
        'Wasser **kühlt** – es nimmt die Hitze weg. Eine Decke oder ein Deckel **erstickt** das Feuer – sie nehmen den Sauerstoff weg. **Aber:** Brennendes **Fett oder Öl** (zum Beispiel in einer Pfanne) **nie mit Wasser** löschen! Das Wasser verdampft blitzartig und schleudert brennendes Fett nach oben – eine Stichflamme. Richtig: Herd aus, **Deckel drauf**.',
        '### Der Feuerlöscher',
        'Kleine Brände kann man mit einem Feuerlöscher löschen – **aber nur, wenn man sich nicht in Gefahr bringt**. Sicherung ziehen, auf die **Glut** zielen (nicht in die Flammen), in **kurzen Stößen** löschen.',
        '### Beim Feueralarm',
        'Ruhig bleiben. Fenster und Türen schließen, aber nicht abschließen. Den **Fluchtweg** nehmen – **nie den Aufzug**. Zum **Sammelplatz** gehen und dort bleiben, damit gezählt werden kann. Wer ein Feuer entdeckt: Alarm auslösen und **112** rufen.',
      ],
      woerter: [['der Brennstoff', 'le combustible'], ['der Sauerstoff', 'l’oxygène'], ['löschen', 'éteindre'], ['ersticken', 'étouffer'], ['die Stichflamme', 'la flamme soudaine'], ['die Glut', 'la braise'], ['der Fluchtweg', 'la voie d’évacuation'], ['der Sammelplatz', 'le point de rassemblement']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Welche drei Dinge braucht ein Feuer?', l: 'Brennstoff, Sauerstoff, Hitze' }, { f: 'Warum löscht man Fett nie mit Wasser?', zeilen: 2, l: 'Das Wasser verdampft blitzartig und schleudert brennendes Fett nach oben (Stichflamme).' }, { f: 'Warum nimmt man beim Feueralarm nie den Aufzug?', zeilen: 2, l: 'Er kann stecken bleiben oder sich mit Rauch füllen; der Strom kann ausfallen.' }] },
        { art: 'zuordnen', auftrag: 'Was nimmt dem Feuer welche Seite weg? Verbinde.', stufe: 2, links: ['Wasser auf brennendes Papier', 'Deckel auf die Pfanne', 'Holz aus dem Lagerfeuer nehmen'], rechts: ['Hitze', 'Sauerstoff', 'Brennstoff'] },
      ],
    },
    hoeren: {
      was: 'Eine Ansage und ein Gespräch', wo: 'Schule · Probealarm', titel: 'Probealarm!',
      situation: 'Mitten in der Werkstattstunde gibt es einen Probealarm. Danach spricht Herr Steffen mit der Klasse.',
      bild: ['lehrer:ruhig:erklaeren', 'finn:verlegen:stehen'], sprecher: { 'Herr Steffen': 'm1', Finn: 'm3' },
      text: [
        ['Herr Steffen', 'Alarm! Maschinen aus, alles liegen lassen. Wir gehen ruhig hinaus – Fluchtweg rechts, Treppe B. Ich schließe die Tür.'],
        ['Herr Steffen', 'So, alle am Sammelplatz. Ich zähle: … neunzehn, zwanzig. Wo ist Finn?'],
        ['Finn', 'Hier! Ich bin noch schnell zurück, mein Handy holen.'],
        ['Herr Steffen', 'Finn, das war gefährlich. Bei einem echten Feuer kann der Flur in einer Minute voller Rauch sein. Ein Handy kann man ersetzen, dich nicht.'],
        ['Finn', 'Sorry. Daran habe ich nicht gedacht.'],
        ['Herr Steffen', 'Und noch etwas: Ich habe zwanzig gezählt, aber mir fehlte einer. Die Feuerwehr hätte dich im Gebäude gesucht – und sich selbst in Gefahr gebracht.'],
        ['Finn', 'Okay. Beim nächsten Mal bleibt alles liegen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Probealarm? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Übungsalarm ohne echtes Feuer', 'ein echter Brand'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Beim Alarm werden die Maschinen ausgeschaltet.', true], ['Die Klasse nimmt den Aufzug.', false], ['Finn ist zurückgegangen, um sein Handy zu holen.', true], ['Herr Steffen findet das nicht schlimm.', false]] },
        { art: 'fragen', auftrag: 'Nenne zwei Gründe, warum Finns Verhalten gefährlich war.', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Der Flur kann schnell voller Rauch sein; die Feuerwehr hätte ihn gesucht und sich selbst in Gefahr gebracht.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Kennt ihr den Fluchtweg und den Sammelplatz von eurem Klassenzimmer und eurer Werkstatt?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Aus unserem Raum gehen wir …', 'Der Sammelplatz ist …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Feuer', punkte: ['**Feuer-Dreieck**: Brennstoff, Sauerstoff, Hitze', '**Fettbrand**: nie Wasser – Herd aus, **Deckel** drauf', '**Feuerlöscher**: auf die Glut, kurze Stöße – nur ohne eigene Gefahr'] },
         { titel: 'Feueralarm', nummern: true, punkte: ['**alles liegen** lassen', 'Türen **schließen**', '**Fluchtweg**, nie Aufzug', '**Sammelplatz**, dort bleiben', 'Feuer entdeckt? Alarm + **112**'] }],
      ],
    },
    ueben: [
      { art: 'dilemma', auftrag: 'Was würdest du tun? Denk über alle Möglichkeiten nach.', stufe: 3,
        geschichte: ['In der Lehrküche fängt das Öl in einer Pfanne Feuer. Die Flammen sind schon 30 cm hoch. Die Lehrerin ist kurz im Nebenraum. Amira greift nach einem Glas Wasser.'],
        frage: 'Was tust du?',
        optionen: ['Ich lasse Amira das Wasser hineinschütten – schnell löschen ist wichtig.', 'Ich rufe „Kein Wasser!“, schalte den Herd aus und lege den Deckel auf die Pfanne.', 'Ich rufe laut die Lehrerin und bringe alle aus der Küche, wenn das Feuer größer wird.'],
        hinweis: 'A ist sehr gefährlich (Stichflamme). B ist richtig, wenn man es ohne Gefahr schafft. C ist immer richtig: Hilfe holen und sich in Sicherheit bringen.' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Zeichne einen einfachen Plan von deiner Werkstatt oder deinem Klassenzimmer mit Fluchtweg, Feuerlöscher und Sammelplatz. Beschreibe den Weg in Sätzen.', stufe: 2,
        anfaenge: ['Wenn der Alarm losgeht, …', 'Dann …', 'Der Feuerlöscher hängt …', 'Der Sammelplatz ist …'], zeilen: 7,
        beispiel: 'Wenn der Alarm losgeht, lassen wir alles liegen und gehen zur Tür. Dann gehen wir nach rechts zur Treppe B und hinunter auf den Hof. Der Feuerlöscher hängt neben der Tür, unter dem roten Schild. Der Sammelplatz ist vor der Turnhalle, beim großen Baum.' },
    ],
    check: ['Ich erkläre das Feuer-Dreieck.', 'Ich weiß, warum man Fett nie mit Wasser löscht.', 'Ich kenne Fluchtweg und Sammelplatz.'],
  },
  // ================================================================ 6
  {
    thema: 'Strom in der Werkstatt · Elektrowerkzeuge', titel: 'Strom – aber sicher', untertitel: 'Aus der Steckdose kommen 230 Volt – das kann tödlich sein. Du lernst die Regeln für Elektrowerkzeuge, liest einen einfachen Schaltplan und prüfst Geräte vor der Arbeit.',
    ziel: { de: 'Ich gehe sicher mit Elektrowerkzeugen um und lese einen einfachen Schaltplan.', fr: 'J’utilise les outils électriques en sécurité et je lis un schéma électrique simple.' },
    bild: ['chloe:froh:stehen', 'tom:froh:zeigen'],
    start: {
      was: 'Gefährlich oder nicht?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Ist das gefährlich? Kreuze an.', stufe: 1, kopf: ['', 'gefährlich', 'ungefährlich'], breiten: [60, 20, 20], zeilen: [['eine 4,5-Volt-Batterie mit den Fingern berühren', '', '[x]'], ['mit nassen Händen einen Stecker einstecken', '[x]', ''], ['ein Kabel mit kaputter Hülle benutzen', '[x]', ''], ['den Stecker am Stecker aus der Dose ziehen', '', '[x]']] },
      ],
    },
    lesen: {
      was: 'Regeln', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sicherheitsregeln (vereinfacht)', titel: 'Fünf Regeln für Elektrowerkzeuge',
      absaetze: [
        'Batterien mit 1,5 V, 4,5 V oder 9 V sind für den Körper **ungefährlich**. Aber aus der Steckdose kommen **230 Volt**. Wenn dieser Strom durch den Körper fließt, kann das Herz aus dem Takt kommen. Darum gelten bei Elektrowerkzeugen strenge Regeln.',
        '**Prüfen:** Vor jeder Arbeit Kabel und Stecker ansehen. Ist die Hülle kaputt? Ist der Stecker locker? Dann das Gerät **nicht benutzen** und melden.',
        '**Trocken:** Nie mit nassen Händen oder in der Nähe von Wasser mit Elektrogeräten arbeiten.',
        '**Stecker ziehen:** Bevor man den Bohrer oder das Sägeblatt wechselt, immer den **Stecker ziehen**. Und zwar am **Stecker**, nicht am Kabel.',
        '**Kabel führen:** Das Kabel so legen, dass man nicht darüber stolpert und es nicht durchschneidet. Kabeltrommeln ganz abrollen, sonst werden sie heiß.',
        '**Nie öffnen:** Ein Gerät oder eine Steckdose öffnen nur Elektrikerinnen und Elektriker. Viele Steckdosen sind durch einen **FI-Schalter** geschützt, der bei einem Fehler den Strom blitzschnell abschaltet.',
      ],
      woerter: [['der Strom', 'le courant'], ['die Steckdose', 'la prise'], ['der Stecker', 'la fiche'], ['das Kabel', 'le câble'], ['die Hülle', 'la gaine'], ['locker', 'desserré'], ['das Sägeblatt', 'la lame de scie'], ['die Kabeltrommel', 'l’enrouleur']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welche Regel passt? Verbinde.', stufe: 1, links: ['Das Kabel der Stichsäge hat einen Riss.', 'Tom will den Bohrer wechseln.', 'Die Kabeltrommel ist noch halb aufgerollt.', 'Mia hat sich gerade die Hände gewaschen.'], rechts: ['Gerät nicht benutzen, melden.', 'Zuerst den Stecker ziehen.', 'Ganz abrollen.', 'Erst gut abtrocknen.'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Werkstatt · Bohrmaschine', titel: 'Der Geräte-Check',
      situation: 'Chloé will mit der Bohrmaschine arbeiten. Tom macht mit ihr den Geräte-Check, den sie gelernt haben.',
      bild: ['chloe:froh:stehen', 'tom:froh:zeigen'], sprecher: { Tom: 'm3', 'Chloé': 'w3' },
      text: [
        ['Tom', 'Vor dem Bohren: Geräte-Check. Erstens: Kabel?'],
        ['Chloé', 'Ich fahre mit den Augen das ganze Kabel entlang. Keine Risse, keine blanken Drähte. Okay.'],
        ['Tom', 'Zweitens: Stecker?'],
        ['Chloé', 'Sitzt fest, nichts gebrochen. Okay.'],
        ['Tom', 'Drittens: Bohrer fest?'],
        ['Chloé', 'Stecker ist noch draußen, ich ziehe das Bohrfutter fest. Okay.'],
        ['Tom', 'Viertens: Werkstück?'],
        ['Chloé', 'Mit der Zwinge festgemacht. Fünftens: Schutzbrille auf, Haare zusammen, keine Handschuhe.'],
        ['Tom', 'Und das Kabel?'],
        ['Chloé', 'Liegt hinter mir, nicht vor dem Bohrer. Jetzt Stecker rein – und los.'],
        ['Tom', 'Perfekt. Das hat dreißig Sekunden gedauert.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein „blanker Draht“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Draht ohne Schutzhülle, man sieht das Metall', 'ein sehr dünner Draht'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne den Geräte-Check.', stufe: 1, teile: ['Kabel prüfen', 'Stecker prüfen', 'Bohrer festziehen (Stecker draußen)', 'Werkstück einspannen', 'Brille, Haare, keine Handschuhe', 'Stecker einstecken'], ordnung: [4, 1, 5, 0, 3, 2] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Tom sagt: „Das hat dreißig Sekunden gedauert.“ Warum lohnt sich der Check trotzdem jedes Mal?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Weil …', 'Wenn man ihn vergisst, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Strom', punkte: ['Batterie (1,5–9 V): **ungefährlich**', 'Steckdose (**230 V**): **lebensgefährlich**', '**FI-Schalter** schaltet bei Fehlern ab', 'öffnen nur **Elektriker**'] },
         { titel: 'Geräte-Check', nummern: true, punkte: ['**Kabel** prüfen', '**Stecker** prüfen', 'Werkzeug wechseln: **Stecker raus**', 'Werkstück **einspannen**', 'Kabel **hinter** dich legen'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Ein einfacher Schaltplan: Was ist was? Schreibe die Namen. Ist der Stromkreis offen oder geschlossen? Leuchtet die Lampe?', stufe: 2, html: stromkreis(),
        liste: [['1', 'Batterie'], ['2', 'Schalter'], ['3', 'Lampe'], ['4', 'Leitung (Kabel)'], ['Stromkreis', 'geschlossen – die Lampe leuchtet']], spalten: 2 },
      { art: 'schneidekarten', auftrag: 'Geräte-Check-Karte: Schneidet die Karte aus, klebt sie auf Karton und legt sie an die Maschine. Hakt jeden Punkt ab, bevor ihr anfangt.', stufe: 1, titel: 'Mein Geräte-Check', icon: 'plug', farbe: WARN, spalten: 2,
        karten: [
          { text: '☐ Kabel ohne Risse\n☐ Stecker fest\n☐ Werkzeug fest (Stecker draußen!)\n☐ Werkstück eingespannt\n☐ Brille auf, Haare zusammen\n☐ keine Handschuhe\n☐ Kabel hinter mir' },
          { text: '☐ Kabel ohne Risse\n☐ Stecker fest\n☐ Werkzeug fest (Stecker draußen!)\n☐ Werkstück eingespannt\n☐ Brille auf, Haare zusammen\n☐ keine Handschuhe\n☐ Kabel hinter mir' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sicherheits-Bericht: Was hast du in diesem Modul über Sicherheit gelernt? Welche Regel wirst du nie vergessen?', stufe: 2,
        anfaenge: ['In diesem Modul habe ich gelernt, …', 'Besonders wichtig finde ich …', 'Die Regel, die ich nie vergesse: …', 'Zu Hause achte ich jetzt auf …'], zeilen: 7,
        beispiel: 'In diesem Modul habe ich gelernt, was die Farben der Sicherheitszeichen bedeuten und was ich bei kleinen Verletzungen tue. Besonders wichtig finde ich, dass man Fett nie mit Wasser löscht. Die Regel, die ich nie vergesse: keine Handschuhe an der Bohrmaschine. Zu Hause achte ich jetzt auf Kabel mit kaputter Hülle.' },
    ],
    check: ['Ich mache den Geräte-Check.', 'Ich kenne die Gefahren von 230 Volt.', 'Ich lese einen einfachen Schaltplan.'],
  },
]

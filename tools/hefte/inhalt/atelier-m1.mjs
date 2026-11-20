// Atelier · Modul 1 (7P) „Willkommen in der Werkstatt“ – Enseignement pratique à l’atelier, Voie de préparation.
// Grundlage: Leitfaden VP (MENJE): Kompetenzen im Atelier sind transversal, z. B. „sait lire une fiche technique“,
// „entretient et range le matériel et son plan de travail“; Hygiene und Sicherheit werden ab Modul 1 geübt.
// Kein offizieller Modul-Referenzrahmen öffentlich: Aufbau als begründeter Vorschlag.
// Multimodal: Anleitungen zum Mithören (Hände frei), Lineal zum Ablesen, Werkzeug-Memory, Ämter-Karten, Selbstcheck.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { lineal } from './praxis-bilder.mjs'

export const MODUL = sachModul('atelier', 1, {
  titel: 'Willkommen in der Werkstatt',
  titelFr: 'Bienvenue à l’atelier',
  unter: 'Werkstattregeln, Werkzeuge kennen, genau messen, eine Anleitung lesen, Holz sägen, feilen und schleifen – und am Ende alles ordentlich aufräumen.',
  unterFr: 'Règles de l’atelier, outils, mesurer, lire une fiche technique, travailler le bois, ranger.',
  farbe: '#a0612b',
  deckbild: ['tom:froh:stehen', 'nele:froh:rollstuhl', 'chloe:froh:stehen-zeigen'],
  blasen: [{ t: 'Zweimal messen!', x: 8, y: 104 }, { t: 'Wo ist die Feile?', x: 118, y: 92 }, { t: 'Aufräumen!', x: 170, y: 150 }],
  aussprache: { 'Fiche technique': 'Fisch tekniek', 'Japansäge': 'Japan-Säge' },
  themen: [
    { titel: { de: 'Ankommen', fr: 'Découvrir' }, icon: 'tool', lektionen: 2 },
    { titel: { de: 'Genau arbeiten', fr: 'Travailler avec précision' }, icon: 'ruler', lektionen: 3 },
    { titel: { de: 'Ordnung', fr: 'Ranger' }, icon: 'checklist', lektionen: 1 },
  ],
})

const REGEL = '#a0612b', DILEMMA = '#6d4bc4', IDEE = '#2f8a6b', WERKZEUG = '#1f6aa0'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Werkstattregeln · Sicherheit', titel: 'Regeln, die schützen', untertitel: 'In der Werkstatt gibt es scharfe Werkzeuge und laute Maschinen. Du lernst die wichtigsten Regeln, hörst deinen ersten Werkstatt-Tag und erkennst Fehler auf Gefahren-Karten.',
    ziel: { de: 'Ich kenne die Werkstattregeln und erkläre, warum sie wichtig sind.', fr: 'Je connais les règles de l’atelier et j’explique pourquoi elles sont importantes.' },
    bild: ['lehrer:froh:erklaeren', 'lio:froh:stehen'],
    start: {
      was: 'Erlaubt oder nicht?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was ist in der Werkstatt erlaubt? Kreuze an.', stufe: 1, kopf: ['', 'erlaubt', 'nicht erlaubt'], breiten: [60, 20, 20], zeilen: [['lange Haare zusammenbinden', '[x]', ''], ['in der Werkstatt rennen', '', '[x]'], ['eine Schürze tragen', '[x]', ''], ['eine Maschine ohne Erlaubnis einschalten', '', '[x]'], ['eine kleine Verletzung sofort melden', '[x]', '']] },
      ],
    },
    lesen: {
      was: 'Regeln', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Werkstattordnung (vereinfacht)', titel: 'Die goldenen Regeln der Werkstatt',
      absaetze: [
        '### Vor der Arbeit',
        'Ich trage **Arbeitskleidung** oder eine Schürze. Lange Haare binde ich zusammen. Schals, Ketten, Ringe und weite Ärmel kommen weg – sie können sich in Maschinen verfangen. Ich trage feste Schuhe.',
        '### Bei der Arbeit',
        'Ich benutze ein Werkzeug erst, wenn die Lehrperson es mir **gezeigt** hat. Maschinen schalte ich nur mit **Erlaubnis** ein. Ich gehe ruhig, ich renne nicht. Ich arbeite an **meinem Platz** und störe niemanden, der gerade sägt oder bohrt. Bei Spänen trage ich eine **Schutzbrille**, bei viel Staub eine **Staubmaske**, bei Lärm einen **Gehörschutz**.',
        '### Wenn etwas passiert',
        'Jede Verletzung, auch eine kleine, **melde ich sofort**. Wenn etwas kaputtgeht, sage ich es – das ist kein Problem, verstecken schon.',
        '### Nach der Arbeit',
        'Ich bringe jedes Werkzeug **an seinen Platz** zurück, fege meinen Platz und wasche mir die Hände. Essen und Trinken gibt es nur außerhalb der Werkstatt.',
        'Regeln sind nicht da, um zu nerven. Sie sorgen dafür, dass **alle gesund** nach Hause gehen.',
      ],
      woerter: [['die Werkstatt', 'l’atelier'], ['die Arbeitskleidung', 'les vêtements de travail'], ['die Schürze', 'le tablier'], ['sich verfangen', 's’accrocher'], ['die Erlaubnis', 'la permission'], ['die Schutzbrille', 'les lunettes de protection'], ['der Gehörschutz', 'la protection auditive'], ['melden', 'signaler']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Warum gibt es diese Regel? Verbinde.', stufe: 2, links: ['Lange Haare zusammenbinden.', 'Nicht rennen.', 'Schutzbrille tragen.', 'Werkzeug zurück an seinen Platz.'], rechts: ['Haare können sich in einer Maschine verfangen.', 'Man kann stolpern und andere verletzen.', 'Späne und Staub können ins Auge fliegen.', 'Dann findet man es schnell wieder und niemand tritt darauf.'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Erster Tag in der Holzwerkstatt', titel: 'Erst schauen, dann sägen',
      situation: 'Die Klasse kommt zum ersten Mal in die Holzwerkstatt. Herr Steffen, der Werkstattlehrer, begrüßt sie.',
      bild: ['lehrer:froh:zeigen', 'lio:aufgeregt:stehen'], sprecher: { 'Herr Steffen': 'm1', Lio: 'm3', Nele: 'w3' },
      text: [
        ['Herr Steffen', 'Willkommen in der Werkstatt! Bevor wir anfangen: Lio, nimm bitte die Kapuze vom Pulli ab und steck die Kordeln weg.'],
        ['Lio', 'Warum? Die stören doch nicht.'],
        ['Herr Steffen', 'An der Bohrmaschine schon. Eine Kordel wird in einer Sekunde aufgewickelt. Das ist gefährlich.'],
        ['Nele', 'Herr Steffen, die Werkbank ist für mich zu hoch.'],
        ['Herr Steffen', 'Danke, dass du es sagst. Da hinten steht eine Werkbank, die man herunterkurbeln kann. Die stellen wir für dich ein.'],
        ['Lio', 'Wann dürfen wir endlich sägen?'],
        ['Herr Steffen', 'Heute noch. Aber zuerst zeige ich euch jede Säge. Erst schauen, dann fragen, dann arbeiten. Und noch etwas: Wer sich verletzt, sagt es sofort. Auch bei einem kleinen Splitter.'],
        ['Nele', 'Und wenn etwas kaputtgeht?'],
        ['Herr Steffen', 'Dann sagst du es auch. Kaputt ist nicht schlimm. Verstecken schon.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Werkbank? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein stabiler Arbeitstisch in der Werkstatt', 'eine Bank zum Sitzen'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Lio soll die Kordeln wegstecken.', true], ['Kordeln sind an der Bohrmaschine ungefährlich.', false], ['Für Nele wird eine Werkbank niedriger gestellt.', true], ['Die Klasse darf sofort ohne Erklärung sägen.', false], ['Einen kleinen Splitter muss man nicht melden.', false]] },
        { art: 'fragen', auftrag: 'Wie lautet die Regel von Herrn Steffen? Ergänze.', stufe: 1, fragen: [{ f: 'Erst …, dann …, dann …', l: 'Erst schauen, dann fragen, dann arbeiten.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was braucht ihr, damit ihr in der Werkstatt gut arbeiten könnt? Sagt es der Lehrperson – so wie Nele.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Für mich ist … schwierig.', 'Ich brauche …', 'Können wir …?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Vor und bei der Arbeit', punkte: ['**Arbeitskleidung**, Haare zusammen, kein Schmuck', 'Werkzeug erst nach **Einweisung**', 'Maschinen nur mit **Erlaubnis**', '**Schutzbrille** und **Gehörschutz**, wenn nötig', 'nicht rennen'] },
         { titel: 'Wenn etwas passiert – und danach', punkte: ['Verletzungen **sofort melden**', 'Kaputtes **sagen**, nicht verstecken', 'Werkzeug **an seinen Platz**', 'Platz **fegen**, Hände **waschen**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Gefahren-Karten: Zieht eine Karte. Was ist hier falsch? Welche Regel hilft? Spielt die Szene richtig vor.', stufe: 2, neueSeite: true, titel: 'Was ist falsch?', icon: 'alert-triangle', farbe: REGEL, spalten: 2, typ: 'dilemma',
        karten: [
          { text: 'Ben sägt, und Finn lehnt sich über das Brett, um zuzuschauen.' },
          { text: 'Jana hat sich an der Feile einen kleinen Kratzer geholt. Sie sagt nichts, weil es ihr peinlich ist.' },
          { text: 'Sami trägt seinen langen Schal, während er an der Bohrmaschine wartet.' },
          { text: 'Mia legt die Säge nach der Arbeit auf den Boden unter die Werkbank.' },
          { text: 'Noah schaltet die Schleifmaschine ein, weil der Lehrer gerade telefoniert.' },
          { text: 'Lea isst in der Werkstatt einen Apfel, während sie schleift.' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe deinen Werkstatt-Vertrag: Welche drei Regeln sind dir am wichtigsten? Warum?', stufe: 2,
        anfaenge: ['Mein Werkstatt-Vertrag', 'Ich verspreche, dass ich …', 'Das ist wichtig, weil …', 'Unterschrift: …'], zeilen: 7,
        beispiel: 'Mein Werkstatt-Vertrag: Ich verspreche, dass ich jedes Werkzeug erst benutze, wenn es mir gezeigt wurde. Ich verspreche, dass ich jede Verletzung sofort melde, auch wenn sie klein ist. Und ich bringe alles an seinen Platz zurück. Das ist wichtig, weil dann niemand verletzt wird und wir nicht lange suchen müssen.' },
    ],
    check: ['Ich kenne die wichtigsten Werkstattregeln.', 'Ich erkläre, warum eine Regel wichtig ist.', 'Ich erkenne gefährliche Situationen.'],
  },
  // ================================================================ 2
  {
    thema: 'Werkzeuge kennen', titel: 'Das richtige Werkzeug', untertitel: 'Hammer, Säge, Feile, Zwinge: Jedes Werkzeug hat seine Aufgabe. Du lernst die wichtigsten Werkzeuge kennen, rätst beim Werkzeug-Quiz mit und spielst Werkzeug-Memory.',
    ziel: { de: 'Ich benenne wichtige Werkzeuge und weiß, wofür man sie braucht.', fr: 'Je nomme des outils importants et je sais à quoi ils servent.' },
    bild: ['tom:froh:zeigen', 'chloe:froh:stehen'],
    start: {
      was: 'Kennst du das?',
      aufgaben: [
        { art: 'symbole', auftrag: 'Wie heißen die Werkzeuge? Schreib das Wort.', stufe: 1, woerter: ['der Hammer', 'das Lineal', 'die Schere', 'der Pinsel', 'der Schraubenschlüssel', 'die Axt'],
          symbole: [['hammer', 'der Hammer'], ['ruler', 'das Lineal'], ['scissors', 'die Schere'], ['brush', 'der Pinsel'], ['tool', 'der Schraubenschlüssel'], ['axe', 'die Axt']] },
      ],
    },
    lesen: {
      was: 'Werkzeug-Steckbriefe', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Werkzeugkunde (vereinfacht)', titel: 'Werkzeuge in der Holzwerkstatt',
      absaetze: [
        '**Hammer:** schlägt Nägel ein. Man hält ihn am **Ende des Stiels**, nicht vorne am Kopf.',
        '**Säge:** trennt Holz. Die **Feinsäge** macht gerade, saubere Schnitte. Die **Japansäge** schneidet, wenn man sie zu sich **zieht**.',
        '**Raspel und Feile:** tragen Holz ab und machen Kanten rund. Die Raspel ist grob, die Feile feiner.',
        '**Schleifpapier:** macht die Oberfläche glatt. Je **höher die Zahl** auf der Rückseite, desto **feiner** ist es.',
        '**Schraubzwinge:** hält das Werkstück fest auf der Werkbank. So hat man beide Hände frei und nichts rutscht.',
        '**Schraubendreher:** dreht Schrauben hinein und heraus. Er muss genau in den **Schraubenkopf** passen.',
        '**Handbohrer und Bohrmaschine:** machen Löcher. Die Bohrmaschine nur mit Erlaubnis und mit Schutzbrille benutzen.',
        '**Winkel und Bleistift:** zum Anzeichnen von geraden Linien und rechten Winkeln.',
      ],
      woerter: [['der Hammer', 'le marteau'], ['die Säge', 'la scie'], ['die Feile', 'la lime'], ['die Raspel', 'la râpe'], ['das Schleifpapier', 'le papier de verre'], ['die Schraubzwinge', 'le serre-joint'], ['der Schraubendreher', 'le tournevis'], ['der Winkel', 'l’équerre']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Werkzeug brauchst du? Verbinde.', stufe: 1, links: ['ein Brett festhalten', 'eine Kante rund machen', 'ein Loch machen', 'eine Oberfläche glätten', 'eine gerade Linie anzeichnen'], rechts: ['Schraubzwinge', 'Raspel oder Feile', 'Handbohrer', 'Schleifpapier', 'Winkel und Bleistift'] },
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Den Hammer hält man vorne am Kopf.', false], ['Die Japansäge schneidet beim Ziehen.', true], ['Schleifpapier mit der Zahl 240 ist feiner als mit 80.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Rätsel-Spiel', wo: 'Werkstatt · Pause', titel: 'Werkzeug-Quiz',
      situation: 'Tom beschreibt Werkzeuge, ohne ihren Namen zu sagen. Chloé muss raten.',
      bild: ['tom:froh:zeigen', 'chloe:verwirrt:stehen'], sprecher: { Tom: 'm3', 'Chloé': 'w3' },
      text: [
        ['Tom', 'Erstes Werkzeug: Es hält Sachen fest, damit sie nicht wegrutschen. Man dreht an einem Griff, bis es fest sitzt.'],
        ['Chloé', 'Die Schraubzwinge!'],
        ['Tom', 'Richtig. Zweites: Es hat viele kleine Zähne und macht ein Brett kürzer.'],
        ['Chloé', 'Das ist leicht: die Säge.'],
        ['Tom', 'Drittes: Es sieht aus wie Papier, ist aber rau wie Sand. Damit wird das Holz glatt.'],
        ['Chloé', 'Schleifpapier. Und jetzt ich! Es hat eine Spitze und einen Griff. Man braucht es für Schrauben. Aber es muss genau passen, sonst rutscht es ab.'],
        ['Tom', 'Der Schraubendreher. Zu einfach!'],
        ['Chloé', 'Okay, letztes: Man braucht es, bevor man sägt. Es ist aus Metall, hat einen rechten Winkel, und man zeichnet damit gerade Linien.'],
        ['Tom', 'Hm … der Winkel?'],
        ['Chloé', 'Genau! Alle fünf Werkzeuge erraten – wir sind ein gutes Team!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „rau“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['nicht glatt, man spürt kleine Körner', 'sehr weich'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welches Werkzeug wird beschrieben?', stufe: 1, kopf: ['Beschreibung', 'Werkzeug'], breiten: [65, 35], zeilen: [['hält Sachen fest, man dreht am Griff', '[Schraubzwinge]'], ['viele kleine Zähne, macht ein Brett kürzer', '[Säge]'], ['rau wie Sand, macht Holz glatt', '[Schleifpapier]'], ['Spitze und Griff, für Schrauben', '[Schraubendreher]'], ['aus Metall, rechter Winkel, für gerade Linien', '[Winkel]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt das Werkzeug-Quiz zu zweit: Beschreibt ein Werkzeug, ohne den Namen zu sagen.', stufe: 2, karten: [
        { titel: 'Hilfen', text: ['Es ist aus …', 'Es hat …', 'Man braucht es, um …', 'Man muss aufpassen, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Werkzeuge', punkte: ['**Säge**: trennen', '**Raspel, Feile**: abtragen, runden', '**Schleifpapier**: glätten (hohe Zahl = fein)', '**Schraubzwinge**: festhalten', '**Bohrer**: Löcher', '**Winkel**: anzeichnen'] },
         { titel: 'Gut zu wissen', punkte: ['das **richtige** Werkzeug für die Aufgabe', 'Werkzeug muss **passen** (Schraubendreher!)', 'kaputtes Werkzeug **nicht benutzen**, sondern melden'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Werkzeug-Memory: Schneidet die Karten aus. Legt sie verdeckt hin. Wer ein Paar findet (Werkzeug + Aufgabe), darf sie behalten.', stufe: 1, neueSeite: true, titel: 'Memory', icon: 'hammer', farbe: WERKZEUG, spalten: 4,
        karten: [
          { text: '**Säge**' }, { text: 'trennt Holz' }, { text: '**Feile**' }, { text: 'macht Kanten rund' },
          { text: '**Schleifpapier**' }, { text: 'macht Holz glatt' }, { text: '**Schraubzwinge**' }, { text: 'hält das Werkstück fest' },
          { text: '**Hammer**' }, { text: 'schlägt Nägel ein' }, { text: '**Winkel**' }, { text: 'zeichnet rechte Winkel' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Steckbrief für dein Lieblingswerkzeug: Wie sieht es aus? Wofür braucht man es? Worauf muss man achten?', stufe: 2,
        anfaenge: ['Mein Werkzeug heißt …', 'Es sieht aus wie …', 'Man braucht es, um …', 'Achtung: …'], zeilen: 6,
        beispiel: 'Mein Werkzeug heißt Raspel. Sie sieht aus wie eine lange Feile mit vielen spitzen Zähnen und einem Holzgriff. Man braucht sie, um Holz schnell abzutragen und Kanten rund zu machen. Achtung: Man raspelt immer vom Körper weg, und das Werkstück muss fest eingespannt sein.' },
    ],
    check: ['Ich benenne acht Werkzeuge.', 'Ich weiß, wofür man sie braucht.', 'Ich wähle das richtige Werkzeug für eine Aufgabe.'],
  },
  // ================================================================ 3
  {
    thema: 'Messen und Anzeichnen', titel: 'Zweimal messen, einmal sägen', untertitel: 'Ein Millimeter kann entscheiden, ob ein Teil passt. Du liest Werte am Lineal ab, rechnest zwischen Zentimetern und Millimetern um und hörst, warum Toms Brett zu kurz wurde.',
    ziel: { de: 'Ich messe genau in Millimetern und zeichne Linien sauber an.', fr: 'Je mesure avec précision en millimètres et je trace des lignes proprement.' },
    bild: ['tom:verwirrt:stehen', 'lehrer:froh:erklaeren'],
    start: {
      was: 'Wie lang?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie viele Millimeter hat ein Zentimeter? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['10', '100', '1000'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w1',
      quelle: 'Anleitung', titel: 'So misst und zeichnest du richtig an',
      material: ['Lineal oder Zollstock', 'Winkel', 'spitzer Bleistift', 'Brett'],
      schritte: [
        { icon: 'ruler', text: 'Lege das Lineal **genau an die Kante** des Bretts. Die **Null** muss genau an der Kante sein – nicht das Ende des Lineals!' },
        { icon: 'eye', text: 'Schau **senkrecht von oben** auf die Zahl. Wenn du schräg schaust, liest du falsch ab.' },
        { icon: 'pencil', text: 'Mach an der richtigen Stelle einen kleinen, feinen **Strich** mit dem spitzen Bleistift.' },
        { icon: 'triangle', text: 'Lege den **Winkel** an die Kante und zeichne durch den Strich eine gerade Linie.' },
        { icon: 'repeat', text: '**Miss noch einmal nach!** Erst dann sägen. In der Werkstatt sagt man: Zweimal messen, einmal sägen.' },
      ],
      danach: ['In der Werkstatt misst man in **Millimetern**. 1 cm sind 10 mm. 1 m sind 100 cm oder 1000 mm.'],
      woerter: [['messen', 'mesurer'], ['der Millimeter', 'le millimètre'], ['das Lineal', 'la règle'], ['der Zollstock', 'le mètre pliant'], ['die Kante', 'le bord'], ['senkrecht', 'à la verticale'], ['anzeichnen', 'tracer'], ['nachmessen', 'vérifier la mesure']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'In welcher Reihenfolge? Ordne.', stufe: 1, teile: ['Lineal mit der Null an die Kante legen', 'senkrecht von oben ablesen', 'feinen Strich machen', 'mit dem Winkel eine Linie ziehen', 'nachmessen', 'sägen'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Holzwerkstatt', titel: 'Ein paar Millimeter zu kurz',
      situation: 'Tom wollte ein Regalbrett mit genau 300 mm Länge sägen. Jetzt passt es nicht.',
      bild: ['tom:enttaeuscht:stehen', 'lehrer:ruhig:erklaeren'], sprecher: { Tom: 'm3', 'Herr Steffen': 'm1' },
      text: [
        ['Tom', 'Herr Steffen, mein Brett ist zu kurz! Ich habe genau 300 Millimeter gemessen.'],
        ['Herr Steffen', 'Zeig mal, wie du gemessen hast.'],
        ['Tom', 'So: Lineal an die Kante, und bei 300 einen Strich.'],
        ['Herr Steffen', 'Schau genau hin. Wo fängt dein Lineal an?'],
        ['Tom', 'Oh. Vorne ist ein Stück vom Lineal abgebrochen. Es fängt erst bei fünf Millimetern an, nicht bei null.'],
        ['Herr Steffen', 'Genau. Darum fehlen dir fünf Millimeter. Schau immer zuerst, wo die Null ist. Und dann hast du auch noch auf der falschen Seite vom Strich gesägt. Die Säge nimmt selbst etwa einen Millimeter weg.'],
        ['Tom', 'Also sägt man neben dem Strich?'],
        ['Herr Steffen', 'Ja, auf der Seite, die wegkommt. Der Strich bleibt am guten Stück. Kein Problem, das passiert jedem. Wir nehmen ein neues Brett, und diesmal misst du zweimal.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Regalbrett? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Brett, auf das man Dinge stellt', 'ein Brett zum Schneiden von Brot'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wie lang sollte das Brett sein?', l: '300 mm' }, { f: 'Welchen ersten Fehler hat Tom gemacht?', zeilen: 2, l: 'Er hat nicht geprüft, wo die Null ist: Das Lineal war vorne abgebrochen (5 mm Unterschied).' }, { f: 'Welchen zweiten Fehler hat er gemacht?', zeilen: 2, l: 'Er hat auf der falschen Seite vom Strich gesägt; die Säge nimmt etwa 1 mm weg.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Ist euch schon einmal etwas Ähnliches passiert – beim Basteln, Kochen oder Bauen?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Einmal wollte ich …', 'Dann habe ich gemerkt …', 'Jetzt mache ich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Richtig messen', nummern: true, punkte: ['**Null** an die Kante', '**senkrecht** ablesen', '**feiner** Strich', 'mit dem **Winkel** anzeichnen', '**zweimal** messen'] },
         { titel: 'Einheiten', punkte: ['1 cm = **10 mm**', '1 m = **1000 mm**', 'in der Werkstatt immer in **mm**', 'neben dem Strich sägen – auf der **Abfallseite**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Lies am Lineal ab. Wie viele Millimeter sind es bis zu A, B, C und D?', stufe: 1, html: lineal({ cm: 15, marken: [{ mm: 23 }, { mm: 57 }, { mm: 90 }, { mm: 134 }] }),
        liste: [['A', '23 mm'], ['B', '57 mm'], ['C', '90 mm'], ['D', '134 mm']], spalten: 4 },
      { art: 'rechnen', auftrag: 'Rechne um.', stufe: 2, spalten: 3, items: [{ a: '4 cm = … mm', l: '40 mm' }, { a: '12,5 cm = … mm', l: '125 mm' }, { a: '80 mm = … cm', l: '8 cm' }, { a: '1 m = … mm', l: '1000 mm' }, { a: '350 mm = … cm', l: '35 cm' }, { a: '0,5 m = … mm', l: '500 mm' }] },
      { art: 'fragen', auftrag: 'Ein Brett ist 450 mm lang. Du brauchst zwei Stücke mit je 200 mm. Die Säge nimmt bei jedem Schnitt 1 mm weg. Reicht das Brett? Wie viel bleibt übrig?', stufe: 3, fragen: [{ f: '', zeilen: 2, l: 'Ja. 200 + 1 + 200 + 1 = 402 mm; es bleiben 48 mm übrig.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Erkläre einem neuen Mitschüler, wie man richtig misst und anzeichnet.', stufe: 2,
        anfaenge: ['Zuerst …', 'Dann …', 'Pass auf, dass …', 'Zum Schluss …'], zeilen: 6,
        beispiel: 'Zuerst legst du das Lineal genau mit der Null an die Kante. Dann schaust du von oben auf die Zahl und machst einen feinen Strich. Pass auf, dass du nicht das Ende des Lineals anlegst. Zum Schluss ziehst du mit dem Winkel eine Linie und misst noch einmal nach.' },
    ],
    check: ['Ich lese Millimeter am Lineal ab.', 'Ich rechne cm und mm um.', 'Ich zeichne genau an und messe nach.'],
  },
  // ================================================================ 4
  {
    thema: 'Eine Fiche technique lesen', titel: 'Die Anleitung ist der Chef', untertitel: 'Wer eine Anleitung genau liest, spart Zeit und Material. Du liest deine erste Fiche technique für einen Schlüsselanhänger, hörst, was passiert, wenn man einen Schritt überspringt, und schreibst selbst eine.',
    ziel: { de: 'Ich lese eine Fiche technique und arbeite Schritt für Schritt danach.', fr: 'Je lis une fiche technique et je travaille étape par étape.' },
    bild: ['nele:froh:blatt', 'lio:verwirrt:stehen'],
    start: {
      was: 'Anleitungen',
      aufgaben: [
        { art: 'mc', auftrag: 'Wo findest du Anleitungen im Alltag? Kreuze an (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['Kochrezept', 'Aufbauanleitung für ein Regal', 'Spielregeln', 'Fahrplan', 'Liebesbrief'], r: [0, 1, 2] }] },
      ],
    },
    lesen: {
      was: 'Eine Fiche technique', art: 'anleitung', stimme: 'm1',
      quelle: 'Fiche technique (Schulwerkstatt)', titel: 'Schlüsselanhänger aus Holz',
      material: ['Holzleiste aus Buche, 30 × 8 mm, etwa 100 mm lang', 'Bleistift, Lineal, Winkel', 'Feinsäge, Schraubzwinge', 'Feile, Schleifpapier 120 und 240', 'Handbohrer 5 mm', 'Schlüsselring'],
      schritte: [
        { icon: 'ruler', text: '**Anzeichnen:** Miss 60 mm ab und zeichne mit dem Winkel eine Linie. Markiere die Mitte für das Loch: 8 mm vom oberen Rand.' },
        { icon: 'tool', text: '**Einspannen und sägen:** Spanne die Leiste mit der Schraubzwinge fest. Säge neben dem Strich, auf der Abfallseite.' },
        { icon: 'circle', text: '**Ecken runden:** Feile die Ecken rund. Feile immer vom Körper weg.' },
        { icon: 'point', text: '**Bohren:** Bohre an der Markierung ein Loch mit 5 mm. Lege ein Restholz darunter.' },
        { icon: 'brush', text: '**Schleifen:** Schleife zuerst mit Körnung 120, dann mit 240 – immer in Richtung der Holzfasern.' },
        { icon: 'key', text: '**Fertigstellen:** Fädle den Schlüsselring ein. Prüfe: Sind alle Kanten glatt? Keine Splitter?' },
      ],
      danach: ['Zeit: etwa 2 Unterrichtsstunden. Prüfe dein Werkstück am Ende mit der Checkliste der Lehrperson.'],
      woerter: [['die Fiche technique', 'la fiche technique'], ['die Holzleiste', 'la baguette en bois'], ['einspannen', 'serrer, fixer'], ['die Ecke', 'le coin'], ['das Restholz', 'la chute de bois'], ['die Körnung', 'le grain'], ['die Holzfaser', 'la fibre du bois'], ['der Splitter', 'l’écharde']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Lies die Fiche technique genau und antworte.', stufe: 1, fragen: [{ f: 'Wie lang wird der Schlüsselanhänger?', l: '60 mm' }, { f: 'Wie groß ist das Loch?', l: '5 mm' }, { f: 'Warum legt man ein Restholz unter das Brett beim Bohren?', zeilen: 2, l: 'Damit die Werkbank nicht beschädigt wird und das Holz unten nicht ausreißt.' }, { f: 'Mit welcher Körnung schleift man zuerst?', l: 'mit 120, dann mit 240' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Holzwerkstatt', titel: 'Ich hab’s doch fast richtig gemacht',
      situation: 'Lio und Nele bauen den Schlüsselanhänger. Lio will schneller sein und liest nur die Bilder.',
      bild: ['lio:froh:stehen', 'nele:ruhig:rollstuhl'], sprecher: { Lio: 'm3', Nele: 'w3' },
      text: [
        ['Lio', 'Fertig! Erster! Jetzt nur noch das Loch bohren.'],
        ['Nele', 'Moment. Hast du die Ecken schon rund gefeilt?'],
        ['Lio', 'Nö, das mache ich danach.'],
        ['Nele', 'In der Anleitung steht: zuerst Ecken runden, dann bohren. Und hast du die Mitte für das Loch markiert?'],
        ['Lio', 'Ach, das sehe ich so. Hier ungefähr …'],
        ['Nele', 'Lio, da steht: 8 Millimeter vom oberen Rand. Wenn das Loch zu nah am Rand ist, bricht das Holz aus.'],
        ['Lio', 'Hm. Okay, ich messe. … Oh, ich wäre bei 4 Millimetern gewesen.'],
        ['Nele', 'Siehst du. Ich lese die Anleitung immer zweimal. Einmal ganz, bevor ich anfange. Und dann bei jedem Schritt noch mal.'],
        ['Lio', 'Dann bin ich nicht mehr Erster.'],
        ['Nele', 'Dafür ist deiner nicht kaputt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „das Holz bricht aus“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ein Stück vom Holz bricht ab.', 'Das Holz wird nass.'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Lio wollte die Ecken nach dem Bohren feilen.', true], ['Das Loch soll 4 mm vom Rand sein.', false], ['Nele liest die Anleitung zweimal.', true], ['Lio bleibt am Ende Erster.', false]] },
        { art: 'fragen', auftrag: 'Wie liest Nele eine Anleitung?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Einmal ganz, bevor sie anfängt, und dann bei jedem Schritt noch einmal.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Schnell oder genau – was ist euch in der Werkstatt wichtiger? Warum?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Mir ist … wichtiger, weil …', 'Wenn man zu schnell ist, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Eine Fiche technique hat …', punkte: ['**Material** und **Werkzeug**', '**Maße** (in mm)', 'nummerierte **Schritte**', 'manchmal **Zeit** und **Prüfung**'] },
         { titel: 'So liest du sie', nummern: true, punkte: ['einmal **ganz** lesen', 'Material **bereitlegen**', '**Schritt für Schritt** arbeiten', 'bei jedem Schritt **nachlesen**', 'am Ende **prüfen**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Plane mit der Fiche technique: Was brauchst du bei welchem Schritt?', stufe: 2, kopf: ['Schritt', 'Werkzeug'], breiten: [40, 60], zeilen: [['Anzeichnen', '[Bleistift, Lineal, Winkel]'], ['Sägen', '[Schraubzwinge, Feinsäge]'], ['Ecken runden', '[Feile]'], ['Bohren', '[Handbohrer 5 mm, Restholz]'], ['Schleifen', '[Schleifpapier 120 und 240]']] },
      { art: 'schneidekarten', auftrag: 'Schritt-Karten: Schneidet die Karten aus, mischt sie und legt sie in die richtige Reihenfolge. Wer ist schneller – ohne Fehler?', stufe: 1, titel: 'Was kommt zuerst?', icon: 'list-numbers', farbe: IDEE, spalten: 3,
        karten: [
          { text: 'anzeichnen' }, { text: 'einspannen und sägen' }, { text: 'Ecken rund feilen' },
          { text: 'Loch bohren' }, { text: 'schleifen: 120, dann 240' }, { text: 'Schlüsselring einfädeln' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe selbst eine kleine Fiche technique – für etwas, das du gut kannst (zum Beispiel: ein Brot schmieren, einen Fahrradreifen aufpumpen, eine Origami-Figur falten).', stufe: 3,
        anfaenge: ['Titel: …', 'Du brauchst: …', 'Schritt 1: …', 'Schritt 2: …', 'Schritt 3: …', 'Prüfe am Ende: …'], zeilen: 8,
        beispiel: 'Titel: Fahrradreifen aufpumpen. Du brauchst: eine Pumpe mit passendem Aufsatz. Schritt 1: Schraube die Kappe vom Ventil ab. Schritt 2: Stecke den Aufsatz der Pumpe fest auf das Ventil. Schritt 3: Pumpe, bis der Reifen fest ist; auf dem Reifen steht, wie viel Druck richtig ist. Schritt 4: Nimm die Pumpe ab und schraube die Kappe wieder auf. Prüfe am Ende: Drück mit dem Daumen – der Reifen soll kaum nachgeben.' },
    ],
    check: ['Ich lese eine Fiche technique ganz, bevor ich anfange.', 'Ich arbeite Schritt für Schritt.', 'Ich schreibe selbst eine einfache Anleitung.'],
  },
  // ================================================================ 5
  {
    thema: 'Holz bearbeiten · sägen, feilen, schleifen', titel: 'Vom groben Brett zum glatten Stück', untertitel: 'Holz ist lebendig: Es hat Fasern, ist hart oder weich. Du lernst Holzarten kennen, sägst und feilst richtig und schleifst vom Groben ins Feine.',
    ziel: { de: 'Ich kenne Holzarten und bearbeite Holz vom Groben ins Feine.', fr: 'Je connais des sortes de bois et je travaille le bois du grossier au fin.' },
    bild: ['chloe:froh:zeigen', 'yusuf:froh:stehen'],
    start: {
      was: 'Holz im Alltag',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Was ist bei dir zu Hause oder in der Schule aus Holz? Sammle.', stufe: 1, mitte: 'Holz', aeste: ['Tisch', { l: 'Stuhl' }, { l: 'Tür' }, { l: 'Bleistift' }, { l: 'Bett' }, { l: 'Treppe' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Holzkunde (vereinfacht)', titel: 'Holz verstehen',
      absaetze: [
        '### Weich oder hart?',
        '**Nadelhölzer** wie **Fichte** und **Kiefer** sind meist **weich**. Man kann sie leicht sägen, aber sie bekommen schnell Dellen. **Laubhölzer** wie **Buche** und **Eiche** sind meist **hart**. Sie sind schwerer zu bearbeiten, aber sehr stabil. Luxemburg hat viel Wald: Buche und Eiche wachsen hier oft.',
        '### Die Fasern',
        'Holz besteht aus langen **Fasern**, wie ein Bündel Strohhalme. Man sieht sie als feine Linien. **Mit der Faser** spaltet Holz leicht, **quer zur Faser** ist es stabiler. Beim Schleifen arbeitet man immer **in Faserrichtung**, sonst gibt es Kratzer.',
        '### Vom Groben ins Feine',
        'Zuerst **sägen**: Das Werkstück fest einspannen, mit leichtem Druck und langen Zügen sägen. Dann **raspeln** oder **feilen**: Die Feile nur beim **Vorschieben** drücken, beim Zurückziehen nicht. Zum Schluss **schleifen**: zuerst grobes Papier (zum Beispiel **80** oder **120**), dann feines (**240**). Jede Stufe macht die Kratzer der letzten Stufe weg.',
      ],
      woerter: [['das Nadelholz', 'le bois résineux'], ['das Laubholz', 'le bois de feuillus'], ['die Fichte', 'l’épicéa'], ['die Buche', 'le hêtre'], ['die Eiche', 'le chêne'], ['die Delle', 'le creux, la marque'], ['spalten', 'fendre'], ['quer', 'en travers']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Weich oder hart? Kreuze an.', stufe: 1, kopf: ['Holz', 'meist weich', 'meist hart'], breiten: [40, 30, 30], zeilen: [['Fichte', '[x]', ''], ['Eiche', '', '[x]'], ['Kiefer', '[x]', ''], ['Buche', '', '[x]']] },
        { art: 'ordnen', auftrag: 'Vom Groben ins Feine: Ordne.', stufe: 1, teile: ['sägen', 'raspeln', 'feilen', 'schleifen mit 120', 'schleifen mit 240'], ordnung: [4, 1, 3, 0, 2] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Holzwerkstatt · Schleifecke', titel: 'Warum kratzt das noch?',
      situation: 'Yusuf schleift sein Brett, aber es bleiben Kratzer. Chloé schaut sich das an.',
      bild: ['yusuf:verwirrt:stehen', 'chloe:froh:zeigen'], sprecher: { Yusuf: 'm3', 'Chloé': 'w3' },
      text: [
        ['Yusuf', 'Ich schleife schon zehn Minuten, und da sind immer noch Kratzer. Das feine Papier bringt gar nichts.'],
        ['Chloé', 'Zeig mal. Ah, du schleifst im Kreis. Siehst du die Linien im Holz? Das sind die Fasern. Du musst immer in diese Richtung schleifen, hin und her.'],
        ['Yusuf', 'Und warum?'],
        ['Chloé', 'Quer zur Faser reißt du sie auf. Das gibt neue Kratzer. Und hast du mit grobem Papier angefangen?'],
        ['Yusuf', 'Nein, gleich mit dem feinen, damit es schön wird.'],
        ['Chloé', 'Das ist der Trick: Erst grob, dann fein. Das grobe Papier nimmt die tiefen Kratzer weg. Das feine macht es glatt. Mit nur feinem Papier schleifst du ewig.'],
        ['Yusuf', 'Und woher weiß ich, wann ich wechseln kann?'],
        ['Chloé', 'Mach mit Bleistift ganz leicht ein paar Striche auf das Holz. Wenn sie beim Schleifen ganz weg sind, kannst du zum nächsten Papier wechseln.'],
        ['Yusuf', 'Cooler Trick. Wo hast du das her?'],
        ['Chloé', 'Von meiner Nachbarin. Sie restauriert alte Möbel.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht jemand, der Möbel restauriert? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Er oder sie repariert alte Möbel und macht sie wieder schön.', 'Er oder sie verkauft neue Möbel.'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Welche zwei Fehler hat Yusuf gemacht?', zeilen: 2, l: 'Er hat im Kreis statt in Faserrichtung geschliffen und gleich mit feinem statt mit grobem Papier angefangen.' }, { f: 'Wie erkennt man, wann man zum feineren Papier wechseln kann?', zeilen: 2, l: 'Man macht leichte Bleistiftstriche; wenn sie weggeschliffen sind, wechselt man.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Kennt ihr auch Tricks von Erwachsenen – beim Basteln, Kochen, Reparieren? Erzählt.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ein Trick, den ich kenne: …', 'Das habe ich von … gelernt.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Holz', punkte: ['**Nadelholz** (Fichte, Kiefer): meist weich', '**Laubholz** (Buche, Eiche): meist hart', '**Fasern**: in Faserrichtung schleifen'] },
         { titel: 'Vom Groben ins Feine', nummern: true, punkte: ['**sägen** (fest einspannen)', '**raspeln / feilen** (nur beim Vorschieben drücken)', '**schleifen**: erst grob (80/120), dann fein (240)'] }],
      ],
    },
    ueben: [
      { art: 'fragen', auftrag: 'Was ist hier falsch? Wie geht es richtig?', stufe: 2, fragen: [{ f: 'Ben schleift ein Brett quer zur Faser.', zeilen: 2, l: 'Quer zur Faser gibt es Kratzer; richtig: in Faserrichtung schleifen.' }, { f: 'Mia drückt die Feile auch beim Zurückziehen fest.', zeilen: 2, l: 'Die Feile arbeitet nur beim Vorschieben; beim Zurückziehen nicht drücken, sonst wird sie stumpf.' }, { f: 'Finn hält das Brett beim Sägen nur mit der Hand fest.', zeilen: 2, l: 'Das Brett kann rutschen, er kann sich verletzen; richtig: mit der Schraubzwinge einspannen.' }] },
      { art: 'schneidekarten', auftrag: 'Holz-Detektiv: Untersucht in der Werkstatt verschiedene Holzstücke. Füllt für jedes eine Karte aus.', stufe: 2, titel: 'Holz-Detektiv', icon: 'wood', farbe: REGEL, spalten: 2,
        karten: [
          { text: '**Holzstück 1** – Name, Farbe, hart oder weich? Fasern gut sichtbar?', linien: 3 },
          { text: '**Holzstück 2** – Name, Farbe, hart oder weich? Fasern gut sichtbar?', linien: 3 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Beschreibe, wie du ein raues Holzstück glatt bekommst. Benutze die Fachwörter.', stufe: 2,
        anfaenge: ['Zuerst spanne ich …', 'Dann …', 'Beim Schleifen achte ich darauf, dass …', 'Am Ende prüfe ich …'], zeilen: 6,
        beispiel: 'Zuerst spanne ich das Holzstück mit der Schraubzwinge fest. Dann feile ich die Kanten rund und drücke die Feile nur beim Vorschieben. Beim Schleifen achte ich darauf, dass ich in Faserrichtung arbeite und erst das grobe Papier mit 120, dann das feine mit 240 nehme. Am Ende prüfe ich mit den Fingern, ob alles glatt ist.' },
    ],
    check: ['Ich unterscheide weiches und hartes Holz.', 'Ich schleife in Faserrichtung.', 'Ich arbeite vom Groben ins Feine.'],
  },
  // ================================================================ 6
  {
    thema: 'Aufräumen · Material pflegen · Selbstcheck', titel: 'Jedes Ding an seinen Platz', untertitel: 'Ordnung ist kein Extra, sondern Teil der Arbeit. Du lernst, wie man Werkzeug pflegt und die Werkstatt aufräumt, übernimmst ein Werkstatt-Amt und schaust auf deinen ersten Monat zurück.',
    ziel: { de: 'Ich pflege Material und räume meinen Arbeitsplatz ordentlich auf.', fr: 'J’entretiens le matériel et je range correctement mon plan de travail.' },
    bild: ['mia:froh:stehen', 'ben:froh:stehen'],
    start: {
      was: 'Wo ist …?',
      aufgaben: [
        { art: 'fragen', auftrag: 'Wie lange suchst du manchmal etwas – dein Handy, deine Schuhe, ein Heft? Was hilft dir, Dinge schnell zu finden?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuelle Antwort, z. B.: Wenn alles einen festen Platz hat.' }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w1',
      quelle: 'Werkstattordnung', titel: 'Die Aufräum-Runde: 10 Minuten vor Schluss',
      material: ['Besen und Schaufel', 'Lappen', 'Mülleimer (Holz, Restmüll)', 'Werkzeugwand'],
      schritte: [
        { icon: 'plug', text: '**Maschinen aus:** Alle Maschinen ausschalten und – wenn die Lehrperson es sagt – den Stecker ziehen.' },
        { icon: 'tool', text: '**Werkzeug reinigen:** Staub und Späne mit einem Pinsel oder Lappen entfernen. Kaputtes Werkzeug zur Lehrperson bringen.' },
        { icon: 'layout-grid', text: '**Werkzeugwand:** Jedes Werkzeug an seinen Platz hängen. Der aufgemalte **Umriss** zeigt, wohin es gehört. Ein leerer Umriss heißt: Da fehlt etwas!' },
        { icon: 'recycle', text: '**Reste sortieren:** Brauchbare Holzreste in die Restekiste, Späne und Staub in den richtigen Müll.' },
        { icon: 'bucket', text: '**Fegen:** Den eigenen Platz und den Boden darum fegen. Werkbank abwischen.' },
        { icon: 'droplet', text: '**Hände waschen** – und dann zur Kontrolle durch die Lehrperson.' },
      ],
      danach: ['In vielen Werkstätten hat jede Person ein **Amt**: Fegen, Werkzeugwand, Müll, Maschinen. Die Ämter wechseln jede Woche.'],
      woerter: [['aufräumen', 'ranger'], ['der Stecker', 'la fiche'], ['reinigen', 'nettoyer'], ['der Span', 'le copeau'], ['die Werkzeugwand', 'le panneau à outils'], ['der Umriss', 'le contour'], ['fegen', 'balayer'], ['das Amt', 'la tâche, la fonction']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Was macht man zuerst bei der Aufräum-Runde?', l: 'Alle Maschinen ausschalten.' }, { f: 'Was zeigt ein leerer Umriss an der Werkzeugwand?', l: 'Dass dort ein Werkzeug fehlt.' }, { f: 'Was macht man mit kaputtem Werkzeug?', l: 'Man bringt es zur Lehrperson.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Holzwerkstatt · Ende der Stunde', titel: 'Wer hat die Feile?',
      situation: 'Die Aufräum-Runde ist fast vorbei. An der Werkzeugwand fehlt etwas.',
      bild: ['mia:besorgt:stehen', 'lehrer:ruhig:erklaeren'], sprecher: { Mia: 'w3', 'Herr Steffen': 'm1', Ben: 'm3' },
      text: [
        ['Mia', 'Herr Steffen, an der Werkzeugwand ist ein Umriss leer. Eine Feile fehlt.'],
        ['Herr Steffen', 'Danke, Mia. Du hast diese Woche das Amt Werkzeugwand. Bitte schaut alle an euren Plätzen nach.'],
        ['Ben', 'Oh … die liegt unter meinem Brett. Sorry.'],
        ['Herr Steffen', 'Gut, dass sie da ist. Wisst ihr, warum ich das so genau nehme?'],
        ['Ben', 'Damit nichts verloren geht?'],
        ['Herr Steffen', 'Auch. Aber vor allem: Eine Feile, die irgendwo herumliegt, kann herunterfallen und jemanden verletzen. Und nächste Woche sucht die andere Klasse eine halbe Stunde.'],
        ['Mia', 'Bei mir zu Hause ist das genauso mit dem Ladekabel. Keiner weiß, wo es ist.'],
        ['Herr Steffen', 'Siehst du. In jedem Beruf ist Ordnung wichtig: in der Küche, in der Autowerkstatt, im Krankenhaus. Wer gut aufräumt, zeigt Respekt vor den anderen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „etwas genau nehmen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['sehr darauf achten, dass es richtig gemacht wird', 'etwas mitnehmen'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wie hat Mia gemerkt, dass eine Feile fehlt?', l: 'Ein Umriss an der Werkzeugwand war leer.' }, { f: 'Wo war die Feile?', l: 'unter Bens Brett' }, { f: 'Nenne zwei Gründe, warum Herr Steffen Ordnung so wichtig findet.', zeilen: 2, l: 'Herumliegende Werkzeuge können herunterfallen und verletzen; die nächste Klasse muss sonst suchen; Ordnung zeigt Respekt.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'In welchen Berufen ist Ordnung besonders wichtig? Warum?', stufe: 2, karten: [
        { titel: 'Ideen', text: ['Koch / Köchin', 'Mechatroniker/in', 'Pflegekraft', 'Elektriker/in', 'Friseur/in'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Die Aufräum-Runde', nummern: true, punkte: ['**Maschinen** aus', '**Werkzeug** reinigen', 'an die **Werkzeugwand**', '**Reste** sortieren', '**fegen**, abwischen', '**Hände waschen**'] },
         { titel: 'Warum Ordnung?', punkte: ['**Sicherheit**: nichts fällt herunter', '**Zeit**: nichts suchen', '**Respekt** vor den anderen', 'in **jedem Beruf** wichtig'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Werkstatt-Ämter: Schneidet die Karten aus und verteilt die Ämter in eurer Gruppe. Jede Woche wird gewechselt. Schreibt den Namen auf die Karte.', stufe: 1, neueSeite: true, titel: 'Mein Amt', icon: 'checklist', farbe: IDEE, spalten: 3,
        karten: [
          { text: '**Werkzeugwand:** Ist jeder Umriss voll?', frage: 'Diese Woche: …' },
          { text: '**Fegen:** Boden und Werkbänke sauber?', frage: 'Diese Woche: …' },
          { text: '**Müll:** Reste richtig sortiert?', frage: 'Diese Woche: …' },
          { text: '**Maschinen:** Alles aus und sauber?', frage: 'Diese Woche: …' },
          { text: '**Material:** Holz und Papier zurück im Regal?', frage: 'Diese Woche: …' },
          { text: '**Kontrolle:** Hat jeder seine Hände gewaschen?', frage: 'Diese Woche: …' },
        ] },
      { art: 'tabelle', auftrag: 'Mein Selbstcheck nach dem ersten Monat in der Werkstatt: Kreuze ehrlich an.', stufe: 2, kopf: ['Ich …', 'schon gut', 'manchmal', 'übe ich noch'], breiten: [52, 16, 16, 16], zeilen: [['halte mich an die Werkstattregeln', '', '', ''], ['benenne die wichtigsten Werkzeuge', '', '', ''], ['messe genau in Millimetern', '', '', ''], ['lese eine Anleitung ganz, bevor ich anfange', '', '', ''], ['räume meinen Platz ordentlich auf', '', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Werkstatt-Bericht: Was hast du im ersten Modul gebaut und gelernt? Was war schwer? Was willst du als Nächstes lernen?', stufe: 2,
        anfaenge: ['In diesem Modul habe ich … gebaut.', 'Gelernt habe ich …', 'Schwer war für mich …', 'Als Nächstes möchte ich …'], zeilen: 8,
        beispiel: 'In diesem Modul habe ich einen Schlüsselanhänger aus Buchenholz gebaut. Gelernt habe ich, wie man genau misst, richtig sägt und vom Groben ins Feine schleift. Schwer war für mich das Feilen, weil meine Ecken erst nicht gleich rund waren. Als Nächstes möchte ich lernen, wie man mit der Bohrmaschine arbeitet.' },
    ],
    check: ['Ich mache die Aufräum-Runde Schritt für Schritt.', 'Ich pflege Werkzeug und melde Kaputtes.', 'Ich schätze mich selbst ehrlich ein.'],
  },
]

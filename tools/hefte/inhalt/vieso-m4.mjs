// Vie et société · Modul 4 (6P) „Verantwortung für mich“ – nach dem MENJE-Rahmenlehrplan „Leben und Gesellschaft“,
// 8. Klasse: Lernfeld „Ich“ (Eigenverantwortung: Gesundheit, Sucht und Risikoverhalten; Liebe ist …?) und „Ich und die
// Anderen“ (Anerkennung und Ausgrenzung: Geschlechterrollen; Jung und Alt: Generationen) – ergänzt um Körperbild und
// Selbstwert sowie Hilfe holen. Viele Karten (Gesprächs-, Dilemma-, Mutmach-, Rollen- und Hilfekarten).
// Sensibel und inklusiv; keine Fragen zur eigenen Familie; Persönliches nur freiwillig. Hilfe: 116 111, 112.
import { sachModul } from './sachfach-gemeinsam.mjs'

export const MODUL = sachModul('vieso', 4, {
  titel: 'Verantwortung für mich',
  titelFr: 'Être responsable de moi',
  unter: 'Was gesund sein heißt, warum Mutproben reizen, frei oder abhängig sein, was Liebe ist, Rollenbilder, Jung und Alt, mein Körper und mein Wert – und warum Hilfe holen stark ist. Mit vielen Karten.',
  unterFr: 'Santé, prises de risque, liberté et dépendance, amour, rôles de genre, générations, image de soi – et oser demander de l’aide.',
  farbe: '#c0587e',
  deckbild: ['nele:froh:rollstuhl', 'sami:froh:stehen', 'oma:froh:stehen'],
  blasen: [{ t: 'Trau dich – oder nicht?', x: 10, y: 110 }, { t: 'Liebe ist …', x: 130, y: 96 }, { t: 'Typisch?', x: 166, y: 150 }],
  themen: [
    { titel: { de: 'Gesund und frei', fr: 'En bonne santé et libre' }, icon: 'heartbeat', lektionen: 3 },
    { titel: { de: 'Liebe und Rollen', fr: 'Amour et rôles' }, icon: 'heart', lektionen: 2 },
    { titel: { de: 'Wertvoll sein', fr: 'Avoir de la valeur' }, icon: 'star', lektionen: 3 },
  ],
})

const FRAGE = '#c0587e', DILEMMA = '#6d4bc4', MUT = '#d0577b', IDEE = '#2f8a6b', HILFE = '#2f6db5'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Gesundheit · Körper, Seele, Miteinander', titel: 'Was heißt gesund sein?', untertitel: 'Nicht krank sein – reicht das? Du lernst, dass Gesundheit Körper, Gefühle und Beziehungen umfasst, hörst drei Jugendliche und gestaltest dein Wohlfühl-Rad.',
    ziel: { de: 'Ich erkläre, dass Gesundheit körperlich, seelisch und sozial ist, und nenne, was mir guttut.', fr: 'J’explique que la santé est physique, psychique et sociale et je cite ce qui me fait du bien.' },
    bild: ['sami:froh:stehen', 'nele:froh:rollstuhl'],
    start: {
      was: 'Gesund ist …',
      aufgaben: [
        { art: 'mc', auftrag: 'Was gehört für dich zur Gesundheit? Kreuze an (mehrere möglich). Es gibt kein Richtig oder Falsch.', stufe: 1, fragen: [{ f: '', o: ['nicht krank sein', 'gut schlafen', 'Freunde haben', 'sich wohlfühlen', 'Sport machen', 'keine Sorgen haben'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Drei Seiten der Gesundheit',
      absaetze: [
        'Die Weltgesundheitsorganisation (WHO) sagt: Gesundheit ist mehr als „nicht krank sein“. Gesund ist, wer sich **körperlich**, **seelisch** und **sozial** wohlfühlt.',
        '### Körper',
        'Der Körper braucht genug **Schlaf**, gutes **Essen**, **Bewegung** und Pausen vom Bildschirm. Jugendliche brauchen meist 8 bis 10 Stunden Schlaf.',
        '### Seele',
        'Auch Gefühle gehören zur Gesundheit. Traurig, wütend oder ängstlich zu sein, ist normal. Wichtig ist, dass man mit den Gefühlen umgehen kann – zum Beispiel durch Reden, Bewegung, Musik oder Ruhe.',
        '### Miteinander',
        'Menschen brauchen andere Menschen: Freundinnen und Freunde, Familie, Vereine, eine Klasse, in der man sich sicher fühlt. Wer lange allein ist, wird oft auch körperlich schneller krank.',
        'Die drei Seiten hängen zusammen: Wer schlecht schläft, ist schneller gereizt. Wer Streit hat, bekommt manchmal Bauchweh. Und wer sich bewegt, hat oft bessere Laune. Auch ein Mensch mit einer Krankheit oder Behinderung kann sich gesund und wohl fühlen.',
      ],
      woerter: [['die Gesundheit', 'la santé'], ['körperlich', 'physique'], ['seelisch', 'psychique, mental'], ['sozial', 'social'], ['sich wohlfühlen', 'se sentir bien'], ['gereizt', 'irritable'], ['die Behinderung', 'le handicap'], ['die Weltgesundheits\u00ADorganisation', 'l’Organisation mondiale de la santé']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Körper, Seele oder Miteinander? Kreuze an.', stufe: 1, kopf: ['Was tut gut?', 'Körper', 'Seele', 'Miteinander'], breiten: [46, 18, 18, 18], zeilen: [['acht Stunden schlafen', '[x]', '', ''], ['mit einer Freundin lachen', '', '', '[x]'], ['Musik hören, wenn ich traurig bin', '', '[x]', ''], ['Fahrrad fahren', '[x]', '', ''], ['im Verein mitspielen', '', '', '[x]'], ['über Sorgen reden', '', '[x]', '']] },
      ],
    },
    hoeren: {
      was: 'Drei Stimmen', wo: 'Schulpodcast „Wie geht’s dir wirklich?“', titel: 'Was mir guttut',
      situation: 'Drei Jugendliche erzählen im Schulpodcast, was ihnen guttut.',
      bild: ['nele:froh:rollstuhl', 'sami:froh:stehen'], sprecher: { Nele: 'w3', Sami: 'm3', Amira: 'w2' },
      text: [
        ['Nele', 'Ich sitze im Rollstuhl, aber ich fühle mich meistens richtig gesund. Mir tut Rollstuhlbasketball gut. Da kann ich mich auspowern, und das Team ist wie eine zweite Familie.'],
        ['Sami', 'Bei mir ist es Schlaf. Früher habe ich bis Mitternacht gezockt und war in der Schule total gereizt. Jetzt lege ich das Handy um zehn weg. Ich bin viel entspannter.'],
        ['Amira', 'Mir hilft Zeichnen. Wenn mich etwas beschäftigt, zeichne ich. Und ich rede mit meiner besten Freundin. Nach einem Gespräch mit ihr ist es oft nur noch halb so schlimm.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „sich auspowern“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['sich beim Sport richtig anstrengen', 'den Akku laden'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was tut wem gut? Welche Seite der Gesundheit ist das?', stufe: 1, kopf: ['Wer?', 'Was tut gut?', 'Seite'], breiten: [16, 54, 30], zeilen: [['Nele', '[Rollstuhlbasketball, das Team]', '[Körper und Miteinander]'], ['Sami', '[genug Schlaf, Handy um 22 Uhr weglegen]', '[Körper und Seele]'], ['Amira', '[Zeichnen, mit der besten Freundin reden]', '[Seele und Miteinander]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was tut euch gut? Erzählt nur, was ihr erzählen möchtet.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Mir tut gut, wenn …', 'Wenn ich schlecht drauf bin, hilft …', 'Ich möchte öfter …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Gesundheit ist …', punkte: ['**körperlich**: Schlaf, Essen, Bewegung', '**seelisch**: mit Gefühlen umgehen', '**sozial**: gute Beziehungen', 'Alle drei **hängen zusammen**.'] },
         { titel: 'Gut für mich sorgen', punkte: ['8–10 Stunden **Schlaf**', '**Pausen** vom Bildschirm', 'etwas, das **Freude** macht', 'mit jemandem **reden**'] }],
      ],
    },
    ueben: [
      { art: 'mindmap', auftrag: 'Mein Wohlfühl-Rad (freiwillig, auch für eine ausgedachte Person): Was tut gut? Schreibe in jeden Kasten etwas.', stufe: 1, mitte: 'Das tut mir gut', hoehe: 82, aeste: [{ l: '' }, { l: '' }, { l: '' }, { l: '' }, { l: '' }, { l: '' }] },
      { art: 'schneidekarten', auftrag: 'Gesprächskarten: Zieht eine Karte und sprecht darüber.', stufe: 2, neueSeite: true, titel: 'Gesund?', icon: 'heartbeat', farbe: FRAGE, spalten: 2,
        karten: [
          { text: 'Kann man gesund sein, obwohl man krank ist?' }, { text: 'Ist es gesund, nie traurig zu sein?' },
          { text: 'Wie viel Handy ist zu viel?' }, { text: 'Warum fällt es manchen schwer, über Gefühle zu reden?' },
          { text: 'Was ist wichtiger: viele Freunde oder ein guter Freund?' }, { text: 'Ist Faulenzen manchmal gesund?' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Wochenplan „Gut für mich sorgen“ mit drei kleinen Zielen – für dich oder eine ausgedachte Person.', stufe: 2,
        anfaenge: ['Ziel 1 (Körper): …', 'Ziel 2 (Seele): …', 'Ziel 3 (Miteinander): …', 'Am Ende der Woche prüfe ich …'], zeilen: 6,
        beispiel: 'Ziel 1 (Körper): Ich lege das Handy um 22 Uhr weg. Ziel 2 (Seele): Wenn ich wütend bin, gehe ich zehn Minuten raus. Ziel 3 (Miteinander): Ich frage einen Mitschüler, ob er in der Pause mit uns Basketball spielt. Am Ende der Woche prüfe ich, was ich geschafft habe.' },
    ],
    check: ['Ich nenne die drei Seiten der Gesundheit.', 'Ich erkläre, wie sie zusammenhängen.', 'Ich nenne, was mir guttut.'],
  },
  // ================================================================ 2
  {
    thema: 'Risikoverhalten · Mutproben · Gruppendruck', titel: 'Trau dich – oder nicht?', untertitel: 'Über die Mauer springen, das Video posten, die Wette annehmen: Du überlegst, warum Mutproben reizen, hörst eine Geschichte und entscheidest in Dilemmas.',
    ziel: { de: 'Ich erkläre, warum Jugendliche Risiken eingehen, und unterscheide echten Mut von gefährlichen Mutproben.', fr: 'J’explique pourquoi les jeunes prennent des risques et je distingue vrai courage et défi dangereux.' },
    bild: ['ben:froh:stehen', 'tom:aufgeregt:stehen'],
    start: {
      was: 'Mut ist …',
      aufgaben: [
        { art: 'meinungslinie', auftrag: 'Wie mutig ist das? Setze ein Kreuz.', stufe: 1, aussagen: ['Vor der Klasse ein Referat halten', 'Auf einen Zug aufspringen', 'Sich bei jemandem entschuldigen'], warum: false, pole: ['gar nicht mutig', 'ein bisschen', 'mittel', 'ziemlich', 'sehr mutig'] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Warum reizt das Risiko?',
      absaetze: [
        'Viele Jugendliche probieren Neues aus und gehen dabei Risiken ein: zu schnell fahren, auf hohe Dinge klettern, gefährliche Challenges aus dem Internet nachmachen. Das ist kein Zufall.',
        '### Das Gehirn in der Pubertät',
        'In der Pubertät baut sich das Gehirn um. Der Teil, der Gefühle und Belohnung steuert, ist schon sehr aktiv. Der Teil, der plant und Folgen abschätzt, wird erst bis etwa Mitte zwanzig ganz fertig. Darum fühlt sich ein Risiko oft **aufregend** an, und die Gefahr wird **unterschätzt**.',
        '### Die Gruppe',
        'Mit Freunden gehen Jugendliche mehr Risiken ein als allein. Man will dazugehören, nicht als Feigling dastehen, Anerkennung bekommen. Das nennt man **Gruppendruck**.',
        '### Echter Mut',
        'Mut ist nicht immer, etwas Gefährliches zu tun. Manchmal ist es mutiger, **Nein zu sagen**, sich gegen die Gruppe zu stellen oder jemandem zu helfen. Gesunde Risiken gibt es auch: einen neuen Sport ausprobieren, auf einer Bühne stehen, jemanden Neues ansprechen.',
      ],
      woerter: [['das Risiko', 'le risque'], ['die Mutprobe', 'le défi'], ['unterschätzen', 'sous-estimer'], ['die Folge', 'la conséquence'], ['der Gruppendruck', 'la pression du groupe'], ['der Feigling', 'le lâche'], ['die Anerkennung', 'la reconnaissance'], ['dazugehören', 'faire partie du groupe']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 1, fragen: [{ f: 'Warum unterschätzen Jugendliche Gefahren oft?', zeilen: 2, l: 'Der Teil des Gehirns, der plant und Folgen abschätzt, ist erst mit etwa Mitte zwanzig fertig; das Risiko fühlt sich aufregend an.' }, { f: 'Warum gehen Jugendliche in der Gruppe mehr Risiken ein?', zeilen: 2, l: 'Sie wollen dazugehören, nicht als Feigling dastehen und Anerkennung bekommen (Gruppendruck).' }] },
        { art: 'tabelle', auftrag: 'Gesundes Risiko oder gefährliche Mutprobe?', stufe: 2, kopf: ['', 'gesundes Risiko', 'gefährlich'], breiten: [60, 20, 20], zeilen: [['im Schultheater mitspielen', '[x]', ''], ['im Dunkeln über Bahngleise laufen', '', '[x]'], ['einen Kletterkurs mit Sicherung machen', '[x]', ''], ['eine gefährliche Challenge aus dem Internet nachmachen', '', '[x]'], ['beim Fußball ins Tor gehen, obwohl man nervös ist', '[x]', '']] },
      ],
    },
    hoeren: {
      was: 'Eine Geschichte', wo: 'Erzählung', titel: 'Die Brücke',
      situation: 'Tom erzählt von einem Nachmittag am Fluss mit seiner Clique.',
      bild: ['tom:nervoes:stehen', 'ben:froh:stehen'], sprecher: { Tom: 'm3', Erzähler: 'm1', Ben: 'm2' },
      text: [
        ['Erzähler', 'Es ist heiß. Tom, Ben und ein paar andere stehen auf der alten Brücke über dem Fluss. Unten ist das Wasser grün und man sieht nicht, wie tief es ist.'],
        ['Ben', 'Wer springt als Erster? Wer sich nicht traut, ist ein Baby!'],
        ['Tom', 'Ich weiß nicht … Man sieht ja gar nicht, wie tief es ist. Und da unten sind vielleicht Steine.'],
        ['Erzähler', 'Alle lachen. Jemand filmt schon. Tom spürt, wie sein Herz klopft. Er will nicht der Feigling sein.'],
        ['Tom', 'Ich springe nicht. Und du solltest auch nicht springen, Ben. Letztes Jahr hat sich hier einer schwer verletzt.'],
        ['Erzähler', 'Ben zögert. Dann sagt ein Mädchen aus der Gruppe: „Tom hat recht. Wir gehen lieber ins Freibad.“ Einer nach dem anderen nickt. Am Abend schreibt Ben Tom: „Gut, dass du was gesagt hast. Ich hatte auch Schiss.“'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „Schiss haben“ (Umgangssprache)? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Angst haben', 'Hunger haben'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Man kann sehen, wie tief das Wasser ist.', false], ['Jemand filmt die Szene.', true], ['Tom springt am Ende doch.', false], ['Auch Ben hatte Angst.', true]] },
        { art: 'fragen', auftrag: 'Warum war Toms Nein mutig?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Er hat sich gegen die Gruppe gestellt, obwohl alle lachten und filmten; er hat andere geschützt.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was hat der Gruppe geholfen, umzudenken? Was hätte noch helfen können?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Geholfen hat, dass …', 'Man hätte auch …', 'In so einer Situation würde ich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Warum Risiko reizt', punkte: ['Gehirn: **Belohnung** stark, **Folgen abschätzen** noch im Aufbau', '**Gruppendruck**: dazugehören wollen', 'Anerkennung, **Likes**'] },
         { titel: 'Echter Mut', punkte: ['**Nein** sagen', 'sich **gegen die Gruppe** stellen', 'anderen **helfen**', 'gesunde Risiken: Bühne, Sport, Neues'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Dilemma-Karten: Zieht eine Karte. Was würdet ihr tun? Was wäre mutig? Begründet.', stufe: 3, neueSeite: true, titel: 'Was tust du?', icon: 'arrows-split-2', farbe: DILEMMA, spalten: 2, typ: 'dilemma',
        karten: [
          { text: 'Deine Clique will im Supermarkt etwas klauen – „nur zum Spaß“.', frage: 'Machst du mit?' },
          { text: 'Ein Freund will eine gefährliche Challenge filmen und posten. Er fragt dich, ob du filmst.', frage: 'Was sagst du?' },
          { text: 'Alle springen vom 5-Meter-Turm. Du hast Angst.', frage: 'Springst du?' },
          { text: 'Ein älterer Jugendlicher bietet dir an, auf seinem Mofa mitzufahren – ohne Helm.', frage: 'Steigst du auf?' },
          { text: 'Jemand wird ausgelacht. Wenn du etwas sagst, lachen sie vielleicht über dich.', frage: 'Was tust du?' },
          { text: 'Deine Freundin will nachts heimlich zu einer Party. Sie bittet dich, für sie zu lügen.', frage: 'Hilfst du ihr?' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe eine Nachricht an Tom aus der Geschichte. Was denkst du über sein Verhalten?', stufe: 2,
        anfaenge: ['Hey Tom,', 'ich finde, …', 'Besonders mutig war …', 'Ich hätte …'], zeilen: 6,
        beispiel: 'Hey Tom, ich finde, du hast alles richtig gemacht. Besonders mutig war, dass du Nein gesagt hast, obwohl alle gelacht und gefilmt haben. Ich hätte mich vielleicht nicht getraut. Aber jetzt weiß ich: Man ist nie allein, oft denken die anderen dasselbe.' },
    ],
    check: ['Ich erkläre, warum Jugendliche Risiken eingehen.', 'Ich unterscheide gesunde und gefährliche Risiken.', 'Ich erkenne, dass Nein sagen mutig sein kann.'],
  },
  // ================================================================ 3
  {
    thema: 'Freiheit und Abhängigkeit · Sucht', titel: 'Frei oder abhängig?', untertitel: 'Ich entscheide selbst – oder doch nicht? Du philosophierst über Freiheit, liest, wie Abhängigkeit unfrei macht, und machst einen ehrlichen Selbst-Check.',
    ziel: { de: 'Ich erkläre, wie Abhängigkeit die Freiheit einschränkt, und denke über meine eigenen Gewohnheiten nach.', fr: 'J’explique comment la dépendance limite la liberté et je réfléchis à mes propres habitudes.' },
    bild: ['finn:verwirrt:handy', 'lehrerin:ruhig:erklaeren'],
    start: {
      was: 'Frei sein',
      aufgaben: [
        { art: 'fragen', auftrag: 'Wann fühlst du dich frei? Schreibe ein oder zwei Beispiele. (Du kannst auch an eine ausgedachte Person denken.)', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Individuelle Antworten, z. B. in den Ferien, beim Radfahren, wenn ich selbst entscheiden darf.' }] },
      ],
    },
    lesen: {
      was: 'Ein Philosophie-Text', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Text zum Nachdenken (vereinfacht)', titel: 'Wer entscheidet eigentlich?',
      absaetze: [
        'Frei sein heißt: selbst entscheiden können, was man tut. Aber sind wir wirklich so frei? Stell dir vor, du nimmst „nur kurz“ das Handy – und eine Stunde später scrollst du immer noch. Wer hat da entschieden: du oder die App?',
        '### Wenn etwas über mich bestimmt',
        'Bei einer **Abhängigkeit** (Sucht) bestimmt ein Stoff oder ein Verhalten immer mehr über einen Menschen: Nikotin, Alkohol, andere Drogen, aber auch Glücksspiel oder Computerspiele. Auch bei sozialen Netzwerken kann es schwer werden aufzuhören. Man will aufhören, aber es klappt nicht. Man denkt ständig daran. Andere wichtige Dinge werden unwichtig.',
        'Darum sagen viele: **Sucht macht unfrei.** Am Anfang fühlt es sich wie Freiheit an („Ich mache, was ich will!“). Später merkt man, dass man nicht mehr frei entscheiden kann.',
        '### Freiheit üben',
        'Freiheit kann man üben: bewusst Pausen machen, Nein sagen können, sich fragen „Will ich das wirklich – oder will es nur die Gewohnheit?“. Freiheit heißt auch **Verantwortung**: für sich selbst und für die anderen.',
      ],
      woerter: [['die Freiheit', 'la liberté'], ['frei / unfrei', 'libre / pas libre'], ['die Abhängigkeit', 'la dépendance'], ['bestimmen über', 'décider de, contrôler'], ['scrollen', 'faire défiler'], ['bewusst', 'consciemment'], ['die Gewohnheit', 'l’habitude'], ['die Verantwortung', 'la responsabilité']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte.', stufe: 2, fragen: [{ f: 'Warum fühlt sich eine Sucht am Anfang wie Freiheit an?', zeilen: 2, l: 'Man denkt: Ich mache, was ich will. Erst später merkt man, dass man nicht mehr frei entscheiden kann.' }, { f: 'Wie kann man Freiheit „üben“?', zeilen: 2, l: 'bewusst Pausen machen, Nein sagen, sich fragen, ob man etwas wirklich will' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Klasse · Projekt „Handyfasten“', titel: 'Drei Tage ohne',
      situation: 'Die Klasse hat drei Tage „Handyfasten“ ausprobiert: Das Handy durfte nur zum Telefonieren und für Schulsachen benutzt werden.',
      bild: ['finn:muede:stehen', 'lehrerin:froh:erklaeren'], sprecher: { Lehrerin: 'w1', Finn: 'm3', Jana: 'w2' },
      text: [
        ['Lehrerin', 'Wie war das Handyfasten?'],
        ['Finn', 'Am ersten Tag schlimm. Ich habe ständig in die Tasche gegriffen, obwohl das Handy gar nicht da war. Wie automatisch.'],
        ['Jana', 'Ich hatte Angst, etwas zu verpassen. Was, wenn im Chat etwas Wichtiges passiert?'],
        ['Lehrerin', 'Und? Ist etwas passiert?'],
        ['Jana', 'Nein. Hundert Nachrichten, aber nichts Wichtiges. Ein bisschen enttäuschend, ehrlich gesagt.'],
        ['Finn', 'Am dritten Tag habe ich ein Buch gelesen. Ganz. Das habe ich seit Jahren nicht gemacht. Und ich habe besser geschlafen.'],
        ['Lehrerin', 'Was nehmt ihr mit?'],
        ['Jana', 'Ich schalte jetzt die Benachrichtigungen aus. Dann entscheide ich, wann ich schaue – nicht das Handy.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist „Handyfasten“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Zeit lang das Handy kaum benutzen', 'beim Essen das Handy anschauen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was haben Finn und Jana erlebt?', stufe: 1, kopf: ['', 'Finn', 'Jana'], breiten: [24, 38, 38], zeilen: [['am Anfang', '[griff ständig automatisch in die Tasche]', '[Angst, etwas zu verpassen]'], ['Erfahrung', '[ein ganzes Buch gelesen, besser geschlafen]', '[viele Nachrichten, nichts Wichtiges]'], ['nimmt mit', '–', '[Benachrichtigungen ausschalten: sie entscheidet, wann sie schaut]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Würdet ihr Handyfasten ausprobieren? Was wäre am schwersten?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Am schwersten wäre …', 'Ich könnte mir vorstellen, …', 'Ein guter Kompromiss wäre …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Abhängigkeit', punkte: ['ein Stoff oder Verhalten **bestimmt** über mich', 'aufhören **klappt nicht**', 'Wichtiges wird **unwichtig**', '**Sucht macht unfrei.**'] },
         { titel: 'Freiheit üben', punkte: ['bewusst **Pausen**', '**Nein** sagen können', 'fragen: **Will ich das wirklich?**', 'Hilfe holen ist **kein Versagen**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Ehrlicher Selbst-Check (nur für dich – niemand muss es sehen): Wie frei bin ich bei diesen Gewohnheiten?', stufe: 2, kopf: ['Gewohnheit', 'ich entscheide', 'teils, teils', 'sie entscheidet'], breiten: [40, 20, 20, 20], zeilen: [['Handy am Morgen', '', '', ''], ['Süßes und Snacks', '', '', ''], ['Videos und Serien', '', '', ''], ['Spiele', '', '', ''], ['eine eigene Gewohnheit:', '', '', '']] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Ein Mensch ist frei, wenn er tun kann, was er will.', 'Apps sollten so gebaut werden, dass man leicht aufhören kann.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Was bedeutet Freiheit für dich? Schreibe einen kurzen Text. Benutze die Wörter „frei“, „abhängig“ und „Verantwortung“.', stufe: 3,
        anfaenge: ['Für mich bedeutet Freiheit …', 'Unfrei fühle ich mich, wenn …', 'Verantwortung heißt …'], zeilen: 7,
        beispiel: 'Für mich bedeutet Freiheit, dass ich selbst entscheiden kann, was mir wichtig ist. Unfrei fühle ich mich, wenn ich etwas tue, obwohl ich es eigentlich nicht will, zum Beispiel stundenlang Videos schauen. Abhängig möchte ich von nichts sein. Verantwortung heißt für mich, dass ich mit meiner Freiheit so umgehe, dass es mir und anderen gut geht.' },
    ],
    check: ['Ich erkläre, wie Abhängigkeit unfrei macht.', 'Ich denke ehrlich über meine Gewohnheiten nach.', 'Ich verbinde Freiheit mit Verantwortung.'],
  },
  // ================================================================ 4
  {
    thema: 'Liebe ist …? · Freundschaft · Verliebtsein', titel: 'Liebe ist …?', untertitel: 'Schmetterlinge im Bauch, Liebeskummer, Liebe zu Freunden, zu Tieren, zur Musik: Du liest Gedanken über die Liebe, hörst ein Gespräch über Liebeskummer und schreibst ein Elfchen.',
    ziel: { de: 'Ich beschreibe verschiedene Arten von Liebe und spreche respektvoll über Gefühle.', fr: 'Je décris différentes formes d’amour et je parle des sentiments avec respect.' },
    bild: ['mia:ruhig:stehen', 'lea:froh:stehen'],
    start: {
      was: 'Liebe ist …',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Woran denkst du bei „Liebe“? Sammle Wörter.', stufe: 1, mitte: 'Liebe', aeste: ['Herzklopfen', { l: 'Vertrauen' }, { l: 'Freundschaft' }, { l: 'Familie' }, { l: 'Liebeskummer' }, { l: 'Haustier' }] },
      ],
    },
    lesen: {
      was: 'Gedanken über die Liebe', art: 'profile', stimme: 'w1',
      quelle: 'Aus einer Umfrage der Schülerzeitung (Jugendliche ausgedacht)', titel: 'Was ist Liebe?',
      profile: [
        { name: 'Mia, 13', bild: 'mia:ruhig:brust', stimme: 'w3', text: 'Liebe ist, wenn man an jemanden denkt und dabei lächelt. Ich war mal verliebt. Mein Bauch hat gekribbelt, und ich habe kein Wort herausbekommen. **Verliebtsein ist schön und peinlich zugleich.**' },
        { name: 'Yusuf, 14', bild: 'yusuf:froh:brust', stimme: 'm3', text: 'Für mich ist Liebe auch Freundschaft. Mein bester Freund und ich kennen uns seit dem Kindergarten. Er weiß alles über mich und hält trotzdem zu mir. **Das ist auch Liebe, nur ohne Kitsch.**' },
        { name: 'Lea, 14', bild: 'lea:froh:brust', stimme: 'w2', text: 'Ich finde, Liebe heißt: Man will, dass es dem anderen gut geht – auch wenn man selbst nichts davon hat. Ich liebe meinen Hund. Und meine Gitarre, haha. **Liebe hat viele Gesichter.**' },
      ],
      woerter: [['die Liebe', 'l’amour'], ['verliebt sein', 'être amoureux'], ['kribbeln', 'picoter, chatouiller'], ['peinlich', 'gênant'], ['zu jemandem halten', 'soutenir qn'], ['der Kitsch', 'la mièvrerie'], ['der Liebeskummer', 'le chagrin d’amour'], ['das Gesicht (hier: die Form)', 'le visage (ici : la forme)']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was bedeutet Liebe für wen? Ergänze.', stufe: 1, kopf: ['Wer?', 'Liebe ist …', 'Art der Liebe'], breiten: [16, 54, 30], zeilen: [['Mia', '[an jemanden denken und lächeln; Bauchkribbeln]', '[Verliebtsein]'], ['Yusuf', '[jemand weiß alles über dich und hält zu dir]', '[Freundschaft]'], ['Lea', '[wollen, dass es dem anderen gut geht]', '[Liebe zu Tier, Hobby, Menschen]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Parkbank · nach der Schule', titel: 'Liebeskummer',
      situation: 'Mia ist traurig. Ihre Freundin Lea setzt sich zu ihr.',
      bild: ['mia:traurig:sitzen', 'lea:ruhig:stehen'], sprecher: { Lea: 'w2', Mia: 'w3' },
      text: [
        ['Lea', 'Hey, was ist los? Du siehst traurig aus.'],
        ['Mia', 'Ich habe Noah geschrieben, dass ich ihn mag. Er hat geantwortet: „Du bist echt nett, aber ich sehe dich nur als Freundin.“'],
        ['Lea', 'Oh nein. Das tut weh. Komm her.'],
        ['Mia', 'Ich schäme mich so. Morgen sehe ich ihn in der Schule!'],
        ['Lea', 'Du musst dich nicht schämen. Du warst mutig und ehrlich. Und Noah war auch ehrlich – und freundlich.'],
        ['Mia', 'Trotzdem fühlt es sich an, als ob die Welt untergeht.'],
        ['Lea', 'Das ist Liebeskummer. Der ist richtig schlimm, aber er geht vorbei. Weißt du was? Wir gehen jetzt Eis essen, und du darfst so viel über ihn schimpfen, wie du willst. Aber nur nett schimpfen!'],
        ['Mia', '(lacht) Okay. Danke, dass du da bist.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was hilft bei Liebeskummer? Kreuze an, was du denkst (mehrere möglich).', stufe: 1, fragen: [{ f: '', o: ['mit jemandem reden', 'Zeit', 'sich ablenken', 'den anderen online fertigmachen'], r: [0, 1, 2] }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Noah hat Mia ausgelacht.', false], ['Noah sieht Mia als Freundin.', true], ['Lea findet, dass Mia mutig war.', true], ['Lea sagt, Liebeskummer geht nie vorbei.', false]] },
        { art: 'fragen', auftrag: 'Wie hilft Lea ihrer Freundin? Nenne zwei Dinge.', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Sie hört zu, tröstet sie, sagt ihr, dass sie sich nicht schämen muss, lädt sie zum Eis ein.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was kann man sagen, wenn man jemanden nicht „auf diese Art“ mag – ehrlich und freundlich?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Danke, dass du mir das sagst.', 'Ich mag dich, aber …', 'Ich hoffe, wir bleiben …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Liebe hat viele Gesichter', punkte: ['**Verliebtsein**: Herzklopfen, Bauchkribbeln', '**Freundschaft**: Vertrauen, zueinander halten', 'Liebe zu **Familie**, **Tieren**, **Hobbys**', 'Jeder darf lieben, **wen** er oder sie liebt.'] },
         { titel: 'Respekt', punkte: ['Gefühle **ernst nehmen**', 'ein Nein **akzeptieren**', 'nicht auslachen, nicht **bloßstellen**', 'Liebeskummer **geht vorbei**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Gesprächskarten „Liebe ist …?“: Zieht eine Karte und philosophiert. Niemand muss von sich erzählen.', stufe: 2, neueSeite: true, titel: 'Liebe ist …?', icon: 'heart', farbe: MUT, spalten: 2,
        karten: [
          { text: 'Kann man jemanden lieben, den man noch nie getroffen hat?' }, { text: 'Ist Eifersucht ein Zeichen von Liebe?' },
          { text: 'Kann Freundschaft stärker sein als Verliebtsein?' }, { text: 'Muss man sich lieben, um zusammen zu sein?' },
          { text: 'Kann man sich in ein Haustier oder ein Hobby „verlieben“?' }, { text: 'Was ist das Gegenteil von Liebe?' },
          { text: 'Hört Liebe irgendwann auf?' }, { text: 'Kann man lernen zu lieben?' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe ein Elfchen über die Liebe (oder Freundschaft). Ein Elfchen hat elf Wörter: 1 – 2 – 3 – 4 – 1.', stufe: 2,
        zeilenAnfaenge: ['1 Wort: …', '2 Wörter: …', '3 Wörter: …', '4 Wörter: …', '1 Wort: …'], zeilen: 5,
        beispiel: 'Freundschaft / immer da / auch beim Streit / du hältst zu mir / Glück' },
    ],
    check: ['Ich beschreibe verschiedene Arten von Liebe.', 'Ich weiß, wie man mit Liebeskummer umgehen kann.', 'Ich spreche respektvoll über Gefühle.'],
  },
  // ================================================================ 5
  {
    thema: 'Geschlechterrollen · Klischees', titel: 'Typisch Junge? Typisch Mädchen?', untertitel: '„Jungen weinen nicht“, „Mädchen können kein Mathe“: Du prüfst Klischees, hörst eine Diskussion über Berufe und gestaltest Rollen-Karten.',
    ziel: { de: 'Ich erkenne Klischees über Geschlechter und begründe, warum jeder Mensch seinen eigenen Weg gehen darf.', fr: 'Je reconnais les clichés sur les genres et j’explique pourquoi chacun peut suivre son propre chemin.' },
    bild: ['ben:froh:stehen', 'chloe:froh:stehen'],
    start: {
      was: 'Typisch?',
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was hört man oft? Kreuze an, ob du das schon gehört hast.', stufe: 1, kopf: ['Satz', 'schon gehört', 'noch nie'], breiten: [64, 18, 18], zeilen: [['„Jungen weinen nicht.“', '', ''], ['„Mädchen sind schlecht in Technik.“', '', ''], ['„Rosa ist eine Mädchenfarbe.“', '', ''], ['„Jungen müssen stark sein.“', '', '']] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Wer sagt, was typisch ist?',
      absaetze: [
        'Viele Menschen haben Vorstellungen davon, wie Jungen und Mädchen, Männer und Frauen „sein sollen“. Das nennt man **Geschlechterrollen**. Werden sie sehr vereinfacht und auf alle übertragen, spricht man von **Klischees**.',
        '### Rollen ändern sich',
        'Vor gut 100 Jahren galt Rosa in Europa manchmal als Jungenfarbe. Früher durften Frauen in Luxemburg nicht wählen – das änderte sich erst **1919**. Lange waren viele Berufe nur für Männer. Heute gibt es Pilotinnen, Bauarbeiterinnen und Bürgermeisterinnen, Erzieher, Krankenpfleger und Hausmänner. Rollen sind also nicht von Natur aus festgelegt. Menschen machen sie – und können sie ändern.',
        '### Warum Klischees schaden',
        'Klischees können einengen: Ein Junge traut sich nicht zu weinen oder zu tanzen. Ein Mädchen wählt keinen Technikberuf, obwohl sie Technik liebt. Wer nicht ins Bild passt, wird manchmal ausgelacht.',
        '### Jeder Mensch ist anders',
        'Menschen sind verschieden – auch innerhalb einer Gruppe. Manche Menschen fühlen sich auch weder ganz als Junge noch ganz als Mädchen. Wichtig ist: Jeder Mensch darf seine **Stärken**, **Interessen** und **Gefühle** zeigen, egal welches Geschlecht er hat.',
      ],
      woerter: [['das Geschlecht', 'le sexe, le genre'], ['die Rolle', 'le rôle'], ['das Klischee', 'le cliché'], ['einengen', 'limiter, restreindre'], ['festlegen', 'fixer'], ['die Bürgermeisterin', 'la bourgmestre, la maire'], ['der Krankenpfleger', 'l’infirmier'], ['gleichberechtigt', 'égal en droits']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Rosa war früher manchmal eine Jungenfarbe.', true], ['Frauen dürfen in Luxemburg seit 1919 wählen.', true], ['Geschlechterrollen sind von Natur aus festgelegt.', false], ['Klischees können Menschen einengen.', true]] },
        { art: 'fragen', auftrag: 'Nenne ein Beispiel, wie ein Klischee einen Menschen einengen kann.', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'z. B. Ein Junge traut sich nicht zu weinen; ein Mädchen wählt keinen Technikberuf, obwohl sie Technik liebt.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Diskussion', wo: 'Berufsorientierung · Klasse 6P1', titel: 'Kfz-Mechatronikerin und Erzieher',
      situation: 'Chloé will Kfz-Mechatronikerin werden, Ben Erzieher. In der Klasse gibt es Sprüche.',
      bild: ['chloe:froh:stehen', 'ben:verlegen:stehen'], sprecher: { Chloé: 'w3', Ben: 'm3', Sami: 'm2', 'Frau Sommer': 'w1' },
      text: [
        ['Sami', 'Chloé will Autos reparieren? Dann ist sie ja immer voll Öl. Und Ben will mit Kindern spielen? Das ist doch kein Männerberuf!'],
        ['Chloé', 'Ich schraube, seit ich zehn bin, mit meiner Nachbarin an Mopeds. Das macht mir Spaß. Und Öl kann man abwaschen.'],
        ['Ben', 'Und ich kann gut mit Kleinen umgehen. Ich trainiere schon die Bambini im Fußball. Die Kinder lieben mich.'],
        ['Frau Sommer', 'Sami, was macht einen guten Erzieher aus?'],
        ['Sami', 'Hm … Geduld, Spaß mit Kindern, ruhig bleiben.'],
        ['Frau Sommer', 'Und hat das etwas mit Junge oder Mädchen zu tun?'],
        ['Sami', 'Nein … eigentlich nicht. Okay, sorry, Ben. Und Chloé – wenn mein Mofa kaputt ist, komme ich zu dir.'],
        ['Chloé', 'Gern. Aber ich nehme Geld dafür!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht eine Kfz-Mechatronikerin? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie repariert und prüft Fahrzeuge.', 'Sie verkauft Kleidung.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['', 'Chloé', 'Ben'], breiten: [24, 38, 38], zeilen: [['Berufswunsch', '[Kfz-Mechatronikerin]', '[Erzieher]'], ['Warum passt das?', '[schraubt seit sie zehn ist an Mopeds, macht Spaß]', '[kann gut mit Kleinen umgehen, trainiert die Bambini]']] },
        { art: 'fragen', auftrag: 'Was hat Sami am Ende verstanden?', stufe: 2, fragen: [{ f: '', l: 'Dass Eigenschaften für einen Beruf nichts mit dem Geschlecht zu tun haben.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Kennt ihr Menschen, die einen „untypischen“ Beruf oder ein „untypisches“ Hobby haben? Erzählt (ohne Namen, wenn ihr wollt).', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich kenne jemanden, der …', 'Ich finde das …, weil …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Rollen und Klischees', punkte: ['**Rollen**: Vorstellungen, wie jemand sein soll', '**Klischee**: stark vereinfacht, für alle', 'Rollen sind **gemacht** – und **veränderbar**', 'Frauenwahlrecht in Luxemburg: **1919**'] },
         { titel: 'Jeder Mensch darf …', punkte: ['seine **Interessen** verfolgen', '**Gefühle** zeigen', 'jeden **Beruf** lernen', 'so sein, **wie er oder sie ist**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Klischee-Karten: Lest jede Karte. Stimmt das für alle? Findet ein Gegenbeispiel und schreibt es auf die Karte.', stufe: 2, neueSeite: true, titel: 'Stimmt das?', icon: 'help-circle', farbe: FRAGE, spalten: 2,
        karten: [
          { text: '„Jungen können nicht trösten.“', linien: 2, frage: 'Gegenbeispiel:' },
          { text: '„Mädchen mögen keinen Fußball.“', linien: 2, frage: 'Gegenbeispiel:' },
          { text: '„Männer kochen nicht.“', linien: 2, frage: 'Gegenbeispiel:' },
          { text: '„Frauen können nicht einparken.“', linien: 2, frage: 'Gegenbeispiel:' },
          { text: '„Jungen spielen nicht mit Puppen.“', linien: 2, frage: 'Gegenbeispiel:' },
          { text: '„Mädchen sind schlecht in Informatik.“', linien: 2, frage: 'Gegenbeispiel:' },
        ] },
      { art: 'meinungslinie', auftrag: 'Was denkst du? Begründe.', stufe: 3, aussagen: ['Jungen und Mädchen sollten in der Schule alles gemeinsam machen, auch im Sport.'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Text: „Ich darf sein, wie ich bin“ – über dich oder eine ausgedachte Person. Was passt nicht zu den Klischees, und warum ist das gut so?', stufe: 2,
        anfaenge: ['Viele denken, … ist typisch für …', 'Aber …', 'Ich finde, …'], zeilen: 7,
        beispiel: 'Viele denken, dass Jungen nicht gern tanzen. Aber mein ausgedachter Freund Leo tanzt seit fünf Jahren Ballett und ist richtig gut darin. Am Anfang haben ihn manche ausgelacht, heute bewundern sie seine Sprünge. Ich finde, jeder sollte das machen dürfen, was ihm Freude macht.' },
    ],
    check: ['Ich erkenne Klischees über Geschlechter.', 'Ich erkläre, dass Rollen veränderbar sind.', 'Ich begründe, warum jeder seinen Weg gehen darf.'],
  },
  // ================================================================ 6
  {
    thema: 'Jung und Alt · Generationen', titel: 'Jung trifft Alt', untertitel: 'Was können Jung und Alt voneinander lernen? Du prüfst Vorurteile über Generationen, hörst ein Generationen-Projekt und planst eine Begegnung.',
    ziel: { de: 'Ich beschreibe, was Generationen voneinander lernen können, und hinterfrage Vorurteile über Alter.', fr: 'Je décris ce que les générations peuvent apprendre les unes des autres et je remets en question les préjugés liés à l’âge.' },
    bild: ['opa:froh:stehen', 'lio:froh:handy'],
    start: {
      was: 'Alt ist …',
      aufgaben: [
        { art: 'mc', auftrag: 'Ab wann ist man „alt“? Kreuze an, was du denkst. (Es gibt kein Richtig oder Falsch.)', stufe: 1, fragen: [{ f: '', o: ['ab 30', 'ab 50', 'ab 70', 'Das hängt nicht vom Alter ab.'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Vier Generationen',
      absaetze: [
        'Heute leben oft **vier Generationen** gleichzeitig: Kinder, Eltern, Großeltern und Urgroßeltern. Die Menschen werden älter als früher. In Luxemburg werden Neugeborene heute im Durchschnitt über 80 Jahre alt.',
        '### Vorurteile in beide Richtungen',
        'Über Ältere hört man oft: „Die verstehen keine Technik“, „Die sind langweilig“. Über Jugendliche heißt es: „Die hängen nur am Handy“, „Die haben keinen Respekt“. Solche Sätze sind **Vorurteile**: Sie stimmen für manche, aber nicht für alle.',
        '### Voneinander lernen',
        'Jung und Alt können viel voneinander lernen. Ältere haben **Erfahrung**: Sie haben Krisen überstanden, kennen alte Rezepte, Handwerk und Geschichten von früher. Jüngere kennen sich mit **neuen Medien** aus, haben frische Ideen und Energie. Wenn sie sich begegnen, verschwinden viele Vorurteile von selbst.',
        'Viele Gemeinden, Schulen und Seniorenheime in Luxemburg haben Projekte, bei denen sich die Generationen treffen: Erzählcafés, Handy-Kurse von Jugendlichen für Senioren, gemeinsames Gärtnern oder Kochen.',
      ],
      woerter: [['die Generation', 'la génération'], ['die Großeltern', 'les grands-parents'], ['der Durchschnitt', 'la moyenne'], ['das Vorurteil', 'le préjugé'], ['die Erfahrung', 'l’expérience'], ['die Krise', 'la crise'], ['der Senior / die Seniorin', 'la personne âgée'], ['die Begegnung', 'la rencontre']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Was können Jung und Alt voneinander lernen? Ergänze.', stufe: 1, kopf: ['Ältere können Jüngeren zeigen …', 'Jüngere können Älteren zeigen …'], breiten: [50, 50], zeilen: [['[z. B. alte Rezepte, Handwerk]', '[z. B. Handy, Videoanrufe]'], ['[z. B. Geschichten von früher]', '[z. B. neue Musik, Spiele]'], ['[z. B. wie man Krisen übersteht]', '[z. B. frische Ideen]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Seniorenheim · Handy-Kurs', titel: 'Wie schickt man ein Foto?',
      situation: 'Lio gibt im Seniorenheim einen Handy-Kurs. Er hilft Herrn Thill.',
      bild: ['lio:froh:handy', 'opa:verwirrt:sitzen'], sprecher: { Lio: 'm3', 'Herr Thill': 'm1' },
      text: [
        ['Herr Thill', 'Junger Mann, ich möchte meiner Enkelin in Kanada ein Foto schicken. Aber dieses Ding versteht mich nicht.'],
        ['Lio', 'Kein Problem. Tippen Sie hier auf die Kamera. Und jetzt auf den runden Knopf.'],
        ['Herr Thill', 'So? Oh, jetzt habe ich meinen Daumen fotografiert.'],
        ['Lio', 'Haha, das passiert allen. Noch mal, ein bisschen höher halten.'],
        ['Herr Thill', 'Geschafft! Und jetzt schicken?'],
        ['Lio', 'Genau, hier auf den Pfeil. Fertig! Sie hat es schon gesehen.'],
        ['Herr Thill', 'Wunderbar! Weißt du, Lio, als ich so alt war wie du, haben wir Briefe geschrieben. Ein Brief nach Kanada war drei Wochen unterwegs.'],
        ['Lio', 'Drei Wochen? Krass. Erzählen Sie mir nächstes Mal davon? Dann zeige ich Ihnen Videoanrufe.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Videoanruf? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Anruf, bei dem man sich sieht', 'ein Film im Kino'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Herr Thill möchte seiner Enkelin ein Foto schicken.', true], ['Zuerst fotografiert er seinen Daumen.', true], ['Ein Brief nach Kanada war früher drei Tage unterwegs.', false], ['Lio will nächstes Mal Videoanrufe zeigen.', true]] },
        { art: 'fragen', auftrag: 'Was lernen Lio und Herr Thill voneinander?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Herr Thill lernt, ein Foto zu schicken; Lio erfährt, wie man früher Briefe geschrieben hat.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was würdet ihr gern von einem älteren Menschen lernen? Was könntet ihr zeigen?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Ich würde gern lernen, wie …', 'Ich könnte zeigen, wie …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Generationen', punkte: ['oft **vier Generationen** gleichzeitig', 'Menschen werden **älter** als früher', 'Vorurteile gibt es **in beide Richtungen**'] },
         { titel: 'Voneinander lernen', punkte: ['Ältere: **Erfahrung**, Geschichten, Handwerk', 'Jüngere: **neue Medien**, Ideen, Energie', '**Begegnung** baut Vorurteile ab'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Fragekarten für ein Erzählcafé: Schneidet die Karten aus. Nehmt sie mit, wenn ihr eine ältere Person interviewt (zum Beispiel im Seniorenheim). Schreibt eigene Fragen auf die leeren Karten.', stufe: 2, neueSeite: true, titel: 'Frag mal!', icon: 'messages', farbe: IDEE, spalten: 2,
        karten: [
          { text: 'Wie war Ihre Schule früher?' }, { text: 'Was haben Sie als Jugendliche(r) in der Freizeit gemacht?' },
          { text: 'Was war Ihr erster Beruf?' }, { text: 'Was hat sich am meisten verändert?' },
          { text: 'Was möchten Sie jungen Menschen heute raten?' }, { text: 'Was finden Sie an der heutigen Zeit gut?' },
          { text: ' ', linien: 2 }, { text: ' ', linien: 2 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Plane eine Begegnung zwischen deiner Klasse und älteren Menschen. Was macht ihr? Was lernt jede Seite?', stufe: 2,
        anfaenge: ['Unsere Idee: …', 'Wir treffen uns …', 'Die Älteren können uns …', 'Wir können ihnen …'], zeilen: 7,
        beispiel: 'Unsere Idee: ein Koch-Nachmittag im Seniorenheim. Wir treffen uns an einem Mittwochnachmittag in der Küche. Die Älteren können uns ein altes luxemburgisches Rezept zeigen, zum Beispiel Gromperekichelcher. Wir können ihnen zeigen, wie man das Rezept filmt und an die Familie schickt.' },
    ],
    check: ['Ich nenne Vorurteile über Jung und Alt.', 'Ich beschreibe, was Generationen voneinander lernen können.', 'Ich plane eine Begegnung.'],
  },
  // ================================================================ 7
  {
    thema: 'Körperbild · Schönheitsideale · Selbstwert', titel: 'Mein Körper, mein Wert', untertitel: 'Schönheitsideale ändern sich, Werbung und Filter zeigen Unmögliches: Du denkst über Schönheit nach, hörst ein Gespräch über Komplimente und sammelst Mutmach-Sätze.',
    ziel: { de: 'Ich erkläre, dass Schönheitsideale gemacht sind, und weiß, dass mein Wert nicht vom Aussehen abhängt.', fr: 'J’explique que les idéaux de beauté sont construits et je sais que ma valeur ne dépend pas de mon apparence.' },
    bild: ['jana:ruhig:stehen', 'amira:froh:stehen'],
    start: {
      was: 'Schön ist …',
      aufgaben: [
        { art: 'fragen', auftrag: 'Was findest du an einem Menschen schön – außer dem Aussehen? Schreibe drei Dinge.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Lachen, Humor, Freundlichkeit, Mut, Ehrlichkeit, Hilfsbereitschaft' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sachtext (vereinfacht)', titel: 'Schönheit verändert sich',
      absaetze: [
        'Was als „schön“ gilt, ist nicht immer gleich. Vor 400 Jahren malten Künstler in Europa gern Frauen mit runden Körpern – das galt als schön und gesund. In manchen Zeiten war blasse Haut modern, in anderen gebräunte. **Schönheitsideale** sind also nicht von Natur aus da. Menschen machen sie.',
        '### Unmögliche Bilder',
        'Heute sehen wir jeden Tag Hunderte Bilder in Werbung und sozialen Netzwerken. Viele sind **bearbeitet**: Beine länger, Haut glatter, Bauch flacher. Selbst die Models sehen in Wirklichkeit nicht so aus. Wer sich ständig mit solchen Bildern vergleicht, fühlt sich oft schlecht – obwohl der eigene Körper völlig in Ordnung ist.',
        '### Was mich wertvoll macht',
        'Der **Selbstwert** ist das Gefühl, als Mensch wertvoll zu sein. Er sollte nicht vom Aussehen abhängen. Ein Körper ist nicht nur zum Anschauen da: Er trägt uns, lässt uns tanzen, lachen, umarmen. Jeder Körper ist anders, und das ist gut so.',
        'Wenn sich jemand wegen seines Körpers sehr quält, zum Beispiel kaum noch isst oder sich ständig schlecht fühlt, sollte er mit einer Vertrauensperson sprechen. Hilfe gibt es auch bei **116 111**.',
      ],
      woerter: [['das Schönheitsideal', 'l’idéal de beauté'], ['blass', 'pâle'], ['gebräunt', 'bronzé'], ['bearbeiten', 'retoucher'], ['sich vergleichen', 'se comparer'], ['der Selbstwert', 'l’estime de soi'], ['wertvoll', 'précieux, qui a de la valeur'], ['sich quälen', 'se tourmenter']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Schönheitsideale sind immer gleich geblieben.', false], ['Viele Bilder in der Werbung sind bearbeitet.', true], ['Selbstwert sollte nicht vom Aussehen abhängen.', true], ['Ein Körper ist nur zum Anschauen da.', false]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Umkleide nach dem Sport', titel: 'Komplimente',
      situation: 'Jana ist nach dem Sport still. Amira fragt nach.',
      bild: ['jana:traurig:stehen', 'amira:froh:stehen'], sprecher: { Amira: 'w2', Jana: 'w3' },
      text: [
        ['Amira', 'Du bist so still. Alles okay?'],
        ['Jana', 'Ich finde mich heute einfach hässlich. Alle anderen sehen so gut aus in den Sportsachen.'],
        ['Amira', 'Echt? Du bist gerade fünf Runden ohne Pause gelaufen. Ich bin nach zwei fast gestorben!'],
        ['Jana', 'Haha. Aber das sieht man ja nicht.'],
        ['Amira', 'Doch, das sieht man: Du bist stark. Und weißt du, was ich an dir mag? Dass du immer alle zum Lachen bringst.'],
        ['Jana', 'Danke … Das ist lieb.'],
        ['Amira', 'Und ganz ehrlich: Die anderen denken bestimmt auch, sie sehen komisch aus. Das denken fast alle.'],
        ['Jana', 'Vielleicht sollten wir uns öfter sagen, was wir aneinander mögen. Nicht nur das Aussehen.'],
        ['Amira', 'Abgemacht. Also, was magst du an mir?'],
        ['Jana', 'Dass du mich gerade gerettet hast.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Kompliment? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwas Nettes, das man jemandem sagt', 'eine Beleidigung'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Warum ist Jana still?', l: 'Sie findet sich hässlich und vergleicht sich mit den anderen.' }, { f: 'Welche zwei Komplimente macht Amira?', zeilen: 2, l: 'Jana ist stark (fünf Runden gelaufen); sie bringt immer alle zum Lachen.' }, { f: 'Was schlägt Jana am Ende vor?', l: 'sich öfter sagen, was man aneinander mag – nicht nur das Aussehen' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum sind Komplimente, die nicht das Aussehen betreffen, oft wertvoller?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Weil …', 'Ein Beispiel ist …', 'Mir würde gefallen, wenn jemand sagt …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Schönheitsideale', punkte: ['**verändern sich** mit der Zeit', 'werden von Menschen **gemacht**', 'Bilder sind oft **bearbeitet**'] },
         { titel: 'Selbstwert', punkte: ['mein Wert hängt **nicht vom Aussehen** ab', 'Körper: **tragen, tanzen, lachen**', '**Komplimente** über Stärken und Charakter', 'Sorgen? **116 111**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Kompliment-Karten: Zieht drei Namen aus einer Dose und schreibt für diese Menschen ein Kompliment, das NICHT das Aussehen betrifft. Schneidet die Karten aus und verschenkt sie.', stufe: 2, neueSeite: true, titel: 'Für dich', icon: 'heart', farbe: MUT, spalten: 3,
        karten: [
          { text: 'Ich mag an dir, dass …', linien: 3, frage: 'von: …' }, { text: 'Ich mag an dir, dass …', linien: 3, frage: 'von: …' }, { text: 'Ich mag an dir, dass …', linien: 3, frage: 'von: …' },
          { text: 'Du kannst richtig gut …', linien: 3, frage: 'von: …' }, { text: 'Danke, dass du …', linien: 3, frage: 'von: …' }, { text: 'Mit dir macht es Spaß, …', linien: 3, frage: 'von: …' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen Brief an deinen Körper (oder an den Körper einer ausgedachten Person): Danke für das, was er alles kann.', stufe: 2,
        anfaenge: ['Lieber Körper,', 'danke, dass du …', 'Manchmal bin ich unfair zu dir, weil …', 'Ab jetzt …'], zeilen: 7,
        beispiel: 'Lieber Körper, danke, dass du mich jeden Tag zur Schule trägst, dass ich mit dir Fußball spielen und laut lachen kann. Manchmal bin ich unfair zu dir, weil ich dich mit Bildern aus dem Internet vergleiche. Ab jetzt will ich dich besser behandeln: genug schlafen, mich bewegen und nicht so streng mit dir sein.' },
    ],
    check: ['Ich erkläre, dass Schönheitsideale gemacht sind.', 'Ich weiß, dass mein Wert nicht vom Aussehen abhängt.', 'Ich mache Komplimente über Stärken.'],
  },
  // ================================================================ 8
  {
    thema: 'Sorgen · Hilfe holen · Vertrauenspersonen', titel: 'Hilfe holen ist stark', untertitel: 'Wenn Sorgen zu groß werden: Du lernst, wer helfen kann, hörst einen Anruf beim Kinder- und Jugendtelefon und gestaltest deine eigene Hilfe-Karte.',
    ziel: { de: 'Ich weiß, wo ich Hilfe bekomme, und erkläre, warum Hilfe holen stark ist.', fr: 'Je sais où trouver de l’aide et j’explique pourquoi demander de l’aide est une force.' },
    bild: ['yusuf:ruhig:stehen', 'lehrerin:ruhig:erklaeren'],
    start: {
      was: 'Sorgen-Rucksack',
      aufgaben: [
        { art: 'mc', auftrag: 'Welche Sorgen können Jugendliche haben? Kreuze an (mehrere möglich). Du musst nichts über dich sagen.', stufe: 1, fragen: [{ f: '', o: ['Streit mit Freunden', 'Druck in der Schule', 'Mobbing', 'Sorgen um jemanden', 'Liebeskummer', 'Angst vor der Zukunft'], r: [0, 1, 2, 3, 4, 5] }] },
      ],
    },
    lesen: {
      was: 'Ein Infotext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Infotext (vereinfacht, Stand 2026)', titel: 'Du musst das nicht allein schaffen',
      absaetze: [
        'Jeder Mensch hat manchmal Sorgen. Viele denken: „Ich muss das allein schaffen“ oder „Mein Problem ist nicht wichtig genug.“ Das stimmt nicht. **Hilfe holen ist kein Zeichen von Schwäche, sondern von Stärke.**',
        '### Wer kann helfen?',
        '**Vertrauenspersonen**: Freundinnen und Freunde, Familienmitglieder, Trainerinnen, Nachbarn. **In der Schule**: die Klassenlehrerin oder der Klassenlehrer, der psychosoziale Dienst der Schule (SePAS), die Krankenpflegerin oder der Krankenpfleger der Schule. **Am Telefon oder im Chat**: das Kinder- und Jugendtelefon **116 111** – kostenlos und anonym. Man muss seinen Namen nicht sagen. Bei Problemen im Internet: die **BEE SECURE Helpline 8002 1234**. **Im Notfall**, wenn jemand in Gefahr ist: **112** (Rettung) oder **113** (Polizei).',
        '### Wie fange ich an?',
        'Oft ist der erste Satz am schwersten. Er kann ganz einfach sein: „Kann ich kurz mit dir reden? Mir geht es nicht gut.“ Man kann auch einen Zettel schreiben oder eine Nachricht schicken.',
        '### Wenn ein Freund Sorgen hat',
        'Zuhören, ernst nehmen, nicht auslachen. Wenn es um etwas Gefährliches geht, zum Beispiel wenn jemand sich etwas antun will oder Gewalt erlebt, darf und muss man es einem Erwachsenen sagen – auch wenn man Geheimhaltung versprochen hat. Das ist kein Verrat, sondern Hilfe.',
      ],
      woerter: [['die Sorge', 'le souci'], ['die Vertrauensperson', 'la personne de confiance'], ['anonym', 'anonyme'], ['kostenlos', 'gratuit'], ['ernst nehmen', 'prendre au sérieux'], ['das Geheimnis', 'le secret'], ['der Verrat', 'la trahison'], ['die Stärke / die Schwäche', 'la force / la faiblesse']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wo bekommt man Hilfe? Verbinde.', stufe: 1, links: ['Mobbing im Klassenchat', 'Ich fühle mich seit Wochen traurig und will anonym reden.', 'Jemand ist verletzt und in Gefahr.', 'Ich will in der Schule mit einer Fachperson reden.'], rechts: ['BEE SECURE Helpline 8002 1234', 'Kinder- und Jugendtelefon 116 111', 'Notruf 112', 'psychosozialer Dienst der Schule (SePAS)'] },
      ],
    },
    hoeren: {
      was: 'Ein Anruf', wo: 'Kinder- und Jugendtelefon (nachgestellt)', titel: 'Ein Anruf bei 116 111',
      situation: 'Yusuf ruft beim Kinder- und Jugendtelefon an. (Das Gespräch ist ausgedacht.)',
      bild: ['yusuf:besorgt:handy', 'lehrerin:ruhig:erklaeren'], sprecher: { Beraterin: 'w1', Yusuf: 'm3' },
      text: [
        ['Beraterin', 'Kinder- und Jugendtelefon, hallo. Schön, dass du anrufst. Du musst deinen Namen nicht sagen.'],
        ['Yusuf', 'Hallo … Ich weiß nicht, ob das wichtig genug ist.'],
        ['Beraterin', 'Alles, was dich beschäftigt, ist wichtig genug. Erzähl, wenn du magst.'],
        ['Yusuf', 'Seit ein paar Wochen schreiben mir Leute aus meiner Klasse gemeine Nachrichten. Ich kann kaum noch schlafen. Ich will nicht mehr in die Schule.'],
        ['Beraterin', 'Das klingt wirklich belastend. Gut, dass du darüber sprichst. Weiß jemand davon, ein Erwachsener, dem du vertraust?'],
        ['Yusuf', 'Nein. Ich will nicht, dass es schlimmer wird.'],
        ['Beraterin', 'Das verstehe ich. Wir können zusammen überlegen, wem du es erzählen könntest und wie. Und die Nachrichten solltest du nicht löschen, sondern als Bildschirmfoto speichern. Die braucht man später als Beweis.'],
        ['Yusuf', 'Vielleicht meiner Klassenlehrerin. Sie ist okay.'],
        ['Beraterin', 'Das klingt nach einem guten ersten Schritt. Und du kannst jederzeit wieder anrufen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „anonym“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ohne seinen Namen zu sagen', 'sehr laut'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was ist Yusufs Problem?', l: 'Leute aus seiner Klasse schreiben ihm gemeine Nachrichten; er schläft schlecht und will nicht mehr zur Schule.' }, { f: 'Was soll er mit den Nachrichten machen?', l: 'nicht löschen, sondern als Bildschirmfoto speichern (als Beweis)' }, { f: 'Wem will er es erzählen?', l: 'vielleicht seiner Klassenlehrerin' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was hat Yusuf geholfen, sich zu öffnen? Was sagt die Beraterin, das gut tut?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Geholfen hat …', 'Gut tut der Satz …', 'Ich würde mich trauen, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Hier gibt es Hilfe', punkte: ['**Vertrauenspersonen**', 'Schule: Klassenlehrer/in, **SePAS**', '**116 111**: Kinder- und Jugendtelefon, anonym', '**8002 1234**: BEE SECURE Helpline', '**112**: Notfall · **113**: Polizei'] },
         { titel: 'Anfangen', punkte: ['„Kann ich kurz mit dir reden?“', 'Zettel oder Nachricht geht auch', 'Gefahr? Erwachsenen sagen ist **kein Verrat**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Meine Hilfe-Karte: Fülle die Karte aus (nur für dich). Schneide sie aus und steck sie in dein Portemonnaie oder deine Handyhülle.', stufe: 1, neueSeite: true, titel: 'Meine Hilfe-Karte', icon: 'lifebuoy', farbe: HILFE, spalten: 2,
        karten: [
          { text: '**Wenn es mir nicht gut geht, rede ich mit:**', linien: 3, frage: '116 111 · kostenlos, anonym' },
          { text: '**Das tut mir gut:**', linien: 3, frage: 'Notfall: 112 · Polizei: 113' },
          { text: '**Mein erster Satz:**\n„Kann ich kurz mit dir reden?“', linien: 2, frage: 'Internet: 8002 1234' },
          { text: '**Für einen Freund:**\nZuhören. Ernst nehmen. Hilfe holen.', linien: 2, frage: 'Du bist nicht allein.' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Ein Freund oder eine Freundin schreibt dir: „Mir geht es schon lange schlecht, aber sag es niemandem.“ Schreibe eine Antwort.', stufe: 3,
        anfaenge: ['Danke, dass du mir das erzählst.', 'Ich mache mir Sorgen, weil …', 'Ich finde, wir sollten …', 'Ich bin für dich da.'], zeilen: 7,
        beispiel: 'Danke, dass du mir das erzählst. Ich mache mir Sorgen, weil es dir schon so lange schlecht geht. Ich finde, wir sollten mit jemandem reden, der sich damit auskennt, zum Beispiel mit dem SePAS oder bei 116 111. Ich kann mitkommen, wenn du willst. Ich bin für dich da.' },
    ],
    check: ['Ich nenne Stellen, wo es Hilfe gibt.', 'Ich weiß, wie ich ein Gespräch beginnen kann.', 'Ich weiß, dass Hilfe holen kein Verrat ist.'],
  },
]

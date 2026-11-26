// Sport · Modul 9 (5P) „Sport fürs Leben“ – Éducation physique et sportive, Voie de préparation.
// Sport im Verein (Probetraining anfragen, Mail schreiben), Verletzungen und Erste Hilfe (PECH, Kopfverletzung, Notruf 112),
// Draußen aktiv (Wanderkarte lesen, Maßstab rechnen, Fahrradhelm), E-Sport und Bewegung (Argumente, Meinung),
// Projekt: Berufe im Sport und mein Bewegungsplan. Stand 2026. Keine Fragen nach eigenem Geld oder Familie.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { wanderkarte } from './praxis-bilder.mjs'

export const MODUL = sachModul('eduph', 9, {
  titel: 'Sport fürs Leben',
  titelFr: 'Le sport pour la vie',
  unter: 'Einen Verein finden, Verletzungen richtig versorgen, draußen mit Karte unterwegs sein, über E-Sport diskutieren – und einen Plan machen, wie Bewegung auch nach der Schule zu deinem Leben gehört.',
  unterFr: 'Club sportif, premiers secours, activités en plein air, e-sport et projet de vie active.',
  farbe: '#3b6ea8',
  deckbild: ['lio:froh:stehen-zeigen', 'nele:froh:rollstuhl', 'mia:froh:gehen'],
  blasen: [{ t: 'Probetraining!', x: 8, y: 104 }, { t: 'Nach Norden!', x: 128, y: 92 }, { t: 'Bleib dran!', x: 180, y: 150 }],
  aussprache: { '(\\d+) : (\\d+)': '\\1 zu \\2', 'PECH-Regel': 'Pech-Regel', 'Maison de l’orientation': 'Mäsong dö lorjangtasjong', '\\bE-Sport\\b': 'I-Sport', '\\bE-Mail\\b': 'I-Mehl' },
  themen: [
    { titel: { de: 'Verein und Sicherheit', fr: 'Club et sécurité' }, icon: 'first-aid-kit', lektionen: 2 },
    { titel: { de: 'Draußen und digital', fr: 'Dehors et numérique' }, icon: 'map', lektionen: 2 },
    { titel: { de: 'Meine Zukunft', fr: 'Mon avenir' }, icon: 'route', lektionen: 1 },
  ],
})

const LEBEN = '#3b6ea8'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Sport im Verein', titel: 'Einfach mal hingehen', untertitel: 'In Luxemburg gibt es sehr viele Sportvereine. Du erfährst, was ein Verein bietet, wie du den passenden findest – und schreibst eine Anfrage für ein Probetraining.',
    ziel: { de: 'Ich finde einen passenden Verein und frage nach einem Probetraining.', fr: 'Je trouve un club adapté et je demande un entraînement d’essai.' },
    bild: ['lio:froh:handy', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist für dich bei einem Sportverein am wichtigsten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['nette Leute', 'die Sportart', 'kurzer Weg', 'Wettkämpfe'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sportwissen (Stand 2026)', titel: 'Warum in einen Verein?',
      absaetze: [
        'In fast jeder Gemeinde in Luxemburg gibt es **Sportvereine**: vom Fußball über Schwimmen, Klettern und Judo bis zum Tanzen. Viele Vereine haben **Jugendgruppen**.',
        '**Was ein Verein bietet:** regelmäßiges **Training** mit ausgebildeten Trainerinnen und Trainern, eine **Gruppe**, in der man Freunde findet, und oft **Wettkämpfe** oder Turniere. Manche Vereine haben auch Gruppen nur zum Spaß, ohne Wettkampf.',
        '**Wie finde ich einen Verein?** Auf der Internetseite der **Gemeinde**, über die Seite des **Sportverbands**, durch Freunde oder durch Aushänge in der Schule.',
        '**Das Probetraining:** Die meisten Vereine erlauben es, ein- oder zweimal **zur Probe** mitzumachen. Man fragt vorher per Telefon oder E-Mail nach: Wann ist das Training? Wo? Was muss ich mitbringen?',
        '**Mehr als Sport:** Wer im Verein ist, lernt Verantwortung. Ältere Jugendliche helfen oft als **Trainer-Assistenten** mit oder pfeifen als Schiedsrichter. Das macht sich auch gut in einer **Bewerbung**.',
      ],
      woerter: [['der Verein', 'le club'], ['die Gemeinde', 'la commune'], ['regelmäßig', 'régulier'], ['das Training', 'l’entraînement'], ['der Wettkampf', 'la compétition'], ['der Aushang', 'l’affiche'], ['das Probetraining', 'l’entraînement d’essai'], ['die Bewerbung', 'la candidature']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['In vielen Gemeinden in Luxemburg gibt es Sportvereine.', true], ['Im Verein gibt es immer Wettkämpfe.', false], ['Vereine findet man zum Beispiel auf der Internetseite der Gemeinde.', true], ['Vor dem Probetraining fragt man am besten nach.', true], ['Im Verein lernt man nur Sport, sonst nichts.', false]] },
      ],
    },
    hoeren: {
      was: 'Ein Telefongespräch', wo: 'Zu Hause · Anruf beim Kletterverein', titel: 'Darf ich mal mitklettern?',
      situation: 'Lio möchte klettern lernen. Er ruft beim Kletterverein an und spricht mit dem Jugendtrainer, Herrn Faber.',
      bild: ['lio:nervoes:handy'], sprecher: { Lio: 'm3', 'Herr Faber': 'm1' },
      text: [
        ['Herr Faber', 'Kletterverein, Faber am Apparat, guten Tag.'],
        ['Lio', 'Guten Tag. Mein Name ist Lio. Ich bin vierzehn und möchte gern klettern lernen. Kann ich bei Ihnen ein Probetraining machen?'],
        ['Herr Faber', 'Ja, sehr gern. Unsere Jugendgruppe trainiert jeden Mittwoch von 17 bis 19 Uhr in der Kletterhalle neben dem Schwimmbad.'],
        ['Lio', 'Muss ich etwas mitbringen?'],
        ['Herr Faber', 'Bequeme Sportkleidung und eine Trinkflasche. Kletterschuhe und Gurt leihen wir dir beim ersten Mal.'],
        ['Lio', 'Ich habe noch nie geklettert. Ist das ein Problem?'],
        ['Herr Faber', 'Überhaupt nicht. Am Anfang zeigen wir dir die Sicherheitsregeln und den Knoten. Ach, und weil du noch nicht achtzehn bist: Bitte bring die Unterschrift einer erziehungsberechtigten Person mit. Das Formular findest du auf unserer Internetseite.'],
        ['Lio', 'Alles klar. Dann komme ich nächsten Mittwoch. Vielen Dank!'],
        ['Herr Faber', 'Gern. Bis Mittwoch, Lio!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „etwas leihen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwas für kurze Zeit bekommen und zurückgeben', 'etwas geschenkt bekommen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und notiere die Infos.', stufe: 1, kopf: ['', 'Probetraining'], breiten: [32, 68], zeilen: [['Tag', '[Mittwoch]'], ['Uhrzeit', '[17 bis 19 Uhr]'], ['Ort', '[Kletterhalle neben dem Schwimmbad]'], ['mitbringen', '[bequeme Sportkleidung und eine Trinkflasche]'], ['leiht der Verein', '[Kletterschuhe und Gurt]'], ['außerdem nötig', '[Unterschrift einer erziehungsberechtigten Person]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt das Telefongespräch zu zweit nach – mit einer anderen Sportart.', stufe: 2, karten: [
        { titel: 'Anrufer', text: ['Guten Tag, mein Name ist …', 'Kann ich bei Ihnen …?', 'Muss ich etwas mitbringen?'] },
        { titel: 'Verein', text: ['… am Apparat, guten Tag.', 'Das Training ist …', 'Bring bitte … mit.'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Verein finden', punkte: ['Internetseite der **Gemeinde**', 'Seite des **Sportverbands**', '**Freunde** fragen', '**Aushänge** in der Schule'] },
         { titel: 'Probetraining', nummern: true, punkte: ['**anrufen** oder **mailen**', 'nach **Tag, Zeit, Ort** fragen', 'fragen, was man **mitbringen** muss', '**hingehen** und ausprobieren'] }],
      ],
    },
    ueben: [
      { art: 'schreiben', auftrag: 'Schreib eine E-Mail an einen Verein. Frag nach einem Probetraining. Du kannst einen ausgedachten Verein nehmen.', stufe: 2,
        anfaenge: ['Sehr geehrte Damen und Herren,', 'ich heiße … und interessiere mich für …', 'Könnte ich …?', 'Mit freundlichen Grüßen'], zeilen: 9,
        beispiel: 'Sehr geehrte Damen und Herren,\nich heiße Sam, bin 14 Jahre alt und interessiere mich für Judo. Könnte ich bei Ihrer Jugendgruppe ein Probetraining machen? Wann und wo ist das Training, und was muss ich mitbringen?\nVielen Dank für Ihre Antwort.\nMit freundlichen Grüßen\nSam' },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welche Sportart würdest du gern einmal im Verein ausprobieren? Warum?', stufe: 1,
        anfaenge: ['Ausprobieren würde ich gern …', 'weil …', 'Ich stelle mir vor, dass …'], zeilen: 5,
        beispiel: 'Ausprobieren würde ich gern Klettern, weil ich Höhe spannend finde. Ich stelle mir vor, dass man dabei viel Kraft in den Fingern braucht und sich gut konzentrieren muss.' },
    ],
    check: ['Ich weiß, wie ich einen Verein finde.', 'Ich frage am Telefon nach einem Probetraining.', 'Ich schreibe eine höfliche Anfrage.'],
  },
  // ================================================================ 2
  {
    thema: 'Verletzungen und Erste Hilfe', titel: 'Was tun, wenn es wehtut?', untertitel: 'Beim Sport kann man sich verletzen. Du lernst, was bei einem verstauchten Fuß hilft, wann es gefährlich wird und wie man richtig den Notruf wählt.',
    ziel: { de: 'Ich helfe bei kleinen Sportverletzungen und wähle im Notfall richtig den Notruf.', fr: 'J’aide en cas de petite blessure sportive et j’appelle correctement les secours.' },
    bild: ['chloe:traurig:sitzen', 'noah:besorgt:hocken'],
    start: {
      was: 'Was weißt du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Welche Nummer wählst du in Luxemburg bei einem Unfall mit Verletzten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['112', '113', '116 111'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Ratgeber', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Erste Hilfe im Sport (vereinfacht, Stand 2026)', titel: 'Erste Hilfe beim Sport',
      absaetze: [
        '### Umgeknickt oder gestoßen: die PECH-Regel',
        '**P wie Pause:** Sofort aufhören, nicht weiterspielen. **E wie Eis:** Die Stelle kühlen, aber nie Eis direkt auf die Haut legen. Immer ein Tuch dazwischen und Pausen machen. **C wie Kompression:** Ein leichter Verband drückt sanft und verhindert starkes Anschwellen. **H wie Hochlagern:** Das verletzte Bein oder den Arm höher als das Herz legen.',
        'Kann man den Fuß nicht belasten, ist er sehr dick oder schief, dann muss eine Ärztin oder ein Arzt schauen. Vielleicht ist etwas gebrochen.',
        '### Vorsicht bei Kopfverletzungen',
        'Nach einem Stoß gegen den Kopf gilt: **sofort aufhören**. Hat jemand danach Kopfschmerzen, oder ist ihm schwindlig oder übel? Dann braucht er ärztliche Hilfe. Ist jemand bewusstlos oder verwirrt, oder muss er sich übergeben: sofort die **112** anrufen. Auch wenn man sich gut fühlt: einer erwachsenen Person Bescheid sagen und an diesem Tag nicht mehr weiterspielen.',
        '### Der Notruf 112',
        'Bei schweren Verletzungen wählst du die **112**. Bleib ruhig und beantworte die Fragen: **Wo** ist es passiert? **Was** ist passiert? **Wie viele** Verletzte gibt es? **Welche** Verletzungen? Dann **warten** auf Rückfragen. Leg nicht als Erste oder Erster auf.',
      ],
      woerter: [['umknicken', 'se tordre (la cheville)'], ['kühlen', 'refroidir'], ['der Verband', 'le bandage'], ['anschwellen', 'gonfler'], ['hochlagern', 'surélever'], ['belasten', 'mettre du poids sur'], ['schwindlig', 'pris de vertige'], ['der Notruf', 'l’appel d’urgence']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Was bedeuten die Buchstaben? Verbinde.', stufe: 1, links: ['P', 'E', 'C', 'H'], rechts: ['Pause: sofort aufhören', 'Eis: kühlen, mit einem Tuch dazwischen', 'Kompression: leichter Verband', 'Hochlagern: höher als das Herz'] },
      ],
    },
    hoeren: {
      was: 'Eine Unfallszene', wo: 'Sportplatz · Basketball draußen', titel: 'Umgeknickt!',
      situation: 'Chloé knickt beim Basketball um. Noah hilft, dann kommt Frau Diallo dazu.',
      bild: ['chloe:traurig:sitzen', 'noah:besorgt:hocken'], sprecher: { 'Chloé': 'w3', Noah: 'm3', 'Frau Diallo': 'w1' },
      text: [
        ['Chloé', 'Aua! Mein Fuß! Ich bin auf jemandem gelandet und umgeknickt.'],
        ['Noah', 'Bleib sitzen, Chloé. Nicht aufstehen. Ich hole Frau Diallo.'],
        ['Frau Diallo', 'Was ist passiert, Chloé?'],
        ['Chloé', 'Ich bin umgeknickt. Es tut weh, aber ich kann die Zehen bewegen.'],
        ['Frau Diallo', 'Gut, dass du sofort aufgehört hast. Noah, holst du bitte das Kühlpack aus dem Erste-Hilfe-Kasten und ein Handtuch?'],
        ['Noah', 'Hier. Soll ich das direkt auf den Knöchel legen?'],
        ['Frau Diallo', 'Nein, immer mit dem Handtuch dazwischen. Und jetzt legen wir den Fuß hoch, auf die Sporttasche.'],
        ['Chloé', 'Darf ich gleich weiterspielen? Es ist schon besser.'],
        ['Frau Diallo', 'Heute nicht. Der Knöchel wird dick. Ich rufe jetzt deine Familie an, und dann sollte eine Ärztin den Fuß anschauen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist der Knöchel? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['das Gelenk zwischen Fuß und Bein', 'ein Knochen in der Hand'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was wird nach der PECH-Regel gemacht?', stufe: 2, kopf: ['', 'Was passiert bei Chloé?'], breiten: [24, 76], zeilen: [['P', '[Chloé hört sofort auf und bleibt sitzen. Sie darf heute nicht weiterspielen.]'], ['E', '[Kühlpack mit einem Handtuch dazwischen]'], ['C', '[wird im Gespräch nicht gemacht]'], ['H', '[Fuß hochlegen, auf die Sporttasche]']] },
        { art: 'fragen', auftrag: 'Wie geht es weiter?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Frau Diallo ruft Chloés Familie an. Dann soll eine Ärztin den Fuß anschauen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Übt einen Notruf: Eine Person ist die Notrufzentrale, die andere meldet einen Unfall beim Sport. Beantwortet alle W-Fragen.', stufe: 3, karten: [
        { titel: 'W-Fragen', text: ['Wo ist es passiert?', 'Was ist passiert?', 'Wie viele Verletzte?', 'Welche Verletzungen?', 'Warten auf Rückfragen!'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'PECH-Regel', nummern: true, punkte: ['**Pause**', '**Eis**: kühlen, mit Tuch', '**Kompression**: leichter Verband', '**Hochlagern**'] },
         { titel: 'Notruf 112', punkte: ['**Wo**? **Was**? **Wie viele**?', '**Welche** Verletzungen?', '**warten** auf Rückfragen', 'Kopf verletzt: **sofort aufhören**'] }],
      ],
    },
    ueben: [
      { art: 'mc', auftrag: 'Was ist richtig? Kreuze an.', stufe: 2, fragen: [{ f: 'Ein Mitspieler stößt mit dem Kopf gegen einen Gegner. Ihm ist danach schwindlig.', o: ['Er spielt weiter, wenn er will.', 'Er hört auf, und eine erwachsene Person wird geholt.'], r: 1 }, { f: 'Eine Mitspielerin hat sich den Fuß verstaucht.', o: ['Eis direkt auf die Haut legen', 'kühlen mit einem Tuch dazwischen'], r: 1 }, { f: 'Du rufst die 112 an. Wann legst du auf?', o: ['sofort nach dem ersten Satz', 'erst wenn die Zentrale keine Fragen mehr hat'], r: 1 }] },
      { art: 'tabelle', auftrag: 'Notruf-Karte: Fülle für deine Schule aus. Leg sie in deine Sporttasche.', stufe: 1, kopf: ['', 'Meine Angaben'], breiten: [40, 60], zeilen: [['Notruf', '112'], ['Adresse der Schule', ''], ['Adresse der Sporthalle', ''], ['Wo ist der Erste-Hilfe-Kasten?', ''], ['Wen hole ich zuerst?', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Warum sollte man nach einer Verletzung nicht gleich weiterspielen, auch wenn man unbedingt möchte?', stufe: 2,
        anfaenge: ['Man sollte nicht weiterspielen, weil …', 'Es ist schwer, aufzuhören, wenn …', 'Ich würde …'], zeilen: 5,
        beispiel: 'Man sollte nicht weiterspielen, weil die Verletzung sonst schlimmer werden kann. Es ist schwer, aufzuhören, wenn das Spiel gerade spannend ist. Ich würde trotzdem lieber eine Pause machen, als wochenlang auszufallen.' },
    ],
    check: ['Ich kenne die PECH-Regel.', 'Ich weiß, was bei einer Kopfverletzung wichtig ist.', 'Ich kann einen Notruf mit den W-Fragen machen.'],
  },
  // ================================================================ 3
  {
    thema: 'Draußen aktiv', titel: 'Mit Karte unterwegs', untertitel: 'Wandern und Radfahren kann man ein Leben lang. Du lernst, eine Wanderkarte zu lesen, rechnest mit dem Maßstab und erfährst, was beim Radfahren schützt.',
    ziel: { de: 'Ich lese eine Wanderkarte und plane eine kleine Tour.', fr: 'Je lis une carte de randonnée et je planifie une petite sortie.' },
    bild: ['mia:froh:gehen', 'sami:froh:stehen-zeigen'],
    start: {
      was: 'Was weißt du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wohin zeigt auf den meisten Karten der obere Rand? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['nach Norden', 'nach Süden', 'nach Osten'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Outdoor-Wissen (Stand 2026)', titel: 'Die Karte lesen',
      absaetze: [
        'Luxemburg hat viele markierte **Wanderwege** und **Radwege**. Der Müllerthal Trail zum Beispiel ist ein Wanderweg von rund 110 Kilometern durch Felsen, Wälder und Täler.',
        '**Die Farben:** Auf einer Wanderkarte ist **Wald grün**, **Wasser blau**. **Wege** sind dünne oder gestrichelte Linien, **Straßen** dicke Linien. Kleine Zeichen zeigen zum Beispiel einen **Parkplatz** mit einem P oder einen **Aussichtspunkt**.',
        '**Die Richtung:** Oben auf der Karte ist fast immer **Norden**. Der **Nordpfeil** zeigt es an. Unten ist Süden, rechts Osten, links Westen.',
        '**Der Maßstab:** Er zeigt, wie stark die Karte verkleinert ist. Bei einem Maßstab von **1 : 25 000** ist **1 Zentimeter** auf der Karte in Wirklichkeit **250 Meter**. So kann man ausrechnen, wie lang ein Weg ist.',
        '**Mit dem Rad:** Trag immer einen **Helm**, der gut sitzt. Bei Dunkelheit brauchst du **Licht** vorn und hinten. Plan die Tour vorher und sag jemandem, wohin du fährst.',
      ],
      woerter: [['der Wanderweg', 'le sentier de randonnée'], ['markiert', 'balisé'], ['der Felsen', 'le rocher'], ['das Tal', 'la vallée'], ['der Aussichtspunkt', 'le point de vue'], ['der Maßstab', 'l’échelle'], ['verkleinert', 'réduit'], ['der Helm', 'le casque']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Was zeigen die Nummern auf der Karte? Schreib es auf.', stufe: 1, html: '<div class="voll">' + wanderkarte() + '</div>', liste: [['1', 'Wald'], ['2', 'Bach'], ['3', 'Brücke'], ['4', 'Parkplatz'], ['5', 'Aussichtspunkt'], ['6', 'Wanderweg']], spalten: 3 },
      ],
    },
    hoeren: {
      was: 'Eine Tourenplanung', wo: 'Klasse · Ausflug planen', titel: 'Wohin geht’s?',
      situation: 'Mia und Sami planen mit der Karte von oben eine Wanderung für die Klasse.',
      bild: ['mia:froh:stehen', 'sami:froh:stehen-zeigen'], sprecher: { Mia: 'w3', Sami: 'm2' },
      text: [
        ['Mia', 'Wir starten am Parkplatz. Der liegt ganz im Süden der Karte, an der Straße.'],
        ['Sami', 'Dann gehen wir auf dem Wanderweg nach Norden. Zuerst kommt die Brücke über den Bach.'],
        ['Mia', 'Danach geht der Weg nach Nordosten bis zum Aussichtspunkt. Dort machen wir Picknick.'],
        ['Sami', 'Wie weit ist das?'],
        ['Mia', 'Auf der echten Karte habe ich nachgemessen: Es sind 8 Zentimeter. Der Maßstab ist 1 : 25 000.'],
        ['Sami', 'Also 8 mal 250 Meter. Das sind 2000 Meter, also 2 Kilometer.'],
        ['Mia', 'Hin und zurück sind es 4 Kilometer. Wenn wir etwa 4 Kilometer pro Stunde gehen, brauchen wir eine Stunde – plus Picknick.'],
        ['Sami', 'Und wir denken an Wasser, Regenjacke und gute Schuhe. Passt der Weg auch für Nele?'],
        ['Mia', 'Ich habe es mit Nele angeschaut: Der Weg ist breit und flach. Nur an der Brücke gibt es Stufen. Wir fragen zusammen den Förster, ob es einen Weg ohne Stufen gibt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Picknick? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man isst draußen mitgebrachtes Essen.', 'Man geht in ein Restaurant.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und schreib den Tourenplan.', stufe: 2, kopf: ['', 'Unsere Wanderung'], breiten: [30, 70], zeilen: [['Start', '[am Parkplatz im Süden]'], ['Weg', '[nach Norden über die Brücke, dann nach Nordosten]'], ['Ziel', '[Aussichtspunkt, Picknick]'], ['Strecke', '[2 Kilometer, hin und zurück 4 Kilometer]'], ['Zeit', '[etwa eine Stunde plus Picknick]'], ['mitnehmen', '[Wasser, Regenjacke, gute Schuhe]']] },
        { art: 'fragen', auftrag: 'Was wollen sie wegen Nele klären?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'An der Brücke gibt es Stufen. Sie fragen zusammen mit Nele den Förster, ob es einen Weg ohne Stufen gibt.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Plant mit der Karte eine andere Route: Wohin geht ihr? Beschreibt den Weg mit Himmelsrichtungen.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Wir starten bei …', 'Dann gehen wir nach …', 'Unser Ziel ist …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Karte lesen', punkte: ['Wald **grün**, Wasser **blau**', 'oben ist **Norden**', 'Zeichen: **P** = Parkplatz', '1 : 25 000: **1 cm = 250 m**'] },
         { titel: 'Sicher unterwegs', punkte: ['**Helm** beim Radfahren', '**Licht** vorn und hinten', 'Tour **planen**', 'jemandem **Bescheid** sagen'] }],
      ],
    },
    ueben: [
      { art: 'rechnen', auftrag: 'Maßstab 1 : 25 000 – rechne aus. Tipp: 1 cm auf der Karte sind 250 m.', stufe: 2, spalten: 2, items: [{ a: '4 cm auf der Karte', l: '1000 m = 1 km' }, { a: '10 cm auf der Karte', l: '2500 m = 2,5 km' }, { a: 'Ein Weg ist 3 km lang. Wie viele Zentimeter sind das auf der Karte?', l: '12 cm' }, { a: 'Ihr geht 4 km pro Stunde. Wie lange braucht ihr für 6 km?', l: '1,5 Stunden' }] },
      { art: 'mc', auftrag: 'Schau auf die Karte oben. Kreuze an.', stufe: 2, fragen: [{ f: 'Der Aussichtspunkt liegt vom Parkplatz aus im …', o: ['Nordosten', 'Südwesten'], r: 0 }, { f: 'Das Dorf mit den Häusern liegt im …', o: ['Südwesten', 'Nordosten'], r: 0 }, { f: 'Wie viele Wälder siehst du?', o: ['zwei', 'einen'], r: 0 }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wohin würdest du gern einmal wandern oder Rad fahren? Was nimmst du mit?', stufe: 1,
        anfaenge: ['Ich würde gern …', 'Mitnehmen würde ich …', 'Wichtig ist mir …'], zeilen: 5,
        beispiel: 'Ich würde gern einmal ein Stück vom Müllerthal Trail wandern, weil ich die Felsen sehen möchte. Mitnehmen würde ich Wasser, ein Brot und eine Regenjacke. Wichtig ist mir, dass Freunde dabei sind.' },
    ],
    check: ['Ich kenne die Farben und Zeichen auf einer Wanderkarte.', 'Ich rechne mit dem Maßstab.', 'Ich weiß, was beim Radfahren schützt.'],
  },
  // ================================================================ 4
  {
    thema: 'E-Sport und Bewegung', titel: 'Ist Zocken Sport?', untertitel: 'Viele Jugendliche spielen gern Videospiele, manche auch im Wettkampf. Du lernst Argumente kennen, hörst eine Diskussion und bildest dir deine eigene Meinung.',
    ziel: { de: 'Ich vergleiche Argumente und begründe meine Meinung.', fr: 'Je compare des arguments et je justifie mon opinion.' },
    bild: ['yusuf:froh:zocken', 'mia:verwirrt:stehen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Ist E-Sport für dich ein Sport? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ja', 'nein', 'ich bin mir nicht sicher'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sportwissen (Stand 2026)', titel: 'E-Sport: Pro und Contra',
      absaetze: [
        'Beim **E-Sport** treten Spielerinnen und Spieler in Videospielen gegeneinander an, oft in Teams und in großen Turnieren. Ob das ein richtiger **Sport** ist, darüber streiten Fachleute.',
        '**Dafür spricht:** Man braucht schnelle **Reaktionen**, gute **Konzentration** und **Taktik**. Teams trainieren regelmäßig und müssen gut zusammenarbeiten. Es gibt Regeln, Schiedsrichter und Wettkämpfe.',
        '**Dagegen spricht:** Der Körper bewegt sich kaum. Ausdauer, Kraft und Beweglichkeit werden nicht trainiert. Wer viele Stunden sitzt, bekommt oft Rückenschmerzen, müde Augen und schläft schlechter.',
        '**Tipps für alle, die gern spielen:** Jede Stunde aufstehen und sich bewegen. Ab und zu in die Ferne schauen, um die Augen zu entspannen. Nicht kurz vor dem Schlafen spielen. Und: Profi-Teams im E-Sport machen selbst **Sport**, weil ein fitter Körper auch dem Kopf hilft.',
      ],
      woerter: [['antreten', 'participer, affronter'], ['die Reaktion', 'la réaction'], ['die Konzentration', 'la concentration'], ['die Taktik', 'la tactique'], ['dafür sprechen', 'être un argument pour'], ['dagegen sprechen', 'être un argument contre'], ['die Ferne', 'le lointain'], ['entspannen', 'détendre']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Dafür oder dagegen? Kreuze an.', stufe: 1, kopf: ['Argument', 'E-Sport ist Sport', 'E-Sport ist kein Sport'], breiten: [60, 20, 20], zeilen: [['Man braucht schnelle Reaktionen.', '[x]', ''], ['Der Körper bewegt sich kaum.', '', '[x]'], ['Es gibt Regeln und Schiedsrichter.', '[x]', ''], ['Ausdauer und Kraft werden nicht trainiert.', '', '[x]'], ['Teams trainieren und arbeiten zusammen.', '[x]', '']] },
      ],
    },
    hoeren: {
      was: 'Eine Diskussion', wo: 'Klasse · Diskussionsrunde', titel: 'Zocken oder kicken?',
      situation: 'Yusuf und Mia diskutieren. Lina leitet die Diskussion.',
      bild: ['yusuf:froh:zocken', 'mia:verwirrt:stehen'], sprecher: { Lina: 'w2', Yusuf: 'm3', Mia: 'w3' },
      text: [
        ['Lina', 'Unsere Frage: Ist E-Sport ein Sport? Yusuf, du fängst an.'],
        ['Yusuf', 'Ja, klar. Mein Team trainiert dreimal pro Woche. Wir besprechen Taktik, und man muss sich total konzentrieren. Das ist genauso anstrengend.'],
        ['Mia', 'Für den Kopf vielleicht. Aber du schwitzt nicht, dein Herz schlägt nicht schneller, und deine Muskeln werden nicht stärker.'],
        ['Yusuf', 'Beim Schach schwitzt man auch nicht, und viele nennen es trotzdem Sport.'],
        ['Mia', 'Gutes Argument. Aber Schach macht man auch nicht sechs Stunden am Tag vor einem Bildschirm.'],
        ['Lina', 'Yusuf, wie viel bewegst du dich neben dem Spielen?'],
        ['Yusuf', 'Ehrlich gesagt: Unser Trainer sagt, wir sollen joggen gehen. Weil man dann länger konzentriert bleibt.'],
        ['Mia', 'Siehst du! Sogar E-Sport braucht Sport.'],
        ['Lina', 'Vielleicht ist das unser Ergebnis: Beides kann zusammenpassen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht die Person, die eine Diskussion leitet? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie gibt das Wort weiter und fasst zusammen.', 'Sie entscheidet, wer recht hat.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welche Argumente nennen Yusuf und Mia?', stufe: 2, kopf: ['Yusuf: E-Sport ist Sport', 'Mia: E-Sport ist kein Sport'], breiten: [50, 50], zeilen: [['[Training dreimal pro Woche, Taktik]', '[Man schwitzt nicht, das Herz schlägt nicht schneller.]'], ['[Man muss sich total konzentrieren.]', '[Die Muskeln werden nicht stärker.]'], ['[Schach nennt man auch Sport.]', '[nicht sechs Stunden vor dem Bildschirm]']] },
        { art: 'fragen', auftrag: 'Was sagt Yusufs Trainer? Warum?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Die Spieler sollen joggen gehen, weil man dann länger konzentriert bleibt.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Meinungslinie: Stellt euch im Raum auf eine Linie. Links: „E-Sport ist Sport.“ Rechts: „E-Sport ist kein Sport.“ Begründet euren Platz.', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich stehe hier, weil …', 'Ein wichtiges Argument ist …', 'Ich verstehe aber auch, dass …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Argumentieren', nummern: true, punkte: ['**Meinung** sagen', '**Grund** nennen: weil …', '**Beispiel** geben', 'die **andere Seite** verstehen'] },
         { titel: 'Spielen und bewegen', punkte: ['jede **Stunde** aufstehen', 'Augen: in die **Ferne** schauen', 'nicht vor dem **Schlafen** spielen', 'fit für **Kopf** und Körper'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Bewegungspausen-Karten für Spielerinnen und Spieler: Zieht nach jeder Spielstunde eine Karte und macht die Übung.', stufe: 1, neueSeite: true, titel: 'Pause', icon: 'device-gamepad-2', farbe: LEBEN, spalten: 2,
        karten: [
          { text: '**Augen-Pause**\n20 Sekunden aus dem Fenster in die Ferne schauen' }, { text: '**Strecken**\nArme hoch, ganz lang machen, 10 Sekunden halten' },
          { text: '**Treppe**\neinmal Treppe hoch und runter' }, { text: '**Schultern**\n10-mal die Schultern nach hinten kreisen' },
          { text: '**Hampelmann**\n20 Hampelmänner' }, { text: '**Trinken**\nein Glas Wasser holen – zu Fuß!' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Ist E-Sport für dich ein Sport? Schreib deine Meinung mit zwei Gründen und einem Beispiel.', stufe: 3,
        anfaenge: ['Ich finde, dass …', 'Ein Grund ist …', 'Außerdem …', 'Zum Beispiel …', 'Trotzdem verstehe ich, dass …'], zeilen: 8,
        beispiel: 'Ich finde, dass E-Sport eine Art Sport ist, aber kein Ersatz für Bewegung. Ein Grund ist, dass man viel trainieren und sich konzentrieren muss. Außerdem gibt es Regeln und Teams. Zum Beispiel machen Profi-Teams Taktik-Training wie im Fußball. Trotzdem verstehe ich, dass viele sagen: Ohne Bewegung ist es kein Sport.' },
    ],
    check: ['Ich kenne Argumente für und gegen E-Sport.', 'Ich begründe meine Meinung mit „weil“.', 'Ich kenne Tipps für Bewegungspausen.'],
  },
  // ================================================================ 5
  {
    thema: 'Projekt: Sport in meiner Zukunft', titel: 'Bleib in Bewegung!', untertitel: 'Zum Abschluss schaust du nach vorn: Welche Berufe gibt es im Sport? Wie kannst du dich auch nach der Schule bewegen? Du hörst ein Interview und machst deinen eigenen Bewegungsplan.',
    ziel: { de: 'Ich kenne Berufe im Sport und mache einen Plan für mein bewegtes Leben.', fr: 'Je connais des métiers du sport et je fais un plan pour une vie active.' },
    bild: ['amira:froh:stehen-zeigen', 'nele:froh:rollstuhl'],
    start: {
      was: 'Was weißt du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Welche Berufe haben mit Sport zu tun? Kreuze alle an.', stufe: 1, fragen: [{ f: '', o: ['Physiotherapeutin oder Physiotherapeut', 'Sportlehrerin oder Sportlehrer', 'Verkäuferin oder Verkäufer im Sportgeschäft', 'Platzwartin oder Platzwart'], r: [0, 1, 2, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Berufswelt (Stand 2026)', titel: 'Arbeiten mit Sport',
      absaetze: [
        'Mit Sport kann man auf viele Arten arbeiten – nicht nur als Profi.',
        '**Physiotherapie:** Physiotherapeutinnen und Physiotherapeuten helfen Menschen nach Verletzungen oder Operationen, wieder beweglich zu werden. Dafür braucht man eine längere Ausbildung oder ein Studium.',
        '**Training und Unterricht:** Sportlehrerinnen und Sportlehrer unterrichten an Schulen. Trainerinnen und Trainer arbeiten in Vereinen oder Fitnessstudios. Viele fangen als **Trainer-Assistent** im eigenen Verein an.',
        '**Handwerk und Verkauf:** Im **Sportgeschäft** berät man Kundinnen und Kunden. **Platzwarte** pflegen Rasen und Sportanlagen. In **Fahrradwerkstätten** werden Räder repariert.',
        'Welcher Weg zu welchem Beruf führt, ist verschieden. In Luxemburg hilft die **Maison de l’orientation** bei Fragen zur Berufswahl. Und auch ohne Sportberuf gilt: Bewegung tut ein Leben lang gut.',
      ],
      woerter: [['die Physiotherapie', 'la kinésithérapie'], ['die Operation', 'l’opération'], ['beweglich', 'mobile'], ['die Ausbildung', 'la formation'], ['unterrichten', 'enseigner'], ['beraten', 'conseiller'], ['pflegen', 'entretenir'], ['die Berufswahl', 'le choix du métier']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wer macht was? Verbinde.', stufe: 1, links: ['Physiotherapeutin', 'Trainer im Verein', 'Verkäuferin im Sportgeschäft', 'Platzwart'], rechts: ['hilft nach Verletzungen, wieder beweglich zu werden', 'leitet das Training einer Gruppe', 'berät Kundinnen und Kunden', 'pflegt Rasen und Sportanlagen'] },
      ],
    },
    hoeren: {
      was: 'Ein Interview', wo: 'Schulradio · Berufe im Sport', titel: 'Bewegung ist mein Beruf',
      situation: 'Amira interviewt Frau Lambert. Sie ist Physiotherapeutin und arbeitet auch mit einem Basketballteam.',
      bild: ['amira:froh:stehen-zeigen'], sprecher: { Amira: 'w2', 'Frau Lambert': 'w1' },
      text: [
        ['Amira', 'Frau Lambert, was machen Sie als Physiotherapeutin?'],
        ['Frau Lambert', 'Ich helfe Menschen, die verletzt waren oder Schmerzen haben. Mit Übungen und mit meinen Händen mache ich ihre Muskeln und Gelenke wieder beweglich.'],
        ['Amira', 'Und Sie arbeiten auch mit Sportlern?'],
        ['Frau Lambert', 'Ja, zweimal pro Woche mit einem Basketballteam. Ich zeige ihnen, wie sie sich aufwärmen, damit sie sich weniger verletzen.'],
        ['Amira', 'Was gefällt Ihnen am meisten?'],
        ['Frau Lambert', 'Wenn jemand nach einer Verletzung zum ersten Mal wieder spielen kann. Dieses Lachen – das ist das Schönste.'],
        ['Amira', 'Muss man selbst sehr sportlich sein?'],
        ['Frau Lambert', 'Man sollte Bewegung mögen und gern mit Menschen arbeiten. Geduld ist auch wichtig, denn Heilung braucht Zeit.'],
        ['Amira', 'Bewegen Sie sich selbst noch?'],
        ['Frau Lambert', 'Jeden Tag. Ich fahre mit dem Rad zur Arbeit. Bewegung ist bei mir nicht nur Beruf, sondern Teil meines Lebens.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist Geduld? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ruhig warten können', 'schnell wütend werden'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wie hilft Frau Lambert verletzten Menschen?', zeilen: 2, l: 'mit Übungen und mit ihren Händen; sie macht Muskeln und Gelenke wieder beweglich' }, { f: 'Was macht sie mit dem Basketballteam?', zeilen: 2, l: 'Sie zeigt, wie man sich aufwärmt, damit man sich weniger verletzt.' }, { f: 'Was ist für diesen Beruf wichtig?', zeilen: 2, l: 'Bewegung mögen, gern mit Menschen arbeiten, Geduld' }, { f: 'Wie bewegt sie sich selbst?', l: 'Sie fährt jeden Tag mit dem Rad zur Arbeit.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welcher Beruf aus dieser Lektion würde zu dir passen? Was würdest du gern genauer wissen?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Zu mir passt vielleicht …, weil …', 'Ich möchte genauer wissen, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Berufe im Sport', punkte: ['**Physiotherapie**', '**Training** und **Unterricht**', '**Verkauf** und Beratung', '**Pflege** von Anlagen'] },
         { titel: 'Bewegt leben', punkte: ['**Alltag**: Rad, Treppe, zu Fuß', '**Verein** oder Gruppe', '**draußen** aktiv', 'Hilfe zur Berufswahl: **Maison de l’orientation**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mein Bewegungsplan für eine Woche: Plane Bewegung in deinen Alltag. Kleine Schritte zählen!', stufe: 2, kopf: ['Tag', 'Was?', 'Wie lange?', 'mit wem?'], breiten: [16, 40, 20, 24], zeilen: [['Montag', '', '', ''], ['Dienstag', '', '', ''], ['Mittwoch', '', '', ''], ['Donnerstag', '', '', ''], ['Freitag', '', '', ''], ['Wochenende', '', '', '']] },
      { art: 'tabelle', auftrag: 'Rückblick: Was hat dir im Sport am meisten gebracht? Kreuze nur die Module an, die du schon gemacht hast.', stufe: 1, kopf: ['Modul', 'viel', 'etwas', 'wenig'], breiten: [52, 16, 16, 16], zeilen: [['Fit in Bewegung', '', '', ''], ['Ballspiele', '', '', ''], ['Turnen und Balance', '', '', ''], ['Kraft und Fitness', '', '', ''], ['Rückschlagspiele', '', '', ''], ['Tanz und Rhythmus', '', '', ''], ['Leichtathletik', '', '', ''], ['Mannschaftssport', '', '', ''], ['Sport fürs Leben', '', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie soll Bewegung in fünf Jahren in deinem Leben aussehen? Schreib einen Brief an dich selbst.', stufe: 2,
        anfaenge: ['Liebe/r …,', 'in fünf Jahren möchte ich …', 'Damit das klappt, …', 'Vergiss nicht: …'], zeilen: 8,
        beispiel: 'Liebe Mia,\nin fünf Jahren möchte ich immer noch tanzen, vielleicht in einer Gruppe in meiner Stadt. Ich möchte mit dem Rad zur Arbeit fahren. Damit das klappt, suche ich mir jetzt schon einen Verein. Vergiss nicht: Bewegung macht dich gut gelaunt!' },
    ],
    check: ['Ich kenne Berufe im Sport.', 'Ich plane Bewegung in meinen Alltag.', 'Ich weiß, wo ich Hilfe bei der Berufswahl finde.'],
  },
]

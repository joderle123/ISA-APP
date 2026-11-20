// Sport · Modul 2 (7P) „Ballspiele“ – Éducation physique et sportive, Voie de préparation.
// Grundtechniken (Fangen, Passen, Dribbeln), Basketball-Regeln mit Spielfeld zum Beschriften, Freilaufen, kleine Spiele
// (Parteiball, Brennball) mit Regelkarten, eigenes Spiel erfinden. Nele (Rollstuhl) spielt mit angepassten Regeln mit.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { spielfeld } from './praxis-bilder.mjs'

export const MODUL = sachModul('eduph', 2, {
  titel: 'Ballspiele',
  titelFr: 'Jeux de balle',
  unter: 'Fangen, passen, dribbeln – die Regeln im Basketball verstehen, sich freilaufen, kleine Spiele spielen und ein eigenes Ballspiel erfinden.',
  unterFr: 'Attraper, passer, dribbler, règles du basket, démarquage, petits jeux et invention d’un jeu.',
  farbe: '#d0662a',
  deckbild: ['yusuf:froh:stehen-zeigen', 'chloe:aufgeregt:gehen', 'nele:froh:rollstuhl'],
  blasen: [{ t: 'Hier, frei!', x: 8, y: 104 }, { t: 'Schrittfehler!', x: 124, y: 92 }, { t: 'Korb!', x: 182, y: 150 }],
  aussprache: {},
  themen: [
    { titel: { de: 'Ball-Techniken', fr: 'Techniques de balle' }, icon: 'ball-basketball', lektionen: 3 },
    { titel: { de: 'Zusammen spielen', fr: 'Jouer ensemble' }, icon: 'users-group', lektionen: 3 },
  ],
})

const BALL = '#d0662a', SPIEL = '#2f6db5'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Fangen und Passen', titel: 'Sicher fangen, genau passen', untertitel: 'Jedes Ballspiel beginnt mit Fangen und Passen. Du lernst drei Pässe, wie man sicher fängt, und übst mit einer Trainer-Ansage zu zweit.',
    ziel: { de: 'Ich fange sicher und spiele drei verschiedene Pässe.', fr: 'J’attrape la balle en sécurité et je fais trois passes différentes.' },
    bild: ['lehrerin:froh:erklaeren', 'sami:froh:stehen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wohin schaust du, wenn du einen Ball fängst? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['auf den Ball', 'auf meine Füße', 'zum Publikum'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sportwissen', titel: 'Fangen und drei Pässe',
      absaetze: [
        '### Fangen',
        'Schau den Ball an, bis er in deinen Händen ist. Streck die Arme dem Ball **entgegen**. Die Hände bilden ein **Körbchen**: Daumen und Zeigefinger formen ein Dreieck. Wenn der Ball kommt, gib mit den Armen etwas **nach** – wie ein Kissen. Dann prallt er nicht ab.',
        '### Der Brustpass',
        'Halte den Ball vor der Brust, die Ellenbogen locker. Mach einen Schritt nach vorn und **stoße** den Ball mit beiden Händen gerade zum Partner. Am Ende zeigen die Daumen nach unten. Ziel ist die Brust des Partners.',
        '### Der Bodenpass',
        'Wie der Brustpass, aber der Ball springt einmal auf dem Boden auf – etwa **zwei Drittel** des Weges zum Partner. Gut, wenn ein Gegner die Arme oben hat.',
        '### Der Überkopfpass',
        'Halte den Ball mit beiden Händen **über dem Kopf** und wirf ihn mit einer schnellen Bewegung der Unterarme. Gut für weite Pässe über einen Gegner hinweg.',
      ],
      woerter: [['fangen', 'attraper'], ['der Pass', 'la passe'], ['passen', 'faire une passe'], ['der Partner', 'le partenaire'], ['nachgeben', 'amortir'], ['abprallen', 'rebondir'], ['stoßen', 'pousser'], ['der Gegner', 'l’adversaire']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welcher Pass passt? Verbinde.', stufe: 1, links: ['Der Partner steht frei und nah vor dir.', 'Ein Gegner hat die Arme oben.', 'Du willst weit über einen Gegner passen.'], rechts: ['Brustpass', 'Bodenpass', 'Überkopfpass'] },
      ],
    },
    hoeren: {
      was: 'Eine Trainer-Ansage', wo: 'Sporthalle · Partnerübung', titel: 'Pass-Training zu zweit',
      situation: 'Frau Diallo erklärt eine Partnerübung. Hör zu und mach mit – jedes Paar hat einen Ball.',
      bild: ['lehrerin:froh:erklaeren', 'sami:froh:stehen'], sprecher: { 'Frau Diallo': 'w1' },
      text: [
        ['Frau Diallo', 'Jedes Paar nimmt einen Ball. Stellt euch drei Meter auseinander gegenüber – das sind ungefähr vier große Schritte.'],
        ['Frau Diallo', 'Wir fangen mit dem Brustpass an. Zehnmal hin und her. Denkt an das Körbchen beim Fangen.'],
        ['Frau Diallo', 'Gut. Jetzt Bodenpass. Der Ball springt näher beim Partner auf, nicht in der Mitte. Zehnmal.'],
        ['Frau Diallo', 'Und jetzt der Überkopfpass. Geht dafür zwei Schritte weiter auseinander. Zehnmal.'],
        ['Frau Diallo', 'Letzte Übung: Ich rufe einen Pass, ihr spielt ihn sofort. Brust! … Boden! … Überkopf! … Boden! … Brust!'],
        ['Frau Diallo', 'Super. Wer im Rollstuhl spielt, macht genau dieselben Pässe – nur im Sitzen. Nele, deine Bodenpässe sind richtig gut!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Partnerübung? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine Übung zu zweit', 'eine Übung allein'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und ergänze.', stufe: 1, kopf: ['Übung', 'Abstand / Anzahl'], breiten: [40, 60], zeilen: [['Brustpass', '[3 Meter, 10-mal]'], ['Bodenpass', '[10-mal, Ball springt näher beim Partner auf]'], ['Überkopfpass', '[2 Schritte weiter auseinander, 10-mal]'], ['letzte Übung', '[Frau Diallo ruft den Pass, man spielt ihn sofort]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Gebt eurem Partner ein Feedback: Was klappt beim Passen schon gut? Was kann besser werden?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Dein … ist schon gut.', 'Versuch mal, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Fangen', punkte: ['**Ball anschauen**', 'Arme **entgegen**strecken', 'Hände als **Körbchen**', 'mit den Armen **nachgeben**'] },
         { titel: 'Drei Pässe', punkte: ['**Brustpass**: gerade zur Brust', '**Bodenpass**: springt bei 2/3 des Weges auf', '**Überkopfpass**: weit, über Gegner', 'immer: Schritt nach vorn'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Pass-Stationen: Schneidet die Karten aus und legt sie an vier Stationen. Jedes Paar übt drei Minuten pro Station.', stufe: 1, neueSeite: true, titel: 'Station', icon: 'ball-basketball', farbe: BALL, spalten: 2,
        karten: [
          { text: '**Station 1 · Zielpass**\nPasst den Ball durch einen Reifen, den ein Dritter hält. Wer schafft 5 Treffer?' }, { text: '**Station 2 · Wandpass**\nSpiel Brustpässe an die Wand und fang den Ball wieder. 20-mal ohne Fehler?' },
          { text: '**Station 3 · Bodenpass-Tor**\nZwei Hütchen sind das Tor. Spielt Bodenpässe hindurch.' }, { text: '**Station 4 · Pass im Gehen**\nGeht nebeneinander durch die Halle und passt euch den Ball zu.' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welcher Pass klappt bei dir schon gut, welcher noch nicht? Was willst du üben?', stufe: 1,
        anfaenge: ['Gut klappt schon …', 'Schwierig ist noch …, weil …', 'Ich übe …'], zeilen: 5,
        beispiel: 'Gut klappt schon der Brustpass, mein Partner kann ihn leicht fangen. Schwierig ist noch der Bodenpass, weil der Ball oft zu früh aufspringt. Ich übe an der Wand und achte darauf, wo der Ball aufkommt.' },
    ],
    check: ['Ich fange den Ball sicher.', 'Ich spiele Brust-, Boden- und Überkopfpass.', 'Ich wähle den passenden Pass.'],
  },
  // ================================================================ 2
  {
    thema: 'Dribbeln', titel: 'Der Ball gehorcht mir', untertitel: 'Beim Basketball darfst du mit dem Ball nur laufen, wenn du dribbelst. Du lernst, wie man den Ball sicher prellt – mit beiden Händen und ohne hinzuschauen – und übst im Parcours.',
    ziel: { de: 'Ich dribble sicher mit beiden Händen und schaue dabei hoch.', fr: 'Je dribble en sécurité des deux mains en levant les yeux.' },
    bild: ['yusuf:froh:stehen-zeigen', 'lehrerin:froh:zeigen'],
    start: {
      was: 'Probier mal!',
      aufgaben: [
        { art: 'fragen', auftrag: 'Prelle einen Ball zehnmal mit deiner starken Hand und zehnmal mit der anderen. Was ist der Unterschied?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Mit der schwächeren Hand ist es schwerer; man muss mehr hinschauen.' }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Sportwissen', titel: 'So dribbelst du richtig',
      material: ['ein Basketball', 'Hütchen für den Parcours'],
      schritte: [
        { icon: 'hand-finger', text: '**Fingerkuppen:** Drück den Ball mit den **Fingern**, nicht mit der flachen Hand. Nicht schlagen – schieben.' },
        { icon: 'arrow-down', text: '**Höhe:** Der Ball springt etwa bis zur **Hüfte**. Knie leicht gebeugt.' },
        { icon: 'arrows-horizontal', text: '**Seite:** Prell den Ball **neben** dem Körper, nicht vor den Füßen. So stolperst du nicht darüber.' },
        { icon: 'eye', text: '**Blick hoch:** Schau nach vorn, nicht auf den Ball. So siehst du Mitspieler und Gegner.' },
        { icon: 'switch-horizontal', text: '**Hand wechseln:** Übe mit **beiden** Händen. Die Hand, die weiter vom Gegner weg ist, dribbelt.' },
      ],
      danach: ['Wichtig im Basketball: Wenn du aufhörst zu dribbeln und den Ball fängst, darfst du **nicht noch einmal** losdribbeln. Das heißt **Doppeldribbling**. Dann musst du passen oder werfen.'],
      woerter: [['dribbeln', 'dribbler'], ['prellen', 'faire rebondir'], ['die Fingerkuppe', 'le bout des doigts'], ['die Hüfte', 'la hanche'], ['gebeugt', 'fléchi'], ['stolpern', 'trébucher'], ['der Parcours', 'le parcours'], ['das Doppeldribbling', 'la reprise de dribble']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Man dribbelt mit den Fingern, nicht mit der flachen Hand.', true], ['Der Ball soll bis zum Kopf springen.', false], ['Beim Dribbeln schaut man immer auf den Ball.', false], ['Nach dem Fangen darf man nicht wieder dribbeln.', true]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Sporthalle · Dribbel-Parcours', titel: 'Hütchen, Hütchen, Hütchen',
      situation: 'Yusuf dribbelt durch den Parcours. Der Ball springt ihm immer weg. Frau Diallo gibt Tipps.',
      bild: ['yusuf:wuetend:stehen', 'lehrerin:froh:zeigen'], sprecher: { Yusuf: 'm3', 'Frau Diallo': 'w1' },
      text: [
        ['Yusuf', 'Der Ball springt mir immer weg! Bei jedem Hütchen.'],
        ['Frau Diallo', 'Zeig mal. … Ah, ich sehe es. Du schlägst den Ball mit der flachen Hand. Versuch, ihn mit den Fingern zu drücken.'],
        ['Yusuf', 'Okay … So?'],
        ['Frau Diallo', 'Besser. Und du prellst ihn sehr hoch – bis zur Brust. Geh etwas in die Knie. Dann ist der Weg kürzer und du hast mehr Kontrolle.'],
        ['Yusuf', 'Und an den Hütchen?'],
        ['Frau Diallo', 'Wenn das Hütchen rechts ist, nimmst du die linke Hand. Dein Körper schützt den Ball.'],
        ['Yusuf', 'Puh, mit links ist das schwer.'],
        ['Frau Diallo', 'Am Anfang ja. Übe jeden Tag zwei Minuten mit links. In zwei Wochen merkst du den Unterschied.'],
        ['Yusuf', 'Noch einmal! … Ha, diesmal ohne Fehler!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Hütchen beim Sport? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein kleiner Kegel aus Plastik als Markierung', 'ein Hut'], r: 0 }] }],
      beim: [
        { art: 'zuordnen', auftrag: 'Hör zu. Welches Problem – welcher Tipp? Verbinde.', stufe: 1, links: ['Yusuf schlägt den Ball mit der flachen Hand.', 'Der Ball springt bis zur Brust.', 'Das Hütchen ist rechts.', 'Mit links ist es schwer.'], rechts: ['mit den Fingern drücken', 'in die Knie gehen, niedriger prellen', 'mit der linken Hand dribbeln', 'jeden Tag zwei Minuten mit links üben'] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was übst du gerade, das am Anfang schwer war? Wie lange hat es gedauert, bis es besser wurde?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Am Anfang war … schwer.', 'Nach … ging es besser.', 'Geholfen hat …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Dribbeln', punkte: ['mit den **Fingern** drücken', 'bis zur **Hüfte**, Knie gebeugt', '**neben** dem Körper', '**Blick hoch**', '**beide** Hände üben'] },
         { titel: 'Regel', punkte: ['Laufen mit Ball nur mit **Dribbeln**', 'Ball gefangen: **nicht** wieder dribbeln (**Doppeldribbling**)', 'dann **passen** oder **werfen**'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Dribbel-Karten: Zieht eine Karte und macht die Aufgabe. Schafft ihr alle Stufen?', stufe: 2, neueSeite: true, titel: 'Dribbeln', icon: 'ball-basketball', farbe: BALL, spalten: 2,
        karten: [
          { text: '**Stufe 1**\nIm Stehen 20-mal rechts, 20-mal links prellen.' }, { text: '**Stufe 2**\nIm Gehen durch die Halle dribbeln, Blick nach vorn.' },
          { text: '**Stufe 3**\nSlalom um 5 Hütchen, beim Hütchen die Hand wechseln.' }, { text: '**Stufe 4**\nDribbeln und dabei die Zahl rufen, die der Partner mit den Fingern zeigt.' },
          { text: '**Stufe 5**\nZwei Bälle gleichzeitig prellen.' }, { text: '**Stufe 6**\nDribbel-Fangen: Wer dribbelt, darf nicht gefangen werden.' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welche Dribbel-Stufe hast du geschafft? Woran arbeitest du als Nächstes?', stufe: 1,
        anfaenge: ['Ich habe Stufe … geschafft.', 'Am schwersten war …', 'Als Nächstes …'], zeilen: 5,
        beispiel: 'Ich habe Stufe 3 geschafft. Am schwersten war der Handwechsel beim Hütchen, weil ich mit links noch unsicher bin. Als Nächstes übe ich, beim Dribbeln nach vorn zu schauen.' },
    ],
    check: ['Ich dribble mit den Fingern auf Hüfthöhe.', 'Ich dribble mit beiden Händen.', 'Ich kenne die Regel zum Doppeldribbling.'],
  },
  // ================================================================ 3
  {
    thema: 'Basketball-Regeln', titel: 'Pfiff! Was war das?', untertitel: 'Ohne Regeln gibt es kein Spiel. Du lernst das Basketballfeld kennen, die wichtigsten Regeln und was der Schiedsrichter pfeift.',
    ziel: { de: 'Ich kenne das Basketballfeld und die wichtigsten Regeln.', fr: 'Je connais le terrain de basket et les règles principales.' },
    bild: ['chloe:froh:stehen-zeigen', 'ben:verwirrt:stehen'],
    start: {
      was: 'Schätze',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie viele Spieler hat eine Basketball-Mannschaft gleichzeitig auf dem Feld? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['5', '7', '11'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sportwissen (Regeln vereinfacht)', titel: 'Die wichtigsten Basketball-Regeln',
      absaetze: [
        'Zwei Mannschaften mit je **fünf** Spielern auf dem Feld versuchen, den Ball in den gegnerischen **Korb** zu werfen.',
        '**Punkte:** Ein Korb aus dem Spiel zählt **zwei** Punkte. Wirft man von hinter der **Dreipunktlinie**, gibt es **drei** Punkte. Ein **Freiwurf** zählt **einen** Punkt.',
        '**Schrittfehler:** Mit dem Ball in der Hand darf man höchstens **zwei Schritte** machen. Wer mehr läuft, ohne zu dribbeln, macht einen Schrittfehler. Der Ball geht an die andere Mannschaft.',
        '**Doppeldribbling:** Wer aufhört zu dribbeln, darf nicht noch einmal anfangen.',
        '**Foul:** Stoßen, Festhalten, Schlagen auf den Arm – Basketball ist ein Spiel **ohne harten Körperkontakt**. Bei einem Foul beim Wurf gibt es Freiwürfe.',
        '**Aus:** Berührt der Ball die Linie oder den Boden außerhalb, ist er im Aus. Die andere Mannschaft wirft ein.',
        'Mit dem **Fuß** darf man den Ball nicht absichtlich spielen.',
      ],
      woerter: [['der Korb', 'le panier'], ['der Punkt', 'le point'], ['die Dreipunktlinie', 'la ligne à trois points'], ['der Freiwurf', 'le lancer franc'], ['der Schrittfehler', 'le marcher'], ['das Foul', 'la faute'], ['das Aus', 'la sortie'], ['einwerfen', 'remettre en jeu']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Wie viele Punkte gibt es? Trage ein.', stufe: 1, kopf: ['Situation', 'Punkte'], breiten: [75, 25], zeilen: [['Korb aus der Nähe', '[2]'], ['Korb von hinter der Dreipunktlinie', '[3]'], ['Freiwurf getroffen', '[1]'], ['Ball geht daneben', '[0]']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Sporthalle · Spiel mit Schiedsrichterin', titel: 'Chloé pfeift',
      situation: 'Chloé ist Schiedsrichterin. Sie pfeift dreimal. Ben versteht nicht, warum.',
      bild: ['chloe:froh:stehen-zeigen', 'ben:verwirrt:stehen'], sprecher: { Chloé: 'w3', Ben: 'm2' },
      text: [
        ['Chloé', 'Pfiff! Ben, Schrittfehler. Du bist mit dem Ball drei Schritte gelaufen.'],
        ['Ben', 'Was? Ich bin doch nur zum Korb gelaufen.'],
        ['Chloé', 'Genau. Ohne zu dribbeln. Höchstens zwei Schritte. Ball für Blau.'],
        ['Ben', 'Okay …'],
        ['Chloé', 'Pfiff! Foul von Sami. Er hat Ben beim Wurf am Arm festgehalten. Ben, du bekommst zwei Freiwürfe.'],
        ['Ben', 'Na also. Erster Freiwurf … drin! Zweiter … daneben.'],
        ['Chloé', 'Ein Punkt für Rot. Und weiter.'],
        ['Chloé', 'Pfiff! Ben, Doppeldribbling. Du hast den Ball gefangen und dann wieder gedribbelt.'],
        ['Ben', 'Mann, du pfeifst alles!'],
        ['Chloé', 'Ich pfeife nur, was in den Regeln steht. Aber deine Freiwürfe waren gut!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht eine Schiedsrichterin? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie achtet auf die Regeln und entscheidet.', 'Sie spielt in einer Mannschaft mit.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Was pfeift Chloé? Warum?', stufe: 1, kopf: ['Pfiff', 'Regel', 'Was ist passiert?'], breiten: [12, 28, 60], zeilen: [['1', '[Schrittfehler]', '[Ben ist mit dem Ball drei Schritte gelaufen, ohne zu dribbeln]'], ['2', '[Foul]', '[Sami hat Ben beim Wurf am Arm festgehalten → 2 Freiwürfe]'], ['3', '[Doppeldribbling]', '[Ben hat den Ball gefangen und wieder gedribbelt]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie fühlt man sich als Schiedsrichter? Was ist schwer, was macht Spaß?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Schwer ist …', 'Gut ist …', 'Ein guter Schiedsrichter …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Punkte', punkte: ['Korb: **2**', 'hinter der Dreipunktlinie: **3**', 'Freiwurf: **1**'] },
         { titel: 'Pfiff bei …', punkte: ['**Schrittfehler**: mehr als 2 Schritte mit Ball', '**Doppeldribbling**', '**Foul**: Stoßen, Festhalten, Schlagen', '**Aus**: Ball auf oder hinter der Linie', 'Ball absichtlich mit dem **Fuß**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Beschrifte das Basketballfeld.', stufe: 1, html: '<div class="voll">' + spielfeld('basketball') + '</div>', liste: [['1', 'Korb'], ['2', 'Freiwurflinie'], ['3', 'Dreipunktlinie'], ['4', 'Mittellinie'], ['5', 'Zone'], ['6', 'Mittelkreis']], spalten: 3 },
      { art: 'zuordnen', auftrag: 'Was pfeift die Schiedsrichterin? Verbinde.', stufe: 2, links: ['Mia fängt den Ball und läuft vier Schritte zum Korb.', 'Tom stößt einen Gegner mit dem Körper weg.', 'Der Ball rollt über die Seitenlinie.', 'Lio dribbelt, fängt den Ball und dribbelt wieder los.'], rechts: ['Schrittfehler', 'Foul', 'Aus', 'Doppeldribbling'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Erkläre einem jüngeren Kind die drei wichtigsten Basketball-Regeln.', stufe: 2,
        anfaenge: ['Beim Basketball …', 'Erstens …', 'Zweitens …', 'Drittens …'], zeilen: 6,
        beispiel: 'Beim Basketball willst du den Ball in den Korb werfen. Erstens: Wenn du mit dem Ball laufen willst, musst du dribbeln. Zweitens: Wenn du den Ball fängst, darfst du nicht wieder dribbeln – dann passt du oder wirfst. Drittens: Du darfst niemanden stoßen oder festhalten, sonst ist es ein Foul.' },
    ],
    check: ['Ich kenne die Linien auf dem Basketballfeld.', 'Ich weiß, wie viele Punkte es gibt.', 'Ich erkenne Schrittfehler, Doppeldribbling und Foul.'],
  },
  // ================================================================ 4
  {
    thema: 'Freilaufen und Zusammenspiel', titel: 'Frei sein – den Ball bekommen', untertitel: 'Wer nur steht, bekommt den Ball nicht. Du lernst, wie man sich freiläuft, den Raum nutzt und als Team zusammenspielt. Eine Halbzeit-Ansprache zeigt, worauf es ankommt.',
    ziel: { de: 'Ich laufe mich frei und spiele im Team zusammen.', fr: 'Je me démarque et je joue collectivement.' },
    bild: ['amira:froh:stehen-zeigen', 'tom:enttaeuscht:stehen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Deine Mitspielerin hat den Ball. Ein Gegner steht direkt vor dir. Was machst du? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ich laufe in einen freien Raum und zeige mit der Hand: Hier!', 'Ich bleibe stehen und warte.', 'Ich renne direkt zu ihr hin.'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sportwissen', titel: 'Freilaufen – so geht’s',
      absaetze: [
        '**Freilaufen** heißt: Du bewegst dich so, dass zwischen dir und dem Ball **kein Gegner** steht. Dann kann man dir den Ball zuspielen.',
        '**Raum nutzen:** Lauf dorthin, wo **Platz** ist. Wenn alle beim Ball stehen, ist keiner frei. Verteilt euch über das Feld.',
        '**Zeigen und rufen:** Streck die Hand aus, wo du den Ball haben willst, und ruf den Namen deiner Mitspielerin oder „Hier!“.',
        '**Abspielen und weiterlaufen:** Nach dem Pass bleibst du nicht stehen. Lauf weiter in einen freien Raum. So entsteht ein schnelles Zusammenspiel.',
        '**Alle einbeziehen:** Ein Team ist stark, wenn **alle** den Ball bekommen – nicht nur die Besten. Wer oft den Ball bekommt, wird auch besser.',
      ],
      woerter: [['sich freilaufen', 'se démarquer'], ['der Raum', 'l’espace'], ['zuspielen', 'passer'], ['verteilen', 'répartir'], ['abspielen', 'passer le ballon'], ['das Zusammenspiel', 'le jeu collectif'], ['einbeziehen', 'intégrer'], ['die Halbzeit', 'la mi-temps']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte mit dem Text.', stufe: 1, fragen: [{ f: 'Was heißt freilaufen?', zeilen: 2, l: 'sich so bewegen, dass kein Gegner zwischen einem selbst und dem Ball steht' }, { f: 'Was macht man nach einem Pass?', l: 'weiterlaufen in einen freien Raum' }, { f: 'Warum sollen alle den Ball bekommen?', zeilen: 2, l: 'Ein Team ist stark, wenn alle mitspielen; wer oft den Ball bekommt, wird besser.' }] },
      ],
    },
    hoeren: {
      was: 'Eine Halbzeit-Ansprache', wo: 'Sporthalle · Halbzeit', titel: 'Wir müssen reden',
      situation: 'Halbzeit. Team Rot liegt hinten. Amira ist Kapitänin und spricht mit ihrem Team.',
      bild: ['amira:froh:stehen-zeigen', 'tom:enttaeuscht:stehen'], sprecher: { Amira: 'w2', Tom: 'm3', Lio: 'm1' },
      text: [
        ['Amira', 'Okay, alle mal her. Wir liegen sechs Punkte hinten. Was läuft schief?'],
        ['Tom', 'Ich bekomme nie den Ball. Ich stehe die ganze Zeit da und keiner passt zu mir.'],
        ['Amira', 'Du stehst aber immer hinter deinem Gegner. Dann kann ich dich nicht anspielen.'],
        ['Lio', 'Und wir laufen alle zum Ball. Dann stehen wir uns gegenseitig im Weg.'],
        ['Amira', 'Genau. Neuer Plan: Wir verteilen uns. Tom links, Lio rechts, ich in der Mitte. Wer frei ist, streckt die Hand hoch und ruft.'],
        ['Tom', 'Und wenn ich den Ball habe?'],
        ['Amira', 'Dann passt du schnell und läufst sofort weiter. Nicht stehen bleiben.'],
        ['Lio', 'Und noch was: Wir spielen auch Tom an. Er wirft gut, wenn er frei ist.'],
        ['Amira', 'Abgemacht. Hände in die Mitte: Eins, zwei, drei – Rot!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht eine Kapitänin im Team? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie führt das Team und spricht für es.', 'Sie ist die Schiedsrichterin.'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Warum bekommt Tom nie den Ball?', zeilen: 2, l: 'Er steht immer hinter seinem Gegner.' }, { f: 'Welches zweite Problem nennt Lio?', l: 'Alle laufen zum Ball und stehen sich im Weg.' }, { f: 'Was ist der neue Plan? Nenne zwei Punkte.', zeilen: 2, l: 'sich verteilen (links, rechts, Mitte), Hand hoch und rufen, schnell passen und weiterlaufen, auch Tom anspielen' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Spielt eine Halbzeit-Besprechung nach. Was läuft gut, was ändern wir?', stufe: 2, karten: [
        { titel: 'Halbzeit', text: ['Gut läuft …', 'Problem ist …', 'Unser Plan: …', 'Hände in die Mitte!'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Freilaufen', nummern: true, punkte: ['in den **freien Raum**', 'kein Gegner **zwischen** dir und Ball', '**Hand** zeigen, **rufen**', 'nach dem Pass **weiterlaufen**'] },
         { titel: 'Als Team', punkte: ['über das Feld **verteilen**', 'nicht alle zum Ball', '**alle** anspielen', 'in der **Halbzeit** besprechen'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Taktik-Tafel: Zeichne auf das Feld, wo sich drei Spieler deines Teams verteilen. Mal Pfeile für Pässe und Laufwege.', stufe: 3, html: '<div class="voll">' + spielfeld('basketball', { nummern: false }) + '</div>', liste: [['Mein Plan in einem Satz:', 'Individuell']], spalten: 1 },
      { art: 'tabelle', auftrag: 'Pass-Zähler: Ein Beobachter zählt bei einem Spiel, wie oft jede Person den Ball bekommt.', stufe: 2, kopf: ['Spieler/in', 'Anzahl Pässe (Striche)', 'Summe'], breiten: [30, 50, 20], zeilen: [['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie hat sich das Spiel nach dem Plan verändert? Hast du öfter den Ball bekommen?', stufe: 2,
        anfaenge: ['Vor dem Plan …', 'Nach dem Plan …', 'Ich habe gemerkt, dass …'], zeilen: 5,
        beispiel: 'Vor dem Plan bin ich immer zum Ball gelaufen und habe nur wenige Pässe bekommen. Nach dem Plan bin ich auf der linken Seite geblieben und habe gerufen. Ich habe gemerkt, dass ich viel öfter frei war und sogar zwei Körbe geworfen habe.' },
    ],
    check: ['Ich laufe mich frei.', 'Ich spiele ab und laufe weiter.', 'Ich beziehe alle im Team ein.'],
  },
  // ================================================================ 5
  {
    thema: 'Kleine Spiele · Spielregeln lesen', titel: 'Parteiball und Brennball', untertitel: 'Kleine Spiele machen Spaß und trainieren Werfen, Fangen und Laufen. Du liest die Regeln von zwei Spielen, hörst eine Erklärung und spielt sie in der Halle.',
    ziel: { de: 'Ich lese Spielregeln, verstehe sie und halte mich daran.', fr: 'Je lis des règles de jeu, je les comprends et je les respecte.' },
    bild: ['mia:froh:gehen', 'noah:froh:stehen'],
    start: {
      was: 'Kennst du das?',
      aufgaben: [
        { art: 'fragen', auftrag: 'Welche Spiele mit Ball kennst du aus der Schule oder aus der Pause?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Fußball, Basketball, Völkerball, Brennball, Parteiball, Fangen mit Ball …' }] },
      ],
    },
    lesen: {
      was: 'Spielregeln', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Spielesammlung', titel: 'Zwei kleine Spiele',
      absaetze: [
        '### Parteiball',
        '**Ziel:** Dein Team spielt sich den Ball **zehnmal** hintereinander zu, ohne dass das andere Team ihn abfängt. Dann gibt es einen Punkt.',
        '**Regeln:** Mit dem Ball darf man höchstens **drei Schritte** machen. Man darf den Ball nicht direkt an die Person zurückspielen, von der man ihn bekommen hat. **Kein Körperkontakt** – den Ball darf man nur abfangen, nicht aus der Hand reißen. Alle zählen laut mit.',
        '### Brennball',
        '**Ziel:** Das Lauf-Team läuft um die Matten und sammelt Punkte. Das Feld-Team versucht, die Läufer zu „verbrennen“.',
        '**Regeln:** Ein Läufer wirft den Ball weit ins Feld und läuft los, von Matte zu Matte. Das Feld-Team holt den Ball und bringt ihn so schnell wie möglich zum **Brennmal**, zum Beispiel einem Reifen. Dann ruft es „**Verbrannt!**“. Wer jetzt **zwischen** zwei Matten ist, ist verbrannt und muss zurück. Wer auf einer Matte steht, ist sicher. Wer einmal ganz herumkommt, holt einen Punkt. Nach einer Zeit wechseln die Teams.',
      ],
      woerter: [['das Ziel', 'le but'], ['abfangen', 'intercepter'], ['der Körperkontakt', 'le contact physique'], ['die Matte', 'le tapis'], ['das Feld', 'le terrain'], ['verbrennen (im Spiel)', 'brûler (au jeu)'], ['sicher', 'en sécurité'], ['wechseln', 'changer']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Beim Parteiball braucht man zehn Pässe für einen Punkt.', true], ['Beim Parteiball darf man mit dem Ball durch die ganze Halle laufen.', false], ['Beim Brennball ist man auf der Matte sicher.', true], ['Wer beim Brennball zwischen zwei Matten ist, wenn „Verbrannt!“ gerufen wird, holt einen Punkt.', false]] },
      ],
    },
    hoeren: {
      was: 'Eine Spielerklärung', wo: 'Sporthalle', titel: 'Noah erklärt Brennball',
      situation: 'Noah erklärt der Klasse Brennball. Mia hat Fragen.',
      bild: ['noah:froh:stehen', 'mia:verwirrt:stehen'], sprecher: { Noah: 'm3', Mia: 'w3' },
      text: [
        ['Noah', 'Wir spielen Brennball. Hier sind vier Matten in den Ecken. Da drüben steht der Reifen – das ist das Brennmal.'],
        ['Noah', 'Mein Team läuft zuerst. Ihr seid das Feld-Team und verteilt euch in der Halle.'],
        ['Mia', 'Und wie fängt es an?'],
        ['Noah', 'Der erste Läufer wirft den Ball weit ins Feld und rennt los zur ersten Matte. Ihr holt den Ball, passt ihn euch zu und legt ihn in den Reifen. Dann ruft ihr ganz laut: Verbrannt!'],
        ['Mia', 'Und was passiert dann?'],
        ['Noah', 'Wer dann zwischen zwei Matten ist, ist verbrannt und muss zurück zum Start. Wer auf einer Matte steht, ist sicher.'],
        ['Mia', 'Dürfen mehrere Leute auf einer Matte stehen?'],
        ['Noah', 'Ja, so viele draufpassen. Aber nicht drängeln!'],
        ['Mia', 'Und wann wechseln wir?'],
        ['Noah', 'Nach fünf Minuten. Dann seid ihr dran mit Laufen. Das Team mit den meisten Punkten gewinnt.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „drängeln“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['andere schubsen, um selbst Platz zu bekommen', 'langsam gehen'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne den Ablauf beim Brennball.', stufe: 1, teile: ['Der Läufer wirft den Ball weit ins Feld.', 'Er rennt los zur ersten Matte.', 'Das Feld-Team holt den Ball und passt ihn sich zu.', 'Der Ball wird in den Reifen gelegt.', 'Das Feld-Team ruft: Verbrannt!', 'Wer zwischen den Matten ist, muss zurück zum Start.'], ordnung: [3, 0, 5, 1, 4, 2] },
        { art: 'fragen', auftrag: 'Wann wechseln die Teams?', stufe: 1, fragen: [{ f: '', l: 'nach fünf Minuten' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erkläre einem Partner ein Spiel, das du kennst. Der Partner stellt Fragen wie Mia.', stufe: 2, karten: [
        { titel: 'Fragen', text: ['Wie fängt es an?', 'Was ist das Ziel?', 'Was ist verboten?', 'Wer gewinnt?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Parteiball', punkte: ['**10 Pässe** = 1 Punkt', 'höchstens **3 Schritte** mit Ball', 'nicht direkt **zurückpassen**', '**kein Körperkontakt**'] },
         { titel: 'Brennball', punkte: ['Läufer wirft und **läuft** von Matte zu Matte', 'Feld-Team bringt Ball zum **Brennmal**', '„**Verbrannt!**“: wer zwischen Matten ist, muss zurück', 'einmal herum = **1 Punkt**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Spiel-Protokoll Brennball: Tragt die Punkte ein.', stufe: 1, kopf: ['Durchgang', 'Team A', 'Team B'], breiten: [34, 33, 33], zeilen: [['1', '', ''], ['2', '', ''], ['3', '', ''], ['Summe', '', '']] },
      { art: 'fragen', auftrag: 'Regeln anpassen: Wie könnt ihr Parteiball so verändern, dass Nele im Rollstuhl gut mitspielen kann? Schreibt zwei Ideen auf.', stufe: 3, fragen: [{ f: '', zeilen: 3, l: 'z. B. Nele darf nicht angegriffen werden, wenn sie den Ball hat; Bodenpässe zählen doppelt; mehr Zeit für Pässe; Nele hat einen festen Platz/eine Zone.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welches Spiel hat dir mehr Spaß gemacht – Parteiball oder Brennball? Warum?', stufe: 1,
        anfaenge: ['Mehr Spaß gemacht hat mir …', 'weil …', 'Schwierig fand ich …'], zeilen: 5,
        beispiel: 'Mehr Spaß gemacht hat mir Brennball, weil man schnell laufen muss und es spannend ist, ob man es bis zur Matte schafft. Schwierig fand ich, weit zu werfen. Beim nächsten Mal versuche ich einen Überkopfwurf.' },
    ],
    check: ['Ich verstehe Spielregeln aus einem Text.', 'Ich erkläre ein Spiel so, dass andere es spielen können.', 'Ich halte mich an die Regeln.'],
  },
  // ================================================================ 6
  {
    thema: 'Projekt: Ein eigenes Ballspiel erfinden', titel: 'Unser eigenes Spiel', untertitel: 'Jetzt seid ihr die Spiele-Erfinder! Ihr plant ein eigenes Ballspiel mit Ziel, Regeln und Material, testet es mit der Klasse und verbessert es.',
    ziel: { de: 'Ich erfinde mit meinem Team ein Ballspiel, erkläre es und verbessere es.', fr: 'Avec mon équipe, j’invente un jeu de balle, je l’explique et je l’améliore.' },
    bild: ['lea:froh:blatt', 'sami:aufgeregt:stehen'],
    start: {
      was: 'Ideen',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Was braucht ein gutes Spiel? Sammelt.', stufe: 1, mitte: 'Gutes Spiel', aeste: ['klares Ziel', { l: 'einfache Regeln' }, { l: 'alle machen mit' }, { l: 'sicher' }, { l: 'spannend' }, { l: 'Material' }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Projekt-Anleitung', titel: 'In fünf Schritten zum eigenen Spiel',
      material: ['Bälle, Hütchen, Reifen, Matten, Leibchen', 'Spielkarte zum Ausfüllen'],
      schritte: [
        { icon: 'bulb', text: '**Idee und Ziel:** Was soll man erreichen? Einen Ball in ein Ziel bringen, Punkte sammeln, eine Strecke schaffen?' },
        { icon: 'layout-grid', text: '**Feld und Material:** Wie groß ist das Feld? Was braucht ihr? Zeichnet einen Plan.' },
        { icon: 'list-check', text: '**Regeln:** Höchstens **fünf** einfache Regeln. Was ist erlaubt, was verboten? Wie bekommt man Punkte?' },
        { icon: 'shield-check', text: '**Sicherheit und alle dabei:** Kann sich jemand verletzen? Können **alle** mitspielen – auch wer im Rollstuhl sitzt oder langsamer ist?' },
        { icon: 'refresh', text: '**Testen und verbessern:** Spielt das Spiel fünf Minuten mit der Klasse. Fragt danach: Was war gut? Was war unklar? Ändert die Regeln.' },
      ],
      danach: ['Die besten Spiele haben **einfache** Regeln, die man in einer Minute erklären kann. Und bei ihnen hat jeder eine **Chance**.'],
      woerter: [['erfinden', 'inventer'], ['das Spiel', 'le jeu'], ['das Material', 'le matériel'], ['das Leibchen', 'le chasuble'], ['erlaubt', 'permis'], ['verboten', 'interdit'], ['testen', 'tester'], ['die Chance', 'la chance']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Ordne die Schritte.', stufe: 1, teile: ['Idee und Ziel', 'Feld und Material', 'Regeln', 'Sicherheit und alle dabei', 'Testen und verbessern'], ordnung: [2, 4, 0, 3, 1] },
      ],
    },
    hoeren: {
      was: 'Eine Spielvorstellung', wo: 'Sporthalle', titel: 'Hütchen-Jagd',
      situation: 'Lea und Sami stellen ihr erfundenes Spiel vor. Nach dem Test gibt es Rückmeldungen.',
      bild: ['lea:froh:erklaeren', 'sami:aufgeregt:stehen'], sprecher: { Lea: 'w3', Sami: 'm2', 'Frau Diallo': 'w1' },
      text: [
        ['Lea', 'Unser Spiel heißt Hütchen-Jagd. Jedes Team hat fünf Hütchen in seiner Hälfte. Ziel ist es, mit einem Softball die Hütchen des anderen Teams umzuwerfen.'],
        ['Sami', 'Die Regeln: Man darf nicht über die Mittellinie. Man wirft nur von unten oder mit Bodenpass, nicht hart. Wer den Ball fängt, darf sofort werfen.'],
        ['Lea', 'Und jedes Team hat einen Hütchen-Wächter, der die eigenen Hütchen schützt. Der Wächter wechselt nach jedem Treffer.'],
        ['Frau Diallo', 'Gut, wir testen fünf Minuten. Los!'],
        ['Frau Diallo', 'Stopp. Rückmeldungen?'],
        ['Sami', 'Ein Problem: Manche haben den Ball nie bekommen, weil immer die Gleichen geworfen haben.'],
        ['Lea', 'Verbesserung: Jeder darf nur zweimal hintereinander werfen, dann muss er abgeben.'],
        ['Frau Diallo', 'Sehr gut. Und die Regel mit dem Wächter-Wechsel war super – so war jeder einmal dran.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Softball? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein weicher Ball, der nicht wehtut', 'ein sehr harter Ball'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und fülle die Spielkarte aus.', stufe: 1, kopf: ['', 'Hütchen-Jagd'], breiten: [32, 68], zeilen: [['Ziel', '[mit einem Softball die Hütchen des anderen Teams umwerfen]'], ['Material', '[Softball, 10 Hütchen (5 pro Team)]'], ['Regeln', '[nicht über die Mittellinie; nur von unten/Bodenpass werfen; wer fängt, wirft sofort; ein Hütchen-Wächter, der nach jedem Treffer wechselt]'], ['Problem beim Test', '[immer die Gleichen haben geworfen]'], ['Verbesserung', '[jeder darf nur zweimal hintereinander werfen]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Gebt einer anderen Gruppe Rückmeldung zu ihrem Spiel: Was war gut? Was war unklar? Was könnten sie verbessern?', stufe: 2, karten: [
        { titel: 'Rückmeldung', text: ['Gut war …', 'Unklar war …', 'Vielleicht könntet ihr …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Spiel erfinden', nummern: true, punkte: ['**Ziel**', '**Feld** und Material', 'höchstens **5 Regeln**', '**Sicherheit**, alle dabei', '**testen** und verbessern'] },
         { titel: 'Gute Spiele', punkte: ['in **1 Minute** erklärt', '**jeder** hat eine Chance', 'Rollen **wechseln**', '**sicher** für alle'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Unsere Spielkarte: Füllt sie für euer eigenes Spiel aus. Hängt sie in der Halle auf – so können auch andere Klassen euer Spiel spielen.', stufe: 3, neueSeite: true, titel: 'Unser Spiel', icon: 'ball-football', farbe: SPIEL, spalten: 2,
        karten: [
          { text: '**Name und Ziel**', linien: 4 }, { text: '**Feld und Material**', linien: 4 },
          { text: '**Regeln (höchstens 5)**', linien: 5 }, { text: '**Alle dabei und Sicherheit**', linien: 5 },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie lief der Test eures Spiels? Was habt ihr verbessert? Was war deine Aufgabe im Team?', stufe: 2,
        anfaenge: ['Unser Spiel heißt …', 'Beim Test …', 'Wir haben verbessert, dass …', 'Meine Aufgabe war …'], zeilen: 6,
        beispiel: 'Unser Spiel heißt Reifen-Rally. Beim Test hat es allen Spaß gemacht, aber die Regel mit den Reifen war unklar. Wir haben verbessert, dass jeder Reifen eine Farbe hat und es dafür verschiedene Punkte gibt. Meine Aufgabe war es, die Regeln vorzulesen und zu erklären.' },
    ],
    check: ['Ich plane mit meinem Team ein Spiel.', 'Ich erkläre Regeln kurz und klar.', 'Ich verbessere ein Spiel nach dem Test.'],
  },
]

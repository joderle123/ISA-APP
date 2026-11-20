// Atelier · Modul 6 (6P) „Garten und Natur“ – Enseignement pratique, Voie de préparation.
// Transversale Kompetenzen (Leitfaden VP): Anleitungen lesen, Werkzeug pflegen, sorgfältig und regelmäßig arbeiten, beobachten und protokollieren.
// Multimodal: Pflanze beschriften, Kompost-Sortierkarten, Samentüte lesen (Kalender), Keim-Protokoll, Gartenwerkzeug-Symbole,
// Kräuter-Sinnesstation (Hörtext), Projekt Nisthilfe für Wildbienen. Ergänzt Culture générale 8 (Artenvielfalt) um die Praxis.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { pflanze, samenTuete } from './praxis-bilder.mjs'

export const MODUL = sachModul('atelier', 6, {
  titel: 'Garten und Natur',
  titelFr: 'Jardin et nature',
  unter: 'Was Pflanzen brauchen, guter Boden und Kompost, säen und pflegen, Gartenwerkzeug sicher benutzen, Kräuter kennen und eine Nisthilfe für Wildbienen bauen.',
  unterFr: 'Besoins des plantes, sol et compost, semer et entretenir, outils de jardin, herbes aromatiques, nichoir à abeilles sauvages.',
  farbe: '#3f8a3a',
  deckbild: ['lina:froh:hocken', 'noah:froh:stehen', 'mia:froh:stehen-zeigen'],
  blasen: [{ t: 'Es keimt!', x: 8, y: 104 }, { t: 'Riech mal!', x: 122, y: 92 }, { t: '1 cm tief', x: 176, y: 150 }],
  aussprache: { '(\\d+) bis (\\d+) cm': '\\1 bis \\2 Zentimeter' },
  themen: [
    { titel: { de: 'Pflanzen und Boden', fr: 'Plantes et sol' }, icon: 'seedling', lektionen: 3 },
    { titel: { de: 'Pflegen und schützen', fr: 'Entretenir et protéger' }, icon: 'plant-2', lektionen: 3 },
  ],
})

const GRUEN = '#3f8a3a', ERDE = '#8a6a46'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Was Pflanzen brauchen', titel: 'Wie eine Pflanze lebt', untertitel: 'Pflanzen können nicht weglaufen, um Essen zu holen. Trotzdem wachsen sie. Du lernst, was eine Pflanze zum Leben braucht und welche Aufgabe jeder Teil hat.',
    ziel: { de: 'Ich kenne die Teile einer Pflanze und weiß, was Pflanzen zum Wachsen brauchen.', fr: 'Je connais les parties d’une plante et je sais de quoi elle a besoin pour pousser.' },
    bild: ['lina:froh:hocken', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Eine Pflanze steht seit zwei Wochen in einem dunklen Schrank. Wie sieht sie wohl aus? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['blass und schlapp', 'grün und kräftig', 'genau wie vorher'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Naturkunde (vereinfacht)', titel: 'Was eine Pflanze zum Leben braucht',
      absaetze: [
        'Eine Pflanze braucht **Licht**, **Wasser**, **Luft**, **Nährstoffe** aus dem Boden und **Wärme**. Fehlt etwas davon lange, wird sie schwach oder stirbt.',
        '### Jeder Teil hat eine Aufgabe',
        'Die **Wurzeln** halten die Pflanze im Boden fest. Sie nehmen Wasser und Nährstoffe auf. Der **Stängel** trägt die Blätter und Blüten. In ihm fließt das Wasser nach oben – wie in feinen Röhren.',
        'Die **Blätter** sind die Küche der Pflanze. Mit dem **Sonnenlicht**, mit Wasser und mit Luft machen sie Zucker. Davon lebt und wächst die Pflanze. Dabei geben sie **Sauerstoff** ab – den brauchen wir zum Atmen.',
        'Die **Blüte** lockt Insekten an. Sie bringen Blütenstaub von Blüte zu Blüte. Danach entsteht die **Frucht** mit den **Samen**. Aus einem Samen kann eine neue Pflanze wachsen.',
      ],
      woerter: [['die Pflanze', 'la plante'], ['die Wurzel', 'la racine'], ['der Stängel', 'la tige'], ['das Blatt', 'la feuille'], ['die Blüte', 'la fleur'], ['die Frucht', 'le fruit'], ['der Samen', 'la graine'], ['der Nährstoff', 'le nutriment']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welcher Teil hat welche Aufgabe? Verbinde.', stufe: 1, links: ['Wurzel', 'Stängel', 'Blatt', 'Blüte', 'Frucht'], rechts: ['hält die Pflanze fest, nimmt Wasser auf', 'trägt Blätter, leitet Wasser nach oben', 'macht mit Licht Zucker', 'lockt Insekten an', 'enthält die Samen'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Schulgarten · im Frühling', titel: 'Das Experiment mit der Kresse',
      situation: 'Die Klasse hat vor einer Woche Kresse in drei Schalen gesät. Jede Schale stand an einem anderen Ort. Jetzt schauen Lina und Frau Morel nach.',
      bild: ['lina:ueberrascht:hocken', 'lehrerin:froh:erklaeren'], sprecher: { 'Frau Morel': 'w1', Lina: 'w3' },
      text: [
        ['Frau Morel', 'So, Lina. Schauen wir uns die drei Schalen an. Schale A stand auf der Fensterbank und wurde jeden Tag gegossen.'],
        ['Lina', 'Die ist super! Grün, dicht und schon fünf Zentimeter hoch.'],
        ['Frau Morel', 'Schale B stand auch auf der Fensterbank. Aber sie wurde nie gegossen.'],
        ['Lina', 'Da ist fast nichts. Ein paar Samen sind aufgeplatzt, aber dann vertrocknet.'],
        ['Frau Morel', 'Und Schale C wurde gegossen, stand aber im dunklen Schrank.'],
        ['Lina', 'Komisch! Die Kresse ist sogar lang, aber ganz gelb und dünn. Sie fällt um.'],
        ['Frau Morel', 'Genau. Ohne Licht kann sie keinen Zucker machen und wird nicht grün. Sie wächst lang und dünn, weil sie das Licht sucht.'],
        ['Lina', 'Also braucht Kresse Wasser und Licht. Darf ich Schale A mit nach Hause nehmen? Kresse schmeckt gut auf Brot.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Experiment? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Versuch, mit dem man etwas herausfindet', 'ein Spiel ohne Regeln'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und fülle das Protokoll aus.', stufe: 1, kopf: ['Schale', 'Licht?', 'Wasser?', 'Ergebnis'], breiten: [14, 14, 14, 58], zeilen: [['A', '[ja]', '[ja]', '[grün, dicht, 5 cm hoch]'], ['B', '[ja]', '[nein]', '[fast nichts, vertrocknet]'], ['C', '[nein]', '[ja]', '[lang, gelb, dünn, fällt um]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was zeigt das Experiment? Plant ein eigenes Experiment: Was wollt ihr herausfinden?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Das Experiment zeigt, dass …', 'Wir wollen herausfinden, ob …', 'Dafür brauchen wir …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Pflanzen brauchen', punkte: ['**Licht**', '**Wasser**', '**Luft**', '**Nährstoffe** aus dem Boden', '**Wärme**'] },
         { titel: 'Teile der Pflanze', punkte: ['**Wurzel**: festhalten, Wasser aufnehmen', '**Stängel**: tragen, Wasser leiten', '**Blatt**: Zucker machen mit Licht', '**Blüte** → **Frucht** mit **Samen**'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Beschrifte die Teile der Pflanze.', stufe: 1, html: '<div class="voll">' + pflanze() + '</div>', liste: [['1', 'Blüte'], ['2', 'Blatt'], ['3', 'Stängel'], ['4', 'Wurzel'], ['5', 'Frucht (mit Samen)']], spalten: 3 },
      { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Pflanzen machen ihre Nahrung selbst – mit Licht in den Blättern.', true], ['Wurzeln brauchen keine Luft.', false], ['Ohne Licht wird eine Pflanze grüner.', false], ['Aus einem Samen kann eine neue Pflanze wachsen.', true]] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Eine Zimmerpflanze in der Klasse sieht traurig aus: die Blätter hängen, sie sind gelb. Schreibe einen Zettel für die Klasse: Was könnte los sein? Was sollen alle tun?', stufe: 2,
        anfaenge: ['Liebe Klasse, unsere Pflanze …', 'Vielleicht …', 'Bitte …'], zeilen: 6,
        beispiel: 'Liebe Klasse, unsere Pflanze sieht krank aus. Vielleicht bekommt sie zu wenig Licht, weil sie in der dunklen Ecke steht. Vielleicht hat sie auch zu wenig oder zu viel Wasser. Bitte stellt sie ans Fenster. Wir gießen nur, wenn die Erde oben trocken ist. Wer gießt, schreibt es auf die Liste.' },
    ],
    check: ['Ich nenne fünf Dinge, die Pflanzen brauchen.', 'Ich kenne die Teile einer Pflanze und ihre Aufgaben.', 'Ich werte ein einfaches Experiment aus.'],
  },
  // ================================================================ 2
  {
    thema: 'Boden und Kompost', titel: 'Gute Erde selbst gemacht', untertitel: 'Im Boden leben Milliarden kleiner Helfer. Aus Gartenabfällen machen sie neue, gute Erde: Kompost. Du lernst, was auf den Kompost darf – und was nicht.',
    ziel: { de: 'Ich weiß, wie Kompost entsteht, und sortiere Abfälle richtig.', fr: 'Je sais comment se forme le compost et je trie correctement les déchets.' },
    bild: ['noah:froh:stehen', 'mia:angeekelt:stehen'],
    start: {
      was: 'Rate mal!',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie viele Lebewesen leben ungefähr in einer Handvoll guter Gartenerde? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwa 10', 'etwa 1000', 'mehr als es Menschen auf der Erde gibt'], r: 2 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Gartenwissen', titel: 'Der Kompost – Recycling in der Natur',
      absaetze: [
        'In einer Handvoll guter Erde leben **mehr Lebewesen**, als es Menschen auf der Erde gibt: vor allem winzige **Bakterien** und Pilze, aber auch Würmer, Asseln und Käfer. Sie fressen tote Blätter und Pflanzenreste. Was übrig bleibt, ist dunkle, krümelige Erde: **Humus**.',
        '### Was auf den Kompost darf',
        'Obst- und Gemüsereste, Kaffeesatz, Teebeutel ohne Metallklammer, Eierschalen, Laub, Rasenschnitt in dünnen Schichten, kleine Zweige und Blumen.',
        '### Was nicht auf den Kompost darf',
        'Fleisch, Fisch, Knochen, Käse und gekochte Essensreste – sie locken **Ratten** an und stinken. Außerdem nicht: Plastik, Glas, Metall, Asche von Grillkohle, Katzenstreu und kranke Pflanzen.',
        '### So gelingt Kompost',
        'Grobes und Feines **mischen**, damit Luft hineinkommt. Der Kompost soll **feucht** sein wie ein ausgedrückter Schwamm – nicht nass. Nach ungefähr **sechs bis zwölf Monaten** ist der Kompost fertig. Er riecht dann nach Waldboden.',
      ],
      woerter: [['der Boden', 'le sol'], ['der Kompost', 'le compost'], ['der Regenwurm', 'le ver de terre'], ['die Bakterie', 'la bactérie'], ['der Humus', 'l’humus'], ['der Kaffeesatz', 'le marc de café'], ['das Laub', 'les feuilles mortes'], ['feucht', 'humide']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte mit dem Text.', stufe: 1, fragen: [{ f: 'Wer macht aus Abfällen Erde?', l: 'Lebewesen im Boden: Bakterien, Pilze, Würmer, Asseln, Käfer' }, { f: 'Warum kommen Fleisch und Käse nicht auf den Kompost?', zeilen: 2, l: 'Sie locken Ratten an und stinken.' }, { f: 'Wie feucht soll der Kompost sein?', l: 'wie ein ausgedrückter Schwamm' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Schulgarten · am Komposthaufen', titel: 'Igitt, Würmer!',
      situation: 'Noah und Mia sollen den Kompost umsetzen. Mia findet das eklig.',
      bild: ['mia:angeekelt:stehen', 'noah:froh:stehen'], sprecher: { Mia: 'w3', Noah: 'm3' },
      text: [
        ['Mia', 'Igitt! Da sind überall Würmer. Ich fasse das nicht an.'],
        ['Noah', 'Musst du auch nicht. Wir haben Handschuhe und die Grabegabel. Und die Würmer sind die Guten.'],
        ['Mia', 'Wieso die Guten?'],
        ['Noah', 'Die fressen die Reste und machen daraus Erde. Ohne die würde hier alles nur vergammeln.'],
        ['Mia', 'Okay … Und warum müssen wir den Haufen umsetzen?'],
        ['Noah', 'Damit Luft hineinkommt. Unten ist er schon ganz dunkel und krümelig, schau. Das riecht wie im Wald.'],
        ['Mia', 'Stimmt, das riecht gar nicht schlecht. Aber was ist das hier? Ein Joghurtbecher!'],
        ['Noah', 'Der gehört nicht hierhin. Plastik verrottet nicht. Den werfen wir in den richtigen Müll.'],
        ['Mia', 'Und die Würmer? Lassen wir die drin?'],
        ['Noah', 'Klar. Die arbeiten weiter für uns – kostenlos.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „verrotten“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['langsam zerfallen und wieder zu Erde werden', 'schnell verbrennen'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Mia findet die Würmer zuerst eklig.', true], ['Noah arbeitet ohne Handschuhe.', false], ['Man setzt den Kompost um, damit Luft hineinkommt.', true], ['Fertiger Kompost riecht nach Waldboden.', true], ['Den Joghurtbecher lassen sie im Kompost.', false]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was ekelt euch – und was hilft dagegen, wenn man trotzdem arbeiten muss?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Eklig finde ich …', 'Mir hilft …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Auf den Kompost', punkte: ['Obst- und **Gemüsereste**', '**Kaffeesatz**, Teebeutel, Eierschalen', '**Laub**, Rasenschnitt, kleine Zweige'] },
         { titel: 'Nicht auf den Kompost', punkte: ['**Fleisch, Fisch, Käse**, Gekochtes', '**Plastik, Glas, Metall**', 'Grillasche, Katzenstreu, kranke Pflanzen'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Kompost-Spiel: Schneidet die Karten aus. Legt zwei Stapel: „auf den Kompost“ und „nicht auf den Kompost“. Wer ist am schnellsten und richtig?', stufe: 1, neueSeite: true, titel: 'Kompost?', icon: 'recycle', farbe: ERDE, spalten: 3,
        karten: [
          { text: 'Bananenschale' }, { text: 'Hähnchenknochen' }, { text: 'Kaffeesatz' }, { text: 'Joghurtbecher' },
          { text: 'Eierschalen' }, { text: 'Käserinde' }, { text: 'Herbstlaub' }, { text: 'Glasscherbe' },
          { text: 'Apfelrest' }, { text: 'Grillasche' }, { text: 'Rasenschnitt' }, { text: 'Nudeln mit Soße' },
        ] },
      { art: 'tabelle', auftrag: 'Schreibe das Ergebnis vom Kompost-Spiel auf.', stufe: 1, kopf: ['auf den Kompost', 'nicht auf den Kompost'], breiten: [50, 50], zeilen: [['[Bananenschale, Kaffeesatz, Eierschalen]', '[Hähnchenknochen, Joghurtbecher, Käserinde]'], ['[Herbstlaub, Apfelrest, Rasenschnitt]', '[Glasscherbe, Grillasche, Nudeln mit Soße]']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Gestalte ein Schild für den Kompost an deiner Schule: Was darf hinein, was nicht? Warum lohnt sich Kompost?', stufe: 2,
        anfaenge: ['Hier wird Erde gemacht!', 'Bitte hinein: …', 'Bitte nicht hinein: …', 'Darum …'], zeilen: 6,
        beispiel: 'Hier wird Erde gemacht! Bitte hinein: Obst- und Gemüsereste, Kaffeesatz, Laub. Bitte nicht hinein: Fleisch, Käse, Plastik und Glas. Darum: Aus unserem Abfall wird in einem Jahr neue Erde für unsere Beete. Danke an alle Würmer!' },
    ],
    check: ['Ich weiß, wer aus Abfall Erde macht.', 'Ich sortiere Abfälle für den Kompost richtig.', 'Ich weiß, wie ein guter Kompost gelingt.'],
  },
  // ================================================================ 3
  {
    thema: 'Säen · Samentüte lesen · beobachten', titel: 'Vom Samen zur Pflanze', untertitel: 'Auf jeder Samentüte steht, wann, wie tief und mit welchem Abstand man sät. Du liest eine Samentüte, säst Radieschen oder Kresse und führst ein Beobachtungs-Protokoll.',
    ziel: { de: 'Ich lese eine Samentüte, säe richtig und protokolliere das Wachstum.', fr: 'Je lis un sachet de graines, je sème correctement et je note la croissance.' },
    bild: ['mia:froh:stehen-zeigen', 'lina:froh:hocken'],
    start: {
      was: 'Schätze',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie lange dauert es ungefähr, bis man Radieschen ernten kann? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwa 4 bis 6 Wochen', 'etwa 1 Jahr', 'etwa 2 Tage'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Eine Samentüte', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Rückseite einer Samentüte (Beispiel)', titel: 'Was steht auf der Samentüte?',
      absaetze: [
        'Auf der Rückseite einer Samentüte stehen alle wichtigen Angaben. Lies sie **vor** dem Säen genau. Die Zeichnung unten zeigt die Tüte für **Radieschen**.',
        '**Aussaat** sagt dir, in welchen Monaten man säen kann. **Saattiefe** sagt, wie tief der Samen in die Erde kommt. Eine Faustregel: so tief, wie der Samen zwei- bis dreimal dick ist. Winzige Samen wie Kresse drückt man nur an.',
        '**Abstand** sagt, wie viel Platz jede Pflanze braucht. Stehen die Pflanzen zu eng, bleiben sie klein. **Keimung** sagt, wann die ersten grünen Spitzen kommen. **Ernte** sagt, wann du ernten kannst.',
        'Im **Kalender** zeigt Grün die Monate zum Säen und Orange die Monate zum Ernten. Im Winter kannst du Kresse drinnen auf der Fensterbank säen.',
      ],
      woerter: [['säen', 'semer'], ['die Aussaat', 'le semis'], ['die Saattiefe', 'la profondeur de semis'], ['der Abstand', 'l’espacement'], ['keimen', 'germer'], ['ernten', 'récolter'], ['die Reihe', 'le rang'], ['das Beet', 'le parterre, la plate-bande']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Lies die Samentüte und antworte.', stufe: 1, html: '<div class="voll">' + samenTuete() + '</div>', liste: [['Wie tief sät man Radieschen?', '1 cm'], ['Wann kann man im Freien säen?', 'März bis September'], ['Wie viel Platz zwischen den Reihen?', '15 cm'], ['Wann kommen die ersten Spitzen?', 'nach 5 bis 8 Tagen'], ['Du säst am 1. April. Wann kannst du ungefähr ernten?', 'etwa Mitte Mai'], ['In welchen Monaten kann man nicht ernten?', 'November bis März']], spalten: 1 },
      ],
    },
    hoeren: {
      was: 'Eine Mitmach-Anleitung', wo: 'Schulgarten · am Beet', titel: 'Wir säen Radieschen',
      situation: 'Frau Morel erklärt der Klasse Schritt für Schritt, wie man Radieschen sät. Du kannst mitschreiben oder mitmachen.',
      bild: ['lehrerin:froh:erklaeren', 'mia:froh:hocken'], sprecher: { 'Frau Morel': 'w1', Mia: 'w3' },
      text: [
        ['Frau Morel', 'Zuerst lockern wir die Erde mit der Harke und machen sie schön fein. Große Steine und Wurzeln sammeln wir heraus.'],
        ['Frau Morel', 'Jetzt spannen wir eine Schnur. So wird die Reihe gerade. Mit dem Stiel der Harke ziehen wir eine kleine Rille, einen Zentimeter tief.'],
        ['Mia', 'So tief wie mein Fingernagel lang ist?'],
        ['Frau Morel', 'Genau, das passt ungefähr. Jetzt legen wir die Samen hinein – alle drei bis fünf Zentimeter einen. Nicht alle auf einmal hineinschütten!'],
        ['Frau Morel', 'Dann schieben wir die Erde vorsichtig zurück und drücken sie mit der flachen Hand leicht an.'],
        ['Frau Morel', 'Die nächste Reihe kommt fünfzehn Zentimeter daneben. Am Ende stecken wir ein Schild an jede Reihe: Was ist es, und wann haben wir gesät?'],
        ['Mia', 'Und gießen?'],
        ['Frau Morel', 'Ja, zum Schluss. Mit der Brause, ganz sanft, damit die Samen nicht weggeschwemmt werden. Und dann: jeden Tag nachschauen. Die Erde darf nicht austrocknen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist eine Rille? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['eine schmale, flache Vertiefung', 'ein großes Loch'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Ordne die Schritte.', stufe: 1, teile: ['Erde lockern, Steine heraussammeln', 'Schnur spannen, Rille 1 cm tief ziehen', 'Samen alle 3 bis 5 cm hineinlegen', 'Erde zurückschieben und andrücken', 'Schild in die Reihe stecken', 'sanft mit der Brause gießen'], ordnung: [2, 5, 0, 4, 1, 3] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Erklärt euch gegenseitig das Säen – einer liest die Schritte, der andere macht die Bewegungen.', stufe: 1, karten: [
        { titel: 'Hilfen', text: ['Zuerst …', 'Dann …', 'Zum Schluss …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Samentüte', punkte: ['**Aussaat**: wann säen?', '**Saattiefe**: wie tief?', '**Abstand**: wie viel Platz?', '**Keimung** und **Ernte**: wann?'] },
         { titel: 'Säen', nummern: true, punkte: ['Erde **lockern**', '**Rille** ziehen', 'Samen mit **Abstand** legen', 'Erde **andrücken**, Schild stecken', 'sanft **gießen**, feucht halten'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mein Keim-Protokoll: Beobachte deine Kresse oder deine Radieschen zwei Wochen lang. Miss und zeichne.', stufe: 2, kopf: ['Tag', 'Datum', 'Was sehe ich?', 'Höhe (mm)', 'gegossen?'], breiten: [10, 16, 44, 15, 15], zeilen: [['1', '', '', '', ''], ['3', '', '', '', ''], ['5', '', '', '', ''], ['7', '', '', '', ''], ['10', '', '', '', ''], ['14', '', '', '', '']] },
      { art: 'rechnen', auftrag: 'Rechne für ein Beet.', stufe: 3, spalten: 2, items: [{ a: 'Eine Reihe ist 120 cm lang. Alle 4 cm kommt ein Samen. Wie viele Samen brauchst du?', l: '120 ÷ 4 = 30 Samen' }, { a: 'Das Beet ist 90 cm breit. Die Reihen haben 15 cm Abstand. Wie viele Reihen passen hinein?', l: 'etwa 6 Reihen (90 ÷ 15)' }, { a: 'Wie viele Samen brauchst du für das ganze Beet?', l: '6 × 30 = 180 Samen' }, { a: 'In einer Tüte sind 200 Samen. Reicht eine Tüte?', l: 'Ja, es bleiben 20 übrig.' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe nach zwei Wochen einen kurzen Bericht zu deinem Keim-Protokoll.', stufe: 2,
        anfaenge: ['Ich habe am … gesät.', 'Nach … Tagen …', 'Am meisten überrascht hat mich …', 'Beim nächsten Mal …'], zeilen: 6,
        beispiel: 'Ich habe am 2. Mai Radieschen gesät. Nach sechs Tagen kamen die ersten grünen Spitzen. Nach zwei Wochen waren die Pflanzen schon 4 cm hoch. Am meisten überrascht hat mich, wie schnell das ging. Beim nächsten Mal säe ich mit mehr Abstand, weil einige Pflanzen zu eng stehen.' },
    ],
    check: ['Ich lese die Angaben auf einer Samentüte.', 'Ich säe Schritt für Schritt richtig.', 'Ich beobachte und protokolliere das Wachstum.'],
  },
  // ================================================================ 4
  {
    thema: 'Gartenwerkzeug · sicher und rückenschonend arbeiten', titel: 'Spaten, Harke und Co.', untertitel: 'Im Garten gibt es eigene Werkzeuge. Du lernst ihre Namen, wofür man sie braucht, wie man sie sicher ablegt und wie man arbeitet, ohne dass der Rücken wehtut.',
    ziel: { de: 'Ich kenne Gartenwerkzeuge und benutze sie sicher und rückenschonend.', fr: 'Je connais les outils de jardin et je les utilise en sécurité, en ménageant mon dos.' },
    bild: ['noah:froh:stehen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Kennst du das?',
      aufgaben: [
        { art: 'fragen', auftrag: 'Welche Werkzeuge für den Garten kennst du schon? Schreibe sie auf.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Spaten, Schaufel, Harke, Gießkanne, Schubkarre, Gartenschere' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Gartenwissen', titel: 'Das richtige Werkzeug – und ein gesunder Rücken',
      absaetze: [
        'Mit dem **Spaten** gräbt man den Boden um. Mit der **Grabegabel** lockert man den Boden, ohne die Regenwürmer zu zerschneiden. Die **Harke** – man sagt auch **Rechen** – macht die Erde fein und glatt. Mit der **Hacke** entfernt man Unkraut zwischen den Pflanzen. Mit der **Gartenschere** schneidet man Zweige. Die **Schubkarre** transportiert Erde, Kompost und Steine.',
        '### Sicher arbeiten',
        'Eine Harke legt man **mit den Zinken nach unten** auf den Boden oder lehnt sie an die Wand. Tritt man auf die Zinken, kann der Stiel hochschnellen und ins Gesicht schlagen. Tragt **Handschuhe** und **feste Schuhe**. Kleine Wunden mit Erde: gut auswaschen und der Lehrperson zeigen.',
        '### Den Rücken schonen',
        'Schwere Dinge hebt man **aus den Knien**: in die Hocke gehen, Rücken gerade, Last nah am Körper. Lieber zweimal gehen als einmal zu schwer tragen. Und: Abwechseln zwischen Bücken, Stehen und Gehen.',
        'Nach der Arbeit **reinigt** man das Werkzeug von Erde und hängt es an seinen Platz. Dann rostet es nicht und hält viele Jahre.',
      ],
      woerter: [['der Spaten', 'la bêche'], ['die Grabegabel', 'la fourche-bêche'], ['die Harke', 'le râteau'], ['die Hacke', 'la binette'], ['die Gartenschere', 'le sécateur'], ['die Schubkarre', 'la brouette'], ['die Zinke', 'la dent'], ['der Rücken', 'le dos']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Welches Werkzeug für welche Arbeit? Verbinde.', stufe: 1, links: ['Boden umgraben', 'Boden lockern, Würmer schonen', 'Erde fein und glatt machen', 'Unkraut entfernen', 'Zweige schneiden', 'Kompost transportieren'], rechts: ['Spaten', 'Grabegabel', 'Harke', 'Hacke', 'Gartenschere', 'Schubkarre'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Schulgarten · Geräteschuppen', titel: 'Aua, mein Rücken!',
      situation: 'Noah hat einen schweren Sack Erde getragen. Jetzt tut ihm der Rücken weh. Frau Morel zeigt ihm, wie es besser geht.',
      bild: ['noah:traurig:stehen', 'lehrerin:froh:erklaeren'], sprecher: { Noah: 'm3', 'Frau Morel': 'w1' },
      text: [
        ['Noah', 'Aua. Der Sack Erde war schwer. Jetzt zieht es im Rücken.'],
        ['Frau Morel', 'Wie hast du ihn hochgehoben?'],
        ['Noah', 'Na ja, ich habe mich runtergebeugt und gezogen.'],
        ['Frau Morel', 'Mit rundem Rücken und geraden Beinen, oder? Das ist für den Rücken das Schlimmste. Komm, ich zeige es dir.'],
        ['Frau Morel', 'Stell dich nah an den Sack. Füße etwas auseinander. Geh in die Hocke, der Rücken bleibt gerade. Den Sack nah an den Bauch nehmen. Und jetzt mit der Kraft aus den Beinen aufstehen.'],
        ['Noah', 'Oh. Das geht ja viel leichter.'],
        ['Frau Morel', 'Und noch etwas: Beim Tragen nicht verdrehen. Wenn du die Richtung ändern willst, dreh dich mit den Füßen, nicht mit dem Oberkörper.'],
        ['Noah', 'Und die ganz schweren Säcke?'],
        ['Frau Morel', 'Die nehmen wir mit der Schubkarre. Oder zu zweit. Schlau arbeiten ist besser als stark arbeiten.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „Es zieht im Rücken“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Der Rücken tut weh.', 'Es ist windig.'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Wie hebt man richtig? Ordne.', stufe: 1, teile: ['nah an die Last stellen, Füße etwas auseinander', 'in die Hocke gehen, Rücken gerade', 'Last nah an den Bauch nehmen', 'mit der Kraft aus den Beinen aufstehen', 'beim Drehen die Füße bewegen, nicht den Oberkörper'], ordnung: [3, 1, 4, 0, 2] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Probiert es aus: Hebt eine leere Kiste richtig an. Der andere schaut zu und gibt Tipps.', stufe: 1, karten: [
        { titel: 'Tipps geben', text: ['Dein Rücken ist …', 'Geh noch etwas tiefer …', 'Nimm die Kiste näher …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Sicher im Garten', punkte: ['Harke: **Zinken nach unten**', '**Handschuhe**, feste Schuhe', 'Wunden **auswaschen** und zeigen', 'Werkzeug **reinigen** und aufhängen'] },
         { titel: 'Richtig heben', nummern: true, punkte: ['nah an die Last', '**in die Hocke**, Rücken gerade', 'Last **nah am Körper**', 'aus den **Beinen** hoch', 'nicht **verdrehen**'] }],
      ],
    },
    ueben: [
      { art: 'symbole', auftrag: 'Wie heißen die Dinge? Schreib das Wort.', stufe: 1, woerter: ['die Schaufel', 'die Schubkarre', 'der Eimer', 'die Gartenschere', 'der Setzling', 'die Grabegabel'],
        symbole: [['shovel', 'die Schaufel'], ['garden-cart', 'die Schubkarre'], ['bucket', 'der Eimer'], ['scissors', 'die Gartenschere'], ['seedling', 'der Setzling'], ['shovel-pitchforks', 'die Grabegabel']] },
      { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 2, saetze: [['Eine Harke legt man mit den Zinken nach oben hin.', false], ['Schwere Säcke hebt man aus den Knien.', true], ['Mit der Grabegabel zerschneidet man weniger Regenwürmer als mit dem Spaten.', true], ['Werkzeug mit Erde darf man nass in den Schuppen stellen.', false]] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe drei Regeln für den Geräteschuppen eurer Schule. Erkläre bei jeder Regel, warum sie wichtig ist.', stufe: 2,
        anfaenge: ['Regel 1: …, weil …', 'Regel 2: …', 'Regel 3: …'], zeilen: 6,
        beispiel: 'Regel 1: Jedes Werkzeug kommt sauber an seinen Haken, weil es sonst rostet und man es nicht findet. Regel 2: Harken werden mit den Zinken zur Wand gelehnt, weil sonst jemand darauf treten kann. Regel 3: Wer etwas kaputt macht, sagt es sofort, damit es repariert wird.' },
    ],
    check: ['Ich kenne sechs Gartenwerkzeuge.', 'Ich lege Werkzeug sicher ab und pflege es.', 'Ich hebe schwere Dinge rückenschonend.'],
  },
  // ================================================================ 5
  {
    thema: 'Pflegen · gießen · Kräuter', titel: 'Kräuter mit allen Sinnen', untertitel: 'Pflanzen brauchen Pflege: gießen, jäten, ernten. Kräuter sind besonders dankbar – man kann sie riechen, schmecken und in der Küche benutzen. Du lernst sechs Kräuter kennen.',
    ziel: { de: 'Ich pflege Pflanzen richtig und erkenne sechs Küchenkräuter.', fr: 'J’entretiens correctement les plantes et je reconnais six herbes aromatiques.' },
    bild: ['mia:froh:stehen-zeigen', 'tom:aufgeregt:stehen'],
    start: {
      was: 'Riech mal!',
      aufgaben: [
        { art: 'fragen', auftrag: 'Welches Kraut oder Gewürz kennst du aus der Küche? Wonach riecht oder schmeckt es?', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'z. B. Petersilie, Basilikum (Pizza), Minze (Tee), Schnittlauch …' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Gartenwissen', titel: 'Richtig pflegen',
      absaetze: [
        '### Gießen',
        'Am besten gießt man **morgens** oder **abends**, wenn es nicht so heiß ist. Man gießt **an die Wurzeln**, nicht über die Blätter. Lieber seltener und **gründlich** gießen als jeden Tag ein bisschen. Mit dem Finger prüfen: Ist die Erde zwei Zentimeter tief trocken? Dann gießen.',
        '### Jäten und mulchen',
        '**Jäten** heißt: Unkraut mit der Wurzel herausziehen. Sonst nimmt es den Pflanzen Wasser und Licht weg. Beim **Mulchen** legt man Rasenschnitt oder Laub zwischen die Pflanzen. So bleibt der Boden feucht und es wächst weniger Unkraut.',
        '### Kräuter ernten',
        'Kräuter schneidet man immer nur ein bisschen ab, nie die ganze Pflanze. Dann wachsen sie nach. **Schnittlauch** schmeckt nach Zwiebel. **Petersilie** ist frisch und würzig. **Basilikum** passt zu Tomaten und Pizza. **Minze** ist gut für Tee. **Rosmarin** und **Thymian** passen zu Kartoffeln und Gemüse vom Blech.',
        'Wichtig: Iss nur Pflanzen, die du **sicher kennst**. Manche Pflanzen sehen harmlos aus, sind aber giftig.',
      ],
      woerter: [['gießen', 'arroser'], ['gründlich', 'à fond'], ['jäten', 'désherber'], ['das Unkraut', 'la mauvaise herbe'], ['mulchen', 'pailler'], ['das Kraut', 'l’herbe aromatique'], ['riechen', 'sentir'], ['giftig', 'toxique']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Man gießt am besten mittags in der prallen Sonne.', false], ['Man gießt an die Wurzeln.', true], ['Jäten heißt Unkraut mit der Wurzel entfernen.', true], ['Mulch hält den Boden feucht.', true], ['Bei Kräutern schneidet man die ganze Pflanze ab.', false]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Schulküche · Kräuter-Station', titel: 'Mit verbundenen Augen',
      situation: 'An der Kräuter-Station hat Tom die Augen verbunden. Mia gibt ihm Kräuter zum Riechen. Errätst du sie mit?',
      bild: ['tom:aufgeregt:stehen', 'mia:froh:stehen-zeigen'], sprecher: { Mia: 'w3', Tom: 'm3' },
      text: [
        ['Mia', 'Nummer eins. Riech mal.'],
        ['Tom', 'Hm … frisch, kalt in der Nase. Wie Kaugummi. Das ist Minze!'],
        ['Mia', 'Richtig! Nummer zwei.'],
        ['Tom', 'Das riecht nach Zwiebel, aber die Blätter sind dünn wie Gras. Schnittlauch.'],
        ['Mia', 'Super. Nummer drei.'],
        ['Tom', 'Das kenne ich von der Pizza. Süß und ein bisschen wie Pfeffer. Basilikum!'],
        ['Mia', 'Drei von drei! Jetzt Nummer vier. Fass mal die Blätter an.'],
        ['Tom', 'Die sind ganz hart und schmal, wie kleine Nadeln. Und es riecht ein bisschen nach Wald. Ist das eine Tanne?'],
        ['Mia', 'Fast! Das ist Rosmarin. Den nimmt man für Kartoffeln aus dem Ofen.'],
        ['Tom', 'Jetzt du! Ich verbinde dir die Augen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „mit verbundenen Augen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Ein Tuch liegt über den Augen, man sieht nichts.', 'Man hat eine Brille auf.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Welches Kraut ist es? Woran erkennt Tom es?', stufe: 1, kopf: ['Nr.', 'Kraut', 'Woran erkannt?'], breiten: [8, 26, 66], zeilen: [['1', '[Minze]', '[frisch, kalt in der Nase, wie Kaugummi]'], ['2', '[Schnittlauch]', '[riecht nach Zwiebel, dünn wie Gras]'], ['3', '[Basilikum]', '[kennt er von der Pizza, süß und wie Pfeffer]'], ['4', '[Rosmarin]', '[harte, schmale Blätter wie Nadeln, riecht nach Wald]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht selbst eine Kräuter-Station: riechen, fühlen, raten. Beschreibt, was ihr riecht.', stufe: 2, karten: [
        { titel: 'Wörter zum Riechen', text: ['frisch, würzig, süß, scharf', 'riecht wie …', 'erinnert mich an …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Pflegen', punkte: ['**morgens/abends** gießen', '**an die Wurzel**, gründlich', '**Fingerprobe**: 2 cm trocken?', 'Unkraut **jäten**, Boden **mulchen**'] },
         { titel: 'Kräuter', punkte: ['**Schnittlauch**: wie Zwiebel', '**Petersilie**: frisch, würzig', '**Basilikum**: Tomaten, Pizza', '**Minze**: Tee', '**Rosmarin, Thymian**: Ofengemüse', 'nur essen, was man **sicher kennt**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Unser Gießplan: Wer gießt wann? Tragt euch ein.', stufe: 1, kopf: ['Woche', 'Montag', 'Mittwoch', 'Freitag', 'erledigt?'], breiten: [16, 21, 21, 21, 21], zeilen: [['1', '', '', '', ''], ['2', '', '', '', ''], ['3', '', '', '', ''], ['4', '', '', '', '']] },
      { art: 'zuordnen', auftrag: 'Welches Kraut passt? Verbinde.', stufe: 2, links: ['ein Tee nach dem Essen', 'Tomatensalat', 'Kartoffeln aus dem Ofen', 'Quark mit Zwiebelgeschmack'], rechts: ['Minze', 'Basilikum', 'Rosmarin', 'Schnittlauch'] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe ein einfaches Rezept mit einem Kraut aus dem Schulgarten (zum Beispiel Kräuterquark oder Minztee).', stufe: 2,
        anfaenge: ['Rezept: …', 'Zutaten: …', 'Zubereitung: Zuerst …', 'Dann …', 'Dazu passt …'], zeilen: 7,
        beispiel: 'Rezept: Kräuterquark. Zutaten: 250 g Quark, 3 Esslöffel Milch, 1 Bund Schnittlauch, etwas Salz. Zubereitung: Zuerst Schnittlauch waschen und klein schneiden. Dann Quark mit Milch glatt rühren. Schnittlauch und Salz dazugeben und gut mischen. Dazu passen Kartoffeln oder Brot.' },
    ],
    check: ['Ich gieße und pflege Pflanzen richtig.', 'Ich erkenne Kräuter am Geruch und Aussehen.', 'Ich weiß, wofür man Kräuter benutzt.'],
  },
  // ================================================================ 6
  {
    thema: 'Projekt: Nisthilfe für Wildbienen', titel: 'Ein Zuhause für Wildbienen', untertitel: 'Viele Wildbienen finden keinen Platz mehr für ihre Eier. Mit einer Nisthilfe aus Holz kannst du helfen – wenn du sie richtig baust. Du liest eine Bauanleitung, hörst eine Expertin und baust selbst.',
    ziel: { de: 'Ich baue eine Nisthilfe für Wildbienen nach Anleitung und stelle sie richtig auf.', fr: 'Je construis un nichoir à abeilles sauvages d’après une notice et je l’installe correctement.' },
    bild: ['lina:froh:stehen', 'noah:froh:stehen-zeigen'],
    start: {
      was: 'Was weißt du?',
      aufgaben: [
        { art: 'rf', auftrag: 'Was weißt du schon über Wildbienen? Richtig oder falsch?', stufe: 1, saetze: [['Es gibt nur eine Art von Bienen.', false], ['Viele Wildbienen leben allein, nicht in einem Volk.', true], ['Bienen sind wichtig, damit Obst wächst.', true]] },
      ],
    },
    lesen: {
      was: 'Eine Bauanleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Bauanleitung (nach Empfehlungen von Naturschutzverbänden)', titel: 'Nisthilfe aus einem Holzklotz',
      material: ['Klotz aus Hartholz (Buche oder Esche), unbehandelt', 'Bohrer 3 bis 8 mm', 'Schleifpapier', 'Aufhängung'],
      schritte: [
        { icon: 'tree', text: '**Holz wählen:** Nimm **Hartholz**, trocken und ohne Lack. Weiches Holz wie Fichte wird faserig – daran verletzen sich die Bienen.' },
        { icon: 'circle', text: '**Bohren:** Bohre Löcher mit **3 bis 8 mm** in die **Seite** des Klotzes – nicht dort, wo man die Jahresringe sieht, sonst gibt es Risse. Tief bohren, aber nicht ganz durch.' },
        { icon: 'grid-dots', text: '**Abstand:** Lass zwischen den Löchern etwa **2 cm** Platz.' },
        { icon: 'hand-finger', text: '**Glätten:** Die Ränder müssen **glatt** sein: schleifen, Späne herausklopfen. Splitter verletzen die Flügel.' },
        { icon: 'sun', text: '**Aufhängen:** **Sonnig** und **regengeschützt**, nach **Süden oder Südosten**, mindestens 50 cm über dem Boden. Die Nisthilfe muss **fest** hängen.' },
      ],
      danach: ['In der Nähe müssen **Blüten** wachsen, am besten heimische Wildblumen. Zapfen und Stroh braucht man nicht – sie helfen den Bienen kaum.'],
      woerter: [['die Wildbiene', 'l’abeille sauvage'], ['die Nisthilfe', 'le nichoir'], ['das Hartholz', 'le bois dur'], ['unbehandelt', 'non traité'], ['der Riss', 'la fissure'], ['glatt', 'lisse'], ['regengeschützt', 'à l’abri de la pluie'], ['die Blüte', 'la fleur']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte mit der Anleitung.', stufe: 1, fragen: [{ f: 'Warum nimmt man kein weiches Holz?', zeilen: 2, l: 'Es wird faserig; die Bienen können sich verletzen.' }, { f: 'Wie dick sollen die Löcher sein?', l: '3 bis 8 mm' }, { f: 'Wohin hängt man die Nisthilfe?', zeilen: 2, l: 'sonnig, regengeschützt, nach Süden oder Südosten, fest, mindestens 50 cm über dem Boden' }, { f: 'Was braucht man außerdem in der Nähe?', l: 'Blüten (Wildblumen) als Futter' }] },
      ],
    },
    hoeren: {
      was: 'Ein Interview', wo: 'Schulgarten · Besuch einer Expertin', titel: 'Fragen an die Bienen-Expertin',
      situation: 'Frau Schmit ist Imkerin und kennt sich mit Wildbienen aus. Lina und Noah interviewen sie für die Schülerzeitung.',
      bild: ['lina:froh:handy', 'noah:froh:stehen'], sprecher: { Lina: 'w3', Noah: 'm3', 'Frau Schmit': 'w2' },
      text: [
        ['Lina', 'Frau Schmit, warum brauchen Wildbienen überhaupt unsere Hilfe?'],
        ['Frau Schmit', 'Viele Wildbienen legen ihre Eier in kleine Löcher in totem Holz oder in hohle Stängel. Solche Plätze gibt es in aufgeräumten Gärten kaum noch.'],
        ['Noah', 'Wie lange wohnt eine Biene in so einem Loch?'],
        ['Frau Schmit', 'Die Mutter wohnt gar nicht darin. Sie legt Pollen als Futter hinein, dazu ein Ei, und macht die Kammer zu. Die junge Biene schlüpft oft erst im nächsten Frühling.'],
        ['Lina', 'Also darf man die Nisthilfe im Winter nicht wegräumen?'],
        ['Frau Schmit', 'Genau. Lasst sie draußen hängen. In den verschlossenen Löchern warten die jungen Bienen auf den Frühling.'],
        ['Noah', 'Stechen Wildbienen?'],
        ['Frau Schmit', 'Fast nie. Ihr könnt ruhig nah herangehen und zuschauen. Nur nicht hineinpusten oder in die Löcher stochern.'],
        ['Lina', 'Was ist der wichtigste Tipp?'],
        ['Frau Schmit', 'Blumen! Ein Bienen-Haus ohne Blüten in der Nähe ist wie ein Haus ohne Küche.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was macht eine Imkerin? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sie hält Bienen und erntet Honig.', 'Sie verkauft Eis.'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wo legen viele Wildbienen ihre Eier ab?', zeilen: 2, l: 'in kleine Löcher in totem Holz oder in hohle Stängel' }, { f: 'Wann schlüpft die junge Biene oft?', l: 'im nächsten Frühling' }, { f: 'Was soll man im Winter mit der Nisthilfe machen?', l: 'draußen hängen lassen' }, { f: 'Was ist der wichtigste Tipp?', l: 'Blumen (Blüten in der Nähe)' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wo an eurer Schule wäre ein guter Platz für eine Nisthilfe? Geht hinaus und prüft mit der Anleitung.', stufe: 2, karten: [
        { titel: 'Prüfen', text: ['sonnig?', 'regengeschützt?', 'Süden oder Südosten?', 'Blüten in der Nähe?'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Gute Nisthilfe', punkte: ['**Hartholz**, unbehandelt', 'Löcher **3–8 mm**, in die Seite', 'Ränder **glatt**, keine Splitter', 'ca. **2 cm** Abstand'] },
         { titel: 'Richtig aufhängen', punkte: ['**sonnig**, Süden/Südosten', '**regengeschützt**, fest', 'im Winter **hängen lassen**', '**Blüten** in der Nähe'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Gut oder schlecht für Wildbienen? Kreuze an und begründe kurz.', stufe: 2, kopf: ['Idee', 'gut', 'schlecht', 'warum?'], breiten: [36, 10, 12, 42], zeilen: [['Löcher in Buchenholz, Ränder geschliffen', '[x]', '', '[glatt, keine Risse]'], ['Löcher in weiches Fichtenholz', '', '[x]', '[faserig, Bienen verletzen sich]'], ['Nisthilfe an der Nordseite im Schatten', '', '[x]', '[zu kalt, keine Sonne]'], ['Wildblumen neben die Nisthilfe säen', '[x]', '', '[Futter in der Nähe]'], ['Nisthilfe im Herbst in den Keller räumen', '', '[x]', '[junge Bienen brauchen draußen den Winter]']] },
      { art: 'tabelle', auftrag: 'Projekt-Plan: Unsere Nisthilfe.', stufe: 3, kopf: ['Schritt', 'Wer?', 'Werkzeug / Material', 'erledigt'], breiten: [32, 18, 36, 14], zeilen: [['Holz besorgen und prüfen', '', '', ''], ['Löcher anzeichnen (2 cm Abstand)', '', '', ''], ['bohren (3–8 mm)', '', '', ''], ['Ränder glätten', '', '', ''], ['Platz suchen und aufhängen', '', '', ''], ['Wildblumen säen', '', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Schreibe einen kurzen Artikel für die Schülerzeitung: „Wir haben ein Zuhause für Wildbienen gebaut“.', stufe: 2,
        anfaenge: ['Unsere Klasse hat …', 'Dafür haben wir …', 'Wichtig war, dass …', 'Jetzt hoffen wir …'], zeilen: 7,
        beispiel: 'Unsere Klasse hat eine Nisthilfe für Wildbienen gebaut. Dafür haben wir in einen Buchenklotz viele Löcher von 3 bis 8 mm gebohrt. Wichtig war, dass die Ränder ganz glatt sind, damit sich die Bienen nicht verletzen. Wir haben die Nisthilfe an die sonnige Südwand vom Geräteschuppen gehängt und daneben Wildblumen gesät. Jetzt hoffen wir, dass im Frühling die ersten Bienen einziehen.' },
    ],
    check: ['Ich lese eine Bauanleitung und halte mich daran.', 'Ich baue eine Nisthilfe sauber und sicher.', 'Ich weiß, wo eine Nisthilfe hängen muss.'],
  },
]

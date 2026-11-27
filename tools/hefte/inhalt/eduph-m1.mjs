// Sport (Éducation physique et sportive) · Modul 1 (7P) „Fit in Bewegung“ – Voie de préparation.
// Sport-Hefte begleiten die Praxis in der Halle: Wissen, Regeln, Trainer-Ansagen zum Mitmachen (QR), Übungs- und Stationskarten,
// Sport-Tagebuch. Kein Bewerten von Körper oder Gewicht; Persönliches nur freiwillig; Nele nutzt einen Rollstuhl und macht überall mit.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { pulsKurve } from './praxis-bilder.mjs'

export const MODUL = sachModul('eduph', 1, {
  titel: 'Fit in Bewegung',
  titelFr: 'En forme et en mouvement',
  unter: 'Warum Bewegung guttut, wie man sich richtig aufwärmt, den Puls misst, ausdauernd läuft, genug trinkt – und warum Fairplay jedes Spiel besser macht.',
  unterFr: 'Bienfaits du sport, échauffement, pouls, endurance, hydratation et fair-play.',
  farbe: '#1e8a5a',
  deckbild: ['ben:froh:gehen', 'nele:froh:rollstuhl', 'mia:froh:tanzen'],
  blasen: [{ t: 'Erst aufwärmen!', x: 8, y: 104 }, { t: 'Puls: 120!', x: 124, y: 92 }, { t: 'Fairplay!', x: 178, y: 150 }],
  aussprache: { '(\\d+) ?×': '\\1 mal', '\\bmg\\b': 'Milligramm', '\\bWHO\\b': 'Weltgesundheitsorganisation' },
  themen: [
    { titel: { de: 'Körper in Bewegung', fr: 'Le corps en mouvement' }, icon: 'heartbeat', lektionen: 3 },
    { titel: { de: 'Ausdauer und Fairplay', fr: 'Endurance et fair-play' }, icon: 'run', lektionen: 3 },
  ],
})

const SPORT = '#1e8a5a', FAIR = '#2f6db5'

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Bewegung tut gut', titel: 'Warum bewegen?', untertitel: 'Bewegung ist gut für Herz, Muskeln, Kopf und Laune. Du erfährst, wie viel Bewegung Jugendliche brauchen, und entdeckst, wie viel du dich schon bewegst – oft mehr, als du denkst.',
    ziel: { de: 'Ich weiß, warum Bewegung wichtig ist und wie viel Bewegung Jugendliche brauchen.', fr: 'Je sais pourquoi bouger est important et de combien d’activité physique les jeunes ont besoin.' },
    bild: ['lio:gelangweilt:zocken', 'mia:froh:stehen-zeigen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was zählt als Bewegung? Kreuze alles an, was deiner Meinung nach dazugehört.', stufe: 1, fragen: [{ f: '', o: ['mit dem Rad zur Schule fahren', 'Treppe statt Aufzug', 'tanzen', 'mit dem Hund spazieren gehen', 'im Garten helfen'], r: [0, 1, 2, 3, 4] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Gesundheitswissen (Empfehlungen der WHO, vereinfacht)', titel: 'Bewegung ist wie ein Wundermittel',
      absaetze: [
        'Wenn du dich bewegst, arbeitet dein **Herz** stärker. Es wird dabei kräftiger – wie ein Muskel, der trainiert. Auch deine **Muskeln** und **Knochen** werden stärker.',
        'Bewegung tut auch dem **Kopf** gut. Nach dem Sport kann man sich oft besser **konzentrieren**. Man schläft besser. Und der Körper bildet Stoffe, die die **Laune** heben. Viele Menschen sagen: Nach dem Sport bin ich weniger gestresst.',
        'Und Bewegung verbindet: Im **Team**, im Verein oder beim Fußball in der Pause lernt man Leute kennen, lacht zusammen und gehört dazu. Gesundheit hat drei Seiten: Man fühlt sich **körperlich**, **im Kopf** und **mit anderen** wohl.',
        '### Wie viel Bewegung?',
        'Die **Weltgesundheitsorganisation** empfiehlt für Kinder und Jugendliche: im Durchschnitt mindestens **60 Minuten pro Tag**, bei denen man etwas ins Schwitzen oder außer Atem kommt. Dazu an drei Tagen pro Woche Übungen, die **Muskeln und Knochen** stärken – zum Beispiel springen, klettern oder Kraftübungen.',
        'Das müssen keine 60 Minuten am Stück sein. **Jede Bewegung zählt**: der Weg zur Schule mit dem Rad, die Treppe, Tanzen im Zimmer, Fußball in der Pause. Lange **Sitzzeiten** sollte man ab und zu unterbrechen – einfach aufstehen und sich strecken.',
      ],
      woerter: [['die Bewegung', 'le mouvement'], ['das Herz', 'le cœur'], ['der Muskel', 'le muscle'], ['der Knochen', 'l’os'], ['sich konzentrieren', 'se concentrer'], ['die Laune', 'l’humeur'], ['schwitzen', 'transpirer'], ['außer Atem', 'essoufflé']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte mit dem Text.', stufe: 1, fragen: [{ f: 'Nenne drei Dinge, für die Bewegung gut ist.', zeilen: 2, l: 'z. B. Herz, Muskeln, Knochen, Konzentration, Schlaf, Laune, weniger Stress' }, { f: 'Wie viel Bewegung empfiehlt die WHO für Jugendliche?', zeilen: 2, l: 'im Durchschnitt mindestens 60 Minuten pro Tag; an 3 Tagen pro Woche Übungen für Muskeln und Knochen' }, { f: 'Müssen die 60 Minuten am Stück sein?', l: 'Nein, jede Bewegung zählt.' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Pausenhof', titel: 'Ich bewege mich doch gar nicht!',
      situation: 'Lio meint, er bewegt sich fast nie. Mia rechnet mit ihm nach.',
      bild: ['lio:gelangweilt:zocken', 'mia:froh:stehen-zeigen'], sprecher: { Lio: 'm3', Mia: 'w3' },
      text: [
        ['Lio', 'Sechzig Minuten Bewegung am Tag? Das schaffe ich nie. Ich bin doch kein Sportler.'],
        ['Mia', 'Warte mal. Wie kommst du zur Schule?'],
        ['Lio', 'Mit dem Fahrrad. Zehn Minuten hin, zehn zurück.'],
        ['Mia', 'Das sind schon zwanzig Minuten. Und in der Pause?'],
        ['Lio', 'Da spielen wir manchmal Basketball. Vielleicht fünfzehn Minuten.'],
        ['Mia', 'Fünfunddreißig. Und am Nachmittag?'],
        ['Lio', 'Ich gehe mit dem Hund von meiner Tante raus. So eine halbe Stunde. Aber das ist doch kein Sport.'],
        ['Mia', 'Zählt aber! Wenn du schnell gehst, bist du bei über sechzig Minuten. Und dazu dreimal Sport in der Schule.'],
        ['Lio', 'Okay, dann bin ich wohl doch ein bisschen Sportler. Aber abends zocke ich zwei Stunden.'],
        ['Mia', 'Kein Problem. Steh einfach zwischendurch mal auf und streck dich. Das tut gut.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „zocken“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Computer- oder Konsolenspiele spielen', 'Fahrrad fahren'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu. Wie viele Minuten bewegt sich Lio?', stufe: 1, kopf: ['Bewegung', 'Minuten'], breiten: [60, 40], zeilen: [['Fahrrad zur Schule und zurück', '[20]'], ['Basketball in der Pause', '[15]'], ['mit dem Hund rausgehen', '[30]'], ['zusammen', '[65]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Bewegung macht euch Spaß? Wie könntet ihr im Alltag mehr Bewegung einbauen?', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Mir macht Spaß …', 'Ich könnte …', 'Statt … könnte ich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Bewegung ist gut für', punkte: ['**Herz** und Kreislauf', '**Muskeln** und **Knochen**', '**Konzentration** und Schlaf', '**Laune**, weniger Stress'] },
         { titel: 'Wie viel? (WHO)', punkte: ['im Schnitt **60 Minuten** pro Tag', '3-mal pro Woche **Muskeln und Knochen** stärken', '**jede Bewegung zählt**', 'langes Sitzen **unterbrechen**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Bewegungs-Detektiv: Schreib eine Woche lang auf, wie viele Minuten du dich bewegst. (Du kannst auch eine ausgedachte Person beobachten.)', stufe: 1, kopf: ['Tag', 'Was?', 'Minuten'], breiten: [18, 60, 22], zeilen: [['Montag', '', ''], ['Dienstag', '', ''], ['Mittwoch', '', ''], ['Donnerstag', '', ''], ['Freitag', '', ''], ['Samstag', '', ''], ['Sonntag', '', '']] },
      { art: 'rechnen', auftrag: 'Rechne.', stufe: 2, spalten: 2, items: [{ a: 'Eine Woche hat 7 Tage. Wie viele Minuten Bewegung empfiehlt die WHO pro Woche?', l: '7 × 60 = 420 Minuten' }, { a: 'Wie viele Stunden sind das?', l: '7 Stunden' }, { a: 'Drei Sportstunden in der Schule dauern je 50 Minuten. Wie viele Minuten fehlen noch bis 420?', l: '3 × 50 = 150; 420 − 150 = 270 Minuten' }, { a: 'Verteilt auf 7 Tage: Wie viele Minuten pro Tag ungefähr?', l: 'etwa 39 Minuten' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welche Bewegung tut dir gut? Was nimmst du dir für die nächste Woche vor?', stufe: 1,
        anfaenge: ['Mir tut gut, wenn …', 'Nach der Bewegung fühle ich mich …', 'Nächste Woche möchte ich …'], zeilen: 5,
        beispiel: 'Mir tut gut, wenn ich mit meinem Freund Fahrrad fahre. Nach der Bewegung fühle ich mich ruhiger und habe Hunger. Nächste Woche möchte ich zweimal die Treppe statt des Aufzugs nehmen und am Wochenende eine Runde mit dem Rad fahren.' },
    ],
    check: ['Ich nenne Gründe, warum Bewegung guttut.', 'Ich kenne die Empfehlung: 60 Minuten pro Tag.', 'Ich finde Bewegung in meinem Alltag.'],
  },
  // ================================================================ 2
  {
    thema: 'Aufwärmen', titel: 'Erst warm, dann los!', untertitel: 'Ein gutes Aufwärmen bereitet den Körper vor und schützt vor Verletzungen. Du lernst, warum und wie man sich aufwärmt, machst bei einer Trainer-Ansage mit und leitest selbst ein Aufwärmen.',
    ziel: { de: 'Ich wärme mich richtig auf und kann ein kurzes Aufwärmen anleiten.', fr: 'Je m’échauffe correctement et je peux diriger un court échauffement.' },
    bild: ['lehrerin:froh:erklaeren', 'yusuf:froh:gehen'],
    start: {
      was: 'Was denkst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Warum wärmt man sich vor dem Sport auf? Kreuze alles Richtige an.', stufe: 1, fragen: [{ f: '', o: ['damit die Muskeln warm und beweglich werden', 'damit man sich weniger verletzt', 'damit man schon vorher müde ist', 'damit Herz und Atmung langsam schneller werden'], r: [0, 1, 3] }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sportwissen', titel: 'So geht gutes Aufwärmen',
      absaetze: [
        'Beim Aufwärmen wird der Körper **wärmer**. Die Muskeln werden besser durchblutet und **beweglicher**. Herz und Atmung werden langsam schneller. Der Kopf stellt sich auf Sport ein. So kann man besser spielen und verletzt sich **seltener**.',
        'Ein gutes Aufwärmen dauert etwa **zehn Minuten** und hat drei Teile.',
        '**Puls hoch:** Leicht laufen, Seitgalopp, Hopserlauf – nicht zu schnell. Man soll noch sprechen können.',
        '**Gelenke und Muskeln bewegen:** Arme kreisen, Hüfte kreisen, Knie heben, Fersen zum Po. Dabei bewegt man sich ruhig und gleichmäßig – ohne zu wippen.',
        '**Sportart vorbereiten:** Zum Schluss Übungen, die zur Sportart passen: beim Basketball Pässe und Dribbeln, beim Laufen kurze Steigerungen.',
        'Wer im **Rollstuhl** sitzt, wärmt sich auch auf: Rollstuhl schieben, Arme und Schultern kreisen, Oberkörper drehen.',
      ],
      woerter: [['das Aufwärmen', 'l’échauffement'], ['beweglich', 'souple'], ['die Verletzung', 'la blessure'], ['das Gelenk', 'l’articulation'], ['kreisen', 'faire des cercles'], ['der Seitgalopp', 'le pas chassé'], ['die Ferse', 'le talon'], ['die Sportart', 'le sport, la discipline']],
      aufgaben: [
        { art: 'ordnen', auftrag: 'Ordne die drei Teile des Aufwärmens.', stufe: 1, teile: ['Puls hoch: leicht laufen', 'Gelenke und Muskeln bewegen', 'Sportart vorbereiten'], ordnung: [2, 0, 1] },
      ],
    },
    hoeren: {
      was: 'Eine Trainer-Ansage', wo: 'Sporthalle', titel: 'Aufwärmen mit Frau Diallo',
      situation: 'Frau Diallo leitet das Aufwärmen. Hör zu und mach mit – zu Hause geht es auch auf der Stelle.',
      bild: ['lehrerin:froh:erklaeren', 'yusuf:froh:gehen'], sprecher: { 'Frau Diallo': 'w1' },
      text: [
        ['Frau Diallo', 'Guten Morgen! Wir fangen an. Alle laufen locker im Kreis. Nicht rennen – ihr sollt euch noch unterhalten können.'],
        ['Frau Diallo', 'Und jetzt Seitgalopp, Gesicht zur Mitte. Nach links … und wechseln, nach rechts.'],
        ['Frau Diallo', 'Weiter laufen. Jetzt die Knie hoch – zehnmal. Eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn. Und jetzt die Fersen zum Po – zehnmal.'],
        ['Frau Diallo', 'Stopp, alle stehen bleiben. Arme kreisen: vorwärts, ganz groß … und rückwärts. Jetzt die Schultern: hoch und fallen lassen.'],
        ['Frau Diallo', 'Hände in die Hüfte, Hüfte kreisen. Langsam. Andere Richtung.'],
        ['Frau Diallo', 'Nele, du kreist im Rollstuhl die Arme mit und drehst den Oberkörper nach links und rechts. Super.'],
        ['Frau Diallo', 'Jetzt holt sich jedes Paar einen Ball. Ihr spielt euch den Ball zu, zwei Minuten. Danach seid ihr bereit fürs Spiel!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Seitgalopp? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['seitlich springen und die Füße nachziehen', 'rückwärts laufen'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. In welcher Reihenfolge kommen die Übungen?', stufe: 1, teile: ['locker im Kreis laufen', 'Seitgalopp', 'Knie hoch, Fersen zum Po', 'Arme und Schultern kreisen', 'Hüfte kreisen', 'Ball zuspielen'], ordnung: [3, 0, 5, 2, 4, 1] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Welche Aufwärmübung findest du gut? Zeig sie der Gruppe und erkläre sie.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Die Übung heißt …', 'Ihr macht …', 'Das ist gut für …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Warum aufwärmen?', punkte: ['Muskeln **warm** und **beweglich**', 'Herz und Atmung **langsam** schneller', 'weniger **Verletzungen**', 'Kopf auf Sport einstellen'] },
         { titel: 'Drei Teile (10 Minuten)', nummern: true, punkte: ['**Puls hoch**: leicht laufen', '**Gelenke** und Muskeln bewegen', '**Sportart** vorbereiten'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Aufwärm-Karten: Schneidet die Karten aus. Jede Gruppe zieht aus jedem Teil eine Karte und leitet damit ein Aufwärmen für die Klasse an.', stufe: 2, neueSeite: true, titel: 'Aufwärmen', icon: 'flame', farbe: SPORT, spalten: 2,
        karten: [
          { text: '**Puls hoch**\nLocker laufen, bei Pfiff Richtung wechseln. 2 Minuten.' }, { text: '**Puls hoch**\nSchattenlaufen: Eine Person läuft vor, die andere macht alles nach. 2 Minuten.' },
          { text: '**Gelenke**\nArme vorwärts und rückwärts kreisen, je 10-mal.' }, { text: '**Gelenke**\nKnie heben und Fersen zum Po, je 10-mal pro Bein.' },
          { text: '**Gelenke**\nOberkörper drehen, Hüfte kreisen, je 10-mal. (Geht auch im Rollstuhl.)' }, { text: '**Gelenke**\nAuf der Stelle hüpfen, dabei die Arme schwingen. 30 Sekunden.' },
          { text: '**Sportart**\nZu zweit Ball zupassen: Brustpass, Bodenpass. 2 Minuten.' }, { text: '**Sportart**\nDribbeln durch die Halle, bei Pfiff Ball tauschen. 2 Minuten.' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Schreibe ein eigenes Aufwärmprogramm für deine Lieblingssportart (drei Teile, je zwei Übungen).', stufe: 2,
        anfaenge: ['Meine Sportart: …', 'Puls hoch: …', 'Gelenke: …', 'Sportart: …'], zeilen: 6,
        beispiel: 'Meine Sportart: Fußball. Puls hoch: locker laufen, Seitgalopp. Gelenke: Knie heben, Hüfte kreisen. Sportart: zu zweit kurze Pässe, dann mit dem Ball um Hütchen dribbeln.' },
    ],
    check: ['Ich weiß, warum man sich aufwärmt.', 'Ich kenne die drei Teile des Aufwärmens.', 'Ich leite eine Aufwärmübung an.'],
  },
  // ================================================================ 3
  {
    thema: 'Puls messen', titel: 'Dein Herz im Takt', untertitel: 'Der Puls zeigt, wie schnell dein Herz schlägt. Du lernst, ihn zu messen, liest eine Pulskurve und machst ein kleines Experiment: Wie schnell schlägt das Herz in Ruhe und nach Bewegung?',
    ziel: { de: 'Ich messe meinen Puls und lese eine Pulskurve.', fr: 'Je mesure mon pouls et je lis une courbe de fréquence cardiaque.' },
    bild: ['sami:aufgeregt:stehen', 'lehrerin:froh:zeigen'],
    start: {
      was: 'Fühl mal!',
      aufgaben: [
        { art: 'fragen', auftrag: 'Leg zwei Finger an deinen Hals, neben den Kehlkopf. Drück nur ganz leicht. Spürst du etwas? Beschreibe es.', stufe: 1, fragen: [{ f: '', zeilen: 2, l: 'Man spürt ein Klopfen – den Puls.' }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w2',
      quelle: 'Sportwissen', titel: 'So misst du deinen Puls',
      material: ['eine Uhr mit Sekundenzeiger oder eine Stoppuhr', 'Papier und Stift'],
      schritte: [
        { icon: 'hand-finger', text: '**Stelle finden:** Lege **Zeige- und Mittelfinger** an die Innenseite des Handgelenks, unter den Daumen. Oder seitlich an den Hals – nur leicht drücken und nur auf einer Seite. Nicht mit dem Daumen messen – er hat selbst einen Puls.' },
        { icon: 'clock', text: '**Zählen:** Zähle die Schläge **15 Sekunden** lang.' },
        { icon: 'calculator', text: '**Rechnen:** Nimm die Zahl **mal 4**. Das sind die Schläge pro Minute.' },
        { icon: 'pencil', text: '**Aufschreiben:** Notiere den Wert sofort.' },
      ],
      danach: ['In **Ruhe** schlägt das Herz bei Jugendlichen meistens etwa **60 bis 100**-mal pro Minute. Bei Bewegung steigt der Puls, bei starker Anstrengung auf **150 bis 200**. Nach dem Sport sinkt er wieder. Je **schneller** er sinkt, desto **fitter** ist man meistens. Jeder Körper ist anders – vergleiche dich mit dir selbst, nicht mit anderen.'],
      woerter: [['der Puls', 'le pouls'], ['das Handgelenk', 'le poignet'], ['der Hals', 'le cou'], ['der Schlag', 'le battement'], ['die Ruhe', 'le repos'], ['die Anstrengung', 'l’effort'], ['steigen', 'monter'], ['sinken', 'baisser']],
      aufgaben: [
        { art: 'rechnen', auftrag: 'Rechne den Puls pro Minute aus.', stufe: 1, spalten: 2, items: [{ a: 'In 15 Sekunden: 18 Schläge', l: '18 × 4 = 72' }, { a: 'In 15 Sekunden: 30 Schläge', l: '30 × 4 = 120' }, { a: 'In 15 Sekunden: 42 Schläge', l: '42 × 4 = 168' }, { a: 'In 15 Sekunden: 22 Schläge', l: '22 × 4 = 88' }] },
      ],
    },
    hoeren: {
      was: 'Ein Experiment', wo: 'Sporthalle', titel: 'Das Puls-Experiment',
      situation: 'Die Klasse misst den Puls dreimal: in Ruhe, nach einer Minute Hampelmann und nach zwei Minuten Pause. Sami sagt seine Werte.',
      bild: ['sami:aufgeregt:stehen', 'lehrerin:froh:zeigen'], sprecher: { 'Frau Diallo': 'w1', Sami: 'm2' },
      text: [
        ['Frau Diallo', 'Erste Messung: in Ruhe. Alle sitzen. Finger an den Hals oder ans Handgelenk. Achtung … los! … Stopp. Sami, wie viele Schläge?'],
        ['Sami', 'Neunzehn.'],
        ['Frau Diallo', 'Mal vier?'],
        ['Sami', 'Sechsundsiebzig.'],
        ['Frau Diallo', 'Jetzt eine Minute Hampelmann. Los! … Und sofort messen. Achtung … los! … Stopp.'],
        ['Sami', 'Wow, zweiunddreißig! Das sind hundertachtundzwanzig.'],
        ['Frau Diallo', 'Jetzt zwei Minuten ruhig sitzen und tief atmen. … So, dritte Messung. Los! … Stopp.'],
        ['Sami', 'Vierundzwanzig. Also sechsundneunzig.'],
        ['Frau Diallo', 'Gut. Was fällt dir auf?'],
        ['Sami', 'Nach dem Hampelmann war der Puls viel höher. Nach der Pause ist er schon wieder gesunken – aber noch nicht ganz auf den Ruhepuls.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Hampelmann (beim Sport)? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Sprung, bei dem man Arme und Beine gleichzeitig öffnet und schließt', 'eine Figur aus Holz'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und trage Samis Werte ein.', stufe: 1, kopf: ['Messung', 'Schläge in 15 s', 'Puls pro Minute'], breiten: [40, 30, 30], zeilen: [['in Ruhe', '[19]', '[76]'], ['nach 1 Minute Hampelmann', '[32]', '[128]'], ['nach 2 Minuten Pause', '[24]', '[96]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht das Experiment selbst. Vergleicht nicht, wer den höchsten Puls hat – sondern wie sich euer eigener Puls verändert.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['In Ruhe war mein Puls …', 'Nach dem Hampelmann …', 'Nach der Pause …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Puls messen', nummern: true, punkte: ['2 Finger an **Handgelenk** oder **Hals**', '**15 Sekunden** zählen', '**mal 4** rechnen', 'sofort **aufschreiben**'] },
         { titel: 'Werte (ungefähr)', punkte: ['**Ruhe**: 60–100', 'Bewegung: steigt', 'starke Anstrengung: **150–200**', 'nach dem Sport: **sinkt** wieder', 'mit **dir selbst** vergleichen'] }],
      ],
    },
    ueben: [
      { art: 'beschriften', auftrag: 'Die Pulskurve zeigt den Puls von Yusuf in einer Sportstunde. Lies ab und antworte.', stufe: 2, html: '<div class="voll">' + pulsKurve() + '</div>',
        liste: [['Puls in Ruhe (Minute 0)?', '75'], ['Höchster Puls? In welcher Minute?', '165, in Minute 25'], ['In welcher Phase steigt der Puls am stärksten?', 'beim Übergang vom Aufwärmen zum Spiel (Minute 15–20)'], ['Puls am Ende (Minute 45)?', '85']], spalten: 1 },
      { art: 'tabelle', auftrag: 'Mein Puls-Experiment: Miss selbst und trage ein.', stufe: 1, kopf: ['Messung', 'Schläge in 15 s', 'Puls pro Minute'], breiten: [40, 30, 30], zeilen: [['in Ruhe', '', ''], ['nach 1 Minute Hampelmann', '', ''], ['nach 2 Minuten Pause', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Beschreibe dein Puls-Experiment. Was ist passiert? Wie hat sich dein Körper angefühlt?', stufe: 2,
        anfaenge: ['In Ruhe …', 'Nach dem Hampelmann …', 'Mein Körper hat sich angefühlt …', 'Nach der Pause …'], zeilen: 5,
        beispiel: 'In Ruhe hatte ich einen Puls von 80. Nach dem Hampelmann war er bei 136, und ich habe schnell geatmet. Mein Körper hat sich warm angefühlt, und mein Herz hat richtig geklopft. Nach der Pause war mein Puls wieder bei 100.' },
    ],
    check: ['Ich messe meinen Puls richtig.', 'Ich rechne den Puls pro Minute aus.', 'Ich lese eine Pulskurve.'],
  },
  // ================================================================ 4
  {
    thema: 'Ausdauer', titel: 'Laufen ohne Schnaufen', untertitel: 'Ausdauer heißt: lange in Bewegung bleiben, ohne schlappzumachen. Das Geheimnis ist das richtige Tempo. Du lernst, wie man ausdauernd läuft, und machst einen 6-Minuten-Lauf.',
    ziel: { de: 'Ich laufe in einem gleichmäßigen Tempo und verbessere meine Ausdauer.', fr: 'Je cours à un rythme régulier et j’améliore mon endurance.' },
    bild: ['ben:muede:gehen', 'chloe:froh:gehen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Du sollst sechs Minuten ohne Pause laufen. Wie startest du am besten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ruhig und gleichmäßig', 'so schnell wie möglich', 'erst gehen, dann am Ende sprinten'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sportwissen', titel: 'Das Geheimnis der Ausdauer',
      absaetze: [
        '**Ausdauer** brauchst du überall: beim Fußball, beim Tanzen, beim Wandern – und im Alltag, zum Beispiel wenn du zum Bus rennst.',
        'Das wichtigste Ausdauer-Geheimnis heißt: **Laufen ohne Schnaufen**. Lauf so, dass du dich noch **unterhalten** kannst. Wenn du keine Luft mehr zum Sprechen hast, bist du zu schnell.',
        'Viele machen den gleichen Fehler: Sie starten **zu schnell**. Nach zwei Minuten sind sie außer Atem und müssen gehen. Wer **gleichmäßig** läuft, kommt viel weiter.',
        'Ausdauer kann man **trainieren**. Schon nach ein paar Wochen merkt man den Unterschied: Man wird weniger schnell müde, und der Puls sinkt nach dem Laufen schneller. Am besten trainiert man **zwei- bis dreimal pro Woche**, lieber regelmäßig als selten und sehr viel.',
        'Wenn es nicht mehr geht: **Gehen ist erlaubt.** Geh ein Stück, atme durch und lauf dann wieder los. Wichtig ist, dass du dich bewegst.',
      ],
      woerter: [['die Ausdauer', 'l’endurance'], ['das Tempo', 'le rythme'], ['gleichmäßig', 'régulier'], ['schnaufen', 'souffler, haleter'], ['außer Atem', 'essoufflé'], ['trainieren', 's’entraîner'], ['regelmäßig', 'régulièrement'], ['die Runde', 'le tour']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Beim Ausdauerlauf soll man sich noch unterhalten können.', true], ['Am besten startet man so schnell wie möglich.', false], ['Ausdauer kann man trainieren.', true], ['Wer zwischendurch geht, hat verloren.', false]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Sportplatz · beim 6-Minuten-Lauf', titel: 'Zu schnell gestartet',
      situation: 'Die Klasse läuft sechs Minuten um den Platz. Ben ist am Anfang ganz vorne. Chloé läuft ruhig.',
      bild: ['ben:muede:gehen', 'chloe:froh:gehen'], sprecher: { Ben: 'm2', Chloé: 'w3', 'Frau Diallo': 'w1' },
      text: [
        ['Frau Diallo', 'Achtung, sechs Minuten. Los!'],
        ['Ben', 'Ich bin vorne! Die erste Runde in vierzig Sekunden!'],
        ['Frau Diallo', 'Noch vier Minuten.'],
        ['Ben', 'Ich … kann nicht mehr. Ich muss gehen.'],
        ['Chloé', 'Komm, lauf mit mir. Ganz langsam. Wir können dabei reden.'],
        ['Ben', 'So langsam? Das ist ja fast Gehen.'],
        ['Chloé', 'Genau. Und jetzt siehst du: Ich bin immer noch nicht müde.'],
        ['Frau Diallo', 'Und … Stopp! Zählt eure Runden.'],
        ['Ben', 'Ich habe fünf Runden. Am Anfang war ich so schnell. Dann musste ich trotzdem immer wieder gehen, und Chloé hat mich überholt.'],
        ['Chloé', 'Ich habe sechs. Ich bin jede Runde gleich schnell gelaufen.'],
        ['Frau Diallo', 'Das ist das Geheimnis. Ben, nächstes Mal startest du mit Chloé. Ich wette, du schaffst mehr als fünf.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „überholen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['an jemandem vorbeilaufen, der vor einem war', 'stehen bleiben'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Welchen Fehler macht Ben?', l: 'Er startet viel zu schnell.' }, { f: 'Woran merkt Chloé, dass ihr Tempo richtig ist?', l: 'Sie kann dabei reden und ist nicht müde.' }, { f: 'Wie viele Runden schaffen Ben und Chloé?', l: 'Ben 5, Chloé 6' }, { f: 'Was rät Frau Diallo?', l: 'Ben soll nächstes Mal mit Chloé starten (ruhiger).' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Kennt ihr das: zu schnell anfangen und dann nicht mehr können? Wo gilt das noch – außer beim Laufen?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Das kenne ich von …', 'Auch beim … ist es besser, …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Ausdauer', punkte: ['**Laufen ohne Schnaufen**', 'man kann sich noch **unterhalten**', '**gleichmäßig** laufen', 'nicht zu **schnell starten**'] },
         { titel: 'Training', punkte: ['**2–3-mal** pro Woche', 'lieber **regelmäßig** als selten viel', '**Gehen ist erlaubt**', 'Fortschritt mit **dir selbst** vergleichen'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mein Lauf-Protokoll: Lauf dreimal sechs Minuten (an verschiedenen Tagen) und trage deine Runden ein.', stufe: 1, kopf: ['Lauf', 'Datum', 'Runden', 'Wie ging es mir?'], breiten: [12, 20, 16, 52], zeilen: [['1', '', '', ''], ['2', '', '', ''], ['3', '', '', '']] },
      { art: 'rechnen', auftrag: 'Eine Runde auf dem Sportplatz ist 200 m lang. Rechne die Strecke aus.', stufe: 2, spalten: 2, items: [{ a: 'Ben: 5 Runden', l: '5 × 200 m = 1000 m = 1 km' }, { a: 'Chloé: 6 Runden', l: '6 × 200 m = 1200 m' }, { a: 'Nele fährt im Rollstuhl 7 Runden.', l: '7 × 200 m = 1400 m' }, { a: 'Wie viele Runden braucht man für 2 km?', l: '2000 ÷ 200 = 10 Runden' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie war dein 6-Minuten-Lauf? Was hast du über dein Tempo gelernt?', stufe: 2,
        anfaenge: ['Am Anfang …', 'In der Mitte …', 'Am Ende …', 'Nächstes Mal …'], zeilen: 5,
        beispiel: 'Am Anfang bin ich ruhig gelaufen, weil ich an Ben denken musste. In der Mitte hatte ich Seitenstechen und bin kurz gegangen. Am Ende hatte ich fünf Runden. Nächstes Mal atme ich ruhiger und versuche, ohne Pause durchzulaufen.' },
    ],
    check: ['Ich laufe im richtigen Tempo.', 'Ich weiß, wie man Ausdauer trainiert.', 'Ich protokolliere meine Läufe.'],
  },
  // ================================================================ 5
  {
    thema: 'Trinken und Energie', titel: 'Was trinke ich beim Sport?', untertitel: 'Beim Sport schwitzt du und verlierst Wasser. Du lernst, was und wie viel man trinken sollte, warum Energy-Drinks keine gute Idee sind und welcher Snack vor dem Sport hilft.',
    ziel: { de: 'Ich trinke beim Sport richtig und wähle passende Snacks.', fr: 'Je bois correctement pendant le sport et je choisis des en-cas adaptés.' },
    bild: ['amira:froh:stehen', 'yusuf:aufgeregt:stehen'],
    start: {
      was: 'Rate mal!',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist beim Sport das beste Getränk? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Wasser', 'Energy-Drink', 'Cola'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Ernährungswissen (vereinfacht)', titel: 'Trinken und Essen rund um den Sport',
      absaetze: [
        '### Trinken',
        'Der Körper besteht zu mehr als der Hälfte aus **Wasser**. Beim Sport schwitzt man und verliert Wasser. Wer zu wenig trinkt, wird **müde**, bekommt vielleicht **Kopfschmerzen** und kann sich schlechter konzentrieren.',
        'Jugendliche sollten über den Tag verteilt etwa **anderthalb Liter** trinken, beim Sport und bei Hitze **mehr**. Am besten ist **Wasser** oder ungesüßter Tee. Trink schon **vor** dem Sport und in den Pausen kleine Schlucke – nicht erst, wenn du großen Durst hast.',
        '### Energy-Drinks',
        'Energy-Drinks enthalten viel **Koffein** und oft viel **Zucker**. In der EU steht auf Getränken mit viel Koffein: „Für Kinder nicht empfohlen“. Sie können **Herzklopfen**, Unruhe und schlechten Schlaf machen – zusammen mit Sport ist das keine gute Idee.',
        '### Essen',
        'Kurz vor dem Sport keine große Mahlzeit – sonst liegt sie schwer im Bauch. Etwa **eine Stunde vorher** ist ein kleiner Snack gut: eine Banane, ein Stück Brot, ein Apfel.',
      ],
      woerter: [['trinken', 'boire'], ['der Durst', 'la soif'], ['schwitzen', 'transpirer'], ['der Schluck', 'la gorgée'], ['der Energy-Drink', 'la boisson énergisante'], ['das Koffein', 'la caféine'], ['der Zucker', 'le sucre'], ['der Snack', 'l’en-cas']],
      aufgaben: [
        { art: 'fragen', auftrag: 'Antworte mit dem Text.', stufe: 1, fragen: [{ f: 'Was passiert, wenn man zu wenig trinkt?', zeilen: 2, l: 'Man wird müde, bekommt vielleicht Kopfschmerzen, kann sich schlechter konzentrieren.' }, { f: 'Wann soll man trinken?', zeilen: 2, l: 'schon vor dem Sport und in den Pausen, in kleinen Schlucken' }, { f: 'Warum sind Energy-Drinks beim Sport keine gute Idee?', zeilen: 2, l: 'viel Koffein und Zucker; Herzklopfen, Unruhe, schlechter Schlaf' }] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Turnier in der Sporthalle', titel: 'Der Turniertag',
      situation: 'Heute ist ein Basketball-Turnier. Yusuf hat sich etwas mitgebracht. Amira ist skeptisch.',
      bild: ['yusuf:aufgeregt:stehen', 'amira:besorgt:stehen'], sprecher: { Yusuf: 'm3', Amira: 'w2' },
      text: [
        ['Yusuf', 'Schau mal, ich habe zwei Energy-Drinks dabei. Damit bin ich heute unschlagbar.'],
        ['Amira', 'Zwei? Hast du gelesen, was hinten draufsteht?'],
        ['Yusuf', 'Ähm … „Erhöhter Koffeingehalt. Für Kinder … nicht empfohlen.“ Aber ich bin ja kein Kind mehr.'],
        ['Amira', 'Das gilt auch für Jugendliche. Beim letzten Turnier hat Lio so einen getrunken. Danach hatte er Herzklopfen und war total zittrig. Er hat kaum einen Korb getroffen.'],
        ['Yusuf', 'Hm. Und was trinkst du?'],
        ['Amira', 'Wasser. Ich habe zwei Flaschen dabei. Und eine Banane für die Pause.'],
        ['Yusuf', 'Langweilig.'],
        ['Amira', 'Vielleicht. Aber ich habe beim letzten Turnier die meisten Punkte gemacht.'],
        ['Yusuf', 'Okay, okay. Gibst du mir eine Flasche ab? Die Energy-Drinks bleiben in der Tasche.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was bedeutet „skeptisch“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man zweifelt, ob etwas gut ist.', 'Man ist sehr begeistert.'], r: 0 }] }],
      beim: [
        { art: 'rf', auftrag: 'Hör zu. Richtig oder falsch?', stufe: 1, saetze: [['Yusuf hat zwei Energy-Drinks dabei.', true], ['Auf der Dose steht, dass sie für Kinder empfohlen ist.', false], ['Lio hatte nach einem Energy-Drink Herzklopfen.', true], ['Amira trinkt Cola.', false], ['Am Ende möchte Yusuf Wasser trinken.', true]] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Warum sind Energy-Drinks bei Jugendlichen so beliebt? Was spricht dagegen?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Viele trinken sie, weil …', 'Dagegen spricht, dass …', 'Ich denke …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Trinken', punkte: ['etwa **1,5 Liter** am Tag, beim Sport **mehr**', 'am besten **Wasser** oder Tee', '**vorher** und in den **Pausen** trinken', 'kleine **Schlucke**'] },
         { titel: 'Essen und Energy-Drinks', punkte: ['keine große Mahlzeit **kurz vorher**', 'Snack etwa **1 Stunde** vorher', '**Energy-Drinks**: viel Koffein und Zucker – nicht für Jugendliche'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Gut für den Sporttag oder nicht? Kreuze an und begründe.', stufe: 2, kopf: ['', 'gut', 'nicht gut', 'warum?'], breiten: [30, 12, 14, 44], zeilen: [['Wasserflasche', '[x]', '', '[löscht Durst, ohne Zucker]'], ['Energy-Drink', '', '[x]', '[viel Koffein und Zucker, Herzklopfen]'], ['Banane in der Pause', '[x]', '', '[leicht, gibt Energie]'], ['große Portion Pommes direkt vor dem Spiel', '', '[x]', '[liegt schwer im Bauch]'], ['ungesüßter Tee', '[x]', '', '[ohne Zucker]']] },
      { art: 'rechnen', auftrag: 'Rechne.', stufe: 2, spalten: 2, items: [{ a: 'Eine Flasche hat 0,5 Liter. Wie viele Flaschen sind 1,5 Liter?', l: '3 Flaschen' }, { a: 'Amira hat 2 Flaschen mit je 0,75 Liter dabei. Wie viel ist das?', l: '1,5 Liter' }, { a: 'Ein Glas hat 250 ml. Wie viele Gläser sind 1,5 Liter?', l: '1500 ÷ 250 = 6 Gläser' }, { a: 'Ein Energy-Drink (250 ml) hat 80 mg Koffein. Wie viel Koffein haben zwei Dosen?', l: '160 mg' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Pack deine Sporttasche für einen Turniertag. Was kommt hinein, und warum?', stufe: 1,
        anfaenge: ['In meine Sporttasche kommt …', 'Zum Trinken …', 'Für die Pause …', 'Nicht mitnehmen werde ich …'], zeilen: 5,
        beispiel: 'In meine Sporttasche kommen Sportschuhe, ein T-Shirt zum Wechseln und ein Handtuch. Zum Trinken nehme ich zwei Flaschen Wasser mit. Für die Pause packe ich eine Banane und ein Brot ein. Nicht mitnehmen werde ich Energy-Drinks, weil sie Herzklopfen machen können.' },
    ],
    check: ['Ich weiß, wie viel und was ich trinken sollte.', 'Ich kenne die Risiken von Energy-Drinks.', 'Ich wähle einen passenden Snack.'],
  },
  // ================================================================ 6
  {
    thema: 'Fairplay', titel: 'Fair geht vor', untertitel: 'Sport macht nur Spaß, wenn alle fair spielen. Du lernst, was Fairplay bedeutet, hörst einen Streit beim Spiel und übst mit Fairplay-Karten, schwierige Situationen gut zu lösen.',
    ziel: { de: 'Ich spiele fair und löse Konflikte im Spiel ohne Gewalt.', fr: 'Je fais preuve de fair-play et je résous les conflits dans le jeu sans violence.' },
    bild: ['finn:wuetend:stehen', 'nele:froh:rollstuhl'],
    start: {
      was: 'Was ist fair?',
      aufgaben: [
        { art: 'mindmap', auftrag: 'Was gehört zu Fairplay? Sammle Ideen.', stufe: 1, mitte: 'Fairplay', aeste: ['Regeln einhalten', { l: 'Hand geben' }, { l: 'Fehler zugeben' }, { l: 'alle mitspielen lassen' }, { l: 'Schiri respektieren' }, { l: 'nicht auslachen' }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sportwissen', titel: 'Was ist Fairplay?',
      absaetze: [
        '**Fairplay** ist Englisch und heißt „faires Spiel“. Es bedeutet mehr, als nur die **Regeln** einzuhalten.',
        'Wer fair spielt, **respektiert** die anderen: die eigene Mannschaft, die Gegner und die Schiedsrichterin oder den **Schiedsrichter**. Wer fair spielt, gibt **Fehler zu**, zum Beispiel: „Der Ball war im Aus, ich habe ihn zuletzt berührt.“ Man hilft einem Gegner, der hingefallen ist, wieder auf. Man **lacht niemanden aus**.',
        'Fair ist auch, dass **alle mitspielen** dürfen. Wenn Teams gewählt werden, bleibt niemand bis zum Schluss übrig. Wer weniger gut spielt, bekommt auch den Ball. Und Regeln kann man so anpassen, dass alle mitmachen können – zum Beispiel für jemanden im Rollstuhl.',
        'Nach dem Spiel gibt man sich die **Hand** oder klatscht ab – auch wenn man verloren hat. Gewinnen ist schön. Aber noch wichtiger ist, dass alle **gern wiederkommen**.',
      ],
      woerter: [['das Fairplay', 'le fair-play'], ['die Regel', 'la règle'], ['respektieren', 'respecter'], ['der Gegner', 'l’adversaire'], ['der Schiedsrichter', 'l’arbitre'], ['zugeben', 'avouer'], ['auslachen', 'se moquer de'], ['die Mannschaft', 'l’équipe']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Fair oder unfair? Kreuze an.', stufe: 1, kopf: ['', 'fair', 'unfair'], breiten: [64, 18, 18], zeilen: [['Ich gebe zu, dass ich den Ball zuletzt berührt habe.', '[x]', ''], ['Ich beschimpfe den Schiedsrichter.', '', '[x]'], ['Ich helfe einem Gegner auf, der gestürzt ist.', '[x]', ''], ['Ich spiele immer nur meinen besten Freunden den Ball zu.', '', '[x]'], ['Nach dem Spiel klatsche ich mit allen ab.', '[x]', '']] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Sporthalle · Fußball', titel: 'Foul oder nicht?',
      situation: 'Beim Hallenfußball fällt Finn hin. Nele ist heute Schiedsrichterin. Es gibt Streit.',
      bild: ['finn:wuetend:stehen', 'nele:froh:rollstuhl'], sprecher: { Finn: 'm3', Nele: 'w3', Sami: 'm2', 'Frau Diallo': 'w1' },
      text: [
        ['Finn', 'Foul! Das war ein Foul! Sami hat mich umgestoßen!'],
        ['Sami', 'Gar nicht! Ich habe den Ball gespielt.'],
        ['Nele', 'Ich habe es gesehen. Sami hat nur den Ball gespielt und dich nicht gestoßen. Kein Foul. Es geht weiter.'],
        ['Finn', 'Das ist so unfair! Du bist doch mit ihm befreundet!'],
        ['Frau Diallo', 'Stopp, alle kurz herkommen. Finn, was ist los?'],
        ['Finn', 'Ich bin hingefallen und das zählt nicht.'],
        ['Frau Diallo', 'Hast du dir wehgetan?'],
        ['Finn', 'Ein bisschen am Knie. … Aber vielleicht hat er wirklich den Ball gespielt.'],
        ['Sami', 'Tut mir leid, dass du hingefallen bist. Das wollte ich nicht.'],
        ['Frau Diallo', 'Danke, Sami. Und Finn: Die Schiedsrichterin entscheidet. Auch wenn es schwer ist – wir akzeptieren das. Nele, du hast das gut gemacht.'],
        ['Finn', 'Okay. Sorry, Nele. Weiter geht’s.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Foul? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein Regelverstoß gegen einen Gegenspieler, z. B. Stoßen oder Festhalten', 'ein Tor'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Warum ist Finn wütend?', l: 'Er ist hingefallen und denkt, es war ein Foul.' }, { f: 'Wie entscheidet Nele? Warum?', zeilen: 2, l: 'Kein Foul – Sami hat nur den Ball gespielt und Finn nicht gestoßen.' }, { f: 'Was sagt Sami zu Finn?', l: 'Tut mir leid, dass du hingefallen bist. Das wollte ich nicht.' }, { f: 'Wie endet der Streit?', zeilen: 2, l: 'Finn akzeptiert die Entscheidung, entschuldigt sich bei Nele, das Spiel geht weiter.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie schwer ist es, eine Entscheidung zu akzeptieren, die man unfair findet? Was hilft?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Schwer ist es, wenn …', 'Mir hilft …', 'Ich finde gut, dass Sami …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Fairplay heißt', punkte: ['**Regeln** einhalten', 'alle **respektieren** – auch den Schiri', '**Fehler zugeben**', 'niemanden **auslachen**', '**alle** mitspielen lassen'] },
         { titel: 'Bei Streit', nummern: true, punkte: ['**Stopp** – kurz durchatmen', 'Schiri **entscheidet**', 'nachfragen: „Hast du dir wehgetan?“', '**entschuldigen**, Hand geben', 'weiterspielen'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Fairplay-Karten: Zieht eine Karte. Was ist die faire Lösung? Spielt die Situation kurz nach.', stufe: 2, neueSeite: true, titel: 'Fairplay', icon: 'heart-handshake', farbe: FAIR, spalten: 2, typ: 'dilemma',
        karten: [
          { text: 'Beim Teamwählen bleibt jemand immer bis zum Schluss übrig.', frage: 'Was könnt ihr tun?' },
          { text: 'Du hast den Ball zuletzt berührt, bevor er ins Aus ging. Der Schiri hat es nicht gesehen.', frage: 'Was machst du?' },
          { text: 'Dein Team verliert hoch. Ein Mitspieler beschimpft die Gegner.', frage: 'Was sagst du?' },
          { text: 'Nele im Rollstuhl möchte beim Basketball mitspielen.', frage: 'Wie passt ihr die Regeln an?' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Beschreibe eine faire Szene aus dem Sport (aus der Schule, aus dem Verein, aus dem Fernsehen oder ausgedacht). Warum war sie fair?', stufe: 2,
        anfaenge: ['Ich habe gesehen, wie …', 'Das war fair, weil …', 'Mich hat beeindruckt, dass …'], zeilen: 5,
        beispiel: 'Ich habe gesehen, wie eine Läuferin bei einem Rennen stehen geblieben ist, um einer gestürzten Gegnerin aufzuhelfen. Das war fair, weil ihr die andere wichtiger war als der Sieg. Mich hat beeindruckt, dass das ganze Stadion für beide geklatscht hat.' },
    ],
    check: ['Ich weiß, was Fairplay bedeutet.', 'Ich akzeptiere Entscheidungen des Schiedsrichters.', 'Ich löse Streit im Spiel fair.'],
  },
]

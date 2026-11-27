// Sport · Modul 6 (6P) „Tanz und Rhythmus“ – Éducation physique et sportive, Voie de préparation.
// Beat, Takt, Tempo messen (Rechnen), Body-Percussion-Diktat, Grundschritte mit Fußspuren, Tänze aus aller Welt
// (Springprozession Echternach, Breaking, Capoeira, Flamenco), Choreografie mit Formationen, Ausdruck und Gefühle,
// Auftritt: Lampenfieber, Feedback, Recht am eigenen Bild. Stand 2026. Nele (Rollstuhl) tanzt mit Armen und Rollen.
import { sachModul } from './sachfach-gemeinsam.mjs'
import { fussSchritte, formationen } from './praxis-bilder.mjs'

export const MODUL = sachModul('eduph', 6, {
  titel: 'Tanz und Rhythmus',
  titelFr: 'Danse et rythme',
  unter: 'Den Beat hören, im Takt zählen, Grundschritte tanzen, Tänze aus aller Welt kennenlernen – und mit der Gruppe eine eigene Choreografie zeigen.',
  unterFr: 'Rythme et mesure, pas de base, danses du monde, expression corporelle et création d’une chorégraphie.',
  farbe: '#a23b72',
  deckbild: ['lina:froh:tanzen', 'nele:froh:rollstuhl', 'noah:aufgeregt:tanzen'],
  blasen: [{ t: '5, 6, 7, 8!', x: 8, y: 104 }, { t: 'Im Takt!', x: 134, y: 92 }, { t: 'Freeze!', x: 182, y: 150 }],
  aussprache: {
    '\\b8er-': 'Achter-', 'Step-Touch': 'Stepp-Tatsch', 'V-Step': 'Vau-Stepp', 'Body-Percussion': 'Boddi-Pörkaschen',
    'Breakdance': 'Bräikdäns', 'Breaking': 'Bräiking', 'Hip-Hop': 'Hipp-Hopp', 'Capoeira': 'Kapuera', '\\bUNESCO\\b': 'Unesko',
    'Feedback': 'Fiedbäck', 'Freeze': 'Friehs', '\\bChoreo\\b': 'Koreo', 'New York': 'Nju York',
  },
  themen: [
    { titel: { de: 'Rhythmus und Schritte', fr: 'Rythme et pas' }, icon: 'music', lektionen: 2 },
    { titel: { de: 'Tänze und Choreografie', fr: 'Danses et chorégraphie' }, icon: 'world', lektionen: 2 },
    { titel: { de: 'Ausdruck und Auftritt', fr: 'Expression et spectacle' }, icon: 'mood-smile', lektionen: 2 },
  ],
})

const TANZ = '#a23b72', AUSDRUCK = '#6b4fa0'
const TAKT = ['', '1', '2', '3', '4', '5', '6', '7', '8'], TAKT_B = [24, 9.5, 9.5, 9.5, 9.5, 9.5, 9.5, 9.5, 9.5]

export const LEKTIONEN = [
  // ================================================================ 1
  {
    thema: 'Rhythmus und Takt', titel: 'Im Takt', untertitel: 'Jede Musik hat einen Puls – den Beat. Du lernst, wie Tänzerinnen und Tänzer zählen, misst das Tempo eines Liedes und erfindest eine eigene Body-Percussion.',
    ziel: { de: 'Ich höre den Beat, zähle im Takt und klatsche einen Rhythmus.', fr: 'J’entends la pulsation, je compte les temps et je frappe un rythme.' },
    bild: ['mia:froh:tanzen', 'lehrerin:froh:erklaeren'],
    start: {
      was: 'Rate mal!',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie zählen Tänzerinnen und Tänzer meistens? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['von 1 bis 8', 'von 1 bis 10', 'von 1 bis 100'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w1', nummern: false,
      quelle: 'Sportwissen', titel: 'Beat, Takt und Tempo',
      absaetze: [
        '### Der Beat',
        'Fast jede Musik hat einen gleichmäßigen **Grundschlag**, den **Beat**. Du spürst ihn, wenn du mit dem Fuß mitwippst. Beim Tanzen bewegt man sich **auf** den Beat.',
        '### Zählen bis acht',
        'In vielen Liedern bilden vier Schläge einen **Takt**. Tänzerinnen und Tänzer fassen meistens zwei Takte zusammen und zählen **von 1 bis 8**. Danach beginnt der nächste **8er-Block**. Eine neue Bewegung startet fast immer auf der **Eins**.',
        '### Das Tempo',
        'Das Tempo misst man in **Schlägen pro Minute**. Ein ruhiges Lied hat etwa 70 Schläge pro Minute, ein schnelles Tanzlied 120 bis 130. Du kannst es selbst messen: Zähle die Schläge **15 Sekunden** lang und nimm die Zahl **mal 4**.',
        '### Body-Percussion',
        'Bei der **Body-Percussion** ist der Körper das Instrument: **klatschen**, **stampfen**, **schnipsen** und mit den Händen auf die Oberschenkel **patschen**. Ein Muster, das sich wiederholt, nennt man **Rhythmus**.',
      ],
      woerter: [['der Beat', 'le temps, le beat'], ['der Takt', 'la mesure'], ['das Tempo', 'le tempo'], ['gleichmäßig', 'régulier'], ['klatschen', 'frapper dans les mains'], ['stampfen', 'taper du pied'], ['schnipsen', 'claquer des doigts'], ['der Rhythmus', 'le rythme']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Tänzerinnen und Tänzer zählen meistens von 1 bis 8.', true], ['Eine neue Bewegung beginnt meistens auf der Fünf.', false], ['Ein schnelles Tanzlied hat etwa 120 Schläge pro Minute.', true], ['Um das Tempo zu messen, zählt man 15 Sekunden und nimmt die Zahl mal 4.', true], ['Für Body-Percussion braucht man eine Trommel.', false]] },
      ],
    },
    hoeren: {
      was: 'Eine Anleitung', wo: 'Sporthalle · Body-Percussion', titel: 'Klatsch-Diktat',
      situation: 'Frau Diallo zählt ein Body-Percussion-Muster vor. Hör genau zu: Was passiert auf welchem Schlag?',
      bild: ['lehrerin:froh:erklaeren', 'mia:froh:tanzen'], sprecher: { 'Frau Diallo': 'w1', Mia: 'w3' },
      text: [
        ['Frau Diallo', 'Alle stehen im Kreis. Wir zählen bis acht. Ich sage euch, was auf jeden Schlag kommt.'],
        ['Frau Diallo', 'Auf eins und zwei: klatschen.'],
        ['Frau Diallo', 'Auf drei: einmal mit dem rechten Fuß stampfen.'],
        ['Frau Diallo', 'Auf vier: Pause. Nichts machen.'],
        ['Frau Diallo', 'Auf fünf und sechs: mit beiden Händen auf die Oberschenkel patschen.'],
        ['Frau Diallo', 'Auf sieben: schnipsen. Und auf acht wieder Pause.'],
        ['Mia', 'Also: klatsch, klatsch, stampf, Pause, patsch, patsch, schnips, Pause?'],
        ['Frau Diallo', 'Genau, Mia. Wer im Rollstuhl sitzt, klopft statt zu stampfen einmal auf das Rad oder die Armlehne. Das klingt auch gut.'],
        ['Frau Diallo', 'Wir beginnen ganz langsam, danach wird es schneller. Fünf, sechs, sieben, acht – und los!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „patschen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['mit der flachen Hand auf etwas schlagen', 'mit beiden Füßen springen'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und kreuze an: Was passiert auf welchem Schlag?', stufe: 2, kopf: TAKT, breiten: TAKT_B, zeilen: [['klatschen', '[x]', '[x]', '', '', '', '', '', ''], ['stampfen', '', '', '[x]', '', '', '', '', ''], ['patschen', '', '', '', '', '[x]', '[x]', '', ''], ['schnipsen', '', '', '', '', '', '', '[x]', ''], ['Pause', '', '', '', '[x]', '', '', '', '[x]']] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Macht das Muster zusammen. Bleibt ihr im Takt, wenn es schneller wird?', stufe: 1, karten: [
        { titel: 'Tipps', text: ['Laut mitzählen hilft.', 'Erst langsam, dann schneller.', 'Auf die Eins achten!'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Takt', punkte: ['**Beat** = Grundschlag', 'zählen von **1 bis 8**', 'neue Bewegung auf der **Eins**'] },
         { titel: 'Tempo', punkte: ['in **Schlägen pro Minute**', '**15 Sekunden** zählen, **mal 4**', 'ruhig: ca. **70**, schnell: ca. **120**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Mein Rhythmus: Erfinde ein eigenes Muster. Kreuze an und bring es einem Partner bei.', stufe: 2, kopf: TAKT, breiten: TAKT_B, zeilen: [['klatschen', '', '', '', '', '', '', '', ''], ['stampfen', '', '', '', '', '', '', '', ''], ['patschen', '', '', '', '', '', '', '', ''], ['schnipsen', '', '', '', '', '', '', '', ''], ['Pause', '', '', '', '', '', '', '', '']] },
      { art: 'rechnen', auftrag: 'Tempo-Detektiv: Wie viele Schläge pro Minute sind das?', stufe: 2, spalten: 2, items: [{ a: '25 Schläge in 15 Sekunden', l: '100 Schläge pro Minute' }, { a: '30 Schläge in 15 Sekunden', l: '120 Schläge pro Minute' }, { a: '18 Schläge in 15 Sekunden', l: '72 Schläge pro Minute' }, { a: 'Ein Lied hat 120 Schläge pro Minute und dauert 3 Minuten. Wie viele 8er-Blöcke hat es?', l: '360 Schläge ÷ 8 = 45 Blöcke' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Zu welcher Musik bewegst du dich gern? Ist sie schnell oder langsam? Wie fühlt sich das an?', stufe: 1,
        anfaenge: ['Ich bewege mich gern zu …', 'Das Tempo ist …', 'Dabei fühle ich mich …'], zeilen: 5,
        beispiel: 'Ich bewege mich gern zu schneller Musik mit einem starken Beat. Das Tempo ist ungefähr 120 Schläge pro Minute. Dabei fühle ich mich wach und gut gelaunt.' },
    ],
    check: ['Ich höre den Beat und zähle bis 8.', 'Ich messe das Tempo eines Liedes.', 'Ich klatsche einen Rhythmus im Takt.'],
  },
  // ================================================================ 2
  {
    thema: 'Grundschritte', titel: 'Schritt für Schritt', untertitel: 'Viele Tänze bestehen aus wenigen Grundschritten. Du lernst vier davon, liest Fußspuren und tanzt eine kurze Schrittfolge nach Ansage.',
    ziel: { de: 'Ich tanze vier Grundschritte im Takt.', fr: 'Je danse quatre pas de base en rythme.' },
    bild: ['lio:froh:tanzen', 'nele:froh:rollstuhl'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist für dich beim Tanzen am schwersten? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['die Schritte merken', 'im Takt bleiben', 'vor anderen tanzen', 'nichts davon'], r: [] }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Tanzstunde', titel: 'Vier Grundschritte',
      absaetze: [
        'Alle Schritte beginnen mit dem **rechten** Fuß und dauern **vier Schläge**. Zähle laut mit.',
        '### Step-Touch',
        '**1** rechts zur Seite treten, **2** links heranstellen und nur antippen, **3** links zur Seite, **4** rechts antippen. Der Schritt geht hin und her.',
        '### V-Step',
        '**1** rechts schräg nach vorn, **2** links schräg nach vorn. Die Beine stehen jetzt weit auseinander wie ein V. **3** rechts zurück zur Mitte, **4** links zurück.',
        '### Kreuzschritt',
        '**1** rechts zur Seite, **2** links **hinter** dem rechten Fuß kreuzen, **3** rechts noch einmal zur Seite, **4** links antippen. Danach geht es in die andere Richtung, dann beginnt der linke Fuß.',
        '### Knie hoch',
        '**1** rechtes Knie hochziehen, **2** abstellen, **3** linkes Knie hoch, **4** abstellen. Die Arme schwingen mit.',
        'Im Rollstuhl tanzt man die Schritte mit **Armen und Rollen**: beim V-Step zum Beispiel die Arme schräg nach vorn strecken und zurückholen.',
      ],
      woerter: [['der Schritt', 'le pas'], ['zur Seite', 'sur le côté'], ['antippen', 'toucher légèrement du pied'], ['schräg', 'en biais'], ['kreuzen', 'croiser'], ['hinter', 'derrière'], ['das Knie', 'le genou'], ['mitschwingen', 'se balancer en rythme'],
      ],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Schau dir die Fußspuren an. Welcher Schritt ist A, welcher ist B?', stufe: 2, html: '<div class="voll">' + fussSchritte() + '</div>', liste: [['A', 'V-Step'], ['B', 'Kreuzschritt nach rechts']], spalten: 2 },
      ],
    },
    hoeren: {
      was: 'Eine Tanz-Ansage', wo: 'Sporthalle · Tanzstunde', titel: 'Die erste Schrittfolge',
      situation: 'Frau Diallo bringt der Klasse eine kurze Schrittfolge bei. Hör zu: In welcher Reihenfolge kommen die Schritte?',
      bild: ['lehrerin:froh:erklaeren', 'nele:froh:rollstuhl'], sprecher: { 'Frau Diallo': 'w1', Lio: 'm3', Nele: 'w3' },
      text: [
        ['Frau Diallo', 'Unsere Schrittfolge hat vier Teile. Jeder Teil dauert einen 8er-Block.'],
        ['Frau Diallo', 'Wir starten mit dem Step-Touch: rechts, tipp, links, tipp. Zweimal, also acht Schläge.'],
        ['Frau Diallo', 'Danach kommt der V-Step: vor, vor, zurück, zurück. Auch zweimal.'],
        ['Lio', 'Und dann?'],
        ['Frau Diallo', 'Dann der Kreuzschritt: einmal nach rechts und einmal nach links.'],
        ['Frau Diallo', 'Zum Schluss: Knie hoch, rechts und links. Und auf acht klatschen wir in die Hände.'],
        ['Nele', 'Ich mache den V-Step mit den Armen. Und beim Kreuzschritt drehe ich den Rollstuhl ein Stück nach rechts und nach links.'],
        ['Frau Diallo', 'Perfekt, Nele. Alle dürfen die Schritte so anpassen, dass sie für sie passen. Wichtig ist: im Takt bleiben.'],
        ['Frau Diallo', 'Also alles von vorn. Fünf, sechs, sieben, acht!'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „anpassen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwas so ändern, dass es passt', 'etwas ganz weglassen'], r: 0 }] }],
      beim: [
        { art: 'ordnen', auftrag: 'Hör zu. Bring die Schritte in die richtige Reihenfolge.', stufe: 1, teile: ['Step-Touch', 'V-Step', 'Kreuzschritt', 'Knie hoch und klatschen'], ordnung: [2, 3, 0, 1] },
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Wie lange dauert jeder Teil?', l: 'einen 8er-Block, also acht Schläge' }, { f: 'Wie tanzt Nele den V-Step und den Kreuzschritt?', zeilen: 2, l: 'den V-Step mit den Armen, beim Kreuzschritt dreht sie den Rollstuhl nach rechts und links' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Tanzt die Schrittfolge zu zweit. Eine Person zählt laut, die andere tanzt. Dann wechselt ihr.', stufe: 1, karten: [
        { titel: 'Zählen', text: ['Fünf, sechs, sieben, acht!', 'Und eins, zwei, drei, vier …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Grundschritte', nummern: true, punkte: ['**Step-Touch**: Seite, tipp', '**V-Step**: vor, vor, zurück, zurück', '**Kreuzschritt**: Seite, hinten kreuzen, Seite, tipp', '**Knie hoch**: rechts, links'] },
         { titel: 'Tipps', punkte: ['Start mit **rechts**', 'jeder Schritt = **4 Schläge**', 'laut **mitzählen**', 'Schritte **anpassen** ist erlaubt'] }],
      ],
    },
    ueben: [
      { art: 'zuordnen', auftrag: 'Was passt zu welchem Schritt? Verbinde.', stufe: 1, links: ['Die Beine bilden ein V.', 'Ein Fuß geht hinter den anderen.', 'Hin und her, mit Antippen.', 'Das Knie geht nach oben.'], rechts: ['V-Step', 'Kreuzschritt', 'Step-Touch', 'Knie hoch'] },
      { art: 'tabelle', auftrag: 'Meine Schrittfolge: Plane vier 8er-Blöcke. Wähle Schritte und Arme. Tanze sie einem Partner vor.', stufe: 2, kopf: ['Block', 'Schritt', 'Arme'], breiten: [16, 42, 42], zeilen: [['1', '', ''], ['2', '', ''], ['3', '', ''], ['4', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welcher Schritt fällt dir leicht, welcher schwer? Was hilft dir beim Lernen von Schritten?', stufe: 2,
        anfaenge: ['Leicht fällt mir …', 'Schwer ist …', 'Mir hilft, wenn …'], zeilen: 5,
        beispiel: 'Leicht fällt mir der Step-Touch, weil er einfach hin und her geht. Schwer ist der Kreuzschritt, weil ich mit den Füßen durcheinanderkomme. Mir hilft, wenn jemand laut zählt und ich es erst langsam übe.' },
    ],
    check: ['Ich tanze Step-Touch und V-Step.', 'Ich tanze den Kreuzschritt nach rechts und links.', 'Ich bleibe dabei im Takt.'],
  },
  // ================================================================ 3
  {
    thema: 'Tänze aus aller Welt', titel: 'Tanzen verbindet', untertitel: 'Überall auf der Welt tanzen Menschen – bei Festen, auf der Straße und im Wettkampf. Du lernst vier Tänze kennen, auch einen ganz besonderen aus Luxemburg.',
    ziel: { de: 'Ich kenne Tänze aus verschiedenen Ländern und erzähle davon.', fr: 'Je connais des danses de différents pays et j’en parle.' },
    bild: ['sami:froh:stehen-zeigen', 'amira:froh:tanzen'],
    start: {
      was: 'Was weißt du?',
      aufgaben: [
        { art: 'mc', auftrag: 'In welcher Stadt in Luxemburg gibt es jedes Jahr eine tanzende Prozession? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Echternach', 'Wiltz', 'Clerf'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Sportwissen (Stand 2026)', titel: 'Vier Tänze, vier Geschichten',
      absaetze: [
        '### Die Springprozession in Echternach',
        'Jedes Jahr am **Pfingstdienstag** ziehen tausende Menschen tanzend durch **Echternach**. Sie ehren den heiligen **Willibrord**. In Reihen halten sie sich an weißen Tüchern fest und springen zur Musik abwechselnd nach **links und rechts** vorwärts. Seit 2010 gehört die Springprozession zum **immateriellen Kulturerbe der UNESCO**.',
        '### Breaking',
        '**Breaking**, oft Breakdance genannt, entstand in den Siebzigerjahren in **New York**. Junge Leute tanzten auf der Straße zu Hip-Hop-Musik, mit Drehungen am Boden. 2024 war Breaking zum ersten Mal bei den **Olympischen Spielen**.',
        '### Capoeira',
        '**Capoeira** kommt aus **Brasilien**. Sie ist eine Mischung aus Kampfkunst, Tanz und Musik. Entwickelt haben sie Menschen aus Afrika, die nach Brasilien verschleppt und versklavt worden waren. Zwei Personen „spielen“ im Kreis miteinander, ohne sich zu treffen.',
        '### Flamenco',
        '**Flamenco** stammt aus **Andalusien** im Süden Spaniens. Vor allem die Gitanos, die spanischen Roma, haben ihn geprägt. Dazu gehören Gesang, Gitarre, Klatschen und Stampfen. Er zeigt starke Gefühle wie Stolz oder Trauer.',
      ],
      woerter: [['die Prozession', 'la procession'], ['ehren', 'honorer'], ['das Kulturerbe', 'le patrimoine culturel'], ['entstehen', 'naître, apparaître'], ['die Kampfkunst', 'l’art martial'], ['verschleppt', 'déporté'], ['kraftvoll', 'puissant'], ['die Trauer', 'la tristesse']],
      aufgaben: [
        { art: 'tabelle', auftrag: 'Fülle die Tabelle mit dem Text aus.', stufe: 2, kopf: ['Tanz', 'Land, Ort', 'Das ist besonders'], breiten: [24, 30, 46], zeilen: [['Springprozession', '[Echternach, Luxemburg]', '[Springen nach links und rechts, UNESCO-Kulturerbe]'], ['Breaking', '[New York, USA]', '[Drehungen am Boden, 2024 bei Olympia]'], ['Capoeira', '[Brasilien]', '[Kampfkunst, Tanz und Musik im Kreis]'], ['Flamenco', '[Andalusien, Spanien]', '[Gesang, Gitarre, Stampfen, starke Gefühle]']] },
      ],
    },
    hoeren: {
      was: 'Ein Radiobeitrag', wo: 'Schulradio · Interview', titel: 'Mittanzen in Echternach',
      situation: 'Sami war bei der Springprozession in Echternach dabei. Amira interviewt ihn für das Schulradio.',
      bild: ['amira:froh:erklaeren', 'sami:froh:stehen-zeigen'], sprecher: { Amira: 'w2', Sami: 'm2' },
      text: [
        ['Amira', 'Willkommen beim Schulradio! Heute bei mir: Sami. Du warst bei der Springprozession in Echternach. Wie war das?'],
        ['Sami', 'Echt beeindruckend. Ich war mit meiner Jugendgruppe dort. Es waren unglaublich viele Leute.'],
        ['Amira', 'Wie tanzt man da?'],
        ['Sami', 'Man steht in einer Reihe, ungefähr fünf Leute nebeneinander, und hält sich an weißen Tüchern fest. Dann springt man zur Musik nach links und nach rechts und kommt dabei langsam vorwärts.'],
        ['Amira', 'Ist das nicht anstrengend?'],
        ['Sami', 'Doch! Wir sind über eine Stunde gesprungen. Am nächsten Tag hatte ich ganz schön Muskelkater.'],
        ['Amira', 'Und die Musik?'],
        ['Sami', 'Es ist immer dieselbe Melodie, gespielt von vielen Musikgruppen. Danach hatte ich sie den ganzen Tag im Kopf.'],
        ['Amira', 'Würdest du wieder mitmachen?'],
        ['Sami', 'Ja, auf jeden Fall. Es ist ein besonderes Gefühl, wenn so viele Menschen im gleichen Rhythmus tanzen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist Muskelkater? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Schmerzen in den Muskeln nach viel Bewegung', 'eine Katze im Sportverein'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Mit wem war Sami in Echternach?', l: 'mit seiner Jugendgruppe' }, { f: 'Woran halten sich die Tänzer fest?', l: 'an weißen Tüchern' }, { f: 'Wie bewegen sie sich?', zeilen: 2, l: 'Sie springen nach links und rechts und kommen dabei langsam vorwärts.' }, { f: 'Was gefällt Sami besonders?', zeilen: 2, l: 'das Gefühl, wenn so viele Menschen im gleichen Rhythmus tanzen' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Kennt ihr ein Fest, bei dem getanzt wird? Erzählt davon – oder erfindet ein Fest.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Bei diesem Fest …', 'Man tanzt …', 'Besonders finde ich …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Tänze der Welt', punkte: ['**Springprozession**: Echternach, Luxemburg', '**Breaking**: New York, 2024 bei Olympia', '**Capoeira**: Brasilien', '**Flamenco**: Spanien'] },
         { titel: 'Tanzen verbindet', punkte: ['bei **Festen** und Feiern', 'als **Sport** und Wettkampf', 'zeigt **Gefühle** und Geschichte'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Tanz-Steckbrief: Wähle einen Tanz aus dem Text oder einen anderen Tanz. Recherchiere und fülle aus.', stufe: 2, kopf: ['', 'Mein Tanz'], breiten: [34, 66], zeilen: [['Name', ''], ['Land, Herkunft', ''], ['Musik', ''], ['typische Bewegung', ''], ['Das finde ich interessant', '']] },
      { art: 'fragen', auftrag: 'Ausprobieren: Stellt euch zu fünft in eine Reihe. Haltet euch an den Händen oder an Tüchern und springt im Takt nach links und rechts vorwärts. Wie war es?', stufe: 1, fragen: [{ f: '', zeilen: 3, l: 'Individuell' }] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welchen Tanz aus dieser Lektion würdest du gern lernen? Warum?', stufe: 2,
        anfaenge: ['Am liebsten würde ich … lernen,', 'weil …', 'Schwierig wäre vielleicht …'], zeilen: 5,
        beispiel: 'Am liebsten würde ich Breaking lernen, weil die Drehungen am Boden richtig cool aussehen. Schwierig wäre vielleicht, dass man dafür viel Kraft in den Armen braucht.' },
    ],
    check: ['Ich kenne vier Tänze aus verschiedenen Ländern.', 'Ich weiß, was die Springprozession ist.', 'Ich erstelle einen Tanz-Steckbrief.'],
  },
  // ================================================================ 4
  {
    thema: 'Eine Choreografie erstellen', titel: 'Unsere Choreo', untertitel: 'Eine Choreografie ist ein geplanter Tanz. Du lernst, wie man sie aufbaut und welche Formationen es gibt – und planst mit deiner Gruppe einen eigenen Tanz.',
    ziel: { de: 'Ich plane mit anderen eine kurze Choreografie.', fr: 'Je planifie une courte chorégraphie avec d’autres.' },
    bild: ['lina:froh:erklaeren', 'noah:froh:tanzen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist eine Choreografie? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['ein geplanter Ablauf von Tanzbewegungen', 'ein Musikinstrument', 'eine Sportverletzung'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Eine Anleitung', art: 'anleitung', stimme: 'w1',
      quelle: 'Tanzstunde', titel: 'So entsteht eine Choreografie',
      material: ['Musik mit klarem Beat', 'Lautsprecher', 'Choreo-Plan und Stift', 'genug Platz'],
      schritte: [
        { icon: 'music', text: '**Musik wählen** und das Tempo prüfen. Nicht zu schnell für den Anfang!' },
        { icon: 'list-numbers', text: 'Die Musik in **8er-Blöcke** einteilen. Vier bis sechs Blöcke reichen.' },
        { icon: 'user', text: 'Eine **Anfangspose** festlegen: So steht ihr da, bevor die Musik beginnt.' },
        { icon: 'shoe', text: 'Für jeden Block **Schritte und Arme** wählen. Ein Teil darf sich **wiederholen** – das hilft beim Merken.' },
        { icon: 'users-group', text: 'Mindestens einen **Formationswechsel** einbauen und eine **Schlusspose**. Erst langsam üben, dann im Tempo.' },
      ],
      danach: ['Beliebte **Formationen** sind die **Linie**, der **Block** in mehreren Reihen, der **Kreis** und das **Dreieck** mit einer Person vorn. Achtet darauf, dass alle die Schritte schaffen.'],
      woerter: [['die Choreografie', 'la chorégraphie'], ['einteilen', 'diviser'], ['die Pose', 'la pose'], ['festlegen', 'fixer'], ['wiederholen', 'répéter'], ['die Formation', 'la formation'], ['der Wechsel', 'le changement'], ['das Dreieck', 'le triangle']],
      aufgaben: [
        { art: 'beschriften', auftrag: 'Wie heißen die Formationen? Schreib die Namen.', stufe: 1, html: '<div class="voll">' + formationen() + '</div>', liste: [['1', 'Linie'], ['2', 'Block'], ['3', 'Kreis'], ['4', 'Dreieck']], spalten: 2 },
      ],
    },
    hoeren: {
      was: 'Eine Gruppenbesprechung', wo: 'Sporthalle · Gruppenarbeit', titel: 'Wer macht was?',
      situation: 'Lina, Noah und Mia planen ihre Choreografie. Nicht alle haben die gleiche Idee.',
      bild: ['lina:froh:erklaeren', 'noah:verwirrt:stehen'], sprecher: { Lina: 'w3', Noah: 'm3', Mia: 'w2' },
      text: [
        ['Lina', 'Unser Lied hat einen guten Beat. Ich habe gezählt: ungefähr 110 Schläge pro Minute.'],
        ['Noah', 'Ich will gleich am Anfang einen Sprung mit Drehung. Das sieht cool aus.'],
        ['Mia', 'Für mich ist das zu schwer. Ich schaffe keine Drehung im Sprung.'],
        ['Lina', 'Dann machen wir es so: Im ersten Block stehen wir in einer Linie und machen alle den Step-Touch. Das schaffen alle.'],
        ['Noah', 'Und im zweiten Block? Da könnte ich meinen Sprung machen, allein, als Solo. Ihr klatscht dazu.'],
        ['Mia', 'Gute Idee! Im dritten Block wechseln wir in ein Dreieck. Ich stehe vorn.'],
        ['Lina', 'Im vierten Block wiederholen wir den Anfang. Und am Ende: eine Schlusspose, ganz still, bis die Musik aus ist.'],
        ['Noah', 'Okay. Ich schreibe alles in den Choreo-Plan.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was ist ein Solo? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Eine Person tanzt allein.', 'Alle tanzen gleichzeitig.'], r: 0 }] }],
      beim: [
        { art: 'tabelle', auftrag: 'Hör zu und fülle den Choreo-Plan der Gruppe aus.', stufe: 2, kopf: ['Block', 'Was passiert?', 'Formation'], breiten: [14, 56, 30], zeilen: [['1', '[alle tanzen Step-Touch]', '[Linie]'], ['2', '[Noah: Sprung mit Drehung als Solo, die anderen klatschen]', '[nicht gesagt]'], ['3', '[Wechsel der Formation]', '[Dreieck, Mia vorn]'], ['4', '[Wiederholung vom Anfang, dann Schlusspose]', '[Linie]']] },
        { art: 'fragen', auftrag: 'Wie löst die Gruppe das Problem mit dem Sprung?', stufe: 2, fragen: [{ f: '', zeilen: 2, l: 'Noah springt allein als Solo, die anderen klatschen. So müssen nicht alle springen.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Wie findet ihr die Lösung der Gruppe? Was macht ihr, wenn in eurer Gruppe nicht alle das Gleiche wollen?', stufe: 3, karten: [
        { titel: 'Satzanfänge', text: ['Ich finde die Lösung …', 'Bei uns …', 'Ein Kompromiss wäre …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Aufbau', nummern: true, punkte: ['**Anfangspose**', 'Schritte in **8er-Blöcken**', '**Formationswechsel**', '**Wiederholung** hilft', '**Schlusspose**'] },
         { titel: 'Formationen', punkte: ['**Linie**: nebeneinander', '**Block**: mehrere Reihen', '**Kreis**', '**Dreieck**: eine Person vorn'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Unser Choreo-Plan: Tragt eure Ideen ein.', stufe: 2, kopf: ['Block', 'Schritte und Arme', 'Formation'], breiten: [22, 50, 28], zeilen: [['Anfangspose', '', ''], ['1', '', ''], ['2', '', ''], ['3', '', ''], ['4', '', ''], ['Schlusspose', '', '']] },
      { art: 'schneidekarten', auftrag: 'Bewegungskarten: Zieht vier Karten und baut daraus eure Choreo. Jede Karte ist ein 8er-Block.', stufe: 2, neueSeite: true, titel: 'Bewegung', icon: 'music', farbe: TANZ, spalten: 2,
        karten: [
          { text: '**Step-Touch**\nzweimal hin und her, die Arme schwingen mit' }, { text: '**V-Step**\nvor, vor, zurück, zurück – zweimal' },
          { text: '**Kreuzschritt**\nnach rechts, dann nach links' }, { text: '**Knie hoch**\nim Wechsel, auf 8 klatschen' },
          { text: '**Drehung**\nlangsam um die eigene Achse, dann eine Pose' }, { text: '**Welle**\neine Person nach der anderen hebt die Arme' },
          { text: '**Freeze**\nauf 1 einfrieren, auf 5 eine neue Pose' }, { text: '**Body-Percussion**\nklatschen, stampfen, patschen, schnipsen' },
        ] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie lief die Arbeit in eurer Gruppe? Was war deine Idee?', stufe: 2,
        anfaenge: ['In unserer Gruppe …', 'Meine Idee war …', 'Schwierig war …', 'Gelöst haben wir es, indem …'], zeilen: 6,
        beispiel: 'In unserer Gruppe hatten alle andere Ideen. Meine Idee war eine Welle mit den Armen. Schwierig war, dass zwei Leute keine Drehung machen wollten. Gelöst haben wir es, indem die Drehung freiwillig war.' },
    ],
    check: ['Ich kenne den Aufbau einer Choreografie.', 'Ich kenne vier Formationen.', 'Ich plane mit meiner Gruppe einen Tanz.'],
  },
  // ================================================================ 5
  {
    thema: 'Ausdruck und Gefühle', titel: 'Bewegung zeigt Gefühle', untertitel: 'Unser Körper spricht, auch ohne Worte. Du lernst, wie man mit Tempo, Größe und Spannung Gefühle zeigt, und probierst Spiegel- und Standbild-Übungen aus.',
    ziel: { de: 'Ich zeige Gefühle mit meinem Körper und erkenne sie bei anderen.', fr: 'J’exprime des émotions avec mon corps et je les reconnais chez les autres.' },
    bild: ['yusuf:verlegen:stehen', 'lina:froh:tanzen'],
    start: {
      was: 'Was meinst du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Wie bewegt sich ein Mensch oft, wenn er traurig ist? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['langsam, mit hängenden Schultern', 'schnell und hüpfend', 'mit großen, kräftigen Bewegungen'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Sachtext', art: 'text', stimme: 'w2', nummern: false,
      quelle: 'Sportwissen', titel: 'Der Körper spricht',
      absaetze: [
        'Wenn wir uns freuen, springen wir vielleicht in die Luft. Wenn wir traurig sind, lassen wir die Schultern hängen. Unser Körper zeigt Gefühle oft, **bevor** wir etwas sagen.',
        'Beim Tanzen und im Theater nutzt man das bewusst. Drei Dinge kann man verändern:',
        '**Tempo:** schnell oder langsam. Schnelle Bewegungen wirken fröhlich, aufgeregt oder wütend. Langsame Bewegungen wirken ruhig, traurig oder müde.',
        '**Größe:** groß oder klein. Große, weite Bewegungen wirken stolz und mutig. Kleine Bewegungen nah am Körper wirken ängstlich oder schüchtern.',
        '**Spannung:** fest oder locker. Mit viel Spannung wirkt man kraftvoll oder wütend. Locker wirkt man entspannt – oder erschöpft.',
        'Auch das **Gesicht** und der **Blick** spielen mit. Wer nach unten schaut, wirkt unsicher. Wer nach vorn schaut, wirkt selbstbewusst.',
      ],
      woerter: [['das Gefühl', 'le sentiment'], ['die Schulter', 'l’épaule'], ['bewusst', 'consciemment'], ['wirken', 'paraître, avoir l’air'], ['die Spannung', 'la tension'], ['schüchtern', 'timide'], ['erschöpft', 'épuisé'], ['selbstbewusst', 'sûr de soi']],
      aufgaben: [
        { art: 'zuordnen', auftrag: 'Wie wirken diese Bewegungen? Verbinde.', stufe: 1, links: ['schnelle Bewegungen', 'langsame Bewegungen', 'große, weite Bewegungen', 'kleine Bewegungen nah am Körper'], rechts: ['fröhlich, aufgeregt oder wütend', 'ruhig, traurig oder müde', 'stolz und mutig', 'ängstlich oder schüchtern'] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Sporthalle · vor der Übung', titel: 'Ich tanze nicht!',
      situation: 'Yusuf möchte in der Tanzstunde nicht mitmachen. Lina und Frau Diallo sprechen mit ihm.',
      bild: ['yusuf:verlegen:stehen', 'lehrerin:ruhig:stehen'], sprecher: { Yusuf: 'm3', Lina: 'w3', 'Frau Diallo': 'w1' },
      text: [
        ['Yusuf', 'Ich mache da nicht mit. Tanzen ist peinlich.'],
        ['Lina', 'Warum? Am Anfang fand ich das auch komisch.'],
        ['Yusuf', 'Alle gucken. Und ich sehe bestimmt lächerlich aus.'],
        ['Frau Diallo', 'Danke, dass du das ehrlich sagst, Yusuf. Viele fühlen sich am Anfang so. Heute gibt es keine Vorführung, nur eine Spiegel-Übung zu zweit.'],
        ['Yusuf', 'Was ist das?'],
        ['Frau Diallo', 'Zwei Personen stehen sich gegenüber. Eine bewegt sich langsam, die andere macht alles nach, wie ein Spiegel. Niemand schaut zu, alle Paare üben gleichzeitig.'],
        ['Lina', 'Machst du mit mir? Du darfst anfangen.'],
        ['Yusuf', 'Na gut. Aber nur langsam.'],
        ['Frau Diallo', 'Genau so. Und wer eine Pause braucht, darf am Rand zuschauen und danach wieder einsteigen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „peinlich“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Man schämt sich, es ist unangenehm.', 'Es macht großen Spaß.'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Warum will Yusuf nicht tanzen?', zeilen: 2, l: 'Er findet Tanzen peinlich. Er hat Angst, dass alle gucken und er lächerlich aussieht.' }, { f: 'Wie funktioniert die Spiegel-Übung?', zeilen: 2, l: 'Zwei stehen sich gegenüber. Eine Person bewegt sich langsam, die andere macht alles nach wie ein Spiegel.' }, { f: 'Was macht es für Yusuf leichter?', zeilen: 2, l: 'Niemand schaut zu, alle üben gleichzeitig. Er darf anfangen und langsam machen. Eine Pause am Rand ist erlaubt.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Was kann helfen, wenn man sich beim Tanzen unsicher fühlt? Sammelt Ideen.', stufe: 2, karten: [
        { titel: 'Satzanfänge', text: ['Helfen könnte, …', 'Man könnte …', 'Wichtig ist, dass niemand …'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Gefühle zeigen', punkte: ['**Tempo**: schnell – langsam', '**Größe**: groß – klein', '**Spannung**: fest – locker', '**Blick** und Gesicht'] },
         { titel: 'Übungen', punkte: ['**Spiegel**: nachmachen', '**Standbild**: einfrieren', 'niemand wird **ausgelacht**', 'Pause am Rand ist **okay**'] }],
        [{ titel: 'Wenn ich nicht mitmachen kann', punkte: ['**vor** der Stunde Bescheid sagen', 'höflich und **mit Grund**', 'krank oder verletzt: **schriftliche Entschuldigung**', '„keine Lust“ ist **kein Grund**', 'trotzdem dabei: **beobachten**, Musik, Zeit'] }],
      ],
    },
    ueben: [
      { art: 'schneidekarten', auftrag: 'Gefühlskarten: Zieht eine Karte. Zeigt das Gefühl nur mit dem Körper, ohne Worte. Die anderen raten.', stufe: 2, neueSeite: true, titel: 'Gefühl', icon: 'mood-smile', farbe: AUSDRUCK, spalten: 2,
        karten: [
          { text: '**fröhlich**\nTipp: schnell und groß' }, { text: '**traurig**\nTipp: langsam, Schultern hängen' },
          { text: '**wütend**\nTipp: viel Spannung, feste Schritte' }, { text: '**ängstlich**\nTipp: klein, nah am Körper' },
          { text: '**stolz**\nTipp: groß, Blick nach vorn' }, { text: '**müde**\nTipp: langsam und locker' },
          { text: '**nervös**\nTipp: kleine, schnelle Bewegungen' }, { text: '**überrascht**\nTipp: plötzlich stoppen, Augen groß' },
        ] },
      { art: 'tabelle', auftrag: 'Nicht mitmachen – aber richtig: Ist das eine Entschuldigung in aller Form? Kreuze an. Sprecht danach: Was könnte die Person stattdessen sagen?', stufe: 2, kopf: ['Was sagt die Person zu Frau Diallo?', 'in aller Form', 'so nicht'], breiten: [64, 18, 18], zeilen: [
        ['„Ich habe mir gestern den Knöchel verstaucht. Hier ist die Entschuldigung. Darf ich heute die Musik machen?“', '[x]', ''],
        ['„Kein Bock heute.“', '', '[x]'],
        ['„Mir ist schwindlig. Darf ich mich kurz an den Rand setzen und später wieder einsteigen?“', '[x]', ''],
        ['(geht einfach auf die Bank und sagt nichts)', '', '[x]'],
        ['„Tanzen ist mir peinlich. Kann ich mit der Spiegel-Übung zu zweit anfangen?“', '[x]', ''],
      ] },
      { art: 'tabelle', auftrag: 'Standbild-Rätsel: Eine Gruppe friert in einem Standbild ein. Was seht ihr?', stufe: 2, kopf: ['Standbild', 'Welches Gefühl?', 'Woran erkennt ihr es?'], breiten: [20, 30, 50], zeilen: [['Gruppe 1', '', ''], ['Gruppe 2', '', ''], ['Gruppe 3', '', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Welches Gefühl konntest du gut zeigen? Wie ging es dir bei den Übungen?', stufe: 2,
        anfaenge: ['Gut zeigen konnte ich …', 'Dafür habe ich …', 'Bei der Spiegel-Übung …'], zeilen: 5,
        beispiel: 'Gut zeigen konnte ich Wut. Dafür habe ich feste Schritte gemacht und die Fäuste geballt. Bei der Spiegel-Übung musste ich erst lachen, aber dann hat es gut geklappt.' },
    ],
    check: ['Ich zeige Gefühle mit Tempo, Größe und Spannung.', 'Ich erkenne Gefühle bei anderen.', 'Ich mache bei der Spiegel-Übung mit.', 'Wenn ich nicht mitmachen kann, sage ich es höflich und mit Grund.'],
  },
  // ================================================================ 6
  {
    thema: 'Projekt: Unser Tanz-Auftritt', titel: 'Bühne frei!', untertitel: 'Zum Schluss zeigt ihr eure Choreografie. Du lernst, was gegen Lampenfieber hilft, wie man fair Rückmeldung gibt und warum man nicht einfach jeden filmen darf.',
    ziel: { de: 'Ich zeige meinen Tanz, gebe faires Feedback und achte auf die Rechte anderer.', fr: 'Je présente ma danse, je donne un retour juste et je respecte les droits des autres.' },
    bild: ['nele:aufgeregt:rollstuhl', 'tom:froh:handy'],
    start: {
      was: 'Was weißt du?',
      aufgaben: [
        { art: 'mc', auftrag: 'Was ist Lampenfieber? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['Aufregung vor einem Auftritt', 'eine Krankheit mit Fieber', 'eine kaputte Lampe'], r: 0 }] },
      ],
    },
    lesen: {
      was: 'Ein Ratgeber', art: 'text', stimme: 'm1', nummern: false,
      quelle: 'Ratgeber (Stand 2026)', titel: 'Gut vorbereitet auf die Bühne',
      absaetze: [
        '### Lampenfieber ist normal',
        'Vor einem Auftritt klopft das Herz, die Hände werden feucht, im Bauch kribbelt es. Das nennt man **Lampenfieber**. Fast alle kennen das, auch Profis. Ein bisschen Aufregung macht sogar **wach und konzentriert**.',
        '**Was hilft:** Ruhig atmen – vier Sekunden ein, vier Sekunden aus. Vorher gut **aufwärmen**. Einen festen Punkt im Raum anschauen. Und wenn ein Fehler passiert: **einfach weitertanzen**. Meistens merkt das Publikum es gar nicht.',
        '### Fair Rückmeldung geben',
        'Nach dem Auftritt gibt es **Feedback**. Eine gute Regel ist: **zwei Sterne und ein Wunsch**. Zuerst nennt man zwei Dinge, die gut waren. Dann einen Wunsch, was noch besser werden könnte. Man spricht über den **Tanz**, nicht über das Aussehen.',
        '### Filmen nur mit Erlaubnis',
        'Jeder Mensch hat das **Recht am eigenen Bild**. Du darfst andere nur filmen oder fotografieren, wenn alle **einverstanden** sind. Auch zum Weitergeben oder Posten brauchst du ihr Einverständnis. In der Schule gibt es dazu feste Regeln. Ein Video im Internet kann man kaum wieder ganz löschen.',
      ],
      woerter: [['das Lampenfieber', 'le trac'], ['der Auftritt', 'la représentation'], ['das Publikum', 'le public'], ['weitermachen', 'continuer'], ['die Rückmeldung', 'le retour'], ['der Wunsch', 'le souhait'], ['das Recht am eigenen Bild', 'le droit à l’image'], ['einverstanden', 'd’accord']],
      aufgaben: [
        { art: 'rf', auftrag: 'Richtig oder falsch?', stufe: 1, saetze: [['Lampenfieber haben nur Anfänger.', false], ['Ruhiges Atmen kann gegen Lampenfieber helfen.', true], ['Nach einem Fehler sollte man aufhören und neu anfangen.', false], ['Beim Feedback nennt man zuerst zwei gute Dinge.', true], ['Ein Video von anderen darf man posten, wenn es lustig ist.', false]] },
      ],
    },
    hoeren: {
      was: 'Ein Gespräch', wo: 'Umkleide · kurz vor dem Auftritt', titel: 'Gleich geht’s los',
      situation: 'Gleich zeigt die Klasse ihre Tänze beim Schulfest. Nele ist aufgeregt, und Tom hat eine Idee mit dem Handy.',
      bild: ['nele:nervoes:rollstuhl', 'tom:froh:handy'], sprecher: { Nele: 'w3', Tom: 'm3', 'Frau Diallo': 'w1' },
      text: [
        ['Nele', 'Mein Herz klopft wie verrückt. Was ist, wenn ich die Schritte vergesse?'],
        ['Frau Diallo', 'Das ist Lampenfieber, Nele. Das ist ganz normal. Atme mit mir: vier Sekunden ein … und vier Sekunden aus.'],
        ['Nele', 'Okay … etwas besser.'],
        ['Frau Diallo', 'Und wenn du etwas vergisst: einfach weitermachen und auf die anderen schauen. Ihr seid ein Team.'],
        ['Tom', 'Ich filme unseren Auftritt und stelle ihn heute Abend online. Das wird der Hit!'],
        ['Frau Diallo', 'Moment, Tom. Hast du alle gefragt, ob sie gefilmt und gezeigt werden wollen?'],
        ['Tom', 'Äh … nein.'],
        ['Nele', 'Ich will nicht, dass ein Video von mir im Internet ist.'],
        ['Frau Diallo', 'Dann geht das so nicht. Die Schule filmt den Auftritt nur mit Erlaubnis, und das Video bleibt in der Klasse.'],
        ['Tom', 'Okay, verstanden. Dann tanze ich lieber mit, statt zu filmen.'],
      ],
      vor: [{ art: 'mc', auftrag: 'Was heißt „online stellen“? Kreuze an.', stufe: 1, fragen: [{ f: '', o: ['etwas ins Internet hochladen', 'etwas ausdrucken'], r: 0 }] }],
      beim: [
        { art: 'fragen', auftrag: 'Hör zu und antworte.', stufe: 1, fragen: [{ f: 'Was hilft Nele gegen das Lampenfieber?', zeilen: 2, l: 'ruhig atmen, vier Sekunden ein und vier Sekunden aus; bei Fehlern weitermachen und auf die anderen schauen' }, { f: 'Was will Tom machen?', l: 'den Auftritt filmen und online stellen' }, { f: 'Warum geht das nicht?', zeilen: 2, l: 'Er hat nicht alle gefragt. Nele will nicht, dass ein Video von ihr im Internet ist.' }, { f: 'Welche Lösung gibt es?', zeilen: 2, l: 'Die Schule filmt nur mit Erlaubnis, und das Video bleibt in der Klasse.' }] },
      ],
      nach: [{ art: 'sprechen', auftrag: 'Ein Video von jemandem ist ohne Erlaubnis online. Was kann man tun?', stufe: 3, karten: [
        { titel: 'Ideen', text: ['die Person bitten, es zu löschen', 'einer Lehrperson Bescheid sagen', 'das Video bei der Plattform melden', 'Hilfe: BEE SECURE Helpline 8002 1234'] }] }],
    },
    regel: {
      reihen: [
        [{ titel: 'Auftritt', punkte: ['Lampenfieber ist **normal**', '**ruhig atmen**: 4 ein, 4 aus', 'Fehler? **weitertanzen**'] },
         { titel: 'Fair und sicher', punkte: ['Feedback: **2 Sterne, 1 Wunsch**', 'über den **Tanz** reden, nicht über das Aussehen', 'filmen und posten nur mit **Erlaubnis**'] }],
      ],
    },
    ueben: [
      { art: 'tabelle', auftrag: 'Auftritts-Check: Was müssen wir vorher klären? Hakt ab.', stufe: 1, kopf: ['Frage', 'erledigt'], breiten: [80, 20], zeilen: [['Ist die Musik bereit und laut genug?', ''], ['Kennen alle die Anfangspose?', ''], ['Haben wir uns aufgewärmt?', ''], ['Ist der Platz frei und sicher?', ''], ['Sind alle einverstanden, wenn gefilmt wird?', '']] },
      { art: 'tabelle', auftrag: 'Auf- und Abbau in der Gruppe: Verteilt die Aufgaben selbst. Am Ende kontrolliert eine Person, ob alles wieder an seinem Platz ist.', stufe: 2, kopf: ['Aufgabe', 'Wer?', 'aufgebaut', 'abgebaut'], breiten: [46, 26, 14, 14], zeilen: [['Lautsprecher und Musik', '', '', ''], ['Bühne markieren (Hütchen, Klebeband)', '', '', ''], ['Bänke für das Publikum', '', '', ''], ['Licht und Türen', '', '', ''], ['Kontrolle: alles weggeräumt?', '', '', '']] },
      { art: 'tabelle', auftrag: 'Feedback-Bogen: Schau dir den Tanz einer anderen Gruppe an. Gib zwei Sterne und einen Wunsch.', stufe: 2, kopf: ['', 'Gruppe: …'], breiten: [36, 64], zeilen: [['Stern 1: Das war gut.', ''], ['Stern 2: Das war auch gut.', ''], ['Wunsch: Das könnt ihr noch verbessern.', '']] },
    ],
    schreiben: [
      { art: 'schreiben', auftrag: 'Mein Sport-Tagebuch: Wie war der Auftritt für dich? Wie hast du dich vorher und nachher gefühlt?', stufe: 2,
        anfaenge: ['Vor dem Auftritt …', 'Während des Tanzes …', 'Danach …', 'Das Feedback …'], zeilen: 6,
        beispiel: 'Vor dem Auftritt war ich sehr nervös, meine Hände waren ganz kalt. Während des Tanzes habe ich einmal einen Schritt vergessen, aber einfach weitergemacht. Danach war ich richtig stolz. Das Feedback der anderen Gruppe hat mich gefreut.' },
    ],
    check: ['Ich kenne Tipps gegen Lampenfieber.', 'Ich gebe Feedback mit zwei Sternen und einem Wunsch.', 'Ich filme und poste nur mit Erlaubnis.', 'Wir bauen in der Gruppe selbst auf und ab.'],
  },
]

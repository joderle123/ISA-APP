// REAL TALK #04 · GEDANKEN – Modul 4 (Meine Gedanken, Einheiten 16–19).
import type { Heft } from '../typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Heft = {
  id: 'm4', nr: '04', datei: 'Real-Talk-04-Gedanken',
  thema: 'Gedanken', headline: 'Glaub nicht alles, was du denkst.', farbe: '#B79CFF', stand: 'November 2026',
  cover: {
    bild: 'peep:ben:besorgt:gehen', sticker: 'Kein Schönreden',
    zeilen: ['Zwei blaue Haken, keine Antwort: Was dein Kopf daraus macht', 'Alte Sätze: Wer hat dir das eigentlich erzählt?', 'Du bist Detektiv – ein Gefühl ist kein Beweis', 'Neuer Satz, neue Beweise: sieben Tage Test'],
  },
  ansage: {
    text: [
      'Dein Kopf redet den ganzen Tag mit dir. Meistens merkst du es nicht mal.',
      'Manche Sätze darin sind so alt, dass du sie für Tatsachen hältst: **Ich bin dumm. Mich mag eh keiner. Aus mir wird nichts.** Irgendwer hat sie mal gesagt – oder du hast sie dir selbst zusammengereimt. Seitdem laufen sie in Dauerschleife und bestimmen, was du dich traust.',
      'In diesem Heft bist du Detektiv. Du nimmst so einen Satz fest, prüfst die Beweise – und entscheidest, ob er bleiben darf.',
    ],
    zitat: 'Glaub nicht alles, ==was du denkst.==',
    so: [['Szene', 'Eine kurze Geschichte. Lies sie und sag, was du siehst.'], ['Fakten + Clip', 'Drei Dinge, die dahinterstecken. Dazu ein Video per QR-Code.'], ['Mythos / Real', 'Was alle sagen – und was stimmt.'], ['Dein Move', 'Jetzt du: ermitteln, prüfen, einen neuen Satz bauen.']],
    regeln: [
      '**Eigene Sätze bleiben privat.** Ermittelt wird an erfundenen Leuten.',
      '**Keiner kommentiert, was ein anderer über sich denkt.**',
      '**Kein Schönreden.** Ein neuer Satz muss stimmen – sonst glaubt ihn dein Kopf nicht.',
    ],
  },
  cast: [
    { bild: 'peep:ben:besorgt', name: 'Ben, 15', x: 'Liest jede Nachricht dreimal. Findet immer das Schlimmste.' },
    { bild: 'peep:lea:traurig', name: 'Lea, 16', x: 'Trägt seit der Grundschule einen Satz mit sich: „Ich bin zu viel.“' },
    { bild: 'peep:lio:traurig', name: 'Lio, 14', x: 'Sagt „Ich bin halt dumm“, bevor es ein anderer sagen kann.' },
    { bild: 'peep:mia:nervoes', name: 'Mia, 16', x: 'Hat einen inneren Kritiker, der nie Feierabend macht.' },
  ],
  warm: {
    titel: 'Soundcheck', text: 'Zwei schnelle Fragen. Kein Richtig, kein Falsch.',
    fragen: [
      { f: 'Welche Sätze hast du schon gehört – von anderen oder von dir? Kreise ein:', kreis: ['Das schaffst du eh nicht.', 'Stell dich nicht so an.', 'Du bist zu laut.', 'Du bist faul.', 'Aus dir wird nichts.', 'Du kannst das.', 'Auf dich ist Verlass.'] },
      { f: 'Wie laut ist dein innerer Kritiker heute?', regler: ['Lautstärke'] },
    ],
  },
  tracks: [
    {
      nr: 16, titel: 'Film im Kopf', unter: 'Nicht was passiert, macht dich fertig – sondern was du darüber denkst',
      kurz: 'Gleiche Situation, anderer Gedanke, anderer Abend.',
      szene: {
        bild: 'peep:ben:besorgt:handy', name: 'Ben, 15',
        text: 'Ben schreibt Mila: „Bock auf Kino?“ Zwei blaue Haken. Keine Antwort. Nach zehn Minuten weiß Ben: Sie hat keinen Bock mehr auf ihn. Nach zwanzig: Sie lacht gerade mit ihren Freundinnen über die Nachricht. Nach dreißig löscht er den Chat. Um halb neun schreibt Mila: „Sorry, war beim Training. Klar, wann?“ Ben antwortet nicht mehr.',
        frage: 'Was hat Ben den Abend versaut – Mila oder sein Film?',
      },
      fakten: [
        { t: 'Dazwischen sitzt ein Gedanke', x: 'Zwischen dem, was passiert, und dem, was du fühlst, sitzt ein **Gedanke**. Der entscheidet.' },
        { t: 'Gedanke – Gefühl – Tun', x: '„Sie hat keinen Bock“ → gekränkt → Chat löschen. „Sie ist beim Training“ → gelassen → abwarten.' },
        { t: 'Glaubenssätze', x: 'Sätze über dich selbst, die immer wieder laufen. Manche **helfen**. Manche **bremsen**.' },
      ],
      clip: { titel: 'Was sind Glaubenssätze und wo habe ich die her?', kanal: 'LitLounge · Stefanie Stahl', url: YT + '_QBYhQa29DI', dauer: 'die ersten 5 Min.', frage: 'Woher kommen laut Video die meisten Sätze, die wir über uns glauben?' },
      mythen: [
        ['Die Situation macht mich wütend.', 'Dein Gedanke über die Situation macht dich wütend. Den kannst du prüfen.'],
        ['Wenn ich es denke, stimmt es auch.', 'Dein Kopf rät ständig. Besonders gern das Schlimmste.'],
        ['Positiv denken löst alles.', 'Schönreden hilft nicht. Es geht um Gedanken, die stimmen und dich nicht runterziehen.'],
      ],
      merk: 'Erst der Gedanke. ==Dann das Gefühl.==',
      moveUnter: 'Dreh den Film neu',
      moves: [
        {
          titel: 'Drei Filme für Ben', wie: 'zu zweit', zeit: '8 Min.',
          kontext: 'Gelesen, keine Antwort. Jeder Gedanke macht einen anderen Abend.',
          fragen: [{ f: 'Füll die Tabelle aus. Den dritten Gedanken erfindest du:', preis: { erste: 'Bens Gedanke', kopf: ['Gefühl', 'Was Ben tut'], optionen: ['„Sie hat keinen Bock mehr auf mich.“', '„Sie ist sicher beim Training.“', 'Dein dritter Gedanke:'] } }],
        },
        {
          titel: 'Hilft oder bremst?', wie: 'allein', zeit: '5 Min.',
          fragen: [{ f: 'Kreuze an:', raster: { spalten: ['hilft', 'kommt drauf an', 'bremst'], zeilen: ['„Wenn ich übe, werde ich besser.“', '„Ich muss perfekt sein.“', '„Die anderen sind besser als ich.“', '„Auf mich kann man sich verlassen.“', '„Ich darf keine Schwäche zeigen.“', '„Fehler gehören dazu.“'] } }],
        },
      ],
      challenge: { titel: 'Kopfkino live', wie: 'zwei Teams', x: 'Ein Paar zieht eine Situation mit zwei Gedanken, wählt heimlich A oder B und spielt 20 Sekunden – ohne den Gedanken zu sagen. **Das andere Team rät: Welcher Film lief?**' },
      line: { titel: 'Dauerschleife', x: 'Ein Gedanke, der dir diese Woche die Laune verdorben hat. Niemand liest ihn.', linien: 1 },
      woche: 'Fang einen Gedanken, der dir die Laune verdirbt. Such einen **zweiten**, der auch stimmen könnte.',
      gruppe: [
        { titel: 'Ein Schritt – blind', wer: 'alle', zeit: '10 Min.', material: 'eine Linie am Boden, Liste mit Sätzen', schritte: ['Alle stehen auf der Linie. Augen zu oder Blick auf den Boden.', 'Die Leitung liest Sätze: „Das schaffe ich eh nicht.“ – „Wenn ich übe, werde ich besser.“ Kennst du den Satz von dir? Ein Schritt vor, kurz stehen, zurück.', '**Niemand schaut. Niemand kommentiert.**'], frage: 'Wie war es, den Schritt zu machen, ohne dass es einer sieht?' },
        { titel: 'Sortier-Duell', wer: 'zwei Teams', zeit: '18 Min.', material: 'Glaubenssatz-Karten, drei Felder: Hilft, Kommt drauf an, Bremst', schritte: ['Staffel: Eine Person pro Team läuft mit einer Karte los und legt sie auf ein Feld.', 'Das andere Team darf „Einspruch!“ rufen. Dann muss begründet werden.', 'Punkte gibt es für jede Karte, die nach der Diskussion liegen bleibt.'], level2: 'Eigene Sätze aus Songs oder Serien auf leere Karten schreiben.', frage: 'Welcher Satz lag am Ende bei „Kommt drauf an“ – und worauf?' },
      ],
      leitung: {
        einsatz: 'Szene als Einstieg oder nach dem Spiel „Kopfkino“ (Challenge). Move A ersetzt das Blatt „Drei Filme für Ben“. Move B bereitet das Sortier-Duell vor. Die Line ist privat.',
        loesungen: [
          'Szene: sein Film. Die Situation (gelesen, keine Antwort) war harmlos; der Gedanke hat Gefühl und Verhalten bestimmt.',
          'Move A: Film 1 – gekränkt, traurig – schreibt nicht mehr, mies drauf. Film 2 – gelassen, etwas ungeduldig – macht etwas anderes, fragt morgen. Der dritte Gedanke ist frei, z. B. „Akku leer“.',
          'Move B: hilft – Satz 1, 4, 6 · bremst – Satz 2, 3, 5. „Kommt drauf an“ gilt, wenn es begründet wird.',
        ],
        impulse: ['Wann hat euer Kopf zuletzt das Schlimmste geraten – und lag daneben?', 'Woher kommen Sätze wie „Ich bin unsportlich“?'],
        material: 'Kopfkino-Karten, Glaubenssatz-Karten, drei Legekarten, Kreppband', blaetter: 'Gefühlsrad, Kopfkino-Karten, „Gedanke – Gefühl – Verhalten“, Glaubenssatz-Karten, Skills-Pass.',
      },
    },
    {
      nr: 17, titel: 'Alte Sätze', unter: 'Irgendwann hat jemand etwas über dich gesagt. Und du hast es behalten',
      kurz: 'Woher deine Sätze über dich kommen – und was sie kosten.',
      szene: {
        bild: 'peep:lea:traurig', name: 'Lea, 16',
        text: 'Vierte Klasse. Lea erzählt beim Abendessen von ihrem Tag, laut, mit Händen und Füßen. Ihr Stiefvater sagt: „Kannst du einmal nicht so viel sein?“ Ein Satz, drei Sekunden. Heute ist Lea sechzehn. Wenn sie lacht, hält sie die Hand vor den Mund. Wenn sie etwas erzählen will, sagt sie: „Ach, egal.“ Der Stiefvater ist längst ausgezogen. Der Satz wohnt noch da.',
        frage: 'Wie heißt der Satz, der bei Lea eingezogen ist?',
      },
      fakten: [
        { t: 'Sätze haben eine Herkunft', x: 'Ein Spruch, ein Blick, eine Blamage. **Einmal reicht** manchmal, und der Satz bleibt.' },
        { t: 'Der Kopf sammelt Beweise', x: 'Hast du so einen Satz, siehst du nur noch, was dazu passt. Der Rest fällt durch.' },
        { t: 'Du bist nicht allein', x: '„Ich bin nicht gut genug.“ „Mich mag keiner.“ Diese Sätze kennen **fast alle**.' },
      ],
      clip: { titel: 'Impostor-Syndrom: Warum wir uns manchmal als Hochstapler fühlen', kanal: 'Quarks Dimension Ralph', url: YT + '8sPRWUwsmfk', dauer: 'die ersten 5 Min.', frage: 'Warum glauben sogar Leute mit Erfolg, sie seien nicht gut genug?' },
      mythen: [
        ['So bin ich eben.', 'So hast du es gelernt. Was gelernt ist, kann man umlernen.'],
        ['Wenn es jemand Wichtiges gesagt hat, stimmt es.', 'Auch wichtige Leute sagen im Stress Sätze, die nicht stimmen.'],
        ['Nur ich denke so über mich.', 'Fast jeder im Raum kennt denselben Satz. Die Bohnen-Wette zeigt es.'],
      ],
      merk: 'Der Satz ist ==gelernt.== Nicht angeboren.',
      moveUnter: 'Ermitteln, was dahintersteckt',
      moves: [
        {
          titel: 'Fahndung', wie: 'zu zweit', zeit: '8 Min.',
          kontext: '**A** Ich bin nicht gut genug. · **B** Mich mag eh keiner. · **C** Ich darf keine Fehler machen. · **D** Ich muss stark sein.',
          fragen: [{ f: 'Welcher Satz steckt hinter dem Verhalten?', raster: { spalten: ['A', 'B', 'C', 'D'], zeilen: ['Tom meldet sich nie, obwohl er die Antwort weiß.', 'Jana sagt jede Einladung ab: „Hab eh keine Zeit.“', 'Sami radiert, bis das Blatt reißt.', 'Finn lacht, wenn er sich wehgetan hat.'] } }],
        },
        {
          titel: 'Der Satz und sein Preis', wie: 'allein', zeit: '6 Min.',
          kontext: 'Lea denkt: „Ich bin zu viel.“ Jeder Satz kostet etwas – und schützt manchmal auch.',
          fragen: [
            { f: 'Mach die Rechnung auf:', satz: ['Der Satz kostet Lea:', 'Der Satz schützt Lea vor:'] },
            { f: 'Was würdest du Lea sagen, wenn sie deine Freundin wäre?', linien: 1 },
          ],
        },
      ],
      challenge: { titel: 'Bohnen-Wette', wie: 'alle', x: 'Zwölf Sätze liegen aus, neben jedem ein Becher. Wettet zu zweit: Welche drei kennen die meisten? Dann wirft jeder verdeckt Bohnen in die Becher der Sätze, die er kennt. **Auszählen.**' },
      line: { titel: 'Wie ein Freund', x: 'Dein bester Freund denkt so über sich wie du manchmal über dich. Was sagst du ihm?', linien: 1 },
      woche: 'Spurensuche: Wo begegnet dir ein Glaubenssatz – in einem Song, einer Serie, einem Gespräch? **Merk dir einen.**',
      hilfe: true,
      gruppe: [
        { titel: 'Freundes-Battle', wer: 'zwei Teams', zeit: '10 Min.', material: 'Zettel, Stifte, Stoppuhr', schritte: ['Die Leitung liest eine erfundene Figur und ihren Satz vor: „Tom denkt: Ich bin dumm.“', 'Jedes Team schreibt in 60 Sekunden so viele Sätze wie möglich, die ein guter Freund jetzt sagen würde.', 'Vorlesen. Punkte gibt es nur für Sätze, die man **glauben** kann.'], frage: 'Warum sind wir zu Freunden netter als zu uns selbst?' },
        { titel: 'Dankbarkeits-Blitz', wer: 'alle', zeit: '5 Min.', material: 'Stuhlkreis', schritte: ['Drei Runden Bauch-Atem: Hand auf den Bauch, lang ausatmen.', 'Reihum, ohne nachzudenken: eine Sache von heute, die okay war. Klein reicht – der Bus kam pünktlich.', 'Zweite Runde: eine Person, die heute okay zu dir war.'], frage: 'Was findet euer Kopf schneller – das Schlechte oder das Gute?' },
      ],
      leitung: {
        einsatz: 'Szene nach der Figuren-Fahndung (Move A). Die persönliche Arbeit („Meine Glaubenssätze“) bleibt auf dem Kursblatt im Umschlag – ins Heft kommt nur Erfundenes. Move B vor „Was würde eine Freundin sagen?“ (bei den Sessions als Freundes-Battle). Die Challenge ist die Bohnen-Wette.',
        loesungen: [
          'Szene: „Ich bin zu viel.“ Ein Satz aus drei Sekunden, der seit Jahren Verhalten steuert (Hand vor dem Mund, „ach, egal“).',
          'Move A: Tom – A · Jana – B · Sami – C · Finn – D. Andere Zuordnungen gelten, wenn sie begründet sind.',
          'Move B: Der Satz kostet Lea Nähe, Freude, ihre Stimme. Er schützt sie davor, noch einmal so abgewiesen zu werden. Diese Schutzfunktion anzuerkennen macht das Loslassen leichter.',
        ],
        impulse: ['Welche Sätze über Jugendliche hört ihr ständig – von Erwachsenen, im Netz?', 'Was macht es mit euch, dass so viele Bohnen im selben Becher lagen?'],
        material: 'Figuren-Karten, zwölf Glaubenssatz-Karten, Becher, Bohnen, Umschläge', blaetter: 'Gefühlsrad, Figuren-Karten, „Meine Glaubenssätze“ (privat, im Umschlag), Skills-Pass.',
      },
    },
    {
      nr: 18, titel: 'Beweise, bitte', unter: 'Nimm den Satz fest. Prüf, was wirklich für ihn spricht – und was dagegen',
      kurz: 'Du bist Detektiv: Was spricht wirklich für den Satz?',
      szene: {
        bild: 'peep:lio:traurig', name: 'Lio, 14',
        text: 'Lio bekommt den Mathetest zurück: 22 von 60. „War ja klar. Ich bin halt dumm.“ Sein Sitznachbar sagt: „Letztes Mal hattest du 15.“ Lio zuckt die Schultern. Dass er jedes Moped im Viertel wieder zum Laufen kriegt, zählt für ihn nicht. Dass er im Praktikum allein an die Kasse durfte, auch nicht. Sein Kopf lässt nur rein, was zum Satz passt.',
        frage: 'Welche Beweise lässt Lios Kopf nicht rein?',
      },
      fakten: [
        { t: 'Beweis oder Gefühl?', x: '„Ich fühle mich dumm“ ist **kein Beweis**. Ein Spruch vom Cousin auch nicht. Es zählt, was man sehen oder zählen kann.' },
        { t: 'Beide Seiten', x: 'Ein guter Detektiv sammelt **dafür und dagegen**. Dein Kopf sammelt freiwillig nur dafür.' },
        { t: 'Der neue Satz', x: 'Nicht „Ich bin der Beste“. Sondern **wahr, aktiv, im Jetzt**: „Mathe fällt mir schwer. Wenn ich frage, wird es besser.“' },
      ],
      clip: { titel: 'So fällst du nie wieder auf Scheinargumente rein', kanal: 'Quarks Dimension Ralph', url: YT + '9USIhOR78Do', dauer: 'die ersten 5 Min.', frage: 'Welches Scheinargument benutzt dein eigener Kopf am liebsten gegen dich?' },
      mythen: [
        ['Ein neuer Satz muss positiv klingen.', 'Er muss stimmen. „Ich bin perfekt“ glaubt dir dein Kopf keine Sekunde.'],
        ['Gibt es Beweise dafür, ist der Satz wahr.', '22 Punkte beweisen einen schlechten Test. Nicht einen dummen Menschen.'],
        ['Wer hart zu sich ist, wird besser.', 'Wer sich fertigmacht, traut sich weniger. Freundlich und streng geht zusammen.'],
      ],
      merk: 'Ein Gefühl ist ==kein Beweis.==',
      moveUnter: 'Ermitteln wie ein Profi',
      moves: [
        {
          titel: 'Die Akte Lio', wie: 'zu zweit', zeit: '8 Min.',
          kontext: 'Lios Satz: „Ich bin dumm.“',
          fragen: [
            { f: 'Sortiere die Hinweise:', raster: { spalten: ['dafür', 'dagegen', 'kein Beweis'], zeilen: ['22 von 60 Punkten im Mathetest', 'Im Test davor waren es 15.', 'Er fühlt sich dumm, wenn er aufgerufen wird.', 'Er repariert jedes Moped im Viertel.', 'Sein Cousin sagt: „Du checkst nichts.“', 'Im Praktikum durfte er allein an die Kasse.'] } },
            { f: 'Dein Urteil: Stimmt der Satz?', kreis: ['ja', 'nein', 'zu grob – so stimmt er nicht'] },
          ],
        },
        {
          titel: 'Prüfstand', wie: 'allein', zeit: '6 Min.',
          kontext: 'Ein neuer Satz muss **wahr** sein, sagen, was du **tust**, und im **Jetzt** stehen.',
          fragen: [{ f: 'Besteht der Satz?', raster: { spalten: ['besteht', 'fällt durch'], zeilen: ['„Ich bin der Beste in Mathe.“', '„Ich frage nach, wenn ich etwas nicht verstehe.“', '„Ich bin nicht mehr so dumm.“', '„Manches fällt mir schwer, anderes kann ich gut.“', '„Irgendwann kann ich es schon.“', '„Ich probiere es. Fehler sind okay.“'] } }],
        },
      ],
      challenge: { titel: 'Gedanken-Stopp', wie: 'zwei Teams', x: 'Die Leitung liest einen bremsenden Satz vor. Alle rufen „Stopp!“ Welches Team ruft zuerst einen neuen Satz, der **den Prüfstand besteht**?' },
      line: { titel: 'Mein neuer Satz', x: 'Wahr. Aktiv. Im Jetzt. Schreib ihn auch auf die Karte (Seite {K}).', linien: 1 },
      woche: 'Trag deine Karte bei dir. Meldet sich der alte Satz: **Stopp denken, Karte lesen.** Einmal reicht.',
      gruppe: [
        { titel: 'Tatort', wer: 'zu zweit oder dritt', zeit: '15 Min.', material: 'zwölf Hinweise an den Wänden, Zettel', schritte: ['Im Raum hängen zwölf Hinweise zu einem erfundenen Fall: Jemand sagt über sich „Ich bin dumm“.', 'Geht von Hinweis zu Hinweis und notiert: **D** dafür · **G** dagegen · **K** kein Beweis.', 'Fünf Minuten. Dann legen alle Teams ihre Ergebnisse nebeneinander.'], frage: 'Welcher Hinweis sah aus wie ein Beweis – und war keiner?' },
        { titel: 'Die freundliche Stimme', wer: 'alle', zeit: '5 Min.', material: 'Stuhlkreis', schritte: ['Sitzen, Augen zu oder Blick auf den Boden. Wer mag, legt eine Hand auf die Brust.', 'Die Leitung spricht langsam: „Das ist gerade schwer.“ – „So geht es vielen.“ – „Was brauche ich jetzt?“', 'Sprich die Sätze innerlich nach – in dem Ton, in dem du mit einem Freund redest.'], frage: 'Wie redet ihr sonst mit euch, wenn etwas schiefgeht?' },
      ],
      leitung: {
        einsatz: 'Szene vor dem „Fall Tiago“ (bei den Sessions als „Tatort“). Move A ist die Kurzfassung des Falls im Heft. Die Arbeit am eigenen Satz („Mein Fall“) bleibt auf dem Detektivblatt im Umschlag. Move B ist der Prüfstand. Die Line ist der neue Satz; die Karte dazu steht auf Seite {K}.',
        loesungen: [
          'Szene: die Steigerung von 15 auf 22, das Moped, die Kasse im Praktikum.',
          'Move A: dafür – 22 Punkte · dagegen – davor 15 (also besser geworden), Moped, Kasse · kein Beweis – fühlt sich dumm, Spruch des Cousins. Urteil: zu grob.',
          'Move B: besteht – Satz 2, 4, 6 · fällt durch – 1 (nicht wahr), 3 (sagt, was ich nicht bin), 5 (nicht im Jetzt).',
        ],
        impulse: ['Bei welchem Satz würde ein Detektiv sagen: zu wenig Beweise?', 'Was, wenn ein Satz einen wahren Kern hat?'],
        material: 'Fallakte-Karten (zwölf Hinweise), Plakat mit den Regeln, Kärtchen', blaetter: 'Gefühlsrad, Fallakte-Karten, „Der kritische Detektiv“ (privat), Glaubenssatz-Karten, Skills-Pass.',
      },
    },
    {
      nr: 19, titel: 'Neuer Satz, neuer Tag', unter: 'Ein neuer Gedanke ist wie ein neuer Schuh. Man muss ihn einlaufen',
      kurz: 'Den neuen Satz ausprobieren – und Beweise sammeln.',
      szene: {
        bild: 'peep:mia:nervoes', name: 'Mia, 16',
        text: 'Mia hat einen neuen Satz: „Meine Idee zählt genauso.“ Montag, Gruppenrunde. Ihr Herz klopft. Der alte Satz brüllt: „Halt die Klappe, das interessiert keinen.“ Sie sagt ihre Idee trotzdem. Leise, zu schnell. Zwei nicken. Einer sagt: „Gar nicht blöd.“ Kein Applaus, keine Musik. Aber am Abend macht Mia einen Strich auf ihrem Zettel. Beweis Nummer eins.',
        frage: 'Warum zählt dieser kleine Moment so viel?',
      },
      fakten: [
        { t: 'Denken reicht nicht', x: 'Einen neuen Satz glaubst du erst, wenn du ihn **erlebt** hast. Darum: ausprobieren.' },
        { t: 'Klein anfangen', x: 'Nicht die große Rede. Eine Frage stellen. Einmal Nein sagen. **Ein Beweis pro Tag.**' },
        { t: 'Der alte Satz meldet sich', x: 'Er verschwindet nicht über Nacht. Er wird **leiser**, je mehr Beweise der neue hat.' },
      ],
      clip: { titel: 'Growth Mindset vs. Fixed Mindset – zwei Denkweisen', kanal: 'Sprouts Deutschland', url: YT + 'I79fZFvz9JA', dauer: 'ganz schauen', frage: 'Bei welchem Thema denkst du „kann ich halt nicht“ – und was wäre der andere Satz?' },
      mythen: [
        ['Kommt der alte Satz wieder, hat es nicht geklappt.', 'Er kommt wieder. Entscheidend ist, wem du diesmal glaubst.'],
        ['Erst muss ich mich sicher fühlen, dann traue ich mich.', 'Umgekehrt. Erst trauen – das sichere Gefühl kommt hinterher.'],
        ['Mut heißt: keine Angst haben.', 'Mut heißt: Herzklopfen haben und es trotzdem tun.'],
      ],
      merk: 'Erst trauen. ==Das Gefühl kommt nach.==',
      moveUnter: 'Raus aus dem Kopf, rein ins Tun',
      moves: [
        {
          titel: 'Alter Satz, neuer Satz', wie: 'zu dritt', zeit: '10 Min.',
          kontext: 'Würfelt eine Szene. Spielt sie zweimal: Eine Person steht daneben und spricht die innere Stimme – erst den alten Satz, dann den neuen.',
          fragen: [
            { f: 'Unsere Szene:', kreis: ['1 an die Tafel', '2 neue Gruppe', '3 Test zurück', '4 Vorschlag machen', '5 Nein sagen', '6 Kundin ansprechen'] },
            { f: 'Was war beim zweiten Mal anders?', kreuz: ['Haltung', 'Stimme', 'Blick', 'das Ende der Szene'] },
          ],
        },
        {
          titel: 'Mein Wenn-dann', wie: 'allein', zeit: '6 Min.',
          kontext: 'Ein Plan schlägt jeden Vorsatz.',
          fragen: [
            { f: 'Für die nächste Woche:', satz: ['Mein neuer Satz:', 'Wenn (Situation):', 'dann (was ich tue):'] },
            { f: 'Wie sehr glaubst du deinen neuen Satz?', regler: ['heute', 'in 7 Tagen'] },
          ],
        },
      ],
      challenge: { titel: 'Sofort-Beweise', wie: 'zu dritt · Würfel', x: 'Würfle eine Mini-Mutprobe: **1** freundlich Nein sagen · **2** etwas fragen, das du nicht weißt · **3** in einer Fremdsprache von zehn rückwärts zählen · **4** einen Vorschlag machen · **5** um Hilfe bitten · **6** mit der anderen Hand schreiben.' },
      line: { titel: 'Beweis-Liste', x: 'Sieben Tage. Jeden Tag ein kleiner Beweis für deinen neuen Satz.', kaestchen: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] },
      woche: 'Beweis-Challenge: **Jeden Tag ein kleiner Beweis**, dass dein neuer Satz stimmt. Ankreuzen.',
      gruppe: [
        { titel: 'Gang-Raten', wer: 'zwei Teams', zeit: '10 Min.', material: 'Glaubenssatz-Karten, freier Laufsteg', schritte: ['In der Mitte bleibt ein Laufsteg frei. Eine Person zieht verdeckt einen Satz – bremsend oder hilfreich.', 'Sie läuft den Laufsteg entlang, so, als liefe der Satz in ihrem Kopf. Kein Wort.', 'Das eigene Team rät: bremst oder hilft? Welcher Satz könnte es sein?'], level2: 'Zweimal laufen: einmal mit altem, einmal mit neuem Satz.', frage: 'Woran sieht man einem Menschen an, was er über sich denkt?' },
        { titel: 'Satz-Baum', wer: 'alle', zeit: '13 Min.', material: 'Plakat mit Baum, Karten, Kleber', schritte: ['An der Wand hängt ein Baum. Bremsende Sätze kommen unten in die Erde, hilfreiche in die Krone.', 'Jeder klebt zwei, drei Karten. Wer mag, schreibt seinen neuen Satz auf ein Blatt in die Krone – ohne Namen.', 'Einen Schritt zurück: Was wächst da?'], frage: 'Welcher Satz aus der Krone könnte auch eurer sein?' },
      ],
      leitung: {
        einsatz: 'Szene als Einstieg nach dem Gang-Raten. Move A begleitet die Rollenspiele (Szenen-Tabelle der Einheit). Move B ersetzt oder ergänzt „Meine Beweis-Challenge“. Die Challenge ist das Würfelspiel „Sofort-Beweise“. Die Line (sieben Kästchen) wird in der nächsten Einheit angeschaut.',
        loesungen: [
          'Szene: Der neue Satz hat seinen ersten erlebten Beweis – gegen den lauten alten Satz. Selbstwirksamkeit entsteht durch Tun, nicht durch Einsicht.',
          'Move A: Mit dem neuen Satz ändern sich meist Haltung, Stimme und Blick – und oft das Ende der Szene.',
          'Move B: Gute Wenn-dann-Pläne sind konkret: „Wenn ich etwas nicht verstehe, dann hebe ich die Hand und frage einmal nach.“',
        ],
        impulse: ['Was war eure kleinste Mutprobe diese Woche?', 'Wer oder was hilft euch, wenn der alte Satz wieder laut wird?'],
        material: 'Glaubenssatz-Karten, Würfel, Bohnen, Baum-Plakat', blaetter: 'Gefühlsrad, Glaubenssatz-Karten, „Baum der Stärke“, „Meine Beweis-Challenge“, Skills-Pass.',
      },
    },
  ],
  kino: {
    geprueft: '14.11.2026',
    filme: [
      { titel: 'Good Will Hunting', jahr: 1997, fsk: 12, laenge: '126 Min.', worum: 'Will, 20, wischt Flure an einer Elite-Uni – und löst nachts heimlich die Mathe-Aufgaben an der Tafel, an denen die Studenten scheitern. Nach einer Schlägerei muss er wählen: Knast oder Therapie. Er nimmt die Therapie. Und macht jeden Therapeuten fertig. Bis auf einen.', achte: ['Welchen Satz trägt Will über sich herum?', 'Wie hält er Leute auf Abstand, die ihn mögen?', 'Was passiert bei „Es ist nicht deine Schuld“?'], achtung: 'Derbe Sprache, eine Schlägerei; Gewalt in Wills Kindheit wird angesprochen. Lang – eventuell an zwei Terminen.' },
      { titel: 'Eddie the Eagle', jahr: 2016, fsk: 0, laenge: '105 Min.', worum: 'Alle sagen Eddie: Du bist kein Sportler. Also sucht er sich die Sportart, in der England keinen einzigen Konkurrenten hat: Skispringen. Nach einer wahren Geschichte.', achte: ['Welche Sätze hört Eddie – und welchen glaubt er?', 'Welche Beweise sammelt er, Sprung für Sprung?'], achtung: 'Ein Trainer mit Alkoholproblem.' },
    ],
    bingo: ['Will macht einen Witz, um abzulenken', 'Jemand sagt Will, was er kann', 'Will stößt jemanden weg, der ihn mag', 'Ein alter Satz wird sichtbar', 'Den Satz kenne ich', 'Jemand bleibt, obwohl Will ihn testet', 'Ein Beweis gegen den alten Satz', 'Will traut sich etwas Neues', 'Schweigen sagt mehr als Reden'],
    nachher: ['Welcher Satz steuert Will – und wer hat ihn ihm beigebracht?', 'Warum reicht „klug sein“ für Will nicht als Beweis, dass er etwas wert ist?', 'Was macht Sean anders als alle Therapeuten vor ihm?'],
  },
  hot: {
    unter: 'Sechs Sätze zum Streiten – nach Regeln',
    regeln: 'Mach auf jeder Linie ein Kreuz: Wie sehr stimmt der Satz für dich? Dann stellt euch im Raum auf – eine Wand heißt „nie“, die andere „immer“. Wer mag, sagt einen Satz dazu. **Niemand muss sich rechtfertigen. Platz wechseln ist erlaubt.**',
    takes: ['Wer oft genug hört, dass er nichts kann, kann irgendwann nichts.', 'Manche Menschen ändern sich nie.', 'Wer nett zu sich selbst ist, wird faul.', 'Was andere über mich denken, ist mir egal.', 'Fehler sind peinlich.', 'Was Eltern über einen sagen, wird man nie los.'],
  },
  quiz: {
    unter: 'Acht Fragen. Acht Buchstaben. Ein Beruf.', wort: 'DETEKTIV',
    fragen: [
      { f: 'Was sitzt zwischen Situation und Gefühl?', o: ['ein Gedanke', 'der Zufall', 'nichts'], r: 0 },
      { f: 'Ein Glaubenssatz ist …', o: ['ein Gesetz', 'ein Satz über dich, der immer wieder läuft', 'ein Sprichwort'], r: 1 },
      { f: 'Woher kommen bremsende Sätze oft?', o: ['aus den Genen', 'vom Wetter', 'aus einem Spruch oder einer Blamage'], r: 2 },
      { f: '„Ich fühle mich dumm.“ Das ist …', o: ['ein Gefühl, kein Beweis', 'ein Beweis', 'ein neuer Satz'], r: 0 },
      { f: 'Was sammelt ein guter Detektiv?', o: ['nur Beweise dafür', 'Beweise dafür und dagegen', 'Gerüchte'], r: 1 },
      { f: 'Welcher neue Satz besteht den Prüfstand?', o: ['„Ich bin der Beste.“', '„Irgendwann kann ich es.“', '„Ich probiere es. Fehler sind okay.“'], r: 2 },
      { f: 'Wann glaubt dein Kopf einen neuen Satz?', o: ['wenn du ihn erlebt hast', 'wenn du ihn 100-mal aufsagst', 'nie'], r: 0 },
      { f: 'Mut heißt:', o: ['keine Angst haben', 'es trotz Herzklopfen tun', 'laut sein'], r: 1 },
    ],
  },
  karten: [
    { titel: 'Mein neuer Satz', icon: 'pencil', zeilen: ['Wahr. Aktiv. Im Jetzt.', '_', '_'], eigen: 'Beweis Nr. 1:' },
    { titel: 'Gedanken-Check', icon: 'search', zeilen: ['Was ist **wirklich** passiert? (wie eine Kamera)', 'Was denke ich darüber?', 'Welcher zweite Gedanke könnte auch stimmen?'] },
    { titel: 'Beweis oder nicht?', icon: 'scale', zeilen: ['**Beweis:** was man sehen oder zählen kann.', '**Kein Beweis:** ein Gefühl, ein Spruch, eine Vermutung.', 'Immer beide Seiten sammeln.'] },
    { titel: 'Prüfstand', icon: 'checklist', zeilen: ['Ist der Satz wahr?', 'Sagt er, was ich **tue**?', 'Steht er im Jetzt?', 'Lässt er Platz zum Besserwerden?'] },
    { titel: 'Freundliche Stimme', icon: 'heart-handshake', zeilen: ['„Das ist gerade schwer.“', '„So geht es vielen.“', '„Was brauche ich jetzt?“'] },
    { titel: 'Gedanken-Stopp', icon: 'hand-stop', zeilen: ['Der alte Satz meldet sich?', 'Innerlich: **Stopp.**', 'Karte lesen. Lang ausatmen. Weiter.'] },
  ],
  abspann: {
    posten: ['Gedanken einfangen', 'Zweiten Gedanken finden', 'Beweise prüfen', 'Neuen Satz bauen', 'Beweise sammeln'],
    saetze: ['Mein neuer Satz:', 'Das war Quatsch:', 'Das soll im Kurs anders werden:'],
  },
  leitung: {
    fakten: [['Zielgruppe', '12–16 Jahre, 4–8 Jugendliche'], ['Dauer', '4 Einheiten à 100 Min. (E16–E19)'], ['Sozialform', 'allein, zu zweit, Teams'], ['Material', 'Stifte, Würfel, Karten, Bohnen, Schere']],
    wozu: 'REAL TALK ist das Heft der Jugendlichen zu Modul 4 – gemacht wie ein Magazin, nicht wie ein Arbeitsblatt. Wichtig bei dieser Ausgabe: Im Heft wird nur an erfundenen Figuren gearbeitet. Die eigenen Glaubenssätze bleiben auf den Kursblättern im Umschlag. Das Heft liefert Szenen, Fakten, Videos, Aufgaben und die Gruppen-Aktionen in Kurzform.',
    lernziele: [
      'Die Jugendlichen beschreiben, wie ein Gedanke Gefühl und Verhalten bestimmt, und finden zu einer Situation einen zweiten Gedanken.',
      'Sie erkennen bremsende und hilfreiche Glaubenssätze und wissen, dass solche Sätze gelernt sind.',
      'Sie unterscheiden Beweise von Gefühlen und Sprüchen und prüfen einen Satz von beiden Seiten.',
      'Sie formulieren einen neuen Satz, der wahr, aktiv und gegenwärtig ist, und sammeln im Alltag Beweise dafür.',
    ],
    start: 'Titel, Ansage (vorlesen – der Ton ist Absicht), Tracklist und Soundcheck. Etwa 10 Minuten, z. B. in der Brücke von Einheit 16.',
    schluss: 'Kino als eigener Termin (der Hauptfilm ist lang). Hot Takes im Stehen (15 Min.), „Knack den Code“ als Wiederholung, Karten ausschneiden – „Mein neuer Satz“ zuerst –, Abspann in der Abschlussrunde von Einheit 19.',
    hilfe: ['Szene und Fakten vorlesen oder reihum lesen lassen.', 'Beim Sortieren (Akte, Prüfstand) zu zweit arbeiten lassen.', 'Neue Sätze aus den Beispielen des Prüfstands auswählen lassen, statt sie selbst zu bauen.', 'Wer nicht schreiben mag, diktiert oder zeichnet.'],
    forder: ['Für eine Figur aus einer Serie die „Akte“ führen: Satz, Beweise dafür, Beweise dagegen.', 'Einen Songtext mitbringen und die Glaubenssätze darin markieren.', 'Zu jedem bremsenden Satz der Bohnen-Wette einen Satz bauen, der den Prüfstand besteht.', 'Die Beweis-Liste zwei Wochen lang führen.'],
    gespraech: 'Dieses Modul berührt das Selbstwertgefühl. Niemand wird nach eigenen Sätzen gefragt; gearbeitet wird an Ben, Lea, Lio und Mia. Wird beim Prüfen deutlich, dass ein Satz einen wahren Kern hat – etwa weil jemand tatsächlich ausgegrenzt oder abgewertet wird –, nicht wegdiskutieren: Dann geht es nicht um einen Denkfehler, sondern um Schutz und Unterstützung. Die Szene mit Lea (Abwertung in der Familie) nicht auf eigene Familien übertragen lassen. Bei Hinweisen auf Gewalt oder Vernachlässigung die zuständige Leitung (Responsable) informieren.',
    druck: ['A4, doppelseitig, an der langen Seite gewendet. So liegen Szene (links) und „Dein Move“ (rechts) nebeneinander.', 'Seiten 1–{J} für die Jugendlichen, Seiten {L} nur für Sie.', 'Schwarz-Weiß ist möglich; das Titelblatt braucht viel Toner.', 'Seite {K} (Karten) einzeln und einseitig drucken, am besten auf festerem Papier.'],
    hot: 'Es gibt keine richtige Position. Nachfragen statt korrigieren: „Was hast du erlebt, dass du dort stehst?“ Take 6 kann nahegehen – nach Figuren fragen (Lea), nicht nach der eigenen Familie. Take 2 lädt ein, über Veränderung zu sprechen, auch über die eigene Akte: Was steht über mich drin, und stimmt es noch?',
    achtung: 'Die persönlichen Blätter („Meine Glaubenssätze“, Detektivblatt) werden nicht eingesammelt und nicht vorgelesen. Rollenspiele nur mit den vorgegebenen Szenen. Der Hauptfilm spricht Gewalt in der Kindheit an – vorher ansehen und entscheiden, ob er zur Gruppe passt; „Eddie the Eagle“ ist die leichtere Wahl.',
    hintergrund: 'Grundlage ist das kognitive Modell: Nicht die Situation, sondern ihre Bewertung bestimmt Gefühl und Verhalten (Ellis; Beck). Glaubenssätze entstehen aus wiederholten oder prägenden Erfahrungen und wirken als Filter. Das Prüfen von Belegen für und gegen einen Gedanken ist die Kerntechnik der kognitiven Umstrukturierung (Beck). Neue Überzeugungen festigen sich über eigene Erfolgserfahrungen (Bandura) und konkrete Wenn-dann-Pläne (Gollwitzer). Ein freundlicher Umgang mit sich selbst geht nicht mit weniger, sondern mit mehr Anstrengungsbereitschaft einher (Neff).',
    quellen: 'Ellis (1962) · Beck (2011) · Bandura (1977) · Gollwitzer (1999) · Neff (2003) · Dweck (2006) · Kross & Ayduk (2017). Angaben zu den Einheiten 16–19 in der Toolbox.',
  },
}
export default d

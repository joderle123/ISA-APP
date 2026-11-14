// REAL TALK #08 · AKKU – Module 8 und 9 (Gesundheit und Abschluss, Einheiten 29–30). Letzte Ausgabe von Jahr 1.
import type { Heft } from '../typen'

const YT = 'https://www.youtube.com/watch?v='
const d: Heft = {
  id: 'm8', nr: '08', datei: 'Real-Talk-08-Akku',
  thema: 'Akku', headline: 'Was lädt dich auf?', farbe: '#FF7AC3', stand: 'November 2026',
  cover: {
    bild: 'peep:lio:stolz:stehen', sticker: 'Letzte Ausgabe',
    zeilen: ['Nachts wach, morgens tot: Warum das nicht deine Schuld ist', 'Hangry ist echt. Was dein Tank mit deiner Laune macht', 'Ein Jahr später: Du hast dich mehr verändert, als du denkst', 'Ein Brief, den nur du liest'],
  },
  ansage: {
    text: [
      'Das ist die letzte Ausgabe. Sie hat zwei Hälften.',
      'In der ersten geht es um deinen **Akku**: Schlaf, Essen, Bewegung. Klingt nach Gesundheitsunterricht, ist es aber nicht. Es ist der Grund, warum derselbe blöde Spruch dich an einem Tag kaltlässt und am nächsten explodieren lässt.',
      'In der zweiten Hälfte schaust du zurück. Auf ein Jahr, in dem du mehr gemacht hast, als du dir zutraust. Und dann kommt ein Abschied. Der gehört dazu – auch wenn man ihn am liebsten überspringen würde.',
    ],
    zitat: 'Es endet. ==Du bleibst.==',
    so: [['Szene', 'Eine kurze Geschichte. Lies sie und sag, was du siehst.'], ['Fakten + Clip', 'Drei Dinge, die dahinterstecken. Dazu ein Video per QR-Code.'], ['Mythos / Real', 'Was alle sagen – und was stimmt.'], ['Dein Move', 'Jetzt du: messen, planen, zurückschauen.']],
    regeln: [
      '**Keine Zahlen zum Körper.** Kein Gewicht, keine Kalorien, keine Größen.',
      '**Niemand muss sich bewegen, der nicht will.** Zuschauen ist erlaubt.',
      '**Dein Brief gehört dir.** Niemand liest ihn. Auch die Leitung nicht.',
    ],
  },
  cast: [
    { bild: 'peep:nele:muede', name: 'Nele, 15', x: 'Schläft um zwei ein. Der Wecker klingelt um halb sieben.' },
    { bild: 'peep:yusuf:wuetend', name: 'Yusuf, 16', x: 'Kein Frühstück, zwei Energy-Drinks. Um drei knallt es im Betrieb.' },
    { bild: 'peep:lio:stolz', name: 'Lio, 14', x: 'Saß am ersten Tag mit Kapuze an der Tür. Heute erklärt er die Box-Atmung.' },
    { bild: 'peep:chloe:besorgt', name: 'Chloé, 16', x: 'Hasst Abschiede. Ist beim letzten einfach nicht mehr gekommen.' },
  ],
  warm: {
    titel: 'Soundcheck', text: 'Zwei schnelle Fragen. Kein Richtig, kein Falsch.',
    fragen: [
      { f: 'Wie voll ist dein Akku gerade?', regler: ['Akku'] },
      { f: 'Was lädt dich am schnellsten auf?', satz: ['In zehn Minuten wieder da durch:'] },
    ],
  },
  tracks: [
    {
      nr: 29, titel: 'Nachtmodus', unter: 'Müde ist kein Charakterfehler. Es ist Biologie',
      kurz: 'Warum du nachts wach bist – und was wirklich hilft.',
      szene: {
        bild: 'peep:nele:muede', name: 'Nele, 15',
        text: '1:50 Uhr. Nele liegt wach. Der Kopf rattert, das Handy leuchtet, „nur noch ein Video“. Um 6:30 Uhr klingelt der Wecker. In der ersten Stunde fällt ihr der Kopf auf den Tisch. Die Lehrerin sagt: „Geh halt früher ins Bett.“ Nele würde ihr gern erklären, dass sie um zehn im Bett war. Sie war nur nicht müde. Stattdessen sagt sie: „Mir doch egal.“',
        frage: 'Was weiß die Lehrerin nicht über Neles Nacht?',
      },
      fakten: [
        { t: 'Deine Uhr geht nach', x: 'In der Pubertät verschiebt sich die innere Uhr. Du wirst **später müde** – die Schule fängt trotzdem früh an.' },
        { t: 'Acht bis zehn', x: 'So viele Stunden braucht ein Körper in deinem Alter. **Die meisten kommen nicht mal auf sieben.**' },
        { t: 'Schlaf räumt auf', x: 'Nachts sortiert das Gehirn den Tag. Ohne Schlaf **steigt deine Druck-Zahl schneller** – bei jeder Kleinigkeit.' },
      ],
      clip: { titel: 'Müde in der Schule: Warum Teenies ausschlafen sollten', kanal: 'Quarks', url: YT + 'EZKbP2xV8yU', dauer: 'die ersten 5 Min.', frage: 'Was passiert mit der inneren Uhr in der Pubertät?' },
      mythen: [
        ['Ich brauche nur fünf Stunden.', 'Du hältst fünf Stunden aus. Brauchen ist etwas anderes.'],
        ['Am Wochenende hole ich das nach.', 'Ein bisschen. Aber bis mittags schlafen verstellt die Uhr noch weiter.'],
        ['Mit Handy schlafe ich besser ein.', 'Licht und neue Clips halten das Gehirn wach. Es fühlt sich nur nach Abschalten an.'],
      ],
      merk: 'Müde ist ==kein Charakterfehler.==',
      moveUnter: 'Hol dir deine Nacht zurück',
      moves: [
        {
          titel: 'Meine Nacht', wie: 'allein', zeit: '5 Min.',
          fragen: [
            { f: 'Die letzte Nacht – rechne nach. Sieht keiner:', satz: ['Eingeschlafen um:', 'Aufgewacht um:', 'Das waren so viele Stunden:'] },
            { f: 'Was hält dich wach? Kreise ein:', kreis: ['Handy', 'Gedanken', 'Zocken', 'Lärm', 'Sorgen', 'Koffein'] },
          ],
        },
        {
          titel: 'Neles Abend', wie: 'zu zweit', zeit: '6 Min.',
          fragen: [
            { f: 'Was hilft beim Einschlafen, was schadet?', raster: { spalten: ['hilft', 'schadet'], zeilen: ['Energy-Drink um 17 Uhr', 'Handy im Bett bis zum Einschlafen', 'jeden Tag ungefähr zur gleichen Zeit ins Bett', 'Fenster auf, Zimmer kühl und dunkel', 'morgens zehn Minuten ans Tageslicht'] } },
            { f: 'Ein Tipp für Nele, der nicht nach Lehrerin klingt:', linien: 1 },
          ],
        },
      ],
      challenge: { titel: '60 Sekunden', wie: 'alle', x: 'Alle stehen, Augen zu. **Setz dich, wenn du glaubst, dass genau eine Minute um ist.** Wer ist am nächsten dran?' },
      line: { titel: 'Mein Abschalt-Plan', x: 'Was machst du in den letzten 20 Minuten vor dem Schlafen – ohne Bildschirm?', linien: 1 },
      woche: 'Leg das Handy an **drei Abenden** so weit weg, dass du aufstehen müsstest.',
      gruppe: [
        { titel: 'Schlaf-Auktion', wer: 'zwei Teams', zeit: '12 Min.', material: 'zehn Tipp-Karten (sechs echte, vier Mythen), Spielgeld', schritte: ['Jedes Team hat 100 Punkte. Die Leitung versteigert Schlaf-Tipps: „Warme Dusche vor dem Bett – wer bietet?“', 'Ihr bietet nur auf Tipps, die ihr für echt haltet.', 'Am Ende wird aufgedeckt: Echte Tipps zählen doppelt, Mythen sind verbranntes Geld.'], frage: 'Für welchen Mythos habt ihr am meisten bezahlt?' },
        { titel: 'Bodyscan', wer: 'alle', zeit: '8 Min.', material: 'Stühle oder Matten', schritte: ['Setz oder leg dich bequem hin. Augen zu oder auf einen Punkt am Boden.', 'Die Leitung führt langsam durch den Körper: Füße, Beine, Bauch, Schultern, Gesicht.', 'Du musst nichts fühlen und nichts ändern. Nur kurz hinschauen.'], level2: 'Abends allein im Bett – von den Füßen nach oben.', frage: 'Wo im Körper war es am ruhigsten?' },
      ],
      leitung: {
        einsatz: 'Erste Hälfte von Einheit 29. Szene als Einstieg, Move A allein und ohne Vergleich, Move B zu zweit. Der Bodyscan aus der Einheit steht bei den Sessions; die Schlaf-Auktion ist neu und ersetzt bei Bedarf eine Station der „Vier Ecken“.',
        loesungen: [
          'Szene: Nele war im Bett, aber ihre innere Uhr stand noch auf „wach“. Dazu kommen Grübeln und Handy. Es ist kein fehlender Wille.',
          'Move B: hilft – gleiche Zeit, kühles dunkles Zimmer, Tageslicht am Morgen · schadet – Energy-Drink am späten Nachmittag, Handy im Bett.',
          'Auktion: echt sind z. B. feste Zeiten, Tageslicht am Morgen, kühles Zimmer, Bewegung am Tag, kein Koffein am Nachmittag, Handy außer Reichweite. Mythen: Alkohol macht guten Schlaf; Schlaf kann man auf Vorrat tanken; wer wach liegt, soll liegen bleiben; fünf Stunden reichen.',
        ],
        impulse: ['Was sagt ihr Erwachsenen, die „Geh halt früher ins Bett“ sagen?', 'Was wäre der kleinste Schritt, der eure Nacht besser macht?'],
        material: 'Tipp-Karten, Spielgeld oder Punktezettel, Stoppuhr', blaetter: 'Gefühlsrad, „Mein Gesund-Plan“, Skills-Pass.',
      },
    },
    {
      nr: 29, titel: 'Treibstoff', unter: 'Was du isst und wie du dich bewegst, entscheidet mit, wie du drauf bist',
      kurz: 'Hangry, Energy-Drinks, Bewegung – und warum kein Körper falsch ist.',
      szene: {
        bild: 'peep:yusuf:wuetend', name: 'Yusuf, 16',
        text: 'Yusuf hat verschlafen. Kein Frühstück, am Bahnhof ein Energy-Drink. In der Pause noch einer, mittags eine Tüte Chips. Um 14:50 Uhr stellt ihm ein Kollege eine Kiste in den Weg. Yusuf brüllt ihn zusammen. Der Chef holt ihn ins Büro: „Du hast ein Problem mit deiner Art.“ Yusuf denkt: Stimmt wohl. Dabei hat er seit gestern Abend nichts Richtiges gegessen.',
        frage: 'Was hat Yusufs Ausraster mit seinem Tag zu tun?',
      },
      fakten: [
        { t: 'Hangry ist echt', x: 'Ist der Tank leer, schüttet der Körper Stresshormone aus. **Du wirst gereizt, bevor du Hunger merkst.**' },
        { t: 'Zehn Minuten reichen', x: 'Zügig gehen, Treppen, Tanzen: Schon kurze Bewegung **hebt die Stimmung und senkt den Druck.**' },
        { t: 'Kein Körper ist falsch', x: 'Was du im Netz siehst, ist Licht, Winkel und Filter. **Dein Körper ist kein Projekt. Er ist dein Zuhause.**' },
      ],
      clip: { titel: 'Warum Sport uns schlau macht und unser Gehirn fit hält', kanal: 'Quarks', url: YT + '3SpyavZgZYo', dauer: 'die ersten 5 Min.', frage: 'Was macht Bewegung mit deinem Kopf?' },
      mythen: [
        ['Energy-Drinks geben Energie.', 'Sie leihen dir welche. Mit Zinsen: Nach dem Hoch kommt der Absturz.'],
        ['Sport ist nur was für Sportliche.', 'Gehen zählt. Tanzen zählt. Die Treppe zählt. Niemand braucht ein Trikot.'],
        ['Gesund leben heißt verzichten.', 'Es heißt: mehr von dem, was dich auflädt.'],
      ],
      merk: 'Erst den Tank füllen. ==Dann streiten.==',
      moveUnter: 'Finde, was dich auflädt',
      moves: [
        {
          titel: 'Mein Akku', wie: 'allein', zeit: '6 Min.',
          fragen: [
            { f: 'Was lädt dich auf, was zieht dich leer?', raster: { spalten: ['lädt auf', 'zieht leer'], zeilen: ['Schlafen', 'mit jemandem essen', 'Zocken', 'draußen sein', 'Scrollen', 'Musik', 'Bewegung'] } },
            { f: 'Das lädt mich auf und steht nicht in der Liste:', linien: 1 },
          ],
        },
        {
          titel: 'Yusufs Tag, zweiter Versuch', wie: 'zu zweit', zeit: '6 Min.',
          kontext: 'Gleicher Tag, gleicher Kollege, gleiche Kiste. Tauscht drei Dinge aus.',
          fragen: [{ f: 'Was macht Yusuf anders?', satz: ['Statt zwei Energy-Drinks:', 'Statt Chips zu Mittag:', 'Um 14:45 Uhr, kurz bevor es knallt:'] }],
        },
      ],
      challenge: { titel: 'Gesund-Würfel', wie: 'alle', x: 'Reihum würfeln, alle machen mit: **1** Glas Wasser · **2** strecken · **3** einmal ums Haus · **4** drei Atemzüge am Fenster · **5** zehn Kniebeugen · **6** jemandem etwas Nettes sagen.' },
      line: { titel: 'Mein Mini-Schritt', x: 'So klein, dass er sicher klappt. Hak ab, wenn du ihn gemacht hast.', kaestchen: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'] },
      woche: 'Mach deinen Mini-Schritt an **vier Tagen**. Klein schlägt perfekt.',
      gruppe: [
        { titel: 'Rucksack-Rennen', wer: 'zwei Teams', zeit: '15 Min.', material: 'zwei Rucksäcke, Bücher oder Flaschen, ein kurzer Parcours', schritte: ['Packt den Rucksack: Jedes Buch ist ein Stress – Schule, Streit, Geld, zu wenig Schlaf.', 'Staffel durch den Parcours – mit vollem Rucksack.', '**Runde 2:** Für jede Idee, die entlastet, kommt ein Buch raus. Dann noch mal laufen.'], frage: 'Welches Buch würdet ihr im echten Leben zuerst rausnehmen?' },
        { titel: 'Vier Ecken', wer: 'alle', zeit: '10 Min.', material: 'vier Schilder: Schlaf, Essen, Bewegung, Pause', schritte: ['Die Leitung fragt: „Wo läuft es bei dir schon gut?“ Geh in deine Ecke.', 'Jede Ecke sammelt einen Tipp, der wirklich funktioniert, und ruft ihn in den Raum.', 'Zweite Frage: „Wo wäre dein größter Hebel?“ Neue Ecke, neuer Tipp.'], frage: 'Welchen Tipp aus einer anderen Ecke probierst du aus?' },
      ],
      leitung: {
        einsatz: 'Zweite Hälfte von Einheit 29: Rucksack-Rennen und Vier Ecken stehen bei den Sessions, der Gesund-Würfel ist die Challenge, die Line ersetzt „Mein Gesund-Plan“ und begleitet die Mission (kleiner Schritt an vier Tagen).',
        loesungen: [
          'Szene: zu wenig Schlaf, nichts gegessen, viel Koffein und Zucker – der Körper war schon auf Alarm, bevor die Kiste kam. Das entschuldigt das Brüllen nicht, erklärt aber die kurze Zündschnur.',
          'Move A: Es gibt kein Richtig. Zocken und Scrollen dürfen in beiden Spalten stehen – das ist ein guter Gesprächsanlass.',
          'Move B: z. B. Wasser und etwas Richtiges zu essen; zwei Minuten raus, Box-Atmung, Druck-Zahl prüfen (Ausgabe #03).',
        ],
        impulse: ['Woran merkt ihr, dass euer Tank leer ist – bevor es knallt?', 'Was ist ein Mini-Schritt, über den niemand lachen würde – und einer, der so klein ist, dass alle lachen?'],
        material: 'zwei Rucksäcke, Bücher, Würfel, vier Schilder', blaetter: 'Gefühlsrad, „Mein Gesund-Plan“, Skills-Pass.',
      },
    },
    {
      nr: 30, titel: 'Was bleibt', unter: 'Du hast dich verändert. Du siehst es nur nicht, weil du dabei warst',
      kurz: 'Ein Jahr im Rückspiegel: Was du jetzt kannst.',
      szene: {
        bild: 'peep:lio:stolz', name: 'Lio, 14',
        text: 'Am ersten Tag saß Lio mit Kapuze an der Tür. Kein Wort, Jacke an, Fluchtweg frei. Sein Satz damals: „Ich bin halt dumm.“ Heute sitzt ein Neuer in der Gruppe, mit Kapuze, an der Tür. Lio setzt sich neben ihn und zeigt ihm die Box-Atmung. „Vier rein, vier halten. Klingt blöd, hilft aber.“ Jana grinst: „Ey. Vor einem Jahr hättest du das nie gemacht.“ Lio zuckt mit den Schultern. Ihm war das gar nicht aufgefallen.',
        frage: 'Warum merkt Lio seine eigene Veränderung nicht?',
      },
      fakten: [
        { t: 'Veränderung ist leise', x: 'Sie passiert in kleinen Schritten. **Deshalb siehst du sie erst, wenn du zurückschaust.**' },
        { t: 'Rückfälle gehören dazu', x: 'Keine Kurve geht nur nach oben. **Wer hinfällt, hat nicht alles verlernt.**' },
        { t: 'Stark heißt nicht hart', x: 'Stark sind die, die nach einem Schlag wieder aufstehen – **meistens, weil jemand da war.**' },
      ],
      clip: { titel: 'Resilienz: Samuel Koch und seine starke Psyche trotz Schicksalsschlag', kanal: 'Quarks', url: YT + 'ESsur3vtI0Q', dauer: 'die ersten 5 Min.', frage: 'Was hat ihm geholfen, weiterzumachen?' },
      mythen: [
        ['Ich bin noch genau wie vorher.', 'Frag die anderen. Die haben zugeschaut.'],
        ['Ein Rückfall heißt: alles umsonst.', 'Er heißt: Du weißt jetzt, wo es noch eng wird.'],
        ['Starke Leute brauchen niemanden.', 'Starke Leute wissen, wen sie anrufen.'],
      ],
      merk: 'Du warst dabei. ==Deshalb siehst du es nicht.==',
      moveUnter: 'Schau dir dein Jahr an',
      moves: [
        {
          titel: 'Meine Jahreskurve', wie: 'allein', zeit: '8 Min.',
          kontext: 'Zeichne dein Jahr als Linie: links der erste Tag, rechts heute. Hoch heißt gut, tief heißt hart. **Markiere drei Punkte** und schreib ein Wort dazu.',
          fragen: [{ f: 'Mein Jahr:', feld: 38 }],
        },
        {
          titel: 'Meine Top 3', wie: 'allein', zeit: '5 Min.',
          fragen: [
            { f: 'Welche drei Skills bleiben? Kreise ein:', kreis: ['Druck-Zahl', 'Box-Atmung', '5-4-3-2-1', 'Kälte', 'Beweise prüfen', 'neuer Satz', 'Ich-Satz', 'Stopp', 'Nein-Satz', 'Wenn-dann', 'Teilen-Bremse'] },
            { f: 'Und ehrlich:', satz: ['Das habe ich über mich gelernt:'] },
          ],
        },
      ],
      challenge: { titel: 'Rückblick-Duell', wie: 'zwei Teams', x: 'Die Leitung hält Dinge aus dem Jahr hoch: eine Tasse Tee, einen Becher, einen Eiswürfel, ein Hai-Bild. **Wer zuerst sagt, was ihr damit gelernt habt, holt den Punkt.**' },
      line: { titel: 'Früher – heute', x: 'Ein Satz: „Früher habe ich …, heute …“', linien: 2 },
      woche: 'Zeig jemandem außerhalb des Kurses **einen** Skill. Erklären ist die beste Übung.',
      gruppe: [
        { titel: 'Das Netz', wer: 'alle', zeit: '10 Min.', material: 'ein Wollknäuel', schritte: ['Alle stehen im Kreis. Wer das Knäuel hat, nennt einen Moment aus dem Jahr.', 'Faden festhalten, Knäuel zu jemand anderem werfen.', 'Am Ende hält jede Person ein Stück vom Netz. Einer lässt los – was passiert?'], frage: 'Welchen Moment hattet ihr schon vergessen?' },
        { titel: 'Museum des Jahres', wer: 'alle', zeit: '12 Min.', material: 'Zettel, Stifte, ein Tisch', schritte: ['Jede Person zeichnet oder schreibt ein „Ausstellungsstück“: einen Moment, einen Satz, einen Gegenstand aus dem Kurs.', 'Alles kommt ohne Namen auf den Tisch. Rundgang.', 'Ratet: Von wem ist was? Wer mag, löst auf.'], frage: 'Welches Stück würdet ihr der nächsten Gruppe zeigen?' },
      ],
      leitung: {
        einsatz: 'Erste Hälfte von Einheit 30. Die Szene vor dem Rückblick-Spiel (Challenge), Move A ersetzt Jahreskurve und Pass-Rückblick, Move B bündelt die Skills des Jahres. „Das Netz“ und das „Museum“ sind zusätzliche Angebote für die Runde.',
        loesungen: [
          'Szene: Veränderung passiert in kleinen Schritten, man gewöhnt sich an jeden einzelnen. Von außen – oder im Rückblick – sieht man den Unterschied.',
          'Move A: Keine Kurve wird bewertet oder gezeigt, außer jemand möchte. Tiefpunkte nicht ausfragen.',
          'Rückblick-Duell: Tee – Einverständnis (#05) · Becher – Ping-Turm (#07) · Eiswürfel – Reiz gegen Reiz (#03) · Hai – Streit-Typen (#06). Eigene Gegenstände aus Ihrem Jahr ergänzen.',
        ],
        impulse: ['Woran würde jemand von außen merken, dass ihr ein Jahr hier wart?', 'Welcher Skill hat euch am meisten überrascht?'],
        material: 'Gegenstände aus dem Jahr, Wollknäuel, Zettel', blaetter: 'Skills-Pass, Jahreskurve, Gefühlsrad.',
      },
    },
    {
      nr: 30, titel: 'Letzter Track', unter: 'Abschiede sind mies. Überspringen ist mieser',
      kurz: 'Tschüss sagen, ohne abzuhauen. Und ein Brief an dich.',
      szene: {
        bild: 'peep:chloe:besorgt', name: 'Chloé, 16',
        text: 'Letzter Tag. Chloé steht vor der Tür und überlegt umzudrehen. In der Klinik hat sie das so gemacht: am letzten Tag einfach nicht mehr gekommen. Kein Tschüss, keine Umarmung, kein Kloß im Hals. Drei Monate lang hat sie sich danach gefragt, was die anderen wohl gesagt hätten. Ihre Hand liegt auf der Klinke.',
        frage: 'Was verpasst Chloé, wenn sie umdreht?',
      },
      fakten: [
        { t: 'Es tut weh, weil es gut war', x: 'Wäre dir die Gruppe egal, wäre der Abschied es auch. **Der Kloß im Hals ist ein Kompliment.**' },
        { t: 'Alte Abschiede melden sich', x: 'Ein Ende weckt frühere Enden. Das ist normal. **Sag Bescheid, wenn es zu viel wird.**' },
        { t: 'Danke wirkt doppelt', x: 'Wer Danke sagt, fühlt sich danach selbst besser. **Und der andere vergisst es jahrelang nicht.**' },
      ],
      clip: { titel: 'Ein Mittel gegen Unzufriedenheit', kanal: 'Dinge Erklärt – Kurzgesagt', url: YT + 'HGKn3iUA5M0', dauer: 'die ersten 5 Min.', frage: 'Was verändert Dankbarkeit im Kopf?' },
      mythen: [
        ['Einfach verschwinden ist leichter.', 'Heute ja. Danach bleibt etwas offen – manchmal jahrelang.'],
        ['Wenn der Kurs vorbei ist, ist alles weg.', 'Was du geübt hast, sitzt. Die Karten stecken in deiner Tasche.'],
        ['Danke sagen ist peinlich.', 'Drei Sekunden lang. Dann ist es das Beste am ganzen Tag.'],
      ],
      merk: 'Es endet. ==Du bleibst.==',
      moveUnter: 'Sag Tschüss – auch zu dir von heute',
      moves: [
        {
          titel: 'Brief an mich', wie: 'allein', zeit: '12 Min.',
          kontext: 'Sammle hier Stichworte. Dann schreib den Brief auf ein eigenes Blatt und kleb den Umschlag zu. **Niemand liest ihn. In sechs Monaten bekommst du ihn zurück.**',
          fragen: [{ f: 'An mich in sechs Monaten:', satz: ['Darauf bin ich stolz:', 'Das war hart, und ich bin noch da:', 'Das wünsche ich dir:', 'Vergiss nicht:'] }],
        },
        {
          titel: 'Mein Netz', wie: 'allein', zeit: '4 Min.',
          fragen: [{ f: 'Für die Zeit danach:', satz: ['Wenn es eng wird, gehe ich zu:', 'Mein Skill Nummer eins:', 'Danke sagen will ich noch:'] }],
        },
      ],
      challenge: { titel: 'Stärken-Rücken', wie: 'alle', x: 'Jede Person bekommt ein Blatt auf den Rücken. Musik an, alle laufen. **Bei Stopp schreibst du der Person vor dir eine Stärke auf den Rücken.** Gelesen wird erst am Schluss.' },
      line: { titel: 'Mein letzter Satz', x: 'Was sagst du der Gruppe zum Schluss? Ein Satz reicht.', linien: 1 },
      woche: 'Der Kurs endet. **Dein Brief kommt in sechs Monaten.** Bis dahin: Karten in die Tasche.',
      hilfe: true,
      gruppe: [
        { titel: 'Wie am ersten Tag', wer: 'alle', zeit: '5 Min.', material: '–', schritte: ['Erinnert euch: Am ersten Tag habt ihr 5-4-3-2-1 gemacht. Jetzt noch einmal.', 'Fünf Dinge sehen, vier hören, drei spüren, zwei riechen, eins schmecken. Leise, jede Person für sich.', 'Schaut euch um: derselbe Raum, dieselbe Übung.'], frage: 'Was ist heute anders als am ersten Tag?' },
        { titel: 'Der letzte Kreis', wer: 'alle', zeit: '10 Min.', material: 'ein Gegenstand zum Weitergeben', schritte: ['Der Gegenstand geht reihum. Wer ihn hält, sagt einen Satz: „Ich nehme mit …“', 'Weitergeben ohne Satz ist erlaubt.', 'Zum Schluss sagt die Leitung jeder Person einen Satz. Dann ist Schluss – ohne Zugabe.'], frage: 'Welchen Satz wollt ihr behalten?' },
      ],
      leitung: {
        einsatz: 'Zweite Hälfte von Einheit 30. Move A bereitet den Brief an sich selbst vor (der Brief selbst kommt auf ein eigenes Blatt), die Challenge ist der Stärken-Rücken mit Musik-Stopp, „Wie am ersten Tag“ schließt den Bogen zur ersten Einheit.',
        loesungen: [
          'Szene: den Abschluss – zu hören, was sie den anderen bedeutet hat, und selbst etwas zu sagen. Offene Enden bleiben länger als traurige.',
          'Move A: Briefe werden nie gelesen. Verschlossen und sicher aufbewahren, nach sechs Monaten zurückgeben oder zuschicken.',
          'Stärken-Rücken: nur Stärken, keine Witze. Blätter vor dem Vorlesen kurz selbst überfliegen.',
        ],
        impulse: ['Was macht einen guten Abschied aus?', 'Was wünscht ihr der Gruppe, die nach euch kommt?'],
        material: 'Briefpapier, Umschläge, Blätter, Kreppband, Musik', blaetter: 'Skills-Pass, Briefbogen, Gefühlsrad.',
      },
    },
  ],
  kino: {
    geprueft: '14.11.2026',
    filme: [
      { titel: 'Vincent will Meer', jahr: 2010, fsk: 6, laenge: '95 Min.', worum: 'Vincent hat Tourette. Nach dem Tod seiner Mutter steckt ihn der Vater in eine Klinik. Dort trifft er Marie, die nicht isst, und Alexander, der alles dreimal putzt. Zu dritt klauen sie das Auto der Therapeutin und fahren los – ans Meer.', achte: ['Was kann jede der drei Figuren, was die anderen nicht können?', 'Wovor läuft jeder weg?', 'Wie verändert sich der Vater?'], achtung: 'Magersucht und ein Zusammenbruch, Tod der Mutter, derbe Wörter.' },
      { titel: 'Little Miss Sunshine', jahr: 2006, fsk: 6, laenge: 'ca. 103 Min.', worum: 'Eine Familie, in der gerade alles schiefgeht, quetscht sich in einen kaputten gelben Bus. Ziel: ein Schönheitswettbewerb für die siebenjährige Olive. Der Bruder schweigt seit Monaten, der Opa flucht, die Kupplung ist hin. Angeschoben wird gemeinsam.', achte: ['Wer ist hier ein Gewinner – und wer sagt das?', 'Was hält die Familie zusammen?'], achtung: 'Ein Suizidversuch wird erwähnt, Drogenkonsum des Großvaters, ein Todesfall, derbe Wörter.' },
    ],
    bingo: ['Jemand haut ab', 'Streit im Auto', 'Jemand sagt endlich die Wahrheit', 'Das Ziel kommt in Sicht', 'Ein Abschied', 'Jemand hilft, obwohl er nicht muss', 'Das hätte ich auch gemacht', 'Lachen, obwohl es ernst ist', 'Ein Plan geht schief'],
    nachher: ['Was haben die Figuren am Ende, was sie am Anfang nicht hatten?', 'Wer hat sich am meisten verändert – und wodurch?', 'Wohin würdest du fahren, und wen nimmst du mit?'],
  },
  hot: {
    unter: 'Sechs Sätze zum Streiten – nach Regeln',
    regeln: 'Mach auf jeder Linie ein Kreuz: Wie sehr stimmt der Satz für dich? Dann stellt euch im Raum auf – eine Wand heißt „nie“, die andere „immer“. Wer mag, sagt einen Satz dazu. **Niemand muss sich rechtfertigen. Platz wechseln ist erlaubt.**',
    takes: ['Schlaf ist Zeitverschwendung.', 'Schule sollte erst um zehn anfangen.', 'Energy-Drinks sollte es erst ab 18 geben.', 'In einem Jahr kann sich ein Mensch nicht ändern.', 'Abschiede sollte man einfach überspringen.', 'Hilfe holen ist stark.'],
  },
  quiz: {
    unter: 'Zehn Fragen. Zehn Buchstaben. So gehst du hier raus.', wort: 'AUFGELADEN',
    fragen: [
      { f: 'Warum werden Jugendliche abends so spät müde?', o: ['die innere Uhr verschiebt sich', 'aus Faulheit', 'wegen zu viel Sport'], r: 0 },
      { f: 'Wie viel Schlaf braucht dein Körper?', o: ['fünf bis sechs Stunden', 'acht bis zehn Stunden', 'zwölf bis vierzehn Stunden'], r: 1 },
      { f: 'Ein Energy-Drink am späten Nachmittag …', o: ['hilft beim Einschlafen', 'ist egal', 'wirkt noch Stunden später'], r: 2 },
      { f: '„Hangry“ heißt:', o: ['gereizt, weil der Tank leer ist', 'müde vom Essen', 'satt und zufrieden'], r: 0 },
      { f: 'Was hebt die Stimmung am schnellsten?', o: ['eine Stunde scrollen', 'zehn Minuten Bewegung', 'ein dritter Energy-Drink'], r: 1 },
      { f: 'Ein guter Mini-Schritt ist …', o: ['groß und beeindruckend', 'für irgendwann', 'so klein, dass er sicher klappt'], r: 2 },
      { f: 'Warum siehst du deine eigene Veränderung schlecht?', o: ['sie passiert in kleinen Schritten', 'es gibt keine', 'andere verstecken sie'], r: 0 },
      { f: 'Ein Rückfall bedeutet:', o: ['alles war umsonst', 'er gehört dazu – weitermachen', 'aufgeben'], r: 1 },
      { f: 'Was weckt ein Abschied oft?', o: ['Hunger', 'gar nichts', 'Erinnerungen an frühere Abschiede'], r: 2 },
      { f: 'Was bleibt nach dem Kurs?', o: ['was du geübt hast', 'nichts', 'nur das Heft'], r: 0 },
    ],
  },
  karten: [
    { titel: 'Nachtmodus', icon: 'moon', zeilen: ['Handy raus aus dem Bett.', 'Jeden Tag ungefähr die gleiche Zeit.', 'Kein Koffein am Nachmittag.'] },
    { titel: 'Akku-Check', icon: 'battery-charging', zeilen: ['Gegessen? Getrunken? Geschlafen? Bewegt?', 'Erst den Tank füllen. **Dann streiten.**'] },
    { titel: 'Mini-Schritt', icon: 'run', zeilen: ['So klein, dass er sicher klappt:', '_Wenn', '_dann'] },
    { titel: 'Meine Top 3', icon: 'flag', zeilen: ['Diese Skills bleiben:', '_1', '_2', '_3'] },
    { titel: 'Mein Netz', icon: 'heart', zeilen: ['Wenn es eng wird, gehe ich zu:', '_Mensch 1', '_Mensch 2'] },
    { titel: 'Hilfe', icon: 'lifebuoy', zeilen: ['Der Kurs ist vorbei. Hilfe nicht.', 'Sprich mit jemandem, dem du vertraust.', 'Kanner-Jugendtelefon **116 111** · Notruf **112**'] },
  ],
  abspann: {
    posten: ['Schlaf ernst nehmen', 'Akku-Check', 'Mini-Schritt', 'Mein Jahr sehen', 'Abschied aushalten'],
    saetze: ['Das nehme ich aus dem ganzen Jahr mit:', 'Das war Quatsch:', 'Das wünsche ich der nächsten Gruppe:'],
  },
  leitung: {
    fakten: [['Zielgruppe', '12–16 Jahre, 4–8 Jugendliche'], ['Dauer', '2 Einheiten à 100 Min. (E29–E30)'], ['Sozialform', 'allein, zu zweit, Teams'], ['Material', 'Stifte, Rucksäcke, Würfel, Umschläge, Schere']],
    wozu: 'REAL TALK ist das Heft der Jugendlichen – gemacht wie ein Magazin, nicht wie ein Arbeitsblatt. Diese letzte Ausgabe verbindet Modul 8 (Gesundheit) und Modul 9 (Abschluss): Track 01 und 02 gehören zu Einheit 29, Track 03 und 04 zu Einheit 30. Wer mehr Zeit hat, macht aus jedem Track einen eigenen Termin.',
    lernziele: [
      'Die Jugendlichen wissen, warum sie spät müde werden, und kennen drei Dinge, die ihren Schlaf verbessern.',
      'Sie erkennen den Zusammenhang zwischen Schlaf, Essen, Bewegung und Anspannung und planen einen Mini-Schritt.',
      'Sie benennen eigene Veränderungen im Jahr und wählen die Skills, die sie behalten.',
      'Sie gestalten einen Abschied aktiv mit und wissen, an wen sie sich danach wenden.',
    ],
    start: 'Titel, Ansage (vorlesen – der Ton ist Absicht), Tracklist und Soundcheck. Etwa 10 Minuten zu Beginn von Einheit 29.',
    schluss: 'Kino als eigener Termin vor der letzten Einheit. Hot Takes im Stehen, „Knack den Code“ als Wiederholung, Karten ausschneiden. Der Abspann gehört in die allerletzte Runde.',
    hilfe: ['Szene und Fakten vorlesen oder reihum lesen lassen.', 'Schlafzeiten gemeinsam ausrechnen.', 'Jahreskurve mit drei vorgegebenen Punkten beginnen (erster Tag, Mitte, heute).', 'Der Brief darf auch gezeichnet oder diktiert werden.'],
    forder: ['Eine Woche Schlaf-Protokoll führen.', 'Für die nächste Gruppe eine Seite „Was ich gern am Anfang gewusst hätte“ schreiben.', 'Einen eigenen Gesund-Würfel mit sechs Mini-Schritten bauen.', 'Die Jahreskurve mit Belegen aus dem Skills-Pass ergänzen.'],
    gespraech: 'Schlafprobleme haben oft Gründe, die niemand in der Gruppe nennen will (Unruhe zu Hause, Angst, Medikamente). Nicht nachbohren, im Einzelgespräch aufgreifen. Beim Thema Körper nicht bewerten, was jemand isst oder wie jemand aussieht. Abschiede wecken alte Verluste: Rückzug, Albernheit oder Fernbleiben am letzten Tag sind häufig – vorher ankündigen, dass der Termin der letzte ist, und Abwesende persönlich verabschieden.',
    druck: ['A4, doppelseitig, an der langen Seite gewendet. So liegen Szene (links) und „Dein Move“ (rechts) nebeneinander.', 'Seiten 1–{J} für die Jugendlichen, Seiten {L} nur für Sie.', 'Schwarz-Weiß ist möglich; das Titelblatt braucht viel Toner.', 'Seite {K} (Karten) einzeln und einseitig drucken, am besten auf festerem Papier.'],
    hot: 'Es gibt keine richtige Position. Take 4 („In einem Jahr kann sich ein Mensch nicht ändern“) ist die Vorlage für Track 03 – wer zustimmt, bekommt später Gegenbeweise von der Gruppe. Take 5 offen stehen lassen; er wird am letzten Tag von selbst beantwortet.',
    achtung: 'Beim Thema Körper keine Zahlen: kein Gewicht, keine Kalorien, keine Kleidergrößen. Niemanden zu Bewegung oder Leistung drängen; Rucksack-Rennen und Würfel sind freiwillig. Beim Bodyscan dürfen die Augen offen bleiben, wer mag, setzt aus. Die Briefe liest niemand. Beide Filme vorher ansehen: „Vincent will Meer“ zeigt Magersucht, in „Little Miss Sunshine“ wird ein Suizidversuch erwähnt – für manche Gruppen ist das zu nah.',
    hintergrund: 'In der Pubertät verschiebt sich der Schlaf-Wach-Rhythmus nach hinten (Carskadon); empfohlen sind acht bis zehn Stunden Schlaf (Paruthi et al.). Stress entsteht, wenn Anforderungen die eigenen Mittel übersteigen (Lazarus & Folkman); gesund bleibt eher, wer sein Leben als verstehbar, handhabbar und sinnvoll erlebt (Antonovsky). Kleine, konkrete Pläne werden eher umgesetzt als gute Vorsätze (Gollwitzer). Widerstandskraft ist nichts Besonderes, sondern entsteht aus gewöhnlichen Dingen wie verlässlichen Beziehungen (Masten). Über Erlebtes zu schreiben entlastet (Pennebaker), Dankbarkeit hebt das Wohlbefinden (Emmons & McCullough).',
    quellen: 'Carskadon (2011) · Paruthi et al. (2016) · Lazarus & Folkman (1984) · Antonovsky (1987) · Gollwitzer (1999) · Masten (2014) · Pennebaker (1997) · Emmons & McCullough (2003). Angaben zu den Einheiten 29–30 in der Toolbox.',
  },
}
export default d

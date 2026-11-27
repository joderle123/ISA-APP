// REAL TALK #08 · AKKU – vier Einheiten als zusammenhängende Stunden (16.11.2026).
// Neu nach der Jugend-Kritik (27.11.2026, Runde 2): Stunde 1 baut Amiras Zimmer im Raum nach und um (statt Schlaf-Markt mit
// Punkten), Stunde 2 spielt in der Turnhalle (statt im Betrieb), Stunde 3 ist ein Jahres-Museum (statt Karten-Duell), die
// letzte Stunde endet mit einer Postkarte an sich selbst für den Herbst und dem letzten Kreis. Je Stunde eine Pause,
// höchstens zwei Clips im Heft, keine Punkte, keine Teams gegeneinander. Alter 12–13, Welt: Schule, Bus, Sport, Chat.
// Runde 3 (27.11.2026): Stunde 2 neu – ohne Sport-Clip, mit dem 10-Minuten-Test und dem Rucksack-Rennen aus Leer-Machern und
// Ladern. Schlaf-Linie ohne Bloßstellung, klare Zimmer-Legende, Museum ohne Münzen auf Paaren, der letzte Kreis ist der Schluss.
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, beispiel, clip, fall, fragen, fuerDich, karten, kreuz, kreuzU, material, merk, modell, pause, raster, reden, runde, satz, schluss, seite, st, stunde, strich, tabelle, text, verbinden, weiter, zimmer } from './stunden-hilfe'

const kreis = (f: string, ...l: string[]): Frage => ({ f, kreis: l })

export function stunden(d: Heft): Stunde[] {
  const [nacht, treib, bleibt, letzte] = d.tracks
  delete bleibt.clip
  delete treib.clip   // Runde 3: der Sport-Clip passte nicht zum Fall (Yusuf und das Essen)
  delete letzte.clip

  /* ---------- Stunde 1 · Nachtmodus ---------- */
  // Amiras Zimmer um 1:50 Uhr: jede Karte sagt, wo das Ding liegt – so bauen die Jugendlichen den „Tatort“ selbst auf.
  const DINGE: [string, string][] = [
    ['Handy', 'im Bett, unter dem Kissen'], ['Ladekabel', 'im Bett, eingesteckt'], ['Energy-Drink', 'halb leer, auf dem Nachttisch'], ['Konsole', 'vor dem Bett, Controller auf der Decke'],
    ['helle Lampe', 'am Schreibtisch – an'], ['Vorhang', 'offen – draußen die Straßenlaterne'], ['Wecker', 'im Regal, ausgeschaltet'], ['Buch', 'im Regal'],
    ['Kopfhörer', 'auf dem Kissen'], ['Glas Wasser', 'leer, auf dem Schreibtisch'], ['Zettel und Stift', 'in der Schublade'], ['Leuchtuhr', 'neben dem Kissen'],
    ['Chips', 'auf der Bettdecke'], ['Fernseher', 'läuft leise, eine Serie'],
  ]
  const s1 = stunde('Warum bist du müde – und was hilft wirklich?', ['erklären, warum Jugendliche abends spät müde werden', 'ein Zimmer so umbauen, dass man darin schlafen kann', 'einen Schritt für deinen Abend festlegen'],
    seite(
      ankommen('deine Nacht', kreuz('Wie viele Stunden hast du letzte Nacht geschlafen?', 'unter 6', '6 bis 8', 'mehr als 8'), strich('Wie wach bist du gerade?', 'todmüde', 'hellwach')),
      st('Erst machen: die Schlaf-Linie', '12 Min.', 'alle · im Stehen', 'arrows-horizontal', 'Vorher eine Linie aus Kreppband auf den Boden kleben, daneben Zettel: 20 · 21 · 22 · 23 · 0 · 1 Uhr. Nur hinstellen, nicht kommentieren. Sie stellen sich auch hin.',
        text('Auf dem Boden liegt eine Linie: links 20 Uhr, rechts 1 Uhr. Bei jeder Frage stellst du dich an deinen Platz. **Niemand muss etwas sagen.**',
          '**1** Wann schlafen die meisten 13-Jährigen an einem Schultag ein? Schätze. · **2** Wann wirst du am Wochenende von selbst müde? · **3** Dein Wecker klingelt um 6:30 Uhr. Wo musst du stehen, damit du neun Stunden schläfst?', 'Wer nicht stehen mag, legt einen Stift an seinen Platz auf der Linie.'),
        reden('Wo standen die meisten bei Frage 1 – und wo bei Frage 3? Was liegt dazwischen?')),
    ),
    seite(
      fall(nacht, 'Amira um 1:50 Uhr', [
        kreuzU('Was weiß die Lehrerin nicht über Amiras Nacht?', 'Amira war um zehn im Bett. Sie war nur nicht müde.', 'Amira war auf einer Party.'),
        kreuz('Wie viele Stunden hat Amira höchstens geschlafen?', 'etwa 4½', 'etwa 7', 'etwa 9'),
      ], { zeitleiste: [['22:00', 'Amira liegt im Bett. Nicht müde.'], ['1:50', 'Wach. Das Handy leuchtet.'], ['6:30', 'Der Wecker klingelt.'], ['1. Stunde', 'Der Kopf fällt auf den Tisch.']], leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Amira um 1:50 Uhr', 3, 'search', reden('Was denken Erwachsene oft, wenn Jugendliche morgens müde sind – und was stimmt wirklich?')),
      clip(nacht, 'Warum Teenies ausschlafen sollten', [kreuzU('Warum sind Jugendliche morgens so müde?', 'Ihre innere Uhr geht nach.', 'Sie sind faul.', 'weiß nicht'), kreuz('Wann wirst du abends richtig müde?', 'vor 22 Uhr', '22 bis 24 Uhr', 'nach Mitternacht')], ['Das passiert mit der inneren Uhr:', 'So viel Schlaf braucht man:', 'Das hat mich überrascht:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Was könnte Amira der Lehrerin erklären?', '„Ich war im Bett. Meine Uhr geht nach.“', '„Mir doch egal.“')]),
    ),
    seite(
      pause(),
      runde('Bau Amiras Zimmer um', '30 Min.', 'alle · im Raum', 'bed', {
        ziel: 'Ein Zimmer, in dem man nicht schlafen kann, so umbauen, dass es geht – mit nur drei Zügen.',
        material: 'den Plan unten, die 14 Ding-Karten von der nächsten Seite (ausschneiden), Tische und Stühle, Stifte',
        schritte: [
          '**Aufbauen (5 Min.):** Baut Amiras Zimmer im Raum nach – wie auf dem Plan unten.',
          '**Tatort 1:50 Uhr (3 Min.):** Verteilt die 14 Ding-Karten. Jede Person legt ihre Karten genau dahin, wo es auf der Karte steht. So sah es bei Amira aus.',
          '**Ermitteln (5 Min.):** Geht durch das Zimmer. Zu zweit legt ihr einen Stift auf das Ding, das Amira am meisten wach hält – und sagt einen Satz, warum.',
          '**Umbau (8 Min.):** Amira darf **genau drei Dinge** ändern: wegräumen, umstellen oder ausschalten. Kaufen geht nicht. Einigt euch. Wer einen Zug vorschlägt, geht hin und legt die Karte um. Zeichnet die drei Züge als Pfeile in den Plan.',
          '**Amira wehrt sich (4 Min.):** Die Leitung spricht als Amira. Bei jedem Satz zeigen alle gleichzeitig den Daumen: Hat sie recht? Wer mag, antwortet ihr.',
        ],
        regeln: ['Keine Punkte. Es gibt mehr als eine gute Lösung.', 'Niemand muss etwas über das eigene Zimmer sagen.'],
        zu3: 'Jede Person macht einen Zug. Die Leitung spielt Amira und wehrt sich bei jedem Zug.',
        auswertung: ['Welcher Zug bringt Amira am meisten – und warum?', 'Welcher Zug geht auch bei dir, egal wie dein Zimmer aussieht?'],
      }, {
        leitung: 'Am Ende 3 Minuten zurückbauen. Amiras Sätze für den letzten Schritt: „Ohne Handy kann ich nicht einschlafen.“ · „Das Handy ist mein Wecker.“ · „Am Wochenende schlafe ich alles nach.“ · „Ich brauche eh nur fünf Stunden.“ Auflösung bei den Lösungen.',
        danach: [
          fragen(null, zimmer('Amiras Zimmer – so baut ihr es nach. Zeichne die drei Züge als Pfeile ein.', 'zwei Tische = Bett · Stuhl = Nachttisch · Tisch = Schreibtisch · Rucksack = Regal · echtes Fenster = Fenster')),
          beispiel('So kann es klingen', ['Finn:', 'Handy raus. Klar.'], ['Mia:', 'Geht nicht. Das ist ihr Wecker.'], ['Ben:', 'Der Wecker liegt doch im Regal! Wecker ans Bett, Handy auf den Schreibtisch.'], ['', 'Ben legt zwei Karten um. Ein Zug ist noch übrig.']),
        ],
      }),
    ),
    seite(
      material('14 Ding-Karten', 6, karten(3, 13, 'Ausschneiden. Jede Karte kommt dahin, wo sie um 1:50 Uhr lag.', DINGE.map(([t, x]) => ({ t, x, marke: '1:50 Uhr' })))),
      fuerDich('meine Nacht', '6 Min.', fragen('Sieht keiner.', kreis('Was hält dich wach? Kreise ein.', 'Handy', 'Gedanken', 'Zocken', 'Lärm', 'Sorgen', 'Koffein'),
        satz('Mein Zug für heute Abend – mit Uhrzeit und Ort:', 'Um ___ Uhr liegt mein Handy hier:'))),
      schluss(nacht, 'noch einmal: die Lehrerin', [kreuzU('Die Lehrerin sagt: „Geh halt früher ins Bett.“ Was stimmt?', 'Früher hinlegen reicht nicht – Licht, Handy und Koffein zählen auch.', 'Sie hat recht. Mehr braucht es nicht.'), kreuz('Schau auf Station 1. Mit deinem Zug: mehr Schlaf als letzte Nacht?', 'mehr', 'gleich', 'weiß nicht')], ['1', '2', '3']),
    ),
  )

  /* ---------- Stunde 2 · Treibstoff (neu in Runde 3, 27.11.2026) ---------- */
  // Raus: der Sport-Clip (der Fall handelt vom Essen), die Würfel-Pause mit Kniebeugen, Stress-Karten wie „Streit zu Hause“
  // (wurden zu einem Trick von drei Minuten). Neu: der 10-Minuten-Test – die Gruppe prüft Modell-Punkt 2 selbst – und das
  // Rucksack-Rennen mit Leer-Machern und Ladern, die man an einem Schultag wirklich hat.
  const LEER = ['kein Frühstück', 'zwei Energy-Drinks', 'den ganzen Vormittag nichts getrunken', 'mittags nur Chips', 'bis 1 Uhr am Handy', 'den ganzen Tag gesessen']
  const LADER = ['Wasser aus dem Trinkbrunnen', 'das Pausenbrot wirklich essen', 'ein Apfel', 'etwas Warmes in der Kantine', 'eine Handvoll Nüsse', '10 Minuten Treppe oder Hof', 'Handy um 22 Uhr in den Flur', 'in der Pause raus an die Luft', 'Licht früher aus', 'eine Flasche Wasser im Rucksack']
  const s2 = stunde('Was hat dein Tank mit deiner Laune zu tun?', ['erklären, warum ein leerer Tank gereizt macht', 'selbst testen, was zehn Minuten Bewegung machen', 'einen Mini-Schritt für vier Tage festlegen'],
    seite(
      ankommen('dein Akku', strich('Wie voll ist dein Akku gerade?', 'leer', 'voll'), kreuz('Was hast du heute schon gegessen?', 'richtig gefrühstückt', 'eine Kleinigkeit', 'nichts')),
      fall(treib, 'Yusuf in der Turnhalle', [
        raster('Wie voll ist Yusufs Tank? Ein Kreuz pro Uhrzeit.', ['leer', 'halb', 'voll'], '7:20', '10:00', '12:30', '14:50'),
        kreuzU('Die Sportlehrerin sagt: „Du hast ein Problem mit deiner Art.“ Stimmt das?', 'Nicht ganz. Gebrüllt hat Yusuf – aber mit leerem Tank kippt man viel schneller.', 'Ja.'),
      ], { zeitleiste: [['7:20', 'verschlafen, kein Frühstück, ein Energy-Drink an der Haltestelle'], ['Pause', 'noch ein Energy-Drink'], ['mittags', 'eine Tüte Chips'], ['14:50', 'Noah rempelt ihn an. Yusuf brüllt.']], zeit: '12 Min.', leitung: 'Vorlesen. Erst ankreuzen. Dann zeigen alle gleichzeitig auf die Uhrzeit, an der es kippt – erst danach die Sprechblase.' }),
      weiter('Der Fall: Yusuf in der Turnhalle', 2, 'search', reden('Wann seid ihr am schnellsten gereizt – mit Hunger, müde oder nach zu viel Handy?')),
    ),
    seite(
      modell(treib, 'dein Tank', ['battery-1', 'walk', 'glass-full'], { zeit: '8 Min.', wie: 'alle · dann allein',
        leitung: 'Vorlesen, dann allein verbinden und auflösen. Den Satz unten nur vorlesen, nicht besprechen.',
        fragen: [verbinden('Was passt zu welchem Punkt? Verbinde.', ['Yusuf hat nichts gegessen und brüllt wegen eines Remplers.', 'Nach zehn Minuten Treppe fühlt sich Mia leichter.', 'Ben hat seit dem Frühstück nichts getrunken und kann nicht mehr zuhören.'], ['Trinken zählt mit', 'Hunger macht gereizt', 'Zehn Minuten reichen'])],
        danach: [reden('Was ist euer schnellster Akku-Lader in der Pause?')] }),
      st('Erst machen: der 10-Minuten-Test', '12 Min.', 'alle · Treppe oder Hof', 'walk', 'Sie gehen vorne. Zügig, nicht rennen. Wer nicht kann oder nicht mag, geht langsam oder bleibt bei Ihnen. Vorher und nachher still ankreuzen – keine Zahlen vergleichen.',
        text('Prüft Punkt 2 vom Modell selbst: **Reichen zehn Minuten?** Erst ein Kreuz auf die Linie. Dann geht ihr acht Minuten zügig – Treppe rauf und runter oder um den Hof. Danach noch ein Kreuz.'),
        fragen('Nur für dich.', strich('Mein Akku vorher:', 'leer', 'voll'), strich('Mein Akku nachher:', 'leer', 'voll'))),
      pause(),
    ),
    seite(
      runde('das Rucksack-Rennen', '25 Min.', 'alle · gegen die eigene Zeit', 'backpack', {
        ziel: 'Spüren, was ein leerer Tank mit sich herumschleppt – und was ihn an einem Schultag wirklich füllt.',
        material: 'die 6 Leer-Macher und die 10 Lader von der nächsten Seite, ein Rucksack, sechs Bücher, ein Stuhl als Wendepunkt, Stoppuhr',
        schritte: [
          'Die sechs **Leer-Macher** kommen je in ein Buch, die Bücher in den Rucksack.',
          '**Lauf 1:** Staffel um den Stuhl – reihum trägt jede Person den vollen Rucksack einmal. Die Leitung stoppt die Zeit der Gruppe.',
          'Die zehn **Lader** liegen offen. Zu jedem Buch sucht ihr einen Lader, der **um diese Uhrzeit wirklich geht – mit dem, was du an einem Schultag hast.** Einig? Dann kommt das Buch raus.',
          '**Lauf 2:** noch einmal – gegen eure eigene Zeit.',
        ],
        regeln: ['Keine Teams: Ihr lauft zusammen gegen eure eigene Zeit.', 'Gehen statt rennen ist erlaubt. Wer nicht tragen mag, stoppt die Zeit.'],
        zu3: 'Jede Person trägt zweimal.',
        wertung: { kopf: ['Zeit', 'Lauf 1 · voll', 'Bücher raus', 'Lauf 2'], zeilen: ['unsere Gruppe'] },
        auswertung: ['Welcher Lader geht bei euch wirklich – auch an einem schlechten Tag?', 'Welches Buch ist drin geblieben – und wer könnte tragen helfen?'],
      }, { danach: [beispiel('So kann es klingen', ['Ben zieht das Buch:', '„bis 1 Uhr am Handy“'], ['Lea:', 'Lader: Handy um 22 Uhr in den Flur. Buch raus!'], ['Ben:', 'Und „mittags nur Chips“?'], ['Mia:', 'Etwas Warmes in der Kantine. Noch ein Buch raus.'])] }),
    ),
    seite(
      material('6 Leer-Macher und 10 Lader', 6,
        karten(3, 13, 'Die Leer-Macher: je einer in ein Buch.', LEER.map((t) => ({ t, marke: 'macht leer' }))),
        karten(5, 14, 'Die Lader: offen auf den Tisch legen.', LADER.map((t) => ({ t, marke: 'lädt' })))),
      fuerDich('mein Tag, zweiter Versuch', '6 Min.', fragen('Wie bei Yusuf: ein Tag, an dem du gekippt bist – oder jemand, den du kennst. Sieht keiner.',
        kreis('Was war an dem Tag leer? Kreise ein.', 'Schlaf', 'Essen', 'Trinken', 'Bewegung', 'Pause', 'jemand zum Reden'),
        kreuz('Wann ist es gekippt?', 'morgens', 'mittags', 'nachmittags', 'abends'),
        satz('Mein Mini-Schritt – eine Stunde vorher:', 'Wenn es ___ Uhr ist, dann'))),
      schluss(treib, 'Yusuf um 14:45', [kreuzU('Bevor du das nächste Mal streitest: Was prüfst du zuerst?', 'meinen Tank: gegessen, getrunken, geschlafen?', 'ob der andere angefangen hat'), strich('Schau auf Station 1. Wie voll ist dein Akku jetzt?', 'leer', 'voll')], ['1', '2', '3', '4']),
    ),
  )

  /* ---------- Stunde 3 · Was bleibt: das Jahres-Museum ---------- */
  const ERINNERN: [string, string][] = [
    ['#00 Neu hier', 'eure Regeln · 5-4-3-2-1 · der Blind-Lotse'], ['#01 Ich', 'Tank-Check · laut und leise · meine Stärken'], ['#02 Gefühle', 'Wort-Leiter · Körper-Karte · Wut-Übersetzer'], ['#03 Druck', 'Druck-Zahl · Atem · Kälte · Ampelplan'],
    ['#04 Gedanken', 'Film im Kopf · Beweise, bitte · Mut-Leiter'], ['#05 Grenzen', 'Wort-Schere · Stopp · Grenz-Skala'], ['#06 Ärger', 'Hai oder Eule · Nein-Karten · Zuschauer'], ['#07 Netz', 'Wenn-dann · Bevor ich sende · Teilen-Bremse'],
  ]
  const s3 = stunde('Was hat sich verändert – auch wenn du es nicht merkst?', ['erklären, warum man die eigene Veränderung schwer sieht', 'zeigen, was dir dieses Jahr geholfen hat', 'den Neuen sagen, was an diesem Kurs wirklich stimmt'],
    seite(
      ankommen('du im September', kreuz('Bist du noch genau wie im September?', 'ja', 'nein', 'weiß nicht'), kreuz('Was merkt man leichter?', 'Veränderung bei anderen', 'Veränderung bei sich selbst')),
      fall(bleibt, 'Lio und der Neue', [
        kreis('Was kann Lio heute, was er im September nicht konnte? Kreise ein.', 'sich zu einem Neuen setzen', 'einen Skill erklären', 'mehr als zwei Wörter für Gefühle', 'zaubern'),
        kreuzU('Warum merkt Lio seine Veränderung nicht?', 'Sie kam in kleinen Schritten. Er war jeden Tag dabei.', 'Weil sich nichts verändert hat.'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Lio und der Neue', 2, 'search', reden('Jana hat es gesehen, Lio nicht. Wer sieht bei euch, was sich verändert hat?')),
    ),
    seite(
      runde('das Jahres-Museum', '30 Min.', 'zu zweit · dann alle', 'building-bank', {
        ziel: 'Das Jahr ausstellen – und sehen, was hängen geblieben ist.',
        material: 'Dinge aus dem Jahr (Taschenkarten, Becher, Eiswürfel, Kreppband, Stoppuhr …), die Museumsschilder und die Erinnerungshilfe von der nächsten Seite, drei Münzen oder Büroklammern pro Person',
        schritte: [
          '**Aufbauen (10 Min.):** Zu zweit sucht ihr zwei Stücke aus dem Jahr aus – einen echten Gegenstand oder eine Zeichnung. Die Erinnerungshilfe hilft. Legt sie auf einen Tisch und füllt für jedes Stück ein Museumsschild aus.',
          '**Führung (12 Min.):** Alle gehen von Tisch zu Tisch. Wer ausstellt, erklärt sein Stück in zwei Sätzen: Was ist das – und wann hilft es? **Ihr seid die Profis.** Die Besucher dürfen es ausprobieren.',
          '**Münzen (3 Min.):** Still. Jede Person legt ihre drei Münzen auf die Erinnerungshilfe in der Mitte: Welche Hefte haben dir am meisten gebracht? Alle drei auf eins ist erlaubt.',
          '**Dauerausstellung (4 Min.):** Alle Stücke kommen aufs Foto – für die Neuen im Herbst.',
        ],
        regeln: ['Ausgestellt werden Stücke, keine Personen.', 'Niemand muss sagen, warum seine Münzen wo liegen. Wer nicht reden mag, lässt das Schild sprechen – die Leitung liest vor.'],
        zu3: 'Jede Person stellt zwei Stücke aus. Die Leitung ist Besucher und fragt nach.',
        auswertung: ['Auf welchem Heft liegen die meisten Münzen – und warum gerade da?', 'Welches Stück hättet ihr im September gebraucht?'],
      }, {
        leitung: 'Vorher Dinge aus dem Jahr sammeln: Taschenkarten, Becher, Eiswürfel in einem Becher, Kreppband, Stoppuhr, Würfel. Bei der Führung nicht korrigieren, sondern nachfragen: „Und wann hat dir das geholfen?“',
        danach: [beispiel('So kann es klingen', ['Finn:', 'Ausstellungsstück: ein Eiswürfel. Wenn die Wut bei 90 ist, holt Kälte dich runter. Hier, halt mal.'], ['Mia:', 'Boah, ist der kalt. Wie lange?'], ['Finn:', 'Bis du wieder denken kannst.'], ['', 'Mia legt eine Münze auf den Eiswürfel.'])],
      }),
    ),
    seite(
      material('Museumsschilder und Erinnerungshilfe', 3,
        tabelle('auto auto auto', ['Ausstellungsstück', 'Das ist es', 'Es hilft, wenn …'], [['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']], 15),
        karten(4, 15, 'Erinnerungshilfe – nicht ausschneiden. Was war dieses Jahr?', ERINNERN.map(([t, x]) => ({ t, x })))),
      pause(),
      fuerDich('meine Jahreskurve', '8 Min.', fragen('Sieht keiner. ' + (bleibt.moves[0].kontext ?? ''), ...bleibt.moves[0].fragen, satz('Ein Satz dazu:', 'Im September habe ich', 'Heute'))),
    ),
    seite(
      st('Post für die Neuen', '12 Min.', 'allein · ohne Namen', 'mailbox', 'Zettel oder Karteikarten verteilen. Einsammeln, ohne zu lesen, in einen Umschlag „Für die Neuen“. Im Herbst lesen Sie der neuen Gruppe in der ersten Stunde drei davon vor – auch eine mit „Das war Quatsch“.',
        text('Im Herbst sitzt hier eine neue Gruppe – genauso ahnungslos wie ihr im September. **Schreib ihr eine Karte, ohne Namen.** Nimm einen Zettel von der Leitung und fang so an:',
          '„Das stimmt wirklich über diesen Kurs: …“ · „Das war Quatsch: …“ · „Mein Tipp für den ersten Tag: …“')),
      schluss(bleibt, 'was Jana sieht', [kreuz('Lio hat dem Neuen seinen Skill gezeigt. Wem zeigst du deinen diese Woche?', 'jemandem zu Hause', 'einem Freund oder einer Freundin', 'jemandem aus Sport oder Verein', 'weiß ich noch nicht'), kreuz('Schau auf Station 1: Bist du noch genau wie im September?', 'ja', 'nein')], ['gezeigt']),
    ),
  )

  /* ---------- Stunde 4 · Letzte Stunde ---------- */
  const STAERKEN = ['hört zu', 'ist ehrlich', 'bringt andere zum Lachen', 'gibt nicht auf', 'ist mutig', 'hilft', 'bleibt ruhig', 'hat gute Ideen', 'ist fair', 'ist pünktlich', 'traut sich was', 'kann sich entschuldigen', 'ist da, wenn es brennt', 'sagt, was los ist', 'macht mit', 'ist geduldig']
  const s4 = stunde('Wie geht ein guter Abschied?', ['erklären, warum ein Abschied wehtun darf', 'anderen eine Stärke aufschreiben – und deine lesen', 'wissen, an wen du dich nach dem Kurs wendest'],
    seite(
      ankommen('Abschiede', kreuz('Wie hast du dich von der Grundschule verabschiedet?', 'richtig, mit allen', 'kurz', 'gar nicht – es war einfach vorbei'), strich('Wie geht es dir mit dem letzten Tag hier?', 'mies', 'gut')),
      fall(letzte, 'Chloé an der Tür', [
        kreuzU('Was verpasst Chloé, wenn sie umdreht?', 'das Tschüss – und was die anderen ihr sagen wollen', 'nichts'),
        kreuzU('Was ist passiert, als sie in der Grundschule einfach weggeblieben ist?', 'Sie hat sich den ganzen Sommer gefragt, was die anderen gesagt hätten.', 'Sie hat es sofort vergessen.'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Chloé an der Tür', 2, 'search', text('**Der Kloß im Hals ist ein Kompliment.** Wäre dir die Gruppe egal, wäre der Abschied es auch.'), reden('Wie verabschiedet ihr euch meistens – richtig, kurz oder gar nicht?')),
    ),
    seite(
      st('Für dich: Postkarte an mich', '10 Min.', 'allein', 'mail', 'Karten (A6) und Umschläge verteilen. Zugeklebt einsammeln, nicht lesen, sicher aufbewahren und in der ersten Stunde im Herbst zurückgeben. Wer dann in einer anderen Klasse ist, bekommt sie über die Klassenleitung.',
        text('Schreib an dich im Herbst – an dich in der 6e. **Die Leitung gibt dir eine Karte und einen Umschlag.** Niemand liest sie. Im Herbst bekommst du sie zurück.',
          'Fang so an – oder ganz anders: „Darauf bin ich stolz: …“ · „Das war hart, und ich bin noch da: …“ · „Das wünsche ich dir für die 6e: …“ · „Vergiss nicht: …“',
          'Fertig? Karte in den Umschlag, Namen drauf, zukleben. Zeichnen ist auch erlaubt.')),
      pause(),
      runde('die Stärken-Post', '28 Min.', 'alle', 'mail', {
        ziel: 'Jede Person geht mit einem Blatt voller Stärken nach Hause.',
        material: 'ein Blatt und Kreppband pro Person, Stifte, Musik, die Stärken-Liste von der nächsten Seite',
        schritte: [
          'Jede Person schreibt ihren Namen auf ein Blatt und klebt es an die Lehne ihres Stuhls.',
          'Musik an, alle gehen durch den Raum. Bei Stopp gehst du zum nächsten Stuhl, auf dessen Blatt du noch nichts geschrieben hast (nicht dein eigener), und schreibst **eine Stärke dieser Person**.',
          'Fällt dir nichts ein? Nimm eine Stärke aus der Liste – aber eine, die wirklich passt.',
          'Weiter, bis auf jedem Blatt von allen etwas steht. Gelesen wird erst am Schluss, jede Person still für sich.',
        ],
        regeln: ['Es werden nur Stärken geschrieben. Keine Witze, keine Spitznamen.'],
        zu3: 'Jede Person schreibt jeder zwei Stärken – auch die Leitung.',
        auswertung: ['Welche Stärke auf deinem Blatt hat dich überrascht?'],
      }, { leitung: 'Die Blätter kurz durchsehen, bevor sie gelesen werden. Sie schreiben auch auf jedes Blatt.', danach: [beispiel('So kann es klingen', ['', 'Die Musik stoppt. Ben steht an Leas Stuhl.'], ['Ben schreibt:', '„Du bleibst ruhig, wenn alle laut werden.“'], ['', 'Musik an – weiter, bis jedes Blatt voll ist.'])] }),
    ),
    seite(
      material('Stärken zum Abschreiben', 5, karten(4, 15, 'Nicht ausschneiden – nur als Hilfe, wenn dir kein Wort einfällt.', STAERKEN.map((t) => ({ t })))),
    ),
    seite(
      fuerDich('mein Netz', '6 Min.', fragen(null, ...letzte.moves[1].fragen)),
      (() => {
        const sc = schluss(letzte, 'der letzte Kreis', [strich('Schau auf Station 1. Wie geht es dir jetzt mit dem letzten Tag?', 'mies', 'gut')], ['Karten eingesteckt'])
        return { ...sc, zeit: '12 Min.', wie: 'alle · im Kreis', leitung: 'Ruhig ansagen. Erst die Übung, dann der Gegenstand. Am Ende sagen Sie jeder Person einen Satz – dann ist Schluss, ohne Zugabe.',
          bausteine: [text('**Wie am ersten Tag:** 5-4-3-2-1 – fünf Dinge sehen, vier spüren, drei hören, zwei riechen, eins schmecken. Derselbe Raum, dieselbe Übung.',
            '**Dann geht ein Gegenstand reihum.** Wer ihn hält, sagt einen Satz: „Ich nehme mit …“ Weitergeben ohne Satz ist erlaubt.'), ...sc.bausteine] }
      })(),
    ),
  )
  return [s1, s2, s3, s4]
}

/** Lösungen für die Leitung – passend zu den Stationen oben */
export const loesungen: string[][] = [
  [
    'Der Fall: Amira war um zehn im Bett, aber nicht müde – ihre innere Uhr geht nach. Geschlafen hat sie höchstens viereinhalb Stunden (1:50 bis 6:30).',
    'Schlaf-Linie: Frage 1 – viele 13-Jährige schlafen an Schultagen erst nach 22:30 Uhr ein. Bei Frage 3 (neun Stunden bis 6:30 Uhr) gehören alle auf 21:30 Uhr. Der Abstand zu Frage 1 ist die fehlende Nacht – nicht kommentieren, nur zeigen.',
    'Zimmer-Umbau, starke Züge: Handy und Ladekabel auf den Schreibtisch oder in den Flur (dafür den Wecker aus dem Regal ans Bett) · Vorhang zu · Energy-Drink weg (ab nachmittags kein Koffein) · Leuchtuhr umdrehen · Zettel und Stift ans Bett für Gedanken, die rattern. Konsole und Fernseher aus zählt auch. Jede gute Begründung zählt.',
    'Amira wehrt sich: „Ohne Handy kann ich nicht einschlafen“ – fühlt sich so an, aber Licht und neue Clips halten das Gehirn wach. · „Das Handy ist mein Wecker“ – echter Grund: den Wecker aus dem Regal nehmen oder das Handy so weit weg legen, dass sie morgens aufstehen muss. · „Am Wochenende schlafe ich alles nach“ – ein bisschen; bis mittags schlafen verstellt die Uhr noch weiter. · „Ich brauche eh nur fünf Stunden“ – aushalten ist nicht brauchen: Mit 13 sind es acht bis zehn.',
  ],
  [
    'Der Fall: Yusufs Tank – 7:20 halb, 10:00 und 12:30 eher leer (Energy-Drinks und Chips füllen nicht), 14:50 leer. Gebrüllt hat er selbst – mit leerem Tank kippt man schneller.',
    'Dein Tank: Yusuf und der Rempler – Hunger macht gereizt · Mia und die Treppe – zehn Minuten reichen · Ben ohne Wasser – Trinken zählt mit.',
    '10-Minuten-Test: Bei den meisten steigt der Akku ein Stück. Steigt er nicht, ist das auch ein Ergebnis – nicht kommentieren.',
    'Rucksack-Rennen: Lauf 2 ist fast immer schneller. Bleibt ein Buch drin, fragen: Wer könnte tragen helfen?',
    'Zweiter Versuch, zum Beispiel: Wasser und ein Brot statt Energy-Drinks · etwas Warmes zu Mittag · um 14:45 Uhr etwas essen, trinken und der Sportlehrerin sagen: „Ich bin heute leer.“',
  ],
  [
    'Der Fall: Lio setzt sich zu einem Neuen, erklärt einen Skill und hat mehr als zwei Wörter. Er merkt es nicht, weil es in kleinen Schritten kam – Jana hat zugeschaut.',
    'Jahres-Museum, Stücke aus dem Jahr: Regeln und 5-4-3-2-1 (#00) · Tank-Check (#01) · Wort-Leiter, Körper-Karte, Wut-Übersetzer (#02) · Druck-Zahl, Atem, Kälte, Ampelplan (#03) · Beweise prüfen, neuer Satz, Mut-Leiter (#04) · Wort-Schere, Stopp, Grenz-Skala (#05) · Hai oder Eule, Nein-Karten, Zuschauer (#06) · Wenn-dann, Bevor ich sende, Teilen-Bremse (#07).',
    'Jahreskurve: Die Leitung schaut nicht auf die Kurven. Keine Kurve geht nur nach oben – das darf man sagen, ohne auf einzelne Kurven zu zeigen.',
    'Post für die Neuen: Umschlag zukleben und beschriften. Im Herbst in der ersten Stunde drei Karten vorlesen – auch eine mit „Das war Quatsch“.',
  ],
  [
    'Der Fall: Chloé verpasst das Tschüss und das, was die anderen ihr sagen wollen. Nach der Grundschule blieb den ganzen Sommer etwas offen.',
    'Postkarte an mich: Karten und Umschläge mitbringen. Vorher klären, wer sie bis zum Herbst aufbewahrt und wie sie zu Jugendlichen kommen, die dann in einer anderen Klasse oder Schule sind.',
    'Stärken-Post: Die Blätter vorher durchsehen. Alte Abschiede können sich melden – wer still wird, braucht kurz jemanden neben sich.',
    'Mein Netz: nicht einsammeln, nicht nachschauen. Am Ende allen sagen, wo der SePAS sitzt und wann er da ist.',
  ],
]

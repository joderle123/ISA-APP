// REAL TALK #08 · AKKU – vier Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 ist eine Versteigerung, Stunde 2 ein Rennen mit vollem Rucksack, Stunde 3 ein Rückblick mit Karten aus dem ganzen
// Jahr, die letzte Stunde ein Abschied mit Stärken-Post und Brief. Stunde 3 kommt ohne Clip aus (der frühere passte nicht).
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, clip, fall, fragen, fuerDich, karten, kreuz, kreuzU, material, modell, runde, satz, schluss, seite, st, stimmtDas, stunde, strich, tabelle, text } from './stunden-hilfe'

const kreis = (f: string, ...l: string[]): Frage => ({ f, kreis: l })

export function stunden(d: Heft): Stunde[] {
  const [nacht, treib, bleibt, letzte] = d.tracks
  delete bleibt.clip

  /* ---------- Stunde 1 · Nachtmodus ---------- */
  const TIPPS: [string, boolean][] = [['Jeden Tag etwa zur gleichen Zeit ins Bett', true], ['Energy-Drink am Nachmittag macht abends müde', false], ['Zimmer kühl und dunkel', true], ['Handy im Bett: So schläft man schneller ein', false], ['Morgens zehn Minuten ans Tageslicht', true], ['Bis mittags schlafen gleicht alles aus', false], ['Handy weit weg vom Bett legen', true], ['Nachts immer wieder auf die Uhr schauen', false], ['Warme Dusche vor dem Bett', true], ['Ab dem Nachmittag kein Koffein mehr', true]]
  const s1 = stunde('Warum bist du müde – und was hilft wirklich?', ['erklären, warum Jugendliche abends spät müde werden', 'echte Schlaf-Tipps von Mythen unterscheiden', 'einen Schritt für deinen Abend festlegen'],
    seite(
      ankommen('deine Nacht', kreuz('Wie viele Stunden hast du letzte Nacht geschlafen?', 'unter 6', '6 bis 8', 'mehr als 8'), strich('Wie wach bist du gerade?', 'todmüde', 'hellwach')),
      st('Erst machen: 60 Sekunden', '4 Min.', 'alle gleichzeitig', 'clock', 'Zeit stoppen und leise notieren, wer sich wann setzt. Müde Köpfe schätzen oft daneben.',
        text('Alle stehen, Augen zu (wer mag) oder Blick auf den Boden. **Setz dich, wenn du glaubst, dass genau eine Minute um ist.** Wer ist am nächsten dran?')),
      fall(nacht, 'Nele um 1:50 Uhr', [
        kreuzU('Was weiß die Lehrerin nicht über Neles Nacht?', 'Nele war um zehn im Bett. Sie war nur nicht müde.', 'Nele war auf einer Party.'),
        kreuz('Wie viele Stunden hat Nele höchstens geschlafen?', 'etwa 4½', 'etwa 7', 'etwa 9'),
      ], { zeitleiste: [['22:00', 'Nele liegt im Bett. Nicht müde.'], ['1:50', 'Wach. Das Handy leuchtet.'], ['6:30', 'Der Wecker klingelt.'], ['1. Stunde', 'Der Kopf fällt auf den Tisch.']] }),
    ),
    seite(
      clip(nacht, 'Warum Teenies ausschlafen sollten', [kreuzU('Warum sind Jugendliche morgens so müde?', 'Ihre innere Uhr geht nach.', 'Sie sind faul.', 'weiß nicht')], ['Das passiert mit der inneren Uhr:', 'So viel Schlaf braucht man:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Was könnte Nele der Lehrerin erklären?', '„Ich war im Bett. Meine Uhr geht nach.“', '„Mir doch egal.“')]),
      modell(nacht, 'was nachts passiert', ['clock', 'moon', 'brain'], { zeit: '8 Min.' }),
      stimmtDas(nacht),
    ),
    seite(
      runde('die Schlaf-Auktion', '25 Min.', 'zwei Teams', 'gavel', {
        ziel: 'Herausfinden, welche Schlaf-Tipps echt sind – und für welche Mythen man leicht Geld ausgibt.',
        material: 'die 10 Tipp-Karten von der nächsten Seite (ausschneiden), die Tabelle unten',
        schritte: [
          'Jedes Team hat **100 Punkte**. Die Leitung versteigert die Tipps, einen nach dem anderen: „Wer bietet?“',
          'Bietet nur auf Tipps, die ihr für echt haltet. Das höchste Gebot bekommt die Karte. Schreibt auf, was ihr ausgegeben habt.',
          'Am Ende wird aufgedeckt: Jeder **echte Tipp bringt 30 Punkte**. Ein Mythos ist verbranntes Geld.',
          'Rechnet: Rest plus Gewinn. Wer hat mehr?',
        ],
        zu3: 'Jede Person bietet für sich mit 100 Punkten. Die Leitung versteigert.',
        wertung: { kopf: ['Punkte', 'ausgegeben', 'Rest', 'echte Tipps × 30', 'Summe'], zeilen: ['Team A', 'Team B'] },
        auswertung: ['Für welchen Mythos habt ihr am meisten bezahlt?', 'Welchen echten Tipp könnte Nele heute Abend ausprobieren?'],
      }, { leitung: 'Mythen sind die Karten 2, 4, 6 und 8. Erst nach der letzten Karte auflösen.' }),

    ),
    seite(
      material('10 Tipp-Karten', 6, karten(2, 14, 'Ausschneiden. Die Leitung versteigert sie der Reihe nach.', TIPPS.map(([t], i) => ({ t, marke: `Tipp ${i + 1}` })))),
      fuerDich('meine Nacht', '8 Min.', fragen('Sieht keiner.', kreis('Was hält dich wach? Kreise ein.', 'Handy', 'Gedanken', 'Zocken', 'Lärm', 'Sorgen', 'Koffein'),
        satz('Mein Plan für heute Abend – mit Uhrzeit und Ort:', 'Um ___ Uhr liegt mein Handy hier:'),
        kreuz('Rattert der Kopf im Bett, nehme ich:', '4 ein, 8 aus', 'Gedanken auf einen Zettel', '5-4-3-2-1'))),
      schluss(nacht, 'noch einmal: die Lehrerin', [kreuzU('Die Lehrerin sagt: „Geh halt früher ins Bett.“ Was stimmt?', 'Früher hinlegen reicht nicht – Licht, Handy und Koffein zählen auch.', 'Sie hat recht. Mehr braucht es nicht.'), strich('Schau auf Station 1. Wie wach willst du morgen früh sein?', 'todmüde', 'hellwach')], ['1', '2', '3']),
    ),
  )

  /* ---------- Stunde 2 · Treibstoff ---------- */
  const STRESS = ['zu wenig Schlaf', 'kein Frühstück', 'Streit zu Hause', 'Ärger in der Schule', 'kein Geld', 'Handy bis nachts', 'zwei Energy-Drinks', 'den ganzen Tag gesessen', 'Sorgen, über die ich nicht rede', 'zu viele Termine', 'allein essen', 'keine Pause']
  const s2 = stunde('Was hat dein Tank mit deiner Laune zu tun?', ['erklären, warum ein leerer Tank gereizt macht', 'sagen, was dich auflädt und was dich leer zieht', 'einen Mini-Schritt für vier Tage festlegen'],
    seite(
      ankommen('dein Akku', strich('Wie voll ist dein Akku gerade?', 'leer', 'voll'), kreuz('Was hast du heute schon gegessen?', 'richtig gefrühstückt', 'eine Kleinigkeit', 'nichts')),
      st('Erst machen: der Akku-Würfel', '6 Min.', 'alle gleichzeitig', 'dice', 'Dreimal würfeln. Alle machen dasselbe, auch Sie. Wer nicht mag, schaut aus dem Fenster.',
        text('Die Leitung würfelt dreimal. Alle machen mit: **1** ein Glas Wasser · **2** Fenster auf, drei Atemzüge · **3** einmal den Flur entlang · **4** zehn Kniebeugen · **5** 30 Sekunden Lieblingssong · **6** freie Wahl.')),
      fall(treib, 'Yusuf und die Kiste', [
        kreuzU('Was hat Yusufs Ausraster mit seinem Tag zu tun?', 'Sein Tank war leer. Sein Körper war im Stress.', 'nichts'),
        kreuzU('Der Chef sagt: „Du hast ein Problem mit deiner Art.“ Stimmt das?', 'Nicht ganz. Gebrüllt hat Yusuf – aber mit leerem Tank kippt man viel schneller.', 'Ja.'),
      ], { zeitleiste: [['morgens', 'verschlafen, kein Frühstück, ein Energy-Drink'], ['Pause', 'noch ein Energy-Drink'], ['mittags', 'eine Tüte Chips'], ['14:50', 'Eine Kiste steht im Weg. Yusuf brüllt.']] }),
    ),
    seite(
      clip(treib, 'Was Bewegung mit dem Kopf macht', [kreuzU('Was macht Bewegung mit dem Kopf?', 'Sie hebt die Stimmung.', 'Sie macht nur müde.', 'nichts')], ['Das passiert im Gehirn:', 'So viel reicht schon:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Was hätte Yusuf um 14:45 Uhr tun können?', 'etwas essen und fünf Minuten gehen', 'noch einen Energy-Drink trinken')]),
      modell(treib, 'dein Tank', ['battery-1', 'walk', 'heart'], { zeit: '8 Min.' }),
      fuerDich('mein Akku', '6 Min.', fragen(null, treib.moves[0].fragen[0])),
    ),
    seite(
      runde('das Rucksack-Rennen', '25 Min.', 'zwei Teams', 'backpack', {
        ziel: 'Spüren, wie viel man mit sich herumträgt – und was passiert, wenn etwas rauskommt.',
        material: 'die 12 Stress-Karten von der nächsten Seite, zwei Rucksäcke, zwölf Bücher oder volle Flaschen, ein kurzer Weg mit zwei Stühlen als Wendepunkt, Stoppuhr',
        schritte: [
          'Packt den Rucksack: Jede Stress-Karte kommt in ein Buch – und das Buch in den Rucksack. Sechs pro Team.',
          '**Lauf 1:** Staffel um den Wendepunkt, mit vollem Rucksack. Die Leitung stoppt die Zeit.',
          'Jetzt entlasten: Für jede Idee, die bei einem Stress wirklich hilft, kommt ein Buch raus. Schreibt die Idee auf die Karte. Drei Minuten.',
          '**Lauf 2:** noch einmal laufen. Vergleicht die Zeiten.',
        ],
        regeln: ['Gehen statt rennen ist erlaubt. Wer nicht tragen kann oder mag, stoppt die Zeit.'],
        zu3: 'Ein Team, ein Rucksack. Lauf 2 geht gegen eure Zeit aus Lauf 1.',
        wertung: { kopf: ['Zeit', 'Lauf 1 · voll', 'Bücher raus', 'Lauf 2'], zeilen: ['Team A', 'Team B'] },
        auswertung: ['Welches Buch würdet ihr im echten Leben zuerst rausnehmen?', 'Welches Buch bleibt drin – und wer könnte tragen helfen?'],
      }),
      fuerDich('mein Tag, zweiter Versuch', '6 Min.', fragen('Wie bei Yusuf: ein Tag, an dem du gekippt bist – oder jemand, den du kennst. Sieht keiner.',
        kreis('Was war an dem Tag leer? Kreise ein.', 'Schlaf', 'Essen', 'Trinken', 'Bewegung', 'Pause', 'jemand zum Reden'),
        kreuz('Wann ist es gekippt?', 'morgens', 'mittags', 'nachmittags', 'abends'),
        satz('Mein Mini-Schritt – eine Stunde vorher:', 'Wenn es ___ Uhr ist, dann'))),
    ),
    seite(
      material('12 Stress-Karten', 5, karten(4, 17, 'Ausschneiden. Jede Karte kommt in ein Buch.', STRESS.map((t) => ({ t })))),
      schluss(treib, 'Yusuf um 14:45', [kreuzU('Bevor du das nächste Mal streitest: Was prüfst du zuerst?', 'meinen Tank: gegessen, getrunken, geschlafen?', 'wer schuld ist'), strich('Schau auf Station 1. Wie voll ist dein Akku jetzt?', 'leer', 'voll')], ['1', '2', '3', '4']),
    ),
  )

  /* ---------- Stunde 3 · Was bleibt ---------- */
  const JAHR = ['die Zahl von 0 bis 100', 'der Becherturm', 'das kalte Wasser', 'der blaue Elefant', 'Hai und Eule', 'zwei blaue Haken', 'eine Tasse Tee', 'die Bühne', '„ok.“', 'das Steuerpult', 'die Tanks', 'die Mut-Leiter', 'der Schwarm', 'die Screenshot-Kette', '4 ein, 8 aus', 'Stopp mit Hand']
  const s3 = stunde('Was hat sich verändert – auch wenn du es nicht merkst?', ['erklären, warum man die eigene Veränderung schwer sieht', 'dein Jahr als Kurve zeichnen', 'drei Skills nennen, die bleiben'],
    seite(
      ankommen('du am ersten Tag', kreuz('Bist du noch genau wie am ersten Tag?', 'ja', 'nein', 'weiß nicht'), kreuz('Was merkt man leichter?', 'Veränderung bei anderen', 'Veränderung bei sich selbst')),
      fall(bleibt, 'Lio und der Neue', [
        kreis('Was kann Lio heute, was er am ersten Tag nicht konnte? Kreise ein.', 'sich zu einem Neuen setzen', 'einen Skill erklären', 'mehr als zwei Wörter für Gefühle', 'zaubern'),
        kreuzU('Warum merkt Lio seine Veränderung nicht?', 'Sie kam in kleinen Schritten. Er war jeden Tag dabei.', 'Weil sich nichts verändert hat.'),
      ]),
      modell(bleibt, 'wie Veränderung aussieht', ['trending-up', 'arrow-back-up', 'heart-handshake']),
    ),
    seite(
      fuerDich('meine Jahreskurve', '12 Min.', fragen(bleibt.moves[0].kontext ?? null, ...bleibt.moves[0].fragen)),
      stimmtDas(bleibt, '6 Min.'),
      st('Zu zweit: mein Skill zum Mitnehmen', '8 Min.', 'allein · dann zu zweit', 'arrows-exchange', 'Erst still ankreuzen. Dann erklären alle Paare gleichzeitig ihren Skill Nummer eins, je eine Minute – wie Lio dem Neuen. Bei ungerader Zahl ein Dreier.',
        fragen(null, bleibt.moves[1].fragen[0],
          satz('So erkläre ich meinen Skill Nummer eins:', 'Er heißt … und geht so:', 'Er hilft, wenn'),
          kreuz('Wem zeigst du ihn diese Woche?', 'Familie', 'Freund oder Freundin', 'jemand in der Wohngruppe', 'weiß ich noch nicht'))),
    ),
    seite(
      runde('das Jahr in 16 Karten', '25 Min.', 'zwei Teams · am Tisch', 'cards', {
        ziel: 'Sich erinnern, was ihr gelernt habt – und entscheiden, was bleibt.',
        material: 'die 16 Jahres-Karten von der nächsten Seite (ausschneiden), eine Münze pro Person, Papier, Stifte',
        schritte: [
          '**Teil 1 · Blitz:** Eine Karte wird aufgedeckt. Welches Team sagt zuerst, was ihr damit gelernt habt? 1 Punkt. Weiß es niemand: Die Leitung hilft, kein Punkt.',
          '**Teil 2 · mein Stück:** Alle 16 Karten liegen offen. Jede Person legt ihre Münze auf die Karte, die ihr am meisten gebracht hat.',
          '**Teil 3 · für die Neuen:** Schreibt zu zweit oder zu dritt drei Sätze für die nächste Gruppe: Was stimmt wirklich über diesen Kurs? Einer darf sagen, was Quatsch war.',
        ],
        regeln: ['Niemand muss erklären, warum seine Münze wo liegt.'],
        zu3: 'Alle zusammen gegen die Uhr: Schafft ihr zehn Karten in vier Minuten?',
        wertung: { kopf: ['Punkte', 'Teil 1 · Blitz'], zeilen: ['Team A', 'Team B'] },
        auswertung: ['Auf welcher Karte liegen die meisten Münzen?', 'Welchen Satz hättet ihr am ersten Tag gebraucht?'],
      }, { leitung: 'Die Zettel „für die Neuen“ aufheben. Karten, die nicht behandelt wurden, vorher aussortieren.' }),
    ),
    seite(
      material('16 Jahres-Karten', 5, karten(4, 17, 'Ausschneiden, mischen, verdeckt stapeln.', JAHR.map((t) => ({ t })))),
      schluss(bleibt, 'was Jana sieht', [kreuzU('Jana sagt: „Vor einem Jahr hättest du das nie gemacht.“ Wen kannst du fragen, was sich bei dir verändert hat?', 'jemanden aus der Gruppe', 'niemanden – das merke ich selbst'), kreuz('Schau auf Station 1: Bist du noch genau wie am ersten Tag?', 'ja', 'nein')], ['gezeigt']),
    ),
  )

  /* ---------- Stunde 4 · Letzte Stunde ---------- */
  const STAERKEN = ['hört zu', 'ist ehrlich', 'bringt andere zum Lachen', 'gibt nicht auf', 'ist mutig', 'hilft', 'bleibt ruhig', 'hat gute Ideen', 'ist fair', 'ist pünktlich', 'traut sich was', 'kann sich entschuldigen', 'ist da, wenn es brennt', 'sagt, was los ist', 'macht mit', 'ist geduldig']
  const s4 = stunde('Wie geht ein guter Abschied?', ['erklären, warum ein Abschied wehtun darf', 'anderen eine Stärke aufschreiben – und deine lesen', 'einen Brief an dich selbst schreiben'],
    seite(
      ankommen('Abschiede', kreuz('Wie sind Abschiede für dich?', 'leicht', 'schwer', 'ich verschwinde lieber'), strich('Wie geht es dir mit dem letzten Tag?', 'mies', 'gut')),
      fall(letzte, 'Chloé an der Tür', [
        kreuzU('Was verpasst Chloé, wenn sie umdreht?', 'das Tschüss – und was die anderen ihr sagen wollen', 'nichts'),
        kreuzU('Was ist beim letzten Mal passiert, als sie einfach verschwunden ist?', 'Sie hat sich drei Monate lang gefragt, was die anderen gesagt hätten.', 'Sie hat es sofort vergessen.'),
      ]),
      modell(letzte, 'warum es schwer ist', ['heart', 'history', 'gift']),
    ),
    seite(
      clip(letzte, 'Ein Mittel gegen Unzufriedenheit', [kreuzU('Was macht zufriedener?', 'mehr haben', 'Danke sagen', 'weiß nicht')], ['Das Mittel aus dem Clip:', 'So wirkt es:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Was bringt ein Danke am letzten Tag?', 'Es tut beiden gut – und es bleibt.', 'nichts, es ist nur peinlich')]),
      fuerDich('Brief an mich', '12 Min.', fragen(letzte.moves[0].kontext ?? null, ...letzte.moves[0].fragen)),
    ),
    seite(
      runde('die Stärken-Post', '25 Min.', 'alle', 'mail', {
        ziel: 'Jede Person geht mit einem Blatt voller Stärken nach Hause.',
        material: 'ein Blatt und Klebeband pro Person, Stifte, Musik, die Stärken-Liste von der nächsten Seite',
        schritte: [
          'Jede Person schreibt ihren Namen auf ein Blatt und klebt es an die Lehne ihres Stuhls.',
          'Musik an, alle gehen durch den Raum. Bei Stopp gehst du zum nächsten Stuhl, auf dessen Blatt du noch nichts geschrieben hast (nicht dein eigener), und schreibst **eine Stärke dieser Person**.',
          'Fällt dir nichts ein? Nimm eine Stärke aus der Liste – aber eine, die wirklich passt.',
          'Weiter, bis auf jedem Blatt von allen etwas steht. Gelesen wird erst am Schluss, jede Person still für sich.',
          '**Der letzte Kreis** (ganz am Ende, nach dem Schluss): Ein Gegenstand geht reihum. Wer ihn hält, sagt einen Satz: „Ich nehme mit …“ Weitergeben ohne Satz ist erlaubt.',
        ],
        regeln: ['Es werden nur Stärken geschrieben. Keine Witze, keine Spitznamen.'],
        zu3: 'Jede Person schreibt jeder zwei Stärken – auch die Leitung.',
        auswertung: ['Welche Stärke auf deinem Blatt hat dich überrascht?'],
      }, { leitung: 'Die Blätter kurz durchsehen, bevor sie gelesen werden. Den letzten Kreis erst ganz am Ende machen, nach Station 9. Dann sagen Sie jeder Person einen Satz – Schluss, ohne Zugabe.' }),
      st('Wie am ersten Tag: 5-4-3-2-1', '5 Min.', 'alle · still', 'eye', 'Leise ansagen. Danach fragen: Was ist heute anders als am ersten Tag?',
        text('Am ersten Tag habt ihr 5-4-3-2-1 gemacht. Jetzt noch einmal: **fünf** Dinge sehen, **vier** spüren, **drei** hören, **zwei** riechen, **eins** schmecken. Derselbe Raum, dieselbe Übung.')),
    ),
    seite(
      material('Stärken zum Abschreiben', 5, karten(4, 15, 'Nicht ausschneiden – nur als Hilfe, wenn dir kein Wort einfällt.', STAERKEN.map((t) => ({ t })))),
      fuerDich('mein Netz', '6 Min.', fragen(null, ...letzte.moves[1].fragen)),
      schluss(letzte, 'die Hand auf der Klinke', [kreuzU('Chloé drückt die Klinke und geht hinein. Was hat sie diesmal?', 'ein Tschüss, ein Blatt voller Stärken, kein offenes Ende', 'nur einen Kloß im Hals'), strich('Schau auf Station 1. Wie geht es dir jetzt mit dem letzten Tag?', 'mies', 'gut')], ['Karten eingesteckt']),
    ),
  )
  return [s1, s2, s3, s4]
}

/** Lösungen für die Leitung – passend zu den Stationen oben */
export const loesungen: string[][] = [
  [
    'Der Fall: Nele war um zehn im Bett, aber nicht müde – ihre innere Uhr geht nach. Geschlafen hat sie höchstens viereinhalb Stunden (1:50 bis 6:30).',
    'Schlaf-Auktion: Mythen sind die Tipps 2 (Energy-Drink), 4 (Handy im Bett), 6 (Wochenende) und 8 (auf die Uhr schauen). Alle anderen sind echt.',
  ],
  [
    'Der Fall: Yusufs Tank war leer – seit dem Vorabend nichts Richtiges gegessen, dazu zwei Energy-Drinks. Gebrüllt hat er selbst – aber mit leerem Tank kippt man viel schneller.',
    'Rucksack-Rennen: Lauf 2 ist fast immer schneller. Manche Bücher bleiben drin – dann hilft, wenn jemand tragen hilft.',
    'Zweiter Versuch, zum Beispiel: Wasser und ein Brot · etwas Warmes zu Mittag · um 14:45 Uhr fünf Minuten raus.',
  ],
  [
    'Der Fall: Lio setzt sich zu einem Neuen, erklärt einen Skill und hat mehr als zwei Wörter. Er merkt es nicht, weil es in kleinen Schritten kam.',
    'Das Jahr in 16 Karten: Zahl – Druck messen · Becherturm – ruhige Hand, Ping · kaltes Wasser – starker Reiz · Elefant – Wegdrücken macht stärker · Hai und Eule – Streit-Typen · Haken – Film im Kopf · Tee – Einverständnis · Bühne – Zuschauer · „ok.“ – Kanäle · Steuerpult – Gefühle · Tanks – Energie · Mut-Leiter – kleine Schritte · Schwarm – Gruppendruck · Kette – nichts bleibt privat · 4–8 – Atmen · Stopp – Grenze.',
  ],
  [
    'Der Fall: Chloé verpasst das Tschüss und das, was die anderen ihr sagen wollen. Beim letzten Mal blieb drei Monate etwas offen.',
    'Stärken-Post: Die Blätter vorher durchsehen. Alte Abschiede können sich melden – wer still wird, braucht kurz jemanden neben sich.',
    'Brief an mich: einen Umschlag pro Person mitbringen, zukleben, Namen darauf. Vorher klären, wer die Briefe sechs Monate aufbewahrt und wie sie zu Jugendlichen kommen, die dann nicht mehr in der Einrichtung sind.',
  ],
]

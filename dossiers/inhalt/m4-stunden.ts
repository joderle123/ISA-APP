// REAL TALK #04 · GEDANKEN – vier Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 ist ein Lege-Spiel (zwei Filme zu einer Situation), Stunde 2 eine geheime Zählung, Stunde 3 eine Ermittlung
// mit Hinweisen im Raum, Stunde 4 eine Leiter aus kleinen Schritten – mit einem echten Schritt am Ende.
// Umbau 27.11.2026 nach fünf jugendlichen Kritikern: Stunde 1 mit der Wie-wahrscheinlich-Linie auf dem Boden, Stunde 2 mit
// dem Satz-Umbau (Freundes-Satz über den alten kleben), Stunde 3 neu: „Wiegt das was?“ – eine Lineal-Wippe, auf die nur
// Beweise Münzen legen (ersetzt den Hinweis-Rundgang, ein Arbeitsblatt im Gehen). Stunde 4: Mut-Leiter auf dem Boden.
// Ein Clip im Heft (Stunde 4), Pausen, keine Praktikums- und Mopedwelt mehr – Lio ist 12.
// Runde 3 (27.11.2026): Stunde 1 neu – Fall Ben, „die Kette“ auf dem Boden (Sache → Gedanke → Gefühl), die Linie mit einer
// neuen Info, „mein zweiter Film“; raus: „Kennst du das?“ (wie in #01) und „zwei Filme mit Münze“ (dieselben Paare noch einmal).
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, beispiel, blasen, clip, fall, fragen, fuerDich, karten, kennstDu, kreuz, kreuzU, material, modell, raster, reden, runde, satz, schluss, seite, st, stimmtDas, stunde, strich, tabelle, text, verbinden, weiter, pause } from './stunden-hilfe'

const kreis = (f: string, ...l: string[]): Frage => ({ f, kreis: l })

export function stunden(d: Heft): Stunde[] {
  const [film, alte, beweise, neuer] = d.tracks
  // Der Clip über Glaubenssätze passt zu Stunde 2 („Alte Sätze“), nicht zu Stunde 1. Der frühere Clip von Stunde 2
  // (Hochstapler-Gefühl) passte nicht zum Fall und entfällt. Stunde 1 kommt ohne Clip aus.

  /* ---------- Stunde 1 · Film im Kopf ---------- */
  const PAARE: [string, string, string, string][] = [
    ['Gelesen. Keine Antwort.', 'Sie hat keinen Bock auf mich.', 'Sie hat gerade keine Zeit.', 'Ihr Akku war seit Mittag leer.'],
    ['Zwei tuscheln und schauen zu dir.', 'Die lästern über mich.', 'Die reden über irgendwas.', 'Dann zeigen sie dir ein Video von ihrem Hund.'],
    ['Der Lehrer sagt: „Komm nach der Stunde zu mir.“', 'Jetzt gibt es Ärger.', 'Vielleicht will er nur etwas fragen.', 'Er fragt, ob du beim Schulfest hilfst.'],
    ['Du bist nicht zur Party eingeladen.', 'Keiner will mich dabeihaben.', 'Es war nur Platz für wenige.', 'Es war ein Geburtstag nur mit Familie.'],
    ['Dein Freund geht ohne Gruß an dir vorbei.', 'Er ist sauer auf mich.', 'Er hat mich nicht gesehen.', 'Er hatte Kopfhörer drin und schaute aufs Handy.'],
    ['Du bekommst den Test zurück: 22 von 60.', 'Ich bin dumm.', 'Diesmal habe ich zu wenig geübt.', 'Die halbe Klasse hat unter 30.'],
    ['Jemand lacht, als du reinkommst.', 'Die lachen über mich.', 'Da war gerade ein Witz.', 'Auf dem Handy lief gerade ein Katzenvideo.'],
    ['Der Trainer sagt nach dem Spiel nichts zu dir.', 'Ich war schlecht.', 'Er hatte den Kopf woanders.', 'Am Samstag stellt er dich wieder auf.'],
  ]
  const s1 = stunde('Was macht dir die Laune kaputt – die Sache oder dein Gedanke?', ['zeigen, dass zwischen Sache und Gefühl ein Gedanke sitzt', 'zu einer Sache zwei Gedanken finden', 'mit einer neuen Info umdenken'],
    seite(
      ankommen('dein erster Gedanke', kreuzU('Jemand antwortet nicht auf deine Nachricht. Was denkst du zuerst?', '„Der hat keine Zeit.“', '„Der mag mich nicht mehr.“', '„Mir egal.“'), strich('Wie ist deine Laune gerade?', 'mies', 'gut')),
      fall(film, 'Ben und die zwei blauen Haken', [
        kreuzU('Was wusste Ben **sicher**?', 'Mila hat die Nachricht gelesen.', 'Mila hat keinen Bock auf ihn.', 'Mila lacht über ihn.'),
        kreuz('Was hat Ben den Abend verdorben?', 'Mila', 'sein Film im Kopf', 'beides ein bisschen'),
      ], { zeit: '12 Min.', leitung: 'Vorlesen wie einen Chat: die Nachricht, dann Bens Gedanken. Erst ankreuzen, dann die Sprechblase.' }),
    ),
    seite(
      weiter('Der Fall: Ben und die zwei blauen Haken', 2, 'device-mobile-message',
        blasen(['18:02 · Ben', '„Gehst du Samstag mit ins Kino?“'], ['', '✓✓ gelesen'], ['~Ben, 18:12', 'Sie hat keinen Bock mehr auf mich.'], ['~Ben, 18:22', 'Sie lacht gerade über meine Nachricht.'], ['', '18:32 – Ben löscht den Chat.'], ['20:30 · Mila', '„Sorry, war beim Training. Klar, wann?“']),
        reden('Was macht ihr, wenn eine Antwort nicht kommt – warten, nachschreiben, löschen?')),
      st('Erst legen: die Kette', '12 Min.', 'alle · am Boden', 'arrow-right', 'Drei Blätter auf den Boden: SACHE → GEDANKE → GEFÜHL. Die Karten nach Sachen sortiert bereithalten. Die erste Sache legen Sie selbst. Nur zeigen lassen, nicht diskutieren – das kommt bei der Linie.',
        text('Auf dem Boden liegen drei Blätter: **SACHE → GEDANKE → GEFÜHL.** Die Leitung legt eine Sache hin, zum Beispiel „Gelesen. Keine Antwort.“ Eine Person legt den **dunklen Gedanken** dazu. Alle zeigen mit dem Daumen: **Laune hoch oder runter?** Dann kommt der **andere Gedanke** obendrauf – alle zeigen neu. Drei Sachen.'),
        fragen(null, kreuzU('Die Sache ist gleich geblieben. Was hat die Laune geändert?', 'der Gedanke', 'die Sache', 'gar nichts')),
        reden('Wann merkt ihr den Gedanken zwischen Sache und Gefühl – sofort, später oder gar nicht?')),
      pause(),
    ),
    seite(
      runde('die Wie-wahrscheinlich-Linie', '35 Min.', 'alle · im Raum', 'chart-line', {
        ziel: 'Merken: Der dunkle Gedanke fühlt sich an wie 100 Prozent – und eine neue Info kann ihn kippen.',
        material: 'Klebeband für eine Linie auf dem Boden mit drei Zetteln: 0 % · 50 % · 100 %; die neuen Infos (bringt die Leitung mit)',
        schritte: [
          'Die Leitung liest eine Sache und den **dunklen Gedanken** vor. Alle stellen sich gleichzeitig auf die Linie: Wie wahrscheinlich stimmt der Gedanke?',
          '**Neue Info:** Die Leitung liest vor, was man später erfährt. Alle stellen sich neu auf.',
          'Die Gruppe erfindet einen **dritten Gedanken**, der auch stimmen könnte. Wo steht der?',
          'So geht es durch alle acht Sachen. Wer mag, sagt, warum er umgezogen ist.',
        ],
        regeln: ['Ihr stellt euch für Ben und die anderen – nicht für euch selbst.', 'Umstellen ist erlaubt. Keine Punkte.'],
        zu3: 'Die Leitung stellt sich mit auf die Linie.',
        notiz: { titel: 'Am weitesten bin ich umgezogen bei:', linien: 1 },
        auswertung: ['Der dunkle Gedanke fühlt sich an wie 100 Prozent. Wie viel blieb nach der neuen Info übrig?', 'Bei welcher Sache war es am schwersten, umzuziehen – obwohl die Info klar war?'],
      }, { leitung: 'Sache, dunkler Gedanke, dann die neue Info (Kopiervorlage) vorlesen. Es wird gestritten, wer bei 80 steht – genau das ist das Gespräch.',
        danach: [beispiel('So sieht eine Runde aus', ['Leitung:', '„Gelesen. Keine Antwort.“ – „Sie hat keinen Bock auf mich.“'], ['', 'Drei stehen bei 70, Amira bei 20.'], ['Leitung:', 'Neue Info: „Ihr Akku war seit Mittag leer.“'], ['', 'Alle ziehen nach unten. Nur Finn bleibt bei 50: „Kann ja trotzdem sein.“'])] }),
    ),
    seite(
      { ...material('8 Sachen, 16 Gedanken, 8 neue Infos', 3,
        karten(4, 20, 'Die Sachen: ausschneiden und nach Sachen sortieren.', PAARE.map(([t]) => ({ t, marke: 'Sache' }))),
        karten(4, 16, 'Die Gedanken: ausschneiden und zu ihrer Sache legen.', PAARE.flatMap(([t, a, b]) => [{ t: `„${a}“`, marke: 'dunkel' }, { t: `„${b}“`, marke: 'anders' }])),
        karten(4, 16, 'Die neuen Infos für die Linie – liest die Leitung vor.', PAARE.map(([t, , , i]) => ({ t: i, x: t, marke: 'neue Info' })))), wie: 'zu Station 3 und 5' },
      fuerDich('mein zweiter Film', '8 Min.', fragen('Ein Moment, der dir zuletzt die Laune verdorben hat. Nur für dich – keiner sieht es.', satz('Mein zweiter Film:', '„Vielleicht'), satz('Und eine Info, die ich noch nicht kenne – wen könnte ich fragen?', ''))),
      schluss(film, 'Bens zweiter Film', [kreuzU('Schau auf Station 1. Dein erster Gedanke war:', 'einer, der runterzieht', 'einer, der auch stimmen könnte')], ['gefangen']),
    ),
  )

  /* ---------- Stunde 2 · Alte Sätze ---------- */
  const SAETZE = ['Ich bin nicht gut genug.', 'Mich mag eh keiner.', 'Ich darf keine Fehler machen.', 'Ich muss stark sein.', 'Ich bin zu viel.', 'Ich bin dumm.', 'Auf mich hört keiner.', 'Ich mache immer alles kaputt.', 'Ich muss es allen recht machen.', 'Ich schaffe das eh nicht.', 'Ich bin anders als die anderen.', 'Ich störe nur.']
  const s2 = stunde('Woher kommen die Sätze, die du über dich glaubst?', ['erklären, dass Sätze über dich gelernt sind', 'einen alten Satz hinter einem Verhalten erkennen', 'sagen, was ein Satz kostet'],
    seite(
      ankommen('Sätze, die bleiben', kreuz('Hat dir mal jemand einen Satz gesagt, der hängen geblieben ist?', 'ja', 'nein', 'weiß nicht'), strich('Wie redest du mit dir selbst, wenn etwas schiefgeht?', 'hart', 'freundlich')),
      fall(alte, 'Lea und der Satz vom Abendessen', [
        kreuzU('Wie heißt der Satz, der bei Lea eingezogen ist?', '„Ich bin zu viel.“', '„Ich bin dumm.“', '„Ich bin allein.“'),
        kreis('Woran sieht man den Satz heute? Kreise ein.', 'Hand vor dem Mund', '„Ach, egal.“', 'sie lacht laut', 'sie erzählt viel'),
        kreuzU('Der Stiefvater hat es gesagt. Stimmt der Satz deshalb?', 'Nein. Er war genervt – der Satz war falsch.', 'Vielleicht. Er kennt sie ja.'),
      ], { zeit: '12 Min.', leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Lea und der Satz vom Abendessen', 2, 'search', reden('Wer hat den Satz gesagt – und wer sagt ihn heute?', 'Welche Sätze hört man oft – auf dem Hof, im Sport, im Netz? Welche bleiben hängen?')),
    ),
    seite(
      runde('die geheime Zählung', '35 Min.', 'alle · geheim', 'box', {
        ziel: 'Sehen: Fast alle kennen dieselben Sätze. Niemand ist damit allein.',
        material: 'die 12 Satz-Karten von der nächsten Seite, pro Person ein Zettel mit den Zahlen 1 bis 12, eine Schachtel, Stifte',
        schritte: [
          'Die zwölf Sätze liegen offen auf dem Tisch. **Wette zu zweit:** Welche drei Sätze kennen die meisten hier? Schreibt die Nummern auf.',
          'Dann jede Person für sich, verdeckt: Kreise auf deinem Zettel die Nummern der Sätze ein, die du von dir kennst. Kein Name.',
          'Zettel falten und in die Schachtel. Die Leitung mischt, zählt und macht Striche neben die Sätze.',
          'Welche drei Sätze haben die meisten Striche? Wie viele davon standen in eurer Wette?',
        ],
        regeln: ['Die Zettel bleiben geheim. Niemand fragt, wer was eingekreist hat.', 'Auch die Leitung wirft einen Zettel ein. Es gibt keine Punkte.'],
        zu3: 'Die Wette macht ihr zusammen. Alle – auch die Leitung – werfen zwei Zettel ein: einen eigenen und einen für „jemanden, den ich kenne“. So bleibt es geheim.',
        runden: [{ t: 'Danach · Freundes-Sätze', x: 'Nehmt den Satz mit den meisten Strichen. Sammelt zwei Minuten lang Sätze, die eine gute Freundin jetzt sagen würde. Bei jedem Satz zeigen alle: Kann man ihn glauben? Daumen hoch oder quer.' }],
        auswertung: ['Hättet ihr gedacht, dass so viele denselben Satz kennen?', 'Warum sind wir zu Freunden netter als zu uns selbst?'],
      }, { leitung: 'Zettel vorbereiten. Selbst einen einwerfen. Nach dem Zählen die Zettel sofort wegwerfen.', danach: [beispiel('So kann es klingen', ['Leitung zählt:', '„Ich bin nicht gut genug.“ – sechs Striche.'], ['Finn:', 'Echt? Ich dachte, das kenn nur ich.'], ['Sara, wie eine Freundin:', '„Du musst nicht perfekt sein, um dazuzugehören.“'], ['', 'Alle zeigen: Daumen hoch.'])] }),
    ),
    seite(
      material('12 Sätze', 3,
        karten(3, 19, 'Ausschneiden und offen auf den Tisch legen. Die Nummer gehört dazu.', SAETZE.map((t, i) => ({ t: `„${t}“`, marke: `Satz ${i + 1}` })))),
      pause(),
      st('Der Satz-Umbau', '18 Min.', 'allein', 'scissors', 'Sagen Sie: „Ihr müsst den neuen Satz nicht glauben. Er muss nur stimmen.“ Eine leere 13. Karte bereithalten: Gibt es einen Spruch über eure Klasse? Nur wenn die Gruppe ihn selbst nennt, wird er aufgeschrieben.',
        text('Nimm eine Satz-Karte – es muss nicht deine sein. Schreib auf einen Papierstreifen den Satz, den eine **gute Freundin** sagen würde – und der **stimmt.** Kleb ihn über den alten Satz. Die Karte gehört dir.'),
        fragen(null, kreis('Was kostet der alte Satz? Kreise ein.', 'Spaß', 'Freunde', 'meine Stimme', 'Ruhe', 'Chancen'))),    ),
    seite(
      schluss(alte, 'der Satz wohnt noch da', [kreuzU('Lea will etwas erzählen und sagt wieder „Ach, egal“. Was könnte sie sich sagen?', '„Der Satz ist gelernt. Er stimmt nicht.“', '„Ich bin halt zu viel.“'), strich('Schau auf Station 1. Wie willst du mit dir reden, wenn etwas schiefgeht?', 'hart', 'freundlich')], ['gefunden']),
    ),
  )

  /* ---------- Stunde 3 · Wiegt das was? (neu 27.11.2026) ---------- */
  // Raus: Akte-Lio-Raster, Modell-Raster, Debattier-Clip, Hinweis-Rundgang (dreimal dasselbe Sortieren, „Ermittlung“ – zu schwer).
  // Neu: Eine Lineal-Wippe. Nur Beweise bekommen eine Münze. Gefühle und Meinungen sind laut, aber wiegen nichts.
  const LIO: [string, string][] = [['22 von 60 Punkten im Mathetest.', 'Beweis'], ['Sieben Punkte mehr als beim letzten Test.', 'Beweis'], ['Repariert jedes Fahrrad im Viertel.', 'Beweis'], ['Durfte beim Schulfest allein an die Kasse.', 'Beweis'], ['Hat im Test drei Aufgaben nicht verstanden.', 'Beweis'], ['Erklärt seiner Schwester die Uhr.', 'Beweis'], ['Fühlt sich dumm.', 'Gefühl'], ['Der Cousin sagt: „Du checkst nichts.“', 'Meinung'], ['„Alle denken, Lio ist faul.“', 'Meinung'], ['Lio sagt: „War ja klar.“', 'Gefühl']]
  const s3 = stunde('Stimmt der Satz – oder fühlt er sich nur wahr an?', ['Beweis, Gefühl und Meinung unterscheiden', 'einen Satz wiegen', 'einen neuen Satz bauen, der beide Seiten trägt'],
    seite(
      ankommen('Gefühl oder Beweis?', kreuz('„Wenn ich mich dumm fühle, bin ich auch dumm.“ Stimmt das?', 'stimmt', 'stimmt nicht', 'weiß nicht'), kreuz('Was merkst du dir leichter?', 'was schiefging', 'was geklappt hat')),
      st('Erst bauen: die Lineal-Wippe', '10 Min.', 'zu zweit', 'scale', 'Material je Paar: ein Lineal, ein runder Stift, zehn gleiche Münzen (bei drei Paaren 30). Sagen Sie: „Die Wippe ist heute euer Richter.“',
        text('Legt das Lineal quer über einen runden Stift. Probiert aus: Gleich viele Münzen auf beiden Enden – die Wippe ist gerade. Eine Münze mehr auf einer Seite – sie kippt.')),
      fall(beweise, 'Lio und die 22 Punkte', [
        kreis('Welche Beweise lässt Lios Kopf nicht rein? Kreise ein.', 'sieben Punkte mehr', 'die Fahrräder', 'die Kasse beim Schulfest', 'die 22 Punkte'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Lio und die 22 Punkte', 3, 'search', reden('Lob oder fieser Spruch – was bleibt länger hängen?')),
    ),
    seite(
      st('Zeigen oder fühlen?', '10 Min.', 'alle gleichzeitig', 'hand-finger', 'Acht Sätze vorlesen, nach jedem zeigen alle gleichzeitig. Kurz auflösen: Kann man es sehen oder zählen?',
        text('Die Leitung liest einen Satz. Alle zeigen gleichzeitig: **Finger auf den Tisch** = kann man sehen oder zählen · **Hand aufs Herz** = ein Gefühl · **Hand an den Mund** = jemand sagt das.'),
        text('„Lio hat 22 Punkte.“ · „Ich fühle mich dumm.“ · „Alle sagen, er ist faul.“ · „Er hat zwei Fahrräder repariert.“ · „Ich bin so peinlich.“ · „Der Trainer sagt, ich bin zu langsam.“ · „Ich bin dreimal zu spät gekommen.“ · „Keiner mag mich.“'),
        reden('Welcher Satz fühlt sich an wie ein Beweis – und ist keiner?')),
      pause(),
      runde('Lio auf der Wippe', '30 Min.', 'zu zweit · dann alle', 'scale', {
        ziel: 'Lios Satz „Ich bin dumm“ wiegen – nur mit Beweisen.',
        material: 'die Lineal-Wippe, zehn Münzen und die zehn Lio-Karten von der nächsten Seite (je Paar), zwei Zettel: „Lios Satz stimmt“ und „stimmt nicht“, ein Zettel „Lautsprecher“',
        schritte: [
          'Lios Satz ist „Ich bin dumm.“ Der Zettel „stimmt“ liegt links, „stimmt nicht“ rechts von der Wippe. Daneben liegt der **Lautsprecher**.',
          'Das Paar liest eine Lio-Karte und macht den Zeige-Test: sehen oder zählen?',
          '**Nur Beweise bekommen eine Münze** – auf die Seite, zu der sie passen. Gefühle und Meinungen kommen auf den Lautsprecher: laut, aber ohne Gewicht.',
          'Am Ende: Wie steht die Wippe? Alle zeigen das Urteil mit dem Daumen.',
          'Jedes Paar baut einen **Satz für Lio, der beide Seiten trägt** – zum Beispiel: „Mathe fällt mir schwer. Fahrräder kann ich.“',
        ],
        regeln: ['Gefühle sind echt. Als Beweis wiegen sie nichts.', 'Keine Punkte, keine Teams gegeneinander.'],
        zu3: 'Ein Paar und die Leitung, oder alle drei an einer Wippe.',
        notiz: { titel: 'Unser Satz für Lio:', linien: 1 },
        auswertung: ['Warum ist der Lautsprecher so laut, obwohl er nichts wiegt?', 'Wie steht die Wippe – und was heißt das für Lios Satz?'],
      }, { danach: [beispiel('So sieht eine Runde aus', ['Ben liest:', '„Der Cousin sagt: Du checkst nichts.“'], ['Amira:', 'Hand an den Mund. Das sagt einer. Lautsprecher.'], ['', 'Keine Münze. Die Wippe bleibt, wie sie ist.'])] }),
    ),
    seite(
      material('10 Lio-Karten', 6,
        karten(2, 14, 'Die Lio-Karten: einmal pro Paar drucken, ausschneiden, mischen, verdeckt stapeln.', LIO.map(([t]) => ({ t }))),
        karten(3, 12, 'Die drei Zettel.', [{ t: 'Lios Satz stimmt' }, { t: 'stimmt nicht' }, { t: 'Lautsprecher', x: 'laut – aber kein Gewicht' }])),
      fuerDich('mein Prüfstand', '10 Min.', fragen('Dein alter Satz aus Stunde 2 – oder der von jemandem, den du kennst. Nicht aufschreiben. Sieht keiner.',
        kreuzU('Worauf stützt er sich vor allem?', 'auf ein Gefühl', 'auf einen Spruch von jemandem', 'auf etwas, das man sehen oder zählen kann'),
        satz('Ein Beweis dagegen – etwas, das man sehen oder zählen kann:', ''))),
    ),
    seite(
      schluss(beweise, 'Lios Wippe', [kreuz('Schau auf Station 1: „Wenn ich mich dumm fühle, bin ich auch dumm.“', 'stimmt', 'stimmt nicht')]),
    ),
  )

  /* ---------- Stunde 4 · Neuer Satz, neuer Tag ---------- */
  const MUT = ['jemanden grüßen, den du kaum kennst', 'etwas fragen, das du nicht weißt', 'freundlich Nein sagen', 'um Hilfe bitten', 'einen Vorschlag machen', 'einen Fehler zugeben', 'jemandem etwas Nettes sagen', 'allein etwas bestellen', 'anrufen statt schreiben', 'in der Runde einen Satz sagen', 'jemand Neues ansprechen', 'sagen: „Das habe ich nicht verstanden.“', 'eine Idee in der Gruppe sagen', 'sich entschuldigen', 'um eine zweite Chance bitten', 'ein Lob annehmen: „Danke.“']
  const s4 = stunde('Wie wird aus einem neuen Satz ein neuer Tag?', ['erklären, warum Denken allein nicht reicht', 'kleine Schritte von schweren unterscheiden', 'einen Wenn-dann-Plan für die Woche schreiben'],
    seite(
      ankommen('was du dich trauen würdest', kreis('Was würdest du dich gern öfter trauen? Kreise ein.', 'etwas fragen', 'Nein sagen', 'eine Idee sagen', 'um Hilfe bitten', 'jemanden ansprechen', 'nichts davon'), kreuz('Was ist schwerer?', 'neu denken', 'neu handeln')),
      fall(neuer, 'Mia am Montag', [
        kreuzU('Was brüllt der alte Satz?', '„Halt die Klappe, das interessiert keinen.“', '„Meine Idee zählt genauso.“'),
        kreuz('War Mia mutig?', 'ja – mit Herzklopfen', 'nein – sie hatte ja Angst'),
        kreuzU('Warum zählt der kleine Moment so viel?', 'Er ist ein Beweis für den neuen Satz.', 'Weil alle geklatscht haben.'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Mia am Montag', 2, 'search', reden('Wann habt ihr zuletzt etwas gemacht, obwohl das Herz geklopft hat? Wer mag, erzählt.')),
    ),
    seite(
      modell(neuer, 'vom Satz zum Tun', ['bulb', 'stairs', 'bell'], { zeit: '8 Min.', wie: 'alle · dann allein',
        leitung: 'Vorlesen, dann allein ankreuzen. Klein genug heißt: Es passiert diese Woche wirklich.',
        fragen: [raster('Klein genug für diese Woche – oder zu groß? Ein Kreuz pro Zeile.', ['klein genug', 'zu groß'], 'in der Pause eine Frage stellen', 'vor der ganzen Schule eine Rede halten', 'einmal freundlich Nein sagen', 'ab morgen nie mehr Angst haben', 'jemanden grüßen, den ich kaum kenne')],
        danach: [reden('Was ist für euch ein kleiner Schritt – und was wäre schon zu groß?')] }),
      clip(neuer, 'Zwei Arten zu denken', [kreuzU('Kann man besser werden in etwas, das man „nicht kann“?', 'ja – mit Üben', 'nein – das ist angeboren', 'weiß nicht'), kreuz('Was sagst du dir, wenn etwas nicht klappt?', '„noch nicht“', '„kann ich halt nicht“', 'je nachdem')], ['So denkt der eine Typ:', 'So denkt der andere:', 'Das passt zu mir:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Welcher Satz passt zu Mia am Montag?', '„Ich kann das noch nicht – ich probiere es.“', '„Ich kann das halt nicht.“')]),
      pause(),
    ),
    seite(
      runde('die Mut-Leiter', '30 Min.', 'alle · auf dem Boden', 'stairs', {
        ziel: 'Kleine Schritte finden, die du wirklich gehen kannst – und merken, dass für jeden etwas anderes schwer ist.',
        material: 'die 16 Mut-Karten von der nächsten Seite (ausschneiden), Klebeband für eine Leiter auf dem Boden',
        schritte: [
          '**Teil 1 · die Leiter:** Klebt eine Leiter auf den Boden. Legt die 16 Karten auf die Sprossen – von „leicht“ bis „schwer“. Ihr müsst euch einigen.',
          '**Teil 2 · mein Schritt:** Jede Person nimmt sich **eine** Karte aus der leichten Hälfte. Das ist dein Schritt für diese Woche. Wer mag, macht ihn gleich hier – mit der Leitung, nicht vor der Gruppe.',
        ],
        regeln: ['Du suchst deinen Schritt selbst aus. Niemand wird zu etwas gedrängt.', 'Niemand muss etwas vorspielen. Es zählt nur, was du wirklich tust.'],
        zu3: 'Die Leitung legt mit. Bei Teil 2 nimmt sie sich auch eine Karte.',
        notiz: { titel: 'Mein Schritt für diese Woche:', linien: 1 },
        auswertung: ['Welche Karte lag bei euch weit auseinander – für die einen leicht, für die anderen schwer?', 'Was passiert mit dem alten Satz, wenn du den Schritt gemacht hast?'],
      }, { danach: [beispiel('So kann es klingen', ['Mia legt:', '„Um Hilfe bitten“ – ganz unten. Leicht.'], ['Finn:', 'Für mich ist das das Schwerste auf der ganzen Leiter.'], ['Mia:', 'Und bei mir ist „Nein sagen“ ganz oben.'], ['', 'Die Karte kommt in die Mitte. Beides stimmt.'])] }),
    ),
    seite(
      material('16 Mut-Karten', 6, karten(4, 18, 'Ausschneiden und mischen.', MUT.map((t) => ({ t })))),
      fuerDich('mein Wenn-dann', '6 Min.', fragen('Ein Plan schlägt jeden Vorsatz. Nimm deine Karte von der Mut-Leiter.',
        satz('Für diese Woche:', 'Wenn (wann, wo, bei wem):', 'dann (mein Schritt):'))),
    ),
    seite(
      schluss(neuer, 'Beweis Nummer eins', [kreuzU('Der alte Satz meldet sich wieder. Was heißt das?', 'Es hat nicht geklappt.', 'Das ist normal. Ich mache trotzdem meinen Schritt.')], ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']),
    ),
  )
  return [s1, s2, s3, s4]
}

/** Lösungen für die Leitung – passend zu den Stationen oben */
export const loesungen: string[][] = [
  [
    'Der Fall: Sicher wusste Ben nur: Mila hat die Nachricht gelesen. Den Abend hat ihm vor allem sein Film verdorben – „beides ein bisschen“ ist auch ehrlich.',
    'Die Kette: Die Sache bleibt gleich, nur der Gedanke wechselt – und mit ihm die Laune. Fast alle Daumen drehen sich beim anderen Gedanken.',
    'Wie-wahrscheinlich-Linie: Es gibt keine richtige Prozentzahl. Wichtig ist der Unterschied zwischen dem Gefühl (fast 100 %) und dem, was nach der neuen Info übrig bleibt. Dritter Gedanke zum Beispiel: „Akku leer.“ Wer nach der Info nicht umzieht, darf das – fragen Sie nur: „Was müsstest du noch wissen?“',
    'Für dich: Der zweite Film muss nicht schön sein – er muss auch stimmen können. Die zweite Frage ist der eigentliche Skill: nachfragen statt raten.',
  ],
  [
    'Der Fall: „Ich bin zu viel.“ Man sieht ihn an der Hand vor dem Mund und an „Ach, egal“. Der Satz war falsch – gesagt im Stress.',
    'Sprechblase: Gesagt hat den Satz der Stiefvater – heute sagt Lea ihn sich selbst. So ziehen Sätze ein: einmal gehört, dann selbst wiederholt.',
    'Satz-Umbau: Gute Freundes-Sätze stimmen und sind klein: „Du darfst Fehler machen.“ · „Manche mögen dich sehr.“ · „Du bist nicht zu viel – nur manchmal laut, und das ist okay.“ Schönreden („Du bist perfekt.“) besteht nicht.',
    'Geheime Zählung: Die Zettel danach sofort wegwerfen. Wichtig ist nur das Bild: Viele kennen dieselben Sätze.',
  ],
  [
    'Der Fall: Lios Kopf lässt nicht rein: sieben Punkte mehr, die Fahrräder, die Kasse beim Schulfest.',
    'Zeigen oder fühlen: Finger auf den Tisch – 22 Punkte, zwei Fahrräder, dreimal zu spät · Hand aufs Herz – dumm fühlen, peinlich · Hand an den Mund – „alle sagen“, der Trainer, „keiner mag mich“ (fühlt sich wie ein Beweis an, ist keiner).',
    'Lio auf der Wippe: Beweise sind die ersten sechs Karten. Zwei davon gehen eher auf „stimmt“ (22 Punkte, drei Aufgaben nicht verstanden), vier auf „stimmt nicht“. Vergessen oder nicht verstehen ist übrigens nicht dumm. Gefühl und Meinungen kommen auf den Lautsprecher. Urteil: Der Satz „Ich bin dumm“ hält nicht – „Mathe fällt mir schwer“ schon.',
    'Mein Prüfstand: Ein guter neuer Satz ist wahr, sagt, was man tut, und gilt jetzt – zum Beispiel „Mathe fällt mir schwer. Ich bleibe trotzdem dran.“',
  ],
  [
    'Der Fall: Der alte Satz brüllt „Halt die Klappe“. Mia war mutig – mit Herzklopfen. Der Moment ist Beweis Nummer eins.',
    'Klein genug: Frage in der Pause, einmal Nein sagen, jemanden grüßen. Zu groß: Rede vor der ganzen Schule, nie mehr Angst haben.',
    'Mut-Leiter: Es gibt keine richtige Reihenfolge. Wichtig: Der eigene Schritt ist klein genug, dass er heute wirklich passiert.',
    'Schluss: Der alte Satz kommt wieder. Das ist normal.',
  ],
]

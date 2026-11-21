// REAL TALK #04 · GEDANKEN – vier Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 ist ein Lege-Spiel (zwei Filme zu einer Situation), Stunde 2 eine geheime Zählung, Stunde 3 eine Ermittlung
// mit Hinweisen im Raum, Stunde 4 eine Leiter aus kleinen Schritten – mit einem echten Schritt am Ende.
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, clip, fall, fragen, fuerDich, karten, kreuz, kreuzU, material, modell, runde, satz, schluss, seite, st, stimmtDas, stunde, strich, tabelle } from './stunden-hilfe'

const kreis = (f: string, ...l: string[]): Frage => ({ f, kreis: l })

export function stunden(d: Heft): Stunde[] {
  const [film, alte, beweise, neuer] = d.tracks
  // Der Clip über Glaubenssätze passt zu Stunde 2 („Alte Sätze“), nicht zu Stunde 1. Der frühere Clip von Stunde 2
  // (Hochstapler-Gefühl) passte nicht zum Fall und entfällt. Stunde 1 kommt ohne Clip aus.
  alte.clip = { ...film.clip!, frage: 'Woher kommen die Sätze, die wir über uns glauben?' }
  delete film.clip

  /* ---------- Stunde 1 · Film im Kopf ---------- */
  const PAARE: [string, string, string][] = [
    ['Gelesen. Keine Antwort.', 'Sie hat keinen Bock auf mich.', 'Sie hat gerade keine Zeit.'],
    ['Zwei tuscheln und schauen zu dir.', 'Die lästern über mich.', 'Die reden über irgendwas.'],
    ['Der Lehrer sagt: „Komm nach der Stunde zu mir.“', 'Jetzt gibt es Ärger.', 'Vielleicht will er nur etwas fragen.'],
    ['Du bist nicht zur Party eingeladen.', 'Keiner will mich dabeihaben.', 'Es war nur Platz für wenige.'],
    ['Dein Freund geht ohne Gruß an dir vorbei.', 'Er ist sauer auf mich.', 'Er hat mich nicht gesehen.'],
    ['Du bekommst eine Fünf zurück.', 'Ich bin dumm.', 'Diesmal habe ich zu wenig geübt.'],
    ['Jemand lacht, als du reinkommst.', 'Die lachen über mich.', 'Da war gerade ein Witz.'],
    ['Deine Mutter seufzt, als du heimkommst.', 'Ich nerve sie.', 'Sie hatte einen harten Tag.'],
  ]
  const s1 = stunde('Was macht dir die Laune kaputt – die Sache oder dein Gedanke?', ['erklären, dass zwischen Situation und Gefühl ein Gedanke sitzt', 'zu einer Situation zwei Gedanken finden', 'merken, welcher Gedanke dich runterzieht'],
    seite(
      ankommen('dein erster Gedanke', kreuzU('Jemand antwortet nicht auf deine Nachricht. Was denkst du zuerst?', '„Der hat keine Zeit.“', '„Der mag mich nicht mehr.“', '„Mir egal.“'), strich('Wie ist deine Laune gerade?', 'mies', 'gut')),
      fall(film, 'Ben und die zwei blauen Haken', [
        kreuzU('Was wusste Ben **sicher**?', 'Mila hat die Nachricht gelesen.', 'Mila hat keinen Bock auf ihn.', 'Mila lacht über ihn.'),
        kreuz('Was hat Ben den Abend verdorben?', 'Mila', 'sein Film im Kopf'),
      ], { zeitleiste: [['nach 10 Min.', '„Sie hat keinen Bock mehr auf mich.“'], ['nach 20 Min.', '„Sie lacht gerade über meine Nachricht.“'], ['nach 30 Min.', 'Ben löscht den Chat.'], ['halb neun', 'Mila: „Sorry, war beim Training. Klar, wann?“']] }),
    ),
    seite(
      modell(film, 'Situation – Gedanke – Gefühl', ['message-circle', 'arrows-right', 'repeat']),
      st('Zu zweit: drei Filme für Ben', '10 Min.', 'zu zweit', 'movie', 'Gefühl und Tun: ein Wort reicht. Den dritten Gedanken gemeinsam sammeln, wenn er schwerfällt.',
        fragen(film.moves[0].kontext ?? null, ...film.moves[0].fragen)),
      stimmtDas(film),
    ),
    seite(
      runde('zwei Filme', '25 Min.', 'zwei Teams · am Tisch', 'cards', {
        ziel: 'Sehen: Zu jeder Situation gibt es mehr als einen Gedanken – und jeder macht ein anderes Gefühl.',
        material: 'die 8 Situations-Karten und 16 Gedanken-Karten von der nächsten Seite (ausschneiden), eine Münze pro Person',
        schritte: [
          'Die acht Situationen liegen offen auf dem Tisch. Die Gedanken-Karten liegen gemischt und verdeckt daneben.',
          'Reihum: eine Gedanken-Karte ziehen, vorlesen und zur passenden Situation legen. Richtig: 1 Punkt.',
          'Am Ende liegen bei jeder Situation **zwei Filme**: einer zieht runter, einer könnte auch stimmen.',
        ],
        runden: [
          { t: 'Runde 1 · legen', x: 'Alle 16 Karten zuordnen. Welches Team hat mehr Punkte?' },
          { t: 'Runde 2 · Münze', x: 'Eine Situation wird vorgelesen. Alle legen gleichzeitig ihre Münze auf den Film, der bei ihnen zuerst käme.' },
          { t: 'Runde 3 · dritter Film', x: 'Jedes Team erfindet zu zwei Situationen einen dritten Gedanken. Glaubhaft? 2 Punkte.' },
        ],
        regeln: ['Niemand muss sagen, warum seine Münze wo liegt.'],
        zu3: 'Ein Team: alle 16 Karten gemeinsam zuordnen, auf Zeit. Dann Runde 2 mit der Leitung.',
        wertung: { kopf: ['Punkte', 'Runde 1', 'Runde 3', 'Summe'], zeilen: ['Team A', 'Team B'] },
        auswertung: ['Bei welcher Situation lagen fast alle Münzen auf dem dunklen Film?', 'Der andere Film: Ist er schöngeredet – oder könnte er wirklich stimmen?'],
      }),
    ),
    seite(
      material('8 Situationen und 16 Gedanken', 5,
        karten(4, 20, 'Die Situationen: ausschneiden und offen auf den Tisch legen.', PAARE.map(([t]) => ({ t, marke: 'Situation' }))),
        karten(4, 16, 'Die Gedanken: ausschneiden, mischen, verdeckt stapeln.', [...PAARE.map(([, a]) => ({ t: `„${a}“` })), ...PAARE.map(([, , b]) => ({ t: `„${b}“` }))])),
      schluss(film, 'Bens zweiter Film', [satz('Zwei blaue Haken, keine Antwort. Welcher zweite Gedanke hätte Ben den Abend gerettet?', '„Vielleicht'), kreuzU('Schau auf Station 1. Dein erster Gedanke war:', 'einer, der runterzieht', 'einer, der auch stimmen könnte')], ['gefangen']),
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
        kreuzU('Der Stiefvater hat es gesagt. Stimmt der Satz deshalb?', 'Nein. Er war genervt – der Satz war falsch.', 'Ja. Erwachsene haben recht.'),
      ]),
    ),
    seite(
      clip(alte, 'Was sind Glaubenssätze?', [kreuzU('Woher kommen Sätze wie „Ich bin nicht gut genug“?', 'Sie sind angeboren.', 'Sie sind gelernt – meist früh.', 'Sie kommen aus dem Nichts.')], ['So entsteht ein Glaubenssatz:', 'Ein Beispiel aus dem Clip:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Leas Satz ist gelernt. Was heißt das?', 'Man kann ihn umlernen.', 'Er bleibt für immer.')]),
      modell(alte, 'wie ein Satz einzieht', ['home', 'search', 'users'], { zeit: '8 Min.' }),
      fuerDich('die Fahndung', '8 Min.', fragen(alte.moves[0].kontext ?? null, ...alte.moves[0].fragen)),
    ),
    seite(
      runde('die geheime Zählung', '25 Min.', 'alle · dann zwei Teams', 'box', {
        ziel: 'Sehen: Fast alle kennen dieselben Sätze. Niemand ist damit allein.',
        material: 'die 12 Satz-Karten von der nächsten Seite, pro Person ein Zettel mit den Zahlen 1 bis 12, eine Schachtel, Stifte',
        schritte: [
          'Die zwölf Sätze liegen offen auf dem Tisch. **Wette zu zweit:** Welche drei Sätze kennen die meisten hier? Schreibt die Nummern auf.',
          'Dann jede Person für sich, verdeckt: Kreise auf deinem Zettel die Nummern der Sätze ein, die du von dir kennst. Kein Name.',
          'Zettel falten und in die Schachtel. Die Leitung mischt, zählt und macht Striche neben die Sätze.',
          'Welche drei Sätze haben die meisten Striche? Jeder Treffer aus eurer Wette: 1 Punkt.',
        ],
        regeln: ['Die Zettel bleiben geheim. Niemand fragt, wer was eingekreist hat.', 'Auch die Leitung wirft einen Zettel ein.'],
        zu3: 'Die Wette macht ihr als ein Team gegen die Leitung. Alle – auch die Leitung – werfen zwei Zettel ein: einen eigenen und einen für „jemanden, den ich kenne“. So bleibt es geheim.',
        runden: [{ t: 'Danach · Freundes-Sätze', x: 'Nehmt den Satz mit den meisten Strichen. Jedes Team schreibt in zwei Minuten Sätze auf, die eine gute Freundin jetzt sagen würde. Punkte nur für Sätze, die man glauben kann.' }],
        auswertung: ['Hättet ihr gedacht, dass so viele denselben Satz kennen?', 'Warum sind wir zu Freunden netter als zu uns selbst?'],
      }, { leitung: 'Zettel vorbereiten. Selbst einen einwerfen. Nach dem Zählen die Zettel sofort wegwerfen.' }),
    ),
    seite(
      material('12 Sätze', 5,
        karten(3, 19, 'Ausschneiden und offen auf den Tisch legen. Die Nummer gehört dazu.', SAETZE.map((t, i) => ({ t: `„${t}“`, marke: `Satz ${i + 1}` })))),
      st('Zu zweit: der Satz und sein Preis', '8 Min.', 'zu zweit', 'coin', 'Der Satz schützt Lea auch: vor neuer Kränkung. Das darf gesagt werden.',
        fragen(alte.moves[1].kontext ?? null, ...alte.moves[1].fragen)),
      schluss(alte, 'der Satz wohnt noch da', [kreuzU('Lea will etwas erzählen und sagt wieder „Ach, egal“. Was könnte sie sich sagen?', '„Der Satz ist gelernt. Er stimmt nicht.“', '„Ich bin halt zu viel.“'), strich('Schau auf Station 1. Wie willst du mit dir reden, wenn etwas schiefgeht?', 'hart', 'freundlich')], ['gefunden']),
    ),
  )

  /* ---------- Stunde 3 · Beweise, bitte ---------- */
  const HINWEISE = ['Jana hat in Mathe eine Fünf.', 'Jana passt jeden Samstag auf zwei kleine Kinder auf.', 'Jana fühlt sich klein, wenn sie vorlesen soll.', 'Jana hat ihr Fahrrad selbst geflickt.', 'Ihr Bruder sagt: „Du kannst ja gar nichts.“', 'Jana hat den Schwimmkurs abgebrochen.', 'Jana kocht oft für die ganze Familie.', 'Jana glaubt: Alle anderen sind besser.', 'Im Praktikum wurde sie gelobt: pünktlich und freundlich.', 'Jana hat dreimal die Hausaufgaben vergessen.', 'Heute ist ein schlechter Tag. Alles nervt.', 'Jana spricht zwei Sprachen.']
  const s3 = stunde('Stimmt der Satz überhaupt?', ['einen Beweis von einem Gefühl unterscheiden', 'Hinweise für und gegen einen Satz sammeln', 'einen neuen Satz prüfen: wahr, was du tust, jetzt'],
    seite(
      ankommen('Gefühl oder Beweis?', kreuz('„Wenn ich mich dumm fühle, bin ich auch dumm.“ Stimmt das?', 'stimmt', 'stimmt nicht', 'weiß nicht'), kreuz('Was merkst du dir leichter?', 'was schiefging', 'was geklappt hat')),
      fall(beweise, 'Lio und die 22 Punkte', [
        kreis('Welche Beweise lässt Lios Kopf nicht rein? Kreise ein.', 'sieben Punkte mehr', 'die Mopeds', 'die Kasse im Praktikum', 'die 22 Punkte'),
        kreuzU('Warum zählen die guten Sachen für Lio nicht?', 'Sein Kopf lässt nur rein, was zum alten Satz passt.', 'Weil sie nicht wichtig sind.'),
      ]),
    ),
    seite(
      st('Zu zweit: die Akte Lio', '8 Min.', 'zu zweit', 'folder', 'Erst zu zweit sortieren, dann gemeinsam das Urteil: „zu grob – so stimmt er nicht“.',
        fragen(beweise.moves[0].kontext ?? null, ...beweise.moves[0].fragen)),
      modell(beweise, 'wie man einen Satz prüft', ['scale', 'arrows-left-right', 'pencil'], { zeit: '8 Min.' }),
      clip(beweise, 'Beweis oder Trick?', [kreuzU('Woran erkennst du einen echten Beweis?', 'Man kann ihn nachprüfen.', 'Er wird laut gesagt.', 'Viele glauben ihn.')], ['Ein Trick aus dem Clip:', 'So erkenne ich ihn:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Lios Cousin sagt: „Du checkst nichts.“ Was ist das?', 'eine Meinung – kein Beweis', 'ein Beweis')]),
    ),
    seite(
      fuerDich('der Prüfstand', '8 Min.', fragen(beweise.moves[1].kontext ?? null, ...beweise.moves[1].fragen)),
      runde('Tatort', '25 Min.', 'zu zweit oder zu dritt', 'search', {
        ziel: 'Üben, Hinweise zu sortieren: dafür, dagegen – oder gar kein Beweis.',
        material: 'die 12 Hinweis-Karten von der nächsten Seite (ausschneiden und im Raum aufhängen oder auslegen), Stifte',
        schritte: [
          'Der Fall: Jana, 15, sagt über sich: **„Ich kann nichts.“** Im Raum hängen zwölf Hinweise.',
          'Geht als Team von Hinweis zu Hinweis. Kreuzt unten an: **dafür**, **dagegen** oder **kein Beweis** (nur ein Gefühl oder eine Meinung).',
          'Acht Minuten. Dann vergleichen alle Teams. Jede Zeile, die mit der Lösung der Leitung übereinstimmt: 1 Punkt.',
          'Das Urteil: Stimmt Janas Satz? Alle zeigen gleichzeitig: Daumen hoch, runter oder quer („zu grob“).',
          'Zum Schluss schreibt jedes Team einen **neuen Satz für Jana**, der den Prüfstand besteht.',
        ],
        zu3: 'Ihr ermittelt als ein Team. Die Leitung ermittelt allein – dann vergleichen.',
        notiz: { titel: 'Unser neuer Satz für Jana:', linien: 1 },
        auswertung: ['Welcher Hinweis sah aus wie ein Beweis – und war keiner?'],
      }, { danach: [tabelle('14mm 1fr 14mm 1fr', ['Nr.', 'dafür · dagegen · kein Beweis', 'Nr.', 'dafür · dagegen · kein Beweis'], [1, 2, 3, 4, 5, 6].map((k) => [String(k), '☐ dafür   ☐ dagegen   ☐ kein Beweis', String(k + 6), '☐ dafür   ☐ dagegen   ☐ kein Beweis']), 6)], leitung: 'Hinweise vorher aufhängen. Lösung: dafür 1, 6, 10 · dagegen 2, 4, 7, 9, 12 · kein Beweis 3, 5, 8, 11.' }),
    ),
    seite(
      material('12 Hinweise zum Fall Jana', 6,
        karten(3, 22, 'Ausschneiden und im Raum verteilen. Die Nummer gehört dazu.', HINWEISE.map((t, i) => ({ t, marke: `Hinweis ${i + 1}` })))),
      schluss(beweise, 'Lios neuer Satz', [kreuzU('Welcher neue Satz besteht bei Lio den Prüfstand?', '„Mathe fällt mir schwer. Ich bleibe trotzdem dran.“', '„Ich bin der Beste.“', '„Irgendwann kann ich es schon.“'), kreuz('Schau auf Station 1: „Wenn ich mich dumm fühle, bin ich auch dumm.“', 'stimmt', 'stimmt nicht')], ['gelesen']),
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
      ]),
    ),
    seite(
      modell(neuer, 'vom Satz zum Tun', ['bulb', 'stairs', 'bell'], { zeit: '8 Min.' }),
      clip(neuer, 'Zwei Arten zu denken', [kreuzU('Kann man besser werden in etwas, das man „nicht kann“?', 'ja – mit Üben', 'nein – das ist angeboren', 'weiß nicht')], ['So denkt der eine Typ:', 'So denkt der andere:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Welcher Satz passt zu Mia am Montag?', '„Ich kann das noch nicht – ich probiere es.“', '„Ich kann das halt nicht.“')]),
      stimmtDas(neuer),
    ),
    seite(
      runde('die Mut-Leiter', '25 Min.', 'alle · am Tisch', 'stairs', {
        ziel: 'Kleine Schritte finden, die du wirklich gehen kannst – und merken, dass für jeden etwas anderes schwer ist.',
        material: 'die 16 Mut-Karten von der nächsten Seite (ausschneiden), ein langer Tisch oder der Boden',
        schritte: [
          '**Teil 1 · die Leiter:** Legt alle 16 Karten in eine Reihe – von „leicht“ bis „schwer“. Ihr müsst euch einigen.',
          '**Teil 2 · Zwillinge:** Die Leitung liest eine Karte vor. Auf „drei“ zeigen alle mit den Fingern: Wie schwer ist das für dich, von 1 bis 5? Gleiche Zahl: Zwilling.',
          '**Teil 3 · mein Schritt:** Jede Person nimmt sich **eine** Karte aus der leichten Hälfte. Das ist dein Schritt bis heute Abend. Wer mag, macht ihn gleich hier – mit der Leitung, nicht vor der Gruppe.',
        ],
        regeln: ['Du suchst deinen Schritt selbst aus. Niemand wird zu etwas gedrängt.', 'Niemand muss etwas vorspielen. Es zählt nur, was du wirklich tust.'],
        zu3: 'Die Leitung legt und zeigt mit. Bei Teil 3 nimmt sie sich auch eine Karte.',
        notiz: { titel: 'Mein Schritt bis heute Abend:', linien: 1 },
        auswertung: ['Welche Karte lag bei euch weit auseinander – für die einen leicht, für die anderen schwer?', 'Was passiert mit dem alten Satz, wenn du den Schritt gemacht hast?'],
      }),
    ),
    seite(
      material('16 Mut-Karten', 6, karten(4, 18, 'Ausschneiden und mischen.', MUT.map((t) => ({ t })))),
      fuerDich('mein Wenn-dann', '8 Min.', fragen(neuer.moves[1].kontext ?? null, ...neuer.moves[1].fragen)),
      schluss(neuer, 'Beweis Nummer eins', [kreuzU('Der alte Satz meldet sich wieder. Was heißt das?', 'Es hat nicht geklappt.', 'Das ist normal. Ich mache trotzdem meinen Schritt.')], ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']),
    ),
  )
  return [s1, s2, s3, s4]
}

/** Lösungen für die Leitung – passend zu den Stationen oben */
export const loesungen: string[][] = [
  [
    'Der Fall: Sicher wusste Ben nur: Mila hat die Nachricht gelesen. Den Abend hat ihm sein Film verdorben, nicht Mila.',
    'Drei Filme: „Keinen Bock auf mich“ – traurig, Chat löschen. „Beim Training“ – ruhig, abwarten. Dritter Gedanke zum Beispiel: „Akku leer.“',
    'Zwei Filme: Der zweite Gedanke muss nicht schön sein – er muss auch stimmen können. Runde 1: Gelesen – „keinen Bock“/„gerade keine Zeit“ · tuscheln – „lästern“/„reden über irgendwas“ · Lehrer – „Ärger“/„will nur etwas fragen“ · Party – „keiner will mich“/„nur Platz für wenige“ · Freund – „sauer“/„nicht gesehen“ · Fünf – „dumm“/„zu wenig geübt“ · jemand lacht – „lachen über mich“/„ein Witz“ · Mutter – „Ich nerve sie“/„harter Tag“. Eine begründete andere Zuordnung zählt auch.',
  ],
  [
    'Der Fall: „Ich bin zu viel.“ Man sieht ihn an der Hand vor dem Mund und an „Ach, egal“. Der Satz war falsch – gesagt im Stress.',
    'Fahndung: Tom – A (nicht gut genug) · Nora – B (mich mag keiner) · Sami – C (keine Fehler) · Finn – D (stark sein).',
    'Der Preis: Der Satz kostet Lea Freude, Nähe, ihre Stimme. Er schützt sie vor neuer Kränkung.',
    'Geheime Zählung: Die Zettel danach sofort wegwerfen. Wichtig ist nur das Bild: Viele kennen dieselben Sätze.',
  ],
  [
    'Der Fall: Lios Kopf lässt nicht rein: sieben Punkte mehr, die Mopeds, die Kasse im Praktikum.',
    'Akte Lio: dafür – 22 von 60 · dagegen – sieben Punkte mehr, Mopeds, Kasse · kein Beweis – fühlt sich dumm, Satz des Cousins. Urteil: zu grob.',
    'Prüfstand: Es bestehen „Ich frage nach …“, „Mathe fällt mir schwer. Ich bleibe trotzdem dran.“, „Ich probiere es. Fehler sind okay.“',
    'Tatort: dafür 1, 6, 10 · dagegen 2, 4, 7, 9, 12 · kein Beweis 3, 5, 8, 11. Urteil: zu grob. Neuer Satz zum Beispiel: „Manches fällt mir schwer. Vieles kann ich.“',
  ],
  [
    'Der Fall: Der alte Satz brüllt „Halt die Klappe“. Mia war mutig – mit Herzklopfen. Der Moment ist Beweis Nummer eins.',
    'Mut-Leiter: Es gibt keine richtige Reihenfolge. Wichtig: Der eigene Schritt ist klein genug, dass er heute wirklich passiert.',
    'Schluss: Der alte Satz kommt wieder. Das ist normal.',
  ],
]

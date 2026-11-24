// REAL TALK #04 · GEDANKEN – vier Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 ist ein Lege-Spiel (zwei Filme zu einer Situation), Stunde 2 eine geheime Zählung, Stunde 3 eine Ermittlung
// mit Hinweisen im Raum, Stunde 4 eine Leiter aus kleinen Schritten – mit einem echten Schritt am Ende.
// Neu im Sweet Spot (24.11.2026): „Kennst du das?“, Sprechblasen nach jedem Fall, Modelle mit einfacher Übung, mehr
// Clip-Fragen, große Runden ohne Punkte und ohne Teams gegeneinander, je ein Beispiel „So kann es klingen“.
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, beispiel, clip, fall, fragen, fuerDich, karten, kennstDu, kreuz, kreuzU, material, modell, raster, reden, runde, satz, schluss, seite, st, stimmtDas, stunde, strich, tabelle, verbinden, weiter } from './stunden-hilfe'

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
    ['Der Trainer sagt nach dem Spiel nichts zu dir.', 'Ich war schlecht.', 'Er hatte den Kopf woanders.'],
  ]
  const s1 = stunde('Was macht dir die Laune kaputt – die Sache oder dein Gedanke?', ['erklären, dass zwischen Situation und Gefühl ein Gedanke sitzt', 'zu einer Situation zwei Gedanken finden', 'merken, welcher Gedanke dich runterzieht'],
    seite(
      ankommen('dein erster Gedanke', kreuzU('Jemand antwortet nicht auf deine Nachricht. Was denkst du zuerst?', '„Der hat keine Zeit.“', '„Der mag mich nicht mehr.“', '„Mir egal.“'), strich('Wie ist deine Laune gerade?', 'mies', 'gut')),
      st('Kennst du das?', '8 Min.', 'allein · dann alle', 'hand-finger', 'Erst still ankreuzen, dann jeden Satz vorlesen – alle zeigen gleichzeitig den Daumen, Sie auch. Nur zählen, nicht nachfragen.',
        fragen('Kreuz an, was du kennst. Danach zeigen alle gleichzeitig den Daumen.',
          kennstDu('Kennst du das?', 'Ich warte auf eine Antwort und denke schon das Schlimmste.', 'Zwei lachen – und ich denke sofort, es geht um mich.', 'Ich lese eine Nachricht dreimal, um herauszufinden, wie sie gemeint ist.', 'Ich bin sicher, dass jemand sauer auf mich ist – und dann stimmt es gar nicht.', 'Ein Satz von jemandem geht mir den ganzen Tag nicht aus dem Kopf.')),
        reden('Welcher Satz kam am häufigsten? Was macht so ein Gedanke mit eurer Laune?')),
    ),
    seite(
      fall(film, 'Ben und die zwei blauen Haken', [
        kreuzU('Was wusste Ben **sicher**?', 'Mila hat die Nachricht gelesen.', 'Mila hat keinen Bock auf ihn.', 'Mila lacht über ihn.'),
        kreuz('Was hat Ben den Abend verdorben?', 'Mila', 'sein Film im Kopf'),
      ], { zeitleiste: [['nach 10 Min.', '„Sie hat keinen Bock mehr auf mich.“'], ['nach 20 Min.', '„Sie lacht gerade über meine Nachricht.“'], ['nach 30 Min.', 'Ben löscht den Chat.'], ['halb neun', 'Mila: „Sorry, war beim Training. Klar, wann?“']], leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Ben und die zwei blauen Haken', 3, 'search', reden('Was macht ihr, wenn eine Antwort nicht kommt – warten, nachschreiben, löschen?')),
      modell(film, 'Situation – Gedanke – Gefühl', ['message-circle', 'arrows-right', 'repeat'], { wie: 'alle · dann allein',
        leitung: 'Vorlesen, dann allein ankreuzen und auflösen. Wichtig: Die Situation ist gleich – der Gedanke macht das Gefühl.',
        fragen: [raster('Was ist das? Ein Kreuz pro Zeile.', ['Situation', 'Gedanke', 'Gefühl'], 'Zwei blaue Haken, keine Antwort.', '„Die hat keinen Bock auf mich.“', 'traurig', 'Jemand rempelt dich an.', '„Der hat mich nicht gesehen.“', 'ruhig')],
        danach: [reden('Welcher Gedanke kommt bei euch schneller: der dunkle oder der ruhige?')] }),
    ),
    seite(
      st('Zu zweit: drei Filme für Ben', '10 Min.', 'zu zweit', 'movie', 'Gefühl und Tun: ein Wort reicht. Den dritten Gedanken gemeinsam sammeln, wenn er schwerfällt.',
        fragen(film.moves[0].kontext ?? null, ...film.moves[0].fragen)),
      fuerDich('mein Film', '8 Min.', fragen('Ein Moment, der dir die Laune verdorben hat – dir oder jemandem, den du kennst. Sieht keiner.',
        kreuzU('Was ist passiert?', 'keine Antwort auf eine Nachricht', 'jemand hat gelacht oder getuschelt', 'eine schlechte Note', 'etwas anderes'),
        kreuz('Was hast du gefühlt?', 'traurig', 'wütend', 'peinlich', 'Angst'),
        satz('Zwei Filme:', 'Mein erster Gedanke: „', 'Ein zweiter, der auch stimmen könnte: „'))),
    ),
    seite(
      runde('zwei Filme', '25 Min.', 'alle · am Tisch', 'cards', {
        ziel: 'Sehen: Zu jeder Situation gibt es mehr als einen Gedanken – und jeder macht ein anderes Gefühl.',
        material: 'die 8 Situations-Karten und 16 Gedanken-Karten von der nächsten Seite (ausschneiden), eine Münze pro Person',
        schritte: [
          'Die acht Situationen liegen offen auf dem Tisch. Die Gedanken-Karten liegen gemischt und verdeckt daneben.',
          'Reihum: eine Gedanken-Karte ziehen, vorlesen und zur passenden Situation legen. Wer unsicher ist, fragt die Gruppe.',
          'Am Ende liegen bei jeder Situation **zwei Filme**: einer zieht runter, einer könnte auch stimmen.',
        ],
        runden: [
          { t: 'Runde 1 · legen', x: 'Alle 16 Karten zusammen zuordnen. Schafft ihr es in fünf Minuten?' },
          { t: 'Runde 2 · Münze', x: 'Eine Situation wird vorgelesen. Alle legen gleichzeitig ihre Münze auf den Film, der bei ihnen zuerst käme.' },
          { t: 'Runde 3 · dritter Film', x: 'Jede Person erfindet zu einer Situation einen dritten Gedanken. Kann er stimmen? Alle zeigen den Daumen.' },
        ],
        regeln: ['Es gibt keine Punkte und keine Teams.', 'Niemand muss sagen, warum seine Münze wo liegt.'],
        zu3: 'Genauso – die Leitung legt und setzt mit.',
        auswertung: ['Bei welcher Situation lagen fast alle Münzen auf dem dunklen Film?', 'Der andere Film: Ist er schöngeredet – oder könnte er wirklich stimmen?'],
      }, { danach: [beispiel('So kann es klingen', ['Leitung liest:', '„Dein Freund geht ohne Gruß an dir vorbei.“'], ['', 'Vier Münzen landen auf „Er ist sauer auf mich“, eine auf „Er hat mich nicht gesehen“.'], ['Amira:', 'Bei mir kommt sofort der dunkle Film. Dabei schaut er meistens nur aufs Handy.'])] }),
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
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Lea und der Satz vom Abendessen', 2, 'search', reden('Welche Sätze hört man oft – auf dem Hof, im Sport, im Netz? Welche bleiben hängen?')),
    ),
    seite(
      clip(alte, 'Was sind Glaubenssätze?', [kreuzU('Woher kommen Sätze wie „Ich bin nicht gut genug“?', 'Sie sind angeboren.', 'Sie sind gelernt – meist früh.', 'Sie kommen aus dem Nichts.'), kreuz('Wie redest du innerlich mit dir, wenn etwas schiefgeht?', 'hart', 'freundlich', 'je nachdem')], ['So entsteht ein Glaubenssatz:', 'Ein Beispiel aus dem Clip:', 'Das hat mich überrascht:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Leas Satz ist gelernt. Was heißt das?', 'Man kann ihn umlernen.', 'Er bleibt für immer.')]),
      modell(alte, 'wie ein Satz einzieht', ['home', 'search', 'users'], { zeit: '8 Min.', wie: 'alle · dann allein',
        leitung: 'Vorlesen, dann allein verbinden und auflösen.',
        fragen: [verbinden('Was passt zu welchem Punkt? Verbinde.', ['Ein Trainer sagt einmal: „Du bist zu langsam.“', 'Seitdem sieht Tom nur noch die Läufe, die er verliert.', 'In der Klasse kennen fast alle so einen Satz.'], ['Du bist nicht allein', 'Sätze haben eine Herkunft', 'Der Kopf sammelt Beweise'])],
        danach: [reden('Woher kommen bei Jugendlichen oft solche Sätze – Schule, Sport, Netz, Freunde?')] }),
      fuerDich('die Fahndung', '8 Min.', fragen(alte.moves[0].kontext ?? null, ...alte.moves[0].fragen)),
    ),
    seite(
      runde('die geheime Zählung', '25 Min.', 'alle · geheim', 'box', {
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
      material('12 Sätze', 5,
        karten(3, 19, 'Ausschneiden und offen auf den Tisch legen. Die Nummer gehört dazu.', SAETZE.map((t, i) => ({ t: `„${t}“`, marke: `Satz ${i + 1}` })))),
      fuerDich('mein Satz und sein Preis', '8 Min.', fragen('Ein Satz aus der Zählung, den du kennst – oder den jemand kennt, den du kennst. Nicht aufschreiben. Sieht keiner.',
        kreuzU('Was tust du, wenn er läuft?', 'mich nicht melden – wie Tom', 'absagen – wie Nora', 'alles perfekt machen – wie Sami', 'so tun, als wäre nichts – wie Finn', 'etwas anderes'),
        kreis('Was kostet er dich? Kreise ein.', 'Spaß', 'Freunde', 'meine Stimme', 'Ruhe', 'Chancen'),
        satz('Meldet er sich diese Woche, sage ich mir – wie eine gute Freundin:', '„'))),
    ),
    seite(
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
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Lio und die 22 Punkte', 2, 'search', reden('Was merkt man sich leichter – ein Lob oder einen fiesen Spruch? Warum wohl?')),
    ),
    seite(
      st('Zu zweit: die Akte Lio', '8 Min.', 'zu zweit', 'folder', 'Erst zu zweit sortieren, dann gemeinsam das Urteil: „zu grob – so stimmt er nicht“.',
        fragen(beweise.moves[0].kontext ?? null, ...beweise.moves[0].fragen)),
      modell(beweise, 'wie man einen Satz prüft', ['scale', 'arrows-left-right', 'pencil'], { zeit: '8 Min.', wie: 'alle · dann allein',
        leitung: 'Vorlesen, dann allein ankreuzen. Faustregel: Kann man es sehen oder zählen? Dann ist es ein Beweis.',
        fragen: [raster('Beweis, Gefühl oder Meinung? Ein Kreuz pro Zeile.', ['Beweis', 'Gefühl', 'Meinung'], 'Lio hat 22 von 60 Punkten.', 'Lio fühlt sich dumm.', 'Der Cousin sagt: „Du checkst nichts.“', 'Lio hat zwei Mopeds repariert.', '„Alle denken, Lio ist faul.“')],
        danach: [reden('Welche Sprüche fühlen sich an wie ein Beweis – sind aber nur eine Meinung?')] }),
    ),
    seite(
      clip(beweise, 'Beweis oder Trick?', [kreuzU('Woran erkennst du einen echten Beweis?', 'Man kann ihn nachprüfen.', 'Er wird laut gesagt.', 'Viele glauben ihn.'), kreuz('Glaubst du schnell, was viele sagen?', 'oft', 'manchmal', 'selten')], ['Ein Trick aus dem Clip:', 'So erkenne ich ihn:', 'Das hat mich überrascht:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Lios Cousin sagt: „Du checkst nichts.“ Was ist das?', 'eine Meinung – kein Beweis', 'ein Beweis')]),
      fuerDich('mein Prüfstand', '8 Min.', fragen('Dein Satz aus Stunde 2 – oder der von jemandem, den du kennst. Sieht keiner.',
        kreuzU('Worauf stützt er sich vor allem?', 'auf ein Gefühl', 'auf einen Spruch von jemandem', 'auf etwas, das man sehen oder zählen kann'),
        satz('Der Test:', 'Ein Beweis dagegen (sehen oder zählen):', 'Mein neuer Satz – wahr, was ich tue, jetzt: „'))),
    ),
    seite(
      runde('der Hinweis-Rundgang', '25 Min.', 'zu zweit · dann alle', 'search', {
        ziel: 'Üben, Hinweise zu sortieren: dafür, dagegen – oder gar kein Beweis.',
        material: 'die 12 Hinweis-Karten von der nächsten Seite (ausschneiden und im Raum aufhängen oder auslegen), Stifte',
        schritte: [
          'Der Fall: Jana, 15, sagt über sich: **„Ich kann nichts.“** Im Raum hängen zwölf Hinweise.',
          'Geht zu zweit von Hinweis zu Hinweis. Kreuzt unten an: **dafür**, **dagegen** oder **kein Beweis** (nur ein Gefühl oder eine Meinung).',
          'Acht Minuten. Dann vergleichen alle: Wo seid ihr euch uneinig? Die Frage hilft: Kann man es sehen oder zählen?',
          'Das Urteil: Stimmt Janas Satz? Alle zeigen gleichzeitig: Daumen hoch, runter oder quer („zu grob“).',
          'Zum Schluss schreibt jedes Paar einen **neuen Satz für Jana**, der den Prüfstand besteht.',
        ],
        zu3: 'Ihr geht zusammen, die Leitung geht allein – dann vergleichen.',
        notiz: { titel: 'Unser neuer Satz für Jana:', linien: 1 },
        auswertung: ['Welcher Hinweis sah aus wie ein Beweis – und war keiner?'],
      }, { danach: [beispiel('So kann es klingen', ['Ben:', 'Hinweis 5: Ihr Bruder sagt, sie kann gar nichts. Das ist „dafür“, oder?'], ['Amira:', 'Nee. Das ist nur eine Meinung. Kann man nicht zählen.'], ['Ben:', 'Stimmt. Kein Beweis.']), tabelle('14mm 1fr 14mm 1fr', ['Nr.', 'dafür · dagegen · kein Beweis', 'Nr.', 'dafür · dagegen · kein Beweis'], [1, 2, 3, 4, 5, 6].map((k) => [String(k), '☐ dafür   ☐ dagegen   ☐ kein Beweis', String(k + 6), '☐ dafür   ☐ dagegen   ☐ kein Beweis']), 6)], leitung: 'Hinweise vorher aufhängen. Lösung: dafür 1, 6, 10 · dagegen 2, 4, 7, 9, 12 · kein Beweis 3, 5, 8, 11.' }),
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
      }, { danach: [beispiel('So kann es klingen', ['Leitung liest:', '„Um Hilfe bitten.“'], ['', 'Auf „drei“ zeigen zwei Leute eine 1. Finn zeigt eine 5.'], ['Finn:', 'Für mich ist das das Schwerste auf der ganzen Leiter.'], ['Mia:', 'Und bei mir ist „Nein sagen“ die 5.'])] }),
    ),
    seite(
      material('16 Mut-Karten', 6, karten(4, 18, 'Ausschneiden und mischen.', MUT.map((t) => ({ t })))),
      fuerDich('mein Wenn-dann', '8 Min.', fragen('Ein Plan schlägt jeden Vorsatz. Nimm deine Karte von der Mut-Leiter.',
        satz('Für die nächste Woche:', 'Mein neuer Satz: „', 'Wenn (wann, wo, bei wem):', 'dann (mein Schritt):', 'Brüllt der alte Satz, sage ich mir: „'),
        { f: 'Wie sehr glaubst du deinen neuen Satz?', regler: ['heute', 'in 7 Tagen'] })),
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
    'Der Fall: Sicher wusste Ben nur: Mila hat die Nachricht gelesen. Den Abend hat ihm sein Film verdorben, nicht Mila.',
    'Was ist das? Zwei blaue Haken und Anrempeln = Situation · „keinen Bock auf mich“ und „nicht gesehen“ = Gedanke · traurig und ruhig = Gefühl.',
    'Drei Filme: „Keinen Bock auf mich“ – traurig, Chat löschen. „Beim Training“ – ruhig, abwarten. Dritter Gedanke zum Beispiel: „Akku leer.“',
    'Zwei Filme: Der zweite Gedanke muss nicht schön sein – er muss auch stimmen können. Runde 1: Gelesen – „keinen Bock“/„gerade keine Zeit“ · tuscheln – „lästern“/„reden über irgendwas“ · Lehrer – „Ärger“/„will nur etwas fragen“ · Party – „keiner will mich“/„nur Platz für wenige“ · Freund – „sauer“/„nicht gesehen“ · Fünf – „dumm“/„zu wenig geübt“ · jemand lacht – „lachen über mich“/„ein Witz“ · Trainer – „Ich war schlecht“/„Kopf woanders“. Eine begründete andere Zuordnung zählt auch.',
  ],
  [
    'Der Fall: „Ich bin zu viel.“ Man sieht ihn an der Hand vor dem Mund und an „Ach, egal“. Der Satz war falsch – gesagt im Stress.',
    'Wie ein Satz einzieht: Trainer-Spruch – Herkunft · Tom sieht nur verlorene Läufe – der Kopf sammelt Beweise · fast alle kennen so einen Satz – du bist nicht allein.',
    'Fahndung: Tom – A (nicht gut genug) · Nora – B (mich mag keiner) · Sami – C (keine Fehler) · Finn – D (stark sein).',
    'Geheime Zählung: Die Zettel danach sofort wegwerfen. Wichtig ist nur das Bild: Viele kennen dieselben Sätze.',
  ],
  [
    'Der Fall: Lios Kopf lässt nicht rein: sieben Punkte mehr, die Mopeds, die Kasse im Praktikum.',
    'Beweis, Gefühl oder Meinung: 22 Punkte und Mopeds = Beweis · fühlt sich dumm = Gefühl · Cousin und „alle denken“ = Meinung.',
    'Akte Lio: dafür – 22 von 60 · dagegen – sieben Punkte mehr, Mopeds, Kasse · kein Beweis – fühlt sich dumm, Satz des Cousins. Urteil: zu grob.',
    'Mein Prüfstand: Ein Satz besteht, wenn er wahr ist, sagt, was man tut, und jetzt gilt – zum Beispiel „Mathe fällt mir schwer. Ich bleibe trotzdem dran.“',
    'Hinweis-Rundgang: dafür 1, 6, 10 · dagegen 2, 4, 7, 9, 12 · kein Beweis 3, 5, 8, 11. Urteil: zu grob. Neuer Satz zum Beispiel: „Manches fällt mir schwer. Vieles kann ich.“',
  ],
  [
    'Der Fall: Der alte Satz brüllt „Halt die Klappe“. Mia war mutig – mit Herzklopfen. Der Moment ist Beweis Nummer eins.',
    'Klein genug: Frage in der Pause, einmal Nein sagen, jemanden grüßen. Zu groß: Rede vor der ganzen Schule, nie mehr Angst haben.',
    'Mut-Leiter: Es gibt keine richtige Reihenfolge. Wichtig: Der eigene Schritt ist klein genug, dass er heute wirklich passiert.',
    'Schluss: Der alte Satz kommt wieder. Das ist normal.',
  ],
]

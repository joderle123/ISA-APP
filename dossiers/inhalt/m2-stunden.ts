// REAL TALK #02 · GEFÜHLE – vier Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 geht vom eigenen Erleben aus, Stunde 2 vom Modell und Clip, Stunde 3 von einem Körper-Experiment, Stunde 4 von einem Zahlen-Spiel.
// Neu im Sweet Spot (24.11.2026, nach dem Pilot #01): „Kennst du das?“, Sprechblasen zum Reden, kurze Fälle, Modelle mit einer
// einfachen Übung (Verbinden, Ankreuzen), große Runden ohne Punkte und mit Beispiel, mehr Fragen zu den Clips.
// Die Person in Stunde 4 heißt jetzt Ines (vorher Nele – Rückmeldung zu #01: „Vergiss Nele komplett“).
import type { Heft, Stunde } from '../typen'
import { ankommen, beispiel, clip, fall, fragen, fuerDich, karten, kennstDu, kreuz, kreuzU, material, modell, raster, reden, runde, satz, schluss, seite, st, stunde, strich, tabelle, text, verbinden, weiter, zeile } from './stunden-hilfe'

const GEFUEHLE = (l: string[]) => l.map((t) => ({ t }))

export function stunden(d: Heft): Stunde[] {
  const [wozu, steuer, koerper, alles] = d.tracks
  // Der Clip über das Steuerpult der Gefühle passt zu Stunde 2 („Wer sitzt am Steuer?“), nicht zu Stunde 4.
  steuer.clip = { ...alles.clip!, frage: 'Welches Gefühl würdest du abschaffen – und warum wäre das keine gute Idee?' }
  delete alles.clip

  /* ---------- Stunde 1 · Wozu der Mist? ---------- */
  const s1 = stunde('Wozu sind Gefühle gut – auch die, die nerven?', ['sagen, was Angst, Wut und Trauer dir melden', 'mehr als zwei Wörter für Gefühle benutzen', 'ein Gefühl genauer benennen'],
    seite(
      ankommen('ein Wort für heute', strich('Wie geht es dir gerade?', 'schlecht', 'gut'), zeile('Ein Wort für dein Gefühl heute:')),
      st('Kennst du das?', '8 Min.', 'allein · dann alle', 'hand-finger', 'Erst still ankreuzen, dann jeden Satz vorlesen – alle zeigen gleichzeitig den Daumen, Sie auch. Nur zählen, nicht nachfragen.',
        fragen('Kreuz an, was du kennst. Danach zeigen alle gleichzeitig den Daumen.',
          kennstDu('Kennst du das?', 'Ich sage „gut“, auch wenn es nicht stimmt.', 'Ich weiß manchmal nicht, was ich gerade fühle.', 'Ich werde wütend, obwohl ich eigentlich traurig bin.', 'Ich zeige lieber kein Gefühl, damit es keiner ausnutzt.', 'Ich lache, wenn mir eigentlich zum Heulen ist.')),
        reden('Welchen Satz kannten fast alle?')),
      fall(wozu, 'Lio hat nur zwei Wörter', [
        kreuzU('Warum sagt Lio nur „beschissen“?', 'Er will frech sein.', 'Er hat nur zwei Wörter für Gefühle.', 'Es ist ihm egal.'),
        { f: 'Welche drei Gefühle hat Lio heute wirklich? Kreise sie ein.', kreis: ['Wut', 'Angst', 'Scham', 'Freude', 'Ekel', 'Neid'] },
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
    ),
    seite(
      weiter('Der Fall: Lio hat nur zwei Wörter', 3, 'search', reden('Welche zwei Wörter benutzt ihr am häufigsten, wenn jemand fragt: „Wie geht’s?“')),
      clip(wozu, 'Wozu Gefühle da sind',
        [kreuzU('Wozu sind Gefühle da?', 'Sie stören nur.', 'Sie melden etwas.', 'Für nichts.'), kreuz('Welches Gefühl hättest du am liebsten nie?', 'Angst', 'Wut', 'Trauer', 'Scham')],
        ['Gefühle sind wie ein …', 'Das meldet die Wut:', 'Das passiert, wenn man ein Gefühl beim Namen nennt:'],
        [kreuzU('Was passiert laut Video, wenn man Gefühle immer wegdrückt?', 'Der Körper meldet sich: Stress, schlechter Schlaf, Bauchweh.', 'Nichts.', 'Man wird stärker.'), kreuzU('Was hilft Lio am meisten?', 'mehr Wörter für Gefühle', 'sich zusammenreißen', 'nichts mehr fühlen')], '12 Min.',
        '00:00 bis 04:57 zeigen. Leichte Sprache, gute Beispiele. Kern: Gefühle sind wie ein Navi. Wut meldet: Eine Grenze wurde überschritten. Trauer zeigt, was wichtig war. Wer genau sagt „Ich bin traurig“ statt „Mir geht’s schlecht“, beruhigt sein Gehirn.'),
      modell(wozu, 'Gefühle sind Nachrichten', ['mail', 'mood-smile', 'tool'], { zeit: '10 Min.', wie: 'alle · dann allein',
        leitung: 'Vorlesen, dann allein verbinden und gemeinsam auflösen.',
        fragen: [verbinden('Jedes Gefühl schickt eine Nachricht. Verbinde.', ['Angst', 'Wut', 'Trauer', 'Ekel', 'Freude'], ['Mehr davon!', 'Pass auf!', 'Halt Abstand!', 'Jemand geht über deine Grenze.', 'Du hast etwas verloren.'])],
        danach: [reden('Welches Gefühl hat euch zuletzt eine wichtige Nachricht geschickt?')] }),
    ),
    seite(
      runde('Wörter-Jagd', '25 Min.', 'alle · am Tisch', 'cards', {
        ziel: 'Zusammen viele Wörter für Gefühle finden – und merken, zu welchem Grundgefühl sie gehören.',
        material: 'die sechs Grundgefühle und die 24 Wort-Karten von der nächsten Seite (ausschneiden), ein Bogen Papier, Stifte',
        schritte: [
          'Legt die sechs Grundgefühle auf den Tisch. Die 24 Wort-Karten werden gemischt und verteilt.',
          'Reihum legt jede Person eine Karte zu dem Grundgefühl, zu dem sie passt. Passt sie zu zweien? Dann dazwischen.',
          '**Das Ziel der Gruppe:** Schreibt danach in fünf Minuten zusammen **30 weitere Gefühlswörter** auf den Bogen.',
          'Zum Schluss: Jede Person kreist ein Wort ein, das sie diese Woche schon gefühlt hat.',
        ],
        regeln: ['Es gibt keine Punkte und keine Teams. Ihr spielt zusammen gegen die Uhr.', 'Niemand muss sagen, warum er ein Wort eingekreist hat.'],
        zu3: 'Ziel: 20 weitere Wörter.',
        auswertung: ['Für welches Grundgefühl habt ihr die meisten Wörter?', 'Welche Karte lag zwischen zwei Gefühlen – und warum?'],
      }, { danach: [beispiel('So kann es klingen', ['Sami legt „genervt“:', 'Das kommt zu Wut.'], ['Amira legt „einsam“:', 'Zwischen Trauer und Angst, oder?'], ['Ben:', 'Passt.'])] }),
      fuerDich('mehr als zwei Tasten', '8 Min.', fragen('Statt „gut“ und „schlecht“: Kreise ein, was du von dieser Woche kennst.', ...wozu.moves[1].fragen, satz('Blätter zurück zu Station 1: Findest du jetzt ein genaueres Wort für heute?', 'Mein Wort:'))),
    ),
    seite(
      material('6 Grundgefühle und 24 Wörter', 5,
        karten(3, 15, 'Die sechs Grundgefühle: ausschneiden und auf den Tisch legen.', GEFUEHLE(['Freude', 'Trauer', 'Angst', 'Wut', 'Ekel', 'Überraschung']), true),
        karten(4, 15, 'Die 24 Wörter: ausschneiden, mischen, verteilen.', GEFUEHLE(['genervt', 'enttäuscht', 'einsam', 'überfordert', 'neidisch', 'beschämt', 'gelangweilt', 'besorgt', 'leer', 'gekränkt', 'stolz', 'erleichtert', 'ruhig', 'dankbar', 'aufgedreht', 'verknallt', 'sicher', 'neugierig', 'panisch', 'sauer', 'angewidert', 'erschrocken', 'traurig', 'nervös']), true)),
      schluss(wozu, 'drei Wörter für Lio', [satz('Die Betreuerin fragt noch einmal: „Was genau?“ Lio könnte sagen:', 'Ich bin')], ['1', '2', '3']),
    ),
  )

  /* ---------- Stunde 2 · Wer sitzt am Steuer? ---------- */
  const SITUATIONEN = ['Dein bester Freund sagt zum dritten Mal ab.', 'Du wirst vor allen gelobt.', 'Jemand hat in deinen Sachen gewühlt.', 'Morgen ist ein wichtiges Gespräch.', 'Du hast etwas Peinliches geschickt – an die falsche Person.', 'Ihr zieht um. Keiner hat dich gefragt.', 'Jemand lacht, als du reinkommst.', 'Du bekommst etwas geschenkt, das du dir lange gewünscht hast.', 'Dein Handy ist weg.', 'Jemand, den du magst, schreibt nicht zurück.', 'Du sollst vor der Klasse etwas sagen.', 'Jemand isst mit offenem Mund direkt neben dir.']
  const s2 = stunde('Welches Gefühl sitzt bei dir gerade am Steuer?', ['merken, welches Gefühl dich gerade lenkt', 'sagen, wofür Kummer gut ist', '„mir egal“ übersetzen'],
    seite(
      ankommen('dein Pult heute', { f: 'Stell dir vor: Ein Gefühl lenkt dich gerade wie ein Fahrer. Welches? Kreise ein.', kreis: ['Freude', 'Kummer', 'Angst', 'Wut', 'Ekel', 'Langeweile'] }),
      st('Erst still: drei Ohren', '5 Min.', 'alle · still', 'ear', 'Die Minuten ansagen. Augen zu ist freiwillig.',
        text('Augen zu oder Blick auf einen Punkt. Eine Minute: Was hörst du **ganz nah**? Eine Minute: Was hörst du **weit weg**? Eine Minute: Was ist das **leiseste** Geräusch, das du finden kannst?')),
      modell(steuer, 'das Steuerpult im Kopf', ['steering-wheel', 'arrows-shuffle', 'heart-handshake'], { zeit: '10 Min.', wie: 'alle · dann allein', intro: 'In deinem Kopf steht ein Steuerpult. Immer sitzt ein Gefühl daran – und lenkt, was du hörst und was du tust.',
        leitung: 'Vorlesen. Die Übung allein, dann zwei, drei Antworten hören: Derselbe Satz klingt mit Wut plötzlich wie ein Angriff.',
        fragen: [satz('Die Betreuerin sagt: „Kannst du mal kurz kommen?“ Was denkst du – je nachdem, wer am Steuer sitzt?', 'Mit Wut am Steuer denke ich:', 'Mit Angst am Steuer denke ich:', 'Mit Freude am Steuer denke ich:')],
        danach: [reden('Welches Gefühl sitzt bei euch montagmorgens am Steuer?')] }),
    ),
    seite(
      clip(steuer, 'Welches Gefühl darf bleiben?',
        [kreuzU('Welches Gefühl würdest du am liebsten abschaffen?', 'Angst', 'Wut', 'Kummer', 'Langeweile', 'keins'), kreuzU('15 Minuten allein, nichts zu tun – nur ein Knopf für einen kleinen Stromschlag. Was glaubst du?', 'Keiner drückt.', 'Viele drücken.')],
        ['Diese Gefühle haben eine Aufgabe:', 'So ging der Versuch mit dem Knopf aus:', 'Dafür ist Langeweile gut:'],
        [kreuz('Würdest du dein Gefühl immer noch abschaffen?', 'ja', 'nein', 'weiß nicht'), zeile('Wofür ist Kummer gut? (Tipp: Was zeigt er dir?)')], '15 Min.',
        'Nur 02:29 bis 05:58 zeigen – davor und danach geht es um Synchronsprechen. Kern: Es gibt keine schlechten Gefühle; Angst, Wut und Langeweile haben eine Aufgabe. Langeweile ist wie ein Kompass und bringt auf neue Ideen. Versuch: Viele Männer und ein Viertel der Frauen gaben sich lieber einen Stromschlag, als sich 15 Minuten zu langweilen.'),
      fall(steuer, 'Noah und „mir egal“', [
        kreuzU('Was heißt „mir egal“ bei Noah wirklich?', 'Es ist ihm wirklich egal.', 'Es ist ihm zu viel.', 'Er will cool wirken.'),
        { f: 'Wer saß bei Noah die ganze Zeit am Steuer? Kreise ein.', kreis: ['Kummer', 'Wut', 'Freude', 'Angst', 'Ekel'] },
        kreuzU('Was hätte Noah geholfen?', 'noch länger zocken', 'jemandem sagen, dass er traurig ist', 'gar nichts fühlen'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Noah und „mir egal“', 4, 'search', reden('Kennt ihr Leute, die immer „mir egal“ sagen? Was steckt oft dahinter?')),
    ),
    seite(
      fuerDich('mein Steuerpult', '6 Min.', fragen('Nur für dich.', { f: 'Wer sitzt bei dir am häufigsten am Steuer? Kreise ein.', kreis: ['Freude', 'Kummer', 'Angst', 'Wut', 'Ekel', 'Langeweile'] },
        satz('Wann sagst du „mir egal“ – obwohl es nicht stimmt? Wie bei Noah übersetzt:', '„Mir egal“ heißt dann eigentlich:'))),
      runde('die Pult-Wette', '25 Min.', 'alle · am Tisch', 'cards', {
        ziel: 'Merken, dass dieselbe Situation bei jedem ein anderes Gefühl ans Steuer holt.',
        material: 'die fünf Gefühle und die 12 Situations-Karten von der nächsten Seite (ausschneiden), drei Münzen oder Büroklammern pro Person',
        schritte: [
          'Die fünf Gefühle liegen im Halbkreis auf dem Tisch: Das ist das Steuerpult.',
          'Die Leitung liest eine Situation vor. Eine Person tippt still: Wo landen gleich die meisten Münzen?',
          'Alle legen **gleichzeitig** eine Münze zu dem Gefühl, das bei ihnen ans Steuer käme.',
          'Aufdecken: Lag der Tipp richtig? Dann tippt die nächste Person.',
        ],
        runden: [
          { t: 'Runde 1 · eine Münze', x: 'Ein Gefühl pro Person. Sechs Situationen.' },
          { t: 'Runde 2 · drei Münzen', x: 'Drei Münzen verteilen: alle auf ein Gefühl oder gemischt.' },
          { t: 'Runde 3 · eigene Karte', x: 'Wer mag, erfindet eine Situation. Die anderen legen.' },
        ],
        regeln: ['Es gibt keine Punkte. Niemand muss sagen, warum er wo gelegt hat.'],
        zu3: 'Alle tippen, dann legen alle – auch die Leitung.',
        notiz: { titel: 'Bei dieser Situation lagen die Münzen am weitesten auseinander:', linien: 1 },
        auswertung: ['Wo hat die Gruppe ganz anders gelegt, als ihr gedacht habt?', 'Bei welcher Situation lag Kummer vorn? Wozu ist er dann gut?'],
      }, { danach: [beispiel('So kann es klingen', ['Leitung liest:', '„Dein Handy ist weg.“'], ['', 'Drei Münzen landen bei Angst, eine bei Wut.'], ['Finn:', 'Bei mir ist das Wut. Ich weiß genau, wer es war.'])] }),
    ),
    seite(
      material('5 Gefühle und 12 Situationen', 6,
        karten(5, 16, 'Das Steuerpult: ausschneiden und im Halbkreis legen.', GEFUEHLE(['Freude', 'Kummer', 'Angst', 'Wut', 'Ekel']), true),
        karten(3, 19, 'Die Situationen: ausschneiden, mischen, verdeckt stapeln.', SITUATIONEN.map((t) => ({ t })))),
      schluss(steuer, 'Noahs Bruder fragt', [kreuzU('Der kleine Bruder fragt: „Bist du traurig?“ Was könnte Noah diesmal sagen?', '„Mir egal.“', '„Ja. Ein bisschen.“', 'nichts'), { f: 'Schau auf Station 1: Wer sitzt jetzt bei dir am Steuer?', kreis: ['Freude', 'Kummer', 'Angst', 'Wut', 'Ekel', 'Langeweile'] }], ['1', '2', '3', '4', '5']),
    ),
  )

  /* ---------- Stunde 3 · Körper-Alarm ---------- */
  const s3 = stunde('Woran merkst du ein Gefühl, bevor es knallt?', ['sagen, wo im Körper sich Wut, Angst und Trauer melden', 'dein erstes Signal finden', 'einmal durch den Körper wandern (Bodyscan)'],
    seite(
      ankommen('dein Körper gerade', strich('Wie ruhig ist dein Körper gerade?', 'unruhig', 'ruhig'), { f: 'Wo merkst du Aufregung zuerst? Kreise ein.', kreis: ['Bauch', 'Brust', 'Hals', 'Hände', 'Kopf', 'weiß nicht'] }),
      st('Erst machen: das Körper-Labor', '10 Min.', 'alle gleichzeitig', 'flask', 'Alle machen gleichzeitig mit, auch Sie – so schaut niemand zu. Nach jedem Experiment zehn Sekunden still.',
        fragen('Vier kurze Experimente. Alle machen sie **gleichzeitig** – niemand schaut zu. Nach jedem: zehn Sekunden still stehen und spüren.', ...koerper.moves[0].fragen)),
    ),
    seite(
      modell(koerper, 'jedes Gefühl hat ein Muster', ['flame', 'heartbeat', 'weight'], { zeit: '10 Min.', wie: 'alle · dann allein', intro: 'So spüren es viele Menschen. Bei dir kann es anders sein.',
        leitung: 'Vorlesen. Allein ankreuzen, dann auflösen – Herzklopfen passt auch zu Wut; wer begründet, liegt richtig.',
        fragen: [raster('Zu welchem Muster passt das Signal? Ein Kreuz pro Zeile.', ['Wut · heiß', 'Angst · eng', 'Trauer · schwer'], 'Fäuste ballen', 'Kloß im Hals', 'Herzklopfen', 'Hitze im Gesicht', 'schwere Arme und Beine', 'Knoten im Bauch')],
        danach: [reden('Woran merken andere bei euch, dass ihr wütend werdet – noch bevor ihr etwas sagt?')] }),
      fall(koerper, 'Lina lächelt', [
        { f: 'Welche Signale sendet Linas Körper? Kreise alle ein.', kreis: ['Stein im Magen', 'kalte Hände', 'Zähne mahlen', 'Zittern', 'Hunger', 'Müdigkeit'] },
        kreuzU('Was sagt Linas Gesicht – und was sagt ihr Körper?', 'Gesicht: alles gut. Körper: Alarm.', 'Beide sagen: alles gut.', 'Beide sagen: Alarm.'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase – nur erzählen lassen, wer mag.' }),
      weiter('Der Fall: Lina lächelt', 4, 'search', reden('Kennt ihr das: lächeln, obwohl es innen ganz anders aussieht?')),
    ),
    seite(
      clip(koerper, 'Was die Haltung mit dir macht',
        [kreuzU('Kann deine Körperhaltung ein Gefühl verändern?', 'ja', 'ein bisschen', 'nein'), kreuz('Wie sitzt du gerade?', 'aufrecht', 'zusammengesunken', 'irgendwie')],
        ['Das macht die Haltung mit dem Gefühl:', 'Das probiere ich aus:', 'Das hat mich überrascht:'],
        [kreuz('Hast du beim Schauen etwas ausprobiert?', 'ja', 'nein'), kreuzU('Die Tante sagt wieder so einen Satz. Was kann Lina mit ihrem Körper tun?', 'weiter lächeln', 'aufrecht hinstellen und tief atmen', 'die Zähne zusammenbeißen')]),
      runde('der Song-Tipp', '20 Min.', 'alle', 'music', {
        ziel: 'Merken, wo Musik im Körper ankommt – und dass sie bei jedem woanders landet.',
        material: 'vier bis fünf Songs (fröhlich, traurig, wütend, ruhig) und etwas zum Abspielen',
        schritte: [
          'Die Leitung spielt 30 Sekunden von einem Song – oder ihr schlagt einen vor.',
          'Alle tragen still ein: Welches Gefühl? Wie stark, von 0 bis 10? Wo im Körper?',
          'Auf „drei“ zeigen alle **gleichzeitig** die Zahl mit den Fingern. Wer mag, zeigt auf die Stelle am Körper.',
        ],
        regeln: ['Niemand muss tanzen, singen oder etwas erklären.'],
        auswertung: ['Welcher Song ist bei euch direkt in den Körper gegangen?', 'Bei welchem Song lagen eure Zahlen weit auseinander?'],
      }, { leitung: 'Songs vorher auswählen, gern ohne Text. Vorschläge der Jugendlichen kurz selbst anhören – keine Texte mit Gewalt oder Abwertung.', danach: [tabelle('18mm auto 22mm auto', ['Song', 'Gefühl', '0 bis 10', 'Wo im Körper?'], [['1', '', '', ''], ['2', '', '', ''], ['3', '', '', ''], ['4', '', '', '']], 8)] }),
    ),
    seite(
      fuerDich('mein erstes Signal', '8 Min.', fragen('Denk an einen Moment, in dem du wütend oder ängstlich wurdest. Nur für dich.', ...koerper.moves[1].fragen, kreuz('Wenn dein erstes Signal kommt – was machst du dann?', 'lang ausatmen', 'aufrecht hinstellen', 'kurz rausgehen', 'drei Ohren'), satz('Dein Plan:', 'Wenn ich … merke,', 'dann …'))),
      st('Der Skill: Bodyscan kurz', '8 Min.', 'alle · still', 'scan', 'Langsam ansagen. Augen zu ist freiwillig. Nichts kommentieren.',
        text('Sitzen oder liegen. Augen zu oder Blick auf einen Punkt. Einmal tief ein, langsam aus. Wandere mit der Aufmerksamkeit: **Stirn, Kiefer, Schultern – Brust und Bauch – Hände – Beine und Füße.** Nur hinschauen, nichts ändern.')),
      schluss(koerper, 'Linas erstes Signal', [kreuzU('Lina zittert später in ihrem Zimmer. Was war ihr erstes Signal – schon bei der Tante?', 'der Stein im Magen', 'das Zittern', 'gar nichts')], ['1', '2']),
    ),
  )

  /* ---------- Stunde 4 · Alles gleichzeitig ---------- */
  const s4 = stunde('Kann man froh und sauer gleichzeitig sein?', ['zwei Gefühle auf einmal benennen', 'sagen, wie stark ein Gefühl ist – von 0 bis 10', 'unter der Wut nachschauen, was noch da ist'],
    seite(
      ankommen('etwas, das dich aufgeregt hat', kreuzU('Hast du letzte Woche dein erstes Signal erwischt?', 'ja, und meinen Plan probiert', 'nur das Signal erwischt', 'nicht dran gedacht'), zeile('Was hat dich zuletzt aufgeregt? Ein Stichwort reicht.')),
      st('Erst machen: der Zwillings-Check', '6 Min.', 'zu zweit · Rücken an Rücken', 'users', 'Fragen: Bus fährt weg (wie genervt?) · Morgen ist frei (wie froh?) · Akku 1 % (wie nervös?) · Jemand sitzt auf deinem Platz (wie sauer?) · Dein Lieblingslied läuft (wie gut gelaunt?). Schnell hintereinander.',
        text('Stellt euch zu zweit mit dem Rücken zueinander (zu dritt geht auch). Die Leitung fragt: „Der Bus fährt dir vor der Nase weg. Wie genervt bist du, von 0 bis 10?“ Auf „drei“ zeigt ihr die Zahl mit den Fingern und dreht euch um. **Gleiche Zahl = Zwilling.** Fünf Fragen.'),
        fragen(null, kreuz('Wie oft wart ihr Zwillinge?', '0', '1–2', '3–5'))),
      fall(alles, 'Ines zieht um', [
        { f: 'Welche Gefühle hat Ines? Kreise alle ein.', kreis: ['Freude', 'Wut', 'Trauer', 'Angst', 'Ekel', 'Stolz'] },
        kreuzU('Alle sagen: „Freu dich doch!“ Was stimmt?', 'Ines muss sich für ein Gefühl entscheiden.', 'Alle vier Gefühle sind echt.', 'Ines übertreibt.'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase. Der Fall kann eigene Erfahrungen berühren – niemand muss erzählen.' }),
    ),
    seite(
      weiter('Der Fall: Ines zieht um', 3, 'search', reden('Wann hattet ihr zuletzt zwei Gefühle auf einmal – zum Beispiel froh und traurig?')),
      modell(alles, 'mischen und regeln', ['arrows-shuffle', 'adjustments', 'volume'], { zeit: '10 Min.', wie: 'alle · dann allein',
        leitung: 'Vorlesen, dann allein verbinden. Die Lösung ist nicht eindeutig – es zählt die Begründung.',
        fragen: [verbinden('Was sitzt unter der Wut? Verbinde jeden wütenden Satz mit dem leisen Gefühl darunter.', ['„Dann geh doch!“ – sein bester Freund zieht weg.', '„Lacht nicht!“ – alle lachen über ihren Fehler.', '„Nie sagt mir jemand was!“ – vor einer Untersuchung.'], ['Angst', 'Trauer', 'Scham'])],
        danach: [reden('Woran merkt ihr bei anderen, dass unter der Wut noch etwas sitzt?')] }),
      fuerDich('mein Mischpult', '8 Min.', fragen(alles.moves[0].kontext ?? null, ...alles.moves[0].fragen.slice(0, 1), kreuz('Welches wäre bei dir am lautesten?', 'Wut', 'Trauer', 'Angst', 'Scham'))),
    ),
    seite(
      runde('Chips setzen', '25 Min.', 'alle · am Tisch', 'coins', {
        ziel: 'Sehen, dass eine Situation mehrere Gefühle gleichzeitig auslöst – und bei jedem anders stark.',
        material: 'die sechs Gefühle und die 9 Situations-Karten von der nächsten Seite (ausschneiden), drei Chips pro Person (Münzen, Büroklammern)',
        schritte: [
          'Die sechs Gefühle liegen in der Mitte.',
          'Die Leitung liest eine Situation vor. Alle setzen **gleichzeitig** ihre drei Chips – alle auf ein Gefühl oder verteilt.',
          'Schaut, wo die Stapel liegen. Wer mag, sagt einen Satz dazu.',
        ],
        runden: [
          { t: 'Runde 1 · setzen', x: 'Drei Chips verteilen. Fünf Situationen.' },
          { t: 'Runde 2 · Zahl zeigen', x: 'Dazu auf „drei“ mit den Fingern zeigen: Wie stark ist dein größtes Gefühl, 0 bis 10?' },
          { t: 'Runde 3 · drunter', x: 'Bei „Wut“ liegt viel? Dann setzt jeder einen Chip: Was sitzt darunter?' },
        ],
        regeln: ['Es gibt keine Punkte. Niemand muss erklären, wo seine Chips liegen.'],
        zu3: 'Die Leitung setzt mit.',
        notiz: { titel: 'Bei dieser Situation lagen die Chips am weitesten verstreut:', linien: 1 },
        auswertung: ['Bei welcher Situation hattet ihr froh und sauer gleichzeitig?', 'Was lag am häufigsten unter der Wut?'],
      }, { danach: [beispiel('So kann es klingen', ['Leitung liest:', '„Du hast gewonnen. Dein Freund hat verloren.“'], ['', 'Chips landen bei Freude, Scham und Zweifel.'], ['Mia:', 'Ich freu mich – aber ich trau mich nicht, es zu zeigen.'])] }),
    ),
    seite(
      material('6 Gefühle und 9 Situationen', 5,
        karten(3, 16, 'Die sechs Gefühle: ausschneiden und in die Mitte legen.', GEFUEHLE(['Freude', 'Trauer', 'Wut', 'Angst', 'Scham', 'Zweifel']), true),
        karten(3, 25, 'Die Situationen: ausschneiden, mischen, verdeckt stapeln.', ['Du wirst vor allen gelobt.', 'Deine beste Freundin zieht weg – in eine tolle Stadt.', 'Du hast gewonnen. Dein Freund hat verloren.', 'Die Ferien fangen an. Zu Hause ist dicke Luft.', 'Du hast endlich Nein gesagt.', 'Jemand entschuldigt sich bei dir – vor allen.', 'Dein kleiner Bruder bekommt, was du nie bekommen hast.', 'Letzter Tag in der alten Klasse.', 'Du wirst nicht gewählt – dein Kumpel schon.'].map((t) => ({ t })))),
      schluss(alles, 'deine zwei Gefühle', [satz('Blätter zurück zu Station 1: Was dich aufgeregt hat – welche zwei Gefühle waren es, und wie stark?', 'Gefühl 1 (0–10):', 'Gefühl 2 (0–10):')]),
    ),
  )
  return [s1, s2, s3, s4]
}


/** Lösungen für die Leitung – passend zu den Stationen oben */
export const loesungen: string[][] = [
  [
    'Kennst du das? Kein Richtig oder Falsch – es geht ums Wiedererkennen.',
    'Der Fall: Lio hat nur zwei Wörter für Gefühle. Heute sind es drei Gefühle: Wut (auf den Bruder), Angst (vor dem Gespräch), Scham (wegen gestern).',
    'Clip: Gefühle sind wie ein Navi. Wut meldet: Eine Grenze wurde überschritten. Trauer zeigt, was wichtig war; Freude, was guttut. Wegdrücken macht Stress, schlechten Schlaf, Verspannung, Bauchweh. Ein Gefühl genau benennen beruhigt das Gehirn. Danach 1: der Körper meldet sich · Danach 2: mehr Wörter für Gefühle.',
    'Das Modell: Angst – Pass auf! · Wut – Jemand geht über deine Grenze · Trauer – Du hast etwas verloren · Ekel – Halt Abstand! · Freude – Mehr davon!',
    'Wörter-Jagd: Viele Wörter passen zu zwei Grundgefühlen (neidisch: Wut und Trauer; nervös: Angst). Es zählt, dass die Gruppe es begründen kann.',
    'Schluss: zum Beispiel „Ich bin sauer, ich habe Angst vor morgen und ich schäme mich.“',
  ],
  [
    'Das Modell: keine richtigen Antworten – mit Wut am Steuer klingt der Satz nach Ärger, mit Angst nach Gefahr, mit Freude neutral.',
    'Clip: Keine schlechten Gefühle – Angst, Wut, Langeweile haben eine Aufgabe. Versuch: 67 % der Männer und 25 % der Frauen drückten lieber den Stromschlag-Knopf, als sich 15 Minuten zu langweilen. Langeweile ist wie ein Kompass. Kummer zeigt, was wichtig war, und holt Hilfe.',
    'Der Fall: „Mir egal“ heißt bei Noah: Es ist ihm zu viel. Am Steuer saß die ganze Zeit Kummer. Geholfen hätte: jemandem sagen, dass er traurig ist. Wer Wut einkreist, liegt nicht falsch: Am Ende springt Wut ans Steuer – darunter sitzt Kummer.',
    'Pult-Wette: Es gibt keine richtige Lösung. Wichtig ist der Moment, in dem die Münzen weit auseinanderliegen: gleiche Situation, anderes Gefühl.',
    'Schluss: „Ja. Ein bisschen.“ reicht – ein ehrlicher Satz statt „mir egal“.',
  ],
  [
    'Körper-Labor: 1 Sprint – Herz/Atem, Hitze (wie Angst oder Wut); 2 Anspannen – Muskeln (wie Wut); 3 Zeitlupe – Schwere (wie Trauer); 4 Siegerpose – Weite (wie Freude, Stolz).',
    'Das Modell: Fäuste, Hitze im Gesicht – Wut · Herzklopfen, Knoten im Bauch – Angst (Herzklopfen auch Wut) · Kloß im Hals, schwere Arme und Beine – Trauer.',
    'Der Fall: Stein im Magen, kalte Hände, Zähne mahlen, Zittern. Gesicht: alles gut. Körper: Alarm. Erstes Signal: der Stein im Magen.',
    'Song-Tipp: kein Richtig oder Falsch. Clip: aufrecht hinstellen und tief atmen. Vorsicht: Die Wirkung der Haltung auf Gefühle ist in Studien klein und umstritten – als Versuch anbieten, nicht als sicheren Trick.',
  ],
  [
    'Der Fall: Freude, Wut, Trauer und Angst – alle vier sind echt. Ines muss sich nicht entscheiden.',
    'Das Modell: Freund zieht weg – Trauer · alle lachen – Scham · vor der Untersuchung – Angst. Andere Antworten mit guter Begründung gelten.',
    'Chips setzen: keine richtige Lösung. Unter der Wut liegen oft Scham, Enttäuschung oder Angst.',
  ],
]

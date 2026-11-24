// REAL TALK #02 · GEFÜHLE – vier Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 geht vom Fall aus, Stunde 2 vom Modell und Clip, Stunde 3 von einem Körper-Experiment, Stunde 4 von einem Zahlen-Spiel.
// Vertieft 24.11.2026 (Rückmeldung: Fälle schwerer, Modelle mit Übung): Jeder Fall ist eine Ermittlung mit Spuren – die Gefühle
// stehen nicht mehr im Text, sie werden gefunden. Jedes Modell hat eine Übung (Nachrichten zuordnen, derselbe Satz mit anderem
// Fahrer, Körpersignale sortieren, was unter der Wut sitzt).
import type { Heft, Stunde } from '../typen'
import { ankommen, clip, ermittlung, fallWeiter, fragen, fuerDich, karten, kreuz, kreuzU, material, modell, raster, runde, satz, schluss, seite, st, stunde, strich, tabelle, text, theorien, wortkasten, zeile } from './stunden-hilfe'

const GEFUEHLE = (l: string[]) => l.map((t) => ({ t }))

export function stunden(d: Heft): Stunde[] {
  const [wozu, steuer, koerper, alles] = d.tracks
  // Der Clip über das Steuerpult der Gefühle passt zu Stunde 2 („Wer sitzt am Steuer?“), nicht zu Stunde 4. Der frühere Clip
  // von Stunde 2 („nichts spüren“) passte nicht zum Fall und entfällt.
  steuer.clip = { ...alles.clip!, frage: 'Welches Gefühl würdest du abschaffen – und warum wäre das keine gute Idee?' }
  delete alles.clip

  /* ---------- Stunde 1 · Wozu der Mist? ---------- */
  const s1 = stunde('Wozu sind Gefühle gut – auch die, die nerven?', ['versteckte Gefühle in Spuren finden', 'sagen, was Angst, Wut, Trauer und Scham dir melden', 'ein Gefühl genauer benennen'],
    seite(
      ankommen('ein Wort für heute', strich('Wie geht es dir gerade?', 'schlecht', 'gut'), zeile('Ein Wort für dein Gefühl heute:')),
      ermittlung(wozu, 'Hinter „beschissen“',
        'Die Betreuerin fragt: „Wie geht’s dir?“ Lio: „Beschissen.“ – „Was genau?“ – „Na, beschissen halt.“ Lio meint das nicht frech. Er hat nur zwei Wörter: gut und beschissen. **Hinter „beschissen“ stecken heute drei Gefühle.** Findet sie.',
        [
          ['A', 'headphones', 'Küche, 7:30 Uhr', 'Lios kleiner Bruder hat seine Kopfhörer kaputt gemacht. „War keine Absicht!“ Lio knallt die Tür.'],
          ['B', 'device-mobile', 'Lios Handy, gestern 22:10', 'Lio schreibt im Klassenchat etwas Gemeines über Ben. Zwei Minuten später löscht er es. Drei haben es schon gelesen.'],
          ['C', 'file-text', 'Zettel im Rucksack', 'Morgen, 9 Uhr: Gespräch wegen der Fehlstunden – mit der Betreuerin und der Schulleitung.'],
          ['D', 'tools-kitchen-2', 'Die Betreuerin', '„Beim Mittagessen hat er keinen angeschaut. Sonst redet er beim Essen am meisten.“'],
          ['E', 'user', 'Ben aus der Klasse', '„Lio ist mir heute den ganzen Tag ausgewichen. Keine Ahnung, warum.“'],
        ],
        [
          { f: 'Welche drei Gefühle stecken hinter „beschissen“? Schreib die Spur dazu – und was das Gefühl Lio melden will.', preis: { erste: 'Gefühl', kopf: ['Spur', 'Es meldet Lio …'], optionen: ['Wut', 'Angst', 'Scham'] } },
        ], { zeit: '15 Min.' }),
    ),
    seite(
      fallWeiter('Hinter „beschissen“', 2, null,
        satz('Welches der drei Gefühle ist von außen am schwersten zu sehen? Welche Spuren verraten es trotzdem?', 'Am schwersten zu sehen:', 'Es verraten die Spuren:'),
        kreuzU('Was könnte Lio tun, wenn er seine drei Gefühle genau kennt? Mehrere Kreuze gehen.', 'Mit dem Bruder reden, wenn die Wut runter ist.', 'Sich bei Ben entschuldigen.', 'Mit der Betreuerin das Gespräch morgen vorbereiten.', 'Nichts – Wörter ändern nichts.')),
      clip(wozu, 'Wozu Gefühle da sind', [kreuzU('Wozu sind Gefühle da?', 'Sie stören nur.', 'Sie melden etwas.', 'Für nichts.')], ['Dafür sind Gefühle gut:', 'Dieses Gefühl kam vor:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Was hilft Lio am meisten?', 'mehr Wörter für Gefühle', 'sich zusammenreißen', 'nichts mehr fühlen')]),
    ),
    seite(
      modell(wozu, 'Gefühle sind Nachrichten', ['mail', 'mood-smile', 'tool'], { zeit: '12 Min.', wie: 'allein · dann zu zweit',
        leitung: 'Vorlesen, dann allein zuordnen, zu zweit vergleichen. Scham ausdrücklich dazunehmen: Sie ist das Gefühl, das am meisten versteckt wird.',
        fragen: [wortkasten('Jedes Gefühl schickt eine Nachricht. Welche gehört wohin? Schreib sie in die Tabelle.', 'Halt Abstand!', 'Mehr davon!', 'Du hast etwas verloren, das dir wichtig war.', 'Pass auf!', 'Achtung, etwas Neues!', 'Jemand geht über deine Grenze.', 'Du hast gegen deine eigenen Regeln gehandelt.')],
        danach: [tabelle('34mm auto', ['Gefühl', 'Seine Nachricht'], [['Angst', ''], ['Wut', ''], ['Trauer', ''], ['Ekel', ''], ['Freude', ''], ['Überraschung', ''], ['Scham', '']], 7.6),
          fragen(null, satz('Und bei Lio: Was will ihm die Scham von gestern (Spur B) sagen – und was könnte er damit tun?', 'Sie sagt ihm:', 'Er könnte:'))] }),
    ),
    seite(
      runde('Wörter-Jagd', '25 Min.', 'zwei Teams', 'cards', {
        ziel: 'Viele Wörter für Gefühle finden – und merken, zu welchem Grundgefühl sie gehören.',
        material: 'die sechs Grundgefühle und die 24 Wort-Karten von der nächsten Seite (ausschneiden), zwei Bögen Papier, Stifte',
        schritte: [
          'Legt die sechs Grundgefühle auf den Tisch. Die 24 Wort-Karten werden gemischt und geteilt.',
          'Jedes Team legt seine Karten zu dem Grundgefühl, zu dem sie passen. Manche passen zu zweien – dann dazwischen legen.',
          'Das andere Team prüft. **Jede Karte, bei der ihr euch einig seid: 1 Punkt.**',
          'Dann die Staffel: Vier Minuten lang schreibt jedes Team weitere Gefühlswörter auf seinen Bogen. Jedes neue Wort: 1 Punkt.',
          '**Profi-Runde:** Die Leitung nennt eine Situation („Du wirst vor allen gelobt.“). Jedes Team legt die **zwei** Wort-Karten hin, die am genauesten passen. Wer es begründet: 2 Punkte.',
        ],
        regeln: ['Niemand muss etwas vorspielen. Es wird gelegt, geschrieben und begründet.'],
        zu3: 'Ein Team, die Leitung prüft. Schafft ihr alle 24 Karten in fünf Minuten – und danach 15 neue Wörter?',
        wertung: { kopf: ['Punkte', 'Karten gelegt', 'neue Wörter', 'Profi-Runde', 'Summe'], zeilen: ['Team A', 'Team B'] },
        auswertung: ['Für welches Grundgefühl habt ihr die meisten Wörter?', 'Welche Karte lag zwischen zwei Gefühlen – und warum?'],
      }),
      fuerDich('mehr als zwei Tasten', '10 Min.', fragen('Statt „gut“ und „schlecht“: Kreise ein, was du von dieser Woche kennst.', ...wozu.moves[1].fragen, satz('Blätter zurück zu Station 1: Findest du jetzt ein genaueres Wort für heute – und was meldet es dir? (Schau ins Modell.)', 'Mein Wort:', 'Es meldet mir:'))),
    ),
    seite(
      material('6 Grundgefühle und 24 Wörter', 5,
        karten(3, 18, 'Die sechs Grundgefühle: ausschneiden und auf den Tisch legen.', GEFUEHLE(['Freude', 'Trauer', 'Angst', 'Wut', 'Ekel', 'Überraschung']), true),
        karten(4, 18, 'Die 24 Wörter: ausschneiden, mischen, auf die Teams verteilen.', GEFUEHLE(['genervt', 'enttäuscht', 'einsam', 'überfordert', 'neidisch', 'beschämt', 'gelangweilt', 'besorgt', 'leer', 'gekränkt', 'stolz', 'erleichtert', 'ruhig', 'dankbar', 'aufgedreht', 'verknallt', 'sicher', 'neugierig', 'panisch', 'sauer', 'angewidert', 'erschrocken', 'traurig', 'nervös']), true)),
      schluss(wozu, 'drei Wörter für Lio', [satz('Die Betreuerin fragt noch einmal: „Was genau?“ Lio könnte sagen:', 'Ich bin')], ['1', '2', '3']),
    ),
  )

  /* ---------- Stunde 2 · Wer sitzt am Steuer? ---------- */
  const SITUATIONEN = ['Dein bester Freund sagt zum dritten Mal ab.', 'Du wirst vor allen gelobt.', 'Jemand hat in deinen Sachen gewühlt.', 'Morgen ist ein wichtiges Gespräch.', 'Du hast etwas Peinliches geschickt – an die falsche Person.', 'Ihr zieht um. Keiner hat dich gefragt.', 'Jemand lacht, als du reinkommst.', 'Du bekommst etwas geschenkt, das du dir lange gewünscht hast.', 'Dein Handy ist weg.', 'Jemand, den du magst, schreibt nicht zurück.', 'Du sollst vor der Klasse etwas sagen.', 'Jemand isst mit offenem Mund direkt neben dir.']
  const s2 = stunde('Welches Gefühl sitzt bei dir gerade am Steuer?', ['merken, welches Gefühl dich gerade lenkt', '„mir egal“ übersetzen', 'sagen, wofür Kummer gut ist'],
    seite(
      ankommen('dein Pult heute', { f: 'Stell dir vor: Ein Gefühl lenkt dich gerade wie ein Fahrer. Welches? Kreise ein.', kreis: ['Freude', 'Kummer', 'Angst', 'Wut', 'Ekel', 'Langeweile'] }),
      modell(steuer, 'das Steuerpult im Kopf', ['steering-wheel', 'arrows-shuffle', 'heart-handshake'], { zeit: '12 Min.', wie: 'alle · dann allein', intro: 'In deinem Kopf steht ein Steuerpult. Immer sitzt ein Gefühl daran – und lenkt, was du hörst und was du tust.',
        leitung: 'Vorlesen. Die Übung allein, dann drei Antworten zur Wut hören: Derselbe Satz klingt plötzlich wie ein Angriff.',
        fragen: [{ f: 'Derselbe Satz – anderer Fahrer: Die Betreuerin sagt „Kannst du mal kurz kommen?“ Wie hörst du den Satz, und was machst du – je nachdem, wer am Steuer sitzt?', preis: { erste: 'Am Steuer sitzt …', kopf: ['So höre ich den Satz', 'Das mache ich dann'], optionen: ['Wut', 'Angst', 'Kummer', 'Freude'] } }] }),
    ),
    seite(
      clip(steuer, 'Welches Gefühl darf bleiben?', [kreuzU('Welches Gefühl würdest du am liebsten abschaffen?', 'Angst', 'Wut', 'Kummer', 'keins')], ['Dieses Gefühl verteidigt er:', 'Dafür ist es gut:'],
        [kreuz('Würdest du dein Gefühl immer noch abschaffen?', 'ja', 'nein', 'weiß nicht')], '12 Min.'),
      ermittlung(steuer, 'Noah und „mir egal“',
        'Noah hat seit Wochen dieselbe Antwort: „Mir egal.“ Dann fliegt eines Abends der Controller an die Wand. **Wer sitzt bei Noah wirklich am Steuer?**',
        [
          ['A', 'school', 'September', 'Neue Schule. Seine alten Freunde sind jetzt alle woanders. Noah: „Mir egal.“'],
          ['B', 'notebook', 'Noahs Handy, Notizen', 'Ein Datum, dahinter: „Papa kommt!!“ Eine Woche später darunter: „Wieder nicht.“'],
          ['C', 'math', 'Mathe-Arbeit', 'Eine Fünf. Daneben hat Noah ein Strichmännchen gemalt. „Mir egal.“'],
          ['D', 'device-gamepad-2', 'Jede Nacht', 'Online bis drei Uhr. Morgens kommt er kaum aus dem Bett.'],
          ['E', 'ball-football', 'Sein Trainer', '„Seit September war er nicht mehr da. Früher hat er kein Training verpasst.“'],
          ['F', 'message-circle', 'Der kleine Bruder, 21 Uhr', '„Bist du traurig?“ Der Controller fliegt an die Wand.'],
        ],
        [
          satz('Funke und Fass: Der Funke ist der Moment, in dem es knallt. Im Fass ist alles, was sich angesammelt hat.', 'Der Funke ist Spur …', 'Im Fass sind die Spuren …'),
        ], { zeit: '15 Min.' }),
    ),
    seite(
      fallWeiter('Noah und „mir egal“', 4, null,
        { f: 'Der „Mir egal“-Übersetzer: Wer sitzt hinter jedem „egal“ wirklich am Steuer?', preis: { erste: '„Mir egal“ bei …', kopf: ['Wer sitzt am Steuer?', 'Woran sieht man es? Spur …'], optionen: ['der neuen Schule', 'Papa', 'der Fünf in Mathe'] } },
        satz('Warum fliegt der Controller gerade bei der Frage des Bruders?', 'Weil die Frage …'),
        kreuzU('Was hätte Noah geholfen?', 'noch länger zocken', 'jemandem sagen, dass er traurig ist', 'gar nichts fühlen')),
      fuerDich('mein Steuerpult', '10 Min.', fragen('Nur für dich. Wer sitzt bei dir wie oft am Steuer?', steuer.moves[1].fragen[0],
        kreuz('Wann sagst du „mir egal“ – obwohl es nicht stimmt? (Oder jemand, den du kennst.)', 'nach Streit', 'bei Noten', 'wenn jemand absagt', 'zu Hause', 'nie'),
        satz('Wie bei Noah übersetzt:', '„Mir egal“ heißt dann eigentlich:'))),
    ),
    seite(
      runde('die Pult-Wette', '25 Min.', 'alle · am Tisch', 'cards', {
        ziel: 'Merken, dass dieselbe Situation bei jedem ein anderes Gefühl ans Steuer holt.',
        material: 'die fünf Gefühle und die 12 Situations-Karten von der nächsten Seite (ausschneiden), drei Münzen oder Büroklammern pro Person',
        schritte: [
          'Die fünf Gefühle liegen im Halbkreis auf dem Tisch: Das ist das Steuerpult.',
          'Die Leitung liest eine Situation vor. Eine Person wettet verdeckt auf einem Zettel: Wo liegen gleich die meisten Münzen?',
          'Alle legen **gleichzeitig** eine Münze zu dem Gefühl, das bei ihnen ans Steuer käme.',
          'Wette aufdecken. Richtig? 1 Punkt. Dann wettet die nächste Person.',
        ],
        runden: [
          { t: 'Runde 1 · eine Münze', x: 'Ein Gefühl pro Person. Sechs Situationen.' },
          { t: 'Runde 2 · drei Münzen', x: 'Drei Münzen verteilen: alle auf ein Gefühl oder gemischt.' },
          { t: 'Runde 3 · Fahrerwechsel', x: 'Bei welcher Situation wechselt der Fahrer, wenn man eine Nacht darüber schläft? Münzen neu legen.' },
        ],
        regeln: ['Niemand muss sagen, warum er wo gelegt hat. Wer mag, sagt einen Satz.'],
        zu3: 'Alle wetten verdeckt, dann legen alle – auch die Leitung. Wer am nächsten dran ist, bekommt den Punkt.',
        notiz: { titel: 'Bei dieser Situation lagen die Münzen am weitesten auseinander:', linien: 1 },
        auswertung: ['Wo hat die Gruppe ganz anders gelegt, als ihr gedacht habt?', 'Bei welcher Situation lag Kummer vorn? Wozu ist er dann gut?'],
      }),
      st('Der Skill: drei Ohren', '5 Min.', 'alle · still', 'ear', 'Die Minuten ansagen. Augen zu ist freiwillig.',
        text('Augen zu oder Blick auf einen Punkt. Eine Minute: Was hörst du **ganz nah**? Eine Minute: Was hörst du **weit weg**? Eine Minute: Was ist das **leiseste** Geräusch, das du finden kannst?')),
    ),
    seite(
      material('5 Gefühle und 12 Situationen', 6,
        karten(5, 20, 'Das Steuerpult: ausschneiden und im Halbkreis legen.', GEFUEHLE(['Freude', 'Kummer', 'Angst', 'Wut', 'Ekel']), true),
        karten(3, 24, 'Die Situationen: ausschneiden, mischen, verdeckt stapeln.', SITUATIONEN.map((t) => ({ t })))),
      schluss(steuer, 'Noahs Bruder fragt', [kreuzU('Der kleine Bruder fragt: „Bist du traurig?“ Was könnte Noah diesmal sagen?', '„Mir egal.“', '„Ja. Ein bisschen.“', 'nichts'), { f: 'Schau auf Station 1: Wer sitzt jetzt bei dir am Steuer?', kreis: ['Freude', 'Kummer', 'Angst', 'Wut', 'Ekel', 'Langeweile'] }], ['1', '2', '3', '4', '5']),
    ),
  )

  /* ---------- Stunde 3 · Körper-Alarm ---------- */
  const s3 = stunde('Woran merkst du ein Gefühl, bevor es knallt?', ['sagen, wo im Körper sich Wut, Angst und Trauer melden', 'an Körperspuren ablesen, was jemand fühlt', 'dein erstes Signal finden'],
    seite(
      ankommen('dein Körper gerade', strich('Wie ruhig ist dein Körper gerade?', 'unruhig', 'ruhig'), { f: 'Wo merkst du Aufregung zuerst? Kreise ein.', kreis: ['Bauch', 'Brust', 'Hals', 'Hände', 'Kopf', 'weiß nicht'] }),
      st('Erst machen: das Körper-Labor', '10 Min.', 'alle gleichzeitig', 'flask', 'Alle machen gleichzeitig mit, auch Sie – so schaut niemand zu. Nach jedem Experiment zehn Sekunden still.',
        fragen('Vier kurze Experimente. Alle machen sie **gleichzeitig** – niemand schaut zu. Nach jedem: zehn Sekunden still stehen und spüren.', ...koerper.moves[0].fragen)),
    ),
    seite(
      modell(koerper, 'jedes Gefühl hat ein Muster', ['flame', 'heartbeat', 'weight'], { zeit: '10 Min.', wie: 'alle · dann allein', intro: 'So spüren es viele Menschen. Bei dir kann es anders sein.',
        leitung: 'Vorlesen. Die Signale allein sortieren lassen; Herzklopfen und Knoten im Bauch passen auch zur Wut – wer begründet, liegt richtig.',
        fragen: [raster('Neun Signale: Zu welchem Muster passen sie am ehesten? Ein Kreuz pro Zeile.', ['Wut · heiß', 'Angst · eng', 'Trauer · schwer'], 'Herzklopfen', 'Fäuste ballen', 'Kloß im Hals', 'Hitze im Gesicht', 'flacher Atem', 'schwere Arme und Beine', 'Knoten im Bauch', 'Kiefer fest', 'Druck auf der Brust'),
          kreuz('Welches Muster kennst du am besten?', 'heiß', 'eng', 'schwer')] }),
      ermittlung(koerper, 'Lina lächelt',
        'Lina lächelt. Immer. Auch als ihre Tante beim Essen sagt: „Aus dir wird nie was.“ Lina sagt: „Okay.“ Später in ihrem Zimmer zittert sie und weiß nicht, warum. **Ihr Gesicht hat gelernt zu lügen. Ihr Körper nicht.**',
        [
          ['A', 'mood-smile', 'Linas Gesicht', 'Lächeln, die ganze Zeit. „Okay.“'],
          ['B', 'tools-kitchen-2', 'Linas Magen', 'Wie ein Stein, seit die Tante da ist. Sie isst fast nichts.'],
          ['C', 'hand-stop', 'Linas Hände', 'Eiskalt. Sie versteckt sie unter dem Tisch.'],
          ['D', 'mood-angry', 'Linas Kiefer', 'Die Zähne mahlen. Am Abend tut ihr der Kiefer weh.'],
          ['E', 'user', 'Linas Freundin', '„Wenn die Tante kommt, sagt Lina vorher alle Treffen ab.“'],
          ['F', 'device-mobile', 'Lina, abends', 'Sie zittert. In ihr Handy tippt sie: „Ich war doch gar nicht sauer??“'],
        ],
        [], { zeit: '15 Min.' }),
    ),
    seite(
      fallWeiter('Lina lächelt', 4, null,
        { f: 'Linas Körper sendet Signale. Welches Gefühl steckt dahinter – und welches Muster?', preis: { erste: 'Spur', kopf: ['Gefühl', 'heiß, eng oder schwer?'], optionen: ['B · Stein im Magen', 'C · kalte Hände', 'D · Zähne mahlen'] } },
        theorien('Stimmt die Theorie – **ja**, **halb** oder **nein**? Schreib die Spur dazu.', '„Lina ist das egal.“', '„Lina hat Angst vor der Tante.“', '„Lina ist wütend.“'),
        satz('Lina schreibt: „Ich war doch gar nicht sauer??“ Welche Spur sagt etwas anderes?', 'Spur … zeigt:'),
        kreuzU('Warum zittert Lina erst abends?', 'Der Körper hat den Alarm festgehalten – allein lässt er los.', 'Ihr ist kalt.', 'Sie ist krank.')),
      clip(koerper, 'Was die Haltung mit dir macht', [kreuzU('Kann deine Körperhaltung ein Gefühl verändern?', 'ja', 'ein bisschen', 'nein')], ['Das macht die Haltung mit dem Gefühl:', 'Das probiere ich aus:'],
        [kreuz('Hast du beim Schauen etwas ausprobiert?', 'ja', 'nein'), kreuzU('Die Tante sagt wieder so einen Satz. Was kann Lina mit ihrem Körper tun?', 'weiter lächeln', 'aufrecht hinstellen und tief atmen', 'die Zähne zusammenbeißen')]),
    ),
    seite(
      runde('der Song-Tipp', '20 Min.', 'alle', 'music', {
        ziel: 'Merken, wo Musik im Körper ankommt – und dass sie bei jedem woanders landet.',
        material: 'vier bis fünf Songs (fröhlich, traurig, wütend, ruhig) und etwas zum Abspielen',
        schritte: [
          'Die Leitung spielt 30 Sekunden von einem Song – oder ihr schlagt einen vor.',
          'Alle tragen still ein: Welches Gefühl? Wie stark, von 0 bis 10? Wo im Körper? Welches Muster: heiß, eng oder schwer?',
          'Auf „drei“ zeigen alle **gleichzeitig** die Zahl mit den Fingern. Wer mag, zeigt auf die Stelle am Körper.',
        ],
        regeln: ['Niemand muss tanzen, singen oder etwas erklären.'],
        auswertung: ['Welcher Song ist bei euch direkt in den Körper gegangen?', 'Bei welchem Song lagen eure Zahlen weit auseinander?'],
      }, { leitung: 'Songs vorher auswählen, gern ohne Text. Vorschläge der Jugendlichen kurz selbst anhören – keine Texte mit Gewalt oder Abwertung.', danach: [tabelle('18mm auto 22mm auto', ['Song', 'Gefühl', '0 bis 10', 'Wo im Körper?'], [['1', '', '', ''], ['2', '', '', ''], ['3', '', '', ''], ['4', '', '', '']], 8)] }),
      fuerDich('mein erstes Signal', '8 Min.', fragen('Denk an einen Moment, in dem du wütend oder ängstlich wurdest. Nur für dich.', ...koerper.moves[1].fragen, kreuz('Wenn dein erstes Signal kommt – was machst du dann?', 'lang ausatmen', 'aufrecht hinstellen', 'kurz rausgehen', 'drei Ohren'), satz('Schau auf Station 1 und auf dein Signal oben. Dein Plan:', 'Wenn ich … merke (wo? wann?),', 'dann …'))),
    ),
    seite(
      st('Der Skill: Bodyscan kurz', '8 Min.', 'alle · still', 'scan', 'Langsam ansagen. Augen zu ist freiwillig. Nichts kommentieren.',
        text('Sitzen oder liegen. Augen zu oder Blick auf einen Punkt. Einmal tief ein, langsam aus. Wandere mit der Aufmerksamkeit: **Stirn, Kiefer, Schultern – Brust und Bauch – Hände – Beine und Füße.** Nur hinschauen, nichts ändern.')),
      schluss(koerper, 'Linas erstes Signal', [kreuzU('Lina zittert später in ihrem Zimmer. Was war ihr erstes Signal – schon bei der Tante?', 'der Stein im Magen', 'das Zittern', 'gar nichts')], ['1', '2']),
    ),
  )

  /* ---------- Stunde 4 · Alles gleichzeitig ---------- */
  const s4 = stunde('Kann man froh und sauer gleichzeitig sein?', ['zwei Gefühle auf einmal benennen', 'sagen, wie stark ein Gefühl ist – von 0 bis 10', 'unter der Wut nachschauen, was noch da ist'],
    seite(
      ankommen('etwas, das dich aufgeregt hat', kreuzU('Warnsignal-Jagd: Hast du letzte Woche dein erstes Signal erwischt – und deinen Plan probiert?', 'Signal erwischt und Plan probiert', 'nur das Signal erwischt', 'nicht dran gedacht'), zeile('Was hat dich zuletzt aufgeregt? Ein Stichwort reicht.')),
      st('Erst machen: der Zwillings-Check', '6 Min.', 'zu zweit · Rücken an Rücken', 'users', 'Fragen: Bus fährt weg (wie genervt?) · Morgen ist frei (wie froh?) · Akku 1 % (wie nervös?) · Jemand sitzt auf deinem Platz (wie sauer?) · Dein Lieblingslied läuft (wie gut gelaunt?). Schnell hintereinander. Es geht um den Vergleich.',
        text('Stellt euch zu zweit mit dem Rücken zueinander, mit etwas Abstand (zu dritt geht auch). Die Leitung fragt: „Der Bus fährt dir vor der Nase weg. Wie genervt bist du, von 0 bis 10?“ Auf „drei“ zeigt ihr die Zahl mit den Fingern und dreht euch um. **Gleiche Zahl = Zwilling.** Fünf Fragen.'),
        fragen(null, kreuz('Wie oft wart ihr Zwillinge?', '0', '1–2', '3–5'))),
    ),
    seite(
      ermittlung(alles, 'Nele zieht um',
        'Neles Mutter hat einen neuen Freund. Sie zieht mit Nele zu ihm. Alle sagen: „Freu dich doch!“ Nele sagt: „Ja, klar.“ **Was fühlt sie wirklich – und wie stark?**',
        [
          ['A', 'notebook', 'Neles Tagebuch', '„Eigener Balkon!!! Endlich ein großes Zimmer.“'],
          ['B', 'device-mobile', 'Chat mit ihrer Freundin', 'Freundin: „Wer sitzt jetzt neben dir im Bus?“ Nele: „Keiner.“ Dann ein trauriges Gesicht.'],
          ['C', 'door', 'Nele zu ihrer Mutter', '„Ihr habt mich nicht mal gefragt!“ Die Tür knallt.'],
          ['D', 'moon', 'Nachts, 1 Uhr', 'Nele liegt wach: „Was, wenn die sich wieder trennen? Dann ziehen wir schon wieder um.“'],
          ['E', 'users', 'Die Nachbarn', '„Freu dich doch! So ein schönes Haus!“'],
        ],
        [
          { f: 'Das Mischpult: Welche Gefühle hat Nele? Schreib die Spur dazu und stell den Regler ein – wie stark, 0 bis 10?', preis: { erste: 'Gefühl', kopf: ['Spur', 'Wie stark? 0–10'], optionen: ['Freude', 'Wut', 'Trauer', 'Angst'] } },
        ], { zeit: '15 Min.' }),
      fallWeiter('Nele zieht um', 3, null,
        satz('Welches Gefühl ist am leisesten – aber vielleicht am wichtigsten?', 'Am leisesten:', 'Wichtig, weil …'),
        { f: 'Unter der Wut (Spur C) sitzt noch etwas. Kreise ein, was passt.', kreis: ['Trauer', 'Angst', 'Freude', 'Scham'] },
        satz('Alle sagen „Freu dich doch!“. Was könnte jemand stattdessen zu Nele sagen?', '„')),
    ),
    seite(
      modell(alles, 'mischen und regeln', ['arrows-shuffle', 'adjustments', 'volume'], { zeit: '10 Min.', wie: 'allein · dann zu zweit',
        leitung: 'Vorlesen. Die drei Sätze allein lösen, dann zu zweit vergleichen. Die Lösung ist nicht eindeutig – es zählt die Begründung.',
        fragen: [wortkasten('Was sitzt unter der Wut? Schreib zu jedem wütenden Satz das leise Gefühl darunter.', 'Scham', 'Trauer', 'Angst')],
        danach: [tabelle('auto 34mm', ['Der wütende Satz', 'Darunter sitzt'], [['Tarek brüllt: „Dann geh doch!“ – als sein bester Freund wegzieht.', ''], ['Mia flippt aus, als alle über ihren Fehler lachen.', ''], ['Jo schreit: „Nie sagt mir jemand was!“ – am Tag vor einer Untersuchung im Krankenhaus.', '']], 11)] }),
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
        regeln: ['Niemand muss erklären, wo seine Chips liegen.'],
        zu3: 'Die Leitung setzt mit. Bei drei Leuten lohnt Runde 2 besonders: Wer hat dieselbe Zahl?',
        notiz: { titel: 'Bei dieser Situation lagen die Chips am weitesten verstreut:', linien: 1 },
        auswertung: ['Bei welcher Situation hattet ihr froh und sauer gleichzeitig?', 'Was lag am häufigsten unter der Wut?'],
      }),
    ),
    seite(
      material('6 Gefühle und 9 Situationen', 7,
        karten(3, 20, 'Die sechs Gefühle: ausschneiden und in die Mitte legen.', GEFUEHLE(['Freude', 'Trauer', 'Wut', 'Angst', 'Scham', 'Zweifel']), true),
        karten(3, 30, 'Die Situationen: ausschneiden, mischen, verdeckt stapeln.', ['Du wirst vor allen gelobt.', 'Deine beste Freundin zieht weg – in eine tolle Stadt.', 'Du hast gewonnen. Dein Freund hat verloren.', 'Die Ferien fangen an. Zu Hause ist dicke Luft.', 'Du hast endlich Nein gesagt.', 'Jemand entschuldigt sich bei dir – vor allen.', 'Dein kleiner Bruder bekommt, was du nie bekommen hast.', 'Letzter Tag in der alten Klasse.', 'Du wirst nicht gewählt – dein Kumpel schon.'].map((t) => ({ t })))),
      schluss(alles, 'deine zwei Gefühle', [satz('Blätter zurück zu Station 1: Was dich aufgeregt hat – welche zwei Gefühle waren es, und wie stark?', 'Gefühl 1 (0–10):', 'Gefühl 2 (0–10):')]),
    ),
  )
  return [s1, s2, s3, s4]
}


/** Lösungen für die Leitung – passend zu den Stationen oben */
export const loesungen: string[][] = [
  [
    'Der Fall: Wut – A (Kopfhörer), meldet: Da geht jemand über meine Grenze · Angst – C (Gespräch morgen), meldet: Pass auf, da kommt etwas · Scham – B, D, E (gemeiner Satz, schaut keinen an, weicht Ben aus), meldet: Du hast gegen deine eigenen Regeln gehandelt. Am schwersten zu sehen ist die Scham. Hilfreich: die ersten drei Kreuze.',
    'Das Modell: Angst – Pass auf! · Wut – Jemand geht über deine Grenze · Trauer – Du hast etwas verloren · Ekel – Halt Abstand! · Freude – Mehr davon! · Überraschung – Achtung, etwas Neues! · Scham – Du hast gegen deine eigenen Regeln gehandelt. Lio: Die Scham sagt ihm, dass ihm Ben nicht egal ist – er könnte sich entschuldigen.',
    'Wörter-Jagd: Viele Wörter passen zu zwei Grundgefühlen (neidisch: Wut und Trauer; nervös: Angst). Es zählt, dass das Team es begründen kann.',
    'Schluss: zum Beispiel „Ich bin sauer, ich habe Angst vor morgen und ich schäme mich.“',
  ],
  [
    'Das Modell: keine richtigen Antworten. Mit Wut am Steuer klingt der Satz nach Ärger („Was hab ich jetzt wieder gemacht?“), mit Angst nach Gefahr, mit Kummer nach „Bestimmt etwas Schlechtes“, mit Freude neutral oder gut.',
    'Der Fall: Funke – F (die Frage des Bruders). Fass – A, B, C, D, E. Übersetzer: neue Schule – Kummer (A, E: alte Freunde weg, kein Training mehr) · Papa – Kummer, auch Wut (B) · Fünf in Mathe – Scham oder Kummer, vielleicht Angst (C). Der Controller fliegt, weil die Frage genau den versteckten Kummer trifft. Geholfen hätte: jemandem sagen, dass er traurig ist.',
    'Pult-Wette: Es gibt keine richtige Lösung. Wichtig ist der Moment, in dem die Münzen weit auseinanderliegen: gleiche Situation, anderes Gefühl.',
    'Kummer hat einen Job: Er zeigt, was wichtig war, und holt Hilfe. Schluss: „Ja. Ein bisschen.“ reicht – ein ehrlicher Satz statt „mir egal“.',
  ],
  [
    'Körper-Labor: 1 Sprint – Herz/Atem, Hitze (wie Angst oder Wut); 2 Anspannen – Muskeln (wie Wut); 3 Zeitlupe – Schwere (wie Trauer); 4 Siegerpose – Weite (wie Freude, Stolz).',
    'Das Modell: Wut – Fäuste, Hitze im Gesicht, Kiefer fest · Angst – Herzklopfen, flacher Atem, Knoten im Bauch · Trauer – Kloß im Hals, schwere Arme und Beine, Druck auf der Brust. Herzklopfen passt auch zur Wut.',
    'Der Fall: B Stein im Magen – Angst (eng) · C kalte Hände – Angst (eng) · D Zähne mahlen – Wut (heiß). Theorien: „egal“ – nein (B, C, D) · „Angst vor der Tante“ – ja (B, C, E) · „wütend“ – halb bis ja (D). Lina hat es nicht gemerkt, weil ihr Gesicht gelernt hat, alles zu überdecken. Sie zittert abends, weil der Körper den Alarm festgehalten hat. Erstes Signal: der Stein im Magen.',
    'Song-Tipp: kein Richtig oder Falsch. Clip danach: aufrecht hinstellen und tief atmen. Vorsicht: Die Wirkung der Haltung auf Gefühle ist in Studien klein und umstritten („Power Posing“) – als Versuch anbieten, nicht als sicheren Trick.',
  ],
  [
    'Der Fall: Freude – A · Wut – C · Trauer – B · Angst – D; die Stärke ist offen, oft: Wut und Freude laut, Angst leise. Am leisesten und wichtig: Angst (D) – sie sagt, was Nele wirklich braucht (Sicherheit). Unter der Wut: Trauer und Angst. Statt „Freu dich doch“: „Das ist ganz schön viel auf einmal.“ oder „Was vermisst du am meisten?“',
    'Das Modell: Tarek – Trauer · Mia – Scham · Jo – Angst. Andere Antworten mit guter Begründung gelten.',
    'Chips setzen: keine richtige Lösung. Unter der Wut liegen oft Scham, Enttäuschung oder Angst.',
  ],
]

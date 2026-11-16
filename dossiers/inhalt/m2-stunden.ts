// REAL TALK #02 · GEFÜHLE – vier Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 geht vom Fall aus, Stunde 2 vom Modell und Clip, Stunde 3 von einem Körper-Experiment, Stunde 4 von einem Zahlen-Spiel.
import type { Heft, Stunde } from '../typen'
import { ankommen, clip, fall, fragen, fuerDich, karten, kreuz, kreuzU, material, modell, runde, satz, schluss, seite, st, stunde, strich, tabelle, text, zeile } from './stunden-hilfe'

const GEFUEHLE = (l: string[]) => l.map((t) => ({ t }))

export function stunden(d: Heft): Stunde[] {
  const [wozu, steuer, koerper, alles] = d.tracks
  // Der Clip über das Steuerpult der Gefühle passt zu Stunde 2 („Wer sitzt am Steuer?“), nicht zu Stunde 4. Der frühere Clip
  // von Stunde 2 („nichts spüren“) passte nicht zum Fall und entfällt.
  steuer.clip = { ...alles.clip!, frage: 'Welches Gefühl würdest du abschaffen – und warum wäre das keine gute Idee?' }
  delete alles.clip

  /* ---------- Stunde 1 · Wozu der Mist? ---------- */
  const s1 = stunde('Wozu sind Gefühle gut – auch die, die nerven?', ['sagen, was Angst, Wut und Trauer dir melden', 'mehr als zwei Wörter für Gefühle benutzen', 'ein Gefühl genauer benennen'],
    seite(
      ankommen('ein Wort für heute', strich('Wie geht es dir gerade?', 'schlecht', 'gut'), zeile('Ein Wort für dein Gefühl heute:')),
      fall(wozu, 'Lio hat nur zwei Wörter', [
        kreuzU('Warum sagt Lio nur „beschissen“?', 'Er will frech sein.', 'Er hat nur zwei Wörter für Gefühle.', 'Es ist ihm egal.'),
        { f: 'Welche drei Gefühle hat Lio heute wirklich? Kreise sie ein.', kreis: ['Wut', 'Angst', 'Scham', 'Freude', 'Ekel', 'Neid'] },
      ]),
    ),
    seite(
      clip(wozu, 'Wozu Gefühle da sind', [kreuzU('Wozu sind Gefühle da?', 'Sie stören nur.', 'Sie melden etwas.', 'Für nichts.')], ['Dafür sind Gefühle gut:', 'Dieses Gefühl kam vor:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Was hilft Lio am meisten?', 'mehr Wörter für Gefühle', 'sich zusammenreißen', 'nichts mehr fühlen')]),
      modell(wozu, 'Gefühle sind Nachrichten', ['mail', 'mood-smile', 'tool'], { fragen: wozu.moves[0].fragen.slice(0, 1) }),
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
          'Abstimmung: Welches Grundgefühl würdet ihr abschaffen? Jede Person legt eine Münze oder einen Stift dazu.',
        ],
        regeln: ['Niemand muss etwas vorspielen. Es wird gelegt, geschrieben und abgestimmt.'],
        zu3: 'Ein Team. Schafft ihr alle 24 Karten in fünf Minuten – und danach 15 neue Wörter?',
        wertung: { kopf: ['Punkte', 'Karten gelegt', 'neue Wörter', 'Summe'], zeilen: ['Team A', 'Team B'] },
        auswertung: ['Für welches Grundgefühl habt ihr die meisten Wörter?', 'Das Gefühl mit den meisten Stimmen ist weg. Was fehlt dann – eine Woche lang?'],
      }),
      fuerDich('mehr als zwei Tasten', '10 Min.', fragen('Statt „gut“ und „schlecht“: Kreise ein, was du von dieser Woche kennst.', ...wozu.moves[1].fragen, satz('Blätter zurück zu Station 1: Findest du jetzt ein genaueres Wort für heute?', 'Mein Wort:'))),
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
  const s2 = stunde('Welches Gefühl sitzt bei dir gerade am Steuer?', ['merken, welches Gefühl dich gerade lenkt', 'sagen, wofür Kummer gut ist', '„mir egal“ übersetzen'],
    seite(
      ankommen('dein Pult heute', { f: 'Wer sitzt bei dir gerade am Steuer? Kreise ein.', kreis: ['Freude', 'Kummer', 'Angst', 'Wut', 'Ekel', 'Langeweile'] }),
      modell(steuer, 'das Steuerpult im Kopf', ['steering-wheel', 'arrows-shuffle', 'heart-handshake'], { intro: 'In deinem Kopf steht ein Steuerpult. Immer sitzt ein Gefühl daran – und lenkt, was du tust.' }),
      clip(steuer, 'Welches Gefühl darf bleiben?', [kreuzU('Welches Gefühl würdest du am liebsten abschaffen?', 'Angst', 'Wut', 'Kummer', 'keins')], ['Dieses Gefühl verteidigt er:', 'Dafür ist es gut:'],
        [kreuz('Würdest du dein Gefühl immer noch abschaffen?', 'ja', 'nein', 'weiß nicht')], '15 Min.'),
    ),
    seite(
      fall(steuer, 'Noah und „mir egal“', [
        kreuzU('Was heißt „mir egal“ bei Noah wirklich?', 'Es ist ihm wirklich egal.', 'Es ist ihm zu viel.', 'Er will cool wirken.'),
        { f: 'Wer saß bei Noah die ganze Zeit am Steuer? Kreise ein.', kreis: ['Kummer', 'Wut', 'Freude', 'Angst', 'Ekel'] },
        kreuzU('Was hätte Noah geholfen?', 'noch länger zocken', 'jemandem sagen, dass er traurig ist', 'gar nichts fühlen'),
      ]),
      fuerDich('mein Steuerpult', '8 Min.', fragen('Nur für dich. Wer sitzt bei dir wie oft am Steuer?', ...steuer.moves[1].fragen)),
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
          { t: 'Runde 3 · eigene Karte', x: 'Wer mag, erfindet eine Situation. Die anderen legen.' },
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
  const s3 = stunde('Woran merkst du ein Gefühl, bevor es knallt?', ['sagen, wo im Körper sich Wut, Angst und Trauer melden', 'dein erstes Signal finden', 'einmal durch den Körper wandern (Bodyscan)'],
    seite(
      ankommen('dein Körper gerade', strich('Wie ruhig ist dein Körper gerade?', 'unruhig', 'ruhig'), { f: 'Wo merkst du Aufregung zuerst? Kreise ein.', kreis: ['Bauch', 'Brust', 'Hals', 'Hände', 'Kopf', 'weiß nicht'] }),
      st('Erst machen: das Körper-Labor', '10 Min.', 'alle gleichzeitig', 'flask', 'Alle machen gleichzeitig mit, auch Sie – so schaut niemand zu. Nach jedem Experiment zehn Sekunden still.',
        fragen('Vier kurze Experimente. Alle machen sie **gleichzeitig** – niemand schaut zu. Nach jedem: zehn Sekunden still stehen und spüren.', ...koerper.moves[0].fragen)),
    ),
    seite(
      modell(koerper, 'jedes Gefühl hat ein Muster', ['flame', 'heartbeat', 'weight'], { zeit: '8 Min.', fragen: [kreuz('Welches Muster kennst du am besten?', 'heiß', 'eng', 'schwer')] }),
      fall(koerper, 'Lina lächelt', [
        { f: 'Welche Signale sendet Linas Körper? Kreise alle ein.', kreis: ['Stein im Magen', 'kalte Hände', 'Zähne mahlen', 'Zittern', 'Hunger', 'Müdigkeit'] },
        kreuzU('Was sagt Linas Gesicht – und was sagt ihr Körper?', 'Gesicht: alles gut. Körper: Alarm.', 'Beide sagen: alles gut.', 'Beide sagen: Alarm.'),
      ]),
      st('Zu zweit: die Körper-Karte', '8 Min.', 'zu zweit', 'users', 'Es gibt kein Richtig oder Falsch – Körper sind verschieden. Wer nichts merkt, kreist „weiß nicht“ ein.',
        tabelle('24mm 44mm auto', ['Gefühl', 'Wo im Körper?', 'Wie fühlt es sich an? Kreist ein.'], [['Wut', '', 'heiß · eng · schwer · leicht · kribbelig · weiß nicht'], ['Angst', '', 'heiß · eng · schwer · leicht · kribbelig · weiß nicht'], ['Trauer', '', 'heiß · eng · schwer · leicht · kribbelig · weiß nicht'], ['Freude', '', 'heiß · eng · schwer · leicht · kribbelig · weiß nicht']], 9)),
    ),
    seite(
      clip(koerper, 'Was die Haltung mit dir macht', [kreuzU('Kann deine Körperhaltung ein Gefühl verändern?', 'ja', 'ein bisschen', 'nein')], ['Das macht die Haltung mit dem Gefühl:', 'Das probiere ich aus:'],
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
      }, { danach: [tabelle('18mm auto 22mm auto', ['Song', 'Gefühl', '0 bis 10', 'Wo im Körper?'], [['1', '', '', ''], ['2', '', '', ''], ['3', '', '', ''], ['4', '', '', '']], 8)] }),
    ),
    seite(
      fuerDich('mein erstes Signal', '8 Min.', fragen('Denk an einen Moment, in dem du wütend oder ängstlich wurdest. Nur für dich.', ...koerper.moves[1].fragen, kreuz('Schau auf Station 1: Hast du dieselbe Stelle eingekreist?', 'ja', 'nein'))),
      st('Der Skill: Bodyscan kurz', '8 Min.', 'alle · still', 'scan', 'Langsam ansagen. Augen zu ist freiwillig. Nichts kommentieren.',
        text('Sitzen oder liegen. Augen zu oder Blick auf einen Punkt. Einmal tief ein, langsam aus. Wandere mit der Aufmerksamkeit: **Stirn, Kiefer, Schultern – Brust und Bauch – Hände – Beine und Füße.** Nur hinschauen, nichts ändern.')),
      schluss(koerper, 'Linas erstes Signal', [kreuzU('Lina zittert später in ihrem Zimmer. Was war ihr erstes Signal – schon bei der Tante?', 'der Stein im Magen', 'das Zittern', 'gar nichts')], ['1', '2']),
    ),
  )

  /* ---------- Stunde 4 · Alles gleichzeitig ---------- */
  const s4 = stunde('Kann man froh und sauer gleichzeitig sein?', ['zwei Gefühle auf einmal benennen', 'sagen, wie stark ein Gefühl ist – von 0 bis 10', 'unter der Wut nachschauen, was noch da ist'],
    seite(
      ankommen('etwas, das dich aufgeregt hat', kreuz('Hattest du schon mal zwei Gefühle gleichzeitig?', 'ja', 'nein', 'weiß nicht'), zeile('Was hat dich zuletzt aufgeregt? Ein Stichwort reicht.')),
      st('Erst machen: der Zwillings-Check', '6 Min.', 'zu zweit · Rücken an Rücken', 'users', 'Schnell hintereinander fragen. Es geht um den Vergleich, nicht um die „richtige“ Zahl.',
        text('Stellt euch Rücken an Rücken. Die Leitung fragt: „Der Bus fährt dir vor der Nase weg. Wie genervt bist du, von 0 bis 10?“ Auf „drei“ zeigt ihr die Zahl mit den Fingern. **Gleiche Zahl = Zwilling.** Fünf Fragen.'),
        fragen(null, kreuz('Wie oft wart ihr Zwillinge?', '0', '1–2', '3–5'))),
      fall(alles, 'Nele zieht um', [
        { f: 'Welche Gefühle hat Nele? Kreise alle ein.', kreis: ['Freude', 'Wut', 'Trauer', 'Angst', 'Ekel', 'Stolz'] },
        kreuzU('Alle sagen: „Freu dich doch!“ Was stimmt?', 'Nele muss sich für ein Gefühl entscheiden.', 'Alle vier Gefühle sind echt.', 'Nele übertreibt.'),
      ]),
    ),
    seite(
      modell(alles, 'mischen und regeln', ['arrows-shuffle', 'adjustments', 'volume'], { zeit: '8 Min.' }),
      fuerDich('mein Mischpult', '8 Min.', fragen(alles.moves[0].kontext ?? null, ...alles.moves[0].fragen.slice(0, 1), kreuz('Welches wäre bei dir am lautesten?', 'Wut', 'Trauer', 'Angst', 'Scham'))),
      st('Zu zweit: Was sitzt drunter?', '6 Min.', 'zu zweit', 'stack-2', 'Die Lösung ist offen: Scham, Enttäuschung und Trauer passen alle.',
        fragen(alles.moves[1].kontext ?? null, ...alles.moves[1].fragen)),
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
    'Der Fall: Lio hat nur zwei Wörter für Gefühle. Heute sind es drei Gefühle: Wut (auf den Bruder), Angst (vor dem Gespräch), Scham (wegen gestern).',
    'Das Modell: Angst – „Pass auf“; Wut – „Da geht jemand über deine Grenze“; Trauer – „Du hast etwas verloren“; Ekel – „Halt Abstand“; Freude – „Mehr davon!“',
    'Wörter-Jagd: Viele Wörter passen zu zwei Grundgefühlen (neidisch: Wut und Trauer; nervös: Angst). Es zählt, dass das Team es begründen kann.',
    'Schluss: zum Beispiel „Ich bin sauer, ich habe Angst vor morgen und ich schäme mich.“',
  ],
  [
    'Der Fall: „Mir egal“ heißt bei Noah: Es ist ihm zu viel. Am Steuer saß die ganze Zeit Kummer. Geholfen hätte: jemandem sagen, dass er traurig ist.',
    'Pult-Wette: Es gibt keine richtige Lösung. Wichtig ist der Moment, in dem die Münzen weit auseinanderliegen: gleiche Situation, anderes Gefühl.',
    'Kummer hat einen Job: Er zeigt, was wichtig war, und holt Hilfe.',
    'Schluss: „Ja. Ein bisschen.“ reicht – ein ehrlicher Satz statt „mir egal“.',
  ],
  [
    'Körper-Labor: 1 Sprint – Herz/Atem, Hitze (wie Angst oder Wut); 2 Anspannen – Muskeln (wie Wut); 3 Zeitlupe – Schwere (wie Trauer); 4 Siegerpose – Weite (wie Freude, Stolz).',
    'Der Fall: Stein im Magen, kalte Hände, Zähne mahlen, Zittern. Gesicht: alles gut. Körper: Alarm. Erstes Signal: der Stein im Magen.',
    'Körper-Karte und Song-Tipp: kein Richtig oder Falsch. Häufig: Wut heiß (Kopf, Hände), Angst eng (Brust, Hals), Trauer schwer (Brust, Schultern).',
    'Clip danach: aufrecht hinstellen und tief atmen.',
  ],
  [
    'Der Fall: Freude, Wut, Trauer und Angst – alle vier sind echt. Nele muss sich nicht entscheiden.',
    'Was sitzt drunter? Offen: Scham, Enttäuschung und Trauer passen. Am ehesten hilft: „Das war mies. Du hattest echt drauf gehofft.“ oder einfach dableiben.',
    'Chips setzen: keine richtige Lösung. Unter der Wut liegen oft Scham, Enttäuschung oder Angst.',
  ],
]

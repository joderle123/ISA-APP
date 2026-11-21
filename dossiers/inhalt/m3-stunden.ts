// REAL TALK #03 · DRUCK – fünf Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 ist ein Brettspiel (der Druck-Tag), Stunde 2 ein Atem-Labor, Stunde 3 ein Sinnes-Labor mit fünf Plätzen,
// Stunde 4 ein Wettkampf für den Kopf, Stunde 5 ein Kartenspiel – am Ende steht der eigene Plan.
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, clip, fall, fragen, fuerDich, karten, kreuz, kreuzU, material, modell, runde, satz, schluss, seite, st, stimmtDas, stunde, tabelle, text } from './stunden-hilfe'

const zahl = (f: string, wann: string): Frage => ({ f, skala: [wann] })
const kreis = (f: string, ...l: string[]): Frage => ({ f, kreis: l })

export function stunden(d: Heft): Stunde[] {
  const [dieZahl, koerper, reiz, kopf, plan] = d.tracks

  /* ---------- Stunde 1 · Die Zahl ---------- */
  const RAUF: [string, string][] = [['Kaum geschlafen', '+20'], ['Kein Frühstück', '+10'], ['Bus verpasst', '+10'], ['Streit am Morgen', '+20'], ['Jemand lacht über dein Foto', '+20'], ['Schlechte Note zurück', '+20'], ['Es ist laut in der Klasse', '+10'], ['„Wir müssen reden.“', '+20'], ['„Handy weg.“', '+10'], ['Jemand rempelt dich an', '+10'], ['Dein Spiel stürzt ab', '+10'], ['Du wirst vor allen ermahnt', '+20']]
  const RUNTER: [string, string][] = [['Gut gegessen', '−10'], ['Fünf Minuten draußen gehen', '−20'], ['Musik auf dem Weg', '−10'], ['Drei Mal lang ausatmen', '−10'], ['Kurz mit jemandem reden', '−20'], ['Kaltes Wasser über die Hände', '−10']]
  const s1 = stunde('Wie hoch ist dein Druck – und ab wann kippt es?', ['deinen Druck als Zahl von 0 bis 100 sagen', 'Grün, Gelb und Rot unterscheiden', 'erklären, warum sich Druck über den Tag sammelt'],
    seite(
      ankommen('deine Zahl jetzt', zahl('Wie hoch ist dein Druck gerade? Kreise die Zahl ein.', 'jetzt'), kreuz('Wie war dein Morgen?', 'ruhig', 'geht so', 'stressig')),
      st('Erst machen: Faust oder flach', '6 Min.', 'alle gleichzeitig', 'hand-stop', 'Sie machen mit und zeigen ehrlich Ihre Hand. Niemand erklärt etwas. Faust ist immer erlaubt.',
        text('Alle halten eine Hand hinter den Rücken. Die Leitung liest einen Satz vor. Passt er zu dir? **Flache Hand.** Passt er nicht – oder willst du es nicht sagen? **Faust.** Auf „drei“ zeigen alle gleichzeitig.', '„Ich bin schon mal wegen einer Kleinigkeit ausgerastet.“ · „Ich merke früh, wenn es mir zu viel wird.“ · „Wenn ich Hunger habe, bin ich schneller genervt.“ · „Ich war schon mal ganz still – und innen auf 90.“')),
      fall(dieZahl, 'Finn und der Tisch', [
        kreuz('Bei welcher Zahl war Finn schon **vor** dem Satz mit dem Handy?', 'etwa 20', 'etwa 50', 'etwa 70'),
        kreis('Was hat Finns Zahl hochgetrieben? Kreise alles ein.', 'kein Schlaf', 'kein Essen', 'sechste Stunde', 'der Griff nach dem Handy', 'das Wetter'),
      ], { zeitleiste: [['Nacht', 'kaum geschlafen'], ['Morgen', 'nichts gegessen'], ['6. Stunde', '„Handy weg.“ – der Lehrer greift danach'], ['2 Sekunden', 'Der Tisch liegt auf der Seite.']] }),
    ),
    seite(
      modell(dieZahl, 'das Thermometer', ['circle-check', 'alert-triangle', 'flame'], { intro: 'Druck kann man messen – mit einer Zahl von 0 bis 100. Drei Zonen:' }),
      clip(dieZahl, 'Woher kommt die Wut?', [kreuzU('Woher kommt Wut?', 'Sie kommt aus dem Nichts.', 'Sie baut sich auf.', 'Manche sind halt so.')], ['Das macht Wut im Körper:', 'Das hilft:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Finn sagt: „Ich wollte das gar nicht.“ Stimmt das?', 'Ja. Bei Rot schaltet der Kopf fast ab – darum muss man vorher handeln.', 'Nein. Er wollte es.')]),
      fuerDich('Welche Zone?', '8 Min.', fragen(null, dieZahl.moves[0].fragen[0])),
    ),
    seite(
      runde('der Druck-Tag', '25 Min.', 'zwei Teams · am Tisch', 'dice', {
        ziel: 'Sehen, wie sich Druck über den Tag sammelt – und was ihn wieder senkt.',
        material: 'das Thermometer und die 18 Karten von der nächsten Seite (ausschneiden), eine Münze oder Spielfigur pro Team',
        schritte: [
          'Jedes Team stellt seine Figur auf **20**. Die Karten liegen gemischt und verdeckt in der Mitte.',
          'Reihum: Karte ziehen, vorlesen, Figur ziehen. **„+“ heißt rauf, „−“ heißt runter.**',
          'Wer 70 oder mehr erreicht, ist bei Rot: ein Strich neben eure Zeile, drei Mal lang ausatmen, zurück auf 60.',
          'Nach sechs Karten ist der Tag vorbei. Gewonnen hat das Team mit den wenigsten Rot-Strichen, bei Gleichstand die niedrigere Zahl. Dann alle Karten zurück und neu mischen.',
        ],
        runden: [
          { t: 'Runde 1 · Glück', x: 'Nur ziehen. Der Tag passiert einfach.' },
          { t: 'Runde 2 · mit Plan', x: 'Jedes Team bekommt vorher zwei „−“-Karten auf die Hand und spielt sie, wann es will.' },
          { t: 'Runde 3 · eigene Karten', x: 'Jedes Team schreibt eine „+“-Karte und eine „−“-Karte auf Zettel dazu.' },
        ],
        regeln: ['Niemand muss etwas von sich erzählen. Es geht um den Tag auf den Karten.'],
        zu3: 'Alle drei sind ein Team, die Leitung ist das andere.',
        notiz: { titel: 'In Runde 2 haben wir die „−“-Karten gespielt bei Zahl:', linien: 1 },
        auswertung: ['Wann habt ihr in Runde 2 die „−“-Karten gespielt – früh oder erst kurz vor Rot?', 'Welche Karte kennt ihr aus eurem eigenen Tag?'],
      }),
      st('Der Skill: Gehen ohne Worte', '6 Min.', 'alle · still', 'walk', 'Gemeinsam gehen, Flur oder Hof. Sie gehen mit. Danach die Zahl einkreisen lassen.',
        fragen(dieZahl.moves[1].kontext ?? null, ...dieZahl.moves[1].fragen)),
    ),
    seite(
      material('das Thermometer und 18 Karten', 6,
        tabelle('', ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'], [['Team A', '', '', '', '', '', '', '', '', '', ''], ['Team B', '', '', '', '', '', '', '', '', '', '']], 12),
        text('**Grün** 0–30 · **Gelb** 30–70 · **Rot** ab 70. Legt eure Figur in eure Zeile.'),
        karten(4, 18, 'Die 18 Karten: ausschneiden, mischen, verdeckt stapeln.', [...RAUF, ...RUNTER].map(([t, marke]) => ({ t, marke })))),
      schluss(dieZahl, 'Finn am Morgen', [kreuzU('Finn hätte seine Zahl am Morgen gekannt. Was hätte er tun können?', 'etwas essen und dem Lehrer sagen: „Heute bin ich schon bei 60.“', 'gar nichts', 'zu Hause bleiben'), zahl('Schau auf Station 1. Wie hoch ist dein Druck jetzt?', 'jetzt')], ['morgens', 'mittags', 'abends']),
    ),
  )

  /* ---------- Stunde 2 · Körper zuerst ---------- */
  const s2 = stunde('Was hilft, wenn der Kopf nicht mehr zuhört?', ['erklären, warum bei viel Druck zuerst der Körper dran ist', 'drei Arten zu atmen ausprobieren', 'deinen Favoriten zum Runterkommen nennen'],
    seite(
      ankommen('deine Zahl jetzt', zahl('Wie hoch ist dein Druck gerade?', 'jetzt'), kreuz('Was machst du, wenn du aufgeregt bist?', 'atmen', 'bewegen', 'nichts', 'weiß nicht')),
      st('Erst machen: der Vollgas-Test', '8 Min.', 'alle gleichzeitig', 'bolt', 'Würfel bereitlegen. Alle gleichzeitig, auch Sie. Wer nicht mag, geht zügig auf der Stelle.',
        fragen('Zwei Minuten volle Kraft – der Würfel sagt, was: **1–2** Hampelmann · **3–4** auf der Stelle laufen · **5–6** Kniebeugen. Dann zwei Minuten sitzen.', ...koerper.moves[0].fragen.slice(0, 1))),
      fall(koerper, 'Sami vor dem Büro', [
        kreis('Woran sieht man, dass Sami auf Vollgas ist? Kreise alles ein.', 'Bein wippt', 'Hände schwitzen', 'Film im Kopf', 'er gähnt'),
        kreuzU('Warum hat ausgerechnet Atmen geholfen?', 'Langes Ausatmen bremst den Körper.', 'Das war Zufall.'),
      ]),
    ),
    seite(
      modell(koerper, 'Gas und Bremse', ['bolt', 'wind', 'hand-grab'], { zeit: '8 Min.' }),
      clip(koerper, 'die Box-Atmung zum Mitmachen', [kreuz('Dein Druck vor dem Clip?', 'Grün', 'Gelb', 'Rot')], ['Erst mitatmen, danach schreiben – das war leicht:', 'Das war schwer:'],
        [kreuz('Dein Druck nach dem Clip?', 'Grün', 'Gelb', 'Rot'), kreuzU('Sami sitzt wieder vor dem Büro. Was rätst du ihm?', '4 ein, 8 aus', 'Luft anhalten', 'ganz schnell atmen')], '10 Min.'),
      st('Der Skill: anspannen – loslassen', '5 Min.', 'alle gleichzeitig', 'hand-grab', 'Ruhig ansagen und mitmachen. Hände dürfen unter dem Tisch bleiben.',
        text('Das geht überall – auch unter dem Tisch. **Fäuste:** fünf Sekunden fest, dann loslassen. **Schultern:** zu den Ohren ziehen, fallen lassen. **Zehen:** einrollen, loslassen. Zwei Durchgänge. Spür den Unterschied.')),
    ),
    seite(
      runde('das Atem-Labor', '25 Min.', 'zu zweit · dann zwei Teams', 'flask', {
        ziel: 'Herausfinden, welche Atmung bei dir wirkt – und ob ruhige Hände wirklich besser bauen.',
        material: 'die fünf Atem-Karten von der nächsten Seite (ausschneiden und im Raum verteilen), 20 Becher pro Team, Stoppuhr',
        schritte: [
          '**Teil 1 · der Parcours:** Zu zweit von Karte zu Karte. An jeder Karte eine Minute so atmen, wie es draufsteht. Dann unten ankreuzen.',
          'Nach fünf Karten: Schreib deinen Favoriten auf.',
          '**Teil 2 · ruhige Hand:** Zwei Teams bauen einen Becherturm. Zwei Minuten Zeit.',
          '**Durchgang 1:** Team A läuft vorher 20 Sekunden auf der Stelle, Team B atmet drei Mal mit dem Favoriten. **Durchgang 2:** umgekehrt.',
          'Zählt die Becher. Welcher Turm ist höher?',
        ],
        regeln: ['Wem beim Atmen schwindelig wird: normal weiteratmen und hinsetzen.'],
        zu3: 'Ein Team, ein Turm. Ihr vergleicht Durchgang 1 mit Durchgang 2.',
        wertung: { kopf: ['Becher', 'nach dem Laufen', 'nach dem Atmen'], zeilen: ['Team A', 'Team B'] },
        auswertung: ['Welcher Turm war höher – und warum?', 'Welche Atmung kann man machen, ohne dass es jemand sieht?'],
      }, { danach: [fragen(null, ...koerper.moves[1].fragen)] }),
    ),
    seite(
      material('5 Atem-Karten', 6,
        karten(2, 30, 'Ausschneiden und an fünf Plätzen im Raum auslegen.', [
          { t: '4-7-8', x: '4 ein – 7 halten – 8 aus. Vier Runden.', marke: 'Karte 1' },
          { t: 'Finger', x: 'Mit dem Finger die andere Hand entlangfahren: hoch = ein, runter = aus.', marke: 'Karte 2' },
          { t: 'Box', x: '4 ein – 4 halten – 4 aus – 4 halten. Wie ein Viereck.', marke: 'Karte 3' },
          { t: 'Bauch', x: 'Hand auf den Bauch. Beim Einatmen wird er rund.', marke: 'Karte 4' },
          { t: '4-8', x: '4 ein – 8 aus. So wie Sami.', marke: 'Karte 5' },
          { t: 'Eure Karte', x: 'Kennt ihr noch eine Art zu atmen? Schreibt sie auf die Rückseite.', marke: 'Karte 6' },
        ])),
      schluss(koerper, 'vor dem Büro', [kreuzU('Du wartest vor einem wichtigen Gespräch. Dein Bein wippt. Was machst du?', 'länger ausatmen als einatmen', 'mir sagen: „Reiß dich zusammen.“', 'nichts'), zahl('Schau auf Station 1. Wie hoch ist dein Druck jetzt?', 'jetzt')], ['Zahl vorher', 'Skill', 'Zahl nachher']),
    ),
  )

  /* ---------- Stunde 3 · Reiz gegen Reiz ---------- */
  const s3 = stunde('Was holt dich zurück, wenn innen alles dreht?', ['erklären, warum starke Reize den Kopf bremsen', 'fünf Sinne ausprobieren und vergleichen', 'sagen, was in deine Tasche kommt'],
    seite(
      ankommen('was dich runterbringt', zahl('Wie hoch ist dein Druck gerade?', 'jetzt'), kreis('Was beruhigt dich am ehesten? Kreise ein.', 'Musik', 'Kälte', 'ein Duft', 'etwas in der Hand', 'Bewegung', 'weiß nicht')),
      fall(reiz, 'Amira und das kalte Wasser', [
        kreis('Was hat Amira getan? Kreise alles ein.', 'kaltes Wasser', 'Fliesen gezählt', 'Cousine angerufen', 'Tür geknallt', 'Handy geworfen'),
        kreuzU('Was hat das kalte Wasser mit ihrem Kopf gemacht?', 'Es hat ihn ins Jetzt geholt.', 'Es hat sie bestraft.'),
        kreuz('Hat sich Amira dabei wehgetan?', 'ja', 'nein'),
      ]),
      modell(reiz, 'Reiz gegen Reiz', ['eye', 'bolt', 'arrows-up-down'], { zeit: '8 Min.' }),
    ),
    seite(
      clip(reiz, '5-4-3-2-1 zum Mitmachen', [kreuz('Wo sind deine Gedanken gerade?', 'hier', 'woanders', 'überall')], ['Das habe ich gesehen:', 'Das habe ich gehört:'],
        [kreuz('Wo waren deine Gedanken beim Zählen?', 'hier', 'woanders'), kreuzU('Amira zählt die Fliesen. Warum hilft das?', 'Der Kopf ist mit dem Jetzt beschäftigt.', 'Fliesen sind spannend.', 'Es hilft gar nicht.')], '10 Min.'),
      stimmtDas(reiz),
      fuerDich('mein Set für die Tasche', '6 Min.', fragen('Nach dem Labor ausfüllen. Stark: ja. Schädlich: nein.', kreis('Was kommt in deine Tasche? Kreise ein.', 'Duft', 'Kopfhörer', 'Knetball', 'glatter Stein', 'saures Bonbon', 'Kaugummi', 'nichts davon'), satz('Und dann:', 'Das stecke ich diese Woche ein:'))),
    ),
    seite(
      runde('das Sinnes-Labor', '30 Min.', 'zu zweit · fünf Plätze', 'flask', {
        ziel: 'Herausfinden, welcher Reiz dich runterbringt, welcher dich wach macht – und welcher nur nervt.',
        material: 'die fünf Platz-Karten von der nächsten Seite; Duftstreifen (zum Beispiel Zitrone, Minze, Lavendel, Vanille), Kühlpacks im Tuch, eine Kiste mit Gegenständen (Stein, Knetball, Bürste, Tuch), Musik mit Kopfhörern, saure Bonbons',
        schritte: [
          'Die fünf Karten liegen an fünf Plätzen im Raum, das Material daneben.',
          'Zu zweit von Platz zu Platz. Vier Minuten pro Platz.',
          'An jedem Platz: ausprobieren, dann in der Tabelle ankreuzen.',
          'Zum Schluss legt jede Person eine Münze an den Platz, der bei ihr am stärksten wirkt.',
        ],
        regeln: ['Alles ist freiwillig. Riechen nur am Streifen. Kälte höchstens 30 Sekunden.', 'Stark: ja. Schädlich: nein. Nichts darf wehtun.'],
        zu3: 'Alle gehen gemeinsam von Platz zu Platz. Die Leitung probiert mit.',
        auswertung: ['An welchem Platz liegen die meisten Münzen?', 'Was beruhigt die einen – und nervt die anderen?'],
      }, { danach: [tabelle('auto 24mm 24mm 24mm', ['Platz', 'beruhigt', 'macht wach', 'nervt'], [['1 Riechen'], ['2 Kälte'], ['3 Tasten'], ['4 Hören'], ['5 Schmecken']].map(([p]) => [p, '', '', '']), 7)], leitung: 'Plätze vorher aufbauen. Nach Allergien fragen; Bonbons und Düfte sind freiwillig. Sie probieren mit.' }),
    ),
    seite(
      material('5 Platz-Karten', 6,
        karten(2, 30, 'Ausschneiden und an fünf Plätzen im Raum auslegen.', [
          { t: 'Riechen', x: 'Riech an jedem Streifen. Nichts kommt auf die Haut. Welcher Duft ist deiner?', marke: 'Platz 1' },
          { t: 'Kälte', x: 'Kühlpack im Tuch in die Hand. 30 Sekunden, nicht länger. Was macht dein Kopf?', marke: 'Platz 2' },
          { t: 'Tasten', x: 'Augen zu, Hand in die Kiste. Nimm etwas heraus: warm oder kalt? glatt oder rau?', marke: 'Platz 3' },
          { t: 'Hören', x: 'Kopfhörer auf, 30 Sekunden Musik. Bringt sie dich runter – oder lädt sie dich auf?', marke: 'Platz 4' },
          { t: 'Schmecken', x: 'Ein saures Bonbon, wenn du magst. Achte nur auf den Geschmack.', marke: 'Platz 5' },
          { t: 'Euer Platz', x: 'Fällt euch noch ein Reiz ein, der stark ist und nicht schadet?', marke: 'Platz 6' },
        ])),
      schluss(reiz, 'innen 85', [kreuzU('Jemand sitzt ruhig da – innen ist er bei 85. Was hilft am schnellsten?', 'ein starker Reiz: Kälte, Duft, Musik', 'lange darüber reden', 'abwarten'), kreis('Schau auf Station 1: Was beruhigt dich wirklich am ehesten?', 'Musik', 'Kälte', 'ein Duft', 'etwas in der Hand', 'Bewegung')], ['benutzt']),
    ),
  )

  /* ---------- Stunde 4 · Kopfkino ---------- */
  const s4 = stunde('Wie hältst du den Film im Kopf an?', ['erklären, warum Wegdrücken Gedanken stärker macht', 'den Kopf beschäftigen, damit er Pause hat', 'einen sicheren Ort in Gedanken finden'],
    seite(
      ankommen('dein Kopfkino', kreuz('Kennst du das: Ein Gedanke läuft in Dauerschleife?', 'oft', 'manchmal', 'nie'), kreis('Wann dreht dein Kopf am meisten? Kreise ein.', 'abends im Bett', 'in der Schule', 'nach Streit', 'vor Prüfungen', 'fast nie')),
      st('Erst machen: der blaue Elefant', '5 Min.', 'alle · still', 'ban', 'Eine Minute stoppen. Danach nur fragen: Wer hatte null Striche? (Fast niemand.)',
        text('Eine Minute lang: **Denk nicht an einen blauen Elefanten.** Jedes Mal, wenn er doch auftaucht, machst du einen Strich auf den Rand.'),
        fragen(null, kreuz('Wie viele Striche hast du?', '0', '1–3', '4–10', 'mehr'))),
      fall(kopf, 'Mia um zwei Uhr nachts', [
        kreuzU('Warum hat „nicht dran denken“ nicht funktioniert?', 'Wie beim Elefanten: Wegdrücken macht den Gedanken stärker.', 'Mia hat sich nicht genug angestrengt.'),
        kreuzU('Was hat geholfen?', 'rückwärts rechnen – der Kopf war beschäftigt', 'noch länger grübeln', 'aufs Handy schauen'),
      ]),
    ),
    seite(
      modell(kopf, 'drei Wege aus dem Kopfkino', ['puzzle', 'eye', 'switch-horizontal'], { zeit: '8 Min.' }),
      clip(kopf, 'Warum wir grübeln', [kreuzU('Hilft Grübeln, ein Problem zu lösen?', 'ja', 'meistens nicht', 'weiß nicht')], ['Darum grübeln wir:', 'Das hilft dagegen:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Mia liegt wieder wach. Was kann sie noch probieren?', 'den Gedanken zuschauen wie Schiffen', 'sich über sich ärgern', 'auf die Uhr schauen')]),
      st('Still: die Gedanken-Schiffe', '8 Min.', 'alle · still', 'sailboat', 'Langsam vorlesen, drei Minuten Stille lassen. Augen offen ist erlaubt.',
        text('Stell dir einen Fluss vor. Du stehst am Ufer. Jeder Gedanke, der kommt, ist ein Schiff. **Du schaust nur zu.** Bist du eingestiegen? Dann steig wieder aus. Drei Minuten.'),
        fragen(null, ...kopf.moves[0].fragen.slice(0, 2))),
    ),
    seite(
      runde('der Kopf-Zirkel', '25 Min.', 'zwei Teams', 'brain', {
        ziel: 'Merken: Wenn der Kopf voll beschäftigt ist, hat das Kopfkino Pause.',
        material: 'der ABC-Bogen von der nächsten Seite (einer pro Team – oder auf ein Blatt abschreiben), Stifte, Stoppuhr',
        schritte: [
          '**ABC-Runde:** Drei Minuten. Zu jedem Buchstaben ein Tier, eine Stadt oder ein Verein. Jedes Feld: 1 Punkt.',
          '**Rückwärts:** Zählt reihum von 50 rückwärts – jede Person eine Zahl, so schnell es geht. Die Leitung stoppt die Zeit. Das schnellere Team: 3 Punkte.',
          '**Blau-Jagd:** 45 Sekunden still alle blauen Dinge im Raum zählen. Wer am nächsten an der Zahl der Leitung ist: 3 Punkte.',
          '**Eine Minute:** Alle stehen, Augen zu. Setz dich, wenn du glaubst, 60 Sekunden sind um. Am nächsten dran: 3 Punkte.',
        ],
        regeln: ['Wer sich verzählt, macht einfach weiter. Niemand wird vorgeführt.'],
        zu3: 'Ein Team gegen die Uhr: Jede Runde zweimal. Wird der zweite Versuch besser?',
        wertung: { kopf: ['Punkte', 'ABC', 'Rückwärts', 'Blau-Jagd', 'Eine Minute'], zeilen: ['Team A', 'Team B'] },
        auswertung: ['Bei welcher Runde war kein Platz mehr für andere Gedanken?', 'Welche Runde könnte Mia nachts im Bett machen?'],
      }),
    ),
    seite(
      material('der ABC-Bogen', 6,
        tabelle('8mm auto 8mm auto 8mm auto', ['', 'Tier, Stadt oder Verein', '', '', '', ''], [['A', '', 'J', '', 'S', ''], ['B', '', 'K', '', 'T', ''], ['C', '', 'L', '', 'U', ''], ['D', '', 'M', '', 'V', ''], ['E', '', 'N', '', 'W', ''], ['F', '', 'O', '', 'X', ''], ['G', '', 'P', '', 'Y', ''], ['H', '', 'Q', '', 'Z', ''], ['I', '', 'R', '', '', '']], 8)),
      fuerDich('mein Ort', '8 Min.', fragen(kopf.moves[1].kontext ?? null, ...kopf.moves[1].fragen)),
      schluss(kopf, 'zwei Uhr nachts', [kreuzU('Es ist nachts, dein Kopf dreht. Was probierst du zuerst?', 'rückwärts zählen', 'den Gedanken zuschauen', 'an meinen Ort denken', 'wegdrücken')], ['1', '2', '3']),
    ),
  )

  /* ---------- Stunde 5 · Dein Plan ---------- */
  const SKILLS: [string, string][] = [['4 ein, 8 aus', 'Körper'], ['Fäuste ballen, loslassen', 'Körper'], ['auf der Stelle sprinten', 'Körper'], ['gegen die Wand drücken', 'Körper'], ['kaltes Wasser über die Hände', 'Sinne'], ['mein Duft aus der Tasche', 'Sinne'], ['Musik auf die Ohren', 'Sinne'], ['saures Bonbon', 'Sinne'], ['rückwärts zählen', 'Kopf'], ['5-4-3-2-1', 'Sinne'], ['an meinen Ort denken', 'Kopf'], ['alle blauen Dinge zählen', 'Kopf'], ['jemanden anrufen', 'Mensch'], ['sagen: „Ich brauche kurz Pause.“', 'Mensch'], ['zu jemandem gehen, dem ich vertraue', 'Mensch'], ['schreiben statt reden', 'Mensch'], ['rausgehen', 'Tun'], ['kritzeln oder zeichnen', 'Tun'], ['etwas essen und trinken', 'Tun'], ['aufräumen', 'Tun']]
  const NOTRUF = ['Jemand beleidigt deine Familie.', 'Du hast kaum geschlafen. Erste Stunde: Test.', 'Du wartest auf ein Gespräch beim Direktor.', 'Dein Handy wird eingesammelt.', 'Im Chat wird über dich gelästert.', 'Es ist nachts. Du kannst nicht schlafen.', 'Zu Hause gab es Streit. Du sitzt im Bus.', 'Jemand rempelt dich im Flur an – mit Absicht.', 'Du sollst vor allen etwas vortragen.']
  const s5 = stunde('Was machst du bei Grün, Gelb und Rot?', ['Skills nach Zonen sortieren', 'sagen, was bei dir wirkt – und was nicht', 'deinen eigenen Ampelplan aufschreiben'],
    seite(
      ankommen('was bei dir gewirkt hat', kreis('Was hat dir in den letzten Stunden am meisten gebracht? Kreise ein.', 'Atmen', 'Kälte', 'Duft', 'Musik', 'Zählen', 'Gehen', 'mein Ort', 'noch nichts'), kreuz('Hast du diese Woche einen Skill benutzt?', 'ja', 'nein')),
      fall(plan, 'Finn, vier Wochen später', [
        kreuz('Bei welcher Zahl hat Finn diesmal reagiert?', '30', '60', '95'),
        kreis('Was hat Finn getan? Kreise alles ein.', 'Handy hingelegt', 'Fäuste geballt – unter dem Tisch', 'lang ausgeatmet', 'Tisch umgeworfen', 'später mit dem Lehrer geredet'),
      ]),
      modell(plan, 'die Ampel', ['circle-check', 'alert-triangle', 'hand-stop'], { zeit: '8 Min.' }),
    ),
    seite(
      clip(plan, 'Rauslassen oder runterschlucken?', [kreuzU('Wut: besser rauslassen oder runterschlucken?', 'rauslassen – draufhauen', 'runterschlucken', 'keins von beiden')], ['Das passiert beim Draufhauen:', 'Das hilft wirklich:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Was hat Finn gemacht?', 'Kraft raus ohne Ziel: Fäuste, Atem', 'draufgehauen', 'alles runtergeschluckt')]),
      stimmtDas(plan),
      fuerDich('meine Top 5', '8 Min.', fragen('Nach dem Spiel ausfüllen: nur, was bei dir wirkt.', ...plan.moves[0].fragen)),
    ),
    seite(
      runde('der Skills-Notruf', '25 Min.', 'alle · am Tisch', 'cards', {
        ziel: 'Üben, schnell den passenden Skill zu finden – je nach Zone.',
        material: 'die 20 Skill-Karten und 9 Notruf-Karten von der nächsten Seite (ausschneiden), ein Würfel',
        schritte: [
          'Jede Person bekommt drei Skill-Karten auf die Hand. Der Rest ist der Stapel.',
          'Ein Notruf wird vorgelesen. Der Würfel sagt die Zone: **1–2 Grün · 3–4 Gelb · 5–6 Rot.**',
          'Alle legen **gleichzeitig** verdeckt die Karte, die jetzt am besten passt. Aufdecken.',
          'Daumen-Abstimmung: Wirkt das in dieser Zone? Ja: 1 Punkt. Gespielte Karte unter den Stapel, eine neue nachziehen.',
        ],
        runden: [
          { t: 'Runde 1 · offen', x: 'Jede Karte zählt, wenn die Gruppe zustimmt.' },
          { t: 'Runde 2 · Rot ist streng', x: 'Bei Rot zählen nur Körper- und Sinnes-Karten, „rausgehen“ und „zu jemandem gehen, dem ich vertraue“. Bei Rot denkt keiner.' },
          { t: 'Runde 3 · mitmachen', x: 'Wer mag, macht seinen Skill eine Minute mit allen. Freiwillig.' },
        ],
        regeln: ['Niemand muss sagen, ob er die Situation kennt.'],
        zu3: 'Die Leitung spielt mit. Jede Person bekommt vier Karten.',
        auswertung: ['Welche Karte hat fast immer gepasst?', 'Welche Karten gingen bei Rot nicht mehr?'],
      }),
      fuerDich('mein Ampelplan', '12 Min.', fragen(plan.moves[1].kontext ?? null, ...plan.moves[1].fragen, satz('Ein Mensch für meinen Plan:', 'Wenn es brennt, gehe ich zu:'))),
    ),
    seite(
      material('20 Skill-Karten und 9 Notrufe', 6,
        karten(4, 15, 'Die Skill-Karten: ausschneiden, mischen, austeilen.', SKILLS.map(([t, marke]) => ({ t, marke }))),
        karten(3, 16, 'Die Notrufe: ausschneiden, mischen, verdeckt stapeln.', NOTRUF.map((t) => ({ t })))),
      schluss(plan, 'Finn und du', [kreuzU('Finn hatte seinen Plan im Kopf, bevor es brannte. Wann machst du deinen?', 'jetzt – bei Grün', 'wenn es so weit ist', 'gar nicht'), kreuz('Schau auf Station 1: Steht das in deinem Plan?', 'ja', 'nein')], ['gezeigt']),
    ),
  )
  return [s1, s2, s3, s4, s5]
}

/** Lösungen für die Leitung – passend zu den Stationen oben */
export const loesungen: string[][] = [
  [
    'Der Fall: Finn war schon vor dem Satz hoch – 50 oder 70 gelten beide (kein Schlaf, kein Essen, sechste Stunde). Der Griff nach dem Handy war nur der letzte Schritt.',
    'Clip danach: Ja. Ab etwa 70 denkt der Kopf kaum noch mit – das entschuldigt nichts, erklärt aber, warum man vorher handeln muss.',
    'Druck-Tag: In Runde 2 gewinnt meist, wer die „−“-Karten bei Gelb (ab etwa 50) spielt – zu früh verpufft, zu spät ist man schon bei Rot. Das ist die Botschaft: bei Gelb reagieren, nicht erst bei Rot.',
  ],
  [
    'Der Fall: Bein wippt, Hände schwitzen, Film im Kopf. Langes Ausatmen bremst den Körper – der Puls sinkt.',
    'Atem-Labor: kein Richtig oder Falsch. Der zweite Turm ist oft schon durch Übung höher – deshalb tauschen die Teams. Ehrlich auswerten, auch wenn Atmen nicht gewinnt.',
    'Schluss: länger ausatmen als einatmen.',
  ],
  [
    'Der Fall: kaltes Wasser, Fliesen gezählt, Cousine angerufen. Das Wasser hat den Kopf ins Jetzt geholt. Wehgetan hat sie sich nicht – stark, aber nicht schädlich.',
    'Sinnes-Labor: kein Richtig oder Falsch. Wichtig ist der Satz: Was die einen beruhigt, nervt die anderen. Bei „Bei Rot hilft nur, was wehtut“ keine Antworten abfragen; wer „stimmt“ ankreuzt, später unter vier Augen ansprechen.',
  ],
  [
    'Elefant und Fall: Wegdrücken macht Gedanken stärker. Geholfen hat, den Kopf zu beschäftigen (rückwärts rechnen).',
    'Clip: Grübeln löst meistens nichts – es dreht sich im Kreis.',
    'Schluss: Alles außer „wegdrücken“ ist eine gute Antwort.',
  ],
  [
    'Der Fall: Finn hat bei 60 reagiert: Handy hingelegt, Fäuste unter dem Tisch, lang ausgeatmet, später geredet. Anders als in Stunde 1 hat er sein Warnsignal früh gemerkt.',
    'Clip: Keins von beiden. Draufhauen heizt nach; dauerndes Runterschlucken kostet Kraft. Besser: runterfahren (lang ausatmen, anspannen–loslassen), dann reden.',
    'Skills-Notruf: Bei Rot zählen Körper, Sinne, Rausgehen und zu einem Menschen gehen. Kopf-Skills und langes Reden wirken erst wieder bei Gelb.',
  ],
]

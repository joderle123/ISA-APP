// REAL TALK #03 · DRUCK – fünf Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 ist ein Brettspiel (der Druck-Tag), Stunde 2 ein Atem-Labor, Stunde 3 ein Sinnes-Labor mit fünf Plätzen,
// Stunde 4 ein Kopf-Zirkel, Stunde 5 ein Kartenspiel – am Ende steht der eigene Plan.
// Neu im Sweet Spot (24.11.2026): Sprechblasen nach jedem Fall, Modelle mit einfacher Übung, große Runden ohne Punkte.
// Umbau 27.11.2026 nach fünf jugendlichen Kritikern: ein Clip im Heft (Stunde 1), Pausen, Stunde 2 neu als Puls-Labor
// (messen statt glauben), Stunde 3 mit echtem Set zum Mitnehmen, Stunde 4 mit dem Gedanken-Parkplatz statt Fantasiereisen,
// Stunde 5 mit dem Ampelplan zum Legen und Falten.
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, beispiel, clip, fall, fragen, fuerDich, karten, kreuz, kreuzU, material, modell, raster, reden, runde, satz, schluss, seite, st, stimmtDas, stunde, tabelle, text, verbinden, weiter, zeile, pause } from './stunden-hilfe'

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
      ], { zeitleiste: [['Nacht', 'kaum geschlafen'], ['Morgen', 'nichts gegessen'], ['6. Stunde', '„Handy weg.“ – der Lehrer greift danach'], ['2 Sekunden', 'Der Tisch liegt auf der Seite.']], leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
    ),
    seite(
      weiter('Der Fall: Finn und der Tisch', 3, 'search', reden('Kennt ihr Tage, an denen schon morgens alles schiefgeht – und dann reicht ein kleiner Satz?')),
      modell(dieZahl, 'das Thermometer', ['circle-check', 'alert-triangle', 'flame'], { wie: 'alle · dann allein', intro: 'Druck kann man messen – mit einer Zahl von 0 bis 100. Drei Zonen:',
        leitung: 'Vorlesen. Den Zonen-Check allein ankreuzen, dann auflösen: „ganz still“ ist oft Gelb.',
        fragen: [raster('In welcher Zone ist jemand, der das sagt oder tut? Ein Kreuz pro Zeile.', ['Grün', 'Gelb', 'Rot'], 'Ich kann noch Witze machen.', 'Ich antworte nur noch kurz.', 'Ich höre nicht mehr, was jemand sagt.', 'Ich werde ganz still.')],
        danach: [reden('Woran merken andere bei euch, dass ihr bei Gelb seid?')] }),
    ),
    seite(
      clip(dieZahl, 'Woher kommt die Wut?',
        [kreuzU('Woher kommt Wut?', 'Sie kommt aus dem Nichts.', 'Sie baut sich auf.', 'Manche sind halt so.'), kreuz('Wie schnell wirst du wütend?', 'schnell', 'mittel', 'langsam')],
        ['Das macht Wut im Körper:', 'Das hilft:', 'Das hat mich überrascht:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Finn sagt: „Ich wollte das gar nicht.“ Stimmt das?', 'Ja. Bei Rot schaltet der Kopf fast ab – darum muss man vorher handeln.', 'Nein. Er wollte es.')]),
    ),
    seite(
      pause(),

      runde('der Druck-Tag', '30 Min.', 'alle · am Tisch', 'dice', {
        ziel: 'Zusammen einen Tag durchspielen: Wie sammelt sich Druck – und was senkt ihn wieder?',
        material: 'das Thermometer und die 18 Karten von der nächsten Seite (ausschneiden), eine Spielfigur für die ganze Gruppe',
        schritte: [
          'Eine Figur für alle: Sie startet bei **20**. Die Karten liegen gemischt und verdeckt in der Mitte.',
          'Reihum: Karte ziehen, vorlesen, Figur ziehen. **„+“ heißt rauf, „−“ heißt runter.**',
          'Kommt die Figur auf 70 oder mehr, ist sie bei Rot: ein Strich, alle atmen dreimal lang aus, zurück auf 60.',
          'Nach acht Karten ist der Tag vorbei. **Ziel der Gruppe:** so wenig Rot-Striche wie möglich.',
        ],
        runden: [
          { t: 'Runde 1 · Glück', x: 'Nur ziehen. Der Tag passiert einfach.' },
          { t: 'Runde 2 · mit Plan', x: 'Die Gruppe hat zwei „−“-Karten auf der Hand und entscheidet gemeinsam, wann sie sie spielt.' },
          { t: 'Runde 3 · eigene Karten', x: 'Jede Person schreibt eine „+“-Karte und eine „−“-Karte dazu.' },
        ],
        regeln: ['Niemand muss etwas von sich erzählen. Es geht um den Tag auf den Karten.', 'Es gibt keine Teams gegeneinander – ihr spielt zusammen gegen den Tag.'],
        zu3: 'Genauso.',
        notiz: { titel: 'In Runde 2 haben wir die „−“-Karten gespielt bei Zahl:', linien: 1 },
        auswertung: ['Wann habt ihr in Runde 2 die „−“-Karten gespielt – früh oder erst kurz vor Rot?', 'Welche Karte kennt ihr aus eurem eigenen Tag?'],
      }, { danach: [beispiel('So kann es klingen', ['Ben zieht:', '„Streit am Morgen. Plus 20.“ Die Figur steht bei 60.'], ['Sara:', 'Jetzt die Minus-Karte spielen – sonst sind wir gleich bei Rot.'], ['Alle:', 'Okay. „Fünf Minuten draußen gehen.“ Minus 20.'])] }),
    ),
    seite(
      material('das Thermometer und 18 Karten', 7,
        tabelle('', ['', '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'], [['Runde 1', '', '', '', '', '', '', '', '', '', '', ''], ['Runde 2', '', '', '', '', '', '', '', '', '', '', ''], ['Runde 3', '', '', '', '', '', '', '', '', '', '', '']], 8),
        text('**Grün** 0–29 · **Gelb** 30–69 · **Rot** ab 70. Die Figur läuft in der Zeile der Runde.'),
        karten(4, 13, 'Die 18 Karten: ausschneiden, mischen, verdeckt stapeln.', [...RAUF, ...RUNTER].map(([t, marke]) => ({ t, marke })))),
      schluss(dieZahl, 'Finn am Morgen', [kreuzU('Finn hätte seine Zahl am Morgen gekannt. Was hätte er tun können?', 'etwas essen und kurz Bescheid sagen: „Heute ist schwer.“', 'gar nichts', 'zu Hause bleiben'), zahl('Schau auf Station 1. Wie hoch ist dein Druck jetzt?', 'jetzt')], ['morgens', 'mittags', 'abends']),
    ),
  )

  /* ---------- Stunde 2 · Das Puls-Labor (neu 27.11.2026) ---------- */
  // Raus: Modell-Raster, Box-Clip, Skill-Block, Atem-Parcours, Becherturm („Esoterik-Marathon“, Durchgang 2 gewinnt nur durch Übung).
  // Neu: Die Jugendlichen messen ihren Puls – vor und nach Vollgas, vor und nach drei Bremsen. „Heute glauben wir nichts.“
  const s2 = stunde('Was hilft, wenn der Kopf nicht mehr zuhört?', ['deinen Puls messen', 'zwei Bremsen anwenden', 'sagen, welche Bremse bei dir wirkt'],
    seite(
      ankommen('deine Zahl jetzt', zahl('Wie hoch ist dein Druck gerade?', 'jetzt'), kreuz('Was machst du, wenn du aufgeregt bist?', 'atmen', 'bewegen', 'nichts', 'weiß nicht')),
      st('Puls finden', '8 Min.', 'alle gleichzeitig', 'heartbeat', 'Sagen Sie: „Heute glauben wir nichts. Wir messen.“ Sie zählen die 15 Sekunden laut an und messen mit.',
        text('Leg zwei Finger an den Hals (neben den Kehlkopf) oder innen ans Handgelenk. Die Leitung sagt „los“ – **zähl 15 Sekunden lang die Schläge.** Mal 4 = dein Puls pro Minute.'),
        fragen(null, zahl('Mein Ruhepuls:', 'Schläge pro Minute'))),
      fall(koerper, 'Sami vor dem Lehrerzimmer', [
        kreis('Woran sieht man, dass Sami auf Vollgas ist? Kreise alles ein.', 'Bein wippt', 'Hände schwitzen', 'Film im Kopf', 'er gähnt'),
        kreuzU('Warum hat ausgerechnet Atmen geholfen?', 'Langes Ausatmen bremst den Körper.', 'Das war Zufall.'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Sami vor dem Lehrerzimmer', 3, 'search', reden('Wo wartet ihr ungern – und was macht euer Körper dann?')),
    ),
    seite(
      st('Vollgas mit Wette', '12 Min.', 'alle gleichzeitig', 'bolt', 'Würfel bereitlegen. Alle gleichzeitig, auch Sie. Wer nicht mag, geht zügig auf der Stelle.',
        fragen('Erst tippen: Wie hoch geht dein Puls nach **einer Minute Vollgas?** Dann sagt der Würfel, was: **1–2** Hampelmann · **3–4** auf der Stelle laufen · **5–6** Kniebeugen. Sofort danach messen.',
          zahl('Mein Tipp:', 'Schläge'), zahl('Gemessen:', 'Schläge'))),
      pause(),
    ),
    seite(
      runde('das Puls-Labor', '35 Min.', 'alle gleichzeitig', 'flask', {
        ziel: 'Messen, welche Bremse deinen Puls wirklich runterbringt.',
        material: 'eine Uhr mit Sekundenzeiger oder Stoppuhr, die Tabelle unten',
        schritte: [
          '**Drei Durchgänge.** Jedes Mal: eine Minute Vollgas – messen – zwei Minuten Bremse – messen.',
          '**Bremse A:** einfach sitzen. **Bremse B:** 4 Sekunden ein, 8 Sekunden aus – wie Sami. **Bremse C:** Fäuste fest anspannen, loslassen – immer wieder.',
          'Vor jeder Bremse tippen: Wie weit runter geht es? Danach messen und eintragen.',
          'Zum Schluss: Kreis in der Tabelle die Bremse ein, bei der deine Zahl am tiefsten fiel.',
        ],
        regeln: ['Wem schwindelig wird: normal weiteratmen und hinsetzen.', 'Keine Punkte. Jede Person vergleicht nur sich selbst.'],
        zu3: 'Genauso. Die Leitung misst mit.',
        notiz: { titel: 'Bei mir hat am meisten gebremst:', linien: 1 },
        auswertung: ['Welche Bremse geht im Unterricht, ohne dass es einer merkt?', 'Wirken alle gleich? Dann zählt, was sich ruhiger anfühlt.'],
      }, { leitung: 'Wirken alle gleich, ist das auch ein Ergebnis. Erzählen Sie nichts vorher – die Zahlen sollen sprechen.',
        danach: [tabelle('auto 22mm 24mm 24mm', ['Durchgang', 'Ruhe', 'nach Vollgas', 'nach Bremse'], [['A · einfach sitzen', '', '', ''], ['B · 4 ein, 8 aus', '', '', ''], ['C · Fäuste an und los', '', '', '']], 9),
          beispiel('So sieht eine Runde aus', ['Amira:', 'Ruhe 84. Nach Vollgas 132.'], ['', 'Zwei Minuten 4 ein, 8 aus.'], ['Amira:', '96. Fast wieder unten.'])] }),
    ),
    seite(
      schluss(koerper, 'vor dem Lehrerzimmer', [
        raster('Was wirkt bei dir? Ein Kreuz pro Zeile.', ['wirkt', 'geht so', 'nichts für mich'], 'einfach sitzen', '4 ein, 8 aus', 'Fäuste an und los'),
        satz('Mein Favorit:', 'Wenn ich (wann? wo?) …, dann mache ich …'),
        zahl('Schau auf Station 1. Wie hoch ist dein Druck jetzt?', 'jetzt'),
      ], ['Zahl vorher', 'Skill', 'Zahl nachher']),
    ),
  )

  /* ---------- Stunde 3 · Reiz gegen Reiz ---------- */
  const s3 = stunde('Was holt dich zurück, wenn innen alles dreht?', ['erklären, warum starke Reize den Kopf bremsen', 'fünf Sinne ausprobieren und vergleichen', 'sagen, was in deine Tasche kommt'],
    seite(
      ankommen('was dich runterbringt', kreuzU('Letzte Woche hast du eine Bremse getestet. Was hat deine Zahl gemacht?', 'runter', 'gleich', 'rauf', 'nicht getestet'), kreis('Was beruhigt dich am ehesten? Kreise ein.', 'Musik', 'Kälte', 'ein Duft', 'etwas in der Hand', 'Bewegung', 'weiß nicht')),
      fall(reiz, 'Amira und das kalte Wasser', [
        kreis('Was hat Amira getan? Kreise alles ein.', 'kaltes Wasser', 'Fliesen gezählt', 'Cousine angerufen', 'Tür geknallt', 'Handy geworfen'),
        kreuzU('Was hat das kalte Wasser mit ihrem Kopf gemacht?', 'Es hat ihn ins Jetzt geholt.', 'Es hat sie bestraft.'),
        kreuz('War das stark – und trotzdem ungefährlich?', 'ja', 'nein'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Amira und das kalte Wasser', 2, 'search', reden('Was macht ihr, wenn innen alles dreht – und was davon hilft wirklich?')),
    ),
    seite(
      modell(reiz, 'Reiz gegen Reiz', ['eye', 'bolt', 'arrows-up-down'], { zeit: '8 Min.', wie: 'alle · dann allein',
        leitung: 'Vorlesen. Allein ankreuzen, dann auflösen. Bei „schadet“ klar bleiben: Stark ist gut, schädlich nie.',
        fragen: [raster('Bringt es runter, macht es wach – oder schadet es? Ein Kreuz pro Zeile.', ['runter', 'wach', 'schadet'], 'kaltes Wasser ins Gesicht', 'ein saures Bonbon', 'ruhige Musik', 'mit der Faust gegen die Wand', 'ein Duft, den du magst')],
        danach: [reden('Was fehlt euch öfter: runterkommen oder wach werden?')] }),
      pause(),
    ),
    seite(
      runde('das Sinnes-Labor', '35 Min.', 'zu zweit · fünf Plätze', 'flask', {
        ziel: 'Herausfinden, welcher Reiz dich runterbringt, welcher dich wach macht – und welcher nur nervt.',
        material: 'die fünf Platz-Karten von der nächsten Seite; Duftstreifen (zum Beispiel Zitrone, Minze, Lavendel, Vanille), Kühlpacks (am Vortag ins Gefrierfach) im Tuch oder ein Becher Eiswasser, eine Kiste mit Gegenständen (Stein, Knetball, Bürste, Tuch), Musik mit Kopfhörern, saure Bonbons',
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
      st('Dein Set bauen', '10 Min.', 'allein', 'package', 'Material bereitlegen: kleine Umschläge oder Dosen, Duftstreifen, saure Bonbons, glatte Steine. Jede Person nimmt mit, was bei ihr gewirkt hat.',
        text('Bau dein Set für die Tasche – **nur aus dem, was bei dir gewirkt hat.** Ein Umschlag oder eine kleine Dose, darin zum Beispiel: dein Duftstreifen, ein saures Bonbon, ein glatter Stein. Schreib deinen Namen drauf.'),
        fragen(null, kreis('Was ist in deinem Set?', 'Duft', 'saures Bonbon', 'glatter Stein', 'Knetball', 'Kopfhörer', 'etwas anderes'))),
      material('5 Platz-Karten', 5,
        karten(2, 30, 'Ausschneiden und an fünf Plätzen im Raum auslegen.', [
          { t: 'Riechen', x: 'Riech an jedem Streifen. Nichts kommt auf die Haut. Welcher Duft ist deiner?', marke: 'Platz 1' },
          { t: 'Kälte', x: 'Kühlpack im Tuch in die Hand. 30 Sekunden, nicht länger. Was macht dein Kopf?', marke: 'Platz 2' },
          { t: 'Tasten', x: 'Augen zu, Hand in die Kiste. Nimm etwas heraus: warm oder kalt? glatt oder rau?', marke: 'Platz 3' },
          { t: 'Hören', x: 'Kopfhörer auf, 30 Sekunden Musik. Bringt sie dich runter – oder lädt sie dich auf?', marke: 'Platz 4' },
          { t: 'Schmecken', x: 'Ein saures Bonbon, wenn du magst. Achte nur auf den Geschmack.', marke: 'Platz 5' },
        ])),
    ),
    seite(
      schluss(reiz, 'innen 85', [kreuzU('Jemand sitzt ruhig da – innen ist er bei 85. Was hilft am schnellsten?', 'ein starker Reiz: Kälte, Duft, Musik', 'lange darüber reden', 'abwarten'), kreis('Schau auf Station 1: Was beruhigt dich wirklich am ehesten?', 'Musik', 'Kälte', 'ein Duft', 'etwas in der Hand', 'Bewegung')], ['benutzt']),
    ),
  )

  /* ---------- Stunde 4 · Kopfkino ---------- */
  const s4 = stunde('Wie hältst du den Film im Kopf an?', ['erklären, warum Wegdrücken Gedanken stärker macht', 'den Kopf beschäftigen, damit er Pause hat', 'einen Gedanken bis morgen parken'],
    seite(
      ankommen('dein Kopfkino', kreuz('Kennst du das: Ein Gedanke läuft in Dauerschleife?', 'oft', 'manchmal', 'nie'), kreis('Wann dreht dein Kopf am meisten? Kreise ein.', 'abends im Bett', 'in der Schule', 'nach Streit', 'vor Prüfungen', 'fast nie')),
      st('Erst machen: der blaue Elefant', '5 Min.', 'alle · still', 'ban', 'Eine Minute stoppen. Danach nur fragen: Wer hatte null Striche? (Fast niemand.)',
        text('Eine Minute lang: **Denk nicht an einen blauen Elefanten.** Jedes Mal, wenn er doch auftaucht, machst du einen Strich auf den Rand.'),
        fragen(null, kreuz('Wie viele Striche hast du?', '0', '1–3', '4–10', 'mehr'))),
      fall(kopf, 'Mia um zwei Uhr nachts', [
        kreuzU('Warum hat „nicht dran denken“ nicht funktioniert?', 'Wie beim Elefanten: Wegdrücken macht den Gedanken stärker.', 'Mia hat sich nicht genug angestrengt.'),
        kreuzU('Was hat geholfen?', 'rückwärts rechnen – der Kopf war beschäftigt', 'noch länger grübeln', 'aufs Handy schauen'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
    ),
    seite(
      weiter('Der Fall: Mia um zwei Uhr nachts', 3, 'search', reden('Was dreht bei Leuten in eurem Alter nachts am meisten – Schule, Streit, Chat?')),
      modell(kopf, 'drei Wege aus dem Kopfkino', ['puzzle', 'eye', 'switch-horizontal'], { zeit: '6 Min.', wie: 'alle',
        leitung: 'Nur vorlesen. Zu jedem Weg ein Beispiel aus der Gruppe.',
        danach: [reden('Welcher Weg passt am besten zu euch?')] }),
    ),
    seite(
      pause(),
      runde('der Kopf-Zirkel', '32 Min.', 'alle · gegen die Uhr', 'brain', {
        ziel: 'Merken: Wenn der Kopf voll beschäftigt ist, hat das Kopfkino Pause.',
        material: 'der ABC-Bogen von der nächsten Seite, Stifte, Stoppuhr',
        schritte: [
          '**ABC-Runde:** Drei Minuten. Die Gruppe füllt zusammen zu jedem Buchstaben ein Tier, eine Stadt oder einen Verein.',
          '**Rückwärts:** Zählt reihum von 50 rückwärts – jede Person eine Zahl. Die Leitung stoppt die Zeit. Zweiter Versuch: Schafft ihr es schneller?',
          '**Blau-Jagd:** 45 Sekunden still alle blauen Dinge im Raum zählen. Dann vergleichen.',
          '**Eine Minute:** Alle stehen, Augen zu. Setz dich, wenn du glaubst, 60 Sekunden sind um.',
          '**Wie Mia:** Von 100 rückwärts in Dreierschritten. Jede Person still für sich – wer bei 70 ist, hebt die Hand.',
        ],
        regeln: ['Es gibt keine Punkte und keine Teams. Ihr spielt zusammen gegen die Uhr.', 'Wer sich verzählt, macht einfach weiter. Niemand wird vorgeführt.'],
        zu3: 'Genauso.',
        auswertung: ['Bei welcher Runde war kein Platz mehr für andere Gedanken?', 'Welche Runde könnte Mia nachts im Bett machen?'],
      }),
      st('Der Gedanken-Parkplatz', '8 Min.', 'allein', 'parking', 'Sagen Sie: „Was auf dem Zettel steht, muss der Kopf nachts nicht festhalten.“ Was nicht bis morgen warten kann, gehört zu einem Menschen – tagsüber auch an die 116 111, im Notfall 112.',
        text('Füll den **Parkschein** unten aus – mit Mias Gedanken oder einem eigenen. Heute Abend legst du ihn neben dein Bett.'),
        tabelle('auto', ['Mein Parkschein'], [['Was dreht? ______________'], ['Wann kümmere ich mich darum? Morgen um ______'], ['Wer kann helfen? ______________']], 10),
        reden('Was kann bis morgen warten – und was nicht?')),
    ),
    seite(
      material('der ABC-Bogen', 6,
        tabelle('8mm auto 8mm auto 8mm auto', ['', 'Tier, Stadt oder Verein', '', '', '', ''], [['A', '', 'J', '', 'S', ''], ['B', '', 'K', '', 'T', ''], ['C', '', 'L', '', 'U', ''], ['D', '', 'M', '', 'V', ''], ['E', '', 'N', '', 'W', ''], ['F', '', 'O', '', 'X', ''], ['G', '', 'P', '', 'Y', ''], ['H', '', 'Q', '', 'Z', ''], ['I', '', 'R', '', '', '']], 7)),
      schluss(kopf, 'zwei Uhr nachts', [kreuzU('Schau auf Station 1: Wenn dein Kopf am meisten dreht – was probierst du zuerst?', 'rückwärts zählen', 'Parkschein schreiben', 'mit jemandem reden', 'wegdrücken')], ['1', '2', '3']),
    ),
  )

  /* ---------- Stunde 5 · Dein Plan ---------- */
  const SKILLS: [string, string][] = [['4 ein, 8 aus', 'Körper'], ['Fäuste ballen, loslassen', 'Körper'], ['auf der Stelle sprinten', 'Körper'], ['gegen die Wand drücken', 'Körper'], ['kaltes Wasser über die Hände', 'Sinne'], ['mein Duft aus der Tasche', 'Sinne'], ['Musik auf die Ohren', 'Sinne'], ['saures Bonbon', 'Sinne'], ['rückwärts zählen', 'Kopf'], ['5-4-3-2-1', 'Sinne'], ['einen Parkschein schreiben', 'Kopf'], ['alle blauen Dinge zählen', 'Kopf'], ['jemanden anrufen', 'Mensch'], ['sagen: „Ich brauche kurz Pause.“', 'Mensch'], ['zu jemandem gehen, dem ich vertraue', 'Mensch'], ['schreiben statt reden', 'Mensch'], ['rausgehen', 'Tun'], ['kritzeln oder zeichnen', 'Tun'], ['etwas essen und trinken', 'Tun'], ['aufräumen', 'Tun']]
  const NOTRUF = ['Jemand beleidigt deine Familie.', 'Du hast kaum geschlafen. Erste Stunde: Test.', 'Du wartest auf ein Gespräch mit der Klassenlehrerin.', 'Dein Handy wird eingesammelt.', 'Im Chat wird über dich gelästert.', 'Es ist nachts. Du kannst nicht schlafen.', 'Zu Hause gab es Streit. Du sitzt im Bus.', 'Jemand rempelt dich im Flur an – mit Absicht.', 'Du sollst vor allen etwas vortragen.']
  const s5 = stunde('Was machst du bei Grün, Gelb und Rot?', ['Skills nach Zonen sortieren', 'sagen, was bei dir wirkt – und was nicht', 'deinen eigenen Ampelplan aufschreiben'],
    seite(
      ankommen('was bei dir gewirkt hat', kreis('Was hat dir in den letzten Stunden am meisten gebracht? Kreise ein.', 'Atmen', 'Kälte', 'Duft', 'Musik', 'Zählen', 'Parkschein', 'noch nichts'), kreuz('Hast du diese Woche einen Skill benutzt?', 'ja', 'nein')),
      fall(plan, 'Finn, vier Wochen später', [
        kreuz('Bei welcher Zahl hat Finn diesmal reagiert?', '30', '60', '95'),
        kreis('Was hat Finn getan? Kreise alles ein.', 'Handy hingelegt', 'Fäuste geballt – unter dem Tisch', 'lang ausgeatmet', 'Tisch umgeworfen', 'später mit dem Lehrer geredet'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Finn, vier Wochen später', 2, 'search', reden('Was war bei Finn diesmal anders als beim Tisch?')),
    ),
    seite(
      modell(plan, 'die Ampel', ['circle-check', 'alert-triangle', 'hand-stop'], { zeit: '8 Min.', wie: 'alle · dann allein',
        leitung: 'Vorlesen, dann allein verbinden. Kernpunkt: Bei Rot wird nicht geredet – erst runter.',
        fragen: [verbinden('Was gehört in welche Zone? Verbinde.', ['Grün', 'Gelb', 'Rot'], ['raus aus der Situation, zu einem Menschen gehen', 'auftanken: Schlaf, Essen, Leute', 'Warnsignal merken, Skill machen'])],
        danach: [reden('Was ist schwerer: bei Gelb reagieren oder bei Grün auftanken?')] }),
      stimmtDas(plan),
      pause(),
    ),
    seite(
      runde('der Skills-Notruf', '25 Min.', 'alle · am Tisch', 'cards', {
        ziel: 'Üben, schnell den passenden Skill zu finden – je nach Zone.',
        material: 'die 20 Skill-Karten und 9 Notruf-Karten von der nächsten Seite (ausschneiden), ein Würfel',
        schritte: [
          'Jede Person bekommt drei Skill-Karten auf die Hand. Der Rest ist der Stapel.',
          'Ein Notruf wird vorgelesen. Der Würfel sagt die Zone: **1–2 Grün · 3–4 Gelb · 5–6 Rot.**',
          'Alle legen **gleichzeitig** verdeckt die Karte, die jetzt am besten passt. Aufdecken.',
          'Daumen-Abstimmung: Wirkt das in dieser Zone? Wer mag, sagt warum. Gespielte Karte unter den Stapel, eine neue nachziehen.',
        ],
        runden: [
          { t: 'Runde 1 · offen', x: 'Jede Karte zählt, wenn die Gruppe zustimmt.' },
          { t: 'Runde 2 · Rot ist streng', x: 'Bei Rot zählen nur Körper- und Sinnes-Karten, „rausgehen“ und „zu jemandem gehen, dem ich vertraue“. Bei Rot denkt keiner.' },
          { t: 'Runde 3 · mitmachen', x: 'Wer mag, macht seinen Skill eine Minute mit allen. Freiwillig.' },
        ],
        regeln: ['Es gibt keine Punkte. Niemand muss sagen, ob er die Situation kennt.'],
        zu3: 'Die Leitung spielt mit. Jede Person bekommt vier Karten.',
        auswertung: ['Welche Karte hat fast immer gepasst?', 'Welche Karten gingen bei Rot nicht mehr?'],
      }),
      st('Dein Ampelplan zum Falten', '15 Min.', 'allein', 'traffic-lights', 'Faltkarten (ein Blatt, zweimal gefaltet) und Kleber bereitlegen. Stille Arbeit – niemand muss seinen Plan zeigen.',
        text('Nimm drei Skill-Karten aus dem Notruf-Spiel: **eine für Grün, eine für Gelb, eine für Rot.** Kleb sie auf eine Faltkarte und mal die drei Felder grün, gelb und rot aus. Schreib nur eins dazu: **zu wem du bei Rot gehst.**'),
        fragen(null, satz('Bei Rot gehe ich zu (zum Beispiel SePAS, Raum ___):', ''), kreuzU('Probe: Nimm in Gedanken eine Notruf-Karte, die du kennst. Hält dein Plan?', 'ja', 'fast – ich tausche eine Karte', 'nein – ich frage die Leitung'))),
    ),
    seite(
      material('20 Skill-Karten und 9 Notrufe', 6,
        karten(4, 15, 'Die Skill-Karten: zweimal drucken, ausschneiden, mischen, austeilen.', SKILLS.map(([t, marke]) => ({ t, marke }))),
        karten(3, 16, 'Die Notrufe: ausschneiden, mischen, verdeckt stapeln.', NOTRUF.map((t) => ({ t })))),
    ),
    seite(
      schluss(plan, 'Finn und du', [kreuz('Schau auf Station 1: Steht das, was dir am meisten gebracht hat, in deinem Plan?', 'ja', 'nein')], ['gezeigt']),
    ),
  )
  return [s1, s2, s3, s4, s5]
}

/** Lösungen für die Leitung – passend zu den Stationen oben */
export const loesungen: string[][] = [
  [
    'Der Fall: Finn war schon vor dem Satz hoch – 50 oder 70 gelten beide (kein Schlaf, kein Essen, sechste Stunde). Der Griff nach dem Handy war nur der letzte Schritt.',
    'Zonen-Check: Witze = Grün, nur noch kurz antworten = Gelb, nicht mehr hören = Rot. „Ganz still“ ist oft Gelb (manchmal Rot) – stille Leute werden leicht übersehen.',
    'Clip danach: Ja. Ab etwa 70 denkt der Kopf kaum noch mit – das entschuldigt nichts, erklärt aber, warum man vorher handeln muss.',
    'Druck-Tag: In Runde 2 hat die Gruppe meist die wenigsten Rot-Striche, wenn sie die „−“-Karten bei Gelb (ab etwa 50) spielt – zu früh verpufft, zu spät ist man schon bei Rot. Das ist die Botschaft: bei Gelb reagieren, nicht erst bei Rot.',
  ],
  [
    'Puls: In Ruhe meist 70–100 Schläge pro Minute, nach einer Minute Vollgas oft 120–160.',
    'Der Fall: Bein wippt, Hände schwitzen, Film im Kopf. Langes Ausatmen bremst den Körper – der Puls sinkt.',
    'Puls-Labor: Meist sinkt der Puls bei allen drei Bremsen, bei B (4 ein, 8 aus) oft etwas schneller. Wirken alle gleich, ist das ein ehrliches Ergebnis – dann zählt, was sich ruhiger anfühlt. B und C gehen unbemerkt im Unterricht.',
  ],
  [
    'Der Fall: kaltes Wasser, Fliesen gezählt, Cousine angerufen. Das Wasser hat den Kopf ins Jetzt geholt. Wehgetan hat sie sich nicht – stark, aber nicht schädlich.',
    'Reiz gegen Reiz: kaltes Wasser = runter (bei vielen) oder wach, saures Bonbon = wach, ruhige Musik = runter, Faust gegen die Wand = schadet, Duft = runter. Mehrere Antworten sind möglich – nur „schadet“ ist eindeutig.',
    'Sinnes-Labor: kein Richtig oder Falsch. Wichtig ist der Satz: Was die einen beruhigt, nervt die anderen. Bei „Bei Rot hilft nur, was wehtut“ keine Antworten abfragen; wer „stimmt“ ankreuzt, später unter vier Augen ansprechen.',
  ],
  [
    'Elefant und Fall: Wegdrücken macht Gedanken stärker. Geholfen hat, den Kopf zu beschäftigen (rückwärts rechnen).',
    'Drei Wege: ABC und Rückwärtszählen = beschäftigen, Parkschein = parken, jemandem schreiben oder sagen = reden.',
    'Gedanken-Parkplatz: Gut sind kleine, konkrete Zeiten („morgen in der Pause“) und echte Menschen. Was nicht warten kann (Angst um sich oder andere), gehört sofort zu einem Menschen – tagsüber auch an die 116 111, im Notfall 112.',
    'Schluss: Alles außer „wegdrücken“ ist eine gute Antwort.',
  ],
  [
    'Der Fall: Finn hat bei 60 reagiert: Handy hingelegt, Fäuste unter dem Tisch, lang ausgeatmet, später geredet. Anders als in Stunde 1 hat er sein Warnsignal früh gemerkt.',
    'Ampel: Grün – auftanken. Gelb – Warnsignal merken, Skill machen. Rot – raus aus der Situation, zu einem Menschen gehen.',
    'Skills-Notruf: Bei Rot zählen Körper, Sinne, Rausgehen und zu einem Menschen gehen. Kopf-Skills und langes Reden wirken erst wieder bei Gelb.',
  ],
]

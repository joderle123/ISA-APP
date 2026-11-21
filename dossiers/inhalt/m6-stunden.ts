// REAL TALK #06 · ÄRGER – drei Einheiten als zusammenhängende Stunden (16.11.2026).
// Kein Streit wird nachgespielt: Reaktionen werden gelegt, Antworten geschrieben, Handlungen sortiert.
// Stunde 1 beginnt mit einem Versuch an der Linie, Stunde 2 mit dem Schwarm, Stunde 3 mit einer Zeitleiste.
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, clip, fall, fragen, fuerDich, karten, kreuz, kreuzU, material, modell, runde, schluss, seite, st, stimmtDas, stunde, strich, text } from './stunden-hilfe'

const kreis = (f: string, ...l: string[]): Frage => ({ f, kreis: l })

export function stunden(d: Heft): Stunde[] {
  const [hai, alle, zuschauer] = d.tracks

  /* ---------- Stunde 1 · Hai oder Eule ---------- */
  const REAKTIONEN: [string, string][] = [
    ['„So wird es gemacht. Punkt.“', 'Hai'], ['„Wenn du nicht mitmachst, bist du raus.“', 'Hai'], ['lauter werden, bis der andere aufgibt', 'Hai'],
    ['„Mir egal.“', 'Schildkröte'], ['weggehen und nicht mehr antworten', 'Schildkröte'], ['so tun, als wäre nichts', 'Schildkröte'],
    ['„Okay, dann machen wir es wie du.“', 'Chamäleon'], ['„Hauptsache, kein Streit.“', 'Chamäleon'], ['Ja sagen und Nein meinen', 'Chamäleon'],
    ['„Du die Hälfte, ich die Hälfte.“', 'Fuchs'], ['„Heute du, morgen ich.“', 'Fuchs'], ['„Jeder gibt ein bisschen nach.“', 'Fuchs'],
    ['„Was ist dir daran wichtig?“', 'Eule'], ['„Wir suchen etwas, das für beide passt.“', 'Eule'], ['„Ich sage, was ich brauche. Dann du.“', 'Eule'],
  ]
  const s1 = stunde('Wie streitest du – und wie kommst du wieder raus?', ['fünf Arten zu streiten erkennen', 'sagen, welches Tier in dir am stärksten ist', 'die fünf Stufen aus einem Streit heraus ordnen'],
    seite(
      ankommen('du im Streit', kreuz('Was machst du im Streit am ehesten?', 'durchdrücken', 'nachgeben', 'abhauen', 'verhandeln'), kreuz('Muss man einen Streit gewinnen?', 'ja', 'nein', 'kommt darauf an')),
      st('Erst machen: über die Linie', '6 Min.', 'zu zweit · alle gleichzeitig', 'line-dashed', 'Alle Paare gleichzeitig; bei ungerader Zahl spielt die Leitung mit. Die Lösung nicht verraten: Beide gewinnen, wenn sie einfach die Seiten tauschen.',
        text('Stellt euch zu zweit gegenüber an eine Linie, jeder auf seiner Seite. Der Auftrag: **„Du gewinnst, wenn dein Gegenüber in 30 Sekunden auf deiner Seite steht.“** Nur mit Worten, ohne Anfassen. Los.'),
        fragen(null, kreuz('Was habt ihr gemacht?', 'gedroht', 'überredet', 'verhandelt', 'Seiten getauscht'))),
      modell(hai, 'fünf Tiere im Streit', ['fish', 'arrows-exchange', 'bulb'], { intro: 'Jeder hat alle fünf Tiere in sich. Nur verschieden viel.' }),
    ),
    seite(
      fall(hai, 'Finn, Lina und das Plakat', [
        kreuz('Welches Tier ist Finn?', 'Hai', 'Schildkröte', 'Eule'),
        kreuz('Welches Tier ist Lina?', 'Hai', 'Chamäleon', 'Eule'),
        kreuzU('Wer hat diesen Streit gebaut?', 'beide: Finn drückt durch, Lina gibt nach und sammelt Wut', 'nur Finn', 'nur Lina'),
      ]),
      clip(hai, 'Wie ein Streit größer wird', [kreuzU('Wie wird aus einem kleinen Streit ein großer?', 'Stufe für Stufe', 'auf einen Schlag', 'gar nicht')], ['So fängt es an:', 'So endet es, wenn niemand stoppt:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Wann hätten Finn und Lina am leichtesten stoppen können?', 'beim ersten „Können wir nicht …?“', 'am Tag der Abgabe')]),
    ),
    seite(
      runde('Tiere und Treppe', '25 Min.', 'zwei Teams · am Tisch', 'cards', {
        ziel: 'Reaktionen im Streit erkennen – und den Weg aus dem Streit heraus bauen.',
        material: 'die fünf Tier-Karten, 15 Reaktions-Karten und fünf Stufen von der nächsten Seite (ausschneiden)',
        schritte: [
          '**Teil 1 · Tiere:** Die fünf Tiere liegen auf dem Tisch. Reihum eine Reaktion ziehen, vorlesen und zum passenden Tier legen. Richtig: 1 Punkt.',
          '**Teil 2 · Treppe raus:** Diese Treppe führt aus dem Streit heraus – andersherum als im Clip. Jedes Team legt die fünf Stufen: Was kommt zuerst? Dann löst die Leitung auf (Karte „Konflikt-Treppe“). Richtig: 3 Punkte.',
          '**Teil 3 · Eule gesucht:** Die Leitung liest einen Streit vor. Jedes Team schreibt den ersten Satz, den die Eule sagen würde. Passt er zur Eule? 2 Punkte.',
        ],
        regeln: ['Kein Streit wird nachgespielt. Es wird gelegt, geschrieben und vorgelesen.'],
        zu3: 'Ein Team. Teil 2 auf Zeit, Teil 3 gemeinsam mit der Leitung.',
        wertung: { kopf: ['Punkte', 'Tiere', 'Treppe', 'Eule', 'Summe'], zeilen: ['Team A', 'Team B'] },
        auswertung: ['Welches Tier hatte bei euch die meisten Karten, die ihr von euch kennt?', 'Welche Stufe der Treppe wird am häufigsten übersprungen?'],
      }, { leitung: 'Streit für Teil 3: „Zwei wollen denselben Platz.“ · „Einer hat das Ladekabel des anderen genommen.“ · „Zwei wollen verschiedene Musik.“' }),
      fuerDich('Wie viel Tier steckt in mir?', '8 Min.', fragen(hai.moves[0].kontext ?? null, hai.moves[0].fragen[0])),
    ),
    seite(
      material('5 Tiere, 15 Reaktionen, 5 Stufen', 6,
        karten(5, 15, 'Die Tiere: ausschneiden und auf den Tisch legen.', ['Hai', 'Schildkröte', 'Chamäleon', 'Fuchs', 'Eule'].map((t) => ({ t })), true),
        karten(3, 15, 'Die Reaktionen: ausschneiden, mischen, verdeckt stapeln.', [...REAKTIONEN].sort((a, b) => a[0].length - b[0].length).map(([t]) => ({ t }))),
        karten(5, 15, 'Die Stufen: ausschneiden und mischen.', ['zuhören und zusammenfassen', 'einigen', 'Stopp und runterkommen', 'Lösungen sammeln', 'Ich-Satz sagen'].map((t) => ({ t })))),
      schluss(hai, 'Finn und Lina, zweiter Versuch', [kreuzU('Lina sagt zum ersten Mal: „Können wir nicht …?“ Was würde die Eule in Finn antworten?', '„Was ist dir daran wichtig?“', '„Nee, so ist besser.“'), kreuz('Schau auf Station 1: Muss man einen Streit gewinnen?', 'ja', 'nein', 'kommt darauf an')], ['beobachtet']),
    ),
  )

  /* ---------- Stunde 2 · Alle machen mit ---------- */
  const DRAENGEL = ['„Komm, nur einmal.“', '„Alle machen mit.“', '„Sei kein Spielverderber.“', '„Hast du Schiss?“', '„Merkt doch keiner.“', '„Ich dachte, wir sind Freunde.“', '„Dann bist du raus.“', '„Stell dich nicht so an.“', '„Nur ganz kurz.“']
  const s2 = stunde('Warum machst du mit, obwohl du nicht willst?', ['erklären, warum Gruppen so stark ziehen', 'vier Arten nennen, Nein zu sagen', 'ein Nein finden, das zu dir passt'],
    seite(
      ankommen('du und die Gruppe', kreuz('Hast du schon mal mitgemacht, obwohl du nicht wolltest?', 'ja', 'nein', 'weiß nicht'), strich('Wie leicht sagst du Nein, wenn alle Ja sagen?', 'schwer', 'leicht')),
      st('Erst machen: der Schwarm', '5 Min.', 'alle', 'users-group', 'Sie gehen mit. Kein Wort. Nach zwei Minuten stoppen und fragen: Wer hat gelenkt?',
        text('Alle gehen kreuz und quer durch den Raum. Kein Wort. Einzige Regel: **Bleibt jemand stehen, bleiben alle stehen. Geht jemand los, gehen alle.** Niemand ist Chef.'),
        fragen(null, kreuz('Wer hat den Schwarm gelenkt?', 'eine Person', 'mehrere', 'niemand', 'keine Ahnung'))),
      fall(alle, 'Ben und die Kopfhörer', [
        kreuzU('Zwingt jemand Ben?', 'Nein. Aber alle schauen.', 'Ja.'),
        kreuzU('Wovor hat Ben in diesem Moment mehr Angst?', 'ausgelacht zu werden', 'erwischt zu werden'),
      ]),
    ),
    seite(
      clip(alle, 'der Linien-Test', [kreuzU('Alle in der Gruppe sagen etwas Falsches. Was machst du?', 'Ich sage, was ich sehe.', 'Ich sage, was alle sagen.', 'weiß nicht')], ['Das passiert im Test:', 'So viele machen mit:'],
        [kreuz('Hättest du gedacht, dass so viele mitmachen?', 'ja', 'nein'), kreuzU('Was hat im Test geholfen, bei der eigenen Antwort zu bleiben?', 'eine zweite Person, die auch Nein sagt', 'nichts')]),
      modell(alle, 'warum die Gruppe zieht', ['users-group', 'flame', 'user-check'], { zeit: '8 Min.' }),
      st('Zu zweit: Bens drei Sekunden', '8 Min.', 'zu zweit', 'clock', 'Jedes Paar füllt nur zwei Zeilen aus, den Rest mündlich. Auch „mitmachen“ bringt etwas (dazugehören) – das darf gesagt werden. Der Preis ist nur höher.',
        fragen(alle.moves[1].kontext ?? null, ...alle.moves[1].fragen)),
    ),
    seite(
      runde('der Nein-Baukasten', '25 Min.', 'zwei Teams · am Tisch', 'tool', {
        ziel: 'Ein Nein finden, das hält – und das zu dir passt.',
        material: 'die vier Nein-Arten und 9 Drängel-Karten von der nächsten Seite (ausschneiden), ein Würfel, Papier, Stifte',
        schritte: [
          'Eine Drängel-Karte wird aufgedeckt. Der Würfel sagt die Nein-Art: **1** Dauerschleife · **2** Nein plus Vorschlag · **3** mit Humor · **4** einfach gehen · **5–6** freie Wahl.',
          'Jedes Team schreibt in 40 Sekunden seine Antwort auf. Bei „gehen“: den Satz, den ihr beim Gehen sagt.',
          'Vorlesen. Das andere Team zeigt mit den Fingern, von 1 bis 5: Hält das?',
          'Ab der zweiten Karte drängelt die Leitung einmal nach: Sie liest die nächste Drängel-Karte vor. Hält euer Satz immer noch?',
        ],
        regeln: ['Die Antworten werden geschrieben und vorgelesen. Niemand muss die Szene spielen.', 'Kein Nein muss begründet werden.'],
        zu3: 'Ein Team schreibt, die Leitung drängelt nach und zeigt die Zahl.',
        notiz: { titel: 'Das Nein, das zu mir passt:', linien: 1 },
        auswertung: ['Welche Nein-Art hat am besten gehalten?', 'Was passiert bei echten Freunden nach deinem Nein?'],
      }, { leitung: 'Nur Sie drängeln – freundlich und hartnäckig. Ein Nein wird nie abgewertet.' }),
      fuerDich('Wie weit raus?', '6 Min.', fragen(alle.moves[0].kontext ?? null, ...alle.moves[0].fragen)),
    ),
    seite(
      material('4 Nein-Arten und 9 Drängel-Karten', 6,
        karten(4, 24, 'Die vier Nein-Arten: ausschneiden und auf den Tisch legen.', [
          { t: 'Dauerschleife', x: 'Denselben Satz ruhig wiederholen: „Nein. Mach ich nicht.“', marke: '1' },
          { t: 'Nein plus Vorschlag', x: '„Nee. Aber lass uns …“', marke: '2' },
          { t: 'Mit Humor', x: 'Ein Spruch, der nicht verletzt.', marke: '3' },
          { t: 'Einfach gehen', x: 'Ein kurzer Satz – und weg.', marke: '4' },
        ]),
        karten(3, 17, 'Die Drängel-Karten: ausschneiden, mischen, verdeckt stapeln.', DRAENGEL.map((t) => ({ t })))),
      schluss(alle, 'Bens drei Sekunden', [kreuzU('„Na los. Oder hast du Schiss?“ Welches Nein hätte zu Ben gepasst?', '„Nee. Mach ich nicht.“ – und wiederholen', 'ein Witz – und bleiben', 'gehen'), strich('Schau auf Station 1. Wie leicht sagst du jetzt Nein, wenn alle Ja sagen?', 'schwer', 'leicht')], ['Nein gesagt']),
    ),
  )

  /* ---------- Stunde 3 · Zuschauer ---------- */
  const TUN: [string, string][] = [['mitlachen', '+'], ['weiterleiten', '+'], ['ein Herz unter den Clip setzen', '+'], ['wegschauen', '+'], ['filmen', '+'],
    ['nichts weiterleiten', '−'], ['der Person schreiben: „Alles okay bei dir?“', '−'], ['sich in der Kantine dazusetzen', '−'], ['einem Erwachsenen Bescheid sagen', '−'], ['Beweise sichern und melden', '−'], ['„Lass gut sein.“ sagen', '−'], ['andere dazuholen', '−']]
  const s3 = stunde('Was hat das Publikum damit zu tun?', ['Spaß, Streit und Mobbing unterscheiden', 'erklären, warum Zuschauer entscheiden', 'einen Schritt nennen, den du gehen kannst'],
    seite(
      ankommen('ein Klick', kreuz('Ist Weiterleiten „etwas machen“?', 'ja', 'nein', 'kommt darauf an'), kreuz('Jemand wird fertiggemacht. Was ist am schwersten?', 'nicht mitlachen', 'etwas sagen', 'Hilfe holen')),
      fall(zuschauer, 'Noah und der Clip', [
        kreuzU('Welche Rolle spielt Noah?', 'Verstärker: Er gibt dem Clip mehr Publikum.', 'Täter: Er hat den Clip gemacht.', 'Er hat nichts damit zu tun.'),
        kreuzU('Noah hat „nur einmal geklickt“. Was hat der Klick gemacht?', 'Zwei Gruppen mehr haben Lea ausgelacht.', 'nichts'),
      ], { zeitleiste: [['Freitag', 'Der Clip. Noah leitet ihn weiter: zwei Gruppen, ein Klick.'], ['Montag', 'Lea sitzt nicht in der Kantine.'], ['Dienstag', 'Lea sitzt nicht in der Kantine.'], ['Mittwoch', 'Lea auf der Treppe. Allein. Mit dem Brot in der Hand.']] }),
    ),
    seite(
      modell(zuschauer, 'die Bühne', ['list-check', 'theater', 'eye']),
      clip(zuschauer, 'Warum viele nicht eingreifen', [kreuzU('Viele sehen zu und tun nichts. Warum?', 'Jeder denkt: Ein anderer macht schon was.', 'Es ist ihnen egal.', 'weiß nicht')], ['Darum greifen viele nicht ein:', 'Das hilft:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Was hätte Lea am Montag geholfen?', 'eine Nachricht: „Alles okay bei dir?“', 'noch ein Clip', 'nichts')]),
      fuerDich('Spaß, Streit oder Mobbing?', '8 Min.', fragen(null, ...zuschauer.moves[0].fragen)),
    ),
    seite(
      runde('Kipp die Bühne', '25 Min.', 'alle · am Tisch', 'theater', {
        ziel: 'Sehen, was die Bühne größer macht – und was sie kleiner macht.',
        material: 'die 12 Karten von der nächsten Seite (ausschneiden), zwei Zettel „macht die Bühne größer“ und „macht die Bühne kleiner“',
        schritte: [
          '**Teil 1 · sortieren:** Reihum eine Karte ziehen, vorlesen und zu „größer“ oder „kleiner“ legen. Die Gruppe sagt, ob es passt.',
          '**Teil 2 · die Leiter:** Legt alle „kleiner“-Karten in eine Reihe – vom Einfachen zum Mutigen.',
          '**Teil 3 · der Fall:** Die Leitung liest einen Fall vor. Auf „drei“ tippt jede Person auf die Karte, die sie wählen würde.',
          'Zählt: Wie viele Karten nehmen dem Clip das Publikum – ohne dass jemand „Stopp“ rufen muss?',
        ],
        regeln: ['Niemand muss sagen, was er selbst schon getan oder gelassen hat.', 'Direkt „Stopp“ sagen ist nur eine Möglichkeit – und nur, wenn es sicher ist.'],
        zu3: 'Genau so. Die Leitung tippt in Teil 3 mit.',
        notiz: { titel: 'Die einfachste Karte, die schon etwas ändert:', linien: 1 },
        auswertung: ['Welche Karte lag ganz unten auf der Leiter – und würde trotzdem etwas ändern?', 'Was passiert mit der Bühne, wenn drei Leute nicht mehr lachen?'],
      }, { leitung: 'Fälle für Teil 3: Noah und der Clip · „Über Samuels Schuhe gibt es täglich einen Witz.“ · „Eine Gruppe macht Geräusche, sobald Elias etwas sagt.“' }),
      st('Zum Abschluss: eine Runde Respekt', '6 Min.', 'alle · im Kreis', 'heart-handshake', 'Sie beginnen und schreiben mit. Fällt jemandem nichts ein, helfen Sie – niemand bleibt ohne Zettel.',
        text('Jede Person schreibt der Person rechts neben sich **eine Sache, die sie im Kurs gut gemacht hat**, auf einen Zettel. Konkret. Wer mag, liest vor. Die Person sagt nur: „Danke.“')),
    ),
    seite(
      material('12 Karten', 5, karten(3, 18, 'Ausschneiden, mischen, verdeckt stapeln.', [...TUN].sort((a, b) => a[0].length - b[0].length).map(([t]) => ({ t })))),
      fuerDich('die Leiter', '8 Min.', fragen(null, ...zuschauer.moves[1].fragen)),
      schluss(zuschauer, 'Mittwoch auf der Treppe', [kreuzU('Noah sieht Lea auf der Treppe. Was kann er jetzt noch tun?', 'hingehen: „Das mit dem Clip war mies. Tut mir leid.“', 'so tun, als wäre nichts'), kreuz('Schau auf Station 1: Ist Weiterleiten „etwas machen“?', 'ja', 'nein')], ['gezeigt']),
    ),
  )
  return [s1, s2, s3]
}

/** Lösungen für die Leitung – passend zu den Stationen oben */
export const loesungen: string[][] = [
  [
    'Über die Linie: Beide gewinnen, wenn sie die Seiten tauschen. Fast niemand kommt darauf – „gewinnen“ klingt nach „gegeneinander“.',
    'Der Fall: Finn ist der Hai, Lina das Chamäleon. Gebaut haben den Streit beide.',
    'Tiere: Hai – „So wird es gemacht“, „bist du raus“, lauter werden · Schildkröte – „Mir egal“, weggehen, so tun als wäre nichts · Chamäleon – „wie du“, „Hauptsache kein Streit“, Ja sagen und Nein meinen · Fuchs – Hälfte, „heute du, morgen ich“, nachgeben · Eule – die drei Fragen und Angebote.',
    'Treppe: 1 Stopp und runterkommen · 2 Ich-Satz sagen · 3 zuhören und zusammenfassen · 4 Lösungen sammeln · 5 einigen.',
  ],
  [
    'Der Fall: Niemand zwingt Ben – aber alle schauen. Er hat mehr Angst, ausgelacht zu werden, als erwischt zu werden.',
    'Clip: Im Linien-Test machen drei von vier Leuten mindestens einmal mit. Geholfen hat eine zweite Person, die auch Nein sagt.',
    'Bens drei Sekunden: Mitmachen bringt Dazugehören und kostet die Anzeige und den Praktikumsplatz. „Nee, mach ich nicht“ kostet einen Moment Spott und bringt Respekt vor sich selbst.',
    'Nein-Baukasten: Die Dauerschleife hält oft am besten. Humor wirkt nur, wenn er niemanden verletzt.',
  ],
  [
    'Der Fall: Noah ist Verstärker. Sein Klick hat dem Clip zwei Gruppen Publikum gegeben.',
    'Spaß, Streit oder Mobbing: 1 Spaß · 2 Streit · 3 Mobbing · 4 Mobbing (er lacht mit und geht allein). Merkmale: wiederholt, absichtlich, mehrere gegen einen, wehrlos – „laut“ gehört nicht dazu.',
    'Kipp die Bühne: größer – mitlachen, weiterleiten, Herz setzen, wegschauen, filmen. Alles andere macht sie kleiner.',
    'Schluss: Hingehen und sich entschuldigen. Es ist nie zu spät.',
  ],
]

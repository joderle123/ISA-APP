// REAL TALK #06 · ÄRGER – drei Stunden (Umbau 27.11.2026 nach fünf jugendlichen Kritikern).
// Kein Streit wird nachgespielt, niemand liest vor der Gruppe vor: Es wird gelegt, verdeckt gewählt und gleichzeitig aufgedeckt.
// Stunde 1: Streit in Zeitlupe – die Plakat-Geschichte als Karten, an jeder Stopp-Stelle ein Eulen-Satz (ohne Glasl-Clip,
// ohne Treppe mit Fachwörtern, ohne zweiten Ich-Satz). Stunde 2: Nein-Karten – verdeckt legen, gleichzeitig aufdecken,
// „Einer reicht“ (statt 40 Sekunden schreiben und vorlesen). Stunde 3: der Klassenchat in Zeitlupe – Münzen zeigen,
// wie jeder Klick die Bühne für Lea größer oder kleiner macht. Alle Figuren sind 12–13.
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, beispiel, clip, fall, fragen, karten, kennstDu, kreuz, kreuzU, material, raster, reden, runde, satz, schluss, seite, st, strich, stunde, text, weiter, pause } from './stunden-hilfe'

const kreis = (f: string, ...l: string[]): Frage => ({ f, kreis: l })

export function stunden(d: Heft): Stunde[] {
  const [hai, alle, zuschauer] = d.tracks
  delete hai.clip

  /* ---------- Stunde 1 · Streit in Zeitlupe ---------- */
  const TIERE: [string, string][] = [['Hai', 'drückt durch'], ['Schildkröte', 'zieht sich zurück'], ['Chamäleon', 'gibt nach'], ['Fuchs', 'handelt'], ['Eule', 'sucht etwas für beide']]
  const PLAKAT = ['Woche 1 · Lina: „Können wir nicht die Fotos groß machen?“', 'Woche 1 · Finn: „Nee, so ist besser.“', 'Woche 2 · Lina: „Können wir nicht noch Farbe …?“', 'Woche 2 · Finn: „Nee. Vertrau mir.“', 'Woche 3 · Lina: „Können wir nicht …?“', 'Woche 3 · Finn: „Nee, so ist besser.“ – Lina: „Mach halt.“', 'Abgabe · Finn: „Wo ist dein Teil?“', 'Abgabe · Lina lächelt: „Hab ich vergessen.“']
  const EULE = ['„Was ist dir daran wichtig?“', '„Beides aufs Plakat?“', '„Du die Überschrift, ich die Bilder?“', '„Ich bin sauer. Kurz Pause.“', '„Sag du zuerst.“', '„Was wäre für dich okay?“']
  const s1 = stunde('Wie streitest du – und wo kippt ein Streit?', ['fünf Arten zu streiten erkennen', 'die Stelle finden, an der ein Streit kippt', 'einen Eulen-Satz wählen'],
    seite(
      ankommen('du im Streit', kreuz('Was machst du im Streit am ehesten?', 'durchdrücken', 'nachgeben', 'abhauen', 'verhandeln'), kreuz('Muss man einen Streit gewinnen?', 'ja', 'nein', 'kommt darauf an')),
      st('Erst machen: über die Linie', '8 Min.', 'zu zweit · alle gleichzeitig', 'line-dashed', 'Alle Paare gleichzeitig; bei ungerader Zahl spielt die Leitung mit. Die Lösung nicht verraten: Beide gewinnen, wenn sie einfach die Seiten tauschen. Danach auflösen.',
        text('Stellt euch zu zweit gegenüber an eine Linie, jeder auf seiner Seite. Der Auftrag: **„Du gewinnst, wenn dein Gegenüber in 30 Sekunden auf deiner Seite steht.“** Nur mit Worten, ohne Anfassen. Los.'),
        fragen(null, kreuz('Was habt ihr gemacht?', 'gedroht', 'überredet', 'verhandelt', 'Seiten getauscht'))),
      st('Fünf Tiere', '10 Min.', 'alle gleichzeitig', 'paw', 'Die Tier-Karten (Kopiervorlage) vorher ausschneiden und in die Mitte legen. Vorlesen: „Mir egal.“ · „Was ist dir daran wichtig?“ · „So wird es gemacht. Punkt.“ · „Du die Hälfte, ich die Hälfte.“ · „Hauptsache, kein Streit.“ Alle tippen gleichzeitig auf ein Tier. Der Tier-Check unten bleibt privat.',
        text('Jeder hat alle fünf Tiere in sich – nur verschieden viel. Die Leitung liest eine Reaktion vor, zum Beispiel **„Mir egal.“** oder **„Was ist dir daran wichtig?“**. Auf „drei“ tippen alle auf das Tier, das passt.'),
        fragen(null, raster('Wie viel davon steckt in dir? Nur für dich.', ['viel', 'mittel', 'wenig'], ...TIERE.map(([t, x]) => `${t} – ${x}`)))),
    ),
    seite(
      fall(hai, 'Finn, Lina und das Plakat', [
        kreuzU('Wer hat diesen Streit gebaut?', 'beide: Finn drückt durch, Lina gibt nach und sammelt Wut', 'nur Finn', 'nur Lina'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Finn, Lina und das Plakat', 4, 'search', reden('Was macht ihr öfter: durchdrücken oder nachgeben – und was kommt danach?')),
      pause(),
    ),
    seite(
      runde('Streit in Zeitlupe', '35 Min.', 'alle · am Tisch', 'player-pause', {
        ziel: 'Einen Streit Bild für Bild anschauen – und die Stellen finden, an denen man ihn hätte stoppen können.',
        material: 'die 8 Sprechblasen-Karten, 5 Tier-Karten, je Person eine Stopp-Karte und die 6 Eulen-Karten von der nächsten Seite (ausschneiden)',
        schritte: [
          '**Legen:** Legt die acht Sprechblasen der Plakat-Geschichte der Reihe nach hin – von Woche 1 bis zur Abgabe.',
          '**Tiere:** Legt den Hai zu Finns erster Blase und das Chamäleon zu Linas erster Blase. Welches Tier fehlt in der ganzen Geschichte?',
          '**Stopp:** Jede Person legt ihre Stopp-Karte **verdeckt** an die Stelle, an der sie den Streit gestoppt hätte. Auf „drei“ decken alle auf.',
          '**Eule:** An jede Stopp-Stelle kommt eine Eulen-Karte: Was hätte man dort sagen können?',
        ],
        regeln: ['Je früher, desto billiger.', 'Keine Punkte. Niemand spielt den Streit nach.'],
        zu3: 'Die Leitung legt auch eine Stopp-Karte.',
        notiz: { titel: 'Hier hätten wir gestoppt – und das hätte die Eule gesagt:', linien: 1 },
        auswertung: ['Warum hat Lina beim ersten Mal nicht gestoppt?', 'Welche Stopp-Stelle war am frühesten – und warum ist früh billiger?'],
      }, { leitung: 'Sagen Sie: „Je früher, desto billiger.“ Lina ist nicht schuld, weil sie nachgibt – aber Nachgeben sammelt Wut.',
        danach: [beispiel('So sieht eine Runde aus', ['', 'Drei Stopp-Karten liegen bei Montag, eine bei der Abgabe.'], ['Sara:', 'Montag hätte Finn fragen können: „Was ist dir daran wichtig?“'], ['Ben:', 'Und Lina hätte am Mittwoch sagen können: „Ich bin sauer. Kurz Pause.“'])] }),
    ),
    seite(
      { ...material('8 Sprechblasen, 5 Tiere, Stopp- und Eulen-Karten', 6,
        karten(2, 12, 'Die Plakat-Geschichte: ausschneiden und mischen.', PLAKAT.map((t) => ({ t }))),
        karten(5, 14, 'Die Tiere: ausschneiden.', TIERE.map(([t, x]) => ({ t, x }))),
        karten(3, 12, 'Die Eulen-Karten: ausschneiden.', EULE.map((t) => ({ t }))),
        karten(5, 10, 'Die Stopp-Karten: eine pro Person.', [1, 2, 3, 4, 5].map(() => ({ t: 'STOPP' })), true)), wie: 'zu Station 3 und 6' },
      schluss(hai, 'deine Eule', [strich('Wie früh stoppst du einen Streit? Nur für dich.', 'spät', 'früh'), kreuz('Schau auf Station 1: Muss man einen Streit gewinnen?', 'ja', 'nein', 'kommt darauf an')], ['gestoppt']),
    ),
  )

  /* ---------- Stunde 2 · Nein-Karten ---------- */
  const DRAENGEL = ['„Komm, nur einmal.“', '„Alle machen mit.“', '„Sei kein Spielverderber.“', '„Hast du Schiss?“', '„Merkt doch keiner.“', '„Ich dachte, wir sind Freunde.“', '„Dann bist du raus.“', '„Stell dich nicht so an.“', '„Nur ganz kurz.“']
  const NEIN = ['„Nee.“', '„Ohne mich.“', '„Kein Bock.“', '„Nee – lass uns lieber Pizza holen.“', '„Meine Mutter killt mich.“', '„Hab gleich Training.“', '„Ich geh jetzt.“', '„Nee. Echt nicht.“', '„Würd ich nie machen.“', '„Langweilig.“', '„Nö.“', '„Bin raus.“', '„Mach du, ich nicht.“', '„Ich warte draußen.“', '„Keine Zeit.“', '„Nee, das ist mir zu blöd.“', '________', '________', '________', '________']
  const s2 = stunde('Warum machst du mit, obwohl du nicht willst?', ['erklären, warum die Gruppe so stark zieht', 'ein Nein wählen, das zu dir passt', 'wissen: Einer reicht'],
    seite(
      ankommen('du und die Gruppe', kreuz('Hast du schon mal mitgemacht, obwohl du nicht wolltest?', 'ja', 'nein', 'weiß nicht'), strich('Wie leicht sagst du Nein, wenn alle Ja sagen?', 'schwer', 'leicht')),
      st('Erst machen: der Schwarm', '6 Min.', 'alle', 'users-group', 'Sie gehen mit. Kein Wort. Nach zwei Minuten stoppen und fragen: Wer hat gelenkt?',
        text('Alle gehen kreuz und quer durch den Raum. Kein Wort. Einzige Regel: **Bleibt jemand stehen, bleiben alle stehen. Geht jemand los, gehen alle.** Niemand bestimmt.'),
        fragen(null, kreuz('Wer hat den Schwarm gelenkt?', 'eine Person', 'mehrere', 'niemand', 'keine Ahnung'))),
      fall(alle, 'Ben und die Kopfhörer', [
        kreuzU('Wovor hat Ben in diesem Moment mehr Angst?', 'ausgelacht zu werden', 'erwischt zu werden'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Ben und die Kopfhörer', 3, 'search', reden('Was macht es so schwer, in so einem Moment einfach zu gehen?')),
    ),
    seite(
      clip(alle, 'der Linien-Test', [kreuzU('Alle in der Gruppe sagen etwas Falsches. Was machst du?', 'Ich sage, was ich sehe.', 'Ich sage, was alle sagen.', 'weiß nicht')], ['Das passiert im Test:', 'Das hilft der Versuchsperson:'],
        [kreuzU('Was macht es leichter, bei der eigenen Antwort zu bleiben?', 'wenn noch jemand dasselbe sagt', 'wenn man leiser spricht', 'nichts')]),
      pause(),
    ),
    seite(
      runde('Nein-Karten', '32 Min.', 'alle · am Tisch', 'cards', {
        ziel: 'Ein Nein finden, das zu dir passt – und erleben, dass das zweite Nein leichter ist.',
        material: 'die 9 Drängel-Karten und 20 Nein-Karten von der nächsten Seite (ausschneiden)',
        schritte: [
          'Jede Person bekommt **vier Nein-Karten** auf die Hand. Leere Karten darf man selbst beschriften.',
          'Die Leitung liest eine Drängel-Karte an alle. Alle legen **verdeckt** ein Nein. Auf „drei“ decken alle auf.',
          'Die Leitung drängelt nach – mit der nächsten Karte. Wer seine Karte liegen lässt, **hält.** Wer will, tauscht.',
          '**Teil 2 · Einer reicht:** Eine Person legt freiwillig ihr Nein **offen** hin. Danach dürfen die anderen eins dazulegen. Wie war das?',
        ],
        regeln: ['Ausreden sind erlaubt. Niemand liest vor – die Karte spricht für euch.', 'Kein Nein muss begründet werden. Keine Punkte.'],
        zu3: 'Die Leitung drängelt.',
        notiz: { titel: 'Das Nein, das zu mir passt:', linien: 1 },
        auswertung: ['War das zweite Nein leichter als das erste?', 'Welche Karte hat am längsten gehalten?'],
      }, { leitung: 'Nur Sie drängeln – freundlich und hartnäckig. Sagen Sie: „Die Karte spricht für euch.“ Ein Nein wird nie abgewertet.',
        danach: [beispiel('So sieht eine Runde aus', ['Leitung:', '„Hast du Schiss?“'], ['', 'Alle legen verdeckt. Aufgedeckt: „Nee.“, „Hab gleich Training.“, „Ohne mich.“'], ['Leitung drängelt:', '„Ich dachte, wir sind Freunde.“'], ['', 'Zwei lassen liegen, Finn tauscht gegen „Ich geh jetzt.“'])] }),
    ),
    seite(
      material('9 Drängel-Karten und 20 Nein-Karten', 6,
        karten(3, 13, 'Die Drängel-Karten: ausschneiden, mischen, verdeckt stapeln.', DRAENGEL.map((t) => ({ t }))),
        karten(4, 13, 'Die Nein-Karten: ausschneiden, mischen, vier pro Person.', NEIN.map((t) => ({ t })))),
      schluss(alle, 'Bens drei Sekunden', [
        kreuz('Wo könnte dich jemand drängeln? Nur für dich.', 'Pause', 'Bus', 'draußen', 'online', 'beim Zocken'),
        strich('Schau auf Station 1. Wie leicht sagst du jetzt Nein, wenn alle Ja sagen?', 'schwer', 'leicht'),
      ], ['gesagt']),
    ),
  )

  /* ---------- Stunde 3 · Der Klassenchat in Zeitlupe ---------- */
  const HANDLUNG = ['😂 reagieren', 'weiterleiten', 'nichts tun', 'Lea privat: „Fand das nicht lustig. Alles ok?“', 'in die Gruppe: „Lösch das.“', 'einem Erwachsenen zeigen']
  const ZEIT = ['Fr 17:02 · Der Clip von Lea ist im Klassenchat.', 'Fr 17:03 · Drei 😂 darunter.', 'Fr 17:10 · Jemand: „Schickt das der 7b!“', 'Mo · Lea fehlt in der Kantine.', 'Mi · Lea sitzt allein auf der Treppe.']
  const s3 = stunde('Was hat das Publikum damit zu tun?', ['Spaß, Streit und Mobbing unterscheiden', 'sehen, wie jeder Klick die Bühne größer oder kleiner macht', 'die kleinste Karte kennen, die du wirklich spielen würdest'],
    seite(
      ankommen('ein Klick', kreuz('Ist Weiterleiten „etwas machen“?', 'ja', 'nein', 'kommt darauf an'), kreuz('Jemand wird fertiggemacht. Was ist am schwersten?', 'nicht mitlachen', 'etwas sagen', 'Hilfe holen')),
      fall(zuschauer, 'Noah und der Clip', [
        kreuzU('Noah hat „nur einmal geklickt“. Was hat der Klick gemacht?', 'Zwei Gruppen mehr haben Lea ausgelacht.', 'nichts'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Noah und der Clip', 2, 'search', reden('Warum leiten Leute so etwas weiter – auch wenn sie es nicht gut finden?')),
    ),
    seite(
      st('Spaß, Streit oder Mobbing?', '10 Min.', 'alle · dann allein', 'list-check', 'Die vier Merkmale vorlesen: wiederholt · absichtlich · ungleich · kann sich allein nicht wehren. Dann allein ankreuzen und auflösen.',
        text('Mobbing hat vier Merkmale: Es passiert **immer wieder**, **mit Absicht**, **einer oder mehrere gegen einen, der schwächer ist**, und die Person **kann sich allein nicht wehren.**'),
        fragen(null, ...zuschauer.moves[0].fragen.filter((f) => !/Merkmal/.test(f.f)))),
      clip(zuschauer, 'Warum viele nicht eingreifen', [kreuzU('Viele sehen zu und tun nichts. Warum?', 'Jeder denkt: Ein anderer macht schon was.', 'Es ist ihnen egal.', 'weiß nicht')], ['Darum greifen viele nicht ein:', 'Das hilft:'],
        [kreuzU('Was hätte Lea am Montag geholfen?', 'eine Nachricht: „Alles okay bei dir?“', 'ein Like unter dem Clip', 'nichts')]),
      pause(),
    ),
    seite(
      runde('der Klassenchat in Zeitlupe', '30 Min.', 'alle · am Tisch', 'messages', {
        ziel: 'Sehen, wie jeder Klick die Bühne für Lea größer oder kleiner macht – und welche Karte du wirklich spielen würdest.',
        material: 'eine Lea-Karte, 40 Büroklammern (das Publikum) und die 5 Zeit-Karten von der nächsten Seite, je Person ein Radiergummi als Zeiger',
        schritte: [
          'Die Lea-Karte liegt in der Mitte. Daneben liegen **10 Büroklammern** – so viele schauen am Anfang zu.',
          'Die Leitung liest eine Zeit-Karte vor. Jede Person legt ihren Radiergummi **verdeckt** (Hand drüber) auf eine Handlung in ihrem Heft – unten auf dieser Seite. Auf „drei“ heben alle die Hand.',
          'Für jedes 😂 und jedes Weiterleiten legt die Leitung **eine Büroklammer** zu Lea. Für jede Hilfe nimmt sie **eine weg.** „Nichts tun“ ändert nichts.',
          'Fünf Zeit-Karten, von Freitag 17:02 bis Mittwoch. Wie viele Büroklammern liegen am Ende bei Lea?',
        ],
        regeln: ['Es gibt keine Heldenkarte. Die kleinste Hilfe nimmt auch eine Büroklammer weg.', 'Niemand muss sagen, was er selbst schon getan hat. Keine Punkte.'],
        zu3: 'Die Leitung legt mit.',
        notiz: { titel: 'Die kleinste Hilfe, die ich wirklich machen würde:', linien: 1 },
        auswertung: ['Welche Karte würdest du am Freitag um 17:03 wirklich spielen?', 'Was kostet dich „Lösch das“ – und was bringt es Lea?'],
      }, { leitung: 'Sagen Sie: „Es gibt keine Heldenkarte. Die kleinste Hilfe nimmt auch eine Büroklammer weg.“ Nach Mittwoch fragen: „Was kostet dich ‚Lösch das‘?“',
        danach: [fragen(null, kreuz('Meine Handlung – Radiergummi verdeckt drauf:', ...HANDLUNG)), beispiel('So sieht eine Runde aus', ['Leitung:', '„Fr 17:03 · Drei 😂 darunter.“'], ['', 'Aufgedeckt: zweimal „nichts tun“, einmal 😂, einmal „Lea privat“.'], ['', 'Plus 1 für das 😂, minus 1 für die Nachricht an Lea. Es bleiben 10 Büroklammern.'])] }),
    ),
    seite(
      material('Lea-Karte und 5 Zeit-Karten', 6,
        karten(3, 13, 'Lea und die Zeit-Karten: ausschneiden.', [{ t: 'LEA', x: 'Hier liegt das Publikum.' }, ...ZEIT.map((t) => ({ t }))])),
      schluss(zuschauer, 'Mittwoch auf der Treppe', [
        kreuzU('Noah sieht Lea auf der Treppe. Was kann er jetzt noch tun?', 'hingehen: „Das mit dem Clip war mies. Tut mir leid.“', 'so tun, als wäre nichts'),
        kreuz('Was könntest du diese Woche tun? Nur für dich.', 'jemanden grüßen', 'einen Platz frei machen', 'eine Nachricht schreiben', 'noch nichts'),
      ], ['gezeigt']),
    ),
  )
  return [s1, s2, s3]
}

/** Lösungen für die Leitung – passend zu den Stationen oben (Umbau 27.11.2026) */
export const loesungen: string[][] = [
  [
    'Über die Linie: Beide gewinnen, wenn sie die Seiten tauschen. Fast niemand kommt darauf – „gewinnen“ klingt nach „gegeneinander“.',
    'Fünf Tiere: „Mir egal.“ – Schildkröte · „Was ist dir daran wichtig?“ – Eule · „So wird es gemacht. Punkt.“ – Hai · „Du die Hälfte, ich die Hälfte.“ – Fuchs · „Hauptsache, kein Streit.“ – Chamäleon. Es gibt kein falsches Tier im Tier-Check.',
    'Der Fall: Finn ist der Hai, Lina das Chamäleon. Gebaut haben den Streit beide.',
    'Streit in Zeitlupe: Reihenfolge Woche 1 – Woche 2 – Woche 3 – Abgabe. Bei den Tieren fehlt die Eule. Die billigste Stopp-Stelle ist der erste „Können wir nicht …?“-Satz. Passende Eulen-Sätze dort: „Was ist dir daran wichtig?“ oder „Beides aufs Plakat?“. Für Lina am Mittwoch: „Ich bin sauer. Kurz Pause.“',
  ],
  [
    'Der Fall: Niemand zwingt Ben – aber alle schauen. Er hat mehr Angst, ausgelacht zu werden, als erwischt zu werden.',
    'Clip: Im Linien-Test machen drei von vier Leuten mindestens einmal mit. Geholfen hat eine zweite Person, die auch Nein sagt.',
    'Nein-Karten: Am längsten halten kurze Neins ohne Begründung („Nee.“, „Ohne mich.“) und Neins mit Vorschlag. Ausreden („Hab gleich Training.“) sind erlaubt. Teil 2 zeigt: Das zweite Nein ist fast immer leichter – einer reicht.',
  ],
  [
    'Der Fall: Noah ist Verstärker. Sein Klick hat dem Clip zwei Gruppen Publikum gegeben.',
    'Spaß, Streit oder Mobbing: 1 Spaß · 2 Streit · 3 Mobbing · 4 Mobbing (er lacht mit und geht allein). Merkmale: wiederholt, absichtlich, einer oder mehrere gegen einen Schwächeren, wehrlos – „laut“ gehört nicht dazu.',
    'Klassenchat in Zeitlupe: 😂 und Weiterleiten machen die Bühne größer (+1), jede Hilfe kleiner (−1), „nichts tun“ lässt sie, wie sie ist. Die kleinste Hilfe (eine private Nachricht) zählt genauso wie „Lösch das“.',
    'Schluss: Hingehen und sich entschuldigen. Es ist nie zu spät.',
  ],
]

// REAL TALK #00 · NEU HIER – die drei ersten Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 baut auf einem Fall und einer großen Runde auf (eigene Regeln), Stunde 2 beginnt mit dem Clip, Stunde 3 mit dem Tun.
// Vertieft 24.11.2026: Fälle mit Spuren (Toms alte Gruppe, Chloés erste Eindrücke, Finn unter Druck), Modelle mit Übungen.
import type { Heft, Stunde } from '../typen'
import { abwaegen, ankommen, clip, ermittlung, fallWeiter, fragen, fuerDich, kette, kreuz, kreuzU, modell, raster, runde, satz, schluss, seite, st, stimmtDas, strich, stunde, tabelle, text, theorien, verteilen, zeile } from './stunden-hilfe'

export function stunden(d: Heft): Stunde[] {
  const [regeln, wer, team] = d.tracks
  // Der Clip „Solidarität oder Chaos?“ passt nicht eng genug zu den Regeln – die erste Stunde kommt ohne Video aus.
  delete regeln.clip

  /* ---------- Stunde 1 · Die Regeln ---------- */
  const s1 = stunde('Was muss hier gelten, damit du bleibst?', ['sagen, welche Regel du brauchst', '„Weiter“ sagen, wenn du nichts erzählen willst', 'den Skill 5-4-3-2-1'],
    seite(
      ankommen('dein erster Eindruck', strich('Wie gern bist du heute hier?', 'gar nicht', 'gern'), zeile('Was soll in diesem Kurs auf keinen Fall passieren? Ein Stichwort reicht.')),
      st('Erst spielen: Ball-Rekord', '8 Min.', 'alle · im Kreis', 'ball-volleyball', 'Mitspielen. Zweite Runde mit Stoppuhr – es geht um den Rekord der Gruppe, nicht um Einzelne.',
        text('**Material:** ein weicher Ball, eine Stoppuhr. Ein Ball fliegt kreuz und quer. Wer wirft, ruft zuerst den Namen. Jede Person bekommt den Ball genau einmal. **Zweite Runde: gleiche Reihenfolge, die Stoppuhr läuft.** Dritte Runde: Rekord schlagen.'),
      ),
      ermittlung(regeln, 'Tom und die Jacke',
        'Erster Tag, neue Gruppe. Tom setzt sich auf den Stuhl an der Tür, Jacke an, Rucksack auf dem Schoß. Er hat eine Regel: **nichts sagen, schnell wieder weg.** Die Leitung denkt: „Der ist halt schüchtern.“ Ihr findet heraus, woher Toms Regel wirklich kommt.',
        [
          ['A', 'armchair', 'Heute, erster Tag', 'Stuhl direkt an der Tür. Jacke an, Rucksack auf dem Schoß. Er schaut immer wieder zur Tür.'],
          ['B', 'school', 'Die alte Gruppe, im Frühling', 'Die Leitung sagte: „Hier kann man über alles reden.“ Eine Regel fürs Weitererzählen gab es nicht.'],
          ['C', 'user', 'Ein Junge aus der alten Gruppe', '„Tom hat mal was Persönliches erzählt. Ich hab’s nur einem gesagt. Echt nur einem.“'],
          ['D', 'device-mobile', 'Chat der Klasse, am selben Abend', 'Jemand schreibt Toms Geschichte in den Chat. 23 Reaktionen. Ein paar lachende Gesichter.'],
          ['E', 'door', 'Flur, am nächsten Morgen', 'Zwei aus der Parallelklasse flüstern, als Tom vorbeigeht: „Ist das der …?“'],
          ['F', 'message-circle', 'Tom, heute', '„Ich bin nicht schüchtern. Ich bin vorsichtig.“'],
        ],
        [
          kette('Wie ist Toms Regel entstanden? Bring vier Spuren in die richtige Reihenfolge. Eine Spur zeigt nur, wie es heute aussieht.', 4, 'Toms Regel'),
          satz('Der Junge sagt: „Nur einem.“ Warum hat das trotzdem gereicht?', 'Einer erzählt es weiter, dann …'),
        ], { zeit: '18 Min.' }),
    ),
    seite(
      fallWeiter('Tom – Theorien prüfen', 3, 'In der neuen Gruppe hat schon jede Person eine Erklärung für Tom. Prüft sie mit den Spuren.',
        theorien('Stimmt die Theorie – **ja**, **halb** oder **nein**? Schreib die Spur dazu.', '„Tom ist halt schüchtern.“', '„Tom mag keine Gruppen.“', '„In Toms alter Gruppe hat eine Regel gefehlt.“', '„Der Junge wollte Tom schaden.“'),
        satz('Welche Regel hätte Tom geschützt? Und welche Ausnahme braucht sie?', 'Die Regel:', 'Die Ausnahme:'),
        kreuzU('Was muss hier passieren, damit Tom die Jacke auszieht? Mehrere Kreuze gehen.', 'Eine Regel, dass nichts weitererzählt wird – und alle halten sich daran.', 'Niemand muss etwas erzählen.', 'Die Leitung sagt: „Du musst offener sein.“', 'Er merkt ein paar Wochen lang: Hier wird nichts weitergetragen.')),
      modell(regeln, 'drei Dinge, die hier immer gelten', ['shield', 'lock', 'player-skip-forward'], { zeit: '10 Min.', wie: 'allein · dann alle', intro: 'Drei Dinge gelten hier immer – egal, welche Regeln ihr gleich selbst macht. Toms alte Gruppe hätte sie gebraucht.',
        leitung: 'Vorlesen, dann den Regel-Check allein ankreuzen lassen. Die Ausnahme „Gefahr“ klar besprechen: Dann holt die Leitung Hilfe – und sagt es der Person vorher.',
        fragen: [raster('Regel-Check: Welche Regel hilft hier? Ein Kreuz pro Zeile.', ['schützen', 'bleibt hier', '„Weiter“', 'Gefahr: Hilfe holen'],
          'Jemand fragt dich nach deiner Familie. Du willst nicht antworten.',
          'Nach der Stunde fragt dich jemand aus einer anderen Klasse, was Tom erzählt hat.',
          'Einer macht sich über jede Antwort lustig.',
          'Jemand erzählt, dass ihn jemand bedroht.',
          'Du sagst „Weiter“. Einer ruft: „Langweilig!“'),
          kreuz('Welche der drei ist für dich die wichtigste?', 'Regeln schützen', 'Was hier bleibt', '„Weiter“')] }),
    ),
    seite(
      runde('eure eigenen Regeln', '25 Min.', 'zu zweit · dann zwei Teams', 'writing-sign', {
        ziel: 'Aus dem schlimmsten Kurs der Welt die fünf Regeln machen, die ihr wirklich braucht.',
        material: 'zwei große Bögen Papier, dicke Stifte, Klebepunkte (oder ein Stift für Striche)',
        schritte: [
          '**Staffel (4 Min.):** Zwei Teams, zwei Bögen. Eine Person läuft vor und schreibt auf, was im schlimmsten Kurs der Welt passiert. Zurück, Stift weiter.',
          'Die Leitung liest beide Bögen vor. Lachen ist erlaubt.',
          '**Umdrehen:** Aus jedem Punkt wird eine Regel. „Alle lachen bei Fehlern“ wird zu „Wir lachen miteinander, nicht übereinander“.',
          'Jede Person klebt drei Punkte an die Regeln, die ihr am wichtigsten sind.',
          'Die fünf Regeln mit den meisten Punkten schreibt jede Person in den Vertrag unten. **Alle unterschreiben den großen Bogen – auch die Leitung.**',
        ],
        regeln: ['Niemand muss vorlesen. Wer nicht laufen will, schreibt für sein Team.'],
        zu3: 'Ein Team, ein Bogen. Schafft ihr zwölf Punkte in vier Minuten?',
        auswertung: ['Welche Regel hat die meisten Punkte – und warum gerade die?', 'Welche Regel hättet ihr ohne die Staffel vergessen?'],
      }, {
        davor: [fragen('**Zum Warmwerden (zu zweit oder zu dritt, 5 Min.):** Stell dir den übelsten Kurs vor, den es geben kann.', ...regeln.moves[0].fragen.slice(0, 1))],
        danach: [tabelle('10mm auto', ['Nr.', 'Unser Vertrag: Das gilt in dieser Gruppe'], [['1', ''], ['2', ''], ['3', ''], ['4', ''], ['5', '']], 8.5), fragen(null, satz('Unterschriften:', ''))],
      }),
    ),
    seite(
      fuerDich('mein Vertrag', '6 Min.', fragen(null, satz('Blätter zurück zu Station 1: Was soll hier nicht passieren – und welche Regel schützt dich davor?', 'Diese Regel:'), kreuz('Unterschreibst du den Vertrag gern?', 'ja', 'halb', 'nein'))),
      st('Der Skill: 5-4-3-2-1', '12 Min.', 'alle · draußen', 'eye', 'Alle gehen zusammen raus, jede Person sucht für sich. Sie gehen mit.',
        text('Wenn der Kopf voll ist, holen dich deine Sinne zurück. Probiert es draußen aus – acht Minuten, ohne Handy: Sucht **5** Dinge zum Sehen, **4** zum Spüren, **3** zum Hören, **2** zum Riechen. (**1** zum Schmecken lassen wir draußen weg.)')),
      schluss(regeln, 'Toms Jacke', [kreuz('Nächste Woche: Zieht Tom die Jacke aus, wenn eure Regeln halten?', 'ja', 'vielleicht', 'nein'), kreuz('Dein Plan: Wann probierst du 5-4-3-2-1 diese Woche?', 'abends im Bett', 'in der Schule', 'nach Streit', 'unterwegs')], ['1', '2', '3']),
    ),
  )

  /* ---------- Stunde 2 · Wer sind die? ---------- */
  const s2 = stunde('Wie lernt man Leute kennen, ohne sein Leben zu erzählen?', ['sagen, warum der erste Eindruck oft falsch ist', 'eine kleine Gemeinsamkeit finden', 'eine Frage stellen und einmal nachhaken'],
    seite(
      ankommen('der erste Blick', kreuz('Wie viele Leute hier kennst du schon ein bisschen?', 'keinen', 'einen', 'zwei oder mehr'), zeile('Was denken Leute über dich, wenn sie dich zum ersten Mal sehen? Ein Wort.')),
      clip(wer, 'Schubladen im Kopf', [kreuzU('Wie schnell hat dein Kopf einen ersten Eindruck?', 'in Sekunden', 'in Minuten', 'erst nach Tagen')], ['In diese Schubladen stecken die Leute andere:', 'So kommt man aus der Schublade raus:'],
        [kreuz('Wurdest du schon in eine Schublade gesteckt?', 'oft', 'manchmal', 'nie'), kreuz('Schau auf dein Wort von Station 1: Ist das auch eine Schublade?', 'ja', 'vielleicht', 'nein')]),
    ),
    seite(
      ermittlung(wer, 'Chloés Notizen',
        'Chloé sagt in neuen Gruppen drei Wochen lang nichts. Sie beobachtet – und schreibt sich am ersten Tag heimlich auf, was sie von den anderen hält. Am vierten Tag fragt die Leitung: „Wer ist schon mal in den falschen Bus gestiegen?“ Danach sieht einiges anders aus.',
        [
          ['A', 'notebook', 'Chloés Notiz, Tag 1', 'Der Laute mit der Kappe: **gefährlich, lacht über alle.**'],
          ['B', 'notebook', 'Chloés Notiz, Tag 1', 'Die mit dem dicken Buch: **arrogant, redet mit keinem.**'],
          ['C', 'notebook', 'Chloés Notiz, Tag 1', 'Der Große ganz hinten: **egal, macht eh nicht mit.**'],
          ['D', 'bus', 'Tag 4, Bus-Frage', 'Der mit der Kappe tritt neben Chloé: „Auch Linie 12?“ Er hat neulich einem Neuen den Fahrplan erklärt.'],
          ['E', 'book', 'Tag 4, Pause', 'Die mit dem Buch sagt leise: „Ich lese, wenn ich nervös bin. Neue Gruppen sind die Hölle.“'],
          ['F', 'hand-stop', 'Tag 4, Gruppenarbeit', 'Der Große hinten sagt kaum etwas. Als zwei sich streiten, sagt er ruhig: „Stopp. Erst sie, dann du.“'],
        ],
        [
          theorien('Prüf Chloés Notizen: Stimmt ihr erster Eindruck – **ja**, **halb** oder **nein**? Schreib die Spur dazu, die es zeigt.', 'A · „gefährlich“', 'B · „arrogant“', 'C · „egal“'),
        ], { zeit: '15 Min.' }),
      fallWeiter('Chloés Notizen', 3, null,
        kreuzU('Warum lag Chloés Kopf so oft daneben? Mehrere Kreuze gehen.', 'Sie hatte nur Sekunden und wenig Infos.', 'Sie hat von sich auf andere geschlossen: Wer still ist, ist wie sie.', 'Die anderen haben sich verstellt.', 'Ein erster Eindruck schützt – er muss nicht stimmen.'),
        satz('Welcher Eindruck hätte Chloé fast etwas gekostet – und was?', 'Fast verpasst hätte sie …'),
        kreuzU('Warum war die Bus-Frage ein guter Anfang? Mehrere Kreuze gehen.', 'Sie ist harmlos.', 'Fast jeder kennt das.', 'Man muss nichts Privates erzählen.')),
    ),
    seite(
      stimmtDas(wer),
      modell(wer, 'Kennenlernen ohne Lebensbeichte', ['clock', 'link', 'message-question'], { zeit: '8 Min.', wie: 'allein · dann zu zweit', intro: 'Drei Dinge helfen, wenn man neue Leute kennenlernt – ohne gleich sein Leben zu erzählen.',
        leitung: 'Vorlesen, dann allein ankreuzen. Zu zweit vergleichen: Wo seid ihr euch nicht einig – und warum?',
        fragen: [raster('Gute Anfangsfrage oder zu privat? Ein Kreuz pro Zeile.', ['gut zum Anfang', 'zu privat'], 'Welche Serie schaust du gerade?', 'Warum wohnst du nicht bei deinen Eltern?', 'Wie lange brauchst du morgens hierher?', 'Wie viel Geld bekommst du?', 'Was kannst du richtig gut?', 'Hast du schon mal etwas Verbotenes gemacht?')] }),
      fuerDich('meine Frage für gleich', '6 Min.', fragen(null,
        satz('Nachhaken üben: Jemand sagt „Ich spiele Basketball.“ Was fragst du nach?', 'Meine Nachfrage:'),
        satz('Gleich fragt ihr euch gegenseitig. Was willst du von den anderen wissen?', 'Meine Frage:'))),
    ),
    seite(
      runde('Treffer-Jagd', '25 Min.', 'alle · mit Leitung', 'target-arrow', {
        ziel: 'Kleine Gemeinsamkeiten finden – ohne etwas Privates zu erzählen.',
        material: 'das Feld unten, ein Stift für jede Person, ein großes Blatt für die Wand',
        schritte: [
          '**Bingo (10 Min.):** Geht herum und fragt. Bei Ja kommt der Name ins Feld. Die Leitung spielt mit. Jeder Name höchstens dreimal. „Weiter“ ist erlaubt.',
          'Drei Namen in einer Reihe: leise „Bingo“ sagen und weitersammeln. Bei jedem Ja einmal nachhaken. Zum Schluss stellst du einer Person deine Frage von Station 6.',
          '**Treffer (10 Min.):** Setzt euch zusammen. Findet **drei Dinge, die alle hier gemeinsam haben.** Was man sieht, zählt nicht.',
          'Schreibt die drei Treffer groß auf ein Blatt. Es bleibt im Raum hängen.',
        ],
        zu3: 'Die Leitung spielt mit. Jeder Name darf fünfmal ins Feld.',
        notiz: { titel: 'Das haben hier alle gemeinsam:', linien: 2 },
        auswertung: ['Welcher gemeinsame Treffer hat euch überrascht?'],
      }, { danach: [fragen(null, ...wer.moves[1].fragen)] }),
      schluss(wer, 'dein Wort vom Anfang', [kreuz('Blätter zurück zu Station 1: Stimmt das Wort, das andere über dich denken?', 'ja', 'halb', 'nein')]),
    ),
  )

  /* ---------- Stunde 3 · Ein Team? ---------- */
  const s3 = stunde('Kann man sich auf diese Gruppe verlassen?', ['jemanden sicher lotsen', '„Stopp“ sagen – und auf ein Stopp hören', 'sagen, was du in einer Gruppe brauchst'],
    seite(
      ankommen('dein Vertrauen heute', strich('Wie sehr vertraust du dieser Gruppe?', 'gar nicht', 'ganz'), ...team.moves[1].fragen.slice(0, 1)),
      ermittlung(team, 'Finn und die Bank',
        'Dritter Tag, Lotsen-Übung im Hof. Finn lotst Jana, die freiwillig die Augen zu hat. Drei Schritte vor ihr steht eine Bank. Finn hat zwei Sekunden, um sich zu entscheiden. Was zieht ihn wohin?',
        [
          ['A', 'school', 'Finns alte Schule', 'Dort war er „der mit den Streichen“. Dafür haben ihn alle gekannt.'],
          ['B', 'users', 'Die anderen am Rand', 'Zwei rufen leise: „Lass sie gegen die Bank! Das wird lustig!“'],
          ['C', 'message-circle', 'Jana, mit Augen zu', '„Ich hab Schiss. Sag mir einfach ehrlich, wo es langgeht.“'],
          ['D', 'brain', 'Finn denkt', '„Wenn ich es nicht mache, bin ich hier langweilig.“'],
          ['E', 'armchair', 'Eine Woche später', 'In der Pause setzt sich Jana neben Finn. Die zwei, die gerufen haben, fragen ihn, ob er im Team mitspielt.'],
        ],
        [
          abwaegen('Was stand für Finn auf dem Spiel? Schreib in jede Spalte etwas.', ['Das bringt es Finn', 'Das kostet es – Finn, Jana oder die Gruppe'], 'Jana gegen die Bank laufen lassen', 'Jana ehrlich lotsen'),
        ], { zeit: '15 Min.' }),
    ),
    seite(
      fallWeiter('Finn und die Bank', 2, null,
        verteilen('Wer trägt wie viel Verantwortung dafür, dass Jana sicher ankommt? Verteile genau **100 Punkte**.', 'Finn', 'Jana', 'die zwei Rufer', 'die Leitung'),
        satz('Welche Spur zeigt, dass Finns Entscheidung die ganze Gruppe verändert hat?', 'Spur … zeigt:'),
        kreuzU('Warum ist Finn am Ende stolz? Mehrere Kreuze gehen.', 'Jana hat ihm vertraut – und er hat es nicht ausgenutzt.', 'Er hat dem Druck der Rufer standgehalten.', 'Er war der Schnellste.')),
      runde('der Blind-Lotse', '25 Min.', 'zu zweit · dann alle', 'route', {
        ziel: 'Sich auf eine Stimme verlassen – und für jemanden verantwortlich sein.',
        material: 'ein weicher Ball, zwei Stühle als Tor; wer mag: eine Augenbinde',
        schritte: [
          'Bildet Paare. Eine Person schließt die Augen (oder schaut auf den Boden), die andere lotst – **nur mit der Stimme.**',
          'Dann tauschen. Jede Person ist einmal Lotse und wird einmal gelotst.',
          'Nach jeder Runde: unten ankreuzen.',
        ],
        runden: [
          { t: 'Runde 1 · gehen', x: 'Einmal quer durch den Raum, um zwei Stühle herum.' },
          { t: 'Runde 2 · Ball', x: 'Mit Augen zu den Ball ins Tor rollen. Der Lotse steht an der Seite.' },
          { t: 'Runde 3 · zwei Lotsen', x: 'Zwei Leute lotsen eine Person. Sie müssen sich absprechen.' },
        ],
        regeln: ['**Augen zu ist freiwillig.** Wer nicht will, lotst nur.', '**Stopp** heißt: sofort stehen bleiben, Augen auf. Ohne Begründung.', 'Keine Streiche. Wer lotst, trägt die Verantwortung.'],
        zu3: 'Ein Paar ist dran, die dritte Person steht im Tor. Dann wechseln. Zu fünft: ein Paar und ein Dreier, im Dreier lotsen zwei abwechselnd. Die Leitung passt auf.',
        auswertung: ['Wessen Stimme konntet ihr am besten folgen – und warum?', 'Was hat euer Lotse gut gemacht?', 'Und im echten Leben: Woran merkst du, dass du dich auf jemanden verlassen kannst? Ein Zeichen reicht – ohne Namen.'],
      }, { danach: [fragen(null, ...team.moves[0].fragen.slice(0, 2))], leitung: 'Augen zu ist freiwillig. Auf jedes Stopp sofort reagieren – das ist der Kern der Stunde.' }),
    ),
    seite(
      modell(team, 'was ein Team hält', ['users', 'steering-wheel', 'hand-stop'], { zeit: '10 Min.', wie: 'allein · dann alle', fragen: [
        raster('Team-Check: Welche Regel wird hier gebrochen? Ein Kreuz pro Zeile.', ['Jeder zählt', 'Wer führt, trägt', 'Stopp gilt'],
          'Der Schnellste rennt vor. Zwei bleiben zurück – egal.',
          'Beim Lotsen sagt einer zum Spaß „Geradeaus!“ – da steht ein Tisch.',
          'Jemand sagt Stopp. Der andere: „Ach komm, noch kurz!“',
          'Beim Fußball spielt nie jemand zu der Person, die neu ist.'),
        kreuz('Was davon habt ihr beim Lotsen am meisten gebraucht?', 'Jeder zählt', 'Wer führt, trägt', 'Stopp gilt sofort')] }),
      clip(team, 'Wie schnell wird jemand Außenseiter?', [kreuzU('Wie schnell entscheidet eine Gruppe, wer dazugehört?', 'in Minuten', 'in Tagen', 'in Wochen')], ['So wird jemand zum Außenseiter:', 'Das hilft dagegen:'],
        [kreuzU('Was wäre aus Finns Gruppe geworden, wenn er Jana gegen die Bank hätte laufen lassen?', 'ein „Wir“ gegen Jana', 'ein besseres Team', 'nichts'), zeile('Was hält eine Gruppe zusammen?')]),
    ),
    seite(
      fuerDich('was ich brauche, was ich gebe', '10 Min.', fragen(null, kreuz('Schau auf Station 1: Hat sich dein Vertrauen seit dem Lotsen verändert?', 'mehr', 'gleich', 'weniger'), satz('Bei Station 1 steht, was du brauchst. Und andersrum:', 'Das kann ich der Gruppe geben:'), { f: 'Wenn diese Gruppe ein Team wäre: Wie heißt es?', linien: 1 })),
      schluss(team, 'ein Wort für die Gruppe', [kreuz('Würdest du dich von dieser Gruppe lotsen lassen?', 'ja', 'von manchen', 'noch nicht'), zeile('Was brauchst du, damit du dich (noch mehr) auf die Gruppe verlassen kannst? Ein Wort.')]),
    ),
  )
  return [s1, s2, s3]
}

/** Lösungen und Hinweise für die Leitung (eine Liste je Stunde) */
export const loesungen: string[][] = [
  [
    'Der Fall – Kette: B → C → D → E → Toms Regel. A zeigt nur, wie es heute aussieht; F ist Toms eigene Erklärung. „Nur einem“ reicht, weil jeder es wieder „nur einem“ sagt – und im Chat (D) sind es sofort alle.',
    'Theorien: „schüchtern“ – nein (F) · „mag keine Gruppen“ – halb (er schützt sich vor Gruppen ohne Regel) · „Regel hat gefehlt“ – ja (B) · „wollte schaden“ – halb/nein (C: „nur einem“ – oft gedankenlos, die Folgen sind trotzdem groß). Regel: Was hier gesagt wird, bleibt hier. Ausnahme: Gefahr. Kreuze: 1, 2 und 4 – „offener sein“ hilft nicht. Toms Platz an der Tür ist ein Schutz – nicht korrigieren.',
    'Große Runde: Aus „Alles wird weitererzählt“ wird „Was hier erzählt wird, bleibt hier“.',
    'Modell – Regel-Check: Familie → „Weiter“ · andere Klasse fragt → bleibt hier · lustig machen → schützen · bedroht → Gefahr: Hilfe holen · „Langweilig!“ → schützen (und „Weiter“ gilt). Die Ausnahme „Jemand ist in Gefahr“ klar benennen.',
  ],
  [
    'Der Fall: A „gefährlich“ – nein (D) · B „arrogant“ – nein (E: nervös) · C „egal“ – nein bis halb (F: still, aber er greift ein). Daneben lag der Kopf, weil er nur Sekunden hatte und von sich auf andere schließt; ein erster Eindruck schützt, muss aber nicht stimmen. Fast verpasst: eine Freundin, die genauso nervös ist (E). Bus-Frage: alle drei Kreuze.',
    'Modell: gut – Serie, Weg hierher, was man gut kann · zu privat – Eltern, Geld, Verbotenes. Nachhaken: „Wo spielst du?“, „Seit wann?“, „Welche Position?“',
    'Treffer-Jagd: Wichtiger als Bingo ist das Nachhaken („Welche Sprachen?“).',
  ],
  [
    'Der Fall: Bank – bringt einen Lacher und den alten Ruf (A, B, D), kostet Janas Vertrauen, vielleicht eine Verletzung, und die Gruppe lernt: Hier ist man nicht sicher. Ehrlich lotsen – bringt Vertrauen und einen neuen Ruf (E), kostet kurz den Lacher. 100 Punkte: keine richtige Lösung; meist viel bei Finn (er führt), auch bei Leitung und Rufern, wenig bei Jana. Spur E zeigt die Veränderung. Stolz: die ersten zwei Kreuze.',
    'Blind-Lotse: „Ich habe gelinst“ ist ehrlich, kein Versagen.',
    'Modell – Team-Check: vorrennen → Jeder zählt · Tisch → Wer führt, trägt · „noch kurz“ → Stopp gilt · nie zuspielen → Jeder zählt.',
    'Clip: nach der Gruppe im Video fragen, nicht nach eigenen Mobbing-Erfahrungen; Danach 1: ein „Wir“ gegen Jana.',
    'Für dich: Bedürfnisse mit dem Vertrag abgleichen.',
  ],
]

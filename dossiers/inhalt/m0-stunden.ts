// REAL TALK #00 · NEU HIER – die drei ersten Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 baut auf einem Fall und einer großen Runde auf (eigene Regeln), Stunde 2 beginnt mit dem Clip, Stunde 3 mit dem Tun.
import type { Heft, Stunde } from '../typen'
import { ankommen, clip, fall, fragen, fuerDich, kreuz, kreuzU, modell, runde, satz, schluss, seite, st, stimmtDas, strich, stunde, tabelle, text, zeile } from './stunden-hilfe'

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
      fall(regeln, 'Tom und die Jacke', [
        kreuzU('Warum sagt Tom nichts mehr?', 'In der letzten Gruppe wurde etwas weitererzählt.', 'Er hat nichts zu sagen.', 'Er mag die Leitung nicht.'),
        kreuzU('Was muss hier gelten, damit Tom die Jacke auszieht? Mehrere Kreuze gehen.', 'Was hier gesagt wird, bleibt hier.', 'Niemand muss etwas erzählen.', 'Keiner lacht über andere.'),
      ]),
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
      modell(regeln, 'drei Dinge, die hier immer gelten', ['shield', 'lock', 'player-skip-forward'], { zeit: '8 Min.', intro: 'Zu euren Regeln kommen drei von der Leitung dazu. Sie gelten in jeder Stunde.', fragen: [kreuz('Welche der drei ist für dich die wichtigste?', 'Regeln schützen', 'Was hier bleibt', '„Weiter“')] }),
      fuerDich('mein Vertrag', '6 Min.', fragen(null, satz('Blätter zurück zu Station 1: Was soll hier nicht passieren – und welche Regel schützt dich davor?', 'Diese Regel:'), kreuz('Unterschreibst du den Vertrag gern?', 'ja', 'halb', 'nein'))),
      st('Der Skill: 5-4-3-2-1', '12 Min.', 'alle · draußen', 'eye', 'Alle gehen zusammen raus, jede Person sucht für sich. Sie gehen mit.',
        text('Wenn der Kopf voll ist, holen dich deine Sinne zurück. Probiert es draußen aus – acht Minuten, ohne Handy: Sucht **5** Dinge zum Sehen, **4** zum Spüren, **3** zum Hören, **2** zum Riechen. (**1** zum Schmecken lassen wir draußen weg.)')),
      schluss(regeln, 'Toms Jacke', [kreuz('Nächste Woche: Zieht Tom die Jacke aus, wenn eure Regeln halten?', 'ja', 'vielleicht', 'nein'), zeile('Was braucht er dafür am meisten?')], ['1', '2', '3']),
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
      fall(wer, 'Chloé und die Linie 12', [
        kreuzU('Was macht Chloé sonst in neuen Gruppen?', 'Sie redet viel.', 'Sie schaut erst zu.', 'Sie geht gleich wieder.'),
        kreuzU('Warum war die Frage mit dem Bus ein guter Anfang? Mehrere Kreuze gehen.', 'Sie ist harmlos.', 'Fast jeder kennt das.', 'Man muss nichts Privates erzählen.'),
      ]),
      stimmtDas(wer),
      fuerDich('meine Frage für gleich', '6 Min.', fragen(null, kreuz('Was fällt dir am leichtesten?', 'fragen', 'antworten', 'zuhören'), satz('Gleich fragt ihr euch gegenseitig. Was willst du von den anderen wissen?', 'Meine Frage:'))),
    ),
    seite(
      runde('Treffer-Jagd', '25 Min.', 'alle · mit Leitung', 'target-arrow', {
        ziel: 'Kleine Gemeinsamkeiten finden – ohne etwas Privates zu erzählen.',
        material: 'das Feld unten, ein Stift für jede Person, ein großes Blatt für die Wand',
        schritte: [
          '**Bingo (10 Min.):** Geht herum und fragt. Bei Ja kommt der Name ins Feld. Die Leitung spielt mit. Jeder Name höchstens dreimal. „Weiter“ ist erlaubt.',
          'Drei Namen in einer Reihe: leise „Bingo“ sagen und weitersammeln. Bei jedem Ja einmal nachhaken. Zum Schluss stellst du einer Person deine Frage von Station 5.',
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
      fall(team, 'Finn und die Bank', [
        kreuzU('Finn hätte Jana gegen die Bank laufen lassen können. Was wäre dann passiert?', 'Alle hätten gelacht – und Jana hätte niemandem mehr vertraut.', 'Nichts.', 'Jana hätte mitgelacht.'),
        kreuzU('Warum ist Finn am Ende stolz?', 'Weil Jana ihm vertraut hat – und er es nicht ausgenutzt hat.', 'Weil er der Schnellste war.', 'Weil alle zugeschaut haben.'),
      ]),
    ),
    seite(
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
        auswertung: ['Wessen Stimme konntet ihr am besten folgen – und warum?', 'Was hat euer Lotse gut gemacht?'],
      }, { danach: [fragen(null, ...team.moves[0].fragen.slice(0, 2))], leitung: 'Augen zu ist freiwillig. Auf jedes Stopp sofort reagieren – das ist der Kern der Stunde.' }),
      modell(team, 'was ein Team hält', ['users', 'steering-wheel', 'hand-stop'], { zeit: '8 Min.', fragen: [kreuz('Was davon habt ihr beim Lotsen gebraucht?', 'Jeder zählt', 'Wer führt, trägt', 'Stopp gilt sofort')] }),
    ),
    seite(
      clip(team, 'Wie schnell wird jemand Außenseiter?', [kreuzU('Wie schnell entscheidet eine Gruppe, wer dazugehört?', 'in Minuten', 'in Tagen', 'in Wochen')], ['So wird jemand zum Außenseiter:', 'Das hilft dagegen:'],
        [kreuzU('Was wäre aus Finns Gruppe geworden, wenn er Jana gegen die Bank hätte laufen lassen?', 'ein „Wir“ gegen Jana', 'ein besseres Team', 'nichts'), zeile('Was hält eine Gruppe zusammen?')]),
      fuerDich('was ich brauche, was ich gebe', '10 Min.', fragen(null, kreuz('Schau auf Station 1: Hat sich dein Vertrauen seit dem Lotsen verändert?', 'mehr', 'gleich', 'weniger'), satz('Bei Station 1 steht, was du brauchst. Und andersrum:', 'Das kann ich der Gruppe geben:'), { f: 'Wenn diese Gruppe ein Team wäre: Wie heißt es?', linien: 1 })),
      schluss(team, 'ein Wort für die Gruppe', [kreuz('Würdest du dich von dieser Gruppe lotsen lassen?', 'ja', 'von manchen', 'noch nicht'), zeile('Was brauchst du, damit du dich (noch mehr) auf die Gruppe verlassen kannst? Ein Wort.')]),
    ),
  )
  return [s1, s2, s3]
}

/** Lösungen und Hinweise für die Leitung (eine Liste je Stunde) */
export const loesungen: string[][] = [
  [
    'Der Fall: 1 – in der letzten Gruppe wurde etwas weitererzählt; 2 – alle drei passen. Toms Platz an der Tür ist ein Schutz – nicht korrigieren.',
    'Große Runde: Aus „Alles wird weitererzählt“ wird „Was hier erzählt wird, bleibt hier“.',
    'Modell: die Ausnahme „Jemand ist in Gefahr“ klar benennen.',
  ],
  [
    'Der Fall: 1 – sie schaut erst zu; 2 – alle drei passen.',
    'Treffer-Jagd: Wichtiger als Bingo ist das Nachhaken („Welche Sprachen?“).',
  ],
  [
    'Der Fall: jeweils die erste Antwort.',
    'Blind-Lotse: „Ich habe gelinst“ ist ehrlich, kein Versagen.',
    'Clip: nach der Gruppe im Video fragen, nicht nach eigenen Mobbing-Erfahrungen; Danach 1: ein „Wir“ gegen Jana.',
    'Für dich: Bedürfnisse mit dem Vertrag abgleichen.',
  ],
]

// REAL TALK #00 · NEU HIER – drei Stunden (Umbau 27.11.2026 nach fünf jugendlichen Kritikern).
// Stunde 1: Ball-Rekord, Tom und die Jacke, die Weiter-Runde (Weiter wird wirklich geübt), der eigene Vertrag mit Regel 6
// („Nichts von hier in Chats. Keine Fotos.“), 5-4-3-2-1 draußen. Stunde 2 (neu): „Mehr, als man sieht“ – Gruppen-Wette,
// Fragen-Ampel, Frage-Duelle mit Nachhaken. Stunde 3: Bis 20 zählen, Blind-Lotse mit eigenem Parcours.
// Runde 3 (27.11.2026): Weiter-Runde als eigene Station, Modell = die drei Regeln der Ansage, Fall Chloé mit „Ein Schritt nach vorn“,
// Ampel „Rot schlägt Grün“, Frage-Paare je 5 Minuten, Pause in Stunde 3 nach dem Lotsen.
// Kein Clip in diesem Heft (Schubladen-Clip: Fragen zu Pornos; Außenseiter-Clip: Mobbing in Stunde 3 einer neuen Gruppe).
import type { Heft, Stunde } from '../typen'
import { ankommen, beispiel, fall, fragen, karten, kreuz, kreuzU, material, modell, raster, reden, runde, satz, schluss, seite, st, strich, stunde, tabelle, text, weiter, zeile, pause } from './stunden-hilfe'

export function stunden(d: Heft): Stunde[] {
  const [regeln, wer, team] = d.tracks
  delete regeln.clip

  /* ---------- Stunde 1 · Die Regeln ---------- */
  const s1 = stunde('Was muss hier gelten, damit du bleibst?', ['sagen, welche Regel du brauchst', '„Weiter“ sagen, wenn du nichts erzählen willst', 'den Skill 5-4-3-2-1'],
    seite(
      ankommen('dein erster Eindruck', strich('Wie gern bist du heute hier?', 'gar nicht', 'gern'), zeile('Was soll in diesem Kurs auf keinen Fall passieren? Ein Stichwort reicht.')),
      st('Erst spielen: Ball-Rekord', '6 Min.', 'alle · im Kreis', 'ball-volleyball', 'Mitspielen. Zweite Runde mit Stoppuhr – es geht um den Rekord der Gruppe, nicht um Einzelne.',
        text('**Material:** ein weicher Ball, eine Stoppuhr. Ein Ball fliegt kreuz und quer. Wer wirft, ruft zuerst den Namen. Jede Person bekommt den Ball genau einmal. **Zweite Runde: gleiche Reihenfolge, die Stoppuhr läuft.** Dritte Runde: Rekord der Gruppe schlagen.')),
    ),
    seite(
      fall(regeln, 'Tom und die Jacke', [
        kreuzU('Warum sagt Tom nichts mehr?', 'In der letzten Gruppe wurde etwas weitererzählt.', 'Er hat nichts zu sagen.', 'Er mag die Leitung nicht.'),
        kreuzU('Was muss hier gelten, damit Tom die Jacke auszieht? Mehrere Kreuze gehen.', 'Was hier gesagt wird, bleibt hier.', 'Niemand muss etwas erzählen.', 'Keiner lacht über andere.'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase. Toms Platz an der Tür ist ein Schutz – nicht korrigieren.' }),
      weiter('Der Fall: Tom und die Jacke', 3, 'search', reden('Warum erzählen Leute Sachen weiter – was haben sie davon?', 'Was hilft, damit man einer Gruppe wieder vertraut?')),
      modell(regeln, 'drei Dinge, die hier immer gelten', ['mood-smile', 'lock', 'player-skip-forward'], { zeit: '5 Min.', wie: 'alle · dann allein', intro: 'Drei Dinge gelten hier immer – egal, welche Regeln ihr gleich selbst macht.',
        leitung: 'Vorlesen. Die Ausnahme „Jemand ist in Gefahr“ klar benennen: Dann holt die Leitung Hilfe – und sagt es der Person vorher.',
        fragen: [kreuz('Welche der drei ist für dich die wichtigste?', 'Lachen ja, auslachen nein', 'Was hier bleibt', '„Weiter“')],
        danach: [reden('Wo hättet ihr euch so eine Regel schon einmal gewünscht?')] }),
    ),
    seite(
      st('Die Weiter-Runde', '8 Min.', 'alle', 'player-skip-forward', 'Jede Frage an alle stellen. Bei Frage 5 und 6 sagen alle gleichzeitig „Weiter“ – auch Sie. Niemand fragt nach, warum.',
        text('Jede Person schreibt groß **„Weiter“** auf einen Zettel. Die Leitung stellt sechs Fragen an alle, von harmlos bis frech. Du entscheidest: antworten – oder Zettel hoch und **„Weiter“**. **Bei Frage 5 und 6 halten alle gleichzeitig den Zettel hoch.**'),
        text('1 „Lieblingsessen?“ · 2 „Was hast du zuletzt gegoogelt?“ · 3 „Dein schlimmster Haarschnitt?“ · 4 „Welche Note hattest du zuletzt in Mathe?“ · 5 „Was ist peinlich auf deinem Handy?“ · 6 „Was steht in deinem letzten Chat?“'),
        fragen(null, strich('War „Weiter“ leichter als gedacht?', 'schwer', 'leicht'))),
      pause(),
    ),
    seite(
      runde('eure eigenen Regeln', '25 Min.', 'alle · am Tisch', 'writing-sign', {
        ziel: 'Aus dem schlimmsten Kurs der Welt die fünf Regeln machen, die ihr wirklich braucht.',
        material: 'ein großer Bogen Papier, dicke Stifte, Klebepunkte (oder ein Stift für Striche)',
        schritte: [
          '**Der schlimmste Kurs der Welt (5 Min.):** Alle schreiben auf den Bogen, was dort passiert. Je übler, desto besser.',
          'Die Leitung liest vor. Lachen ist erlaubt.',
          '**Umdrehen:** Aus jedem Punkt wird eine Regel.',
          'Jede Person klebt drei Punkte an die Regeln, die ihr am wichtigsten sind.',
          'Die fünf Regeln mit den meisten Punkten kommen in den Vertrag unten. Regel 6 steht schon da: Abends seid ihr alle im selben Klassenchat. **Alle unterschreiben unter dem Vertrag – auch die Leitung.**',
        ],
        regeln: ['Niemand muss vorlesen. Wer nicht schreiben will, sagt es jemandem, der schreibt.'],
        zu3: 'Jede Person klebt zwei Punkte.',
        auswertung: ['Welche Regel hat die meisten Punkte – und warum gerade die?'],
      }, {
        leitung: 'Bogen und Stifte bereitlegen. Keine Teams gegeneinander – alle schreiben zusammen.',
        danach: [
          beispiel('So kann es klingen', ['Sara schreibt:', '„Alles wird weitererzählt.“'], ['', 'Beim Umdrehen wird daraus:'], ['Ben sagt:', '„Was hier gesagt wird, bleibt hier.“']),
          tabelle('10mm auto', ['Nr.', 'Unser Vertrag: Das gilt in dieser Gruppe'], [['1', ''], ['2', ''], ['3', ''], ['4', ''], ['5', ''], ['6', 'Nichts von hier in Chats. Keine Fotos.']], 8.5),
          fragen(null, zeile('Unterschriften – alle, auch die Leitung:')),
        ],
      }),
    ),
    seite(
      st('Der Skill: 5-4-3-2-1', '10 Min.', 'alle · draußen', 'eye', 'Alle gehen zusammen raus, jede Person sucht für sich. Sie gehen mit. Bei Regen: am offenen Fenster.',
        text('Wenn der Kopf voll ist, holen dich deine Sinne zurück. Probiert es draußen aus – acht Minuten, ohne Handy: Sucht **5** Dinge zum Sehen, **4** zum Spüren, **3** zum Hören, **2** zum Riechen. (**1** zum Schmecken lassen wir draußen weg.)'),
        reden('Was hast du entdeckt, das dir vorher nie aufgefallen ist?')),
      schluss(regeln, 'Toms Jacke', [satz('Schau auf Station 1: Was soll hier nicht passieren – welche Regel schützt dich davor?', 'Diese Regel:'), kreuz('Dein Plan: Wann probierst du 5-4-3-2-1 diese Woche?', 'abends im Bett', 'in der Schule', 'nach Streit', 'unterwegs')], ['1', '2', '3']),
    ),
  )

  /* ---------- Stunde 2 · Mehr, als man sieht (neu 27.11.2026) ---------- */
  // Raus: der Schubladen-Clip (Fragen zu Pornos, Fremdgehen, Alkohol – mit QR-Code im Heft der Jugendlichen), die Frage
  // „Was denken Leute über dich beim ersten Blick?“ und das Bingo im Herumgehen (bei vier Leuten an einem Tisch sinnlos).
  const FRAGEN = ['Welche Serie schaust du gerade?', 'Wie lange brauchst du morgens hierher?', 'Was kannst du richtig gut?', 'Welches Essen magst du gar nicht?', 'Welches Spiel zockst du gerade?', 'Bist du schon mal in den falschen Bus gestiegen?', 'Welche Sprachen sprichst du?', 'Welches Lied hörst du gerade oft?', 'Wo wohnst du?', 'Warum bist du in dieser Klasse?', 'Welche Note hattest du zuletzt?', 'Wie viel Taschengeld bekommst du?', 'Was war dein peinlichster Moment?', 'Bist du verliebt?', 'Wie ist es bei dir zu Hause?']
  const s2 = stunde('Was weißt du über die anderen – und was nicht?', ['eine harmlose Frage stellen', 'einmal nachhaken', 'einen Treffer finden, den man nicht sieht'],
    seite(
      ankommen('wie gut kennst du sie?', strich('Wie gut kennst du die anderen hier?', 'kaum', 'gut'), kreuz('Über wen weißt du am wenigsten? Nur denken – nicht aufschreiben.', 'hab jemanden im Kopf')),
      st('Die Gruppen-Wette', '12 Min.', 'allein tippen · dann alle', 'zoom-question', 'Erst tippen lassen. Dann zählen alle gleichzeitig mit den Fingern – Sie zählen mit. Wer nicht mitzählen mag, sagt „Weiter“.',
        text('Erst tippt jede Person allein. Dann zeigen alle **gleichzeitig** mit den Fingern – und ihr zählt zusammen.'),
        tabelle('auto 22mm 22mm', ['Wie viele … haben wir zusammen?', 'mein Tipp', 'echt'], [['Sprachen (auch ein bisschen)', '', ''], ['Leute, die heute mit dem Bus gekommen sind', '', ''], ['Haustiere (auch früher)', '', ''], ['Sportarten, die wir schon ausprobiert haben', '', ''], ['Mal Wecker-Wegdrücken heute früh', '', '']], 8),
        reden('Welche Zahl hat euch umgehauen?')),
      fall(wer, 'Chloé und die Linie 12', [
        kreuz('Ein Schritt nach vorn: Bei welchem Satz standen mehr vorn, als du dachtest?', 'falscher Bus', 'Nachricht an die Falsche', 'Sprache, die hier keiner kann', 'bis 3 Uhr wach'),
      ], { zeit: '12 Min.', leitung: 'Vorlesen. Dann stehen alle auf einer Linie (Klebeband). Sie lesen: „Ein Schritt vor, wenn du … heute schon gegähnt hast · schon mal in den falschen Bus gestiegen bist · schon mal eine Nachricht an die falsche Person geschickt hast · eine Sprache sprichst, die hier keiner kann · schon mal bis 3 Uhr wach warst.“ Vor, umschauen, zurück. Sie gehen mit. Wer nicht will, bleibt stehen – ohne Kommentar.' }),
    ),
    seite(
      st('Die Fragen-Ampel', '15 Min.', 'alle · am Tisch', 'traffic-lights', 'Rot schlägt Grün: Sagt eine Person „rot“, kommt die Karte auf Rot – ohne Diskussion. So sind die grünen Karten danach für alle sicher.',
        text('Die drei Ampel-Karten liegen auf dem Tisch: **grün** = geht immer · **gelb** = erst, wenn man sich kennt · **rot** = geht keinen was an. Reihum: eine Frage-Karte ziehen, vorlesen, an eine Ampel legen. **Findet eine Person die Karte rot, kommt sie auf Rot.** Rot schlägt Grün.'),
        reden('Warum ist „Wo wohnst du?“ für die einen grün – und für andere rot?')),
      pause(),
      runde('Frage-Paare', '30 Min.', 'zu zweit · wechselnd', 'messages', {
        ziel: 'Mit einer grünen Frage und einmal Nachhaken etwas finden, das man nicht sieht.',
        material: 'die grünen Frage-Karten aus der Ampel, die drei Nachhak-Karten (für jedes Paar), Klebezettel, ein Plakat',
        schritte: [
          'Ihr spielt zu zweit. **Drei Durchgänge, je 5 Minuten** – danach wechseln die Paare. Zieht Karten, bis ihr einen Treffer habt.',
          'A zieht eine grüne Karte und fragt. B antwortet. A hakt **einmal** nach – mit einer Nachhak-Karte: **„Welche?“ · „Wie war das?“ · „Und dann?“**. Dann tauschen.',
          'Ziel jedes Paares: ein **unsichtbarer Treffer** – etwas, das ihr beide habt und man nicht sieht. Er kommt auf einen Klebezettel ans Plakat.',
          '**Letzte 10 Minuten:** Alle zusammen. Findet **drei Treffer, die alle hier haben.**',
        ],
        regeln: ['„Weiter“ gilt immer.', 'Keine Punkte, keine Teams gegeneinander.'],
        zu3: 'Die Leitung ist die vierte Person.',
        notiz: { titel: 'Das haben hier alle gemeinsam:', linien: 2 },
        auswertung: ['Welcher Treffer hat euch überrascht?', 'Welche Frage war die beste – und warum?'],
      }, { danach: [beispiel('So sieht eine Runde aus', ['Mia zieht:', '„Bist du schon mal in den falschen Bus gestiegen?“'], ['Ben:', '„Ja, letzte Woche.“'], ['Mia hakt nach:', '„Und dann?“'], ['Ben:', '„Bin in Echternach gelandet.“'], ['', 'Treffer: Mia ist das auch passiert – mit derselben Linie.'])] }),
    ),
    seite(
      { ...material('15 Frage-Karten, 3 Ampel-Karten, 3 Nachhak-Karten', 4,
        karten(3, 12, 'Die Ampel: ausschneiden und auf den Tisch legen.', [{ t: 'grün', x: 'geht immer' }, { t: 'gelb', x: 'erst, wenn man sich kennt' }, { t: 'rot', x: 'geht keinen was an' }]),
        karten(3, 13, 'Die Frage-Karten: ausschneiden, mischen, verdeckt stapeln.', FRAGEN.map((t) => ({ t: `„${t}“` }))),
        karten(3, 11, 'Die Nachhak-Karten: für jedes Paar einen Satz.', ['„Welche?“', '„Wie war das?“', '„Und dann?“'].map((t) => ({ t })))), wie: 'zu Station 4 und 6' },
      schluss(wer, 'dein Strich vom Anfang', [kreuz('Die Person, an die du bei Station 1 gedacht hast: Weißt du jetzt etwas über sie?', 'ja', 'noch nicht'), strich('Schau auf Station 1. Wie gut kennst du die anderen jetzt?', 'kaum', 'gut')]),
    ),
  )

  /* ---------- Stunde 3 · Ein Team? ---------- */
  const s3 = stunde('Kann man sich auf diese Gruppe verlassen?', ['jemanden sicher lotsen', '„Stopp“ sagen – und auf ein Stopp hören', 'sagen, was du in einer Gruppe brauchst'],
    seite(
      ankommen('dein Vertrauen heute', strich('Wie sehr vertraust du dieser Gruppe?', 'gar nicht', 'ganz'), ...team.moves[1].fragen.slice(0, 1)),
      fall(team, 'Finn und die Bank', [
        kreuzU('Finn hätte Jana gegen die Bank laufen lassen können. Was wäre dann passiert?', 'Alle hätten gelacht – und Jana hätte niemandem mehr vertraut.', 'Nichts.', 'Jana hätte mitgelacht.'),
        kreuzU('Warum ist Finn am Ende stolz?', 'Weil Jana ihm vertraut hat – und er es nicht ausgenutzt hat.', 'Weil er der Schnellste war.', 'Weil alle zugeschaut haben.'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase – ehrliche Antworten nicht bewerten.' }),
      weiter('Der Fall: Finn und die Bank', 2, 'search', reden('Ehrlich: Hättet ihr an Finns Stelle kurz überlegt, ob ihr den Lacher nehmt?', 'Woran merkt man, dass man jemandem vertrauen kann?')),
    ),
    seite(
      st('Bis 20 zählen', '8 Min.', 'alle · im Kreis', 'list-numbers', 'Mitspielen. Niemand darf eine Reihenfolge absprechen – auch nicht mit Blicken.',
        text('Alle schauen auf den Boden. Ihr zählt zusammen bis 20 – **eine Person sagt eine Zahl, ohne Reihenfolge.** Sagen zwei gleichzeitig eine Zahl, geht es von vorn los. Kein Absprechen.'),
        fragen(null, kreuz('Bis wohin seid ihr gekommen?', 'unter 10', '10 bis 19', '20!'))),
    ),
    seite(
      runde('der Blind-Lotse', '35 Min.', 'zu zweit · dann alle', 'route', {
        ziel: 'Sich auf eine Stimme verlassen – und für jemanden verantwortlich sein.',
        material: 'ein weicher Ball, zwei Stühle als Tor; wer mag: eine Augenbinde',
        schritte: [
          'Bildet Paare. Eine Person schließt die Augen (oder schaut auf den Boden), die andere lotst – **nur mit der Stimme.**',
          'Dann tauschen. Jede Person ist einmal Lotse und wird einmal gelotst.',
          'Nach Runde 4: unten ankreuzen.',
        ],
        runden: [
          { t: 'Runde 1 · gehen', x: 'Einmal quer durch den Raum, um zwei Stühle herum.' },
          { t: 'Runde 2 · Ball', x: 'Mit Augen zu den Ball ins Tor rollen. Der Lotse steht an der Seite.' },
          { t: 'Runde 3 · zwei Lotsen', x: 'Zwei Leute lotsen eine Person. Sie müssen sich absprechen.' },
          { t: 'Runde 4 · euer Parcours', x: 'Die Gruppe baut aus Stühlen und Taschen einen Parcours – und lotst die Leitung hindurch.' },
        ],
        regeln: ['**Augen zu ist freiwillig.** Wer nicht will, lotst nur.', 'Alle Handys liegen während der Runde vorne auf dem Tisch.', '**Stopp** heißt: sofort stehen bleiben, Augen auf. Ohne Begründung.', 'Keine Streiche. Wer lotst, trägt die Verantwortung.'],
        zu3: 'Ein Paar ist dran, die dritte Person steht im Tor. Dann wechseln.',
        auswertung: ['Wessen Stimme konntet ihr am besten folgen – und warum?', 'Was hat euer Lotse gut gemacht?'],
      }, { danach: [fragen(null, ...team.moves[0].fragen.slice(0, 2)), beispiel('So kann es klingen', ['Lotse:', 'Zwei kleine Schritte geradeaus. Stopp. Jetzt etwas nach links.'], ['Gelotst:', 'Stopp – ich mach kurz die Augen auf.'], ['Lotse:', 'Klar.'])], leitung: 'Augen zu ist freiwillig. Auf jedes Stopp sofort reagieren – das ist der Kern der Stunde.' }),
    ),
    seite(
      pause(),
      modell(team, 'was ein Team hält', ['users', 'steering-wheel', 'hand-stop'], { zeit: '8 Min.', wie: 'alle · dann allein',
        leitung: 'Vorlesen. Den Check allein ankreuzen, dann gemeinsam auflösen.',
        fragen: [raster('Team-Check: Welche Regel fehlt hier? Ein Kreuz pro Zeile.', ['Jeder zählt', 'Wer führt, trägt', 'Stopp gilt'],
          'Der Schnellste rennt vor. Zwei bleiben zurück.',
          'Beim Lotsen sagt einer zum Spaß „Geradeaus!“ – da steht ein Tisch.',
          'Jemand sagt Stopp. Der andere: „Ach komm, noch kurz!“',
          'Beim Fußball spielt nie jemand zu der Person, die neu ist.')],
        danach: [reden('Welche der drei Regeln fehlt in Gruppen am häufigsten?')] }),
    ),
    seite(
      st('Unser Team', '8 Min.', 'alle', 'flag', 'Den Namen gemeinsam finden. Jede Person malt das Logo in ihr Heft – alle dasselbe oder jede ihr eigenes.',
        fragen(null, { f: 'Wenn diese Gruppe ein Team wäre: Wie heißt es? Schreib den Namen und mal ein Logo.', feld: 34 })),
      schluss(team, 'lotsen lassen?', [kreuz('Schau auf Station 1: Hat sich dein Vertrauen seit dem Lotsen verändert?', 'mehr', 'gleich', 'weniger'), kreuz('Würdest du dich von dieser Gruppe lotsen lassen?', 'ja', 'von manchen', 'noch nicht')]),
    ),
  )
  return [s1, s2, s3]
}

/** Lösungen und Hinweise für die Leitung (eine Liste je Stunde) – Umbau 27.11.2026 */
export const loesungen: string[][] = [
  [
    'Der Fall: 1 – in der letzten Gruppe wurde etwas weitererzählt; 2 – alle drei passen. Toms Platz an der Tür ist ein Schutz – nicht korrigieren.',
    'Modell: die drei Regeln der Ansage. Die Ausnahme „Jemand ist in Gefahr“ klar benennen.',
    'Weiter-Runde: Bei Frage 5 und 6 sagen alle gleichzeitig „Weiter“ – so übt es jede Person einmal ohne Risiko. Große Runde: Aus „Alles wird weitererzählt“ wird „Was hier erzählt wird, bleibt hier“. Regel 6 ist vorgegeben, weil alle abends im selben Klassenchat sind.',
  ],
  [
    'Gruppen-Wette: Es gibt kein Richtig. Die Sprachen bringen fast immer das Gespräch in Gang – wer mehrere Sprachen spricht, ist plötzlich Expertin oder Experte.',
    'Der Fall: Kein Richtig. Fast immer stehen beim Bus oder bei der falschen Nachricht mehr vorn, als man denkt – darum geht es: Gemeinsamkeiten sieht man nicht.',
    'Fragen-Ampel: Es gibt keine feste Lösung. Meist grün: Serie, Schulweg, was man gut kann, Spiel, Bus, Lied. Oft rot: Taschengeld, verliebt, zu Hause, peinlichster Moment. „Wo wohnst du?“ und „Warum bist du in dieser Klasse?“ sind für manche grün, für andere rot – genau darüber reden.',
    'Frage-Paare: Wichtiger als der Treffer ist das Nachhaken („Welche?“, „Wie war das?“).',
  ],
  [
    'Der Fall: jeweils die erste Antwort.',
    'Bis 20 zählen: Selten klappt es beim ersten Mal. Gelingt es, kommt das von Zuhören und Warten – nicht von Absprache.',
    'Blind-Lotse: „Ich habe gelinst“ ist ehrlich, kein Versagen. Runde 4 dreht die Rollen: Die Gruppe trägt die Verantwortung für die Leitung.',
    'Modell: vorrennen → Jeder zählt · Tisch → Wer führt, trägt · „noch kurz“ → Stopp gilt · nie zuspielen → Jeder zählt.',
  ],
]

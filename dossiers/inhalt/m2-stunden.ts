// REAL TALK #02 · GEFÜHLE – vier Stunden (Umbau 27.11.2026 nach fünf jugendlichen Kritikern).
// Roter Faden: übersetzen – Lios zwei Wörter → Noahs „mir egal“ → Linas erstes Signal → der Wut-Satz.
// Stunde 1: die Wort-Leiter in allen Sprachen (Gefühlswörter aus der eigenen Sprache zählen). Stunde 2: Steuerpult, Noah,
// Pult-Wette. Stunde 3: Körper-Labor, Körper-Karte zum Ausmalen, Song-Tipp (der Haltungs-Clip ist raus: Wirkung umstritten,
// und ein abgewertetes Kind bekommt keine Haltungs-Lösung). Stunde 4 (neu): „Wut ist der Deckel“ – Gefühls-Torte und
// der Wut-Übersetzer zum Aufklappen. Höchstens sechs Stationen und eine Pause je Doppelstunde.
// Runde 3 (27.11.2026): Trauer statt Kummer (ein Wort im ganzen Heft), Langeweile am Pult, Verbinden statt drei Schreibsätzen,
// „meine Torte“ raus (zweimal dasselbe Ausmalen), eine Klappkarte statt drei, Klebezettel für die Wörter von zu Hause.
import type { Heft, Stunde } from '../typen'
import { ankommen, beispiel, clip, fall, fragen, fuerDich, karten, kreuz, kreuzU, material, modell, reden, runde, satz, schluss, seite, st, stunde, strich, tabelle, text, torte, umriss, verbinden, weiter, zeile, pause } from './stunden-hilfe'

const GEFUEHLE = (l: string[]) => l.map((t) => ({ t }))

export function stunden(d: Heft): Stunde[] {
  const [wozu, steuer, koerper, alles] = d.tracks
  // Der Clip über das Steuerpult der Gefühle passt zu Stunde 2 („Wer sitzt am Steuer?“), nicht zu Stunde 4.
  steuer.clip = { ...alles.clip!, frage: 'Welches Gefühl würdest du abschaffen – und warum wäre das keine gute Idee?' }
  delete alles.clip
  delete koerper.clip

  /* ---------- Stunde 1 · Wozu der Mist? (umgebaut 27.11.2026) ---------- */
  const s1 = stunde('Wozu sind Gefühle gut – auch die, die nerven?', ['sagen, was Angst, Wut und Trauer dir melden', 'ein Gefühl leiser oder lauter benennen', 'ein Gefühlswort aus deiner Sprache erklären'],
    seite(
      ankommen('ein Wort für heute', zeile('Ein Wort für heute – in jeder Sprache, die du willst. Nur für dich.')),
      fall(wozu, 'Lio hat nur zwei Wörter', [
        kreuzU('Warum sagt Lio nur „beschissen“?', 'Er will frech sein.', 'Er hat nur zwei Wörter für Gefühle.', 'Es ist ihm egal.'),
        { f: 'Welche drei Gefühle hat Lio heute wirklich? Kreise sie ein.', kreis: ['Wut', 'Angst', 'Scham', 'Freude', 'Ekel', 'Neid'] },
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Lio hat nur zwei Wörter', 2, 'search', reden('Welche zwei Wörter benutzt ihr am häufigsten, wenn jemand fragt: „Wie geht’s?“')),
    ),
    seite(
      clip(wozu, 'Wozu Gefühle da sind',
        [kreuzU('Wozu sind Gefühle da?', 'Sie stören nur.', 'Sie melden etwas.', 'Für nichts.')],
        ['Gefühle sind wie ein …', 'Das meldet die Wut:'],
        [kreuzU('Was hilft Lio am meisten?', 'mehr Wörter für Gefühle', 'sich zusammenreißen', 'nichts mehr fühlen')], '12 Min.',
        '00:00 bis 04:57 zeigen. Leichte Sprache, gute Beispiele. Kern: Gefühle sind wie ein Navi. Wut meldet: Eine Grenze wurde überschritten. Trauer zeigt, was wichtig war. Wer genau sagt „Ich bin traurig“ statt „Mir geht’s schlecht“, beruhigt sein Gehirn.'),
      modell(wozu, 'Gefühle sind Nachrichten', ['mail', 'mood-smile', 'tool'], { zeit: '10 Min.', wie: 'alle · dann allein',
        leitung: 'Vorlesen, dann allein verbinden und gemeinsam auflösen.',
        fragen: [verbinden('Jedes Gefühl schickt eine Nachricht. Verbinde.', ['Angst', 'Wut', 'Trauer', 'Ekel', 'Freude'], ['Mehr davon!', 'Pass auf!', 'Halt Abstand!', 'Jemand geht über deine Grenze.', 'Du hast etwas verloren.'])] }),
      pause(),
    ),
    seite(
      runde('die Wort-Leiter in allen Sprachen', '32 Min.', 'alle · am Tisch', 'stairs', {
        ziel: 'Mehr Wörter für Gefühle finden – leise und laute, auf Deutsch und in euren Sprachen.',
        material: 'die sechs Grundgefühle, die 24 Wort-Karten und die Leiter-Karten von der nächsten Seite (ausschneiden), ein Block Klebezettel, Stifte',
        schritte: [
          '**Teil 1 · legen (8 Min.):** Die sechs Grundgefühle liegen auf dem Tisch. Reihum legt jede Person eine Wort-Karte zu dem Grundgefühl, zu dem sie passt. Passt sie zu zweien? Dann dazwischen.',
          '**Teil 2 · die Laut-Leiter (12 Min.):** Legt die Wut-Karten von **leise bis laut** in eine Reihe: genervt – sauer – wütend – rasend. Dann die Angst-Karten: besorgt – nervös – ängstlich – panisch. Fehlt eine Stufe? Schreibt sie auf einen Klebezettel.',
          '**Teil 3 · Wörter von zu Hause (12 Min.):** Jede Person schreibt Gefühlswörter aus ihren Sprachen auf Klebezettel, erklärt jedes in **drei deutschen Wörtern** und legt es an die Leiter.',
          '**Ziel der Gruppe:** ein Gefühlswort, das es auf Deutsch gar nicht gibt.',
        ],
        regeln: ['Jede Sprache zählt. Erklärt in drei Wörtern.', 'Keine Punkte, keine Teams.', 'Niemand muss sagen, wann er ein Gefühl hatte.'],
        zu3: 'Genauso.',
        notiz: { titel: 'Unser Wort, das es auf Deutsch nicht gibt:', linien: 1 },
        auswertung: ['Für welches Gefühl hat eure Sprache ein besseres Wort?', 'Welche Stufe der Leiter kennt ihr am besten?'],
      }, { leitung: 'Sagen Sie: „Jede Sprache zählt.“ Wer nur Deutsch spricht, darf ein Wort aus einer Sprache nehmen, die er ein bisschen kennt – oder eins erfinden.',
        danach: [beispiel('So sieht eine Runde aus', ['Tiago legt:', '„saudade“ – auf Portugiesisch.'], ['Tiago erklärt:', 'vermissen, traurig, schön.'], ['', 'Die Karte kommt zwischen Trauer und Freude. Die Gruppe hat ihr Wort.'])] }),
    ),
    seite(
      material('6 Grundgefühle, 24 Wörter, 8 Leiter-Karten', 6,
        karten(3, 15, 'Die sechs Grundgefühle: ausschneiden und auf den Tisch legen.', GEFUEHLE(['Freude', 'Trauer', 'Angst', 'Wut', 'Ekel', 'Überraschung']), true),
        karten(4, 13, 'Die 24 Wörter: ausschneiden, mischen, verteilen.', GEFUEHLE(['genervt', 'enttäuscht', 'einsam', 'überfordert', 'neidisch', 'beschämt', 'gelangweilt', 'besorgt', 'leer', 'gekränkt', 'stolz', 'erleichtert', 'ruhig', 'dankbar', 'aufgedreht', 'verknallt', 'sicher', 'neugierig', 'panisch', 'sauer', 'angewidert', 'erschrocken', 'traurig', 'nervös']), true),
        karten(4, 13, 'Die Leiter-Karten und leere Karten für eure Wörter.', GEFUEHLE(['wütend', 'rasend', 'ängstlich', 'gereizt', '________', '________', '________', '________']), true)),
    ),
    seite(
      schluss(wozu, 'drei Wörter für Lio', [satz('Die Lehrerin fragt noch einmal: „Was genau?“ Lio könnte sagen:', 'Ich bin'), satz('Schau auf Station 1: Mach dein Wort genauer – mit der Leiter.', 'Genauer:')], ['1', '2', '3']),
    ),
  )

  /* ---------- Stunde 2 · Wer sitzt am Steuer? ---------- */
  const SITUATIONEN = ['Dein bester Freund sagt zum dritten Mal ab.', 'Du wirst vor allen gelobt.', 'Jemand hat in deinen Sachen gewühlt.', 'Morgen ist ein wichtiges Gespräch.', 'Du hast etwas Peinliches geschickt – an die falsche Person.', 'Ihr zieht um. Keiner hat dich gefragt.', 'Jemand lacht, als du reinkommst.', 'Du bekommst etwas geschenkt, das du dir lange gewünscht hast.', 'Dein Handy ist weg.', 'Jemand, den du magst, schreibt nicht zurück.', 'Du sollst vor der Klasse etwas sagen.', 'Jemand isst mit offenem Mund direkt neben dir.']
  const s2 = stunde('Welches Gefühl sitzt bei dir gerade am Steuer?', ['merken, welches Gefühl dich gerade lenkt', 'sagen, wofür Trauer gut ist', '„mir egal“ übersetzen'],
    seite(
      ankommen('dein Pult heute', { f: 'Stell dir vor: Ein Gefühl lenkt dich gerade wie ein Fahrer. Welches? Kreise ein.', kreis: ['Freude', 'Trauer', 'Angst', 'Wut', 'Ekel', 'Langeweile'] }),
      modell(steuer, 'das Steuerpult im Kopf', ['steering-wheel', 'arrows-shuffle', 'heart-handshake'], { zeit: '10 Min.', wie: 'alle · dann allein', intro: 'In deinem Kopf steht ein Steuerpult. Immer sitzt ein Gefühl daran – und lenkt, was du hörst und was du tust.',
        leitung: 'Vorlesen. Die Übung allein, dann zwei, drei Antworten hören: Derselbe Satz klingt mit Wut plötzlich wie ein Angriff.',
        fragen: [verbinden('Die Lehrerin sagt: „Bleib nach der Stunde kurz da.“ Wer am Steuer sitzt, denkt anders. Verbinde.', ['Wut am Steuer', 'Angst am Steuer', 'Freude am Steuer'], ['„Vielleicht lobt sie mich.“', '„Was will die schon wieder?!“', '„Oh nein, was hab ich gemacht?“'])],
        danach: [reden('Welches Gefühl sitzt bei euch montagmorgens am Steuer?')] }),
    ),
    seite(
      clip(steuer, 'Welches Gefühl darf bleiben?',
        [kreuzU('Welches Gefühl würdest du am liebsten abschaffen?', 'Angst', 'Wut', 'Trauer', 'Langeweile', 'keins'), kreuzU('15 Minuten allein, nichts zu tun – nur ein Knopf für einen kleinen Stromschlag. Was glaubst du?', 'Keiner drückt.', 'Viele drücken.')],
        ['Diese Gefühle haben eine Aufgabe:', 'So ging der Versuch mit dem Knopf aus:', 'Dafür ist Langeweile gut:'],
        [kreuz('Würdest du dein Gefühl immer noch abschaffen?', 'ja', 'nein', 'weiß nicht'), zeile('Wofür ist Trauer gut? (Tipp: Was zeigt er dir?)')], '15 Min.',
        'Nur 02:29 bis 05:58 zeigen – davor und danach geht es um Synchronsprechen. Kern: Es gibt keine schlechten Gefühle; Angst, Wut und Langeweile haben eine Aufgabe. Langeweile ist wie ein Kompass und bringt auf neue Ideen. Versuch: Viele Männer und ein Viertel der Frauen gaben sich lieber einen Stromschlag, als sich 15 Minuten zu langweilen.'),
      fall(steuer, 'Noah und „mir egal“', [
        kreuzU('Was heißt „mir egal“ bei Noah wirklich?', 'Es ist ihm wirklich egal.', 'Es ist ihm zu viel.', 'Er will cool wirken.'),
        { f: 'Wer saß bei Noah die ganze Zeit am Steuer? Kreise ein.', kreis: ['Trauer', 'Wut', 'Freude', 'Angst', 'Ekel'] },
        kreuzU('Was hätte Noah geholfen?', 'noch länger zocken', 'jemandem sagen, dass er traurig ist', 'gar nichts fühlen'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Noah und „mir egal“', 4, 'search', reden('Kennt ihr Leute, die immer „mir egal“ sagen? Was steckt oft dahinter?')),
    ),
    seite(
      pause(),
      runde('die Pult-Wette', '30 Min.', 'alle · am Tisch', 'cards', {
        ziel: 'Merken, dass dieselbe Situation bei jedem ein anderes Gefühl ans Steuer holt.',
        material: 'die sechs Gefühle und die 12 Situations-Karten von der nächsten Seite (ausschneiden), drei Münzen oder Büroklammern pro Person',
        schritte: [
          'Die sechs Gefühle liegen im Halbkreis auf dem Tisch: Das ist das Steuerpult.',
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
        auswertung: ['Wo hat die Gruppe ganz anders gelegt, als ihr gedacht habt?', 'Bei welcher Situation lag Trauer vorn? Wozu ist er dann gut?'],
      }, { danach: [beispiel('So kann es klingen', ['Leitung liest:', '„Dein Handy ist weg.“'], ['', 'Drei Münzen landen bei Angst, eine bei Wut.'], ['Finn:', 'Bei mir ist das Wut. Ich weiß genau, wer es war.'])] }),
    ),
    seite(
      material('6 Gefühle und 12 Situationen', 6,
        karten(6, 16, 'Das Steuerpult: ausschneiden und im Halbkreis legen.', GEFUEHLE(['Freude', 'Trauer', 'Angst', 'Wut', 'Ekel', 'Langeweile']), true),
        karten(3, 19, 'Die Situationen: ausschneiden, mischen, verdeckt stapeln.', SITUATIONEN.map((t) => ({ t })))),
      schluss(steuer, 'Noahs Bruder fragt', [kreuzU('Der kleine Bruder fragt: „Bist du traurig?“ Was könnte Noah diesmal sagen?', '„Mir egal.“', '„Ja. Ein bisschen.“', 'nichts'), { f: 'Schau auf Station 1: Wer sitzt jetzt bei dir am Steuer?', kreis: ['Freude', 'Trauer', 'Angst', 'Wut', 'Ekel', 'Langeweile'] }], ['1', '2', '3', '4', '5']),
    ),
  )

  /* ---------- Stunde 3 · Körper-Alarm (umgebaut 27.11.2026) ---------- */
  // Raus: Modell-Raster mit Fachwörtern, Haltungs-Clip, Bodyscan. Neu: die Körper-Karte zum Ausmalen.
  const s3 = stunde('Woran merkst du ein Gefühl, bevor es knallt?', ['sagen, wo im Körper sich Wut und Angst melden', 'dein erstes Signal finden', 'einen Plan für dein erstes Signal haben'],
    seite(
      ankommen('dein Körper gerade', strich('Wie ruhig ist dein Körper gerade?', 'unruhig', 'ruhig'), { f: 'Wo merkst du Aufregung zuerst? Kreise ein.', kreis: ['Bauch', 'Brust', 'Hals', 'Hände', 'Kopf', 'weiß nicht'] }),
      st('Erst machen: das Körper-Labor', '12 Min.', 'alle gleichzeitig', 'flask', 'Alle machen gleichzeitig mit, auch Sie – so schaut niemand zu. Nach jedem Experiment zehn Sekunden still.',
        fragen('Vier kurze Experimente. Alle machen sie **gleichzeitig** – niemand schaut zu. Nach jedem: zehn Sekunden still stehen und spüren.', ...koerper.moves[0].fragen)),
    ),
    seite(
      st('Die Körper-Karte', '15 Min.', 'allein · dann alle', 'palette', 'Still ausmalen lassen. Danach können Sie das bekannte Bild der „Körperkarten der Gefühle“ zeigen (Nummenmaa u. a., 2014): Bei Wut leuchten bei fast allen Kopf, Brust und Arme. Keiner zeigt seine Karte – alle vergleichen nur mit dem Bild.',
        text('Denk an Wut. Dann an Angst. **Rot** malst du aus, wo es heiß oder stark wird. **Blau**, wo es kalt oder schwach wird.'),
        fragen(null, umriss('Wut', 'Wut: rot = heiß · blau = kalt'), umriss('Angst', 'Angst: rot = heiß · blau = kalt')),
        reden('Wo sitzt Wut bei dir zuerst – bevor du etwas sagst?')),
    ),
    seite(
      fall(koerper, 'Lina lächelt', [
        { f: 'Welche Signale sendet Linas Körper? Kreise alle ein.', kreis: ['Stein im Magen', 'kalte Hände', 'Zähne mahlen', 'Zittern', 'Hunger', 'Müdigkeit'] },
        kreuzU('Lina merkt den Stein im Magen. Was kann sie tun?', 'rausgehen und es jemandem sagen', 'weiter lächeln', 'die Zähne zusammenbeißen'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase – nur erzählen lassen, wer mag.' }),
      weiter('Der Fall: Lina lächelt', 4, 'search', reden('Kennt ihr das: lächeln, obwohl es innen ganz anders aussieht?')),
      pause(),
    ),
    seite(
      runde('der Song-Tipp', '25 Min.', 'alle', 'music', {
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
      schluss(koerper, 'dein erstes Signal', [
        kreuz('Wenn dein erstes Signal kommt – was machst du dann?', 'lang ausatmen', 'kurz rausgehen', 'Fäuste anspannen, loslassen', 'jemandem Bescheid sagen'),
        satz('Dein Plan:', 'Wenn ich … merke, dann …'),
      ], ['1', '2']),
    ),
  )

  /* ---------- Stunde 4 · Wut ist der Deckel (neu 27.11.2026) ---------- */
  // Ersetzt Modell, Mischpult-Regler und „Chips setzen“ (die Pult-Wette aus Stunde 2 mit anderen Karten).
  const WUT: [string, string][] = [['„Lass mich!“', 'nicht in die Mannschaft gewählt'], ['„Mir doch egal!“', 'Papa kommt nicht zum Spiel'], ['„Lacht nicht!“', 'Fehler vor allen'], ['„Dann geh doch!“', 'der beste Freund zieht weg'], ['„Nie sagt mir jemand was!“', 'morgen ein Termin, keiner erklärt was'], ['„Ist doch egal, die Note!“', 'alle haben eine bessere Note'], ['„Hau ab!“', 'die beste Freundin sitzt jetzt bei einer anderen'], ['„Du nervst!“', 'die kleine Schwester darf mit, du nicht']]
  const DARUNTER = ['Scham', 'Angst', 'Trauer', 'Enttäuschung', 'Eifersucht', 'hilflos']
  const s4 = stunde('Was sitzt unter der Wut?', ['zwei Gefühle gleichzeitig nennen', 'sagen, wie stark ein Gefühl ist – von 0 bis 10', 'einen wütenden Satz übersetzen'],
    seite(
      ankommen('etwas, das dich aufgeregt hat', kreuzU('Hast du letzte Woche dein erstes Signal erwischt?', 'ja, und meinen Plan probiert', 'nur das Signal erwischt', 'nicht dran gedacht'), zeile('Was hat dich zuletzt aufgeregt? Ein Stichwort reicht.')),
      st('Erst machen: der Zwillings-Check', '6 Min.', 'zu zweit · Rücken an Rücken', 'users', 'Fragen: Bus fährt weg (wie genervt?) · Morgen ist frei (wie froh?) · Akku 1 % (wie nervös?) · Jemand sitzt auf deinem Platz (wie sauer?) · Dein Lieblingslied läuft (wie gut gelaunt?). Schnell hintereinander.',
        text('Zu zweit Rücken an Rücken. Die Leitung fragt: „Der Bus fährt dir vor der Nase weg. Wie genervt bist du, von 0 bis 10?“ Auf „drei“ Finger zeigen und umdrehen. **Gleiche Zahl = Zwilling.**'),
        fragen(null, kreuz('Wie oft wart ihr Zwillinge?', '0', '1–2', '3–5'))),
      fall(alles, 'Ines zieht um', [
        torte('Teil den Kreis in Stücke – so groß wie Ines’ Gefühle. Mal aus: **Freude gelb · Wut rot · Trauer blau · Angst grau.**', 'Ines’ Torte'),
        kreuzU('Alle sagen: „Freu dich doch!“ Muss Ines sich entscheiden?', 'Nein. Alle Gefühle sind echt.', 'Ja. Sie übertreibt.'),
      ], { zeit: '12 Min.', leitung: 'Vorlesen. Sagen Sie: „Es gibt keine richtige Torte.“ Der Fall kann eigene Erfahrungen berühren – niemand muss erzählen.' }),
    ),
    seite(
      pause(),
      runde('der Wut-Übersetzer', '42 Min.', 'alle · am Tisch', 'language', {
        ziel: 'Hinter einem wütenden Satz finden, was darunter sitzt – und einen eigenen Übersetzer bauen.',
        material: 'die 8 Wut-Karten, die 6 Darunter-Karten (für jede Person einen Satz) und die Übersetzer-Karten von der nächsten Seite (ausschneiden), Stifte',
        schritte: [
          '**Teil 1 · darunter (22 Min.):** Alle acht Wut-Karten, eine nach der anderen. Die Leitung liest eine vor – den lauten Satz und was passiert ist. Alle legen **gleichzeitig und verdeckt** eine Darunter-Karte. Auf „drei“ decken alle auf. Dann: Was hilft hier?',
          '**Teil 2 · bauen (10 Min.):** Jede Person baut **einen Übersetzer**: eine Klappkarte. Oben steht ein lauter Satz – eine Wut-Karte oder dein eigener. Unten steht, was darunter ist. Die untere Hälfte knickst du nach hinten.',
          '**Teil 3 · aufklappen (5 Min.):** Wer mag, lässt die anderen eine Karte aufklappen.',
        ],
        regeln: ['Wut ist echt. Wir schauen nur, was noch drunter ist.', 'Keine Punkte. Niemand muss eine eigene Geschichte erzählen.'],
        zu3: 'Genauso.',
        notiz: { titel: 'Am häufigsten lag unter der Wut:', linien: 1 },
        auswertung: ['Was ist leichter zu zeigen – die Wut oder das darunter?', 'Welche Karte hat euch überrascht?'],
      }, { danach: [beispiel('So sieht eine Runde aus', ['Leitung liest:', '„Lass mich!“ – nicht in die Mannschaft gewählt.'], ['', 'Zwei legen „Scham“, einer „Trauer“, einer „Enttäuschung“.'], ['Mia, auf ihrer Klappkarte:', 'Oben: „Lass mich!“ – unten: „Ich schäm mich, dass mich keiner wollte.“'])] }),
    ),
    seite(
      material('8 Wut-Karten, Darunter-Karten, Übersetzer', 5,
        karten(2, 15, 'Die Wut-Karten: ausschneiden, mischen, verdeckt stapeln.', WUT.map(([t, x]) => ({ t, x }))),
        karten(6, 11, 'Die Darunter-Karten: ein Satz pro Person – so oft drucken, wie ihr seid.', GEFUEHLE(DARUNTER), true),
        karten(3, 26, 'Übersetzer: einer pro Person. Oben der laute Satz, unten das, was darunter ist. Die untere Hälfte nach hinten knicken.', [1, 2, 3].map(() => ({ t: 'oben: „______________“', x: 'unten: Ich bin auch … ______________' })))),
      schluss(alles, 'unter deiner Wut', [satz('Schau auf Station 1: Was dich aufgeregt hat –', 'Ich war nicht nur sauer, ich war auch')]),
    ),
  )
  return [s1, s2, s3, s4]
}

/** Lösungen für die Leitung – passend zu den Stationen oben (Umbau 27.11.2026) */
export const loesungen: string[][] = [
  [
    'Der Fall: Lio hat nur zwei Wörter für Gefühle. Heute sind es drei Gefühle: Wut (auf den Bruder), Angst (vor dem Gespräch), Scham (wegen gestern).',
    'Clip: Gefühle sind wie ein Navi. Wut meldet: Eine Grenze wurde überschritten. Trauer zeigt, was wichtig war. Ein Gefühl genau benennen beruhigt das Gehirn. Danach: mehr Wörter für Gefühle.',
    'Das Modell: Angst – Pass auf! · Wut – Jemand geht über deine Grenze · Trauer – Du hast etwas verloren · Ekel – Halt Abstand! · Freude – Mehr davon!',
    'Wort-Leiter: Wut von leise bis laut: genervt – gereizt – sauer – wütend – rasend. Angst: besorgt – nervös – ängstlich – panisch. Wörter aus anderen Sprachen gehören an die Leiter, wo die Gruppe sie hinlegt. Beispiele ohne deutsches Wort: „saudade“ (Portugiesisch: schön-traurig vermissen), „dépaysé“ (Französisch: fremd, nicht zu Hause).',
    'Schluss: zum Beispiel „Ich bin sauer, ich habe Angst vor morgen und ich schäme mich.“',
  ],
  [
    'Das Modell: keine richtigen Antworten – mit Wut am Steuer klingt der Satz nach Ärger, mit Angst nach Gefahr, mit Freude neutral.',
    'Clip: Keine schlechten Gefühle – Angst, Wut, Langeweile haben eine Aufgabe. Versuch: 67 % der Männer und 25 % der Frauen drückten lieber den Stromschlag-Knopf, als sich 15 Minuten zu langweilen. Langeweile ist wie ein Kompass. Kummer zeigt, was wichtig war, und holt Hilfe.',
    'Der Fall: „Mir egal“ heißt bei Noah: Es ist ihm zu viel. Am Steuer saß die ganze Zeit Kummer. Geholfen hätte: jemandem sagen, dass er traurig ist.',
    'Pult-Wette: Es gibt keine richtige Lösung. Wichtig ist der Moment, in dem die Münzen weit auseinanderliegen: gleiche Situation, anderes Gefühl.',
  ],
  [
    'Körper-Labor: 1 Sprint – Herz/Atem, Hitze (wie Angst oder Wut); 2 Anspannen – Muskeln (wie Wut); 3 Zeitlupe – Schwere (wie Trauer); 4 Arme hoch und strecken – groß, stark (wie Freude, Stolz).',
    'Körper-Karte: Viele malen bei Wut Kopf, Brust und Arme rot, bei Angst Brust und Bauch rot und Hände oder Beine blau. Jede Karte ist richtig.',
    'Der Fall: Stein im Magen, kalte Hände, Zähne mahlen, Zittern. Was hilft: rausgehen und es jemandem sagen. Erstes Signal: der Stein im Magen.',
    'Song-Tipp: kein Richtig oder Falsch.',
  ],
  [
    'Der Fall: Freude, Wut, Trauer und Angst – alle vier sind echt. Ines muss sich nicht entscheiden. Jede Torte ist richtig.',
    'Wut-Übersetzer: keine feste Lösung. Häufig: „Lass mich!“ – Scham · „Mir doch egal!“ – Enttäuschung oder Trauer · „Lacht nicht!“ – Scham · „Dann geh doch!“ – Trauer · „Nie sagt mir jemand was!“ – Angst oder hilflos · „Ist doch egal, die Note!“ – Scham · „Hau ab!“ – Eifersucht · „Du nervst!“ – Eifersucht oder Enttäuschung.',
  ],
]

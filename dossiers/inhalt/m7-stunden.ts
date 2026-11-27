// REAL TALK #07 · NETZ – drei Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 ist ein Wettkampf der Gruppe gegen den Algorithmus (Aussagen und Becherturm), Stunde 2 ein Lege-Spiel „Bevor ich
// sende“, Stunde 3 ein Check von Schlagzeilen. Alle Karten stehen im Heft; es braucht keine vorbereiteten Bilder.
// Umbau 27.11.2026 nach fünf jugendlichen Kritikern: höchstens acht Stationen mit Pause, keine Punkte „Gruppe gegen
// Algorithmus“ mehr (der Ping-Turm ist das Experiment), keine doppelten Aufgaben. Stunde 2: die Versteck-Kette (statt
// der Screenshot-Kette, die das Gegenteil bewies), Jana wird beim Zocken angeschrieben, neue Station „Die Handgriffe“.
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, beispiel, blasen, clip, fall, fragen, fuerDich, karten, kennstDu, kreuz, kreuzU, material, modell, reden, runde, satz, schluss, seite, st, stimmtDas, stunde, tabelle, text, verbinden, weiter, pause } from './stunden-hilfe'

const kreis = (f: string, ...l: string[]): Frage => ({ f, kreis: l })

export function stunden(d: Heft): Stunde[] {
  const [scroll, immer, fake] = d.tracks

  /* ---------- Stunde 1 · Wer scrollt wen? ---------- */
  const AUSSAGEN = ['Was ich in einer privaten Gruppe schicke, bleibt privat.', 'Mein Feed sieht aus wie der meiner Freunde.', 'Die App verdient Geld, wenn ich länger bleibe.', 'Der nächste Clip startet von selbst, damit ich nicht aufhöre.', 'Der Algorithmus zeigt mir nur, was mir guttut.', 'Die meisten Fotos im Netz sind beim ersten Versuch entstanden.', 'Benachrichtigungen kann man ausschalten.', 'Wer sich viel vergleicht, fühlt sich oft schlechter.']
  const s1 = stunde('Wer entscheidet, wann du aufhörst – du oder die App?', ['erklären, womit eine Gratis-App Geld verdient', 'drei Tricks nennen, die dich am Handy halten', 'einen Wenn-dann-Plan für deinen schwierigsten Moment schreiben'],
    seite(
      ankommen('dein Morgen', kreuz('Wann greifst du morgens zuerst zum Handy?', 'noch im Bett', 'beim Frühstück', 'auf dem Weg', 'später'), kreuz('Wer entscheidet, wann du aufhörst?', 'ich', 'die App', 'mal so, mal so')),
    ),
    seite(
      fall(scroll, 'Sami will nur kurz nachschauen', [
        kreuzU('Wer hat entschieden, wann Schluss ist?', 'die App: Der nächste Clip startet von selbst.', 'Sami'),
        kreuzU('Sami sagt: „Ich hab’s im Griff.“ Stimmt das für diesen Abend?', 'Nein. Er wollte kurz schauen – es wurden zweieinhalb Stunden.', 'Ja.'),
      ], { zeitleiste: [['23:10', '„Nur kurz nachschauen.“'], ['dazwischen', 'Ein Clip, noch einer, der nächste startet von selbst.'], ['1:40', 'Augen brennen. Null Erinnerung.']], leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Sami will nur kurz nachschauen', 2, 'search', reden('Wann sagt ihr „nur kurz“ – und wie lange wird es wirklich?')),
      st('Erst machen: die Wette', '6 Min.', 'allein', 'device-mobile', 'Wer kein Handy dabeihat oder nicht nachschauen mag, schätzt nur. Niemand zeigt seine Zahl.',
        fragen(scroll.moves[0].kontext ?? null, scroll.moves[0].fragen[0])),
    ),
    seite(
      clip(scroll, 'Warum Aufhören so schwer ist', [kreuzU('Warum fällt Aufhören so schwer?', 'Die App ist so gebaut.', 'Ich bin zu schwach.'), kreuz('Wann fällt dir Aufhören am schwersten?', 'abends im Bett', 'nach der Schule', 'wenn mir langweilig ist')], ['Ein Trick der Apps:', 'Das passiert im Kopf:', 'Das hat mich überrascht:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Welcher Trick hat Sami erwischt?', 'Der nächste Clip startet von selbst.', 'keiner')]),
      pause(),
    ),
    seite(
      runde('gegen den Algorithmus', '25 Min.', 'alle · am Tisch und im Raum', 'robot', {
        ziel: 'Als Gruppe gegen die Tricks der Apps antreten – erst mit dem Kopf, dann mit den Händen.',
        material: 'die 8 Aussage-Karten von der nächsten Seite (ausschneiden), zwei Zettel „stimmt“ und „stimmt nicht“, eine Münze pro Person; 60 Plastikbecher, ein Handy mit Intervall-Timer (z. B. Metronom-App)',
        schritte: [
          '**Teil 1 · Aussagen (5 Min.):** Eine Karte wird vorgelesen. Alle legen gleichzeitig ihre Münze auf „stimmt“ oder „stimmt nicht“. Die Leitung löst auf. Nicht zählen.',
          '**Teil 2 · der Ping-Turm:** Die ganze Gruppe baut 90 Sekunden einen Becherturm. Zählt die Becher.',
          '**Durchgang 2:** Alle zehn Sekunden pingt das Handy an der Wand. Reihum läuft eine Person hin und tippt es an. Zählt wieder.',
          '**Durchgang 3:** Das Handy liegt stumm in einer Schachtel. In welchem Durchgang war der Turm am höchsten?',
        ],
        regeln: ['Keine Punkte. Gezählt werden nur die Becher – es ist ein Experiment.'],
        zu3: 'Genauso. Die Leitung stellt den Wecker und zählt.',
        wertung: { kopf: ['Becher', 'ohne Ping', 'mit Ping', 'Handy in der Schachtel'], zeilen: ['unser Turm'] },
        notiz: { titel: 'Diese Aussage hat uns am meisten überrascht:', linien: 1 },
        auswertung: ['Was hat der Ping mit eurem Turm gemacht?', 'Wo liegt euer Handy, wenn ihr etwas schaffen wollt?'],
      }, { leitung: 'Lösung Teil 1: Es stimmen die Karten 3, 4, 7 und 8. Intervall-Timer auf zehn Sekunden stellen.', danach: [beispiel('So kann es klingen', ['Leitung liest:', '„Der nächste Clip startet von selbst, damit ich nicht aufhöre.“'], ['', 'Vier Münzen auf „stimmt“, eine auf „stimmt nicht“.'], ['Finn:', 'Genau der Trick hat Sami erwischt.'])] }),
      fuerDich('mein Wenn-dann', '8 Min.', fragen(scroll.moves[1].kontext ?? null, ...scroll.moves[1].fragen)),
    ),
    seite(
      material('8 Aussagen', 6, karten(2, 17, 'Ausschneiden, mischen, verdeckt stapeln. Die Nummer gehört dazu.', AUSSAGEN.map((t, i) => ({ t, marke: `Karte ${i + 1}` })))),
      schluss(scroll, 'Sami um 23:10', [kreuzU('Sami will „nur kurz nachschauen“. Welcher Plan hätte ihm geholfen?', 'Wenn es 23 Uhr ist, dann liegt das Handy im Flur.', '„Ich höre einfach früher auf.“'), kreuz('Schau auf Station 1: Wer entscheidet, wann du aufhörst?', 'ich', 'die App', 'mal so, mal so')], ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']),
    ),
  )

  /* ---------- Stunde 2 · Für immer online ---------- */
  const SENDEN = ['ein lustiges Foto von einem Freund – ungefragt', 'einen Screenshot aus einem privaten Chat', 'meinen Standort an jemanden aus dem Netz', 'ein Selfie, auf dem man meine Schule erkennt', 'ein Foto von meinem Essen', 'ein Bild von mir im Schlafanzug', 'die Adresse einer Freundin', 'ein Meme', 'ein Foto von der Klassenliste', 'ein Video, in dem jemand hinfällt', 'ein Foto von meinem Hund', 'mein Passwort an meinen besten Freund']
  const DRUCK = ['„Vertraust du mir nicht?“', '„Wenn du mich magst, machst du das.“', '„Ich sag’s sonst allen.“', '„Dachte, du bist anders.“', '„Schickst du mir die Hausaufgaben?“', '„Schick mal ein Foto vom Konzert!“', '„Okay, dann nicht. Alles gut.“', '„Darf ich das posten?“']
  const s2 = stunde('Was passiert mit dem, was du einmal geschickt hast?', ['erklären, warum „nur für dich“ im Netz nicht gilt', 'Druck von einer normalen Bitte unterscheiden', 'sagen, was du tust, wenn etwas schiefgeht'],
    seite(
      st('Ankommen: senden – und dein Plan', '5 Min.', 'allein · dann alle', 'door-enter', 'Erst still ankreuzen. Dann eine Minute: Was hat beim Wenn-dann geholfen, was nicht? Keine Zahlen nennen. Bei 0 Haken: Plan kleiner machen, nicht aufgeben.',
        fragen('Bevor es losgeht – nur für dich. Frage 2 brauchst du am Ende noch einmal.', kreuz('Dein Wenn-dann aus Stunde 1: Wie viele Haken hast du?', 'keinen', '1 bis 3', '4 bis 7', 'vergessen'), kreuz('Fragst du, bevor du ein Foto von jemandem postest?', 'immer', 'manchmal', 'nie'))),
      st('Erst machen: die Versteck-Kette', '10 Min.', 'alle', 'eye-off', 'Sie malen das Bild und suchen selbst – niemand muss allein vor der Gruppe suchen. Vorher heimlich eine Person bitten, ihre Kopie einzustecken. Am Ende fragen: Wie viele fehlen – und wo ist die letzte?',
        text('Die Leitung malt eine **Strichfigur mit Clownsnase** auf einen Klebezettel. Alle zeichnen sie in 15 Sekunden ab und **verstecken ihre Kopie im Raum.** Dann hat die Leitung 60 Sekunden, um alle Kopien zurückzuholen. Eine Person steckt ihre Kopie heimlich ein.'),
        fragen(null, kreuz('Hat sie alle Kopien gefunden?', 'ja', 'nein'))),
      fall(immer, 'Jana und der Knoten im Bauch', [
        kreuzU('Was ist „Vertraust du mir nicht?“', 'Druck', 'ein Kompliment'),
        kreuzU('Was macht Jana jetzt am besten?', 'nichts schicken, Screenshot, blockieren, jemandem zeigen', 'ein Foto ohne Gesicht schicken', 'mit ihm diskutieren'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
    ),
    seite(
      weiter('Der Fall: Jana und der Knoten im Bauch', 3, 'search', reden('Wie klingt Druck – und wie klingt eine normale Bitte?')),
      modell(immer, 'drei Dinge, die du wissen musst', ['lock-open', 'alert-triangle', 'heart-handshake'], { zeit: '5 Min.', wie: 'alle',
        leitung: 'Nur vorlesen. Punkt 3 deutlich sagen: Wer ein Bild weitergibt, hat etwas falsch gemacht – nicht die Person auf dem Bild.',
        danach: [reden('Was würdet ihr einer Freundin sagen, wenn ein Bild von ihr herumgeht?')] }),
      pause(),
    ),
    seite(
      runde('bevor ich sende', '25 Min.', 'alle · am Tisch', 'send', {
        ziel: 'Vor dem Senden zwei Fragen stellen: Wem gehört das? Und was könnte jemand damit machen?',
        material: 'die 12 Sende-Karten und 8 Satz-Karten von der nächsten Seite (ausschneiden), drei Zettel „sende ich“, „kommt darauf an“, „lieber nicht“, eine Münze pro Person',
        schritte: [
          '**Teil 1 · senden?** Eine Sende-Karte wird vorgelesen. Alle legen gleichzeitig ihre Münze auf einen der drei Zettel.',
          'Liegen die Münzen auseinander, stellt die Gruppe die zwei Fragen: **Wem gehört das Bild oder die Info? Wer könnte damit etwas anfangen, das du nicht willst?**',
          '**Teil 2 · okay oder Druck?** Die acht Satz-Karten reihum ziehen und zu „okay“ oder „Druck“ legen. Die Gruppe entscheidet gemeinsam.',
        ],
        regeln: ['Niemand muss sagen, was er selbst schon geschickt hat.', 'Wem so etwas passiert ist, der ist nicht schuld.'],
        zu3: 'Genau so. Die Leitung legt mit.',
        auswertung: ['Bei welcher Karte lagen eure Münzen am weitesten auseinander?', 'Welcher Satz klingt nett – und ist trotzdem Druck?'],
      }, { danach: [beispiel('So kann es klingen', ['Leitung liest:', '„ein Selfie, auf dem man meine Schule erkennt“'], ['', 'Zwei Münzen auf „sende ich“, drei auf „lieber nicht“.'], ['Sara:', 'Wer könnte damit etwas anfangen? Dann weiß jeder, wo ich morgens bin.'])], leitung: 'Wichtig: nicht allein bleiben. Beweise sichern heißt: Chat, Profil und Drohungen screenshotten – ein Nacktbild selbst nicht speichern oder weiterschicken (kann strafbar sein). Hilfe: Kanner-Jugendtelefon 116 111, BEE SECURE Helpline 8002 1234, Polizei 113.' }),
    ),
    seite(
      material('12 Sende-Karten und 8 Sätze', 6,
        karten(3, 17, 'Die Sende-Karten: ausschneiden, mischen, verdeckt stapeln.', [...SENDEN].sort((a, b) => a.length - b.length).map((t) => ({ t }))),
        karten(4, 16, 'Die Sätze: ausschneiden und mischen.', [...DRUCK].sort((a, b) => a.length - b.length).map((t) => ({ t })))),
    ),
    seite(
      st('Die Handgriffe', '15 Min.', 'alle', 'hand-click', 'Zeigen Sie auf Ihrem eigenen Handy, wo Screenshot, Blockieren und Melden sind. Wer will, sucht die Knöpfe still auf dem eigenen Handy – niemand schaut auf das Handy eines anderen.',
        blasen(['Unbekannt', '„Schick mir das Foto. Sonst zeig ich allen, was du geschrieben hast.“']),
        text('So eine Nachricht kommt an. **Nicht diskutieren, nicht antworten.** Schreib die Nummern 1 bis 4 davor: Was machst du zuerst? Es gibt eure Reihenfolge – alle vier gehören dazu.'),
        tabelle('14mm auto', ['Nr.', 'Handgriff'], [['', 'Screenshot machen'], ['', 'blockieren'], ['', 'melden'], ['', 'jemandem zeigen, dem ich vertraue']], 9),
        reden('Wem würdest du es zuerst zeigen?')),
      schluss(immer, 'Janas Daumen', [satz('Wenn bei mir etwas schiefgeht – Hilfe: SePAS in der Schule · BEE SECURE 8002 1234 · Kanner-Jugendtelefon 116 111 · in Gefahr 112.', 'Als Erstes sage ich es:'), kreuz('Schau auf Station 1: Fragst du ab jetzt, bevor du ein Foto von jemandem postest?', 'ja', 'manchmal', 'nein')], ['gefragt']),
    ),
  )

  /* ---------- Stunde 3 · Echt oder fake? ---------- */
  const MIT = ['SCHOCK!!! Schule ab Montag VERBOTEN – teilt das, bevor es gelöscht wird!!!', 'Ein Arzt verrät: Dieses Getränk macht dich in drei Tagen schlau.', 'Insider packt aus: Alle Handys werden nachts abgehört!', 'Nur heute: Gratis-Handy für die ersten 100, die diesen Link teilen.', 'SKANDAL! Lehrer verdienen heimlich das Zehnfache!!!', 'Mein Cousin kennt einen bei der Polizei: Ab morgen Schulbus nur noch mit Ausweis!!!']
  const OHNE = ['Die Stadt sperrt die Brücke ab Montag für zwei Wochen. Quelle: Stadtverwaltung.', 'Der Bus 12 fährt in den Ferien nur jede halbe Stunde, teilt das Busunternehmen mit.', 'Eine Uni hat 2000 Jugendliche befragt: Wer länger schläft, lernt leichter. Die Studie ist verlinkt.', 'Schulfest am 12. Juni – das Programm steht auf der Seite der Schule.', 'Der Wetterdienst warnt vor Gewitter am Abend.', 'Ab nächster Woche gibt es in der Kantine täglich ein vegetarisches Essen, sagt die Schulleitung.']
  const s3 = stunde('Woran merkst du, dass etwas nicht stimmt?', ['sechs Warnzeichen für Fakes nennen', 'die zwei Fragen stellen: Wer sagt das? Wer berichtet noch darüber?', 'erst bremsen, dann teilen – oder nicht'],
    seite(
      ankommen('dein Daumen', kreuz('Erkennst du ein gefälschtes Bild sofort?', 'ja', 'meistens', 'nein'), kreuz('Hast du schon mal etwas geteilt, das nicht stimmte?', 'ja', 'nein', 'weiß nicht')),
      fall(fake, 'Tom und das Bild vom Lehrer', [
        kreuzU('Woran hat Tom das Fake erkannt?', 'an einer zweiten Quelle: Der Lehrer ist auf Klassenfahrt.', 'am Bild – es sah falsch aus.'),
        kreuzU('Warum war das Fake schneller als die Wahrheit?', 'Es macht ein starkes Gefühl. Der Daumen ist schneller als der Kopf.', 'Weil es stimmt.'),
      ], { leitung: 'Vorlesen. Erst ankreuzen, dann die Sprechblase.' }),
      weiter('Der Fall: Tom und das Bild vom Lehrer', 2, 'search', reden('Was habt ihr zuletzt gesehen, das zu krass war, um wahr zu sein?')),
    ),
    seite(
      modell(fake, 'so arbeiten Fakes', ['robot', 'flame', 'help-circle'], { wie: 'alle · dann allein',
        leitung: 'Vorlesen, dann allein verbinden und auflösen.',
        fragen: [verbinden('Was passt zu welchem Punkt? Verbinde.', ['Ein Video: Ein Sänger sagt Sätze, die er nie gesagt hat.', '„SKANDAL!!! Teilt das, bevor es gelöscht wird!“', 'Du findest die Meldung auch bei der Stadt und in der Zeitung.'], ['Zwei Fragen', 'KI kann fälschen', 'Fakes wollen ein Gefühl'])],
        danach: [reden('Welches Gefühl bringt euch am schnellsten zum Teilen?')] }),
      clip(fake, 'KI-Bilder erkennen', [kreuzU('Woran erkennt man ein KI-Bild am sichersten?', 'an der Quelle', 'an den Fingern', 'gar nicht'), kreuz('Wie oft siehst du Bilder, bei denen du nicht weißt, ob sie echt sind?', 'oft', 'manchmal', 'selten')], ['Ein Tipp aus dem Clip:', 'Noch ein Tipp:', 'Das will ich ausprobieren:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Was hat Tom richtig gemacht?', 'eine zweite Quelle gesucht', 'sofort geteilt')]),
    ),
    seite(
      st('Der Zwei-Minuten-Check', '12 Min.', 'zu zweit · alle gleichzeitig', 'search', 'Ein Gerät pro Paar oder das Gerät der Leitung. Stoppuhr. Nur suchen, nichts teilen. Danach: Wer hat was gefunden?',
        fragen(fake.moves[0].kontext ?? null, fake.moves[0].fragen[0]),
        text('Jetzt prüfen: **Zwei Minuten.** Wer sagt das? Steht es bei der Stadt, beim Busunternehmen oder in einer Zeitung?'),
        fragen(null, kreuz('Was habt ihr gefunden?', 'eine echte Quelle', 'keine zweite Quelle – Finger weg', 'nicht geschafft'))),
      pause(),
    ),
    seite(
      runde('der Schlagzeilen-Check', '25 Min.', 'alle · am Tisch', 'news', {
        ziel: 'Warnzeichen schnell erkennen – und merken, wie leicht man selbst eine Falle baut.',
        material: 'die 12 Schlagzeilen von der nächsten Seite (ausschneiden), Papier, Stifte',
        schritte: [
          '**Teil 1 · der Check:** Eine Schlagzeile wird vorgelesen. Jede Person entscheidet still: **Warnzeichen** oder **keine Warnzeichen**? Auf „drei“ zeigen alle den Daumen: runter = Warnzeichen, hoch = keine.',
          'Mit der anderen Hand zeigt jede Person, wie sicher sie ist: ein, zwei oder drei Finger. Dann löst die Leitung auf.',
          'Die Leitung fragt: „Wer mag ein Warnzeichen nennen?“ Warnzeichen sind zum Beispiel: Großbuchstaben und !!! · macht wütend oder Angst · keine echte Quelle · „sofort teilen“ · Zeitdruck · klingt zu krass.',
          '**Teil 2 · die Fake-Fabrik:** Zu zweit erfindet ihr eine Schlagzeile über die Kantine, den Bus oder das Wetter – mit zwei Warnzeichen. Die anderen finden sie.',
        ],
        regeln: ['Es gibt keine Punkte und keine Teams.', 'In der Fake-Fabrik gibt es keine echten Personen und keine echten Namen.'],
        zu3: 'In Teil 2 baut die Gruppe zusammen, die Leitung sucht die Tricks.',
        auswertung: ['Bei welcher Schlagzeile wart ihr sicher – und lagt falsch?', 'Wie lange habt ihr für euer eigenes Fake gebraucht?'],
      }, { leitung: 'Warnzeichen haben alle Karten mit !!!, „Insider“, „ein Arzt verrät“, „nur heute“ und „mein Cousin kennt einen“. Die anderen nennen eine prüfbare Quelle.', danach: [beispiel('So kann es klingen', ['Leitung liest:', '„Nur heute: Gratis-Handy für die ersten 100, die diesen Link teilen.“'], ['', 'Alle Daumen gehen runter. Drei Finger: ganz sicher.'], ['Ben:', 'Zwei Warnzeichen: „nur heute“ und „teilen“. Und es klingt zu krass.'])] }),
    ),
    seite(
      material('12 Schlagzeilen', 7, karten(2, 19, 'Ausschneiden, mischen, verdeckt stapeln.', [MIT[0], OHNE[0], MIT[1], OHNE[1], OHNE[2], MIT[2], MIT[3], OHNE[3], OHNE[4], MIT[4], MIT[5], OHNE[5]].map((t) => ({ t })))),
    ),
    seite(
      schluss(fake, 'Tom im Klassenchat', [kreuzU('Das Bild kommt in deinem Chat an. Was machst du zuerst?', 'bremsen – und eine zweite Quelle suchen', 'teilen, es ist ja lustig'), kreuz('Schau auf Station 1: Erkennst du ein gefälschtes Bild sofort?', 'ja', 'meistens', 'nein – darum prüfe ich die Quelle')], ['gebremst']),
    ),
  )
  return [s1, s2, s3]
}

/** Lösungen für die Leitung – passend zu den Stationen oben */
export const loesungen: string[][] = [
  [
    'Der Fall: Entschieden hat die App – der nächste Clip startet von selbst. „Im Griff“ passt nicht: Er wollte kurz schauen, es wurden zweieinhalb Stunden.',
    'Aussagen: Es stimmen die Karten 3, 4, 7 und 8. Falsch sind 1 (Screenshot), 2 (jeder Feed ist anders), 5 (er zeigt, wobei du hängen bleibst) und 6 (Bild 41 von 41).',
    'Ping-Turm: Mit Ping wird der Turm meist niedriger. Mit dem Handy in der Schachtel am höchsten.',
  ],
  [
    'Versteck-Kette: Niemand findet alle Kopien – eine steckt bei der Leitung. So ist es mit Bildern im Netz.',
    'Der Fall: „Vertraust du mir nicht?“ ist Druck. Ein Geschenk (der Skin) und „nur für mich“ sind typische Anfänge. Richtig: nichts schicken, Screenshot, blockieren, jemandem zeigen. Jana merkt es am Knoten im Bauch.',
    'Drei Dinge: Foto bei der halben Klasse – privat gibt es nicht · „Wenn du mich magst …“ – Druck erkennst du · wenn ein Bild rumgeht – du bist nicht schuld (Hilfe: SePAS, BEE SECURE 8002 1234).',
    'Okay oder Druck: okay sind „Schick mal ein Foto vom Konzert!“, „Schickst du mir die Hausaufgaben?“ und in der großen Runde auch „Okay, dann nicht. Alles gut.“ und „Darf ich das posten?“. Alle anderen sind Druck. „Ich sag’s sonst allen“ ist Erpressung – ein Fall für Erwachsene.',
    'Bevor ich sende: Unkritisch sind Essen, Meme, Hund. Alles mit anderen Personen, Standort, Adresse oder Passwort: lieber nicht.',
    'Die Handgriffe: Am wichtigsten ist, es jemandem zu zeigen, dem ich vertraue. Eine gute Reihenfolge: Screenshot (Beweis) · blockieren · melden · zeigen – eure darf anders sein, wenn alle vier drin sind. Erpressung („Sonst zeig ich allen …“) ist immer ein Fall für Erwachsene – auch für die Polizei. Hilfe: BEE SECURE 8002 1234.',
  ],
  [
    'Der Fall: Tom hat eine zweite Quelle gefunden (Klassenfahrt). Das Fake war schneller, weil es ein starkes Gefühl macht.',
    'So arbeiten Fakes: Sätze, die nie gesagt wurden – KI kann fälschen · „SKANDAL!!! Teilt das“ – Fakes wollen ein Gefühl · Meldung auch bei der Stadt und in der Zeitung – zwei Fragen.',
    'Der Fall im Chat: Alle sechs Warnzeichen stecken drin. Prüfen: Seite der Stadt oder des Busunternehmens.',
    'Schlagzeilen-Check: Warnzeichen haben die sechs Karten mit !!!, „Ein Arzt verrät“, „Insider“, „Nur heute“, „Skandal“ und „Mein Cousin kennt einen“.',
    'KI – geht klar? Erklären lassen: ja. Sorgen erzählen: kommt darauf an (kann entlasten, ersetzt keinen Menschen). Aufsatz als eigenen abgeben, Stimme nachmachen, Fake teilen: nein.',
  ],
]

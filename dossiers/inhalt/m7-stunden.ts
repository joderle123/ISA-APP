// REAL TALK #07 · NETZ – drei Einheiten als zusammenhängende Stunden (16.11.2026).
// Stunde 1 ist ein Wettkampf der Gruppe gegen den Algorithmus (Aussagen und Becherturm), Stunde 2 ein Lege-Spiel „Bevor ich
// sende“, Stunde 3 eine Wette auf Schlagzeilen. Alle Karten stehen im Heft; es braucht keine vorbereiteten Bilder.
import type { Frage, Heft, Stunde } from '../typen'
import { ankommen, clip, fall, fragen, fuerDich, karten, kreuz, kreuzU, material, modell, runde, satz, schluss, seite, st, stimmtDas, stunde, text } from './stunden-hilfe'

const kreis = (f: string, ...l: string[]): Frage => ({ f, kreis: l })

export function stunden(d: Heft): Stunde[] {
  const [scroll, immer, fake] = d.tracks

  /* ---------- Stunde 1 · Wer scrollt wen? ---------- */
  const AUSSAGEN = ['Was ich in einer privaten Gruppe schicke, bleibt privat.', 'Mein Feed sieht aus wie der meiner Freunde.', 'Die App verdient Geld, wenn ich länger bleibe.', 'Der nächste Clip startet von selbst, damit ich nicht aufhöre.', 'Der Algorithmus zeigt mir nur, was mir guttut.', 'Die meisten Fotos im Netz sind beim ersten Versuch entstanden.', 'Benachrichtigungen kann man ausschalten.', 'Wer sich viel vergleicht, fühlt sich oft schlechter.']
  const s1 = stunde('Wer entscheidet, wann du aufhörst – du oder die App?', ['erklären, womit eine Gratis-App Geld verdient', 'drei Tricks nennen, die dich am Handy halten', 'einen Wenn-dann-Plan für deinen schwierigsten Moment schreiben'],
    seite(
      ankommen('deine Schätzung', kreuz('Schätze: Wie lange bist du am Tag am Handy?', 'unter 2 Std.', '2–4 Std.', '4–6 Std.', 'mehr'), kreuz('Wer entscheidet, wann du aufhörst?', 'ich', 'die App', 'mal so, mal so')),
      fall(scroll, 'Sami will nur kurz nachschauen', [
        kreuzU('Wer hat entschieden, wann Schluss ist?', 'die App: Der nächste Clip startet von selbst.', 'Sami'),
        kreuzU('Sami sagt: „Ich hab’s im Griff.“ Stimmt das für diesen Abend?', 'Nein. Er wollte kurz schauen – es wurden zweieinhalb Stunden.', 'Ja.'),
      ], { zeitleiste: [['23:10', '„Nur kurz nachschauen.“'], ['dazwischen', 'Ein Clip, noch einer, der nächste startet von selbst.'], ['1:40', 'Augen brennen. Null Erinnerung.']] }),
    ),
    seite(
      st('Erst machen: die Wette', '6 Min.', 'allein', 'device-mobile', 'Wer kein Handy dabeihat oder nicht nachschauen mag, schätzt nur. Niemand zeigt seine Zahl.',
        fragen(scroll.moves[0].kontext ?? null, scroll.moves[0].fragen[0])),
      clip(scroll, 'Warum Aufhören so schwer ist', [kreuzU('Warum fällt Aufhören so schwer?', 'Die App ist so gebaut.', 'Ich bin zu schwach.')], ['Ein Trick der Apps:', 'Das passiert im Kopf:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Welcher Trick hat Sami erwischt?', 'Der nächste Clip startet von selbst.', 'keiner')]),
      modell(scroll, 'wie die App Geld verdient', ['coin', 'robot', 'arrows-diff'], { zeit: '8 Min.' }),
      stimmtDas(scroll),
    ),
    seite(
      runde('gegen den Algorithmus', '25 Min.', 'alle · am Tisch und im Raum', 'robot', {
        ziel: 'Als Gruppe gegen die Tricks der Apps antreten – erst mit dem Kopf, dann mit den Händen.',
        material: 'die 8 Aussage-Karten von der nächsten Seite (ausschneiden), zwei Zettel „stimmt“ und „stimmt nicht“, eine Münze pro Person; 20 Becher pro Team, ein Handy mit Intervall-Timer (z. B. Metronom-App)',
        schritte: [
          '**Teil 1 · Aussagen:** Eine Karte wird vorgelesen. Alle legen gleichzeitig ihre Münze auf „stimmt“ oder „stimmt nicht“.',
          'Liegt die Mehrheit richtig, punktet die Gruppe. Sonst – und bei Gleichstand – punktet der Algorithmus.',
          '**Teil 2 · der Ping-Turm:** Zwei Teams bauen 90 Sekunden einen Becherturm. Zählt die Becher.',
          '**Durchgang 2:** Alle zehn Sekunden pingt das Handy an der Wand. Reihum läuft eine Person hin und tippt es an. Zählt wieder.',
          '**Durchgang 3:** Das Handy liegt stumm in einer Schachtel. Welcher Turm ist am höchsten?',
        ],
        zu3: 'Ein Team, ein Turm. Die Leitung stellt den Wecker und zählt.',
        wertung: { kopf: ['Becher', 'ohne Ping', 'mit Ping', 'Handy in der Schachtel'], zeilen: ['Team A', 'Team B'] },
        notiz: { titel: 'Teil 1 – Punkte: Gruppe ___ · Algorithmus ___. Bei dieser Aussage hat er uns geschlagen:', linien: 1 },
        auswertung: ['Was hat der Ping mit eurem Turm gemacht?', 'Wo liegt euer Handy, wenn ihr etwas schaffen wollt?'],
      }, { leitung: 'Lösung Teil 1: Es stimmen die Karten 3, 4, 7 und 8. Intervall-Timer auf zehn Sekunden stellen.' }),
    ),
    seite(
      material('8 Aussagen', 5, karten(2, 17, 'Ausschneiden, mischen, verdeckt stapeln. Die Nummer gehört dazu.', AUSSAGEN.map((t, i) => ({ t, marke: `Karte ${i + 1}` })))),
      fuerDich('mein Wenn-dann', '8 Min.', fragen(scroll.moves[1].kontext ?? null, ...scroll.moves[1].fragen)),
      schluss(scroll, 'Sami um 23:10', [kreuzU('Sami will „nur kurz nachschauen“. Welcher Plan hätte ihm geholfen?', 'Wenn es 23 Uhr ist, dann liegt das Handy im Flur.', '„Ich höre einfach früher auf.“'), kreuz('Schau auf Station 1: Wer entscheidet, wann du aufhörst?', 'ich', 'die App', 'mal so, mal so')], ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']),
    ),
  )

  /* ---------- Stunde 2 · Für immer online ---------- */
  const SENDEN = ['ein lustiges Foto von einem Freund – ungefragt', 'einen Screenshot aus einem privaten Chat', 'meinen Standort an jemanden aus dem Netz', 'ein Selfie, auf dem man meine Schule erkennt', 'ein Foto von meinem Essen', 'ein Bild von mir im Schlafanzug', 'die Adresse einer Freundin', 'ein Meme', 'ein Foto von der Klassenliste', 'ein Video, in dem jemand hinfällt', 'ein Foto von meinem Hund', 'mein Passwort an meinen besten Freund']
  const DRUCK = ['„Vertraust du mir nicht?“', '„Wenn du mich magst, machst du das.“', '„Ich sag’s sonst allen.“', '„Dachte, du bist anders.“', '„Kein Stress. Nur wenn du willst.“', '„Schick mal ein Foto vom Konzert!“', '„Okay, dann nicht. Alles gut.“', '„Darf ich das posten?“']
  const s2 = stunde('Was passiert mit dem, was du einmal geschickt hast?', ['erklären, warum „nur für dich“ im Netz nicht gilt', 'Druck von einer normalen Bitte unterscheiden', 'sagen, was du tust, wenn etwas schiefgeht'],
    seite(
      ankommen('senden', kreuz('Hast du schon mal etwas geschickt und es danach bereut?', 'ja', 'nein', 'sage ich nicht'), kreuz('Fragst du, bevor du ein Foto von jemandem postest?', 'immer', 'manchmal', 'nie')),
      st('Erst machen: die Screenshot-Kette', '8 Min.', 'alle', 'copy', 'Eine Kopie stecken Sie heimlich ein. Am Ende fragen: Kann man alle zurückholen?',
        text('Eine Person schreibt ein **erfundenes** Geheimnis auf einen Zettel und gibt ihn weiter: „Nur für dich.“ Wer den Zettel hat, schreibt ihn ab und legt die Kopie in die Mitte. Von dort schreiben alle weiter ab. Zwei Minuten. Dann zählen.'),
        fragen(null, kreuz('Kann die erste Person alle Kopien zurückholen?', 'ja', 'nein'))),
      fall(immer, 'Jana und der Knoten im Bauch', [
        kreuzU('Was ist „Vertraust du mir nicht?“', 'Druck', 'ein Kompliment'),
        kreuzU('Woran merkt Jana, dass etwas nicht stimmt?', 'am Knoten im Bauch', 'an gar nichts'),
      ]),
    ),
    seite(
      modell(immer, 'drei Dinge, die du wissen musst', ['lock-open', 'alert-triangle', 'heart-handshake']),
      fuerDich('okay oder Druck?', '8 Min.', fragen(null, immer.moves[0].fragen[0], kreuzU('Was kann Jana zurückschreiben?', '„Nein. Und wenn du mich magst, fragst du nicht noch mal.“', '„Na gut, aber nur eins.“'))),
      stimmtDas(immer),
    ),
    seite(
      runde('bevor ich sende', '25 Min.', 'alle · am Tisch', 'send', {
        ziel: 'Vor dem Senden zwei Fragen stellen: Wem gehört das? Und was könnte jemand damit machen?',
        material: 'die 12 Sende-Karten und 8 Satz-Karten von der nächsten Seite (ausschneiden), drei Zettel „sende ich“, „kommt darauf an“, „lieber nicht“, eine Münze pro Person',
        schritte: [
          '**Teil 1 · senden?** Eine Sende-Karte wird vorgelesen. Alle legen gleichzeitig ihre Münze auf einen der drei Zettel.',
          'Liegen die Münzen auseinander, stellt die Gruppe die zwei Fragen: **Wem gehört das Bild oder die Info? Wer könnte damit etwas anfangen, das du nicht willst?**',
          '**Teil 2 · okay oder Druck?** Die acht Satz-Karten reihum ziehen und zu „okay“ oder „Druck“ legen. Richtig: 1 Punkt für die Gruppe.',
          '**Teil 3 · wenn es passiert ist:** Bringt die vier Schritte unten gemeinsam in eine Reihenfolge.',
        ],
        regeln: ['Niemand muss sagen, was er selbst schon geschickt hat.', 'Wem so etwas passiert ist, der ist nicht schuld.'],
        zu3: 'Genau so. Die Leitung legt mit.',
        auswertung: ['Bei welcher Karte lagen eure Münzen am weitesten auseinander?', 'Welcher Satz klingt nett – und ist trotzdem Druck?'],
      }, { danach: [fragen('Wenn doch etwas schiefgeht – schreibt **1 bis 4** davor:', { f: 'Was kommt wann?', zahl: ['melden und löschen lassen', 'einer Person sagen, der ich vertraue', 'Beweise sichern: Screenshot', 'die Person blockieren'] })], leitung: 'Bei Teil 3 zählt vor allem: nicht allein bleiben. Beweise sichern heißt: Chat, Profil und Drohungen screenshotten – ein Nacktbild selbst nicht speichern oder weiterschicken (kann strafbar sein). Hilfe: Kanner-Jugendtelefon 116 111, BEE SECURE Helpline 8002 1234, Polizei 113.' }),
    ),
    seite(
      material('12 Sende-Karten und 8 Sätze', 5,
        karten(3, 17, 'Die Sende-Karten: ausschneiden, mischen, verdeckt stapeln.', [...SENDEN].sort((a, b) => a.length - b.length).map((t) => ({ t }))),
        karten(4, 16, 'Die Sätze: ausschneiden und mischen.', [...DRUCK].sort((a, b) => a.length - b.length).map((t) => ({ t })))),
      schluss(immer, 'Janas Daumen', [satz('Wenn bei mir etwas schiefgeht:', 'Als Erstes sage ich es:'), kreuz('Schau auf Station 1: Fragst du ab jetzt, bevor du ein Foto von jemandem postest?', 'ja', 'manchmal', 'nein')], ['gefragt']),
    ),
  )

  /* ---------- Stunde 3 · Echt oder fake? ---------- */
  const MIT = ['SCHOCK!!! Schule ab Montag VERBOTEN – teilt das, bevor es gelöscht wird!!!', 'Ein Arzt verrät: Dieses Getränk macht dich in drei Tagen schlau.', 'Insider packt aus: Alle Handys werden nachts abgehört!', 'Nur heute: Gratis-Handy für die ersten 100, die diesen Link teilen.', 'SKANDAL! Lehrer verdienen heimlich das Zehnfache!!!', 'Mein Cousin kennt einen bei der Polizei: Ab morgen 300 Euro Strafe für Kopfhörer im Bus.']
  const OHNE = ['Die Stadt sperrt die Brücke ab Montag für zwei Wochen. Quelle: Stadtverwaltung.', 'Der Bus 12 fährt in den Ferien nur jede halbe Stunde, teilt das Busunternehmen mit.', 'Eine Uni hat 2000 Jugendliche befragt: Wer länger schläft, lernt leichter. Die Studie ist verlinkt.', 'Schulfest am 12. Juni – das Programm steht auf der Seite der Schule.', 'Der Wetterdienst warnt vor Gewitter am Abend.', 'Ab nächster Woche gibt es in der Kantine täglich ein vegetarisches Essen, sagt die Schulleitung.']
  const s3 = stunde('Woran merkst du, dass etwas nicht stimmt?', ['sechs Warnzeichen für Fakes nennen', 'die zwei Fragen stellen: Wer sagt das? Wer berichtet noch darüber?', 'erst bremsen, dann teilen – oder nicht'],
    seite(
      ankommen('dein Daumen', kreuz('Erkennst du ein gefälschtes Bild sofort?', 'ja', 'meistens', 'nein'), kreuz('Hast du schon mal etwas geteilt, das nicht stimmte?', 'ja', 'nein', 'weiß nicht')),
      fall(fake, 'Tom und das Bild vom Lehrer', [
        kreuzU('Woran hat Tom das Fake erkannt?', 'an einer zweiten Quelle: Der Lehrer ist auf Klassenfahrt.', 'am Bild – es sah falsch aus.'),
        kreuzU('Warum war das Fake schneller als die Wahrheit?', 'Es macht ein starkes Gefühl. Der Daumen ist schneller als der Kopf.', 'Weil es stimmt.'),
      ]),
      modell(fake, 'so arbeiten Fakes', ['robot', 'flame', 'help-circle']),
    ),
    seite(
      clip(fake, 'KI-Bilder erkennen', [kreuzU('Woran erkennt man ein KI-Bild am sichersten?', 'an der Quelle', 'an den Fingern', 'gar nicht')], ['Ein Tipp aus dem Clip:', 'Noch ein Tipp:'],
        [kreuz('War dein Tipp richtig?', 'ja', 'nein', 'halb'), kreuzU('Was hat Tom richtig gemacht?', 'eine zweite Quelle gesucht', 'sofort geteilt')]),
      st('Zu zweit: der Fall im Chat', '8 Min.', 'zu zweit', 'message-circle', 'Prüfen in zwei Minuten: Seite der Stadt oder des Busunternehmens ansehen, eine zweite Quelle suchen.',
        fragen(fake.moves[0].kontext ?? null, fake.moves[0].fragen[0], kreuzU('Wie prüfst du das in zwei Minuten?', 'auf der Seite der Stadt oder des Busunternehmens nachsehen', 'im Chat fragen, ob es stimmt'))),
      stimmtDas(fake),
    ),
    seite(
      runde('die Schlagzeilen-Wette', '25 Min.', 'zwei Teams · am Tisch', 'news', {
        ziel: 'Warnzeichen schnell erkennen – und merken, wie leicht man selbst eine Falle baut.',
        material: 'die 12 Schlagzeilen von der nächsten Seite (ausschneiden), drei Münzen pro Team, Papier, Stifte',
        schritte: [
          '**Teil 1 · die Wette:** Eine Schlagzeile wird vorgelesen. Jedes Team berät leise: **Warnzeichen** oder **keine Warnzeichen**?',
          'Jedes Team setzt eine bis drei Münzen – je nachdem, wie sicher es ist. Richtig: so viele Punkte gewonnen. Falsch: so viele Punkte weg.',
          'Wer „Warnzeichen“ sagt, nennt mindestens eines: Großbuchstaben und !!! · macht wütend oder Angst · keine echte Quelle · „sofort teilen“ · Zeitdruck · klingt zu krass.',
          '**Teil 2 · die Fake-Fabrik:** Jedes Team erfindet eine Schlagzeile über die Kantine, den Bus oder das Wetter – mit zwei Warnzeichen. Das andere Team findet sie.',
        ],
        regeln: ['In der Fake-Fabrik gibt es keine echten Personen und keine echten Namen.'],
        zu3: 'Jede Person setzt für sich auf einem Zettel. In Teil 2 baut die Gruppe, die Leitung sucht die Tricks.',
        wertung: { kopf: ['Punkte', 'Teil 1 · Wette', 'Teil 2 · Tricks gefunden', 'Summe'], zeilen: ['Team A', 'Team B'] },
        auswertung: ['Bei welcher Schlagzeile wart ihr sicher – und lagt falsch?', 'Wie lange habt ihr für euer eigenes Fake gebraucht?'],
      }, { leitung: 'Warnzeichen haben alle Karten mit !!!, „Insider“, „ein Arzt verrät“, „nur heute“ und „mein Cousin kennt einen“. Die anderen nennen eine prüfbare Quelle.' }),
      fuerDich('KI – geht klar?', '6 Min.', fragen(null, ...fake.moves[1].fragen)),
    ),
    seite(
      material('12 Schlagzeilen', 5, karten(2, 19, 'Ausschneiden, mischen, verdeckt stapeln.', [MIT[0], OHNE[0], MIT[1], OHNE[1], OHNE[2], MIT[2], MIT[3], OHNE[3], OHNE[4], MIT[4], MIT[5], OHNE[5]].map((t) => ({ t })))),
      schluss(fake, 'Tom im Klassenchat', [kreuzU('Das Bild kommt in deinem Chat an. Was machst du zuerst?', 'bremsen – und eine zweite Quelle suchen', 'teilen, es ist ja lustig'), kreuz('Schau auf Station 1: Erkennst du ein gefälschtes Bild sofort?', 'ja', 'meistens', 'nein – darum prüfe ich die Quelle')], ['gebremst']),
    ),
  )
  return [s1, s2, s3]
}

/** Lösungen für die Leitung – passend zu den Stationen oben */
export const loesungen: string[][] = [
  [
    'Der Fall: Entschieden hat die App – der nächste Clip startet von selbst. „Im Griff“ passt nicht: Er wollte kurz schauen, es wurden zweieinhalb Stunden.',
    'Gegen den Algorithmus: Es stimmen die Karten 3, 4, 7 und 8. Falsch sind 1 (Screenshot), 2 (jeder Feed ist anders), 5 (er zeigt, wobei du hängen bleibst) und 6 (Bild 41 von 41).',
    'Ping-Turm: Mit Ping wird der Turm meist niedriger. Mit dem Handy in der Schachtel am höchsten.',
  ],
  [
    'Screenshot-Kette: Niemand kann alle Kopien zurückholen – eine steckt bei der Leitung.',
    'Der Fall: „Vertraust du mir nicht?“ ist Druck. Jana merkt es am Knoten im Bauch.',
    'Okay oder Druck: okay sind „Schick mal ein Foto vom Konzert!“, „Kein Stress. Nur wenn du willst.“ und in der großen Runde auch „Okay, dann nicht. Alles gut.“ und „Darf ich das posten?“. Alle anderen sind Druck. „Ich sag’s sonst allen“ ist Erpressung – ein Fall für Erwachsene.',
    'Bevor ich sende: Unkritisch sind Essen, Meme, Hund. Alles mit anderen Personen, Standort, Adresse oder Passwort: lieber nicht.',
    'Wenn es passiert ist: 1 einer Person sagen, der ich vertraue · 2 Beweise sichern · 3 melden und löschen lassen · 4 blockieren.',
  ],
  [
    'Der Fall: Tom hat eine zweite Quelle gefunden (Klassenfahrt). Das Fake war schneller, weil es ein starkes Gefühl macht.',
    'Der Fall im Chat: Alle sechs Warnzeichen stecken drin. Prüfen: Seite der Stadt oder des Busunternehmens.',
    'Schlagzeilen-Wette: Warnzeichen haben die sechs Karten mit !!!, „Ein Arzt verrät“, „Insider“, „Nur heute“, „Skandal“ und „Mein Cousin kennt einen“.',
    'KI – geht klar? Erklären lassen: ja. Sorgen erzählen: kommt darauf an (kann entlasten, ersetzt keinen Menschen). Aufsatz als eigenen abgeben, Stimme nachmachen, Fake teilen: nein.',
  ],
]

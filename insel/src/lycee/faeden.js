// Annexe Junglinster – Gesprächsfäden. Neu geschrieben nach der Rückmeldung „die Gespräche sind maximal cringe“ (17.11.).
// Jede Mitschülerin, jeder Mitschüler hat drei Gespräche, die nacheinander aufgehen, wenn die Freundschaft wächst (herz) –
// höchstens eins pro Abschnitt der Geschichte.
//
// Stil-Regeln (gelten für alle neuen Texte):
// · Es geht um Sachen, über die Jugendliche wirklich reden: Wetten, Pläne, Pannen, Lehrkräfte, Handy, Essen, Musik, Autos.
// · Humor zuerst. Gefühle kommen nur nebenbei vor (ein Halbsatz, ein Witz drüber) – nie als Geständnis.
// · Keine Sozialarbeiter-Sätze („Wie war das für dich?“, „Was denkst du selbst?“). Nachfragen klingen normal: „Und dann?“
// · Antworten: meist eine freche, eine lockere, eine daneben. Die daneben bekommt eine Reaktion, keine Moral.
// · Erwachsene beichten nichts; sie haben trockenen Humor und eine Macke.
// · Klares Deutsch, keine aufgesetzte Jugendsprache, höchstens ~12 Wörter pro Sprechblase, nichts aus Familien.
// Format: ['wer', 'Text'] · { wahl: [{ t, staerke?, herz?, dann: [...] }] }.

const nett = (id, n = 1) => ({ [id]: n });

export const FAEDEN = {
  noah: [
    { herz: 2, titel: 'Die Pizza-Frage', g: [
      ['noah', 'Kurze Frage. Ist die Kantinen-Pizza … legal?'],
      { wahl: [
        { t: 'Legal ja. Essbar ist eine andere Frage.', staerke: 'humor', herz: nett('noah', 2), dann: [['noah', 'Gut. Dann bin ich nicht der Einzige, der fragt.']] },
        { t: 'Nimm das Curry. Vertrau mir.', herz: nett('noah'), dann: [['noah', 'Curry. Notiert. Wenn ich sterbe, bist du schuld.']] },
        { t: 'Keine Ahnung. Frag wen anders.', dann: [['noah', 'Okay. Ich frag die Pizza selbst.']] },
      ] },
    ] },
    { herz: 3, titel: '47 Sticker', g: [
      ['noah', 'Weißt du noch? Mein erster Abend in der Klassengruppe.'],
      ['noah', 'Ben hat 47 Sticker geschickt. In einer Minute. Ist das normal?'],
      { wahl: [
        { t: 'Willkommen. Stummschalten ist dein Freund.', herz: nett('noah', 2), dann: [['noah', 'Stumm … das gibt’s? Mein Leben ist gerettet.']] },
        { t: 'Schick einen zurück. Den hässlichsten.', staerke: 'einbeziehen', herz: nett('noah', 2), dann: [['erzaehler', 'Noah tippt. Sein Handy brummt sofort.'], ['noah', 'Ben hat drei Herzen geschickt. Ist das … sus? Sagt man das?']] },
        { t: 'Ist halt Ben.', herz: nett('noah'), dann: [['noah', 'Ist halt Ben. Okay. Das erklärt ziemlich viel.']] },
      ] },
    ] },
    { herz: 4, titel: 'Der Plan', g: [
      ['noah', 'Ich hab einen Plan. Morgen setz ich mich zu Mila.'],
      ['noah', 'Sie redet wenig. Ich rede wenig. Perfekt, oder?'],
      { wahl: [
        { t: 'Das wird das ruhigste Mittagessen der Geschichte.', staerke: 'humor', herz: nett('noah', 2), dann: [['noah', 'Genau. Endlich mal Essen ohne Stress.']] },
        { t: 'Leih dir ihren Würfel. Dann muss sie reden.', staerke: 'einbeziehen', herz: nett('noah', 2), dann: [['noah', 'Fies. Und clever. Ich mach das.']] },
        { t: 'Und wenn sie Nein sagt?', herz: nett('noah'), dann: [['noah', 'Dann sitz ich daneben. Mit Abstand. Strategisch.']] },
      ] },
    ] },
  ],
  mila: [
    { herz: 2, titel: 'Stoppuhr', g: [
      ['mila', 'Stopp die Zeit. Jetzt.'],
      ['erzaehler', 'Klack, klack, klack. Der Würfel dreht sich so schnell, dass er verschwimmt.'],
      ['mila', 'Wie viel?'],
      { wahl: [
        { t: '39 Sekunden. Neuer Rekord!', herz: nett('mila'), dann: [['mila', 'Lüg nicht. Ich hab mitgezählt. 41.'], ['mila', 'Aber danke. Das war nett gelogen.']] },
        { t: 'Äh … ich hab vergessen zu drücken.', staerke: 'ehrlich', herz: nett('mila', 2), dann: [['mila', '(starrt dich an) … Nochmal. Diesmal drückst du.']] },
        { t: 'Gefühlt eine Minute.', dann: [['mila', '„Gefühlt“ ist keine Einheit. Nochmal.']] },
      ] },
    ] },
    { herz: 3, titel: 'Die Schuhe', g: [
      ['mila', 'Information.'],
      ['mila', 'Dein Schuh ist offen. Seit drei Stunden, zwölf Minuten.'],
      { wahl: [
        { t: 'Und das sagst du JETZT?', staerke: 'humor', herz: nett('mila', 2), dann: [['mila', 'Ich wollte sehen, ob du es selbst merkst. Experiment.'], ['mila', 'Ergebnis: nein.']] },
        { t: 'Das ist Style.', herz: nett('mila'), dann: [['mila', 'Ein Style zum Hinfallen. Okay. Deine Entscheidung.']] },
        { t: 'Danke.', herz: nett('mila'), dann: [['mila', 'Gern. Ich sag immer Bescheid. Manche finden das nervig.']] },
      ] },
    ] },
    { herz: 4, titel: 'Draußen essen', g: [
      ['mila', 'Ich ess draußen. Da ist es leiser.'],
      ['mila', 'Du darfst mit. Regel: Reden nur zwischen zwei Bissen.'],
      { wahl: [
        { t: 'Deal. Ich sag pro Bissen ein Wort.', staerke: 'einbeziehen', herz: nett('mila', 2), dann: [['mila', 'Ein Wort pro Bissen. Akzeptabel.'], ['erzaehler', 'Ihr esst draußen. Du sagst „lecker“. Mila nickt. Passt.']] },
        { t: 'Wer hat die Regeln gemacht?', herz: nett('mila'), dann: [['mila', 'Ich. Bisher allein. Einstimmig.']] },
        { t: 'Klingt wie Gefängnis.', dann: [['mila', 'Gefängnis mit Sonne. Und ohne Jo.']] },
      ] },
    ] },
  ],
  lina: [
    { herz: 2, titel: 'Das Heft', g: [
      ['erzaehler', 'Lina klappt ihr Heft zu. Zu spät: Ben als Hamster.'],
      { wahl: [
        { t: 'War das Ben? Als Hamster?', staerke: 'humor', herz: nett('lina', 2), dann: [['lina', '… Du sagst es keinem.'], ['lina', 'Dann zeichne ich dich nicht als Hamster.']] },
        { t: 'Ich hab nichts gesehen.', staerke: 'warten', herz: nett('lina', 2), dann: [['lina', '(macht das Heft ein Stück auf) Gut. Dann siehst du jetzt was.']] },
        { t: 'Zeig mal her!', dann: [['lina', 'Nein.'], ['lina', '(grinst kurz) Irgendwann. Vielleicht.']] },
      ] },
    ] },
    { herz: 3, titel: 'Der Bösewicht', g: [
      ['erzaehler', 'Linas Comic: Gerd die Taube ermittelt. Fall drei.'],
      ['lina', 'Mir fehlt ein Täter.'],
      { wahl: [
        { t: 'Die Pausenklingel. Überall. Alle hassen sie.', staerke: 'humor', herz: nett('lina', 2), dann: [['lina', '… Gut. Gerd verhaftet sie. Richtig gut.']] },
        { t: 'Der Automat, der nie Wechselgeld gibt.', herz: nett('lina', 2), dann: [['lina', 'Der Automat. Frisst Münzen. Gerd hat Beweise.']] },
        { t: 'Ich. Ich wär ein guter Bösewicht.', herz: nett('lina'), dann: [['lina', 'Du hast zu nette Augenbrauen. Abgelehnt.']] },
      ] },
    ] },
    { herz: 4, titel: 'Seite 12', g: [
      ['lina', 'Du bist im Comic. Seite 12.'],
      ['erzaehler', 'Du bist ein Roboter. Er läuft mit Kakao.'],
      { wahl: [
        { t: 'Kakao-Antrieb? Das erklärt einiges.', staerke: 'humor', herz: nett('lina', 2), dann: [['lina', 'Seite 13: Kakao alle. Drama.']] },
        { t: 'Warum ein Roboter?', herz: nett('lina'), dann: [['lina', 'Du sagst jeden Morgen genau gleich „Hi“. Wie programmiert.']] },
        { t: 'Krieg ich Laserstrahlen?', herz: nett('lina', 2), dann: [['lina', 'Seite 13. Wenn du nett bist.']] },
      ] },
    ] },
  ],
  jo: [
    { herz: 2, titel: 'Der Kombi', g: [
      ['jo', 'Guck. (hält dir das Handy hin) Den Kombi hab ich repariert.'],
      ['jo', 'Lief nicht. Jetzt läuft er. Wegen mir.'],
      { wahl: [
        { t: 'Was war kaputt?', staerke: 'zuhoeren', herz: nett('jo', 2), dann: [['jo', 'Zündkerzen, digga. Billigteil. Jetzt schnurrt er wie Diesel.']] },
        { t: 'Nimmst du mich mal mit in die Werkstatt?', herz: nett('jo'), dann: [['jo', 'Du darfst Reifen tragen. Sonst fasst du nix an.']] },
        { t: 'Ist doch nur ein altes Auto.', dann: [['jo', 'NUR ein altes Auto?!'], ['jo', '(laut) Du fährst später Fahrrad. Für immer.']] },
      ] },
    ] },
    { herz: 3, titel: 'Einmal ums Feld', g: [
      ['jo', 'Luca hat heute mein Heft vorgelesen. Vor allen. Meine Schrift.'],
      ['jo', 'Ich bin raus. Einmal ums Korbballfeld. Dann wieder rein.'],
      { wahl: [
        { t: 'Einmal ums Feld. Dein neuer Sport.', staerke: 'humor', herz: nett('jo', 2), dann: [['jo', 'Haha. Wenn das so weitergeht, werd ich Weltmeister.']] },
        { t: 'Und Luca?', herz: nett('jo'), dann: [['jo', 'Hat später „sorry“ gemurmelt. Ganz leise. Zählt trotzdem.']] },
        { t: 'Ich hätte ihm eine reingehauen.', dann: [['jo', 'Ja, und dann bin wieder ich der Böse. Nein danke.']] },
      ] },
    ] },
    { herz: 4, titel: 'Die Wette', g: [
      ['jo', 'Wette: Ich werd eine ganze Woche nicht laut.'],
      ['jo', 'Wenn ich’s schaffe, zahlst du Kakao.'],
      { wahl: [
        { t: 'Die Wette gilt. Ich spar schon mal.', herz: nett('jo', 2), dann: [['jo', 'Gut. Und wehe, du provozierst mich.']] },
        { t: 'Heute ist erst Montag.', staerke: 'humor', herz: nett('jo', 2), dann: [['jo', 'Sei still. … Siehst du? Nicht laut. Läuft.']] },
        { t: 'Du schaffst keinen Tag.', dann: [['jo', '(laut) WAS?'], ['jo', '… Okay. Montag zählt nicht.']] },
      ] },
    ] },
  ],
  ben: [
    { herz: 2, titel: 'Das Geschäftsmodell', g: [
      ['ben', 'Ich hab ein Geschäftsmodell. Ich leih mir von allen zwei Euro.'],
      ['ben', 'Dann hab ich 40 Euro. Dann zahl ich alle zurück.'],
      { wahl: [
        { t: 'Und was bleibt dir?', herz: nett('ben', 2), dann: [['ben', 'Ruhm. Respekt. Und vielleicht ein Keks.']] },
        { t: 'Bei mir kriegst du keinen Cent.', staerke: 'klar', herz: nett('ben'), dann: [['ben', 'Hart, Bruder. Minus tausend Aura. Für mich.']] },
        { t: '(gibt ihm zwei Euro)', herz: nett('ben'), dann: [['ben', 'Ich wusste es! Du bist mein erster Investor.'], ['ben', 'Morgen kriegst du sie wieder. Vielleicht. Wahrscheinlich.']] },
      ] },
    ] },
    { herz: 3, titel: 'Der Meteorit', g: [
      ['ben', 'Morgen Mathe. Mein Plan: Ein Meteorit fällt auf die Schule.'],
      ['ben', 'Nur auf den Mathe-Saal. Ich bin ja kein Monster.'],
      { wahl: [
        { t: 'Ich bring Popcorn. Für den Meteoriten.', staerke: 'humor', herz: nett('ben', 2), dann: [['ben', 'Endlich wer mit Plan.'], ['ben', '… Okay. Zehn Minuten Mathe. Du fragst ab.']] },
        { t: 'Der Meteorit ist realistischer.', staerke: 'humor', herz: nett('ben'), dann: [['ben', 'Danke für dein Vertrauen. Wirklich.']] },
        { t: 'Mir ist auch schlecht wegen morgen.', herz: nett('ben'), dann: [['ben', 'Gut. Dann gehen wir zusammen unter. Wie Helden.']] },
      ] },
    ] },
    { herz: 4, titel: 'Null Witze', g: [
      ['ben', 'Heute im Test hab ich null Witze gemacht.'],
      ['ben', 'Mme Tidderich hat gefragt, ob ich krank bin.'],
      { wahl: [
        { t: 'Und? Lief’s?', herz: nett('ben', 2), dann: [['ben', 'Weiß ich Freitag. Bis dahin: minus tausend Aura.']] },
        { t: 'Du warst krank. Vor Langeweile.', staerke: 'humor', herz: nett('ben', 2), dann: [['ben', 'Endlich versteht mich jemand.']] },
        { t: 'Mach lieber wieder Witze.', herz: nett('ben'), dann: [['ben', 'Nach dem Test immer. Vorher bin ich jetzt seriös. Eine Stunde lang.']] },
      ] },
    ] },
  ],
  chiara: [
    { herz: 2, titel: '48 von 60', g: [
      ['chiara', '48 von 60. Ich bin nicht sauer. Ich bin enttäuscht.'],
      ['chiara', 'Von mir. Das ist schlimmer.'],
      { wahl: [
        { t: 'Hilft es, wenn ich sag, ich hab 31?', staerke: 'humor', herz: nett('chiara', 2), dann: [['chiara', 'Ein bisschen. Danke für dein Opfer.']] },
        { t: 'Wo sind die 12 Punkte hin?', herz: nett('chiara'), dann: [['chiara', 'Aufgabe vier. Einheit vergessen. Lampe zwei Kilometer hoch.']] },
        { t: 'Du klingst wie eine Lehrerin.', dann: [['chiara', 'Nimm das zurück.'], ['chiara', '… Okay. Vielleicht ein bisschen.']] },
      ] },
    ] },
    { herz: 3, titel: 'Die Gurkenlampe', g: [
      ['chiara', 'Ich hab eine Lampe gebaut. Aus einem Gurkenglas.'],
      ['chiara', 'Sie leuchtet. Und riecht nur noch ein bisschen.'],
      { wahl: [
        { t: 'Nach Gurke?', staerke: 'humor', herz: nett('chiara', 2), dann: [['chiara', 'Nach Erfolg. Mit Gurke.']] },
        { t: 'Wie geht so was?', herz: nett('chiara', 2), dann: [['chiara', 'Fassung, Kabel, viele Videos. Und Becker hat geprüft.']] },
        { t: 'Kann man das verkaufen?', herz: nett('chiara'), dann: [['chiara', 'Du bist jetzt mein Geschäftspartner. Zehn Prozent.'], ['chiara', 'Okay, fünf.']] },
      ] },
    ] },
    { herz: 4, titel: 'Der Kleber', g: [
      ['chiara', 'Plan A: perfekte Lampe. Plan B: improvisieren.'],
      ['chiara', 'Plan B ist schief. Und heller. Ich hasse das.'],
      { wahl: [
        { t: 'Plan B gewinnt. Wie immer.', herz: nett('chiara', 2), dann: [['chiara', 'Sag’s keinem. Ich hab einen Ruf.']] },
        { t: 'Wer bist du und wo ist Chiara?', staerke: 'humor', herz: nett('chiara', 2), dann: [['chiara', 'Keine Sorge. Morgen bin ich wieder anstrengend.']] },
        { t: 'Schief ist halt schief.', dann: [['chiara', 'Okay, wow. Du klingst wie mein Lineal.']] },
      ] },
    ] },
  ],
  yusuf: [
    { herz: 2, titel: 'Ein Wurf', g: [
      ['yusuf', 'Hm. Du guckst auf meine Tasche.'],
      ['yusuf', 'Judo. Willst du einen Wurf sehen? Langsam.'],
      { wahl: [
        { t: 'Ja. Aber nicht an mir.', staerke: 'humor', herz: nett('yusuf', 2), dann: [['yusuf', 'Feigling. (grinst kurz) Okay. An der Luft.'], ['erzaehler', 'Yusuf dreht sich, zieht – und ein unsichtbarer Gegner fliegt.']] },
        { t: 'Wie oft fällst du da hin?', herz: nett('yusuf'), dann: [['yusuf', 'Hundertmal pro Training. Man lernt, richtig zu fallen.']] },
        { t: 'Klar, wirf mich!', herz: nett('yusuf'), dann: [['erzaehler', 'Yusuf stellt sich hin. Dann lacht er.'], ['yusuf', 'Auf Beton? Ich bin doch nicht verrückt.']] },
      ] },
    ] },
    { herz: 3, titel: 'Der böse Blick', g: [
      ['yusuf', 'Ben sagt, ich gucke immer böse.'],
      { wahl: [
        { t: 'Du guckst wie jemand, der nachdenkt.', herz: nett('yusuf', 2), dann: [['yusuf', 'Genau. Ich denke. Nur langsam.']] },
        { t: 'Ein bisschen schon, ehrlich.', staerke: 'ehrlich', herz: nett('yusuf'), dann: [['yusuf', 'Hm.'], ['yusuf', 'Ich üb mal Lächeln. Vor dem Spiegel. Keinem sagen.']] },
        { t: 'Guck doch einfach nett.', dann: [['erzaehler', 'Yusuf guckt „nett“. Es ist das Gruseligste, was du heute gesehen hast.'], ['yusuf', 'Besser?']] },
      ] },
    ] },
    { herz: 4, titel: 'Samstag', g: [
      ['yusuf', 'Samstag ist Wettkampf. Willst du kommen?'],
      ['yusuf', 'Ist langweilig. Viel Warten. Dann vier Minuten Kampf.'],
      { wahl: [
        { t: 'Ich komm. Ich bring Snacks.', staerke: 'einbeziehen', herz: nett('yusuf', 2), dann: [['yusuf', 'Snacks sind in der Halle verboten.'], ['yusuf', 'Bring trotzdem.']] },
        { t: 'Bist du nervös?', herz: nett('yusuf'), dann: [['yusuf', 'Nein.'], ['yusuf', '… Mein Bauch macht komische Sachen. Das ist alles.']] },
        { t: 'Langweilig klingt nicht so gut.', dann: [['yusuf', 'Hm.'], ['erzaehler', 'Samstag schickt er dir ein Foto: leere Tribüne.']] },
      ] },
    ] },
  ],
  ayla: [
    { herz: 2, titel: 'Abstimmung', g: [
      ['ayla', 'Abstimmung! Bandname: „Kein WLAN“ oder „Pausenklingel“?'],
      { wahl: [
        { t: '„Kein WLAN“. Das versteht jeder.', herz: nett('ayla', 2), dann: [['ayla', 'Zwei zu eins. Jo war für Pausenklingel. Jo hat nichts zu sagen.']] },
        { t: '„Pausenklingel“. Klingt nach Ärger.', herz: nett('ayla', 2), dann: [['ayla', 'Gute Begründung. Ich schreib’s auf.']] },
        { t: 'Beides schlimm. Nehmt „Bass im Gesicht“.', staerke: 'humor', herz: nett('ayla', 2), dann: [['ayla', '(lacht) Das ist so schlimm, dass es schon wieder gut ist.']] },
      ] },
    ] },
    { herz: 3, titel: 'Ein Daumen', g: [
      ['ayla', 'Ich hab heute zum ersten Mal in die Klassengruppe geschrieben.'],
      ['ayla', 'Einen Daumen. Neunzehn Leute haben ihn gesehen. Keiner reagiert.'],
      { wahl: [
        { t: '(reagiert mit einem Feuer-Emoji)', staerke: 'einbeziehen', herz: nett('ayla', 2), dann: [['ayla', '(guckt aufs Handy) … Okay. Jetzt bin ich berühmt.']] },
        { t: 'Neunzehn Leute. Das ist ein Publikum.', herz: nett('ayla'), dann: [['ayla', 'So gesehen … erstes Konzert. Ein Daumen. Ausverkauft.']] },
        { t: 'Wer schreibt denn nur einen Daumen?', dann: [['ayla', 'Ich. Danke. Ich lösch die App.']] },
      ] },
    ] },
    { herz: 4, titel: 'Der Auftritt', g: [
      ['ayla', 'Freitag spielen wir. In der Pause. Unter dem Préau. Vor Leuten.'],
      { wahl: [
        { t: 'Ich steh ganz vorne und schrei.', staerke: 'einbeziehen', herz: nett('ayla', 2), dann: [['ayla', 'Bitte nicht.'], ['ayla', '… Doch. Mach.']] },
        { t: 'Wie viele Lieder?', herz: nett('ayla'), dann: [['ayla', 'Zwei. Eins davon kann Jo.']] },
        { t: 'Und wenn keiner kommt?', dann: [['ayla', 'Dann spielen wir für die Tauben. Die sind ehrlich.']] },
      ] },
    ] },
  ],
  luca: [
    { herz: 2, titel: 'Zu wenig Salz', nichtKap: [7, 8, 9], g: [
      ['luca', 'Na, Kantinen-Polizei? Was guckst du?'],
      { wahl: [
        { t: 'Ob du heute wieder das Curry kritisierst.', staerke: 'humor', herz: nett('luca', 2), dann: [['luca', 'Zu wenig Salz. Jeden Tag. Ich sag nur die Wahrheit.']] },
        { t: 'Nix. Chill.', staerke: 'klar', herz: nett('luca'), dann: [['luca', '… Okay. Du bist okay.']] },
        { t: 'Lass mich in Ruhe.', dann: [['luca', 'Gern. Mein Lieblingsspiel.']] },
      ] },
    ] },
    { herz: 3, titel: 'Das Geheimnis', nichtKap: [7, 8, 9], g: [
      ['luca', 'Wenn du das jemandem sagst, bist du erledigt. Klar?'],
      ['luca', 'Ich koche. Gern. Und gut.'],
      { wahl: [
        { t: 'Was ist dein bestes Gericht?', herz: nett('luca', 2), dann: [['luca', 'Tomatensoße. Richtig. Mit Basilikum. Nicht aus dem Glas.']] },
        { t: 'Ich schweige. Wenn du einmal für mich kochst.', staerke: 'humor', herz: nett('luca', 2), dann: [['luca', 'Erpressung. Respekt.'], ['luca', 'Okay. Einmal.']] },
        { t: 'Kochen? DU?', dann: [['luca', 'Ja. Ich. Problem?'], ['luca', 'Siehst du. Deshalb sag ich’s keinem.']] },
      ] },
    ] },
    { herz: 4, titel: 'Die Kostprobe', nichtKap: [7, 8, 9], g: [
      ['luca', 'Frau Kremer lässt mich Freitag eine Stunde in die Küche.'],
      ['luca', 'Probier. Und sag ehrlich, wenn’s Müll ist.'],
      ['erzaehler', 'Du probierst. Es ist richtig, richtig gut.'],
      { wahl: [
        { t: 'Das ist besser als alles in der Kantine.', herz: nett('luca', 2), dann: [['luca', 'Nicht so laut. Kremer hat Ohren überall.'], ['luca', '(grinst) Aber ja. Ich weiß.']] },
        { t: 'Interessant.', herz: nett('luca'), dann: [['luca', '„Interessant“ heißt Müll. Jeder weiß das.'], ['erzaehler', 'Du isst trotzdem alles auf. Luca sieht es. Er sagt nichts mehr.']] },
        { t: 'Zu wenig Salz.', staerke: 'humor', herz: nett('luca', 2), dann: [['luca', '(starrt dich an) …'], ['luca', 'Okay. Das hab ich verdient.']] },
      ] },
    ] },
  ],
  kenan: [
    { herz: 2, titel: 'Brief Nummer drei', g: [
      ['kenan', 'Zwei Betriebe. Zwei Absagen. Brief Nummer drei ist fertig.'],
      { wahl: [
        { t: 'Lass mal lesen.', staerke: 'hilfe', herz: nett('kenan', 2), dann: [['erzaehler', 'Der Brief ist gut. Ein Komma fehlt.'], ['kenan', 'Ein Komma. Ich hasse Kommas. Danke.']] },
        { t: 'Dritter Versuch. Wie im Film.', herz: nett('kenan'), dann: [['kenan', 'Im Film klappt’s beim dritten Mal. Wehe nicht.']] },
        { t: 'Mach doch was anderes als Holz.', dann: [['kenan', 'Will ich nicht. Ich will Holz. Punkt.']] },
      ] },
    ] },
    { herz: 3, titel: 'Das Regal', g: [
      ['kenan', 'Becker hat heute mein Regal gelobt. Vor allen.'],
      ['kenan', 'Ich wusste nicht, wo ich hingucken soll.'],
      { wahl: [
        { t: 'Aufs Regal. Es hat’s verdient.', staerke: 'humor', herz: nett('kenan', 2), dann: [['kenan', 'Haha. Ja. Es ist auch ziemlich gerade.']] },
        { t: 'Zweimal messen, einmal sägen.', herz: nett('kenan'), dann: [['kenan', 'Ich schwör, du klingst wie Becker. Gruselig, Brudi.']] },
        { t: 'Lob ist voll peinlich.', herz: nett('kenan'), dann: [['kenan', 'Total. Aber auch … nicht schlecht.']] },
      ] },
    ] },
    { herz: 4, titel: 'Die Treppe', g: [
      ['kenan', 'Dario nervt wegen dem Rauchen. Jeden Tag.'],
      { wahl: [
        { t: 'Und? Hat er recht?', staerke: 'ehrlich', herz: nett('kenan', 2), dann: [['kenan', 'Die Treppe zur Werkstatt. Ich keuche. Mit siebzehn.'], ['kenan', 'Sag’s ihm nicht. Sonst wird er unerträglich.']] },
        { t: 'Er nervt, weil er dich mag.', herz: nett('kenan'), dann: [['kenan', '… Ja. Genau deshalb nervt es ja.']] },
        { t: 'Mach doch, was du willst.', dann: [['kenan', 'Mach ich auch.']] },
      ] },
    ] },
  ],
  dario: [
    { herz: 2, titel: 'Seife', g: [
      ['dario', 'Alles gut? … Bei mir? Klar.'],
      ['dario', 'Okay, nein. Handy bis drei Uhr nachts.'],
      { wahl: [
        { t: 'Bis drei?! Was hast du geguckt?', herz: nett('dario', 2), dann: [['dario', 'Videos von Leuten, die Seife schneiden. Frag nicht.']] },
        { t: 'Willkommen im Zombie-Team.', staerke: 'humor', herz: nett('dario', 2), dann: [['dario', 'Zombie-Team. Wir brauchen T-Shirts.']] },
        { t: 'Selbst schuld.', dann: [['dario', 'Danke, Frau Weber.']] },
      ] },
    ] },
    { herz: 3, titel: 'Der Pirat', g: [
      ['dario', 'Kenan ist der Einzige, der meine Witze nie lustig findet.'],
      ['dario', 'Und trotzdem bleibt er. Seit der Grundschule.'],
      { wahl: [
        { t: 'Erzähl einen. Ich sag ehrlich.', staerke: 'humor', herz: nett('dario', 2), dann: [['dario', 'Was macht ein Pirat am Computer?'], ['dario', 'Er drückt die Enter-Taste.'], ['dario', '… Siehst du? Kenan hat recht.']] },
        { t: 'Vielleicht hört er einfach schlecht.', herz: nett('dario', 2), dann: [['dario', 'Haha. Beides möglich.']] },
        { t: 'Deine Witze sind auch schlecht.', dann: [['dario', 'Jetzt sind es zwei. Ich brauch neue Freunde.']] },
      ] },
    ] },
    { herz: 4, titel: 'Die Challenge', g: [
      ['dario', 'Challenge: Handy nachts in die Küche. Eine Woche.'],
      ['dario', 'Wer zuerst schwach wird, zahlt Kakao.'],
      { wahl: [
        { t: 'Ich bin dabei.', staerke: 'einbeziehen', herz: nett('dario', 2), dann: [['dario', 'Nacht eins. Ich schreib dir, wie’s … ach so. Geht ja nicht.']] },
        { t: 'Wie lange hältst du schon durch?', herz: nett('dario'), dann: [['dario', 'Zwei Nächte. Dann hab ich die Seifen-Videos vermisst.']] },
        { t: 'Ohne Handy? Niemals.', dann: [['dario', 'Okay. Dann zahl ich nix. Und schlaf wie ein Baby.']] },
      ] },
    ] },
  ],

  // Erwachsene: zwei Gespräche je Person. Keine Beichten, nichts Privates – Humor und eine Macke.
  kaya: [
    { herz: 2, titel: 'Das Schild', g: [
      ['kaya', 'Du guckst auf mein Schild. „SePAS“. Klingt nach Ärger, oder?'],
      { wahl: [
        { t: 'Ein bisschen. Wie Schulpolizei.', staerke: 'ehrlich', herz: nett('kaya'), dann: [['kaya', 'Schulpolizei mit Keksen. Verhaftet wird nur der Teller.']] },
        { t: 'Und was erzählen Sie weiter?', staerke: 'hilfe', herz: nett('kaya'), dann: [['kaya', 'Nichts, ohne dass du es vorher weißt.'], ['kaya', 'Nur bei Gefahr. Dann sag ich es dir zuerst.']] },
        { t: 'Brauch ich nicht.', dann: [['kaya', 'Musst du auch nicht. Die Kekse gibt’s trotzdem.']] },
      ] },
    ] },
    { herz: 3, titel: 'Statistik', g: [
      ['kaya', 'Statistik: Achtzig Prozent kommen wegen der Kekse.'],
      ['kaya', 'Die anderen zwanzig auch. Sie sagen es nur nicht.'],
      { wahl: [
        { t: 'Welche Sorte?', herz: nett('kaya'), dann: [['kaya', 'Schoko. Die anderen isst keiner. Statistik.']] },
        { t: 'Das ist Bestechung.', staerke: 'humor', herz: nett('kaya'), dann: [['kaya', 'Nennen wir es Willkommenskultur.']] },
        { t: 'Und dann reden die einfach?', herz: nett('kaya'), dann: [['kaya', 'Meistens. Mit Keks im Mund redet es sich leichter.']] },
      ] },
    ] },
  ],
  laurent: [
    { herz: 2, titel: 'Die Wette', g: [
      ['laurent', 'Wette: Du schreibst „vielleicht“ falsch.'],
      { wahl: [
        { t: 'Viel-leicht. Zwei l.', herz: nett('laurent'), dann: [['laurent', 'Respekt. Das schaffen drei von zehn.']] },
        { t: 'Wetten, Sie früher auch?', staerke: 'humor', herz: nett('laurent'), dann: [['laurent', 'Ich wohn praktisch in einer Bibliothek. Unfair, ich weiß.']] },
        { t: 'Egal, gibt doch Autokorrektur.', dann: [['laurent', 'Die hat mal „Liebe Grüße“ zu „Liebe Gurke“ gemacht.'], ['laurent', 'An den Direktor.']] },
      ] },
    ] },
    { herz: 3, titel: 'Der Club', g: [
      ['laurent', 'Donnerstag ist Club. Hausaufgaben, keine Noten.'],
      ['laurent', 'Autokorrektur ist aus. Ich trau ihr nicht mehr.'],
      { wahl: [
        { t: 'Gibt’s da was zu essen?', staerke: 'humor', herz: nett('laurent'), dann: [['laurent', 'Wasser. Das ist eine Bibliothek, kein Café.']] },
        { t: 'Ich komm Donnerstag.', herz: nett('laurent'), dann: [['laurent', 'Schön. Bring deine schlimmste Aufgabe mit.']] },
        { t: 'Hausaufgaben in der Freizeit? Nein.', dann: [['laurent', 'Okay. Ich frag nächste Woche wieder. Und dann wieder.']] },
      ] },
    ] },
  ],
  becker: [
    { herz: 2, titel: 'Die Banane', g: [
      ['becker', 'Siehst du das Brett an der Wand? Mein erstes Werkstück.'],
      ['becker', 'Krumm wie eine Banane. Hängt da als Warnung.'],
      { wahl: [
        { t: 'Als Warnung für wen?', herz: nett('becker'), dann: [['becker', 'Für mich. Falls ich mal angebe.']] },
        { t: 'Darf ich es halten?', herz: nett('becker'), dann: [['becker', 'Vorsichtig. Es ist älter als du.']] },
        { t: 'Sieht echt schlecht aus.', staerke: 'ehrlich', herz: nett('becker'), dann: [['becker', 'Danke. Endlich sagt’s mal jemand.']] },
      ] },
    ] },
    { herz: 3, titel: 'Zwei Augen', g: [
      ['becker', '(tippt auf die Brille an deiner Stirn) Die gehört tiefer.'],
      ['becker', 'Da oben schützt sie nur deine Gedanken.'],
      { wahl: [
        { t: 'Ich auch. Wo liegt die Brille?', herz: nett('becker'), dann: [['becker', 'Da. Gut. Jetzt dürfen wir Spaß haben.']] },
        { t: 'Ist doch nur ganz kurz.', dann: [['becker', '(zeigt aufs krumme Brett) Das war auch nur kurz.']] },
        { t: 'Steht mir die überhaupt?', staerke: 'humor', herz: nett('becker'), dann: [['becker', 'Niemandem steht die. Darum geht’s nicht.']] },
      ] },
    ] },
  ],
  sommer: [
    { herz: 2, titel: 'Die Pfeife', g: [
      ['sommer', 'Weißt du, warum ich pfeife?'],
      { wahl: [
        { t: 'Weil Sie Macht lieben.', staerke: 'humor', herz: nett('sommer'), dann: [['sommer', '(pfeift) Falsch. Weil Schreien heiser macht.'], ['sommer', '… Ein bisschen Macht auch.']] },
        { t: 'Weil die Halle so laut ist.', herz: nett('sommer'), dann: [['sommer', 'Genau. Pfeife statt Schreien. Mein Markenzeichen.']] },
        { t: 'Ist mir egal.', dann: [['sommer', '(pfeift direkt neben dir) Jetzt nicht mehr, oder?']] },
      ] },
    ] },
    { herz: 3, titel: 'Der Deal', g: [
      ['sommer', 'Nicht jeder mag Sport. Ich mag keine Zahlen. Quitt.'],
      ['sommer', 'Deal: Du gibst Sport eine Chance. Ich gebe Mathe eine.'],
      { wahl: [
        { t: 'Deal. Sie zuerst: sieben mal acht?', staerke: 'humor', herz: nett('sommer'), dann: [['sommer', '(überlegt lange) … Sechsundfünfzig. Siehst du? Ich liefere.']] },
        { t: 'Und wenn ich alles hasse?', herz: nett('sommer'), dann: [['sommer', 'Dann suchen wir, was du am wenigsten hasst. Tischtennis?']] },
        { t: 'Kein Deal.', dann: [['sommer', 'Okay. Dann bleib ich bei meinem Taschenrechner.']] },
      ] },
    ] },
  ],
  kremer: [
    { herz: 2, titel: 'Dreihundert Teller', g: [
      ['kremer', 'Dreihundert Teller am Tag. Und jeder sagt: zu wenig Soße.'],
      { wahl: [
        { t: 'Bei mir passt die Soße immer.', herz: nett('kremer', 2), dann: [['kremer', 'Lieblingsgast. Zack, zack. Extra Soße.']] },
        { t: 'Wie schaffen Sie das?', herz: nett('kremer'), dann: [['kremer', 'Plan am Kühlschrank. Und ich weiß, wer keine Erbsen mag.'], ['kremer', 'Du zum Beispiel. Ich seh alles.']] },
        { t: 'Ein bisschen mehr Soße wär schon gut.', staerke: 'ehrlich', herz: nett('kremer'), dann: [['kremer', '(seufzt) Dreihunderteins.']] },
      ] },
    ] },
    { herz: 3, titel: 'Die Karte', g: [
      ['kremer', 'Wenn deine Karte mal leer ist: leise sagen. Ich frag nie laut.'],
      ['kremer', 'Hunger ist kein Drama. Wird geklärt.'],
      { wahl: [
        { t: 'Gut zu wissen.', staerke: 'hilfe', herz: nett('kremer'), dann: [['kremer', 'Zack, zack. Nächster!']] },
        { t: 'Machen Sie das für alle?', herz: nett('kremer'), dann: [['kremer', 'Für alle. Ich hab ein gutes Gedächtnis. Und schlechte Ohren. Absichtlich.']] },
        { t: 'Kann ich dann zweimal Nachtisch?', staerke: 'humor', herz: nett('kremer'), dann: [['kremer', 'Netter Versuch. Einmal. Zack, zack.']] },
      ] },
    ] },
  ],
  weber: [
    { herz: 2, titel: 'Der Spitzname', g: [
      ['weber', 'Ich weiß, wie ihr mich nennt.'],
      { wahl: [
        { t: 'Wie denn?', herz: nett('weber'), dann: [['weber', '„Die Uhr.“ Weil ich um 16 Uhr zumache. Nicht 16:05.'], ['weber', 'Ich nehm das als Kompliment.']] },
        { t: 'Wir nennen Sie gar nicht.', dann: [['weber', 'Lügen musst du noch üben.']] },
        { t: 'Ich sag nix. Ich will leben.', staerke: 'humor', herz: nett('weber'), dann: [['weber', 'Kluge Entscheidung. (Ihr Mundwinkel zuckt.)']] },
      ] },
    ] },
    { herz: 3, titel: 'Eure Klasse', g: [
      ['weber', 'Eure Klasse: vierzehn Ausreden diese Woche. Rekord.'],
      ['weber', 'Die beste: „Der Bus war zu pünktlich.“'],
      { wahl: [
        { t: 'Kriegen wir dafür früher frei?', staerke: 'humor', herz: nett('weber'), dann: [['weber', 'Nein. Um 16 Uhr. Wie alle.']] },
        { t: 'Ehrlich wie?', herz: nett('weber'), dann: [['weber', 'Ihr sagt, wenn was blöd ist. Das spart Zeit.']] },
        { t: 'Laut ist doch gut.', dann: [['weber', 'Für dich. Ich hab Ohren.']] },
      ] },
    ] },
  ],
  hoffmann: [
    { herz: 2, titel: 'Neue Methode', g: [
      ['hoffmann', 'Neue Methode! Lernen mit Bewegung!'],
      { wahl: [
        { t: 'Bitte nicht wieder Klatschen.', staerke: 'humor', herz: nett('hoffmann'), dann: [['hoffmann', 'Kein Klatschen.'], ['hoffmann', '… Nur ein bisschen Stampfen.']] },
        { t: 'Was genau?', herz: nett('hoffmann'), dann: [['hoffmann', 'Wer antwortet, wirft den Ball weiter. Gut, oder?'], ['hoffmann', 'Sag ehrlich. Besser als Folien?']] },
        { t: 'Gibt’s auch eine Methode ohne Lernen?', dann: [['hoffmann', 'Heißt Pause. Kommt um zehn.']] },
      ] },
    ] },
    { herz: 3, titel: 'Ehrlich', g: [
      ['hoffmann', 'Was war diese Woche das Beste in meinem Unterricht?'],
      { wahl: [
        { t: 'Als der Beamer kaputt war.', staerke: 'humor', herz: nett('hoffmann'), dann: [['hoffmann', 'Autsch. Aber gut. Weniger Beamer. Notiert.']] },
        { t: 'Die Gruppenarbeit.', staerke: 'ehrlich', herz: nett('hoffmann'), dann: [['hoffmann', 'Dann mehr davon. Danke, {name}.']] },
        { t: 'Ihre Krawatte am Montag.', herz: nett('hoffmann'), dann: [['hoffmann', 'Die mit den Enten? Die bleibt.']] },
      ] },
    ] },
  ],
};

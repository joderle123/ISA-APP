// Lycée-Simulator – Kapitel 6 „Kleine Schritte“ (fünfte Woche). Zugeschnitten auf die Jugendlichen der Förderklasse:
// Angst vor Blicken und Bewertung, „Einfrieren“ statt Ausrasten, Rückzug, Fehlerangst. Was nachweislich hilft, steckt im
// Spiel, ohne Therapeutensprache:
//   · gestufte Exposition – die „Mutleiter“ (selbst sortiert; Erfolg = dabeigeblieben, nicht „perfekt“; Abbrechen erlaubt,
//     dann wird die Stufe kleiner). Die Anspannung wird live gezeigt: Sie steigt erst und fällt dann, wenn man bleibt.
//   · Gedanken prüfen – „Dein Kopf“ sagt etwas; man kann hinschauen, was wirklich los ist (vorher/nachher: wie sicher?).
//   · der innere Kritiker als nervige Stimme, die man nicht loswird, aber leiser kriegt (kleinster Fehler zuerst).
//   · nonverbales Hilfe-Signal (die „Gleich“-Karte) und Zeit holen statt Erstarren.
//   · Vermeidung ehrlich gezeigt: Umdrehen tut sofort gut – und macht den nächsten Morgen schwerer. Keine Moral-Stimme.
//   · feste Bezugsperson (Herr Kaya): kurzer Check-in, kein Dauer-Motivieren.
// Keine Diagnosen, keine Etiketten, keine Details aus echten Unterlagen. Niemand muss Persönliches erzählen.

const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE_SITZT = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 0, 1) };

export const STAERKEN6 = {
  bleiben: { name: 'Dabeibleiben', text: 'Es war unangenehm. Du bist trotzdem geblieben.' },
  halt: { name: 'Halt holen', text: 'Du hast dir jemanden an die Seite geholt.' },
  zeit: { name: 'Zeit holen', text: 'Du hast gezeigt: Ich brauch kurz. Statt zu erstarren.' },
  fehler: { name: 'Fehler anschauen', text: 'Du hast hingesehen, statt das Blatt wegzustecken.' },
  pruefen: { name: 'Gedanken prüfen', text: 'Du hast geschaut, was wirklich los ist.' },
  mut6: { name: 'Sich trauen', text: 'Durchgezogen. Obwohl alles in dir „bloß nicht“ rief.' },
};

// Die Mutleiter: Die Jugendlichen sortieren selbst, was leicht und was schwer ist.
export const LEITER = [
  { id: 'pause', t: 'In der Pause bei den anderen stehen' },
  { id: 'baecker', t: 'Beim Bäcker selbst bestellen' },
  { id: 'frage', t: 'Im Unterricht eine Frage stellen' },
  { id: 'tafel', t: 'Vor der Klasse etwas vorlesen' },
  { id: 'kantine', t: 'In der Kantine zu einer Gruppe setzen' },
];

export const LEUTE6 = {
  baeckerin: { hoehe: 1.64, reich: 3.2, name: 'Bäckerin', modell: 'frauen', stil: 'Worker', haut: '#e8bf9a', haar: '#5a3a24', oben: '#ffffff', unten: '#2f4f45', schuhe: '#2b2b2b', farbe: '#2f4f45', erwachsen: true },
};

export const ORTE6 = {
  gangLachen: { x: 3.2, z: -11.2 },
  baeckerSchlange: { x: 3.3, z: 52.6, yaw: 0 },
  kantinePlatz: { x: 19.55, z: -10.1 },
};

export const SCHRITTE6 = [
  { id: 'k6_tor', kap: 6, tag: 'Montag', uhr: 7.75, titel: 'Montagmorgen', ziel: 'Geh zum Schultor.', marker: 'tor',
    start: { teleport: 'busAnkunft', gespraech: 'k6_intro' },
    leute: { mila: [-11.7, 14.3, 2.6] },
    fertig: { ort: 'tor', r: 4, gespraech: 'k6_tor' } },
  { id: 'k6_kaya', kap: 6, tag: 'Dienstag', uhr: 7.9, titel: 'Fünf Minuten', ziel: 'Herr Kaya hat geschrieben: „Kurz vorbeikommen?“', marker: 'kaya',
    start: { teleport: 'eingang' },
    leute: { kaya: [-12, -6.6, Math.PI] },
    fertig: { reden: 'kaya', gespraech: 'k6_kaya' } },
  { id: 'k6_pause', kap: 6, tag: 'Dienstag', uhr: 12.6, titel: 'Stufe 1', ziel: 'Mittagspause. Stell dich unters Vordach zu den anderen.', marker: 'preau',
    start: { teleport: 'eingangHof' },
    leute: { noah: [18.2, 2.8, 0.9, 'redet'], ayla: [19.9, 3.6, -2.2, 'redet'], yusuf: [19.4, 5.4, -2.9, 'handy'] },
    fertig: { ort: 'preau', r: 3.2, gespraech: 'k6_pause' } },
  { id: 'k6_lachen', kap: 6, tag: 'Mittwoch', uhr: 9.95, titel: 'Im Gang', ziel: 'Zehn-Uhr-Pause. Geh durch die Halle Richtung Kantine.', marker: 'gangLachen',
    start: { teleport: 'halle' },
    leute: { jo: [4.6, -12.6, -2.2, 'redet'], ben: [5.6, -11.6, -1.9, 'handy'], luca: [5.4, -13.3, -1.2, 'redet'] },
    fertig: { ort: 'gangLachen', r: 2.4, gespraech: 'k6_lachen' } },
  { id: 'k6_tafel', kap: 6, tag: 'Mittwoch', uhr: 10.4, titel: 'Drangenommen', ziel: 'Französisch bei M. Hoffmann. Setz dich.', marker: 'meinPlatz',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE_SITZT },
    fertig: { ort: 'meinPlatz', r: 1.1, gespraech: 'k6_tafel' } },
  { id: 'k6_test', kap: 6, tag: 'Donnerstag', uhr: 10.3, titel: 'Viel Rot', ziel: 'Lernzeit im CDI. Mme Laurent gibt die Mathe-Tests zurück.', marker: 'laurent',
    start: { teleport: 'cdi' },
    leute: { laurent: [-4.2, -28.3, 0], mila: [-6.2, -20.5, Math.PI, 'sitzt'], chiara: [-11.0, -22.9, Math.PI / 2, 'sitzt'] },
    fertig: { reden: 'laurent', gespraech: 'k6_test' } },
  { id: 'k6_stufe', kap: 6, tag: 'Freitag', uhr: 9.9, titel: 'Deine Stufe', ziel: 'Herr Kaya wartet vor seinem Büro.', marker: 'kaya',
    start: { teleport: 'eingang' },
    leute: { kaya: [-12, -6.6, Math.PI] },
    fertig: { reden: 'kaya', gespraech: 'k6_stufe' } },
  { id: 'k6_baecker', kap: 6, tag: 'Freitag', uhr: 10.15, titel: 'Beim Bäcker', ziel: 'Stell dich beim Bäcker gegenüber an.', marker: 'baeckerSchlange',
    wenn: (m) => m.stufeBaecker,
    start: { teleport: 'tor' },
    leute: { baeckerin: [3.2, 56.4, Math.PI] },
    fertig: { ort: 'baeckerSchlange', r: 2.2, gespraech: 'k6_baecker' } },
  { id: 'k6_kantine', kap: 6, tag: 'Freitag', uhr: 12.4, titel: 'Der Tisch', ziel: 'Ayla, Noah und Yusuf essen. Setz dich dazu.', marker: 'kantinePlatz',
    wenn: (m) => m.stufeKantine,
    start: { teleport: 'kantineTuer' },
    leute: { kremer: [26.8, -9, -Math.PI / 2], ayla: [21.05, -10.1, -Math.PI / 2, 'sitzt'], noah: [21.05, -11.1, -Math.PI / 2, 'sitzt'], yusuf: [19.55, -11.1, Math.PI / 2, 'sitzt'] },
    fertig: { ort: 'kantinePlatz', r: 1.4, gespraech: 'k6_kantine' } },
  { id: 'k6_heim', kap: 6, tag: 'Freitag', uhr: 15.5, titel: 'Freitag', ziel: 'Geh zur Bushaltestelle.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { mila: [-25.6, 42.0, -0.3], lina: [-17.4, 42.6, -1.2], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'k6_ende' } },
];

export const GESPRAECHE6 = {
  k6_intro: [
    ['erzaehler', 'Fünfte Woche. Montag.'],
    ['erzaehler', 'Sonntag hast du dreimal den Wecker gecheckt.'],
  ],
  k6_tor: [
    ['erzaehler', 'Das Tor. Dahinter: Lärm, Leute, Blicke.'],
    { tu: 'torCheck' },
    { wahl: [
      { t: 'Reingehen. Einfach weiter.', merke: 'torRein', dann: [
        ['erzaehler', 'Drinnen ist es laut. Du gehst trotzdem.'],
        ['erzaehler', 'Der Montag geht irgendwie rum. Du sagst kaum was.'] ] },
      { t: 'Mila schreiben: „Bist du schon da?“', staerke: 'halt', herz: { mila: 1 }, merke: 'torMila', dann: [
        ['erzaehler', 'Zehn Sekunden. Dann: „Brunnen. Komm.“'],
        ['erzaehler', 'Sie wartet wirklich. Ihr geht zusammen rein.'],
        ['mila', 'Montage sind Müll.'] ] },
      { t: 'Am Tor warten, bis der Hof leer ist.', merke: 'torWarten', dann: [
        ['erzaehler', 'Es klingelt. Alle rennen rein.'],
        ['erzaehler', 'Du gehst als Letztes. Niemand schaut.'],
        ['erzaehler', 'Zwei Minuten zu spät. M. Hoffmann sagt nichts.'] ] },
      { t: 'Umdrehen. Nach Hause.', merke: 'torHeim', dann: [
        ['erzaehler', 'Zuhause. Bett. Der Bauch wird sofort besser.'],
        ['erzaehler', '14 Uhr. Mila: „Wo bist du?“ Du antwortest nicht.'],
        ['erzaehler', 'Abends zieht es wieder. Morgen ist ja Schule.'] ] },
    ] },
  ],
  k6_kaya: [
    { tu: 'kayaStart' },
    ['kaya', 'Ich frag nur eins. Was ist gerade am schwersten?'],
    { wahl: [
      { t: '„Wenn alle schauen.“', merke: 'schwerSchauen', dann: [['kaya', 'Kenn ich. Dann wird der Kopf leer, oder?']] },
      { t: '„Die Pausen. Wo soll ich hin?“', merke: 'schwerPause', dann: [['kaya', 'Pausen. Die längsten fünfzehn Minuten der Welt.']] },
      { t: '„Fehler. Der ganze Rotstift.“', merke: 'schwerFehler', dann: [['kaya', 'Lieber gar nicht anfangen als falsch. Kenn ich.']] },
      { t: '„Weiß nicht. Alles irgendwie.“', merke: 'schwerAlles', dann: [['kaya', 'Auch eine Antwort. Dann fangen wir klein an.']] },
    ] },
    ['kaya', 'Ich hab einen Trick. Klingt blöd. Geht aber.'],
    ['kaya', 'Wie kaltes Wasser im Freibad. Erst furchtbar.'],
    ['kaya', 'Wer gleich rausspringt, merkt nie, dass es warm wird.'],
    ['kaya', 'Wir machen eine Liste. Unten das Leichteste.'],
    { tu: 'leiterBauen' },
    ['kaya', 'Also: drinbleiben, bis es warm wird.'],
    ['kaya', 'Geht gar nicht? Dann kleinere Stufe. Kein Drama.'],
    { tu: 'leiterStart' },
    ['kaya', 'Und das hier. Eine Karte. Steht „Gleich“ drauf.'],
    ['kaya', 'Leg sie hin, wenn du drankommst und nichts geht.'],
    { wahl: [
      { t: 'Karte nehmen.', merke: 'karte', dann: [['kaya', 'M. Hoffmann weiß Bescheid. Die anderen nicht.']] },
      { t: '„Brauch ich nicht. Ist peinlich.“', merke: 'keineKarte', dann: [['kaya', 'Okay. Sie liegt hier, falls doch.']] },
      { t: 'Nehmen. Sofort in die Tasche.', merke: 'karte', dann: [['kaya', 'Genau da gehört sie hin.']] },
    ] },
  ],
  k6_pause: [
    ['erzaehler', 'Noah, Ayla, Yusuf. Sie reden über irgendwas.'],
    ['erzaehler', 'Yusuf zeigt ein Video rum. Keiner guckt dich an.'],
    { tu: 'probePause' },
  ],
  k6_lachen: [
    ['erzaehler', 'Jo, Ben und Luca. Lautes Lachen.'],
    ['erzaehler', 'Ben schaut kurz rüber. Dann wieder weg.'],
    ['kopf', 'Die lachen über dich. Wegen dem Bild.'],
    { tu: 'sicherVorher' },
    { wahl: [
      { t: 'Schnell vorbei. Nicht hinschauen.', merke: 'lachenWeg', dann: [
        ['erzaehler', 'Treppe hoch. Der Gedanke kommt mit.'],
        ['kopf', 'Bestimmt reden die jetzt weiter.'],
        ['erzaehler', 'Zweite Stunde. Mila hält dir ihr Handy hin.'],
        ['mila', 'Schon gesehen? Die Katze mit dem Toast?'],
        ['mila', 'Ben zeigt’s seit heute früh allen.'],
        ['kopf', '…'],
        { tu: 'sicherNachher' } ] },
      { t: 'Stehen bleiben. Genauer hinschauen.', staerke: 'pruefen', merke: 'lachenGeschaut', dann: [
        ['erzaehler', 'Du guckst nochmal hin. Genauer.'],
        ['erzaehler', 'Bens Handy liegt quer. Alle drei starren drauf.'],
        ['erzaehler', 'Luca hält sich den Bauch. Er zeigt aufs Display.'],
        ['erzaehler', 'Ben hat kurz geschaut. Jetzt wieder nur aufs Handy.'],
        { wahl: [
          { t: '„Die lachen über ein Video.“', dann: [] },
          { t: '„Die lachen trotzdem über mich.“', dann: [['kopf', 'Ganz sicher. Oder?']] },
          { t: '„Kann beides sein.“', dann: [] },
        ] },
        { tu: 'sicherNachher' },
        { wahl: [
          { t: 'Weitergehen.', dann: [] },
          { t: '„Was ist so lustig?“', staerke: 'kontakt', dann: [
            ['ben', 'Katze. Toast. Guck.'],
            ['erzaehler', 'Es ist wirklich eine Katze mit Toast.'],
            ['jo', 'Schick ich dir. Ach so. Bist ja nicht mehr drin.'],
            ['erzaehler', 'Kurz ist es still.'],
            ['luca', 'Ich schick’s dir. Gib Nummer.'] ] },
        ] } ] },
      { t: 'Hingehen: „Was gibt’s da zu lachen?“', merke: 'lachenAngriff', dann: [
        ['jo', 'Chill. Katzenvideo.'],
        ['ben', 'Bisschen empfindlich, oder?'],
        ['erzaehler', 'Sie zeigen es dir. Es ist wirklich eine Katze.'],
        ['kopf', 'Jetzt halten die dich für komisch.'],
        { tu: 'sicherNachher' } ] },
    ] },
  ],
  k6_tafel: [
    ['hoffmann', 'Seite 34. Wer liest Nummer drei?'],
    ['erzaehler', 'Keiner meldet sich.'],
    ['hoffmann', '{name}. Du.'],
    ['erzaehler', 'Alle drehen sich um. Der Kopf ist leer.'],
    ['erzaehler', 'Das Herz klopft bis in die Ohren.'],
    { wahl: [
      { t: '(Nichts sagen. Auf den Tisch starren.)', merke: 'tafelStumm', dann: [
        ['erzaehler', 'Fünf Sekunden. Sehr lange Sekunden.'],
        ['hoffmann', '… Okay. Ayla?'],
        ['ben', '(flüstert) Roboter.'],
        ['erzaehler', 'Ayla liest. Langsam wird dein Gesicht wieder kühl.'] ] },
      { t: '„Gleich. Ich brauch kurz.“', staerke: 'zeit', merke: 'tafelGleich', dann: [
        ['hoffmann', 'Okay. Ich komm zu dir zurück.'],
        ['kopf', 'Super. Jetzt wartest du die ganze Stunde darauf.'],
        ['erzaehler', 'Zehn Minuten später.'],
        ['hoffmann', '{name}? Nur der erste Satz.'],
        { wahl: [
          { t: 'Den ersten Satz lesen.', staerke: 'mut6', merke: 'tafelGelesen', dann: [
            ['erzaehler', '„Je m’appelle Léa et j’ai treize ans.“'],
            ['hoffmann', 'Danke.'],
            ['erzaehler', 'Das war’s. Fünf Sekunden.'] ] },
          { t: 'Kopf schütteln.', dann: [['hoffmann', 'Okay. Nächstes Mal.']] },
        ] } ] },
      { t: '„Keine Ahnung.“', merke: 'tafelGelesen', dann: [
        ['hoffmann', 'Doch. Steht da. Lies einfach.'],
        ['erzaehler', 'Du liest. Zu leise. Zu schnell.'],
        ['jo', '(kichert)'],
        ['hoffmann', 'Danke. War richtig.'],
        ['erzaehler', 'Richtig. Und trotzdem brennen die Ohren.'] ] },
      { t: '„Darf ich aufs Klo?“', merke: 'tafelKlo', dann: [
        ['hoffmann', '… Geh.'],
        ['erzaehler', 'Auf dem Klo ist es still. Zwölf Minuten.'],
        ['erzaehler', 'Zurück. Die Stunde ist fast rum.'],
        ['kopf', 'Geschafft. Fürs Erste.'],
        ['erzaehler', 'Morgen ist wieder Französisch.'] ] },
      { t: '(Die „Gleich“-Karte hinlegen.)', wenn: (m) => m.karte, staerke: 'zeit', merke: 'tafelKarte', dann: [
        ['hoffmann', '(nickt) Ich komm später zu dir.'],
        ['erzaehler', 'Niemand hat’s gemerkt. Nur er.'],
        ['erzaehler', 'Zehn Minuten später.'],
        ['hoffmann', 'Nur der erste Satz?'],
        { wahl: [
          { t: 'Lesen.', staerke: 'mut6', merke: 'tafelGelesen', dann: [['erzaehler', '„Je m’appelle Léa …“'], ['hoffmann', 'Gut. Danke.']] },
          { t: 'Nochmal auf die Karte tippen.', dann: [['hoffmann', 'Okay. Morgen.']] },
        ] } ] },
    ] },
    { tu: 'tafelFolge' },
  ],
  k6_test: [
    ['laurent', 'Eure Tests. Schaut erst mal selbst.'],
    ['erzaehler', '7 von 20. Viel Rot.'],
    ['kritiker', 'Wow. Eine Sieben. Rahm’s dir ein.'],
    ['kritiker', 'Steck’s weg. Bevor’s einer sieht.'],
    { wahl: [
      { t: 'Blatt in den Rucksack. Nie wieder anschauen.', merke: 'testWeg', dann: [
        ['kritiker', 'Gut so. Bloß nicht hinsehen.'],
        ['erzaehler', 'Das Blatt knistert die ganze Woche im Rucksack.'] ] },
      { t: 'Den kleinsten Fehler suchen.', staerke: 'fehler', merke: 'testKlein', dann: [
        ['erzaehler', 'Aufgabe 2. Nur ein Fehler. Das Komma.'],
        { tu: 'fehlerAufgabe' },
        ['kritiker', '… war ja auch leicht.'],
        ['laurent', 'Ein Fehler weniger. Reicht für heute.'] ] },
      { t: 'Mme Laurent: „Was ist hier falsch?“', staerke: 'hilfe', merke: 'testFrage', dann: [
        ['laurent', 'Zeig. Ah. Rechnen kannst du.'],
        ['laurent', 'Nur das Komma rutscht. Dreimal derselbe Fehler.'],
        ['kritiker', 'Dreimal! Peinlich.'],
        ['laurent', 'Einmal üben heißt: drei Punkte mehr.'],
        { tu: 'fehlerAufgabe' } ] },
      { t: 'Zu Mila: „Wie viel hast du?“', merke: 'testMila', dann: [
        ['mila', 'Zwölf.'],
        ['kritiker', 'Siehst du. Alle besser als du.'],
        ['mila', 'Ich hab Nachhilfe. Seit zwei Jahren.'],
        ['mila', 'Davor hatte ich auch sieben.'] ] },
    ] },
  ],
  k6_stufe: [
    ['kaya', 'Freitag. Eine Stufe noch, wenn du willst.'],
    { tu: 'stufeVorschlag' },
    { wahl: [
      { t: 'Bäcker: selbst bestellen.', merke: 'stufeBaecker', dann: [['kaya', 'Gut. Zehn Uhr fünfzehn ist die Schlange kurz.']] },
      { t: 'Kantine: zu den anderen setzen.', merke: 'stufeKantine', dann: [['kaya', 'Gut. Du musst nicht reden. Nur sitzen.']] },
      { t: '„Heute keine. Bin durch.“', merke: 'stufeKeine', dann: [
        ['kaya', 'Okay. Dann Wochenende. Ich ess dein Brötchen mit.'],
        ['kaya', 'Montag dann. Schönes Wochenende.'] ] },
    ] },
  ],
  k6_baecker: [
    ['erzaehler', 'Zwei Leute vor dir. Es riecht nach Zucker.'],
    ['erzaehler', 'Gleich musst du was sagen. Laut. Zu einer Fremden.'],
    { tu: 'probeBaecker' },
  ],
  k6_kantine: [
    ['erzaehler', 'Ein Platz ist frei. Neben Yusuf.'],
    { tu: 'probeKantine' },
  ],
  k6_ende: [
    ['erzaehler', 'Freitag. Bus.'],
    { tu: 'wocheZeigen' },
    ['erzaehler', 'Handy. Herr Kaya: „Schönes Wochenende.“'],
    ['erzaehler', 'Kaya schreibt: „Montag gleiche Zeit? Ich bring Brötchen.“'],
    { tu: 'kapitelEnde' },
  ],
};

// Lycée-Simulator – Kapitel 4 „Nein sagen“ (dritte Woche).
// Situationen: ein Freund will abschreiben (Nein sagen und trotzdem helfen) · Schwänzen und Dampfen hinter der Turnhalle
// (Nein sagen, weggehen) · Hausaufgaben-Club mit den Aufgaben der Lehrperson (Phase 2, lernen.js) · Folgen kommen von
// Menschen (gleiche Fehler im Heft, Frau Sommer fragt nach) · Streit schlichten (Reihenfolge-Spiel) · ein Wochenziel setzen.
// Kurze Sätze, keine Moral-Stimme, keine Strafe vom Spiel. Erfundene Namen.

export const STAERKEN4 = {
  neinsagen: { name: 'Nein sagen', text: 'Nein gesagt. Und trotzdem noch gegrüßt worden.' },
  schlichten: { name: 'Streit schlichten', text: 'Du hast geholfen, dass zwei wieder reden.' },
  ziel: { name: 'Ein Ziel setzen', text: 'Du hast dir etwas für nächste Woche vorgenommen.' },
  dranbleiben: { name: 'Dranbleiben', text: 'Du hast Aufgaben gelöst, auch wenn es schwer war.' },
};

export const LEUTE4 = {
  laurent: { reich: 3.2, name: 'Mme Laurent', modell: 'frauen', stil: 'Suit', haut: '#d8a982', haar: '#5a5a5a', oben: '#8a5a3a', unten: '#2f2f3a', schuhe: '#2b2b2b', farbe: '#8a5a3a', erwachsen: true },
};

// Mme Laurent steht immer im CDI an der Ausleihe (Lernstation), wenn die Geschichte sie nicht woanders braucht
export const IMMER = { laurent: [-4.2, -28.3, 0] };

export const ORTE4 = {
  hinterHalle: { x: 60.4, z: -14 },
  wc: { x: 24, z: -21.5 },
};

const SAAL = { hoffmann: [-27, -24, Math.PI / 2], ayla: [-24.25, -27.82, -Math.PI / 2, 'sitzt'], ben: [-22.15, -19.78, -Math.PI / 2, 'sitzt'], chiara: [-20.05, -24.42, -Math.PI / 2, 'sitzt'], yusuf: [-22.15, -26.58, -Math.PI / 2, 'sitzt'], jo: [-17.95, -21.02, -Math.PI / 2, 'sitzt'], lina: [-17.95, -26.58, -Math.PI / 2, 'sitzt'], mila: [-20.05, -23.18, -Math.PI / 2, 'sitzt'], noah: [-24.25, -23.18, -Math.PI / 2, 'sitzt'] };

export const SCHRITTE4 = [
  { id: 'k4_noah', kap: 4, tag: 'Dienstag', uhr: 7.85, titel: 'Abschreiben?', ziel: 'Noah wartet am Eingang. Er will etwas von dir.', marker: 'noah',
    start: { teleport: 'eingangHof', gespraech: 'k4_intro' },
    leute: { noah: [1.6, 6.2, Math.PI], mila: [-20, 11.6, Math.PI, 'sitzt'], ayla: [6, 14, 2.4, 'redet'], yusuf: [7.2, 13, -0.8, 'redet'] },
    fertig: { reden: 'noah', gespraech: 'abschreiben' } },
  { id: 'k4_baecker', kap: 4, tag: 'Dienstag', uhr: 10.0, titel: 'Große Pause', ziel: 'Ayla und Noah stehen am Brunnen.', marker: 'ayla',
    start: { teleport: 'eingangHof' },
    leute: { ayla: [-6.9, 14.0, 2.4, 'redet'], noah: [-8.5, 13.6, -2.2, 'redet'], ben: [4, 22, 0] },
    fertig: { reden: 'ayla', gespraech: 'baecker' } },
  { id: 'k4_skate', kap: 4, tag: 'Dienstag', uhr: 12.6, titel: 'Die Skate-Ecke', ziel: 'Mittagspause. An der Rampe ist was los.', marker: 'kenan',
    start: { teleport: 'eingangHof' },
    leute: { kenan: [-34.6, 11.2, 0.6], luca: [-33.2, 13.6, -2.2, 'redet'], dario: [-37.4, 12.6, 1.2] },
    fertig: { reden: 'kenan', gespraech: 'skate' } },
  { id: 'k4_halle', kap: 4, tag: 'Mittwoch', uhr: 10.05, titel: 'Hinter der Turnhalle', ziel: 'Dario ruft dich. Er steht hinter der Turnhalle.', marker: 'dario',
    start: { teleport: 'eingangHof', gespraech: 'k4_mi' },
    leute: { dario: [60.6, -13.4, -Math.PI / 2], luca: [61.4, -14.8, -2.2], noah: [2, 14, 0.6, 'redet'], ayla: [3, 15.3, -2.5, 'redet'] },
    fertig: { reden: 'dario', gespraech: 'schwaenzen' } },
  { id: 'k4_wc', kap: 4, tag: 'Mittwoch', uhr: 11.0, titel: 'Nach Sport', ziel: 'Hände waschen. Das WC ist am Ende vom Gang.', marker: 'wc',
    start: { teleport: 'halle' },
    leute: { ben: [4, -16, 1.5, 'redet'], noah: [5.4, -15.4, -1.6, 'redet'] },
    fertig: { ort: 'wc', r: 2.5, gespraech: 'portemonnaie' } },
  { id: 'k4_hoffmann', kap: 4, tag: 'Donnerstag', uhr: 9.9, titel: 'Bleibt kurz da', ziel: 'M. Hoffmann will mit dir reden. Saal 1.04.', marker: 'hoffmann',
    wenn: (m) => m.abgeschrieben,
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-26.4, -22.6, Math.PI / 2], noah: [-25.85, -20.8, -Math.PI / 2] },
    fertig: { reden: 'hoffmann', gespraech: 'abschreibSzene' } },
  { id: 'k4_club', kap: 4, tag: 'Donnerstag', uhr: 14.1, titel: 'Hausaufgaben-Club', ziel: 'Hausaufgaben-Club im CDI. Sprich mit Mme Laurent.', marker: 'laurent',
    start: { teleport: 'halle', gespraech: 'k4_do' },
    leute: { laurent: [-4.2, -28.3, 0], chiara: [-11.0, -22.9, Math.PI / 2, 'sitzt'], noah: [-11.0, -21.9, Math.PI / 2, 'sitzt'], mila: [-6.2, -20.5, Math.PI, 'sitzt'] },
    fertig: { reden: 'laurent', gespraech: 'club' } },
  { id: 'k4_streit', kap: 4, tag: 'Freitag', uhr: 10.1, titel: 'Streit auf dem Hof', ziel: 'Ben und Jo streiten sich. Geh hin.', marker: 'ben',
    start: { teleport: 'eingangHof', gespraech: 'k4_fr' },
    leute: { ben: [27.6, 18.4, 1.2, 'redet'], jo: [29.2, 18.9, -1.9, 'redet'], yusuf: [26.2, 21.4, 0.8], lina: [30.8, 21.8, -0.8], sommer: [16, 4, 0.4], mila: [-20, 11.6, Math.PI, 'sitzt'], hoffmann: [22, 14, 0.8], noah: [25, 20.6, -0.4], luca: [31.6, 19.8, -1.6] },
    fertig: { reden: 'ben', gespraech: 'streit' } },
  { id: 'k4_ziel', kap: 4, tag: 'Freitag', uhr: 13.6, titel: 'Ein Ziel für nächste Woche', ziel: 'M. Hoffmann fragt nach euren Zielen. Sprich mit ihm.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer' },
    leute: SAAL,
    fertig: { reden: 'hoffmann', gespraech: 'ziel' } },
  { id: 'k4_heim', kap: 4, tag: 'Freitag', uhr: 15.5, titel: 'Wochenende', ziel: 'Geh zur Bushaltestelle.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { noah: [-21.5, 42.2, 0.3], mila: [-23.5, 42.4, -0.3], ben: [-25, 41.8, 0.6], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'k4_ende' } },
];

export const GESPRAECHE4 = {
  k4_intro: [
    ['erzaehler', 'Dritte Woche. Dienstag, 7:50 Uhr.'],
  ],
  abschreiben: [
    ['noah', 'Hast du Mathe? Schnell, bitte.'],
    ['noah', 'Hoffmann sammelt ein. Ich hab schon zwei Striche.'],
    { tu: 'noahSchuld' },
    { wahl: [
      { t: '„Hier. Aber änder ein paar Sachen.“', herz: { noah: 2 }, merke: 'abgeschrieben', dann: [
        ['noah', 'Danke. Du rettest mich.'],
        ['erzaehler', 'Er ändert nichts. Keine Zeit.'] ] },
      { t: '„Nein. Ich hab zwei Stunden dran gesessen.“', staerke: 'neinsagen', herz: { noah: -1 }, merke: 'nichtGegeben', dann: [
        ['noah', 'Okay. Schon klar.'],
        ['erzaehler', 'In der Pause steht er bei Ayla. Nicht bei dir.'] ] },
      { t: '„Nein. Aber in der Pause zeig ich’s dir.“', staerke: 'neinsagen', merke: 'erklaert', dann: [
        ['noah', 'Er sammelt um acht ein. Pause ist zu spät.'],
        ['erzaehler', 'Er kriegt den dritten Strich. In der Pause kommt er trotzdem.'] ] },
      { t: '„Frag Chiara. Die hat alles.“', merke: 'weitergeschoben', dann: [
        ['noah', 'Chiara gibt nie was.'],
        ['noah', '… Egal. Vergiss es.'] ] },
    ] },
  ],
  k4_mi: [
    ['erzaehler', 'Mittwoch, große Pause. Gleich ist Sport.'],
    ['dario', '(ruft) Hey, {name}! Komm mal her!'],
  ],
  schwaenzen: [
    ['erzaehler', 'Hinter der Turnhalle. Es riecht nach Mango.'],
    ['dario', 'Wir gehen zum Bäcker. Sport ist eh nur Zirkeltraining.'],
    ['luca', 'Die Sommer zählt nie durch. Ehrlich.'],
    ['dario', 'Kommst du? Wir laden dich ein.'],
    ['stolz', 'Die fragen DICH. Nicht Noah. Dich.'],
    ['bauch', 'Croissant. Warm. Mit Schokolade.'],
    ['kopf', 'Sommer zählt durch. Immer. Luca lügt.'],
    { wahl: [
      { t: '„Nee. Heute gibt’s Noten.“', staerke: 'neinsagen', dann: [
        ['luca', 'Noten. Wow.'],
        ['dario', 'Lass. Nächstes Mal.'] ] },
      { t: '„Okay. Aber nur heute.“', herz: { dario: 2, luca: 1 }, merke: 'geschwaenzt', dann: [
        ['erzaehler', 'Ihr geht hinten raus. Über den Parkplatz.'],
        ['erzaehler', 'Beim Bäcker zahlt Dario dein Croissant.'],
        ['dario', 'Siehst du. Entspannt.'] ] },
      { t: '„Ich geh. Aber ich hab euch nicht gesehen.“', staerke: 'loyal', herz: { dario: 1 }, merke: 'deckt', dann: [
        ['dario', '(grinst) Fair.'] ] },
      { t: '„Hab kein Geld dabei.“', dann: [
        ['dario', 'Hab ich doch gesagt. Wir zahlen.'],
        { wahl: [
          { t: '„… Okay.“', herz: { dario: 2 }, merke: 'geschwaenzt', dann: [['erzaehler', 'Croissant. Warm. Drinnen pfeift Sommer.']] },
          { t: '„Trotzdem nicht.“', staerke: 'neinsagen', dann: [['luca', 'Komisch, du.']] },
        ] } ] },
    ] },
    ['luca', '(hält dir die Vape hin) Mango. Schmeckt nach nix.'],
    { wahl: [
      { t: '„Nee, lass mal.“', staerke: 'neinsagen', dann: [
        ['luca', 'Mehr für mich.'],
        ['erzaehler', 'Er pustet dir eine Wolke ins Gesicht.'] ] },
      { t: 'Einmal ziehen. Nicht husten.', herz: { luca: 1 }, merke: 'gezogen', dann: [
        ['erzaehler', 'Süß. Dann kratzt es. Du hustest nicht. Fast.'],
        ['luca', 'Oha. Die meisten husten.'] ] },
      { t: '„Ich hab Asthma.“ (Stimmt nicht.)', merke: 'asthmaLuege', dann: [
        ['luca', 'Ah. Okay. Sorry.'] ] },
      { t: '(Handy raus. Tun, als ob du schreibst.)', staerke: 'lesen', dann: [
        ['luca', 'Hallo? Erde an {name}.'],
        ['dario', 'Lass. Will halt nicht.'] ] },
    ] },
    { tu: 'schwaenzFolge' },
  ],
  baecker: [
    ['ayla', 'Bäcker gegenüber? Die haben heute Kirsch-Teilchen.'],
    ['noah', 'Komm mit, {name}!'],
    ['erzaehler', 'Du hast zwei Euro. Die sind für die Kantinenkarte.'],
    { wahl: [
      { t: 'Mitgehen. Kaufen. Morgen ist morgen.', herz: { ayla: 1, noah: 1 }, merke: 'kantinengeldWeg', dann: [
        ['erzaehler', 'Kirsch. Noch warm. Ayla erzählt von ihrer Band.'],
        ['erzaehler', 'Zwei Euro weg.'] ] },
      { t: '„Hab keinen Hunger.“ (Magen knurrt.)', merke: 'baeckerLuege', dann: [
        ['erzaehler', 'Du gehst mit. Und schaust zu.'],
        ['ayla', 'Willst du ein Stück? … Nein? Okay.'] ] },
      { t: '„Bin pleite. Geht ohne mich.“', staerke: 'ehrlich', dann: [
        { tu: 'noahZahlt' } ] },
      { t: 'Mitgehen. Nichts kaufen. Handy raus.', dann: [
        ['erzaehler', 'Du stehst daneben. Wie Deko.'] ] },
    ] },
    ['erzaehler', 'Später, im Gang. Ben kommt angelaufen.'],
    ['ben', 'Hast du zwei Euro? Kriegst du morgen.'],
    { tu: 'benMorgen' },
    { tu: 'benLeihen' },
  ],
  skate: [
    ['erzaehler', 'An der Rampe. Kenan fährt. Luca hat das Handy oben.'],
    { tu: 'skateLuca' },
    ['luca', 'Hey. Einmal über die Box. Mit Kenans Board. Ich film.'],
    ['kenan', 'Lass. Kann ja nicht jeder.'],
    ['luca', 'Eben. Darum ist es ja lustig.'],
    ['stolz', 'Zeig’s ihm. Einmal. Wie schwer kann das sein?'],
    ['kopf', 'Luca will kein Video von dir. Er will ein lustiges.'],
    { wahl: [
      { t: 'Board nehmen. Fahren.', herz: { luca: 1, kenan: 1 }, merke: 'gefahren', dann: [
        ['erzaehler', 'Anlauf. Box. Das Board fliegt. Du auch.'],
        ['erzaehler', 'Knie auf. Alle lachen. Luca filmt weiter.'],
        ['luca', 'Der geht in die Gruppe.'],
        { wahl: [
          { t: '„Gib her. Lösch das.“', staerke: 'klar', merke: 'clipWeg', dann: [
            ['luca', '(hält es hoch) Hol’s dir.'],
            ['kenan', 'Luca. Lösch. Jetzt.'],
            ['luca', '… Langweiler. (löscht)'] ] },
          { t: 'Mitlachen. „Nochmal. Diesmal richtig.“', staerke: 'humor', herz: { kenan: 2, luca: 1 }, merke: 'nochmal', dann: [
            ['erzaehler', 'Zweiter Versuch. Wackelig. Aber du stehst.'],
            ['kenan', 'Okay. Hätt ich nicht gedacht.'],
            ['luca', 'Den ersten poste ich trotzdem.'] ] },
          { t: '(Board liegen lassen. Gehen.)', staerke: 'abstand', merke: 'skateWeg', dann: [
            ['luca', 'Ey, beleidigt?'],
            ['erzaehler', 'Das Knie brennt. Du gehst trotzdem nicht schneller.'] ] },
        ] } ] },
      { t: '„Film dich doch selbst.“', herz: { luca: -1, kenan: 1 }, dann: [
        ['dario', 'Uuuh.'],
        ['luca', 'Große Klappe für so klein.'],
        ['kenan', '(grinst) Hat aber recht.'] ] },
      { t: '„Nur ohne Kamera.“', staerke: 'klar', herz: { kenan: 1 }, dann: [
        ['luca', 'Dann ist es ja sinnlos.'],
        ['kenan', 'Komm. Ich zeig’s dir. Ohne den.'],
        ['erzaehler', 'Kenan hält dich am Arm. Dreimal. Beim vierten geht es.'] ] },
      { t: '„Kein Bock heute.“ (Handy raus)', dann: [
        ['luca', 'Schiss, oder?'],
        ['erzaehler', 'Dario sagt nichts. Kenan fährt weiter.'] ] },
    ] },
  ],
  portemonnaie: [
    ['erzaehler', 'WC. Auf dem Waschbecken liegt ein Portemonnaie.'],
    ['erzaehler', 'Bens Schülerausweis. Und ein Zwanziger.'],
    ['erzaehler', 'Niemand sonst ist hier.'],
    { tu: 'benSchuldet' },
    { wahl: [
      { t: 'Ben bringen. Alles drin lassen.', staerke: 'ehrlich', herz: { ben: 2 }, merke: 'portiZurueck', dann: [
        ['ben', 'Oh nein. Wo war das?'],
        ['ben', 'Danke. Echt. Ich schulde dir was.'],
        ['erzaehler', 'Das sagt er öfter.'] ] },
      { t: 'Vier Euro raus. Den Rest bringen.', herz: { ben: 1 }, merke: 'vierGenommen', dann: [
        ['ben', 'Danke! Mein ganzes Geld!'],
        ['erzaehler', 'Er zählt nicht nach. Noch nicht.'] ] },
      { t: 'Bei Mme Weber abgeben.', staerke: 'hilfe', herz: { weber: 1 }, merke: 'portiWeber', dann: [
        ['weber', 'Fundsache. Danke. Ich sag ihm Bescheid.'],
        ['erzaehler', 'Keiner weiß, dass du es warst.'] ] },
      { t: 'Liegen lassen. Nicht dein Problem.', staerke: 'abstand', merke: 'portiLiegen', dann: [
        ['erzaehler', 'Du wäschst dir die Hände. Und gehst.'] ] },
      { t: 'Zwanziger nehmen. Portemonnaie in den Müll.', merke: 'zwanzigGenommen', dann: [
        ['erzaehler', 'Zwanzig Euro. Reicht für zwei Wochen Kantine.'] ] },
    ] },
  ],
  abschreibSzene: [
    { tu: 'abschreibFolge' },
  ],
  k4_do: [
    ['erzaehler', 'Donnerstag, 14 Uhr. Im CDI gibt es den Hausaufgaben-Club.'],
  ],
  club: [
    ['laurent', 'Setzen. Mme Laurent. Drei Aufgaben, dann seid ihr frei.'],
    ['laurent', 'Von euren Lehrern. Sie haben sich Mühe gegeben. Leider.'],
    ['laurent', 'Kekse in der Dose. Erst nach Aufgabe drei.'],
    { tu: 'lernmoment' },
    ['laurent', 'Fertig? Donnerstag wieder. Kekse auch.'],
  ],
  k4_fr: [
    ['erzaehler', 'Freitag, Pause. Vom Korbballfeld hörst du Geschrei.'],
  ],
  streit: [
    { tu: 'portiFolge' },
    ['erzaehler', 'Korbballfeld. Ein Kreis aus Leuten. Drei Handys oben.'],
    ['ben', 'Gib das Handy her! Lösch das!'],
    ['jo', 'Hol’s dir doch. (hält es hoch)'],
    ['erzaehler', 'Ben schubst Jo. Jo stolpert. Der Kreis wird enger.'],
    { wahl: [
      { t: 'Dazwischen: „Stopp. Ben, lass.“', staerke: 'mut', herz: { ben: -1 }, merke: 'dazwischen', dann: [
        ['ben', 'Halt dich raus!'],
        ['erzaehler', 'Sein Ellbogen trifft deine Schulter. Aus Versehen. Wohl.'],
        ['sommer', 'Was ist hier los? Ben, Jo, {name}: mitkommen!'],
        ['sommer', 'Mir egal, wer angefangen hat. Alle drei nachsitzen.'] ] },
      { t: 'Frau Sommer holen. Sie steht am Vordach.', staerke: 'hilfe', merke: 'sommerGeholt', dann: [
        ['erzaehler', 'Du rennst. Sommer telefoniert. Sie hebt einen Finger.'],
        ['erzaehler', 'Als sie kommt, ist es vorbei.'],
        ['luca', '(im Vorbeigehen) Petze.'] ] },
      { t: 'Auch filmen.', herz: { jo: 1, ben: -1 }, merke: 'gefilmt', dann: [
        ['erzaehler', 'Gutes Video. Ben am Boden. Alle schreien.'],
        ['erzaehler', 'Abends: 40 Aufrufe. Dein Name steht drunter.'] ] },
      { t: '„Jo, dein Schuh ist offen.“', staerke: 'humor', herz: { ben: 1, jo: -1 }, merke: 'abgelenkt', dann: [
        ['erzaehler', 'Jo schaut runter. Ben schnappt das Handy.'],
        ['ben', 'Gelöscht. Danke, {name}.'],
        ['jo', 'Ernsthaft? Das merk ich mir.'] ] },
      { t: '(Weggehen.)', staerke: 'abstand', dann: [
        ['erzaehler', 'Hinter dir wird es lauter. Dann pfeift jemand.'] ] },
    ] },
  ],
  ziel: [
    { tu: 'torGespraech' },
    ['hoffmann', 'Neue Methode: das Wochenziel. Eins. Klein. Kein Aufsatz.'],
    ['hoffmann', '{name}? Was nimmst du dir vor? Kein Weltfrieden.'],
    { wahl: [
      { t: 'Einmal im Unterricht etwas fragen.', staerke: 'ziel', merke: 'zielFragen', dann: [['hoffmann', 'Notiert. Ich frag Freitag nach.']] },
      { t: 'Frau Kremer nach Nachschlag fragen.', staerke: 'ziel', merke: 'zielAnsprechen', dann: [['hoffmann', 'Notiert. Mutig. Sie zählt jede Portion.']] },
      { t: 'Jeden Tag pünktlich am Bus sein.', staerke: 'ziel', merke: 'zielPuenktlich', dann: [['hoffmann', 'Der 7:35 wartet nicht. Frau Weber auch nicht.']] },
      { t: 'Donnerstags in den Hausaufgaben-Club.', staerke: 'ziel', merke: 'zielClub', dann: [['hoffmann', 'Mme Laurent freut sich.']] },
      { t: '„Weiß nicht. Die Woche überleben.“', merke: 'zielUeberleben', dann: [['hoffmann', '(kurzes Lachen) Ehrlich. Nehm ich auch.'], ['jo', 'Gleiches Ziel.']] },
    ] },
    ['hoffmann', 'Ich schreibe es auf. Nächste Woche schauen wir, wie es lief.'],
  ],
  k4_ende: [
    ['erzaehler', 'Freitag, 15:30 Uhr. Die dritte Woche ist vorbei.'],
    { tu: 'noahWoche' },
    ['fahrer', 'Wer hat den Kaugummi unter Sitz vier geklebt? Ich find dich.'],
    { tu: 'kapitelEnde' },
  ],
};

// Streit schlichten: Schritte in eine gute Reihenfolge bringen (Tipp bei falscher Wahl, kein Fehlschlag)
export const SCHLICHTEN = {
  titel: 'Streit schlichten',
  frage: 'Was machst du zuerst? Wähle Schritt für Schritt.',
  schritte: [
    { t: '„Stopp. Wir reden – einer nach dem anderen.“', tipp: '' },
    { t: 'Jeder erzählt, was passiert ist. Die anderen hören zu.', tipp: 'Erst muss es ruhig werden, sonst hört keiner zu.' },
    { t: 'Fragen: Was braucht ihr beide?', tipp: 'Erst sollen beide erzählen dürfen.' },
    { t: 'Zusammen eine Lösung finden.', tipp: 'Erst fragen, was beide brauchen.' },
  ],
};

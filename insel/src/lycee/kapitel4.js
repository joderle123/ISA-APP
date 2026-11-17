// Lycée-Simulator – Kapitel 4 „Nein sagen“ (dritte Woche).
// Situationen: ein Freund will abschreiben (Nein sagen und trotzdem helfen) · Schwänzen und Dampfen hinter der Turnhalle
// (Nein sagen, weggehen) · Hausaufgaben-Club mit den Aufgaben der Lehrperson (Phase 2, lernen.js) · Folgen kommen von
// Menschen (gleiche Fehler im Heft, Frau Sommer fragt nach) · Streit schlichten (Reihenfolge-Spiel) · ein Wochenziel setzen.
// Kurze Sätze, keine Moral-Stimme, keine Strafe vom Spiel. Erfundene Namen.

export const STAERKEN4 = {
  neinsagen: { name: 'Nein sagen', text: 'Du hast Nein gesagt und bist freundlich geblieben.' },
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
};

const SAAL = { hoffmann: [-27, -24, Math.PI / 2], ayla: [-24.25, -27.82, -Math.PI / 2, 'sitzt'], ben: [-22.15, -19.78, -Math.PI / 2, 'sitzt'], chiara: [-20.05, -24.42, -Math.PI / 2, 'sitzt'], yusuf: [-22.15, -26.58, -Math.PI / 2, 'sitzt'], jo: [-17.95, -21.02, -Math.PI / 2, 'sitzt'], lina: [-17.95, -26.58, -Math.PI / 2, 'sitzt'], mila: [-20.05, -23.18, -Math.PI / 2, 'sitzt'], noah: [-24.25, -23.18, -Math.PI / 2, 'sitzt'] };

export const SCHRITTE4 = [
  { id: 'k4_noah', kap: 4, tag: 'Dienstag', uhr: 7.85, titel: 'Abschreiben?', ziel: 'Noah wartet am Eingang. Er will etwas von dir.', marker: 'noah',
    start: { teleport: 'eingangHof', gespraech: 'k4_intro' },
    leute: { noah: [1.6, 6.2, Math.PI], mila: [-20, 11.6, Math.PI, 'sitzt'], ayla: [6, 14, 2.4, 'redet'], yusuf: [7.2, 13, -0.8, 'redet'] },
    fertig: { reden: 'noah', gespraech: 'abschreiben' } },
  { id: 'k4_halle', kap: 4, tag: 'Mittwoch', uhr: 10.05, titel: 'Hinter der Turnhalle', ziel: 'Dario ruft dich. Er steht hinter der Turnhalle.', marker: 'dario',
    start: { teleport: 'eingangHof', gespraech: 'k4_mi' },
    leute: { dario: [60.6, -13.4, -Math.PI / 2], luca: [61.4, -14.8, -2.2], noah: [2, 14, 0.6, 'redet'], ayla: [3, 15.3, -2.5, 'redet'] },
    fertig: { reden: 'dario', gespraech: 'schwaenzen' } },
  { id: 'k4_club', kap: 4, tag: 'Donnerstag', uhr: 14.1, titel: 'Hausaufgaben-Club', ziel: 'Hausaufgaben-Club im CDI. Sprich mit Mme Laurent.', marker: 'laurent',
    start: { teleport: 'halle', gespraech: 'k4_do' },
    leute: { laurent: [-4.2, -28.3, 0], chiara: [-11.0, -22.9, Math.PI / 2, 'sitzt'], noah: [-11.0, -21.9, Math.PI / 2, 'sitzt'], mila: [-6.2, -20.5, Math.PI, 'sitzt'] },
    fertig: { reden: 'laurent', gespraech: 'club' } },
  { id: 'k4_streit', kap: 4, tag: 'Freitag', uhr: 10.1, titel: 'Streit auf dem Hof', ziel: 'Ben und Jo streiten sich. Geh hin.', marker: 'ben',
    start: { teleport: 'eingangHof', gespraech: 'k4_fr' },
    leute: { ben: [27.6, 18.4, 1.2, 'redet'], jo: [29.2, 18.9, -1.9, 'redet'], yusuf: [26.2, 21.4, 0.8], lina: [30.8, 21.8, -0.8], sommer: [16, 4, 0.4], mila: [-20, 11.6, Math.PI, 'sitzt'] },
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
    ['noah', 'Hey … hast du die Mathe-Hausaufgabe?'],
    ['noah', 'Kann ich abschreiben? Ich hatte gestern keine Zeit.'],
    { wahl: [
      { t: 'Nein. Aber ich erklär sie dir in der Pause.', staerke: 'neinsagen', herz: { noah: 1 }, merke: 'erklaert', dann: [
        ['noah', 'Hm. Okay. Aber in der Pause, versprochen?'], ['du', 'Versprochen.'], ['erzaehler', 'In der Pause rechnet ihr zusammen. Noah versteht es.'] ] },
      { t: 'Klar, hier.', herz: { noah: 1 }, merke: 'abgeschrieben', dann: [
        ['noah', 'Danke! Du rettest mich.'], ['erzaehler', 'Noah schreibt alles ab. Auch deine Fehler.'] ] },
      { t: 'Nein. Mach deinen Kram selbst.', herz: { noah: -1 }, dann: [
        ['noah', 'Wow. Okay.'], ['erzaehler', 'Noah geht. Den ganzen Morgen redet er kaum mit dir.'] ] },
    ] },
  ],
  k4_mi: [
    ['erzaehler', 'Mittwoch, große Pause. Gleich ist Sport.'],
    ['dario', '(ruft) Hey, {name}! Komm mal her!'],
  ],
  schwaenzen: [
    ['erzaehler', 'Hinter der Turnhalle. Luca hat eine Vape in der Hand.'],
    ['dario', 'Wir schwänzen Sport. Keiner merkt’s. Kommst du mit?'],
    { wahl: [
      { t: 'Nee, ich geh zu Sport.', staerke: 'neinsagen', dann: [['dario', 'Langweilig. Aber okay.']] },
      { t: 'Heute nicht. Ich hab Frau Sommer versprochen, zu kommen.', staerke: 'neinsagen', herz: { dario: 1 }, dann: [['dario', 'Ah, okay. Verstehe.']] },
      { t: 'Okay, ich komm mit.', merke: 'geschwaenzt', herz: { dario: 1 }, dann: [['erzaehler', 'Ihr sitzt hinter der Turnhalle. Drinnen hörst du die Pfeife.']] },
    ] },
    ['luca', 'Willst du mal ziehen?'],
    { wahl: [
      { t: 'Nein danke.', staerke: 'neinsagen', dann: [['luca', 'Mehr für mich.']] },
      { t: '(Einfach weggehen.)', staerke: 'neinsagen', dann: [['erzaehler', 'Du gehst. Niemand hält dich auf.']] },
      { t: 'Na gut … einmal.', merke: 'gezogen', dann: [['erzaehler', 'Du hustest. Es kratzt im Hals.'], ['luca', 'Haha, beim ersten Mal ist das so.'], ['erzaehler', 'Den Rest der Pause ist dir schlecht.']] },
    ] },
    { tu: 'schwaenzFolge' },
  ],
  k4_do: [
    ['erzaehler', 'Donnerstag, 14 Uhr. Im CDI gibt es den Hausaufgaben-Club.'],
  ],
  club: [
    { tu: 'abschreibFolge' },
    ['laurent', 'Willkommen im Club! Ich bin Mme Laurent.'],
    ['laurent', 'Heute habe ich Aufgaben von euren Lehrern. Drei Stück.'],
    ['laurent', 'Fehler sind hier erlaubt. Dafür ist der Club da.'],
    { tu: 'lernmoment' },
    ['laurent', 'Gut gemacht. Donnerstags bin ich immer hier.'],
  ],
  k4_fr: [
    ['erzaehler', 'Freitag, Pause. Vom Korbballfeld hörst du Geschrei.'],
  ],
  streit: [
    { tu: 'sommerFrage' },
    ['jo', 'Der Ball gehört uns! Wir waren zuerst da!'],
    ['ben', 'Quatsch! Wir spielen hier jeden Tag!'],
    ['erzaehler', 'Die beiden stehen ganz nah voreinander. Es wird laut.'],
    { wahl: [
      { t: 'Dazwischen gehen und helfen.', dann: [] },
      { t: 'Frau Sommer holen. Sie hat Aufsicht.', staerke: 'hilfe', merke: 'sommerGeholt', dann: [['sommer', 'Danke. Komm mit, wir machen das zusammen.']] },
    ] },
    { tu: 'schlichten' },
  ],
  ziel: [
    ['hoffmann', 'Drei Wochen sind um. Jeder sucht sich ein Ziel für nächste Woche.'],
    ['hoffmann', 'Klein und machbar. Was nimmst du dir vor, {name}?'],
    { wahl: [
      { t: 'Einmal im Unterricht etwas fragen.', staerke: 'ziel', merke: 'zielFragen', dann: [['hoffmann', 'Gutes Ziel. Ich achte darauf.']] },
      { t: 'Jemanden ansprechen, der allein ist.', staerke: 'ziel', merke: 'zielAnsprechen', dann: [['hoffmann', 'Schön. Das hilft der ganzen Klasse.']] },
      { t: 'Jeden Tag pünktlich am Bus sein.', staerke: 'ziel', merke: 'zielPuenktlich', dann: [['hoffmann', 'Gut. Wecker stellen hilft.']] },
      { t: 'Donnerstags in den Hausaufgaben-Club.', staerke: 'ziel', merke: 'zielClub', dann: [['hoffmann', 'Mme Laurent freut sich.']] },
    ] },
    ['hoffmann', 'Ich schreibe es auf. Nächste Woche schauen wir, wie es lief.'],
  ],
  k4_ende: [
    ['erzaehler', 'Freitag, 15:30 Uhr. Die dritte Woche ist vorbei.'],
    { tu: 'noahWoche' },
    ['erzaehler', 'Der Bus kommt. Schönes Wochenende.'],
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

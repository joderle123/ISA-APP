// Lycée-Simulator – Kapitel 2 „Die erste Woche“ (Dienstag bis Freitag).
// Situationen: Turnschuhe vergessen (ehrlich sein) · Teams wählen, jemand bleibt übrig (einbeziehen, widersprechen) ·
// Kritik nach dem Spiel aushalten · Mathe nicht verstanden (um Hilfe bitten statt abschreiben) · eine AG wählen ·
// gemeines Foto im Klassenchat (widersprechen, nicht mitlachen) · für jemanden da sein und Hilfe holen (SePAS) ·
// Aufregung vor dem Test (Atmen) · Klassenrat mit Ich-Botschaft · Wochenende planen (ja oder nein sagen).
// Gleicher Aufbau wie Kapitel 1 (geschichte.js). Kurze Sätze, keine Moral-Stimme, erfundene Namen.

const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE_SITZT = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1) };

export const STAERKEN2 = {
  ehrlich: { name: 'Ehrlich sein', text: 'Du hast gesagt, wie es wirklich ist.' },
  mut: { name: 'Für andere einstehen', text: 'Du hast gesagt: Das ist nicht okay.' },
  entscheiden: { name: 'Selbst entscheiden', text: 'Du hast dir etwas ausgesucht.' },
  ichbotschaft: { name: 'Ich-Botschaft', text: 'Du hast von dir gesprochen, ohne Vorwurf.' },
  atmen: { name: 'Sich beruhigen', text: 'Du hast geatmet, bis es ruhiger wurde.' },
};

export const LEUTE2 = {
  sommer: { name: 'Frau Sommer', modell: 'frauen', stil: 'Adventurer', haut: '#e8bf9a', haar: '#2b1d14', oben: '#d9523c', unten: '#2d3748', schuhe: '#ffffff', farbe: '#d9523c', erwachsen: true },
  kaya: { name: 'Herr Kaya', modell: 'menschen', stil: 'Casual2', haut: '#b07a55', haar: '#1b1410', oben: '#3fa66b', unten: '#3a3f4b', schuhe: '#6b4e3a', farbe: '#3fa66b', erwachsen: true },
};

export const ORTE2 = {
  turnhalleTuer: { x: 46, z: -3.4, yaw: Math.PI },
  meinPlatz: { x: -22.1, z: -24.4 },
};

const IN_DER_HALLE = { ben: [42, -16, 0.4], yusuf: [43.2, -17.2, 0.2], jo: [49, -16, -0.4], lina: [51.4, -11.5, -0.8], noah: [40.5, -14, 0.6], ayla: [50.2, -17.4, -0.3], chiara: [47.6, -18.4, 0] };
const HOF_DONNERSTAG = { noah: [16.6, 2.6, 0.8, 'redet'], ayla: [17.9, 3.8, -2.2, 'redet'], jo: [24.6, 6.4, -1.2, 'redet'], ben: [23.4, 7.4, 2.4, 'redet'], mila: [-20, 11.6, Math.PI, 'sitzt'], kenan: [-34, 9, 1], dario: [-32.6, 10.2, -2] };

export const SCHRITTE2 = [
  { id: 'di_sport', kap: 2, tag: 'Dienstag', uhr: 8.05, titel: 'Sport', ziel: 'Geh in die Turnhalle zu Frau Sommer.', marker: 'sommer',
    start: { teleport: 'turnhalleTuer', gespraech: 'di_intro' },
    leute: { sommer: [46, -13.5, 0], ...IN_DER_HALLE },
    fertig: { reden: 'sommer', gespraech: 'sommer1' } },
  { id: 'di_teams', kap: 2, tag: 'Dienstag', uhr: 8.2, titel: 'Teams wählen', ziel: 'Jo und Ben wählen Teams. Geh zu Jo.', marker: 'jo',
    leute: { sommer: [46, -11, 0], jo: [43.6, -20.5, 0], ben: [48.4, -20.5, 0], noah: [41.2, -14.5, Math.PI], lina: [42.6, -14.6, Math.PI], ayla: [44.2, -14.7, Math.PI], chiara: [49.4, -14.6, Math.PI], yusuf: [50.8, -14.5, Math.PI] },
    fertig: { reden: 'jo', gespraech: 'teams' } },
  { id: 'mi_cdi', kap: 2, tag: 'Mittwoch', uhr: 10.3, titel: 'Die Mathe-Hausaufgabe', ziel: 'Geh ins CDI. Chiara lernt dort.', marker: 'chiara',
    start: { teleport: 'halle', gespraech: 'mi_intro' },
    leute: { chiara: [-11.0, -22.9, Math.PI / 2, 'sitzt'], mila: [-6.2, -20.5, Math.PI, 'sitzt'], noah: [-2, -16, -1.6] },
    fertig: { reden: 'chiara', gespraech: 'mathe' } },
  { id: 'mi_ag', kap: 2, tag: 'Mittwoch', uhr: 13.7, titel: 'Eine AG wählen', ziel: 'An der Pinnwand in der Halle hängen die AGs. Schau sie dir an.', marker: 'pinnwand',
    leute: { ayla: [-3.6, -8.6, -1.6, 'redet'], yusuf: [-2.4, -9.8, 2.6, 'redet'], noah: [3, -5, 3] },
    fertig: { ort: 'pinnwand', r: 1.8, gespraech: 'ag' } },
  { id: 'do_chat', kap: 2, tag: 'Donnerstag', uhr: 12.45, titel: 'Der Klassenchat', ziel: 'Mittagspause. Geh unter das Vordach.', marker: 'preau',
    start: { teleport: 'eingangHof' },
    leute: HOF_DONNERSTAG,
    fertig: { ort: 'preau', r: 3.2, gespraech: 'chat' } },
  { id: 'do_mila', kap: 2, tag: 'Donnerstag', uhr: 12.6, titel: 'Mila', ziel: 'Mila sitzt allein auf der Bank. Geh zu ihr.', marker: 'mila',
    leute: HOF_DONNERSTAG,
    fertig: { reden: 'mila', gespraech: 'milaChat' } },
  { id: 'do_sepas', kap: 2, tag: 'Donnerstag', uhr: 12.8, titel: 'Beim SePAS', ziel: 'Geh mit Mila zum SePAS. Herr Kaya ist da.', marker: 'kaya',
    leute: { kaya: [-12, -6.6, Math.PI], mila: [-13.4, -12.4, 0.3], noah: [10, -16, 1.5] },
    fertig: { reden: 'kaya', gespraech: 'kaya' } },
  { id: 'fr_test', kap: 2, tag: 'Freitag', uhr: 8.0, titel: 'Der Mathe-Test', ziel: 'Setz dich auf deinen Platz in Saal 1.04.', marker: 'meinPlatz',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE_SITZT },
    fertig: { ort: 'meinPlatz', r: 1.1, gespraech: 'test' } },
  { id: 'fr_rat', kap: 2, tag: 'Freitag', uhr: 13.5, titel: 'Klassenrat', ziel: 'Klassenrat! Sprich mit M. Hoffmann.', marker: 'hoffmann',
    leute: { hoffmann: [-26.4, -22.6, Math.PI / 2], ...KLASSE_SITZT },
    fertig: { reden: 'hoffmann', gespraech: 'klassenrat' } },
  { id: 'fr_heim', kap: 2, tag: 'Freitag', uhr: 15.5, titel: 'Wochenende!', ziel: 'Geh zur Bushaltestelle.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { noah: [-21.5, 42.2, 0.3], mila: [-23.5, 42.4, -0.3], ayla: [-25, 41.8, 0.6], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'woche' } },
];

export const GESPRAECHE2 = {
  di_intro: [
    ['erzaehler', 'Dienstag. Erste Stunde: Sport.'],
    ['erzaehler', 'Du öffnest deine Tasche. Die Turnschuhe … liegen zu Hause.'],
  ],
  sommer1: [
    ['sommer', 'Guten Morgen! Ich bin Frau Sommer. Alle umgezogen?'],
    { wahl: [
      { t: 'Ich hab meine Turnschuhe vergessen. Sorry.', staerke: 'ehrlich', herz: { sommer: 2 }, dann: [
        ['sommer', 'Danke, dass du es gleich sagst.'],
        ['sommer', 'In der Fundkiste sind welche. Such dir ein Paar aus.'],
        ['erzaehler', 'Die Schuhe sind etwas groß. Aber es geht.'] ] },
      { t: 'Mir ist schlecht. Ich setz mich hin.', merke: 'bank', dann: [
        ['sommer', 'Okay. Dann setz dich auf die Bank.'],
        ['erzaehler', 'Von der Bank aus schaust du zu. Es ist langweilig.'],
        ['sommer', 'Geht’s wieder? Turnschuhe gibt es übrigens in der Fundkiste.'],
        ['erzaehler', 'Du nimmst ein Paar und machst mit.'] ] },
      { t: '(In Socken mitmachen.)', dann: [
        ['sommer', 'Stopp! In Socken rutschst du aus.'],
        ['sommer', 'Schuhe vergessen? Kein Drama. Nimm welche aus der Fundkiste.'] ] },
    ] },
  ],
  teams: [
    ['sommer', 'Heute: Korbwurf in zwei Teams. Jo und Ben wählen.'],
    ['jo', 'Ich nehm Yusuf. Und Ayla.'],
    ['ben', 'Chiara! Und Noah.'],
    ['jo', 'Dann … {name}.'],
    ['erzaehler', 'Am Ende steht nur noch Lina da.'],
    ['jo', 'Lina zuletzt. War ja klar.'],
    ['erzaehler', 'Ein paar lachen. Lina schaut auf den Boden.'],
    { wahl: [
      { t: '„Lina, komm zu uns. Wir brauchen dich.“', staerke: 'einbeziehen', herz: { lina: 2, jo: -1 }, merke: 'linaTeam', dann: [
        ['lina', '(leise) Okay.'], ['jo', 'Ja … komm halt.'] ] },
      { t: '„Das war nicht nett, Jo.“', staerke: 'mut', herz: { lina: 1, jo: -1 }, dann: [
        ['jo', 'Was denn? War nur Spaß.'], ['sommer', 'Hier wird niemand ausgelacht. Lina, du gehst zu Ben.'] ] },
      { t: '(Nichts sagen.)', dann: [['erzaehler', 'Lina geht langsam zu Bens Team.']] },
    ] },
    { tu: 'korbRunde' },
  ],
  mi_intro: [
    ['erzaehler', 'Mittwoch. In der Pause musst du noch Mathe machen.'],
    ['erzaehler', 'Brüche. Du verstehst die Aufgabe nicht.'],
  ],
  mathe: [
    ['chiara', 'Hey {name}! Sitzt du auch an Mathe?'],
    { wahl: [
      { t: 'Ja. Kannst du mir das erklären?', staerke: 'hilfe', herz: { chiara: 2 }, merke: 'matheGefragt', dann: [['chiara', 'Klar! Stell dir eine Pizza vor.']] },
      { t: 'Kann ich bei dir abschreiben?', dann: [['chiara', 'Hm. Dann kannst du es im Test aber nicht.'], ['chiara', 'Ich erklär’s dir lieber. Stell dir eine Pizza vor.']] },
      { t: 'Nee, ich mach das später.', dann: [['chiara', 'Sicher? Ist echt nicht schwer.'], ['chiara', 'Schau: Stell dir eine Pizza vor.']] },
    ] },
    ['chiara', 'Eine halbe Pizza und noch ein Viertel. Wie viel ist das?'],
    { wahl: [
      { t: '3/4 – drei Viertel', merke: 'matheRichtig', dann: [['chiara', 'Genau! Eine Hälfte sind zwei Viertel. Plus eins: drei.']] },
      { t: '2/6', dann: [['chiara', 'Fast. Erst müssen die Stücke gleich groß sein.'], ['chiara', 'Eine Hälfte sind zwei Viertel. Plus eins: drei Viertel.']] },
      { t: 'Keine Ahnung.', dann: [['chiara', 'Kein Ding. Eine halbe Pizza sind zwei Viertel.'], ['chiara', 'Plus ein Viertel: drei Viertel!']] },
    ] },
    ['du', 'Ah. Jetzt versteh ich’s.'],
    ['chiara', 'Siehst du. Wenn du wieder hängst: einfach fragen.'],
    { tu: 'lernkarte' },
  ],
  ag: [
    ['erzaehler', 'An der Pinnwand hängen Zettel für die AGs. Mittwochs ab 14 Uhr.'],
    { wahl: [
      { t: 'Theater-AG', staerke: 'entscheiden', merke: 'agTheater', herz: { ayla: 1 }, dann: [
        ['ayla', 'Theater? Da bin ich auch!'], ['du', 'Ich bin aber nicht so gut im Reden.'], ['ayla', 'Musst du nicht. Man kann auch Licht und Musik machen.'] ] },
      { t: 'Robotik-AG', staerke: 'entscheiden', merke: 'agRobotik', herz: { yusuf: 1 }, dann: [
        ['yusuf', 'Robotik ist cool. Wir bauen einen Roboter-Arm.'], ['yusuf', 'Komm einfach mit, ich zeig dir alles.'] ] },
      { t: 'Schulgarten-AG', staerke: 'entscheiden', merke: 'agGarten', herz: { mila: 1 }, dann: [
        ['erzaehler', 'Auf der Liste steht schon ein Name: Mila.'], ['erzaehler', 'Du schreibst deinen Namen darunter.'] ] },
      { t: 'Erst mal keine.', dann: [['erzaehler', 'Kein Problem. Die Zettel hängen noch bis Oktober.']] },
    ] },
  ],
  chat: [
    ['erzaehler', 'Donnerstag, Mittagspause. Dein Handy vibriert.'],
    { tu: 'chat' },
    ['erzaehler', 'Ein Foto von Mila beim Essen. Mit Lach-Smileys.'],
    { wahl: [
      { t: 'Schreiben: „Lösch das bitte. Das ist nicht okay.“', staerke: 'mut', herz: { mila: 1, jo: -1, ayla: 1 }, merke: 'chatMut', dann: [
        ['erzaehler', 'Ein paar Sekunden passiert nichts.'], ['erzaehler', 'Dann schreibt Ayla: „Ja, Jo. Lösch das.“'], ['erzaehler', 'Jo schreibt nichts mehr.'] ] },
      { t: 'Einen Lach-Smiley schicken.', herz: { mila: -2, jo: 1 }, merke: 'chatGelacht', dann: [
        ['erzaehler', 'Jo schreibt: „Haha genau 😂“'], ['erzaehler', 'Über den Hof siehst du Mila. Sie schaut auf ihr Handy.'] ] },
      { t: 'Nichts schreiben. Das Handy wegstecken.', dann: [['erzaehler', 'Du steckst das Handy weg. Ein komisches Gefühl bleibt.']] },
    ] },
  ],
  milaChat: [
    ['erzaehler', 'Mila sitzt allein. Ihre Augen sind rot.'],
    { tu: 'milaGelacht' },
    ['mila', 'Warum macht Jo so was?'],
    { wahl: [
      { t: 'Ich weiß es nicht. Wie geht es dir?', staerke: 'zuhoeren', herz: { mila: 2 }, dann: [['mila', 'Schlecht. Alle haben es gesehen.'], ['mila', 'Ich will morgen nicht kommen.']] },
      { t: 'Vergiss es einfach.', dann: [['mila', 'So einfach ist das nicht.'], ['mila', 'Alle haben es gesehen.']] },
    ] },
    { wahl: [
      { t: 'Sollen wir zusammen zum SePAS gehen?', staerke: 'hilfe', herz: { mila: 2 }, dann: [['mila', '…Kommst du mit?'], ['du', 'Klar.']] },
      { t: 'Herr Kaya vom SePAS ist nett. Ich komm mit.', staerke: 'hilfe', herz: { mila: 1 }, dann: [['mila', 'Okay. Aber nur mit dir.']] },
    ] },
  ],
  kaya: [
    ['kaya', 'Hallo ihr zwei. Kommt rein. Ich bin Herr Kaya.'],
    ['mila', '(leise) Es geht um ein Foto im Klassenchat.'],
    ['kaya', 'Gut, dass ihr gekommen seid.'],
    ['kaya', 'Mila, magst du kurz allein mit mir reden?'],
    ['mila', 'Ja. Danke, {name}.'],
    ['kaya', 'Ich kümmere mich darum. Und du – wie geht’s dir damit?'],
    { wahl: [
      { t: 'Ich fand es gemein. Ich wusste nicht, was ich tun soll.', staerke: 'ehrlich', herz: { kaya: 2 }, dann: [['kaya', 'Das kennen viele. Du bist mitgekommen. Das zählt.']] },
      { t: 'Geht schon.', herz: { kaya: 1 }, dann: [['kaya', 'Okay. Meine Tür ist offen, wenn doch was ist.']] },
    ] },
    ['erzaehler', 'Am Nachmittag ist das Foto aus dem Chat verschwunden.'],
  ],
  test: [
    { tu: 'setzen' },
    ['hoffmann', 'Handys weg, bitte. Ihr habt 30 Minuten.'],
    ['erzaehler', 'Dein Herz klopft. Deine Hände sind kalt.'],
    ['erzaehler', 'Ein Trick gegen Aufregung: langsam atmen.'],
    { tu: 'atem' },
    ['erzaehler', 'Du liest die erste Aufgabe. Okay. Die kennst du.'],
    { tu: 'testPizza' },
    ['hoffmann', 'Zeit ist um. Danke euch. Ihr bekommt ihn Montag zurück.'],
  ],
  klassenrat: [
    ['hoffmann', 'Freitag ist Klassenrat. Was lief gut, was nicht?'],
    ['hoffmann', 'Wer etwas sagt, macht eine Ich-Botschaft.'],
    ['hoffmann', 'Also: Ich fühle mich … wenn … Ich wünsche mir …'],
    ['hoffmann', '{name}, magst du anfangen?'],
    { wahl: [
      { t: 'Okay, ich versuch’s.', dann: [] },
      { t: 'Lieber nicht. Darf ich erst zuhören?', dann: [['hoffmann', 'Klar.'], ['erzaehler', 'Ayla sagt etwas über die laute Kantine.'], ['hoffmann', 'Und du, {name}? Jetzt vielleicht?']] },
    ] },
    { tu: 'ichBotschaft' },
  ],
  woche: [
    ['erzaehler', 'Freitag, 15:30 Uhr. Die erste Woche ist geschafft.'],
    ['noah', 'Endlich Wochenende! Was machst du?'],
    { wahl: [
      { t: 'Weiß noch nicht. Und du?', staerke: 'zuhoeren', herz: { noah: 1 }, dann: [
        ['noah', 'Fußball mit meinem Bruder. Kommst du Samstag mit?'],
        { wahl: [
          { t: 'Gern!', herz: { noah: 2 }, dann: [['noah', 'Cool! Ich schreib dir die Uhrzeit.']] },
          { t: 'Diesmal nicht. Vielleicht nächstes Mal.', staerke: 'klar', dann: [['noah', 'Okay, kein Problem.']] },
        ] } ] },
      { t: 'Ausschlafen!', herz: { noah: 1 }, dann: [['noah', 'Gute Idee, haha.']] },
    ] },
    { tu: 'milaWoche' },
    ['erzaehler', 'Der Bus kommt. Bis Montag, Lycée des Collines.'],
    { tu: 'kapitelEnde' },
  ],
};

// Klassenchat (Handy-Bild): Absender, Text
export const CHAT = [
  { wer: 'Jo', text: '😂😂 schaut mal, Mila beim Essen', bild: true },
  { wer: 'Ben', text: '😂' },
  { wer: 'Luca', text: 'lol' },
  { wer: 'Ayla', text: 'hä?' },
];

// Ich-Botschaft im Klassenrat: drei Teile; was ein Vorwurf ist, wird freundlich zurückgegeben
export function ichBotschaftThema() {
  return {
    thema: 'Das Foto im Klassenchat',
    teile: [
      { start: 'Ich fühle mich …', optionen: [{ t: 'unwohl', gut: true }, { t: 'traurig', gut: true }, { t: 'wütend', gut: true }, { t: 'Du bist gemein, Jo.', gut: false, tipp: 'Das ist eine Du-Botschaft. Wie fühlst DU dich?' }] },
      { start: '… wenn …', optionen: [{ t: 'Fotos ohne Fragen geteilt werden.', gut: true }, { t: 'Jo immer alles kaputt macht.', gut: false, tipp: 'Das klingt nach Vorwurf. Was genau ist passiert?' }, { t: 'alle darüber lachen.', gut: true }] },
      { start: 'Ich wünsche mir, …', optionen: [{ t: 'dass wir vorher fragen.', gut: true }, { t: 'dass Jo Ärger bekommt.', gut: false, tipp: 'Was soll in Zukunft anders sein?' }, { t: 'dass wir so etwas löschen.', gut: true }] },
    ],
  };
}

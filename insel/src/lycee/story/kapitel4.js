// Drei Jahre Annexe – 7ème, Kapitel 4 „Gefühle regulieren“ (Kurs Jahr 1, Modul 3: E11 Anspannungsskala und Zonen,
// E12 Körper und Atem, E13 Sinne, E14 Kopf-Skills, E15 Skills-Koffer und Notfallkarte).
// Faden @annexe.cam: Ein Foto aus dem Mathe-Test, gepostet um 8:34 – alle Handys der 7P2 lagen in der Handy-Kiste.
// Neue Spur: Wer war um 8:34 im Flur? Dario (rausgeflogen) – und Luca. Am Ende: ein gefälschter Screenshot macht DICH zum Admin.
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
const AULA = { noah: [-16.2, -54, 1.1], mila: [-11.8, -54.2, -1.1], ben: [-12.6, -52.4, -2.2], jo: [-15.6, -52.2, 2.2], ayla: [-17.2, -56.4, 1.6], lina: [-10.9, -56.6, -1.5], chiara: [-14.4, -51.6, 3.1], yusuf: [-13.0, -57.4, -0.4] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' } };

export const SCHRITTE_N4 = [
  { id: 'k4_bus', kap: 4, tag: 'Montag', uhr: 7.52, titel: 'Montagmorgen', ziel: 'Noah steht noch an der Haltestelle.', marker: 'noah',
    start: { teleport: 'busAnkunft', gespraech: 'n4_bus' },
    leute: { noah: [-20.5, 42.3, -1.9] },
    fertig: { reden: 'noah', gespraech: 'n4_noah' } },
  { id: 'k4_skills', kap: 4, tag: 'Montag', uhr: 9.9, titel: 'Skills: Deckel weg', ziel: 'Aula. Auf dem Boden klebt eine Linie von 0 bis 100.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], mesenberg: [-12.2, -55.8, -2.8], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n4_skills' } },
  { id: 'k4_test', kap: 4, tag: 'Dienstag', uhr: 8.05, titel: 'Der Test', ziel: 'Saal 1.04. Mme Lenning hat eine Kiste dabei.', marker: 'lenning',
    start: { teleport: 'saal104Tuer', gespraech: 'n4_morgen' },
    leute: { lenning: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'lenning', gespraech: 'n4_test' } },
  { id: 'k4_noah', kap: 4, tag: 'Dienstag', uhr: 9.75, titel: 'Rot', ziel: 'Noah ist nach dem Test verschwunden. Hinten am Hof, auf der Bank.', marker: 'noah',
    start: { teleport: 'eingangHof' },
    leute: { noah: [-20, 11.6, Math.PI, 'sitzt'], mila: [-14, 13.6, -2.4], ben: [-13, 12.6, 2.6] },
    fertig: { reden: 'noah', gespraech: 'n4_noahRot' } },
  { id: 'k4_dario', kap: 4, tag: 'Mittwoch', uhr: 12.4, titel: 'Wer war im Flur?', ziel: 'Kenan steht an der Skate-Ecke. Er will dir was sagen.', marker: 'kenan',
    start: { teleport: 'eingangHof' },
    leute: { kenan: [-34, 9, 1], dario: [-33.4, 12, 1.2, 'redet'], luca: [-36.4, 11.6, 1.9, 'redet'], mila: [-20, 11.6, Math.PI, 'sitzt'] },
    fertig: { reden: 'kenan', gespraech: 'n4_dario' } },
  { id: 'k4_ernstfall', kap: 4, tag: 'Freitag', uhr: 8.0, titel: 'Ernstfall', ziel: 'Gang vor Saal 1.04. Mila steht da und bewegt sich nicht.', marker: 'mila',
    start: { teleport: 'saal104Tuer', gespraech: 'n4_durchsage' },
    leute: { mila: [-19.4, -14.6, -2.2] },
    fertig: { reden: 'mila', gespraech: 'n4_ernstfall' } },
  { id: 'k4_ende', kap: 4, tag: 'Freitag', uhr: 10.0, titel: 'Notfallkarte', ziel: 'Letzte Skills-Stunde der Woche. Aula.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14, -55.5, Math.PI], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n4_ende' } },
];

// ---------- Anspannungs-Leiter: ein Montagmorgen, der schlimmer wird (E11) ----------
const MORGEN = {
  wo: 'Haltestelle · Montag', titel: 'Deine Zahl von 0 bis 100', start: 15, zeit: 10,
  ereignisse: [
    { t: '7:31. Der Bus fährt los. Du bist zehn Meter zu spät.', plus: 25, karten: [
      { t: '(Lang ausatmen. Der nächste kommt in 12 Minuten.)', typ: 'koerper', wirkung: -15, antwort: 'Die Schultern gehen ein Stück runter.' },
      { t: '(Dem Bus hinterherschreien.)', typ: 'gegen', wirkung: 8, antwort: 'Eine Frau mit Hund guckt dich an. Der Bus fährt trotzdem.' },
      { t: '(Kopfhörer rein. Lieblingssong.)', typ: 'sinne', wirkung: -12, antwort: 'Bass. Schon besser.' },
    ] },
    { t: 'Handy: 3 % Akku.', plus: 12, karten: [
      { t: '„Ist nur ein Handy.“ (Sparmodus an.)', typ: 'kopf', wirkung: -10 },
      { t: '(Panisch alle Apps zumachen. Nochmal. Nochmal.)', typ: 'gegen', wirkung: 6, antwort: 'Jetzt 2 %.' },
      { t: '(Füße fest auf den Boden drücken. Zehn Sekunden.)', typ: 'koerper', wirkung: -10 },
    ] },
    { t: 'Jo schreibt: „test morgen 💀 lenning sagt der wird brutal. viel glück lol“', plus: 22, karten: [
      { t: 'Zurückschreiben: „halt die klappe jo“', typ: 'gegen', wirkung: 10, antwort: 'Jo: „???? chill 😭 war nur info“' },
      { t: '(Handy weg. 5 Dinge sehen, 4 hören, 3 spüren …)', typ: 'sinne', wirkung: -18, antwort: 'Ein Kran. Eine Taube mit Mütze. Regen auf dem Dach.' },
      { t: '„Das ist morgen. Jetzt ist jetzt.“', typ: 'kopf', wirkung: -14 },
    ] },
    { t: '7:44. Regen. Kein Schirm. Der nächste Bus ist voll.', plus: 24, karten: [
      { t: '(Zügig zur nächsten Haltestelle gehen. Arme schwingen.)', typ: 'koerper', wirkung: -14, antwort: 'Erst klopft das Herz. Dann wird es ruhiger.' },
      { t: '„Nass ist nur nass. Ich komm an.“', typ: 'kopf', wirkung: -12 },
      { t: '(Noah schreiben. Vielleicht wartet er auch.)', typ: 'menschen', wirkung: -16, antwort: 'Noah: „Dreh dich um. Ich steh hinter dir. Auch zu spät.“' },
    ] },
  ],
};

// ---------- Ernstfall (Freitag): Raumwechsel ohne Ansage – genau Milas 85 aus der Zonen-Wette ----------
// Die Karten kommen aus DEINER Notfallkarte (Koffer, Dienstag). Bei Rot kommt der Kopf kaum an; Körper und Sinne wirken.
const KARTE = {
  atem: ['(Mit Mila atmen: 4 ein, 6 aus.)', 'koerper'], faust: ['(„Mach Fäuste. Ganz fest. Und los.“)', 'koerper'], fuesse: ['(„Drück die Füße in den Boden. Spürst du ihn?“)', 'koerper'],
  kalt: ['(Ihr deine kalte Wasserflasche geben.)', 'koerper'], sinne54321: ['(„Nenn mir 5 Dinge, die du siehst.“)', 'sinne'], duft: ['(„Riech mal an deinem Ärmel. Waschmittel.“)', 'sinne'],
  musik: ['(Ihr einen Kopfhörer geben. Leise Musik.)', 'sinne'], schiff: ['(„Lass den Gedanken wegfahren wie ein Schiff.“)', 'kopf'], satz: ['(„Eins nach dem anderen.“)', 'kopf'],
  ort: ['(„Denk an deinen sicheren Ort.“)', 'kopf'], freund: ['(„Ich bin da. Ich bleib hier.“)', 'menschen'], kuedes: ['(„Soll ich Herrn Kuedes holen?“)', 'menschen'],
  blick: ['(Ruhig neben ihr stehen. Kurz in die Augen schauen.)', 'menschen'], korb: ['(„Nachher werfen wir Körbe. Versprochen.“)', 'kopf'], zeichnen: ['(„Zeichne mit dem Finger einen Kreis in die Hand.“)', 'sinne'],
};
const ERNSTFALL = (m, S = {}) => {
  const eigene = (((S.sz || {}).koffer || {}).notfall || []).filter((id) => KARTE[id]);
  const liste = eigene.length ? eigene : ['satz', 'freund', 'atem'];
  // Wirkung je nach Lage: oben im Rot fast nur Körper/Sinne/Menschen, später geht auch der Kopf
  const karten = (rot) => liste.slice(0, 3).map((id) => { const [t, typ] = KARTE[id];
    const w = typ === 'kopf' ? (rot ? -3 : -12) : typ === 'menschen' ? -14 : -16;
    return { t, typ, wirkung: w, antwort: typ === 'kopf' && rot ? 'Mila schüttelt den Kopf. Bei Rot kommen Worte kaum an.' : undefined }; });
  const mehr = eigene.length ? [] : [{ t: '(Einfach neben ihr stehen bleiben.)', typ: 'menschen', wirkung: -8 }];
  return {
    wo: 'Gang · Freitag, 8:00', titel: 'Milas Zahl von 0 bis 100', start: 55, zeit: 12,
    ereignisse: [
      { t: 'Durchsage: „7P2 – heute Saal 2.11. Sofort.“ Mila bleibt stehen.', plus: 30, karten: karten(true).concat(mehr) },
      { t: 'Alle laufen an euch vorbei. Jemand rempelt Mila an. „Sorry!“', plus: 12, karten: karten(true).concat(mehr) },
      { t: 'Mila, leise: „Wo ist 2.11? Ich weiß gar nichts mehr.“', plus: 8, karten: karten(false).concat([{ t: '(„Ich weiß es. Wir gehen zusammen. Schritt für Schritt.“)', typ: 'menschen', wirkung: -18, antwort: 'Mila nickt. Ganz klein.' }]) },
    ],
  };
};

// ---------- Zonen-Wette (E11): gleicher Satz, ganz andere Zahlen ----------
const ZONEN = {
  wo: 'Aula · Die Linie von 0 bis 100', leute: { noah: F.noah, mila: F.mila, ben: F.ben, jo: F.jo, ayla: F.ayla, lina: F.lina },
  karten: [
    { t: 'Morgen ist Mathe-Test.', zahlen: { noah: 85, mila: 60, ben: 20, jo: 45, ayla: 35, lina: 70 }, sagt: ['ben', 'Zwanzig. Ich hab keine Angst. Oder keine Ahnung. Eins von beiden.'] },
    { t: 'Jemand lacht, als du reinkommst.', zahlen: { noah: 65, mila: 40, ben: 25, jo: 90, ayla: 55, lina: 75 }, sagt: ['jo', 'Neunzig. Sofort. Ich weiß selbst nicht, warum.'] },
    { t: 'Der Raum wird ohne Ansage gewechselt.', zahlen: { noah: 30, mila: 85, ben: 10, jo: 15, ayla: 20, lina: 35 }, sagt: ['mila', 'Fünfundachtzig. Pläne sind Sicherheit. Ohne Plan ist alles Rauschen.'] },
    { t: 'Du sollst vor der Klasse vorsingen.', zahlen: { noah: 95, mila: 80, ben: 50, jo: 60, ayla: 15, lina: 90 }, sagt: ['ayla', 'Fünfzehn. Ich liebe das. Sorry.'] },
    { t: 'Dein Handy ist weg.', zahlen: { noah: 40, mila: 50, ben: 70, jo: 80, ayla: 75, lina: 25 }, sagt: ['lina', 'Fünfundzwanzig. Ich hab es eh nie dabei.'] },
  ],
};

// ---------- Skills-Koffer (E15) – kommt am Dienstag in den Test mit ----------
const KOFFER = {
  wo: 'Aula · Koffer-Markt',
  faecher: [{ id: 'koerper', t: 'Körper', sy: '🏃' }, { id: 'sinne', t: 'Sinne', sy: '👃' }, { id: 'kopf', t: 'Kopf', sy: '🧠' }, { id: 'menschen', t: 'Menschen', sy: '🤝' }, { id: 'aktiv', t: 'Machen', sy: '🛹' }],
  karten: [
    { id: 'atem', t: 'Atmen: 4 ein, 6 aus', fach: 'koerper' }, { id: 'faust', t: 'Fäuste anspannen, loslassen', fach: 'koerper' }, { id: 'fuesse', t: 'Füße fest auf den Boden', fach: 'koerper' },
    { id: 'sinne54321', t: 'Fünf sehen, vier hören, drei spüren', fach: 'sinne' }, { id: 'kalt', t: 'Kalte Flasche an die Hand', fach: 'sinne' }, { id: 'duft', t: 'Duft aus der Hosentasche', fach: 'sinne' },
    { id: 'schiff', t: 'Gedanken-Schiffchen', fach: 'kopf' }, { id: 'satz', t: 'Mutsatz: Eins nach dem anderen', fach: 'kopf' }, { id: 'ort', t: 'Sicherer Ort im Kopf', fach: 'kopf' },
    { id: 'freund', t: 'Mit einer Person reden', fach: 'menschen' }, { id: 'kuedes', t: 'Zu Herrn Kuedes gehen', fach: 'menschen' }, { id: 'blick', t: 'Kurz zu jemandem gucken, den ich mag', fach: 'menschen' },
    { id: 'musik', t: 'Musik', fach: 'sinne' }, { id: 'korb', t: 'Körbe werfen', fach: 'koerper' }, { id: 'zeichnen', t: 'Zeichnen', fach: 'aktiv' },
  ],
};
// Welche Skills gehen im Test (im Saal, ohne aufzustehen)?
const IM_TEST = {
  atem: { t: 'Atmen 4–6', sy: '🌬️', wirkung: 28, wie: 'Vier ein … sechs aus … vier ein …' }, faust: { t: 'Fäuste an, los', sy: '✊', wirkung: 24, wie: 'Fäuste fest … und los' },
  fuesse: { t: 'Füße auf den Boden', sy: '🦶', wirkung: 20, wie: 'Die Füße drücken. Der Boden hält.' }, sinne54321: { t: 'Sehen, hören, spüren', sy: '👀', wirkung: 22, wie: 'Tafel, Uhr, Fenster, Noahs Mäppchen, Regen …' },
  kalt: { t: 'Kalte Flasche', sy: '🧊', wirkung: 24, wie: 'Die Flasche ist kalt an der Hand' }, duft: { t: 'Duft', sy: '🍋', wirkung: 16, wie: 'Zitrone. Kurz riechen.' },
  schiff: { t: 'Gedanken-Schiffchen', sy: '⛵', wirkung: 16, wie: 'Der Gedanke steigt aufs Schiff. Es fährt weg.' }, satz: { t: 'Eins nach dem anderen', sy: '💬', wirkung: 18, wie: 'Nur die nächste Aufgabe. Nur die.' },
  ort: { t: 'Sicherer Ort', sy: '🏝️', wirkung: 14, wie: 'Kurz die Augen zu. Dein Ort.' }, blick: { t: 'Kurzer Blick zu Noah', sy: '🙂', wirkung: 12, wie: 'Noah macht Daumen hoch. Unterm Tisch.' },
};
const TEST = (m, S) => {
  const k = ((S.sz || {}).koffer || {}).koffer || [];
  let skills = k.filter((id) => IM_TEST[id]).slice(0, 4).map((id) => ({ id, ...IM_TEST[id] }));
  if (!skills.length) skills = [{ id: 'atem', ...IM_TEST.atem }];
  return {
    wo: 'Saal 1.04 · Mathe-Test', zeit: 80, start: m.thermoRot ? 45 : 35, skills,
    aufgaben: [
      { f: '7 · 8', a: ['54', '56', '64'], r: 1 }, { f: '45 + 38', a: ['83', '73', '93'], r: 0 }, { f: '100 − 37', a: ['73', '63', '67'], r: 1 },
      { f: '6 · 9', a: ['54', '56', '45'], r: 0 }, { f: 'Die Hälfte von 48', a: ['24', '22', '26'], r: 0 }, { f: '144 : 12', a: ['14', '12', '11'], r: 1 },
      { f: '9 · 7', a: ['63', '56', '72'], r: 0 }, { f: '250 − 85', a: ['175', '165', '155'], r: 1 },
    ],
    gedanken: ['Ich kann das eh nicht.', 'Alle sind schneller.', 'Was, wenn ich null Punkte hab?', 'Mme Lenning guckt mich an.', 'Ich hätte lernen sollen.', 'Mein Kopf ist leer.', 'Noah schwitzt schon.'],
  };
};

// ---------- @annexe.cam: ein Foto aus dem Test ----------
const TEST_POST = {
  titel: '7P2 😎 (offiziell)', mitglieder: 19, dauer: 32,
  nachrichten: [
    { nach: 0.4, system: true, text: '8:34 · @annexe.cam hat ein Foto gepostet. (Du siehst es erst jetzt.)' },
    { nach: 1.4, wer: '@annexe.cam', bild: 'Saal 1.04 durchs Türfenster, Noah über dem Blatt', text: '7P2 im mathetest 💀 noah schwitzt für die ganze klasse', lacher: { start: 5, proSek: 0.4, stopp: 'gestoppt' } },
    { nach: 3.2, wer: 'Jo', text: 'WARTE. unsere handys waren in der kiste. ALLE.' },
    { nach: 5.0, wer: 'Jo', text: 'ich wars nicht. JETZT glaubt ihr mir?? 😤' },
    { nach: 7.2, wer: 'Ben', text: 'jo hat recht. zum ersten mal. markiert den tag' },
    { nach: 9.5, wer: 'Mila', text: 'Neue Daten. Der Account postet DOCH im Unterricht. Meine Theorie war falsch.' },
    { nach: 12, wer: 'Mila', text: 'Das Foto ist durchs Türfenster. Von unten. Jemand war um 8:34 im Flur.' },
    { nach: 14.5, system: true, text: 'Noah ist offline.' },
    { nach: 17, wer: 'Luca', text: 'lowkey sieht er echt gestresst aus' },
    { nach: 19.5, wer: 'Ayla', text: 'luca. ernsthaft. nicht heute', wennNicht: 'gestoppt' },
    { nach: 22, wer: 'Chiara', text: 'Noah ist nach dem Test sofort raus. Hof, glaub ich.' },
  ],
  aktionen: [
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„Schwitzen im Test ist normal. Fotos durchs Fenster nicht.“', setzt: ['gestoppt', 'klartext'], ich: 'schwitzen im test ist normal. fotos durchs fenster nicht', folgen: [{ nach: 1.3, wer: 'Ayla', text: 'danke. genau das' }, { nach: 2.6, wer: 'Ben', text: 'ich schwitze IMMER. postet mich doch' }] },
      { t: '„Jo, sorry, dass wir dich verdächtigt haben.“', setzt: ['joSorry'], ich: 'jo sorry dass wir dich verdächtigt haben', folgen: [{ nach: 1.4, wer: 'Jo', text: '… ok. danke. ehrlich jetzt' }] },
      { t: '„haha noah 💀“', setzt: 'mitgemacht', ich: 'haha noah 💀', folgen: [{ nach: 1, wer: 'Luca', text: 'endlich sagt es wer' }] },
    ] },
    { id: 'privat', t: 'Noah privat schreiben', symbol: '🔒', setzt: 'noahPrivat4', ich: '(privat an Noah) wo bist du? ich komm. kein stress', folgen: [{ nach: 3, wer: 'Noah (privat)', text: 'Bank. Hinten. Ich krieg keine Luft.' }] },
    { id: 'screenshot', t: 'Screenshot (8:34)', symbol: '📸', setzt: 'beweis834', sys: 'Screenshot gespeichert. Gepostet: 8:34. Mitten im Test.' },
    { id: 'melden', t: 'Beitrag melden', symbol: '🚩', setzt: 'gemeldet4', sys: 'Gemeldet. Diesmal haben es elf Leute gemeldet.' },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm.', ende: true },
  ],
};

// ---------- Hitze-Duell mit Dario (E11: in Gelb bleiben, wenn der andere Rot ist) ----------
const DARIO_DUELL = {
  wo: 'Skate-Ecke', gegner: { name: 'Dario', farbe: '#d9693f' }, publikum: 'Kenan, Luca', hitze: 50, zeit: 7,
  runden: [
    { sagt: 'Was guckst du so? Denkst du, ICH war das, bro?', warn: 'Dein Kiefer wird fest', skill: '(Ausatmen. Füße auf den Boden.)', skillAntwort: '(wartet) … Was jetzt?',
      karten: [
        { t: '„Ich denk gar nix. Ich frag nur.“', stimme: 'kopf', art: 'klar', hitze: -10, respekt: 1, antwort: 'Fragen. Klar. Alle fragen nur.' },
        { t: '„Wer sonst? Du warst im Flur!“', stimme: 'stolz', art: 'angriff', hitze: 28, antwort: 'BEWEIS es. Los. Beweis es!' },
        { t: '„Ich geh kurz. Du auch.“', stimme: 'kopf', art: 'rueckzug', hitze: -8, respekt: 0, antwort: '(tritt gegen die Wand) … Geh halt.' },
      ], still: { hitze: 6, antwort: 'Sagst nix. Heißt ja.' } },
    { sagt: 'Ich flieg EINMAL raus, und schon bin ich der Böse.', warn: 'Dein Herz klopft schneller', skill: '(Zehn Sekunden. Nichts sagen.)', skillAntwort: '(schnaubt) … Okay.',
      karten: [
        { t: '„Kenn ich. Einmal Mist, und alle gucken.“', stimme: 'kopf', art: 'klar', hitze: -16, respekt: 2, antwort: '(überrascht) … Ja. Genau so.' },
        { t: '„Dann hör halt auf mit den Fotos.“', stimme: 'stolz', art: 'angriff', hitze: 30, antwort: '(steht auf) Sag das nochmal.' },
        { t: '„Warum bist du rausgeflogen?“', art: 'klar', hitze: -6, respekt: 1, antwort: 'Ich hab Mme Rantini „Mama“ genannt. Aus Versehen. Alle haben gelacht. Ich auch. Zu laut.' },
      ], still: { hitze: 4, antwort: 'Egal, bro.' } },
    { sagt: '…', wenn: (z) => z.hitze > 25, warn: 'Deine Hände ballen sich', skill: '(Hände auf. Schultern runter.)', skillAntwort: '(lässt die Schultern auch fallen) … Ich war im Flur. Da waren noch andere.',
      karten: [
        { t: '„Okay. Ich glaub dir erstmal.“', stimme: 'kopf', art: 'klar', hitze: -18, respekt: 2, antwort: '… Erstmal. Okay. Fair.' },
        { t: '„Stopp. Ich geh jetzt. Wir reden später.“', stimme: 'kopf', art: 'klar', hitze: -8, respekt: 1, antwort: 'Später. Okay.' },
      ], still: { hitze: -6, antwort: '(guckt weg)' } },
  ],
};
const darioAusgang = (r) => (r.knall ? 'knall' : r.hitze <= 25 ? 'ruhig' : r.hitze <= 55 ? 'gelb' : 'rot');

export const GESPRAECHE_N4 = {
  n4_bus: [
    ['erzaehler', 'Montag. Du rennst. Der Bus fährt los. Ohne dich.'],
    { szene: 'thermo', id: 'morgen', def: MORGEN,
      ausgang: (r) => (r.rot ? (r.wert < 60 ? 'runter' : 'rot') : 'gelb'),
      folgen: {
        runter: { staerke: 'ruhig', merke: ['thermoRot', 'thermoRunter'], dann: [['erzaehler', 'Du warst bei Rot. Und bist wieder runtergekommen. Das merkt sich dein Körper.']] },
        rot: { merke: 'thermoRot', dann: [['erzaehler', 'Dein Herz klopft noch. Alles ist zu laut. Und es ist erst 8 Uhr.']] },
        gelb: { staerke: 'ruhig', merke: 'thermoGelb' },
      } },
  ],
  n4_noah: [
    ['noah', 'Du auch? Zu spät? … Gut. Also nicht gut.'],
    ['noah', 'Aber gut, dass ich nicht allein bin.'],
    ['noah', 'Morgen ist der Test. Beim letzten Test war plötzlich alles weg.'],
    ['noah', 'Weiß. Wie ein Bildschirm ohne Strom.'],
    { wahl: [
      { t: '„Weiß wie ein Bildschirm? Hast du neu gestartet?“', staerke: 'humor', herz: { noah: 1 }, merke: 'blackoutErklaert', dann: [['noah', 'Ich hab’s versucht. Ich hab auf mein Ohr gedrückt.'], ['noah', '(grinst) Hat nicht geholfen. Aber jetzt lach ich.']] },
      { t: '„Mir passiert das auch.“', staerke: 'zuhoeren', herz: { noah: 2 }, merke: 'auchBlackout', dann: [['noah', 'Echt? Du wirkst immer so … normal.'], ['noah', 'Okay. Dann sind wir das Team Weißer Bildschirm.']] },
      { t: '„Lern einfach mehr. Dann passiert das nicht.“', herz: { noah: -1 }, dann: [['noah', 'Ich hab gelernt. Drei Tage. Es war trotzdem weg.'], ['erzaehler', 'Noah zieht die Kapuze hoch.']] },
    ] },
    ['noah', 'Herr Kuedes macht heute was mit Zahlen. 0 bis 100.'],
    ['noah', 'Ich bin gerade bei 70. Mindestens.'],
  ],
  n4_skills: [
    ['kaya', '(hält eine Faust hoch) Daumen rein. Daumen ist der Alarm. Finger bremsen.'],
    ['kaya', '(klappt die Finger hoch) Ab etwa 90: Deckel weg.'],
    ['ben', 'Mein Deckel ist bei Nuggets immer weg.'],
    ['mesenberg', 'Das ist eher Begeisterung, Ben. Andere Zone.'],
    { wahl: [
      { t: '„Was hilft bei Rot, wenn der Kopf nicht zuhört?“', staerke: 'lesen', herz: { kaya: 1 }, dann: [['kaya', 'Gute Frage. Der Körper. Atmen, Bewegen, Kälte. Erst runter, dann reden.']] },
      { t: '„Ich war heute Morgen bei Rot. Wegen dem Bus.“', wenn: (m) => m.thermoRot, staerke: 'zuhoeren', herz: { kaya: 1, noah: 1 }, dann: [['kaya', 'Rot am Montagmorgen. Klassiker. Was hat geholfen?'], ['du', 'Weiß nicht genau. Irgendwas hat geholfen.'], ['kaya', 'Gut gemerkt. Was war es? Das kommt in den Koffer.']] },
      { t: '(Faust machen. Daumen fühlen. Nichts sagen.)', dann: [['erzaehler', 'Deine Finger klappen hoch. Wieder runter. Komisch, wie gut das passt.']] },
    ] },
    ['kaya', 'Jetzt die Linie. Ich lese Sätze. Ihr stellt euch hin.'],
    ['kaya', 'Und ihr wettet, wo die anderen stehen.'],
    { szene: 'zonen', id: 'zonen', def: ZONEN,
      ausgang: (r) => (r.treffer >= 3 ? 'leser' : 'ueberrascht'),
      folgen: {
        leser: { staerke: 'lesen', herz: { mila: 1, jo: 1 }, merke: 'zonenLeser', dann: [['mesenberg', 'Du liest die Klasse gut. Und trotzdem waren Überraschungen dabei.']] },
        ueberrascht: { herz: { ayla: 1 }, dann: [['kaya', 'Überrascht? Gut. Deine 20 kann für andere 90 sein.']] },
      } },
    ['jo', 'Digga, ich dachte, Mila ist nie gestresst.'],
    ['jo', 'Die ist bei 85 wegen einem RAUM.'],
    ['mila', 'Und du bei 90 wegen einem Lachen. Gleichstand.'],
    ['kaya', 'Letzte Übung. Koffer-Markt. Jeder packt ein, was bei ihm wirkt.'],
    ['kaya', 'Morgen ist Test. Nehmt den Koffer mit.'],
    { szene: 'koffer', id: 'koffer', def: KOFFER, ausgang: (r) => (r.notfall.some((id) => ['schiff', 'satz', 'ort'].includes(id)) && r.notfall.every((id) => ['schiff', 'satz', 'ort'].includes(id)) ? 'nurKopf' : 'gemischt'),
      folgen: {
        gemischt: { staerke: 'ruhig', merke: 'kofferGepackt' },
        nurKopf: { merke: ['kofferGepackt', 'kofferNurKopf'], dann: [['mesenberg', 'Nur Kopf auf der Notfallkarte? Probier es aus.'], ['mesenberg', 'Bei Rot merkt man, was wirklich geht.']] },
      } },
    ['ben', 'Mein Koffer: Atmen, Körbe werfen, Mila fragen. Mila ist ein Skill.'],
    ['mila', 'Ich bin kein Skill. … Okay. Ein bisschen.'],
    { tu: 'n4_milaDanke' },
  ],
  n4_morgen: [
    // Jugendwelt heute: Lesebestätigung ohne Antwort – und was der Kopf daraus macht.
    ['erzaehler', 'Gestern Abend hast du Ben geschrieben: „bist du morgen nervös?“'],
    ['erzaehler', '„Gesehen 21:04“. Keine Antwort. Bis jetzt.'],
    { wahl: [
      { t: '(Denken: Er findet die Frage bestimmt dumm.)', merke: 'gesehenGruebeln', dann: [['erzaehler', 'Du hast schlecht geschlafen. Wegen zwei Wörtern.']] },
      { t: '(Denken: Vielleicht war sein Akku leer. Ich frag ihn einfach.)', staerke: 'lesen', merke: 'gesehenPruefen', dann: [['erzaehler', 'Du steckst das Handy weg. Du fragst ihn gleich.']] },
    ] },
    ['ben', '(kommt rein) Sorry! Bei uns ist ab neun Handy-Hotel.'], ['ben', 'Hab’s nur kurz gesehen.'],
    ['ben', 'Und ja. Sehr nervös. Ich hab von Brüchen geträumt.'],
    ['erzaehler', '„Gesehen“ heißt nur: gesehen. Nicht: Ich mag dich nicht.'],
    ['erzaehler', 'Dienstag. 8:03. Auf dem Pult steht eine Kiste. Darauf: HANDYS.'],
    ['jo', 'Gefängnis für Handys. Wallah, das ist Menschenrechtsverletzung.'],
  ],
  n4_test: [
    ['lenning', 'Guten Morgen. Handys in die Kiste. Alle. Ausgeschaltet, bitte.'],
    { wahl: [
      { t: '(Handy ausschalten. Rein in die Kiste.)', merke: 'handyKiste', dann: [['lenning', 'Danke.']] },
      { t: '„Ich hab meins heute nicht dabei.“ (Es ist in der Jacke.)', merke: ['handyKiste', 'handyGelogen'], dann: [['lenning', '(guckt kurz) Okay. Dann ist ja alles gut.'], ['erzaehler', 'Die Jacke hängt hinten. Dein Handy ist aus. Du fühlst es trotzdem.']] },
    ] },
    ['jo', '(laut) Meins ist DRIN. Alle haben es gesehen. DRIN.'],
    ['noah', '(flüstert) Ich bin bei 80. Ich schwör.'],
    { tu: 'n4_testStart' },
    { szene: 'test', id: 'test', def: (m, S) => TEST(m, S),
      ausgang: (r) => (r.skills.length >= 2 ? 'skills' : r.max >= 90 ? 'blackout' : r.skills.length ? 'einer' : 'ohne'),
      folgen: {
        skills: { staerke: 'ruhig', merke: 'testSkills', dann: [['erzaehler', 'Abgegeben. Dein Kopf war da. Zwischendurch nicht. Dann wieder.']] },
        blackout: { merke: 'testBlackout', dann: [['erzaehler', 'Abgegeben. Ein paar Aufgaben sind leer. Du weißt jetzt, wie Noahs weißer Bildschirm aussieht.']] },
        einer: { staerke: 'ruhig', merke: 'testSkills', dann: [['erzaehler', 'Abgegeben. Ein Skill hat gereicht, um wieder reinzukommen.']] },
        ohne: { merke: 'testOhne', dann: [['erzaehler', 'Abgegeben. Ohne Skill. Nächstes Mal vielleicht mit.']] },
      } },
    ['lenning', 'Danke. Die Handys bekommt ihr jetzt zurück. Ruhig, bitte.'],
    ['erzaehler', 'Zwanzig Handys gehen gleichzeitig an. Zwanzig Mal vibriert es.'],
    { szene: 'chat', id: 'testPost', def: TEST_POST,
      ausgang: (r) => (r.flags.noahPrivat4 ? 'privat' : r.flags.klartext ? 'klartext' : r.flags.mitgemacht ? 'mitgemacht' : r.flags.joSorry ? 'jo' : r.flags.beweis834 ? 'beweis' : 'still'),
      folgen: {
        privat: { staerke: 'zuhoeren', herz: { noah: 2 }, merke: 'noahPrivat4' },
        klartext: { staerke: 'mut', herz: { noah: 1, ayla: 1, luca: -1 }, merke: ['testKlartext', 'campFeind'] },
        mitgemacht: { herz: { noah: -3, luca: 1 }, merke: 'testGelacht' },
        jo: { staerke: 'einbeziehen', herz: { jo: 3 }, merke: 'joEntschuldigt' },
        beweis: { staerke: 'lesen', merke: 'beweis834' },
        still: {},
      } },
    { tu: 'n4_handyBilanz' },
  ],
  n4_noahRot: [
    ['erzaehler', 'Die Bank. Noah sitzt da, nach vorne gebeugt.'],
    ['erzaehler', 'Seine Hände zittern. Er atmet schnell. Zu schnell.'],
    ['noah', 'Alle – haben das – gesehen. Ich krieg – keine Luft.'],
    { wahl: [
      { t: '„Ich hol dir Wasser. Bin gleich da.“', merke: 'noahGeredet', dann: [['noah', 'Nicht – weggehen. Bitte. Bleib.'], ['erzaehler', 'Du bleibst. Das Wasser kann warten.']] },
      { t: '(Hinsetzen.) „Atme mit mir. Ich zähl.“', staerke: 'ruhig', herz: { noah: 1 }, merke: 'noahAtem' },
      { t: '„Soll ich Herrn Kuedes holen?“', staerke: 'hilfe', herz: { noah: 1, kaya: 1 }, merke: 'kuedesGeholt', dann: [['noah', '(nickt. Schüttelt den Kopf. Nickt.)'], ['erzaehler', 'Ben rennt los. Du bleibst. Bis er kommt, atmet ihr zusammen.']] },
    ] },
    { szene: 'atem', id: 'atem', def: { wo: 'Hof · hinten auf der Bank', wer: F.noah, start: 92, ziel: 40,
      saetze: { 92: '(atmet in kurzen Stößen)', 75: 'Okay – okay. Langsamer.', 60: 'Ich – hör den Regen wieder.', 45: 'Puh. Ich war bei 95. Mindestens.' } },
      ausgang: (r) => (r.gut >= 3 ? 'zusammen' : 'langsam'),
      folgen: {
        zusammen: { staerke: 'ruhig', herz: { noah: 3 }, merke: 'noahRunter', dann: [['noah', 'Du hast einfach mitgeatmet. Wie so ein Atem-Navi.']] },
        langsam: { herz: { noah: 1 }, merke: 'noahRunter', dann: [['noah', 'Es wird. Langsam. Danke, dass du geblieben bist.']] },
      } },
    { tu: 'n4_kuedesKommt' },
    ['mila', '(kommt dazu, außer Atem) Ich hab’s gesehen. Alles okay bei euch?'],
    ['mila', 'Um 8:34 war fast jeder im Unterricht.'],
    ['mila', 'Wer im Flur war, steht auf einer kurzen Liste.'],
  ],
  n4_dario: [
    ['kenan', 'Yo. Erst gucken, dann reden, Brudi.'],
    ['kenan', 'Du hast das nicht von mir.'],
    ['kenan', 'Dario ist gestern bei Rantini rausgeflogen. 8:30. Zwanzig Minuten im Flur.'],
    ['kenan', 'Und Luca war „auf Toilette“. Auch zwanzig Minuten. Lustige Toilette.'],
    { wahl: [
      { t: '„Warum sagst du mir das?“', staerke: 'lesen', herz: { kenan: 1 }, dann: [['kenan', 'Weil Noah okay ist. Und das nicht.']] },
      { t: '„Hast du Beweise?“', staerke: 'klar', dann: [['kenan', 'Nee. Nur Augen. Ich sitz neben der Tür.']] },
    ] },
    ['erzaehler', 'Dario hat gehört, wie sein Name fällt. Er kommt rüber. Schnell.'],
    { szene: 'hitze', id: 'darioDuell', def: DARIO_DUELL, ausgang: darioAusgang,
      folgen: {
        knall: { herz: { dario: -3, kenan: -1 }, merke: 'darioKnall', dann: [['mesenberg', '(von der Tür) Hey. Ihr zwei. Abstand. Jetzt.'], ['mesenberg', 'Und dann reden wir. Zu dritt.'], ['erzaehler', 'Dario geht. Er dreht sich nicht um.']] },
        ruhig: { staerke: 'ruhig', herz: { dario: 2 }, merke: ['darioRuhig', 'spurLuca'], dann: [['dario', 'Luca war auch draußen. Mit Handy.'], ['dario', 'Ich sag nur, was ich gesehen hab.'], ['dario', '(leiser) Und ich hab nicht gelacht. Über das Foto.']] },
        gelb: { staerke: 'ruhig', herz: { dario: 1 }, merke: 'darioGelb', dann: [['dario', 'Okay. Okay. Ich bin nur … sauer. Auf alles.']] },
        rot: { herz: { dario: -1 }, merke: 'darioRot', dann: [['erzaehler', 'Dario tritt gegen sein Board. Es rollt bis zur Mauer.']] },
      } },
    { tu: 'n4_darioBilanz' },
  ],
  n4_durchsage: [
    ['erzaehler', 'Freitag. 7:58. Im Gang rauscht der Lautsprecher.'],
  ],
  n4_ernstfall: [
    { szene: 'thermo', id: 'ernstfall', def: (m, S) => ERNSTFALL(m, S),
      ausgang: (r) => (r.wert < 50 ? 'runter' : 'schwer'),
      folgen: {
        runter: { staerke: 'ruhig', herz: { mila: 3 }, merke: 'ernstfallGut', dann: [['mila', '… Okay. 2.11. Zweiter Stock. Ich weiß es wieder.'], ['mila', 'Du hast deine Karte benutzt. Für mich.'], { tu: 'n4_nurKopf' }] },
        schwer: { herz: { mila: 1 }, merke: 'ernstfallSchwer', dann: [['erzaehler', 'Mila zittert noch. Du holst Mme Rantini aus dem Lehrerzimmer.'], ['rantini', 'Danke. Gut, dass du geblieben bist.'], ['rantini', 'Ich bleib jetzt bei ihr.'], { tu: 'n4_nurKopf' }] },
      } },
  ],
  n4_ende: [
    ['kaya', 'Letzte Stunde der Woche. Wer will, zeigt seine Notfallkarte.'],
    ['kaya', 'Wer nicht will, nicht.'],
    ['ben', 'Meine: 1. Atmen. 2. Körbe werfen. 3. Nuggets.'],
    ['mesenberg', 'Nuggets bei Rot?'],
    ['ben', 'Nuggets bei ALLEM.'],
    { tu: 'n4_karte' },
    ['kaya', 'Ganz unten steht bei allen das Gleiche.'],
    ['kaya', 'Wenn gar nichts mehr geht: Hilfe holen. Uns hier.'],
    ['kaya', 'Oder anrufen: 116 111. Anonym und gratis.'],
    { tu: 'n4_schluss' },
  ],
};

export const tunN4 = (c) => ({
  // Folge aus Kap. 3 (Saal nach der Pause): Was hast du für Mila getan, als die Kapuze auf war?
  n4_milaDanke: () => {
    const m = c.S.merke;
    if (m.wuerfelZurueck) return [['mila', '(im Rausgehen, leise) Der Würfel. Danke. Ich hab ihn seitdem immer dabei.']];
    if (m.milaZettel) return [['mila', '(im Rausgehen) Dein Zettel. Hab ich noch. Keine Antwort nötig, oder?'], ['mila', '(grinst kurz) Trotzdem: danke.']];
    if (m.milaRuhe) return [['mila', '(im Rausgehen) Mittwoch hat mich keiner angestarrt.'], ['mila', 'Du auch nicht. Das war gut.']];
    if (m.milaLaut) return [['mila', '(im Rausgehen) Mittwoch, das „alles okay“ vor allen …'], ['mila', 'War lieb gemeint. Nächstes Mal lieber leise, ja?']];
    return [];
  },
  n4_nurKopf: () => (c.S.merke.kofferNurKopf ? [['erzaehler', 'Auf deiner Karte stand nur Kopf. Heute hast du gesehen: Bei Rot hilft zuerst der Körper.'], ['erzaehler', 'Du kannst die Karte umpacken. Jederzeit.']] : []),
  n4_testStart: () => (c.S.merke.kofferGepackt ? [['erzaehler', 'Du denkst an deinen Koffer. Er ist in deinen Händen.']] : []),
  n4_handyBilanz: () => (c.S.merke.handyGelogen ? [['erzaehler', 'Dein Handy war in der Jacke. Gelogen. Für nichts.']] : []),
  n4_kuedesKommt: () => (c.S.merke.kuedesGeholt ? [['kaya', '(kommt mit Ben) Ich bin da. Ben war schneller als beim Sportfest.'], ['kaya', 'Noah, magst du kurz mit in mein Büro? Nur Tee.'], ['noah', '… Okay. Mit Tee.']] : [['mesenberg', '(kommt über den Hof) Noah? Ich bleib bei euch.'], ['mesenberg', 'Gut gemacht, ihr zwei. Jetzt übernehm ich.']]),
  n4_darioBilanz: () => {
    const n = ((c.S.sz || {}).darioDuell || {}).bemerkt || 0;
    return n >= 2 ? [['erzaehler', 'Kiefer. Herz. Hände. Du hast es gemerkt, bevor es kracht. Dario nicht. Noch nicht.']] : [];
  },
  n4_karte: () => {
    const not = ((c.S.sz || {}).koffer || {}).notfall || [];
    const N = { atem: 'Atmen 4–6', faust: 'Fäuste an, los', fuesse: 'Füße auf den Boden', sinne54321: '5-4-3-2-1', kalt: 'Kalte Flasche', duft: 'Duft', schiff: 'Gedanken-Schiffchen', satz: 'Eins nach dem anderen', ort: 'Sicherer Ort', freund: 'Mit jemandem reden', kuedes: 'Zu Herrn Kuedes', blick: 'Kurzer Blick zu jemandem', musik: 'Musik', korb: 'Körbe werfen', zeichnen: 'Zeichnen' };
    const liste = not.map((id) => N[id] || id);
    return liste.length ? [['erzaehler', 'Deine Notfallkarte: ' + liste.join(' · ') + '.'], { wahl: [
      { t: '(Zeigen.)', herz: { noah: 1, ben: 1 }, dann: [['noah', 'Atmen steht bei mir auch drauf. Seit Dienstag. Wegen dir.']] },
      { t: '(Nicht zeigen. Einstecken.)', dann: [['kaya', 'Gut so. Die Karte ist für dich, nicht für uns.']] },
    ] }] : [];
  },
  n4_schluss: () => [
    { szene: 'stempel', def: { modul: 'Modul 3 · Gefühle regulieren', titel: 'Runterkommen',
      gelernt: ['Deine Zahl von 0 bis 100', 'Bei Rot: erst Körper, dann Kopf', 'Für jeden ist etwas anderes Rot', 'Mit jemandem runtergeatmet', 'Die Notfallkarte im Ernstfall benutzt'],
      mission: 'Probier einen Skill aus deinem Koffer. Bevor es Rot wird.' }, folgen: {} },
    ['erzaehler', 'Freitagabend. Eine unbekannte Nummer schickt dir ein Bild.'],
    ['erzaehler', 'Ein Screenshot. Profil von @annexe.cam. Unter „Admin“ steht: {name}.'],
    ['erzaehler', 'Das bist du. Du warst das nie.'],
    ['erzaehler', 'Darunter: „Wie lange bleibt das geheim? 😈“'],
    ['erzaehler', 'Deine Zahl springt auf 90. Du weißt, wo dein Koffer ist.'],
    { tu: 'kapitelEnde' },
  ],
});

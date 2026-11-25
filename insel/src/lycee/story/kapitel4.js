// Storyline 7e „@annexe.cam“ (nach der Storyline von Fable) – Kapitel 4 „8:34“, Dezember, letzte Woche vor den Ferien.
// Verdecktes Thema: Gefühle regulieren. Anspannung hat eine Zahl (Anzeige links, die ganze Woche), und sie steigt nicht nur bei Noah.
// Bei „Rot“ wird der Kopf eng und die Zeit knapp. Länger ausatmen macht nichts gut – es gibt einem drei Sekunden zurück.
// Das Spiel sagt das nie. Wer am Mittwoch geatmet hat, bekommt am Freitag drei Sekunden, in denen die Uhr steht.
// Spuren: 8:31 Kenan mit gelbem Zettel am Türglas; Post 8:34 von hinten links, grüner Fleck am Rand (Notausgang-Schild).
import { S4_REGULIEREN } from './skills-j1.js';
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
// Stuhlkreis vorne in der Aula (Mitte −14.5 | −63.4), Lücke im Süden für den Spieler
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' } };


export const SCHRITTE_N4 = [
  { id: 'k4_morgen', kap: 4, tag: 'Montag', uhr: 7.42, titel: 'Mathe', ziel: 'Noah steht am Tor. Grau im Gesicht.', marker: 'noah',
    start: { teleport: 'busAnkunft', gespraech: 'n4_haltestelle' },
    leute: { dario: [-21.5, 41.6, -1.6, 'sitzt'], noah: [1.4, 36.6, 0.3], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'noah', gespraech: 'n4_tor' } },
  { id: 'k4_test', kap: 4, tag: 'Montag', uhr: 8.0, titel: 'Die Kiste', ziel: 'Saal 1.04. Mme Lenning sammelt die Handys ein.', marker: 'lenning',
    start: { teleport: 'saal104Tuer' },
    leute: { lenning: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'lenning', gespraech: 'n4_test' } },
  { id: 'k4_treppe', kap: 4, tag: 'Montag', uhr: 8.92, titel: '8:34', ziel: 'Noah ist weg. Die gesperrte Treppe in der Halle.', marker: 'noah',
    start: { teleport: 'saal104Tuer', gespraech: 'n4_post' },
    leute: { noah: [6.4, -3.5, 0, 'sitzt'], yusuf: [3.4, -1.2, -2.2] },
    fertig: { reden: 'noah', gespraech: 'n4_treppe' } },
  { id: 'k4_skills', kap: 4, tag: 'Montag', uhr: 9.9, neben: 'skills', titel: 'Skills: Deckel weg', ziel: 'Aula. Auf dem Boden klebt eine Linie von 0 bis 100.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], mesenberg: [-13.54, -65.16, -0.50], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n4_skills' } },
  { id: 'k4_sitzplan', kap: 4, tag: 'Dienstag', uhr: 10.0, titel: 'Hinten links', ziel: 'Hof. Chiara hat einen Sitzplan gezeichnet.', marker: 'chiara',
    start: { teleport: 'eingangHof' },
    leute: { chiara: [2.2, 15.6, 2.8, 'redet'], jo: [3.6, 16.8, -2.6], ben: [0.8, 17.4, 2.2], mila: [-1.4, 15.2, 1.4], ayla: [4.6, 14.8, -2.2] },
    fertig: { reden: 'chiara', gespraech: 'n4_sitzplan' } },
  { id: 'k4_kantine', kap: 4, tag: 'Mittwoch', uhr: 12.17, titel: 'Rot', ziel: 'Kantine. Ben und Jo sitzen schon an eurem Tisch.', marker: 'ben',
    start: { teleport: 'kantineTuer' },
    leute: { ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], yusuf: [10.75, -10.1, Math.PI / 2, 'sitzt'], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], kremer: [26.8, -9, -Math.PI / 2] },
    fertig: { reden: 'ben', gespraech: 'n4_kantine' } },
  { id: 'k4_ende', kap: 4, tag: 'Freitag', uhr: 10.0, neben: 'skills', titel: 'Skills: Notfallkarte', ziel: 'Letzte Skills-Stunde der Woche. Aula.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n4_ende' } },
  { id: 'k4_ferien', kap: 4, tag: 'Freitag', uhr: 12.0, titel: 'Sechzig Sekunden', ziel: 'Letzte Stunde vor den Ferien. Saal 1.04.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n4_ferien' } },
];

// ---------- Zonen-Wette (E11): gleicher Satz, ganz andere Zahlen ----------
const ZONEN = {
  wo: 'Aula · Die Linie von 0 bis 100', leute: { noah: F.noah, mila: F.mila, ben: F.ben, jo: F.jo, ayla: F.ayla, lina: F.lina },
  karten: [
    { t: 'Morgen ist Mathe-Test.', zahlen: { noah: 85, mila: 60, ben: 20, jo: 45, ayla: 35, lina: 70 }, sagt: ['ben', 'Zwanzig. Ich hab keine Angst. Oder keine Ahnung. Eins von beiden.'] },
    { t: 'Jemand lacht, als du reinkommst.', zahlen: { noah: 65, mila: 40, ben: 25, jo: 90, ayla: 55, lina: 75 }, sagt: ['jo', 'Neunzig. Sofort. Ich weiß selbst nicht, warum.'] },
    { t: 'Der Raum wird ohne Ansage gewechselt.', zahlen: { noah: 30, mila: 85, ben: 10, jo: 15, ayla: 20, lina: 35 }, sagt: ['mila', 'Fünfundachtzig. Räume haben Nummern. Die ändert man nicht.'] },
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
// Mathe-Test am Montag: Anspannung als Zahl. Skills aus dem Koffer – oder, ohne Skills-Stunde, das, was dir einfällt.
const TEST = (m, S) => {
  const k = ((S.sz || {}).koffer || {}).koffer || [];
  let skills = k.filter((id) => IM_TEST[id]).slice(0, 4).map((id) => ({ id, ...IM_TEST[id] }));
  const ohneKoffer = !skills.length;
  if (ohneKoffer) skills = ['atem', 'fuesse', 'sinne54321'].map((id) => ({ id, ...IM_TEST[id] }));
  const an = (m.anzeige && m.anzeige.wert) || 65;
  return {
    wo: 'Saal 1.04 · Mathe · 50 Minuten', zeit: 70, start: Math.min(75, an), skills, skillsTitel: ohneKoffer ? 'Was dir einfällt:' : 'Dein Koffer:',
    aufgaben: [
      { f: '7 · 8', a: ['54', '56', '64'], r: 1 }, { f: '45 + 38', a: ['83', '73', '93'], r: 0 }, { f: '100 − 37', a: ['73', '63', '67'], r: 1 },
      { f: '6 · 9', a: ['54', '56', '45'], r: 0 }, { f: 'Die Hälfte von 48', a: ['24', '22', '26'], r: 0 }, { f: '144 : 12', a: ['14', '12', '11'], r: 1 },
    ],
    gedanken: ['Ich kann das eh nicht.', 'Alle sind schneller.', 'Mein Kopf ist leer.', 'Mme Lenning guckt.', 'Was, wenn ich null Punkte hab?', 'Noah atmet so laut.', 'Mein Handy ist in der Kiste. Was, wenn …'],
  };
};

// ---------- Montag 8:55: Handys zurück. Ein Post von 8:34. ----------
const POST_834 = {
  titel: '@annexe.cam', mitglieder: 0, dauer: 16,
  nachrichten: [
    { nach: 0.4, system: true, text: 'Neuer Beitrag · 8:34' },
    { nach: 1.2, wer: '@annexe.cam', bild: 'Euer Saal während des Tests. Von hinten links. In der Mitte: Noah, die Hände vor dem Gesicht.', text: 'prüfungsangst. lowkey süß.', lacher: { start: 9, proSek: 0.6 } },
    { nach: 4.5, wer: 'jo_7p2', text: 'WIE' },
    { nach: 6.5, wer: 'unbekannt_04', text: 'die handys waren doch in der kiste??' },
    { nach: 9, system: true, text: '96 Likes' },
  ],
  aktionen: [
    { id: 'zoom', t: 'Foto vergrößern', symbol: '🔍', setzt: 'zoom', sys: 'Am Bildrand: ein grüner Fleck. Unscharf. Wie ein Licht.' },
    { id: 'noah', t: 'Zu Noah schauen', symbol: '👀', setzt: 'noah', sys: 'Noah steht an der Wand. Er starrt auf sein Display.', ende: true },
  ],
};

// ---------- Freitag 12:05: Jos Screenshot. Sechzig Sekunden bis zur Klingel. (Entscheidung B) ----------
// Wer am Mittwoch geatmet hat, bekommt drei Sekunden, in denen die Uhr steht. Ohne Hinweis.
const SCREENSHOT = (m) => ({
  titel: '7P2', mitglieder: 22, dauer: 60, klingel: 60, stillstand: m.k4Geatmet ? 3 : 0, stillstandAb: 2.6,
  nachrichten: [
    { nach: 0.4, wer: 'Jo', bild: 'Screenshot einer Nachricht. Oben: „{name} 7P2“. Darunter: „poste gleich das von mathe. lowkey das beste bis jetzt.“', text: 'ähm. leute.' },
    { nach: 2.2, system: true, text: 'gesehen von 21' },
    { nach: 3.6, wer: 'Chiara', text: 'WAS' },
    { nach: 5, wer: 'Ben', text: 'nee' },
    { nach: 5.8, wer: 'Ben', text: 'oder?' },
    { nach: 7.4, wer: 'tom_7p2', text: 'hinten links 💀💀' },
    { nach: 9.5, wer: 'Jo', text: 'ich sag nix. ich zeig nur.' },
    { nach: 12, wer: 'Ayla', text: 'jo woher hast du das' },
    { nach: 13.6, wer: 'Jo', text: 'egal woher' },
    { nach: 16, wer: 'sami.lu', text: 'deshalb war der platz leer auf dem foto' },
    { nach: 19, wer: 'Chiara', text: 'ich hab den sitzplan gemacht. ich sag ja nur.' },
    { nach: 22, wer: 'tom_7p2', text: 'sag was {name}' },
    { nach: 26, wer: 'Jo', text: '👀' },
    { nach: 31, wer: 'sami.lu', text: 'die ganze zeit. krass.' },
    { nach: 37, wer: 'tom_7p2', text: 'admin von hinten links. passt.' },
    { nach: 44, wer: 'Chiara', text: 'ich will nur, dass es fair ist' },
    { nach: 52, wer: 'sami.lu', text: 'schöne ferien euch 🙂' },
  ],
  aktionen: [
    { id: 'wut', t: '„WER HAT DAS GEBAUT? JO??“', symbol: '😡', setzt: 'wut', ich: 'WER HAT DAS GEBAUT? JO??',
      folgen: [{ nach: 1.2, wer: 'Jo', text: 'warum schreist du' }, { nach: 2.4, wer: 'tom_7p2', text: 'wer schreit, hat was zu verbergen' }, { nach: 3.8, wer: 'sami.lu', text: 'ok jetzt glaub ichs' }] },
    { id: 'ruhig', t: '„das bin ich nicht.“', symbol: '✍️', setzt: 'ruhig', ich: 'das bin ich nicht.' },
    { id: 'beweis', t: '(Screenshot machen. Nichts schreiben.)', symbol: '📸', setzt: 'beweis', sys: 'Screenshot gespeichert.' },
    { id: 'verlassen', t: '(Gruppe verlassen)', symbol: '🚪', setzt: 'verlassen', sys: '{name} hat die Gruppe verlassen.', ende: true },
  ],
});

export const GESPRAECHE_N4 = {
  n4_haltestelle: [
    ['erzaehler', 'Montag. Frost. Dario sitzt schon auf der Bank.'],
    ['erzaehler', 'Er schaut dich nicht an. Sein Knie wippt.'],
    ['dario', 'Schreibt ihr heute?'],
    ['du', 'Mathe.'],
    ['dario', 'Viel Glück.'],
    ['erzaehler', 'Er sagt es zu seinen Schuhen.'],
    { tu: 'n4_anzeigeStart' },
  ],
  n4_tor: [
    ['erzaehler', 'Am Tor steht Noah. Grau im Gesicht.'],
    ['noah', 'Daheim kann ich das alles.'],
    ['noah', 'Gestern Abend: jede Aufgabe richtig. Jede.'],
    { wahl: [
      { t: '„Dann kannst du es hier auch.“', dann: [['noah', 'Hier ist nicht daheim.'], ['erzaehler', 'Er meint es nicht böse. Es hilft nur nicht.']] },
      { t: '„Bei mir auch. Daheim ging es.“', staerke: 'zuhoeren', herz: { noah: 1 }, dann: [['noah', '(atmet aus) Okay. Dann sind wir zwei.'], { anzeige: 'anspannung', plus: -5 }] },
      { t: '(Neben ihm stehen bleiben. Bis es klingelt.)', staerke: 'warten', herz: { noah: 1 }, dann: [['erzaehler', 'Ihr sagt nichts. Es ist trotzdem besser als allein.']] },
    ] },
    ['erzaehler', 'Alle sind nervös. Keiner sagt es.'],
  ],
  n4_test: [
    ['lenning', 'Handys in die Kiste. Alle.'],
    ['erzaehler', 'Sie zählt laut. Bei jedem Handy ein Klacken.'],
    ['lenning', '… zwanzig. Einundzwanzig. Zweiundzwanzig.'],
    ['erzaehler', 'Das Schloss klickt.'],
    ['lenning', 'Mathe. 50 Minuten.'],
    ['erzaehler', 'Dein Stift ist feucht in der Hand.'],
    { anzeige: 'anspannung', plus: 5 },
    { szene: 'test', id: 'test4', def: (m, S) => TEST(m, S),
      ausgang: (r) => (r.max >= 90 ? 'blackout' : r.skills.length ? 'skills' : 'ohne'),
      folgen: {
        blackout: { merke: 'testBlackout', dann: [['erzaehler', 'Ein paar Aufgaben sind leer. Weiß. Wie ein Bildschirm ohne Strom.']] },
        skills: { staerke: 'ruhig', merke: 'testSkills', dann: [['erzaehler', 'Zwischendurch war dein Kopf weg. Dann wieder da.']] },
        ohne: { merke: 'testOhne' },
      } },
    { blende: '8:31' },
    ['erzaehler', 'Draußen im Flur: Schritte.'],
    { wahl: [
      { t: '(Hochschauen.)', merke: 'kenanGesehen', dann: [
        ['erzaehler', 'Am Türglas geht Kenan vorbei. In der Hand ein gelber Zettel.'],
        ['erzaehler', 'Er schaut nicht rein. Du schaust zu lange hin.'],
        ['erzaehler', 'Die letzte Aufgabe bleibt leer.'] ] },
      { t: '(Weiterschreiben.)', merke: 'weitergeschrieben', dann: [['erzaehler', 'Die Schritte gehen vorbei. Du schreibst. Letzte Aufgabe. Fertig.']] },
    ] },
    ['lenning', 'Stifte weg. Danke.'],
    { anzeige: 'anspannung', wert: 55 },
  ],
  n4_post: [
    ['erzaehler', 'Montag, 8:55. Handys zurück. Zweiundzwanzig Mal vibriert es.'],
    { szene: 'chat', id: 'post834', def: POST_834,
      ausgang: (r, m) => { if (r.flags.zoom) m.spurGruen = true; return 'standard'; }, folgen: { standard: {} } },
    { anzeige: 'anspannung', wert: 80 },
    { tu: 'n4_gruen' },
    ['erzaehler', 'Unmöglich. Alle Handys lagen in der Kiste.'],
    ['erzaehler', 'Alle schauen einander an. Dann Noah.'],
    ['erzaehler', 'Noah geht.'],
  ],
  // Schlüsselszene (Fable, K4 Szene 4) – Entscheidung A. Mit Yusufs Takt: ein, und aus, länger aus.
  n4_treppe: [
    ['erzaehler', 'Montag. 9:00. Die gesperrte Treppe in der Halle ist kalt.'],
    ['erzaehler', 'Noah sitzt hinter dem Absperrband. Er atmet zu schnell.'],
    { tu: 'n4_gehWeg' },
    ['noah', 'Meine Hände kribbeln. Ich krieg keine Luft.'],
    { wahl: [
      { t: '„Ich bin da.“', herz: { noah: 1 }, dann: [] },
      { t: '„Ich hol jemanden.“', dann: [['noah', '(schüttelt den Kopf) Nicht – weg.']] },
      { t: '(Dich neben ihn setzen.)', staerke: 'warten', herz: { noah: 1 }, dann: [] },
    ] },
    ['erzaehler', 'Schritte. Yusuf. Er kniet sich vor Noah hin.'],
    ['yusuf', 'Noah. Guck auf meine Hand.'],
    ['yusuf', 'Ein. Und aus. Länger aus.'],
    ['erzaehler', 'Seine Hand geht hoch. Und langsam wieder runter.'],
    ['erzaehler', 'Oben am Geländer steht kurz jemand. Als du hochschaust, ist niemand mehr da.'],
    { szene: 'atem', id: 'atemNoah', def: { wo: 'Halle · Treppe', wer: F.noah, info: 'Yusufs Hand gibt den Takt. Atme mit – Noah macht mit.', start: 92, ziel: 45,
      saetze: { 92: '(atmet in kurzen Stößen)', 75: 'Alle – haben es gesehen.', 60: '(die Hände zittern weniger)', 45: '(atmet aus. Lang.)' } },
      // Nach drei Versuchen ohne ruhiges Atmen: Es klappt nicht. Kein Drama – aber ohne Hilfe geht es dann nicht.
      ausgang: (r, m) => (r.gut >= 3 ? 'zusammen' : r.gut >= 2 ? 'langsam' : ((m.k4AtemNoahNicht = true), 'nicht')),
      folgen: { zusammen: { staerke: 'ruhig', herz: { noah: 2, yusuf: 1 }, merke: 'k4NoahRunter' }, langsam: { herz: { noah: 1 } },
        nicht: { dann: [['erzaehler', 'Noahs Atem wird nicht langsamer. Deiner auch nicht.'], ['yusuf', 'Okay. Wir zwei schaffen das gerade nicht. Ist nicht schlimm. Dann brauchen wir jemanden.']] } } },
    ['noah', 'Alle haben es gesehen.'],
    ['yusuf', 'Jetzt nicht. Jetzt nur aus.'],
    ['erzaehler', 'Irgendwo fällt eine Dose aus dem Automaten.'],
    { fest: true, wahl: [
      { t: '„Yusuf, holst du Mme Lenning?“', staerke: 'hilfe', herz: { noah: 1 }, merke: 'k4YusufGeschickt', dann: [['erzaehler', 'Yusuf nickt und läuft. Du bleibst. Noahs Atem wird langsamer. Es dauert.']] },
      { t: '„Ich hol sie. Bleib du.“', staerke: 'hilfe', merke: 'k4LenningGeholt', dann: [['erzaehler', 'Du rennst. Mme Lenning ist schneller da, als du denkst.'], ['erzaehler', 'Eine Minute lang sitzt Noah nur mit Yusuf da.']] },
      { t: '„Wir bleiben beide.“', wenn: (m) => !m.k4AtemNoahNicht, herz: { noah: 2 }, merke: 'k4BeideGeblieben', dann: [['erzaehler', 'Ihr bleibt. Noahs Atem wird langsamer. Aber es dauert. Lange.'], ['erzaehler', 'Irgendwann kommt Mme Lenning trotzdem. Jemand hat ihr Bescheid gesagt.']] },
    ] },
    ['erzaehler', 'Noahs Schultern sinken. Ein Stück.'],
    ['noah', 'Ich hab nicht geweint. Auf dem Foto.'],
    ['noah', 'Ich hab gerechnet. So seh ich aus, wenn ich rechne.'],
    ['erzaehler', 'Mme Lenning kommt durch die Halle. Sie rennt nicht.'],
    ['lenning', 'Ich setz mich dazu. Du musst nichts sagen.'],
    ['erzaehler', 'Sie setzt sich hin. Zwei Stufen tiefer als Noah.'],
    ['noah', 'Sagt’s keinem. Bitte.'],
    { anzeige: 'anspannung', plus: -15 },
  ],
  n4_skills: [
    ['erzaehler', 'Aula. Auf dem Boden klebt eine lange Linie. An einem Ende steht 0, am anderen 100.'],
    { szene: 'skillsStunde', id: 's4_regulieren', def: S4_REGULIEREN, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'ruhig', merke: 's4Regulieren' }, weiter: { merke: 's4Regulieren' } } },
    { tu: 'n4_busRueck' },
    ['kaya', 'Jetzt anwenden. Ich lese Sätze. Ihr stellt euch auf die Linie.'],
    ['kaya', 'Und ihr schätzt, wo die anderen stehen.'],
    { szene: 'zonen', id: 'zonen', def: ZONEN,
      ausgang: (r) => (r.treffer >= 3 ? 'leser' : 'ueberrascht'),
      folgen: {
        leser: { staerke: 'lesen', herz: { mila: 1, jo: 1 }, merke: 'zonenLeser', dann: [['mesenberg', 'Du liest die Klasse gut. Und trotzdem waren Überraschungen dabei.']] },
        ueberrascht: { herz: { ayla: 1 }, dann: [['kaya', 'Überrascht? Gut. Deine 20 kann für andere 90 sein.']] },
      } },
    ['jo', 'Ey. Ich dachte, Mila ist nie gestresst.'],
    ['jo', 'Die ist bei 85 wegen einem RAUM.'],
    ['mila', 'Und du bei 90 wegen einem Lachen. Gleichstand.'],
    ['kaya', 'Letzte Übung: Pack deinen Koffer. Was hilft dir bei Rot?'],
    ['kaya', 'Der Koffer kommt mit. In jeden Test. In jede Pause.'],
    { szene: 'koffer', id: 'koffer', def: KOFFER, ausgang: (r) => (r.notfall.some((id) => ['schiff', 'satz', 'ort'].includes(id)) && r.notfall.every((id) => ['schiff', 'satz', 'ort'].includes(id)) ? 'nurKopf' : 'gemischt'),
      folgen: {
        gemischt: { staerke: 'ruhig', merke: 'kofferGepackt' },
        nurKopf: { merke: ['kofferGepackt', 'kofferNurKopf'], dann: [['mesenberg', 'Nur Kopf auf der Notfallkarte? Probier es aus.'], ['mesenberg', 'Bei Rot merkt man, was wirklich geht.']] },
      } },
    ['ben', 'Mein Koffer: Atmen, Körbe werfen, Mila fragen. Mila ist ein Skill.'],
    ['mila', 'Ich bin kein Skill. … Okay. Ein bisschen.'],
    { tu: 'n4_milaDanke' },
  ],
  // Dienstag 10:00: Die Rechnung klingt logisch. Ab heute hast du einen Spitznamen.
  n4_sitzplan: [
    { anzeige: 'anspannung', wert: 55 },
    ['erzaehler', 'Dienstag. Hof. Chiara hält ein kariertes Blatt. Mit Lineal gezeichnet.'],
    ['chiara', 'Der Sitzplan vom Test. Ich hab die Leute auf dem Foto gezählt.'],
    ['chiara', 'Einundzwanzig.'],
    ['erzaehler', 'Auf ihrem Plan ist ein Platz leer. Hinten links.'],
    ['erzaehler', 'Deiner.'],
    ['jo', 'Logisch. Das Foto ist von hinten links.'],
    ['jo', 'Wer nicht drauf ist, hat’s gemacht.'],
    { anzeige: 'anspannung', plus: 10 },
    { wahl: [
      { t: '„Wer fotografiert, ist nie drauf. Das heißt nicht, dass ich es war.“', staerke: 'klar', merke: 'k4SitzplanRuhig', dann: [
        ['chiara', 'Stimmt. Es heißt aber auch nicht, dass du es nicht warst.'],
        ['erzaehler', 'Die Rechnung klingt logisch. Sie ist es nicht. Aber sie bleibt hängen.'] ] },
      { t: '„Spinnst du? Mein Handy war in der Kiste!“', merke: 'k4SitzplanLaut', dann: [
        { anzeige: 'anspannung', plus: 8 },
        ['jo', 'Chill. Warum so laut, Hinten links?'],
        ['erzaehler', 'Ein paar lachen. Der Name bleibt hängen.'] ] },
      { t: '(Nichts sagen. Weggehen.)', merke: 'k4SitzplanWeg', dann: [['jo', '(ruft hinterher) Hinten links haut ab!']] },
    ] },
    { tu: 'n4_spitzname' },
    ['ben', '(leise) Ich hab was anderes gehört. Die Lenning war’s selber.'],
    ['ben', 'Sie hatte als Einzige ein Handy. Logisch, oder?'],
    ['mila', '(schreibt etwas in ihr Heft) Zwei Gerüchte. Null Beweise.'],
    { anzeige: 'anspannung', plus: 5 },
  ],
  // Mittwoch 12:10: Rot. Explodieren, rausgehen – oder Yusufs Takt, diesmal allein.
  n4_kantine: [
    { anzeige: 'anspannung', wert: 60 },
    ['erzaehler', 'Mittwoch. Kantine. Du stellst dein Tablett ab.'],
    ['erzaehler', 'Am Nebentisch wird geflüstert. Dann am nächsten. Vier Tische.'],
    ['jemand', '(leise) … hinten links …'],
    ['erzaehler', 'Deine Hände zittern. Die Gabel klappert auf dem Teller.'],
    { anzeige: 'anspannung', wert: 85 },
    ['jo', '(laut, zu Ben) Pass auf, was du isst. Sonst bist du morgen drauf.'],
    ['erzaehler', 'Ein paar lachen.'],
    { warum: true, fest: true, wahl: [
      { t: '„Halt die Klappe, Jo!“', herz: { jo: -1 }, merke: 'k4Explodiert', dann: [
        { anzeige: 'anspannung', wert: 95 },
        ['erzaehler', 'Du bist aufgesprungen. Der Stuhl kippt. Es ist still.'],
        ['erzaehler', 'Am Nebentisch ist ein Handy oben. Es filmt.'],
        ['jo', '(hebt die Hände) Okay. Nerv getroffen.'],
        ['erzaehler', 'Du setzt dich. Dein Herz rennt noch lange.'],
        { anzeige: 'anspannung', wert: 80 } ] },
      { t: '(Rausgehen. Einfach weg hier.)', merke: 'k4Rausgegangen', dann: [
        ['erzaehler', 'Das Tablett bleibt stehen. Draußen ist es kalt. Gut kalt.'],
        { anzeige: 'anspannung', wert: 70 },
        ['erzaehler', 'Drinnen reden sie weiter. Du hörst es nicht mehr.'] ] },
      { t: '(Atmen. Yusufs Takt.)', staerke: 'ruhig', merke: 'k4Geatmet', dann: [
        { szene: 'atem', id: 'atemAllein', def: { wo: 'Kantine · dein Platz', titel: 'Atmen', allein: true, wer: { name: 'Kopf', farbe: '#5f7d9e' },
          info: 'Niemand muss es sehen. Yusufs Takt: ein. Und aus. Länger aus.', start: 85, ziel: 45,
          saetze: { 85: 'Alle schauen. Alle wissen es.', 70: 'Ein. Und aus. Länger aus.', 55: 'Die Gabel liegt still.', 45: 'Okay. Noch da.' } },
          // Nicht geschafft (drei Versuche): kein Bonus am Freitag – man ist doch rausgegangen
          ausgang: (r, m) => { if ((r.gut || 0) < 2) { m.k4Geatmet = false; m.k4AtemNicht = true; m.k4Rausgegangen = true; return 'nicht'; } return 'standard'; },
          folgen: { standard: {}, nicht: { dann: [['erzaehler', 'Es klappt nicht. Die Zahl bleibt oben. Die Gabel klappert weiter.'], ['erzaehler', 'Du stehst auf und gehst raus. Draußen ist es kalt. Gut kalt.']] } } },
        { tu: 'n4_nachAtem' } ] },
    ] },
  ],
  // Freitag 12:00: „Schöne Ferien.“ – 12:05: Jos Screenshot. Entscheidung B. Kapitelende.
  n4_ferien: [
    { anzeige: 'anspannung', wert: 45 },
    ['hoffmann', 'So. Das war’s für dieses Jahr. Schöne Ferien.'],
    ['erzaehler', 'Stühle kratzen. Jemand summt schief ein Weihnachtslied.'],
    { blende: 'Freitag · 12:05' },
    ['erzaehler', 'Alle Handys summen gleichzeitig. Der Klassenchat.'],
    ['erzaehler', 'Dann drehen sich alle zu dir um.'],
    { anzeige: 'anspannung', wert: 90 },
    ['erzaehler', 'Sechzig Sekunden bis zur Klingel.'],
    { szene: 'chat', id: 'screenshot', def: (m) => SCREENSHOT(m),
      ausgang: (r, m) => { if (r.flags.beweis) m.k4Beweis = true; return r.flags.verlassen ? 'verlassen' : r.flags.wut ? 'wut' : r.flags.ruhig ? 'ruhig' : r.flags.beweis ? 'beweis' : 'stumm'; },
      folgen: {
        wut: { herz: { jo: -1 }, merke: 'k4Wut', dann: [['erzaehler', 'Deine Großbuchstaben stehen da. Für alle. Wut liest sich wie Schuld.']] },
        ruhig: { staerke: 'klar', merke: 'k4Ruhig', dann: [['erzaehler', 'Dein Satz steht allein zwischen dreißig Nachrichten. Keiner antwortet darauf. Aber er steht da.']] },
        beweis: { staerke: 'lesen', merke: 'k4Stumm', dann: [['erzaehler', 'Alles gespeichert. Geschrieben hast du nichts. Für die anderen sieht das aus wie Schweigen.']] },
        verlassen: { merke: 'k4Verlassen', dann: [['erzaehler', '„{name} hat die Gruppe verlassen.“ Das sehen alle. Manche lesen es wie ein Geständnis.']] },
        stumm: { merke: 'k4Stumm', dann: [['erzaehler', 'Du schreibst nichts. Unter dem Screenshot stehen dreißig Nachrichten. Keine von dir.']] },
      } },
    ['erzaehler', 'Dann klingelt es. Zwei Wochen Ferien.'],
    { tu: 'kapitelEnde' },
  ],
  n4_ende: [
    ['kaya', 'Letzte Stunde der Woche. Wer will, zeigt seine Notfallkarte.'],
    ['kaya', 'Wer nicht will, nicht.'],
    ['ben', 'Meine: Atmen. Körbe werfen. Und Mila fragen.'],
    ['mesenberg', 'Körper, Körper, Mensch. Für Rot genau richtig.'],
    { tu: 'n4_karte' },
    ['kaya', 'Ganz unten steht bei allen das Gleiche.'],
    ['kaya', 'Wenn gar nichts mehr geht: Hilfe holen. Uns hier.'],
    ['kaya', 'Oder anrufen: 116 111. Anonym und gratis.'],
    { tu: 'n4_schluss' },
  ],
};

export const tunN4 = (c) => ({
  n4_anzeigeStart: () => {
    c.anzeige('anspannung', 60);
    if (!c.S.merke.anzeigeGezeigt) { c.S.merke.anzeigeGezeigt = true; c.ui.toast('<b>Anspannung · 0 bis 100</b><span>Links. Sie bleibt die ganze Woche da.</span>'); }
    return [];
  },
  n4_gruen: () => {
    if (!c.S.merke.spurGruen) return [];
    c.ui.toast('<b>🔎 Spur</b><span>Ein grüner Fleck am Rand des Fotos von 8:34.</span>', 'ly-t-ent');
    return [];
  },
  // Wer in Kapitel 2 bei den Lachenden blieb, hört zuerst: „Geh weg.“ Bleiben geht trotzdem.
  n4_gehWeg: () => (c.S.merke.listeGelacht ? [['noah', 'Geh weg.'], ['erzaehler', 'Du gehst nicht. Du bleibst. Einen Meter weiter weg.']] : []),
  n4_spitzname: () => { c.ui.toast('<b>Neuer Spitzname</b><span>„Hinten links“</span>'); return [['erzaehler', 'Ab heute hast du einen Spitznamen. Hinten links.']]; },
  n4_nachAtem: () => {
    if (c.S.merke.k4AtemNicht) { c.anzeige('anspannung', 70); return [['yusuf', '(später, im Gang) Beim ersten Mal klappt das fast nie. Bei mir auch nicht. Übst du mit mir?']]; }
    const z = ((c.S.sz || {}).atemAllein || {}).zahl;
    c.anzeige('anspannung', z != null ? Math.max(45, z) : 55);
    return [['erzaehler', 'Jo redet weiter. Du hörst es. Es ist nur noch Jo.'], ['yusuf', '(vom Nebentisch, ohne aufzuschauen) Länger aus.']];
  },
  n4_busRueck: () => [['kaya', 'Heute Morgen war ein Test. Und dann ein Foto. Wo wart ihr auf der Linie?'], ['kaya', 'Keine Antwort laut. Nur für euch.']],
  n4_milaDanke: () => {
    const m = c.S.merke;
    if (m.milaGesagt) return [['mila', '(im Rausgehen, leise) Der Post im Dezember. Du hast es mir selbst gesagt. Das merk ich mir.']];
    if (m.wuerfelGefragt) return [['mila', '(im Rausgehen) Der Würfel. Du hast gefragt, wie er geht. Das fragt sonst keiner.']];
    return [];
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
  ],
});

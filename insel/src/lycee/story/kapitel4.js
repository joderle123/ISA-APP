// Storyline 7e „@annexe.cam“ – Kapitel 4 „8:34“, Dezember, Woche der Tests vor den Ferien (Gesamtkonzept K4).
// Verdecktes Thema: Gefühle regulieren (Heft #03 Druck). Erst mit dem Körper, dann mit dem Kopf (ab Gelb). Montag schaut man
// 20 Sekunden in die Zukunft (Mittwoch, 8:33, mitten im Test) und probiert selbst, was wirkt. Daraus schreibt man den eigenen
// Zettel: Bei Rot … · Bei Gelb … · Bei Rot gehe ich zu … Gebraucht im Test und in der Pause, wenn das Foto von 8:34 kommt.
// Spuren: Montag ein gelber Zettel mit Loch am Türglas von 1.04 (Lina zoomt); im Test: 8:29 Noah geht raus, 8:31 Kenan am Glas,
// 8:33 Noah kommt zurück, 8:34 Blitz an der Tür (das Foto ist von draußen). Aufschauen kostet Testzeit. Kein Spieler-Geld, keine Familie.
import { S4_REGULIEREN } from './skills-j1.js';
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1), manon: pult(2, 0, 1) };
// Testordnung am Mittwoch: einer pro Tisch. Du hinten links (an der Tür), Jo ganz vorne.
const TEST_KLASSE = { ayla: pult(0, 0, -1), jo: pult(0, 1, -1), yusuf: pult(0, 2, -1), ben: pult(1, 0, 1), mila: pult(1, 2, 1), lina: pult(2, 0, -1), chiara: pult(2, 2, 1), manon: pult(3, 0, 1), noah: pult(3, 1, 1) };
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' }, yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#2e86de' },
  chiara: { id: 'chiara', name: 'Chiara', farbe: '#e67e22' }, manon: { id: 'manon', name: 'Manon', farbe: '#e07b39' } };

export const ORTE_N4 = { hofBank: { x: 2.0, z: 8.6, yaw: 0 }, brunnenNah: { x: -6.2, z: 15.4, yaw: Math.PI * 0.85 } };
// Montag 9:50 im Hof (Frost): Chiara mit Karteikarten, Jo, Ben und Yusuf auf der Eisrutsche, Mila mit Kopfhörern, Lina an der Tür von 1.04
const HOF_MO = { chiara: [-3.2, 10.8, 0.6, 'redet'], jo: [3.8, 12.6, -2.4], ben: [9.6, 16.2, 1.6], yusuf: [11.2, 15.0, -1.4], mila: [-14.4, 12.2, 1.2, 'sitzt'], lina: [-20.6, -15.2, Math.PI], manon: [-4.4, 11.6, -0.6] };
// Mittwoch 9:50: Jo mit dem Handy in der Mitte, zwei aus der 7P1 am Brunnen, die Klasse drumherum
const HOF_MI = { jo: [1.2, 14.0, Math.PI, 'handy'], kenan: [-6.6, 16.4, 0.9], luca: [-5.2, 17.6, 1.4], chiara: [3.4, 15.2, -2.6], ben: [4.4, 13.2, -2.0], yusuf: [-1.4, 15.8, 2.4], noah: [-2.6, 13.0, 2.0], mila: [5.6, 16.4, -2.2], lenning: [0.4, 4.6, Math.PI] };
const HOF_FR = { ben: [-2.4, 15.0, 0.4], yusuf: [3.8, 16.6, -0.6], jo: [6.2, 14.2, -1.2], chiara: [-4.2, 12.6, 0.8], mila: [-6.4, 13.6, 1.0], noah: [0.6, 12.4, 0.2], manon: [2.0, 11.6, 0.0], kenan: [1.6, 24.6, Math.PI], luca: [-1.8, 25.2, Math.PI], dario: [4.4, 24.2, Math.PI], lenning: [-1.0, 4.4, Math.PI] };

export const SCHRITTE_N4 = [
  // 1 · Montag 7:25: Frost an der Haltestelle. Dario redet zu schnell. Auf seinem Handy: „mittwoch. 8:34.“
  { id: 'k4_morgen', kap: 4, tag: 'Montag', uhr: 7.42, titel: 'Frost', ziel: 'Haltestelle. Man sieht den eigenen Atem.', marker: 'dario',
    start: { teleport: 'busAnkunft' },
    leute: { dario: [-17.2, 41.4, -1.2], noah: [-20.5, 42.3, -1.9], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n4_dario' } },
  // 2 · Montag 8:00: Mathe. Mme Lenning schreibt „Test: Mittwoch“ an. Vorausblende: Mittwoch 8:33, 20 Sekunden – dann der eigene Zettel.
  { id: 'k4_ampel', kap: 4, tag: 'Montag', uhr: 8.0, titel: 'Zwei Tage vorher', ziel: 'Saal 1.04. Mathe. An der Tafel steht ein Datum.', marker: 'lenning',
    start: { teleport: 'saal104Tuer', gespraech: 'n4_ampelStart' },
    leute: { lenning: [-27, -24, Math.PI / 2], ...KLASSE, kaya: [-20.0, -14.2, Math.PI] },
    fertig: { nachStart: true } },
  // 3 · Montag 9:50: Pause im Frost = ein Ort. An der Tür von 1.04 klebt etwas am Glas.
  { id: 'k4_hof', kap: 4, tag: 'Montag', uhr: 9.83, titel: 'Eisrutsche', ziel: 'Pause. Der Hof ist glatt. Wo bist du?', marker: null,
    start: { teleport: 'eingangHof', gespraech: 'n4_hofStart' },
    leute: HOF_MO,
    fertig: { nachStart: true } },
  // 4 · Mittwoch 8:20: der Mathe-Test. Um 8:34 blitzt es an der Tür.
  { id: 'k4_test', kap: 4, tag: 'Mittwoch', uhr: 8.33, titel: 'Acht Aufgaben', ziel: 'Saal 1.04. Mme Lenning teilt die Blätter aus.', marker: 'lenning',
    start: { teleport: 'saal104Tuer' },
    leute: { lenning: [-27, -24, Math.PI / 2], ...TEST_KLASSE },
    fertig: { reden: 'lenning', gespraech: 'n4_test' } },
  // 5 · Mittwoch 9:50: das Foto von 8:34 (Hauptszene), drei Wellen. Danach 20 Sekunden durch Jos Augen.
  { id: 'k4_foto', kap: 4, tag: 'Mittwoch', uhr: 9.83, titel: 'Hinten links', ziel: 'Hof. Alle Handys summen gleichzeitig.', marker: 'jo',
    start: { teleport: 'eingangHof' },
    leute: HOF_MI,
    fertig: { reden: 'jo', gespraech: 'n4_foto' } },
  // Donnerstag (freiwillig, Skills-Kurs): Runterkommen – welcher Skill hilft wann?
  { id: 'k4_skills', kap: 4, tag: 'Donnerstag', uhr: 9.9, neben: 'skills', titel: 'Skills: Bremsen', ziel: 'Aula. Herr Kuedes hat eine Ampel auf den Boden geklebt.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n4_skills' } },
  // 6 · Freitag 12:05: Die Tests kommen zurück. Dann Schnee: Schneeballschlacht 7P2 gegen 7P1.
  { id: 'k4_schnee', kap: 4, tag: 'Freitag', uhr: 12.08, titel: 'Schnee', ziel: 'Hof. Es schneit richtig. Die 7P1 hat schon einen Wall gebaut.', marker: 'ben',
    start: { teleport: 'eingangHof' },
    leute: HOF_FR,
    fertig: { reden: 'ben', gespraech: 'n4_schnee' } },
  // 7 · Freitag 15:40: Haltestelle. Chiaras Sicht im Test. Dann Dario, blass.
  { id: 'k4_freitag', kap: 4, tag: 'Freitag', uhr: 15.67, titel: 'Zu viel', ziel: 'Haltestelle. Letzter Bus vor den Ferien. Dario sitzt schon da.', marker: 'dario',
    start: { teleport: 'busAnkunft' },
    leute: { dario: [-17.2, 41.4, -1.2], chiara: [-19.6, 42.8, -1.6], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n4_freitag' } },
];


// Werkzeuge. koerper: wirkt auch auf Rot. kopf: wirkt ab Gelb (auf Rot kommt der Kopf nicht ran) – wie im Heft #03.
export const WERKZEUGE4 = {
  atmen: { t: '4 ein, 8 aus', sy: '🫁', koerper: true }, kalt: { t: 'Kälte', sy: '🧊', koerper: true }, sauer: { t: 'Saurer Drops', sy: '🍬', koerper: true },
  rennen: { t: '20 Meter rennen', sy: '🏃', koerper: true }, zaehlen: { t: 'Rückwärts zählen', sy: '🔢', kopf: true }, parken: { t: 'Gedanken parken', sy: '🅿️', kopf: true },
};
// Bei Rot gehe ich zu … (dritte Zeile des Zettels, wie im Heft)
const ZU4 = { mila: 'Mila', kaya: 'Herrn Kuedes', lenning: 'Mme Lenning' };
// Wirkung: Körper-Werkzeuge wirken auch auf Rot, Kopf-Werkzeuge nur auf Gelb (kein Zufall – das soll man selbst erleben)
export const wirkung4 = (id, name, zone) => {
  const w = WERKZEUGE4[id]; if (!w) return 0;
  if (w.kopf) return zone === 'rot' ? 0 : 2;
  return 3;
};

// ---------- Mathe-Test am Mittwoch (Modul 1–3: Größen, Dezimalzahlen, Fläche, Temperatur) ----------
const IM_TEST = {   // was vom Plan im Saal geht (ohne aufzustehen)
  atmen: { t: '4 ein, 8 aus', sy: '🫁', wirkung: 26, wie: 'Vier ein … acht aus … vier ein …' },
  kalt: { t: 'Kalte Flasche an die Stirn', sy: '🧊', wirkung: 24, wie: 'Die Wasserflasche aus dem Rucksack. Kalt an der Stirn.' },
  sauer: { t: 'Saurer Drops', sy: '🍬', wirkung: 22, wie: 'Sauer. Sehr sauer. Der Kopf ist kurz nur noch im Mund.' },
  rennen: { t: 'Füße in den Boden drücken', sy: '🦶', wirkung: 20, wie: 'Rennen geht nicht. Aber die Füße drücken fest. Fünf Sekunden. Los.' },
  zaehlen: { t: 'Rückwärts zählen', sy: '🔢', wirkung: 18, kopf: true, wie: 'Hundert, dreiundneunzig, sechsundachtzig …', rot: 'Hundert, dreiundneunzig … weg. Die Zahlen rutschen weg.' },
  parken: { t: 'Gedanken parken', sy: '🅿️', wirkung: 14, kopf: true, wie: 'Der Gedanke kommt auf den Parkschein: „nach dem Test“.', rot: 'Parken? Auf Rot hält nichts still.' },
};
// Montag: 20 Sekunden aus der Zukunft. Drei Sachen in Reichweite, ohne Etiketten – was wirkt, merkt man selbst.
const VORAUS4 = {
  wo: 'Mittwoch · 8:33 · Saal 1.04', zeit: 20, start: 78, drift: 0.05, wiederholbar: 5, skillsTitel: 'In Reichweite:', elefant: true,
  skills: [{ id: 'atmen', ...IM_TEST.atmen, t: 'Atmen' }, { id: 'kalt', ...IM_TEST.kalt, t: 'Kalte Flasche' }, { id: 'zaehlen', ...IM_TEST.zaehlen }],
  uhr: { von: 8 * 60 + 33, bis: 8 * 60 + 34 },
  aufgaben: [{ f: 'Quadrat, Seite 5 cm – Umfang?', a: ['25 cm', '20 cm', '10 cm'], r: 1 }, { f: '9,6 : 3', a: ['3,2', '3,02', '32'], r: 0 }, { f: '750 g = … kg', a: ['7,5', '0,75', '75'], r: 1 }],
  gedanken: ['Noch vier Minuten.', 'Alle sind schneller.', 'Mein Kopf ist leer.', 'Was ist um 8:34?'],
  ereignisse: [{ bei: 0.35, text: 'Mme Lenning: „Noch vier Minuten.“', plus: 4 }, { bei: 0.8, text: '8:34. Du schaust zur Tür. Nichts. Oder?', plus: 6 }],
};
const TEST4 = (m) => {
  const plan = m.k4Plan || {}, ids = [...new Set([plan.rot, plan.gelb, 'atmen'].filter((id) => IM_TEST[id] && id !== 'parken'))];
  const skills = ids.map((id) => ({ id, ...IM_TEST[id] }));
  const park = plan.gelb === 'parken' || plan.rot === 'parken';
  return {
    wo: 'Saal 1.04 · Mathe · Mme Lenning', zeit: 110, start: m.k4Plan ? 50 : 60, drift: 0.012, wiederholbar: 14, skills, skillsTitel: m.k4Plan ? 'Dein Ampelplan:' : 'Was dir einfällt:',
    parkschein: park, parkFuerAlle: true, elefant: true, ermahnung: { ab: 2, text: 'Mme Lenning: „Hinten links. Augen aufs Blatt.“', plus: 6 },
    uhr: { von: 8 * 60 + 26, bis: 8 * 60 + 37 }, notbremse: { text: 'Hand hoch. Mme Lenning nickt. Eine Minute im Gang. Kalte Luft vom Fenster. Dann zurück.' },
    aufgaben: [
      { f: '3,5 km = … m', a: ['350', '3500', '35 000'], r: 1 }, { f: '2,4 + 0,75', a: ['3,15', '2,79', '3,1'], r: 0 },
      { f: 'Rechteck 6 m × 4 m – Fläche?', a: ['20 m²', '24 m²', '10 m²'], r: 1 }, { f: 'Morgens −4 °C, mittags +3 °C. Wie viel wärmer?', a: ['1 °C', '7 °C', '−7 °C'], r: 1 },
      { f: '1,2 · 10', a: ['12', '1,20', '120'], r: 0 }, { f: '750 g = … kg', a: ['7,5', '0,75', '75'], r: 1 },
      { f: '9,6 : 3', a: ['3,2', '3,02', '32'], r: 0 }, { f: 'Quadrat, Seite 5 cm – Umfang?', a: ['25 cm', '20 cm', '10 cm'], r: 1 },
    ],
    gedanken: ['Ich kann das eh nicht.', 'Alle sind schneller.', 'Mein Kopf ist leer.', 'Mme Lenning guckt.', '8:34. Was ist um 8:34?', 'Wenn ich das verhaue …'],
    // 👀 Aufschauen kostet fünf Sekunden Testzeit – und bringt etwas, das man in der Pause braucht
    ereignisse: [
      { bei: 0.14, ab: 1, text: 'Hinten klopft jemand mit dem Stift. Tack. Tack. Tack.', plus: 4 },
      m.k4DarioGefragt
        ? { bei: 0.32, ab: 2, text: '8:29. Noah schiebt den Stuhl zurück. „Darf ich aufs Klo?“ Halb neun.', plus: 4, blick: { t: '„Bleib.“ flüstern', key: 'noahBleib', kosten: 5, text: 'Du flüsterst: „Bleib.“ Noah zögert. Er bleibt. Mme Lenning: „Hinten links! Ruhe.“' } }
        : { bei: 0.32, ab: 2, text: '8:29. Neben dir schiebt jemand den Stuhl zurück.', plus: 2, blick: { t: '👀 Aufschauen', key: 'noahRaus', kosten: 5, text: 'Noah. „Darf ich aufs Klo?“ Mme Lenning nickt. Er geht raus.' } },
      m.k4ZettelWeg
        ? { bei: 0.46, ab: 3, text: '8:31. Am Türglas raschelt etwas.', blick: { t: '👀 Aufschauen', key: 'kenanKlebt', kosten: 5, text: 'Kenan. Er klebt einen neuen gelben Zettel ans Glas. Mit Loch. Dann ist er weg.' } }
        : { bei: 0.46, ab: 3, text: '8:31. Im Gang geht jemand am Türglas vorbei.', blick: { t: '👀 Aufschauen', key: 'kenanGesehen', kosten: 5, text: 'Kenan. Der Große, Darios Freund. Er hat einen gelben Zettel in der Hand. Er schaut kurz rein. Dann ist er weg.' } },
      { bei: 0.66, ab: 5, nichtWenn: 'noahBleib', text: '8:33. Die Tür geht auf. Mme Lenning: „Noch vier Minuten.“', blick: { t: '👀 Aufschauen', key: 'noahZurueck', kosten: 5, text: 'Noah kommt zurück. Er setzt sich neben dich. Er hat nichts in der Hand.' } },
      { bei: 0.8, ab: 6, text: '8:34. Ein Blitz. Ganz kurz.', blitz: true, plus: 8, blick: { t: '👀 Woher?', key: 'blitzTuer', kosten: 5, text: 'Von der Tür. Durchs Glas. Draußen huscht jemand weg.' } },
    ],
  };
};

// ---------- Die Wellen (Hauptszene). ruhig = auf Rot gesperrt: Da kommt der Kopf nicht ran. Körper-Werkzeuge gehen immer. ----------
const planIst = (m, id) => !!(m.k4Plan && (m.k4Plan.rot === id || m.k4Plan.gelb === id));
const ATEM_WELLE = (n) => [{ szene: 'atem', id: 'k4AtemW' + n,
  def: (m, S) => ({ wo: 'Hof · mittendrin', titel: '4 ein, 8 aus', allein: true, wer: { name: 'Du', farbe: '#2fb8a8' }, start: Math.round(((S.pult && S.pult.w) || 6) * 10), ziel: 30,
    info: 'Sie reden weiter. Du hältst nur den Takt. Deine Atemwolke in der kalten Luft zeigt ihn dir.' }),
  ausgang: () => 'weiter', folgen: { weiter: {} } }, { tu: 'n4_atem' }];
const TOOL4 = {
  atmen: { t: '🫁 4 ein, 8 aus.', dann: (n) => ATEM_WELLE(n) }, kalt: { t: '🧊 Zum Brunnen.', dann: () => [{ tu: 'n4_brunnen' }] },
  sauer: { t: '🍬 Saurer Drops.', dann: () => [{ tu: 'n4_sauer' }] }, rennen: { t: '🏃 Einmal ums Gebäude.', dann: () => [{ tu: 'n4_rennen' }] },
  zaehlen: { t: '🔢 Rückwärts zählen.', dann: () => [{ tu: 'n4_zaehlenRot' }] }, parken: { t: '🅿️ Gedanken parken.', dann: () => [{ tu: 'n4_parkenRot' }] },
};
const wJetzt = (S) => (S && S.pult && S.pult.w) || 0;
const zeileJetzt = (m, S) => (wJetzt(S) >= 7 ? planRot(m) : ((m.k4Plan && m.k4Plan.gelb) || planRot(m)));
const kopfZu = (m, S) => wJetzt(S) >= 7 && !!m.k4KopfRutscht && !!(WERKZEUGE4[zeileJetzt(m, S)] || {}).kopf;
const planRot = (m) => (m.k4Plan && m.k4Plan.rot) || '';
const planZu = (m) => (m.k4Plan && m.k4Plan.zu) || '';
const kenanOffen = (m) => !!(m.kenanGesehen || m.kenanKlebt) && !m.k4KenanGefragt;
// Höchstens vier Antworten: Worte · dein Rot-Werkzeug (★) · „Der Blitz kam von der Tür!“ (📎) · Kenan (Welle 2) oder dein Mensch (★)
const WELLE = (n) => [
  { t: n === 1 ? '„Du gibst doch selbst leer ab.“' : n === 2 ? '„Kümmert euch um euren Kram.“' : '„Was glotzt ihr alle so?!“',
    merke: n === 1 ? 'k4Wut' : 'k4WutSpaet', herz: n === 1 ? { jo: -2 } : {}, dann: [{ tu: 'n4_worte' }] },
  // ★ folgt der Farbe (wie im Test und im Heft #03): auf Rot die Rot-Zeile, sonst die Gelb-Zeile. Ist ein Kopf-Werkzeug auf Rot schon
  // einmal weggerutscht, bietet die nächste Welle den Körper an (🫁) – der Fehler wird zur Rückmeldung, nicht zur Sackgasse.
  ...Object.keys(TOOL4).map((id) => ({ t: TOOL4[id].t + ' ★', wenn: (m, S) => zeileJetzt(m, S) === id && !kopfZu(m, S), dann: TOOL4[id].dann(n) })),
  { t: '🫁 4 ein, 8 aus.', wenn: (m, S) => !TOOL4[zeileJetzt(m, S)] || kopfZu(m, S), dann: ATEM_WELLE(n) },
  { t: '„Der Blitz kam von der Tür!“', ruhig: true, beweis: 'k4Blitz', staerke: 'lesen', dann: [{ tu: 'n4_fotoZeigen' }] },
  ...(n === 1 ? [{ t: '„Montag hast du’s gesagt, Jo.“', ruhig: true, wenn: (m) => !m.k4BlitzGesehen, merke: 'k4JoMontag', dann: [{ tu: 'n4_joMontag' }] }] : []),
  ...(n === 2 ? [{ t: '„Kenan. 8:31. Der Zettel.“', ruhig: true, wenn: kenanOffen, staerke: 'lesen', merke: 'k4KenanGefragt', dann: [{ tu: 'n4_kenan' }] }] : []),
  { t: '(Zu Mila.) ★', wenn: (m) => planZu(m) === 'mila' && !(n === 2 && kenanOffen(m)), dann: [{ tu: 'n4_zuMila' }] },
  { t: '(Zu Herrn Kuedes.) ★', wenn: (m) => planZu(m) === 'kaya' && !(n === 2 && kenanOffen(m)), dann: [{ tu: 'n4_zuKaya' }] },
  { t: '(Zu Mme Lenning.) ★', wenn: (m) => planZu(m) === 'lenning' && !(n === 2 && kenanOffen(m)), dann: [{ tu: 'n4_lenning' }] },
  { t: '(Zu Mme Lenning gehen.)', wenn: (m) => !planZu(m) && !(n === 2 && kenanOffen(m)), dann: [{ tu: 'n4_lenning' }] },
];

export const GESPRAECHE_N4 = {
  // ---------- 1 · Montag 7:25: Haltestelle im Frost ----------
  n4_dario: [
    ['erzaehler', 'Dezember. Frost. Wer atmet, macht Wölkchen. Diese Woche: Tests.'],
    { wenn: (m) => !!m.k3DarioGenannt, dann: [['dario', '(ohne dich anzusehen) Yusuf stand Freitag vor mir. Wegen dir.'], ['dario', '(hält dir trotzdem sein Handy hin) Fahrplan. Bitte. Meine Finger sind zu kalt.']],
      sonst: [['dario', '(hält dir sein Handy hin) Guck mal, wann der Bus kommt. Meine Finger sind zu kalt.']] },
    ['erzaehler', 'Du schaust auf den Fahrplan. Oben rutscht eine Nachricht rein.'],
    { handy: { wer: 'Darios Handy · Fahrplan', wann: '7:24', chat: [{ wer: 'unbekannt', t: 'mittwoch. 8:34.' }] } },
    { wahl: [
      { t: '(Nur den Fahrplan lesen.)', merke: 'k4NichtGeschaut', herz: { dario: 1 },
        dann: [{ handy: null }, ['du', 'Sieben Minuten.'], ['dario', '(nimmt es schnell) … Danke.']] },
      { t: '„Was ist Mittwoch um 8:34?“', merke: 'k4DarioGefragt', staerke: 'lesen',
        dann: [{ handy: null }, { beweis: 'k4Zeile', t: 'Auf Darios Handy: „mittwoch. 8:34.“' }, ['dario', '(zu schnell) Keine Ahnung. Echt. Steht da so. Irgendein Account.'], ['erzaehler', 'Er schaut auf die Straße. Der Bus ist noch nicht zu sehen.'], ['dario', '(leiser) Geh am Mittwoch nicht aufs Klo. Um halb neun. Nur so.'],
          { verdacht: 'dario', spur: 'Auf seinem Handy: „mittwoch. 8:34.“ Zwei Tage vorher.' }] },
      { t: '„Alles okay bei dir?“', herz: { dario: 1 }, merke: 'k4DarioOkay',
        dann: [{ handy: null }, { beweis: 'k4Zeile', t: 'Auf Darios Handy: „mittwoch. 8:34.“' }, ['dario', '(lacht kurz) Klar. Alles okay. … Zu viel Kaffee.'], ['erzaehler', 'Er hat keinen Becher. Nur das Handy.'],
          { verdacht: 'dario', spur: 'Auf seinem Handy: „mittwoch. 8:34.“ Zwei Tage vorher.' }] },
    ] },
  ],

  // ---------- 2 · Montag 8:00: Mathe – 20 Sekunden aus der Zukunft, dann der eigene Zettel ----------
  n4_ampelStart: [
    ['lenning', '(schreibt an die Tafel) Mittwoch, 8:20: Test. Acht Aufgaben. Die Handys bleiben in der Tasche.'],
    ['jo', '(laut, nach hinten) {Hl} schreibt eh ab. Weiß jeder.'],
    ['lenning', 'Jo. Noch ein Wort, und du sitzt Mittwoch ganz vorne.'],
    ['erzaehler', 'Du schaust auf das Datum. Und auf einmal ist es Mittwoch.'],
    { szene: 'test', id: 'k4Voraus', def: () => VORAUS4,
      ausgang: (r, m) => { m.k4VorausSkills = r.skills || []; m.k4VorausKopfRot = !!r.kopfRot; m.k4VorausRot = (r.max || 0) >= 70; return 'ok'; }, folgen: { ok: {} } },
    { blende: 'Montag · 8:02 · noch zwei Tage' },
    { tu: 'n4_zettel' },
    { wenn: (m) => (m.k4Plan || {}).zu === 'kaya', dann: [['kaya', '(an der Tür, im Vorbeigehen) Tür ist offen. Auch Mittwoch.']] },
  ],
  // ---------- 3 · Montag 9:50: Pause im Frost ----------
  n4_hofStart: [
    ['erzaehler', 'Pause. Der Hof ist eine einzige Eisfläche. Wer läuft, rutscht. Wer rutscht, lacht.'],
    { foto: 'k4Hof', von: [0.4, 2.4, 4.6], auf: [3.0, 1.0, 13.6], fov: 58 },
    { szene: 'orte', id: 'pauseOrt4', pruefe: false,
      def: { titel: 'Pause im Frost · 9:50', info: 'Mittwoch ist Mathe-Test. Du kannst nur an einem Ort sein.',
        orte: [
          { id: 'chiara', sy: '🗂', name: 'Chiara', wer: 'Will abgefragt werden. Jetzt.', bild: { wer: 'chiara', von: [1.6, 1.6, 2.2], auf: [0, 1.2, 0], fov: 46 } },
          { id: 'eis', sy: '🧊', name: 'Eisrutsche', wer: 'Ben und Yusuf. Hofrekord.', bild: { wer: 'ben', von: [-3.0, 2.0, -2.6], auf: [1.0, 0.8, 0.6], fov: 52 } },
          { id: 'mila', sy: '🎧', name: 'Mila', wer: 'Am Geländer. Die Hände auf dem Eis.', bild: { wer: 'mila', von: [1.6, 1.4, 1.8], auf: [0, 0.9, 0], fov: 44 } },
          { id: 'lina', sy: '🚪', name: 'Lina', wer: 'Drinnen, an der Tür von 1.04.', bild: { wer: 'lina', von: [1.4, 1.6, -1.8], auf: [0, 1.2, 0], fov: 46 } },
        ] },
      ausgang: (r) => r.ort,
      folgen: { chiara: { merke: 'pause4Chiara', dann: [{ tu: 'n4_ort', mit: 'chiara' }] }, eis: { merke: 'pause4Eis', dann: [{ tu: 'n4_ort', mit: 'ben' }] }, mila: { merke: 'pause4Mila', dann: [{ tu: 'n4_ort', mit: 'mila' }] }, lina: { merke: 'pause4Lina', dann: [{ tu: 'n4_ort', mit: 'lina' }] } } },
    ['erzaehler', 'Es klingelt. Im Eis bleiben Rutschspuren. Mittwoch ist in zwei Tagen.'],
  ],
  n4_chiara: [
    ['chiara', '(hält dir einen Stapel Karteikarten hin) Fragst du mich ab? Bitte. Nur drei.'],
    { wahl: [
      { t: '(Abfragen.)', dann: [
        ['du', 'Dreieinhalb Kilometer. Wie viele Meter?'], ['chiara', 'Dreitausendfünfhundert.'],
        ['du', 'Morgens minus vier Grad, mittags plus drei. Wie viel wärmer?'], ['chiara', 'Ein … nein. Sieben. Sieben Grad.'],
        ['du', 'Ein Rechteck, sechs mal vier Meter. Die Fläche?'], ['chiara', '(starrt auf die Karte) … Ich weiß das. Ich weiß das doch. Warum ist das jetzt weg?'],
        ['erzaehler', 'Die Karten in ihrer Hand zittern ein bisschen. Nicht wegen der Kälte.'],
        { wahl: [
          { t: '„Zwei von drei. Die dritte kommt.“', merke: 'chiaraGestaerkt', herz: { chiara: 2 }, dann: [['chiara', '(atmet aus) … Vierundzwanzig. Quadratmeter. Siehst du. Da ist sie.']] },
          { t: '„Füße fest auf den Boden. Nochmal.“', merke: 'chiaraFuesse', herz: { chiara: 2 }, staerke: 'atmen', dann: [['chiara', '(drückt die Füße in den Schnee) … Vierundzwanzig. Okay. Komisch. Das hilft.']] },
          { t: '„Ist doch easy. Lern halt.“', merke: 'chiaraEasy', herz: { chiara: -1 }, dann: [['chiara', '(packt die Karten weg) Für dich vielleicht.']] },
        ] }] },
      { t: '„Später, okay?“', merke: 'chiaraSpaeter', dann: [['chiara', 'Klar. Später.'], ['erzaehler', 'Sie fragt Noah. Noah weiß es auch nicht.']] },
    ] },
  ],
  n4_eis: [
    ['ben', '(rutscht an dir vorbei, Arme ausgebreitet) Achtung! Keine Bremsen!'],
    ['yusuf', 'Drei Meter zwanzig! Hofrekord! Du bist dran.'],
    { wahl: [
      { t: '(Anlauf. Rutschen.)', merke: 'k4Gerutscht', herz: { ben: 1, yusuf: 1 }, dann: [{ szene: 'rutsche', id: 'k4Rutsche', pruefe: false, def: { rekord: 3.2, rekordVon: 'Yusuf' },
        ausgang: (r, m) => { m.k4Rutsch = r.best || 0; m.eisMeter = (m.eisMeter || 0) + (r.best || 0); return (r.best || 0) > 3.2 ? 'rekord' : 'nicht'; },
        folgen: { rekord: { merke: 'k4Hofrekord', dann: [['yusuf', 'NEIN! Nochmal! Das zählt nicht!']] }, nicht: { dann: [['ben', '(lacht) Gut gelandet. Fast.']] } } }] },
      { t: '„Ich schau lieber zu.“', dann: [['ben', 'Feigling. (grinst) Nur Spaß.']] },
    ] },
  ],
  n4_mila: [
    ['erzaehler', 'Mila steht am Geländer. Beide Hände auf dem eiskalten Metall. Die Augen zu.'],
    { wahl: [
      { t: '„Ist dir nicht kalt?“', merke: 'k4MilaPlan', herz: { mila: 2 }, dann: [
        ['mila', '(macht die Augen auf) Doch. Darum.'],
        ['mila', 'Bei Rot mach ich das. Kalt. Dann geht’s.'],
        { wenn: (m) => !!(m.k4Plan && m.k4Plan.rot && m.k4Plan.rot !== 'kalt'), dann: [
          { wahl: [
            { t: '(Plan ändern: Bei Rot – Kälte.)', merke: 'k4PlanGeaendert', dann: [{ tu: 'n4_rot_kalt' }, { tu: 'n4_planKarte' }, ['mila', 'Zählt nur, wenn’s bei dir wirkt. Probier’s.']] },
            { t: '(Plan lassen.)', merke: 'k4PlanGelassen', dann: [['mila', 'Auch gut. Ist dein Plan.']] },
          ] }] }] },
      { t: '(Hände daneben legen.)', merke: 'k4MilaKalt', herz: { mila: 1 },
        dann: [['erzaehler', 'Das Metall brennt vor Kälte. Nach zehn Sekunden ist dein Kopf leiser.'], ['mila', '(ohne hinzuschauen) Siehst du.']] },
    ] },
  ],
  // Lina hat schon gezoomt (Handy-Karte statt Suchbild). Abreißen stört den Täter – er klebt am Mittwoch neu. Lassen: Lina behält ihn im Blick.
  n4_lina: [
    { foto: 'auchTuer4', von: [-20.7, 1.35, -16.6], auf: [-21.4, 1.1, -18.0], fov: 36 },
    ['lina', '(an der Tür von 1.04, hält dir ihr Handy hin) Ich hab gezoomt. Guck aufs Glas.'],
    { handy: { wer: 'Linas Handy · Zoom 4×', wann: '9:54', fotoId: 'auchTuer4', text: 'Am Türglas: ein gelber Zettel. In der Mitte ein rundes Loch.' } },
    ['lina', 'Wer klebt einen Zettel mit Loch an eine Tür?'],
    { wahl: [
      { t: '(Abfotografieren.)', merke: 'spurZettel', staerke: 'lesen',
        dann: [{ beweis: 'k4Zettel', t: 'Am Türglas von 1.04: gelber Zettel, rundes Loch. Montag, 9:54.' }, ['lina', 'Schick mir das. Bitte.']] },
      { t: '(Abreißen.)', merke: 'k4ZettelWeg', dann: [['erzaehler', 'Du ziehst ihn ab. Darunter: nur Glas.'], ['lina', '(leise) Jetzt weiß er: Wir haben ihn gesehen.']] },
      { t: '(Lassen.)', merke: 'k4ZettelLassen', dann: [['lina', 'Okay. Ich schau, wer wiederkommt.']] },
    ] },
    { handy: null },
    { bemerke: 'zettelLoch' },
  ],
  // ---------- 4 · Mittwoch 8:20: der Test ----------
  n4_test: [
    ['lenning', 'Testordnung. Einer pro Tisch. Handys aus, in die Tasche. Jo, du nach vorne.'],
    ['jo', 'Wieso immer ich?'],
    ['lenning', 'Darum. {name}, hinten links. An der Tür.'],
    ['erzaehler', 'Ein paar drehen sich um. Jemand grinst.'],
    { tu: 'n4_setzenTest' },
    ['lenning', 'Acht Aufgaben. Ihr habt bis 8:37.'],
    { foto: 'auchChiara4', von: [-22.6, 1.5, -21.6], auf: [-20.05, 0.95, -19.78], fov: 40 },
    { wenn: (m) => !!m.k4Plan, dann: [['erzaehler', 'Unter dem Blatt liegt dein Ampelplan. Drei Zeilen. Nur du weißt, was draufsteht.']] },
    { szene: 'test', id: 'k4Test', def: (m) => TEST4(m),
      ausgang: (r, m) => {
        m.k4TestRichtig = r.richtig; m.k4TestMax = r.max; m.k4Geparkt = r.geparkt || 0; m.k4Aufgeschaut = r.blickZeit || 0;
        const g = r.gesehen || [];
        if (g.includes('kenanGesehen')) m.kenanGesehen = true;
        if (g.includes('kenanKlebt')) { m.kenanGesehen = true; m.kenanKlebt = true; }
        m.k4BlitzGesehen = g.includes('blitzTuer'); m.k4NoahZurueckGesehen = g.includes('noahZurueck'); m.k4NoahRausGesehen = g.includes('noahRaus');
        m.k4NoahGeblieben = g.includes('noahBleib'); if (m.k4DarioGefragt && !m.k4NoahGeblieben) m.k4NoahRausGesehen = true;
        m.k4TestEnde = r.ende || 0; m.k4Ermahnt = !!r.ermahnt; m.k4Blicke = r.blicke || 0; m.k4Beantwortet = r.beantwortet || 0;
        if (r.notbremse) m.k4Notbremse = true; if (r.kopfRot) m.k4KopfRot = true;
        m.k4TestSkills = (r.skills || []).length;
        return r.richtig >= 6 ? 'gut' : r.richtig >= 4 ? 'mittel' : 'schwach';
      }, folgen: { gut: {}, mittel: {}, schwach: {} } },
    { foto: 'k4Foto834', von: [-21.5, 1.42, -17.75], auf: [-17.95, 1.1, -19.78], fov: 34 },   // durch das Glas der geschlossenen Tür
    { foto: 'k4Blatt', wer: 'du', von: [0.55, 1.85, 0.35], auf: [-0.55, 0.76, 0], fov: 46 },
    ['lenning', 'Stifte weg. Blätter nach vorne.'],
    { tu: 'n4_testEnde' },
    { tu: 'n4_testBeweise' },
  ],

  // ---------- 5 · Mittwoch 9:50: das Foto von 8:34 – drei Wellen ----------
  n4_foto: [
    ['erzaehler', 'Pause. Überall im Hof summen Handys. Alle gleichzeitig.'],
    ['jo', '(hält sein Handy hoch) Leute. LEUTE. Guckt euch das an.'],
    { handy: { wer: '@annexe.cam', wann: 'gerade eben', fotoId: 'k4Foto834', kreis: { x: 50, y: 50, r: 15 }, gruen: true,
      alt: 'Die Klasse beim Test, durch das Türglas fotografiert. Um deinen Kopf ist mit dem Finger ein zittriger Kreis gemalt.', text: '„wer spickt? hinten links.“ · 8:34 · 74 Reaktionen' } },
    ['jo', '(liest laut vor) „Wer spickt? Hinten links.“'],
    { handy: null },
    { tu: 'n4_fotoStart' },
    // Welle 1: Jo
    ['jo', 'Hinten links. Wer sitzt da noch mal? … Ach.'],
    ['erzaehler', 'Er dreht sich zu dir. Ein paar lachen. Nicht laut. Aber genug.'],
    { tu: 'n4_welle' },
    { wahl: WELLE(1) },
    // Welle 2: Luca und Kenan von der Skate-Ecke
    { wenn: (m) => !m.k4WellenEnde, dann: [
      { hin: { luca: [-0.6, 16.4, 2.6], kenan: [0.8, 17.2, 3.0] } },
      ['luca', '(von hinten, laut) Ey, 7P2! Ist das der Spicker? Mit dem Kreis?'],
      ['kenan', '(grinst) Wie viele Punkte hast du geklaut?'],
      ['luca', 'Respekt. Bei Lenning.'],
      { tu: 'n4_welle' },
      { wahl: WELLE(2) },
    ] },
    // Statt einer dritten Welle: Wer auf deinem Plan steht, sieht den Kreis – und kommt
    { wenn: (m) => !m.k4WellenEnde, dann: [{ tu: 'n4_werKommt' }] },
    { tu: 'n4_wellenSchluss' },
    { pult: null },
    { sicht: (m) => ({ wer: 'jo', auf: 'du', gedanken: [
      'Mittwoch, 8:36. Mein Blatt: drei Aufgaben. Von acht. Der Rest ist weiß.',
      m.k4Wut ? '„Du gibst selbst leer ab.“ Woher weiß der das? Haben das alle gesehen?' : m.k4JoMontag ? 'Montag hab ich’s gesagt. Jetzt steht’s da. Als hätte ich’s gewusst.' : 'Alle lachen. Gut. Lachen ist gut.',
      'Solange alle über hinten links reden, fragt keiner nach mir.'] }) },
    { tu: 'n4_fotoFolge' },
    // Heft #03, Stunde 1: Wie hoch war ich? Selbst schätzen – die Messung steht nur in der Chronik (Gefühl und Messung vergleichen)
    ['mila', '(später, leise. Hält sieben Finger hoch.) So war ich. Beim Foto. Du?'],
    { fest: true, wahl: [
      { t: '(Drei Finger.)', merke: 'k4Gefuehlt30', dann: [{ wenn: (m) => (m.k4Hoch || 0) >= 7, dann: [['mila', 'Drei? Echt? Du warst ganz still. Und ganz weiß.']], sonst: [{ wenn: (m) => (m.k4Hoch || 0) >= 5, dann: [['mila', 'Drei? Du warst ganz still. Still ist oft Gelb.']], sonst: [['mila', 'Drei. Okay.']] }] }] },
      { t: '(Sechs.)', merke: 'k4Gefuehlt60', dann: [['mila', 'Sechs. Fast wie ich.']] },
      { t: '(Zehn.)', merke: 'k4Gefuehlt80', dann: [['mila', '(lässt die Hand sinken) Zehn. … Und jetzt?'], ['du', 'Sechs. Vielleicht.']] },
      { t: '(Schulter zucken.)', merke: 'k4GefuehltWeiss', dann: [['mila', 'Okay. Musst du nicht wissen.']] },
    ] },
    { wenn: (m) => !!m.k4Niemand, dann: [['mila', '(leise) Ich hätte dich geholt. Wusste nicht, ob du willst.'], ['mila', 'Oben ist das SePAS. Die Tür ist offen.']] },
    { wenn: (m) => !!(m.k4ZaehlenRot || m.k4ParkenRot || m.k4Niemand), dann: [['mila', 'Willst du was tauschen? Auf deinem Zettel.'], { wahl: [
      { t: '„Rot: Kälte.“', wenn: (m) => !!(m.k4ZaehlenRot || m.k4ParkenRot), merke: ['k4PlanGetauscht', 'k4PlanGeaendert'], dann: [{ tu: 'n4_rot_kalt' }, { tu: 'n4_planKarte' }, ['mila', 'Probier’s Freitag. Zählt nur, wenn’s bei dir wirkt.']] },
      { t: '„Rot: 4 ein, 8 aus.“', wenn: (m) => !!(m.k4ZaehlenRot || m.k4ParkenRot), merke: ['k4PlanGetauscht', 'k4PlanGeaendert'], dann: [{ tu: 'n4_rot_atmen' }, { tu: 'n4_planKarte' }, ['mila', 'Probier’s Freitag. Zählt nur, wenn’s bei dir wirkt.']] },
      { t: '„Schreib dich drauf.“', wenn: (m) => !!m.k4Niemand, merke: ['k4PlanGetauscht', 'k4MilaDrauf'], dann: [{ tu: 'n4_zu_mila' }, { tu: 'n4_planKarte' }, ['mila', '(schreibt „Mila“ in deine Ecke) So.']] },
      { t: '(Lassen.)', merke: 'k4PlanGelassen', dann: [['mila', 'Okay. Dein Zettel.']] },
    ] }] },
  ],

  // ---------- Donnerstag (freiwillig): Skills-Stunde ----------
  n4_skills: [
    ['erzaehler', 'Donnerstag. Aula. Gestern war das Foto. Heute redet keiner laut.'],
    { szene: 'skillsStunde', id: 's4_regulieren', def: S4_REGULIEREN, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'ruhig', merke: 's4Regulieren' }, weiter: { merke: 's4Regulieren' } } },
    ['kaya', 'Wer hat gestern seinen Plan gebraucht? Keine Antwort laut. Nur für euch.'],
    { szene: 'stempel', def: { modul: 'Modul 3 · Gefühle regulieren', titel: 'Bremsen gelernt',
      gelernt: ['Grün, Gelb und Rot am eigenen Körper erkannt', 'Ausprobiert, was bei mir wie viel senkt', 'Auf Rot wirkt nur der Körper: atmen, Kälte, Bewegung', 'Einen eigenen Ampelplan gebaut'],
      mission: 'Probier deinen Plan einmal in echt aus. Wie viel hat er gebracht?' }, folgen: {} },
  ],

  // ---------- 6 · Freitag 12:05: Tests zurück, dann Schnee ----------
  n4_schnee: [
    ['erzaehler', 'Freitag, vor dem Mittag. Mme Lenning steht an der Hoftür. Den Stapel Tests im Arm.'],
    ['lenning', '{name}. Kommst du kurz?'],
    ['erzaehler', 'Hinten links muss nach vorn. Alle schauen.'],
    { tu: 'n4_nachVorne' },
    ['ben', '(hinter dir, reißt Jo das gefaltete Blatt aus der Hand) Zeig mal! Wie viele? … Eins von acht!'],
    { wenn: (m) => !!m.k4Wut, dann: [['ben', 'Leer abgegeben, Jo? Hat {name} doch gesagt!']] },
    { szene: 'stoerung', id: 'k4JoBlatt', pruefe: false,
      def: { bild: { wer: 'jo', von: [1.6, 1.6, 1.8], auf: [0, 1.2, 0], fov: 44 }, t: 'Ben hält Jos Blatt hoch. Jo greift danach. Zu langsam.', hin: 'Zu Jo', bleib: 'Bei Lenning bleiben', zeit: 6 },
      ausgang: (r) => (r.hin ? 'hin' : 'bleib'),
      folgen: { hin: { dann: [{ wahl: [
          { t: '„Gib’s ihm zurück.“', merke: 'k4JoBlattZurueck', herz: { jo: 2 }, staerke: 'mut', dann: [['ben', 'War nur Spaß.'], ['erzaehler', 'Ben gibt es zurück. Jo steckt es weg. Er schaut dich kurz an.']] },
          { t: '„Eins? Echt?“', merke: 'k4JoBlattGelacht', herz: { jo: -2 }, dann: [['jo', '(reißt das Blatt zurück) Halt die Klappe.'], ['erzaehler', 'Ein paar lachen. Diesmal über Jo.']] },
        ] }] },
        bleib: { merke: 'k4JoBlattWeg', dann: [['lenning', '(laut) Ben. Zurück. Sofort.'], ['erzaehler', 'Jo hat sein Blatt wieder. Er schaut weg.']] } } },
    ['ben', 'Genug Zahlen. SCHNEE!'],
    ['yusuf', 'Die 7P1 hat schon einen Wall. Los, hinter unseren!'],
    { tu: 'n4_wall' },
    { szene: 'schneeball', id: 'k4Schneeball',
      def: (m) => ({ wo: 'Hof', zeit: 30, team: [F.ben, F.yusuf, ...(m.k4NoahVerteidigt || m.k4NoahHalb ? [F.noah] : []), ...(m.k4JoBlattZurueck ? [F.jo] : [])],
        schutz: m.k4NoahVerteidigt ? ['Noah'] : [],
        gegen: m.k4JoBlattGelacht ? 'Jo' : '',
        ruf: !m.k4JoBlattZurueck && !m.k4JoBlattGelacht ? { bei: 10, dauer: 4, t: 'Jo steht ohne Wall. Die 7P1 zielt auf ihn.', knopf: '📣 Jo! Hier!', wer: F.jo, danach: 'Jo rennt rüber. Du stehst kurz ohne Deckung.', sonst: 'Die 7P1 trifft Jo. Zweimal. Keiner ruft ihn.' } : null,
        gegner: [{ name: 'Dario', farbe: '#d9693f' }, { name: 'Tom', farbe: '#8e44ad' }, { name: 'Lea', farbe: '#16a085' }, { name: 'Sami', farbe: '#7b8794' }] }),
      ausgang: (r, m) => { m.k4SchneeTreffer = r.treffer || 0; m.k4SchneeStand = (r.stand || [0, 0]).join(' : '); m.k4SchneeSieg = (r.stand || [0, 0])[0] >= (r.stand || [0, 0])[1]; if (r.ruf) m.k4JoGerufen = true; else if (r.rufDa) m.k4JoAllein = true; return (r.stand || [0, 0])[0] >= (r.stand || [0, 0])[1] ? 'sieg' : 'knapp'; },
      folgen: { sieg: {}, knapp: {} } },
    { foto: 'k4Schnee', von: [1.0, 1.7, 9.4], auf: [0.4, 1.1, 15.6], fov: 60 },
    { tu: 'n4_schneeFolge' },
  ],

  // ---------- 7 · Freitag 15:40: Haltestelle ----------
  n4_freitag: [
    ['erzaehler', 'Freitag, 15:40. Letzter Bus vor den Ferien.'],
    { hin: { dario: 'du' } },
    ['dario', '(blass) Hey.'],
    // Wer Lina den Zettel beobachten ließ: Ihre Nachricht kommt, während Dario neben dir steht. Am Montag hielt er dir sein Handy hin – jetzt hältst du deins.
    { wenn: (m) => !!m.k4ZettelLassen, dann: [
      { handy: { wer: 'Lina', wann: '15:41', chat: [{ wer: 'Lina', t: 'der zettel hängt noch. 1.04.' }] } },
      ['erzaehler', 'Dario steht direkt neben dir. Er sieht dein Display.'],
      { wahl: [
        { t: '(Handy wegdrehen.)', merke: 'k4HandyWeg', dann: [{ handy: null }, ['dario', '(schaut auf die Straße) … Schon gut.']] },
        { t: '(Dario zeigen.)', merke: 'k4DarioGezeigt', staerke: 'mut', dann: [{ handy: null }, ['erzaehler', 'Dario liest. Er wird noch blasser.']] },
        { t: '„Kennst du den Zettel?“', merke: 'k4DarioZettel', staerke: 'lesen', dann: [{ handy: null }, ['dario', '(zu schnell) Nein. Was für ein Zettel? Der gelbe?'], ['erzaehler', 'Von „gelb“ stand da nichts.']] },
      ] }] },
    ['dario', 'Das mit 8:34 … das war zu viel.'],
    { wenn: (m) => !!(m.k4DarioOkay || m.k4DarioGefragt), dann: [['dario', '(leise) Du hast Montag gefragt. Sonst keiner.']], sonst: [{ wenn: (m) => !!m.k4NichtGeschaut, dann: [['dario', '(leise) Du hast nicht geguckt. Montag. Oder?']], sonst: [['erzaehler', 'Er sagt es mehr zu sich selbst als zu dir.']] }] },
    { wahl: [
      { t: '„Du wusstest es schon Montag.“', wenn: (m) => !!m.k4DarioGefragt, merke: 'k4DarioWoher', staerke: 'mut',
        dann: [['dario', '(lange still) Ich wusste, dass was kommt. Um 8:34. Nicht, dass es dich trifft.'], ['dario', 'Ich wollte nur nicht, dass du im Gang bist. Dann hätten sie dich.'],
          ['erzaehler', 'Der Bus kommt. Dario steigt ein, ohne sich umzudrehen.']] },
      { t: '„Was heißt ‚zu viel‘?“', merke: 'k4DarioFrage', dann: [['dario', 'Nichts. Vergiss es. … Schöne Ferien.'], ['erzaehler', 'Er setzt sich ganz nach hinten. Er schaut die ganze Fahrt aus dem Fenster.']] },
      { t: '(Neben ihm stehen bleiben. Nichts fragen.)', merke: 'k4DarioDa', herz: { dario: 1 }, dann: [['erzaehler', 'Ihr steht da. Euer Atem macht Wölkchen. Seine werden langsamer.'], ['dario', '(leise) Danke.']] },
    ] },
    { blende: 'Ferien' },
    ['erzaehler', 'Zwei Wochen lang postet @annexe.cam nichts. Am letzten Ferientag, 21:00, eine Umfrage: „wer ist eigentlich der admin? 🤔“'],
    { tu: 'kapitelEnde' },
  ],
};

// ---------- Rückblick in Bildern (Kapitelende, Lehrer-Ansicht) ----------
const TAT = { explodiert: 'Du bist explodiert. Jemand hat gefilmt.', lenning: 'Du bist zu Mme Lenning gegangen.', foto: 'Du hast allen gezeigt: Das Foto ist von draußen.',
  brunnen: 'Du bist zum Brunnen gegangen. Kaltes Wasser.', rennen: 'Du bist gerannt. Einmal ums Gebäude.', atmen: 'Du bist stehen geblieben und hast geatmet. Bis es klingelte.',
  worte: 'Du hast mit Worten zurückgeschlagen.', atmenWorte: 'Erst hast du geatmet. Dann kamen doch die Worte.', atmenHalb: 'Du hast geatmet. Dann hat es geklingelt.', sauer: 'Saurer Drops. Du bist geblieben.', mila: 'Du bist zu Mila gegangen. Sie hat Platz gemacht.',
  kaya: 'Du bist zu Herrn Kuedes gegangen. Die Tür war offen.', zaehlen: 'Du hast gezählt. Auf Rot kam nichts an.', kopfGelb: 'Auf Gelb hat dein Kopf-Werkzeug gewirkt. Du bist geblieben.' };
// Das erste Körpersignal aus Kapitel 3 (Wort-Leiter) steht oben auf dem Zettel – Heft #02 und #03 hängen zusammen
const SIGNAL4 = (m) => (m.k3SignalHals ? 'Hals' : m.k3SignalBauch ? 'Bauch' : m.k3SignalHaende ? 'Hände' : '');
const werkzeugName = (id) => (WERKZEUGE4[id] ? WERKZEUGE4[id].sy + ' ' + WERKZEUGE4[id].t : '–');
export const RUECKBLICK_N4 = (m, S) => {
  const plan = m.k4Plan || {}, hoch = m.k4Hoch || 0;
  return [
    { id: 'k4Plan', titel: 'Dein Ampelplan', text: plan.rot ? 'Rot: ' + werkzeugName(plan.rot) + '. Gelb: ' + werkzeugName(plan.gelb) + '. Zu: ' + (ZU4[plan.zu] || 'niemandem') + '.' : 'Kein eigener Zettel.' },
    { id: 'k4Blatt', titel: 'Dein Blatt im Test', text: (m.k4TestRichtig != null ? m.k4TestRichtig + ' von 8 richtig. ' : '') + ((m.k4TestMax || 0) >= 70 ? 'Zwischendurch Rot.' : 'Angespannt, aber nicht auf Rot.') + (m.k4Notbremse ? ' Du hast die Notbremse gezogen.' : '') + (m.k4Aufgeschaut ? ' Aufgeschaut: ' + m.k4Aufgeschaut + ' Sekunden.' : '') },
    { id: 'k4Foto834', titel: 'Das Foto von 8:34', text: m.spurGruen ? '„wer spickt? hinten links.“ Der Blitz kam von der Tür. Das Foto ist von draußen.' : '„wer spickt? hinten links.“ Ein Kreis um deinen Kopf.' },
    { id: 'k4Hoch', titel: hoch >= 7 ? 'Beim Foto: Rot-Modus' : hoch >= 3 ? 'Beim Foto: angespannt' : 'Beim Foto: ruhig', text: TAT[m.k4HochTat] || 'Es hat geklingelt.' },
    !(S && S.bemerkt && S.bemerkt.zettelLoch) ? { id: 'auchTuer4', titel: 'Das war auch', text: 'Am Montag klebte am Türglas von 1.04 ein gelber Zettel. Mit einem Loch, so groß wie eine Linse. Auf Sitzhöhe.', auch: true }
      : { id: 'auchChiara4', titel: 'Das war auch', text: 'Chiara, am Tisch vor dir. Bei Aufgabe drei hat sie zehn Sekunden lang nicht geatmet.', auch: true },
    { id: 'k4Schnee', titel: 'Schnee', text: 'Schneeballschlacht. ' + (m.k4SchneeStand ? '7P2 gegen 7P1: ' + m.k4SchneeStand + '.' : '') + (m.k4SchneeTreffer ? ' Deine Treffer: ' + m.k4SchneeTreffer + '.' : '') },
  ].filter(Boolean);
};

// ---------- TUN für Kapitel 4 (in spiel.js eingehängt: tunN4) ----------
const zoneVon = (w) => (w >= 7 ? 'rot' : w >= 3 ? 'gelb' : 'gruen');   // Heft #03: Gelb ab 30
export const tunN4 = (c) => {
  const M = () => c.S.merke, W = () => (c.S.pult && c.S.pult.w) || 0;
  const ende = () => { M().k4WellenEnde = true; };
  const T = {
    // Pause = ein Ort: das Gespräch am Ort (Jos Satz kam schon Montag in Mathe – vor allen)
    n4_ort: (pa) => {
      const id = pa && pa.id, G = { chiara: 'n4_chiara', ben: 'n4_eis', mila: 'n4_mila', lina: 'n4_lina' }[id];
      const hin = { chiara: [-2.0, 11.6, -2.4], ben: [8.2, 15.0, 1.2], mila: [-13.2, 11.4, -2.0], lina: [-20.8, -16.4, Math.PI] }[id];
      return [...(hin ? [{ hin: { du: hin } }] : []), ...(GESPRAECHE_N4[G] || [])];
    },
    // Montag nach der Vorausblende: der eigene Zettel. Oben steht, was du eben selbst ausprobiert hast – ohne Etiketten.
    n4_zettel: () => {
      const m = M(), probiert = (m.k4VorausSkills || []).filter((id) => WERKZEUGE4[id]);
      m.k4Wirkung = {}; probiert.forEach((id) => { m.k4Wirkung[id] = true; }); m.k4Probiert = probiert.length; m.k4Plan = {};
      const rot = [...new Set([...probiert, 'atmen', 'kalt', 'zaehlen'])].slice(0, 3);
      const sig = SIGNAL4(m);
      return [['erzaehler', 'Noch ist Montag. Dein Herz klopft trotzdem. Du nimmst einen kleinen Zettel.'],
        ...(sig ? [['du', '(schreibt oben hin) Mein erstes Signal: ' + sig + '.']] : []),
        ['du', '(schreibt) Bei Rot …'], { wahl: rot.map((id) => ({ t: werkzeugName(id), dann: [{ tu: 'n4_rot_' + id }] })) },
        ['du', '(schreibt) Bei Gelb …'], { tu: 'n4_gelbWahl' },
        ['du', '(schreibt) Bei Rot gehe ich zu …'],
        { wahl: [{ t: 'Mila', dann: [{ tu: 'n4_zu_mila' }] }, { t: 'Herrn Kuedes', dann: [{ tu: 'n4_zu_kaya' }] }, { t: 'Mme Lenning', dann: [{ tu: 'n4_zu_lenning' }] }, { t: 'Zu niemandem.', dann: [{ tu: 'n4_zu_keiner' }] }] },
        { tu: 'n4_planKarte' }];
    },
    n4_gelbWahl: () => { const m = M(), rot = (m.k4Plan || {}).rot, probiert = m.k4VorausSkills || [];
      const ids = [...new Set([...probiert.filter((id) => WERKZEUGE4[id]), 'parken', 'zaehlen', 'atmen', 'kalt'])].filter((id) => id !== rot).slice(0, 4);
      return [{ wahl: ids.map((id) => ({ t: werkzeugName(id), dann: [{ tu: 'n4_gelb_' + id }] })) }]; },
    n4_planKarte: () => {
      const S = c.S, m = M(), p = m.k4Plan || {};
      const sig = SIGNAL4(m);
      const karte = { kap: 4, titel: 'Mein Ampelplan', punkte: [...(sig ? ['Mein erstes Signal: ' + sig] : []), 'Bei Rot: ' + werkzeugName(p.rot), 'Bei Gelb: ' + werkzeugName(p.gelb), 'Bei Rot gehe ich zu: ' + (ZU4[p.zu] || 'niemandem'), 'Ausprobiert: Mittwoch, 8:33 – zwei Tage vorher.'] };
      S.skillsHeft = (S.skillsHeft || []).filter((x) => x.titel !== 'Mein Ampelplan').concat([karte]);
      c.ui.toast('<b>🚦 Dein Zettel</b><span>Rot: ' + werkzeugName(p.rot) + ' · Gelb: ' + werkzeugName(p.gelb) + ' · Zu: ' + (ZU4[p.zu] || '–') + '. Was draufsteht, hat später einen ★.</span>', 'ly-t-ent');
      return [];
    },
    // Mittwoch: Testordnung, hinten links
    n4_setzenTest: () => { M().k4TuerZu = true; c.setzen(-17.95, -19.78, -Math.PI / 2); return []; },   // Testordnung: Tür zu
    n4_testEnde: () => {
      const m = M(), z = []; m.k4TuerZu = false;
      if ((m.k4TestMax || 0) >= 90 && (m.k4TestRichtig || 0) < 5) z.push(['erzaehler', 'Ab der Hälfte ist alles verschwommen. Du weißt nicht mehr, was du hingeschrieben hast.']);
      else if ((m.k4TestMax || 0) >= 90) z.push(['erzaehler', 'Einmal war alles weg. Dann kam es wieder.']);
      else if (m.k4KopfRot) z.push(['erzaehler', 'Zählen auf Rot: nichts. Die Zahlen sind weggerutscht.']);
      if (m.kenanKlebt) c.ui.toast('<b>🔎 Spur</b><span>8:31: Kenan klebt einen neuen gelben Zettel ans Türglas.</span>', 'ly-t-ent');
      else if (m.kenanGesehen) c.ui.toast('<b>🔎 Spur</b><span>8:31: Kenan am Türglas. Mit einem gelben Zettel.</span>', 'ly-t-ent');
      return z;
    },
    // Was man beim Aufschauen gesehen hat, ist jetzt ein 📎 – dafür fehlten Sekunden im Test
    n4_testBeweise: () => {
      const m = M(), z = [];
      if (m.k4BlitzGesehen) z.push({ beweis: 'k4Blitz', t: '8:34: Der Blitz kam von der Tür. Durchs Glas – von draußen.' });
      if (m.k4NoahZurueckGesehen) z.push({ beweis: 'k4NoahZurueck', t: 'Um 8:33 kam Noah zurück. Um 8:34 saß er neben dir.' });
      if (m.kenanKlebt) z.push({ beweis: 'k4KenanKlebt', t: '8:31: Kenan klebt einen neuen gelben Zettel ans Türglas von 1.04.' });
      return z;
    },
    // Mittwoch 9:50: Start der Wellen. Wendung ohne gute Seite: Wer im Test schnell und gut war, wird eher verdächtigt.
    n4_fotoStart: () => {
      const m = M(), gut = (m.k4TestRichtig || 0) >= 6; m.k4Welle = 0; m.k4WellenEnde = false; m.k4Hoch = 0;
      const e = m.k4TestEnde || 0, z = [{ pult: { g: 'Scham', w: e >= 70 ? 6 : e >= 40 ? 4 : 3 } }];
      if (e >= 70) z.push(['du', '(denkt) Das Herz klopft noch vom Test. Und jetzt das.']);
      const fertigFrueh = gut && (m.k4Beantwortet || 0) >= 8;
      if (m.k4Ermahnt || m.k4NoahGeblieben) { m.k4Wendung = true; z.push(['jo', 'Lenning hat {hl} ermahnt. Alle haben’s gehört.'], { pult: { plus: 1 } }); }
      else if (m.k4Blicke >= 2) { m.k4Wendung = true; z.push(['chiara', '(leise zu Ben) {Hl} hat dauernd zur Tür geguckt. Ich saß davor.'], { pult: { plus: 1 } }); }
      else if (fertigFrueh) { m.k4Wendung = true; z.push(['chiara', '(leise zu Ben) {Hl} war als Erstes fertig. Komisch, oder?'], { pult: { plus: 1 } }); }
      return z;
    },
    n4_welle: () => { const m = M(); m.k4Welle = (m.k4Welle || 0) + 1; m.k4Hoch = Math.max(m.k4Hoch || 0, Math.min(10, W() + 2)); c.fotoAufDich('k4Hoch', 'jo'); return [{ pult: { plus: 2 } }]; },
    n4_worte: () => {
      const m = M(), w = W();
      if (w >= 7) {
        m.k4Explodiert = true; ende(); m.k4Hoch = Math.max(m.k4Hoch || 0, Math.min(10, w + 1));
        return [{ pult: { g: 'Wut', plus: 1 } }, ['erzaehler', 'Es kommt viel lauter raus, als du wolltest. Du schlägst Jo das Handy aus der Hand. Es fällt in den Schnee.'],
          ['jo', '(hebt es auf, ganz ruhig) Okay. Wow.'], ['erzaehler', 'Hinter dir lacht jemand. Ein anderes Handy ist oben. Es filmt. Schon die ganze Zeit.'], ['lenning', '(von weitem) Was ist da los?!']];
      }
      const n = m.k4Welle || 1;
      return [{ pult: { g: 'Wut', plus: -1 } }, ...(n === 1 ? [['erzaehler', 'Eine Sekunde ist es still. Jo lacht nicht mehr.'], ['jo', '(leise) Halt die Klappe.'], ['erzaehler', 'Ein paar lachen jetzt über Jo. Das fühlt sich gut an. Eine Sekunde lang.']]
        : n === 2 ? [['luca', 'Uuuh. Getroffen.'], ['erzaehler', 'Sie lachen. Nicht über dich. Aber auch nicht mit dir.']] : [['erzaehler', 'Ein paar schauen weg. Die meisten nicht.']])];
    },
    n4_brunnen: () => {
      const m = M(); m.k4Brunnen = true; ende(); c.teleport('brunnenNah');
      return [['erzaehler', 'Du gehst. Quer über den Hof zum Brunnen. Hände ins eiskalte Wasser.' + (planIst(m, 'kalt') ? ' Dein Plan. Er wirkt auch jetzt.' : '')], { pult: { plus: -3 } },
        ['mila', '(kommt dir nach) Gut, dass du gegangen bist. Bevor es knallt.']];
    },
    n4_rennen: () => { const m = M(); m.k4Gerannt = true; ende();
      return [['erzaehler', 'Du rennst. Einmal ums ganze Gebäude. Die kalte Luft brennt. Dein Plan.'], { pult: { plus: -3 } }, ['mila', '(als du zurück bist) Gut, dass du raus bist. Bevor es knallt.']]; },
    n4_sauer: () => { const m = M(), n = m.k4Welle || 1; m.k4Sauer = true;
      const z = [['erzaehler', 'Der Drops ist so sauer, dass dir die Augen tränen. Für zehn Sekunden ist dein ganzer Kopf nur im Mund.'], { pult: { plus: -3 } }, ['erzaehler', 'Dein Plan. Du bleibst stehen.']];
      if (n >= 2) { m.k4Ruhig = true; ende(); z.push(['erzaehler', 'Es klingelt. Du stehst noch da.']); }
      return z; },
    n4_atem: () => {
      const m = M(), n = m.k4Welle || 1, r = (c.S.sz && c.S.sz['k4AtemW' + n]) || {}, d = (r.gut || 0) >= 3 ? 3 : (r.gut || 0) >= 2 ? 2 : 1;
      m.k4Geatmet = true; m.k4AtemGut = (m.k4AtemGut || 0) + (r.gut || 0);
      const z = [{ pult: { plus: -d } }];
      if (planIst(m, 'atmen')) z.push(['erzaehler', 'Dein Plan. Vier ein. Acht aus.']);
      if (n >= 2 || (r.gut || 0) >= 3) { m.k4Ruhig = true; ende(); z.push(['erzaehler', 'Du bleibst stehen. Vier ein, acht aus. Bis es klingelt.'], ['mila', '(im Vorbeigehen, leise) Ich hab’s gesehen. Du bist geblieben.']); }
      else z.push(['erzaehler', 'Sie reden weiter. Du atmest weiter. Es kommen mehr dazu.']);
      return z;
    },
    n4_fotoZeigen: () => {
      const m = M(); m.k4FotoGezeigt = true; m.spurGruen = true; ende();
      return [['chiara', '(sofort) Stimmt! Ich hab mich umgedreht. Der Blitz war an der Tür.'],
        ['mila', '(nimmt Jo das Handy aus der Hand, zoomt) Dann ist das durchs Glas gemacht. Von draußen.'],
        { pult: { plus: -2 } }, ['ben', 'Und wer war um 8:34 im Gang?'],
        ...(m.k4NoahGeblieben ? [['erzaehler', 'Keiner sagt was. Noah schaut dich an. Er saß die ganze Zeit neben dir.'], ['noah', '(leise, nur zu dir) Das Flüstern. Das war wegen mir.']] : [['jo', '(sofort) Noah. Noah war doch aufm Klo. Um halb neun.'],
        ['erzaehler', 'Alle drehen sich um. Zu Noah.'], ['noah', '(leise) Ich … ich war um halb neun auf dem Klo. Ja.'],
        { wahl: [
          { t: '📎 „Um 8:34 saß Noah neben mir.“', beweis: 'k4NoahZurueck', merke: 'k4NoahVerteidigt', herz: { noah: 2 }, staerke: 'mut',
            dann: [['yusuf', 'Stimmt. Er kam rein, als Lenning „noch vier Minuten“ gesagt hat.'], ['erzaehler', 'Noah schaut dich an. Lange. Er sagt nichts. Er muss auch nichts sagen.'], ['jo', '(steckt das Handy weg) Dann halt keiner. Langweilig.']] },
          { t: '„Hör auf, Jo.“', merke: 'k4NoahHalb', herz: { noah: 1 },
            dann: [['jo', 'Was denn? Er war draußen. Frag ihn doch.'], ['erzaehler', 'Ein paar schauen weiter zu Noah. Weniger als vorher.']] },
          { t: '(Nichts sagen.)', merke: 'k4NoahVerdacht', herz: { noah: -1 },
            dann: [['erzaehler', 'Jetzt reden sie über Noah. Der Kreis um dich ist weg. Um ihn ist ein neuer.'], ['noah', '(geht rein. Obwohl noch Pause ist.)']] },
        ] }])];
    },
    // Dein Mensch für Rot (dritte Zeile des Zettels)
    n4_zuMila: () => { const m = M(); m.k4ZuPerson = 'mila'; ende();
      return [['erzaehler', 'Du gehst durch den Kreis. Zu Mila. Sie macht Platz neben sich.'], ['mila', '(leise) Bleib hier. Die gucken gleich woanders hin.'], { pult: { plus: -3 } }, ['erzaehler', 'Ihr steht da, bis es klingelt. Keiner kommt nach.']]; },
    n4_zuKaya: () => { const m = M(); m.k4ZuPerson = 'kaya'; ende();
      return [['erzaehler', 'Du gehst. Quer über den Hof, rein, die Treppe hoch. Die Tür vom SePAS ist offen.'], ['kaya', '(schaut hoch) Komm rein. Setz dich. Du musst nichts sagen.'], { pult: { plus: -4 } }, ['erzaehler', 'Du sagst trotzdem was. Herr Kuedes hört zu. Dann ruft er Mme Lenning an.']]; },
    // Kopf-Werkzeug als Rot-Plan: im Ernstfall merkt man selbst, dass es nicht ankommt
    // Kopf-Werkzeug: auf Gelb wirkt es, auf Rot rutscht es weg – und die Rückmeldung sagt, warum (die Farbe), nicht „bringt nichts“
    n4_zaehlenRot: () => { const m = M(), n = m.k4Welle || 1;
      if (W() < 7) { m.k4KopfGelb = true; const z = [['erzaehler', 'Hundert, dreiundneunzig, sechsundachtzig … Jo wird leiser. Dein Plan.'], { pult: { plus: -2 } }]; if (n >= 2) { m.k4Ruhig = true; ende(); z.push(['erzaehler', 'Du zählst weiter. Bis es klingelt.']); } return z; }
      m.k4ZaehlenRot = true; m.k4KopfRutscht = true; return [['erzaehler', 'Hundert, dreiundneunzig … die Zahlen rutschen weg. Auf Rot kommt der Kopf nicht ran. Erst der Körper.'], { pult: { plus: 1 } }]; },
    n4_parkenRot: () => { const m = M(), n = m.k4Welle || 1;
      if (W() < 7) { m.k4KopfGelb = true; const z = [['erzaehler', '„Nach der Pause.“ Der Gedanke wartet am Rand. Dein Plan.'], { pult: { plus: -2 } }]; if (n >= 2) { m.k4Ruhig = true; ende(); z.push(['erzaehler', 'Er wartet. Bis es klingelt.']); } return z; }
      m.k4ParkenRot = true; m.k4KopfRutscht = true; return [['erzaehler', 'Parken? Der Gedanke steht mitten im Hof. Auf Rot kommt der Kopf nicht ran. Erst der Körper.'], { pult: { plus: 1 } }]; },
    n4_kenan: () => {
      const m = M(), z = [['kenan', '(kurz ganz still) … Ich war aufm Klo. Wie die halbe Schule.']];
      if (m.spurZettel) { m.spurZettelKenan = true; z.push(['erzaehler', 'Gelb. Wie der Zettel mit dem Loch am Montag. An genau dieser Tür.']); }
      z.push(['luca', '(schaut Kenan an) Bro?'], ['kenan', 'Komm. Ist kalt.'], { hin: { luca: [-9.6, 24.4, 0.2], kenan: [-8.4, 25.2, 0.2] } }, ['erzaehler', 'Die beiden gehen. Kenan schaut nicht zurück.'], { pult: { plus: -1 } });
      return z;
    },
    n4_lenning: () => {
      const m = M(); m.k4LenningGeholt = true; ende();
      return [['erzaehler', 'Du gehst quer über den Hof. Zu Mme Lenning. Sie hat Aufsicht.'], ['du', 'Da ist ein Foto von mir. Aus dem Test. Da steht, ich spicke. Ich hab nicht gespickt.'],
        ['lenning', '(schaut lange aufs Handy) … Danke, dass du zu mir kommst. Ich schau mir deinen Test genau an. Heute noch.'], ['jo', '(von hinten, laut) Schleimer.'],
        ['lenning', '(dreht sich um) Handys. Alle. In die Kiste. Bis zum Ende der Pause.'], ['erzaehler', 'Stöhnen. Zwölf Handys in einer Kiste. Ein paar schauen dich an, als wärst du schuld.'], { pult: { plus: -2 } }];
    },
    n4_wellenSchluss: () => {
      const m = M();
      m.k4Hoch = Math.max(m.k4Hoch || 0, W());   // nur der Foto-Moment zählt (nicht das Vorstellen am Montag)
      m.k4HochTat = m.k4Explodiert ? 'explodiert' : m.k4LenningGeholt ? 'lenning' : m.k4ZuPerson === 'mila' ? 'mila' : m.k4ZuPerson === 'kaya' ? 'kaya' : m.k4FotoGezeigt ? 'foto' : m.k4Brunnen ? 'brunnen' : m.k4Gerannt ? 'rennen' : m.k4Ruhig && m.k4Sauer && !m.k4Geatmet ? 'sauer' : m.k4Ruhig && m.k4KopfGelb && !m.k4Geatmet ? 'kopfGelb' : m.k4Ruhig ? 'atmen' : m.k4Geatmet && (m.k4Wut || m.k4WutSpaet) ? 'atmenWorte' : m.k4Geatmet ? 'atmenHalb' : m.k4ZaehlenRot ? 'zaehlen' : m.k4Wut || m.k4WutSpaet ? 'worte' : m.k4ZuPerson === 'lenning' ? 'lenning' : '';
      return m.k4WellenEnde ? [] : [['erzaehler', 'Es klingelt. Das Foto ist auf zwölf Handys. Mindestens.']];
    },
    n4_fotoFolge: () => {
      const m = M();
      if (m.spurGruen) c.ui.toast('<b>🔎 Spur</b><span>Der Blitz kam von der Tür: Das Foto von 8:34 ist von draußen, durchs Glas.</span>', 'ly-t-ent');
      if (m.k4Explodiert) c.ui.toast('<b>📹 Gefilmt</b><span>Jemand hat gefilmt, wie du explodiert bist. Das kommt wieder.</span>', 'ly-t-ent');
      if (m.k4Wut && !m.k4Explodiert) c.ui.toast('<b>Jo merkt sich das.</b>', 'ly-t-merkt');
      return [];
    },
    // Freitag: Mme Lenning holt dich nach vorn. Was sie sagt, hängt davon ab, was du am Mittwoch gemacht hast. Dann der Parkschein.
    // Statt Welle 3: die Person vom Plan sieht den Kreis und kommt. Ohne Person: keiner kommt – Mila sagt es später.
    n4_werKommt: () => {
      const m = M(), zu = planZu(m); ende();
      const mit = (wer, satz, ort) => [[wer, satz], { wahl: [
        { t: '(Mitgehen.)', merke: 'k4Mitgegangen', dann: [{ pult: { plus: -3 } }, ['erzaehler', ort]] },
        { t: '(Bleiben.)', merke: 'k4Geblieben4', dann: [[wer, '(bleibt trotzdem neben dir stehen)']] },
      ] }];
      if (zu === 'mila') { m.k4ZuPerson = m.k4ZuPerson || 'mila'; return [['erzaehler', 'Mila sieht den Kreis. Sie kommt rüber.'], ...mit('mila', 'Komm. Geländer. Weg von denen.', 'Am Geländer ist die Luft kälter. Und leiser.')]; }
      if (zu === 'kaya') { m.k4ZuPerson = m.k4ZuPerson || 'kaya'; return [['erzaehler', 'Herr Kuedes kommt über den Hof. Er hat dich gesehen.'], ...mit('kaya', 'Kommst du kurz mit? Nur Luft.', 'Vor dem SePAS-Büro ist es still. Er fragt nichts.')]; }
      if (zu === 'lenning') { m.k4LenningGeholt = true; return [['erzaehler', 'Mme Lenning hat Aufsicht. Sie sieht den Kreis.'], ...mit('lenning', 'Alles gut? … Komm. Wir gehen rein.', 'Drinnen ist es warm. Sie sagt nur: „Ich schau mir deinen Test an.“')]; }
      m.k4Niemand = true;
      return [['erzaehler', 'Es klingelt. Keiner kommt.']];
    },
    n4_nachVorne: () => {
      const m = M(), r = m.k4TestRichtig || 0, z = [];
      if (m.k4LenningGeholt || m.k4ZuPerson === 'kaya') z.push(['lenning', '(leise) Ich hab nachgeschaut. Du hast nicht gespickt.'], ['lenning', 'Wer so ein Foto macht, ist schuld. Nicht du.']);
      else if (m.k4FotoGezeigt) z.push(['lenning', '(leise) Das mit der Tür hab ich gehört. Gut, dass du es gesagt hast.']);
      else z.push(['lenning', '(leise) Das Foto hab ich gesehen. Willst du was sagen?'], { wahl: [
        { t: '„Ich hab nicht gespickt.“', merke: 'k4LenningGesagt', staerke: 'mut', dann: [['lenning', 'Ich weiß. Ich hab nachgeschaut. Wer so ein Foto macht, ist schuld. Nicht du.']] },
        { t: '(Kopf schütteln.)', merke: 'k4LenningStill', dann: [['lenning', 'Okay. Meine Tür ist offen.']] },
      ] });
      z.push({ handy: { wer: 'Dein Test', wann: 'Freitag', text: r + ' von 8' + (r >= 6 ? ' · „Gut gemacht.“' : r >= 4 ? ' · „Da geht noch mehr.“' : ' · „Nach den Ferien: zu zweit.“') } },
        ['erzaehler', 'Du faltest das Blatt auf. ' + r + ' von 8.'], { handy: null });
      // Wer am Mittwoch Jo genannt hat: Ben fragt nach – war es Jo? (Gesagt ist nicht gemacht.)
      if (m.k4JoMontag) z.push(['ben', '(leise) War’s Jo? Das Foto?'], { wahl: [
        { t: '„Weiß ich nicht.“', merke: 'k4JoNichtBeschuldigt', staerke: 'lesen', dann: [['ben', 'Hm. Jo saß um 8:34 im Saal. Wie wir alle.']] },
        { t: '„Klar war’s Jo.“', merke: 'k4JoBeschuldigt', dann: [['ben', 'Jo saß um 8:34 im Saal. Zwei Reihen vor dir.'], ['erzaehler', 'Ben schaut dich an. Dann weg.']] },
      ] });
      // Parkschein (Heft #03): „nach dem Test“ ist jetzt. Wer geparkt hat, holt ihn ab – mit der Frage, die seitdem wartet.
      if ((m.k4Geparkt || 0) > 0 && r >= 4) z.push(['du', '(denkt) Geparkt im Test: „Ich kann das eh nicht.“ – ' + r + ' von 8.']);
      if ((m.k4Geparkt || 0) > 0) z.push(['du', '(denkt) Parkschein: „Nach dem Test.“ Das ist jetzt.'], { wahl: [
        { t: '„Wer war um 8:34 am Glas?“', merke: 'k4ParkscheinAbgeholt', staerke: 'hilfe', dann: [['lenning', '(schaut dich lange an) Gute Frage. Ich frag Herrn Kuedes.']] },
        { t: '(Nicht fragen.)', merke: 'k4ParkscheinLiegen', dann: [['du', '(denkt) Später. Vielleicht.']] },
      ] });
      // Chiara steht mit ihrem Blatt neben Mme Lenning
      if (m.chiaraSpaeter) z.push({ hin: { chiara: [0.4, 5.2, Math.PI] } }, ['chiara', '(hält dir ihr Blatt hin) Drei von acht. Du hast „später“ gesagt.'], { wahl: [
        { t: '„Sorry. Hab’s vergessen.“', merke: 'k4SpaeterSorry', dann: [['chiara', 'Ja. Hab ich gemerkt.']] },
        { t: '„Nach den Ferien. Versprochen.“', merke: 'k4SpaeterVersprochen', dann: [['chiara', 'Mal sehen.']] },
        { t: '(Karte nehmen. Abfragen.)', merke: 'k4SpaeterAbgefragt', herz: { chiara: 2 }, dann: [['du', 'Sechs mal vier?'], ['chiara', 'Vierundzwanzig. … Jetzt weiß ich’s.']] },
      ] });
      else if (m.chiaraGestaerkt || m.chiaraFuesse) z.push({ hin: { chiara: [0.4, 5.2, Math.PI] } }, ['chiara', 'Fünf von acht. Danke. Für Montag.'], ['chiara', '(gibt dir eine Karteikarte) Für dich. „Füße in den Boden.“']);
      else z.push({ hin: { chiara: [0.4, 5.2, Math.PI] } }, ['erzaehler', 'Neben dir: Chiara. Ihr Blatt hält sie mit der Schrift nach unten.'], { sicht: () => ({ wer: 'chiara', auf: 'du', gedanken: ['Mittwoch, 8:27. Aufgabe drei. Rechteck, sechs mal vier.', 'Die Zahlen schwimmen. Die Sechs sieht aus wie eine Acht.', 'Nichts. Ich schreib irgendwas hin. Hauptsache, da steht was.'] }) });
      return z;
    },
    n4_joMontag: () => { const m = M();
      return [['jo', '(zu schnell) Sagt doch jeder.'], ['erzaehler', 'Ein paar schauen jetzt Jo an. Nicht dich.'], { pult: { plus: -2 } }]; },
    n4_wall: () => { const m = M();
      if (m.k4JoBlattZurueck) return [['jo', '(ist schon hinter eurem Wall) Wegen vorhin.']];
      if (m.k4JoBlattGelacht) return [['erzaehler', 'Jo geht rüber. Zur 7P1. Er formt schon einen Ball.']];
      return [['erzaehler', 'Jo steht am Rand. Ohne Wall. Keiner sagt was.']]; },
    n4_schneeFolge: () => {
      const m = M(), z = [];
      z.push(['yusuf', m.k4SchneeSieg ? '(lacht) ' + m.k4SchneeStand + '! Ich hab mitgezählt!' : '(außer Atem) ' + m.k4SchneeStand + '. Nächstes Jahr drei Wälle.']);
      if (m.k4JoGerufen) z.push(['jo', '(hinter eurem Wall, nass bis zum Kragen) … Danke.']);
      else if (m.k4JoBlattZurueck) z.push(['jo', '(neben dir, außer Atem) Gut, dass du da warst. Vorhin.']);
      else if (m.k4JoBlattGelacht) z.push(['erzaehler', 'Jo hat für die 7P1 geworfen. Immer auf dich. Er hat nicht gegrinst.']);
      else if (m.k4JoAllein) z.push(['erzaehler', 'Jo geht als Erster rein. Nass. Allein.']);
      if (m.k4NoahVerteidigt) z.push(['noah', '(hinter dem Wall, außer Atem) Den einen hab ich gefangen. Wegen Mittwoch.']);
      else if (m.k4NoahHalb) z.push(['erzaehler', 'Noah wirft mit. Leise. Er bleibt in deiner Nähe.']);
      else if (m.k4NoahVerdacht) z.push(['erzaehler', 'Noah wirft nicht mit. Er steht am Rand. Seit Mittwoch reden sie über ihn.']);
      z.push(['erzaehler', 'Drüben bei der 7P1 lacht Dario. Laut. Zum ersten Mal diese Woche.']);
      return z;
    },
  };
  // Zettel festlegen: Rot, Gelb, zu wem. Kein Kommentar, keine Etiketten – ob es passt, zeigt der Mittwoch.
  for (const id of Object.keys(WERKZEUGE4)) {
    T['n4_rot_' + id] = () => { const m = M(); m.k4Plan = { ...(m.k4Plan || {}), rot: id }; m.k4PlanKopfRot = !!WERKZEUGE4[id].kopf; return []; };
    T['n4_gelb_' + id] = () => { const m = M(); m.k4Plan = { ...(m.k4Plan || {}), gelb: id }; return []; };
  }
  for (const zu of ['mila', 'kaya', 'lenning', 'keiner']) T['n4_zu_' + zu] = () => { const m = M(); m.k4Plan = { ...(m.k4Plan || {}), zu: zu === 'keiner' ? '' : zu }; return []; };
  return T;
};

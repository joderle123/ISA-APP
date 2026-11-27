// Storyline 7e „@annexe.cam“ – Kapitel 4 „8:34“, Dezember, Woche der Tests vor den Ferien (Gesamtkonzept K4).
// Verdecktes Thema: Gefühle regulieren. Bis jetzt konnte man dem Steuerpult nur zusehen – jetzt lernt man es zu senken:
// erst mit dem Körper, dann mit dem Kopf. Den eigenen Ampelplan baut man selbst (ausprobieren, was bei MIR wie viel senkt).
// Gebraucht im Test (Mittwoch 8:20) und in der Pause danach, wenn das Foto von 8:34 kommt: „wer spickt? hinten links.“
// Spuren: Montag ein gelber Zettel mit Loch am Türglas von 1.04; Mittwoch 8:31 geht Kenan mit einem gelben Zettel vorbei;
// auf dem Foto spiegelt sich das grüne Notausgang-Schild aus dem Gang (das Foto ist von draußen). Kein Spieler-Geld, keine Familie.
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
const HOF_FR = { ben: [-2.4, 15.0, 0.4], yusuf: [3.8, 16.6, -0.6], jo: [6.2, 14.2, -1.2], chiara: [-4.2, 12.6, 0.8], mila: [-6.4, 13.6, 1.0], noah: [0.6, 12.4, 0.2], manon: [2.0, 11.6, 0.0], kenan: [1.6, 24.6, Math.PI], luca: [-1.8, 25.2, Math.PI], dario: [4.4, 24.2, Math.PI] };

export const SCHRITTE_N4 = [
  // 1 · Montag 7:25: Frost an der Haltestelle. Dario redet zu schnell. Auf seinem Handy: „mittwoch. 8:34.“
  { id: 'k4_morgen', kap: 4, tag: 'Montag', uhr: 7.42, titel: 'Frost', ziel: 'Haltestelle. Man sieht den eigenen Atem.', marker: 'dario',
    start: { teleport: 'busAnkunft', gespraech: 'n4_haltestelle' },
    leute: { dario: [-17.2, 41.4, -1.2], noah: [-20.5, 42.3, -1.9], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n4_dario' } },
  // 2 · Montag 8:00: SePAS. Vorstellen (Rot-Modus), zwei Sachen ausprobieren, eigener Plan für Rot und Gelb.
  { id: 'k4_ampel', kap: 4, tag: 'Montag', uhr: 8.0, titel: 'Der Plan', ziel: 'SePAS. Herr Kuedes wartet.', marker: 'kaya',
    start: { teleport: 'sepas', gespraech: 'n4_ampelStart' },
    leute: { kaya: [-12.4, -11.6, 0.4, 'redet'], yusuf: [6.4, 13.2, -1.8] },
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
  { id: 'k4_freitag', kap: 4, tag: 'Freitag', uhr: 15.67, titel: 'Zu viel', ziel: 'Haltestelle. Letzter Bus vor den Ferien.', marker: 'dario',
    start: { teleport: 'busAnkunft', gespraech: 'n4_freitagStart' },
    leute: { dario: [-17.2, 41.4, -1.2], chiara: [-19.6, 42.8, -1.6], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n4_freitag' } },
];


// Werkzeuge zum Ausprobieren. koerper: wirkt auch auf Rot. kopf: wirkt nur auf Gelb (auf Rot kommt der Kopf nicht ran).
export const WERKZEUGE4 = {
  atmen: { t: '4 ein, 8 aus', sy: '🫁', koerper: true }, kalt: { t: 'Kaltes Wasser', sy: '🚰', koerper: true }, sauer: { t: 'Saurer Drops', sy: '🍬', koerper: true },
  rennen: { t: '20 Meter rennen', sy: '🏃', koerper: true }, zaehlen: { t: 'Rückwärts zählen', sy: '🔢', kopf: true }, schoen: { t: 'An was Schönes denken', sy: '🌅', kopf: true },
};
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
  zaehlen: { t: 'Rückwärts zählen', sy: '🔢', wirkung: 18, kopf: true, wie: 'Hundert, dreiundneunzig, sechsundachtzig …' },
  schoen: { t: 'An was Schönes denken', sy: '🌅', wirkung: 16, kopf: true, wie: 'Der Sommer am See. Kurz.' },
};
const TEST4 = (m) => {
  const plan = m.k4Plan || {}, ids = [...new Set([plan.rot, plan.gelb, 'atmen'].filter((id) => IM_TEST[id]))];
  const skills = ids.map((id) => ({ id, ...IM_TEST[id] }));
  return {
    wo: 'Saal 1.04 · Mathe · Mme Lenning', zeit: 110, start: m.k4Plan ? 50 : 60, drift: 0.012, wiederholbar: 14, skills, skillsTitel: m.k4Plan ? 'Dein Ampelplan:' : 'Was dir einfällt:',
    uhr: { von: 8 * 60 + 26, bis: 8 * 60 + 37 }, notbremse: { text: 'Hand hoch. Mme Lenning nickt. Eine Minute im Gang. Kalte Luft vom Fenster. Dann zurück.' },
    aufgaben: [
      { f: '3,5 km = … m', a: ['350', '3500', '35 000'], r: 1 }, { f: '2,4 + 0,75', a: ['3,15', '2,79', '3,1'], r: 0 },
      { f: 'Rechteck 6 m × 4 m – Fläche?', a: ['20 m²', '24 m²', '10 m²'], r: 1 }, { f: 'Morgens −4 °C, mittags +3 °C. Wie viel wärmer?', a: ['1 °C', '7 °C', '−7 °C'], r: 1 },
      { f: '1,2 · 10', a: ['12', '1,20', '120'], r: 0 }, { f: '750 g = … kg', a: ['7,5', '0,75', '75'], r: 1 },
      { f: '9,6 : 3', a: ['3,2', '3,02', '32'], r: 0 }, { f: 'Quadrat, Seite 5 cm – Umfang?', a: ['25 cm', '20 cm', '10 cm'], r: 1 },
    ],
    gedanken: ['Ich kann das eh nicht.', 'Alle sind schneller.', 'Mein Kopf ist leer.', 'Mme Lenning guckt.', '8:34. Was ist um 8:34?', 'Wenn ich das verhaue …'],
    ereignisse: [
      { bei: 0.14, text: 'Hinten klopft jemand mit dem Stift. Tack. Tack. Tack.', plus: 4 },
      { bei: 0.27, text: 'Flüstern zwei Reihen weiter. Mme Lenning: „Ruhe.“', plus: 3 },
      { bei: 0.32, text: '8:29. Noah hebt die Hand. „Darf ich aufs Klo?“ Mme Lenning nickt. Er geht raus.', plus: 2 },
      { bei: 0.36, text: '8:30. In den Taschen summen Handys. Viele gleichzeitig.', plus: 7 },
      { bei: 0.45, text: '8:31. Im Gang geht jemand am Türglas vorbei.', blick: { t: '👀 Aufschauen', key: 'kenanGesehen', text: 'Kenan. Der Große, Darios Freund. Er hat einen gelben Zettel in der Hand. Er schaut kurz rein. Dann ist er weg.' } },
      { bei: 0.66, text: '8:33. Noah kommt zurück. Er setzt sich neben dich. Mme Lenning: „Noch vier Minuten.“' },
      { bei: 0.8, text: '8:34. Ein Blitz an der Tür. Ganz kurz. Ein paar drehen sich um.', blitz: true, plus: 8 },
    ],
  };
};

// ---------- Die Wellen (Hauptszene). ruhig = auf Rot gesperrt: Da kommt der Kopf nicht ran. Körper-Werkzeuge gehen immer. ----------
const planIst = (m, id) => !!(m.k4Plan && (m.k4Plan.rot === id || m.k4Plan.gelb === id));
const ATEM_WELLE = (n) => [{ szene: 'atem', id: 'k4AtemW' + n,
  def: (m, S) => ({ wo: 'Hof · mittendrin', titel: '4 ein, 8 aus', allein: true, wer: { name: 'Du', farbe: '#2fb8a8' }, start: Math.round(((S.pult && S.pult.w) || 6) * 10), ziel: 30,
    info: 'Sie reden weiter. Du hältst nur den Takt. Deine Atemwolke in der kalten Luft zeigt ihn dir.' }),
  ausgang: () => 'weiter', folgen: { weiter: {} } }, { tu: 'n4_atem' }];
const PLAN_TUN = { kalt: [{ tu: 'n4_brunnen' }], sauer: [{ tu: 'n4_sauer' }], rennen: [{ tu: 'n4_rennen' }] };
const planRot = (m) => (m.k4Plan && m.k4Plan.rot) || '';
const WELLE = (n) => [
  { t: n === 1 ? '„Du gibst doch selbst leer ab.“' : n === 2 ? '„Kümmert euch um euren Kram.“' : '„Was glotzt ihr alle so?!“',
    merke: 'k4Wut', herz: n === 1 ? { jo: -2 } : {}, dann: [{ tu: 'n4_worte' }] },
  { t: '🫁 4 ein, 8 aus.', wenn: (m) => planRot(m) !== 'kalt' && planRot(m) !== 'sauer' && planRot(m) !== 'rennen', dann: ATEM_WELLE(n) },
  { t: '🚰 Zum Brunnen. ★ dein Plan', wenn: (m) => planRot(m) === 'kalt', dann: PLAN_TUN.kalt },
  { t: '🍬 Saurer Drops. ★ dein Plan', wenn: (m) => planRot(m) === 'sauer', dann: PLAN_TUN.sauer },
  { t: '🏃 Ums Gebäude rennen. ★ dein Plan', wenn: (m) => planRot(m) === 'rennen', dann: PLAN_TUN.rennen },
  { t: '„Das Foto ist von draußen!“', ruhig: true, beweis: 'k4Gruen', staerke: 'lesen', dann: [{ tu: 'n4_fotoZeigen' }] },
  ...(n === 2 ? [{ t: '„Kenan. 8:31. Der Zettel.“', ruhig: true, wenn: (m) => !!m.kenanGesehen && !m.k4KenanGefragt, staerke: 'lesen', merke: 'k4KenanGefragt', dann: [{ tu: 'n4_kenan' }] }] : []),
  { t: '(Zu Mme Lenning gehen.)', wenn: (m) => !(n === 2 && m.kenanGesehen && !m.k4KenanGefragt), dann: [{ tu: 'n4_lenning' }] },
];


// ---------- SePAS: ausprobieren, was bei dir wirkt (jede Probe senkt die Zahl verschieden – das Spiel merkt es sich) ----------
const ATEM_PROBE = [{ szene: 'atem', id: 'k4AtemProbe', def: (m, S) => ({ wo: 'SePAS', titel: '4 ein, 8 aus', allein: true, wer: { name: 'Herr Kuedes', farbe: '#2fb8a8' }, start: Math.round(((S.pult && S.pult.w) || 8) * 10), ziel: 30, info: 'Herr Kuedes zählt mit. Halten = ein. Loslassen = lang aus.' }),
  ausgang: (r) => (r.gut >= 2 ? 'gut' : 'weiter'), folgen: { gut: {}, weiter: {} } }, { tu: 'n4_probeAtmen' }];
const PROBE_WAHL = [
  { t: '🫁 Atmen. 4 ein, 8 aus.', wenn: (m) => !(m.k4Wirkung || {}).atmen, dann: ATEM_PROBE },
  { t: '🚰 Hände in kaltes Wasser.', wenn: (m) => !(m.k4Wirkung || {}).kalt, dann: [['erzaehler', 'Waschbecken. Eiskaltes Wasser. Bis zu den Handgelenken. Zehn Sekunden.'], { tu: 'n4_probeKalt' }] },
  { t: '🏃 Mit Yusuf rennen.', wenn: (m) => !(m.k4Wirkung || {}).rennen, dann: [['yusuf', '(an der Tür) Bis zum Korb und zurück. Los!'], ['erzaehler', 'Die Luft ist eiskalt in der Lunge. Yusuf gewinnt. Natürlich.'], { tu: 'n4_probeRennen' }] },
];
const PLAN_ENDE = [
  { tu: 'n4_planZeigen' },
  ['kaya', 'Dein Plan. Rot zuerst: Was nimmst du, wenn gar nichts mehr geht?'],
  { tu: 'n4_planRot' },
  ['kaya', 'Und bei Gelb? Wenn es kribbelt, aber du noch denken kannst?'],
  { tu: 'n4_planGelb' },
  { pult: null },
  { foto: 'k4Plan', wer: 'kaya', von: [0.6, 1.5, -2.4], auf: [0, 1.2, 0], fov: 44 },
  ['kaya', 'Mittwoch hast du ihn dabei. Ob du ihn brauchst, weißt du vorher nicht.'],
];

// ---------- Pause im Frost (Umbau): ein Ort. Störung: Jo sagt laut „hinten links schreibt ab“. ----------
const STOER_JO = [
  { hin: { jo: [1.2, 9.6, -2.4, 'redet'] } },
  { szene: 'stoerung', id: 'stoerJo4', pruefe: false,
    def: { bild: { wer: 'jo', von: [1.8, 1.7, -2.0], auf: [0, 1.4, 0], fov: 44 }, t: 'Jo, laut: „Wer hinten links sitzt, schreibt ab.“', hin: 'Zu Jo', bleib: 'Bleiben', zeit: 8 },
    ausgang: (r) => (r.hin ? 'hin' : 'bleib'),
    folgen: { hin: { merke: 'k4ZuJo', dann: [{ tu: 'n4_zuJo' }] }, bleib: { merke: 'k4JoIgnoriert' } } },
];

export const GESPRAECHE_N4 = {
  // ---------- 1 · Montag 7:25: Haltestelle im Frost ----------
  n4_haltestelle: [
    ['erzaehler', 'Dezember. Frost. Wer atmet, macht Wölkchen. Die letzte Woche vor den Ferien: Tests.'],
    ['dario', '(redet ohne Pause) … und dann der Bus gestern, zehn Minuten zu spät, und keiner sagt was, und –'],
    ['erzaehler', 'Er dreht sein Handy weg. Eine Zeile siehst du trotzdem: „mittwoch. 8:34.“'],
    { beweis: 'k4Zeile', t: 'Auf Darios Handy: „mittwoch. 8:34.“' },
    { verdacht: 'dario', spur: 'Auf seinem Handy: „mittwoch. 8:34.“ Zwei Tage vorher.' },
  ],
  n4_dario: [
    ['dario', '(steckt das Handy weg) Was? Nichts. Kalt, oder? Voll kalt.'],
    { wahl: [
      { t: '„Was ist Mittwoch um 8:34?“', beweis: 'k4Zeile', merke: 'k4DarioGefragt', staerke: 'lesen',
        dann: [['dario', '(zu schnell) Keine Ahnung. Echt. Steht da so. Irgendein Account.'], ['erzaehler', 'Er schaut auf die Straße. Der Bus ist noch nicht zu sehen.'], ['dario', '(leiser) Geh am Mittwoch nicht aufs Klo. Um halb neun. Nur so.']] },
      { t: '„Alles okay bei dir?“', herz: { dario: 1 },
        dann: [['dario', '(lacht kurz) Klar. Alles okay. … Zu viel Kaffee.'], ['erzaehler', 'Er ist vierzehn. Er trinkt keinen Kaffee.']] },
      { t: '„Ja. Voll kalt.“', dann: [['dario', 'Voll kalt.'], ['erzaehler', 'Der Bus kommt. Dario setzt sich ganz nach hinten.']] },
    ] },
  ],

  // ---------- 2 · Montag 8:00: SePAS – der Ampelplan ----------
  n4_ampelStart: [
    ['kaya', 'Setzt euch. Heute keine Theorie. Heute probiert ihr.'],
    ['kaya', 'Stellt euch vor: Mittwoch. Test. Und alle schauen euch an.'],
    { pult: { g: 'Angst', w: 8 } },
    ['erzaehler', 'Nur vom Vorstellen: Herz im Hals. Rot.'],
    ['kaya', 'Erst mit dem Kopf. Zähl rückwärts. Hundert, dreiundneunzig …'],
    { tu: 'n4_probeZaehlen' },
    ['kaya', 'Gemerkt? Auf Rot kommt der Kopf nicht ran. Jetzt der Körper. Such dir was aus.'],
    { wahl: PROBE_WAHL },
    ['kaya', 'Noch eins. Dann weißt du, was dir besser passt.'],
    { wahl: PROBE_WAHL },
    ...PLAN_ENDE,
  ],
  n4_probeRennen: [
    ['yusuf', 'Bis zum Korb und zurück. Zwanzig Meter. Wer zuerst da ist. Los!'],
    ['erzaehler', 'Ihr rennt. Die Luft ist eiskalt in der Lunge. Yusuf gewinnt. Natürlich.'],
    { tu: 'n4_probeRennen' },
  ],
  n4_probeKalt: [
    ['erzaehler', 'Hände ins Brunnenwasser. Eiskalt. Bis zu den Handgelenken. Zehn Sekunden.'],
    { tu: 'n4_probeKalt' },
  ],
  n4_probeSauer: [
    ['erzaehler', 'Der Automat hat saure Drops. Einer fällt. Sauer. Sehr sauer. Dein ganzes Gesicht zieht sich zusammen.'],
    { tu: 'n4_probeSauer' },
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
          { id: 'mila', sy: '🎧', name: 'Mila', wer: 'Zählt Fenster. Warum?', bild: { wer: 'mila', von: [1.6, 1.4, 1.8], auf: [0, 0.9, 0], fov: 44 } },
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
      { t: '„Später, okay?“', dann: [['chiara', 'Klar. Später.'], ['erzaehler', 'Sie fragt Noah. Noah weiß es auch nicht.']] },
    ] },
  ],
  n4_jo: [
    ['erzaehler', 'Ein paar lachen. Hinten links ist der Platz an der Tür. Da sieht Mme Lenning am schlechtesten hin.'],
    { wahl: [
      { t: '„Woher willst du das wissen?“', merke: 'k4JoNachgehakt', dann: [['jo', '(kurz still) … Hört man halt.'], ['erzaehler', 'Für eine Sekunde sieht Jo nicht lustig aus. Eher müde.']] },
      { t: '„Sag doch, wen du meinst.“', merke: 'k4JoGefragt', dann: [['jo', '(grinst) Weiß ich doch nicht. Wer halt da sitzt.'], ['erzaehler', 'Er sagt keinen Namen. Aber er schaut dich an.']] },
      { t: '(Weggehen.)', dann: [['erzaehler', 'Hinter dir sagt Jo noch etwas. Du hörst nur „links“.']] },
    ] },
  ],
  n4_eis: [
    ['ben', '(rutscht an dir vorbei, Arme ausgebreitet) Achtung! Keine Bremsen!'],
    ['yusuf', 'Drei Meter zwanzig! Hofrekord! Du bist dran.'],
    { wahl: [
      { t: '(Anlauf. Rutschen.)', merke: 'k4Gerutscht', herz: { ben: 1, yusuf: 1 }, dann: [{ tu: 'n4_rutschen' }] },
      { t: '„Ich schau lieber zu.“', dann: [['ben', 'Feigling. (grinst) Nur Spaß.']] },
    ] },
  ],
  n4_mila: [
    ['erzaehler', 'Mila sitzt mit Kopfhörern auf der Bank. Ihre Lippen bewegen sich.'],
    ['mila', '(nimmt einen Hörer raus) Sechsundvierzig. Fenster. Am Altbau.'],
    { wahl: [
      { t: '„Warum zählst du Fenster?“', merke: 'k4MilaPlan', herz: { mila: 2 }, dann: [
        ['mila', 'Wenn ich zähle, wird mein Kopf leiser.'],
        ['mila', 'Bei Rot zähl ich nicht. Da geht das nicht. Da drück ich die Hände ans kalte Geländer.'],
        ['erzaehler', 'Mila hat auch einen Ampelplan. Sie hat ihn nur nie so genannt.']] },
      { t: '(Sich daneben setzen. Mitzählen.)', herz: { mila: 1 }, dann: [['erzaehler', 'Siebenundvierzig. Achtundvierzig. Mila schaut kurz zu dir. Dann zählt sie weiter. Etwas lauter.']] },
    ] },
  ],
  n4_lina: [
    ['lina', '(an der Tür von 1.04, flüstert) Guck mal. Was klebt da am Glas?'],
    { foto: 'auchTuer4', von: [-20.7, 1.35, -16.6], auf: [-21.4, 1.1, -18.0], fov: 36 },
    { szene: 'suchbild', id: 'k4Zettel', pruefe: false,
      def: { wo: 'Tür von 1.04', frage: 'Lina: „Guck mal aufs Glas.“ Was klebt da?', zeit: 10, finde: 1, foto: { von: [-20.7, 1.35, -16.6], auf: [-21.4, 1.1, -18.0], fov: 36 },
        gut: 'Ein gelber Zettel. In der Mitte ein Loch. So groß wie eine Linse.', verpasst: 'Gelb: ein Zettel mit Loch.',
        ziele: [{ id: 'zettel', obj: 'zettel104', r: 0.07, t: 'Gelber Zettel mit Loch', kurz: 'Am Türglas: ein gelber Zettel mit einem Loch. Wie für eine Linse.', beweis: 'k4Zettel' }] },
      ausgang: (r) => ((r.gefunden || []).length ? 'ja' : 'nein'), folgen: { ja: { dann: [{ bemerke: 'zettelLoch' }] }, nein: {} } },
    ['lina', 'Wer klebt denn einen Zettel mit Loch an eine Tür?'],
    { wahl: [
      { t: '(Abfotografieren.)', beweis: 'k4Zettel', merke: 'spurZettel', staerke: 'lesen',
        dann: [['erzaehler', 'Klick. Gelber Zettel, rundes Loch, neuer Klebestreifen. Montag, 9:54.'], ['lina', 'Schick mir das. Bitte.']] },
      { t: '(Abreißen.)', merke: 'k4ZettelWeg', dann: [['erzaehler', 'Du ziehst ihn ab. Darunter: nichts. Nur Glas.'], ['lina', '(leise) Jetzt weiß der, der ihn geklebt hat: Wir haben ihn gesehen.']] },
      { t: '(Lassen.)', dann: [['lina', 'Okay. Lassen wir ihn.'], ['erzaehler', 'Sie schaut noch zweimal zurück.']] },
    ] },
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
    { wenn: (m) => !!m.k4Plan, dann: [['erzaehler', 'Unter dem Blatt liegt dein Ampelplan. Ein kleiner Zettel. Nur du weißt, was draufsteht.']] },
    { szene: 'test', id: 'k4Test', def: (m) => TEST4(m),
      ausgang: (r, m) => {
        m.k4TestRichtig = r.richtig; m.k4TestMax = r.max;
        if ((r.gesehen || []).includes('kenanGesehen')) m.kenanGesehen = true;
        if (r.notbremse) m.k4Notbremse = true; if (r.kopfRot) m.k4KopfRot = true;
        m.k4TestSkills = (r.skills || []).length;
        return r.richtig >= 6 ? 'gut' : r.richtig >= 4 ? 'mittel' : 'schwach';
      }, folgen: { gut: {}, mittel: {}, schwach: {} } },
    { foto: 'k4Foto834', von: [-21.5, 1.42, -17.75], auf: [-17.95, 1.1, -19.78], fov: 34 },   // durch das Glas der geschlossenen Tür
    { foto: 'k4Blatt', wer: 'du', von: [0.55, 1.85, 0.35], auf: [-0.55, 0.76, 0], fov: 46 },
    ['lenning', 'Stifte weg. Blätter nach vorne.'],
    { tu: 'n4_testEnde' },
  ],

  // ---------- 5 · Mittwoch 9:50: das Foto von 8:34 – drei Wellen ----------
  n4_foto: [
    ['erzaehler', 'Pause. Überall im Hof summen Handys. Alle gleichzeitig.'],
    ['jo', '(hält sein Handy hoch) Leute. LEUTE. Guckt euch das an.'],
    { handy: { wer: '@annexe.cam', wann: 'gerade eben', fotoId: 'k4Foto834', kreis: { x: 50, y: 50, r: 15 }, gruen: true,
      alt: 'Die Klasse beim Test, durch das Türglas fotografiert. Um deinen Kopf ist mit dem Finger ein zittriger Kreis gemalt.', text: '„wer spickt? hinten links.“ · 8:34 · 74 Reaktionen' } },
    ['jo', '(liest laut vor) „Wer spickt? Hinten links.“'],
    { handy: null },
    { szene: 'suchbild', id: 'k4Gruen', pruefe: false,
      def: { wo: 'Das Foto von 8:34', frage: 'Von wo wurde das fotografiert? Such den Hinweis.', zeit: 12, finde: 1, bild: 'k4Foto834', gruen: true, kreis: true,
        gut: 'Grün im Glas: das Notausgang-Schild aus dem Gang. Das Foto ist von DRAUSSEN.', verpasst: 'Oben rechts: das grüne Notausgang-Schild, gespiegelt. Das Foto ist von draußen.',
        ziele: [
          { id: 'gruen', x: 0.865, y: 0.095, r: 0.09, t: 'Notausgang-Schild, gespiegelt', kurz: 'Im Glas spiegelt sich das grüne Notausgang-Schild. Das Foto ist von draußen.', beweis: 'k4Gruen' },
          { id: 'kreis', x: 0.5, y: 0.5, r: 0.1, richtig: false, t: 'Der Kreis um deinen Kopf. Den hat wer reingemalt.' },
        ] },
      ausgang: (r) => ((r.gefunden || []).length ? 'ja' : 'nein'), folgen: { ja: { dann: [{ bemerke: 'fotoGruen' }] }, nein: {} } },
    { tu: 'n4_fotoStart' },
    // Welle 1: Jo
    ['jo', 'Hinten links. Wer sitzt da noch mal? … Ach.'],
    ['erzaehler', 'Er dreht sich zu dir. Ein paar lachen. Nicht laut. Aber genug.'],
    { tu: 'n4_welle' },
    { warum: true, wahl: WELLE(1) },
    // Welle 2: Luca und Kenan von der Skate-Ecke
    { wenn: (m) => !m.k4WellenEnde, dann: [
      { hin: { luca: [-0.6, 16.4, 2.6], kenan: [0.8, 17.2, 3.0] } },
      ['luca', '(von hinten, laut) Ey, 7P2! Ist das der Spicker? Mit dem Kreis?'],
      ['kenan', '(grinst) Wie viele Punkte hast du geklaut?'],
      ['luca', 'Respekt. Bei Lenning.'],
      { tu: 'n4_welle' },
      { wahl: WELLE(2) },
    ] },
    // Welle 3: alle
    { wenn: (m) => !m.k4WellenEnde, dann: [
      ['erzaehler', 'Jetzt schauen alle. Der halbe Hof. Jemand hält das Handy hoch und filmt, wie du auf das Foto schaust.'],
      { tu: 'n4_welle' },
      { warum: true, wahl: WELLE(3) },
    ] },
    { tu: 'n4_wellenSchluss' },
    { pult: null },
    { sicht: (m) => ({ wer: 'jo', auf: 'du', gedanken: [
      'Mittwoch, 8:36. Mein Blatt: drei Aufgaben. Von acht. Der Rest ist weiß.',
      m.k4Wut ? '„Du gibst selbst leer ab.“ Woher weiß der das? Haben das alle gesehen?' : m.k4JoNachgehakt ? 'Am Montag hat einer gefragt: „Woher willst du das wissen?“ Ich weiß gar nichts. Ich sag es nur.' : 'Alle lachen. Gut. Lachen ist gut.',
      'Solange alle über hinten links reden, fragt keiner nach mir.'] }) },
    { tu: 'n4_fotoFolge' },
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
    ['erzaehler', 'Freitag, letzte Stunde vor dem Mittag. Mme Lenning gibt die Tests zurück. Ohne ein Wort.'],
    { tu: 'n4_note' },
    ['ben', '(reißt die Tür zum Hof auf) Genug Zahlen. SCHNEE!'],
    ['yusuf', 'Die 7P1 hat schon einen Wall. Wir bauen zwei. Los, los, los!'],
    { szene: 'schneeball', id: 'k4Schneeball',
      def: (m) => ({ wo: 'Hof', zeit: 45, team: [F.ben, F.yusuf, m.k4NoahVerdacht ? F.mila : F.noah, F.chiara],
        gegner: [{ name: 'Dario', farbe: '#d9693f' }, { name: 'Tom', farbe: '#8e44ad' }, { name: 'Lea', farbe: '#16a085' }, { name: 'Sami', farbe: '#7b8794' }] }),
      ausgang: (r, m) => { m.k4SchneeTreffer = r.treffer || 0; m.k4SchneeStand = (r.stand || [0, 0]).join(' : '); return (r.stand || [0, 0])[0] >= (r.stand || [0, 0])[1] ? 'sieg' : 'knapp'; },
      folgen: { sieg: {}, knapp: {} } },
    { foto: 'k4Schnee', von: [1.0, 1.7, 9.4], auf: [0.4, 1.1, 15.6], fov: 60 },
    { tu: 'n4_schneeFolge' },
  ],

  // ---------- 7 · Freitag 15:40: Haltestelle ----------
  n4_freitagStart: [
    ['erzaehler', 'Freitag, 15:40. Letzter Bus vor den Ferien. Es wird schon dunkel.'],
    { wenn: (m) => m.chiaraGestaerkt || m.chiaraFuesse, dann: [['chiara', '(stellt sich neben dich) Am Mittwoch. Bei Aufgabe drei. Da war wieder alles weg.']],
      sonst: [['erzaehler', 'Chiara steht ein Stück weg. Die Hände in den Ärmeln. Sie schaut auf ihre Schuhe.']] },
    { sicht: (m) => ({ wer: 'chiara', auf: 'du', gedanken: [
      'Mittwoch, 8:27. Aufgabe drei. Rechteck, sechs mal vier.',
      'Die Zahlen schwimmen. Die Sechs sieht aus wie eine Acht. Mein Herz ist im Hals.',
      m.chiaraFuesse ? 'Füße in den Boden. Fest. Wie am Montag im Hof. … Vierundzwanzig.' : m.chiaraGestaerkt ? '„Die dritte kommt wieder.“ … Vierundzwanzig. Da ist sie.' : 'Nichts. Ich schreib irgendwas hin. Hauptsache, da steht was.'] }) },
    { wenn: (m) => m.chiaraGestaerkt || m.chiaraFuesse, dann: [['chiara', 'Danke. Für Montag. Ich hab fünf von acht.']] },
  ],
  n4_freitag: [
    ['dario', '(blass, ohne Mütze, obwohl es friert) Hey.'],
    ['dario', 'Das mit 8:34 … das war zu viel.'],
    ['erzaehler', 'Er sagt es mehr zu sich selbst als zu dir.'],
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
  worte: 'Du hast mit Worten zurückgeschlagen.', sauer: 'Saurer Drops. Du bist geblieben.' };
const werkzeugName = (id) => (WERKZEUGE4[id] ? WERKZEUGE4[id].sy + ' ' + WERKZEUGE4[id].t : '–');
export const RUECKBLICK_N4 = (m, S) => {
  const plan = m.k4Plan || {}, hoch = m.k4Hoch || 0;
  return [
    { id: 'k4Plan', titel: 'Dein Ampelplan', text: plan.rot ? 'Rot: ' + werkzeugName(plan.rot) + '. Gelb: ' + werkzeugName(plan.gelb) + '.' + (m.k4PlanKopfRot ? ' (Ein Kopf-Werkzeug für Rot. Hat es im Test geholfen?)' : '') : 'Kein eigener Plan.' },
    { id: 'k4Blatt', titel: 'Dein Blatt im Test', text: (m.k4TestRichtig != null ? m.k4TestRichtig + ' von 8 richtig. ' : '') + ((m.k4TestMax || 0) >= 70 ? 'Zwischendurch Rot-Modus.' : 'Angespannt, aber nicht auf Rot.') + (m.k4Notbremse ? ' Du hast die Notbremse gezogen.' : '') + (m.k4KopfRot ? ' Auf Rot kam der Kopf nicht ran.' : '') },
    { id: 'k4Foto834', titel: 'Das Foto von 8:34', text: m.spurGruen ? '„wer spickt? hinten links.“ Im Glas: das grüne Notausgang-Schild. Es war von draußen.' : '„wer spickt? hinten links.“ Ein Kreis um deinen Kopf.' },
    { id: 'k4Hoch', titel: hoch >= 7 ? 'Beim Foto: Rot-Modus' : hoch >= 4 ? 'Beim Foto: angespannt' : 'Beim Foto: ruhig', text: TAT[m.k4HochTat] || 'Es hat geklingelt.' },
    !(S && S.bemerkt && S.bemerkt.zettelLoch) ? { id: 'auchTuer4', titel: 'Das war auch', text: 'Am Montag klebte am Türglas von 1.04 ein gelber Zettel. Mit einem Loch, so groß wie eine Linse. Auf Sitzhöhe.', auch: true }
      : { id: 'auchChiara4', titel: 'Das war auch', text: 'Chiara, am Tisch vor dir. Bei Aufgabe drei hat sie zehn Sekunden lang nicht geatmet.', auch: true },
    { id: 'k4Schnee', titel: 'Schnee', text: 'Schneeballschlacht. ' + (m.k4SchneeStand ? '7P2 gegen 7P1: ' + m.k4SchneeStand + '.' : '') + (m.k4SchneeTreffer ? ' Deine Treffer: ' + m.k4SchneeTreffer + '.' : '') },
  ].filter(Boolean);
};

// ---------- TUN für Kapitel 4 (in spiel.js eingehängt: tunN4) ----------
const zoneVon = (w) => (w >= 7 ? 'rot' : w >= 4 ? 'gelb' : 'gruen');
export const tunN4 = (c) => {
  const M = () => c.S.merke, W = () => (c.S.pult && c.S.pult.w) || 0;
  // Ausprobieren: Wie viel senkt ein Werkzeug bei DIR, und auf welcher Stufe?
  const probe = (id, menge) => {
    const m = M(), w = W(), zone = zoneVon(w), d = menge != null ? menge : wirkung4(id, c.S.name, zone), wz = WERKZEUGE4[id];
    m.k4Wirkung = m.k4Wirkung || {}; const alt = m.k4Wirkung[id] || {};
    m.k4Wirkung[id] = { ...alt, [zone]: Math.max(alt[zone] || 0, d) };
    m.k4Probiert = Object.keys(m.k4Wirkung).length;
    const neu = Math.max(0, w - d), z = [{ pult: { plus: -d } }];
    if (d === 0) z.push(['erzaehler', wz.sy + ' ' + wz.t + ': nichts. Der Rand bleibt rot.']);
    else z.push(['erzaehler', wz.sy + ' ' + wz.t + ': ' + (zone === 'rot' ? 'Der rote Rand wird blass. Das wirkt.' : 'Ruhiger. Fast grün.')]);
    if (neu <= 3) z.push(['erzaehler', 'Grün. Dann denkst du wieder an Mittwoch. Alle schauen. Zack, wieder rot.'], { pult: { w: 8 } });
    return z;
  };
  const ende = () => { M().k4WellenEnde = true; };
  const T = {
    // Pause = ein Ort: das Gespräch am Ort, danach Jos Störung (außer man ist schon bei Jo)
    n4_ort: (pa) => {
      const id = pa && pa.id, G = { chiara: 'n4_chiara', ben: 'n4_eis', mila: 'n4_mila', lina: 'n4_lina' }[id];
      const hin = { chiara: [-2.0, 11.6, -2.4], ben: [8.2, 15.0, 1.2], mila: [-13.2, 11.4, -2.0], lina: [-20.8, -16.4, Math.PI] }[id];
      return [...(hin ? [{ hin: { du: hin } }] : []), ...(GESPRAECHE_N4[G] || []), ...(id === 'lina' ? [] : STOER_JO)];
    },
    n4_zuJo: () => [{ hin: { du: [2.2, 8.4, -0.6] } }, ['jo', '(laut, damit es alle hören) Wer hinten links landet, schreibt ab. Weiß jeder.'], ...GESPRAECHE_N4.n4_jo],
    n4_probeAtmen: () => { const r = (c.S.sz && c.S.sz.k4AtemProbe) || {}; return probe('atmen', (r.gut || 0) >= 2 ? null : 1); },
    n4_probeZaehlen: () => probe('zaehlen'), n4_probeSchoen: () => probe('schoen'),
    n4_probeRennen: () => probe('rennen'), n4_probeKalt: () => probe('kalt'), n4_probeSauer: () => probe('sauer'),
    n4_planZeigen: () => {
      const wk = M().k4Wirkung || {}, ids = Object.keys(wk);
      if (!ids.length) { M().k4NichtsProbiert = true; return [['kaya', 'Du hast nichts ausprobiert? Dann nimm, was bei den meisten wirkt. Aber das ist dann nicht DEIN Plan.']]; }
      const zeile = ids.map((id) => werkzeugName(id)).join(' · ');
      return [['erzaehler', 'Ausprobiert: ' + zeile], ['kaya', 'Gut. Und jetzt dein Plan.']];
    },
    n4_planRot: () => [{ wahl: planIds().map((id) => ({ t: werkzeugName(id) + bei(id), dann: [{ tu: 'n4_rot_' + id }] })) }],
    n4_planGelb: () => [{ wahl: planIds().filter((id) => id !== (M().k4Plan || {}).rot).map((id) => ({ t: werkzeugName(id) + bei(id), dann: [{ tu: 'n4_gelb_' + id }] })) }],
    // Montag: Rutschen auf dem Eis (Spaß)
    n4_rutschen: () => { const m = M(), n = 2.4 + ((c.S.name || 'x').length % 5) * 0.3; m.k4Rutsch = Math.round(n * 10) / 10; m.eisMeter = (m.eisMeter || 0) + n;
      return n > 3.2 ? [['erzaehler', 'Du rutschst. ' + String(m.k4Rutsch).replace('.', ',') + ' Meter. Neuer Hofrekord!'], ['yusuf', 'NEIN! Nochmal! Das zählt nicht!']] : [['erzaehler', 'Du rutschst. ' + String(m.k4Rutsch).replace('.', ',') + ' Meter. Dann sitzt du auf dem Hintern.'], ['ben', '(lacht so sehr, dass er selbst hinfällt)']]; },
    // Mittwoch: Testordnung, hinten links
    n4_setzenTest: () => { M().k4TuerZu = true; c.setzen(-17.95, -19.78, -Math.PI / 2); return []; },   // Testordnung: Tür zu
    n4_testEnde: () => {
      const m = M(), z = []; m.k4TuerZu = false;
      if ((m.k4TestMax || 0) >= 90) z.push(['erzaehler', 'Ab der Hälfte ist alles verschwommen. Du weißt nicht mehr, was du hingeschrieben hast.']);
      if (m.k4KopfRot) z.push(['erzaehler', 'Zählen auf Rot hat nichts gebracht. Der Kopf kam nicht ran.']);
      if (m.kenanGesehen) c.ui.toast('<b>🔎 Spur</b><span>8:31: Kenan am Türglas. Mit einem gelben Zettel.</span>', 'ly-t-ent');
      return z;
    },
    // Mittwoch 9:50: Start der Wellen. Wendung ohne gute Seite: Wer im Test schnell und gut war, wird eher verdächtigt.
    n4_fotoStart: () => {
      const m = M(), gut = (m.k4TestRichtig || 0) >= 6; m.k4Welle = 0; m.k4WellenEnde = false; m.k4Hoch = 0;
      const z = [{ pult: { g: 'Scham', w: 3 } }];
      if (gut) { m.k4Wendung = true; z.push(['ayla', '(leise zu Chiara) Hinten links war am Mittwoch als Erstes fertig. Komisch, oder?'], ['erzaehler', 'Gut im Test. Und genau das macht es schlimmer.'], { pult: { plus: 1 } }); }
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
      if (n >= 3) { m.k4Ruhig = true; ende(); z.push(['erzaehler', 'Es klingelt. Du stehst noch da.']); }
      return z; },
    n4_atem: () => {
      const m = M(), n = m.k4Welle || 1, r = (c.S.sz && c.S.sz['k4AtemW' + n]) || {}, d = (r.gut || 0) >= 3 ? 3 : (r.gut || 0) >= 2 ? 2 : 1;
      m.k4Geatmet = true; m.k4AtemGut = (m.k4AtemGut || 0) + (r.gut || 0);
      const z = [{ pult: { plus: -d } }];
      if (planIst(m, 'atmen')) z.push(['erzaehler', 'Dein Plan. Vier ein. Acht aus. Du hast es am Montag geübt.']);
      if (n >= 3) { m.k4Ruhig = true; ende(); z.push(['erzaehler', 'Du bleibst stehen. Vier ein, acht aus. Bis es klingelt.'], ['mila', '(im Vorbeigehen, leise) Du hast es ausgehalten. Respekt.']); }
      else z.push(['erzaehler', 'Sie reden weiter. Du atmest weiter. Der Kreis um dich wird größer. Es kommen mehr Leute dazu.']);
      return z;
    },
    n4_fotoZeigen: () => {
      const m = M(); m.k4FotoGezeigt = true; m.spurGruen = true; ende();
      const augen = !!(c.S.bemerkt || {}).fotoAugen;
      return [['mila', '(nimmt Jo das Handy aus der Hand, zoomt) Stimmt. Das spiegelt sich im Glas. Das Foto ist durch die Tür gemacht. Von draußen.'],
        ...(augen ? [['du', 'Und meine Augen sind auf meinem Blatt. Nicht bei Chiara.'], ['chiara', 'Stimmt. Ich saß vor dir. Du hast nicht einmal hochgeschaut.']] : []),
        { pult: { plus: -2 } }, ['ben', 'Und wer war um 8:34 im Gang?'], ['jo', '(sofort) Noah. Noah war doch aufm Klo. Um halb neun.'],
        ['erzaehler', 'Alle drehen sich um. Zu Noah.'], ['noah', '(leise) Ich … ich war um halb neun auf dem Klo. Ja.'],
        { wahl: [
          { t: '„Um 8:34 saß Noah neben mir.“', merke: 'k4NoahVerteidigt', herz: { noah: 2 }, staerke: 'mut',
            dann: [['yusuf', 'Stimmt. Er kam rein, als Lenning „noch vier Minuten“ gesagt hat.'], ['erzaehler', 'Noah schaut dich an. Lange. Er sagt nichts. Er muss auch nichts sagen.'], ['jo', '(steckt das Handy weg) Dann halt keiner. Langweilig.']] },
          { t: '(Nichts sagen.)', merke: 'k4NoahVerdacht', herz: { noah: -1 },
            dann: [['erzaehler', 'Jetzt reden sie über Noah. Der Kreis um dich ist weg. Um ihn ist ein neuer.'], ['noah', '(geht rein. Obwohl noch Pause ist.)']] },
        ] }];
    },
    n4_augen: () => { const m = M(); m.k4AugenGezeigt = true;
      return [['mila', '(schaut genau) Stimmt. Die Augen sind auf dem Blatt.'], ['jo', 'Spicker gucken halt schnell. Zack, und wieder runter.'], ['erzaehler', 'Ein paar nicken. Ein paar nicht. Es reicht nicht. Noch nicht.'], { pult: { plus: -1 } }]; },
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
      m.k4HochTat = m.k4Explodiert ? 'explodiert' : m.k4LenningGeholt ? 'lenning' : m.k4FotoGezeigt ? 'foto' : m.k4Brunnen ? 'brunnen' : m.k4Gerannt ? 'rennen' : m.k4Ruhig && m.k4Sauer && !m.k4Geatmet ? 'sauer' : m.k4Ruhig ? 'atmen' : m.k4Wut ? 'worte' : '';
      return m.k4WellenEnde ? [] : [['erzaehler', 'Es klingelt. Das Foto ist auf zwölf Handys. Mindestens.']];
    },
    n4_fotoFolge: () => {
      const m = M();
      if (m.spurGruen) c.ui.toast('<b>🔎 Spur</b><span>Das grüne Notausgang-Schild im Glas: Das Foto von 8:34 kam von draußen, durch die Tür.</span>', 'ly-t-ent');
      if (m.k4Explodiert) c.ui.toast('<b>📹 Gefilmt</b><span>Jemand hat gefilmt, wie du explodiert bist. Das kommt wieder.</span>', 'ly-t-ent');
      if (m.k4Wut && !m.k4Explodiert) c.ui.toast('<b>🔓 Jo</b><span>Du hast Jo an einer wunden Stelle getroffen. Das merkt er sich.</span>', 'ly-t-ent');
      return [];
    },
    // Freitag: die Note hängt mehr am Steuern als am Rechnen
    n4_note: () => {
      const m = M(), r = m.k4TestRichtig || 0, max = m.k4TestMax || 0, z = [];
      z.push(['erzaehler', 'Dein Test: ' + r + ' von 8. Oben rechts, in Rot: ' + (r >= 6 ? '„Gut gemacht.“' : r >= 4 ? '„Da geht noch mehr.“' : '„Sprich mich bitte an.“')]);
      if (max >= 90) z.push(['erzaehler', 'Die Fehler sind alle hinten. Ab der Hälfte. Da, wo die Zahlen geschwommen sind.']);
      else if (m.k4Notbremse) z.push(['erzaehler', 'Die Minute im Gang hat Zeit gekostet. Aber danach ist kein Fehler mehr.']);
      else if ((m.k4TestSkills || 0) > 0) z.push(['erzaehler', 'Am Rand ist ein kleiner Kringel. Den hast du beim Atmen gemalt, ohne es zu merken.']);
      if (m.k4LenningGeholt) z.push(['lenning', '(leise, im Vorbeigehen) Ich hab mir deinen Test angeschaut. Die Fehler sind deine eigenen. Das ist ein Kompliment.']);
      else if (r >= 6) z.push(['ayla', '(schaut auf dein Blatt) ' + r + ' von 8. Klar. Hinten links.'], ['erzaehler', 'Gut sein hilft dir diese Woche nicht.']);
      z.push(m.chiaraGestaerkt || m.chiaraFuesse ? ['chiara', '(zeigt dir ihr Blatt) Fünf von acht. Die Fläche hatte ich. Vierundzwanzig.'] : m.chiaraEasy ? ['erzaehler', 'Chiara dreht ihr Blatt um, bevor du es siehst.'] : ['chiara', '(leise) Drei von acht.']);
      z.push(['erzaehler', 'Jo faltet sein Blatt ganz klein. Er steckt es weg, bevor jemand fragt.']);
      return z;
    },
    n4_schneeFolge: () => {
      const m = M(), z = [];
      z.push(['yusuf', (m.k4SchneeTreffer || 0) >= 6 ? '(lacht) ' + m.k4SchneeTreffer + ' Treffer! Ich hab mitgezählt! Du bist eine Maschine!' : '(außer Atem) Nächstes Jahr bauen wir drei Wälle.']);
      if (m.k4Wut) z.push(['erzaehler', 'Ein Schneeball trifft dich hart am Rücken. Jo. Er grinst nicht dabei.']);
      if (m.k4NoahVerteidigt) z.push(['noah', '(hinter dem Wall, außer Atem) Danke. Wegen Mittwoch.']);
      else if (m.k4NoahVerdacht) z.push(['erzaehler', 'Noah wirft nicht mit. Er steht am Rand. Seit Mittwoch reden sie über ihn.']);
      z.push(['erzaehler', 'Drüben bei der 7P1 lacht Dario. Laut. Zum ersten Mal diese Woche.']);
      return z;
    },
  };
  // Plan festlegen: Rot und Gelb (je ein Werkzeug). Kopf für Rot geht – aber man merkt im Test, dass es nicht wirkt.
  const bei = (id) => { const w = (M().k4Wirkung || {})[id]; if (!w) return ' · nicht probiert'; return WERKZEUGE4[id].kopf ? ' · nur bei Gelb' : ' · wirkt auf Rot'; };
  const planIds = () => { const ids = Object.keys(M().k4Wirkung || {}); for (const x of ['atmen', 'zaehlen']) if (!ids.includes(x)) ids.push(x); ids.sort((a, b) => (WERKZEUGE4[a].kopf ? 1 : 0) - (WERKZEUGE4[b].kopf ? 1 : 0)); return ids.slice(0, 4); };   // Körper zuerst, höchstens vier   // höchstens vier Knöpfe
  for (const id of Object.keys(WERKZEUGE4)) {
    T['n4_rot_' + id] = () => { const m = M(); m.k4Plan = { ...(m.k4Plan || {}), rot: id }; if (WERKZEUGE4[id].kopf) { m.k4PlanKopfRot = true; return [['kaya', 'Ein Kopf-Werkzeug für Rot. Hast du das auf Rot ausprobiert? … Nimm es mit. Am Mittwoch siehst du, ob es geht.']]; } return [['kaya', 'Körper zuerst. Gut.']]; };
    T['n4_gelb_' + id] = () => {
      const S = c.S, m = M(); m.k4Plan = { ...(m.k4Plan || {}), gelb: id };
      S.skillsHeft = S.skillsHeft || [];
      const karte = { kap: 4, titel: 'Mein Ampelplan', punkte: ['Rot (7–10): ' + werkzeugName(m.k4Plan.rot), 'Gelb (4–6): ' + werkzeugName(id), 'Erst runter mit dem Körper. Dann denken.', 'Ausprobiert am Montag, im Frost.'] };
      S.skillsHeft = S.skillsHeft.filter((x) => x.titel !== 'Mein Ampelplan').concat([karte]);
      c.ui.toast('<b>🚦 Mein Ampelplan</b><span>Rot: ' + werkzeugName(m.k4Plan.rot) + ' · Gelb: ' + werkzeugName(id) + '</span>', 'ly-t-ent');
      return [];
    };
  }
  return T;
};

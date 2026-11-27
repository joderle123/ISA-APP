// Storyline 7e „@annexe.cam“ – Kapitel 1 „Das Foto“ (Umbau nach der Jugend-Kritik, Runde 2). EIN Tag: Montag.
// Verdecktes Thema: Ankommen – und wie schnell man über ein Foto lacht, bevor man selbst eins ist.
// Mechaniken: Vorausblende (dein Foto, 13:31) · Suchbild an der Haltestelle (wer hatte ein Handy?) · Pause = ein Ort (mit Störung
// und „Währenddessen“) · Rot-Modus beim eigenen Foto · Suchbild „Wer hat kein Handy?“ · Verdachts-Wand · DM um 23:12.
// Spuren: Dario hält das Handy (7:26) und schaut um 13:31 als Einziger nicht aufs Handy. Lina (die unbekannte Nummer) hat die Treppe
// gezeichnet. Kenan ist die falsche Fährte. Spitzname „Hinten links“ (Sitzplatz) – so braucht kein Text „er“ oder „sie“.
import { S1_ANKOMMEN } from './skills-j1.js';
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
// Haltestelle, 7:25: drei Leute mit Handy in der Hand (Dario, Lina, Kenan). Rafa schläft auf der Bank.
// (Bank: Sitze bei x −23,2 / −22 / −20,8; Opa Nik sitzt immer bei −23,2. Hinter dem Glas die Mauer.)
const HALTESTELLE = { dario: [-19.4, 42.7, -1.9, 'handy'], lina: [-27.4, 40.9, 1.0, 'handy'], kenan: [-25.0, 43.2, -1.6, 'handy'], fahrer: [-11.2, 44.6, -Math.PI / 2], rafa: [-20.8, 41.85, 0, 'schlaeft'] };
// Sport (nur wenn Unterricht eingeschaltet): Paare stehen beieinander
const SPORT_HALLE = { sommer: [45.2, -12.6, Math.PI], yusuf: [43.2, -15.4, 0.3], jo: [47.7, -21.5, -2.6], noah: [46.6, -22.5, 2.9], ben: [42, -16.6, 0.4], ayla: [50.2, -17.6, -0.3], lina: [51.4, -11.5, -0.8], chiara: [52.2, -16.2, -0.6], mila: [52.4, -14.2, -1.2] };
// Große Pause: vier Orte. Noah steht am Zaun – den sieht man nur im „Währenddessen“.
const PAUSE_HOF = { ben: [4, 14, 0.6, 'handy'], jo: [5.2, 15.4, -2.4, 'handy'], mila: [-20, 11.6, Math.PI, 'sitzt'], noah: [-14, 12.2, -0.29], ayla: [-20, 34.3, Math.PI], chiara: [2, 18.4, 0.6, 'handy'], rafa: [-6.4, 21.6, 2.2], lina: [-10.6, 15.4, 2.59], yusuf: [27.4, 21.0, -1.2] };
// 13:30 auf dem Hof: alle mit Handy. Nur Dario nicht – er schaut zu dir.
const HOF_1330 = { jo: [3.4, 8.6, 2.8, 'handy'], ben: [4.8, 9.6, -2.3, 'handy'], ayla: [-2.4, 9.8, 2.2, 'handy'], chiara: [-3.8, 9.0, 0.9, 'handy'], kenan: [6.6, 13.2, -2.5, 'handy'],
  mila: [-6.0, 12.6, 2.6, 'handy'], dario: [1.0, 13.0, Math.PI], lina: [-10.6, 15.4, 2.59, 'handy'], hoffmann: [4.6, 11.8, -2.2], yusuf: [-1.8, 15.2, 2.6] };
const KANTINE = { kremer: [26.8, -9, -Math.PI / 2], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], dario: [21.4, -13.2, 0.9], kenan: [21.0, -12.0, 1.2] };
export const SCHRITTE_N1 = [
  { id: 'ankunft', kap: 1, tag: 'Montag', uhr: 7.42, titel: 'Klick', ziel: 'Der Junge in Orange schaut rüber. Sprich ihn an.', marker: 'dario',
    start: { teleport: 'busAnkunft', gespraech: 'n1_intro' },
    leute: HALTESTELLE,
    fertig: { reden: 'dario', gespraech: 'n1_dario' } },
  { id: 'klasse', kap: 1, tag: 'Montag', uhr: 8.08, titel: 'Hinten links', ziel: 'Saal 1.04. Deine Klassenlehrerin wartet.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n1_klasse' } },
  // Fachstunde nur, wenn die Lehrperson den Unterricht in der Geschichte einschaltet (sonst freiwillig: 🎟 → Stunden)
  { id: 'k1_deutsch', kap: 1, tag: 'Montag', uhr: 8.9, neben: 'fach', titel: 'Deutsch', ziel: 'Gleicher Saal. Jetzt Deutsch bei Mme Nouvelle.', marker: 'nouvelle',
    leute: { nouvelle: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'nouvelle', gespraech: 'n1_deutsch' } },
  // Pause = ein Ort. Man sieht vier Orte live und geht an EINEN. Mittendrin passiert etwas am Brunnen.
  { id: 'pause', kap: 1, tag: 'Montag', uhr: 10.0, titel: 'Große Pause', ziel: 'Fünfzehn Minuten. Wo bist du?', marker: null,
    start: { teleport: 'eingangHof', gespraech: 'n1_pause' },
    leute: PAUSE_HOF,
    fertig: { nachStart: true } },
  // Skills (nur wenn eingeschaltet): Ankommen, dann Blind-Parcours auf dem Hof
  { id: 'k1_skills', kap: 1, tag: 'Montag', uhr: 10.9, neben: 'skills', titel: 'Skills: Ankommen', ziel: 'Geh in die Aula. Herr Kuedes wartet mit einem Ball.', marker: 'kaya',
    start: { teleport: 'eingangHof', gespraech: 'n1_checkin' },
    leute: { kaya: [-14.50, -65.40, 0.00], noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] },
    fertig: { reden: 'kaya', gespraech: 'n1_skills' } },
  { id: 'k1_blind', kap: 1, tag: 'Montag', uhr: 11.6, neben: 'skills', titel: 'Skills: Blind-Parcours', ziel: 'Auf den Hof. Herr Kuedes hat Hütchen aufgebaut.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [2, 14, Math.PI], noah: [4, 13, -1.6], mila: [-1.6, 13.4, 1.4], ben: [3.2, 16.2, -2.4], lina: [-0.6, 16.4, 2.6], jo: [5.6, 15.4, -2], ayla: [-2.6, 15.8, 1.9] },
    fertig: { reden: 'kaya', gespraech: 'n1_blind' } },
  { id: 'kantine', kap: 1, tag: 'Montag', uhr: 12.17, titel: 'Mittag', ziel: 'Hol dir ein Essen an der Ausgabe.', marker: 'kremer',
    start: { teleport: 'kantineTuer' },
    leute: KANTINE,
    fertig: { ort: 'kantineAusgabe', r: 1.8, gespraech: 'n1_kantine' } },
  { id: 'tisch', kap: 1, tag: 'Montag', uhr: 12.25, titel: 'Wohin setzen?', ziel: 'Tablett in der Hand. Wohin?', marker: null,
    start: { gespraech: 'n1_tisch' },
    leute: KANTINE,
    fertig: { nachStart: true } },
  // 13:30: Das Foto kommt. Rot-Modus. Wer hat kein Handy in der Hand? Zwei Sätze im Vorbeigehen (Ben, Lina) – der Abend zeigt, was stimmte.
  { id: 'k1_foto', kap: 1, tag: 'Montag', uhr: 13.5, titel: 'Das Foto', ziel: 'Mittagspause auf dem Hof. Überall summen die Handys.', marker: null,
    start: { teleport: 'eingangHof', gespraech: 'n1_foto' },
    leute: HOF_1330,
    fertig: { nachStart: true } },
  { id: 'k1_sport', kap: 1, tag: 'Montag', uhr: 14.1, neben: 'skills', titel: 'Sport: Wer führt, trägt', ziel: 'Turnhalle. Frau Sommer hat Hütchen und Bänke aufgebaut.', marker: 'sommer',
    start: { teleport: 'turnhalleTuer' },
    leute: SPORT_HALLE,
    fertig: { reden: 'sommer', gespraech: 'n1_sport' } },
  // 15:30 Haltestelle (Dario), 19:30 Klassenchat, 23:07 die Nummer, Verdachts-Wand, 23:12 eine DM
  { id: 'heimweg', kap: 1, tag: 'Montag', uhr: 15.5, titel: 'Nach Hause', ziel: 'Geh zum Bus. Dario sitzt schon da.', marker: 'dario',
    start: { teleport: 'eingang' },
    leute: { fahrer: [-11.2, 44.6, -Math.PI / 2], dario: [-21.5, 41.6, -1.6, 'sitzt'], lina: [-25.6, 44.4, 0.8] },
    fertig: { reden: 'dario', gespraech: 'n1_heimweg' } },
];

// ---------- Was das Foto zeigt (Bildbeschreibung für Vorlesen/Rückblick) ----------
const PAUSE_BILD = {
  brunnen: 'Du, am Brunnen. Von schräg oben.', handy: 'Du, mit Ben und Jo über ein Handy gebeugt. Von oben.', korb: 'Du, am Korb. Mitten im Wurf.',
  rundlauf: 'Du, am Tischtennis-Tisch. Mitten im Schlag.', allein: 'Du, mitten auf dem Hof. Von schräg oben.',
};
const PAUSE_SATZ = {
  brunnen: 'In der großen Pause warst du am Brunnen.', handy: 'In der großen Pause warst du bei Ben und Jo am Handy.', korb: 'In der großen Pause warst du am Korb.',
  rundlauf: 'In der großen Pause hast du Tischtennis gespielt.', allein: 'In der großen Pause warst du allein unterwegs.',
};
// Kantine: drei Plätze (Live-Bilder). Danach sitzt du dort (tu 'gegessen').
const TISCH_NOAH = [
  ['noah', '(schaut kurz hoch) … Ist frei.'],
  { wahl: [
    { t: '„Was zeichnest du?“', staerke: 'zuhoeren', herz: { noah: 2 }, merke: 'noahTurmGefragt', dann: [['noah', 'Den Kirchturm. Von Junglinster. Aus Bausteinen.'], ['noah', 'Die Uhr ist das Schwerste. Zwölf Steine, kein Fehler.']] },
    { t: '(Hinsetzen. Essen.)', herz: { noah: 1 }, dann: [['erzaehler', 'Ihr esst. Er zeichnet weiter. Einmal dreht er das Blatt ein Stück zu dir.']] },
  ] },
  { tu: 'n1_tischNoah' },
  { tu: 'gegessen' },
];
const TISCH_BEN = [
  ['ben', '(schaut hoch) Oh. Hinten links. Setz dich.'],
  ['jo', '(ohne aufzusehen) Der Kleine von der Bank hat schon dreihundert Stimmen.'],
  { tu: 'n1_tischBen' },
  { tu: 'gegessen' },
];
const TISCH_MILA = [
  ['mila', '(nimmt einen Hörer raus) Hm?'],
  { wahl: [
    { t: '„Was hörst du?“', herz: { mila: 2 }, merke: 'milaGefragt1', dann: [['mila', 'Regen. Zehn Stunden Regen.'], ['mila', '(hält dir einen Hörer hin) Hilft gegen Kantine.']] },
    { t: '(Einfach essen.)', herz: { mila: 1 }, dann: [['mila', '(nickt. Hörer wieder rein.)']] },
  ] },
  { tu: 'n1_tischMila' },
  { tu: 'gegessen' },
];
// Andere Sicht (einmal im Kapitel): Noah in der Kantine. Was er von dir gesehen hat, hängt von deinem Ort ab.
const NOAH_SIEHT = (m) => [
  m.rafaGeholfen ? 'In der Pause: Hinten links hat sich zu dem Kleinen vom Foto gesetzt.' : ({ rundlauf: 'In der Pause: Hinten links hat mit Ayla gespielt.', korb: 'In der Pause: Hinten links war am Korb. Da, wo es laut ist.',
    handy: 'In der Pause: Hinten links stand bei Ben und Jo.', brunnen: 'In der Pause: Hinten links war am Brunnen.' }[m.duPausePlatz] || 'In der Pause: Hinten links. Neu.'),
  m.kantineNoah ? 'Und jetzt sitzt hinten links bei mir. Einfach so.' : m.kantineMila ? 'Jetzt bei Mila. Auch okay.' : 'Jetzt bei Ben und Jo. Klar.',
  m.kantineNoah ? 'Mal sehen, ob morgen auch.' : 'Ich ess schneller. Dann ist es kürzer.',
];
// Rückblick in Bildern: echte Bilder aus dem eigenen Spiel
export const RUECKBLICK_N1 = (m) => [
  { id: 'rafaBank', titel: '7:26 · Das erste Foto', text: 'Rafa. Eingeschlafen. Mit Gerd auf dem Kopf.' },
  { id: 'haltestelleKlick', titel: 'Drei Handys', text: 'Dario, Lina, Kenan. Einer hat fotografiert.' },
  m.duPausePlatz ? { id: 'duPause', titel: '10:05 · Dein Platz', text: (PAUSE_SATZ[m.duPausePlatz] || '') + ' Genau dieses Bild hat @annexe.cam gepostet.' } : null,
  { id: 'auchPause', titel: 'Das war auch', text: m.rafaGeholfen ? 'Noah am Zaun. Die ganze Pause allein.' : 'Rafa am Brunnen. Allein mit dem Foto.', auch: true },
  { id: 'hofAlle', titel: '13:31 · Alle am Handy', text: m.darioSchautGesehen ? 'Alle am Handy. Nur Dario hat zu dir geschaut.' : 'Alle am Handy. Fast alle.' },
  { id: 'duAbend', titel: '15:30 · Haltestelle', text: 'Der Bus nach Hause.' },
].filter(Boolean);

// ---------- Live-Chat: zum ersten Mal im Klassenchat ----------
const CHAT_NEU = {
  titel: '7P2', mitglieder: 21, dauer: 18,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Chiara hat dich hinzugefügt.' },
    { nach: 1.6, wer: 'Ayla', text: 'moien 👋' },
    { nach: 3.0, wer: 'Jo', text: 'wer ist das' },
    { nach: 4.4, wer: 'Ben', text: 'hinten links. neu' },
    { nach: 6.2, wer: 'Chiara', text: 'Willkommen. Hausaufgaben stehen immer oben angepinnt.' },
    { nach: 8.0, system: true, text: 'gesehen von 14' },
    { nach: 11.5, wer: 'Jo', text: 'hinten links schreibt nix. ok', wennNicht: 'geschrieben' },
  ],
  aktionen: [
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„moien“', setzt: ['geschrieben', 'nett'], ich: 'moien', folgen: [{ nach: 1.2, wer: 'Ayla', text: '👋' }] },
      { t: '„danke chiara“', setzt: ['geschrieben', 'chiara'], ich: 'danke chiara', folgen: [{ nach: 1.3, wer: 'Chiara', text: 'Gern. Bei Fragen: fragen.' }] },
    ] },
    { id: 'sticker', t: 'Winke-Sticker', symbol: '👋', setzt: ['geschrieben', 'nett'], ich: '👋' },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm.', ende: true },
  ],
};

// ---------- Live-Chat Montagabend: Ben leitet weiter ----------
const POST_TABLETT = (m) => ({
  titel: '7P2', mitglieder: 21, dauer: 30,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Ben hat einen Beitrag weitergeleitet.' },
    { nach: 1.4, wer: '@annexe.cam', bild: PAUSE_BILD[m.duPausePlatz] || PAUSE_BILD.allein, bildId: 'duPause', text: 'neu hier. cool oder cringe? 👀', lacher: { start: 3, proSek: 0.35, stopp: ['klar', 'gemeldet'] } },
    { nach: 3.6, wer: 'Jo', text: '58% cringe gerade' },
    ...(m.fotoTidderich ? [{ nach: 4.6, wer: 'Ayla', text: 'tidderich hat heute was von „fotos ohne fragen“ gesagt. zufall?' }] : []),
    { nach: 5.6, wer: 'Mila', text: 'ben. lösch das.' },
    { nach: 7.2, system: true, text: 'gesehen von 17' },
    ...(m.abgestimmt ? [{ nach: 9.4, wer: 'Jo', text: 'heute morgen war der aus dem bus dran. jetzt hinten links' }] : [{ nach: 9.4, wer: 'Jo', text: 'chill. ist nur ein klick' }]),
    { nach: 12.5, system: true, text: 'Ben hat eine Nachricht gelöscht.' },
    { nach: 14.5, wer: 'Ayla', text: 'wer macht diesen account überhaupt', wennNicht: 'stumm' },
    ...(m.kantineNoah ? [{ nach: 18, wer: 'Noah', text: 'Ich hab nicht abgestimmt.' }] : []),
    { nach: 22, system: true, text: 'gesehen von 19' },
  ],
  aktionen: [
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„Bitte löscht das.“', setzt: 'klar', ich: 'bitte löscht das', folgen: [{ nach: 1.4, wer: 'Ayla', text: 'ok. hab ich nicht geteilt' }] },
      { t: '„haha. schlechtes foto.“', setzt: 'witz', ich: 'haha. schlechtes foto.', folgen: [{ nach: 1.2, wer: 'Jo', text: 'ok das ist gut 😂' }] },
      { t: '„Wer ist @annexe.cam?“', setzt: 'frage', ich: 'wer ist annexe.cam?', folgen: [{ nach: 1.6, wer: 'Jo', text: 'keiner weiß das. das ist ja der witz' }] },
    ] },
    { id: 'beweis', t: 'Screenshot', symbol: '📸', setzt: 'beweis', sys: 'Screenshot gespeichert. 19:31.' },
    { id: 'melden', t: 'Beitrag melden', symbol: '🚩', setzt: 'gemeldet', sys: 'Meldung eingegangen.' },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm. Das Handy liegt still. Du nicht.', ende: true },
  ],
});

// Zwei Minuten später: Ben privat. Wer sein Display gesehen hat (📎), kann es sagen.
const BEN_SORRY = (m) => ({
  titel: 'Ben', mitglieder: 2, dauer: 12,
  nachrichten: [
    { nach: 0.6, wer: 'Ben', text: 'sorry. hab nicht nachgedacht. echt.' },
    { nach: 8.5, system: true, text: 'Ben tippt …', wennNicht: 'geantwortet' },
  ],
  aktionen: [
    { id: 'antwort', t: 'Antworten', symbol: '💬', wahl: [
      { t: '„Schon okay.“', setzt: ['geantwortet', 'okay'], ich: 'schon okay', folgen: [{ nach: 1.2, wer: 'Ben', text: 'danke. nächstes mal denk ich erst' }] },
      { t: '„Warum leitest du so was weiter?“', setzt: ['geantwortet', 'frage'], ich: 'warum leitest du so was weiter?', folgen: [{ nach: 1.8, wer: 'Ben', text: 'weiß nicht. alle machen das. ich hab nicht gedacht, dass du es bist' }] },
      { t: '„Nicht okay. Aber danke.“', setzt: ['geantwortet', 'klar'], ich: 'nicht okay. aber danke dass du schreibst', folgen: [{ nach: 1.4, wer: 'Ben', text: 'ja. fair' }] },
      { t: '„Du hast gesagt: nicht geteilt.“', setzt: ['geantwortet', 'klar', 'luege'], ich: 'du hast gesagt, du hast es nicht geteilt', folgen: [{ nach: 1.6, wer: 'Ben', text: 'ja. hab gelogen. sorry.' }] },
    ] },
    { id: 'gelesen', t: 'Auf „gelesen“ lassen', symbol: '👀', setzt: 'ignoriert', sys: 'Gelesen 19:34', ende: true },
  ],
});

// ---------- 23:07: die unbekannte Nummer (Lina). Sechs Sekunden, dann gelöscht. ----------
const NUMMER = {
  titel: '+352 6•• ••• •41', mitglieder: 2, dauer: 20,
  nachrichten: [
    { nach: 0.8, wer: 'Unbekannt', text: 'ich hab gesehen, wer das foto gemacht hat' },
    { nach: 6.8, system: true, text: 'Diese Nachricht wurde gelöscht.', setzt: 'geloescht' },
  ],
  aktionen: [
    { id: 'beweis', t: 'Screenshot', symbol: '📸', wennNicht: 'geloescht', setzt: 'beweis', sys: 'Screenshot gespeichert. 23:07.' },
    { id: 'antwort', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„wer bist du?“', setzt: ['geschrieben', 'fordernd'], ich: 'wer bist du?', folgen: [{ nach: 1.6, system: true, text: '✓✓ gesehen' }] },
      { t: '„was hast du gesehen?“', setzt: ['geschrieben', 'frage'], ich: 'was hast du gesehen?', folgen: [{ nach: 1.6, system: true, text: '✓✓ gesehen' }] },
      { t: '„alles ok bei dir?“', setzt: ['geschrieben', 'sanft'], ich: 'alles ok bei dir?', folgen: [{ nach: 1.6, system: true, text: '✓✓ gesehen' }] },
    ] },
    { id: 'block', t: 'Blockieren', symbol: '⛔', setzt: 'blockiert', sys: 'Blockiert.', ende: true },
  ],
};
// 23:12: @annexe.cam schreibt dir. Der erste Satz ist Darios Satz von 15:30 (eine leise Spur über die Sprache).
const DM = (m) => ({
  titel: '@annexe.cam', mitglieder: 2, dauer: 13,
  nachrichten: [
    { nach: 1.0, wer: '@annexe.cam', text: 'morgen ist wer anders dran.' },
    { nach: 4.6, wer: '@annexe.cam', text: 'schlaf gut, hinten links 👀' },
    { nach: 9.0, system: true, text: '@annexe.cam ist offline.' },
  ],
  aktionen: [
    { id: 'beweis', t: 'Screenshot', symbol: '📸', setzt: 'beweis', sys: 'Screenshot gespeichert. 23:12.' },
    { id: 'zeigen', t: 'Morgen jemandem zeigen', symbol: '🙋', setzt: 'zeigen', sys: 'Gemerkt: morgen zeigen.' },
    { id: 'antwort', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„wer bist du?“', setzt: ['geschrieben', 'frage'], ich: 'wer bist du?', folgen: [{ nach: 1.4, system: true, text: '✓✓ gesehen' }] },
      { t: '„lass mich in ruhe.“', setzt: ['geschrieben', 'klar'], ich: 'lass mich in ruhe.', folgen: [{ nach: 1.4, system: true, text: '✓✓ gesehen' }] },
    ] },
    { id: 'block', t: 'Blockieren', symbol: '⛔', setzt: 'blockiert', sys: 'Blockiert. Das Handy ist still.', ende: true },
  ],
});

// ---------- Pause: vier Orte. Jeder Ort hat sein Spiel – und mittendrin passiert etwas mit Rafa. ----------
// Rafa hat das Foto gesehen: du gehst hin (aus der Pause raus) oder bist schon da (Brunnen)
const RAFA_HIN = [
  { hin: { du: [-8.4, 21.5, 1.5], rafa: [-6.4, 21.6, -1.6, 'handy'] } },
  ['rafa', '(ohne aufzuschauen) Rafa. 5e. Das da bin ich.'],
  { handy: { wer: '@annexe.cam', wann: 'vor 2 Std.', fotoId: 'rafaBank', alt: 'Ein kleiner Junge schläft an der Haltestelle. Mund offen.',
    text: 'neu in der 5e. eingepennt 😴 cool oder cringe?', umfrage: { a: 'cringe', b: 'cool', pa: 71, stimmen: 88, live: true } } },
  ['rafa', 'Mit offenem Mund. Einundsiebzig Prozent.'],
  { wahl: [
    { t: '„Das ist nicht okay.“', staerke: 'klar', herz: { rafa: 1 }, merke: ['rafaGeholfen', 'rafaKlar'], dann: [['rafa', 'Sagt sich leicht.'], ['erzaehler', 'Aber er steckt das Handy weg.']] },
    { t: '„Komm. Zu Herrn Kuedes.“', staerke: 'hilfe', herz: { rafa: 2 }, merke: ['rafaGeholfen', 'rafaKuedes'], dann: [['rafa', '(schluckt) Kommst du mit rein?'], ['erzaehler', 'Ihr geht zusammen zum SePAS. Herr Kuedes hört zu. Dann macht er die Tür zu.'], ['kaya', 'Danke, dass ihr kommt. Ich kümmere mich. Ohne Namen.']] },
    { t: '„Wenigstens schläfst du gut.“', staerke: 'humor', herz: { rafa: 1 }, merke: ['rafaGeholfen', 'rafaWitz'], dann: [['rafa', '(lacht kurz durch die Nase) Besser als in Mathe.'], ['rafa', '… Danke.']] },
    { t: '(Neben ihn setzen.)', herz: { rafa: 1 }, merke: ['rafaGeholfen', 'rafaDaneben'], dann: [['erzaehler', 'Ihr sitzt. Keiner sagt was. Irgendwann atmet er aus.'], ['rafa', 'Danke.']] },
  ] },
  { handy: null },
  { hin: { rafa: [-6.4, 21.6, 2.2] } },
];
// Störung: Bild von Rafa mit dem Handy. „Zu Rafa“ kostet etwas – du lässt jemanden stehen.
const stoerRafa = (hier, bleib, kosten, bleibHerz = {}) => [
  { hin: { rafa: [-6.4, 21.6, 2.2, 'handy'] } },
  { szene: 'stoerung', id: 'stoerRafa', pruefe: false,
    def: { bild: { wer: 'rafa', von: [-1.7, 1.55, -1.8], auf: [0, 1.05, 0], fov: 38 }, t: 'Am Brunnen. Der Junge von der Bank starrt auf ein Handy.', hin: 'Zu ihm', bleib, zeit: 8 },
    ausgang: (r) => (r.hin ? 'hin' : 'bleib'),
    folgen: { hin: { merke: 'pauseZuRafa', herz: kosten, dann: [...hier, ...RAFA_HIN] }, bleib: { merke: 'pauseBlieb', herz: bleibHerz } } },
];
const PAUSE_TT = [
  { hin: { du: [-20, 30.1, 0] } },
  ['ayla', 'Endlich! Die Wand gewinnt immer.'],
  { tu: 'tt3d', mit: 'ayla' },
  ['ayla', '(grinst) Revanche. Sofort.'],
  ...stoerRafa([['ayla', 'Ey! Mitten im Spiel?']], 'Revanche spielen', { ayla: -1 }, { ayla: 1 }),
  { wenn: (m) => m.pauseBlieb, dann: [['ayla', 'Aufschlag du.'], { blende: 'Zwei Sätze später' }, ['ayla', 'Okay. Morgen wieder. Du bist gebucht.']] },
];
const PAUSE_KORB = [
  { hin: { du: [25.4, 18.6, 0.7] } },
  ['yusuf', '(wirft dir den Ball zu) Fünf Würfe. Wer weniger trifft, holt die Bälle.'],
  { tu: 'n1_freiwurf' },
  ...stoerRafa([['yusuf', '(zuckt mit den Schultern) Geh ruhig. Ich werf allein. Wie immer.']], 'Weiterwerfen', { yusuf: -1 }, { yusuf: 1 }),
  { wenn: (m) => m.pauseBlieb, dann: [['yusuf', 'Noch fünf. Diesmal zählt’s.']] },
];
// Ben und Jo: der Sog. Abgestimmt ist schon – jetzt soll man kommentieren. (Rafa kommt danach im „Währenddessen“.)
const PAUSE_HANDY = [
  { hin: { du: [2.6, 15.8, 2.48] } },
  ['jo', '(lacht) Einundsiebzig Prozent! Guck die Kommentare.'],
  { handy: { wer: '@annexe.cam', wann: 'vor 2 Std.', fotoId: 'rafaBank', alt: 'Ein kleiner Junge schläft an der Haltestelle. Mund offen.',
    text: 'neu in der 5e. eingepennt 😴 · 14 Kommentare: „😂😂“ „sabber alarm“ „wer ist das“', umfrage: { a: 'cringe', b: 'cool', pa: 71, stimmen: 88, live: true } } },
  { szene: 'stoerung', id: 'sogKommentar', pruefe: false,
    def: { t: 'Jo: „Schreib was drunter. Irgendwas.“', hin: '💬 „😂“ posten', bleib: 'Nichts schreiben', zeit: 8 },
    ausgang: (r) => (r.hin ? 'klick' : 'nicht'),
    folgen: {
      klick: { merke: 'kommentiert', herz: { jo: 1 }, dann: [['jo', 'Fünfzehn Kommentare. Einer davon du.'], ['erzaehler', 'Unter deinem Namen. Für alle sichtbar.']] },
      nicht: { merke: 'nichtKommentiert', dann: [
        { wahl: [
          { t: '„Wer macht so was?“', merke: 'umfrageGefragt', dann: [['jo', 'Keiner weiß es. Das ist ja das Krasse.']] },
          { t: '„Der sitzt da drüben.“', merke: 'rafaGezeigt', herz: { jo: -1, ben: 1 }, staerke: 'mut', dann: [['ben', '(schaut rüber) Oh. Der ist ja winzig.'], ['jo', '(dreht das Handy weg) Ups.']] },
          { t: 'Handy zurückgeben.', dann: [['jo', 'Langweilig. Okay.']] },
        ] }] },
    } },
  { handy: null },
  ['jo', '(scrollt weiter) Nächster Post.'],
];
// Am Brunnen: Lina zeichnet, Rafa sitzt am Rand. Du bist da, wenn es passiert. Und du hörst die Treppe.
const PAUSE_BRUNNEN = [
  { hin: { du: [-9.2, 19.9, 2.2] } },
  ['erzaehler', 'Lina zeichnet. Als du kommst, klappt sie das Heft halb zu.'],
  ['lina', '(leise) … Hi.'],
  { wahl: [
    { t: '„Was zeichnest du?“', dann: [['lina', 'Nur den Hof.']] },
    { t: '(Danebenstellen.)', herz: { lina: 1 }, merke: 'linaDaneben', dann: [['erzaehler', 'Sie zeichnet weiter. Einmal schiebt sie das Heft ein Stück zu dir.']] },
  ] },
  { ton: 'kamera' },
  ['erzaehler', 'Klick. Von der Treppe. Leise, aber du hörst es.'],
  ['lina', '(ohne aufzuschauen) Du hast es auch gehört.'],
  ['erzaehler', 'Oben auf der Treppe dreht sich einer weg. Groß. Mütze.'],
  { beweis: 'k1Treppe', t: 'Klick von der Treppe, 10:05.' },
  { verdacht: 'kenan', spur: 'Stand um 10:05 oben auf der Treppe. Dann der Klick.' },
  ['erzaehler', 'Zwei aus der 6e halten Rafa ein Handy hin. Sie lachen.'],
  ...RAFA_HIN,
];
const PAUSE_BILDER = {
  tt: { wer: 'ayla', von: [3.0, 2.3, -4.6], auf: [0, 0.9, -1.9], fov: 50 },
  korb: { wer: 'yusuf', von: [-3.6, 2.1, -3.2], auf: [0, 1.5, 0], fov: 50 },
  handy: { wer: 'ben', von: [-2.6, 1.8, 2.6], auf: [0.6, 1.25, 0.7], fov: 44 },
  brunnen: { wer: 'lina', von: [-2.2, 2.0, -2.8], auf: [2.6, 1.0, 2.6], fov: 52 },
};

// ---------- Nur wenn Unterricht/Skills eingeschaltet: Check-in, Skills-Stunde, Blind-Parcours, Sport ----------
const CHECKIN_MI = {
  frage: 'Herr Kuedes will heute ein Wort von allen. Deins?',
  posts: [
    { wer: 'Ben', wort: 'hungrig', farbe: '#e9734a' }, { wer: 'Mila', wort: 'okay', farbe: '#5fb07a' },
    { wer: 'Jo', wort: 'müde. sehr.', farbe: '#5fb07a' }, { wer: 'Noah', wort: 'nervös? glaub ich', farbe: '#8a7bc8' },
  ],
  reaktion: (w, g) => (g === 'Angst' ? [{ wer: 'Noah', text: 'Same. Wir sind ein Team jetzt.' }]
    : g === 'Wut' ? [{ wer: 'Jo', text: 'same. mittwoch halt 😤' }]
    : g === 'Freude' ? [{ wer: 'Ben', text: 'nice. erzähl in der pause, wenn du magst' }]
    : g === 'Trauer' ? [{ wer: 'Ayla', text: '🫂' }]
    : [{ wer: 'Mila', text: 'Notiert.' }]),
};
const KLASSE_NAMEN = [
  { id: 'noah', name: 'Noah', farbe: '#3f78b8', geste: '🙋' }, { id: 'mila', name: 'Mila', farbe: '#2fb8a8', geste: '🧊' },
  { id: 'lina', name: 'Lina', farbe: '#9b7bc8', geste: '✏️' }, { id: 'jo', name: 'Jo', farbe: '#c0392b', geste: '🏎️' },
  { id: 'ben', name: 'Ben', farbe: '#d9a21b', geste: '🏀' }, { id: 'chiara', name: 'Chiara', farbe: '#3fa66b', geste: '📚' },
  { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0', geste: '🥋' }, { id: 'ayla', name: 'Ayla', farbe: '#e85d75', geste: '🎸' },
];
const PARTNER = {
  noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8', weib: true },
  ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8', weib: true },
  yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' }, sommer: { id: 'sommer', name: 'Frau Sommer', farbe: '#e07b39', weib: true },
};
// Noahs Sicht nach dem Sturz an der Bank: was er von dir mitbekommt (Kapitel 1, Sport)
const NOAH_SPORT = (m) => {
  const a = 'Dunkel. Die Bank. Meine Hände brennen.';
  if (m.sportJoStopp) return [a, 'Dann sagt jemand: „Er hat Stopp gesagt.“', 'Jemand hat es gehört. Ich hab es wirklich gesagt.'];
  if (m.sportJoNeu) return [a, 'Dann ist Jos Hand da. Ausgerechnet Jos.', 'Er sagt Sorry. Ich glaub, er meint es. Fast.'];
  if (m.sportNoahHand) return [a, 'Dann ist da eine Hand. Direkt vor mir.', 'Ich nehm sie. Ich weiß nicht mal genau, warum.'];
  if (m.sportSommer) return [a, 'Frau Sommer ruft alle zusammen. Alle schauen. Auf mich.', 'Gut, dass es jemand gesagt hat. Schlimm, dass alle schauen.'];
  if (m.sportGelacht) return [a, 'Sie lachen. Ich schau hoch. Du lachst auch.', 'Okay. Dann weiß ich das jetzt.'];
  if (m.sportJoWas) return [a, '„Jo, was soll das?“ Wenigstens einer.', 'Aber keiner weiß, dass ich Stopp gesagt hab.'];
  return [a, 'Alle sind beschäftigt. Keiner schaut her.', 'Vielleicht hab ich gar nicht laut genug Stopp gesagt.'];
};
const blindFolgen = (id) => ({
  ausgang: (r) => (r.angekommen && r.vertrauen >= 55 ? 'gut' : r.angekommen ? 'knapp' : r.hektik >= 2 ? 'hektik' : 'nicht'),
  folgen: {
    gut: { staerke: 'fuehren', herz: { [id]: 2 }, merke: 'blindGut', dann: BLIND_SATZ[id].gut },
    knapp: { herz: { [id]: 1 }, dann: BLIND_SATZ[id].knapp },
    hektik: { herz: { [id]: -1 }, merke: 'blindHektik', dann: BLIND_SATZ[id].hektik },
    nicht: { dann: BLIND_SATZ[id].nicht },
  },
});
const BLIND_SATZ = {
  noah: { gut: [['noah', 'Ich hab dir einfach vertraut. Das mach ich sonst nie.']], knapp: [['noah', 'Drei Hütchen erwischt. Aber wir sind angekommen.']], hektik: [['noah', 'Das war zu schnell für mich. Sorry.']], nicht: [['noah', 'Nicht geschafft. War trotzdem okay mit dir.']] },
  mila: { gut: [['mila', 'Klare Ansagen. Danke.']], knapp: [['mila', 'Links ist links. Nicht „ein bisschen links“.']], hektik: [['mila', 'Zu viele Befehle auf einmal. Ich hab abgeschaltet.']], nicht: [['mila', 'Nicht geschafft. Nächstes Mal sagst du weniger. Und genauer.']] },
  ben: { gut: [['ben', 'Tor! Ohne was zu sehen! Okay, das war gut.']], knapp: [['ben', 'Fast ein Hütchen gegessen. Aber angekommen.']], hektik: [['ben', 'Du hast mich angeschrien. Ich bin stehen geblieben.']], nicht: [['ben', 'Nicht geschafft. Egal. Nochmal irgendwann.']] },
  lina: { gut: [['lina', '(leise) Danke. Du hast nicht gehetzt.']], knapp: [['lina', '(lächelt) Ein bisschen wackelig. Aber okay.']], hektik: [['lina', '(nimmt die Binde ab) Kurz Pause. Bitte.']], nicht: [['lina', 'Es war trotzdem schön draußen.']] },
};


export const GESPRAECHE_N1 = {
  // 7:25. Erst die Zukunft (dein Foto, 13:31), dann zurück an die Haltestelle. Gerd landet, es macht Klick.
  n1_intro: [
    { foto: 'duVoraus', wer: 'du', von: [2.2, 1.7, 2.6], auf: [0, 1.0, 0], fov: 44 },
    { szene: 'voraus', id: 'voraus1', pruefe: false, def: { bild: 'duVoraus', konto: '@annexe.cam', zeit: '13:31', text: 'neu hier. cool oder cringe? 👀', du: 'Das bist du.',
      umfrage: { a: 'cringe', b: 'cool', von: 50, bis: 58 }, schnitt: 'Montag. 7:25.', unter: 'Sechs Stunden früher.' } },
    ['erzaehler', 'Erster Tag. Auf der Bank schläft ein kleiner Junge. Mund offen.'],
    { gerd: 'rafa', hoehe: 0.5, dx: 0.5 },
    ['erzaehler', 'Eine Taube pickt an seiner Tüte. Er merkt nichts.'],
    { foto: 'rafaBank', wer: 'rafa', von: [0.35, 1.0, 1.5], auf: [0.15, 0.8, 0], fov: 48 },
    { ton: 'kamera' },
    ['erzaehler', 'Klick.'],
    { szene: 'suchbild', id: 'such1', bildId: 'haltestelleKlick', pruefe: false,
      def: { wo: 'Haltestelle · 7:26', frage: 'Klick! Wer hat ein Handy in der Hand?', zeit: 11,
        foto: { von: [-16.9, 2.1, 47.3], auf: [-22.6, 1.0, 42.4], fov: 50 },
        gut: 'Alle drei. Einer davon hat fotografiert.', verpasst: 'Gelb: das hast du nicht gesehen.',
        ziele: [
          { id: 'dario', wer: 'dario', hoehe: 1.15, r: 0.055, t: 'Der in Orange', kurz: 'Der Junge in Orange hatte ein Handy in der Hand.', verdacht: 'dario', spur: 'Handy in der Hand. Haltestelle, 7:26.', beweis: 'k1Dario' },
          { id: 'lina', wer: 'lina', hoehe: 1.15, r: 0.05, t: 'Das Mädchen auf der Mauer', kurz: 'Das Mädchen auf der Mauer hatte ein Handy.', verdacht: 'lina', spur: 'Handy in der Hand. Haltestelle, 7:26.' },
          { id: 'kenan', wer: 'kenan', hoehe: 1.25, r: 0.05, t: 'Der Große mit Mütze', kurz: 'Der Große mit der Mütze hatte ein Handy.', verdacht: 'kenan', spur: 'Handy in der Hand. Haltestelle, 7:26.' },
          { id: 'rafa', wer: 'rafa', hoehe: 0.95, r: 0.06, richtig: false, t: 'Er schläft. Kein Handy.' },
        ] },
      ausgang: (r) => ((r.gefunden || []).length >= 3 ? 'alle' : (r.gefunden || []).length ? 'teil' : 'keiner'),
      folgen: {
        alle: { dann: [['erzaehler', 'Drei Handys. Ein Klick. Wer war es?']] },
        teil: { dann: [['erzaehler', 'Ein Klick. Und mehr Handys, als du gesehen hast.']] },
        keiner: { dann: [['erzaehler', 'Zu schnell. Aber irgendwer hat fotografiert.']] },
      } },
    { tu: 'n1_wandNeu' },
  ],
  n1_dario: [
    { hin: { dario: [-19.4, 42.7, 1.6] } },
    ['dario', '(steckt das Handy weg) Moien. Neu?'],
    { wahl: [
      { t: '„Ja. Erster Tag.“', herz: { dario: 1 }, merke: 'zeigtSich', dann: [['dario', 'Sieht man. Alle gucken am ersten Tag so.']] },
      { t: '„Hast du grad fotografiert?“', beweis: 'k1Dario', merke: 'darioGefragtMorgen', dann: [['dario', '(lacht) Gerd? Gerd ist berühmt hier. Jeder fotografiert Gerd.'], ['dario', 'Gerd hat mehr Follower als du.']] },
      { t: '(Nicken.)', dann: [['dario', 'Okay. Wenig Worte. Mag ich.']] },
    ] },
    { gerd: null },
    ['dario', 'Dario. 7P1. Annexe ist da hoch. Dann links.'],
    { foto: 'duAnkunft', wer: 'du', von: [2.0, 1.55, 2.4], auf: [0, 1.15, 0], fov: 46 },
    { tu: 'stundenplanTipp' },
  ],
  n1_klasse: [
    ['hoffmann', 'Moien. {name}? Ich bin Mme Tidderich. Deine Klassenlehrerin.'],
    ['hoffmann', 'Hinten links ist frei. Neben der Tür.'],
    { wenn: (m, S) => !S.stundenplan, dann: [{ tu: 'stundenplan' }] },
    { tu: 'spindFrei' },
    ['ben', '(dreht sich um) Moien. Ben. Nummer? Für den Klassenchat.'],
    { wahl: [
      { t: '(Nummer sagen.)', herz: { ben: 1 }, merke: 'nummerGegeben', dann: [['ben', '(tippt) „{name} 7P2“. Ich speicher alle so.']] },
      { t: '„Wozu?“', merke: 'nummerGezoegert', dann: [['ben', 'Raumwechsel. Hausaufgaben. Memes.'], ['ben', '(hält dir sein Handy hin) Tipp selbst.']] },
    ] },
    { szene: 'chat', id: 'chatNeu', def: CHAT_NEU,
      ausgang: (r) => (r.flags.stumm ? 'stumm' : r.flags.geschrieben ? 'geschrieben' : 'still'),
      folgen: { geschrieben: { staerke: 'kontakt', herz: { ayla: 1, chiara: 1 } }, stumm: { merke: 'gruppeStumm' }, still: { merke: 'nurGelesen' } } },
    ['ben', '(hält dir unter dem Tisch sein Handy hin) Kennst du den schon? Der Account.'],
    { handy: { wer: '@annexe.cam', wann: 'vor 30 Min.', fotoId: 'rafaBank', alt: 'Ein kleiner Junge schläft an der Haltestelle. Mund offen.',
      text: 'neu in der 5e. eingepennt 😴 cool oder cringe?', umfrage: { a: 'cringe', b: 'cool', pa: 62, stimmen: 27, live: true } } },
    ['erzaehler', 'Der Junge von der Bank. Von heute früh.'],
    ['ben', 'Ein Klick. Macht jeder.'],
    { wahl: [
      { t: '👆 „cringe“', merke: ['abgestimmt', 'abgestimmtCringe'], herz: { ben: 1 }, dann: [['ben', '(grinst) Dreiundsechzig.']] },
      { t: '👆 „cool“', merke: ['abgestimmt', 'abgestimmtCool'], dann: [['ben', 'Cool? Okay.']] },
      { t: 'Nicht klicken.', merke: 'nichtAbgestimmt', dann: [['ben', '(zuckt mit den Schultern) Langweilig.']] },
    ] },
    { handy: null },
    ['mila', '(vom Nebentisch, leise) Cool oder cringe – egal. Jeder Klick hilft dem Account.'],
    { wenn: (m) => !!m.abgestimmt, dann: [['erzaehler', 'Deine Stimme ist drin. Zurück geht nicht.']] },
    ['hoffmann', 'Kennenlernen. Jo, du warst doch auch mal neu.'],
    ['jo', '(grinst) Viermal. Vier Schulen. Ist halt so.'],
    ['erzaehler', 'Alle lachen. Jo am lautesten.'],
    { tu: 'n1_joSchule' },
    { tu: 'n1_vertragStill' },
    { tu: 'vertragPlakat' },
    { tu: 'n1_deutschRest' },
  ],
  // ---------- 10:00 Große Pause: vier Orte, du gehst an einen ----------
  n1_pause: [
    { szene: 'orte', id: 'pauseOrt', pruefe: false,
      def: { titel: 'Große Pause · 10:00', info: 'Fünfzehn Minuten. Du kannst nur an einem Ort sein.',
        orte: [
          { id: 'tt', sy: '🏓', name: 'Tischtennis', wer: 'Ayla sucht einen Gegner.', bild: PAUSE_BILDER.tt },
          { id: 'korb', sy: '🏀', name: 'Korb', wer: 'Yusuf wirft. Allein.', bild: PAUSE_BILDER.korb },
          { id: 'handy', sy: '📱', name: 'Ben und Jo', wer: 'Die lachen über irgendwas am Handy.', bild: PAUSE_BILDER.handy },
          { id: 'brunnen', sy: '⛲', name: 'Brunnen', wer: 'Das Mädchen mit dem Heft. Und der Junge von der Bank.', bild: PAUSE_BILDER.brunnen },
        ] },
      ausgang: (r) => r.ort,
      folgen: { tt: { merke: 'pauseTT', dann: PAUSE_TT }, korb: { merke: 'pauseKorbOrt', dann: PAUSE_KORB }, handy: { merke: 'pauseHandy', dann: PAUSE_HANDY }, brunnen: { merke: 'pauseBrunnen', dann: PAUSE_BRUNNEN } } },
    // Das Foto von dir: von der Treppe, genau da, wo du gerade bist (später postet es @annexe.cam)
    { tu: 'n1_pauseFoto' },
    // Währenddessen: was an einem anderen Ort passiert ist
    { tu: 'n1_waehrenddessen' },
    ['erzaehler', 'Es klingelt.'],
  ],
  // ---------- Kantine ----------
  n1_kantine: [
    ['kremer', 'Suppe oder Pasta? … Hier.'],
    { tu: 'tablett' },
    // Andere Sicht (einmal im Kapitel): Noah
    { wenn: (m) => m.duPausePlatz === 'handy', dann: [['ben', '(vom Fenster) Hinten links! Hier!']] },
    ['kremer', 'Such dir was. Wird kalt.'],
  ],
  // Wohin setzen? Drei Plätze, drei Live-Bilder. Erst danach: was Noah gesehen hat.
  n1_tisch: [
    { szene: 'orte', id: 'tischOrt', pruefe: false,
      def: { titel: 'Kantine · 12:15', info: 'Tablett in der Hand. Drei Plätze sind frei.',
        orte: [
          { id: 'noah', sy: '📐', name: 'Noah', wer: 'Allein in der Ecke. Zeichnet etwas.', bild: { wer: 'noah', von: [1.5, 1.45, 0.9], auf: [0, 0.95, 0], fov: 46 } },
          { id: 'ben', sy: '📱', name: 'Ben und Jo', wer: 'Am Fenster. Lachen übers Handy.', bild: { wer: 'ben', von: [-1.9, 1.4, 0.6], auf: [0, 0.95, 0.5], fov: 50 } },
          { id: 'mila', sy: '🎧', name: 'Mila', wer: 'Kopfhörer drin. Neben ihr ist frei.', bild: { wer: 'mila', von: [-1.7, 1.25, 0.7], auf: [0, 0.8, 0], fov: 48 } },
        ] },
      ausgang: (r) => r.ort,
      folgen: { noah: { dann: TISCH_NOAH }, ben: { dann: TISCH_BEN }, mila: { dann: TISCH_MILA } } },
    { sicht: (m) => ({ wer: 'noah', name: 'Noah', auf: 'du', gedanken: NOAH_SIEHT(m) }) },
  ],
  // ---------- 13:30: Das Foto kommt ----------
  n1_foto: [
    ['erzaehler', '13:30. Die Sonne ist raus. Der Hof ist voll.'],
    { ton: 'summen' },
    ['erzaehler', 'Dann summt es. Bei allen. Gleichzeitig.'],
    { handy: (m) => ({ wer: '@annexe.cam', wann: 'gerade eben', fotoId: 'duPause', alt: PAUSE_BILD[m.duPausePlatz] || PAUSE_BILD.allein,
      text: 'neu hier. cool oder cringe? 👀', umfrage: { a: 'cringe', b: 'cool', pa: 58, stimmen: 9, live: true } }) },
    ['erzaehler', 'Das bist du. Heute. In der Pause. Von oben.'],
    { pult: { g: 'Scham', w: 8 } },
    ['jo', '(laut) Hinten links! Bist du das?'],
    { handy: null },
    { szene: 'suchbild', id: 'such2', bildId: 'hofAlle', pruefe: false,
      def: { wo: 'Hof · 13:31', frage: 'Alle starren aufs Handy. Einer schaut DICH an. Wer?', zeit: 10, finde: 1,
        foto: { von: [0, 1.62, 3.4], auf: [0.4, 1.3, 13], fov: 56 },
        gut: 'Dario. Kein Handy. Er schaut zu dir.', verpasst: 'Gelb: der, der dich anschaut.',
        ziele: [
          { id: 'dario', wer: 'dario', hoehe: 1.25, r: 0.06, t: 'Dario. Kein Handy. Schaut zu dir.', kurz: 'Dario. Kein Handy in der Hand. Er schaut zu dir.', verdacht: 'dario', spur: 'Schaut um 13:31 zu dir. Kein Handy draußen.', beweis: 'k1DarioSchaut' },
          { id: 'hoffmann', wer: 'hoffmann', hoehe: 1.25, r: 0.06, richtig: false, t: 'Mme Tidderich. Schaut zu Jo.' },
          { id: 'yusuf', wer: 'yusuf', hoehe: 1.25, r: 0.06, richtig: false, t: 'Yusuf. Schaut zum Korb.' },
          { id: 'jo', wer: 'jo', hoehe: 1.4, r: 0.05, richtig: false, t: 'Jo. Am Handy.' },
          { id: 'ben', wer: 'ben', hoehe: 1.4, r: 0.05, richtig: false, t: 'Ben. Am Handy.' },
          { id: 'ayla', wer: 'ayla', hoehe: 1.35, r: 0.05, richtig: false, t: 'Ayla. Am Handy.' },
          { id: 'chiara', wer: 'chiara', hoehe: 1.35, r: 0.05, richtig: false, t: 'Chiara. Am Handy.' },
          { id: 'kenan', wer: 'kenan', hoehe: 1.5, r: 0.05, richtig: false, t: 'Kenan. Am Handy.' },
          { id: 'mila', wer: 'mila', hoehe: 1.35, r: 0.05, richtig: false, t: 'Mila. Am Handy.' },
        ] },
      ausgang: (r, m) => { if ((r.gefunden || []).includes('dario')) m.darioSchautGesehen = true; return m.darioSchautGesehen ? 'dario' : 'nicht'; },
      folgen: { dario: {}, nicht: { dann: [['erzaehler', 'Alles verschwimmt. Gesichter, Handys, dein Foto.']] } } },
    // Rot-Modus: ruhige Antworten sind zu, bis du atmest. Hilfe holen geht immer.
    { warum: true, wahl: [
      { t: 'Mitlachen.', merke: 'fotoMitgelacht', herz: { jo: 1 }, dann: [{ pult: { plus: -1 } }, ['jo', 'Respekt.'], ['erzaehler', 'Du lachst. Es fühlt sich an wie Zähne zeigen.']] },
      { t: '„Ja, bin ich. Löscht das.“', ruhig: true, merke: 'fotoKlar', staerke: 'klar', herz: { mila: 1, ayla: 1 }, dann: [['jo', '(hört auf zu grinsen) … Okay. Chill.'], ['ayla', '(steckt das Handy weg) Ich hab’s gemeldet.'], { pult: { plus: -2 } }] },
      { t: 'Zu Mme Tidderich.', merke: 'fotoTidderich', staerke: 'hilfe', dann: [['hoffmann', '(schaut lange aufs Display) Danke, dass du mir das zeigst.'], ['hoffmann', 'Ich kümmere mich. Ohne dich vor allen zu nennen.'], ['jo', '(hinter dir) Petze?'], { pult: { plus: -3 } }] },
      { t: '📎 Zu Dario rüber.', beweis: 'k1DarioSchaut', merke: 'fotoDario', dann: [['dario', '(hebt die Hände) Was? Ich hab’s auch grad gesehen.'], ['erzaehler', 'Sein Handy ist in der Tasche. Er hat nicht draufgeschaut.'], ['dario', 'Willst du, dass alle denken, du drehst durch?'], { pult: { plus: 1 } }] },
      { t: 'Handy weg. Weitermachen.', wenn: (m) => !m.darioSchautGesehen, merke: 'fotoWeg', dann: [{ pult: { plus: -2 } }, ['erzaehler', 'Das Handy summt in der Tasche. Du schaust nicht hin.']] },
    ] },
    ['ben', '(im Vorbeigehen, schnell) Ich hab’s nicht geteilt. Schwör.'],
    ['lina', '(ohne stehen zu bleiben, leise) Ich hab nichts gesehen.'],
    ['erzaehler', 'Keiner hat sie gefragt.'],
    { tu: 'n1_linaFoto' },
    { pult: null },
    ['erzaehler', 'Es klingelt. Die Umfrage läuft weiter. Auch ohne dich.'],
  ],
  // ---------- 15:30 Haltestelle: Dario wartet. Dann der Abend. ----------
  n1_heimweg: [
    ['dario', '(auf der Bank) Hab’s gesehen. Dein Foto.'],
    ['dario', 'Achtundfünfzig Prozent cringe. Geht noch.'],
    { wahl: [
      { t: '📎 „Du hattest kein Handy draußen.“', beweis: 'k1DarioSchaut', merke: 'darioKonfrontiert', dann: [['dario', '(kurz still) … Akku leer.'], ['erzaehler', 'Sein Handy liegt auf dem Knie. Display nach unten. Es leuchtet.'], { verdacht: 'dario', spur: 'Sagt „Akku leer“. Das Handy leuchtet.' }] },
      { t: '„Woher weißt du das alles?“', merke: 'darioWoher', dann: [['dario', 'Sieht man halt. Wenn man hinschaut.']] },
      { t: '„Warum sagst du mir das?“', herz: { dario: 1 }, merke: 'darioWarum1', dann: [['dario', 'Weil’s sonst keiner tut.']] },
    ] },
    ['dario', 'Morgen ist wer anders dran. Immer so.'],
    { foto: 'duAbend', wer: 'du', von: [-2.2, 1.6, 2.6], auf: [0, 1.1, 0], fov: 46 },
    { blende: 'Montag · 19:30' },
    ['erzaehler', 'Dein Handy summt. Der Klassenchat.'],
    { szene: 'chat', id: 'postTablett', def: (m) => POST_TABLETT(m),
      ausgang: (r, m) => { if (r.flags.beweis) m.postScreenshot = true; return r.flags.klar ? 'klar' : r.flags.witz ? 'witz' : r.flags.frage ? 'frage' : r.flags.gemeldet ? 'gemeldet' : r.flags.stumm ? 'stumm' : 'still'; },
      folgen: {
        klar: { staerke: 'klar', herz: { mila: 1, ayla: 1 }, merke: 'postKlar' },
        witz: { staerke: 'humor', herz: { jo: 1 }, merke: 'postWitz' },
        frage: { staerke: 'mut', herz: { mila: 1 }, merke: 'postFrage' },
        gemeldet: { staerke: 'hilfe', merke: 'postGemeldet' },
        stumm: { merke: 'postStumm' },
        still: { merke: 'postStill' },
      } },
    ['erzaehler', 'Zwei Minuten später. Privat.'],
    { szene: 'chat', id: 'benSorry', def: (m) => BEN_SORRY(m),
      ausgang: (r, m) => { if (r.flags.luege) m.benLuegeAngesprochen = true; return r.flags.okay ? 'okay' : r.flags.frage ? 'frage' : r.flags.klar ? 'klar' : 'ignoriert'; },
      folgen: {
        okay: { herz: { ben: 2 }, merke: 'benVerziehen' },
        frage: { staerke: 'zuhoeren', herz: { ben: 1 }, merke: 'benGefragt1' },
        klar: { staerke: 'klar', herz: { ben: 1 }, merke: 'benKlar' },
        ignoriert: { merke: 'benGelesen' },
      } },
    { blende: 'Montag · 23:07' },
    ['erzaehler', 'Dein Handy leuchtet. Eine Nummer, die du nicht kennst.'],
    { szene: 'chat', id: 'nummer', def: NUMMER,
      ausgang: (r, m) => { if (r.flags.beweis) m.nummerScreenshot = true; return r.flags.blockiert ? 'blockiert' : r.flags.sanft ? 'sanft' : r.flags.frage ? 'frage' : r.flags.fordernd ? 'fordernd' : 'still'; },
      folgen: {
        sanft: { staerke: 'einbeziehen', merke: 'nummerSanft' },
        frage: { staerke: 'zuhoeren', merke: 'nummerFrage' },
        fordernd: { merke: 'nummerFordernd' },
        still: { merke: 'nummerStill' },
        blockiert: { merke: 'nummerBlockiert' },
      } },
    ['erzaehler', 'Gelöscht. Aber jemand hat etwas gesehen.'],
    { szene: 'verdacht', id: 'wand1', pruefe: false,
      def: { titel: 'Verdachts-Wand · 23:09', frage: 'Wer macht die Fotos? Rafa heute früh. Du in der Pause. Nur Spuren zählen.',
        leute: [{ id: 'dario', info: 'Orange Pulli. 7P1.' }, { id: 'lina', info: 'Zeichnet. Sagt wenig.' }, { id: 'kenan', info: 'Der Große mit Mütze. Älter.' }],
        offen: 'Noch zu früh. Ich brauche mehr Spuren.' },
      ausgang: (r) => r.wahl, folgen: {} },
    { tu: 'n1_spurenZaehlen' },
    { blende: 'Montag · 23:12' },
    { szene: 'chat', id: 'dm1', def: (m) => DM(m),
      ausgang: (r, m) => { if (r.flags.beweis) m.dmScreenshot = true; if (r.flags.blockiert) m.dmBlockiert = true; if (r.flags.zeigen) m.dmZeigen = true; return r.flags.klar ? 'klar' : r.flags.frage ? 'frage' : 'still'; },
      folgen: { klar: { staerke: 'klar', merke: 'dmKlar' }, frage: { merke: 'dmFrage' }, still: {} } },
    { wenn: (m) => !!m.dmZeigen, dann: [
      ['erzaehler', 'Morgen zeigst du es jemandem. Wem?'],
      { wahl: [
        { t: 'Mme Tidderich.', staerke: 'hilfe', merke: 'erzaehltTidderich', dann: [] },
        { t: 'Herrn Kuedes (SePAS).', staerke: 'hilfe', merke: 'erzaehltKuedes', dann: [] },
        { t: 'Dario. Direkt fragen.', merke: 'erzaehltDario', dann: [] },
      ] }], sonst: [{ tu: 'n1_niemand' }, ['erzaehler', 'Das Handy bleibt aus. Morgen ist ein neuer Tag.']] },
    { tu: 'kapitelEnde' },
  ],
  // Fachstunde (nur, wenn eingeschaltet – sonst freiwillig über 🎟 → Stunden)
  n1_deutsch: [
    ['nouvelle', 'So. Jetzt schauen wir, wo ihr steht. Jeder in seinem Modul.'],
    { stunde: 'deutsch' },
    ['nouvelle', 'Zum Schluss: Blätter tauschen. Korrigiert euch gegenseitig.'],
    ['erzaehler', 'Ben hat drei Fehler. Er schaut dich an, als wüsste er es schon.'],
    { wahl: [
      { t: '„Drei Fehler. Soll ich zeigen?“', staerke: 'klar', herz: { ben: 1 }, merke: 'benFeedback', dann: [
        ['ben', 'Nur drei? Zeig.'],
        ['erzaehler', 'Ihr geht sie durch. Bei zweien lacht er über sich selbst.'] ] },
      { t: '„Alles richtig.“ (Schwindeln.)', merke: 'benGeschont', dann: [
        ['ben', 'Echt?'],
        ['nouvelle', '(schaut über die Schulter) Ben, hier fehlt ein -e. Und hier. Und hier.'],
        ['ben', '(zu dir, leise) „Alles richtig“, ja?'] ] },
      { t: '„Drei Fehler. Ziemlich viele.“', herz: { ben: -1 }, merke: 'benBlossgestellt', dann: [
        ['ben', '(zieht das Blatt weg) Danke.'],
        ['erzaehler', 'Den Rest der Stunde schaut er nur nach vorn.'] ] },
    ] },
    ['nouvelle', 'Wer Fehler zeigt, hilft. Bis morgen.'],
  ],
  // Montag 13:30, Hof: Das Foto kommt (Gesamtkonzept K1, Szene 7). Wer sitzt am Steuer? Ein Werkzeug zum Senken gibt es noch nicht.
  n1_checkin: [
    ['erzaehler', 'Skills-Stunde in der Aula. Auf dem Handy: „Check-in“.'],
    { szene: 'checkin', id: 'checkin1', def: CHECKIN_MI, ausgang: (r) => r.gefuehl, folgen: {} },
  ],
  n1_skills: [
    ['kaya', 'Wéi geet et? Herr Kuedes, SePAS – zum Reden, wenn was ist. Hier lernt ihr euch erst mal kennen.'],
    ['kaya', 'Zum Aufwärmen: Namen. Drei Runden. Ihr werdet schneller.'],
    { szene: 'namen', id: 'namen', def: { leute: KLASSE_NAMEN, runden: 3, proRunde: 5 },
      ausgang: (r) => (r.treffer >= r.gesamt * 0.8 ? 'top' : r.treffer >= r.gesamt * 0.5 ? 'mittel' : 'wenig'),
      folgen: {
        top: { staerke: 'kontakt', herz: { noah: 1, mila: 1, lina: 1, yusuf: 1 }, merke: 'namenTop', dann: [['kaya', 'Dritte Runde, fast doppelt so schnell. Üben wirkt.']] },
        mittel: { staerke: 'kontakt', herz: { noah: 1 }, dann: [['kaya', 'Besser als Runde eins. Genau darum geht’s.']] },
        wenig: { dann: [['kaya', 'Namen sind schwer. Nächste Woche kennst du drei mehr.']] },
      } },
    { szene: 'skillsStunde', id: 's1_ankommen', def: S1_ANKOMMEN, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'hilfe', merke: 's1Ankommen' }, weiter: { merke: 's1Ankommen' } } },
    ['kaya', 'Die fünf Regeln stehen. Welche ist dir am wichtigsten? Oder fehlt eine?'],
    { wahl: [
      { t: '„Keine Fotos von Leuten ohne Ja.“', staerke: 'klar', herz: { mila: 1, ayla: 1 }, merke: 'regelFotos', dann: [
        ['ayla', 'Die Regel bräuchte die halbe Schule.'], ['kaya', 'Dann fangen wir mit diesem Raum an.'] ] },
      { t: '„Niemand muss was Persönliches sagen.“', staerke: 'einbeziehen', herz: { noah: 2, mila: 1 }, merke: 'regelPersoenlich', dann: [
        ['noah', '(leise) Danke.'], ['kaya', 'Steht ganz oben. Zu Recht.'] ] },
      { t: '„Bleibt hier. Außer bei Gefahr.“', staerke: 'vertrauen', herz: { lina: 2, kaya: 1 }, merke: 'regelVertraulich', dann: [
        ['lina', '(nickt. Zweimal.)'], ['kaya', 'Genau. Bei Gefahr hol ich Hilfe. Und sag es euch vorher.'], ['jo', 'Auch im Chat? Das wird schwer.'] ] },
      { t: '„Jede Woche Kekse.“', staerke: 'humor', herz: { ben: 2 }, merke: 'regelKekse', dann: [
        ['ben', 'Endlich eine gute Regel.'], ['kaya', 'Kekse gehen klar. Und von den ernsten: Welche zählt für dich?'] ] },
    ] },
    ['kaya', 'Gut. Unterschreiben. Dann raus auf den Hof.'],
  ],
  // Dienstag 9:55, Sport. Frau Sommer teilt die Paare ein. Erst führst du Yusuf (er sagt einmal selbst Stopp), dann siehst du Jo und Noah,
  // dann führt Yusuf dich – und eine fremde Stimme ruft dazwischen. „Wer führt, trägt.“ Kommt beim Hallenturnier (Kapitel 3) zurück.
  n1_sport: [
    ['erzaehler', '14:00. Turnhalle. Es riecht nach Gummi und Bohnerwachs.'],
    ['sommer', 'Hütchen, zwei Bänke, hinten die Matte. Zu zweit. Eine Person sieht nichts. Die andere führt.'],
    ['sommer', 'Die Paare mach ich. Nicht ihr.'],
    ['jo', 'Ohhh nein.'],
    ['sommer', '{name} mit Yusuf. Jo mit Noah. Ben mit Ayla. Der Rest kommt zu mir.'],
    ['erzaehler', 'Yusuf kommt rüber. Ihr habt bis jetzt kein Wort miteinander geredet.'],
    ['yusuf', '(nimmt das Tuch) Ich zuerst. Bevor ich’s mir anders überleg.'],
    ['sommer', 'Eine Regel. Nur eine. Wer „Stopp“ sagt, wird nicht überredet. Stopp gilt sofort.'],
    ['sommer', 'Wer führt, trägt. Los.'],
    { szene: 'blind', id: 'sportFuehren', def: { partner: PARTNER.yusuf, stoppMoment: true, wo: 'Turnhalle' },
      ausgang: (r) => (r.stoppIgnoriert ? 'ignoriert' : r.angekommen && r.vertrauen >= 55 ? 'gut' : r.angekommen ? 'knapp' : r.hektik >= 2 ? 'hektik' : 'nicht'),
      folgen: {
        gut: { staerke: 'fuehren', herz: { yusuf: 2 }, merke: 'sportGut', dann: [['yusuf', '(nimmt das Tuch ab) Ich hab kein einziges Mal geblinzelt. Ehrlich.']] },
        knapp: { herz: { yusuf: 1 }, merke: 'sportKnapp', dann: [['yusuf', 'Zwei Hütchen erwischt. Aber angekommen. Passt.']] },
        hektik: { merke: 'sportHektik', dann: [['yusuf', '(nimmt das Tuch ab) Du redest schneller, als ich gehen kann.']] },
        nicht: { merke: 'sportNicht', dann: [['yusuf', 'Nicht ganz bis zur Matte. Egal. Ich leb noch.']] },
        ignoriert: { herz: { yusuf: -2 }, merke: 'sportStoppIgnoriert', dann: [['yusuf', '(zieht das Tuch runter) Ich hab Stopp gesagt.'], ['erzaehler', 'Er sagt es nicht laut. Aber er geht einen Schritt weg von dir.']] },
      } },
    ['erzaehler', 'Tausch. Während Yusuf dir das Tuch hinhält, schaust du kurz rüber. Jo und Noah sind an der zweiten Bank.'],
    ['erzaehler', 'Noah hat das Tuch auf. Jo führt. Jo grinst rüber zu Ben.'],
    ['noah', '(leise) Stopp.'],
    { bemerke: 'noahStopp' },
    ['jo', 'Da ist nix! Geh einfach!'],
    ['erzaehler', 'Noah macht einen Schritt. Sein Fuß bleibt an der Bank hängen. Er fällt. Auf beide Hände.'],
    ['erzaehler', 'Ben lacht. Zwei andere auch. Jo hebt die Arme: „Was? Ich hab doch gesagt, da ist nix.“'],
    ['erzaehler', 'Noah zieht das Tuch runter. Er schaut niemanden an.'],
    { pult: { g: 'Ärger', w: 5 } },
    { warum: true, wahl: [
      { t: '„Jo. Er hat Stopp gesagt.“', bemerkt: 'noahStopp', weil: 'Weil du gehört hast, was Noah gesagt hat.', staerke: 'klar', herz: { noah: 2, jo: -1 }, merke: 'sportJoStopp', dann: [
        ['jo', 'Hat er nicht.'], ['noah', '(leise, aber deutlich) Doch. Hab ich.'], ['erzaehler', 'Kurz ist es still. Frau Sommer dreht sich um.'],
        ['sommer', 'Was war?'], ['jo', '(hebt die Hände) Nichts. Okay. Sorry, Noah.'], ['erzaehler', 'Es klingt nicht ganz ehrlich. Aber er hat es gesagt. Vor allen.']] },
      { t: '„Jo, was soll das?“', herz: { noah: 1, jo: -1 }, merke: 'sportJoWas', dann: [
        ['jo', 'Chill. Er ist über eine Bank gestolpert. Passiert.'], ['erzaehler', 'Noah sagt nichts dazu. Was genau passiert ist, weißt du nicht. Nur, dass er am Boden sitzt.']] },
      { t: '(Zu Noah gehen. Die Hand hinhalten.)', staerke: 'einbeziehen', herz: { noah: 2 }, merke: 'sportNoahHand', dann: [
        ['erzaehler', 'Du hältst ihm die Hand hin. Er schaut sie an. Dann nimmt er sie.'], ['noah', '(sehr leise) Ich hab Stopp gesagt.'],
        { wahl: [
          { t: '„Ich weiß. Ich hab’s gehört.“', bemerkt: 'noahStopp', weil: 'Weil du hingehört hast.', herz: { noah: 1 }, merke: 'sportNoahGeglaubt', dann: [['noah', '(atmet aus) Okay. Dann spinn ich nicht.']] },
          { t: '„Sag’s Frau Sommer.“', dann: [['noah', 'Nein. Dann bin ich der, der petzt.']] },
          { t: '„Was machen die Hände?“', dann: [['noah', '(reibt sie an der Hose) Brennen. Geht schon.']] },
        ] }] },
      { t: '(Leise zu Jo) „Du warst auch neu.“', bemerkt: 'joVierteSchule', weil: 'Weil Jo heute früh gesagt hat: vier Schulen.',
        staerke: 'lesen', herz: { jo: 1, noah: 1 }, merke: 'sportJoNeu', dann: [
        ['jo', '(schaut dich an. Lange.) … Was soll das jetzt?'], ['erzaehler', 'Du sagst nichts mehr. Jo schaut zu Noah. Dann auf den Boden.'],
        ['jo', '(hält Noah die Hand hin) Komm hoch. … Sorry. War blöd.'], ['noah', '(nimmt die Hand. Zögert.) … Okay.']] },
      { t: '(Frau Sommer holen.)', herz: { noah: 1, jo: -1 }, merke: 'sportSommer', dann: [
        ['sommer', '(kommt, schaut sich Noahs Hände an) Alle mal herkommen.'], ['sommer', 'Was hab ich am Anfang gesagt?'],
        ['ayla', 'Stopp gilt sofort.'], ['sommer', 'Für alle. Auch wenn es von außen lustig aussieht.'],
        ['jo', '(murmelt) Petze.'], ['erzaehler', 'Er schaut dich dabei nicht an. Aber du weißt, wen er meint.']] },
      { t: '(Mitlachen. Ist ja nichts passiert.)', herz: { noah: -2, jo: 1 }, merke: 'sportGelacht', dann: [
        ['erzaehler', 'Du lachst kurz mit. Noah schaut hoch. Genau zu dir.'], ['erzaehler', 'Dann schaut er weg.']] },
      { t: '(Wegschauen.)', merke: 'sportWeg', dann: [
        ['erzaehler', 'Du drehst dich zu Yusuf. Hinter dir steht Noah auf. Allein.']] },
    ] },
    { pult: null },
    { sicht: (m) => ({ wer: 'noah', name: 'Noah', auf: 'du', lachen: m.sportGelacht || m.sportWeg ? ['jo', 'ben'] : [], gedanken: NOAH_SPORT(m) }) },
    ['erzaehler', 'Jetzt du. Das Tuch riecht nach Waschmittel. Dann ist es dunkel.'],
    { wenn: (m) => m.sportStoppIgnoriert, dann: [['yusuf', '(zu Frau Sommer) Kann ich tauschen? Ich führ nicht.'], ['sommer', '(schaut ihn an, dann dich) Okay. Dann führ ich.']] },
    { wenn: (m) => m.sportHektik && !m.sportStoppIgnoriert, dann: [['yusuf', 'Ich mach’s langsam. So, wie ich’s gebraucht hätte.']] },
    { szene: 'gefuehrt', id: 'sportGefuehrt', bildId: 'sportWeg', def: (m) => ({ partner: m.sportStoppIgnoriert ? PARTNER.sommer : PARTNER.yusuf, stoerer: { name: 'Jo' }, wo: 'Turnhalle' }),
      ausgang: (r) => (r.angekommen ? 'an' : 'nicht'), folgen: { an: { merke: 'sportAngekommen' }, nicht: {} } },
    { tu: 'n1_sportGefuehrt' },
    ['sommer', '(pfeift) Alle in den Kreis.'],
    ['sommer', 'Wer führt, trägt. Die andere Person gibt euch ihre Augen. Das ist viel.'],
    ['sommer', 'Was war schwerer für dich: führen – oder geführt werden?'],
    { wahl: [
      { t: '„Führen. Dann bin ich schuld.“', merke: 'sportSchwerFuehren', dann: [['sommer', 'Genau das meine ich mit tragen. Danke.']] },
      { t: '„Geführt werden. Blind vertrauen.“', merke: 'sportSchwerGefuehrt', dann: [['yusuf', '(leise) Ging mir genauso.']] },
      { t: '„Stopp sagen. Wie aufgeben.“', staerke: 'klar', merke: 'sportSchwerStopp', dann: [['sommer', 'Ist es nicht. Stopp heißt: Ich pass auf mich auf. Das Gegenteil von aufgeben.']] },
      { t: '„Zuschauen, wie es bei anderen schiefgeht.“', merke: 'sportSchwerZuschauen', dann: [['sommer', '(nickt langsam) Das ist vielleicht das Schwerste. Merk dir das.']] },
    ] },
    { wenn: (m) => m.sportGut && !m.sportStoppIgnoriert, dann: [['yusuf', '(beim Rausgehen) Irgendwann ist Hallenturnier. Falls du wählen darfst …'], ['yusuf', 'Nur so.']] },
    { wenn: (m) => m.sportStoppIgnoriert, dann: [['erzaehler', 'Yusuf geht als Erster raus. Ohne dich anzuschauen.']] },
    { wenn: (m) => m.sportNoahHand || m.sportJoStopp, dann: [['noah', '(an der Tür, ohne dich anzusehen) … Danke. Vorhin.']] },
    { wenn: (m) => m.sportJoNeu, dann: [['jo', '(im Vorbeigehen, leise) Woher wusstest du das mit den Schulen?'], ['erzaehler', 'Er wartet keine Antwort ab.']] },
    { wenn: (m) => m.sportGelacht, dann: [['erzaehler', 'In der Umkleide sitzt Noah ganz hinten. Er zieht sich schneller um als alle anderen.']] },
  ],
  n1_blind: [
    ['kaya', 'Blind-Parcours. Eine Person sieht nichts. Die andere lotst.'],
    ['kaya', 'Wer zu hektisch ist, kriegt ein Stopp. Das darf jeder sagen.'],
    ['kaya', 'Such dir wen aus.'],
    { wahl: [
      { t: 'Noah.', herz: { noah: 1 }, merke: 'blindNoah', dann: [['noah', 'Ich? Okay. Ich vertraue dir. Glaub ich.'], { szene: 'blind', id: 'blind', def: { partner: PARTNER.noah }, ...blindFolgen('noah') }] },
      { t: 'Mila.', herz: { mila: 1 }, merke: 'blindMila', dann: [['mila', 'In Ordnung. Sag „links“ nur, wenn du links meinst.'], { szene: 'blind', id: 'blind', def: { partner: PARTNER.mila }, ...blindFolgen('mila') }] },
      { t: 'Ben.', herz: { ben: 1 }, merke: 'blindBen', dann: [['ben', 'Lass mich bitte nicht gegen den Brunnen laufen.'], { szene: 'blind', id: 'blind', def: { partner: PARTNER.ben }, ...blindFolgen('ben') }] },
      { t: 'Lina.', staerke: 'einbeziehen', herz: { lina: 2 }, merke: 'blindLina', dann: [['lina', '(überrascht) Oh. Okay.'], { szene: 'blind', id: 'blind', def: { partner: PARTNER.lina }, ...blindFolgen('lina') }] },
    ] },
    ['kaya', 'Tausch. Jetzt siehst DU nichts.'],
    ['erzaehler', 'Augenbinde. Dunkel. Jemand sagt „links“. Du gehst links. Es klappt.'],
    ['kaya', 'Was braucht eine Gruppe, damit das klappt?'],
    { wahl: [
      { t: '„Dass man Stopp sagen darf.“', staerke: 'klar', dann: [['kaya', 'Kommt in den Vertrag. Danke.']] },
      { t: '„Dass keiner lacht, wenn wer hinfällt.“', staerke: 'einbeziehen', herz: { noah: 1 }, dann: [['jo', '(leise) … okay. Fair.']] },
      { t: '„Dass man sich vorher kennt.“', staerke: 'kontakt', herz: { ben: 1 }, dann: [['kaya', 'Genau darum war das die erste Stunde.']] },
    ] },
    { szene: 'stempel', def: (m) => ({ modul: 'Modul 0 · Ankommen', titel: 'Angekommen',
      gelernt: ['Namen gelernt' + (m.namenTop ? ' – sehr schnell' : ''), 'Check-in mit genauem Gefühlswort', 'Die fünf Regeln, die eine Gruppe sicher machen', 'Jemanden gelotst – und selbst blind gelaufen'],
      mission: 'Sprich diese Woche jemanden an, mit dem du noch nie geredet hast. Und lern drei Namen aus der Parallelklasse.' }), folgen: {} },
    ['kaya', 'Danke euch. Das war die erste Skills-Stunde.'],
  ],
};

// TUN für Kapitel 1 (in spiel.js eingehängt)
export const tunN1 = (c) => ({
  // Rest der Deutschstunde: läuft im Hintergrund, außer die Lehrperson hat den Unterricht in der Geschichte eingeschaltet
  n1_deutschRest: () => ((c.ui.einstellungen && c.ui.einstellungen().unterricht) ? [] : [{ blende: 'Deutsch. 50 Minuten. Dann klingelt es.' }]),
  n1_tischNoah: () => { c.S.merke.kantineNoah = true; c.S.merke.tisch = 'noah'; return []; },
  n1_tischMila: () => { c.S.merke.kantineMila = true; c.S.merke.tisch = 'mila'; return []; },
  n1_vertragStill: () => { c.S.merke.vertragGewaehlt = true; return []; },   // Plakat: drei Regeln + Handy-Kiste (keine Abstimmung mehr)
  n1_niemand: () => { c.S.merke.erzaehltNiemand = true; return []; },
  n1_chiaraKurz: () => { c.S.merke.chiaraKurz = true; return []; },
  n1_chiaraMorgen: () => { c.S.merke.chiaraMorgen = true; return []; },
  n1_benKorb: () => { c.S.merke.benKorbMorgen = true; return []; },
  // Jo erzählt in der Klasse von seinen vier Schulen – später erinnert sich das Spiel daran
  n1_joSchule: () => { c.S.merke.joSchuleGesehen = true; c.S.bemerkt = { ...(c.S.bemerkt || {}), joVierteSchule: true }; return []; },
  n1_freiwurf: async () => { const t = await c.ui.freiwurf(); c.S.merke.freiwurf = t; return t >= 3 ? [['yusuf', t + ' von 5. Okay. Du darfst wiederkommen.']] : [['yusuf', t + ' von 5. (grinst) Bälle holen. Da hinten.']]; },
  n1_linaFoto: () => { if (c.S.merke.pauseBrunnen) c.S.merke.fotoLina = true; return []; },
  n1_wandNeu: () => { c.ui.toast('<b>📌 Verdachts-Wand</b><span>Was du findest, kommt an die Wand. Heute Nacht entscheidest du.</span>', 'ly-t-ent'); return []; },
  // Das Foto von dir in der Pause: von der Treppe aus, genau da, wo du gerade bist
  n1_pauseFoto: () => {
    const m = c.S.merke, platz = m.pauseZuRafa || m.pauseBrunnen ? 'brunnen' : m.pauseTT ? 'rundlauf' : m.pauseKorbOrt ? 'korb' : m.pauseHandy ? 'handy' : 'allein';
    return [{ schnapp: { id: 'duPause', von: [0, -1.2], hoehe: 4.4, abstand: 5.6, fov: 36, sonst: platz } }];
  },
  // Währenddessen: wer Rafa geholfen hat, sieht Noah. Alle anderen sehen Rafa.
  n1_waehrenddessen: () => (c.S.merke.rafaGeholfen
    ? [{ foto: 'auchPause', wer: 'noah', von: [1.6, 1.5, 2.0], auf: [0, 1.1, 0], fov: 42 }, { szene: 'schnitt', pruefe: false, def: { bild: 'auchPause', ort: 'Zaun', t: 'Noah. Die ganze Pause allein. Keiner hat ihn gefragt.' } }]
    : [{ hin: { rafa: [-6.4, 21.6, 2.2, 'handy'] } }, { foto: 'auchPause', wer: 'rafa', von: [-1.7, 1.55, -1.8], auf: [0, 1.05, 0], fov: 38 }, { szene: 'schnitt', pruefe: false, def: { bild: 'auchPause', ort: 'Brunnen', t: 'Rafa. Allein mit dem Foto. Dann geht er rein.' } }]),
  // Wie viele Spuren hast du heute gesammelt? (für die DM um 23:12 und die Lehrer-Ansicht)
  n1_spurenZaehlen: () => { const g = Object.values(c.S.galerie || {}).filter((x) => (x.kap || 1) === 1).length, v = Object.values(c.S.verdacht || {}).reduce((s, l) => s + l.length, 0); c.S.merke.k1Spuren = g + v; return []; },
  // Nach „Geführt werden“: was du gemacht hast, sagt die Person, die dich geführt hat (ohne Note)
  n1_sportGefuehrt: () => {
    const r = (c.S.sz || {}).sportGefuehrt || {}, m = c.S.merke, p = m.sportStoppIgnoriert ? 'sommer' : 'yusuf', aus = [];
    if (r.joErkannt) { m.sportJoErkannt = true; aus.push([p, 'Gut, dass du nachgefragt hast. Das „Links“ war Jo.']); }
    else if (r.fremdGefolgt) { m.sportJoGefolgt = true; aus.push([p, 'Das „Links“ eben war nicht ich. Das war Jo.'], ['erzaehler', 'Eine Stimme, die laut genug ist, klingt im Dunkeln fast wie die richtige.']); }
    if (r.eigeneStopps) { m.sportSelbstStopp = true; aus.push([p, p === 'sommer' ? 'Du hast Stopp gesagt. Gut so. Das ist nicht feige.' : 'Du hast Stopp gesagt. Und ich hab gewartet. So geht das.']); }
    if (r.ballGestoppt) aus.push([p, 'Beim Ball bist du sofort stehen geblieben. Ich hab nur „Warte“ gesagt.']);
    if (!r.angekommen) aus.push(['erzaehler', 'Ihr habt die Matte nicht ganz erreicht. Das Tuch ist trotzdem irgendwann ab.']);
    c.S.merke = m; return aus;
  },
  n1_tischBen: () => { c.S.merke.kantineBen = true; c.S.merke.tisch = 'ben'; return []; },
});

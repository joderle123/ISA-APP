// Storyline 7e „@annexe.cam“ (Fassung 24.11., nach der Storyline von Fable) – Kapitel 1 „Das Foto“, September.
// Verdecktes Thema: Ankommen. Hundert kleine Entscheidungen: wohin schauen, wo sitzen, wem die Nummer geben.
// Und man lacht über ein Foto, bevor man selbst eines ist.
// Spuren, die hier gelegt werden: Darios Handy hat einen Sprung im Glas (Nebensatz), seine Rollen sind sauber
// (er fährt nicht), die unbekannte Nummer (Lina) schreibt Freitagnacht und löscht die Nachricht nach sechs Sekunden.
// Spitzname „Hinten links“ (Sitzplatz) – so braucht kein Text „er“ oder „sie“.
import { S1_ANKOMMEN } from './skills-j1.js';
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
// Haltestelle: Dario steht (Montag) oder sitzt auf der Bank (ab Dienstag), Lina auf der Mauer
const HALTESTELLE = { dario: [-20.5, 42.3, -1.9], lina: [-25.6, 44.4, 0.8], fahrer: [-11.2, 44.6, -Math.PI / 2] };
const HALTESTELLE_BANK = { dario: [-21.5, 41.6, -1.6, 'sitzt'], lina: [-25.6, 44.4, 0.8], fahrer: [-11.2, 44.6, -Math.PI / 2] };

export const SCHRITTE_N1 = [
  { id: 'ankunft', kap: 1, tag: 'Montag', uhr: 7.42, titel: 'Moien. Neu?', ziel: 'Erster Tag. Ein Junge mit Skateboard schaut zu dir rüber.', marker: 'dario',
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
  { id: 'pause', kap: 1, tag: 'Montag', uhr: 10.0, titel: 'Cool oder cringe?', ziel: 'Pause. Ben und Jo winken dich zu sich.', marker: 'ben',
    start: { teleport: 'eingangHof' },
    leute: { ben: [4, 14, 0.6, 'redet'], jo: [5.2, 15.4, -2.4, 'redet'], mila: [-20, 11.6, Math.PI, 'sitzt'], noah: [-14, 12.2, 2.6], ayla: [3, 17.6, -2.5, 'redet'], chiara: [2, 18.4, 0.6, 'redet'] },
    fertig: { reden: 'ben', gespraech: 'n1_umfrage' } },
  { id: 'kantine', kap: 1, tag: 'Montag', uhr: 12.17, titel: 'Mittag', ziel: 'Hol dir ein Essen an der Ausgabe.', marker: 'kremer',
    start: { teleport: 'kantineTuer' },
    leute: { kremer: [26.8, -9, -Math.PI / 2], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], dario: [21.4, -13.2, 0.9], kenan: [21.0, -12.0, 1.2] },
    fertig: { ort: 'kantineAusgabe', r: 1.8, gespraech: 'n1_kantine' } },
  { id: 'tisch', kap: 1, tag: 'Montag', uhr: 12.25, titel: 'Wohin setzen?', ziel: 'Hinten links sitzt Noah allein. Am Fenster Ben und Jo.', marker: ['noah', 'ben'],
    leute: { kremer: [26.8, -9, -Math.PI / 2], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], dario: [21.4, -13.2, 0.9], kenan: [21.0, -12.0, 1.2] },
    fertig: { eins: ['noah', 'ben'] } },
  { id: 'heimweg', kap: 1, tag: 'Montag', uhr: 15.5, titel: 'Nach Hause', ziel: 'Geh zum Bus.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { fahrer: [-11.2, 44.6, -Math.PI / 2], lina: [-25.6, 44.4, 0.8], ben: [8, 36, 2.6], jo: [9.2, 35.4, -2.2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'n1_heimweg' } },
  { id: 'k1_dario', kap: 1, tag: 'Dienstag', uhr: 7.42, titel: 'Die Bank ist noch nass', ziel: 'Dario sitzt schon an der Haltestelle.', marker: 'dario',
    start: { teleport: 'busAnkunft' },
    leute: HALTESTELLE_BANK,
    fertig: { reden: 'dario', gespraech: 'n1_darioBank' } },
  // ---------- Mittwoch: Skills-Stunden (nur, wenn eingeschaltet) ----------
  { id: 'k1_skills', kap: 1, tag: 'Mittwoch', uhr: 9.9, neben: 'skills', titel: 'Skills: Ankommen', ziel: 'Geh in die Aula. Herr Kuedes wartet mit einem Ball.', marker: 'kaya',
    start: { teleport: 'eingangHof', gespraech: 'n1_checkin' },
    leute: { kaya: [-14.50, -65.40, 0.00], noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] },
    fertig: { reden: 'kaya', gespraech: 'n1_skills' } },
  { id: 'k1_blind', kap: 1, tag: 'Mittwoch', uhr: 10.6, neben: 'skills', titel: 'Skills: Blind-Parcours', ziel: 'Auf den Hof. Herr Kuedes hat Hütchen aufgebaut.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [2, 14, Math.PI], noah: [4, 13, -1.6], mila: [-1.6, 13.4, 1.4], ben: [3.2, 16.2, -2.4], lina: [-0.6, 16.4, 2.6], jo: [5.6, 15.4, -2], ayla: [-2.6, 15.8, 1.9] },
    fertig: { reden: 'kaya', gespraech: 'n1_blind' } },
  // ---------- Freitag: nach Hause – und um 23:07 eine Nachricht, die nur sechs Sekunden steht ----------
  { id: 'k1_freitag', kap: 1, tag: 'Freitag', uhr: 15.67, titel: 'Freitag', ziel: 'Wochenende. Geh zum Bus.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { fahrer: [-11.2, 44.6, -Math.PI / 2], lina: [-25.6, 44.4, 0.8], dario: [-21.5, 41.6, -1.6, 'sitzt'] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'n1_freitag' } },
];

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

// ---------- Live-Chat Montagabend: Ben leitet weiter (Fable K1, Sz. 5) ----------
const POST_TABLETT = (m) => ({
  titel: '7P2', mitglieder: 21, dauer: 30,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Ben hat einen Beitrag weitergeleitet.' },
    { nach: 1.4, wer: '@annexe.cam', bild: 'Du, in der Kantine, mit dem Tablett. Von unten.', text: 'neu in der 7p2. cool oder cringe? 👀', lacher: { start: 3, proSek: 0.35, stopp: ['klar', 'gemeldet'] } },
    { nach: 3.6, wer: 'Jo', text: '61% cringe gerade' },
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
      { t: '„haha. nicht mein bester winkel“', setzt: 'witz', ich: 'haha. nicht mein bester winkel', folgen: [{ nach: 1.2, wer: 'Jo', text: 'ok das ist gut 😂' }] },
      { t: '„Wer ist @annexe.cam?“', setzt: 'frage', ich: 'wer ist annexe.cam?', folgen: [{ nach: 1.6, wer: 'Jo', text: 'keiner weiß das. das ist ja der witz' }] },
    ] },
    { id: 'beweis', t: 'Screenshot', symbol: '📸', setzt: 'beweis', sys: 'Screenshot gespeichert. 19:31.' },
    { id: 'melden', t: 'Beitrag melden', symbol: '🚩', setzt: 'gemeldet', sys: 'Meldung eingegangen.' },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm. Das Handy liegt still. Du nicht.', ende: true },
  ],
});
// Zwei Minuten später: Ben privat
const BEN_SORRY = {
  titel: 'Ben', mitglieder: 2, dauer: 12,
  nachrichten: [
    { nach: 0.6, wer: 'Ben', text: 'sorry. hab nicht nachgedacht. echt.' },
    { nach: 8.5, system: true, text: 'Ben tippt …', wennNicht: 'geantwortet' },
  ],
  aktionen: [
    { id: 'antwort', t: 'Antworten', symbol: '💬', wahl: [
      { t: '„Schon okay.“', setzt: ['geantwortet', 'okay'], ich: 'schon okay', folgen: [{ nach: 1.2, wer: 'Ben', text: 'danke. nächstes mal denk ich erst' }] },
      { t: '„Warum leitest du so was weiter?“', setzt: ['geantwortet', 'frage'], ich: 'warum leitest du so was weiter?', folgen: [{ nach: 1.8, wer: 'Ben', text: 'weiß nicht. alle machen das. ich hab nicht gedacht, dass du es bist' }] },
      { t: '„Nicht okay. Aber danke, dass du schreibst.“', setzt: ['geantwortet', 'klar'], ich: 'nicht okay. aber danke dass du schreibst', folgen: [{ nach: 1.4, wer: 'Ben', text: 'ja. fair' }] },
    ] },
    { id: 'gelesen', t: 'Auf „gelesen“ lassen', symbol: '👀', setzt: 'ignoriert', sys: 'Gelesen 19:34', ende: true },
  ],
};

// ---------- Freitag, 23:07: die unbekannte Nummer (Lina). Sechs Sekunden, dann gelöscht. ----------
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

// ---------- Mittwoch: Check-in, Skills-Stunde (Kurs M0: E01–E03), Blind-Parcours, Stempel ----------
const CHECKIN_MI = {
  frage: 'Herr Kuedes will heute ein Wort von allen. Deins?',
  posts: [
    { wer: 'Ben', wort: 'hungrig', farbe: '#e9734a' }, { wer: 'Mila', wort: 'okay', farbe: '#5fb07a' },
    { wer: 'Jo', wort: 'müde digga', farbe: '#5fb07a' }, { wer: 'Noah', wort: 'nervös? glaub ich', farbe: '#8a7bc8' },
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
  n1_intro: [
    ['erzaehler', 'Montag. 7:25. Erster Tag.'],
    ['erzaehler', 'Die Bustür geht zu. Du weißt nicht, wohin.'],
    ['erzaehler', 'Ein alter Mann streut Krümel für eine Taube. Auf der Mauer zeichnet jemand.'],
    ['erzaehler', 'Ein Junge mit Skateboard unter dem Arm schaut zu dir rüber.'],
  ],
  n1_dario: [
    ['dario', 'Moien. Neu?'],
    { wahl: [
      { t: '„Ja. Erster Tag.“', herz: { dario: 1 }, merke: 'zeigtSich', dann: [['dario', 'Sieht man. Alle schauen am ersten Tag so.']] },
      { t: '„Wieso?“', merke: 'zeigtSichNicht', dann: [['dario', 'Nur so. Ich kenn hier jeden.'], ['dario', '(Pause) Mich kennt keiner.']] },
      { t: '(Nicken.)', dann: [['dario', 'Okay. Wenig Worte. Mag ich.']] },
    ] },
    ['dario', 'Annexe ist da hoch. Dann links. Die große Tür.'],
    ['erzaehler', 'Die Rollen an seinem Brett glänzen. Wie neu. Sein Handy hat einen Sprung im Glas.'],
    ['dario', 'Dario. 7P1. Ich nehm immer den ersten Bus.'],
    { tu: 'stundenplanTipp' },
  ],
  n1_klasse: [
    ['hoffmann', 'Moien. {name}, richtig? Ich bin Mme Tidderich. Deine Klassenlehrerin.'],
    ['hoffmann', 'Hinten links ist frei. Neben der Tür.'],
    ['erzaehler', 'Die Tür hat ein schmales Glas. Man sieht den Flur.'],
    { tu: 'stundenplan' },
    { tu: 'spindFrei' },
    ['ben', '(dreht sich um) Moien. Ben. Nummer? Für den Klassenchat.'],
    { wahl: [
      { t: '(Nummer sagen.)', herz: { ben: 1 }, merke: 'nummerGegeben', dann: [['ben', '(tippt) „{name} 7P2“. Ich speicher alle so.']] },
      { t: '„Wozu?“', merke: 'nummerGezoegert', dann: [
        ['ben', 'Klassenchat. Raumwechsel, Hausaufgaben, so was.'],
        ['ben', '(hält dir sein Handy hin) Kannst auch selbst tippen.'],
        { wahl: [
          { t: '(Tippen.)', herz: { ben: 1 }, merke: 'nummerGegeben', dann: [['ben', '„{name} 7P2“. Ich speicher alle so.']] },
          { t: '„Später.“', merke: 'nummerSpaeter', dann: [['ben', 'Okay. Später.'], ['erzaehler', 'In der ersten Pause fragt Chiara. Sie ist Admin. Du gibst sie ihr.']] },
        ] }] },
    ] },
    { szene: 'chat', id: 'chatNeu', def: CHAT_NEU,
      ausgang: (r) => (r.flags.stumm ? 'stumm' : r.flags.geschrieben ? 'geschrieben' : 'still'),
      folgen: { geschrieben: { staerke: 'kontakt', herz: { ayla: 1, chiara: 1 } }, stumm: { merke: 'gruppeStumm' }, still: { merke: 'nurGelesen' } } },
    { tu: 'n1_deutschRest' },
  ],
  // Fachstunde (nur, wenn eingeschaltet – sonst freiwillig über 🎟 → Stunden)
  n1_deutsch: [
    ['nouvelle', 'So. Jetzt schauen wir, wo ihr steht. Jeder in seinem Modul.'],
    { stunde: 'deutsch' },
    ['nouvelle', 'Zum Schluss: Blätter tauschen. Korrigiert euch gegenseitig.'],
    ['erzaehler', 'Ben hat drei Fehler. Er schaut dich an, als wüsste er es schon.'],
    { wahl: [
      { t: '„Drei Fehler. Soll ich dir zeigen, wo?“', staerke: 'klar', herz: { ben: 1 }, merke: 'benFeedback', dann: [
        ['ben', 'Nur drei? Zeig.'],
        ['erzaehler', 'Ihr geht sie durch. Bei zweien lacht er über sich selbst.'] ] },
      { t: '„Alles richtig.“ (Damit er sich nicht schlecht fühlt.)', merke: 'benGeschont', dann: [
        ['ben', 'Echt?'],
        ['nouvelle', '(schaut über die Schulter) Ben, hier fehlt ein -e. Und hier. Und hier.'],
        ['ben', '(zu dir, leise) „Alles richtig“, ja?'] ] },
      { t: '„Drei Fehler. Ziemlich viele.“', herz: { ben: -1 }, merke: 'benBlossgestellt', dann: [
        ['ben', '(zieht das Blatt weg) Danke.'],
        ['erzaehler', 'Den Rest der Stunde schaut er nur nach vorn.'] ] },
    ] },
    ['nouvelle', 'Wer Fehler zeigt, hilft. Bis morgen.'],
  ],
  // Pause: Ben und Jo zeigen @annexe.cam. Es ist wirklich lustig. Das ist das Problem. (Entscheidung A)
  n1_umfrage: [
    ['ben', 'Hinten links! Komm mal. Kennst du den schon?'],
    ['erzaehler', 'Auf Jos Handy: ein Account. @annexe.cam.'],
    ['erzaehler', 'Ein Junge aus der 5e, schlafend im Bus. Der Mund offen.'],
    ['erzaehler', 'Darunter eine Umfrage: cool oder cringe?'],
    ['jo', '(lacht) Guck den an.'],
    ['erzaehler', 'Es ist wirklich lustig.'],
    ['jo', '(hält dir das Handy hin) Stimm ab.'],
    { warum: true, fest: true, wahl: [
      { t: '„cool“ (Klick. Ist ja nur Spaß.)', herz: { jo: 1, ben: 1 }, merke: ['abgestimmt', 'abgestimmtCool'], dann: [['jo', 'Cool? Mutig.'], ['erzaehler', 'Ihr steht im Kreis und lacht. Für einen Moment gehörst du dazu.']] },
      { t: '„cringe“ (Klick. Die anderen auch.)', herz: { jo: 1, ben: 1 }, merke: ['abgestimmt', 'abgestimmtCringe'], dann: [['jo', 'Einundsechzig Prozent cringe. Sag ich doch.'], ['erzaehler', 'Ihr steht im Kreis und lacht. Für einen Moment gehörst du dazu.']] },
      { t: '„Kenn ich nicht.“', staerke: 'klar', merke: 'nichtAbgestimmt', dann: [['jo', 'Chill. Ist nur ein Klick.'], ['ben', '(zuckt mit den Schultern) Musst ja nicht.']] },
      { t: '(Handy zurückgeben. Ohne Klick.)', merke: 'nichtAbgestimmt', dann: [['jo', '(nimmt es) Chill. Ist nur ein Klick.']] },
    ] },
    ['erzaehler', 'Es klingelt. Der Junge aus der 5e geht an euch vorbei.'],
    ['erzaehler', 'Er hat das Foto noch nicht gesehen.'],
  ],
  n1_kantine: [
    ['erzaehler', 'Es riecht nach Suppe und nassem Boden.'],
    ['kremer', 'Suppe oder Pasta? … Hier.'],
    { tu: 'tablett' },
    ['erzaehler', 'Du stehst mit dem Tablett. Drei Sekunden. Länger nicht.'],
    ['kremer', '(nickt nach hinten) Hinten links ist frei.'],
  ],
  tisch_noah: [
    ['erzaehler', 'Noah sitzt allein. Vor ihm liegt ein Bauplan auf Karopapier.'],
    ['noah', '(schaut kurz hoch) … Ist frei.'],
    { wahl: [
      { t: '„Was baust du?“', staerke: 'zuhoeren', herz: { noah: 2 }, merke: 'noahTurmGefragt', dann: [['noah', 'Den Kirchturm. Von Junglinster. Aus Bausteinen.'], ['noah', 'Die Uhr ist das Schwerste. Zwölf Steine, kein Fehler.']] },
      { t: '(Hinsetzen. Essen.)', herz: { noah: 1 }, dann: [['erzaehler', 'Ihr esst. Er zeichnet weiter. Einmal dreht er das Blatt ein Stück zu dir.']] },
    ] },
    { tu: 'n1_tischNoah' },
    { tu: 'gegessen' },
  ],
  tisch_ben: [
    ['erzaehler', 'Ben und Jo sitzen am Fenster. Sie schauen auf Jos Handy. Sie sehen dich nicht.'],
    ['erzaehler', 'Du setzt dich trotzdem dazu.'],
    ['ben', '(schaut hoch) Oh. Hinten links. Setz dich.'],
    ['jo', '(ohne aufzusehen) Der aus dem Bus hat schon dreihundert Stimmen.'],
    { tu: 'n1_tischBen' },
    { tu: 'gegessen' },
  ],
  // Montagabend: Jetzt bist du das Foto (Live-Chat), dann Ben privat
  n1_heimweg: [
    ['erzaehler', '15:30. Der Bus ist voll. Du stehst.'],
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
    { szene: 'chat', id: 'benSorry', def: BEN_SORRY,
      ausgang: (r) => (r.flags.okay ? 'okay' : r.flags.frage ? 'frage' : r.flags.klar ? 'klar' : 'ignoriert'),
      folgen: {
        okay: { herz: { ben: 2 }, merke: 'benVerziehen' },
        frage: { staerke: 'zuhoeren', herz: { ben: 1 }, merke: 'benGefragt1' },
        klar: { staerke: 'klar', herz: { ben: 1 }, merke: 'benKlar' },
        ignoriert: { merke: 'benGelesen' },
      } },
  ],
  // Dienstag 7:25 (Fable, Schlüsselszene K1): Dario tröstet. Er ist freundlich. Er hält die Kamera.
  n1_darioBank: [
    ['erzaehler', 'Dienstag. 7:25. Die Bank ist noch nass.'],
    ['erzaehler', 'Dario sitzt schon da. Wie gestern.'],
    ['dario', 'Moien.'],
    ['dario', 'Ich hab’s gesehen. Das Foto.'],
    { wahl: [
      { t: '„Alle haben es gesehen.“', dann: [['dario', '(nickt) Alle. Ich auch.']] },
      { t: '„Welches Foto?“', merke: 'darioFotoGeleugnet', dann: [['dario', '(schaut dich kurz an) Okay. Dann eben nicht.']] },
      { t: '(Nichts sagen.)', dann: [['erzaehler', 'Dario wartet kurz. Dann redet er einfach weiter.']] },
    ] },
    ['dario', 'Einundsechzig Prozent ist nicht viel. Bei mir wären es mehr.'],
    ['erzaehler', 'Er lacht kurz. Dann nicht mehr.'],
    ['dario', 'Der macht das mit allen. Morgen ist wer anders dran.'],
    { wahl: [
      { t: '„Woher weißt du das?“', merke: 'darioWoher', dann: [] },
      { t: '„Hoffentlich.“', merke: 'darioHoffentlich', dann: [] },
      { t: '„Das macht es nicht besser.“', staerke: 'klar', merke: 'darioNichtBesser', dann: [] },
    ] },
    ['dario', 'Ist halt so. Jede Woche einer.'],
    ['erzaehler', 'Sein Handy liegt auf dem Knie. Display nach unten.'],
    ['dario', 'Du hast nicht mal komisch geguckt. Auf dem Foto.'],
    ['dario', 'Du hast nur einen Platz gesucht.'],
    ['erzaehler', 'Opa Nik streut Krümel. Die Taube kommt näher.'],
    ['nik', 'Gerd, lass die Kinder in Ruhe.'],
    { wahl: [
      { t: '„Warst du in der Kantine?“', merke: 'darioKantineGefragt', dann: [] },
      { t: '„Danke.“', herz: { dario: 1 }, dann: [] },
      { t: '(Zur Schule schauen.)', dann: [] },
    ] },
    ['dario', 'Alle waren in der Kantine.'],
    ['erzaehler', 'Vom Hof her klingelt es. Dario steht nicht auf.'],
    ['dario', 'Geh schon. Ich komm gleich.'],
  ],
  // Freitag: Mittwoch war jemand anderes dran. Um 23:07 die Nummer (Entscheidung B: Ton und Screenshot)
  n1_freitag: [
    ['erzaehler', 'Freitag. Seit Mittwoch ist jemand anderes dran.'],
    ['erzaehler', 'Ein Mädchen aus der 6e. Beim Sport hingefallen. 74 Prozent cringe.'],
    ['erzaehler', 'Du warst froh. Dann nicht mehr.'],
    { blende: 'Freitag · 23:07' },
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
    ['erzaehler', 'Keine Antwort. Zwei Haken. Gesehen.'],
    ['erzaehler', 'Im Klassenchat steht die Nummer auch. Ohne Namen, ohne Bild. Wie neun andere.'],
    { tu: 'kapitelEnde' },
  ],
  n1_checkin: [
    ['erzaehler', 'Skills-Stunde in der Aula. Auf dem Handy: „Check-in“.'],
    { szene: 'checkin', id: 'checkin1', def: CHECKIN_MI, ausgang: (r) => r.gefuehl, folgen: {} },
  ],
  n1_skills: [
    ['kaya', 'Wéi geet et? Herr Kuedes, SePAS. Hier lernt ihr euch erst mal kennen.'],
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
      { t: '„Was hier gesagt wird, bleibt hier. Außer bei Gefahr.“', staerke: 'vertrauen', herz: { lina: 2, kaya: 1 }, merke: 'regelVertraulich', dann: [
        ['lina', '(nickt. Zweimal.)'], ['kaya', 'Genau. Bei Gefahr hol ich Hilfe. Und sag es euch vorher.'], ['jo', 'Auch im Chat? Das wird schwer.'] ] },
      { t: '„Jede Woche Kekse.“', staerke: 'humor', herz: { ben: 2 }, merke: 'regelKekse', dann: [
        ['ben', 'Endlich eine gute Regel.'], ['kaya', 'Kekse gehen klar. Und von den ernsten: Welche zählt für dich?'] ] },
    ] },
    ['kaya', 'Gut. Unterschreiben. Dann raus auf den Hof.'],
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
      { t: '„Dass man sich traut, Stopp zu sagen.“', staerke: 'klar', dann: [['kaya', 'Kommt in den Vertrag. Danke.']] },
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
  n1_tischNoah: () => { c.S.merke.kantineNoah = true; return []; },
  n1_tischBen: () => { c.S.merke.kantineBen = true; return []; },
});

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
const KANTINE = { kremer: [26.8, -9, -Math.PI / 2], rafa: [24.4, -9.3, -Math.PI / 2], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], dario: [21.05, -10.1, -Math.PI / 2, 'sitzt'], kenan: [21.05, -11.1, -Math.PI / 2, 'sitzt'] };
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
  { id: 'kantine', kap: 1, tag: 'Montag', uhr: 12.17, titel: 'Mittag', ziel: 'Kantine. Tablett in der Hand.', marker: null,
    start: { teleport: 'kantineAusgabe', gespraech: 'n1_kantine' },
    leute: KANTINE,
    fertig: { nachStart: true } },
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
  { wenn: (m) => !!m.tischGerufen, dann: [['ben', '(winkt vom Fenster) {Hl}! Hier! Komm schon!'], ['erzaehler', 'Zu spät. Ben winkt dich her.']],
    sonst: [['ben', '(schaut hoch) Oh. {Hl}. Setz dich.']] },
  ['jo', '(ohne aufzusehen) Der Kleine von der Bank hat schon dreihundert Stimmen.'],
  { wahl: [
    { t: '„Hör auf, Jo.“', staerke: 'klar', herz: { jo: -1 }, merke: 'k1JoGestoppt', dann: [['jo', '(dreht das Handy um) Ich hab nur geguckt.'], ['ben', '(lacht kurz) Uh. Streng.']] },
    { t: '„Wer macht den Account?“', merke: 'k1AccountGefragt', dann: [['jo', 'Keine Ahnung. Aber der ist gut.'], ['ben', 'Der weiß immer, wo alle sind.']] },
    { t: '(Weiteressen.)', merke: 'k1BenWeiter', dann: [['jo', '(hält dir das Handy hin) Guck. Der Mund.']] },
  ] },
  { tu: 'n1_tischBen' },
  { tu: 'gegessen' },
];
// Der vierte Tisch: die 7P1. Kenan zeigt sein „bestes Foto“ – du bist drauf. Keiner hat dich gefragt. Fragen hilft.
const TISCH_P1 = [
  ['kenan', '(schiebt dir sein Handy hin) Guck. Mein bestes von heute.'],
  { handy: { wer: 'Kenans Galerie', wann: '10:07', fotoId: 'kenanDu', alt: 'Du in der Pause. Von unten fotografiert.', text: 'Eigentlich Gerd. Gerd ist weggeflogen.' } },
  ['kenan', 'Gerd war weg. Du warst noch da. Gutes Licht.'],
  { wahl: [
    { t: '„Lösch das. Bitte.“', staerke: 'klar', herz: { kenan: 1 }, merke: 'k1KenanGeloescht', dann: [['kenan', '(tippt zweimal) Weg. Gerd ist eh besser.'], { handy: { wer: 'Kenans Galerie', wann: '10:07', text: '🗑 Foto gelöscht.' } }, ['dario', '(schaut kurz hoch)']] },
    { t: '„Hast du mich gefragt?“', staerke: 'mut', merke: 'k1KenanGefragt', dann: [['kenan', 'Dich? Ich hab Gerd fotografiert.'], ['kenan', '(schaut aufs Bild) … Okay. Nein. Soll ich’s löschen?'],
      { wahl: [
        { t: '„Ja.“', merke: 'k1KenanGeloescht', dann: [['kenan', '(tippt) Weg.'], { handy: { wer: 'Kenans Galerie', wann: '10:07', text: '🗑 Foto gelöscht.' } }] },
        { t: '„Behalt’s.“', merke: 'k1KenanErlaubt', dann: [['kenan', 'Echt? Okay. Danke.']] },
      ] }] },
    { t: '„Ich seh komisch aus.“', merke: 'k1KenanKomisch', dann: [['kenan', 'Von unten sieht jeder komisch aus. Auch Gerd.'], ['kenan', '(wischt weiter)']] },
    { t: '(Nichts sagen.)', merke: 'k1KenanNichts', dann: [['kenan', '(wischt weiter) Und hier: Gerd von hinten.']] },
  ] },
  { handy: null },
  { verdacht: 'kenan', spur: 'Fotografiert den ganzen Tag. Immer von unten.' },
  { tu: 'n1_tischP1' },
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
  m.rafaKuedes ? 'In der Pause: {Hl} ist mit dem Kleinen vom Foto zum SePAS.' : m.rafaDaneben ? 'In der Pause: {Hl} hat sich zu dem Kleinen vom Foto gesetzt.' : m.rafaGeholfen ? 'In der Pause: {Hl} hat mit dem Kleinen vom Foto geredet.'
    : ({ rundlauf: 'In der Pause: {Hl} hat mit Ayla gespielt.', korb: 'In der Pause: {Hl} war am Korb. Da, wo es laut ist.',
    handy: 'In der Pause: {Hl} stand bei Ben und Jo.', brunnen: 'In der Pause: {Hl} war am Brunnen.' }[m.duPausePlatz] || 'In der Pause: {Hl}. Neu.'),
  m.kantineNoah ? 'Und jetzt sitzt {hl} bei mir. Einfach so.' : m.kantineMila ? 'Jetzt bei Mila. Auch okay.' : m.kantineP1 ? 'Jetzt bei der 7P1. Bei Dario und Kenan. Komisch.' : 'Jetzt bei Ben und Jo. Klar.',
  m.kantineNoah ? 'Mal sehen, ob morgen auch.' : 'Ich ess schneller. Dann ist es kürzer.',
];
// Rückblick in Bildern: echte Bilder aus dem eigenen Spiel
export const RUECKBLICK_N1 = (m) => [
  { id: 'rafaBank', titel: '7:26 · Das erste Foto', text: 'Rafa. Eingeschlafen. Gerd an seiner Tüte.' },
  { id: 'haltestelleKlick', titel: 'Drei Handys', text: 'Dario, Lina, Kenan. Einer hat fotografiert.' },
  m.duPausePlatz ? { id: 'duPause', titel: '10:05 · Dein Platz', text: (PAUSE_SATZ[m.duPausePlatz] || '') + ' Genau dieses Bild hat @annexe.cam gepostet.' } : null,
  { id: 'auchPause', titel: 'Währenddessen', text: m.rafaGeholfen ? 'Noah am Zaun. Die ganze Pause allein.' : 'Rafa am Brunnen. Allein mit dem Foto.', auch: true },
  { id: 'hofAlle', titel: '13:31 · Dein Foto', text: (m.fotoMitgelacht ? 'Alle am Handy. Du hast mitgelacht.' : m.k1Stopp ? 'Alle am Handy. Du hast „Stopp.“ gesagt.' : m.k1Geerdet ? 'Alle am Handy. Du hast drei Dinge gesucht. Danach warst du ruhiger.' : m.k1RuhigGeklappt ? 'Alle am Handy. Alles hat gerauscht. Dienstag, in Ruhe: drei Dinge. Hat geklappt.' : 'Alle am Handy. Alles hat gerauscht.')
    + (m.k1DingeBus ? ' Dein Plan: im Bus.' : m.k1DingePause ? ' Dein Plan: in der Pause.' : m.k1DingeBett ? ' Dein Plan: abends im Bett.' : '') },
  { id: 'duAbend', titel: '15:30 · Haltestelle', text: 'Der Bus nach Hause. Am Dienstag dann: „Das liegt nicht an dir.“' },
].filter(Boolean);

// Was aus der privaten Nachricht wurde (dieselben Merker wie früher: abend… für Noah/Mila/Dario, ben… für Ben)
const abendPrivat = (r, m) => {
  const v = PRIVAT_VON(m); m.abendVon = v;
  if (PRIVAT_TEXT(m) && !r.flags.privatDa) { m.abendNichtGesehen = true; return; }   // vorher stumm geschaltet: die Nachricht kam nie an
  const a = r.flags.p_okay ? 'Okay' : r.flags.p_frage ? 'Frage' : r.flags.p_klar ? 'Klar' : r.flags.privatDa ? (r.flags.gruppe ? 'Gruppe' : 'Gelesen') : 'Still';
  if (v === 'ben') m[{ Okay: 'benVerziehen', Frage: 'benGefragt1', Klar: 'benKlar', Gelesen: 'benGelesen', Gruppe: 'benGelesen', Still: 'benNichtGeantwortet' }[a]] = true;
  else m['abend' + a] = true;
};
// ---------- Live-Chat Montagabend: Ben leitet weiter ----------
const POST_TABLETT = (m) => ({
  titel: '7P2', mitglieder: 21, dauer: 30,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Ben hat einen Beitrag weitergeleitet.' },
    { nach: 1.4, wer: '@annexe.cam', bild: PAUSE_BILD[m.duPausePlatz] || PAUSE_BILD.allein, bildId: 'duPause', text: 'neu hier. cool oder cringe? 👀', lacher: { start: 3, proSek: 0.35, stopp: ['klar', 'gemeldet'] } },
    ...(m.joWeiter ? [] : [{ nach: 3.6, wer: 'Jo', text: '58% cringe gerade' }]),
    ...(m.fotoTidderich ? [{ nach: 4.6, wer: 'Ayla', text: 'tidderich hat heute was von „fotos ohne fragen“ gesagt. zufall?' }] : []),
    ...(m.fotoMitgelacht ? [{ nach: 4.2, wer: 'Jo', text: 'sogar {name} hat gelacht 😂 also ist es ok', setzt: 'joLacht' }, { nach: 5.0, wer: 'Ben', text: 'siehste. nur spaß' }] : []),
    { nach: 5.6, wer: 'Mila', text: 'ben. regel 6. lösch das.' },
    ...PRIVAT_BANNER(m),
    { nach: 7.2, system: true, text: 'gesehen von 17' },
    ...(m.joWeiter ? [] : m.k1JoGestoppt ? [{ nach: 9.4, wer: 'Jo', text: 'ich sag nix. sonst wird {name} wieder streng 🙄' }] : m.abgestimmt ? [{ nach: 9.4, wer: 'Jo', text: 'erst der kleine. jetzt hinten links' }] : [{ nach: 9.4, wer: 'Jo', text: 'ist nur ein klick' }]),
    { nach: 12.5, system: true, text: 'Ben hat eine Nachricht gelöscht.' },
    { nach: 14.5, wer: 'Ayla', text: 'wer macht diesen account überhaupt', wennNicht: 'stumm' },
    { nach: 22, system: true, text: 'gesehen von 19' },
  ],
  aktionen: [
    { id: 'schreiben', t: 'In die Gruppe', symbol: '💬', wennNicht: 'privat', ...(m.fotoMitgelacht ? { wenn: 'joLacht' } : {}), wahl: [
      ...(m.fotoMitgelacht ? [
        { t: '„War nicht okay.“', setzt: ['gruppe', 'klar', 'lachenZurueck'], ich: 'war nicht okay. auch mein lachen nicht.', folgen: [{ nach: 1.6, wer: 'Mila', text: 'ok. danke.' }, { nach: 3, wer: 'Jo', text: '…' }] },
        { t: '„Ja. Nur Spaß.“', setzt: ['gruppe', 'witz', 'nurSpass'], ich: 'ja. nur spaß.', folgen: [{ nach: 1.2, wer: 'Jo', text: 'siehste 😂' }] },
      ] : [
        { t: '„Bitte löscht das.“', setzt: ['gruppe', 'klar'], ich: 'bitte löscht das', folgen: [{ nach: 1.4, wer: 'Ayla', text: 'ok. hab ich nicht geteilt' }] },
        { t: '„haha. schlechtes foto.“', setzt: ['gruppe', 'witz'], ich: 'haha. schlechtes foto.', folgen: [{ nach: 1.2, wer: 'Jo', text: 'ok das ist gut 😂' }] },
      ]),
      { t: '„Wer ist @annexe.cam?“', setzt: ['gruppe', 'frage'], ich: 'wer ist annexe.cam?', folgen: [{ nach: 1.6, wer: 'Jo', text: 'keiner weiß das. das ist ja der witz' }] },
      { t: '„Ben. Du sagtest: nicht geteilt.“', setzt: ['gruppe', 'klar', 'luege'], ich: 'ben. du hast gesagt, du hast es nicht geteilt.', folgen: [{ nach: 1.8, wer: 'Ben', text: 'hab nur weitergeleitet.' }, { nach: 3.4, wer: 'Mila', text: 'das ist teilen, ben.' }] },
    ].slice(0, 4) },
    ...PRIVAT_AKTION(m),
    { id: 'beweis', t: 'Screenshot', symbol: '📸', setzt: 'beweis', sys: 'Screenshot gespeichert. 19:31.' },
    { id: 'melden', t: 'Beitrag melden', symbol: '🚩', setzt: 'gemeldet', sys: 'Meldung eingegangen.' },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm. Das Handy liegt still. Du nicht.', ende: true },
  ],
});

// Abends, mitten im Klassenchat: oben rutscht die private Nachricht von der Person vom Mittagstisch rein.
// Ein Daumen: Wer privat antwortet, schreibt nicht mehr in die Gruppe – und umgekehrt. Wer zögert, hat es nur „gelesen“.
const PRIVAT_VON = (m) => (m.kantineNoah ? 'noah' : m.kantineMila ? 'mila' : m.kantineP1 ? 'dario' : 'ben');
const PRIVAT_TEXT = (m) => ({ noah: m.fotoMitgelacht ? 'ich hab nicht abgestimmt. und nicht gelacht.' : 'ich hab nicht abgestimmt.', mila: m.fotoMitgelacht ? '' : 'regen. 10 std. hilft auch nachts.', dario: 'dein foto. geht vorbei. schlaf.', ben: 'sorry. hab nicht nachgedacht. echt.' }[PRIVAT_VON(m)]);
const PRIVAT_NAME = { noah: 'Noah', mila: 'Mila', dario: 'Dario', ben: 'Ben' };
const PRIVAT_BANNER = (m) => (PRIVAT_TEXT(m) ? [{ nach: 6.6, system: true, text: '📩 ' + PRIVAT_NAME[PRIVAT_VON(m)] + ', privat: „' + PRIVAT_TEXT(m) + '“', setzt: 'privatDa' }] : []);
const PRIVAT_ANTWORTEN = {
  noah: [['„Danke.“', 'okay', 'danke', '👍'], ['„Warum sagst du mir das?“', 'frage', 'warum sagst du mir das?', 'mich hat letztes jahr auch einer fotografiert. beim essen.'], ['„Gute Nacht.“', 'klar', 'gute nacht', 'gn']],
  mila: [['„Danke. Probier ich.“', 'okay', 'danke. probier ich', 'lauter als du denkst. leiser als der chat.'], ['„Warum schickst du mir das?“', 'frage', 'warum schickst du mir das?', 'du hast heute mittag ausgesehen wie ich letztes jahr.'], ['„Gute Nacht.“', 'klar', 'gute nacht', '🌧️']],
  dario: [['„Woher hast du meine Nummer?“', 'frage', 'woher hast du meine nummer?', 'ben schickt nummern rum.'], ['„Warum schreibst du mir?“', 'klar', 'warum schreibst du mir?', 'du sahst aus, als würdest du heute nicht schlafen.'], ['„Gute Nacht.“', 'okay', 'gute nacht', 'nacht.']],
  ben: [['„Schon okay.“', 'okay', 'schon okay', 'danke. nächstes mal denk ich erst'], ['„Warum leitest du so was weiter?“', 'frage', 'warum leitest du so was weiter?', 'weiß nicht. alle machen das. ich hab nicht gedacht, dass du es bist'], ['„Nicht okay. Aber danke.“', 'klar', 'nicht okay. aber danke dass du schreibst', 'ja. fair']],
};
const PRIVAT_AKTION = (m) => { const v = PRIVAT_VON(m), n = PRIVAT_NAME[v]; if (!PRIVAT_TEXT(m)) return [];
  return [{ id: 'privat', t: n + ' antworten', symbol: '📩', wenn: 'privatDa', wennNicht: 'gruppe', wahl: PRIVAT_ANTWORTEN[v].map(([t, art, ich, zurueck]) => ({ t, setzt: ['privat', 'p_' + art], sys: '📩 an ' + n + ': ' + ich, folgen: [{ nach: 1.6, system: true, text: '📩 ' + n + ': ' + zurueck }] })) }]; };
// ---------- 23:07: die unbekannte Nummer (Lina). Sechs Sekunden, dann gelöscht. ----------
const NUMMER = {
  titel: '+352 6•• ••• •41', mitglieder: 2, dauer: 20, wahlHaelt: true,
  nachrichten: [
    { nach: 0.8, wer: 'Unbekannt', text: 'ich hab gesehen, wer das foto gemacht hat' },
    { nach: 6.8, system: true, text: 'Diese Nachricht wurde gelöscht.', setzt: 'geloescht' },
  ],
  aktionen: [
    { id: 'beweis', t: 'Screenshot', symbol: '📸', wennNicht: 'geloescht', setzt: 'beweis', sys: 'Screenshot gespeichert. 23:07.' },
    { id: 'antwort', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„wer bist du?“', setzt: ['geschrieben', 'fordernd'], ich: 'wer bist du?', folgen: [{ nach: 1.4, system: true, text: '✓✓ gesehen' }, { nach: 3.2, wer: 'Unbekannt', text: 'kann ich nicht sagen. sorry.' }] },
      { t: '„was hast du gesehen?“', setzt: ['geschrieben', 'frage'], ich: 'was hast du gesehen?', folgen: [{ nach: 1.4, system: true, text: '✓✓ gesehen' }, { nach: 3.6, wer: 'Unbekannt', text: 'die treppe. eine hand. ein handy.' }, { nach: 8.0, system: true, text: 'Diese Nachricht wurde gelöscht.' }] },
      { t: '„alles ok bei dir?“', setzt: ['geschrieben', 'sanft'], ich: 'alles ok bei dir?', folgen: [{ nach: 1.4, system: true, text: '✓✓ gesehen' }, { nach: 3.4, wer: 'Unbekannt', text: 'nein. aber danke, dass du fragst.' }] },
    ] },
    { id: 'block', t: 'Blockieren', symbol: '⛔', setzt: 'blockiert', sys: 'Blockiert.', ende: true, ab: 1.5 },
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
    { id: 'block', t: 'Blockieren', symbol: '⛔', setzt: 'blockiert', sys: 'Blockiert. Das Handy ist still.', ende: true, ab: 1.5 },
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
  { wenn: (m) => !!m.abgestimmt, dann: [['erzaehler', 'Achtundachtzig Stimmen. Eine davon ist deine.']] },
  { wahl: [
    { t: '„Das ist nicht okay.“', staerke: 'klar', herz: { rafa: 1 }, merke: ['rafaGeholfen', 'rafaKlar'], dann: [['rafa', 'Sagt sich leicht.'], ['erzaehler', 'Aber er steckt das Handy weg.']] },
    { t: '„Komm. Zu Herrn Kuedes.“', staerke: 'hilfe', herz: { rafa: 2 }, merke: ['rafaGeholfen', 'rafaKuedes'], dann: [['rafa', '(schluckt) Kommst du mit rein?'], ['erzaehler', 'Ihr geht zusammen zum SePAS. Herr Kuedes hört zu. Dann macht er die Tür zu.'], ['kaya', 'Danke, dass ihr kommt. Ich kümmere mich. Ohne Namen.']] },
    { t: '„Eine war meine. Sorry.“', wenn: (m) => !!m.abgestimmt, staerke: 'ehrlich', herz: { rafa: 1 }, merke: ['rafaGeholfen', 'rafaSorry'], dann: [['rafa', '(schaut hoch) … Wenigstens sagst du’s.']] },
    { t: '„Wenigstens schläfst du gut.“', wenn: (m) => !m.abgestimmt, staerke: 'humor', herz: { rafa: 1 }, merke: ['rafaGeholfen', 'rafaWitz'], dann: [['rafa', '(lacht kurz durch die Nase) Besser als in Mathe.'], ['rafa', '… Danke.']] },
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
  ['lina', '(klappt das Heft halb zu) … Hi.'],
  { ton: 'kamera' },
  { szene: 'stoerung', id: 'k1Klick', pruefe: false,
    def: { bild: { wer: 'lina', von: [-1.5, 1.6, -1.6], auf: [0, 0.9, 0], fov: 44 }, t: 'Klick. Von der Treppe. Leise, aber du hörst es.', hin: 'Hochschauen', bleib: 'Bei Lina bleiben', zeit: 5 },
    ausgang: (r) => (r.hin ? 'hoch' : 'lina'),
    folgen: {
      hoch: { merke: 'k1Hochgeschaut', dann: [['erzaehler', 'Oben dreht sich einer weg. Groß. Mütze.'], { beweis: 'k1Treppe', t: 'Klick von der Treppe, 10:05. Groß, Mütze.' },
        { verdacht: 'kenan', spur: 'Stand um 10:05 oben auf der Treppe. Dann der Klick.' }, ['lina', '(klappt das Heft ganz zu)']] },
      lina: { merke: ['k1BeiLina', 'linaDaneben'], herz: { lina: 1 }, dann: [['lina', '(leise) Du hast es auch gehört.'], ['erzaehler', 'Sie dreht das Heft zu dir. Die Treppe. Ein Arm. Ein Handy.'],
        { beweis: 'k1LinaSkizze', t: 'Linas Heft, 10:05: die Treppe, ein Arm mit Handy.' }, { verdacht: 'lina', spur: 'Zeichnet die Treppe, 10:05. Hat mehr gesehen, als sie sagt.' }] },
    } },
  ['rafa', '(unten, leise) Lasst mich.'],
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
      { t: '„Hast du grad fotografiert?“', beweis: 'k1Dario', merke: 'darioGefragtMorgen', dann: [['dario', '(lacht) Gerd. Die Taube. Jeder fotografiert Gerd.'], ['dario', 'Gerd hat mehr Follower als du.']] },
      { t: '(Nicken.)', dann: [['dario', 'Okay. Wenig Worte.']] },
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
    { tu: 'n1_vertragStill' },
    { tu: 'vertragPlakat' },
    ['hoffmann', '(zeigt aufs Plakat) Unser Vertrag. Zwei Wörter gelten sofort: „Weiter.“ „Stopp.“'],
    ['ben', '(dreht sich um) Moien. Ben. Nummer? Für den Klassenchat.'],
    // Ein Spitzname ist ein Etikett. Wer klebt es? (Ben speichert „{name} 7P2“ – die Spur für Kapitel 5 bleibt)
    ['ben', '(tippt) {name}, 7P2. Gespeichert.'],
    { handy: { wer: 'Bens Handy', wann: 'jetzt', chat: [{ wer: 'Neuer Kontakt', t: '{name} 7P2' }] } },
    ['ben', 'Im Klassenchat sag ich: hinten links. Merkt man sich besser.'],
    { wahl: [
      { t: '„{name} reicht.“', herz: { ben: 1 }, merke: 'nameStattLinks', staerke: 'klar', dann: [['ben', '(löscht es, tippt neu) „{name}“. Okay. Passt.']] },
      { t: '„Hinten links passt.“', merke: 'hintenLinksOk', dann: [['ben', '(grinst) Hinten links. Easy.']] },
      { t: '(Nichts sagen.)', merke: 'nurGelesen', dann: [['ben', '(tippt „hinten links“) Gesendet.']] },
    ] },
    { handy: null },
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
    ['mila', '(vom Nebentisch, zeigt aufs Plakat) Ben. Cool oder cringe – beides ist mitmachen.'],
    { wenn: (m) => !!m.abgestimmt, dann: [['erzaehler', 'Deine Stimme ist drin. Zurück geht nicht.']] },
    ['hoffmann', 'Kennenlernen. Jo, du warst doch auch mal neu.'],
    ['jo', '(grinst) Viermal. Vier Schulen. Ist halt so.'],
    ['erzaehler', 'Alle lachen. Jo am lautesten.'],
    { tu: 'n1_joSchule' },
    { handy: { wer: 'Klassenvertrag', wann: 'gilt sofort', text: '⏭ „Weiter.“ · ✋ „Stopp.“ · Keine Fotos.' } },
    ['jo', '(beugt sich zu dir, leise) Und du? Warum bist du in der P?'],
    { wahl: [
      { t: '„Weiter.“', merke: 'joWeiter', herz: { jo: 1 }, dann: [{ handy: null }, ['jo', '(kurz still) … Okay. Weiter.']] },
      { t: '„Geht dich nix an.“', merke: 'joAbgeblockt', dann: [{ handy: null }, ['jo', '(hebt die Hände) War nur ’ne Frage.']] },
      { t: '„Lange Geschichte.“', merke: 'joLange', dann: [{ handy: null }, ['jo', 'Hab Zeit. Bis Freitag.']] },
    ] },
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
    ['erzaehler', 'Kantine. Pasta. Das Tablett ist schwer. Die Tische laufen voll.'],
    { tu: 'tablett' },
  ],
  // Wohin setzen? Drei Plätze, drei Live-Bilder. Erst danach: was Noah gesehen hat.
  n1_tisch: [
    { szene: 'orte', id: 'tischOrt', pruefe: false,
      // Zwölf Sekunden: Wer zögert, wird gerufen – und sitzt dann bei Ben und Jo. Nicht entscheiden ist auch eine Entscheidung.
      def: { titel: 'Kantine · 12:15', info: 'Tablett in der Hand. Die Plätze gehen weg. Wohin?', zeit: 12, zeitOrt: 'ben',
        orte: [
          { id: 'noah', sy: '📐', name: 'Noah', wer: 'Allein in der Ecke. Zeichnet etwas.', bild: { wer: 'noah', von: [1.5, 1.45, 0.9], auf: [0, 0.95, 0], fov: 46 } },
          { id: 'ben', sy: '📱', name: 'Ben und Jo', wer: 'Am Fenster. Lachen übers Handy.', bild: { wer: 'ben', von: [-1.9, 1.4, 0.6], auf: [0, 0.95, 0.5], fov: 50 } },
          { id: 'mila', sy: '🎧', name: 'Mila', wer: 'Kopfhörer drin. Neben ihr ist frei.', bild: { wer: 'mila', von: [-1.7, 1.25, 0.7], auf: [0, 0.8, 0], fov: 48 } },
          { id: 'p1', sy: '🕶️', name: '7P1 · Dario und Kenan', wer: 'Kenan scrollt durch Fotos. Dario isst.', bild: { wer: 'kenan', von: [1.7, 1.4, 0.8], auf: [0, 0.9, 0.4], fov: 48 } },
        ] },
      ausgang: (r, m) => { if (r.zeitUm) m.tischGerufen = true; return r.ort; },
      folgen: { noah: { dann: TISCH_NOAH }, ben: { dann: TISCH_BEN }, mila: { dann: TISCH_MILA }, p1: { dann: TISCH_P1 } } },
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
    { wenn: (m) => !!m.joWeiter, dann: [['ben', '(laut) {Hl}! Bist du das?'], ['jo', '(leise) Ben. Weiter.']], sonst: [['jo', '(laut) {Hl}! Bist du das?']] },
    { handy: null },
    // 5-4-3-2-1 (Heft #00) als Moment: drei Dinge, keine Menschen. Jeder Treffer macht den roten Rand blasser.
    { szene: 'suchbild', id: 'such2', bildId: 'hofAlle', pruefe: false,
      def: { wo: 'Hof · 13:31', frage: 'Alle lachen. Such drei Dinge, die nicht lachen.', zeit: 12, finde: 3,
        foto: { von: [0, 1.62, 3.4], auf: [0.4, 1.3, 13], fov: 56 },
        gut: 'Drei Dinge. Das Summen wird leiser.', verpasst: 'Gelb: Die waren die ganze Zeit da.',
        ziele: [
          { id: 'wimpel', wo: [3.0, 4.2, 15.25], r: 0.08, t: 'Bunte Wimpel.', kurz: 'Wimpel. Bunt. Sie flattern.' },
          { id: 'mast', wo: [-6.0, 2.6, 16.5], r: 0.07, t: 'Ein grauer Mast.', kurz: 'Ein Mast. Grau. Er steht einfach da.' },
          { id: 'schild', wo: [0, 3.25, 40.0], r: 0.08, t: 'Das Schild am Tor.', kurz: 'Das Schild am Tor. ANNEXE JUNGLINSTER.' },
          { id: 'jo', wer: 'jo', hoehe: 1.4, r: 0.05, richtig: false, t: 'Jo. Ein Mensch. Such Dinge.' },
          { id: 'ben', wer: 'ben', hoehe: 1.4, r: 0.05, richtig: false, t: 'Ben. Ein Mensch. Such Dinge.' },
        ] },
      ausgang: (r, m) => { const n = (r.gefunden || []).length; m.k1Dinge = n; return n >= 3 ? 'drei' : n >= 1 ? 'teil' : 'nicht'; },
      folgen: { drei: { merke: 'k1Geerdet', staerke: 'ruhig', dann: [{ pult: { plus: -5 } }, ['erzaehler', 'Drei Dinge. Das Summen wird leiser. Du stehst noch da.']] },
        teil: { dann: [{ pult: { plus: -2 } }] }, nicht: { dann: [['erzaehler', 'Alles verschwimmt. Gesichter, Handys, dein Foto.']] } } },
    { wenn: (m) => (m.k1Dinge || 0) >= 1, dann: [{ tu: 'n1_dingeTipp' }] },
    { tu: 'n1_daneben' },
    // Rot-Modus: ruhige Antworten sind zu. Ein Wort geht immer: „Stopp.“ (Heft #00 – Stopp gilt sofort). Hilfe holen geht immer.
    { rotHilfe: { id: 'stopp', t: '✋ „Stopp.“', merke: 'k1Stopp', minus: 4, sperre: 'Zu viel. Ein Wort geht: „Stopp.“',
      dann: [['du', 'Stopp.'], { wenn: (m) => !!m.joWeiter, dann: [['ben', '(senkt das Handy) … Okay. Sorry.']], sonst: [['jo', '(senkt das Handy) … Okay.']] }, ['erzaehler', 'Ein Wort. Es wird ein bisschen leiser.']] },
      wahl: [
      { t: 'Mitlachen.', merke: 'fotoMitgelacht', herz: { jo: 1 }, dann: [{ pult: { plus: -1 } }, ['jo', 'Respekt.'], ['erzaehler', 'Du lachst. Dein Gesicht tut weh.'], { tu: 'n1_nebenStumm' }] },
      { t: '„Ja, bin ich. Löscht das.“', ruhig: true, merke: 'fotoKlar', staerke: 'klar', herz: { mila: 1, ayla: 1 }, dann: [['jo', '(hört auf zu grinsen) … Okay.'], ['ayla', '(steckt das Handy weg) Ich hab’s gemeldet.'], { pult: { plus: -2 } }] },
      { t: 'Zu Mme Tidderich.', merke: 'fotoTidderich', staerke: 'hilfe', dann: [['hoffmann', '(schaut lange aufs Display) Danke, dass du mir das zeigst. Das liegt nicht an dir.'], ['hoffmann', 'Ich kümmere mich. Ohne deinen Namen.'], ['jo', '(hinter dir) Petze?'], ['hoffmann', '(ohne sich umzudrehen) Hilfe holen ist kein Petzen, Jo.'], { pult: { plus: -3 } }] },
      { t: 'Handy weg. Weitermachen.', merke: 'fotoWeg', dann: [{ pult: { plus: -2 } }, ['erzaehler', 'Das Handy summt in der Tasche. Du schaust nicht hin.']] },
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
      { t: '📎 „Heut früh: Handy in der Hand.“', beweis: 'k1Dario', merke: 'darioKonfrontiert', dann: [['dario', '(kurz still) … Akku leer.'], ['erzaehler', 'Sein Handy liegt auf dem Knie. Display nach unten. Es leuchtet.'], { verdacht: 'dario', spur: 'Sagt „Akku leer“. Das Handy leuchtet.' }] },
      { t: '„Woher weißt du das alles?“', merke: 'darioWoher', dann: [['dario', 'Sieht man halt. Wenn man hinschaut.']] },
      { t: '„Warum sagst du mir das?“', herz: { dario: 1 }, merke: 'darioWarum1', dann: [['dario', 'Weil’s sonst keiner tut.']] },
    ] },
    ['dario', 'Morgen ist wer anders dran. Immer so.'],
    { foto: 'duAbend', wer: 'du', von: [-2.2, 1.6, 2.6], auf: [0, 1.1, 0], fov: 46 },
    { blende: 'Montag · 19:30' },
    ['erzaehler', 'Dein Handy summt. Der Klassenchat.'],
    { szene: 'chat', id: 'postTablett', def: (m) => POST_TABLETT(m),
      ausgang: (r, m) => { if (r.flags.beweis) m.postScreenshot = true; if (r.flags.lachenZurueck) m.lachenZurueck = true; if (r.flags.nurSpass) m.nurSpass = true; if (r.flags.luege) m.benLuegeAngesprochen = true; abendPrivat(r, m); return r.flags.klar ? 'klar' : r.flags.witz ? 'witz' : r.flags.frage ? 'frage' : r.flags.gemeldet ? 'gemeldet' : r.flags.stumm ? 'stumm' : 'still'; },
      folgen: {
        klar: { staerke: 'klar', herz: { mila: 1, ayla: 1 }, merke: 'postKlar' },
        witz: { staerke: 'humor', herz: { jo: 1 }, merke: 'postWitz' },
        frage: { staerke: 'mut', herz: { mila: 1 }, merke: 'postFrage' },
        gemeldet: { staerke: 'hilfe', merke: 'postGemeldet' },
        stumm: { merke: 'postStumm' },
        still: { merke: 'postStill' },
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
    { wenn: (m) => !!m.nummerBlockiert, dann: [['erzaehler', 'Blockiert. Aber jemand hat etwas gesehen.']], sonst: [['erzaehler', 'Gelöscht. Aber jemand hat etwas gesehen.']] },
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
      ['erzaehler', 'Du willst es jemandem zeigen. Wem?'],
      { wahl: [
        { t: 'Mme Tidderich.', staerke: 'hilfe', merke: 'erzaehltTidderich', dann: [{ blende: 'Dienstag · 7:40' }, ['hoffmann', '(liest lange) Danke. Das liegt nicht an dir.'], ['hoffmann', 'Ab heute gibt es vorne eine Handy-Kiste. Und ich rede mit der Direktion.']] },
        { t: 'Herrn Kuedes (SePAS).', staerke: 'hilfe', merke: 'erzaehltKuedes', dann: [{ blende: 'Dienstag · 7:40' }, ['kaya', '(liest) Das liegt nicht an dir.'], ['kaya', 'Nicht weiterschicken. Nur zeigen, so wie jetzt. … Schläfst du?']] },
        { t: 'Dario. Direkt fragen.', merke: 'erzaehltDario', dann: [{ blende: 'Dienstag · 7:40' }, ['dario', '(liest „morgen ist wer anders dran“) Hab ich gestern gesagt. … Der klaut meine Sätze.'], { beweis: 'k1DarioSatz', t: '@annexe.cam schreibt Darios Satz: „morgen ist wer anders dran“.' }, ['kaya', '(im Gang, leise) Ich hab das Foto gesehen. Das liegt nicht an dir. Meine Tür ist offen.']] },
      ] }], sonst: [{ tu: 'n1_niemand' }, ['erzaehler', 'Das Handy bleibt aus.'],
      // Halt auch ohne Melden: ein Erwachsener hat es gesehen – und sagt, wessen Schuld es nicht ist
      { blende: 'Dienstag · 7:40' }, ['kaya', '(im Gang, leise) Ich hab das Foto gesehen. Das liegt nicht an dir.'], ['kaya', 'Meine Tür ist offen. Auch einfach so.']] },
    // Rafa bleibt nicht ohne Auflösung (auch wenn man in der Pause woanders war) – ohne zu verraten, wer was getan hat
    { wenn: (m) => !m.rafaGeholfen && !m.erzaehltTidderich, dann: [['kaya', 'Das Foto von dem Kleinen aus der 5e hab ich auch gesehen. Ich kümmere mich.']] },
    { wenn: (m) => !m.rafaGeholfen && !!m.erzaehltTidderich, dann: [['hoffmann', 'Das Foto von dem Kleinen aus der 5e hab ich auch gesehen. Ich kümmere mich.']] },
    // Erst in Ruhe üben, dann unter Druck (Heft #00 übt draußen, ohne Stress): wer gestern nicht alle drei fand, bekommt eine ruhige Probe
    { wenn: (m) => (m.k1Dinge || 0) < 3, dann: [['du', '(denkt) Gestern war es zu laut. Jetzt ist es still.'],
      { szene: 'suchbild', id: 'such2ruhig', pruefe: false,
        def: { wo: 'Hof · Dienstag, 7:45', frage: 'Jetzt ist es still. Such drei Dinge.', zeit: 40, finde: 3,
          foto: { von: [0, 1.62, 3.4], auf: [0.4, 1.3, 13], fov: 56 },
          gut: 'Drei Dinge. Geht doch.', verpasst: 'Okay. Die Wimpel, der Mast, das Schild. Sie bleiben da.',
          ziele: [
            { id: 'wimpel', wo: [3.0, 4.2, 15.25], r: 0.08, t: 'Bunte Wimpel.', kurz: 'Wimpel. Bunt.' },
            { id: 'mast', wo: [-6.0, 2.6, 16.5], r: 0.07, t: 'Ein grauer Mast.', kurz: 'Ein Mast. Grau.' },
            { id: 'schild', wo: [0, 3.25, 40.0], r: 0.08, t: 'Das Schild am Tor.', kurz: 'Das Schild. ANNEXE JUNGLINSTER.' },
          ] },
        ausgang: (r, m) => { const n = (r.gefunden || []).length; m.k1DingeRuhig = n; return n >= 3 ? 'drei' : 'nicht'; },
        folgen: { drei: { merke: 'k1RuhigGeklappt', staerke: 'ruhig', dann: [] }, nicht: { dann: [] } } }] },
    { wenn: (m) => (m.k1Dinge || 0) >= 1 || !!m.k1RuhigGeklappt, dann: [['du', '(denkt) Drei Dinge suchen. Das geht. Wo noch?']], sonst: [['du', '(denkt) Drei Dinge suchen. Wo geht es vielleicht?']] },
    { handy: { wer: 'Notiz', wann: 'Dienstag', text: '🖐 Drei Dinge suchen. Wo probierst du’s diese Woche?' } },
    { fest: true, wahl: [
      { t: '❔ Weiß noch nicht.', merke: 'k1DingeOffen', dann: [] }, { t: '🚌 Im Bus.', merke: 'k1DingeBus', dann: [] },
      { t: '🏫 In der Pause.', merke: 'k1DingePause', dann: [] }, { t: '🛏 Abends im Bett.', merke: 'k1DingeBett', dann: [] },
    ] },
    { handy: null },
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
    ['erzaehler', 'Tausch. Du schaust kurz rüber: Noah hat das Tuch auf. Jo führt und grinst zu Ben.'],
    ['noah', '(leise) Stopp.'],
    { bemerke: 'noahStopp' },
    ['jo', 'Da ist nix! Geh einfach!'],
    ['erzaehler', 'Noah macht einen Schritt. Sein Fuß bleibt an der Bank hängen. Er fällt. Auf beide Hände.'],
    ['ben', '(lacht los)'],
    ['jo', '(hebt die Arme) Was? Ich hab doch gesagt, da ist nix.'],
    ['erzaehler', 'Noah zieht das Tuch runter. Er schaut niemanden an.'],
    { pult: { g: 'Ärger', w: 5 } },
    { warum: true, wahl: [
      { t: '„Jo. Er hat Stopp gesagt.“', bemerkt: 'noahStopp', weil: 'Weil du gehört hast, was Noah gesagt hat.', staerke: 'klar', herz: { noah: 2, jo: -1 }, merke: 'sportJoStopp', dann: [
        ['jo', 'Hat er nicht.'], ['noah', '(leise, aber deutlich) Doch. Hab ich.'], ['erzaehler', 'Kurz ist es still. Frau Sommer dreht sich um.'],
        ['sommer', 'Was war?'], ['jo', '(hebt die Hände) Nichts. Okay. Sorry, Noah.'], ['erzaehler', 'Es klingt nicht ganz ehrlich. Aber er hat es gesagt. Vor allen.']] },
      { t: '(Zu Noah gehen. Die Hand hinhalten.)', staerke: 'einbeziehen', herz: { noah: 2 }, merke: 'sportNoahHand', dann: [
        ['erzaehler', 'Du hältst ihm die Hand hin. Er schaut sie an. Dann nimmt er sie.'], ['noah', '(sehr leise) Ich hab Stopp gesagt.'],
        { wahl: [
          { t: '„Ich weiß. Ich hab’s gehört.“', bemerkt: 'noahStopp', weil: 'Weil du hingehört hast.', herz: { noah: 1 }, merke: 'sportNoahGeglaubt', dann: [['noah', '(atmet aus) Okay. Dann spinn ich nicht.']] },
          { t: '„Sag’s Frau Sommer.“', dann: [['noah', 'Nein. Dann bin ich der, der petzt.']] },
          { t: '„Was machen die Hände?“', dann: [['noah', '(reibt sie an der Hose) Brennen. Geht schon.']] },
        ] }] },
      { t: '„Jo. Du warst auch neu.“', bemerkt: 'joVierteSchule', ohne: 'noahStopp', weil: 'Weil Jo heute früh gesagt hat: vier Schulen.',
        staerke: 'lesen', herz: { jo: 1, noah: 1 }, merke: 'sportJoNeu', dann: [
        ['jo', '(schaut dich an. Lange.) … Was soll das jetzt?'], ['erzaehler', 'Du sagst nichts mehr. Jo schaut zu Noah. Dann auf den Boden.'],
        ['jo', '(hält Noah die Hand hin) Komm hoch. … Sorry. War blöd.'], ['noah', '(nimmt die Hand. Zögert.) … Okay.']] },
      { t: '(Frau Sommer holen.)', herz: { noah: 1, jo: -1 }, merke: 'sportSommer', dann: [
        ['sommer', '(kommt, schaut sich Noahs Hände an) Alle mal herkommen.'], ['sommer', 'Was hab ich am Anfang gesagt?'],
        ['ayla', 'Stopp gilt sofort.'], ['sommer', 'Für alle. Auch wenn es von außen lustig aussieht.'],
        ['jo', '(murmelt) Petze.'], ['erzaehler', 'Er schaut dich dabei nicht an. Aber du weißt, wen er meint.']] },
      { t: '(Mitlachen. Ist ja nichts passiert.)', herz: { noah: -2, jo: 1 }, merke: 'sportGelacht', dann: [
        ['erzaehler', 'Du lachst kurz mit. Noah schaut hoch. Genau zu dir. Dann schaut er weg.']] },
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
  // 5-4-3-2-1 bekommt einen Namen und einen Ort: drei Dinge suchen geht immer – auch ohne Spiel (⏸ → Kurz raus)
  n1_dingeTipp: () => { const t = '<b>🖐 Drei Dinge suchen</b><span>Geht immer. Auch im Bus. Im Spiel: ⏸ → Kurz raus.</span>'; c.ui.toast(t, 'ly-t-ent'); return []; },
  n1_chiaraKurz: () => { c.S.merke.chiaraKurz = true; return []; },
  n1_chiaraMorgen: () => { c.S.merke.chiaraMorgen = true; return []; },
  n1_benKorb: () => { c.S.merke.benKorbMorgen = true; return []; },
  // Jo erzählt in der Klasse von seinen vier Schulen – später erinnert sich das Spiel daran
  // Nach den drei Dingen: wer vom Mittag neben dir steht
  n1_daneben: () => { const m = c.S.merke;
    return m.kantineNoah ? [['erzaehler', 'Noah steht neben dir. Er sagt nichts. Er geht auch nicht weg.']] : m.kantineMila ? [['mila', m.milaGefragt1 ? '(hält dir einen Hörer hin) Regen?' : '(hält dir einen Hörer hin, ohne was zu sagen)']]
      : m.kantineP1 ? [['erzaehler', 'Dario steht neben dir. Als Einziger hat er kein Handy in der Hand.'], { beweis: 'k1DarioOhne', t: '13:31: Alle am Handy. Dario nicht.' }, { verdacht: 'dario', spur: '13:31: kein Handy. Schaut zu dir.' }]
      : m.tisch === 'ben' || m.kantineBen ? [['ben', '(lacht) … (hört auf.)']] : []; },
  n1_joSchule: () => { c.S.merke.joSchuleGesehen = true; c.S.bemerkt = { ...(c.S.bemerkt || {}), joVierteSchule: true }; return []; },
  n1_freiwurf: async () => { const t = await c.ui.freiwurf(); c.S.merke.freiwurf = t; return t >= 3 ? [['yusuf', t + ' von 5. Okay. Du darfst wiederkommen.']] : [['yusuf', t + ' von 5. (grinst) Bälle holen. Da hinten.']]; },
  n1_linaFoto: () => { if (c.S.merke.pauseBrunnen) c.S.merke.fotoLina = true; return []; },
  n1_wandNeu: () => { c.ui.toast('<b>📌 Verdachts-Wand</b><span>Was du findest, kommt an die Wand. Heute Nacht entscheidest du.</span>', 'ly-t-ent'); return []; },
  // Das Foto von dir in der Pause: von der Treppe aus, genau da, wo du gerade bist
  n1_pauseFoto: () => {
    const m = c.S.merke, platz = m.pauseZuRafa || m.pauseBrunnen ? 'brunnen' : m.pauseTT ? 'rundlauf' : m.pauseKorbOrt ? 'korb' : m.pauseHandy ? 'handy' : 'allein';
    return [{ schnapp: { id: 'duPause', von: [0, -1.2], hoehe: 4.4, abstand: 5.6, fov: 36, sonst: platz } }, { foto: 'kenanDu', wer: 'du', von: [1.1, 0.35, 1.5], auf: [0, 1.3, 0], fov: 50 }];
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
  // Nach dem Mitlachen: wer vom Mittag neben dir steht, sagt nichts – tut aber etwas
  n1_nebenStumm: () => { const m = c.S.merke;
    return m.kantineNoah ? [['noah', '(tritt einen Schritt weg)']] : m.kantineMila ? [['mila', '(nimmt den Hörer zurück)']] : m.kantineP1 ? [['dario', '(schaut weg. Zum ersten Mal.)']] : m.kantineBen ? [['ben', '(lacht mit. Lauter als du.)']] : []; },
  n1_tischP1: () => { c.S.merke.kantineP1 = true; c.S.merke.tisch = 'p1'; return []; },
});

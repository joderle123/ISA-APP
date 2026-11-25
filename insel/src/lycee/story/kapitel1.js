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
const HALTESTELLE = { dario: [-20.5, 42.3, -1.9], lina: [-25.6, 44.4, 0.8], fahrer: [-11.2, 44.6, -Math.PI / 2], rafa: [-23.2, 41.85, 0, 'schlaeft'] };
// Sport, Dienstag: Paare stehen beieinander (Yusuf neben dir, Jo mit Noah an der zweiten Bank)
const SPORT_HALLE = { sommer: [45.2, -12.6, Math.PI], yusuf: [43.2, -15.4, 0.3], jo: [47.7, -21.5, -2.6], noah: [46.6, -22.5, 2.9], ben: [42, -16.6, 0.4], ayla: [50.2, -17.6, -0.3], lina: [51.4, -11.5, -0.8], chiara: [52.2, -16.2, -0.6], mila: [52.4, -14.2, -1.2] };
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
  // Neues Spielsystem (Baustein 1): die große Pause als freier Moment – echte Zeit, mehrere Fäden, man schafft nicht alles
  // Gesamtkonzept K1, Szene 4: Man kann nicht überall sein. Um 3:20 fotografiert jemand von der Treppe – genau dort, wo du gerade bist.
  // Sehen kann man die Hand nur vom Brunnen und vom Zaun aus. Ab 4:00 sucht Chiara dich mit dem Stundenplan.
  { id: 'pause', kap: 1, tag: 'Montag', uhr: 10.0, titel: 'Große Pause', ziel: 'Fünf Minuten. Ben winkt. Am Brunnen Rafa und Lina. Noah am Zaun. Hinten wird gekorbt.', marker: 'ben',
    start: { teleport: 'eingangHof' },
    leute: { ben: [4, 14, 0.6, 'redet'], jo: [5.2, 15.4, -2.4, 'handy'], mila: [-20, 11.6, Math.PI, 'sitzt'], noah: [-14, 12.2, -0.29], ayla: [-20, 34.3, Math.PI], chiara: [2, 18.4, 0.6, 'handy'], rafa: [-6.4, 21.6, 2.2], lina: [-10.6, 15.4, 2.59], yusuf: [27.4, 21.0, -1.2] },
    frei: { titel: 'Große Pause', dauer: 300,
      faeden: {
        ben: { gespraech: 'n1_umfrage', label: 'Ben und Jo am Handy' },
        rafa: { gespraech: 'n1_rafa', label: 'Junge am Brunnen', bis: 190 },
        lina: { gespraech: 'n1_linaBrunnen', label: 'Lina zeichnet' },
        noah: { gespraech: 'n1_noahZaun', label: 'Noah allein' },
        ayla: { gespraech: 'n1_rundlauf', label: 'Tischtennis: Ayla sucht einen' },
        yusuf: { gespraech: ['freiwurf', 'freiwurfDanach'], label: 'Basketball' },
        mila: { gespraech: 'mila', label: 'Mila auf der Bank' },
        chiara: { gespraech: 'n1_chiaraPlan', label: 'Chiara sucht dich', ab: 240 },
      },
      ereignisse: [
        { t: 190, gespraech: 'n1_rafaSieht' },
        { t: 200, schnapp: { id: 'duPause', von: [0, -1.2], hoehe: 2.4, abstand: 7, fov: 34, sonst: 'allein', gesehen: 'n1_treppeHand',
          plaetze: [
            { key: 'drinnen', zMax: 1.2, nah: true },
            { key: 'rundlauf', x: -20, z: 32, r: 5 },
            { key: 'noah', wer: 'noah', r: 3.4, sieht: true },
            { key: 'brunnen', x: -8, z: 18, r: 5.2, sieht: true },
            { key: 'mila', wer: 'mila', r: 3.2 },
            { key: 'handy', wer: 'ben', r: 3.6 },
            { key: 'korb', x: 29, z: 19, r: 9 },
            { key: 'skate', x: -36, z: 12, r: 10 },
          ],
          auch: [{ id: 'auchNoah', wer: 'noah', von: [1.4, 1.45, -2.1], auf: [0, 1.05, 0], fov: 44 }, { id: 'auchLina', wer: 'lina', von: [-1.2, 1.6, 1.8], auf: [0, 1.25, 0], fov: 42 }] } },
        { t: 240, toast: '<b>Chiara</b><span>läuft mit einem Zettel über den Hof. Sie sucht jemanden. Dich?</span>' },
      ],
      ende: 'n1_pauseEnde' },
    fertig: { frei: true } },
  { id: 'kantine', kap: 1, tag: 'Montag', uhr: 12.17, titel: 'Mittag', ziel: 'Hol dir ein Essen an der Ausgabe.', marker: 'kremer',
    start: { teleport: 'kantineTuer' },
    leute: { kremer: [26.8, -9, -Math.PI / 2], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], dario: [21.4, -13.2, 0.9], kenan: [21.0, -12.0, 1.2] },
    fertig: { ort: 'kantineAusgabe', r: 1.8, gespraech: 'n1_kantine' } },
  { id: 'tisch', kap: 1, tag: 'Montag', uhr: 12.25, titel: 'Wohin setzen?', ziel: 'Hinten links sitzt Noah allein. Am Fenster Ben und Jo.', marker: ['noah', 'ben'],
    leute: { kremer: [26.8, -9, -Math.PI / 2], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], mila: [21.05, -4.9, -Math.PI / 2, 'sitzt'], dario: [21.4, -13.2, 0.9], kenan: [21.0, -12.0, 1.2] },
    fertig: { eins: ['noah', 'ben'] } },
  // Gesamtkonzept K1, Szene 7: Das Foto kommt. Es zeigt dich so, wie du in der Pause warst. Die Umfrage läuft live.
  { id: 'k1_foto', kap: 1, tag: 'Montag', uhr: 13.5, titel: 'Das Foto', ziel: 'Mittagspause auf dem Hof. Überall summen die Handys.', marker: 'jo',
    start: { teleport: 'eingangHof', gespraech: 'n1_foto' },
    leute: { jo: [3.4, 8.6, 2.8, 'handy'], ben: [4.8, 9.6, -2.3, 'handy'], ayla: [-2.4, 9.8, 2.2, 'handy'], chiara: [-3.8, 9.0, 0.9, 'handy'], lina: [-10.6, 15.4, 2.59], hoffmann: [6.6, 4.6, -1.2], yusuf: [27.4, 21.0, -1.2] },
    fertig: { nachStart: true } },
  { id: 'heimweg', kap: 1, tag: 'Montag', uhr: 15.5, titel: 'Nach Hause', ziel: 'Geh zum Bus.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { fahrer: [-11.2, 44.6, -Math.PI / 2], lina: [-25.6, 44.4, 0.8], ben: [8, 36, 2.6], jo: [9.2, 35.4, -2.2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'n1_heimweg' } },
  { id: 'k1_dario', kap: 1, tag: 'Dienstag', uhr: 7.42, titel: 'Die Bank ist noch nass', ziel: 'Dario sitzt schon an der Haltestelle.', marker: 'dario',
    start: { teleport: 'busAnkunft' },
    leute: HALTESTELLE_BANK,
    fertig: { reden: 'dario', gespraech: 'n1_darioBank' } },
  // ---------- Dienstag: Sport. Wer führt, trägt. (Hauptweg) ----------
  { id: 'k1_sport', kap: 1, tag: 'Dienstag', uhr: 9.92, titel: 'Sport: Wer führt, trägt', ziel: 'Turnhalle. Frau Sommer hat Hütchen und Bänke aufgebaut.', marker: 'sommer',
    start: { teleport: 'turnhalleTuer' },
    leute: SPORT_HALLE,
    fertig: { reden: 'sommer', gespraech: 'n1_sport' } },
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

// ---------- Wo warst du in der großen Pause? (Schnappschuss) – Bildbeschreibung, Noahs Sicht, Rückblick ----------
const PAUSE_BILD = {
  noah: 'Du, neben Noah am Zaun. Von schräg oben.', brunnen: 'Du, am Brunnen. Allein. Von schräg oben.', mila: 'Du, bei Mila auf der Bank. Von oben.',
  handy: 'Du, mit Ben und Jo über ein Handy gebeugt. Von oben.', korb: 'Du, am Korb. Mitten im Wurf.', skate: 'Du, an der Skate-Ecke. Von weit weg.',
  drinnen: 'Du, an einer Tür. Von hinten.', allein: 'Du, mitten auf dem Hof. Allein. Von schräg oben.',
  rundlauf: 'Du, am Tischtennis-Tisch. Mitten im Schlag.',
};
const PAUSE_SATZ = {
  noah: 'In der großen Pause hast du bei Noah am Zaun gesessen.', brunnen: 'In der großen Pause warst du am Brunnen.', mila: 'In der großen Pause warst du bei Mila auf der Bank.',
  handy: 'In der großen Pause warst du bei Ben und Jo am Handy.', korb: 'In der großen Pause warst du am Korb.', skate: 'In der großen Pause warst du an der Skate-Ecke.',
  drinnen: 'In der großen Pause warst du drinnen.', allein: 'In der großen Pause warst du allein unterwegs.',
  rundlauf: 'In der großen Pause hast du Tischtennis gespielt.',
};
const NOAH_SIEHT = {
  noah: ['Hinten links. Hat sich in der Pause zu mir gesetzt.', 'Einfach so. Das macht hier keiner.', 'Ich schau nicht hin. Sonst sieht es aus, als würde ich warten.'],
  korb: ['Hinten links war am Korb. Bei Yusuf.', 'Klar. Am ersten Tag geht man dahin, wo es laut ist.', 'Hätte ich auch gemacht. Wenn ich mich trauen würde.'],
  handy: ['Hinten links stand bei Ben und Jo. Am Handy.', 'Die lachen immer über jemanden.', 'Mal sehen, wann ich dran bin.'],
  brunnen: ['Hinten links stand am Brunnen. Allein.', 'Ich am Zaun, Hinten links am Brunnen. Zwanzig Meter.', 'Komisch, dass das keiner zusammenzählt.'],
  mila: ['Hinten links saß bei Mila. Die redet sonst mit keinem.', 'Vielleicht ist Hinten links okay.'],
  skate: ['Hinten links war bei den Großen an der Skate-Ecke.', 'Mutig. Oder egal.'],
  drinnen: ['Hinten links war in der Pause drinnen.', 'Wer am ersten Tag reingeht, hat einen Grund.'],
  allein: ['Hinten links ist in der Pause einfach herumgelaufen.', 'Kenn ich. Wenn man nicht weiß, wohin, läuft man.', 'Dann sieht es aus, als hätte man ein Ziel.'],
  rundlauf: ['Hinten links hat Tischtennis gespielt. Mit Ayla.', 'Ich hab zugeschaut. Vom Zaun aus.', 'Nächstes Mal vielleicht. Wenn mich einer fragt.'],
};
const NOAH_MIT = ['Hinten links hat mich zum Tischtennis geholt. Leise. Nicht vor allen.', 'Zwei Runden. Ich hab einen Punkt gemacht.', 'Einen. Aber immerhin.'];
const NOAH_LAUT = ['„Noah spielt mit!“ Vor allen. Alle haben sich umgedreht.', 'Hinten links wollte nett sein. Glaub ich.', 'Ich hab Nein gesagt. Was sonst.'];
// Rückblick in Bildern (Gesamtkonzept K1): echte Bilder aus dem eigenen Spiel. „Das war auch“: was man nicht gesehen hat.
export const RUECKBLICK_N1 = (m, S = {}) => {
  const b = S.bemerkt || {}, platz = m.duPausePlatz;
  const auch = !m.frei_pause_noah && platz !== 'noah' ? { id: 'auchNoah', titel: 'Das war auch', text: 'Noah am Zaun. Die ganze Pause allein.', auch: true }
    : !b.linaBlick ? { id: 'auchLina', titel: 'Das war auch', text: 'Lina am Brunnen. Sie schaut immer wieder zur Treppe.', auch: true } : null;
  return [
    { id: 'duAnkunft', titel: 'Ankunft', text: 'Montag, 7:25. Die Haltestelle.' },
    platz ? { id: 'duPause', titel: 'Dein Platz in der Pause', text: (PAUSE_SATZ[platz] || '') + ' Genau dieses Bild hat @annexe.cam gepostet.' } : null,
    { id: 'rafaBank', titel: 'Das erste Foto', text: 'Rafa, eingeschlafen an der Haltestelle. Von heute früh.' },
    auch,
    { id: 'duAbend', titel: 'Nachmittag an der Haltestelle', text: 'Der Bus nach Hause.' },
    { id: 'sportWeg', titel: 'Dienstag, Sport', text: 'Dein Weg mit Tuch vor den Augen. ' + (m.sportStoppIgnoriert ? 'Frau Sommer hat dich geführt.' : 'Yusuf hat dich geführt.') + (m.sportSelbstStopp ? ' Du hast selbst Stopp gesagt.' : '') },
  ].filter(Boolean);
};

// ---------- Live-Chat Montagabend: Ben leitet weiter (Fable K1, Sz. 5) ----------
const POST_TABLETT = (m) => ({
  titel: '7P2', mitglieder: 21, dauer: 30,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Ben hat einen Beitrag weitergeleitet.' },
    { nach: 1.4, wer: '@annexe.cam', bild: PAUSE_BILD[m.duPausePlatz] || PAUSE_BILD.allein, bildId: 'duPause', text: 'neu hier. cool oder cringe? 👀', lacher: { start: 3, proSek: 0.35, stopp: ['klar', 'gemeldet'] } },
    { nach: 3.6, wer: 'Jo', text: m.selbstAbgestimmt ? 'hinten links hat selbst abgestimmt 😂' : '61% cringe gerade' },
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
  yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' }, sommer: { id: 'sommer', name: 'Frau Sommer', farbe: '#e07b39', weib: true },
};
// Noahs Sicht nach dem Sturz an der Bank: was er von dir mitbekommt (Kapitel 1, Sport)
const NOAH_SPORT = (m) => {
  const a = 'Dunkel. Die Bank. Meine Hände brennen.';
  if (m.sportJoStopp) return [a, 'Dann sagt jemand: „Er hat Stopp gesagt.“', 'Jemand hat es gehört. Ich hab es wirklich gesagt.'];
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
  n1_intro: [
    ['erzaehler', 'Montag. 7:25. Erster Tag.'],
    ['erzaehler', 'Die Bustür geht zu. Du weißt nicht, wohin.'],
    ['erzaehler', 'Ein alter Mann streut Krümel für eine Taube. Auf der Mauer zeichnet jemand.'],
    ['erzaehler', 'Ein Junge mit Skateboard unter dem Arm schaut zu dir rüber.'],
    ['erzaehler', 'Auf der Bank schläft ein kleiner Junge. Den Kopf am Glas.'],
    // Neues Spielsystem (Baustein 2): Hinschauen. Nur drei Blicke – man sieht nicht alles. Was man sieht, öffnet in der Pause andere Wege.
    { blick: { titel: 'Haltestelle', blicke: 3, text: 'Der Bus ist weg. Du hast einen Moment. Wer ist hier – und was ist los?',
      personen: [
        { wer: 'rafa', name: 'Junge auf der Bank', signale: [
          { wo: 'Gesicht', t: 'Augen zu. Der Mund steht ein bisschen offen. Er schläft.', key: 'rafaSchlaeft' },
          { wo: 'Rucksack', t: 'Am Rucksack hängt ein Schild: „Rafa · 5e“.', key: 'rafaName' },
          { wo: 'Haltung', t: 'Er hält die Jacke fest, auch im Schlaf. Die Nacht war wohl kurz.' } ] },
        { wer: 'dario', name: 'Junge mit Skateboard', signale: [
          { wo: 'Hände', t: 'Er hält das Handy schräg hoch. Richtung Bank. Dann steckt er es weg.', key: 'darioHandy' },
          { wo: 'Gesicht', t: 'Er grinst kurz. Dann schaut er schnell zu dir.' },
          { wo: 'Haltung', t: 'Das Brett unterm Arm. Er steht so, dass er alles sieht.' } ] },
      ],
      uebersehen: [{ key: 'darioHandy', t: 'Dario hält das Handy Richtung Bank.' }, { key: 'rafaSchlaeft', t: 'Der Junge auf der Bank schläft.' }] } },
    { foto: 'rafaBank', wer: 'rafa', von: [1.5, 1.05, 1.1], auf: [0, 0.95, 0], fov: 40 },
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
    { foto: 'duAnkunft', wer: 'du', von: [2.0, 1.55, 2.4], auf: [0, 1.15, 0], fov: 46 },
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
    // Gesamtkonzept K1, Szene 3: der Klassenvertrag (Vie et société). Die eigene Regel kann den Ausschlag geben – und gilt dann.
    ['hoffmann', 'Bevor wir anfangen: unser Klassenvertrag. Sieben Regeln stehen an der Tafel. Vier kommen an die Wand. Für das ganze Jahr.'],
    ['erzaehler', 'Stopp gilt sofort. · Kein Foto ohne Fragen. · Ausreden lassen. · Handys in der Stunde in die Kiste. · Was hier gesagt wird, bleibt hier, außer bei Gefahr. · Niemand isst allein. · Wer zu spät kommt, bringt Kuchen.'],
    ['jo', 'Kuchen! Ganz klar Kuchen.'],
    ['hoffmann', 'Jeder klebt einen Punkt. Nicht die Regel, die gut klingt. Die, die du selbst brauchst.'],
    { warum: true, wahl: [
      { t: 'Punkt auf „Kein Foto ohne Fragen“.', merke: ['vertragGewaehlt', 'vertragFoto'], dann: [['erzaehler', 'Ben schaut kurz zu dir rüber. Dann klebt er seinen Punkt woanders hin.']] },
      { t: 'Punkt auf „Niemand isst allein“.', merke: ['vertragGewaehlt', 'vertragEssen'], dann: [['erzaehler', 'Vorne links nickt Noah. Ganz kurz. Er klebt seinen Punkt daneben.']] },
      { t: 'Punkt auf „Stopp gilt sofort“.', merke: ['vertragGewaehlt', 'vertragStopp'], dann: [['erzaehler', 'Mila klebt ihren Punkt direkt neben deinen. Ohne dich anzuschauen.']] },
      { t: 'Punkt auf „Wer zu spät kommt, bringt Kuchen“.', merke: ['vertragGewaehlt', 'vertragKuchen'], herz: { jo: 1 }, dann: [['jo', 'Endlich jemand mit Geschmack.'], ['hoffmann', '(trocken) Notiert, Jo.']] },
    ] },
    ['erzaehler', 'Mme Tidderich zählt. Die Punkte hängen eng beieinander.'],
    { wenn: (m) => m.vertragFoto, dann: [['hoffmann', 'Stopp gilt sofort. Ausreden lassen. Was hier gesagt wird, bleibt hier. Und mit einer Stimme Vorsprung: Kein Foto ohne Fragen.'], ['erzaehler', 'Eine Stimme. Deine.']] },
    { wenn: (m) => m.vertragEssen, dann: [['hoffmann', 'Stopp gilt sofort. Ausreden lassen. Was hier gesagt wird, bleibt hier. Und mit einer Stimme Vorsprung: Niemand isst allein.'], ['erzaehler', 'Eine Stimme. Deine.']] },
    { wenn: (m) => m.vertragStopp || m.vertragKuchen, dann: [['hoffmann', 'Stopp gilt sofort. Ausreden lassen. Was hier gesagt wird, bleibt hier. Und: Handys in der Stunde in die Kiste.'], { wenn: (m) => m.vertragKuchen, dann: [['jo', '(leise) Kuchen hat verloren. Skandal.']] }] },
    { tu: 'vertragPlakat' },
    ['hoffmann', 'Die vier hängen ab heute hier. Wer sie bricht, muss sie nicht auswendig können. Aber erklären.'],
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
    ['erzaehler', 'Jo hält dir das Handy hin. Ein Account: @annexe.cam.'],
    // Neues Spielsystem (Baustein 4): Das Foto ist echt zu sehen – aufgenommen heute früh an der Haltestelle. Die Stimmen steigen live.
    { handy: { wer: '@annexe.cam', wann: 'vor 2 Std.', fotoId: 'rafaBank', alt: 'Ein Junge schläft an der Haltestelle, den Kopf am Glas',
      text: 'neu in der 5e. eingepennt an der haltestelle 😴 cool oder cringe?', umfrage: { a: 'cringe', b: 'cool', pa: 61, stimmen: 34, live: true } } },
    { pult: { g: 'Dazugehören', w: 5 } },
    ['jo', '(lacht) Guck den an. Der Mund!'],
    ['erzaehler', 'Es ist wirklich lustig. Das ist das Problem.'],
    ['jo', 'Stimm ab. Ist nur ein Klick.'],
    { warum: true, wahl: [
      { t: 'Abstimmen: „cringe“. Mitlachen.', herz: { jo: 1, ben: 1 }, merke: ['abgestimmt', 'abgestimmtCringe'], dann: [{ pult: { plus: -2 } }, ['jo', 'Siehste. Zweiundsechzig Prozent.'], ['erzaehler', 'Ihr lacht. Für einen Moment gehörst du dazu.']] },
      { t: 'Abstimmen: „cool“. Ist ja nur Spaß.', herz: { jo: 1 }, merke: ['abgestimmt', 'abgestimmtCool'], dann: [{ pult: { plus: -1 } }, ['jo', 'Cool? Mutig.'], ['erzaehler', 'Ihr lacht. Abgestimmt ist abgestimmt.']] },
      { t: '„Wer macht so was eigentlich?“', merke: ['nichtAbgestimmt', 'umfrageGefragt'], dann: [['jo', 'Keine Ahnung. Ist halt der Account.'], ['ben', '(leiser) Keiner weiß es. Das ist ja das Krasse.']] },
      { t: 'Handy zurück. „Spielt ihr nachher Basketball?“', merke: 'nichtAbgestimmt', dann: [['ben', '(grinst) Klar. Du bist dabei.'], ['jo', 'Langweilig. Okay.']] },
      { t: '„Der steht da drüben am Brunnen. Er weiß es noch nicht.“', bemerkt: 'rafaSchlaeft', weil: 'Weil du ihn heute früh gesehen hast.', merke: ['nichtAbgestimmt', 'rafaGezeigt'], herz: { jo: -1, ben: 1 }, staerke: 'mut',
        dann: [['jo', '(dreht das Handy weg) Ups.'], ['ben', '(schaut rüber) Oh. Der ist ja winzig.'], ['erzaehler', 'Ben stimmt nicht ab. Jo schon – aber leiser.']] },
      { t: '„Das Foto ist von heute früh. Ich hab gesehen, wie jemand fotografiert hat.“', bemerkt: 'darioHandy', weil: 'Weil du an der Haltestelle hingeschaut hast.', merke: ['nichtAbgestimmt', 'fotografGesehen'],
        dann: [['jo', '(sofort) Echt? Wer?'], ['ben', 'Sag schon.'],
          { wahl: [
            { t: '„Sag ich nicht. Aber ich find’s nicht okay.“', staerke: 'klar', merke: 'fotografVerschwiegen', dann: [['jo', 'Langweilig.'], ['ben', '(nickt langsam) Okay.']] },
            { t: '„Einer mit Skateboard. Aus der 7P1, glaub ich.“', merke: 'fotografVerraten', herz: { jo: 1 }, dann: [['jo', '(grinst) Dario? Der? Niemals.'], ['erzaehler', 'Jo tippt schon. In zehn Minuten weiß es der halbe Hof.']] },
          ] }] },
    ] },
    { handy: null },
    ['erzaehler', 'Jo scrollt weiter. Der nächste Post.'],
    { wenn: (m) => m.rafaGezeigt, dann: [['erzaehler', 'Ben schaut zum Brunnen. Er sagt nichts. Aber er lacht auch nicht mehr.']] },
    { pult: null },
  ],
  // Pause: Rafa am Brunnen (nur bis kurz vor dem Moment, in dem er das Foto sieht)
  n1_rafa: [
    ['erzaehler', 'Rafa wirft eine Münze in den Brunnen. Er schaut hoch.'],
    ['rafa', 'Was?'],
    { wahl: [
      { t: '„Moien. Bist du auch neu?“', herz: { rafa: 1 }, dann: [['rafa', 'Fünfte Woche. Ich schlaf noch im Bus ein. Jeden Tag.'], ['rafa', '(grinst schief) Peinlich, oder?']] },
      { t: '„Da ist ein Foto von dir. Auf so einem Account.“', bemerkt: 'rafaSchlaeft', weil: 'Weil du ihn heute früh gesehen hast.', merke: 'rafaGewarnt',
        dann: [['rafa', '(wird rot) Was für ein Foto?'],
          { wahl: [
            { t: '„Lieber von mir als von allen. Komm, wir sagen es Herrn Kuedes.“', staerke: 'hilfe', herz: { rafa: 2 }, merke: 'rafaKuedes', dann: [['rafa', '(schluckt) … Kommst du mit?'], ['erzaehler', 'Ihr geht zusammen rein. Am Brunnen ist es plötzlich leer.']] },
            { t: '„Nicht so schlimm. Die lachen nur kurz.“', merke: 'rafaKleingeredet', dann: [['rafa', '(leise) Alle?'], ['erzaehler', 'Er zieht die Jacke enger.']] },
          ] }] },
      { t: '„Alles okay?“', dann: [['rafa', 'Ja. Nur müde.'], ['erzaehler', 'Er lügt nicht. Er weiß es nur noch nicht.']] },
    ] },
  ],
  n1_rafaSieht: [
    { wenn: (m) => m.rafaKuedes, dann: [['erzaehler', 'Drinnen redet Herr Kuedes mit Rafa. Die Tür bleibt zu.']],
      sonst: [
        ['erzaehler', 'Am Brunnen hält jemand Rafa ein Handy hin.'],
        // Neues Spielsystem (Baustein 5): andere Sicht – ein paar Sekunden durch Rafas Augen
        { sicht: { wer: 'rafa', name: 'Rafa', auf: 'jo', lachen: ['jo', 'ayla', 'chiara'], gedanken: ['Das bin ich. Mit offenem Mund.', 'Einundsechzig Prozent. Was heißt das?', 'Da drüben lachen sie. Über mich? Bestimmt über mich.'] } },
        ['erzaehler', 'Rafa steckt die Hände in die Jacke. Er geht rein. Allein.'],
      ] },
  ],
  // Lina am Brunnen: Hinschauen. Wohin schaut sie? (öffnet später „Zu Lina gehen“)
  n1_linaBrunnen: [
    ['erzaehler', 'Lina lehnt am Brunnen. Ein Heft auf dem Knie. Sie zeichnet.'],
    { blick: { titel: 'Lina', blicke: 2, text: 'Sie hat dich noch nicht bemerkt. Zwei Blicke. Was siehst du?',
      personen: [{ wer: 'lina', name: 'Lina', signale: [
        { wo: 'Augen', t: 'Sie schaut immer wieder hoch. Nicht zu dir. Zur Treppe am Eingang.', key: 'linaBlick' },
        { wo: 'Hände', t: 'Jedes Mal, wenn sie hochschaut, bleibt der Stift stehen.' },
        { wo: 'Heft', t: 'Der Hof, von oben gezeichnet. Auf der Treppe eine kleine Figur, ganz dunkel schraffiert.', key: 'linaZeichnung' } ] }],
      uebersehen: [{ key: 'linaBlick', t: 'Lina schaut immer wieder zur Treppe.' }] } },
    ['lina', '(klappt das Heft halb zu) … Hi.'],
    { wahl: [
      { t: '„Was zeichnest du?“', dann: [['lina', 'Nichts. Nur den Hof.'], ['erzaehler', 'Das Heft bleibt halb zu.']] },
      { t: '„Wen suchst du da oben?“', bemerkt: 'linaBlick', weil: 'Weil du gesehen hast, wohin sie schaut.', herz: { lina: 1 }, merke: 'linaTreppeGefragt',
        dann: [['lina', '(schaut dich zum ersten Mal an) … Niemand.'], ['lina', 'Da steht manchmal jemand. Bleib kurz hier. Bitte.']] },
      { t: '(Danebenstellen. Nichts sagen.)', herz: { lina: 1 }, merke: 'linaDaneben', dann: [['erzaehler', 'Ihr steht da. Sie zeichnet weiter. Einmal schiebt sie das Heft ein Stück zu dir.']] },
    ] },
  ],
  // Tischtennis: Ayla hat zwei Schläger. Fehlt einer.
  n1_rundlauf: [
    { wenn: (m) => m.noahRundlauf, dann: [['ayla', 'Oh, Noah! Endlich mal. Hinten links, du zuerst. Dann er.']],
      sonst: [['ayla', 'Hinten links! Spielst du? Mir fehlt einer.']] },
    { wahl: [
      { t: '„Klar. Eine Runde.“', herz: { ayla: 1 }, merke: 'rundlaufGespielt', dann: [{ tu: 'tt3d', mit: 'ayla' },
        ['ayla', '(grinst) Okay. Du bist gebucht. Morgen wieder.'],
        { wenn: (m) => m.noahRundlauf, dann: [['erzaehler', 'Dann ist Noah dran. Er verliert. Er lacht dabei. Einmal, kurz.'], ['noah', '(leise) Hab ich lange nicht gemacht.']] }] },
      { t: '„Nachher vielleicht.“', dann: [['ayla', 'Okay. Der Tisch läuft nicht weg.']] },
    ] },
  ],
  // Um 3:20 – nur vom Brunnen und vom Zaun aus zu sehen
  n1_treppeHand: [
    ['erzaehler', 'Oben auf der Treppe, halb hinter der Säule: eine Hand. Ein Handy. Es zeigt hier rüber.'],
    ['erzaehler', 'Auf dich?'],
    ['erzaehler', 'Dann ist die Hand weg. Die Tür fällt zu.'],
    { bemerke: 'treppeHand' },
    { wenn: (m) => m.frei_pause_lina, dann: [['lina', '(leise, ohne aufzuschauen) Du hast es auch gesehen.']] },
    { wenn: (m) => m.duPausePlatz === 'noah', dann: [['noah', '(leise) Das macht der jeden Tag. Oder die. Keine Ahnung.']] },
  ],
  // Ab 4:00: Chiara mit dem Stundenplan
  n1_chiaraPlan: [
    ['chiara', 'Da bist du! Ich such dich seit zwei Minuten.'],
    ['chiara', 'Dein Stundenplan. Von Mme Tidderich. Sport ist Mittwoch, nicht Donnerstag. Im Netz steht es falsch.'],
    { wahl: [
      { t: '„Danke. Echt.“', herz: { chiara: 1 }, merke: 'chiaraPlan', dann: [['chiara', 'Gern. Bei Fragen: mich fragen. Nicht Jo.']] },
      { t: '„Woher weißt du das alles?“', herz: { chiara: 1 }, merke: 'chiaraPlan', dann: [['chiara', '(zuckt mit den Schultern) Einer muss es ja wissen.'], ['erzaehler', 'Sie sagt es wie einen Witz. Es klingt nicht wie einer.']] },
    ] },
  ],
  n1_noahZaun: [
    ['erzaehler', 'Noah lehnt am Zaun. Ein Buch in der Hand. Er liest nicht.'],
    { blick: { titel: 'Noah', blicke: 2, text: 'Er hat dich noch nicht bemerkt. Zwei Blicke. Was siehst du?',
      personen: [{ wer: 'noah', name: 'Noah', signale: [
        { wo: 'Augen', t: 'Er schaut immer wieder rüber zum Tischtennis-Tisch. Dann schnell zurück ins Buch.', key: 'noahTisch' },
        { wo: 'Füße', t: 'Ein Fuß wippt. Im Takt vom Ball.' },
        { wo: 'Hände', t: 'Das Brot liegt eingepackt auf dem Buch. Seit der Pause angefangen hat.' } ] }],
      uebersehen: [{ key: 'noahTisch', t: 'Noah schaut immer wieder zum Tischtennis-Tisch.' }] } },
    ['noah', '(ohne aufzuschauen) Die Bank ist frei. Falls du fragst.'],
    { wahl: [
      { t: '(Leise, nur für ihn) „Ayla sucht noch einen fürs Tischtennis. Zwei Runden?“', bemerkt: 'noahTisch', weil: 'Weil du gesehen hast, wohin er schaut.', staerke: 'einbeziehen', herz: { noah: 2 }, merke: ['pauseNoah', 'noahRundlauf'],
        dann: [['noah', '(schaut hoch) … Zwei Runden.'], ['noah', 'Wenn ich schlecht bin, hörst du auf zu zählen.'], ['erzaehler', 'Er packt das Brot weg. Er kommt mit.'],
          { hin: { noah: [-21.3, 30.2, 0.25] } }] },
      { t: '(Laut, damit es alle hören) „Hey, Noah spielt Tischtennis mit!“', bemerkt: 'noahTisch', weil: 'Weil du gesehen hast, wohin er schaut.', merke: 'noahVorAllen',
        dann: [['erzaehler', 'Ein paar drehen sich um. Jo grinst schon.'], ['noah', '(leise, rot) Nein. Lass.'], ['erzaehler', 'Er schaut wieder ins Buch. Fester als vorher.'],
          { pult: { g: 'Scham', w: 5 } }, ['erzaehler', 'Du wolltest helfen. Jetzt stehen alle zwei blöd da.']] },
      { t: '(Auf die Bank setzen. Nichts sagen.)', herz: { noah: 1 }, merke: 'pauseNoah', dann: [['erzaehler', 'Du sitzt. Er lehnt daneben. Zwei Minuten. Es ist nicht komisch.'], ['noah', '(leise) Danke.']] },
      { t: '„Was liest du?“', herz: { noah: 1 }, merke: 'pauseNoah', dann: [['noah', 'Nichts. Ich tu nur so.'], ['noah', 'Dann fragt keiner, warum ich allein bin.']] },
      { t: '„Kommst du mit zu den anderen?“', dann: [['noah', '(schüttelt den Kopf) Die anderen kommen schon klar.']] },
    ] },
  ],
  n1_pauseEnde: [
    ['erzaehler', 'Es klingelt. Die Pause ist vorbei.'],
    { wenn: (m) => !m.frei_pause_noah, dann: [['erzaehler', 'Noah steht als Letzter auf. Keiner hat ihn heute angesprochen.']] },
    { wenn: (m) => !m.frei_pause_rafa && !m.rafaGezeigt, dann: [['erzaehler', 'Rafa ist schon drin. Die Kapuze auf.']] },
    { wenn: (m) => !m.frei_pause_chiara, dann: [['chiara', '(im Vorbeigehen, knapp) Dein Stundenplan. Hier. Ich hab dich gesucht.'], { tu: 'n1_chiaraKurz' }] },
    { pult: null },
  ],
  n1_kantine: [
    ['erzaehler', 'Es riecht nach Suppe und nassem Boden.'],
    ['kremer', 'Suppe oder Pasta? … Hier.'],
    { tu: 'tablett' },
    // Andere Sicht (Gesamtkonzept K1, Szene 6): ein paar Sekunden durch Noahs Augen. Was er gesehen hat, hängt davon ab, wo du in der Pause warst.
    { sicht: (m) => ({ wer: 'noah', name: 'Noah', auf: 'du', gedanken: m.noahRundlauf ? NOAH_MIT : m.noahVorAllen ? NOAH_LAUT : NOAH_SIEHT[m.duPausePlatz] || NOAH_SIEHT.allein }) },
    { wenn: (m) => m.duPausePlatz === 'korb' || m.duPausePlatz === 'handy', dann: [['erzaehler', 'Am Fenster winkt Ben. Du warst heute in seiner Pause. Das zählt hier.']] },
    { wenn: (m) => m.duPausePlatz === 'noah', dann: [['erzaehler', 'Hinten links nimmt Noah seinen Rucksack vom Stuhl neben sich. Ohne aufzuschauen.']] },
    { wenn: (m) => m.duPausePlatz === 'rundlauf' && !m.noahRundlauf, dann: [['erzaehler', 'Am Fenster rückt Ben ein Stück. Ayla hat erzählt, dass du einen fiesen Aufschlag hast.']] },
    { wenn: (m) => m.noahRundlauf, dann: [['erzaehler', 'Hinten links schiebt Noah den Stuhl neben sich ein Stück raus. Mit dem Fuß. Ohne aufzuschauen.']] },
    { wenn: (m) => m.vertragEssen && !m.noahRundlauf, dann: [['erzaehler', 'Hinten links sitzt Noah allein. Seit heute Morgen hängt an der Wand: Niemand isst allein. Deine Stimme.']] },
    { wenn: (m) => !['korb', 'handy', 'noah', 'rundlauf'].includes(m.duPausePlatz) && !m.noahRundlauf, dann: [['erzaehler', 'Keiner winkt. Du stehst mit dem Tablett. Drei Sekunden. Länger nicht.']] },
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
  // Montag 13:30, Hof: Das Foto kommt (Gesamtkonzept K1, Szene 7). Wer sitzt am Steuer? Ein Werkzeug zum Senken gibt es noch nicht.
  n1_foto: [
    ['erzaehler', '13:30. Die Sonne ist rausgekommen. Der Hof ist voll.'],
    ['erzaehler', 'Dann summt es. Bei Jo. Bei Ayla. In deiner Tasche.'],
    { handy: (m) => ({ wer: '@annexe.cam', wann: 'gerade eben', fotoId: 'duPause', alt: PAUSE_BILD[m.duPausePlatz] || PAUSE_BILD.allein,
      text: 'neu hier. cool oder cringe? 👀', umfrage: { a: 'cringe', b: 'cool', pa: 57, stimmen: 9, live: true } }) },
    { pult: { g: 'Scham', w: 6 } },
    ['jo', '(laut) Hinten links! Bist du das?'],
    ['erzaehler', 'Um dich herum schauen alle aufs Handy. Dann zu dir. Dann wieder aufs Handy.'],
    { wenn: (m) => m.duPausePlatz === 'brunnen' || m.duPausePlatz === 'noah', dann: [['erzaehler', 'Von schräg oben. Von der Treppe aus.']] },
    ['erzaehler', 'Dein Hals wird heiß. Wer sitzt jetzt am Steuer?'],
    { warum: true, wahl: [
      { t: 'Selbst abstimmen: „cool“. Mitspielen, bevor es die anderen tun.', merke: 'selbstAbgestimmt', herz: { jo: 1 },
        dann: [{ pult: { plus: -1 } }, ['jo', '(nickt) Respekt. Selbst abgestimmt.'], ['erzaehler', 'Der Account hat jetzt eine Stimme mehr. Deine.']] },
      { t: 'Handy wegstecken. Weitermachen, als wär nichts.', merke: 'fotoWeg',
        dann: [{ pult: { plus: -2 } }, ['erzaehler', 'Das Handy ist in der Tasche. Es summt weiter. Du schaust nicht hin.'], ['erzaehler', 'Innen wird es ruhiger. Wer da schreibt, weißt du nicht.']] },
      { t: 'Bildschirmfoto. Genau hinschauen.', merke: 'fotoBeweis',
        dann: [{ pult: { plus: 2 } }, ['erzaehler', 'Klick. 13:31. Du zoomst rein.'], ['erzaehler', 'Von oben aufgenommen. Wer das gemacht hat, stand höher als du.'], ['erzaehler', 'Zwanzig Sekunden starrst du aufs Display. Jo lacht. Über das Foto? Über dich?']] },
      { t: 'Zu Lina gehen.', bemerkt: 'linaBlick', weil: 'Weil du gesehen hast, wohin Lina in der Pause geschaut hat.', merke: 'fotoLina', herz: { lina: 2 }, staerke: 'mut',
        dann: [['jo', '(hinter dir) Läuft weg. Okay.'], ['erzaehler', 'Lina sitzt am Brunnen. Das Heft ist zu.'], ['lina', '(leise) Die Treppe. Oder?'], ['erzaehler', 'Mehr sagt sie nicht. Aber sie rückt ein Stück, damit du dich setzen kannst.']] },
      { t: '„Kein Foto ohne Fragen. Steht seit heute Morgen an der Wand.“', wenn: (m) => m.vertragFoto, merke: 'fotoRegel', staerke: 'klar', herz: { mila: 1 },
        dann: [['jo', '(lacht) Der Account war nicht in unserer Klasse.'], ['erzaehler', 'Aber er hört auf zu lachen. Ayla steckt ihr Handy weg.'], ['ayla', 'Stimmt eigentlich.'], { pult: { plus: -2 } }] },
      { t: 'Zu Mme Tidderich gehen und ihr das Handy zeigen.', merke: 'fotoTidderich', staerke: 'hilfe',
        dann: [['hoffmann', '(schaut lange aufs Display) Danke, dass du mir das zeigst.'], ['hoffmann', 'Das ist nicht in Ordnung. Ich kümmere mich. Ohne dich vor allen zu nennen.'], ['jo', '(leise, hinter dir) Petze?'], ['erzaehler', 'Mme Tidderich schreibt sich die Uhrzeit auf. 13:32.']] },
    ] },
    { handy: null },
    { wenn: (m) => m.chiaraKurz, dann: [['chiara', '(ohne aufzuschauen) Melden geht über die drei Punkte. Steht überall.']] },
    { wenn: (m) => m.chiaraPlan && !m.fotoTidderich, dann: [['chiara', 'Ich hab es gemeldet. Nur dass du es weißt.']] },
    ['erzaehler', 'Es klingelt. Die Umfrage läuft weiter. Auch ohne dich.'],
    { pult: null },
  ],
  // Montagabend: Jetzt bist du das Foto (Live-Chat), dann Ben privat
  n1_heimweg: [
    { foto: 'duAbend', wer: 'du', von: [-2.2, 1.6, 2.6], auf: [0, 1.1, 0], fov: 46 },
    // Andere Sicht (Gesamtkonzept K1, Szene 8): Lina an der Haltestelle. Sie hat mehr gesehen als du.
    { sicht: (m) => ({ wer: 'lina', name: 'Lina', auf: 'du', gedanken: ['Die Treppe. Eine Hand. Ein Handy.', 'Ich weiß, wer da stand. Glaub ich.',
      m.fotoLina ? 'Hinten links ist zu mir gekommen. Mitten in der Umfrage.' : 'Wenn ich was sage, bin ich die Nächste.'] }) },
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
    // Neues Spielsystem (Baustein 3): Das Steuerpult. Scham auf Rot – die ruhigen Antworten sind zu, bis man runterkommt.
    { pult: { g: 'Scham', w: 8, gedanke: 'Alle haben über mich gelacht.' } },
    ['erzaehler', 'Dein Gesicht wird heiß. Das Foto ist wieder da. Im Kopf.'],
    { wahl: [
      { t: '„Und? Willst du auch noch was dazu sagen?“', merke: 'darioAngefahren', herz: { dario: -1 }, dann: [['dario', '(hebt die Hände) Okay. Okay. Sorry.']] },
      { t: '„Alle haben es gesehen.“', dann: [['dario', '(nickt) Alle. Ich auch.']] },
      { t: '„Welches Foto?“', merke: 'darioFotoGeleugnet', dann: [['dario', '(schaut dich kurz an) Okay. Dann eben nicht.']] },
      { t: '(Nichts sagen.)', dann: [['erzaehler', 'Dario wartet kurz. Dann redet er einfach weiter.']] },
    ] },
    ['dario', 'Einundsechzig Prozent ist nicht viel. Bei mir wären es mehr.'],
    ['erzaehler', 'Er lacht kurz. Dann nicht mehr.'],
    ['dario', 'Der macht das mit allen. Morgen ist wer anders dran.'],
    { wahl: [
      { t: '„Woher weißt du das?“', ruhig: true, merke: 'darioWoher', dann: [['erzaehler', 'Dario schaut auf sein Handy. Display nach unten.'], ['dario', 'Sieht man halt. Wenn man hinschaut.']] },
      { t: '„Hoffentlich.“', merke: 'darioHoffentlich', dann: [] },
      { t: '„Das macht es nicht besser.“', ruhig: true, staerke: 'klar', merke: 'darioNichtBesser', dann: [] },
      { t: '„Mir doch egal.“ (Aufstehen.)', merke: 'darioEgal', dann: [['dario', '(leise) Ist es nicht.']] },
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
    { pult: { plus: -2 } },
    { pult: null },
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
  // Dienstag 9:55, Sport. Frau Sommer teilt die Paare ein. Erst führst du Yusuf (er sagt einmal selbst Stopp), dann siehst du Jo und Noah,
  // dann führt Yusuf dich – und eine fremde Stimme ruft dazwischen. „Wer führt, trägt.“ Kommt beim Hallenturnier (Kapitel 3) zurück.
  n1_sport: [
    ['erzaehler', 'Dienstag, 9:55. Turnhalle. Es riecht nach Gummi und Bohnerwachs.'],
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
    { blick: { titel: 'Zweite Bank', blicke: 2, text: 'Noah hat das Tuch auf. Jo führt. Zwei Blicke. Was siehst du?',
      personen: [
        { wer: 'noah', name: 'Noah', signale: [
          { wo: 'Hände', t: 'Beide Hände vorgestreckt. Die Finger gespreizt. Er tastet in die Luft.' },
          { wo: 'Mund', t: 'Er sagt etwas. Ganz leise. Du verstehst: „Stopp.“', key: 'noahStopp' } ] },
        { wer: 'jo', name: 'Jo', signale: [
          { wo: 'Hand', t: 'Jo hat die Hand an Noahs Rücken. Er schiebt. Nicht fest. Aber er schiebt.', key: 'joSchiebt' },
          { wo: 'Blick', t: 'Jo grinst rüber zu Ben. Er spielt für Publikum.', key: 'joPublikum' } ] },
        { wer: 'sommer', name: 'Frau Sommer', signale: [
          { wo: 'Rücken', t: 'Sie kniet hinten an der Matte und zieht ein Hütchen gerade. Sie sieht euch nicht.', key: 'sommerWeg' } ] },
      ],
      uebersehen: [{ key: 'noahStopp', t: 'Noah hat leise „Stopp“ gesagt. Bevor er gefallen ist.' }] } },
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
      { t: '(Frau Sommer holen.)', herz: { noah: 1, jo: -1 }, merke: 'sportSommer', dann: [
        ['sommer', '(kommt, schaut sich Noahs Hände an) Alle mal herkommen.'], ['sommer', 'Was hab ich am Anfang gesagt?'],
        ['ayla', 'Stopp gilt sofort.'], ['sommer', 'Für alle. Auch wenn es von außen lustig aussieht.'],
        ['jo', '(murmelt) Petze.'], ['erzaehler', 'Er schaut dich dabei nicht an. Aber du weißt, wen er meint.']] },
      { t: '(Mitlachen. Ist ja nichts passiert.)', herz: { noah: -2, jo: 1 }, merke: 'sportGelacht', dann: [
        ['erzaehler', 'Du lachst kurz mit. Noah schaut hoch. Genau zu dir.'], ['erzaehler', 'Dann schaut er weg.']] },
      { t: '(Wegschauen. Gleich hast du selbst das Tuch auf.)', merke: 'sportWeg', dann: [
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
      { t: '„Führen. Wenn was passiert, bin ich schuld.“', merke: 'sportSchwerFuehren', dann: [['sommer', 'Genau das meine ich mit tragen. Danke.']] },
      { t: '„Geführt werden. Ich musste jemandem vertrauen, den ich kaum kenne.“', merke: 'sportSchwerGefuehrt', dann: [['yusuf', '(leise) Ging mir genauso.']] },
      { t: '„Stopp sagen. Das fühlt sich an wie aufgeben.“', staerke: 'klar', merke: 'sportSchwerStopp', dann: [['sommer', 'Ist es nicht. Stopp heißt: Ich pass auf mich auf. Das Gegenteil von aufgeben.']] },
      { t: '„Zuschauen, wie es bei anderen schiefgeht.“', merke: 'sportSchwerZuschauen', dann: [['sommer', '(nickt langsam) Das ist vielleicht das Schwerste. Merk dir das.']] },
    ] },
    { wenn: (m) => m.sportGut && !m.sportStoppIgnoriert, dann: [['yusuf', '(beim Rausgehen) Irgendwann ist Hallenturnier. Falls du wählen darfst …'], ['yusuf', 'Nur so.']] },
    { wenn: (m) => m.sportStoppIgnoriert, dann: [['erzaehler', 'Yusuf geht als Erster raus. Ohne dich anzuschauen.']] },
    { wenn: (m) => m.sportNoahHand || m.sportJoStopp, dann: [['noah', '(an der Tür, ohne dich anzusehen) … Danke. Vorhin.']] },
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
  n1_chiaraKurz: () => { c.S.merke.chiaraKurz = true; return []; },
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
  n1_tischBen: () => { c.S.merke.kantineBen = true; return []; },
});

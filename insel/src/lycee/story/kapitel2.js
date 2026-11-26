// Storyline 7e „@annexe.cam“ (nach der Storyline von Fable) – Kapitel 2 „Die Liste“, Ende November.
// Verdecktes Thema: Wer bin ich? Eine Liste sagt, wer du bist, ohne dich zu fragen. Auch eine nette.
// Noah ist im Hof „Platz 1“ und im Jugendhaus jemand, der zwölf Steine für eine Uhr braucht.
// Spuren: Darios Text hat ein Emoji und „haha“ (kein Punkt). Linas Zeichnung (Hand, Handy, Armband) steckt am Freitag in deiner Jacke.
import { S2_TANKS, S2_STAERKEN } from './skills-j1.js';

const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
// Stuhlkreis vorne in der Aula (Mitte −14.5 | −63.4), Lücke im Süden für den Spieler
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, chiara: { id: 'chiara', name: 'Chiara', farbe: '#3fa66b' }, yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' } };

export const ORTE_N2 = { jugendhaus: { x: 13, z: 115, yaw: 0 }, werkstattInnen: { x: -48.2, z: -11.2, yaw: Math.PI } };

// Gesamtkonzept K2: Haltestelle (Hinschauen) → Deutsch (Steckbrief) → Pause (fünf Inseln, Werkzeug „Sechs Tanks“) → Atelier (die Bank)
// → Liste (Hauptszene, Tank füllen) → Gegenliste → Turm → Luca → Freitag (die Bank im Hof, Darios Frage, Bens Nacht)
const BANK = [-2.0, 27.6];   // die Bank der 7P2 im Hof (spiel.js: klassenBank)
const PAUSE_HOF = { kaya: [0.7, 5.6, Math.PI], chiara: [2.6, 9.4, 0.5, 'handy'], jo: [6.0, 15.2, -2.4, 'redet'], ayla: [7.6, 16.4, -2.0, 'redet'], ben: [-14, 11.6, Math.PI, 'sitzt'],
  yusuf: [27.4, 21.0, -1.2], lina: [-10.6, 15.4, 2.59], mila: [-20, 11.6, Math.PI, 'sitzt'] };
const WERKSTATT = { becker: [-45.8, -14.4, -2.5], jo: [-47.0, -17.6, 0.1], noah: [-49.5, -17.6, -0.1], lina: [-48.3, -15.0, Math.PI],
  yusuf: [-54.6, -17.6, 0], ben: [-53.0, -15.1, Math.PI], ayla: [-42.6, -17.6, 0], chiara: [-41.2, -15.1, Math.PI], mila: [-55.6, -15.1, Math.PI] };

export const SCHRITTE_N2 = [
  { id: 'k2_morgen', kap: 2, tag: 'Montag', uhr: 7.42, titel: 'Was kannst du eigentlich?', ziel: 'Nebel an der Haltestelle. Dario sitzt schon da.', marker: 'dario',
    start: { teleport: 'busAnkunft' },
    leute: { dario: [-21.5, 41.6, -1.6, 'sitzt'], ben: [-18.2, 43.4, 2.2], lina: [-25.6, 44.4, 0.8], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n2_dario' } },
  // Deutsch (Hauptweg): Steckbrief-Reporter. Was man aufschreibt, hängt das ganze Jahr im Saal – und der Account liest mit.
  { id: 'k2_deutsch', kap: 2, tag: 'Montag', uhr: 8.08, titel: 'Steckbrief-Reporter', ziel: 'Saal 1.04. Deutsch bei Mme Nouvelle. Heute interviewt ihr euch.', marker: 'nouvelle',
    start: { teleport: 'saal104Tuer' },
    leute: { nouvelle: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'nouvelle', gespraech: 'n2_deutsch' } },
  { id: 'k2_tanks', kap: 2, tag: 'Montag', uhr: 8.9, neben: 'skills', titel: 'Skills: Das Glas der Bedürfnisse', ziel: 'Skills-Stunde in der Aula. Herr Kuedes hat sechs Tanks gemalt.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n2_tanks' } },
  // Freier Moment (Gesamtkonzept K2, Szene 3): fünf Inseln, eine Werkzeug-Karte. Man schafft nicht alles.
  { id: 'k2_pause', kap: 2, tag: 'Montag', uhr: 9.83, titel: 'Fünf Inseln', ziel: 'Große Pause. Im Hof passiert an fünf Stellen etwas. Du schaffst nicht alles.', marker: 'chiara',
    start: { teleport: 'eingangHof', gespraech: 'n2_pauseStart' },
    leute: PAUSE_HOF,
    frei: { titel: 'Große Pause', dauer: 300,
      faeden: {
        chiara: { gespraech: 'n2_pauseChiara', label: 'Chiara verteilt Wahlzettel' },
        jo: { gespraech: 'n2_pauseJo', label: 'Jo macht Witze über die Wahl' },
        ben: { gespraech: 'n2_pauseBen', label: 'Ben auf der Bank, am Handy' },
        yusuf: { gespraech: 'n2_pauseYusuf', label: 'Yusuf sucht Leute für den Korb' },
        lina: { gespraech: 'n2_pauseLina', label: 'Lina am Brunnen' },
      },
      ereignisse: [
        { t: 150, wenn: (m) => !m.frei_k2_pause_jo, toast: '<b>Jo</b><span>liest einen Wahlzettel laut vor. Mit Chiaras Stimme. Ein paar lachen.</span>' },
        { t: 255, toast: '<b>🔔 Gleich</b><span>Noch eine dreiviertel Minute.</span>' },
      ],
      ende: 'n2_pauseEnde' },
    fertig: { frei: true } },
  // Atelier (Hauptweg, Gesamtkonzept K2, Szene 4): Die Bank für den Hof. Laut entscheidet schnell. Leise hat das richtige Maß.
  { id: 'k2_atelier', kap: 2, tag: 'Montag', uhr: 10.25, titel: 'Zweimal messen', ziel: 'Atelier. Meister Becker hat Bretter und einen Plan hingelegt.', marker: 'becker',
    start: { teleport: 'werkstattInnen' },
    leute: WERKSTATT,
    fertig: { reden: 'becker', gespraech: 'n2_atelier' } },
  { id: 'k2_liste', kap: 2, tag: 'Dienstag', uhr: 10.03, titel: 'Top 5', ziel: 'Pause. Ben und Jo stehen am Hof.', marker: 'ben',
    start: { teleport: 'eingangHof' },
    leute: { ben: [4, 14, 0.6, 'redet'], jo: [5.2, 15.4, -2.4, 'redet'], ayla: [3, 17.6, -2.5, 'redet'], chiara: [2, 18.4, 0.6, 'redet'], noah: [9.6, 13.2, -1.2], yusuf: [10.6, 15.6, -2.2], mila: [-20, 11.6, Math.PI, 'sitzt'] },
    fertig: { reden: 'ben', gespraech: 'n2_liste' } },
  { id: 'k2_kantine', kap: 2, tag: 'Dienstag', uhr: 12.17, titel: 'Die Gegenliste', ziel: 'Kantine. Noahs Platz ist leer. Ben hat einen Plan.', marker: 'ben',
    start: { teleport: 'kantineTuer' },
    leute: { ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], mila: [18.15, -11.1, -Math.PI / 2, 'sitzt'], kremer: [26.8, -9, -Math.PI / 2] },
    fertig: { reden: 'ben', gespraech: 'n2_kantine' } },
  // Fachstunde nur, wenn eingeschaltet (sonst freiwillig: 🎟 → Stunden)
  { id: 'k2_mathe', kap: 2, tag: 'Mittwoch', uhr: 8.1, neben: 'fach', titel: 'Mathe', ziel: 'Saal 1.04. Mathe bei Mme Lenning – heute zu zweit.', marker: 'lenning',
    start: { teleport: 'saal104Tuer' },
    leute: { lenning: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'lenning', gespraech: 'n2_mathe' } },
  { id: 'k2_jugendhaus', kap: 2, tag: 'Mittwoch', uhr: 16.25, titel: 'Der Turm', ziel: 'Jugendhaus im Dorf. Noah baut dort an seinem Turm.', marker: 'noah',
    start: { teleport: 'jugendhaus' },
    leute: { noah: [14, 119, Math.PI] },
    fertig: { reden: 'noah', gespraech: 'n2_turm' } },
  { id: 'k2_linie', kap: 2, tag: 'Donnerstag', uhr: 8.6, neben: 'skills', titel: 'Skills: Laut und leise', ziel: 'Zurück in die Aula. Auf dem Boden kleben Linien.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], mesenberg: [-13.54, -65.16, -0.50], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n2_linie' } },
  { id: 'k2_skate', kap: 2, tag: 'Donnerstag', uhr: 10.0, titel: 'Die Skate-Ecke', ziel: 'Pause. An der Skate-Ecke winkt dich jemand Älteres heran.', marker: 'luca',
    start: { teleport: 'eingangHof' },
    leute: { luca: [-34.4, 11.4, 1.9, 'redet'], kenan: [-35, 10.4, 0.6], dario: [-32.4, 13.2, 1.2], jo: [-31.2, 11.6, -1.4], ben: [-24, 13.6, 2.2] },
    fertig: { reden: 'luca', gespraech: 'n2_luca' } },
  // Freitag (Gesamtkonzept K2, Szene 8): Wer sitzt auf der neuen Bank? Dario fragt nach der Liste. Dann Bens Nacht.
  { id: 'k2_freitag', kap: 2, tag: 'Freitag', uhr: 15.83, titel: 'Freitag', ziel: 'Wochenende. Über den Hof zum Bus.', marker: 'bus',
    start: { teleport: 'eingang', gespraech: 'n2_freitagHof' },
    leute: { noah: [BANK[0] - 0.55, BANK[1] - 0.05, Math.PI, 'sitzt'], lina: [BANK[0] + 0.6, BANK[1] - 0.05, Math.PI, 'sitzt'], jo: [BANK[0] + 2.4, BANK[1] - 1.4, -2.2, 'redet'], ayla: [BANK[0] + 3.2, BANK[1] - 0.6, -2.6],
      dario: [-21.5, 41.6, -1.6, 'sitzt'], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'n2_freitag' } },
];

// ---------- Dienstag 10:02: die Liste (Darios Account: klein geschrieben, ein Emoji, „haha“) ----------
// Das Foto ist Noahs Steckbrief-Foto aus der Deutschstunde. Was über ihn dasteht, kommt aus deinem Steckbrief – oder eben nicht.
const LISTE = (m) => ({
  titel: '@annexe.cam · Story', mitglieder: 0, dauer: 16,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Dreißig Handys summen fast gleichzeitig.' },
    { nach: 1.4, wer: '@annexe.cam', bildId: 'steckbriefNoah', bild: 'top 5 langweiligste leute annexe 😴', text: (m.steckbriefTurm ? '1 noah – baut türmchen im jugendhaus. mit 13 haha' : '1 noah – sagt nie was haha') + ' · 2 yusuf · 3 lina · 4 die taube aus der kantine · 5 alle lehrer', lacher: { start: 4, proSek: 0.5 } },
    { nach: 5.5, wer: 'Jo', text: 'die taube 😂😂' },
    { nach: 7.5, wer: 'Ben', text: 'platz 5 ist das beste' },
    { nach: 10, system: true, text: 'gesehen von 23' },
  ],
  aktionen: [{ id: 'weg', t: 'Handy weg', symbol: '📱', setzt: 'weg', sys: 'Handy in der Tasche.', ende: true }],
});
const LISTE_WAHL = [['jo', 'Jo'], ['chiara', 'Chiara'], ['ayla', 'Ayla'], ['mila', 'Mila'], ['ben', 'Ben']];

// ---------- Die Linie: Selbstbild und Fremdbild (Kurs E05) – das Fremdbild kommt aus deinen bisherigen Entscheidungen ----------
const PAARE = [['leise', 'laut'], ['allein', 'Gruppe'], ['vorsichtig', 'mutig'], ['ernst', 'witzig'], ['spontan', 'plant alles']];
const fremdbild = (S) => {
  const st = S.staerken || {}, n = (k) => st[k] || 0, klemm = (v) => Math.max(0, Math.min(4, Math.round(v)));
  const basis = [2 + (n('humor') + n('mut') + n('klar')) * 0.5 - (n('ruhig') + n('warten') + n('abstand')) * 0.6,
    2 + (n('kontakt') + n('einbeziehen')) * 0.6 - (n('abstand') + n('warten')) * 0.4,
    2 + (n('mut') + n('klar') + n('fuehren')) * 0.6 - (n('ruhig') + n('abstand')) * 0.4,
    2 + n('humor') * 0.8 - (n('lesen') + n('zuhoeren')) * 0.3,
    2 + (n('warten') + n('lesen') + n('vertrauen')) * 0.5 - n('humor') * 0.3];
  const freunde = Object.entries(S.freund || {}).filter(([id]) => F[id]).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id]) => F[id]);
  while (freunde.length < 3) freunde.push([F.ben, F.mila, F.noah].find((f) => !freunde.includes(f)));
  const schief = { ben: [1, 1, 0, 1, -1], mila: [0, -1, 0, -1, 1], noah: [-1, 0, 1, 0, 0], jo: [1, 1, 1, 1, -1], lina: [-1, -1, 0, 0, 1], ayla: [0, 0, 1, 0, -1], chiara: [0, 0, 0, -1, 1], yusuf: [-1, 0, 0, 0, 0] };
  return { paare: PAARE, fremd: freunde.map((f) => ({ wer: f, werte: basis.map((v, i) => klemm(v + (schief[f.id] || [])[i] * 0.6)) })) };
};

// ---------- Stärken verschenken (Kurs E06): die konkrete Karte kennt, was im Spiel passiert ist ----------
const staerkenDef = (m) => ({
  an: [
    { wer: F.noah, karten: [
      { t: m.noahGerettet || m.noahVerteidigt ? 'Du hast mir am ersten Tag einen Platz freigehalten. Das macht sonst keiner.' : 'Du sagst zweimal Hallo. Weil du es ernst meinst.', konkret: true, antwort: '(liest es dreimal) … Darf ich die behalten?' },
      { t: 'Du bist nett.', antwort: 'Danke. Glaub ich.' },
      { t: 'Du bist nicht langweilig.', antwort: 'Also … ein bisschen schon. Oder?' } ] },
    { wer: F.mila, karten: [
      { t: m.spurDario || m.milaAura ? 'Du merkst Sachen, die keiner merkt. Uhrzeiten. Winkel. Wer wo stand.' : 'Du sagst ehrlich, was du denkst. Auch wenn es keiner hören will.', konkret: true, antwort: '(Pause) … Danke. Das ist genau.' },
      { t: 'Du bist schlau.', antwort: 'Das sagen alle. Das ist keine Beobachtung.' },
      { t: 'Du bist voll anders.', antwort: 'Anders als wer?' } ] },
    m.blindLina ? { wer: F.lina, karten: [
      { t: 'Beim Blind-Parcours bist du einfach losgegangen. Mit mir. Das war mutig.', konkret: true, antwort: '(ganz leise) … Okay. Die kleb ich ins Heft.' },
      { t: 'Du zeichnest gut.', antwort: '(nickt) Danke.' },
      { t: 'Du bist so ruhig.', antwort: '…' } ] }
      : { wer: F.ben, karten: [
        { t: 'Du hast dich am ersten Tag bei mir entschuldigt. Ohne dass dich wer gezwungen hat.', konkret: true, antwort: '(guckt weg) … Okay. Das war nicht so schwer, wie du denkst. Doch, war es.' },
        { t: 'Du bist witzig.', antwort: 'Ich weiß. Aber danke.' },
        { t: 'Du bist immer gut drauf.', antwort: 'Nicht immer. Aber danke.' } ] },
  ],
  bekommen: [
    { wer: F.noah, t: m.noahVerteidigt ? 'Du hast im Chat was gesagt. Für mich. Hab’s gesehen.' : 'Du redest mit mir, auch wenn andere gucken.' },
    { wer: F.ben, t: m.benVerziehen ? 'Du hast gesagt „schon okay“. Obwohl es nicht okay war. Ich hab’s mir gemerkt.' : m.chatFrage ? 'Du hast am ersten Tag gefragt, wer das Foto gemacht hat. Das hat sich keiner getraut.' : 'Du lachst über meine Witze. Auch über die schlechten.' },
    { wer: F.mila, t: m.milaStill ? 'Du kannst still sitzen, ohne dass es komisch wird.' : 'Du stellst Fragen. Echte.' },
  ],
});

// ---------- Werkzeug-Karte „Sechs Tanks“ (Herr Kuedes, Pause am Montag): Theorie in 30 Sekunden ----------
const KARTE_TANKS = { von: 'Herr Kuedes · Werkzeug', titel: 'Sechs Tanks',
  text: 'Jeder Mensch hat sechs Tanks. Ist einer leer, merkt man es. Oft an kleinen Dingen.',
  zeilen: [['🍎', 'Körper', 'Schlaf, Essen, Bewegung.'], ['🛡️', 'Sicherheit', 'Wissen, was passiert. Keiner macht dich fertig.'], ['🤝', 'Dazugehören', 'Leute, bei denen du richtig bist.'],
    ['👂', 'Ernst genommen werden', 'Jemand hört dir wirklich zu.'], ['🧭', 'Selbst entscheiden', 'Über dich bestimmst du.'], ['🎉', 'Spaß und Neues', 'Lachen, ausprobieren.']],
  fuss: 'Fake-Tankstelle: füllt schnell. Ist noch schneller wieder leer.' };

// ---------- Deutsch: Steckbrief-Reporter. Offene Fragen öffnen. Wer gut fragt, erfährt auch etwas, das nicht in die Zeitung gehört. ----------
const NOAH_FRAGEN = {
  wo: 'Saal 1.04 · Deutsch', wer: F.noah, start: '(schaut auf den Tisch) … Frag halt.',
  runden: [
    { fragen: [
      { t: 'Was machst du gern, wenn keine Schule ist?', art: 'offen', offen: 1, antwort: 'Bauen. Mit kleinen Steinen. Die man steckt.' },
      { t: 'Magst du die Schule?', art: 'zu', offen: 0, antwort: 'Geht.' },
      { t: 'Bist du eher der Stille?', art: 'zu', offen: -1, antwort: '(zuckt mit den Schultern) Sieht man doch.' } ] },
    { fragen: (o) => (o >= 1 ? [
      { t: 'Was baust du gerade?', art: 'nachhaken', offen: 1, antwort: 'Was Großes. Im Jugendhaus. Da ist es ruhig.' },
      { t: 'Cool. Und sonst so?', art: 'zu', offen: 0, antwort: 'Sonst nix.' },
      { t: 'Ich bau auch manchmal was.', art: 'ueber-mich', offen: 0, antwort: '(nickt höflich) Aha.' } ] : [
      { t: 'Wo bist du am liebsten im Dorf?', art: 'offen', offen: 1, antwort: 'Im Jugendhaus. Da ist es ruhig.' },
      { t: 'Hast du Haustiere?', art: 'zu', offen: 0, antwort: 'Nein.' },
      { t: 'Warum redest du so wenig?', art: 'zu', offen: -1, antwort: '(wird rot) … Weiß nicht.' } ]) },
    { fragen: (o) => (o >= 2 ? [
      { t: 'Was genau baust du da?', art: 'nachhaken', offen: 1, antwort: '(leiser) Einen Turm. Mit einer Uhr drin. Dreitausend Steine. … Schreib das nicht, okay? Die lachen sonst.' },
      { t: 'Was ist dein Lieblingsessen?', art: 'zu', offen: 0, antwort: 'Pasta.' },
      { t: 'Darf ich das mal sehen?', art: 'zu', offen: 0, antwort: 'Vielleicht. Irgendwann.' } ] : [
      { t: 'Was kannst du richtig gut?', art: 'offen', offen: 1, antwort: '(überlegt lange) … Genau sein. Messen. Sachen, die passen müssen.' },
      { t: 'Spielst du Fußball?', art: 'zu', offen: 0, antwort: 'Nein.' },
      { t: 'Okay. Fertig, oder?', art: 'zu', offen: 0, antwort: '(sofort) Ja.' } ]) },
  ],
  stufen: ['Drei kurze Antworten. Der Steckbrief wird dünn.', 'Er hat ein bisschen erzählt.', 'Er hat richtig erzählt.', 'Er hat dir etwas anvertraut.'],
};
// Was im Steckbrief stehen kann: nur, was er gesagt hat (💬) – oder was du dir denkst (💭). Das Geheimnis ist nicht markiert.
const steckbriefFakten = (m) => {
  const o = m.noahOffen3 ? 3 : m.noahOffen2 ? 2 : m.noahOffen1 ? 1 : 0, f = [];
  f.push({ t: 'Noah ist in der 7P2.', gesagt: true });
  if (o >= 1) f.push({ t: 'Noah baut gern mit kleinen Steinen.', gesagt: true }, { t: 'Er kann sehr genau messen.', gesagt: true });
  if (o >= 2) f.push({ t: 'Sein Lieblingsort ist das Jugendhaus.', gesagt: true });
  if (o >= 3) f.push({ t: 'Im Jugendhaus baut er einen Turm mit einer Uhr.', gesagt: true, geheim: true });
  f.push({ t: 'Noah ist immer still.', gesagt: false }, { t: 'Alle finden Noah nett.', gesagt: false });
  return f;
};

// ---------- Dienstag: Noahs Sicht nach der Liste ----------
const NOAH_LISTE = (m) => {
  const vorne = m.steckbriefTurm ? ['Türmchen. Das wusste nur einer.'] : [];
  if (m.listeTankNoah) return [...vorne, 'Zweiundvierzig.', 'Alle haben es gehört.', 'Platz eins ist gerade egal.'];
  if (m.listeBeiNoah) return [...vorne, 'Platz eins.', 'Jemand kommt rüber. Zu mir.', 'Bitte jetzt nicht lachen.'];
  if (m.listeGemeldet) return [...vorne, 'Alle schauen aufs Handy. Dann zu mir.', 'Jemand geht zu Mme Tidderich.', 'Wegen mir? Jetzt suchen sie, wer es war.'];
  if (m.listeGelacht) return [...vorne, 'Alle lachen.', 'Hinten links lacht auch.', 'Ich geh rein. Keiner merkt es.'];
  return [...vorne, 'Alle schauen aufs Handy. Dann zu mir.', 'Hinten links schaut weg.', 'Wie alle.'];
};

// ---------- Freitag: 20 Sekunden durch Bens Augen. Samstag, 1:34. Eine Fake-Tankstelle. ----------
const BEN_NACHT = {
  titel: 'Bens Handy · Samstag, 1:34', mitglieder: 0, dauer: 13,
  nachrichten: [
    { nach: 0.4, system: true, text: '🔋 3 %. Im Zimmer ist es dunkel. Nur das Display.' },
    { nach: 1.8, wer: 'LEVEL 41', text: 'Noch 1 Leben! Weiter? ▶' },
    { nach: 4.2, wer: 'Yusuf', text: 'morgen 10 uhr korb? 2 gegen 2' },
    { nach: 6.4, system: true, text: 'Ben wischt die Nachricht weg. Ungelesen.' },
    { nach: 8.4, wer: 'LEVEL 41', text: 'Verloren. Noch mal? ▶' },
    { nach: 10.6, system: true, text: '1:52. Noch mal.' },
  ],
  aktionen: [{ id: 'weg', t: 'Weiter', symbol: '🌙', setzt: 'weg', sys: 'Bens Display geht aus. Irgendwann.', ende: true }],
};

export const GESPRAECHE_N2 = {
  // ---------- Montag 8:05, Deutsch: Steckbrief-Reporter für Zoés Annexe News ----------
  n2_deutsch: [
    ['nouvelle', 'Guten Morgen. Zoé macht die Annexe News. Sie braucht Steckbriefe von euch.'],
    ['nouvelle', 'Ihr fragt euch zu zweit. Offene Fragen. Nicht nur Ja oder Nein.'],
    ['nouvelle', '{name}, du fragst Noah. Danach mach ich die Fotos.'],
    { szene: 'nachhaken', id: 'steckbriefFragen', def: NOAH_FRAGEN, ausgang: (r) => 'o' + Math.max(0, Math.min(3, r.offen)),
      folgen: { o0: {}, o1: { merke: 'noahOffen1' }, o2: { merke: ['noahOffen1', 'noahOffen2'], herz: { noah: 1 } },
        o3: { merke: ['noahOffen1', 'noahOffen2', 'noahOffen3'], herz: { noah: 1 }, staerke: 'zuhoeren' } } },
    { foto: 'steckbriefNoah', wer: 'noah', von: [-1.35, 1.12, 0.12], auf: [0, 1.02, 0], fov: 34, w: 300, h: 360 },
    ['erzaehler', 'Klick. Mme Nouvelle macht das Foto. Noah lächelt nicht.'],
    { szene: 'steckbrief', id: 'steckbrief', def: (m) => ({ wo: 'Saal 1.04 · Deutsch', wer: F.noah, bildId: 'steckbriefNoah', fakten: steckbriefFakten(m) }),
      ausgang: (r) => (r.geheim ? 'geheim' : r.gedacht ? 'gedacht' : 'gut'),
      folgen: {
        geheim: { merke: 'steckbriefTurm', dann: [
          ['noah', '(liest mit. Wird blass.) … Das mit dem Turm. Das hab ich nur dir gesagt.'],
          { wahl: [
            { t: '„Sorry. Ich streich es.“', merke: 'steckbriefSorry', dann: [['nouvelle', 'Zu spät, {name}. Zoé hat die Seite schon fotografiert.'], ['noah', '(nickt. Schaut weg.) … Schon okay.'], ['erzaehler', 'Es klingt nicht okay.']] },
            { t: '„Ist doch cool. Ein Turm mit Uhr!“', herz: { noah: -2 }, dann: [['noah', 'Für dich vielleicht.']] },
            { t: '(Nichts sagen.)', herz: { noah: -1 }, dann: [['erzaehler', 'Noah dreht seinen Stift. Immer schneller.']] },
          ] }] },
        gedacht: { merke: 'steckbriefGedacht', dann: [
          ['nouvelle', 'Moment. Hat Noah das gesagt? Oder denkst du das?'],
          ['noah', '(leise) Ich bin nicht immer still.'],
          ['nouvelle', 'Reporter schreiben nur, was jemand gesagt hat. Der Rest ist Meinung.']] },
        gut: { merke: 'steckbriefGut', herz: { noah: 1 }, dann: [
          ['nouvelle', 'Nur, was er gesagt hat. So geht Reporter.'],
          ['noah', '(liest) … Stimmt alles.']] },
      } },
    ['erzaehler', 'Die Steckbriefe hängen jetzt an der Wand. Mit Fotos. Neben dem Klassenvertrag.'],
  ],

  // ---------- Montag 9:50: Herr Kuedes gibt die Karte „Sechs Tanks“ – dann fünf Inseln, fünf Minuten ----------
  n2_pauseStart: [
    ['kaya', '{name}! Kurz, bevor du rausgehst.'],
    { wenn: (m, S) => !!(S.szenen && S.szenen.s2_tanks), dann: [['kaya', 'Die sechs Tanks aus der Aula. Hier, für die Hosentasche.']], sonst: [['kaya', 'Eine Karte für die Hosentasche. Dreißig Sekunden. Versprochen.']] },
    { foto: 'auchLina2', wer: 'lina', von: [0.95, 1.45, -1.55], auf: [0, 1.0, 0], fov: 40 },
    { foto: 'auchBen2', wer: 'ben', von: [0.5, 1.25, -1.8], auf: [0, 0.85, 0], fov: 40 },
    { szene: 'werkzeug', id: 'karteTanks', def: KARTE_TANKS },
    ['kaya', 'Wenn einer komisch ist: erst hinschauen. Dann tippen, welcher Tank leer ist. Dann reden.'],
    ['kaya', 'Und pass auf die Fake-Tankstellen auf. Die füllen schnell. Und sind schnell wieder leer.'],
    { tu: 'n2_tankKarte' },
  ],
  n2_pauseChiara: [
    ['erzaehler', 'Chiara steht am Eingang. Ein Stapel Zettel im Arm.'],
    ['chiara', 'Klassensprecher-Wahl. Freitag. Bitte ausfüllen. Und bitte nicht „Jo“ draufschreiben. Als Witz.'],
    { blick: { titel: 'Chiara', blicke: 2, text: 'Sie hält dir einen Zettel hin. Zwei Blicke. Was siehst du?',
      personen: [{ wer: 'chiara', name: 'Chiara', signale: [
        { wo: 'Hände', t: 'Sie zählt den Stapel. Dann noch mal. Es sind immer noch zwanzig.', key: 'chiaraZaehlt' },
        { wo: 'Augen', t: 'Jedes Mal, wenn Jo lacht, schaut sie kurz zu ihm. Dann schnell weg.', key: 'chiaraJo' },
        { wo: 'Stimme', t: 'Sie redet schneller als heute Morgen. Fast ohne Pause.' } ] }],
      tank: { wer: 'chiara', name: 'Chiara', leer: 'sicherheit' },
      uebersehen: [{ key: 'chiaraZaehlt', t: 'Chiara zählt ihren Stapel immer wieder.' }] } },
    { wahl: [
      { t: '„Soll ich den Stapel halten? Dann kannst du abhaken, wer schon einen hat.“', bemerkt: 'tank_chiara_sicherheit', weil: 'Weil du denkst: Ihr fehlt Sicherheit.', staerke: 'lesen', herz: { chiara: 2 }, merke: 'chiaraSicher',
        dann: [['chiara', '(atmet aus) … Ja. Bitte. Dann weiß ich wenigstens, wo ich bin.'], { tankZeig: { wer: 'Chiara', tank: 'sicherheit', verlauf: [14, 62] } }, ['erzaehler', 'Sie hakt ab. Ihre Stimme wird langsamer.']] },
      { t: '„Chill mal. Ist doch nur eine Wahl.“', bemerkt: 'tank_chiara_spass', weil: 'Weil du denkst: Ihr fehlt Spaß.', herz: { chiara: -1 }, merke: 'chiaraChill',
        dann: [['chiara', 'Für dich vielleicht.'], { tankZeig: { wer: 'Chiara', tank: 'sicherheit', verlauf: [14, 6] } }, ['erzaehler', 'Sie zählt den Stapel ein drittes Mal.']] },
      { t: '„Komm mit zu uns. Vergiss die Zettel mal.“', bemerkt: 'tank_chiara_dazu', weil: 'Weil du denkst: Ihr fehlt Dazugehören.', dann: [['chiara', 'Und wer macht es dann? Jo?']] },
      { t: '„Ich find gut, was du machst. Echt.“', bemerkt: 'tank_chiara_ernst', weil: 'Weil du denkst: Sie will ernst genommen werden.', herz: { chiara: 1 }, dann: [['chiara', 'Danke. … Trotzdem lachen sie.']] },
      { t: '(Zettel nehmen. Weiter.)', dann: [['chiara', 'Danke.'], ['erzaehler', 'Sie schaut schon zum Nächsten.']] },
    ] },
  ],
  n2_pauseJo: [
    ['erzaehler', 'Jo steht mitten im Hof. Er hält einen Wahlzettel hoch.'],
    ['jo', '(mit hoher Stimme) „Bitte nicht Jo draufschreiben.“ … Leute. Wählt mich. Ich bring Pizza.'],
    { blick: { titel: 'Jo', blicke: 2, text: 'Ein paar lachen. Zwei Blicke. Was siehst du?',
      personen: [{ wer: 'jo', name: 'Jo', signale: [
        { wo: 'Augen', t: 'Nach jedem Witz schaut er sich um. Wer lacht mit? Wer nicht?', key: 'joSchaut' },
        { wo: 'Leute', t: 'Er steht in der Mitte. Aber keiner bleibt länger als einen Witz neben ihm.', key: 'joAllein' },
        { wo: 'Hände', t: 'Seinen eigenen Zettel hat er zerknüllt. Leer.' } ] }],
      tank: { wer: 'jo', name: 'Jo', leer: 'dazu' },
      uebersehen: [{ key: 'joAllein', t: 'Keiner bleibt länger bei Jo als einen Witz lang.' }] } },
    { wahl: [
      { t: '„Jo. Gleich zwei gegen zwei am Korb. Bist du dabei?“', bemerkt: 'tank_jo_dazu', weil: 'Weil du denkst: Ihm fehlt Dazugehören.', staerke: 'einbeziehen', herz: { jo: 2 }, merke: 'joDabei',
        dann: [['jo', '(kurz überrascht) … Klar. Bin dabei.'], { tankZeig: { wer: 'Jo', tank: 'dazu', verlauf: [16, 58] } }, ['erzaehler', 'Er lässt den Zettel sinken. Chiaras Stimme macht er nicht mehr nach.']] },
      { t: '„Mach noch einen! Den mit der Pizza.“', bemerkt: 'tank_jo_spass', weil: 'Weil du denkst: Ihm fehlt Spaß.', herz: { jo: 1, chiara: -1 }, merke: 'joAngefeuert',
        dann: [['jo', '(lauter) PIZZA FÜR ALLE!'], { tankZeig: { wer: 'Jo', tank: 'dazu', verlauf: [16, 55, 12], fake: true } }, ['erzaehler', 'Ein paar lachen. Dann gehen sie weiter. Jo steht wieder allein in der Mitte.']] },
      { t: '„Willst du eigentlich echt Klassensprecher werden?“', bemerkt: 'tank_jo_ernst', weil: 'Weil du denkst: Er will ernst genommen werden.', merke: 'joEchtGefragt',
        dann: [['jo', '(stutzt) … Nee. Wer wählt schon mich.'], ['erzaehler', 'Er lacht. Zu spät.']] },
      { t: '(Mitlachen.)', herz: { jo: 1 }, merke: 'joMitgelachtWahl', dann: [['jo', '(grinst) Siehste. Wählt mich.']] },
      { t: '(Weitergehen.)', dann: [] },
    ] },
  ],
  n2_pauseBen: [
    ['erzaehler', 'Ben sitzt auf der Bank. Das Handy ganz nah am Gesicht.'],
    ['ben', 'Hinten links! Eine Runde? Nur eine. Ich bin bei Level vierzig.'],
    { wenn: (m, S) => !!(S.bemerkt || {}).benMuede, dann: [['erzaehler', 'Wie heute Morgen an der Haltestelle. Nur schlimmer.']] },
    { blick: { titel: 'Ben', blicke: 2, text: 'Er schaut nicht hoch. Zwei Blicke. Was siehst du?',
      personen: [{ wer: 'ben', name: 'Ben', signale: [
        { wo: 'Augen', t: 'Rote Ränder. Er blinzelt langsam.', key: 'benAugen' },
        { wo: 'Handy', t: 'Akku 6 Prozent. Das Kabel hängt aus der Jacke.', key: 'benAkku' },
        { wo: 'Essen', t: 'Neben ihm liegt sein Pausenbrot. Noch eingepackt. Daneben eine leere Dose Energy.', key: 'benEnergy' } ] }],
      tank: { wer: 'ben', name: 'Ben', leer: 'koerper' },
      uebersehen: [{ key: 'benAugen', t: 'Ben hat rote Ränder um die Augen.' }] } },
    { wahl: [
      { t: '„Komm mit an den Korb. Zwei Minuten. Ohne Handy.“', bemerkt: 'tank_ben_koerper', weil: 'Weil du denkst: Seinem Körper fehlt etwas.', staerke: 'lesen', herz: { ben: 2 }, merke: 'benRaus',
        dann: [['ben', '(gähnt) … Zwei Minuten. Dann Level einundvierzig.'], ['erzaehler', 'Er steht auf. Die kalte Luft tut ihm gut. Er sagt es nicht. Man sieht es.'], { tankZeig: { wer: 'Ben', tank: 'koerper', verlauf: [10, 38] } }, ['erzaehler', 'Er isst das Brot. Im Gehen.']] },
      { t: '„Wann hast du eigentlich geschlafen?“', bemerkt: 'tank_ben_koerper', weil: 'Weil du denkst: Seinem Körper fehlt etwas.', herz: { ben: 1 }, merke: 'benGefragt',
        dann: [['ben', '(lacht) Schlafen ist für Leute ohne Level vierzig.'], ['ben', '(Pause) Halb zwei. Oder so.'], ['erzaehler', 'Er spielt weiter. Aber er schaut dich kurz an.']] },
      { t: '(Eine Runde mitspielen.)', herz: { ben: 1 }, merke: 'benGespielt',
        dann: [['erzaehler', 'Drei Minuten lang ist alles laut und bunt. Ihr schreit beide.'], { tankZeig: { wer: 'Ben', tank: 'spass', verlauf: [30, 96, 12], fake: true } }, ['erzaehler', 'Dann: verloren.'], ['ben', '(starrt aufs Display) Noch eine. Dann hör ich auf.']] },
      { t: '(Dich einfach dazusetzen.)', bemerkt: 'tank_ben_dazu', weil: 'Weil du denkst: Ihm fehlt Dazugehören.', dann: [['ben', 'Cool.'], ['erzaehler', 'Er spielt. Du schaust zu. Er merkt nicht, wann du gehst.']] },
      { t: '„Später vielleicht.“', dann: [['ben', 'Später ist Level fünfzig.']] },
    ] },
  ],
  n2_pauseYusuf: [
    ['erzaehler', 'Yusuf dribbelt am Korb. Allein. Er grinst, als er dich sieht.'],
    ['yusuf', 'Zwei gegen zwei? Mir fehlen noch drei Leute. Also: alle.'],
    { blick: { titel: 'Yusuf', blicke: 2, text: 'Zwei Blicke. Was siehst du?',
      personen: [{ wer: 'yusuf', name: 'Yusuf', signale: [
        { wo: 'Gesicht', t: 'Er grinst. Einfach so. Nicht für jemanden.' },
        { wo: 'Körper', t: 'Locker. Er wirft, trifft, holt den Ball. Kein Stress.' },
        { wo: 'Handy', t: 'Liegt auf der Bank. Bildschirm nach unten. Er schaut nicht einmal hin.' } ] }],
      tank: { wer: 'yusuf', name: 'Yusuf', leer: 'keiner' } } },
    { wenn: (m) => !!m.joDabei, dann: [['jo', '(kommt angelaufen) Ich bin dabei! Wer noch?'], ['yusuf', 'Jo? … Okay. Du und Jo gegen mich und den Korb.']] },
    { wahl: [
      { t: '„Dir geht’s gut, oder?“', bemerkt: 'tank_yusuf_keiner', weil: 'Weil du denkst: Bei ihm ist gerade keiner leer.', herz: { yusuf: 2 }, merke: 'yusufGut',
        dann: [['yusuf', '(lacht) Heute ja. Fragt sonst keiner.'], ['yusuf', 'Komm. Fünf Würfe.']] },
      { t: '(Ball fangen. Mitspielen.)', herz: { yusuf: 1 }, dann: [['yusuf', 'Fünf Würfe. Wer weniger trifft, holt die Bälle.']] },
      { t: '„Brauchst du Hilfe? Du bist so allein hier.“', bemerkt: 'tank_yusuf_dazu', weil: 'Weil du denkst: Ihm fehlt Dazugehören.', dann: [['yusuf', '(schaut dich komisch an) … Ich spiel Basketball. Das geht auch allein.'], ['yusuf', 'Aber komm. Fünf Würfe.']] },
    ] },
    { tu: 'freiwurf' },
    { wenn: (m) => (m.freiwurf || 0) >= 3, dann: [['yusuf', '(nickt) Du kannst das. Morgen um halb acht. Korb. Wenn du willst.'], { tu: 'n2_yusufMorgen' }], sonst: [['yusuf', 'Geht noch. Ist ja auch kalt.']] },
  ],
  n2_pauseLina: [
    ['erzaehler', 'Lina sitzt am Brunnen und zeichnet. Als du näher kommst, klappt sie das Heft zu.'],
    { blick: { titel: 'Lina', blicke: 2, text: 'Sie wartet, dass du weitergehst. Zwei Blicke. Was siehst du?',
      personen: [{ wer: 'lina', name: 'Lina', signale: [
        { wo: 'Hände', t: 'Sie hält das Heft mit beiden Händen zu. Die Finger fest auf dem Rand.', key: 'linaZu' },
        { wo: 'Augen', t: 'Sie schaut nicht dich an. Sie schaut zur Treppe.', key: 'linaTreppe2' },
        { wo: 'Heft', t: 'Unten schaut eine Ecke Papier raus. Bleistift. Ein Geländer.', key: 'linaGelaender' } ] }],
      tank: { wer: 'lina', name: 'Lina', leer: 'selbst' },
      uebersehen: [{ key: 'linaZu', t: 'Lina hält ihr Heft mit beiden Händen zu.' }] } },
    { wahl: [
      { t: '„Ich schau nicht rein. Du entscheidest, was du zeigst.“', bemerkt: 'tank_lina_selbst', weil: 'Weil du denkst: Sie will selbst entscheiden.', staerke: 'vertrauen', herz: { lina: 2 }, merke: 'linaVertraut',
        dann: [['lina', '(die Finger lockern sich) … Danke. Die meisten reißen es einem weg.'], { tankZeig: { wer: 'Lina', tank: 'selbst', verlauf: [12, 55] } },
          { wenn: (m) => !!m.fotoLina, dann: [['lina', '(öffnet es. Nur eine Seite.) Die Haltestelle. Mit der Taube von Opa Nik.'], ['erzaehler', 'Die Taube sieht aus, als würde sie gleich wegfliegen. Lina klappt das Heft wieder zu. Diesmal langsam.']],
            sonst: [['lina', 'Vielleicht zeig ich’s dir. Irgendwann.']] }] },
      { t: '„Zeig mal! Du zeichnest bestimmt mega.“', bemerkt: 'tank_lina_ernst', weil: 'Weil du denkst: Sie will ernst genommen werden.', herz: { lina: -1 }, merke: 'linaGedraengt',
        dann: [['lina', '(drückt das Heft an sich) Nein.'], { tankZeig: { wer: 'Lina', tank: 'selbst', verlauf: [12, 4] } }, ['erzaehler', 'Sie steht auf und geht. Das Heft unter dem Arm.']] },
      { t: '„Komm doch mit zu den anderen!“', bemerkt: 'tank_lina_dazu', weil: 'Weil du denkst: Ihr fehlt Dazugehören.', dann: [['lina', '(steht auf) Ich muss noch was holen.'], ['erzaehler', 'Sie holt nichts. Sie geht nur weg.']] },
      { t: '(Dich auf den Brunnenrand setzen. Ein Stück weg. Nichts sagen.)', herz: { lina: 1 }, merke: 'linaDaneben',
        dann: [['erzaehler', 'Eine Minute. Das Wasser plätschert. Sie zeichnet weiter. Mit der Hand über dem Blatt.'], ['lina', '(nach einer Weile) … Du bist komisch. Gut komisch.']] },
    ] },
  ],
  n2_pauseEnde: [
    ['erzaehler', 'Es klingelt.'],
    { wenn: (m) => !m.frei_k2_pause_chiara, dann: [['erzaehler', 'Chiara hat noch zwölf Zettel übrig. Einer liegt zerknüllt im Müll. Es ist Jos.']] },
    { wenn: (m) => !m.frei_k2_pause_ben, dann: [['erzaehler', 'Ben geht als Letzter rein. Das Handy noch in der Hand. An der Stufe stolpert er fast.']] },
    { wenn: (m) => !m.frei_k2_pause_lina, dann: [['erzaehler', 'Am Brunnen liegt ein Radiergummi. Lina ist schon weg.']] },
    { wenn: (m) => !m.frei_k2_pause_jo, dann: [['erzaehler', 'Jo hält beim Reingehen allen die Tür auf. Keiner sagt Danke.']] },
  ],

  // ---------- Montag 10:15, Atelier: die Bank für den Hof. Zweimal messen, einmal sägen. ----------
  n2_atelier: [
    ['becker', 'Moien. Hier drin gilt ein Satz: Zweimal messen, einmal sägen.'],
    ['becker', 'Ihr baut eine Bank für den Hof. Eure Ecke. Sie steht da das ganze Jahr.'],
    ['becker', '{name}, du bist mit Jo, Noah und Lina an Bank zwei.'],
    ['erzaehler', 'Auf dem Plan steht: Beine 42 cm. Jo hat den Meterstab schon in der Hand.'],
    ['jo', '(misst, schaut kaum hin) Fünfundvierzig. Passt. Ich zeichne an.'],
    ['erzaehler', 'Noah schreibt etwas auf seinen Zettel. Dann streicht er es wieder durch.'],
    { blick: { titel: 'Werkbank', blicke: 2, text: 'Jo hat den Stift schon am Holz. Zwei Blicke. Was siehst du?',
      personen: [
        { wer: 'noah', name: 'Noah', signale: [
          { wo: 'Zettel', t: 'Da stand „42“. Groß und deutlich. Jetzt ist es durchgestrichen.', key: 'noahMass' },
          { wo: 'Hände', t: 'Er hält den zweiten Meterstab noch fest. Als würde er gleich etwas sagen.' },
          { wo: 'Augen', t: 'Er schaut zu Meister Becker. Nicht zu Jo.' } ] },
        { wer: 'lina', name: 'Lina', signale: [
          { wo: 'Plan', t: 'Ihr Finger liegt auf dem Plan. Genau auf „42“.', key: 'linaPlan' },
          { wo: 'Mund', t: 'Sie macht den Mund auf. Und wieder zu.' } ] } ],
      tank: { wer: 'noah', name: 'Noah', leer: 'ernst' },
      uebersehen: [{ key: 'noahMass', t: 'Noah hatte richtig gemessen und es wieder durchgestrichen.' }] } },
    { warum: true, fest: true, wahl: [
      { t: '„Noah, was hast du gemessen? Sag du’s.“', bemerkt: 'noahMass', weil: 'Weil du seinen Zettel gesehen hast.', staerke: 'einbeziehen', herz: { noah: 2, jo: -1 }, merke: ['noahMassGefragt', 'atelierNoah'],
        dann: [['noah', '(leise) … Zweiundvierzig. Steht auf dem Plan.'], ['jo', 'Drei Zentimeter. Merkt keiner.'], ['becker', '(von hinten) Merkt jeder, der draufsitzt.'],
          { wenn: (m) => !!m.tankRichtig_noah, dann: [{ tankZeig: { wer: 'Noah', tank: 'ernst', verlauf: [10, 46] } }] },
          ['erzaehler', 'Noah zeichnet an. Seine Linie ist gerade wie gedruckt.']] },
      { t: '(Auf den Plan zeigen.) „Da steht zweiundvierzig.“', bemerkt: 'linaPlan', weil: 'Weil du gesehen hast, wo Linas Finger liegt.', herz: { lina: 1 }, merke: 'atelierPlan',
        dann: [['jo', '(schaut hin) … Okay, okay. Zweiundvierzig. Chill.'], ['erzaehler', 'Lina zieht den Finger zurück. Sie lächelt fast.']] },
      { t: '„Gib mal her. Ich mess selbst.“', merke: 'atelierSelbst', dann: [['jo', '(gibt dir den Meterstab. Genervt.) Bitte. Aber schnell.']] },
      { t: '(Jo machen lassen. Er ist schneller.)', merke: 'atelierJo', dann: [['erzaehler', 'Jo zeichnet bei 45 an. Noah schaut auf seinen Zettel. Dann aus dem Fenster.']] },
    ] },
    { szene: 'werkbank', id: 'werkbank', def: (m) => ({ wo: 'Atelier · Bank zwei', soll: 42, start: m.atelierJo ? 45 : 42,
        wer: m.atelierSelbst ? 'du' : m.atelierJo ? 'Jo' : m.atelierNoah ? 'Noah' : 'Jo', farbe: m.atelierNoah ? '#3f78b8' : '#c0392b', hetzen: { wer: 'Jo', farbe: '#c0392b', ab: 5 } }),
      ausgang: (r) => (r.gerade ? 'gerade' : 'wackelt'),
      folgen: {
        gerade: { merke: 'bankGerade', dann: [['becker', '(setzt sich drauf. Wippt.) Steht. Gut gemessen, Bank zwei.']] },
        wackelt: { merke: 'bankWackelt', dann: [['becker', '(setzt sich drauf. Die Bank kippelt.) Hm. So steht sie jetzt. Ein Jahr lang.'], ['jo', 'Merkt keiner.'], ['becker', 'Merkt jeder, der draufsitzt.']] },
      } },
    { wenn: (m, S) => !!(S.sz && S.sz.werkbank && S.sz.werkbank.korrigiert), dann: [['jo', '(murmelt) Ja, ja. Zweiundvierzig.'], ['erzaehler', 'Noah schaut dich kurz an. Er sagt nichts. Aber er nickt.']] },
    { foto: 'k2Werkbank', von: [-46.2, 1.95, -12.4], auf: [-48.3, 0.95, -16.6], fov: 50 },
    { tu: 'n2_bankGebaut' },
    ['becker', 'Morgen steht sie im Hof. Wer draufsitzt, merkt, wie ihr gemessen habt.'],
  ],

  // ---------- Freitag 15:40, Hof: Wer sitzt auf eurer Bank? ----------
  n2_freitagHof: [
    ['erzaehler', 'Freitag, 15:40. Der Hof leert sich.'],
    { tu: 'n2_bankFoto' },
    { wenn: (m) => !!m.bankWackelt, dann: [
      { hin: { noah: [BANK[0] - 1.6, BANK[1] - 1.2, Math.PI], lina: [BANK[0] - 3.4, BANK[1] - 2.2, 2.4], jo: [BANK[0] + 0.1, BANK[1] - 0.05, Math.PI, 'sitzt'] } },
      ['erzaehler', 'Jo setzt sich auf eure Bank. Sie kippelt. Er steht sofort wieder auf.'],
      ['jo', 'Wer hat die gemessen? … Ach so. Wir.'],
      ['erzaehler', 'Unter ein Bein hat jemand ein gefaltetes Stück Karton geklemmt.']] },
    { wenn: (m) => !m.bankWackelt && !(m.atelierNoah || m.listeTankNoah || m.listeBeiNoah), dann: [
      { hin: { jo: [BANK[0] - 0.55, BANK[1] - 0.05, Math.PI, 'sitzt'], ayla: [BANK[0] + 0.6, BANK[1] - 0.05, Math.PI, 'sitzt'], noah: [BANK[0] + 2.0, BANK[1] - 1.3, -2.6], lina: [BANK[0] - 3.6, BANK[1] - 2.0, 2.4] } },
      ['erzaehler', 'Auf eurer Bank sitzen Jo und Ayla. Noah steht daneben. Es ist kein Platz mehr.']] },
    { wenn: (m) => !m.bankWackelt && !!(m.atelierNoah || m.listeTankNoah || m.listeBeiNoah), dann: [
      ['erzaehler', 'Auf eurer Bank sitzen Noah und Lina. Ein Stück auseinander. Aber beide.'],
      { wenn: (m) => !!m.atelierNoah, dann: [['noah', '(klopft aufs Holz) Zweiundvierzig. Hält.']] }] },
  ],
  n2_mathe: [
    ['lenning', 'Guten Morgen. Heute zu zweit. Einer rechnet, einer erklärt. Dann tauschen.'],
    ['lenning', '{name} und Mila. Ein Blatt, zwei Köpfe.'],
    ['mila', '(zieht das Blatt schon zu sich) Ich mach das schnell. Dauert drei Minuten.'],
    { wahl: [
      { t: '„Lass mich die erste. Sag, wenn ich hänge.“', staerke: 'klar', herz: { mila: 1 }, merke: 'milaPartner', dann: [
        ['mila', '(Pause) … Okay. Aber ich sag wirklich was.'],
        ['erzaehler', 'Sie sagt nichts. Sie zeigt nur mit dem Stift auf eine Stelle. Das reicht.'] ] },
      { t: '(Mila machen lassen. Sie ist eh schneller.)', merke: 'milaAllein', dann: [
        ['erzaehler', 'Drei Minuten. Fertig. Du hast zugeschaut.'],
        ['lenning', '{name}, erklär mir Aufgabe zwei.'],
        ['erzaehler', 'Du schaust aufs Blatt. Die Zahlen sagen dir nichts.'],
        ['mila', '(leise) … Sorry. Hätte dich lassen sollen.'] ] },
      { t: '„Super. Dann schreib ich ab, okay?“', herz: { mila: -1 }, merke: 'milaAbgeschrieben', dann: [
        ['mila', 'Abschreiben ist kein Mathe. Das ist Kopieren.'],
        ['lenning', 'Mila hat recht. Und ich frage gleich {name}.'] ] },
    ] },
    { stunde: 'mathe' },
    ['erzaehler', 'Noah, am Tisch daneben, starrt auf seine letzte Aufgabe. Er radiert zum dritten Mal.'],
    ['noah', '(leise) Kannst du mir das erklären? Aber nicht so schnell.'],
    { wahl: [
      { t: '(Langsam erklären. Mit einem Beispiel.)', staerke: 'hilfe', herz: { noah: 2 }, merke: 'noahErklaert', dann: [
        ['noah', '… Ah. Und dann einfach dasselbe noch mal?'],
        ['erzaehler', 'Er rechnet. Allein. Diesmal radiert er nicht.'],
        ['lenning', 'Wer erklärt, lernt doppelt. Gut gemacht, ihr zwei.'] ] },
      { t: '(Schnell die Lösung hinschreiben. Dann hat er sie.)', herz: { noah: 1 }, merke: 'noahVorgerechnet', dann: [
        ['noah', 'Danke. … Ich versteh’s trotzdem nicht.'],
        ['erzaehler', 'Morgen kommt die nächste Aufgabe. Dann sitzt er wieder da.'] ] },
      { t: '„Frag Mme Lenning. Ich bin selbst nicht sicher.“', staerke: 'ehrlich', merke: 'noahLenning', dann: [
        ['lenning', '(kommt) Gute Idee. Fragen ist nicht peinlich. Raten schon eher.'] ] },
    ] },
  ],
  n2_tanks: [
    ['erzaehler', 'Aula. An der Wand hängen sechs gemalte Gläser.'],
    { szene: 'skillsStunde', id: 's2_tanks', def: S2_TANKS, ausgang: (r) => ({ 'Körper': 'koerper', 'Sicherheit': 'sicherheit', 'Dazugehören': 'dazu', 'Ernst genommen werden': 'ernst', 'Selbst entscheiden': 'selbst', 'Spaß und Neues': 'spass' })[(r.ich || [])[0]] || 'offen',
      folgen: { koerper: { merke: 'blinktKoerper' }, sicherheit: { merke: 'blinktSicherheit' }, dazu: { merke: 'blinktDazu' }, ernst: { merke: 'blinktErnst' }, selbst: { merke: 'blinktSelbst' }, spass: { merke: 'blinktSpass' }, offen: {} } },
    { tu: 'n2_tankMission' },
    ['mila', '(flüstert) Welcher Tank ist es, wenn man auf einer Liste steht?'],
    { wahl: [
      { t: '„Dazugehören. Und Ernst genommen werden.“', staerke: 'lesen', herz: { mila: 2 }, dann: [['mila', 'Zwei Tanks gleichzeitig. Das erklärt einiges.']] },
      { t: '„Keiner. Die Liste ist es nicht wert.“', herz: { mila: 1 }, dann: [['mila', 'Logisch richtig. Fühlt sich trotzdem falsch an.']] },
    ] },
  ],
  n2_linie: [
    ['kaya', 'Das ist Herr Mesenberg. Er ist auch vom SePAS. Heute leitet er.'],
    { szene: 'skillsStunde', id: 's2_staerken', def: S2_STAERKEN, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'lesen', merke: 's2Staerken' }, weiter: { merke: 's2Staerken' } } },
    ['mesenberg', 'Jetzt anwenden. Auf dem Boden kleben Linien. Laut – leise, vorsichtig – mutig.'],
    ['mesenberg', 'Stell dich auf jede Linie. Drei aus der Klasse schätzen dich ein.'],
    { szene: 'linie', id: 'linie', def: (m, S) => fremdbild(S),
      ausgang: (r) => (r.abweichung.length >= 3 ? 'ueberrascht' : r.abweichung.length ? 'etwas' : 'gleich'),
      folgen: {
        ueberrascht: { staerke: 'lesen', dann: [['mesenberg', 'Überrascht? Das geht fast allen so.'], ['ben', 'Ich dachte, ich bin leise. Alle sagen nein.']] },
        etwas: { dann: [['kaya', 'Ein, zwei Punkte anders. Je nach Ort ist man anders.']] },
        gleich: { dann: [['mila', 'Fast alles gleich. Das ist selten. Du kennst dich gut.']] },
      } },
    ['mesenberg', 'Zum Schluss: Stärken-Karten. Denk an die drei Teile. Gesehen, Stärke, Wirkung.'],
    { szene: 'staerken', id: 'staerken', def: (m) => staerkenDef(m),
      ausgang: (r) => (r.konkret.length >= 2 ? 'konkret' : 'allgemein'),
      folgen: {
        konkret: { staerke: 'einbeziehen', herz: { noah: 2, mila: 2, lina: 1, ben: 1 }, merke: 'staerkenKonkret', dann: [['kaya', 'Das war genau. „Gesehen“ ist mehr wert als „nett“.']] },
        allgemein: { herz: { noah: 1, mila: 1 }, dann: [['mesenberg', 'Nächstes Mal: Was hast du genau gesehen? Das wirkt doppelt.']] },
      } },
    ['kaya', 'Und jetzt der schwerste Teil. Eine Karte für dich. Von Noah.'],
    { tu: 'n2_karteFuerDich' },
    { wahl: [
      { t: '„Danke.“ (Nur das.)', herz: { noah: 1 }, merke: 'komplimentAngenommen', dann: [['noah', '(grinst) Gern. War ernst gemeint.']] },
      { t: '„Stimmt gar nicht.“', herz: { noah: 1 }, merke: 'komplimentKlein', dann: [['noah', 'Ich hab’s aber gesehen. Also stimmt es.']] },
      { t: '„Danke. Du bist auch …“ (Schnell zurückgeben.)', herz: { noah: 1 }, dann: [['noah', 'Stopp. Ich war dran. Du darfst nächste Woche.']] },
    ] },
    { szene: 'stempel', def: { modul: 'Modul 1 · Wer bin ich?', titel: 'Ich weiß mehr',
      gelernt: ['Sechs Tanks und ihre Warnlichter', 'Bedürfnis und Wunsch unterschieden', 'Selbstbild und Fremdbild verglichen', 'Stärken-Karten mit drei Teilen verschenkt'],
      mission: 'Sag jemandem eine Stärke, die du wirklich gesehen hast.' }, folgen: {} },
  ],
  n2_dario: [
    ['erzaehler', 'Ende November. Nebel. Dein Atem ist weiß.'],
    ['erzaehler', 'Ben kommt den Hang runter. Kapuze auf. Er gähnt so laut, dass die Taube wegfliegt.'],
    // Gesamtkonzept K2, Szene 1: Hinschauen. Ben hat kaum geschlafen. Dario dreht sein Handy weg, wenn man hinschaut.
    { blick: { titel: 'Haltestelle', blicke: 2, text: 'Der Bus kommt gleich. Zwei Blicke. Was siehst du?',
      personen: [
        { wer: 'ben', name: 'Ben', signale: [
          { wo: 'Augen', t: 'Rote Ränder. Er blinzelt, als wäre der Nebel zu hell.', key: 'benMuede' },
          { wo: 'Handy', t: 'Er hält es in der Jackentasche fest. Das Ladekabel hängt raus.', key: 'benKabel' },
          { wo: 'Haltung', t: 'Er lehnt am Glas. Gleich schläft er im Stehen.' } ] },
        { wer: 'dario', name: 'Dario', signale: [
          { wo: 'Handy', t: 'Er tippt etwas. Als du hinschaust, dreht er das Display weg.', key: 'darioDreht' },
          { wo: 'Hände', t: 'Am Handgelenk ein Band aus Wolle. Geflochten. Grau und orange.', key: 'darioArmband' },
          { wo: 'Füße', t: 'Das Brett unter dem Schuh. Die Rollen drehen leise hin und her.' } ] } ],
      uebersehen: [{ key: 'darioDreht', t: 'Dario dreht sein Handy weg, als du hinschaust.' }, { key: 'benMuede', t: 'Ben hat kaum geschlafen.' }] } },
    { tu: 'n2_nummer' },
    ['dario', 'Und? Angekommen?'],
    { wahl: [
      { t: '„Geht so.“', dann: [['dario', 'Geht so ist ehrlich.']] },
      { t: '„Langsam.“', herz: { dario: 1 }, dann: [['dario', 'Langsam ist gut. Schnell ist komisch.']] },
      { t: '(Schultern zucken.)', dann: [] },
    ] },
    ['dario', 'Was kannst du eigentlich?'],
    { fest: true, wahl: [
      { t: '„Zuhören.“', merke: 'selbstZuhoeren', dann: [['dario', 'Zuhören. Das kann hier keiner.']] },
      { t: '„Mir Sachen merken.“', merke: 'selbstMerken', dann: [['dario', '(grinst schief) Dann vergiss mich nicht.']] },
      { t: '„Leute zum Lachen bringen.“', merke: 'selbstLachen', dann: [['dario', 'Mach mal.'], ['erzaehler', 'Du versuchst es. Er lacht. Kurz, aber echt.']] },
      { t: '„Weiß ich noch nicht.“', merke: 'selbstOffen', dann: [['dario', 'Ehrlich. Mag ich.']] },
    ] },
    ['dario', 'Ich kenn hier jeden. Mich kennt keiner.'],
    ['erzaehler', 'Er schaut auf sein Brett. Die Rollen sind immer noch sauber.'],
  ],
  // Dienstag 10:02: Die Liste kommt. Der Witz mit der Taube ist wirklich lustig. (Entscheidung A)
  n2_liste: [
    ['ben', 'Hinten links! Guck mal aufs Handy. Jetzt.'],
    { szene: 'chat', id: 'liste', def: LISTE, ausgang: () => 'gesehen', folgen: { gesehen: { merke: 'listeGesehen' } } },
    ['erzaehler', 'Bei Platz vier lachen alle. Es ist wirklich lustig.'],
    { foto: 'k2Noah', wer: 'noah', von: [-1.4, 1.5, 0.55], auf: [0, 1.45, 0], fov: 34 },
    ['erzaehler', 'Fünf Meter weiter steht Noah. Er liest seinen Namen.'],
    ['erzaehler', 'Er lächelt. Es ist kein Lächeln.'],
    { wenn: (m) => !!m.steckbriefTurm, dann: [['erzaehler', 'Das mit dem Turm hat Noah nur dir erzählt. Es stand auf deinem Steckbrief. Mit Foto.']] },
    { warum: true, fest: true, wahl: [
      { t: '(Zu Noah gehen.) „Komm, wir gehen rein.“', staerke: 'einbeziehen', herz: { noah: 2 }, merke: 'listeBeiNoah', dann: [
        ['noah', 'Platz eins. Wenigstens gewonnen.'],
        { wenn: (m) => !!m.steckbriefTurm, dann: [['noah', '(leise) Der Turm. Das stand nur auf deinem Zettel.']] },
        ['erzaehler', 'Er kommt mit. Hinter euch lacht Jo noch.']] },
      // Gesamtkonzept K2: den leeren Tank füllen – nur, wenn man in der Werkstatt richtig getippt hat (Ernst genommen werden)
      { t: '(Laut, über den Hof) „Noah! Becker will eine zweite Bank. Was war dein Maß?“', bemerkt: 'tankRichtig_noah', weil: 'Weil du weißt, welcher Tank bei Noah leer ist.', wenn: (m) => !!m.bankGebaut,
        staerke: 'einbeziehen', herz: { noah: 3, jo: -1 }, merke: ['listeTankNoah', 'joKuehl'], dann: [
        ['noah', '(schaut hoch. Überrascht.) … Zweiundvierzig.'],
        ['erzaehler', 'Ein paar drehen sich um. Nicht wegen der Liste. Wegen der Zahl.'],
        ['jo', 'Streber.'],
        { tankZeig: { wer: 'Noah', tank: 'ernst', verlauf: [8, 60] } },
        ['erzaehler', 'Noah steckt das Handy weg. Er steht ein bisschen gerader.']] },
      { t: '(Die Liste abfotografieren. Zu Mme Tidderich gehen.)', staerke: 'mut', herz: { noah: 1, jo: -1, ben: -1 }, merke: 'listeGemeldet', dann: [
        ['erzaehler', 'Mme Tidderich schaut lange auf dein Display.'],
        ['hoffmann', 'Danke. Das war richtig. Ab morgen bleiben die Handys einen Tag im Schrank.'],
        ['jo', '(später, laut im Gang) Wer war das? Wer hat gepetzt?'],
        ['erzaehler', 'Keiner sagt etwas. Ben schaut dich an. Nur kurz.']] },
      { t: '(Bei den Lachenden stehen bleiben.)', herz: { ben: 1, jo: 1, noah: -2 }, merke: 'listeGelacht', dann: [
        ['ben', '(lacht) Die Taube. Ich kann nicht mehr.'], ['erzaehler', 'Als du hochschaust, ist Noah weg.']] },
      { t: '(So tun, als hättest du nichts gesehen.)', herz: { noah: -1 }, merke: 'listeWeggeschaut', dann: [
        ['erzaehler', 'Du schaust aufs Handy. Als du wieder hochschaust, geht Noah rein. Allein.']] },
    ] },
    // Andere Sicht (Gesamtkonzept K2, Szene 6): ein paar Sekunden durch Noahs Augen
    { sicht: (m) => ({ wer: 'noah', name: 'Noah', auf: 'du', lachen: m.listeGelacht ? ['ben', 'jo', 'ayla'] : ['jo'], gedanken: NOAH_LISTE(m) }) },
  ],
  // Dienstag 12:10 (Fable, Schlüsselszene K2): Bens Gegenliste (Entscheidung B)
  n2_kantine: [
    ['erzaehler', 'Dienstag. 12:10. Noahs Platz ist leer.'],
    { wenn: (m) => !!m.listeGemeldet, dann: [['erzaehler', 'Die Handys liegen heute im Schrank von Mme Tidderich. Ben hat trotzdem eins. Er hat zwei.']] },
    ['ben', 'Okay. Ich hab’s. Gegenliste.'],
    ['ben', 'Top 5 coolste Leute. Noah auf eins. Fertig.'],
    ['jo', 'Und wer ist auf zwei?'],
    ['ben', 'Ich natürlich. Nein. Spaß. Yusuf.'],
    ['mila', 'Und Lina?'],
    ['ben', 'Drei. Alle drei von der Liste. Problem gelöst.'],
    ['mila', 'Dann fehlen noch zwei.'],
    ['erzaehler', 'Ben schaut in die Runde. Dann schaut er dich an.'],
    ['ben', 'Du. Du bist neu. Du kannst das brauchen. Vier?'],
    ['jo', 'Und ich? Ich war noch nie auf einer Liste.'],
    ['erzaehler', 'Er sagt es wie einen Witz. Es klingt nicht so.'],
    ['mila', 'Seht ihr. Jetzt wollen schon zwei drauf.'],
    ['ben', 'Mila. Es ist NETT gemeint.'],
    ['mila', 'Die erste war auch nur Spaß.'],
    ['ben', 'Bist du dabei oder nicht?'],
    { fest: true, wahl: [
      { t: '„Bin dabei.“', herz: { ben: 1 }, merke: 'gegenlisteDabei', dann: [{ tu: 'n2_platzVier' }] },
      { t: '„Mach keine Liste.“', staerke: 'klar', herz: { mila: 1 }, merke: 'gegenlisteNein', dann: [] },
      { t: '„Frag erst Noah.“', staerke: 'lesen', herz: { mila: 1 }, merke: 'gegenlisteFragen', dann: [] },
      { t: '(Aufstehen. Noah suchen.)', staerke: 'einbeziehen', herz: { noah: 1 }, merke: 'gegenlisteNoahSuchen', dann: [] },
    ] },
    ['erzaehler', 'Ben tippt schon. Sein Daumen bleibt über „Posten“ stehen.'],
    ['ben', 'Ich will doch nur, dass er wieder kommt.'],
    { tu: 'n2_gegenlisteFolge' },
  ],
  // Mittwoch 16:15: Noah an seinem Ort. Helfen, ohne ihn auszustellen.
  n2_turm: [
    ['erzaehler', 'Mittwoch, 16:15. Im Jugendhaus riecht es nach Toast und Heizung.'],
    ['erzaehler', 'Am Fenster steht ein Turm aus Bausteinen. Ein Meter zwanzig. Das Dach fehlt.'],
    ['noah', '(ohne sich umzudrehen) Nichts anfassen. Bitte.'],
    ['erzaehler', 'Hier ist Noah schnell. Seine Hände wissen, wo jeder Stein hingehört.'],
    ['noah', 'Die Uhr sitzt eine Reihe zu tief. Seit zwei Wochen. Ich seh es jedes Mal.'],
    { wahl: [
      { t: '„Sieht man kaum.“', dann: [['noah', 'Ich seh es.']] },
      { t: '„Kann man das noch ändern?“', staerke: 'zuhoeren', herz: { noah: 1 }, dann: [['noah', 'Nur, wenn ich das halbe Dach wieder abbaue.'], ['noah', 'Vielleicht. Irgendwann.']] },
      { t: '(Zuschauen. Nichts sagen.)', staerke: 'warten', herz: { noah: 1 }, dann: [['erzaehler', 'Zehn Minuten. Er baut. Du schaust. Das Ruhigste seit Montag.']] },
    ] },
    ['ben', '(kommt rein, das Handy schon oben) Noah! Ein Foto vom Turm. Dann sehen alle, was du kannst.'],
    { wenn: (m) => !!m.steckbriefTurm, dann: [['noah', 'Seit Dienstag weiß es eh jeder. Stand ja im Steckbrief.']] },
    ['noah', 'Dann ist es deren Witz.'],
    { fest: true, wahl: [
      { t: '„Ben. Er will nicht.“', staerke: 'klar', herz: { noah: 2, ben: -1 }, merke: 'turmGeschuetzt', dann: [['ben', '(lässt das Handy sinken) … Okay. Sorry, Noah.']] },
      { t: '(Dich vor den Turm stellen.)', staerke: 'mut', herz: { noah: 2 }, merke: 'turmGeschuetzt', dann: [['ben', 'Okay, okay. Hab’s verstanden.']] },
      { t: '„Ein Foto ist doch nichts Schlimmes.“', herz: { noah: -2, ben: 1 }, merke: 'turmFoto', dann: [['erzaehler', 'Ben macht das Foto. Noah dreht sich weg. Er baut nicht weiter.']] },
    ] },
    ['noah', '(leise) Hier schaut sonst keiner. Deswegen bin ich hier.'],
  ],
  // Donnerstag: Luca zum ersten Mal. Er kennt deinen Namen. Er ist nett. Der Sog der Gruppe.
  n2_luca: [
    ['erzaehler', 'Donnerstag. An der Skate-Ecke stehen die aus der 7P1. Und einer, der älter aussieht.'],
    ['luca', 'Du bist {name}. Hinten links.'],
    ['luca', 'Lowkey lustig, die Liste. Die mit der Taube.'],
    { wahl: [
      { t: '„Für Noah nicht.“', staerke: 'klar', herz: { luca: -1 }, merke: 'lucaWiderspruch', dann: [['luca', '(lächelt) Noah. Klar. Der mit dem Turm.']] },
      { t: '„Die Taube war gut.“', herz: { luca: 1 }, merke: 'lucaMitgelacht', dann: [['luca', 'Siehst du. Du verstehst das.']] },
      { t: '(Nichts sagen.)', dann: [['luca', 'Ruhig. Mag ich.']] },
    ] },
    ['luca', 'Komm mal vorbei. Hier ist es besser als hinten links.'],
    ['erzaehler', 'Kenan schaut zu Ben rüber. Er nickt ihm nicht zu. Ben schaut weg.'],
    ['erzaehler', 'Dario steht am Rand. Er hält sein Brett fest, als würde es gleich wegfahren.'],
    ['jo', '(grinst) Na, Hinten links? Platz sechs?'],
    { wahl: [
      { t: '„Lass es, Jo.“', staerke: 'klar', dann: [['jo', 'Chill. War ein Witz.']] },
      { t: '(Kurz mitlachen. Dann ist es vorbei.)', herz: { jo: 1 }, merke: 'joMitgelacht2', dann: [['jo', 'Siehste.']] },
      { t: '(Weggehen. Nicht dein Ding.)', merke: 'lucaStehenGelassen', dann: [['luca', '(ruft hinterher) Angebot steht.']] },
    ] },
  ],
  // Freitag 15:50: ein gefaltetes Blatt in der Jackentasche (Cliffhanger)
  n2_freitag: [
    { tu: 'n2_noahFreitag' },
    ['erzaehler', 'Freitag, 15:50. Du wartest auf den Bus.'],
    ['dario', '(rutscht auf der Bank ein Stück) Hast du die Liste gesehen? Die vom Dienstag.'],
    { blick: { titel: 'Dario', blicke: 1, text: 'Er wartet auf deine Antwort. Ein Blick.',
      personen: [{ wer: 'dario', name: 'Dario', signale: [
        { wo: 'Augen', t: 'Er schaut auf deinen Mund. Als würde er mitschreiben.', key: 'darioBeobachtet' },
        { wo: 'Daumen', t: 'Sein Daumen liegt auf dem Handy. Bildschirm nach unten.', key: 'darioDaumen' },
        { wo: 'Armband', t: 'Das Wollband. Grau und orange. Er dreht es ums Handgelenk.', key: 'darioArmband' } ] }] } },
    { wahl: [
      { t: '„Ja. War nicht lustig.“', merke: 'darioListeNein', dann: [['dario', '(nickt langsam) Nicht lustig. Okay.'], ['erzaehler', 'Er tippt etwas. Dann steckt er das Handy weg.']] },
      { t: '„Die Taube war gut.“', merke: 'darioListeTaube', dann: [['dario', '(grinst) Die Taube war gut.']] },
      { t: '„Warum fragst du?“', staerke: 'lesen', merke: 'darioWarum', dann: [['dario', 'Nur so. Ich frag alle.'], ['erzaehler', 'Er fragt nicht alle. Er fragt dich.']] },
      { t: '„Du hast am Montag dein Handy weggedreht.“', bemerkt: 'darioDreht', weil: 'Weil du am Montag hingeschaut hast.', merke: 'darioErtappt',
        dann: [['dario', '(lacht kurz. Zu laut.) Du schaust genau hin, oder?'], ['dario', 'Ist nicht verboten. Hinschauen.']] },
    ] },
    { szene: 'chat', id: 'benNacht', def: BEN_NACHT, ausgang: () => 'gesehen', folgen: { gesehen: { merke: 'benNachtGesehen' } } },
    ['erzaehler', 'In deiner Jackentasche ist etwas, das vorher nicht da war. Ein gefaltetes Blatt.'],
    ['erzaehler', 'Eine Bleistiftzeichnung. Du, in der großen Pause. Erster Tag. Von oben, von der Treppe aus.'],
    ['erzaehler', 'Am Bildrand eine Hand. Ein Handy. Ein geflochtenes Armband.'],
    ['erzaehler', 'Kein Name.'],
    { wenn: (m) => !!m.linaVertraut, dann: [['erzaehler', 'Der Strich ist derselbe wie in Linas Heft. Du weißt, von wem sie ist. Sie wollte, dass du es weißt.']] },
    { tu: 'n2_zeichnung' },
    { tu: 'kapitelEnde' },
  ],
};

// Rückblick in Bildern (Gesamtkonzept K2): Steckbrief, Bank zwei, Noahs Moment, „Das war auch“, eure Bank
export const RUECKBLICK_N2 = (m) => [
  { id: 'steckbriefNoah', titel: 'Der Steckbrief', text: m.steckbriefTurm ? 'Noahs Foto. Darunter stand, was er nur dir gesagt hat.' : m.steckbriefGedacht ? 'Noahs Foto. Darunter stand auch, was du über ihn denkst.' : 'Noahs Foto. Darunter stand nur, was er gesagt hat.' },
  { id: 'k2Werkbank', titel: 'Bank zwei', text: m.atelierNoah ? 'Noah hat gemessen. Zweiundvierzig.' : m.atelierJo ? 'Jo hat gemessen. Fünfundvierzig.' : 'Zweimal messen, einmal sägen.' },
  { id: 'k2Noah', titel: 'Dienstag, 10:03', text: 'Noah liest seinen Namen. Platz eins.' + (m.listeTankNoah ? ' Dann ruft jemand: „Was war dein Maß?“' : '') },
  !m.frei_k2_pause_lina ? { id: 'auchLina2', titel: 'Das war auch', text: 'Lina am Brunnen. Sie klappt ihr Heft zu, sobald jemand kommt.', auch: true }
    : !m.frei_k2_pause_ben ? { id: 'auchBen2', titel: 'Das war auch', text: 'Ben auf der Bank. Rote Augen. Level vierzig.', auch: true } : null,
  { id: 'k2Bank', titel: 'Eure Bank', text: m.bankWackelt ? 'Sie wackelt. Unter einem Bein steckt Karton.' : 'Sie steht gerade. Das ganze Jahr.' },
].filter(Boolean);

// TUN für Kapitel 2 (in spiel.js eingehängt: tunN2)
export const tunN2 = (c) => ({
  // Werkzeug „Sechs Tanks“: ab jetzt folgt auf das Hinschauen der Tank-Blick. Die Karte steht im Skills-Heft (Journal).
  n2_tankKarte: () => {
    const S = c.S; S.merke.tankKarte = true;
    S.skillsHeft = S.skillsHeft || [];
    if (!S.skillsHeft.some((x) => x.titel === 'Sechs Tanks')) S.skillsHeft.push({ kap: 2, titel: 'Sechs Tanks', punkte: ['Körper · Sicherheit · Dazugehören · Ernst genommen werden · Selbst entscheiden · Spaß und Neues', 'Erst hinschauen. Dann tippen, welcher Tank leer ist. Dann reden.', 'Fake-Tankstelle: füllt schnell, ist noch schneller wieder leer.'] });
    c.ui.toast('<b>🃏 Sechs Tanks</b><span>Steckt jetzt in deinem Skills-Heft. Nach dem Hinschauen kannst du tippen, welcher Tank leer ist.</span>', 'ly-t-ent');
  },
  // Die Bank der 7P2 steht ab jetzt im Hof (spiel.js: klassenBank) – gerade oder wackelig, das ganze Jahr
  n2_bankGebaut: () => {
    const m = c.S.merke; m.bankGebaut = true;
    if (c.welt) c.welt();
    c.ui.toast(m.bankWackelt ? '<b>🪑 Eure Bank</b><span>Steht ab morgen im Hof. Sie wackelt.</span>' : '<b>🪑 Eure Bank</b><span>Steht ab morgen im Hof. Gerade.</span>', 'ly-t-ent');
  },
  n2_yusufMorgen: () => { c.S.merke.yusufKorb = true; },
  // Foto der Bank für den Rückblick – erst, wenn alle sitzen (nach den hin-Zeilen im Gespräch: kurz später)
  n2_bankFoto: () => { setTimeout(() => c.foto && c.foto('k2Bank', { von: [-3.4, 1.55, 23.6], auf: [-2.0, 0.6, 27.6], fov: 42 }), 900); },
  n2_nummer: () => (c.S.merke.nummerBlockiert ? [['erzaehler', 'Die Nummer von damals ist blockiert. Manchmal denkst du trotzdem an sie.']]
    : [['erzaehler', 'Die Nummer von damals hat nie geantwortet. Zwei Haken. Seit zehn Wochen.']]),
  // „Bin dabei“: du vergibst Platz 4 und 5
  n2_platzVier: () => [
    ['ben', 'Platz vier. Du entscheidest.'],
    { fest: true, wahl: [...LISTE_WAHL.map(([id, n]) => ({ t: n + '.', merke: 'liste_' + id, dann: [] })), { t: 'Mich selbst.', merke: 'liste_ich', dann: [['jo', 'Ehrlich wenigstens.']] }] },
    ['ben', 'Und fünf?'],
    { fest: true, wahl: LISTE_WAHL.map(([id, n]) => ({ t: n + '.', wenn: (m) => !m['liste_' + id], merke: 'liste_' + id, dann: [] })) },
  ],
  n2_gegenlisteFolge: () => {
    const m = c.S.merke;
    if (m.gegenlisteDabei || m.gegenlisteNoahSuchen) {
      m.gegenlistePost = true;
      if (m.gegenlisteNoahSuchen) { m.liste_jo = true; m.liste_ben = true; }   // ohne dich: Ben setzt Jo und sich selbst
      if (m.liste_jo) m.joAufListe = true;
      return [
        ['erzaehler', m.gegenlisteNoahSuchen ? 'Du findest Noah auf der Treppe hinter dem CDI. Als du zurückkommst, ist die Liste online.' : 'Ben drückt auf Posten.'],
        ['erzaehler', 'Zehn Minuten später teilt @annexe.cam die Gegenliste. Mit einem Wort: „süß.“'],
        ['chiara', '(am Nachbartisch) Warum bin ich eigentlich auf keiner Liste? Auf keiner von beiden?'],
        ['noah', '(später, im Gang) Platz eins von fünf Mitleid.'],
      ];
    }
    if (m.gegenlisteFragen) return [
      ['erzaehler', 'Ben findet Noah auf der Treppe. Du gehst mit.'],
      ['noah', 'Nein. Bitte keine Liste. Auch keine nette.'],
      ['ben', '(steckt das Handy weg) Okay. Dann eben nicht.'],
      ['erzaehler', 'Den Rest des Tages redet Ben wenig. Mit dir und mit Noah.'],
    ];
    return [
      ['ben', '(lässt das Handy sinken) … Okay. Okay.'],
      ['erzaehler', 'Er postet nichts. Er isst auch nichts mehr.'],
    ];
  },
  n2_noahFreitag: () => (c.S.merke.listeBeiNoah ? [['erzaehler', 'Mittags saß Noah wieder an seinem Platz in der Kantine. Hinten links.']]
    : [['erzaehler', 'Mittags war Noahs Platz in der Kantine wieder leer. Wie seit Dienstag.']]),
  n2_zeichnung: () => { c.S.merke.zeichnungJacke = true; c.ui.toast('<b>✏️ Die Zeichnung</b><span>Steckt jetzt in deinem Journal.</span>', 'ly-t-ent'); return []; },
  // Skills-Stunde (freiwillig): Karte von Noah – kennt, was im Spiel passiert ist
  n2_karteFuerDich: () => {
    const m = c.S.merke;
    const t = m.turmGeschuetzt ? 'Du hast dich vor meinen Turm gestellt. Ohne Foto.' : m.listeBeiNoah ? 'Du bist zu mir gekommen, als alle gelacht haben.'
      : m.gegenlisteFragen ? 'Du hast gesagt: Frag erst Noah. Das hat noch nie wer gesagt.' : m.noahTurmGefragt ? 'Du hast gefragt, was ich baue. Und zugehört.'
      : m.kantineNoah ? 'Du hast dich am ersten Tag zu mir gesetzt.' : 'Du redest mit mir. Einfach so.';
    return [['erzaehler', 'Noah gibt dir eine Karte. Darauf steht:'], ['noah', '„' + t + '“']];
  },
  n2_tankMission: () => {
    const T = { koerper: 'Körper: was essen, Basket, raus', sicherheit: 'Sicherheit: ein ruhiger Ort, eine Person, der du traust', dazu: 'Dazugehören: Pause mit jemandem, Bandprobe', ernst: 'Ernst genommen: mit Herrn Kuedes reden', selbst: 'Selbst entscheiden: Spind, Spiegel, eigene Pause', spass: 'Spaß und Neues: Skaten, Tischtennis, Bücher' };
    const b = Object.keys(T).find((k) => c.S.merke['blinkt' + k.charAt(0).toUpperCase() + k.slice(1)]);
    if (!b) { c.ui.toast('<b>Mission: Warnlichter</b><span>Achte diese Woche: Welcher Tank meldet sich bei dir?</span>', 'ly-t-ent'); return; }
    c.S.mission = { kap: 2, tank: b, mal: 0 };
    c.ui.toast('<b>Mission: Tank auffüllen</b><span>' + T[b] + ' – dreimal, je zehn Minuten.</span>', 'ly-t-ent');
  },
});

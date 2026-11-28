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

// K2 nach dem Umbau: Haltestelle (Darios Handy, Armband → 📎) → Deutsch (Steckbrief) → Pause = ein Ort (Störung: Ben schläft, Jo filmt)
// → Atelier (die Bank) → Liste (Hauptszene, danach Noahs „ist mir egal“) → Gegenliste → Turm → Luca → Freitag (Zeichnung, Verdachts-Wand)
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
  // Pause = ein Ort (Umbau): vier Live-Bilder, du gehst an EINEN. Mittendrin passiert etwas mit Ben. Danach: Währenddessen.
  { id: 'k2_pause', kap: 2, tag: 'Montag', uhr: 9.83, titel: 'Wahlzettel', ziel: 'Große Pause. Wo bist du?', marker: null,
    start: { teleport: 'eingangHof', gespraech: 'n2_pause' },
    leute: PAUSE_HOF,
    fertig: { nachStart: true } },
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
  titel: '@annexe.cam · Story', mitglieder: 0, dauer: 16, info: 'Nur lesen.',
  nachrichten: [
    { nach: 0.5, system: true, text: 'Dreißig Handys summen fast gleichzeitig.' },
    { nach: 1.4, wer: '@annexe.cam', bildId: 'steckbriefNoah', bild: 'top 5 langweiligste leute annexe 😴', text: (m.steckbriefTurm ? '1 noah – baut türmchen im jugendhaus. mit 13 haha' : m.steckbriefGenau ? '1 noah – misst sogar sein essen haha' : m.steckbriefSelbst ? '1 noah' : '1 noah – sagt nie was haha') + ' · 2 yusuf · 3 lina · 4 die taube aus der kantine · 5 alle lehrer', lacher: { start: 4, proSek: 0.5 } },
    { nach: 5.5, wer: 'Jo', text: 'die taube 😂😂' },
    { nach: 7.5, wer: 'Ben', text: 'platz 5 ist das beste' },
    { nach: 10, system: true, text: 'gesehen von 23' },
  ],
  aktionen: [{ id: 'weg', t: 'Handy weg', symbol: '📱', setzt: 'weg', sys: 'Handy in der Tasche.', ende: true, ab: 6 }],   // erst nach der Liste: man sieht sie
});

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

// ---------- Deutsch: Steckbrief-Reporter. Nachhaken öffnet. Wer gut fragt, erfährt auch etwas, das nicht in die Zeitung gehört. ----------
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
  if (m.listeGelacht) return [...vorne, 'Alle lachen.', '{Hl} lacht auch.', 'Ich geh rein. Keiner merkt es.'];
  return [...vorne, 'Alle schauen aufs Handy. Dann zu mir.', '{Hl} schaut weg.', 'Wie alle.'];
};


// „Du drückst Posten“: Bens Entwurf, 8 Sekunden. Der Daumen ist deiner.
const POSTEN = { titel: 'Entwurf · Klassenchat 7P2', mitglieder: 21, dauer: 8, klingel: 8,
  nachrichten: [{ nach: 0.3, wer: 'Ben (Entwurf)', text: 'GEGENLISTE 💯 1. Noah 📐 2. Yusuf 🏀 3. Lina ✏️ 4. Jo 5. {name}' }],
  aktionen: [
    { id: 'posten', t: 'Posten', symbol: '📤', setzt: 'gepostet', sys: 'Gepostet 12:14.', folgen: [{ nach: 2, wer: '@annexe.cam', text: 'süß. 🫶 (geteilt)' }], ende: true },
    { id: 'fragen', t: 'Noah fragen', symbol: '💬', setzt: 'gefragt', sys: 'An Noah: „Ben macht eine Gegenliste. Du auf eins. Okay?“', folgen: [{ nach: 2.4, wer: 'Noah', text: 'bitte nicht. auch keine nette.' }], ende: true },
    { id: 'loeschen', t: 'Löschen', symbol: '🗑️', setzt: 'geloescht', sys: 'Entwurf gelöscht.', ende: true },
  ] };
// ---------- Pause (Umbau): vier Orte. Kein Hinschauen, kein Tank – eine Situation, eine Wahl, eine Folge. ----------
// Störung: Lina hat ihr Heft am Brunnen liegen lassen. Jo blättert und liest laut vor. Wer bei Lina ist, bekommt die Störung bei Chiara.
const STOER_HEFT = (hier, bleib, kosten = {}, bleibHerz = {}) => [
  { hin: { jo: [-6.8, 15.6, 2.2, 'redet'] } },
  { szene: 'stoerung', id: 'stoerHeft', pruefe: false,
    def: { bild: { wer: 'jo', von: [1.6, 1.6, 2.0], auf: [0, 1.2, 0], fov: 46 }, t: 'Am Brunnen blättert Jo in Linas Heft. Laut.', hin: 'Hingehen', bleib, zeit: 8 },
    ausgang: (r) => (r.hin ? 'hin' : 'bleib'),
    folgen: {
      hin: { merke: 'heftHin', herz: { ...kosten }, dann: [...hier,
        { hin: { du: [-7.6, 14.4, 0.8] } },
        ['jo', '(liest vor) „Die Haltestelle. Mit Gerd.“ Uuuh. Kunst.'],
        { wahl: [
          { t: '„Jo. Gib her.“', staerke: 'klar', herz: { jo: -1, lina: 1 }, merke: 'heftZurueck', dann: [['jo', '(wirft es dir zu) Hab eh nix gecheckt.'], { wahl: [
            { t: '(Zu Lina bringen.)', herz: { lina: 2 }, merke: 'heftZu', dann: [['erzaehler', 'Lina steht schon hinter dir. Du gibst es ihr. Zugeklappt.'], ['lina', '(leise) Danke.']] },
            { t: '(Reinschauen.)', herz: { lina: -1 }, merke: 'heftReingeschaut', dann: [['erzaehler', 'Eine Haltestelle. Eine Hand mit Handy, sehr genau. Dann steht Lina vor dir.'], ['lina', '(nimmt es dir weg. Sagt nichts.)'], { beweis: 'k2Heft', t: 'In Linas Heft: die Haltestelle. Eine Hand mit Handy, sehr genau gezeichnet.' }, { verdacht: 'lina', spur: 'Zeichnet die Haltestelle. Mit Handy in der Hand.' }] },
          ] }] },
          { t: '(Zuklappen. Lina bringen.)', staerke: 'vertrauen', herz: { lina: 2 }, merke: ['heftZurueck', 'heftZu'], dann: [['erzaehler', 'Du klappst es zu, ohne reinzuschauen. Lina nimmt es. Ihre Finger zittern.'], ['lina', '(leise) Danke.']] },
          { t: '„Zeig mal.“', herz: { lina: -2, jo: 1 }, merke: 'heftGeschaut', dann: [['jo', 'Siehste. Will jeder sehen.'], ['erzaehler', 'Hinter dir steht Lina. Sie hat alles gehört.']] },
        ] }] },
      bleib: { merke: 'heftBlieb', herz: bleibHerz, dann: [{ szene: 'schnitt', pruefe: false, def: { ort: 'Brunnen', t: 'Lina reißt Jo das Heft weg. Diese Woche zeichnet sie nicht mehr im Hof.' } }] },
    } },
];
const STOER_CHIARA_VON = (bleibT, bleibHerz) => [
  { hin: { jo: [3.6, 10.6, -2.0, 'handy'] } },
  { szene: 'stoerung', id: 'stoerChiara', pruefe: false,
    def: { bild: { wer: 'chiara', von: [1.6, 1.6, 2.2], auf: [0, 1.2, 0], fov: 46 }, t: 'Jo liest Chiaras Zettel vor. Mit ihrer Stimme.', hin: 'Zu Chiara', bleib: bleibT, zeit: 8 },
    ausgang: (r) => (r.hin ? 'hin' : 'bleib'),
    folgen: {
      hin: { merke: 'chiaraGeholfen', herz: { chiara: 2 }, dann: [
        { hin: { du: [1.6, 10.2, 0.8] } },
        ['jo', '(mit hoher Stimme) „Bitte nicht Jo draufschreiben.“'],
        { wahl: [
          { t: '„Jo. Gib den Zettel zurück.“', staerke: 'klar', herz: { jo: -1 }, merke: 'joGestoppt', dann: [['jo', '(gibt ihn zurück) Okay, okay.'], ['chiara', '(leise) Danke.']] },
          { t: '„Soll ich dir tragen helfen?“', staerke: 'einbeziehen', merke: 'chiaraSicher', dann: [['chiara', '(atmet aus) Ja. Bitte.'], ['erzaehler', 'Jo hört auf. Ohne Publikum macht es keinen Spaß.']] },
          { t: '(Mitlachen.)', herz: { chiara: -1, jo: 1 }, merke: 'joMitgelachtWahl', dann: [['chiara', '(zählt den Stapel. Noch mal.)']] },
        ] }] },
      bleib: { merke: 'chiaraAllein', herz: bleibHerz },
    } },
];
const STOER_CHIARA = STOER_CHIARA_VON('Bei Ben bleiben', { ben: 1 });
const P2_CHIARA = [
  { hin: { du: [1.4, 11.0, 0.6] } },
  ['chiara', 'Wahlzettel. Freitag. Bitte nicht „Jo“ draufschreiben. Als Witz.'],
  ['chiara', '(zählt den Stapel) Zwanzig. … (zählt noch mal) Zwanzig.'],
  { wahl: [
    { t: '„Soll ich den Stapel halten?“', staerke: 'einbeziehen', herz: { chiara: 2 }, merke: 'chiaraSicher', dann: [['chiara', '(atmet aus) Ja. Dann kann ich abhaken.'], ['erzaehler', 'Sie hakt ab. Ihre Stimme wird langsamer.']] },
    { t: '„Ist doch nur eine Wahl.“', herz: { chiara: -1 }, merke: 'chiaraChill', dann: [['chiara', 'Für dich vielleicht.']] },
    { t: '„Willst du gewählt werden?“', staerke: 'zuhoeren', herz: { chiara: 1 }, merke: 'chiaraGefragt', dann: [['chiara', '(stutzt) … Ja. Sag’s keinem.']] },
  ] },
  ...STOER_HEFT([['chiara', '(ruft hinterher) Hey! Die Zettel!']], 'Bei Chiara bleiben', { chiara: -1 }, { chiara: 1 }),
];
const P2_JO = [
  { hin: { du: [4.6, 13.6, 0.8] } },
  ['jo', '(hält einen Wahlzettel hoch) Leute! Wählt mich. Ich bring Pizza.'],
  ['erzaehler', 'Ein paar lachen. Dann gehen sie weiter. Jo steht wieder allein in der Mitte.'],
  { wahl: [
    { t: '„Korb? Zwei gegen zwei?“', staerke: 'einbeziehen', herz: { jo: 2 }, merke: 'joDabei', dann: [['jo', '(kurz überrascht) … Klar. Bin dabei.']] },
    { t: '„Noch einen! Den mit Pizza!“', herz: { jo: 1, chiara: -1 }, merke: 'joAngefeuert', dann: [['jo', '(lauter) PIZZA FÜR ALLE!'], ['erzaehler', 'Diesmal lacht keiner mehr.']] },
    { t: '„Willst du echt gewählt werden?“', staerke: 'zuhoeren', merke: 'joEchtGefragt', dann: [['jo', '(stutzt) … Nee. Wer wählt schon mich.'], ['erzaehler', 'Er lacht. Zu spät.']] },
  ] },
  ...STOER_HEFT([['erzaehler', 'Jo ist schon weg. Er hat etwas gefunden.']], 'Stehen bleiben', {}, {}),
];
const P2_BEN = [
  { hin: { du: [-13.4, 10.6, -0.6] } },
  ['ben', '(ohne aufzuschauen) {Hl}. Eine Runde? Ich bin bei Level vierzig.'],
  ['erzaehler', 'Akku sechs Prozent. Daneben sein Pausenbrot. Noch eingepackt.'],
  { handy: { wer: 'Bens Handy · 🔋 6 %', wann: '9:52', chat: [{ wer: 'LEVEL 40', t: 'Noch 1 Leben! Weiter? ▶' }, { wer: 'Yusuf · seit gestern', t: 'samstag 10 uhr korb? 2 gegen 2' }] } },
  { wahl: [
    { t: '„Yusuf wartet. Schreib ihm.“', staerke: 'klar', herz: { ben: 1 }, merke: 'benSelbst', dann: [{ handy: null }, ['ben', '(stöhnt. Tippt.) „bin dabei. 10.“ … Zufrieden?']] },
    { t: '„Komm. Zwei Minuten an den Korb.“', staerke: 'lesen', herz: { ben: 2 }, merke: 'benRaus', dann: [['ben', '(gähnt) Zwei Minuten. Dann Level einundvierzig.'], ['erzaehler', 'Die kalte Luft tut ihm gut. Er isst sogar das Brot.']] },
    { t: '(Eine Runde mitspielen.)', herz: { ben: 1 }, merke: 'benGespielt', dann: [['erzaehler', 'Drei Minuten laut und bunt. Dann: verloren.'], ['ben', 'Noch eine. Dann hör ich auf.']] },
    { t: '„Wann hast du geschlafen?“', staerke: 'zuhoeren', herz: { ben: 1 }, merke: 'benGefragt', dann: [['ben', '(lacht) Halb zwei. Oder so.']] },
  ] },
  { handy: null },
  ...STOER_CHIARA,
];
const P2_LINA = [
  { hin: { du: [-9.2, 13.6, 2.4] } },
  ['erzaehler', 'Lina klappt das Heft zu, als du kommst. Die Hände fest auf dem Rand.'],
  { wahl: [
    { t: '„Ich schau nicht rein.“', staerke: 'vertrauen', herz: { lina: 2 }, merke: 'linaVertraut', dann: [['lina', '(die Finger lockern sich) Danke. Die meisten reißen es einem weg.'],
      { wenn: (m) => !!m.fotoLina, dann: [['lina', '(öffnet es. Nur eine Seite.) Die Haltestelle. Mit Gerd.']], sonst: [['lina', 'Vielleicht zeig ich’s dir. Irgendwann.']] }] },
    { t: '„Zeig mal. Was ist das?“', herz: { lina: -1 }, merke: 'linaGedraengt', dann: [['lina', '(drückt das Heft an sich) Nein.'], ['erzaehler', 'Sie steht auf und geht.']] },
    { t: '(Dazusetzen. Nichts sagen.)', herz: { lina: 1 }, merke: 'linaDaneben', dann: [['lina', '(nach einer Weile) Du bist komisch. Ist okay.']] },
  ] },
  { wenn: (m) => !!m.linaGedraengt, dann: [...STOER_CHIARA_VON('Sitzen bleiben', {})], sonst: [...STOER_CHIARA_VON('Bei Lina bleiben', { lina: 1 })] },
];

// Nachhaken (Heft #00, Frage-Paare): nach „Welche?“ – auch beim zweiten Versuch geht die Kette bis zum Ende
const NACHHAKEN2 = { wahl: [
  { t: '„Wie ist es da?“', staerke: 'zuhoeren', merke: 'noahOffen2', herz: { noah: 1 }, dann: [
    ['noah', 'Ruhig. Keiner schaut. Ich bau was Großes. Seit dem Sommer.'],
    { wahl: [
      { t: '„Und dann? Was Großes?“', staerke: 'zuhoeren', merke: 'noahOffen3', herz: { noah: 1 }, dann: [['noah', '(leiser) Einen Turm. Mit einer Uhr drin. Dreitausend Steine. … Schreib das nicht, okay? Die lachen sonst.']] },
      { t: '„Nächste Frage.“', dann: [['noah', '(atmet aus) Okay.']] },
    ] }] },
  { t: '„Nächste Frage.“', dann: [['noah', 'Okay.']] },
] };
export const GESPRAECHE_N2 = {
  // ---------- Montag 8:05, Deutsch: Steckbrief-Reporter für Zoés Annexe News ----------
  n2_deutsch: [
    ['nouvelle', 'Guten Morgen. Zoé macht die Annexe News. Sie braucht Steckbriefe von euch.'],
    ['nouvelle', 'Ihr fragt euch zu zweit. Offene Fragen. Nicht nur Ja oder Nein.'],
    ['nouvelle', '{name}, du fragst Noah. Danach mach ich die Fotos.'],
    // Nachhaken wie im Heft #00 (Frage-Paare): Jede Nachfrage öffnet einen Satz mehr. Wer bis zum Ende fragt, trägt danach etwas.
    ['du', 'Was machst du gern?'],
    ['noah', '(schaut auf den Tisch) … Bauen. Mit Steinen.'],
    { wahl: [
      { t: '„Welche?“', staerke: 'zuhoeren', merke: 'noahOffen1', dann: [{ tu: 'n2_nachhakTipp' },
        ['noah', 'Die kleinen. Die man steckt. Ich mess alles genau. Im Jugendhaus.'],
        NACHHAKEN2] },
      { t: '„Nächste Frage.“', dann: [['noah', '(nickt) Hm.'], ['nouvelle', '(im Vorbeigehen) Frag nach. Zum Beispiel: „Welche?“'], { wahl: [
        { t: '„Welche?“', staerke: 'zuhoeren', merke: ['noahOffen1', 'k2ZweiterVersuch'], dann: [['nouvelle', '(nickt) So geht Nachfragen.'], { tu: 'n2_nachhakTipp' }, ['noah', '(schaut kurz hoch) Die kleinen. Die man steckt. Ich mess alles genau. Im Jugendhaus.'], NACHHAKEN2] },
        { t: '„Nächste Frage.“', dann: [['noah', 'Hm.']] },
      ] }] },
      { t: '„Bist du eher der Stille?“', merke: 'k2JaNeinFrage', dann: [['noah', '(zuckt mit den Schultern) Sieht man doch.'], ['nouvelle', '(im Vorbeigehen) Das war Ja oder Nein. Noch eine?'], { wahl: [
        { t: '„Welche?“', staerke: 'zuhoeren', merke: ['noahOffen1', 'k2ZweiterVersuch'], dann: [['nouvelle', '(nickt) So geht Nachfragen.'], { tu: 'n2_nachhakTipp' }, ['noah', '(schaut kurz hoch) Die kleinen. Die man steckt. Ich mess alles genau. Im Jugendhaus.'], NACHHAKEN2] },
        { t: '„Nächste Frage.“', dann: [['noah', 'Hm.']] },
      ] }] },
    ] },
    { foto: 'steckbriefNoah', wer: 'noah', von: [-1.35, 1.12, 0.12], auf: [0, 1.02, 0], fov: 34, w: 300, h: 360 },
    ['erzaehler', 'Klick. Mme Nouvelle macht das Foto. Noah lächelt nicht.'],
    ['nouvelle', 'Ein Satz für die Annexe News. Einer. Du wählst.'],
    { wahl: [
      { t: '„Noah: still.“', merke: 'steckbriefStill', dann: [['noah', '(leise) Ich bin nicht immer still.']] },
      { t: '„Noah misst alles genau.“', wenn: (m) => !!m.noahOffen1, merke: 'steckbriefGenau', herz: { noah: 1 }, dann: [['noah', '(nickt kurz) … Stimmt.']] },
      { t: '„Noah baut einen Turm.“', wenn: (m) => !!m.noahOffen3, merke: 'steckbriefTurm', herz: { noah: -2 }, dann: [['noah', '(wird blass) Das hab ich nur dir gesagt.'], ['nouvelle', '(liest) Darf das so rein, Noah?'], ['noah', '(schaut weg) … Egal.'], ['nouvelle', '(streicht den Satz) Egal ist kein Ja. Ich lass es weg.'], ['ben', '(hinter dir, hat mitgelesen) Ein Turm? Echt jetzt?']] },
      { t: '„Schreib du, Noah.“', merke: 'steckbriefSelbst', herz: { noah: 2 }, dann: [['noah', '(schreibt. Langsam.) „Ich bau Sachen. Genau.“']] },
    ] },
    ['erzaehler', 'Die Steckbriefe hängen jetzt an der Wand. Mit Fotos. Neben dem Klassenvertrag.'],
    { wenn: (m) => !!(m.noahOffen2 || m.noahOffen3) && !m.steckbriefTurm, dann: [['noah', '(beim Rausgehen, leise) Mittwoch. Jugendhaus. Wenn du willst.']],
      sonst: [['ben', '(beim Rausgehen) Mittwoch Jugendhaus? Noah baut da so einen Turm. Komm, Turm-Foto.']] },
  ],

  // ---------- Montag 9:50: Herr Kuedes gibt die Karte „Sechs Tanks“ – dann fünf Inseln, fünf Minuten ----------
  n2_pause: [
    { foto: 'auchLina2', wer: 'lina', von: [0.95, 1.45, -1.55], auf: [0, 1.0, 0], fov: 40 },
    { foto: 'auchBen2', wer: 'ben', von: [0.5, 1.25, -1.8], auf: [0, 0.85, 0], fov: 40 },
    { foto: 'auchChiara2', wer: 'chiara', von: [1.3, 1.5, 1.3], auf: [0, 1.0, 0], fov: 42 },
    { foto: 'auchJo2', wer: 'jo', von: [-1.4, 1.5, 1.2], auf: [0, 1.1, 0], fov: 42 },
    { szene: 'orte', id: 'pauseOrt2', pruefe: false,
      def: { titel: 'Große Pause · 9:50', info: 'Freitag ist Klassensprecher-Wahl. Überall wird geredet. Du kannst nur an einem Ort sein.',
        orte: [
          { id: 'chiara', sy: '📋', name: 'Chiara', wer: 'Verteilt Wahlzettel. Allein.', bild: { wer: 'chiara', von: [1.6, 1.6, 2.2], auf: [0, 1.2, 0], fov: 46 } },
          { id: 'jo', sy: '🎤', name: 'Jo', wer: 'Macht Show. Ein paar lachen.', bild: { wer: 'jo', von: [-2.2, 1.7, 1.8], auf: [0.4, 1.3, 0.3], fov: 46 } },
          { id: 'ben', sy: '🎮', name: 'Ben', wer: 'Auf der Bank. Level vierzig.', bild: { wer: 'ben', von: [0.5, 1.4, -2.0], auf: [0, 0.9, 0], fov: 44 } },
          { id: 'lina', sy: '⛲', name: 'Brunnen', wer: 'Lina zeichnet.', bild: { wer: 'lina', von: [-2.2, 2.0, -2.8], auf: [2.6, 1.0, 2.6], fov: 52 } },
        ] },
      ausgang: (r) => r.ort,
      folgen: { chiara: { merke: 'pause2Chiara', dann: P2_CHIARA }, jo: { merke: 'pause2Jo', dann: P2_JO }, ben: { merke: 'pause2Ben', dann: P2_BEN }, lina: { merke: 'pause2Lina', dann: P2_LINA } } },
    { tu: 'n2_waehrenddessen' },
    ['erzaehler', 'Es klingelt.'],
  ],

  // ---------- Montag 10:15, Atelier: die Bank für den Hof. Zweimal messen, einmal sägen. ----------
  n2_atelier: [
    ['becker', 'Moien. Hier drin gilt ein Satz: Zweimal messen, einmal sägen.'],
    ['becker', 'Ihr baut eine Bank für den Hof. Eure Ecke. Sie steht da das ganze Jahr.'],
    ['becker', '{name}, du bist mit Jo, Noah und Lina an Bank zwei.'],
    ['erzaehler', 'Auf dem Plan steht: Beine 42 cm. Jo hat den Meterstab schon in der Hand.'],
    ['jo', '(misst, schaut kaum hin) Fünfundvierzig. Passt. Ich zeichne an.'],
    ['erzaehler', 'Noah hat „42“ notiert. Er streicht es durch. Lina zeigt auf „42“.'],
    { fest: true, wahl: [
      { t: '„Noah, was hast du gemessen?“', staerke: 'einbeziehen', herz: { noah: 2, jo: -1 }, merke: ['noahMassGefragt', 'atelierNoah'],
        dann: [['noah', '(leise) … Zweiundvierzig. Steht auf dem Plan.'], ['jo', 'Drei Zentimeter. Merkt keiner.'],
          ['erzaehler', 'Noah zeichnet an. Seine Linie ist gerade wie gedruckt.']] },
      { t: '(Auf den Plan zeigen.) „Zweiundvierzig.“', herz: { lina: 1 }, merke: 'atelierPlan',
        dann: [['jo', '(schaut hin) … Okay, okay. Zweiundvierzig.'], ['erzaehler', 'Lina zieht den Finger zurück. Sie lächelt fast.']] },
      { t: '„Gib her. Ich mess selbst.“', merke: 'atelierSelbst', dann: [['jo', '(gibt dir den Meterstab. Genervt.) Bitte. Aber schnell.']] },
      { t: '(Jo machen lassen.)', merke: 'atelierJo', dann: [['erzaehler', 'Jo zeichnet bei 45 an. Noah schaut auf seinen Zettel. Dann aus dem Fenster.']] },
    ] },
    { szene: 'werkbank', id: 'werkbank', def: (m) => ({ wo: 'Atelier · Bank zwei', soll: 42, start: m.atelierJo ? 45 : 42,
        wer: m.atelierSelbst ? 'du' : m.atelierJo ? 'Jo' : m.atelierNoah ? 'Noah' : 'Jo', farbe: m.atelierNoah ? '#3f78b8' : '#c0392b', hetzen: { wer: 'Jo', farbe: '#c0392b', ab: 5 } }),
      ausgang: (r) => (r.gerade ? 'gerade' : 'wackelt'),
      folgen: {
        gerade: { merke: 'bankGerade', dann: [['becker', '(setzt sich drauf. Wippt.) Steht. Gut gemessen, Bank zwei.']] },
        wackelt: { merke: 'bankWackelt', dann: [['becker', '(setzt sich drauf. Die Bank kippelt.) … Hm.'], ['jo', 'Merkt keiner.']] },
      } },
    { wenn: (m, S) => !!(S.sz && S.sz.werkbank && S.sz.werkbank.korrigiert), dann: [['jo', '(murmelt) Ja, ja. Zweiundvierzig.'], ['erzaehler', 'Noah schaut dich kurz an. Er sagt nichts. Aber er nickt.']] },
    { foto: 'k2Werkbank', von: [-46.2, 1.95, -12.4], auf: [-48.3, 0.95, -16.6], fov: 50 },
    { tu: 'n2_bankGebaut' },
  ],

  // ---------- Freitag 15:40, Hof: Wer sitzt auf eurer Bank? ----------
  n2_freitagHof: [
    // Die Klassensprecher-Wahl vom Montag: Wer Chiara Mut gemacht hat, sieht, was daraus wird
    { wenn: (m) => !!(m.chiaraSicher || m.chiaraGefragt || m.chiaraGeholfen), dann: [['chiara', '(im Vorbeigehen, strahlend) Klassensprecherin. Ich. Vierzehn Stimmen!']],
      sonst: [['jo', '(ruft über den Hof) Klassensprecher Jo! Pizza gibt’s trotzdem nicht.']] },
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
      { t: '„Ich zuerst. Sag, wenn ich hänge.“', staerke: 'klar', herz: { mila: 1 }, merke: 'milaPartner', dann: [
        ['mila', '(Pause) … Okay. Aber ich sag wirklich was.'],
        ['erzaehler', 'Sie sagt nichts. Sie zeigt nur mit dem Stift auf eine Stelle. Das reicht.'] ] },
      { t: '(Mila machen lassen.)', merke: 'milaAllein', dann: [
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
      { t: '(Ihm schnell die Lösung geben.)', herz: { noah: 1 }, merke: 'noahVorgerechnet', dann: [
        ['noah', 'Danke. … Ich versteh’s trotzdem nicht.'],
        ['erzaehler', 'Morgen kommt die nächste Aufgabe. Dann sitzt er wieder da.'] ] },
      { t: '„Frag lieber Mme Lenning.“', staerke: 'ehrlich', merke: 'noahLenning', dann: [
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
      { t: '„Keiner. Die Liste ist nichts wert.“', herz: { mila: 1 }, dann: [['mila', 'Logisch richtig. Fühlt sich trotzdem falsch an.']] },
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
    // Was letzten Montag um 23:12 passiert ist, hat Folgen (Kapitel 1: „Morgen zeigst du es jemandem“)
    { wenn: (m) => !!m.erzaehltTidderich, dann: [['jo', '(hält sein Handy hoch) Ab heute Handy-Kiste. Bei Tidderich. Wegen wem eigentlich?']] },
    { wenn: (m) => !!m.erzaehltKuedes, dann: [['du', '(denkt) Herr Kuedes fragt jetzt manchmal: Und nachts?']] },
    { wenn: (m) => !!m.erzaehltDario, dann: [['dario', '(stellt seine Tasche auf den freien Platz neben sich) Besetzt.']] },
    ['ben', '(kommt den Hang runter, gähnt so laut, dass Gerd wegfliegt) Moien.'],
    { szene: 'stoerung', id: 'k2DarioTippt', pruefe: false,
      def: { bild: { wer: 'dario', von: [0.9, 1.45, 1.1], auf: [0, 1.05, 0], fov: 38 }, t: 'Dario tippt. Schnell. Den Kopf tief.', hin: 'Rüberschauen', bleib: 'Gerd zuschauen', zeit: 4 },
      ausgang: (r) => (r.hin ? 'hin' : 'weg'),
      folgen: {
        hin: { merke: 'k2DarioGesehen', dann: [['erzaehler', 'Er dreht das Handy weg. Am Handgelenk: ein Wollband, grau und orange.'],
          { beweis: 'k2DarioDreht', t: 'Dario dreht sein Handy weg, als du hinschaust.' }, { verdacht: 'dario', spur: 'Dreht sein Handy weg, wenn man hinschaut.' },
          { beweis: 'k2Armband', t: 'Darios Armband: grau und orange.' }] },
        weg: { dann: [['erzaehler', 'Gerd pickt an einem Kaugummi. Neben dir tippt Dario. Dann nicht mehr.']] },
      } },
    { tu: 'n2_nummer' },
    ['dario', 'Was kannst du eigentlich?'],
    { fest: true, wahl: [
      { t: '„Zuhören.“', merke: 'selbstZuhoeren', dann: [['dario', 'Zuhören. Das kann hier keiner.']] },
      { t: '„Mir Sachen merken.“', merke: 'selbstMerken', dann: [['dario', '(grinst schief) Dann vergiss mich nicht.']] },
      { t: '„Leute zum Lachen bringen.“', merke: 'selbstLachen', dann: [['dario', 'Mach mal.'], ['erzaehler', 'Du versuchst es. Er lacht. Kurz, aber echt.']] },
      { t: '„Weiß ich noch nicht.“', merke: 'selbstOffen', dann: [['dario', 'Ehrlich. Selten.']] },
    ] },
    { wenn: (m) => m.verdacht1 === 'dario', dann: [['dario', '(grinst schief) Du guckst wie ein Detektiv. Hat dir das schon wer gesagt?']] },
    ['dario', 'Ich kenn hier jeden. Mich kennt keiner.'],
  ],
  // Dienstag 10:02: Die Liste kommt. Der Witz mit der Taube ist wirklich lustig. (Entscheidung A)
  n2_liste: [
    ['ben', '{Hl}! Guck mal aufs Handy. Jetzt.'],
    { szene: 'chat', id: 'liste', def: LISTE, ausgang: () => 'gesehen', folgen: { gesehen: { merke: 'listeGesehen' } } },
    ['ben', '(lacht) Platz vier! Die Taube!'],
    { foto: 'k2Noah', wer: 'noah', von: [-1.4, 1.5, 0.55], auf: [0, 1.45, 0], fov: 34 },
    ['erzaehler', 'Noah liest seinen Namen. Er lacht kurz. Dann nicht.'],
    { wenn: (m) => !!m.steckbriefTurm, dann: [['erzaehler', 'Das mit dem Turm hat Noah nur dir erzählt. Es stand auf deinem Zettel. Ben hat mitgelesen.']], sonst: [{ wenn: (m) => !!m.steckbriefSelbst, dann: [['noah', '(leise, zu dir) Meinen Satz haben sie nicht.']] }] },
    { wenn: (m) => !!m.nurSpass, dann: [['jo', '(grinst zu dir) Nur Spaß, oder? Hast du gesagt.']] },
    { fest: true, wahl: [
      { t: '„Komm, wir gehen rein.“', staerke: 'einbeziehen', herz: { noah: 2 }, merke: 'listeBeiNoah', dann: [
        ['noah', 'Platz eins. Wenigstens gewonnen.'],
        { wenn: (m) => !!m.steckbriefTurm, dann: [['noah', '(leise) Der Turm. Das stand nur auf deinem Zettel.']] },
        ['erzaehler', 'Er kommt mit. Hinter euch lacht Jo noch.']] },
      // Noah ernst nehmen – vor allen: nur, wenn man im Atelier sein Maß gehört hat
      { t: '„Ohne Noah würde die Bank wackeln.“', wenn: (m) => !!m.bankGebaut && !!(m.atelierNoah || m.noahMassGefragt), weil: 'Weil du im Atelier sein Maß gehört hast.',
        staerke: 'einbeziehen', herz: { noah: 3, jo: -1 }, merke: ['listeTankNoah', 'joKuehl'], dann: [
        ['noah', '(schaut hoch. Überrascht.) … Zweiundvierzig. Das war mein Maß.'],
        ['erzaehler', 'Ein paar drehen sich um. Nicht wegen der Liste. Wegen der Bank.'],
        ['jo', 'Streber.'],
        ['erzaehler', 'Noah steckt das Handy weg. Er steht ein bisschen gerader.']] },
      { t: '(Screenshot. Zu Mme Tidderich.)', staerke: 'mut', herz: { noah: 1, jo: -1, ben: -1 }, merke: 'listeGemeldet', dann: [
        ['erzaehler', 'Mme Tidderich schaut lange auf dein Display.'],
        ['hoffmann', 'Danke. Das war richtig. Bis morgen bleiben alle Handys im Schrank.'], ['hoffmann', '(laut, für alle) Wer auf so einer Liste steht, hat nichts falsch gemacht.'],
        ['jo', '(später, laut im Gang) Wer war das? Wer hat gepetzt?'],
        ['mila', '(ohne aufzuschauen) Hilfe holen ist kein Petzen.'], ['erzaehler', 'Ben schaut dich an. Nur kurz.']] },
      { t: '(Bei den Lachenden bleiben.)', herz: { ben: 1, jo: 1, noah: -2 }, merke: 'listeGelacht',
        dann: [['jo', '(hält dir die Faust hin) Du bist okay, hinten links.'], ['ben', '(lacht) Die Taube. Ich kann nicht mehr.'], ['erzaehler', 'Als du hochschaust, ist Noah weg. Mila steht auf. Das Handy in der Hand.'], { tu: 'n2_milaAllein' }] },
    ] },
    // Andere Sicht (Gesamtkonzept K2, Szene 6): ein paar Sekunden durch Noahs Augen
    { sicht: (m) => ({ wer: 'noah', name: 'Noah', auf: 'du', lachen: m.listeGelacht ? ['ben', 'jo', 'ayla'] : ['jo'], gedanken: NOAH_LISTE(m) }) },
    ['erzaehler', 'Später im Gang. Noahs Handy leuchtet. Wieder die Liste.'],
    ['noah', '(schaut nicht hoch) Ist mir egal. Echt.'],
    { wahl: [
      { t: '„Willst du kurz raus?“', staerke: 'zuhoeren', herz: { noah: 2 }, merke: 'noahRausGefragt', dann: [{ wenn: (m) => !!m.listeGelacht, dann: [['noah', '(schaut dich an) Du hast gelacht. … Nein.']], sonst: [['noah', '(leise) … Ja. Treppe hinterm CDI.'], ['erzaehler', 'Ihr sitzt da. Bis es klingelt.']] }] },
      { t: '„Mir ist es nicht egal.“', herz: { noah: 1 }, merke: 'noahNichtEgal', dann: [['noah', '(schaut kurz hoch) … Okay.']] },
      { t: '„Dann ist ja gut.“', merke: 'noahEgalGeglaubt', dann: [['erzaehler', 'Er nickt. Dann geht er. Schneller als nötig.']] },
      // Fehler → zweite Chance: wer mitgelacht hat, kann es sagen (kein Zwang, keine Belohnung – nur ein anderer Satz von Noah)
      { t: '„Sorry. Ich hab mitgelacht.“', wenn: (m) => !!m.listeGelacht, merke: 'k2Entschuldigt', herz: { noah: 1 }, dann: [['noah', '(bleibt stehen) … Hab ich gesehen.'], ['noah', '(leiser) Gut, dass du’s sagst.']] },
    ] },
  ],
  // Dienstag 12:10 (Fable, Schlüsselszene K2): Bens Gegenliste (Entscheidung B)
  n2_kantine: [
    ['erzaehler', 'Dienstag. 12:10. Noahs Platz ist leer.'],
    { wenn: (m) => !m.listeGemeldet, dann: [['hoffmann', '(an der Kantinentür, laut) Zu der Liste von heute Morgen: Wer da drauf steht, hat nichts falsch gemacht.']] },
    { wenn: (m) => !!(m.listeGemeldet || m.milaGemeldet), dann: [['erzaehler', 'Die Handys liegen im Schrank von Mme Tidderich. Ben hat ein zweites.']] },
    { wenn: (m) => !!m.milaGemeldet, dann: [['jo', '(laut) Wer hat gepetzt? … (schaut Mila an)'], ['mila', '(isst weiter. Schaut nicht hoch.)'], ['ayla', 'Hilfe holen ist kein Petzen, Jo.']] },
    ['ben', 'Gegenliste. Nett gemeint. Noah auf eins.'],
    ['jo', 'Ich war noch nie auf einer Liste.'],
    { wenn: (m) => !!m.milaGemeldet, dann: [['mila', 'Ben. Nein.']], sonst: [['mila', '(trocken) Die erste war auch „nur Spaß“.']] },
    ['ben', 'Bist du dabei oder nicht?'],
    { fest: true, wahl: [
      { t: '„Bin dabei.“', herz: { ben: 1 }, merke: 'gegenlisteDabei', dann: [['ben', '(schiebt dir sein Handy hin) Du postest. Ich trau mich nicht.'],
        { szene: 'chat', id: 'gegenPosten', def: () => POSTEN, ausgang: (r) => (r.flags.gepostet ? 'gepostet' : r.flags.gefragt ? 'gefragt' : r.flags.geloescht ? 'geloescht' : 'ben'),
          folgen: { gepostet: { merke: 'gegenlisteGepostet' }, gefragt: { staerke: 'lesen', herz: { noah: 1 }, merke: 'gegenlisteNoahGefragt' }, geloescht: { merke: 'gegenlisteGeloescht' }, ben: { merke: 'gegenlisteBenPostet' } } }] },
      { t: '„Mach keine Liste.“', staerke: 'klar', herz: { mila: 1 }, merke: 'gegenlisteNein', dann: [] },
      { t: '„Frag erst Noah.“', staerke: 'lesen', herz: { mila: 1 }, merke: 'gegenlisteFragen', dann: [] },
      { t: '(Aufstehen. Noah suchen.)', staerke: 'einbeziehen', herz: { noah: 1 }, merke: 'gegenlisteNoahSuchen', dann: [] },
    ] },
    { wenn: (m) => !m.gegenlisteDabei, dann: [['erzaehler', 'Ben tippt schon. Sein Daumen bleibt über „Posten“ stehen.'], ['ben', 'Ich will doch nur, dass er wieder kommt.']] },
    { tu: 'n2_gegenlisteFolge' },
  ],
  // Mittwoch 16:15: Noah an seinem Ort. Helfen, ohne ihn auszustellen.
  n2_turm: [
    ['erzaehler', 'Mittwoch, 16:15, Jugendhaus. Am Fenster steht ein Turm aus Bausteinen. Ein Meter zwanzig. Das Dach fehlt.'],
    ['noah', '(ohne sich umzudrehen) Nichts anfassen. Bitte.'],
    ['erzaehler', 'Hier ist Noah schnell. Kein Stein falsch.'],
    ['noah', 'Die Uhr sitzt eine Reihe zu tief. Seit zwei Wochen. Ich seh es jedes Mal.'],
    { wahl: [
      { t: '„Sieht man kaum.“', dann: [['noah', 'Ich seh es.']] },
      { t: '„Kann man das noch ändern?“', staerke: 'zuhoeren', herz: { noah: 1 }, merke: 'turmAendern', dann: [['noah', 'Nur, wenn ich das halbe Dach wieder abbaue.'], { tu: 'n2_nachgehakt' }, ['noah', 'Vielleicht. Irgendwann.']] },
      { t: '(Zuschauen. Nichts sagen.)', staerke: 'warten', herz: { noah: 1 }, dann: [['erzaehler', 'Zehn Minuten. Er baut. Du schaust. Das Ruhigste seit Montag.']] },
    ] },
    ['ben', '(kommt rein, das Handy schon oben) Noah! Ein Foto vom Turm. Dann sehen alle, was du kannst.'],
    { wenn: (m) => !!m.steckbriefTurm, dann: [['noah', 'Seit Dienstag weiß es eh jeder. Stand ja auf deinem Zettel.']] },
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
    { wenn: (m) => !!(m.k1KenanNichts || m.k1KenanKomisch), dann: [['kenan', '(kurz, an dir vorbei) Dein Foto von Montag. Soll’s weg?'], { wahl: [
      { t: '„Ja. Lösch es.“', staerke: 'klar', merke: 'k2KenanGeloescht', dann: [['kenan', '(tippt) Weg.']] },
      { t: '„Behalt’s.“', merke: 'k2KenanBehalten', dann: [['kenan', 'Okay.']] },
    ] }] },
    { wenn: (m) => !!m.nameStattLinks, dann: [['luca', 'Du bist {name}. Film mal.']], sonst: [['luca', 'Du bist {name}. Hinten links, oder? Film mal.']] },
    ['erzaehler', 'Er drückt dir sein Handy in die Hand. Kamera an. Er nimmt Anlauf.'],
    { szene: 'stoerung', id: 'k2LucaTrick', pruefe: false,
      def: { bild: { wer: 'luca', von: [2.2, 1.3, 2.6], auf: [0, 1.0, 0], fov: 50 }, t: 'Luca springt. Hinten im Bild läuft Noah vorbei. Mit gesenktem Kopf.', hin: 'Wegschwenken', bleib: 'Draufhalten', zeit: 6 },
      ausgang: (r) => (r.hin ? 'raus' : 'drin'),
      folgen: { raus: { merke: 'k2NoahRausgeschwenkt', herz: { noah: 1 }, dann: [['luca', '(schaut aufs Handy) Ich bin nur halb drauf. Wegen dem da?']] },
        drin: { merke: 'k2NoahImBild', herz: { noah: -1 }, dann: [['luca', '(schaut aufs Handy) Perfekt. Kommt in meine Story.'], ['erzaehler', 'Hinten, unscharf: Noah. Er hat die Kamera gesehen.']] } } },
    ['luca', 'Lowkey lustig, die Liste. Die mit der Taube.'],
    { wahl: [
      { t: '„Für Noah nicht.“', staerke: 'klar', herz: { luca: -1 }, merke: 'lucaWiderspruch', dann: [['luca', '(lächelt) Noah. Klar. Der Ruhige.']] },
      { t: '„Die Taube war gut.“', herz: { luca: 1 }, merke: 'lucaMitgelacht', dann: [['luca', 'Siehst du. Du verstehst das.']] },
      { t: '(Handy zurückgeben.)', merke: 'lucaStehenGelassen', dann: [['luca', '(nimmt es) Okay. Ruhig. Auch gut.']] },
    ] },
    ['luca', 'Komm mal vorbei. Hier ist es besser.'],
    ['erzaehler', 'Dario steht abseits. Er hat die ganze Zeit zugeschaut.'],
  ],
  // Freitag 15:50: ein gefaltetes Blatt in der Jackentasche (Cliffhanger)
  n2_freitag: [
    ['erzaehler', 'Freitag, 15:50. Haltestelle. Dario auf der Bank. Lina daneben, Kapuze auf.'],
    { hin: { lina: [-23.0, 42.2, -1.4, 'sitzt'] } },
    { tu: 'n2_noahFreitag' },
    // „Stärke mit Beweis“ (Heft #01): Montag hast du gesagt, was du kannst. Freitag will Dario einen Beweis – aus deiner eigenen Woche.
    { tu: 'n2_beweisFrage' },
    // Heft #01, Woche: eine Stärke auch jemand anderem sagen – Dario dreht die Frage um
    ['dario', '(leiser) Und ich? Was kann ich?'],
    { wahl: [
      { t: '„Du merkst dir alles.“', merke: 'k2StaerkeDario', staerke: 'zuhoeren', herz: { dario: 1 }, dann: [['dario', '(still) … Beweis?'], { fest: true, wahl: [
        { t: '„Du wusstest meinen Satz noch.“', merke: 'k2DarioMitBeweis', dann: [['dario', '(still) … Mit Beweis. Das hat noch keiner gesagt.']] },
        { t: '„Ist halt so.“', dann: [['dario', 'Hm. Glaub ich dir. Bisschen.']] },
      ] }] },
      { t: '„Du fragst immer nach.“', merke: 'k2StaerkeDarioFragen', herz: { dario: 1 }, dann: [['dario', '(grinst kurz) Beweis?'], { fest: true, wahl: [
        { t: '„Mich hast du dreimal gefragt.“', merke: 'k2DarioMitBeweis', dann: [['dario', 'Hm. Stimmt. Dreimal. Das zählt.']] },
        { t: '„Ist halt so.“', dann: [['dario', 'Okay. Hm.']] },
      ] }] },
      { t: '(Schulter zucken.)', merke: 'k2StaerkeDarioNicht', dann: [['dario', 'Dachte ich mir.']] },
    ] },
    ['dario', 'Hast du die Liste gesehen? Die vom Dienstag.'],
    { wahl: [
      { t: '„Ja. War nicht lustig.“', merke: 'darioListeNein', dann: [['dario', '(nickt langsam) Nicht lustig. Okay.'], ['erzaehler', 'Lina schaut kurz unter der Kapuze hervor. Dann wieder aufs Handy.']] },
      { t: '„Die Taube war gut.“', merke: 'darioListeTaube', dann: [['dario', '(grinst) Die Taube war gut.']] },
      { t: '„Warum fragst du?“', staerke: 'lesen', merke: 'darioWarum', dann: [['dario', 'Nur so. Ich frag alle.'], ['erzaehler', 'Er fragt nicht alle. Er fragt dich.']] },
      { t: '„Du drehst dein Handy immer weg.“', beweis: 'k2DarioDreht', merke: 'darioErtappt',
        dann: [['dario', '(lacht kurz. Zu laut.) Du schaust genau hin, oder?'], ['dario', 'Ist nicht verboten. Hinschauen.']] },
    ] },
    { blende: 'Freitag · 15:58 · im Bus' },
    // Zwei haben es gehört: Dario und Lina. Die Story kommt erst im Bus – wer war es?
    { wenn: (m) => !!(m.darioListeNein || m.darioListeTaube || m.darioWarum || m.darioErtappt), dann: [
      { handy: (m) => ({ wer: '@annexe.cam · Story', wann: 'vor 1 Min.', text: m.darioListeNein ? 'nicht lustig? okay.' : m.darioListeTaube ? 'die taube war gut. 🐦' : m.darioWarum ? 'warum fragst du? 👀' : 'wer dreht hier sein handy weg? 👀' }) },
      ['erzaehler', 'Dein Satz. Zwei Reihen vor dir: Dario. Ganz hinten: Lina. Beide am Handy.'],
      { beweis: 'k2Story', t: '@annexe.cam postet deinen Satz von der Haltestelle – eine Minute später. Dario und Lina waren dabei.' },
      { verdacht: 'dario', spur: 'Hat deinen Satz gehört. Saß im Bus.' }, { verdacht: 'lina', spur: 'Hat deinen Satz gehört. Saß im Bus.' },
      // Der Plan aus K1 löst aus: der Gedanke steht da, wo getippt wird
      { wenn: (m) => !!m.k1DingeBus, dann: [['du', '(denkt) Im Bus. Hab ich mir vorgenommen. Drei Dinge?']], sonst: [{ wenn: (m) => !!(m.k1Geerdet || m.k1RuhigGeklappt || m.k1DingePause || m.k1DingeBett), dann: [['du', '(denkt) Zu viel. Wie am ersten Tag. Drei Dinge?']], sonst: [['du', '(denkt) Zu viel. Drei Dinge?']] }] },
      { wahl: [
        { t: '📎 „Schon wieder dein Satz.“', beweis: 'k1DarioSatz', merke: 'darioSatz2', dann: [{ handy: null }, ['dario', '(dreht sich um. Blass.) Siehst du. Der klaut.']] },
        { t: '🖐 (Drei Dinge suchen.)', merke: 'k2DreiDinge', staerke: 'ruhig', dann: [{ handy: null }, ['du', '(denkt) Die Stange. Gelb. Kaugummi am Fenster. Regen. … Okay.']] },
        { t: '🙋 (Montag Herrn Kuedes zeigen.)', merke: 'k2KuedesZeigen', staerke: 'hilfe', dann: [{ handy: null }, ['du', '(denkt) Montag. Herr Kuedes. Ich zeig’s ihm.']] },
        { t: '(Nichts sagen.)', merke: 'k2BusNichts', dann: [{ handy: null }] },
      ] },
      { wenn: (m) => !!m.darioListeNein, dann: [['erzaehler', 'Dein Handy summt noch mal. Mila: „fand ich auch nicht.“']] }] },
    // Was du Luca gesagt hast, hat einer gehört
    { wenn: (m) => !!m.lucaWiderspruch && !m.k2DarioSahBeweis, dann: [['dario', '(beim Aussteigen) Hab gehört, was du Luca gesagt hast. … Mutig.']],
      sonst: [{ wenn: (m) => !!m.lucaMitgelacht, dann: [['dario', '(beim Aussteigen) „Die Taube war gut.“ Hast du Luca gesagt. Hab’s gehört.']] }] },
    ['erzaehler', 'In deiner Jacke: ein Blatt.'],
    { handy: { wer: 'Ein gefaltetes Blatt', wann: 'Freitag', text: 'Eine Zeichnung von dir, am ersten Tag. Am Rand: eine Hand, ein Handy, ein Armband.' } },
    { wahl: [
      { t: '📎 Das Armband. Wie bei Dario.', beweis: 'k2Armband', merke: 'armbandErkannt', dann: [{ verdacht: 'dario', spur: 'Auf der Zeichnung: Hand, Handy, grau-oranges Armband.' }, ['erzaehler', 'Grau und orange. Du hast es am Montag gesehen.']] },
      { t: '„Wer hat das gezeichnet?“', merke: 'zeichnungFrage', dann: [['erzaehler', 'Der Strich ist fein. Wie in einem Skizzenheft.']] },
      { t: 'Blatt wegstecken.', dann: [] },
    ] },
    { handy: null },
    { wenn: (m) => !!(m.heftReingeschaut || m.k1BeiLina || (m.linaVertraut && m.fotoLina)), dann: [['erzaehler', 'Den Strich kennst du. Vom Brunnen.']] },
    { tu: 'n2_zeichnung' },
    { szene: 'verdacht', id: 'wand2', pruefe: false, def: { titel: 'Verdachts-Wand · Freitag', frage: 'Wer steckt hinter @annexe.cam? Nur Spuren zählen.', leute: ['dario', 'lina', 'kenan'], offen: 'Noch zu früh.' }, ausgang: (r) => r.wahl, folgen: {} },
    { handy: { wer: 'Notiz', wann: 'Freitag', text: '💬 Jemandem eine Stärke sagen. Mit Beweis. Wem?' } },
    { fest: true, wahl: [
      { t: '👥 Jemand aus der Klasse.', merke: 'k2SagenKlasse', dann: [] }, { t: '🏀 Jemand im Training.', merke: 'k2SagenTraining', dann: [] },
      { t: '💬 Per Nachricht.', merke: 'k2SagenNachricht', dann: [] }, { t: '❔ Weiß noch nicht.', merke: 'k2SagenOffen', dann: [] },
    ] },
    { handy: null },
    { tu: 'kapitelEnde' },
  ],
};

// Rückblick in Bildern (Gesamtkonzept K2): Steckbrief, Bank zwei, Noahs Moment, „Das war auch“, eure Bank
export const RUECKBLICK_N2 = (m) => [
  { id: 'steckbriefNoah', titel: 'Der Steckbrief', text: m.steckbriefTurm ? 'Noahs Foto. Den Satz über den Turm hat Mme Nouvelle gestrichen. Ben hatte ihn schon gelesen.' : m.steckbriefSelbst ? 'Noahs Foto. Darunter sein eigener Satz: „Ich bau Sachen. Genau.“' : m.steckbriefGenau ? 'Noahs Foto. Darunter: „misst alles genau“.' : 'Noahs Foto. Darunter: „still“.' },
  { id: 'k2Werkbank', titel: 'Bank zwei', text: m.atelierNoah ? 'Noah hat gemessen. Zweiundvierzig.' : m.atelierJo ? 'Jo hat gemessen. Fünfundvierzig.' : 'Zweimal messen, einmal sägen.' },
  { id: 'k2Noah', titel: 'Dienstag, 10:03', text: 'Noah liest seinen Namen. Platz eins.' + (m.listeTankNoah ? ' Dann sagst du laut: „Ohne Noah würde die Bank wackeln.“' : ' Er sagt: „egal“. Er geht schneller.') + (m.k2NoahKuedes ? ' Freitag geht er zu Herrn Kuedes.' : '') },
  m.k2WKeins ? null : m.k2WBild ? { id: m.k2WBild, titel: 'Währenddessen', text: m.k2WText, auch: true }
    : !m.pause2Lina ? { id: 'auchLina2', titel: 'Währenddessen', text: m.heftZu ? 'Lina am Brunnen. Das Heft hält sie jetzt mit beiden Händen fest.' : 'Lina am Brunnen. Sie klappt ihr Heft zu, sobald jemand kommt.', auch: true }
    : { id: 'auchBen2', titel: 'Währenddessen', text: 'Ben auf der Bank. Level vierzig. Das Pausenbrot noch eingepackt.', auch: true },
  { id: 'k2Bank', titel: 'Eure Bank', text: m.bankWackelt ? 'Sie wackelt. Unter einem Bein steckt Karton.' : 'Sie steht gerade. Das ganze Jahr.' },
].filter(Boolean);

// TUN für Kapitel 2 (in spiel.js eingehängt: tunN2)
export const tunN2 = (c) => ({
  // Die Bank der 7P2 steht ab jetzt im Hof (spiel.js: klassenBank) – gerade oder wackelig, das ganze Jahr
  n2_bankGebaut: () => {
    const m = c.S.merke; m.bankGebaut = true;
    if (c.welt) c.welt();
    c.ui.toast(m.bankWackelt ? '<b>🪑 Eure Bank wackelt</b><span>Noah hatte 42. Steht ab morgen im Hof.</span>' : '<b>🪑 Eure Bank steht gerade</b><span>' + (m.noahMassGefragt ? 'Weil Noah gefragt wurde.' : 'Weil die 42 gezählt hat.') + ' Ab morgen im Hof.</span>', 'ly-t-ent');
  },
  n2_yusufMorgen: () => { c.S.merke.yusufKorb = true; },
  // Währenddessen (Pause): wer nicht bei Lina war, sieht Lina; sonst Ben – oder Jos Foto von Ben, wenn keiner hingegangen ist
  n2_waehrenddessen: () => {
    const m = c.S.merke;
    const W = (bild, ort, t) => { m.k2WBild = bild; m.k2WText = t; return [{ szene: 'schnitt', pruefe: false, def: { bild, ort, t } }]; };
    if (m.benFotoJo) { m.k2WBild = 'auchPause2'; m.k2WText = 'Jo zeigt allen sein Foto. Ben schläft noch.'; return [{ foto: 'auchPause2', wer: 'ben', von: [1.6, 1.6, -2.2], auf: [0, 0.9, 0], fov: 46 }, { szene: 'schnitt', pruefe: false, def: { bild: 'auchPause2', ort: 'Bank', t: m.k2WText } }]; }
    // Der Ort, den du verlassen hast – oder die Störung, zu der du nicht gegangen bist
    if (m.chiaraAllein) return W('auchChiara2', 'Hof', 'Chiara. Jo liest weiter vor. Mit ihrer Stimme. Keiner hilft.');
    if (m.heftHin && m.pause2Chiara) return W('auchChiara2', 'Hof', 'Chiara sammelt die Zettel vom Boden. Auf einem steht „JO 😂“.');
    if (m.heftHin && m.pause2Jo) return W('auchJo2', 'Hof', 'Jo hält seinen Wahlzettel hoch. Keiner bleibt stehen.');
    if (m.chiaraGeholfen && m.pause2Lina) return W('auchLina2', 'Brunnen', 'Lina. Allein. Das Heft fest an sich gedrückt.');
    if (m.chiaraGeholfen && m.pause2Ben) return W('auchBen2', 'Bank', 'Ben. Level einundvierzig. Das Brot noch eingepackt.');
    if (m.heftBlieb) { m.k2WKeins = true; return []; }
    if (!m.pause2Lina) return W('auchLina2', 'Brunnen', 'Lina. Sie klappt das Heft zu, sobald jemand kommt.');
    return W('auchBen2', 'Bank', 'Ben. Level vierzig. Das Brot noch eingepackt.');
  },
  // Foto der Bank für den Rückblick – erst, wenn alle sitzen (nach den hin-Zeilen im Gespräch: kurz später)
  n2_bankFoto: () => { setTimeout(() => c.foto && c.foto('k2Bank', { von: [-3.4, 1.55, 23.6], auf: [-2.0, 0.6, 27.6], fov: 42 }), 900); },
  n2_nummer: () => (c.S.merke.nummerBlockiert ? [['erzaehler', 'Die Nummer von damals ist blockiert. Still.']]
    : [['erzaehler', 'Die Nummer von damals: still.']]),
  n2_gegenlisteFolge: () => {
    const m = c.S.merke;
    if (m.gegenlisteNoahGefragt) return [['ben', '(liest mit) „bitte nicht. auch keine nette.“ … Okay. Dann eben nicht.'], ['erzaehler', 'Er löscht den Entwurf. Er isst nicht mehr weiter.']];
    if (m.gegenlisteGeloescht) return [['ben', 'Ey! … (atmet aus) Vielleicht besser so.']];
    if (m.gegenlisteNoahSuchen) {
      m.gegenlistePost = true; m.liste_jo = true; m.liste_ben = true;
      const summt = m.listeGemeldet || m.milaGemeldet ? 'Dann kommt Ben die Treppe hoch. Sein zweites Handy in der Hand. Gepostet.' : 'Dann summen beide Handys. Ben hat gepostet.';
      if (m.listeGelacht && m.k2Entschuldigt) return [['erzaehler', 'Du findest Noah auf der Treppe hinter dem CDI. Er rückt ein Stück. ' + summt],
        ['noah', '(schaut aufs Handy, dann zu dir) Du hast sorry gesagt. Bleib.']];
      if (m.listeGelacht) return [['erzaehler', 'Du findest Noah auf der Treppe hinter dem CDI. Er steht auf, als du kommst. ' + summt],
        { wahl: [
          { t: '„Sorry. Ich hab mitgelacht.“', merke: ['k2Entschuldigt', 'k2SorrySpaet'], herz: { noah: 1 }, dann: [['noah', '(bleibt stehen) … Spät. Aber okay.'], ['erzaehler', 'Er setzt sich wieder. Eine Stufe weiter unten.']] },
          { t: '(Nichts sagen.)', dann: [['noah', '(im Weggehen) Erst lachen. Dann suchen.']] },
        ] }];
      return [['erzaehler', 'Du findest Noah auf der Treppe hinter dem CDI. Ihr sitzt. ' + summt],
        ['noah', '(schaut nicht aufs Handy. Schaut dich an.) Du warst hier. Nicht da.']];
    }
    if (m.gegenlisteGepostet || m.gegenlisteBenPostet) {
      m.gegenlistePost = true; m.liste_jo = true; m.joAufListe = true;
      return [
        ['erzaehler', m.gegenlisteBenPostet ? 'Zu langsam. Ben nimmt das Handy zurück und drückt selbst.' : 'Dein Daumen. Gepostet.'],
        ['erzaehler', 'Zehn Minuten später teilt @annexe.cam die Gegenliste. Mit einem Wort: „süß.“'],
        ['chiara', '(am Nachbartisch, laut) Wer hat das gepostet?'], ['erzaehler', m.gegenlisteGepostet ? 'Ben schaut zu dir. Nur kurz.' : 'Ben steckt das Handy weg.'],
        ['noah', '(später, im Gang) Jetzt bin ich auf zwei Listen.'],
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
  // Freitag: was die Woche bei Noah hinterlassen hat (Liste, Turm, Lucas Video) – er sagt es im Vorbeigehen
  n2_noahFreitag: () => {
    const m = c.S.merke, z = [];
    if (m.joLange) z.push(['jo', '(im Vorbeigehen) Und? Die lange Geschichte?'], { wahl: [
      { t: '⏭ „Weiter.“', merke: 'k2JoWeiter', dann: [['jo', '(grinst) Okay. Weiter.']] },
      { t: '„Montag.“', dann: [['jo', 'Montag. Ich merk’s mir.']] },
    ] });
    if (m.turmGeschuetzt && m.turmAendern) z.push(['noah', '(im Vorbeigehen) Das Dach ist drauf. Die Uhr sitzt jetzt richtig.']);
    // Noah sagt höchstens zwei Sätze – zuerst, was am direktesten zu deiner Wahl gehört
    const n = [];
    if (m.noahEgalGeglaubt) n.push(['noah', '(im Vorbeigehen, leise) Dienstag. „Ist mir egal.“ … War’s nicht.']);
    if (m.turmFoto) n.push(['noah', (n.length ? '' : '(im Vorbeigehen) ') + 'Ich geh nicht mehr hin. Ins Jugendhaus.']);
    else if (m.turmGeschuetzt) n.push(m.turmAendern ? ['noah', '(dreht sich noch mal um) Danke. Für Mittwoch.'] : ['noah', '(im Vorbeigehen) Das Dach ist drauf.']);
    if (m.k2NoahImBild) n.push(['noah', (n.length ? '' : '(im Vorbeigehen, leise) ') + 'Ich bin in Lucas Story. Hinten. Wieder.']);
    if (m.listeBeiNoah || m.noahRausGefragt) n.push(['noah', '(im Vorbeigehen) Treppe hinterm CDI. Montag wieder?']);
    else if (m.noahNichtEgal) n.push(['noah', '(im Vorbeigehen, leise) Mir auch nicht mehr. Egal, mein ich.']);
    z.push(...n.slice(0, 2));
    // Foto/Video von Noah: eine zweite Chance im Vorbeigehen (klein, ohne Publikum)
    if ((m.turmFoto || m.k2NoahImBild) && n.length) z.push({ wahl: [
      { t: m.turmFoto ? '„Sorry. Wegen dem Foto.“' : '„Sorry. Wegen dem Video.“', merke: 'k2NoahSorryBild', staerke: 'ehrlich', herz: { noah: 1 }, dann: [['noah', '(bleibt kurz stehen) … Okay.']] },
      { t: '(Nichts sagen.)', dann: [] },
    ] });
    if (!n.length) z.push(['dario', '(neben dir) Noahs Platz in der Kantine war leer. Seit Dienstag.']);
    // Rückzug ohne Halt gibt es nicht: Noah holt sich Hilfe (vorgemacht, nicht gepredigt)
    if (!n.length || m.turmFoto || m.noahEgalGeglaubt) { m.k2NoahKuedes = true; z.push(['erzaehler', 'Noah steigt nicht ein. Er geht zurück ins Gebäude. Hoch zu Herrn Kuedes.']); }
    return z;
  },
  n2_milaAllein: () => { c.S.merke.milaGemeldet = true;
    return [{ szene: 'schnitt', pruefe: false, def: { ort: 'Saal 1.04', t: 'Mila zeigt Mme Tidderich die Liste. Allein.' } }]; },
  n2_beweisFrage: () => {
    const m = c.S.merke, beh = m.selbstZuhoeren ? 'zuhoeren' : m.selbstMerken ? 'merken' : m.selbstLachen ? 'lachen' : null;
    const W = { zuhoeren: 'Zuhören', merken: 'Merken', lachen: 'Lachen', helfen: 'Helfen', mut: 'Mut' };
    const SIEHT = { zuhoeren: 'Du bleibst, wenn’s eng wird.', merken: 'Du merkst dir, was andere vergessen.', lachen: 'Du bringst Leute zum Lachen, wenn’s schwer ist.', helfen: 'Du hilfst, wenn alle nur gaffen.', mut: 'Du sagst Nein, wenn alle Ja sagen.' };
    const ST = { zuhoeren: 'zuhoeren', merken: 'klar', lachen: 'humor', helfen: 'einbeziehen', mut: 'mut' };
    const frage = beh ? '(rutscht ein Stück) Montag hast du gesagt: „' + W[beh] + '.“ Beweis?' : '(rutscht ein Stück) Montag wusstest du nicht, was du kannst. Und jetzt?';
    const treppe = !!(m.noahRausGefragt || m.gegenlisteNoahSuchen);
    const alle = [
      (treppe || m.listeBeiNoah) && { id: 'Noah', t: treppe ? '📎 Noah. Treppe, Dienstag.' : '📎 Noah. Dienstag, mit rein.', art: 'zuhoeren', d: treppe ? 'Du warst bei Noah auf der Treppe.' : 'Du bist Dienstag mit Noah rein.',
        halb: m.listeGelacht && !m.k2Entschuldigt ? 'Erst gelacht. Dann gesucht.' : m.noahEgalGeglaubt ? 'Mit rein, ja. Dann: „Dann ist ja gut.“' : m.gegenlisteGepostet ? 'Und dann die Gegenliste gepostet.' : '',
        ganz: m.listeGelacht && m.k2Entschuldigt ? 'Erst gelacht. Dann sorry gesagt. … Zählt.' : '' },
      (m.bankGerade || m.noahMassGefragt || m.atelierPlan) && { id: 'Bank', t: '📎 Bank zwei. Zweiundvierzig.', art: m.noahMassGefragt ? 'zuhoeren' : 'merken', d: m.noahMassGefragt ? 'Bank zwei. Du hast Noah nach seinem Maß gefragt.' : 'Bank zwei. Du hast dir die Zweiundvierzig gemerkt.' },
      (m.turmGeschuetzt || m.lucaWiderspruch) && { id: 'Mut', t: m.turmGeschuetzt ? '📎 Der Turm. Kein Foto.' : '📎 Luca. Ich hab widersprochen.', art: 'mut', d: m.turmGeschuetzt ? 'Der Turm. Du hast das Foto verhindert.' : 'Luca. Du hast widersprochen. Hab’s gehört.' },
      (m.chiaraSicher || m.chiaraGeholfen) && { id: 'Chiara', t: '📎 Chiara. Der Stapel.', art: 'helfen', d: 'Chiara. Du hast ihr mit dem Stapel geholfen.' },
      m.rafaWitz && { id: 'Rafa', t: '📎 Rafa. Er hat gelacht.', art: 'lachen', d: 'Rafa. Du hast ihn zum Lachen gebracht.' },
    ].filter(Boolean);
    // Höchstens drei Belege – ein passender ist immer dabei, wenn es einen gibt (Reihenfolge bleibt, damit nichts verraten wird)
    let belege = alle.slice(0, 3);
    const passt = beh && alle.find((b) => b.art === beh);
    if (passt && !belege.includes(passt)) belege = [...belege.slice(0, 2), passt];
    // Kein Beleg: kein Menü mit einem Knopf – die Antwort ist klar
    if (!belege.length) { m.staerkeOhne = true; return [['dario', frage], ['du', 'Hab keinen.'], ['dario', 'Dann such einen. Nächste Woche.']]; }
    const reakt = (b) => (b.halb ? [['dario', '(schaut dich lange an) ' + b.halb + ' … Zählt halb.']] : b.ganz ? [['dario', '(schaut dich lange an) ' + b.ganz]]
      : !beh ? [['dario', '(nickt) Dann weiß ich’s jetzt. ' + SIEHT[b.art]]]
      : b.art === beh ? [['dario', '(nickt) Okay. Glaub ich dir.']]
      : [['dario', 'Das ist nicht ' + W[beh] + '. Das ist ' + W[b.art] + '. Auch gut.']]);
    return [['dario', frage], { fest: true, wahl: [
      ...belege.map((b) => ({ t: b.t, ...(b.halb ? {} : { staerke: ST[b.art] }), merke: ['staerkeBewiesen', 'beweis' + b.id, b.halb ? 'beweisHalb' : !beh || b.art === beh ? 'beweisPasst' : 'beweisAnders'], dann: reakt(b) })),
      { t: 'Hab keinen.', merke: 'staerkeOhne', dann: (() => { const g = belege.find((b) => !b.halb), h = belege[0];
        return g ? [{ tu: 'n2_darioSah' }, ['dario', '(schaut dich an) Ich hab einen gesehen. ' + g.d + ' … Zählt.']]
          : [{ tu: 'n2_darioSahHalb' }, ['dario', '(schaut dich an) Einen hab ich gesehen. ' + h.d + ' … Das ist ein Anfang.']]; })() },
    ] }];
  },
  n2_nachgehakt: () => { c.S.merke.k2NachgehaktTurm = true; c.ui.toast('<b>💬 Nachgehakt</b><span>Eine Frage mehr. Noah erzählt weiter.</span>', 'ly-t-ent'); return []; },
  n2_nachhakTipp: () => { const m = c.S.merke; if (!m.k2NachhakTipp) { m.k2NachhakTipp = true; c.ui.toast('<b>💬 Nachhaken</b><span>„Welche?“ · „Wie war das?“ · „Und dann?“</span>', 'ly-t-ent'); } return []; },
  n2_darioSah: () => { c.S.merke.k2DarioSahBeweis = true; return []; },
  n2_darioSahHalb: () => { c.S.merke.k2DarioSahBeweis = true; c.S.merke.k2DarioSahHalb = true; return []; },
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

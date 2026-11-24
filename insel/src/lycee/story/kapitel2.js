// Drei Jahre Annexe – 7ème, Kapitel 2 „Wer bin ich?“ (Kurs Jahr 1, Modul 1: E04 Glas der Bedürfnisse, E05 Zwischen laut
// und leise, E06 Baum der Stärke). Faden @annexe.cam: „Top 5 langweiligste Leute“ – Noah auf Platz 1, Mila auf Platz 2.
import { S2_TANKS, S2_STAERKEN } from './skills-j1.js';

const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
// Stuhlkreis vorne in der Aula (Mitte −14.5 | −63.4), Lücke im Süden für den Spieler
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, chiara: { id: 'chiara', name: 'Chiara', farbe: '#3fa66b' }, yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' } };

export const SCHRITTE_N2 = [
  { id: 'k2_post', kap: 2, tag: 'Montag', uhr: 7.6, titel: 'Top 5', ziel: 'Noah sitzt allein auf der Bank am Hof.', marker: 'noah',
    start: { teleport: 'eingangHof', gespraech: 'n2_post' },
    leute: { noah: [-20, 11.6, Math.PI, 'sitzt'], mila: [-14, 11.6, Math.PI, 'sitzt'], ben: [4, 14, 0.6, 'redet'], jo: [5.2, 15.4, -2.4, 'redet'], dario: [-32.6, 10.2, -2], kenan: [-34, 9, 1] },
    fertig: { reden: 'noah', gespraech: 'n2_noah' } },
  // Fachstunde (Rückmeldung der Schüler 24.11.): Mathe im eigenen Modul, zu zweit – Mila rechnet schneller als alle
  { id: 'k2_mathe', kap: 2, tag: 'Montag', uhr: 8.6, neben: 'fach', titel: 'Mathe', ziel: 'Saal 1.04. Mathe bei Mme Lenning – heute zu zweit.', marker: 'lenning',
    start: { teleport: 'saal104Tuer' },
    leute: { lenning: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'lenning', gespraech: 'n2_mathe' } },
  { id: 'k2_tanks', kap: 2, tag: 'Montag', uhr: 9.9, neben: 'skills', titel: 'Skills: Das Glas der Bedürfnisse', ziel: 'Skills-Stunde in der Aula. Herr Kuedes hat sechs Tanks gemalt.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n2_tanks' } },
  { id: 'k2_mittag', kap: 2, tag: 'Montag', uhr: 12.3, titel: 'Wer ist #3?', ziel: 'Kantine. Ben winkt dich an seinen Tisch.', marker: 'ben',
    start: { teleport: 'kantineTuer', gespraech: 'n2_mittagChat' },
    leute: { ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], ayla: [10.75, -10.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], mila: [10.75, -11.1, Math.PI / 2, 'sitzt'], dario: [21.4, -13.2, 0.9], kenan: [21.0, -12.0, 1.2] },
    fertig: { reden: 'ben', gespraech: 'n2_mittag' } },
  { id: 'k2_ruhm', kap: 2, tag: 'Donnerstag', uhr: 8.1, titel: 'Die Gegenliste', ziel: 'Saal 1.04. Ben hat einen Plan gegen die Liste.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer', gespraech: 'n2_morgen' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n2_ruhm' } },
  { id: 'k2_linie', kap: 2, tag: 'Donnerstag', uhr: 10.0, neben: 'skills', titel: 'Skills: Laut und leise', ziel: 'Zurück in die Aula. Auf dem Boden kleben Linien.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], mesenberg: [-13.54, -65.16, -0.50], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n2_linie' } },
  { id: 'k2_dario', kap: 2, tag: 'Donnerstag', uhr: 12.4, titel: 'Mittag', ziel: 'Dario winkt dich an der Skate-Ecke rüber.', marker: 'dario',
    start: { teleport: 'eingangHof' },
    leute: { dario: [-33.4, 12, 1.2], kenan: [-35, 10.4, 0.6, 'redet'], luca: [-36.4, 11.6, 1.9, 'redet'], mila: [-20, 11.6, Math.PI, 'sitzt'], noah: [-14, 11.6, Math.PI, 'sitzt'] },
    fertig: { reden: 'dario', gespraech: 'n2_dario' } },
];

// ---------- @annexe.cam: Top 5 langweiligste Leute ----------
const TOP5 = {
  titel: '7P2', mitglieder: 19, dauer: 34,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Jo hat einen Beitrag von @annexe.cam geteilt.' },
    { nach: 1.4, wer: '@annexe.cam', bild: 'Noah allein am Tisch, Mila zählt Tauben', text: 'TOP 5 LANGWEILIGSTE LEUTE 7P2 😴  #1 noah  #2 mila  #3 …', lacher: { start: 4, proSek: 0.4, stopp: 'gestoppt' } },
    { nach: 3.6, wer: 'Jo', text: '💀' },
    { nach: 5.2, wer: 'Ben', text: 'wer ist #3? und wieso nur zwei namen' },
    { nach: 7.4, wer: 'Luca', text: 'lowkey stimmt aber' },
    { nach: 9.6, wer: 'Mila', text: 'Eine Liste ohne Grund ist keine Liste. Nur eine Meinung von jemandem, der sich versteckt.' },
    { nach: 11.5, wer: 'Jo', text: 'mila verteidigt sich selbst 😭', wennNicht: 'gestoppt' },
    { nach: 13.2, system: true, text: 'Noah ist online.' },
    { nach: 15.4, system: true, text: 'Noah tippt …', wennNicht: 'gestoppt' },
    { nach: 18.2, system: true, text: 'Noah hat die Gruppe verlassen.', wennNicht: 'gestoppt' },
    { nach: 18.2, wer: 'Noah', text: '… danke', wenn: 'gestoppt' },
    { nach: 21, wer: 'Ayla', text: 'wer auch immer das macht. das ist nicht lustig', wennNicht: 'stumm' },
    { nach: 23.4, wer: 'Yusuf', text: 'das ist mies.' },
    { nach: 24.6, wer: 'Dario', text: 'chillt mal. ist nur ne liste' },
    { nach: 27, wer: 'Chiara', text: 'Ich bin nicht drauf. Ich weiß nicht, ob ich erleichtert sein soll oder ob ich die Nächste bin.' },
  ],
  aktionen: [
    { id: 'schreiben', t: 'Schreiben', symbol: '💬', wahl: [
      { t: '„Noah hat mir am ersten Tag einen Platz freigehalten. Langweilig ist anders.“', setzt: ['gestoppt', 'noahVerteidigt'], ich: 'noah hat mir am ersten tag nen platz freigehalten. langweilig ist anders', folgen: [{ nach: 1.3, wer: 'Ben', text: 'stimmt' }, { nach: 2.6, wer: 'Ayla', text: '❤️' }] },
      { t: '„Wer so eine Liste macht, hat selbst ein Problem.“', setzt: ['gestoppt', 'konter'], ich: 'wer so ne liste macht hat selbst ein problem', folgen: [{ nach: 1.2, wer: 'Jo', text: 'ohh' }, { nach: 2.6, wer: 'Dario', text: 'chill' }] },
      { t: '„Lasst uns das Ding einfach nicht mehr teilen.“', setzt: 'witz', ich: 'lasst uns das ding einfach nicht mehr teilen', folgen: [{ nach: 1.1, wer: 'Ben', text: 'ok. jo?' }, { nach: 2.2, wer: 'Jo', text: 'ja ja' }] },
    ] },
    { id: 'privat', t: 'Noah privat schreiben', symbol: '🔒', setzt: ['noahPrivat'], ich: '(privat an Noah) hey. die liste ist müll. pause zusammen?', folgen: [{ nach: 2.2, wer: 'Noah (privat)', text: 'Ich sitz auf der Bank. Falls du willst.' }] },
    { id: 'lachen', t: 'Mitlachen', symbol: '😂', setzt: 'mitgelacht', ich: '😂', folgen: [{ nach: 1, wer: 'Luca', text: 'siehste. alle lachen' }] },
    { id: 'melden', t: 'Beitrag melden', symbol: '🚩', setzt: 'gemeldet2', sys: 'Gemeldet. Zum zweiten Mal.' },
    { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm. Die Liste ist trotzdem da.', ende: true },
  ],
};

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

// ---------- Projekt #3: Gruppenchat mit Ben, Ayla, Jo, Mila ----------
const PROJEKT3 = (m) => {
  const raus = !(m.noahVerteidigt || m.campKonter);
  return {
    titel: 'wer ist #3', mitglieder: 5, dauer: 36,
    nachrichten: [
      { nach: 0.4, system: true, text: 'Ben hat dich zur Gruppe „wer ist #3“ hinzugefügt.' },
      { nach: 1.4, wer: 'Ben', text: 'ok. #3 kommt diese woche. das steht in der story' },
      { nach: 3.2, wer: 'Ben', text: 'wir finden raus wer es ist bevor es passiert' },
      { nach: 5.4, wer: 'Ayla', text: 'oder wir finden raus wer den account macht. das wär sinnvoller' },
      { nach: 7.2, wer: 'Ben', text: 'ok. beides' },
      { nach: 9.4, wer: 'Jo', text: 'wette #3 ist chiara. die macht nur hausaufgaben', setzt: 'joRaet' },
      { nach: 12.6, wer: 'Ayla', text: 'jo. genau so entstehen solche listen', wennNicht: 'joGestoppt' },
      { nach: 14.6, wer: 'Jo', text: 'war nur spaß', wennNicht: 'joGestoppt' },
      raus ? { nach: 17, wer: 'Ben', text: 'btw noah ist aus dem klassenchat raus. sollen wir ihn wieder adden?', setzt: 'noahFrage' }
        : { nach: 17, wer: 'Ben', text: 'noah sitzt übrigens wieder mit uns. hat er gefragt ob er darf. als ob er fragen muss' },
      { nach: 20.5, wer: 'Mila', text: 'Das Foto von Noah ist wieder von links unten. Sitzhöhe. Dreimal dieselbe Perspektive.' },
      { nach: 23.5, wer: 'Mila', text: 'Ich mache eine Tabelle. Wer wann wo war. Keiner wird verdächtigt ohne Beweis. Auch Jo nicht.' },
      { nach: 26, wer: 'Jo', text: 'wieso „auch jo nicht“' },
      { nach: 29, wer: 'Ayla', text: 'weil du alles teilst, jo' },
      { nach: 31.5, wer: 'Jo', text: '…' },
    ],
    aktionen: [
      { id: 'jo', t: 'Jo stoppen', symbol: '✋', wenn: 'joRaet', setzt: 'joGestoppt', ich: 'jo raten wir nicht. so fängt das an', folgen: [{ nach: 1.4, wer: 'Jo', text: 'ok. sorry. chiara ist eigentlich okay' }] },
      ...(raus ? [
        { id: 'fragen', t: 'Noah privat fragen', symbol: '🔒', wenn: 'noahFrage', wennNicht: 'noahDrin', setzt: ['noahGefragt', 'noahDrin'], ich: '(privat an Noah) willst du wieder in den klassenchat? nur wenn du willst', folgen: [{ nach: 2.6, wer: 'Noah (privat)', text: 'Wenn ihr da seid … ja. Danke, dass du fragst.' }, { nach: 4.2, system: true, text: 'Ben hat Noah zum Klassenchat hinzugefügt.' }] },
        { id: 'adden', t: 'Einfach adden', symbol: '➕', wenn: 'noahFrage', wennNicht: 'noahDrin', setzt: ['noahGeaddet', 'noahDrin'], sys: 'Du hast Noah zum Klassenchat hinzugefügt.', folgen: [{ nach: 2, wer: 'Noah (privat)', text: '?? wer hat mich geaddet. ok … danke? glaub ich' }] },
      ] : []),
      { id: 'witz', t: 'Schreiben', symbol: '💬', wahl: [
        { t: '„Tabelle ja. Namen raten nein.“', setzt: 'regel', ich: 'tabelle ja. namen raten nein', folgen: [{ nach: 1.2, wer: 'Mila', text: 'Genau meine Regel. Ich übernehme sie.' }] },
        { t: '„Und wenn #3 jemand von uns ist?“', setzt: 'snacks', ich: 'und wenn #3 jemand von uns ist?', folgen: [{ nach: 1.6, wer: 'Ben', text: '…' }, { nach: 2.8, wer: 'Mila', text: 'Dann wissen wir es vorher. Das ist der Punkt.' }] },
      ] },
      { id: 'stumm', t: 'Stummschalten', symbol: '🔕', setzt: 'stumm', sys: 'Stumm. Die Gruppe läuft weiter.', ende: true },
    ],
  };
};

// ---------- 22:14: @annexe.cam schreibt privat ----------
const DM_CAM = {
  titel: '@annexe.cam', mitglieder: 2, dauer: 26,
  nachrichten: [
    { nach: 0.6, wer: '@annexe.cam', text: 'hey 👀' },
    { nach: 2.6, wer: '@annexe.cam', text: 'willst du wissen, wer #3 ist?' },
    { nach: 6.5, wer: '@annexe.cam', text: 'tipp: jemand aus deiner klasse 📷', wennNicht: 'blockiert' },
    { nach: 11, wer: '@annexe.cam', text: 'oder bist du es selbst', wennNicht: 'blockiert' },
    { nach: 16, wer: '@annexe.cam', text: 'gute nacht. ich seh dich morgen. du mich nicht', wennNicht: 'blockiert' },
  ],
  aktionen: [
    { id: 'antworten', t: 'Antworten', symbol: '💬', wahl: [
      { t: '„wer bist du?“', setzt: 'geantwortet', ich: 'wer bist du?', folgen: [{ nach: 1.6, wer: '@annexe.cam', text: 'jemand, der mehr sieht als du' }] },
      { t: '„lass mich in ruhe.“', setzt: 'geantwortet', ich: 'lass mich in ruhe', folgen: [{ nach: 1.4, wer: '@annexe.cam', text: 'ok. für heute' }] },
    ] },
    { id: 'beweis', t: 'Screenshot an Mila', symbol: '📸', setzt: 'beweis', sys: 'Screenshot an Mila geschickt.', folgen: [{ nach: 2, wer: 'Mila (privat)', text: 'Gespeichert. Nicht antworten. Morgen zeigen wir das Herrn Kuedes.' }] },
    { id: 'erwachsen', t: 'Jemandem zeigen, dem du traust', symbol: '🧑‍🏫', setzt: ['beweis', 'erwachsen'], sys: 'Screenshot gemacht. Heute zu Hause zeigen. Morgen Herrn Kuedes.' },
    { id: 'blockieren', t: 'Blockieren', symbol: '⛔', setzt: 'blockiert', sys: 'Blockiert. Es ist still.', ende: true },
  ],
};

export const GESPRAECHE_N2 = {
  // Mathe zu zweit: Wer lässt wen mitdenken? Danach fragt Noah – erklären, nicht vorrechnen.
  n2_mathe: [
    ['lenning', 'Guten Morgen. Heute zu zweit. Einer rechnet, einer erklärt. Dann tauschen.'],
    ['lenning', '{name} und Mila. Ein Blatt, zwei Köpfe.'],
    ['mila', '(zieht das Blatt schon zu sich) Ich mach das schnell. Dauert drei Minuten.'],
    { wahl: [
      { t: '„Lass mich die erste rechnen. Du sagst, wenn ich hänge.“', staerke: 'klar', herz: { mila: 1 }, merke: 'milaPartner', dann: [
        ['mila', '(Pause) … Okay. Aber ich sag wirklich was.'],
        ['erzaehler', 'Sie sagt nichts. Sie zeigt nur mit dem Stift auf eine Stelle. Das reicht.'] ] },
      { t: '(Mila machen lassen.)', merke: 'milaAllein', dann: [
        ['erzaehler', 'Drei Minuten. Fertig. Du hast zugeschaut.'],
        ['lenning', '{name}, erklär mir Aufgabe zwei.'],
        ['erzaehler', 'Du schaust aufs Blatt. Die Zahlen sagen dir nichts.'],
        ['mila', '(leise) … Sorry. Hätte dich lassen sollen.'] ] },
      { t: '„Super, dann schreib ich ab.“', herz: { mila: -1 }, merke: 'milaAbgeschrieben', dann: [
        ['mila', 'Abschreiben ist kein Mathe. Das ist Kopieren.'],
        ['lenning', 'Mila hat recht. Und ich frage gleich {name}.'] ] },
    ] },
    { stunde: 'mathe' },
    ['erzaehler', 'Noah, am Tisch daneben, starrt auf seine letzte Aufgabe. Er radiert zum dritten Mal.'],
    ['noah', '(leise) Kannst du mir das erklären? Aber nicht so schnell.'],
    { wahl: [
      { t: 'Langsam erklären, Schritt für Schritt – mit einem Beispiel.', staerke: 'hilfe', herz: { noah: 2 }, merke: 'noahErklaert', dann: [
        ['noah', '… Ah. Und dann einfach dasselbe noch mal?'],
        ['erzaehler', 'Er rechnet. Allein. Diesmal radiert er nicht.'],
        ['lenning', 'Wer erklärt, lernt doppelt. Gut gemacht, ihr zwei.'] ] },
      { t: '(Schnell die Lösung hinschreiben.)', herz: { noah: 1 }, merke: 'noahVorgerechnet', dann: [
        ['noah', 'Danke. … Ich versteh’s trotzdem nicht.'],
        ['erzaehler', 'Morgen kommt die nächste Aufgabe. Dann sitzt er wieder da.'] ] },
      { t: '„Frag Mme Lenning. Ich bin selbst nicht sicher.“', staerke: 'ehrlich', merke: 'noahLenning', dann: [
        ['lenning', '(kommt) Gute Idee. Fragen ist nicht peinlich. Raten schon eher.'] ] },
    ] },
  ],
  n2_post: [
    ['erzaehler', 'Montag, 7:36. Das Handy vibriert, bevor du aus dem Bus bist.'],
    { szene: 'chat', id: 'top5', def: TOP5,
      ausgang: (r) => (r.flags.noahVerteidigt ? 'verteidigt' : r.flags.konter ? 'konter' : r.flags.noahPrivat ? 'privat' : r.flags.mitgelacht ? 'gelacht' : r.flags.witz ? 'witz' : 'still'),
      folgen: {
        verteidigt: { staerke: 'mut', herz: { noah: 3, ayla: 1, ben: 1, dario: -1 }, merke: 'noahVerteidigt' },
        konter: { staerke: 'mut', herz: { jo: 1, noah: 1, dario: -2 }, merke: ['campKonter', 'campFeind'] },
        privat: { staerke: 'zuhoeren', herz: { noah: 2 }, merke: 'noahPrivat' },
        gelacht: { herz: { noah: -3, mila: -2, luca: 1 }, merke: 'top5Gelacht' },
        witz: { staerke: 'humor', herz: { ben: 1 } },
        still: { merke: 'top5Still' },
      } },
    ['erzaehler', 'Auf dem Hof. Noah sitzt allein auf der Bank. Das Buch ist zu.'],
  ],
  n2_noah: [
    ['noah', 'Hey. Ich lese. Also … das Buch ist zu. Aber ich lese.'],
    { tu: 'n2_noahChat' },
    { wahl: [
      { t: '„Platz eins? Bisschen verdient.“ (grinsen)', herz: { noah: -2, ben: 1 }, dann: [['noah', '(lacht. Zu lang.) Haha. Ja.'], ['erzaehler', 'Er macht das Buch auf. Seite eins. Er liest nicht.']] },
      { t: '„Die Liste ist Müll. Wer macht so was?“', staerke: 'klar', herz: { noah: 1 }, dann: [
        ['noah', 'Jemand, der mich kennt. Das ist das Schlimme.'],
        ['noah', 'Ich bin seit einer Woche hier. Und schon „der Langweilige“.'] ] },
      { t: '(Hinsetzen. Nichts sagen. Neben ihm.)', staerke: 'warten', herz: { noah: 2 }, merke: 'noahBank', dann: [
        ['erzaehler', 'Eine Minute. Zwei. Eine Taube landet vor euch.'],
        ['noah', 'Mila würde die jetzt zählen.'], ['erzaehler', 'Noah schiebt dir sein halbes Brötchen rüber.'] ] },
      { t: '„Was machst du eigentlich gern?“', staerke: 'zuhoeren', herz: { noah: 2 }, merke: 'noahHobby', dann: [
        ['noah', 'Ich bau Sachen. Aus Bausteinen. Große Sachen.'],
        ['noah', 'Gerade den Kirchturm von Junglinster. Mit allem. Sag’s keinem.'], ['noah', 'Das klingt langweilig, oder?'],
        { wahl: [
          { t: '„Nein. Das klingt nach ziemlich viel Geduld.“', herz: { noah: 2 }, merke: 'noahTalent', dann: [['noah', '(überlegt) Geduld. So hat das noch keiner genannt.']] },
          { t: '„Ein bisschen. Aber ich würd ihn trotzdem gern sehen.“', staerke: 'humor', herz: { noah: 1 }, dann: [['noah', '(grinst zum ersten Mal heute) Okay. Irgendwann.']] },
        ] } ] },
      { t: '„Komm, wir gehen zu den anderen.“', staerke: 'einbeziehen', herz: { noah: 1, ben: 1 }, dann: [
        ['noah', 'Zu Ben?'], ['erzaehler', 'Ben winkt schon. Mit beiden Armen.'], ['ben', '(von weitem) Noah! Kommst du? Uns fehlt einer!'] ] },
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
  n2_mittagChat: [
    ['erzaehler', 'Montag, Mittag. Curry. Dein Handy brummt dreimal hintereinander.'],
    { szene: 'chat', id: 'projekt3', def: (m) => PROJEKT3(m),
      ausgang: (r) => (r.flags.noahGefragt ? 'gefragt' : r.flags.noahGeaddet ? 'geaddet' : r.flags.joGestoppt || r.flags.regel ? 'regel' : r.flags.stumm ? 'stumm' : 'dabei'),
      folgen: {
        gefragt: { staerke: 'einbeziehen', herz: { noah: 3, ben: 1 }, merke: ['noahZurueck', 'noahGefragt'] },
        geaddet: { herz: { noah: 1 }, merke: 'noahZurueck', dann: [['erzaehler', 'Noah ist wieder drin. Er schreibt nichts. Aber er ist drin.']] },
        regel: { staerke: 'klar', herz: { mila: 2, ayla: 1, jo: -1 }, merke: 'regelKeinRaten' },
        stumm: { merke: 'projektStumm' },
        dabei: { herz: { ben: 1 } },
      } },
  ],
  n2_mittag: [
    ['ben', '{name}. Setz dich. Mila hat was gesehen.'],
    ['mila', 'Schau mal zum Nachbartisch. Unauffällig.'],
    ['erzaehler', 'Dario, Kenan, Luca. Darios Handy liegt auf seinem Knie. Die Kamera zeigt nach oben.'],
    { wahl: [
      { t: '(Hinschauen. Nichts sagen. Merken.)', staerke: 'lesen', merke: 'darioTief', dann: [['mila', 'Du hast es auch gesehen. Gut. Kein Wort. Noch nicht.']] },
      { t: '„Leute, wir starren. Das ist auch komisch.“', staerke: 'klar', herz: { ayla: 1 }, dann: [['ayla', 'Stimmt. Wir machen gerade dasselbe wie der Account. Nur ohne Handy.'], ['erzaehler', 'Ben schaut sofort auf sein Curry.']] },
      { t: '„Dario, was fotografierst du?“ (laut)', staerke: 'mut', herz: { dario: -2, mila: -1 }, merke: 'darioLaut', dann: [
        ['dario', '(steckt das Handy weg) Mein Essen. Für meine Mutter.'], ['mila', '(leise) Jetzt weiß er, dass wir schauen.'] ] },
    ] },
    ['jo', 'Ich sag ja nur: Ich war’s nicht. Falls wer fragt.'],
    ['ben', 'Keiner hat gefragt, Jo.'],
    ['jo', 'Eben. Deshalb sag ich’s.'],
    // Jugendwelt heute: Likes als Zeugnis. Ayla will ihr Video nach sechs Likes löschen.
    ['erzaehler', 'Ayla scrollt. Dann dreht sie das Handy um. Bildschirm nach unten.'],
    ['ayla', 'Mein Bass-Video. Seit einer Stunde online. Sechs Likes.'],
    ['ayla', 'Ein Selfie aus der 6P1 hat 200. In zehn Minuten.'],
    ['ayla', 'Ich lösch es. Ist eh peinlich.'],
    { wahl: [
      { t: '„Sechs echte Leute fanden es gut. Das ist nicht nichts.“', staerke: 'lesen', herz: { ayla: 1 }, merke: 'aylaPostBleibt', dann: [['ayla', '… So hab ich das nie gezählt.'], ['erzaehler', 'Sie dreht das Handy wieder um.']] },
      { t: '(Liken. Kommentar: „Das Riff bei Sekunde 12 🔥“)', staerke: 'kontakt', herz: { ayla: 2 }, merke: 'aylaPostBleibt', dann: [['ayla', '(liest. Grinst.) Du hast es dir echt angehört?'], ['ayla', 'Okay. Es bleibt.']] },
      { t: '„Wenn du dich damit schlecht fühlst: Lösch es.“', staerke: 'zuhoeren', merke: 'aylaPostWeg', dann: [['ayla', '… Ja. Ist besser so.'], ['erzaehler', 'Gelöscht. Ayla isst weiter. Langsamer als vorher.']] },
    ] },
  ],
  // Donnerstag: Ben will zurückschlagen – mit einer Gegenliste. Gut gemeint. Aber auch eine Liste.
  n2_morgen: [
    ['erzaehler', 'Donnerstag, 8:02. Vor Saal 1.04 steht Ben mit dem Handy in der Hand. Er hat bis spät an etwas gebastelt.'],
    ['ben', 'Hört zu. Die schreiben „langweiligste Leute“. Wir machen eine Gegenliste. Top 5 Talente der 7P2.'],
    ['ben', 'Mit Fotos. Wir posten sie heute. Dann ist die andere Liste egal.'],
    ['jo', 'Ich will auf Platz eins.'],
    ['erzaehler', 'Hinter Ben steht Noah. Er sieht nicht aus, als wollte er auf irgendeine Liste.'],
  ],
  n2_ruhm: [
    ['hoffmann', 'Ich hab euch gehört. Bis auf den Gang.'],
    ['hoffmann', '{name}, du warst schon mal Thema auf so einer Liste. Was sagst du zu Bens Idee?'],
    { wahl: [
      { t: '„Gute Idee. Aber wir fragen jeden vorher.“', staerke: 'klar', herz: { ben: 1, noah: 1, hoffmann: 1 }, merke: 'gegenlisteFragen', dann: [
        ['ben', 'Fragen? … Okay. Fair.'],
        ['noah', '(leise) Dann sag ich Nein. Ist das okay?'],
        ['ben', 'Klar ist das okay. Wirklich.'] ] },
      { t: '„Ja! Wir posten sie heute noch.“', herz: { ben: 1, jo: 1, noah: -1 }, merke: 'gegenlistePost', dann: [
        ['noah', '(leise) Bitte ohne mich.'],
        ['ben', 'Aber du wärst bei uns ganz oben!'],
        ['noah', 'Ich will auf gar keiner Liste sein. Auf keiner.'],
        ['erzaehler', 'Ben lässt das Handy sinken.'] ] },
      { t: '„Noch eine Liste? Dann machen wir genau das Gleiche. Nur nett.“', staerke: 'lesen', herz: { ayla: 1, mila: 1 }, merke: 'gegenlisteNein', dann: [
        ['ayla', 'Stimmt eigentlich.'],
        ['ben', '(enttäuscht) Und was machen wir dann? Nichts?'] ] },
    ] },
    ['hoffmann', 'Hier postet keiner eine Liste. Keine gemeine und keine nette.'],
    ['hoffmann', 'Aber wenn ihr zeigen wollt, was ihr könnt: Die letzte halbe Stunde gehört euch. Wer will, zeigt was. Wer nicht will, schaut zu.'],
    { blende: 'Letzte halbe Stunde · Saal 1.04' },
    ['ben', 'Ich fang an. Ich kann mit den Ohren wackeln. Nur mit dem linken.'],
    { tu: 'n2_noahTalent' },
    ['hoffmann', '{name}? Was zeigst du?'],
    { wahl: [
      { t: 'Freiwürfe. (Rüber zum Korb im Hof.)', merke: 'ruhmKorb', dann: [{ tu: 'n2_ruhmKorb' }] },
      { t: 'Ein Beat mit Ayla. (Bandprobe, kurz.)', herz: { ayla: 1 }, merke: 'ruhmBand', dann: [{ tu: 'n2_ruhmBand' }] },
      { t: '„Ich kann gut zuhören.“ (Nichts vorführen.)', staerke: 'klar', merke: 'ruhmZuhoeren', dann: [
        ['hoffmann', 'Wie zeigt man das?'], ['du', 'Jo, erzähl was. Zehn Sekunden.'],
        ['jo', '… Mein Opa hat mir Autofahren gezeigt. Auf dem Feldweg. Ich war neun.'],
        ['du', 'Und deine Mutter weiß es bis heute nicht.'], ['jo', '(Pause) … Woher weißt du das?'], ['du', 'Du hast gerade leiser geredet.'] ] },
      { t: '„Ich zeig nichts.“', merke: 'ruhmNein', dann: [
        ['hoffmann', 'Darf man. Genau darum ging es.'] ] },
    ] },
    ['hoffmann', 'Danke. An alle. Auch an die, die nur zugeschaut haben.'],
    ['mila', '(leise zu dir) Keine Liste. Und trotzdem weiß jetzt jeder, wer was kann.'],
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
    ['dario', 'Hey. Ihr hattet heute so eine Talentshow? Hab gehört.'],
    ['dario', 'Guck mal, was ich hab. Lustig, oder?'],
    ['erzaehler', 'Er zeigt dir ein Foto. Noah am Tisch. Von links unten.'],
    ['dario', 'Ging diese Woche in drei Gruppen rum. Auch bei der 7P1.'],
    ['erzaehler', 'Stimmt das? Du kannst es nicht prüfen.'],
    { wahl: [
      { t: '„Wer hat dir das geschickt?“', staerke: 'mut', herz: { dario: -1 }, merke: 'darioGefragt', dann: [
        ['dario', 'Weiß nicht mehr. Ist doch egal.'], ['erzaehler', 'Kenan schaut zu Dario. Lange. Dario schaut aufs Handy.'] ] },
      { t: '„Lustig? Noah sitzt seitdem allein.“', staerke: 'klar', herz: { dario: -1, noah: 1 }, merke: 'darioKonfrontiert', dann: [
        ['dario', '(leiser) … Hab ich nicht gewusst.'], ['dario', 'Ich hab das nicht gepostet. Okay? Ehrlich nicht.'] ] },
      { t: '(Nichts sagen. Merken. Später Mila erzählen.)', staerke: 'lesen', merke: ['spurFoto', 'milaErzaehlen'], dann: [
        ['erzaehler', 'Du nickst. Dario grinst. Sein Daumen zittert ein bisschen.'] ] },
      { t: '„Haha. Schick mal.“', herz: { dario: 2, luca: 1, noah: -2 }, merke: 'fotoGeschickt', dann: [
        ['dario', 'Kommt.'], ['erzaehler', 'Jetzt ist es auf deinem Handy. Von links unten.'] ] },
    ] },
    { tu: 'n2_ende' },
  ],
};

// TUN für Kapitel 2 (in spiel.js eingehängt: tunN2)
export const tunN2 = (c) => ({
  n2_noahChat: () => (c.S.merke.noahVerteidigt ? [['noah', 'Du hast im Chat was geschrieben. Für mich. Ich hab’s zwölfmal gelesen.']]
    : c.S.merke.top5Gelacht ? [['noah', 'Du hast gelacht. Hab ich gesehen. Ist okay.'], ['erzaehler', 'Noah rückt ein Stück zur Seite. Nicht viel.']]
    : c.S.merke.noahPrivat ? [['noah', 'Danke für die Nachricht. Ich hab sie gelesen. Zweimal.']] : []),
  n2_karteFuerDich: () => {
    const m = c.S.merke;
    const t = m.top5Gelacht ? 'Du hast gelacht. Und bist trotzdem gekommen. Zählt auch.' : m.noahVerteidigt ? 'Du hast nicht gewartet, ob die anderen mitmachen.'
      : m.noahGefragt ? 'Du hast gefragt, ob ich zurück will. Statt einfach zu adden.' : m.noahHobby ? 'Du hast gefragt, was ich gern mache. Und zugehört.'
      : m.noahBank ? 'Du hast dich auf die Bank gesetzt. Neben mich. Einfach so.' : 'Du hast am Montag mit mir geredet. Das hat sonst keiner.';
    return [['erzaehler', 'Noah gibt dir eine Karte. Darauf steht:'], ['noah', '„' + t + '“']];
  },
  n2_tankMission: () => {
    const T = { koerper: 'Körper: was essen, Basket, raus', sicherheit: 'Sicherheit: ein ruhiger Ort, eine Person, der du traust', dazu: 'Dazugehören: Pause mit jemandem, Bandprobe', ernst: 'Ernst genommen: mit Herrn Kuedes reden', selbst: 'Selbst entscheiden: Spind, Spiegel, eigene Pause', spass: 'Spaß und Neues: Skaten, Tischtennis, Bücher' };
    const b = Object.keys(T).find((k) => c.S.merke['blinkt' + k.charAt(0).toUpperCase() + k.slice(1)]);
    if (!b) { c.ui.toast('<b>Mission: Warnlichter</b><span>Achte diese Woche: Welcher Tank meldet sich bei dir?</span>', 'ly-t-ent'); return; }
    c.S.mission = { kap: 2, tank: b, mal: 0 };
    c.ui.toast('<b>Mission: Tank auffüllen</b><span>' + T[b] + ' – dreimal, je zehn Minuten.</span>', 'ly-t-ent');
  },
  n2_noahTalent: () => (c.S.merke.noahTalent ? [['noah', '(steht auf) Ich … hab Fotos. Von meinem Kirchturm. Aus Bausteinen.'], ['erzaehler', 'Er zeigt sie auf dem Handy. Die Klasse beugt sich vor. Keiner lacht.'], ['ben', 'Noah. Das ist … krass.'], ['erzaehler', 'Noah wird rot. Diesmal die gute Art.']]
    // Ohne Vorbereitung: Noah traut sich nur, wenn man ihn ermutigt – ohne Druck. Druck macht zu.
    : [['erzaehler', 'Noah ist dran. Er guckt auf den Tisch. Sein Bein wippt.'], ['hoffmann', 'Noah? Du darfst auch passen.'],
      { wahl: [
        { t: '(leise) „Du kannst. Musst aber nicht.“', staerke: 'einbeziehen', herz: { noah: 2 }, merke: 'noahErmutigt', dann: [
          ['noah', '(atmet aus) … Okay. Klein.'], ['noah', 'Ich kann das Alphabet rückwärts. In sieben Sekunden.'],
          ['erzaehler', 'Er schafft es in sechs. Ben klatscht als Erster. Dann alle.'], ['noah', '(rot, aber grinst) Hab ich noch nie wem gezeigt.']] },
        { t: '„Los, Noah! Mach einfach! Alle warten!“', merke: 'noahGedraengt', dann: [
          ['erzaehler', 'Noah wird blass. Jetzt schauen wirklich alle.'], ['noah', '(sehr leise) … Ich pass.'], ['ben', '(zu dir, leise) Das war zu viel.']] },
        { t: '(Nichts sagen. Ist seine Sache.)', dann: [['noah', '(schüttelt den Kopf) Pass.'], ['hoffmann', 'Passen ist erlaubt. Danke, Noah.']] },
      ] }]),
  n2_ruhmKorb: async () => {
    const t = await c.ui.freiwurf(); c.S.merke.ruhmTreffer = t;
    return t >= 3 ? [['ben', t + ' von 5. Vor allen.'], ['jo', 'Okay. Respekt.']] : [['ben', t + ' von 5. Vor der ganzen Klasse. Das muss man erst mal machen.']];
  },
  n2_ruhmBand: async () => {
    const r = await c.ui.bandprobe(); const pz = Math.round(r.treffer / Math.max(1, r.gesamt) * 100);
    return pz >= 60 ? [['ayla', '(nach dem letzten Ton) Okay. Das machen wir noch mal. Mit Proben.']] : [['ayla', 'Nicht ganz im Takt. Aber du hast dich getraut. Vor allen.']];
  },
  n2_ende: () => [
    ['erzaehler', 'Abends. Kein #3. Nur eine Story von @annexe.cam:'], ['erzaehler', '„#3 kommt, wenn ihr es nicht erwartet. Sportfest, nächsten Freitag. 📷“'],
    ['erzaehler', '22:14. Eine Nachricht. Nicht im Klassenchat. Privat.'],
    { szene: 'chat', id: 'dmCam', def: DM_CAM,
      ausgang: (r) => (r.flags.erwachsen ? 'erwachsen' : r.flags.beweis ? 'beweis' : r.flags.blockiert ? 'blockiert' : r.flags.geantwortet ? 'geantwortet' : 'ignoriert'),
      folgen: {
        erwachsen: { staerke: ['hilfe', 'abstand'], herz: { kaya: 1 }, merke: ['dmBeweis', 'dmCam', 'dmErwachsen'], dann: [
          ['erzaehler', 'Du zeigst es noch am Abend jemandem, dem du traust.'],
          ['erzaehler', '„Das ist nicht okay. Und nicht deine Schuld. Morgen gehen wir zu Herrn Kuedes.“']] },
        beweis: { staerke: 'hilfe', herz: { mila: 1 }, merke: ['dmBeweis', 'dmCam'] },
        blockiert: { staerke: 'klar', merke: ['dmBlockiert', 'dmCam'] },
        geantwortet: { merke: ['dmGeantwortet', 'dmCam'], dann: [['erzaehler', 'Du liegst noch lange wach. Wer sieht mehr als du?']] },
        ignoriert: { merke: 'dmCam' },
      } },
    { tu: 'kapitelEnde' }],
});

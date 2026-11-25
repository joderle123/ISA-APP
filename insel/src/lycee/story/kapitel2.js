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

export const ORTE_N2 = { jugendhaus: { x: 13, z: 115, yaw: 0 } };

export const SCHRITTE_N2 = [
  { id: 'k2_morgen', kap: 2, tag: 'Montag', uhr: 7.42, titel: 'Was kannst du eigentlich?', ziel: 'Nebel an der Haltestelle. Dario sitzt schon da.', marker: 'dario',
    start: { teleport: 'busAnkunft' },
    leute: { dario: [-21.5, 41.6, -1.6, 'sitzt'], lina: [-25.6, 44.4, 0.8], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n2_dario' } },
  // Fachstunde nur, wenn eingeschaltet (sonst freiwillig: 🎟 → Stunden)
  { id: 'k2_mathe', kap: 2, tag: 'Montag', uhr: 8.6, neben: 'fach', titel: 'Mathe', ziel: 'Saal 1.04. Mathe bei Mme Lenning – heute zu zweit.', marker: 'lenning',
    start: { teleport: 'saal104Tuer' },
    leute: { lenning: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'lenning', gespraech: 'n2_mathe' } },
  { id: 'k2_tanks', kap: 2, tag: 'Montag', uhr: 9.9, neben: 'skills', titel: 'Skills: Das Glas der Bedürfnisse', ziel: 'Skills-Stunde in der Aula. Herr Kuedes hat sechs Tanks gemalt.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n2_tanks' } },
  { id: 'k2_liste', kap: 2, tag: 'Dienstag', uhr: 10.03, titel: 'Top 5', ziel: 'Pause. Ben und Jo stehen am Hof.', marker: 'ben',
    start: { teleport: 'eingangHof' },
    leute: { ben: [4, 14, 0.6, 'redet'], jo: [5.2, 15.4, -2.4, 'redet'], ayla: [3, 17.6, -2.5, 'redet'], chiara: [2, 18.4, 0.6, 'redet'], noah: [9.6, 13.2, -1.2], yusuf: [10.6, 15.6, -2.2], mila: [-20, 11.6, Math.PI, 'sitzt'] },
    fertig: { reden: 'ben', gespraech: 'n2_liste' } },
  { id: 'k2_kantine', kap: 2, tag: 'Dienstag', uhr: 12.17, titel: 'Die Gegenliste', ziel: 'Kantine. Noahs Platz ist leer. Ben hat einen Plan.', marker: 'ben',
    start: { teleport: 'kantineTuer' },
    leute: { ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], mila: [18.15, -11.1, -Math.PI / 2, 'sitzt'], kremer: [26.8, -9, -Math.PI / 2] },
    fertig: { reden: 'ben', gespraech: 'n2_kantine' } },
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
  { id: 'k2_freitag', kap: 2, tag: 'Freitag', uhr: 15.83, titel: 'Freitag', ziel: 'Wochenende. Warte auf den Bus.', marker: 'bus',
    start: { teleport: 'eingang' },
    leute: { fahrer: [-11.2, 44.6, -Math.PI / 2], lina: [-25.6, 44.4, 0.8] },
    fertig: { ort: 'bus', r: 3.2, gespraech: 'n2_freitag' } },
];

// ---------- Dienstag 10:02: die Liste (Darios Account: klein geschrieben, ein Emoji, „haha“) ----------
const LISTE = {
  titel: '@annexe.cam · Story', mitglieder: 0, dauer: 16,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Dreißig Handys summen fast gleichzeitig.' },
    { nach: 1.4, wer: '@annexe.cam', bild: 'top 5 langweiligste leute annexe 😴', text: '1 noah – baut türmchen mit 13 haha · 2 yusuf · 3 lina · 4 die taube aus der kantine · 5 alle lehrer', lacher: { start: 4, proSek: 0.5 } },
    { nach: 5.5, wer: 'Jo', text: 'die taube 😂😂' },
    { nach: 7.5, wer: 'Ben', text: 'platz 5 ist das beste' },
    { nach: 10, system: true, text: 'gesehen von 23' },
  ],
  aktionen: [{ id: 'weg', t: 'Handy weg', symbol: '📱', setzt: 'weg', sys: 'Handy in der Tasche.', ende: true }],
};
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

export const GESPRAECHE_N2 = {
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
    ['erzaehler', 'Fünf Meter weiter steht Noah. Er liest seinen Namen.'],
    ['erzaehler', 'Er lächelt. Es ist kein Lächeln.'],
    { warum: true, fest: true, wahl: [
      { t: '(Zu Noah gehen.) „Komm, wir gehen rein.“', staerke: 'einbeziehen', herz: { noah: 2 }, merke: 'listeBeiNoah', dann: [
        ['noah', 'Platz eins. Wenigstens gewonnen.'], ['erzaehler', 'Er kommt mit. Hinter euch lacht Jo noch.']] },
      { t: '(Bei den Lachenden stehen bleiben.)', herz: { ben: 1, jo: 1, noah: -2 }, merke: 'listeGelacht', dann: [
        ['ben', '(lacht) Die Taube. Ich kann nicht mehr.'], ['erzaehler', 'Als du hochschaust, ist Noah weg.']] },
      { t: '(So tun, als hättest du nichts gesehen.)', herz: { noah: -1 }, merke: 'listeWeggeschaut', dann: [
        ['erzaehler', 'Du schaust aufs Handy. Als du wieder hochschaust, geht Noah rein. Allein.']] },
    ] },
  ],
  // Dienstag 12:10 (Fable, Schlüsselszene K2): Bens Gegenliste (Entscheidung B)
  n2_kantine: [
    ['erzaehler', 'Dienstag. 12:10. Noahs Platz ist leer.'],
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
    ['erzaehler', 'In deiner Jackentasche ist etwas, das vorher nicht da war. Ein gefaltetes Blatt.'],
    ['erzaehler', 'Eine Bleistiftzeichnung. Du, in der großen Pause. Erster Tag. Von oben, von der Treppe aus.'],
    ['erzaehler', 'Am Bildrand eine Hand. Ein Handy. Ein geflochtenes Armband.'],
    ['erzaehler', 'Kein Name.'],
    { tu: 'n2_zeichnung' },
    { tu: 'kapitelEnde' },
  ],
};

// TUN für Kapitel 2 (in spiel.js eingehängt: tunN2)
export const tunN2 = (c) => ({
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

// Storyline 7e „@annexe.cam“ (nach der Storyline von Fable) – Kapitel 6 „Die Sprachnachricht“, Januar, eine Woche später.
// Verdecktes Thema: Kommunikation und Grenzen (Ich-Botschaften, Stopp sagen, Einverständnis bei Fotos und Berührung).
// „War nur ein Witz“ und „Ist nur ein Video“ sind derselbe Satz. Ein Nein gilt, auch wenn jemand weiterfilmt.
// Auch Helfen hat eine Grenze: Man fragt, bevor man jemanden anfasst. Und man kann höflich abstimmen und trotzdem
// jemanden rauswerfen. Ende: Die Abstimmung geht immer gegen dich (zwischen 15:4 und 9:9). „Chiara hat {name} entfernt.“
import { S6_SAGEN, S6_WUT_FAMILIE } from './skills-j1.js';
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
// Stuhlkreis vorne in der Aula (Mitte −14.5 | −63.4), Lücke im Süden für den Spieler
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, luca: { id: 'luca', name: 'Luca', farbe: '#7a6fb0' }, rantini: { id: 'rantini', name: 'Mme Rantini', farbe: '#6b7a8f' } };

export const SCHRITTE_N6 = [
  { id: 'k6_morgen', kap: 6, tag: 'Montag', uhr: 7.42, titel: 'Sieben Sekunden', ziel: 'Dario hat Kopfhörer in der Hand.', marker: 'dario',
    start: { teleport: 'busAnkunft' },
    leute: { dario: [-21.5, 41.6, -1.6, 'sitzt'], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n6_dario' } },
  { id: 'k6_skills', kap: 6, tag: 'Montag', uhr: 9.9, neben: 'skills', titel: 'Skills: Wie sag ich’s?', ziel: 'Aula. Herr Kuedes hat ein Ladekabel in der Hand.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], mesenberg: [-13.54, -65.16, -0.50], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n6_skills' } },
  { id: 'k6_jo', kap: 6, tag: 'Montag', uhr: 10.0, titel: 'Jo', ziel: 'Jo wirft allein Körbe.', marker: 'jo',
    start: { teleport: 'eingangHof' },
    leute: { jo: [29, 14.5, Math.PI] },
    fertig: { reden: 'jo', gespraech: 'n6_jo' } },
  { id: 'k6_beweis', kap: 6, tag: 'Dienstag', uhr: 12.17, titel: 'Fakten', ziel: 'Kantine. Mila hat ihr Handy in der Hand. Sie will etwas posten.', marker: 'mila',
    start: { teleport: 'kantineTuer' },
    leute: { mila: [10.75, -10.1, Math.PI / 2, 'sitzt'], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], kremer: [26.8, -9, -Math.PI / 2] },
    fertig: { reden: 'mila', gespraech: 'n6_beweis' } },
  { id: 'k6_hof', kap: 6, tag: 'Mittwoch', uhr: 13.33, titel: 'Nein', ziel: 'Hof. Luca hält sein Handy hoch. Mila steht vor ihm.', marker: 'mila',
    start: { teleport: 'eingangHof' },
    leute: { mila: [1.2, 18.2, -0.9], luca: [3.2, 19.6, 2.3, 'handy'], kenan: [4.4, 17.0, -1.7] },
    fertig: { reden: 'mila', gespraech: 'n6_luca' } },
  { id: 'k6_rede', kap: 6, tag: 'Donnerstag', uhr: 8.0, titel: 'Meine Tür ist offen', ziel: 'Saal 1.04. Mme Tidderich will mit der Klasse reden.', marker: 'hoffmann',
    start: { teleport: 'saal104Tuer' },
    leute: { hoffmann: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'hoffmann', gespraech: 'n6_rede' } },
  { id: 'k6_ende', kap: 6, tag: 'Freitag', uhr: 10.0, neben: 'skills', titel: 'Skills: Okay.', ziel: 'Letzte Skills-Stunde der Woche. Aula.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n6_ende' } },
  { id: 'k6_abstimmung', kap: 6, tag: 'Freitag', uhr: 12.0, titel: 'Abstimmung', ziel: 'Mittagspause. Noah sitzt auf der Bank am Hof.', marker: 'noah',
    start: { teleport: 'eingangHof' },
    leute: { noah: [-20, 11.6, Math.PI, 'sitzt'] },
    fertig: { reden: 'noah', gespraech: 'n6_abstimmung' } },
];

// ---------- Ich-Botschaft bauen (E21) ----------
const ICH = {
  wo: 'Aula · Nur im Kopf', titel: '🧩 Was würdest du Jo sagen?', altTitel: 'Situation',
  alt: 'Jo hat eine Sprachnachricht über dich gemacht. Zum Lachen. In einer fremden Gruppe.',
  regeln: [['ich', 'Ich statt Du'], ['gefuehl', 'Gefühl gesagt'], ['grund', 'Grund gesagt'], ['wunsch', 'klarer Wunsch']],
  teile: [
    [{ t: 'Als ich die Sprachnachricht gehört hab,', regeln: { ich: true } }, { t: 'Du machst immer Witze über mich,', regeln: { ich: false } }, { t: 'Du Verräter,', regeln: { ich: false, gefuehl: false } }],
    [{ t: 'war ich echt verletzt,', regeln: { gefuehl: true } }, { t: 'hast du mich voll blamiert,', regeln: { ich: false, gefuehl: false } }, { t: 'war mir das egal,', regeln: { gefuehl: false } }],
    [{ t: 'weil ich dachte, wir sind Freunde.', regeln: { grund: true } }, { t: 'weil du halt so bist.', regeln: { grund: false, ich: false } }, { t: 'weil das alle sagen.', regeln: { grund: false } }],
    [{ t: 'Sag mir, was da los war.', regeln: { wunsch: true } }, { t: 'Lösch dich einfach.', regeln: { wunsch: false } }, { t: 'Mach doch, was du willst.', regeln: { wunsch: false } }],
  ],
};

// ---------- Montag: Jo. Wie du fragst, entscheidet, was du hörst. (Nachfragen statt ausfragen) ----------
const JO_FRAGEN = {
  wo: 'Hof · Korbfeld', wer: F.jo, start: '(wirft. Daneben.) Was willst du?',
  runden: [
    { fragen: [
      { t: 'Du hast den Fake gemacht!', art: 'zu', offen: -1, antwort: 'Es war ein WITZ. Ich hab nichts gebaut.' },
      { t: 'Ich hab deine Sprachnachricht gehört. Was war das?', art: 'offen', offen: 2, antwort: '(Lange Pause. Der Ball rollt weg.) … Das war in der Ecke-Gruppe.' },
      { t: 'Warum machst du so was?', art: 'zu', offen: 0, antwort: 'Keine Ahnung! Es war halt lustig. Da.' },
    ] },
    { fragen: (o) => (o >= 2 ? [
      { t: 'Was ist da passiert?', art: 'nachhaken', offen: 2, antwort: 'Vierzig Leute. Die Älteren. Ich wollte, dass die lachen. Die haben gelacht.' },
      { t: 'Wer war alles in der Gruppe?', art: 'nachhaken', offen: 1, antwort: 'Die von der Ecke. Luca. Kenan. Dario. Ein paar aus der 6.' },
    ] : [
      { t: 'Okay. Und was war mit der Sprachnachricht?', art: 'offen', offen: 2, antwort: '(seufzt) Ecke-Gruppe. Vierzig Leute. Ich wollte, dass die Älteren lachen.' },
      { t: 'Lüg nicht.', art: 'zu', offen: -1, antwort: 'Ich lüg nicht! Ich hab nichts GEBAUT!' },
    ]) },
    { fragen: (o) => (o >= 3 ? [
      { t: 'Und dann?', art: 'nachhaken', offen: 2, antwort: 'Zwei Tage später gab es den Screenshot. … Ich dachte, das macht keiner wirklich.' },
      { t: 'Hast du gewusst, wer ihn baut?', art: 'nachhaken', offen: 1, antwort: 'Nein. Ich schwör. Ich dachte, das macht keiner wirklich.' },
    ] : [
      { t: 'Und dann?', art: 'nachhaken', offen: 1, antwort: 'Dann kam der Screenshot. Nicht von mir.' },
      { t: 'Du bist echt das Letzte.', art: 'zu', offen: -1, antwort: '(dreht sich weg)' },
    ]) },
    { fragen: [
      { t: 'Ich war zwei Wochen allein damit.', art: 'ueber-mich', offen: 2, antwort: '(Er wird still. Er sagt lange nichts.)' },
      { t: 'Weißt du, was du kaputt gemacht hast?', art: 'zu', offen: -1, antwort: 'Ja! Okay? Ja.' },
      { t: 'Egal jetzt.', art: 'zu', offen: 0, antwort: 'Okay.' },
    ] },
  ],
  stufen: ['Jo macht dicht.', 'Jo sagt ein bisschen.', 'Jo erzählt.', 'Jo erzählt.', 'Jo erzählt alles.', 'Jo erzählt alles. Und er hört dir zu.', 'Jo erzählt alles. Und er hört dir zu.', 'Jo erzählt alles. Und er hört dir zu.', 'Jo erzählt alles. Und er hört dir zu.'],
};

// ---------- Dienstag: Mila stellt ihre Prüfung in den Chat (Entscheidung A) ----------
const BEWEIS = (m) => ({
  titel: '7P2', mitglieder: 21, dauer: 24,
  nachrichten: [
    { nach: 0.5, wer: 'Mila', bild: 'Drei Bilder: die Handy-Kiste mit Schloss. Der graue Kreis im Screenshot. Das Wort „lowkey“, rot umkreist.', text: 'Fakten. Keine Meinung.' },
    { nach: 3, system: true, text: 'gesehen von 20' },
    { nach: 7, wer: 'tom_7p2', text: 'mila = anwältin von hinten links 😂' },
    { nach: 10, wer: 'Ayla', text: 'danke mila.' },
    { nach: 14, system: true, text: 'Sonst nichts.' },
  ],
  aktionen: [
    ...(m.k6Datei ? [{ id: 'datei', t: 'Jos Sprachnachricht in den Chat stellen', symbol: '🎤', setzt: 'datei', sys: '🎤 Sprachnachricht · 0:07',
      folgen: [{ nach: 0.8, wer: 'sami.lu', text: 'JO???' }, { nach: 1.4, wer: 'tom_7p2', text: 'krass' }, { nach: 1.9, wer: 'Chiara', text: 'also war es jo' }, { nach: 2.5, wer: 'unbekannt_09', text: 'oder beide' },
        { nach: 3.1, wer: 'sami.lu', text: 'vllt haben die zwei es zusammen gemacht' }, { nach: 3.8, system: true, text: '+ 54 neue Nachrichten' }], ende: true }] : []),
    { id: 'jo', t: 'Jo privat: „Schreib es selbst. In den Chat.“', symbol: '✍️', setzt: 'joSelbst', ich: 'schreib es selbst. in den chat.',
      folgen: [{ nach: 4, wer: 'Jo', text: 'leute das mit dem screenshot war evtl fake. ka.' }, { nach: 6, system: true, text: 'gesehen von 20' }] },
    { id: 'mila', t: 'Nur Mila sagen, was Jo gesagt hat', symbol: '🤫', setzt: 'nurMila', sys: 'Privat an Mila.', folgen: [{ nach: 2.5, wer: 'Mila (privat)', text: 'Okay. Ich prüf das. Nicht im Chat.' }] },
    { id: 'kuedes', t: '(Damit zu Herrn Kuedes gehen.)', symbol: '🚪', setzt: 'kuedes', sys: 'Du steckst das Handy ein.', ende: true },
  ],
});

// ---------- Mittwoch 13:20: Luca filmt Mila (Mut-Balken, Entscheidung B) ----------
const MUT_LUCA = {
  wo: 'Hof · 13:20', titel: 'Hinschauen',
  situation: 'Luca filmt. Mila hat Nein gesagt. Der Stein liegt vor Kenans Schuh.',
  dauer: 5,
  stufen: [
    { ab: 0, optionen: [{ key: 'weg', t: '(Wegschauen. Nichts tun.)' }] },
    { ab: 0.3, optionen: [{ key: 'rantini', t: '(Mme Rantini holen.)' }, { key: 'kenan', t: '„Kenan. Sag du was.“' }] },
    { ab: 0.6, optionen: [{ key: 'arm', t: '(Mila am Arm wegziehen.)' }, { key: 'komm', t: '„Komm?“ (Ihr die Hand hinhalten.)' }] },
    { ab: 0.9, optionen: [{ key: 'stopp', t: '„Stopp. Sie hat Nein gesagt.“' }, { key: 'linse', t: '(Dich vor die Linse stellen.)' }] },
  ],
};

// ---------- Freitag 12:00: Chiaras Abstimmung ----------
// Wer für dich stimmt, hängt an dem, was du vorher getan hast. Das Ergebnis geht immer gegen dich: zwischen 15:4 und 9:9.
const stimmen = (m) => {
  const wer = {
    noah: !!(m.listeBeiNoah || m.k4NoahVerteidigt || m.manonListeFalsch || m.wahlNoah),
    mila: !!(m.milaGesagt || m.k6Stopp || m.k6Komm || m.k6Linse),
    ben: !!(m.k5BenGefragt || m.gegenlisteNein || m.gegenlisteFragen),
    jo: !!((m.k6JoSelbst || m.k6JoVerstanden) && !m.k6DateiGepostet),
    lina: !!(m.wahlLina || m.linaNachgegangen),
    yusuf: !!(m.wahlYusuf || m.k3YusufGeschickt || m.k3Uhr),
  };
  let anon = 2 + (m.k4Ruhig ? 1 : 0) + (m.k5ChiaraGefragt ? 1 : 0) - (m.k4Wut || m.k4WutSpaet ? 1 : 0) - (m.k5Laut ? 1 : 0);
  anon = Math.max(0, anon);
  const s = Math.max(4, Math.min(9, Object.values(wer).filter(Boolean).length + anon + (m.k6Plus || 0)));
  return { wer, s, gegen: s >= 9 ? 9 : 19 - s };
};
const ABSTIMMUNG = (m) => {
  const { wer } = stimmen(m);
  const satz = m.k5SatzManche ? 'Manche glauben es. Nicht alle.' : m.k5SatzMittwoch ? 'Heute ist Freitag. Mehr weiß ich nicht.' : 'Ich weiß, was ich gemacht hab. Und was nicht.';
  const n = [
    { nach: 0.4, wer: 'Chiara', text: 'abstimmung. soll {name} in der gruppe bleiben, bis es geklärt ist?' },
    { nach: 1.6, system: true, text: '🗳️ ja = bleiben · nein = raus' },
    { nach: 2.8, wer: 'Chiara', text: 'ich will nur, dass es fair ist.' },
    { nach: 4.2, wer: 'Jo', text: wer.jo ? 'ja' : 'nein' },
    { nach: 5.6, wer: 'Ayla', text: 'ich stimm nicht über leute ab.' },
    { nach: 6.4, system: true, text: 'Ayla hat die Gruppe verlassen.' },
    { nach: 7.8, wer: 'Ben', text: wer.ben ? 'ja' : 'nein' },
    { nach: 8.8, wer: 'tom_7p2', text: 'nein' },
    { nach: 9.8, wer: 'sami.lu', text: 'nein' },
  ];
  let t = 11;
  if (wer.noah) { n.push({ nach: t, wer: 'Noah', text: 'ja' }); t += 1.2; }
  if (wer.mila) { n.push({ nach: t, wer: 'Mila', text: 'ja. fakten siehe oben.' }); t += 1.2; }
  n.push({ nach: t, wer: 'unbekannt_09', text: 'nein' }); t += 1;
  if (wer.lina) { n.push({ nach: t, wer: 'Lina', text: 'ja' }); t += 1.2; }
  if (wer.yusuf) { n.push({ nach: t, wer: 'Yusuf', text: 'ja' }); t += 1.2; }
  n.push({ nach: t, wer: 'unbekannt_11', text: 'nein' }, { nach: t + 1, wer: 'unbekannt_04', text: 'nein' }, { nach: t + 2.4, system: true, text: 'gesehen von 20' });
  return {
    titel: '7P2', mitglieder: 21, dauer: t + 10, nachrichten: n,
    aktionen: [
      { id: 'ruhig', t: '„' + satz + '“', symbol: '✍️', setzt: 'ruhig', ich: satz, folgen: [{ nach: 2.2, wer: 'unbekannt_12', text: 'ja' }] },
      { id: 'fakten', t: '„Mila hat es geprüft. Der Screenshot ist gebaut.“', symbol: '📎', setzt: 'fakten', ich: 'mila hat es geprüft. der screenshot ist gebaut.',
        folgen: (m.spurGebaut || m.spurKreis) ? [{ nach: 2.6, wer: 'unbekannt_14', text: 'ok. ja.' }] : [{ nach: 2, wer: 'tom_7p2', text: 'klar. die anwältin 😂' }] },
      { id: 'wut', t: '„Ihr seid alle so feige.“', symbol: '😡', setzt: 'wut', ich: 'ihr seid alle so feige.', folgen: [{ nach: 1.4, wer: 'unbekannt_12', text: 'ok dann nein' }, { nach: 2.4, wer: 'unbekannt_14', text: 'nein' }] },
      { id: 'verlassen', t: '(Selbst gehen. Wie Ayla.)', symbol: '🚪', setzt: 'verlassen', sys: '{name} hat die Gruppe verlassen.', ende: true },
    ],
  };
};
const ERGEBNIS = (m) => {
  const { s, gegen } = stimmen(m);
  const n = m.k6SelbstRaus ? [{ nach: 0.4, system: true, text: 'Später. Ben schickt dir ein Bild. Der Schluss der Abstimmung.' }] : [];
  if (s >= 9) n.push({ nach: 1.2, wer: 'Chiara', text: '9 zu 9.' }, { nach: 2.6, wer: 'Chiara', text: 'ich bin admin. dann entscheide ich. nur vorübergehend. sorry.' });
  else n.push({ nach: 1.2, wer: 'Chiara', text: gegen + ' zu ' + s + '. sorry. es ist die mehrheit.' });
  if (!m.k6SelbstRaus) n.push({ nach: 4.2, system: true, text: 'Chiara hat {name} entfernt.' });
  return { titel: '7P2', mitglieder: 20, dauer: 7, nachrichten: n, aktionen: [] };
};

export const GESPRAECHE_N6 = {
  n6_dario: [
    ['erzaehler', 'Montag. Dario hält dir einen Ohrstöpsel hin.'],
    ['dario', 'Die ging im Dezember in einer Gruppe rum.'],
    ['erzaehler', 'Er drückt auf Play.'],
    ['jo', '(Sprachnachricht) Was, wenn’s Hinten links ist? Man bräuchte nur einen Screenshot. Haha.'],
    ['erzaehler', 'Hinten lachen ältere Stimmen. Sieben Sekunden. Dann ist es still.'],
    { wahl: [
      { t: '„Woher hast du die?“', dann: [['dario', 'Ecke-Gruppe. Da sind alle drin.']] },
      { t: '„Warum zeigst du mir das?“', dann: [['dario', 'Weil du es nicht warst.'], ['erzaehler', 'Er sagt es, als wüsste er es genau.']] },
    ] },
    { wahl: [
      { t: '„Schick sie mir. Bitte.“', merke: 'k6Gedraengt', dann: [
        ['dario', 'Dann weiß man, von wem du sie hast.'],
        { wahl: [
          { t: '„Ich brauch sie. Bitte.“', herz: { dario: -1 }, merke: 'k6Datei', dann: [['erzaehler', 'Er schaut lange auf sein Display. Dann summt dein Handy. Eine Datei. 0:07.'], ['dario', 'Sag nicht, von wem.']] },
          { t: '„Okay. Dann nicht.“', herz: { dario: 2 }, merke: 'k6DarioGeschuetzt', dann: [['dario', '(nickt) Danke.']] },
        ] } ] },
      { t: '(Nicht drängen.)', staerke: 'warten', herz: { dario: 2 }, merke: 'k6DarioGeschuetzt', dann: [['erzaehler', 'Dario steckt die Kopfhörer ein. Er schaut dich kurz an. Dann weg.']] },
    ] },
  ],
  n6_jo: [
    { szene: 'nachhaken', id: 'joFragen', def: JO_FRAGEN,
      ausgang: (r, m) => { if (r.arten && r.arten['ueber-mich']) m.k6JoGesagt = true; return r.offen >= 5 ? 'verstanden' : r.offen >= 2 ? 'gehoert' : 'zu'; },
      folgen: {
        verstanden: { staerke: 'zuhoeren', herz: { jo: 2 }, merke: ['k6JoVerstanden', 'spurEckeJo'] },
        gehoert: { herz: { jo: 1 }, merke: ['k6JoGehoert', 'spurEckeJo'] },
        zu: { herz: { jo: -1 }, merke: 'k6JoZu' },
      } },
    { tu: 'n6_joFolge' },
  ],
  n6_beweis: [
    ['mila', 'Ich stell es rein. Jetzt.'],
    ['erzaehler', 'Sie tippt. Ihr Daumen ist sehr ruhig.'],
    { szene: 'chat', id: 'beweis6', def: (m) => BEWEIS(m),
      ausgang: (r) => (r.flags.datei ? 'datei' : r.flags.joSelbst ? 'jo' : r.flags.kuedes ? 'kuedes' : r.flags.nurMila ? 'mila' : 'nichts'),
      folgen: {
        datei: { herz: { jo: -3 }, merke: 'k6DateiGepostet', dann: [
          ['erzaehler', 'Sechzig Nachrichten in zwei Minuten. Alle über Jo.'],
          ['erzaehler', 'Am anderen Tisch bleibt sein Tablett stehen. Jo ist weg.'],
          ['erzaehler', 'Dein Name ist halb sauber. Unter allem steht: „vllt haben die zwei es zusammen gemacht“.'] ] },
        jo: { herz: { jo: 2 }, merke: 'k6JoSelbst', dann: [['erzaehler', 'Ein Satz. Schwach. Aber seiner.'], ['erzaehler', 'Am anderen Tisch schaut Jo nicht hoch. Er isst weiter. Langsam.']] },
        kuedes: { staerke: 'hilfe', herz: { kaya: 1 }, merke: 'k6KuedesDatei', dann: [['kaya', '(später, in seinem Büro) Ich red mit Jo. Heute noch.'], ['kaya', 'Und bevor ich etwas mache, sag ich es dir.']] },
        mila: { herz: { mila: 1 }, merke: 'k6NurMila', dann: [['erzaehler', 'Mila nickt dir über den Tisch zu. Einmal.']] },
        nichts: { merke: 'k6BeweisStill' },
      } },
  ],
  // Mittwoch 13:20 (Fable, Schlüsselszene K6): Kenans Satz fällt nur, wenn vorher jemand etwas gesagt oder getan hat.
  n6_luca: [
    ['erzaehler', 'Mittwoch. 13:20. Der Hof ist fast leer.'],
    ['erzaehler', 'Luca hält sein Handy hoch. Die Linse zeigt auf Mila.'],
    ['luca', 'Sag’s noch mal. Dass der Screenshot fake ist.'],
    ['mila', 'Hör auf zu filmen.'],
    ['luca', 'Wieso? Ist doch nur ein Video.'],
    ['mila', 'Ich hab Nein gesagt.'],
    ['erzaehler', 'Sie hält die Hand vors Gesicht. Der Würfel fällt.'],
    ['erzaehler', 'Ein Stein springt heraus. Er rollt bis vor Kenans Schuh.'],
    ['luca', 'Lowkey lustig, wenn sie sauer ist.'],
    ['erzaehler', 'Kenan schaut auf den Stein. Nicht auf Luca.'],
    { szene: 'mut', id: 'mutLuca', def: MUT_LUCA, ausgang: (r) => r.key,
      folgen: {
        stopp: { staerke: 'klar', herz: { mila: 2, kenan: 1 }, merke: ['k6Stopp', 'k6Eingegriffen'], dann: [['du', 'Stopp. Sie hat Nein gesagt.'], ['luca', 'Guck an. Hinten links kann reden.']] },
        linse: { staerke: 'mut', herz: { mila: 2, kenan: 1 }, merke: ['k6Linse', 'k6Eingegriffen'], dann: [['erzaehler', 'Du stellst dich vor die Linse. Auf Lucas Display bist jetzt nur noch du.'], ['luca', 'Geh weg da.']] },
        kenan: { staerke: 'einbeziehen', herz: { kenan: 2 }, merke: ['k6Kenan', 'k6Eingegriffen'], dann: [['du', 'Kenan. Sag du was.']] },
        rantini: { staerke: 'hilfe', merke: ['k6Rantini', 'k6Eingegriffen'], dann: [['erzaehler', 'Du rennst zum Eingang. Mme Rantini kommt sofort mit.'], ['rantini', 'Luca. Handy weg. Jetzt.']] },
        komm: { staerke: 'lesen', herz: { mila: 3 }, merke: ['k6Komm', 'k6Eingegriffen'], dann: [['du', 'Komm?'], ['erzaehler', 'Du hältst ihr die Hand hin. Du fasst sie nicht an.'], ['erzaehler', 'Mila schaut auf die Hand. Dann geht sie mit. Neben dir.']] },
        arm: { herz: { mila: -1 }, merke: ['k6Arm', 'k6Eingegriffen'], dann: [['erzaehler', 'Du ziehst Mila am Arm weg. Sie zuckt zusammen.'], ['mila', '(leise) Nicht anfassen.'], ['erzaehler', 'Sie kommt trotzdem mit. Steif.']] },
        weg: { merke: 'k6Weggeschaut', dann: [['erzaehler', 'Du schaust auf dein Handy. Es ist nichts drauf. Du schaust trotzdem.']] },
      } },
    { tu: 'n6_kenan' },
    ['luca', 'Entspann dich. Ich lösch’s ja.'],
    ['erzaehler', 'Er steckt das Handy ein. Er löscht nichts.'],
    { tu: 'n6_video' },
    ['erzaehler', 'Kenan hebt den Stein auf. Er legt ihn auf die Mauer.'],
    ['mila', 'Ich hab Nein gesagt. Laut. Oder?'],
    { wahl: [
      { t: '„Ja. Laut.“', herz: { mila: 1 }, dann: [] },
      { t: '„Alle haben es gehört.“', herz: { mila: 1 }, dann: [] },
      { t: '(Ihr den Stein geben.)', staerke: 'lesen', herz: { mila: 2 }, merke: 'k6Stein', dann: [] },
    ] },
    { tu: 'n6_stein' },
  ],
  n6_rede: [
    ['erzaehler', 'Donnerstag. 8:00. Mme Tidderich macht die Tür zu. Sie bleibt davor stehen.'],
    { tu: 'n6_tidderich' },
    ['chiara', '(in der Pause, laut) Ich mach das jetzt ordentlich. Mit Abstimmung. Dann ist es fair.'],
    { warum: true, wahl: [
      { t: '„Über Menschen abstimmen ist nicht fair.“', staerke: 'klar', merke: 'k6ChiaraWiderspruch', dann: [['chiara', 'Mehrheit ist fair. So geht Demokratie.'], ['erzaehler', 'Sie sagt es freundlich. Das macht es schlimmer.']] },
      { t: '(Nichts sagen. Sonst bist du die nächste Abstimmung.)', dann: [['erzaehler', 'Chiara schreibt etwas in ihr Handy. Mit Lineal-Gesicht.']] },
    ] },
  ],
  // Freitag 12:00: Die Stimmen laufen ein. Jede Nachricht kann eine Stimme kippen oder kosten.
  n6_abstimmung: [
    ['noah', '(schaut auf sein Display) Oh nein.'],
    ['erzaehler', 'Freitag. 12:00. Alle Handys summen gleichzeitig.'],
    { szene: 'chat', id: 'abstimmung', def: (m) => ABSTIMMUNG(m),
      ausgang: (r, m) => {
        m.k6Plus = (r.flags.ruhig ? 1 : 0) + (r.flags.fakten && (m.spurGebaut || m.spurKreis) ? 1 : 0) - (r.flags.wut ? 2 : 0);
        if (r.flags.verlassen) m.k6SelbstRaus = true;
        return r.flags.wut ? 'wut' : (r.flags.ruhig || r.flags.fakten) ? 'geschrieben' : r.flags.verlassen ? 'verlassen' : 'still';
      },
      folgen: { wut: { merke: 'k6ChatWut' }, geschrieben: { staerke: 'klar', merke: 'k6ChatRuhig' }, verlassen: { merke: 'k6ChatRaus' }, still: { merke: 'k6ChatStill' } } },
    { szene: 'chat', id: 'ergebnis', def: (m) => ERGEBNIS(m), ausgang: () => 'standard', folgen: { standard: {} } },
    { tu: 'n6_fuer' },
    ['erzaehler', 'Zum ersten Mal seit September ist dein Handy still.'],
    { tu: 'kapitelEnde' },
  ],
  n6_skills: [
    ['erzaehler', 'Aula. Herr Kuedes hält ein Ladekabel hoch. „Verbindung“, sagt er. Dann legt er es weg.'],
    { szene: 'skillsStunde', id: 's6_sagen', def: S6_SAGEN, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'klar', merke: 's6Sagen' }, weiter: { merke: 's6Sagen' } } },
    ['kaya', 'Jetzt üben wir an etwas Echtem.'],
    ['kaya', 'Nur im Kopf. Niemand muss es sagen.'],
    { szene: 'satz', id: 'ichSatz', def: ICH, ausgang: (r) => (r.regeln >= 4 ? 'stark' : r.regeln >= 2 ? 'mittel' : 'schwach'),
      folgen: {
        stark: { staerke: 'klar', merke: 'ichBotschaft', dann: [['mesenberg', 'Diesen Satz könnte man genau so sagen. Vielleicht sogar heute.']] },
        mittel: { merke: 'ichBotschaft', dann: [['mesenberg', 'Fast. Ein Teil klingt noch wie ein Vorwurf. Vorwürfe machen Ohren zu.']] },
        schwach: { dann: [['mesenberg', 'Hm. Da würde Jo dichtmachen. Vorwürfe machen Ohren zu.'], ['mesenberg', 'Probier’s nochmal im Kopf.']] },
      } },
    ['kaya', 'Mission: Einmal sagen, was du fühlst. Und was du dir wünschst.'],
  ],
  n6_ende: [
    { szene: 'skillsStunde', id: 's6_wut', def: S6_WUT_FAMILIE, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'ruhig', merke: 's6Wut' }, weiter: { merke: 's6Wut' } } },
    ['kaya', 'Letzte Übung der Woche. Jeder sagt seinen Stopp-Satz. Laut und klar.'],
    ['kaya', 'Und alle anderen antworten nur ein Wort: „Okay.“'],
    ['ben', 'Stopp. Erst fragen, bevor ihr mein Handy nehmt.'],
    ['alle', 'Okay.'],
    ['noah', '(leise, dann lauter) Stopp. Keine Fotos von mir ohne Fragen.'],
    ['alle', 'Okay.'],
    { wahl: [
      { t: '„Stopp. Keine Fakes über mich.“', staerke: 'klar', herz: { noah: 1, mila: 1 }, dann: [['alle', 'Okay.'], ['erzaehler', 'Jo sagt es am lautesten.']] },
      { t: '„Stopp. Erst fragen, dann umarmen.“', staerke: 'klar', herz: { ben: 1 }, dann: [['alle', 'Okay.'], ['ben', '(hebt die Hand) Fair. Ich frag ab jetzt.']] },
      { t: '„Weiter.“ (Heute nicht.)', dann: [['kaya', 'Auch das ist okay. Nein sagen gilt auch hier.']] },
    ] },
    { tu: 'n6_schluss' },
  ],
};

export const tunN6 = (c) => ({
  n6_joFolge: () => {
    const m = c.S.merke;
    if (m.k6JoZu) return [['erzaehler', 'Jo wirft weiter. Er trifft nicht mehr.']];
    return [...(m.k6JoGesagt ? [['jo', '(sehr leise) Ich hab nicht gedacht, dass das einer ernst nimmt.']] : []), ['erzaehler', 'Jo wirft. Diesmal trifft er. Er freut sich nicht.']];
  },
  n6_kenan: () => (c.S.merke.k6Eingegriffen ? [['kenan', 'Lass, Luca. Reicht.']] : [['erzaehler', 'Kenan sagt nichts. Er schaut weg. Wie alle.']]),
  n6_video: () => (c.S.merke.k6Eingegriffen ? [['erzaehler', 'Das Video gibt es trotzdem. Zehn Sekunden lang.']] : [['erzaehler', 'Das Video gibt es trotzdem. Vierzig Sekunden lang.']]),
  n6_stein: () => (c.S.merke.k6Stein ? [['erzaehler', 'Sie drückt den Stein zurück in den Würfel. Es klickt.']] : [['erzaehler', 'Mila holt den Stein von der Mauer. Sie drückt ihn zurück in den Würfel. Es klickt.']]),
  n6_tidderich: () => {
    const m = c.S.merke;
    if (m.k5Kuedes || m.k5Tidderich || m.k6KuedesDatei) {
      m.k6TidderichGenau = true;
      return [['hoffmann', 'Es gibt einen Screenshot. Ich weiß nicht, was stimmt.'], ['hoffmann', 'Ich will, dass ihr aufhört, übereinander zu urteilen.'], ['hoffmann', 'Das ist kein Vorschlag.'],
        { blende: 'Donnerstag · Pause' }, ['jemand', '(im Gang) Wer hat gepetzt?'], ['erzaehler', 'Auf dem Hof steht heute Mme Rantini an der Mauer. Sie schaut genauer hin als sonst.']];
    }
    return [['hoffmann', 'Irgendetwas stimmt hier nicht.'], ['hoffmann', 'Ich weiß nicht, was. Meine Tür ist offen.'], ['erzaehler', 'Sie sagt es ungelenk. Aber sie meint es.'], { blende: 'Donnerstag · Pause' }];
  },
  n6_fuer: () => {
    const m = c.S.merke;
    const s = (() => { const wer = { noah: !!(m.listeBeiNoah || m.k4NoahVerteidigt || m.manonListeFalsch || m.wahlNoah), mila: !!(m.milaGesagt || m.k6Stopp || m.k6Komm || m.k6Linse), ben: !!(m.k5BenGefragt || m.gegenlisteNein || m.gegenlisteFragen), jo: !!((m.k6JoSelbst || m.k6JoVerstanden) && !m.k6DateiGepostet), lina: !!(m.wahlLina || m.linaNachgegangen), yusuf: !!(m.wahlYusuf || m.k3YusufGeschickt || m.k3Uhr) }; return Object.keys(wer).filter((k) => wer[k]); })();
    m.k6Fuer = s;   // wer für dich gestimmt hat – kommt in Kapitel 7 (Montage) und Kapitel 10 zurück
    return [];
  },
  n6_schluss: () => [
    { szene: 'stempel', def: { modul: 'Modul 5 · Kommunikation und Grenzen', titel: 'Klar gesagt',
      gelernt: ['Worte, Stimme, Körper – und wem man glaubt', 'Jeder hat einen anderen Wohlfühl-Abstand', 'Ich-Botschaften statt Vorwürfe', 'Zuhören, das wirklich hilft', 'Grenzen setzen in vier Stufen – und ein Stopp annehmen'],
      mission: 'Sag diese Woche einmal deinen Stopp-Satz. Und wenn jemand dir Stopp sagt: „Okay.“ Ohne Diskussion.' }, folgen: {} },
  ],
});

// Storyline 7e „@annexe.cam“ (nach der Storyline von Fable) – Kapitel 6 „Die Sprachnachricht“, Januar, eine Woche später.
// Verdecktes Thema: Kommunikation und Grenzen (Ich-Botschaften, Stopp sagen, Einverständnis bei Fotos und Berührung).
// „War nur ein Witz“ und „Ist nur ein Video“ sind derselbe Satz. Ein Nein gilt, auch wenn jemand weiterfilmt.
// Auch Helfen hat eine Grenze: Man fragt, bevor man jemanden anfasst – und bevor man für jemanden handelt.
// Ende (neu, Runde 2 K5/K6): keine zweite Abstimmung. Freitag geht Lucas Video von Mila herum. 👁 zählt mit. Was früh
// gestoppt wird, sehen wenige; was weitergeleitet ist, sehen alle. Danach ein Stopp für dich selbst: der Klassenchat.
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
  { id: 'k6_abstimmung', kap: 6, tag: 'Freitag', uhr: 12.0, titel: 'Das Video', ziel: 'Mittagspause. Noah sitzt auf der Bank am Hof.', marker: 'noah',
    start: { teleport: 'eingangHof' },
    leute: { noah: [-20, 11.6, Math.PI, 'sitzt'], mila: [-16.4, 13.2, -2.3, 'handy'] },
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

// ---------- Freitag 12:00: Das Video (statt Abstimmung – die gab es schon in Kapitel 5) ----------
// Wer nach deinem Satz im Chat mitzieht, hängt an dem, was du vorher getan hast. Ayla zieht immer mit.
const helferVon = (m) => [
  (m.listeBeiNoah || m.k4NoahVerteidigt || m.manonListeFalsch || m.wahlNoah || m.k5NoahLasst || m.k5NoahDaneben || m.k5NoahGeholt) ? { id: 'noah', wer: 'Noah', text: 'ja. löscht das.' } : null,
  { id: 'ayla', wer: 'Ayla', text: 'löschen. sofort.' },
  (m.k5BenGefragt || m.gegenlisteNein || m.gegenlisteFragen) ? { id: 'ben', wer: 'Ben', text: 'tom. lösch.' } : null,
  ((m.k6JoSelbst || m.k6JoVerstanden) && !m.k6DateiGepostet) ? { id: 'jo', wer: 'Jo', text: 'mach weg, tom.' } : null,
  (m.wahlLina || m.linaNachgegangen || m.k5BeweisFrage) ? { id: 'lina', wer: 'Lina', text: 'löscht das.' } : null,
  (m.wahlYusuf || m.k3YusufGeschickt || m.k3Uhr || m.k5YusufSorry) ? { id: 'yusuf', wer: 'Yusuf', text: '+1. weg damit.' } : null,
].filter(Boolean);
const VIDEO = (m) => ({
  gruppe: '7P2 🏫', mitglieder: 21, dauer: 30, regel: !!m.k6RegelVideo, duDrin: !!m.k6Linse,
  post: { wer: 'tom_7p2', laenge: m.k6Weggeschaut ? '0:40' : m.k6Eingegriffen ? '0:10' : '0:25',
    bild: m.k6Linse ? 'Erst Mila. Dann nur noch du.' : 'Mila. Die Hand vor dem Gesicht.', text: m.k6Linse ? 'hinten links als bodyguard 😂' : 'anwältin dreht durch 😂' },
  untertitel: m.k6Weggeschaut ? ['„Hör auf zu filmen.“', '„Ist doch nur ein Video.“', '„Ich hab Nein gesagt.“', '(Lachen.)', '„Ich hab Nein gesagt.“']
    : ['„Hör auf zu filmen.“', '„Ich hab Nein gesagt.“', m.k6Linse ? '(Dann nur noch du. Ganz nah.)' : m.k6Stopp ? '„Stopp. Sie hat Nein gesagt.“' : '(Dann bricht es ab.)'],
  gruppen: [{ id: '7p2', t: '7P2', n: 21 }, { id: 'ecke', t: 'Ecke 🔥', n: 40 }, { id: 'u14', t: '⚽ U14', n: 18 }],
  helfer: helferVon(m),
  mila: { antwort: ['dass es weg ist.', 'nicht kommentieren. bitte.', 'kommst du mit zu kuedes? jetzt?'] },
  nachrichten: [
    { nach: 3, wer: 'sami.lu', text: 'wtf 😂😂' },
    { nach: 6.5, wer: 'unbekannt_09', text: 'schick das in die ecke', wennNicht: 'geloescht' },
    ...(m.k6DateiGepostet ? [{ nach: 8.5, wer: 'tom_7p2', text: 'erst jo, jetzt mila. 7P2 liefert 😂', wennNicht: 'geloescht' }] : []),
    { nach: 11, system: 'tom_7p2 hat das Video weitergeleitet: Ecke 🔥', gruppe: 'ecke', wennNicht: 'geloescht' },
    { nach: 14, system: 'Mila ist online.', wennNicht: 'gefragt' },
    { nach: 17.5, system: 'Mila ist offline.', wennNicht: 'gefragt' },
    { nach: 20, system: 'Aus „Ecke 🔥“ weitergeleitet: ⚽ U14', gruppe: 'u14' },
    { nach: 25, wer: 'sami.lu', text: 'wer ist das eigentlich', wennNicht: 'geloescht' },
  ],
});
// Wie viele es am Ende gesehen haben: was früh gestoppt wird, bleibt klein. stopp: 'jetzt' | 'spaet' | 'app' | null
const bisZuletzt = (m, stopp) => {
  const V = m.k6Video || {}, G = V.gruppen || {}, jetzt = V.jetzt || 0;
  if (stopp === 'jetzt') return jetzt + 2;
  const order = ['7p2', 'ecke', 'u14'];
  let summe = 0, davorLaeuft = true;
  for (const id of order) {
    const g = G[id] || { v: 0, n: 0, da: false, aktiv: true };
    const laeuft = g.da ? g.aktiv : davorLaeuft;   // nicht angekommen: kommt noch an, solange die Gruppe davor läuft
    const rest = Math.max(0, g.n - g.v), anteil = stopp === 'spaet' ? 0.4 : stopp === 'app' ? 0.8 : 1;
    summe += g.v + (laeuft ? Math.round(rest * anteil) : 0);
    davorLaeuft = laeuft;
  }
  return Math.max(jetzt, summe);
};

export const GESPRAECHE_N6 = {
  n6_dario: [
    ['erzaehler', 'Montag. Dario hält dir einen Ohrstöpsel hin.'],
    ['dario', 'Die ging im Dezember in einer Gruppe rum.'],
    ['erzaehler', 'Er drückt auf Play.'],
    ['jo', '(Sprachnachricht) Was, wenn’s Hinten links ist? Man bräuchte nur einen Screenshot. Haha.'],
    ['erzaehler', 'Hinten lachen ältere Stimmen. Sieben Sekunden. Dann ist es still.'],
    { szene: 'blase', id: 'k6BlaseJo', pruefe: false, def: { t: 'Jo hat den Screenshot gebaut.', stufe: 'klein', zeit: 5 },
      ausgang: (r, m) => { m.k6JoGeprueft = !!(r && r.geprueft); return m.k6JoGeprueft ? 'ja' : 'nein'; },
      folgen: { ja: { dann: [['du', '(denkt) Echt: Jo sagt „man bräuchte“. Gebaut? Hört man nicht.']] }, nein: { dann: [] } } },
    { wenn: (m) => !!m.k5HoerenJo, dann: [['dario', 'Jo hat mich am Wochenende dreimal angerufen. Weil du ihm geschrieben hast.']] },
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
          ['erzaehler', 'Sechzig Nachrichten in zwei Minuten. Alle über Jo. Am anderen Tisch bleibt sein Tablett stehen. Jo ist weg.'],
          ['du', '(denkt) Halb sauber. Unter allem steht: „vllt haben die zwei es zusammen gemacht“.'] ] },
        jo: { herz: { jo: 2 }, merke: 'k6JoSelbst', dann: [['erzaehler', 'Ein Satz. Schwach. Aber seiner. Am anderen Tisch schaut Jo nicht hoch. Er isst weiter. Langsam.']] },
        kuedes: { staerke: 'hilfe', herz: { kaya: 1 }, merke: 'k6KuedesDatei', dann: [['kaya', '(später, in seinem Büro) Ich red mit Jo. Heute noch.'], ['kaya', 'Und bevor ich etwas mache, sag ich es dir.']] },
        mila: { herz: { mila: 1 }, merke: 'k6NurMila', dann: [['erzaehler', 'Mila nickt dir über den Tisch zu. Einmal.']] },
        nichts: { merke: 'k6BeweisStill' },
      } },
  ],
  // Mittwoch 13:20 (Fable, Schlüsselszene K6): Kenans Satz fällt nur, wenn vorher jemand etwas gesagt oder getan hat.
  n6_luca: [
    ['erzaehler', 'Mittwoch. 13:20. Der Hof ist fast leer. Luca hält sein Handy hoch. Die Linse zeigt auf Mila.'],
    ['luca', 'Sag’s noch mal. Dass der Screenshot fake ist.'],
    ['mila', 'Hör auf zu filmen.'],
    ['luca', 'Wieso? Ist doch nur ein Video.'],
    ['mila', 'Ich hab Nein gesagt.'],
    ['erzaehler', 'Sie hält die Hand vors Gesicht. Der Würfel fällt. Ein Stein springt heraus und rollt bis vor Kenans Schuh.'],
    ['luca', 'Lowkey lustig, wenn sie sauer ist.'],
    ['erzaehler', 'Kenan schaut auf den Stein. Nicht auf Luca.'],
    { szene: 'mut', id: 'mutLuca', def: MUT_LUCA, ausgang: (r) => r.key,
      folgen: {
        stopp: { staerke: 'klar', herz: { mila: 2, kenan: 1 }, merke: ['k6Stopp', 'k6Eingegriffen'], dann: [['du', 'Stopp. Sie hat Nein gesagt.'], ['luca', 'Guck an. Hinten links kann reden.']] },
        linse: { staerke: 'mut', herz: { mila: 2, kenan: 1 }, merke: ['k6Linse', 'k6Eingegriffen'], dann: [['erzaehler', 'Du stellst dich vor die Linse. Auf Lucas Display bist jetzt nur noch du.'], ['luca', 'Geh weg da.']] },
        kenan: { staerke: 'einbeziehen', herz: { kenan: 2 }, merke: ['k6Kenan', 'k6Eingegriffen'], dann: [['du', 'Kenan. Sag du was.']] },
        rantini: { staerke: 'hilfe', merke: ['k6Rantini', 'k6Eingegriffen'], dann: [['erzaehler', 'Du rennst zum Eingang. Mme Rantini kommt sofort mit.'], ['rantini', 'Luca. Handy weg. Jetzt.']] },
        komm: { staerke: 'lesen', herz: { mila: 3 }, merke: ['k6Komm', 'k6Eingegriffen'], dann: [['du', 'Komm?'], ['erzaehler', 'Du hältst ihr die Hand hin. Du fasst sie nicht an. Mila schaut auf die Hand. Dann geht sie mit.']] },
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
    ['chiara', '(in der Pause) Ich schreib Regeln für den Chat. Damit es fair ist.'],
    ['erzaehler', 'Auf ihrem Display: „Regel 1: Keine Fakes.“ Darunter ist Platz.'],
    ['chiara', 'Was fehlt?'],
    { wahl: [
      { t: '„Keine Videos ohne Ja.“', staerke: 'klar', merke: 'k6RegelVideo', dann: [['chiara', '(tippt) Regel 2: Keine Fotos und Videos ohne Ja.'], ['chiara', 'Ohne Ja von der Person, die drauf ist. Okay.']] },
      { t: '„Keine Umfragen über Leute.“', staerke: 'klar', merke: 'k6RegelUmfrage', dann: [['chiara', '(hört auf zu tippen) …'], ['chiara', 'Das war meine Umfrage. Letzte Woche.'], ['erzaehler', 'Sie tippt es trotzdem. Regel 2.']] },
      { t: '„Regeln helfen da nicht.“', merke: 'k6RegelNein', dann: [['chiara', 'Ohne Regeln macht jeder, was er will.'], ['erzaehler', 'Sie schreibt weiter. Allein.']] },
      { t: '(Nichts sagen.)', dann: [['chiara', 'Okay. Dann schreib ich’s allein.']] },
    ] },
  ],
  // Freitag 12:00: Die Stimmen laufen ein. Jede Nachricht kann eine Stimme kippen oder kosten.
  n6_abstimmung: [
    ['noah', '(schaut auf sein Display) Oh nein.'],
    ['erzaehler', 'Freitag. 12:00. Alle Handys summen gleichzeitig. Mila steht drei Meter weiter. Ihr Handy auch.'],
    { szene: 'video', id: 'video6', pruefe: false, def: (m) => VIDEO(m),
      ausgang: (r, m) => {
        const f = r.flags || {};
        m.k6Video = { jetzt: r.jetzt, gruppen: r.gruppen, wie: r.wie }; m.k6Helfer = r.helfer || [];
        ['gefragt', 'kommentar', 'geteilt', 'anMila', 'chiara', 'app', 'beleg', 'noahGefragt', 'lucaDm', 'lucaBeleidigt', 'oeffentlichMila', 'angesehen', 'mitMila', 'milaWill', 'weg']
          .forEach((k) => { if (f[k]) m['k6V' + k[0].toUpperCase() + k.slice(1)] = true; });
        return f.mitMila ? 'mitMila' : (f.geteilt || f.anMila) ? 'geteilt' : (f.kommentar || f.chiara || f.app || f.noahGefragt || f.gefragt || f.beleg) ? 'getan' : 'still';
      },
      folgen: { mitMila: { staerke: 'lesen', merke: 'k6VideoMitMila' }, geteilt: { merke: 'k6VideoGeteilt' }, getan: { staerke: 'klar', merke: 'k6VideoGetan' }, still: { merke: 'k6VideoStill' } } },
    { tu: 'n6_nachVideo' },
    { tu: 'n6_fuer' },
    { tu: 'n6_handy' },
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

export const tunN6 = (c) => { const T6 = {
  // Herr Kuedes fragt zuerst Mila. Er erklärt nicht lange: Es ist ihr Gesicht.
  kuedes: (spaet) => {
    const m = c.S.merke;
    return [{ blende: 'Büro von Herrn Kuedes · ' + (spaet ? '12:35' : '12:24') },
      ['kaya', 'Mila. Was möchtest du, dass jetzt passiert?'],
      ['mila', 'Dass es weg ist. Überall.'],
      ['kaya', 'Okay. Ich hol Luca. Und tom. Jetzt.'],
      ...(m.k6VLucaDm ? [['du', 'Luca hat geschrieben: „ist mein video“.']] : []),
      ['kaya', 'Es ist nicht sein Video. Es ist ihr Gesicht.'],
      ...(m.k6Linse ? [['kaya', '(zu dir) Und du bist auch drauf. Dein Gesicht gehört auch dir.']] : []),
      ...(m.k6VBeleg ? [['kaya', 'Dein Screenshot hilft. Da steht, wer und wann.']] : []),
      ['kaya', 'Wenn es am Wochenende wieder auftaucht: Screenshot. Dann zu mir. Oder BEE SECURE: 8002 1234.'],
      ...((m.k6VGefragt || m.k6MilaGefragtSpaet) ? [['kaya', '(zu dir) Du hast sie zuerst gefragt. Das machen nicht mal alle Erwachsenen.']] : [])];
  },
  zahl: (stopp, vorne = '') => {
    const m = c.S.merke, n = bisZuletzt(m, stopp); m.k6Gesehen = n; m.k6GesehenStopp = stopp;
    return [stopp === 'jetzt' ? ['erzaehler', vorne + '12:41. Das Video ist weg. Überall. 👁 ' + n + '. Dann war Schluss.']
      : stopp === 'spaet' ? ['erzaehler', vorne + 'Am Nachmittag ist das Video weg. 👁 ' + n + ' bis dahin.']
      : ['erzaehler', vorne + 'Die App löscht es nach vier Stunden. 👁 ' + n + ' bis dahin.']];
  },
}; return ({
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
  // Nach dem Video: mit Mila zu Herrn Kuedes – oder Mila auf der Mauer (zweite Chance: „Was brauchst du?“)
  n6_nachVideo: () => {
    const m = c.S.merke;
    if (m.k6VMitMila) return [...T6.kuedes(false), ...T6.zahl('jetzt')];
    const z = [{ hin: { mila: [-16.0, 13.6, -2.6] } }, ['erzaehler', 'Mila sitzt auf der Mauer. Den Würfel in der Hand. Sie dreht ihn nicht.']];
    if (m.k6VGeteilt) z.push(['mila', 'Du hast es weitergeleitet. In die Ecke.']);
    else if (m.k6VAnMila) z.push(['mila', 'Du hast es mir geschickt. Ich hatte es schon.']);
    else if (m.k6VOeffentlichMila) z.push(['mila', '„@Mila alles okay?“ Vor allen. Jetzt haben alle zu mir geschaut.']);
    else if (m.k6VKommentar && !m.k6VGefragt) z.push(['mila', 'Danke für den Satz im Chat.'], ['mila', 'Nächstes Mal: frag mich kurz. Okay?']);
    else if (m.k6VGefragt) z.push(['mila', 'Du hast gefragt. Das hat heute sonst keiner.']);
    else if (m.k6VAngesehen) z.push(['mila', '(hält ihr Handy hoch) „Gesehen von: … und dir.“']);
    else z.push(['mila', '(schaut dich an) Du hast es auch gesehen. Oder?']);
    z.push({ wahl: [
      { t: '„Was brauchst du?“', merke: 'k6MilaGefragtSpaet', staerke: 'lesen', herz: { mila: 2 }, dann: [['mila', '(atmet aus) Dass es weg ist. Kommst du mit? Zu Kuedes.'], { tu: 'n6_kuedesSpaet' }] },
      ...(m.k6VGeteilt || m.k6VAnMila || m.k6VOeffentlichMila ? [{ t: '„Sorry. Ich wollte helfen.“', merke: 'k6MilaSorry', herz: { mila: 1 },
        dann: [['mila', m.k6VGeteilt ? 'Ich weiß. Aber drauf bin ich. Nicht Luca.' : 'Ich weiß. Frag mich das nächste Mal. Kurz.'], { tu: 'n6_milaAllein' }] }] : []),
      { t: '„Ist doch nicht so schlimm.“', merke: 'k6MilaKleingeredet', herz: { mila: -2 }, dann: [['mila', '(steht auf) Für dich nicht.'], { tu: 'n6_milaAllein' }] },
      { t: '(Neben ihr sitzen.)', merke: 'k6MilaDaneben', herz: { mila: 1 }, dann: [['erzaehler', 'Ihr sitzt da. Nach einer Weile gibt sie dir den Würfel. Du hältst ihn nur.'], { tu: 'n6_milaAllein' }] },
    ] });
    return z;
  },
  n6_kuedesSpaet: () => [...T6.kuedes(true), ...T6.zahl('spaet')],
  n6_milaAllein: () => [{ blende: 'Freitag · 13:10' }, ...T6.zahl(c.S.merke.k6VApp ? 'app' : 'spaet', 'Mila an der Tür von Herrn Kuedes. Allein. ')],
  // Wer mit dir war (kommt in Kapitel 7 in der Montage und in Kapitel 10 zurück)
  n6_fuer: () => {
    const m = c.S.merke, s = new Set(m.k6Helfer || []);
    if (m.k6VGefragt || m.k6MilaGefragtSpaet || m.k6Stopp || m.k6Komm || m.k6Linse) s.add('mila');
    if (m.k6VNoahGefragt) s.add('noah');
    s.delete('ayla');
    m.k6Fuer = [...s];
    return [];
  },
  // Freitag, 15:40: ein Stopp für dich selbst
  n6_handy: () => [
    { blende: 'Freitag · 15:40 · im Bus' },
    { handy: { wer: '7P2 🏫', wann: '15:40', text: '38 neue Nachrichten' } },
    { fest: true, wahl: [
      { t: '🔕 Stumm bis Montag.', merke: 'k6Stumm', staerke: 'ruhig', dann: [{ handy: null }, ['erzaehler', 'Zum ersten Mal seit September ist dein Handy still. Weil du es so willst.']] },
      { t: '🚪 Gruppe verlassen.', merke: 'k6Verlassen', dann: [{ handy: { wer: '7P2 🏫', wann: '15:41', chat: [{ wer: '7P2', t: '{name} hat die Gruppe verlassen.' }] } },
        { handy: { wer: 'Ayla (privat)', wann: '15:43', text: 'gute entscheidung. bin auch raus. 🫶' } }, { handy: null }, ['erzaehler', 'Zum ersten Mal seit September ist dein Handy still.']] },
      { t: '(Alles lesen.)', merke: 'k6AllesGelesen', dann: [{ handy: null }, ['erzaehler', 'Achtunddreißig Nachrichten. Über Mila. Über Luca. Drei über dich. Um elf Uhr nachts liest du immer noch.']] },
    ] },
  ],
  n6_schluss: () => [
    { szene: 'stempel', def: { modul: 'Modul 5 · Kommunikation und Grenzen', titel: 'Klar gesagt',
      gelernt: ['Worte, Stimme, Körper – und wem man glaubt', 'Jeder hat einen anderen Wohlfühl-Abstand', 'Ich-Botschaften statt Vorwürfe', 'Zuhören, das wirklich hilft', 'Grenzen setzen in vier Stufen – und ein Stopp annehmen'],
      mission: 'Sag diese Woche einmal deinen Stopp-Satz. Und wenn jemand dir Stopp sagt: „Okay.“ Ohne Diskussion.' }, folgen: {} },
  ],
}); };

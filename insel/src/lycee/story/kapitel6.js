// Storyline 7e „@annexe.cam“ (nach der Storyline von Fable) – Kapitel 6 „Die Sprachnachricht“, Januar, eine Woche später.
// Verdecktes Thema: Kommunikation und Grenzen (Ich-Botschaften, Stopp sagen, Einverständnis bei Fotos und Berührung).
// „War nur ein Witz“ und „Ist nur ein Video“ sind derselbe Satz. Ein Nein gilt, auch wenn jemand weiterfilmt.
// Auch Helfen hat eine Grenze: Man fragt, bevor man jemanden anfasst – und bevor man für jemanden handelt.
// Ende (neu, Runde 2 K5/K6): keine zweite Abstimmung. Freitag geht Lucas Video von Mila herum. 👁 zählt mit. Was früh
// gestoppt wird, sehen wenige; was weitergeleitet ist, sehen alle. Samstag kommt es wieder – ein Stopp für dich selbst.
// K6 Runde 1 (Fach + Jugend): Donnerstag durch Milas Augen (statt Rede), „War mein Nein zu leise?“ (statt Würfel und Stein),
// Wort-Schere (statt Ich-Botschaft-Bauplan), „Okay. Lösch ich.“ auf Milas Nein.
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
  // Donnerstag 7:50 (Jugend-Panel K6 R1: statt Mme Tidderichs Rede): 20 Sekunden durch Milas Augen. Luca hat noch das Video.
  { id: 'k6_rede', kap: 6, tag: 'Donnerstag', uhr: 7.83, titel: 'Milas Handy', ziel: 'Haltestelle. Mila wartet auf den Bus.', marker: null,
    start: { teleport: 'busAnkunft', gespraech: 'n6_rede' },
    leute: { mila: [-23.2, 41.6, -1.6, 'sitzt'], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { nachStart: true } },
  { id: 'k6_ende', kap: 6, tag: 'Freitag', uhr: 10.0, neben: 'skills', titel: 'Skills: Okay.', ziel: 'Letzte Skills-Stunde der Woche. Aula.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n6_ende' } },
  { id: 'k6_abstimmung', kap: 6, tag: 'Freitag', uhr: 12.0, titel: 'Das Video', ziel: 'Mittagspause. Noah sitzt auf der Bank am Hof.', marker: 'noah',
    start: { teleport: 'eingangHof' },
    leute: { noah: [-20, 11.6, Math.PI, 'sitzt'], mila: [-16.4, 13.2, -2.3, 'handy'] },
    fertig: { reden: 'noah', gespraech: 'n6_abstimmung' } },
];

// ---------- Wort-Schere (Heft #05, Stunde 2): Giftwort raus · Sache bleibt · Wunsch dazu ----------
const ICH = {
  wo: 'Aula · Nur im Kopf', titel: '✂️ Wort-Schere', altTitel: 'Dein erster Satz',
  alt: 'Du bist IMMER so fies. Typisch du. Hau ab!',
  regeln: [['gift', 'kein Giftwort'], ['sache', 'die Sache bleibt'], ['wunsch', 'ein Wunsch']],
  teile: [
    [{ t: 'Deine Sprachnachricht über mich', regeln: { sache: true, gift: true } }, { t: 'Du bist IMMER so fies:', regeln: { gift: false } }, { t: 'Typisch du:', regeln: { gift: false } }],
    [{ t: 'war in einer fremden Gruppe.', regeln: { sache: true, gift: true } }, { t: 'hat mein Leben kaputt gemacht.', regeln: { sache: false } }, { t: 'war NIE lustig.', regeln: { gift: false } }],
    [{ t: 'Frag mich vorher.', regeln: { wunsch: true } }, { t: 'Sag’s mir allein.', regeln: { wunsch: true } }, { t: 'Hau ab.', regeln: { wunsch: false, gift: false } }],
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

// ---------- Dienstag: Jo fragt, ob er deinen Namen sagen darf (Jugend-Panel K6 R2: statt Fakten-Chat – Einverständnis von der anderen Seite) ----------

// ---------- Mittwoch 13:20: Luca filmt Mila (Entscheidung B) ----------
// Jugend-Panel K6 R1: Bei 0 Sekunden gab es nur „Wegschauen“ – alle haben es gedrückt. Jetzt sind alle Wege sofort da.
// Der Balken ist die Aufnahme: Je länger keiner etwas tut, desto länger wird Lucas Video (0:10 · 0:25 · 0:40).
const MUT_LUCA = {
  wo: 'Hof · 13:20', titel: 'Luca filmt', balken: '🔴 0:00', rec: 40, warte: 3,
  situation: 'Luca filmt. Mila hat Nein gesagt. Kenan steht daneben.',
  info: 'Die Aufnahme läuft. Je länger keiner was tut, desto länger wird das Video.',
  dauer: 16,   // Fach + Jugend K6 R2: 8 s war für Vorlesen und schwache Leser zu knapp – Stopp gab trotzdem 0:40
  stufen: [
    { ab: 0, optionen: [{ key: 'stopp', t: '„Stopp. Sie hat Nein gesagt.“' }, { key: 'komm', t: '„Komm?“ (Hand hinhalten.)' }, { key: 'rantini', t: '(Mme Rantini holen.)' }, { key: 'weg', t: '(Wegschauen.)' }] },
  ],
};
const laenge6 = (m) => (m.k6Weggeschaut || (m.k6Mut != null && m.k6Mut >= 70) ? '0:40' : m.k6Mut != null && m.k6Mut >= 35 ? '0:25' : '0:10');

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
  post: { wer: 'tom_7p2', laenge: laenge6(m),
    bild: m.k6Linse ? 'Erst Mila. Dann nur noch du.' : 'Mila. Die Hand vor dem Gesicht.', text: m.k6Linse ? 'hinten links als bodyguard 😂' : m.k6MilaLassMal ? 'sie fand’s selbst lustig 😂' : 'mila dreht durch 😂' },
  untertitel: m.k6Weggeschaut ? ['„Hör auf zu filmen.“', '„Ist doch nur ein Video.“', '„Ich hab Nein gesagt.“', '(Lachen.)', '„Ich hab Nein gesagt.“']
    : ['„Hör auf zu filmen.“', '„Ich hab Nein gesagt.“', m.k6Linse ? '(Dann nur noch du. Ganz nah.)' : m.k6Stopp ? '„Stopp. Sie hat Nein gesagt.“' : '(Dann bricht es ab.)'],
  gruppen: [{ id: '7p2', t: '7P2', n: 21 }, { id: 'ecke', t: 'Ecke 🔥', n: 40 }, { id: 'u14', t: '⚽ U14', n: 18 }],
  helfer: helferVon(m),
  mila: { antwort: [...(m.k6MilaNein ? ['ich hab ihm gestern nein geschrieben.'] : []), 'dass es weg ist.', 'nicht kommentieren. bitte.', 'kommst du mit zu kuedes? jetzt?'] },
  nachrichten: [
    { nach: 3, wer: 'sami.lu', text: 'wtf 😂😂' },
    { nach: 6.5, wer: 'unbekannt_09', text: 'schick das in die ecke', wennNicht: 'geloescht' },
    ...(m.k6DateiGepostet ? [{ nach: 3.6, wer: 'tom_7p2', text: 'erst jo, jetzt mila. 7P2 liefert 😂', wennNicht: 'geloescht' }] : []),
    // Wer Dario am Montag nicht gedrängt hat: Dario hält die Ecke sauber (Jugend-Panel K6 R1 – die Wahl hat jetzt eine Folge)
    ...(m.k6DarioGeschuetzt ? [{ nach: 2.5, privat: 'Dario', text: 'kommt nicht in die ecke. pass ich auf.' },
      { nach: 13.5, system: 'In „Ecke 🔥“: Dario hat das Video gelöscht. „nicht hier rein.“', wennDa: 'ecke', stoppGruppe: 'ecke' }] : []),
    ...(m.k6DoGefragt ? [{ nach: 4, privat: 'Mila', text: 'du weißt es ja. hilfst du?', setzt: 'milaWill', wennNicht: 'gefragt' }] : []),
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
    const rest = Math.max(0, g.n - g.v), anteil = (stopp === 'spaet' ? 0.4 : stopp === 'app' ? 0.8 : 1) * (m.k6MilaScreen ? 0.6 : 1);   // Milas Screenshot vom Donnerstag: es geht schneller
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
    ['jo', '(Sprachnachricht) Stellt euch vor: Hinten links ist die Cam. Ein Screenshot, und alle glauben’s. Haha.'],
    ['erzaehler', 'Hinten lachen ältere Stimmen. Sieben Sekunden. Dann ist es still.'],
    { szene: 'blase', id: 'k6BlaseJo', pruefe: false, def: { t: 'Jo hat den Screenshot gebaut.', stufe: 'klein', zeit: 5 },
      ausgang: (r, m) => { m.k6JoGeprueft = !!(r && r.geprueft); return m.k6JoGeprueft ? 'ja' : 'nein'; },
      folgen: { ja: { dann: [{ handy: { wer: '📷 Kamera-Check', wann: '7:31', chat: [{ wer: 'Echt', t: 'Eine Idee. Kein „Ich war’s“.' }, { wer: 'Gebaut?', t: 'Hört man nicht.' }] } }, { handy: null }] }, nein: { dann: [] } } },
    { wenn: (m) => !!m.k5HoerenJo, dann: [['dario', 'Jo hat mich am Wochenende dreimal angerufen. Weil du ihm geschrieben hast.']] },
    { wahl: [
      { t: '„Schick sie mir. Bitte.“', merke: 'k6Gedraengt', dann: [
        ['dario', 'Dann weiß man, von wem du sie hast.'],
        { wahl: [
          { t: '„Ich brauch sie. Bitte.“', herz: { dario: -1 }, merke: 'k6Datei', dann: [['erzaehler', 'Er schaut lange auf sein Display. Dann summt dein Handy. Eine Datei. 0:07.'], ['dario', 'Sag nicht, von wem.'], ['erzaehler', 'Er steckt die Kopfhörer weg. Er schaut dich nicht mehr an.']] },
          { t: '„Okay. Dann nicht.“', herz: { dario: 2 }, merke: 'k6DarioGeschuetzt', dann: [['dario', '(nickt) Danke.']] },
        ] } ] },
      { t: '„Woher hast du die?“', herz: { dario: 1 }, merke: 'k6DarioGeschuetzt', dann: [['dario', 'Ecke-Gruppe. Da sind alle drin.'], ['dario', 'Ich zeig sie dir, weil du’s nicht warst.']] },
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
    ['mila', 'Ich stell es rein. Jetzt. Fakten, keine Meinung.'],
    ['erzaehler', 'Drei Bilder im Klassenchat. Darunter tom: „mila hält zu hinten links 😂“.'],
    { tu: 'n6_joFrage' },
  ],
  // Mittwoch 13:20 (Fable, Schlüsselszene K6): Kenans Satz fällt nur, wenn vorher jemand etwas gesagt oder getan hat.
  n6_luca: [
    ['erzaehler', 'Mittwoch. 13:20. Der Hof ist fast leer. Luca hält sein Handy hoch. Die Linse zeigt auf Mila.'],
    ['luca', 'Sag’s noch mal. Dass der Screenshot fake ist.'],
    ['mila', 'Hör auf zu filmen.'],
    ['luca', 'Wieso? Ist doch nur ein Video.'],
    ['mila', 'Ich hab Nein gesagt.'],
    ['erzaehler', 'Sie hält die Hand vors Gesicht. Kenan steht daneben. Er sagt nichts.'],
    ['luca', 'Sauer ist sie noch lustiger.'],
    { szene: 'mut', id: 'mutLuca', def: MUT_LUCA, ausgang: (r, m) => { m.k6Mut = r.mut; return r.key; },
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
    // Jugend-Panel K6 R1 (statt Würfel und Stein): Wer gefilmt wird, fragt sich, ob das Nein gereicht hat. (Heft #05: Wer erstarrt, ist nicht schuld.)
    ['mila', '(leise) War mein Nein zu leise?'],
    { wahl: [
      { t: '„Dein Nein war klar.“', merke: 'k6NeinKlar', staerke: 'klar', herz: { mila: 2 }, dann: [['mila', '(nickt) Okay.']] },
      { t: '„Luca hat’s ignoriert.“', merke: 'k6NeinIgnoriert', herz: { mila: 2 }, dann: [['mila', 'Ja. Hat er.']] },
      { t: '„Bisschen leise vielleicht.“', merke: 'k6NeinLeise', herz: { mila: -1 }, dann: [['mila', '(schaut weg) Hm.']] },
      { t: '(Nichts sagen.)', merke: 'k6NeinStill', dann: [['erzaehler', 'Mila wartet kurz. Dann geht sie rein.']] },
    ] },
  ],
  n6_rede: [
    // Heft #05, Stunde 1 (drei Kanäle): Worte, Stimme, Körper – im Chat sieht man nur die Worte
    { sicht: { wer: 'mila', auf: 'du', gedanken: ['Donnerstag, 7:50. Mein Handy summt.', 'Luca. Schon wieder. Mein Bauch ist ein Knoten.'] } },
    { tu: 'n6_milaHandy' },
    ['erzaehler', 'Du bist jetzt Mila. Was schreibst du Luca?'],
    { fest: true, wahl: [
      { t: '„haha lass mal“', merke: 'k6MilaLassMal', dann: [{ handy: { wer: 'Luca → Mila', wann: '7:51', chat: [{ wer: 'Mila', t: 'haha lass mal' }, { wer: 'Luca', t: 'lol ok 😂' }] } }] },
      { t: '„Nein. Lösch es. Jetzt.“', merke: 'k6MilaNein', staerke: 'klar', dann: [{ handy: { wer: 'Luca → Mila', wann: '7:51', chat: [{ wer: 'Mila', t: 'Nein. Lösch es. Jetzt.' }, { wer: 'Luca', t: 'chill 🙄' }] } }] },
      { t: '(Screenshot machen.)', merke: 'k6MilaScreen', dann: [{ handy: { wer: 'Luca → Mila', wann: '7:51', chat: [{ wer: '📸', t: 'Screenshot gespeichert.' }] } }] },
      { t: '(Nicht antworten.)', merke: 'k6MilaStill', dann: [{ handy: { wer: 'Luca → Mila', wann: '7:53', chat: [{ wer: 'Luca', t: '??' }, { wer: 'Luca', t: 'ok dann halt 😂' }] } }] },
    ] },
    { handy: null },
    // Jugend-Panel K6 R2 (statt Chiaras Regeln): Du weißt, was auf ihrem Handy ist. Sie weiß nicht, dass du es weißt. Ihr Handy ist eine Grenze.
    ['erzaehler', 'Dann bist du wieder du. Mila sitzt neben dir. Ihr Handy ist halb weggedreht.'],
    { wahl: [
      { t: '„Willst du’s mir zeigen?“', merke: 'k6DoGefragt', staerke: 'lesen', herz: { mila: 2 }, dann: [['mila', '(dreht das Handy um) Luca. Er will’s posten.'],
        { wenn: (m) => !!m.k6MilaLassMal, dann: [['mila', 'Ich hab „haha“ geschrieben. Mir war schlecht dabei.']] }] },
      { t: '(Aufs Display schauen.)', merke: 'k6DoGeschaut', herz: { mila: -1 }, dann: [['mila', '(zieht das Handy weg) Frag halt.']] },
      { t: '„Alles gut?“', merke: 'k6DoAllesGut', dann: [['mila', 'ok.'], ['erzaehler', 'Das Handy bleibt weggedreht.']] },
      { t: '(Neben ihr sitzen.)', merke: 'k6DoSitzen', herz: { mila: 1 }, dann: [['erzaehler', 'Der Bus kommt. Mila atmet aus.']] },
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
        ['gefragt', 'kommentar', 'geteilt', 'anMila', 'chiara', 'app', 'beleg', 'noahGefragt', 'lucaDm', 'lucaBeleidigt', 'oeffentlichMila', 'angesehen', 'mitMila', 'milaWill', 'weg', 'okayMila', 'schere', 'schereSauber']
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
    { szene: 'satz', id: 'ichSatz', def: ICH, ausgang: (r) => (r.regeln >= 3 ? 'stark' : r.regeln >= 2 ? 'mittel' : 'schwach'),
      folgen: {
        stark: { staerke: 'klar', merke: 'ichBotschaft', dann: [['mesenberg', 'Kein Gift. Die Sache bleibt. Ein Wunsch. So kann man das sagen.']] },
        mittel: { merke: 'ichBotschaft', dann: [['mesenberg', 'Fast. Ein Wort macht noch Krieg. Schneid es raus.']] },
        schwach: { dann: [['mesenberg', 'Da würde Jo dichtmachen. Giftwörter machen Ohren zu.'], ['mesenberg', 'Probier’s nochmal im Kopf.']] },
      } },
    ['kaya', 'Mission: Einmal ein Giftwort weglassen. Und sagen, was du dir wünschst.'],
  ],
  n6_ende: [
    { szene: 'skillsStunde', id: 's6_wut', def: S6_WUT_FAMILIE, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'ruhig', merke: 's6Wut' }, weiter: { merke: 's6Wut' } } },
    // Heft #05: Niemand sagt allein etwas vor allen – nur im Chor, im Sitzen. Der eigene Stopp-Satz bleibt im Kopf.
    ['kaya', 'Letzte Übung. Alle zusammen, im Sitzen. Ich sag einen Stopp-Satz. Ihr antwortet: „Okay.“'],
    ['kaya', 'Stopp. Erst fragen, bevor ihr mein Handy nehmt.'],
    ['alle', 'Okay.'],
    ['kaya', 'Jetzt still, jeder für sich: Welcher Stopp-Satz ist deiner?'],
    { wahl: [
      { t: '„Stopp. Keine Fotos ohne Fragen.“', staerke: 'klar', merke: 'k6StoppFoto', dann: [['erzaehler', 'Du sagst ihn nur im Kopf. Er passt.']] },
      { t: '„Stopp. Erst fragen, dann umarmen.“', staerke: 'klar', merke: 'k6StoppUmarmen', dann: [['erzaehler', 'Du sagst ihn nur im Kopf. Er passt.']] },
      { t: '„Stopp. Nicht vor allen.“', staerke: 'klar', merke: 'k6StoppAllen', dann: [['erzaehler', 'Du sagst ihn nur im Kopf. Er passt.']] },
      { t: '(Weiß ich noch nicht.)', dann: [['kaya', 'Auch okay. Er kommt, wenn du ihn brauchst.']] },
    ] },
    { tu: 'n6_schluss' },
  ],
};

export const tunN6 = (c) => { const T6 = {
  // Herr Kuedes fragt zuerst Mila. Er erklärt nicht lange: Es ist ihr Gesicht.
  // Jugend-Panel K6 R2: kein Vortrag nach dem Video – Herr Kuedes braucht etwas von dir: wer, wann. Was du mitbringst, entscheidet die Uhr.
  kuedes: (spaet) => {
    const m = c.S.merke;
    return [{ blende: 'Büro von Herrn Kuedes · ' + (spaet ? '12:35' : '12:24') },
      ['kaya', 'Mila. Was soll jetzt passieren?'],
      ['mila', 'Dass es weg ist. Überall.'],
      ['kaya', '(zu dir) Dann brauch ich: wer und wann.'],
      { fest: true, wahl: [
        ...(m.k6VBeleg ? [{ t: '📸 „Screenshot: tom, 12:00.“', merke: 'k6WerBeleg', staerke: 'hilfe', dann: [['kaya', 'Das reicht. Ich ruf jetzt an.']] }] : []),
        { t: '„tom hat’s gepostet.“', merke: 'k6WerTom', dann: [['kaya', 'tom hätte das nicht posten dürfen. Ich hol ihn.']] },
        { t: '„Luca hat gefilmt. Mittwoch.“', merke: 'k6WerLuca', dann: [['kaya', 'Es ist nicht sein Video. Es ist ihr Gesicht.']] },
        { t: '„Weiß ich nicht genau.“', merke: 'k6WerWeiss', dann: [['kaya', 'Dann such ich. Das dauert.']] },
      ] },
      { tu: 'n6_nachKuedes' }];
  },
  // Was die Spielfigur am Mittwoch zu Mila gesagt hat, sagt Mila am Freitag selbst (Jugend-Panel K6 R2: sonst war die Wahl egal)
  neinEcho: () => {
    const m = c.S.merke;
    return m.k6NeinKlar ? [['mila', 'Ich hab Nein gesagt. Klar.']] : m.k6NeinIgnoriert ? [['mila', 'Er hat’s gehört. Und weitergefilmt.']]
      : m.k6NeinLeise ? [['mila', 'Mein Nein am Mittwoch? Im Video hört man’s. Zweimal.']] : [];
  },
  // Was Mila am Donnerstag (durch ihre Augen) geantwortet hat – Herr Kuedes sagt, an wem es liegt
  donnerstag: () => {
    const m = c.S.merke;
    return [...(m.k6MilaLassMal && !m.k6DoGefragt ? [['mila', 'Ich hab „haha“ geschrieben. Mir war schlecht dabei.']] : []),
      ['kaya', m.k6MilaNein ? '„Nein. Lösch es.“ Klarer geht’s nicht. Das liegt nicht an dir, Mila.'
        : m.k6MilaLassMal ? '„haha lass mal“ ist kein Ja. Das liegt nicht an dir, Mila.'
        : m.k6MilaScreen ? 'Dein Screenshot hilft, Mila. Und: Das liegt nicht an dir.'
        : m.k6MilaStill ? 'Nicht antworten ist okay. Das liegt nicht an dir, Mila.' : 'Mila, das liegt nicht an dir.']];
  },
  zahl: (stopp, vorne = '', uhr = '12:41') => {
    const m = c.S.merke, n = bisZuletzt(m, stopp); m.k6Gesehen = n; m.k6GesehenStopp = stopp;
    // Schon gelöscht (überall gestoppt)? Dann nicht „am Nachmittag“ (Fach + Jugend K6 R1: Lauf C)
    const G = (m.k6Video && m.k6Video.gruppen) || {}, laeuft = Object.values(G).some((g) => g.da && g.aktiv);
    return [stopp === 'jetzt' ? ['erzaehler', vorne + uhr + '. Das Video ist weg. Überall. ' + n + ' Leute haben es gesehen.']
      : !laeuft && m.k6Video ? ['erzaehler', vorne + 'Das Video war da schon weg. ' + n + ' Leute haben es gesehen.']
      : stopp === 'spaet' ? ['erzaehler', vorne + (uhr !== '12:41' ? 'Um ' + uhr + ' ist das Video weg. ' : 'Am Nachmittag ist das Video weg. ') + n + ' Leute haben es bis dahin gesehen.']
      : ['erzaehler', vorne + 'Die App löscht es nach vier Stunden. ' + n + ' Leute haben es bis dahin gesehen.']];
  },
}; return ({
  // Dienstag: Jo kommt an deinen Tisch – außer er hat am Montag dichtgemacht
  n6_joFrage: () => {
    const m = c.S.merke;
    const gepostet = [{ handy: { wer: '7P2 🏫', wann: '12:20', chat: [{ wer: 'Du', t: '🎤 Sprachnachricht · 0:07' }, { wer: 'sami.lu', t: 'JO???' }, { wer: 'unbekannt_09', t: 'oder beide' }, { wer: '7P2', t: '+ 54 neue Nachrichten' }] } },
      ['du', '(denkt) Jetzt reden alle nur über Jo.'], { handy: null }];
    const zuKuedes = [{ blende: 'Büro von Herrn Kuedes · 12:40' }, ['kaya', 'Ich red mit Jo. Heute noch. Und bevor ich etwas mache, sag ich es dir.'],
      ...(m.k6Datei ? [['kaya', 'Von wem hast du die Sprachnachricht?'], { wahl: [
        { t: '„Sag ich nicht.“', merke: 'k6DarioGeheim', dann: [['kaya', 'Okay. Dann frag ich nicht weiter.']] },
        { t: '„Von Dario.“', merke: 'k6DarioGesagt', dann: [['kaya', 'Danke. Ich sag ihm nicht, dass du’s warst.']] },
      ] }] : [])];
    if (m.k6JoZu) return [['du', '(denkt) Jo sitzt allein. Er schaut nicht her.'], { wahl: [
      ...(m.k6Datei ? [{ t: '(Jos Nachricht reinstellen.)', merke: 'k6DateiGepostet', herz: { jo: -3 }, dann: gepostet }] : []),
      { t: '(Zu Herrn Kuedes gehen.)', merke: 'k6KuedesDatei', staerke: 'hilfe', dann: zuKuedes },
      { t: '(Nichts tun.)', merke: 'k6BeweisStill', dann: [] },
    ] }];
    return [{ hin: { jo: 'du' } }, ['jo', '(stellt sein Tablett ab, leise) Ich schreib in den Chat, dass es meine Idee war.'], ['jo', 'Da kommt „hinten links“ vor. Darf ich?'],
      { fest: true, wahl: [
        { t: '„Ja. Mit meinem Namen.“', merke: ['k6JoSelbst', 'k6JoMitName'], staerke: 'klar', herz: { jo: 2 }, dann: [
          { handy: { wer: '7P2 🏫', wann: '12:21', chat: [{ wer: 'Jo', t: 'das mit dem screenshot war meine idee. über hinten links. war dumm. gebaut hab ich nix.' }] } }, ['jo', '(setzt sich wieder) Danke, dass ich durfte.'], { handy: null }] },
        { t: '„Ja. Aber ohne mich.“', merke: ['k6JoSelbst', 'k6JoOhneName'], staerke: 'klar', herz: { jo: 2 }, dann: [
          { handy: { wer: '7P2 🏫', wann: '12:21', chat: [{ wer: 'Jo', t: 'das mit dem screenshot war meine idee. war dumm. gebaut hab ich nix.' }] } }, ['jo', '(setzt sich wieder) Ohne dich. Okay.'], { handy: null }] },
        { t: '„Nein. Erst zu Kuedes.“', merke: 'k6KuedesDatei', staerke: 'hilfe', dann: [['jo', 'Okay. … Kommst du mit?'], ...zuKuedes] },
        ...(m.k6Datei ? [{ t: '„Ich stell deine Nachricht rein.“', merke: 'k6DateiGepostet', herz: { jo: -3 }, dann: [['jo', '(starrt dich an) Das ist meine Stimme.'], ...gepostet] }] : []),
      ] }];
  },
  // Nach „wer, wann?“: höchstens zwei Sätze, dann die Uhr
  n6_nachKuedes: () => {
    const m = c.S.merke, uhr = m.k6WerBeleg ? '12:31' : m.k6WerWeiss ? '13:30' : '12:41';
    return [...T6.neinEcho(), ...T6.donnerstag(),
      ...(m.k6Weggeschaut ? [['kaya', '(zu dir) Mittwoch warst du wie eingefroren. Heute nicht.']] : []),
      ...T6.zahl(m.k6WerWeiss ? 'spaet' : 'jetzt', '', uhr)];
  },
  n6_joFolge: () => {
    const m = c.S.merke;
    if (m.k6JoZu) return [['erzaehler', 'Jo wirft weiter. Er trifft nicht mehr.']];
    return [...(m.k6JoGesagt ? [['jo', '(sehr leise) Ich hab nicht gedacht, dass das einer ernst nimmt.']] : []), ['erzaehler', 'Jo wirft. Diesmal trifft er. Er freut sich nicht.']];
  },
  n6_kenan: () => (c.S.merke.k6Eingegriffen ? [['kenan', 'Lass, Luca. Reicht.']] : [['erzaehler', 'Kenan sagt nichts. Er schaut weg. Wie alle.']]),
  n6_video: () => { const l = laenge6(c.S.merke); return [['erzaehler', 'Das Video gibt es trotzdem. ' + (l === '0:10' ? 'Zehn' : l === '0:25' ? 'Fünfundzwanzig' : 'Vierzig') + ' Sekunden lang.']]; },
  // Donnerstag 7:50: Lucas Nachricht an Mila (die Länge kommt vom Mittwoch)
  n6_milaHandy: () => { const l = laenge6(c.S.merke); return [{ handy: { wer: 'Luca → Mila', wann: '7:50', chat: [{ wer: 'Luca', t: 'hab noch ' + l.replace('0:', '') + ' sek von dir 😂' }, { wer: 'Luca', t: 'soll ich’s posten?' }] } }]; },
  // Nach dem Video: mit Mila zu Herrn Kuedes – oder Mila auf der Mauer (zweite Chance: „Was brauchst du?“)
  n6_nachVideo: () => {
    const m = c.S.merke;
    if (m.k6VMitMila) return T6.kuedes(false);
    const z = [{ hin: { mila: [-16.0, 13.6, -2.6] } }, ['erzaehler', 'Mila sitzt auf der Mauer. Das Handy liegt neben ihr. Display nach unten.']];
    const geschrieben = m.k6VKommentar || m.k6VLucaBeleidigt || m.k6VOeffentlichMila, okayFrage = !m.k6VGeteilt && !m.k6VAnMila && !m.k6VOeffentlichMila && m.k6VKommentar && !m.k6VGefragt;
    if (m.k6VOkayMila) z.push(['mila', m.k6VGeteilt ? 'Du hast es gelöscht. In der Ecke. Danke.' : 'Du hast es gelöscht. Danke.']);
    else if (m.k6VGeteilt) z.push(['mila', 'Du hast es weitergeleitet. In die Ecke.']);
    else if (m.k6VLucaBeleidigt) z.push(['mila', '„Ekelhaft.“ Dann wollten alle das Video sehen.']);
    else if (m.k6VAnMila) z.push(['mila', 'Du hast es mir geschickt. Ich hatte es schon.']);
    else if (m.k6VOeffentlichMila) z.push(['mila', '„@Mila alles okay?“ Vor allen. Jetzt haben alle zu mir geschaut.']);
    else if (m.k6VKommentar && !m.k6VGefragt) z.push(['mila', 'Danke für den Satz im Chat.'], ['mila', 'Nächstes Mal: frag mich kurz. Okay?']);
    else if (m.k6VGefragt && geschrieben) z.push(['mila', 'Du hast gefragt. Und dann doch geschrieben.']);
    else if (m.k6VGefragt) z.push(['mila', 'Du hast gefragt. Das hat heute sonst keiner.']);
    else if (m.k6VLucaDm) z.push(['mila', 'Du hast Luca geschrieben. Gelöscht hat er nichts.']);
    else if (m.k6VAngesehen) z.push(['mila', '(hält ihr Handy hoch) „Gesehen von: … und dir.“']);
    else z.push(['mila', '(schaut dich an) Du hast es auch gesehen. Oder?']);
    z.push(...T6.neinEcho());
    z.push({ wahl: [
      ...(okayFrage ? [{ t: '„Okay.“', merke: 'k6MilaOkay', staerke: 'lesen', herz: { mila: 1 }, dann: [['mila', 'Gut.'], { tu: 'n6_milaAllein' }] }] : []),
      { t: '„Was brauchst du?“', merke: 'k6MilaGefragtSpaet', staerke: 'lesen', herz: { mila: 2 }, dann: [['mila', '(atmet aus) Dass es weg ist. Kommst du mit? Zu Kuedes.'], { tu: 'n6_kuedesSpaet' }] },
      ...(m.k6VGeteilt || m.k6VAnMila || m.k6VOeffentlichMila ? [{ t: '„Sorry. Ich wollte helfen.“', merke: 'k6MilaSorry', herz: { mila: 1 },
        dann: [['mila', m.k6VGeteilt ? 'Ich weiß. Aber drauf bin ich. Nicht Luca.' : 'Ich weiß. Frag mich das nächste Mal. Kurz.'], { tu: 'n6_milaAllein' }] }] : []),
      { t: '„Ist doch nicht so schlimm.“', merke: 'k6MilaKleingeredet', herz: { mila: -2 }, dann: [['mila', '(steht auf) Für dich nicht.'], { tu: 'n6_milaAllein' }] },
      { t: '(Neben ihr sitzen.)', merke: 'k6MilaDaneben', herz: { mila: 1 }, dann: [['erzaehler', 'Ihr sitzt da. Nach einer Weile atmet sie aus. Lange.'], { tu: 'n6_milaAllein' }] },
    ] });
    return z;
  },
  n6_kuedesSpaet: () => T6.kuedes(true),
  // Mila geht ohne dich zu Herrn Kuedes. Was er sagt, erzählt sie dir danach. Hilfe gibt es für alle (Fach K6 R1/R2): an der Tür, ein Satz.
  n6_milaAllein: () => {
    const m = c.S.merke, dabei = m.k6MilaOkay || m.k6MilaDaneben || m.k6MilaSorry;
    const sie = m.k6MilaNein ? 'Er sagt: Klarer als mein Nein geht’s nicht. Es liegt nicht an mir.' : m.k6MilaLassMal ? 'Er sagt: „haha lass mal“ ist kein Ja. Es liegt nicht an mir.'
      : m.k6MilaScreen ? 'Mein Screenshot hilft, sagt er. Es liegt nicht an mir.' : m.k6MilaStill ? 'Er sagt: Nicht antworten ist okay. Es liegt nicht an mir.' : 'Er sagt: Es liegt nicht an mir.';
    return [{ blende: 'Freitag · 13:10' }, ...T6.zahl(m.k6VApp ? 'app' : 'spaet', dabei ? 'Mila klopft bei Herrn Kuedes. Du wartest ein paar Meter weg. ' : 'Mila geht allein zu Herrn Kuedes. '),
      ...(m.k6VBeleg ? [['mila', '(dreht sich um) Schick mir deinen Screenshot. Den nehm ich mit.']] : []),
      ['mila', '(kommt raus) ' + sie],
      ['kaya', m.k6Weggeschaut ? '(an der Tür, zu dir) Mittwoch warst du wie eingefroren. Das passiert. Hilfe holen geht immer.' : '(an der Tür, zu dir) Wenn was ist: zu mir. Oder ins SePAS.']];
  },
  // Wer mit dir war (kommt in Kapitel 7 in der Montage und in Kapitel 10 zurück)
  n6_fuer: () => {
    const m = c.S.merke, s = new Set(m.k6Helfer || []);
    if (m.k6VGefragt || m.k6MilaGefragtSpaet || m.k6Stopp || m.k6Komm || m.k6Linse) s.add('mila');
    if (m.k6VNoahGefragt) s.add('noah');
    s.delete('ayla');
    m.k6Fuer = [...s];
    return [];
  },
  // Samstag 20:14 (Jugend-Panel K6 R1, statt „38 neue Nachrichten“): Es ist wieder da. Kein Lob vom Erzähler. Danach still: dein Stopp (Fach K6 R2, Heft #05 St. 4).
  n6_handy: () => {
    const m = c.S.merke, l = laenge6(m);
    return [{ blende: 'Samstag · 20:14 · abends' },
      { handy: { wer: 'unbekannt_09', wann: '20:14', chat: [{ wer: 'unbekannt_09', t: '▶ Mila · ' + l }, { wer: 'unbekannt_09', t: 'hast du das schon? 😂' }] } },
      { fest: true, wahl: [
        { t: '📸 Screenshot. Dann stumm.', merke: 'k6SaScreen', staerke: 'ruhig', dann: [{ handy: { wer: 'unbekannt_09', wann: '20:15', chat: [{ wer: '📸', t: 'Screenshot gespeichert.' }, { wer: '🔕', t: 'Stumm bis Montag.' }] } }, { handy: null }, ['erzaehler', 'Dein Handy ist still. Bis Montag.']] },
        { t: '(Anschauen.)', merke: 'k6SaAngesehen', dann: [{ handy: { wer: 'unbekannt_09', wann: '20:15', chat: [{ wer: '👁', t: 'Gesehen von: … und dir.' }] } }, { handy: null }] },
        { t: '„Lösch das. Sie wollte nicht.“', merke: 'k6SaLoesch', staerke: 'klar', dann: [{ handy: { wer: 'unbekannt_09', wann: '20:16', chat: [{ wer: 'Du', t: 'lösch das. sie wollte nicht.' }, { wer: 'unbekannt_09', t: 'was geht dich das an 😂' }] } }, { handy: null }] },
        { t: '(An Ayla weiterleiten.)', merke: 'k6SaAyla', dann: [{ handy: { wer: 'Ayla (privat)', wann: '20:17', chat: [{ wer: 'Ayla', t: 'warum schickst du mir das?' }] } }, { handy: null }] },
      ] },
      ['du', '(denkt) Und ich? Wo brauch ich diese Woche ein Stopp?'],
      { wahl: [
        { t: '„Wenn wer mein Handy nimmt.“', merke: 'k6PlanHandy', dann: [] },
        { t: '„Bei einem Spitznamen.“', merke: 'k6PlanName', dann: [] },
        { t: '„Wenn wer drängelt.“', merke: 'k6PlanDraengeln', dann: [] },
        { t: '„Online.“', merke: 'k6PlanOnline', dann: [] },
      ] },
    ];
  },
  n6_schluss: () => [
    { szene: 'stempel', def: { modul: 'Modul 5 · Kommunikation und Grenzen', titel: 'Klar gesagt',
      gelernt: ['Worte, Stimme, Körper – und wem man glaubt', 'Wort-Schere: Giftwort raus, Wunsch dazu', '„Ist das okay?“ – vorher fragen', 'Stopp sagen – von unklar bis klar', 'Ein Stopp hören und „Okay“ sagen'],
      mission: 'Sag diese Woche einmal deinen Stopp-Satz. Und wenn jemand dir Stopp sagt: „Okay.“ Ohne Diskussion.' }, folgen: {} },
  ],
}); };

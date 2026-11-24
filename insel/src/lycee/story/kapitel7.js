// Storyline 7e „@annexe.cam“ (nach der Storyline von Fable) – Kapitel 7 „Wer bleibt?“, Juni, nach einem Zeitsprung.
// Verdecktes Thema: Wenn es schwierig wird (Konflikte, Gruppendruck, Mobbing und Zivilcourage).
// Gruppendruck klingt freundlich: „Du filmst nur.“ Zivilcourage ist selten eine Rede. Meistens ist sie ein Stuhl,
// den man neben jemanden stellt – und sie kostet etwas. Zwischen Nichtstun und Zuschlagen gibt es etwas Drittes.
// Spuren: Mila legt die Zeitleiste: Streifen bis Dezember, kein Emoji ab Dezember – „Das sind zwei. Oder einer hat aufgehört.“
import { S7_STREIT, S7_TRAUER_FAMILIE } from './skills-j1.js';
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, luca: { id: 'luca', name: 'Luca', farbe: '#7a6fb0' }, kenan: { id: 'kenan', name: 'Kenan', farbe: '#4a8f7a' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, chiara: { id: 'chiara', name: 'Chiara', farbe: '#3fa66b' }, yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' } };

export const SCHRITTE_N7 = [
  { id: 'k7_montage', kap: 7, tag: 'Montag', uhr: 7.42, titel: 'Wer bleibt?', ziel: 'Dario sitzt auf der Bank. Er sieht müde aus.', marker: 'dario',
    start: { teleport: 'busAnkunft', gespraech: 'n7_montage' },
    leute: { dario: [-21.5, 41.6, -1.6, 'sitzt'], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n7_dario' } },
  { id: 'k7_skills', kap: 7, tag: 'Montag', uhr: 9.9, neben: 'skills', titel: 'Skills: Welches Tier bist du im Streit?', ziel: 'Aula. Auf dem Boden liegen fünf Tierbilder.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], mesenberg: [-13.54, -65.16, -0.50], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n7_skills' } },
  { id: 'k7_ecke', kap: 7, tag: 'Montag', uhr: 10.08, titel: 'Du filmst nur', ziel: 'Skate-Ecke. Luca winkt dich her.', marker: 'luca',
    start: { teleport: 'eingangHof' },
    leute: { luca: [-34.4, 11.4, 1.9], kenan: [-35.6, 13.2, 0.6, 'sitzt'], dario: [-33.4, 12.4, 1.2] },
    fertig: { reden: 'luca', gespraech: 'n7_ecke' } },
  { id: 'k7_kantine', kap: 7, tag: 'Dienstag', uhr: 12.17, titel: 'Die Tüte', ziel: 'Kantine. An Noahs Tisch ist es plötzlich still.', marker: 'noah',
    start: { teleport: 'kantineTuer' },
    leute: { noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], luca: [12.4, -12.6, -2.2], yusuf: [16.65, -14.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], ayla: [16.65, -10.1, Math.PI / 2, 'sitzt'], mila: [22.55, -10.1, Math.PI / 2, 'sitzt'], kremer: [26.8, -9, -Math.PI / 2] },
    fertig: { reden: 'noah', gespraech: 'n7_kantine' } },
  { id: 'k7_turm', kap: 7, tag: 'Dienstag', uhr: 16.5, titel: 'Der Turm', ziel: 'Jugendhaus. Noah ist bei seinem Turm.', marker: 'noah',
    start: { teleport: 'jugendhaus' },
    leute: { noah: [14, 119, Math.PI] },
    fertig: { reden: 'noah', gespraech: 'n7_turm' } },
  { id: 'k7_zeitleiste', kap: 7, tag: 'Donnerstag', uhr: 12.5, titel: 'Zwei Farben', ziel: 'CDI. Mila hat neun Monate Posts ausgedruckt.', marker: 'mila',
    start: { teleport: 'cdi', gespraech: 'n7_fach' },
    leute: { mila: [-6.2, -21.6, 0.4, 'sitzt'] },
    fertig: { reden: 'mila', gespraech: 'n7_zeitleiste' } },
  { id: 'k7_ende', kap: 7, tag: 'Freitag', uhr: 10.0, neben: 'skills', titel: 'Skills: Spaß, Streit oder Mobbing?', ziel: 'Letzte Skills-Stunde der Woche. Aula.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n7_ende' } },
  { id: 'k7_video', kap: 7, tag: 'Freitag', uhr: 15.5, titel: 'Das Video', ziel: 'Hof. Ben starrt auf sein Handy.', marker: 'ben',
    start: { teleport: 'eingangHof' },
    leute: { ben: [3.6, 16.4, 2.6, 'handy'], jo: [5.2, 17.6, -2.4, 'handy'] },
    fertig: { reden: 'ben', gespraech: 'n7_video' } },
];

// ---------- Montag 10:05: Lucas Angebot (Druck-Runde) ----------
const DRUCK7 = {
  wo: 'Skate-Ecke · 10:05', gruppe: { luca: F.luca, jemand: { id: 'jemand', name: 'Einer aus der Ecke', farbe: '#7a7a7a' }, dario: F.dario }, zeit: 9,
  anker: 'Füße auf den Boden. Ausatmen. Dein Satz.',
  runden: [
    { wer: 'luca', sagt: 'Du filmst nur. Mehr nicht.', karten: [
      { t: '„Und wenn ich nicht will?“', art: 'frage', druck: 4, ich: 4, antwort: 'Dann bleibst du, wo du bist. Allein.' },
      { t: '„Warum ich?“', art: 'frage', druck: 2, ich: 2, antwort: 'Weil dir keiner was tut. Du bist schon unten.' },
    ] },
    { wer: 'jemand', sagt: 'Ist doch nichts dabei.', karten: [
      { t: '„Für Noah schon.“', art: 'nein', druck: -6, ich: 12, wer: 'luca', antwort: '(zuckt mit den Schultern) Noah merkt das gar nicht.' },
      { t: '(Schweigen.)', art: 'ausrede', druck: 6, ich: -4, antwort: 'Siehst du.' },
    ] },
    { wer: 'jemand', sagt: 'Jeder war mal dran. Du auch.', karten: [
      { t: '„Ja. Ich war dran. Deshalb nicht.“', art: 'nein', druck: -8, ich: 14, antwort: '(schaut weg)' },
      { t: '„Mal sehen.“', art: 'ausrede', druck: 8, ich: -6, wer: 'luca', antwort: 'Na also.' },
    ] },
  ],
};

// ---------- Dienstag 12:10: Die Tüte (Mut-Balken, Entscheidung B) ----------
const MUT_KANTINE = (m) => {
  const handy = m.k7MalSehen || m.k7Okay;
  return {
    wo: 'Kantine · 12:10', titel: 'Hinschauen',
    situation: handy ? 'Luca hat dir einen Platz freigehalten. Gute Sicht. Dein Handy ist in deiner Hand. Auf Noahs Tablett liegt eine Geschenktüte. Acht Handys sind oben.'
      : 'Auf Noahs Tablett liegt eine Geschenktüte. Darin ein Baustein-Set, „ab 3 Jahren“. Acht Handys sind oben. Noah steht da wie du im September.',
    dauer: 5,
    stufen: [
      { ab: 0, optionen: [{ key: 'sitzen', t: '(Sitzen bleiben.)' }, ...(handy ? [{ key: 'filmen', t: '(Filmen. Wie besprochen.)' }] : [])] },
      { ab: 0.35, optionen: [{ key: 'kremer', t: '(Zu Frau Kremer an die Theke gehen.)' }] },
      { ab: 0.65, optionen: [{ key: 'tuete', t: '(Die Tüte von seinem Tablett nehmen.)' }] },
      { ab: 0.9, optionen: [{ key: 'setzen', t: '(Dich zu Noah setzen.)' }] },
    ],
  };
};

// ---------- Mittwoch 22:40: die unbekannte Nummer, nach fünf Monaten ----------
const NUMMER7 = (m) => ({
  titel: 'Unbekannte Nummer', mitglieder: 2, dauer: 22,
  nachrichten: [
    { nach: 0.6, wer: 'Unbekannt', text: 'ich glaub dir.' },
    ...(m.zeichnungDarioGezeigt ? [{ nach: 2.8, wer: 'Unbekannt', text: 'du hast es ihm gezeigt. da hab ich aufgehört.' }] : []),
    { nach: 5.2, wer: 'Unbekannt', text: 'ich kann nicht reden. aber ich kann zeichnen.' },
  ],
  aktionen: [
    { id: 'wer', t: '„wer bist du?“', symbol: '❓', setzt: 'wer', ich: 'wer bist du?', folgen: [{ nach: 2, system: true, text: 'Gesehen.' }] },
    { id: 'offen', t: '„was hast du gesehen?“', symbol: '👀', setzt: 'offen', ich: 'was hast du gesehen?', folgen: [{ nach: 3.2, wer: 'Unbekannt', text: 'genug. von weit weg. wie immer.' }] },
    { id: 'danke', t: '„danke.“', symbol: '🙂', setzt: 'danke', ich: 'danke.', folgen: [{ nach: 3, wer: 'Unbekannt', text: '.' }] },
    { id: 'shot', t: 'Screenshot machen', symbol: '📸', setzt: 'beweis', sys: 'Screenshot gespeichert.' },
  ],
});

// ---------- Donnerstag 12:30: Milas Zeitleiste (Spuren-Wand) ----------
const ZEITLEISTE = {
  wo: 'CDI · neun Monate Posts', helfer: F.mila,
  frage: 'Mila legt die Ausdrucke in eine Reihe. September bis Juni. „Zwei Fragen. Streifen ja oder nein. Emoji ja oder nein.“',
  spuren: [
    { id: 'streifen', sy: '▮', t: 'September bis November: der helle Streifen unten links. Auf jedem Foto.', kurz: 'Streifen bis Nov.', echt: true,
      kommentar: ['Fakt. Immer dasselbe Handy.', 'Doch. Das ist die erste Farbe.'] },
    { id: 'streifenWeg', sy: '▯', t: 'Ab Dezember: kein Streifen mehr. Nie wieder.', kurz: 'ab Dez. kein Streifen', echt: true,
      kommentar: ['Fakt. Anderes Handy. Oder andere Hand.', 'Doch! Genau da ändert sich etwas.'] },
    { id: 'emoji', sy: '😂', t: 'Bis November: immer ein Emoji. „haha“, „💀“.', kurz: 'Emoji bis Nov.', echt: true,
      kommentar: ['Fakt. Die zweite Farbe.', 'Doch. Das zählt.'] },
    { id: 'emojiWeg', sy: '.', t: 'Ab Dezember: kein Emoji. Punkt am Ende. Und manchmal „lowkey“.', kurz: 'ab Dez. Punkt + „lowkey“', echt: true,
      kommentar: ['Fakt. Ein anderer Ton.', 'Doch! Wer schreibt „lowkey“? Hör hin.'] },
    { id: 'follower', sy: '📈', t: 'Der Account hat jetzt 2.100 Follower.', kurz: '2.100 Follower', echt: false,
      kommentar: ['Raus. Groß sagt nichts über wer.', 'Viele Follower sind kein Hinweis auf irgendwen.'] },
    { id: 'lina', sy: '✏️', t: 'Lina war bei fast jedem Foto in der Nähe.', kurz: 'Lina in der Nähe', echt: false,
      kommentar: ['Raus. Lina ist überall, wo man zeichnen kann. Das ist alles.', 'Das ist wieder Jos Gerücht. Weg damit.'] },
  ],
  frageEnde: 'Zwei Farben. Was heißt das?',
  schluesse: [
    { key: 'zwei', t: 'Das sind zwei. Oder einer hat aufgehört.', braucht: ['streifenWeg', 'emojiWeg'], antwort: 'Genau das. Der Erste mit dem Kratzer. Und seit Dezember jemand mit „lowkey“.' },
    { key: 'einer', t: 'Einer. Mit neuem Handy.', braucht: ['streifenWeg'], antwort: 'Möglich. Aber warum schreibt er dann anders?' },
    { key: 'lina', t: 'Lina.', braucht: ['lina'], antwort: '(legt das Heft weg) Nein. Wir machen keine Gerüchte mehr.' },
    { key: 'offen', t: 'Ich weiß es nicht.', braucht: [], antwort: 'Dann schau noch mal hin. Langsam.' },
  ],
};

// ---------- Freitag 15:30: das Video ----------
const VIDEO = {
  titel: '5 Chats', mitglieder: 0, dauer: 18,
  nachrichten: [
    { nach: 0.4, system: true, text: 'Fünf Leute schicken dir gleichzeitig dasselbe Video.' },
    { nach: 1.4, wer: 'jo_7p2', bild: 'Mme Tidderich am Pult. Sie schaut in die Kamera.', text: '„Die 7P2? Meine schlimmste Klasse bisher. Ich zähl die Tage.“' },
    { nach: 5, wer: 'Ben (privat)', text: 'das ist sie. oder?' },
    { nach: 8, wer: 'Ben (privat)', text: 'ihre stimme. ihr gesicht.' },
    { nach: 11, system: true, text: '400 Aufrufe' },
  ],
  aktionen: [
    { id: 'mila', t: 'An Mila weiterleiten. „Zum Prüfen.“', symbol: '↪️', setzt: 'geteilt', ich: 'zum prüfen.', folgen: [{ nach: 2.5, wer: 'Mila (privat)', text: 'Hab ich schon. Fünfmal.' }] },
    { id: 'nicht', t: 'Nicht weiterleiten', symbol: '✋', setzt: 'nicht', sys: 'Du legst das Handy mit dem Display nach unten.', ende: true },
  ],
};

export const GESPRAECHE_N7 = {
  // Montag 7:25: Zeitsprung. Vier Monate, je ein Satz – je nach deinen Freundschaften.
  n7_montage: [
    { tu: 'n7_monate' },
    { blende: 'Juni' },
    ['erzaehler', 'Juni. Hell und warm. Um 7:25 ist die Sonne schon da.'],
    ['fahrer', 'Dein Freund sitzt schon da, wenn ich die erste Runde fahre.'],
    ['erzaehler', 'Er meint Dario.'],
  ],
  n7_dario: [
    ['dario', 'Ich schlaf nur schlecht.'],
    { wahl: [
      { t: '„Seit wann?“', herz: { dario: 1 }, dann: [['dario', 'Weiß nicht. Lange.'], ['erzaehler', 'Er dreht das Brett auf dem Schoß. Einmal. Zweimal.']] },
      { t: '„Du siehst echt fertig aus.“', dann: [['dario', 'Danke.'], ['erzaehler', 'Er zieht die Kapuze hoch. Im Juni.']] },
      { t: '(Nichts sagen. Neben ihm sitzen.)', staerke: 'warten', herz: { dario: 1 }, dann: [['erzaehler', 'Er lehnt den Kopf an die Scheibe vom Wartehäuschen. Er macht die Augen zu.']] },
    ] },
  ],
  n7_skills: [
    ['erzaehler', 'Aula. Auf dem Boden liegen fünf Tierbilder. Herr Kuedes wartet, bis alle sitzen.'],
    { szene: 'skillsStunde', id: 's7_streit', def: S7_STREIT, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'lesen', merke: 's7Streit' }, weiter: { merke: 's7Streit' } } },
    { tu: 'n7_tierWechsel' },
  ],
  // Montag 10:05 (Fable, Schlüsselszene K7): Lucas Angebot – Entscheidung A
  n7_ecke: [
    ['erzaehler', 'Montag. 10:05. An der Skate-Ecke riecht es nach heißem Asphalt.'],
    ['luca', 'Hinten links. Komm mal her.'],
    ['erzaehler', 'Kenan sitzt auf der Rampe. Dario hält sein Brett fest.'],
    ['luca', 'Fünf Monate ohne Gruppe. Ist lang, oder?'],
    { wahl: [
      { t: '„Geht.“', dann: [] },
      { t: '„Was willst du?“', dann: [] },
      { t: '(Nichts sagen.)', dann: [] },
    ] },
    ['luca', 'Ich kann das ändern. Heute noch.'],
    ['luca', 'Morgen, Kantine. Jemand bringt Noah ein Geschenk.'],
    { szene: 'druck', id: 'druck7', def: DRUCK7, ausgang: (r) => (r.ich >= r.druck ? 'stark' : 'schwer'), folgen: { stark: { staerke: 'ruhig' }, schwer: {} } },
    { fest: true, wahl: [
      { t: '„Nein.“', staerke: 'klar', herz: { noah: 1 }, merke: 'k7Nein', dann: [] },
      { t: '„Nein. Aber ich bleib hier stehen.“', staerke: 'mut', herz: { noah: 1, kenan: 1 }, merke: ['k7Nein', 'k7NeinBleiben'], dann: [] },
      { t: '„Mal sehen.“', merke: 'k7MalSehen', dann: [] },
      { t: '„Okay.“', herz: { noah: -1 }, merke: 'k7Okay', dann: [] },
    ] },
    ['luca', 'Überleg’s dir. Lowkey deine letzte Chance.'],
    ['erzaehler', 'Dario schaut auf seine Rollen. Sie sind sauber. Wie neu.'],
    { tu: 'n7_kenan' },
    ['luca', 'Ich zwing keinen. Ich merk’s mir nur.'],
    { wahl: [
      { t: '„Dario. Kommst du mit?“', herz: { dario: 2 }, merke: 'k7DarioGefragt', dann: [
        ['erzaehler', 'Dario hebt den Kopf. Seine Augen sind rot vor Müdigkeit.'],
        ['dario', 'Ich … bleib noch.'] ] },
      { t: '(Gehen.)', dann: [] },
      { t: '(Bleiben, bis es klingelt.)', merke: 'k7Geblieben', dann: [] },
    ] },
    ['erzaehler', 'Es klingelt. Keiner bewegt sich zuerst.'],
  ],
  // Dienstag 12:10: Die Tüte – Entscheidung B (und Yusuf)
  n7_kantine: [
    ['erzaehler', 'Dienstag. 12:10. Auf Noahs Tablett liegt eine Geschenktüte.'],
    ['erzaehler', 'Darin ein Baustein-Set. „Ab 3 Jahren.“'],
    ['luca', '(laut) Für deinen Turm, Noah. Damit er endlich fertig wird.'],
    ['erzaehler', 'Acht Handys sind oben. Frau Kremer schaut von der Theke auf.'],
    { szene: 'mut', id: 'mutKantine', def: (m) => MUT_KANTINE(m), ausgang: (r) => r.key,
      folgen: {
        setzen: { staerke: 'mut', herz: { noah: 3, ayla: 1, mila: 1 }, merke: 'k7Gesetzt', dann: [
          ['erzaehler', 'Du stellst dein Tablett neben Noahs. Du setzt dich.'],
          ['erzaehler', 'Acht Handys. Jetzt zeigen sie auch auf dich.'],
          ['erzaehler', 'Dann kommt Ayla mit ihrem Tablett. Dann Mila.'],
          ['erzaehler', 'Ben steht zwischen zwei Tischen.'] ] },
        tuete: { staerke: 'mut', herz: { noah: 1, luca: -1 }, merke: 'k7Tuete', dann: [
          ['erzaehler', 'Du nimmst die Tüte von Noahs Tablett. Du wirfst sie in den Müll.'],
          ['luca', 'Hey! Das war ein Geschenk!'],
          ['erzaehler', 'Noah schaut auf sein Tablett. Nicht auf dich.'] ] },
        kremer: { staerke: 'hilfe', herz: { noah: 1 }, merke: 'k7Kremer', dann: [
          ['kremer', 'Ich hab’s gesehen. Ich komm.'],
          ['erzaehler', 'Die Handys gehen runter. Eins nach dem anderen.'] ] },
        sitzen: { merke: 'k7Sitzen', dann: [['erzaehler', 'Du bleibst sitzen. Dein Essen wird kalt.']] },
        filmen: { herz: { noah: -4 }, merke: 'k7Gefilmt', dann: [
          ['erzaehler', 'Du hebst das Handy. Noah schaut direkt in deine Linse.'],
          ['erzaehler', 'Er sagt nichts. Er schaut nur.'] ] },
      } },
    ['erzaehler', 'Yusuf schiebt seinen Stuhl zurück. Laut. Er geht auf Lucas Tisch zu.'],
    { tu: 'n7_yusuf' },
    { tu: 'n7_clip' },
  ],
  n7_turm: [
    ['erzaehler', 'Dienstag. 16:30. Jugendhaus. Noah baut den Turm ab.'],
    ['erzaehler', 'Stein für Stein. In eine Kiste.'],
    ['noah', 'Die haben recht. Ist für Kleine.'],
    { wahl: [
      { t: '(Die Kiste halten.)', herz: { noah: 1 }, dann: [] },
      { t: '„Lass ihn stehen.“', dann: [['noah', 'Wozu?']] },
      { t: '(Dich danebensetzen.)', staerke: 'warten', herz: { noah: 1 }, dann: [] },
    ] },
    ['erzaehler', 'Nichts davon hält ihn auf.'],
    { tu: 'n7_sockel' },
    { blende: 'Mittwoch · 22:40' },
    { tu: 'n7_nummer' },
  ],
  n7_fach: [{ tu: 'n7_zweitesBlatt' }],
  n7_zeitleiste: [
    ['mila', 'Neun Monate. Jeder Post. Ausgedruckt.'],
    ['mila', 'Wir sortieren nur zwei Dinge.'],
    { szene: 'spuren', id: 'zeitleiste', def: ZEITLEISTE, ausgang: (r) => r.schluss,
      folgen: {
        zwei: { staerke: 'lesen', herz: { mila: 2 }, merke: ['spurZwei', 'spurLowkey'] },
        einer: { staerke: 'lesen', herz: { mila: 1 } },
        lina: { herz: { mila: -1, lina: -1 } },
        offen: {},
      } },
    ['mila', 'Das ist nicht einer. Das sind zwei. Oder einer hat aufgehört.'],
  ],
  n7_video: [
    ['ben', 'Hast du das gesehen?'],
    { szene: 'chat', id: 'video7', def: VIDEO, ausgang: (r) => (r.flags.geteilt ? 'geteilt' : 'nicht'),
      folgen: { geteilt: { merke: 'k7Geteilt' }, nicht: { staerke: 'lesen', merke: 'k7NichtGeteilt' } } },
    ['erzaehler', 'Ihre Stimme. Ihr Gesicht. Es sieht echt aus.'],
    { tu: 'kapitelEnde' },
  ],
  n7_ende: [
    { szene: 'skillsStunde', id: 's7_trauer', def: S7_TRAUER_FAMILIE, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'einbeziehen', merke: 's7Trauer' }, weiter: { merke: 's7Trauer' } } },
    ['kaya', 'Und jetzt spulen wir die Woche zurück. Vier Bilder. Ohne Namen.'],
    ['kaya', 'Vorher hab ich Noah gefragt, ob wir über Dienstag reden dürfen.'],
    ['kaya', 'Er hat Ja gesagt. Danke, Noah.'],
    ['erzaehler', 'Bild 1: Sonntagabend. Eine neue Gruppe. Einer nach dem anderen fliegt raus.'],
    { wahl: [
      { t: 'Spaß.', dann: [['kaya', 'Für wen? Für die drin. Nicht für die, die rausfliegen.']] },
      { t: 'Streit.', dann: [['kaya', 'Streit ist zwischen zwei, die sich wehren können. Hier wurde ausgesucht.']] },
      { t: 'Mobbing.', staerke: 'lesen', dann: [['kaya', 'Ja. Immer wieder, mit Absicht, gegen Einzelne.']] },
    ] },
    ['erzaehler', 'Bild 2: Skate-Ecke. Drei gegen einen. „Mach mit oder du bist raus.“'],
    { wahl: [
      { t: 'Gruppendruck.', staerke: 'lesen', dann: [['kaya', 'Genau. Druck ist noch kein Mobbing. Aber der Anfang davon.']] },
      { t: 'Spaß unter Freunden.', dann: [['kaya', 'Freunde drohen nicht mit „raus“.']] },
    ] },
    { tu: 'n7_rolle2' },
    ['erzaehler', 'Bild 3: Kantine. Einer filmt. Einer sitzt allein. Viele lachen.'],
    { wahl: [
      { t: 'Mobbing.', staerke: 'lesen', dann: [['kaya', 'Ja. Und das Lachen gehört dazu. Ohne Publikum keine Bühne.']] },
      { t: 'Ein dummer Witz.', dann: [['kaya', 'Für den, der allein sitzt, ist es kein Witz. Seit Wochen nicht.']] },
    ] },
    { tu: 'n7_rolle3' },
    ['erzaehler', 'Bild 4: Am Korb. Ben und Jo ärgern sich. Beide lachen. Dann tauschen sie.'],
    { wahl: [
      { t: 'Spaß.', staerke: 'lesen', dann: [['kaya', 'Ja. Beide lachen, beide dürfen. Und beide können aufhören.']] },
      { t: 'Mobbing.', dann: [['ben', 'Hey! Ich ärger ihn. Er ärgert mich. Das ist Liebe.'], ['kaya', 'Stimmt. Gleich stark, beide lachen: Spaß.']] },
    ] },
    ['kaya', 'Und nächstes Mal? Ein Schritt. Nur einer.'],
    { wahl: [
      { t: '„Ich setz mich dazu.“', staerke: 'mut', merke: 'planDazu', dann: [['noah', '(nickt. Sagt nichts.)']] },
      { t: '„Ich lach nicht mit. Und sag Stopp, wenn ich kann.“', staerke: 'klar', merke: 'planStopp', dann: [] },
      { t: '„Ich hol Hilfe. Herrn Kuedes oder das SePAS.“', staerke: 'hilfe', merke: 'planHilfe', dann: [['kaya', 'Das ist kein Petzen.'], ['kaya', 'Petzen will Ärger machen. Hilfe holen will Ärger beenden.']] },
      { t: '„Ich schreib danach privat: Alles okay?“', staerke: 'einbeziehen', merke: 'planPrivat', dann: [] },
    ] },
    ['kaya', 'Mobbing hört selten von allein auf. Hilfe holen wirkt.'],
    ['kaya', 'Und einer, der sich dazusetzt, auch.'],
    { tu: 'n7_schluss' },
  ],
};

export const tunN7 = (c) => ({
  // Februar bis Mai: vier Karten, je ein Satz – je nach deinen Freundschaften. Dein Satz aus Kapitel 5 klebt am Spiegel.
  n7_monate: () => {
    const m = c.S.merke, fuer = m.k6Fuer || [];
    const satz = m.k5SatzManche ? 'Manche glauben es. Nicht alle.' : m.k5SatzMittwoch ? 'Heute ist Mittwoch. Mehr weiß ich nicht.' : m.k5SatzWissen ? 'Ich weiß, was ich gemacht hab. Und was nicht.' : null;
    return [
      { blende: 'Februar' },
      ['erzaehler', fuer.includes('noah') || m.k4BeideGeblieben || m.k4YusufGeschickt ? 'Februar. Noah hält dir einen Platz frei. Jeden Tag.' : 'Februar. Du isst meistens allein. Mit Kopfhörern.'],
      { blende: 'März' },
      ['erzaehler', fuer.includes('ben') || m.k5BenGefragt ? 'März. Ben winkt. Von weitem.' : 'März. Ben schaut weg, wenn du kommst.'],
      ...(satz ? [['erzaehler', 'Auf deinem Spiegel klebt ein Zettel: „' + satz + '“']] : []),
      ['erzaehler', 'Dazwischen gründet Luca eine große Gruppe. „Ecke 2.0“. Du bist nicht drin.'],
      { blende: 'April' },
      ['erzaehler', fuer.includes('mila') || m.k6Stopp || m.k6Komm ? 'April. Mila zeigt dir die erste Seite vom Würfel.' : 'April. Mila sitzt im CDI. Allein. Wie immer.'],
      { blende: 'Mai' },
      ['erzaehler', fuer.includes('jo') || m.k6JoSelbst ? 'Mai. Jo grüßt wieder. Wenn keiner guckt.' : 'Mai. Jo redet kaum noch. Mit niemandem.'],
    ];
  },
  n7_kenan: () => {
    const m = c.S.merke;
    const r = m.k7Nein ? [['kenan', 'Lass. Wenn nicht, dann nicht.']] : [];
    if (m.k7NeinBleiben) r.push(['erzaehler', 'Du bleibst stehen. Kenan schaut dich an. Lange.']);
    return r;
  },
  n7_yusuf: () => {
    const gesetzt = c.S.merke.k7Gesetzt;
    return [{ wahl: [
      { t: gesetzt ? '„Yusuf. Setz dich zu uns.“' : '„Yusuf. Nicht. Setz dich.“', staerke: 'ruhig', herz: { yusuf: 1 }, merke: 'k7YusufGehalten', dann: [
        ['erzaehler', 'Yusuf bleibt stehen. Seine Hände sind Fäuste. Dann nicht mehr.'],
        ['erzaehler', gesetzt ? 'Er setzt sich zu euch. Ohne ein Wort.' : 'Er setzt sich wieder. Ohne ein Wort.'] ] },
      { t: '(Ihn gehen lassen.)', merke: 'k7YusufRetenue', dann: [
        ['erzaehler', 'Yusuf schubst Lucas Tisch. Ein Glas fällt. Alle Handys drehen sich zu ihm.'],
        ['erzaehler', 'Er bekommt eine Retenue. Mittwoch, 15 Uhr. Genau in der Zeit von seinem Training.'] ] },
    ] }];
  },
  n7_clip: () => {
    const m = c.S.merke;
    if (m.k7Gesetzt) return [{ blende: 'Dienstag · 21:00' }, ['erzaehler', 'Der Clip am Abend heißt „zwei babys“.'], ['erzaehler', 'Noah schreibt dir. Zum ersten Mal: „danke.“']];
    if (m.k7Gefilmt) return [{ blende: 'Dienstag · 21:00' }, ['erzaehler', 'Dein Video ist der Clip. 600 Aufrufe.'], ['erzaehler', '„Luca hat dich zu Ecke 2.0 hinzugefügt.“'], ['erzaehler', 'Du bist wieder in einer Gruppe.']];
    return [{ blende: 'Dienstag · 21:00' }, ['erzaehler', 'Der Clip am Abend: Noah und die Tüte. 300 Aufrufe.']];
  },
  n7_sockel: () => {
    const m = c.S.merke, hoch = (c.S.freund && c.S.freund.noah >= 45) || m.k7Gesetzt;
    if (hoch && !m.k7Gefilmt) { m.k7Sockel = true; return [['erzaehler', 'Nur den Sockel lässt er stehen. Die unterste Reihe. Grau.'], ['noah', '(leise) Der bleibt. Erst mal.']]; }
    return [['erzaehler', 'Am Ende ist der Tisch leer. Nur der Staub zeigt, wo der Turm war.']];
  },
  // Wer die Nummer im September blockiert hat, bekommt nichts aufs Handy – sondern am Donnerstag ein Blatt ins Fach
  n7_nummer: () => (c.S.merke.nummerBlockiert ? [['erzaehler', 'Dein Handy bleibt still. Die Nummer ist seit September blockiert.']] : [
    ['erzaehler', 'Dein Handy leuchtet. Die unbekannte Nummer. Nach fünf Monaten.'],
    { szene: 'chat', id: 'nummer7', def: (m) => NUMMER7(m),
      ausgang: (r, m) => { if (r.flags.beweis) m.nummer7Screenshot = true; return r.flags.offen ? 'offen' : r.flags.danke ? 'danke' : r.flags.wer ? 'wer' : 'still'; },
      folgen: { offen: { staerke: 'zuhoeren', herz: { lina: 2 }, merke: 'nummer7Offen' }, danke: { herz: { lina: 1 }, merke: 'nummer7Danke' }, wer: { merke: 'nummer7Wer' }, still: {} } },
  ]),
  n7_zweitesBlatt: () => (c.S.merke.nummerBlockiert ? [
    ['erzaehler', 'Donnerstag. In deinem Fach liegt ein Blatt. Gefaltet.'],
    ['erzaehler', 'Derselbe Strich wie im September. Darunter, klein: „ich glaub dir. ich kann nicht reden. aber ich kann zeichnen.“'],
  ] : []),
  // Wo standest DU? Kein Urteil – nur ein Spiegel (Skills-Stunde, freiwillig)
  n7_rolle2: () => { const m = c.S.merke;
    return [['erzaehler', m.k7Nein ? 'Du warst da. Du hast Nein gesagt. Gegen eine ganze Ecke.' : m.k7MalSehen ? 'Du hast „Mal sehen“ gesagt. Das klingt wie nichts. Für Luca war es ein Ja.' : m.k7Okay ? 'Du hast Ja gesagt. Unter Druck passiert das. Du weißt jetzt, wie es sich anfühlt.' : 'Du warst nicht dabei. Aber du kennst so eine Ecke.']]; },
  n7_rolle3: () => { const m = c.S.merke;
    return [['erzaehler', m.k7Gesetzt ? 'Du hast dich zu Noah gesetzt. Die Bühne ist gekippt.' : (m.k7Kremer || m.k7Tuete) ? 'Du hast etwas getan. Nicht alles. Aber etwas.' : m.k7Gefilmt ? 'Du hast gefilmt. Das Video gibt es noch.' : 'Du warst im Publikum. Wie die meisten. Publikum kann eine Bühne kippen.']]; },
  // Tier-Wechsel: Der Streit mit Jo vom Sportfest (Kap. 3) – als welches Tier warst du? Jetzt nochmal, als ein anderes.
  // Sinn: „Gut ist, wechseln zu können“ wird erlebt, nicht nur gesagt.
  n7_tierWechsel: () => {
    const m = c.S.merke;
    const war = m.joKnall || m.joSauer ? 'hai' : m.joVersoehnt ? 'eule' : 'teddy';
    const NAME = { hai: '🦈 Hai', eule: '🦉 Eule', teddy: '🧸 Teddy', schildi: '🐢 Schildkröte', fuchs: '🦊 Fuchs' };
    const REAKT = {
      hai: [['du', '„Du hast den Stab verloren. Nicht ich. Punkt.“'], ['jo', '(Spiel-Jo, laut) Ach JA? Dann lauf doch allein!'], ['kaya', 'Hai gegen Hai. Beide oben auf der Treppe.']],
      schildi: [['du', '(Schultern hoch. Weggehen. Nichts sagen.)'], ['jo', '(Spiel-Jo) … Hallo? Ich red mit dir!'], ['kaya', 'Abtauchen schützt kurz. Aber Jo bleibt allein mit seiner Wut.']],
      teddy: [['du', '„Okay, okay. Meine Schuld. Alles meine Schuld.“'], ['jo', '(Spiel-Jo, leiser) … So hab ich’s auch nicht gemeint.'], ['kaya', 'Frieden schnell. Aber war es wirklich deine Schuld?']],
      fuchs: [['du', '„Wir waren beide zu schnell. Nächstes Mal üben wir den Wechsel.“'], ['jo', '(Spiel-Jo) … Fair. Halbe-halbe.'], ['kaya', 'Fuchs. Jeder gibt ein Stück. Oft gut genug.']],
      eule: [['du', '„Du wolltest gewinnen. Ich auch. Was hilft uns beiden fürs nächste Mal?“'], ['jo', '(Spiel-Jo, überrascht) … Training. Zusammen?'], ['kaya', 'Eule. Dauert länger. Hält länger.']],
    };
    const andere = Object.keys(REAKT).filter((t) => t !== war);
    return [
      ['kaya', 'Jetzt ihr. Erinnert euch an einen Streit. Vom Sportfest vielleicht.'],
      ['erzaehler', 'Der Stab fällt. Jo brüllt. Du weißt noch, was du gemacht hast.'],
      ['erzaehler', 'Damals warst du eher: ' + NAME[war] + '.'],
      ['kaya', 'Gleiche Szene. Anderes Tier. Jo spielt mit.'],
      ['jo', '(grinst) Ich bin ein sehr guter Wütender. Ich hab Erfahrung.'],
      { wahl: andere.map((t) => ({ t: NAME[t] + ' ausprobieren', merke: 'tierNeu_' + t, staerke: t === 'eule' || t === 'fuchs' ? 'klar' : undefined, dann: [
        ...REAKT[t],
        ['jo', t === 'eule' || t === 'fuchs' ? '(echt jetzt, leise) Hätten wir damals auch so machen können.' : '(lacht) Okay. Das war ein anderes Ende.'],
      ] })) },
      ['kaya', 'Niemand ist ein Tier. Ihr könnt wechseln. Das ist der Trick.'],
    ];
  },
  n7_schluss: () => [
    { szene: 'stempel', def: { modul: 'Modul 6 · Wenn es schwierig wird', titel: 'Standgehalten',
      gelernt: ['Fünf Tiere im Streit – und welches gerade hilft', 'Die Konflikt-Treppe und ihre Ausstiege', 'Nein sagen, wenn die Gruppe drückt', 'Spaß, Streit und Mobbing unterscheiden', 'Die Bühne kippen: ein Schritt reicht'],
      mission: 'Wenn du diese Woche siehst, dass jemand fertiggemacht wird: einen Schritt machen. Nicht mitlachen zählt auch.' }, folgen: {} },
  ],
});

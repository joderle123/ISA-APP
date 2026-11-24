// Storyline 7e „@annexe.cam“ (nach der Storyline von Fable) – Kapitel 3 „Von links unten“, Dezember.
// Verdecktes Thema: Gefühle verstehen. „Egal“ ist selten egal. Gefühle zeigen sich an Händen, nicht in Sätzen.
// Und man kann zwei Dinge gleichzeitig fühlen: gewinnen wollen und sich schämen.
// Spuren: der helle Streifen unten links auf jedem Foto (ein Handy, immer dasselbe); neuer Ton im Text über Mila
// (kein Emoji, Punkt am Ende – ab Dezember schreibt jemand anderes). Falsche Fährte: Lina.
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
// Stuhlkreis vorne in der Aula (Mitte −14.5 | −63.4), Lücke im Süden für den Spieler
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, chiara: { id: 'chiara', name: 'Chiara', farbe: '#3fa66b' }, yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' }, dario: { id: 'dario', name: 'Dario', farbe: '#d9693f' } };

import { S3_GRUNDGEFUEHLE, S3_ANGST_FAMILIE } from './skills-j1.js';

export const ORTE_N3 = { sportplatz: { x: -72, z: -6, yaw: -Math.PI / 2 } };
const HALLE = { sommer: [45.2, -12.6, Math.PI], ben: [42, -16, 0.4], yusuf: [43.2, -17.2, 0.2], jo: [49, -16, -0.4], lina: [51.4, -11.5, -0.8], noah: [40.5, -14, 0.6], ayla: [50.2, -17.4, -0.3], chiara: [47.6, -18.4, 0], mila: [52.4, -14.6, -1.2] };

export const SCHRITTE_N3 = [
  { id: 'k3_morgen', kap: 3, tag: 'Montag', uhr: 7.42, titel: 'Frost', ziel: 'Dunkel an der Haltestelle. Dario ist schon da.', marker: 'dario',
    start: { teleport: 'busAnkunft' },
    leute: { dario: [-21.5, 41.6, -1.6, 'sitzt'], lina: [-25.6, 44.4, 0.8], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n3_morgen' } },
  { id: 'k3_pantomime', kap: 3, tag: 'Montag', uhr: 9.9, neben: 'skills', titel: 'Skills: Sechs Grundgefühle', ziel: 'Aula. Herr Kuedes beginnt mit der Skills-Stunde.', marker: 'kaya',
    start: { teleport: 'eingangHof', gespraech: 'n3_checkin' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n3_pantomime' } },
  { id: 'k3_post', kap: 3, tag: 'Dienstag', uhr: 10.0, titel: 'Mila', ziel: 'Pause. Ein neuer Post. Mila weiß es noch nicht.', marker: 'ben',
    start: { teleport: 'eingangHof', gespraech: 'n3_post' },
    leute: { ben: [4, 14, 0.6, 'redet'], jo: [5.2, 15.4, -2.4, 'redet'], noah: [-14, 12.2, 2.6] },
    fertig: { reden: 'ben', gespraech: 'n3_nachPost' } },
  { id: 'k3_cdi', kap: 3, tag: 'Dienstag', uhr: 12.5, titel: 'Unten links', ziel: 'Mila sitzt im CDI am Fenster.', marker: 'mila',
    start: { teleport: 'cdi' },
    leute: { mila: [-6.2, -21.6, 0.4, 'sitzt'] },
    fertig: { reden: 'mila', gespraech: 'n3_cdi' } },
  { id: 'k3_franz', kap: 3, tag: 'Mittwoch', uhr: 8.1, neben: 'fach', titel: 'Français', ziel: 'Saal 1.04. Französisch bei Mme Sabli – Interview zu zweit.', marker: 'sabli',
    start: { teleport: 'saal104Tuer' },
    leute: { sabli: [-27, -24, Math.PI / 2], ...KLASSE },
    fertig: { reden: 'sabli', gespraech: 'n3_franz' } },
  { id: 'k3_turnier', kap: 3, tag: 'Mittwoch', uhr: 14.0, titel: 'Hallenturnier', ziel: 'Turnhalle. 7P1 gegen 7P2. Frau Sommer hat einen Zettel gezogen.', marker: 'sommer',
    start: { teleport: 'turnhalleTuer' },
    leute: HALLE,
    fertig: { reden: 'sommer', gespraech: 'n3_turnier' } },
  { id: 'k3_familien', kap: 3, tag: 'Donnerstag', uhr: 9.9, neben: 'skills', titel: 'Skills: Sorge, Angst, Panik, Verzweiflung', ziel: 'Aula. Zweite Skills-Stunde bei Herrn Kuedes.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n3_familien' } },
  { id: 'k3_heft', kap: 3, tag: 'Donnerstag', uhr: 12.17, titel: 'Milas Heft', ziel: 'Kantine. Mila setzt sich zum ersten Mal zu dir.', marker: 'mila',
    start: { teleport: 'kantineTuer' },
    leute: { mila: [10.75, -10.1, Math.PI / 2, 'sitzt'], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, Math.PI / 2, 'sitzt'], kremer: [26.8, -9, -Math.PI / 2] },
    fertig: { reden: 'mila', gespraech: 'n3_heft' } },
  { id: 'k3_freitag', kap: 3, tag: 'Freitag', uhr: 15.67, titel: 'Montag, 8:34', ziel: 'Nach Hause. Dario wartet an der Haltestelle.', marker: 'dario',
    start: { teleport: 'saal104Tuer', gespraech: 'n3_lenning' },
    leute: { lenning: [-21.4, -15.4, 2.6], dario: [-21.5, 41.6, -1.6, 'sitzt'], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { reden: 'dario', gespraech: 'n3_freitag' } },
];

// ---------- Dienstag 10:00: der Post über Mila (neuer Ton: kein Emoji, Punkt am Ende) ----------
const MILA_POST = {
  titel: '@annexe.cam', mitglieder: 0, dauer: 22,
  nachrichten: [
    { nach: 0.5, system: true, text: 'Neuer Beitrag.' },
    { nach: 1.4, wer: '@annexe.cam', bild: 'Mila im CDI, allein am Fenster, mit dem Würfel', text: 'wenn der würfel dein einziger freund ist.', lacher: { start: 4, proSek: 0.45, stopp: 'kommentiert' } },
    { nach: 5, system: true, text: '31 Likes' },
    { nach: 7, wer: 'jo_7p2', text: '💀' },
    { nach: 9, system: true, text: '58 Likes' },
    { nach: 12, wer: 'Ben (privat)', text: 'hat mila das schon gesehen?' },
    { nach: 15, system: true, text: '84 Likes' },
  ],
  aktionen: [
    { id: 'sagen', t: 'Mila suchen. Es ihr selbst sagen.', symbol: '🚶', setzt: 'sagen', sys: 'Du steckst das Handy ein und gehst los.', ende: true },
    { id: 'kommentar', t: 'Kommentieren: „lasst sie in ruhe“', symbol: '💬', setzt: 'kommentiert', ich: 'lasst sie in ruhe', folgen: [{ nach: 1.2, wer: 'jo_7p2', text: 'wer ist das' }, { nach: 2.2, wer: 'unbekannt_04', text: 'beschützer 😂' }, { nach: 3.2, system: true, text: '14 Antworten auf deinen Kommentar' }] },
    { id: 'melden', t: 'Beitrag melden', symbol: '🚩', setzt: 'gemeldet', sys: 'Meldung eingegangen.' },
    { id: 'weg', t: 'Handy weg', symbol: '📱', setzt: 'nichts', sys: 'Handy in der Tasche.', ende: true },
  ],
};

// ---------- Donnerstag: Milas Heft – die erste Spuren-Wand (Fakt oder Gerücht?) ----------
const MILAS_WAND = {
  wo: 'Kantine · Milas Heft', helfer: F.mila,
  frage: 'Mila schlägt ihr Heft auf. Jede Zeile ein Post. „Ich sammle nur. Was ist Fakt, was nicht?“',
  spuren: [
    { id: 'streifen', sy: '▮', t: 'Auf jedem Foto: ein heller Streifen unten links.', kurz: 'Streifen unten links', echt: true,
      kommentar: ['Fakt. Ich hab ihn auf zwölf Fotos gezählt.', 'Doch. Das ist das Wichtigste. Ein Kratzer im Glas.'] },
    { id: 'zeichnet', sy: '✏️', t: 'Lina zeichnet alle.', kurz: 'Lina zeichnet alle', echt: true,
      kommentar: ['Fakt. Das sieht jeder.', 'Doch, das ist ein Fakt. Nur sagt er nichts über die Fotos.'] },
    { id: 'linafotos', sy: '📷', t: 'Lina macht die Fotos. Als Vorlage.', kurz: 'Lina macht die Fotos', echt: false,
      kommentar: ['Richtig. Raus. Zeichnen ist nicht fotografieren.', 'Das hat Jo gesagt. Spannend. Aber ein Gerücht.'] },
    { id: 'ton', sy: '✍️', t: 'Der Post über dich hat kein Emoji. Und einen Punkt am Ende.', kurz: 'kein Emoji, Punkt', echt: true,
      kommentar: ['Fakt. Die alten hatten immer ein Emoji. „haha“ statt Punkt.', 'Doch. Das ist ein Unterschied. Ich weiß noch nicht, was er heißt.'] },
    { id: 'nah', sy: '📏', t: 'Die Fotos sind immer ganz nah. Von unten.', kurz: 'nah und von unten', echt: true,
      kommentar: ['Fakt. Jemand, der dabei ist. Nicht über die Straße.', 'Doch. Das zählt. Jemand ist immer ganz nah.'] },
    { id: 'jo', sy: '😂', t: 'Jo lacht bei jedem Post als Erster.', kurz: 'Jo lacht zuerst', echt: false,
      kommentar: ['Lachen ist mies. Aber Lachen ist nicht Machen.', 'Raus. Laut ist nicht schuldig.'] },
  ],
  frageEnde: 'Was steht fest? Nur, was wir belegen können.',
  schluesse: [
    { key: 'handy', t: 'Ein Handy, immer dasselbe. Wer es hält, wissen wir nicht.', braucht: ['streifen'], antwort: 'Genau. Mehr nicht. Noch nicht.' },
    { key: 'lina', t: 'Lina. Sie ist immer dort, wo Fotos entstehen.', braucht: ['linafotos'], antwort: '(schüttelt den Kopf) Das ist das Gerücht von Jo. Wenn wir falsch liegen, sind wir wie der Account.' },
    { key: 'zwei', t: 'Seit Dezember schreibt jemand anders.', braucht: ['ton'], antwort: 'Vielleicht. Oder jemand hat schlechte Laune. Ein Hinweis, kein Beweis.' },
    { key: 'offen', t: 'Wir wissen es noch nicht.', braucht: [], antwort: 'Langweilig. Aber richtig.' },
  ],
};

export const GESPRAECHE_N3 = {
  n3_franz: [
    ['sabli', 'Bonjour la classe ! Aujourd’hui : interview à deux. Danach stellst du deinen Partner vor.'],
    ['sabli', '{name} avec Lina. Allez !'],
    ['lina', '(sehr leise) Je … je m’appelle Lina.'],
    ['erzaehler', 'Sie schaut auf den Tisch. Ihre Hand zittert ein bisschen.'],
    { wahl: [
      { t: 'Langsam fragen, nicken, warten: „Et … tu aimes quoi ?“', staerke: 'zuhoeren', herz: { lina: 2 }, merke: 'linaInterview', dann: [
        ['lina', 'J’aime … la musique. Le piano.'],
        ['lina', '(noch leiser, auf Deutsch) Ich hab Angst, vor allen zu reden. Sag das nicht.'] ] },
      { t: 'Schnell alle Fragen runterrattern, damit es vorbei ist.', merke: 'linaGehetzt', dann: [
        ['lina', '… Musique.'],
        ['erzaehler', 'Mehr sagt sie nicht. Du schreibst „musique“ auf und sonst nichts.'] ] },
    ] },
    { stunde: 'francais' },
    ['sabli', 'Maintenant : présentez votre partenaire ! {name}, tu commences ?'],
    { tu: 'n3_vorstellen' },
    ['sabli', 'Merci. Une bonne interview, c’est aussi savoir ce qu’on ne dit pas.'],
  ],
  n3_checkin: [
    ['erzaehler', 'Montag. Check-in. Heute will Herr Kuedes das genauere Wort.'],
    { szene: 'checkin', id: 'checkin3', def: { frage: 'Nicht „gut“ oder „schlecht“. Das genauere Wort?', posts: [
      { wer: 'Mila', wort: 'angespannt', farbe: '#8a7bc8' }, { wer: 'Ben', wort: 'aufgeregt (sportfest!!)', farbe: '#f2b134' }, { wer: 'Lina', wort: 'okay', farbe: '#5fb07a' } ],
      reaktion: (w, g) => (g === 'Wut' ? [{ wer: 'Jo', text: 'same, aber ich weiß nicht warum' }] : g === 'Angst' ? [{ wer: 'Mila', text: 'Ich hab „angespannt“ geschrieben. Das ist wohl verwandt.' }] : [{ wer: 'Ben', text: 'notiert. danke' }]) }, folgen: {} },
  ],
  n3_pantomime: [
    ['erzaehler', 'Aula. Die Stühle stehen im Kreis. Herr Kuedes wartet, bis es ruhig ist.'],
    { szene: 'skillsStunde', id: 's3_grund', def: S3_GRUNDGEFUEHLE, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'lesen', merke: 's3Grund' }, weiter: { merke: 's3Grund' } } },
    ['kaya', 'Am Donnerstag schauen wir uns die Angst genauer an. Sie hat Geschwister.'],
    ['erzaehler', 'Beim Rausgehen bleibt Mila kurz neben dir stehen.'],
    ['mila', 'Ekel auch bei Menschen. Wenn jemand gemein ist. Das wusste ich nicht.'],
  ],
  n3_familien: [
    ['erzaehler', 'Donnerstag. Morgen ist Sportfest. In der Aula ist es unruhiger als sonst.'],
    { szene: 'skillsStunde', id: 's3_angst', def: S3_ANGST_FAMILIE, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'lesen', merke: 's3Angst' }, weiter: { merke: 's3Angst' } } },
    ['kaya', 'Morgen beim Sportfest: Achte darauf, welche Stufe der Leiter passt.'],
    { szene: 'stempel', def: { modul: 'Modul 2 · Gefühle verstehen', titel: 'Gefühle gelesen',
      gelernt: ['Sechs Grundgefühle und ihre Botschaft', 'Sorge, Angst, Panik und Verzweiflung unterschieden', 'Eigene Körperkarte gemacht', 'Fakten von Gerüchten getrennt'],
      mission: 'Merk dir einmal: Wo spürst du Wut?' }, folgen: {} },
  ],
  n3_morgen: [
    ['erzaehler', 'Montag. Dunkel. Frost auf der Bank.'],
    ['erzaehler', 'Die Zeichnung steckt noch in deiner Tasche.'],
    ['nik', '(zu dir) Der Bub ist jeden Tag vor mir da. Und ich bin früh.'],
    ['dario', 'Ich mag den ersten Bus.'],
    { wahl: [
      { t: '(Dario die Zeichnung zeigen.)', merke: 'zeichnungDarioGezeigt', dann: [
        ['erzaehler', 'Dario schaut lange hin. Dann zieht er den Ärmel über die Hand.'],
        ['dario', 'Gut gezeichnet. Wer macht so was?'],
        ['erzaehler', 'Von der Mauer aus schaut jemand zu.'] ] },
      { t: '(Die Zeichnung in der Tasche lassen.)', merke: 'zeichnungBehalten', dann: [['erzaehler', 'Du lässt sie, wo sie ist. Deine Hand bleibt trotzdem in der Tasche.']] },
    ] },
    ['dario', 'Kalt heute. Der Bus ist bestimmt wieder zu spät.'],
  ],
  // Dienstag 10:00: Handeln, bevor sie es erfährt (Entscheidung A)
  n3_post: [
    ['erzaehler', 'Dienstag, Pause. Dein Handy summt.'],
    { szene: 'chat', id: 'milaPost', def: MILA_POST,
      ausgang: (r) => (r.flags.sagen ? 'sagen' : r.flags.kommentiert ? 'kommentiert' : r.flags.gemeldet ? 'gemeldet' : 'nichts'),
      folgen: {
        sagen: { staerke: 'einbeziehen', herz: { mila: 2 }, merke: 'milaGesagt' },
        kommentiert: { staerke: 'mut', herz: { mila: 1 }, merke: 'milaKommentiert' },
        gemeldet: { staerke: 'hilfe', merke: 'milaGemeldet' },
        nichts: { merke: 'milaNichts' },
      } },
    { tu: 'n3_postFolge' },
  ],
  n3_nachPost: [
    ['ben', '(leise) Das war nicht mehr witzig. Das mit Mila.'],
    ['jo', 'Ist doch nur ein Satz.'],
    ['ben', 'Ja. Ein fieser.'],
  ],
  // Dienstag 12:30 (Fable, Schlüsselszene K3): „Egal“ – und der Streifen
  n3_cdi: [
    ['erzaehler', 'Dienstag. 12:30. Im CDI summt nur die Heizung.'],
    ['erzaehler', 'Mila sitzt am Fenster. Der Würfel dreht sich. Schnell.'],
    { wahl: [
      { t: '„Hast du es gesehen?“', dann: [] },
      { t: '„Alles okay?“', dann: [] },
      { t: '(Dich dazusetzen.)', staerke: 'warten', herz: { mila: 1 }, dann: [] },
    ] },
    { tu: 'n3_cdiStart' },
    ['mila', 'Vierundachtzig Likes. In zwei Stunden.'],
    ['mila', 'Egal.'],
    ['erzaehler', 'Der Würfel bleibt stehen. Ihre Hände auch.'],
    ['mila', 'Der Satz stimmt halt.'],
    ['erzaehler', 'Auf dem Display: „wenn der würfel dein einziger freund ist.“'],
    { wahl: [
      { t: '„Der Satz ist Müll.“', dann: [] },
      { t: '„Zeig mir, wie der Würfel geht.“', herz: { mila: 2 }, merke: 'wuerfelGefragt', dann: [] },
      { t: '(Sitzen bleiben.)', staerke: 'warten', herz: { mila: 1 }, dann: [] },
    ] },
    ['mila', 'Tröste mich nicht. Guck lieber.'],
    ['erzaehler', 'Sie wischt durch die Fotos. Eins. Fünf. Zwölf.'],
    ['mila', 'Unten links. Siehst du das?'],
    ['erzaehler', 'Ein heller Streifen. Dünn. Auf jedem Bild an derselben Stelle.'],
    { wahl: [
      { t: '„Ein Filter?“', dann: [] },
      { t: '„Dreck auf der Linse?“', staerke: 'lesen', dann: [] },
      { t: '„Ich seh nichts.“', dann: [] },
    ] },
    ['mila', 'Kein Filter. Ein Kratzer im Glas.'],
    ['mila', 'Ein Handy. Immer dasselbe.'],
    ['erzaehler', 'Sie dreht den Würfel wieder. Langsamer.'],
    ['mila', 'Wer es ist, weiß ich nicht. Aber immer ganz nah.'],
    { tu: 'n3_wuerfel' },
    { tu: 'n3_streifen' },
  ],
  // Mittwoch 14:00: Hallenturnier. Gewinnen wollen oder niemanden als Letzten stehen lassen (Entscheidung B)
  n3_turnier: [
    ['erzaehler', 'Mittwoch. Hallenturnier. 7P1 gegen 7P2.'],
    ['sommer', '(zieht einen Zettel) {name}. Du stellst auf. Fünf Leute.'],
    ['erzaehler', 'Zehn stehen an der Wand. Noah zählt die Linien am Boden. Lina steht halb hinter der Sprossenwand.'],
    ['jo', 'Nimm mich. Ich bin lowkey gut.'],
    ['sommer', 'Deine erste Wahl?'],
    { fest: true, wahl: [
      { t: 'Yusuf.', herz: { yusuf: 1 }, merke: 'wahlYusuf', dann: [] },
      { t: 'Ben.', herz: { ben: 1 }, merke: 'wahlBen', dann: [] },
      { t: 'Noah.', staerke: 'einbeziehen', herz: { noah: 2 }, merke: 'wahlNoah', dann: [] },
      { t: 'Lina.', staerke: 'einbeziehen', herz: { lina: 2 }, merke: 'wahlLina', dann: [] },
    ] },
    { tu: 'n3_turnierFolge' },
    { blende: 'Mittwoch · 14:40 · Tribüne' },
    ['erzaehler', 'Mitten im Spiel summen auf der Tribüne die Handys.'],
    ['erzaehler', 'Ein neuer Post: Lina auf der Bank, mit ihrem Skizzenbuch. „die zeichnet euch alle. creepy.“'],
    ['jo', 'Vielleicht macht sie die Fotos. Als Vorlage.'],
    ['erzaehler', 'Du kennst diesen Strich. Wie auf dem Blatt in deiner Tasche.'],
    ['erzaehler', 'Lina klappt das Buch zu. Sie geht.'],
    { wahl: [
      { t: '(Lina nachgehen. Nichts fragen. Nur da sein.)', staerke: 'lesen', herz: { lina: 2 }, merke: 'linaNachgegangen', dann: [
        ['erzaehler', 'Im Gang bleibt sie stehen. Sie schaut dich an. Dann auf deine Tasche.'],
        ['lina', '(sehr leise) … Ich mach keine Fotos.'],
        { wahl: [
          { t: '„Weiß ich.“', herz: { lina: 1 }, dann: [['erzaehler', 'Sie nickt. Einmal. Dann geht sie weiter.']] },
          { t: '„Hast du das in meine Jacke gesteckt?“', merke: 'linaGefragtBlatt', dann: [['erzaehler', 'Sie antwortet nicht. Sie geht. Schneller als vorher.']] },
        ] } ] },
      { t: '„Zeichnen ist nicht fotografieren, Jo.“', staerke: 'klar', herz: { lina: 1, jo: -1 }, merke: 'joWiderspruchLina', dann: [['jo', 'Chill. War nur eine Idee.']] },
      { t: '(Sitzen bleiben. Weiter zuschauen.)', merke: 'linaGerueht', dann: [] },
    ] },
  ],
  // Donnerstag 12:10: Mila sortiert. Ordnen statt raten.
  n3_heft: [
    ['erzaehler', 'Donnerstag. Mila setzt sich zum ersten Mal zu dir.'],
    { tu: 'n3_milaKommt' },
    { szene: 'spuren', id: 'wand3', def: MILAS_WAND, ausgang: (r) => r.schluss,
      folgen: {
        handy: { staerke: 'lesen', herz: { mila: 2 }, merke: ['spurHandy', 'wandSauber'] },
        zwei: { staerke: 'lesen', herz: { mila: 1 }, merke: ['spurHandy', 'spurTon'] },
        lina: { herz: { mila: -1, lina: -1 }, merke: 'vorschnellLina', dann: [['mila', 'Wir schreiben nur auf, was stimmt. Lina steht da nicht.']] },
        offen: { herz: { mila: 1 }, merke: 'wandOffen' },
      } },
    ['mila', '(klappt das Heft zu) Ich zeig das niemandem. Nur dir.'],
  ],
  n3_lenning: [
    ['lenning', '(im Flur) Montag, erste Stunde: Test. Handys kommen in die Kiste.'],
    ['erzaehler', 'Ein paar stöhnen. Noah wird blass.'],
  ],
  n3_freitag: [
    ['erzaehler', 'Freitag, 15:40. An der Haltestelle ist es schon fast dunkel.'],
    ['dario', '(fast zu sich selbst) Früher war der Account besser.'],
    { wahl: [
      { t: '„Früher? Wie meinst du das?“', merke: 'darioFrueher', dann: [['dario', '(zuckt) Lustiger halt. Keine Ahnung.'], ['erzaehler', 'Er schaut auf seine Schuhe.']] },
      { t: '(Nichts sagen.)', dann: [] },
    ] },
    { blende: 'Freitag · 21:00' },
    ['erzaehler', '@annexe.cam postet eine schwarze Kachel. Weiße Schrift.'],
    ['erzaehler', '„montag. 8:34.“'],
    { tu: 'kapitelEnde' },
  ],
};

export const tunN3 = (c) => ({
  n3_postFolge: () => {
    const m = c.S.merke;
    if (m.milaGesagt) return [['erzaehler', 'Du findest Mila im CDI. Du sagst es ihr. Leise.'], ['mila', '(schaut aufs Handy. Lange.) … Okay. Danke.'], ['mila', 'Besser von dir als vom Flur.']];
    if (m.milaKommentiert) return [['erzaehler', 'Vierzehn Antworten unter deinem Satz. Der Post rutscht nach oben.'], ['erzaehler', 'Er wird der meistkommentierte der Woche.']];
    if (m.milaGemeldet) return [['erzaehler', 'Auf dem Display: „Meldung eingegangen.“ Sonst passiert nichts.']];
    return [['jo', '(laut, quer über den Hof) Mila! Du bist wieder drauf!'], ['erzaehler', 'Mila hört es. Alle hören es.']];
  },
  n3_cdiStart: () => (c.S.merke.milaGesagt ? [['mila', 'Du hast es mir vorhin gesagt. Nicht der Flur. Das war besser.']] : []),
  n3_wuerfel: () => (c.S.merke.wuerfelGefragt ? [['mila', 'Und der Würfel geht so. Guck zu.'], ['erzaehler', 'Erst die weiße Seite. Dann die Ecken. Sie ist sehr schnell. Und ganz ruhig dabei.']] : []),
  n3_streifen: () => { c.S.merke.spurStreifen = true; c.ui.toast('<b>🔎 Spur</b><span>Ein heller Streifen unten links. Auf jedem Foto.</span>', 'ly-t-ent'); return []; },
  n3_turnierFolge: () => {
    const m = c.S.merke;
    if (m.wahlYusuf) return [['erzaehler', 'Ihr gewinnt. Klar. Yusuf ist schnell.'], ['erzaehler', 'Noah bleibt als Letzter an der Wand stehen. Bis Frau Sommer ihn einfach zuteilt.']];
    if (m.wahlBen) return [['ben', 'Echt jetzt? Mich zuerst?'], ['erzaehler', 'Ihr verliert knapp. Ben schreit trotzdem bei jedem Korb.']];
    if (m.wahlNoah) return [['erzaehler', 'Ihr verliert knapp. Noah trifft einmal. Er schaut sich um, ob es jemand gesehen hat.'], ['ben', '(von der Bank) Echt jetzt? Noah zuerst?']];
    return [['erzaehler', 'Ihr verliert knapp. Lina bleibt auf dem Feld. Die ganze Zeit.'], ['ben', '(von der Bank) Echt jetzt? Lina zuerst?']];
  },
  n3_milaKommt: () => (c.S.merke.milaNichts ? [['mila', 'Du hast Dienstag nichts gemacht. Ich weiß. Die meisten nicht.'], ['mila', 'Ich setz mich trotzdem. Ich brauch jemanden, der zuhört.']] : [['mila', 'Ihr Heft liegt offen. Datum, Uhrzeit, Ort. Streifen ja oder nein.'], ['mila', 'Ich sammle nur.']]),
  n3_vorstellen: () => {
    if (!c.S.merke.linaInterview) return [
      ['du', 'Elle s’appelle Lina. Elle aime … la musique.'],
      ['sabli', 'C’est tout ? Ein Interview heißt: fragen – und warten.'] ];
    return [{ wahl: [
      { t: '„Elle s’appelle Lina. Elle aime la musique et le piano.“', staerke: 'vertrauen', herz: { lina: 2, sabli: 1 }, merke: 'linaGeschuetzt', dann: [
        ['sabli', 'Très bien ! Le piano, Lina ? Super.'],
        ['erzaehler', 'Lina schaut kurz hoch. Fast ein Lächeln.'] ] },
      { t: '„… Et elle a peur de parler devant tout le monde.“', herz: { lina: -3 }, merke: 'linaVerraten', dann: [
        ['erzaehler', 'Stille. Lina schaut dich an. Dann aus dem Fenster.'],
        ['sabli', '(ruhig) Merci. Ça, c’est à Lina de le dire. Pas à toi.'] ] },
    ] }];
  },
});

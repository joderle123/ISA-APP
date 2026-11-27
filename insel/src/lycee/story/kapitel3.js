// Storyline 7e „@annexe.cam“ – Kapitel 3 „Unter der Wut“ (Gesamtkonzept, Werkzeug „Mischpult“, Heft #02 Gefühle).
// Manon kommt neu in die Klasse und spricht kaum Deutsch. Am Mittwoch ist Hallenturnier gegen die 7P1. Yusuf rastet aus,
// und alle sehen nur die Wut. Wer genauer benennen kann, was er sieht und was er selbst fühlt, kommt an das, was darunter sitzt.
// Der Account kommt in der Hauptszene nicht vor. Spur: ein Foto von Yusuf im Klassenchat – unten links ein heller Streifen.
// Hauptszene (Mittwoch 14:40): Yusuf schreit erst den an, der den letzten Pass nicht gefangen hat, dann dich. Er schaut immer
// wieder zur Uhr (Suchbild). „Musst du weg?“ geht nur mit 📎 Uhr – und erst, wenn du im Rot-Modus geatmet hast.
const pult = (r, c, s) => [-24.25 + r * 2.1, -27.2 + c * 3.4 + s * 0.62, -Math.PI / 2, 'sitzt'];
const KLASSE = { ayla: pult(0, 0, -1), ben: pult(1, 2, 1), chiara: pult(2, 1, -1), yusuf: pult(1, 0, 1), jo: pult(3, 2, -1), lina: pult(3, 0, 1), noah: pult(0, 1, 1), mila: pult(2, 2, 1) };
// Stuhlkreis vorne in der Aula (Mitte −14.5 | −63.4), Lücke im Süden für den Spieler
const AULA = { noah: [-16.18, -64.48, 1.00], mila: [-12.82, -64.48, -1.00], ben: [-12.50, -63.34, -1.60], jo: [-16.50, -63.34, 1.60], ayla: [-16.17, -62.31, 2.15], lina: [-12.83, -62.31, -2.15], chiara: [-13.56, -61.64, -2.65], yusuf: [-15.44, -61.64, 2.65] };
const F = { noah: { id: 'noah', name: 'Noah', farbe: '#3f78b8' }, mila: { id: 'mila', name: 'Mila', farbe: '#2fb8a8' }, ben: { id: 'ben', name: 'Ben', farbe: '#d9a21b' }, jo: { id: 'jo', name: 'Jo', farbe: '#c0392b' },
  lina: { id: 'lina', name: 'Lina', farbe: '#9b7bc8' }, ayla: { id: 'ayla', name: 'Ayla', farbe: '#e85d75' }, chiara: { id: 'chiara', name: 'Chiara', farbe: '#3fa66b' }, yusuf: { id: 'yusuf', name: 'Yusuf', farbe: '#5fa0d0' },
  manon: { id: 'manon', name: 'Manon', farbe: '#e07b39' } };

import { S3_GRUNDGEFUEHLE, S3_ANGST_FAMILIE } from './skills-j1.js';

// Kamera im Gang vor der Halle: tief, links neben der Tür (auf der Bank) – von dort ist das Foto im Klassenchat
export const ORTE_N3 = { sportplatz: { x: -72, z: -6, yaw: -Math.PI / 2 }, hallenGang: { x: 46.4, z: 0.6, yaw: Math.PI }, halleInnen: { x: 45.5, z: -8.6, yaw: Math.PI } };
const HALLE = { sommer: [45.2, -12.6, Math.PI], ben: [42, -16, 0.4], yusuf: [43.2, -17.2, 0.2], jo: [49, -16, -0.4], lina: [51.4, -11.5, -0.8], noah: [40.5, -14, 0.6], ayla: [50.2, -17.4, -0.3], chiara: [47.6, -18.4, 0], mila: [52.4, -14.6, -1.2], manon: [53.2, -12.6, -1.4] };
// Gang vor der Halle (Tür bei z −6): Yusuf mit dem Rücken zur Wand, die anderen im Halbkreis
const GANG = { yusuf: [45.6, -3.4, 0.2, 'redet'], jo: [48.2, -2.2, -1.9], ayla: [49.0, -1.0, -2.2], chiara: [43.0, -1.2, 2.0], mila: [42.6, -2.6, 1.6], lina: [41.8, -0.6, 2.4], manon: [50.0, -2.8, -1.6], sommer: [46.0, -9.0, 0] };
// Große Pause im Hof (Montag 9:50): fünf Inseln
const PAUSE_HOF = { kaya: [0.7, 5.6, Math.PI], yusuf: [28.6, 20.4, -1.2, 'handy'], manon: [-6.4, 9.2, 0.6], mila: [-10.6, 15.0, 2.4, 'redet'], lina: [-9.6, 16.0, -2.6, 'redet'], ben: [-2.6, 27.6, Math.PI, 'sitzt'], jo: [6.0, 15.2, -2.4, 'redet'], ayla: [7.6, 16.4, -2.0, 'redet'] };
// Wer den letzten Pass nicht fängt: der Müdeste, den du aufgestellt hast (Ben nach einer Nacht am Handy, sonst Noah …)
const UNSICHER = ['ben', 'noah', 'lina', 'mila', 'manon', 'chiara', 'ayla', 'jo'];
export const letzterFaenger = (team, m) => UNSICHER.filter((id) => !(id === 'ben' && m.benWach)).find((id) => team.includes(id)) || team[team.length - 1];

export const SCHRITTE_N3 = [
  // 1 · Montag 7:25: Laub, und am Tor ein Mädchen mit einem Zettel
  { id: 'k3_morgen', kap: 3, tag: 'Montag', uhr: 7.42, titel: 'Laub', ziel: 'Überall Laub. Am Tor steht jemand und dreht einen Zettel hin und her.', marker: 'manon',
    start: { teleport: 'busAnkunft' },
    leute: { manon: [0.9, 35.6, Math.PI * 0.9], dario: [-21.5, 41.6, -1.6, 'sitzt'], ben: [-3.4, 33.4, 2.6], fahrer: [-11.2, 44.6, -Math.PI / 2], sabli: [3.2, 31.8, -2.4] },
    fertig: { reden: 'manon', gespraech: 'n3_tor' } },
  // 2 · Montag 8:00: Français – Manon ankommen lassen (Wegweiser, drei Leute vorstellen, „Ça va ?“)
  { id: 'k3_franz', kap: 3, tag: 'Montag', uhr: 8.0, titel: 'À gauche, à droite', ziel: 'Sekretariat. Mme Sabli wartet mit Manon.', marker: 'sabli',
    start: { teleport: 'sekretariat' },
    leute: { sabli: [-20.2, -10.6, Math.PI], manon: [-21.8, -10.8, Math.PI * 0.9] },
    fertig: { reden: 'sabli', gespraech: 'n3_franz' } },
  { id: 'k3_pantomime', kap: 3, tag: 'Montag', uhr: 9.1, neben: 'skills', titel: 'Skills: Sechs Grundgefühle', ziel: 'Aula. Herr Kuedes beginnt mit der Skills-Stunde.', marker: 'kaya',
    start: { teleport: 'eingangHof', gespraech: 'n3_checkin' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n3_pantomime' } },
  // 3 · Montag 9:50: Pause = ein Ort (Umbau). Kreide-Wörter, Yusuf am Korb, Manon, Ben. Störung: Yusuf schlägt gegen den Korbständer.
  { id: 'k3_pause', kap: 3, tag: 'Montag', uhr: 9.83, titel: 'Wörter mit Kreide', ziel: 'Große Pause. Wo bist du?', marker: null,
    start: { teleport: 'eingangHof', gespraech: 'n3_pause' },
    leute: PAUSE_HOF,
    fertig: { nachStart: true } },
  // 4 · Mittwoch 14:00: Hallenturnier – du stellst fünf auf, dann: Wer steht frei?
  { id: 'k3_turnier', kap: 3, tag: 'Mittwoch', uhr: 14.0, titel: 'Hallenturnier', ziel: 'Turnhalle. 7P2 gegen 7P1. Frau Sommer hat einen Zettel gezogen.', marker: 'sommer',
    start: { teleport: 'halleInnen' },
    leute: HALLE,
    fertig: { reden: 'sommer', gespraech: 'n3_turnier' } },
  // 5 + 6 · Mittwoch 14:40: Yusuf explodiert (Hauptszene) – und 20 Sekunden durch seine Augen
  { id: 'k3_gang', kap: 3, tag: 'Mittwoch', uhr: 14.67, titel: 'Unter der Wut', ziel: 'Gang vor der Halle. Laute Stimmen.', marker: 'yusuf',
    start: { teleport: 'hallenGang' },
    leute: GANG,
    fertig: { reden: 'yusuf', gespraech: 'n3_gang' } },
  { id: 'k3_familien', kap: 3, tag: 'Donnerstag', uhr: 9.9, neben: 'skills', titel: 'Skills: Sorge, Angst, Panik, Verzweiflung', ziel: 'Aula. Zweite Skills-Stunde bei Herrn Kuedes.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n3_familien' } },
  // 7 · Freitag 12:05: Kantine – das Foto von Yusuf im Klassenchat. Wo stand die Kamera?
  { id: 'k3_kantine', kap: 3, tag: 'Freitag', uhr: 12.08, titel: 'Unten links', ziel: 'Kantine. Am Tisch der 7P2 summen die Handys.', marker: 'mila',
    start: { teleport: 'kantineTuer' },
    leute: { mila: [10.75, -10.1, Math.PI / 2, 'sitzt'], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, -Math.PI / 2, 'sitzt'], chiara: [16.65, -12.1, -Math.PI / 2, 'sitzt'], kremer: [26.8, -9, -Math.PI / 2] },
    fertig: { reden: 'mila', gespraech: 'n3_kantine' } },
  // 8 · Freitag 15:40: zwei Minuten bis zum Bus – Yusuf, Manon, Ben. Dann Bens Sicht.
  { id: 'k3_freitag', kap: 3, tag: 'Freitag', uhr: 15.67, titel: 'Zwei Minuten', ziel: 'Hof. Zwei Minuten bis zum Bus. Wen siehst du noch?', marker: 'bus',
    start: { teleport: 'eingang', gespraech: 'n3_freitagHof' },
    leute: { yusuf: [28.6, 20.4, -1.2], manon: [-4.6, 22.0, 0.4], ben: [-2.55, 27.55, Math.PI, 'sitzt'], noah: [-1.4, 27.55, Math.PI, 'sitzt'], lenning: [-1.0, 4.4, Math.PI], dario: [-21.5, 41.6, -1.6, 'sitzt'], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { nachStart: true } },
];

// ---------- Werkzeug-Karte „Mischpult“ ----------
const KARTE_MISCHPULT = { von: 'Herr Kuedes · Werkzeug', titel: 'Das Mischpult',
  punkte: ['Selten ist nur ein Gefühl da. Meistens laufen mehrere gleichzeitig – wie Regler an einem Mischpult.',
    'Der Körper verrät die Mischung: Wut ist heiß. Angst ist eng. Scham will weg. Trauer ist schwer.',
    'Das lauteste Gefühl ist nicht immer das wichtigste. Oft sitzt darunter ein leiseres.',
    'Je mehr Wörter du hast, desto mehr Regler hast du.'] };

// Wer an der Wand steht (Aufstellung): Hinweise beim genauen Hinschauen – manche hängen an früheren Kapiteln
const WAND = (m) => [
  { id: 'yusuf', name: 'Yusuf', farbe: F.yusuf.farbe, blick: m.sportStoppIgnoriert ? '„Nimm wen anders. Mir egal.“' : '„Nimm mich. Ich bin der Schnellste.“' },
  { id: 'ben', name: 'Ben', farbe: F.ben.farbe, blick: m.benWach ? 'Hellwach. Er hüpft auf der Stelle. „Um zehn war Schluss. Echt!“' : 'Gähnt. Seine Augen sind rot. „Bin fit. Voll.“' },
  { id: 'noah', name: 'Noah', farbe: F.noah.farbe, blick: '„Bitte nicht nach vorne.“' + (m.sportNoahHand ? ' Aber er schaut kurz zu dir.' : '') },
  { id: 'jo', name: 'Jo', farbe: F.jo.farbe, blick: '„Nimm mich. Ich treff alles. Fast alles.“' },
  { id: 'lina', name: 'Lina', farbe: F.lina.farbe, blick: 'Steht halb hinter der Sprossenwand.' },
  { id: 'manon', name: 'Manon', farbe: F.manon.farbe, blick: m.wegDirekt || m.manonHallo ? 'Sie winkt dir. „On joue ensemble ?“' : 'Neu. Sie schaut, was die anderen machen.' },
  { id: 'mila', name: 'Mila', farbe: F.mila.farbe, blick: 'Bindet ihre Schuhe. Zum zweiten Mal.' },
  { id: 'chiara', name: 'Chiara', farbe: F.chiara.farbe, blick: 'Kennt alle Regeln. Sagt dir, wo die Linie ist.' },
  { id: 'ayla', name: 'Ayla', farbe: F.ayla.farbe, blick: '„Mir egal, ob ich spiele.“' },
];

// ---------- Pause (Umbau): Störung – Yusuf knallt den Ball gegen den Ständer und schaut aufs Handy ----------
const STOER_YUSUF = [
  { szene: 'stoerung', id: 'stoerYusuf', pruefe: false,
    def: { bild: { wer: 'yusuf', von: [-3.6, 2.1, -3.2], auf: [0, 1.5, 0], fov: 50 }, t: 'Am Korb knallt Yusuf den Ball gegen den Ständer. Alle zucken.', hin: 'Zu Yusuf', bleib: 'Bleiben', zeit: 6 },
    ausgang: (r) => (r.hin ? 'hin' : 'bleib'),
    folgen: { hin: { merke: 'pause3ZuYusuf', dann: [{ tu: 'n3_zuYusuf' }] }, bleib: { merke: 'pause3Blieb' } } },
];

export const GESPRAECHE_N3 = {
  // ---------- 1 · Montag 7:25: am Tor ----------
  n3_tor: [
    ['erzaehler', 'Montag. Über das Wochenende ist das ganze Laub von der Linde gefallen.'],
    ['ben', '(rennt in einen Laubhaufen) Wer da reinspringt, ist der Größte!'],
    ['erzaehler', 'Am Tor steht ein Mädchen, das du noch nie gesehen hast. Alle gehen um sie herum.'],
    { foto: 'k3Manon', wer: 'manon', von: [1.7, 1.45, -2.1], auf: [0, 1.1, 0], fov: 40 },
    ['erzaehler', 'Auf ihrem Zettel steht: „Salle 1.04 – Mme Sabli“.'],
    { wahl: [
      { t: '„Salut ! La salle 1.04 ?“', staerke: 'lesen', herz: { manon: 2 }, merke: 'manonHallo',
        dann: [['manon', '(atmet aus) Oui ! Salle 1.04. Madame Sabli. Tu connais ?'], ['du', 'Oui. Avec moi.'], ['manon', 'Merci. Moi, c’est Manon.']] },
      { t: '„Hallo. Kann ich dir helfen?“', merke: 'manonDeutsch',
        dann: [['manon', '(lächelt unsicher) Pardon … Allemand … un peu. Très peu.'], ['erzaehler', 'Sie hält dir den Zettel hin. Salle 1.04.']] },
      { t: '(Weitergehen.)', merke: 'manonVorbei', herz: { manon: -1 },
        dann: [['erzaehler', 'Hinter dir fragt sie jemanden aus der 6e. Der zuckt mit den Schultern.']] },
    ] },
    ['sabli', '(kommt über den Hof) Ah, Manon ! Te voilà. … {name}, warte. Dich brauch ich.'],
    ['sabli', 'Manon ist neu in der 7P2. Sie kommt aus Lyon. Deutsch ist für sie noch schwer.'],
    ['sabli', 'Erste Stunde treffen wir uns am Sekretariat. Du bringst sie in den Saal. Auf Französisch.'],
  ],

  // ---------- 2 · Montag 8:00: Français – Wegweiser, drei Leute, „Ça va ?“ ----------
  n3_franz: [
    ['sabli', 'Bon. Manon muss vom Sekretariat in die Salle 1.04. Du sagst ihr den Weg.'],
    ['sabli', 'Vier Wörter reichen. À gauche – links. À droite – rechts. Tout droit – geradeaus. Demi-tour – umdrehen.'],
    ['sabli', 'Und Achtung: Sie macht genau, was du sagst. Auch wenn es falsch ist.'],
    { szene: 'weg', id: 'wegManon', def: { wer: F.manon, wo: 'Sekretariat' },
      ausgang: (r) => (!r.angekommen ? 'nicht' : r.umwege === 0 ? 'direkt' : 'umweg'),
      folgen: {
        direkt: { merke: 'wegDirekt', herz: { manon: 2 }, staerke: 'klar', dann: [['manon', 'Tout droit, tout droit, à gauche. Facile !']] },
        umweg: { merke: 'wegUmweg', herz: { manon: 1 }, dann: [['manon', '(lacht) La cantine à huit heures ! … Mais on est là.']] },
        nicht: { merke: 'wegNicht', dann: [['sabli', 'Bon. Ich bringe sie. Beim nächsten Mal klappt es.']] },
      } },
    { blende: 'Montag · 8:20 · Salle 1.04' },
    ['sabli', 'Jetzt stellst du Manon drei Leute vor. Nur, was stimmt – wie bei den Steckbriefen.'],
    ['sabli', 'Commence par Noah.'],
    { wahl: [
      { t: '„Voici Noah. Il mesure très bien.“', staerke: 'einbeziehen', herz: { noah: 1, manon: 1 }, merke: 'vorstellNoah', dann: [['noah', '(leise) … Merci.'], ['manon', 'Enchantée, Noah.']] },
      { t: '„Voici Noah. Il construit une tour.“', wenn: (m) => !!m.noahTurmGefragt && !m.steckbriefTurm, herz: { noah: -2 }, merke: 'vorstellGeheimnis',
        dann: [['noah', '(starrt dich an)'], ['erzaehler', 'Das mit dem Turm hat er nur dir erzählt. Nicht der ganzen Klasse.']] },
      { t: '„Voici Noah. Il ne parle jamais.“', herz: { noah: -2 }, merke: 'vorstellListe', dann: [['erzaehler', 'Jemand kichert. Es ist der Satz von der Liste.'], ['sabli', 'Hm. Hat Noah das gesagt? Oder die Liste?']] },
    ] },
    ['sabli', 'Et Lina ?'],
    { wahl: [
      { t: '„Voici Lina. Elle dessine très bien.“', herz: { lina: 1, manon: 1 }, merke: 'vorstellLina', dann: [['lina', '(wird rot, nickt)'], ['manon', 'Moi aussi, je dessine !']] },
      { t: '„Voici Lina. Elle est bizarre.“', herz: { lina: -2 }, dann: [['erzaehler', 'Lina schaut aus dem Fenster.'], ['sabli', 'Bizarre? Das ist eine Meinung. Kein Steckbrief.']] },
      { t: '„Voici Lina. Elle est … euh …“', dann: [['manon', '(lacht) Lina ?'], ['sabli', 'Ehrlich. Aber noch leer.']] },
    ] },
    ['sabli', 'Et Jo ?'],
    { wahl: [
      { t: '„Voici Jo. Il aime le basket.“', herz: { jo: 1, manon: 1 }, merke: 'vorstellJo', dann: [['jo', '(breit) Enfin quelqu’un qui me comprend.']] },
      { t: '„Voici Jo. Il a eu quatre écoles.“', herz: { jo: -1 }, merke: 'vorstellJoSchulen', dann: [['jo', '(lacht nicht) Das war ein Witz. Damals.'], ['sabli', 'Stimmt. Aber ist es seins zum Erzählen?']] },
      { t: '„Voici Jo. Il parle trop.“', herz: { jo: -1 }, dann: [['jo', 'Hey! … Okay. Ein bisschen.'], ['manon', '(lacht)']] },
    ] },
    ['sabli', 'Und jetzt fragst du sie.'],
    ['du', 'Et toi, Manon ? Ça va ?'],
    ['manon', 'Ça va … mais c’est beaucoup. Tout est nouveau. Je suis un peu perdue.'],
    { wahl: [
      { t: '(Verstanden:) Es geht ihr super.', dann: [['sabli', 'Écoute encore. „Mais c’est beaucoup.“'], ['erzaehler', 'Manon schaut auf ihre Hände.']] },
      { t: '(Verstanden:) Alles neu. Sie fühlt sich verloren.', merke: 'manonVerstanden', herz: { manon: 1 },
        dann: [['du', 'Perdue … verloren. Moi aussi, en septembre.'], ['manon', '(lächelt zum ersten Mal richtig) Vraiment ?']] },
      { t: '(Verstanden:) Sie will zurück nach Lyon.', dann: [['manon', 'Non … pas ça.'], ['sabli', 'Fast. „Perdue“ heißt verloren. Nicht weg.']] },
    ] },
    { tu: 'n3_manonAngekommen' },
  ],

  // ---------- Skills-Stunden (freiwillig) ----------
  n3_checkin: [
    ['erzaehler', 'Montag. Check-in. Heute will Herr Kuedes das genauere Wort.'],
    { szene: 'checkin', id: 'checkin3', def: { frage: 'Nicht „gut“ oder „schlecht“. Das genauere Wort?', posts: [
      { wer: 'Mila', wort: 'angespannt', farbe: '#8a7bc8' }, { wer: 'Ben', wort: 'aufgeregt (turnier mittwoch!!)', farbe: '#f2b134' }, { wer: 'Lina', wort: 'okay', farbe: '#5fb07a' } ],
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
    ['erzaehler', 'Donnerstag. Gestern war das Turnier. In der Aula ist es unruhiger als sonst.'],
    { szene: 'skillsStunde', id: 's3_angst', def: S3_ANGST_FAMILIE, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'lesen', merke: 's3Angst' }, weiter: { merke: 's3Angst' } } },
    ['kaya', 'Wenn euch diese Woche etwas eng wird: Welche Stufe der Leiter ist es? Sorge, Angst, Panik?'],
    { szene: 'stempel', def: { modul: 'Modul 2 · Gefühle verstehen', titel: 'Gefühle gelesen',
      gelernt: ['Sechs Grundgefühle und ihre Botschaft', 'Sorge, Angst, Panik und Verzweiflung unterschieden', 'Eigene Körperkarte gemacht', 'Fakten von Gerüchten getrennt'],
      mission: 'Merk dir einmal: Wo spürst du Wut?' }, folgen: {} },
  ],

  // ---------- 3 · Montag 9:50: Freier Moment – Werkzeug „Mischpult“, Wörter-Jagd ----------
  n3_pause: [
    { foto: 'k3ManonPause', wer: 'manon', von: [2.2, 1.5, 1.8], auf: [0, 1.0, 0], fov: 42 },
    { szene: 'orte', id: 'pauseOrt3', pruefe: false,
      def: { titel: 'Große Pause · 9:50', info: 'Überall im Hof stehen Wörter mit Kreide. Du kannst nur an einem Ort sein.',
        orte: [
          { id: 'kaya', sy: '🖍', name: 'Wörter-Jagd', wer: 'Herr Kuedes und die Kreide-Wörter.', bild: { wer: 'kaya', von: [1.8, 1.7, -2.2], auf: [0, 1.2, 0], fov: 46 } },
          { id: 'yusuf', sy: '🏀', name: 'Korb', wer: 'Yusuf wirft allein. Sehr hart.', bild: { wer: 'yusuf', von: [-3.6, 2.1, -3.2], auf: [0, 1.5, 0], fov: 50 } },
          { id: 'manon', sy: '📖', name: 'Manon', wer: 'Mit dem Wörterbuch am Rand.', bild: 'k3ManonPause' },
          { id: 'ben', sy: '🪑', name: 'Eure Bank', wer: 'Ben. Die Augen halb zu.', bild: { wer: 'ben', von: [0.5, 1.4, -2.0], auf: [0, 0.9, 0], fov: 44 } },
        ] },
      ausgang: (r) => r.ort,
      folgen: {
        kaya: { merke: 'pause3Woerter', dann: [{ hin: { du: [1.2, 7.4, Math.PI] } }, ['kaya', 'Wütend kennt jeder. Aber genervt, gekränkt, beschämt – das sind andere Wörter.'], { tu: 'n3_wortJagd' }] },
        yusuf: { merke: 'pause3Yusuf', dann: [{ tu: 'n3_zuYusuf' }] },
        manon: { merke: 'pause3Manon', dann: [{ hin: { du: [-5.4, 10.4, -2.4] } }, { tu: 'n3_zuManon' }] },
        ben: { merke: 'pause3Ben', dann: [{ hin: { du: [-3.4, 26.4, 0.4] } }, { tu: 'n3_zuBen' }] },
      } },
    { tu: 'n3_waehrenddessen' },
    ['erzaehler', 'Es klingelt. Die Wörter bleiben im Hof stehen. Bis es regnet.'],
  ],
  n3_woerter: [
    ['kaya', 'Vier Wörter. Vier Leute im Hof. Wer fühlt was?'],
    ['kaya', 'Yusuf am Korb. Er wirft und schaut dauernd aufs Handy.'],
    { wahl: [
      { t: 'gelangweilt', dann: [['kaya', 'Gelangweilt wirft man nicht so hart.']] },
      { t: 'angespannt', merke: 'wortAngespannt', dann: [['kaya', 'Angespannt. Wie eine Feder. Gutes Wort.'], { tu: 'n3_wort' }] },
      { t: 'fröhlich', dann: [['kaya', 'Schau noch mal auf sein Gesicht.']] },
    ] },
    ['kaya', 'Manon, am Rand, mit dem Wörterbuch.'],
    { wahl: [
      { t: 'wütend', dann: [['kaya', 'Wut ist heiß. Sie sieht eher klein aus. Eng.']] },
      { t: 'stolz', dann: [['kaya', 'Stolz steht man anders. Mitten im Hof.']] },
      { t: 'verloren', merke: 'wortVerloren', dann: [['kaya', 'Verloren. Auf Französisch: perdue.'], { tu: 'n3_wort' }] },
    ] },
    ['kaya', 'Ben auf eurer Bank. Die Augen halb zu.'],
    { wahl: [
      { t: 'erschöpft', merke: 'wortErschoepft', dann: [['kaya', 'Erschöpft. Nicht faul. Das ist ein Unterschied.'], { tu: 'n3_wort' }] },
      { t: 'eifersüchtig', dann: [['kaya', 'Auf wen? Er schläft fast.']] },
      { t: 'neugierig', dann: [['kaya', 'Neugierig macht wach. Er ist das Gegenteil.']] },
    ] },
    ['kaya', 'Lina und Mila. Lina hält ihr Heft zu, Mila will reinschauen.'],
    { wahl: [
      { t: 'Beide: wütend.', dann: [['kaya', 'Dann würden sie nicht so nah beieinander stehen.']] },
      { t: 'Lina: verlegen. Mila: neugierig.', merke: 'wortVerlegen', dann: [['kaya', 'Zwei Leute, zwei Gefühle. Und beide gleichzeitig. Genau so.'], { tu: 'n3_wort' }, { tu: 'n3_wort' }] },
    ] },
    { tu: 'n3_woerterStand' },
  ],
  n3_pauseYusuf: [
    ['erzaehler', 'Yusuf wirft allein. Nach jedem Wurf schaut er aufs Handy. Auf die Uhrzeit.'],
    { wahl: [
      { t: '„Wartest du auf was?“', staerke: 'lesen', herz: { yusuf: 1 }, merke: 'yusufMussWeg',
        dann: [['yusuf', '(steckt das Handy weg) Nein. … Mittwoch ist Turnier. Danach muss ich sofort weg.'], ['yusuf', 'Frag nicht, warum.'], { beweis: 'k3MussWeg', t: 'Yusuf: „Mittwoch nach dem Turnier muss ich sofort weg.“' }] },
      { t: '„Eins gegen eins?“', herz: { yusuf: 1 }, dann: [['yusuf', 'Bis 3. Los.'], ['erzaehler', 'Er gewinnt 3:1. Nach jedem Punkt schaut er aufs Handy.']] },
      { t: '(Weitergehen.)', dann: [['erzaehler', 'Das Brett zittert noch, als du schon am Brunnen bist.']] },
    ] },
  ],
  n3_pauseManon: [
    { wenn: (m) => m.manonVerstanden, dann: [['manon', '(blättert im Wörterbuch) „Perdue“ … verloren. Und „fière“?']], sonst: [['manon', '(schaut vom Wörterbuch hoch) Pardon … tu as une minute ?']] },
    { wahl: [
      { t: 'Wörter tauschen. Fünf gegen fünf.', herz: { manon: 2 }, merke: 'manonWoerterTausch', staerke: 'einbeziehen',
        dann: [['manon', 'Fière – stolz. Gênée – peinlich. Jalouse – eifersüchtig. Soulagée – erleichtert. Triste – traurig.'], ['du', 'Und du: wütend, müde, nervös, froh, mutig.'], ['manon', '(schreibt alles auf) Mutig. J’aime ce mot.'], { tu: 'n3_wort' }, { tu: 'n3_wort' }] },
      { t: '„Komm, ich zeig dir die Kantine.“', herz: { manon: 1 }, merke: 'manonKantine',
        dann: [['manon', 'La cantine ! Je connais déjà. À huit heures !'], ['erzaehler', 'Ihr lacht beide. Zum ersten Mal über dasselbe.']] },
      { t: '„Später, okay?“', dann: [['manon', 'D’accord.'], ['erzaehler', 'Sie schaut wieder ins Wörterbuch.']] },
    ] },
  ],
  n3_pauseBen: [
    ['erzaehler', 'Ben sitzt auf eurer Bank. Die Augen halb zu.'],
    ['ben', 'Bis zwei gezockt. Mittwoch bin ich wieder fit. Easy.'],
    { wahl: [
      { t: '„Um zehn schreib ich. Dann Schluss.“', herz: { ben: 1 }, merke: 'benWach', staerke: 'einbeziehen',
        dann: [['ben', 'Du bist schlimmer als meine Mutter. … Okay. Um zehn.'], ['erzaehler', 'Er hält es tatsächlich. Zwei Abende.']] },
      { t: '„Mittwoch ist Turnier, Ben.“', merke: 'benGewarnt', dann: [['ben', 'Weiß ich. Bin fit. Voll.'], ['erzaehler', 'Er gähnt mitten im Satz.']] },
      { t: '(Neben ihn setzen. Nichts sagen.)', herz: { ben: 1 }, dann: [['erzaehler', 'Ben schläft fast ein. Für eine Minute lehnt er an deiner Schulter.']] },
    ] },
  ],
  // ---------- 4 · Mittwoch 14:00: Hallenturnier ----------
  n3_turnier: [
    ['erzaehler', 'Mittwoch. Hallenturnier. 7P2 gegen 7P1.'],
    { foto: 'k3Halle', von: [45.2, 2.2, -9.0], auf: [46.4, 1.0, -15.0], fov: 52 },
    ['sommer', '(zieht einen Zettel) {name}. Du stellst auf. Fünf Leute.'],
    // Kapitel 1, Sport: „Wer führt, trägt.“ Wer Yusuf gut geführt hat, den will er im Team. Wer sein Stopp übergangen hat, den nicht.
    { wenn: (m) => m.sportGut && !m.sportStoppIgnoriert, dann: [['yusuf', '(leise) Weißt du noch? Die Hütchen. Ich vertrau dir.']] },
    { wenn: (m) => m.sportJoStopp || m.sportNoahHand, dann: [['erzaehler', 'Noah schaut kurz hoch. Zu dir. Er hat die Sache mit der Hand nicht vergessen.']] },
    { szene: 'aufstellung', id: 'k3Aufstellung', def: (m) => ({ wo: 'Turnhalle · 7P2', leute: WAND(m), anzahl: 5 }), ausgang: () => 'ok', folgen: { ok: {} } },
    { tu: 'n3_aufstellung' },
    { szene: 'pass', id: 'k3Pass', def: (m) => ({ wo: 'Turnhalle', team: (m.k3Team || []).map((id) => F[id]).filter(Boolean), letzter: m.k3Letzter, runden: 6 }),
      ausgang: (r, m) => { const st = r.stand || [0, 1]; m.k3Gewonnen = st[0] > st[1]; m.k3Stand = st[0] + ' : ' + st[1]; if (r.letzter) m.k3Letzter = r.letzter; return (r.gute || 0) >= 4 ? 'gut' : 'mittel'; }, folgen: { gut: { merke: 'passGut', staerke: 'lesen' }, mittel: {} } },
    { tu: 'n3_spielEnde' },
  ],

  // ---------- 5 + 6 · Mittwoch 14:40: Yusuf explodiert (Hauptszene) ----------
  n3_gang: [
    ['erzaehler', 'Der Gang vor der Halle. Es riecht nach Gummi und nassen Jacken.'],
    { tu: 'n3_gangStart' },
    { foto: 'k3Yusuf', von: [42.6, 0.55, 0.2], auf: [45.6, 1.35, -3.4], fov: 46 },
    { foto: 'auchUhr3', von: [45.4, 1.6, -2.6], auf: [46.0, 4.0, -5.8], fov: 40 },
    { szene: 'suchbild', id: 'k3Uhr', bildId: 'k3GangBild', pruefe: false,
      def: { wo: 'Gang · 14:42', frage: 'Yusuf schreit. Zwischen zwei Sätzen schaut er immer wieder hoch. Wohin?', zeit: 10, finde: 1,
        foto: { von: [46.2, 1.65, 1.6], auf: [46.0, 2.0, -5.6], fov: 58 },
        gut: 'Die Uhr. 14:42.', verpasst: 'Er hat immer wieder zur Uhr geschaut.',
        ziele: [
          { id: 'uhr', wo: [46.0, 4.45, -5.76], r: 0.06, t: 'Die Uhr über der Tür. 14:42.', kurz: 'Yusuf schaut dauernd zur Uhr.', beweis: 'k3Uhr' },
          { id: 'yusuf', wer: 'yusuf', hoehe: 1.5, r: 0.06, richtig: false, t: 'Das ist Yusuf selbst.' },
          { id: 'sommer', wer: 'sommer', hoehe: 1.5, r: 0.05, richtig: false, t: 'Frau Sommer. Sie hat nichts gemerkt.' },
        ] },
      ausgang: (r, m) => { if ((r.gefunden || []).includes('uhr')) { m.k3UhrGesehen = true; return 'uhr'; } return 'nicht'; },
      folgen: { uhr: { dann: [{ bemerke: 'yusufUhr' }] }, nicht: {} } },
    ['yusuf', '(zu dir) Und du! Wieso stellst du so einen auf?! Was glotzt ihr alle so?!'],
    { pult: { g: 'Wut', w: 8 } },
    { foto: 'k3Pult', wer: 'du', von: [0.9, 1.6, 1.4], auf: [0, 1.4, 0], fov: 38 },
    ['erzaehler', 'Dein Hals wird heiß. Alle schauen. Auf ihn. Auf dich.'],
    { warum: true, wahl: [
      { t: '„Schrei mich nicht an!“', merke: 'k3Zurueck', herz: { yusuf: -2 },
        dann: [['erzaehler', 'Yusuf macht einen Schritt auf dich zu. Er schubst. Du stößt mit der Schulter gegen die Wand.'],
          ['sommer', '(aus der Halle) HE! Alle beide! Zu Mme Tidderich. Sofort.'], { pult: null },
          ['erzaehler', 'Im Büro sitzt ihr nebeneinander und schaut an verschiedene Wände.'],
          ['hoffmann', 'Yusuf, du bleibst heute bis halb fünf. {name}, du gehst zurück in die Halle.'],
          ['erzaehler', 'Yusuf sagt nichts. Er schaut auf die Uhr an der Wand. Dann auf seine Schuhe.']] },
      { t: '„Musst du weg?“', beweis: 'k3Uhr|k3MussWeg', ruhig: true, staerke: 'lesen', merke: 'k3Uhr', herz: { yusuf: 2 },
        dann: [['erzaehler', 'Yusuf hört mitten im Satz auf.'],
          ['yusuf', '… Um vier muss ich vor der Grundschule sein. Mein Bruder wartet sonst allein. Er ist sieben.'],
          { wenn: (m) => !!m.k3Gewonnen, dann: [['yusuf', '(leiser) Finale um zehn nach drei. Das schaff ich nicht.']], sonst: [['yusuf', '(leiser) Spiel um Platz drei um zehn nach drei. Das schaff ich nicht.']] },
          { wahl: [
            { t: '„Geh. Ich sag Frau Sommer Bescheid.“', merke: 'k3YusufGeschickt', herz: { yusuf: 2 }, dann: [['yusuf', '(schon halb weg) … Danke.'], ['jo', 'Wegen dem? Wir spielen ohne ihn?'], ['erzaehler', 'Ihr verliert das nächste Spiel. Aber um vier steht Yusuf am Schultor.']] },
            { t: '„Erst das Spiel. Dann renn ich.“', dann: [['yusuf', 'Das reicht nicht. Das reicht nie.'], ['erzaehler', 'Er geht trotzdem. Ohne das nächste Spiel. Ohne Abschied.']] },
          ] }] },
      { t: '(Dazwischenstellen.)', merke: 'k3Dazwischen', herz: { yusuf: -1 },
        dann: [{ pult: { plus: 3 } }, ['yusuf', 'Geh weg! Das geht dich nichts an!'], ['erzaehler', 'Jetzt trifft seine Wut nur noch dich.'], { tu: 'n3_dazwischenDank' }] },
      { t: '(Frau Sommer holen.)', merke: 'k3Sommer',
        dann: [['sommer', '(kommt aus der Halle) Was ist hier los? Yusuf, mit mir. Jetzt.'], ['yusuf', 'Aber ich muss –'], ['sommer', 'Du musst mitkommen. Sonst nichts. Du bleibst heute bis halb fünf.'], ['erzaehler', 'Yusuf schaut zur Uhr. 14:46. Er sagt nichts mehr.']] },
    ] },
    { pult: null },
    { sicht: (m) => ({ wer: 'yusuf', auf: 'du', gedanken: [
      '14:42. Noch eine Stunde achtzehn.',
      'Das Handy summt. Mama, von der Arbeit: „Denk an deinen Bruder. Um vier. Ich schaff es nicht.“',
      m.k3Uhr ? 'Alle starren. Einer hat gefragt.' : 'Alle starren. Keiner fragt.',
      m.k3Sommer || m.k3Zurueck ? 'Halb fünf. Vor der Grundschule steht ein kleiner Junge mit einem viel zu großen Ranzen. Allein.' : m.k3YusufGeschickt ? 'Rennen. Wenn ich renne, schaff ich es.' : 'Ich kann nicht bleiben. Ich kann nicht gehen.'] }) },
    { tu: 'n3_gangFolge' },
  ],

  // ---------- 7 · Freitag 12:05: Kantine – das Foto im Klassenchat ----------
  n3_kantine: [
    ['erzaehler', 'Freitag. Kantine. Am Tisch der 7P2 summen fünf Handys gleichzeitig.'],
    { handy: { wer: 'Klassenchat 7P2', wann: 'vor 4 Min.', fotoId: 'k3Yusuf', streifen: true, alt: 'Yusuf im Gang vor der Halle, rot vor Wut, von unten fotografiert', text: '„yusuf nach dem turnier 😂 achtung bissig“ · weitergeleitet · 23 Reaktionen' } },
    ['jo', 'Wer hat das gemacht? Das ist so gut.'],
    ['mila', '(ernst) Das ist nicht gut.'],
    { handy: null },
    { szene: 'suchbild', id: 'k3Streifen', pruefe: false,
      def: { wo: 'Kantine · das Foto', frage: 'Mila: „Auf dem Foto stimmt was nicht.“ Tipp drauf.', zeit: 12, finde: 1, bild: 'k3Yusuf', streifen: true,
        gut: 'Ein heller Streifen. Wie eine Handyhülle vor der Linse.', verpasst: 'Unten links: ein heller Streifen.',
        ziele: [{ id: 'streifen', x: 0.07, y: 0.86, r: 0.09, t: 'Heller Streifen unten links.', kurz: 'Unten links ein heller Streifen. Wie eine Handyhülle.', beweis: 'k3Streifen' }] },
      ausgang: (r, m) => ((r.gefunden || []).length ? 'ja' : 'nein'), folgen: { ja: { dann: [{ bemerke: 'fotoStreifen' }] }, nein: {} } },
    ['erzaehler', 'Das Foto ist von unten. Man sieht sein Kinn.'],
    ['mila', 'Wo stand die Kamera? So ein Foto macht man nicht im Vorbeigehen.'],
    { wahl: [
      { t: '„Unten. Auf der Bank, links.“', staerke: 'lesen', herz: { mila: 2 }, merke: 'k3KameraGefunden',
        dann: [['mila', '(schreibt in ihr Heft) Bank. Links. Mittwoch, 14:42.'],
          { wenn: (m, S) => !!((S.bemerkt || {}).fotoStreifen), dann: [['mila', 'Und der Streifen. Den hab ich schon mal gesehen. Auf den Fotos vom Account.'], { tu: 'n3_streifen' }] }] },
      { t: '„Von oben. Aus einem Fenster.“', merke: 'k3KameraFalsch', dann: [['mila', 'Dann sähe man seinen Kopf von oben. Man sieht aber sein Kinn.']] },
      { t: '„Egal. Ich lösch es.“', merke: 'k3FotoGeloescht', dann: [['erzaehler', 'Gelöscht. Bei dir. Bei den anderen nicht.']] },
    ] },
    { warum: true, wahl: [
      { t: 'In den Chat: „Löscht das.“', staerke: 'mut', herz: { yusuf: 1, jo: -1 }, merke: 'k3ChatStopp',
        dann: [['erzaehler', 'Drei Minuten passiert nichts. Dann schreibt Chiara: „Stimmt.“ Dann Noah: „👍“.'], ['yusuf', '(eine Stunde später, im Chat) Foto ist weg. Danke.']] },
      { t: 'Yusuf privat schreiben.', herz: { yusuf: 1 }, merke: 'k3YusufNachricht',
        dann: [['erzaehler', 'Gelesen. Keine Antwort. Am Abend kommt doch noch eine: „ok“.']] },
      { t: '(Weiteressen.)', merke: 'k3ChatNichts', dann: [['jo', '(scrollt) Vierzig Reaktionen.']] },
    ] },
  ],

  // ---------- 8 · Freitag 15:40: zwei Minuten bis zum Bus ----------
  n3_freitagHof: [
    ['erzaehler', 'Freitag, 15:40. Zwei Minuten bis zum Bus.'],
    ['lenning', '(im Vorbeigehen) Mittwoch, erste Stunde: Mathe-Test. Die Handys bleiben in der Tasche. Aus.'],
    { szene: 'orte', id: 'freitagOrt3', pruefe: false,
      def: { titel: 'Freitag · 15:40', info: 'Zwei Minuten. Zu wem gehst du noch?',
        orte: [
          { id: 'yusuf', sy: '🏀', name: 'Yusuf', wer: 'Am Korb. Allein.', bild: { wer: 'yusuf', von: [-3.6, 2.1, -3.2], auf: [0, 1.5, 0], fov: 50 } },
          { id: 'manon', sy: '👋', name: 'Manon', wer: 'Mitten im Hof.', bild: { wer: 'manon', von: [1.8, 1.6, 2.2], auf: [0, 1.1, 0], fov: 46 } },
          { id: 'ben', sy: '🪑', name: 'Ben', wer: 'Auf eurer Bank.', bild: { wer: 'ben', von: [0.5, 1.4, -2.0], auf: [0, 0.9, 0], fov: 44 } },
        ] },
      ausgang: (r) => r.ort,
      folgen: { yusuf: { dann: [{ tu: 'n3_zuFreiYusuf' }] }, manon: { dann: [{ tu: 'n3_zuFreiManon' }] }, ben: { dann: [{ tu: 'n3_zuFreiBen' }] } } },
    { tu: 'n3_zuFreitag' },
  ],
  n3_freiYusuf: [
    { wenn: (m) => m.k3Zurueck || m.k3Dazwischen, dann: [['erzaehler', 'Yusuf sieht dich kommen. Er dreht sich weg und wirft weiter.']],
      sonst: [{ wenn: (m) => m.k3Uhr || m.k3ChatStopp || m.k3YusufNachricht, dann: [['yusuf', '(wirft dir den Ball zu) Eins gegen eins? Bis 15:42. Dann muss ich.'], ['erzaehler', 'Ihr spielt genau zwei Minuten. Dann hält er dir die Hand hin.'], { tu: 'handschlag', mit: 'yusuf' }],
        sonst: [['yusuf', '(ohne hinzuschauen) Was?'], ['erzaehler', 'Er wirft. Er trifft. Er schaut aufs Handy.']] }] },
  ],
  n3_freiManon: [
    { tu: 'n3_manonFreitag' },
  ],
  n3_freiBen: [
    ['erzaehler', 'Ben sitzt auf eurer Bank. Er dreht den Ball in den Händen.'],
    { sicht: (m) => ({ wer: 'ben', auf: 'du', gedanken: m.k3Letzter === 'ben'
      ? ['Alles ist ein bisschen langsam heute.', 'Der Ball am Mittwoch kam so schnell. Ich hab ihn erst gesehen, als er schon vorbei war.', m.benWach ? 'Dabei hab ich geschlafen. Diesmal echt.' : 'Bis zwei. Wieder.']
      : ['Alles ist ein bisschen langsam heute.', m.k3Team && m.k3Team.includes('ben') ? 'Am Mittwoch hab ich gefangen. Jeden Ball. Komisch, wie gut sich das anfühlt.' : 'Ich stand am Mittwoch an der Wand. War vielleicht besser so.', 'Heute geh ich früher off. Vielleicht.'] }) },
  ],
  n3_freitag: [
    { blende: 'Freitag · 21:00' },
    ['erzaehler', '@annexe.cam postet eine schwarze Kachel. Weiße Schrift: „mittwoch. 8:34.“'],
    { tu: 'kapitelEnde' },
  ],
};

// Rückblick in Bildern (Gesamtkonzept K3): Manon am Tor, deine Aufstellung, Yusuf im Gang, dein Mischpult, „Das war auch“: die Uhr, Manon in der Pause
export const RUECKBLICK_N3 = (m, S) => {
  const pult = m.k3Mix || {};
  const NAME = { wut: 'Wut', angst: 'Angst', scham: 'Scham', trauer: 'Trauer' };
  const mix = Object.entries(pult).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([k, v]) => (NAME[k] || k) + ' ' + v).join(' · ');
  return [
    { id: 'k3Manon', titel: 'Am Tor', text: m.manonHallo ? 'Manon mit ihrem Zettel. Du hast sie zuerst auf Französisch angesprochen.' : m.manonVorbei ? 'Manon mit ihrem Zettel. Du bist vorbeigegangen.' : 'Manon mit ihrem Zettel. Salle 1.04.' },
    { id: 'k3Halle', titel: 'Deine Aufstellung', text: (m.k3Team || []).map((id) => F[id] ? F[id].name : id).join(', ') + (m.k3Uebrig && m.k3Uebrig.length ? '. An der Wand blieben: ' + m.k3Uebrig.map((id) => F[id] ? F[id].name : id).join(', ') + '.' : '.') },
    { id: 'k3Yusuf', titel: 'Im Gang', text: m.k3Uhr ? 'Yusuf, rot vor Wut. Darunter: Angst um seinen kleinen Bruder.' : 'Yusuf, rot vor Wut. Alle haben nur die Wut gesehen.' },
    { id: 'k3Pult', titel: 'Du, in dem Moment', text: m.k3Uhr ? 'Rot. Du hast trotzdem gefragt.' : m.k3Zurueck ? 'Rot. Du hast zurückgeschrien.' : 'Rot. Alle haben geschaut.' },
    !m.k3UhrGesehen ? { id: 'auchUhr3', titel: 'Das war auch', text: 'Über der Hallentür hing eine Uhr. Yusuf hat dauernd hingeschaut. 14:42.', auch: true } : null,
    { id: 'k3ManonPause', titel: 'Manon in der Pause', text: (m.manonAngekommen || 0) >= 3 ? 'Am Freitag steht sie mitten im Hof. Mit Chiara und Ayla.' : (m.manonAngekommen || 0) >= 1 ? 'Am Freitag ruft sie dir „Salut !“ zu.' : 'Am Freitag steht sie noch am Rand. Mit dem Wörterbuch.' },
  ].filter(Boolean);
};

// TUN für Kapitel 3 (in spiel.js eingehängt: tunN3)
export const tunN3 = (c) => ({
  // Wie gut ist Manon angekommen? Weg, Vorstellungen, „Ça va ?“ verstanden, Hallo am Tor
  n3_manonAngekommen: () => {
    const m = c.S.merke;
    m.manonAngekommen = (m.wegDirekt || m.wegUmweg ? 1 : 0) + ((m.vorstellNoah ? 1 : 0) + (m.vorstellLina ? 1 : 0) + (m.vorstellJo ? 1 : 0) >= 2 ? 1 : 0) + (m.manonVerstanden ? 1 : 0) + (m.manonHallo ? 1 : 0);
    m.woerter = Math.max(m.woerter || 0, 0) + (m.manonVerstanden ? 1 : 0);   // „perdue“ landet auf dem Mischpult
    return [];
  },
  // Pause = ein Ort: die Gespräche der Orte (stehen in GESPRAECHE_N3)
  n3_wortJagd: () => GESPRAECHE_N3.n3_woerter,
  n3_zuFreiYusuf: () => GESPRAECHE_N3.n3_freiYusuf,
  n3_zuFreiManon: () => GESPRAECHE_N3.n3_freiManon,
  n3_zuFreiBen: () => GESPRAECHE_N3.n3_freiBen,
  n3_zuFreitag: () => GESPRAECHE_N3.n3_freitag,
  n3_zuYusuf: () => [{ hin: { du: [26.0, 18.6, 0.7] } }, ...GESPRAECHE_N3.n3_pauseYusuf],
  n3_zuManon: () => GESPRAECHE_N3.n3_pauseManon,
  n3_zuBen: () => GESPRAECHE_N3.n3_pauseBen,
  // Währenddessen: wer nicht bei Yusuf war, sieht ihn – sonst Manon allein am Rand
  n3_waehrenddessen: () => (c.S.merke.pause3Yusuf || c.S.merke.pause3ZuYusuf
    ? [{ szene: 'schnitt', pruefe: false, def: { bild: 'k3ManonPause', ort: 'Am Rand', t: 'Manon. Das Wörterbuch offen. Keiner spricht sie an.' } }]
    : [{ foto: 'auchYusuf3', wer: 'yusuf', von: [-3.6, 2.1, -3.2], auf: [0, 1.5, 0], fov: 50 }, { szene: 'schnitt', pruefe: false, def: { bild: 'auchYusuf3', ort: 'Korb', t: 'Yusuf. Nach jedem Wurf ein Blick aufs Handy. Auf die Uhrzeit.' } }]),
  // Werkzeug „Mischpult“ ins Skills-Heft (nur noch in der Skills-Stunde)
  n3_mischpultKarte: () => {
    const S = c.S; S.merke.mischpultKarte = true;
    S.skillsHeft = S.skillsHeft || [];
    if (!S.skillsHeft.some((x) => x.titel === 'Das Mischpult')) S.skillsHeft.push({ kap: 3, titel: 'Das Mischpult', punkte: KARTE_MISCHPULT.punkte });
    c.ui.toast('<b>🎚 Das Mischpult</b><span>Steckt jetzt in deinem Skills-Heft. Je mehr Gefühlswörter du findest, desto mehr Regler hast du.</span>', 'ly-t-ent');
    return [];
  },
  n3_wort: () => { const m = c.S.merke; m.woerter = (m.woerter || 0) + 1; return []; },
  n3_woerterStand: () => {
    const n = c.S.merke.woerter || 0;
    c.ui.toast('<b>🖍 Wörter-Jagd</b><span>' + n + (n === 1 ? ' Gefühlswort' : ' Gefühlswörter') + ' gefunden.</span>', 'ly-t-ent');
    return n >= 5 ? [['kaya', 'Fünf Wörter in einer Pause. Die meisten Erwachsenen haben drei. Für alles.']] : [];
  },
  // Aufstellung: wer zuerst, wer übrig bleibt, wer am Ende den Pass nicht fängt
  n3_aufstellung: () => {
    const S = c.S, m = S.merke, r = (S.sz && S.sz.k3Aufstellung) || { team: [], uebrig: [] };
    const team = r.team || [], uebrig = r.uebrig || [];
    m.k3Team = team; m.k3Uebrig = uebrig; m.k3Letzter = letzterFaenger(team, m);
    const erste = team[0]; if (erste && ['yusuf', 'ben', 'noah', 'lina'].includes(erste)) m['wahl' + erste[0].toUpperCase() + erste.slice(1)] = true;   // Kapitel 6 erinnert sich
    const zeilen = [];
    if (uebrig.includes('noah')) zeilen.push(['erzaehler', 'Noah bleibt an der Wand stehen. Er zählt weiter die Linien.']);
    if (uebrig.includes('lina')) zeilen.push(['erzaehler', 'Lina setzt sich auf die Bank. Sie holt ihr Heft raus.']);
    if (uebrig.includes('yusuf')) zeilen.push(['yusuf', '(zu laut) Echt jetzt? Ich bin der Schnellste hier.']);
    if (uebrig.includes('manon')) zeilen.push(['erzaehler', 'Manon setzt sich neben Frau Sommer. Sie schaut genau zu, wie das Spiel geht.']);
    if (team.includes('ben') && !m.benWach) zeilen.push(['ben', '(gähnt) Ich bin da. Ich bin voll da.']);
    zeilen.push(['sommer', 'Anpfiff!']);
    return zeilen;
  },
  n3_spielEnde: () => {
    const m = c.S.merke, wer = F[m.k3Letzter] ? F[m.k3Letzter].name : 'Jemand';
    const st = m.k3Stand || '';
    if (m.k3Gewonnen) return [['erzaehler', 'Abpfiff. ' + st + '. Ihr gewinnt! Nur einmal ging der Ball verloren: bei ' + wer + '.'], ['jo', 'FINALE! Um zehn nach drei!'], ['yusuf', '(schaut zur Uhr. Dann ist er draußen.)']];
    return [['erzaehler', 'Abpfiff. ' + st + '. Verloren. Der letzte Ball ging zu ' + wer + '. Weg war er.'], ['yusuf', '(tritt gegen die Bank) Spiel um Platz drei. Um zehn nach drei.']];
  },
  // Gang: wer den Pass nicht gefangen hat, steht jetzt vor Yusuf
  n3_gangStart: () => {
    const m = c.S.merke, id = m.k3Letzter || 'ben', wer = F[id] ? F[id].name : 'Ben';
    const satz = { ben: '(leise) Ich hab ihn nicht gesehen. Der war so schnell.', noah: '(schaut auf den Boden) … Sorry.', lina: '(sagt nichts. Ihre Hände zittern.)', mila: 'Hör auf. Das war ein Spiel.', manon: 'Pardon … pardon.', chiara: 'Wir haben alle verloren, nicht nur ich.', ayla: 'Schrei jemand anderen an.', jo: 'Chill. Das war ein Spiel, Mann.' }[id] || '…';
    return [{ hin: { [id]: [46.9, -1.7, -2.6] } }, ['yusuf', '(zu ' + wer + ') Du hattest ihn! Du hattest ihn in der Hand!'], [id, satz]];
  },
  n3_dankeAuch: () => { const id = c.S.merke.k3Letzter || 'ben'; return [[id, '(leise, hinter dir) Jetzt ist es noch schlimmer.']]; },
  n3_dazwischenDank: () => { const id = c.S.merke.k3Letzter || 'ben'; c.S.merke.k3Beschuetzt = id; return [[id, '(später, leise) Das vergess ich dir nicht.']]; },
  n3_gangFolge: () => {
    const m = c.S.merke;
    if (m.k3Zurueck) m.yusufMeidet = true;   // bis Kapitel 6
    if (m.k3Uhr) c.ui.toast('<b>🔓 Yusuf</b><span>Du hast gesehen, was unter der Wut war. Später öffnet sich etwas mit ihm.</span>', 'ly-t-ent');
    return [];
  },
  // Spur: der helle Streifen unten links – auf diesem Foto wie auf denen vom Account
  n3_streifen: () => { c.S.merke.spurStreifen = true; c.ui.toast('<b>🔎 Spur</b><span>Ein heller Streifen unten links. Auf dem Foto von Yusuf – und auf den Fotos vom Account.</span>', 'ly-t-ent'); return []; },
  n3_manonFreitag: () => {
    const n = c.S.merke.manonAngekommen || 0;
    if (n >= 3) return [['erzaehler', 'Manon steht mitten im Hof. Mit Chiara und Ayla. Sie lachen über etwas.'], ['manon', '(ruft) Salut, {name} ! Bon week-end ! … Schönes Wochen-ende!'], ['erzaehler', 'Sie hat ein neues Wort gelernt.']];
    if (n >= 1) return [['manon', '(winkt) Salut ! À lundi !'], ['erzaehler', 'Sie geht zum Bus. Allein, aber nicht verloren.']];
    return [['erzaehler', 'Manon steht am Rand. Das Wörterbuch in der Hand.'], ['manon', '(leise) Salut.']];
  },
});

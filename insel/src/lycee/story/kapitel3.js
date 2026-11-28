// Storyline 7e „@annexe.cam“ – Kapitel 3 „Unter der Wut“ (Gesamtkonzept, Heft #02 Gefühle: „Wut ist der Deckel“).
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
const PAUSE_HOF = { kaya: [0.7, 5.6, Math.PI], kenan: [-35.0, 10.4, 0.6], dario: [-31.0, 15.2, 1.6, 'handy'], yusuf: [28.6, 20.4, -1.2, 'handy'], manon: [-6.4, 9.2, 0.6], mila: [-10.6, 15.0, 2.4, 'redet'], lina: [-9.6, 16.0, -2.6, 'redet'], ben: [-2.6, 27.6, Math.PI, 'sitzt'], jo: [6.0, 15.2, -2.4, 'redet'], ayla: [7.6, 16.4, -2.0, 'redet'], bruder: [12.4, 41.0, Math.PI] };
// Wer den Ball verliert, ergibt sich aus deinen eigenen Pässen (Pass-Spiel). Wer müde ist (Ben ohne Schlaf), lässt manchmal einen durchrutschen.

export const SCHRITTE_N3 = [
  // 1 · Montag 7:25: Laub, und am Tor ein Mädchen mit einem Zettel. Wer hilft, lotst sie selbst (Wegweiser).
  { id: 'k3_morgen', kap: 3, tag: 'Montag', uhr: 7.42, titel: 'Laub', ziel: 'Überall Laub. Am Tor steht jemand und dreht einen Zettel hin und her.', marker: 'manon',
    start: { teleport: 'busAnkunft' },
    leute: { manon: [0.9, 35.6, Math.PI * 0.9], dario: [-21.5, 41.6, -1.6, 'sitzt'], ben: [-3.4, 33.4, 2.6], fahrer: [-11.2, 44.6, -Math.PI / 2], sabli: [3.2, 31.8, -2.4] },
    fertig: { reden: 'manon', gespraech: 'n3_tor' } },
  // 2 · Montag 8:15: Français – Manons Handy: die alte Liste. Wer am Tor weitergegangen ist, sieht zu, wie Jo übersetzt.
  { id: 'k3_franz', kap: 3, tag: 'Montag', uhr: 8.15, titel: 'La liste', ziel: 'Saal 1.04. Französisch bei Mme Sabli.', marker: null,
    start: { teleport: 'saal104Tuer', gespraech: 'n3_franz' },
    leute: { sabli: [-27, -24, Math.PI / 2], ...KLASSE, manon: pult(3, 1, 1) },
    fertig: { nachStart: true } },
  { id: 'k3_pantomime', kap: 3, tag: 'Montag', uhr: 9.1, neben: 'skills', titel: 'Skills: Sechs Grundgefühle', ziel: 'Aula. Herr Kuedes beginnt mit der Skills-Stunde.', marker: 'kaya',
    start: { teleport: 'eingangHof', gespraech: 'n3_checkin' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n3_pantomime' } },
  // 3 · Montag 9:50: Pause = ein Ort (Umbau). Skate-Ecke (7P1, Darios Handy), Yusuf am Korb, Manon, Ben.
  { id: 'k3_pause', kap: 3, tag: 'Montag', uhr: 9.83, titel: 'Große Pause', ziel: 'Große Pause. Wo bist du?', marker: null,
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
  { id: 'k3_familien', kap: 3, tag: 'Donnerstag', uhr: 9.9, neben: 'skills', titel: 'Skills: Die Wort-Leiter', ziel: 'Aula. Zweite Skills-Stunde bei Herrn Kuedes.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n3_familien' } },
  // 7 · Freitag 12:05: Kantine – das Foto von Yusuf im Klassenchat. Du darfst EINE Nachricht schreiben.
  { id: 'k3_kantine', kap: 3, tag: 'Freitag', uhr: 12.08, titel: '23 Reaktionen', ziel: 'Kantine. Am Tisch der 7P2 summen die Handys.', marker: 'mila',
    start: { teleport: 'kantineTuer' },
    leute: { mila: [10.75, -10.1, Math.PI / 2, 'sitzt'], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, -Math.PI / 2, 'sitzt'], chiara: [16.65, -12.1, -Math.PI / 2, 'sitzt'], yusuf: [10.75, -5.9, Math.PI / 2, 'sitzt'], kremer: [26.8, -9, -Math.PI / 2] },
    fertig: { reden: 'mila', gespraech: 'n3_kantine' } },
  // 8 · Freitag 15:40: zwei Minuten bis zum Bus – Yusuf, Manon, Ben. Dann Bens Sicht.
  { id: 'k3_freitag', kap: 3, tag: 'Freitag', uhr: 15.67, titel: 'Zwei Minuten', ziel: 'Hof. Zwei Minuten bis zum Bus. Wen siehst du noch?', marker: 'bus',
    start: { teleport: 'eingang', gespraech: 'n3_freitagHof' },
    leute: { yusuf: [28.6, 20.4, -1.2], manon: [-4.6, 22.0, 0.4], ben: [-2.55, 27.55, Math.PI, 'sitzt'], noah: [-1.4, 27.55, Math.PI, 'sitzt'], lenning: [-1.0, 4.4, Math.PI], dario: [-21.5, 41.6, -1.6, 'sitzt'], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { nachStart: true } },
];

// Gang: „Musst du weg?“ (oder 📎 vom Bruder an der Mauer) – Yusuf hört auf und sagt, was drunter liegt
const GANG_UHR = [['erzaehler', 'Yusuf hört mitten im Satz auf.'],
          ['yusuf', '… Um vier muss ich vor der Grundschule sein. Mein Bruder wartet sonst allein. Er ist sieben.'],
          { beweis: 'k3Bruder', t: 'Yusuf holt um vier seinen Bruder (7) ab.' },
          { wenn: (m) => !!m.k3Gewonnen, dann: [['yusuf', '(leiser) Finale um zehn nach drei. Das schaff ich nicht.']], sonst: [['yusuf', '(leiser) Siegerehrung um halb vier. Vorher darf keiner gehen.']] },
          { wahl: [
            { t: '„Geh. Ich sag Frau Sommer Bescheid.“', merke: 'k3YusufGeschickt', herz: { yusuf: 2 }, dann: [['yusuf', '(schon halb weg) … Danke.']] },
            { t: '„Bleib bis Schluss. Dann renn.“', merke: 'k3YusufGehalten', dann: [['yusuf', '(schaut zur Uhr) … Okay. Bis Schluss.']] },
          ] }];

// Wer an der Wand steht (Aufstellung): nur Namen. Kein „genauer hinschauen“ – die Zeit läuft.
const WAND = () => ['yusuf', 'ben', 'noah', 'jo', 'lina', 'manon', 'mila', 'chiara', 'ayla'].map((id) => ({ id, name: F[id].name, farbe: F[id].farbe }));
// Wen Jo (oder die 7P1) „wie immer übrig“ nennt: der Erste aus dieser Reihe, der an der Wand bleibt
const UEBRIG_REIHE = ['noah', 'lina', 'manon', 'mila', 'ayla', 'chiara', 'ben', 'yusuf', 'jo'];
const UEBRIG_SATZ = { noah: '(schaut kurz hoch) … Echt?', lina: '(steckt das Heft weg) Okay.', manon: 'Ta place ? … D’accord !', mila: 'Echt? … Okay.',
  ayla: 'Mir egal. … Okay. Danke.', chiara: 'Ich kenn alle Regeln. Ich bin bereit.', ben: '(gähnt) Okay. Ich bin wach. Fast.', yusuf: 'Na endlich. Ich bin der Schnellste.', jo: 'Ich bin der Beste hier! … Okay.' };

// Die alte Liste aus Kapitel 2, angepinnt im Klassenchat (Manon wurde gerade hinzugefügt)
// Französisch, Platz neben Jo: Manon fragt im Klassenchat nach der alten Liste. Jo tippt schon. Wer zuerst erklärt, macht das Bild von Noah.
const MANON_CHAT = {
  titel: '7P2', mitglieder: 22, dauer: 16, info: 'Manon fragt im Klassenchat. Jo tippt schon.',
  nachrichten: [
    { nach: 0.6, wer: 'Manon', text: 'c’est quoi la liste ? noah il ne parle jamais ?' },
    { nach: 1.8, system: true, text: 'Jo tippt …', wennNicht: 'erklaert' },
    { nach: 9.0, wer: 'Jo', text: 'il est bizarre 😂', wennNicht: 'erklaert', setzt: 'joZuerst' },
    { nach: 10.6, wer: 'Manon', text: 'ah. bizarre.', wennNicht: 'erklaert' },
    { nach: 13.0, system: true, text: 'Mme Sabli schaut zu euch.' },
  ],
  aktionen: [
    { id: 'antwort', t: 'Antworten', symbol: '💬', wennNicht: 'joZuerst', wahl: [
      { t: '„vieille liste. méchante.“', setzt: ['erklaert', 'falsch'], ich: 'vieille liste. méchante.', folgen: [{ nach: 1.6, wer: 'Manon', text: 'ah. d’accord. merci' }] },
      { t: '„demande à noah.“', setzt: ['erklaert', 'noah'], ich: 'demande à noah.', folgen: [{ nach: 1.6, wer: 'Manon', text: 'ok 🙂' }] },
      { t: '„rien. laisse.“', setzt: ['erklaert', 'nichts'], ich: 'rien. laisse.', folgen: [{ nach: 1.6, wer: 'Jo', text: 'il est bizarre 😂' }] },
    ] },
  ],
};
const LISTE_HANDY = (m) => ({ wer: 'Klassenchat 7P2', wann: '📌 angepinnt', chat: [
  { pin: true, wer: '📌 Jo · Screenshot vom Oktober', t: 'top 5 langweiligste leute annexe 😴 · 1 ' + (m.steckbriefTurm ? 'noah – baut türmchen haha' : 'noah – sagt nie was haha') + ' · 2 yusuf · 3 lina' },
  { wer: 'Ayla', t: 'willkommen manon 👋' }] });

export const GESPRAECHE_N3 = {
  // ---------- 1 · Montag 7:25: am Tor ----------
  n3_tor: [
    ['ben', '(rennt in einen Laubhaufen) Erster! Der Haufen gehört mir!'],
    { foto: 'k3Manon', wer: 'manon', von: [1.7, 1.45, -2.1], auf: [0, 1.1, 0], fov: 40 },
    ['manon', '(hält dir einen Zettel hin) Pardon … Salle 1.04 ? Madame Sabli ?'],
    { wahl: [
      { t: '„Salut ! Je te montre.“', staerke: 'lesen', herz: { manon: 2 }, merke: 'manonHallo',
        dann: [['manon', '(atmet aus) Merci ! Moi, c’est Manon.']] },
      { t: '„Frag Mme Sabli. Da drüben.“', merke: 'manonSabli',
        dann: [['manon', '(versteht nur den Namen) Sabli ? … Merci.'], ['erzaehler', 'Sie geht zu Mme Sabli. Du gehst rein.']] },
      { t: '(Weitergehen.)', merke: 'manonVorbei', herz: { manon: -1 },
        dann: [['erzaehler', 'Hinter dir fragt sie jemanden aus der 6e. Der zuckt mit den Schultern.']] },
    ] },
    // Wer hilft, lotst selbst: drinnen am Sekretariat, du musst noch zum Spind. Vier Wörter, sie macht genau, was du sagst.
    { wenn: (m) => !!m.manonHallo, dann: [
      ['du', 'Je dois aller au casier. Je t’explique le chemin.'],
      ['manon', 'D’accord. Lentement, s’il te plaît.'],
      { szene: 'weg', id: 'wegManon', def: { wer: F.manon, wo: 'Eingang', info: 'Ihr steht am Sekretariat. Du musst noch zum Spind. Sag Manon den Weg zur Salle 1.04 – auf Französisch. Sie geht genau so, wie du sagst.' },
        ausgang: (r) => (!r.angekommen ? 'nicht' : r.umwege === 0 ? 'direkt' : 'umweg'),
        folgen: {
          direkt: { merke: 'wegDirekt', herz: { manon: 2 }, staerke: 'klar', dann: [['manon', '(winkt aus der Tür von 1.04) Tout droit, à gauche. Facile !']] },
          umweg: { merke: 'wegUmweg', herz: { manon: 1 }, dann: [['manon', '(lacht, an der Tür von 1.04) La cantine à huit heures ! … Mais je suis là.']] },
          nicht: { merke: 'wegNicht', dann: [['erzaehler', 'Manon biegt falsch ab. Dann ist sie weg.']] },
        } }] },
  ],

  // ---------- 2 · Montag 8:15: Français – die alte Liste auf Manons Handy ----------
  n3_franz: [
    // Wer am Tor weitergegangen ist (oder sie falsch gelotst hat): Manon kommt zu spät – und die Klasse lacht.
    { wenn: (m) => !!(m.manonVorbei || m.wegNicht), dann: [
      ['erzaehler', '8:12. Die Tür geht auf. Manon, außer Atem. Der Zettel ist zerknüllt.'],
      ['manon', 'Pardon, Madame … J’étais à la cantine.'],
      ['jo', '(laut) Die Kantine! Um acht!'],
      ['sabli', 'Jo. Es reicht. … Assieds-toi, Manon.'],
    ] },
    // Wer sie weggeschickt hat: Sie sitzt neben Jo. Jo übersetzt die Liste. Du hast keine Wahl mehr.
    { wenn: (m) => !!(m.manonVorbei || m.manonSabli), dann: [
      { hin: { manon: pult(3, 2, 1) } },
      ['erzaehler', 'Frei ist nur der Platz neben Jo. Dein Handy summt. Der Klassenchat.'],
      { szene: 'chat', id: 'k3ManonChat', def: MANON_CHAT,
        ausgang: (r) => (r.flags.falsch ? 'falsch' : r.flags.noah ? 'noah' : r.flags.nichts ? 'nichts' : 'jo'),
        folgen: { falsch: { merke: 'manonListeFalsch', herz: { manon: 1, noah: 1 }, staerke: 'klar' }, noah: { merke: 'manonListeNoah', herz: { noah: 1 }, staerke: 'einbeziehen' },
          nichts: { merke: 'manonListeNichts' }, jo: { merke: 'manonListeJo' } } },
      { wenn: (m) => !!m.manonListeJo, dann: [['erzaehler', 'Zwei Reihen hinter Jo legt Noah den Stift weg.']],
        sonst: [{ wenn: (m) => !!m.manonListeNoah, dann: [['manon', '(dreht sich zu Noah um, leise) Pardon … la liste ?'], ['noah', '(überrascht) … Alt. Gemein. Egal.']] }] },
      ['sabli', 'Handys weg. Alle. Jo, du bleibst nachher.'],
    ], sonst: [
      ['erzaehler', 'Mme Sabli schreibt an die Tafel. Manon schiebt dir unter dem Tisch ihr Handy hin.'],
      ['manon', '(flüstert) Ils m’ont mise dans le groupe de la classe. Regarde.'],
      { handy: LISTE_HANDY },
      ['manon', 'C’est quoi, ça ? Noah … il ne parle jamais ?'],
      { wahl: [
        { t: '„Une vieille liste. Méchante.“', merke: 'manonListeFalsch', herz: { manon: 1, noah: 1 }, staerke: 'klar',
          dann: [['manon', 'Méchante ? … D’accord.'], ['erzaehler', 'Sie schaut kurz zu Noah. Er zeichnet sehr gerade Linien.']] },
        { t: '„Ça dit : il ne parle jamais.“', merke: 'manonListeGeglaubt', herz: { noah: -1 },
          dann: [['manon', 'Ah. Il est bizarre, alors ?'], ['erzaehler', 'Zwei Reihen hinter euch hört Noah auf zu zeichnen.']] },
        { t: '„Rien. Laisse.“', merke: 'manonListeNichts',
          dann: [['manon', '(schaut dich an) … Rien ?'], ['erzaehler', 'Sie lässt das Handy offen. Bei der Liste.']] },
        { t: '(Handy zurückschieben.)', merke: 'manonListeNichts', dann: [['manon', '(liest weiter. Mit dem Wörterbuch.)']] },
      ] },
      { handy: null },
      ['manon', '(leise) Tout est nouveau ici. Je suis un peu perdue.'],
      { wahl: [
        { t: '„Moi aussi, en septembre.“', merke: 'manonVerstanden', herz: { manon: 1 },
          dann: [['manon', '(lächelt zum ersten Mal richtig) Vraiment ?'], ['du', 'Vraiment. Perdue – verloren. Kenn ich.']] },
        { t: '„Pause ? Je te montre tout.“', merke: 'manonPauseAngebot', herz: { manon: 1 }, dann: [['manon', 'Oui. Merci.']] },
        { t: '(Nicken. Weiterschreiben.)', dann: [['manon', '(schreibt auch weiter. Ein Wort pro Minute.)']] },
      ] },
    ] },
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
    ['kaya', 'Am Donnerstag: die Angst. Von leise bis laut.'],
    ['erzaehler', 'Beim Rausgehen bleibt Mila kurz neben dir stehen.'],
    ['mila', 'Ekel auch bei Menschen. Wenn jemand gemein ist. Das wusste ich nicht.'],
  ],
  n3_familien: [
    ['erzaehler', 'Donnerstag. Gestern war das Turnier. In der Aula ist es unruhiger als sonst.'],
    { szene: 'skillsStunde', id: 's3_angst', def: S3_ANGST_FAMILIE, ausgang: (r) => (r.check ? 'gut' : 'weiter'),
      folgen: { gut: { staerke: 'lesen', merke: 's3Angst' }, weiter: { merke: 's3Angst' } } },
    ['kaya', 'Wenn euch diese Woche etwas eng wird: Welche Stufe ist es? Besorgt, nervös, ängstlich, panisch?'],
    { szene: 'stempel', def: { modul: 'Modul 2 · Gefühle verstehen', titel: 'Gefühle gelesen',
      gelernt: ['Sechs Grundgefühle und ihre Botschaft', 'Wort-Leitern: besorgt bis panisch, genervt bis rasend', 'Eigene Körperkarte gemacht', 'Unter die Wut geschaut: Was liegt darunter?'],
      mission: 'Merk dir einmal: Wo spürst du Wut?' }, folgen: {} },
  ],

  // ---------- 3 · Montag 9:50: Pause = ein Ort. Skate-Ecke: die 7P1 lästert über Yusuf, du hältst Darios Handy ----------
  n3_pause: [
    { foto: 'k3ManonPause', wer: 'manon', von: [2.2, 1.5, 1.8], auf: [0, 1.0, 0], fov: 42 },
    { szene: 'orte', id: 'pauseOrt3', pruefe: false,
      def: { titel: 'Große Pause · 9:50', info: 'Mittwoch ist Turnier gegen die 7P1. Du kannst nur an einem Ort sein.',
        orte: [
          { id: 'skate', sy: '🛹', name: 'Skate-Ecke', wer: 'Die 7P1. Sie reden übers Turnier.', bild: { wer: 'kenan', von: [4.2, 1.7, -0.8], auf: [1.2, 1.1, 1.2], fov: 50 } },
          { id: 'yusuf', sy: '🏀', name: 'Korb', wer: 'Yusuf wirft allein. Sehr hart.', bild: { wer: 'yusuf', von: [-3.6, 2.1, -3.2], auf: [0, 1.5, 0], fov: 50 } },
          { id: 'manon', sy: '📖', name: 'Manon', wer: 'Mit dem Wörterbuch am Rand.', bild: 'k3ManonPause' },
          { id: 'zaun', sy: '🚸', name: 'An der Mauer', wer: 'Eine Grundschulklasse läuft draußen vorbei. Einer ruft rüber.', bild: { wer: 'bruder', von: [0.9, 1.5, -2.8], auf: [0, 0.9, 0], fov: 44 } },
        ] },
      ausgang: (r) => r.ort,
      folgen: {
        skate: { merke: 'pause3Skate', dann: [{ hin: { du: [-32.0, 10.0, -1.5] } }, { tu: 'n3_zuSkate' }] },
        yusuf: { merke: 'pause3Yusuf', dann: [{ tu: 'n3_zuYusuf' }] },
        manon: { merke: 'pause3Manon', dann: [{ hin: { du: [-5.4, 10.4, -2.4] } }, { tu: 'n3_zuManon' }] },
        zaun: { merke: 'pause3Zaun', dann: [{ hin: { du: [12.2, 38.7, 0] } }, { tu: 'n3_zuZaun' }] },
      } },
    { tu: 'n3_waehrenddessen' },
    ['erzaehler', 'Es klingelt. Noch zwei Tage bis zum Turnier.'],
  ],
  // Skate-Ecke: Kenan lästert über Yusuf („der Bissige“ – dasselbe Wort steht am Freitag unter dem Foto).
  // Du filmst Kenans Trick mit Darios Handy: unten links im Bild ein heller Streifen. Dario nimmt das Handy schnell zurück.
  n3_skate: [
    ['kenan', '(stoppt das Brett mit dem Fuß) 7P2! Mittwoch spielt ihr gegen uns.'],
    ['kenan', 'Wer ist euer Bester? Der Bissige?'],
    { beweis: 'k3Bissig', t: 'Kenan (7P1) nennt Yusuf „den Bissigen“.' },
    ['erzaehler', 'Zwei aus der 7P1 lachen. Dario nicht. Er schaut auf sein Handy.'],
    { wahl: [
      { t: '„Lass Yusuf da raus.“', staerke: 'klar', merke: 'k3SkateYusuf', dann: [['kenan', 'Uh. Beschützen, ja?'], ['dario', '(schaut kurz hoch. Zu dir.)']] },
      { t: '(Mitlachen.)', merke: 'k3SkateGelacht', dann: [['kenan', 'Siehst du. Mit dir kann man reden.']] },
      { t: '(Nichts sagen.)', dann: [['kenan', '(zuckt mit den Schultern) War nur Spaß.']] },
    ] },
    ['kenan', 'Egal. Film meinen Trick! Dario, gib dein Handy.'],
    ['dario', '(zögert) … Nur kurz.'],
    { handy: { wer: 'Darios Handy · Kamera', wann: 'jetzt', foto: { wer: 'kenan', von: [0.9, 0.6, 1.5], auf: [0, 1.2, 0], fov: 52 }, streifen: true,
      alt: 'Kenan auf dem Brett, von unten gefilmt. Unten links ein heller Streifen.', text: '● REC 0:04' } },
    ['kenan', '(landet halb) Nochmal! Und nimm den Finger weg. Da ist was im Bild.'],
    ['du', 'Das ist nicht mein Finger.'],
    ['dario', '(nimmt dir das Handy schnell ab) Die Hülle. Gesprungen. Gib her.'],
    { handy: null },
    { beweis: 'k3Huelle', t: 'Darios Handy: Hülle unten links gesprungen. Im Bild ein heller Streifen.' },
    ['erzaehler', 'Dario steckt das Handy ein. Den Rest filmt keiner mehr.'],
  ],
  n3_pauseYusuf: [
    ['erzaehler', 'Yusuf wirft allein. Nach jedem Wurf schaut er aufs Handy. Auf die Uhrzeit.'],
    { tu: 'n3_uhrGesehen' },
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
  // An der Mauer: Yusufs kleiner Bruder läuft mit seiner Klasse vorbei. Was unter Yusufs Wut liegt, hat hier ein Gesicht.
  n3_pauseZaun: [
    ['erzaehler', 'Draußen läuft eine Grundschulklasse vorbei. Zweierreihe. Einer bleibt an der Mauer stehen.'],
    ['bruder', '(viel zu großer Ranzen) Bist du in Yusufs Klasse? Sag ihm: Mittwoch um vier! Nicht vergessen!'],
    { wahl: [
      { t: '„Mach ich.“', merke: 'k3ZaunVersprochen', dann: [['bruder', '(rennt seiner Reihe hinterher) Um VIER!'], { beweis: 'k3Vier', t: 'Yusufs kleiner Bruder an der Mauer: „Sag ihm: Mittwoch um vier!“' }] },
      { t: '„Sag’s ihm selbst.“', merke: 'k3ZaunSelbst', dann: [['bruder', '(schaut zum Korb) Er hört mich nicht. Er wirft.']] },
      { t: '(Weitergehen.)', dann: [['erzaehler', 'Hinter dir ruft er es noch einmal. Keiner dreht sich um.']] },
    ] },
  ],
  // ---------- 4 · Mittwoch 14:00: Hallenturnier ----------
  n3_turnier: [
    ['erzaehler', 'Mittwoch. Hallenturnier. 7P2 gegen 7P1.'],
    { foto: 'k3Halle', von: [45.2, 2.2, -9.0], auf: [46.4, 1.0, -15.0], fov: 52 },
    // Folge von Montag (Manons Handy): Was glaubt die Neue jetzt über Noah?
    { wenn: (m) => !!m.manonListeFalsch, dann: [['manon', '(auf der Bank, zu Noah) Ce mot, c’est quoi ? … Ah. Merci.']] },
    { wenn: (m) => !!(m.manonListeGeglaubt || m.manonListeJo), dann: [['jo', '(grinst) Guck. Manon sitzt schon ganz weit weg von Noah. Die checkt das.']] },
    { wenn: (m) => !!(m.benSelbst || m.benFuerIhn), dann: [['ben', '(gähnt, zu Yusuf) Samstag, zehn Uhr. Korb. Wieder?'], ['yusuf', '(nickt kurz)']] },
    { wenn: (m) => m.manonPauseAngebot && !m.pause3Manon, dann: [['manon', '(an dir vorbei, leise) Lundi. Pause. J’ai attendu.']] },
    ['sommer', '(liest vom Zettel) Erste Hälfte: Yusuf, Ben, Jo, Mila, Chiara. Und {name}.'],
    ['sommer', 'Zur Halbzeit wird getauscht. Alle spielen.'],
    // Kapitel 1, Sport: „Wer führt, trägt.“ Wer Yusuf gut geführt hat, den will er im Team. Wer sein Stopp übergangen hat, den nicht.
    { wenn: (m) => m.sportGut && !m.sportStoppIgnoriert, dann: [['yusuf', '(leise) Weißt du noch? Die Hütchen. Ich vertrau dir.']] },
    { wenn: (m) => m.sportJoStopp || m.sportNoahHand, dann: [['erzaehler', 'Noah schaut kurz hoch. Zu dir. Er hat die Sache mit der Hand nicht vergessen.']] },
    { tu: 'n3_aufstellung' },
    { tu: 'n3_uebrig' },
    ['sommer', 'Anpfiff!'],
    { szene: 'pass', id: 'k3Pass', def: (m) => ({ wo: 'Turnhalle', team: (m.k3Team || []).map((id) => F[id]).filter(Boolean), muede: m.benWach ? [] : ['ben'], runden: 6,
      bank: m.k3UebrigHin && F[m.k3UebrigId] ? 3 : 0 }),
      ausgang: (r, m) => { const st = r.stand || [0, 1]; m.k3Gewonnen = st[0] > st[1]; m.k3Stand = st[0] + ' : ' + st[1]; m.k3Letzter = r.letzter || null; m.k3Getauscht = !!r.getauscht; return (r.gute || 0) >= 4 ? 'gut' : 'mittel'; }, folgen: { gut: { merke: 'passGut', staerke: 'lesen' }, mittel: {} } },
    { tu: 'n3_spielEnde' },
  ],

  // ---------- 5 + 6 · Mittwoch 14:40: Yusuf explodiert (Hauptszene) ----------
  n3_gang: [
    ['erzaehler', 'Vor der Halle. Die Tür steht offen. Laute Stimmen.'],
    { tu: 'n3_gangStart' },
    { foto: 'k3Yusuf', von: [42.6, 0.55, 0.2], auf: [45.6, 1.35, -3.4], fov: 26 },
    { foto: 'auchUhr3', von: [45.4, 1.6, -2.6], auf: [46.0, 4.0, -5.8], fov: 40 },
    ['yusuf', '(zu dir) Und du! Was glotzt ihr alle so?!'],
    { foto: 'k3Pult', wer: 'du', von: [0.9, 1.6, 1.4], auf: [0, 1.4, 0], fov: 38 },
    // Das erste Körper-Signal (Heft #02, Stunde 3): Wer es in zwei Sekunden merkt und atmet, bleibt auf Gelb. Wer zu spät ist, landet auf Rot.
    { pult: { g: 'Wut', w: 5 } },
    { szene: 'stoerung', id: 'k3Hals', pruefe: false,
      def: { bild: 'k3Pult', t: 'Dein Körper wird heiß. Jetzt.', hin: '🫁 Atmen', bleib: 'Zurückstarren', zeit: 2.5 },
      ausgang: (r) => (r.hin ? 'frueh' : 'spaet'),
      folgen: { frueh: { merke: 'k3HalsFrueh', staerke: 'atmen', dann: [{ pult: { w: 6 } }, ['du', '(denkt) Heiß. Atmen. Und drunter?']] },
        spaet: { dann: [{ pult: { w: 8 } }, ['erzaehler', 'Zu spät. Alle schauen. Auf ihn. Auf dich.']] } } },
    // Folge von Montag: Wer an der Skate-Ecke mitgelacht hat, hat es jetzt schwerer (zweimal atmen)
    { wenn: (m) => !!m.k3SkateGelacht, dann: [['yusuf', 'Du lachst doch mit Kenan. Am Montag. Hab ich gesehen.'], { pult: { plus: 3 } }] },
    // Danach fragt nicht das System, sondern wer dabei war – nach DIR, nicht nach Yusuf (Heft #02: Wut ist oft der Deckel)
    { wahl: [
      { t: '„Schrei mich nicht an!“', merke: 'k3Zurueck', herz: { yusuf: -2 },
        dann: [['erzaehler', 'Yusuf macht einen Schritt auf dich zu. Er schubst. Du stößt mit der Schulter gegen die Wand.'],
          ['sommer', '(aus der Halle) HE! Alle beide! Zu Mme Tidderich. Sofort.'], { pult: null },
          ['erzaehler', 'Im Büro sitzt ihr nebeneinander und schaut an verschiedene Wände.'],
          ['hoffmann', '(zu dir) Erst du. Alles okay mit der Schulter?'], ['du', 'Geht.'],
          ['hoffmann', 'Yusuf, du bleibst heute bis halb fünf. {name}, du gehst zurück in die Halle.'],
          ['erzaehler', 'Yusuf sagt nichts. Er schaut auf die Uhr an der Wand. Dann auf seine Schuhe.']] },
      { t: '„Musst du weg?“', wenn: (m) => !m.k3ZaunVersprochen && !m.yusufMussWeg && !m.k3UhrGesehen, ruhig: true, staerke: 'lesen', merke: 'k3Uhr', herz: { yusuf: 2 }, dann: GANG_UHR },
      { t: '📎 „Musst du weg? Die Uhr.“', beweis: 'k3Uhr', wenn: (m) => !m.k3ZaunVersprochen && !m.yusufMussWeg && !!m.k3UhrGesehen, ruhig: true, staerke: 'lesen', merke: 'k3Uhr', herz: { yusuf: 2 }, dann: [['yusuf', '(stockt) … Du hast das gesehen?'], ...GANG_UHR] },
      { t: '📎 „Du hast gesagt: sofort weg.“', beweis: 'k3MussWeg', wenn: (m) => !m.k3ZaunVersprochen, ruhig: true, staerke: 'lesen', merke: 'k3Uhr', herz: { yusuf: 2 }, dann: [['yusuf', '(stockt) Das hast du dir gemerkt?'], ...GANG_UHR] },
      { t: '📎 „Um vier. Dein Bruder.“', beweis: 'k3Vier', ruhig: true, staerke: 'lesen', merke: 'k3Uhr', herz: { yusuf: 2 }, dann: [['yusuf', '(stockt) Der Kleine hat’s dir gesagt?'], ...GANG_UHR] },
      { t: '(Dazwischenstellen.)', merke: 'k3Dazwischen', herz: { yusuf: -1 },
        dann: [{ pult: { plus: 3 } }, ['yusuf', 'Geh weg! Das geht dich nichts an!'], ['erzaehler', 'Jetzt trifft seine Wut nur noch dich.'], { tu: 'n3_dazwischenDank' }] },
      { t: '(Frau Sommer holen.)', staerke: 'hilfe', merke: 'k3Sommer', dann: [{ tu: 'n3_sommer' }] },
    ] },
    { pult: null },
    { sicht: (m) => ({ wer: 'yusuf', auf: 'du', gedanken: [
      '14:42. Noch eine Stunde achtzehn.',
      'Das Handy summt. Mama, von der Arbeit: „Denk an deinen Bruder. Um vier. Ich schaff es nicht.“',
      m.k3Uhr ? 'Alle starren. Einer hat gefragt.' : 'Alle starren. Keiner fragt.',
      m.k3SommerGeholfen ? 'Frau Sommer ruft Mama an. Rennen. Ich schaff es.' : m.k3Sommer || m.k3Zurueck ? 'Halb fünf. Vor der Grundschule steht ein kleiner Junge mit einem viel zu großen Ranzen. Allein.' : m.k3YusufGeschickt ? 'Rennen. Wenn ich renne, schaff ich es.' : m.k3YusufGehalten ? 'Bis Schluss. Dann rennen. Hoffentlich wartet er.' : 'Ich kann nicht bleiben. Ich kann nicht gehen.'] }) },
    { tu: 'n3_leiter' },
    { tu: 'n3_gangFolge' },
  ],

  // ---------- 7 · Freitag 12:05: Kantine – das Foto im Klassenchat ----------
  n3_kantine: [
    ['erzaehler', 'Freitag. Kantine. Am Tisch der 7P2 summen fünf Handys gleichzeitig.'],
    { handy: { wer: 'Klassenchat 7P2', wann: 'vor 4 Min.', fotoId: 'k3Yusuf', streifen: true, alt: 'Yusuf vor der Halle, Mund offen, von unten fotografiert', text: '„yusuf nach dem turnier 😂 achtung bissig“ · weitergeleitet', zaehler: { start: 23, wort: 'Reaktionen' } } },
    ['jo', 'Wer hat das gemacht? Das ist so gut.'],
    ['mila', '(ernst) Das ist nicht gut. Melden geht. Ohne Namen.'],
    ['mila', 'Herr Kuedes hilft auch.'],
    { handy: null },
    // Zwei Tische weiter steht Yusuf auf. Mensch oder Chat – beides gleichzeitig geht nicht.
    ['erzaehler', 'Zwei Tische weiter steht Yusuf auf. Sein Tablett bleibt stehen.'],
    { szene: 'stoerung', id: 'k3YusufAuf', pruefe: false,
      def: { bild: { wer: 'yusuf', von: [1.4, 1.45, 1.2], auf: [0, 1.0, 0], fov: 46 }, t: 'Yusuf geht zur Tür. Schnell. Im Chat zählt es weiter.', hin: 'Hinterher', bleib: 'Hier bleiben', zeit: 6 },
      ausgang: (r) => (r.hin ? 'hin' : 'bleib'),
      folgen: { hin: { merke: 'k3YusufHinterher', dann: [
        ['erzaehler', 'An der Tür hält Yusuf dir sein Handy hin.'],
        { handy: { wer: 'Yusufs Handy', wann: 'jetzt', fotoId: 'k3Yusuf', streifen: true, alt: 'Yusuf vor der Halle, Mund offen, von unten fotografiert', text: '„yusuf nach dem turnier 😂 achtung bissig“', zaehler: { start: 34, wort: 'Reaktionen' } } },
        ['yusuf', 'Wer war das? Du warst dabei.'],
        { wahl: [
          { t: '📎 „Der Streifen. Darios Hülle.“', beweis: 'k3Huelle', merke: 'k3DarioGenannt', dann: [['yusuf', '(starrt auf den Streifen) … Dario.'], ['erzaehler', 'Er geht. Nicht zurück an seinen Tisch. Zur 7P1.']] },
          { t: '📎 „Das Wort sagt Kenan.“', beweis: 'k3Bissig', merke: 'k3KenanGenannt', dann: [['yusuf', '(leise) Kenan.'], ['erzaehler', 'Er schaut rüber zur 7P1. Kenan lacht gerade über etwas anderes.']] },
          { t: '„Weiß ich nicht.“', merke: 'k3NichtGewusstK', dann: [['yusuf', 'Keiner weiß was. Wie immer.']] },
          { t: '„Erst muss das weg.“', staerke: 'klar', herz: { yusuf: 1 }, merke: 'k3ErstWeg', dann: [['yusuf', '(atmet aus) … Ja. Erst weg.'], ['yusuf', 'Ich bleib hinter dir.']] },
        ] },
        { handy: null },
        ['erzaehler', 'Als du zurück am Tisch bist, steht der Zähler bei 41.']] },
        bleib: { dann: [['jo', '(schaut kurz hoch) Der Bissige ist beleidigt. 😂']] } } },
    // EINE Nachricht. Die stärkste Karte (📎, wahr!) ist die Falle: Was wahr ist, ist deshalb noch nicht deins zum Erzählen.
    { handy: (m) => ({ wer: 'Klassenchat 7P2', wann: 'jetzt', fotoId: 'k3Yusuf', streifen: true, alt: 'Yusuf vor der Halle, Mund offen, von unten fotografiert', text: '„yusuf nach dem turnier 😂 achtung bissig“', zaehler: { start: m.k3YusufHinterher ? 41 : 31, wort: 'Reaktionen', live: true } }) },
    ['erzaehler', 'Der Zähler läuft. Du kannst eine Nachricht schreiben. Eine.'],
    { wahl: [
      { t: '„Löscht das.“', staerke: 'mut', herz: { yusuf: 1, jo: -1 }, merke: 'k3ChatStopp',
        dann: [{ wenn: (m) => !!m.k3ErstWeg, dann: [{ tu: 'n3_zaehlerStopp' }, ['erzaehler', 'Yusuf steht hinter dir. Chiara sieht ihn. Sie schreibt: „Stimmt.“'], ['yusuf', '(zehn Minuten später, im Chat) Foto ist weg.']],
          sonst: [{ wenn: (m) => !!m.k3YusufHinterher, dann: [['erzaehler', 'Zu spät. Unter deiner Nachricht: noch zehn Lacher. Keiner schreibt „Stimmt.“'], ['yusuf', '(abends, im Chat) Foto ist weg. Hat lange gedauert.']],
            sonst: [{ tu: 'n3_zaehlerStopp' }, ['erzaehler', 'Drei Minuten nichts. Dann Chiara: „Stimmt.“ Dann Noah: „👍“. Der Zähler bleibt stehen.'], ['yusuf', '(eine Stunde später, im Chat) Foto ist weg.']] }] }] },
      { t: '📩 Chiara: „Schreibst du mit?“', staerke: 'einbeziehen', herz: { yusuf: 1, chiara: 1 }, merke: ['k3ChatStopp', 'k3ChiaraMit'],
        dann: [['chiara', '(liest. Nickt dir über den Tisch zu.) Du zuerst.'], { tu: 'n3_zaehlerStopp' }, ['erzaehler', '„Löscht das.“ Zwei Sekunden später Chiara: „Stimmt. Löscht das.“ Der Zähler bleibt stehen.'], ['yusuf', '(eine halbe Stunde später, im Chat) Foto ist weg.']] },
      { t: '„Er hatte einen Grund.“', wenn: (m) => !m.k3Uhr, merke: 'k3ChatGrund', herz: { yusuf: 1 },
        dann: [['jo', '(tippt sofort) Welchen denn? 😂 Erzähl!'], { tu: 'n3_grundDruck' }] },
      { t: '📎 „Sein Bruder wartete allein!“', beweis: 'k3Bruder', merke: 'k3BruderVerraten', herz: { yusuf: -3 }, dann: [{ tu: 'n3_bruderFalle' }] },
      { t: '(Weiterscrollen.)', merke: 'k3ChatNichts', dann: [{ wenn: (m) => !!m.k3YusufHinterher, dann: [['jo', '(scrollt) Fünfzig.']], sonst: [['jo', '(scrollt) Fast vierzig.']] }] },
    ] },
    { handy: null },
  ],

  // ---------- 8 · Freitag 15:40: zwei Minuten bis zum Bus ----------
  n3_freitagHof: [
    ['erzaehler', 'Freitag, 15:40. Zwei Minuten bis zum Bus.'],
    { tu: 'n3_yusufKommt' },
    { tu: 'n3_zuFreitag' },
  ],
  n3_freitag: [
    { tu: 'n3_manonAngekommen' },
    { blende: 'Freitag · 21:00' },
    ['erzaehler', '@annexe.cam postet eine schwarze Kachel. Weiße Schrift: „mittwoch. 8:34.“'],
    { tu: 'kapitelEnde' },
  ],
};

// Rückblick in Bildern (Gesamtkonzept K3): Manon am Tor, deine Aufstellung, Yusuf im Gang, du in dem Moment, „Das war auch“: die Uhr, Manon am Freitag
// Das erste Körpersignal (Wort-Leiter) – auch für Kapitel 4
export const SIGNAL3 = (m) => (m.k3SignalHals ? 'Hals' : m.k3SignalBauch ? 'Bauch' : m.k3SignalHaende ? 'Hände' : m.k3SignalKopf ? 'Kopf' : m.k3SignalBrust ? 'Brust' : m.k3SignalBeine ? 'Beine' : '');
export const RUECKBLICK_N3 = (m) => {
  const n = m.manonAngekommen || 0;
  return [
    { id: 'k3Manon', titel: 'Am Tor', text: m.manonHallo ? 'Manon mit ihrem Zettel. Du hast ihr den Weg gezeigt.' : m.manonVorbei ? 'Manon mit ihrem Zettel. Du bist vorbeigegangen.' : 'Manon mit ihrem Zettel. Du hast sie zu Mme Sabli geschickt.' },
    { id: 'k3Halle', titel: 'Die Aufstellung', text: (m.k3Team || []).map((id) => F[id] ? F[id].name : id).join(', ') + (m.k3Uebrig && m.k3Uebrig.length ? '. An der Wand blieben: ' + m.k3Uebrig.map((id) => F[id] ? F[id].name : id).join(', ') + '.' : '.') },
    { id: 'k3Yusuf', titel: 'Im Gang', text: m.k3Uhr ? 'Yusuf, rot vor Wut. Darunter: Angst um seinen kleinen Bruder.' : m.k3UhrSpaet ? 'Yusuf, rot vor Wut. Am Freitag hast du nach der Uhr gefragt. Darunter: sein Bruder.' : 'Yusuf, rot vor Wut. Alle haben nur die Wut gesehen.' },
    { id: 'k3Pult', titel: 'Du, in dem Moment', text: (m.k3HalsFrueh ? 'Heiß. Du hast sofort geatmet. ' : m.rotGeatmet3 ? 'Erst Rot. Dann hast du geatmet. ' : 'Rot. ') + (m.k3Uhr ? 'Dann hast du gefragt.' : m.k3Zurueck ? 'Du hast zurückgeschrien.' : m.k3Sommer ? 'Dann hast du Frau Sommer geholt.' : m.k3Dazwischen ? 'Du hast dich dazwischengestellt.' : 'Alle haben geschaut.')
      + (() => { const a = m.k3LeiterGenervt ? 'genervt' : m.k3LeiterSauer ? 'sauer' : m.k3LeiterWuetend ? 'wütend' : m.k3LeiterRasend ? 'rasend' : ''; if (!a) return '';
        const d = m.k3DrunterAngst ? 'Angst' : m.k3DrunterScham ? 'Scham' : 'noch offen', sg = SIGNAL3(m) ? ' Zuerst: ' + SIGNAL3(m) + '.' : '';
        return ' Du: ' + a + '. Drunter: ' + d + '.' + sg; })() },
    !m.k3Uhr && !m.k3UhrSpaet ? { id: 'auchUhr3', titel: 'Das war auch', text: 'Über der Hallentür hing eine Uhr. Yusuf hat dauernd hingeschaut. Schon am Montag am Korb.', auch: true } : null,
    { id: 'k3ManonPause', titel: 'Manon am Freitag', text: (m.k3Eingestiegen ? 'Im Bus saß sie neben dir. Mit dem Foto und einem Wort, das sie nicht kannte.' : n >= 3 ? 'Sie steht mitten im Hof. Mit Chiara und Ayla.' : n >= 1 ? 'Sie geht allein zum Bus. Das Wörterbuch unterm Arm.' : 'Sie steht noch am Rand. Mit dem Wörterbuch.') },
  ].filter(Boolean);
};

// TUN für Kapitel 3 (in spiel.js eingehängt: tunN3)
export const tunN3 = (c) => ({
  // Wie gut ist Manon angekommen? Weg, die Liste ehrlich übersetzt, „perdue“ verstanden oder Pause bei ihr, Hallo am Tor, im Bus neben ihr (erst am Freitag zählen)
  n3_manonAngekommen: () => {
    const m = c.S.merke;
    m.manonAngekommen = (m.wegDirekt || m.wegUmweg ? 1 : 0) + (m.manonListeFalsch ? 1 : 0) + (m.manonVerstanden || m.pause3Manon ? 1 : 0) + (m.manonHallo ? 1 : 0) + (m.k3BusFache || m.k3BusPeur ? 1 : 0);
    m.woerter = Math.max(m.woerter || 0, 0) + (m.manonVerstanden ? 1 : 0);   // „perdue“: ein Gefühlswort mehr
    return [];
  },
  // Pause = ein Ort: die Gespräche der Orte (stehen in GESPRAECHE_N3)
  n3_zuSkate: () => GESPRAECHE_N3.n3_skate,
  n3_zuFreitag: () => GESPRAECHE_N3.n3_freitag,
  n3_zuYusuf: () => [{ hin: { du: [26.0, 18.6, 0.7] } }, ...GESPRAECHE_N3.n3_pauseYusuf],
  n3_zuManon: () => GESPRAECHE_N3.n3_pauseManon,
  n3_zuZaun: () => GESPRAECHE_N3.n3_pauseZaun,
  // Frau Sommer holen (geht auch auf Rot): Wer weiß, warum Yusuf weg muss, und es sagt, ändert den Nachmittag
  n3_sommer: () => {
    const m = c.S.merke, weiss = !!(m.k3ZaunVersprochen || m.yusufMussWeg);
    const start = [['sommer', '(kommt aus der Halle) Was ist hier los?']];
    if (weiss) { m.k3SommerGeholfen = true; return [...start, m.k3ZaunVersprochen ? ['du', 'Er muss um vier weg. Sein Bruder.'] : ['du', 'Er hat gesagt, er muss sofort weg.'], ['sommer', '(schaut Yusuf an) Stimmt das?'], m.k3ZaunVersprochen ? ['yusuf', '(nickt. Ganz kurz.)'] : ['yusuf', '(leise) Mein Bruder. Um vier.'], ['sommer', 'Dann geh. Ich ruf deine Mama an.']]; }
    return [...start, ['du', 'Weiß nicht. Er ist so rot.'], ['sommer', 'Yusuf, mit mir. Jetzt.'], ['yusuf', 'Aber ich muss –'], ['sommer', 'Du bleibst heute bis halb fünf.'], ['erzaehler', 'Yusuf schaut zur Uhr. 14:46. Er sagt nichts mehr.']];
  },
  // Später fragt jemand nach DEINER Wut (Wort-Leiter, Heft #02) – und sagt die eigene Stufe
  n3_leiter: () => {
    const m = c.S.merke, wer = m.linaVertraut || m.k1BeiLina ? 'lina' : m.listeBeiNoah || m.noahRausGefragt ? 'noah' : 'mila';
    const EIGEN = { lina: '(leise) Ich war erschrocken. Nicht sauer. Erschrocken.', noah: 'Ich war ängstlich. Laute Stimmen. Ich hasse das.', mila: 'Ich war erst genervt. Beim Schreien hatte ich Angst.' };
    const SIG = { lina: ['bauch', 'Bauch'], noah: ['brust', 'Brust'], mila: ['haende', 'Hände'] }[wer]; m.k3Frager = wer;
    const hoch = ((c.S.pultLog || {})[3] || {}).max >= 7; m.k3GemessenRot = hoch;
    return [[wer, '(später, leise) Wie sauer warst du? Vorhin.'],
      { fest: true, wahl: [
        { t: '„Genervt.“', merke: 'k3LeiterGenervt', dann: [] }, { t: '„Sauer.“', merke: 'k3LeiterSauer', dann: [] },
        { t: '„Wütend.“', merke: 'k3LeiterWuetend', dann: [] }, { t: '„Rasend.“', merke: 'k3LeiterRasend', dann: [] },
      ] },
      // Rückmeldung ohne richtig/falsch: nur, was der Körper gezeigt hat
      { wenn: (x) => hoch && !!(x.k3LeiterGenervt || x.k3LeiterSauer), dann: [[wer, '(schaut dich an) Hm. Dein Gesicht war knallrot.']] },
      [wer, EIGEN[wer]],
      { wenn: (x) => !!x.k3Zurueck, dann: [[wer, 'Dein Satz: „Schrei mich nicht an!“ Und bei dir? Drunter?']], sonst: [[wer, 'Und bei dir? Drunter?']] },
      { fest: true, wahl: [
        { t: '„Weiß nicht.“', merke: 'k3DrunterWeiss', dann: [] }, { t: '„Angst.“', merke: 'k3DrunterAngst', dann: [] },
        { t: '„Scham.“', merke: 'k3DrunterScham', dann: [] }, { t: '„Nichts.“', merke: 'k3DrunterNichts', dann: [] },
      ] },
      [wer, 'Wo merkst du so was zuerst? Bei mir: ' + SIG[1] + '.'],
      { szene: 'koerper', id: 'k3Signal', pruefe: false,
        def: { wo: 'Nur für dich', frage: 'Wo merkst du Wut zuerst? Tipp an.', vergleich: [{ wer: F[wer], zonen: [SIG[0]], satz: 'Bei mir: ' + SIG[1] + '.' }] },
        ausgang: (r, x) => { const z = (r && r.zonen) || [], k = { hals: 'k3SignalHals', bauch: 'k3SignalBauch', haende: 'k3SignalHaende', kopf: 'k3SignalKopf', brust: 'k3SignalBrust', beine: 'k3SignalBeine' }[z[0]];
          x[k || 'k3SignalWeiss'] = true; return 'ok'; }, folgen: { ok: {} } },
      [wer, 'Achte mal drauf. Wann?'],
      { fest: true, wahl: [
        { t: '❔ Weiß noch nicht.', merke: 'k3AchtenOffen', dann: [[wer, 'Okay. Montag frag ich trotzdem.']] },
        { t: '⚽ Im Sport.', merke: 'k3AchtenSport', dann: [[wer, 'Gut. Montag frag ich.']] },
        { t: '🏫 In der Pause.', merke: 'k3AchtenPause', dann: [[wer, 'Gut. Montag frag ich.']] },
        { t: '🎮 Beim Zocken.', merke: 'k3AchtenZocken', dann: [[wer, '(grinst) Da merk ich’s auch. Montag frag ich.']] },
      ] }];
  },
  // Währenddessen: wer nicht bei Yusuf war, sieht ihn – sonst Manon allein am Rand
  n3_waehrenddessen: () => (c.S.merke.pause3Yusuf || c.S.merke.pause3ZuYusuf
    ? [{ szene: 'schnitt', pruefe: false, def: { bild: 'k3ManonPause', ort: 'Am Rand', t: 'Manon. Das Wörterbuch offen. Keiner spricht sie an.' } }]
    : [{ foto: 'auchYusuf3', wer: 'yusuf', von: [-3.6, 2.1, -3.2], auf: [0, 1.5, 0], fov: 50 }, { szene: 'schnitt', pruefe: false, def: { bild: 'auchYusuf3', ort: 'Korb', t: 'Yusuf. Nach jedem Wurf ein Blick aufs Handy. Auf die Uhrzeit.' } }, { tu: 'n3_uhrGesehen' }]),
  n3_zaehlerStopp: () => { if (c.ui.zaehlerStopp) c.ui.zaehlerStopp(); return []; },
  n3_uhrGesehen: () => { c.S.merke.k3UhrGesehen = true; return [{ beweis: 'k3Uhr', t: 'Yusuf schaut nach jedem Wurf auf die Uhrzeit.' }]; },
  // Freitag am Bus: Yusuf kommt zu DIR. Sein erster Satz hängt davon ab, was im Gang und im Chat passiert ist.
  // Mittendrin ruft Manon – wer hingeht, verpasst Yusufs Ende.
  n3_yusufKommt: () => {
    const m = c.S.merke;
    m.frei3Yusuf = true;
    let auf, wahl, schluss = [];
    if (m.k3BruderVerraten) {
      auf = ['yusuf', 'Das im Chat. Warum?'];
      wahl = { wahl: [
        { t: '„Das war nicht meins.“', merke: 'k3VerratEingesehen', herz: { yusuf: 1 }, dann: [['yusuf', '(lange still) Nein. War es nicht.'], ['erzaehler', 'Er geht. An der Ecke dreht er sich noch einmal um.']] },
        { t: '„Wollte dir helfen.“', merke: 'k3VerratHelfen', dann: [['yusuf', 'Jetzt sagen alle Babysitter.'], ['erzaehler', 'Er geht zum Bus. Ohne sich umzudrehen.']] },
        { t: '(Nichts sagen.)', merke: 'k3VerratStill', dann: [['yusuf', '(wartet. Dann geht er.)']] },
      ] };
    } else if ((m.k3Sommer && !m.k3SommerGeholfen) || m.k3Zurueck) {
      auf = ['yusuf', 'Halb fünf. Er hat geweint.'];
      wahl = { wahl: [
        { t: '„Ich wusste das nicht.“', merke: 'k3NichtGewusst', dann: [['yusuf', 'Keiner wusste es. Ich hab’s keinem gesagt.']] },
        { t: '„Sorry. Echt.“', merke: 'k3Sorry', herz: { yusuf: 1 }, dann: [['yusuf', '(nickt kurz) … Okay.']] },
        { t: '„Du hast angefangen.“', wenn: (x) => !!x.k3Zurueck, merke: 'k3Angefangen', herz: { yusuf: -1 }, dann: [['yusuf', 'Ja. Hab ich.'], ['erzaehler', 'Er geht.']] },
        { t: '„Es sollte aufhören.“', wenn: (x) => !!x.k3Sommer, merke: 'k3Aufhoeren', dann: [['yusuf', '(zuckt mit den Schultern) Ja. Frau Sommer hätte fragen sollen.']] },
        { t: '📎 „Darum die Uhr?“', beweis: 'k3Uhr', merke: 'k3UhrSpaet', staerke: 'lesen', herz: { yusuf: 1 }, dann: [['yusuf', '(stockt) … Du hast das gesehen? Um vier. Mein Bruder.']] },
      ] };
      schluss.push({ wenn: (x) => !x.k3Angefangen, dann: [['yusuf', '(leiser) War nicht deine Schuld. Ich hab geschrien.']] });
      schluss.push({ wenn: (x) => !x.k3Angefangen, dann: [['yusuf', 'Die Schule hat Mama angerufen. Jetzt gibt’s einen Plan für Mittwoch.']] });
    } else if (m.k3Uhr || m.k3SommerGeholfen) {
      auf = m.k3Uhr ? ['yusuf', '(die Hände in den Taschen) Das im Gang … sorry.'] : ['yusuf', '(die Hände in den Taschen) Das im Gang … sorry. Frau Sommer hat Mama angerufen. Danke.'];
      wahl = { wahl: [
        { t: '📎 „Du hattest Angst um ihn.“', beweis: 'k3Bruder', merke: 'k3Uebersetzt', staerke: 'lesen', herz: { yusuf: 1 }, dann: [['yusuf', '(lange still) … Ja.']] },
        { t: '„Schon okay.“', merke: 'k3SchonOkay', dann: [['yusuf', 'Okay.']] },
        { t: '„War heftig. Echt.“', merke: 'k3Heftig', dann: [['yusuf', '(nickt) Weiß ich.']] },
      ] };
      if (m.k3YusufGehalten) schluss.push(['yusuf', 'Mittwoch war er zwölf Minuten allein. Ich hab’s geschafft. Knapp.'], ['yusuf', 'Ich hab’s Frau Sommer gesagt. Mittwochs darf ich jetzt früher.']);
      schluss.push(['erzaehler', 'Yusuf hält dir die Hand hin.'], { tu: 'handschlag', mit: 'yusuf' });
    } else {
      auf = ['yusuf', 'Mittwoch. Du hast dich vor ' + ((F[m.k3Letzter] || F.jo).name) + ' gestellt.'];
      wahl = { wahl: [
        { t: '„Warum warst du so?“', merke: 'k3DazwischenFrage', staerke: 'lesen', dann: [['yusuf', '(zögert) Ich musste weg. Um vier. Mein Bruder.']] },
        { t: '„Schon okay.“', merke: 'k3SchonOkay', dann: [['yusuf', 'Okay.']] },
        { t: '(Nicken.)', dann: [['yusuf', '(nickt zurück)']] },
      ] };
    }
    const chat = m.k3ChatStopp && !m.k3BruderVerraten ? [['yusuf', 'Das im Chat … „Löscht das.“ Danke.']] : [];
    if (m.k3ErstWeg && m.k3ChatNichts) chat.push(['yusuf', 'Du hast gesagt: erst weg. Dann hast du weitergescrollt.']);
    if (m.k3DarioGenannt) chat.push(['yusuf', 'Dario schwört, er war’s nicht. Das Handy war nicht bei ihm.']);
    else if (m.k3KenanGenannt) chat.push(['yusuf', 'Kenan sagt, „bissig“ sagen alle. Er hat nur gelacht.']);
    if (m.k3ZaunVersprochen && !m.k3Uhr && !m.k3SommerGeholfen) chat.push(['yusuf', 'Mein Bruder sagt, du solltest mir was sagen. Um vier.']);
    // Wer gefragt, sich dazwischengestellt oder sich entschuldigt hat: Yusuf nimmt dich mit zur Grundschule
    const grundschule = { wenn: (x) => !x.k3BruderVerraten && !!(x.k3Uhr || x.k3SommerGeholfen || x.k3Dazwischen || x.k3Sorry), dann: [['yusuf', 'Ich muss zur Grundschule. Kommst du mit?'], { wahl: [
      { t: '„Klar.“', merke: 'k3Mitgegangen', herz: { yusuf: 1 }, dann: [{ szene: 'schnitt', pruefe: false, def: { ort: 'Grundschule · 16:00', t: 'Ein kleiner Junge mit einem viel zu großen Ranzen rennt auf Yusuf zu. Pünktlich.' } }, ['yusuf', '(fängt ihn auf) Sag Hallo. Das ist {name}.']] },
      { t: '„Heute nicht.“', dann: [['yusuf', 'Okay.'], ['erzaehler', 'Er rennt los. Um vier ist er da.']] },
    ] }] };
    // Mitten in seinem ersten Satz kommt dein Bus. Ausweichen kostet nichts. Bleiben kostet vierzig Minuten.
    return [['erzaehler', 'Yusuf kommt über den Hof. Direkt zu dir.'], { hin: { yusuf: 'du' } }, ['yusuf', '{Hl}. Warte. Ich –'],
      { szene: 'stoerung', id: 'k3Bus', pruefe: false,
        def: { bild: { wer: 'yusuf', von: [1.5, 1.6, 1.8], auf: [0, 1.2, 0], fov: 46 }, t: 'Dein Bus fährt ein. Der nächste kommt in 40 Minuten.', hin: 'Einsteigen', bleib: 'Bleiben', zeit: 6 },
        ausgang: (r) => (r.hin ? 'weg' : 'da'),
        folgen: { weg: { merke: 'k3Eingestiegen', dann: [{ tu: 'n3_busManon' }] },
          da: { merke: 'k3Geblieben', dann: [['erzaehler', 'Der Bus fährt ohne dich. Am Fenster: Manon. Allein.'], auf, wahl, ...chat, ...schluss, grundschule] } } }];
  },
  // Einsteigen: Frei ist nur der Platz neben Manon. Sie hat das Foto – und ein Wort, das sie nicht kennt. Wieder übersetzt du über jemanden.
  n3_busManon: () => {
    const m = c.S.merke;
    return [{ blende: 'Freitag · 15:42 · im Bus' },
      ['erzaehler', 'Frei ist nur der Platz neben Manon. Sie hält dir ihr Handy hin.'],
      { handy: { wer: 'Manons Handy · Klassenchat', wann: 'heute', fotoId: 'k3Yusuf', streifen: true, alt: 'Yusuf vor der Halle, Mund offen, von unten fotografiert', text: '„yusuf nach dem turnier 😂 achtung bissig“',
        ...(m.k3BruderVerraten ? { chat: [{ ich: true, t: 'sein bruder wartete allein!' }] } : {}) } },
      ['manon', '„Bissig“ … c’est quoi ?'],
      { wahl: [
        { t: '„Méchant.“', merke: 'k3BusMechant', dann: [['manon', '(nickt langsam) Méchant. D’accord.'], ['erzaehler', 'Sie schreibt es in ihr Wörterbuch. Neben Yusufs Namen.']] },
        { t: '„Fâché. Très fâché.“', merke: 'k3BusFache', staerke: 'lesen', herz: { manon: 1 }, dann: [['manon', 'Fâché … pas méchant. Fâché.'], ['du', 'Oui. Il y a une différence.']] },
        { t: '📎 „Il avait peur.“', beweis: 'k3Bruder', merke: 'k3BusPeur', staerke: 'lesen', herz: { manon: 1 }, dann: [['manon', '(schaut lange aufs Foto) Peur ? … De quoi ?'], ['du', 'C’est à lui de le dire.'], ['manon', '(nickt) D’accord.']] },
        { t: '(Handy zurückgeben.)', dann: [['manon', '(steckt es weg) … Okay.']] },
      ] },
      { handy: null },
      ['erzaehler', 'Durchs Fenster: Yusuf steht noch an der Haltestelle. Er schaut dem Bus nach.'],
      // Nach der Bruder-Falle: eine zweite Chance, leise, privat (keine Belohnung – nur ein „ok.“)
      ...(m.k3BruderVerraten ? [['du', '(denkt) Unter dem Foto: dein Satz. Über seinen Bruder.'], { wahl: [
        { t: '📩 „Sorry. War nicht meins.“', merke: 'k3VerratEingesehen', herz: { yusuf: 1 }, dann: [{ handy: { wer: 'Yusuf · privat', wann: 'jetzt', chat: [{ ich: true, t: 'sorry. das mit deinem bruder war nicht meins.' }, { wer: 'yusuf', t: 'ok.' }] } }, { handy: null }] },
        { t: '(Nicht schreiben.)', merke: 'k3VerratStill', dann: [] },
      ] }] : []),
      // Wer einsteigt, verpasst Yusufs Freitag – der Halt kommt trotzdem an (nicht deine Schuld, Erwachsene haben einen Plan)
      ...(() => { const halb = !m.k3BruderVerraten && ((m.k3Sommer && !m.k3SommerGeholfen) || m.k3Zurueck);
        const chat = [...(m.k3ChatStopp && !m.k3BruderVerraten ? [{ wer: 'yusuf', t: 'das mit „löscht das“. danke' }] : []),
          ...(halb ? [{ wer: 'yusuf', t: 'war nicht deine schuld. ich hab geschrien.' }, { wer: 'yusuf', t: 'die schule hat jetzt einen plan für mittwoch.' }] : []),
          ...(!halb && m.k3YusufGehalten && !m.k3BruderVerraten ? [{ wer: 'yusuf', t: 'hab’s frau sommer gesagt. mittwochs darf ich früher.' }] : [])];
        if (halb) m.k3HaltBus = true;
        return chat.length ? [{ handy: { wer: 'Yusuf', wann: 'jetzt', chat } }, { handy: null }] : []; })()];
  },
  n3_wort: () => { const m = c.S.merke; m.woerter = (m.woerter || 0) + 1; return []; },
  // Aufstellung: wer zuerst, wer an der Wand bleibt
  n3_aufstellung: () => {
    // Runde 5: Frau Sommer stellt auf (fester Zettel). Wen du holst, merkt sich Kapitel 6 jetzt über „übrig“ (n3_uebrig).
    const m = c.S.merke, team = ['yusuf', 'ben', 'jo', 'mila', 'chiara'], uebrig = ['noah', 'lina', 'manon', 'ayla'];
    m.k3Team = team; m.k3Uebrig = uebrig; m.k3Letzter = null; m.k3UebrigId = null; m.k3UebrigHin = false; m.k3UebrigBlieb = false;
    const zeilen = [];
    if (team.includes('ben') && !m.benWach) zeilen.push(['ben', '(gähnt) Ich bin da. Ich bin voll da.']);
    return zeilen;
  },
  // „Übrig“: Beim Anpfiff ruft einer quer durch die Halle. Hingehen kostet den ersten Angriff – und zur Halbzeit wird wirklich getauscht.
  n3_uebrig: () => {
    const m = c.S.merke, ueb = m.k3Uebrig || [], id = UEBRIG_REIHE.find((x) => ueb.includes(x));
    if (!id || !F[id]) return [];
    m.k3UebrigId = id; const name = F[id].name;
    const ruf = (m.k3Team || []).includes('jo') && id !== 'jo' ? ['jo', '(laut, quer durch die Halle) ' + name + ' wie immer übrig! 😂'] : ['kenan', '(von der 7P1-Seite) Ey! ' + name + ' wie immer übrig!'];
    return [ruf, { szene: 'stoerung', id: 'k3Uebrig', pruefe: false,
      def: { bild: { wer: id, von: [1.4, 1.6, 2.0], auf: [0, 1.2, 0], fov: 44 }, t: name + ' steht allein an der Wand. Ein paar lachen.', hin: 'Zu ' + name, bleib: 'Anpfiff abwarten', zeit: 6 },
      ausgang: (r, x) => { if (r.hin && ['noah', 'lina'].includes(id)) x['wahl' + id[0].toUpperCase() + id.slice(1)] = true; return r.hin ? 'hin' : 'bleib'; },   // Kapitel 6 erinnert sich
      folgen: { hin: { merke: 'k3UebrigHin', herz: { [id]: 2 }, dann: [['du', 'Nimm meinen Platz. Erste Hälfte.'], [id, UEBRIG_SATZ[id] || 'Okay.'], ['erzaehler', 'Du setzt dich auf die Bank. Die Halle schaut kurz. Dann nicht mehr.']] },
        bleib: { merke: 'k3UebrigBlieb', dann: [['erzaehler', name + ' setzt sich auf die Bank. Ganz ans Ende.'], ['sommer', '(laut) ' + name + ', zweite Hälfte bist du drin. Fest.']] } } }];
  },
  n3_spielEnde: () => {
    const m = c.S.merke, st = m.k3Stand || '', id = m.k3Letzter, wer = id && F[id] ? F[id].name : '';
    const z = m.k3Gewonnen
      ? [['erzaehler', 'Abpfiff. ' + st + '. Ihr gewinnt!' + (wer ? ' Einmal ging der Ball verloren: bei ' + wer + '.' : '')], ['jo', 'FINALE! Um zehn nach drei!'], ['yusuf', '(schaut zur Uhr. Dann ist er draußen.)']]
      : [['erzaehler', 'Abpfiff. ' + st + '. Verloren.' + (wer ? ' Den letzten Ball hat ' + wer + ' verloren.' : '')], ['sommer', 'Für euch ist Schluss. Siegerehrung um halb vier. Bis dahin bleiben alle hier.'], ['yusuf', '(tritt gegen die Bank. Dann ist er draußen.)']];
    if (m.k3UebrigHin && m.k3Getauscht && F[m.k3UebrigId]) z.splice(1, 0, [m.k3UebrigId, m.k3UebrigId === 'manon' ? '(außer Atem, zu dir) Première mi-temps. Merci.' : '(außer Atem, zu dir) Ich war drin. Danke.']);
    return z;
  },
  // Gang: wer den Ball verloren hat, steht jetzt vor Yusuf. Hat keiner einen verloren, trifft es Jo (der jubelt).
  n3_gangStart: () => {
    const m = c.S.merke, id = m.k3Letzter;
    if (!id || !F[id]) return [{ hin: { jo: [46.9, -1.7, -2.6] } }, ['yusuf', '(zu Jo) ' + (m.k3Gewonnen ? 'Hör auf zu jubeln! Hör einfach auf!' : 'Was grinst du so?!')], ['jo', 'Chill. Das war ein Spiel, Mann.']];
    const wer = F[id].name;
    const satz = { ben: '(leise) Ich hab ihn nicht gesehen. Der war so schnell.', noah: '(schaut auf den Boden) … Sorry.', lina: '(sagt nichts. Ihre Hände zittern.)', mila: 'Hör auf. Das war ein Spiel.', manon: 'Pardon … pardon.', chiara: 'Wir haben alle verloren, nicht nur ich.', ayla: 'Schrei jemand anderen an.', jo: 'Chill. Das war ein Spiel, Mann.', yusuf: '…' }[id] || '…';
    return [{ hin: { [id]: [46.9, -1.7, -2.6] } }, ['yusuf', '(zu ' + wer + ') Du hattest ihn! Du hattest ihn in der Hand!'], [id, satz]];
  },
  n3_dankeAuch: () => { const id = c.S.merke.k3Letzter || 'jo'; return [[id, '(leise, hinter dir) Jetzt ist es noch schlimmer.']]; },
  n3_dazwischenDank: () => { const id = c.S.merke.k3Letzter || 'jo'; c.S.merke.k3Beschuetzt = id; return [[id, '(hinter dir, leise) Danke. Echt.']]; },
  // Nach dem Gang: was die Wahl gekostet hat (Finale, Pokal, ein kleiner Junge am Tor)
  n3_gangFolge: () => {
    const m = c.S.merke, z = [];
    if (m.k3Zurueck) m.yusufMeidet = true;   // bis Kapitel 6
    if (m.k3Uhr) c.ui.toast('<b>🔎 Unter der Wut</b><span>Angst. Um seinen Bruder.</span>', 'ly-t-ent');
    if (m.k3YusufGeschickt) {
      // Halt für Kinder mit ähnlicher Last: Erwachsene helfen sichtbar, Yusuf meldet sich
      if (m.k3Gewonnen) { m.k3Finale = 'verloren'; z.push(['jo', 'Finale zu viert? Wegen dem?'], ['erzaehler', 'Finale zu viert. 4 : 9.'], ['sommer', '(später, zu dir) Gut, dass du es gesagt hast. Ich ruf seine Mama an.']); }
      else z.push(['sommer', '(nickt) Gut, dass du es sagst. Er soll gehen.']);
      z.push({ handy: { wer: 'Yusuf', wann: '16:01', text: 'bin da. pünktlich. danke' } }, ['erzaehler', 'Um vier steht Yusuf am Schultor. Pünktlich.'], { handy: null });
    } else if (m.k3YusufGehalten) {
      if (m.k3Gewonnen) { m.k3Finale = 'gewonnen'; z.push(['erzaehler', 'Finale. Yusuf spielt wie verrückt. 8 : 6. Ihr holt den Pokal.'], ['jo', 'POKAL! Wir haben den POKAL!']); }
      else z.push(['erzaehler', 'Siegerehrung um halb vier. Yusuf steht ganz hinten und schaut nur auf die Uhr.']);
      z.push({ szene: 'schnitt', pruefe: false, def: { ort: 'Grundschule · 16:05', t: 'Ein kleiner Junge mit einem viel zu großen Ranzen. Allein am Tor.' } },
        ['erzaehler', '16:12. Yusuf kommt gerannt. ' + (m.k3Gewonnen ? 'Den Pokal hat er in der Halle vergessen.' : 'Ohne Jacke.')]);
    }
    return z;
  },
  // „Er hatte einen Grund.“ – jetzt wollen alle den Grund. Der 📎 liegt noch da.
  n3_grundDruck: () => [['ayla', 'Sag schon. Was für ein Grund?'], { wahl: [
    { t: '„Fragt ihn selbst.“', merke: 'k3GrundZu', dann: [['erzaehler', 'Keiner fragt ihn. Aber das Foto rutscht nach oben weg.']] },
    { t: '📎 „Sein Bruder wartete allein!“', beweis: 'k3Bruder', merke: 'k3BruderVerraten', herz: { yusuf: -3 }, dann: [{ tu: 'n3_bruderFalle' }] },
    { t: '(Handy weglegen.)', merke: 'k3GrundZu', dann: [['jo', 'Langweilig.']] },
  ] }],
  // Die Falle: wahr – aber nicht deins
  n3_bruderFalle: () => [['jo', 'Babysitter 😂😂'], ['erzaehler', 'Achtzehn neue Reaktionen. Alle unter deiner Nachricht.'],
    { handy: { wer: 'Yusuf · privat', wann: 'jetzt', chat: [{ wer: 'Yusuf', t: 'Das war meins.' }] } }, ['yusuf', '(schaut von seinem Tisch nicht hoch)']],


});

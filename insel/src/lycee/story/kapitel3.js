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
const PAUSE_HOF = { kaya: [0.7, 5.6, Math.PI], kenan: [-35.0, 10.4, 0.6], dario: [-32.6, 12.9, 1.2, 'handy'], yusuf: [28.6, 20.4, -1.2, 'handy'], manon: [-6.4, 9.2, 0.6], mila: [-10.6, 15.0, 2.4, 'redet'], lina: [-9.6, 16.0, -2.6, 'redet'], ben: [-2.6, 27.6, Math.PI, 'sitzt'], jo: [6.0, 15.2, -2.4, 'redet'], ayla: [7.6, 16.4, -2.0, 'redet'] };
// Wer den Ball verliert, ergibt sich aus deinen eigenen Pässen (Pass-Spiel). Wer müde ist (Ben ohne Schlaf), lässt manchmal einen durchrutschen.

export const SCHRITTE_N3 = [
  // 1 · Montag 7:25: Laub, und am Tor ein Mädchen mit einem Zettel
  { id: 'k3_morgen', kap: 3, tag: 'Montag', uhr: 7.42, titel: 'Laub', ziel: 'Überall Laub. Am Tor steht jemand und dreht einen Zettel hin und her.', marker: 'manon',
    start: { teleport: 'busAnkunft' },
    leute: { manon: [0.9, 35.6, Math.PI * 0.9], dario: [-21.5, 41.6, -1.6, 'sitzt'], ben: [-3.4, 33.4, 2.6], fahrer: [-11.2, 44.6, -Math.PI / 2], sabli: [3.2, 31.8, -2.4] },
    fertig: { reden: 'manon', gespraech: 'n3_tor' } },
  // 2 · Montag 8:00: Français – Manon ankommen lassen (Wegweiser, dann Manons Handy: „Übersetz mal“)
  { id: 'k3_franz', kap: 3, tag: 'Montag', uhr: 8.0, titel: 'À gauche, à droite', ziel: 'Sekretariat. Mme Sabli wartet mit Manon.', marker: 'sabli',
    start: { teleport: 'sekretariat' },
    leute: { sabli: [-20.2, -10.6, Math.PI], manon: [-21.8, -10.8, Math.PI * 0.9] },
    fertig: { reden: 'sabli', gespraech: 'n3_franz' } },
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
  { id: 'k3_familien', kap: 3, tag: 'Donnerstag', uhr: 9.9, neben: 'skills', titel: 'Skills: Die Angst-Leiter', ziel: 'Aula. Zweite Skills-Stunde bei Herrn Kuedes.', marker: 'kaya',
    start: { teleport: 'eingangHof' },
    leute: { kaya: [-14.50, -65.40, 0.00], ...AULA },
    fertig: { reden: 'kaya', gespraech: 'n3_familien' } },
  // 7 · Freitag 12:05: Kantine – das Foto von Yusuf im Klassenchat. Du darfst EINE Nachricht schreiben.
  { id: 'k3_kantine', kap: 3, tag: 'Freitag', uhr: 12.08, titel: '23 Reaktionen', ziel: 'Kantine. Am Tisch der 7P2 summen die Handys.', marker: 'mila',
    start: { teleport: 'kantineTuer' },
    leute: { mila: [10.75, -10.1, Math.PI / 2, 'sitzt'], noah: [10.75, -11.1, Math.PI / 2, 'sitzt'], ben: [16.65, -11.1, Math.PI / 2, 'sitzt'], jo: [16.65, -10.1, -Math.PI / 2, 'sitzt'], chiara: [16.65, -12.1, -Math.PI / 2, 'sitzt'], kremer: [26.8, -9, -Math.PI / 2] },
    fertig: { reden: 'mila', gespraech: 'n3_kantine' } },
  // 8 · Freitag 15:40: zwei Minuten bis zum Bus – Yusuf, Manon, Ben. Dann Bens Sicht.
  { id: 'k3_freitag', kap: 3, tag: 'Freitag', uhr: 15.67, titel: 'Zwei Minuten', ziel: 'Hof. Zwei Minuten bis zum Bus. Wen siehst du noch?', marker: 'bus',
    start: { teleport: 'eingang', gespraech: 'n3_freitagHof' },
    leute: { yusuf: [28.6, 20.4, -1.2], manon: [-4.6, 22.0, 0.4], ben: [-2.55, 27.55, Math.PI, 'sitzt'], noah: [-1.4, 27.55, Math.PI, 'sitzt'], lenning: [-1.0, 4.4, Math.PI], dario: [-21.5, 41.6, -1.6, 'sitzt'], fahrer: [-11.2, 44.6, -Math.PI / 2] },
    fertig: { nachStart: true } },
];

// Wer an der Wand steht (Aufstellung): nur Namen. Kein „genauer hinschauen“ – die Zeit läuft.
const WAND = () => ['yusuf', 'ben', 'noah', 'jo', 'lina', 'manon', 'mila', 'chiara', 'ayla'].map((id) => ({ id, name: F[id].name, farbe: F[id].farbe }));
// Wen Jo (oder die 7P1) „wie immer übrig“ nennt: der Erste aus dieser Reihe, der an der Wand bleibt
const UEBRIG_REIHE = ['noah', 'lina', 'manon', 'mila', 'ayla', 'chiara', 'ben', 'yusuf', 'jo'];
const UEBRIG_SATZ = { noah: '(schaut kurz hoch) … Okay.', lina: '(nickt. Sie steckt das Heft weg.)', manon: 'Deuxième mi-temps ? D’accord !', mila: 'Echt? … Okay.',
  ayla: 'Mir egal. … Okay. Danke.', chiara: 'Ich kenn alle Regeln. Ich bin bereit.', ben: '(gähnt) Zweite Hälfte. Bis dahin bin ich wach.', yusuf: 'Zweite Hälfte?! … Okay. Aber dann richtig.', jo: 'Zweite Hälfte? Ich bin der Beste hier! … Okay.' };

export const GESPRAECHE_N3 = {
  // ---------- 1 · Montag 7:25: am Tor ----------
  n3_tor: [
    ['erzaehler', 'Montag. Über das Wochenende ist das ganze Laub von der Linde gefallen.'],
    ['ben', '(rennt in einen Laubhaufen) Erster! Der Haufen gehört mir!'],
    ['erzaehler', 'Am Tor steht ein Mädchen, das du noch nie gesehen hast. Alle gehen um sie herum.'],
    { foto: 'k3Manon', wer: 'manon', von: [1.7, 1.45, -2.1], auf: [0, 1.1, 0], fov: 40 },
    ['manon', '(murmelt, auf ihren Zettel schauend) Salle 1.04 … Madame Sabli …'],
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
    ['erzaehler', 'Mme Sabli schreibt an die Tafel. Manon schiebt dir unter dem Tisch ihr Handy hin.'],
    ['manon', '(flüstert) Ils m’ont mise dans le groupe de la classe. Regarde.'],
    { handy: (m) => ({ wer: 'Klassenchat 7P2', wann: '📌 angepinnt', chat: [
      { pin: true, wer: '📌 Jo · Screenshot vom Oktober', t: 'top 5 langweiligste leute annexe 😴 · 1 ' + (m.steckbriefTurm ? 'noah – baut türmchen haha' : 'noah – sagt nie was haha') + ' · 2 yusuf · 3 lina' },
      { wer: 'Ayla', t: 'willkommen manon 👋' }] }) },
    ['manon', 'C’est quoi, ça ? Noah … il ne parle jamais ?'],
    { wahl: [
      { t: '„Une vieille liste. C’est faux.“', merke: 'manonListeFalsch', herz: { manon: 1, noah: 1 }, staerke: 'klar',
        dann: [['manon', 'Faux ? … D’accord.'], ['erzaehler', 'Sie schaut kurz zu Noah. Er zeichnet sehr gerade Linien.']] },
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
          { id: 'ben', sy: '🪑', name: 'Eure Bank', wer: 'Ben. Die Augen halb zu.', bild: { wer: 'ben', von: [0.5, 1.4, -2.0], auf: [0, 0.9, 0], fov: 44 } },
        ] },
      ausgang: (r) => r.ort,
      folgen: {
        skate: { merke: 'pause3Skate', dann: [{ hin: { du: [-32.0, 10.0, -1.5] } }, { tu: 'n3_zuSkate' }] },
        yusuf: { merke: 'pause3Yusuf', dann: [{ tu: 'n3_zuYusuf' }] },
        manon: { merke: 'pause3Manon', dann: [{ hin: { du: [-5.4, 10.4, -2.4] } }, { tu: 'n3_zuManon' }] },
        ben: { merke: 'pause3Ben', dann: [{ hin: { du: [-3.4, 26.4, 0.4] } }, { tu: 'n3_zuBen' }] },
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
      { t: '„Lass Yusuf da raus.“', staerke: 'klar', merke: 'k3SkateYusuf', dann: [['kenan', 'Uh. Ein Beschützer.'], ['dario', '(schaut kurz hoch. Zu dir.)']] },
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
    { wenn: (m) => !!(m.benSelbst || m.benFuerIhn), dann: [['ben', 'Samstag war ich am Korb. Mit Yusuf. Um zehn. Halb wach.']] },
    ['ben', 'Bis zwei gezockt. Mittwoch bin ich wieder fit. Easy.'],
    { wahl: [
      { t: '„Um zehn schreib ich. Dann Schluss.“', herz: { ben: 1 }, merke: 'benWach', staerke: 'einbeziehen',
        dann: [['ben', 'Du bist schlimmer als meine Mutter. … Okay. Um zehn.'], ['erzaehler', 'Er hält es tatsächlich. Zwei Abende.']] },
      { t: '„Mittwoch ist Turnier, Ben.“', merke: 'benGewarnt', dann: [['ben', 'Weiß ich. Bin fit. Voll.'], ['erzaehler', 'Er gähnt mitten im Satz.']] },
      { t: '(Neben ihn setzen. Nichts sagen.)', herz: { ben: 1 }, merke: 'benSchulter', dann: [['erzaehler', 'Ben schläft fast ein. Für eine Minute lehnt er an deiner Schulter.']] },
    ] },
  ],
  // ---------- 4 · Mittwoch 14:00: Hallenturnier ----------
  n3_turnier: [
    ['erzaehler', 'Mittwoch. Hallenturnier. 7P2 gegen 7P1.'],
    { foto: 'k3Halle', von: [45.2, 2.2, -9.0], auf: [46.4, 1.0, -15.0], fov: 52 },
    // Folge von Montag (Manons Handy): Was glaubt die Neue jetzt über Noah?
    { wenn: (m) => !!m.manonListeFalsch, dann: [['manon', '(auf der Bank, zu Noah) Ce mot, c’est quoi ? … Ah. Merci.']] },
    { wenn: (m) => !!m.manonListeGeglaubt, dann: [['jo', '(grinst) Guck. Manon sitzt schon ganz weit weg von Noah. Die checkt das.']] },
    ['sommer', '(zieht einen Zettel) {name}. Du stellst auf. Fünf Leute. Schnell.'],
    // Kapitel 1, Sport: „Wer führt, trägt.“ Wer Yusuf gut geführt hat, den will er im Team. Wer sein Stopp übergangen hat, den nicht.
    { wenn: (m) => m.sportGut && !m.sportStoppIgnoriert, dann: [['yusuf', '(leise) Weißt du noch? Die Hütchen. Ich vertrau dir.']] },
    { wenn: (m) => m.sportJoStopp || m.sportNoahHand, dann: [['erzaehler', 'Noah schaut kurz hoch. Zu dir. Er hat die Sache mit der Hand nicht vergessen.']] },
    { szene: 'aufstellung', id: 'k3Aufstellung', def: () => ({ wo: 'Turnhalle · 7P2', leute: WAND(), anzahl: 5, schnell: true, zeit: 10 }), ausgang: () => 'ok', folgen: { ok: {} } },
    { tu: 'n3_aufstellung' },
    { tu: 'n3_uebrig' },
    ['sommer', 'Anpfiff!'],
    { szene: 'pass', id: 'k3Pass', def: (m) => ({ wo: 'Turnhalle', team: (m.k3Team || []).map((id) => F[id]).filter(Boolean), muede: m.benWach ? [] : ['ben'], runden: 6,
      ohneStart: !!m.k3UebrigHin, tausch: m.k3UebrigHin && F[m.k3UebrigId] ? { rein: F[m.k3UebrigId], nach: 3 } : null }),
      ausgang: (r, m) => { const st = r.stand || [0, 1]; m.k3Gewonnen = st[0] > st[1]; m.k3Stand = st[0] + ' : ' + st[1]; m.k3Letzter = r.letzter || null; m.k3Getauscht = !!r.getauscht; return (r.gute || 0) >= 4 ? 'gut' : 'mittel'; }, folgen: { gut: { merke: 'passGut', staerke: 'lesen' }, mittel: {} } },
    { tu: 'n3_spielEnde' },
  ],

  // ---------- 5 + 6 · Mittwoch 14:40: Yusuf explodiert (Hauptszene) ----------
  n3_gang: [
    ['erzaehler', 'Vor der Halle. Die Tür steht offen. Laute Stimmen.'],
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
    { wenn: (m) => !!m.k3Letzter, dann: [['yusuf', '(zu dir) Und du! Wieso stellst du so einen auf?! Was glotzt ihr alle so?!']], sonst: [['yusuf', '(zu dir) Und du! Was glotzt ihr alle so?!']] },
    { foto: 'k3Pult', wer: 'du', von: [0.9, 1.6, 1.4], auf: [0, 1.4, 0], fov: 38 },
    // Das erste Körper-Signal (Heft #02, Stunde 3): Wer es in zwei Sekunden merkt und atmet, bleibt auf Gelb. Wer zu spät ist, landet auf Rot.
    { pult: { g: 'Wut', w: 5 } },
    { szene: 'stoerung', id: 'k3Hals', pruefe: false,
      def: { bild: 'k3Pult', t: 'Dein Hals wird heiß. Jetzt.', hin: '🫁 Atmen', bleib: 'Zurückstarren', zeit: 2.5 },
      ausgang: (r) => (r.hin ? 'frueh' : 'spaet'),
      folgen: { frueh: { merke: 'k3HalsFrueh', staerke: 'atmen', dann: [{ pult: { w: 6 } }, ['erzaehler', 'Ein Atemzug. Heiß ist es noch. Aber du kannst denken.']] },
        spaet: { dann: [{ pult: { w: 8 } }, ['erzaehler', 'Zu spät. Alle schauen. Auf ihn. Auf dich.']] } } },
    // Folge von Montag: Wer an der Skate-Ecke mitgelacht hat, hat es jetzt schwerer (zweimal atmen)
    { wenn: (m) => !!m.k3SkateGelacht, dann: [['yusuf', 'Du lachst doch mit Kenan. Am Montag. Hab ich gesehen.'], { pult: { plus: 3 } }] },
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
          { beweis: 'k3Bruder', t: 'Yusuf muss um vier seinen kleinen Bruder (7) von der Grundschule abholen.' },
          { wenn: (m) => !!m.k3Gewonnen, dann: [['yusuf', '(leiser) Finale um zehn nach drei. Das schaff ich nicht.']], sonst: [['yusuf', '(leiser) Siegerehrung um halb vier. Vorher darf keiner gehen.']] },
          { wahl: [
            { t: '„Geh. Ich sag Frau Sommer Bescheid.“', merke: 'k3YusufGeschickt', herz: { yusuf: 2 }, dann: [['yusuf', '(schon halb weg) … Danke.']] },
            { t: '„Bleib bis Schluss. Dann renn.“', merke: 'k3YusufGehalten', dann: [['yusuf', '(schaut zur Uhr) … Okay. Bis Schluss.']] },
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
      m.k3Sommer || m.k3Zurueck ? 'Halb fünf. Vor der Grundschule steht ein kleiner Junge mit einem viel zu großen Ranzen. Allein.' : m.k3YusufGeschickt ? 'Rennen. Wenn ich renne, schaff ich es.' : m.k3YusufGehalten ? 'Bis Schluss. Dann rennen. Hoffentlich wartet er.' : 'Ich kann nicht bleiben. Ich kann nicht gehen.'] }) },
    { tu: 'n3_gangFolge' },
  ],

  // ---------- 7 · Freitag 12:05: Kantine – das Foto im Klassenchat ----------
  n3_kantine: [
    ['erzaehler', 'Freitag. Kantine. Am Tisch der 7P2 summen fünf Handys gleichzeitig.'],
    { handy: { wer: 'Klassenchat 7P2', wann: 'vor 4 Min.', fotoId: 'k3Yusuf', streifen: true, alt: 'Yusuf vor der Halle, Mund offen, von unten fotografiert', text: '„yusuf nach dem turnier 😂 achtung bissig“ · weitergeleitet', zaehler: { start: 23, wort: 'Reaktionen' } } },
    ['jo', 'Wer hat das gemacht? Das ist so gut.'],
    ['mila', '(ernst) Das ist nicht gut. Und da stimmt was nicht.'],
    { handy: null },
    { szene: 'suchbild', id: 'k3Streifen', pruefe: false,
      def: { wo: 'Kantine · das Foto', frage: 'Mila: „Da stimmt was nicht.“ Tipp drauf.', zeit: 8, finde: 1, bild: 'k3Yusuf', streifen: true,
        gut: 'Ein heller Streifen. Wie eine Handyhülle vor der Linse.', verpasst: 'Unten links: ein heller Streifen.',
        ziele: [{ id: 'streifen', x: 0.07, y: 0.86, r: 0.09, t: 'Heller Streifen unten links.', kurz: 'Unten links ein heller Streifen. Wie eine Handyhülle.', beweis: 'k3Streifen' }] },
      ausgang: (r, m) => ((r.gefunden || []).length ? 'ja' : 'nein'), folgen: { ja: { dann: [{ bemerke: 'fotoStreifen' }] }, nein: {} } },
    { wenn: (m, S) => !!((S.bemerkt || {}).fotoStreifen), dann: [['mila', '(schreibt in ihr Heft) Streifen. Unten links. Wie auf den Fotos vom Account.'], { tu: 'n3_streifen' }] },
    // Wer in der Pause an der Skate-Ecke war, hat etwas in der Hand. Aber nur eins davon ist eine Spur.
    { wenn: (m, S) => !!((S.galerie || {}).k3Huelle || (S.galerie || {}).k3Bissig), dann: [
      ['mila', 'Hast du diese Woche was gesehen? Irgendwas?'],
      { wahl: [
        { t: '📎 Darios Hülle. Gesprungen.', beweis: 'k3Huelle', staerke: 'lesen', merke: 'k3HuelleErkannt',
          dann: [['mila', '(leise) Unten links? Genau da, wo der Streifen ist?'], ['mila', 'Kaputte Hüllen gibt es viele. Aber ich schreib es auf.'], { tu: 'n3_huelle' }] },
        { t: '📎 Kenan sagt „der Bissige“.', beweis: 'k3Bissig', merke: 'k3BissigGesagt',
          dann: [['mila', 'Das Wort kann jeder nachmachen. Einen Streifen nicht.'], { verdacht: 'kenan', spur: 'Nennt Yusuf „den Bissigen“. Wie im Post.' }] },
        { t: '(Nichts sagen.)', dann: [['mila', 'Okay. Wenn dir noch was einfällt …']] },
      ] },
    ] },
    // EINE Nachricht. Die stärkste Karte (📎, wahr!) ist die Falle: Was wahr ist, ist deshalb noch nicht deins zum Erzählen.
    { handy: { wer: 'Klassenchat 7P2', wann: 'jetzt', fotoId: 'k3Yusuf', streifen: true, alt: 'Yusuf vor der Halle, Mund offen, von unten fotografiert', text: '„yusuf nach dem turnier 😂 achtung bissig“', zaehler: { start: 31, wort: 'Reaktionen', live: true } } },
    ['erzaehler', 'Der Zähler läuft. Du kannst eine Nachricht schreiben. Eine.'],
    { wahl: [
      { t: '„Löscht das.“', staerke: 'mut', herz: { yusuf: 1, jo: -1 }, merke: 'k3ChatStopp',
        dann: [['erzaehler', 'Drei Minuten nichts. Dann Chiara: „Stimmt.“ Dann Noah: „👍“.'], ['yusuf', '(eine Stunde später, im Chat) Foto ist weg.']] },
      { t: '„Er hatte einen Grund.“', merke: 'k3ChatGrund', herz: { yusuf: 1 },
        dann: [['jo', '(tippt sofort) Welchen denn? 😂 Erzähl!'], { tu: 'n3_grundDruck' }] },
      { t: '📎 „Sein Bruder wartete allein!“', beweis: 'k3Bruder', merke: 'k3BruderVerraten', herz: { yusuf: -3 }, dann: [{ tu: 'n3_bruderFalle' }] },
      { t: '(Weiterscrollen.)', merke: 'k3ChatNichts', dann: [['jo', '(scrollt) Vierzig Reaktionen.']] },
    ] },
    { handy: null },
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
      folgen: { yusuf: { merke: 'frei3Yusuf', dann: [{ tu: 'n3_zuFreiYusuf' }] }, manon: { merke: 'frei3Manon', dann: [{ tu: 'n3_zuFreiManon' }] }, ben: { merke: 'frei3Ben', dann: [{ tu: 'n3_zuFreiBen' }] } } },
    { tu: 'n3_zuFreitag' },
  ],
  n3_freiYusuf: [
    { wenn: (m) => m.k3Zurueck || m.k3Dazwischen || m.k3BruderVerraten, dann: [['erzaehler', 'Yusuf sieht dich kommen. Er dreht sich weg und wirft weiter.']],
      sonst: [{ wenn: (m) => m.k3Uhr || m.k3ChatStopp || m.k3ChatGrund || m.k3YusufNachricht, dann: [
        ['yusuf', '(wirft dir den Ball zu) Eins gegen eins? Bis 15:42. Dann muss ich.'],
        { wenn: (m) => !!m.k3YusufGehalten, dann: [['yusuf', '(beim Werfen) Mittwoch war mein Bruder zwölf Minuten allein. Er hat geweint.']] },
        ['yusuf', '(hält den Ball fest) Das im Gang … sorry.'],
        // Wut-Übersetzer (Heft #02, Stunde 4): kein Raten, ein Satz – nur, wer weiß, was darunter lag
        { wahl: [
          { t: '📎 „Du hattest Angst um ihn.“', beweis: 'k3Bruder', merke: 'k3Uebersetzt', staerke: 'lesen', herz: { yusuf: 1 }, dann: [['yusuf', '(lange still) … Ja.']] },
          { t: '„Schon okay.“', merke: 'k3SchonOkay', dann: [['yusuf', 'Okay.']] },
          { t: '„War heftig. Echt.“', merke: 'k3Heftig', dann: [['yusuf', '(nickt) Weiß ich.']] },
        ] },
        ['erzaehler', 'Ihr spielt genau zwei Minuten. Dann hält er dir die Hand hin.'], { tu: 'handschlag', mit: 'yusuf' }],
        sonst: [['yusuf', '(ohne hinzuschauen) Was?'], ['erzaehler', 'Er wirft. Er trifft. Er schaut aufs Handy.']] }] },
  ],
  n3_freiManon: [
    { tu: 'n3_manonFreitag' },
  ],
  n3_freiBen: [
    ['erzaehler', 'Ben sitzt auf eurer Bank. Er dreht den Ball in den Händen.'],
    { sicht: (m) => ({ wer: 'ben', auf: 'du', gedanken: m.k3Letzter === 'ben'
      ? ['Alles ist ein bisschen langsam heute.', 'Der Ball am Mittwoch kam so schnell. Ich hab ihn erst gesehen, als er schon vorbei war.', m.benWach ? 'Dabei hab ich geschlafen. Diesmal echt.' : 'Bis zwei. Wieder.']
      : ['Alles ist ein bisschen langsam heute.', m.k3Team && m.k3Team.includes('ben') ? 'Am Mittwoch hab ich gefangen. Jeden Ball. Komisch, wie gut sich das anfühlt.' : m.k3UebrigId === 'ben' && m.k3UebrigHin ? 'Ich stand an der Wand. Dann kam wer und hat gesagt: zweite Hälfte. Und dann war ich drin.' : 'Ich stand am Mittwoch an der Wand. War vielleicht besser so.', m.benSchulter ? 'Montag hab ich an einer Schulter gepennt. Keiner hat gelacht.' : 'Heute geh ich früher off. Vielleicht.'] }) },
  ],
  n3_freitag: [
    { blende: 'Freitag · 21:00' },
    ['erzaehler', '@annexe.cam postet eine schwarze Kachel. Weiße Schrift: „mittwoch. 8:34.“'],
    { tu: 'kapitelEnde' },
  ],
};

// Rückblick in Bildern (Gesamtkonzept K3): Manon am Tor, deine Aufstellung, Yusuf im Gang, du in dem Moment, „Das war auch“: die Uhr, Manon am Freitag
export const RUECKBLICK_N3 = (m) => {
  const n = m.manonAngekommen || 0;
  return [
    { id: 'k3Manon', titel: 'Am Tor', text: m.manonHallo ? 'Manon mit ihrem Zettel. Du hast sie zuerst auf Französisch angesprochen.' : m.manonVorbei ? 'Manon mit ihrem Zettel. Du bist vorbeigegangen.' : 'Manon mit ihrem Zettel. Salle 1.04.' },
    { id: 'k3Halle', titel: 'Deine Aufstellung', text: (m.k3Team || []).map((id) => F[id] ? F[id].name : id).join(', ') + (m.k3Uebrig && m.k3Uebrig.length ? '. An der Wand blieben: ' + m.k3Uebrig.map((id) => F[id] ? F[id].name : id).join(', ') + '.' : '.') },
    { id: 'k3Yusuf', titel: 'Im Gang', text: m.k3Uhr ? 'Yusuf, rot vor Wut. Darunter: Angst um seinen kleinen Bruder.' : 'Yusuf, rot vor Wut. Alle haben nur die Wut gesehen.' },
    { id: 'k3Pult', titel: 'Du, in dem Moment', text: (m.k3HalsFrueh ? 'Heiß im Hals. Du hast sofort geatmet. ' : 'Rot. ') + (m.k3Uhr ? 'Dann hast du gefragt.' : m.k3Zurueck ? 'Du hast zurückgeschrien.' : 'Alle haben geschaut.') },
    !m.k3UhrGesehen ? { id: 'auchUhr3', titel: 'Das war auch', text: 'Über der Hallentür hing eine Uhr. Yusuf hat dauernd hingeschaut. 14:42.', auch: true } : null,
    { id: 'k3ManonPause', titel: 'Manon am Freitag', text: (m.frei3Manon ? '' : 'Du warst woanders. ') + (n >= 3 ? 'Sie steht mitten im Hof. Mit Chiara und Ayla.' : n >= 1 ? (m.frei3Manon ? 'Sie ruft dir „Salut !“ zu.' : 'Sie geht allein zum Bus. Aber nicht verloren.') : 'Sie steht noch am Rand. Mit dem Wörterbuch.') },
  ].filter(Boolean);
};

// TUN für Kapitel 3 (in spiel.js eingehängt: tunN3)
export const tunN3 = (c) => ({
  // Wie gut ist Manon angekommen? Weg, die Liste ehrlich übersetzt, „perdue“ verstanden, Hallo am Tor
  n3_manonAngekommen: () => {
    const m = c.S.merke;
    m.manonAngekommen = (m.wegDirekt || m.wegUmweg ? 1 : 0) + (m.manonListeFalsch ? 1 : 0) + (m.manonVerstanden || m.manonPauseAngebot ? 1 : 0) + (m.manonHallo ? 1 : 0);
    m.woerter = Math.max(m.woerter || 0, 0) + (m.manonVerstanden ? 1 : 0);   // „perdue“: ein Gefühlswort mehr
    return [];
  },
  // Pause = ein Ort: die Gespräche der Orte (stehen in GESPRAECHE_N3)
  n3_zuSkate: () => GESPRAECHE_N3.n3_skate,
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
  n3_wort: () => { const m = c.S.merke; m.woerter = (m.woerter || 0) + 1; return []; },
  // Aufstellung: wer zuerst, wer an der Wand bleibt
  n3_aufstellung: () => {
    const S = c.S, m = S.merke, r = (S.sz && S.sz.k3Aufstellung) || { team: [], uebrig: [] };
    const team = r.team || [], uebrig = r.uebrig || [];
    m.k3Team = team; m.k3Uebrig = uebrig; m.k3Letzter = null; m.k3UebrigId = null; m.k3UebrigHin = false; m.k3UebrigBlieb = false;
    const erste = team[0]; if (erste && ['yusuf', 'ben', 'noah', 'lina'].includes(erste)) m['wahl' + erste[0].toUpperCase() + erste.slice(1)] = true;   // Kapitel 6 erinnert sich
    const zeilen = [];
    if (team.includes('ben') && !m.benWach) zeilen.push(['ben', '(gähnt) Ich bin da. Ich bin voll da.']);
    if (uebrig.includes('yusuf')) zeilen.push(['yusuf', '(zu laut) Echt jetzt? Ich bin der Schnellste hier.']);
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
      ausgang: (r) => (r.hin ? 'hin' : 'bleib'),
      folgen: { hin: { merke: 'k3UebrigHin', herz: { [id]: 2 }, dann: [['du', 'Zweite Hälfte bist du drin.'], [id, UEBRIG_SATZ[id] || 'Okay.']] },
        bleib: { merke: 'k3UebrigBlieb', dann: [['erzaehler', name + ' setzt sich auf die Bank. Ganz ans Ende.']] } } }];
  },
  n3_spielEnde: () => {
    const m = c.S.merke, st = m.k3Stand || '', id = m.k3Letzter, wer = id && F[id] ? F[id].name : '';
    const z = m.k3Gewonnen
      ? [['erzaehler', 'Abpfiff. ' + st + '. Ihr gewinnt!' + (wer ? ' Einmal ging der Ball verloren: bei ' + wer + '.' : '')], ['jo', 'FINALE! Um zehn nach drei!'], ['yusuf', '(schaut zur Uhr. Dann ist er draußen.)']]
      : [['erzaehler', 'Abpfiff. ' + st + '. Verloren.' + (wer ? ' Den letzten Ball hat ' + wer + ' verloren.' : '')], ['sommer', 'Für euch ist Schluss. Siegerehrung um halb vier. Bis dahin bleiben alle hier.'], ['yusuf', '(tritt gegen die Bank. Dann ist er draußen.)']];
    if (m.k3UebrigHin && m.k3Getauscht && F[m.k3UebrigId]) z.splice(1, 0, [m.k3UebrigId, m.k3UebrigId === 'manon' ? '(außer Atem, zu dir) Deuxième mi-temps. Merci.' : '(außer Atem, zu dir) Ich war drin. Danke.']);
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
  n3_dazwischenDank: () => { const id = c.S.merke.k3Letzter || 'jo'; c.S.merke.k3Beschuetzt = id; return [[id, '(später, leise) Das vergess ich dir nicht.']]; },
  // Nach dem Gang: was die Wahl gekostet hat (Finale, Pokal, ein kleiner Junge am Tor)
  n3_gangFolge: () => {
    const m = c.S.merke, z = [];
    if (m.k3Zurueck) m.yusufMeidet = true;   // bis Kapitel 6
    if (m.k3Uhr) c.ui.toast('<b>🔓 Yusuf</b><span>Yusuf merkt sich, dass du gefragt hast.</span>', 'ly-t-ent');
    if (m.k3YusufGeschickt) {
      if (m.k3Gewonnen) { m.k3Finale = 'verloren'; z.push(['jo', 'Finale zu viert? Wegen dem?'], ['erzaehler', 'Finale zu viert. 4 : 9. Um vier steht Yusuf am Schultor.']); }
      else z.push(['sommer', '(nickt) Gut, dass du es sagst. Er soll gehen.'], ['erzaehler', 'Um vier steht Yusuf am Schultor. Pünktlich.']);
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
  // Spur: der helle Streifen unten links – auf diesem Foto wie auf denen vom Account
  n3_huelle: () => {
    const m = c.S.merke; m.spurStreifen = true; m.spurHuelle = true;
    c.ui.toast('<b>🔎 Spur</b><span>Darios Hülle ist unten links gesprungen. Genau da sitzt der Streifen.</span>', 'ly-t-ent');
    return [{ verdacht: 'dario', spur: 'Hülle unten links gesprungen. Der helle Streifen sitzt genau da.' }];
  },
  n3_streifen: () => { c.S.merke.spurStreifen = true; c.ui.toast('<b>🔎 Spur</b><span>Ein heller Streifen unten links. Auf dem Foto von Yusuf – und auf den Fotos vom Account.</span>', 'ly-t-ent'); return []; },
  n3_manonFreitag: () => {
    const n = c.S.merke.manonAngekommen || 0;
    // Wort-Leiter in allen Sprachen (Heft #02, Stunde 1): „dépaysé“ – gibt es das auf Deutsch?
    const dep = [['manon', 'Un mot, vite. « Dépaysée ». En allemand ?'], { wahl: [
      { t: '„Fremd. Nicht zu Hause.“', merke: 'manonDepayse', herz: { manon: 1 }, dann: [['manon', 'Fremd. Nicht zu Hause. … Oui. C’est ça.']] },
      { t: '„Heimweh?“', merke: 'manonDepayse', dann: [['manon', 'Presque. Mais pas tout à fait.']] },
      { t: '„Gibt’s nicht auf Deutsch.“', dann: [['manon', '(lacht) Alors je te le donne. Dépaysé. Cadeau.']] },
    ] }];
    if (n >= 3) return [['erzaehler', 'Manon steht mitten im Hof. Mit Chiara und Ayla. Sie lachen über etwas.'], ['manon', '(ruft) Salut, {name} ! Bon week-end ! … Schönes Wochen-ende!'], ...dep];
    if (n >= 1) return [['manon', '(winkt) Salut ! Attends !'], ...dep, ['erzaehler', 'Sie geht zum Bus. Allein, aber nicht verloren.']];
    return [['erzaehler', 'Manon steht am Rand. Das Wörterbuch in der Hand.'], ['manon', '(leise) Salut.']];
  },
});

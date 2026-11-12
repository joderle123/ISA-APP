// RESPAWN – Startkarten. Man sucht sie sich nicht aus (wie im echten Leben) – darf aber neu ziehen oder selbst wählen.
// Jede Kopf-Karte hat zwei Seiten: was sie schwer macht und was nur sie kann. Die Texte stehen so auf der Karte.
// Wörter aus dem Alltag, keine Diagnosen.
export const KARTEN = {
  kopf: [
    { id: 'zuendschnur', name: 'Kurze Zündschnur', bild: 'flamme', farbe: '#ff5a3d',
      schwer: 'Bei Stress steigt dein Druck schnell. Ruhig reden geht dann nicht mehr.',
      stark: 'Du gehst dazwischen, wenn andere wegschauen.' },
    { id: 'nein', name: 'Kann nicht Nein sagen', bild: 'hand', farbe: '#ffb347',
      schwer: 'Unter Druck bringst du kein Nein heraus.',
      stark: 'Leute mögen dich schnell.' },
    { id: 'trau', name: 'Trau keinem', bild: 'schloss', farbe: '#8fa3ff',
      schwer: 'Hilfe annehmen geht erst, wenn du jemanden gut kennst.',
      stark: 'Du merkst, wenn jemand lügt.' },
    { id: 'voll', name: 'Kopf voll', bild: 'wirbel', farbe: '#b48cff',
      schwer: 'Du hast weniger Zeit zum Entscheiden.',
      stark: 'Dir fallen Dinge auf, die andere übersehen.' },
  ],
  zuhause: [
    { id: 'allein', name: 'Viel allein', bild: 'schluessel', farbe: '#39d0c8',
      schwer: 'Keiner weckt dich. Nach einer langen Nacht verschläfst du.',
      stark: 'Du kommst allein klar. Jobs bringen dir mehr Geld.' },
    { id: 'zwei', name: 'Zwei Zuhause', bild: 'koffer', farbe: '#ffd23f',
      schwer: 'Hin und her kostet Kraft. Dein Druck sinkt langsamer.',
      stark: 'Du findest dich überall schnell zurecht.' },
    { id: 'oma', name: 'Bei Oma', bild: 'tasse', farbe: '#ff8fb1',
      schwer: 'Sie wartet auf dich. Späte Nächte drücken.',
      stark: 'Sie steckt dir jede Jahreszeit 10 Euro zu.' },
  ],
  tasche: [
    { id: 'leer', name: 'Leere Tasche', bild: 'muenze', farbe: '#9aa3b2', schwer: 'Du startest mit 5 Euro.', stark: 'Du weißt, was Dinge wert sind.' },
    { id: 'ok', name: 'Etwas Geld', bild: 'muenzen', farbe: '#7ed957', schwer: 'Geld geht schneller weg, als du denkst.', stark: 'Du startest mit 40 Euro.' },
  ],
};
export const KARTEN_ART = { kopf: 'Kopf', zuhause: 'Zuhause', tasche: 'Tasche' };

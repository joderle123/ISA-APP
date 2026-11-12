// Hafengrotte (DESIGN §12 e03): du lotst Jolie mit Symbolbefehlen durchs Dunkel. Sie hat ein Stopp-Recht; drängeln lässt
// sie zurückweichen. Laternen machen den Weg sicher. Ohne Ton allein über das Bild lösbar.
export default {
  id: 'e03-hafengrotte', template: 'lotsen', title: 'Die Hafengrotte', icon: 'team', color: '#39d0c8',
  intro: 'Sag Jolie, wo lang. Stoppt sie, warte.',
  modes: { entspannt: { lanternRadius: 3 }, abenteuer: { lanternRadius: 2 }, profi: { lanternRadius: 1.5 } },
  medals: { bronze: { score: 0.3 }, silber: { score: 0.7 }, gold: { score: 0.95 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: {
    mode: 'befehle', guide: 'jolie',
    map: [
      '###########',
      '#S..L...~~#',
      '#.~~..~..~#',
      '#...L.~...#',
      '#~~...~.L.#',
      '#..L..~..X#',
      '###########',
    ],
  },
};

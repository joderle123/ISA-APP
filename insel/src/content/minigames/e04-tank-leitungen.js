// Tank-Leitungen (DESIGN §9 Knobel-Tafeln / §12 e04): Rohre drehen, bis das Wasser alle Tanks erreicht.
export default {
  id: 'e04-tank-leitungen', template: 'bauen', title: 'Tank-Leitungen', icon: 'glas', color: '#4d8cff',
  intro: 'Dreh die Rohre. Jeder Tank braucht Wasser.',
  modes: { entspannt: { w: 4, h: 3, tanks: 2 }, abenteuer: { w: 5, h: 4, tanks: 3 }, profi: { w: 6, h: 5, tanks: 4 } },
  medals: { bronze: { score: 0.35 }, silber: { score: 0.7 }, gold: { score: 1 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: { kind: 'leitungen', seed: 4 },
};

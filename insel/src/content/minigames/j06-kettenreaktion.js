// Kettenreaktion (DESIGN §12 j06, Akku laden): Dominosteine so drehen, dass die Kette von Start bis zur Glocke läuft.
export default {
  id: 'j06-kettenreaktion', template: 'bauen', title: 'Die Kettenreaktion', icon: 'chronik', color: '#ffd166',
  intro: 'Dreh die Steine. Die Kette muss bis zum Ende laufen.',
  modes: { entspannt: { w: 4, h: 3, tanks: 1 }, abenteuer: { w: 5, h: 4, tanks: 2 }, profi: { w: 6, h: 5, tanks: 3 } },
  medals: { bronze: { score: 0.35 }, silber: { score: 0.7 }, gold: { score: 1 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: { kind: 'kette', seed: 6 },
};

// Kombi-Flug durch die Festringe (DESIGN §12 e10): Luftringe vom Kronendorf über die Lichtung – Segeln mit Kombis.
export default {
  id: 'e10-kronen-segeln', template: 'rennen', title: 'Kronen-Segeln', icon: 'segel', color: '#ffd23f',
  intro: 'Vom Podest ab. Durch alle Ringe gleiten.',
  modes: { entspannt: { gold: 70, silber: 100, bronze: 160 }, abenteuer: { gold: 55, silber: 80, bronze: 130 }, profi: { gold: 42, silber: 60, bronze: 100 } },
  medals: { bronze: { seconds: 130 }, silber: { seconds: 80 }, gold: { seconds: 55 }, stern: { seconds: 42, noHint: true, noFail: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: {
    kind: 'segeln', radius: 3.4,
    start: { x: 70, z: -70, y: 16 },
    checkpoints: [{ x: 78, z: -78, rel: 12 }, { x: 88, z: -84, rel: 10 }, { x: 96, z: -76, rel: 9 }, { x: 92, z: -64, rel: 8 }, { x: 80, z: -58, rel: 7 }, { x: 70, z: -64, rel: 5 }, { x: 70, z: -70, rel: 1.5 }],
  },
};

// Kronen-Kletterei (DESIGN §12 e06, freiwillig): Ringe rund um die Riesen-Mangrove ohne Bodenkontakt.
export default {
  id: 'e06-kronen-kletterei', template: 'rennen', title: 'Kronen-Kletterei', icon: 'klettern', color: '#2de2c9',
  intro: 'Ringe am Stamm hinauf. Boden berühren heißt: von vorn.',
  modes: { entspannt: { gold: 100, silber: 140, bronze: 240 }, abenteuer: { gold: 80, silber: 110, bronze: 180 }, profi: { gold: 60, silber: 85, bronze: 140 } },
  medals: { bronze: { seconds: 180 }, silber: { seconds: 110 }, gold: { seconds: 80 }, stern: { seconds: 60, noHint: true, noFail: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: {
    kind: 'klettern', noGround: true, radius: 2.8,
    start: { x: 150, z: -14 },
    checkpoints: [{ x: 155, z: -8, rel: 5 }, { x: 150, z: -3, rel: 10 }, { x: 145, z: -8, rel: 15 }, { x: 150, z: -13, rel: 20 }, { x: 155, z: -8, rel: 26 }, { x: 150, z: -3, rel: 32 }, { x: 150, z: -8, rel: 40 }],
  },
};

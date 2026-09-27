// Rennstrecke Hafen-Dächer (WP36, DESIGN §12 e01 / §9): Ringe über Steg, Kisten und Dächer – das Lauf-Tutorial.
// Gold unter 90 Sekunden (Abenteuer), der Geist der Bestzeit läuft mit. Positionen: Hafen-Orte (island.SITES).
export default {
  id: 'hafen-daecher', template: 'rennen', title: 'Hafen-Dächer', icon: 'sprint', color: '#ffb347',
  intro: 'Alle Ringe der Reihe nach. Die Möwe wartet nicht.',
  modes: { entspannt: { gold: 110, silber: 150, bronze: 240 }, abenteuer: { gold: 90, silber: 130, bronze: 200 }, profi: { gold: 70, silber: 100, bronze: 160 } },
  medals: { bronze: { seconds: 200 }, silber: { seconds: 130 }, gold: { seconds: 90 }, stern: { seconds: 60, noHint: true, noFail: true } },
  story: { minMedal: 'bronze', failForward: true },
  hint: 'Sprinten: Joystick ganz nach vorn.',
  params: {
    kind: 'lauf', ghost: true, radius: 2.6,
    start: { x: 6, z: 148 },
    checkpoints: [
      { x: 6, z: 134 }, { x: 12, z: 126 }, { x: 20, z: 108 }, { x: 4, z: 100 }, { x: -16, z: 118 },
      { x: -30, z: 98 }, { x: -12, z: 92 }, { x: 4, z: 110 }, { x: 24, z: 122 }, { x: 10, z: 140 }, { x: 6, z: 150 },
    ],
  },
};

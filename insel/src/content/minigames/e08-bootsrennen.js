// Bootsrennen mit Maëlle (DESIGN §12 e08): vom Strand zur Dschungelbucht. Je Abschnitt steht ein Gefühl am Ruder:
// Felsen brauchen Angst, Treibholz-Tore Wut, offenes Wasser Freude, Nebel Überraschung. Falsch = komischer Stillstand.
export default {
  id: 'e08-bootsrennen', template: 'rennen', title: 'Wer steht am Ruder?', icon: 'boot', color: '#ff4f8b',
  intro: 'Gib je Abschnitt einem Vogel das Ruder. Dann Vollgas.',
  modes: { entspannt: { gold: 150, silber: 200, bronze: 300 }, abenteuer: { gold: 120, silber: 160, bronze: 240 }, profi: { gold: 95, silber: 130, bronze: 190 } },
  medals: { bronze: { seconds: 240 }, silber: { seconds: 160 }, gold: { seconds: 120 }, stern: { seconds: 95, noHint: true, noFail: true } },
  story: { minMedal: 'bronze', failForward: true },
  hint: 'Felsen: Angst. Treibholz: Wut. Weite: Freude. Nebel: Überraschung.',
  params: {
    kind: 'boot', boatSpeed: 9, radius: 4,
    start: { x: 176, z: 34 },
    checkpoints: [{ x: 186, z: 22 }, { x: 192, z: 4 }, { x: 190, z: -16 }, { x: 182, z: -36 }, { x: 170, z: -54 }, { x: 156, z: -70 }, { x: 138, z: -84 }, { x: 122, z: -96 }],
    sections: [
      { emotion: 'angst', until: 1, label: 'Felsen voraus. Wer steuert?' },
      { emotion: 'wut', until: 3, label: 'Treibholz-Tore. Wer steuert?' },
      { emotion: 'freude', until: 5, label: 'Offenes Wasser. Wer steuert?' },
      { emotion: 'ueberraschung', until: 7, label: 'Nebel. Wer steuert?' },
    ],
  },
};

// Tandem-Takt (DESIGN §12 e12): mit Luc im Gleichschritt das Windrad-Blatt die Klippe hinauf – auf den Schlag tippen; wer hetzt, kippt.
export default {
  id: 'e12-tandem-takt', template: 'rhythmus', title: 'Tandem-Takt', icon: 'windrad', color: '#8fa3ff',
  intro: 'Im Gleichschritt mit Luc. Tippen auf jeden Schlag.',
  modes: {
    entspannt: { window: 0.3, beats: 10, interval: 1.3 },
    abenteuer: { window: 0.2, beats: 14, interval: 1.1 },
    profi: { window: 0.13, beats: 18, interval: 0.95, irregular: true },
  },
  medals: { bronze: { hits: 0.5 }, silber: { hits: 0.8 }, gold: { hits: 0.95 }, stern: { hits: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: { input: 'tap', partner: 'luc', onHit: [{ puls: -2 }], onMiss: [{ puls: 3 }] },
};

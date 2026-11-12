// Minispiel e11-tauziehen „Die Drachenleine“ (Rhythmus, CONTENT-SCHEMA): Luc steht bei 90 an der Kante, Reden prallt ab.
// Du packst die Leine und hältst im Takt der Böen; jeder Treffer senkt beide Pulse (onHit), bis das Gespräch aufgeht.
export default {
  id: 'e11-tauziehen', template: 'rhythmus', title: 'Die Drachenleine', icon: 'seil',
  intro: 'Halten, wenn die Böe kommt. Loslassen, wenn sie geht.',
  modes: {
    entspannt: { window: 0.35, beats: 8 },
    abenteuer: { window: 0.22, beats: 12 },
    profi: { window: 0.14, beats: 16, irregular: true },
  },
  medals: { bronze: { hits: 0.5 }, silber: { hits: 0.8 }, gold: { hits: 0.95 }, stern: { hits: 1, noHint: true, noRewind: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: { input: 'hold', partner: 'luc', onHit: [{ puls: -4 }, { npcHitze: ['luc', -6] }] },
};

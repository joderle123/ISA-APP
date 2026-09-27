// Garten-Wächter (DESIGN §12 e23): nachts verteidigst du Oma Lucindas Garten gegen Klammer-Geister, die nachhaken.
export default {
  id: 'e23-garten-waechter', template: 'verteidigung', title: 'Der Garten-Wächter', icon: 'giesskanne', color: '#8fd18b',
  intro: 'Tipp die Geister an: Stopp. Wer nachhakt, hört es nochmal.',
  modes: { entspannt: { waves: 3, perWave: 3, speed: 4.5, stoppRadius: 11 }, abenteuer: { waves: 4, perWave: 4, speed: 6, stoppRadius: 9 }, profi: { waves: 5, perWave: 5, speed: 7.5, stoppRadius: 7 } },
  medals: { bronze: { score: 0.34 }, silber: { score: 0.67 }, gold: { score: 0.92 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
};

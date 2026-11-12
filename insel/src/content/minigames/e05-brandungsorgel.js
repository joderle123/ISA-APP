// Set-Piece Brandungsorgel (DESIGN §12 e05): laut und leise im Wechsel – halten, wenn die Welle kommt, loslassen, wenn sie geht.
export default {
  id: 'e05-brandungsorgel', template: 'rhythmus', title: 'Die Brandungsorgel', icon: 'horn', color: '#2de2c9',
  intro: 'Laut, wenn die Welle kommt. Leise, wenn sie geht.',
  modes: {
    entspannt: { window: 0.4, beats: 8, interval: 2.2, hold: 1.1 },
    abenteuer: { window: 0.26, beats: 12, interval: 1.9, hold: 1.0 },
    profi: { window: 0.16, beats: 16, interval: 1.6, hold: 0.9, irregular: true },
  },
  medals: { bronze: { hits: 0.5 }, silber: { hits: 0.8 }, gold: { hits: 0.95 }, stern: { hits: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: { input: 'hold', pattern: 'wechsel' },
};

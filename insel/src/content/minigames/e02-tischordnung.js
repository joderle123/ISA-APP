// Feuerwerks-Tischordnung (DESIGN §9 Knobel-Tafeln): wer sitzt neben wem? Regeln prüfen, alle setzen.
export default {
  id: 'e02-tischordnung', template: 'bauen', title: 'Die Tischordnung', icon: 'team', color: '#ffb347',
  intro: 'Setz alle so, dass jede Regel passt.',
  medals: { bronze: { score: 0.5 }, silber: { score: 0.8 }, gold: { score: 1 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: {
    kind: 'ordnung', seats: 6, tokens: ['jolie', 'tun', 'tiago', 'maelle', 'ilda', 'luc'],
    rules: [{ a: 'jolie', b: 'tun', kind: 'nicht-neben' }, { a: 'tiago', b: 'maelle', kind: 'neben' }, { a: 'ilda', b: 'jolie', kind: 'neben' }, { a: 'luc', b: 'tun', kind: 'gegenueber' }],
  },
};

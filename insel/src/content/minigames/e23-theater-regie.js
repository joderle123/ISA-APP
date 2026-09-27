// Theater mit Regie-Modus (DESIGN §12 M5): Figuren auf die Bühne setzen, danach ein Share-Code ohne Personendaten.
export default {
  id: 'e23-theater-regie', template: 'bauen', title: 'Regie im Theater', icon: 'bild', color: '#ff8ccf',
  intro: 'Stell die Szene. Am Ende gibt es einen Code.',
  medals: { bronze: { score: 0.5 }, silber: { score: 0.8 }, gold: { score: 1 }, stern: { score: 1, noHint: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: {
    kind: 'regie', seats: 4, tokens: ['noor', 'lucinda', 'tun', 'jolie'],
    rules: [{ a: 'noor', b: 'lucinda', kind: 'neben' }, { a: 'tun', b: 'jolie', kind: 'nicht-neben' }],
  },
};

// Kaputt: goto ins Leere, 3 Blasen vor einer Wahl, Wahl ohne goto, Sprecher nicht in cast, zu langer Satz, 5 Wahlen
export default {
  id: 'e99-kaputt', unit: 'j1-e99', cast: ['luc'], start: 'x',
  nodes: {
    a: { speaker: 'luc', say: 'Eins.', goto: 'b' },
    b: { speaker: 'luc', say: 'Zwei.', goto: 'c' },
    c: {
      speaker: 'tun', say: 'Das ist ein viel zu langer Satz mit deutlich mehr als zwölf Wörtern darin, oder?',
      choices: [
        { say: 'Ja.', goto: 'nirgendwo' },
        { say: 'Nein.' },
        { label: 'Vielleicht doch eher nicht so', goto: 'd' },
        { say: 'Vier.', goto: 'd' },
        { say: 'Fünf.', goto: 'd' },
      ],
    },
    d: { say: 'Ende ohne Ende.' },
  },
};

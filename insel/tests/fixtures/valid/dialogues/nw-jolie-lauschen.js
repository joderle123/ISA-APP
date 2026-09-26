// Fixture: kurzer Lausch-Dialog
export default {
  id: 'nw-jolie-lauschen', cast: ['jolie'], start: 'a',
  nodes: {
    a: { speaker: 'jolie', say: 'Ich wollte nur nicht allein sein.', lauschen: { seconds: 3 }, goto: 'b' },
    b: { end: true, effects: [{ bond: ['jolie', +1] }] },
  },
};

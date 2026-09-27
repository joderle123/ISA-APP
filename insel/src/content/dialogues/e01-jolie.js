// Szene e01-jolie (DESIGN §12 e01): die einzige graue Figur. Reden hilft nicht, Drängen auch nicht – du setzt dich
// einfach dazu und bleibst. Jolie gibt dir Splitter 1.
export default {
  id: 'e01-jolie', unit: 'j1-e01', cast: ['jolie'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: { speaker: 'glimm', say: 'Grau. Ganz allein. Sag nichts.', goto: 'b' },
    b: {
      speaker: 'jolie', say: '…', anim: 'sad',
      choices: [
        { sign: 'sitzenNeben', label: 'Dazusetzen', goto: 'c' },
        { say: 'Alles okay bei dir?', icon: 'frage', tone: 'ruhig', goto: 'b2' },
        { say: 'Komm mit zu den anderen!', icon: 'team', tone: 'fest', goto: 'b3' },
      ],
    },
    b2: { speaker: 'jolie', say: '…', anim: 'sad', goto: 'b' },
    b3: { speaker: 'glimm', say: 'Zu schnell. Einfach da sein.', goto: 'b' },
    c: { speaker: 'jolie', say: '…', anim: 'sad', lauschen: { seconds: 4 }, goto: 'd' },
    d: { speaker: 'jolie', say: 'Du bist geblieben.', anim: 'idle', goto: 'e' },
    e: { speaker: 'jolie', say: 'Hier. Das lag im Turm. Bei dir leuchtet es.', anim: 'think', effects: [{ shard: 1 }, { deed: 'jolie-dasein' }], goto: 'f' },
    f: { speaker: 'glimm', say: 'Sie hat gelächelt. Fast.', end: true },
  },
};

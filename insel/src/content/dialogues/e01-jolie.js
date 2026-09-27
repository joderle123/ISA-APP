// Szene e01-jolie (DESIGN §12 e01): die einzige graue Figur. Reden hilft nicht, Drängen auch nicht – du setzt dich
// einfach dazu und bleibst. Jolie gibt dir Splitter 1.
// Story: Jolie war nach dem Knall im Turm und hat den Splitter gefunden – gefragt hat sie keiner (Faden „Schweigen“).
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
    b2: { speaker: 'jolie', say: '… Klar.', anim: 'sad', goto: 'b' },
    b3: { speaker: 'glimm', say: 'Zu schnell. Einfach da sein.', goto: 'b' },
    c: { speaker: 'jolie', say: '…', anim: 'sad', lauschen: { seconds: 4 }, goto: 'd' },
    d: { speaker: 'jolie', say: 'Du bist geblieben. Die meisten gehen nach zwei Sekunden.', anim: 'idle', goto: 'e' },
    e: { speaker: 'jolie', say: 'Das lag im Turm. Nach dem Knall. Bei dir leuchtet es.', anim: 'think', effects: [{ shard: 1 }, { deed: 'jolie-dasein' }], goto: 'e2' },
    e2: { speaker: 'glimm', say: 'Moment. Du warst im Turm?', goto: 'e3' },
    e3: { speaker: 'jolie', say: 'Einer musste nachschauen. Gefragt hat mich keiner.', anim: 'idle', goto: 'f' },
    f: { speaker: 'glimm', say: 'Sie hat gelächelt. Fast.', end: true },
  },
};

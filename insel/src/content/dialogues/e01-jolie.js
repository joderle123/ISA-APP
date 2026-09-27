// Szene e01-jolie (DESIGN §12 e01): die einzige graue Figur. Reden hilft nicht, Drängen auch nicht – du setzt dich
// einfach dazu und bleibst. Jolie gibt dir Splitter 1.
// Story (docs/STORY.md §6 Wahl 1): Jolie war nach dem Knall im Turm und bittet dich, es keinem zu sagen – auch Ilda nicht.
// Widerspruch zum Bemerken: „Gefragt hat mich keiner“ – aber Ilda soll nicht fragen. Flag m0.jolie = versprochen | offen.
export default {
  id: 'e01-jolie', unit: 'j1-e01', cast: ['jolie'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: { speaker: 'glimm', say: 'Die Graue. Viel Glück.', goto: 'b' },
    b: {
      speaker: 'jolie', say: '…', anim: 'sad',
      choices: [
        { sign: 'sitzenNeben', label: 'Dazusetzen', goto: 'c' },
        { say: 'Alles okay bei dir?', icon: 'frage', tone: 'ruhig', goto: 'b2' },
        { say: 'Komm mit zu den anderen!', icon: 'team', tone: 'fest', goto: 'b3' },
      ],
    },
    b2: { speaker: 'jolie', say: 'Klar.', anim: 'sad', goto: 'b' },
    b3: { speaker: 'jolie', say: '…', anim: 'sad', goto: 'b3b' },
    b3b: { speaker: 'glimm', say: 'Tja. Kapuze auf.', goto: 'b' },
    c: { speaker: 'jolie', say: '…', anim: 'sad', lauschen: { seconds: 4 }, goto: 'd' },
    d: {
      speaker: 'jolie', say: 'Du bist geblieben. Die meisten gehen nach zwei Sekunden.', anim: 'idle',
      choices: [
        { say: 'Ich hab Zeit.', icon: 'check', goto: 'e' },
        { sign: 'nicken', label: 'Nicken', goto: 'e' },
        { say: 'Warum sitzt du hier allein?', icon: 'frage', goto: 'd2' },
      ],
    },
    d2: { speaker: 'jolie', say: 'Tu ich gerade nicht.', anim: 'idle', goto: 'e' },
    e: {
      speaker: 'jolie', say: 'Das lag im Turm. Nach dem Knall. Bei dir leuchtet es.', anim: 'think',
      effects: [{ shard: 1 }, { deed: 'jolie-dasein' }],
      choices: [
        { say: 'Du warst im Turm?', icon: 'laterne', goto: 'f' },
        { say: 'Warum gibst du mir das?', icon: 'frage', goto: 'e2' },
        { sign: 'nicken', label: 'Nicken', goto: 'f' },
      ],
    },
    e2: { speaker: 'jolie', say: 'Bei mir leuchtet es nicht.', anim: 'sad', goto: 'g' },
    f: { speaker: 'jolie', say: 'Einer musste nachschauen. Gefragt hat mich keiner.', anim: 'idle', goto: 'g' },
    g: {
      speaker: 'jolie', say: 'Sag es keinem. Auch Ilda nicht.', anim: 'sad',
      choices: [
        { say: 'Versprochen.', icon: 'herz', effects: [{ flag: 'm0.jolie', set: 'versprochen' }, { deed: 'jolie-versprochen' }], goto: 'h1' },
        { say: 'Das kann ich nicht versprechen.', icon: 'hand', effects: [{ flag: 'm0.jolie', set: 'offen' }, { deed: 'jolie-ehrlich' }], goto: 'h2' },
        { say: 'Warum nicht Ilda?', icon: 'anker', goto: 'g2' },
      ],
    },
    g2: { speaker: 'jolie', say: 'Die fragt dann. Warum ich da war.', anim: 'think', goto: 'g' },
    h1: { speaker: 'jolie', say: '… Danke.', anim: 'idle', goto: 'h1b' },
    h1b: { speaker: 'glimm', say: 'Versprochen. Mutig. Oder dumm.', end: true },
    h2: { speaker: 'jolie', say: 'Okay. Dann hab ich nichts gesagt.', anim: 'sad', goto: 'h2b' },
    h2b: { speaker: 'glimm', say: 'Ehrlich. Autsch.', end: true },
  },
};

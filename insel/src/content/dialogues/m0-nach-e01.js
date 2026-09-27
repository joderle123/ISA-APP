// Story-Beat nach j1-e01 (am Morgen nach dem Lagerfeuer, Hafen-Plugin): Jolie kommt von selbst · im Turm flackert es.
export default {
  id: 'm0-nach-e01', cast: ['jolie'], camera: 'talk', rewind: false, start: 'a',
  nodes: {
    a: { speaker: 'erzaehler', say: 'Neuer Tag. Der Hafen ist ein Stück bunter.', goto: 'b' },
    b: { speaker: 'jolie', say: 'Hi. Ich … wollte nur Hallo sagen.', anim: 'wave', goto: 'c' },
    c: { speaker: 'glimm', say: 'Sie redet. Mit dir. Freiwillig.', goto: 'd' },
    d: { speaker: 'jolie', say: 'Heute Nacht hat im Turm was geflackert. Kurz.', anim: 'think', goto: 'e' },
    e: { speaker: 'jolie', say: 'Ich hab es niemandem gesagt. Außer dir.', anim: 'idle', goto: 'f' },
    f: { speaker: 'glimm', say: 'Nächster Code. Nächstes Stück Rätsel.', end: true },
  },
};

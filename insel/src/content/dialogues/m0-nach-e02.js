// Story-Beat nach j1-e02 (am Morgen nach dem Lagerfeuer, Hafen-Plugin): Tun und Jolie haben einen Faden · die Brücke.
export default {
  id: 'm0-nach-e02', cast: ['tun'], camera: 'talk', rewind: false, start: 'a',
  nodes: {
    a: { speaker: 'erzaehler', say: 'Die Laternen hängen noch. Der Hafen summt.', goto: 'b' },
    b: { speaker: 'tun', say: 'Moien! Jolie hat mir ihre Möwen gezeigt. Krass gut.', anim: 'cheer', goto: 'c' },
    c: { speaker: 'tun', say: 'Die hat sogar mich gezeichnet. Mit Möwe auf dem Kopf.', anim: 'talk', goto: 'd' },
    d: { speaker: 'erzaehler', say: 'Am Ortsrand hängt die alte Brücke zum Strand. Halb kaputt.', goto: 'e' },
    e: { speaker: 'glimm', say: 'Brücke kaputt. Strand grau. Klassiker.', end: true },
  },
};

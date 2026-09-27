// Szene e03-kodex (DESIGN §12 e03): die Crew ergänzt den Kodex um eine Zeile. Das vierte Feuer brennt, der Hafen ist bunt.
export default {
  id: 'e03-kodex', unit: 'j1-e03', cast: ['ilda', 'jolie', 'tun'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: {
      speaker: 'ilda', say: 'Eine Zeile fehlt im Kodex. Eure.', anim: 'talk',
      choices: [
        { say: 'Jede Person zählt.', icon: 'team', effects: [{ flag: 'kodex.zeile', set: 'zaehlt' }], goto: 'b' },
        { say: 'Beim Führen gilt Stopp.', icon: 'stopp', effects: [{ flag: 'kodex.zeile', set: 'stopp' }], goto: 'b' },
        { say: 'Keiner geht allein ins Dunkel.', icon: 'laterne', effects: [{ flag: 'kodex.zeile', set: 'dunkel' }], goto: 'b' },
      ],
    },
    b: { speaker: 'jolie', say: 'Ja. Die.', anim: 'idle', goto: 'c' },
    c: { speaker: 'tun', say: 'Unterschrieben. Feuer an!', anim: 'cheer', effects: [{ deed: 'kodex-zeile' }, { sound: 'chime' }], goto: 'd' },
    d: { speaker: 'ilda', say: 'Vier Feuer. Der Hafen hat seine Farben wieder.', anim: 'talk', end: true },
  },
};

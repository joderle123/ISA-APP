// Story-Beat (docs/STORY.md): Ankunft mit dem letzten Boot. Spielt einmal beim ersten Start nach dem Stil-Studio
// (Hafen-Plugin, nicht unter ?test ohne ?story). Keine Wahl – nur Stimmung, Rätsel und Richtung Steg.
export default {
  id: 'm0-ankunft-boot', cast: [], camera: 'follow', rewind: false, start: 'a',
  nodes: {
    a: { speaker: 'erzaehler', say: 'Das letzte Boot des Sommers. Nur du steigst aus.', goto: 'b' },
    b: { speaker: 'erzaehler', say: 'Die Insel sollte bunt sein. Sie ist grau.', goto: 'c' },
    c: { speaker: 'glimm', say: 'Hi. Glimm. Lichtsalamander. Kein Haustier.', goto: 'd' },
    d: { speaker: 'glimm', say: 'Der Turm da? Ein Jahr dunkel.', goto: 'e' },
    e: { speaker: 'erzaehler', say: 'Warum? Das sagt hier keiner. Noch nicht.', goto: 'f' },
    f: { speaker: 'glimm', say: 'Die Kapitänin wartet. Am Steg.', end: true },
  },
};

// Story-Beat (docs/STORY.md §3): Ankunft mit dem letzten Boot. Spielt einmal beim ersten Start nach dem Stil-Studio
// (Hafen-Plugin, nicht unter ?test ohne ?story). Erste Saat für den Entwurf der Spielfigur – nie erklärt, nie erzwungen.
export default {
  id: 'm0-ankunft-boot', cast: [], camera: 'follow', rewind: false, start: 'a',
  nodes: {
    a: { speaker: 'erzaehler', say: 'Letzte Fahrt vor dem Herbst. Nur du steigst aus.', goto: 'b' },
    b: {
      speaker: 'erzaehler', say: 'In deiner Tasche das Handy. Ein Entwurf. Seit Wochen.',
      choices: [
        { say: 'Nochmal lesen.', icon: 'text', goto: 'b2' },
        { say: 'Wegstecken.', icon: 'x', goto: 'c' },
      ],
    },
    b2: { speaker: 'erzaehler', say: 'Ein Satz. Du kannst ihn auswendig. Nie abgeschickt.', goto: 'c' },
    c: { speaker: 'erzaehler', say: 'Oben rechts: kein Netz.', goto: 'd' },
    d: { speaker: 'glimm', say: 'Hier nie. Seit der Turm schweigt.', goto: 'e' },
    e: { speaker: 'glimm', say: 'Glimm. Lichtsalamander. Kein Haustier.', goto: 'f' },
    f: { speaker: 'erzaehler', say: 'Der Fährmann wendet sofort. Zum Turm schaut er nicht.', goto: 'g' },
    g: { speaker: 'glimm', say: 'Kapitänin am Steg. Erwartet niemanden.', end: true },
  },
};

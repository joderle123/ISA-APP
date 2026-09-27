// Ankunft am Steg (Demo, DESIGN §12 e01 Auftakt): Ilda gibt dir den Blick. Erwachsene schreiben keine Jugendsprache.
export default {
  id: 'ankunft-ilda', cast: ['ilda'], camera: 'talk', rewind: false, start: 'a',
  nodes: {
    a: { speaker: 'ilda', say: 'Moien. Das letzte Boot. Du bist also neu hier.', anim: 'wave', goto: 'b' },
    b: {
      speaker: 'ilda', say: 'Der Hafen verliert seine Farben. Siehst du das Grau?', anim: 'think',
      choices: [
        { say: 'Ja. Überall.', icon: 'check', goto: 'c' },
        { say: 'Was ist passiert?', icon: 'frage', goto: 'b2' },
        { sign: 'schulterzucken', label: 'Schulterzucken', goto: 'c' },
      ],
    },
    b2: { speaker: 'ilda', say: 'Später. Erst brauchst du den Blick.', anim: 'idle', goto: 'c' },
    c: { speaker: 'ilda', say: 'Halt kurz still. Ich zeig dir etwas.', anim: 'talk', effects: [{ grant: 'blick' }], goto: 'd' },
    d: { speaker: 'glimm', say: 'Auren. Jetzt siehst du Gefühle.', goto: 'e' },
    e: { speaker: 'ilda', say: 'Farben über jedem Kopf. Das ist der Blick.', anim: 'talk', goto: 'f' },
    f: { speaker: 'ilda', say: 'Dein Code aus dem Kurs öffnet den ersten Auftrag.', anim: 'idle', end: true, effects: [{ deed: 'ilda-blick' }] },
  },
};

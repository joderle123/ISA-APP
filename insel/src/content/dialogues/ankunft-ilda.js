// Ankunft am Steg (Demo, DESIGN §12 e01 Auftakt): Ilda gibt dir den Blick. Erwachsene schreiben keine Jugendsprache.
// Stimme Ilda (docs/STORY.md): knapp, trocken, warm unter der Oberfläche; weicht beim Turm aus.
export default {
  id: 'ankunft-ilda', cast: ['ilda'], camera: 'talk', rewind: false, start: 'a',
  nodes: {
    a: { speaker: 'ilda', say: 'Moien. Das letzte Boot des Sommers. Und du bist drauf.', anim: 'wave', goto: 'b' },
    b: {
      speaker: 'ilda', say: 'Schau dich um. Der Hafen wird jeden Tag grauer.', anim: 'think',
      choices: [
        { say: 'Ja. Überall.', icon: 'check', goto: 'c' },
        { say: 'Was ist passiert?', icon: 'frage', goto: 'b2' },
        { sign: 'schulterzucken', label: 'Schulterzucken', goto: 'b4' },
      ],
    },
    b2: { speaker: 'ilda', say: 'Vor einem Jahr ging das Leuchtfeuer aus. Seitdem das.', anim: 'idle', goto: 'b3' },
    b3: { speaker: 'ilda', say: 'Der Rest … ein andermal.', anim: 'think', goto: 'c' },
    b4: { speaker: 'glimm', say: 'Schulterzucken. Passt hier rein.', goto: 'c' },
    c: { speaker: 'ilda', say: 'Halt kurz still. Ich zeig dir, wie man hier hinschaut.', anim: 'talk', effects: [{ grant: 'blick' }], goto: 'd' },
    d: { speaker: 'glimm', say: 'Farben über Köpfen. Ernsthaft?', goto: 'e' },
    e: { speaker: 'ilda', say: 'Jede Farbe ist ein Gefühl. Grau heißt: Da ist jemand allein.', anim: 'talk', goto: 'e2' },
    e2: { speaker: 'glimm', say: 'Und der dunkle Turm da?', goto: 'e3' },
    e3: { speaker: 'ilda', say: 'Frag mich nicht nach dem Turm.', anim: 'idle', goto: 'f' },
    f: { speaker: 'ilda', say: 'Dein Code aus dem Kurs öffnet den ersten Auftrag.', anim: 'idle', end: true, effects: [{ deed: 'ilda-blick' }] },
  },
};

// Szene e04-crewglas (QUELLE Schritt 7, Kurzfassung ebenso): Am Feuer wirft jede Figur eine Muschel ohne Namen in ein
// großes Glas: „Was brauchen wir hier alle?“ Deine Muschel wird nirgends gespeichert (nur das Bild im Glas, gezeichnet
// von systems/quelle/plugin.js über choice.muschel). Dann stimmt die Crew über den nächsten Raum ab – gespeichert wird
// nur die Wahl (flags.nest.naechsterRaum), gebaut wird später.
export default {
  id: 'e04-crewglas', unit: 'j1-e04', cast: ['ilda', 'tun', 'jolie'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: { speaker: 'ilda', say: 'Was brauchen wir hier alle? Eine Muschel. Ohne Namen.', anim: 'idle', goto: 'b' },
    b: {
      speaker: 'erzaehler', say: 'Drei Muscheln fallen ins Glas. Keiner sieht, von wem.',
      choices: [
        { label: 'Dazugehören', icon: 'team', muschel: 'dazugehoeren', goto: 'e' },
        { label: 'Anerkennung', icon: 'stern', muschel: 'anerkennung', goto: 'e' },
        { label: 'Ruhe und Erholung', icon: 'ruhe', muschel: 'ruhe', goto: 'e' },
        { label: 'Andere Muschel', icon: 'muschel', goto: 'b2' },
      ],
    },
    b2: {
      speaker: 'erzaehler', say: 'Noch drei Muscheln liegen da.',
      choices: [
        { label: 'Bewegung', icon: 'sprint', muschel: 'bewegung', goto: 'e' },
        { label: 'Schlaf', icon: 'mond', muschel: 'schlaf', goto: 'e' },
        { label: 'Mitbestimmen', icon: 'kompass', muschel: 'mitbestimmen', goto: 'e' },
        { label: 'Keine Muschel', icon: 'x', goto: 'e' },
      ],
    },
    e: { speaker: 'tun', say: 'Und der nächste Raum? Ich sag: Ausguck!', anim: 'cheer', goto: 'e2' },
    e2: {
      speaker: 'jolie', say: 'Schlafraum. Mit Vorhang.', anim: 'idle',
      choices: [
        { say: 'Ausguck.', icon: 'blick', effects: [{ flag: 'nest.naechsterRaum', set: 'ausguck' }], goto: 'f' },
        { say: 'Schlafraum.', icon: 'mond', effects: [{ flag: 'nest.naechsterRaum', set: 'schlafraum' }], goto: 'f' },
        { say: 'Küche.', icon: 'feuer', effects: [{ flag: 'nest.naechsterRaum', set: 'kueche' }], goto: 'f' },
      ],
    },
    f: { speaker: 'ilda', say: 'Gewählt ist gewählt. Gebaut wird später.', anim: 'idle', goto: 'g' },
    g: { speaker: 'erzaehler', say: 'Das Glas leuchtet. Alle Farben auf einmal.', end: true },
  },
};

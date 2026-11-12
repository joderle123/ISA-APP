// Szene e04-ilda-blick (QUELLE Schritt 2, WERKZEUG-QUESTS Nr. 1): Ilda am Steg hält zwei Laternengläser hoch – ein
// hohes, halb volles und ein kleines, leeres. „Welches fehlt mehr?“ Es gibt keine falsche Antwort. Danach hat der Blick
// eine neue Stufe (blick.tanks): zuerst die Folge in der Welt, beim Hinschauen die Gefäße.
// Das Bild der zwei Gläser zeichnet systems/quelle/plugin.js über Ilda (Knoten b). Kurzfassung: dieselbe Szene.
export default {
  id: 'e04-ilda-blick', unit: 'j1-e04', cast: ['ilda'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: { speaker: 'erzaehler', say: 'Ilda hält zwei alte Laternengläser hoch.', goto: 'b' },
    b: {
      speaker: 'ilda', say: 'Hohes Glas, halb voll. Kleines Glas, leer. Welches fehlt mehr?', anim: 'think',
      choices: [
        { say: 'Das hohe.', icon: 'glas', goto: 'c1' },
        { say: 'Das kleine.', icon: 'glas', goto: 'c2' },
        { say: 'Weiß nicht.', icon: 'frage', goto: 'c3' },
      ],
    },
    c1: { speaker: 'ilda', say: 'Mhm. Da passt viel rein.', anim: 'idle', goto: 'd' },
    c2: { speaker: 'ilda', say: 'Leer, ja. Aber klein.', anim: 'idle', goto: 'd' },
    c3: { speaker: 'ilda', say: 'Ehrlich. Mag ich.', anim: 'idle', goto: 'd' },
    d: { speaker: 'ilda', say: 'Leute haben auch Gläser. Jetzt siehst du sie.', anim: 'idle', effects: [{ upgrade: 'blick.tanks' }], goto: 'e' },
    e: { speaker: 'glimm', say: 'Neue Brille. Oh bitte.', goto: 'f0' },
    // Volle Mission: weiter zu Tun · Kurzfassung (kein Leck gestopft): gleich ans Feuer
    f0: { branch: [{ when: { not: { flag: 'e04.leck' } }, goto: 'f2' }], goto: 'f' },
    f: { speaker: 'ilda', say: 'Tun sitzt am Nest. Schau ihn lange an.', anim: 'idle', end: true },
    f2: { speaker: 'ilda', say: 'Komm ans Feuer. Die Crew wartet.', anim: 'idle', end: true },
  },
};

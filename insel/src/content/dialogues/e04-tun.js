// Szene e04-tun (QUELLE Schritt 3): Tun sitzt auf dem Nest-Dach, wirft Kiesel. „Lasst mich alle in Ruhe!“ Beim Witz
// „Kapitän Titanic“ startet „Unter der Oberfläche“ (minigames/e04-oberflaeche-tun.js): das feine Wort ist gekränkt.
// Danach zeigt der Blick seine Blechdosen (systems/quelle/plugin.js). Nicken statt Hinsehen führt zurück zum Witz.
export default {
  id: 'e04-tun', unit: 'j1-e04', cast: ['tun'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: { speaker: 'erzaehler', say: 'Tun sitzt auf dem Nest-Dach und wirft Kiesel.', goto: 'b' },
    b: {
      speaker: 'tun', say: 'Lasst mich alle in Ruhe!', anim: 'angry',
      choices: [
        { say: 'Was ist los?', icon: 'frage', tone: 'ruhig', goto: 'c' },
        { label: 'Nichts sagen', icon: 'ohr', goto: 'c2' },
      ],
    },
    c: { speaker: 'tun', say: 'Nix. Das Nest säuft ab. Jolie schmollt. Super.', anim: 'angry', goto: 'd' },
    c2: { speaker: 'tun', say: 'Starr nicht so. Bin kein Aquarium.', anim: 'angry', goto: 'd' },
    d: {
      speaker: 'tun', say: 'Ist doch egal, Kapitän Titanic. Haha.', anim: 'cheer',
      choices: [
        { label: 'Genau hinsehen', icon: 'blick', minigame: 'e04-oberflaeche-tun', goto: 'e', gotoFail: 'dS' },
        { sign: 'nicken', label: 'Nicken', goto: 'd2' },
      ],
    },
    dS: { speaker: 'glimm', say: 'Später. Er lacht noch.', goto: 'd' },
    d2: { speaker: 'glimm', say: 'Zu lautes Haha.', goto: 'd' },
    e: { speaker: 'tun', say: '… Ja. Das hat gesessen.', anim: 'sad', goto: 'f' },
    f: { speaker: 'tun', say: 'Hier merkt eh keiner was. Egal.', anim: 'sad', effects: [{ deed: 'tun-gekraenkt-gesehen' }], goto: 'g' },
    g: { speaker: 'glimm', say: 'Drinnen. Spuren. Wetten?', end: true },
  },
};

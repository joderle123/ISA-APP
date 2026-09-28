// Szene e04-jolie (QUELLE Schritt 6): Jolie redet nicht. „Dableiben“ startet „Leine halten“ (minigames/e04-leine-
// jolie.js): Sie testet („Was willst du?“, „Geh doch.“). Wer bleibt, hört: „Keiner fragt mich was. Nie.“ Den Umzug kann
// man nicht ändern. Aber man kann ihr die Dachboden-Ecke bauen (flags.nest.offen.dachboden) und sie die nächste Route
// wählen lassen (Kartentisch im Nest, systems/quelle/plugin.js).
export default {
  id: 'e04-jolie', unit: 'j1-e04', cast: ['jolie'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: { speaker: 'erzaehler', say: 'Jolie sitzt hinter dem Nest. Kapuze auf.', goto: 'b' },
    b: {
      speaker: 'jolie', say: '…', anim: 'sad',
      choices: [
        { sign: 'sitzenNeben', label: 'Dableiben', minigame: 'e04-leine-jolie', goto: 'c', gotoFail: 'bL' },
        { say: 'Was ist denn los?', icon: 'frage', tone: 'ruhig', goto: 'b2' },
      ],
    },
    b2: { speaker: 'jolie', say: 'Was willst du?', anim: 'sad', goto: 'b' },
    bL: { speaker: 'glimm', say: 'Später. Jolie bleibt da.', goto: 'b' },
    c: { speaker: 'jolie', say: 'Keiner fragt mich was. Nie.', anim: 'sad', goto: 'c2' },
    c2: {
      speaker: 'jolie', say: 'Umzug ins Nest. Mit mir hat keiner geredet.', anim: 'sad',
      choices: [
        { say: 'Das kann ich nicht ändern.', icon: 'hand', goto: 'd' },
        { say: 'Das war mies.', icon: 'herz', goto: 'd' },
        { label: 'Nichts sagen', icon: 'ohr', goto: 'd' },
      ],
    },
    d: {
      speaker: 'jolie', say: 'Weiß ich. Und jetzt?', anim: 'idle',
      effects: [{ tank: { npc: 'jolie', tank: 'mitbestimmen', add: 0.1 } }],
      choices: [
        { say: 'Willst du oben eine eigene Ecke?', icon: 'haengematte', effects: [{ flag: 'nest.offen.dachboden', set: true }], goto: 'e' },
        { say: 'Du wählst die nächste Route.', icon: 'karte', effects: [{ flag: 'nest.offen.dachboden', set: true }], goto: 'f' },
      ],
    },
    e: { speaker: 'jolie', say: 'Eine Ecke. Nur für mich? Mit Licht.', anim: 'think', goto: 'e2' },
    e2: { speaker: 'jolie', say: 'Und die Route auf der Karte wähl ich.', anim: 'idle', goto: 'g' },
    f: { speaker: 'jolie', say: 'Ich? Echt? Aber nicht hier unten.', anim: 'think', goto: 'f2' },
    f2: { speaker: 'jolie', say: 'Oben. Eine Ecke. Mit Licht.', anim: 'idle', goto: 'g' },
    g: { speaker: 'jolie', say: 'Bau die Ecke. Dann komm ich hoch.', anim: 'idle', end: true },
  },
};

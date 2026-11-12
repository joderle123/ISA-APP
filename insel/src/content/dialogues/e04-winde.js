// Szene e04-winde (QUELLE Schritt 4, die richtige Tat): vor der Crew sagen, was Tun an der Winde gemacht hat. Die
// Hängematte (kleines Glas) oder die Crew-Liste (mittleres Glas) sind nicht falsch – Tun bleibt nur grau („Danke.
// Trotzdem.“). Erst die Winde (hohes, leeres Glas) öffnet den Bauplatz Fotowand. Der Lehrsatz fällt hier NIE.
// Nach dem Blitz-Motor mault Tun zuerst (Flag e04.motor, setzt systems/quelle/plugin.js).
export default {
  id: 'e04-winde', unit: 'j1-e04', cast: ['tun', 'jolie'], camera: 'talk', rewind: true, start: 'a0',
  nodes: {
    a0: { branch: [{ when: { flag: 'e04.motor' }, goto: 'm' }], goto: 'a' },
    m: { speaker: 'tun', say: 'Der Motor brummt. Guckt trotzdem keiner.', anim: 'sad', goto: 'a' },
    a: { speaker: 'erzaehler', say: 'Die Crew steht am Dorfplatz. Alle warten.', goto: 'b' },
    b: {
      speaker: 'tun', say: 'Was denn? Wollt ihr was von mir?', anim: 'angry',
      choices: [
        { say: 'Du brauchst mehr Schlaf.', icon: 'mond', goto: 's' },
        { say: 'Tun hat die Winde repariert. Heimlich.', icon: 'seil', goto: 'w' },
        { say: 'Tun gehört zur Crew.', icon: 'team', goto: 't' },
      ],
    },
    s: { speaker: 'tun', say: 'Danke. Trotzdem.', anim: 'sad', effects: [{ tank: { npc: 'tun', tank: 'schlaf', add: 0.2 } }], goto: 'b' },
    t: { speaker: 'tun', say: 'Steh ja nicht mal auf der Liste.', anim: 'sad', effects: [{ tank: { npc: 'tun', tank: 'dazugehoeren', add: 0.15 } }], goto: 'b' },
    w: {
      speaker: 'tun', say: '… Das habt ihr gesehen?', anim: 'think',
      effects: [{ tank: { npc: 'tun', tank: 'anerkennung', add: 0.55 } }, { deed: 'tun-winde-gewuerdigt' }, { flag: 'nest.offen.fotowand', set: true }],
      goto: 'w2',
    },
    w2: { speaker: 'jolie', say: 'Ohne die Winde wär mein Heft nass.', anim: 'idle', goto: 'w3' },
    w3: { speaker: 'tun', say: 'Nachts gemacht. War nix. Also … danke.', anim: 'cheer', goto: 'w4' },
    w4: { speaker: 'jolie', say: 'Wir brauchen eine Fotowand. Mit dir drauf.', anim: 'idle', end: true },
  },
};

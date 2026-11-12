// Anker-Stein (Sinne, e13): tippen. Das Kamerawackeln stoppt zehn Sekunden.
export default {
  id: 'ankerstein', fach: 'sinne', unit: 'j1-e13', name: 'Anker-Stein', icon: 'anker', use: 'tippen',
  hint: 'Halten. Alles steht still.',
  effect: { puls: -12, world: 'wackeln-stoppen', seconds: 10 },
  zones: { gruen: 1, gelb: 1, rot: 1 },
  perSave: [0.7, 1.3], npcFit: { luc: 1.0, pit: 1.1 }, reichweite: 80, cooldown: 15,
};

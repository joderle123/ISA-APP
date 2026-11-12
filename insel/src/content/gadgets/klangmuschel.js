// Klangmuschel (Sinne, e13): halten. Der Ton trägt unsichtbare Plattformen, genau so lange, wie er klingt.
export default {
  id: 'klangmuschel', fach: 'sinne', unit: 'j1-e13', name: 'Klangmuschel', icon: 'muschel', use: 'halten',
  hint: 'Ton halten. Plattformen tragen.',
  effect: { puls: -12, world: 'klangbruecke', seconds: 6 },
  zones: { gruen: 1, gelb: 1, rot: 1 },
  perSave: [0.7, 1.3], npcFit: { luc: 0.9, pit: 1.3 }, reichweite: 75, cooldown: 3,
};

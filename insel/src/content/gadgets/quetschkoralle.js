// Quetschkoralle (Körper, e12): fest drücken, dann loslassen. Ein Tippen, die Hände ballen sich und öffnen sich wieder.
export default {
  id: 'quetschkoralle', fach: 'koerper', unit: 'j1-e12', name: 'Quetschkoralle', icon: 'hand', use: 'tippen',
  hint: 'Drücken. Loslassen.',
  effect: { puls: -20, seconds: 1.4 },
  zones: { gruen: 1, gelb: 1, rot: 1 },
  perSave: [0.7, 1.3], npcFit: { luc: 0.9, pit: 1.0 }, reichweite: 85, cooldown: 8,
};

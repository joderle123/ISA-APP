// Sprint-Ventil (Körper, e12): fünf Sekunden voll sprinten, danach sinkt der Puls. Ein Graph zeigt vorher und nachher.
export default {
  id: 'sprintventil', fach: 'koerper', unit: 'j1-e12', name: 'Sprint-Ventil', icon: 'sprint', use: 'sprint',
  hint: 'Fünf Sekunden voll rennen.',
  effect: { puls: -20, seconds: 5 },
  zones: { gruen: 1, gelb: 1, rot: 1 },
  perSave: [0.7, 1.3], npcFit: { luc: 1.3, pit: 0.8 }, reichweite: 90, cooldown: 12,
};

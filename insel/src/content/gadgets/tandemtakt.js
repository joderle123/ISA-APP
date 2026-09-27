// Tandem-Takt (Menschen, e12): im Schritt einer ruhigen Figur gehen. Beide Pulse sinken; wer hetzt, bricht den Takt.
export default {
  id: 'tandemtakt', fach: 'menschen', unit: 'j1-e12', name: 'Tandem-Takt', icon: 'team', use: 'gehen',
  hint: 'Neben einer ruhigen Figur gehen.',
  effect: { puls: -18, seconds: 6, radius: 3 },
  zones: { gruen: 1, gelb: 1, rot: 1 },
  perSave: [0.7, 1.3], npcFit: { luc: 1.2, pit: 1.1 }, reichweite: 90, cooldown: 10,
};

// Pumpsprung (Körper, e12): Springen halten = anspannen, loslassen = hoher Sprung. Die Bewegung ist das Gadget (moves/pump.js).
export default {
  id: 'pumpsprung', fach: 'koerper', unit: 'j1-e12', name: 'Pumpsprung', icon: 'pfeilhoch', use: 'halten',
  hint: 'Springen halten, dann loslassen.',
  effect: { puls: -15 },
  zones: { gruen: 1, gelb: 1, rot: 1 },
  perSave: [0.7, 1.3], npcFit: { luc: 1.1, pit: 0.9 }, reichweite: 80, cooldown: 4,
};

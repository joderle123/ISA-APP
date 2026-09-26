// Fixture: GadgetDef aus CONTENT-SCHEMA.md
export default {
  id: 'kaeltekristall', fach: 'sinne', unit: 'j1-e13', name: 'Kältekristall', icon: 'kristall', use: 'werfen',
  effect: { puls: -30, world: 'sturmfeld-einfrieren', radius: 4, seconds: 12 },
  zones: { gruen: 1, gelb: 1, rot: 1 },
  perSave: [0.7, 1.3], npcFit: { luc: 0.8, pit: 1.2 }, reichweite: 95, cooldown: 20,
};

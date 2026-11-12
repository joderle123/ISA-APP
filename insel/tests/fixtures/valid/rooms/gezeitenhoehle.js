// Fixture: RoomDef aus CONTENT-SCHEMA.md
export default {
  id: 'gezeitenhoehle', kit: 'hoehle', size: [40, 14, 60], light: 'biolumineszenz',
  water: { level: 0.4, tide: true },
  spawns: { eingang: [0, 0, 28] },
  exits: [{ at: [0, 0, 30], to: { region: 'strand', site: 'strand.gezeitenhoehle' } }],
  features: [{ type: 'gezeitenhorn', at: [4, 0, 20] }, { type: 'orgel', at: [0, 0, -24], minigame: 'e11-tauziehen' }],
};

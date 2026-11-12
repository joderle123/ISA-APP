// Fixture: MemoryDef aus CONTENT-SCHEMA.md
export default {
  id: 'erinnerung-5-pit', shard: 5, owner: 'pit', unit: 'j1-e18', feeling: 'scham',
  filter: { tint: '#6a8f5a', blur: 0.4, focus: 'lachende-gesichter' },
  diorama: {
    scene: 'sommerfest-buehne', hour: 21.8, props: ['buehne', 'laternen', 'handys'],
    figures: [
      { npc: 'pit', pose: 'slump' },
      { npc: 'jhemp', pose: 'stolpern' },
      { crowd: 12, pose: 'lachen', facing: 'handy' },
    ],
  },
  caption: 'Alle lachen. Pit war sicher: über mich.',
  chain: { step: 'gedanke', say: 'Ein Gedanke färbt, was man erinnert.' },
  laterTruth: { unlockAt: 'j1-e28', say: 'Das Lachen galt einem Video.' },
};

// Splitter 3 (e10): Maëlles Erinnerung – Filter Angst. Die Musik bricht ab, ein Knall, Leute rennen. Glied: der Knall.
export default {
  id: 'erinnerung-3-maelle', shard: 3, owner: 'maelle', unit: 'j1-e10', feeling: 'angst',
  filter: { tint: '#6f5cc8', blur: 0.5, focus: 'menge' },
  diorama: {
    scene: 'sommerfest-buehne', hour: 22.4, props: ['buehne', 'laternen', 'trommeln', 'turm'],
    figures: [{ npc: 'maelle', pose: 'ducken', facing: 'turm' }, { crowd: 12, pose: 'rennen', facing: 'weg' }],
  },
  caption: 'Die Musik bricht ab. Ein Knall. Alle rennen.',
  chain: { step: 'knall', say: 'Der Knall. Angst macht alles schneller und lauter.' },
};

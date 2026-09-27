// Splitter 2 (e06): Tiagos Erinnerung – Filter Anerkennung. Niemand schaut seine Surf-Show, alle lachen aufs Handy.
// Glied: ein Video geht herum.
export default {
  id: 'erinnerung-2-tiago', shard: 2, owner: 'tiago', unit: 'j1-e06', feeling: 'anerkennung',
  filter: { tint: '#e0a458', blur: 0.35, focus: 'handys' },
  diorama: {
    scene: 'strand-surfshow', hour: 19.0, props: ['welle', 'surfbrett', 'handys', 'laternen'],
    figures: [{ npc: 'tiago', pose: 'surfen', facing: 'menge' }, { crowd: 10, pose: 'lachen', facing: 'handy' }],
  },
  caption: 'Keiner schaut. Alle lachen aufs Handy.',
  chain: { step: 'video', say: 'Ein Video geht herum. Tiago sieht nur das Lachen.' },
  laterTruth: { unlockAt: 'j1-e28', say: 'Das Lachen galt einem Video. Nicht ihm.' },
};

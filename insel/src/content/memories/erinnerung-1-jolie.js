// Splitter 1 (e01): Jolies Fundstück – ohne Filter. Laternen, ein Knall, der Turm wird dunkel. Glied: die Situation.
export default {
  id: 'erinnerung-1-jolie', shard: 1, owner: 'jolie', unit: 'j1-e01', feeling: 'unklar',
  filter: { tint: '#bfc6d6', blur: 0.15, focus: 'turm' },
  diorama: {
    scene: 'turm-nacht', hour: 22.5, props: ['laternen', 'turm', 'steg', 'boot'],
    figures: [{ npc: 'jolie', pose: 'staunen', facing: 'turm' }, { crowd: 6, pose: 'schauen', facing: 'turm' }],
  },
  caption: 'Laternen. Ein Knall. Dann wird der Turm dunkel.',
  chain: { step: 'situation', say: 'Eine Nacht, ein Turm, ein Knall. Mehr weiß noch niemand.' },
};

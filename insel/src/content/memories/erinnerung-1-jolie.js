// Splitter 1 (e01): Jolies Fundstück – ohne Filter. Laternen, jemand rennt zum Turm, Jolie hinterher, die Tür knallt.
// Glied: die Situation. Wer rannte, verrät erst die spätere Wahrheit (M3, docs/STORY.md §2/§8).
export default {
  id: 'erinnerung-1-jolie', shard: 1, owner: 'jolie', unit: 'j1-e01', feeling: 'unklar',
  filter: { tint: '#bfc6d6', blur: 0.15, focus: 'turm' },
  diorama: {
    scene: 'turm-nacht', hour: 22.5, props: ['laternen', 'turm', 'steg', 'boot'],
    figures: [{ npc: 'jolie', pose: 'staunen', facing: 'turm' }, { crowd: 6, pose: 'schauen', facing: 'turm' }],
  },
  caption: 'Laternen. Einer rennt zum Turm. Ich hinterher. Zu langsam.',
  chain: { step: 'situation', say: 'Die Tür knallt, bevor Jolie ankommt. Dann wird es dunkel.' },
  laterTruth: { unlockAt: 'j1-e15', say: 'Der Mann, der rannte, war Jhemp. Jolie ist ihm nachgelaufen.' },
};

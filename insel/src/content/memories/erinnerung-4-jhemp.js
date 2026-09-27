// Splitter 4 (e15): Jhemps Erinnerung – Filter Scham/Rot. Alles zu laut, die Tür knallt, das Glas kippt: „Ich wollte nur weg.“
// Glied: Verhalten bei Rot. Ein Unfall, keine Absicht – und nicht die Ursache des Graus (DESIGN §2).
export default {
  id: 'erinnerung-4-jhemp', shard: 4, owner: 'jhemp', unit: 'j1-e15', feeling: 'scham',
  filter: { tint: '#b8443a', blur: 0.6, focus: 'tuer' },
  diorama: {
    scene: 'turm-tuer', hour: 22.45, props: ['tuer', 'herzglas', 'treppe', 'handys'],
    figures: [{ npc: 'jhemp', pose: 'weg', facing: 'tuer' }, { crowd: 8, pose: 'schauen', facing: 'handy' }],
  },
  caption: 'Alles zu laut. Die Tür knallt. Ich wollte nur weg.',
  chain: { step: 'rot', say: 'Bei Rot will man nur raus. Ein Unfall, kein Plan.' },
  laterTruth: { unlockAt: 'j1-e29', say: 'Das Glas kippte. Grau wurde die Insel vom Schweigen.' },
};

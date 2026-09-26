// Fixture: NachtwacheDef aus CONTENT-SCHEMA.md
export default {
  id: 'nw-jolie-steg', npc: 'jolie', from: 'j1-e05', where: { site: 'steg' },
  clue: { routineBreak: true, glimm: 'Jolie ist weg. Komisch.', tracks: true },
  outer: ['freude', 3], inner: ['trauer', 7],
  need: 'zugehoerigkeit',
  help: [
    { id: 'sitzen', label: 'Hinsetzen', fits: 'zugehoerigkeit', emote: 'sitzen-neben', seconds: 8 },
    { id: 'decke', label: 'Decke bringen', fits: 'koerper' },
    { id: 'zuhoeren', label: 'Zuhören', fits: 'anerkennung', dialogue: 'nw-jolie-lauschen' },
  ],
  reward: { fit: [{ bond: ['jolie', +1] }, { lichtsplitter: 2 }], other: [{ lichtsplitter: 1 }] },
  line: { fit: 'Danke, dass du da bist.', other: 'Nett von dir.' },
};

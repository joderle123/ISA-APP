// Fixture: DialogueDef aus CONTENT-SCHEMA.md
export default {
  id: 'e11-luc-kante', unit: 'j1-e11', cast: ['luc'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: {
      speaker: 'luc', say: 'Lass mich! Der Drachen reißt gleich alles ab!', anim: 'angry',
      enter: [{ npcHitze: ['luc', 90] }],
      choices: [
        { say: 'Beruhig dich mal!', icon: 'hand', tone: 'fest', effects: [{ npcHitze: ['luc', +5] }], goto: 'a2' },
        { say: 'Was ist denn los?', icon: 'frage', tone: 'ruhig', requires: { npcHitze: ['luc', '<', 70] }, goto: 'b' },
        { label: 'Leine packen', icon: 'seil', tone: 'handlung', minigame: 'e11-tauziehen', goto: 'c' },
      ],
    },
    a2: { speaker: 'luc', say: '…', anim: 'angry', goto: 'a' },
    c: { speaker: 'luc', say: 'Okay. Okay. Danke.', effects: [{ npcHitze: ['luc', -60] }, { deed: 'luc-leine' }], goto: 'b' },
    b: {
      speaker: 'luc', say: 'Die Böe kam. Und alle haben gelacht.', anim: 'sad',
      lauschen: { seconds: 4 },
      choices: [
        { say: 'Das klingt richtig mies.', icon: 'herz', effects: [{ bond: ['luc', +1] }], goto: 'd' },
        { say: 'Zeig mir das Windrad.', icon: 'windrad', goto: 'd' },
      ],
    },
    d: { end: true, effects: [{ flag: 'e11.luc-ruhig', set: true }] },
  },
};

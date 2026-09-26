// Kaputt: negatives Echo ohne Reparatur
export default {
  id: 'echo-boese', when: { flag: 'x' }, delay: { days: 2 },
  effect: { mood: ['tiago', 'verstimmt'] },
  line: { npc: 'tiago', say: 'Du warst nicht da.' },
};

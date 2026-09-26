// Fixture: EchoDef aus CONTENT-SCHEMA.md (negativ, aber mit Reparatur)
export default {
  id: 'echo-tiago-rennen', when: { flag: 'e05.tiago-rennen-verpasst' }, delay: { days: 1 },
  effect: { mood: ['tiago', 'verstimmt'] },
  line: { npc: 'tiago', say: 'Du warst nicht beim Rennen.' },
  repair: { quest: 'rep-tiago-surfspot', clears: true },
};

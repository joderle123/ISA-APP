// Fixture: Reparatur-Quest (kein Einheiten-Code nötig)
export default {
  id: 'rep-tiago-surfspot', title: 'Nachholen am Surfspot', region: 'strand', estMinutes: 5,
  steps: [
    { id: 'hin', template: 'wegTor', params: { to: { site: 'strand.surfspot' } }, marker: true },
    { id: 'rennen', template: 'pruefung', params: { minigame: 'e11-tauziehen' } },
  ],
  onComplete: [{ bond: ['tiago', +1] }, { flag: 'e05.tiago-rennen-verpasst', set: false }],
  glimm: 'Besser spät als nie.',
  patch: { icon: 'surfbrett', color: '#ff8c2a', back: 'Reparatur: Verpasstes lässt sich nachholen.' },
  echteWelt: 'Sag jemandem, dass du etwas nachholst.',
  debrief: ['Wie hat Tiago reagiert?'],
};

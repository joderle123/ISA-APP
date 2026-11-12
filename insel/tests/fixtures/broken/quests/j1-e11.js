// Kaputt: Rückseite fehlt, Übungswort in der Glimm-Zeile, Dialog gibt es nicht, Kurzfassung nennt fremden Schritt
export default {
  id: 'j1-e11', module: 'j1-m3', title: 'Das Sturmbarometer', region: 'klippen', estMinutes: 25,
  kurzfassung: { minutes: 3, steps: ['gibt-es-nicht'] },
  steps: [
    { id: 'luc', template: 'szene', params: { dialogue: 'dialog-fehlt' } },
    { id: 'boss', template: 'boss', params: { phases: [{ zone: 'rot', template: 'pruefung', params: { minigame: 'e11-tauziehen' }, pulsCap: 95 }], win: 'kaempfen' } },
  ],
  onComplete: [{ bond: ['luc', -1] }, { kaputt: true }],
  glimm: 'Jetzt einatmen und ausatmen, das hilft immer.',
  patch: { icon: 'barometer', color: 'blau' },
  echteWelt: '',
  debrief: [],
};

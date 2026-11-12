// Fixture: QuestDef aus CONTENT-SCHEMA.md
export default {
  id: 'j1-e11', module: 'j1-m3', title: 'Das Sturmbarometer', region: 'klippen', estMinutes: 18,
  templates: ['wegTor', 'szene', 'pruefung'],
  grants: [{ upgrade: 'ruhe.puls' }],
  kurzfassung: {
    minutes: 3, steps: ['windschatten', 'luc'],
    grants: [{ upgrade: 'ruhe.puls' }], veil: { zone: 'klippen', to: 0.8 },
  },
  steps: [
    { id: 'wetterwarte', template: 'wegTor', params: { to: { site: 'klippen.wetterwarte' } }, marker: true, onStart: [{ glimm: 'Ich hab jetzt Farben.' }] },
    { id: 'windschatten', template: 'wegTor', params: { route: 'klippenpfad', pulsSources: ['boeen', 'donner'], shelters: 4, to: { site: 'klippen.kante' } }, hints: { glimm: ['Da. Windstille.'] } },
    { id: 'luc', template: 'szene', params: { dialogue: 'e11-luc-kante' } },
    { id: 'prognose', template: 'pruefung', optional: true, params: { minigame: 'e11-sturmprognose' } },
  ],
  onComplete: [
    { veil: { zone: 'klippen', to: 0.8, from: { site: 'klippen.kante' } } },
    { patch: 'j1-e11' }, { lichtsplitter: 3 }, { bond: ['luc', +1] },
  ],
  teaser: { gate: 'klangschlucht-tor' },
  glimm: 'Bei Rot hört keiner zu.',
  patch: { icon: 'barometer', color: '#8fa3ff', back: 'Anspannung 0–100: Grün, Gelb, Rot. Bei Rot erst runter, dann reden.' },
  echteWelt: 'Schätz dreimal am Tag deine Anspannung von 0 bis 100.',
  debrief: ['Warum konnte man Luc bei 90 nicht zutexten?', 'Was half dir zurück auf Grün?'],
  kursziele: ['Momente ohne Kontrolle', 'Skala 0–30/30–70/70–100', 'Situationen einschätzen'],
  shard: null, linesAndVeils: false,
};

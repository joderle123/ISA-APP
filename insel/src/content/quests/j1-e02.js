// Quest j1-e02 „Das Laternenfest“ (DESIGN §12, M0) – kompakte Demo-Fassung (≈ 5 min).
// Nachfragen („Und dann?“) legt den ersten Faden → Funken vom Feuer zu den Laternen tragen (Rennen schwappt) →
// Komplimente für Taten lassen die Laterne steigen. Code DELFIN.
export default {
  id: 'j1-e02', module: 'j1-m0', title: 'Das Laternenfest', region: 'hafen', estMinutes: 6,
  templates: ['szene', 'tragen', 'pruefung'],
  grants: [{ upgrade: 'blick.faeden' }],
  kurzfassung: { minutes: 3, steps: ['nachfragen', 'kompliment'], grants: [{ upgrade: 'blick.faeden' }], veil: { zone: 'hafen', to: 0.15 } },
  steps: [
    { id: 'nachfragen', label: 'Tun am alten Festplakat', template: 'szene', params: { dialogue: 'e02-nachfragen', at: { site: 'hafen.dorfplatz' } }, marker: true,
      onStart: [{ glimm: 'Fest. Ohne Licht. Super.' }] },
    { id: 'funken', label: 'Drei Funken zu den Laternen', template: 'tragen', params: { item: 'funke', from: { site: 'hafen.feuerPlatz' }, to: { site: 'hafen.laternen' }, count: 3, slosh: 0.6, color: '#ffb347' }, marker: true,
      onStart: [{ glimm: 'Langsam. Funken mögen kein Rennen.' }], hints: { glimm: ['Gehen, nicht rennen.'] } },
    { id: 'kompliment', label: 'Die Laterne steigt', template: 'pruefung', params: { minigame: 'e02-kompliment', at: { site: 'hafen.dorfplatz' } }, marker: true },
  ],
  onComplete: [
    { patch: 'j1-e02' }, { lichtsplitter: 2 }, { bond: ['tun', 1] }, { flag: 'laternenfest', set: true },
  ],
  glimm: 'Laterne oben. Hätte ich nicht gedacht.',
  patch: { icon: 'laterne', color: '#ffd23f', back: 'Kompliment: Lob, was jemand getan hat. Annehmen heißt: Danke.' },
  echteWelt: 'Lob jemanden für eine Tat. Und sag selbst einfach Danke.',
  debrief: ['Warum sank die Laterne bei „Ach, war nix“?'],
  kursziele: ['Gemeinsamkeiten ohne Preisgabe', 'Nachhaken', 'Konkrete Komplimente geben und annehmen'],
  shard: null, linesAndVeils: false,
};

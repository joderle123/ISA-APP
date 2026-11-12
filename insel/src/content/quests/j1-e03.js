// Quest j1-e03 „Die Brücke der Drei“ (DESIGN §12, M0) – kompakte Demo-Fassung (≈ 6 min).
// Die Brücke zum Strand: alle drei tragen bei (Szene) → Jolie durch die Hafengrotte lotsen (Stopp-Recht) →
// Rollentausch (freiwillig) → die Crew ergänzt den Kodex um eine Zeile. Crew-Ruf kommt dazu. Code OTTER.
export default {
  id: 'j1-e03', module: 'j1-m0', title: 'Die Brücke der Drei', region: 'hafen', estMinutes: 7,
  templates: ['szene', 'pruefung'],
  grants: [{ grant: 'teamgeist' }, { upgrade: 'teamgeist.ruf' }],
  kurzfassung: { minutes: 3, steps: ['bruecke', 'kodexzeile'], grants: [{ grant: 'teamgeist' }, { upgrade: 'teamgeist.ruf' }], veil: { zone: 'hafen', to: 0 } },
  steps: [
    { id: 'bruecke', label: 'Die kaputte Brücke am Ortsrand', template: 'szene', params: { dialogue: 'e03-bruecke', at: { site: 'hafen.bruecke' } }, marker: true,
      onStart: [{ glimm: 'Allein wär’s schneller. Nicht.' }] },
    { id: 'grotte', label: 'Jolie durch die Grotte lotsen', template: 'pruefung', params: { minigame: 'e03-hafengrotte', at: { site: 'hafen.grotte' } }, marker: true,
      hints: { glimm: ['Stoppt sie, warte.'] } },
    { id: 'rollentausch', label: 'Im Dunkeln folgen', template: 'pruefung', optional: true, params: { minigame: 'e03-rollentausch', at: { site: 'hafen.grotte' } } },
    { id: 'kodexzeile', label: 'Eine Zeile für den Kodex', template: 'szene', params: { dialogue: 'e03-kodex', at: { site: 'hafen.dorfplatz' } }, marker: true },
  ],
  onComplete: [
    { patch: 'j1-e03' }, { lichtsplitter: 3 }, { bond: ['jolie', 1] }, { bond: ['tun', 1] }, { flag: 'kodex.v2', set: true },
  ],
  glimm: 'Allein wär’s schneller. Nicht.',
  patch: { icon: 'team', color: '#39d0c8', back: 'Team: Jede Person zählt. Beim Führen gilt Stopp.' },
  echteWelt: 'Frag eine stille Person nach ihrer Idee.',
  debrief: ['Was brauchte Jolie, um dir im Dunkeln zu vertrauen?'],
  kursziele: ['Alle werden gebraucht', 'Führen und geführt werden mit Stopp-Recht', 'Benennen, was die Gruppe braucht'],
  shard: null, linesAndVeils: false,
};

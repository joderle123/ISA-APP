// Quest j1-e01 „Landgang: Der Hafen-Kodex“ (DESIGN §12, M0) – kompakte Demo-Fassung (≈ 5 min).
// Möwe klaut Ildas Schlüssel (Dächer-Rennen als Lauf-Tutorial) → Kodex am Feuer aushandeln → mit dem Blick die
// einzige graue Figur finden (Jolie) und sich einfach dazusetzen → Splitter 1, erste Farbwelle. Code BOJE.
export default {
  id: 'j1-e01', module: 'j1-m0', title: 'Landgang: Der Hafen-Kodex', region: 'hafen', estMinutes: 6,
  templates: ['pruefung', 'szene'],
  grants: [{ grant: 'blick' }],
  kurzfassung: { minutes: 3, steps: ['kodex', 'jolie'], grants: [{ grant: 'blick' }], veil: { zone: 'hafen', to: 0.3 } },
  steps: [
    { id: 'moewe', label: 'Die Möwe hat Ildas Schlüssel', template: 'pruefung', params: { minigame: 'hafen-daecher', at: { site: 'hafen.steg' } }, marker: true,
      onStart: [{ glimm: 'Möwe. Natürlich.' }], hints: { glimm: ['Joystick ganz nach vorn.'] } },
    { id: 'kodex', label: 'Der Kodex am Feuer', template: 'szene', params: { dialogue: 'e01-kodex', at: { site: 'hafen.dorfplatz' } }, marker: true },
    { id: 'jolie', label: 'Die graue Figur am Ufer', template: 'szene', params: { dialogue: 'e01-jolie', at: { site: 'hafen.ufer' } }, marker: true,
      onStart: [{ glimm: 'Blick an. Wer ist grau?' }] },
  ],
  onComplete: [
    { patch: 'j1-e01' }, { lichtsplitter: 2 }, { bond: ['jolie', 1] }, { flag: 'kodex.v1', set: true },
  ],
  glimm: 'Regeln. Gähn. Okay, die war gut.',
  patch: { icon: 'anker', color: '#ffb347', back: 'Gruppenvertrag: Regeln, die wir zusammen machen, schützen alle.' },
  echteWelt: 'Such dir eine Regel aus eurem Vertrag. Wo begegnet sie dir?',
  debrief: ['Welche Hafen-Regel hat am meisten verändert?'],
  kursziele: ['Gemeinsame Regeln schaffen Sicherheit', 'Gefühle haben Farben und Namen', 'Da-Sein zählt ohne Worte'],
  shard: 1, linesAndVeils: false,
};

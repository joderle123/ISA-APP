// Ankunft (Demo, DESIGN §12 e01 Auftakt): das Boot kommt aus dem Nebel, Ilda gibt dir am Steg den Blick.
// Keine Einheit – startet beim ersten Spiel automatisch (Hafen-Plugin), danach öffnet der Kurs-Code die Quests.
export default {
  id: 'hafen-ankunft', title: 'Ankunft im Hafen', region: 'hafen', estMinutes: 2,
  templates: ['szene'],
  steps: [
    { id: 'ilda', label: 'Zur Kapitänin am Steg', template: 'szene', params: { dialogue: 'ankunft-ilda', at: { site: 'hafen.steg' } }, marker: true,
      onStart: [{ glimm: 'Grau hier. Nett.' }] },
  ],
  onComplete: [{ deed: 'ilda-blick' }],
  glimm: 'Auren. Na gut, das ist neu.',
  patch: { icon: 'anker', color: '#4d8cff', back: 'Ankommen: Du bist neu, und das ist okay.' },
  echteWelt: 'Grüß heute eine Person zuerst.',
  debrief: ['Was hilft dir, an einem neuen Ort anzukommen?'],
};

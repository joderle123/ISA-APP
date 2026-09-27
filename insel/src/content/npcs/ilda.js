// Kapitänin Ilda Ferreira (~60, Anker, blau): Mentorin, Werkstatt. Hat nie um Hilfe gebeten und schwieg nach ihrem Satz.
export default {
  id: 'ilda', name: 'Ilda', surname: 'Ferreira', age: 60, renameable: true,
  icon: 'anker', color: '#4d8cff', silhouette: 'kapitaensmantel', introducedIn: 'j1-e01',
  look: { skin: '#b57a4e', hair: '#d9d9d9', hairStyle: 'dutt', top: '#2b3a6b', topStyle: 'jacke', bottoms: '#1d2540', bottomsStyle: 'lang', shoes: '#3a2a20', shoesStyle: 'boots', head: 'muetze', headColor: '#1d2540', build: 0.55, height: 0.6 },
  voice: { pitch: 0.9, rate: 0.92 },
  schedule: [
    { from: 6, to: 10, site: 'steg', anim: 'idle' },
    { from: 10, to: 17, site: 'kapitaenin', anim: 'think' },
    { from: 17, to: 22, site: 'dorfplatz', anim: 'talk' },
    { from: 22, to: 6, site: 'haus3', hidden: true },
  ],
  emotion: { base: { primary: ['freude', 3], secondary: ['trauer', 2] } },
  tanks: { koerper: 55, sicherheit: 75, zugehoerigkeit: 60, anerkennung: 70, selbstbestimmung: 80, spass: 35 },
  boundary: { byBond: [2.0, 1.6, 1.2, 1.0], mood: { wut: 1.2 } },
  streitStil: { default: 'eule', vs: { jhemp: 'schildkroete' } },
  temperament: 'ruhig',
  bond: { ability: { level: 2, id: 'werkstatt', say: 'Die Werkstatt steht dir offen.' }, jacket: 'anker', finale: 'Du hast gefragt, statt zu warten.' },
  tell: { bluff: 'reibt-den-ring', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Moien. Alles an Bord?', 'Der Hafen hält zusammen. Meistens.', 'Frag mich nicht nach dem Turm.'],
    campfire: { 'ilda-blick': 'Du siehst jetzt mehr als die meisten hier.', 'ilda-schluessel': 'Der Schlüssel ist zurück. Danke dir.', 'ilda-hilfe-geholt': 'Du hast mich geholt. Richtig so.' },
    campfireDefault: 'Guter Tag. Du warst da, wo es zählte.',
    capOff: 'Nicht jetzt. Später reden wir.',
  },
};

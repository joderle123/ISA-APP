// Pit Hoffmann (13, Stein, moosgrün): Moorkind. Fall für den Berater, Probelauf, Ziel im Schatten-Chor: „Ich bin nicht der Witz.“
export default {
  id: 'pit', name: 'Pit', surname: 'Hoffmann', age: 13, renameable: true,
  icon: 'stein', color: '#6fae5a', silhouette: 'gebueckt', introducedIn: 'j1-e16',
  look: { skin: '#f3d3b6', hair: '#c96b2f', hairStyle: 'kurz', top: '#6fae5a', topStyle: 'pullover', bottoms: '#4a3a2a', bottomsStyle: 'lang', shoes: '#2a2a2a', shoesStyle: 'boots', freckles: 2, build: 0.3, height: 0.3 },
  voice: { pitch: 1.1, rate: 0.95 },
  schedule: [
    { from: 7, to: 12, site: 'bohlenweg', anim: 'idle' },
    { from: 12, to: 18, site: 'stilleLichtung', anim: 'sit' },
    { from: 18, to: 22, site: 'steinriese', anim: 'think' },
    { from: 22, to: 7, site: 'stilleLichtung', hidden: true },
  ],
  emotion: { base: { primary: ['trauer', 4], secondary: ['angst', 4] } },
  tanks: { koerper: 60, sicherheit: 35, zugehoerigkeit: 30, anerkennung: 20, selbstbestimmung: 45, spass: 40 },
  boundary: { byBond: [2.6, 2.0, 1.4, 1.0], mood: { angst: 1.4 } },
  streitStil: { default: 'schildkroete', vs: { mika: 'schildkroete', tun: 'fuchs' } },
  temperament: 'ebbe',
  bond: { ability: { level: 2, id: 'moosabkuerzung', say: 'Über das Moos. Ich kenn den Weg.' }, jacket: 'stein', finale: 'Ich bin nicht der Witz. Du wusstest das.' },
  tell: { bluff: 'zieht-den-kopf-ein', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Die Steine reden. Hörst du?', 'Hi. Ich bin nur kurz hier.', 'Gelesen. Keine Antwort. Wie immer.'],
    campfire: { 'pit-fakten': 'Du hast Fakten gebracht. Keine Urteile.', 'pit-dazugesetzt': 'Du hast dich zu mir gesetzt. Vor allen.' },
    campfireDefault: 'Heute war ich weniger schwer. Danke.',
    capOff: 'Ich schaff das eh nicht.',
  },
};

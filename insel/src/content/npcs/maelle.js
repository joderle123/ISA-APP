// Maëlle Schmit (14, Trommel, magenta): Trommlerin. Gemischte Gefühle, Traumschiff, Postkarten.
export default {
  id: 'maelle', name: 'Maëlle', surname: 'Schmit', age: 14, renameable: true,
  icon: 'trommel', color: '#ff4f8b', silhouette: 'trommel-am-ruecken', introducedIn: 'j1-e08',
  look: { skin: '#f7d2b5', hair: '#ff4f8b', hairStyle: 'bob', top: '#2a1850', topStyle: 'pullover', bottoms: '#ff4f8b', bottomsStyle: 'rock', shoes: '#1d1d26', shoesStyle: 'boots', pattern: 'streifen', patternColor: '#ffd166', build: 0.4, height: 0.5 },
  voice: { pitch: 1.2, rate: 0.98 },
  schedule: [
    { from: 7, to: 12, site: 'lichtung', anim: 'idle' },
    { from: 12, to: 17, site: 'wasserfall', anim: 'think' },
    { from: 17, to: 22, site: 'lichtung', anim: 'talk' },
    { from: 22, to: 7, site: 'lichtung', hidden: true },
  ],
  emotion: { base: { primary: ['freude', 6], secondary: ['trauer', 5] } },
  tanks: { koerper: 60, sicherheit: 70, zugehoerigkeit: 45, anerkennung: 60, selbstbestimmung: 65, spass: 65 },
  boundary: { byBond: [1.8, 1.4, 1.1, 0.9], mood: { trauer: 1.2 } },
  streitStil: { default: 'eule', vs: { tun: 'fuchs' } },
  temperament: 'gemischt',
  bond: { ability: { level: 2, id: 'bluetenbruecke', say: 'Die Blüten tragen dich. Kurz.' }, jacket: 'trommel', finale: 'Du hast beides gesehen. Froh und traurig.' },
  tell: { bluff: 'trommelt-mit-fingern', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Hörst du den Takt?', 'Meine Schwester geht bald. Ist okay. Irgendwie.', 'Moien! Trommel dabei?'],
    campfire: { 'maelle-beides': 'Froh und traurig. Du hast beides gesagt.', 'maelle-trommel': 'Meine Trommel ist wieder da.' },
    campfireDefault: 'Der Takt stimmte heute. Danke.',
    capOff: 'Zu laut. Alles zu laut.',
  },
};

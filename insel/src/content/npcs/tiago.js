// Tiago Pinto (15, Surfbrett, orange): laut, „Flut“. Wunsch gegen Anerkennung. Gesehenwerden braucht keinen Sieg.
export default {
  id: 'tiago', name: 'Tiago', surname: 'Pinto', age: 15, renameable: true,
  icon: 'surfbrett', color: '#ff8c42', silhouette: 'breite-schultern', introducedIn: 'j1-e04',
  look: { skin: '#c98a5a', hair: '#1a120c', hairStyle: 'locken', top: '#ff8c42', topStyle: 'tanktop', bottoms: '#2de2c9', bottomsStyle: 'kurz', shoes: '#f4e3c1', shoesStyle: 'sandalen', build: 0.7, height: 0.65 },
  voice: { pitch: 1.0, rate: 1.0 },
  schedule: [
    { from: 6, to: 12, site: 'muschelbucht', anim: 'idle' },
    { from: 12, to: 18, site: 'spiegelbecken', anim: 'think' },
    { from: 18, to: 22, site: 'strandHuette', anim: 'talk' },
    { from: 22, to: 6, site: 'strandHuette', hidden: true },
  ],
  emotion: { base: { primary: ['freude', 5], secondary: ['wut', 2] } },
  tanks: { koerper: 80, sicherheit: 65, zugehoerigkeit: 55, anerkennung: 15, selbstbestimmung: 60, spass: 70 },
  boundary: { byBond: [1.5, 1.2, 1.0, 0.8], mood: { wut: 1.3 } },
  streitStil: { default: 'hai', vs: { noor: 'hai', mika: 'teddy', jolie: 'eule' } },
  temperament: 'flut',
  bond: { ability: { level: 2, id: 'surfbrett', say: 'Nimm das Brett. Zum Riff.' }, jacket: 'surfbrett', finale: 'Du hast zugeschaut. Ohne Sieg.' },
  tell: { bluff: 'wippt-mit-dem-fuss', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Hast du das gesehen? Die Welle!', 'Neues Brett. Fast.', 'Moien! Flut ist besser. Sag ich nur.'],
    campfire: { 'tiago-publikum': 'Alle haben zugeschaut. Das war es.', 'tiago-brett': 'Das Brett war es nicht. Du schon.' },
    campfireDefault: 'Heute hat jemand hingeschaut. Danke.',
    verstimmt: 'Du warst nicht beim Rennen.',
    capOff: 'Nicht jetzt! Geh!',
  },
};

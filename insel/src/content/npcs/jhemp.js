// Jhemp Weber (~65, Laterne, grau zu gold): verschwundener Wärter. Scham und Rückzug, gefunden, Nachtüberquerung, Rückkehr.
export default {
  id: 'jhemp', name: 'Jhemp', surname: 'Weber', age: 65, renameable: true,
  icon: 'laterne', color: '#c9b37a', silhouette: 'laterne-am-guertel', introducedIn: 'j1-e15',
  look: { skin: '#d9a877', hair: '#c9c9c9', hairStyle: 'glatze', top: '#6b6b6b', topStyle: 'hemd', bottoms: '#3d3a33', bottomsStyle: 'lang', shoes: '#2a2018', shoesStyle: 'boots', glasses: 'rund', glassesColor: '#c9b37a', build: 0.5, height: 0.6 },
  voice: { pitch: 0.8, rate: 0.88 },
  schedule: [
    { from: 6, to: 14, site: 'klippenGipfel', anim: 'sit' },
    { from: 14, to: 20, site: 'kante', anim: 'think' },
    { from: 20, to: 6, site: 'klippenGipfel', hidden: true },
  ],
  emotion: { base: { primary: ['trauer', 5], secondary: ['angst', 3], inner: ['wut', 4] } },
  tanks: { koerper: 30, sicherheit: 45, zugehoerigkeit: 10, anerkennung: 25, selbstbestimmung: 60, spass: 20 },
  boundary: { byBond: [3.0, 2.2, 1.5, 1.0], mood: { angst: 1.4 } },
  streitStil: { default: 'schildkroete', vs: { ilda: 'schildkroete' } },
  temperament: 'rueckzug',
  bond: { ability: { level: 2, id: 'laternenpfad', say: 'Meine Laternen zeigen den Weg.' }, jacket: 'laterne', finale: 'Ich hätte Hilfe holen können.' },
  tell: { bluff: 'putzt-die-brille', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Noch nicht.', 'Geh wieder. Bitte.', 'Der Turm … ist nicht mehr meiner.'],
    campfire: { 'jhemp-quellen': 'Du hast mich zu den Quellen gebracht.', 'jhemp-crew': 'Ihr habt euch um mich gestellt.' },
    campfireDefault: 'Danke. Ich bin heute nicht weggelaufen.',
    capOff: 'Weg. Ich will nur weg.',
  },
};

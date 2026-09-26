// Oma Lucinda Tavares (~70, Gießkanne): Gärtnerin, Faktencheck: „Gesehen oder nur gehört?“ Zeugin, Notfall-Erwachsene.
export default {
  id: 'lucinda', name: 'Oma Lucinda', surname: 'Tavares', age: 70, renameable: true,
  icon: 'giesskanne', color: '#8fd18b', silhouette: 'strohhut', introducedIn: 'j1-e22',
  look: { skin: '#8d5a3c', hair: '#e6e6e6', hairStyle: 'locken', top: '#8fd18b', topStyle: 'hemd', bottoms: '#6a5040', bottomsStyle: 'lang', shoes: '#4a3a2a', shoesStyle: 'boots', head: 'stirnband', headColor: '#ffd166', glasses: 'rund', glassesColor: '#8d5a3c', build: 0.5, height: 0.4 },
  voice: { pitch: 0.9, rate: 0.86 },
  schedule: [
    { from: 6, to: 13, site: 'lucindasGarten', anim: 'idle' },
    { from: 13, to: 17, site: 'marktplatz', anim: 'talk' },
    { from: 17, to: 22, site: 'lucindasGarten', anim: 'sit' },
    { from: 22, to: 6, site: 'lucindasGarten', hidden: true },
  ],
  emotion: { base: { primary: ['freude', 4] } },
  tanks: { koerper: 45, sicherheit: 80, zugehoerigkeit: 70, anerkennung: 60, selbstbestimmung: 75, spass: 50 },
  boundary: { byBond: [1.6, 1.3, 1.0, 0.8], mood: { angst: 1.2 } },
  streitStil: { default: 'eule' },
  temperament: 'ruhig',
  bond: { ability: { level: 2, id: 'gartenpforte', say: 'Die Pforte ist offen. Und Suppe.' }, jacket: 'giesskanne', finale: 'Du hast hingehört. Nicht nur gehört.' },
  tell: { bluff: 'rueckt-die-brille', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Gesehen oder nur gehört?', 'Moien, Kind. Hunger?', 'Der Garten braucht Hände. Deine?'],
    campfire: { 'lucinda-garten': 'Der Garten steht noch. Dank dir.', 'lucinda-geholt': 'Du hast mich geholt. Gut gemacht.' },
    campfireDefault: 'Heute war ein guter Tag. Du warst dabei.',
    capOff: 'Ruhig. Erst atmen wir gar nichts. Warten.',
  },
};

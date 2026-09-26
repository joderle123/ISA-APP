// Mika Thill (16, Flamme, schwarz-rot): Chef der Vulkan-Crew. Spielt den Harten, erleichtert, dreht sein Publikum, entschuldigt sich.
export default {
  id: 'mika', name: 'Mika', surname: 'Thill', age: 16, renameable: true,
  icon: 'flamme', color: '#ff4d4d', silhouette: 'crew-bandana', introducedIn: 'j1-e24',
  look: { skin: '#f0c09a', hair: '#0f0a0a', hairStyle: 'irokese', hairAccent: '#ff4d4d', top: '#1a1a22', topStyle: 'jacke', bottoms: '#2a2a2a', bottomsStyle: 'cargo', shoes: '#ff4d4d', shoesStyle: 'high', head: 'bandana', headColor: '#ff3b3b', build: 0.65, height: 0.8 },
  voice: { pitch: 0.92, rate: 1.02 },
  schedule: [
    { from: 8, to: 13, site: 'vulkanFuss', anim: 'idle' },
    { from: 13, to: 19, site: 'kraterRand', anim: 'talk' },
    { from: 19, to: 24, site: 'vulkanFuss', anim: 'idle' },
    { from: 0, to: 8, site: 'vulkanFuss', hidden: true },
  ],
  emotion: { base: { primary: ['wut', 3], secondary: ['freude', 3], inner: ['angst', 6] } },
  tanks: { koerper: 70, sicherheit: 35, zugehoerigkeit: 60, anerkennung: 50, selbstbestimmung: 30, spass: 55 },
  boundary: { byBond: [1.4, 1.2, 1.0, 0.8], mood: { wut: 1.3 } },
  streitStil: { default: 'hai', vs: { tiago: 'teddy', luc: 'eule', pit: 'fuchs' } },
  temperament: 'flut',
  bond: { ability: { level: 2, id: 'lavatunnel', say: 'Der Tunnel. Sag es keinem.' }, jacket: 'flamme', finale: 'Ich hab den Harten gespielt. Sorry, Pit.' },
  tell: { bluff: 'kaut-auf-der-lippe', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Was willst du?', 'Der Krater ist unser Platz.', 'Moien. Traust du dich?'],
    campfire: { 'mika-zweites-nein': 'Zwei Nein. Die Crew ist gekippt.', 'mika-publikum': 'Ich hab mein Publikum gedreht.' },
    campfireDefault: 'War okay heute. Sag es keinem.',
    capOff: 'Halt die Klappe. Geh.',
  },
};

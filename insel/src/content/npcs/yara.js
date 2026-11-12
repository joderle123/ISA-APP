// Yara Nasser (15, Stern, rosa): Glimmer-Creatorin. Likes, 40 Versuche, „echte Momente“.
export default {
  id: 'yara', name: 'Yara', surname: 'Nasser', age: 15, renameable: true,
  icon: 'stern', color: '#ff8ccf', silhouette: 'handy-hoch', introducedIn: 'j1-e27',
  look: { skin: '#d9a877', hair: '#3b2a20', hairStyle: 'flechtzoepfe', hairAccent: '#ff8ccf', top: '#ff8ccf', topStyle: 'tshirt', bottoms: '#ffffff', bottomsStyle: 'jogger', shoes: '#ff8ccf', shoesStyle: 'sneaker', pattern: 'leuchtkante', patternColor: '#7cf3ff', build: 0.4, height: 0.55 },
  voice: { pitch: 1.2, rate: 1.0 },
  schedule: [
    { from: 9, to: 14, site: 'kraterRand', anim: 'idle' },
    { from: 14, to: 20, site: 'quellental', anim: 'think' },
    { from: 20, to: 24, site: 'vulkanFuss', anim: 'talk' },
    { from: 0, to: 9, site: 'vulkanFuss', hidden: true },
  ],
  emotion: { base: { primary: ['freude', 5], secondary: ['angst', 3], inner: ['trauer', 4] } },
  tanks: { koerper: 55, sicherheit: 60, zugehoerigkeit: 45, anerkennung: 20, selbstbestimmung: 55, spass: 65 },
  boundary: { byBond: [1.8, 1.4, 1.1, 0.9], mood: { angst: 1.3 } },
  streitStil: { default: 'fuchs', vs: { kim: 'eule' } },
  temperament: 'flut',
  bond: { ability: { level: 2, id: 'lichtschienen', say: 'Die Schienen bringen dich hoch.' }, jacket: 'stern', finale: 'Ein echter Kommentar. Nicht nur nice.' },
  tell: { bluff: 'schaut-aufs-handy', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Warte. Das Licht ist perfekt. Gleich.', 'Moien! Fotomodus an?', 'Vierzig Versuche. Eins wird gut.'],
    campfire: { 'yara-kommentar': 'Dein Kommentar war ehrlich. Der zählt.', 'yara-totale': 'Du hast das Chaos gesehen. Und geblieben.' },
    campfireDefault: 'Heute war ein echter Moment dabei.',
    capOff: 'Nicht jetzt. Bin gleich fertig.',
  },
};

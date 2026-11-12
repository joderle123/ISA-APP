// Luc Reding (16, Windrad, sturmblau): Erfinder, Sturm-Wut. Von „Deckel ab“ zum Experten, der Senait sein Gadget zeigt.
export default {
  id: 'luc', name: 'Luc', surname: 'Reding', age: 16, renameable: true,
  icon: 'windrad', color: '#8fa3ff', silhouette: 'werkzeuggurt', introducedIn: 'j1-e11',
  look: { skin: '#e4b48f', hair: '#8a6a3a', hairStyle: 'stachel', top: '#8fa3ff', topStyle: 'jacke', bottoms: '#2b2f4a', bottomsStyle: 'cargo', shoes: '#3a2a20', shoesStyle: 'boots', glasses: 'sport', glassesColor: '#1d1d26', build: 0.55, height: 0.75 },
  voice: { pitch: 0.95, rate: 1.0 },
  schedule: [
    { from: 6, to: 12, site: 'wetterwarte', anim: 'think' },
    { from: 12, to: 18, site: 'kante', anim: 'idle' },
    { from: 18, to: 22, site: 'wetterwarte', anim: 'talk' },
    { from: 22, to: 6, site: 'wetterwarte', hidden: true },
  ],
  emotion: { base: { primary: ['wut', 4], secondary: ['angst', 3] } },
  tanks: { koerper: 50, sicherheit: 40, zugehoerigkeit: 50, anerkennung: 45, selbstbestimmung: 70, spass: 55 },
  boundary: { byBond: [2.2, 1.7, 1.2, 0.9], mood: { wut: 1.4 } },
  streitStil: { default: 'hai', vs: { mika: 'eule', senait: 'teddy' } },
  temperament: 'sturm',
  bond: { ability: { level: 2, id: 'aufwindfaecher', say: 'Der Fächer trägt dich hoch.' }, jacket: 'windrad', finale: 'Du hast die Leine gehalten. Im Takt.' },
  tell: { bluff: 'schaut-zum-windrad', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Die Böen kommen von Westen. Immer.', 'Moien. Fass das Windrad nicht an.', 'Hast du ein Gadget dabei?'],
    campfire: { 'luc-leine': 'Danke für die Leine.', 'luc-tandem': 'Im Gleichschritt. Hat geklappt.' },
    campfireDefault: 'Heute war der Sturm kleiner. Danke.',
    capOff: 'Lass mich! Der Drachen reißt gleich!',
  },
};

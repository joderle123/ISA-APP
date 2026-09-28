// Tun Kremer (13, Kamera, gelb): Hafen-Clown. Filmt, wird gestoppt, dreht als Erster seine Bank um, entschuldigt sich.
export default {
  id: 'tun', name: 'Tun', surname: 'Kremer', age: 13, renameable: true,
  icon: 'kamera', color: '#ffd23f', silhouette: 'cap-schief', introducedIn: 'j1-e01',
  look: { skin: '#e8b48a', hair: '#2a1a12', hairStyle: 'undercut', top: '#ffd23f', topStyle: 'tshirt', bottoms: '#3a3a3a', bottomsStyle: 'kurz', shoes: '#ff5d73', shoesStyle: 'high', head: 'cap', headColor: '#1d1d26', back: 'rucksack', backColor: '#2de2c9', build: 0.45, height: 0.4 },
  voice: { pitch: 1.1, rate: 1.05 },
  schedule: [
    { from: 7, to: 12, site: 'dorfplatz', anim: 'talk' },
    { from: 12, to: 16, site: 'questBrett', anim: 'idle' },
    { from: 16, to: 21, site: 'steg', anim: 'idle' },
    { from: 21, to: 7, site: 'haus1', hidden: true },
  ],
  emotion: { base: { primary: ['freude', 6], secondary: ['ueberraschung', 3], inner: ['trauer', 3] } },
  tanks: { koerper: 65, sicherheit: 60, zugehoerigkeit: 50, anerkennung: 30, selbstbestimmung: 55, spass: 80 },
  // Gläser (Blick-Stufe „Gläser“, QUELLE): Höhe = wie wichtig (0–1), Füllung = wie voll (Startwert, 0–1). Namen: content/beduerfnisse.js
  glaeser: {
    form: 'dose',
    folge: { id: 'winde', icon: 'seil', glimm: 'Die Winde klemmt.' },
    wichtig: { dazugehoeren: 0.55, ruhe: 0.4, anerkennung: 1, bewegung: 0.45, schlaf: 0.3, mitbestimmen: 0.4 },
    voll: { dazugehoeren: 0.25, ruhe: 0.75, anerkennung: 0.15, bewegung: 0.85, schlaf: 0.2, mitbestimmen: 0.7 },
  },
  boundary: { byBond: [1.6, 1.3, 1.0, 0.8], mood: { wut: 1.3 } },
  streitStil: { default: 'fuchs', vs: { ilda: 'teddy', mika: 'schildkroete' } },
  temperament: 'flut',
  bond: { ability: { level: 2, id: 'daecher', say: 'Über die Dächer geht es schneller.' }, jacket: 'kamera', finale: 'Das Video war nicht okay. Sorry.' },
  tell: { bluff: 'grinst-einseitig', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Yo! Keine Regeln, oder?', 'Lächeln. Ich film nicht. Ehrlich.', 'Moien! Die Möwe hat wieder was geklaut. Respekt.'],
    campfire: { 'tun-nachgefragt': 'Du hast nachgefragt. Macht sonst keiner.', 'tun-kodex': 'Okay, die Regel war gut. Zugegeben.', 'tun-gestoppt': 'Du hast Stopp gesagt. Ich hab es gehört.', 'tun-bank-gedreht': 'Ich hab die Bank gedreht. Zuerst.' },
    campfireDefault: 'War ein guter Tag. Kein Witz.',
    verstimmt: 'Du hast gelacht. Über mich.',
    capOff: 'Chill doch. Lass mich.',
  },
};

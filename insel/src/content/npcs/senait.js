// Senait Tesfaye (12, Kompass, sonnengelb): die Neue (j07). Von der Neuen zur Insiderin, trägt im Finale den letzten Splitter.
export default {
  id: 'senait', name: 'Senait', surname: 'Tesfaye', age: 12, renameable: true,
  icon: 'kompass', color: '#ffcf4d', silhouette: 'reisetasche', introducedIn: 'j1-j07',
  look: { skin: '#6e4327', hair: '#1a120c', hairStyle: 'afro', top: '#ffcf4d', topStyle: 'tshirt', bottoms: '#2b6cb0', bottomsStyle: 'kurz', shoes: '#ffffff', shoesStyle: 'sneaker', back: 'rucksack', backColor: '#ff6b6b', build: 0.3, height: 0.25 },
  voice: { pitch: 1.2, rate: 0.98 },
  schedule: [
    { from: 7, to: 12, site: 'steg', anim: 'idle' },
    { from: 12, to: 18, site: 'dorfplatz', anim: 'think' },
    { from: 18, to: 22, site: 'baumhaus', anim: 'talk' },
    { from: 22, to: 7, site: 'haus2', hidden: true },
  ],
  emotion: { base: { primary: ['ueberraschung', 5], secondary: ['angst', 3] } },
  tanks: { koerper: 65, sicherheit: 40, zugehoerigkeit: 25, anerkennung: 45, selbstbestimmung: 50, spass: 60 },
  boundary: { byBond: [2.0, 1.5, 1.1, 0.9], mood: { angst: 1.3 } },
  streitStil: { default: 'schildkroete', vs: { luc: 'teddy' } },
  temperament: 'neugierig',
  bond: { ability: { level: 2, id: 'schleichpfade', say: 'Ich hab Pfade gefunden. Komm.' }, jacket: 'kompass', finale: 'Du hast mir die Feuer gezeigt.' },
  tell: { bluff: 'dreht-den-kompass', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Bin ich hier richtig?', 'Moien! Du kennst dich aus, oder?', 'Und dann? Erklär weiter.'],
    campfire: { 'senait-pate': 'Du hast mir alles gezeigt. Danke.', 'senait-kodex': 'Wir haben den Kodex neu unterschrieben.' },
    campfireDefault: 'Heute war ich weniger neu. Wegen dir.',
    capOff: 'Zu viel. Alles zu viel.',
  },
};

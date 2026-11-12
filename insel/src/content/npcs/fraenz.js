// Fränz Kieffer (~70, Hammer): Bootsbauer (j02). Vierter und stolz, repariert dein Boot für Staffel 2.
export default {
  id: 'fraenz', name: 'Fränz', surname: 'Kieffer', age: 70, renameable: true,
  icon: 'hammer', color: '#d8a26b', silhouette: 'schuerze', introducedIn: 'j1-j02',
  look: { skin: '#e4b48f', hair: '#bfbfbf', hairStyle: 'kurz', top: '#d8a26b', topStyle: 'hemd', bottoms: '#3d3a33', bottomsStyle: 'lang', shoes: '#2a2018', shoesStyle: 'boots', head: 'muetze', headColor: '#6b4a2f', build: 0.6, height: 0.55 },
  voice: { pitch: 0.8, rate: 0.9 },
  schedule: [
    { from: 6, to: 12, site: 'steg', anim: 'idle' },
    { from: 12, to: 18, site: 'snackStand', anim: 'talk' },
    { from: 18, to: 21, site: 'steg', anim: 'think' },
    { from: 21, to: 6, site: 'haus3', hidden: true },
  ],
  emotion: { base: { primary: ['freude', 5] } },
  tanks: { koerper: 50, sicherheit: 70, zugehoerigkeit: 65, anerkennung: 55, selbstbestimmung: 80, spass: 60 },
  boundary: { byBond: [1.6, 1.3, 1.0, 0.8] },
  streitStil: { default: 'teddy' },
  temperament: 'ruhig',
  bond: { ability: { level: 2, id: 'bootsreparatur', say: 'Dein Boot kriegen wir hin.' }, jacket: 'hammer', finale: 'Vierter. Und stolz. Wie du.' },
  tell: { bluff: 'kratzt-am-kinn', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Pech ist nur Pech. Kein Urteil.', 'Moien. Das Boot hält. Noch.', 'Vierter. Und stolz.'],
    campfire: { 'fraenz-regatta': 'Die Regatta war hart. Du bist gefahren.' },
    campfireDefault: 'Guter Tag auf dem Wasser. Danke.',
    capOff: 'Später. Jetzt hämmere ich.',
  },
};

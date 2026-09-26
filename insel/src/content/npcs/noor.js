// Noor Haddad (14, Spraydose, violett): Künstlerin. Übermaltes Bild, Treppe mit Tiago, Deepfake, malt am Ende das Turmbild.
export default {
  id: 'noor', name: 'Noor', surname: 'Haddad', age: 14, renameable: true,
  icon: 'spraydose', color: '#b06bff', silhouette: 'kopftuch', introducedIn: 'j1-e20',
  look: { skin: '#c48a5c', hair: '#1a120c', hairStyle: 'kopftuch', hairAccent: '#b06bff', top: '#b06bff', topStyle: 'hoodie', bottoms: '#1d1d26', bottomsStyle: 'jogger', shoes: '#ffffff', shoesStyle: 'sneaker', pattern: 'batik', patternColor: '#ffd166', build: 0.45, height: 0.5 },
  voice: { pitch: 1.15, rate: 1.0 },
  schedule: [
    { from: 7, to: 12, site: 'noorsMauer', anim: 'idle' },
    { from: 12, to: 18, site: 'marktplatz', anim: 'talk' },
    { from: 18, to: 22, site: 'noorsMauer', anim: 'think' },
    { from: 22, to: 7, site: 'lucindasGarten', hidden: true },
  ],
  emotion: { base: { primary: ['freude', 4], secondary: ['wut', 3], inner: ['wut', 7] } },
  tanks: { koerper: 65, sicherheit: 50, zugehoerigkeit: 55, anerkennung: 40, selbstbestimmung: 35, spass: 60 },
  boundary: { byBond: [2.2, 1.8, 1.3, 1.0], mood: { wut: 1.3, ekel: 1.3 } },
  streitStil: { default: 'fuchs', vs: { tiago: 'hai', lucinda: 'teddy' } },
  temperament: 'flut',
  bond: { ability: { level: 2, id: 'farbmarken', say: 'Ich mal dir Zeichen auf die Karte.' }, jacket: 'spraydose', finale: 'Du hast gefragt, wie ich es meinte.' },
  tell: { bluff: 'dreht-die-dose', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Fass die Wand nicht an. Frisch.', 'Moien. Wie meinst du das?', 'Mein Bild. Übermalt. Schon wieder.'],
    campfire: { 'noor-klarklang': 'Der Akkord war sauber. Danke.', 'noor-quelle': 'Du hast die Quelle gesucht. Nicht das Bild.' },
    campfireDefault: 'Heute hat jemand nachgefragt. Das war gut.',
    capOff: 'Lass mich in Ruhe!',
  },
};

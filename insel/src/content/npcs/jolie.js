// Jolie Wagner (13, Muschel, türkis): still, „Ebbe“. Grau und allein, dann vertraut sie im Dunkeln, wird zweites Nein.
export default {
  id: 'jolie', name: 'Jolie', surname: 'Wagner', age: 13, renameable: true,
  icon: 'muschel', color: '#39d0c8', silhouette: 'grosse-kapuze', introducedIn: 'j1-e01',
  look: { skin: '#f0c09a', hair: '#6b4a2f', hairStyle: 'lang', top: '#39d0c8', topStyle: 'hoodie', bottoms: '#2b3350', bottomsStyle: 'lang', shoes: '#ffffff', shoesStyle: 'sneaker', head: 'kapuze', build: 0.35, height: 0.35 },
  voice: { pitch: 1.15, rate: 0.95 },
  schedule: [
    { from: 6, to: 11, site: 'steg', anim: 'sit' },
    { from: 11, to: 17, site: 'muschelbucht', anim: 'think' },
    { from: 17, to: 22, site: 'dorfplatz', anim: 'idle' },
    { from: 22, to: 6, site: 'haus2', hidden: true },
  ],
  emotion: { base: { primary: ['trauer', 4], secondary: ['angst', 2] } },
  tanks: { koerper: 70, sicherheit: 60, zugehoerigkeit: 15, anerkennung: 40, selbstbestimmung: 60, spass: 50 },
  boundary: { byBond: [2.4, 1.8, 1.2, 0.9], mood: { angst: 1.3 } },
  streitStil: { default: 'schildkroete', vs: { tun: 'fuchs' } },
  temperament: 'ebbe',
  bond: { ability: { level: 2, id: 'spalt', say: 'Ich zeig dir die Spalten.' }, jacket: 'muschel', finale: 'Du hast dich einfach neben mich gesetzt.' },
  tell: { bluff: 'blick-links-unten', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Hi.', 'Oh. Du wieder.', 'Ist okay, wenn du bleibst.', 'Nicht gucken. Ist noch nicht fertig.'],
    campfire: { 'jolie-versprochen': 'Du hast was versprochen. Ich merk mir das.', 'jolie-ehrlich': 'Du hast nichts versprochen. War wenigstens ehrlich.', 'jolie-dasein': 'Du hast dich einfach dazugesetzt. Ohne Fragen.', 'jolie-spalt': 'Ich durfte vorgehen. Das war neu.', 'jolie-dazugesetzt': 'Zwei Sekunden. Und dann noch mehr.', 'jolie-im-dunkeln-gefuehrt': 'Du hast gewartet. Im Dunkeln.', 'jolie-zweites-nein': 'Ich war nicht allein mit meinem Nein.' },
    campfireDefault: 'Heute … ging.',
    verstimmt: 'Du warst nicht da. Am Steg.',
    capOff: '…',
  },
};

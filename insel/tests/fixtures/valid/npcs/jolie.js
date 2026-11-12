// Fixture: NpcDef aus CONTENT-SCHEMA.md
export default {
  id: 'jolie', name: 'Jolie', surname: 'Wagner', age: 13, renameable: true,
  icon: 'muschel', color: '#39d0c8', silhouette: 'grosse-kapuze', introducedIn: 'j1-e01',
  look: { skin: '#f0c09a', hairStyle: 'lang', hair: '#6b4a2f', top: '#39d0c8', topStyle: 'hoodie', bottoms: '#2b3350' },
  voice: { pitch: 1.15, rate: 0.95 },
  schedule: [
    { from: 6, to: 11, site: 'steg', anim: 'sit' },
    { from: 11, to: 17, site: 'strand.muschelbucht', anim: 'think' },
    { from: 17, to: 22, site: 'dorfplatz' },
    { from: 22, to: 6, site: 'haus2', hidden: true },
  ],
  emotion: { base: { primary: ['trauer', 4] } },
  tanks: { koerper: 70, sicherheit: 60, zugehoerigkeit: 15, anerkennung: 40, selbstbestimmung: 60, spass: 50 },
  boundary: { byBond: [2.4, 1.8, 1.2, 0.9], mood: { angst: 1.3 } },
  streitStil: { default: 'schildkroete', vs: { tun: 'fuchs' } },
  temperament: 'ebbe',
  bond: {
    ability: { level: 2, id: 'spalt', say: 'Ich zeig dir die Spalten.' },
    jacket: 'muschel',
    finale: 'Du hast dich einfach neben mich gesetzt.',
  },
  tell: { bluff: 'blick-links-unten', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Hi.', 'Oh. Du wieder.'],
    campfire: { 'jolie-im-dunkeln-gefuehrt': 'Im Dunkeln war ich froh, dass du gewartet hast.' },
  },
  nachtwache: ['nw-jolie-steg'],
};

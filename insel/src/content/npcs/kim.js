// Kim Lentz (13, Chip, cyan): Technik. KI „Spiegel“ außer Kontrolle, steht dazu, baut sie um.
export default {
  id: 'kim', name: 'Kim', surname: 'Lentz', age: 13, renameable: true,
  icon: 'chip', color: '#2de2ff', silhouette: 'kopfhoerer', introducedIn: 'j1-e28',
  look: { skin: '#f7d2b5', hair: '#2de2ff', hairStyle: 'buzz', top: '#1d1d26', topStyle: 'hoodie', bottoms: '#2de2ff', bottomsStyle: 'lang', shoes: '#ffffff', shoesStyle: 'sneaker', head: 'kopfhoerer', headColor: '#2de2ff', hearingAid: 'links', aidColor: '#2de2ff', build: 0.35, height: 0.35 },
  voice: { pitch: 1.1, rate: 1.0 },
  schedule: [
    { from: 8, to: 13, site: 'questBrett', anim: 'think' },
    { from: 13, to: 19, site: 'haus1', anim: 'idle' },
    { from: 19, to: 23, site: 'dorfplatz', anim: 'talk' },
    { from: 23, to: 8, site: 'haus1', hidden: true },
  ],
  emotion: { base: { primary: ['ueberraschung', 4], secondary: ['angst', 2] } },
  tanks: { koerper: 50, sicherheit: 55, zugehoerigkeit: 40, anerkennung: 55, selbstbestimmung: 70, spass: 60 },
  boundary: { byBond: [2.0, 1.6, 1.2, 0.9], mood: { angst: 1.2 } },
  streitStil: { default: 'eule', vs: { yara: 'fuchs' } },
  temperament: 'ebbe',
  bond: { ability: { level: 2, id: 'netzreise', say: 'Schnellreise übers Netz. Freigeschaltet.' }, jacket: 'chip', finale: 'Spiegel war mein Fehler. Ich steh dazu.' },
  tell: { bluff: 'tippt-auf-den-chip', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Quelle? Immer zuerst die Quelle.', 'Moien. Läuft dein Gerät?', 'Spiegel hat wieder was gemacht. Ungut.'],
    campfire: { 'kim-quelle': 'Du hast quer gelesen. Wie ich.', 'kim-umbau': 'Wir bauen Spiegel um. Zusammen.' },
    campfireDefault: 'Heute lief alles ohne Absturz. Danke.',
    capOff: 'Warte. Ich muss das erst fixen.',
  },
};

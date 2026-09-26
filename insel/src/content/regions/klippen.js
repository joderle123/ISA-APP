// Region M3 Sturmklippen (DESIGN §11): Grundgerüst aus WP31 (Schleier-Stufen je Einheit, Orte); WP53 baut aus.
export default {
  id: 'klippen', module: 'j1-m3', name: 'Sturmklippen',
  veil: { zone: 'klippen', start: 1, steps: { 'j1-e11': 0.8, 'j1-e12': 0.6, 'j1-e13': 0.45, 'j1-e14': 0.3, 'j1-e15': 0 } },
  teaserFrom: 'j1-e10',
  palette: { key: '#8fa3ff', accent: '#ffd166', dyes: ['#8fa3ff', '#2f3552', '#ffd166', '#7fe0ff'] },
  season: 'winter',
  music: { theme: 'klippen', layers: ['streicherTief', 'cello', 'pauke', 'violinen'] },
  sites: {
    wetterwarte: { x: -98, z: -70, r: 5 },
    kante: { x: -104, z: -96, r: 4 },
    gipfel: { x: -106, z: -106, r: 6 },
    klangschlucht: { x: -120, z: -110, r: 6 },
  },
  signalfeuer: [{ id: 'sf-klippen', site: 'wetterwarte', litBy: { unitDone: 'j1-e11' } }],
  npcs: ['luc'],
};

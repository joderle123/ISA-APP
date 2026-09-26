// Fixture: RegionDef aus CONTENT-SCHEMA.md
export default {
  id: 'strand', module: 'j1-m1', name: 'Palmenstrand',
  veil: {
    zone: 'strand', start: 1, steps: { 'j1-e04': 0.6, 'j1-e05': 0.3, 'j1-e06': 0 },
    patches: [{ id: 'mangrove', x: 150, z: -8, r: 18, start: 1, freeAt: 'j1-e06' }, { id: 'surfspot', x: 172, z: 32, r: 12, start: 0 }],
  },
  teaserFrom: 'j1-e03',
  palette: { key: '#2de2c9', accent: '#ff7a59', dyes: ['#2de2c9', '#ffe29a', '#ff7a59', '#0b6e79'] },
  season: 'spaetsommer',
  music: { theme: 'strand', layers: ['marimba', 'bass', 'steeldrum', 'chor'] },
  sites: {
    muschelbucht: { x: 128, z: 38, r: 10 },
    gezeitenhoehle: { x: 160, z: 0, interior: 'gezeitenhoehle' },
    mangrove: { x: 150, z: -8 },
    spiegelbecken: { x: 142, z: 44 },
    surfspot: { x: 172, z: 32 },
  },
  signalfeuer: [{ id: 'sf-strand', site: 'muschelbucht', litBy: { unitDone: 'j1-e04' } }],
  gates: [
    { id: 'strand-bruecke', type: 'runentor', needs: { upgrade: 'teamgeist.ruf' }, pos: { x: 118, z: 58 } },
    { id: 'hoehle-flut', type: 'gezeitentuer', params: { need: 'flut' }, pos: { site: 'strand.gezeitenhoehle' } },
  ],
  climbables: [{ id: 'mangrove-stamm', kind: 'wurzel', pos: { site: 'strand.mangrove' }, height: 40 }],
  lichtkammer: 'gezeitenkammer', rennstrecken: ['mangroven-kletterei'], nebelkern: 'nk-strand',
  aussichtspunkte: [{ id: 'ap-mangrove', x: 150, z: -8, y: 42 }],
  npcs: ['tiago'], ambient: { count: 6, seed: 41 },
};

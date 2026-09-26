// Fixture: Region für die Quest j1-e11
export default {
  id: 'klippen', module: 'j1-m3', name: 'Sturmklippen',
  veil: { zone: 'klippen', start: 1, steps: { 'j1-e11': 0.8, 'j1-e15': 0 } },
  sites: { wetterwarte: { x: -98, z: -70, r: 5 }, kante: { x: -104, z: -96 }, klangschlucht: { x: -120, z: -110 } },
  gates: [{ id: 'klangschlucht-tor', type: 'klangtor', needs: { upgrade: 'ruhe.sinne' }, pos: { site: 'klippen.klangschlucht' } }],
  npcs: ['luc', 'jhemp'],
};

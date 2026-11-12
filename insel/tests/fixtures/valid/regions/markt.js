// Fixture: Region mit dem Tor für das Satzbau-Minispiel
export default {
  id: 'markt', module: 'j1-m5', name: 'Markt-Hügel',
  sites: { buehne: { x: -118, z: 10, r: 6 }, hintertor: { x: -130, z: 20 } },
  gates: [{ id: 'markt-hintertor', type: 'klangtor', needs: { upgrade: 'mut.klarklang' }, pos: { site: 'markt.hintertor' } }],
  npcs: ['saftverkaeufer'],
};

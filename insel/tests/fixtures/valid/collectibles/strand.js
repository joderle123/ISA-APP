// Fixture: CollectibleDef
export default {
  id: 'strand',
  items: [
    { id: 'ls-strand-01', type: 'lichtsplitter', pos: { x: 130, z: 40 } },
    { id: 'ls-strand-02', type: 'lichtsplitter', pos: { site: 'strand.spiegelbecken' }, needs: { ability: 'schwimmen' } },
    { id: 'ap-strand-mangrove', type: 'aussicht', pos: { x: 150, y: 42, z: -8 } },
    { id: 'muschel-strand-01', type: 'muschel', pos: { x: 140, z: 30 }, memoryImage: 'surf-show' },
  ],
};

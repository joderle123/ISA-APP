// Bergen im Schären-Sektor vor dem Hafen (BAUPLAN §2.1 A3): 10 FESTE Fundorte, keine Zufallsbeute, keine Neugenerierung.
// 6 treibende Kisten, 1 auf dem Vorsprung der Möwenklippe (vom Boot aus mit dem Haken), 3 an der Wrackbank (hinter der
// Nebelwand, erst mit Laterne). Koordinaten in Weltmetern (Steg bei x 6, z 138; Möwenklippe −50/176; Wrackbank 66/186).
// kind: treibend (schaukelt auf einem kleinen Kreis um den Ankerpunkt) · klippe (liegt fest, y = Höhe) · wrack (liegt fest)
// material: { holz, tau, tuch, metall } – Kosten der Teile in content/boot/teile.js (alle Teile mit 9 der 10 Funde baubar).
export default {
  id: 'hafen', region: 'hafen',
  funde: [
    { id: 'd1', kind: 'treibend', x: -12, z: 172, material: { holz: 2 } },
    { id: 'd2', kind: 'treibend', x: 24, z: 178, material: { tau: 1 } },
    { id: 'd3', kind: 'treibend', x: -30, z: 192, material: { holz: 1, metall: 1 } },
    { id: 'd4', kind: 'treibend', x: 8, z: 200, material: { tuch: 1 } },
    { id: 'd5', kind: 'treibend', x: 40, z: 180, material: { metall: 1 } },
    { id: 'd6', kind: 'treibend', x: -62, z: 200, material: { tau: 1, tuch: 1 } },
    { id: 'k1', kind: 'klippe', x: -48.58, z: 171.0, y: 2.3, material: { tuch: 1, tau: 1 } },
    { id: 'w1', kind: 'wrack', x: 63.5, z: 179.2, material: { holz: 2, metall: 1 } },
    { id: 'w2', kind: 'wrack', x: 72.8, z: 183.5, material: { tuch: 1, holz: 1 } },
    { id: 'w3', kind: 'wrack', x: 59.2, z: 188.5, material: { metall: 1, tau: 1 } },
  ],
};

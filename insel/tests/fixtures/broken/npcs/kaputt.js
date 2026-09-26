// Kaputt: Farbe kein Hex, unbekannter Tank, Bindungs-Fähigkeit Stufe 5, Tagesablauf ohne Ort
export default {
  id: 'kaputt', name: 'Kaputt', icon: 'x', color: 'rot',
  tanks: { koerper: 50, hunger: 20 },
  bond: { ability: { level: 5, id: 'x' } },
  schedule: [{ from: 6, to: 30 }],
};

// Erwachsene der Annexe im Spiel (Namen von der Auftraggeberin, 18.11.2026 – Spiel-Namen, abgewandelt).
// Interne Kennungen bleiben, damit alte Daten weiterlaufen: „hoffmann“ = Klassenlehrerin Mme Tidderich, „kaya“ = Herr Kuedes (SePAS).
export const PERSONAL = {
  hoffmann: { hoehe: 1.68, name: 'Mme Tidderich', modell: 'frauen', stil: 'Formal', haut: '#efc7a4', haar: '#6b4e3a', oben: '#4a5568', unten: '#2d3748', schuhe: '#3a2a1c', farbe: '#4a5568', erwachsen: true, frisur: 'bob' },
  kaya: { hoehe: 1.8, name: 'Herr Kuedes', modell: 'menschen', stil: 'Casual2', haut: '#c99a72', haar: '#1b1410', oben: '#3fa66b', unten: '#3a3f4b', schuhe: '#6b4e3a', farbe: '#3fa66b', erwachsen: true },
  mesenberg: { hoehe: 1.84, name: 'Herr Mesenberg', modell: 'menschen', stil: 'Casual', haut: '#f0c9a8', haar: '#8a6a4a', oben: '#2f6b8a', unten: '#3a3f4b', schuhe: '#2b2b2b', farbe: '#2f6b8a', erwachsen: true, brille: '#2b2b33' },
  nouvelle: { hoehe: 1.66, name: 'Mme Nouvelle', modell: 'frauen', stil: 'Suit', haut: '#e8bf9a', haar: '#2b1d14', oben: '#9b4a6a', unten: '#2f2f3a', schuhe: '#2b2b2b', farbe: '#9b4a6a', erwachsen: true, frisur: 'dutt' },
  kiesser: { hoehe: 1.64, name: 'Mme Kiesser', modell: 'frauen', stil: 'Adventurer', haut: '#f3d2b5', haar: '#c0392b', oben: '#e9a23b', unten: '#3a3f4b', schuhe: '#6b4e3a', farbe: '#e9a23b', erwachsen: true, frisur: 'locken' },
  sabli: { hoehe: 1.67, name: 'Mme Sabli', modell: 'frauen', stil: 'Formal', haut: '#c68e64', haar: '#1b1410', oben: '#2f4f8a', unten: '#2d3748', schuhe: '#2b2b2b', farbe: '#2f4f8a', erwachsen: true, frisur: 'lang' },
  lenning: { hoehe: 1.7, name: 'Mme Lenning', modell: 'frauen', stil: 'Suit', haut: '#f0c9a8', haar: '#d9b36a', oben: '#3f7d5a', unten: '#2f2f3a', schuhe: '#3a2a1c', farbe: '#3f7d5a', erwachsen: true, frisur: 'bob', brille: '#b5651d' },
  rantini: { hoehe: 1.65, name: 'Mme Rantini', modell: 'frauen', stil: 'Casual', haut: '#e0b48c', haar: '#4a3020', oben: '#8a5a3a', unten: '#3a3f4b', schuhe: '#2b2b2b', farbe: '#8a5a3a', erwachsen: true, frisur: 'lang' },
};
// Wer unterrichtet die Lern-Lektionen (statt der alten Kennung in lektionen.js)
export const FACHLEHRER = { deutsch: 'nouvelle', francais: 'sabli', mathe: 'lenning' };

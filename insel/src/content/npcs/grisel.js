// Grisel: Schleiermotte aus Ungesagtem. Wirkt wie ein Monster, ist hungrig, wird zum Lichtfalter. Keine Figur mit Tagesablauf
// (die Welt stellt sie als Requisite dar: decor.grisel); hier nur Stimme, Farbe und Zeilen für Blasen und Finale.
export default {
  id: 'grisel', name: 'Grisel', renameable: true,
  icon: 'motte', color: '#9a93b8', silhouette: 'motte', introducedIn: 'j1-e30',
  noSpawn: true,
  voice: { pitch: 0.7, rate: 0.85 },
  emotion: { base: { primary: ['trauer', 6], secondary: ['angst', 6] } },
  tanks: { koerper: 40, sicherheit: 20, zugehoerigkeit: 5, anerkennung: 10, selbstbestimmung: 50, spass: 10 },
  boundary: { byBond: [4.0, 3.0, 2.0, 1.2] },
  streitStil: { default: 'schildkroete' },
  bond: { finale: 'Ihr habt zugehört. Ich bin satt.' },
  lines: {
    greet: ['…', 'So still. So viel Ungesagtes.'],
    campfireDefault: 'Heute hat jemand etwas gesagt. Endlich.',
  },
};

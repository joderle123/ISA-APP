// Die sechs Bedürfnisse (Gläser) aus dem Kurs, Einheit j1-e04 „Das Glas der Bedürfnisse“ (skills/src/content/kurs-j1.js).
// EINZIGE Stelle für Namen, Bedeutung, Symbol und Farbe. Blick (Gläser), Nest, Spiegel im Baumhaus und Missionen lesen
// von hier. Weicht das Pegel-Blatt der Lehrkraft ab, gilt das Blatt: nur hier tauschen.
//   id       fester Schlüssel im Spielstand (nie ändern, nur name/kurz dürfen wechseln)
//   name     wie auf dem Blatt aus dem Kurs
//   kurz     ein kurzer Satz für schwache Leser (≤ 5 Wörter)
//   schritt  eine kleine Schritt-Karte für den Spiegel (≤ 5 Wörter, machbar, heute)
//   icon     Symbol aus ui/icons.js · color  Farbe des Glases (Füllung)
export default {
  id: 'beduerfnisse',
  liste: [
    { id: 'dazugehoeren', name: 'Dazugehören', kurz: 'Ich gehöre dazu.', schritt: 'Jemanden fragen, ob er mitkommt.', icon: 'team', color: '#ffc23d' },
    { id: 'ruhe', name: 'Ruhe und Erholung', kurz: 'Mal abschalten können.', schritt: 'Zehn Minuten nur für mich.', icon: 'ruhe', color: '#3fd9c4' },
    { id: 'anerkennung', name: 'Anerkennung', kurz: 'Jemand sieht, was ich kann.', schritt: 'Einem anderen etwas Gutes sagen.', icon: 'stern', color: '#ff5d8f' },
    { id: 'bewegung', name: 'Bewegung', kurz: 'Mich austoben können.', schritt: 'Eine Runde draußen gehen.', icon: 'sprint', color: '#ff8a3d' },
    { id: 'schlaf', name: 'Schlaf', kurz: 'Genug schlafen.', schritt: 'Heute früher schlafen.', icon: 'mond', color: '#7f95ff' },
    { id: 'mitbestimmen', name: 'Mitbestimmen', kurz: 'Ich darf mitreden.', schritt: 'Etwas machen, das nur ich entscheide.', icon: 'kompass', color: '#a66bff' },
  ],
  // Gefäßformen je Figur (Blick-Stufe „Gläser“): Tun Blechdosen, Jolie Tintenfässer, Ilda Laternengläser
  formen: ['dose', 'tintenfass', 'laternenglas', 'glas'],
};

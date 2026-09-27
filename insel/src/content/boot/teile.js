// Teile der Kielpost (BAUPLAN §2.1 A4), gebaut an der Werft, jedes als sichtbares Mesh am Boot (actors/boot.js).
// Kürzungsliste Punkt 1: Farbe und Name kommen später. Kosten: alle drei Teile gehen mit 9 der 10 Funde
// (content/bergen/hafen.js, Unit-Test tests/unit/werft.test.mjs). Die Laterne braucht Ildas Plan (flags.boot.plan.laterne).
export default {
  id: 'teile',
  materialien: [
    { id: 'holz', name: 'Holz', color: '#c98a4b' },
    { id: 'tau', name: 'Tau', color: '#e8d6a8' },
    { id: 'tuch', name: 'Tuch', color: '#f4efe2' },
    { id: 'metall', name: 'Metall', color: '#9fb3c8' },
  ],
  teile: [
    { id: 'laterne', name: 'Laterne', icon: 'laterne', label: 'Licht gegen Nebel', kosten: { metall: 1, tuch: 1, tau: 1 }, plan: 'laterne',
      glimm: 'Licht. Jetzt der Nebel.' },
    { id: 'ausleger', name: 'Ausleger', icon: 'boot', label: 'Weniger Schaukeln', kosten: { holz: 3, tau: 1 },
      glimm: 'Ruhiger. Fast gemütlich.' },
    { id: 'segel', name: 'Segel', icon: 'segel', label: 'Schneller fahren', kosten: { tuch: 2, holz: 1, metall: 1 },
      glimm: 'Neues Segel. Los!' },
  ],
  // Glimm-Zeilen und kurze Hinweise rund ums Boot (≤ 6 Wörter für Glimm)
  zeilen: {
    nebel: { glimm: 'Zu dicht. Licht?' },
    nebelAuf: { glimm: 'Der Nebel geht!' },
    ersteFahrt: { glimm: 'Kisten treiben. Haken raus!' },
    bump: { glimm: 'Autsch. Nur Holz.' },
    fehlt: { label: 'Fehlt noch' },
    planFehlt: { label: 'Plan fehlt' },
  },
  // Ziel-Zeile ohne Auftrag (Reihenfolge = nächster Schritt)
  ziele: {
    einsteigen: { label: 'Zur Kielpost am Steg' },
    bergen: { label: 'Kisten bergen' },
    werft: { label: 'Zur Werft: Laterne bauen' },
    nebel: { label: 'Mit Licht in den Nebel' },
    wrack: { label: 'Wrack: Kisten bergen' },
    bauen: { label: 'Werft: Boot ausbauen' },
  },
};

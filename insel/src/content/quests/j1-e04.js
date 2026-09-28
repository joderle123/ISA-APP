// Quest j1-e04 „Leck im Nest“ (Mission QUELLE, konzept/WERKZEUG-QUESTS.md Nr. 1, BAUPLAN §2.1 C) – etwa 12–15 min.
// Kurs-Einheit „Das Glas der Bedürfnisse“: „wie wichtig“ und „wie voll“ unterscheiden, die größte Lücke finden.
// Der Satz dazu steht NUR auf der Rückseite des Aufnähers – im Spiel wird er nie gesagt, man findet ihn beim Spielen:
// Die Hängematte (kleines Glas) hilft Tun nicht, die Winde (hohes, leeres Glas) schon.
// Ablauf: Leck stopfen (Nest) → Ilda gibt den Blick „Gläser“ → Tun (Oberfläche: gekränkt) → Spuren im Nest (Falle
// Hängematte) → Blitz-Motor (Wunsch, man darf) → vor der Crew die Winde würdigen → Fotowand + Bild → Wasserwerk →
// Jolie (Leine halten) → Dachboden-Ecke + Jolie wählt die Route → Crew-Glas am Feuer (Abstimmung nächster Raum).
// Schritte im Nest laufen als 'auftrag' (systems/quelle/plugin.js spielt sie, fertig über flags.e04.*).
// Kurzfassung (3 min): Blick (Gläser) bei Ilda + Crew-Glas → Blick-Stufe und Aufnäher.
export default {
  id: 'j1-e04', module: 'j1-m1', title: 'Leck im Nest', region: 'hafen', estMinutes: 14,
  templates: ['auftrag', 'szene', 'pruefung'],
  kurzfassung: {
    minutes: 3, steps: ['blick', 'crewglas'], grants: [{ upgrade: 'blick.tanks' }],
    onComplete: [{ patch: 'j1-e04' }, { lichtsplitter: 1 }],
  },
  steps: [
    { id: 'leck', label: 'Wasser im Nest', template: 'auftrag', params: { flag: 'e04.leck', at: { site: 'bootshaus' }, room: 'nest', icon: 'tropfen' }, marker: true,
      onStart: [{ relapse: { patch: 'nest', to: 0.7 } }, { emotion: { npc: 'tun', primary: ['wut', 5], secondary: ['trauer', 6] } }, { glimm: 'Nasse Füße. Super.' }],
      hints: { glimm: ['Planken. Da an der Werkbank.'] } },
    { id: 'blick', label: 'Ilda am Steg', template: 'szene', params: { dialogue: 'e04-ilda-blick', at: { site: 'hafen.steg' } }, marker: true },
    { id: 'tun', label: 'Tun neben dem Nest', template: 'szene', params: { dialogue: 'e04-tun', at: { site: 'hafen.nest' } }, marker: true,
      hints: { glimm: ['Blick. Länger hinschauen.'] } },
    { id: 'spuren', label: 'Spuren im Nest', template: 'auftrag', params: { flag: 'e04.spuren', at: { site: 'bootshaus' }, room: 'nest', icon: 'lupe' }, marker: true,
      onStart: [{ glimm: 'Drinnen. Drei Spuren.' }], hints: { glimm: ['Hängematte. Winde. Tür.'] } },
    { id: 'motor', label: 'Tun will einen Motor', template: 'szene', params: { dialogue: 'e04-blitzmotor', at: { site: 'hafen.nest' } }, marker: true },
    { id: 'winde', label: 'Vor der Crew reden', template: 'szene', params: { dialogue: 'e04-winde', at: { site: 'hafen.dorfplatz' } }, marker: true,
      hints: { glimm: ['Blick. Welche Dose leuchtet?'] } },
    { id: 'fotowand', label: 'Fotowand bauen', template: 'auftrag', params: { flag: 'e04.fotowand', at: { site: 'bootshaus' }, room: 'nest', icon: 'bild' }, marker: true },
    { id: 'wasserwerk', label: 'Das Wasserwerk', template: 'pruefung', params: { minigame: 'e04-tank-leitungen', at: { site: 'hafen.nest' } }, marker: true,
      onStart: [{ glimm: 'Sechs Tanks. Zu wenig Regen.' }] },
    { id: 'jolie', label: 'Jolie hinter dem Nest', template: 'szene', params: { dialogue: 'e04-jolie', at: { site: 'hafen.nest' } }, marker: true },
    { id: 'dachboden', label: 'Jolies Ecke bauen', template: 'auftrag', params: { flag: 'e04.dachboden', at: { site: 'bootshaus' }, room: 'nest', icon: 'karte' }, marker: true,
      hints: { glimm: ['Erst bauen. Dann die Karte.'] } },
    { id: 'crewglas', label: 'Crew-Glas am Feuer', template: 'szene', params: { dialogue: 'e04-crewglas', at: { site: 'hafen.feuerPlatz' } }, marker: true },
  ],
  onComplete: [
    { patch: 'j1-e04' }, { lichtsplitter: 3 }, { bond: ['tun', 1] }, { bond: ['jolie', 1] },
    { emotion: { npc: 'tun', primary: ['freude', 6] } }, { flag: 'nest.crew', set: true },
  ],
  glimm: 'Volle Gläser? Nie alle. Okay.',
  patch: { name: 'Bedürfnis-Pegel', icon: 'glas', color: '#ff5d8f', back: 'Wichtig und leer = größte Lücke.' },
  echteWelt: 'Welches Glas füllen bei dir Leute, nicht Dinge?',
  debrief: ['Warum hat die Hängematte Tun nicht geholfen?', 'Was wollte Tun, und was hat er gebraucht?'],
  kursziele: ['„Wie wichtig“ von „wie voll“ unterscheiden', 'Die größte Lücke finden (wichtig und leer)', 'Gereizt sein kommt oft von einem leeren Glas', 'Wunsch und Bedürfnis unterscheiden', 'Einen kleinen machbaren Schritt wählen'],
  // Nur fürs Lehrerheft (tools/postbuild/lehrerheft.mjs): Spielbegriffe mit Bild, Hinweis für die Lehrkraft
  lehrerheft: {
    wortliste: [
      { wort: 'Glas / Dose / Tintenfass', bild: 'glas', heisst: 'ein Bedürfnis einer Figur (die sechs Namen aus dem Kurs)' },
      { wort: 'hoch', bild: 'pfeilhoch', heisst: 'wie wichtig das Bedürfnis für die Figur ist' },
      { wort: 'voll', bild: 'tropfen', heisst: 'wie gut es gerade erfüllt ist' },
      { wort: 'größte Lücke', bild: 'stern', heisst: 'wichtig und leer: das Glas leuchtet' },
      { wort: 'Blick (Gläser)', bild: 'blick', heisst: 'Kraft-Knopf: erst die Folge, beim Hinschauen die Gefäße' },
      { wort: 'Folge', bild: 'seil', heisst: 'was man in der Welt sieht (Winde klemmt, Karte leer)' },
      { wort: 'Riss', bild: 'blitz', heisst: 'Blitz-Motor: Wunsch füllt kurz, läuft bis zur nächsten Sitzung aus' },
      { wort: 'Nest', bild: 'anker', heisst: 'das Bootshaus der Crew mit Fotowand und Dachboden-Ecke' },
      { wort: 'Crew-Glas', bild: 'muschel', heisst: 'Muscheln ohne Namen: was wir alle brauchen' },
      { wort: 'Leine halten', bild: 'seil', heisst: 'Gesprächs-Minispiel: bleiben, nicht plappern' },
      { wort: 'Unter der Oberfläche', bild: 'augen', heisst: 'Gesprächs-Minispiel: das feine Gefühl unter dem Witz' },
    ],
    hinweis: 'Eine eingelöste Quest heißt nicht, dass das Thema behandelt ist.',
    spiegel: 'Der Spiegel im Baumhaus ist freiwillig und privat. Er bleibt aus, bis die Datenschutz-Freigabe da ist.',
  },
  shard: null, linesAndVeils: false,
};

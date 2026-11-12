// Szene e04-blitzmotor (QUELLE Schritt 5, die Falle „Wunsch statt Bedürfnis“): Tun will einen Außenborder wie die
// Krater-Crew. Er gibt dir den Plan (flags.boot.plan.blitzmotor) – an der Werft darf man ihn bauen, für viel Material.
// Dann schießt Tuns Glas hoch, bekommt einen Riss und läuft bis zur nächsten Sitzung aus (systems/nest). Keine Strafe.
export default {
  id: 'e04-blitzmotor', unit: 'j1-e04', cast: ['tun'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: { speaker: 'tun', say: 'Die Krater-Crew hat einen Blitz-Motor. Brumm! Alle gucken.', anim: 'cheer', goto: 'b' },
    b: {
      speaker: 'tun', say: 'Bau mir so einen! Dann sieht mich jeder.', anim: 'cheer',
      effects: [{ flag: 'boot.plan.blitzmotor', set: true }],
      choices: [
        { say: 'Okay. An der Werkbank.', icon: 'hammer', goto: 'c1' },
        { say: 'Vielleicht später.', icon: 'uhr', goto: 'c2' },
        { say: 'Wozu brauchst du den?', icon: 'frage', goto: 'c3' },
      ],
    },
    c1: { speaker: 'tun', say: 'Echt? Du bist der Beste.', anim: 'cheer', goto: 'd' },
    c2: { speaker: 'tun', say: 'Später heißt nie. Kenn ich.', anim: 'sad', goto: 'd' },
    c3: { speaker: 'tun', say: 'Damit … halt. Motor eben.', anim: 'idle', goto: 'd' },
    d: { speaker: 'erzaehler', say: 'Tun drückt dir einen Plan in die Hand.', end: true },
  },
};

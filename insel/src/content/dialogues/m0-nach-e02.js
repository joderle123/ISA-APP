// Story-Beat nach j1-e02 (am Morgen nach dem Lagerfeuer, Hafen-Plugin): Jolie zeigt dir ihr Heft – etwas Privates.
// Drei Anfänge je nach Wahl 2 (m0.ilda), Folgen von Wahl 1 (m0.jolie) und Wahl 3 (m0.plakat), docs/STORY.md §6.
// Spuren (§8): du auf dem Boot mit dem Handy · die rausgerissene Seite · Kratzer am Turmschloss.
export default {
  id: 'm0-nach-e02', cast: ['jolie'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: {
      branch: [{ when: { flag: ['m0.ilda', '==', 'gesagt'] }, goto: 'g0' }, { when: { flag: ['m0.ilda', '==', 'fragselbst'] }, goto: 'f0' }],
      speaker: 'erzaehler', say: 'Morgen. Jolie wartet unten am Baumhaus. Mit einem Heft.', goto: 'b',
    },
    b: {
      branch: [{ when: { all: [{ flag: ['m0.jolie', '==', 'versprochen'] }, { flag: ['m0.ilda', '==', 'ausgewichen'] }] }, goto: 'b1' }],
      speaker: 'jolie', say: 'Hi. Ich … wollte dir was zeigen.', anim: 'wave', goto: 'c',
    },
    b1: { speaker: 'jolie', say: 'Ilda war nicht bei mir. Also hast du dichtgehalten.', anim: 'think', goto: 'b1b' },
    b1b: { speaker: 'jolie', say: '…', anim: 'idle', goto: 'c' },
    g0: {
      branch: [{ when: { flag: ['m0.jolie', '==', 'versprochen'] }, goto: 'g0v' }, { when: { flag: ['m0.jolie', '==', 'offen'] }, goto: 'g0o' }],
      speaker: 'erzaehler', say: 'Morgen. Jolie wartet unten. Schaut dich nicht an.', goto: 'g1',
    },
    // Preis von Wahl 1: gebrochenes Versprechen oder ehrliches „kann ich nicht versprechen“ – nur der Ton unterscheidet sich.
    g0v: { speaker: 'jolie', say: 'Du hattest es versprochen.', anim: 'sad', goto: 'g1' },
    g0o: { speaker: 'jolie', say: 'Du hast ja nichts versprochen. Stimmt.', anim: 'idle', goto: 'g1' },
    g1: {
      speaker: 'jolie', say: 'Ilda war bei mir. Du hast es ihr gesagt.', anim: 'sad',
      choices: [
        { say: 'Ja. Tut mir leid.', icon: 'herz', goto: 'g3' },
        { say: 'Sie hat es geahnt.', icon: 'frage', goto: 'g3' },
        { sign: 'nicken', label: 'Nicken', goto: 'g3' },
      ],
    },
    g3: { speaker: 'jolie', say: 'Sie hat gefragt. Zum ersten Mal.', anim: 'think', goto: 'g4' },
    g4: { speaker: 'jolie', say: 'Weiß noch nicht, ob ich sauer bin.', anim: 'idle', goto: 'c' },
    f0: { speaker: 'erzaehler', say: 'Morgen. Jolie wartet unten am Baumhaus. Mit einem Heft.', goto: 'f1' },
    f1: {
      speaker: 'jolie', say: 'Ilda war gestern bei mir. Einfach so. Warst du das?', anim: 'think',
      choices: [
        { say: 'Ich hab gesagt: Frag sie selbst.', icon: 'frage', goto: 'f2' },
        { say: 'Nein.', icon: 'x', goto: 'f2' },
      ],
    },
    f2: { speaker: 'jolie', say: '… Hat sie echt gemacht. Komisch.', anim: 'idle', goto: 'c' },
    c: { speaker: 'erzaehler', say: 'Sie hält dir das Heft hin. Zieht es fast zurück.', goto: 'd' },
    d: {
      speaker: 'erzaehler', say: 'Seite drei: du, auf dem Boot. Den Daumen überm Handy.',
      choices: [
        { say: 'Du hast mich gezeichnet?', icon: 'bild', goto: 'd1' },
        { say: 'War nichts Wichtiges.', icon: 'x', goto: 'd2' },
        { sign: 'schulterzucken', label: 'Schulterzucken', goto: 'd3' },
      ],
    },
    d1: { speaker: 'jolie', say: 'Du hast stillgehalten. Das mögen Stifte.', anim: 'cheer', goto: 'e' },
    d2: { speaker: 'jolie', say: 'Sah aber schwer aus.', anim: 'think', goto: 'e' },
    d3: { speaker: 'jolie', say: 'Musst nichts sagen. Ich auch nicht.', anim: 'idle', goto: 'e' },
    e: {
      speaker: 'erzaehler', say: 'Die letzte Seite ist rausgerissen. Nur der Rand ist noch da.',
      choices: [
        { say: 'Was war da drauf?', icon: 'frage', goto: 'e1' },
        { label: 'Nicht fragen', icon: 'ohr', goto: 'e2' },
      ],
    },
    e1: { speaker: 'jolie', say: 'Nichts. … Der Turm. In der Nacht.', anim: 'sad', goto: 'h' },
    e2: { speaker: 'jolie', say: 'Du bist komisch. Im Guten.', anim: 'idle', goto: 'h' },
    h: { branch: [{ when: { flag: ['m0.plakat', '==', 'weg'] }, goto: 'h1' }], goto: 'i' },
    h1: { speaker: 'jolie', say: 'Jhemp. Vom Plakat. Hab ihn nachgezeichnet.', anim: 'think', goto: 'h2' },
    h2: { speaker: 'erzaehler', say: 'Ohne Spruch. Er lacht.', goto: 'i' },
    i: { speaker: 'erzaehler', say: 'Seite fünf: ein Türschloss. Voller Kratzer. Genau gezeichnet.', goto: 'i2' },
    i2: { speaker: 'jolie', say: 'Da hat jemand lange gebraucht.', anim: 'sad', goto: 'i3' },
    // Lebenszeichen (§19): Jhemp lebt in der Sturmhütte (M3) – ohne Namen, nur Rauch.
    i3: { speaker: 'erzaehler', say: 'Seite sechs: Rauch über den Klippen. Jeden Abend.', goto: 'k' },
    k: { speaker: 'jolie', say: 'Seite sieben: Tun. Mit Möwe auf dem Kopf.', anim: 'cheer', goto: 'k2' },
    k2: { speaker: 'jolie', say: 'Das sieht er nie. Nie.', anim: 'idle', end: true },
  },
};

// Story-Beat nach j1-e01 – die Nacht (docs/STORY.md §6 Wahl 2): Das Hafen-Plugin setzt dich um 22:30 ans Dorffeuer.
// Ilda an der Glut, der leere Stuhl, ihr zugeklebter Brief, ein abgebrochener Satz – dann fragt sie direkt nach Jolie.
// Flag m0.ilda = ausgewichen | fragselbst | gesagt. Keine Antwort ist richtig; jede kostet etwas (Folgen: m0-nach-e02, e03-kodex).
export default {
  id: 'm0-nach-e01', cast: ['ilda'], camera: 'talk', rewind: false, start: 'a',
  nodes: {
    a: { speaker: 'erzaehler', say: 'Später. Die anderen sind weg. Ilda sitzt noch an der Glut.', goto: 'b' },
    b: {
      speaker: 'ilda', say: 'Setz dich. Oder nicht. Wie du willst.', anim: 'idle',
      choices: [
        { sign: 'sitzenNeben', label: 'Dazusetzen', goto: 'c' },
        { say: 'Kannst du nicht schlafen?', icon: 'mond', goto: 'c2' },
      ],
    },
    c: { speaker: 'erzaehler', say: 'Neben ihr steht der leere Stuhl. Ilda schaut nicht hin.', goto: 'd' },
    c2: { speaker: 'ilda', say: 'Schlafen. Hm. Schon lange nicht mehr.', anim: 'think', goto: 'd' },
    d: { speaker: 'ilda', say: 'Du schaust dauernd aufs Handy. Hier kommt nichts an.', anim: 'idle', goto: 'e' },
    e: {
      speaker: 'ilda', say: 'Wer mit dem letzten Boot kommt, lässt was zurück.', anim: 'think',
      choices: [
        { say: 'Kann sein.', icon: 'hand', goto: 'f' },
        { sign: 'schulterzucken', label: 'Schulterzucken', goto: 'f' },
        { sign: 'kopfschuetteln', label: 'Kopfschütteln', goto: 'f' },
      ],
    },
    f: { speaker: 'erzaehler', say: 'Sie nickt nur. In ihrer Hand ein Brief. Zugeklebt.', goto: 'g' },
    g: {
      speaker: 'ilda', say: 'Ende der Saison mach ich …', anim: 'sad',
      choices: [
        { say: 'Den Hafen zu?', icon: 'anker', goto: 'g1' },
        { label: 'Schweigen', icon: 'ohr', goto: 'g2' },
      ],
    },
    g1: { speaker: 'ilda', say: 'Hab ich das gesagt? Hab ich nicht.', anim: 'idle', goto: 'h' },
    g2: { speaker: 'ilda', say: 'Gut, dass du nicht fragst.', anim: 'idle', goto: 'h' },
    h: { speaker: 'ilda', say: 'Die Kleine vom Ufer. Jolie.', anim: 'think', goto: 'i' },
    i: {
      speaker: 'ilda', say: 'Die war am Turm. In der Nacht. Oder?', anim: 'think',
      choices: [
        { say: 'Weiß ich nicht.', icon: 'x', effects: [{ flag: 'm0.ilda', set: 'ausgewichen' }], goto: 'i1' },
        { say: 'Frag sie selbst.', icon: 'frage', effects: [{ flag: 'm0.ilda', set: 'fragselbst' }], goto: 'i2' },
        { say: 'Ja. War sie.', icon: 'check', effects: [{ flag: 'm0.ilda', set: 'gesagt' }], goto: 'i3' },
      ],
    },
    i1: { speaker: 'ilda', say: 'Hm.', anim: 'idle', goto: 'i1b' },
    i1b: { speaker: 'ilda', say: 'Du lügst schlecht. Ist kein Vorwurf.', anim: 'idle', goto: 'j' },
    i2: { speaker: 'ilda', say: '…', anim: 'sad', goto: 'i2b' },
    i2b: { speaker: 'ilda', say: 'Selbst fragen. … Ja. Das wär mal was.', anim: 'sad', goto: 'j' },
    i3: { speaker: 'ilda', say: 'Danke.', anim: 'sad', goto: 'i3b' },
    i3b: { branch: [{ when: { flag: ['m0.jolie', '==', 'versprochen'] }, goto: 'i3v' }], speaker: 'erzaehler', say: 'Sie schaut lange ins Feuer.', goto: 'j' },
    i3v: { speaker: 'glimm', say: 'Und das Versprechen?', goto: 'j' },
    j: { speaker: 'ilda', say: 'Geh schlafen. Die Möwen kommen früh.', anim: 'idle', goto: 'k' },
    k: { speaker: 'erzaehler', say: 'Du schläfst am Feuer ein. Der Stuhl bleibt leer.', end: true },
  },
};

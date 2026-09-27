// Kostprobe (BAUPLAN §2.1 A4): Ilda erwischt dich beim ersten Ablegen am Steg (systems/kielpost). Ihre Regel seit der
// Sturmnacht: „Keiner fährt mehr raus.“ Sie verbietet nichts – sie hat Angst, und man sieht es (Blick weg, Pause).
// Sie gibt ihre alte Laterne (Bauplan für das Teil „Laterne“, flags.boot.plan.laterne). Stimme Ilda: knapp, trocken.
export default {
  id: 'boot-ilda-laterne', cast: ['ilda'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: {
      speaker: 'ilda', say: 'Halt. Wohin willst du damit?', anim: 'angry',
      choices: [
        { say: 'Nur kurz raus.', icon: 'boot', goto: 'a1' },
        { say: 'Zu den Kisten da draußen.', icon: 'karte', goto: 'a1' },
        { sign: 'schulterzucken', label: 'Schulterzucken', goto: 'a1' },
      ],
    },
    a1: { speaker: 'ilda', say: 'Keiner fährt mehr raus. Seit dem Sturm.', anim: 'sad', goto: 'b' },
    b: {
      speaker: 'erzaehler', say: 'Ilda schaut aufs Wasser. Lange.',
      choices: [
        { say: 'Ich pass auf.', icon: 'check', goto: 'c' },
        { say: 'Was ist da draußen?', icon: 'frage', tone: 'ruhig', goto: 'c2' },
        { label: 'Warten', icon: 'ohr', goto: 'c' },
      ],
    },
    c: { speaker: 'ilda', say: 'Du fährst trotzdem. Seh ich dir an.', anim: 'idle', goto: 'd' },
    c2: { speaker: 'ilda', say: 'Nebel. Dicht. Da sieht man nichts.', anim: 'sad', goto: 'c' },
    d: { speaker: 'ilda', say: 'Eine Fahrt. Ohne Mist.', anim: 'talk', goto: 'e' },
    e: { speaker: 'erzaehler', say: 'Sie holt eine alte Laterne. Verbeult. Das Glas ist blind.', goto: 'f' },
    f: { speaker: 'ilda', say: 'Nimm die. War meine.', anim: 'idle', effects: [{ flag: 'boot.plan.laterne', set: true }], goto: 'g' },
    g: { speaker: 'glimm', say: 'Kaputt. Aber Werft!', goto: 'h' },
    h: { speaker: 'ilda', say: 'Flick sie an der Werft. Dann leuchtet sie.', anim: 'idle', end: true, effects: [{ deed: 'ilda-laterne' }] },
  },
};

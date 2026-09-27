// Szene e02-nachfragen (DESIGN §12 e02): eine Frage bringt nur eine flache Antwort. Erst „Und dann?“ verrät ein
// harmloses Detail – und zwischen Tun und Jolie erscheint der erste Faden.
// Story: Tun hat „letzten Sommer“ mit dem Filmen aufgehört (Saat für das Video, Splitter 8) · Jolie traut sich einen Satz.
export default {
  id: 'e02-nachfragen', unit: 'j1-e02', cast: ['tun', 'jolie'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: {
      speaker: 'tun', say: 'Heute ist Laternenfest! Frag mich was. Irgendwas.', anim: 'cheer',
      choices: [
        { say: 'Was machst du gern?', icon: 'frage', goto: 'b' },
        { say: 'Was filmst du so?', icon: 'kamera', goto: 'b' },
      ],
    },
    b: {
      speaker: 'tun', say: 'Ach, so Zeug halt.', anim: 'idle',
      choices: [
        { say: 'Und dann?', icon: 'frage', tone: 'ruhig', goto: 'c' },
        { say: 'Okay.', icon: 'check', goto: 'b2' },
      ],
    },
    b2: { speaker: 'glimm', say: 'Flach. Frag nochmal nach.', goto: 'b' },
    c: { speaker: 'tun', say: 'Möwen. Ich filme Möwen. Die sind komplett irre.', anim: 'talk', goto: 'c2' },
    c2: { speaker: 'tun', say: 'Also … hab ich. Bis letzten Sommer. Egal.', anim: 'sad', goto: 'd' },
    d: { speaker: 'jolie', say: 'Ich … zeichne Möwen.', anim: 'think', effects: [{ upgrade: 'blick.faeden' }], goto: 'e' },
    e: { speaker: 'glimm', say: 'Ein Faden. Zwischen den beiden.', goto: 'f' },
    f: { speaker: 'tun', say: 'Echt jetzt? Zeig mal!', anim: 'cheer', effects: [{ deed: 'tun-nachgefragt' }], goto: 'f2' },
    f2: { speaker: 'jolie', say: 'Später. Vielleicht.', anim: 'idle', goto: 'g' },
    g: { speaker: 'tun', say: 'Holst du Funken fürs Fest? Vom Feuer da drüben.', anim: 'idle', end: true },
  },
};

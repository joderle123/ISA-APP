// Szene e02-nachfragen (DESIGN §12 e02): eine Frage bringt nur eine flache Antwort. Erst „Und dann?“ verrät ein
// harmloses Detail – und zwischen Tun und Jolie erscheint der erste Faden.
// Story (docs/STORY.md §6 Wahl 3, §8): das alte Festplakat mit Mikas Spruch (m0.plakat = weg | bleibt | umgedreht) ·
// Tun hat „letzten Sommer“ aufgehört zu filmen, schiebt es auf den Akku – an der Kamera leuchtet ein Lämpchen (die Farbe erst in e03).
// Kostprobe B2: Beim Akku-Witz (h1) kann man „Genau hinsehen“ – Minispiel „Unter der Oberfläche“
// (minigames/e02-oberflaeche-tun.js): unter dem Haha liegt traurig. Klappt es noch nicht: Glimm „Später.“, Wahl erneut.
export default {
  id: 'e02-nachfragen', unit: 'j1-e02', cast: ['tun', 'jolie'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: { speaker: 'erzaehler', say: 'Das alte Festplakat. Ein alter Mann. Quer drüber: WER REDET, VERLIERT.', goto: 'b' },
    b: {
      speaker: 'tun', say: 'Das muss weg. Heute ist Fest. Ist einfach hässlich.', anim: 'angry',
      choices: [
        { say: 'Abreißen.', icon: 'x', effects: [{ flag: 'm0.plakat', set: 'weg' }], goto: 'b1' },
        { say: 'Hängen lassen.', icon: 'hand', effects: [{ flag: 'm0.plakat', set: 'bleibt' }], goto: 'b2' },
        { say: 'Umdrehen.', icon: 'drehen', effects: [{ flag: 'm0.plakat', set: 'umgedreht' }], goto: 'b3' },
      ],
    },
    b1: { speaker: 'erzaehler', say: 'Der Spruch reißt nur mit dem Gesicht ab.', goto: 'b1b' },
    b1b: { speaker: 'jolie', say: 'Da war Jhemp drauf. Lachend.', anim: 'sad', goto: 'b1c' },
    b1c: { speaker: 'tun', say: '… Danke trotzdem.', anim: 'sad', goto: 'd' },
    b2: { speaker: 'tun', say: 'Klar. Ist ja nur Papier. Haha.', anim: 'cheer', goto: 'b2b' },
    b2b: { speaker: 'glimm', say: 'Zu lautes Haha.', goto: 'd' },
    b3: { speaker: 'tun', say: 'Perfekt. Weg ist weg.', anim: 'cheer', goto: 'b3b' },
    b3b: { speaker: 'glimm', say: 'Umdrehen. Sehr inseltypisch.', goto: 'd' },
    d: { speaker: 'tun', say: 'Die vom Vulkan. Mika. Denen widerspricht man nicht.', anim: 'idle', goto: 'e' },
    e: {
      speaker: 'tun', say: 'Egal! Laternenfest! Frag mich was. Irgendwas.', anim: 'cheer',
      choices: [
        { say: 'Was machst du gern?', icon: 'frage', goto: 'f' },
        { say: 'Was filmst du so?', icon: 'kamera', goto: 'f' },
      ],
    },
    f: {
      speaker: 'tun', say: 'Ach, so Zeug halt.', anim: 'idle',
      choices: [
        { say: 'Und dann?', icon: 'frage', tone: 'ruhig', goto: 'g' },
        { say: 'Okay.', icon: 'check', goto: 'f2' },
      ],
    },
    f2: { speaker: 'tun', say: 'Was? Mehr gibt’s nicht.', anim: 'idle', goto: 'f' },
    g: { speaker: 'tun', say: 'Möwen. Ich filme Möwen. Die sind komplett irre.', anim: 'talk', goto: 'h' },
    h: {
      speaker: 'tun', say: 'Also … hab ich. Bis letzten Sommer.', anim: 'sad',
      choices: [
        { say: 'Und dann?', icon: 'frage', tone: 'ruhig', goto: 'h1' },
        { sign: 'nicken', label: 'Nicken', goto: 'i' },
      ],
    },
    h1: {
      speaker: 'tun', say: 'Akku kaputt. Seitdem. Blöd, oder? Haha.', anim: 'cheer',
      choices: [
        { label: 'Genau hinsehen', icon: 'blick', minigame: 'e02-oberflaeche-tun', goto: 'h1a', gotoFail: 'h1s' },
        { sign: 'nicken', label: 'Nicken', goto: 'h2' },
      ],
    },
    h1a: { speaker: 'tun', say: '… Ja. Ist eigentlich nicht lustig.', anim: 'sad', goto: 'h2' },
    h1s: { speaker: 'glimm', say: 'Später. Er lacht noch.', goto: 'h1' },
    h2: { speaker: 'erzaehler', say: 'An der Kamera leuchtet ein kleines Lämpchen.', goto: 'i' },
    i: { speaker: 'jolie', say: 'Ich … zeichne Möwen.', anim: 'think', effects: [{ upgrade: 'blick.faeden' }], goto: 'j' },
    j: { speaker: 'glimm', say: 'Hm. Die zwei. Interessant.', goto: 'k' },
    k: { speaker: 'tun', say: 'Echt jetzt? Zeig mal!', anim: 'cheer', effects: [{ deed: 'tun-nachgefragt' }], goto: 'l' },
    l: { speaker: 'jolie', say: 'Dir? Nee.', anim: 'idle', goto: 'l2' },
    l2: { speaker: 'tun', say: 'Autsch. Verdient, aber autsch.', anim: 'sad', goto: 'm' },
    m: { speaker: 'tun', say: 'Holst du Funken fürs Fest? Vom Feuer da drüben.', anim: 'idle', end: true },
  },
};

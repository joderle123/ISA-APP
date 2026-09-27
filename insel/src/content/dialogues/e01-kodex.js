// Szene e01-kodex (DESIGN §12 e01): am dunklen Feuer schlägt Tun „Keine Regeln!“ vor. Du handelst mit Kacheln Regeln aus,
// die alle unterschreiben. Jede Regel zündet ein Feuer. Demo-Fassung: drei Runden statt vier Feuer.
// Story (docs/STORY.md §7/§8): Tuns Witz verrät die unausgesprochene Insel-Regel · der leere Stuhl am vierten Feuer
// („besetzt“ – Jhemp, ohne Namen) · Tun und Jolie: „Mit mir schon gar nicht.“
export default {
  id: 'e01-kodex', unit: 'j1-e01', cast: ['tun', 'ilda'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: {
      speaker: 'tun', say: 'Keine Regeln! Die Möwe hält sich auch an keine.', anim: 'cheer',
      choices: [
        { say: 'Eine Regel. Nur eine.', icon: 'hand', tone: 'ruhig', goto: 'b' },
        { say: 'Was stört dich an Regeln?', icon: 'frage', tone: 'ruhig', goto: 'a2' },
        { sign: 'nicken', label: 'Nicken', goto: 'a3' },
      ],
    },
    a2: { speaker: 'tun', say: 'Die macht immer wer anders. Und dann gegen mich.', anim: 'sad', goto: 'b' },
    a3: { speaker: 'ilda', say: 'Tun. Ohne Regeln bleiben die Feuer kalt.', anim: 'idle', goto: 'b' },
    b: {
      speaker: 'ilda', say: 'Vier Feuer, vier Regeln. Wer fängt an?', anim: 'talk',
      choices: [
        { say: 'Niemand wird ausgelacht.', icon: 'herz', effects: [{ flag: 'kodex.lachen', set: true }], goto: 'c' },
        { say: 'Wer Stopp sagt, wird gehört.', icon: 'stopp', effects: [{ flag: 'kodex.stopp', set: true }], goto: 'c' },
        { say: 'Jeder darf Fehler machen.', icon: 'check', effects: [{ flag: 'kodex.fehler', set: true }], goto: 'c' },
      ],
    },
    c: {
      speaker: 'tun', say: 'Okay, die geht. Und wenn ich vom Steg falle?', anim: 'think',
      choices: [
        { say: 'Dann lacht keiner. Regel.', icon: 'herz', goto: 'd' },
        { say: 'Dann helfen wir dir hoch.', icon: 'team', goto: 'd' },
      ],
    },
    d: { speaker: 'ilda', say: 'Unterschrieben. Das erste Feuer brennt.', anim: 'talk', effects: [{ deed: 'kodex-regel' }, { sound: 'chime' }], goto: 'e' },
    e: {
      speaker: 'tun', say: 'Meine: Alle dürfen mitmachen. Auch Möwen.', anim: 'cheer',
      choices: [
        { say: 'Nehmen wir.', icon: 'check', goto: 'f' },
        { say: 'Auch die, die nicht wollen?', icon: 'frage', goto: 'e2' },
      ],
    },
    e2: { speaker: 'tun', say: 'Die dürfen zuschauen. Ohne Spott.', anim: 'idle', goto: 'f' },
    f: {
      speaker: 'tun', say: 'Und noch eine: Über den Turm redet keiner.', anim: 'cheer', effects: [{ bond: ['tun', 1] }],
      choices: [
        { say: 'Die gilt doch schon.', icon: 'laterne', goto: 'f1' },
        { sign: 'lachen', label: 'Mitlachen', goto: 'f2' },
        { say: 'Warum nicht?', icon: 'frage', goto: 'f3' },
      ],
    },
    f1: { speaker: 'tun', say: '…', anim: 'sad', goto: 'f1b' },
    f1b: { speaker: 'ilda', say: 'Tun.', anim: 'idle', goto: 'g' },
    f2: { speaker: 'tun', say: 'Siehst du? Die ist gut. Die ist richtig gut.', anim: 'cheer', goto: 'f1b' },
    f3: { speaker: 'tun', say: 'War ein Witz. Möwen-Witz. Lacht doch mal.', anim: 'angry', goto: 'f1b' },
    g: {
      speaker: 'erzaehler', say: 'Am vierten Feuer steht ein alter Stuhl. Keiner setzt sich.',
      choices: [
        { say: 'Wessen Stuhl ist das?', icon: 'frage', goto: 'g1' },
        { sign: 'sitzenNeben', label: 'Draufsetzen', goto: 'g2' },
        { say: 'Wer fehlt noch?', icon: 'team', goto: 'h' },
      ],
    },
    g1: { speaker: 'ilda', say: 'Setz dich woanders hin. Bitte.', anim: 'sad', goto: 'h' },
    g2: { speaker: 'tun', say: 'Nicht da! … Der ist besetzt.', anim: 'angry', goto: 'g2b' },
    g2b: { speaker: 'glimm', say: 'Besetzt. Von niemandem.', goto: 'h' },
    h: { speaker: 'ilda', say: 'Drei Feuer. Für das vierte fehlt wer.', anim: 'talk', goto: 'i' },
    i: { speaker: 'ilda', say: 'Unten am Ufer sitzt jemand. Ganz grau.', anim: 'think', goto: 'j' },
    j: { speaker: 'tun', say: 'Jolie. Redet mit keinem.', anim: 'idle', goto: 'k' },
    k: { speaker: 'tun', say: 'Mit mir schon gar nicht.', anim: 'sad', end: true },
  },
};

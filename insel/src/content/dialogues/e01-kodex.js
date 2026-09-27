// Szene e01-kodex (DESIGN §12 e01): am dunklen Feuer schlägt Tun „Keine Regeln!“ vor. Du handelst mit Kacheln Regeln aus,
// die alle unterschreiben. Jede Regel zündet ein Feuer. Demo-Fassung: drei Runden statt vier Feuer.
// Story: Tun vom „Keine Regeln“-Clown zum ersten Regel-Vorschlag · Ilda weicht beim Turm aus · Hinweis auf Jolie.
export default {
  id: 'e01-kodex', unit: 'j1-e01', cast: ['tun', 'ilda'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: {
      speaker: 'tun', say: 'Keine Regeln! Die Möwe hält sich auch an keine.', anim: 'angry',
      choices: [
        { say: 'Eine Regel. Nur eine.', icon: 'hand', tone: 'ruhig', goto: 'b' },
        { say: 'Was stört dich an Regeln?', icon: 'frage', tone: 'ruhig', goto: 'a2' },
        { sign: 'nicken', label: 'Nicken', goto: 'a3' },
      ],
    },
    a2: { speaker: 'tun', say: 'Die macht immer jemand anders. Und dann gegen mich.', anim: 'sad', goto: 'b' },
    a3: { speaker: 'ilda', say: 'Ohne Regeln bleiben die Feuer kalt. Versucht es.', anim: 'idle', goto: 'b' },
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
      speaker: 'tun', say: 'Dann eine von mir: Alle dürfen mitmachen. Auch Möwen.', anim: 'cheer',
      choices: [
        { say: 'Nehmen wir.', icon: 'check', goto: 'f' },
        { say: 'Und wer nicht will?', icon: 'frage', goto: 'e2' },
      ],
    },
    e2: { speaker: 'tun', say: 'Darf zuschauen. Ohne Spott.', anim: 'idle', goto: 'f' },
    f: {
      speaker: 'ilda', say: 'Drei Feuer brennen. Das vierte fehlt noch.', anim: 'talk', effects: [{ bond: ['tun', 1] }],
      choices: [
        { say: 'Wer fehlt denn noch?', icon: 'frage', goto: 'g' },
        { say: 'Und das Feuer im Turm?', icon: 'laterne', goto: 'f2' },
      ],
    },
    f2: { speaker: 'ilda', say: 'Das ist aus. Schon lange.', anim: 'sad', goto: 'g' },
    g: { speaker: 'ilda', say: 'Unten am Ufer sitzt jemand. Ganz grau.', anim: 'think', goto: 'h' },
    h: { speaker: 'tun', say: 'Jolie. Die redet nicht. Mit niemandem.', anim: 'idle', end: true },
  },
};

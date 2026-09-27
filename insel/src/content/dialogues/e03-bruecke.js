// Szene e03-bruecke (DESIGN §12 e03): die Brücke zum Strand ist kaputt. Jolie passt durch Spalten, Tun schiebt Kisten,
// Glimm leuchtet – das Siegel füllt sich nur, wenn alle beigetragen haben. Crew-Ruf kommt dazu.
// Story (docs/STORY.md §7): Jolie meldet sich von selbst, redet aber „nicht mit Tun“ · Tun hebt die Kamera und senkt sie.
export default {
  id: 'e03-bruecke', unit: 'j1-e03', cast: ['tun', 'jolie'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: {
      speaker: 'tun', say: 'Die Brücke zum Strand ist hin. Ich schaff das allein.', anim: 'angry',
      choices: [
        { say: 'Allein wird das nichts.', icon: 'team', tone: 'ruhig', goto: 'b' },
        { say: 'Versuch es.', icon: 'hand', goto: 'a2' },
      ],
    },
    a2: { speaker: 'tun', say: 'Hnng. Klemmt. Die Kiste hasst mich.', anim: 'angry', goto: 'b' },
    b: {
      speaker: 'jolie', say: 'Ich pass durch den Spalt. Wenn ihr wollt.', anim: 'think',
      choices: [
        { say: 'Jolie, geh du vor.', icon: 'check', effects: [{ deed: 'jolie-spalt' }], goto: 'c' },
        { say: 'Zu gefährlich.', icon: 'stopp', goto: 'b2' },
      ],
    },
    b2: {
      speaker: 'jolie', say: 'Ich schaff das. Wirklich.', anim: 'idle',
      choices: [{ say: 'Okay. Geh.', icon: 'check', effects: [{ deed: 'jolie-spalt' }], goto: 'c' }],
    },
    c: { speaker: 'tun', say: 'Seit wann redest du mit mir?', anim: 'think', goto: 'c2' },
    c2: {
      speaker: 'jolie', say: 'Tu ich nicht. Ich rede mit der Brücke.', anim: 'idle',
      choices: [
        { sign: 'lachen', label: 'Lachen', goto: 'd' },
        { sign: 'nicken', label: 'Nicken', goto: 'd' },
      ],
    },
    d: { speaker: 'glimm', say: 'Und ich leuchte. Gern geschehen.', effects: [{ deed: 'crew-bruecke' }, { sound: 'chime' }], goto: 'e' },
    e: {
      speaker: 'erzaehler', say: 'Siegel voll. Tun hebt die Kamera. Und senkt sie wieder.',
      choices: [
        { say: 'Warum filmst du nicht?', icon: 'kamera', goto: 'e1' },
        { label: 'Nichts sagen', icon: 'ohr', goto: 'e2' },
        { say: 'Film ruhig.', icon: 'check', goto: 'e3' },
      ],
    },
    e1: { speaker: 'tun', say: 'Akku. Hab ich doch gesagt.', anim: 'idle', goto: 'e1b' },
    e1b: { speaker: 'glimm', say: 'Lämpchen. Immer noch grün.', goto: 'f' },
    e2: { speaker: 'tun', say: 'Was guckst du so?', anim: 'angry', goto: 'f' },
    e3: { speaker: 'tun', say: 'Nee. Lieber nicht.', anim: 'sad', goto: 'f' },
    f: { speaker: 'tun', say: 'Weiter. Bevor die Brücke es sich anders überlegt.', anim: 'cheer', goto: 'g' },
    g: { speaker: 'jolie', say: 'Die Grotte dahinter ist dunkel. Führst du mich?', anim: 'think', end: true },
  },
};

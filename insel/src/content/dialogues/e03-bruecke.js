// Szene e03-bruecke (DESIGN §12 e03): die Brücke zum Strand ist kaputt. Jolie passt durch Spalten, Tun schiebt Kisten,
// Glimm leuchtet – das Siegel füllt sich nur, wenn alle beigetragen haben. Crew-Ruf kommt dazu.
// Story: Jolie meldet sich zum ersten Mal von selbst · Tun will filmen und lässt es (Saat für das Video).
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
    b2: { speaker: 'jolie', say: 'Ich schaff das. Wirklich.', anim: 'idle', goto: 'c' },
    c: { speaker: 'tun', say: 'Okay. Ich schieb die Kiste. Du hältst!', anim: 'talk', goto: 'd' },
    d: { speaker: 'glimm', say: 'Und ich leuchte. Gern geschehen.', goto: 'e' },
    e: { speaker: 'tun', say: 'Siegel voll. Alle drei. Krass.', anim: 'cheer', effects: [{ deed: 'crew-bruecke' }, { sound: 'chime' }], goto: 'e2' },
    e2: { speaker: 'tun', say: 'Das hätte ich gern gefilmt. … Nee. Lieber nicht.', anim: 'think', goto: 'f' },
    f: { speaker: 'jolie', say: 'Die Grotte dahinter ist dunkel. Führst du mich?', anim: 'think', end: true },
  },
};

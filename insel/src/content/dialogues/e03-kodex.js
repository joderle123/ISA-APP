// Szene e03-kodex (DESIGN §12 e03): die Crew ergänzt den Kodex um eine Zeile. Das vierte Feuer brennt, der Hafen wird bunt.
// Story: Jolie unterschreibt als Erste (von der Grauen zur Crew) · der Splitter zeigt zum Strand · Ilda nennt das
// Herzglas und schweigt dann · Tun verschwindet auffällig schnell (Rätsel, Auflösung M7).
export default {
  id: 'e03-kodex', unit: 'j1-e03', cast: ['ilda', 'jolie', 'tun'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: {
      speaker: 'ilda', say: 'Eine Zeile fehlt im Kodex. Eure.', anim: 'talk',
      choices: [
        { say: 'Jede Person zählt.', icon: 'team', effects: [{ flag: 'kodex.zeile', set: 'zaehlt' }], goto: 'b' },
        { say: 'Beim Führen gilt Stopp.', icon: 'stopp', effects: [{ flag: 'kodex.zeile', set: 'stopp' }], goto: 'b' },
        { say: 'Keiner geht allein ins Dunkel.', icon: 'laterne', effects: [{ flag: 'kodex.zeile', set: 'dunkel' }], goto: 'b' },
      ],
    },
    b: { speaker: 'jolie', say: 'Ja. Die. Ich unterschreib als Erste.', anim: 'cheer', goto: 'c' },
    c: { speaker: 'tun', say: 'Hey, ich wollte zuerst! … Okay. Feuer an!', anim: 'cheer', effects: [{ deed: 'kodex-zeile' }, { sound: 'chime' }],
      choices: [
        { say: 'Feuer an!', icon: 'laterne', goto: 'd' },
        { sign: 'nicken', label: 'Nicken', goto: 'd' },
      ],
    },
    d: { speaker: 'ilda', say: 'Vier Feuer. Ab heute seid ihr eine Crew.', anim: 'talk', goto: 'e' },
    e: {
      speaker: 'jolie', say: 'Der Splitter wird warm. Er zeigt zum Strand.', anim: 'think',
      choices: [
        { say: 'Was ist das für Glas?', icon: 'frage', goto: 'f' },
        { say: 'Zum Strand? Jetzt gleich?', icon: 'karte', goto: 'f2' },
      ],
    },
    f: { speaker: 'ilda', say: 'Herzglas. Die Linse aus dem Turm. Neun Splitter.', anim: 'sad', goto: 'g' },
    f2: { speaker: 'ilda', say: 'Nicht heute. Das ist Herzglas. Aus dem Turm.', anim: 'sad', goto: 'g' },
    g: { speaker: 'ilda', say: 'Mehr sag ich dazu heute nicht.', anim: 'idle', goto: 'h' },
    h: { speaker: 'tun', say: 'Ich muss … Möwen. Tschüss!', anim: 'idle', goto: 'i' },
    i: { speaker: 'glimm', say: 'Die wissen was. Beide.', end: true },
  },
};

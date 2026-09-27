// Szene e03-kodex (DESIGN §12 e03): die Crew ergänzt den Kodex um eine Zeile. Das vierte Feuer brennt, der Hafen wird bunt.
// Story (docs/STORY.md §5/§6): Jolie unterschreibt als Erste · Folge von Wahl 2 (m0.ilda): Ilda dankt Jolie – oder sagt
// dir leise, was dein Dichthalten sie kostet · Herzglas und Herbst: was auf dem Spiel steht · Tun flieht zu den „Möwen“.
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
    d: {
      branch: [
        { when: { flag: ['m0.ilda', '==', 'ausgewichen'] }, goto: 'd5' },
        { when: { any: [{ flag: ['m0.ilda', '==', 'gesagt'] }, { flag: ['m0.ilda', '==', 'fragselbst'] }] }, goto: 'd3' },
      ],
      speaker: 'ilda', say: 'Vier Feuer. Sieht nach Crew aus.', anim: 'talk', goto: 'e',
    },
    d3: { speaker: 'ilda', say: 'Vier Feuer. Und Jolie … danke. Fürs Aufheben.', anim: 'talk', goto: 'd4' },
    d4: { speaker: 'jolie', say: 'Hat ja keiner gefragt.', anim: 'idle', goto: 'd4b' },
    d4b: { speaker: 'ilda', say: 'Ich weiß.', anim: 'sad', goto: 'e' },
    d5: { speaker: 'ilda', say: 'Vier Feuer. Sieht nach Crew aus.', anim: 'talk', goto: 'd6' },
    d6: { speaker: 'ilda', say: 'Du hältst dicht. Gut für sie. Schlecht für mich.', anim: 'idle', goto: 'e' },
    e: {
      speaker: 'jolie', say: 'Der Splitter wird warm. Er zeigt zum Strand.', anim: 'think',
      choices: [
        { say: 'Was ist das für Glas?', icon: 'frage', goto: 'f' },
        { say: 'Zum Strand? Jetzt gleich?', icon: 'karte', goto: 'f2' },
      ],
    },
    f: { speaker: 'ilda', say: 'Herzglas. Die Linse aus dem Turm. Neun Splitter.', anim: 'sad', goto: 'g' },
    f2: { speaker: 'ilda', say: 'Nicht heute. Das ist Herzglas. Aus dem Turm.', anim: 'sad', goto: 'g' },
    g: { speaker: 'ilda', say: 'Ohne Licht läuft im Herbststurm keine Fähre ein.', anim: 'think', goto: 'g2' },
    g2: { speaker: 'ilda', say: 'Mehr sag ich dazu heute nicht.', anim: 'idle', goto: 'h' },
    h: { speaker: 'tun', say: 'Ich muss … Möwen. Tschüss!', anim: 'idle', goto: 'i' },
    i: { speaker: 'glimm', say: 'Möwen. Um diese Uhrzeit.', end: true },
  },
};

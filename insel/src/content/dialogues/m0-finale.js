// Story-Beat Demo-Ende nach j1-e03 (am Morgen nach dem Lagerfeuer, Hafen-Plugin): der Hafen leuchtet, der Splitter zieht
// zum Strand, Tun hat etwas gesehen. Cliffhanger auf M1 („Wer bin ich?“, Strand). Ersetzt das flache „Kommt bald“.
export default {
  id: 'm0-finale', cast: ['jolie', 'ilda', 'tun'], camera: 'talk', rewind: false, start: 'a',
  nodes: {
    a: { speaker: 'erzaehler', say: 'Morgen. Der Hafen leuchtet. Zum ersten Mal seit einem Jahr.', goto: 'b' },
    b: {
      speaker: 'jolie', say: 'Der Splitter hat die ganze Nacht geglüht. Richtung Strand.', anim: 'think',
      choices: [
        { say: 'Zeig mal.', icon: 'splitter', goto: 'c' },
        { sign: 'nicken', label: 'Nicken', goto: 'c' },
      ],
    },
    c: { speaker: 'ilda', say: 'Die Flut war heute Nacht zu hoch. Viel zu hoch.', anim: 'think', goto: 'd' },
    d: {
      speaker: 'tun', say: 'Am Strand glitzert was. Hab ich gesehen. Ohne Filmen.', anim: 'talk',
      choices: [
        { say: 'Was glitzert da?', icon: 'frage', goto: 'd2' },
        { say: 'Du warst am Strand?', icon: 'karte', goto: 'd3' },
      ],
    },
    d2: { speaker: 'tun', say: 'Keine Ahnung. Glas vielleicht. Wie das von Jolie.', anim: 'think', goto: 'f' },
    d3: { speaker: 'tun', say: 'Nur kurz. Wegen … Möwen. Frag nicht.', anim: 'idle', goto: 'f' },
    f: {
      speaker: 'jolie', say: 'Kommst du mit, wenn es so weit ist?', anim: 'idle',
      choices: [
        { say: 'Klar. Crew ist Crew.', icon: 'team', goto: 'g' },
        { sign: 'nicken', label: 'Nicken', goto: 'g' },
      ],
    },
    g: { speaker: 'jolie', say: 'Gut. Ich kenn da ein paar Spalten.', anim: 'cheer', goto: 'g2' },
    g2: { speaker: 'glimm', say: 'Strand. Grau. Glitzert. Verdächtig.', goto: 'h' },
    h: { speaker: 'erzaehler', say: 'Acht Splitter fehlen noch. Einer wartet am Strand.', goto: 'i' },
    i: { speaker: 'erzaehler', say: 'Der nächste Kurs-Code öffnet den Weg.', end: true },
  },
};

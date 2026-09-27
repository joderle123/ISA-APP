// Ankunft am Steg (Demo, DESIGN §12 e01 Auftakt): Ilda gibt dir den Blick. Erwachsene schreiben keine Jugendsprache.
// Stimme Ilda (docs/STORY.md §7): knapp, trocken, wechselt das Thema statt zu lügen. Saat: die Kisten (Uhr, §5).
export default {
  id: 'ankunft-ilda', cast: ['ilda'], camera: 'talk', rewind: false, start: 'a',
  nodes: {
    a: {
      speaker: 'ilda', say: 'Moien. Mit dem letzten Boot. Freiwillig?', anim: 'wave',
      choices: [
        { say: 'Mehr oder weniger.', icon: 'frage', goto: 'a1' },
        { say: 'Ja.', icon: 'check', goto: 'a2' },
        { sign: 'schulterzucken', label: 'Schulterzucken', goto: 'a3' },
      ],
    },
    a1: { speaker: 'ilda', say: 'Wie die meisten hier.', anim: 'idle', goto: 'b' },
    a2: { speaker: 'ilda', say: 'Hm. Das hat hier lange keiner gesagt.', anim: 'think', goto: 'b' },
    a3: { speaker: 'glimm', say: 'Schulterzucken. Passt hier rein.', goto: 'b' },
    b: { speaker: 'ilda', say: 'Wir haben nicht mehr mit Gästen gerechnet.', anim: 'idle', goto: 'c' },
    c: {
      speaker: 'erzaehler', say: 'Am Steg stapeln sich Kisten. Mit Namen drauf.',
      choices: [
        { say: 'Wer zieht weg?', icon: 'boot', goto: 'c1' },
        { say: 'Warum ist alles so grau?', icon: 'frage', goto: 'c2' },
        { say: 'Und der dunkle Turm?', icon: 'laterne', goto: 'c3' },
      ],
    },
    c1: { speaker: 'ilda', say: 'Zwei Familien. Vor den Stürmen. Ist so.', anim: 'sad', goto: 'd' },
    c2: { speaker: 'ilda', say: 'Seit letztem Sommer. Man gewöhnt sich.', anim: 'sad', goto: 'c2b' },
    c2b: { speaker: 'glimm', say: 'Gewöhnt. Klar.', goto: 'd' },
    c3: { speaker: 'ilda', say: 'Frag mich nicht nach dem Turm.', anim: 'idle', goto: 'd' },
    d: { speaker: 'ilda', say: 'Halt still. Ich zeig dir, wie man hier hinschaut.', anim: 'talk', effects: [{ grant: 'blick' }], goto: 'e' },
    e: { speaker: 'glimm', say: 'Farben über Köpfen. Ernsthaft?', goto: 'f' },
    f: { speaker: 'ilda', say: 'Jeder trägt eine. Die wenigsten merken es.', anim: 'talk', goto: 'g' },
    g: { speaker: 'glimm', say: 'Und grau?', goto: 'h' },
    h: { speaker: 'ilda', say: 'Grau heißt allein. Davon haben wir genug.', anim: 'sad', goto: 'i' },
    i: { speaker: 'ilda', say: 'Dein Code aus dem Kurs öffnet den ersten Auftrag.', anim: 'idle', end: true, effects: [{ deed: 'ilda-blick' }] },
  },
};

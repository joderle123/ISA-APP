// Story-Beat Demo-Ende nach j1-e03 (am Morgen nach dem Lagerfeuer, Hafen-Plugin), docs/STORY.md §4/§5/§3:
// Der Hafen leuchtet – und die Kisten stehen trotzdem. Mika an der Hafenmauer (Spitze passt zu m0.plakat).
// Die Uhr bekommt ein Gesicht (WAGNER-Kiste). Mika macht ein Angebot (m0.mika = angebot, nur Text). Wer bei Ilda nachfragt, erfährt den Plan. Dann der Entwurf: „Noch nicht.“
// Haken der Kostprobe (konzept/README.md): Jolie und Tun haben die alte Kielpost aus der Hafengrotte gehoben. Sie liegt
// jetzt am Steg (flags.boot.da, systems/kielpost). Draußen: Kisten und Nebel.
export default {
  id: 'm0-finale', cast: ['jolie', 'ilda', 'tun', 'mika'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: { speaker: 'erzaehler', say: 'Morgen. Der Hafen leuchtet. Zum ersten Mal seit einem Jahr.', goto: 'b' },
    b: {
      speaker: 'erzaehler', say: 'Am Steg stehen trotzdem Kisten. Mehr als vorher.',
      choices: [
        { say: 'Warum packen die noch?', icon: 'boot', goto: 'b1' },
        { label: 'Zum Turm schauen', icon: 'laterne', goto: 'b2' },
      ],
    },
    b1: { speaker: 'ilda', say: 'Bunt ist schön. Im Sturm sieht man trotzdem nichts.', anim: 'sad', goto: 'b1b' },
    b1b: { speaker: 'erzaehler', say: 'Auf der obersten Kiste steht: WAGNER.', goto: 'd' },
    b2: { speaker: 'erzaehler', say: 'Der Turm. Dunkel wie immer.', goto: 'b1b' },
    d: { speaker: 'erzaehler', say: 'Oben auf der Hafenmauer sitzt jemand. Rotes Tuch.', goto: 'e' },
    e: {
      branch: [
        { when: { flag: ['m0.plakat', '==', 'weg'] }, goto: 'e1' },
        { when: { flag: ['m0.plakat', '==', 'umgedreht'] }, goto: 'e2' },
      ],
      speaker: 'mika', say: 'Mein Spruch hängt noch. Hat sich keiner getraut.', anim: 'idle', goto: 'f',
    },
    e1: { speaker: 'mika', say: 'Mein Plakat abgerissen. Samt Opa. Respekt.', anim: 'idle', goto: 'f' },
    e2: { speaker: 'mika', say: 'Umgedreht, hm? Siehst du. Du verstehst es schon.', anim: 'idle', goto: 'f' },
    f: {
      speaker: 'mika', say: 'Vergessen ist besser. Wer redet, verliert.', anim: 'talk',
      choices: [
        { say: 'Wer hat denn verloren?', icon: 'frage', goto: 'f1' },
        { say: 'Vielleicht hast du recht.', icon: 'hand', goto: 'f2' },
        { say: 'Und warum sprühst du es dann überall?', icon: 'frage', goto: 'f3' },
      ],
    },
    f1: { speaker: 'mika', say: 'Einer, der nicht mehr hier ist.', anim: 'idle', goto: 'f1b' },
    f1b: { speaker: 'tun', say: '…', anim: 'sad', goto: 'g0' },
    f2: { speaker: 'mika', say: 'Nicht vielleicht.', anim: 'idle', goto: 'f2b' },
    f2b: { speaker: 'mika', say: 'Krater hat Platz. Falls du’s leid wirst.', anim: 'idle', effects: [{ flag: 'm0.mika', set: 'angebot' }], goto: 'g0' },
    f3: { speaker: 'mika', say: 'Damit keiner vergisst, was Reden anrichtet.', anim: 'idle', goto: 'g0' },
    // Mikas stärkster Moment: er hat nicht ganz unrecht (STORY §4). Keine Figur widerspricht hier.
    g0: {
      speaker: 'mika', say: 'Letzten Sommer haben alle geredet. Frag, wem’s geholfen hat.', anim: 'talk',
      choices: [
        { label: 'Schweigen', icon: 'ohr', goto: 'g' },
        { say: 'Und wem hilft Schweigen?', icon: 'frage', goto: 'g1' },
      ],
    },
    // Der Riss in Mikas Rüstung – ein Wort, dann sofort wieder Spott.
    g1: { speaker: 'mika', say: '… Mir.', anim: 'idle', goto: 'h' },
    g: { speaker: 'mika', say: 'Bunt steht euch. Hält nur nicht.', anim: 'idle', goto: 'h' },
    h: {
      speaker: 'jolie', say: 'Der Splitter war die ganze Nacht warm.', anim: 'think',
      choices: [
        { say: 'Zeig mal.', icon: 'splitter', goto: 'i' },
        { sign: 'nicken', label: 'Nicken', goto: 'i' },
      ],
    },
    i: {
      speaker: 'tun', say: 'Am Strand glitzert was. Hab ich gesehen. Gestern Nacht.', anim: 'talk',
      choices: [
        { say: 'Was glitzert da?', icon: 'frage', goto: 'i1' },
        { say: 'Du warst am Strand?', icon: 'karte', goto: 'i2' },
      ],
    },
    i1: { speaker: 'tun', say: 'Keine Ahnung. Glas vielleicht. Wie das von Jolie.', anim: 'think', goto: 'j' },
    i2: { speaker: 'tun', say: 'Nur kurz. Wegen … Möwen. Frag nicht.', anim: 'idle', goto: 'j' },
    j: {
      speaker: 'jolie', say: 'Kommst du mit, wenn es so weit ist?', anim: 'idle',
      choices: [
        { say: 'Klar.', icon: 'team', goto: 'k' },
        { sign: 'nicken', label: 'Nicken', goto: 'k' },
      ],
    },
    k: { speaker: 'jolie', say: 'Gut. Ich kenn da ein paar Spalten.', anim: 'cheer', goto: 'l' },
    l: {
      speaker: 'ilda', say: 'Die letzte Fähre geht, wenn die Stürme kommen.', anim: 'think',
      choices: [
        { say: 'Und dann?', icon: 'frage', tone: 'ruhig', goto: 'l1' },
        { label: 'Schweigen', icon: 'ohr', goto: 'l2' },
      ],
    },
    l1: { speaker: 'ilda', say: 'Dann mach ich den Hafen zu.', anim: 'sad', goto: 'n' },
    l2: { speaker: 'ilda', say: 'Bis dahin …', anim: 'sad', goto: 'n' },
    n: {
      speaker: 'erzaehler', say: 'Abends. Der Entwurf. Ein Satz, immer noch.',
      choices: [{ say: 'Noch nicht.', icon: 'uhr', goto: 'p' }],
    },
    p: { speaker: 'glimm', say: 'Noch nicht. Hm. Kenn ich.', goto: 'r' },
    r: {
      speaker: 'erzaehler', say: 'Da klopft es. Jolie und Tun. Nass bis zu den Knien.',
      choices: [{ say: 'Tür auf.', icon: 'offen', goto: 's' }],
    },
    s: {
      speaker: 'tun', say: 'Komm mit. Zum Steg. Schnell.', anim: 'cheer',
      choices: [
        { say: 'Was ist los?', icon: 'frage', goto: 't' },
        { sign: 'nicken', label: 'Nicken', goto: 't' },
      ],
    },
    t: { speaker: 'erzaehler', say: 'Am Steg liegt ein altes Boot. Aus der Grotte.', goto: 'u' },
    u: {
      speaker: 'jolie', say: 'Die Kielpost. Das alte Postboot der Insel.', anim: 'idle',
      choices: [
        { say: 'Die fährt noch?', icon: 'boot', goto: 'u1' },
        { say: 'Wer hat die gehoben?', icon: 'frage', goto: 'u2' },
      ],
    },
    u1: { speaker: 'tun', say: 'Fast. Ein Loch ist geflickt. Mit meiner Jacke.', anim: 'talk', goto: 'v' },
    u2: { speaker: 'jolie', say: 'Wir drei. Heute Nacht. Mit Seilen.', anim: 'cheer', goto: 'v' },
    v: { speaker: 'jolie', say: 'Ilda sagt: Keiner fährt mehr raus.', anim: 'think', goto: 'w' },
    w: { speaker: 'tun', say: 'Draußen treiben Kisten. Holz, Tau, alles.', anim: 'talk', goto: 'x' },
    x: { speaker: 'glimm', say: 'Und Nebel. Viel Nebel.', goto: 'q' },
    q: { speaker: 'erzaehler', say: 'Die Kielpost wartet am Steg.', end: true, effects: [{ flag: 'boot.da', set: true }] },
  },
};

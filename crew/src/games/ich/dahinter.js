/* Spiel „Was steckt dahinter?“ (Thema: Ich – Bedürfnisse & Stärken) · Vorlage T4 Bewegung im Raum · j1-e04
   Der Beamer zeigt den Wunsch einer Figur („mehr Follower“, „neue Konsole“, „Ruhe“). Zwei Raumseiten:
   Wunsch / Bedürfnis, Mitte „kommt drauf an“. 10 Sekunden gehen, Stopp. Die größte Gruppe sagt, welcher
   Tank dahintersteckt – Gruppen antworten, nie Einzelne. Danach erzählt die Figur selbst, was sie braucht.
   Nur die Lehrkraft tippt. Es gibt kein richtig/falsch, nur den Tank dahinter. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const TANKS = [
    { id: 'ruhe', name: 'Ruhe', icon: 'pause', colour: '#4cc9f0' },
    { id: 'naehe', name: 'Dazugehören', icon: 'users', colour: '#ff4fa3' },
    { id: 'gesehen', name: 'Gesehen werden', icon: 'eye', colour: '#ffc93c' },
    { id: 'sicher', name: 'Sicherheit', icon: 'shield', colour: '#2ee6c5' },
    { id: 'bewegung', name: 'Bewegung & Spaß', icon: 'bolt', colour: '#b48bff' },
    { id: 'frei', name: 'Selbst bestimmen', icon: 'star', colour: '#3da5ff' },
  ];
  const tank = (id) => TANKS.find((t) => t.id === id);

  /* Wünsche: Figur, Wunsch-Satz, Tanks dahinter (meist mehrere – Streit erlaubt), Antwort der Figur */
  const WUENSCHE = [
    { fig: 'yara', mood: 'neutral', wunsch: 'Ich will mehr Follower.', dahinter: ['gesehen', 'naehe'], antwort: 'Wenn ich ehrlich bin: Ich will, dass jemand merkt, dass es mich gibt. Zahlen sind nur Zahlen.', streit: true },
    { fig: 'luca', mood: 'froh', wunsch: 'Ich will die neue Konsole.', dahinter: ['naehe', 'bewegung'], antwort: 'Die anderen zocken online zusammen. Ohne Konsole bin ich nicht dabei. Es geht gar nicht um das Gerät.' },
    { fig: 'mika', mood: 'genervt', wunsch: 'Ich will einfach nur Ruhe.', dahinter: ['ruhe'], antwort: 'Seit Tagen ist Lärm, Chat, Streit. Ich brauche eine Stunde, in der niemand was von mir will. Das ist kein Wunsch, das ist ein Tank.' },
    { fig: 'sam', mood: 'neutral', wunsch: 'Ich will ein eigenes Zimmer.', dahinter: ['frei', 'ruhe'], antwort: 'Mein Bruder entscheidet alles: Licht, Musik, wann Schluss ist. Ich will einmal selbst bestimmen.' },
    { fig: 'yara', mood: 'froh', wunsch: 'Ich will die Sneaker, die alle haben.', dahinter: ['naehe', 'gesehen'], antwort: 'Mit den Sneakern gehöre ich dazu. Ohne stehe ich daneben. So fühlt es sich an.' },
    { fig: 'luca', mood: 'angst', wunsch: 'Ich will, dass der Test ausfällt.', dahinter: ['sicher'], antwort: 'Ich weiß nicht, was drankommt. Diese Unsicherheit macht mich fertig. Wenn ich wüsste, was kommt, wär der Test okay.' },
    { fig: 'mika', mood: 'neutral', wunsch: 'Ich will jeden Tag Fast Food.', dahinter: ['naehe', 'frei'], antwort: 'Beim Burger sitzen wir zusammen und lachen. Zuhause isst jeder allein vor dem Handy.' },
    { fig: 'sam', mood: 'froh', wunsch: 'Ich will Freitag freihaben.', dahinter: ['ruhe', 'bewegung'], antwort: 'Fünf Tage sitzen. Freitag will ich raus, rennen, nichts müssen.' },
    { fig: 'yara', mood: 'genervt', wunsch: 'Ich will, dass meine Eltern mir nicht mehr reinreden.', dahinter: ['frei', 'gesehen'], antwort: 'Ich will selbst entscheiden. Und ich will, dass sie merken, dass ich das kann.' },
    { fig: 'luca', mood: 'neutral', wunsch: 'Ich will 10 000 Likes auf mein Video.', dahinter: ['gesehen'], antwort: 'Ein Like heißt: Jemand hat hingeschaut. Ich will, dass jemand hinschaut.', streit: true },
    { fig: 'sam', mood: 'traurig', wunsch: 'Ich will, dass die Clique mich einlädt.', dahinter: ['naehe'], antwort: 'Das ist kein Wunsch. Das ist Hunger. Dazugehören ist ein Tank.' },
    { fig: 'mika', mood: 'froh', wunsch: 'Ich will ein teures Fahrrad.', dahinter: ['bewegung', 'frei'], antwort: 'Mit dem Rad komme ich allein überall hin. Ohne muss ich immer fragen, ob mich jemand fährt.' },
  ];
  const POS = [
    { id: 'wunsch', label: 'Wunsch', where: 'Wand links · wäre schön, geht auch ohne' },
    { id: 'mitte', label: 'Kommt drauf an', where: 'Mitte · wird zuerst gefragt' },
    { id: 'beduerfnis', label: 'Bedürfnis', where: 'Wand rechts · ein Tank ist leer' },
  ];

  // Wunsch-Karte, groß für den Beamer
  function wunschCard(ctx, w, eyebrow) {
    return ctx.figureCard({ fig: w.fig, mood: w.mood, text: '„' + w.wunsch + '“', eyebrow: eyebrow, size: 110, speakText: w.wunsch });
  }
  const tankChips = (ids, big) => h('div', { class: 'row' }, TANKS.filter((t) => !ids || ids.includes(t.id)).map((t) => h('span', { class: 'chip' + (big ? '' : ' small'), style: { background: 'color-mix(in srgb, ' + t.colour + ' 30%, var(--bg))' } }, CREW.icon(t.icon, big ? 20 : 14), ' ' + t.name)));

  CREW.registerGame({
    id: 'dahinter',
    template: 'T4',
    icon: 'bolt',
    themen: ['Wunsch vs. Bedürfnis', 'Bedürfnisse', 'Meinung begründen'],
    safety: ['figuren', 'koerper', 'raum'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Ein Wunsch am Beamer. Geh zur Wand: Wunsch oder Bedürfnis? Mitte ist okay. Die größte Gruppe sagt, welcher Tank dahintersteckt.',
        steps: [
          { icon: 'eye', title: 'Wunsch lesen', text: 'Eine Figur sagt, was sie will.' },
          { icon: 'bolt', title: '10 Sekunden gehen', text: 'Links Wunsch, rechts Bedürfnis, Mitte „kommt drauf an“.' },
          { icon: 'chat', title: 'Gruppen reden', text: 'Welcher Tank? Gruppen antworten, nie Einzelne.' },
        ],
        probe: async () => {
          await ctx.T.walk({ card: wunschCard(ctx, { fig: 'sam', mood: 'froh', wunsch: 'Ich will ein Eis.' }, 'PROBE · zählt nicht'), positions: POS, seconds: 10, question: 'Probe vorbei. Wunsch, oder? Oder steckt „Spaß“ dahinter? Kurz rufen reicht.', step: 'Probe', minorityFirst: false });
        },
      });
      const liste = ctx.rshuffle(WUENSCHE).slice(0, 5);
      let played = 0;
      for (let i = 0; i < liste.length; i++) {
        const w = liste[i];
        const name = CREW.games.figures[w.fig].name;
        const r = await ctx.T.walk({
          card: wunschCard(ctx, w, 'Wunsch ' + (i + 1) + ' von ' + liste.length + ' · ' + name + ' sagt'),
          positions: POS, seconds: 10, step: 'Wunsch ' + (i + 1),
          question: 'Größte Gruppe zuerst: Welcher Tank steckt dahinter? Dann die anderen Gruppen. Mitte: Worauf kommt es an?',
          minorityFirst: false, nextLabel: name + ' fragen',
          hint: 'Mitte ist erlaubt. Gehen, nicht rennen.' + (w.streit ? ' Bei diesem Wunsch streiten sich viele.' : ''),
        });
        if (r === ctx.SKIP) continue;
        played++;
        // Die Gruppen haben gesprochen: Lehrkraft tippt den Tank, den die größte Gruppe genannt hat
        const w2 = ctx.scr([
          ctx.say('Welchen Tank hat die größte Gruppe genannt?', { eyebrow: 'Wunsch ' + (i + 1), small: true }),
          CREW.ui.teacherLine('Einmal antippen, was die Gruppe gesagt hat. Nicht zählen, wer wo stand.'),
        ], { eyebrow: 'Wunsch ' + (i + 1) + ' · Tank' });
        const said = await ctx.ask(w2, TANKS.map((t) => ({ label: t.name, value: t.id, icon: t.icon, variant: 'ghost' })).concat([{ label: 'Es blieb ein Wunsch', value: 'none', variant: 'ghost', icon: 'x' }]));
        if (said === ctx.SKIP) continue;
        // Die Figur antwortet selbst
        const hit = said !== 'none' && w.dahinter.includes(said);
        const w3 = ctx.scr([
          ctx.figureCard({ fig: w.fig, mood: 'neutral', text: w.antwort, eyebrow: 'Wenn man ' + name + ' fragt: „Was wäre dann anders?“' }),
          h('div', { class: 'card stack' },
            h('div', { class: 'row between' }, h('b', null, 'Tank dahinter'), h('span', { class: 'muted small' }, hit ? 'Eure Spur passt.' : said === 'none' ? 'Auch ein Wunsch hat oft einen Tank dahinter.' : 'Andere Spur – ' + name + ' sagt es anders. Beides darf sein.')),
            tankChips(w.dahinter, true)),
          h('p', { class: 'muted small' }, 'Wer allein stand, darf bleiben und nichts sagen.'),
          CREW.ui.teacherLine('Nur „Weiter“ tippen.'),
        ], { eyebrow: 'Wunsch ' + (i + 1) + ' · Antwort' });
        await ctx.next(w3, i + 1 < liste.length ? 'Nächster Wunsch' : 'Fertig');
      }
      // Abschluss: ein Satz aus jeder Gruppe, kein Zählen
      const w4 = ctx.scr([
        ctx.say('Letzter Satz, Gruppe für Gruppe: Welcher Wunsch war am schwersten einzuordnen? Warum?', { eyebrow: 'Kurz reden', small: true }),
        tankChips(null, false),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Abschluss' });
      await ctx.next(w4, 'Fertig');
      return { summary: played ? 'Hinter fast jedem Wunsch steckt ein Tank. Wer den Tank kennt, kann ihn füllen.' : 'Heute nur reingeschaut.', stats: [[played, 'Wünsche gegangen']] };
    },
  });
})();

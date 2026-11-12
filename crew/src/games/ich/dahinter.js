/* Spiel „Was steckt dahinter?“ (Thema: Ich – Bedürfnisse & Stärken) · Vorlage T4 Bewegung im Raum · j1-e04
   Der Beamer zeigt den Wunsch einer Figur („mehr Follower“, „neue Konsole“, „Ruhe“). Zwei Raumseiten:
   Wunsch / Bedürfnis, Mitte „kommt drauf an“. 10 Sekunden gehen, Stopp. Gruppen antworten, nie Einzelne.
   In drei Level:
   1) Erkennen – Wunsch oder Bedürfnis? Die Gruppen sagen, warum sie dort stehen. Die Figur antwortet.
   2) Begründen – welcher Tank steckt dahinter, und woran erkennt ihr das? Die Lehrkraft tippt den Tank der größten Gruppe.
   3) Anwenden – ein kleiner Schritt, der den Tank füllt, OHNE dass die Figur den Wunsch bekommt.
   Nur die Lehrkraft tippt. Es gibt kein richtig/falsch, nur den Tank dahinter. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const LEVELS = ['Erkennen', 'Begründen', 'Anwenden'];
  const TANKS = [
    { id: 'ruhe', name: 'Ruhe', icon: 'pause', colour: '#4cc9f0' },
    { id: 'naehe', name: 'Dazugehören', icon: 'users', colour: '#ff4fa3' },
    { id: 'gesehen', name: 'Gesehen werden', icon: 'eye', colour: '#ffc93c' },
    { id: 'sicher', name: 'Sicherheit', icon: 'shield', colour: '#2ee6c5' },
    { id: 'bewegung', name: 'Bewegung & Spaß', icon: 'bolt', colour: '#b48bff' },
    { id: 'frei', name: 'Selbst bestimmen', icon: 'star', colour: '#3da5ff' },
  ];

  /* Wünsche: Figur, Wunsch-Satz, Tanks dahinter (meist mehrere – Streit erlaubt), Antwort der Figur.
     schritt (Level 3): kleine Wege, den Tank zu füllen – ok = füllt den Tank ohne den Wunsch */
  const WUENSCHE = [
    { fig: 'yara', mood: 'neutral', wunsch: 'Ich will mehr Follower.', dahinter: ['gesehen', 'naehe'], antwort: 'Wenn ich ehrlich bin: Ich will, dass jemand merkt, dass es mich gibt. Zahlen sind nur Zahlen.', streit: true,
      schritt: [{ t: 'Einer Freundin ein Foto zeigen und fragen: „Was denkst du?“', ok: true }, { t: 'Follower kaufen', ok: false, warum: 'Das ist der Wunsch – gesehen fühlt sich Yara dadurch nicht.' }, { t: 'Jeden Tag drei Posts', ok: false, warum: 'Zu groß – und wieder nur Zahlen.' }] },
    { fig: 'luca', mood: 'froh', wunsch: 'Ich will die neue Konsole.', dahinter: ['naehe', 'bewegung'], antwort: 'Die anderen zocken online zusammen. Ohne Konsole bin ich nicht dabei. Es geht gar nicht um das Gerät.',
      schritt: [{ t: 'Sam fragen, ob er bei ihm mitzocken kann', ok: true }, { t: 'Die Konsole auf Raten kaufen', ok: false, warum: 'Teuer – und dazugehören kann Luca auch ohne.' }, { t: 'Eine eigene Online-Gruppe gründen', ok: false, warum: 'Zu groß für heute.' }] },
    { fig: 'mika', mood: 'genervt', wunsch: 'Ich will einfach nur Ruhe.', dahinter: ['ruhe'], antwort: 'Seit Tagen ist Lärm, Chat, Streit. Ich brauche eine Stunde, in der niemand was von mir will. Das ist kein Wunsch, das ist ein Tank.',
      schritt: [{ t: 'Heute 30 Minuten Handy aus, Tür zu, Musik an', ok: true }, { t: 'Allen sagen, sie sollen endlich still sein', ok: false, warum: 'Gibt eher Streit als Ruhe.' }, { t: 'Für immer allein wohnen', ok: false, warum: 'Zu groß – und heute nicht machbar.' }] },
    { fig: 'sam', mood: 'neutral', wunsch: 'Ich will ein eigenes Zimmer.', dahinter: ['frei', 'ruhe'], antwort: 'Mein Bruder entscheidet alles: Licht, Musik, wann Schluss ist. Ich will einmal selbst bestimmen.',
      schritt: [{ t: 'Mit dem Bruder ausmachen: ab 21 Uhr bestimmt Sam Licht und Musik', ok: true }, { t: 'Sofort ausziehen', ok: false, warum: 'Zu groß – geht nicht.' }, { t: 'Dem Bruder heimlich das Ladekabel verstecken', ok: false, warum: 'Rache füllt keinen Tank.' }] },
    { fig: 'yara', mood: 'froh', wunsch: 'Ich will die Sneaker, die alle haben.', dahinter: ['naehe', 'gesehen'], antwort: 'Mit den Sneakern gehöre ich dazu. Ohne stehe ich daneben. So fühlt es sich an.' },
    { fig: 'luca', mood: 'angst', wunsch: 'Ich will, dass der Test ausfällt.', dahinter: ['sicher'], antwort: 'Ich weiß nicht, was drankommt. Diese Unsicherheit macht mich fertig. Wenn ich wüsste, was kommt, wär der Test okay.',
      schritt: [{ t: 'Die Lehrkraft fragen, was im Test drankommt', ok: true }, { t: 'Sich krank melden', ok: false, warum: 'Der Test kommt trotzdem – die Angst auch.' }, { t: 'Die ganze Nacht lernen', ok: false, warum: 'Zu groß – und morgen ist Luca müde.' }] },
    { fig: 'mika', mood: 'neutral', wunsch: 'Ich will jeden Tag Fast Food.', dahinter: ['naehe', 'frei'], antwort: 'Beim Burger sitzen wir zusammen und lachen. Zuhause isst jeder allein vor dem Handy.' },
    { fig: 'sam', mood: 'froh', wunsch: 'Ich will Freitag freihaben.', dahinter: ['ruhe', 'bewegung'], antwort: 'Fünf Tage sitzen. Freitag will ich raus, rennen, nichts müssen.' },
    { fig: 'yara', mood: 'genervt', wunsch: 'Ich will, dass meine Eltern mir nicht mehr reinreden.', dahinter: ['frei', 'gesehen'], antwort: 'Ich will selbst entscheiden. Und ich will, dass sie merken, dass ich das kann.' },
    { fig: 'luca', mood: 'neutral', wunsch: 'Ich will 10 000 Likes auf mein Video.', dahinter: ['gesehen'], antwort: 'Ein Like heißt: Jemand hat hingeschaut. Ich will, dass jemand hinschaut.', streit: true },
    { fig: 'sam', mood: 'traurig', wunsch: 'Ich will, dass die Clique mich einlädt.', dahinter: ['naehe'], antwort: 'Das ist kein Wunsch. Das ist Hunger. Dazugehören ist ein Tank.',
      schritt: [{ t: 'Einer Person aus der Clique schreiben: „Kino am Samstag?“', ok: true }, { t: 'Die Clique im Chat anmachen', ok: false, warum: 'Danach ist Sam weiter weg als vorher.' }, { t: 'Eine neue, coole Clique suchen', ok: false, warum: 'Zu groß für heute.' }] },
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

  /* Ein Wunsch auf Level n. Liefert true, wenn gespielt */
  async function wunschRunde(ctx, w, i, total, level) {
    const name = CREW.games.figures[w.fig].name;
    const fragen = {
      1: 'Kleinere Gruppe zuerst: Warum steht ihr hier? Mitte: Worauf kommt es an?',
      2: 'Größte Gruppe zuerst: Welcher Tank steckt dahinter – und woran erkennt ihr das?',
      3: 'Welcher Tank steckt dahinter? Gleich sucht ihr einen kleinen Schritt.',
    };
    const r = await ctx.T.walk({
      card: wunschCard(ctx, w, 'Wunsch ' + (i + 1) + ' von ' + total + ' · ' + name + ' sagt'),
      positions: POS, seconds: 10, step: 'Wunsch ' + (i + 1) + ' · Level ' + level,
      question: fragen[level],
      minorityFirst: level === 1, nextLabel: level === 1 ? name + ' fragen' : 'Tank antippen',
      hint: 'Mitte ist erlaubt. Gehen, nicht rennen.' + (w.streit ? ' Bei diesem Wunsch streiten sich viele.' : ''),
    });
    if (r === ctx.SKIP) return false;
    let said = null;
    if (level >= 2) {
      // Die Gruppen haben gesprochen: Lehrkraft tippt den Tank, den die größte Gruppe genannt hat
      const w2 = ctx.scr([
        ctx.say('Welchen Tank hat die größte Gruppe genannt?', { eyebrow: 'Wunsch ' + (i + 1), small: true }),
        CREW.ui.teacherLine('Einmal antippen, was die Gruppe gesagt hat. Nicht zählen, wer wo stand.'),
      ], { eyebrow: 'Wunsch ' + (i + 1) + ' · Tank', badge: ctx.stufe(level, LEVELS) });
      said = await ctx.ask(w2, TANKS.map((t) => ({ label: t.name, value: t.id, icon: t.icon, variant: 'ghost' })).concat([{ label: 'Es blieb ein Wunsch', value: 'none', variant: 'ghost', icon: 'x' }]));
      if (said === ctx.SKIP) return true;
    }
    // Die Figur antwortet selbst
    const hit = said && said !== 'none' && w.dahinter.includes(said);
    const w3 = ctx.scr([
      ctx.figureCard({ fig: w.fig, mood: 'neutral', text: w.antwort, eyebrow: 'Wenn man ' + name + ' fragt: „Was wäre dann anders?“' }),
      h('div', { class: 'card stack' },
        h('div', { class: 'row between' }, h('b', null, 'Tank dahinter'), h('span', { class: 'muted small' }, level === 1 ? 'Hinter dem Wunsch steckt ein Tank.' : hit ? 'Eure Spur passt.' : said === 'none' ? 'Auch ein Wunsch hat oft einen Tank dahinter.' : 'Andere Spur – ' + name + ' sagt es anders. Beides darf sein.')),
        tankChips(w.dahinter, true)),
      h('p', { class: 'muted small' }, 'Wer allein stand, darf bleiben und nichts sagen.'),
      CREW.ui.teacherLine('Nur „Weiter“ tippen.'),
    ], { eyebrow: 'Wunsch ' + (i + 1) + ' · Antwort', badge: ctx.stufe(level, LEVELS) });
    await ctx.next(w3, level === 3 ? 'Kleiner Schritt' : i + 1 < total ? 'Nächster Wunsch' : 'Weiter');
    if (level === 3 && w.schritt) {
      // Level 3: ein kleiner Schritt, der den Tank füllt – ohne den Wunsch
      const opts = ctx.rshuffle(w.schritt);
      const w4 = ctx.scr([
        ctx.say(name + ' bekommt den Wunsch nicht. Welcher kleine Schritt füllt den Tank trotzdem – heute noch?', { eyebrow: 'Anwenden', small: true }),
        tankChips(w.dahinter, true),
        CREW.ui.teacherLine('Die Crew sagt einen Schritt. Tippe ihn an – oder den, der am nächsten dran ist.'),
      ], { eyebrow: 'Wunsch ' + (i + 1) + ' · Schritt', badge: ctx.stufe(3, LEVELS) });
      const k = await ctx.ask(w4, opts.map((o, j) => ({ label: o.t, value: j, variant: 'ghost', id: 'dh-schritt-' + j })));
      if (k !== ctx.SKIP) {
        const o = opts[k];
        if (o.ok) CREW.sound.play('great');
        const w5 = ctx.scr([
          ctx.figureCard({ fig: w.fig, mood: o.ok ? 'froh' : 'neutral', text: o.ok ? 'Das schaff ich heute. Und es fühlt sich besser an als der Wunsch.' : 'Hm. ' + o.warum, eyebrow: o.t }),
          h('p', { class: 'muted' }, o.ok ? 'Klein, machbar, füllt den Tank. So geht’s auch für euch.' : 'Kleiner Schritt wäre: „' + w.schritt.find((x) => x.ok).t + '“'),
        ], { eyebrow: 'Wunsch ' + (i + 1) + ' · Schritt', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(w5, 'Weiter');
      }
    }
    return true;
  }

  CREW.registerGame({
    id: 'dahinter',
    template: 'T4',
    icon: 'bolt',
    themen: ['Wunsch vs. Bedürfnis', 'Bedürfnisse', 'Meinung begründen'],
    safety: ['figuren', 'koerper', 'raum'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Ein Wunsch am Beamer. Geh zur Wand: Wunsch oder Bedürfnis? Mitte ist okay. Erst erkennen, dann den Tank begründen, dann einen kleinen Schritt finden.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'Wunsch lesen', text: 'Eine Figur sagt, was sie will.' },
          { icon: 'bolt', title: '10 Sekunden gehen', text: 'Links Wunsch, rechts Bedürfnis, Mitte „kommt drauf an“.' },
          { icon: 'chat', title: 'Gruppen reden', text: 'Warum? Welcher Tank? Gruppen antworten, nie Einzelne.' },
        ],
        probe: async () => {
          await ctx.T.walk({ card: wunschCard(ctx, { fig: 'sam', mood: 'froh', wunsch: 'Ich will ein Eis.' }, 'PROBE · zählt nicht'), positions: POS, seconds: 10, question: 'Probe vorbei. Wunsch, oder? Oder steckt „Spaß“ dahinter? Kurz rufen reicht.', step: 'Probe', minorityFirst: false });
        },
      });
      // Level 3 braucht einen Wunsch mit Schritt-Karten; Level 1–2 aus den übrigen (gleich auf allen Geräten)
      const mitSchritt = ctx.rshuffle(WUENSCHE.filter((w) => w.schritt));
      const l3 = mitSchritt[0];
      const rest = ctx.rshuffle(WUENSCHE.filter((w) => w !== l3));
      const plan = [[rest[0], 1], [rest[1], 1], [rest[2], 2], [rest[3], 2], [l3, 3]];
      let played = 0;
      for (let i = 0; i < plan.length; i++) {
        const [w, level] = plan[i];
        if (i === 2) await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt reicht „Wunsch oder Bedürfnis“ nicht mehr: Welcher Tank steckt dahinter – und woran erkennt ihr das?' });
        if (i === 4) await ctx.T.level({ n: 3, names: LEVELS, text: 'Letzter Wunsch: Findet einen kleinen Schritt, der den Tank füllt – ohne dass die Figur den Wunsch bekommt.' });
        if (await wunschRunde(ctx, w, i, plan.length, level)) played++;
      }
      return { summary: played ? 'Hinter fast jedem Wunsch steckt ein Tank. Wer den Tank kennt, kann ihn auch anders füllen.' : 'Heute nur reingeschaut.', stats: [[played, 'Wünsche gegangen']] };
    },
  });
})();

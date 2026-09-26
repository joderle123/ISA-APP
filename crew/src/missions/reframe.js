/* Mission Freitag: „Reframe-Battle“ – Selbstwert und Stärken.
   Nach dem ISA-Material „Reframing: Mëch selwer nei gesinn“: Ein Etikett („Du bist zu laut.“)
   wird zu einer Stärke umgedreht („Wer laut ist, traut sich, etwas zu sagen.“).
   Ablauf: Team A gegen Team B.
     1) Battle (3 Runden): Etikett erscheint, 45 Sekunden Bedenkzeit, beide Teams sagen ihren Reframe laut.
        Jedes Team bewertet das ANDERE Team mit der Ja/Nein-Karte („Überzeugt?“), die Lehrkraft stimmt mit.
        Jede Ja-Stimme = 1 Punkt. Überzeugt die Mehrheit, wächst der Stärken-Turm um einen Block.
        Danach zeigt das Spiel zwei Profi-Reframes zur Inspiration.
     2) Speed-Match (2 Runden): Ein Profi-Reframe erscheint. Welches Etikett steckt dahinter (A–D)?
        Das schnellste Team mit der richtigen Karte punktet.
   Der Stärken-Turm (nach dem ISA-Blatt „Mein Stärken-Turm“) gehört der ganzen Crew.
   Crew-Energie = Punkte beider Teams zusammen. Keine Einzelwertung.
   Zusätzlich als Solo-Spiel „Reframe-Rush“. */
(function () {
  const CREW = window.CREW;
  const { h, shuffle, clamp } = CREW.util;

  const BATTLES = 3;
  const SPEEDS = 2;
  const THINK = 45;          // Sekunden Bedenkzeit pro Etikett
  const SOLO_CARDS = 8;
  const LETTERS = ['A', 'B', 'C', 'D'];
  // Farben wie auf der Antwort-Karte (A blau, B pink, C grün, D gelb)
  const LETTER_VARIANT = { A: 'teamA', B: 'teamB', C: 'good', D: 'yellow' };

  /* Bedeutungs-Gruppen, die sich zu ähnlich sind. Aus ihnen kommen im Speed-Match keine falschen
     Antworten, sonst wäre die Lösung nicht eindeutig. */
  const NEAR = (() => {
    const raw = {
      power: ['tempo', 'klartext', 'frei', 'herz'],
      tempo: ['frei', 'boss'],
      still: ['sorgfalt', 'gefuehl', 'herz'],
      sorgfalt: ['kopf', 'boss'],
      kopf: ['klartext', 'frei'],
      gefuehl: ['herz', 'klartext'],
      klartext: ['boss'],
      boss: ['herz'],
    };
    const m = {};
    const add = (a, b) => { (m[a] = m[a] || new Set()).add(b); };
    Object.entries(raw).forEach(([a, list]) => list.forEach((b) => { add(a, b); add(b, a); }));
    return m;
  })();
  const isNear = (a, b) => a === b || !!(NEAR[a] && NEAR[a].has(b));

  const other = (t) => (t === 'A' ? 'B' : 'A');
  const quote = (s) => '„' + s + '“';
  const fullReframe = (card, k) => card.wer + ', ' + card.reframes[k];
  const people = (n) => n + (n === 1 ? ' Person' : ' Leute');

  /* Alle Karten, die gerade erlaubt sind (heikle nur mit Freigabe) */
  function allowed(ctx) {
    const sens = ctx.state.settings.sensitive;
    return (CREW.content.reframe || []).filter((c) => sens || !c.heikel);
  }

  /* 4 Antwort-Optionen: richtige Karte + 3 aus weit entfernten, verschiedenen Gruppen */
  function buildOptions(ctx, card) {
    const pool = shuffle(allowed(ctx).filter((c) => c.id !== card.id && c.etikett !== card.etikett));
    const picked = [];
    const groups = [card.gruppe];
    for (const c of pool) {
      if (picked.length >= 3) break;
      if (groups.some((g) => isNear(g, c.gruppe))) continue;
      picked.push(c);
      groups.push(c.gruppe);
    }
    // Notfall (sehr kleiner Stapel): Hauptsache verschieden
    for (const c of pool) {
      if (picked.length >= 3) break;
      if (!picked.includes(c) && c.gruppe !== card.gruppe) picked.push(c);
    }
    return shuffle([card, ...picked]).map((c, i) => ({ card: c, letter: LETTERS[i], ok: c === card }));
  }

  /* Bildschirm mit fester Knopf-Zone unten (nichts springt, wenn die Knöpfe später erscheinen).
     Der Inhalt sitzt senkrecht in der Mitte zwischen Kopfzeile und Knöpfen. */
  function view(ctx, kids, o) {
    const opts = o || {};
    const acts = h('div', { class: 'reframe-acts' });
    const w = ctx.screen([...kids, acts], opts);
    w.classList.add('reframe-screen');
    if (opts.top) w.classList.add('reframe-top'); // oben bündig (Inhalt wächst während des Spiels)
    return { w, acts };
  }

  /* ---------- Etikett-Karte (dreht sich um: vorne Spruch, hinten Stärke) ---------- */
  function flipTag(card, o) {
    const opts = o || {};
    const front = h('div', { class: 'reframe-face front' },
      h('span', { class: 'reframe-face-kicker' }, 'Etikett'),
      h('span', { class: 'reframe-face-text' }, quote(card.satz)));
    const back = h('div', { class: 'reframe-face back' },
      h('span', { class: 'reframe-face-kicker' }, 'Stärke'),
      h('span', { class: 'reframe-face-text', lang: 'de' }, card.staerke),
      opts.second ? h('span', { class: 'reframe-face-sub' }, '+ ' + card.staerke2) : null);
    const el = h('div', { class: 'reframe-flip' + (opts.small ? ' small' : '') + (opts.demo ? ' demo' : '') },
      h('div', { class: 'reframe-flip-inner' }, front, back));
    return {
      el,
      flip() { el.classList.add('flipped'); CREW.sound.play('reveal'); },
    };
  }

  /* ---------- Stärken-Turm ---------- */
  // Lange Wörter etwas kleiner, damit sie nicht mitten im Wort umbrechen
  const sizeCls = (w) => (w.length > 14 ? ' xlong' : w.length > 11 ? ' long' : '');
  // G.blocks: [{ word, team: 'A' | 'B' }]; fresh = Anzahl der neuesten Blöcke, die hereinfallen
  function tower(G, o) {
    const opts = o || {};
    const fresh = opts.fresh || 0;
    const n = G.blocks.length;
    const list = h('div', { class: 'reframe-blocks' }, G.blocks.map((b, i) =>
      h('div', { class: 'reframe-block t' + b.team + sizeCls(b.word) + (i >= n - fresh ? ' fresh' : ''), lang: 'de', style: i >= n - fresh ? { animationDelay: (i - (n - fresh)) * 260 + 'ms' } : null },
        h('span', null, b.word))));
    const roof = h('div', { class: 'reframe-roof' + (opts.roof ? ' on' : '') + (opts.roofFresh ? ' fresh' : ''), 'aria-hidden': 'true',
      html: '<svg viewBox="0 0 200 80" preserveAspectRatio="none"><path d="M100 5 L195 75 H5 Z" vector-effect="non-scaling-stroke"/></svg>' },
      opts.roof ? h('span', { class: 'reframe-roof-star' }, CREW.icon('star', 22)) : null);
    const base = h('div', { class: 'reframe-base' },
      h('div', { class: 'reframe-base-shape', 'aria-hidden': 'true',
        html: '<svg viewBox="0 0 200 60" preserveAspectRatio="none"><path class="b" d="M16 4 H184 L196 57 H4 Z" vector-effect="non-scaling-stroke"/><path class="d" d="M88 57 V36 A12 12 0 0 1 112 36 V57 Z" vector-effect="non-scaling-stroke"/></svg>' }),
      h('b', { class: 'reframe-base-name' }, G.crewName));
    return h('div', { class: 'reframe-tower', role: 'img', 'aria-label': 'Stärken-Turm mit ' + n + ' Blöcken' + (n ? ': ' + G.blocks.map((b) => b.word).join(', ') : '') },
      roof, list, base);
  }

  /* Kleiner Turm für die Kopfzeile */
  function miniTower(G, pop) {
    const bars = h('div', { class: 'reframe-mini-bars' }, G.blocks.map((b, i) => h('i', { class: 't' + b.team + (pop && i === G.blocks.length - 1 ? ' fresh' : '') })));
    return h('div', { class: 'reframe-mini', title: 'Stärken-Turm', 'aria-label': 'Stärken-Turm: ' + G.blocks.length + ' Blöcke' },
      h('div', { class: 'reframe-mini-tower' }, bars, h('i', { class: 'base' })),
      h('span', { class: 'reframe-mini-num' }, h('b', null, String(G.blocks.length)), h('small', null, 'Turm')));
  }

  /* Kopfzeile: Runde, Turm, Punkte (beide Teams oder Solo-Treffer) */
  function hud(G, label, o) {
    const opts = o || {};
    const chip = (cls, name, value, key) => {
      const num = h('b', { class: 'reframe-score-num' }, String(value));
      if (key) G.nums[key] = num;
      return h('div', { class: 'reframe-score ' + cls }, h('span', { class: 'reframe-score-name' }, name), num);
    };
    G.miniSlot = h('div', { class: 'reframe-mini-slot' }, miniTower(G, opts.pop));
    const scores = opts.solo
      ? [chip('tC', 'Treffer', opts.solo.hits)]
      : ['A', 'B'].map((t) => chip('t' + t, G.teams[t].name, opts.before ? opts.before[t] : G.score[t], t));
    return h('div', { class: 'reframe-hud' },
      h('span', { class: 'eyebrow reframe-hud-label' }, label),
      G.miniSlot,
      h('div', { class: 'reframe-scores' }, scores));
  }
  function refreshMini(G) {
    if (G.miniSlot) G.miniSlot.replaceChildren(miniTower(G, true));
  }
  // Punkte in der Kopfzeile hochzählen
  function bumpScores(G, before) {
    ['A', 'B'].forEach((t) => {
      const el = G.nums[t];
      if (!el || before[t] === G.score[t]) return;
      el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
      CREW.ui.countUp(el, before[t], G.score[t], 700);
    });
  }

  function teamChip(G, t, extra) {
    return h('span', { class: 'reframe-teamchip t' + t }, G.teams[t].name, extra ? h('small', null, extra) : null);
  }

  /* ---------- 0) Intro ---------- */
  async function intro(ctx, G) {
    const { ui } = ctx;
    const demoCard = (CREW.content.reframe || []).find((c) => c.id === 'rf07') || { satz: 'Du bist zu ruhig.', staerke: 'Zuhören' };
    const step = (n, title, text) => h('div', { class: 'reframe-step' }, h('span', { class: 'reframe-step-n' }, String(n)), h('div', null, h('b', null, title), h('span', { class: 'muted' }, text)));
    const { acts } = view(ctx, [
      h('div', { class: 'stack enter', style: { gap: '4px' } },
        h('span', { class: 'eyebrow' }, 'Mission Freitag · Selbstwert'),
        h('h1', { class: 'outline-text' }, 'Reframe-Battle'),
        h('p', { class: 'lead' }, 'Aus einem blöden Spruch wird eine Stärke.')),
      h('div', { class: 'reframe-split intro enter-2' },
        h('div', { class: 'reframe-demo' },
          flipTag(demoCard, { demo: true }).el,
          h('p', { class: 'muted small reframe-demo-cap' }, 'Reframe heißt: neu einrahmen. Gleiche Eigenschaft, anderer Blick.'),
          h('div', { class: 'reframe-teams' },
            h('span', { class: 'muted small' }, 'Teilt euch in zwei Teams auf:'),
            h('div', { class: 'reframe-teams-row' },
              teamChip(G, 'A', people(G.size.A)),
              h('span', { class: 'reframe-vs' }, 'vs'),
              teamChip(G, 'B', people(G.size.B))))),
        h('div', { class: 'reframe-steps' },
          step(1, 'Etikett', 'Jemand bekommt einen Spruch gesagt.'),
          step(2, 'Umdrehen', 'Euer Team macht in 45 Sekunden eine Stärke daraus.'),
          step(3, 'Überzeugt?', 'Das andere Team stimmt ab. Jedes Ja = 1 Punkt.'))),
    ]);
    await ctx.waitFor(ui.choice(acts, [{ label: 'Battle starten', value: 'go', iconRight: 'play', id: 'rf-start' }]));
  }

  /* ---------- 1) Battle-Runde ---------- */
  async function battle(ctx, G, card, i) {
    const { ui, SKIP } = ctx;
    const first = i % 2 === 0 ? 'A' : 'B';
    const second = other(first);
    const label = 'Battle ' + (i + 1) + ' von ' + BATTLES;

    // a) Etikett + Bedenkzeit
    const tipSlot = h('div', { class: 'reframe-tip' });
    tipSlot.appendChild(ui.btn('Tipp', () => {
      tipSlot.replaceChildren(h('span', { class: 'reframe-chip pop' }, 'Stichwort: ', h('b', null, card.staerke)));
      CREW.sound.play('soft');
    }, { variant: 'ghost', small: true, icon: 'sparkle', id: 'rf-tip' }));
    let timeUp;
    const timeP = new Promise((r) => { timeUp = r; });
    const tm = ui.timer(THINK, { onDone: () => { CREW.sound.play('go'); timeUp('time'); } });
    const v1 = view(ctx, [
      hud(G, label),
      h('div', { class: 'reframe-center enter' },
        h('div', { class: 'reframe-kicker' }, h('span', null, 'Jemand bekommt gesagt:'), ui.speakBtn('Jemand bekommt gesagt: ' + card.satz + ' Dreht es um! ' + card.wer + ', …')),
        flipTag(card).el),
      h('div', { class: 'reframe-think enter-2' },
        h('div', { class: 'reframe-think-txt' },
          h('h2', null, 'Dreht es um!'),
          h('p', { class: 'lead' }, 'Findet im Team die Stärke darin. Startet so:'),
          h('div', { class: 'reframe-starter' }, card.wer + ', …'),
          tipSlot),
        h('div', { class: 'reframe-timer' }, tm.el)),
    ]);
    CREW.sound.play('whoosh');
    const r1 = await ctx.waitFor(Promise.race([ui.choice(v1.acts, [{ label: 'Fertig – Bühne frei', value: 'go', iconRight: 'right', id: 'rf-think-done' }]), timeP]));
    tm.stop();
    if (r1 === SKIP) return;

    // b) Beide Teams sagen ihren Satz
    const panel = (t, k) => h('div', { class: 'reframe-panel t' + t },
      h('div', { class: 'reframe-panel-head' }, h('span', { class: 'reframe-order' }, String(k + 1)), h('b', null, G.teams[t].name), h('span', { class: 'muted small' }, k === 0 ? 'zuerst' : 'danach')),
      h('div', { class: 'reframe-starter small' }, card.wer + ', …'));
    const v2 = view(ctx, [
      hud(G, label),
      h('div', { class: 'reframe-headrow enter' },
        h('div', { class: 'stack', style: { gap: '6px' } }, h('h2', null, 'Bühne frei!'), h('p', { class: 'lead' }, 'Sagt euren Satz laut. Das andere Team hört genau zu.')),
        flipTag(card, { small: true }).el),
      h('div', { class: 'reframe-duo enter-2' }, panel(first, 0), panel(second, 1)),
      h('div', { class: 'row between enter-3' },
        h('p', { class: 'muted' }, 'Gleich bewertet jedes Team das andere.'),
        ui.paddleHint('janein', 'Überzeugt?')),
    ]);
    const r2 = await ctx.waitFor(ui.choice(v2.acts, [{ label: 'Abstimmen', value: 'go', iconRight: 'right', id: 'rf-vote-go' }]));
    if (r2 === SKIP) return;

    // c) Abstimmung: Ja-Stimmen zählen (Lehrkraft stimmt immer mit)
    await ui.threeTwoOne('Überzeugt?');
    const judges = { A: G.size.B + 1, B: G.size.A + 1 };
    const steppers = { A: ui.stepper({ value: 0, min: 0, max: judges.A }), B: ui.stepper({ value: 0, min: 0, max: judges.B }) };
    const votePanel = (t) => h('div', { class: 'reframe-panel vote t' + t, 'data-team': t },
      h('div', { class: 'reframe-panel-head' }, h('b', null, 'Ja für ' + G.teams[t].name)),
      h('span', { class: 'muted small' }, G.teams[other(t)].name + ' + Lehrkraft · höchstens ' + judges[t]),
      steppers[t].el);
    const v3 = view(ctx, [
      hud(G, label),
      h('div', { class: 'stack enter', style: { gap: '6px' } }, h('h2', null, 'Wie viele Ja?'), h('p', { class: 'muted' }, 'Tippt die Ja-Karten ein. Jedes Ja bringt auch Crew-Energie.')),
      h('div', { class: 'reframe-duo enter-2' }, votePanel(first), votePanel(second)),
    ]);
    const r3 = await ctx.waitFor(ui.choice(v3.acts, [{ label: 'Auswerten', value: 'go', iconRight: 'right', id: 'rf-vote-done' }]));
    if (r3 === SKIP) return;

    // d) Ergebnis: Karte dreht sich um, Turm wächst
    const before = { A: G.score.A, B: G.score.B };
    const yes = { A: steppers.A.get(), B: steppers.B.get() };
    const convinced = {};
    const added = [];
    [first, second].forEach((t) => {
      G.score[t] += yes[t];
      convinced[t] = yes[t] > 0 && yes[t] * 2 >= judges[t];
      if (convinced[t]) added.push({ word: added.length ? card.staerke2 : card.staerke, team: t });
    });
    G.maxPoints += judges.A + judges.B;
    G.battles++;
    const line = (t) => h('div', { class: 'reframe-result t' + t + (convinced[t] ? ' yes' : '') },
      h('div', { class: 'reframe-result-l' }, h('b', null, G.teams[t].name), h('span', { class: 'reframe-result-ja' }, yes[t] + ' × Ja')),
      h('span', { class: 'reframe-result-msg' }, convinced[t] ? 'Überzeugt!' : yes[t] ? 'Knapp dran' : 'Diesmal nicht'),
      h('span', { class: 'reframe-plus' }, '+' + yes[t]));
    const head = added.length === 2 ? 'Doppelt überzeugt! Zwei neue Blöcke.' : added.length === 1 ? 'Überzeugt! Ein neuer Block.' : 'Noch kein Block. Die Profis helfen.';
    const tag = flipTag(card, { second: added.length === 2 });
    const towerSlot = h('div', { class: 'reframe-tower-slot' }, tower(G));
    const v4 = view(ctx, [
      hud(G, label, { before }),
      h('div', { class: 'reframe-split' },
        h('div', { class: 'stack reframe-res-l' },
          h('h2', { class: 'enter' }, head),
          tag.el,
          h('div', { class: 'stack enter-2', style: { gap: '8px' } }, line(first), line(second))),
        towerSlot),
    ]);
    await ctx.sleep(500);
    tag.flip();
    bumpScores(G, before);
    await ctx.sleep(650);
    if (added.length) {
      G.blocks.push(...added);
      towerSlot.replaceChildren(tower(G, { fresh: added.length }));
      refreshMini(G);
      CREW.sound.play('unlock');
      if (added.length === 2) setTimeout(() => CREW.sound.play('great'), 300);
    } else {
      CREW.sound.play('soft');
    }
    const r4 = await ctx.waitFor(ui.choice(v4.acts, [{ label: 'Profi-Reframes', value: 'go', iconRight: 'right', id: 'rf-profi' }]));
    if (r4 === SKIP) return;

    // e) Zwei Profi-Reframes zur Inspiration
    const two = shuffle([0, 1, 2]).slice(0, 2);
    const v5 = view(ctx, [
      hud(G, label),
      h('div', { class: 'row between enter', style: { flexWrap: 'nowrap', alignItems: 'flex-end' } },
        h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Zur Inspiration'), h('h2', null, 'So drehen es Profis um')),
        ui.speakBtn(two.map((k) => fullReframe(card, k)).join(' '))),
      h('p', { class: 'reframe-was enter' }, h('span', { class: 'muted' }, 'Statt '), h('s', null, quote(card.satz)), h('span', { class: 'muted' }, ' sagen sie:')),
      h('div', { class: 'reframe-profis' }, two.map((k, n) => h('div', { class: 'reframe-profi enter-' + (n + 2) },
        h('span', { class: 'reframe-profi-ic' }, CREW.icon('sparkle', 30)),
        h('p', null, h('span', { class: 'reframe-profi-wer' }, card.wer + ', '), h('b', null, card.reframes[k]))))),
      h('div', { class: 'row enter-3' }, h('span', { class: 'muted' }, 'Stärken darin:'), h('span', { class: 'reframe-chip' }, card.staerke), h('span', { class: 'reframe-chip' }, card.staerke2)),
    ]);
    await ctx.waitFor(ui.choice(v5.acts, [{ label: i < BATTLES - 1 ? 'Nächstes Etikett' : 'Weiter', value: 'go', iconRight: 'right', id: 'rf-next' }]));
  }

  /* ---------- 2) Speed-Match ---------- */
  async function speedIntro(ctx, G) {
    const { ui } = ctx;
    const v = view(ctx, [
      hud(G, 'Runde 2'),
      h('div', { class: 'reframe-center enter' },
        h('span', { class: 'reframe-bolt' }, CREW.icon('bolt', 54)),
        h('h1', { class: 'outline-text' }, 'Speed-Match'),
        h('p', { class: 'lead' }, 'Jetzt andersrum: Ihr seht eine Stärke. Welches Etikett steckt dahinter?'),
        h('p', { class: 'muted' }, 'Schnellstes Team mit der richtigen Karte: +3. Zweiter Versuch: +2.'),
        ui.paddleHint('abcd')),
    ]);
    return ctx.waitFor(ui.choice(v.acts, [{ label: 'Los!', value: 'go', iconRight: 'play', id: 'rf-speed-go' }]));
  }

  function optionGrid(options, st) {
    const s = st || {};
    return h('div', { class: 'reframe-opts' }, options.map((o) => {
      let cls = 'reframe-opt';
      if (s.reveal && o.ok) cls += ' ok';
      else if ((s.wrong || []).includes(o.letter)) cls += ' nope';
      else if (s.reveal) cls += ' dim';
      return h('div', { class: cls, 'data-letter': o.letter, 'data-ok': o.ok ? '1' : null },
        h('span', { class: 'reframe-letter l' + o.letter }, o.letter),
        h('span', { class: 'reframe-opt-text' }, o.card.etikett),
        s.reveal && o.ok ? h('span', { class: 'reframe-opt-ic' }, CREW.icon('check', 28)) : null);
    }));
  }

  function questionCard(ctx, card, k, kicker) {
    return h('div', { class: 'reframe-q' },
      h('div', { class: 'row between', style: { flexWrap: 'nowrap' } }, h('span', { class: 'reframe-face-kicker' }, kicker), ctx.ui.speakBtn('Wer so ist, ' + card.reframes[k] + ' Welches Etikett steckt dahinter?')),
      h('div', { class: 'reframe-q-text' }, '… ' + card.reframes[k]));
  }

  async function speed(ctx, G, card, j, total) {
    const { ui, SKIP } = ctx;
    const label = 'Speed-Match ' + (j + 1) + ' von ' + total;
    const k = Math.floor(Math.random() * card.reframes.length);
    const options = buildOptions(ctx, card);
    const correct = options.find((o) => o.ok).letter;
    const wrong = [];

    // a) Rennen: Wer hält zuerst die Karte hoch?
    const v1 = view(ctx, [
      hud(G, label),
      h('div', { class: 'enter' }, questionCard(ctx, card, k, 'Profi-Reframe')),
      h('div', { class: 'enter-2' }, optionGrid(options)),
      h('h3', { class: 'reframe-ask enter-3' }, 'Welches Team war zuerst?'),
    ]);
    CREW.sound.play('whoosh');
    const firstTeam = await ctx.waitFor(ui.choice(v1.acts, [
      { label: G.teams.A.name, value: 'A', variant: 'teamA', id: 'rf-first-A' },
      { label: G.teams.B.name, value: 'B', variant: 'teamB', id: 'rf-first-B' },
      { label: 'Keiner weiß es', value: 'none', variant: 'ghost', id: 'rf-first-none' }]));
    if (firstTeam === SKIP) return;

    // b) Buchstaben eintippen (bei Fehler darf das andere Team)
    let winner = null;
    let gain = 0;
    const order = firstTeam === 'none' ? [] : [firstTeam, other(firstTeam)];
    for (let n = 0; n < order.length; n++) {
      const t = order[n];
      const left = LETTERS.filter((L) => !wrong.includes(L));
      const v2 = view(ctx, [
        hud(G, label),
        questionCard(ctx, card, k, 'Profi-Reframe'),
        optionGrid(options, { wrong }),
        h('h3', { class: 'reframe-ask pop' }, n === 0 ? 'Welche Karte zeigt ' + G.teams[t].name + '?' : 'Nicht ganz! ' + G.teams[t].name + ', eure Chance:'),
      ]);
      const letter = await ctx.waitFor(ui.choice(v2.acts, left.map((L) => ({ label: L, value: L, variant: LETTER_VARIANT[L], id: 'rf-letter-' + L })).concat(n === 1 ? [{ label: 'Weiß nicht', value: 'pass', variant: 'ghost', id: 'rf-pass' }] : [])));
      if (letter === SKIP) return;
      if (letter === 'pass') break;
      if (letter === correct) { winner = t; gain = n === 0 ? 3 : 2; break; }
      wrong.push(letter);
      CREW.sound.play('soft');
    }

    // c) Auflösung
    G.speeds++;
    G.maxPoints += 3;
    const before = { A: G.score.A, B: G.score.B };
    const award = (t, pts) => {
      G.score[t] += pts;
      G.blocks.push({ word: card.staerke, team: t });
    };
    if (winner) award(winner, gain);
    const tag = flipTag(card, { small: true });
    const msg = h('div', { class: 'stack reframe-reveal-msg' },
      h('h2', null, winner ? 'Richtig! +' + gain + ' für ' + G.teams[winner].name : 'Das Etikett war: ' + card.etikett),
      h('p', { class: 'lead' }, h('span', { class: 'muted' }, 'Profi-Satz: '), fullReframe(card, k)));
    const v3 = view(ctx, [
      hud(G, label, { before }),
      h('div', { class: 'reframe-reveal' }, msg, tag.el),
      optionGrid(options, { reveal: true, wrong }),
    ]);
    CREW.sound.play('drum');
    await ctx.sleep(400);
    tag.flip();
    if (winner) {
      CREW.sound.play('great');
      bumpScores(G, before);
      refreshMini(G);
    }
    // Gute Begründung für eine andere Karte? Die Lehrkraft darf trotzdem Punkte geben.
    const actions = [];
    if (!winner) order.forEach((t, idx) => { if (idx < wrong.length) actions.push({ label: '+2 ' + G.teams[t].name, value: 'ov' + t, variant: 'ghost', icon: 'star', id: 'rf-override-' + t }); });
    actions.push({ label: 'Weiter', value: 'go', iconRight: 'right', id: 'rf-speed-next' });
    if (actions.length > 1) v3.acts.appendChild(h('p', { class: 'muted small reframe-ov-hint' }, 'Gute Begründung für eine andere Karte? Dann zählt sie trotzdem.'));
    const r = await ctx.waitFor(ui.choice(v3.acts, actions));
    if (typeof r === 'string' && r.startsWith('ov')) {
      const t = r.slice(2);
      const b2 = { A: G.score.A, B: G.score.B };
      award(t, 2);
      bumpScores(G, b2);
      refreshMini(G);
      CREW.sound.play('good');
      msg.replaceChildren(h('h2', null, 'Gut begründet! +2 für ' + G.teams[t].name), h('p', { class: 'lead' }, h('span', { class: 'muted' }, 'Profi-Satz: '), fullReframe(card, k)));
      v3.acts.replaceChildren();
      await ctx.waitFor(ui.next(v3.acts, 'Weiter', { variant: '' }));
    }
  }

  /* ---------- 3) Finale: der ganze Turm ---------- */
  async function finale(ctx, G) {
    const { ui } = ctx;
    const total = G.score.A + G.score.B;
    const n = G.blocks.length;
    let headline;
    if (n >= 6) headline = n + ' Stärken. Ein Turm. Eine Crew.';
    else if (n >= 1) headline = n === 1 ? 'Eine Stärke im Turm. Gut umgedreht!' : n + ' Stärken im Turm. Gut umgedreht!';
    else headline = 'Der Turm steht. Nächstes Mal wächst er.';
    const lead = G.score.A === G.score.B ? 'Unentschieden im Battle.' : (G.score.A > G.score.B ? G.teams.A.name : G.teams.B.name) + ' holt das Battle.';
    const totalNum = h('b', { class: 'reframe-total-num' }, '0');
    const v = view(ctx, [
      h('div', { class: 'reframe-split final' },
        h('div', { class: 'stack reframe-final-l' },
          h('span', { class: 'eyebrow enter' }, 'Euer Stärken-Turm'),
          h('h2', { class: 'enter' }, headline),
          h('div', { class: 'reframe-final-scores enter-2' },
            h('div', { class: 'reframe-score tA big' }, h('span', { class: 'reframe-score-name' }, G.teams.A.name), h('b', { class: 'reframe-score-num' }, String(G.score.A))),
            h('div', { class: 'reframe-score tB big' }, h('span', { class: 'reframe-score-name' }, G.teams.B.name), h('b', { class: 'reframe-score-num' }, String(G.score.B)))),
          h('div', { class: 'reframe-total enter-2' }, CREW.icon('bolt', 30), h('span', null, 'Zusammen'), totalNum, h('span', null, 'Punkte')),
          h('p', { class: 'muted enter-3' }, lead + ' Der Turm gehört allen.'),
          h('p', { class: 'lead enter-3' }, 'Welche Stärke aus dem Turm passt zu dir? Denk sie dir kurz.')),
        h('div', { class: 'reframe-tower-slot' }, tower(G, { roof: true, roofFresh: true }))),
    ]);
    CREW.sound.play('great');
    if (n >= 3) ui.confetti(120);
    ui.countUp(totalNum, 0, total, 900);
    await ctx.waitFor(ui.choice(v.acts, [{ label: 'Zur Nachbesprechung', value: 'go', iconRight: 'right', id: 'rf-done' }]));
  }

  /* ---------- Mission ---------- */
  CREW.registerMission({
    id: 'reframe',
    day: 5,
    title: 'Reframe-Battle',
    tagline: 'Aus einem blöden Spruch wird eine Stärke.',
    minutes: 7,
    themes: ['Selbstwert', 'Stärken', 'Selbst- & Fremdbild'],
    etep: 'III–V',
    eldib: [
      { code: 'K-19', text: 'benennt eigene Eigenschaften, Stärken und Schwächen' },
      { code: 'K-20', text: 'beschreibt Eigenschaften von anderen' },
      { code: 'SOZ-33', text: 'zeigt Interesse daran, wie andere ihn/sie sehen' },
      { code: 'K-28', text: 'macht anderen mit Worten Mut und lobt sie' },
      { code: 'K-32', text: 'würdigt Beiträge anderer und baut auf ihren Ideen auf' },
    ],
    teacherNote: 'Zwei Teams. Battle (3 Runden): Ein Etikett erscheint („Du bist zu laut.“). 45 Sekunden überlegt jedes Team einen Reframe („Wer laut ist, …“). Beide Teams sagen ihren Satz laut. Dann bewertet jedes Team das ANDERE Team mit der Ja/Nein-Karte, du stimmst immer mit. Tippe die Ja-Stimmen ein: Jedes Ja ist ein Punkt, bei Mehrheit wächst der Stärken-Turm. Danach zeigt das Spiel zwei Profi-Reframes. Speed-Match (2 Runden): Ein Profi-Reframe erscheint, die Teams halten die passende Buchstaben-Karte (A–D) hoch. Du tippst, welches Team zuerst war und welche Karte es zeigt. Bei guter Begründung für eine andere Karte kannst du trotzdem +2 geben. Die Etiketten sind allgemein. Bitte darauf achten, dass niemand sie auf eine Person im Raum bezieht. Eigene Etiketten nennen ist in der Nachbesprechung freiwillig.',
    debrief: [
      'Welcher Reframe hat dich heute überrascht?',
      'Kennst du ein Etikett, das du selbst schon gehört hast? Welche Stärke könnte darin stecken? (Nur wenn du magst.)',
      'Wie fühlt es sich an, wenn dich jemand mit einem einzigen Wort beschreibt?',
      'Welche Stärke aus dem Turm nimmst du heute mit?',
      'Woher kommen solche Etiketten eigentlich? Wer sagt so etwas?',
      'Wie kann man Kritik sagen, ohne jemandem ein Etikett zu verpassen?',
      'War es leichter, selbst umzudrehen oder das andere Team zu bewerten?',
    ],

    async run(ctx) {
      const N = ctx.crewSize;
      const sizeA = Math.max(1, Math.ceil(N / 2));
      const G = {
        teams: ctx.teams,
        size: { A: sizeA, B: Math.max(1, N - sizeA) },
        score: { A: 0, B: 0 },
        blocks: [],
        nums: {},
        miniSlot: null,
        battles: 0,
        speeds: 0,
        maxPoints: 0,
        crewName: (ctx.state.crew && ctx.state.crew.name) || 'Crew',
      };
      const cards = ctx.pick('reframe', BATTLES + SPEEDS);
      const battleCards = cards.slice(0, BATTLES);
      const speedCards = cards.slice(BATTLES);

      await intro(ctx, G);
      for (let i = 0; i < battleCards.length; i++) await battle(ctx, G, battleCards[i], i);
      if (speedCards.length) {
        await speedIntro(ctx, G); // X-Karte hier überspringt nur die Erklärung
        for (let j = 0; j < speedCards.length; j++) await speed(ctx, G, speedCards[j], j, speedCards.length);
      }
      await finale(ctx, G);

      const total = G.score.A + G.score.B;
      const ratio = G.maxPoints ? total / G.maxPoints : 0;
      const energy = clamp(4 + Math.round(6 * ratio), 4, 10);
      const n = G.blocks.length;
      let summary = 'Ihr habt Etiketten umgedreht. Das ist nicht leicht.';
      if (n >= 6) summary = 'Euer Stärken-Turm ist richtig hoch. Stark umgedreht!';
      else if (n >= 3) summary = n + ' Stärken im Turm. Gut umgedacht, Crew!';
      else if (n >= 1) summary = 'Der Stärken-Turm wächst. Gut umgedacht!';
      return { energy, summary };
    },
  });

  /* ---------- Solo: „Reframe-Rush“ ---------- */
  async function soloRound(ctx) {
    const { ui, SKIP } = ctx;
    const G = { blocks: [], crewName: 'Dein Turm', nums: {} };
    const cards = ctx.pick('reframe', SOLO_CARDS);
    let hits = 0;
    let played = 0;

    const demoCard = (CREW.content.reframe || []).find((c) => c.id === 'rf01') || cards[0];
    const vi = view(ctx, [
      h('div', { class: 'reframe-center enter' },
        h('span', { class: 'eyebrow' }, 'Solo · Stärken-Training'),
        h('h1', { class: 'outline-text' }, 'Reframe-Rush'),
        h('p', { class: 'lead' }, 'Du siehst eine Stärke. Welches Etikett steckt dahinter?'),
        h('p', { class: 'muted' }, SOLO_CARDS + ' Karten. Kein Zeitdruck. Jeder Treffer baut deinen Turm.')),
      h('div', { class: 'reframe-solo-demo enter-2' }, flipTag(demoCard, { demo: true, small: true }).el),
    ]);
    await ctx.waitFor(ui.choice(vi.acts, [{ label: 'Start', value: 'go', iconRight: 'play', id: 'rf-solo-start' }]));

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const k = Math.floor(Math.random() * card.reframes.length);
      const options = buildOptions(ctx, card);
      const label = 'Karte ' + (i + 1) + ' von ' + cards.length;
      let pickResolve;
      const pickP = new Promise((r) => { pickResolve = r; });
      const grid = h('div', { class: 'reframe-opts' }, options.map((o) => {
        const b = h('button', { type: 'button', class: 'reframe-opt as-btn', 'data-letter': o.letter, 'data-ok': o.ok ? '1' : null },
          h('span', { class: 'reframe-letter l' + o.letter }, o.letter),
          h('span', { class: 'reframe-opt-text' }, o.card.etikett));
        b.addEventListener('click', () => { CREW.sound.play('tap'); pickResolve(o); });
        return b;
      }));
      const feedback = h('div', { class: 'reframe-solo-fb' });
      const hudSlot = h('div', { class: 'reframe-hudslot' }, hud(G, label, { solo: { hits } }));
      const v = view(ctx, [hudSlot, h('div', { class: 'enter' }, questionCard(ctx, card, k, 'Welches Etikett steckt dahinter?')), h('div', { class: 'enter-2' }, grid), feedback], { top: true });
      const chosen = await ctx.waitFor(pickP);
      if (chosen === SKIP) continue;
      played++;
      grid.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      const ok = chosen.ok;
      if (ok) { G.blocks.push({ word: card.staerke, team: ['A', 'B', 'C'][hits % 3] }); hits++; CREW.sound.play('good'); } else CREW.sound.play('soft');
      options.forEach((o, idx) => {
        const b = grid.children[idx];
        if (o.ok) { b.classList.add('ok'); b.appendChild(h('span', { class: 'reframe-opt-ic' }, CREW.icon('check', 28))); } else if (o === chosen) b.classList.add('nope'); else b.classList.add('dim');
      });
      const tag = flipTag(card, { small: true });
      hudSlot.replaceChildren(hud(G, label, { solo: { hits }, pop: ok }));
      feedback.replaceChildren(h('div', { class: 'reframe-reveal pop' },
        h('div', { class: 'stack reframe-reveal-msg' },
          h('h2', null, ok ? 'Treffer! Neuer Block.' : 'Nicht ganz. Es war: ' + card.etikett),
          h('p', { class: 'lead' }, fullReframe(card, k))),
        tag.el));
      const nextP = ui.next(v.acts, i < cards.length - 1 ? 'Nächste Karte' : 'Fertig', { variant: '' });
      // Kleine Bildschirme: Rückmeldung und Knopf ins Bild holen
      try { v.acts.scrollIntoView({ behavior: 'smooth', block: 'end' }); } catch (e) { /* egal */ }
      await ctx.sleep(350);
      tag.flip();
      await ctx.waitFor(nextP);
    }

    // Ende: dein Turm + Bestwert (ohne Namen)
    const best = played ? ctx.best('treffer', hits, true) : null;
    const v = view(ctx, [
      h('div', { class: 'reframe-split final' },
        h('div', { class: 'stack reframe-final-l' },
          h('span', { class: 'eyebrow enter' }, 'Dein Stärken-Turm'),
          h('h2', { class: 'enter' }, hits + ' von ' + cards.length + ' Treffern'),
          best ? h('p', { class: 'lead enter-2' }, best.isNew && hits > 0 ? 'Neuer Bestwert!' : 'Dein Bestwert: ' + best.best) : null,
          h('p', { class: 'muted enter-3' }, hits ? 'Jede Stärke im Turm war vorher ein Etikett.' : 'Knifflig heute. Beim nächsten Mal wächst der Turm.')),
        h('div', { class: 'reframe-tower-slot' }, tower(G, { roof: true, roofFresh: true }))),
    ]);
    CREW.sound.play(hits >= cards.length / 2 ? 'great' : 'good');
    if (best && best.isNew && hits > 0) ui.confetti(90);
    const r = await ctx.waitFor(ui.choice(v.acts, [{ label: 'Nochmal', value: 'again', variant: 'ghost', icon: 'shuffle', id: 'rf-solo-again' }, { label: 'Fertig', value: 'done', iconRight: 'right', id: 'rf-solo-done' }]));
    return r === 'again' ? 'again' : 'done';
  }

  CREW.registerSolo({
    id: 'reframe',
    title: 'Reframe-Rush',
    desc: 'Du siehst eine Stärke. Welches Etikett steckt dahinter?',
    icon: 'sparkle',
    async run(ctx) {
      for (;;) {
        const r = await soloRound(ctx);
        if (r !== 'again') return;
      }
    },
  });

  // Für Tests: Hilfsfunktionen offenlegen (ohne Zustand)
  CREW.reframe = { NEAR, isNear, buildOptions };
})();

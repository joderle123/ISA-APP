/* Spiel „Frag weiter!“ (Thema: Ankommen & Crew) · Vorlage T3 Zu zweit an einem iPad · j1-e02, j1-e21
   Eine Figur antwortet knapp („War im Sommer weg.“). Das Paar wählt aus 12 Frage-Chips drei Nachfragen;
   bei offenen Fragen geht die Tür auf, bei Ja/Nein-Fragen bleibt sie zu. Bestätigt wird mit zwei Fingern.
   Runde 2 live mit harmlosen echten Antworten, Tausch. Zusatzfrage: „Welche Nachfrage willst du nicht
   gestellt bekommen?“ (Grenzen).
   In drei Level: 1) Tür öffnen (offen vs. Ja/Nein), 2) Dranbleiben (die Figur sagt etwas Persönliches – welche
   Antwort bleibt beim Gefühl, statt Thema zu klauen oder Ratschläge zu geben?), 3) Live mit harmlosen Antworten. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const FAELLE = [
    { fig: 'sam', mood: 'neutral', answer: 'War im Sommer weg.', open: ['Wo warst du?', 'Wie war’s da?', 'Was war das Beste?', 'Mit wem warst du da?', 'Was hast du da gemacht?', 'Wie ging’s dir dabei?'], closed: ['War’s schön?', 'Am Meer?', 'Lange?', 'Mit Familie?', 'War’s teuer?', 'Fährst du nochmal hin?'], more: ['Sam: „In Portugal, bei meiner Tante. Wir waren jeden Tag am Wasser.“', 'Sam: „Am besten war, dass ich surfen gelernt hab. Fast.“', 'Sam: „Ich hab mich da frei gefühlt. Keiner kannte mich.“'],
      tiefer: { satz: '„Da hat mich keiner gekannt. Das war … irgendwie leicht.“', opts: [
        { k: 'gefuehl', t: '„Was war leicht daran, dass dich keiner kannte?“', a: '„Hier bin ich immer der Laute. Da war ich einfach Sam.“' },
        { k: 'ich', t: '„Ich war auch mal in Portugal, voll schön!“', a: '„Ah. Cool.“ Sam erzählt nichts mehr.' },
        { k: 'rat', t: '„Dann such dir halt neue Freunde.“', a: '„So einfach ist das nicht.“ Sam schaut weg.' }] } },
    { fig: 'yara', mood: 'froh', answer: 'Hab am Wochenende was gebaut.', open: ['Was hast du gebaut?', 'Wie bist du drauf gekommen?', 'Was war schwierig?', 'Wem zeigst du es?', 'Wie hat das angefangen?', 'Was kommt als Nächstes?'], closed: ['Aus Holz?', 'Allein?', 'Fertig?', 'Groß?', 'Hat’s lange gedauert?', 'Machst du das öfter?'], more: ['Yara: „Ein Regal für meine Platten. Aus alten Brettern.“', 'Yara: „Schwierig war: gerade sägen. Zweimal schief.“', 'Yara: „Mein Opa hat mir die Säge gezeigt. Jetzt will ich einen Tisch bauen.“'],
      tiefer: { satz: '„Opa kann seit dem Sturz nicht mehr selbst bauen. Er sitzt daneben und erklärt.“', opts: [
        { k: 'gefuehl', t: '„Wie ist das für dich, jetzt für ihn zu bauen?“', a: '„Schön und traurig gleichzeitig. Aber er lacht wieder.“' },
        { k: 'ich', t: '„Mein Opa ist auch mal gestürzt.“', a: '„Oh. Okay.“ Yara wartet, aber es kommt nichts mehr.' },
        { k: 'rat', t: '„Kauft doch einfach fertige Möbel.“', a: '„Darum geht’s doch gar nicht.“' }] } },
    { fig: 'luca', mood: 'neutral', answer: 'Spiel seit Kurzem Schlagzeug.', open: ['Wie kam das?', 'Was gefällt dir daran?', 'Was übst du gerade?', 'Wo spielst du?', 'Wie fühlt sich das an?', 'Wer hat dich drauf gebracht?'], closed: ['Laut?', 'Jeden Tag?', 'In einer Band?', 'Teuer?', 'Kannst du schon was?', 'Hast du ein eigenes?'], more: ['Luca: „Mein Cousin hat eins im Keller. Ich durfte mal ran.“', 'Luca: „Wenn ich spiele, ist mein Kopf endlich leise.“', 'Luca: „Ich übe einen Beat, der klingt wie Regen. Ehrlich.“'],
      tiefer: { satz: '„Wenn ich spiele, ist mein Kopf endlich leise.“', opts: [
        { k: 'gefuehl', t: '„Wie fühlt sich das an, wenn es leise ist?“', a: '„Wie Durchatmen. Nach der Schule brauch ich das.“' },
        { k: 'ich', t: '„Ich hör auch voll gern Musik!“', a: '„Ja … nice.“ Luca nickt und ist still.' },
        { k: 'rat', t: '„Dann spiel halt den ganzen Tag.“', a: '„Geht nicht. Nachbarn.“ Luca lacht kurz, das Gespräch ist vorbei.' }] } },
  ];

  const LEVELS = ['Tür öffnen', 'Dranbleiben', 'Live'];
  const TIEF_LABEL = { gefuehl: 'Beim Gefühl geblieben', ich: 'Thema geklaut („Ich auch …“)', rat: 'Schneller Ratschlag' };

  // Tür-Anzeige: 0 = zu, 3 = ganz offen
  function door(level) {
    return h('div', { class: 'door', 'data-open': String(level), 'aria-label': 'Tür: ' + ['zu', 'ein Spalt', 'halb offen', 'weit offen'][level] }, h('span', null, CREW.games.avatar('mika', level >= 2 ? 'froh' : 'neutral', 70)), h('i'));
  }

  /* Eine Runde: Figur antwortet knapp, Paar wählt drei Chips, Zwei-Finger-Bestätigung, Tür */
  async function runde(ctx, fall, i, total) {
    const fig = CREW.games.figures[fall.fig];
    const chips = ctx.rshuffle(fall.open.map((q) => ({ q, open: true })).concat(fall.closed.map((q) => ({ q, open: false }))));
    const picked = [];
    const d = door(0);
    const count = h('span', { class: 'pill' }, '0 von 3 gewählt');
    const chipRow = h('div', { class: 'fw-chips' }, chips.map((c) => {
      const b = h('button', { type: 'button', class: 'chip', 'data-q': c.q }, c.q);
      b.addEventListener('click', () => {
        CREW.sound.play('tap');
        const idx = picked.indexOf(c);
        if (idx >= 0) picked.splice(idx, 1); else if (picked.length < 3) picked.push(c); else return;
        b.classList.toggle('sel', picked.includes(c));
        count.textContent = picked.length + ' von 3 gewählt';
        d.dataset.open = String(picked.filter((x) => x.open).length);
      });
      return b;
    }));
    const wrap = ctx.scr([
      ctx.figureCard({ fig: fall.fig, mood: fall.mood, text: fall.answer, eyebrow: 'Antwortet knapp. Fragt weiter!' }),
      h('div', { class: 'grid two' },
        h('div', { class: 'card stack' }, h('div', { class: 'row between' }, h('b', null, 'Wählt drei Nachfragen'), count), chipRow),
        h('div', { class: 'card stack', style: { alignItems: 'center' } }, h('span', { class: 'eyebrow' }, 'Die Tür'), d, h('span', { class: 'muted small' }, 'Offene Fragen öffnen. Ja/Nein hält zu.'))),
    ], { eyebrow: 'Figur ' + (i + 1) + '/' + total, badge: ctx.stufe(1, LEVELS) });
    if (ctx.auto) chips.slice(0, 3).forEach((c) => chipRow.querySelector('[data-q="' + c.q.replace(/"/g, '\\"') + '"]').click());
    const ok = await ctx.T.twoFinger(wrap, { label: 'Beide: Finger drauf, wenn ihr euch einig seid' });
    if (ok === ctx.SKIP) return null;
    const opened = picked.filter((x) => x.open).length;
    // Die Figur erzählt so viel, wie die Tür offen ist
    const w2 = ctx.scr([
      h('div', { class: 'row center' }, door(opened)),
      ctx.figureCard({ fig: fall.fig, mood: opened >= 2 ? 'froh' : opened === 1 ? 'neutral' : 'genervt', text: opened ? fall.more.slice(0, opened).join(' ') : fig.name + ': „Ja.“ … „Nein.“ … „Geht so.“', eyebrow: opened === 3 ? 'Weit offen' : opened ? 'Ein Stück offen' : 'Zu' }),
      h('p', { class: 'muted' }, picked.length ? 'Eure Fragen: ' + picked.map((p) => '„' + p.q + '“' + (p.open ? ' (offen)' : ' (Ja/Nein)')).join(', ') : 'Keine Frage gewählt.'),
    ], { eyebrow: 'Figur ' + (i + 1) + '/' + total, badge: ctx.stufe(1, LEVELS) });
    await ctx.next(w2, 'Dranbleiben');
    // Level 2: Dranbleiben – die Figur sagt etwas Persönliches. Welche Antwort bleibt beim Gefühl?
    const t = fall.tiefer;
    const opts = ctx.rshuffle(t.opts);
    const w3 = ctx.scr([
      ctx.figureCard({ fig: fall.fig, mood: 'neutral', text: t.satz, eyebrow: fig.name + ' erzählt mehr' }),
      ctx.say('Was sagt ihr jetzt? Redet kurz: Welche Antwort lässt ' + fig.name + ' weitererzählen?', { eyebrow: 'Dranbleiben', small: true }),
    ], { eyebrow: 'Figur ' + (i + 1) + '/' + total, badge: ctx.stufe(2, LEVELS) });
    const pick = await ctx.ask(w3, opts.map((o) => ({ label: o.t, value: o.k, variant: 'ghost', id: 'tief-' + o.k })));
    let tief = null;
    if (pick !== ctx.SKIP) {
      const o = t.opts.find((x) => x.k === pick);
      tief = pick;
      const gut = pick === 'gefuehl';
      if (gut) CREW.sound.play('great');
      const w4 = ctx.scr([
        h('div', { class: 'row center' }, door(gut ? 3 : 1)),
        ctx.figureCard({ fig: fall.fig, mood: gut ? 'froh' : 'neutral', text: o.a, eyebrow: TIEF_LABEL[pick] }),
        h('div', { class: 'card stack soft' }, h('b', null, gut ? 'Ihr seid beim Gefühl geblieben. Die Tür ist weit offen.' : 'Kein „falsch“ – aber das Gespräch ist zu.'),
          h('p', { class: 'muted small' }, gut ? 'Das Wort aus der Antwort aufgreifen und nachfragen: So fühlt sich jemand gehört.' : '„Ich auch“ klaut das Thema, ein schneller Ratschlag beendet es. Besser: das Gefühl aufgreifen.')),
      ], { eyebrow: 'Figur ' + (i + 1) + '/' + total, badge: ctx.stufe(2, LEVELS) });
      await ctx.next(w4, i + 1 < total ? 'Nächste Figur' : 'Weiter');
    }
    return { opened, tief };
  }

  CREW.registerGame({
    id: 'frag-weiter',
    template: 'T3',
    icon: 'chat',
    themen: ['Nachfragen', 'Zuhören', 'Grenzen'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Zu zweit an einem iPad: Erst öffnet ihr mit Nachfragen die Tür, dann bleibt ihr beim Gefühl dran. Zum Schluss live.',
        levels: LEVELS,
        steps: [
          { icon: 'users', title: 'iPad in die Mitte', text: 'Eine Person links, eine rechts.' },
          { icon: 'chat', title: 'Drei Chips wählen', text: 'Offene Fragen öffnen die Tür.' },
          { icon: 'check', title: 'Zwei Finger', text: 'Nur gemeinsam bestätigen.' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'), ctx.say('Probe: Legt beide einen Finger auf die Fläche. Kurz halten.', { eyebrow: 'Zum Ausprobieren' })], { eyebrow: 'Probe' });
          await ctx.T.twoFinger(w, { label: 'Probe: beide Finger drauf' });
        },
      });
      const faelle = ctx.rshuffle(FAELLE).slice(0, 2);
      let sum = 0, played = 0, dran = 0;
      for (let i = 0; i < faelle.length; i++) {
        const r = await runde(ctx, faelle[i], i, faelle.length);
        if (r != null) { sum += r.opened; played++; if (r.tief === 'gefuehl') dran++; }
      }
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Jetzt echt, aber harmlos: Eine Person antwortet kurz, die andere fragt weiter – offen und beim Gefühl.' });
      // Runde 2: live, harmlos, Tausch. Hand drauf entscheidet, wer zuerst antwortet.
      const w = ctx.scr([
        ctx.say('Jetzt live: Eine Person antwortet kurz auf „Was isst du gern?“. Die andere fragt weiter, bis die Tür auf ist. Dann tauschen.', { eyebrow: 'Runde 2 · echt, aber harmlos' }),
        h('p', { class: 'muted' }, 'Wer zuerst antwortet: Hand drauf.'),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Live', badge: ctx.stufe(3, LEVELS) });
      const who = await ctx.T.handOn(w, { zones: [{ id: 'links', label: 'Links antwortet zuerst' }, { id: 'rechts', label: 'Rechts antwortet zuerst' }] });
      if (who !== ctx.SKIP) {
        const w2 = ctx.scr([
          ctx.say((who === 'links' ? 'Links' : 'Rechts') + ' antwortet kurz. Die andere Person fragt dreimal nach – offen, nicht Ja/Nein. Dann tauschen.', { eyebrow: 'Live · ' + (who === 'links' ? 'Links' : 'Rechts') + ' zuerst' }),
          h('div', { class: 'row', style: { gap: '8px' } }, ['Wie …?', 'Was genau …?', 'Wie kam das?', 'Was war das Beste?', 'Wie war das für dich?'].map((x) => h('span', { class: 'chip' }, x))),
          h('p', { class: 'muted small' }, 'Tipp aus Level 2: Ein Wort aus der Antwort aufgreifen – „Du sagst, das war lustig. Was war lustig?“'),
        ], { eyebrow: 'Live', badge: ctx.stufe(3, LEVELS) });
        await ctx.next(w2, 'Beide waren dran');
      }
      // Grenzen: Welche Nachfrage willst du nicht gestellt bekommen?
      const w3 = ctx.scr([
        ctx.say('Zum Schluss, jede:r für sich: Welche Nachfrage willst du NICHT gestellt bekommen? Sagt es euch, wenn ihr wollt.', { eyebrow: 'Grenzen' }),
        h('p', { class: 'muted' }, 'Nachfragen ist Interesse. Eine Grenze ist auch eine Antwort.'),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Grenzen', badge: ctx.stufe(3, LEVELS) });
      await ctx.ask(w3, [{ label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x' }, { label: 'Fertig', value: 'done', iconRight: 'right' }]);
      return { summary: played ? 'Türen geöffnet: ' + sum + ' von ' + played * 3 + '. „Wie“ und „Was“ öffnen – beim Gefühl bleiben hält sie offen.' : 'Heute nur reingeschaut.', stats: [[sum, 'Tür-Stufen geöffnet'], [dran, 'mal beim Gefühl geblieben']] };
    },
  });
})();

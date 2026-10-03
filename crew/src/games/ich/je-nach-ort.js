/* Spiel „Je nach Ort“ (Thema: Ich – Bedürfnisse & Stärken) · Vorlage T1 Solo + Austausch · j1-e05
   Fünf Orte per Tagescode, pro Ort drei Regler (laut–leise, schnell–langsam, nah–Abstand).
   Ergebnis: fünf farbige Streifen – „du bist je nach Ort anders“. Beim Vergleich rät der Partner zuerst,
   wo ihr am weitesten auseinander liegt. „Anders“, nie „richtiger“. Nichts wird gespeichert. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const ORTE = [
    { id: 'fussball', name: 'Fußballplatz', colour: 'var(--good)', icon: 'bolt' },
    { id: 'arzt', name: 'Arztpraxis', colour: 'var(--teamA)', icon: 'heart' },
    { id: 'essen', name: 'Familienessen', colour: 'var(--yellow)', icon: 'users' },
    { id: 'chat', name: 'Gruppenchat', colour: 'var(--teamB)', icon: 'chat' },
    { id: 'klasse', name: 'Neue Klasse', colour: 'var(--accent)', icon: 'star' },
    { id: 'bus', name: 'Im Bus', colour: '#b48bff', icon: 'right' },
    { id: 'pause', name: 'Pausenhof', colour: '#4cc9f0', icon: 'sparkle' },
    { id: 'kino', name: 'Kino mit Freunden', colour: '#ffb020', icon: 'eye' },
  ];
  const REGLER = [
    { id: 'laut', links: 'leise', rechts: 'laut' },
    { id: 'tempo', links: 'langsam', rechts: 'schnell' },
    { id: 'nah', links: 'Abstand', rechts: 'nah dran' },
  ];

  // Ein Ort mit drei Reglern. Werte nur im RAM. Regler starten „leer“ (grau), bis man sie anfasst.
  function ortScreen(ctx, ort, i, total, values) {
    const rows = REGLER.map((r) => {
      const inp = h('input', { type: 'range', min: '0', max: '100', value: '50', 'aria-label': r.links + ' bis ' + r.rechts, 'data-regler': r.id });
      const row = h('div', { class: 'slider-row empty' }, h('span', null, r.links), inp, h('span', null, r.rechts));
      inp.addEventListener('input', () => { row.classList.remove('empty'); values[r.id] = Number(inp.value); });
      if (ctx.auto) { inp.value = String(Math.floor(ctx.autoRng() * 101)); row.classList.remove('empty'); values[r.id] = Number(inp.value); }
      return row;
    });
    const wrap = ctx.scr([
      h('div', { class: 'fig-card', style: { '--fc': ort.colour } },
        h('div', { class: 'fig-side' }, h('span', { class: 'game-ic', style: { '--tc': ort.colour, width: '72px', height: '72px' } }, CREW.icon(ort.icon, 40))),
        h('div', { class: 'fig-body' },
          h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Ort ' + (i + 1) + ' von ' + total), ctx.readBtn('Ort: ' + ort.name + '. Wie bist du hier? Leise oder laut, langsam oder schnell, Abstand oder nah dran?')),
          h('div', { class: 'fig-text' }, ort.name),
          h('p', { class: 'muted' }, 'Wie bist du hier meistens? Schieb die Regler.'),
          h('div', { class: 'stack' }, rows))),
    ], { eyebrow: 'Ort ' + (i + 1) + '/' + total });
    return ctx.next(wrap, i + 1 < total ? 'Nächster Ort' : 'Fertig');
  }

  // Fünf Streifen: pro Ort die drei Werte als Balken
  function stripes(orte, all) {
    return h('div', { class: 'stripes' }, orte.map((o) => {
      const v = all[o.id] || {};
      return h('div', { class: 'stripe' }, h('b', { class: 'small' }, o.name),
        h('div', { class: 'stripe-bar', style: { '--sc': o.colour }, 'aria-label': o.name }, REGLER.map((r) => h('i', { style: { width: (v[r.id] == null ? 0 : Math.max(4, v[r.id] / 3)) + '%', opacity: v[r.id] == null ? 0.2 : 1 }, title: r.rechts + ': ' + (v[r.id] == null ? '–' : v[r.id]) }))));
    }));
  }

  CREW.registerGame({
    id: 'je-nach-ort',
    template: 'T1',
    icon: 'star',
    themen: ['Selbstbild', 'Vielfalt', 'Situationen'],
    safety: ['figuren', 'freiwillig'],
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Fünf Orte, drei Regler: Wie bist du dort? Danach vergleichst du zu zweit. Anders ist nie falsch.',
        steps: [
          { icon: 'phone', title: 'Allein tippen', text: 'Pro Ort drei Regler. Bleibt nur im Gerät.' },
          { icon: 'users', title: 'Farbe finden', text: 'Blau findet Blau. Setzt euch zusammen.' },
          { icon: 'chat', title: 'Vergleichen', text: 'Erst raten, dann reden. Pass ist okay.' },
        ],
        probe: async () => {
          const w = ctx.scr([h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'), ctx.say('Probe-Ort: Dein Zimmer. Schieb einen Regler hin und her.', { eyebrow: 'Zum Ausprobieren' }),
            h('div', { class: 'slider-row empty' }, h('span', null, 'leise'), h('input', { type: 'range', min: '0', max: '100', value: '50', 'aria-label': 'Probe-Regler' }), h('span', null, 'laut'))], { eyebrow: 'Probe' });
          await ctx.next(w, 'Verstanden');
        },
      });
      await ctx.T.codeCheck();
      // Dieselben fünf Orte auf allen iPads (Tagescode)
      const orte = ctx.rshuffle(ORTE).slice(0, 5);
      const all = {};
      let done = 0;
      for (let i = 0; i < orte.length; i++) {
        const values = {};
        const r = await ortScreen(ctx, orte[i], i, orte.length, values);
        if (r === ctx.SKIP) continue;
        all[orte[i].id] = values;
        done++;
      }
      // Ergebnis: fünf Streifen
      const w = ctx.scr([
        ctx.say('Du bist je nach Ort anders. Das ist normal und klug.', { eyebrow: 'Dein Muster' }),
        h('div', { class: 'card stack' }, stripes(orte, all), h('p', { class: 'muted small' }, 'Jeder Streifen: leise–laut, langsam–schnell, Abstand–nah.')),
      ], { eyebrow: 'Ergebnis' });
      await ctx.next(w, 'Zum Austausch');
      // Austausch: Farbe finden, Vergleichskarte
      await ctx.T.pairScreen();
      await ctx.T.vergleich({
        title: 'Je nach Ort',
        items: orte.map((o) => { const v = all[o.id]; return { label: o.name, el: h('span', { class: 'vk-ic', style: { background: o.colour } }, CREW.icon(o.icon, 24)), text: v ? REGLER.map((r) => (v[r.id] == null ? '–' : v[r.id] > 60 ? r.rechts : v[r.id] < 40 ? r.links : 'mittel')).join(' · ') : 'gepasst' }; }),
        questions: ['Rate zuerst: Bei welchem Ort liegt ihr am weitesten auseinander?', 'Wo bist du ganz anders als sonst? Warum wohl?'],
        note: 'Anders, nie richtiger. Wer nicht will, passt.',
      });
      return { summary: done ? 'Fünf Orte, ein Mensch. Je nach Ort anders.' : 'Heute nur reingeschaut. Auch okay.', stats: [[done, 'Orte angeschaut']] };
    },
  });
})();

/* Mission Montag: „Wer steht?“ (Karten „Steh auf, wenn …“) + Schätzrunde.
   Idee aus den ISA-Materialien (Kennenlern-Spiel), erweitert um eine Schätzrunde.
   Ablauf pro Karte: Jede:r tippt die Schätzung auf der Antwort-Karte ein und drückt „Fertig“ (gesperrt)
   → „Aufstehen!“ → Lehrkraft tippt einmal, wie viele stehen (groß am Beamer)
   → „Zeigt her!“ → Lehrkraft zählt nur Volltreffer und 1 daneben → Sterne für die Crew. */
(function () {
  const CREW = window.CREW;

  CREW.registerMission({
    id: 'stehauf',
    day: 1,
    title: 'Wer steht?',
    tagline: 'Wie gut kennst du deine Crew?',
    hook: 'Schätzen · Goldene Karte · Blitzrunde',
    color: '#e0a100',
    minutes: 5,
    themes: ['Zusammenhalt', 'Fremdwahrnehmung', 'Selbstwahrnehmung'],
    etep: 'III–IV',
    eldib: [
      { code: 'K-15', text: 'erzählt von sich selbst' },
      { code: 'K-20', text: 'beschreibt Eigenschaften anderer' },
      { code: 'SOZ-31', text: 'merkt, dass er/sie anders handelt als andere' },
      { code: 'SOZ-32', text: 'hört zu und respektiert andere Meinungen' },
    ],
    teacherNote: '3 Karten, die dritte ist golden (Sterne ×2), danach eine Blitzrunde ohne Schätzen. Pro Karte: 1) Alle tippen geheim auf der Antwort-Karte (Zahl 0–10) ein, wie viele gleich aufstehen, und drücken „Fertig“. Die Zahl ist dann gesperrt und verdeckt. 2) Auf „Aufstehen!“ steht auf, für wen der Satz stimmt – nicht wegen der eigenen Schätzung. Du tippst die Zahl an, wie viele stehen (keine Namen). Die Zahl erscheint groß. 3) Auf „Zeigt her!“ tippen alle auf ZEIGEN. Du zählst nur zwei Dinge: Volltreffer (genau richtig) und 1 daneben. Genau = ★★, 1 daneben = ★. Alle Sterne gehören der Crew. Aufstehen ist freiwillig. Wer steht, darf etwas erzählen, muss aber nicht.',
    debrief: [
      'Was hat euch heute überrascht?',
      'Mit wem hattest du heute etwas gemeinsam, das du nicht erwartet hast?',
      'Wie fühlt es sich an, aufzustehen, wenn nur wenige stehen?',
      'Warum schätzen wir andere manchmal falsch ein?',
      'Welche Karte hat heute gefehlt? Denkt euch eine für nächstes Mal aus.',
      'Woran merkt man, dass jemand etwas lieber nicht vor der Gruppe sagen will?',
    ],

    async run(ctx) {
      const { h, ui } = ctx;
      const N = ctx.crewSize;
      const ROUNDS = 3;
      const cards = ctx.pick('stehauf', ROUNDS + 3);
      const main = cards.slice(0, ROUNDS);
      const blitz = cards.slice(ROUNDS);
      let pts = 0;
      let maxPts = 0;
      let played = 0;
      let hitsAll = 0;
      const clean = (t) => t.replace(/^…\s*/, '');
      const stars = (n, cls) => h('span', { class: 'sa-stars' + (cls ? ' ' + cls : ''), 'aria-label': n + ' Sterne' }, Array.from({ length: n }, () => CREW.icon('star', 26)));
      // Punkte-Regel, immer sichtbar
      const scoreStrip = (gold) => h('div', { class: 'sa-score' + (gold ? ' gold' : '') },
        h('span', { class: 'sa-score-item' }, h('b', null, 'Genau richtig'), stars(2)),
        h('span', { class: 'sa-score-item' }, h('b', null, '1 daneben'), stars(1)),
        h('span', { class: 'muted' }, gold ? 'Goldene Karte: Sterne ×2 · alles für die Crew' : 'für die Crew'));
      // Knöpfe, die eine Zahl liefern (Lehrkraft tippt einmal)
      const numberRow = (from, to, id) => {
        let done;
        const p = new Promise((res) => { done = res; });
        const row = h('div', { class: 'sa-numrow', id }, Array.from({ length: to - from + 1 }, (_, k) => {
          const v = from + k;
          return ui.btn(String(v), () => done(v), { variant: 'ghost', cls: 'sa-numbtn', aria: v + ' stehen' });
        }));
        return { el: row, value: p };
      };

      for (let i = 0; i < main.length; i++) {
        if (!ctx.roundGate(i, main.length)) break;
        const card = main[i];
        const gold = i === main.length - 1 && main.length > 1;
        const full = 'Steh auf, wenn du ' + clean(card.text);

        // 1) Karte + „So geht's“: schätzen, Fertig drücken
        if (gold) CREW.sound.play('unlock');
        const w1 = ctx.screen([
          ui.say(h('span', null, h('span', { class: 'muted' }, 'Steh auf, wenn du '), clean(card.text)), { speakText: full, eyebrow: gold ? 'Goldene Karte · Sterne ×2' : 'Karte ' + (i + 1) + ' von ' + main.length, cls: 'sa-card' + (gold ? ' sa-gold' : '') }),
          h('div', { class: 'sa-how' }, ui.steps([
            { icon: 'phone', title: 'Schätzen', text: 'Wie viele von euch ' + N + ' stehen gleich auf? Tipp deine Schätzung auf deinem iPad ein und drück Fertig.', extra: ui.paddleHint('zahl') },
            { icon: 'users', title: 'Aufstehen', text: 'Auf „Aufstehen!“ steht auf, für wen der Satz stimmt.' },
            { icon: 'eye', title: 'Zeigt her!', text: 'Alle zeigen ihre Zahl. Wer trifft, holt Sterne.' },
          ], { row: true, enter: i === 0 })),
          scoreStrip(gold),
          h('p', { class: 'sa-honest' }, h('b', null, 'Steh nur auf, wenn’s für dich stimmt – nicht wegen der Zahl.'), ' Sitzen bleiben ist immer okay.'),
        ]);
        w1.classList.add('sa-wrap');
        const r1 = await ctx.waitFor(ui.choice(w1, [{ label: 'Alle sind fertig', value: 'go', iconRight: 'right', id: 'sa-ready' }]));
        if (r1 === ctx.SKIP) continue;

        // 2) Aufstehen: Lehrkraft tippt einmal die Zahl, die steht (keine Namen)
        await ui.threeTwoOne('Aufstehen!');
        let standing = null;
        while (standing === null) {
          const nr = numberRow(0, N, 'sa-standrow');
          const w2 = ctx.screen([
            h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Aufstehen'), ui.teacherLine('Tippt die Zahl an, wie viele stehen')),
            h('h2', null, 'Wie viele stehen?'),
            nr.el,
            h('p', { class: 'muted' }, 'Nur die Anzahl. Keine Namen.'),
          ], { center: true });
          ui.revealRow(nr.el);
          const r2 = await ctx.waitFor(nr.value);
          if (r2 === ctx.SKIP) break;
          CREW.sound.play('reveal');
          // Die Zahl groß am Beamer
          const w3 = ctx.screen([
            h('span', { class: 'eyebrow' }, 'So viele stehen'),
            h('div', { class: 'sa-bignum pop' }, String(r2)),
            h('h2', null, r2 === 1 ? '1 von ' + N + ' steht.' : r2 + ' von ' + N + ' stehen.'),
            h('p', { class: 'lead muted' }, 'Merkt euch die Zahl. Setzt euch wieder.'),
          ], { center: true });
          const r3 = await ctx.waitFor(ui.choice(w3, [
            { label: 'Zahl ändern', value: 'fix', variant: 'ghost', icon: 'undo' },
            { label: 'Zeigt her!', value: 'go', iconRight: 'eye', id: 'sa-show' }]));
          if (r3 === ctx.SKIP) break;
          if (r3 === 'go') standing = r2;
        }
        if (standing === null) continue;

        // 3) Zeigt her! Lehrkraft zählt nur Volltreffer und 1 daneben
        await ui.threeTwoOne('Zeigt her!');
        const mult = gold ? 2 : 1;
        const nearNums = [standing - 1, standing + 1].filter((v) => v >= 0 && v <= 10);
        const cnt = { exact: 0, near: 0 };
        const preview = h('b', null, '');
        const upd = () => {
          const s = (cnt.exact * 2 + cnt.near) * mult;
          preview.textContent = '= ' + s + (s === 1 ? ' Stern' : ' Sterne') + ' für die Crew';
        };
        const counter = (key, title, sub, nStars) => {
          const val = h('div', { class: 'val sa-cval', 'aria-live': 'polite' }, '0');
          const set = (v) => {
            const other = key === 'exact' ? cnt.near : cnt.exact;
            const nv = Math.max(0, Math.min(v, N - other));
            if (nv > cnt[key]) CREW.sound.play('tick');
            cnt[key] = nv;
            val.textContent = String(nv);
            upd();
          };
          return h('div', { class: 'sa-counter card', 'data-count': key },
            h('div', { class: 'stack', style: { gap: '4px' } }, h('b', { class: 'sa-ctitle' }, title, ' ', stars(nStars)), h('span', { class: 'muted' }, sub)),
            h('div', { class: 'stepper' },
              ui.iconBtn('minus', () => set(cnt[key] - 1), { label: title + ' weniger', id: 'sa-' + key + '-minus' }),
              val,
              ui.iconBtn('plus', () => set(cnt[key] + 1), { label: title + ' mehr', id: 'sa-' + key + '-plus' })));
        };
        upd();
        const w4 = ctx.screen([
          h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Zeigt her!'), ui.teacherLine('Zählt nur diese zwei')),
          h('div', { class: 'sa-target' },
            h('div', { class: 'sa-bignum small' }, String(standing)),
            h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Richtige Zahl'), h('h2', null, standing + ' von ' + N + ' standen'))),
          h('div', { class: 'sa-counters' },
            counter('exact', 'Volltreffer', 'Zahl genau ' + standing, 2),
            counter('near', '1 daneben', 'Zahl ' + nearNums.join(' oder '), 1)),
          h('p', { class: 'lead', style: { textAlign: 'center' } }, preview, gold ? h('span', { class: 'muted' }, ' (Goldene Karte ×2)') : null),
        ]);
        const r4 = await ctx.waitFor(ui.choice(w4, [{ label: 'Auflösen', value: 'go', iconRight: 'right', id: 'sa-reveal' }]));
        if (r4 === ctx.SKIP) continue;

        // 4) Auflösung: Sterne für die Crew
        const exact = cnt.exact;
        const near = cnt.near;
        const got = (exact * 2 + near) * mult;
        const starRow = h('div', { class: 'sa-starrow' }, Array.from({ length: got }, (_, k) => h('span', { class: 'sa-star', style: { animationDelay: (k * 90) + 'ms' } }, CREW.icon('star', 44))));
        const verdict = h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center' } },
          h('div', { class: 'row center' },
            h('span', { class: 'pill good' }, exact + ' × Volltreffer'),
            h('span', { class: 'pill' }, near + ' × 1 daneben'),
            h('span', { class: 'pill accent' }, '+' + got + ' Crew-Punkte' + (gold ? ' (×2)' : ''))),
          h('p', { class: 'lead' }, standing === 0 ? 'Niemand. Auch das sagt etwas über die Crew.' : standing === N ? 'Alle! Da habt ihr etwas gemeinsam.' : 'Wer steht, darf was sagen. Muss aber nicht.'));
        const w5 = ctx.screen([
          h('span', { class: 'eyebrow' }, 'Auflösung'),
          h('h2', null, standing + ' von ' + N + ' standen'),
          got ? starRow : h('p', { class: 'lead muted' }, 'Diesmal keine Sterne. Nächste Karte!'),
          verdict,
        ], { center: true });
        CREW.sound.play('reveal');
        if (exact) { CREW.sound.play('great'); ui.confetti(exact * 40); }
        pts += got;
        maxPts += 2 * N * mult;
        hitsAll += exact;
        played++;
        const r5 = await ctx.waitFor(ui.choice(w5, [{ label: i < main.length - 1 ? 'Nächste Karte' : 'Weiter', value: 'go', iconRight: 'right' }]));
        if (r5 === ctx.SKIP) continue;
      }

      // Blitzrunde: drei Sätze, je 5 Sekunden, ohne Schätzen
      if (blitz.length && ctx.minutesLeft() > 4) {
        const wb = ctx.screen([
          h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center' } }, h('span', { class: 'eyebrow' }, 'Blitzrunde'), h('h2', null, 'Drei Sätze. Je 5 Sekunden. Nur aufstehen.')),
        ], { center: true });
        const rb = await ctx.waitFor(ui.choice(wb, [{ label: 'Los!', value: 'go', iconRight: 'play' }]));
        if (rb !== ctx.SKIP) {
          for (const b of blitz) {
            ctx.screen([
              h('span', { class: 'eyebrow' }, 'Blitzrunde'),
              ui.say(h('span', null, h('span', { class: 'muted' }, 'Steh auf, wenn du '), clean(b.text)), { speakText: 'Steh auf, wenn du ' + clean(b.text) }),
              h('div', { class: 'sa-fuse' }),
            ], { center: true });
            CREW.sound.play('go');
            await ctx.sleep(5000);
          }
        }
      }

      const acc = maxPts ? pts / maxPts : 0;
      const energy = played ? 4 + Math.round(6 * Math.min(1, acc * 1.5)) : 3;
      let summary = 'Gut gespielt!';
      if (acc >= 0.45) summary = 'Ihr kennt euch richtig gut!';
      else if (acc >= 0.25) summary = 'Ihr kennt euch schon ganz gut.';
      else if (played) summary = 'Ihr habt heute viel Neues übereinander erfahren.';
      return { energy, summary, points: pts, stats: played ? [[hitsAll, 'Volltreffer']] : [] };
    },
  });
})();

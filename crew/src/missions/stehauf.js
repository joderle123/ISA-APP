/* Mission Montag: „Wer steht?“ (Karten „Steh auf, wenn …“) + Schätzrunde.
   Idee aus den ISA-Materialien (Kennenlern-Spiel), erweitert um eine Schätzrunde:
   Wer die Crew richtig einschätzt, bringt Energie. */
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
    teacherNote: '3 Karten, die dritte ist golden (Punkte ×2), danach eine Blitzrunde ohne Schätzen. Pro Karte: Alle schätzen geheim auf der Antwort-Karte (Zahl), wie viele gleich aufstehen. Auf „Aufstehen!“ stehen alle auf, für die der Satz stimmt. Du tippst so viele Figuren an, wie stehen (keine Namen). Dann zeigen alle ihre Schätzung, du tippst die Zahlen ein. Das Spiel wertet selbst aus: genau = +2, ±1 = +1. Aufstehen ist freiwillig. Wer steht, darf etwas erzählen, muss aber nicht.',
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

      for (let i = 0; i < main.length; i++) {
        if (!ctx.roundGate(i, main.length)) break;
        const card = main[i];
        const gold = i === main.length - 1 && main.length > 1;
        const full = 'Steh auf, wenn du ' + clean(card.text);

        // 1) Karte + geheim schätzen
        if (gold) CREW.sound.play('unlock');
        const w1 = ctx.screen([
          h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, gold ? 'Goldene Karte · Punkte ×2' : 'Karte ' + (i + 1) + ' von ' + main.length), ui.paddleHint('zahl', 'Schätzen')),
          ui.say(h('span', null, h('span', { class: 'muted' }, 'Steh auf, wenn du '), clean(card.text)), { speakText: full, cls: gold ? 'sa-gold' : '' }),
          h('p', { class: 'lead' }, 'Schätzt geheim: Wie viele von euch ', h('b', null, N), ' stehen gleich auf?'),
          h('p', { class: 'muted' }, 'Sitzen bleiben ist immer okay. Keiner muss was erklären.'),
        ]);
        const r1 = await ctx.waitFor(ui.choice(w1, [{ label: 'Alle haben geschätzt', value: 'go', iconRight: 'right' }]));
        if (r1 === ctx.SKIP) continue;

        // 2) Aufstehen: Lehrkraft tippt die Figuren an, die stehen (nur Anzahl, keine Namen)
        await ui.threeTwoOne('Aufstehen!');
        let standing = 0;
        const people = Array.from({ length: N }, () => {
          const b = h('button', { type: 'button', class: 'sa-person', 'aria-pressed': 'false', 'aria-label': 'Figur' }, CREW.icon('user', 48));
          b.addEventListener('click', () => {
            const up = b.getAttribute('aria-pressed') !== 'true';
            b.setAttribute('aria-pressed', String(up));
            b.classList.toggle('up', up);
            standing += up ? 1 : -1;
            CREW.sound.play(up ? 'tick' : 'tap');
            cnt.textContent = String(standing);
          });
          return b;
        });
        const cnt = h('b', { class: 'display' }, '0');
        const w2 = ctx.screen([
          h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Wer steht?'), ui.scanBar()),
          h('h2', null, 'Tippe so viele Figuren an, wie gerade stehen.'),
          h('div', { class: 'sa-crowd' }, people),
          h('p', { class: 'lead', style: { textAlign: 'center' } }, 'Stehen: ', cnt),
        ]);
        const r2 = await ctx.waitFor(ui.choice(w2, [{ label: 'Weiter', value: 'go', iconRight: 'right', id: 'sa-standing' }]));
        if (r2 === ctx.SKIP) continue;

        // 3) Schätzungen zeigen
        await ui.threeTwoOne('Zeigt eure Schätzung!');
        const vp = ui.valuePad({ count: N, min: 0, max: N, placeholder: 'Tippe die gezeigten Zahlen ein …', onFull: () => ui.autoNext('sa-reveal', () => vp.get().length >= N) });
        const w3 = ctx.screen([
          h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Schätzungen'), ui.scanBar()),
          h('h2', null, 'Welche Zahlen seht ihr?'),
          h('div', { class: 'card' }, vp.el),
        ]);
        const r3 = await ctx.waitFor(ui.choice(w3, [{ label: 'Auflösen', value: 'go', iconRight: 'right', id: 'sa-reveal' }]));
        if (r3 === ctx.SKIP) continue;
        const guesses = vp.get();

        // 4) Auflösung: Zahlenstrahl mit allen Schätzungen, der Ball fällt auf die echte Zahl
        const exact = guesses.filter((g) => g === standing).length;
        const near = guesses.filter((g) => Math.abs(g - standing) === 1).length;
        const mult = gold ? 2 : 1;
        const got = (exact * 2 + near) * mult;
        const cols = Array.from({ length: N + 1 }, (_, v) => h('div', { class: 'sa-col' + (v === standing ? ' real' : '') },
          h('div', { class: 'sa-chips' }, guesses.filter((g) => g === v).map(() => h('span', { class: 'sa-chip' }))),
          h('span', { class: 'sa-num' }, String(v))));
        const ball = h('div', { class: 'sa-ball', style: { left: 'calc(' + ((standing + 0.5) / (N + 1)) * 100 + '% - 20px)' } });
        const line = h('div', { class: 'sa-line' }, cols, ball);
        const verdict = h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center', visibility: 'hidden' } },
          h('h2', null, standing + ' von ' + N + ' stehen'),
          h('div', { class: 'row center' },
            h('span', { class: 'pill good' }, exact + ' × Volltreffer'),
            h('span', { class: 'pill' }, near + ' × knapp'),
            h('span', { class: 'pill accent' }, '+' + got + ' Crew-Punkte' + (gold ? ' (×2)' : ''))),
          h('p', { class: 'lead' }, standing === 0 ? 'Niemand. Auch das sagt etwas über die Crew.' : standing === N ? 'Alle! Da habt ihr etwas gemeinsam.' : 'Wer steht, darf was sagen. Muss aber nicht.'));
        const w4 = ctx.screen([
          h('span', { class: 'eyebrow' }, 'Auflösung'),
          line,
          verdict,
        ], { center: true });
        CREW.sound.play('drum');
        await ctx.sleep(900);
        ball.classList.add('drop');
        CREW.sound.play('reveal');
        await ctx.sleep(500);
        verdict.style.visibility = '';
        verdict.classList.add('pop');
        if (exact) { CREW.sound.play('great'); ui.confetti(exact * 40); }
        pts += got;
        maxPts += 2 * N * mult;
        hitsAll += exact;
        played++;
        const r4 = await ctx.waitFor(ui.choice(w4, [{ label: i < main.length - 1 ? 'Nächste Karte' : 'Weiter', value: 'go', iconRight: 'right' }]));
        if (r4 === ctx.SKIP) continue;
      }

      // Blitzrunde: drei Sätze, je 5 Sekunden, ohne Schätzen
      if (blitz.length && ctx.minutesLeft() > 4) {
        const w5 = ctx.screen([
          h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center' } }, h('span', { class: 'eyebrow' }, 'Blitzrunde'), h('h2', null, 'Drei Sätze. Je 5 Sekunden. Nur aufstehen.')),
        ], { center: true });
        const r5 = await ctx.waitFor(ui.choice(w5, [{ label: 'Los!', value: 'go', iconRight: 'play' }]));
        if (r5 !== ctx.SKIP) {
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

/* Mission Montag: „Steh auf, wenn …“ + Schätzrunde.
   Idee aus den ISA-Materialien (Kennenlern-Spiel), erweitert um eine Schätzrunde:
   Wer die Crew richtig einschätzt, bringt Energie. */
(function () {
  const CREW = window.CREW;

  CREW.registerMission({
    id: 'stehauf',
    day: 1,
    title: 'Steh auf, wenn …',
    tagline: 'Wie gut kennst du deine Crew?',
    minutes: 7,
    themes: ['Zusammenhalt', 'Fremdwahrnehmung', 'Selbstwahrnehmung'],
    etep: 'III–IV',
    eldib: [
      { code: 'K-15', text: 'erzählt von sich selbst' },
      { code: 'K-20', text: 'beschreibt Eigenschaften anderer' },
      { code: 'SOZ-31', text: 'merkt, dass er/sie anders handelt als andere' },
      { code: 'SOZ-32', text: 'hört zu und respektiert andere Meinungen' },
    ],
    teacherNote: 'Pro Karte: Erst schätzen alle geheim auf der Antwort-Karte (Zahl), wie viele gleich aufstehen. Dann stehen alle auf, für die der Satz stimmt. Du tippst ein, wie viele stehen und wie viele richtig geschätzt haben (±1 zählt). Aufstehen ist freiwillig. Wer steht, darf etwas erzählen, muss aber nicht.',
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
      const ROUNDS = 5;
      const cards = ctx.pick('stehauf', ROUNDS);
      let right = 0;
      let possible = 0;
      let played = 0;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const full = 'Steh auf, wenn du ' + card.text.replace(/^…\s*/, '');

        // 1) Schätzen
        const w1 = ctx.screen([
          h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Karte ' + (i + 1) + ' von ' + cards.length), ui.paddleHint('zahl', 'Schätzen')),
          ui.say(h('span', null, h('span', { class: 'muted' }, 'Steh auf, wenn du '), card.text.replace(/^…\s*/, '')), { speakText: full }),
          h('p', { class: 'lead' }, 'Schätzt heimlich: Wie viele von euch ', h('b', null, N), ' stehen gleich auf?'),
        ]);
        const r1 = await ctx.waitFor(ui.choice(w1, [{ label: 'Alle haben geschätzt', value: 'go', iconRight: 'right' }]));
        if (r1 === ctx.SKIP) continue;

        // 2) Aufstehen
        await ui.threeTwoOne('Aufstehen!');
        const st = ui.stepper({ value: Math.round(N / 2), min: 0, max: N });
        const w2 = ctx.screen([
          h('span', { class: 'eyebrow' }, 'Wer steht?'),
          h('h2', null, 'Wie viele stehen gerade?'),
          st.el,
        ], { center: true });
        const r2 = await ctx.waitFor(ui.choice(w2, [{ label: 'Auflösen', value: 'go', iconRight: 'right' }]));
        if (r2 === ctx.SKIP) continue;
        const standing = st.get();

        // 3) Auflösung
        const big = h('div', { class: 'countdown-big', style: { animation: 'none' } }, '0');
        const correct = ui.stepper({ value: 0, min: 0, max: N });
        const w3 = ctx.screen([
          h('span', { class: 'eyebrow' }, 'Auflösung'),
          h('div', { class: 'row center' }, big, h('span', { class: 'display', style: { fontSize: '2em' } }, 'von ' + N)),
          h('p', { class: 'lead' }, standing === 0 ? 'Niemand. Auch das sagt etwas über die Crew.' : standing === N ? 'Alle! Da habt ihr etwas gemeinsam.' : standing === 1 ? 'Nur eine Person. Respekt fürs Aufstehen!' : 'Wer steht, darf kurz etwas dazu sagen. Muss aber nicht.'),
          h('div', { class: 'card stack', style: { alignItems: 'center' } }, h('b', null, 'Wie viele lagen mit ihrer Schätzung richtig? (±1 zählt)'), correct.el),
        ], { center: true });
        CREW.sound.play('drum');
        await ctx.sleep(700);
        CREW.sound.play('reveal');
        await ui.countUp(big, 0, standing, 700);
        const r3 = await ctx.waitFor(ui.choice(w3, [{ label: i < cards.length - 1 ? 'Nächste Karte' : 'Fertig', value: 'go', iconRight: 'right' }]));
        if (r3 === ctx.SKIP) continue;
        right += correct.get();
        possible += N;
        played++;
        if (correct.get() >= Math.ceil(N / 2)) { CREW.sound.play('great'); ui.toast('Ihr kennt euch gut!'); }
      }

      const acc = possible ? right / possible : 0;
      const energy = played ? 4 + Math.round(6 * acc) : 3;
      let summary = 'Gut gespielt!';
      if (acc >= 0.7) summary = 'Ihr kennt euch richtig gut!';
      else if (acc >= 0.4) summary = 'Ihr kennt euch schon ganz gut.';
      else if (played) summary = 'Ihr habt heute viel Neues übereinander erfahren.';
      return { energy, summary };
    },
  });
})();

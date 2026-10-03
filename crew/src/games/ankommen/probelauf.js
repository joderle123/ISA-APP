/* Spiel „Probelauf“ (Thema: Ankommen & Crew) · Vorlage T6 Beamer-Gruppe · j1-e01
   Drei harmlose Fragen am Beamer (Lieblingsessen, Spiel, Wetter). Die einzige Regel: Jede:r passt einmal,
   zieht einmal die X-Karte und sagt einmal „Stopp“. Das Spiel tut dann sichtbar NICHTS: Die Karte verschwindet,
   kein Kommentar, kein Punkt. Die Crew erlebt in Stunde 1, dass Passen wirklich folgenlos ist.
   Nur die Lehrkraft tippt „Weiter“ – den Stopp-Knopf darf jede:r drücken. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  /* Harmlose Fragen – es gibt keine falsche Antwort, und keine Antwort ist auch eine Antwort */
  const FRAGEN = [
    { icon: 'heart', text: 'Welches Essen könntest du jeden Tag essen?', fig: 'sam', bsp: 'Sam: „Nudeln mit nix. Ehrlich.“' },
    { icon: 'play', text: 'Welches Spiel hast du zuletzt gespielt – egal ob Handy, Konsole oder draußen?', fig: 'luca', bsp: 'Luca: „Fußball im Hof, bis es dunkel war.“' },
    { icon: 'sparkle', text: 'Welches Wetter magst du am liebsten?', fig: 'yara', bsp: 'Yara: „Regen, wenn ich drinnen bin.“' },
    { icon: 'star', text: 'Welche Farbe würdest du für die Wand hier wählen?', fig: 'mika', bsp: 'Mika: „Dunkelgrün. Oder schwarz.“' },
    { icon: 'sound', text: 'Welches Lied läuft bei dir gerade oft?', fig: 'sam', bsp: 'Sam: „Eins, das keiner kennt.“' },
    { icon: 'leaf', text: 'Lieber Berge oder Meer?', fig: 'luca', bsp: 'Luca: „Meer. Wegen dem Geräusch.“' },
    { icon: 'bolt', text: 'Welches Tier wärst du für einen Tag?', fig: 'yara', bsp: 'Yara: „Katze. Schlafen, wo die Sonne ist.“' },
    { icon: 'timer', text: 'Frühaufsteher oder Nachtmensch?', fig: 'mika', bsp: 'Mika: „Nacht. Morgens bin ich nicht ansprechbar.“' },
    { icon: 'phone', text: 'Welche App hast du heute als Erstes geöffnet?', fig: 'sam', bsp: 'Sam: „Die mit den Katzenvideos.“' },
    { icon: 'users', text: 'Mit wem würdest du gern mal einen Tag tauschen – Figur oder Promi?', fig: 'luca', bsp: 'Luca: „Mit einem Astronauten. Einen Tag Schwerelosigkeit.“' },
  ];

  /* Drei Dinge, die jede:r heute einmal ausprobiert – ohne Zählen, ohne Namen */
  const AUFGABEN = [
    { icon: 'x', title: 'Einmal Pass', text: 'Der Pass-Knopf auf der Karte. Die Frage geht ohne dich weiter.' },
    { icon: 'shield', title: 'Einmal X-Karte', text: 'Das X oben rechts. Die Karte ist weg. Kein Grund nötig.' },
    { icon: 'pause', title: 'Einmal „Stopp“', text: 'Laut sagen oder den roten Knopf drücken. Alles hält an.' },
  ];

  /* Die Frage-Karte: groß am Beamer, Figur zeigt ein Beispiel */
  function frageCard(ctx, f, i, total) {
    return h('div', { class: 'stack' },
      h('div', { class: 'bigcard enter' },
        h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, 'Frage ' + (i + 1) + ' von ' + total), ctx.readBtn(f.text)),
        h('div', { class: 'row', style: { gap: '16px', alignItems: 'flex-start' } },
          h('span', { class: 'game-ic', style: { width: '64px', height: '64px' } }, CREW.icon(f.icon, 36)),
          h('div', { class: 'say' }, f.text))),
      ctx.figureCard({ fig: f.fig, mood: 'froh', text: f.bsp, eyebrow: 'Zum Beispiel', size: 72 }),
      h('p', { class: 'muted' }, 'Reihum, wer mag: ein Satz. Oder Pass. Oder X. Oder Stopp.'));
  }

  /* Das sichtbare Nichts: Die Karte ist weg. Keine Nachfrage, kein Kommentar, kein Punkt. */
  async function nichts(ctx, art) {
    const txt = art === 'stopp' ? 'Stopp. Alles hält an.' : art === 'x' ? 'X gezogen. Karte weg.' : 'Pass. Karte weg.';
    const w = ctx.scr([
      h('div', { class: 'stack probe-nichts' },
        h('div', { class: 'stop-big display', style: { color: art === 'stopp' ? 'var(--teamB)' : 'var(--muted)' } }, art === 'stopp' ? 'Stopp!' : '…'),
        h('h2', null, txt),
        h('p', { class: 'muted' }, 'Und jetzt? Nichts. Keine Nachfrage, kein Kommentar, kein Punkt.')),
    ], { eyebrow: 'Nichts passiert', center: true });
    await ctx.hold(900);
    return ctx.next(w, 'Nächste Karte');
  }

  CREW.registerGame({
    id: 'probelauf',
    template: 'T6',
    icon: 'shield',
    themen: ['Sicherheit', 'Stopp-Recht', 'Passen', 'Regeln'],
    safety: ['freiwillig'],
    help: false,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Drei harmlose Fragen. Jede:r passt heute einmal, zieht einmal das X und sagt einmal „Stopp“. Das Spiel tut dann: nichts.',
        steps: AUFGABEN,
        probe: async () => {
          const w = ctx.scr([
            h('div', { class: 'probe-tag' }, 'PROBE · zählt nicht · 10 Sekunden'),
            ctx.say('Probe: Tippt unten auf Pass oder oben auf das X. Schaut, was passiert.', { eyebrow: 'Zum Ausprobieren' }),
            h('p', { class: 'muted' }, 'Spoiler: nichts. Die Karte geht einfach weg.'),
          ], { eyebrow: 'Probe' });
          const r = await ctx.ask(w, [{ label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x' }, { label: 'Stopp!', value: 'stopp', variant: 'teamB', icon: 'pause' }]);
          await nichts(ctx, r === ctx.SKIP ? 'x' : r);
        },
      });
      // Drei Fragen aus dem Pool – die drei Klassiker bleiben als Start immer dabei
      const anzahl = 3;
      const fragen = [FRAGEN[0], FRAGEN[1], FRAGEN[2]].concat(ctx.rshuffle(FRAGEN.slice(3))).slice(0, anzahl + 1);
      let karten = 0, stopps = 0, weg = 0;
      let zusatz = false;
      for (let i = 0; i < fragen.length; i++) {
        if (i === anzahl && !zusatz) break;
        const f = fragen[i];
        const total = zusatz ? anzahl + 1 : anzahl;
        const w = ctx.scr([frageCard(ctx, f, i, total), CREW.ui.teacherLine('Nur „Weiter“ tippen. Nicht zählen, wer passt. Stopp-Knopf gehört allen.')], { eyebrow: 'Frage ' + (i + 1) });
        const r = await ctx.ask(w, [
          { label: 'Stopp!', value: 'stopp', variant: 'teamB', icon: 'pause', id: 'btn-stopp' },
          { label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x', id: 'btn-pass-card' },
          { label: 'Weiter', value: 'next', iconRight: 'right', id: 'btn-next' },
        ]);
        karten++;
        if (r === 'stopp') { stopps++; await nichts(ctx, 'stopp'); continue; }
        if (r === 'pass' || r === ctx.SKIP) { weg++; await nichts(ctx, r === 'pass' ? 'pass' : 'x'); continue; }
        // Nach der dritten Frage: Hat jede:r alles einmal ausprobiert? Sonst eine Zusatzkarte.
        if (i === anzahl - 1 && !zusatz) {
          const w2 = ctx.scr([
            ctx.say('Kurzer Check, ohne Namen: Hat jede:r heute einmal gepasst, einmal das X gezogen und einmal Stopp gesagt?', { eyebrow: 'Check' }),
            h('div', { class: 'row' }, AUFGABEN.map((a) => h('span', { class: 'pill' }, CREW.icon(a.icon, 16), a.title))),
            CREW.ui.teacherLine('Nicht abfragen. Wer noch etwas ausprobieren will, bekommt eine Zusatzkarte.'),
          ], { eyebrow: 'Check', center: true });
          const z = await ctx.ask(w2, [{ label: 'Noch eine Karte', value: 'mehr', variant: 'ghost', icon: 'plus' }, { label: 'Alle haben’s probiert', value: 'ok', iconRight: 'right' }]);
          if (z === 'mehr') zusatz = true;
        }
      }
      // Was ist passiert? Nichts. Genau so bleibt das – in jedem Spiel.
      const w3 = ctx.scr([
        ctx.say('Was ist passiert, als jemand gepasst, X gezogen oder Stopp gesagt hat? Nichts. Genau so bleibt das – in jedem Spiel, das ganze Jahr.', { eyebrow: 'Das war der Probelauf' }),
        h('div', { class: 'grid three' },
          h('div', { class: 'card stack soft' }, h('b', null, 'Pass'), h('span', { class: 'muted small' }, 'Auf jeder Karte. Ohne Grund.')),
          h('div', { class: 'card stack soft' }, h('b', null, 'X-Karte'), h('span', { class: 'muted small' }, 'Oben rechts. Immer da, auch mitten im Spiel.')),
          h('div', { class: 'card stack soft' }, h('b', null, 'Stopp'), h('span', { class: 'muted small' }, 'Laut gesagt. Alle halten an. Pause und Hilfe gibt es oben auch.'))),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Fazit' });
      await ctx.next(w3, 'Fertig');
      return {
        summary: 'Pass, X und Stopp: Es ist nichts passiert. Genau so soll es sein.',
        stats: [[karten, 'Karten'], [stopps + weg, 'mal Pass, X oder Stopp – folgenlos']],
      };
    },
  });
})();

/* Spiel „Näher nicht“ (Thema: Kommunikation & Grenzen) · Vorlage T4 Bewegung im Raum · j1-e22 (Brücke zu j1-e23)
   Bodenmarken 1–5 vor dem Beamer (1 = ganz nah, 5 = weit weg). Am Beamer kommt eine Figur Schritt für Schritt näher –
   als beste Freundin, fremde Person im Bus, Lehrer, Tante zur Begrüßung. Jede:r stellt sich auf die Marke, ab der es
   „näher nicht“ heißt; die Position ist die Antwort, Gruppen reden („Beim Fremden stehen wir alle auf 4“). Danach zeigen
   die Figuren, wo SIE stehen würden – verschieden, alle okay – und der Richtwert aus der Stunde. Keine echte Person kommt
   jemandem nahe: Die Figur am Beamer ist das Gegenüber. In drei Level:
   1) Spüren – Freundin vs. fremde Person.
   2) Je nach Person – Lehrer, Tante zur Begrüßung, die gleiche Freundin, aber wütend: Was verändert den Abstand?
   3) Nein ohne Worte – die Figur kommt näher, alle zeigen gleichzeitig Richtung Beamer das Stopp-Zeichen (Hand flach,
      fester Stand); die Lehrkraft tippt „Stopp gesehen“, die Figur bleibt sofort stehen. Dann mit einem Wort.
   Nur die Lehrkraft tippt. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  // Erwachsene und Unbekannte als eigene Figuren-Objekte (gleicher Zeichenstil, keine echten Personen)
  const FREMD = { id: 'fremd', name: 'Fremde Person', colour: '#8f8fb0', hair: '#2a2a33', skin: '#c8a07a', style: 'cap' };
  const LEHRER = { id: 'lehrer', name: 'Lehrer', colour: '#5fa36b', hair: '#6b6b6b', skin: '#e8c19c', style: 'kurz' };
  const TANTE = { id: 'tante', name: 'Tante', colour: '#e07a5f', hair: '#7a3b1f', skin: '#b87b4f', style: 'lang' };
  const KLASSE = { id: 'klasse', name: 'Jemand aus der Klasse', colour: '#4cc9f0', hair: '#14100c', skin: '#f1c9a5', style: 'locken' };

  const MARKEN = [
    { id: 'm1', n: 1, label: '1', where: 'ganz nah' },
    { id: 'm2', n: 2, label: '2', where: 'nah' },
    { id: 'm3', n: 3, label: '3', where: 'mittel' },
    { id: 'm4', n: 4, label: '4', where: 'weit' },
    { id: 'm5', n: 5, label: '5', where: 'ganz weit' },
  ];
  /* Personen: wer kommt, wo, Stimmung; figs = Marke, auf der die vier Figuren stehen würden (alle verschieden okay) */
  const PERSONEN = [
    { id: 'freundin', stufe: 1, fig: 'yara', mood: 'froh', rolle: 'Yara, deine beste Freundin', ort: 'auf dem Schulhof, sie will dir was zeigen', richt: 'Bei guten Freunden ist für viele etwa ein halber Meter okay.', figs: { mika: 1, luca: 2, sam: 2 } },
    { id: 'fremd', stufe: 1, fig: FREMD, mood: 'neutral', rolle: 'Eine fremde Person', ort: 'im fast leeren Bus', richt: 'Bei Fremden wird es vielen ab etwa 1,2 Metern zu nah.', figs: { mika: 4, yara: 5, luca: 3, sam: 4 } },
    { id: 'lehrer', stufe: 2, fig: LEHRER, mood: 'neutral', rolle: 'Ein Lehrer', ort: 'er will dein Heft sehen', richt: 'In der Schule ist oft eine Armlänge angenehm – Hefte kann man auch reichen.', figs: { mika: 2, yara: 3, luca: 2, sam: 3 } },
    { id: 'tante', stufe: 2, fig: TANTE, mood: 'froh', rolle: 'Eine Tante', ort: 'beim Familienfest, sie will dich zur Begrüßung umarmen', familie: true, richt: 'Auch in der Familie darfst du sagen: „Lieber Hand als Umarmung.“', figs: { mika: 1, yara: 4, luca: 2, sam: 3 } },
    { id: 'wut', stufe: 2, fig: 'yara', mood: 'wut', rolle: 'Yara, deine beste Freundin – aber gerade richtig wütend', ort: 'nach einem Streit', richt: 'Gleiche Person, andere Stimmung: Abstand darf sich ändern.', figs: { mika: 3, luca: 4, sam: 3 } },
    { id: 'klasse', stufe: 2, fig: KLASSE, mood: 'neutral', rolle: 'Jemand aus der Klasse, den du kaum kennst', ort: 'in der Mensa-Schlange', richt: 'Kaum gekannt ist fast wie fremd – für viele ab etwa einem Meter.', figs: { mika: 3, yara: 4, luca: 2, sam: 3 } },
  ];
  const VERAENDERT = ['die Person', 'der Ort', 'die Stimmung', 'ob ich vorbereitet bin'];
  const LEVELS = ['Spüren', 'Je nach Person', 'Nein ohne Worte'];
  const figObj = (ctx, f) => (typeof f === 'string' ? ctx.figures[f] : f);

  /* Der „Gang“ am Beamer: Die Figur wird größer, je näher sie kommt. Darunter die Marken 5 … 1. */
  function gang(ctx, p, mark) {
    const fo = figObj(ctx, p.fig);
    const el = h('div', { class: 'nn-gang', 'data-mark': String(mark) },
      h('div', { class: 'nn-buehne' },
        h('div', { class: 'nn-fig' }, ctx.avatar(fo, p.mood, 150)),
        h('span', { class: 'nn-bubble' }, '')),
      h('div', { class: 'nn-floor', role: 'img', 'aria-label': 'Marken 5 bis 1' }, [5, 4, 3, 2, 1].map((m) => h('span', { class: 'nn-mark' + (m === mark ? ' now' : ''), 'data-m': String(m) }, String(m)))));
    const set = (m) => { el.dataset.mark = String(m); el.querySelectorAll('.nn-mark').forEach((x) => x.classList.toggle('now', x.dataset.m === String(m))); };
    const sag = (t) => { const b = el.querySelector('.nn-bubble'); b.textContent = t || ''; b.classList.toggle('on', !!t); };
    return { el, set, sag };
  }
  const personKarte = (ctx, p, eyebrow) => {
    const fo = figObj(ctx, p.fig);
    return h('div', { class: 'nn-person' },
      ctx.avatar(fo, p.mood, 64),
      h('div', { class: 'stack', style: { gap: '4px', minWidth: 0 } },
        h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, eyebrow), ctx.readBtn(p.rolle + ', ' + p.ort + '.')),
        h('b', { class: 'nn-rolle' }, p.rolle), h('span', { class: 'muted' }, p.ort)));
  };

  /* Annäherung ansehen: Schritt für Schritt von 5 bis 1 (Auto: sofort) */
  async function ansehen(ctx, p, nr, badge) {
    const g = gang(ctx, p, 5);
    const w = ctx.scr([
      personKarte(ctx, p, 'Person ' + nr + ' kommt näher'),
      g.el,
      h('p', { class: 'muted', style: { margin: 0, textAlign: 'center' } }, 'Schaut zu und spürt: Ab welcher Marke heißt es für dich „näher nicht“? Noch nicht gehen.'),
      p.familie ? ctx.safetyLine('familie') : null,
    ], { eyebrow: 'Person ' + nr + ' · Ansehen', badge });
    for (const m of [4, 3, 2, 1]) {
      await ctx.hold(1300);
      if (!w.isConnected) break;
      g.set(m);
      CREW.sound.play('tick');
    }
    return ctx.ask(w, [{ label: 'Nochmal ansehen', value: 'again', variant: 'ghost', icon: 'undo', auto: false, id: 'nn-again' }, { label: 'Jetzt gehen', value: 'go', iconRight: 'right', id: 'btn-next' }]);
  }

  /* Ein Durchgang: ansehen → zur Marke gehen → Gruppen reden → Figuren und Richtwert */
  async function durchgang(ctx, p, nr, L) {
    const badge = ctx.stufe(L, LEVELS);
    let a;
    do { a = await ansehen(ctx, p, nr, badge); } while (a === 'again');
    if (a === ctx.SKIP) return false;
    const r = await ctx.T.walk({
      card: personKarte(ctx, p, 'Geh zu deiner Marke'),
      positions: MARKEN.map((m) => ({ id: m.id, label: m.label, where: m.where })),
      seconds: 10, step: 'Person ' + nr, badge,
      hint: 'Ab dieser Marke heißt es: näher nicht. Gehen, nicht rennen. Abstand zu den anderen halten.',
      question: L === 2 ? 'Jede Marke einen Satz: Was macht den Abstand hier anders als vorhin?' : 'Jede Marke einen Satz: Warum steht ihr hier?',
      nextLabel: 'Die Figuren',
    });
    if (r === ctx.SKIP) return false;
    // Wo stünden die Figuren? Verschieden – und alle okay
    const figs = Object.keys(p.figs);
    const w = ctx.scr([
      personKarte(ctx, p, 'Person ' + nr),
      h('div', { class: 'nn-skala' },
        h('div', { class: 'nn-skala-bar' }, MARKEN.map((m) => h('span', { class: 'nn-skala-m', 'data-m': String(m.n) }, m.label))),
        h('div', { class: 'nn-skala-figs' }, figs.map((f) => h('div', { class: 'nn-skala-fig', style: { '--pos': String(p.figs[f]) } }, ctx.avatar(f, 'neutral', 48), h('b', null, ctx.figures[f].name + ': ' + p.figs[f]))))),
      ctx.say('So würden die Figuren stehen. Verschieden – und alle okay. ' + p.richt, { eyebrow: 'Die Figuren', small: true }),
      L === 2 ? h('div', { class: 'row', style: { gap: '8px' } }, h('span', { class: 'muted small' }, 'Was hat den Abstand verändert?'), VERAENDERT.map((t) => h('span', { class: 'pill' }, t))) : null,
      CREW.ui.teacherLine('Nicht kommentieren, wer wo stand. Dann Weiter.'),
    ], { eyebrow: 'Person ' + nr + ' · Figuren', badge });
    await ctx.next(w, 'Weiter');
    return true;
  }

  /* Level 3: Die Figur kommt näher, bis die Crew das Stopp-Zeichen zeigt. Liefert Marke beim Stopp oder SKIP */
  function stoppZeigen(ctx, p, mitWort) {
    const badge = ctx.stufe(3, LEVELS);
    const g = gang(ctx, p, 5);
    return ctx.waitFor(new Promise((resolve) => {
      let mark = 5, done = false;
      const stop = (why) => {
        if (done) return;
        done = true; clearInterval(iv);
        CREW.sound.play(why === 'stopp' ? 'great' : 'soft');
        g.sag(why === 'stopp' ? 'Okay! Ich bleib hier.' : 'Ich bleib stehen.');
        btn.disabled = true;
        setTimeout(() => resolve(mark), ctx.auto ? 30 : 900);
      };
      const btn = CREW.ui.btn(mitWort ? 'Stopp gehört' : 'Stopp-Zeichen gesehen', () => stop('stopp'), { variant: 'teamB', icon: 'pause', big: true, id: 'nn-stopp' });
      ctx.scr([
        personKarte(ctx, p, mitWort ? 'Jetzt mit Wort' : 'Ohne Worte'),
        h('div', { class: 'kg-pair nn-pair' }, g.el, h('div', { class: 'stack' },
        h('div', { class: 'nn-stopp-hilfe' },
          h('div', { class: 'nn-stopp-ic' }, CREW.icon('shield', 34)),
          h('div', { class: 'stack', style: { gap: '4px' } },
            h('b', null, mitWort ? 'An deiner Marke: Hand flach – und laut „Stopp!“' : 'An deiner Marke: Hand flach nach vorn, Füße fest, Blick zur Figur.'),
            h('span', { class: 'muted small' }, 'Alle zeigen Richtung Beamer, nicht zu anderen. Kein Kichern, kein Wegschauen.'))),
        h('div', { class: 'row center' }, btn),
        CREW.ui.teacherLine('Tippen, sobald die ersten Stopp-Zeichen ' + (mitWort ? 'zu hören sind.' : 'zu sehen sind.')))),
      ], { eyebrow: 'Nein ohne Worte', badge });
      const iv = setInterval(() => {
        if (done) return;
        if (!g.el.isConnected) { clearInterval(iv); return; }
        if (ctx.isPaused && ctx.isPaused()) return;
        mark--;
        g.set(mark);
        CREW.sound.play('tick');
        if (mark <= 1) stop('ende');
      }, ctx.auto ? Math.max(60, (window.__crewAutoDelay || 0) / 2) : 1600);
      ctx.onCleanup(() => clearInterval(iv));
      if (ctx.auto) setTimeout(() => { if (!done) btn.click(); }, Math.max(150, window.__crewAutoDelay || 0));
    }));
  }

  CREW.registerGame({
    id: 'naeher-nicht',
    template: 'T4',
    icon: 'users',
    themen: ['Wohlfühl-Abstand', 'Grenzen', 'Nein ohne Worte', 'Körpersprache'],
    safety: ['koerper', 'raum', 'figuren'],
    help: false,
    personen: PERSONEN, // für den Test
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Am Beamer kommt eine Figur näher. Stell dich auf die Marke, ab der es für dich „näher nicht“ heißt. Die Position ist die Antwort. Keine echte Person kommt dir nahe.',
        levels: LEVELS,
        steps: [
          { icon: 'eye', title: 'Ansehen', text: 'Die Figur kommt Schritt für Schritt näher.' },
          { icon: 'users', title: 'Zur Marke', text: '1 = ganz nah, 5 = weit weg. Gruppen reden.' },
          { icon: 'shield', title: 'Stopp zeigen', text: 'Hand flach, Füße fest – die Figur bleibt stehen.' },
        ],
        probe: async () => {
          await ctx.T.walk({ card: personKarte(ctx, { fig: 'luca', mood: 'froh', rolle: 'Probe: Luca mit einer Pizza', ort: 'zählt nicht' }, 'PROBE · zählt nicht'), positions: MARKEN.map((m) => ({ id: m.id, label: m.label, where: m.where })), seconds: 10, step: 'Probe', question: 'Probe vorbei. So geht’s: Marke wählen, stehen bleiben.', minorityFirst: false });
        },
      });
      // Marken erklären (einmal)
      const wM = ctx.scr([
        ctx.say('Fünf Marken vor dem Beamer: 1 ganz nah an der Wand, 5 weit weg. Jede:r steht allein auf einer Marke – mit Abstand zu den anderen.', { eyebrow: 'Die Marken', small: true }),
        h('div', { class: 'walk-pos' }, MARKEN.map((m) => h('div', { class: 'walk-p', 'data-pos': m.id }, h('b', { class: 'display' }, m.label), h('span', { class: 'muted small' }, m.where)))),
        h('div', { class: 'card stack soft' }, h('b', null, 'Wer nicht gehen mag, zeigt die Zahl mit den Fingern – oder beobachtet.'), h('p', { class: 'muted small', style: { margin: 0 } }, 'Niemand kommentiert, wo andere stehen. Deine Marke darf sich jedes Mal ändern.')),
        h('div', { class: 'row' }, ctx.safetyLine('koerper'), ctx.safetyLine('raum')),
      ], { eyebrow: 'Marken' });
      if ((await ctx.next(wM, 'Los')) === ctx.SKIP) return { summary: 'Heute keine Marken. Nächstes Mal.', noNach: true };

      // Level 1: Freundin vs. Fremde (Reihenfolge per Tagescode), Level 2: zwei Personen „je nach Person“
      const l1 = ctx.rshuffle(PERSONEN.filter((p) => p.stufe === 1));
      const l2 = ctx.rshuffle(PERSONEN.filter((p) => p.stufe === 2)).slice(0, 2);
      let gegangen = 0;
      for (let i = 0; i < l1.length; i++) if (await durchgang(ctx, l1[i], i + 1, 1)) gegangen++;
      await ctx.T.level({ n: 2, names: LEVELS, text: 'Jetzt wird’s kniffliger: Lehrer, Verwandte, die gleiche Freundin in anderer Stimmung. Was verändert deinen Abstand?' });
      for (let i = 0; i < l2.length; i++) if (await durchgang(ctx, l2[i], l1.length + i + 1, 2)) gegangen++;

      // Level 3: Nein ohne Worte – erst Zeichen, dann Wort
      await ctx.T.level({ n: 3, names: LEVELS, text: 'Bleibt auf euren Marken. Die Figur kommt näher. An eurer Marke zeigt ihr das Stopp-Zeichen: Hand flach, Füße fest. Die Figur bleibt sofort stehen.' });
      const p3 = l1.find((p) => p.id === 'fremd') || PERSONEN[1];
      const m1 = await stoppZeigen(ctx, p3, false);
      let gehalten = 0;
      if (m1 !== ctx.SKIP) {
        gehalten++;
        const w = ctx.scr([
          h('div', { class: 'stop-big display' }, 'Stopp!'),
          ctx.figureCard({ fig: figObj(ctx, p3.fig), mood: 'ueberrascht', text: 'Okay! Ich bleib hier. (Marke ' + m1 + ')', eyebrow: 'Die Figur bleibt stehen' }),
          ctx.say('Wer ein Stopp sieht oder hört, bleibt sofort stehen. Null Sekunden. Jetzt nochmal – mit einem Wort.', { eyebrow: 'Null Sekunden', small: true }),
        ], { eyebrow: 'Nein ohne Worte', badge: ctx.stufe(3, LEVELS), center: true });
        await ctx.next(w, 'Mit Wort');
        const m2 = await stoppZeigen(ctx, PERSONEN.find((p) => p.id === 'klasse'), true);
        if (m2 !== ctx.SKIP) {
          gehalten++;
          const w2 = ctx.scr([
            ctx.figureCard({ fig: KLASSE, mood: 'neutral', text: 'Okay, okay. Hab’s verstanden.', eyebrow: 'Die Figur bleibt stehen' }),
            ctx.say('Zeichen und Wort zusammen sind am klarsten. Und: Deine Grenze bestimmst du – sie darf sich ändern.', { eyebrow: 'Nein ohne Worte', small: true }),
            h('div', { class: 'row' }, h('span', { class: 'skill-chip karte' }, CREW.icon('sparkle', 14), 'Skill-Karte „Fester Stand“: Füße fest, Schultern locker, Blick geradeaus')),
          ], { eyebrow: 'Nein ohne Worte', badge: ctx.stufe(3, LEVELS) });
          await ctx.next(w2, 'Weiter');
        }
      }
      return {
        summary: 'Jede:r hat einen eigenen Abstand – je nach Person, Ort und Stimmung. Und ein Stopp-Zeichen gilt sofort.',
        stats: [[gegangen, 'Personen gespürt'], [gehalten, 'mal Stopp gezeigt']],
      };
    },
  });
})();

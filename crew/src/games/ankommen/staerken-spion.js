/* Spiel „Stärken-Spion“ (Thema: Ankommen & Crew) · Vorlage T6 Beamer-Gruppe · j1-e06, j1-e02, j1-e03, j1-e30 · Top
   Läuft über ein anderes Spiel. Teil 1 (vor dem Start, 2 Min): Jede:r zieht geheim eine Rolle – fast alle „Crew“,
   ein bis zwei bekommen eine Karte: Spion („Merk dir ein Ding, das jemand gut gemacht hat“) oder Schutzengel
   („Achte, dass jede:r einmal drankommt“). Teil 2 (nach dem Spiel, 3 Min): „Spione, aufdecken!“ – der Spion sagt
   nur, WAS er gesehen hat, die Crew rät das Stärke-Wort. Werwolf-Gefühl ohne Verräter.
   Rollen kommen aus Tagescode + Platz (gleich auf allen iPads) – per QR auf dem eigenen iPad oder am Lehrer-iPad
   mit „Nur du schaust“ reihum. Variante j1-e06: Stärken-Wörter aus den Bäumen der Crew (eigene Wörter sagen). */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const SPION_KARTEN = [
    'Merk dir EIN Ding, das jemand heute gut gemacht hat. Nur das Verhalten, nicht die Person bewerten.',
    'Merk dir einen Moment, in dem jemand gewartet, geholfen oder nachgefragt hat.',
    'Merk dir, wer etwas Schwieriges trotzdem gemacht hat – auch wenn es nicht geklappt hat.',
    'Merk dir einen Satz, der die Stimmung besser gemacht hat.',
  ];
  const ENGEL_KARTEN = [
    'Achte darauf, dass jede:r einmal drankommt. Wenn jemand übergangen wird: „Moment, du wolltest was sagen?“',
    'Achte darauf, dass niemand ausgelacht wird. Wenn doch: Thema wechseln oder „Lass gut sein“.',
    'Achte darauf, dass die Stillen Platz bekommen. Ein Blick, ein Nicken reicht manchmal.',
  ];
  const STAERKEN = ['Geduld', 'Mut', 'Humor', 'Fairness', 'Ruhe', 'Ausdauer', 'Hilfsbereitschaft', 'Ehrlichkeit', 'Kreativität', 'Teamgeist', 'Genauigkeit', 'Zuhören', 'Überblick', 'Anpacken'];

  /* Geheime Verteilung: 1 Spion bei ≤4, sonst 2; 1 Schutzengel. Gleich auf allen iPads (Tagescode). */
  function verteilung(ctx) {
    const nSpione = ctx.n <= 4 ? 1 : 2;
    const seats = CREW.seed.secret(ctx.code, ctx.n, nSpione + 1, 'staerken-spion');
    const spione = seats.slice(0, nSpione);
    const engel = seats[nSpione];
    const r = CREW.seed.rng(ctx.code, 'staerken-spion', 'karten');
    return { spione, engel, spionText: CREW.seed.pick(SPION_KARTEN, r), engelText: CREW.seed.pick(ENGEL_KARTEN, r) };
  }
  function rolleVon(v, seat) { return v.spione.includes(seat) ? 'spion' : v.engel === seat ? 'engel' : 'crew'; }

  /* Rollenkarte – sieht für alle gleich lang aus, damit niemand am Lesen erkennt, wer Spion ist */
  function rollenKarte(ctx, kind, v) {
    const txt = kind === 'spion' ? v.spionText : kind === 'engel' ? v.engelText : 'Du bist Crew. Spiel ganz normal mit – und tu so, als könntest du Spion sein. Ein kleines Grinsen ist erlaubt.';
    const title = kind === 'spion' ? 'Spion' : kind === 'engel' ? 'Schutzengel' : 'Crew';
    return h('div', { class: 'sp-card', 'data-kind': kind },
      CREW.icon(kind === 'spion' ? 'eye' : kind === 'engel' ? 'heart' : 'users', 56),
      h('span', { class: 'eyebrow' }, 'Deine geheime Rolle'),
      h('h1', { class: 'outline-text' }, title),
      h('p', { class: 'lead' }, txt),
      h('p', { class: 'muted small' }, 'Nicht verraten. Nach dem Spiel heißt es: „Spione, aufdecken!“'),
      ctx.readBtn('Deine geheime Rolle: ' + title + '. ' + txt));
  }

  /* Teil 1: Rollen ziehen */
  async function teil1(ctx, v) {
    // Jugend-iPad per Deep-Link (Platz gesetzt): nur die eigene Karte
    if (ctx.opts.platz || ctx.role) {
      const c = await ctx.T.cover({ who: 'Nur du schaust', hint: 'Platz ' + ctx.seat + '. Die anderen schauen weg. Tippe, wenn du bereit bist.', eyebrow: 'Rolle ziehen' });
      if (c === ctx.SKIP) return 0;
      const w = ctx.scr([rollenKarte(ctx, rolleVon(v, ctx.seat), v)], { eyebrow: 'Deine Rolle', badge: h('span', { class: 'pill accent' }, 'Platz ' + ctx.seat) });
      await ctx.next(w, 'Gemerkt, Karte weg');
      return 1;
    }
    // Lehrer-iPad: QR oder reihum „Nur du schaust“
    const qr = CREW.games.qrPanel('staerken-spion', { size: 160 });
    const w1 = ctx.scr([
      ctx.say('Jede:r zieht geheim eine Rolle. Entweder per QR auf dem eigenen iPad – oder dieses iPad wandert reihum.', { eyebrow: 'Rollen ziehen', small: true }),
      h('div', { class: 'card' }, qr),
      h('p', { class: 'muted small' }, ctx.n + ' Leute · ' + v.spione.length + ' Spion' + (v.spione.length > 1 ? 'e' : '') + ' · 1 Schutzengel · der Rest Crew. Wer welche Rolle hat, weiß nur das Gerät.'),
    ], { eyebrow: 'Teil 1' });
    const how = await ctx.ask(w1, [{ label: 'Dieses iPad wandert', value: 'here', variant: 'ghost', icon: 'undo' }, { label: 'Alle haben gescannt', value: 'qr', iconRight: 'right' }]);
    if (how === ctx.SKIP) return 0;
    let gezogen = 0;
    if (how === 'here') {
      for (let seat = 1; seat <= ctx.n; seat++) {
        const c = await ctx.T.cover({ who: 'Nur du schaust', hint: 'Person ' + seat + ' von ' + ctx.n + '. Die anderen schauen weg.', eyebrow: 'Rolle ' + seat + '/' + ctx.n });
        if (c === ctx.SKIP) { await ctx.T.passOn({ direction: 'links', text: 'Gepasst – auch gut. Gib das iPad weiter.' }); continue; }
        const w = ctx.scr([rollenKarte(ctx, rolleVon(v, seat), v)], { eyebrow: 'Rolle ' + seat + '/' + ctx.n });
        await ctx.next(w, 'Gemerkt, Karte weg');
        gezogen++;
        if (seat < ctx.n) await ctx.T.passOn({ direction: 'links', extra: h('span', { class: 'pill' }, 'Nächste Person: ' + (seat + 1) + ' von ' + ctx.n) });
      }
    } else gezogen = ctx.n;
    const w2 = ctx.scr([
      ctx.say('Rollen sind verteilt. Jetzt das andere Spiel spielen. Danach: Stärken-Spion → Teil 2 „Aufdecken“.', { eyebrow: 'Jetzt spielen' }),
      h('div', { class: 'row' }, h('span', { class: 'pill accent' }, 'Spione beobachten'), h('span', { class: 'pill good' }, 'Schutzengel passt auf'), h('span', { class: 'pill' }, 'Crew spielt')),
    ], { eyebrow: 'Teil 1 · fertig', center: true });
    await ctx.next(w2, 'Zum anderen Spiel');
    return gezogen;
  }

  /* Teil 2: Aufdecken – Spion sagt WAS, Crew rät das Stärke-Wort */
  async function teil2(ctx, v) {
    const gefunden = [];
    const unit = CREW.games.FILTER && CREW.games.FILTER.einheit;
    const w0 = ctx.scr([
      h('div', { class: 'stop-big display', style: { color: 'var(--yellow)' } }, 'Spione, aufdecken!'),
      ctx.say('Wer Spion war, meldet sich jetzt. Keine Angst: Hier gibt es keinen Verräter – nur Leute, die genau hingeschaut haben.', { eyebrow: 'Teil 2', small: true }),
      ctx.safetyLine('freiwillig'),
    ], { eyebrow: 'Aufdecken', center: true });
    if ((await ctx.next(w0, 'Erster Spion')) === ctx.SKIP) return gefunden;
    for (let s = 0; s < v.spione.length; s++) {
      // Der Spion sagt nur, WAS er gesehen hat – die Crew rät das Wort
      const w1 = ctx.scr([
        ctx.say('Spion ' + (s + 1) + ': Sag nur, WAS du gesehen hast. Zum Beispiel: „Jemand hat gewartet, bis alle fertig waren.“ Keine Bewertung, kein Name nötig.', { eyebrow: 'Spion ' + (s + 1) + ' von ' + v.spione.length }),
        h('div', { class: 'card stack soft' }, h('b', null, 'Die Crew rät: Welche Stärke steckt dahinter?'), h('p', { class: 'muted small' }, unit === 'j1-e06' ? 'Nehmt die Stärken aus euren Bäumen – oder ein Wort von der Wand.' : 'Wort von der Wand – oder ein eigenes.')),
        h('div', { class: 'sp-words' }, STAERKEN.map((x) => h('span', { class: 'chip' }, x))),
        CREW.ui.teacherLine('Wenn die Crew sich auf ein Wort geeinigt hat, einmal antippen. Nicht abstimmen.'),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Spion ' + (s + 1) });
      const word = await ctx.ask(w1, STAERKEN.map((x) => ({ label: x, value: x, variant: 'ghost' })).concat([{ label: 'Eigenes Wort', value: 'eigen', variant: 'ghost', icon: 'plus' }, { label: 'Kein Spion hat sich gemeldet', value: 'keiner', variant: 'ghost', icon: 'x' }]));
      if (word === ctx.SKIP || word === 'keiner') continue;
      gefunden.push(word === 'eigen' ? 'eigenes Wort' : word);
      // Annehmen: Die Person, die gemeint war, darf „Danke“ sagen – oder nichts. Beides okay.
      const w2 = ctx.scr([
        h('div', { class: 'row center' }, h('span', { class: 'pill accent', style: { fontSize: '1.4em' } }, CREW.icon('star', 20), word === 'eigen' ? 'Eigenes Wort' : word)),
        ctx.say('Wenn die Person, die gemeint war, möchte: Sie darf jetzt „Danke“ sagen – oder einfach nicken. Rückmeldung annehmen ist auch eine Stärke.', { eyebrow: 'Annehmen', small: true }),
        h('p', { class: 'muted small' }, 'Wer nicht genannt werden will, sagt es – dann bleibt es beim WAS.'),
      ], { eyebrow: 'Spion ' + (s + 1), center: true });
      await ctx.next(w2, s + 1 < v.spione.length ? 'Nächster Spion' : 'Zum Schutzengel');
    }
    // Schutzengel: Hat es geklappt?
    const w3 = ctx.scr([
      ctx.say('Schutzengel, aufdecken: Ist heute jede:r einmal drangekommen? Was hast du getan, damit es klappt?', { eyebrow: 'Schutzengel' }),
      h('p', { class: 'muted' }, 'Wenn niemand Schutzengel war oder die Person passt: auch gut. Die Crew darf trotzdem antworten.'),
      ctx.safetyLine('freiwillig'),
    ], { eyebrow: 'Schutzengel' });
    const e = await ctx.ask(w3, [{ label: 'Ja, alle waren dran', value: 'ja', variant: 'good', icon: 'check' }, { label: 'Nicht ganz – nächstes Mal', value: 'fast', variant: 'ghost' }, { label: 'Pass', value: 'pass', variant: 'ghost', icon: 'x' }]);
    if (e === 'ja') gefunden.push('Teamgeist (Schutzengel)');
    // Stärken-Wand der Crew (heute, ohne Namen)
    const w4 = ctx.scr([
      ctx.say(gefunden.length ? 'Das hat die Crew heute gezeigt. Ohne Namen, aber echt.' : 'Heute keine Wörter – beim nächsten Mal schauen die Spione genauer.', { eyebrow: 'Stärken der Crew heute' }),
      gefunden.length ? h('div', { class: 'sp-found' }, gefunden.map((x) => h('span', { class: 'sticker', 'data-theme': 'ankommen' }, h('span', { class: 'sticker-ic' }, CREW.icon('star', 20)), h('span', { class: 'sticker-name' }, x)))) : null,
    ], { eyebrow: 'Teil 2 · fertig', center: true });
    await ctx.next(w4, 'Fertig');
    return gefunden;
  }

  CREW.registerGame({
    id: 'staerken-spion',
    template: 'T6',
    icon: 'eye',
    themen: ['Stärken', 'Rückmeldung', 'Fremdwahrnehmung', 'Schutzengel'],
    safety: ['freiwillig'],
    help: false,
    async run(ctx) {
      const v = verteilung(ctx);
      // Jugend-iPad per QR: direkt zur eigenen Karte, kein Startbild
      if (ctx.opts.platz || ctx.role) {
        const n = await teil1(ctx, v);
        return { summary: n ? 'Rolle gezogen. Der Rest läuft am Beamer.' : 'Keine Rolle gezogen. Du bist Crew.', noSticker: true };
      }
      await ctx.T.intro({
        rule: 'Vor dem Spiel zieht jede:r geheim eine Rolle. Spione merken sich, was jemand gut macht. Nach dem Spiel: aufdecken – die Crew rät die Stärke.',
        steps: [
          { icon: 'eyeOff', title: 'Teil 1: Rolle ziehen', text: 'Geheim. Crew, Spion oder Schutzengel.' },
          { icon: 'play', title: 'Anderes Spiel spielen', text: 'Spione schauen genau hin.' },
          { icon: 'star', title: 'Teil 2: Aufdecken', text: 'Spion sagt WAS, Crew rät das Wort.' },
        ],
        probe: ctx.T.probeCard('Probe: „Jemand hat beim Aufräumen geholfen, ohne dass es jemand gesagt hat.“ Welche Stärke? Tippt – zählt nicht.', [{ label: 'Hilfsbereitschaft', value: 1, variant: 'ghost' }, { label: 'Überblick', value: 2, variant: 'ghost' }]),
      });
      const w = ctx.scr([
        ctx.say('Wo seid ihr gerade?', { eyebrow: 'Teil wählen', small: true }),
        h('div', { class: 'grid two' },
          h('div', { class: 'card stack' }, h('b', null, 'Teil 1 · vor dem Spiel'), h('span', { class: 'muted small' }, 'Rollen ziehen, 2 Minuten.')),
          h('div', { class: 'card stack' }, h('b', null, 'Teil 2 · nach dem Spiel'), h('span', { class: 'muted small' }, 'Spione aufdecken, 3 Minuten.'))),
      ], { eyebrow: 'Teil wählen' });
      let teil = await ctx.ask(w, [{ label: 'Teil 1: Rollen ziehen', value: 1, variant: 'ghost', icon: 'eyeOff' }, { label: 'Teil 2: Aufdecken', value: 2, icon: 'star' }], { autoPick: ctx.auto ? () => 1 : undefined });
      if (teil === ctx.SKIP) return { summary: 'Heute keine Spione.', noSticker: true };
      let gezogen = 0, gefunden = [];
      if (teil === 1) {
        gezogen = await teil1(ctx, v);
        // Auto-Modus (Test): beide Teile hintereinander, damit alles einmal läuft
        if (!ctx.auto) return { summary: 'Rollen verteilt. Nach dem Spiel: Teil 2 „Aufdecken“.', stats: [[v.spione.length, 'Spione'], [1, 'Schutzengel']], noSticker: true };
      }
      gefunden = await teil2(ctx, v);
      return { summary: gefunden.length ? gefunden.length + ' Stärke' + (gefunden.length > 1 ? 'n' : '') + ' am Verhalten erkannt. Spione, gute Arbeit.' : 'Aufgedeckt. Beim nächsten Mal schauen die Spione noch genauer.', stats: [[gefunden.length, 'Stärken erkannt'], [v.spione.length, 'Spione']] };
    },
  });
})();

/* Spiel „Pilot & Navigator“ (Thema: Ankommen & Crew) · Vorlage T3 Zu zweit an einem iPad · j1-e03, j1-e20 · Top
   Bildschirm geteilt: Oben (um 180° gedreht, Person gegenüber) sieht der Navigator den Weg durchs Gitter samt
   Hindernissen. Unten steuert der Pilot nach Ansage – ohne den Weg und ohne die Hindernisse zu sehen.
   Ein großer Stopp-Knopf stoppt sofort, egal wer drückt. Runde 1 ohne Rückfragen, Runde 2 mit Rückfragen und
   getauschten Rollen. Danach liegen geplanter und gefahrener Weg übereinander: Ab welchem Zug ging es auseinander?
   Ohne Schuld – Ansage und Hören sind zwei Bilder. Variante j1-e03: Frage „Was hat beim Führen geholfen?“ */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  const COLS = 6, ROWS = 5;
  const START = { c: 0, r: ROWS - 1 };
  const ZIEL = { c: COLS - 1, r: 0 };
  const DIRS = { hoch: { dc: 0, dr: -1, label: 'hoch', glyph: '↑' }, runter: { dc: 0, dr: 1, label: 'runter', glyph: '↓' }, links: { dc: -1, dr: 0, label: 'links', glyph: '←' }, rechts: { dc: 1, dr: 0, label: 'rechts', glyph: '→' } };
  const key = (p) => p.c + ',' + p.r;

  /* Ein Kurs: zufälliger Weg von links unten nach rechts oben (gleich auf allen iPads), Hindernisse dicht am Weg */
  function kurs(ctx) {
    const moves = ctx.rshuffle(Array(COLS - 1).fill('rechts').concat(Array(ROWS - 1).fill('hoch')));
    const path = [Object.assign({}, START)];
    moves.forEach((m) => { const last = path[path.length - 1]; path.push({ c: last.c + DIRS[m].dc, r: last.r + DIRS[m].dr }); });
    const onPath = new Set(path.map(key));
    // Hindernisse: Nachbarzellen des Wegs, die nicht auf dem Weg liegen – höchstens sieben
    const cand = [];
    path.forEach((p) => Object.values(DIRS).forEach((d) => { const q = { c: p.c + d.dc, r: p.r + d.dr }; if (q.c >= 0 && q.c < COLS && q.r >= 0 && q.r < ROWS && !onPath.has(key(q)) && !cand.some((x) => key(x) === key(q))) cand.push(q); }));
    const obst = ctx.rshuffle(cand).slice(0, 7);
    return { moves, path, obst: new Set(obst.map(key)) };
  }

  /* Gitter zeichnen. mode: 'navigator' (Weg + Hindernisse sichtbar) | 'pilot' (nur Start, Ziel, eigene Spur) | 'overlay' */
  function gitter(k, st, mode) {
    const g = h('div', { class: 'pn-grid', style: { '--cols': String(COLS) }, 'data-mode': mode });
    const planned = new Map(k.path.map((p, i) => [key(p), i]));
    const driven = new Map((st.trail || []).map((p, i) => [key(p), i]));
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const kk = c + ',' + r;
        const cell = h('div', { class: 'pn-cell' });
        const isStart = kk === key(START), isZiel = kk === key(ZIEL);
        const showObst = k.obst.has(kk) && (mode !== 'pilot' || (st.crash && key(st.crash) === kk));
        if (mode !== 'pilot' && planned.has(kk)) { cell.classList.add('plan'); if (!isStart && !isZiel) cell.appendChild(h('span', { class: 'pn-num' }, String(planned.get(kk)))); }
        if (driven.has(kk) && (mode !== 'navigator' || true)) cell.classList.add('trail');
        if (showObst) { cell.classList.add('obst'); cell.appendChild(h('span', { class: 'pn-glyph' }, '✕')); }
        if (isStart) cell.appendChild(h('span', { class: 'pn-tag' }, 'Start'));
        if (isZiel) { cell.classList.add('ziel'); cell.appendChild(h('span', { class: 'pn-glyph' }, CREW.icon('star', 24))); }
        if (st.pos && key(st.pos) === kk) { cell.classList.add('here'); cell.appendChild(h('span', { class: 'pn-ship', 'aria-label': 'Pilot' }, CREW.icon('bolt', 26))); }
        if (st.crash && key(st.crash) === kk) cell.classList.add('crash');
        g.appendChild(cell);
      }
    }
    return g;
  }

  /* Eine Runde fahren. Liefert { reached, crash, moves:[...], trail:[...], stops } */
  async function runde(ctx, k, nr, mitFragen, roles) {
    const st = { pos: Object.assign({}, START), trail: [Object.assign({}, START)], moves: [], crash: null, stops: 0 };
    const maxMoves = k.path.length + 7;
    for (;;) {
      const r = await fahren(ctx, k, st, nr, mitFragen, roles, maxMoves);
      if (r === 'stop') {
        st.stops++;
        const w = ctx.scr([
          h('div', { class: 'stop-big display' }, 'Stopp!'),
          ctx.say('Alles steht. Kurz durchatmen. Weiter geht es erst, wenn beide bereit sind.', { eyebrow: 'Stopp-Knopf gedrückt', small: true }),
          h('p', { class: 'muted' }, 'Stopp ist kein Fehler. Stopp heißt: Ich brauche kurz Zeit.'),
        ], { eyebrow: 'Runde ' + nr + ' · Stopp', center: true });
        const ok = await ctx.T.twoFinger(w, { label: 'Beide bereit: Finger drauf' });
        if (ok === ctx.SKIP) return Object.assign(st, { reached: false, aborted: true });
        continue;
      }
      if (r === ctx.SKIP) return Object.assign(st, { reached: false, aborted: true });
      return Object.assign(st, { reached: r === 'ziel' });
    }
  }

  /* Der Fahr-Bildschirm: oben Navigator (gedreht), Stopp in der Mitte, unten Pilot mit Pfeilen */
  function fahren(ctx, k, st, nr, mitFragen, roles, maxMoves) {
    return ctx.waitFor(new Promise((resolve) => {
      const navGrid = h('div', { class: 'pn-gridbox' });
      const pilGrid = h('div', { class: 'pn-gridbox' });
      const zuege = h('span', { class: 'pill' }, 'Zug ' + st.moves.length + ' von max. ' + maxMoves);
      let done = false;
      const draw = () => { navGrid.replaceChildren(gitter(k, st, 'navigator')); pilGrid.replaceChildren(gitter(k, st, 'pilot')); zuege.textContent = 'Zug ' + st.moves.length + ' von max. ' + maxMoves; };
      const move = (dir) => {
        if (done) return;
        const d = DIRS[dir];
        const q = { c: st.pos.c + d.dc, r: st.pos.r + d.dr };
        if (q.c < 0 || q.c >= COLS || q.r < 0 || q.r >= ROWS) { CREW.sound.play('soft'); return; }
        st.moves.push(dir); st.pos = q; st.trail.push(q);
        if (k.obst.has(key(q))) { st.crash = q; done = true; CREW.sound.play('soft'); draw(); setTimeout(() => resolve('crash'), ctx.auto ? 30 : 700); return; }
        CREW.sound.play('tick');
        draw();
        if (key(q) === key(ZIEL)) { done = true; CREW.sound.play('great'); setTimeout(() => resolve('ziel'), ctx.auto ? 30 : 600); return; }
        if (st.moves.length >= maxMoves) { done = true; setTimeout(() => resolve('leer'), ctx.auto ? 30 : 600); }
      };
      const arrow = (dir) => { const b = h('button', { type: 'button', class: 'btn pn-arrow', 'data-dir': dir, 'aria-label': DIRS[dir].label }, h('span', { class: 'display' }, DIRS[dir].glyph)); b.addEventListener('click', () => move(dir)); return b; };
      const pad = h('div', { class: 'pn-pad' }, h('i'), arrow('hoch'), h('i'), arrow('links'), arrow('runter'), arrow('rechts'));
      const stopBtn = h('button', { type: 'button', class: 'btn teamB pn-stop', id: 'btn-stop' }, CREW.icon('pause', 28), h('span', null, 'STOPP'));
      stopBtn.addEventListener('click', () => { if (done) return; done = true; CREW.sound.play('soft'); resolve('stop'); });
      const top = h('div', { class: 'stack pn-side' },
        h('div', { class: 'pn-nav' }, navGrid,
          h('div', { class: 'stack', style: { gap: '6px' } },
            h('b', null, roles.nav + ': Navigator'), h('span', { class: 'pill accent' }, mitFragen ? 'Runde 2 · Rückfragen erlaubt' : 'Runde 1 · keine Rückfragen'),
            h('p', { class: 'muted small' }, 'Du siehst Weg und Hindernisse. Pro Zug EIN Wort: hoch, runter, links, rechts.'),
            h('p', { class: 'muted small' }, 'Achtung: Du schaust von der anderen Seite.'))));
      const bottom = h('div', { class: 'stack pn-side' },
        h('div', { class: 'pn-pilot' }, pilGrid,
          h('div', { class: 'stack', style: { gap: '6px', justifySelf: 'start' } },
            h('b', null, roles.pilot + ': Pilot'), zuege,
            h('p', { class: 'muted small' }, mitFragen ? 'Kein Weg sichtbar. Hör zu – und frag nach: „Meinst du meine linke?“' : 'Kein Weg sichtbar. Nur hören, nicht fragen. Tipp den Pfeil, den du verstanden hast.'),
            stopBtn, h('span', { class: 'muted small' }, 'Stopp darf jede:r drücken. Sofort.')),
          pad));
      const wrap = ctx.scr([ctx.T.split({ top, bottom })], { eyebrow: 'Runde ' + nr });
      draw();
      // Zwei-Finger-Zone liegt in der Mitte? Nein – hier reicht der Stopp-Knopf. Auto-Modus: Züge simulieren.
      if (ctx.auto) {
        let i = st.moves.length;
        const tickAuto = () => {
          if (done || !wrap.isConnected) return;
          if (ctx.autoRng() < 0.08) { stopBtn.click(); return; }
          const planned = k.moves[i];
          const dir = planned && ctx.autoRng() < 0.8 ? planned : Object.keys(DIRS)[Math.floor(ctx.autoRng() * 4)];
          // Nur vom geplanten Weg aus weiterzählen, wenn wir noch drauf sind
          const onPlan = k.path[i + 1] && key(k.path[i + 1]) === key({ c: st.pos.c + DIRS[dir].dc, r: st.pos.r + DIRS[dir].dr });
          move(dir);
          if (onPlan) i++;
          setTimeout(tickAuto, 40);
        };
        setTimeout(tickAuto, 40);
      }
    }));
  }

  /* Auswertung: geplanter und gefahrener Weg übereinander, erster Unterschied – ohne Schuld */
  function auswertung(ctx, k, st, nr) {
    let div = -1;
    for (let i = 1; i < st.trail.length; i++) { if (!k.path[i] || key(k.path[i]) !== key(st.trail[i])) { div = i; break; } }
    const plannedMove = div > 0 ? k.moves[div - 1] : null;
    const drivenMove = div > 0 ? st.moves[div - 1] : null;
    const text = st.reached && div < 0 ? 'Sauber durch. Ansage und Hören haben dasselbe Bild gemacht.'
      : st.reached ? 'Am Ziel – mit Umweg. Ab Zug ' + div + ' gingen Ansage und Hören auseinander, ihr habt es zurückgeholt.'
      : st.crash ? 'Crash bei Zug ' + st.moves.length + '. Ab Zug ' + (div > 0 ? div : st.moves.length) + ' hatten Navigator und Pilot zwei verschiedene Bilder im Kopf.'
      : st.aborted ? 'Abgebrochen. Auch okay.' : 'Treibstoff leer. Ab Zug ' + (div > 0 ? div : '?') + ' lief es auseinander.';
    const detail = div > 0 && plannedMove && drivenMove ? h('div', { class: 'card stack soft' },
      h('b', null, 'Zug ' + div + ': geplant „' + DIRS[plannedMove].label + '“, gefahren „' + DIRS[drivenMove].label + '“.'),
      h('p', { class: 'muted small' }, plannedMove !== drivenMove && ((plannedMove === 'links' && drivenMove === 'rechts') || (plannedMove === 'rechts' && drivenMove === 'links')) ? 'Links und rechts vertauscht – klassisch, wenn man sich gegenübersitzt. „Deine linke“ hilft.' : 'Keine Schuld. Eine Ansage ist ein Bild im Kopf des Senders – der Empfänger baut sich ein eigenes. Rückfragen gleichen die Bilder ab.')) : null;
    return ctx.scr([
      h('div', { class: 'grid two' },
        h('div', { class: 'card stack' }, h('b', null, 'Beide Wege übereinander'), h('div', { class: 'pn-gridbox' }, gitter(k, st, 'overlay')), h('div', { class: 'row', style: { gap: '8px' } }, h('span', { class: 'pill' }, h('i', { class: 'pn-key plan' }), 'geplant'), h('span', { class: 'pill' }, h('i', { class: 'pn-key trail' }), 'gefahren'), h('span', { class: 'pill' }, '✕ Hindernis'))),
        h('div', { class: 'stack' }, ctx.say(text, { eyebrow: 'Runde ' + nr + ' · Auswertung', small: true }), detail,
          h('div', { class: 'row', style: { gap: '8px' } }, h('span', { class: 'pill' }, h('b', null, String(st.moves.length)), ' Züge'), h('span', { class: 'pill' }, h('b', null, String(st.stops)), ' mal Stopp'), st.reached ? h('span', { class: 'pill good' }, 'Ziel erreicht') : null))),
    ], { eyebrow: 'Runde ' + nr });
  }

  const HILFEN = ['Kurze Ansagen', 'Nachfragen erlaubt', 'Stopp sagen dürfen', 'Langsam, ein Zug nach dem anderen', '„Deine linke“ statt „links“', 'Ruhige Stimme', 'Erst schauen, dann sagen'];

  CREW.registerGame({
    id: 'pilot-navigator',
    template: 'T3',
    icon: 'bolt',
    themen: ['Kooperation', 'Führen', 'Stopp-Recht', 'Klare Sprache'],
    safety: ['freiwillig'],
    help: false,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Zu zweit, gegenüber. Der Navigator sieht den Weg und sagt an, der Pilot steuert blind. Stopp darf jede:r drücken – sofort.',
        steps: [
          { icon: 'eye', title: 'Navigator oben', text: 'Sieht Weg und Hindernisse – auf dem Kopf.' },
          { icon: 'bolt', title: 'Pilot unten', text: 'Hört zu, tippt Pfeile. Runde 1 ohne Fragen.' },
          { icon: 'pause', title: 'Stopp-Knopf', text: 'Egal wer drückt: Alles steht.' },
        ],
        probe: ctx.T.probeCard('Probe: Der Navigator sagt „hoch“. Pilot, tipp den Pfeil. Zählt nicht.', [{ label: '↑ hoch', value: 'hoch', variant: 'ghost' }, { label: '→ rechts', value: 'rechts', variant: 'ghost' }]),
      });
      // Wer sitzt wo? Hand drauf entscheidet, wer zuerst Pilot ist (die andere Person Navigator)
      const w0 = ctx.scr([
        ctx.say('Legt das iPad in die Mitte, setzt euch gegenüber. Wer ist zuerst Pilot (unten)? Hand drauf.', { eyebrow: 'Plätze', small: true }),
        h('p', { class: 'muted' }, 'Die andere Person ist Navigator und schaut von oben – alles steht für sie auf dem Kopf. Nach Runde 1 wird getauscht.'),
      ], { eyebrow: 'Plätze' });
      const who = await ctx.T.handOn(w0, { zones: [{ id: 'links', label: 'Links ist zuerst Pilot' }, { id: 'rechts', label: 'Rechts ist zuerst Pilot' }] });
      const p1 = who === 'rechts' ? 'Rechts' : 'Links', n1 = who === 'rechts' ? 'Links' : 'Rechts';
      const ergebnisse = [];
      // Runde 1: ohne Rückfragen
      const k1 = kurs(ctx);
      const w1 = ctx.scr([ctx.say('Runde 1: Der Pilot darf NICHT nachfragen. Navigator: ein Wort pro Zug. Los.', { eyebrow: 'Runde 1 · ohne Rückfragen', small: true }), h('div', { class: 'row' }, h('span', { class: 'pill accent' }, 'Pilot: ' + p1), h('span', { class: 'pill' }, 'Navigator: ' + n1))], { eyebrow: 'Runde 1', center: true });
      if ((await ctx.next(w1, 'Start')) !== ctx.SKIP) {
        const r1 = await runde(ctx, k1, 1, false, { pilot: p1, nav: n1 });
        ergebnisse.push(r1);
        await ctx.next(auswertung(ctx, k1, r1, 1), 'Tauschen');
      }
      // Tausch: iPad drehen
      await ctx.T.passOn({ title: 'Tauschen', text: 'Dreht das iPad um. Jetzt ist ' + n1 + ' Pilot und ' + p1 + ' Navigator.', eyebrow: 'Runde 2', label: 'Getauscht' });
      // Runde 2: mit Rückfragen, neuer Kurs
      const k2 = kurs(ctx);
      const w2 = ctx.scr([ctx.say('Runde 2: Jetzt darf der Pilot nachfragen. „Meinst du meine linke?“ ist erlaubt und schlau.', { eyebrow: 'Runde 2 · mit Rückfragen', small: true }), h('div', { class: 'row' }, h('span', { class: 'pill accent' }, 'Pilot: ' + n1), h('span', { class: 'pill' }, 'Navigator: ' + p1))], { eyebrow: 'Runde 2', center: true });
      if ((await ctx.next(w2, 'Start')) !== ctx.SKIP) {
        const r2 = await runde(ctx, k2, 2, true, { pilot: n1, nav: p1 });
        ergebnisse.push(r2);
        await ctx.next(auswertung(ctx, k2, r2, 2), 'Vergleich');
      }
      // Vergleich beider Runden + „Was hat beim Führen geholfen?“ (zu zweit, zwei Chips, zwei Finger)
      const picked = [];
      const chips = HILFEN.map((t) => { const b = h('button', { type: 'button', class: 'chip', 'data-hilfe': t }, t); b.addEventListener('click', () => { CREW.sound.play('tap'); const i = picked.indexOf(t); if (i >= 0) picked.splice(i, 1); else if (picked.length < 2) picked.push(t); else return; b.classList.toggle('sel', picked.includes(t)); }); return b; });
      if (ctx.auto) { chips[0].click(); chips[1].click(); }
      const row = (r, i) => h('div', { class: 'vk-item' }, h('span', { class: 'vk-ic', style: { background: i ? 'var(--good)' : 'var(--teamA)' } }, h('b', null, String(i + 1))), h('div', { class: 'stack', style: { gap: '2px' } }, h('b', null, 'Runde ' + (i + 1) + (i ? ' · mit Rückfragen' : ' · ohne Rückfragen')), h('span', { class: 'muted small' }, (r.reached ? 'Ziel erreicht' : r.crash ? 'Crash' : 'nicht am Ziel') + ' · ' + r.moves.length + ' Züge · ' + r.stops + ' mal Stopp')));
      const w3 = ctx.scr([
        h('div', { class: 'grid two' },
          h('div', { class: 'card stack' }, h('b', null, 'Beide Runden'), ergebnisse.length ? ergebnisse.map(row) : h('p', { class: 'muted' }, 'Keine Runde gefahren.')),
          h('div', { class: 'card stack' }, h('b', null, 'Was hat beim Führen geholfen? Wählt zu zweit zwei Dinge.'), h('div', { class: 'row', style: { gap: '8px' } }, chips))),
        ctx.safetyLine('freiwillig'),
      ], { eyebrow: 'Vergleich' });
      await ctx.T.twoFinger(w3, { label: 'Beide einig: Finger drauf' });
      const reached = ergebnisse.filter((r) => r.reached).length;
      const stops = ergebnisse.reduce((a, r) => a + r.stops, 0);
      return {
        summary: reached === 2 ? 'Zweimal am Ziel. Ansage, Hören, Nachfragen – das war Teamarbeit.' : reached === 1 ? 'Einmal am Ziel. Ein Crash ist kein Fehler, sondern zwei Bilder im Kopf.' : 'Keine Runde am Ziel – und trotzdem viel gelernt: Rückfragen gleichen Bilder ab.',
        stats: [[reached, 'mal am Ziel'], [stops, 'mal Stopp'], [picked.length, 'Helfer gewählt']],
      };
    },
  });
})();

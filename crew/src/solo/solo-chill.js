/* Solo: „Chill-Zone“ – drei ruhige Übungen zum Runterkommen, alleine am iPad.
   Idee aus den ISA-Materialien (Atemübungen, Glitzerglas, Achtsamkeit / Sinne).
   Keine Punkte, keine Zeitmessung, nichts wird über die Person gespeichert. */
(function () {
  const CREW = window.CREW;
  const NS = 'http://www.w3.org/2000/svg';
  const reduced = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  // Bildschirm aufbauen und als Solo-Bildschirm markieren (für modul-eigenes CSS)
  function scr(ctx, kids, opts) { const w = ctx.screen(kids, opts); w.classList.add('solo-screen'); return w; }
  const fast = () => !!window.__fast; // nur in automatischen Tests (Physik schneller)
  const { sleep } = CREW.util;
  let uid = 0;

  /* ---------- Farben aus den Design-Tokens (für Canvas) ---------- */
  function token(name, fallback) {
    const app = document.getElementById('app');
    const v = app ? getComputedStyle(app).getPropertyValue(name).trim() : '';
    return v || fallback;
  }
  function rgba(hex, a) {
    let s = String(hex).trim().replace('#', '');
    if (!/^[0-9a-f]+$/i.test(s)) return hex;
    if (s.length === 3 || s.length === 4) s = s.split('').map((c) => c + c).join('');
    const r = parseInt(s.slice(0, 2), 16), g = parseInt(s.slice(2, 4), 16), b = parseInt(s.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  /* ---------- Kleine Bilder fürs Menü (Farben kommen per CSS aus den Tokens) ---------- */
  const ART = {
    welle: () => {
      const id = 'solo-artw-' + (++uid);
      return `<svg viewBox="0 0 160 110" aria-hidden="true"><defs><clipPath id="${id}"><circle cx="80" cy="55" r="46"/></clipPath></defs>
        <circle cx="80" cy="55" r="52" class="solo-art-halo"/>
        <circle cx="80" cy="55" r="46" class="solo-art-bg"/>
        <g clip-path="url(#${id})">
          <g class="solo-art-slide"><path class="solo-art-wave2" d="M-100 58 q15 -9 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 V130 H-100z"/></g>
          <g class="solo-art-slide rev"><path class="solo-art-wave" d="M-100 66 q15 -9 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 V130 H-100z"/></g>
        </g>
        <circle cx="80" cy="55" r="46" class="solo-art-ring"/>
        <path d="M50 34 A 36 36 0 0 1 70 21" class="solo-art-shine"/></svg>`;
    },
    glas: () => {
      const dots = [[62, 86, 3, 1], [70, 90, 2.5, 2], [80, 87, 3, 3], [90, 90, 2.5, 4], [98, 86, 3, 5], [66, 80, 2, 3], [86, 82, 2.2, 1], [94, 79, 2, 2],
        [74, 60, 2.4, 4], [88, 52, 2, 5], [68, 44, 1.8, 1], [96, 64, 2.2, 3], [80, 70, 2, 2], [76, 82, 2.4, 5], [60, 70, 1.8, 2]];
      return `<svg viewBox="0 0 160 110" aria-hidden="true">
        <ellipse cx="80" cy="102" rx="36" ry="5" class="solo-art-shadow"/>
        <rect x="50" y="24" width="60" height="74" rx="16" class="solo-art-liquid"/>
        ${dots.map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" class="solo-art-c${c}"/>`).join('')}
        <path d="M60 36 v40" class="solo-art-shine"/>
        <rect x="50" y="24" width="60" height="74" rx="16" class="solo-art-glass"/>
        <rect x="56" y="10" width="48" height="16" rx="4" class="solo-art-lid"/></svg>`;
    },
    sinne: () => {
      const pts = [[28, 70, 5], [54, 50, 4], [80, 42, 3], [106, 50, 2], [132, 70, 1]];
      return `<svg viewBox="0 0 160 110" aria-hidden="true">
        <path d="M28 70 Q80 14 132 70" class="solo-art-path"/>
        ${pts.map(([x, y, n], i) => `<g class="solo-art-num n${i}"><circle cx="${x}" cy="${y}" r="${17 - i * 1.6}"/><text x="${x}" y="${y + 1}">${n}</text></g>`).join('')}</svg>`;
    },
  };

  /* Sinnes-Icons (gleicher Strich-Stil wie CREW.icon) */
  const SENSE_ICON = {
    sehen: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    hoeren: '<path d="M7 10a5 5 0 0 1 10 0c0 3.2-3.2 3.8-3.2 6.8a3 3 0 0 1-5.6 1.4"/><path d="M10 10a2 2 0 0 1 4 0c0 1.3-1.2 1.7-1.6 2.6"/><path d="M19.5 5.5a8 8 0 0 1 0 9"/>',
    fuehlen: '<path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V12"/><path d="M11 11V5a1.5 1.5 0 0 1 3 0v6"/><path d="M14 11.5V6.5a1.5 1.5 0 0 1 3 0V14c0 4-2.5 6.5-6 6.5-2.8 0-4.3-1.6-5.6-3.8L4 13.8a1.4 1.4 0 0 1 2.3-1.6L8 14.5"/>',
    riechen: '<path d="M10.5 3.5c0 4.5-1.3 7.6-3.1 9.9-1 1.3-.6 3.5 1.3 4"/><path d="M13.5 3.5c0 4.5 1.3 7.6 3.1 9.9 1 1.3.6 3.5-1.3 4"/><path d="M8.7 17.4c1 .9 2.2 1 3.3.2 1.1.8 2.3.7 3.3-.2"/>',
    schmecken: '<path d="M2.5 12c2.2-2.6 4.6-3.9 6.8-3.4 1 .2 1.8.7 2.7 1.3.9-.6 1.7-1.1 2.7-1.3 2.2-.5 4.6.8 6.8 3.4"/><path d="M2.5 12c2.6 3.4 5.8 5 9.5 5s6.9-1.6 9.5-5"/><path d="M2.5 12c3 .9 6.2 1.3 9.5 1.3s6.5-.4 9.5-1.3"/>',
  };
  function senseIcon(id, size) {
    const s = size || 28;
    const span = document.createElement('span');
    span.className = 'ic';
    span.setAttribute('aria-hidden', 'true');
    span.style.display = 'inline-grid';
    span.innerHTML = `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">${SENSE_ICON[id]}</svg>`;
    return span;
  }

  /* =========================================================
     Menü
     ========================================================= */
  function menu(ctx) {
    const { h, ui } = ctx;
    let choose;
    const p = new Promise((res) => { choose = res; });
    const card = (id, art, title, sub, pill) => {
      const b = h('button', { type: 'button', class: 'tile solo-ex', id: 'chill-' + id, 'data-ex': id },
        h('span', { class: 'solo-ex-art', html: art() }),
        h('span', { class: 'solo-ex-text' },
          h('span', { class: 't-title' }, title),
          h('span', { class: 't-sub' }, sub)),
        h('span', { class: 'pill solo-ex-pill' }, pill));
      b.addEventListener('click', () => { CREW.sound.play('tap'); choose(id); });
      return b;
    };
    scr(ctx, [
      h('div', { class: 'stack enter', style: { gap: '6px' } },
        h('span', { class: 'eyebrow' }, 'Solo-Zone'),
        h('h1', { class: 'outline-text' }, 'Chill-Zone'),
        h('p', { class: 'lead muted' }, 'Such dir etwas aus. Keine Punkte, kein Druck.')),
      h('div', { class: 'solo-ex-grid enter-2' },
        card('welle', ART.welle, 'Atem-Welle', 'Atme mit der Welle. Ein, halten, aus.', '1–3 Min'),
        card('glas', ART.glas, 'Glitzerglas', 'Wirbel den Glitzer auf. Schau zu, wie er sinkt.', 'So lange du willst'),
        card('sinne', ART.sinne, '5-4-3-2-1', 'Mit allen Sinnen zurück ins Hier und Jetzt.', 'ca. 2 Min')),
      h('div', { class: 'row between enter-3' },
        h('p', { class: 'muted small', style: { maxWidth: '44ch' } }, 'Mit dem X oben rechts kannst du jede Übung abbrechen.'),
        ui.btn('Zurück', () => choose('back'), { variant: 'ghost', icon: 'left', id: 'chill-back' })),
    ]);
    return ctx.waitFor(p);
  }

  /* =========================================================
     Gemeinsamer Abschluss: „Und, wie ist es jetzt?“ (wird nicht gespeichert)
     ========================================================= */
  const FEEL = [
    { id: 'ruhiger', label: 'Ruhiger', wx: 'sonne', text: 'Schön. Merk dir, was dir gerade geholfen hat.' },
    { id: 'gleich', label: 'Gleich', wx: 'grau', text: 'Auch okay. Manchmal braucht es mehr Zeit. Probier ruhig noch eine Übung.' },
    { id: 'unruhig', label: 'Noch unruhig', wx: 'gewitter', text: 'Das ist okay. Probier eine andere Übung. Oder sprich mit jemandem, dem du vertraust.' },
  ];
  async function outro(ctx, o) {
    const { h, ui } = ctx;
    let done;
    const p = new Promise((res) => { done = res; });
    const answer = h('p', { class: 'solo-feel-answer', 'aria-live': 'polite' }, 'Nur für dich. Wird nirgends gespeichert.');
    const row = h('div', { class: 'solo-feel-row' }, FEEL.map((f) => {
      const b = h('button', { type: 'button', class: 'solo-feel', 'data-feel': f.id }, CREW.weatherIcon(f.wx, 54), h('span', null, f.label));
      b.addEventListener('click', () => {
        CREW.sound.play('tap');
        row.querySelectorAll('.solo-feel').forEach((x) => x.classList.toggle('sel', x === b));
        answer.textContent = f.text;
        answer.classList.add('on');
      });
      return b;
    }));
    scr(ctx, [
      h('div', { class: 'solo-done-badge pop' }, CREW.icon('leaf', 46)),
      h('div', { class: 'stack', style: { gap: '8px', alignItems: 'center' } },
        h('h2', null, o.title),
        h('p', { class: 'lead muted' }, o.text)),
      h('div', { class: 'card stack solo-checkout enter-2' },
        h('h3', null, 'Und, wie ist es jetzt?'),
        row, answer),
      h('div', { class: 'row center enter-3' },
        ui.btn(o.again || 'Nochmal', () => done('again'), { variant: 'ghost', icon: 'undo', id: 'chill-again' }),
        ui.btn('Zur Chill-Zone', () => done('menu'), { variant: 'good', icon: 'leaf', id: 'chill-menu' })),
    ], { center: true, narrow: true });
    CREW.sound.play('soft');
    const r = await ctx.waitFor(p);
    return r === ctx.SKIP ? 'menu' : r;
  }

  /* =========================================================
     (a) Atem-Welle
     ========================================================= */
  const RHYTHMS = [
    { id: 'ruhig', title: 'Ruhig-Atmung', nums: '4 · 4 · 6', desc: 'Länger ausatmen beruhigt den Körper.', phases: [['in', 4], ['hold', 4], ['out', 6]] },
    { id: 'box', title: 'Box-Atmung', nums: '4 · 4 · 4 · 4', desc: 'Wie ein Quadrat. Nutzen auch Profis im Sport.', phases: [['in', 4], ['hold', 4], ['out', 4], ['rest', 4]] },
  ];
  const PHASE = {
    in: { label: 'Einatmen', hint: 'Langsam durch die Nase.', short: 'Ein' },
    hold: { label: 'Halten', hint: 'Ganz locker bleiben.', short: 'Halten' },
    out: { label: 'Ausatmen', hint: 'Langsam durch den Mund.', short: 'Aus' },
    rest: { label: 'Halten', hint: 'Kurz leer bleiben.', short: 'Halten' },
  };
  const LOW = 0.14, HIGH = 0.86;
  const pref = { min: 1, rhythm: 'ruhig' }; // nur für diese Sitzung, nicht gespeichert

  // Kleines Bild vom Takt (Kurve bzw. Quadrat)
  function rhythmArt(id) {
    if (id === 'box') return '<svg viewBox="0 0 64 40" aria-hidden="true"><rect x="14" y="4" width="32" height="32" rx="3" class="solo-rh-line"/><circle cx="14" cy="36" r="4" class="solo-rh-dot"/></svg>';
    return '<svg viewBox="0 0 64 40" aria-hidden="true"><path d="M4 34 L18 8 L32 8 L60 34" class="solo-rh-line"/><circle cx="4" cy="34" r="4" class="solo-rh-dot"/></svg>';
  }

  function breathSetup(ctx) {
    const { h, ui } = ctx;
    let done;
    const p = new Promise((res) => { done = res; });
    const minRow = h('div', { class: 'solo-seg', role: 'group', 'aria-label': 'Dauer' });
    const drawMin = () => {
      CREW.util.clear(minRow);
      [1, 2, 3].forEach((m) => {
        const b = h('button', { type: 'button', class: 'solo-seg-btn' + (pref.min === m ? ' sel' : ''), 'data-min': m, 'aria-pressed': String(pref.min === m) },
          h('b', null, String(m)), h('span', null, 'Min'));
        b.addEventListener('click', () => { CREW.sound.play('tap'); pref.min = m; drawMin(); });
        minRow.appendChild(b);
      });
    };
    const rhRow = h('div', { class: 'solo-rh-grid' });
    const drawRh = () => {
      CREW.util.clear(rhRow);
      RHYTHMS.forEach((r) => {
        const b = h('button', { type: 'button', class: 'solo-rh' + (pref.rhythm === r.id ? ' sel' : ''), 'data-rhythm': r.id, 'aria-pressed': String(pref.rhythm === r.id) },
          h('span', { class: 'solo-rh-art', html: rhythmArt(r.id) }),
          h('span', { class: 'solo-rh-text' },
            h('span', { class: 'solo-rh-title' }, r.title),
            h('span', { class: 'solo-rh-nums' }, r.nums),
            h('span', { class: 'solo-rh-desc' }, r.desc)));
        b.addEventListener('click', () => { CREW.sound.play('tap'); pref.rhythm = r.id; drawRh(); });
        rhRow.appendChild(b);
      });
    };
    drawMin(); drawRh();
    scr(ctx, [
      h('div', { class: 'stack enter', style: { gap: '6px' } },
        h('span', { class: 'eyebrow' }, 'Chill-Zone · Atem-Welle'),
        h('h2', null, 'Wie lange? Welcher Takt?')),
      h('div', { class: 'card stack enter-2' }, h('h3', null, 'Dauer'), minRow),
      h('div', { class: 'card stack enter-2' }, h('h3', null, 'Takt'), rhRow,
        h('p', { class: 'muted small' }, 'Die Zahlen sind Sekunden. Wenn es zu lang ist: einfach kürzer atmen.')),
      h('div', { class: 'row between enter-3' },
        ui.btn('Zurück', () => done('back'), { variant: 'ghost', icon: 'left' }),
        ui.btn('Start', () => done('go'), { variant: 'good', big: true, icon: 'play', id: 'breath-start' })),
    ], { narrow: true });
    return ctx.waitFor(p);
  }

  // Bullauge mit Welle (SVG). draw(level 0..1, Zeit) malt Wasserstand und Wellen.
  function makeWave() {
    const id = 'solo-clip-' + (++uid);
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 400 400');
    svg.setAttribute('class', 'solo-port-svg');
    svg.setAttribute('aria-hidden', 'true');
    const bubbles = Array.from({ length: 7 }, () => '<circle class="solo-bubble" r="4" cx="-20" cy="-20"/>').join('');
    svg.innerHTML = `<defs><clipPath id="${id}"><circle cx="200" cy="200" r="172"/></clipPath>
        <filter id="${id}-b" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter></defs>
      <circle class="solo-port-halo" cx="200" cy="200" r="180" filter="url(#${id}-b)"/>
      <circle class="solo-port-bg" cx="200" cy="200" r="172"/>
      <g clip-path="url(#${id})">
        <path class="solo-wave back"/>
        <path class="solo-wave front"/>
        <g>${bubbles}</g>
        <path class="solo-wave-line"/>
      </g>
      <circle class="solo-port-ring" cx="200" cy="200" r="172"/>
      <path class="solo-port-shine" d="M86 126 A 132 132 0 0 1 150 76"/>`;
    const back = svg.querySelector('.back'), front = svg.querySelector('.front'), line = svg.querySelector('.solo-wave-line');
    const halo = svg.querySelector('.solo-port-halo');
    const calm = reduced();
    const bs = Array.from(svg.querySelectorAll('.solo-bubble')).map((el) => ({
      el, x: 60 + Math.random() * 280, y: 380 + Math.random() * 120, v: 14 + Math.random() * 22, r: 2 + Math.random() * 4, w: Math.random() * 6,
    }));
    let last = 0;
    const surface = (base, amp, phase, freq) => {
      const pts = [];
      for (let x = 0; x <= 400; x += 10) pts.push(x + ' ' + (base + Math.sin(x * freq + phase) * amp).toFixed(1));
      return pts;
    };
    function draw(level, now) {
      const t = calm ? 0 : now / 1000;
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;
      const base = 372 - level * 344;
      const b = surface(base - 7, 8, t * 0.8 + 1.4, 0.021);
      const f = surface(base, 10, -t * 1.1, 0.016);
      back.setAttribute('d', 'M0 400 L' + b.join(' L') + ' L400 400 Z');
      front.setAttribute('d', 'M0 400 L' + f.join(' L') + ' L400 400 Z');
      line.setAttribute('d', 'M' + f.join(' L'));
      halo.setAttribute('r', (168 + level * 26).toFixed(1));
      halo.style.opacity = String(0.1 + level * 0.5);
      bs.forEach((q) => {
        if (calm) { q.el.setAttribute('cy', '-20'); return; }
        q.y -= q.v * dt;
        const sx = q.x + Math.sin(t * 1.3 + q.w) * 5;
        if (q.y < base + 14) { q.y = 392 + Math.random() * 60; q.x = 60 + Math.random() * 280; }
        q.el.setAttribute('cx', sx.toFixed(1));
        q.el.setAttribute('cy', q.y.toFixed(1));
        q.el.setAttribute('r', q.r.toFixed(1));
      });
    }
    return { el: svg, draw };
  }

  const ease = (k) => 0.5 - Math.cos(Math.PI * k) / 2;

  async function breathe(ctx) {
    const { h, ui } = ctx;
    const R = RHYTHMS.find((r) => r.id === pref.rhythm) || RHYTHMS[0];
    const cycleLen = R.phases.reduce((a, [, s]) => a + s, 0);
    const cycles = Math.max(2, Math.round((pref.min * 60) / cycleLen));
    const total = cycles * cycleLen;

    const wave = makeWave();
    const num = h('div', { class: 'solo-port-num' }, '3');
    const label = h('div', { class: 'display solo-phase-label', 'aria-live': 'polite' }, 'Gleich geht’s los');
    const hint = h('p', { class: 'lead muted solo-phase-hint' }, 'Setz dich bequem hin. Schultern locker.');
    const chips = R.phases.map(([ph, s]) => h('span', { class: 'solo-phase' }, PHASE[ph].short, h('b', null, String(s))));
    const count = h('span', { class: 'pill' }, 'Atemzug 1 von ' + cycles);
    const bar = h('i');
    let stopFn;
    const stopP = new Promise((res) => { stopFn = res; });
    scr(ctx, [
      h('div', { class: 'row between solo-breath-head' },
        h('span', { class: 'eyebrow' }, 'Atem-Welle · ' + R.title), count),
      h('div', { class: 'solo-breath' },
        h('div', { class: 'solo-port' }, wave.el, num),
        h('div', { class: 'solo-breath-side' },
          label, hint,
          h('div', { class: 'solo-phases' }, chips),
          h('div', { class: 'progress solo-thin' }, bar),
          h('div', { class: 'row' }, ui.btn('Beenden', () => stopFn('stop'), { variant: 'ghost', small: true, icon: 'x', id: 'breath-stop' })))),
    ]);

    // Zustand für die Animation (läuft per requestAnimationFrame, Takt per Sekunden-Schritten)
    const st = { stop: false, from: LOW, to: LOW, secs: 1, idx: 0, t0: performance.now() };
    const dead = () => st.stop || !ctx.alive();
    (function frame(now) {
      if (dead() || !document.body.contains(wave.el)) return;
      const k = Math.min(1, (st.idx + Math.min(1, (now - st.t0) / 1000)) / st.secs);
      wave.draw(st.from + (st.to - st.from) * ease(k), now);
      requestAnimationFrame(frame);
    })(performance.now());

    const loop = (async () => {
      // Vorlauf 3 – 2 – 1
      for (let s = 3; s > 0; s--) {
        num.textContent = String(s);
        await sleep(1000);
        if (dead()) return 'dead';
      }
      let elapsed = 0;
      for (let c = 0; c < cycles; c++) {
        count.textContent = 'Atemzug ' + (c + 1) + ' von ' + cycles;
        for (let pi = 0; pi < R.phases.length; pi++) {
          const [ph, secs] = R.phases[pi];
          const P = PHASE[ph];
          label.textContent = P.label + ' …';
          hint.textContent = P.hint;
          label.dataset.phase = ph;
          chips.forEach((x, i) => x.classList.toggle('on', i === pi));
          st.from = st.to;
          st.to = ph === 'in' ? HIGH : ph === 'out' ? LOW : st.from;
          st.secs = secs;
          if (ph === 'in') CREW.sound.play('breatheIn');
          else if (ph === 'out') CREW.sound.play('breatheOut');
          for (let s = 0; s < secs; s++) {
            st.idx = s;
            st.t0 = performance.now();
            num.textContent = String(secs - s);
            await sleep(1000);
            if (dead()) return 'dead';
            elapsed++;
            bar.style.width = Math.round((elapsed / total) * 100) + '%';
          }
        }
      }
      return 'done';
    })().catch(() => 'dead');

    let r;
    try {
      r = await ctx.waitFor(Promise.race([loop, stopP]));
    } finally {
      st.stop = true;
    }
    if (r === ctx.SKIP) return 'menu';
    if (r === 'done') return outro(ctx, { title: 'Geschafft.', text: cycles + ' ruhige Atemzüge. Das geht auch unauffällig: im Bus, vor einem Test, beim Warten.' });
    return outro(ctx, { title: 'Auch kurz hilft.', text: 'Schon ein paar ruhige Atemzüge machen einen Unterschied.' });
  }

  async function atemWelle(ctx) {
    for (;;) {
      const s = await breathSetup(ctx);
      if (s !== 'go') return; // Zurück oder X-Karte
      const r = await breathe(ctx);
      if (r !== 'again') return;
    }
  }

  /* =========================================================
     (b) Glitzerglas – Canvas mit ein paar hundert Glitzerteilchen
     ========================================================= */
  function jarSim(canvas, box, cb) {
    const app = document.getElementById('app');
    const look = (app && app.dataset.look) || 'arena';
    const pixel = look === 'pixel', neon = look === 'neon';
    const COLS = [token('--yellow', '#ffc93c'), token('--accent', '#ff6b3d'), token('--good', '#2ee6c5'), token('--teamA', '#3da5ff'), token('--teamB', '#ff4fa3'), '#ffffff'];
    const INK = token('--ink', '#0e0a26');
    const LINE = neon ? token('--accent', '#00e5ff') : token('--line', '#0e0a26');
    const TEXT = token('--text', '#fff8ee');
    const LIQ = neon ? token('--accent', '#00e5ff') : token('--teamA', '#3da5ff');
    const LID = token('--accent', '#ff6b3d');
    const PANEL = token('--panel', '#141433');
    const g = canvas.getContext('2d');
    const calm = reduced();
    const SPEED = fast() ? 8 : 1;
    let W = 0, H = 0, dpr = 1, jar = null, ps = [];
    let running = true, raf = 0, last = performance.now();
    let turb = 0, lastStir = performance.now(), settled = false, ptr = null;

    // Boden des Glases (unten abgerundet)
    function floorAt(x) {
      const r = jar.r * 0.9;
      const dx = Math.min(x - jar.bx0, jar.bx1 - x);
      if (r <= 0 || dx >= r) return jar.by1;
      const k = r - Math.max(0, dx);
      return jar.by1 - (r - Math.sqrt(Math.max(0, r * r - k * k)));
    }
    function restY(p) { return floorAt(p.x) - p.s - jar.pile * Math.pow(p.u, 1.8); }

    function makeParticle(shaken) {
      const s = 1.3 + Math.pow(Math.random(), 2.2) * 3.4;
      const p = {
        x: jar.bx0 + 6 + Math.random() * (jar.bx1 - jar.bx0 - 12), y: 0, vx: 0, vy: 0,
        s, w: 0.65 + s / 4.5, c: Math.floor(Math.random() * COLS.length), flake: Math.random() < 0.3,
        a: Math.random() * 6.3, va: (Math.random() - 0.5) * 3, u: Math.random(), rest: !shaken,
      };
      if (shaken) {
        p.y = jar.by0 + Math.random() * (jar.by1 - jar.by0);
        p.vx = (Math.random() - 0.5) * 120; p.vy = (Math.random() - 0.5) * 120;
      } else p.y = restY(p);
      return p;
    }

    function layout() {
      const r = box.getBoundingClientRect();
      const nw = Math.max(220, Math.round(r.width)), nh = Math.max(240, Math.round(r.height));
      if (nw === W && nh === H && jar) return;
      const old = jar;
      W = nw; H = nh;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      const jh = H * 0.95;
      const jw = Math.min(W * 0.9, jh * 0.74);
      const x0 = (W - jw) / 2, y0 = (H - jh) / 2;
      const lidH = Math.max(18, jh * 0.075);
      const bw = Math.max(5, jw * 0.022);
      jar = { x0, y0, w: jw, h: jh, lidH, r: pixel ? 0 : jw * 0.16, bx0: x0 + bw + 2, bx1: x0 + jw - bw - 2, by0: y0 + lidH + jh * 0.05, by1: y0 + jh - bw - 2, bw };
      jar.pile = (jar.by1 - jar.by0) * 0.08;
      if (!old) {
        const area = (jar.bx1 - jar.bx0) * (jar.by1 - jar.by0);
        const n = Math.round(Math.max(320, Math.min(900, area / 240)));
        ps = Array.from({ length: n }, () => makeParticle(!calm));
        ps.sort((a, b) => a.c - b.c); // nach Farbe sortiert = schneller malen
        if (!calm) { turb = 3; lastStir = performance.now(); }
      } else {
        const sx = (jar.bx1 - jar.bx0) / (old.bx1 - old.bx0), sy = (jar.by1 - jar.by0) / (old.by1 - old.by0);
        ps.forEach((p) => {
          p.x = jar.bx0 + (p.x - old.bx0) * sx;
          p.y = jar.by0 + (p.y - old.by0) * sy;
          if (p.rest) p.y = restY(p);
        });
      }
    }

    function step(dt, now) {
      const drag = Math.exp(-1.7 * dt);
      const G = 26;
      turb *= Math.exp(-1.3 * dt);
      let moving = 0;
      for (const p of ps) {
        if (p.rest) continue;
        moving++;
        p.vy += G * p.w * dt;
        if (turb > 0.05) { p.vx += (Math.random() - 0.5) * turb * 60 * dt; p.vy += (Math.random() - 0.5) * turb * 60 * dt; }
        p.vx += (Math.random() - 0.5) * 8 * dt;
        p.vx *= drag; p.vy *= drag;
        p.x += p.vx * dt; p.y += p.vy * dt;
        p.a += p.va * dt;
        if (p.x < jar.bx0 + p.s) { p.x = jar.bx0 + p.s; p.vx = Math.abs(p.vx) * 0.4; }
        if (p.x > jar.bx1 - p.s) { p.x = jar.bx1 - p.s; p.vx = -Math.abs(p.vx) * 0.4; }
        if (p.y < jar.by0 + p.s) { p.y = jar.by0 + p.s; p.vy = Math.abs(p.vy) * 0.3; }
        const fy = restY(p);
        if (p.y >= fy) {
          p.y = fy;
          if (Math.abs(p.vy) < 70 && turb < 0.8) { p.rest = true; p.vx = 0; p.vy = 0; } else p.vy = -Math.abs(p.vy) * 0.25;
        }
      }
      if (!settled && moving <= ps.length * 0.03 && !ptr && now - lastStir > 1200) {
        settled = true;
        cb.onSettle();
      }
    }

    function bodyPath() {
      const { x0, y0, w, h, lidH, r } = jar;
      const top = y0 + lidH * 0.6, bottom = y0 + h, rt = r * 0.45;
      g.beginPath();
      g.moveTo(x0 + rt, top);
      g.lineTo(x0 + w - rt, top);
      g.quadraticCurveTo(x0 + w, top, x0 + w, top + rt);
      g.lineTo(x0 + w, bottom - r);
      g.quadraticCurveTo(x0 + w, bottom, x0 + w - r, bottom);
      g.lineTo(x0 + r, bottom);
      g.quadraticCurveTo(x0, bottom, x0, bottom - r);
      g.lineTo(x0, top + rt);
      g.quadraticCurveTo(x0, top, x0 + rt, top);
      g.closePath();
    }

    function shine(x, y, sw, sh, a) {
      const gr = g.createLinearGradient(0, y, 0, y + sh);
      gr.addColorStop(0, 'rgba(255,255,255,0)');
      gr.addColorStop(0.25, `rgba(255,255,255,${a})`);
      gr.addColorStop(0.7, `rgba(255,255,255,${a})`);
      gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr;
      g.beginPath();
      if (g.roundRect && !pixel) g.roundRect(x, y, sw, sh, sw / 2); else g.rect(x, y, sw, sh);
      g.fill();
    }
    function draw(now) {
      const { x0, y0, w, h, lidH } = jar;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, W, H);
      // Schatten
      g.fillStyle = rgba(INK, 0.35);
      g.beginPath();
      g.ellipse(x0 + w / 2, y0 + h + 2, w * 0.46, Math.max(6, h * 0.018), 0, 0, Math.PI * 2);
      g.fill();
      // Flüssigkeit
      g.save();
      bodyPath();
      g.clip();
      const grad = g.createLinearGradient(0, y0, 0, y0 + h);
      grad.addColorStop(0, rgba(LIQ, 0.08));
      grad.addColorStop(1, rgba(LIQ, 0.3));
      g.fillStyle = grad;
      g.fillRect(x0, y0, w, h);
      // Glitzer: erst runde Teilchen gebündelt pro Farbe, dann funkelnde Plättchen
      if (neon) g.globalCompositeOperation = 'lighter';
      const t = now / 1000;
      let cur = -1;
      g.beginPath();
      for (const p of ps) {
        if (p.flake) continue;
        if (p.c !== cur) { if (cur >= 0) g.fill(); g.beginPath(); cur = p.c; g.fillStyle = COLS[cur]; }
        if (pixel) { const s = Math.max(2, Math.round(p.s * 1.4)); g.rect(Math.round(p.x - s / 2), Math.round(p.y - s / 2), s, s); }
        else { g.moveTo(p.x + p.s, p.y); g.arc(p.x, p.y, p.s, 0, Math.PI * 2); }
      }
      if (cur >= 0) g.fill();
      for (const p of ps) {
        if (!p.flake) continue;
        const ang = p.a + (calm ? 0 : t * (p.rest ? 0.6 : 0) * p.va);
        g.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(ang * 1.7));
        g.fillStyle = COLS[p.c];
        const s = p.s * 1.5;
        if (pixel) { g.fillRect(Math.round(p.x - s / 2), Math.round(p.y - s / 2), Math.max(2, Math.round(s)), Math.max(2, Math.round(s * 0.6))); continue; }
        const ca = Math.cos(ang) * s, sa = Math.sin(ang) * s;
        g.beginPath();
        g.moveTo(p.x + ca, p.y + sa);
        g.lineTo(p.x - sa * 0.45, p.y + ca * 0.45);
        g.lineTo(p.x - ca, p.y - sa);
        g.lineTo(p.x + sa * 0.45, p.y - ca * 0.45);
        g.closePath();
        g.fill();
      }
      g.globalAlpha = 1;
      g.globalCompositeOperation = 'source-over';
      // Glanz auf dem Glas
      shine(x0 + w * 0.1, y0 + lidH + h * 0.06, Math.max(6, w * 0.055), h * 0.55, 0.13);
      shine(x0 + w * 0.83, y0 + lidH + h * 0.1, Math.max(4, w * 0.028), h * 0.28, 0.08);
      g.restore();
      // Glasrand
      g.lineJoin = 'round';
      if (neon) { g.shadowColor = LINE; g.shadowBlur = 16; }
      g.lineWidth = jar.bw * 1.4;
      g.strokeStyle = neon ? LINE : rgba(LINE, 1);
      bodyPath();
      g.stroke();
      g.shadowBlur = 0;
      if (!neon) {
        g.lineWidth = Math.max(2, jar.bw * 0.45);
        g.strokeStyle = rgba(TEXT, 0.4);
        bodyPath();
        g.stroke();
      }
      // Deckel
      const lx = x0 + w * 0.07, lw = w * 0.86, lr = pixel ? 0 : Math.min(8, lidH * 0.3);
      g.beginPath();
      if (g.roundRect) g.roundRect(lx, y0, lw, lidH, lr); else g.rect(lx, y0, lw, lidH);
      if (neon) { g.fillStyle = PANEL; g.fill(); g.fillStyle = rgba(LID, 0.22); }
      else g.fillStyle = LID;
      g.fill();
      g.lineWidth = Math.max(3, jar.bw * 0.9);
      g.strokeStyle = neon ? LID : LINE;
      g.stroke();
      g.strokeStyle = rgba(neon ? LID : INK, 0.3);
      g.lineWidth = 2;
      for (let x = lx + 12; x < lx + lw - 6; x += 12) { g.beginPath(); g.moveTo(x, y0 + 5); g.lineTo(x, y0 + lidH - 5); g.stroke(); }
    }

    function frame(now) {
      if (!running) return;
      if (!document.body.contains(canvas)) { stop(); return; }
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000)) * SPEED;
      last = now;
      step(dt, now);
      draw(now);
      raf = requestAnimationFrame(frame);
    }

    // Umrühren: in der Nähe des Fingers bekommen die Teilchen Schwung
    function stir(x, y, vx, vy, burst) {
      const R = Math.max(60, jar.w * 0.22);
      const k = calm ? 0.5 : 1;
      for (const p of ps) {
        const dx = p.x - x, dy = p.y - y;
        const d2 = dx * dx + dy * dy;
        if (d2 > R * R) continue;
        const d = Math.sqrt(d2) || 1;
        const f = (1 - d / R) * k;
        if (burst) {
          p.vx += (dx / d) * 170 * f + (Math.random() - 0.5) * 40;
          p.vy += (dy / d) * 170 * f - 90 * f;
        } else {
          p.vx += vx * 0.32 * f - (dy / d) * 40 * f;
          p.vy += vy * 0.32 * f + (dx / d) * 40 * f - 30 * f;
        }
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 900) { p.vx *= 900 / sp; p.vy *= 900 / sp; }
        p.rest = false;
      }
      lastStir = performance.now();
      if (settled) { settled = false; cb.onStir(); }
    }
    const pos = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() }; };
    const onDown = (e) => {
      e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* egal */ }
      ptr = pos(e);
      stir(ptr.x, ptr.y, 0, 0, true);
      CREW.sound.play('whoosh');
    };
    const onMove = (e) => {
      if (!ptr) return;
      const q = pos(e);
      const dt = Math.max(0.008, (q.t - ptr.t) / 1000);
      stir(q.x, q.y, Math.max(-2200, Math.min(2200, (q.x - ptr.x) / dt)), Math.max(-2200, Math.min(2200, (q.y - ptr.y) / dt)), false);
      ptr = q;
    };
    const onUp = () => { ptr = null; lastStir = performance.now(); };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    const ro = window.ResizeObserver ? new ResizeObserver(() => layout()) : null;
    if (ro) ro.observe(box); else window.addEventListener('resize', layout);

    function shake() {
      for (const p of ps) {
        p.rest = false;
        p.vx = (Math.random() - 0.5) * (calm ? 120 : 320);
        p.vy = -Math.random() * (calm ? 160 : 420);
      }
      turb = calm ? 1 : 4;
      lastStir = performance.now();
      CREW.sound.play('whoosh');
      if (settled) { settled = false; cb.onStir(); }
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect(); else window.removeEventListener('resize', layout);
    }

    layout();
    if (calm) { settled = true; cb.onSettle(true); }
    raf = requestAnimationFrame(frame);
    return { shake, stop, count: () => ps.length, moving: () => ps.filter((p) => !p.rest).length };
  }

  async function glitzerglas(ctx) {
    const { h, ui } = ctx;
    for (;;) {
      const canvas = h('canvas', { class: 'solo-jar-canvas', role: 'img', 'aria-label': 'Glitzerglas. Wische durch das Glas, um den Glitzer aufzuwirbeln.' });
      const box = h('div', { class: 'solo-jar-box', 'data-settled': '0' }, canvas);
      const status = h('span', { class: 'pill solo-jar-status' }, 'Wirbelt …');
      const msg = h('p', { class: 'lead solo-jar-msg', 'aria-live': 'polite' }, 'Wisch mit dem Finger durchs Glas. Dann schau einfach zu.');
      let done;
      const p = new Promise((res) => { done = res; });
      let sim = null;
      scr(ctx, [
        h('div', { class: 'row between solo-jar-head' },
          h('div', { class: 'stack', style: { gap: '2px' } }, h('span', { class: 'eyebrow' }, 'Chill-Zone'), h('h2', null, 'Glitzerglas')),
          status),
        box,
        h('div', { class: 'solo-jar-foot' },
          msg,
          h('div', { class: 'row solo-jar-btns' },
            ui.btn('Schütteln', () => sim && sim.shake(), { variant: 'ghost', icon: 'sparkle', id: 'jar-shake' }),
            ui.btn('Fertig', () => done('done'), { variant: 'good', icon: 'check', id: 'jar-done' }))),
      ]);
      sim = jarSim(canvas, box, {
        onSettle(initial) {
          box.dataset.settled = '1';
          status.textContent = 'Alles gesetzt';
          status.classList.add('good');
          msg.textContent = initial
            ? 'Wisch mit dem Finger durchs Glas. Oder tipp auf „Schütteln“.'
            : 'Alles hat sich gesetzt. Oft sind dann auch die Gedanken ruhiger.';
          if (!initial) CREW.sound.play('soft');
        },
        onStir() {
          box.dataset.settled = '0';
          status.textContent = 'Wirbelt …';
          status.classList.remove('good');
          msg.textContent = 'Schau einfach zu, wie alles langsam sinkt.';
        },
      });
      let r;
      try {
        r = await ctx.waitFor(p);
      } finally {
        sim.stop();
      }
      if (r === ctx.SKIP) return;
      const o = await outro(ctx, { title: 'Schön ruhig.', text: 'Du hast dir eine Pause gegönnt. Das Glas kannst du jederzeit wieder schütteln.', again: 'Nochmal schütteln' });
      if (o !== 'again') return;
    }
  }

  /* =========================================================
     (c) 5-4-3-2-1 – mit den Sinnen zurück ins Hier und Jetzt
     ========================================================= */
  const SENSES = [
    { n: 5, id: 'sehen', title: 'Sehen', task: 'Finde 5 Dinge, die du sehen kannst.', ex: ['etwas Blaues', 'etwas Rundes', 'eine Lampe', 'deine Schuhe', 'ein Muster', 'etwas ganz Kleines', 'etwas, das glänzt'] },
    { n: 4, id: 'hoeren', title: 'Hören', task: 'Hör genau hin. Finde 4 Geräusche.', ex: ['deinen Atem', 'Schritte', 'ein leises Summen', 'Stimmen weiter weg', 'ein Auto draußen', 'ein Klicken', 'den Wind'] },
    { n: 3, id: 'fuehlen', title: 'Spüren', task: 'Spür 3 Dinge an deinem Körper.', ex: ['deine Füße auf dem Boden', 'den Stuhl unter dir', 'deine Kleidung', 'die Luft auf der Haut', 'deine Hände', 'etwas Kühles'] },
    { n: 2, id: 'riechen', title: 'Riechen', task: 'Such 2 Gerüche.', ex: ['deine Kleidung', 'die Luft im Raum', 'deine Hände', 'Seife'], note: 'Riechst du nichts? Denk an 2 Gerüche, die du magst.' },
    { n: 1, id: 'schmecken', title: 'Schmecken', task: 'Was schmeckst du gerade?', ex: ['einen Schluck Wasser', 'deinen Kaugummi', 'den Rest vom Frühstück'], note: 'Nichts? Denk an deinen Lieblingsgeschmack.' },
  ];

  async function sinneIntro(ctx) {
    const { h, ui } = ctx;
    let done;
    const p = new Promise((res) => { done = res; });
    scr(ctx, [
      h('div', { class: 'stack enter', style: { gap: '6px', alignItems: 'center', textAlign: 'center' } },
        h('span', { class: 'eyebrow' }, 'Chill-Zone · 5-4-3-2-1'),
        h('h2', null, 'Zurück ins Hier und Jetzt'),
        h('p', { class: 'lead muted', style: { maxWidth: '40ch' } }, 'Wenn der Kopf zu voll ist, helfen die Sinne. Du musst nichts aufschreiben.')),
      h('div', { class: 'solo-sense-strip enter-2' }, SENSES.map((s) =>
        h('div', { class: 'solo-sense-mini' }, h('b', { class: 'display' }, String(s.n)), senseIcon(s.id, 30), h('span', null, s.title)))),
      h('div', { class: 'row center enter-3' },
        ui.btn('Zurück', () => done('back'), { variant: 'ghost', icon: 'left' }),
        ui.btn('Los geht’s', () => done('go'), { variant: 'good', big: true, iconRight: 'right', id: 'sinne-go' })),
    ], { center: true });
    return ctx.waitFor(p);
  }

  async function sinneStep(ctx, idx) {
    const { h, ui, util } = ctx;
    const S = SENSES[idx];
    const ex = util.shuffle(S.ex).slice(0, 2);
    let done;
    const p = new Promise((res) => { done = res; });
    const nextBtn = ui.btn(idx < SENSES.length - 1 ? 'Weiter' : 'Fertig', () => done('next'), { variant: 'good', iconRight: 'right', id: 'sinne-next' });
    let on = 0;
    const dots = h('div', { class: 'solo-dots', role: 'group', 'aria-label': 'Gefundene Dinge' }, Array.from({ length: S.n }, (_, i) => {
      const d = h('button', { type: 'button', class: 'solo-dot', 'aria-pressed': 'false', 'aria-label': 'Ding ' + (i + 1) }, h('span', null, String(i + 1)));
      d.addEventListener('click', () => {
        const now = !d.classList.contains('on');
        d.classList.toggle('on', now);
        d.setAttribute('aria-pressed', String(now));
        on += now ? 1 : -1;
        CREW.sound.play(now ? 'tap' : 'soft');
        if (on === S.n) { CREW.sound.play('good'); nextBtn.classList.add('solo-ready'); } else nextBtn.classList.remove('solo-ready');
      });
      return d;
    }));
    const speak = S.task + ' Zum Beispiel: ' + ex.join(' oder ') + '.' + (S.note ? ' ' + S.note : '');
    scr(ctx, [
      h('div', { class: 'solo-sense-track' }, SENSES.map((s, i) =>
        h('span', { class: 'solo-sense-pip' + (i < idx ? ' done' : '') + (i === idx ? ' now' : '') }, senseIcon(s.id, 20), h('b', null, String(s.n))))),
      h('div', { class: 'solo-sense-card enter', 'data-sense': S.id },
        h('div', { class: 'solo-sense-big' },
          h('span', { class: 'display solo-sense-num' }, String(S.n)),
          h('span', { class: 'solo-sense-icon' }, senseIcon(S.id, 48))),
        h('div', { class: 'stack solo-sense-text' },
          h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, S.title), ui.speakBtn(speak)),
          h('p', { class: 'solo-sense-task' }, S.task),
          h('p', { class: 'muted' }, 'Zum Beispiel: ' + ex.join(' oder ') + '.'),
          S.note ? h('p', { class: 'muted small' }, S.note) : null)),
      h('div', { class: 'stack enter-2', style: { alignItems: 'center', gap: '10px' } },
        dots,
        h('p', { class: 'muted small', style: { textAlign: 'center' } }, 'Tippe für jedes Ding auf eine Zahl. Nur im Kopf, nichts aufschreiben.')),
      h('div', { class: 'row between enter-3' },
        ui.btn('Abbrechen', () => done('quit'), { variant: 'ghost', small: true, icon: 'x' }),
        nextBtn),
    ]);
    const r = await ctx.waitFor(p);
    return r === ctx.SKIP ? 'skip' : r;
  }

  async function sinne(ctx) {
    for (;;) {
      const i0 = await sinneIntro(ctx);
      if (i0 !== 'go') return;
      for (let i = 0; i < SENSES.length; i++) {
        const r = await sinneStep(ctx, i);
        // X-Karte beendet die Übung (so steht es auch im Menü)
        if (r === 'quit' || r === 'skip') return;
      }
      const o = await outro(ctx, { title: 'Du bist hier. Jetzt.', text: 'Dein Kopf hat gerade Pause gemacht. Das geht überall: im Bus, vor einer Prüfung, beim Warten.' });
      if (o !== 'again') return;
    }
  }

  /* =========================================================
     Registrierung
     ========================================================= */
  CREW.registerSolo({
    id: 'chill',
    title: 'Chill-Zone',
    desc: 'Atem-Welle, Glitzerglas und Sinne-Übung. Runterkommen ohne Punkte.',
    icon: 'leaf',
    themes: ['Stressbewältigung', 'Achtsamkeit', 'Selbstregulation'],
    eldib: [
      { code: 'V-21', text: 'behält auch in unruhigen Momenten die Kontrolle über Körper und Worte' },
      { code: 'V-25', text: 'setzt eine passende Alternative ein, statt auszurasten' },
      { code: 'V-24', text: 'lässt sich kontrolliert auf etwas Neues ein' },
      { code: 'K-26', text: 'kann sagen, wie es ihm/ihr gerade geht' },
    ],
    async run(ctx) {
      for (;;) {
        const pick = await menu(ctx);
        if (pick === 'back' || pick === ctx.SKIP) return;
        if (pick === 'welle') await atemWelle(ctx);
        else if (pick === 'glas') await glitzerglas(ctx);
        else if (pick === 'sinne') await sinne(ctx);
      }
    },
  });
})();

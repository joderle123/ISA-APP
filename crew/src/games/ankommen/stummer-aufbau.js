/* Spiel „Stummer Aufbau“ (Thema: Ankommen & Crew) · Vorlage T2 Rollen-Puzzle · j1-e03
   Jedes iPad zeigt per Tagescode ein Stück eines Bildes (Crew-Logo, Skyline des HQ). Ohne ein Wort legt die Crew
   die iPads so auf den Tisch, dass das Bild entsteht; der Beamer (Lehrer-iPad) zählt die Sekunden.
   Durchgang 2 mit Worten und neuem Bild – welcher war schneller, welcher entspannter?
   Bei ungerader Crew-Größe wird der letzte Platz Beobachter:in (achtet auf Ruhe und Tempo).
   In drei Level: 1) Ohne Worte, 2) Mit Worten (Vergleich: schneller oder entspannter?), 3) Unsere Zeichen –
   die Crew wählt zwei Zeichen ohne Worte, die ab jetzt in der Gruppe gelten. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h } = CREW.util;

  /* Zwei Bilder (800×400), beide ohne Text-Tricks: Formen, die man nur gemeinsam zusammensetzen kann */
  const INK = '#0e0a26';
  const BILDER = [
    {
      id: 'logo', name: 'Crew-Logo',
      svg: `<rect width="800" height="400" fill="#1a1440"/>
        <circle cx="400" cy="200" r="170" fill="none" stroke="#ffc93c" stroke-width="18"/>
        <circle cx="400" cy="200" r="130" fill="#3da5ff" stroke="${INK}" stroke-width="8"/>
        <path d="M430 90 L350 215 L405 215 L370 310 L460 180 L405 180 Z" fill="#ffc93c" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        <text x="110" y="250" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="120" fill="#ff4fa3" stroke="${INK}" stroke-width="6">CR</text>
        <text x="520" y="250" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="120" fill="#2ee6c5" stroke="${INK}" stroke-width="6">EW</text>
        <path d="M60 60 l12 30 l30 12 l-30 12 l-12 30 l-12 -30 l-30 -12 l30 -12 Z" fill="#fff"/>
        <path d="M740 320 l10 26 l26 10 l-26 10 l-10 26 l-10 -26 l-26 -10 l26 -10 Z" fill="#fff"/>
        <path d="M700 60 l8 20 l20 8 l-20 8 l-8 20 l-8 -20 l-20 -8 l20 -8 Z" fill="#ffc93c"/>
        <path d="M80 330 l8 20 l20 8 l-20 8 l-8 20 l-8 -20 l-20 -8 l20 -8 Z" fill="#ffc93c"/>
        <path d="M0 395 H800" stroke="#ffc93c" stroke-width="10"/>`,
    },
    {
      id: 'skyline', name: 'Skyline des HQ',
      svg: `<defs><linearGradient id="sa-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e0a26"/><stop offset="1" stop-color="#3a1f6b"/></linearGradient></defs>
        <rect width="800" height="400" fill="url(#sa-sky)"/>
        <circle cx="660" cy="90" r="46" fill="#fff6c8"/><circle cx="640" cy="78" r="40" fill="#3a1f6b" opacity=".9"/>
        <g fill="#fff"><circle cx="80" cy="60" r="3"/><circle cx="180" cy="40" r="2.5"/><circle cx="300" cy="90" r="3"/><circle cx="420" cy="50" r="2"/><circle cx="520" cy="110" r="3"/><circle cx="740" cy="160" r="2.5"/><circle cx="240" cy="140" r="2"/></g>
        <rect x="40" y="220" width="110" height="180" fill="#2a1d5e" stroke="${INK}" stroke-width="6"/>
        <rect x="170" y="150" width="140" height="250" fill="#3da5ff" stroke="${INK}" stroke-width="6"/>
        <rect x="330" y="90" width="150" height="310" fill="#ff4fa3" stroke="${INK}" stroke-width="6"/>
        <rect x="500" y="190" width="120" height="210" fill="#2ee6c5" stroke="${INK}" stroke-width="6"/>
        <rect x="640" y="250" width="130" height="150" fill="#ffc93c" stroke="${INK}" stroke-width="6"/>
        <path d="M405 90 V20" stroke="${INK}" stroke-width="8"/><circle cx="405" cy="18" r="10" fill="#ff4fa3" stroke="${INK}" stroke-width="4"/>
        <g fill="#fff6c8">${[[60, 240], [100, 240], [60, 300], [100, 300], [60, 350], [190, 180], [230, 180], [270, 180], [190, 240], [270, 240], [190, 300], [230, 300], [350, 120], [400, 120], [450, 120], [350, 200], [450, 200], [350, 280], [400, 280], [450, 280], [520, 220], [570, 220], [520, 300], [570, 300], [660, 280], [710, 280], [660, 340]].map(([x, y]) => `<rect x="${x}" y="${y}" width="22" height="30" rx="3"/>`).join('')}</g>
        <rect x="360" y="330" width="90" height="70" fill="#1a1440" stroke="${INK}" stroke-width="6"/>
        <text x="372" y="380" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="44" fill="#ffc93c">HQ</text>
        <path d="M0 400 H800" stroke="#2ee6c5" stroke-width="12"/>`,
    },
  ];

  const LEVELS = ['Ohne Worte', 'Mit Worten', 'Unsere Zeichen'];
  const ZEICHEN = [
    { id: 'fertig', t: 'Daumen hoch = fertig', icon: 'check' },
    { id: 'warte', t: 'Hand flach = warte kurz', icon: 'pause' },
    { id: 'hier', t: 'Auf den Platz zeigen = leg es hierhin', icon: 'right' },
    { id: 'hilfe', t: 'Hand heben = ich brauch Hilfe', icon: 'user' },
    { id: 'okay', t: 'Nicken = passt für mich', icon: 'heart' },
    { id: 'leise', t: 'Finger an den Mund = leiser bitte', icon: 'speakerOff' },
  ];

  /* Teile-Raster: 2 Reihen × (pieces/2) Spalten. Teil-Nummer 0 … pieces-1, links oben zuerst */
  function raster(pieces) { const cols = Math.max(1, pieces / 2); return { cols, rows: pieces > 1 ? 2 : 1, w: 800 / cols, hgt: pieces > 1 ? 200 : 400 }; }
  function pieceSvg(bild, pieces, idx) {
    const R = raster(pieces);
    const c = idx % R.cols, r = Math.floor(idx / R.cols);
    return `<svg viewBox="${c * R.w} ${r * R.hgt} ${R.w} ${R.hgt}" preserveAspectRatio="xMidYMid slice" aria-label="Bild-Teil">${bild.svg}</svg>`;
  }
  function fullSvg(bild) { return `<svg viewBox="0 0 800 400" aria-label="${bild.name}">${bild.svg}</svg>`; }
  function pieceEl(bild, pieces, idx) {
    const R = raster(pieces);
    const el = h('div', { class: 'sa-piece', style: { aspectRatio: R.w + ' / ' + R.hgt, maxWidth: R.w >= 400 ? '900px' : '700px' } });
    el.innerHTML = pieceSvg(bild, pieces, idx);
    // Oben-Markierung: kleine Pfeile am Rand, damit klar ist, wie das Teil liegt
    el.appendChild(h('span', { class: 'sa-oben', 'aria-hidden': 'true' }, '▲ oben'));
    el.appendChild(h('span', { class: 'sa-unten', 'aria-hidden': 'true' }, '▼ unten'));
    return el;
  }
  function fullEl(bild) { const el = h('div', { class: 'sa-full' }); el.innerHTML = fullSvg(bild); return el; }

  /* Stoppuhr: zählt hoch, bis die Lehrkraft „Fertig!“ tippt (Auto: sofort) */
  async function stoppuhr(ctx, titel, text, pieces) {
    const R = raster(pieces);
    const clock = h('div', { class: 'display sa-clock', id: 'sa-clock' }, '0,0 s');
    const t0 = Date.now();
    const iv = setInterval(() => { clock.textContent = ((Date.now() - t0) / 1000).toFixed(1).replace('.', ',') + ' s'; }, 100);
    ctx.onCleanup(() => clearInterval(iv));
    const layout = h('div', { class: 'sa-pieces', style: { gridTemplateColumns: 'repeat(' + R.cols + ', 1fr)' } }, Array.from({ length: pieces }, (_, i) => h('div', { class: 'sa-mini' }, '?')));
    const wrap = ctx.scr([
      ctx.say(text, { eyebrow: titel, small: true }),
      h('div', { class: 'grid two' },
        h('div', { class: 'card stack', style: { alignItems: 'center' } }, h('span', { class: 'eyebrow' }, 'Sekunden'), clock),
        h('div', { class: 'card stack' }, h('b', null, pieces + ' Teile · ' + R.rows + ' Reihe' + (R.rows > 1 ? 'n' : '') + ' × ' + R.cols), layout, h('p', { class: 'muted small' }, 'So viele iPads liegen am Ende nebeneinander. Was drauf ist, sieht nur die Crew.'))),
      CREW.ui.teacherLine('Nur zuschauen. „Fertig!“ tippen, wenn die Crew das Bild gelegt hat – oder wenn sie es sagt.'),
    ], { eyebrow: titel, badge: ctx.stufe(/Runde 2/.test(titel) ? 2 : 1, LEVELS) });
    const r = await ctx.ask(wrap, [{ label: 'Fertig!', value: 'ok', variant: 'good', icon: 'check', id: 'btn-fertig' }]);
    clearInterval(iv);
    return r === ctx.SKIP ? null : Math.round((Date.now() - t0) / 100) / 10;
  }

  CREW.registerGame({
    id: 'stummer-aufbau',
    template: 'T2',
    icon: 'users',
    themen: ['Kooperation', 'Nonverbal', 'Teambuilding'],
    safety: ['koerper', 'freiwillig'],
    help: false,
    async run(ctx) {
      await ctx.T.intro({
        rule: 'Jedes iPad zeigt ein Stück eines Bildes. Legt die iPads ohne ein Wort zusammen. Runde 2 mit Worten. Dann wählt ihr eure Zeichen.',
        levels: LEVELS,
        steps: [
          { icon: 'eyeOff', title: 'Dein Teil', text: 'Nur du siehst dein Stück.' },
          { icon: 'users', title: 'Ohne Worte', text: 'Zeigen, nicken, warten. Kein Wort.' },
          { icon: 'timer', title: 'Beamer zählt', text: 'Runde 2 mit Worten. Was war anders?' },
        ],
        probe: ctx.T.probeCard('Probe: Zeig ohne Worte auf eine Person, die das iPad neben dich legen soll. Tippt irgendwas – zählt nicht.', [{ label: 'Gezeigt', value: 1, variant: 'ghost' }, { label: 'Genickt', value: 2, variant: 'ghost' }]),
      });
      const pieces = ctx.n % 2 === 0 ? ctx.n : ctx.n - 1;
      // Welches iPad ist das? Deep-Link (Platz/Rolle) → Puzzle-Teil, sonst fragen
      let mode = ctx.opts.platz || ctx.role ? 'teil' : null;
      if (!mode) {
        const w = ctx.scr([
          ctx.say('Ist das hier der Beamer (zählt die Sekunden) oder ein iPad mit einem Bild-Teil?', { eyebrow: 'Welches Gerät?', small: true }),
          h('p', { class: 'muted small' }, 'Die Jugend-iPads scannen den QR-Code im Lehrermodus oder tippen hier „Bild-Teil“. Platznummer ' + ctx.seat + ' → Teil kommt vom Tagescode.'),
        ], { eyebrow: 'Vorbereitung' });
        const m = await ctx.ask(w, [{ label: 'Beamer · zählt Sekunden', value: 'beamer', variant: 'ghost', icon: 'timer' }, { label: 'Bild-Teil · Platz ' + ctx.seat, value: 'teil', iconRight: 'right', icon: 'phone' }]);
        mode = m === 'beamer' ? 'beamer' : 'teil';
      }
      const bilder = ctx.rshuffle(BILDER);

      /* ---- Jugend-iPad: nur das eigene Teil ---- */
      if (mode === 'teil') {
        await ctx.T.codeCheck();
        let shown = 0;
        for (let r = 0; r < 2; r++) {
          const bild = bilder[r];
          // Teil-Nummer je Platz: Mischung aus dem Tagescode, gleich auf allen iPads
          const order = CREW.seed.shuffle(Array.from({ length: pieces }, (_, i) => i), CREW.seed.rng(ctx.code, 'stummer-aufbau', 'bild-' + bild.id));
          const idx = ctx.seat <= pieces ? order[ctx.seat - 1] : -1;
          const w = idx >= 0
            ? ctx.scr([
              pieceEl(bild, pieces, idx),
              h('p', { class: 'muted small', style: { textAlign: 'center' } }, r === 0 ? 'Runde 1 · Kein Wort. Leg das iPad flach auf den Tisch und such die Nachbarn deines Teils.' : 'Runde 2 · Jetzt darf geredet werden. Gleiches Ziel, neues Bild.'),
            ], { eyebrow: 'Runde ' + (r + 1) + (r === 0 ? ' · ohne Worte' : ' · mit Worten'), badge: h('span', { class: 'pill accent' }, 'Platz ' + ctx.seat) })
            : ctx.scr([
              h('div', { class: 'role-card', 'data-role': 'X' }, h('span', { class: 'role-letter display' }, '👁'), h('div', { class: 'stack', style: { gap: '4px' } }, h('span', { class: 'eyebrow' }, 'Deine Rolle'), h('h2', null, 'Beobachter:in'), h('p', { class: 'muted' }, 'Heute ist die Zahl ungerade – dein iPad hat kein Teil. Achte auf zwei Dinge: Wer wartet, wer drängelt? Und: Wie laut ist es in Runde 2?')), ctx.readBtn('Beobachter:in. Achte darauf, wer wartet und wer drängelt, und wie laut es in Runde 2 ist.')),
            ], { eyebrow: 'Runde ' + (r + 1), badge: h('span', { class: 'pill accent' }, 'Platz ' + ctx.seat) });
          const n = await ctx.next(w, r === 0 ? 'Bild liegt · Runde 2' : 'Fertig');
          if (n !== ctx.SKIP) shown++;
        }
        return { summary: shown ? 'Dein Teil war dabei. Der Rest steht am Beamer.' : 'Heute nur reingeschaut.', stats: [[shown, 'Runden']], noNach: true };
      }

      /* ---- Beamer / Lehrer-iPad: zählt, deckt auf, vergleicht ---- */
      const qr = CREW.games.qrPanel('stummer-aufbau', { size: 160 });
      const w1 = ctx.scr([
        ctx.say('Jedes iPad braucht ein Teil: QR scannen (Platz steht am iPad) oder im Spiel „Bild-Teil“ wählen. Tagescode am Beamer: ' + ctx.code + '.', { eyebrow: 'Vorbereitung', small: true }),
        h('div', { class: 'card' }, qr),
        h('p', { class: 'muted small' }, pieces + ' Teile für ' + ctx.n + ' Leute' + (pieces < ctx.n ? ' – Platz ' + ctx.n + ' ist Beobachter:in.' : '.')),
      ], { eyebrow: 'Vorbereitung' });
      if ((await ctx.next(w1, 'Alle haben ihr Teil')) === ctx.SKIP) return { summary: 'Abgebrochen. Beim nächsten Mal.' };
      const zeiten = [];
      const stimmung = [];
      for (let r = 0; r < 2; r++) {
        const bild = bilder[r];
        const t = await stoppuhr(ctx, 'Runde ' + (r + 1) + (r === 0 ? ' · ohne Worte' : ' · mit Worten'), r === 0 ? 'Ohne ein Wort: Legt die iPads so, dass das Bild entsteht. Die Uhr läuft.' : 'Jetzt mit Worten. Neues Bild, gleiche Aufgabe. Die Uhr läuft.', pieces);
        if (t == null) continue;
        zeiten.push(t);
        // Auflösung: das ganze Bild
        const w2 = ctx.scr([
          h('div', { class: 'row center' }, h('span', { class: 'pill accent', style: { fontSize: '1.2em' } }, t.toFixed(1).replace('.', ',') + ' Sekunden')),
          fullEl(bild),
          h('p', { class: 'muted', style: { textAlign: 'center' } }, 'Das war das Bild: ' + bild.name + '. Stimmt’s mit eurem Tisch überein?'),
        ], { eyebrow: 'Runde ' + (r + 1) + ' · Auflösung' });
        await ctx.next(w2, r === 0 ? 'Runde 2' : 'Vergleich');
      }
      // Vergleich: schneller vs. entspannter – die Crew sagt es, die Lehrkraft tippt einmal
      const w3 = ctx.scr([
        h('div', { class: 'grid two' },
          h('div', { class: 'card stack', style: { alignItems: 'center' } }, h('span', { class: 'eyebrow' }, 'Runde 1 · ohne Worte'), h('div', { class: 'display sa-clock' }, zeiten[0] != null ? zeiten[0].toFixed(1).replace('.', ',') + ' s' : '–')),
          h('div', { class: 'card stack', style: { alignItems: 'center' } }, h('span', { class: 'eyebrow' }, 'Runde 2 · mit Worten'), h('div', { class: 'display sa-clock' }, zeiten[1] != null ? zeiten[1].toFixed(1).replace('.', ',') + ' s' : '–'))),
        ctx.say('Schneller ist klar. Aber: Welche Runde war entspannter? Und woran hat man gemerkt, wer das Bild im Kopf hatte?', { eyebrow: 'Kurz reden', small: true }),
        CREW.ui.teacherLine('Crew fragen, dann einmal tippen, was die meisten sagen. Nicht abzählen.'),
      ], { eyebrow: 'Vergleich' });
      const s = await ctx.ask(w3, [{ label: 'Ohne Worte entspannter', value: 'ohne', variant: 'ghost' }, { label: 'Mit Worten entspannter', value: 'mit', variant: 'ghost' }, { label: 'Beide gleich', value: 'gleich', variant: 'ghost' }]);
      if (s !== ctx.SKIP) stimmung.push(s);
      // Level 3: Unsere Zeichen – zwei Zeichen ohne Worte, die ab jetzt in der Crew gelten
      const gewaehlt = [];
      const zch = ZEICHEN.map((z) => {
        const b = h('button', { type: 'button', class: 'tile sa-zeichen', 'data-zeichen': z.id }, h('span', { class: 't-icon' }, CREW.icon(z.icon, 28)), h('span', { class: 't-title' }, z.t));
        b.addEventListener('click', () => { CREW.sound.play('tap'); const k = gewaehlt.indexOf(z); if (k >= 0) gewaehlt.splice(k, 1); else if (gewaehlt.length < 2) gewaehlt.push(z); else return; b.classList.toggle('sel', gewaehlt.includes(z)); });
        return b;
      });
      if (ctx.auto) { zch[0].click(); zch[1].click(); }
      const w4 = ctx.scr([
        ctx.say('Ohne Worte hat geklappt, weil ihr Zeichen benutzt habt. Welche zwei Zeichen sollen ab jetzt in der Crew gelten?', { eyebrow: 'Unsere Zeichen', small: true }),
        h('div', { class: 'opt-grid' }, zch),
        CREW.ui.teacherLine('Die Crew zeigt die Zeichen kurz vor und einigt sich. Tippe die zwei, mit denen alle leben können.'),
      ], { eyebrow: 'Zeichen', badge: ctx.stufe(3, LEVELS) });
      await ctx.next(w4, 'Das sind unsere Zeichen');
      if (gewaehlt.length) {
        const w5 = ctx.scr([
          h('div', { class: 'stop-big display', style: { color: 'var(--good)' } }, 'Unsere Zeichen'),
          h('div', { class: 'grid two' }, gewaehlt.map((z) => h('div', { class: 'card stack', style: { alignItems: 'center', textAlign: 'center' } }, h('span', { class: 'game-ic', style: { width: '64px', height: '64px' } }, CREW.icon(z.icon, 34)), h('b', null, z.t)))),
          ctx.say('Probiert sie gleich aus: im nächsten Spiel, in der Gruppenarbeit, wenn es laut ist.', { eyebrow: 'Ab jetzt', small: true }),
        ], { eyebrow: 'Zeichen', center: true, badge: ctx.stufe(3, LEVELS) });
        CREW.sound.play('great');
        await ctx.next(w5, 'Weiter');
      }
      // Nur bei klarem Unterschied (ab 2 s) vergleichen – die Zeit hängt am Tippen der Lehrkraft
      const faster = zeiten.length === 2 ? (Math.abs(zeiten[1] - zeiten[0]) < 2 ? 'Beide Runden gleich schnell' : zeiten[1] < zeiten[0] ? 'Mit Worten war es schneller' : 'Ohne Worte war es schneller') : 'Bild gelegt';
      const calm = stimmung[0] === 'ohne' ? ', ohne Worte entspannter.' : stimmung[0] === 'mit' ? ', mit Worten entspannter.' : '.';
      return { summary: faster + calm + ' Ein Team braucht beides.', stats: zeiten.map((t, i) => [t.toFixed(1).replace('.', ','), 's Runde ' + (i + 1)]), extra: gewaehlt.length ? h('p', { class: 'muted small' }, 'Eure Zeichen: ' + gewaehlt.map((z) => z.t).join(' · ')) : null };
    },
  });
})();

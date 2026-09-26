/* Mission Mittwoch: „Clash“ – Konflikte lösen mit der Friedenstreppe.
   Nach dem ISA-Material „Friedenstreppe“ (Stufen-, Tipp- und Moderationskarten, @Doodleteacher):
   Zwei Wege laufen nebeneinander nach oben (Stufe 1 Sicht, 2 Gefühl, 3 Bedürfnis) und treffen sich
   auf Stufe 4 (Versöhnen) und Stufe 5 (Vereinbarung). Team A spricht für Person A, Team B für Person B.
   Jede Antwort zeigt sofort ihre Wirkung (Reaktion + Hitze-Meter). Es gibt kein „Falsch“:
   Nach Vorwurf oder Ausweichen kann die Crew zurückspulen. Oben kommen immer alle an.
   Zusätzlich als Solo-Spiel: Eine Person spricht abwechselnd für beide Seiten. */
(function () {
  const CREW = window.CREW;
  const { h, clamp, shuffle } = CREW.util;
  const INK = '#0e0a26';

  /* ---------- Die fünf Stufen (Wortlaut nach den Moderationskarten, jugendgerecht) ---------- */
  const STUFEN = {
    1: { kurz: 'Sicht', frage: (p) => p.name + ', was ist aus deiner Sicht passiert?', start: ['Aus meiner Sicht …', 'Ich habe beobachtet, dass …'] },
    2: { kurz: 'Gefühl', frage: (p) => p.name + ', wie hast du dich dabei gefühlt?', start: ['Ich habe mich … gefühlt.', 'Es ging mir …'] },
    3: { kurz: 'Bedürfnis', frage: (p) => p.name + ', was brauchst du? Was ist dir wichtig?', start: ['Ich hätte mir gewünscht …', 'Ich brauche …'] },
    4: { kurz: 'Versöhnen', frage: (a, b) => a.name + ' und ' + b.name + ': Wie könnt ihr euch wieder vertragen?', start: ['Was kann ich tun, damit …?', 'Wäre es okay für dich, wenn …?'] },
    5: { kurz: 'Abmachen', frage: (a, b) => a.name + ' und ' + b.name + ': Worauf einigt ihr euch für die Zukunft?', start: ['In Zukunft …', 'Können wir uns darauf einigen, dass …?'] },
  };

  /* Arten von Antworten: Name + kurze Rückmeldung (nie „falsch“) */
  const KIND = {
    ich: { label: 'Ich-Botschaft', line: 'Klar gesagt, ohne Angriff. Die Hitze sinkt.', good: true },
    du: { label: 'Du-Botschaft', line: 'Das klingt wie ein Angriff. Die Hitze steigt.' },
    weg: { label: 'Ausweichen', line: 'Klingt ruhig. Aber das Problem bleibt.' },
    echt: { label: 'Echtes Angebot', line: 'Das kommt an. Die Hitze sinkt.', good: true },
    halb: { label: '„Sorry, aber …“', line: 'Das „aber“ macht das Sorry kaputt.' },
    klar: { label: 'Klare Abmachung', line: 'Konkret und fair. Das kann klappen.', good: true },
    vage: { label: 'Zu vage', line: 'Klingt nett. Hilft beim nächsten Mal aber nicht.' },
  };
  const DEFAULT_HEAT = { ich: -12, du: 14, weg: 6, echt: -15, halb: 10, klar: -15, vage: 6 };
  const LETTERS = ['A', 'B', 'C', 'D'];
  // Reihenfolge auf Stufe 1–3: abwechselnd, wer zuerst spricht (fair für beide Teams)
  const TURNS = [[1, 'A'], [1, 'B'], [2, 'B'], [2, 'A'], [3, 'A'], [3, 'B']];

  /* ---------- Eigene Icons (gleicher Strichstil wie CREW.icon) ---------- */
  const OWN = {
    // Versöhnen: zwei Personen mit Herz dazwischen
    bond: '<circle cx="5.8" cy="7.4" r="2.5"/><circle cx="18.2" cy="7.4" r="2.5"/><path d="M1.4 20c.3-3.3 2-5.3 4.4-5.3 1 0 1.9.3 2.6.9M22.6 20c-.3-3.3-2-5.3-4.4-5.3-1 0-1.9.3-2.6.9"/><path d="M12 15.8s-2.8-1.6-2.8-3.5a1.5 1.5 0 0 1 2.8-.8 1.5 1.5 0 0 1 2.8.8c0 1.9-2.8 3.5-2.8 3.5z" fill="currentColor"/>',
    // Frieden: Herz mit Funken
    peace: '<path d="M12 21s-7.2-4.3-7.2-9.4A3.9 3.9 0 0 1 12 9.3a3.9 3.9 0 0 1 7.2 2.3c0 5.1-7.2 9.4-7.2 9.4z" fill="currentColor" fill-opacity=".25"/><path d="M12 2.2v3.2M6.2 4.2l1.8 2.4M17.8 4.2 16 6.6"/>',
    scope: '<path d="M3 13.8 14.3 8l2 3.9L5 17.7z"/><path d="M14.3 8l3.9-2 2.4 4.6-4.3 1.3"/><path d="M10.2 15.3 7.4 21.5M11.9 14.5l2.8 7"/>',
    flame: '<path d="M12 21.5c-3.9 0-6.5-2.6-6.5-6.1 0-3.9 3.2-5.6 3.9-9.9 2.6 1.4 4 3.8 3.9 6.2 1.1-.6 1.9-1.8 2.1-3.3 2.1 1.8 3.1 4.4 3.1 7 0 3.5-2.6 6.1-6.5 6.1z"/><path d="M12 21.5c-1.7 0-2.8-1.1-2.8-2.7 0-1.8 1.5-2.6 2-4.3 1.6 1 2.2 2.3 2.1 3.4.5-.3.9-.8 1-1.4.6.7 1 1.5 1 2.3 0 1.6-1.2 2.7-3.3 2.7z"/>',
    rewind: '<path d="M11.5 5.5 3 12l8.5 6.5zM21.5 5.5 13 12l8.5 6.5z" fill="currentColor"/>',
  };
  function ownIcon(name, size) {
    const s = size || 24;
    const span = document.createElement('span');
    span.className = 'ic';
    span.setAttribute('aria-hidden', 'true');
    span.style.display = 'inline-grid';
    span.innerHTML = `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${OWN[name]}</svg>`;
    return span;
  }
  // Symbole wie auf den Stufenkarten: Auge, Herz, Stern, zwei Personen (statt Handschlag), Fernrohr
  function stepIcon(s, size) {
    if (s === 1) return CREW.icon('eye', size);
    if (s === 2) return CREW.icon('heart', size);
    if (s === 3) return CREW.icon('star', size);
    return ownIcon(s === 4 ? 'bond' : 'scope', size);
  }

  /* ---------- Figuren (SVG, gezeichnet nach rechts; Person B wird gespiegelt) ---------- */
  function moodFor(heat) {
    if (heat >= 70) return 'wut';
    if (heat >= 45) return 'genervt';
    if (heat >= 25) return 'neutral';
    if (heat >= 12) return 'ruhig';
    return 'froh';
  }
  const BROWS = {
    wut: 'M70 58 L85 64 M108 58 L94 64',
    genervt: 'M70 61 L85 61 M94 61 L108 60',
    neutral: 'M70 59 Q77 56 85 58 M94 58 Q101 56 108 59',
    ruhig: 'M70 58 Q77 54 85 57 M94 57 Q101 54 108 58',
    froh: 'M70 56 Q77 51 85 55 M94 55 Q101 51 108 56',
  };
  function avatarSVG(p, mood, flip) {
    const skin = p.haut || '#e0ac7e';
    const hair = p.haar || '#1d1a24';
    const col = p.color || '#3d7bff';
    const acc = p.akzent || '#ffc93c';
    const S = `stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"`;
    const L = `stroke="${INK}" stroke-width="3.5" stroke-linecap="round" fill="none"`;
    const f = p.frisur || 'kurz';
    // Haare hinter dem Kopf
    let back = '';
    if (f === 'lang') back = `<path d="M45 64 C42 30 62 22 82 23 C106 24 120 40 117 66 L121 124 C104 132 58 132 41 124 Z" fill="${hair}" ${S}/>`;
    else if (f === 'afro') back = `<circle cx="79" cy="56" r="45" fill="${hair}" ${S}/>`;
    else if (f === 'zopf') back = `<path d="M55 44 C30 48 25 90 37 116 C45 102 51 84 59 64 Z" fill="${hair}" ${S}/>`;
    else if (f === 'dutt') back = `<circle cx="66" cy="25" r="14" fill="${hair}" ${S}/>`;
    // Haare vorne
    let front;
    if (f === 'locken') {
      front = `<path d="M48 64 C46 38 62 28 82 28 C100 28 114 38 112 58 Z" fill="${hair}" ${S}/>` +
        [[51, 58, 9], [55, 43, 11], [68, 33, 12], [85, 29, 12], [101, 34, 11], [111, 47, 9]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${hair}" ${S}/>`).join('');
    } else if (f === 'buzz') {
      front = `<path d="M49 62 C47 37 64 29 82 29 C100 29 114 40 112 58 C100 48 66 46 49 62 Z" fill="${hair}" ${S}/>`;
    } else if (f === 'dutt') {
      front = `<path d="M47 66 C43 36 64 27 82 28 C102 29 116 42 113 60 C100 45 70 40 47 66 Z" fill="${hair}" ${S}/>`;
    } else if (f === 'afro') {
      front = `<path d="M50 58 C54 40 70 33 86 34 C100 35 110 44 111 56 C98 47 66 45 50 58 Z" fill="${hair}" ${S}/>`;
    } else if (f === 'lang') {
      front = `<path d="M47 74 C41 36 62 23 84 25 C107 26 119 44 113 62 C102 45 78 40 62 50 C55 55 50 63 47 74 Z" fill="${hair}" ${S}/>`;
    } else if (f === 'cap') {
      front = `<path d="M49 58 C47 64 48 72 51 78 L57 62 Z" fill="${hair}" ${S}/>` +
        `<path d="M46 60 C44 33 64 23 82 24 C102 25 117 37 116 58 Z" fill="${acc}" ${S}/>` +
        `<path d="M106 52 C120 51 135 54 142 60 C133 65 118 64 105 62 Z" fill="${acc}" ${S}/>` +
        `<path d="M60 36 C66 31 75 29 84 29" stroke="rgba(255,255,255,.55)" stroke-width="3.5" stroke-linecap="round" fill="none"/>`;
    } else {
      front = `<path d="M47 68 C41 36 62 23 84 25 C107 26 119 43 113 63 C106 50 94 44 80 45 C66 46 55 54 50 72 Z" fill="${hair}" ${S}/>`;
    }
    // Gesicht je nach Stimmung
    let eyes;
    if (mood === 'froh') eyes = `<path d="M73 71 Q78 64 83 71 M95 71 Q100 64 105 71" ${L}/>`;
    else if (mood === 'wut' || mood === 'genervt') eyes = `<ellipse cx="78" cy="70" rx="3.8" ry="3.3" fill="${INK}"/><ellipse cx="100" cy="70" rx="3.8" ry="3.3" fill="${INK}"/>`;
    else eyes = `<ellipse cx="78" cy="69" rx="3.6" ry="4.6" fill="${INK}"/><ellipse cx="100" cy="69" rx="3.6" ry="4.6" fill="${INK}"/>`;
    const mouth = {
      wut: `<path d="M81 94 Q91 83 101 94 Q91 97 81 94 Z" fill="${INK}"/>`,
      genervt: `<path d="M83 91 L99 88" ${L}/>`,
      neutral: `<path d="M83 89 Q91 91 99 89" ${L}/>`,
      ruhig: `<path d="M82 87 Q91 94 100 87" ${L}/>`,
      froh: `<path d="M80 86 Q91 101 102 86 Z" fill="${INK}"/><path d="M85 89 Q91 91.5 97 89" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none"/>`,
    }[mood] || '';
    let extra = '';
    if (p.extra === 'kopfhoerer') extra = `<path d="M60 119 Q80 133 100 119" stroke="#2b2744" stroke-width="6" fill="none"/><rect x="46" y="108" width="15" height="21" rx="6" fill="#2b2744" ${S}/><rect x="99" y="108" width="15" height="21" rx="6" fill="#2b2744" ${S}/><circle cx="53.5" cy="118.5" r="3" fill="${acc}"/><circle cx="106.5" cy="118.5" r="3" fill="${acc}"/>`;
    else if (p.extra === 'brille') extra = `<g fill="rgba(255,255,255,.2)" stroke="${INK}" stroke-width="3"><rect x="68" y="60.5" width="20" height="16" rx="5.5"/><rect x="90" y="60.5" width="20" height="16" rx="5.5"/></g><path d="M88 67 h2 M68 66 L53 63" ${L} stroke-width="3"/>`;
    else if (p.extra === 'ohrring') extra = `<circle cx="49" cy="84" r="3.8" fill="#ffc93c" stroke="${INK}" stroke-width="2"/>`;
    // Wut: kleiner Blitz am Kopf (wie der Blitz zwischen den zwei Wegen auf dem Treppen-Plakat)
    const vein = mood === 'wut' ? `<path d="M124 6 L110 27 H118.5 L112 45 L130 20 H121.5 L129 6 Z" fill="#ffc93c" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>` : '';
    return `<svg viewBox="0 0 160 170" aria-hidden="true" focusable="false"><g${flip ? ' transform="translate(160 0) scale(-1 1)"' : ''}>` +
      `<path d="M70 94 h20 v26 h-20 z" fill="${skin}" ${S}/>` +
      `<path d="M18 170 C18 131 45 115 80 115 C115 115 142 131 142 170 Z" fill="${col}" ${S}/>` +
      `<path d="M55 117 C60 137 100 137 105 117" fill="rgba(0,0,0,.22)" ${S}/>` +
      `<path d="M71 132 l-2 20 M89 132 l2 20" stroke="rgba(255,255,255,.85)" stroke-width="3.5" stroke-linecap="round"/>` +
      back +
      `<ellipse cx="50" cy="71" rx="7" ry="10" fill="${skin}" ${S}/>` +
      `<ellipse cx="80" cy="66" rx="32" ry="37" fill="${skin}" ${S}/>` +
      front + eyes +
      `<path d="${BROWS[mood] || BROWS.neutral}" ${L} stroke-width="4"/>` +
      `<path d="M96 72 Q101 79 95 81" ${L} stroke-width="2.8"/>` +
      mouth + extra + vein +
      '</g></svg>';
  }
  function makeAvatar(p, mood, flip) {
    const el = h('div', { class: 'clash-ava', role: 'img', 'aria-label': p.name });
    el.dataset.mood = mood;
    el.innerHTML = avatarSVG(p, mood, flip);
    return {
      el,
      set(m) {
        if (el.dataset.mood === m) return;
        el.dataset.mood = m;
        el.innerHTML = avatarSVG(p, m, flip);
        el.classList.remove('bump');
        void el.offsetWidth;
        el.classList.add('bump');
      },
    };
  }
  const person = (G, side) => (side === 'B' ? G.scene.personB : G.scene.personA);

  /* ---------- Hitze-Meter 0–100 ---------- */
  const heatWord = (v) => (v < 25 ? 'cool' : v < 50 ? 'warm' : v < 75 ? 'heiß' : 'kocht');
  const heatLevel = (v) => (v < 25 ? 0 : v < 50 ? 1 : v < 75 ? 2 : 3);
  function heatMeter(start) {
    let v = clamp(Math.round(start), 0, 100);
    const cover = h('i', { class: 'clash-heat-cover', style: { width: 100 - v + '%' } });
    const num = h('b', { class: 'num' }, String(v));
    const word = h('span', { class: 'word' }, heatWord(v));
    const el = h('div', { class: 'clash-heat', role: 'meter', 'aria-label': 'Hitze-Meter', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(v) },
      h('div', { class: 'clash-heat-head' }, h('span', { class: 'clash-flame' }, ownIcon('flame', 26)), h('span', { class: 'lbl' }, 'Hitze'), word, num),
      h('div', { class: 'clash-heat-track' }, cover));
    el.dataset.level = String(heatLevel(v));
    function set(n) {
      const from = v;
      v = clamp(Math.round(n), 0, 100);
      if (v === from) return;
      cover.style.width = 100 - v + '%';
      el.dataset.level = String(heatLevel(v));
      el.setAttribute('aria-valuenow', String(v));
      word.textContent = heatWord(v);
      el.classList.remove('up', 'down');
      void el.offsetWidth;
      el.classList.add(v > from ? 'up' : 'down');
      CREW.ui.countUp(num, from, v, 900);
    }
    return { el, set, get: () => v };
  }

  /* ---------- Friedenstreppe: zwei Wege (A oben, B unten), ab Stufe 4 gemeinsam ---------- */
  function stairs(G, opts) {
    const big = !!(opts && opts.big);
    const cell = (key, side, s) => {
      let state = '';
      if (G.done.has(key)) state = G.skipped.has(key) ? ' skip' : ' done';
      else if (G.now === key) state = ' now';
      return h('div', { class: 'clash-cell ' + side + state, 'data-key': key }, stepIcon(s, big ? 26 : 18), big || side === 'j' ? h('b', { class: 'n' }, String(s)) : null);
    };
    const steps = h('div', { class: 'clash-stairs' + (big ? ' big' : ''), role: 'img', 'aria-label': 'Friedenstreppe mit fünf Stufen' },
      [1, 2, 3, 4, 5].map((s) => h('div', { class: 'clash-col s' + s },
        h('div', { class: 'clash-lanes' }, s <= 3 ? [cell(s + 'A', 'a', s), cell(s + 'B', 'b', s)] : cell(String(s), 'j', s)),
        big ? h('div', { class: 'clash-cap' }, STUFEN[s].kurz) : null)));
    if (!big) return steps;
    return h('div', { class: 'clash-stairs-big' }, steps,
      h('div', { class: 'clash-legend' }, [1, 2, 3, 4, 5].map((s) => h('span', null, h('b', null, String(s)), ' ' + STUFEN[s].kurz))));
  }
  const hud = (G, meter) => h('div', { class: 'clash-hud' },
    h('div', { class: 'clash-stairs-wrap' }, h('span', { class: 'eyebrow' }, 'Friedenstreppe'), stairs(G)),
    (meter || heatMeter(G.heat)).el);

  /* ---------- Comic-Bild: zwei Figuren + Sprechblasen ---------- */
  function nameTag(G, side) {
    const p = person(G, side);
    const t = G.ctx.teams[side];
    return h('div', { class: 'clash-name ' + side.toLowerCase() }, h('b', null, p.name), G.solo ? null : h('span', null, t.name));
  }
  function comic(G, opts) {
    const o = opts || {};
    const m = moodFor(G.heat);
    const avA = makeAvatar(G.scene.personA, o.moodA || m, false);
    const avB = makeAvatar(G.scene.personB, o.moodB || m, true);
    const sideA = h('div', { class: 'clash-side a' }, avA.el, nameTag(G, 'A'));
    const sideB = h('div', { class: 'clash-side b' }, avB.el, nameTag(G, 'B'));
    const talk = h('div', { class: 'clash-talk', 'aria-live': 'polite' });
    const el = h('div', { class: 'clash-comic' },
      h('div', { class: 'clash-caption' }, G.scene.ort || G.scene.title),
      h('div', { class: 'clash-cast' }, sideA, talk, sideB));
    el.style.setProperty('--clash-h', String(G.heat / 100));
    const talking = (side) => { sideA.classList.toggle('talking', side === 'A'); sideB.classList.toggle('talking', side === 'B'); };
    return {
      el,
      say(side, text) {
        talking(side);
        const b = h('div', { class: 'clash-bubble ' + side.toLowerCase() }, text);
        talk.appendChild(b);
        return b;
      },
      typing(side) {
        talking(side);
        const b = h('div', { class: 'clash-bubble typing ' + side.toLowerCase(), 'aria-label': 'schreibt' }, h('span', { class: 'clash-dots' }, h('i'), h('i'), h('i')));
        talk.appendChild(b);
        return b;
      },
      mood(heat) {
        avA.set(moodFor(heat));
        avB.set(moodFor(heat));
        el.style.setProperty('--clash-h', String(heat / 100));
      },
      stamp(text) {
        talking(null);
        el.classList.add('stopped');
        const big = h('div', { class: 'clash-stamp', 'aria-hidden': 'true' }, text);
        el.appendChild(big);
        // Nach dem Knall: kleiner Stempel oben rechts, Blasen wieder gut lesbar
        setTimeout(() => {
          big.remove();
          el.classList.remove('stopped');
          el.appendChild(h('div', { class: 'clash-stamp small', 'aria-hidden': 'true' }, text));
        }, 1500);
      },
    };
  }

  /* Knöpfe unten anzeigen, auf kleinen Bildschirmen ins Bild holen, und auf die Wahl warten */
  function ask(G, wrap, options, align, scroll) {
    const p = G.ctx.ui.choice(wrap, options, { align: align || 'end' });
    const row = wrap.lastElementChild;
    if (scroll) requestAnimationFrame(() => {
      const r = row.getBoundingClientRect();
      if (r.bottom > window.innerHeight) row.scrollIntoView({ block: 'end', behavior: 'smooth' });
    });
    return G.ctx.waitFor(p);
  }

  /* ---------- Bildschirme ---------- */

  // 1) Comic-Intro: der Streit schaukelt sich hoch
  async function intro(G) {
    const { ctx } = G;
    const ui = ctx.ui;
    const sc = G.scene;
    G.heat = 12;
    G.now = null;
    const meter = heatMeter(G.heat);
    const cm = comic(G, { moodA: 'neutral', moodB: 'neutral' });
    const readAll = () => sc.intro.map((b) => person(G, b.who).name + ': ' + b.text).join(' ');
    const wrap = ctx.screen([
      h('div', { class: 'clash-hud' },
        h('div', { class: 'stack clash-title' }, h('span', { class: 'eyebrow' }, G.solo ? 'Solo · Friedenstreppe' : 'Mission Clash'), h('h2', null, sc.title)),
        meter.el),
      cm.el,
      h('div', { class: 'row between clash-foot' }, h('p', { class: 'muted' }, 'Wie schaukelt sich der Streit hoch?'), ui.speakBtn(readAll)),
    ]);
    wrap.dataset.clash = 'intro';
    const n = sc.intro.length;
    const top = sc.hitze || 82;
    for (let i = 0; i < n; i++) {
      await ctx.sleep(i ? 1300 : 500);
      const b = sc.intro[i];
      cm.say(b.who, b.text);
      G.heat = Math.round(12 + ((i + 1) * (top - 12)) / n);
      meter.set(G.heat);
      cm.mood(G.heat);
      CREW.sound.play(i === n - 1 ? 'drum' : 'whoosh');
    }
    await ctx.sleep(1000);
    cm.stamp('Stopp!');
    CREW.sound.play('go');
    await ctx.sleep(450);
    const r = await ask(G, wrap, [
      { label: 'Andere Szene', value: 'swap', variant: 'ghost', icon: 'shuffle' },
      { label: 'Zur Friedenstreppe', value: 'go', iconRight: 'right' },
    ]);
    // X-Karte auf dem Intro: diese Szene lieber nicht – eine andere nehmen
    return r === ctx.SKIP ? 'swap' : r;
  }

  // 2) Crew aufteilen und die Treppe zeigen
  async function crewSplit(G) {
    const { ctx } = G;
    const ui = ctx.ui;
    const A = G.scene.personA;
    const B = G.scene.personB;
    const teamCard = (side) => {
      const p = person(G, side);
      const t = ctx.teams[side];
      return h('div', { class: 'card clash-teamcard ' + side.toLowerCase() },
        makeAvatar(p, 'genervt', side === 'B').el,
        h('div', { class: 'stack', style: { gap: '6px' } }, h('span', { class: 'pill ' + t.cls }, t.name), h('div', { class: 'clash-teamcard-name' }, 'spricht für ', h('b', null, p.name))));
    };
    G.now = '1A';
    const wrap = ctx.screen([
      h('div', { class: 'stack', style: { gap: '4px' } },
        h('span', { class: 'eyebrow' }, 'Stopp. Friedenstreppe.'),
        h('h2', null, G.solo ? 'Du sprichst für beide.' : 'Ihr sprecht jetzt für die beiden.')),
      G.solo ? null : h('div', { class: 'clash-teams' }, teamCard('A'), teamCard('B')),
      h('div', { class: 'card clash-stairs-card' },
        stairs(G, { big: true }),
        h('p', { class: 'lead' }, G.solo
          ? 'Stufe 1 bis 3: abwechselnd für ' + A.name + ' und ' + B.name + '. Stufe 4 und 5: für beide.'
          : 'Stufe 1 bis 3: Jedes Team spricht für seine Person. Stufe 4 und 5: alle zusammen.')),
      G.solo ? null : h('div', { class: 'row' }, ui.paddleHint('abcd', 'Team einigt sich leise')),
    ]);
    wrap.dataset.clash = 'crew';
    await ask(G, wrap, [{ label: 'Los: Stufe 1', value: 'go', iconRight: 'right' }]);
  }

  // Zwei kleine Figuren für die gemeinsamen Stufen
  function duo(G) {
    const m = moodFor(G.heat);
    return h('div', { class: 'clash-duo' }, makeAvatar(G.scene.personA, m, false).el, makeAvatar(G.scene.personB, m, true).el);
  }

  // 3) Auswahl: A/B/C (Stufe 1–3, ein Team) oder A/B/C/D (Stufe 4–5, alle)
  function chooseScreen(G, cfg) {
    const { ctx } = G;
    const ui = ctx.ui;
    const sc = G.scene;
    const joint = cfg.step >= 4;
    const st = STUFEN[cfg.step];
    let done;
    const picked = new Promise((r) => { done = r; });
    const btns = cfg.list.map((o, i) => {
      const L = LETTERS[i];
      const tried = cfg.tried.has(o);
      const by = joint ? (o.by || 'A') : null;
      const b = h('button', { type: 'button', class: 'clash-opt enter' + (tried ? ' tried' : ''), 'data-kind': o.kind, 'data-letter': L, style: { animationDelay: 80 + i * 70 + 'ms' } },
        h('span', { class: 'clash-letter l' + L }, L),
        h('span', { class: 'clash-opt-text' }, by ? h('span', { class: 'clash-by ' + by.toLowerCase() }, person(G, by).name) : null, o.text),
        tried ? h('span', { class: 'clash-tried' }, CREW.icon('undo', 16), 'probiert') : null);
      b.addEventListener('click', () => {
        CREW.sound.play('tap');
        btns.forEach((x) => { x.disabled = true; });
        b.classList.add('picked');
        setTimeout(() => done(o), 220);
      });
      return b;
    });
    const speaker = joint ? null : person(G, cfg.side);
    const q = joint ? st.frage(sc.personA, sc.personB) : st.frage(speaker);
    const sideCls = joint ? 'j' : cfg.side.toLowerCase();
    const tag = joint
      ? h('span', { class: 'pill good' }, G.solo ? 'Beide zusammen' : 'Alle zusammen')
      : h('span', { class: 'pill ' + (cfg.side === 'A' ? 'teamA' : 'teamB') }, G.solo ? 'Du bist ' + speaker.name : ctx.teams[cfg.side].name + ' ist ' + speaker.name);
    const readAll = () => q + ' ' + cfg.list.map((o, i) => LETTERS[i] + ': ' + o.text).join(' ');
    const card = h('div', { class: 'card clash-q ' + sideCls },
      joint ? duo(G) : makeAvatar(speaker, moodFor(G.heat), cfg.side === 'B').el,
      h('div', { class: 'clash-q-main' },
        h('div', { class: 'row clash-q-top' }, h('span', { class: 'eyebrow' }, 'Stufe ' + cfg.step + ' · ' + st.kurz), tag),
        h('h2', null, q),
        h('div', { class: 'clash-starters' }, st.start.map((s) => h('span', null, s)))),
      ui.speakBtn(readAll, { cls: 'clash-speak' }));
    const foot = G.solo
      ? h('p', { class: 'muted small clash-foot' }, cfg.tried.size ? 'Probier eine andere Antwort.' : 'Was würdest du sagen? Tippe an.')
      : h('div', { class: 'row between clash-foot' },
        ui.paddleHint('abcd', joint ? 'Alle zeigen · Mehrheit zählt' : ctx.teams[cfg.side].name + ' zeigt'),
        ui.btn('3-2-1', () => ui.threeTwoOne('Zeigt her!'), { variant: 'ghost', small: true, icon: 'timer', id: 'clash-321' }));
    const wrap = ctx.screen([hud(G), card, h('div', { class: 'clash-opts' }, btns), foot]);
    wrap.dataset.clash = joint ? 'joint' : 'turn';
    return picked;
  }

  // 4) Wirkung: Satz, Reaktion der anderen Person, Hitze-Meter
  async function resultScreen(G, cfg) {
    const { ctx } = G;
    const ui = ctx.ui;
    const opt = cfg.opt;
    const joint = cfg.step >= 4;
    const speakSide = joint ? (opt.by || 'A') : cfg.side;
    const listenSide = speakSide === 'A' ? 'B' : 'A';
    const info = KIND[opt.kind] || KIND.weg;
    const delta = typeof opt.heat === 'number' ? opt.heat : DEFAULT_HEAT[opt.kind] || 0;
    const meter = heatMeter(G.heat);
    const cm = comic(G);
    // Tipp aus der Friedenstreppe: „Auch dem anderen gut zuhören und wiederholen.“
    const listenTip = cfg.step === 1 && info.good && !G.solo
      ? h('p', { class: 'muted small' }, h('b', null, 'Zuhören-Tipp: '), ctx.teams[listenSide].name + ' sagt kurz mit eigenen Worten, was ' + person(G, speakSide).name + ' meint.')
      : null;
    const fb = h('div', { class: 'card clash-feedback ' + (info.good ? 'good' : 'hot') },
      h('div', { class: 'row', style: { gap: '10px' } },
        h('span', { class: 'pill ' + (info.good ? 'good' : 'accent') }, info.label),
        h('span', { class: 'clash-delta ' + (delta <= 0 ? 'down' : 'up') }, 'Hitze ' + (delta <= 0 ? '−' : '+') + Math.abs(delta))),
      h('p', { class: 'lead' }, info.line),
      listenTip);
    fb.style.visibility = 'hidden';
    const wrap = ctx.screen([hud(G, meter), cm.el, fb]);
    wrap.dataset.clash = 'result';
    await ctx.sleep(250);
    cm.say(speakSide, opt.text);
    CREW.sound.play('whoosh');
    await ctx.sleep(1200);
    const typing = cm.typing(listenSide);
    await ctx.sleep(900);
    typing.remove();
    cm.say(listenSide, opt.reaction);
    G.heat = clamp(G.heat + delta, 5, 100);
    meter.set(G.heat);
    cm.mood(G.heat);
    if (info.good) CREW.sound.play('good');
    else {
      CREW.sound.play('soft');
      if (delta >= 8) cm.el.classList.add('shake');
    }
    fb.style.visibility = '';
    fb.classList.add('pop');
    await ctx.sleep(300);
    const opts = info.good
      ? [{ label: 'Weiter', value: 'next', iconRight: 'right' }]
      : [{ label: 'Trotzdem weiter', value: 'next', variant: 'ghost' }, { label: 'Zurückspulen', value: 'rewind', icon: 'undo', variant: 'yellow', id: 'clash-rewind' }];
    const r = await ask(G, wrap, opts, 'end', true);
    return r === ctx.SKIP ? 'skip' : r;
  }

  // Zurückspulen: kurzer Videorekorder-Effekt, dann gleiche Stufe nochmal
  async function rewindFx(G) {
    CREW.sound.play('whoosh');
    const ov = h('div', { class: 'overlay clash-rewind', 'aria-hidden': 'true' }, h('div', { class: 'clash-rw' }, ownIcon('rewind', 64), h('b', null, 'Zurückspulen')));
    CREW.ui.overlays().appendChild(ov);
    try { await G.ctx.sleep(850); } finally { ov.remove(); }
  }

  // Eine Stufe spielen (für eine Seite oder gemeinsam). X-Karte: Stufe überspringen, ohne Folgen.
  async function playStep(G, step, side) {
    const { ctx } = G;
    const joint = step >= 4;
    const src = joint ? (step === 4 ? G.scene.versoehnung : G.scene.vereinbarung) : G.scene.steps[step][side];
    const list = shuffle(src).slice(0, joint ? 4 : 3);
    const key = joint ? String(step) : step + side;
    const tried = new Set();
    G.now = key;
    for (;;) {
      const opt = await ctx.waitFor(chooseScreen(G, { step, side, list, tried }));
      if (opt === ctx.SKIP) {
        G.done.add(key);
        G.skipped.add(key);
        G.log.push({ key, skipped: true });
        return;
      }
      const before = G.heat;
      const res = await resultScreen(G, { step, side, opt });
      if (res === 'skip') {
        // X-Karte auf der Wirkung: zählt nicht, Hitze wie vorher
        G.heat = before;
        G.done.add(key);
        G.skipped.add(key);
        G.log.push({ key, skipped: true });
        return;
      }
      if (res === 'rewind') {
        G.heat = before;
        tried.add(opt);
        G.rewinds++;
        await rewindFx(G);
        continue;
      }
      G.log.push({ key, kind: opt.kind, rewound: tried.size > 0 });
      G.done.add(key);
      if (step === 5) G.pact = opt;
      return;
    }
  }

  // 5) Oben angekommen: Frieden!
  async function finale(G) {
    const { ctx } = G;
    const ui = ctx.ui;
    const A = G.scene.personA;
    const B = G.scene.personB;
    G.now = null;
    const meter = heatMeter(G.heat);
    const hot = G.heat >= 50;
    const pact = G.pact;
    const wrap = ctx.screen([
      hud(G, meter),
      h('div', { class: 'clash-finale' },
        h('h1', { class: 'outline-text clash-peace' }, 'Frieden!'),
        h('div', { class: 'clash-top' },
          h('div', { class: 'clash-summit' }, makeAvatar(A, 'froh', false).el, h('span', { class: 'clash-hands' }, ownIcon('peace', 64)), makeAvatar(B, 'froh', true).el),
          h('div', { class: 'clash-plate' }, stepIcon(5, 24), h('span', null, 'Stufe 5 · ganz oben'))),
        h('p', { class: 'lead' }, (hot ? 'Der Weg war heiß. Aber ' : '') + A.name + ' und ' + B.name + ' sind oben angekommen.'),
        pact ? h('div', { class: 'card clash-pact' },
          h('span', { class: 'eyebrow' }, 'Der Pakt'),
          h('div', { class: 'clash-pact-text' }, '„' + pact.text + '“'),
          pact.kind === 'vage' ? h('p', { class: 'muted small' }, 'Tipp: Je konkreter, desto besser hält der Pakt.') : null) : null),
    ]);
    wrap.dataset.clash = 'finale';
    CREW.sound.play('great');
    ui.confetti(160);
    await ctx.sleep(500);
    G.heat = 6;
    meter.set(G.heat);
    await ctx.sleep(500);
    await ask(G, wrap, [{ label: 'Weiter', value: 'go', iconRight: 'right' }], 'center', true);
  }

  /* ---------- Ablauf ---------- */
  async function play(ctx) {
    const G = { ctx, solo: !!ctx.solo, scene: null, heat: 12, done: new Set(), skipped: new Set(), now: null, log: [], rewinds: 0, pact: null };
    G.scene = ctx.pick('clash', 1)[0];
    if (!G.scene) return null;
    // Szene: X-Karte oder „Andere Szene“ tauscht sie aus
    for (let swaps = 0; ; swaps++) {
      const r = await intro(G);
      if (r === 'go') break;
      const other = swaps < 6 ? ctx.pick('clash', 1, (s) => s.id !== G.scene.id)[0] : null;
      if (!other) break;
      G.scene = other;
    }
    await crewSplit(G);
    for (const [step, side] of TURNS) await playStep(G, step, side);
    await playStep(G, 4);
    await playStep(G, 5);
    await finale(G);
    return G;
  }

  // Wie cool war der Weg? 0…1 (Überspringen zählt nicht; Zurückspulen ist fast so gut wie direkt)
  function score(G) {
    const played = G.log.filter((x) => !x.skipped);
    if (!played.length) return 0.5;
    const pts = played.reduce((a, x) => a + (KIND[x.kind] && KIND[x.kind].good ? (x.rewound ? 0.85 : 1) : x.kind === 'weg' ? 0.4 : 0.2), 0);
    return pts / played.length;
  }

  CREW.registerMission({
    id: 'clash',
    day: 3,
    title: 'Clash',
    tagline: 'Ein Streit, zwei Seiten. Bringt beide nach oben.',
    minutes: 7,
    themes: ['Konfliktlösung', 'Perspektivenwechsel', 'Gefühle'],
    etep: 'III–IV',
    eldib: [
      { code: 'V-26', text: 'bleibt bei Provokationen in Worten und Körper beherrscht' },
      { code: 'K-21', text: 'erkennt, wie sich andere fühlen' },
      { code: 'K-26', text: 'sagt in der Gruppe passend, was er/sie fühlt' },
      { code: 'K-31', text: 'wählt im Streit beruhigende, versöhnliche Worte' },
      { code: 'SOZ-34', text: 'schlägt bei Streit faire Lösungen vor' },
    ],
    teacherNote: 'Nach der ISA-Friedenstreppe. Eine Streit-Szene pro Session (Comic mit zwei Fantasiefiguren). Teilt die Crew in zwei Teams: Team A spricht für die linke Person, Team B für die rechte. Stufe 1–3 (Sicht, Gefühl, Bedürfnis): Das Team einigt sich leise auf A, B oder C und zeigt es mit der Antwort-Karte. Du tippst die gezeigte Antwort an. Eine Antwort ist eine Ich-Botschaft, eine ein Vorwurf, eine Ausweichen – gemischt. Es gibt kein Falsch: Nach Vorwurf oder Ausweichen könnt ihr zurückspulen. Stufe 4 (Versöhnen) und 5 (Vereinbarung) wählt die ganze Crew, die Mehrheit zählt. Tipp aus dem Material: Das andere Team wiederholt kurz, was es gehört hat. Satzanfänge für echte Streits: „Aus meiner Sicht …“, „Ich habe mich … gefühlt“, „Ich brauche …“, „Wäre es okay für dich, wenn …“, „Können wir uns darauf einigen, dass …“. Passt eine Szene gerade nicht (z. B. echter Streit in der Gruppe): „Andere Szene“ oder X-Karte auf dem ersten Bild.',
    debrief: [
      'Welche Stufe war heute am schwierigsten? Warum?',
      'Was hilft dir, erst mal runterzukommen, bevor du redest?',
      'Kennst du so einen Streit? Du musst keine Namen sagen.',
      'Woran merkst du im Körper, dass die Hitze steigt?',
      'Wie klingt eine Entschuldigung, die man wirklich glaubt?',
      'Wie war es, für die andere Person zu sprechen?',
      'Wen könntest du fragen, wenn ein Streit festhängt?',
    ],
    async run(ctx) {
      const G = await play(ctx);
      if (!G) return { energy: 5, summary: 'Heute gab es keine Szene. Nächstes Mal!' };
      const s = score(G);
      const energy = clamp(5 + Math.round(5 * s), 5, 10);
      let summary = 'Ihr habt ausprobiert, was passiert. Und seid oben angekommen.';
      if (s >= 0.85) summary = 'Stark! Ihr habt die Hitze richtig cool runtergeholt.';
      else if (s >= 0.6) summary = 'Gut gemacht! Ihr habt den Weg zum Frieden gefunden.';
      return { energy, summary };
    },
  });

  /* ---------- Solo: eine Person spricht für beide Seiten ---------- */
  async function soloEnd(G, cool, total, best) {
    const { ctx } = G;
    const ui = ctx.ui;
    const num = h('span', { class: 'display clash-big' }, '0');
    const wrap = ctx.screen([
      h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center' } },
        h('span', { class: 'eyebrow' }, 'Solo · Friedenstreppe'),
        h('h2', null, 'Beim ersten Versuch cool geblieben'),
        h('div', { class: 'row center' }, num, h('span', { class: 'display', style: { fontSize: '2em' } }, 'von ' + total)),
        best.isNew && cool > 0 ? h('span', { class: 'pill good' }, 'Neuer Bestwert!') : h('span', { class: 'pill' }, 'Dein Bestwert: ' + best.best),
        h('p', { class: 'muted' }, 'Zurückspulen ist kein Fehler. So findest du raus, was wirkt.')),
    ], { center: true, narrow: true });
    wrap.dataset.clash = 'solo-end';
    CREW.sound.play('good');
    await ui.countUp(num, 0, cool, 800);
    return ask(G, wrap, [{ label: 'Nochmal', value: 'again', variant: 'ghost', icon: 'shuffle' }, { label: 'Fertig', value: 'done', iconRight: 'right' }], 'center', true);
  }

  CREW.registerSolo({
    id: 'clash',
    title: 'Friedenstreppe',
    desc: 'Ein Streit, zwei Seiten. Bring beide nach oben.',
    icon: 'heart',
    async run(ctx) {
      for (;;) {
        const G = await play(ctx);
        if (!G) return;
        const played = G.log.filter((x) => !x.skipped);
        const cool = played.filter((x) => KIND[x.kind] && KIND[x.kind].good && !x.rewound).length;
        const best = ctx.best('cool', cool, true);
        const r = await soloEnd(G, cool, played.length, best);
        if (r !== 'again') return;
      }
    },
  });
})();

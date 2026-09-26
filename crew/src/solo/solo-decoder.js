/* Solo: „Gefühls-Decoder“ – Trainingsspiel zum Gefühle-Lesen, alleine am iPad.
   Idee aus den ISA-Materialien (Gefühle erkennen, „Alles eine Frage der Perspektive“):
   10 kurze Szenen. Welches Gefühl? Wie stark? Danach immer: warum (Körper, Worte, Situation).
   Punkte und Rekord nur für die Person selbst, ohne Namen, ohne Rangliste. */
(function () {
  const CREW = window.CREW;
  const reduced = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  // Bildschirm aufbauen und als Solo-Bildschirm markieren (für modul-eigenes CSS)
  function scr(ctx, kids, opts) { const w = ctx.screen(kids, opts); w.classList.add('solo-screen'); return w; }
  const SCENES = 10;

  /* ---------- Gefühls-Wörter ----------
     Jedes Wort gehört zu einem der 8 Grundgefühle der Antwort-Karte (Familie)
     oder ist eine Mischung. So lernt man genauere Wörter dazu. */
  const BASE = {
    Wut: '#ff5a4f', Angst: '#a98bff', Trauer: '#4aa3ff', Freude: '#ffc93c',
    Scham: '#ff8fc0', Stolz: '#ff9a3c', Ekel: '#8bdc5a', 'Überraschung': '#2ee6c5',
  };
  const WORDS = {
    Wut: { fam: 'Wut' }, Angst: { fam: 'Angst' }, Trauer: { fam: 'Trauer' }, Freude: { fam: 'Freude' },
    Scham: { fam: 'Scham' }, Stolz: { fam: 'Stolz' }, Ekel: { fam: 'Ekel' }, 'Überraschung': { fam: 'Überraschung' },
    'Ärger': { fam: 'Wut' }, Frust: { fam: 'Wut' }, Neid: { fam: 'Wut' },
    Eifersucht: { mix: ['Angst', 'Wut'] },
    'Nervosität': { fam: 'Angst' }, Unsicherheit: { fam: 'Angst' }, Sorge: { fam: 'Angst' },
    Schreck: { mix: ['Angst', 'Überraschung'] },
    'Enttäuschung': { fam: 'Trauer' }, Einsamkeit: { fam: 'Trauer' },
    Erleichterung: { fam: 'Freude' }, Vorfreude: { fam: 'Freude' }, Dankbarkeit: { fam: 'Freude' },
    Verlegenheit: { fam: 'Scham' }, 'Schuldgefühl': { fam: 'Scham' },
    'Mitgefühl': { color: '#f08cff', note: 'Ein Gefühl für andere: spüren, wie es jemandem geht.' },
    Langeweile: { color: '#9aa6c4', note: 'Im Kopf ist gerade „nichts los“.' },
  };
  const LEVELS = [null, 'leicht', 'mittel', 'stark'];

  function dotStyle(word) {
    const w = WORDS[word] || {};
    if (w.mix) return { background: `linear-gradient(135deg, ${BASE[w.mix[0]]} 0 50%, ${BASE[w.mix[1]]} 50% 100%)` };
    return { background: w.fam ? BASE[w.fam] : (w.color || '#c3bdf0') };
  }
  function colorOf(word) {
    const w = WORDS[word] || {};
    if (w.mix) return BASE[w.mix[0]];
    return w.fam ? BASE[w.fam] : (w.color || '#c3bdf0');
  }
  function familyText(word) {
    const w = WORDS[word];
    if (!w) return '';
    if (w.mix) return 'Eine Mischung aus ' + w.mix[0] + ' und ' + w.mix[1] + '.';
    if (w.note) return w.note;
    if (w.fam && w.fam !== word) return 'Gehört zur Familie ' + w.fam + '.';
    return 'Eines der 8 Grundgefühle.';
  }

  /* ---------- Figuren (erfundene Namen, einfache Silhouetten ohne Gesicht) ---------- */
  const SKIN = ['#f6d3b3', '#e9b48c', '#c98d62', '#9c6a45', '#6e4a31'];
  const PEOPLE = {
    Tiago: { hair: 'short', hc: '#2b1d14', skin: 2, top: '#3da5ff' },
    Lena: { hair: 'long', hc: '#e8c26a', skin: 0, top: '#ff4fa3' },
    Aylin: { hair: 'long', hc: '#1f140e', skin: 2, top: '#8a7dff' },
    Jeff: { hair: 'cap', hc: '#ff6b3d', skin: 0, top: '#2ee6c5' },
    Mia: { hair: 'bun', hc: '#5a3522', skin: 1, top: '#ffc93c' },
    Noah: { hair: 'curly', hc: '#1c120c', skin: 4, top: '#ff6b3d' },
    Sara: { hair: 'long', hc: '#7a4a2a', skin: 1, top: '#2ee6c5' },
    Luca: { hair: 'short', hc: '#6b4226', skin: 0, top: '#ff4fa3' },
    Emir: { hair: 'buzz', hc: '#1f1510', skin: 2, top: '#ffc93c' },
    Yara: { hair: 'curlylong', hc: '#24160f', skin: 3, top: '#3da5ff' },
    Dylan: { hair: 'cap', hc: '#3da5ff', skin: 3, top: '#ff9a3c' },
    'Inês': { hair: 'bun', hc: '#2a1a12', skin: 1, top: '#b184ff' },
    Lara: { hair: 'long', hc: '#b8502b', skin: 0, top: '#8bdc5a' },
    Milan: { hair: 'short', hc: '#d9b46a', skin: 0, top: '#ff5a4f' },
    Jana: { hair: 'bun', hc: '#8a5a36', skin: 0, top: '#3da5ff' },
    Rui: { hair: 'curly', hc: '#3a2618', skin: 2, top: '#8bdc5a' },
    Amira: { hair: 'scarf', hc: '#2ee6c5', skin: 2, top: '#8a7dff' },
    Kevin: { hair: 'buzz', hc: '#6b4a2f', skin: 1, top: '#ff4fa3' },
    Nora: { hair: 'long', hc: '#1c120c', skin: 4, top: '#ffc93c' },
    Elias: { hair: 'short', hc: '#3b2a1c', skin: 1, top: '#2ee6c5' },
  };
  const INK = '#0e0a26';
  function avatarSvg(name) {
    const p = PEOPLE[name] || { hair: 'short', hc: '#3b2a1c', skin: 1, top: '#8a7dff' };
    const sk = SKIN[p.skin] || SKIN[1];
    const hc = p.hc;
    const st = `stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"`;
    let back = '', front = '', head = `<ellipse cx="60" cy="58" rx="23" ry="26" fill="${sk}" ${st}/>`;
    switch (p.hair) {
      case 'long':
        back = `<path d="M33 60c-3-22 9-35 27-35s30 13 27 35l3 36c-9 5-21 7-30 7s-21-2-30-7z" fill="${hc}" ${st}/>`;
        front = `<path d="M36 56c0-17 10-27 24-27 15 0 25 10 24 27-7-10-17-14-31-12-7 1-12 5-17 12z" fill="${hc}" ${st}/>`;
        break;
      case 'curlylong':
        back = `<path d="M31 62c-4-22 9-37 29-37s33 15 29 37l2 30c-8 7-20 10-31 10s-23-3-31-10z" fill="${hc}" ${st}/>`;
        front = [[40, 42], [48, 34], [60, 31], [72, 34], [80, 42]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${hc}" ${st}/>`).join('')
          + `<path d="M34 48h52v6H34z" fill="${hc}"/>`;
        break;
      case 'bun':
        back = `<circle cx="60" cy="24" r="10" fill="${hc}" ${st}/>`;
        front = `<path d="M36 55c-1-16 9-25 24-25s25 9 24 25c-6-8-14-11-24-11s-18 3-24 11z" fill="${hc}" ${st}/>`;
        break;
      case 'curly':
        front = [[40, 44], [47, 35], [58, 31], [69, 32], [79, 39], [83, 49], [37, 53]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8.5" fill="${hc}" ${st}/>`).join('')
          + `<path d="M39 46h42v8H39z" fill="${hc}"/>`;
        break;
      case 'buzz':
        front = `<path d="M38 52c0-14 9-22 22-22s22 8 22 22c-6-6-13-8-22-8s-16 2-22 8z" fill="${hc}" ${st}/>`;
        break;
      case 'cap':
        front = `<path d="M36 50c0-14 10-22 24-22s24 8 24 22z" fill="${hc}" ${st}/><path d="M58 48h34c3 0 4 4 1 5l-8 3H58z" fill="${hc}" ${st}/><circle cx="60" cy="28" r="3" fill="${INK}"/>`;
        break;
      case 'scarf':
        back = `<path d="M30 64c0-25 13-39 30-39s30 14 30 39v26c-8 9-18 13-30 13s-22-4-30-13z" fill="${hc}" ${st}/>`;
        head = `<ellipse cx="60" cy="60" rx="19" ry="23" fill="${sk}" ${st}/>`;
        front = `<path d="M41 52c2-13 9-19 19-19s17 6 19 19" fill="none" stroke="${INK}" stroke-width="3" opacity=".35"/>`;
        break;
      default:
        front = `<path d="M35 57c-2-18 9-28 25-28s27 10 25 28c-4-9-12-13-25-13s-21 4-25 13z" fill="${hc}" ${st}/><path d="M58 31c6 0 14 3 18 10" fill="none" stroke="${INK}" stroke-width="2.5" opacity=".3"/>`;
    }
    return `<svg viewBox="0 0 120 130" class="solo-ava-svg" aria-hidden="true">
      <path d="M16 130c2-22 18-34 44-34s42 12 44 34z" fill="${p.top}" ${st}/>
      <path d="M44 99c4 8 9 12 16 12s12-4 16-12" fill="none" stroke="${INK}" stroke-width="3" opacity=".35"/>
      <path d="M52 104v14M68 104v14" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/>
      ${back}
      <path d="M51 82v14c3 3 6 4 9 4s6-1 9-4V82" fill="${sk}" ${st}/>
      ${head}
      ${front}
    </svg>`;
  }

  /* ---------- Hinweis-Arten ---------- */
  const PIN = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>';
  const BODY = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="2.2"/><path d="M5 9.5l7 1.5 7-1.5M12 11v4.5M12 15.5 8.5 21M12 15.5l3.5 5.5"/></svg>';
  const SIGNS = {
    koerper: { label: 'Körper', icon: () => h0('span', { class: 'ic', html: BODY }), q: 'Was machen Gesicht, Hände, Haltung?' },
    worte: { label: 'Worte', icon: () => CREW.icon('chat', 22), q: 'Was sagt die Person? Und wie?' },
    situation: { label: 'Situation', icon: () => h0('span', { class: 'ic', html: PIN }), q: 'Was ist gerade passiert?' },
  };
  function h0(tag, props, ...kids) { return CREW.util.h(tag, props, ...kids); }

  /* Stärke-Anzeige: drei Balken */
  function meter(level, cls) {
    return h0('span', { class: 'solo-meter' + (cls ? ' ' + cls : ''), 'aria-hidden': 'true' },
      [1, 2, 3].map((n) => h0('i', { class: n <= level ? 'on' : '' })));
  }

  /* Buchstaben-Scramble beim Decodieren */
  function scramble(el, word, ms) {
    if (reduced()) { el.textContent = word; return; }
    const chars = 'ABCDEFGHKLMNOPRSTUVWXZ0123456789#%';
    const t0 = performance.now();
    (function f(now) {
      if (!document.body.contains(el)) return;
      const k = Math.min(1, (now - t0) / ms);
      const n = Math.floor(k * word.length);
      el.textContent = word.slice(0, n) + Array.from(word.slice(n)).map((c) => (c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)])).join('');
      if (k < 1) requestAnimationFrame(f); else el.textContent = word;
    })(t0);
  }

  /* ---------- Kopfzeile: Szene, Serie, Punkte ---------- */
  function hud(ctx, run, i, total, extra) {
    const { h } = ctx;
    return h('div', { class: 'solo-dec-hud' },
      h('div', { class: 'stack', style: { gap: '6px' } },
        h('span', { class: 'eyebrow' }, 'Gefühls-Decoder · Szene ' + Math.min(i + 1, total) + ' von ' + total + (extra ? ' · ' + extra : '')),
        h('div', { class: 'solo-pips' }, Array.from({ length: total }, (_, k) => h('i', { class: k < i ? 'done' : k === i ? 'now' : '' })))),
      h('div', { class: 'row solo-dec-stats' },
        h('span', { class: 'solo-streak' + (run.streak >= 2 ? ' hot' : ''), title: 'Serie' }, flame(), h('b', null, String(run.streak)), h('span', { class: 'solo-stat-label' }, 'Serie')),
        h('span', { class: 'solo-score', title: 'Punkte' }, CREW.icon('bolt', 22), h('b', { class: 'solo-score-num' }, String(run.score)), h('span', { class: 'solo-stat-label' }, 'Punkte'))));
  }
  function flame() {
    return h0('span', { class: 'ic', html: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c-4 0-7-2.7-7-6.6 0-3.4 2.4-5.4 3.6-7.9.4 1.6 1.2 2.6 2.4 3.2C11 6.3 12.6 4 15 3c-.4 2.8.6 4.6 2 6.3 1.3 1.6 2 3.1 2 5.1C19 18.3 16 21 12 21z"/><path d="M12 21c-1.8 0-3-1.3-3-3 0-2 1.6-2.9 2.2-4.4.9 1.3 3.8 2.2 3.8 4.4 0 1.7-1.2 3-3 3z"/></svg>' });
  }

  /* ---------- Intro ---------- */
  function intro(ctx) {
    const { h, ui } = ctx;
    const rec = ctx.state.solo && ctx.state.solo['decoder:score'];
    let done;
    const p = new Promise((res) => { done = res; });
    scr(ctx, [
      h('div', { class: 'solo-dec-hero enter' },
        h('div', { class: 'stack', style: { gap: '6px' } },
          h('span', { class: 'eyebrow' }, 'Solo · Training'),
          h('h1', { class: 'outline-text' }, 'Gefühls-Decoder'),
          h('p', { class: 'lead' }, 'Lies die Szene. Finde das Gefühl. Schätz, wie stark es ist.')),
        h('div', { class: 'solo-dec-hero-art', 'aria-hidden': 'true' },
          h('div', { class: 'solo-dec-hero-bubble' }, '„Passt schon.“'),
          h('div', { class: 'solo-dec-hero-ava', html: avatarSvg('Mia') }, h('span', { class: 'solo-scanline' }), h('span', { class: 'solo-brackets' })),
          h('span', { class: 'solo-dec-hero-q' }, '?'))),
      h('div', { class: 'solo-signs-grid enter-2' }, Object.values(SIGNS).map((s) =>
        h('div', { class: 'card solo-sign-card' }, h('span', { class: 'solo-sign-ic' }, s.icon()), h('div', null, h('b', null, s.label), h('div', { class: 'muted small' }, s.q))))),
      h('div', { class: 'solo-dec-start enter-3' },
        h('div', { class: 'stack', style: { gap: '6px' } },
          h('span', { class: 'muted small' }, SCENES + ' Szenen · Gefühl +2 · Stärke +1'),
          rec != null ? h('span', { class: 'pill', id: 'dec-record' }, CREW.icon('trophy', 18), 'Dein Rekord: ' + rec + ' Punkte') : null),
        h('div', { class: 'row solo-dec-start-btns' },
          ui.btn('Zurück', () => done('back'), { variant: 'ghost', icon: 'left' }),
          ui.btn('Scan starten', () => done('go'), { big: true, iconRight: 'play', id: 'dec-start' }))),
    ]);
    return ctx.waitFor(p);
  }

  /* ---------- Eine Szene: Gefühl wählen, dann Stärke ---------- */
  async function scene(ctx, sc, i, total, run) {
    const { h, ui } = ctx;
    const opts = ctx.util.shuffle(sc.options);
    const speakText = sc.text + (sc.say ? ' ' + sc.who + ' sagt: ' + sc.say : '') + (sc.body ? ' ' + sc.body : '') + ' Was fühlt ' + sc.who + ' wohl?';
    const q = h('h3', { class: 'solo-dec-q' }, 'Was fühlt ' + sc.who + ' wohl am ehesten?');
    const area = h('div', { class: 'solo-dec-answers' });
    scr(ctx, [
      hud(ctx, run, i, total),
      h('div', { class: 'solo-dec-scene enter', 'data-scene': sc.id },
        h('div', { class: 'solo-dec-ava' },
          h('div', { class: 'solo-dec-ava-img', html: avatarSvg(sc.who) }, h('span', { class: 'solo-scanline' }), h('span', { class: 'solo-brackets' })),
          h('div', { class: 'row center', style: { gap: '8px' } }, h('span', { class: 'solo-dec-name' }, sc.who), ui.speakBtn(speakText))),
        h('div', { class: 'solo-dec-body' },
          h('div', { class: 'solo-dec-line sit' }, h('span', { class: 'solo-dec-tag', html: PIN }), h('p', null, sc.text)),
          sc.say ? h('div', { class: 'solo-dec-quote' }, '„' + sc.say + '“') : null,
          sc.body ? h('div', { class: 'solo-dec-line body' }, h('span', { class: 'solo-dec-tag', html: BODY }), h('p', null, sc.body)) : null)),
      h('div', { class: 'stack enter-2', style: { gap: '12px' } }, q, area),
    ]);

    // 1) Gefühl
    const pick = await ctx.waitFor(new Promise((res) => {
      opts.forEach((w) => {
        const b = h('button', { type: 'button', class: 'btn ghost solo-opt', 'data-word': w },
          h('span', { class: 'solo-dot-emo', style: dotStyle(w) }), h('span', null, w));
        b.addEventListener('click', () => { CREW.sound.play('tap'); area.querySelectorAll('button').forEach((x) => { x.disabled = true; }); b.classList.add('sel'); res(w); });
        area.appendChild(b);
      });
    }));
    if (pick === ctx.SKIP) return { skipped: true };

    // 2) Stärke
    await ctx.sleep(180);
    q.textContent = 'Und wie stark ist das bei ' + sc.who + '?';
    CREW.util.clear(area);
    area.classList.add('lv');
    area.appendChild(h('div', { class: 'solo-dec-chosen' }, h('span', { class: 'muted small' }, 'Dein Tipp:'), h('span', { class: 'chip sel solo-chip-static' }, h('span', { class: 'solo-dot-emo', style: dotStyle(pick) }), pick)));
    const level = await ctx.waitFor(new Promise((res) => {
      const row = h('div', { class: 'solo-lv-row' });
      [1, 2, 3].forEach((n) => {
        const b = h('button', { type: 'button', class: 'btn ghost solo-lv', 'data-level': n }, meter(n), h('span', null, LEVELS[n][0].toUpperCase() + LEVELS[n].slice(1)));
        b.addEventListener('click', () => { CREW.sound.play('tap'); row.querySelectorAll('button').forEach((x) => { x.disabled = true; }); b.classList.add('sel'); res(n); });
        row.appendChild(b);
      });
      area.appendChild(row);
    }));
    if (level === ctx.SKIP) return { skipped: true };
    return { pick, level };
  }

  /* ---------- Auflösung ---------- */
  async function reveal(ctx, sc, res, i, total, run) {
    const { h, ui } = ctx;
    const right = res.pick === sc.answer;
    const also = !right && (sc.also || []).includes(res.pick);
    const diff = Math.abs(res.level - sc.intensity);
    const ptsFeel = right ? 2 : also ? 1 : 0;
    const ptsLv = diff === 0 ? 1 : 0;
    const pts = ptsFeel + ptsLv;
    run.score += pts;
    run.played++;
    if (right || also) { run.found++; run.streak++; } else run.streak = 0;
    if (ptsLv) run.exact++;
    run.maxStreak = Math.max(run.maxStreak, run.streak);
    // Welche Hinweise haben geholfen? (für die Bilanz)
    (sc.signs || []).forEach((s) => { run.signs[s] = (run.signs[s] || 0) + 1; });

    const word = h('div', { class: 'display solo-dec-word', style: { color: colorOf(sc.answer) } }, sc.answer);
    const fbTitle = right ? 'Richtig gelesen!' : also ? 'Auch drin!' : 'Andere Spur';
    const fbText = right ? 'Die Hinweise passen genau.'
      : also ? res.pick + ' steckt auch mit drin. Am stärksten ist aber ' + sc.answer + '.'
        : 'Die Hinweise zeigen eher auf ' + sc.answer + '.';
    const lvText = diff === 0 ? 'Stärke genau getroffen: ' + LEVELS[sc.intensity] + '.'
      : diff === 1 ? 'Stärke knapp daneben. Eher ' + LEVELS[sc.intensity] + '.'
        : 'Stärke: eher ' + LEVELS[sc.intensity] + '.';
    const last = i >= total - 1;
    const wrap = scr(ctx, [
      hud(ctx, run, i, total, 'Auflösung'),
      h('div', { class: 'solo-dec-reveal' },
        h('div', { class: 'solo-dec-result enter', 'data-result': right ? 'right' : also ? 'also' : 'other' },
          h('div', { class: 'row', style: { gap: '10px', flexWrap: 'nowrap' } },
            h('div', { class: 'solo-dec-mini', html: avatarSvg(sc.who) }),
            h('span', { class: 'muted solo-dec-recap' }, sc.say ? '„' + sc.say + '“' : sc.who)),
          h('span', { class: 'eyebrow' }, 'Decodiert'),
          word,
          h('div', { class: 'row', style: { gap: '10px' } }, meter(sc.intensity, 'big'), h('b', null, LEVELS[sc.intensity])),
          h('p', { class: 'muted small' }, familyText(sc.answer))),
        h('div', { class: 'stack solo-dec-side' },
          h('div', { class: 'solo-dec-fb enter-2 ' + (right ? 'right' : also ? 'also' : 'other') },
            h('div', { class: 'row between', style: { flexWrap: 'nowrap' } },
              h('h3', null, fbTitle),
              h('span', { class: 'pill solo-pts pop' + (pts ? ' good' : '') }, '+' + pts)),
            h('p', null, fbText),
            h('p', { class: 'muted' }, lvText),
            h('div', { class: 'solo-dec-yours' },
              h('span', { class: 'muted small' }, 'Dein Tipp:'),
              h('span', { class: 'solo-dot-emo', style: dotStyle(res.pick) }),
              h('b', null, res.pick),
              meter(res.level),
              h('span', { class: 'muted small' }, LEVELS[res.level]))),
          h('div', { class: 'card stack solo-dec-why enter-3' },
            h('div', { class: 'row between' }, h('b', null, 'Warum?'),
              h('div', { class: 'row', style: { gap: '6px' } }, Object.entries(SIGNS).map(([k, s]) =>
                h('span', { class: 'solo-sign' + ((sc.signs || []).includes(k) ? ' on' : ''), title: s.label }, s.icon(), h('span', null, s.label))))),
            h('p', { class: 'solo-dec-clue' }, sc.clue)))),
    ]);
    scramble(word, sc.answer, 650);
    CREW.sound.play('reveal');
    // Serie feiern
    const s = run.streak;
    if ((right || also) && [3, 5, 7, 10].includes(s)) {
      const msg = { 3: '3er-Serie! Du hast den Blick.', 5: '5er-Serie! Echter Gefühls-Profi.', 7: '7er-Serie! Stark.', 10: 'Alle 10! Perfekter Scan.' }[s];
      setTimeout(() => { CREW.sound.play('great'); ui.toast(msg, 2600); if (s >= 5) ui.confetti(s >= 10 ? 180 : 90); }, 500);
    } else {
      setTimeout(() => CREW.sound.play(right || also ? 'good' : 'soft'), 450);
    }
    const r = await ctx.waitFor(ui.choice(wrap, [{ label: last ? 'Zur Bilanz' : 'Nächste Szene', value: 'next', iconRight: 'right', id: 'dec-next' }], { align: 'end' }));
    return r;
  }

  /* ---------- Bilanz ---------- */
  async function summary(ctx, run, total) {
    const { h, ui } = ctx;
    let done;
    const p = new Promise((res) => { done = res; });
    if (!run.played) {
      scr(ctx, [
        h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center' } },
          h('span', { class: 'eyebrow' }, 'Scan beendet'),
          h('h2', null, 'Heute nur reingeschaut. Auch okay.'),
          h('p', { class: 'lead muted' }, 'Du kannst jederzeit wiederkommen.')),
        h('div', { class: 'row center' },
          ui.btn('Nochmal', () => done('again'), { variant: 'ghost', icon: 'undo', id: 'dec-again' }),
          ui.btn('Fertig', () => done('done'), { icon: 'check', id: 'dec-done' })),
      ], { center: true, narrow: true });
      const r0 = await ctx.waitFor(p);
      return r0 === ctx.SKIP ? 'done' : r0;
    }
    const b = ctx.best('score', run.score);
    ctx.best('serie', run.maxStreak);
    const ratio = run.score / (run.played * 3);
    const praise = ratio >= 0.8 ? 'Du liest Menschen richtig gut.'
      : ratio >= 0.55 ? 'Starker Blick für Gefühle.'
        : ratio >= 0.3 ? 'Gute Spur! Jede Runde schärft den Blick.'
          : 'Gefühle lesen ist schwer. Genau das trainierst du gerade.';
    const topSign = Object.entries(run.signs).sort((a, c) => c[1] - a[1])[0];
    const num = h('span', { class: 'display solo-dec-big' }, '0');
    const wrap = scr(ctx, [
      h('div', { class: 'stack', style: { alignItems: 'center', textAlign: 'center', gap: '8px' } },
        h('span', { class: 'eyebrow' }, 'Scan beendet · Deine Bilanz'),
        h('h2', null, praise)),
      h('div', { class: 'row center solo-dec-total' }, CREW.icon('bolt', 48), num, h('span', { class: 'display', style: { fontSize: '1.5em' } }, 'Punkte')),
      h('div', { class: 'row center' }, b.isNew
        ? h('span', { class: 'pill good pop', id: 'dec-newrecord' }, CREW.icon('trophy', 18), 'Neuer Rekord!')
        : h('span', { class: 'pill', id: 'dec-record' }, CREW.icon('trophy', 18), 'Dein Rekord: ' + b.best)),
      h('div', { class: 'solo-dec-tiles' },
        h('div', { class: 'card solo-dec-tile' }, h('b', { class: 'display' }, run.found + '/' + run.played), h('span', { class: 'muted small' }, 'Gefühle erkannt')),
        h('div', { class: 'card solo-dec-tile' }, h('b', { class: 'display' }, String(run.exact)), h('span', { class: 'muted small' }, 'Stärke genau')),
        h('div', { class: 'card solo-dec-tile' }, h('b', { class: 'display' }, String(run.maxStreak)), h('span', { class: 'muted small' }, 'Beste Serie'))),
      h('div', { class: 'card soft row solo-dec-tip', style: { flexWrap: 'nowrap' } }, CREW.icon('chat', 26),
        h('p', null, (topSign ? 'Oft half der Blick auf: ' + SIGNS[topSign[0]].label + '. ' : '') + 'Im echten Leben kannst du auch einfach fragen: „Alles okay?“')),
      h('p', { class: 'muted small', style: { textAlign: 'center' } }, 'Punkte und Rekord sieht nur dieses Gerät. Ohne Namen.'),
    ], { center: true, narrow: true });
    CREW.sound.play(b.isNew ? 'great' : 'good');
    if (b.isNew) ui.confetti(120);
    ui.countUp(num, 0, run.score, 900);
    const r = await ctx.waitFor(ui.choice(wrap, [
      { label: 'Nochmal', value: 'again', variant: 'ghost', icon: 'undo', id: 'dec-again' },
      { label: 'Fertig', value: 'done', icon: 'check', id: 'dec-done' },
    ]));
    return r === ctx.SKIP ? 'done' : r;
  }

  /* =========================================================
     Registrierung
     ========================================================= */
  CREW.registerSolo({
    id: 'decoder',
    title: 'Gefühls-Decoder',
    desc: 'Kurze Szenen: Welches Gefühl steckt dahinter? Und wie stark?',
    icon: 'eye',
    themes: ['Gefühle erkennen', 'Fremdwahrnehmung', 'Empathie'],
    eldib: [
      { code: 'K-21', text: 'erkennt Gefühle bei anderen' },
      { code: 'KOG-38', text: 'erklärt, warum sich jemand so verhält (Ursache – Wirkung)' },
      { code: 'K-29', text: 'beschreibt Zusammenhänge zwischen Situation, Verhalten und Gefühl' },
      { code: 'SOZ-37', text: 'versteht die Lage und Gefühle anderer und respektiert sie' },
    ],
    async run(ctx) {
      const first = await intro(ctx);
      if (first === 'back') return;
      for (;;) {
        const cards = ctx.pick('decoder', SCENES);
        const total = cards.length;
        const run = { score: 0, streak: 0, maxStreak: 0, played: 0, found: 0, exact: 0, signs: {} };
        for (let i = 0; i < total; i++) {
          const res = await scene(ctx, cards[i], i, total, run);
          if (res.skipped) continue; // X-Karte: Szene auslassen, ohne Folgen
          const r = await reveal(ctx, cards[i], res, i, total, run);
          if (r === ctx.SKIP) continue;
        }
        const end = await summary(ctx, run, total);
        if (end !== 'again') return;
      }
    },
  });
})();

/* CREW – UI-Bausteine. Alle Missionen bauen ihre Bildschirme hiermit. */
(function () {
  'use strict';
  const CREW = window.CREW;
  const { h, clear, sleep } = CREW.util;

  const stage = () => document.getElementById('stage');
  const overlays = () => document.getElementById('overlays');

  /* Bildschirm ersetzen */
  function screen(children, opts) {
    const o = opts || {};
    const st = stage();
    CREW.stopSpeaking();
    clear(st);
    const wrap = h('div', { class: 'wrap' + (o.center ? ' center' : '') + (o.narrow ? ' narrow' : '') }, children);
    st.appendChild(wrap);
    st.scrollTop = 0;
    return wrap;
  }

  function btn(label, onClick, opts) {
    const o = opts || {};
    const cls = ['btn', o.variant || '', o.big ? 'big' : '', o.small ? 'small' : '', o.wide ? 'wide' : '', o.cls || ''].filter(Boolean).join(' ');
    const b = h('button', { type: 'button', class: cls, id: o.id, disabled: o.disabled, 'aria-label': o.aria },
      o.icon ? CREW.icon(o.icon, o.big ? 30 : 24) : null,
      label != null ? h('span', null, label) : null,
      o.iconRight ? CREW.icon(o.iconRight, o.big ? 30 : 24) : null);
    b.addEventListener('click', (e) => {
      if (!o.silent) CREW.sound.play('tap');
      if (onClick) onClick(e);
    });
    return b;
  }

  function iconBtn(name, onClick, opts) {
    const o = opts || {};
    const b = h('button', { type: 'button', class: 'icon-btn ' + (o.cls || ''), 'aria-label': o.label, title: o.label, id: o.id }, o.text ? o.text : CREW.icon(name, 24));
    b.addEventListener('click', (e) => { CREW.sound.play('tap'); if (onClick) onClick(e); });
    return b;
  }

  function speakBtn(text, opts) {
    if (!CREW.state.settings.speech || !CREW.canSpeak()) return null;
    return iconBtn('speaker', () => CREW.speak(typeof text === 'function' ? text() : text), { label: 'Vorlesen', cls: (opts && opts.cls) || '' });
  }

  /* Große Karte mit Text zum Vorlesen */
  function say(text, opts) {
    const o = opts || {};
    const sb = speakBtn(o.speakText || text);
    return h('div', { class: 'bigcard enter' + (o.cls ? ' ' + o.cls : '') },
      o.eyebrow ? h('div', { class: 'row between' }, h('span', { class: 'eyebrow' }, o.eyebrow), sb) : null,
      h('div', { class: 'say' }, text),
      !o.eyebrow && sb ? h('div', { class: 'row end' }, sb) : null,
      o.extra || null);
  }

  /* Knöpfe anzeigen und auf Wahl warten */
  function choice(container, options, opts) {
    const o = opts || {};
    return new Promise((resolve) => {
      const row = h('div', { class: 'row ' + (o.align || 'center') });
      options.forEach((opt) => {
        row.appendChild(btn(opt.label, () => { row.querySelectorAll('button').forEach((b) => (b.disabled = true)); resolve(opt.value !== undefined ? opt.value : opt.label); }, {
          variant: opt.variant, big: o.big !== false, icon: opt.icon, iconRight: opt.iconRight, id: opt.id,
        }));
      });
      container.appendChild(row);
    });
  }
  const next = (container, label, opts) => choice(container, [{ label: label || 'Weiter', value: true, iconRight: 'right', variant: (opts && opts.variant) || '' }], opts);

  /* Zahl einstellen */
  function stepper(o) {
    let v = o.value != null ? o.value : o.min || 0;
    const val = h('div', { class: 'val', 'aria-live': 'polite' }, String(v));
    const set = (n) => {
      v = Math.max(o.min != null ? o.min : 0, Math.min(o.max != null ? o.max : 99, n));
      val.textContent = String(v);
      if (o.onChange) o.onChange(v);
    };
    const el = h('div', { class: 'stepper' },
      iconBtn('minus', () => set(v - 1), { label: 'weniger' }),
      val,
      iconBtn('plus', () => set(v + 1), { label: 'mehr' }));
    return { el, get: () => v, set };
  }

  /* Strichliste: Anzahl pro Option */
  function tally(options, o) {
    const counts = Object.fromEntries(options.map((x) => [x.id, 0]));
    const max = (o && o.max) || 99;
    const total = () => Object.values(counts).reduce((a, b) => a + b, 0);
    const el = h('div', { class: 'tally' });
    options.forEach((opt) => {
      const num = h('div', { class: 't-count' }, '0');
      const set = (n) => {
        const others = total() - counts[opt.id];
        counts[opt.id] = Math.max(0, Math.min(n, max - others));
        num.textContent = String(counts[opt.id]);
        if (o && o.onChange) o.onChange(counts, total());
      };
      el.appendChild(h('div', { class: 't-item' },
        opt.icon || null,
        h('div', { class: 't-label' }, opt.label),
        num,
        h('div', { class: 't-ctrl' },
          iconBtn('minus', () => set(counts[opt.id] - 1), { label: opt.label + ' weniger' }),
          iconBtn('plus', () => set(counts[opt.id] + 1), { label: opt.label + ' mehr' }))));
    });
    return { el, get: () => ({ ...counts }), total };
  }

  /* Gezeigte Zahlen schnell eintippen */
  function valuePad(o) {
    const values = [];
    const chips = h('div', { class: 'valuechips', 'aria-live': 'polite' });
    const render = () => {
      clear(chips);
      if (!values.length) chips.appendChild(h('span', { class: 'muted' }, o.placeholder || 'Tippe die gezeigten Zahlen ein …'));
      values.forEach((v) => chips.appendChild(h('span', { class: 'v' }, String(v))));
      if (o.onChange) o.onChange(values.slice());
    };
    const pad = h('div', { class: 'valuepad' });
    for (let n = o.min || 0; n <= (o.max != null ? o.max : 10); n++) {
      pad.appendChild(btn(String(n), () => { if (!o.count || values.length < o.count) { values.push(n); render(); } }, { variant: 'ghost' }));
    }
    const undo = btn('Zurück', () => { values.pop(); render(); }, { variant: 'ghost', small: true, icon: 'undo' });
    render();
    const el = h('div', { class: 'stack' }, chips, pad, h('div', { class: 'row end' }, undo));
    return { el, get: () => values.slice() };
  }

  /* Timer-Ring */
  function timer(seconds, o) {
    const opts = o || {};
    const R = 52, C = 2 * Math.PI * R;
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ring.setAttribute('viewBox', '0 0 120 120');
    ring.innerHTML = `<circle cx="60" cy="60" r="${R}" fill="none" stroke="currentColor" stroke-opacity=".18" stroke-width="10"/><circle class="arc" cx="60" cy="60" r="${R}" fill="none" stroke="var(--yellow)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="0"/>`;
    const num = h('div', { class: 'num' }, String(seconds));
    const el = h('div', { class: 'timer', role: 'timer' }, ring, num);
    let left = seconds, iv = null;
    const arc = ring.querySelector('.arc');
    const tick = () => {
      left -= 1;
      num.textContent = String(Math.max(0, left));
      arc.setAttribute('stroke-dashoffset', String(C * (1 - left / seconds)));
      if (left <= 5 && left > 0) CREW.sound.play('tick');
      if (left <= 0) { stop(); if (opts.onDone) opts.onDone(); }
    };
    const start = () => { if (!iv) iv = setInterval(() => { if (!document.body.contains(el)) return stop(); tick(); }, 1000); };
    const stop = () => { clearInterval(iv); iv = null; };
    if (opts.autostart !== false) start();
    return { el, start, stop };
  }

  /* 3 – 2 – 1 – Zeigt her! */
  async function threeTwoOne(text) {
    const root = overlays();
    const ov = h('div', { class: 'overlay', style: { background: 'color-mix(in srgb, var(--ink) 55%, transparent)' } });
    root.appendChild(ov);
    for (const n of ['3', '2', '1']) {
      clear(ov);
      ov.appendChild(h('div', { class: 'countdown-big' }, n));
      CREW.sound.play('count');
      await sleep(650);
    }
    clear(ov);
    ov.appendChild(h('div', { class: 'countdown-big', style: { fontSize: 'clamp(3em, 10vw, 7em)' } }, text || 'Zeigt her!'));
    CREW.sound.play('go');
    await sleep(900);
    ov.remove();
  }

  /* Dialog (ersetzt confirm/alert, die im Rahmen nicht gehen) */
  function modal(o) {
    return new Promise((resolve) => {
      const root = overlays();
      const close = (v) => { ov.remove(); resolve(v); };
      const actions = h('div', { class: 'row end' });
      (o.actions || [{ label: 'OK', value: true }]).forEach((a) => actions.appendChild(btn(a.label, () => close(a.value), { variant: a.variant || '', icon: a.icon })));
      const box = h('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true' },
        o.title ? h('h2', null, o.title) : null,
        o.body instanceof Node ? o.body : o.body ? h('p', { class: 'lead' }, o.body) : null,
        actions);
      const ov = h('div', { class: 'overlay' }, box);
      if (o.dismissable !== false) ov.addEventListener('click', (e) => { if (e.target === ov) close(null); });
      root.appendChild(ov);
      const first = actions.querySelector('button');
      if (first) first.focus();
    });
  }
  const confirm = (title, body, yes, no) =>
    modal({ title, body, actions: [{ label: no || 'Abbrechen', value: false, variant: 'ghost' }, { label: yes || 'Ja', value: true }] }).then((v) => v === true);

  function toast(msg, ms) {
    const t = h('div', { class: 'toast', role: 'status' }, msg);
    overlays().appendChild(t);
    setTimeout(() => t.remove(), ms || 2200);
  }

  /* Konfetti */
  function confetti(amount) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = h('canvas', { class: 'confetti-canvas' });
    document.body.appendChild(c);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = innerWidth * dpr; c.height = innerHeight * dpr;
    const g = c.getContext('2d');
    g.scale(dpr, dpr);
    const css = getComputedStyle(document.getElementById('app'));
    const cols = ['--yellow', '--accent', '--good', '--teamA', '--teamB'].map((v) => css.getPropertyValue(v).trim() || '#ffc93c');
    const N = amount || 140;
    const ps = Array.from({ length: N }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * 200, y: innerHeight * 0.55,
      vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 18 - 6,
      r: Math.random() * 6 + 5, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.4,
      c: cols[Math.floor(Math.random() * cols.length)],
    }));
    let f = 0;
    (function loop() {
      g.clearRect(0, 0, innerWidth, innerHeight);
      ps.forEach((p) => {
        p.vy += 0.45; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.va;
        g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.fillStyle = p.c; g.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); g.restore();
      });
      if (++f < 150) requestAnimationFrame(loop); else c.remove();
    })();
  }

  /* Zahl hochzählen */
  function countUp(el, from, to, ms) {
    const t0 = performance.now();
    const dur = ms || 900;
    return new Promise((res) => {
      (function frame(t) {
        const k = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - k, 3);
        el.textContent = String(Math.round(from + (to - from) * e));
        if (k < 1) requestAnimationFrame(frame); else res();
      })(t0);
    });
  }

  /* Hinweis, welche Antwort-Karte die Jugendlichen öffnen sollen */
  const PADDLES = {
    wetter: 'Wetter', zahl: 'Zahl 0–10', janein: 'Ja / Nein', abcd: 'A B C D', team: 'Team', emo: 'Gefühl',
  };
  function paddleHint(type, extra) {
    return h('div', { class: 'paddle-hint' }, CREW.icon('phone', 22), h('span', null, 'Antwort-Karte: ', h('b', null, PADDLES[type] || type), extra ? ' · ' + extra : ''));
  }

  CREW.ui = { screen, btn, iconBtn, speakBtn, say, choice, next, stepper, tally, valuePad, timer, threeTwoOne, modal, confirm, toast, confetti, countUp, paddleHint, PADDLES, stage, overlays };
})();

// Kraft-Rad (WP19): Kraft-Knopf halten (≥ 0,25 s) öffnet ein Rad mit 4 Segmenten um den Knopf (Daumen bleibt liegen,
// zum Segment ziehen, loslassen = wählen). Tippen = aktive Kraft. Tasten 1–4 wählen direkt, Q halten öffnet das Rad.
// Gesperrte Segmente sind grau mit Schloss. Während das Rad offen ist, läuft die Welt in Zeitlupe (25 %).
// Im Flug (Profi oder wenn Federn da sind) zeigt ein äußerer Ring die 6 Federn (Segel-Modus).
// DOM: .kraftrad [data-kraft-segment="1..4"] · [data-kraft-feather="freude"]; Segmente ≥ 72 px.
// Ereignisse: kraftrad:open · kraftrad:select {segment, id} · kraftrad:feather {emotion} · kraftrad:locked {id} ·
//   kraftrad:close · kraft:tap {id} (aktive Kraft benutzen) · kraft:active {id}
const FALLBACK_ICON = {
  blick: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  teamgeist: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M3 20c0-4 3-6 5-6s5 2 5 6M13 20c0-3 2-5 4-5s4 2 4 5"/></svg>',
  ruhe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15c3-4 6-4 9 0s6 4 9 0"/><path d="M3 9c3-4 6-4 9 0s6 4 9 0"/></svg>',
  mut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14l10-6v11L4 14z"/><path d="M14 8c3 0 6 3 6 6M14 5c5 0 9 4 9 9"/></svg>',
  schloss: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  sonne: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></svg>',
  flamme: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c-4 0-7-3-7-7 0-3 2-5 3-7 1 2 2 3 3 3 0-3 1-6 3-8 1 4 5 6 5 12 0 4-3 7-7 7z"/></svg>',
  zickzack: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L5 13h6l-1 9 9-12h-6z"/></svg>',
  tropfen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 3s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z"/></svg>',
  wirbel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 12a3 3 0 1 0 3 3M12 12a6 6 0 1 1-6 6M12 12a9 9 0 1 0 9-9"/></svg>',
  stern: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 17l-5.6 3 1.3-6.2L3 9.5l6.3-.7z"/></svg>',
};
export const DEFAULT_SEGMENTS = [
  { id: 'blick', label: 'Blick', icon: 'auge', color: '#7ff0ff' },
  { id: 'teamgeist', label: 'Teamgeist', icon: 'crew', color: '#ffd166' },
  { id: 'ruhe', label: 'Ruhe', icon: 'welle', color: '#9fe8b0' },
  { id: 'mut', label: 'Mut', icon: 'horn', color: '#ff8c8c' },
];
const FEATHERS = [
  { id: 'freude', label: 'Freude', icon: 'sonne', color: '#ffd23f' },
  { id: 'ueberraschung', label: 'Überraschung', icon: 'stern', color: '#2de2c9' },
  { id: 'ekel', label: 'Ekel', icon: 'wirbel', color: '#45d15a' },
  { id: 'wut', label: 'Wut', icon: 'flamme', color: '#ff3b3b' },
  { id: 'angst', label: 'Angst', icon: 'zickzack', color: '#9b5cff' },
  { id: 'trauer', label: 'Trauer', icon: 'tropfen', color: '#3d7bff' },
];
const ICON_ALIAS = { auge: 'blick', crew: 'teamgeist', welle: 'ruhe', horn: 'mut' };
const R_OUT = 128, R_IN = 44, R_FEATHER = 178;   // Pixel: Segment radial 84 px, Bogen ≈ 135 px → ≥ 72 px Touch-Ziel

const CSS = `
.kraftrad{position:absolute;left:0;top:0;width:0;height:0;z-index:12;pointer-events:none;opacity:0;transition:opacity .12s ease}
.kraftrad.is-open{opacity:1}
.kraftrad svg{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}
.kraftrad .kr-seg{pointer-events:auto;cursor:pointer;fill:rgba(28,16,52,.78);stroke:rgba(255,255,255,.55);stroke-width:2;transition:fill .08s ease}
.kraftrad .kr-seg.is-hot{fill:rgba(255,255,255,.28);stroke:#fff;stroke-width:3}
.kraftrad .kr-seg.is-active{stroke:var(--c-gold,#ffd166);stroke-width:3}
.kraftrad .kr-seg.is-locked{fill:rgba(60,60,70,.7);stroke:rgba(255,255,255,.25)}
.kraftrad .kr-feather{pointer-events:auto;cursor:pointer;fill:rgba(28,16,52,.7);stroke:rgba(255,255,255,.4);stroke-width:2}
.kraftrad .kr-feather.is-hot{fill:rgba(255,255,255,.3);stroke:#fff;stroke-width:3}
.kraftrad .kr-feather.is-on{stroke-width:3.5}
.kraftrad .kr-feather.is-locked{fill:rgba(60,60,70,.6);stroke:rgba(255,255,255,.2)}
.kraftrad .kr-ico{position:absolute;width:34px;height:34px;margin:-17px 0 0 -17px;color:#fff;pointer-events:none;filter:drop-shadow(0 2px 3px rgba(0,0,0,.5))}
.kraftrad .kr-ico svg{position:static;width:34px;height:34px;display:block}
.kraftrad .kr-ico.is-locked{color:rgba(255,255,255,.45)}
.kraftrad .kr-ico.is-locked::after{content:"";position:absolute;right:-8px;bottom:-8px;width:16px;height:16px;background:rgba(0,0,0,.6);border-radius:50%}
.kraftrad .kr-lock{position:absolute;width:14px;height:14px;right:-7px;bottom:-7px;color:#fff;pointer-events:none}
.kraftrad .kr-lock svg{width:14px;height:14px;position:static;display:block}
.kraftrad .kr-label{position:absolute;left:0;top:0;transform:translate(-50%,-50%);font:900 15px/1 var(--font,system-ui);color:#fff;text-shadow:0 2px 4px rgba(0,0,0,.6);white-space:nowrap;pointer-events:none}
.kraftrad .kr-center{position:absolute;transform:translate(-50%,-50%);font:800 13px/1.2 var(--font,system-ui);color:#fff;text-align:center;text-shadow:0 2px 4px rgba(0,0,0,.6);pointer-events:none;width:80px}
.kraftrad .kr-center b{display:block;font-size:16px}
.no-touch .kraftrad .kr-center small{display:block;opacity:.7;font-size:11px;margin-top:2px}
`;

function arcPath(cx, cy, r0, r1, a0, a1) {
  const p = (r, a) => `${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${p(r0, a0)} L ${p(r1, a0)} A ${r1} ${r1} 0 ${large} 1 ${p(r1, a1)} L ${p(r0, a1)} A ${r0} ${r0} 0 ${large} 0 ${p(r0, a0)} Z`;
}

export function createKraftRad({ root, input, events, game, audio }) {
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);
  const el = document.createElement('div');
  el.className = 'kraftrad hud-interactive';
  el.setAttribute('aria-hidden', 'true');
  root.appendChild(el);

  let segments = DEFAULT_SEGMENTS.map((s) => ({ ...s, locked: true }));
  let feathers = null;           // Liste erlaubter Federn (ids) oder null = kein Federring
  let active = null;             // aktive Kraft (id)
  let activeFeather = 'neutral';
  let open = false, hot = null, hotFeather = null;
  let cx = 0, cy = 0;
  let onSelect = null;
  const iconFn = (name) => {
    const ic = game.ui && game.ui.icon;
    if (ic) { try { const s = ic(name, { size: 34 }); if (s) return s; } catch (e) { /* Fallback */ } }
    return FALLBACK_ICON[name] || FALLBACK_ICON[ICON_ALIAS[name]] || FALLBACK_ICON.stern;
  };

  function center() {
    const btn = root.querySelector('.hud-btn-power');
    const W = root.clientWidth, H = root.clientHeight;
    const rr = feathers ? R_FEATHER : R_OUT;
    if (btn && btn.offsetParent !== null && getComputedStyle(btn).visibility !== 'hidden') {
      const b = btn.getBoundingClientRect();
      cx = b.left + b.width / 2; cy = b.top + b.height / 2;
    } else { cx = W - rr - 30; cy = H - rr - 30; }
    cx = Math.max(rr + 10, Math.min(W - rr - 10, cx));
    cy = Math.max(rr + 10, Math.min(H - rr - 10, cy));
  }
  function render() {
    center();
    const size = (feathers ? R_FEATHER : R_OUT) * 2 + 20;
    const ox = size / 2, oy = size / 2;
    el.style.left = (cx - ox) + 'px'; el.style.top = (cy - oy) + 'px'; el.style.width = size + 'px'; el.style.height = size + 'px';
    let html = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`;
    // 4 Segmente: oben, rechts, unten, links (Start oben links −135°)
    segments.forEach((s, i) => {
      const a0 = -Math.PI * 0.75 + i * Math.PI / 2 + 0.03, a1 = a0 + Math.PI / 2 - 0.06;
      const cls = 'kr-seg' + (s.locked ? ' is-locked' : '') + (s.id === active ? ' is-active' : '') + (hot === i ? ' is-hot' : '');
      html += `<path class="${cls}" data-kraft-segment="${i + 1}" data-id="${s.id}" d="${arcPath(ox, oy, R_IN, R_OUT, a0, a1)}" style="${s.locked ? '' : `--seg:${s.color}`}"/>`;
    });
    if (feathers) {
      FEATHERS.forEach((f, i) => {
        const a0 = -Math.PI / 2 - Math.PI / 6 + i * Math.PI / 3 + 0.02, a1 = a0 + Math.PI / 3 - 0.04;
        const locked = !feathers.includes(f.id);
        const cls = 'kr-feather' + (locked ? ' is-locked' : '') + (f.id === activeFeather ? ' is-on' : '') + (hotFeather === i ? ' is-hot' : '');
        html += `<path class="${cls}" data-kraft-feather="${f.id}" d="${arcPath(ox, oy, R_OUT + 6, R_FEATHER, a0, a1)}" style="stroke:${locked ? '' : f.color}"/>`;
      });
    }
    html += '</svg>';
    segments.forEach((s, i) => {
      const a = -Math.PI * 0.75 + i * Math.PI / 2 + Math.PI / 4;
      const r = (R_IN + R_OUT) / 2;
      const x = ox + Math.cos(a) * r, y = oy + Math.sin(a) * r;
      html += `<div class="kr-ico${s.locked ? ' is-locked' : ''}" style="left:${x}px;top:${y - 8}px;color:${s.locked ? '' : s.color}">${iconFn(s.icon)}${s.locked ? `<span class="kr-lock">${FALLBACK_ICON.schloss}</span>` : ''}</div>`;
      html += `<div class="kr-label" style="left:${x}px;top:${y + 22}px;opacity:${s.locked ? 0.55 : 1}">${s.label}</div>`;
    });
    if (feathers) {
      FEATHERS.forEach((f, i) => {
        const a = -Math.PI / 2 - Math.PI / 6 + i * Math.PI / 3 + Math.PI / 6;
        const r = (R_OUT + 6 + R_FEATHER) / 2;
        const x = ox + Math.cos(a) * r, y = oy + Math.sin(a) * r;
        const locked = !feathers.includes(f.id);
        html += `<div class="kr-ico${locked ? ' is-locked' : ''}" style="left:${x}px;top:${y}px;color:${locked ? '' : f.color}">${iconFn(f.icon)}</div>`;
      });
    }
    const act = segments.find((s) => s.id === active);
    html += `<div class="kr-center" style="left:${ox}px;top:${oy}px"><b>${act ? act.label : '–'}</b><small>1–4 · Q</small></div>`;
    el.innerHTML = html;
    el.querySelectorAll('[data-kraft-segment]').forEach((p) => p.addEventListener('click', (e) => { e.stopPropagation(); select(+p.dataset.kraftSegment - 1); }));
    el.querySelectorAll('[data-kraft-feather]').forEach((p) => p.addEventListener('click', (e) => { e.stopPropagation(); selectFeather(p.dataset.kraftFeather); }));
  }
  // Welches Segment liegt unter dem Finger? → { seg, feather } (null = keins)
  function hotAt(x, y) {
    const dx = x - cx, dy = y - cy;
    const d = Math.hypot(dx, dy);
    const out = { seg: null, feather: null };
    if (d < R_IN * 0.8) return out;
    const a = Math.atan2(dy, dx);
    if (feathers && d > R_OUT + 6) {
      let k = Math.round((a + Math.PI / 2) / (Math.PI / 3));
      out.feather = ((k % 6) + 6) % 6;
      return out;
    }
    if (d > R_OUT + 24) return out;
    let k = Math.floor((a + Math.PI * 0.75) / (Math.PI / 2));
    out.seg = ((k % 4) + 4) % 4;
    return out;
  }
  function setHot(i, f = null) {
    if (i === hot && f === hotFeather) return;
    hot = i; hotFeather = f;
    el.querySelectorAll('.kr-seg').forEach((p, k) => p.classList.toggle('is-hot', k === hot));
    el.querySelectorAll('.kr-feather').forEach((p, k) => p.classList.toggle('is-hot', k === hotFeather));
    if (hot !== null || hotFeather !== null) audio.play('radtick');
  }
  function select(i, source = 'rad') {
    const s = segments[i];
    if (!s) return false;
    if (s.locked) { events.emit('kraftrad:locked', { id: s.id, segment: i + 1 }); audio.play('error'); return false; }
    active = s.id;
    events.emit('kraftrad:select', { segment: i + 1, id: s.id, source });
    events.emit('kraft:active', { id: s.id });
    audio.play('click');
    if (onSelect) onSelect(s);
    close(false);
    return true;
  }
  function selectFeather(id) {
    if (!feathers || !feathers.includes(id)) { events.emit('kraftrad:locked', { id }); audio.play('error'); return false; }
    activeFeather = id;
    events.emit('kraftrad:feather', { emotion: id });
    audio.play('click');
    close(false);
    return true;
  }
  function show() {
    if (open) return;
    open = true; hot = null; hotFeather = null;
    render();
    el.classList.add('is-open');
    el.setAttribute('aria-hidden', 'false');
    audio.play('radauf');
    events.emit('kraftrad:open', { segments: segments.map((s) => s.id), feathers: feathers ? feathers.slice() : null });
  }
  function close(silent) {
    if (!open) return;
    open = false;
    el.classList.remove('is-open');
    el.setAttribute('aria-hidden', 'true');
    events.emit('kraftrad:close', {});
  }

  // ---- Eingabe ----
  events.on('input:power:hold', () => { if (input.state.enabled && game.started && !game.paused) show(); });
  events.on('input:power:up', () => {
    if (!open) return;
    if (hotFeather !== null) selectFeather(FEATHERS[hotFeather].id);
    else if (hot !== null) select(hot);
    else close();
  });
  events.on('input:power:tap', () => {
    if (open) return;
    if (!game.started || game.paused || !input.state.enabled) return;
    if (active) events.emit('kraft:tap', { id: active });
    else events.emit('kraftrad:locked', { id: null, reason: 'keine' });
  });
  events.on('input:slot', ({ n }) => { if (!game.started || game.paused) return; if (open) { select(n - 1, 'taste'); } else { const s = segments[n - 1]; if (s && !s.locked) { active = s.id; events.emit('kraftrad:select', { segment: n, id: s.id, source: 'taste' }); events.emit('kraft:active', { id: s.id }); audio.play('click'); if (onSelect) onSelect(s); } else events.emit('kraftrad:locked', { id: s ? s.id : null, segment: n }); } });
  window.addEventListener('pointermove', (e) => { if (!open) return; const h = hotAt(e.clientX, e.clientY); setHot(h.seg, h.feather); }, { passive: true });
  window.addEventListener('touchmove', (e) => { if (!open || !e.touches.length) return; const t = e.touches[e.touches.length - 1]; const h = hotAt(t.clientX, t.clientY); setHot(h.seg, h.feather); }, { passive: true });
  window.addEventListener('keydown', (e) => {
    if (!open) return;
    const map = { ArrowUp: 0, ArrowRight: 1, ArrowDown: 2, ArrowLeft: 3, KeyW: 0, KeyD: 1, KeyS: 2, KeyA: 3 };
    if (map[e.code] !== undefined) { setHot(map[e.code], null); e.preventDefault(); }
    if (e.code === 'Escape') close();
  });
  events.on('pause', (p) => { if (p) close(); });

  const api = {
    el,
    get isOpen() { return open; },
    get active() { return active; },
    get activeFeather() { return activeFeather; },
    get segments() { return segments.map((s) => ({ ...s })); },
    FEATHERS,
    open: show, close,
    select, selectFeather,
    setSegments(list) { segments = list.map((s, i) => ({ ...DEFAULT_SEGMENTS[i], ...s })); if (active && segments.find((s) => s.id === active && s.locked)) active = null; if (!active) { const f = segments.find((s) => !s.locked); if (f) { active = f.id; events.emit('kraft:active', { id: active }); } } if (open) render(); },
    setLocked(id, locked) { const s = segments.find((x) => x.id === id); if (s) s.locked = !!locked; api.setSegments(segments); },
    setFeathers(list) { feathers = list && list.length ? list.slice() : null; if (open) render(); },
    setActiveFeather(id) { activeFeather = id || 'neutral'; if (open) render(); },
    setActive(id) { const s = segments.find((x) => x.id === id); if (s && !s.locked) { active = id; events.emit('kraft:active', { id }); return true; } return false; },
    onSelect(fn) { onSelect = fn; },
  };
  return api;
}

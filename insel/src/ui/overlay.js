// Overlay-System (WP21, DESIGN §19): jedes Fenster hat oben rechts ein X (Schließen) – immer, unabhängig von Wahl, Level, Puls.
//   const overlay = createOverlays({ root, events, game, audio, icon });
//   overlay.open({ id, title, icon?, kind: 'panel'|'sheet'|'full'|'dark', content: string|Element|fn(bodyEl, handle),
//                  pause = true, backdropClose = kind!=='full', onClose(reason), cls, subtitle, closeLabel })
//     → handle { id, el, body, close(reason), setTitle(text), opts, open }
//   overlay.close(id?) · closeAll() · top · count · isOpen(id) · get(id)
//   overlay.confirm({ title, text, yes, no, icon }) → Promise<boolean>
//   DOM: .ov[data-overlay=id] > .ov-card > .ov-head (.ov-title, .ov-close) + .ov-body.ov-scroll
//   Ereignis 'ui:overlay' { id, open }. Solange ein pausierendes Overlay offen ist, steht das Spiel (game.setPaused).
export function createOverlays({ root, events, game, audio, icon }) {
  const stack = [];
  let pausedByUs = false;
  const emit = (n, p) => { if (events) events.emit(n, p); };

  function syncPause() {
    const wants = stack.some((h) => h.opts.pause);
    if (wants && !pausedByUs && !game.paused) { pausedByUs = true; game.setPaused(true); }
    else if (!wants && pausedByUs) { pausedByUs = false; game.setPaused(false); }
  }
  function blurActive() { if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); }

  function open(opts) {
    const o = { kind: 'panel', pause: true, title: '', icon: null, subtitle: '', cls: '', closeLabel: 'Schließen', ...opts };
    if (o.backdropClose === undefined) o.backdropClose = o.kind !== 'full';
    if (o.id && api.isOpen(o.id)) close(o.id, 'replace');
    const id = o.id || 'ov-' + Math.random().toString(36).slice(2, 8);
    const el = document.createElement('div');
    el.className = `ov ov-${o.kind} hud-interactive${o.cls ? ' ' + o.cls : ''}`;
    el.dataset.overlay = id;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    if (o.title) el.setAttribute('aria-label', o.title);
    el.innerHTML = `
      <div class="ov-card">
        <header class="ov-head">
          ${o.icon ? `<span class="ov-icon">${icon(o.icon, { size: 28 })}</span>` : ''}
          <div class="ov-titles"><h2 class="ov-title">${esc(o.title)}</h2>${o.subtitle ? `<p class="ov-sub">${esc(o.subtitle)}</p>` : ''}</div>
          <button class="ov-close" type="button" aria-label="${esc(o.closeLabel)}" title="${esc(o.closeLabel)}">${icon('x', { size: 30 })}</button>
        </header>
        <div class="ov-body ov-scroll"></div>
      </div>`;
    const body = el.querySelector('.ov-body');
    const handle = {
      id, el, body, opts: o, open: true,
      close(reason = 'x') { close(id, reason); },
      setTitle(t) { el.querySelector('.ov-title').textContent = t; el.setAttribute('aria-label', t); },
    };
    if (typeof o.content === 'function') o.content(body, handle);
    else if (o.content instanceof Element) body.appendChild(o.content);
    else if (o.content) body.innerHTML = o.content;
    el.querySelector('.ov-close').addEventListener('click', (e) => { e.stopPropagation(); if (audio) audio.play('close'); close(id, 'x'); });
    if (o.backdropClose) el.addEventListener('pointerdown', (e) => { if (e.target === el) { if (audio) audio.play('close'); close(id, 'backdrop'); } });
    // Wischen im Inhalt darf nicht die Kamera drehen
    el.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
    root.appendChild(el);
    requestAnimationFrame(() => el.classList.add('is-in'));
    stack.push(handle);
    if (audio && o.sound !== false) audio.play('open');
    syncPause();
    if (game.input) game.input.releaseAll();
    emit('ui:overlay', { id, open: true, kind: o.kind });
    return handle;
  }
  function close(id, reason = 'x') {
    const i = id === undefined ? stack.length - 1 : stack.findIndex((h) => h.id === id);
    if (i < 0) return false;
    const h = stack.splice(i, 1)[0];
    h.open = false;
    blurActive();
    h.el.classList.remove('is-in');
    h.el.classList.add('is-out');
    setTimeout(() => h.el.remove(), 220);
    syncPause();
    if (typeof h.opts.onClose === 'function') { try { h.opts.onClose(reason, h); } catch (e) { console.error('[overlay]', e); } }
    emit('ui:overlay', { id: h.id, open: false, reason });
    return true;
  }

  const api = {
    open, close,
    closeAll(reason = 'all') { while (stack.length) close(stack[stack.length - 1].id, reason); },
    get top() { return stack.length ? stack[stack.length - 1] : null; },
    get count() { return stack.length; },
    get ids() { return stack.map((h) => h.id); },
    isOpen(id) { return stack.some((h) => h.id === id); },
    get(id) { return stack.find((h) => h.id === id) || null; },
    // Rückfrage mit zwei großen Knöpfen; X = nein
    confirm({ title = 'Sicher?', text = '', yes = 'Ja', no = 'Nein', icon: ic = 'frage', pause = true } = {}) {
      return new Promise((resolve) => {
        let answered = false;
        const h = open({
          id: 'confirm', title, icon: ic, kind: 'panel', pause, cls: 'ov-confirm',
          content: `<p class="ov-text">${esc(text)}</p><div class="ov-actions"><button class="btn btn-primary" data-yes>${icon('check', { size: 26 })}<span>${esc(yes)}</span></button><button class="btn" data-no>${icon('x', { size: 26 })}<span>${esc(no)}</span></button></div>`,
          onClose: () => { if (!answered) { answered = true; resolve(false); } },
        });
        h.body.querySelector('[data-yes]').addEventListener('click', () => { answered = true; if (audio) audio.play('tile'); h.close('yes'); resolve(true); });
        h.body.querySelector('[data-no]').addEventListener('click', () => { answered = true; if (audio) audio.play('close'); h.close('no'); resolve(false); });
      });
    },
  };
  return api;
}

export function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

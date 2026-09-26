// Tagebuch-Hülle (WP21, DESIGN §17): Vollbild-Overlay mit Seiten-Leiste (Karte, Aufträge, Skills-Pass, Koffer, Chronik,
// Echte Welt, Stil, Code, Einstellungen) und einer Seiten-Registry, in die spätere Module ihre Seiten eintragen.
//   const journal = createJournal({ overlay, game, events, audio, icon });
//   journal.registerPage({ id, label, icon, order, render(el, ctx), badge?(ctx) → string|number|null, hidden?(ctx) → bool })
//   journal.open(pageId?) · close() · toggle() · refresh() · current · pages · isOpen
//   ctx = { game, state, content, journal, icon, page }
//   DOM: .ov[data-overlay=tagebuch] .jn-rail [data-page=id] · .jn-page[data-page-id]
//   Ereignis ui:journal { page } · Taste Tab öffnet/schließt (bis WP19 die Eingabe übernimmt: Hook journal.onTab)
import { esc } from '../overlay.js';

export function createJournal({ overlay, game, events, audio, icon }) {
  const pages = new Map();
  let handle = null;
  let currentId = null;
  const emit = (n, p) => { if (events) events.emit(n, p); };

  function sorted() {
    const ctx = makeCtx(null);
    return [...pages.values()].filter((p) => !(typeof p.hidden === 'function' && p.hidden(ctx))).sort((a, b) => (a.order || 50) - (b.order || 50) || a.label.localeCompare(b.label));
  }
  function makeCtx(page) { return { game, state: game.state, content: game.content, journal: api, icon, page }; }

  function renderRail() {
    if (!handle) return;
    const rail = handle.el.querySelector('.jn-rail');
    const ctx = makeCtx(null);
    rail.innerHTML = sorted().map((p) => {
      const badge = typeof p.badge === 'function' ? p.badge(ctx) : null;
      return `<button type="button" class="jn-tab${p.id === currentId ? ' is-on' : ''}" data-page="${esc(p.id)}" role="tab" aria-selected="${p.id === currentId}">
        <span class="jn-tab-icon">${icon(p.icon || 'punkt', { size: 26 })}${badge ? `<span class="jn-badge">${esc(badge)}</span>` : ''}</span><span class="jn-tab-label">${esc(p.label)}</span></button>`;
    }).join('');
    rail.querySelectorAll('[data-page]').forEach((b) => b.addEventListener('click', () => { if (audio) audio.play('tile'); showPage(b.dataset.page); }));
  }
  function showPage(id) {
    if (!handle) return;
    const p = pages.get(id) || sorted()[0];
    if (!p) return;
    currentId = p.id;
    const pageEl = handle.el.querySelector('.jn-page');
    pageEl.dataset.pageId = p.id;
    pageEl.scrollTop = 0;
    pageEl.innerHTML = `<h3 class="jn-page-title">${icon(p.icon || 'punkt', { size: 26 })}<span>${esc(p.label)}</span></h3><div class="jn-page-body"></div>`;
    try { p.render(pageEl.querySelector('.jn-page-body'), makeCtx(p)); } catch (e) { console.error('[tagebuch]', p.id, e); pageEl.querySelector('.jn-page-body').innerHTML = '<p class="jn-note">Diese Seite lässt sich gerade nicht öffnen.</p>'; }
    renderRail();
    const on = handle.el.querySelector('.jn-tab.is-on');
    if (on && on.scrollIntoView) { try { on.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } catch (e) { /* egal */ } }
    emit('ui:journal', { page: p.id });
  }

  const api = {
    registerPage(page) {
      if (!page || !page.id || typeof page.render !== 'function') throw new Error('Tagebuch-Seite braucht id und render()');
      pages.set(page.id, { label: page.id, icon: 'punkt', order: 50, ...page });
      if (handle) { renderRail(); if (currentId === page.id) showPage(page.id); }
      return () => pages.delete(page.id);
    },
    unregisterPage(id) { pages.delete(id); if (handle) renderRail(); },
    get pages() { return sorted(); },
    get current() { return currentId; },
    get isOpen() { return !!handle && handle.open; },
    open(pageId) {
      if (handle && handle.open) { showPage(pageId || currentId || (sorted()[0] || {}).id); return handle; }
      handle = overlay.open({
        id: 'tagebuch', title: 'Tagebuch', icon: 'buch', kind: 'full', pause: true, cls: 'ov-journal',
        content: (body) => { body.classList.remove('ov-scroll'); body.innerHTML = '<nav class="jn-rail ov-scroll" role="tablist" aria-label="Tagebuch-Seiten"></nav><section class="jn-page ov-scroll" role="tabpanel"></section>'; },
        onClose: () => { handle = null; emit('ui:journal', { page: null, closed: true }); },
      });
      showPage(pageId || currentId || (sorted()[0] || {}).id);
      return handle;
    },
    close() { if (handle) handle.close('journal'); },
    toggle(pageId) { if (api.isOpen) api.close(); else api.open(pageId); },
    refresh() { if (handle) showPage(currentId); },
  };
  // Tab = Tagebuch (DESIGN §4). Entprellt, damit Taste und Ereignis 'input:journal' (WP19) nicht doppelt schalten.
  let lastToggle = 0;
  const toggleOnce = () => { const now = Date.now(); if (now - lastToggle < 200 || !game.started) return; lastToggle = now; if (audio) audio.play('click'); api.toggle(); };
  if (events) events.on('input:journal', toggleOnce);
  if (typeof window !== 'undefined') window.addEventListener('keydown', (e) => {
    if (e.code !== 'Tab' || (e.target.closest && e.target.closest('input, textarea'))) return;
    e.preventDefault();
    toggleOnce();
  });
  return api;
}

// Auswahl-Kacheln (WP21, DESIGN §17): Icon + ≤ 6 Wörter, Touch-Ziele ≥ 64 px, jede Kachel vorlesbar.
//   const choices = createChoices({ root, events, game, speech, audio, icon, lock });
//   choices.ask({ prompt?, items: [{ id, label, icon, tone?, color?, disabled?, sub? }],
//                 system: { rueckzug: true, hilfe: 'auto'|true|false }, lock = true, read = 'auto' })
//     → Promise<{ id, index, item, system: false|'rueckzug'|'hilfe' }>
//   Konventionen (tests/lib.mjs pickChoice): Kacheln sind [data-choice="index"]; Ereignis 'dialogue:choose' { index | text }.
//   Tasten 1–4 wählen, solange Kacheln offen sind. Rückzug ist immer da, Hilfe holen ab Upgrade ruhe.puls (Gesetz 8).
//   choices.open · choices.cancel() · Ereignis ui:choice { id, index, system }
import { esc } from './overlay.js';
import { countWords } from '../content/schema/text.js';

export const SYSTEM_CHOICES = {
  rueckzug: { id: 'rueckzug', label: 'Rückzug', icon: 'rueckzug', tone: 'system' },
  hilfe: { id: 'hilfe', label: 'Hilfe holen', icon: 'hilfe', tone: 'system' },
};

export function createChoices({ root, events, game, speech, audio, icon, lock }) {
  let current = null;   // { el, items, all, resolve, opts }
  const emit = (n, p) => { if (events) events.emit(n, p); };

  function hasHilfe() {
    const st = game.state;
    return !!(st && (st.get('upgrades', []).includes('ruhe.puls') || st.get('abilities', []).includes('ruhe')));
  }
  function textOf(t) { return t && typeof t === 'object' ? t.t : t; }

  function ask(opts = {}) {
    if (current) cancel('replaced');
    const o = { items: [], system: {}, lock: true, read: 'auto', ...opts };
    const sys = { rueckzug: true, hilfe: 'auto', ...(o.system || {}) };
    const items = (o.items || []).slice(0, 6).map((it, i) => ({ ...it, index: i, label: textOf(it.label) || textOf(it.say) || '', tts: it.tts || (it.label && it.label.tts) }));
    const systemItems = [];
    if (sys.rueckzug !== false) systemItems.push({ ...SYSTEM_CHOICES.rueckzug, ...(typeof sys.rueckzug === 'object' ? sys.rueckzug : {}) });
    if (sys.hilfe === true || (sys.hilfe === 'auto' && hasHilfe())) systemItems.push({ ...SYSTEM_CHOICES.hilfe, ...(typeof sys.hilfe === 'object' ? sys.hilfe : {}) });
    const all = items.concat(systemItems.map((s, k) => ({ ...s, index: items.length + k, system: s.id })));
    for (const it of all) { const n = countWords(it.label); if (n > 6) console.warn(`[choices] Kachel „${it.label}“ hat ${n} Wörter (max. 6)`); }

    const el = document.createElement('div');
    el.className = 'choices' + (items.length <= 2 ? ' is-few' : '');
    el.dataset.choices = '1';
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', o.prompt ? textOf(o.prompt) : 'Auswahl');
    const tile = (it) => `
      <button class="choice${it.system ? ' is-system' : ''}${it.disabled ? ' is-disabled' : ''}${it.tone ? ' tone-' + esc(it.tone) : ''}" type="button"
        data-choice="${it.index}" data-id="${esc(it.id || it.index)}"${it.disabled ? ' aria-disabled="true"' : ''}${it.color ? ` style="--tile:${esc(it.color)}"` : ''}>
        <span class="choice-icon">${icon(it.icon || (it.system ? 'punkt' : 'sprechblase'), { size: 26 })}</span>
        <span class="choice-label">${esc(it.label)}${it.sub ? `<small>${esc(it.sub)}</small>` : ''}</span>
        ${speech && speech.available && !it.system ? `<span class="choice-read" data-read role="button" aria-label="Vorlesen" title="Vorlesen">${icon('lautsprecher', { size: 22 })}</span>` : ''}
      </button>`;
    el.innerHTML = `
      ${o.prompt ? `<div class="choices-prompt">${esc(textOf(o.prompt))}</div>` : ''}
      <div class="choices-grid">${items.map(tile).join('')}</div>
      ${systemItems.length ? `<div class="choices-system">${all.filter((x) => x.system).map(tile).join('')}</div>` : ''}`;
    root.appendChild(el);
    root.classList.add('has-choices');
    requestAnimationFrame(() => el.classList.add('is-in'));
    if (o.lock && lock) lock.acquire('choices');
    if (audio) audio.play('open');
    el.querySelectorAll('[data-choice]').forEach((b) => {
      const it = all[+b.dataset.choice];
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        if (e.target.closest('[data-read]')) { if (speech) { if (audio) audio.play('click'); speech.speak(it.tts || it.label, { who: 'du', interrupt: true }); } return; }
        if (it.disabled) { if (audio) audio.play('error'); return; }
        pick(it);
      });
    });
    if (o.read === true || (o.read === 'auto' && speech && speech.settings.autoRead)) {
      const parts = [o.prompt ? textOf(o.prompt) : null, ...items.map((it, i) => `${i + 1}: ${it.tts || it.label}`)].filter(Boolean);
      if (speech) speech.speak(parts.join('. '), { who: 'du', interrupt: true, auto: o.read !== true });
    }
    emit('ui:choices', { count: items.length, system: systemItems.map((s) => s.id) });
    return new Promise((resolve) => { current = { el, items, all, resolve, opts: o }; });
  }
  function pick(it) {
    if (!current) return;
    const c = current;
    const btn = c.el.querySelector(`[data-choice="${it.index}"]`);
    if (btn) btn.classList.add('is-picked');
    if (audio) audio.play('tile');
    if (speech && speech.speaking) speech.cancel();
    finish(c, { id: it.id === undefined ? String(it.index) : it.id, index: it.index, item: it, system: it.system || false });
  }
  function finish(c, result) {
    current = null;
    root.classList.remove('has-choices');
    c.el.classList.remove('is-in'); c.el.classList.add('is-out');
    setTimeout(() => c.el.remove(), 220);
    if (c.opts.lock && lock) lock.release('choices');
    if (game.interactions && game.interactions.lock) game.interactions.lock(0.45);
    emit('ui:choice', result);
    c.resolve(result);
  }
  function cancel(reason = 'cancel') {
    if (!current) return false;
    finish(current, { id: null, index: -1, item: null, system: false, cancelled: reason });
    return true;
  }

  // Headless/Tests: 'dialogue:choose' { index | text | id }
  if (events) events.on('dialogue:choose', (e) => {
    if (!current || !e) return;
    let it = null;
    if (typeof e.index === 'number') it = current.all[e.index];
    else if (e.id !== undefined) it = current.all.find((x) => x.id === e.id || x.system === e.id);
    else if (e.text) it = current.all.find((x) => x.label.startsWith(e.text));
    if (it && !it.disabled) pick(it);
  });
  // Tasten 1–4 (nur solange Kacheln offen sind)
  if (typeof window !== 'undefined') window.addEventListener('keydown', (ev) => {
    if (!current || ev.target.closest && ev.target.closest('input, textarea')) return;
    const m = ev.code.match(/^(?:Digit|Numpad)([1-6])$/);
    if (!m) return;
    const it = current.items[+m[1] - 1];
    if (it && !it.disabled) { ev.preventDefault(); ev.stopPropagation(); pick(it); }
  }, true);

  return {
    ask, cancel,
    get open() { return !!current; },
    get current() { return current ? { items: current.items, all: current.all, el: current.el } : null; },
    SYSTEM: SYSTEM_CHOICES,
  };
}

// Codes-Plugin (WP30, DESIGN §10): Code-Wörter der Einheiten (kurs-j1.js: WELLE → j1-e11), Modul-, Demo-, Lehrer- und
// Inselwetter-Codes, Ersatzcodes WORT-WORT-ZZ, Kurzfassung für verpasste Einheiten, Tagebuch-Seite „Code“ mit
// Wort-Vorschlägen aus der 256er-Wortliste, Zahlenrad und Vorlesen, Lehrer-Einstellungen (teacher.js).
//   game.codes = game.plugins.codes → {
//     redeem(input, { via }) → { ok, kind, id, unit, alt, already, opened[], kurz[], veiled[], message } | { ok:false, error, suggestions[] }
//     lookup(input) (ohne Wirkung) · suggest(input, max) · list() → [{ kind, id, code, alt, label, status, redeemed, teacherOnly, linesVeils }]
//     redeemed() · isRedeemed(kind, id) · hashCode(kind, id) · words · isTeacher() · endTeacher()
//     teacher = { device, linesVeils, colors, names, salt } (systems/codes/teacher.js) · model }
//   Spielstand: units.<id> ('offen' | 'kurz' – die Quest-Engine wendet Kurzfassungen über state.on('units') an),
//     codesUsed[] ('unit:j1-e11', 'module:j1-m3', 'demo:demo', 'teacher:teacher', 'weather:ruhe'), quests.<id>.linesVeils,
//     flags.demo · Laufzeit: session.teacher, session.linesVeils · Gerät: localStorage lumo.teacher
//   Ereignisse: code:redeem {input, kind, id, unit, already, opened, kurz, veiled, via} · code:reject {input, via}
//     · unit:unlock {id, via:'code'} je geöffneter Einheit ({module:true} / {demo:true} wie bisher, {kurz:true, linesVeils:true})
//     · teacher:open {via} · teacher:close · weather:set {id} · linesVeils:change · emotion:colors · names:change
//   Debug: LUMO.debug.redeemCode(word) (Debug-Plugin delegiert hierher) · codes() · teacher(on) · linesVeils(on)
//   Szenario: 'code welle' 'expect state.units.j1-e11 == aktiv' 'expect state.units.j1-e10 == kurz' 'call teacher true'
import { resolveCode, allCodes, suggest, planUnlock, spellOut, composeCode, hashCode, normCode, FRIENDLY_ERROR, WEATHER_LABEL } from './model.js';
import { createTeacherSettings } from './teacher.js';
import { esc } from '../../ui/overlay.js';

export const CODE_CSS = `
.code-form { align-items: stretch; }
.code-dial { display: flex; gap: 8px; align-items: stretch; }
.code-dial[hidden] { display: none; }
.dial { display: flex; flex-direction: column; align-items: center; width: 64px; border-radius: 18px; background: rgba(0, 0, 0, 0.3); border: 2px solid rgba(255, 255, 255, 0.3); overflow: hidden; }
.dial button { width: 64px; height: 64px; border: 0; border-radius: 0; color: #fff; background: rgba(255, 255, 255, 0.08); display: grid; place-items: center; }
.dial button:active { background: var(--c-gold); color: var(--ink); }
.dial button.is-down .ico { transform: rotate(180deg); }
.dial output { display: block; min-height: 40px; line-height: 40px; font: 900 calc(28px * var(--txt-scale)) / 40px var(--font); }
.code-sugg { display: flex; flex-wrap: wrap; gap: 8px; min-height: 8px; margin-top: 10px; }
.code-sugg small { width: 100%; font-size: calc(14px * var(--txt-scale)); font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.7; }
.code-chip { min-height: 64px; min-width: 64px; padding: 0 18px; border-radius: 16px; font: 900 calc(18px * var(--txt-scale)) / 1 var(--font); letter-spacing: 0.12em; color: var(--ink); background: var(--c-mint); border: 0; }
.code-chip:active { transform: scale(0.96); }
.code-tools { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-top: 14px; }
.code-tools .jn-note { margin: 0; }
.code-result { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.code-result span { padding: 6px 12px; border-radius: 14px; background: rgba(255, 255, 255, 0.1); font-size: calc(15px * var(--txt-scale)); font-weight: 800; }
.code-result span.is-kurz { background: rgba(45, 226, 201, 0.18); }
`;

export default {
  id: 'codes', order: 64, deps: ['ui'],
  install(game) {
    const { events, state, content, ui, audio } = game;
    const speech = game.speech || null;
    const emit = (n, p) => events.emit(n, p);
    const wl = content.get('wordlist', 'wordlist');
    const words = wl && Array.isArray(wl.words) && wl.words.length >= 256 ? wl.words : null;
    const T = createTeacherSettings({ game });
    const questDefs = (id) => content.get('quests', id);
    const opts = () => ({ words, salt: T.salt.get(), questDefs });
    if (typeof document !== 'undefined') { const st = document.createElement('style'); st.dataset.codes = '1'; st.textContent = CODE_CSS; document.head.appendChild(st); }

    // ---- Einlösen ----
    function redeem(input, { via = 'tagebuch' } = {}) {
      const found = resolveCode(input, content, opts());
      if (!found) {
        emit('code:reject', { input: String(input || ''), via });
        return { ok: false, error: FRIENDLY_ERROR, suggestions: words ? suggest(input, words, { max: 3 }) : [] };
      }
      const r = { ok: true, kind: found.kind, id: found.id, unit: found.unit, alt: found.alt, already: false, opened: [], kurz: [], veiled: [], message: '' };
      if (found.kind === 'unit' || found.kind === 'module' || found.kind === 'demo') {
        const plan = planUnlock(found, { units: content.units, states: state.get('units', {}) || {}, linesVeils: T.linesVeils.active, questDefs });
        for (const id of plan.kurz) state.set('units.' + id, 'kurz');            // Quest-Engine: applyKurz über state.on('units')
        for (const id of plan.veiled) { state.set('units.' + id, 'kurz'); state.merge('quests.' + id, { linesVeils: true }); emit('unit:unlock', { id, kurz: true, linesVeils: true, via: 'code' }); }
        for (const id of plan.open) {
          if ((state.get('quests.' + id) || {}).linesVeils) state.merge('quests.' + id, { linesVeils: false });
          state.set('units.' + id, 'offen');
          emit('unit:unlock', { id, via: 'code' });
        }
        if (found.kind === 'module') emit('unit:unlock', { id: found.id, module: true, via: 'code' });
        if (found.kind === 'demo') { state.set('flags.demo', true); emit('unit:unlock', { id: '*', demo: true, via: 'code' }); }
        Object.assign(r, { already: plan.already, opened: plan.open, kurz: plan.kurz, veiled: plan.veiled });
        if (found.kind === 'unit') r.message = plan.already ? `Schon offen: ${found.unit.quest}.` : plan.veiled.length ? `Kurzfassung: ${found.unit.quest}.` : `Geöffnet: ${found.unit.quest}.`;
        else if (found.kind === 'module') { const m = (content.get('units', 'units').modules || []).find((x) => x.id === found.id); r.message = `Modul ${m ? m.nr : ''} als Kurzfassung geöffnet.`; }
        else r.message = 'Demo: alles als Kurzfassung geöffnet.';
      } else if (found.kind === 'teacher') {
        state.set('session.teacher', true);
        r.message = 'Lehrer-Panel geöffnet.';
        emit('teacher:open', { via });
      } else if (found.kind === 'weather') {
        r.message = `${WEATHER_LABEL[found.id] || 'Inselwetter'} für 20 Minuten.`;
        emit('weather:set', { id: found.id });
      }
      const key = found.kind + ':' + found.id;
      if (!(state.get('codesUsed', []) || []).includes(key)) state.push('codesUsed', key);
      emit('code:redeem', { input: String(input || ''), ...r, via });
      return r;
    }

    function list() {
      const us = state.get('units', {}) || {};
      const used = state.get('codesUsed', []) || [];
      return allCodes(content, opts()).map((c) => ({ ...c, status: c.kind === 'unit' ? (us[c.id] || 'gesperrt') : null, redeemed: used.includes(c.kind + ':' + c.id) }));
    }

    const api = {
      redeem, list, model: { resolveCode, allCodes, suggest, planUnlock, spellOut, composeCode, hashCode, normCode },
      lookup: (input) => resolveCode(input, content, opts()),
      suggest: (input, max = 4) => (words ? suggest(input, words, { max }) : []),
      redeemed: () => (state.get('codesUsed', []) || []).slice(),
      isRedeemed: (kind, id) => (state.get('codesUsed', []) || []).includes(kind + ':' + id),
      hashCode: (kind, id) => (words ? hashCode(kind, id, { salt: T.salt.get(), words }) : null),
      get words() { return words ? words.slice() : []; },
      isTeacher: () => !!state.get('session.teacher'),
      endTeacher() { state.set('session.teacher', false); emit('teacher:close', {}); },
      teacher: T,
      FRIENDLY_ERROR,
    };
    game.codes = api;
    T.apply();

    // ---- Tagebuch-Seite „Code“ (ersetzt die Vorstufe aus ui/journal/pages.js) ----
    ui.journal.registerPage({
      id: 'code', label: 'Code', icon: 'schluessel', order: 80,
      render(el) {
        const used = state.get('codesUsed', []) || [];
        let dialOn = false;
        const digits = { tens: 0, ones: 0 };
        el.innerHTML = `
          <p class="jn-lead">Der Code kommt am Ende der Stunde.</p>
          <form class="code-form" autocomplete="off">
            <input class="code-input" type="text" inputmode="latin" autocapitalize="characters" autocorrect="off" spellcheck="false" maxlength="32" placeholder="WORT" aria-label="Code-Wort">
            <div class="code-dial" data-dial hidden aria-label="Zahlenrad">
              ${['tens', 'ones'].map((d) => `<div class="dial" data-digit="${d}"><button type="button" data-up aria-label="${d === 'tens' ? 'Zehner' : 'Einer'} hoch">${ui.icon('pfeilhoch', { size: 22 })}</button><output aria-live="polite">0</output><button type="button" class="is-down" data-down aria-label="${d === 'tens' ? 'Zehner' : 'Einer'} runter">${ui.icon('pfeilhoch', { size: 22 })}</button></div>`).join('')}
            </div>
            <button class="btn" type="button" data-dial-toggle aria-pressed="false">${ui.icon('plus', { size: 22 })}<span>Zahl</span></button>
            <button class="btn btn-primary" type="submit">${ui.icon('schluessel', { size: 24 })}<span>Einlösen</span></button>
          </form>
          <div class="code-sugg" data-sugg aria-live="polite"></div>
          <p class="code-msg" role="status" aria-live="polite"></p>
          <div class="code-result" data-result></div>
          <div class="code-tools">
            <button class="btn btn-small" type="button" data-read>${ui.icon('lautsprecher', { size: 20 })}<span>Vorlesen</span></button>
            <span class="jn-note">${used.length ? `${used.length} Code${used.length === 1 ? '' : 's'} auf diesem Gerät eingelöst.` : 'Groß oder klein – egal.'}</span>
          </div>`;
        const form = el.querySelector('form'), input = el.querySelector('input'), msg = el.querySelector('.code-msg');
        const sugg = el.querySelector('[data-sugg]'), result = el.querySelector('[data-result]'), dial = el.querySelector('[data-dial]'), toggle = el.querySelector('[data-dial-toggle]');
        const number = () => (dialOn ? digits.tens * 10 + digits.ones : null);
        const composed = () => composeCode(input.value, number());
        const renderSugg = (items, label) => {
          sugg.innerHTML = items.length ? `${label ? `<small>${esc(label)}</small>` : ''}${items.map((w) => `<button type="button" class="code-chip" data-word="${esc(w)}">${esc(w)}</button>`).join('')}` : '';
          sugg.querySelectorAll('[data-word]').forEach((b) => b.addEventListener('click', () => { if (audio) audio.play('tile'); input.value = b.dataset.word; sugg.innerHTML = ''; try { input.focus({ preventScroll: true }); } catch (e) { /* egal */ } }));
        };
        input.addEventListener('input', () => { msg.textContent = ''; msg.className = 'code-msg'; result.innerHTML = ''; renderSugg(api.suggest(input.value, 4)); });
        toggle.addEventListener('click', () => { dialOn = !dialOn; dial.hidden = !dialOn; toggle.setAttribute('aria-pressed', String(dialOn)); toggle.classList.toggle('is-on', dialOn); if (audio) audio.play('tile'); });
        dial.querySelectorAll('.dial').forEach((d) => {
          const key = d.dataset.digit, out = d.querySelector('output');
          const step = (n) => { digits[key] = (digits[key] + n + 10) % 10; out.textContent = String(digits[key]); if (audio) audio.play('click'); };
          d.querySelector('[data-up]').addEventListener('click', () => step(1));
          d.querySelector('[data-down]').addEventListener('click', () => step(-1));
        });
        el.querySelector('[data-read]').addEventListener('click', () => {
          const c = composed();
          if (!c) return;
          if (speech) speech.speak(spellOut(c), { who: 'erzaehler', interrupt: true });
          if (audio) audio.play('click');
        });
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const c = composed();
          if (!c.replace(/[-\s]/g, '')) return;
          const r = redeem(c, { via: 'tagebuch' });
          msg.className = 'code-msg ' + (r.ok ? 'is-ok' : 'is-bad');
          if (r.ok) {
            msg.textContent = r.message || 'Code angenommen.';
            const chips = [];
            if (r.veiled && r.veiled.length) chips.push(`<span class="is-kurz">Kurzfassung ohne Szene</span>`);
            if (r.kurz && r.kurz.length) chips.push(`<span class="is-kurz">${r.kurz.length} frühere Einheit${r.kurz.length === 1 ? '' : 'en'} als Kurzfassung</span>`);
            if (r.alt) chips.push('<span>Ersatzcode</span>');
            result.innerHTML = chips.join('');
            sugg.innerHTML = '';
            if (audio) audio.play('pickup');
            if (speech) speech.speak(msg.textContent, { who: 'erzaehler', interrupt: true, auto: true });
            input.value = '';
            if (r.kind === 'teacher') return;   // das Panel öffnet sich über teacher:open
            setTimeout(() => { if (ui.journal.isOpen && ui.journal.current === 'code') ui.journal.open(r.kind === 'weather' ? 'code' : 'auftraege'); }, 900);
          } else {
            msg.textContent = r.error || FRIENDLY_ERROR;
            result.innerHTML = '';
            renderSugg(r.suggestions || [], r.suggestions && r.suggestions.length ? 'Meintest du …?' : '');
            if (audio) audio.play('error');
            if (speech) speech.speak(msg.textContent, { who: 'erzaehler', interrupt: true, auto: true });
          }
        });
        setTimeout(() => { try { input.focus({ preventScroll: true }); } catch (e) { /* egal */ } }, 250);
      },
    });

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.codes = () => list().map((c) => ({ kind: c.kind, id: c.id, code: c.code, alt: c.alt, status: c.status, redeemed: c.redeemed }));
    D.teacher = (on = true) => { state.set('session.teacher', !!on); if (on) emit('teacher:open', { via: 'debug' }); else emit('teacher:close', {}); return !!on; };
    D.linesVeils = (on) => (on === undefined ? T.linesVeils.active : T.linesVeils.set(!!on));
    return api;
  },
};

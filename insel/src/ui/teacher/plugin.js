// Lehrer-Panel (WP30, DESIGN §10): nur nach dem Lehrer-Code erreichbar (state.session.teacher, Laufzeit). Seiten:
// Codes (alle 39 Einheiten inkl. j08, Modul-, Demo-, Wetter- und Lehrer-Code, Ersatzcodes, Freischalten auf diesem Gerät),
// Inselwetter (Ruhe, Fest, Frühling), Lines & Veils, Namen (Figuren, Glimm, Vögel), Farben des Gefühlsrads, eingelöste Codes
// je Spielstand (nur Spielnamen und Codes, keine Personendaten).
//   game.plugins.teacher → { open(page?) → Handle|false, close(), isOpen, pages, refresh() }   Overlay .ov[data-overlay=lehrer]
//   Hört auf teacher:open (Lehrer-Code) und teacher:close. Tagebuch-Seite 'lehrer' erscheint nur im Lehrer-Modus.
//   Ereignisse: teacher:panel {open, page}
import { esc } from '../overlay.js';
import { EMOTIONS } from '../../content/schema/consts.js';
import { EMOTION_ICON } from '../icons.js';
import { KIND_LABEL, WEATHER_LABEL } from '../../systems/codes/model.js';

const MODULE_COLOR = { 'j1-m0': '#ffb347', 'j1-m1': '#2de2c9', 'j1-m2': '#4cd964', 'j1-m3': '#8fa3ff', 'j1-m4': '#b06bff', 'j1-m5': '#ffd166', 'j1-m6': '#ff6b3d', 'j1-m7': '#ff8ccf', 'j1-m8': '#8fd18b', 'j1-m9': '#fff3a0', joker: '#ffffff' };
const STATE_LABEL = { gesperrt: 'Gesperrt', kurz: 'Kurzfassung', offen: 'Offen', aktiv: 'Läuft', fertig: 'Geschafft' };
const WEATHER_ICON = { ruhe: 'ruhe', fest: 'feuer', fruehling: 'bonsai' };
const WEATHER_TEXT = { ruhe: 'Goldener Abend, gebremste Stürme, halber Puls. Alle tippen ihn zugleich.', fest: 'Laternen an, Feuerwerk über der Bucht.', fruehling: 'Frühlingspalette, alles blüht.' };

export const TEACHER_CSS = `
.ov-teacher .ov-card { box-shadow: 0 0 0 1px rgba(255, 209, 102, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 10px 30px rgba(6, 2, 20, 0.35), 0 40px 90px rgba(6, 2, 20, 0.45); }
.tp-table { width: 100%; border-collapse: collapse; font-size: calc(16px * var(--txt-scale)); }
.tp-table th, .tp-table td { padding: 8px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.12); text-align: left; vertical-align: middle; }
.tp-table thead th { font-size: calc(12px * var(--txt-scale)); letter-spacing: 0.12em; text-transform: uppercase; color: var(--c-gold); }
.tp-table tr.tp-mod th { padding-top: 18px; font-size: calc(13px * var(--txt-scale)); letter-spacing: 0.12em; text-transform: uppercase; color: var(--mod, var(--c-gold)); border-bottom: 2px solid var(--mod, var(--c-gold)); }
.tp-code { font: 900 calc(20px * var(--txt-scale)) / 1.1 var(--font); letter-spacing: 0.14em; white-space: nowrap; }
.tp-code small { display: block; margin-top: 4px; font-size: calc(12px * var(--txt-scale)); letter-spacing: 0.06em; font-weight: 700; opacity: 0.65; }
.tp-quest b { display: block; font-weight: 900; }
.tp-quest small { display: block; font-size: calc(13px * var(--txt-scale)); font-weight: 700; opacity: 0.7; }
.tp-state { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: calc(13px * var(--txt-scale)); font-weight: 900; background: rgba(255, 255, 255, 0.1); white-space: nowrap; }
.tp-state.is-fertig { background: #5ad24f; color: var(--ink); } .tp-state.is-aktiv, .tp-state.is-offen { background: var(--c-gold); color: var(--ink); } .tp-state.is-kurz { background: rgba(45, 226, 201, 0.35); }
.tp-flag { display: inline-block; margin-left: 6px; padding: 2px 8px; border-radius: 10px; font-size: calc(11px * var(--txt-scale)); font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(255, 79, 139, 0.35); }
.tp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 12px; }
.tp-card { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; padding: 14px 16px; border-radius: 18px; background: rgba(255, 255, 255, 0.07); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1); border-left: 4px solid var(--card, var(--c-gold)); }
.tp-card-icon { flex: none; width: 52px; height: 52px; border-radius: 16px; display: grid; place-items: center; background: var(--card, var(--c-gold)); color: var(--ink); }
.tp-card > div { flex: 1 1 160px; min-width: 0; }
.tp-card b { display: block; font-size: calc(18px * var(--txt-scale)); } .tp-card small { display: block; font-size: calc(14px * var(--txt-scale)); font-weight: 700; opacity: 0.75; }
.tp-card .btn { flex: none; margin-left: auto; }
.tp-name { display: grid; grid-template-columns: 44px 1fr 1fr auto; gap: 10px; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
.tp-name .tp-ico { width: 44px; height: 44px; border-radius: 14px; display: grid; place-items: center; background: var(--who, var(--c-gold)); color: var(--ink); }
.tp-name input { min-height: 48px; padding: 0 14px; border-radius: 14px; font: 800 calc(18px * var(--txt-scale)) / 1 var(--font); color: #fff; background: rgba(0, 0, 0, 0.28); border: 0; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.24); outline: none; -webkit-user-select: text; user-select: text; min-width: 0; }
.tp-name input:focus { box-shadow: inset 0 0 0 2px var(--c-gold); }
.tp-name small { font-size: calc(13px * var(--txt-scale)); font-weight: 700; opacity: 0.7; }
.tp-color { display: grid; grid-template-columns: 52px 1fr auto; gap: 12px; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
.tp-swatch { width: 52px; height: 52px; border-radius: 16px; display: grid; place-items: center; background: var(--emo); color: var(--ink); border: 2px solid rgba(255, 255, 255, 0.35); }
.tp-color input[type=color] { width: 72px; height: 52px; padding: 0; border: 1px solid rgba(255, 255, 255, 0.24); border-radius: 14px; background: transparent; }
.tp-slot { padding: 12px 16px; border-radius: 18px; background: rgba(255, 255, 255, 0.06); box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1); margin-bottom: 10px; }
.tp-slot.is-current { box-shadow: inset 0 0 0 1.5px var(--c-gold); }
.tp-slot b { font-size: calc(18px * var(--txt-scale)); } .tp-slot small { font-size: calc(13px * var(--txt-scale)); font-weight: 700; opacity: 0.7; }
.tp-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.tp-chips span { padding: 4px 10px; border-radius: 12px; font-size: calc(14px * var(--txt-scale)); font-weight: 800; letter-spacing: 0.06em; background: rgba(255, 255, 255, 0.12); }
.tp-foot { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; margin-top: 26px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.12); }
@media (max-width: 720px) { .tp-name { grid-template-columns: 44px 1fr; } .tp-name input { grid-column: 1 / -1; } .tp-table .tp-hide { display: none; } }
`;

export default {
  id: 'teacher', order: 66, deps: ['ui', 'codes'],
  install(game) {
    const { events, state, content, ui, audio } = game;
    const codes = game.codes;
    const T = codes.teacher;
    const icon = ui.icon;
    const emit = (n, p) => events.emit(n, p);
    if (typeof document !== 'undefined') { const st = document.createElement('style'); st.dataset.teacher = '1'; st.textContent = TEACHER_CSS; document.head.appendChild(st); }
    const isTeacher = () => !!state.get('session.teacher');
    let handle = null;
    let current = 'codes';

    // ---- Seiten ----
    const PAGES = [
      { id: 'codes', label: 'Codes', icon: 'schluessel' },
      { id: 'wetter', label: 'Inselwetter', icon: 'wetter' },
      { id: 'lines', label: 'Lines & Veils', icon: 'stopp' },
      { id: 'namen', label: 'Namen', icon: 'text' },
      { id: 'farben', label: 'Farben', icon: 'stil' },
      { id: 'eingeloest', label: 'Eingelöst', icon: 'haken' },
    ];
    const render = {
      codes(el) {
        const showAlt = !!T.device.get('showAlt', false);
        const list = codes.list();
        const units = list.filter((c) => c.kind === 'unit');
        const mods = content.get('units', 'units').modules || [];
        const modOf = (u) => mods.find((m) => m.id === u.unit.module) || { id: 'joker', nr: 'J', title: 'Joker' };
        const rows = [];
        let lastMod = null;
        for (const c of units) {
          const m = modOf(c);
          if (m.id !== lastMod) { lastMod = m.id; rows.push(`<tr class="tp-mod" style="--mod:${MODULE_COLOR[m.id] || '#fff'}"><th colspan="5">${esc(m.id === 'joker' ? 'Joker' : `Modul ${m.nr} · ${m.title}`)}</th></tr>`); }
          const u = c.unit;
          rows.push(`<tr data-unit="${esc(u.id)}">
            <td>${esc(u.joker ? 'J' + u.nr : String(u.nr))}</td>
            <td class="tp-code">${esc(c.code)}${showAlt && c.alt ? `<small>${esc(c.alt)}</small>` : ''}</td>
            <td class="tp-quest"><b>${esc(u.quest)}${u.teacherOnly ? '<span class="tp-flag">nur hier</span>' : ''}${c.linesVeils ? '<span class="tp-flag">L&amp;V</span>' : ''}</b><small class="tp-hide">${esc(u.title)}${u.after ? ` · nach ${esc(u.after.replace('j1-e', 'Einheit '))}` : ''}</small></td>
            <td><span class="tp-state is-${esc(c.status)}">${esc(STATE_LABEL[c.status] || c.status)}</span></td>
            <td>${['gesperrt', 'kurz'].includes(c.status) ? `<button class="btn btn-small" type="button" data-redeem="${esc(c.code)}">${icon('offen', { size: 18 })}<span>Öffnen</span></button>` : ''}</td>
          </tr>`);
        }
        const special = list.filter((c) => c.kind !== 'unit');
        el.innerHTML = `
          <p class="jn-lead">Der Code am Ende der Stunde öffnet genau diese Quest. Groß oder klein, egal.</p>
          <div class="set-block">
            <button type="button" class="row row-toggle${showAlt ? ' is-on' : ''}" data-show-alt role="switch" aria-checked="${showAlt}"><span class="row-icon">${icon('lupe', { size: 26 })}</span><span class="row-text"><b>Ersatzcodes zeigen</b><small>WORT-WORT-ZAHL, falls ein Code-Wort die Runde macht. Gleich im Lehrerheft.</small></span><span class="switch" aria-hidden="true"><i></i></span></button>
          </div>
          <table class="tp-table"><thead><tr><th>Nr</th><th>Code</th><th>Quest</th><th>Hier</th><th></th></tr></thead><tbody>${rows.join('')}</tbody></table>
          <h4 class="jn-sub">Sonder-Codes</h4>
          <table class="tp-table"><tbody>${special.map((c) => `<tr><td class="tp-code">${esc(c.code)}${showAlt && c.alt ? `<small>${esc(c.alt)}</small>` : ''}</td><td class="tp-quest"><b>${esc(c.label)}</b><small>${esc(KIND_LABEL[c.kind] || c.kind)}${c.kind === 'module' ? ' · alle Einheiten bis hier als Kurzfassung (für Neue)' : ''}</small></td><td>${c.redeemed ? '<span class="tp-state is-fertig">eingelöst</span>' : ''}</td></tr>`).join('')}</tbody></table>
          <p class="jn-note">Kurzfassung: Jeder spätere Code setzt frühere Einheiten ohne Code auf Kurzfassung (Fähigkeit, Splitter, Farbe, 3-Minuten-Szene). Die volle Quest bleibt mit ihrem Code erhalten.</p>`;
        el.querySelector('[data-show-alt]').addEventListener('click', () => { T.device.set('showAlt', !showAlt); if (audio) audio.play('tile'); refresh(); });
        el.querySelectorAll('[data-redeem]').forEach((b) => b.addEventListener('click', () => { if (audio) audio.play('tile'); const r = codes.redeem(b.dataset.redeem, { via: 'lehrer' }); if (ui.toast) ui.toast(r.ok ? r.message : r.error); refresh(); }));
      },
      wetter(el) {
        const S = game.plugins.session;
        const cur = S && S.weather ? S.weather.current : (state.get('session.weather') || {}).id || null;
        const rem = S && S.weather ? Math.round(S.weather.remaining / 60) : 0;
        const wcodes = content.codes.weather || {};
        el.innerHTML = `
          <p class="jn-lead">${cur ? `${esc(WEATHER_LABEL[cur] || cur)} läuft noch etwa ${rem} Minuten.` : 'Gerade kein Inselwetter.'}</p>
          <div class="tp-grid">${Object.keys(WEATHER_LABEL).map((id) => `<article class="tp-card" style="--card:${id === 'ruhe' ? '#ffd166' : id === 'fest' ? '#ff8c42' : '#8fd18b'}"><span class="tp-card-icon">${icon(WEATHER_ICON[id], { size: 30 })}</span><div><b>${esc(WEATHER_LABEL[id])}</b><small>${esc(WEATHER_TEXT[id])}</small><small>Code: ${esc(wcodes[id] || '–')}</small></div><button class="btn btn-small" type="button" data-weather="${id}">${icon('play', { size: 18 })}<span>Start</span></button></article>`).join('')}</div>
          <div class="ov-actions"><button class="btn" type="button" data-weather-clear${cur ? '' : ' disabled'}>${icon('x', { size: 22 })}<span>Wetter beenden</span></button></div>
          <p class="jn-note">Alle tippen denselben Code, damit niemand herausgehoben wird. Das Wetter läuft 20 Minuten Spielzeit.</p>`;
        el.querySelectorAll('[data-weather]').forEach((b) => b.addEventListener('click', () => { if (audio) audio.play('tile'); const code = wcodes[b.dataset.weather]; if (code) codes.redeem(code, { via: 'lehrer' }); else emit('weather:set', { id: b.dataset.weather }); setTimeout(refresh, 50); }));
        el.querySelector('[data-weather-clear]').addEventListener('click', () => { if (audio) audio.play('close'); if (S && S.weather) S.weather.clear(); refresh(); });
      },
      lines(el) {
        const on = T.linesVeils.active;
        const units = T.linesVeils.units();
        el.innerHTML = `
          <p class="jn-lead">Bei einem aktuellen Vorfall in der Gruppe: heikle Einheiten nur als Kurzfassung, ohne Szene.</p>
          <div class="set-block">
            <button type="button" class="row row-toggle${on ? ' is-on' : ''}" data-lv role="switch" aria-checked="${on}"><span class="row-icon">${icon('stopp', { size: 26 })}</span><span class="row-text"><b>Lines &amp; Veils ${on ? 'an' : 'aus'}</b><small>Wirkt auf diesem Gerät für alle Spielstände. Fähigkeit, Splitter und Farbe kommen trotzdem.</small></span><span class="switch" aria-hidden="true"><i></i></span></button>
          </div>
          <h4 class="jn-sub">Betroffene Einheiten</h4>
          <table class="tp-table"><tbody>${units.map((x) => `<tr><td>${esc(x.unit.joker ? 'J' + x.unit.nr : String(x.unit.nr))}</td><td class="tp-quest"><b>${esc(x.unit.quest)}</b><small>${esc(x.unit.title)}</small></td><td><span class="tp-state is-${esc(x.status)}">${esc(STATE_LABEL[x.status] || x.status)}${x.veiled ? ' · ohne Szene' : ''}</span></td></tr>`).join('')}</tbody></table>
          <p class="jn-note">Markierte Szenen anderer Quests folgen derselben Regel (QuestDef linesAndVeils).</p>`;
        el.querySelector('[data-lv]').addEventListener('click', () => { if (audio) audio.play('tile'); const r = T.linesVeils.set(!on); if (ui.toast) ui.toast(!on ? `Lines & Veils an${r.toKurz.length ? ` · ${r.toKurz.length} Einheit(en) auf Kurzfassung` : ''}` : 'Lines & Veils aus'); refresh(); });
      },
      namen(el) {
        const list = T.names.list();
        const row = (n) => `<div class="tp-name" data-name="${esc(n.id)}" style="--who:${esc(n.color || (n.kind === 'vogel' ? '#8fa3ff' : '#2de2c9'))}"><span class="tp-ico">${icon(n.kind === 'vogel' ? EMOTION_ICON[n.emotion] || 'stern' : n.kind === 'begleiter' ? 'glimm' : (n.icon && ui.icons.includes(n.icon) ? n.icon : 'punkt'), { size: 24 })}</span><span><b>${esc(n.name)}</b><br><small>${esc(n.kind === 'figur' ? 'Figur' : n.kind === 'vogel' ? 'Vogel' : 'Begleiter')}${n.custom ? ' · heißt jetzt ' + esc(n.custom) : ''}</small></span><input type="text" maxlength="${T.names.MAX}" placeholder="${esc(n.name)}" value="${esc(n.custom || '')}" aria-label="Neuer Name für ${esc(n.name)}" autocomplete="off" autocorrect="off" spellcheck="false"><button class="btn btn-small" type="button" data-name-save>${icon('check', { size: 18 })}<span>Übernehmen</span></button></div>`;
        el.innerHTML = `
          <p class="jn-lead">Kein Name aus der Gruppe. Neue Namen gelten auf diesem Gerät, in Schildern, Blasen und am Feuer.</p>
          <h4 class="jn-sub">Figuren</h4>${list.filter((n) => n.kind === 'figur').map(row).join('')}
          <h4 class="jn-sub">Begleiter und Vögel</h4>${list.filter((n) => n.kind !== 'figur').map(row).join('')}
          <div class="ov-actions"><button class="btn" type="button" data-names-reset>${icon('drehen', { size: 22 })}<span>Alle Namen zurücksetzen</span></button></div>`;
        el.querySelectorAll('[data-name]').forEach((r) => {
          const id = r.dataset.name, input = r.querySelector('input');
          const save = () => { if (audio) audio.play('tile'); T.names.set(id, input.value); refresh(); };
          r.querySelector('[data-name-save]').addEventListener('click', save);
          input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); save(); } });
        });
        el.querySelector('[data-names-reset]').addEventListener('click', async () => { if (!(await ui.overlay.confirm({ title: 'Namen zurücksetzen?', text: 'Alle Figuren, Glimm und die Vögel heißen wieder wie im Spiel.', yes: 'Zurücksetzen', no: 'Abbrechen' }))) return; for (const n of T.names.list()) if (n.custom) T.names.set(n.id, null); refresh(); });
      },
      farben(el) {
        const c = T.colors.get();
        el.innerHTML = `
          <p class="jn-lead">Farben wie im Kursmaterial. Jede Farbe hat außerdem ein Symbol, damit alle sie erkennen.</p>
          ${EMOTIONS.map((e) => `<div class="tp-color" data-emo="${e}" style="--emo:${esc(c[e])}"><span class="tp-swatch">${icon(EMOTION_ICON[e], { size: 26 })}</span><span><b>${esc(T.colors.LABEL[e])}</b><br><small>${esc(c[e])}${c[e] !== T.colors.DEFAULTS[e] ? ' · geändert' : ''}</small></span><input type="color" value="${esc(c[e])}" aria-label="Farbe ${esc(T.colors.LABEL[e])}"></div>`).join('')}
          <div class="ov-actions"><button class="btn" type="button" data-colors-reset${T.colors.isCustom() ? '' : ' disabled'}>${icon('drehen', { size: 22 })}<span>Standardfarben</span></button></div>
          <p class="jn-note">Oberfläche, Auren und Segel wechseln sofort. Vögel und Runen in der Welt beim nächsten Start.</p>`;
        el.querySelectorAll('[data-emo]').forEach((r) => {
          const input = r.querySelector('input');
          const apply = () => { T.colors.set({ [r.dataset.emo]: input.value }); r.style.setProperty('--emo', input.value); r.querySelector('small').textContent = input.value + (input.value.toLowerCase() !== T.colors.DEFAULTS[r.dataset.emo] ? ' · geändert' : ''); el.querySelector('[data-colors-reset]').disabled = !T.colors.isCustom(); };
          input.addEventListener('input', apply);
          input.addEventListener('change', apply);
        });
        el.querySelector('[data-colors-reset]').addEventListener('click', () => { if (audio) audio.play('tile'); T.colors.reset(); refresh(); });
      },
      eingeloest(el) {
        const store = game.save.storage;
        const cur = game.save.current;
        const slots = [];
        for (let i = 0; i < 8; i++) {
          let d = null;
          try { d = JSON.parse(store.getItem('lumo.save.' + i) || 'null'); } catch (e) { d = null; }
          if (i === cur && state) d = { ...(d || {}), handle: state.get('handle'), codesUsed: state.get('codesUsed', []), units: state.get('units', {}) };
          if (!d) continue;
          const used = Array.isArray(d.codesUsed) ? d.codesUsed : [];
          const done = Object.values(d.units || {}).filter((s) => s === 'fertig').length;
          slots.push({ i, handle: d.handle || 'Spielstand ' + (i + 1), used, done, current: i === cur });
        }
        const label = (k) => { const [kind, id] = k.split(':'); if (kind === 'unit') { const u = content.unit(id); return u ? (u.code + ' · ' + (u.joker ? 'J' + u.nr : u.nr)) : id; } if (kind === 'weather') return WEATHER_LABEL[id] || id; if (kind === 'module') return 'Modul ' + id.replace('j1-m', ''); return KIND_LABEL[kind] || kind; };
        el.innerHTML = `
          <p class="jn-lead">Nur Spielnamen und Codes, keine Personendaten. Alles bleibt auf diesem Gerät.</p>
          ${slots.length ? slots.map((s) => `<article class="tp-slot${s.current ? ' is-current' : ''}"><b>${esc(s.handle)}</b> <small>· Spielstand ${s.i + 1}${s.current ? ' · gerade offen' : ''} · ${s.done} Aufnäher · ${s.used.length} Code${s.used.length === 1 ? '' : 's'}</small><div class="tp-chips">${s.used.map((k) => `<span>${esc(label(k))}</span>`).join('') || '<small>noch kein Code</small>'}</div></article>`).join('') : '<p class="jn-note">Noch kein Spielstand auf diesem Gerät.</p>'}`;
      },
    };

    function showPage(id) {
      if (!handle) return;
      const p = PAGES.find((x) => x.id === id) || PAGES[0];
      current = p.id;
      const rail = handle.el.querySelector('.jn-rail'), pageEl = handle.el.querySelector('.jn-page');
      rail.innerHTML = PAGES.map((x) => `<button type="button" class="jn-tab${x.id === current ? ' is-on' : ''}" data-page="${x.id}" role="tab" aria-selected="${x.id === current}"><span class="jn-tab-icon">${icon(x.icon, { size: 26 })}</span><span class="jn-tab-label">${esc(x.label)}</span></button>`).join('');
      rail.querySelectorAll('[data-page]').forEach((b) => b.addEventListener('click', () => { if (audio) audio.play('tile'); showPage(b.dataset.page); }));
      pageEl.dataset.pageId = p.id;
      pageEl.scrollTop = 0;
      pageEl.innerHTML = `<h3 class="jn-page-title">${icon(p.icon, { size: 26 })}<span>${esc(p.label)}</span></h3><div class="jn-page-body"></div><div class="tp-foot"><span class="jn-note">Lehrer-Modus · nur mit Lehrer-Code</span><button class="btn btn-small" type="button" data-teacher-end>${icon('x', { size: 18 })}<span>Lehrer-Modus beenden</span></button></div>`;
      try { render[p.id](pageEl.querySelector('.jn-page-body')); } catch (e) { console.error('[lehrer]', p.id, e); pageEl.querySelector('.jn-page-body').innerHTML = '<p class="jn-note">Diese Seite lässt sich gerade nicht öffnen.</p>'; }
      pageEl.querySelector('[data-teacher-end]').addEventListener('click', () => { if (audio) audio.play('close'); codes.endTeacher(); api.close(); });
      emit('teacher:panel', { open: true, page: p.id });
    }
    function refresh() { if (handle) showPage(current); }

    const api = {
      open(page) {
        if (!isTeacher()) return false;   // DESIGN §10: ohne Lehrer-Code unerreichbar
        if (handle && handle.open) { showPage(page || current); return handle; }
        handle = ui.overlay.open({
          id: 'lehrer', title: 'Lehrer-Panel', icon: 'schluessel', kind: 'full', pause: true, cls: 'ov-journal ov-teacher',
          content: (body) => { body.classList.remove('ov-scroll'); body.innerHTML = '<nav class="jn-rail ov-scroll" role="tablist" aria-label="Lehrer-Seiten"></nav><section class="jn-page ov-scroll" role="tabpanel"></section>'; },
          onClose: () => { handle = null; emit('teacher:panel', { open: false }); },
        });
        showPage(page || current);
        return handle;
      },
      close() { if (handle) handle.close('teacher'); },
      get isOpen() { return !!handle && handle.open; },
      get pages() { return PAGES.map((p) => p.id); },
      refresh,
    };

    events.on('teacher:open', () => { if (ui.journal.isOpen) ui.journal.close(); setTimeout(() => api.open('codes'), 60); });
    events.on('teacher:close', () => api.close());
    events.on('weather:start', () => { if (handle && current === 'wetter') refresh(); });
    events.on('weather:end', () => { if (handle && current === 'wetter') refresh(); });

    // Tagebuch-Seite nur im Lehrer-Modus
    ui.journal.registerPage({
      id: 'lehrer', label: 'Lehrer', icon: 'schluessel', order: 88,
      hidden: () => !isTeacher(),
      render(el) {
        el.innerHTML = `<p class="jn-lead">Lehrer-Modus ist an.</p><div class="ov-actions"><button class="btn btn-primary btn-big" type="button" data-open>${icon('schluessel', { size: 26 })}<span>Lehrer-Panel öffnen</span></button><button class="btn" type="button" data-end>${icon('x', { size: 22 })}<span>Beenden</span></button></div>`;
        el.querySelector('[data-open]').addEventListener('click', () => { ui.journal.close(); setTimeout(() => api.open(), 60); });
        el.querySelector('[data-end]').addEventListener('click', () => { codes.endTeacher(); ui.journal.open('code'); });
      },
    });
    return api;
  },
};

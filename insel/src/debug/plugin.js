// Debug-Plugin (WP02): erweitert game.debug um Zustands-Werkzeuge und den Szenario-Läufer.
// Die API ist immer da (Tests brauchen sie ohne UI); das Panel erscheint nur mit ?debug in der URL.
//   LUMO.debug.unlockUnit('j1-e11') · completeUnit(id) · grantAbility('segel' | 'blick.tanks') · setPuls(0–100)
//   LUMO.debug.setTime(h) · teleportSite('strand.muschelbucht' | 'baumhaus' | 'hafen') · setVeil('strand', 0.3)
//   LUMO.debug.setMode('profi') · setBond('luc', 2) · redeemCode('welle') · snapshot() · validateContent()
//   LUMO.debug.runScenario(steps) → Promise<{ ok, failures, steps:[…] }>  Schritte als Strings, z. B.
//     'teleport hafen' 'time 17.3' 'wait 2' 'press jump' 'hold jump 0.6' 'move 0 1 2' 'unlock j1-e11' 'grant segel'
//     'puls 80' 'veil strand 0.3' 'restore strand' 'mode profi' 'bond luc 2' 'code welle' 'set flags.x true'
//     'emit unit:complete {"id":"j1-e11"}' 'call setTimeOfDay 12' 'expect zone == hafen' 'expect puls >= 70'
//     'expect state.units.j1-e11 == offen' 'expect player.z < 100' 'expect dom:.dbg-panel == true' 'log Text'
//     'shot name' (Screenshot – macht tests/lib.mjs runScenario außerhalb der Seite)
// Ereignisse (Konvention, siehe core/state.js): unit:unlock, unit:complete, ability:grant, puls:set, mode:change, bond:change, veil:set
import { UNIT_IDS, ABILITIES, UPGRADES, MODES, VEIL_ZONES, validateContent, formatIssue } from '../content/schema/index.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const num = (v) => (v === undefined || v === '' || isNaN(Number(v)) ? NaN : Number(v));
const parseVal = (s) => {
  if (s === undefined) return undefined;
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  if (/^[[{"]/.test(s)) { try { return JSON.parse(s); } catch (e) { /* String */ } }
  return s;
};

export default {
  id: 'debug', order: 95, deps: ['core'],
  install(game) {
    const { events, state, content, world, player, cameraRig, input } = game;
    const island = world.island;
    const veil = world.veil;
    const D = game.debug || (game.debug = {});
    const emit = (n, p) => events.emit(n, p);
    const unitIds = () => (content.units.length ? content.units.map((u) => u.id) : UNIT_IDS);

    // ---- Zustands-Werkzeuge ----
    function unlockUnit(id, { kurz = true } = {}) {
      if (!unitIds().includes(id)) throw new Error('Unbekannte Einheit ' + id);
      const cur = state.get('units.' + id);
      if (cur === 'fertig' || cur === 'aktiv') return cur;
      // Frühere reguläre Einheiten ohne Code → Kurzfassung (DESIGN §10)
      if (kurz && /^j1-e/.test(id)) {
        for (const u of unitIds()) { if (/^j1-e/.test(u) && u < id && !state.get('units.' + u)) state.set('units.' + u, 'kurz'); }
      }
      state.set('units.' + id, 'offen');
      emit('unit:unlock', { id });
      return 'offen';
    }
    function completeUnit(id) {
      if (!unitIds().includes(id)) throw new Error('Unbekannte Einheit ' + id);
      if (!state.get('units.' + id)) unlockUnit(id);
      state.set('units.' + id, 'fertig');
      emit('unit:complete', { id });
      return 'fertig';
    }
    function grantAbility(id) {
      if (UPGRADES.includes(id)) {
        const base = id.split('.')[0];
        state.addUnique('abilities', base);
        state.addUnique('upgrades', id);
        emit('ability:grant', { id, upgrade: true, ability: base });
        return true;
      }
      if (!ABILITIES.includes(id)) throw new Error('Unbekannte Fähigkeit ' + id);
      state.addUnique('abilities', id);
      emit('ability:grant', { id, upgrade: false, ability: id });
      return true;
    }
    function setPuls(v) {
      const p = clamp(Math.round(Number(v) || 0), 0, 100);
      state.set('session.puls', p);
      emit('puls:set', { value: p, zone: p < 30 ? 'gruen' : p < 70 ? 'gelb' : 'rot' });
      return p;
    }
    function setMode(m) {
      if (!MODES.includes(m)) throw new Error('Unbekannter Modus ' + m);
      state.set('settings.mode', m);
      emit('mode:change', { mode: m });
      return m;
    }
    function setBond(npc, level) {
      const l = clamp(Math.round(Number(level) || 0), 0, 3);
      state.set('bonds.' + npc, l);
      emit('bond:change', { npc, level: l });
      return l;
    }
    function setVeil(zone, amount) {
      if (!VEIL_ZONES.includes(zone)) throw new Error('Unbekannte Zone ' + zone);
      const a = clamp(Number(amount) || 0, 0, 1);
      if (island.zoneById(zone)) veil.setZone(zone, a);
      state.set('veil.zones.' + zone, a);
      emit('veil:set', { zone, amount: a });
      return a;
    }
    function teleportSite(id, yaw) {
      const s = content.resolveSite(id);
      if (!s) throw new Error('Unbekannter Ort ' + id);
      player.teleport(s.x, s.z, yaw);
      cameraRig.behindPlayer();
      cameraRig.snap();
      return { x: s.x, z: s.z };
    }
    // Code einlösen (Vorstufe zum Code-System aus WP30): Einheit, Modul, Demo, Lehrer, Inselwetter
    function redeemCode(word) {
      const r = content.lookupCode(word);
      if (!r) return { ok: false, error: 'Dieser Code passt hier nicht.' };
      const used = state.get('codesUsed', []);
      if (r.kind === 'unit') { unlockUnit(r.id); }
      else if (r.kind === 'module') {
        // Modul-Code für Neue: alle regulären Einheiten bis zu diesem Modul als Kurzfassung (DESIGN §10)
        const mnr = (id) => Number((String(id).match(/m(\d+)$/) || [])[1] ?? -1);   // 'j1-m3' → 3
        const nr = mnr(r.id);
        for (const u of unitIds()) { const unit = content.unit(u); if (unit && !unit.joker && mnr(unit.module) <= nr && !state.get('units.' + u)) state.set('units.' + u, 'kurz'); }
        emit('unit:unlock', { id: r.id, module: true });
      }
      else if (r.kind === 'demo') { for (const u of unitIds()) { const unit = content.unit(u); if (!unit || !unit.teacherOnly) state.set('units.' + u, 'offen'); } emit('unit:unlock', { id: '*', demo: true }); }
      else if (r.kind === 'teacher') { state.set('session.teacher', true); emit('teacher:open', {}); }
      else if (r.kind === 'weather') { state.set('session.weather', r.id); emit('weather:set', { id: r.id }); }
      const key = r.kind + ':' + r.id;
      if (!used.includes(key)) state.push('codesUsed', key);
      return { ok: true, ...r };
    }
    function validate() {
      const entries = [];
      for (const kind of content.kinds()) for (const e of content.entries(kind)) entries.push({ file: e.file || kind + '/' + e.id, kind, name: e.name, def: e.def });
      const knownSites = [...Object.keys(island.SITES || {}), ...(island.ZONES || []).map((z) => z.id)];
      const r = validateContent(entries, { knownSites });
      return { ok: r.errors.length === 0, errors: r.errors.map(formatIssue), warnings: r.warnings.map((w) => formatIssue(w, '⚠')), counts: r.counts };
    }

    // ---- Szenario-Läufer (headless) ----
    let moveOverride = null; // {x, y}
    game.addUpdate(() => { if (moveOverride) { input.state.move.x = moveOverride.x; input.state.move.y = moveOverride.y; input.state.run = Math.hypot(moveOverride.x, moveOverride.y) > 0.82; } }, { order: -99 });
    const nextFrames = (n) => new Promise((res) => { let k = 0; const f = () => { if (++k >= n) res(); else requestAnimationFrame(f); }; requestAnimationFrame(f); });
    function read(expr) {
      if (expr.startsWith('dom:')) return !!document.querySelector(expr.slice(4));
      const [head, ...rest] = expr.split('.');
      const tail = rest.join('.');
      const p = player.position;
      switch (head) {
        case 'state': return state.get(tail);
        case 'units': return state.get('units.' + tail);
        case 'player': return tail === 'x' ? p.x : tail === 'y' ? p.y : tail === 'z' ? p.z : tail === 'yaw' ? player.yaw : tail === 'grounded' ? player.grounded : player[tail];
        case 'zone': return island.zoneAt(p.x, p.z);
        case 'veil': return tail === 'here' || !tail ? veil.amountAt(p.x, p.z) : veil.getState()[tail];
        case 'time': return game.time.hour;
        case 'puls': return state.get('session.puls', 0);
        case 'mode': return state.get('settings.mode');
        case 'plugins': return game.plugins.list.join(',');
        case 'plugin': return !!game.plugins[tail];
        case 'started': return !!game.started;
        case 'paused': return !!game.paused;
        case 'menu': return !!game.ui.menuOpen;
        case 'fps': return game.quality.monitor.fps;
        case 'calls': return game.renderer.info.render.calls;
        case 'tris': return game.renderer.info.render.triangles;
        case 'content': { const [k, id] = tail.split('/'); return id ? content.has(k, id) : content.count(k); }
        default: return state.get(expr);
      }
    }
    function compare(a, op, b) {
      switch (op) {
        case '==': return a == b; // eslint-disable-line eqeqeq
        case '!=': return a != b; // eslint-disable-line eqeqeq
        case '<': return Number(a) < Number(b);
        case '>': return Number(a) > Number(b);
        case '<=': return Number(a) <= Number(b);
        case '>=': return Number(a) >= Number(b);
        case '~': case 'contains': return String(a).includes(String(b)) || (Array.isArray(a) && a.includes(b));
        default: throw new Error('Unbekannter Vergleich ' + op);
      }
    }
    async function runStep(raw) {
      const step = typeof raw === 'string' ? raw.trim() : raw;
      if (!step) return { ok: true, info: '' };
      if (typeof step === 'function') { const v = await step(game); return { ok: v !== false, info: v === undefined ? '' : String(v) }; }
      const parts = typeof step === 'string' ? step.match(/(?:[^\s"]+|"[^"]*")+/g).map((s) => s.replace(/^"|"$/g, '')) : [step.cmd, ...(step.args || [])];
      const [cmd, a, b, c] = parts;
      switch (cmd) {
        case 'start': { if (!game.started) game.start({ intro: false }); const boot = document.getElementById('boot'); if (boot) boot.remove(); return { ok: game.started }; }
        case 'teleport': { const ok = D.teleport(a, b !== undefined ? num(b) : undefined); if (!ok) teleportSite(a, b !== undefined ? num(b) : undefined); D.advance(0.3); return { ok: true, info: `${player.position.x.toFixed(1)} ${player.position.z.toFixed(1)}` }; }
        case 'site': teleportSite(a, b !== undefined ? num(b) : undefined); D.advance(0.3); return { ok: true };
        case 'time': game.time.setTimeOfDay(num(a)); return { ok: true };
        case 'freeze': game.time.paused = a !== 'off'; return { ok: true };
        case 'wait': D.advance(num(a)); return { ok: true };
        case 'frames': await nextFrames(num(a) || 1); return { ok: true };
        case 'press': input.press(a); D.advance(1 / 30); input.release(a); return { ok: true };
        case 'hold': input.press(a); D.advance(num(b)); input.release(a); D.advance(1 / 30); return { ok: true };
        case 'move': moveOverride = { x: num(a), y: num(b) }; D.advance(num(c)); moveOverride = null; return { ok: true, info: `${player.position.x.toFixed(1)} ${player.position.z.toFixed(1)}` };
        case 'yaw': cameraRig.yaw = num(a); cameraRig.snap(); return { ok: true };
        case 'unlock': return { ok: true, info: unlockUnit(a) };
        case 'complete': return { ok: true, info: completeUnit(a) };
        case 'grant': grantAbility(a); return { ok: true };
        case 'puls': return { ok: true, info: String(setPuls(num(a))) };
        case 'mode': setMode(a); return { ok: true };
        case 'bond': setBond(a, num(b)); return { ok: true };
        case 'veil': setVeil(a, num(b)); return { ok: true };
        case 'restore': D.restoreZone(a, { duration: b !== undefined ? num(b) : undefined }); return { ok: true };
        case 'code': { const r = redeemCode(a); return { ok: r.ok, info: r.ok ? r.kind + ':' + r.id : r.error }; }
        case 'set': state.set(a, parseVal(parts.slice(2).join(' '))); return { ok: true };
        case 'emit': events.emit(a, parts[2] !== undefined ? parseVal(parts.slice(2).join(' ')) : undefined); return { ok: true };
        case 'call': { const fn = D[a]; if (typeof fn !== 'function') throw new Error('debug.' + a + ' gibt es nicht'); const r = await fn(...parts.slice(2).map(parseVal)); return { ok: true, info: r === undefined ? '' : JSON.stringify(r) }; }
        case 'save': return { ok: game.save.save(a !== undefined ? num(a) : undefined), info: 'slot ' + game.save.current };
        case 'load': return { ok: game.save.load(num(a)) };
        case 'menu': if (a === 'open') game.ui.openMenu(b); else game.ui.closeMenu(); return { ok: true };
        case 'pause': game.setPaused(a !== 'off'); return { ok: true };
        case 'expect': { const v = read(a); const ok = compare(v, b, parseVal(parts.slice(3).join(' '))); return { ok, info: `${a} = ${JSON.stringify(v)}` }; }
        case 'log': return { ok: true, info: parts.slice(1).join(' ') };
        case 'shot': return { ok: true, info: 'shot ' + a };
        default: throw new Error('Unbekannter Schritt: ' + cmd);
      }
    }
    async function runScenario(steps, { log = false, stopOnFail = false } = {}) {
      const out = { ok: true, failures: 0, steps: [] };
      const list = Array.isArray(steps) ? steps : String(steps).split('\n');
      for (let i = 0; i < list.length; i++) {
        const t0 = performance.now();
        let r;
        try { r = await runStep(list[i]); } catch (e) { r = { ok: false, info: 'Fehler: ' + (e && e.message || e) }; }
        const entry = { i, step: typeof list[i] === 'function' ? '(fn)' : list[i], ok: !!r.ok, info: r.info || '', ms: Math.round(performance.now() - t0) };
        out.steps.push(entry);
        if (log) console.log((entry.ok ? '✔' : '✘') + ' ' + entry.step + (entry.info ? ' · ' + entry.info : ''));
        if (!entry.ok) { out.ok = false; out.failures++; if (stopOnFail) break; }
      }
      return out;
    }

    Object.assign(D, { unlockUnit, completeUnit, grantAbility, setPuls, setTime: (h) => game.time.setTimeOfDay(h), setMode, setBond, setVeil, teleportSite, redeemCode, runScenario, validateContent: validate, snapshot: () => state.snapshot(), read, unitIds, sites: () => content.siteIds() });

    // ---- Panel (nur mit ?debug) ----
    const on = game.params && game.params.has('debug');
    if (on && typeof document !== 'undefined') buildPanel();

    function buildPanel() {
      const style = document.createElement('style');
      style.textContent = `
        .dbg-tab{position:fixed;left:0;top:50%;transform:translateY(-50%);z-index:60;background:#1b1033;color:#ffd166;border:1px solid #ffd16688;border-left:0;border-radius:0 10px 10px 0;padding:10px 6px;font:700 12px/1 system-ui,sans-serif;letter-spacing:.08em;writing-mode:vertical-rl;cursor:pointer;opacity:.85}
        .dbg-panel{position:fixed;left:0;top:0;bottom:0;width:min(340px,92vw);z-index:59;background:rgba(20,12,40,.94);color:#eee;font:13px/1.35 system-ui,sans-serif;padding:10px 12px 40px;overflow:auto;box-shadow:4px 0 24px #0008;display:none;-webkit-overflow-scrolling:touch}
        .dbg-panel.is-open{display:block}
        .dbg-panel h3{margin:10px 0 4px;font-size:12px;color:#ffd166;text-transform:uppercase;letter-spacing:.06em}
        .dbg-row{display:flex;gap:6px;align-items:center;margin:4px 0;flex-wrap:wrap}
        .dbg-row select,.dbg-row input[type=text],.dbg-row textarea{flex:1;min-width:0;background:#0f0a22;color:#fff;border:1px solid #6b5ca8;border-radius:6px;padding:6px;font:inherit}
        .dbg-row select{min-width:96px}
        .dbg-row input[type=range]{flex:1}
        .dbg-row button{background:#4b3a8f;color:#fff;border:0;border-radius:6px;padding:7px 10px;font:inherit;cursor:pointer;min-height:32px}
        .dbg-row button.is-on{background:#ffd166;color:#1b1033}
        .dbg-out{font:11px/1.3 ui-monospace,monospace;white-space:pre-wrap;background:#0f0a22;border-radius:6px;padding:6px;max-height:160px;overflow:auto;margin-top:4px;color:#cfd}
        .dbg-val{min-width:36px;text-align:right;color:#ffd166}
      `;
      document.head.appendChild(style);
      const tab = document.createElement('button');
      tab.className = 'dbg-tab hud-interactive'; tab.type = 'button'; tab.textContent = 'DEBUG';
      const panel = document.createElement('div');
      panel.className = 'dbg-panel hud-interactive';
      const units = unitIds();
      const opts = (arr, sel) => arr.map((v) => `<option value="${v}"${v === sel ? ' selected' : ''}>${v}</option>`).join('');
      const zoneIds = island.ZONES.map((z) => z.id);
      const npcIds = content.ids('npcs');
      panel.innerHTML = `
        <h3>Einheit</h3>
        <div class="dbg-row"><select data-f="unit">${opts(units, 'j1-e11')}</select><button data-a="unlock">Frei</button><button data-a="complete">Fertig</button></div>
        <div class="dbg-row"><input type="text" data-f="code" placeholder="Code-Wort (z. B. WELLE)"><button data-a="code">Einlösen</button></div>
        <h3>Fähigkeit</h3>
        <div class="dbg-row"><select data-f="ability">${opts([...ABILITIES, ...UPGRADES], 'segel')}</select><button data-a="grant">Geben</button></div>
        <h3>Puls <span class="dbg-val" data-v="puls">0</span></h3>
        <div class="dbg-row"><input type="range" min="0" max="100" step="1" data-f="puls" value="0"></div>
        <h3>Zeit <span class="dbg-val" data-v="time"></span></h3>
        <div class="dbg-row"><input type="range" min="0" max="24" step="0.25" data-f="time"><label><input type="checkbox" data-f="freeze"> Stopp</label></div>
        <h3>Ort</h3>
        <div class="dbg-row"><select data-f="site">${opts([...zoneIds, ...content.siteIds()])}</select><button data-a="teleport">Teleport</button></div>
        <h3>Schleier <span class="dbg-val" data-v="veil"></span></h3>
        <div class="dbg-row"><select data-f="veilZone">${opts(zoneIds, 'strand')}</select><input type="range" min="0" max="1" step="0.05" data-f="veil" value="1"><button data-a="veil">Setzen</button><button data-a="restore">Welle</button></div>
        <h3>Modus</h3>
        <div class="dbg-row" data-modes>${MODES.map((m) => `<button data-mode="${m}">${m}</button>`).join('')}</div>
        <h3>Bindung</h3>
        <div class="dbg-row"><select data-f="npc">${opts(npcIds.length ? npcIds : ['jolie', 'tun', 'luc'])}</select><select data-f="bond">${opts(['0', '1', '2', '3'])}</select><button data-a="bond">Setzen</button></div>
        <h3>Speichern</h3>
        <div class="dbg-row"><button data-a="save">Speichern</button><button data-a="export">Export</button><button data-a="import">Import</button><button data-a="wipe">Alles löschen</button></div>
        <div class="dbg-row"><textarea data-f="codeArea" rows="2" placeholder="Export-/Import-Code"></textarea></div>
        <h3>Szenario</h3>
        <div class="dbg-row"><textarea data-f="scenario" rows="4">teleport hafen
puls 80
expect puls == 80
move 0 1 1.5
expect zone == hafen</textarea></div>
        <div class="dbg-row"><button data-a="run">Starten</button><button data-a="validate">Inhalte prüfen</button><button data-a="stats">Stats</button></div>
        <div class="dbg-out" data-out>Bereit.</div>
      `;
      document.body.appendChild(tab);
      document.body.appendChild(panel);
      const $ = (s) => panel.querySelector(s);
      const out = $('[data-out]');
      const say = (t) => { out.textContent = typeof t === 'string' ? t : JSON.stringify(t, null, 1); };
      tab.addEventListener('click', () => { panel.classList.toggle('is-open'); tab.blur(); });
      const act = {
        unlock: () => say('→ ' + unlockUnit($('[data-f=unit]').value)),
        complete: () => say('→ ' + completeUnit($('[data-f=unit]').value)),
        code: () => say(redeemCode($('[data-f=code]').value)),
        grant: () => { grantAbility($('[data-f=ability]').value); say('Fähigkeiten: ' + state.get('abilities', []).join(', ') + '\nUpgrades: ' + state.get('upgrades', []).join(', ')); },
        teleport: () => { const v = $('[data-f=site]').value; if (!D.teleport(v)) teleportSite(v); say('Teleport ' + v); },
        veil: () => say('Schleier ' + $('[data-f=veilZone]').value + ' = ' + setVeil($('[data-f=veilZone]').value, +$('[data-f=veil]').value)),
        restore: () => { D.restoreZone($('[data-f=veilZone]').value); say('Farbwelle ' + $('[data-f=veilZone]').value); },
        bond: () => say('Bindung ' + $('[data-f=npc]').value + ' = ' + setBond($('[data-f=npc]').value, $('[data-f=bond]').value)),
        save: () => say('Gespeichert: ' + game.save.save() + ' (Slot ' + game.save.current + ')'),
        export: () => { const c = game.save.exportCode(); $('[data-f=codeArea]').value = c; say('Export: ' + c.length + ' Zeichen (ohne private Felder)'); },
        import: () => { const r = game.save.importCode($('[data-f=codeArea]').value); if (r.ok) game.save.load(r.slot); say(r); },
        wipe: () => { if (confirm('Wirklich alle LUMO-Daten auf diesem Gerät löschen?')) say('Gelöscht: ' + game.save.wipe() + ' Schlüssel'); },
        run: async () => { say('läuft …'); const r = await runScenario($('[data-f=scenario]').value.split('\n')); say((r.ok ? '✔ ok' : '✘ ' + r.failures + ' Fehler') + '\n' + r.steps.map((s) => (s.ok ? '✔ ' : '✘ ') + s.step + (s.info ? ' · ' + s.info : '')).join('\n')); },
        validate: () => { const r = validate(); say((r.ok ? '✔ Inhalte ok ' : '✘ ') + JSON.stringify(r.counts) + '\n' + r.errors.concat(r.warnings).join('\n')); },
        stats: () => say({ ...D.stats(), plugins: game.plugins.list, failed: game.plugins.failed, units: Object.keys(state.get('units', {})).length, slot: game.save.current }),
      };
      panel.querySelectorAll('[data-a]').forEach((b) => b.addEventListener('click', async () => { try { await act[b.dataset.a](); } catch (e) { say('Fehler: ' + e.message); } b.blur(); }));
      panel.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => { setMode(b.dataset.mode); syncModes(); b.blur(); }));
      const syncModes = () => panel.querySelectorAll('[data-mode]').forEach((b) => b.classList.toggle('is-on', b.dataset.mode === state.get('settings.mode')));
      syncModes();
      $('[data-f=puls]').addEventListener('input', (e) => { $('[data-v=puls]').textContent = setPuls(e.target.value); });
      $('[data-f=time]').addEventListener('input', (e) => { game.time.setTimeOfDay(+e.target.value); });
      $('[data-f=freeze]').addEventListener('change', (e) => { game.time.paused = e.target.checked; });
      panel.querySelectorAll('select').forEach((s) => s.addEventListener('change', () => s.blur()));
      let t = 0;
      game.addUpdate((dt, time, real) => {
        t += real; if (t < 0.25 || !panel.classList.contains('is-open')) return; t = 0;
        $('[data-v=time]').textContent = game.time.hour.toFixed(2) + ' Uhr';
        if (document.activeElement !== $('[data-f=time]')) $('[data-f=time]').value = game.time.hour.toFixed(2);
        $('[data-f=freeze]').checked = !!game.time.paused;
        $('[data-v=veil]').textContent = veil.amountAt(player.position.x, player.position.z).toFixed(2) + ' hier';
        $('[data-v=puls]').textContent = state.get('session.puls', 0);
        if (document.activeElement !== $('[data-f=puls]')) $('[data-f=puls]').value = state.get('session.puls', 0);
      }, { order: 99, always: true });
      D.panel = { open: (v = true) => panel.classList.toggle('is-open', v), el: panel };
    }

    return { unlockUnit, completeUnit, grantAbility, setPuls, setMode, setBond, setVeil, teleportSite, redeemCode, runScenario, validateContent: validate, panel: on };
  },
};

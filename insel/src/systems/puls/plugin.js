// Puls-Plugin (WP33, DESIGN §6): Puls 0–100 ab e11 (Upgrade ruhe.puls) mit Quellen (Böen, Donner, Zeitdruck, Provokation,
// Vulkanhitze, Glimmer-Kugeln, Fehlschläge je +8) und Senken (Windschatten, ruhige Orte, Gadgets, ruhige Figuren nahe =
// Co-Regulation, Hilfe holen, natürliches Abklingen). Zonen-Effekte je Modus über player.setModifiers, gedeckelte
// Vignette + Herzschlag (aus bei „reduzierte Effekte“), Anti-Spirale (Fehlschläge nie über 55; 2 in Folge → −20 und ein
// Windschatten-Stein), Deckel (session.pulsCap, Bosse), Glimm als Begleiter (Farbe = Puls, Zeilen ≤ 6 Wörter, stumm
// schaltbar), Hilfe holen (erwachsene Figur kommt, Puls −50, immer), Sicherer Ort / Hängematte über das Pause-Menü.
//   game.puls = game.plugins.puls → { value, zone, active, set(v, reason), add(delta, reason), impulse(n, reason),
//     fail(reason), success(), source(id, { rate, cap }), removeSource(id), sink(id, { rate }), removeSink(id),
//     shelter(id, { x, z, r, until }), removeShelter(id), inShelter(), sources(), modifiers(), hilfeHolen({ adult, cast }),
//     adultFor(id?), sichererOrt (scenes/sicherer-ort.js), glimm { say, line, skin, setSkin, mesh }, counter, MODE_PARAMS }
//   Ereignisse: puls:set {value, zone, reason, prev} · puls:zone {zone, prev} · puls:fail {reason, value, consecutive}
//     · puls:antispiral {value, x, z} · puls:hilfe:start {npc} · puls:hilfe {npc, before, after, via} · puls:shelter {id, inside}
//     · puls:modifiers {zone, mode, …} · safeplace:enter/entered/exit {kind}
//   Hört auf: player:fail · quest:step:fail · quest:step:done · minigame:result · quest:hint (rueckenwind) · mode:change ·
//     settings.reducedFx · puls:cap · safeplace:open {kind} · kraft:tap (Ruhe → Koffer) · player:pump (Koffer)
//   Spielstand: session.puls (Laufzeit), session.pulsCap · Debug: LUMO.debug.puls() · pulsFail(n) · pulsSource(id, rate|null)
//     · pulsShelter(on) · hilfe() · sichererOrt(on|'edit') · glimmLine(key) · glimmSay(text)
import { zoneOf, applyRise, applyFail, createPulsCounter, decayRate, modifiersFor, vignetteFor, heartbeatBpm, MODE_PARAMS, HILFE_DROP, ANTI_SPIRAL_DROP, ZONE_LABEL } from './model.js';
import { createGlimm, GLIMM_SKINS } from '../../actors/glimm.js';
import { createSichererOrt } from '../../scenes/sicherer-ort.js';

const CSS = `
.puls-vignette{position:absolute;inset:0;pointer-events:none;z-index:7;opacity:0;transition:opacity .8s ease;background:radial-gradient(ellipse 70% 62% at 50% 48%, rgba(0,0,0,0) 52%, var(--puls-col,rgba(255,93,93,.55)) 100%)}
.puls-vignette.is-rot{animation:puls-beat 1.1s ease-in-out infinite}
@keyframes puls-beat{0%,100%{transform:scale(1)}40%{transform:scale(1.035)}}
html.reduced-fx .puls-vignette{opacity:0 !important;animation:none !important}
.puls-chip{position:absolute;left:50%;top:78px;transform:translate(-50%,-6px);z-index:11;padding:8px 14px;border-radius:999px;background:rgba(18,12,36,.7);box-shadow:0 0 0 1px rgba(255,255,255,.14);color:#fff;font:800 15px/1 var(--font,system-ui);display:flex;gap:10px;align-items:center;opacity:0;transition:opacity .25s ease,transform .25s ease;pointer-events:none}
.puls-chip.is-in{opacity:1;transform:translate(-50%,0)}
.puls-chip b{color:var(--c-gold,#ffd166)}
.puls-chip .pc-bar{position:relative;width:110px;height:8px;border-radius:4px;background:rgba(255,255,255,.14);overflow:hidden}
.puls-chip .pc-bar i{position:absolute;left:0;top:0;bottom:0;border-radius:4px;background:linear-gradient(90deg,#5ad24f,#ffd23f 45%,#ff5d5d)}
`;
const SKIN_OF = { 'glimm-axolotl': 'axolotl', 'glimm-fledermaus': 'fledermaus' };

export default {
  id: 'puls', order: 60.5, deps: ['ui', 'bewegung', 'npcs'],
  install(game) {
    const { events, state, content, ui, player, audio } = game;
    const emit = (n, p) => events.emit(n, p);
    if (typeof document !== 'undefined') { const st = document.createElement('style'); st.dataset.puls = '1'; st.textContent = CSS; document.head.appendChild(st); }

    // ---- Zustand ----
    const value = () => Math.max(0, Math.min(100, Math.round(Number(state.get('session.puls', 0)) || 0)));
    const mode = () => state.get('settings.mode', 'abenteuer');
    const factor = () => { const f = Number(state.get('session.pulsFactor', 1)); return f > 0 ? f : 1; };
    const cap = () => { const c = state.get('session.pulsCap'); return c === null || c === undefined ? null : Number(c); };
    const active = () => (state.get('upgrades', []) || []).includes('ruhe.puls') || (state.get('abilities', []) || []).includes('ruhe');
    let zone = zoneOf(value());
    let frac = 0;
    const counter = createPulsCounter();
    const sources = new Map(), sinks = new Map(), shelters = new Map();
    let inShelterId = null;

    function write(v, reason = 'effekt') {
      const prev = value();
      let next = Math.max(0, Math.min(100, Math.round(v)));
      const c = cap();
      if (c !== null && next > prev && next > c) next = Math.max(prev, Math.min(100, c));
      if (next === prev) return prev;
      state.set('session.puls', next);
      emit('puls:set', { value: next, zone: zoneOf(next), reason, prev });
      return next;
    }
    function syncZone(force) {
      const z = active() ? zoneOf(value()) : 'gruen';
      if (z === zone && !force) return;
      const prev = zone; zone = z;
      applyModifiers();
      applyVignette();
      glimmZone();
      if (active() && z !== prev) { emit('puls:zone', { zone: z, prev }); zoneLine(z); }
    }
    events.on('puls:set', () => syncZone(false));
    state.on('session.puls', () => syncZone(false));

    // ---- Zonen-Effekte je Modus (Entspannt ändert nie Steuerparameter) ----
    let lastMod = null;
    function applyModifiers() {
      const m = modifiersFor(mode(), active() ? zone : 'gruen');
      const key = mode() + zone + JSON.stringify(m);
      if (key === lastMod) return;
      lastMod = key;
      player.setModifiers(m);
      emit('puls:modifiers', { zone, mode: mode(), ...m });
    }
    events.on('mode:change', () => { lastMod = null; applyModifiers(); applyVignette(); });
    state.on('settings', () => { lastMod = null; applyModifiers(); applyVignette(); });

    // ---- Vignette und Herzschlag ----
    let vigEl = null;
    function ensureVig() { if (vigEl || typeof document === 'undefined' || !ui.root) return; vigEl = document.createElement('div'); vigEl.className = 'puls-vignette'; vigEl.setAttribute('aria-hidden', 'true'); ui.root.appendChild(vigEl); }
    function applyVignette() {
      ensureVig();
      if (!vigEl) return;
      const z = active() ? zone : 'gruen';
      const a = vignetteFor(mode(), z, !!state.get('settings.reducedFx'));
      vigEl.style.opacity = String(a);
      vigEl.style.setProperty('--puls-col', z === 'rot' ? 'rgba(255,93,93,.6)' : 'rgba(255,210,63,.45)');
      vigEl.classList.toggle('is-rot', z === 'rot' && a > 0);
      if (ui.root) ui.root.dataset.puls = z;
      if (audio && audio.heartbeat) {
        if (z === 'rot' && active() && game.started) { const bpm = heartbeatBpm(value()); if (!audio.heartbeat.running) audio.heartbeat.start(bpm); else audio.heartbeat.setRate(bpm); }
        else if (audio.heartbeat.running) audio.heartbeat.stop();
      }
    }

    // ---- Glimm: Begleiter auf der Schulter + Zeilen aus content/glimm.js ----
    const pools = () => content.list('glimm')[0] || {};
    const skinOf = () => SKIN_OF[state.get('cosmetics.equipped.glimm')] || 'salamander';
    const glimm3d = createGlimm({ humanoid: player.humanoid, veil: game.world.veil, skin: skinOf() });
    game.addUpdate((dt, t, real) => glimm3d.update(real, game.loop.realTime), { order: 91, always: true });
    state.on('cosmetics.equipped', () => glimm3d.setSkin(skinOf()));
    events.on('avatar:change', () => glimm3d.attach(player.humanoid));
    function glimmZone() { glimm3d.setZone(active() ? zone : 'neutral'); }
    let lastLine = '', lastLineT = -99;
    const zoneSaid = {};
    function pick(list) {
      const arr = (Array.isArray(list) ? list : []).filter((t) => t !== lastLine);
      if (!arr.length) return Array.isArray(list) && list.length ? list[0] : null;
      return arr[Math.floor(Math.random() * arr.length)];
    }
    function say(text, opts = {}) {
      if (!text || !ui.glimm) return Promise.resolve({ shown: false });
      const now = game.loop ? game.loop.realTime : 0;
      if (!opts.force && now - lastLineT < 1.4) return Promise.resolve({ shown: false, throttled: true });
      lastLineT = now; lastLine = text;
      glimm3d.hop();
      return ui.glimm(text, { seconds: opts.seconds || 3.4 });
    }
    // Zeile aus einem Pool (key 'fail', 'gadget.verpufft', 'zone.rot' …)
    function line(key, opts = {}) {
      let pool = pools();
      for (const k of String(key).split('.')) pool = pool ? pool[k] : null;
      const t = pick(pool);
      return t ? say(t, opts) : Promise.resolve({ shown: false });
    }
    function zoneLine(z) {
      const now = game.loop ? game.loop.realTime : 0;
      if (!game.started || (zoneSaid[z] && now - zoneSaid[z] < 25)) return;
      zoneSaid[z] = now;
      line('zone.' + z);
    }

    // ---- Quellen, Senken, Windschatten ----
    function source(id, { rate = 3, cap: c = null, until = null } = {}) { sources.set(id, { rate: Math.max(0, Number(rate) || 0), cap: c, until }); return true; }
    function removeSource(id) { return sources.delete(id); }
    function sink(id, { rate = 2, until = null } = {}) { sinks.set(id, { rate: Math.max(0, Number(rate) || 0), until }); return true; }
    function removeSink(id) { return sinks.delete(id); }
    function shelter(id, { x, z, r = 3.5, until = null } = {}) { shelters.set(id, { id, x, z, r, until }); return true; }
    function removeShelter(id) { if (inShelterId === id) inShelterId = null; return shelters.delete(id); }
    function shelterAt(x, z) { for (const s of shelters.values()) if (Math.hypot(s.x - x, s.z - z) <= s.r) return s; return null; }
    function calmNpcCount() {
      const N = game.npcs;
      if (!N || !N.near) return 0;
      let n = 0;
      for (const npc of N.near(4.5)) {
        if (!npc.def || npc.def.ambient) continue;
        const e = npc.emotion && npc.emotion.get ? npc.emotion.get() : { heat: 0 };
        if ((e.heat || 0) < 30 && !(N.isVerstimmt && N.isVerstimmt(npc.def.id))) n++;
      }
      return n;
    }
    function tick(dt) {
      if (!game.started || !active() || dt <= 0) return;
      const now = game.loop.realTime;
      for (const [id, s] of sources) if (s.until !== null && now > s.until) sources.delete(id);
      for (const [id, s] of sinks) if (s.until !== null && now > s.until) sinks.delete(id);
      for (const [id, s] of shelters) if (s.until !== null && now > s.until) shelters.delete(id);
      const p = player.position;
      const sh = shelterAt(p.x, p.z);
      const shId = sh ? sh.id : null;
      if (shId !== inShelterId) { if (shId) { emit('puls:shelter', { id: shId, inside: true }); if (value() >= 30) line('shelter'); } else emit('puls:shelter', { id: inShelterId, inside: false }); inShelterId = shId; }
      const busy = (game.dialogue && game.dialogue.isOpen) || (ui.lock && ui.lock.active);
      if (busy) return;   // Szenen und Kacheln setzen den Puls über ihre Wirkungen
      let rise = 0, srcCap = null;
      for (const s of sources.values()) { rise += s.rate; if (s.cap !== null && s.cap !== undefined) srcCap = srcCap === null ? s.cap : Math.min(srcCap, s.cap); }
      let sk = 0; for (const s of sinks.values()) sk += s.rate;
      const down = decayRate(value(), { sinks: sk, shelter: !!sh, calmNpcs: calmNpcCount(), sources: rise });
      const v = value();
      const riseEff = srcCap !== null && v >= srcCap ? 0 : rise * MODE_PARAMS[mode()].rise * factor();
      frac += (riseEff - down) * dt;
      if (frac >= 1) { const d = Math.floor(frac); frac -= d; write(Math.min(srcCap === null ? 100 : srcCap, v + d), 'quelle'); }
      else if (frac <= -1) { const d = Math.ceil(frac); frac -= d; write(Math.max(0, v + d), 'senke'); }
    }
    game.addUpdate((dt) => tick(dt), { order: 42 });

    // ---- Fehlschläge und Anti-Spirale ----
    let rueckenwindSeen = false;
    events.on('quest:hint', (e) => { if (e && e.stage === 'rueckenwind') rueckenwindSeen = true; });
    function spawnWindschatten() {
      const yaw = player.yaw || 0, p = player.position;
      const x = p.x + Math.sin(yaw) * 3.4, z = p.z + Math.cos(yaw) * 3.4;
      const id = 'windschatten-' + Math.floor(game.loop.realTime * 10);
      let h = null;
      if (game.props && game.props.spawn) { try { h = game.props.spawn('menhir', { id, x, z, yaw: -yaw, height: 2.2, color: '#9fe8b0' }); } catch (e) { h = null; } }
      shelter(id, { x, z, r: 3.6, until: game.loop.realTime + 90 });
      if (h) setTimeout(() => { try { h.remove(); } catch (e) { /* weg */ } }, 90000);
      return { id, x, z };
    }
    function fail(reason = 'fehlschlag') {
      if (!active()) return { value: value(), consecutive: 0, antiSpiral: false };
      const r = counter.fail();
      const v = write(applyFail(value(), { mode: mode(), factor: factor(), cap: cap() }), 'fehlschlag');
      emit('puls:fail', { reason, value: v, consecutive: r.consecutive });
      if (r.consecutive === 1 || !r.antiSpiral) { if (Math.random() < 0.5) line('fail'); }
      if (r.antiSpiral) {
        setTimeout(() => {
          if (rueckenwindSeen) { rueckenwindSeen = false; return; }   // die Quest-Hinweisleiter hat es schon übernommen
          const nv = write(Math.max(0, value() - ANTI_SPIRAL_DROP), 'antispiral');
          const w = spawnWindschatten();
          emit('puls:antispiral', { value: nv, ...w });
          line('antiSpiral', { force: true });
        }, 0);
      }
      return { value: v, consecutive: r.consecutive, antiSpiral: r.antiSpiral };
    }
    const questsBusy = () => !!(game.quests && game.quests.active && !(game.dialogue && game.dialogue.isOpen));
    events.on('player:fail', (e) => { if (!questsBusy()) fail((e && e.kind) || 'sturz'); });
    events.on('quest:step:fail', (e) => fail((e && e.reason) || 'fehlschlag'));
    events.on('minigame:result', (e) => { if (!e) return; if (e.ok === false && !e.cancelled) fail('minispiel'); else if (e.ok) counter.success(); });
    events.on('quest:step:done', () => counter.success());

    // ---- Hilfe holen: erwachsene Figur kommt, Puls −50 (immer, Gesetz 8) ----
    function adultFor(pref) {
      const defs = content.list('npcs');
      const isAdult = (d) => d && Number(d.age) >= 18 && !d.ambient;
      const want = pref || state.get('ampel.notfall');
      const d = defs.find((x) => x.id === want);
      if (isAdult(d)) return d.id;
      const ilda = defs.find((x) => x.id === 'ilda');
      if (isAdult(ilda)) return 'ilda';
      const any = defs.find(isAdult);
      return any ? any.id : (want || 'ilda');
    }
    function bringNpc(npc, { maxSeconds = 5 } = {}) {
      return new Promise((resolve) => {
        const p = player.position;
        let dx = npc.position.x - p.x, dz = npc.position.z - p.z;
        let d = Math.hypot(dx, dz);
        if (d < 0.01) { dx = Math.sin(player.yaw || 0); dz = Math.cos(player.yaw || 0); d = 1; }
        const nx = dx / d, nz = dz / d;
        if (d > 26) { npc.warpTo(p.x + nx * 20, p.z + nz * 20); d = 20; }
        let done = false;
        const finish = () => { if (done) return; done = true; npc.face({ x: p.x, y: p.y, z: p.z }); resolve(true); };
        npc.setOverride({ x: p.x + nx * 1.8, z: p.z + nz * 1.8, run: true, anim: 'talk', lookAt: { x: p.x, y: p.y + 1.55, z: p.z }, onArrive: finish });
        setTimeout(() => { if (!done) { npc.warpTo(p.x + nx * 1.8, p.z + nz * 1.8, Math.atan2(-nx, -nz)); finish(); } }, maxSeconds * 1000);
      });
    }
    let hilfeBusy = false;
    async function hilfeHolen({ adult = null, cast = [], via = 'dialog' } = {}) {
      if (hilfeBusy) return { busy: true };
      hilfeBusy = true;
      const id = adultFor(adult);
      const before = value();
      emit('puls:hilfe:start', { npc: id, via });
      const N = game.npcs;
      const npc = N && N.get ? N.get(id) : null;
      if (ui.lock) ui.lock.acquire('hilfe');
      try {
        if (audio && audio.has && audio.has('chime')) audio.play('chime');
        if (npc) await bringNpc(npc, { maxSeconds: 5 });
        const def = content.get('npcs', id);
        const text = (def && def.lines && def.lines.hilfe) || 'Ich bin da. Erzähl in Ruhe.';
        await ui.say({ who: id, text, wait: true, anchor: npc && npc.group ? npc.group : null });
        const after = write(Math.max(0, value() - HILFE_DROP), 'hilfe');
        if (N && N.deed) N.deed(id, 'hilfe-geholt', 'Du hast Hilfe geholt.');
        line('hilfe', { force: true });
        emit('puls:hilfe', { npc: id, before, after, via, cast });
        if (npc) setTimeout(() => { try { npc.clearOverride(); } catch (e) { /* weg */ } }, 6000);
        return { npc: id, before, after };
      } finally { if (ui.lock) ui.lock.release('hilfe'); hilfeBusy = false; }
    }

    // ---- Sicherer Ort und Hängematte (Pause-Menü) ----
    const api = {};
    const ort = createSichererOrt({ game, puls: api });
    game.sichererOrt = ort;
    game.addUpdate((dt) => ort.update(dt), { order: 43 });
    // Hängematte: die Ruhe-Szene des Baumhauses (WP40), wenn es sie gibt, sonst der eigene Ersatz
    events.on('safeplace:open', (e) => {
      const kind = e && e.kind;
      if (ort.isInside) { ort.exit(); return; }
      if (kind === 'sichererOrt') ort.enter();
      else if (game.plugins.baumhaus && typeof game.plugins.baumhaus.rest === 'function') game.plugins.baumhaus.rest({ kind: 'haengematte' });
      else ort.haengematte();
    });

    // ---- Puls-Chip (Vorher/Nachher, z. B. Sprint-Ventil, Tester) ----
    let chipEl = null, chipT = 0;
    function chip(text, { before, after, seconds = 3.2 } = {}) {
      if (typeof document === 'undefined' || !ui.root) return;
      if (!chipEl) { chipEl = document.createElement('div'); chipEl.className = 'puls-chip'; chipEl.dataset.pulsChip = '1'; ui.root.appendChild(chipEl); }
      const bar = typeof after === 'number' ? `<span class="pc-bar"><i style="width:${Math.max(2, after)}%"></i></span>` : '';
      chipEl.innerHTML = `<span>${text}</span>${typeof before === 'number' ? `<b>${before} → ${after}</b>` : ''}${bar}`;
      chipEl.classList.add('is-in');
      clearTimeout(chipT);
      chipT = setTimeout(() => chipEl.classList.remove('is-in'), seconds * 1000);
    }

    Object.assign(api, {
      get value() { return value(); },
      get zone() { return active() ? zoneOf(value()) : 'gruen'; },
      get active() { return active(); },
      get cap() { return cap(); },
      set(v, reason) { return write(v, reason || 'effekt'); },
      add(delta, reason) { const d = Number(delta) || 0; if (!active() && d > 0) return value(); return write(d > 0 ? applyRise(value(), d, { mode: mode(), factor: factor(), cap: cap() }) : value() + d, reason || 'effekt'); },
      impulse(n, reason) { return api.add(n, reason || 'impuls'); },
      fail, success: () => counter.success(), counter,
      source, removeSource, sink, removeSink, shelter, removeShelter,
      sources: () => [...sources.entries()].map(([id, s]) => ({ id, ...s })),
      shelters: () => [...shelters.values()],
      inShelter: () => inShelterId,
      modifiers: () => ({ ...player.modifiers }),
      hilfeHolen, adultFor,
      sichererOrt: ort,
      chip,
      glimm: { say, line, get skin() { return glimm3d.skin; }, setSkin: (s) => glimm3d.setSkin(s), get mesh() { return glimm3d.group; }, get color() { return glimm3d.color; }, SKINS: GLIMM_SKINS, hop: () => glimm3d.hop() },
      MODE_PARAMS, ZONE_LABEL,
      zoneOf,
    });
    game.puls = api;
    game.glimm = api.glimm;

    // ---- Start und Zurücksetzen ----
    events.on('state:reset', () => { frac = 0; counter.reset(); sources.clear(); sinks.clear(); shelters.clear(); lastMod = null; syncZone(true); glimm3d.setSkin(skinOf()); });
    events.on('ability:grant', () => syncZone(true));
    events.on('puls:cap', () => { const c = cap(); if (c !== null && value() > c) write(c, 'deckel'); });
    events.on('game:start', () => { syncZone(true); });
    syncZone(true);

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.puls = () => ({ value: value(), zone: api.zone, active: active(), cap: cap(), mode: mode(), factor: factor(), modifiers: api.modifiers(), sources: api.sources(), shelters: api.shelters().map((s) => s.id), inShelter: inShelterId, consecutive: counter.consecutive, glimmSkin: glimm3d.skin, glimmColor: glimm3d.color });
    D.pulsFail = (n = 1, reason = 'debug') => { let r = null; for (let i = 0; i < n; i++) r = fail(reason); return r; };
    D.pulsSource = (id, rate) => (rate === null || rate === undefined ? removeSource(id) : source(id, { rate }));
    D.pulsShelter = (on = true) => { if (!on) return removeShelter('debug'); const p = player.position; return shelter('debug', { x: p.x, z: p.z, r: 6 }); };
    D.hilfe = (adult) => hilfeHolen({ adult, via: 'debug' });
    D.sichererOrt = (on = true) => (on === 'edit' ? ort.edit() : on ? ort.enter() : ort.exit());
    D.glimmLine = (key) => line(key, { force: true });
    D.glimmSay = (text) => say(text, { force: true });
    return api;
  },
};

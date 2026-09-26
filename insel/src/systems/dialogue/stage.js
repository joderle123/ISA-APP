// Dialog-Bühne (WP32, Browser): verbindet die Dialog-Engine mit Figuren (WP34 oder Stellvertreter aus der Avatar-
// Pipeline), Kamera-Rahmung (rig.setMode('talk')), Sprechblasen, Kacheln mit Zurückspulen/Verlassen-Leiste,
// Lauschen (Bewegung oder Tippen bricht ab), Zeichen-Kanal (Emote + Summen), Hilfe holen, Satz-Bau- und Minispiel-Ersatz.
//   const stage = createStage({ game, dsl }); await stage.play('e11-luc-kante', { step, quest }) → { end, reason, node }
//   stage.current · stage.exit(reason) · stage.rewind() · stage.actor(npcId) · stage.isOpen
// DOM: .dlg-bar[data-dlg] mit [data-rewind] und [data-exit] · Blasen/Kacheln wie WP21 (Kachel-Ton 'deckel' = prallt ab)
// Ereignisse (zusätzlich zur Engine): dialogue:open {id} · dialogue:close {id, reason} · hilfe:holen {npc, cast, puls}
//   · dialogue:sign {emote, hum} · minigame:fallback {id} · satzbau:result {id, clean}
import { createDialogue } from './engine.js';
import { textOf, ANIM_EMOTION, HILFE_PULS, HILFE_HITZE } from './rules.js';
import { EMOTE_ICON, EMOTE_NAMES } from '../../actors/humanoid/emotes.js';
import { bodyLanguageFor } from '../../actors/humanoid/poses.js';
import { ANIMS } from '../../actors/humanoid/index.js';
import { evalCond, applyEffects } from '../quests/dsl.js';
import { esc } from '../../ui/overlay.js';

export const STAGE_CSS = `
.dlg-bar{position:absolute;top:calc(74px + var(--safe-t,0px));right:calc(16px + var(--safe-r,0px));z-index:14;display:flex;gap:8px;opacity:0;transform:translateY(-6px);transition:opacity .2s ease,transform .2s ease;pointer-events:none}
.dlg-bar.is-in{opacity:1;transform:none;pointer-events:auto}
.dlg-btn{display:inline-flex;align-items:center;gap:8px;min-height:56px;min-width:56px;padding:0 14px;border-radius:18px;border:2px solid rgba(255,255,255,.18);background:rgba(24,14,44,.72);color:#fff;font:800 calc(15px * var(--txt-scale,1))/1 inherit;font-family:inherit;backdrop-filter:blur(6px)}
.dlg-btn[disabled]{opacity:.4}
.dlg-btn:active:not([disabled]){transform:scale(.96)}
.dlg-btn span{white-space:nowrap}
.choice.tone-deckel .choice-icon{--tile:#8d8aa6;color:#fff;background:repeating-linear-gradient(135deg,#8d8aa6 0 6px,#6c6a82 6px 12px)}
.choice.tone-deckel{border-style:dashed}
.choice.tone-zeichen .choice-icon{--tile:#ffd166}
.bubble.is-lauschen .bubble-text{min-height:1.3em}
.lauschen-ring{position:absolute;left:12px;bottom:10px;display:flex;align-items:center;gap:8px;color:var(--c-mint,#2de2c9);font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.lauschen-ring i{display:block;width:120px;height:6px;border-radius:3px;background:rgba(255,255,255,.14);overflow:hidden}
.lauschen-ring i::after{content:"";display:block;height:100%;width:calc(var(--p,0) * 100%);background:var(--c-mint,#2de2c9);transition:width .1s linear}
.sb-slot{margin:0 0 12px}
.sb-slot h4{margin:0 0 6px;font-size:calc(15px * var(--txt-scale,1));font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:var(--c-gold,#ffd166)}
.sb-tiles{display:flex;flex-wrap:wrap;gap:8px}
.sb-tile{display:inline-flex;align-items:center;gap:8px;min-height:64px;padding:0 16px;border-radius:18px;border:2px solid rgba(255,255,255,.16);background:rgba(255,255,255,.08);color:#fff;font:800 calc(17px * var(--txt-scale,1))/1.2 inherit;font-family:inherit}
.sb-tile.is-on{background:var(--c-mint,#2de2c9);color:var(--ink,#1d1330);border-color:transparent}
.sb-tile .choice-read{width:40px;height:40px;min-width:40px}
.sb-result{margin:12px 0 0;font-size:calc(18px * var(--txt-scale,1));font-weight:800;text-align:center}
.sb-result.is-thorn{color:#ff8c8c}.sb-result.is-clean{color:#8fd18b}
.mg-card{display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center}
.mg-card .mg-icon{width:84px;height:84px;border-radius:26px;display:grid;place-items:center;background:var(--c-gold,#ffd166);color:var(--ink,#1d1330)}
.mg-bar{width:100%;height:10px;border-radius:5px;background:rgba(255,255,255,.14);overflow:hidden}
.mg-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#2de2c9,#ffd166);transition:width .1s linear}
`;

const SNAP_PATHS = ['session.hitze', 'session.puls', 'bonds', 'flags', 'moods', 'deeds', 'deedLog', 'items', 'session.tanks', 'session.emotion'];

export function createStage({ game, dsl }) {
  const { events, state, content, ui, player, cameraRig, input, audio } = game;
  const speech = game.speech || null;
  const icon = ui.icon;
  let current = null;   // { id, def, d, actors: Map, standins: [], bar, offs: [], lauschen: null, opts }
  let barEl = null;
  const emit = (n, p) => events.emit(n, p);
  const npcs = () => game.npcs || (game.plugins && game.plugins.npcs) || null;

  // ---- Leiste: Zurückspulen und Szene verlassen (immer, Gesetz 8) ----
  function bar() {
    if (barEl) return barEl;
    barEl = document.createElement('div');
    barEl.className = 'dlg-bar hud-interactive';
    barEl.dataset.dlg = '1';
    barEl.innerHTML = `<button class="dlg-btn" type="button" data-rewind aria-label="Zurückspulen" title="Zurückspulen">${icon('drehen', { size: 24 })}<span>Zurück</span></button><button class="dlg-btn" type="button" data-exit aria-label="Szene verlassen" title="Szene verlassen">${icon('x', { size: 24 })}</button>`;
    barEl.querySelector('[data-rewind]').addEventListener('click', () => { if (audio) audio.play('click'); api.rewind(); });
    barEl.querySelector('[data-exit]').addEventListener('click', () => { if (audio) audio.play('close'); api.exit('exit'); });
    ui.root.appendChild(barEl);
    return barEl;
  }
  function setBar(on, canRewind) {
    const b = bar();
    b.classList.toggle('is-in', !!on);
    b.querySelector('[data-rewind]').disabled = !canRewind;
  }

  // ---- Figuren: Figuren-System (WP34) oder Stellvertreter vor der Spielfigur ----
  function actorFor(id, index = 0) {
    if (!current) return null;
    if (current.actors.has(id)) return current.actors.get(id);
    const N = npcs();
    const n = N && N.get ? N.get(id) : null;
    let actor;
    if (n && n.group) {
      // Gesprächsabstand: steht die Figur in der Spielfigur (Teleport) oder weit weg, kommt sie vor die Spielfigur;
      // in mittlerer Entfernung geht sie hin (Kamera-Rahmung braucht zwei getrennte Punkte)
      const p = player.position, yaw = player.yaw || 0;
      const d = Math.hypot(n.group.position.x - p.x, n.group.position.z - p.z);
      const fx = p.x + Math.sin(yaw) * 2.4, fz = p.z + Math.cos(yaw) * 2.4;
      if ((d < 1.2 || d > 12) && n.warpTo) n.warpTo(fx, fz, yaw + Math.PI);
      else if (d > 4 && n.setOverride) n.setOverride({ x: fx, z: fz, yaw: yaw + Math.PI, anim: 'idle' });
      actor = { id, group: n.group, humanoid: n.humanoid, npc: n, standin: false };
      if (n.face) n.face({ x: player.position.x, y: player.position.y, z: player.position.z });
    } else {
      const def = content.get('npcs', id) || {};
      const yaw = player.yaw || 0;
      const side = index % 2 ? -1 : 1;
      const ang = yaw + side * index * 0.55;
      const px = player.position.x + Math.sin(ang) * 2.4, pz = player.position.z + Math.cos(ang) * 2.4;
      const h = game.spawnHumanoid({ ...(def.look || {}) }, { x: px, z: pz, yaw: ang + Math.PI, anim: 'idle', name: 'dlg-' + id });
      h.humanoid.lookAt({ x: player.position.x, y: player.position.y + 1.5, z: player.position.z });
      actor = { id, group: h.humanoid.group, humanoid: h.humanoid, npc: null, standin: true, remove: () => h.remove() };
      current.standins.push(actor);
    }
    current.actors.set(id, actor);
    return actor;
  }
  const showAuras = () => { const s = state.get('settings.mode') !== 'profi' && (state.get('abilities', []) || []).includes('blick'); return s; };
  function applyAnim(actor, anim, { talking = false } = {}) {
    if (!actor || !actor.humanoid) return;
    const h = actor.humanoid;
    const em = anim ? ANIM_EMOTION[anim] : undefined;
    const poses = em ? bodyLanguageFor(em[0], em[1]) : (anim === 'calm' ? {} : null);
    const a = talking ? 'talk' : (ANIMS.includes(anim) ? anim : 'idle');
    if (actor.npc && actor.npc.setOverride) {
      actor.npc.setOverride({ anim: a, poses: poses || undefined, lookAt: { x: player.position.x, y: player.position.y + 1.5, z: player.position.z } });
    } else {
      h.setAnim(a);
      if (poses) h.setPoses(poses);
    }
    if (h.aura && !actor.npc) { if (em && showAuras()) h.aura.setEmotion({ emotion: em[0], intensity: em[1] }); else if (anim === 'calm') h.aura.clear(); }
  }

  // ---- Zustand für Zurückspulen ----
  const snapshot = () => JSON.parse(JSON.stringify(Object.fromEntries(SNAP_PATHS.map((p) => [p, state.get(p)]))));
  function restore(s) {
    for (const p of SNAP_PATHS) state.set(p, s[p] === undefined ? undefined : JSON.parse(JSON.stringify(s[p])));
    const N = npcs();
    if (N && N.setHeat && s['session.hitze']) for (const [id, v] of Object.entries(s['session.hitze'])) N.setHeat(id, v);
    emit('puls:set', { value: dsl.puls(), zone: dsl.zone ? dsl.zone() : undefined, reason: 'rewind' });
  }

  // ---- Lauschen: der Satz entsteht Wort für Wort; Joystick, Sprung, Aktion oder Laufen brechen ab ----
  function lauschen({ who, text, tts, seconds = 4, anim, node }) {
    return new Promise((resolve) => {
      const actor = actorFor(who);
      applyAnim(actor, anim, { talking: true });
      const full = textOf(text);
      const words = full.split(/\s+/).filter(Boolean);
      const done = (ok) => {
        if (!lst.active) return;
        lst.active = false; off();
        if (current) current.lauschen = null;
        if (!ok) { ui.bubbles.clear(); if (audio) audio.play('error'); }
        applyAnim(actor, anim, { talking: false });
        resolve({ ok });
      };
      const p = ui.bubbles.say({ who, text: full, tts, anchor: actor ? actor.group : null, wait: false, seconds: seconds + 2.2, read: false, cls: 'is-lauschen' });
      const el = ui.bubbles.current && ui.bubbles.current.el;
      const textEl = el && el.querySelector('.bubble-text');
      let ring = null;
      if (el) { ring = document.createElement('div'); ring.className = 'lauschen-ring'; ring.innerHTML = `${icon('lauschen', { size: 20 })}<i></i>`; el.appendChild(ring); }
      if (textEl) textEl.textContent = '';
      let t = 0;
      const moved = () => {
        const m = input.state.move;
        return Math.hypot(m.x, m.y) > 0.25 || input.state.jump || input.state.action || input.state.power || player.speed > 0.4;
      };
      const off = game.addUpdate((dt, _t, real) => {
        if (!lst.active) return;
        if (moved()) { done(false); return; }
        t += real;
        const k = Math.min(1, t / seconds);
        if (textEl) textEl.textContent = words.slice(0, Math.max(1, Math.ceil(k * words.length))).join(' ');
        if (ring) ring.style.setProperty('--p', k.toFixed(3));
        if (k >= 1) {
          if (ring) ring.remove();
          if (speech && speech.settings.autoRead && speech.canRead(who)) speech.speak(tts || full, { who, auto: true });
          done(true);
        }
      }, { order: 50 });
      const lst = { active: true, abort: () => done(false) };
      if (current) current.lauschen = lst;
      p.then(() => { /* Blase lief ab */ });
    });
  }

  // ---- Zeichen-Kanal: Emote der Spielfigur (+ Summen) statt Worte ----
  async function sign(emote, { hum } = {}) {
    emit('dialogue:sign', { emote, hum: hum || null });
    if (audio && hum && audio.has && audio.has('summen')) audio.play('summen', { tone: hum });
    if (EMOTE_NAMES.includes(emote) && player.humanoid && player.humanoid.playEmote) await player.humanoid.playEmote(emote, { seconds: Math.min(2.2, 1.6) });
  }

  // ---- Hilfe holen: eine erwachsene Figur kommt, die Szene pausiert, Puls −50 (immer, Gesetz 8) ----
  async function hilfe(cast) {
    const notfall = state.get('ampel.notfall');
    const adult = (notfall && content.get('npcs', notfall) && notfall) || 'ilda';
    const P = game.plugins && game.plugins.puls;
    if (P && typeof P.hilfeHolen === 'function') await P.hilfeHolen({ adult, cast });
    else {
      await ui.say({ who: adult, text: 'Ich bin da. Erzähl in Ruhe.', wait: true });
      dsl.setPuls(dsl.puls() + HILFE_PULS, 'hilfe');
    }
    for (const id of cast || []) dsl.setHitze(id, dsl.hitze(id) + HILFE_HITZE, 'hilfe');
    emit('hilfe:holen', { npc: adult, cast, puls: dsl.puls() });
  }

  // ---- Satz-Bau: Minispiel-Plugin (WP37) oder Ersatz mit Kacheln je Slot ----
  function satzbau(id, { who } = {}) {
    const def = content.get('minigames', id);
    const M = game.plugins && game.plugins.minigames;
    if (M && typeof M.play === 'function') return M.play(id, { satzbau: true, who });
    if (!def || !Array.isArray(def.slots)) return Promise.resolve({ clean: false, missing: true });
    return new Promise((resolve) => {
      const picked = {};
      let finished = false;
      const finish = async (r) => {
        if (finished) return; finished = true;
        const out = def.outcome || {};
        if (r.clean && out.clean) await applyEffects(out.clean, dsl);
        if (r.thorn && out.thorn) await applyEffects(out.thorn, dsl);
        emit('satzbau:result', { id, ...r });
        resolve(r);
      };
      const h = ui.overlay.open({
        id: 'satzbau', title: textOf(def.title) || 'Satz-Bau', icon: def.icon || 'horn', kind: 'sheet', pause: true, cls: 'ov-satzbau',
        content: (body) => {
          body.innerHTML = `${def.intro ? `<p class="jn-lead">${esc(textOf(def.intro))}</p>` : ''}${def.slots.map((s) => `<section class="sb-slot" data-slot="${esc(s.id)}"><h4>${esc(textOf(s.label))}</h4><div class="sb-tiles">${s.tiles.map((t, i) => `<button class="sb-tile" type="button" data-tile="${i}"><span>${esc(textOf(t.t || t))}</span>${speech && speech.available ? `<span class="choice-read" data-read role="button" aria-label="Vorlesen">${icon('lautsprecher', { size: 20 })}</span>` : ''}</button>`).join('')}</div></section>`).join('')}<p class="sb-result" data-result></p><div class="ov-actions"><button class="btn btn-primary btn-big" type="button" data-klang disabled>${icon('horn', { size: 26 })}<span>Klang</span></button></div>`;
          const klang = body.querySelector('[data-klang]');
          body.querySelectorAll('.sb-slot').forEach((sec) => {
            const sid = sec.dataset.slot;
            const slot = def.slots.find((s) => s.id === sid);
            sec.querySelectorAll('[data-tile]').forEach((b) => b.addEventListener('click', (e) => {
              const tile = slot.tiles[+b.dataset.tile];
              if (e.target.closest('[data-read]')) { if (speech) speech.speak(textOf(tile.t || tile), { who: 'du', interrupt: true }); return; }
              if (audio) audio.play('tile');
              picked[sid] = tile;
              sec.querySelectorAll('[data-tile]').forEach((x) => x.classList.toggle('is-on', x === b));
              klang.disabled = Object.keys(picked).length < def.slots.length;
              if (game.music && game.music.klarklang && def.ruleset === 'klarklang') game.music.klarklang(tile.thorn ? 'dissonant' : 'konsonant');
            }));
          });
          klang.addEventListener('click', () => {
            const tiles = Object.values(picked);
            const thorn = tiles.some((t) => t.thorn);
            const clean = !thorn && tiles.every((t) => t.ok !== false);
            const res = body.querySelector('[data-result]');
            res.className = 'sb-result ' + (thorn ? 'is-thorn' : clean ? 'is-clean' : '');
            res.textContent = thorn ? 'Schiefer Ton. Das prallt ab.' : clean ? 'Klar. Das trägt.' : 'Fast. Etwas fehlt.';
            if (game.music && game.music.klarklang) game.music.klarklang(thorn ? 'dissonant' : 'konsonant');
            if (audio) audio.play(thorn ? 'error' : 'pickup');
            setTimeout(() => h.close('done'), 900);
            finish({ clean, thorn, picked: Object.fromEntries(Object.entries(picked).map(([k, t]) => [k, textOf(t.t || t)])) });
          });
        },
        onClose: (reason) => { if (reason !== 'done') finish({ clean: false, thorn: false, cancelled: true }); },
      });
    });
  }

  // ---- Minispiel: Hülle aus WP36 oder Ersatzkarte (Start → Bronze), onHit-Wirkungen je Schlag ----
  function minigame(id, { choice, node, who } = {}) {
    const def = content.get('minigames', id);
    const M = game.plugins && game.plugins.minigames;
    if (M && typeof M.play === 'function') return M.play(id, { choice, node, who });
    if (!def) return Promise.resolve({ ok: false, missing: true });
    emit('minigame:fallback', { id });
    return new Promise((resolve) => {
      let finished = false;
      const finish = async (r) => {
        if (finished) return; finished = true;
        if (r.ok && def.params && Array.isArray(def.params.onHit)) {
          const mode = state.get('settings.mode', 'abenteuer');
          const beats = (def.modes && def.modes[mode] && def.modes[mode].beats) || 8;
          const hits = Math.max(1, Math.round(beats * (r.hits || 0.75)));
          for (let i = 0; i < hits; i++) await applyEffects(def.params.onHit, dsl);
          r.hits = hits / beats;
        }
        if (r.ok) { const cur = state.get('medals.' + id) || {}; if (!cur.medal || cur.medal === 'bronze') state.set('medals.' + id, { ...cur, medal: r.medal || 'bronze', best: cur.best || null }); }
        resolve(r);
      };
      const h = ui.overlay.open({
        id: 'minigame', title: textOf(def.title) || id, icon: def.icon || 'medaille', kind: 'panel', pause: true, cls: 'ov-minigame',
        content: (body) => {
          body.innerHTML = `<div class="mg-card"><span class="mg-icon">${icon(def.icon || 'medaille', { size: 44 })}</span><p class="ov-text">${esc(textOf(def.intro) || 'Bereit?')}</p><div class="mg-bar"><i></i></div><div class="ov-actions"><button class="btn btn-primary btn-big" type="button" data-los>${icon('play', { size: 26 })}<span>Los</span></button></div></div>`;
          body.querySelector('[data-los]').addEventListener('click', () => {
            if (audio) audio.play('tile');
            body.querySelector('[data-los]').disabled = true;
            const bar = body.querySelector('.mg-bar i');
            const t0 = performance.now();
            const tick = () => { const p = Math.min(1, (performance.now() - t0) / 1400); bar.style.width = (p * 100).toFixed(0) + '%'; if (p < 1) requestAnimationFrame(tick); else { if (audio) audio.play('pickup'); setTimeout(() => h.close('done'), 300); finish({ ok: true, medal: 'bronze', hits: 0.75, fallback: true }); } };
            requestAnimationFrame(tick);
          });
        },
        onClose: (reason) => { if (reason !== 'done') finish({ ok: false, cancelled: true }); },
      });
    });
  }

  // ---- Kontext für die Engine ----
  function makeCtx(def) {
    return {
      puls: () => dsl.puls(), setPuls: (v) => dsl.setPuls(v),
      hasHilfe: () => (state.get('upgrades', []) || []).includes('ruhe.puls') || (state.get('abilities', []) || []).includes('ruhe'),
      hitze: (n) => dsl.hitze(n), setHitze: (n, v, r) => dsl.setHitze(n, v, r),
      evalCond: (c) => evalCond(c, dsl), applyEffects: (l) => applyEffects(l, dsl),
      snapshot, restore,
      async say({ who, text, tts, anim, sign: sg, node, brief }) {
        const actor = actorFor(who, def.cast ? Math.max(0, def.cast.indexOf(who)) : 0);
        applyAnim(actor, anim, { talking: true });
        if (sg && actor && actor.humanoid && EMOTE_NAMES.includes(sg)) actor.humanoid.playEmote(sg, {});
        const t = textOf(text);
        if (t) await ui.say({ who, text, tts, anchor: actor ? actor.group : null, wait: !brief, seconds: brief ? 1.6 : undefined });
        else if (sg) await new Promise((r) => setTimeout(r, 900));
        applyAnim(actor, anim, { talking: false });
      },
      async ask({ items, system, rewind, node }) {
        setBar(true, !!rewind);
        const r = await ui.ask({
          items: items.map((it) => ({ id: it.id, label: it.label, tts: it.tts, icon: it.sign ? (EMOTE_ICON[it.sign] || 'hand') : it.icon, tone: it.deckel ? 'deckel' : (it.sign ? 'zeichen' : it.tone || undefined) })),
          system: { rueckzug: true, hilfe: system && system.hilfe === true ? true : 'auto' },
        });
        if (r.cancelled === 'rewind') return { rewind: true };
        if (r.cancelled) return { exit: true };
        if (r.system) return { system: r.system };
        return { index: r.index };
      },
      lauschen, satzbau, minigame, sign, hilfe,
      cancel(reason) { ui.bubbles.clear(); ui.choices.cancel(reason); if (current && current.lauschen) current.lauschen.abort(); },
      emit,
    };
  }

  const api = {
    get current() { return current ? { id: current.id, node: current.d.node, history: current.d.history } : null; },
    get isOpen() { return !!current; },
    actor(id) { return current ? current.actors.get(id) || null : null; },
    // Szene abspielen: id oder DialogueDef
    async play(idOrDef, opts = {}) {
      const def = typeof idOrDef === 'string' ? content.get('dialogues', idOrDef) : idOrDef;
      if (!def) { console.warn('[dialog] unbekannt:', idOrDef); return { end: true, reason: 'fehlt' }; }
      if (current) api.exit('replace');
      current = { id: def.id, def, d: null, actors: new Map(), standins: [], opts, lauschen: null };
      ui.lock.acquire('dialog');
      if (game.interactions && game.interactions.lock) game.interactions.lock(0.6);
      setBar(true, false);   // Verlassen ist von der ersten Blase an möglich (Gesetz 8)
      const first = def.cast && def.cast[0] ? actorFor(def.cast[0], 0) : null;
      if ((def.camera || 'talk') === 'talk' && first && cameraRig.setMode) cameraRig.setMode('talk', { target: first.group, side: opts.side || 1 });
      if (first && first.humanoid && first.humanoid.lookAt) first.humanoid.lookAt({ x: player.position.x, y: player.position.y + 1.5, z: player.position.z });
      if (game.music && game.music.setIntensity) game.music.setIntensity(0.8);
      emit('dialogue:open', { id: def.id, cast: def.cast || [] });
      const d = createDialogue(def, makeCtx(def));
      current.d = d;
      const res = await d.start();
      close(res.reason);
      return res;
    },
    exit(reason = 'exit') { if (!current || !current.d) return false; current.d.exit(reason); return true; },
    rewind() { if (!current || !current.d) return false; ui.choices.cancel('rewind'); return true; },
    // Auch außerhalb einer Szene nutzbar (Quest-Schritte pruefung/bauen, Nachtwache): Minispiel-Ersatz, Satz-Bau, Hilfe holen
    minigame, satzbau, hilfe,
  };
  function close(reason) {
    if (!current) return;
    const c = current; current = null;
    setBar(false, false);
    ui.bubbles.clear(); ui.choices.cancel('close');
    for (const a of c.actors.values()) { if (a.npc && a.npc.clearOverride) a.npc.clearOverride(); if (a.npc && a.npc.face) a.npc.face(null); }
    for (const a of c.standins) { if (a.humanoid && a.humanoid.aura) a.humanoid.aura.clear(); if (a.remove) a.remove(); }
    if (cameraRig.setMode) cameraRig.setMode(null);
    if (game.music && game.music.setIntensity) game.music.setIntensity(1);
    ui.lock.release('dialog');
    if (game.interactions && game.interactions.lock) game.interactions.lock(0.6);
    emit('dialogue:close', { id: c.id, reason });
  }
  // Pause/X oder Sicherheit: eine Szene wird sofort verlassen, wenn das Pause-Menü „Für heute Schluss“ wählt
  events.on('session:end', () => { if (current) api.exit('exit'); });
  events.on('state:reset', () => { if (current) api.exit('abbruch'); });
  return api;
}

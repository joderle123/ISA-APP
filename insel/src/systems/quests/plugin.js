// Quest-Plugin (WP31): Quest-Engine mit Welt-Adapter – Zustände gesperrt/kurz/offen/aktiv/fertig, Schritte aus den 12
// Vorlagen, Marker (Lichtsäule + Kompass), Belohnungen (Teil-Farbwelle je Einheit, Aufnäher mit Rückseite, Glimm-Zeile,
// Echte-Welt-Karte mit Stich), Hinweisleiter (2 → Puls −20 + Windschatten-Stein, 3 → Glimm, 5 → Ziel leuchtet,
// 8 → Überspringen), Taten-Log, Echos (nur positiv oder mit Reparatur), Kurzfassung, Tagebuch-Seiten.
//   game.quests = game.plugins.quests → Engine-API (engine.js) + { markers, ctx, dsl }
//   Ereignisse: siehe engine.js; dazu echteWelt:stitch {unit} · quest:rueckenwind {step} · puls:cap {value}
//   Debug: LUMO.debug.startQuest(id) · startKurz(id) · offerQuest(id) · completeStep() · failStep(reason) · skipStep()
//     · completeQuest(id) · questInfo() · addDeed(id, npc) · checkEchoes() · questMarker()
//   Szenario: 'code welle' 'expect state.units.j1-e11 == aktiv' 'call questInfo' 'call failStep sturz' 'call completeStep'
import { createQuestEngine } from './engine.js';
import { createMarkers } from './markers.js';
import { installQuestPages, PAGES_CSS } from './pages.js';
import { evalCond, applyEffects } from './dsl.js';
import { createWorldDsl } from './worlddsl.js';
import { esc } from '../../ui/overlay.js';

export default {
  id: 'quests', order: 62, deps: ['ui', 'dialogue'],
  install(game) {
    const { events, state, content, ui, player, audio } = game;
    const dsl = game.dsl || (game.dsl = createWorldDsl(game));
    const emit = (n, p) => events.emit(n, p);
    if (typeof document !== 'undefined') { const st = document.createElement('style'); st.dataset.quests = '1'; st.textContent = PAGES_CSS; document.head.appendChild(st); }
    const markers = createMarkers({ game });
    let rueckenwind = null;

    // ---- Welt-Adapter für die Vorlagen (templates.js) ----
    const npcs = () => game.npcs || (game.plugins && game.plugins.npcs) || null;
    const ctx = {
      resolvePos(pos) {
        if (!pos) return null;
        const r = content.resolveSite(pos);
        if (r) return { x: r.x, z: r.z, y: r.y, r: r.r };
        if (typeof pos === 'object' && typeof pos.x === 'number') return { x: pos.x, z: pos.z, y: pos.y, r: pos.r };
        return null;
      },
      player() { const p = player.position; return { x: p.x, y: p.y, z: p.z, speed: player.speed, sprinting: !!player.sprinting, state: player.state, yaw: player.yaw }; },
      marker(target, opts = {}) { if (target) markers.set(target, opts); else markers.clear(); },
      // Szene: die Bühne (dialogue/stage.js) holt die Figur (WP34) in Gesprächsabstand
      dialogue(id, opts = {}) { return game.dialogue.play(id, opts); },
      minigame(id, opts) { return game.dialogue.stage.minigame(id, opts); },
      // Erinnerung (WP54) – bis dahin eine Bildkarte mit der Bildunterschrift, Splitter aus der MemoryDef
      async memory(id) {
        const C = game.plugins && game.plugins.chronik;
        if (C && typeof C.show === 'function') return C.show(id);
        const def = content.get('memories', id);
        if (!def) return { memory: id, missing: true };
        await new Promise((resolve) => {
          const h = ui.overlay.open({ id: 'erinnerung', title: 'Eine Erinnerung', icon: 'splitter', kind: 'dark', pause: true, cls: 'ov-recap',
            content: (body) => { body.innerHTML = `<div class="recap-cards"><article class="recap-card is-in" style="--card:${esc((def.filter && def.filter.tint) || '#ffd166')}"><div class="recap-art">${ui.icon('splitter', { size: 64 })}</div><small class="recap-kicker">Splitter ${esc(String(def.shard))}</small><h3>${esc(typeof def.caption === 'object' ? def.caption.t : def.caption)}</h3></article></div><div class="ov-actions"><button class="btn btn-primary btn-big" type="button" data-ok>${ui.icon('check', { size: 26 })}<span>Weiter</span></button></div>`; body.querySelector('[data-ok]').addEventListener('click', () => h.close('ok')); },
            onClose: () => resolve() });
        });
        if (def.shard) await applyEffects([{ shard: def.shard }], dsl);
        return { memory: id, shard: def.shard };
      },
      nachtwache(pool, opts) { const N = game.plugins && game.plugins.nachtwache; if (N && typeof N.play === 'function') return N.play(pool, opts); return Promise.resolve({ id: pool[0], fit: true, fallback: true }); },
      enterRoom(id, spawn) { return game.scenes ? game.scenes.enter(id, { spawn: spawn || 'eingang' }) : Promise.resolve(null); },
      exitRoom() { return game.scenes ? game.scenes.exit({}) : Promise.resolve(null); },
      lotsen(params) { const M = game.plugins && game.plugins.minigames; return M && typeof M.lotsen === 'function' ? M.lotsen(params) : null; },
      interaction(o) { return game.interactions.add(o); },
      spawn(type, opts) { if (!game.props || !game.props.types.includes(type)) return null; try { return game.props.spawn(type, opts); } catch (e) { console.warn('[quest] Requisite', type, e); return null; } },
      // Tier: einer der sechs Gefühlsvögel (world.birds) oder ein Ort
      creature(id, params) {
        const B = game.props && game.props.BIRDS;
        const emotion = B ? Object.keys(B).find((k) => B[k].id === id || k === id) : null;
        const h = emotion && game.world.birds ? game.world.birds.find((b) => b.emotion === emotion) : null;
        if (h) return { get x() { return h.group.position.x; }, get z() { return h.group.position.z; }, handle: h, flee() { if (h.life) { h.life.mode = 'fliegen'; h.life.phase = 0; h.life.t = 999; if (h.pose) h.pose('fliegen'); } }, hop() { if (h.life) { h.life.px += 3; h.life.pz -= 2; h.group.position.x = h.life.px; h.group.position.z = h.life.pz; } } };
        return params && params.pos ? ctx.resolvePos(params.pos) : null;
      },
      carry(def) { return player.carry ? player.carry(def) : null; },
      drop() { if (player.drop) player.drop(); },
      carrying() { return !!player.carrying; },
      on(ev, fn) { return events.on(ev, fn); },
      glimm(t, o) { return ui.glimm(t, o); },
      toast(t) { return ui.toast(t); },
      say(o) { return ui.say(o); },
      pulsCap(v) { state.set('session.pulsCap', v === null || v === undefined ? null : Number(v)); emit('puls:cap', { value: v === undefined ? null : v }); },
      evalCond: (c) => evalCond(c, dsl),
      applyEffects: (l) => applyEffects(l, dsl),
      minMedal(id) { const m = content.get('minigames', id); return (m && m.story && m.story.minMedal) || 'bronze'; },
      failForward(id) { const m = content.get('minigames', id); return !(m && m.story && m.story.failForward === false); },
      gateOpen(id) { return !!state.get('gates.' + id); },
      npcPos(id) { const N = npcs(); const n = N && N.get ? N.get(id) : null; return n && n.group ? { x: n.group.position.x, z: n.group.position.z, r: 3 } : null; },
      // Rückenwind: ein Windschatten-Stein erscheint vor der Figur (Hinweisleiter Stufe 2)
      rueckenwind({ step }) {
        ctx.clearRueckenwind();
        const yaw = player.yaw || 0, p = player.position;
        const x = p.x + Math.sin(yaw) * 3.2, z = p.z + Math.cos(yaw) * 3.2;
        rueckenwind = ctx.spawn('menhir', { id: 'rueckenwind', x, z, yaw: -yaw, height: 2.2 });
        emit('quest:rueckenwind', { step, x, z });
        if (audio && audio.has('chime')) audio.play('chime');
      },
      clearRueckenwind() { if (rueckenwind && rueckenwind.remove) rueckenwind.remove(); rueckenwind = null; },
      markerGlow(v) { markers.setGlow(v); },
      offerSkip({ optional, label }) { return ui.overlay.confirm({ title: 'Überspringen?', text: optional ? 'Der Teil ist freiwillig. Geht später nochmal.' : 'Geht später nochmal. Nichts geht verloren.', yes: 'Überspringen', no: 'Weiter versuchen', icon: 'weiter' }); },
      emit,
    };

    const engine = createQuestEngine({ content, state, ctx, dsl, emit, session: () => Number(state.get('sessions', 1)) || 1 });
    dsl.hooks.quest = (v) => { const [op, id] = v; if (op === 'start') return engine.start(id); if (op === 'offer') return engine.offer(id); if (op === 'complete') return engine.complete(id); return false; };
    dsl.hooks.echo = (def) => engine.echoes.register(def);
    dsl.hooks.patch = (unit) => { state.push('session.newPatches', unit); applyPatches(); };
    dsl.hooks.shard = (n) => { if (ui.toast) ui.toast(`Splitter ${n} gefunden.`); if (audio) audio.play('pickup'); };

    // ---- Aufnäher auf dem Hoodie (Avatar-Pipeline: config.patches) ----
    function applyPatches() {
      const list = state.get('patches', []) || [];
      if (!list.length || !game.avatar || !game.avatar.look) return;
      try { player.setLook({ ...game.avatar.look(), patches: list.slice(0, 39) }); } catch (e) { /* Look bleibt */ }
    }
    events.on('avatar:change', () => { if ((state.get('patches', []) || []).length) applyPatches(); });

    // ---- Verdrahtung ----
    events.on('unit:unlock', (e) => { if (!e || !e.id || e.demo || e.module) return; engine.onUnitState(e.id, 'offen'); });   // Demo-/Modul-Codes laufen über state.on('units')
    state.on('units', (e) => { const parts = e.path.split('.'); if (parts.length === 2 && e.value) engine.onUnitState(parts[1], e.value); });
    events.on('player:fail', (e) => { if (engine.active && !game.dialogue.isOpen) engine.failStep((e && e.kind) || 'fehlschlag'); });
    events.on('player:respawn', (e) => { if (engine.active && !game.dialogue.isOpen) engine.failStep((e && e.reason) || 'sturz'); });
    events.on('echteWelt:answer', (e) => {
      if (!e || !e.unit || state.get('stiche.' + e.unit)) return;
      state.set('stiche.' + e.unit, 1);
      emit('echteWelt:stitch', { unit: e.unit, answer: e.answer });
      if (ui.toast) ui.toast('Ein Stich auf dem Aufnäher.');
    });
    events.on('quest:marker', (e) => { if (e && e.target) markers.set(e.target, { color: '#ffd166' }); else markers.clear(); });
    events.on('quest:start', (e) => { const d = engine.get(e.id); if (d && ui.toast && game.started) ui.toast(`${e.kurz ? 'Kurzfassung' : 'Neuer Auftrag'}: ${d.title}`); });
    events.on('quest:complete', (e) => { const d = engine.get(e.id); if (d && ui.toast && !e.kurz) ui.toast(`Aufnäher: ${d.title}`); if (audio && !e.kurz) audio.play('pickup'); });
    events.on('quest:step', () => { if (ui.journal && ui.journal.isOpen && ui.journal.current === 'auftraege') ui.journal.refresh(); });
    events.on('quest:hint', (e) => { if (e.stage === 'rueckenwind' && ui.toast) ui.toast('Rückenwind. Windstille da vorne.', 2200); });
    let started = false;
    const boot = () => { if (started) return; started = true; state.inc('sessions'); engine.resume(); };
    if (game.started) boot(); else events.on('game:start', boot);
    events.on('state:reset', () => { markers.clear(); ctx.clearRueckenwind(); if (started) engine.resume(); });
    events.on('save:load', () => { if (started) engine.resume(); });
    game.addUpdate((dt, t) => { engine.update(dt); markers.update(dt, t); }, { order: 40 });

    // ---- Tagebuch ----
    installQuestPages({ journal: ui.journal, game, quests: engine, audio, icon: ui.icon, speech: game.speech || null });
    events.on('quest:step:done', () => { if (ui.journal && ui.journal.isOpen) ui.journal.refresh(); });

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.startQuest = (id) => engine.start(id);
    D.startKurz = (id) => engine.startKurz(id);
    D.offerQuest = (id) => engine.offer(id);
    D.completeStep = () => engine.completeStep();
    D.failStep = (reason) => engine.failStep(reason || 'debug');
    D.skipStep = () => engine.skipStep();
    D.completeQuest = (id) => engine.complete(id || engine.active);
    D.questInfo = () => { const i = engine.stepInfo(); return { active: engine.active, running: engine.running, step: i && i.step ? i.step.id : null, index: i ? i.index : -1, kurz: !!(i && i.kurz), progress: engine.active ? engine.progress() : null, marker: markers.target, glow: markers.glow, fails: engine.active && i && i.step ? engine.hints.failsOf(i.step.id) : 0 }; };
    D.questMarker = () => markers.target;
    D.addDeed = (id, npc) => engine.deeds.add(id, { npc });
    D.checkEchoes = () => engine.echoes.check();

    const api = Object.assign(engine, { markers, ctx, dsl });
    game.quests = api;
    return api;
  },
};

// Figuren-System (WP34): Spawn aus NpcDefs (content/npcs/*) mit Namensschild, Dorfleute je Zone (RegionDef.ambient oder
// Standard), Tagesabläufe, Gefühlsmodell, Tanks, Grenz-Radien, Streit-Stile, Bindung 0–3 (nie dauerhaft sinkend,
// „verstimmt“ mit Reparatur), Körpersprache, Sichtbudget (höchstens 12 animierte Figuren, Rest lite/ausgeblendet),
// Umbenennung (state.names.<id>, gilt in Schild, Blasen, Lagerfeuer).
//   game.npcs = game.plugins.npcs → { list(), get(id), main(), defs, spawn(def), remove(id), nameOf(id), rename(id, name|null),
//     emotion(id), setEmotion(id, {…}), nudge(id, emotion, ±n), heat(id, ±n), setHeat(id, v), tanks(id), tank(id, tank, add, {kind}),
//     bond(id), bondAdd(id, ±n, {cause, repair}), repair(id), isVerstimmt(id), boundary(id), streitStil(id, vs), tell(id),
//     wege(), hasWeg(id), jackePatches(), bondRewards(id, level),
//     applyEffect(effect), talk(id), deed(npcId, deedId, text?), near(radius), inBoundary(id), stats(), view, MAX_ANIMATED }
//   Bindung (DESIGN §9): Stufe 2 → NpcDef.bond.ability.id landet in state.wege (Wegfähigkeit, Figur sagt bond.ability.say),
//     Stufe 3 → bond.jacket in state.jackePatches (Aufnäher der Crew-Jacke) und bond.finale als Lagerfeuer-Satz (Tat <id>-bindung-3).
//   Ereignisse: npc:spawn {id} · npc:talk {id, npc, handled} · npc:emotion {id, snapshot} · npc:tank {id, tank, value, kind}
//     bond:change {npc, level, prev} · bond:ability {npc, id, level, say} · bond:jacket {npc, patch, icon, color}
//     npc:verstimmt {npc, cause, repair} · npc:repaired {npc} · npc:rename {id, name}
//     npc:deed {npc, deed} · npc:boundary {id, inside} (Grenz-Radius betreten/verlassen)
//   Spielstand: npcs.<id> = { emotion, tanks } · names.<id> · bonds.<id> · moods.<id> · deeds[] · wege[] · jackePatches[]
//   Debug: LUMO.debug.npc(id) · npcList() · setNpcEmotion(id, e, i, e2?, i2?) · npcHeat(id, v) · npcTank(id, tank, add, kind)
//     · renameNpc(id, name) · npcBond(id, ±n) · npcLod() · wege()
import * as THREE from 'three';
import { createNpc } from './npc.js';
import { createBonds, auraView, pickAnimated, displayName, tellFor, streitStilFor, bondRewardsFor, MAX_ANIMATED, TANKS, HEAT_CAP_OFF } from './model.js';
import { randomConfig } from '../../actors/humanoid/index.js';

// Dorfleute: Rollen statt Namen (keine Namenskollisionen mit Kindern der Gruppe), Icons aus ui/icons.js
const AMBIENT_ROLES = [
  ['Fischerin', 'boot', '#4d8cff'], ['Bäcker', 'sonne', '#ffb347'], ['Kioskfrau', 'glas', '#ff8ccf'], ['Nachbar', 'haengematte', '#8fd18b'],
  ['Lotsin', 'kompass', '#ffd166'], ['Läufer', 'sprint', '#2de2c9'], ['Gärtnerin', 'giesskanne', '#6fae5a'], ['Surfer', 'surfbrett', '#ff8c42'],
  ['Musikerin', 'trommel', '#ff4f8b'], ['Handwerker', 'hammer', '#d8a26b'], ['Sammlerin', 'muschel', '#39d0c8'], ['Wanderer', 'karte', '#b06bff'],
  ['Malerin', 'spraydose', '#c9b37a'], ['Koch', 'feuer', '#ff6b3d'], ['Leserin', 'buch', '#8fa3ff'], ['Bootsjunge', 'anker', '#5ad8ff'],
];
const AMBIENT_DEFAULT = { hafen: 10, strand: 4, dschungel: 2, klippen: 1, moor: 1, markt: 6, vulkan: 2, leuchtturm: 0 };
const DEFAULT_LOOK = { topStyle: 'tshirt' };

export default {
  id: 'npcs', order: 36, deps: ['welt'],
  install(game) {
    const { events, state, content, player, scene, camera } = game;
    const island = game.world.island;
    const emit = (n, p) => events.emit(n, p);
    const root = new THREE.Group(); root.name = 'npcs'; scene.add(root);
    const npcs = new Map();      // id → npc
    const defs = new Map();      // id → def
    const interactions = new Map();
    const day = () => state.get('time.day', 1);
    const namesOf = () => state.get('names') || {};
    const bonds = createBonds(state, { day, emit });
    let view = auraView({});
    let lodT = 0, saveT = 0, hiddenT = 0;
    let lastInside = new Set();

    // ---- Orte auflösen (Insel-SITES, Regionen, Koordinaten) ----
    const resolveSite = (s) => {
      const r = content.resolveSite(s);
      if (r) return r;
      if (typeof s === 'string' && island.zoneById(s)) { const z = island.zoneById(s); return { x: z.spawn.x, z: z.spawn.z, r: 4 }; }
      return null;
    };

    // ---- Spawn ----
    function spawn(def, { look } = {}) {
      if (!def || !def.id) return null;
      if (npcs.has(def.id)) remove(def.id);
      defs.set(def.id, def);
      const rng = game.rng.fork('npc-' + def.id);
      const npc = createNpc({ game, def, root, resolveSite, look: look || def.look || DEFAULT_LOOK, rng, names: namesOf });
      npcs.set(def.id, npc);
      restoreOne(npc);
      // erste Platzierung nach dem Tagesablauf
      npc.update(0, { hour: game.time.hour, camera, playerPos: player.position, view, bond: bonds.get(def.id), verstimmt: bonds.isVerstimmt(def.id) });
      if (!def.ambient && game.interactions) {
        const it = game.interactions.add({
          id: 'npc-' + def.id, x: () => npc.position.x, z: () => npc.position.z, y: undefined,
          radius: 2.6, label: 'Reden', priority: 1,
          onAction: () => api.talk(def.id),
        });
        interactions.set(def.id, it);
      }
      emit('npc:spawn', { id: def.id, ambient: !!def.ambient });
      return npc;
    }
    function remove(id) {
      const n = npcs.get(id);
      if (!n) return false;
      n.dispose(); npcs.delete(id);
      const it = interactions.get(id); if (it) { it.remove(); interactions.delete(id); }
      return true;
    }
    // Dorfleute je Zone: deterministisch aus festen Seeds (stabile IDs, unabhängig vom Spielstand)
    function ambientDefs() {
      const out = [];
      const regions = content.list('regions');
      for (const Z of island.ZONES) {
        const region = regions.find((r) => r.id === Z.id || (r.veil && r.veil.zone === Z.id));
        const amb = region && region.ambient;
        const count = amb ? Number(amb.count) || 0 : (AMBIENT_DEFAULT[Z.id] || 0);
        if (!count) continue;
        const seed = (amb && amb.seed) || 41;
        const sites = Object.entries(island.SITES).filter(([, s]) => s.zone === Z.id && s.r > 0 && !s.interior).map(([k]) => k);
        if (!sites.length) sites.push(Z.id);
        const R = createFixedRng(seed * 977 + Z.id.length);
        for (let i = 0; i < count; i++) {
          const role = AMBIENT_ROLES[(i + seed) % AMBIENT_ROLES.length];
          const a = sites[R.int(0, sites.length - 1)], b = sites[R.int(0, sites.length - 1)], c = sites[R.int(0, sites.length - 1)];
          const anims = ['idle', 'idle', 'think', 'sit', 'talk'];
          const look = randomConfig(R, { npc: true });
          out.push({
            id: `dorf-${Z.id}-${i + 1}`, ambient: true, zone: Z.id, name: role[0], icon: role[1], color: role[2], renameable: false, look,
            schedule: [
              { from: 6, to: 12, site: a, anim: anims[R.int(0, anims.length - 1)] },
              { from: 12, to: 18, site: b, anim: anims[R.int(0, anims.length - 1)] },
              { from: 18, to: 23, site: c, anim: anims[R.int(0, anims.length - 1)] },
              { from: 23, to: 6, site: a, hidden: true },
            ],
            emotion: { base: { primary: [['freude', 'freude', 'ueberraschung', 'trauer', 'freude'][R.int(0, 4)], R.int(2, 6)] } },
            lines: { greet: ['Moien.', 'Hallo.', 'Schöner Tag, oder?', 'Alles gut hier.'] },
          });
        }
      }
      return out;
    }
    function spawnAll() {
      for (const def of content.list('npcs')) spawn(def);
      for (const def of ambientDefs()) spawn(def);
    }

    // ---- Zustand (Spielstand) ----
    function restoreOne(npc) {
      const saved = state.get('npcs.' + npc.id);
      if (saved) { npc.emotion.fromJSON(saved.emotion); npc.tanks.fromJSON(saved.tanks); }
      else { npc.emotion.set({ ...npc.emotion.base, hold: 0 }); npc.tanks.fromJSON({ wishes: [], needs: [], day: day() }); }
      npc.setName(displayName(npc.def, namesOf()));
    }
    function capture(d) {
      const out = {};
      for (const n of npcs.values()) if (!n.def.ambient) out[n.id] = { emotion: n.emotion.toJSON(), tanks: n.tanks.toJSON() };
      d.npcs = out;
    }
    game.save.onCapture(capture);
    events.on('state:reset', () => { for (const n of npcs.values()) restoreOne(n); refreshView(); });
    state.on('names', () => { for (const n of npcs.values()) n.setName(displayName(n.def, namesOf())); });
    events.on('day:new', (e) => { const d = (e && e.day) || day(); for (const n of npcs.values()) n.tanks.morning(d); });
    events.on('bond:change', (e) => { const n = e && npcs.get(e.npc); if (n) n.tag.set({}); });
    // Belohnungen bei jeder Änderung von state.bonds.<id> (eigene Züge, Quest-Engine, Debug) – jede genau einmal
    state.on('bonds', (e) => { const parts = String(e.path).split('.'); if (parts.length === 2 && parts[0] === 'bonds') bondRewards(parts[1], e.value); });

    // ---- Bindungs-Belohnungen (DESIGN §9): Stufe 2 schenkt eine Wegfähigkeit (state.wege), Stufe 3 einen Aufnäher
    //      für die Crew-Jacke (state.jackePatches) und eine Lagerfeuer-Geschichte (Tat <id>-bindung-3 mit dem Finale-Satz). ----
    function bondRewards(id, level) {
      const def = defs.get(id) || content.get('npcs', id);
      const plan = bondRewardsFor(def, level, { wege: state.get('wege', []), jackePatches: state.get('jackePatches', []), deeds: state.get('deeds', []) });
      const out = [];
      const live = game.started && game.ui;
      if (plan.weg) {
        state.addUnique('wege', plan.weg.id);
        out.push('weg');
        emit('bond:ability', { npc: id, id: plan.weg.id, level: Number(level) || 0, say: plan.weg.say });
        if (live && game.ui.toast) game.ui.toast(`Neuer Weg: ${api.nameOf(id)} zeigt dir was.`);
        if (live && game.audio && game.audio.play) game.audio.play('chime');
        if (live && game.ui.say && plan.weg.say) { const n = npcs.get(id); try { game.ui.say({ who: id, text: plan.weg.say, anchor: n ? n.group : undefined, wait: false, lock: false, seconds: 3.2 }).catch(() => {}); } catch (e) { /* egal */ } }
      }
      if (plan.jacket) {
        state.addUnique('jackePatches', plan.jacket);
        out.push('jacke');
        emit('bond:jacket', { npc: id, patch: plan.jacket, icon: (def && def.icon) || 'stern', color: (def && def.color) || '#ffd166' });
        if (live && game.ui.toast) game.ui.toast(`Aufnäher für die Crew-Jacke: ${api.nameOf(id)}`);
      }
      if (plan.story) { api.deed(id, plan.story.deedId, plan.story.text); out.push('geschichte'); }
      return out;
    }

    // ---- Blick-Stufen und Modus ----
    function refreshView() {
      view = auraView({ abilities: state.get('abilities', []), upgrades: state.get('upgrades', []), mode: state.get('settings.mode', 'abenteuer') });
    }
    for (const ev of ['ability:grant', 'mode:change', 'state:reset', 'core:ready']) events.on(ev, refreshView);
    state.on('abilities', refreshView); state.on('upgrades', refreshView); state.on('settings.mode', refreshView);
    refreshView();

    // Sichtbudget je Grafikstufe: niedrig = 6 animiert (eine volle Figur kostet ~20 Draw-Calls, WP16), sonst 12; Rest = Impostor (1 Call)
    function budget() {
      const q = game.quality ? game.quality.name : 'medium';
      return q === 'low' ? { animated: 6, liteDist: 45, hideDist: 120 } : q === 'medium' ? { animated: MAX_ANIMATED, liteDist: 60, hideDist: 150 } : { animated: MAX_ANIMATED, liteDist: 70, hideDist: 160 };
    }
    events.on('quality', () => { for (const n of npcs.values()) n.setLod(n.lod === 'full' ? 'lite' : n.lod); lodT = 0; });

    // ---- Schleife: Sichtbudget alle 0,25 s, Figuren jedes Frame ----
    const camDir = new THREE.Vector3();
    function updateLod() {
      const p = player.position;
      camera.getWorldDirection(camDir);
      const list = [];
      for (const n of npcs.values()) {
        const dx = n.position.x - camera.position.x, dz = n.position.z - camera.position.z;
        const dist = Math.hypot(n.position.x - p.x, n.position.z - p.z);
        const inView = (dx * camDir.x + dz * camDir.z) / (Math.hypot(dx, dz) || 1) > -0.25;
        list.push({ id: n.id, dist, inView, hidden: n.hidden && !n.override, priority: n.busy ? 1 : 0 });
      }
      const r = pickAnimated(list, budget().animated, budget());
      for (const n of npcs.values()) n.setLod(r.animated.has(n.id) ? 'full' : r.lite.has(n.id) ? 'lite' : 'hidden');
      return r;
    }
    game.addUpdate((dt) => {
      if (!game.started) return;
      if (game.scenes && game.scenes.isInterior) return;
      lodT -= dt; if (lodT <= 0) { lodT = 0.25; updateLod(); }
      const ctxBase = { hour: game.time.hour, camera, playerPos: player.position, view };
      hiddenT += dt;
      const doHidden = hiddenT >= 0.5;
      for (const n of npcs.values()) {
        n.emotion.tick(dt);
        if (n.lod === 'hidden' && !doHidden) continue;
        const id = n.id;
        n.update(n.lod === 'hidden' ? hiddenT : dt, { ...ctxBase, bond: bonds.get(id), verstimmt: bonds.isVerstimmt(id) });
      }
      if (doHidden) hiddenT = 0;
      // Grenz-Radius: betreten/verlassen (für Quests und Körpersignale)
      saveT += dt;
      if (saveT > 0.3) {
        saveT = 0;
        const inside = new Set();
        for (const n of npcs.values()) {
          if (n.def.ambient || n.lod === 'hidden') continue;
          const r = n.boundary(bonds.get(n.id));
          if (n.distTo(player.position) < r) inside.add(n.id);
        }
        for (const id of inside) if (!lastInside.has(id)) emit('npc:boundary', { id, inside: true, radius: npcs.get(id).boundary(bonds.get(id)) });
        for (const id of lastInside) if (!inside.has(id)) emit('npc:boundary', { id, inside: false });
        lastInside = inside;
      }
    }, { order: -9 });

    // ---- Gespräch (Rückfall ohne Dialog-Engine: Begrüßung als Blase) ----
    async function talk(id) {
      const n = npcs.get(id);
      if (!n) return false;
      const ev = { id, npc: n, handled: false };
      n.face(player.position);
      emit('npc:talk', ev);
      if (ev.handled || !game.ui || !game.ui.say) { return true; }
      const def = n.def;
      const lines = (def.lines && def.lines.greet) || ['Moien.'];
      const rng = game.rng.fork('greet-' + id + '-' + Math.floor(game.loop.time));
      let text = rng.pick(Array.isArray(lines) ? lines : [lines]);
      const mood = bonds.mood(id);
      if (mood && mood.kind === 'verstimmt') text = def.lines && def.lines.verstimmt ? def.lines.verstimmt : `Grad nicht. ${mood.cause ? 'Wegen ' + mood.cause + '.' : ''}`.trim();
      else if (n.emotion.get().capOff) text = (def.lines && def.lines.capOff) || 'Lass mich. Jetzt nicht.';
      const who = def.ambient ? { id, name: n.name, icon: def.icon, color: def.color, voice: def.voice || { pitch: 1, rate: 1 } } : id;
      const cam = game.cameraRig;
      if (cam && cam.setMode) cam.setMode('talk', { target: n.group, side: 1 });
      await game.ui.say({ who, text: typeof text === 'object' ? text.t : text, anchor: n.group });
      if (cam && cam.setMode) cam.setMode(null);
      n.face(null);
      return true;
    }

    // ---- Effekte (Teilmenge der Effekt-DSL, die Figuren betrifft) ----
    function applyEffect(e) {
      if (!e || typeof e !== 'object') return false;
      if (e.tank) { const t = e.tank; api.tank(t.npc, t.tank, t.add, { kind: t.kind || 'need' }); return true; }
      if (e.emotion) { const m = e.emotion; api.setEmotion(m.npc, { primary: m.primary, secondary: m.secondary, inner: m.inner }); return true; }
      if (e.npcHitze) {
        const [id, a, b] = e.npcHitze;
        if (a === 'set') api.setHeat(id, b); else if (a === '+' || a === '-') api.heat(id, a === '-' ? -Number(b) : Number(b));
        else if (typeof a === 'number' && a >= 60) api.setHeat(id, a); else api.heat(id, Number(a) || 0);
        return true;
      }
      if (e.bond) { const [id, d] = e.bond; api.bondAdd(id, d, { cause: e.cause, repair: e.repair }); return true; }
      if (e.mood) { const [id, kind, extra] = e.mood; if (kind === 'verstimmt') api.bondAdd(id, -1, { cause: (extra && extra.cause) || e.cause || 'verstimmt', repair: (extra && extra.repair) || e.repair || null }); else if (kind === 'ok') api.repair(id); return true; }
      if (e.anim && e.anim.npc) { const n = npcs.get(e.anim.npc); if (n) { if (e.anim.emote) n.humanoid.playEmote(e.anim.emote, { loop: !!e.anim.loop }); else if (e.anim.anim) n.humanoid.setAnim(e.anim.anim); } return !!n; }
      return false;
    }

    const api = {
      MAX_ANIMATED, TANKS, HEAT_CAP_OFF, root,
      get view() { return view; },
      get defs() { return [...defs.values()]; },
      list() { return [...npcs.values()]; },
      main() { return [...npcs.values()].filter((n) => !n.def.ambient); },
      get(id) { return npcs.get(id) || null; },
      def(id) { return defs.get(id) || null; },
      spawn, remove,
      nameOf(id) { const n = npcs.get(id); return n ? n.name : displayName(defs.get(id) || content.get('npcs', id), namesOf()); },
      rename(id, name) {
        const clean = typeof name === 'string' ? name.trim().slice(0, 24) : '';
        if (clean) state.set('names.' + id, clean); else state.remove('names.' + id);
        const n = npcs.get(id); if (n) n.setName(displayName(n.def, namesOf()));
        emit('npc:rename', { id, name: clean || null });
        return api.nameOf(id);
      },
      renames() { return { ...namesOf() }; },
      emotion(id) { const n = npcs.get(id); return n ? n.emotion.get() : null; },
      setEmotion(id, o) { const n = npcs.get(id); if (!n) return null; const s = n.emotion.set(o); emit('npc:emotion', { id, snapshot: s }); return s; },
      nudge(id, emotion, delta) { const n = npcs.get(id); if (!n) return null; const s = n.emotion.nudge(emotion, delta); emit('npc:emotion', { id, snapshot: s }); return s; },
      heat(id, delta) { const n = npcs.get(id); if (!n) return null; const v = n.emotion.heat(delta); emit('npc:emotion', { id, snapshot: n.emotion.get() }); return v; },
      setHeat(id, v) { const n = npcs.get(id); if (!n) return null; const r = n.emotion.setHeat(v); emit('npc:emotion', { id, snapshot: n.emotion.get() }); return r; },
      tanks(id) { const n = npcs.get(id); return n ? n.tanks.values() : null; },
      tank(id, tank, add, { kind = 'need' } = {}) {
        const n = npcs.get(id); if (!n) return null;
        const v = n.tanks.add(tank, add, { kind, day: day() });
        emit('npc:tank', { id, tank, value: v, kind, add });
        return v;
      },
      bond: (id) => bonds.get(id),
      bonds,
      bondAdd: (id, delta, opts) => bonds.add(id, delta, opts),
      setBond: (id, level) => bonds.set(id, level),
      repair: (id, how) => bonds.repair(id, how),
      isVerstimmt: (id) => bonds.isVerstimmt(id),
      mood: (id) => bonds.mood(id),
      boundary(id) { const n = npcs.get(id); return n ? n.boundary(bonds.get(id)) : null; },
      inBoundary(id) { const n = npcs.get(id); return !!n && n.distTo(player.position) < n.boundary(bonds.get(id)); },
      streitStil(id, vs) { return streitStilFor(defs.get(id), vs); },
      tell(id) { return tellFor(defs.get(id), state.get('settings.mode', 'abenteuer')); },
      // Wegfähigkeiten aus Bindungen (Stufe 2): state.wege = ['spalt', 'daecher', …]; Inhalte prüfen sie mit {weg:'spalt'}
      wege() { return (state.get('wege', []) || []).slice(); },
      hasWeg(wegId) { return (state.get('wege', []) || []).includes(wegId); },
      jackePatches() { return (state.get('jackePatches', []) || []).slice(); },
      bondRewards,
      applyEffect, talk,
      // Tat eintragen (für Lagerfeuer und Echos): deeds[] im Spielstand, session.log.deeds für heute
      // Tat eintragen (Format der Quest-Engine WP31: deeds[] + deedLog[{ id, day, t, unit, npc, text }]) – fürs Lagerfeuer und Echos
      deed(npcId, deedId, text) {
        if (!deedId) return false;
        state.addUnique('deeds', deedId);
        const d = day();
        if (!(state.get('deedLog', []) || []).some((e) => e.id === deedId && e.day === d)) state.push('deedLog', { id: deedId, day: d, t: Date.now(), unit: null, npc: npcId || null, text: text || null });
        emit('npc:deed', { npc: npcId, deed: deedId, text: text || null });
        return true;
      },
      near(radius = 6) { const p = player.position; return [...npcs.values()].filter((n) => n.lod !== 'hidden' && n.distTo(p) < radius).sort((a, b) => a.distTo(p) - b.distTo(p)); },
      budget,
      stats() { let animated = 0, lite = 0, hidden = 0; for (const n of npcs.values()) { if (n.lod === 'full') animated++; else if (n.lod === 'lite') lite++; else hidden++; } return { total: npcs.size, main: api.main().length, animated, lite, hidden }; },
      updateLod,
    };
    game.npcs = api;

    // ---- Start: Figuren setzen (Inhalte sind schon geladen) ----
    spawnAll();
    updateLod();

    // ---- Debug ----
    const D = game.debug || (game.debug = {});
    D.npc = (id) => { const n = npcs.get(id); if (!n) return null; return { id, name: n.name, lod: n.lod, x: +n.position.x.toFixed(1), z: +n.position.z.toFixed(1), site: n.site, anim: n.anim, emotion: n.emotion.get(), tanks: n.tanks.values(), bond: bonds.get(id), verstimmt: bonds.isVerstimmt(id), boundary: n.boundary(bonds.get(id)), poses: n.humanoid.bodyLanguage.targets }; };
    D.npcList = () => [...npcs.values()].map((n) => ({ id: n.id, name: n.name, lod: n.lod, ambient: !!n.def.ambient, zone: island.zoneAt(n.position.x, n.position.z) }));
    D.setNpcEmotion = (id, e, i, e2, i2) => api.setEmotion(id, { primary: [e, i], secondary: e2 ? [e2, i2 === undefined ? 5 : i2] : null });
    D.npcHeat = (id, v) => api.setHeat(id, v);
    D.npcTank = (id, tank, add, kind) => api.tank(id, tank, Number(add), { kind: kind || 'need' });
    D.renameNpc = (id, name) => api.rename(id, name);
    D.npcBond = (id, delta) => api.bondAdd(id, Number(delta));
    D.npcLod = () => api.stats();
    D.wege = () => ({ wege: api.wege(), jacke: api.jackePatches() });
    return api;
  },
};

// Fester Zufall (mulberry32) für Dorfleute – unabhängig vom Spielstand, damit IDs und Aussehen stabil bleiben
function createFixedRng(seed) {
  let a = seed >>> 0;
  const next = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const rng = {
    next, float: (lo, hi) => lo + next() * (hi - lo), int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)), chance: (p) => next() < p,
    pick: (arr) => arr[Math.floor(next() * arr.length)], fork: (l) => createFixedRng((seed * 31 + String(l).length * 7919) >>> 0),
  };
  return rng;
}

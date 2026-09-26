// Spielfigur (WP12): Zustandsmaschine ground · air · climb · glide · swim · dive · carry · locked mit Move-Modulen
// (src/actors/moves/*). Absicht vor Bewegung: die lokale Eingabe erzeugt Absichten (player.intent), Tests/Netz können
// player.setIntent(...) setzen. Fähigkeiten schalten Zustände frei (player.setAbilities), Puls-Effekte laufen über
// player.setModifiers({ grabTolerance, glideStability, glideVisualOnly, haltRegen, speed, jump }).
// Ereignisse: player:state {state, prev} · player:jump · player:land {impact} · player:pump · player:respawn {reason, x, z}
//   player:fail {kind} · carry:* · climb:* · halt:* · segel:* · swim:* · dive:*  (Details in den Move-Modulen)
// API: state, go(name, data), abilities, setAbilities({klettern, segel, schwimmen, tauchen, pump, kombi}), modifiers,
//   setWorld({ climbables, updrafts, runes, water, diveRoom }), carry(def) / drop(), carrying, halt (Halt-Ring), segel
//   (glide.setMode/setFeathers), lock(reason)/unlock(reason), respawn(reason), lastSafe, setDiveProvider(p),
//   jumpBuffered, coyoteTime, sprinting, sprintTime, teleport, playAnim/stopAnim, setLook, setCameraYaw.
import * as THREE from 'three';
import { createHumanoid } from './humanoid.js';
import { SLOPE_LIMIT, WORLD_LIMIT } from '../world/island.js';
import { K, createMoves } from './moves/index.js';
import { createPoser } from './moves/pose.js';
import { createSegel } from './segel.js';

export const DEFAULT_PLAYER_LOOK = {
  skin: '#f0c09a', hair: '#4a2e1f', hairStyle: 'kurz', top: '#ff5d73', topStyle: 'hoodie',
  bottoms: '#2f4a7a', bottomsStyle: 'lang', shoes: '#ffffff', accessory: 'rucksack', accessoryColor: '#ffd166',
};

export function createPlayer({ scene, island, colliders, input, audio, particles, events, look, veil = null }) {
  const humanoid = createHumanoid({ ...DEFAULT_PLAYER_LOOK, ...(look || {}) }, { name: 'player', veil });
  scene.add(humanoid.group);
  const poser = createPoser(humanoid);
  const segel = createSegel({ humanoid, veil });

  const pos = new THREE.Vector3(island.spawn.x, 0, island.spawn.z);
  const vel = new THREE.Vector3();
  const _n = { x: 0, y: 1, z: 0 };
  const V = island.FEATURES.volcano;
  let enabled = true;
  let customAnim = null, customT = 0;
  let cameraYaw = 0;
  let stateName = 'ground', prevState = null, pending = null;
  let externalIntent = null, extHold = 0;
  const locks = new Set();
  const safe = { x: island.spawn.x, z: island.spawn.z, yaw: island.spawn.yaw, y: 0, ok: true };
  const safePrev = { x: island.spawn.x, z: island.spawn.z, yaw: island.spawn.yaw, ok: false };
  let respawnT = 0, respawnReason = null;
  let baseAnim = 'idle', poseName = null, poseOpts = null;

  // ---- gemeinsamer Kontext für die Move-Module ----
  const ctx = {
    pos, vel, humanoid, island, colliders, audio, particles, events, segel,
    dt: 0, time: 0,
    intent: { x: 0, y: 0, run: false, jump: false, jumpHeld: false, jumpTap: false, jumpHold: false, jumpHoldTime: 0, action: false, actionHeld: false, power: false, powerHeld: false, camYaw: 0 },
    abilities: { klettern: false, segel: false, schwimmen: false, tauchen: false, pump: false, kombi: false },
    mod: { grabTolerance: 1, glideStability: 1, glideVisualOnly: false, haltRegen: 1, speed: 1, jump: 1 },
    get yaw() { return yaw; }, set yaw(v) { yaw = v; },
    get state() { return stateName; },
    grounded: true, groundY: 0, groundSurface: null, surface: 'grass', airTime: 0,
    jumpBufferT: 0, coyoteT: 0, grabCooldown: 0, lastImpact: 0,
    carrying: null, climbables: null, updrafts: null, runes: null, water: null, diveRoom: null,
    customAnim: null, worldTimeScaled: false, cameraSnap: null, transitionHook: null,
    moves: null,
    groundAt(x, z, feetY) {
      const t = island.getHeight(x, z);
      const s = colliders.surfaceHeight(x, z, feetY, 0.65);
      return s > t ? { y: s, surf: colliders.lastSurface } : { y: t, surf: null };
    },
    waterLevel: (x, z) => island.waterLevel(x, z),
    tooSteep(x, z) { return island.getNormal(x, z, false, _n).y < SLOPE_LIMIT; },
    // Ist der Schritt blockiert? opts.air: ohne Wasser-/Hangsperre (Flug), opts.swim: nur Steilufer
    isBlocked(x, z, fromY, opts = {}) {
      if (Math.hypot(x, z) > WORLD_LIMIT) return true;
      const g = ctx.groundAt(x, z, fromY);
      const wl = island.waterLevel(x, z);
      if (opts.air) { return !g.surf && g.y > fromY + 0.25 && ctx.tooSteep(x, z); }   // Steilwand im Flug: anhalten, nicht hindurch
      if (opts.swim) { return !g.surf && g.y > wl - 0.35 && g.y > fromY + 0.3 && ctx.tooSteep(x, z); }
      if (!ctx.abilities.schwimmen && wl - g.y > K.MAX_WADE) return true;
      if (!g.surf && g.y > fromY + 0.25 && ctx.tooSteep(x, z)) return true;
      if (g.y > fromY + 1.1 && ctx.grounded) return true;
      return false;
    },
    // ohne Schwimmen: aus tiefem Wasser zurückschieben (weiche Grenze wie früher)
    softWaterBoundary(dt) {
      if (ctx.abilities.schwimmen) return;
      const here = ctx.groundAt(pos.x, pos.z, pos.y);
      if (island.waterLevel(pos.x, pos.z) - here.y > K.MAX_WADE + 0.2) {
        const d = Math.hypot(pos.x, pos.z) || 1;
        pos.x -= (pos.x / d) * dt * 4; pos.z -= (pos.z / d) * dt * 4;
      }
    },
    softWorldLimit(dt) {
      const d = Math.hypot(pos.x, pos.z);
      if (d > WORLD_LIMIT - 4) { pos.x -= (pos.x / d) * dt * 3; pos.z -= (pos.z / d) * dt * 3; }
    },
    inLava(p) { return Math.hypot(p.x - V.x, p.z - V.z) < V.lavaRadius + 0.3 && p.y <= V.lavaLevel + 0.25; },
    // Sicherer Punkt für den Neustart? (nicht am Lavarand, begehbar, kein tiefes Wasser)
    isSafeSpot(x, z) {
      const gy = island.getHeight(x, z);
      const dLava = Math.hypot(x - V.x, z - V.z);
      if (dLava < V.lavaRadius + 1.6 && gy <= V.lavaLevel + 1.0) return false;
      if (island.waterLevel(x, z) - gy > 0.5) return false;
      return island.isWalkable(x, z);
    },
    // Sprung ausführen (aus Boden/Tragen): → Luft
    jump(v, extra = {}) {
      vel.y = v;
      ctx.grounded = false;
      ctx.coyoteT = 0;
      audio.play('jump');
      events.emit('player:jump', { v, ...extra });
      particles.emit({ x: pos.x, y: pos.y + 0.1, z: pos.z, count: extra.pump ? 14 : 6, spread: 0.5, speed: 1.4, up: 0.6, color: 0xffffff, size: 0.4, life: 0.5, gravity: -1, drag: 3, alpha: 0.45 });
      return ctx.go('air', { jumped: true, ...extra });
    },
    land(impact) {
      ctx.grounded = true;
      ctx.lastImpact = impact;
      if (ctx.airTime > 0.25 || impact > 6) {
        audio.play('land');
        events.emit('player:land', { impact });
        const g = ctx.groundY;
        particles.emit({ x: pos.x, y: pos.y + 0.08, z: pos.z, count: 10, spread: 0.6, speed: 2.2, up: 0.8, color: island.waterLevel(pos.x, pos.z) > g ? 0xe8fbff : 0xf0e2c4, size: 0.5, life: 0.6, gravity: -1.5, drag: 3, grow: 1.4, alpha: 0.5 });
      }
      ctx.airTime = 0;
    },
    splash(k = 1) {
      const wl = island.waterLevel(pos.x, pos.z);
      audio.play('splash');
      particles.emit({ x: pos.x, y: wl + 0.05, z: pos.z, count: Math.round(14 * k), spread: 0.8, speed: 2.4 * k, up: 3.4 * k, color: 0xeafcff, size: 0.45, life: 0.7, gravity: -9, drag: 1, grow: 0.6, alpha: 0.85 });
    },
    // zwei Kanten merken: der Neustart nimmt die, die weiter vom Sturzpunkt weg liegt (nie direkt wieder hinein)
    markSafe() { safePrev.x = safe.x; safePrev.z = safe.z; safePrev.yaw = safe.yaw; safePrev.ok = safe.ok; safe.x = pos.x; safe.z = pos.z; safe.y = pos.y; safe.yaw = yaw; safe.ok = true; },
    respawn(reason) {
      if (stateName === 'locked' && respawnReason) return 'locked';
      respawnReason = reason; respawnT = 0;
      events.emit('player:fail', { kind: reason });
      events.emit('player:respawn:start', { reason, x: pos.x, z: pos.z, seconds: K.RESPAWN_FADE });
      audio.play('whoosh', { duration: 0.8 });
      return ctx.go('locked', { respawn: true, anim: 'fall' });
    },
    setBaseAnim(anim, pose = null, opts = null) { baseAnim = anim; poseName = pose; poseOpts = opts; },
    go(name, data) {
      if (ctx.transitionHook) { const n = ctx.transitionHook(name, data); if (n === 'carry') return 'carry'; name = n; }
      pending = { name, data };
      return name;
    },
  };
  let yaw = island.spawn.yaw;
  const moves = createMoves(ctx);
  ctx.moves = moves;
  let move = moves.ground;

  function transition(name, data) {
    if (!moves[name]) { console.warn('[player] unbekannter Zustand', name); return; }
    const from = stateName;
    move.exit(name);
    prevState = from;
    stateName = name;
    move = moves[name];
    move.enter(data, from);
    events.emit('player:state', { state: name, prev: from, data });
  }

  const g0 = ctx.groundAt(pos.x, pos.z, 50);
  pos.y = g0.y;
  ctx.groundY = g0.y;

  humanoid.onStep = (foot) => {
    if (!ctx.grounded || stateName === 'climb') return;
    const sp = Math.hypot(vel.x, vel.z);
    const inWater = island.waterLevel(pos.x, pos.z) - ctx.groundY > 0.12;
    const s = inWater ? 'water' : ctx.surface;
    audio.footstep(s === 'path' || s === 'ash' ? 'sand' : s, Math.min(1, 0.4 + sp / K.RUN_SPEED));
    if (sp > 3.8 && !inWater && (ctx.surface === 'sand' || ctx.surface === 'path' || ctx.surface === 'ash')) {
      const c = ctx.surface === 'sand' ? 0xf1dcae : ctx.surface === 'ash' ? 0x8a776e : 0xd8b07a;
      const side = foot === 'L' ? 1 : -1;
      const ox = Math.cos(yaw) * 0.12 * side, oz = -Math.sin(yaw) * 0.12 * side;
      particles.emit({ x: pos.x + ox, y: pos.y + 0.1, z: pos.z + oz, count: 4, spread: 0.3, speed: 0.9, up: 0.9, color: c, size: 0.45, life: 0.7, gravity: -0.5, drag: 3, grow: 1.6, alpha: 0.55 });
    }
  };

  // Absichten aus der lokalen Eingabe lesen
  function readIntent() {
    const st = input.state;
    const I = ctx.intent;
    if (externalIntent) {
      Object.assign(I, { x: 0, y: 0, run: false, jump: false, jumpHeld: false, jumpTap: false, jumpHold: false, action: false, actionHeld: false, power: false, powerHeld: false }, externalIntent);
      I.camYaw = externalIntent.camYaw !== undefined ? externalIntent.camYaw : cameraYaw;
      extHold = I.jumpHeld ? extHold + ctx.dt : 0;
      I.jumpHoldTime = externalIntent.jumpHoldTime !== undefined ? externalIntent.jumpHoldTime : extHold;
      return;
    }
    extHold = 0;
    const on = enabled && locks.size === 0;
    I.x = on ? st.move.x : 0; I.y = on ? st.move.y : 0;
    I.run = on && st.run;
    I.jump = on && st.jump; I.jumpHeld = on && st.jumpHeld; I.jumpTap = on && st.jumpTap; I.jumpHold = on && st.jumpHold;
    I.jumpHoldTime = on && input.holdTime ? input.holdTime('jump') : 0;
    I.action = on && st.action; I.actionHeld = on && st.actionHeld;
    I.power = on && st.power; I.powerHeld = on && st.powerHeld;
    I.camYaw = cameraYaw;
  }

  const player = {
    humanoid, segel, poser,
    position: pos,
    velocity: vel,
    radius: K.RADIUS,
    ctx,
    moves,
    get yaw() { return yaw; },
    set yaw(v) { yaw = v; },
    get state() { return stateName; },
    get prevState() { return prevState; },
    get grounded() { return ctx.grounded; },
    get surface() { return ctx.surface; },
    get speed() { return Math.hypot(vel.x, vel.z); },
    get enabled() { return enabled; },
    get locked() { return locks.size > 0 || stateName === 'locked'; },
    get coyoteTime() { return ctx.coyoteT; },
    get jumpBuffered() { return ctx.jumpBufferT > 0; },
    get intent() { return ctx.intent; },
    get abilities() { return ctx.abilities; },
    get modifiers() { return ctx.mod; },
    get carrying() { return ctx.carrying; },
    get halt() { return moves.climb.halt; },
    get sprinting() { return !!ctx.sprinting; },
    get sprintTime() { return ctx.sprintTime || 0; },
    get lastSafe() { return { ...safe }; },
    get airTime() { return ctx.airTime; },
    get glide() { return moves.glide; },
    get climb() { return moves.climb; },
    get dive() { return moves.dive; },
    get pump() { return moves.ground.pump; },
    // Kamera-Modus-Wunsch je Zustand (der Kamera-Rig liest ihn)
    get cameraMode() { return stateName === 'glide' ? 'glide' : stateName === 'climb' ? 'climb' : stateName === 'swim' ? 'swim' : stateName === 'dive' ? 'dive' : 'follow'; },
    go(name, data) { ctx.go(name, data); },
    setAbilities(a) { Object.assign(ctx.abilities, a || {}); events.emit('player:abilities', { ...ctx.abilities }); },
    setModifiers(m) { Object.assign(ctx.mod, m || {}); events.emit('player:modifiers', { ...ctx.mod }); },
    setWorld(w) { Object.assign(ctx, w || {}); },
    setIntent(i) { externalIntent = i || null; },
    setDiveProvider(p) { moves.dive.setProvider(p); },
    // Kamera meldet ihre Blickrichtung (für kamerabezogene Steuerung)
    setCameraYaw(v) { cameraYaw = v; },
    setEnabled(v) { enabled = !!v; if (!v) { vel.x = 0; vel.z = 0; } },
    lock(reason = 'lock') { locks.add(reason); if (stateName !== 'locked' && (stateName === 'ground' || stateName === 'carry')) { vel.x = 0; vel.z = 0; } },
    unlock(reason = 'lock') { locks.delete(reason); },
    setLook(cfg) { humanoid.setConfig(cfg); },
    // Sonder-Animation (z. B. 'wave', 'cheer', 'talk') für n Sekunden (0 = bis stopAnim)
    playAnim(name, seconds = 2) { customAnim = name; customT = seconds || Infinity; ctx.customAnim = name; },
    stopAnim() { customAnim = null; ctx.customAnim = null; },
    carry(def) { const it = moves.carry.pickUp(def); if (stateName !== 'carry') transition('carry', { impact: 0 }); return it; },
    drop(opts) { const r = moves.carry.drop(opts); if (stateName === 'carry') transition(ctx.grounded ? 'ground' : 'air'); return r; },
    respawn(reason = 'leere') { ctx.respawn(reason); },
    teleport(x, z, newYaw) {
      const g = ctx.groundAt(x, z, 999);
      pos.set(x, g.y, z);
      vel.set(0, 0, 0);
      ctx.grounded = true;
      ctx.groundY = g.y;
      ctx.airTime = 0;
      if (newYaw !== undefined) yaw = newYaw;
      if (stateName !== 'ground' && stateName !== 'carry') transition(ctx.carrying ? 'carry' : 'ground', { impact: 0 });
      else if (stateName === 'ground') { moves.ground.pump.cancel(); }
      humanoid.group.position.copy(pos);
      humanoid.group.rotation.y = yaw;
      if (ctx.isSafeSpot(x, z) || g.surf) ctx.markSafe();
      events.emit('player:teleport', { x, z });
    },
    update(dt) {
      if (dt <= 0) { humanoid.update(0); poser.update(0); segel.update(0); return; }
      ctx.dt = dt; ctx.time += dt;
      readIntent();
      ctx.grabCooldown = Math.max(0, ctx.grabCooldown - dt);
      // Halt-Ring lädt außerhalb des Kletterns schnell nach
      if (stateName !== 'climb' && stateName !== 'air' && stateName !== 'glide') { const h = moves.climb.halt; if (h.current < h.max) { h.regen(dt, 3 * ctx.mod.haltRegen); if (h.current >= h.max - 0.01) { h.fill(); events.emit('halt:change', { current: h.current, max: h.max, ledge: false, sliding: false, climbing: false }); } } }
      // Neustart nach Sturz in Leere/Lava: kurze Blende, dann an die letzte Kante
      if (stateName === 'locked' && respawnReason) {
        respawnT += dt;
        if (respawnT >= K.RESPAWN_FADE) {
          const reason = respawnReason; respawnReason = null;
          const dCur = Math.hypot(safe.x - pos.x, safe.z - pos.z);
          const useSpot = (safePrev.ok && dCur < 2.5 && ctx.isSafeSpot(safePrev.x, safePrev.z)) ? safePrev : safe;
          const g = ctx.groundAt(useSpot.x, useSpot.z, 999);
          pos.set(useSpot.x, g.y, useSpot.z); vel.set(0, 0, 0); yaw = useSpot.yaw;
          ctx.grounded = true; ctx.groundY = g.y; ctx.airTime = 0;
          if (ctx.carrying) moves.carry.drop({ place: false });
          transition('ground', { impact: 0 });
          if (ctx.cameraSnap) ctx.cameraSnap();
          events.emit('player:respawn', { reason, x: pos.x, z: pos.z });
        }
      }
      // ---- aktueller Zustand (von außen angeforderte Übergänge zuerst) ----
      let guard = 4;
      if (pending) { const p = pending; pending = null; transition(p.name, p.data); }
      move.update(dt);
      while (pending && guard-- > 0) { const p = pending; pending = null; transition(p.name, p.data); }
      // ---- Sonder-Animation ----
      const sp = Math.hypot(vel.x, vel.z);
      if (customAnim) { customT -= dt; if (customT <= 0 || (sp > 1.5 && customAnim !== 'cheer')) { customAnim = null; ctx.customAnim = null; } }
      // ---- Animation + Pose ----
      humanoid.vy = vel.y;
      humanoid.setMoveSpeed(sp);
      humanoid.setAnim(baseAnim);
      humanoid.update(dt);
      if (poseName === 'charge') poseOpts = { charge: moves.ground.pump.charge };
      poser.set(poseName, poseOpts);
      poser.update(dt);
      if (stateName !== 'glide') segel.update(dt, {});   // im Flug animiert glide.js das Segel selbst
      humanoid.group.position.copy(pos);
      humanoid.group.rotation.y = yaw;
      // Boden-Schatten
      const drop = Math.max(0, pos.y - ctx.groundY);
      humanoid.blob.position.y = -drop + 0.04;
      humanoid.blob.scale.setScalar(Math.max(0.4, 1 - drop * 0.15));
      humanoid.blob.material.opacity = Math.max(0.2, 1 - drop * 0.2);
      humanoid.blob.visible = stateName !== 'swim' && stateName !== 'dive';
    },
  };
  humanoid.group.position.copy(pos);
  humanoid.group.rotation.y = yaw;
  return player;
}

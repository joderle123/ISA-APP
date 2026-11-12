// Szenen-System (WP18): Szenenstapel Oberwelt → Innenraum (→ Innenraum …) mit Überblendung (0,6 s).
// Räume liegen in einer „Tasche“ hoch über dem Meer (keine Zone, kein Gelände): die Spielfigur bekommt dort eigene
// Boden-, Wasser- und Kollisionsfunktionen (player.setWorld), die Kamera bleibt im Raum (rig.bounds), die Oberwelt ist
// ausgeblendet und ihre Zeit steht. Licht-Presets ersetzen Sonne/Nebel je Frame (nach dem Himmel).
//   scenes.enter('gezeitenhoehle', { spawn: 'eingang' }) → Promise   scenes.exit() → Promise   scenes.current · stack · depth · isInterior
//   scenes.register(def) · scenes.rooms() · scenes.diveProvider (für player.setDiveProvider) · scenes.returnPoint
// Ereignisse: scene:enter {id, depth} · scene:exit {id, depth} · scene:change {scene:'welt'|id, prev} · scene:fade {phase}
// Speichern: im Innenraum wird als Position der Rückkehrpunkt in der Oberwelt eingetragen (pos.scene = 'welt').
import * as THREE from 'three';
import { createColliders } from './colliders.js';

export const FADE_SECONDS = 0.6;
export const POCKET = { x: 0, y: 320, z: 470, step: 140 };
export const DIVE_POCKET = { x: 0, y: 320, z: 760 };

const FADE_CSS = `
.sc-fade{position:absolute;inset:0;background:#05030c;opacity:0;pointer-events:none;z-index:21;transition:opacity ${FADE_SECONDS / 2}s ease}
.sc-fade.is-on{opacity:1}
`;

export function createScenes({ game, kit }) {
  const { events, scene, player, cameraRig, world, ui, interactions } = game;
  const sky = world.sky, veil = world.veil, island = world.island;
  const stack = [];          // [{ room, pocket, colliders, interactions:[…], entry }]
  let saved = null;          // gesicherte Spieler-Welt (ctx-Funktionen) und Oberwelt-Zustand
  let hidden = null;         // [{ obj, visible }]
  let lightRoom = null;      // Raum, dessen Licht-Preset gerade gilt (auch beim Tauchen)
  let busy = false;
  let returnPoint = null;    // { x, z, yaw } in der Oberwelt
  let fadeEl = null;
  let camSaved = null;       // Kamera-Abstand/Neigung der Oberwelt (im Raum näher)
  // Fester Pool an Punktlichtern (immer in der Szene, draußen aus): kein Shader-Neubau beim Betreten
  const LIGHT_POOL = 4;
  const pool = [];
  for (let i = 0; i < LIGHT_POOL; i++) { const L = new THREE.PointLight(0xffffff, 0, 1, 2); L.name = 'raumlicht-' + i; L.visible = false; scene.add(L); pool.push(L); }
  function setLights(room, pocket) {
    for (let i = 0; i < LIGHT_POOL; i++) {
      const L = pool[i], spec = room && room.lights[i];
      if (!spec) { L.intensity = 0; L.visible = false; L.userData.base = 0; continue; }
      L.color.set(spec.color); L.distance = spec.distance; L.userData.base = spec.intensity; L.intensity = spec.intensity;
      L.position.set(pocket.x + spec.x, pocket.y + spec.y, pocket.z + spec.z);
      L.visible = true;
    }
  }
  const built = new Map();   // id → Raum (Cache: Betreten/Verlassen bleibt speicherstabil)

  function ensureFade() {
    if (fadeEl || typeof document === 'undefined' || !ui || !ui.root) return;
    const style = document.createElement('style'); style.textContent = FADE_CSS; document.head.appendChild(style);
    fadeEl = document.createElement('div'); fadeEl.className = 'sc-fade'; ui.root.appendChild(fadeEl);
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  async function fade(on) {
    ensureFade();
    events.emit('scene:fade', { phase: on ? 'zu' : 'auf' });
    if (!fadeEl) return;
    fadeEl.classList.toggle('is-on', on);
    await wait(FADE_SECONDS * 500);
  }

  function getRoom(idOrDef) {
    const id = typeof idOrDef === 'string' ? idOrDef : idOrDef.id;
    if (built.has(id)) return built.get(id);
    const room = kit.build(idOrDef);
    built.set(id, room);
    return room;
  }
  function pocketFor(depth) { return { x: POCKET.x, y: POCKET.y, z: POCKET.z + depth * POCKET.step }; }

  // ---- Oberwelt aus-/einblenden ----
  const keep = () => new Set([player.humanoid.group, sky.sun, sky.sun.target, sky.hemi, game.particles.systems.normal.points, game.particles.systems.glow.points, ...pool]);
  function hideOverworld(except) {
    if (hidden) return;
    const k = keep();
    hidden = [];
    for (const o of scene.children) {
      if (k.has(o) || except.has(o)) continue;
      hidden.push({ obj: o, visible: o.visible });
      o.visible = false;
    }
  }
  function showOverworld() {
    if (!hidden) return;
    for (const h of hidden) h.obj.visible = h.visible;
    hidden = null;
  }

  // ---- Spieler-Welt im Raum ----
  function roomWorld(entry) {
    const { room, pocket, colliders } = entry;
    const floorY = pocket.y;
    const floorSurf = room.floorSurf;
    return {
      colliders, climbables: null, updrafts: null, runes: null,
      groundAt(x, z, feetY) {
        const s = colliders.surfaceHeight(x, z, feetY, 0.65);
        return s > floorY ? { y: s, surf: colliders.lastSurface } : { y: floorY, surf: floorSurf };
      },
      waterLevel(x, z) { return room.water ? floorY + room.water.level : floorY - 100; },
      tooSteep() { return false; },
      isBlocked(x, z) { return !room.inside(x - pocket.x, z - pocket.z); },
      isSafeSpot() { return true; },
      inLava() { return false; },
      softWaterBoundary() {},
      softWorldLimit() {},
    };
  }
  const WORLD_KEYS = ['colliders', 'climbables', 'updrafts', 'runes', 'groundAt', 'waterLevel', 'tooSteep', 'isBlocked', 'isSafeSpot', 'inLava', 'softWaterBoundary', 'softWorldLimit'];
  function applyWorld(entry) {
    if (!saved) { saved = {}; for (const k of WORLD_KEYS) saved[k] = player.ctx[k]; }
    player.setWorld(roomWorld(entry));
  }
  function restoreWorld() {
    if (!saved) return;
    player.setWorld(saved);
    saved = null;
  }

  // ---- Licht (jeden Frame nach dem Himmel) ----
  let skyState = null;
  function applyLight() {
    const room = lightRoom;
    if (!room) return;
    const p = room.preset;
    if (!skyState) {
      skyState = { fog: { color: scene.fog.color.clone(), near: scene.fog.near, far: scene.fog.far }, clear: game.renderer.getClearColor(new THREE.Color()), timePaused: sky.time.paused, sunAmt: veil.uniforms.uFogSunAmt.value };
      sky.time.paused = true;
      game.renderer.setClearColor(new THREE.Color(p.clear || p.fog[0]), 1);
    }
    const fs = Math.max(1, Math.max(room.size[0], room.size[2]) / 24);   // große Räume: Nebel reicht weiter
    scene.fog.color.set(p.fog[0]); scene.fog.near = p.fog[1] * fs; scene.fog.far = p.fog[2] * fs;
    // Innenräume: Dunst nah = Raumnebel, kein Höhennebel, keine Luftperspektive
    veil.uniforms.uFogNearColor.value.set(p.fog[0]);
    veil.uniforms.uFogHeight.value = 0;
    veil.uniforms.uAerial.value = 0;
    sky.sun.intensity = (p.sun || 0) * 2.6;
    sky.hemi.color.set(p.hemi[0]); sky.hemi.groundColor.set(p.hemi[1]); sky.hemi.intensity = p.hemi[2];
    veil.uniforms.uFogSunAmt.value = 0;
    veil.setGrade({ lift: [0, 0, 0], gain: [1, 1, 1], sat: p.grade ? p.grade.sat : 1, contrast: p.grade ? p.grade.contrast : 1 });
    game.renderer.toneMappingExposure = 1;
  }
  function restoreLight() {
    if (!skyState) return;
    scene.fog.color.copy(skyState.fog.color); scene.fog.near = skyState.fog.near; scene.fog.far = skyState.fog.far;
    game.renderer.setClearColor(skyState.clear, 1);
    sky.time.paused = skyState.timePaused;
    veil.uniforms.uFogSunAmt.value = skyState.sunAmt;
    veil.uniforms.uAerial.value = 1;
    skyState = null;
    lightRoom = null;
  }

  // ---- Raum aktivieren (Tasche, Kollider, Interaktionen) ----
  function activate(room, depth, opts = {}) {
    const pocket = pocketFor(depth);
    room.group.position.set(pocket.x, pocket.y, pocket.z);
    room.group.visible = true;
    scene.add(room.group);
    const colliders = createColliders();
    room.registerColliders(colliders, pocket);
    setLights(room, pocket);
    const entry = { room, pocket, colliders, interactions: [], spawn: opts.spawn || 'eingang' };
    for (const e of room.exits) {
      if (e.kind === 'ring' || !interactions) continue;
      const wx = pocket.x + e.at[0], wz = pocket.z + e.at[2];
      const it = interactions.add({ id: `ausgang-${room.id}-${e.index}`, x: wx, z: wz, radius: e.r, label: e.label, priority: 2, onAction: () => { if (e.to && e.to.room) api.enter(e.to.room, { spawn: e.to.spawn }); else api.exit({ to: e.to }); } });
      entry.interactions.push(it);
    }
    return entry;
  }
  function deactivate(entry) {
    for (const it of entry.interactions) it.remove();
    entry.room.group.visible = false;
    scene.remove(entry.room.group);
    setLights(null);
  }

  const api = {
    kit, stack, built, fadeSeconds: FADE_SECONDS,
    get current() { return stack.length ? stack[stack.length - 1].room : null; },
    get depth() { return stack.length; },
    get isInterior() { return stack.length > 0; },
    get busy() { return busy; },
    get returnPoint() { return returnPoint; },
    get pocket() { return stack.length ? stack[stack.length - 1].pocket : null; },
    register(def) { const d = kit.register(def); if (d && built.has(d.id)) { built.get(d.id).dispose(); built.delete(d.id); } return d; },
    rooms() { return kit.list().map((d) => d.id); },
    room(id) { return built.get(id) || null; },
    dispose(id) { const r = built.get(id); if (r) { r.dispose(); built.delete(id); } return !!r; },
    // Raum betreten (vom Freien oder aus einem anderen Raum)
    async enter(idOrDef, { spawn = 'eingang', fade: doFade = true } = {}) {
      if (busy) return null;
      busy = true;
      try {
        const room = getRoom(idOrDef);
        const prevId = api.current ? api.current.id : 'welt';
        player.lock('scene');
        if (doFade) await fade(true);
        if (!stack.length) {
          returnPoint = { x: player.position.x, z: player.position.z, yaw: player.yaw };
          const except = new Set([room.group]);
          hideOverworld(except);
        } else {
          deactivate(stack[stack.length - 1]);
        }
        const entry = activate(room, stack.length, { spawn });
        stack.push(entry);
        applyWorld(entry);
        lightRoom = room;
        applyLight();
        veil.setBaseOverride(roomVeil(room));
        const s = room.spawn(spawn, entry.pocket);
        player.teleport(s.x, s.z, s.yaw);
        cameraRig.bounds = room.bounds(entry.pocket);
        if (camSaved === null) camSaved = { dist: cameraRig.targetDist, pitch: cameraRig.pitch };
        cameraRig.targetDist = Math.min(cameraRig.targetDist, room.def.camera && room.def.camera.dist || 5.5);
        cameraRig.pitch = Math.max(cameraRig.pitch, 0.32);
        cameraRig.behindPlayer(); cameraRig.snap();
        events.emit('scene:enter', { id: room.id, depth: stack.length, prev: prevId });
        events.emit('scene:change', { scene: room.id, prev: prevId });
        if (doFade) await fade(false);
        return room;
      } finally { busy = false; player.unlock('scene'); }
    },
    // Raum verlassen: zurück in den vorherigen Raum oder in die Oberwelt (Rückkehrpunkt oder Ziel-Ort)
    async exit({ to = null, fade: doFade = true } = {}) {
      if (busy || !stack.length) return false;
      busy = true;
      try {
        player.lock('scene');
        if (doFade) await fade(true);
        const entry = stack.pop();
        deactivate(entry);
        const prevId = entry.room.id;
        if (stack.length) {
          const back = activate(stack[stack.length - 1].room, stack.length - 1, { spawn: stack[stack.length - 1].spawn });
          stack[stack.length - 1] = back;
          applyWorld(back);
          lightRoom = back.room;
          veil.setBaseOverride(roomVeil(back.room));
          cameraRig.bounds = back.room.bounds(back.pocket);
          events.emit('scene:exit', { id: prevId, depth: stack.length });
          events.emit('scene:change', { scene: back.room.id, prev: prevId });
        } else {
          restoreWorld();
          restoreLight();
          showOverworld();
          veil.setBaseOverride(null);
          cameraRig.bounds = null;
          if (camSaved) { cameraRig.targetDist = camSaved.dist; cameraRig.pitch = camSaved.pitch; camSaved = null; }
          let target = returnPoint || { x: island.spawn.x, z: island.spawn.z, yaw: island.spawn.yaw };
          if (to) { const site = game.content && game.content.resolveSite(to.site || to); if (site) target = { x: site.x, z: site.z, yaw: returnPoint ? returnPoint.yaw : 0 }; }
          player.teleport(target.x, target.z, target.yaw);
          game.zone = island.zoneAt(target.x, target.z);
          cameraRig.behindPlayer(); cameraRig.snap();
          events.emit('scene:exit', { id: prevId, depth: 0 });
          events.emit('scene:change', { scene: 'welt', prev: prevId });
        }
        if (doFade) await fade(false);
        return true;
      } finally { busy = false; player.unlock('scene'); }
    },
    // Tauchräume (player.setDiveProvider): Ring mit room-Feld → Raum aus dem Baukasten, sonst die Testgrotte
    diveProvider: {
      enter(info, done) {
        const id = (info && info.ring && info.ring.room) || (info && info.room) || null;
        if (!id || !kit.has(id)) return world.testgrotte ? world.testgrotte.enter(info, done) : null;
        const room = getRoom(id);
        const pocket = { ...DIVE_POCKET };
        room.group.position.set(pocket.x, pocket.y, pocket.z);
        room.group.visible = true;
        scene.add(room.group);
        const colliders = createColliders();
        room.registerColliders(colliders, pocket);
        hideOverworld(new Set([room.group]));
        setLights(room, pocket);
        lightRoom = room;
        veil.setBaseOverride(roomVeil(room));
        const ring = room.exits.find((e) => e.kind === 'ring') || room.exits[0];
        const s = room.spawn(info && info.spawn || 'eingang', pocket);
        let t = 0;
        return {
          id: room.id, spawn: s, bounds: room.bounds(pocket), colliders,
          exitAt: ring ? { x: pocket.x + ring.at[0], y: pocket.y + ring.at[1], z: pocket.z + ring.at[2], r: ring.r || 1.9 } : null,
          update(dt) { t += dt; room.update(dt, t, null); },
          exit() { room.group.visible = false; scene.remove(room.group); setLights(null); showOverworld(); restoreLight(); veil.setBaseOverride(null); },
        };
      },
    },
    update(dt, t) {
      const cur = api.current;
      if (cur) cur.update(dt, t, null);
      if (lightRoom) {
        applyLight();
        for (const L of pool) if (L.visible) L.intensity = L.userData.base * (0.94 + 0.06 * Math.sin(t * 7 + L.position.x));
      }
    },
  };
  function roomVeil(room) {
    const st = game.state && game.state.get('veil.rooms.' + room.id);
    if (typeof st === 'number') return st;
    return typeof room.def.veil === 'number' ? room.def.veil : 0;
  }
  // Speichern: im Innenraum zählt der Rückkehrpunkt in der Oberwelt
  if (game.save && game.save.onCapture) game.save.onCapture((d) => { if (stack.length && returnPoint) d.pos = { scene: 'welt', x: +returnPoint.x.toFixed(2), z: +returnPoint.z.toFixed(2), yaw: +returnPoint.yaw.toFixed(3) }; });
  return api;
}

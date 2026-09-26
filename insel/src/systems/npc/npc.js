// Eine Figur in der Welt (WP34): Humanoid aus der Avatar-Pipeline, Namensschild, Tagesablauf-Wegpunkte, Gefühlsmodell,
// Tanks, Aura je Blick-Stufe, Körpersprache, Sichtbudget (voll animiert / lite / ausgeblendet), Übersteuerung durch
// Szenen und Nachtwachen (setOverride), Gespräch (faceTo/lookAt).
//   const npc = createNpc({ game, def, root, resolveSite, look, rng });
//   npc.update(dt, { hour, camera, playerPos, view, bond, verstimmt, interior }) · npc.setLod('full'|'lite'|'hidden')
//   npc.setOverride({ x, z, yaw?, anim?, poses?, lookAt? }) · clearOverride() · npc.face(pos|null) · npc.say → über ui
import * as THREE from 'three';
import { createEmotion, createTanks, bodyFor, boundaryRadius, streitStilFor, scheduleAt, displayName, TANKS } from './model.js';
import { createNameTag } from './nametag.js';
import { merge } from '../../world/geom.js';
import { EMOTION_COLORS } from '../../actors/humanoid/aura.js';

const WALK_SPEED = 1.7, RUN_SPEED = 3.4, ARRIVE = 0.9, TELEPORT_DIST = 140;
const ANIM_MAP = { sit: 'sit', think: 'think', idle: 'idle', talk: 'talk', wave: 'wave', cheer: 'cheer', sad: 'sad', angry: 'angry', stand: 'idle' };
const _v = new THREE.Vector3();

export function createNpc({ game, def, root, resolveSite, look, rng, names = () => ({}) }) {
  const island = game.world.island;
  const colliders = game.colliders;
  const detail0 = 'lite';
  const h = game.createHumanoid(look || def.look || {}, { name: 'npc-' + def.id, detail: detail0 });
  h.group.userData.npc = def.id;
  h.group.userData.bubbleHeight = h.height + 0.35;
  root.add(h.group);
  const tag = createNameTag({ name: displayName(def, names()), icon: def.icon || 'punkt', color: def.color || '#ffd166' });
  if (tag.sprite) { tag.sprite.position.y = h.height + 0.22; h.group.add(tag.sprite); }

  const emotion = createEmotion((def.emotion && def.emotion.base) || {});
  const tanks = createTanks(def.tanks || {}, { day: game.state ? game.state.get('time.day', 1) : 1 });
  const pos = h.group.position;
  const jitter = rng ? { a: rng.float(0, Math.PI * 2), r: rng.float(0, 1) } : { a: 0, r: 0 };

  let lod = null;   // wird unten per setLod('lite') gesetzt (Impostor + Schatten)
  let anim = 'idle', yaw = 0, targetYaw = 0;
  let target = null;        // { x, z, anim, site }
  let override = null;      // { x, z, yaw, anim, poses, lookAt }
  let facing = null;        // Punkt, dem die Figur sich zuwendet (Gespräch)
  let curSite = null, curEntry = null;
  let poseT = 0, auraT = 0, lastView = null;
  let hiddenByRoutine = false;
  let placed = false;

  function groundY(x, z) {
    const t = island.getHeight(x, z);
    const s = colliders && colliders.surfaceHeight ? colliders.surfaceHeight(x, z, Infinity, 0.65) : -Infinity;
    return Math.max(t, s > t ? s : t, island.waterLevel ? island.waterLevel(x, z) : 0);
  }
  function place(x, z) { pos.set(x, groundY(x, z), z); placed = true; }
  function setAnim(a) { const m = ANIM_MAP[a] || (a && h.setAnim ? a : 'idle'); if (m !== anim) { anim = m; h.setAnim(m); if (lod === 'lite' && m !== 'walk' && m !== 'run') settleAndBake(); } }
  function sitePos(site) {
    const s = resolveSite(site);
    if (!s) return null;
    const r = Math.max(0, Math.min(4, (s.r || 0) * 0.35)) * jitter.r;
    return { x: s.x + Math.cos(jitter.a) * r, z: s.z + Math.sin(jitter.a) * r };
  }
  // Tagesablauf lesen: neues Ziel, wenn der Eintrag wechselt
  function routine(hour, playerPos) {
    const e = scheduleAt(def.schedule, hour);
    if (e === curEntry) return;
    curEntry = e;
    if (!e) { hiddenByRoutine = false; if (!placed) { const s = sitePos(def.home || 'dorfplatz'); if (s) place(s.x, s.z); } return; }
    hiddenByRoutine = !!e.hidden;
    const s = sitePos(e.site);
    if (!s) return;
    curSite = e.site;
    const far = !placed || !playerPos || Math.hypot(pos.x - playerPos.x, pos.z - playerPos.z) > TELEPORT_DIST || hiddenByRoutine;
    if (far) { place(s.x, s.z); target = null; setAnim(e.anim || 'idle'); yaw = targetYaw = rng ? rng.float(-Math.PI, Math.PI) : 0; h.group.rotation.y = yaw; }
    else target = { x: s.x, z: s.z, anim: e.anim || 'idle', site: e.site };
  }
  function moveToward(dt, tx, tz, speed) {
    const dx = tx - pos.x, dz = tz - pos.z, d = Math.hypot(dx, dz);
    if (d < ARRIVE) return true;
    const step = Math.min(d, speed * dt);
    let nx = pos.x + (dx / d) * step, nz = pos.z + (dz / d) * step;
    if (island.isWalkable && !island.isWalkable(nx, nz)) {
      // seitlich ausweichen; klappt es nicht, den Rest überspringen (Figuren sind keine Physikkörper)
      const sx = -dz / d, sz = dx / d;
      const ax = pos.x + sx * step * 1.5, az = pos.z + sz * step * 1.5;
      if (island.isWalkable(ax, az)) { nx = ax; nz = az; } else { pos.set(tx, groundY(tx, tz), tz); return true; }
    }
    targetYaw = Math.atan2(dx, dz);
    pos.set(nx, groundY(nx, nz), nz);
    return false;
  }
  function turnTo(dt, want) {
    let d = want - yaw;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    yaw += d * Math.min(1, dt * 7);
    h.group.rotation.y = yaw;
  }

  // ---- Schatten und Impostor ----
  // Figuren werfen nur in voller Stufe und hoher Qualität Sonnenschatten (der Bodenfleck bleibt immer); spart Draw-Calls.
  function applyShadows() {
    const cast = lod === 'full' && game.quality && game.quality.name === 'high';
    for (const m of Object.values(h.meshes)) if (m.name !== 'lens' && !m.name.startsWith('mouth') && !m.name.startsWith('brow')) m.castShadow = cast;
  }
  // Impostor (lite): alle Körperteile in der aktuellen Haltung zu EINEM Mesh verschmolzen (1 Draw-Call statt ~8)
  let impostor = null;
  const _mw = new THREE.Matrix4(), _inv = new THREE.Matrix4();
  function bakeImpostor() {
    dropImpostor();
    try {
      h.group.updateMatrixWorld(true);
      _inv.copy(h.group.matrixWorld).invert();
      const parts = [];
      let mat = null;
      for (const m of Object.values(h.meshes)) {
        if (!m.visible || m.name === 'lens' || !m.geometry.attributes.color) continue;
        mat = mat || m.material;
        const g = m.geometry.clone();
        _mw.multiplyMatrices(_inv, m.matrixWorld);
        g.applyMatrix4(_mw);
        parts.push(g);
      }
      if (!parts.length) return;
      const geo = merge(parts);
      for (const g of parts) g.dispose();
      impostor = new THREE.Mesh(geo, mat);
      impostor.name = 'impostor'; impostor.castShadow = false; impostor.receiveShadow = false;
      h.group.add(impostor);
      h.joints.body.visible = false;
    } catch (e) { dropImpostor(); }
  }
  function dropImpostor() {
    if (impostor) { h.group.remove(impostor); impostor.geometry.dispose(); impostor = null; }
    h.joints.body.visible = true;
  }
  // Haltung einschwingen lassen (Idle/Sitzen) und dann einfrieren
  function settleAndBake() {
    if (lod !== 'lite') return;
    h.joints.body.visible = true;
    for (let i = 0; i < 5; i++) h.update(0.3, null);
    bakeImpostor();
  }
  applyShadows();

  // ---- Aura je Blick-Stufe ----
  function syncAura(view, bond, verstimmt, force) {
    const snap = emotion.get();
    const key = JSON.stringify([snap, view, bond, verstimmt, lod]);
    if (!force && key === lastView) return;
    lastView = key;
    const A = h.aura;
    if (!view || !view.aura || lod === 'hidden') { A.clear(); A.setInner(null); A.setBoundary(null); A.setTanks(null); A.setStreitTier(null); A.setHotspots(null); return; }
    const p = { emotion: snap.primary[0], intensity: view.doppel ? snap.primary[1] : 5 };
    const s = view.doppel && snap.secondary ? { emotion: snap.secondary[0], intensity: snap.secondary[1] } : null;
    A.setEmotion(p, s);
    A.setSymbols(view.symbols !== false);
    A.setInner(view.masken && snap.inner ? { emotion: snap.inner[0], intensity: snap.inner[1] } : null);
    A.setMaskView(!!(view.masken && snap.inner));
    A.setBoundary(view.grenzen ? boundaryRadius(def.boundary, bond, snap) : null, { color: verstimmt ? '#ff6b6b' : (def.color || '#ffd166') });
    A.setTanks(view.tanks ? Object.fromEntries(TANKS.map((t) => [t, tanks.value(t) / 100])) : null);
    A.setStreitTier(view.streittiere ? streitStilFor(def, view.vs || null) : null);
    A.setHotspots(view.koerper && snap.heat > 30 ? (snap.heat > 70 ? ['faeuste', 'kiefer'] : ['bauch', 'schultern']) : null);
  }

  const npc = {
    id: def.id, def, humanoid: h, group: h.group, emotion, tanks, tag,
    get position() { return pos; },
    get yaw() { return yaw; },
    get anim() { return anim; },
    get lod() { return lod; },
    get site() { return curSite; },
    get entry() { return curEntry; },
    get override() { return override; },
    get hidden() { return hiddenByRoutine; },
    get name() { return tag.name || displayName(def, names()); },
    get color() { return def.color || '#ffd166'; },
    get busy() { return !!override || !!facing; },
    setName(n) { tag.set({ name: n }); },
    setLod(l) {
      if (l === lod) return;
      const wasFull = lod === 'full';
      lod = l;
      h.group.visible = l !== 'hidden' && !hiddenByRoutine;
      if (l === 'full') { dropImpostor(); h.setDetail('full'); poseT = 0; lastView = null; }
      else { if (wasFull) h.setDetail('lite'); if (l === 'lite') settleAndBake(); else dropImpostor(); }
      applyShadows();
    },
    // Übersteuerung (Nachtwache, Szene): Ort, Blick, Animation, Posen. Der Tagesablauf pausiert.
    setOverride(o) {
      override = o ? { ...o } : null;
      if (override && typeof override.x === 'number') target = { x: override.x, z: override.z, anim: override.anim || 'idle', site: null };
      if (override && override.poses) h.setPoses(override.poses);
      return npc;
    },
    clearOverride() { override = null; curEntry = undefined; h.setPoses({}); facing = null; h.lookAt(null); return npc; },
    // Gespräch: Figur wendet sich dem Punkt zu (null = frei)
    face(p) { facing = p ? { x: p.x, y: p.y || 0, z: p.z } : null; if (!p) h.lookAt(null); return npc; },
    warpTo(x, z, y) { place(x, z); target = null; if (y !== undefined) yaw = targetYaw = y; h.group.rotation.y = yaw; return npc; },
    distTo(p) { return Math.hypot(pos.x - p.x, pos.z - p.z); },
    boundary(bond) { return boundaryRadius(def.boundary, bond, emotion.get()); },
    update(dt, ctx) {
      const { hour, camera, playerPos, view, bond = 0, verstimmt = false } = ctx;
      if (!override) routine(hour, playerPos);
      if (hiddenByRoutine && !override) { h.group.visible = false; return; }
      if (lod !== 'hidden') h.group.visible = true;
      // Laufen zum Ziel
      if (target) {
        const arrived = moveToward(dt, target.x, target.z, override && override.run ? RUN_SPEED : WALK_SPEED);
        if (arrived) {
          const a = target.anim; const y = override && typeof override.yaw === 'number' ? override.yaw : targetYaw;
          target = null; setAnim(a); targetYaw = y;
          if (override && override.onArrive) { const f = override.onArrive; override.onArrive = null; f(npc); }
        } else { setAnim(override && override.run ? 'run' : 'walk'); h.setMoveSpeed(override && override.run ? RUN_SPEED : WALK_SPEED); }
      } else if (facing) {
        targetYaw = Math.atan2(facing.x - pos.x, facing.z - pos.z);
        if (anim === 'walk' || anim === 'run') setAnim(override && override.anim ? override.anim : (curEntry && curEntry.anim) || 'idle');
      } else if (anim === 'walk' || anim === 'run') setAnim((override && override.anim) || (curEntry && curEntry.anim) || 'idle');
      if (anim !== 'walk' && anim !== 'run') h.setMoveSpeed(0);
      turnTo(dt, targetYaw);
      const dP = playerPos ? Math.hypot(playerPos.x - pos.x, playerPos.z - pos.z) : 99;
      if (lod !== 'full') {   // lite: steht als Impostor, nur Aura und Schild laufen weiter
        auraT -= dt;
        if (auraT <= 0) { auraT = 0.6; syncAura(view, bond, verstimmt, false); }
        h.aura.update(dt, camera);
        tag.update(dP);
        return;
      }
      // Blick zur spielenden Person, wenn sie nah ist
      if (facing) h.lookAt({ x: facing.x, y: facing.y + 1.55, z: facing.z });
      else if (override && override.lookAt) h.lookAt(override.lookAt);
      else if (dP < 6 && anim !== 'walk' && anim !== 'run' && anim !== 'sit') h.lookAt({ x: playerPos.x, y: playerPos.y + 1.55, z: playerPos.z });
      else h.lookAt(null);
      // Körpersprache aus dem Gefühlsmodell (alle 0,5 s), außer die Szene setzt Posen
      poseT -= dt;
      if (poseT <= 0 && !(override && override.poses)) { poseT = 0.5; h.setPoses(bodyFor(emotion.get(), { verstimmt })); }
      auraT -= dt;
      if (auraT <= 0) { auraT = 0.4; syncAura(view, bond, verstimmt, false); }
      tag.update(dP);
      h.update(dt, camera);
    },
    rebake() { if (lod === 'lite') bakeImpostor(); },
    get impostor() { return !!impostor; },
    dispose() { dropImpostor(); root.remove(h.group); tag.dispose(); h.dispose(); },
  };
  npc.setLod('lite');
  return npc;
}

export const EMOTION_TINT = EMOTION_COLORS;

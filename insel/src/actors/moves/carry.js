// Tragen (WP12): Getragene Dinge schwappen, wenn man rennt, ruckartig lenkt oder hart landet.
// Schwapp-Modell (rein, testbar): createSlosh() · tick(dt, { speed, accel, impact }) → verschütteter Anteil.
// Zustand 'carry' nutzt die Boden-/Luft-Physik (ctx.carrying gesetzt) und misst das Schwappen.
// Ereignisse: carry:start {id} · carry:spill {id, amount, fill, slosh} (gedrosselt) · carry:drop {id, fill} · carry:empty {id}
import * as THREE from 'three';
import { K } from './index.js';

export const SLOSH = { threshold: 0.3, rate: 0.22, decay: 1.6, runFrom: 3.8, runK: 3.2, accelK: 0.05, impactFrom: 4.5, impactK: 0.035 };

export function createSlosh(opts = {}) {
  const P = { ...SLOSH, ...opts };
  const s = {
    slosh: 0, fill: 1, spilled: 0, sensitivity: 1,
    // dt, speed (m/s), accel (|Δv| in m/s in diesem Schritt), impact (Landegeschwindigkeit m/s, sonst 0)
    tick(dt, { speed = 0, accel = 0, impact = 0 } = {}) {
      const k = s.sensitivity;
      s.slosh += Math.max(0, speed - P.runFrom) / 2.6 * P.runK * dt * k;
      s.slosh += accel * P.accelK * k;
      s.slosh -= P.decay * dt;
      let spill = 0;
      if (impact > P.impactFrom) { spill += (impact - P.impactFrom) * P.impactK * k; s.slosh += 0.5; }
      s.slosh = Math.max(0, Math.min(1, s.slosh));
      spill += Math.max(0, s.slosh - P.threshold) * P.rate * dt * k;
      spill = Math.min(spill, s.fill);
      s.fill -= spill;
      s.spilled += spill;
      return spill;
    },
    reset(fill = 1) { s.slosh = 0; s.fill = fill; s.spilled = 0; },
  };
  return s;
}

// Einfaches Standard-Objekt: gläserner Tank mit Wasserstand (andere Module geben eigene Meshes mit)
export function makeTankMesh(color = '#37c8e6') {
  const g = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.17, 0.42, 8, 1, true), new THREE.MeshLambertMaterial({ color: '#dff6ff', transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false }));
  glass.position.y = 0.21;
  const water = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.16, 0.38, 8, 1), new THREE.MeshLambertMaterial({ color, transparent: true, opacity: 0.8 }));
  water.position.y = 0.19;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.025, 4, 10), new THREE.MeshLambertMaterial({ color: '#c9a45c' }));
  rim.rotation.x = Math.PI / 2; rim.position.y = 0.42;
  g.add(glass, water, rim);
  g.userData.setFill = (f) => { water.scale.y = Math.max(0.03, f); water.position.y = 0.19 * Math.max(0.03, f); };
  return g;
}

export function createCarry(ctx) {
  const slosh = createSlosh();
  let item = null;
  let lastVx = 0, lastVz = 0;
  let spillT = 0, spillAcc = 0;
  let sub = 'ground';
  const anchor = new THREE.Group();          // vor der Brust
  anchor.position.set(0, 0.18, 0.36);
  let tilt = 0;

  function attach(it) {
    const h = ctx.humanoid;
    h.joints.spine.add(anchor);
    if (it.mesh) { anchor.add(it.mesh); it.mesh.position.set(0, 0, 0); }
    if (it.mesh && it.mesh.userData.setFill) it.mesh.userData.setFill(it.fill);
  }
  function detach() {
    if (item && item.mesh) anchor.remove(item.mesh);
    if (anchor.parent) anchor.parent.remove(anchor);
  }

  const carry = {
    name: 'carry',
    get item() { return item; },
    get slosh() { return slosh; },
    get sub() { return sub; },
    // Aufnehmen: { id, mesh?, kind:'tank', color?, slosh (Empfindlichkeit 0–2), fill (0–1), fragile }
    pickUp(def) {
      const it = { id: def.id || 'ding', kind: def.kind || 'tank', sensitivity: def.slosh === undefined ? 1 : def.slosh, fill: def.fill === undefined ? 1 : def.fill, fragile: !!def.fragile, mesh: def.mesh || null, data: def };
      if (!it.mesh) it.mesh = makeTankMesh(def.color);
      slosh.reset(it.fill);
      slosh.sensitivity = it.sensitivity;
      item = it;
      ctx.carrying = it;
      attach(it);
      ctx.events.emit('carry:start', { id: it.id, fill: it.fill });
      ctx.audio.play('pickup');
      return it;
    },
    drop({ place = true } = {}) {
      if (!item) return null;
      const it = item;
      it.fill = slosh.fill;
      detach();
      item = null;
      ctx.carrying = null;
      // vor der Figur abstellen (Rückgabe: Weltposition für das aufrufende System)
      const p = ctx.pos;
      const at = { x: p.x + Math.sin(ctx.yaw) * 0.7, z: p.z + Math.cos(ctx.yaw) * 0.7 };
      at.y = ctx.groundAt(at.x, at.z, p.y).y;
      ctx.events.emit('carry:drop', { id: it.id, fill: it.fill, at, place });
      return { item: it, at };
    },
    enter(d, from) {
      sub = ctx.grounded ? 'ground' : 'air';
      if (d && d.impact !== undefined) sub = 'ground';
      const m = ctx.moves[sub];
      m.enter(d, from);
      lastVx = ctx.vel.x; lastVz = ctx.vel.z;
    },
    exit(to) { ctx.moves[sub].exit(to); if (to !== 'carry') { /* Gegenstand bleibt bis drop() */ } },
    update(dt) {
      if (!item) return ctx.go(ctx.grounded ? 'ground' : 'air');
      const { vel } = ctx;
      // Physik des Unterzustands; Übergänge Boden↔Luft bleiben im Tragen-Zustand
      ctx.transitionHook = (name, data) => {
        if (name === 'ground' || name === 'air') {
          const prev = sub;
          ctx.moves[prev].exit(name);
          sub = name;
          ctx.moves[sub].enter(data, prev);
          return 'carry';
        }
        return name;
      };
      const r = ctx.moves[sub].update(dt);
      ctx.transitionHook = null;
      // Schwappen messen
      const speed = Math.hypot(vel.x, vel.z);
      const accel = Math.hypot(vel.x - lastVx, vel.z - lastVz);
      lastVx = vel.x; lastVz = vel.z;
      const impact = ctx.lastImpact; ctx.lastImpact = 0;
      const spill = slosh.tick(dt, { speed, accel, impact });
      if (item.mesh && item.mesh.userData.setFill) item.mesh.userData.setFill(slosh.fill);
      // Neigung des Tanks nach dem Schwappen
      tilt += ((slosh.slosh * 0.35 * Math.sin(ctx.time * 9)) - tilt) * Math.min(1, dt * 8);
      anchor.rotation.z = tilt; anchor.rotation.x = -slosh.slosh * 0.15;
      if (spill > 0) {
        spillAcc += spill; spillT += dt;
        if (spillT > 0.25 || impact > 0) {
          const p = ctx.pos;
          ctx.particles.emit({ x: p.x + Math.sin(ctx.yaw) * 0.4, y: p.y + 1.25, z: p.z + Math.cos(ctx.yaw) * 0.4, count: Math.min(12, 3 + Math.round(spillAcc * 40)), spread: 0.35, speed: 1.2, up: 1.4, color: 0x9ae8ff, size: 0.28, life: 0.6, gravity: -9, drag: 0.6, alpha: 0.85 });
          ctx.events.emit('carry:spill', { id: item.id, amount: spillAcc, fill: slosh.fill, slosh: slosh.slosh, impact });
          spillT = 0; spillAcc = 0;
          if (slosh.fill <= 0.001) ctx.events.emit('carry:empty', { id: item.id });
        }
      }
      return r;
    },
  };
  return carry;
}

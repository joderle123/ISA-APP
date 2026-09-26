// Spielfigur-Steuerung: kamerabezogene Bewegung, Beschleunigung, Drehen, Rennen, Springen mit Schwerkraft,
// Geländefolgen, Hangbegrenzung, Kollision, flaches Wasser bremst (Spritzer), tiefes Meer = weiche Grenze.
import * as THREE from 'three';
import { createHumanoid } from './humanoid.js';
import { SLOPE_LIMIT, WORLD_LIMIT } from '../world/island.js';

const RUN_SPEED = 6.4;
const GRAVITY = 28;
const JUMP_V = 10.2;
const RADIUS = 0.36;
const MAX_WADE = 1.45;   // tiefer: nicht weiter

export const DEFAULT_PLAYER_LOOK = {
  skin: '#f0c09a', hair: '#2e2019', hairStyle: 'kurz', top: '#ff5d73', topStyle: 'hoodie',
  bottoms: '#2f4a7a', bottomsStyle: 'lang', shoes: '#ffffff', accessory: 'rucksack', accessoryColor: '#ffd166',
};

function angleLerp(a, b, t) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

export function createPlayer({ scene, island, colliders, input, audio, particles, events, look }) {
  const humanoid = createHumanoid({ ...DEFAULT_PLAYER_LOOK, ...(look || {}) }, { name: 'player' });
  scene.add(humanoid.group);

  const pos = new THREE.Vector3(island.spawn.x, 0, island.spawn.z);
  const vel = new THREE.Vector3();
  const _n = { x: 0, y: 1, z: 0 };
  let yaw = island.spawn.yaw;
  let grounded = true;
  let groundY = 0;
  let surface = 'grass';
  let enabled = true;
  let customAnim = null, customT = 0;
  let splashT = 0, airTime = 0;
  let cameraYaw = 0;

  function groundAt(x, z, feetY) {
    const t = island.getHeight(x, z);
    const s = colliders.surfaceHeight(x, z, feetY, 0.65);
    return s > t ? { y: s, surf: colliders.lastSurface } : { y: t, surf: null };
  }
  function tooSteep(x, z) { return island.getNormal(x, z, false, _n).y < SLOPE_LIMIT; }
  function isBlocked(x, z, fromY) {
    if (Math.hypot(x, z) > WORLD_LIMIT) return true;
    const g = groundAt(x, z, fromY);
    const wl = island.waterLevel(x, z);
    if (wl - g.y > MAX_WADE) return true;
    if (!g.surf && g.y > fromY + 0.25 && tooSteep(x, z)) return true;
    if (g.y > fromY + 1.1 && grounded) return true;
    return false;
  }

  const g0 = groundAt(pos.x, pos.z, 50);
  pos.y = g0.y;
  groundY = g0.y;

  humanoid.onStep = (foot) => {
    if (!grounded) return;
    const sp = Math.hypot(vel.x, vel.z);
    const inWater = island.waterLevel(pos.x, pos.z) - groundY > 0.12;
    const s = inWater ? 'water' : surface;
    audio.footstep(s === 'path' || s === 'ash' ? 'sand' : s, Math.min(1, 0.4 + sp / RUN_SPEED));
    if (sp > 3.8 && !inWater && (surface === 'sand' || surface === 'path' || surface === 'ash')) {
      const c = surface === 'sand' ? 0xf1dcae : surface === 'ash' ? 0x8a776e : 0xd8b07a;
      const side = foot === 'L' ? 1 : -1;
      const ox = Math.cos(yaw) * 0.12 * side, oz = -Math.sin(yaw) * 0.12 * side;
      particles.emit({ x: pos.x + ox, y: pos.y + 0.1, z: pos.z + oz, count: 4, spread: 0.3, speed: 0.9, up: 0.9, color: c, size: 0.45, life: 0.7, gravity: -0.5, drag: 3, grow: 1.6, alpha: 0.55 });
    }
  };

  const player = {
    humanoid,
    position: pos,
    velocity: vel,
    radius: RADIUS,
    get yaw() { return yaw; },
    set yaw(v) { yaw = v; },
    get grounded() { return grounded; },
    get surface() { return surface; },
    get speed() { return Math.hypot(vel.x, vel.z); },
    get enabled() { return enabled; },
    // Kamera meldet ihre Blickrichtung (für kamerabezogene Steuerung)
    setCameraYaw(v) { cameraYaw = v; },
    setEnabled(v) { enabled = !!v; if (!v) { vel.x = 0; vel.z = 0; } },
    setLook(cfg) { humanoid.setConfig(cfg); },
    // Sonder-Animation (z. B. 'wave', 'cheer', 'talk') für n Sekunden (0 = bis stopAnim)
    playAnim(name, seconds = 2) { customAnim = name; customT = seconds || Infinity; },
    stopAnim() { customAnim = null; },
    teleport(x, z, newYaw) {
      const g = groundAt(x, z, 999);
      pos.set(x, g.y, z);
      vel.set(0, 0, 0);
      grounded = true;
      groundY = g.y;
      if (newYaw !== undefined) yaw = newYaw;
      humanoid.group.position.copy(pos);
      humanoid.group.rotation.y = yaw;
      events.emit('player:teleport', { x, z });
    },
    update(dt) {
      if (dt <= 0) { humanoid.update(0); return; }
      const st = input.state;
      // ---- Wunschrichtung (kamerabezogen) ----
      let mx = 0, mz = 0, mag = 0;
      if (enabled) {
        const fx = -Math.sin(cameraYaw), fz = -Math.cos(cameraYaw);
        const rx = Math.cos(cameraYaw), rz = -Math.sin(cameraYaw);
        mx = rx * st.move.x + fx * st.move.y;
        mz = rz * st.move.x + fz * st.move.y;
        mag = Math.min(1, Math.hypot(st.move.x, st.move.y));
      }
      const l = Math.hypot(mx, mz);
      if (l > 0) { mx /= l; mz /= l; }
      let target = Math.pow(mag, 1.15) * RUN_SPEED;
      const wl = island.waterLevel(pos.x, pos.z);
      const depth = wl - groundY;
      if (depth > 0.25) target *= THREE.MathUtils.lerp(1, 0.5, Math.min(1, (depth - 0.25) / 1.0));
      const acc = grounded ? 11 : 3.5;
      const k = 1 - Math.exp(-acc * dt);
      vel.x += (mx * target - vel.x) * k;
      vel.z += (mz * target - vel.z) * k;
      if (mag > 0.05) yaw = angleLerp(yaw, Math.atan2(mx, mz), 1 - Math.exp(-dt * 12));

      // ---- Springen / Schwerkraft ----
      if (enabled && st.jump && grounded) {
        vel.y = JUMP_V * (depth > 0.8 ? 0.7 : 1);
        grounded = false;
        audio.play('jump');
        events.emit('player:jump');
        particles.emit({ x: pos.x, y: pos.y + 0.1, z: pos.z, count: 6, spread: 0.5, speed: 1.4, up: 0.6, color: 0xffffff, size: 0.4, life: 0.5, gravity: -1, drag: 3, alpha: 0.45 });
      }
      if (!grounded) { vel.y -= GRAVITY * dt; airTime += dt; } else airTime = 0;

      // ---- Horizontal bewegen mit Hang-/Wassergrenze ----
      const nx = pos.x + vel.x * dt, nz = pos.z + vel.z * dt;
      const feet = pos.y;
      if (!isBlocked(nx, nz, feet)) { pos.x = nx; pos.z = nz; }
      else if (!isBlocked(nx, pos.z, feet)) { pos.x = nx; vel.z *= 0.5; }
      else if (!isBlocked(pos.x, nz, feet)) { pos.z = nz; vel.x *= 0.5; }
      else { vel.x *= 0.3; vel.z *= 0.3; }
      // weiche Grenze: aus tiefem Wasser zurückschieben
      const here = groundAt(pos.x, pos.z, pos.y);
      if (island.waterLevel(pos.x, pos.z) - here.y > MAX_WADE + 0.2) {
        const d = Math.hypot(pos.x, pos.z) || 1;
        pos.x -= (pos.x / d) * dt * 4; pos.z -= (pos.z / d) * dt * 4;
      }
      // Hindernisse
      colliders.resolve(pos, RADIUS, pos.y, 1.8);

      // ---- Vertikal ----
      const g = groundAt(pos.x, pos.z, pos.y);
      groundY = g.y;
      if (grounded) {
        if (g.y < pos.y - 0.6) { grounded = false; vel.y = 0; }
        else { pos.y = THREE.MathUtils.lerp(pos.y, g.y, Math.min(1, dt * 25)); if (Math.abs(pos.y - g.y) < 0.02) pos.y = g.y; vel.y = 0; }
      }
      if (!grounded) {
        pos.y += vel.y * dt;
        if (pos.y <= g.y && vel.y <= 0) {
          pos.y = g.y;
          const impact = -vel.y;
          vel.y = 0;
          grounded = true;
          if (airTime > 0.25) {
            audio.play('land');
            events.emit('player:land', { impact });
            particles.emit({ x: pos.x, y: pos.y + 0.08, z: pos.z, count: 10, spread: 0.6, speed: 2.2, up: 0.8, color: island.waterLevel(pos.x, pos.z) > g.y ? 0xe8fbff : 0xf0e2c4, size: 0.5, life: 0.6, gravity: -1.5, drag: 3, grow: 1.4, alpha: 0.5 });
          }
        }
      }
      surface = g.surf ? (g.surf.surface || 'wood') : island.surfaceAt(pos.x, pos.z, g.y);

      // ---- Wasser-Spritzer ----
      const sp = Math.hypot(vel.x, vel.z);
      const wdepth = island.waterLevel(pos.x, pos.z) - pos.y;
      if (wdepth > 0.1 && grounded && sp > 0.8) {
        splashT += dt;
        if (splashT > 0.09) {
          splashT = 0;
          const wy = island.waterLevel(pos.x, pos.z) + 0.05;
          particles.emit({ x: pos.x + vel.x * 0.05, y: wy, z: pos.z + vel.z * 0.05, count: 5, spread: 0.5, speed: 1.6, up: 2.6, color: 0xeafcff, size: 0.35, life: 0.55, gravity: -9, drag: 1, grow: 0.5, alpha: 0.8 });
        }
      }

      // ---- Animation ----
      humanoid.vy = vel.y;
      humanoid.setMoveSpeed(sp);
      if (customAnim) {
        customT -= dt;
        if (customT <= 0 || (sp > 1.5 && customAnim !== 'cheer')) customAnim = null;
      }
      if (!grounded && airTime > 0.08) humanoid.setAnim(vel.y > 0 ? 'jump' : 'fall');
      else if (sp > 0.35) humanoid.setAnim(sp > 3.2 ? 'run' : 'walk');
      else humanoid.setAnim(customAnim || 'idle');
      humanoid.update(dt);
      humanoid.group.position.copy(pos);
      humanoid.group.rotation.y = yaw;
      // Boden-Schatten
      const drop = pos.y - g.y;
      humanoid.blob.position.y = -drop + 0.04;
      humanoid.blob.scale.setScalar(Math.max(0.4, 1 - drop * 0.15));
      humanoid.blob.material.opacity = Math.max(0.2, 1 - drop * 0.2);
    },
  };
  humanoid.group.position.copy(pos);
  humanoid.group.rotation.y = yaw;
  return player;
}

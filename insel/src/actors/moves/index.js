// Bewegungs-Zustandsmaschine (WP12): gemeinsamer Kontext, Konstanten und Physik-Helfer für alle Move-Module.
// Zustände: ground · air · climb · glide · swim · dive · carry · locked  (siehe player.js)
// Jedes Move-Modul: create<Name>(ctx) → { name, enter(data, from), exit(to), update(dt) }.
// Übergänge: ctx.go('air', data). Absichten (ctx.intent) kommen vom Player (lokale Eingabe oder Netz).
import { createGround, createAir } from './ground.js';
import { createCarry } from './carry.js';
import { createClimb } from './climb.js';
import { createGlide } from './glide.js';
import { createSwim } from './swim.js';
import { createDive } from './dive.js';

export const K = {
  RUN_SPEED: 6.4,      // Sprint (Joystick weit / WASD)
  WALK_SPEED: 3.4,     // gemütlich (Umschalt / Joystick halb)
  GRAVITY: 28,
  JUMP_V: 10.2,
  RADIUS: 0.36,
  HEIGHT: 1.8,
  MAX_WADE: 1.45,      // ohne Schwimmen: tiefer geht es nicht
  SWIM_DEPTH: 1.25,    // ab hier wird geschwommen (mit Fähigkeit)
  JUMP_BUFFER: 0.14,   // Sprung kurz vor der Landung gedrückt: wird beim Aufsetzen ausgeführt
  COYOTE: 0.12,        // Sprung kurz nach dem Verlassen einer Kante: zählt noch
  VOID_Y: -14,         // tiefer als das = Leere → Neustart an der letzten Kante
  RESPAWN_FADE: 0.45,  // Sekunden bis zum Teleport (gesamt < 2 s)
};

export const STATES = ['ground', 'air', 'climb', 'glide', 'swim', 'dive', 'carry', 'locked'];

export function angleLerp(a, b, t) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const damp = (k, dt) => 1 - Math.exp(-k * dt);

// Wunschrichtung aus der Absicht (kamerabezogen) → { mx, mz, mag } (normiert)
export function wishDir(intent) {
  const cy = intent.camYaw || 0;
  const fx = -Math.sin(cy), fz = -Math.cos(cy);
  const rx = Math.cos(cy), rz = -Math.sin(cy);
  let mx = rx * intent.x + fx * intent.y;
  let mz = rz * intent.x + fz * intent.y;
  const mag = Math.min(1, Math.hypot(intent.x, intent.y));
  const l = Math.hypot(mx, mz);
  if (l > 0) { mx /= l; mz /= l; }
  return { mx, mz, mag };
}

// Zielgeschwindigkeit am Boden: sanfte Kurve, Sprint bei voller Auslenkung
export function groundTarget(mag, speedMod = 1) {
  return Math.pow(mag, 1.15) * K.RUN_SPEED * speedMod;
}

// Horizontal beschleunigen (exponentiell, kein Eingabeverzug)
export function accelerate(vel, mx, mz, target, acc, dt) {
  const k = damp(acc, dt);
  vel.x += (mx * target - vel.x) * k;
  vel.z += (mz * target - vel.z) * k;
}

// Horizontal bewegen mit Hang-/Wasser-/Weltgrenze; blockierte Achsen bremsen. Gibt true zurück, wenn frei.
export function moveBlocked(ctx, dt, opts = {}) {
  const { pos, vel } = ctx;
  const nx = pos.x + vel.x * dt, nz = pos.z + vel.z * dt;
  const feet = pos.y;
  const blocked = (x, z) => ctx.isBlocked(x, z, feet, opts);
  if (!blocked(nx, nz)) { pos.x = nx; pos.z = nz; return true; }
  if (!blocked(nx, pos.z)) { pos.x = nx; vel.z *= 0.5; return false; }
  if (!blocked(pos.x, nz)) { pos.z = nz; vel.x *= 0.5; return false; }
  vel.x *= 0.3; vel.z *= 0.3;
  return false;
}

// Alle Move-Module erzeugen
export function createMoves(ctx) {
  const moves = {
    ground: createGround(ctx),
    air: createAir(ctx),
    carry: createCarry(ctx),
    climb: createClimb(ctx),
    glide: createGlide(ctx),
    swim: createSwim(ctx),
    dive: createDive(ctx),
    locked: createLocked(ctx),
  };
  return moves;
}

// Gesperrt (Dialog, Zwischensequenz, Neustart): steht, folgt dem Boden, keine Eingabe
function createLocked(ctx) {
  let data = null;
  return {
    name: 'locked',
    enter(d) { data = d || {}; ctx.vel.set(0, 0, 0); },
    exit() { data = null; },
    get data() { return data; },
    update(dt) {
      const { pos } = ctx;
      // sanft auf den Boden (z. B. nach Teleport), sonst nichts
      const g = ctx.groundAt(pos.x, pos.z, pos.y);
      ctx.groundY = g.y;
      if (pos.y > g.y + 0.05) pos.y = Math.max(g.y, pos.y - 6 * dt);
      else pos.y = g.y;
      ctx.grounded = true;
      ctx.setBaseAnim(data && data.anim ? data.anim : 'idle');
    },
  };
}

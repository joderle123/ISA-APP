// Boden und Luft (WP12): Laufen/Sprinten, Springen mit Puffer und Kanten-Toleranz, Schwerkraft, Landung,
// Pumpsprung (pump.js), Übergänge zu Schwimmen, Klettern, Segel, Tragen und Neustart (Leere/Lava).
// Wird auch vom Tragen-Zustand als Physik genutzt (ctx.carrying gesetzt → Tempo und Sprung gedämpft, kein Klettern/Segel).
import { K, wishDir, groundTarget, accelerate, moveBlocked, angleLerp, damp, clamp } from './index.js';
import { createPump } from './pump.js';

export function createGround(ctx) {
  const pump = createPump(ctx);
  let splashT = 0;
  let safeT = 0;
  let sprintT = 0, sprinting = false;

  function footsteps(sp) {
    // Schritt-Ereignisse kommen aus der Humanoid-Animation (onStep); hier nur Sprint-Zähler
    if (sp > 5.2 && ctx.intent.run) {
      sprintT += ctx.dt;
      if (!sprinting) { sprinting = true; ctx.events.emit('player:sprint:start'); }
    } else if (sprinting) {
      sprinting = false;
      ctx.events.emit('player:sprint:stop', { seconds: sprintT });
      sprintT = 0;
    }
    ctx.sprintTime = sprintT;
    ctx.sprinting = sprinting;
  }

  const ground = {
    name: 'ground',
    pump,
    get sprinting() { return sprinting; },
    enter(data, from) {
      ctx.grounded = true;
      ctx.airTime = 0;
      ctx.vel.y = 0;
      if (data && data.charge) pump.start();
    },
    exit() {
      pump.cancel();
      if (sprinting) { sprinting = false; ctx.events.emit('player:sprint:stop', { seconds: sprintT }); sprintT = 0; }
    },
    update(dt) {
      const { pos, vel, intent } = ctx;
      const carrying = !!ctx.carrying;
      // ---- Wunschrichtung ----
      const { mx, mz, mag } = wishDir(intent);
      let target = groundTarget(mag, ctx.mod.speed * (carrying ? 0.86 : 1));
      const wl = ctx.waterLevel(pos.x, pos.z);
      const depth = wl - ctx.groundY;
      if (depth > 0.25) target *= 1 - 0.5 * clamp((depth - 0.25) / 1.0, 0, 1);
      // Pumpsprung: beim Anspannen steht man
      const charging = pump.charging;
      if (charging) target = 0;
      accelerate(vel, mx, mz, target, 11, dt);
      if (mag > 0.05 && !charging) ctx.yaw = angleLerp(ctx.yaw, Math.atan2(mx, mz), damp(12, dt));

      // ---- Springen (Puffer + Kanten-Toleranz) ----
      if (intent.jump) ctx.jumpBufferT = K.JUMP_BUFFER;
      ctx.coyoteT = K.COYOTE;
      const pumped = pump.update(dt);       // → Pumpsprung ausgelöst?
      if (pumped) { ctx.jumpBufferT = 0; return ctx.jump(K.JUMP_V * pumped, { pump: true }); }
      if (ctx.jumpBufferT > 0 && vel.y <= 0.01 && !charging) {
        ctx.jumpBufferT = 0;
        return ctx.jump(K.JUMP_V * (depth > 0.8 ? 0.7 : 1) * (carrying ? 0.85 : 1) * ctx.mod.jump);
      }
      ctx.jumpBufferT = Math.max(0, ctx.jumpBufferT - dt);

      // ---- Horizontal ----
      moveBlocked(ctx, dt);
      ctx.softWaterBoundary(dt);
      ctx.colliders.resolve(pos, K.RADIUS, pos.y, K.HEIGHT);

      // ---- Vertikal: Boden folgen, Kante = Luft ----
      const g = ctx.groundAt(pos.x, pos.z, pos.y);
      ctx.groundY = g.y;
      ctx.groundSurface = g.surf;
      if (g.y < pos.y - 0.6) { return ctx.go('air', { coyote: true }); }
      pos.y += (g.y - pos.y) * Math.min(1, dt * 25);
      if (Math.abs(pos.y - g.y) < 0.02) pos.y = g.y;
      vel.y = 0;
      ctx.surface = g.surf ? (g.surf.surface || 'wood') : ctx.island.surfaceAt(pos.x, pos.z, g.y);

      // ---- Wasser: schwimmen oder Spritzer ----
      const wdepth = ctx.waterLevel(pos.x, pos.z) - pos.y;
      if (wdepth > K.SWIM_DEPTH && ctx.abilities.schwimmen && !carrying) return ctx.go('swim', { from: 'ground' });
      const sp = Math.hypot(vel.x, vel.z);
      if (wdepth > 0.1 && sp > 0.8) {
        splashT += dt;
        if (splashT > 0.09) {
          splashT = 0;
          const wy = wl + 0.05;
          ctx.particles.emit({ x: pos.x + vel.x * 0.05, y: wy, z: pos.z + vel.z * 0.05, count: 5, spread: 0.5, speed: 1.6, up: 2.6, color: 0xeafcff, size: 0.35, life: 0.55, gravity: -9, drag: 1, grow: 0.5, alpha: 0.8 });
        }
      }

      // ---- Lava / Leere ----
      if (ctx.inLava(pos)) return ctx.respawn('lava');

      // ---- Klettern: gegen kletterbare Fläche laufen ----
      if (ctx.abilities.klettern && !carrying && mag > 0.3 && ctx.climbables) {
        const c = ctx.climbables.grab(pos, mx, mz, { reach: 0.55 * ctx.mod.grabTolerance, grounded: true });
        if (c) return ctx.go('climb', c);
      }

      // ---- sicherer Punkt für den Neustart ----
      safeT += dt;
      if (safeT > 0.4) {
        safeT = 0;
        if (g.surf || ctx.isSafeSpot(pos.x, pos.z)) ctx.markSafe();
      }

      footsteps(sp);
      // ---- Animation ----
      if (charging) ctx.setBaseAnim('idle', 'charge');
      else if (sp > 0.35) ctx.setBaseAnim(sp > 3.2 ? 'run' : 'walk', carrying ? 'carry' : null);
      else ctx.setBaseAnim(ctx.customAnim || 'idle', carrying ? 'carry' : null);
      return null;
    },
  };
  return ground;
}

export function createAir(ctx) {
  let sinceJump = 0;
  let heldSinceJump = false;   // Sprungknopf seit dem Absprung durchgehend gehalten (Pumpsprung-Geste / Segel)
  let fromWater = false;
  let data = null;

  const air = {
    name: 'air',
    get heldSinceJump() { return heldSinceJump; },
    enter(d, from) {
      data = d || {};
      ctx.grounded = false;
      sinceJump = 0;
      fromWater = !!data.fromWater;
      heldSinceJump = !!data.jumped && ctx.intent.jumpHeld;
      ctx.coyoteT = data.coyote ? K.COYOTE : 0;
      if (from === 'ground' || from === 'carry') ctx.airTime = 0;
    },
    exit() { data = null; },
    update(dt) {
      const { pos, vel, intent } = ctx;
      const carrying = !!ctx.carrying;
      sinceJump += dt;
      ctx.airTime += dt;
      if (!intent.jumpHeld) heldSinceJump = false;

      // ---- Steuerung in der Luft (schwach) ----
      const { mx, mz, mag } = wishDir(intent);
      const target = groundTarget(mag, ctx.mod.speed * (carrying ? 0.86 : 1));
      accelerate(vel, mx, mz, target, 3.5, dt);
      if (mag > 0.05) ctx.yaw = angleLerp(ctx.yaw, Math.atan2(mx, mz), damp(8, dt));

      // ---- Sprung (Puffer, Kanten-Toleranz) ----
      if (intent.jump) ctx.jumpBufferT = K.JUMP_BUFFER;
      ctx.coyoteT = Math.max(0, ctx.coyoteT - dt);
      if (ctx.jumpBufferT > 0 && ctx.coyoteT > 0 && vel.y <= 0.01) {
        ctx.jumpBufferT = 0; ctx.coyoteT = 0;
        return ctx.jump(K.JUMP_V * (carrying ? 0.85 : 1) * ctx.mod.jump);
      }

      // ---- Segel öffnen: neuer Druck in der Luft, oder halten mit viel Luft unter den Füßen ----
      if (ctx.abilities.segel && !carrying) {
        const g0 = ctx.groundAt(pos.x, pos.z, pos.y);
        const above = pos.y - Math.max(g0.y, ctx.waterLevel(pos.x, pos.z));
        const freshPress = intent.jump && ctx.jumpBufferT > 0 && sinceJump > 0.05 && ctx.coyoteT <= 0;
        const heldHigh = heldSinceJump && intent.jumpHeld && vel.y < 0 && above > 2.6;
        const heldLate = intent.jumpHeld && !heldSinceJump && ctx.intent.jumpHoldTime > 0.02 && vel.y < 2 && above > 1.2 && ctx.coyoteT <= 0 && sinceJump > 0.15;
        if (freshPress || heldHigh || heldLate) { ctx.jumpBufferT = 0; return ctx.go('glide', { vel: vel.clone() }); }
      }

      // ---- Schwerkraft + Aufwind ----
      vel.y -= K.GRAVITY * dt;
      if (ctx.updrafts) {
        const lift = ctx.updrafts.liftAt(pos.x, pos.y, pos.z);
        if (lift > 0) vel.y += (Math.max(vel.y, 0) < lift * 0.35 ? lift * 0.35 * 2.2 : 0) * dt;
      }
      if (vel.y < -34) vel.y = -34;

      // ---- Bewegen ----
      moveBlocked(ctx, dt, { air: true });
      ctx.colliders.resolve(pos, K.RADIUS, pos.y, K.HEIGHT);
      pos.y += vel.y * dt;

      // ---- Klettern: Fläche im Flug berühren ----
      if (ctx.abilities.klettern && !carrying && ctx.climbables && ctx.grabCooldown <= 0 && vel.y < 3) {
        const c = ctx.climbables.grab(pos, mx, mz, { reach: 0.45 * ctx.mod.grabTolerance, grounded: false, vy: vel.y });
        if (c) return ctx.go('climb', c);
      }

      // ---- Wasser ----
      const wl = ctx.waterLevel(pos.x, pos.z);
      const g = ctx.groundAt(pos.x, pos.z, pos.y);
      ctx.groundY = g.y;
      if (pos.y <= wl - 0.35 && wl - g.y > K.SWIM_DEPTH && ctx.abilities.schwimmen && !carrying) {
        ctx.splash(1);
        return ctx.go('swim', { from: 'air', fromJump: fromWater });
      }

      // ---- Landung ----
      if (pos.y <= g.y && vel.y <= 0) {
        pos.y = g.y;
        const impact = -vel.y;
        vel.y = 0;
        ctx.land(impact);
        if (ctx.inLava(pos)) return ctx.respawn('lava');
        // Pumpsprung: Sprungknopf seit dem Absprung gehalten → beim Landen anspannen
        const charge = ctx.abilities.pump && heldSinceJump && intent.jumpHeld && !carrying;
        return ctx.go('ground', { charge, impact });   // beim Tragen leitet der Hook nach 'carry' um
      }
      // ---- Leere ----
      if (pos.y < K.VOID_Y || (wl - g.y > 6 && pos.y < wl - 8)) return ctx.respawn('leere');
      ctx.surface = g.surf ? (g.surf.surface || 'wood') : ctx.island.surfaceAt(pos.x, pos.z, g.y);

      if (ctx.airTime > 0.08) ctx.setBaseAnim(vel.y > 0 ? 'jump' : 'fall', carrying ? 'carry' : null);
      return null;
    },
  };
  return air;
}

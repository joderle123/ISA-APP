// Schwimmen (WP15): tiefes Wasser wird automatisch geschwommen (Fähigkeit schwimmen), keine Ausdauer, kein Ertrinken.
// Springen = Delfinsprung (Bogen aus dem Wasser, dann wieder hinein). Tauchringe (runes.tauchringAt) → Tauchen.
// Ohne die Fähigkeit bleibt die alte weiche Grenze (MAX_WADE) in ground.js.
import { K, wishDir, accelerate, damp, angleLerp, clamp } from './index.js';

export const SWIM = { speed: 3.4, sprint: 4.4, acc: 6, bodyDepth: 0.62, dolphinUp: 7.6, dolphinFwd: 2.2 };

export function createSwim(ctx) {
  let phase = 0, rippleT = 0, t = 0, ringT = 0;
  const swim = {
    name: 'swim',
    enter(d) {
      const wl = ctx.waterLevel(ctx.pos.x, ctx.pos.z);
      ctx.pos.y = wl - SWIM.bodyDepth;
      ctx.vel.y = 0;
      ctx.vel.x *= 0.5; ctx.vel.z *= 0.5;
      ctx.grounded = false;
      ctx.airTime = 0;
      t = 0; ringT = 0;
      if (!d || d.from !== 'ground') ctx.splash(1);
      else ctx.audio.play('splash');
      ctx.events.emit('swim:start', d || {});
    },
    exit(to) { ctx.events.emit('swim:end', { to }); },
    update(dt) {
      const { pos, vel, intent } = ctx;
      t += dt;
      const { mx, mz, mag } = wishDir(intent);
      const target = Math.pow(mag, 1.1) * (intent.run && mag > 0.82 ? SWIM.sprint : SWIM.speed) * ctx.mod.speed;
      accelerate(vel, mx, mz, target, SWIM.acc, dt);
      if (mag > 0.05) ctx.yaw = angleLerp(ctx.yaw, Math.atan2(mx, mz), damp(6, dt));

      // ---- Delfinsprung ----
      if (intent.jump && t > 0.15) {
        const dx = Math.sin(ctx.yaw), dz = Math.cos(ctx.yaw);
        vel.x += dx * SWIM.dolphinFwd; vel.z += dz * SWIM.dolphinFwd;
        vel.y = SWIM.dolphinUp;
        pos.y = ctx.waterLevel(pos.x, pos.z) - 0.1;
        ctx.splash(1.2);
        ctx.audio.play('jump');
        ctx.events.emit('player:jump', { dolphin: true });
        return ctx.go('air', { fromWater: true, jumped: true });
      }

      // ---- Bewegen (Ufer: nur Steilufer blockieren) ----
      const nx = pos.x + vel.x * dt, nz = pos.z + vel.z * dt;
      const blocked = (x, z) => ctx.isBlocked(x, z, pos.y, { swim: true });
      if (!blocked(nx, nz)) { pos.x = nx; pos.z = nz; }
      else if (!blocked(nx, pos.z)) { pos.x = nx; vel.z *= 0.4; }
      else if (!blocked(pos.x, nz)) { pos.z = nz; vel.x *= 0.4; }
      else { vel.x *= 0.3; vel.z *= 0.3; }
      ctx.softWorldLimit(dt);
      ctx.colliders.resolve(pos, K.RADIUS, pos.y, 1.0);

      // ---- Wasserspiegel folgen (mit Wellen) ----
      const wl = ctx.waterLevel(pos.x, pos.z);
      const wave = ctx.water && ctx.water.waveHeight ? ctx.water.waveHeight(pos.x, pos.z) * 0.45 : 0;
      pos.y += ((wl - SWIM.bodyDepth + wave) - pos.y) * damp(8, dt);
      vel.y = 0;
      const g = ctx.groundAt(pos.x, pos.z, pos.y);
      ctx.groundY = g.y;
      ctx.surface = 'water';
      // Flach genug: waten
      if (wl - g.y < K.SWIM_DEPTH - 0.25) { pos.y = g.y; return ctx.go('ground', { fromWater: true }); }

      // ---- Tauchring ----
      ringT += dt;
      if (ctx.abilities.tauchen && ctx.runes && ringT > 0.3) {
        ringT = 0;
        const ring = ctx.runes.tauchringAt(pos.x, pos.z);
        if (ring) return ctx.go('dive', { from: 'swim', ring, x: ring.x, z: ring.z });
      }

      // ---- Optik ----
      const sp = Math.hypot(vel.x, vel.z);
      phase += dt * (1.6 + sp * 0.9);
      rippleT += dt;
      if (rippleT > (sp > 1 ? 0.12 : 0.5)) {
        rippleT = 0;
        ctx.particles.emit({ x: pos.x + (Math.random() - 0.5) * 0.6, y: wl + 0.03, z: pos.z + (Math.random() - 0.5) * 0.6, count: sp > 1 ? 3 : 1, spread: 0.4, speed: 0.5 + sp * 0.3, up: 0.6 + sp * 0.3, color: 0xeafcff, size: 0.35, life: 0.6, gravity: -6, drag: 1.5, alpha: 0.7 });
      }
      ctx.setBaseAnim('idle', 'swim', { phase, speed: sp });
      return null;
    },
  };
  return swim;
}

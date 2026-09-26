// Tauchen (WP15): Tauchringe oder der Trauer-Sturzflug führen in einen kurzen Unterwasser-Raum mit 3D-Schwimmen,
// blauem Nebel und automatischem Auftauchen. Man kann nicht ertrinken; ein Zeitlimit verhindert Feststecken.
// Anbindung an das Szenen-System (WP18): player.setDiveProvider({ enter(info, done) → { update(dt, ctx)?, exit() } });
// ohne Provider baut dive.js eine eingebaute „Testgrotte“ (world/diveroom, tief unter der Insel).
// Ereignisse: dive:enter {ring, x, z} · dive:room {id} · dive:exit {x, z, reason}
import { K, wishDir, damp, angleLerp, clamp } from './index.js';

export const DIVE = { speed: 3.2, rise: 2.6, timeout: 32, sink: 0.55, surfaceDelay: 0.5 };

export function createDive(ctx) {
  let phase = 0, t = 0, stage = 'sink', info = null, room = null, provider = null, bubbleT = 0;
  let entryPos = { x: 0, z: 0 };
  let yawTarget = 0;

  const dive = {
    name: 'dive',
    get stage() { return stage; },
    get info() { return info; },
    get room() { return room; },
    setProvider(p) { provider = p || null; },
    surface(reason = 'auto') {
      if (ctx.state !== 'dive' || stage === 'up') return;
      stage = 'up'; t = 0;
      ctx.events.emit('dive:surface', { reason });
    },
    enter(d) {
      info = d || {};
      entryPos = { x: info.x !== undefined ? info.x : ctx.pos.x, z: info.z !== undefined ? info.z : ctx.pos.z };
      stage = 'sink'; t = 0; phase = 0;
      ctx.grounded = false;
      ctx.vel.set(0, -1.5, 0);
      ctx.audio.play('dive');
      ctx.events.emit('dive:enter', { ring: info.ring ? info.ring.id : null, x: entryPos.x, z: entryPos.z, from: info.from });
    },
    exit(to) {
      if (room) { try { room.exit(); } catch (e) { /* egal */ } room = null; }
      ctx.events.emit('dive:exit', { x: entryPos.x, z: entryPos.z, reason: info && info.reason || 'auf' });
      info = null;
    },
    update(dt) {
      const { pos, vel, intent } = ctx;
      t += dt;
      if (stage === 'sink') {
        // kurz absinken (Blende), dann in den Raum
        pos.y -= 1.8 * dt;
        bubbles(0.05);
        ctx.setBaseAnim('idle', 'dive', { phase: t * 4 });
        if (t >= DIVE.surfaceDelay) {
          const src = provider || ctx.diveRoom;
          room = src ? src.enter({ ...info, entry: entryPos }, (reason) => dive.surface(reason)) : null;
          const spawn = room && room.spawn ? room.spawn : { x: pos.x, y: pos.y - 2, z: pos.z };
          pos.set(spawn.x, spawn.y, spawn.z);
          yawTarget = spawn.yaw !== undefined ? spawn.yaw : ctx.yaw;
          ctx.yaw = yawTarget;
          vel.set(0, 0, 0);
          stage = 'room'; t = 0;
          ctx.events.emit('dive:room', { id: room && room.id || 'frei', bounds: room && room.bounds || null });
          if (ctx.cameraSnap) ctx.cameraSnap();
        }
        return null;
      }
      if (stage === 'room') {
        // 3D-Schwimmen: Joystick kamerabezogen, Springen = auf, Aktion = ab
        const { mx, mz, mag } = wishDir(intent);
        const target = Math.pow(mag, 1.1) * DIVE.speed * ctx.mod.speed;
        const k = damp(4, dt);
        vel.x += (mx * target - vel.x) * k;
        vel.z += (mz * target - vel.z) * k;
        const vyT = intent.jumpHeld ? DIVE.rise : intent.actionHeld ? -DIVE.rise : -DIVE.sink * (mag > 0.1 ? 0.3 : 1);
        vel.y += (vyT - vel.y) * k;
        if (mag > 0.05) ctx.yaw = angleLerp(ctx.yaw, Math.atan2(mx, mz), damp(5, dt));
        pos.x += vel.x * dt; pos.y += vel.y * dt; pos.z += vel.z * dt;
        if (room && room.bounds) {
          const b = room.bounds;
          pos.x = clamp(pos.x, b.min.x, b.max.x); pos.y = clamp(pos.y, b.min.y, b.max.y); pos.z = clamp(pos.z, b.min.z, b.max.z);
          if (room.colliders) room.colliders.resolve(pos, K.RADIUS, pos.y, 1.0);
        }
        if (room && room.update) room.update(dt, ctx);
        const sp = Math.hypot(vel.x, vel.y, vel.z);
        phase += dt * (1.2 + sp * 0.8);
        bubbles(sp > 0.5 ? 0.12 : 0.4);
        ctx.setBaseAnim('idle', 'dive', { phase, speed: sp, vy: vel.y });
        // Ausgang: Austrittsring erreicht, Zeitlimit oder Raum meldet Ende
        if (room && room.exitAt && Math.hypot(pos.x - room.exitAt.x, pos.y - room.exitAt.y, pos.z - room.exitAt.z) < (room.exitAt.r || 1.6)) dive.surface('ring');
        else if (t > DIVE.timeout) dive.surface('zeit');
        return null;
      }
      // stage 'up': auftauchen an der Einstiegsstelle
      if (t === dt) { /* erster Frame */ }
      if (t >= DIVE.surfaceDelay * 0.6) {
        const wl = ctx.waterLevel(entryPos.x, entryPos.z);
        pos.set(entryPos.x, wl - 0.3, entryPos.z);
        vel.set(0, 0, 0);
        info.reason = 'auf';
        ctx.splash(1.1);
        if (ctx.cameraSnap) ctx.cameraSnap();
        const g = ctx.groundAt(pos.x, pos.z, pos.y);
        if (wl - g.y > K.SWIM_DEPTH - 0.25 && ctx.abilities.schwimmen) return ctx.go('swim', { from: 'dive' });
        return ctx.go('air', { fromWater: true });
      }
      ctx.setBaseAnim('idle', 'dive', { phase: phase + t * 3 });
      return null;
    },
  };
  function bubbles(every) {
    bubbleT += ctx.dt;
    if (bubbleT > every) {
      bubbleT = 0;
      const p = ctx.pos;
      ctx.particles.emit({ x: p.x, y: p.y + 1.3, z: p.z, count: 2, spread: 0.4, speed: 0.3, up: 1.6, color: 0xd8f6ff, size: 0.22, life: 1.6, gravity: 1.2, drag: 1.5, alpha: 0.7, grow: 0.6 });
    }
  }
  return dive;
}

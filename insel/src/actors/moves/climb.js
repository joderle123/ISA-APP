// Klettern (WP14): Auto-Greifen, Joystick = hoch/runter/seitlich, Springen = Klettersprung (−1 Segment),
// Aktion = loslassen. Halt-Ring aus Wurzeln (Basis 3, max. 12): beim Hängen und Klettern zählt er runter,
// auf Simsen lädt er nach. Leer = langsames Abrutschen bis zum letzten Sims oder Boden – nie ein Sturz.
// Halt-Modell (rein, testbar): createHalt({ segments }) · drain(dt) · regen(dt, k) · spend(n)
// Ereignisse: climb:start {id, kind} · climb:end · climb:jump · climb:mantle · halt:change {current, max, ledge} · halt:empty
import { K, damp, angleLerp } from './index.js';

export const CLIMB = { speed: 2.2, side: 1.6, drainSeconds: 4.0, ledgeRegenSeconds: 0.8, slideSpeed: 1.3, jumpCost: 1, maxSegments: 12 };

export function createHalt({ segments = 3 } = {}) {
  const h = {
    max: Math.max(1, Math.min(CLIMB.maxSegments, segments)),
    current: 0,
    get empty() { return h.current <= 0.0001; },
    get ratio() { return h.current / h.max; },
    setSegments(n) { h.max = Math.max(1, Math.min(CLIMB.maxSegments, Math.round(n))); h.current = Math.min(h.current, h.max); },
    fill() { h.current = h.max; },
    drain(dt) { h.current = Math.max(0, h.current - dt / CLIMB.drainSeconds); return h.current; },
    regen(dt, k = 1) { h.current = Math.min(h.max, h.current + (dt / CLIMB.ledgeRegenSeconds) * k); return h.current; },
    spend(n = 1) { if (h.current < n - 0.001) return false; h.current -= n; return true; },
  };
  h.current = h.max;
  return h;
}

export function createClimb(ctx) {
  const halt = createHalt({ segments: 3 });
  let entry = null, local = null;
  let phase = 0, moving = 0, sliding = false, onLedge = null, mantleT = 0;
  let lastNotify = -1;
  const tmp = { x: 0, y: 0, z: 0 };

  function notify(force, climbing = true) {
    const key = Math.round(halt.current * 20) + (onLedge ? 1000 : 0) + (sliding ? 5000 : 0);
    if (!force && key === lastNotify) return;
    lastNotify = key;
    ctx.events.emit('halt:change', { current: halt.current, max: halt.max, ledge: !!onLedge, sliding, climbing });
  }
  function snap() {
    entry.place(local, tmp);
    ctx.pos.set(tmp.x, tmp.y, tmp.z);
    ctx.yaw = entry.facing(local);
  }
  function letGo(push = 1.5, up = 0) {
    const n = entry.normal(local);
    ctx.vel.set(n.x * push, up, n.z * push);
    ctx.grabCooldown = 0.45;
    return ctx.go('air', { fromClimb: true });
  }

  const climb = {
    name: 'climb',
    halt,
    get entry() { return entry; },
    get local() { return local; },
    get onLedge() { return !!onLedge; },
    get sliding() { return sliding; },
    enter(c) {
      entry = c.entry;
      local = { a: c.a, u: c.u, y: c.y };
      snap();
      ctx.vel.set(0, 0, 0);
      ctx.grounded = false;
      sliding = false; onLedge = entry.ledgeAt(local); phase = 0; mantleT = 0;
      ctx.audio.play('grab');
      const p = ctx.pos;
      ctx.particles.emit({ x: p.x, y: p.y + 1.2, z: p.z, count: 5, spread: 0.4, speed: 0.8, up: 0.6, color: 0xd9c7a8, size: 0.3, life: 0.5, gravity: -1, drag: 3, alpha: 0.5 });
      ctx.events.emit('climb:start', { id: entry.id, kind: entry.kind });
      notify(true);
    },
    exit() {
      ctx.events.emit('climb:end', { id: entry && entry.id });
      entry = null; local = null; onLedge = null; sliding = false;
      notify(true, false);
    },
    update(dt) {
      const { intent } = ctx;
      const up = intent.y, side = intent.x;      // Joystick roh: oben = hoch, egal wo die Kamera steht
      onLedge = entry.ledgeAt(local);
      const atBottom = local.y <= entry.yMin + 0.02;
      const atTop = local.y >= entry.yMax - 0.02;

      // ---- Halt-Ring ----
      if (onLedge) { halt.regen(dt, ctx.mod.haltRegen); if (sliding && halt.current >= 1) sliding = false; }
      else if (!sliding) {
        halt.drain(dt);
        if (halt.empty) { sliding = true; ctx.events.emit('halt:empty', { id: entry.id }); ctx.audio.play('error'); }
      }

      if (sliding) {
        // langsam zur letzten Kante abrutschen, keine Eingabe
        entry.step(local, 0, -CLIMB.slideSpeed * dt);
        snap();
        moving = 0; phase += dt * 2;
        if (local.y <= entry.yMin + 0.02) { halt.fill(); notify(true); return dropToGround(); }
        const L = entry.nearestLedgeBelow(local);
        if (L && Math.abs(L.y - local.y) < 0.3) { local.y = L.y; snap(); sliding = false; }
        ctx.setBaseAnim('idle', 'climb', { phase, slide: true });
        notify();
        return null;
      }

      // ---- Loslassen (Aktion) ----
      if (intent.action) { notify(true); return letGo(1.6, 0); }

      // ---- Klettersprung (Springen): weg von der Wand oder Sprung nach oben (−1 Segment) ----
      if (intent.jump) {
        const n = entry.normal(local);
        const cy = intent.camYaw || 0;
        const wx = Math.cos(cy) * intent.x - Math.sin(cy) * intent.y, wz = -Math.sin(cy) * intent.x - Math.cos(cy) * intent.y;
        const away = (wx * n.x + wz * n.z) > 0.4 && Math.hypot(intent.x, intent.y) > 0.4;
        if (halt.spend(CLIMB.jumpCost)) {
          ctx.events.emit('climb:jump', { away });
          ctx.audio.play('jump');
          notify(true);
          if (away) { ctx.grabCooldown = 0.5; ctx.vel.set(n.x * 5.5, 7.5, n.z * 5.5); return ctx.go('air', { fromClimb: true, jumped: true }); }
          // Sprung nach oben an der Wand: kurz lösen, oben wieder greifen
          ctx.grabCooldown = 0.16;
          ctx.vel.set(n.x * 1.0, 10, n.z * 1.0);
          return ctx.go('air', { fromClimb: true, jumped: true });
        }
        ctx.audio.play('error');
      }

      // ---- Bewegung an der Fläche ----
      const dy = up * CLIMB.speed * dt;
      const du = side * CLIMB.side * dt * (entry.type === 'cylinder' ? -1 : 1);
      entry.step(local, du, dy);
      moving = Math.hypot(up, side);
      phase += moving * dt * 3.2;
      snap();

      // ---- Oben: über die Kante (Mantle), wenn dort Boden ist ----
      if (atTop && up > 0.3) {
        const n = entry.normal(local);
        const tx = ctx.pos.x - n.x * 1.1, tz = ctx.pos.z - n.z * 1.1;
        const g = ctx.groundAt(tx, tz, entry.yMax + 1.2);
        const topY = entry.top ? entry.top.y : entry.yMax;
        if (g.y <= topY + 0.8 && g.y >= entry.yMax - 1.5) {
          ctx.pos.set(tx, g.y, tz);
          ctx.vel.set(-n.x * 1.5, 0, -n.z * 1.5);
          ctx.events.emit('climb:mantle', { id: entry.id });
          ctx.audio.play('land');
          halt.fill();
          notify(true);
          return ctx.go('ground');
        }
      }
      // ---- Unten: abstoßen / absteigen ----
      if (atBottom && up < -0.3) { return dropToGround(); }
      // Boden erreicht (z. B. Fläche reicht unter das Gelände)
      const gHere = ctx.groundAt(ctx.pos.x, ctx.pos.z, ctx.pos.y);
      if (gHere.y >= ctx.pos.y - 0.05 && up <= 0) { return dropToGround(); }

      ctx.setBaseAnim('idle', 'climb', { phase, rest: !!onLedge && moving < 0.1, moving });
      notify();
      return null;
    },
  };
  function dropToGround() {
    const n = entry.normal(local);
    ctx.vel.set(n.x * 1.2, 0, n.z * 1.2);
    ctx.grabCooldown = 0.35;
    halt.fill();
    return ctx.go('air');
  }
  return climb;
}

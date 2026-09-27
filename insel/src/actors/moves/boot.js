// Bewegungszustand 'boot' (BAUPLAN §2.1 A1): Die Figur sitzt auf der Kielpost und steuert sie.
//   Joystick lenkt (kamerabezogen) · Springen halten = Segel dicht (Böen-Schub) · Aktion halten = Haken (Bergen-Plugin)
//   Das Boot kommt vom Plugin: player.setWorld({ boat, boatEnv }) – boatEnv(): { hit, push } für stepBoot.
//   Einsteigen: player.go('boot') · Aussteigen: player.teleport(x, z) (→ ground). Ereignisse: boot:enter · boot:exit ·
//   boot:bump {x, z, strength} · boot:gust · boot:push (Nebel ohne Licht) · boot:tick {speed, sail, gust} (nur intern)
export function createBootMove(ctx) {
  let t = 0;
  return {
    name: 'boot',
    enter() {
      t = 0;
      ctx.vel.set(0, 0, 0);
      ctx.grounded = true;
      ctx.airTime = 0;
      ctx.events.emit('boot:enter', {});
    },
    exit(to) { ctx.vel.set(0, 0, 0); ctx.events.emit('boot:exit', { to }); },
    update(dt) {
      const b = ctx.boat;
      if (!b) { ctx.go('ground'); return; }
      t += dt;
      const I = ctx.intent;
      const env = ctx.boatEnv ? ctx.boatEnv() : {};
      const r = b.drive(dt, { x: I.x, y: I.y, camYaw: I.camYaw, sail: !!I.jumpHeld && t > 0.3 }, env);
      if (r.bump) ctx.events.emit('boot:bump', r.bump);
      if (r.gust) ctx.events.emit('boot:gust', {});
      if (r.pushed) ctx.events.emit('boot:push', {});
      const s = b.seat;
      ctx.pos.set(s.x, s.y, s.z);
      ctx.yaw = b.yaw;
      // Fahrt als Geschwindigkeit melden (Kamera dreht hinter das Boot), die Figur selbst sitzt still
      ctx.vel.set(b.state.vx, 0, b.state.vz);
      ctx.groundY = s.y;
      ctx.grounded = true;
      ctx.setBaseAnim('sit');
    },
  };
}

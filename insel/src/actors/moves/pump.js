// Pumpsprung (WP12, Körper-Gadget e12): Anspannen und Loslassen ist die Bewegung selbst.
// Geste ohne Eingabeverzug: Springen tippen = normaler Sprung sofort. Springen HALTEN = kleiner Sprung, bei der
// Landung geht die Figur in die Hocke (anspannen), solange der Knopf gehalten wird; Loslassen ab 0,5 s = Pumpsprung
// (≥ 2,2-fache Sprunghöhe). Früher loslassen = normaler Sprung, nichts geht verloren.
// Ereignisse: player:pump:charge · player:pump:ready · player:pump {charge} (Puls −15 macht das Puls-System).
export const PUMP_HOLD = 0.5;      // Sekunden bis „bereit“
export const PUMP_MAX = 1.4;       // länger bringt nichts
export const PUMP_FACTOR = 1.55;   // × Sprunggeschwindigkeit → Höhe ×2,4

export function createPump(ctx) {
  let charging = false, t = 0, ready = false, fx = 0;
  const pump = {
    get charging() { return charging; },
    get charge() { return charging ? Math.min(1, t / PUMP_HOLD) : 0; },
    get ready() { return ready; },
    start() {
      if (charging) return;
      charging = true; t = 0; ready = false; fx = 0;
      ctx.events.emit('player:pump:charge');
    },
    cancel() { charging = false; ready = false; t = 0; },
    // → 0 (nichts), sonst Faktor auf die Sprunggeschwindigkeit (1 = normal, PUMP_FACTOR = Pumpsprung)
    update(dt) {
      if (!charging) return 0;
      if (!ctx.intent.jumpHeld) {
        const was = ready;
        charging = false; ready = false;
        if (was) {
          ctx.events.emit('player:pump', { charge: Math.min(1, t / PUMP_MAX) });
          ctx.audio.play('pump');
          const p = ctx.pos;
          ctx.particles.emit({ x: p.x, y: p.y + 0.1, z: p.z, count: 16, spread: 0.7, speed: 3.2, up: 1.4, color: 0xfff3c4, size: 0.5, life: 0.7, gravity: -2, drag: 2.5, grow: 1.6, alpha: 0.7 });
          return PUMP_FACTOR;
        }
        return 1;
      }
      t = Math.min(PUMP_MAX, t + dt);
      if (!ready && t >= PUMP_HOLD) {
        ready = true;
        ctx.events.emit('player:pump:ready');
        ctx.audio.play('click');
        const p = ctx.pos;
        ctx.particles.emit({ x: p.x, y: p.y + 0.3, z: p.z, count: 8, spread: 0.6, speed: 0.6, up: 1.8, color: 0xffd166, size: 0.35, life: 0.6, gravity: 0.5, drag: 2, additive: true, alpha: 0.9 });
      }
      // leises Staubzittern beim Anspannen
      fx += dt;
      if (ready && fx > 0.18) { fx = 0; const p = ctx.pos; ctx.particles.emit({ x: p.x, y: p.y + 0.05, z: p.z, count: 2, spread: 0.6, speed: 0.4, up: 0.5, color: 0xffe9b8, size: 0.3, life: 0.5, gravity: -0.5, drag: 2, alpha: 0.45 }); }
      return 0;
    },
  };
  return pump;
}

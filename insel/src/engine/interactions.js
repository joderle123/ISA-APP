// Interaktions-Punkte: zeigt den Aktion-Knopf (z. B. „Reden“), wenn der Spieler nah genug ist,
// und ruft onAction auf (Knopf, E oder Enter).
// game.interactions.add({ x, z, radius, label, onAction, priority, enabled, id }) → Handle { remove(), set(o) }
export function createInteractions({ events, ui, input }) {
  const list = new Set();
  let current = null;
  let lock = 0;

  const api = {
    add(o) {
      const it = { radius: 2.6, label: 'Aktion', priority: 0, enabled: true, ...o };
      it.remove = () => { list.delete(it); if (current === it) { current = null; ui.setAction(null); } };
      it.set = (p) => Object.assign(it, p);
      list.add(it);
      return it;
    },
    get current() { return current; },
    clear() { list.clear(); current = null; ui.setAction(null); },
    // Kurz sperren (z. B. während eines Dialogs)
    lock(seconds = 0.4) { lock = seconds; },
    update(dt, player) {
      lock = Math.max(0, lock - dt);
      let best = null, bestScore = Infinity;
      const p = player.position;
      for (const it of list) {
        if (!it.enabled) continue;
        const x = typeof it.x === 'function' ? it.x() : it.x;
        const z = typeof it.z === 'function' ? it.z() : it.z;
        const d = Math.hypot(p.x - x, p.z - z);
        if (d > it.radius) continue;
        if (it.y !== undefined && Math.abs(p.y - it.y) > 3) continue;
        const score = d - it.priority * 100;
        if (score < bestScore) { bestScore = score; best = it; }
      }
      if (best !== current) {
        current = best;
        ui.setAction(best ? best.label : null);
        events.emit('interact:focus', best);
      }
      if (current && input.state.action && lock <= 0 && player.enabled) {
        lock = 0.3;
        events.emit('interact', current);
        try { current.onAction && current.onAction(current); } catch (e) { console.error('[interact]', e); }
      }
    },
  };
  return api;
}

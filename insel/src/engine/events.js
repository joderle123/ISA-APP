// Kleiner Event-Bus: on/off/emit/once
export function createEvents() {
  const map = new Map();
  const bus = {
    on(name, fn) {
      if (!map.has(name)) map.set(name, new Set());
      map.get(name).add(fn);
      return () => bus.off(name, fn);
    },
    off(name, fn) {
      const set = map.get(name);
      if (set) set.delete(fn);
    },
    once(name, fn) {
      const off = bus.on(name, (...a) => { off(); fn(...a); });
      return off;
    },
    emit(name, ...args) {
      const set = map.get(name);
      if (!set) return;
      for (const fn of [...set]) {
        try { fn(...args); } catch (e) { console.error('[events]', name, e); }
      }
    },
  };
  return bus;
}

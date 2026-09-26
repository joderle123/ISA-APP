// 2D-Kollision (Kreise, gedrehte Rechtecke) + begehbare Flächen (Stege, Brücken, Podeste).
// Räumliches Hash-Gitter für schnelle Abfragen.
//
// add({ type:'circle', x, z, r, yMin?, yMax?, group?, tag? })
// add({ type:'box', x, z, hw, hd, rot?, yMin?, yMax?, group?, tag? })  rot = wie mesh.rotation.y
// addSurface({ type:'box'|'circle', x, z, hw, hd, r, rot?, y | height(x,z), group?, tag?, surface?:'wood'|'rock'|... })
const CELL = 12;

export function createColliders() {
  const grid = new Map();
  const all = new Set();
  const surfaces = new Set();
  const sgrid = new Map();
  let nextId = 1;

  const key = (i, j) => i * 73856093 ^ j * 19349663;
  function bounds(o) {
    if (o.type === 'circle') return [o.x - o.r, o.z - o.r, o.x + o.r, o.z + o.r];
    const c = Math.abs(Math.cos(o.rot || 0)), s = Math.abs(Math.sin(o.rot || 0));
    const ex = o.hw * c + o.hd * s, ez = o.hw * s + o.hd * c;
    return [o.x - ex, o.z - ez, o.x + ex, o.z + ez];
  }
  function insert(map, o) {
    const b = bounds(o);
    o._cells = [];
    for (let i = Math.floor(b[0] / CELL); i <= Math.floor(b[2] / CELL); i++)
      for (let j = Math.floor(b[1] / CELL); j <= Math.floor(b[3] / CELL); j++) {
        const k = key(i, j);
        if (!map.has(k)) map.set(k, []);
        map.get(k).push(o);
        o._cells.push(k);
      }
  }
  function removeFrom(map, o) {
    for (const k of o._cells || []) {
      const arr = map.get(k);
      if (!arr) continue;
      const i = arr.indexOf(o);
      if (i >= 0) arr.splice(i, 1);
    }
  }
  function prep(o) {
    o.id = nextId++;
    o.type = o.type || (o.r !== undefined ? 'circle' : 'box');
    o.rot = o.rot || 0;
    o._c = Math.cos(o.rot); o._s = Math.sin(o.rot);
    if (o.yMin === undefined) o.yMin = -Infinity;
    if (o.yMax === undefined) o.yMax = Infinity;
    return o;
  }
  function nearby(map, x, z, r, out) {
    const i0 = Math.floor((x - r) / CELL), i1 = Math.floor((x + r) / CELL);
    const j0 = Math.floor((z - r) / CELL), j1 = Math.floor((z + r) / CELL);
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) {
      const arr = map.get(key(i, j));
      if (arr) for (const o of arr) out.add(o);
    }
    return out;
  }
  const tmpSet = new Set();

  // Punkt in Fläche? (lokale Koordinaten)
  function inside(o, x, z, pad = 0) {
    if (o.type === 'circle') return Math.hypot(x - o.x, z - o.z) <= o.r + pad;
    const dx = x - o.x, dz = z - o.z;
    const lx = dx * o._c - dz * o._s, lz = dx * o._s + dz * o._c;
    return Math.abs(lx) <= o.hw + pad && Math.abs(lz) <= o.hd + pad;
  }

  const api = {
    add(o) { prep(o); insert(grid, o); all.add(o); return o; },
    addCircle(x, z, r, extra = {}) { return api.add({ type: 'circle', x, z, r, ...extra }); },
    addBox(x, z, hw, hd, rot = 0, extra = {}) { return api.add({ type: 'box', x, z, hw, hd, rot, ...extra }); },
    remove(o) {
      if (all.delete(o)) removeFrom(grid, o);
      if (surfaces.delete(o)) removeFrom(sgrid, o);
    },
    removeGroup(group) {
      for (const o of [...all]) if (o.group === group) api.remove(o);
      for (const o of [...surfaces]) if (o.group === group) api.remove(o);
    },
    // Begehbare Fläche (Oberkante y oder Funktion height(x,z))
    addSurface(o) { prep(o); insert(sgrid, o); surfaces.add(o); return o; },
    // Höchste begehbare Fläche unter/nahe den Füßen (oder -Infinity)
    surfaceHeight(x, z, feetY = Infinity, step = 0.6) {
      tmpSet.clear();
      nearby(sgrid, x, z, 0.1, tmpSet);
      let best = -Infinity, bestO = null;
      for (const o of tmpSet) {
        if (!inside(o, x, z)) continue;
        const y = o.height ? o.height(x, z) : o.y;
        if (y <= feetY + step && y > best) { best = y; bestO = o; }
      }
      api.lastSurface = bestO;
      return best;
    },
    lastSurface: null,
    // Kreis (Spieler) aus Hindernissen schieben. pos: {x, z}; y = Fußhöhe. Gibt true bei Kontakt.
    resolve(pos, radius, y = 0, height = 1.8) {
      let hit = false;
      for (let iter = 0; iter < 2; iter++) {
        tmpSet.clear();
        nearby(grid, pos.x, pos.z, radius + 1, tmpSet);
        for (const o of tmpSet) {
          if (y + height < o.yMin || y > o.yMax) continue;
          if (o.type === 'circle') {
            const dx = pos.x - o.x, dz = pos.z - o.z;
            const d = Math.hypot(dx, dz);
            const min = o.r + radius;
            if (d < min) {
              const k = d > 1e-5 ? (min - d) / d : 0;
              if (d > 1e-5) { pos.x += dx * k; pos.z += dz * k; } else pos.x += min;
              hit = true;
            }
          } else {
            const dx = pos.x - o.x, dz = pos.z - o.z;
            const lx = dx * o._c - dz * o._s, lz = dx * o._s + dz * o._c;
            const cx = Math.max(-o.hw, Math.min(o.hw, lx)), cz = Math.max(-o.hd, Math.min(o.hd, lz));
            let ox = lx - cx, oz = lz - cz;
            let d = Math.hypot(ox, oz);
            if (d < radius) {
              let nx, nz, push;
              if (d > 1e-5) { nx = ox / d; nz = oz / d; push = radius - d; }
              else {
                // Mittelpunkt im Rechteck: zur nächsten Kante
                const px = o.hw - Math.abs(lx), pz = o.hd - Math.abs(lz);
                if (px < pz) { nx = Math.sign(lx) || 1; nz = 0; push = px + radius; } else { nx = 0; nz = Math.sign(lz) || 1; push = pz + radius; }
              }
              const wx = nx * o._c + nz * o._s, wz = -nx * o._s + nz * o._c;
              pos.x += wx * push; pos.z += wz * push;
              hit = true;
            }
          }
        }
      }
      return hit;
    },
    // Alle Hindernisse im Umkreis
    query(x, z, r) {
      const out = new Set();
      nearby(grid, x, z, r, out);
      return [...out].filter((o) => (o.type === 'circle' ? Math.hypot(o.x - x, o.z - z) < o.r + r : inside(o, x, z, r)));
    },
    // Ist der Punkt frei? (für Platzierung von Figuren/Requisiten)
    isFree(x, z, r = 0.5) { return api.query(x, z, r).length === 0; },
    get count() { return all.size; },
    get surfaceCount() { return surfaces.size; },
  };
  return api;
}

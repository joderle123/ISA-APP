// Kletterbare Flächen (WP14): Registry + Geometrie (rein, testbar) und die Sichtbarkeit (Griffspuren, Simse).
//   const reg = createClimbRegistry();  reg.add({ id, kind:'fels'|'liane'|'wurzel'|'turm'|'mangrove',
//     type:'cylinder', x, z, r, yMin, yMax, ledges:[{ y, a0?, a1? }]  |  type:'wall', x, z, hw, rot, yMin, yMax, ledges:[{ y, u0?, u1? }] })
//   reg.grab(pos, mx, mz, { reach, grounded, vy }) → { entry, a|u, y } | null   (Auto-Greifen)
//   entry.local(pos) → { a|u, y, dist }   entry.place(local, out)   entry.normal(local, out)   entry.ledgeAt(local)
// Welt: createClimbables({ scene, island, colliders, veil, rng, game }) → Registry + Meshes (Riesen-Mangrove als 40-m-Testwand
//   an strand.mangrove, Griffwand am Wasserfall, Stämme der Dschungelriesen, Sprungpodest am Baumhaus).
import * as THREE from 'three';
import { part, merge } from './geom.js';
import { lambertVC } from './landmarks.js';

const RADIUS = 0.36;   // Spieler-Radius (wie K.RADIUS)
const TAU = Math.PI * 2;
const wrap = (a) => { while (a > Math.PI) a -= TAU; while (a < -Math.PI) a += TAU; return a; };

function prepEntry(def) {
  const e = { kind: 'fels', ledges: [], group: null, ...def };
  e.type = e.type || (e.r !== undefined ? 'cylinder' : 'wall');
  if (e.type === 'cylinder') {
    // Winkel a: Position = Mitte + (sin a, cos a) * (r + Spieler-Radius); Blick zur Mitte = a + π
    e.local = (p, out = {}) => { const dx = p.x - e.x, dz = p.z - e.z; out.a = Math.atan2(dx, dz); out.y = p.y; out.dist = Math.hypot(dx, dz) - e.r; return out; };
    e.place = (l, out) => { const R = e.r + RADIUS; out.x = e.x + Math.sin(l.a) * R; out.z = e.z + Math.cos(l.a) * R; out.y = l.y; return out; };
    e.normal = (l, out = {}) => { out.x = Math.sin(l.a); out.z = Math.cos(l.a); return out; };
    e.facing = (l) => l.a + Math.PI;
    e.step = (l, du, dy) => { l.a = wrap(l.a + du / (e.r + RADIUS)); l.y = Math.max(e.yMin, Math.min(e.yMax, l.y + dy)); return l; };
    e.ledgeAt = (l) => e.ledges.find((L) => Math.abs(L.y - l.y) < 0.45 && (L.a0 === undefined || angleIn(l.a, L.a0, L.a1))) || null;
    e.nearestLedgeBelow = (l) => { let best = null; for (const L of e.ledges) { if (L.y <= l.y + 0.05 && (L.a0 === undefined || angleIn(l.a, L.a0, L.a1)) && (!best || L.y > best.y)) best = L; } return best; };
  } else {
    e.rot = e.rot || 0;
    e.hw = e.hw || 2;
    // Normale zeigt vom Fels weg (Kletterseite), u läuft entlang der Wand
    e._nx = Math.sin(e.rot); e._nz = Math.cos(e.rot);
    e._tx = Math.cos(e.rot); e._tz = -Math.sin(e.rot);
    e.local = (p, out = {}) => { const dx = p.x - e.x, dz = p.z - e.z; out.u = dx * e._tx + dz * e._tz; out.y = p.y; out.dist = dx * e._nx + dz * e._nz; return out; };
    e.place = (l, out) => { const u = Math.max(-e.hw, Math.min(e.hw, l.u)); out.x = e.x + e._tx * u + e._nx * (RADIUS + 0.02); out.z = e.z + e._tz * u + e._nz * (RADIUS + 0.02); out.y = l.y; return out; };
    e.normal = (l, out = {}) => { out.x = e._nx; out.z = e._nz; return out; };
    e.facing = () => Math.atan2(-e._nx, -e._nz);
    e.step = (l, du, dy) => { l.u = Math.max(-e.hw, Math.min(e.hw, l.u + du)); l.y = Math.max(e.yMin, Math.min(e.yMax, l.y + dy)); return l; };
    e.ledgeAt = (l) => e.ledges.find((L) => Math.abs(L.y - l.y) < 0.45 && (L.u0 === undefined || (l.u >= L.u0 && l.u <= L.u1))) || null;
    e.nearestLedgeBelow = (l) => { let best = null; for (const L of e.ledges) { if (L.y <= l.y + 0.05 && (L.u0 === undefined || (l.u >= L.u0 && l.u <= L.u1)) && (!best || L.y > best.y)) best = L; } return best; };
  }
  return e;
}
function angleIn(a, a0, a1) {
  const span = wrap(a1 - a0) < 0 ? wrap(a1 - a0) + TAU : wrap(a1 - a0);
  const d = wrap(a - a0) < 0 ? wrap(a - a0) + TAU : wrap(a - a0);
  return d <= span;
}

export function createClimbRegistry() {
  const entries = new Map();
  const reg = {
    add(def) { const e = prepEntry(def); entries.set(e.id, e); return e; },
    remove(id) { const e = entries.get(id); entries.delete(id); return e; },
    get(id) { return entries.get(id) || null; },
    list() { return [...entries.values()]; },
    get count() { return entries.size; },
    // Nächste Fläche in Reichweite. mx/mz = Wunschrichtung (normiert). grounded: nur, wenn man darauf zuläuft.
    grab(pos, mx = 0, mz = 0, { reach = 0.5, grounded = false, vy = 0 } = {}) {
      let best = null, bestD = Infinity;
      for (const e of entries.values()) {
        if (pos.y < e.yMin - 0.3 || pos.y > e.yMax + 0.3) continue;
        const bb = e.type === 'cylinder' ? e.r + 3 : e.hw + 3;
        if (Math.abs(pos.x - e.x) > bb || Math.abs(pos.z - e.z) > bb) continue;
        const l = e.local(pos);
        if (e.type === 'wall' && (Math.abs(l.u) > e.hw + 0.3 || l.dist < -0.6)) continue;
        const gap = l.dist - RADIUS;              // Abstand Spielerrand ↔ Fläche
        if (gap > reach) continue;
        const n = e.normal(l);
        const toward = -(mx * n.x + mz * n.z);   // > 0: man drückt zur Fläche hin
        if (grounded && toward < 0.45) continue;
        if (!grounded && toward < -0.3 && vy > 0.5) continue;   // im Flug von der Wand weg: nicht greifen
        const d = Math.abs(gap) - toward * 0.2;
        if (d < bestD) { bestD = d; best = { entry: e, ...l }; }
      }
      if (best) { best.y = Math.max(best.entry.yMin, Math.min(best.entry.yMax, best.y)); }
      return best;
    },
  };
  return reg;
}

// ---------- Welt: Meshes und Standard-Flächen ----------
function gripMarks(parts, fn, n, color = '#9fe8b0') {
  // kleine leuchtende Griffspuren (Moos/Kreide) auf der Kletterseite
  for (let i = 0; i < n; i++) {
    const p = fn(i / Math.max(1, n - 1), i);
    parts.push(part(new THREE.BoxGeometry(0.16, 0.07, 0.05), { pos: [p.x, p.y, p.z], rot: [0, p.yaw || 0, 0], color }));
  }
}

export function createClimbables({ scene, island, colliders, veil, rng, sites = {} }) {
  const reg = createClimbRegistry();
  const group = new THREE.Group();
  group.name = 'climbables';
  const mat = lambertVC(veil, 'climb');
  const glowMat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, emissive: new THREE.Color('#5cffa0'), emissiveIntensity: 0.35 });
  if (veil) veil.patch(glowMat, { key: 'climbglow', veil: false });
  const R = rng && rng.fork ? rng.fork('climbables') : { float: (a, b) => a + Math.random() * (b - a), next: Math.random };

  // ---- Riesen-Mangrove: 40-m-Kletterstamm mit Wurzelbögen, Simsen auf der Hauptroute (Strandseite) und Kronenpodest ----
  function addMangrove(x, z) {
    const g = island.getHeight(x, z);
    const H = 40, r = 1.7;
    const parts = [];
    // Stamm: leicht gedreht, Rindenrillen durch Jitter
    parts.push(part(new THREE.CylinderGeometry(r * 0.78, r, H, 10, 12), { pos: [0, H / 2, 0], jitter: 0.22, seed: 21, faceVar: 0.1, color: '#6f4a33', deform: (v) => { v.x += Math.sin(v.y * 0.35) * 0.3; v.z += Math.cos(v.y * 0.27) * 0.25; } }));
    // Wurzelbögen am Fuß
    for (let k = 0; k < 9; k++) {
      const a = (k / 9) * TAU + 0.2;
      const L = 4.5 + R.float(0, 2.5);
      parts.push(part(new THREE.CylinderGeometry(0.22, 0.42, L, 5, 1), { pos: [Math.sin(a) * L * 0.42, L * 0.28, Math.cos(a) * L * 0.42], rot: [Math.cos(a) * 1.05, 0, -Math.sin(a) * 1.05], color: '#5c3d2a' }));
    }
    // Simse (Hauptroute nach Süden/Strand, Winkel um a=0 … +0.9): kleine Astplattformen bei 12, 24, 36 m
    const ledges = [];
    for (const ly of [12, 24, 36]) {
      const a0 = 0.15, a1 = 1.15;
      ledges.push({ y: g + ly, a0, a1 });
      for (let k = 0; k < 3; k++) {
        const a = a0 + ((k + 0.5) / 3) * (a1 - a0);
        parts.push(part(new THREE.BoxGeometry(0.9, 0.22, 0.5), { pos: [Math.sin(a) * (r + 0.35), ly - 0.1, Math.cos(a) * (r + 0.35)], rot: [0, a, 0], color: '#8a5f3f' }));
      }
    }
    // Griffspuren (Moos) auf der Hauptroute
    const gp = [];
    gripMarks(gp, (t, i) => { const a = 0.25 + (i % 3) * 0.3; const y = 1.2 + t * (H - 2.4); return { x: Math.sin(a) * (r + 0.02 - y * 0.0055), y, z: Math.cos(a) * (r + 0.02 - y * 0.0055), yaw: a }; }, 34);
    // Krone: Astwerk + Blätterballen + begehbare Plattform
    const crown = [];
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * TAU;
      crown.push(part(new THREE.CylinderGeometry(0.16, 0.3, 6.5, 5, 1), { pos: [Math.sin(a) * 3.0, H + 1.4, Math.cos(a) * 3.0], rot: [Math.cos(a) * 1.25, 0, -Math.sin(a) * 1.25], color: '#6f4a33' }));
      crown.push(part(new THREE.IcosahedronGeometry(2.3, 1), { pos: [Math.sin(a) * 5.4, H + 3.2 + (k % 2) * 0.8, Math.cos(a) * 5.4], scale: [1.15, 0.7, 1.15], jitter: 0.35, seed: 40 + k, faceVar: 0.14, color: k % 2 ? '#3fa35b' : '#5cc36a' }));
    }
    crown.push(part(new THREE.CylinderGeometry(4.6, 3.4, 0.5, 12, 1), { pos: [0, H + 0.25, 0], jitter: 0.12, seed: 9, color: '#8a5f3f', faceVar: 0.08 }));
    crown.push(part(new THREE.IcosahedronGeometry(3.4, 1), { pos: [0, H + 4.6, 0], scale: [1.2, 0.75, 1.2], jitter: 0.4, seed: 60, faceVar: 0.14, color: '#66d16f' }));
    const mesh = new THREE.Mesh(merge(parts.concat(crown)), mat);
    mesh.position.set(x, g, z);
    mesh.castShadow = true; mesh.receiveShadow = true;
    group.add(mesh);
    const grips = new THREE.Mesh(merge(gp), glowMat);
    grips.position.set(x, g, z);
    group.add(grips);
    colliders.addCircle(x, z, r + 0.05, { group: 'climbables', tag: 'mangrove', yMax: g + H });
    colliders.addSurface({ type: 'circle', x, z, r: 4.4, y: g + H + 0.5, group: 'climbables', tag: 'mangrove-krone', surface: 'wood' });
    return reg.add({ id: 'mangrove-stamm', kind: 'mangrove', type: 'cylinder', x, z, r, yMin: g + 0.4, yMax: g + H + 0.2, ledges, top: { y: g + H + 0.5 }, mesh });
  }

  // ---- Griffwand aus Fels (kind fels): Block mit Griffspuren, an einen Hang gelehnt ----
  function addRockWall({ id, x, z, rot, hw = 2.2, yMin, yMax, ledges = [], depth = 1.4 }) {
    const H = yMax - yMin;
    const parts = [];
    parts.push(part(new THREE.BoxGeometry(hw * 2, H, depth, 3, 6, 1), { pos: [0, H / 2, -depth / 2], jitter: 0.3, seed: 31, faceVar: 0.12, color: '#6e6a78' }));
    for (const L of ledges) {
      parts.push(part(new THREE.BoxGeometry((L.u1 !== undefined ? L.u1 - L.u0 : hw * 2) - 0.2, 0.2, 0.55), { pos: [L.u1 !== undefined ? (L.u0 + L.u1) / 2 : 0, L.y - yMin - 0.1, 0.2], color: '#58545f' }));
    }
    const gp = [];
    gripMarks(gp, (t, i) => ({ x: ((i % 4) - 1.5) * hw * 0.42, y: 0.8 + t * (H - 1.6), z: 0.03 }), Math.round(H * 1.2), '#ffd166');
    const m = new THREE.Mesh(merge(parts), mat);
    m.position.set(x, yMin, z); m.rotation.y = rot; m.castShadow = true; m.receiveShadow = true;
    group.add(m);
    const gm = new THREE.Mesh(merge(gp), glowMat);
    gm.position.copy(m.position); gm.rotation.y = rot;
    group.add(gm);
    colliders.addBox(x - Math.sin(rot) * depth / 2, z - Math.cos(rot) * depth / 2, hw, depth / 2, rot, { group: 'climbables', tag: 'fels', yMax: yMax });
    colliders.addSurface({ type: 'box', x: x - Math.sin(rot) * depth / 2, z: z - Math.cos(rot) * depth / 2, hw, hd: depth / 2, rot, y: yMax, group: 'climbables', tag: 'fels', surface: 'rock' });
    return reg.add({ id, kind: 'fels', type: 'wall', x, z, hw, rot, yMin, yMax, ledges, mesh: m });
  }

  // ---- Stämme der Dschungelriesen mit Lianen (kind liane) ----
  function addJungleTrunks() {
    const list = colliders.query(82, -82, 70).filter((o) => o.tag === 'jungle' && o.type === 'circle');
    const lianas = [];
    let n = 0;
    for (const o of list) {
      const g = island.getHeight(o.x, o.z);
      const top = o.yMax !== undefined && isFinite(o.yMax) ? o.yMax : g + 6.5;
      if (top - g < 4) continue;
      const id = `liane-${n++}`;
      reg.add({ id, kind: 'liane', type: 'cylinder', x: o.x, z: o.z, r: o.r, yMin: g + 0.4, yMax: top - 0.1, ledges: [] });
      // zwei hängende Lianen als Sichtzeichen
      for (let k = 0; k < 2; k++) {
        const a = R.float(0, TAU);
        const L = (top - g) * R.float(0.7, 1.0);
        lianas.push(part(new THREE.CylinderGeometry(0.05, 0.07, L, 4, 1), { pos: [o.x + Math.sin(a) * (o.r + 0.12), top - L / 2, o.z + Math.cos(a) * (o.r + 0.12)], color: k ? '#3f8f3a' : '#2f6e2e' }));
      }
    }
    if (lianas.length) { const m = new THREE.Mesh(merge(lianas), mat); group.add(m); }
    return n;
  }

  // ---- Sprungpodest am Baumhaus-Feigenbaum: Lianenleiter (kind liane) + Plattform in 12 m Höhe ----
  function addPodest(x, z) {
    const g = island.getHeight(x, z);
    const H = 12;
    const parts = [];
    parts.push(part(new THREE.CylinderGeometry(0.9, 1.5, H, 8, 4), { pos: [0, H / 2, 0], jitter: 0.2, seed: 12, faceVar: 0.1, color: '#7a5a40', deform: (v) => { v.x += Math.sin(v.y * 0.6) * 0.2; } }));
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * TAU;
      parts.push(part(new THREE.IcosahedronGeometry(2.4, 1), { pos: [Math.sin(a) * 3.2, H + 2.2 + (k % 2) * 0.6, Math.cos(a) * 3.2], scale: [1.1, 0.7, 1.1], jitter: 0.35, seed: 80 + k, faceVar: 0.14, color: k % 2 ? '#4fa86a' : '#69c47a' }));
    }
    parts.push(part(new THREE.IcosahedronGeometry(2.6, 1), { pos: [0, H + 3.6, 0], scale: [1.2, 0.75, 1.2], jitter: 0.4, seed: 90, faceVar: 0.14, color: '#7fd28a' }));
    // Podest: Holzplattform mit Geländer, Absprung nach Süden (Hafenbucht)
    parts.push(part(new THREE.CylinderGeometry(3.2, 2.6, 0.35, 10, 1), { pos: [0, H + 0.18, 0], color: '#b07e52', faceVar: 0.08, seed: 3 }));
    for (let k = 0; k < 10; k++) {
      const a = (k / 10) * TAU;
      if (Math.abs(wrap(a - 0)) < 0.7) continue;   // Lücke zum Absprung (Süden, +z)
      parts.push(part(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 4, 1), { pos: [Math.sin(a) * 3.0, H + 0.8, Math.cos(a) * 3.0], color: '#6e4a30' }));
    }
    parts.push(part(new THREE.TorusGeometry(3.0, 0.04, 4, 20, TAU * 0.78), { pos: [0, H + 1.25, 0], rot: [Math.PI / 2, 0, 0.7 + Math.PI / 2], color: '#6e4a30' }));
    // Lianenleiter an der Nordseite
    for (let k = 0; k < 2; k++) parts.push(part(new THREE.CylinderGeometry(0.06, 0.08, H, 4, 1), { pos: [(k - 0.5) * 0.5, H / 2, -1.55], color: '#3f8f3a' }));
    for (let y = 1; y < H; y += 0.9) parts.push(part(new THREE.BoxGeometry(0.7, 0.06, 0.08), { pos: [0, y, -1.55], color: '#8a5f3f' }));
    const mesh = new THREE.Mesh(merge(parts), mat);
    mesh.position.set(x, g, z); mesh.castShadow = true; mesh.receiveShadow = true;
    group.add(mesh);
    colliders.addCircle(x, z, 1.5, { group: 'climbables', tag: 'podest', yMax: g + H });
    colliders.addSurface({ type: 'circle', x, z, r: 3.1, y: g + H + 0.35, group: 'climbables', tag: 'podest', surface: 'wood' });
    return reg.add({ id: 'baumhaus-leiter', kind: 'liane', type: 'wall', x, z: z - 1.55, hw: 0.5, rot: Math.PI, yMin: g + 0.3, yMax: g + H + 0.1, ledges: [], top: { y: g + H + 0.35 }, mesh });
  }

  const mang = sites.mangrove || { x: 150, z: -8 };
  addMangrove(mang.x, mang.z);
  // Griffwand am Wasserfall: vom Teichufer hinauf auf den Grat (Rückweg nach dem Tauchen)
  {
    const W = island.FEATURES.waterfall;
    const side = { x: -W.dir.z, z: W.dir.x };
    const wx = W.top.x + side.x * 7.5 + W.dir.x * 3.5, wz = W.top.z + side.z * 7.5 + W.dir.z * 3.5;
    const yTop = island.getHeight(W.top.x + side.x * 7.5, W.top.z + side.z * 7.5) + 0.2;
    const yBot = island.getHeight(wx + W.dir.x * 2, wz + W.dir.z * 2);
    const rot = Math.atan2(W.dir.x, W.dir.z);
    addRockWall({ id: 'wasserfall-wand', x: wx, z: wz, rot, hw: 2.4, yMin: Math.min(yBot, yTop - 9), yMax: Math.max(yTop, yBot + 9), ledges: [{ y: (Math.min(yBot, yTop - 9) + Math.max(yTop, yBot + 9)) / 2 }] });
  }
  const baum = sites.baumhaus || { x: -30, z: 98 };
  addPodest(baum.x, baum.z);
  const trunks = addJungleTrunks();
  scene.add(group);

  return Object.assign(reg, { group, addMangrove, addRockWall, addPodest, jungleTrunks: trunks, RADIUS });
}

// Geometrie-Helfer für Low-Poly-Modelle: Teile färben, verformen, flach schattieren und zusammenfügen.
// Jede Teil-Geometrie hat: position, normal (flach), color, aWind (Biegsamkeit 0..1 für Wind).
import * as THREE from 'three';

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _c = new THREE.Color();
const _v = new THREE.Vector3();

// Deterministisches Zittern pro Position (verbundene Ecken bleiben verbunden)
function qhash(x, y, z, seed) {
  const k = Math.round(x * 1000) * 73856093 ^ Math.round(y * 1000) * 19349663 ^ Math.round(z * 1000) * 83492791 ^ seed * 2654435761;
  let h = k | 0;
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

/**
 * Teil vorbereiten.
 * opts: color (hex|Color|fn(x,y,z,c)), wind (Zahl|fn(x,y,z)), jitter (Zahl), seed,
 *       pos [x,y,z], rot [x,y,z], scale [x,y,z]|Zahl, deform fn(v:Vector3)
 */
export function part(geo, opts = {}) {
  let g = geo;
  const posA = g.attributes.position;
  if (opts.jitter) {
    const s = opts.seed || 1;
    for (let i = 0; i < posA.count; i++) {
      const x = posA.getX(i), y = posA.getY(i), z = posA.getZ(i);
      posA.setXYZ(i,
        x + (qhash(x, y, z, s) - 0.5) * opts.jitter,
        y + (qhash(x, y, z, s + 7) - 0.5) * opts.jitter,
        z + (qhash(x, y, z, s + 13) - 0.5) * opts.jitter);
    }
  }
  if (opts.deform) {
    for (let i = 0; i < posA.count; i++) {
      _v.fromBufferAttribute(posA, i);
      opts.deform(_v);
      posA.setXYZ(i, _v.x, _v.y, _v.z);
    }
  }
  const sc = opts.scale === undefined ? [1, 1, 1] : (typeof opts.scale === 'number' ? [opts.scale, opts.scale, opts.scale] : opts.scale);
  const r = opts.rot || [0, 0, 0];
  const p = opts.pos || [0, 0, 0];
  _q.setFromEuler(_e.set(r[0], r[1], r[2], opts.order || 'XYZ'));
  _m.compose(_v.set(p[0], p[1], p[2]), _q, new THREE.Vector3(sc[0], sc[1], sc[2]));
  g.applyMatrix4(_m);
  if (g.index) g = g.toNonIndexed();
  g.deleteAttribute('uv');
  if (g.attributes.uv1) g.deleteAttribute('uv1');
  g.computeVertexNormals();
  const n = g.attributes.position.count;
  const col = new Float32Array(n * 3);
  const wind = new Float32Array(n);
  const pa = g.attributes.position;
  const baseC = typeof opts.color === 'function' ? null : _c.set(opts.color !== undefined ? opts.color : 0xffffff).clone();
  for (let i = 0; i < n; i++) {
    const x = pa.getX(i), y = pa.getY(i), z = pa.getZ(i);
    if (baseC) { col[i * 3] = baseC.r; col[i * 3 + 1] = baseC.g; col[i * 3 + 2] = baseC.b; }
    else { opts.color(x, y, z, _c, Math.floor(i / 3)); col[i * 3] = _c.r; col[i * 3 + 1] = _c.g; col[i * 3 + 2] = _c.b; }
    wind[i] = typeof opts.wind === 'function' ? opts.wind(x, y, z) : (opts.wind || 0);
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.setAttribute('aWind', new THREE.BufferAttribute(wind, 1));
  // Flächenweise Helligkeitsvariation (Low-Poly-Look)
  if (opts.faceVar) {
    const s = opts.seed || 3;
    for (let f = 0; f < n / 3; f++) {
      const k = 1 + (qhash(f, s, 1, s) - 0.5) * opts.faceVar;
      for (let j = 0; j < 3; j++) { const o = (f * 3 + j) * 3; col[o] *= k; col[o + 1] *= k; col[o + 2] *= k; }
    }
  }
  return g;
}

// Teile zusammenfügen (nicht indiziert)
export function merge(parts) {
  let total = 0;
  for (const p of parts) total += p.attributes.position.count;
  const pos = new Float32Array(total * 3), nor = new Float32Array(total * 3), col = new Float32Array(total * 3), wind = new Float32Array(total);
  let o = 0;
  for (const p of parts) {
    const c = p.attributes.position.count;
    pos.set(p.attributes.position.array, o * 3);
    nor.set(p.attributes.normal.array, o * 3);
    col.set(p.attributes.color.array, o * 3);
    if (p.attributes.aWind) wind.set(p.attributes.aWind.array, o);
    o += c;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.setAttribute('aWind', new THREE.BufferAttribute(wind, 1));
  g.computeBoundingSphere();
  g.computeBoundingBox();
  return g;
}

// Blatt/Wedel: Streifen entlang einer Kurve mit V-Faltung
// spine(t) → Vector3, width(t) → Zahl, fold = Absenkung der Ränder
export function frond({ spine, width, segments = 6, fold = 0.15, color, tipColor, wind = (t) => t }) {
  const pts = [];
  const tmp = new THREE.Vector3();
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = spine(t);
    const p2 = spine(Math.min(1, t + 0.01));
    const p1 = spine(Math.max(0, t - 0.01));
    const dir = tmp.copy(p2).sub(p1).normalize();
    const side = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
    const w = width(t);
    pts.push({ c: p.clone(), l: p.clone().addScaledVector(side, w).add(new THREE.Vector3(0, -fold * w * 2, 0)), r: p.clone().addScaledVector(side, -w).add(new THREE.Vector3(0, -fold * w * 2, 0)), t });
  }
  const pos = [];
  const cols = [];
  const winds = [];
  const cA = new THREE.Color(color), cB = new THREE.Color(tipColor || color);
  const push = (v, t) => { pos.push(v.x, v.y, v.z); const cc = cA.clone().lerp(cB, t); cols.push(cc.r, cc.g, cc.b); winds.push(wind(t)); };
  for (let i = 0; i < segments; i++) {
    const a = pts[i], b = pts[i + 1];
    push(a.c, a.t); push(a.l, a.t); push(b.c, b.t);
    push(a.l, a.t); push(b.l, b.t); push(b.c, b.t);
    push(a.c, a.t); push(b.c, b.t); push(a.r, a.t);
    push(a.r, a.t); push(b.c, b.t); push(b.r, b.t);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  g.setAttribute('aWind', new THREE.Float32BufferAttribute(winds, 1));
  return g;
}

// Geometrie in Farbe tauchen (alle Ecken)
export function tint(geo, hex) {
  const c = new THREE.Color(hex);
  const a = geo.attributes.color;
  for (let i = 0; i < a.count; i++) a.setXYZ(i, a.getX(i) * c.r, a.getY(i) * c.g, a.getZ(i) * c.b);
  return geo;
}

export { qhash };

// Raum-Baukasten (WP18): Bauanleitungen je kit. Lokale Koordinaten: Ursprung = Bodenmitte, x ∈ [-w/2, w/2], z ∈ [-d/2, d/2],
// Decke bei y = h. Jeder Kit baut Hülle, Boden und Standard-Ausstattung; RoomDef.features fügt Einrichtung hinzu
// (eingebaute Typen unten oder jede Requisite aus dem Props-Baukasten, z. B. 'orgel', 'laterne', 'kristall').
import * as THREE from 'three';
import { part, merge } from '../geom.js';

const TAU = Math.PI * 2;

// Sammler: Geometrien je Material-Schlüssel, Kollider und dynamische Objekte
export function createCollector(K) {
  const parts = new Map();
  const col = { colliders: [], surfaces: [], dynamic: [], props: [], lights: [] };
  const R = {
    add(geo, key = 'base') { if (!parts.has(key)) parts.set(key, []); parts.get(key).push(geo); return geo; },
    glow(geo, hex, intensity = 0.6) { return R.add(geo, `glow:${hex}:${intensity}`); },
    glass(geo, hex = '#bfe8ff') { return R.add(geo, `glass:${hex}`); },
    circle(x, z, r, o = {}) { col.colliders.push({ ...o, type: 'circle', x, z, r }); },
    box(x, z, hw, hd, rot = 0, o = {}) { col.colliders.push({ ...o, type: 'box', x, z, hw, hd, rot }); },
    surface(o) { col.surfaces.push(o); },
    dyn(obj) { col.dynamic.push(obj); return obj; },
    light(color, intensity, distance, x, y, z) { col.lights.push({ color, intensity, distance, x, y, z }); },
    prop(type, opts, at, yaw = 0) {
      if (!K.props) return null;
      const h = K.props.make(type, opts || {});
      h.group.position.set(at[0], at[1] || 0, at[2]);
      h.group.rotation.y = yaw;
      h.group.userData.baseY = at[1] || 0;
      h.localAt = at; h.yaw = yaw;
      col.props.push(h);
      return h;
    },
    build(M) {
      const group = new THREE.Group();
      for (const [key, geos] of parts) {
        let mat;
        if (key === 'base') mat = M.base;
        else if (key === 'base2') mat = M.baseDouble;
        else if (key.startsWith('glow:')) { const [, hex, i] = key.split(':'); mat = M.glow(hex, { intensity: +i }); }
        else if (key.startsWith('glass:')) mat = M.glass(key.slice(6), { opacity: 0.3 });
        else mat = M.base;
        const m = new THREE.Mesh(merge(geos), mat);
        m.castShadow = !key.startsWith('glass'); m.receiveShadow = true;
        m.name = 'raum-' + key;
        group.add(m);
      }
      for (const o of col.dynamic) group.add(o);
      for (const h of col.props) group.add(h.group);
      return Object.assign(col, { group });
    },
  };
  return R;
}

// ---- Hüllen ----
function shellBox(R, w, h, d, { color, jitter = 0.5, seed = 1, segs = [6, 3, 6], deform, faceVar = 0.16 }) {
  R.add(part(new THREE.BoxGeometry(w, h, d, segs[0], segs[1], segs[2]), { pos: [0, h / 2, 0], jitter, seed, faceVar, color, deform }), 'shell');
  // Wände als Kollider (dünne Kästen außen an der Hülle)
  R.box(0, -d / 2 - 0.4, w / 2 + 1, 0.5, 0, { group: 'raum', tag: 'wand' });
  R.box(0, d / 2 + 0.4, w / 2 + 1, 0.5, 0, { group: 'raum', tag: 'wand' });
  R.box(-w / 2 - 0.4, 0, 0.5, d / 2 + 1, 0, { group: 'raum', tag: 'wand' });
  R.box(w / 2 + 0.4, 0, 0.5, d / 2 + 1, 0, { group: 'raum', tag: 'wand' });
}
function shellCylinder(R, r, h, { color, jitter = 0.2, seed = 2, segs = 14, faceVar = 0.12 }) {
  R.add(part(new THREE.CylinderGeometry(r, r, h, segs, 3, true), { pos: [0, h / 2, 0], jitter, seed, faceVar, color }), 'shell');
  R.add(part(new THREE.CircleGeometry(r, segs), { pos: [0, h, 0], rot: [Math.PI / 2, 0, 0], color, faceVar }), 'shell');
  // Rundwand: Ring aus Kreis-Kollidern
  const n = 16;
  for (let i = 0; i < n; i++) { const a = (i / n) * TAU; R.circle(Math.cos(a) * (r + 0.35), Math.sin(a) * (r + 0.35), r * 0.24, { group: 'raum', tag: 'wand' }); }
}

// ---- Eingebaute Einrichtung (features[].type) ----
const FEATURES = {
  kiste(f, R) { const s = f.size || 1; R.add(part(new THREE.BoxGeometry(1.1 * s, 0.9 * s, 0.9 * s), { pos: [0, 0.45 * s, 0], color: f.color || '#a87850', faceVar: 0.1 })); R.add(part(new THREE.BoxGeometry(1.16 * s, 0.08, 0.96 * s), { pos: [0, 0.9 * s, 0], color: '#6b4a30' })); R.box(0, 0, 0.6 * s, 0.5 * s, 0, { group: 'raum', tag: 'kiste' }); R.surface({ type: 'box', x: 0, z: 0, hw: 0.55 * s, hd: 0.45 * s, y: 0.94 * s, group: 'raum', tag: 'kiste', surface: 'wood' }); },
  tisch(f, R) { const w = f.width || 2.2; R.add(part(new THREE.BoxGeometry(w, 0.1, 1.1), { pos: [0, 0.85, 0], color: '#a87850', faceVar: 0.08 })); for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) R.add(part(new THREE.BoxGeometry(0.1, 0.8, 0.1), { pos: [sx * (w / 2 - 0.12), 0.4, sz * 0.42], color: '#6b4a30' })); R.box(0, 0, w / 2, 0.55, 0, { group: 'raum', tag: 'tisch' }); },
  podest(f, R) { const r = f.radius || 1.6, h = f.height || 0.6; R.add(part(new THREE.CylinderGeometry(r, r + 0.2, h, 12, 1), { pos: [0, h / 2, 0], color: f.color || '#7d7a8c', faceVar: 0.1 })); R.add(part(new THREE.CylinderGeometry(r - 0.3, r - 0.3, 0.06, 12, 1), { pos: [0, h + 0.03, 0], color: f.color2 || '#a8a4bb' })); R.surface({ type: 'circle', x: 0, z: 0, r, y: h, group: 'raum', tag: 'podest', surface: 'rock' }); },
  saeule(f, R, K, def) { const h = f.height || def.size[1] - 0.2, r = f.radius || 0.55; R.add(part(new THREE.CylinderGeometry(r, r * 1.15, h, 8, 1), { pos: [0, h / 2, 0], jitter: 0.04, seed: 5, color: f.color || '#b9ad98', faceVar: 0.1 })); R.add(part(new THREE.BoxGeometry(r * 2.6, 0.3, r * 2.6), { pos: [0, h - 0.15, 0], color: f.color || '#b9ad98' })); R.add(part(new THREE.BoxGeometry(r * 2.4, 0.25, r * 2.4), { pos: [0, 0.12, 0], color: f.color || '#b9ad98' })); R.circle(0, 0, r + 0.1, { group: 'raum', tag: 'saeule' }); },
  regal(f, R) { const w = f.width || 2.4, hh = 2.4; R.add(part(new THREE.BoxGeometry(w, hh, 0.5), { pos: [0, hh / 2, 0], color: '#6b4a30', faceVar: 0.1 })); for (let i = 0; i < 3; i++) { R.add(part(new THREE.BoxGeometry(w - 0.1, 0.06, 0.5), { pos: [0, 0.7 + i * 0.7, 0.02], color: '#a87850' })); for (let k = 0; k < 4; k++) { const c = ['#ffd166', '#2de2c9', '#ff5d8f', '#b48cff'][(i + k) % 4]; R.glow(part(new THREE.CylinderGeometry(0.11, 0.13, 0.32, 6, 1), { pos: [-w / 2 + 0.35 + k * (w - 0.7) / 3, 0.9 + i * 0.7, 0.05], color: c }), c, 0.35); } } R.box(0, 0, w / 2, 0.3, 0, { group: 'raum', tag: 'regal' }); },
  werkbank(f, R) { R.add(part(new THREE.BoxGeometry(3, 0.14, 1.2), { pos: [0, 0.95, 0], color: '#8a6a48', faceVar: 0.08 })); R.add(part(new THREE.BoxGeometry(2.8, 0.85, 1.0), { pos: [0, 0.45, 0], color: '#5c4030' })); R.add(part(new THREE.CylinderGeometry(0.12, 0.12, 0.6, 6, 1), { pos: [-0.9, 1.3, 0], rot: [0, 0, 0.4], color: '#8d8a94' })); R.add(part(new THREE.BoxGeometry(0.5, 0.06, 0.2), { pos: [0.4, 1.05, 0.2], color: '#3b3848' })); R.add(part(new THREE.TorusGeometry(0.22, 0.05, 4, 10), { pos: [0.9, 1.1, -0.2], rot: [Math.PI / 2, 0, 0], color: '#ffd166' })); R.box(0, 0, 1.55, 0.65, 0, { group: 'raum', tag: 'werkbank' }); },
  haengematte(f, R) { for (const sx of [-1, 1]) R.add(part(new THREE.CylinderGeometry(0.08, 0.1, 1.6, 5, 1), { pos: [sx * 1.6, 0.8, 0], color: '#6b4a30' })); R.add(part(new THREE.BoxGeometry(2.8, 0.06, 1.1, 6, 1, 2), { pos: [0, 1.15, 0], color: f.color || '#ff9a6a', faceVar: 0.06, deform: (v) => { v.y -= (1 - (v.x / 1.4) ** 2) * 0.35; } }), 'base2'); R.box(0, 0, 1.7, 0.6, 0, { group: 'raum', tag: 'haengematte' }); },
  spiegel(f, R) { R.add(part(new THREE.BoxGeometry(1.2, 2.0, 0.12), { pos: [0, 1.15, 0], color: '#6b4a30' })); R.glow(part(new THREE.BoxGeometry(1.0, 1.8, 0.04), { pos: [0, 1.15, 0.06], color: '#cfe8ff' }), '#9ad0ff', 0.35); R.box(0, 0, 0.65, 0.15, 0, { group: 'raum', tag: 'spiegel' }); },
  glas(f, R) { R.glass(part(new THREE.CylinderGeometry(0.42, 0.36, 0.9, 10, 1, true), { pos: [0, 0.45, 0], color: '#dff4ff' }), '#bfe8ff'); R.add(part(new THREE.CylinderGeometry(0.44, 0.44, 0.08, 10, 1), { pos: [0, 0.04, 0], color: '#6b4a30' })); for (let i = 0; i < 5; i++) { const a = i * 1.7; R.glow(part(new THREE.IcosahedronGeometry(0.06, 0), { pos: [Math.cos(a) * 0.2, 0.25 + i * 0.12, Math.sin(a) * 0.2], color: '#fff6a8' }), '#ffe07a', 0.8); } R.circle(0, 0, 0.5, { group: 'raum', tag: 'glas' }); },
  jukebox(f, R) { R.add(part(new THREE.BoxGeometry(1.2, 1.7, 0.7), { pos: [0, 0.85, 0], color: '#b0413e', faceVar: 0.08 })); R.add(part(new THREE.CylinderGeometry(0.62, 0.62, 0.7, 12, 1, false, 0, Math.PI), { pos: [0, 1.7, 0], rot: [0, 0, 0], color: '#b0413e' })); R.glow(part(new THREE.BoxGeometry(0.9, 0.5, 0.06), { pos: [0, 1.05, 0.36], color: '#ffd166' }), '#ffb347', 0.5); for (let i = 0; i < 3; i++) R.glow(part(new THREE.TorusGeometry(0.5 - i * 0.06, 0.03, 4, 14, Math.PI), { pos: [0, 1.72, 0.36], color: ['#2de2c9', '#ff5d8f', '#b48cff'][i] }), ['#2de2c9', '#ff5d8f', '#b48cff'][i], 0.6); R.box(0, 0, 0.65, 0.4, 0, { group: 'raum', tag: 'jukebox' }); },
  pinnwand(f, R) { R.add(part(new THREE.BoxGeometry(3.2, 1.8, 0.12), { pos: [0, 1.6, 0], color: '#c9a26e', faceVar: 0.08 })); R.add(part(new THREE.BoxGeometry(3.4, 0.1, 0.16), { pos: [0, 2.55, 0], color: '#6b4a30' })); for (let i = 0; i < 9; i++) { const c = ['#ffd23f', '#ff3b3b', '#9b5cff', '#3d7bff', '#45d15a', '#2de2c9'][i % 6]; R.add(part(new THREE.BoxGeometry(0.42, 0.32, 0.03), { pos: [-1.2 + (i % 5) * 0.6, 2.0 - Math.floor(i / 5) * 0.5, 0.08], rot: [0, 0, (i % 3 - 1) * 0.08], color: i % 2 ? '#fff6e0' : c })); } R.box(0, 0, 1.7, 0.15, 0, { group: 'raum', tag: 'pinnwand' }); },
  bonsai(f, R) { R.add(part(new THREE.CylinderGeometry(0.6, 0.5, 0.5, 8, 1), { pos: [0, 0.25, 0], color: '#7a5a3a' })); R.add(part(new THREE.CylinderGeometry(0.08, 0.14, 1.1, 5, 2), { pos: [0, 1.0, 0], color: '#6b4a30', deform: (v) => { v.x += Math.sin(v.y * 3) * 0.15; } })); for (let i = 0; i < 4; i++) { const a = i * 1.6; R.add(part(new THREE.IcosahedronGeometry(0.32, 0), { pos: [Math.cos(a) * 0.35, 1.35 + (i % 2) * 0.25, Math.sin(a) * 0.35], scale: [1.2, 0.7, 1.2], jitter: 0.08, seed: 20 + i, color: '#4fae55', faceVar: 0.15 })); R.glow(part(new THREE.IcosahedronGeometry(0.06, 0), { pos: [Math.cos(a) * 0.55, 1.4 + (i % 2) * 0.25, Math.sin(a) * 0.55], color: '#ffd23f' }), '#ffd23f', 0.7); } R.circle(0, 0, 0.65, { group: 'raum', tag: 'bonsai' }); },
  gezeitenhorn(f, R) { R.add(part(new THREE.ConeGeometry(0.55, 2.2, 8, 1), { pos: [0, 1.4, 0], rot: [0.9, 0, 0], color: '#e8d6b8', faceVar: 0.08, deform: (v) => { v.x += Math.sin(v.y * 2) * 0.1; } })); R.add(part(new THREE.CylinderGeometry(0.5, 0.65, 0.5, 8, 1), { pos: [0, 0.25, 0], color: '#5f5a6e' })); R.glow(part(new THREE.TorusGeometry(0.35, 0.05, 4, 12), { pos: [0, 2.15, 0.85], rot: [0.9 + Math.PI / 2, 0, 0], color: '#7ff0ff' }), '#5ef0d8', 0.6); R.circle(0, 0, 0.7, { group: 'raum', tag: 'gezeitenhorn' }); },
  schild(f, R) { R.add(part(new THREE.BoxGeometry(0.08, 1.6, 0.08), { pos: [0, 0.8, 0], color: '#6b4a30' })); R.add(part(new THREE.BoxGeometry(0.9, 0.5, 0.06), { pos: [0, 1.5, 0], color: f.color || '#fff6e0' })); if (f.icon) R.glow(part(new THREE.IcosahedronGeometry(0.12, 0), { pos: [0, 1.5, 0.05], color: f.iconColor || '#2de2c9' }), f.iconColor || '#2de2c9', 0.5); },
  fackel(f, R, K) { R.add(part(new THREE.CylinderGeometry(0.05, 0.07, 0.9, 5, 1), { pos: [0, 0.45, 0], color: '#3b2a1a' })); const F = part(new THREE.ConeGeometry(0.16, 0.6, 5, 1), { pos: [0, 1.15, 0], color: (x, y) => (y > 1.25 ? '#ffd166' : '#ff6b1a'), wind: (x, y) => Math.max(0, (y - 0.85) / 0.6) }); const m = new THREE.Mesh(F, K.M.flame()); m.userData.dynamic = true; R.dyn(m); R.light(f.color || '#ffa040', f.intensity || 18, f.distance || 14, 0, 1.3, 0); },
  laterneWand(f, R, K) { R.prop('laterne', { variant: 'haengend', color: f.color, lit: f.lit !== false, height: f.height || 2.2 }, [0, 0, 0]); },
  stufen(f, R) { const n = f.count || 4, w = f.width || 3, rise = f.rise || 0.4, run = f.run || 0.8; for (let i = 0; i < n; i++) { const y = (i + 1) * rise, z = -i * run; R.add(part(new THREE.BoxGeometry(w, rise, run), { pos: [0, y - rise / 2, z], color: f.color || '#8d8a94', faceVar: 0.08 })); R.surface({ type: 'box', x: 0, z, hw: w / 2, hd: run / 2, y, group: 'raum', tag: 'stufe', surface: 'rock' }); } },
  ausgang(f, R) { /* Ausgänge baut das Szenen-System (Tür/Bogen + Interaktion) */ },
};
export const FEATURE_TYPES = Object.keys(FEATURES);

function applyFeature(f, R, K, def) {
  const at = f.at || [0, 0, 0];
  const yaw = f.yaw || 0;
  if (FEATURES[f.type]) {
    // in einen Unter-Sammler bauen und dann verschieben: einfacher ist, Teile direkt mit Offset zu erzeugen
    const sub = createCollector(K);
    FEATURES[f.type](f, sub, K, def);
    const built = sub.build(K.M);
    built.group.position.set(at[0], at[1] || 0, at[2]);
    built.group.rotation.y = yaw;
    built.group.updateMatrixWorld(true);
    // statische Meshes in den Haupt-Sammler übernehmen (Geometrie mit Transformation), Kollider verschieben
    for (const m of [...built.group.children]) {
      if (m.isMesh && !m.userData.dynamic && m.name.startsWith('raum-')) { const g = m.geometry.clone().applyMatrix4(m.matrixWorld); R.add(g, m.name.replace('raum-', '')); m.geometry.dispose(); }
      else if (!built.props.some((h) => h.group === m)) { m.applyMatrix4(built.group.matrix); R.dyn(m); }
    }
    const c = Math.cos(yaw), s = Math.sin(yaw);
    const tf = (x, z) => ({ x: at[0] + x * c + z * s, z: at[2] - x * s + z * c });
    for (const o of built.colliders) { const p = tf(o.x, o.z); R[o.type === 'circle' ? 'circle' : 'box'](p.x, p.z, o.type === 'circle' ? o.r : o.hw, o.type === 'circle' ? o : o.hd, o.type === 'circle' ? undefined : (o.rot || 0) + yaw, o.type === 'circle' ? undefined : o); }
    for (const o of built.surfaces) { const p = tf(o.x, o.z); R.surface({ ...o, x: p.x, z: p.z, rot: (o.rot || 0) + yaw, y: (o.y || 0) + (at[1] || 0) }); }
    for (const l of built.lights) { const p = tf(l.x, l.z); R.light(l.color, l.intensity, l.distance, p.x, l.y + (at[1] || 0), p.z); }
    for (const h of built.props) R.prop(h.type, h.opts, [at[0] + h.localAt[0], (at[1] || 0) + (h.localAt[1] || 0), at[2] + h.localAt[2]], yaw + (h.yaw || 0));
    return true;
  }
  if (K.props && K.props.types.includes(f.type)) { const { type, at: _a, yaw: _y, ...opts } = f; R.prop(type, opts, at, yaw); return true; }
  return false;
}

// ---- Kits ----
export const KITS = {
  hoehle(def, R, K) {
    const [w, h, d] = def.size;
    const rock = (x, y, z, out) => out.set(y > h * 0.55 ? '#1d2c4e' : y > 0.6 ? '#2a3a5c' : '#3a4a66');
    shellBox(R, w, h, d, { color: rock, jitter: Math.min(w, d) * 0.045, seed: 4, segs: [8, 4, 8], faceVar: 0.2, deform: (v) => { const k = 1 - Math.abs(Math.sin(v.x * 0.35) * Math.cos(v.z * 0.3)) * 0.12; v.x *= k; v.z *= k; } });
    R.add(part(new THREE.CylinderGeometry(Math.min(w, d) * 0.5, Math.min(w, d) * 0.5, 0.3, 18, 1), { pos: [0, 0.14, 0], jitter: 0.2, seed: 6, faceVar: 0.12, color: def.floorColor || '#7a8a86' }));
    // Stalagmiten/Stalaktiten am Rand, Leuchtpilze
    const R0 = K.rng;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU + R0.float(0, 0.4), rx = w * 0.42, rz = d * 0.42;
      const x = Math.cos(a) * rx * R0.float(0.7, 1), z = Math.sin(a) * rz * R0.float(0.7, 1);
      if (i % 2) { const hh = R0.float(1.2, 2.8); R.add(part(new THREE.ConeGeometry(R0.float(0.3, 0.6), hh, 5, 1), { pos: [x, hh / 2, z], jitter: 0.1, seed: 30 + i, faceVar: 0.15, color: '#3a4a66' })); R.circle(x, z, 0.45, { group: 'raum', tag: 'fels' }); }
      else { const hh = R0.float(1.5, 3.5); R.add(part(new THREE.ConeGeometry(R0.float(0.25, 0.5), hh, 5, 1), { pos: [x, h - hh / 2, z], rot: [Math.PI, 0, 0], jitter: 0.1, seed: 30 + i, faceVar: 0.15, color: '#2a3a5c' })); }
      if (i % 3 === 0) { const c = ['#5ef0d8', '#7a5cff', '#2de2c9'][i % 3 === 0 ? (i / 3) % 3 : 0]; R.glow(part(new THREE.SphereGeometry(0.3, 6, 5, 0, TAU, 0, Math.PI / 2), { pos: [x * 0.85, 0.3, z * 0.85], scale: [1.2, 0.8, 1], color: c }), c, 0.9); }
    }
  },
  tempel(def, R, K) {
    const [w, h, d] = def.size;
    const stone = (x, y, z, out) => out.set(y > h - 0.6 ? '#6b5f4c' : '#b9ad98');
    shellBox(R, w, h, d, { color: stone, jitter: 0.12, seed: 8, segs: [4, 2, 4], faceVar: 0.1 });
    R.add(part(new THREE.BoxGeometry(w - 0.2, 0.2, d - 0.2), { pos: [0, 0.1, 0], color: '#9c8f7a', faceVar: 0.12 }));
    // Bodenmuster: konzentrische Rahmen, Risse mit grünem Licht
    for (let i = 0; i < 3; i++) R.add(part(new THREE.BoxGeometry(w * 0.7 - i * 2.4, 0.04, 0.35), { pos: [0, 0.21, -d * 0.2 + i * 1.6], color: '#7a6e5c' }));
    for (let i = 0; i < 5; i++) R.glow(part(new THREE.BoxGeometry(R.crackLen || 1.6, 0.03, 0.08), { pos: [(-w / 2 + 2 + i * (w - 4) / 4), 0.22, (i % 2 ? 1 : -1) * d * 0.15], rot: [0, i * 0.7, 0], color: '#7ce36a' }), '#5ad24f', 0.5);
    // Säulenreihen
    const n = Math.max(2, Math.floor(d / 6));
    for (let i = 0; i < n; i++) for (const sx of [-1, 1]) {
      const x = sx * (w / 2 - 2.2), z = -d / 2 + 3 + i * ((d - 6) / Math.max(1, n - 1));
      applyFeature({ type: 'saeule', at: [x, 0, z], radius: 0.55 }, R, K, def);
    }
    // Podium hinten
    applyFeature({ type: 'stufen', at: [0, 0, -d / 2 + 4.5], count: 3, width: 6, rise: 0.35, run: 1 }, R, K, def);
  },
  turmetage(def, R, K) {
    const [w, h] = def.size;
    const r = w / 2;
    shellCylinder(R, r, h, { color: (x, y, z, out) => out.set(Math.floor(y / 1.4) % 2 ? '#e8453c' : '#fbf6ee'), jitter: 0.05, seed: 9, faceVar: 0.06 });
    R.add(part(new THREE.CylinderGeometry(r, r, 0.3, 16, 1), { pos: [0, 0.15, 0], color: '#8a6a48', faceVar: 0.1 }));
    R.add(part(new THREE.CylinderGeometry(0.5, 0.6, h, 8, 1), { pos: [0, h / 2, 0], color: '#3b3848' }));
    R.circle(0, 0, 0.7, { group: 'raum', tag: 'saeule' });
    // Wendeltreppe an der Wand bis zur Luke
    const steps = 14;
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * TAU * 0.85, y = 0.3 + (i + 1) * ((h - 1) / steps);
      const x = Math.cos(a) * (r - 1.0), z = Math.sin(a) * (r - 1.0);
      R.add(part(new THREE.BoxGeometry(1.7, 0.12, 0.7), { pos: [x, y, z], rot: [0, -a, 0], color: i % 2 ? '#8a6a48' : '#7a5a3c', faceVar: 0.08 }));
      R.surface({ type: 'box', x, z, hw: 0.85, hd: 0.35, rot: -a, y: y + 0.06, group: 'raum', tag: 'stufe', surface: 'wood' });
    }
    // Fensterschlitze mit Licht, Luke oben
    for (let i = 0; i < 4; i++) { const a = (i / 4) * TAU + 0.4; R.glow(part(new THREE.BoxGeometry(0.5, 1.6, 0.1), { pos: [Math.cos(a) * (r - 0.15), h * 0.55, Math.sin(a) * (r - 0.15)], rot: [0, -a + Math.PI / 2, 0], color: '#dfeaff' }), '#cfe0ff', 0.9); }
    R.glow(part(new THREE.TorusGeometry(1.0, 0.1, 6, 18), { pos: [Math.cos(TAU * 0.85) * (r - 1.0), h - 0.1, Math.sin(TAU * 0.85) * (r - 1.0)], rot: [Math.PI / 2, 0, 0], color: '#ffe6a0' }), '#ffd166', 0.5);
  },
  werkstatt(def, R, K) {
    const [w, h, d] = def.size;
    const wood = (x, y, z, out) => out.set(Math.floor((y + 0.2) / 0.5) % 2 ? '#7a5a3c' : '#8a6a48');
    shellBox(R, w, h, d, { color: wood, jitter: 0.03, seed: 11, segs: [4, 6, 4], faceVar: 0.08 });
    R.add(part(new THREE.BoxGeometry(w - 0.1, 0.16, d - 0.1), { pos: [0, 0.08, 0], color: '#a87850', faceVar: 0.1 }));
    for (let i = 0; i < 5; i++) R.add(part(new THREE.BoxGeometry(0.2, 0.2, d - 0.2), { pos: [-w / 2 + 1 + i * ((w - 2) / 4), h - 0.1, 0], color: '#5c4030' }));
    // Deckenlampe (Glimm-Schirm) + Werkzeuge an der Wand
    R.add(part(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 3, 1), { pos: [0, h - 0.6, 0], color: '#2f2c3a' }));
    R.add(part(new THREE.ConeGeometry(0.7, 0.5, 8, 1, true), { pos: [0, h - 1.3, 0], color: '#3b3f52' }), 'base2');
    R.glow(part(new THREE.SphereGeometry(0.22, 7, 5), { pos: [0, h - 1.45, 0], color: '#fff0c0' }), '#ffd28a', 1.0);
    for (let i = 0; i < 6; i++) R.add(part(new THREE.BoxGeometry(0.08, 0.7 + (i % 3) * 0.2, 0.08), { pos: [-w / 2 + 1.2 + i * 0.6, 1.9, -d / 2 + 0.12], rot: [0, 0, (i % 2 ? 0.2 : -0.1)], color: i % 2 ? '#8d8a94' : '#ffd166' }));
    applyFeature({ type: 'werkbank', at: [0, 0, -d / 2 + 1.4] }, R, K, def);
    applyFeature({ type: 'regal', at: [w / 2 - 0.4, 0, 0], yaw: -Math.PI / 2 }, R, K, def);
  },
  unterwasser(def, R, K) {
    const [w, h, d] = def.size;
    shellBox(R, w, h, d, { color: (x, y, z, out) => out.set(y > h * 0.35 ? '#1b2f5a' : '#243a5e'), jitter: 0.9, seed: 4, segs: [8, 4, 8], faceVar: 0.2 });
    R.add(part(new THREE.CylinderGeometry(Math.min(w, d) * 0.62, Math.min(w, d) * 0.62, 0.4, 16, 1), { pos: [0, 0.2, 0], jitter: 0.25, seed: 6, faceVar: 0.1, color: '#6d7f8a' }));
    const R0 = K.rng;
    for (let i = 0; i < 6; i++) { const a = (i / 6) * TAU + 0.5, rr = Math.min(w, d) * 0.32; const s = R0.float(1.2, 2.2); R.add(part(new THREE.IcosahedronGeometry(s, 1), { pos: [Math.cos(a) * rr, s * 0.5, Math.sin(a) * rr], scale: [1.2, 0.8, 1], jitter: s * 0.3, seed: 20 + i, faceVar: 0.15, color: '#33507a' })); R.circle(Math.cos(a) * rr, Math.sin(a) * rr, s * 0.9, { group: 'raum', tag: 'fels' }); }
    // Korallen (Kegelbüschel, kräftige Farben) und Seetang (schwingt: aWind)
    const coral = ['#ff5d8f', '#ff8c42', '#ffd23f', '#b48cff', '#2de2c9'];
    for (let i = 0; i < 14; i++) { const a = R0.float(0, TAU), rr = R0.float(3, Math.min(w, d) * 0.42); const c = coral[i % coral.length]; for (let k = 0; k < 4; k++) R.glow(part(new THREE.ConeGeometry(0.14, 0.9 + (k % 2) * 0.5, 4, 1), { pos: [Math.cos(a) * rr + Math.cos(k * 1.6) * 0.3, 0.55 + (k % 2) * 0.2, Math.sin(a) * rr + Math.sin(k * 1.6) * 0.3], rot: [Math.sin(k) * 0.3, 0, Math.cos(k) * 0.3], color: c }), c, 0.35); }
    const kelp = [];
    for (let i = 0; i < 18; i++) { const a = R0.float(0, TAU), rr = R0.float(2, Math.min(w, d) * 0.45), L = R0.float(2.5, h * 0.7); kelp.push(part(new THREE.BoxGeometry(0.22, L, 0.05), { pos: [Math.cos(a) * rr, L / 2 + 0.3, Math.sin(a) * rr], rot: [0, a, 0], color: i % 2 ? '#2e8f6a' : '#3aa07a', wind: (x, y) => (y / L) * 0.8 })); }
    const km = new THREE.Mesh(merge(kelp), K.vegMat || K.M.baseDouble); km.userData.dynamic = true; R.dyn(km);
    // Lichtstrahlen von oben
    const beamMat = new THREE.MeshBasicMaterial({ color: '#7fd8ff', transparent: true, opacity: 0.11, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    for (let i = 0; i < 4; i++) { const b = new THREE.Mesh(new THREE.PlaneGeometry(3.5, h - 0.5), beamMat); b.position.set((i - 1.5) * 4, h / 2, -3 + i * 2); b.rotation.y = 0.4 + i * 0.7; b.rotation.z = 0.12; b.userData.dynamic = true; R.dyn(b); }
  },
  baumhaus(def, R, K) {
    const [w, h] = def.size;
    const r = w / 2;
    shellCylinder(R, r, h, { color: (x, y, z, out) => out.set(y > h - 0.4 ? '#4fa86a' : (Math.floor(y / 0.45) % 2 ? '#8a6a48' : '#7a5a3c')), jitter: 0.04, seed: 12, segs: 16, faceVar: 0.08 });
    R.add(part(new THREE.CylinderGeometry(r, r, 0.3, 16, 1), { pos: [0, 0.15, 0], color: '#b07e52', faceVar: 0.08 }));
    // Fenster mit Blätterrahmen und warmem Licht, Dachbalken, Lichterkette
    for (let i = 0; i < 5; i++) { const a = (i / 5) * TAU + 0.3; R.glow(part(new THREE.BoxGeometry(1.4, 1.2, 0.12), { pos: [Math.cos(a) * (r - 0.12), h * 0.55, Math.sin(a) * (r - 0.12)], rot: [0, -a + Math.PI / 2, 0], color: '#ffefc0' }), '#ffe6a0', 0.9); for (let k = 0; k < 3; k++) R.add(part(new THREE.IcosahedronGeometry(0.35, 0), { pos: [Math.cos(a + (k - 1) * 0.16) * (r - 0.25), h * 0.55 + 0.75 + (k % 2) * 0.15, Math.sin(a + (k - 1) * 0.16) * (r - 0.25)], jitter: 0.1, seed: 40 + i * 3 + k, color: k % 2 ? '#4fa86a' : '#69c47a', faceVar: 0.14 })); }
    for (let i = 0; i < 6; i++) { const a = (i / 6) * TAU; R.add(part(new THREE.BoxGeometry(0.16, 0.16, r), { pos: [Math.cos(a) * r * 0.5, h - 0.2, Math.sin(a) * r * 0.5], rot: [0, -a, 0], color: '#5c4030' })); }
    for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; const c = ['#ffd166', '#ff5d8f', '#2de2c9', '#b48cff'][i % 4]; R.glow(part(new THREE.SphereGeometry(0.11, 6, 4), { pos: [Math.cos(a) * (r - 0.6), h - 0.6 + Math.sin(i * 2) * 0.1, Math.sin(a) * (r - 0.6)], color: c }), c, 0.9); }
  },
};
KITS.kugel = KITS.tempel;
KITS.lichtkammer = KITS.hoehle;
export const KIT_NAMES = Object.keys(KITS);

// Raum bauen: Hülle + Kit-Ausstattung + features; Rückgabe des Sammlers mit group, colliders, surfaces, dynamic, props, lights
export function buildRoom(def, K) {
  const R = createCollector(K);
  const kit = KITS[def.kit] || KITS.hoehle;
  kit(def, R, K);
  for (const f of def.features || []) {
    if (!applyFeature(f, R, K, def)) console.warn('[roomkit] unbekannte Einrichtung', f.type);
  }
  return R.build(K.M);
}

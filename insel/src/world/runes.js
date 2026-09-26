// Rune-Tore, Dornenwände, Sporenwolken und Tauchringe (WP13/WP15): Weltobjekte für das Gefühlssegel.
// Rein: createRuneRegistry() · add({ id, kind:'tor'|'dornen'|'sporen'|'tauchring', x, y, z, r, emotion, second?, yaw? })
//   passTor(prev, pos) → Tor, wenn die Strecke die Ringscheibe durchquert · hitDornen(pos, r) · breakDornen(d) · inSporen(pos)
//   tauchringAt(x, z) → Tauchring
// Welt: createRunes({ scene, island, colliders, veil, particles }) – Sichtbarkeit: Ring in Gefühlsfarbe mit Symbol,
//   Dornenwand mit Kollider (Tag 'dornen'), Sporenwolke, Tauchring auf dem Wasser. Farben = Gefühlsfarben (setColors).
import * as THREE from 'three';
import { part, merge } from './geom.js';
import { lambertVC } from './landmarks.js';
import { EMOTION_COLORS, EMOTION_SYMBOLS } from '../actors/segel.js';

export function createRuneRegistry({ colors = EMOTION_COLORS } = {}) {
  const list = [];
  const cols = { ...colors };
  const hex = (em) => new THREE.Color(cols[em] || '#ffffff').getHex();
  const reg = {
    list,
    add(def) {
      const r = { kind: 'tor', r: 2.2, yaw: 0, broken: false, ...def };
      r.color = r.emotion ? hex(r.emotion) : 0xffffff;
      list.push(r);
      return r;
    },
    remove(id) { const i = list.findIndex((u) => u.id === id); if (i >= 0) return list.splice(i, 1)[0]; return null; },
    get(id) { return list.find((u) => u.id === id) || null; },
    setColors(map) { Object.assign(cols, map || {}); for (const r of list) if (r.emotion) r.color = hex(r.emotion); },
    // Ring durchflogen? Ebene des Rings: Normale = (sin yaw, 0, cos yaw)
    passTor(prev, pos) {
      for (const r of list) {
        if (r.kind !== 'tor') continue;
        const nx = Math.sin(r.yaw), nz = Math.cos(r.yaw);
        const d0 = (prev.x - r.x) * nx + (prev.z - r.z) * nz;
        const d1 = (pos.x - r.x) * nx + (pos.z - r.z) * nz;
        if (d0 * d1 > 0 || d0 === d1) continue;
        const t = d0 / (d0 - d1);
        const cx = prev.x + (pos.x - prev.x) * t, cy = (prev.y + 1) + ((pos.y + 1) - (prev.y + 1)) * t, cz = prev.z + (pos.z - prev.z) * t;
        const inPlane = Math.hypot((cx - r.x) * nz - (cz - r.z) * nx, cy - r.y);
        if (inPlane <= r.r) return r;
      }
      return null;
    },
    hitDornen(pos, rad = 0.8) {
      for (const r of list) {
        if (r.kind !== 'dornen' || r.broken) continue;
        if (pos.y + 1 < r.y - 0.5 || pos.y > r.y + (r.h || 4)) continue;
        const dx = pos.x - r.x, dz = pos.z - r.z;
        const c = Math.cos(r.yaw), s = Math.sin(r.yaw);
        const lx = dx * c - dz * s, lz = dx * s + dz * c;
        if (Math.abs(lx) <= (r.hw || 3) + rad && Math.abs(lz) <= (r.hd || 0.6) + rad) return r;
      }
      return null;
    },
    breakDornen(r) { r.broken = true; if (r.onBreak) r.onBreak(r); return r; },
    inSporen(pos) {
      for (const r of list) {
        if (r.kind !== 'sporen') continue;
        if (Math.hypot(pos.x - r.x, (pos.y + 1) - r.y, pos.z - r.z) <= r.r) return r;
      }
      return null;
    },
    tauchringAt(x, z) {
      for (const r of list) { if (r.kind === 'tauchring' && Math.hypot(x - r.x, z - r.z) <= r.r) return r; }
      return null;
    },
  };
  return reg;
}

function symbolGeo(sym, color) {
  const P = [];
  if (sym === 'sonne') { P.push(part(new THREE.IcosahedronGeometry(0.22, 1), { color })); for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; P.push(part(new THREE.ConeGeometry(0.06, 0.22, 4, 1), { pos: [Math.cos(a) * 0.4, Math.sin(a) * 0.4, 0], rot: [0, 0, a - Math.PI / 2], color })); } }
  else if (sym === 'flamme') { P.push(part(new THREE.ConeGeometry(0.28, 0.75, 6, 1), { pos: [0, 0.1, 0], color, deform: (v) => { v.x += Math.sin(v.y * 4) * 0.05; } })); P.push(part(new THREE.ConeGeometry(0.12, 0.35, 5, 1), { pos: [0.16, -0.05, 0], rot: [0, 0, -0.5], color })); }
  else if (sym === 'zickzack') { for (let k = 0; k < 4; k++) P.push(part(new THREE.BoxGeometry(0.42, 0.09, 0.06), { pos: [(k % 2 ? 0.12 : -0.12), -0.36 + k * 0.24, 0], rot: [0, 0, k % 2 ? -0.75 : 0.75], color })); }
  else if (sym === 'tropfen') { P.push(part(new THREE.SphereGeometry(0.26, 10, 8), { pos: [0, -0.1, 0], color })); P.push(part(new THREE.ConeGeometry(0.25, 0.5, 10, 1), { pos: [0, 0.25, 0], color })); }
  else if (sym === 'wirbel') { P.push(part(new THREE.TorusGeometry(0.3, 0.07, 5, 14, Math.PI * 1.55), { color })); P.push(part(new THREE.TorusGeometry(0.14, 0.06, 5, 10, Math.PI * 1.3), { pos: [0.06, -0.02, 0], rot: [0, 0, 2.6], color })); }
  else { for (let k = 0; k < 5; k++) { const a = (k / 5) * Math.PI * 2; P.push(part(new THREE.BoxGeometry(0.12, 0.6, 0.08), { pos: [Math.cos(a) * 0.15, Math.sin(a) * 0.15, 0], rot: [0, 0, a - Math.PI / 2], color })); } }
  return merge(P);
}

export function createRunes({ scene, island, colliders, veil, particles, colors } = {}) {
  const reg = createRuneRegistry({ colors });
  const group = new THREE.Group();
  group.name = 'runes';
  const mat = lambertVC(veil, 'runes');
  const glowMats = new Map();
  const glowMat = (hexColor) => {
    const key = String(hexColor);
    if (!glowMats.has(key)) {
      const m = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, emissive: new THREE.Color(hexColor), emissiveIntensity: 0.6, transparent: true, opacity: 0.95 });
      if (veil) veil.patch(m, { key: 'rune-' + key, veil: false });
      glowMats.set(key, m);
    }
    return glowMats.get(key);
  };
  const anim = [];
  let fxT = 0;

  function buildTor(r) {
    const col = new THREE.Color(r.color);
    const g = new THREE.Group();
    const ring = new THREE.Mesh(part(new THREE.TorusGeometry(r.r, 0.13, 6, 28), { color: col, jitter: 0.03, seed: 3 }), glowMat(r.color));
    g.add(ring);
    // Innenscheibe: zarter Schimmer
    const disc = new THREE.Mesh(new THREE.CircleGeometry(r.r - 0.1, 28), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
    g.add(disc);
    const sym = new THREE.Mesh(symbolGeo(EMOTION_SYMBOLS[r.emotion] || 'stern', col), glowMat(r.color));
    sym.position.y = r.r + 0.75;
    g.add(sym);
    if (r.second) { const s2 = new THREE.Mesh(symbolGeo(EMOTION_SYMBOLS[r.second] || 'stern', new THREE.Color(EMOTION_COLORS[r.second])), glowMat(new THREE.Color(EMOTION_COLORS[r.second]).getHex())); s2.position.set(0.9, r.r + 0.75, 0); sym.position.x = -0.9; g.add(s2); }
    // Halterung: zwei Runensteine
    for (const s of [-1, 1]) g.add(new THREE.Mesh(part(new THREE.BoxGeometry(0.5, r.r * 1.6, 0.5), { pos: [s * (r.r + 0.35), -r.r * 0.2, 0], jitter: 0.12, seed: 8 + s, faceVar: 0.1, color: '#5f5a6e' }), mat));
    g.position.set(r.x, r.y, r.z);
    g.rotation.y = r.yaw;
    group.add(g);
    r.mesh = g; r.sym = sym;
    anim.push(r);
  }
  function buildDornen(r) {
    const P = [];
    const hw = r.hw || 3, hd = r.hd || 0.6, h = r.h || 4;
    P.push(part(new THREE.BoxGeometry(hw * 2, h, hd * 2, 4, 3, 1), { pos: [0, h / 2, 0], jitter: 0.35, seed: 5, faceVar: 0.15, color: '#3f2f2a' }));
    for (let k = 0; k < Math.round(hw * 6); k++) {
      const x = (Math.random() - 0.5) * hw * 2, y = 0.3 + Math.random() * (h - 0.6), z = (Math.random() - 0.5) * hd * 2;
      const a = Math.random() * Math.PI * 2;
      P.push(part(new THREE.ConeGeometry(0.12, 0.7, 4, 1), { pos: [x, y, z + (Math.random() > 0.5 ? hd : -hd)], rot: [Math.PI / 2 * (z > 0 ? 1 : -1), 0, a], color: '#8a4a3a' }));
      P.push(part(new THREE.ConeGeometry(0.1, 0.5, 4, 1), { pos: [x, y + 0.2, z], rot: [0, 0, a], color: '#c24f3e' }));
    }
    const m = new THREE.Mesh(merge(P), mat);
    m.position.set(r.x, r.y, r.z); m.rotation.y = r.yaw;
    m.castShadow = true;
    group.add(m);
    r.mesh = m;
    r.collider = colliders ? colliders.addBox(r.x, r.z, hw, hd, r.yaw, { group: 'runes', tag: 'dornen', yMin: r.y - 0.5, yMax: r.y + h }) : null;
    r.onBreak = (d) => {
      if (d.mesh) { group.remove(d.mesh); d.mesh.geometry.dispose(); d.mesh = null; }
      if (d.collider && colliders) { colliders.remove(d.collider); d.collider = null; }
      if (particles) particles.emit({ x: d.x, y: d.y + 1.5, z: d.z, count: 40, spread: hw * 1.5, speed: 4, up: 3, color: 0x9a5a48, size: 0.5, life: 1.2, gravity: -6, drag: 1.2, alpha: 0.9 });
    };
  }
  function buildSporen(r) {
    const m = new THREE.Mesh(part(new THREE.IcosahedronGeometry(r.r, 1), { jitter: r.r * 0.25, seed: 11, faceVar: 0.2, color: '#8fd45a' }), new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, transparent: true, opacity: 0.35, depthWrite: false, emissive: new THREE.Color('#5fa030'), emissiveIntensity: 0.3 }));
    if (veil) veil.patch(m.material, { key: 'sporen', veil: false });
    m.position.set(r.x, r.y, r.z);
    m.renderOrder = 8;
    group.add(m);
    r.mesh = m;
    anim.push(r);
  }
  function buildTauchring(r) {
    const col = new THREE.Color('#2de2c9');
    const g = new THREE.Group();
    g.add(new THREE.Mesh(part(new THREE.TorusGeometry(r.r, 0.16, 6, 26), { color: col }), glowMat(col.getHex())));
    const disc = new THREE.Mesh(new THREE.CircleGeometry(r.r - 0.1, 26), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending }));
    disc.rotation.x = -Math.PI / 2;
    g.add(disc);
    g.rotation.x = Math.PI / 2;
    const sym = new THREE.Mesh(symbolGeo('tropfen', new THREE.Color('#dffcff')), glowMat(col.getHex()));
    sym.position.set(0, 0, -1.0);
    g.add(sym);
    g.position.set(r.x, r.y, r.z);
    group.add(g);
    r.mesh = g;
    anim.push(r);
  }

  const api = Object.assign(reg, {
    group,
    addWithVisual(def) {
      const r = reg.add(def);
      if (r.y === undefined) r.y = island.getHeight(r.x, r.z) + (r.kind === 'tor' ? r.r + 1.2 : r.kind === 'sporen' ? r.r : 0);
      if (r.kind === 'tor') buildTor(r);
      else if (r.kind === 'dornen') buildDornen(r);
      else if (r.kind === 'sporen') buildSporen(r);
      else if (r.kind === 'tauchring') { r.y = island.waterLevel(r.x, r.z) + 0.06; buildTauchring(r); }
      return r;
    },
    update(dt, t, playerPos) {
      for (const r of anim) {
        if (!r.mesh) continue;
        if (r.kind === 'tor') { r.sym.rotation.y = t * 1.2; r.sym.position.y = r.r + 0.75 + Math.sin(t * 2 + r.x) * 0.12; }
        else if (r.kind === 'sporen') { r.mesh.rotation.y = t * 0.15; r.mesh.scale.setScalar(1 + Math.sin(t * 0.9 + r.z) * 0.05); }
        else if (r.kind === 'tauchring') { r.mesh.position.y = r.y + Math.sin(t * 1.4 + r.x) * 0.08; r.mesh.children[2].rotation.z = t; }
      }
      if (!particles || dt <= 0) return;
      fxT += dt;
      if (fxT < 0.2) return;
      fxT = 0;
      for (const r of reg.list) {
        if (Math.hypot(playerPos.x - r.x, playerPos.z - r.z) > 90) continue;
        if (r.kind === 'sporen') particles.emit({ x: r.x + (Math.random() - 0.5) * r.r * 1.6, y: r.y + (Math.random() - 0.5) * r.r, z: r.z + (Math.random() - 0.5) * r.r * 1.6, count: 2, spread: 0.5, speed: 0.3, up: 0.2, color: 0xb8f07a, size: 0.35, life: 2.2, gravity: 0.05, drag: 0.3, alpha: 0.6 });
        else if (r.kind === 'tor') { const a = Math.random() * Math.PI * 2; particles.emit({ x: r.x + Math.cos(a) * r.r * Math.cos(r.yaw), y: r.y + Math.sin(a) * r.r, z: r.z - Math.cos(a) * r.r * Math.sin(r.yaw), count: 1, spread: 0.1, speed: 0.2, up: 0.3, color: r.color, size: 0.35, life: 1.2, gravity: 0, drag: 1, additive: true, alpha: 0.8 }); }
        else if (r.kind === 'tauchring') particles.emit({ x: r.x + (Math.random() - 0.5) * r.r * 1.5, y: r.y + 0.05, z: r.z + (Math.random() - 0.5) * r.r * 1.5, count: 1, spread: 0.2, speed: 0.2, up: 0.6, color: 0xbafff4, size: 0.3, life: 1.0, gravity: -1, drag: 1, alpha: 0.7 });
      }
    },
  });
  scene.add(group);
  return api;
}

// Bauanleitungen der Requisiten (WP43): jede Funktion baut eine THREE.Group (Ursprung = Bodenpunkt, +z = vorne)
// und gibt { group, update?(dt, t), api… } zurück. Meshes mit userData.dynamic = true bleiben beim Backen (kit.bake) einzeln.
// Farben stammen aus dem Regions-Look (kräftige Paletten), Formen aus geom.js (part/merge), alles unter 3k Dreiecken.
import * as THREE from 'three';
import { part, merge } from '../../world/geom.js';

const TAU = Math.PI * 2;
export const NEED_COLORS = { koerper: '#ff7a59', sicherheit: '#4d8cff', zugehoerigkeit: '#ffd23f', anerkennung: '#b48cff', selbstbestimmung: '#2de2c9', spass: '#ff5d8f' };
export const NEEDS = Object.keys(NEED_COLORS);

const mesh = (geo, mat, dyn = false) => { const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; if (dyn) m.userData.dynamic = true; return m; };
const tri = (geo) => geo.attributes.position.count / 3;

// ---- Signalfeuer: Steinring, Holzstoß, Flammen (Shader-Flackern), Funken; setLit(v) ----
export function signalfeuer(o, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const P = [];
  const n = 9;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + R.float(-0.15, 0.15), r = 1.35 + R.float(-0.08, 0.08);
    P.push(part(new THREE.DodecahedronGeometry(0.34 + R.float(0, 0.12), 0), { pos: [Math.cos(a) * r, 0.2, Math.sin(a) * r], rot: [R.float(0, 1), R.float(0, 3), 0], scale: [1.2, 0.8, 1], jitter: 0.12, seed: 300 + i, faceVar: 0.2, color: i % 3 ? '#8b8794' : '#6f6a78' }));
  }
  P.push(part(new THREE.CylinderGeometry(1.15, 1.25, 0.18, 12, 1), { pos: [0, 0.09, 0], color: '#3a3238', faceVar: 0.1 }));
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * TAU + 0.4;
    P.push(part(new THREE.CylinderGeometry(0.11, 0.14, 1.7, 5, 1), { pos: [Math.cos(a) * 0.35, 0.65, Math.sin(a) * 0.35], rot: [Math.sin(a) * 0.95, 0, -Math.cos(a) * 0.95], color: i % 2 ? '#6b4a30' : '#553a25', faceVar: 0.1 }));
  }
  g.add(mesh(merge(P), M.base));
  // Flammen: drei Kegel + innerer heller Kern, aWind = Höhe (Flackern oben stärker)
  const F = [];
  const flameCol = (x, y, z, out) => out.set(y > 1.4 ? '#ffd166' : y > 0.8 ? '#ff8c1a' : '#ff4d1a');
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU, r = i === 3 ? 0 : 0.28;
    const h = i === 3 ? 2.2 : 1.5 + R.float(0, 0.4);
    F.push(part(new THREE.ConeGeometry(i === 3 ? 0.42 : 0.33, h, 5, 2), { pos: [Math.cos(a) * r, 0.55 + h / 2, Math.sin(a) * r], rot: [0, R.float(0, 3), 0], color: flameCol, wind: (x, y) => Math.max(0, (y - 0.5) / h), deform: (v) => { v.x *= 1 + Math.sin(v.y * 2.5) * 0.25; v.z *= 1 + Math.cos(v.y * 2.1) * 0.25; } }));
  }
  F.push(part(new THREE.ConeGeometry(0.2, 1.2, 4, 1), { pos: [0, 1.1, 0], color: '#fff5c0', wind: (x, y) => Math.max(0, (y - 0.5) / 1.2) }));
  F.push(part(new THREE.IcosahedronGeometry(0.5, 0), { pos: [0, 0.75, 0], color: '#ffb347', wind: 0.05 }));   // Glutkern
  const flames = mesh(merge(F), M.flame(), true);
  flames.castShadow = false;
  g.add(flames);
  const ember = flames;
  let lit = o.lit !== false, level = lit ? 1 : 0, sparkT = 0;
  const api = {
    group: g, type: 'signalfeuer',
    get lit() { return lit; },
    setLit(v) { lit = !!v; },
    update(dt, t, ctx) {
      level += ((lit ? 1 : 0) - level) * Math.min(1, dt * 2.5);
      flames.visible = level > 0.02;
      flames.scale.set(0.6 + 0.4 * level, Math.max(0.02, level), 0.6 + 0.4 * level);
      if (ctx && ctx.particles && lit && dt > 0 && ctx.near(g, 90)) {
        sparkT += dt;
        if (sparkT > 0.18) { sparkT = 0; const p = ctx.worldPos(g); ctx.particles.emit({ x: p.x, y: p.y + 1.4, z: p.z, count: 2, spread: 0.5, speed: 0.4, up: 2.4, color: 0xffb347, size: 0.35, life: 1.4, gravity: 0.6, drag: 0.8, additive: true, alpha: 0.9 }); }
      }
    },
    collide(colliders, x, z) { return colliders.addCircle(x, z, 1.5, { group: 'props', tag: 'signalfeuer' }); },
  };
  api.update(0, 0);
  return api;
}

// ---- Laterne: Pfahl oder hängend (arm), Variante 'papier' (Kugel in Farbe); setLit(v) ----
export function laterne(o = {}, K) {
  const { M } = K;
  const g = new THREE.Group();
  const kind = o.variant || 'pfahl';
  const color = o.color || (kind === 'papier' ? '#ff7a59' : '#ffe08a');
  const h = o.height !== undefined ? o.height : (kind === 'papier' ? 2.6 : 2.9);
  const P = [];
  // Pfahl aus Holz (#7A4E2E, §2.2), Beschläge und Gehäuse Schiefer #3F4460 – #2f2c3a las sich in der Rampe als Schwarz
  const SCHIEFER = '#3F4460', HOLZ = '#7A4E2E', KANTE = '#C9CFE8';
  if (kind === 'pfahl') {
    P.push(part(new THREE.CylinderGeometry(0.06, 0.09, h, 6, 1), { pos: [0, h / 2, 0], color: HOLZ }));
    P.push(part(new THREE.CylinderGeometry(0.08, 0.08, 0.1, 6, 1), { pos: [0, h - 0.3, 0], color: SCHIEFER }));
    P.push(part(new THREE.CylinderGeometry(0.11, 0.13, 0.12, 6, 1), { pos: [0, 0.06, 0], color: SCHIEFER }));
    P.push(part(new THREE.BoxGeometry(0.5, 0.06, 0.06), { pos: [0.22, h - 0.05, 0], color: SCHIEFER }));
    P.push(part(new THREE.BoxGeometry(0.06, 0.28, 0.05), { pos: [0.16, h - 0.2, 0], rot: [0, 0, 0.7], color: SCHIEFER }));
    P.push(part(new THREE.CylinderGeometry(0.02, 0.02, 0.25, 4, 1), { pos: [0.45, h - 0.18, 0], color: SCHIEFER }));
  } else if (kind === 'haengend') {
    P.push(part(new THREE.CylinderGeometry(0.02, 0.02, 0.3, 4, 1), { pos: [0, h + 0.15, 0], color: SCHIEFER }));
  }
  const cx = kind === 'pfahl' ? 0.45 : 0, cy = kind === 'pfahl' ? h - 0.55 : h;
  if (kind === 'papier') {
    P.push(part(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 4, 1), { pos: [0, cy + 0.42, 0], color: SCHIEFER }));
    const paper = part(new THREE.SphereGeometry(0.34, 8, 6), { pos: [0, cy, 0], scale: [1, 1.15, 1], color: color, faceVar: 0.06 });
    g.add(mesh(merge(P), M.base));
    const lamp = mesh(paper, M.glow(color, { intensity: 0.75 }), !!o.dynamic);
    g.add(lamp);
    return finishLamp(g, lamp, o, 'papier');
  }
  // Gehäuse: Rahmen + Dach mit heller Kante (Metall-Glanzpunkt) + Scheibe
  const F = [];
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) F.push(part(new THREE.BoxGeometry(0.04, 0.5, 0.04), { pos: [cx + sx * 0.15, cy, sz * 0.15], color: SCHIEFER }));
  F.push(part(new THREE.ConeGeometry(0.28, 0.16, 4, 1), { pos: [cx, cy + 0.32, 0], rot: [0, Math.PI / 4, 0], color: SCHIEFER }));
  F.push(part(new THREE.BoxGeometry(0.36, 0.025, 0.36), { pos: [cx, cy + 0.235, 0], color: KANTE }));
  F.push(part(new THREE.IcosahedronGeometry(0.035, 0), { pos: [cx, cy + 0.42, 0], color: KANTE }));
  F.push(part(new THREE.BoxGeometry(0.34, 0.04, 0.34), { pos: [cx, cy - 0.26, 0], color: SCHIEFER }));
  P.push(...F);
  g.add(mesh(merge(P), M.base));
  const lamp = mesh(part(new THREE.BoxGeometry(0.26, 0.42, 0.26), { pos: [cx, cy, 0], color: color }), M.glow(color, { intensity: 0.9 }), !!o.dynamic);
  g.add(lamp);
  return finishLamp(g, lamp, o, kind);
}
function finishLamp(g, lamp, o, kind) {
  let lit = o.lit !== false, level = lit ? 1 : 0;
  const c0 = lamp.material.color.clone();
  return {
    group: g, type: 'laterne', kind,
    get lit() { return lit; },
    setLit(v) { lit = !!v; },
    // Material ist geteilt (Backen): Leuchten = sichtbar und Größe, aus = klein und dunkel
    update(dt, t) {
      level += ((lit ? 1 : 0) - level) * Math.min(1, dt * 3);
      lamp.scale.setScalar(0.6 + 0.4 * level);
      lamp.visible = level > 0.05;
    },
    collide(colliders, x, z) { return kind === 'pfahl' ? colliders.addCircle(x, z, 0.14, { group: 'props', tag: 'laterne' }) : null; },
  };
}

// ---- Gezeiten-Tank: Glaszylinder auf Sockel, Wasser in der Farbe des Bedürfnisses; setFill(0..1), slosh(v) ----
export function tank(o = {}, K) {
  const { M } = K;
  const g = new THREE.Group();
  const need = o.need || 'koerper';
  const color = o.color || NEED_COLORS[need] || '#4d8cff';
  const H = o.height || 2.4, r = o.radius || 0.7;
  const P = [];
  P.push(part(new THREE.CylinderGeometry(r + 0.25, r + 0.35, 0.3, 10, 1), { pos: [0, 0.15, 0], color: '#5a4a3a', faceVar: 0.1 }));
  P.push(part(new THREE.CylinderGeometry(r + 0.12, r + 0.12, 0.12, 10, 1), { pos: [0, H + 0.36, 0], color: '#8a6a4a' }));
  for (let i = 0; i < 4; i++) { const a = (i / 4) * TAU; P.push(part(new THREE.BoxGeometry(0.08, H, 0.08), { pos: [Math.cos(a) * (r + 0.06), 0.3 + H / 2, Math.sin(a) * (r + 0.06)], color: '#6a5646' })); }
  // Symbol des Bedürfnisses als kleines Schild vorne
  P.push(part(new THREE.BoxGeometry(0.5, 0.36, 0.05), { pos: [0, 0.75, r + 0.16], color: '#fff6e0' }));
  P.push(part(new THREE.IcosahedronGeometry(0.11, 0), { pos: [0, 0.75, r + 0.2], color: color }));
  g.add(mesh(merge(P), M.base));
  const glassMesh = mesh(part(new THREE.CylinderGeometry(r, r, H, 10, 1, true), { pos: [0, 0.3 + H / 2, 0], color: '#dff4ff' }), M.glass('#bfe8ff', { opacity: 0.28 }));
  glassMesh.castShadow = false;
  const water = mesh(part(new THREE.CylinderGeometry(r - 0.04, r - 0.04, 1, 10, 1), { pos: [0, 0.5, 0], color: color, faceVar: 0.05 }), M.glow(color, { intensity: 0.35 }), true);
  water.castShadow = false;
  water.position.y = 0.32;
  g.add(water, glassMesh);
  let fill = o.fill !== undefined ? o.fill : 0.6, shown = fill, slosh = 0, sloshV = 0;
  const api = {
    group: g, type: 'tank', need, color,
    get fill() { return fill; },
    setFill(v) { fill = Math.max(0, Math.min(1, v)); },
    add(v) { api.setFill(fill + v); },
    slosh(v = 1) { sloshV += v * 2.5; },
    update(dt, t) {
      shown += (fill - shown) * Math.min(1, dt * 2);
      sloshV -= slosh * 18 * dt; slosh += sloshV * dt; sloshV *= Math.exp(-dt * 2.2);
      water.scale.y = Math.max(0.02, shown * H);
      water.rotation.z = slosh * 0.08 + Math.sin(t * 2.3) * 0.006;
      water.visible = shown > 0.02;
    },
    collide(colliders, x, z) { return colliders.addCircle(x, z, r + 0.3, { group: 'props', tag: 'tank' }); },
  };
  api.update(0, 0);
  return api;
}

// ---- Marktstand: Tisch, Pfosten, gestreifte Markise, Kisten mit Waren; Farben je Stand ----
export function marktstand(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const pal = o.colors || R.pick([['#ff6b3d', '#fff1dc'], ['#2de2c9', '#fff1dc'], ['#ffd166', '#5b3a8a'], ['#ff5d8f', '#fff1dc'], ['#4d8cff', '#ffe6a0']]);
  const w = o.width || 3.2, d = 1.6, hT = 0.95, hA = 2.6;
  const P = [];
  P.push(part(new THREE.BoxGeometry(w, 0.12, d), { pos: [0, hT, 0], color: '#a87850', faceVar: 0.08 }));
  P.push(part(new THREE.BoxGeometry(w - 0.3, hT - 0.15, d - 0.4), { pos: [0, (hT - 0.15) / 2, 0], color: '#7a5a3a', faceVar: 0.1 }));
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) P.push(part(new THREE.BoxGeometry(0.1, hA, 0.1), { pos: [sx * (w / 2 - 0.08), hA / 2, sz * (d / 2 + 0.25)], color: '#5c4030' }));
  // Markise: Streifen als gekippte Latten
  const stripes = 7;
  for (let i = 0; i < stripes; i++) {
    const x = -w / 2 + (i + 0.5) * (w / stripes);
    P.push(part(new THREE.BoxGeometry(w / stripes + 0.02, 0.04, d + 1.1), { pos: [x, hA + 0.22, 0.1], rot: [-0.28, 0, 0], color: i % 2 ? pal[0] : pal[1], faceVar: 0.05 }));
    P.push(part(new THREE.BoxGeometry(w / stripes + 0.02, 0.32, 0.04), { pos: [x, hA - 0.32, d / 2 + 0.75], color: i % 2 ? pal[0] : pal[1] }));
  }
  // Waren (§9.2 „gefüllte Stände“): Tischdecke, Kisten voller Früchte in zwei Reihen, Säcke, Krüge, Girlande am Dach
  const goods = ['#ff5d8f', '#ffd23f', '#45d15a', '#ff8c42', '#b48cff', '#2de2c9', '#ff4d4d'];
  P.push(part(new THREE.BoxGeometry(w + 0.1, 0.05, d + 0.16), { pos: [0, hT + 0.07, 0], color: pal[1] === '#fff1dc' ? '#fff3d6' : pal[1] }));
  for (let i = 0; i < 3; i++) {
    const x = -w / 2 + 0.6 + i * (w - 1.2) / 2;
    for (const [z, y] of [[0.28, hT + 0.24], [-0.34, hT + 0.34]]) {
      P.push(part(new THREE.BoxGeometry(0.74, 0.3, 0.5, 1, 1, 1), { pos: [x, y, z], rot: [z < 0 ? -0.22 : 0, 0, 0], color: '#c9a26e', faceVar: 0.08 }));
      for (let k = 0; k < 7; k++) P.push(part(new THREE.IcosahedronGeometry(0.1 + (k % 2) * 0.02, 0), { pos: [x + R.float(-0.24, 0.24), y + 0.2 + (k % 3) * 0.05, z + R.float(-0.14, 0.14)], color: goods[(i * 3 + k) % goods.length] }));
    }
  }
  P.push(part(new THREE.CylinderGeometry(0.16, 0.12, 0.42, 6, 1), { pos: [w / 2 - 0.35, hT + 0.27, -0.45], color: pal[0] }));
  P.push(part(new THREE.CylinderGeometry(0.12, 0.1, 0.34, 6, 1), { pos: [w / 2 - 0.62, hT + 0.23, -0.5], color: '#fff3d6' }));
  for (const [sx, sz] of [[-w / 2 - 0.45, 0.2], [w / 2 + 0.5, -0.1]]) P.push(part(new THREE.SphereGeometry(0.34, 8, 6), { pos: [sx, 0.3, sz], scale: [1, 0.85, 1], smooth: true, color: '#d9c2a0', deform: (v) => { if (v.y > 0.2) v.y = 0.2 + (v.y - 0.2) * 0.5; } }));
  // Girlande unter der Markise: Zwiebeln/Paprika in Ketten
  for (let k = 0; k < 8; k++) P.push(part(new THREE.IcosahedronGeometry(0.075, 0), { pos: [-w / 2 + 0.3 + k * ((w - 0.6) / 7), hA - 0.62 - (k % 2) * 0.12, d / 2 + 0.7], color: k % 3 === 0 ? '#ff4d4d' : k % 3 === 1 ? '#ffd23f' : '#f4e9d3' }));
  g.add(mesh(merge(P), M.base));
  return {
    group: g, type: 'marktstand', colors: pal,
    collide(colliders, x, z, y, yaw = 0) { return colliders.addBox(x, z, w / 2 + 0.1, d / 2 + 0.3, yaw, { group: 'props', tag: 'marktstand' }); },
  };
}

// ---- Flüsterstein: dunkler, runder Stein mit Riss-Gesicht; setActive(v) lässt ihn grau schimmern ----
export function fluesterstein(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const s = o.size || 1;
  const rock = mesh(part(new THREE.IcosahedronGeometry(0.9 * s, 1), { pos: [0, 0.6 * s, 0], scale: [1.15, 0.85, 1], jitter: 0.22 * s, seed: 400 + Math.floor(R.float(0, 100)), faceVar: 0.2, color: '#3f3a4a' }), M.base);
  g.add(rock);
  // Riss-Muster (zwei schräge Augen, ein Mundriss) leuchtet leise
  const C = [];
  C.push(part(new THREE.BoxGeometry(0.28 * s, 0.05 * s, 0.05 * s), { pos: [-0.3 * s, 0.85 * s, 0.86 * s], rot: [0, 0, 0.35], color: '#c9bff0' }));
  C.push(part(new THREE.BoxGeometry(0.28 * s, 0.05 * s, 0.05 * s), { pos: [0.3 * s, 0.85 * s, 0.86 * s], rot: [0, 0, -0.35], color: '#c9bff0' }));
  C.push(part(new THREE.BoxGeometry(0.5 * s, 0.04 * s, 0.05 * s), { pos: [0, 0.45 * s, 0.9 * s], rot: [0, 0, 0.12], color: '#c9bff0' }));
  const cracks = mesh(merge(C), M.glow('#9d8fd0', { intensity: 0.5 }), !!o.dynamic);
  g.add(cracks);
  let active = !!o.active, lvl = active ? 1 : 0, whT = 0;
  return {
    group: g, type: 'fluesterstein',
    get active() { return active; },
    setActive(v) { active = !!v; },
    update(dt, t, ctx) {
      lvl += ((active ? 1 : 0) - lvl) * Math.min(1, dt * 2);
      cracks.scale.setScalar(1 + lvl * 0.08 * (0.5 + 0.5 * Math.sin(t * 3)));
      if (ctx && ctx.particles && active && dt > 0 && ctx.near(g, 40)) {
        whT += dt;
        if (whT > 0.35) { whT = 0; const p = ctx.worldPos(g); ctx.particles.emit({ x: p.x, y: p.y + 1.1 * s, z: p.z, count: 1, spread: 0.8, speed: 0.15, up: 0.35, color: 0xb9b3cc, size: 0.5, life: 2.4, gravity: 0.05, drag: 0.5, alpha: 0.4, grow: 1.5 }); }
      }
    },
    collide(colliders, x, z) { return colliders.addCircle(x, z, 0.95 * s, { group: 'props', tag: 'fluesterstein' }); },
  };
}

// ---- Kristall: 'fakt' = fester, leuchtender Prismenkristall (türkis) · 'urteil' = hohle, matte Blase (violett) ----
export function kristall(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const kind = o.kind || 'fakt';
  const s = o.size || 1;
  if (kind === 'fakt') {
    const col = o.color || '#37e6d2';
    const P = [];
    const n = 3 + Math.floor(R.float(0, 2));
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + R.float(0, 0.6), r = i === 0 ? 0 : 0.28 * s;
      const h = (i === 0 ? 1.4 : 0.7 + R.float(0, 0.5)) * s;
      const tilt = i === 0 ? 0.1 : 0.45;
      P.push(part(new THREE.CylinderGeometry(0.16 * s, 0.24 * s, h, 6, 1), { pos: [Math.cos(a) * r, h / 2, Math.sin(a) * r], rot: [Math.sin(a) * tilt, 0, -Math.cos(a) * tilt], color: col, faceVar: 0.12 }));
      P.push(part(new THREE.ConeGeometry(0.16 * s, 0.3 * s, 6, 1), { pos: [Math.cos(a) * r + Math.sin(a) * tilt * h * 0.5 * 0, h + 0.15 * s, Math.sin(a) * r], rot: [Math.sin(a) * tilt, 0, -Math.cos(a) * tilt], color: '#e8fffb', faceVar: 0.1 }));
    }
    const m = mesh(merge(P), M.glow(col, { intensity: 0.55 }));
    g.add(m);
    g.add(mesh(part(new THREE.DodecahedronGeometry(0.42 * s, 0), { pos: [0, 0.15 * s, 0], scale: [1.4, 0.5, 1.4], jitter: 0.1, seed: 12, faceVar: 0.2, color: '#5f5a6e' }), M.base));
  } else {
    const col = o.color || '#9b5cff';
    const bubble = mesh(part(new THREE.IcosahedronGeometry(0.75 * s, 1), { pos: [0, 0.9 * s, 0], jitter: 0.08, seed: 33, faceVar: 0.12, color: col }), M.glass(col, { opacity: 0.32 }), true);
    bubble.castShadow = false;
    g.add(bubble);
    // Hohl: dünner innerer Ring zeigt die Leere
    g.add(mesh(part(new THREE.TorusGeometry(0.32 * s, 0.03 * s, 4, 12), { pos: [0, 0.9 * s, 0], rot: [Math.PI / 2, 0, 0], color: '#d9c6ff' }), M.glow('#c8b3ff', { intensity: 0.3 }), true));
  }
  let t0 = R.float(0, 6);
  return {
    group: g, type: 'kristall', kind,
    update(dt, t) { if (kind === 'urteil') { g.children[0].position.y = 0.9 * s + Math.sin(t * 1.4 + t0) * 0.08; g.children[0].rotation.y = t * 0.3; } },
    collide(colliders, x, z) { return kind === 'fakt' ? colliders.addCircle(x, z, 0.45 * s, { group: 'props', tag: 'kristall' }) : null; },
  };
}

// ---- Planke (einzeln) und Bohlenweg (Polylinie aus Planken auf Pfählen, begehbar) ----
export function planke(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const L = o.length || 2.2, w = o.width || 1.4;
  const P = [];
  const n = Math.max(2, Math.round(L / 0.42));
  for (let i = 0; i < n; i++) {
    const z = -L / 2 + (i + 0.5) * (L / n);
    P.push(part(new THREE.BoxGeometry(w, 0.1, L / n - 0.05), { pos: [(R.float(-1, 1)) * 0.02, 0.28, z], rot: [0, 0, R.float(-0.01, 0.01)], color: i % 2 ? '#8a6a48' : '#7a5a3c', faceVar: 0.1, seed: i }));
  }
  for (const sx of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.12, 0.14, L), { pos: [sx * (w / 2 - 0.15), 0.16, 0], color: '#5c4030' }));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) P.push(part(new THREE.CylinderGeometry(0.06, 0.08, 0.9, 5, 1), { pos: [sx * (w / 2 - 0.15), -0.2, sz * (L / 2 - 0.3)], color: '#4a3424' }));
  g.add(mesh(merge(P), M.base));
  return {
    group: g, type: 'planke', length: L, width: w,
    collide(colliders, x, z, y, yaw = 0) { return colliders.addSurface({ type: 'box', x, z, hw: w / 2, hd: L / 2, rot: yaw, y: y + 0.33, group: 'props', tag: 'planke', surface: 'wood' }); },
  };
}
// Bohlenweg entlang einer Polylinie [[x,z],…]: Planken folgen dem Gelände (island.getHeight), Rückgabe mit Kollider-Flächen
export function bohlenweg(o = {}, K) {
  const { M, island } = K;
  const g = new THREE.Group();
  const pts = o.pts || [[0, 0], [0, 6]];
  const w = o.width || 1.5, lift = o.lift !== undefined ? o.lift : 0.3;
  const P = [];
  const surfaces = [];
  const hAt = (x, z) => (island ? island.getHeight(x, z) : 0);
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1];
    const L = Math.hypot(bx - ax, bz - az);
    const n = Math.max(1, Math.round(L / 0.5));
    const yaw = Math.atan2(bx - ax, bz - az);
    const ux = (bx - ax) / L, uz = (bz - az) / L, sx = uz, sz = -ux;
    for (let k = 0; k < n; k++) {
      const t = (k + 0.5) / n, x = ax + (bx - ax) * t, z = az + (bz - az) * t;
      const y = Math.max(hAt(x, z), island && island.waterLevel ? island.waterLevel(x, z) : 0) + lift;
      P.push(part(new THREE.BoxGeometry(w, 0.1, L / n - 0.06), { pos: [x, y, z], rot: [0, yaw, 0], color: k % 2 ? '#8a6a48' : '#775837', faceVar: 0.12, seed: i * 50 + k }));
      if (k % 4 === 0) for (const s of [-1, 1]) {
        const px = x + sx * s * (w / 2 - 0.12), pz = z + sz * s * (w / 2 - 0.12);
        const gy = hAt(px, pz) - 0.3;
        P.push(part(new THREE.CylinderGeometry(0.06, 0.08, y - gy, 5, 1), { pos: [px, (y + gy) / 2 - 0.04, pz], color: '#4a3424' }));
      }
    }
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.1, 0.12, L), { pos: [(ax + bx) / 2 + sx * s * (w / 2 - 0.12), Math.max(hAt((ax + bx) / 2, (az + bz) / 2), 0) + lift - 0.1, (az + bz) / 2 + sz * s * (w / 2 - 0.12)], rot: [0, yaw, 0], color: '#5c4030' }));
    surfaces.push({ x: (ax + bx) / 2, z: (az + bz) / 2, hw: w / 2, hd: L / 2 + 0.2, rot: yaw, ax, az, bx, bz, ya: Math.max(hAt(ax, az), 0) + lift + 0.05, yb: Math.max(hAt(bx, bz), 0) + lift + 0.05 });
  }
  g.add(mesh(merge(P), M.base));
  // Mittelpunkt/Radius für das Distanz-Culling (die Geometrie liegt in Weltkoordinaten, die Gruppe im Ursprung)
  const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cz = pts.reduce((a, p) => a + p[1], 0) / pts.length;
  return {
    group: g, type: 'bohlenweg', pts, surfaces, center: { x: cx, z: cz }, radius: Math.max(...pts.map((p) => Math.hypot(p[0] - cx, p[1] - cz))),
    collide(colliders) {
      return surfaces.map((s) => colliders.addSurface({
        type: 'box', x: s.x, z: s.z, hw: s.hw, hd: s.hd, rot: s.rot, group: 'props', tag: 'bohlenweg', surface: 'wood',
        height: (x, z) => { const L2 = (s.bx - s.ax) ** 2 + (s.bz - s.az) ** 2 || 1; const t = Math.max(0, Math.min(1, ((x - s.ax) * (s.bx - s.ax) + (z - s.az) * (s.bz - s.az)) / L2)); return s.ya + (s.yb - s.ya) * t; },
      }));
    },
  };
}

// ---- Windrad (Lucs Bauart): Mast, Rotor mit 4 Blättern dreht sich; setWind(v) ----
export function windrad(o = {}, K) {
  const { M } = K;
  const g = new THREE.Group();
  const H = o.height || 5.5, col = o.color || '#8fa3ff';
  const P = [];
  P.push(part(new THREE.CylinderGeometry(0.09, 0.16, H, 6, 1), { pos: [0, H / 2, 0], color: '#5a5e70' }));
  for (let i = 0; i < 3; i++) { const a = (i / 3) * TAU; P.push(part(new THREE.CylinderGeometry(0.04, 0.05, 1.6, 4, 1), { pos: [Math.cos(a) * 0.55, 0.7, Math.sin(a) * 0.55], rot: [Math.sin(a) * 0.65, 0, -Math.cos(a) * 0.65], color: '#5a5e70' })); }
  P.push(part(new THREE.BoxGeometry(0.5, 0.36, 0.7), { pos: [0, H, -0.1], color: '#3b3f52' }));
  P.push(part(new THREE.BoxGeometry(0.06, 0.5, 0.9), { pos: [0, H, -0.7], color: col }));
  g.add(mesh(merge(P), M.base));
  const B = [];
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * TAU;
    B.push(part(new THREE.BoxGeometry(0.6, 2.2, 0.04, 1, 3, 1), { pos: [Math.cos(a) * 1.25, Math.sin(a) * 1.25, 0], rot: [0, 0, a - Math.PI / 2], color: i % 2 ? col : '#f4f1e8', faceVar: 0.06, deform: (v) => { const t = (v.y + 1.1) / 2.2; v.x *= 0.45 + t * 0.75; v.z += v.x * 0.2; } }));
  }
  B.push(part(new THREE.CylinderGeometry(0.18, 0.18, 0.2, 8, 1), { rot: [Math.PI / 2, 0, 0], color: '#ffd166' }));
  const rotor = mesh(merge(B), M.baseDouble, true);
  rotor.position.set(0, H, 0.42);
  g.add(rotor);
  let wind = o.wind !== undefined ? o.wind : 1, spin = 0;
  return {
    group: g, type: 'windrad', rotor,
    setWind(v) { wind = v; },
    update(dt, t) { spin += dt * (0.8 + wind * 2.2); rotor.rotation.z = spin; g.rotation.y = Math.sin(t * 0.2) * 0.05; },
    collide(colliders, x, z) { return colliders.addCircle(x, z, 0.3, { group: 'props', tag: 'windrad' }); },
  };
}

// ---- Drachen: Rauten-Drachen an einer Leine, schwankt im Wind; setWind(v); anchor = Leinenfuß ----
export function drachen(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const col = o.color || '#ff5d8f', col2 = o.color2 || '#ffd23f';
  const lineLen = o.line || 7;
  const kite = new THREE.Group();
  const P = [];
  P.push(part(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([0, 1.1, 0, -0.8, 0.2, 0, 0, -0.9, 0, 0, 1.1, 0, 0, -0.9, 0, 0.8, 0.2, 0], 3)), { color: (x, y) => (x < 0 ? col : col2) }));
  P.push(part(new THREE.BoxGeometry(0.04, 2.0, 0.04), { pos: [0, 0.1, 0.02], color: '#5c4030' }));
  P.push(part(new THREE.BoxGeometry(1.6, 0.04, 0.04), { pos: [0, 0.2, 0.02], color: '#5c4030' }));
  for (let i = 0; i < 4; i++) P.push(part(new THREE.BoxGeometry(0.22, 0.12, 0.02), { pos: [Math.sin(i * 1.7) * 0.25, -1.2 - i * 0.45, 0], rot: [0, 0, i * 0.8], color: i % 2 ? col : col2 }));
  P.push(part(new THREE.CylinderGeometry(0.012, 0.012, 2.0, 3, 1), { pos: [0, -1.9, 0], color: '#f4f1e8' }));
  kite.add(mesh(merge(P), M.baseDouble, true));
  kite.position.set(0, lineLen, 0);
  const line = mesh(part(new THREE.CylinderGeometry(0.015, 0.015, lineLen, 3, 1), { pos: [0, lineLen / 2, 0], color: '#f4f1e8' }), M.base, true);
  g.add(line, kite);
  let wind = o.wind !== undefined ? o.wind : 1;
  const ph = R.float(0, 6);
  return {
    group: g, type: 'drachen', kite,
    setWind(v) { wind = v; },
    update(dt, t) {
      const ax = Math.sin(t * 0.7 + ph) * 0.35 * wind, az = 0.55 + Math.sin(t * 0.45 + ph) * 0.2 * wind;
      const sx = Math.sin(ax) * lineLen, sz = Math.sin(az) * lineLen, sy = Math.cos(az) * Math.cos(ax) * lineLen;
      kite.position.set(sx, sy, sz);
      kite.rotation.set(-az * 0.6, Math.atan2(sx, sz), Math.sin(t * 3 + ph) * 0.15 * wind);
      line.position.set(sx / 2, sy / 2, sz / 2);
      line.lookAt(kite.position); line.rotateX(Math.PI / 2);
      line.scale.y = Math.hypot(sx, sy, sz) / lineLen;
    },
  };
}

// ---- Menhir: hoher Stein mit Runenmarken (leuchten leise); rune = Gefühlsfarbe optional ----
export function menhir(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const H = o.height || 3.4, col = o.color || '#c9bff0';
  const stone = mesh(part(new THREE.BoxGeometry(1.1, H, 0.8, 2, 5, 2), { pos: [0, H / 2 - 0.15, 0], jitter: 0.28, seed: 500 + Math.floor(R.float(0, 100)), faceVar: 0.18, color: '#5b5566', deform: (v) => { const t = (v.y + H / 2) / H; v.x *= 1 - t * 0.35; v.z *= 1 - t * 0.25; } }), M.base);
  g.add(stone);
  const Rn = [];
  const n = 3 + Math.floor(R.float(0, 3));
  for (let i = 0; i < n; i++) {
    const y = 0.6 + (i / n) * (H - 1.2), k = i % 3;
    if (k === 0) Rn.push(part(new THREE.TorusGeometry(0.14, 0.03, 4, 10), { pos: [0, y, 0.43], color: col }));
    else if (k === 1) for (let j = 0; j < 3; j++) Rn.push(part(new THREE.BoxGeometry(0.22, 0.035, 0.03), { pos: [(j % 2 ? 0.06 : -0.06), y - 0.12 + j * 0.12, 0.43], rot: [0, 0, j % 2 ? -0.7 : 0.7], color: col }));
    else Rn.push(part(new THREE.BoxGeometry(0.035, 0.36, 0.03), { pos: [0, y, 0.43], color: col }), part(new THREE.BoxGeometry(0.26, 0.035, 0.03), { pos: [0, y + 0.1, 0.43], color: col }));
  }
  g.add(mesh(merge(Rn), M.glow(col, { intensity: 0.45 })));
  return {
    group: g, type: 'menhir',
    collide(colliders, x, z) { return colliders.addCircle(x, z, 0.62, { group: 'props', tag: 'menhir' }); },
  };
}

// ---- Brandungsorgel: Felsblock mit Pfeifenfächer, Pfeifenmünder glühen mit pulse(0..1) ----
export function orgel(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const n = o.pipes || 11, W = o.width || 6;
  const P = [];
  P.push(part(new THREE.BoxGeometry(W + 1.2, 1.2, 2.6, 4, 2, 2), { pos: [0, 0.6, 0], jitter: 0.25, seed: 77, faceVar: 0.15, color: '#4f5a6e' }));
  P.push(part(new THREE.BoxGeometry(W + 0.4, 0.5, 1.4), { pos: [0, 1.45, 0.2], color: '#6b5a3c', faceVar: 0.1 }));
  const Gm = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1), x = -W / 2 + t * W;
    const h = 2.2 + 3.6 * Math.pow(Math.sin(t * Math.PI), 0.8) + (i % 2) * 0.5;
    const r = 0.16 + 0.14 * Math.sin(t * Math.PI);
    P.push(part(new THREE.CylinderGeometry(r, r * 1.08, h, 7, 1), { pos: [x, 1.7 + h / 2, 0], color: i % 3 === 0 ? '#c99a4a' : i % 3 === 1 ? '#a7803c' : '#d9b062', faceVar: 0.08 }));
    P.push(part(new THREE.ConeGeometry(r * 1.05, 0.5, 7, 1), { pos: [x, 1.7 + h + 0.2, 0], color: '#5a4a2a' }));
    Gm.push(part(new THREE.BoxGeometry(r * 1.4, 0.3, 0.06), { pos: [x, 2.35, r + 0.02], color: '#7ff0ff' }));
  }
  g.add(mesh(merge(P), M.base));
  const mouths = mesh(merge(Gm), M.glow('#7ff0ff', { intensity: 0.4 }), true);
  g.add(mouths);
  let level = 0, target = 0;
  return {
    group: g, type: 'orgel',
    pulse(v = 1) { target = Math.max(0, Math.min(1, v)); },
    update(dt, t) { level += (target - level) * Math.min(1, dt * 6); target *= Math.exp(-dt * 1.5); mouths.scale.set(1 + level * 0.25, 1 + level * 0.6, 1 + level * 2); },
    collide(colliders, x, z, y, yaw = 0) { return colliders.addBox(x, z, W / 2 + 0.6, 1.3, yaw, { group: 'props', tag: 'orgel' }); },
  };
}

// ---- Glimmer-Insel (schwebend, Neon-Pastell) und Glimmer-Kugel (Benachrichtigung); beide wippen ----
export function glimmerinsel(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const r = o.radius || 6;
  const P = [];
  P.push(part(new THREE.CylinderGeometry(r, r * 0.35, r * 0.9, 9, 3), { pos: [0, -r * 0.45, 0], jitter: r * 0.12, seed: 600 + Math.floor(R.float(0, 100)), faceVar: 0.18, color: (x, y, z, out) => out.set(y > -0.2 ? '#8fd3ff' : '#5b4a8a') }));
  P.push(part(new THREE.CylinderGeometry(r * 0.98, r, 0.3, 9, 1), { pos: [0, 0.1, 0], color: '#f0d8ff', faceVar: 0.06 }));
  // Antennenbaum + Hologramm-Tafel
  P.push(part(new THREE.CylinderGeometry(0.08, 0.14, 4.5, 5, 1), { pos: [r * 0.3, 2.4, -r * 0.2], color: '#3b3f52' }));
  for (let i = 0; i < 3; i++) P.push(part(new THREE.TorusGeometry(0.5 + i * 0.35, 0.04, 4, 12), { pos: [r * 0.3, 4.2 + i * 0.4, -r * 0.2], rot: [Math.PI / 2, 0, 0], color: '#ff8cf0' }));
  g.add(mesh(merge(P), M.base));
  const tafel = mesh(part(new THREE.BoxGeometry(2.2, 1.3, 0.06), { pos: [-r * 0.3, 1.6, 0], color: '#a0f0ff' }), M.glow('#5ad8ff', { intensity: 0.8 }));
  g.add(tafel);
  const ph = R.float(0, 6);
  return {
    group: g, type: 'glimmerinsel', radius: r,
    far: 520,
    update(dt, t) { if (!g.parent || g.parent.name.startsWith('props-bake')) return; g.position.y = (g.userData.baseY || 0) + Math.sin(t * 0.5 + ph) * 0.35; },
    collide(colliders, x, z, y) { return colliders.addSurface({ type: 'circle', x, z, r: r * 0.95, y: y + 0.25, group: 'props', tag: 'glimmerinsel', surface: 'rock' }); },
  };
}
export function glimmerkugel(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const col = o.color || '#ff3b6b';
  const core = mesh(merge([part(new THREE.IcosahedronGeometry(0.45, 1), { color: '#ffd0e0' }), part(new THREE.TorusGeometry(0.75, 0.05, 4, 16), { rot: [0.6, 0, 0.3], color: col })]), M.glow(col, { intensity: 1.0, veil: false }), true);
  g.add(core);
  const ph = R.float(0, 6);
  return {
    group: g, type: 'glimmerkugel', far: 320,
    update(dt, t) { core.scale.setScalar(1 + 0.1 * Math.sin(t * 6 + ph)); core.rotation.y = t * 0.8 + ph; g.position.y = (g.userData.baseY || 0) + Math.sin(t * 1.3 + ph) * 0.2; },
  };
}

export const TRI_BUDGET = 3000;
export { tri };

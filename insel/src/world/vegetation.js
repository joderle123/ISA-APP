// Vegetation: InstancedMesh-Pflanzen nach Zonen-Regeln (deterministisch), Wind im Vertex-Shader,
// Dichte nach Qualitätsstufe, Blöcke (Chunks) für Frustum- und Distanz-Culling, Kollision für Stämme/Felsen.
import * as THREE from 'three';
import { part, merge, frond } from './geom.js';
import { mulberry32, smoothstep } from './noise.js';
import { ZONES, SITES, FEATURES, ZONE_INDEX } from './island.js';
import { BUILDINGS, blockRadius } from './layout.js';

const CHUNK = 112;
const ZI = ZONE_INDEX;

// ---------- Modelle (Stil-Bibel §6: klare Silhouetten, runde weiche Kronen, zwei Töne je Krone, kein Jitter) ----------
const hueShift = (hex, deg) => { const c = new THREE.Color(hex); const h = {}; c.getHSL(h); return c.setHSL((h.h + deg / 360 + 1) % 1, h.s, h.l); };

function palmGeo(rnd, variant) {
  const parts = [];
  const H = variant ? 8.6 : 7.2;
  const bend = variant ? 2.4 : 1.4;
  const segs = 7;
  const curve = (t) => new THREE.Vector3(bend * t * t, H * t, 0);
  // Stamm mit Ringen (Vertex-Bänder alle 0.5 m ±5 %)
  const barkA = new THREE.Color('#8e6c46'), barkB = new THREE.Color('#76583a');
  for (let i = 0; i < segs; i++) {
    const t0 = i / segs, t1 = (i + 1) / segs;
    const p0 = curve(t0), p1 = curve(t1);
    const len = p0.distanceTo(p1) * 1.04;
    const r0 = 0.36 - 0.16 * t0, r1 = 0.36 - 0.16 * t1;
    const ang = -Math.atan2(p1.x - p0.x, p1.y - p0.y);
    parts.push(part(new THREE.CylinderGeometry(r1, r0 + 0.04, len, 7, 1, true), {
      pos: [(p0.x + p1.x) / 2, (p0.y + p1.y) / 2, 0], rot: [0, 0, ang], smooth: true,
      color: (x, y, z, out) => out.copy(Math.sin(y * 12.5) > 0.2 ? barkA : barkB),
      wind: (x, y) => Math.pow(Math.max(0, y) / H, 2) * 0.22,
    }));
  }
  const top = curve(1);
  const n = 9;
  for (let k = 0; k < n; k++) {
    const phi = (k / n) * Math.PI * 2 + rnd() * 0.4;
    const L = 3.4 + rnd() * 1.1;
    const lift = 0.45 + rnd() * 0.2;
    parts.push(frond({
      spine: (t) => new THREE.Vector3(top.x + Math.cos(phi) * L * t, top.y + L * (lift * t - 0.85 * t * t) - (t > 0.85 ? (t - 0.85) * 1.2 : 0), Math.sin(phi) * L * t),
      width: (t) => 0.66 * Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.05 + 0.02)), 0.7),
      segments: 6, fold: 0.3,
      color: '#2c8f45', tipColor: '#96e05a',
      wind: (t) => 0.3 + t * 0.7, leaf: 1,
    }));
  }
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * Math.PI * 2;
    parts.push(part(new THREE.SphereGeometry(0.24, 6, 5), { pos: [top.x + Math.cos(a) * 0.28, top.y - 0.3, Math.sin(a) * 0.28], color: '#6b4a2a', wind: 0.25, smooth: true }));
  }
  return merge(parts);
}

function canopyColor(light, dark, y0, y1) {
  const a = new THREE.Color(light), b = new THREE.Color(dark);
  return (x, y, z, out) => out.copy(b).lerp(a, smoothstep(y0, y1, y));
}
// Runde Krone aus großen weichen Loben, je Lobe Farbton ±4°
// (Stil-Bibel §6/§14: Kugeln (r, 12, 9), die erste Lobe der Liste ist die Mitte (1,3×), Randloben rücken 0,3 m nach innen,
// damit die Loben zu EINER Silhouette verschmelzen statt zu „Traubenballons“)
function lobes(parts, list, light, dark, y0, y1, wind, seedBase = 0, segW = 12, segH = 9, mergeIn = 0.3) {
  list.forEach((b, i) => {
    const deg = ((seedBase + i) % 3 - 1) * 4;
    const cf = canopyColor(hueShift(light, deg), hueShift(dark, deg), y0, y1);
    let [x, y, z, r] = b;
    if (i === 0) r *= 1.3;
    else if (mergeIn > 0) { const d = Math.hypot(x, z) || 1; const k = Math.max(0, d - mergeIn) / d; x *= k; z *= k; }
    parts.push(part(new THREE.SphereGeometry(r, segW, segH), { pos: [x, y, z], scale: [1, 0.86, 1], smooth: true, leaf: 1, color: cf, wind }));
  });
}

function broadleafGeo(rnd, blossom) {
  const parts = [];
  const h = 3.0 + rnd() * 0.8;
  // Stamm 6-eckig mit leichter Verjüngung und Wurzelansatz
  parts.push(part(new THREE.CylinderGeometry(0.2, 0.3, h, 6, 1), { pos: [0, h / 2, 0], color: '#7a5638', wind: (x, y) => (y / h) * 0.05 }));
  parts.push(part(new THREE.CylinderGeometry(0.3, 0.44, 0.35, 6, 1), { pos: [0, 0.17, 0], color: '#6e4c30' }));
  parts.push(part(new THREE.CylinderGeometry(0.08, 0.14, 1.6, 5, 1), { pos: [0.55, h - 0.1, 0], rot: [0, 0, -0.9], color: '#7a5638', wind: 0.08 }));
  parts.push(part(new THREE.CylinderGeometry(0.08, 0.14, 1.4, 5, 1), { pos: [-0.45, h - 0.3, 0.2], rot: [0.3, 0, 0.9], color: '#7a5638', wind: 0.08 }));
  const list = [[0, h + 1.6, 0, 1.75], [1.35, h + 0.95, 0.4, 1.5], [-1.25, h + 1.05, -0.3, 1.55], [0.2, h + 2.7, -0.4, 1.35], [-0.3, h + 0.85, 1.15, 1.35]];
  // zwei Töne: dunkles Band unten (bis ≈ 0,55 der Kronenhöhe), oben hell
  if (blossom) lobes(parts, list, '#ffc2dc', '#f06a9c', h + 0.7, h + 2.2, (x, y) => 0.12 + Math.max(0, y - h) * 0.05, 2);
  else lobes(parts, list, '#9ade5a', '#3b8a3e', h + 0.7, h + 2.2, (x, y) => 0.12 + Math.max(0, y - h) * 0.05, Math.floor(rnd() * 3));
  return merge(parts);
}

function jungleGeo(rnd) {
  const parts = [];
  const h = 6.2 + rnd() * 1.6;
  parts.push(part(new THREE.CylinderGeometry(0.34, 0.55, h, 7, 3), { pos: [0, h / 2, 0], color: '#8a6a4c', smooth: true, wind: (x, y) => (y / h) ** 2 * 0.06, deform: (v) => { v.x += Math.sin(v.y * 0.4) * 0.25; } }));
  // Brettwurzeln
  for (let k = 0; k < 4; k++) {
    const a = (k / 4) * Math.PI * 2 + 0.4;
    parts.push(part(new THREE.ConeGeometry(0.55, 1.8, 3, 1), { pos: [Math.cos(a) * 0.5, 0.65, Math.sin(a) * 0.5], rot: [Math.sin(a) * 0.5, -a, -Math.cos(a) * 0.5], scale: [0.35, 1, 1.2], color: '#7a5c40' }));
  }
  // Krone in zwei Etagen
  const list = [[0, h + 1.1, 0, 2.5], [0.3, h + 2.8, -0.2, 2.1]];
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2 + rnd() * 0.5;
    list.push([Math.cos(a) * 2.5, h - 0.2 + rnd() * 0.8, Math.sin(a) * 2.5, 1.8 + rnd() * 0.5]);
  }
  lobes(parts, list, '#6fd35a', '#1d6e33', h - 0.6, h + 1.6, 0.12, Math.floor(rnd() * 3));
  // Lianen als Bänder mit zwei Tönen
  for (let k = 0; k < 6; k++) {
    const a = rnd() * Math.PI * 2, r = 1.6 + rnd() * 1.8, L = 1.8 + rnd() * 2.6;
    parts.push(part(new THREE.BoxGeometry(0.09, L, 0.05), { pos: [Math.cos(a) * r, h - L / 2 - 0.2, Math.sin(a) * r], color: k % 2 ? '#2d6b2e' : '#3f8a3a', wind: (x, y) => 0.25 + (h - y) * 0.1 }));
  }
  return merge(parts);
}

function pineGeo(rnd) {
  const parts = [];
  parts.push(part(new THREE.CylinderGeometry(0.16, 0.26, 2.2, 6, 1), { pos: [0, 1.1, 0], color: '#6d4c34' }));
  const tiers = [[2.3, 2.6, 2.0], [1.85, 2.4, 3.4], [1.35, 2.2, 4.7], [0.85, 1.9, 5.9]];
  tiers.forEach(([r, hh, y], i) => {
    parts.push(part(new THREE.ConeGeometry(r, hh, 9, 1), {
      pos: [0, y, 0], smooth: true, leaf: 1,
      color: canopyColor('#4fa06a', '#255e45', y - hh / 2, y + hh / 2), wind: (x, yy) => Math.max(0, yy - 1.5) * 0.02,
    }));
  });
  return merge(parts);
}

function bushGeo(rnd, flowering) {
  const parts = [];
  const list = [[0, 0.55, 0, 0.72], [0.7, 0.45, 0.2, 0.66], [-0.6, 0.42, -0.2, 0.7]];
  lobes(parts, list, '#7fcf52', '#3a9140', 0.2, 0.9, (x, y) => y * 0.12, Math.floor(rnd() * 3), 9, 7, 0.15);
  if (flowering) {
    const cols = ['#ff5d8f', '#ffd23f', '#ffffff', '#ff8c42'];
    const c = cols[Math.floor(rnd() * cols.length)];
    for (let k = 0; k < 7; k++) {
      const a = rnd() * Math.PI * 2, r = 0.3 + rnd() * 0.6;
      parts.push(part(new THREE.SphereGeometry(0.13, 6, 5), { pos: [Math.cos(a) * r, 0.8 + rnd() * 0.45, Math.sin(a) * r], color: c, wind: 0.15, smooth: true }));
    }
  }
  return merge(parts);
}

function fernGeo(rnd) {
  const parts = [];
  for (let k = 0; k < 7; k++) {
    const phi = (k / 7) * Math.PI * 2 + rnd() * 0.5;
    const L = 1.2 + rnd() * 0.5;
    parts.push(frond({
      spine: (t) => new THREE.Vector3(Math.cos(phi) * L * t, L * (1.0 * t - 0.8 * t * t) + 0.05, Math.sin(phi) * L * t),
      width: (t) => 0.26 * Math.sin(Math.PI * Math.min(1, t + 0.05)),
      segments: 4, fold: 0.2, color: '#1f7a34', tipColor: '#79d253', wind: (t) => t * 0.6, leaf: 1,
    }));
  }
  return merge(parts);
}

// Blumen: runde Punkte (Ø 0.14 m) auf Stiel – sparsam gebaut (≈ 25 Dreiecke je Blume)
function flowersGeo(rnd, palette) {
  const parts = [];
  const stem = '#3f8f3a', mid = new THREE.Color('#ffe14d');
  for (let k = 0; k < 5; k++) {
    const a = rnd() * Math.PI * 2, r = rnd() * 0.45;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const h = 0.28 + rnd() * 0.32;
    parts.push(part(new THREE.CylinderGeometry(0.012, 0.018, h, 3, 1, true), { pos: [x, h / 2, z], color: stem, wind: (px, py) => py / h * 0.6 }));
    const c = new THREE.Color(palette[Math.floor(rnd() * palette.length)]);
    parts.push(part(new THREE.SphereGeometry(0.07 + rnd() * 0.02, 5, 4), {
      pos: [x, h + 0.04, z], scale: [1, 0.7, 1], wind: 0.6, smooth: true,
      color: (px, py, pz, out) => out.copy(py > h + 0.075 ? mid : c),
    }));
  }
  return merge(parts);
}

// Gras (§6): zwei gekreuzte Karten je Instanz, jede Karte ein Büschel aus drei gefächerten Halmen (6 Dreiecke je Instanz),
// Normale nach oben (kein Shading, nur Verlauf): Basis ≈ Bodenfarbe (verwächst mit der Wiese), Spitze +25 % Luminanz.
// Die gefächerte Silhouette liest sich als Grasbüschel, nicht als einzelnes Blatt.
function grassGeo(rnd) {
  const pos = [], col = [], wind = [], leaf = [];
  const h = 0.52 + rnd() * 0.3, lean = (rnd() - 0.5) * 0.25;
  const push = (x, y, z, c, wv) => { pos.push(x, y, z); col.push(c, c, c); wind.push(wv); leaf.push(0.6); };
  for (const a of [0, Math.PI / 2]) {
    const ux = Math.cos(a), uz = Math.sin(a);                // Kartenrichtung (seitlich)
    const tx = Math.cos(a + Math.PI / 2) * lean, tz = Math.sin(a + Math.PI / 2) * lean;   // Neigung aus der Karte heraus
    // drei Halme: Fußpunkte eng beieinander, Spitzen gefächert (links, Mitte, rechts), mittlerer Halm am höchsten
    const blades = [[-0.08, -0.3, 0.8], [0.0, 0.03, 1.0], [0.09, 0.32, 0.86]];
    for (const [fx, sx, hf] of blades) {
      const bw = 0.075, bh = h * hf;
      const fr = 0.34;   // Höhe der breitesten Stelle
      // Dreieck-Streifen: Fuß (schmal) → breiteste Stelle → Spitze
      const p0 = [[(fx - bw * 0.5) * ux, 0, (fx - bw * 0.5) * uz, 0.82, 0], [(fx + bw * 0.5) * ux, 0, (fx + bw * 0.5) * uz, 0.82, 0]];
      const mx = fx + sx * fr, my = bh * fr;
      const p1 = [[(mx - bw * 0.85) * ux + tx * fr * fr, my, (mx - bw * 0.85) * uz + tz * fr * fr, 0.96, fr], [(mx + bw * 0.85) * ux + tx * fr * fr, my, (mx + bw * 0.85) * uz + tz * fr * fr, 0.96, fr]];
      const tipx = fx + sx;
      const tip = [tipx * ux + tx, bh, tipx * uz + tz, 1.18, 1];
      for (const q of [p0[0], p0[1], p1[0], p0[1], p1[1], p1[0], p1[0], p1[1], tip]) push(q[0], q[1], q[2], q[3], q[4]);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const nr = new Float32Array(pos.length);
  for (let i = 0; i < nr.length; i += 3) { nr[i] = 0; nr[i + 1] = 1; nr[i + 2] = 0; }
  g.setAttribute('normal', new THREE.BufferAttribute(nr, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('aWind', new THREE.Float32BufferAttribute(wind, 1));
  g.setAttribute('aLeaf', new THREE.Float32BufferAttribute(leaf, 1));
  return g;
}

function rockGeo(rnd, big) {
  const parts = [];
  if (big) {
    parts.push(part(new THREE.IcosahedronGeometry(1, 1), {
      scale: [1.3, 0.85, 1.1], jitter: 0.3, seed: 90 + Math.floor(rnd() * 50), faceVar: 0.12,
      color: (x, y, z, out) => out.set(y > 0.55 ? '#7fa64f' : '#b2a79c'),
    }));
  } else {
    parts.push(part(new THREE.DodecahedronGeometry(0.6, 0), { scale: [1.2, 0.65, 1], jitter: 0.22, seed: 120 + Math.floor(rnd() * 50), faceVar: 0.12, color: '#b5aca2' }));
    parts.push(part(new THREE.DodecahedronGeometry(0.35, 0), { pos: [0.6, 0, 0.3], scale: [1, 0.7, 1], jitter: 0.12, seed: 7, faceVar: 0.12, color: '#a39a90' }));
  }
  return merge(parts);
}

// ---------- Neue Arten (WP11): Schilf, Moorbirke, Heide, Mangrove ----------
function reedGeo(rnd) {
  const pos = [], col = [], wind = [];
  const stem = new THREE.Color('#86a84e'), stemDry = new THREE.Color('#c9b96e'), head = new THREE.Color('#7a5a3a');
  const push = (x, y, z, c, w) => { pos.push(x, y, z); col.push(c.r, c.g, c.b); wind.push(w); };
  const n = 9;
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2 + rnd() * 0.7, r = rnd() * 0.3;
    const bx = Math.cos(a) * r, bz = Math.sin(a) * r;
    const h = 1.3 + rnd() * 0.9;
    const lean = 0.1 + rnd() * 0.25;
    const w = 0.035 + rnd() * 0.02;
    const px = -Math.sin(a) * w, pz = Math.cos(a) * w;
    const tx = bx + Math.cos(a) * lean, tz = bz + Math.sin(a) * lean;
    const c = rnd() < 0.35 ? stemDry : stem;
    push(bx - px, 0, bz - pz, c, 0); push(bx + px, 0, bz + pz, c, 0); push(tx, h, tz, c, 1);
    push(bx - pz, 0, bz + px, c, 0); push(bx + pz, 0, bz - px, c, 0); push(tx, h, tz, c, 1);
    if (rnd() < 0.6) {
      const y0 = h - 0.28, y1 = h - 0.02, R = 0.035;
      for (let f = 0; f < 3; f++) {
        const a0 = (f / 3) * Math.PI * 2, a1 = ((f + 1) / 3) * Math.PI * 2;
        const x0 = tx + Math.cos(a0) * R, z0 = tz + Math.sin(a0) * R, x1 = tx + Math.cos(a1) * R, z1 = tz + Math.sin(a1) * R;
        push(x0, y0, z0, head, 0.85); push(x1, y0, z1, head, 0.85); push(x0, y1, z0, head, 1);
        push(x1, y0, z1, head, 0.85); push(x1, y1, z1, head, 1); push(x0, y1, z0, head, 1);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const nr = new Float32Array(pos.length);
  for (let i = 0; i < nr.length; i += 3) { nr[i] = 0; nr[i + 1] = 1; nr[i + 2] = 0; }
  g.setAttribute('normal', new THREE.BufferAttribute(nr, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('aWind', new THREE.Float32BufferAttribute(wind.map((w) => w * 0.7), 1));
  return g;
}

function birchGeo(rnd) {
  const parts = [];
  const h = 5.2 + rnd() * 1.6;
  const bark = (x, y, z, out) => { const band = Math.sin(y * 9.0 + x * 20.0) > 0.72; out.set(band ? '#2b2b2b' : '#f2f0e8'); };
  parts.push(part(new THREE.CylinderGeometry(0.11, 0.2, h, 6, 6), { pos: [0, h / 2, 0], color: bark, smooth: true, wind: (x, y) => (y / h) ** 2 * 0.08, deform: (v) => { v.x += Math.sin(v.y * 0.7) * 0.18; } }));
  for (let k = 0; k < 4; k++) {
    const a = (k / 4) * Math.PI * 2 + rnd() * 0.8, y = h * (0.55 + k * 0.1);
    parts.push(part(new THREE.CylinderGeometry(0.03, 0.06, 1.6, 4, 1), { pos: [Math.cos(a) * 0.7, y, Math.sin(a) * 0.7], rot: [Math.sin(a) * 1.0, 0, -Math.cos(a) * 1.0], color: '#3a3a3a', wind: 0.15 }));
  }
  const list = [];
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2 + rnd() * 0.6, r = 0.9 + rnd() * 0.5;
    list.push([Math.cos(a) * r, h * 0.72 + rnd() * 1.3, Math.sin(a) * r, 1.1 + rnd() * 0.35]);
  }
  list.push([0, h + 0.6, 0, 1.25]);
  lobes(parts, list, '#d9e46a', '#7fa63e', h * 0.5, h + 1.5, 0.24, Math.floor(rnd() * 3));
  return merge(parts);
}

// Heide: graugrüner Zwergstrauch, lila Blüten als runde Punkte mit aWind ≥ 0.95 (wachsen mit uBloom: schleierabhängig)
function heatherGeo(rnd) {
  const parts = [];
  const list = [[0, 0.22, 0, 0.44], [0.36, 0.18, 0.12, 0.32], [-0.32, 0.16, -0.14, 0.34]];
  lobes(parts, list, '#8ea86c', '#5c7448', 0, 0.5, (x, y) => y * 0.15, Math.floor(rnd() * 3));
  const cols = ['#b48cff', '#c99cff', '#9d6bd8', '#e0b8ff'];
  for (let k = 0; k < 9; k++) {
    const a = rnd() * Math.PI * 2, r = rnd() * 0.5;
    const y = 0.38 + rnd() * 0.22;
    parts.push(part(new THREE.SphereGeometry(0.075, 4, 3), { pos: [Math.cos(a) * r, y, Math.sin(a) * r], color: cols[k % cols.length], wind: 0.97, smooth: true }));
  }
  return merge(parts);
}

// Mangrovenstrauch: dickere Stelzwurzeln im Flachwasser, dichte dunkelgrüne Krone (Kollider-Tag 'mangrove': kletterbar markiert)
function mangroveGeo(rnd) {
  const parts = [];
  const h = 3.2 + rnd() * 1.2;
  parts.push(part(new THREE.CylinderGeometry(0.16, 0.22, h * 0.6, 6, 1), { pos: [0, h * 0.7, 0], color: '#5c3d2a', wind: 0.05 }));
  for (let k = 0; k < 7; k++) {
    const a = (k / 7) * Math.PI * 2 + rnd() * 0.5, L = 1.4 + rnd() * 0.8;
    parts.push(part(new THREE.CylinderGeometry(0.07, 0.14, L, 5, 1), { pos: [Math.sin(a) * L * 0.4, h * 0.4 - L * 0.32, Math.cos(a) * L * 0.4], rot: [Math.cos(a) * 0.62, 0, -Math.sin(a) * 0.62], color: '#4a3021' }));
    parts.push(part(new THREE.CylinderGeometry(0.05, 0.08, L * 0.7, 5, 1), { pos: [Math.sin(a + 0.3) * L * 0.55, L * 0.3, Math.cos(a + 0.3) * L * 0.55], rot: [Math.cos(a + 0.3) * 0.35, 0, -Math.sin(a + 0.3) * 0.35], color: '#4a3021' }));
  }
  const list = [];
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2 + rnd() * 0.5, r = 1.1 + rnd() * 0.5;
    list.push([Math.cos(a) * r, h + 0.2 + rnd() * 0.6, Math.sin(a) * r, 1.2 + rnd() * 0.3]);
  }
  list.push([0, h + 1.1, 0, 1.5]);
  lobes(parts, list, '#4fae55', '#1f6a34', h * 0.7, h + 2.2, 0.14, Math.floor(rnd() * 3));
  return merge(parts);
}

function driftwoodGeo() {
  const parts = [];
  parts.push(part(new THREE.CylinderGeometry(0.1, 0.14, 2.4, 6, 2), { rot: [0, 0, Math.PI / 2], pos: [0, 0.1, 0], color: '#d8c2a2', smooth: true }));
  parts.push(part(new THREE.CylinderGeometry(0.05, 0.08, 0.8, 5, 1), { rot: [0.5, 0, 1.1], pos: [0.5, 0.25, 0.15], color: '#cdb596' }));
  return merge(parts);
}

function shellsGeo(rnd) {
  const parts = [];
  // Seestern
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2;
    parts.push(part(new THREE.ConeGeometry(0.07, 0.28, 3, 1), { pos: [Math.cos(a) * 0.13, 0.03, Math.sin(a) * 0.13], rot: [0, -a, -Math.PI / 2], order: 'YXZ', color: '#ff7a45' }));
  }
  const cols = ['#ffd6e6', '#fff1dc', '#ffc2a8'];
  for (let k = 0; k < 3; k++) {
    parts.push(part(new THREE.SphereGeometry(0.1, 7, 5), { pos: [0.5 + rnd() * 0.4, 0.04, (rnd() - 0.5) * 0.8], scale: [1, 0.5, 1.2], rot: [0, rnd() * 3, 0], color: cols[k], smooth: true }));
  }
  return merge(parts);
}

// ---------- Material mit Wind ----------
function windMaterial(veil, { fade = false, bloom = false } = {}) {
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
  const u = {
    uWindDir: { value: new THREE.Vector2(0.8, 0.6).normalize() },
    uWindStrength: { value: 1 },
    uFadeFar: { value: 100 },
    uBloom: { value: 1 },
  };
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
attribute float aWind;
uniform float uLumoTime;
uniform vec2 uWindDir;
uniform float uWindStrength;
uniform float uFadeFar;
uniform float uBloom;
varying float vGrassTip;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
{
  vGrassTip = aWind;
  ${bloom ? 'transformed *= mix(1.0, uBloom, step(0.94, aWind));' : ''}
  vec3 ip = vec3(0.0);
  #ifdef USE_INSTANCING
    ip = instanceMatrix[3].xyz;
  #endif
  float gust = 0.55 + 0.45 * sin(dot(ip.xz, uWindDir) * 0.05 - uLumoTime * 1.2);
  float ph = ip.x * 0.37 + ip.z * 0.23;
  float sway = (0.6 + 0.4 * sin(uLumoTime * 1.7 + ph)) * gust * uWindStrength;
  float flutter = sin(uLumoTime * 5.5 + ph * 3.0 + position.x * 2.3 + position.z * 1.9) * 0.1 * uWindStrength;
  vec3 wdir = vec3(uWindDir.x, 0.0, uWindDir.y);
  #ifdef USE_INSTANCING
    mat3 im = mat3(instanceMatrix);
    wdir = (transpose(im) * wdir) / max(dot(im[0], im[0]), 0.0001);
  #endif
  transformed += wdir * aWind * (sway * 0.5 + flutter) + vec3(0.0, -aWind * sway * 0.06 + aWind * flutter * 0.3, 0.0);
  ${fade ? `
  #ifdef USE_INSTANCING
    float fd = distance((modelMatrix * vec4(ip, 1.0)).xz, cameraPosition.xz);
    transformed *= 1.0 - smoothstep(uFadeFar * 0.72, uFadeFar, fd);
  #endif` : ''}
}`);
  };
  mat.userData.__lumoKey = (fade ? 'windF' : 'wind') + (bloom ? 'B' : '');
  mat.customProgramCacheKey = () => mat.userData.__lumoKey;
  // Im Schleier werden helle Halmspitzen (×1.18) zu weißen Kritzeln (Duotone hebt Lichter): dort auf Boden × 1.05 deckeln
  veil.patch(mat, {
    key: (fade ? 'vegF' : 'veg') + (bloom ? 'B' : ''),
    fragmentPars: 'varying float vGrassTip;\n',
    afterVeil: 'outgoingLight *= mix(1.0, 0.88, gLumoVeil * vGrassTip);\n',
  });
  mat.userData.wind = u;
  return mat;
}

// ---------- Aufbau ----------
export function createVegetation({ island, veil, colliders, quality, scene }) {
  const rnd = mulberry32(4242);
  const matTree = windMaterial(veil);
  const matSmall = windMaterial(veil, { fade: true });
  const matBloom = windMaterial(veil, { fade: true, bloom: true });
  matSmall.userData.wind.uFadeFar.value = quality.grassDistance;
  matBloom.userData.wind.uFadeFar.value = quality.grassDistance * 1.3;

  const flowerPalA = ['#ff5d8f', '#ffd23f', '#ffffff', '#ff8c42'];
  const flowerPalB = ['#b17dff', '#6ec6ff', '#ffffff', '#ff5d8f'];
  const SPECIES = {
    palm: { geos: [palmGeo(rnd, 0), palmGeo(rnd, 1)], mat: matTree, shadow: true, collide: 0.42, trunk: 7, crown: [3.2, 6.2, 9.2], kind: 'tree' },
    tree: { geos: [broadleafGeo(rnd, false), broadleafGeo(rnd, false)], mat: matTree, shadow: true, collide: 0.45, trunk: 3.4, crown: [2.7, 2.8, 7.2], kind: 'tree' },
    blossom: { geos: [broadleafGeo(rnd, true)], mat: matTree, shadow: true, collide: 0.45, trunk: 3.4, crown: [2.7, 2.8, 7.2], kind: 'tree' },
    jungle: { geos: [jungleGeo(rnd), jungleGeo(rnd)], mat: matTree, shadow: true, collide: 0.75, trunk: 6.5, crown: [4.2, 5.4, 11], kind: 'tree' },
    pine: { geos: [pineGeo(rnd), pineGeo(rnd)], mat: matTree, shadow: true, collide: 0.4, trunk: 2.2, crown: [2.3, 0.9, 7.6], kind: 'tree' },
    bush: { geos: [bushGeo(rnd, false), bushGeo(rnd, true)], mat: matTree, kind: 'small', far: 1.8 },
    fern: { geos: [fernGeo(rnd)], mat: matSmall, kind: 'small', far: 1.2 },
    flowers: { geos: [flowersGeo(rnd, flowerPalA), flowersGeo(rnd, flowerPalB)], mat: matSmall, kind: 'small', far: 1.0 },
    grass: { geos: [grassGeo(rnd), grassGeo(rnd)], mat: matSmall, kind: 'small', far: 1.0 },
    rock: { geos: [rockGeo(rnd, false)], mat: matTree, kind: 'small', far: 2.2 },
    boulder: { geos: [rockGeo(rnd, true)], mat: matTree, shadow: true, kind: 'tree', collideRock: true },
    driftwood: { geos: [driftwoodGeo()], mat: matTree, kind: 'small', far: 1.2 },
    shells: { geos: [shellsGeo(rnd)], mat: matSmall, kind: 'small', far: 0.7 },
    // WP11: Schilf an Gewässern, Moorbirke und Heide im Moor, Mangroven in der Lagune
    reed: { geos: [reedGeo(rnd), reedGeo(rnd)], mat: matSmall, kind: 'small', far: 1.3 },
    birch: { geos: [birchGeo(rnd), birchGeo(rnd)], mat: matTree, shadow: true, collide: 0.22, trunk: 5.5, crown: [1.8, 3.4, 7.4], kind: 'tree' },
    heather: { geos: [heatherGeo(rnd), heatherGeo(rnd)], mat: matBloom, kind: 'small', far: 1.6 },
    mangrove: { geos: [mangroveGeo(rnd), mangroveGeo(rnd)], mat: matTree, shadow: true, collide: 0.5, trunk: 3.2, crown: [2.4, 2.8, 6.2], kind: 'tree', tag: 'mangrove' },
  };

  // Standort-Infos
  const zw = new Float32Array(ZONES.length);
  const _n = { x: 0, y: 1, z: 0 };
  const padSites = Object.values(SITES).filter((s) => s.r > 0);
  const pool = FEATURES.pool, vol = FEATURES.volcano, L = FEATURES.lighthouse, dock = FEATURES.dock;
  const waterBodies = island.water ? island.water.bodies : [{ x: pool.x, z: pool.z, r: pool.r }];
  // Abstand zum Rand des nächsten stehenden Gewässers (negativ = drin); Lagune zählt als Ring um die Wurzelinsel
  function waterEdge(x, z) {
    let best = Infinity;
    for (const b of waterBodies) {
      let d;
      if (b.sea) { const dl = Math.hypot(x - b.x, z - b.z); d = dl < b.r ? Math.max(dl - (b.r - 3.5), (FEATURES.lagoon.inner + 2.5) - dl) : dl - b.r; }
      else d = Math.hypot(x - b.x, z - b.z) - b.r;
      if (d < best) best = d;
    }
    return best;
  }
  function blocked(x, z, extra = 0) {
    for (const s of padSites) if (Math.hypot(x - s.x, z - s.z) < s.r + 1.5 + extra) return true;
    for (const b of BUILDINGS) if (Math.hypot(x - b.x, z - b.z) < blockRadius(b) + 1.2 + extra) return true;
    for (const b of waterBodies) if (Math.hypot(x - b.x, z - b.z) < b.r + 1.2 + extra) return true;
    if (Math.hypot(x - L.x, z - L.z) < 7 + extra) return true;
    if (Math.abs(x - dock.x) < 4 + extra && z > dock.z0 - 6 && z < dock.z1 + 2) return true;
    if (Math.hypot(x - vol.x, z - vol.z) < vol.rimRadius + 1) return true;
    const sp = island.spawn;
    if (Math.hypot(x - sp.x, z - sp.z) < 6) return true;
    return false;
  }
  function info(x, z) {
    const h = island.getHeight(x, z);
    const n = island.getNormal(x, z, true, _n);
    const s = island.surfaceAt(x, z, h, n.y);
    island.zoneWeights(x, z, zw);
    return { h, ny: n.y, s, zw, path: island.pathWeight(x, z) };
  }
  const nForest = (x, z) => island.noise.detail(x / 48 + 11, z / 48 - 7);

  const placed = {};
  Object.keys(SPECIES).forEach((k) => { placed[k] = []; });
  const grassTint = new THREE.Color();
  const GRASS_TINT = {
    hafen: '#98dc5a', strand: '#c2e066', dschungel: '#4fb04a', klippen: '#93b86c', markt: '#d2e26a', vulkan: '#a3bf5c', leuchtturm: '#ade06a', moor: '#a8a850', wild: '#96d657',
  };
  const gtc = Object.fromEntries(Object.entries(GRASS_TINT).map(([k, v]) => [k, new THREE.Color(v)]));

  function scatter(spacing, fn) {
    const R = 205;
    for (let z = -R; z < R; z += spacing) for (let x = -R; x < R; x += spacing) {
      const px = x + (rnd() - 0.5) * spacing * 0.95, pz = z + (rnd() - 0.5) * spacing * 0.95;
      const r0 = rnd();
      if (Math.hypot(px, pz) > 200) continue;
      fn(px, pz, r0);
    }
  }
  const add = (sp, x, z, o = {}) => placed[sp].push({ x, z, rot: o.rot !== undefined ? o.rot : rnd() * Math.PI * 2, s: o.s || 1, v: o.v !== undefined ? o.v : Math.floor(rnd() * SPECIES[sp].geos.length), tint: o.tint, sink: o.sink || 0, tilt: o.tilt || 0 });

  // Palmen
  scatter(5.5, (x, z, r) => {
    const I = info(x, z);
    if (I.h < 0.6 || I.h > 9 || I.ny < 0.82 || I.path > 0.2 || blocked(x, z, 1)) return;
    const D = island.coastDist(x, z);
    let p = 0;
    if (I.s === 'sand' || I.s === 'grass') {
      p = 0.5 * zw[ZI.strand] + 0.22 * zw[ZI.hafen] * (D < 26 ? 1 : 0.3) + 0.25 * zw[ZI.leuchtturm] + (D > 2 && D < 22 ? 0.12 : 0.02) + 0.1 * zw[ZI.dschungel];
      if (D < 1.5) p *= 0.3;
    }
    if (r < p) add('palm', x, z, { s: 0.85 + rnd() * 0.35, tilt: 0.05 });
  });
  // Laubbäume + Blütenbäume
  scatter(7.5, (x, z, r) => {
    const I = info(x, z);
    if (I.s !== 'grass' || I.h < 2.5 || I.ny < 0.8 || I.path > 0.1 || blocked(x, z, 2)) return;
    const f = smoothstep(-0.1, 0.45, nForest(x, z));
    const p = (0.08 + 0.35 * f) * (1 - zw[ZI.dschungel]) * (1 - zw[ZI.klippen] * 0.7) * (1 - zw[ZI.strand] * 0.6) + 0.1 * zw[ZI.markt];
    if (r < p) {
      const bl = (zw[ZI.hafen] + zw[ZI.markt]) * 0.35 + 0.05;
      add(rnd() < bl ? 'blossom' : 'tree', x, z, { s: 0.8 + rnd() * 0.45 });
    }
  });
  // Dschungelriesen
  scatter(5.2, (x, z, r) => {
    const I = info(x, z);
    if (I.s !== 'grass' || I.ny < 0.78 || I.path > 0.15 || blocked(x, z, 2)) return;
    const p = 0.75 * smoothstep(0.25, 0.7, zw[ZI.dschungel]) + 0.05;
    if (r < p * (zw[ZI.dschungel] > 0.1 ? 1 : 0)) add('jungle', x, z, { s: 0.75 + rnd() * 0.5 });
  });
  // Kiefern auf den Klippen und am Vulkan
  scatter(6, (x, z, r) => {
    const I = info(x, z);
    if ((I.s !== 'grass' && I.s !== 'rock') || I.ny < 0.76 || I.path > 0.15 || blocked(x, z, 1)) return;
    const p = 0.45 * zw[ZI.klippen] + 0.28 * zw[ZI.vulkan] * smoothstep(8, 16, I.h) * (1 - smoothstep(24, 30, I.h)) + 0.05 * smoothstep(12, 20, I.h);
    if (r < p) add('pine', x, z, { s: 0.75 + rnd() * 0.5 });
  });
  // Büsche
  scatter(4, (x, z, r) => {
    const I = info(x, z);
    if (I.s !== 'grass' || I.ny < 0.75 || I.path > 0.3 || blocked(x, z)) return;
    const p = 0.08 + 0.25 * smoothstep(0, 0.5, nForest(x, z)) + 0.35 * zw[ZI.dschungel];
    if (r < p) add('bush', x, z, { s: 0.7 + rnd() * 0.6, v: rnd() < 0.3 + 0.3 * (zw[ZI.hafen] + zw[ZI.markt]) ? 1 : 0 });
  });
  // Farne
  scatter(2.4, (x, z, r) => {
    if (r > 0.7) return;
    const I = info(x, z);
    if (I.s !== 'grass' || I.path > 0.3 || blocked(x, z)) return;
    if (r < 0.65 * zw[ZI.dschungel]) add('fern', x, z, { s: 0.8 + rnd() * 0.6 });
  });
  // Blumen
  scatter(2.2, (x, z, r) => {
    if (r > 0.6) return;
    const I = info(x, z);
    if (I.s !== 'grass' || I.path > 0.3 || blocked(x, z)) return;
    const meadow = smoothstep(0.1, 0.5, island.noise.detail(x / 26 + 40, z / 26));
    const p = 0.55 * zw[ZI.markt] * meadow + 0.12 * zw[ZI.hafen] + 0.05 + 0.15 * zw[ZI.leuchtturm] + 0.12 * zw[ZI.klippen] * meadow;
    if (r < p) add('flowers', x, z, { s: 0.9 + rnd() * 0.5, v: zw[ZI.klippen] > 0.4 ? 1 : (rnd() < 0.5 ? 0 : 1) });
  });
  // Gras
  scatter(1.85, (x, z, r) => {
    const I = info(x, z);
    if (I.path > 0.35 || blocked(x, z, -1)) return;
    let p = 0;
    if (I.s === 'grass') p = 0.7 * (1 - zw[ZI.dschungel] * 0.5);
    else if (I.s === 'sand' && I.h > 1.6) p = 0.05;
    else if (I.s === 'ash') p = 0.08;
    if (r >= p) return;
    // Farbe: Zonen-Gras
    let tw = 0; grassTint.setRGB(0, 0, 0);
    ZONES.forEach((Z, k) => { if (zw[k] > 0) { grassTint.r += gtc[Z.id].r * zw[k]; grassTint.g += gtc[Z.id].g * zw[k]; grassTint.b += gtc[Z.id].b * zw[k]; tw += zw[k]; } });
    const wild = Math.max(0, 1 - tw);
    grassTint.r += gtc.wild.r * wild; grassTint.g += gtc.wild.g * wild; grassTint.b += gtc.wild.b * wild; tw += wild;
    grassTint.multiplyScalar((0.9 + rnd() * 0.14) / tw);
    if (I.s === 'sand') grassTint.lerp(new THREE.Color('#c9c47a'), 0.6);
    add('grass', x, z, { s: 0.95 + rnd() * 0.6, tint: grassTint.clone() });
  });
  // Steine und Felsbrocken
  scatter(5, (x, z, r) => {
    const I = info(x, z);
    if (I.h < -0.4 || I.path > 0.5 || blocked(x, z)) return;
    const p = (I.s === 'rock' ? 0.3 : 0.04) + 0.12 * zw[ZI.klippen] + 0.15 * zw[ZI.vulkan];
    if (r < p) add('rock', x, z, { s: 0.6 + rnd() * 0.9, sink: 0.1, tint: zw[ZI.vulkan] > 0.5 && I.h > 14 ? new THREE.Color('#6a5c58') : undefined });
  });
  scatter(12, (x, z, r) => {
    const I = info(x, z);
    if (I.h < -1.6 || I.path > 0.2 || blocked(x, z, 2)) return;
    const D = island.coastDist(x, z);
    const p = 0.3 * zw[ZI.klippen] + 0.25 * zw[ZI.vulkan] + (D > -8 && D < 2 ? 0.28 : 0.04) * (1 - zw[ZI.strand] * 0.8);
    if (r < p) {
      const volc = zw[ZI.vulkan] > 0.5 && I.h > 12;
      add('boulder', x, z, { s: 1.0 + rnd() * 1.6, sink: 0.35, tint: volc ? new THREE.Color('#5a4c4a') : (zw[ZI.klippen] > 0.4 ? new THREE.Color('#9aa0c0') : undefined) });
    }
  });
  // Treibholz und Muscheln
  scatter(10, (x, z, r) => {
    const I = info(x, z);
    if (I.s !== 'sand' || I.h > 1.4 || blocked(x, z)) return;
    if (r < 0.12) add('driftwood', x, z, { s: 0.8 + rnd() * 0.5 });
  });
  scatter(4.5, (x, z, r) => {
    const I = info(x, z);
    if (I.s !== 'sand' || I.h > 1.5 || I.h < 0.2 || blocked(x, z)) return;
    if (r < 0.14) add('shells', x, z, { s: 0.9 + rnd() * 0.4 });
  });
  // ---- WP11: Schilf an Ufern (Torfbecken, Teich, Gezeitenbecken, Lagune), nicht auf Wegen ----
  const M = FEATURES.moor, LG = FEATURES.lagoon;
  scatter(1.7, (x, z, r) => {
    const e = waterEdge(x, z);
    if (e > 2.6 || e < -1.4) return;
    const I = info(x, z);
    if (I.path > 0.2 || I.h < -0.4) return;
    for (const s of padSites) if (Math.hypot(x - s.x, z - s.z) < s.r + 1) return;
    const p = 0.35 + 0.3 * smoothstep(1.5, -0.5, Math.abs(e)) + 0.25 * zw[ZI.moor];
    if (r < p) add('reed', x, z, { s: 0.75 + rnd() * 0.5 });
  });
  // Moorbirken: licht verteilt in der Senke und am Rand, nie in den Becken
  scatter(5.5, (x, z, r) => {
    const I = info(x, z);
    if ((I.s !== 'grass' && I.s !== 'moor') || I.ny < 0.8 || I.path > 0.1 || blocked(x, z, 1.5)) return;
    const dm = Math.hypot(x - M.x, z - M.z);
    const p = 0.22 * zw[ZI.moor] * (dm < M.r - 6 ? 0.8 : 1.3) + 0.03 * zw[ZI.leuchtturm];
    if (r < p) add('birch', x, z, { s: 0.8 + rnd() * 0.5, tilt: 0.06 });
  });
  // Heide: lila Polster im Moor (Blüten wachsen mit dem Schleier-Abzug), sparsam auf den Klippen
  scatter(2.6, (x, z, r) => {
    const I = info(x, z);
    if ((I.s !== 'grass' && I.s !== 'moor') || I.path > 0.3 || blocked(x, z)) return;
    const nh = smoothstep(0.05, 0.5, island.noise.detail(x / 26 + 40, z / 26));
    const p = 0.55 * zw[ZI.moor] * (0.4 + 0.6 * nh) + 0.12 * zw[ZI.klippen] * nh;
    if (r < p) add('heather', x, z, { s: 0.8 + rnd() * 0.6 });
  });
  // Mangroven: Stelzwurzeln im Flachwasser der Lagune (Ring um die Riesen-Mangrove)
  scatter(3.2, (x, z, r) => {
    const dl = Math.hypot(x - LG.x, z - LG.z);
    if (dl < LG.inner + 2.2 || dl > LG.r - 2) return;
    const I = info(x, z);
    if (I.h > 0.3 || I.h < -1.4 || I.path > 0.2) return;
    if (r < 0.45) add('mangrove', x, z, { s: 0.75 + rnd() * 0.5, sink: 0.4 });
  });

  // ---- InstancedMeshes pro Art und Block ----
  const group = new THREE.Group();
  group.name = 'vegetation';
  const meshes = [];
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v3 = new THREE.Vector3(), s3 = new THREE.Vector3();
  const white = new THREE.Color(1, 1, 1);
  const tintC = new THREE.Color();
  let totalInstances = 0;
  for (const [name, sp] of Object.entries(SPECIES)) {
    const list = placed[name];
    // nach Variante und Block gruppieren
    const buckets = new Map();
    for (const it of list) {
      const ci = Math.floor((it.x + 256) / CHUNK), cj = Math.floor((it.z + 256) / CHUNK);
      // Kleinkram: eine Variante je Block (halb so viele Draw-Calls; Vielfalt kommt aus Farbe, Größe, Drehung)
      const v = sp.kind === 'small' ? (ci * 7 + cj * 13) % sp.geos.length : it.v;
      const key = v + ':' + ci + ':' + cj;
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(it);
    }
    for (const [key, items] of buckets) {
      // mischen (damit Dichte-Präfix zufällig ist)
      for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const t = items[i]; items[i] = items[j]; items[j] = t; }
      const vi = +key.split(':')[0];
      const mesh = new THREE.InstancedMesh(sp.geos[vi], sp.mat, items.length);
      let cx = 0, cz = 0;
      items.forEach((it, i) => {
        const y = island.getHeight(it.x, it.z) - it.sink * it.s - (sp.kind === 'tree' ? 0.15 : 0.02);
        e.set((rnd() - 0.5) * it.tilt * 2, it.rot, (rnd() - 0.5) * it.tilt * 2, 'YXZ');
        q.setFromEuler(e);
        m4.compose(v3.set(it.x, y, it.z), q, s3.set(it.s, it.s * (0.9 + rnd() * 0.2), it.s));
        mesh.setMatrixAt(i, m4);
        if (it.tint) mesh.setColorAt(i, it.tint);
        else mesh.setColorAt(i, tintC.copy(white).multiplyScalar(0.9 + rnd() * 0.2));
        cx += it.x; cz += it.z;
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.computeBoundingSphere();
      mesh.castShadow = !!sp.shadow;
      mesh.receiveShadow = true;
      mesh.userData = { species: name, kind: sp.kind, far: sp.far || 0, items, cx: cx / items.length, cz: cz / items.length, total: items.length };
      mesh.name = 'veg-' + name;
      group.add(mesh);
      meshes.push(mesh);
      totalInstances += items.length;
    }
  }
  scene.add(group);

  // ---- Kontaktschatten in die Bodenfarben backen (Bäume: Kronenradius, Büsche/Felsen klein) ----
  const terrainMesh = scene.getObjectByName('terrain');
  const terrain = terrainMesh && terrainMesh.userData.terrain;
  if (terrain && terrain.darken) {
    const CONTACT = { palm: [2.4, 0.22], tree: [2.8, 0.3], blossom: [2.8, 0.3], jungle: [4.0, 0.36], pine: [2.2, 0.28], birch: [2.0, 0.22], mangrove: [2.4, 0.26], bush: [1.3, 0.22], boulder: [1.6, 0.26] };
    for (const [name, [r, a]] of Object.entries(CONTACT)) for (const it of placed[name]) terrain.darken(it.x, it.z, r * it.s, a);
    terrain.commit();
  }

  // ---- Dichte + Kollision ----
  let density = quality.vegetation;
  function applyDensity(q) {
    density = q.vegetation;
    colliders.removeGroup('vegetation');
    for (const m of meshes) {
      const d = m.userData.kind === 'tree' ? Math.min(1, 0.55 + density * 0.45) : density;
      m.count = Math.max(0, Math.round(m.userData.total * d));
      const sp = SPECIES[m.userData.species];
      if (sp.collide || sp.collideRock) {
        for (let i = 0; i < m.count; i++) {
          const it = m.userData.items[i];
          const r = sp.collideRock ? 1.05 * it.s : sp.collide * it.s;
          const top = island.getHeight(it.x, it.z) + (sp.collideRock ? 1.1 * it.s : (sp.trunk || 5) * it.s);
          const g = island.getHeight(it.x, it.z);
          const cr = sp.crown ? { r: sp.crown[0] * it.s, yMin: g + sp.crown[1] * it.s, yMax: g + sp.crown[2] * it.s } : null;
          colliders.addCircle(it.x, it.z, r, { group: 'vegetation', tag: m.userData.species, yMax: top, canopy: cr });
        }
      }
    }
    matSmall.userData.wind.uFadeFar.value = q.grassDistance;
  }
  applyDensity(quality);

  let bloomT = 0;
  const vegetation = {
    group, meshes, placed, species: Object.keys(SPECIES),
    materials: [matTree, matSmall, matBloom],
    get instanceCount() { return totalInstances; },
    get bloom() { return matBloom.userData.wind.uBloom.value; },
    setQuality(q) { applyDensity(q); },
    // Wind (0 = still, 1 = normal, 2 = Sturm)
    setWind(strength, dirX, dirZ) {
      for (const m of [matTree, matSmall, matBloom]) {
        m.userData.wind.uWindStrength.value = strength;
        if (dirX !== undefined) m.userData.wind.uWindDir.value.set(dirX, dirZ).normalize();
      }
    },
    // Distanz-Culling kleiner Pflanzen; Heideblüte folgt dem Schleier über dem Moor (grau = keine Blüten)
    update(camera) {
      const cx = camera.position.x, cz = camera.position.z;
      const gd = matSmall.userData.wind.uFadeFar.value;
      if (veil && veil.amountAt && (bloomT++ % 20 === 0)) {
        const v = veil.amountAt(M.x, M.z);
        const target = Math.max(0, Math.min(1, 1.15 - v * 1.4));
        const u = matBloom.userData.wind.uBloom;
        u.value += (target - u.value) * 0.25;
      }
      for (const m of meshes) {
        const f = m.userData.far;
        if (!f) continue;
        const d = Math.hypot(m.userData.cx - cx, m.userData.cz - cz) - CHUNK * 0.75;
        m.visible = d < gd * f;
      }
    },
  };
  return vegetation;
}

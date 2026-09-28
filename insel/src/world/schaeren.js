// Schären-Sektor vor dem Hafen (BAUPLAN §2.1 A2): Möwenklippe (Felsinsel mit Vorsprung für einen Fund), Wrackbank
// (Sandbank mit Wrack) und eine Nebelwand rund um die Wrackbank. Dazu ein paar kleine Felsen zum sanften Abprallen.
//   const sch = createSchaeren({ scene, veil, particles, audio, quality, gullSource })
//   sch.hit(x, z, pad) → null | { nx, nz }   (Felsen/Wrack für das Boot; pad = Rumpfbreite)
//   sch.fogPush(x, z) → null | { nx, nz, k } (nur solange der Nebel steht) · sch.fogActive · sch.inFog(x, z, extra)
//   sch.dissolveFog({ instant }) → Nebel löst sich auf (Partikel, Ton) · sch.gullUp(x, z) (Möwe fliegt auf)
//   sch.update(dt, t, camPos) · sch.ledge {x, y, z} (Vorsprung der Möwenklippe) · SCHAEREN (Positionen)
// Alles prozedural (Low-Poly-Teile, Nebel-Textur aus einem Canvas). Kein Zufall: Positionen und Formen sind fest.
import * as THREE from 'three';
import { part, merge } from './geom.js';
import { lambertVC } from './landmarks.js';
import { SITES } from './island.js';

export const SCHAEREN = {
  moewenklippe: { x: SITES.moewenklippe.x, z: SITES.moewenklippe.z, r: 6.2 },
  wrackbank: { x: SITES.wrackbank.x, z: SITES.wrackbank.z, r: 4.6 },
  // Nebelwand: Ring um die Wrackbank. Innen (r < inner) liegt das Wrack, die Wand selbst ist das Band inner…outer.
  nebel: { x: SITES.wrackbank.x, z: SITES.wrackbank.z, inner: 12.5, outer: 17 },
  felsen: [{ x: -18, z: 190, r: 1.8 }, { x: 30, z: 206, r: 2.1 }, { x: 44, z: 160, r: 1.6 }, { x: -44, z: 196, r: 1.5 }],
};

// Vorsprung der Möwenklippe: auf der Seite zum Hafen, 2,3 m über dem Wasser
const MK = SCHAEREN.moewenklippe;
const _dl = Math.hypot(MK.x, MK.z);
export const LEDGE = { x: +(MK.x - (MK.x / _dl) * (MK.r - 1.0)).toFixed(2), y: 2.3, z: +(MK.z - (MK.z / _dl) * (MK.r - 1.0)).toFixed(2) };

// Kollision (rein, für Tests): Felsen + Möwenklippe + Wrackbank als Kreise
export function schaerenHit(x, z, pad = 1.2) {
  const list = [SCHAEREN.moewenklippe, SCHAEREN.wrackbank, ...SCHAEREN.felsen];
  for (const o of list) {
    const dx = x - o.x, dz = z - o.z, d = Math.hypot(dx, dz);
    if (d < o.r + pad) return { nx: d > 1e-4 ? dx / d : 1, nz: d > 1e-4 ? dz / d : 0 };
  }
  return null;
}
// Nebel ohne Licht: weich hinausschieben (k 0..1), ganz innen wie eine Wand
export function nebelPush(x, z) {
  const N = SCHAEREN.nebel;
  const dx = x - N.x, dz = z - N.z, d = Math.hypot(dx, dz) || 1e-4;
  if (d >= N.outer + 1.5) return null;
  const k = Math.min(1, (N.outer + 1.5 - d) / 3.5);
  return { nx: dx / d, nz: dz / d, k };
}

function fogTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 128;
  const g = c.getContext('2d');
  g.clearRect(0, 0, 256, 128);
  // weiche Wolkenballen, fest verteilt (kein Zufall)
  for (let i = 0; i < 46; i++) {
    const x = ((i * 97) % 256), y = 40 + ((i * 53) % 60), r = 18 + ((i * 31) % 26);
    for (const ox of [-256, 0, 256]) {
      const gr = g.createRadialGradient(x + ox, y, 0, x + ox, y, r);
      gr.addColorStop(0, 'rgba(255,255,255,0.55)');
      gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr;
      g.beginPath(); g.arc(x + ox, y, r, 0, Math.PI * 2); g.fill();
    }
  }
  // oben und unten weich auslaufen
  const img = g.getImageData(0, 0, 256, 128);
  for (let y = 0; y < 128; y++) {
    const f = Math.min(1, y / 30) * Math.min(1, (128 - y) / 18);
    for (let x = 0; x < 256; x++) img.data[(y * 256 + x) * 4 + 3] *= f;
  }
  g.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createSchaeren({ scene, veil, particles, audio, quality, gullSource = null }) {
  const group = new THREE.Group();
  group.name = 'schaeren';
  const mat = lambertVC(veil, 'schaeren', { ramp: 'fels' });
  const low = quality && quality.name === 'low';

  // ---- Möwenklippe: drei Felsbrocken, weiße Kappen, flacher Vorsprung zum Hafen ----
  const P = [];
  const rock = (x, z, r, h, seed, col = '#7d7a86') => P.push(part(new THREE.DodecahedronGeometry(r, 0), { pos: [x, h * 0.35, z], scale: [1, h / r, 1], color: col, faceVar: 0.14, seed, jitter: r * 0.18 }));
  rock(MK.x, MK.z, 5.2, 7.5, 11);
  rock(MK.x + 3.2, MK.z + 2.2, 3.2, 4.2, 12, '#6f6c79');
  rock(MK.x - 3.0, MK.z + 2.8, 2.6, 3.2, 13, '#8a8794');
  P.push(part(new THREE.DodecahedronGeometry(1.8, 0), { pos: [MK.x + 0.4, 5.6, MK.z + 0.2], scale: [1, 0.35, 1], color: '#f1f0ea', faceVar: 0.05 }));   // Möwenkappe
  const la = Math.atan2(LEDGE.x - MK.x, LEDGE.z - MK.z);
  P.push(part(new THREE.BoxGeometry(2.4, 0.5, 1.8), { pos: [LEDGE.x, LEDGE.y - 0.25, LEDGE.z], rot: [0, la, 0], color: '#948f86', faceVar: 0.1 }));
  // ---- Wrackbank: Sandbank, gekippter Rumpf, Spanten, schiefer Mast ----
  const WB = SCHAEREN.wrackbank;
  P.push(part(new THREE.SphereGeometry(6.5, 10, 5), { pos: [WB.x, -1.6, WB.z], scale: [1, 0.3, 0.8], color: '#e6cf9a', faceVar: 0.06 }));
  P.push(part(new THREE.BoxGeometry(2.6, 1.3, 6.2), { pos: [WB.x + 0.6, 0.3, WB.z - 0.4], rot: [0.12, 0.7, 0.42], color: '#5a4a3c', faceVar: 0.15, seed: 21, deform: (v) => { if (v.y < 0) v.x *= 0.6; } }));
  for (let i = 0; i < 4; i++) P.push(part(new THREE.BoxGeometry(0.16, 1.8, 0.16), { pos: [WB.x - 1.4 + i * 0.35, 0.7, WB.z + 1.8 + i * 0.9], rot: [0.2, 0, 0.5 - i * 0.12], color: '#4a3a2c' }));
  P.push(part(new THREE.CylinderGeometry(0.1, 0.13, 5.5, 5, 1), { pos: [WB.x + 1.2, 2.2, WB.z - 0.8], rot: [0.5, 0, -0.35], color: '#4a3a2c' }));
  P.push(part(new THREE.BoxGeometry(1.4, 0.9, 0.04), { pos: [WB.x + 2.0, 3.3, WB.z - 1.8], rot: [0.4, 0.2, -0.3], color: '#a39a86', faceVar: 0.2 }));   // Segelfetzen
  // ---- kleine Felsen ----
  SCHAEREN.felsen.forEach((f, i) => rock(f.x, f.z, f.r, f.r * 1.4, 30 + i));
  const mesh = new THREE.Mesh(merge(P), mat);
  mesh.castShadow = !low; mesh.receiveShadow = true;
  group.add(mesh);

  // ---- Nebelwand: zwei Zylinder-Bänder mit weicher Wolken-Textur ----
  const N = SCHAEREN.nebel;
  const tex = fogTexture();
  const fogMats = [];
  const fog = new THREE.Group();
  fog.position.set(N.x, 0, N.z);
  const layers = low ? [{ r: 15, h: 11, rep: 5, o: 0.95 }] : [{ r: 13.5, h: 10, rep: 4, o: 0.8 }, { r: 16.2, h: 12, rep: 5, o: 0.95 }];
  for (const L of layers) {
    const t = tex.clone(); t.needsUpdate = true; t.repeat.set(L.rep, 1);
    const m = new THREE.MeshBasicMaterial({ map: t, color: new THREE.Color('#e7e3f2'), transparent: true, opacity: L.o, depthWrite: false, side: THREE.DoubleSide, fog: true });
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(L.r, L.r * 1.05, L.h, low ? 20 : 32, 1, true), m);
    cyl.position.y = L.h / 2 - 1.2;
    cyl.renderOrder = 5;
    m.userData.base = L.o;
    fogMats.push(m);
    fog.add(cyl);
  }
  // ein flacher Nebelteppich auf dem Wasser
  const capM = new THREE.MeshBasicMaterial({ map: tex, color: new THREE.Color('#ece8f5'), transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide, fog: true });
  capM.userData.base = 0.55;
  fogMats.push(capM);
  const cap = new THREE.Mesh(new THREE.RingGeometry(N.inner - 1, N.outer + 1, low ? 20 : 32, 1), capM);
  cap.rotation.x = -Math.PI / 2; cap.position.y = 0.6; cap.renderOrder = 5;
  fog.add(cap);
  group.add(fog);
  let fogActive = true, dissolveT = -1;

  // ---- Möwe fliegt auf (beim Abprallen) ----
  const flyers = [];
  function gullUp(x, z) {
    if (!gullSource) return;
    let f = flyers.find((o) => !o.on);
    if (!f) {
      if (flyers.length >= 3) return;
      const m = new THREE.Mesh(gullSource.geometry, gullSource.material);
      m.scale.setScalar(0.8);
      group.add(m);
      f = { m, on: false, t: 0 };
      flyers.push(f);
    }
    f.on = true; f.t = 0; f.x = x; f.z = z; f.dir = Math.atan2(-x, -z) + 0.9;
    f.m.visible = true;
    if (audio) audio.play('moewe');
  }

  // ---- Lebenszeichen auf der Anfahrt: ein paar Möwen kreisen über der offenen See (feste Kreise, kein Zufall) ----
  const kreiser = [];
  if (gullSource) for (const [cx, cz, r, hgt, sp] of [[22, 162, 7, 7, 0.45], [-22, 206, 9, 9, -0.35], [46, 214, 6, 6.5, 0.5], [88, 160, 8, 8, -0.4]]) {
    const m = new THREE.Mesh(gullSource.geometry, gullSource.material);
    m.scale.setScalar(0.7);
    group.add(m);
    kreiser.push({ m, cx, cz, r, hgt, sp });
  }

  scene.add(group);
  const api = {
    group, SCHAEREN, ledge: LEDGE,
    hit: schaerenHit,
    get fogActive() { return fogActive; },
    fogPush(x, z) { return fogActive && dissolveT < 0 ? nebelPush(x, z) : null; },
    inFog(x, z, extra = 0) { return Math.hypot(x - N.x, z - N.z) < N.outer + extra; },
    dissolveFog({ instant = false } = {}) {
      if (!fogActive) return false;
      if (instant) { if (dissolveT >= 0) return false; fogActive = false; fog.visible = false; return true; }   // läuft schon: Animation fertig spielen
      if (dissolveT >= 0) return false;
      dissolveT = 0;
      if (audio) audio.play('chime');
      if (particles) for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        particles.emit({ x: N.x + Math.sin(a) * 14, y: 2 + (i % 3), z: N.z + Math.cos(a) * 14, count: 6, spread: 2.5, speed: 1.2, up: 1.6, color: '#ffe7a0', size: 0.5, life: 1.8, gravity: -0.4, drag: 1, additive: true });
      }
      return true;
    },
    gullUp,
    update(dt, t) {
      for (const m of fogMats) if (m.map) m.map.offset.x = (m.map.offset.x + dt * 0.01) % 1;
      if (dissolveT >= 0 && fogActive) {
        dissolveT += dt;
        const k = Math.max(0, 1 - dissolveT / 2.4);
        for (const m of fogMats) m.opacity = m.userData.base * k;
        fog.scale.set(1 + (1 - k) * 0.35, 1 - (1 - k) * 0.5, 1 + (1 - k) * 0.35);
        if (k <= 0) { fogActive = false; fog.visible = false; }
      }
      for (const g of kreiser) {
        const a = t * g.sp;
        g.m.position.set(g.cx + Math.sin(a) * g.r, g.hgt + Math.sin(t * 0.7 + g.cx) * 0.6, g.cz + Math.cos(a) * g.r);
        g.m.rotation.set(0, a + (g.sp > 0 ? Math.PI / 2 : -Math.PI / 2), (g.sp > 0 ? -0.35 : 0.35));
      }
      for (const f of flyers) {
        if (!f.on) continue;
        f.t += dt;
        const k = f.t;
        f.m.position.set(f.x + Math.sin(f.dir) * k * 5, 1.5 + k * 3.2 + Math.sin(k * 3) * 0.3, f.z + Math.cos(f.dir) * k * 5);
        f.m.rotation.set(-0.25, f.dir, Math.sin(k * 2) * 0.2);
        if (f.t > 4) { f.on = false; f.m.visible = false; }
      }
    },
  };
  return api;
}

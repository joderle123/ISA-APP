// Große Gestalten (WP43): Grisel, die Schleiermotte (Schatten vor dem Mond, in der Ferne, im Finale Lichtfalter)
// und der Gewitter-Titan (Wolkenkörper mit Blitzadern, drei Phasen Grün/Gelb/Rot). Beide bewusst kantig und schlank.
import * as THREE from 'three';
import { part, merge } from '../../world/geom.js';

const TAU = Math.PI * 2;

// ---- Grisel: schmaler Leib, zwei große gezackte Flügel, Fühler. setState('schatten'|'nah'|'lichtfalter') ----
export function grisel(o = {}, K) {
  const { M } = K;
  const g = new THREE.Group();
  const s = o.size || 1;
  const P = [];
  P.push(part(new THREE.OctahedronGeometry(1, 1), { scale: [0.35 * s, 0.4 * s, 1.5 * s], jitter: 0.04, faceVar: 0.1, color: '#2e2a3d' }));
  P.push(part(new THREE.OctahedronGeometry(0.42 * s, 0), { pos: [0, 0.15 * s, 1.35 * s], scale: [1, 0.9, 1.1], color: '#2e2a3d' }));
  for (const sx of [-1, 1]) {
    P.push(part(new THREE.CylinderGeometry(0.02 * s, 0.035 * s, 1.6 * s, 3, 1), { pos: [sx * 0.35 * s, 0.9 * s, 1.7 * s], rot: [-0.5, 0, sx * 0.6], color: '#2e2a3d' }));
    for (let i = 0; i < 6; i++) P.push(part(new THREE.BoxGeometry(0.22 * s, 0.02 * s, 0.02 * s), { pos: [sx * (0.35 + i * 0.09) * s, (0.5 + i * 0.16) * s, (1.75 + i * 0.05) * s], rot: [0, 0, sx * 0.4], color: '#4a4462' }));
  }
  const body = new THREE.Mesh(merge(P), M.base);
  g.add(body);
  // Flügel: gezackte Fläche aus Dreiecksfächer, Kanten hell
  const wingGeo = (sx) => {
    const pos = [], cols = [], winds = [];
    const outer = [[0.3, 0.9], [1.6, 1.4], [2.9, 1.0], [3.4, 0.1], [2.8, -0.9], [1.9, -1.6], [1.0, -1.3], [0.3, -0.7]];
    const c0 = new THREE.Color('#3a3450'), c1 = new THREE.Color('#5a5478');
    for (let i = 0; i < outer.length - 1; i++) {
      const a = outer[i], b = outer[i + 1];
      const push = (x, z, c, w) => { pos.push(sx * x * s, 0, z * s); cols.push(c.r, c.g, c.b); winds.push(w); };
      if (sx > 0) { push(0.1, 0.2, c0, 0); push(a[0], a[1], i % 2 ? c1 : c0, a[0] / 3.4); push(b[0], b[1], i % 2 ? c1 : c0, b[0] / 3.4); }
      else { push(0.1, 0.2, c0, 0); push(b[0], b[1], i % 2 ? c1 : c0, b[0] / 3.4); push(a[0], a[1], i % 2 ? c1 : c0, a[0] / 3.4); }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.computeVertexNormals();
    geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    geo.setAttribute('aWind', new THREE.Float32BufferAttribute(winds, 1));
    return geo;
  };
  const wingMat = M.flap({ speed: 2.2, amp: 0.9 * s, side: THREE.DoubleSide });
  const wings = new THREE.Mesh(merge([wingGeo(-1), wingGeo(1)]), wingMat);
  wings.position.y = 0.1 * s;
  wings.userData.dynamic = true;
  g.add(wings);
  // Augen und Flügelsaum leuchten (schwach im Nah-Zustand, warm als Lichtfalter)
  const E = [];
  for (const sx of [-1, 1]) E.push(part(new THREE.OctahedronGeometry(0.11 * s, 0), { pos: [sx * 0.2 * s, 0.25 * s, 1.6 * s], scale: [1, 0.6, 1], color: '#d8ccff' }));
  const eyes = new THREE.Mesh(merge(E), M.glow('#b9a8ff', { intensity: 1.2, veil: false }));
  eyes.userData.dynamic = true;
  g.add(eyes);
  const shadowMat = new THREE.MeshBasicMaterial({ color: '#05030c', side: THREE.DoubleSide });
  const mats = { body: body.material, wings: wingMat, eyes: eyes.material };
  let state = null;
  const api = {
    group: g, type: 'grisel', wings, body,
    get state() { return state; },
    setState(st) {
      state = st;
      if (st === 'schatten') { body.material = shadowMat; wings.material = shadowMat; eyes.visible = false; }
      else if (st === 'lichtfalter') {
        body.material = M.glow('#ffb347', { intensity: 0.6, veil: false }); eyes.visible = true;
        wings.material = mats.wings; wingMat.emissive = new THREE.Color('#ffcc66'); wingMat.emissiveIntensity = 0.8;
      } else { body.material = mats.body; wings.material = mats.wings; wingMat.emissive = new THREE.Color('#000000'); wingMat.emissiveIntensity = 0; eyes.visible = true; }
      return api;
    },
    update(dt, t) { g.position.y = (g.userData.baseY || 0) + Math.sin(t * 0.9) * 0.3 * s; g.rotation.z = Math.sin(t * 0.5) * 0.08; },
  };
  api.setState(o.state || 'nah');
  return api;
}

// ---- Gewitter-Titan: Wolkenkörper (Rumpf, Schultern, Kopf, Arme) aus Ballen, Blitzadern; setPhase('gruen'|'gelb'|'rot'), flash() ----
export function titan(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const S = o.size || 1;                      // 1 ≈ 18 m hoch
  const dark = new THREE.Color('#3f3d52'), mid = new THREE.Color('#6a677f'), light = new THREE.Color('#a9a6bd');
  const colFn = (x, y, z, out) => out.copy(dark).lerp(mid, THREE.MathUtils.smoothstep(y, 2, 12)).lerp(light, THREE.MathUtils.smoothstep(y, 10, 18) * 0.6);
  const blob = (P, x, y, z, r, sx = 1, sy = 1, sz = 1, seed = 1, detail = r >= 1.4 ? 1 : 0) => P.push(part(new THREE.IcosahedronGeometry(r * S, detail), { pos: [x * S, y * S, z * S], scale: [sx, sy, sz], jitter: r * S * 0.28, seed: 700 + seed, faceVar: 0.14, color: colFn }));
  const P = [];
  // Rumpf und Hüfte (schwebt: unten franst er aus)
  for (let i = 0; i < 7; i++) { const a = (i / 7) * TAU; blob(P, Math.cos(a) * 1.4, 3.5 + (i % 2) * 0.6, Math.sin(a) * 1.0, 1.6, 1.2, 0.9, 1.1, i); }
  for (let i = 0; i < 5; i++) { const a = (i / 5) * TAU; blob(P, Math.cos(a) * 1.9, 7.5 + (i % 2) * 0.5, Math.sin(a) * 1.3, 2.2, 1.25, 1, 1.1, 10 + i); }
  for (let i = 0; i < 6; i++) { const a = (i / 6) * TAU; blob(P, Math.cos(a) * 3.4, 11.5 + R.float(-0.3, 0.3), Math.sin(a) * 1.4, 2.3, 1.3, 0.9, 1.1, 20 + i); }
  blob(P, 0, 9.5, 0, 3.2, 1.2, 1.1, 1.1, 30);
  // Kopf: kantiger Ballen mit „Amboss“-Krone
  blob(P, 0, 15.2, 0.2, 2.0, 1.1, 1.15, 1.0, 31);
  for (let i = 0; i < 4; i++) { const a = (i / 4) * TAU + 0.4; blob(P, Math.cos(a) * 1.6, 17.0, Math.sin(a) * 1.2, 1.1, 1.6, 0.5, 1.3, 40 + i); }
  // Fransen unten (Böenfront)
  for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; blob(P, Math.cos(a) * 2.4, 1.2 + R.float(0, 1), Math.sin(a) * 1.8, 0.9, 1.4, 0.55, 1.1, 50 + i); }
  const bodyMesh = new THREE.Mesh(merge(P), M.cloud());
  bodyMesh.castShadow = false;
  g.add(bodyMesh);
  // Arme: je drei Ballen, werden im update geschwenkt
  const arms = [];
  for (const sx of [-1, 1]) {
    const A = [];
    blob(A, 0, 0, 0, 1.4, 1, 1, 1, 60 + sx);
    blob(A, sx * 1.6, -1.8, 0.4, 1.2, 1, 1.1, 1, 62 + sx);
    blob(A, sx * 2.6, -3.8, 0.9, 1.05, 1, 1.2, 1, 64 + sx);
    for (let f = 0; f < 3; f++) blob(A, sx * (2.8 + f * 0.35), -5.2 - f * 0.4, 0.9 + (f - 1) * 0.5, 0.55, 0.8, 1.6, 0.8, 66 + f);
    const arm = new THREE.Mesh(merge(A), M.cloud());
    arm.position.set(sx * 4.6 * S, 12.2 * S, 0.6 * S);
    arm.userData.dynamic = true;
    g.add(arm);
    arms.push(arm);
  }
  // Blitzadern: gezackte dünne Boxen über Brust und Kopf (Glow), Augen als zwei Schlitze
  const V = [];
  const vein = (x0, y0, z0, n, seed) => { let x = x0, y = y0, z = z0; for (let i = 0; i < n; i++) { const nx = x + R.float(-0.7, 0.7), ny = y - R.float(0.5, 1.2), nz = z + R.float(-0.3, 0.3); const L = Math.hypot(nx - x, ny - y, nz - z); V.push(part(new THREE.BoxGeometry(0.12, L, 0.12), { pos: [(x + nx) / 2 * S, (y + ny) / 2 * S, (z + nz) / 2 * S], rot: [0, 0, Math.atan2(nx - x, ny - y)], color: '#dfe6ff' })); x = nx; y = ny; z = nz; } };
  vein(-0.8, 12.5, 2.2, 5, 1); vein(1.1, 13.2, 2.4, 6, 2); vein(0.2, 8.6, 2.8, 5, 3);
  for (const sx of [-1, 1]) V.push(part(new THREE.BoxGeometry(0.7, 0.14, 0.14), { pos: [sx * 0.7 * S, 15.6 * S, 1.9 * S], rot: [0, 0, sx * 0.25], color: '#eaf0ff' }));
  const veinMat = M.glow('#8fa3ff', { intensity: 1.0, veil: false });
  const veins = new THREE.Mesh(merge(V), veinMat);
  veins.userData.dynamic = true;
  g.add(veins);
  const PHASE = { gruen: { col: '#7ce36a', base: 0.5 }, gelb: { col: '#ffd23f', base: 0.8 }, rot: { col: '#ff3b3b', base: 1.2 } };
  let phase = o.phase || 'gruen', flash = 0, breath = 0;
  const api = {
    group: g, type: 'titan', arms, veins, body: bodyMesh,
    get phase() { return phase; },
    setPhase(p) { if (PHASE[p]) { phase = p; veinMat.emissive.set(PHASE[p].col); } return api; },
    flash(v = 1) { flash = Math.max(flash, v); },
    update(dt, t) {
      breath += dt;
      flash = Math.max(0, flash - dt * 3);
      const ph = PHASE[phase] || PHASE.gruen;
      veinMat.emissiveIntensity = ph.base * (0.75 + 0.25 * Math.sin(t * 5.5)) + flash * 2.5;
      bodyMesh.scale.set(1 + Math.sin(breath * 0.7) * 0.02, 1 + Math.sin(breath * 0.7 + 1) * 0.03, 1 + Math.sin(breath * 0.7) * 0.02);
      arms.forEach((a, i) => { const s = i ? 1 : -1; a.rotation.z = s * (0.25 + Math.sin(t * 0.6 + i) * 0.2 + (phase === 'rot' ? Math.sin(t * 2.4) * 0.2 : 0)); a.rotation.x = Math.sin(t * 0.5 + i * 2) * 0.12; });
      g.position.y = (g.userData.baseY || 0) + Math.sin(t * 0.4) * 0.6 * S;
    },
  };
  api.setPhase(phase);
  return api;
}

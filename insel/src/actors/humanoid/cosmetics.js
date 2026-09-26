// Kosmetik-Meshes (WP16): Kopfsachen (Cap, Mütze, Kopfhörer, Bandana, Stirnband, Kapuze), Tiermasken (auf der Stirn,
// damit das Gesicht sichtbar bleibt), Muster als Farbfunktionen (Streifen, Camo, Verlauf, Batik, Leuchtkante),
// Rucksack und das Futter der Crew-Jacke. Reine Geometrie-Bausteine, keine Spiel-Logik.
import * as THREE from 'three';
import { part } from '../../world/geom.js';
import { qhash } from '../../world/geom.js';
import { M, darker, lighter, mixHex } from './base.js';

const R = M.headR;

// ---- Kopfsachen ----
export function buildHeadItem(cfg, P) {
  const it = cfg.head, c = cfg.headColor;
  if (!it || it === 'keins') return;
  if (it === 'cap') {
    P.push(part(new THREE.SphereGeometry(R * 1.1, 12, 6, 0, Math.PI * 2, 0, Math.PI * 0.5), { pos: [0, 0.03, 0], color: c }));
    P.push(part(new THREE.CylinderGeometry(0.12, 0.12, 0.015, 10, 1), { pos: [0, 0.05, R * 0.95], scale: [1.05, 1, 0.8], color: darker(c, 0.85) }));
    P.push(part(new THREE.IcosahedronGeometry(0.018, 0), { pos: [0, R * 1.14, 0], color: darker(c, 0.7) }));
  } else if (it === 'muetze') {
    P.push(part(new THREE.SphereGeometry(R * 1.12, 12, 7, 0, Math.PI * 2, 0, Math.PI * 0.5), { pos: [0, 0.04, 0], scale: [1, 1.15, 1], color: c, faceVar: 0.06 }));
    P.push(part(new THREE.CylinderGeometry(R * 1.14, R * 1.14, 0.05, 12, 1), { pos: [0, 0.04, 0], color: darker(c, 0.85) }));
    P.push(part(new THREE.IcosahedronGeometry(0.045, 1), { pos: [0, R * 1.3 + 0.04, 0], color: '#ffffff' }));
  } else if (it === 'kopfhoerer') {
    P.push(part(new THREE.TorusGeometry(R * 1.12, 0.016, 4, 14, Math.PI), { pos: [0, 0.02, 0], color: '#2b2b35' }));
    for (const s of [-1, 1]) P.push(part(new THREE.CylinderGeometry(0.055, 0.055, 0.045, 10, 1), { pos: [s * R * 1.08, -0.005, 0], rot: [0, 0, Math.PI / 2], color: c }));
  } else if (it === 'bandana') {
    // Band um die Stirn, Knoten hinten mit zwei Zipfeln
    P.push(part(new THREE.CylinderGeometry(R * 1.08, R * 1.1, 0.05, 14, 1, true), { pos: [0, 0.06, -0.005], scale: [1, 1, 1.03], rot: [0.06, 0, 0], color: c, faceVar: 0.08 }));
    P.push(part(new THREE.IcosahedronGeometry(0.028, 0), { pos: [0, 0.05, -R * 1.08], color: darker(c, 0.85) }));
    for (const s of [-1, 1]) P.push(part(new THREE.ConeGeometry(0.03, 0.14, 4, 1), { pos: [s * 0.04, -0.01, -R * 1.1], rot: [-2.6, 0, s * 0.5], color: c }));
  } else if (it === 'stirnband') {
    P.push(part(new THREE.CylinderGeometry(R * 1.07, R * 1.08, 0.028, 14, 1, true), { pos: [0, 0.065, -0.005], scale: [1, 1, 1.03], color: c }));
  } else if (it === 'kapuze') {
    // Kapuze auf: große Haube aus der Oberteil-Farbe, vorn offen
    const hc = darker(cfg.top, 0.82);
    P.push(part(new THREE.SphereGeometry(R * 1.24, 14, 10, Math.PI * 0.12, Math.PI * 0.76, 0, Math.PI * 0.72), { pos: [0, 0.02, -0.03], scale: [1, 1.05, 1.1], color: hc, faceVar: 0.05, jitter: 0.008, seed: 23, deform: (v) => { if (v.z > 0.02 && v.y < 0.11) v.y = Math.max(v.y, 0.11 - (v.z - 0.02) * 0.2); } }));
    P.push(part(new THREE.SphereGeometry(R * 1.24, 14, 10, Math.PI * 0.88, Math.PI * 0.24, 0, Math.PI * 0.72), { pos: [0, 0.02, -0.03], scale: [1, 1.05, 1.1], color: hc, faceVar: 0.05, jitter: 0.008, seed: 24 }));
    P.push(part(new THREE.SphereGeometry(R * 1.24, 14, 10, 0, Math.PI * 0.12, 0, Math.PI * 0.72), { pos: [0, 0.02, -0.03], scale: [1, 1.05, 1.1], color: hc, faceVar: 0.05, jitter: 0.008, seed: 25 }));
  }
}

// ---- Tiermasken: sitzen hochgeschoben auf der Stirn (Gesicht bleibt frei) ----
const MASK_BASE = { fuchs: '#ff7a2f', eule: '#8a6a4a', hai: '#5e7a99', schildkroete: '#3f9e5e', teddy: '#a5643c' };
export function buildMask(cfg, P) {
  const k = cfg.mask;
  const base = MASK_BASE[k];
  if (!base) return;
  const my = R * 0.62 + 0.035, mz = 0.055, tilt = -0.62;
  const mp = (geo, opts) => {
    // Teil in Masken-Koordinaten (Mitte der Maske), dann geneigt auf die Stirn gelegt
    const g = part(geo, { ...opts });
    const m = new THREE.Matrix4().compose(new THREE.Vector3(0, my, mz), new THREE.Quaternion().setFromEuler(new THREE.Euler(tilt, 0, 0)), new THREE.Vector3(1, 1, 1));
    g.applyMatrix4(m);
    g.computeVertexNormals();
    P.push(g);
  };
  // Grundform: flaches Oval
  mp(new THREE.IcosahedronGeometry(0.1, 1), { scale: [1.2, 0.95, 0.5], pos: [0, 0, 0.02], color: base, faceVar: 0.08, seed: 33 });
  const eyeRing = (s, col) => mp(new THREE.TorusGeometry(0.03, 0.009, 4, 10), { pos: [s * 0.05, 0.005, 0.07], color: col });
  const eye = (s, col = '#1d1330') => mp(new THREE.CylinderGeometry(0.014, 0.014, 0.01, 6, 1), { pos: [s * 0.05, 0.005, 0.072], rot: [Math.PI / 2, 0, 0], color: col });
  if (k === 'fuchs') {
    for (const s of [-1, 1]) mp(new THREE.ConeGeometry(0.035, 0.09, 4, 1), { pos: [s * 0.075, 0.09, 0.0], rot: [0.1, 0, s * -0.35], color: base });
    for (const s of [-1, 1]) mp(new THREE.ConeGeometry(0.02, 0.05, 4, 1), { pos: [s * 0.072, 0.085, 0.012], rot: [0.1, 0, s * -0.35], color: '#ffe9d6' });
    mp(new THREE.IcosahedronGeometry(0.045, 1), { pos: [0, -0.045, 0.06], scale: [1.2, 0.7, 0.8], color: '#fff3e6' });
    mp(new THREE.IcosahedronGeometry(0.014, 0), { pos: [0, -0.04, 0.1], color: '#1d1330' });
    for (const s of [-1, 1]) mp(new THREE.BoxGeometry(0.04, 0.012, 0.01), { pos: [s * 0.05, 0.008, 0.072], rot: [0, 0, s * -0.3], color: '#1d1330' });
  } else if (k === 'eule') {
    for (const s of [-1, 1]) { eyeRing(s, '#f6e7c1'); eye(s, '#2a1d3a'); }
    mp(new THREE.ConeGeometry(0.018, 0.045, 4, 1), { pos: [0, -0.03, 0.085], rot: [Math.PI / 2 + 0.4, 0, 0], color: '#ffb347' });
    for (const s of [-1, 1]) mp(new THREE.ConeGeometry(0.025, 0.07, 4, 1), { pos: [s * 0.085, 0.085, 0.0], rot: [0, 0, s * -0.6], color: darker(base, 0.8) });
    for (let i = 0; i < 4; i++) mp(new THREE.CircleGeometry(0.012, 5), { pos: [(i - 1.5) * 0.028, -0.062, 0.072], color: lighter(base, 0.35) });
  } else if (k === 'hai') {
    mp(new THREE.BoxGeometry(0.01, 0.09, 0.07), { pos: [0, 0.09, -0.02], rot: [-0.5, 0, 0], color: darker(base, 0.85), deform: (v) => { if (v.y > 0.03) v.z -= 0.03; } });
    for (const s of [-1, 1]) eye(s, '#101018');
    for (let i = 0; i < 5; i++) mp(new THREE.ConeGeometry(0.011, 0.03, 4, 1), { pos: [(i - 2) * 0.03, -0.075, 0.062], rot: [Math.PI, 0, 0], color: '#ffffff' });
    mp(new THREE.BoxGeometry(0.16, 0.008, 0.02), { pos: [0, -0.06, 0.06], color: lighter(base, 0.5) });
    for (const s of [-1, 1]) for (let i = 0; i < 3; i++) mp(new THREE.BoxGeometry(0.004, 0.03, 0.01), { pos: [s * (0.075 + i * 0.012), 0.0, 0.05], color: darker(base, 0.7) });
  } else if (k === 'schildkroete') {
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; mp(new THREE.CircleGeometry(0.025, 6), { pos: [Math.cos(a) * 0.06, Math.sin(a) * 0.045, 0.07], color: darker(base, 0.7) }); }
    mp(new THREE.CircleGeometry(0.03, 6), { pos: [0, 0, 0.072], color: darker(base, 0.7) });
    for (const s of [-1, 1]) eye(s * 1.5, '#1d1330');
    mp(new THREE.IcosahedronGeometry(0.03, 0), { pos: [0, -0.07, 0.05], scale: [1.3, 0.8, 1], color: lighter(base, 0.25) });
  } else if (k === 'teddy') {
    for (const s of [-1, 1]) mp(new THREE.IcosahedronGeometry(0.038, 1), { pos: [s * 0.095, 0.075, -0.01], scale: [1, 1, 0.5], color: base });
    for (const s of [-1, 1]) mp(new THREE.IcosahedronGeometry(0.02, 0), { pos: [s * 0.095, 0.075, 0.008], scale: [1, 1, 0.5], color: lighter(base, 0.4) });
    mp(new THREE.IcosahedronGeometry(0.05, 1), { pos: [0, -0.04, 0.055], scale: [1.2, 0.8, 0.8], color: lighter(base, 0.45) });
    mp(new THREE.IcosahedronGeometry(0.018, 0), { pos: [0, -0.025, 0.1], color: '#1d1330' });
    for (const s of [-1, 1]) eye(s, '#1d1330');
  }
}

// ---- Muster: Farbfunktion für part() (x,y,z im Teil-Raum; y = Höhe am Rumpf 0…M.torso) ----
const _c = new THREE.Color();
export function patternColor(cfg, base, { accent, region = 'torso', seed = 1, w = 1 } = {}) {
  const p = cfg.pattern;
  const acc = accent || cfg.patternColor;
  if (!p || p === 'keins') return base;
  const B = new THREE.Color(base), A = new THREE.Color(acc);
  const T = M.torso;
  if (p === 'streifen') return (x, y, z, out) => { out.copy(Math.floor((y + 1.0) / 0.075) % 2 ? A : B); };
  if (p === 'verlauf') return (x, y, z, out) => { const t = region === 'torso' ? y / T : region === 'arm' ? 1 + y / 0.34 : 0.5 + y; out.copy(B).lerp(A, Math.max(0, Math.min(1, t))); };
  if (p === 'camo') {
    const C = B.clone().multiplyScalar(0.7), D = B.clone().lerp(A, 0.6);
    return (x, y, z, out, f) => { const h = qhash(Math.round(x * 6) * 0.17, Math.round(y * 6) * 0.13, Math.round(z * 6) * 0.11, seed); out.copy(h < 0.3 ? C : h < 0.55 ? D : B); };
  }
  if (p === 'batik') {
    return (x, y, z, out) => { const d = Math.hypot(x * 1.4, (y - (region === 'torso' ? T * 0.55 : -0.15)) * 1.1, z * 0.6); const r = 0.5 + 0.5 * Math.sin(d * 34 + qhash(x, y, z, seed) * 1.6); out.copy(B).lerp(A, r * 0.85); };
  }
  if (p === 'leuchtkante') {
    const G = A.clone().multiplyScalar(1.7);    // heller als 1 → leuchtet unter Beleuchtung
    return (x, y, z, out) => {
      const edge = region === 'torso' ? (y < 0.05 || y > T - 0.05 || Math.abs(x) > 0.2 * w) : region === 'arm' ? (y < -0.26 || y > -0.03) : (y < -0.4 || Math.abs(x) > 0.075 * w);
      out.copy(edge ? G : B);
    };
  }
  return base;
}

// ---- Rucksack (am Rumpf) ----
export function buildBackItem(cfg, P, W = 1) {
  if (cfg.back !== 'rucksack') return;
  const ac = cfg.backColor;
  P.push(part(new THREE.BoxGeometry(0.27 * W, 0.34, 0.14), { pos: [0, M.torso * 0.55, -0.17 * W], jitter: 0.015, seed: 4, color: ac }));
  P.push(part(new THREE.BoxGeometry(0.2 * W, 0.12, 0.05), { pos: [0, M.torso * 0.38, -0.25 * W], color: darker(ac, 0.8) }));
  for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.035, 0.42, 0.04), { pos: [s * 0.1 * W, M.torso * 0.6, 0.12 * W], color: darker(ac, 0.7) }));
}

// ---- Crew-Jacke: Futter mit Unterschriften (Bindung ≥ 2, Finale) als kleine Symbole am Revers ----
export function buildJacketLining(cfg, P, W = 1) {
  const j = cfg.jacket || {};
  const lining = j.lining || '#ffe9a8';
  // Revers innen (zwei schmale Streifen am offenen Kragen)
  for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.05, 0.19, 0.012), { pos: [s * 0.055 * W, M.torso - 0.12, 0.155 * W], rot: [0.12, s * 0.35, s * 0.25], color: lining }));
  const sig = Array.isArray(j.signatures) ? j.signatures.slice(0, 12) : [];
  sig.forEach((sg, i) => {
    const s = i % 2 ? 1 : -1, k = Math.floor(i / 2);
    const col = (sg && sg.color) || '#ff5d73';
    P.push(part(new THREE.CylinderGeometry(0.012, 0.012, 0.008, 6, 1), { pos: [s * (0.045 + k * 0.004) * W, M.torso - 0.055 - k * 0.028, 0.162 * W], rot: [Math.PI / 2 + 0.12, 0, s * 0.25], color: col }));
  });
}

export { mixHex };

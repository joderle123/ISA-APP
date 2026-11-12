// Kosmetik-Meshes (Stil-Bibel §8.4): Kopfsachen (Cap mit gebogenem Schirm, Mütze mit Umschlag, Kopfhörer, Bandana,
// Stirnband, Kapuze als Volumen), Tiermasken (auf der Stirn, Gesicht bleibt frei), Muster als Farbfunktionen (Streifen,
// Camo, Verlauf, Batik, Leuchtkante), Rucksack (Riemen am Rumpf, Körper als eigenes, nachschwingendes Teil) und das
// Futter der Crew-Jacke. Reine Geometrie-Bausteine, keine Spiel-Logik. Farbfunktionen: lokale Koordinaten des Teils.
import * as THREE from 'three';
import { fig, merge, capsule, sphere, lathe, tube, flat, RoundedBoxGeometry, FLAG } from './geo.js';
const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
import { qhash } from '../../world/geom.js';
import { M, torsoRadius, darker, lighter, mixHex } from './base.js';

const R = M.headR;

// ---- Kopfsachen ----
export function buildHeadItem(cfg, P) {
  const it = cfg.head, c = cfg.headColor;
  if (!it || it === 'keins') return;
  if (it === 'cap') {
    P.push(fig(new THREE.SphereGeometry(R * 1.1, 18, 9, 0, Math.PI * 2, 0, Math.PI * 0.5), { pos: [0, 0.028, -0.004], scale: [1, 1.02, 1.04], color: (x, y, z, out) => out.set(c).multiplyScalar(0.94 + 0.06 * (Math.floor((Math.atan2(x, z) + Math.PI) / (Math.PI / 3)) % 2)) }));
    // Schirm: Kreissektor, nach vorn gebogen
    P.push(fig(new THREE.CylinderGeometry(0.135, 0.135, 0.012, 14, 1, false, -Math.PI * 0.42, Math.PI * 0.84), { pos: [0, 0.035, 0.005], scale: [1.02, 1, 1], deform: (v) => { const r = Math.hypot(v.x, v.z) / 0.135; v.y -= r * r * 0.03; v.x *= 0.85 + 0.15 * (1 - r); }, color: darker(c, 0.85) }));
    P.push(fig(new THREE.TorusGeometry(R * 1.1, 0.006, 5, 18), { pos: [0, 0.03, -0.004], rot: [Math.PI / 2, 0, 0], scale: [1, 1.04, 1], color: darker(c, 0.85) }));
    P.push(fig(sphere(0.014, 10, 8), { pos: [0, R * 1.14 + 0.02, 0], color: darker(c, 0.7) }));
  } else if (it === 'muetze') {
    P.push(fig(new THREE.SphereGeometry(R * 1.12, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.55), { pos: [0, 0.04, -0.006], scale: [1, 1.2, 1], color: c, deform: (v) => { if (v.y > R * 0.6) v.y += (v.y - R * 0.6) * 0.3; } }));
    P.push(fig(new THREE.TorusGeometry(R * 1.12, 0.03, 7, 18), { pos: [0, 0.035, -0.006], rot: [Math.PI / 2, 0, 0], scale: [1, 1.04, 1], color: darker(c, 0.85) }));
    P.push(fig(sphere(0.042, 9, 7), { pos: [0, R * 1.42 + 0.06, -0.01], color: '#ffffff', deform: (v) => { v.multiplyScalar(1 + 0.05 * Math.sin(v.x * 90) * Math.sin(v.y * 80)); } }));
  } else if (it === 'kopfhoerer') {
    P.push(fig(new THREE.TorusGeometry(R * 1.14, 0.013, 6, 20, Math.PI), { pos: [0, 0.03, -0.01], color: '#2b2b35' }));
    for (const s of [-1, 1]) {
      P.push(fig(new THREE.CylinderGeometry(0.056, 0.056, 0.036, 14, 1), { pos: [s * (R * 1.06 + 0.012), 0.0, -0.005], rot: [0, 0, Math.PI / 2], color: c }));
      P.push(fig(new THREE.TorusGeometry(0.045, 0.012, 6, 14), { pos: [s * R * 1.03, 0.0, -0.005], rot: [0, Math.PI / 2, 0], color: '#2b2b35' }));
    }
  } else if (it === 'bandana') {
    P.push(fig(new THREE.CylinderGeometry(R * 1.08, R * 1.1, 0.05, 16, 1, true), { pos: [0, 0.062, -0.005], scale: [1, 1, 1.03], rot: [0.06, 0, 0], color: (x, y, z, out) => out.set(c).multiplyScalar(0.95 + 0.05 * Math.sin(Math.atan2(x, z) * 8)) }));
    P.push(fig(sphere(0.026, 12, 9), { pos: [0, 0.05, -R * 1.08], scale: [1.3, 0.8, 0.8], color: darker(c, 0.85) }));
    for (const s of [-1, 1]) P.push(fig(capsule(0.016, 0.008, 0.14, { segs: 6, caps: 2 }), { pos: [s * 0.035, 0.04, -R * 1.1], rot: [-2.7, 0, s * 0.45], color: c }));
  } else if (it === 'stirnband') {
    P.push(fig(new THREE.CylinderGeometry(R * 1.07, R * 1.08, 0.03, 16, 1, true), { pos: [0, 0.065, -0.005], scale: [1, 1, 1.03], color: c }));
  } else if (it === 'kapuze') {
    // Kapuze auf: große Haube aus der Oberteil-Farbe, vorn offen, Rand als Wulst
    const hc = darker(cfg.top, 0.82);
    P.push(fig(new THREE.SphereGeometry(R * 1.26, 26, 16, Math.PI * 0.12, Math.PI * 0.76, 0, Math.PI * 0.74), { pos: [0, 0.02, -0.03], scale: [1, 1.06, 1.1], color: hc, deform: (v) => { if (v.z > 0.02 && v.y < 0.11) v.y = Math.max(v.y, 0.11 - (v.z - 0.02) * 0.2); } }));
    P.push(fig(new THREE.SphereGeometry(R * 1.26, 26, 16, Math.PI * 0.88, Math.PI * 0.24, 0, Math.PI * 0.74), { pos: [0, 0.02, -0.03], scale: [1, 1.06, 1.1], color: hc }));
    P.push(fig(new THREE.SphereGeometry(R * 1.26, 26, 16, 0, Math.PI * 0.12, 0, Math.PI * 0.74), { pos: [0, 0.02, -0.03], scale: [1, 1.06, 1.1], color: hc }));
    P.push(fig(new THREE.TorusGeometry(R * 1.2, 0.02, 6, 20, Math.PI * 1.15), { pos: [0, 0.03, -0.01], rot: [Math.PI / 2 + 0.55, 0, Math.PI * 0.425], scale: [1, 1.15, 1], color: darker(cfg.top, 0.72) }));
  }
}

// ---- Tiermasken: sitzen hochgeschoben auf der Stirn (Gesicht bleibt frei) ----
const MASK_BASE = { fuchs: '#ff7a2f', eule: '#8a6a4a', hai: '#5e7a99', schildkroete: '#3f9e5e', teddy: '#a5643c' };
export function buildMask(cfg, P) {
  const k = cfg.mask;
  const base = MASK_BASE[k];
  if (!base) return;
  const my = R * 0.62 + 0.04, mz = 0.06, tilt = -0.62;
  const mp = (geo, opts) => {
    const g = fig(geo, { ...opts });
    const m = new THREE.Matrix4().compose(new THREE.Vector3(0, my, mz), new THREE.Quaternion().setFromEuler(new THREE.Euler(tilt, 0, 0)), new THREE.Vector3(1, 1, 1));
    g.applyMatrix4(m);
    P.push(g);
  };
  const flat = FLAG.flat;
  mp(sphere(0.1, 12, 8), { scale: [1.2, 0.95, 0.5], pos: [0, 0, 0.02], color: base });
  const eyeRing = (s, col) => mp(new THREE.TorusGeometry(0.03, 0.008, 5, 10), { pos: [s * 0.05, 0.005, 0.07], color: col });
  const eye = (s, col = '#1d1330') => mp(new THREE.CylinderGeometry(0.014, 0.014, 0.01, 8, 1), { pos: [s * 0.05, 0.005, 0.072], rot: [Math.PI / 2, 0, 0], flag: flat, color: col });
  if (k === 'fuchs') {
    for (const s of [-1, 1]) mp(new THREE.ConeGeometry(0.035, 0.09, 6, 1), { pos: [s * 0.075, 0.09, 0.0], rot: [0.1, 0, s * -0.35], color: base });
    for (const s of [-1, 1]) mp(new THREE.ConeGeometry(0.02, 0.05, 6, 1), { pos: [s * 0.072, 0.085, 0.012], rot: [0.1, 0, s * -0.35], color: '#ffe9d6' });
    mp(sphere(0.045, 14, 10), { pos: [0, -0.045, 0.06], scale: [1.2, 0.7, 0.8], color: '#fff3e6' });
    mp(sphere(0.014, 10, 8), { pos: [0, -0.04, 0.1], flag: flat, color: '#1d1330' });
    for (const s of [-1, 1]) mp(box(0.04, 0.012, 0.01), { pos: [s * 0.05, 0.008, 0.072], rot: [0, 0, s * -0.3], flag: flat, color: '#1d1330' });
  } else if (k === 'eule') {
    for (const s of [-1, 1]) { eyeRing(s, '#f6e7c1'); eye(s, '#2a1d3a'); }
    mp(new THREE.ConeGeometry(0.018, 0.045, 6, 1), { pos: [0, -0.03, 0.085], rot: [Math.PI / 2 + 0.4, 0, 0], color: '#ffb347' });
    for (const s of [-1, 1]) mp(new THREE.ConeGeometry(0.025, 0.07, 6, 1), { pos: [s * 0.085, 0.085, 0.0], rot: [0, 0, s * -0.6], color: darker(base, 0.8) });
    for (let i = 0; i < 4; i++) mp(new THREE.CircleGeometry(0.012, 10), { pos: [(i - 1.5) * 0.028, -0.062, 0.072], flag: flat, color: lighter(base, 0.35) });
  } else if (k === 'hai') {
    mp(box(0.012, 0.09, 0.07), { pos: [0, 0.09, -0.02], rot: [-0.5, 0, 0], color: darker(base, 0.85), deform: (v) => { if (v.y > 0.03) v.z -= 0.03; } });
    for (const s of [-1, 1]) eye(s, '#101018');
    for (let i = 0; i < 5; i++) mp(new THREE.ConeGeometry(0.011, 0.03, 6, 1), { pos: [(i - 2) * 0.03, -0.075, 0.062], rot: [Math.PI, 0, 0], flag: flat, color: '#ffffff' });
    mp(box(0.16, 0.008, 0.02), { pos: [0, -0.06, 0.06], color: lighter(base, 0.5) });
    for (const s of [-1, 1]) for (let i = 0; i < 3; i++) mp(box(0.005, 0.03, 0.01), { pos: [s * (0.075 + i * 0.012), 0.0, 0.05], color: darker(base, 0.7) });
  } else if (k === 'schildkroete') {
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; mp(new THREE.CircleGeometry(0.025, 6), { pos: [Math.cos(a) * 0.06, Math.sin(a) * 0.045, 0.07], flag: flat, color: darker(base, 0.7) }); }
    mp(new THREE.CircleGeometry(0.03, 6), { pos: [0, 0, 0.072], flag: flat, color: darker(base, 0.7) });
    for (const s of [-1, 1]) eye(s * 1.5, '#1d1330');
    mp(sphere(0.03, 12, 9), { pos: [0, -0.07, 0.05], scale: [1.3, 0.8, 1], color: lighter(base, 0.25) });
  } else if (k === 'teddy') {
    for (const s of [-1, 1]) mp(sphere(0.038, 14, 10), { pos: [s * 0.095, 0.075, -0.01], scale: [1, 1, 0.5], color: base });
    for (const s of [-1, 1]) mp(sphere(0.02, 10, 8), { pos: [s * 0.095, 0.075, 0.008], scale: [1, 1, 0.5], color: lighter(base, 0.4) });
    mp(sphere(0.05, 14, 10), { pos: [0, -0.04, 0.055], scale: [1.2, 0.8, 0.8], color: lighter(base, 0.45) });
    mp(sphere(0.018, 10, 8), { pos: [0, -0.025, 0.1], flag: flat, color: '#1d1330' });
    for (const s of [-1, 1]) eye(s, '#1d1330');
  }
}

// ---- Muster: Farbfunktion (x,y,z im Teil-Raum; y = Höhe am Rumpf 0…M.torso, am Arm 0…−0.33, am Bein 0…−0.5) ----
// Kontrast höchstens 25 % (STIL §8.4), damit die Fläche ruhig bleibt.
export function patternColor(cfg, base, { accent, region = 'torso', seed = 1, w = 1 } = {}) {
  const p = cfg.pattern;
  const acc = accent || cfg.patternColor;
  if (!p || p === 'keins') return base;
  const B = new THREE.Color(base), A = new THREE.Color(acc).lerp(B, 0.35);
  const T = M.torso;
  if (p === 'streifen') return (x, y, z, out) => { out.copy(Math.floor((y + 1.0) / 0.075) % 2 ? A : B); };
  if (p === 'verlauf') return (x, y, z, out) => { const t = region === 'torso' ? y / T : region === 'arm' ? 1 + y / 0.34 : 0.5 + y; out.copy(B).lerp(A, Math.max(0, Math.min(1, t))); };
  if (p === 'camo') {
    const C = B.clone().multiplyScalar(0.78), D = B.clone().lerp(A, 0.6);
    return (x, y, z, out) => { const h = qhash(Math.round(x * 7) * 0.17, Math.round(y * 7) * 0.13, Math.round(z * 7) * 0.11, seed); out.copy(h < 0.3 ? C : h < 0.55 ? D : B); };
  }
  if (p === 'batik') {
    return (x, y, z, out) => { const d = Math.hypot(x * 1.4, (y - (region === 'torso' ? T * 0.55 : -0.15)) * 1.1, z * 0.6); const r = 0.5 + 0.5 * Math.sin(d * 34 + qhash(x, y, z, seed) * 1.6); out.copy(B).lerp(A, r * 0.7); };
  }
  if (p === 'leuchtkante') {
    const G = new THREE.Color(acc).multiplyScalar(1.7);    // heller als 1 → leuchtet unter Beleuchtung
    return (x, y, z, out) => {
      const edge = region === 'torso' ? (y < 0.05 || y > T - 0.05 || Math.abs(x) > 0.165) : region === 'arm' ? (y < -0.26 || y > -0.03) : (y < -0.4 || Math.abs(x) > 0.075 * w);
      out.copy(edge ? G : B);
    };
  }
  return base;
}

// ---- Rucksack: Riemen am Rumpf; Körper mit Klappe und Griff als eigenes Teil (schwingt nach) ----
export function buildBackItem(cfg, P, W = 1, { straps = true, body = true } = {}) {
  if (cfg.back !== 'rucksack') return;
  const ac = cfg.backColor;
  if (straps) for (const s of [-1, 1]) {
    const T = M.torso, x = s * 0.1 * W;
    // Tiefe der Rumpffläche an der Riemenposition x (Ellipse), damit der Riemen anliegt
    const zf = (y) => { const r = torsoRadius(y, W); return r.zr * Math.sqrt(Math.max(0.1, 1 - (x / r.xr) ** 2)); };
    // schmale, gedeckte Riemen (kein „Hosenträger“-Look): Akzentfarbe stark abgedunkelt und entsättigt
    const pts = [new THREE.Vector3(x, T * 0.46, zf(T * 0.46) + 0.005), new THREE.Vector3(x, T * 0.74, zf(T * 0.74) + 0.006), new THREE.Vector3(x, T - 0.06, zf(T - 0.06) + 0.005), new THREE.Vector3(x, T + 0.004, 0.0), new THREE.Vector3(x, T - 0.06, -zf(T - 0.06) - 0.005), new THREE.Vector3(x, T * 0.62, -zf(T * 0.62) - 0.01)];
    P.push(fig(tube(pts, pts.map(() => 0.012), { segs: 6, flat: 0.3, flatDir: new THREE.Vector3(0, 0, 1) }), { hull: 0.5, color: mixHex(darker(ac, 0.5), '#3a3a46', 0.5) }));
  }
  if (body) { const b = buildBackpack(cfg, W); b.geo.translate(b.pivot[0], b.pivot[1], b.pivot[2]); P.push(b.geo); }
}
export function buildBackpack(cfg, W = 1) {
  const ac = cfg.backColor;
  const pivot = [0, M.torso * 0.74, -0.09 * W];
  // Geometrie relativ zum Drehpunkt (oben am Rücken)
  const P = [
    fig(new RoundedBoxGeometry(0.26 * W, 0.33, 0.14, 1, 0.04), { pos: [0, -0.15, -0.085], color: (x, y, z, out) => out.set(ac).multiplyScalar(z < -0.05 && y < 0.1 ? 1 : 0.94) }),
    fig(new RoundedBoxGeometry(0.22 * W, 0.11, 0.05, 1, 0.015), { pos: [0, -0.24, -0.15], color: darker(ac, 0.8) }),
    fig(new RoundedBoxGeometry(0.27 * W, 0.1, 0.16, 1, 0.03), { pos: [0, -0.04, -0.09], color: darker(ac, 0.85) }),
    fig(new THREE.TorusGeometry(0.03, 0.007, 5, 10, Math.PI), { pos: [0, 0.015, -0.09], rot: [0, 0, 0], color: darker(ac, 0.6) }),
    fig(box(0.03, 0.02, 0.012), { pos: [0, -0.1, -0.16], smooth: false, color: '#ffffff' }),
  ];
  return { geo: merge(P), pivot };
}

// ---- Crew-Jacke: Futter mit Unterschriften (Bindung ≥ 2, Finale) als kleine Symbole am Revers ----
export function buildJacketLining(cfg, P, W = 1) {
  const j = cfg.jacket || {};
  const lining = j.lining || '#ffe9a8';
  // Revers: flache Keile links und rechts des offenen Reißverschlusses (Futter sichtbar)
  for (const s of [-1, 1]) {
    const T = M.torso, zr = torsoRadius(T - 0.12, W).zr;
    P.push(fig(flat([[s * 0.012, 0.1], [s * 0.075 * W, 0.04], [s * 0.05 * W, -0.06], [s * 0.014, -0.1]]), { pos: [0, T - 0.12, zr + 0.006], rot: [0.08, s * -0.25, 0], flag: FLAG.flat, smooth: false, color: lining }));
  }
  const sig = Array.isArray(j.signatures) ? j.signatures.slice(0, 12) : [];
  sig.forEach((sg, i) => {
    const s = i % 2 ? 1 : -1, k = Math.floor(i / 2);
    const col = (sg && sg.color) || '#ff5d73';
    const yy = M.torso - 0.055 - k * 0.028;
    P.push(fig(new THREE.CylinderGeometry(0.012, 0.012, 0.008, 6, 1), { pos: [s * (0.046 + k * 0.004) * W, yy, torsoRadius(yy, W).zr + 0.012], rot: [Math.PI / 2 + 0.1, 0, s * 0.22], flag: FLAG.flat, color: col }));
  });
}

export { mixHex };

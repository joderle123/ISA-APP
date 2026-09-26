// Kopf (WP16): Gesicht, Augen, Sommersprossen, Vitiligo, 15 Frisuren (inkl. Locs, Flechtzöpfe, Buzz, Kopftuch),
// Brillen (rund, eckig, sport), Hörgeräte, Brauen und Münder. Alles in Kopf-Koordinaten (Drehpunkt = Hals).
import * as THREE from 'three';
import { part, merge } from '../../world/geom.js';
import { M, darker, lighter, mixHex, hash01, rotToNormal } from './base.js';
import { buildHeadItem, buildMask } from './cosmetics.js';

const R = M.headR;

// Haar-Kappe: Kugelsegment, hinten tiefer, vorn eine Stirnkante
function cap(cfg, r, thetaLen, lowBack = 0.1, frontY = 0.05, extra = {}) {
  return part(new THREE.SphereGeometry(r, 14, 9, 0, Math.PI * 2, 0, Math.PI * thetaLen), {
    pos: [0, 0.02, -0.008], scale: [1.0, 1.1, 1.04],
    deform: (v) => {
      if (v.y < 0.05) {
        const f = THREE.MathUtils.smoothstep(v.z / r, -0.1, 0.45);
        v.y = THREE.MathUtils.lerp(v.y - lowBack, Math.max(v.y, frontY), f);
      }
    },
    color: cfg.hair, faceVar: 0.1, seed: 5, ...extra,
  });
}
function fringe(cfg, P, n = 4, tilt = 2.4) {
  for (let i = 0; i < n; i++) {
    const a = (i / (n - 1) - 0.5) * 1.2 + 0.15;
    P.push(part(new THREE.ConeGeometry(0.036, 0.09, 4, 1), { pos: [Math.sin(a) * R * 0.95, 0.075 - Math.abs(a) * 0.02, Math.cos(a) * R * 0.9], rot: [tilt, a, 0], order: 'YXZ', color: cfg.hair }));
  }
}
function sideburns(cfg, P) {
  for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.035, 0.1, 0.1), { pos: [s * R * 0.94, 0.0, -0.02], rot: [0, 0, s * 0.08], color: cfg.hair }));
}

function buildHair(cfg, P) {
  const style = cfg.hairStyle, hair = cfg.hair, acc = cfg.hairAccent;
  switch (style) {
    case 'glatze':
      // nichts: der Kopf ist schon hautfarben; ein leichter Glanz oben
      P.push(part(new THREE.SphereGeometry(R * 1.002, 10, 5, 0, Math.PI * 2, 0, Math.PI * 0.3), { pos: [0, 0.02, -0.008], scale: [1, 1.1, 1.04], color: lighter(cfg.skin, 0.08) }));
      break;
    case 'buzz':
      P.push(cap(cfg, R * 1.012, 0.5, 0.02, 0.055, { faceVar: 0.06 }));
      break;
    case 'afro':
      P.push(part(new THREE.IcosahedronGeometry(R * 1.45, 1), { pos: [0, 0.06, -0.025], jitter: 0.04, seed: 9, color: hair, faceVar: 0.14, deform: (v) => { if (v.z > 0.1 && v.y < 0.07) v.z = 0.1 + (v.z - 0.1) * 0.2; } }));
      break;
    case 'locs': {
      P.push(cap(cfg, R * 1.05, 0.5, 0.05, 0.05, { jitter: 0.015, seed: 21, faceVar: 0.16 }));
      // 14 Strähnen rund um den Kopf, verschieden lang, leicht nach außen
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2 + 0.22;
        if (Math.cos(a) > 0.82) continue;               // vorn bleibt das Gesicht frei
        const len = 0.2 + hash01(i, 3) * 0.14;
        const x = Math.sin(a) * R * 1.02, z = Math.cos(a) * R * 1.02 - 0.01;
        P.push(part(new THREE.CylinderGeometry(0.02, 0.015, len, 4, 1), { pos: [x * 1.06, 0.03 - len / 2, z * 1.06], rot: [-Math.cos(a) * 0.25, 0, Math.sin(a) * 0.25], jitter: 0.008, seed: 30 + i, color: hair, faceVar: 0.2 }));
      }
      // ein paar Perlen an den vorderen Strähnen
      for (const i of [1, 6, 10]) { const a = (i / 14) * Math.PI * 2 + 0.22; P.push(part(new THREE.CylinderGeometry(0.024, 0.024, 0.02, 6, 1), { pos: [Math.sin(a) * R * 1.08, -0.12, Math.cos(a) * R * 1.08 - 0.01], color: acc })); }
      break;
    }
    case 'flechtzoepfe': {
      P.push(cap(cfg, R * 1.03, 0.52, 0.06, 0.05, { faceVar: 0.08 }));
      // Cornrow-Linien über die Kappe
      for (let i = 0; i < 5; i++) {
        const a = (i - 2) * 0.32;
        P.push(part(new THREE.TorusGeometry(R * 1.055, 0.009, 3, 10, Math.PI * 0.9), { pos: [0, 0.02, -0.01], rot: [0, a, Math.PI / 2 + 0.2], scale: [1, 1.1, 1.0], color: darker(hair, 0.75) }));
      }
      // zwei Zöpfe seitlich nach vorn über die Schultern, mit Perle
      for (const s of [-1, 1]) {
        for (let k = 0; k < 5; k++) {
          const y = -0.02 - k * 0.055, x = s * (R * 0.98 + (k % 2 ? 0.012 : -0.012)), z = -0.03 + k * 0.012;
          P.push(part(new THREE.IcosahedronGeometry(0.032 - k * 0.002, 0), { pos: [x, y, z], scale: [1, 1.25, 1], color: hair, faceVar: 0.16, seed: 40 + k }));
        }
        P.push(part(new THREE.CylinderGeometry(0.02, 0.02, 0.025, 6, 1), { pos: [s * R * 0.98, -0.31, 0.03], color: acc }));
      }
      break;
    }
    case 'kopftuch': {
      // Tuch: glatte Haube über dem ganzen Kopf, vorn offen, Drapierung bis zu den Schultern
      const tuch = cfg.headColor;
      P.push(part(new THREE.SphereGeometry(R * 1.13, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.62), { pos: [0, 0.015, -0.012], scale: [1, 1.08, 1.04], color: tuch, faceVar: 0.04, deform: (v) => { if (v.z > R * 0.55 && v.y < 0.09) v.y = Math.max(v.y, 0.09 - (v.z - R * 0.55) * 0.3); } }));
      P.push(part(new THREE.CylinderGeometry(R * 1.12, 0.245, 0.3, 14, 1, true, 0.62, Math.PI * 2 - 1.24), { pos: [0, -0.14, -0.02], scale: [1, 1, 0.92], color: tuch, faceVar: 0.04, jitter: 0.006, seed: 12 }));
      // Stirnkante: schmales Band
      P.push(part(new THREE.TorusGeometry(R * 1.09, 0.012, 4, 14, Math.PI * 1.3), { pos: [0, 0.075, -0.005], rot: [Math.PI / 2 - 0.55, 0, Math.PI * 0.35], color: darker(tuch, 0.85) }));
      break;
    }
    case 'bob':
      P.push(cap(cfg, R * 1.06, 0.56, 0.12, 0.035));
      fringe(cfg, P, 5, 2.5);
      for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.06, 0.26, 0.19), { pos: [s * 0.15, -0.08, -0.03], rot: [0, 0, s * -0.06], jitter: 0.012, seed: 14, color: hair, faceVar: 0.1, deform: (v) => { if (v.y < -0.08) v.z += 0.02; } }));
      P.push(part(new THREE.BoxGeometry(0.27, 0.26, 0.08), { pos: [0, -0.07, -0.13], rot: [0.05, 0, 0], jitter: 0.015, seed: 15, color: hair, faceVar: 0.1 }));
      break;
    case 'undercut':
      P.push(cap(cfg, R * 1.008, 0.5, 0.02, 0.055, { color: darker(hair, 0.55), faceVar: 0.05 }));
      P.push(part(new THREE.SphereGeometry(R * 1.08, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.36), { pos: [0, 0.035, -0.01], scale: [0.92, 1.1, 1.05], color: hair, faceVar: 0.12, jitter: 0.012, seed: 17, deform: (v) => { v.z += 0.015; if (v.z > 0.08) v.y += (v.z - 0.08) * 0.35; } }));
      fringe(cfg, P, 3, 2.1);
      break;
    case 'irokese':
      P.push(cap(cfg, R * 1.008, 0.5, 0.02, 0.055, { color: darker(hair, 0.55), faceVar: 0.05 }));
      for (let i = 0; i < 7; i++) {
        const z = 0.1 - i * 0.036;
        P.push(part(new THREE.ConeGeometry(0.03, 0.15 + Math.sin(i / 6 * Math.PI) * 0.06, 4, 1), { pos: [0, 0.17 + Math.sin(i / 6 * Math.PI) * 0.03, z], rot: [-0.35 + i * 0.09, 0, 0], color: hair, faceVar: 0.1, seed: i }));
      }
      break;
    case 'stachel':
      P.push(cap(cfg, R * 1.05, 0.56, 0.06, 0.035));
      sideburns(cfg, P);
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2;
        const tilt = 0.5 + (i % 2) * 0.25;
        P.push(part(new THREE.ConeGeometry(0.04, 0.14, 4, 1), { pos: [Math.cos(a) * 0.06, 0.15, Math.sin(a) * 0.06 - 0.01], rot: [Math.sin(a) * tilt - 0.35, 0, -Math.cos(a) * tilt], color: hair }));
      }
      break;
    case 'locken':
      P.push(cap(cfg, R * 1.05, 0.56, 0.1, 0.035));
      fringe(cfg, P);
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2, y = 0.03 + (i % 3) * 0.045;
        P.push(part(new THREE.IcosahedronGeometry(0.045, 0), { pos: [Math.cos(a) * R * 0.95, y, Math.sin(a) * R * 0.95 - 0.01], color: hair, faceVar: 0.2, seed: i }));
      }
      break;
    case 'lang':
      P.push(cap(cfg, R * 1.05, 0.56, 0.1, 0.035));
      fringe(cfg, P);
      // Rückenhaar: gerundete Bahn um den Hinterkopf bis auf die Schultern, vorn zwei Strähnen
      P.push(part(new THREE.CylinderGeometry(R * 1.08, R * 1.0, 0.36, 12, 2, true, Math.PI * 0.6, Math.PI * 0.8), { pos: [0, -0.12, -0.012], scale: [1, 1, 1.02], jitter: 0.012, seed: 2, color: hair, faceVar: 0.1, deform: (v) => { if (v.y < -0.2) v.z -= (-0.2 - v.y) * 0.25; } }));
      for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.04, 0.26, 0.085, 1, 2, 1), { pos: [s * 0.138, -0.09, -0.005], rot: [0, 0, s * -0.04], color: hair, faceVar: 0.08, deform: (v) => { if (v.y < -0.05) { v.z *= 0.75; v.x *= 0.8; } } }));
      break;
    case 'zopf':
      P.push(cap(cfg, R * 1.05, 0.56, 0.06, 0.035));
      fringe(cfg, P);
      sideburns(cfg, P);
      P.push(part(new THREE.ConeGeometry(0.05, 0.26, 6, 1), { pos: [0, -0.04, -0.22], rot: [-2.5, 0, 0], color: hair }));
      P.push(part(new THREE.TorusGeometry(0.03, 0.012, 4, 8), { pos: [0, 0.04, -0.17], rot: [0.9, 0, 0], color: acc }));
      break;
    case 'dutt':
      P.push(cap(cfg, R * 1.05, 0.56, 0.06, 0.035));
      fringe(cfg, P);
      sideburns(cfg, P);
      P.push(part(new THREE.IcosahedronGeometry(0.065, 1), { pos: [0, 0.17, -0.06], color: hair, faceVar: 0.1 }));
      P.push(part(new THREE.TorusGeometry(0.05, 0.01, 4, 8), { pos: [0, 0.13, -0.05], rot: [0.6, 0, 0], color: acc }));
      break;
    case 'kurz':
    default:
      P.push(cap(cfg, R * 1.05, 0.56, 0.06, 0.035));
      fringe(cfg, P);
      sideburns(cfg, P);
  }
}

// Sommersprossen und Vitiligo als flache Flecken auf der Kopfkugel
function surfacePatch(geo, ax, ay, az, radius, color, extra = {}) {
  const n = new THREE.Vector3(ax, ay, az).normalize();
  const p = n.clone().multiplyScalar(radius);
  return part(geo, { pos: [p.x, p.y, p.z], rot: rotToNormal(n.x, n.y, n.z), color, ...extra });
}
function buildSkinMarks(cfg, P) {
  const skin = cfg.skin;
  const freck = Number(cfg.freckles) || 0;
  if (freck > 0) {
    const col = darker(skin, 0.72);
    const n = freck >= 2 ? 11 : 6;
    for (const s of [-1, 1]) for (let i = 0; i < n; i++) {
      const u = hash01(i, 7 + s), v = hash01(i, 19 + s);
      const ax = s * (0.35 + u * 0.4), ay = -0.16 - v * 0.22, az = 0.78 - u * 0.2;
      P.push(surfacePatch(new THREE.CircleGeometry(0.0055 + hash01(i, 5) * 0.003, 4), ax, ay, az, R * 1.005, col));
    }
  }
  if (cfg.vitiligo) {
    const col = mixHex(skin, '#f8ede2', 0.7);
    const spots = [[0.55, 0.45, 0.7, 0.03], [-0.7, 0.1, 0.65, 0.026], [0.2, -0.6, 0.72, 0.022], [-0.35, 0.75, 0.5, 0.024], [0.85, -0.2, 0.35, 0.02]];
    spots.forEach(([ax, ay, az, r], i) => P.push(surfacePatch(new THREE.CircleGeometry(r, 7), ax, ay * 1.05, az, R * 1.006, col, { jitter: 0.008, seed: 60 + i })));
  }
}

function buildGlassesFrame(cfg, P) {
  const g = cfg.glasses, c = cfg.glassesColor;
  if (!g || g === 'keine') return;
  const temple = (s) => P.push(part(new THREE.BoxGeometry(0.008, 0.008, 0.15), { pos: [s * 0.1, 0.012, R * 0.45], rot: [0, s * 0.1, 0], color: c }));
  if (g === 'rund') {
    for (const s of [-1, 1]) P.push(part(new THREE.TorusGeometry(0.037, 0.007, 4, 12), { pos: [s * 0.056, 0.008, R * 0.98], color: c }));
    P.push(part(new THREE.BoxGeometry(0.04, 0.008, 0.008), { pos: [0, 0.012, R * 0.99], color: c }));
    temple(-1); temple(1);
  } else if (g === 'eckig') {
    for (const s of [-1, 1]) {
      const cx = s * 0.057;
      P.push(part(new THREE.BoxGeometry(0.074, 0.009, 0.009), { pos: [cx, 0.033, R * 0.98], color: c }));
      P.push(part(new THREE.BoxGeometry(0.074, 0.009, 0.009), { pos: [cx, -0.02, R * 0.98], color: c }));
      P.push(part(new THREE.BoxGeometry(0.009, 0.06, 0.009), { pos: [cx - 0.034, 0.006, R * 0.98], color: c }));
      P.push(part(new THREE.BoxGeometry(0.009, 0.06, 0.009), { pos: [cx + 0.034, 0.006, R * 0.98], color: c }));
    }
    P.push(part(new THREE.BoxGeometry(0.03, 0.008, 0.008), { pos: [0, 0.02, R * 0.99], color: c }));
    temple(-1); temple(1);
  } else if (g === 'sport') {
    P.push(part(new THREE.TorusGeometry(R * 1.02, 0.011, 4, 16, Math.PI * 0.86), { pos: [0, 0.03, -0.005], rot: [Math.PI / 2, 0, Math.PI * 0.07], color: c }));
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.01, 0.01, 0.12), { pos: [s * R * 0.99, 0.02, R * 0.3], color: c }));
  }
}
// Gläser als eigene, durchsichtige Geometrie (Material: Glas)
export function buildLenses(cfg) {
  const g = cfg.glasses;
  if (!g || g === 'keine') return null;
  const P = [];
  if (g === 'rund') for (const s of [-1, 1]) P.push(part(new THREE.CircleGeometry(0.034, 10), { pos: [s * 0.056, 0.008, R * 0.975], color: '#dff3ff' }));
  else if (g === 'eckig') for (const s of [-1, 1]) P.push(part(new THREE.PlaneGeometry(0.066, 0.048), { pos: [s * 0.057, 0.006, R * 0.975], color: '#dff3ff' }));
  else P.push(part(new THREE.SphereGeometry(R * 1.015, 14, 5, Math.PI * 0.1, Math.PI * 0.8, Math.PI * 0.4, Math.PI * 0.18), { pos: [0, 0.03, -0.005], color: '#6a5cff' }));
  return merge(P);
}

function buildHearingAids(cfg, P) {
  const h = cfg.hearingAid;
  if (!h || h === 'keins') return;
  const sides = h === 'beide' ? [-1, 1] : h === 'links' ? [1] : [-1];
  const c = cfg.aidColor;
  for (const s of sides) {
    // Bügel hinter dem Ohr, Hörer im Ohr, kleines Licht
    P.push(part(new THREE.TorusGeometry(0.026, 0.008, 4, 9, Math.PI), { pos: [s * R * 1.0, 0.012, -0.03], rot: [0, Math.PI / 2, 0], scale: [1, 1.2, 1], color: c }));
    P.push(part(new THREE.BoxGeometry(0.012, 0.02, 0.014), { pos: [s * R * 0.99, -0.006, 0.002], color: darker(c, 0.7) }));
    P.push(part(new THREE.BoxGeometry(0.006, 0.006, 0.006), { pos: [s * R * 1.03, 0.02, -0.045], color: lighter(c, 0.6) }));
  }
}

export function buildHead(cfg) {
  const P = [];
  const skin = cfg.skin;
  // Kopf: leicht ovales Gesicht mit schmalerem Kinn
  P.push(part(new THREE.IcosahedronGeometry(R, 2), {
    scale: [0.95, 1.12, 0.98], color: skin,
    deform: (v) => { if (v.y < 0) { const k = 1 - (-v.y / R) * 0.16; v.x *= k; v.z = v.z * (0.92 + 0.08 * k); } },
  }));
  // Ohren
  for (const s of [-1, 1]) P.push(part(new THREE.IcosahedronGeometry(0.036, 0), { pos: [s * R * 0.96, -0.005, -0.01], scale: [0.5, 1, 0.8], color: skin }));
  // Nase
  P.push(part(new THREE.ConeGeometry(0.02, 0.05, 4, 1), { pos: [0, -0.02, R * 0.97], rot: [Math.PI / 2, 0, 0], color: darker(skin, 0.9) }));
  // Augen: mandelförmig, Iris, kleiner Glanz, schattiges Lid
  for (const s of [-1, 1]) {
    P.push(part(new THREE.SphereGeometry(0.03, 10, 8), { pos: [s * 0.055, 0.004, R * 0.9], scale: [1.05, 0.6, 0.35], color: '#ffffff' }));
    P.push(part(new THREE.SphereGeometry(0.024, 10, 8), { pos: [s * 0.054, 0.003, R * 0.925], scale: [1, 0.8, 0.35], color: cfg.eyes }));
    P.push(part(new THREE.SphereGeometry(0.006, 6, 4), { pos: [s * 0.054 + 0.007, 0.011, R * 0.955], color: '#ffffff' }));
    P.push(part(new THREE.BoxGeometry(0.062, 0.006, 0.02), { pos: [s * 0.055, 0.024, R * 0.92], rot: [0.3, 0, 0], color: darker(skin, 0.86) }));
  }
  buildSkinMarks(cfg, P);
  buildHair(cfg, P);
  buildGlassesFrame(cfg, P);
  buildHearingAids(cfg, P);
  if (cfg.hairStyle !== 'kopftuch') buildHeadItem(cfg, P);
  else if (cfg.head === 'kopfhoerer') buildHeadItem(cfg, P);
  if (cfg.mask && cfg.mask !== 'keine') buildMask(cfg, P);
  return merge(P);
}

// Brauen und Münder als eigene Meshes (für Ausdruck)
export function buildBrow(cfg, s) {
  const st = cfg.brows || 'normal';
  const w = st === 'schmal' ? 0.048 : st === 'stark' ? 0.06 : 0.052;
  const h = st === 'schmal' ? 0.007 : st === 'stark' ? 0.017 : 0.011;
  const col = st === 'stark' ? darker(cfg.hair, 0.7) : darker(cfg.hair, 0.8);
  return part(new THREE.BoxGeometry(w, h, 0.018, 3, 1, 1), {
    color: col,
    deform: (v) => {
      if (v.x * s > 0) v.y *= 0.7;
      if (st === 'geschwungen') v.y += (1 - Math.abs(v.x / (w / 2))) * 0.008;
    },
  });
}
export function buildMouth(cfg, kind) {
  const c = darker(cfg.skin, 0.62);
  if (kind === 'neutral') return part(new THREE.BoxGeometry(0.038, 0.007, 0.01), { color: c });
  return part(new THREE.TorusGeometry(0.024, 0.006, 3, 8, Math.PI), { rot: [0, 0, kind === 'smile' ? Math.PI : 0], scale: [1, 0.55, 1], color: c });
}

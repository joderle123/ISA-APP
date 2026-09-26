// Körper (WP16): Rumpf mit 7 Oberteil-Stilen, Becken/Beine mit 5 Unterteil-Stilen, 4 Schuh-Stilen, Arme mit
// Ärmeln oder Haut, Hände (offen, Faust, Daumen), Armprothese, Statur-Faktor W, Muster als Farbfunktionen,
// Rucksack, Crew-Jacke mit Futter, Aufnäher auf Rücken und Ärmeln. Alle Teile in Gelenk-Koordinaten.
import * as THREE from 'three';
import { part, merge } from '../../world/geom.js';
import { M, darker, lighter, mixHex, buildWidth } from './base.js';
import { patternColor, buildBackItem, buildJacketLining } from './cosmetics.js';
import { buildPatchParts } from './patches.js';

const LONG_SLEEVE = new Set(['hoodie', 'jacke', 'hemd', 'pullover', 'crewjacke']);
export const hasLongSleeves = (style) => LONG_SLEEVE.has(style);

// ---- Rumpf ----
export function buildTorso(cfg, W = buildWidth(cfg.build)) {
  const P = [];
  const T = M.torso, style = cfg.topStyle, top = cfg.top, dark = darker(top, 0.82);
  const patCol = patternColor(cfg, top, { region: 'torso', w: W });
  const tank = style === 'tanktop';
  // Rumpf: schmal, oben breiter (Schultern); beim Tanktop oben Haut
  P.push(part(new THREE.CylinderGeometry(0.175, 0.145, T, 8, 3), {
    pos: [0, T / 2, 0], scale: [1.25 * W, 1, 0.74 * W], faceVar: 0.05, seed: 11,
    color: tank ? (x, y, z, out) => { out.set(y > T - 0.12 ? cfg.skin : top); if (typeof patCol === 'function' && y <= T - 0.12) patCol(x, y, z, out); } : patCol,
    deform: (v) => { if (v.y > 0.12) v.x *= 1 + (v.y - 0.12) * 0.35; },
  }));
  // Schultern
  for (const s of [-1, 1]) P.push(part(new THREE.IcosahedronGeometry(0.084, 1), { pos: [s * 0.205 * W, T - 0.055, 0], scale: [1.1 * W, 0.8, W], color: tank ? cfg.skin : top }));
  // Hals
  P.push(part(new THREE.CylinderGeometry(0.052, 0.06, 0.13, 7, 1), { pos: [0, T + 0.035, 0], color: cfg.skin }));
  if (cfg.vitiligo) P.push(part(new THREE.CircleGeometry(0.02, 6), { pos: [0.035, T + 0.04, 0.05], rot: [0, 0.6, 0], color: mixHex(cfg.skin, '#f8ede2', 0.7) }));
  if (style === 'hoodie') {
    P.push(part(new THREE.TorusGeometry(0.105, 0.045, 5, 10), { pos: [0, T + 0.005, -0.05], rot: [Math.PI / 2 + 0.4, 0, 0], scale: [1.25 * W, 1, 1], color: dark }));
    if (cfg.head !== 'kapuze') P.push(part(new THREE.BoxGeometry(0.2 * W, 0.12, 0.07), { pos: [0, T - 0.03, -0.14 * W], rot: [0.5, 0, 0], jitter: 0.01, seed: 8, color: dark }));
    P.push(part(new THREE.BoxGeometry(0.2 * W, 0.09, 0.025), { pos: [0, 0.12, 0.12 * W], color: dark }));
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.012, 0.13, 0.012), { pos: [s * 0.035, T - 0.12, 0.135 * W], color: '#ffffff' }));
    P.push(part(new THREE.CylinderGeometry(0.15, 0.15, 0.045, 8, 1), { pos: [0, 0.015, 0], scale: [1.2 * W, 1, 0.74 * W], color: dark }));
  } else if (style === 'tshirt') {
    P.push(part(new THREE.TorusGeometry(0.062, 0.014, 3, 10), { pos: [0, T - 0.01, 0.01], rot: [Math.PI / 2, 0, 0], color: dark }));
    if (!cfg.pattern || cfg.pattern === 'keins') P.push(part(new THREE.CylinderGeometry(0.045, 0.045, 0.014, 5, 1), { pos: [0, T * 0.62, 0.125 * W], rot: [Math.PI / 2, 0, 0], color: cfg.patternColor || '#ffffff' }));
  } else if (style === 'tanktop') {
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.04, 0.16, 0.02), { pos: [s * 0.1 * W, T - 0.08, 0.08 * W], rot: [0.25, 0, s * -0.12], color: top }));
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.04, 0.16, 0.02), { pos: [s * 0.1 * W, T - 0.08, -0.08 * W], rot: [-0.25, 0, s * -0.12], color: top }));
  } else if (style === 'jacke' || style === 'crewjacke') {
    const crew = style === 'crewjacke';
    const inner = crew ? (cfg.jacket && cfg.jacket.shirt) || '#f2ede3' : '#e9e4dc';
    // offener Reißverschluss: Streifen innen + Zipper
    P.push(part(new THREE.BoxGeometry(0.06, T - 0.1, 0.02), { pos: [0, T / 2 - 0.02, 0.135 * W], color: inner }));
    P.push(part(new THREE.BoxGeometry(0.012, T - 0.14, 0.01), { pos: [0.032, T / 2 - 0.03, 0.15 * W], color: '#d8dbe4' }));
    // Kragen
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(crew ? 0.12 : 0.09, crew ? 0.06 : 0.045, 0.02), { pos: [s * 0.075 * W, T - 0.005, 0.06 * W], rot: [0.5, s * -0.55, s * 0.15], color: crew ? darker(top, 0.7) : dark }));
    if (crew) {
      // Brustband und Bündchen in der Akzentfarbe, Ärmel-Streifen kommen am Oberarm
      const ac = cfg.patternColor || '#ffffff';
      P.push(part(new THREE.CylinderGeometry(0.168, 0.16, 0.05, 8, 1), { pos: [0, T * 0.66, 0], scale: [1.27 * W, 1, 0.76 * W], color: ac, deform: (v) => { if (v.y > 0.12) v.x *= 1 + (v.y - 0.12) * 0.35; } }));
      P.push(part(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 8, 1), { pos: [0, 0.02, 0], scale: [1.21 * W, 1, 0.75 * W], color: darker(top, 0.7) }));
      buildJacketLining(cfg, P, W);
    } else {
      P.push(part(new THREE.CylinderGeometry(0.15, 0.15, 0.04, 8, 1), { pos: [0, 0.015, 0], scale: [1.2 * W, 1, 0.74 * W], color: dark }));
    }
  } else if (style === 'hemd') {
    P.push(part(new THREE.BoxGeometry(0.036, T - 0.08, 0.012), { pos: [0, T / 2 - 0.02, 0.138 * W], color: lighter(top, 0.1) }));
    for (let i = 0; i < 4; i++) P.push(part(new THREE.CylinderGeometry(0.009, 0.009, 0.008, 5, 1), { pos: [0, 0.12 + i * 0.1, 0.146 * W], rot: [Math.PI / 2, 0, 0], color: '#f7f2e8' }));
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.08, 0.04, 0.015), { pos: [s * 0.06 * W, T - 0.01, 0.065 * W], rot: [0.55, s * -0.6, s * 0.2], color: lighter(top, 0.1) }));
  } else if (style === 'pullover') {
    P.push(part(new THREE.TorusGeometry(0.07, 0.02, 4, 10), { pos: [0, T - 0.005, 0.005], rot: [Math.PI / 2, 0, 0], color: dark }));
    P.push(part(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 8, 1), { pos: [0, 0.02, 0], scale: [1.2 * W, 1, 0.74 * W], color: dark, faceVar: 0.1, seed: 19 }));
  }
  buildBackItem(cfg, P, W);
  if (cfg.patches && cfg.patches.length && cfg.back !== 'rucksack') P.push(...buildPatchParts(cfg.patches, 'back', W));
  return merge(P);
}

// ---- Becken und Beine ----
export function buildPelvis(cfg, W = buildWidth(cfg.build)) {
  const P = [
    part(new THREE.CylinderGeometry(0.15, 0.145, 0.2, 8, 1), { pos: [0, 0.0, 0], scale: [1.2 * W, 1, 0.76 * W], color: cfg.bottoms }),
    part(new THREE.CylinderGeometry(0.152, 0.152, 0.035, 8, 1), { pos: [0, 0.085, 0], scale: [1.2 * W, 1, 0.76 * W], color: darker(cfg.bottoms, 0.7) }),
  ];
  if (cfg.bottomsStyle === 'rock') {
    P.push(part(new THREE.CylinderGeometry(0.17, 0.25, 0.24, 10, 1, true), { pos: [0, -0.18, 0], scale: [1.15 * W, 1, 0.8 * W], color: patternColor(cfg, cfg.bottoms, { region: 'leg', w: W }), faceVar: 0.06, seed: 27 }));
    P.push(part(new THREE.TorusGeometry(0.25, 0.012, 3, 10), { pos: [0, -0.3, 0], rot: [Math.PI / 2, 0, 0], scale: [1.15 * W, 0.8 * W, 1], color: darker(cfg.bottoms, 0.75) }));
  }
  return merge(P);
}
export function buildThigh(cfg, side, W = buildWidth(cfg.build)) {
  const st = cfg.bottomsStyle, s = side ? -1 : 1;
  const short = st === 'kurz', skirt = st === 'rock';
  const col = skirt ? cfg.skin : short ? (x, y, z, out) => out.set(y > -0.27 ? cfg.bottoms : cfg.skin) : cfg.bottoms;
  const P = [part(new THREE.CylinderGeometry(0.085 * W, 0.07 * W, M.thigh + 0.05, 8, 1), { pos: [0, -M.thigh / 2, 0], color: col })];
  if (short) P.push(part(new THREE.CylinderGeometry(0.076 * W, 0.076 * W, 0.03, 8, 1), { pos: [0, -0.27, 0], color: darker(cfg.bottoms, 0.75) }));
  if (st === 'cargo') P.push(part(new THREE.BoxGeometry(0.03, 0.11, 0.09), { pos: [s * 0.078 * W, -0.26, 0.01], color: darker(cfg.bottoms, 0.85), jitter: 0.006, seed: 31 }));
  if (st === 'jogger') P.push(part(new THREE.BoxGeometry(0.012, M.thigh, 0.02), { pos: [s * 0.08 * W, -M.thigh / 2, 0], color: cfg.patternColor || '#ffffff' }));
  return merge(P);
}
export function buildShin(cfg, side, W = buildWidth(cfg.build)) {
  const st = cfg.bottomsStyle, sh = cfg.shoesStyle, s = side ? -1 : 1;
  const bare = st === 'kurz' || st === 'rock';
  const lower = bare ? cfg.skin : cfg.bottoms;
  const shoes = cfg.shoes, acc = cfg.shoesAccent, L = M.shin;
  const P = [part(new THREE.CylinderGeometry(0.068 * W, 0.054 * W, L, 8, 1), { pos: [0, -L / 2, 0], color: lower })];
  if (st === 'jogger') {
    P.push(part(new THREE.BoxGeometry(0.012, L - 0.05, 0.02), { pos: [s * 0.062 * W, -L / 2, 0], color: cfg.patternColor || '#ffffff' }));
    P.push(part(new THREE.CylinderGeometry(0.058 * W, 0.058 * W, 0.045, 8, 1), { pos: [0, -L + 0.04, 0], color: darker(cfg.bottoms, 0.72) }));
  }
  if (bare && st === 'kurz') P.push(part(new THREE.CylinderGeometry(0.055 * W, 0.055 * W, 0.045, 7, 1), { pos: [0, -L + 0.06, 0], color: '#ffffff' }));
  if (sh === 'boots') {
    P.push(part(new THREE.CylinderGeometry(0.07 * W, 0.066 * W, 0.16, 8, 1), { pos: [0, -L + 0.06, 0.005], color: shoes, faceVar: 0.06, seed: 3 + side }));
    P.push(part(new THREE.BoxGeometry(0.125 * W, 0.09, 0.25), { pos: [0, -L - 0.015, 0.04], jitter: 0.01, seed: 3 + side, color: shoes }));
    P.push(part(new THREE.IcosahedronGeometry(0.066, 1), { pos: [0, -L - 0.02, 0.15], scale: [0.95 * W, 0.7, 0.9], color: shoes }));
    P.push(part(new THREE.BoxGeometry(0.14 * W, 0.045, 0.3), { pos: [0, -L - 0.06, 0.06], color: darker(shoes, 0.5) }));
    for (let i = 0; i < 3; i++) P.push(part(new THREE.BoxGeometry(0.06, 0.008, 0.008), { pos: [0, -L + 0.1 - i * 0.04, 0.062], color: acc }));
  } else if (sh === 'sandalen') {
    P.push(part(new THREE.IcosahedronGeometry(0.06, 1), { pos: [0, -L - 0.02, 0.08], scale: [0.95 * W, 0.55, 1.6], color: cfg.skin }));
    P.push(part(new THREE.BoxGeometry(0.13 * W, 0.03, 0.28), { pos: [0, -L - 0.05, 0.06], color: shoes }));
    P.push(part(new THREE.BoxGeometry(0.135 * W, 0.014, 0.03), { pos: [0, -L - 0.02, 0.11], color: acc }));
    P.push(part(new THREE.BoxGeometry(0.135 * W, 0.014, 0.03), { pos: [0, -L - 0.015, 0.0], color: acc }));
  } else if (sh === 'high') {
    P.push(part(new THREE.CylinderGeometry(0.066 * W, 0.064 * W, 0.11, 8, 1), { pos: [0, -L + 0.04, 0.008], color: shoes }));
    P.push(part(new THREE.BoxGeometry(0.125 * W, 0.09, 0.25), { pos: [0, -L - 0.015, 0.04], jitter: 0.012, seed: 3 + side, color: shoes }));
    P.push(part(new THREE.IcosahedronGeometry(0.068, 1), { pos: [0, -L - 0.02, 0.15], scale: [0.95 * W, 0.7, 0.9], color: acc }));
    P.push(part(new THREE.BoxGeometry(0.135 * W, 0.035, 0.29), { pos: [0, -L - 0.055, 0.06], color: '#f4f1ea' }));
    P.push(part(new THREE.BoxGeometry(0.05, 0.1, 0.02), { pos: [0, -L + 0.06, 0.07], rot: [-0.3, 0, 0], color: acc }));
    P.push(part(new THREE.CylinderGeometry(0.014, 0.014, 0.008, 6, 1), { pos: [s * 0.062 * W, -L + 0.05, 0.01], rot: [0, 0, Math.PI / 2], color: '#ffffff' }));
  } else {
    // Sneaker (Standard)
    P.push(part(new THREE.BoxGeometry(0.125 * W, 0.09, 0.25), { pos: [0, -L - 0.015, 0.04], jitter: 0.012, seed: 3 + side, color: shoes }));
    P.push(part(new THREE.IcosahedronGeometry(0.068, 1), { pos: [0, -L - 0.02, 0.15], scale: [0.95 * W, 0.7, 0.9], color: shoes }));
    P.push(part(new THREE.BoxGeometry(0.135 * W, 0.035, 0.29), { pos: [0, -L - 0.055, 0.06], color: darker(shoes, 0.6) }));
    P.push(part(new THREE.BoxGeometry(0.13 * W, 0.012, 0.27), { pos: [0, -L - 0.036, 0.06], color: acc }));
  }
  return merge(P);
}

// ---- Arme ----
export function buildUpperArm(cfg, side, W = buildWidth(cfg.build)) {
  const st = cfg.topStyle, s = side ? -1 : 1;
  const L = M.upperArm + 0.04;
  const patCol = patternColor(cfg, cfg.top, { region: 'arm', w: W });
  let col;
  if (st === 'tanktop') col = cfg.skin;
  else if (st === 'tshirt') col = (x, y, z, out) => { if (y > -0.16) { out.set(cfg.top); if (typeof patCol === 'function') patCol(x, y, z, out); } else out.set(cfg.skin); };
  else col = patCol;
  const P = [part(new THREE.CylinderGeometry(0.064 * W, 0.055 * W, L, 8, 1), { pos: [0, -M.upperArm / 2, 0], color: col })];
  if (st === 'tshirt') P.push(part(new THREE.CylinderGeometry(0.062 * W, 0.062 * W, 0.02, 8, 1), { pos: [0, -0.16, 0], color: darker(cfg.top, 0.82) }));
  if (st === 'crewjacke') for (let i = 0; i < 2; i++) P.push(part(new THREE.CylinderGeometry(0.066 * W, 0.064 * W, 0.022, 8, 1), { pos: [0, -0.16 - i * 0.045, 0], color: cfg.patternColor || '#ffffff' }));
  if (cfg.patches && cfg.patches.length) P.push(...buildPatchParts(cfg.patches, side ? 'armR' : 'armL', W));
  return merge(P);
}
export function buildForearm(cfg, side, W = buildWidth(cfg.build)) {
  const s = side ? -1 : 1, L = M.forearm;
  const pro = cfg.prosthesis === (side ? 'rechts' : 'links');
  if (pro) return buildProsthesisForearm(cfg, W);
  const sleeve = hasLongSleeves(cfg.topStyle) ? cfg.top : cfg.skin;
  const P = [part(new THREE.CylinderGeometry(0.055 * W, 0.046 * W, L, 8, 1), { pos: [0, -L / 2, 0], color: sleeve })];
  if (cfg.topStyle === 'hoodie' || cfg.topStyle === 'pullover' || cfg.topStyle === 'crewjacke') P.push(part(new THREE.CylinderGeometry(0.05 * W, 0.05 * W, 0.04, 8, 1), { pos: [0, -L + 0.03, 0], color: cfg.topStyle === 'crewjacke' ? cfg.patternColor || '#ffffff' : darker(cfg.top, 0.82) }));
  if (cfg.topStyle === 'hemd') P.push(part(new THREE.CylinderGeometry(0.051 * W, 0.049 * W, 0.03, 8, 1), { pos: [0, -L + 0.02, 0], color: lighter(cfg.top, 0.15) }));
  if (cfg.vitiligo && sleeve === cfg.skin) P.push(part(new THREE.CircleGeometry(0.018, 6), { pos: [s * 0.05 * W, -0.12, 0.01], rot: [0, s * Math.PI / 2, 0], color: mixHex(cfg.skin, '#f8ede2', 0.7) }));
  return merge(P);
}
// Prothese: Schaft in Prothesenfarbe, dunkle Manschette am Ellbogen, leuchtende Naht, Handgelenk-Kugel
function buildProsthesisForearm(cfg, W) {
  const L = M.forearm, pc = cfg.prosthesisColor, dark = '#2a2a33', glow = new THREE.Color(cfg.aidColor).multiplyScalar(1.6);
  return merge([
    part(new THREE.CylinderGeometry(0.06 * W, 0.056 * W, 0.06, 8, 1), { pos: [0, -0.03, 0], color: dark }),
    part(new THREE.CylinderGeometry(0.05 * W, 0.04 * W, L - 0.07, 8, 1), { pos: [0, -L / 2 - 0.02, 0], color: pc, faceVar: 0.05, seed: 44 }),
    part(new THREE.TorusGeometry(0.046 * W, 0.006, 3, 10), { pos: [0, -0.12, 0], rot: [Math.PI / 2, 0, 0], color: glow }),
    part(new THREE.BoxGeometry(0.014, L - 0.12, 0.012), { pos: [0, -L / 2 - 0.02, 0.045 * W], color: dark }),
    part(new THREE.IcosahedronGeometry(0.03 * W, 1), { pos: [0, -L + 0.005, 0], color: dark }),
  ]);
}

// ---- Hände (am Handgelenk, y = 0): offen, Faust, Daumen hoch; Prothesen-Greifer ----
export function buildHand(cfg, side, kind = 'open', W = buildWidth(cfg.build)) {
  const s = side ? -1 : 1;
  const pro = cfg.prosthesis === (side ? 'rechts' : 'links');
  if (pro) {
    const pc = cfg.prosthesisColor, dark = '#2a2a33', tip = new THREE.Color(cfg.aidColor).multiplyScalar(1.4);
    const P = [part(new THREE.BoxGeometry(0.075 * W, 0.06, 0.05), { pos: [0, -0.035, 0], color: pc })];
    if (kind === 'fist') {
      P.push(part(new THREE.BoxGeometry(0.07 * W, 0.05, 0.04), { pos: [0, -0.085, 0.01], color: dark }));
    } else {
      // zwei Finger und Daumen als Greifer (leicht geöffnet)
      for (const k of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.026, 0.07, 0.022), { pos: [k * 0.02 * W, -0.095, 0.01 + (kind === 'open' ? 0 : 0)], rot: [kind === 'stop' ? 0.2 : -0.1, 0, k * -0.12], color: dark }));
      P.push(part(new THREE.BoxGeometry(0.022, 0.06, 0.022), { pos: [0, -0.075, 0.04], rot: [kind === 'thumb' ? -1.2 : -0.5, 0, 0], color: dark }));
      for (const k of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.02, 0.012, 0.016), { pos: [k * 0.02 * W, -0.128, 0.008], color: tip }));
    }
    return merge(P);
  }
  const skin = cfg.skin;
  if (kind === 'fist') {
    return merge([
      part(new THREE.IcosahedronGeometry(0.058, 1), { pos: [0, -0.05, 0.004], scale: [0.85 * W, 0.8, 0.95], color: skin }),
      part(new THREE.BoxGeometry(0.07 * W, 0.02, 0.02), { pos: [0, -0.052, 0.05], color: darker(skin, 0.92) }),
      part(new THREE.IcosahedronGeometry(0.022, 0), { pos: [s * 0.03, -0.04, 0.045], color: skin }),
    ]);
  }
  if (kind === 'thumb') {
    return merge([
      part(new THREE.IcosahedronGeometry(0.058, 1), { pos: [0, -0.05, 0.004], scale: [0.85 * W, 0.8, 0.95], color: skin }),
      part(new THREE.CylinderGeometry(0.014, 0.017, 0.07, 6, 1), { pos: [0, -0.03, 0.06], rot: [-Math.PI / 2 + 0.2, 0, 0], color: skin }),
    ]);
  }
  const P = [
    part(new THREE.IcosahedronGeometry(0.06, 1), { pos: [0, -0.045, 0.004], scale: [0.8 * W, 1.15, 0.7], color: skin }),
    part(new THREE.IcosahedronGeometry(0.024, 0), { pos: [s * 0.03, -0.03, 0.03], color: skin }),
  ];
  if (cfg.vitiligo && !side) P.push(part(new THREE.CircleGeometry(0.014, 6), { pos: [0, -0.04, 0.046], color: mixHex(skin, '#f8ede2', 0.7) }));
  return merge(P);
}

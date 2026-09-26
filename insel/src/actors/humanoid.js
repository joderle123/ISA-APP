// Prozedurale Low-Poly-Figur im Teen-Stil (~6,3 Kopfhöhen, schlank, kantig) mit prozeduralen Animationen
// und Gesichtsausdruck (Brauen, Mund).
// createHumanoid(config, { veil, name }) → { group, setAnim(name), update(dt), setMoveSpeed(v),
//   setEmotionAura(color|null), setConfig(cfg), setExpression({ brows, mouth, raise } | null) }
// Blickrichtung der Figur: +z. Füße bei y = 0. Höhe ≈ 1,9 m.
import * as THREE from 'three';
import { part, merge } from '../world/geom.js';

export const SKIN_TONES = ['#f9d7b9', '#f0c09a', '#d9a178', '#b97d57', '#8e5b3c', '#5f3c28'];
export const HAIR_STYLES = ['kurz', 'lang', 'zopf', 'dutt', 'afro', 'stachel', 'locken', 'glatze'];
export const ACCESSORIES = ['keins', 'cap', 'muetze', 'kopfhoerer', 'rucksack', 'brille'];
export const ANIMS = ['idle', 'walk', 'run', 'jump', 'fall', 'wave', 'talk', 'cheer', 'sad', 'angry', 'sit', 'think'];

export const DEFAULT_CONFIG = {
  skin: '#f0c09a',
  hair: '#3b2a20',
  hairStyle: 'kurz',
  eyes: '#2b1d2e',
  top: '#ff5d73',
  topStyle: 'hoodie',     // 'hoodie' | 'tshirt'
  bottoms: '#2f4a7a',
  bottomsStyle: 'lang',   // 'lang' | 'kurz'
  shoes: '#ffffff',
  accessory: 'keins',
  accessoryColor: '#ffd166',
  scale: 1,
};

const MATS = new Map();
function getMaterial(veil) {
  const k = veil ? 'v' : 'n';
  if (!MATS.has(k)) {
    const m = new THREE.MeshLambertMaterial({ vertexColors: true });
    if (veil) veil.patch(m, { key: 'human' });
    MATS.set(k, m);
  }
  return MATS.get(k);
}

// Maße (Meter): lange Beine, schmaler Rumpf, kleiner Kopf
const M = {
  hipY: 0.96, thigh: 0.45, shin: 0.43, torso: 0.56, shoulderX: 0.235, upperArm: 0.3, forearm: 0.27,
  headR: 0.142, neck: 0.08,
};

function darker(hex, k = 0.8) { return new THREE.Color(hex).multiplyScalar(k); }

// ---- Teile ----
function buildHead(cfg) {
  const P = [];
  const skin = cfg.skin, hair = cfg.hair, R = M.headR;
  // Kopf: leicht ovales Gesicht mit schmalerem Kinn
  P.push(part(new THREE.IcosahedronGeometry(R, 2), {
    scale: [0.95, 1.12, 0.98], color: skin,
    deform: (v) => { if (v.y < 0) { const k = 1 - (-v.y / R) * 0.16; v.x *= k; v.z = v.z * (0.92 + 0.08 * k); } },
  }));
  // Ohren
  for (const s of [-1, 1]) P.push(part(new THREE.IcosahedronGeometry(0.036, 0), { pos: [s * R * 0.96, -0.005, -0.01], scale: [0.5, 1, 0.8], color: skin }));
  // Nase
  P.push(part(new THREE.ConeGeometry(0.02, 0.05, 4, 1), { pos: [0, -0.02, R * 0.97], rot: [Math.PI / 2, 0, 0], color: darker(skin, 0.9) }));
  // Augen: mandelförmig, Iris, kleiner Glanz
  for (const s of [-1, 1]) {
    P.push(part(new THREE.SphereGeometry(0.03, 10, 8), { pos: [s * 0.055, 0.004, R * 0.9], scale: [1.05, 0.6, 0.35], color: '#ffffff' }));
    P.push(part(new THREE.SphereGeometry(0.024, 10, 8), { pos: [s * 0.054, 0.003, R * 0.925], scale: [1, 0.8, 0.35], color: cfg.eyes }));
    P.push(part(new THREE.SphereGeometry(0.006, 6, 4), { pos: [s * 0.054 + 0.007, 0.011, R * 0.955], color: '#ffffff' }));
    // oberes Lid: schattige Kante, wirkt entspannter als runde Kulleraugen
    P.push(part(new THREE.BoxGeometry(0.062, 0.006, 0.02), { pos: [s * 0.055, 0.024, R * 0.92], rot: [0.3, 0, 0], color: darker(skin, 0.86) }));
  }
  // Haare
  const capGeo = (r, thetaLen, lowBack = 0.1, frontY = 0.05) => part(new THREE.SphereGeometry(r, 14, 9, 0, Math.PI * 2, 0, Math.PI * thetaLen), {
    pos: [0, 0.02, -0.008], scale: [1.0, 1.1, 1.04],
    deform: (v) => {
      if (v.y < 0.05) {
        const f = THREE.MathUtils.smoothstep(v.z / r, -0.1, 0.45);
        v.y = THREE.MathUtils.lerp(v.y - lowBack, Math.max(v.y, frontY), f);
      }
    },
    color: hair, faceVar: 0.1, seed: 5,
  });
  const style = cfg.hairStyle;
  if (style === 'glatze') {
    P.push(capGeo(R * 1.005, 0.5, 0.01, 0.06));
  } else if (style === 'afro') {
    P.push(part(new THREE.IcosahedronGeometry(R * 1.45, 1), { pos: [0, 0.06, -0.025], jitter: 0.04, seed: 9, color: hair, faceVar: 0.14, deform: (v) => { if (v.z > 0.1 && v.y < 0.07) v.z = 0.1 + (v.z - 0.1) * 0.2; } }));
  } else {
    P.push(capGeo(R * 1.05, 0.56, style === 'lang' || style === 'locken' ? 0.1 : 0.06, 0.035));
    // Pony / Strähnen vorne (leicht schräg, nicht kindlich gerade)
    const fringe = style === 'stachel' ? 0 : 4;
    for (let i = 0; i < fringe; i++) {
      const a = (i / (fringe - 1) - 0.5) * 1.2 + 0.15;
      P.push(part(new THREE.ConeGeometry(0.036, 0.09, 4, 1), { pos: [Math.sin(a) * R * 0.95, 0.075 - Math.abs(a) * 0.02, Math.cos(a) * R * 0.9], rot: [2.4, a, 0], order: 'YXZ', color: hair }));
    }
  }
  if (style === 'kurz' || style === 'stachel' || style === 'dutt' || style === 'zopf') {
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.035, 0.1, 0.1), { pos: [s * R * 0.94, 0.0, -0.02], rot: [0, 0, s * 0.08], color: hair }));
  }
  if (style === 'lang') {
    P.push(part(new THREE.BoxGeometry(0.26, 0.3, 0.09), { pos: [0, -0.1, -0.12], rot: [0.12, 0, 0], jitter: 0.02, seed: 2, color: hair, faceVar: 0.1 }));
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.05, 0.22, 0.1), { pos: [s * 0.145, -0.07, -0.02], color: hair }));
  } else if (style === 'zopf') {
    P.push(part(new THREE.ConeGeometry(0.05, 0.26, 6, 1), { pos: [0, -0.04, -0.22], rot: [-2.5, 0, 0], color: hair }));
    P.push(part(new THREE.TorusGeometry(0.03, 0.012, 4, 8), { pos: [0, 0.04, -0.17], rot: [0.9, 0, 0], color: cfg.accessoryColor }));
  } else if (style === 'dutt') {
    P.push(part(new THREE.IcosahedronGeometry(0.065, 1), { pos: [0, 0.17, -0.06], color: hair, faceVar: 0.1 }));
  } else if (style === 'stachel') {
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const tilt = 0.5 + (i % 2) * 0.25;
      P.push(part(new THREE.ConeGeometry(0.04, 0.14, 4, 1), { pos: [Math.cos(a) * 0.06, 0.15, Math.sin(a) * 0.06 - 0.01], rot: [Math.sin(a) * tilt - 0.35, 0, -Math.cos(a) * tilt], color: hair }));
    }
  } else if (style === 'locken') {
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2, y = 0.03 + (i % 3) * 0.045;
      P.push(part(new THREE.IcosahedronGeometry(0.045, 0), { pos: [Math.cos(a) * R * 0.95, y, Math.sin(a) * R * 0.95 - 0.01], color: hair, faceVar: 0.2, seed: i }));
    }
  }
  // Accessoires am Kopf
  const ac = cfg.accessoryColor;
  if (cfg.accessory === 'cap') {
    P.push(part(new THREE.SphereGeometry(R * 1.1, 12, 6, 0, Math.PI * 2, 0, Math.PI * 0.5), { pos: [0, 0.03, 0], color: ac }));
    P.push(part(new THREE.CylinderGeometry(0.12, 0.12, 0.015, 10, 1), { pos: [0, 0.05, R * 0.95], scale: [1.05, 1, 0.8], color: darker(ac, 0.85) }));
    P.push(part(new THREE.IcosahedronGeometry(0.018, 0), { pos: [0, R * 1.14, 0], color: darker(ac, 0.7) }));
  } else if (cfg.accessory === 'muetze') {
    P.push(part(new THREE.SphereGeometry(R * 1.12, 12, 7, 0, Math.PI * 2, 0, Math.PI * 0.5), { pos: [0, 0.04, 0], scale: [1, 1.15, 1], color: ac }));
    P.push(part(new THREE.CylinderGeometry(R * 1.14, R * 1.14, 0.05, 12, 1), { pos: [0, 0.04, 0], color: darker(ac, 0.85) }));
    P.push(part(new THREE.IcosahedronGeometry(0.045, 1), { pos: [0, R * 1.3 + 0.04, 0], color: '#ffffff' }));
  } else if (cfg.accessory === 'kopfhoerer') {
    P.push(part(new THREE.TorusGeometry(R * 1.12, 0.016, 4, 14, Math.PI), { pos: [0, 0.02, 0], color: '#2b2b35' }));
    for (const s of [-1, 1]) P.push(part(new THREE.CylinderGeometry(0.055, 0.055, 0.045, 10, 1), { pos: [s * R * 1.08, -0.005, 0], rot: [0, 0, Math.PI / 2], color: ac }));
  } else if (cfg.accessory === 'brille') {
    for (const s of [-1, 1]) P.push(part(new THREE.TorusGeometry(0.036, 0.007, 4, 10), { pos: [s * 0.056, 0.008, R * 0.97], color: '#1d1d26' }));
    P.push(part(new THREE.BoxGeometry(0.04, 0.008, 0.008), { pos: [0, 0.01, R * 0.99], color: '#1d1d26' }));
  }
  return merge(P);
}

// Brauen und Münder als eigene Meshes (für Ausdruck)
function buildBrow(cfg, s) {
  return part(new THREE.BoxGeometry(0.052, 0.011, 0.018), { color: darker(cfg.hair, 0.8), deform: (v) => { if (v.x * s > 0) v.y *= 0.7; } });
}
function buildMouth(cfg, kind) {
  const c = darker(cfg.skin, 0.62);
  if (kind === 'neutral') return part(new THREE.BoxGeometry(0.038, 0.007, 0.01), { color: c });
  // Lächeln / Schmollen: flacher Bogen
  return part(new THREE.TorusGeometry(0.024, 0.006, 3, 8, Math.PI), { rot: [0, 0, kind === 'smile' ? Math.PI : 0], scale: [1, 0.55, 1], color: c });
}

function buildTorso(cfg) {
  const P = [];
  const top = cfg.top, dark = darker(top, 0.82);
  // schlanker Rumpf, oben breiter (Schultern), Hüfte schmal
  P.push(part(new THREE.CylinderGeometry(0.175, 0.145, M.torso, 8, 3), {
    pos: [0, M.torso / 2, 0], scale: [1.25, 1, 0.74], color: top, faceVar: 0.05, seed: 11,
    deform: (v) => { if (v.y > 0.12) v.x *= 1 + (v.y - 0.12) * 0.35; },
  }));
  // Schultern
  for (const s of [-1, 1]) P.push(part(new THREE.IcosahedronGeometry(0.084, 1), { pos: [s * 0.205, M.torso - 0.055, 0], scale: [1.1, 0.8, 1], color: top }));
  // Hals
  P.push(part(new THREE.CylinderGeometry(0.052, 0.06, 0.13, 7, 1), { pos: [0, M.torso + 0.035, 0], color: cfg.skin }));
  if (cfg.topStyle === 'hoodie') {
    // Kapuze im Nacken
    P.push(part(new THREE.TorusGeometry(0.105, 0.045, 5, 10), { pos: [0, M.torso + 0.005, -0.05], rot: [Math.PI / 2 + 0.4, 0, 0], scale: [1.25, 1, 1], color: dark }));
    P.push(part(new THREE.BoxGeometry(0.2, 0.12, 0.07), { pos: [0, M.torso - 0.03, -0.14], rot: [0.5, 0, 0], jitter: 0.01, seed: 8, color: dark }));
    // Kängurutasche
    P.push(part(new THREE.BoxGeometry(0.2, 0.09, 0.025), { pos: [0, 0.12, 0.12], color: dark }));
    // Kordeln
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.012, 0.13, 0.012), { pos: [s * 0.035, M.torso - 0.12, 0.135], color: '#ffffff' }));
    // Bündchen
    P.push(part(new THREE.CylinderGeometry(0.15, 0.15, 0.045, 8, 1), { pos: [0, 0.015, 0], scale: [1.2, 1, 0.74], color: dark }));
  } else {
    P.push(part(new THREE.TorusGeometry(0.062, 0.014, 3, 10), { pos: [0, M.torso - 0.01, 0.01], rot: [Math.PI / 2, 0, 0], color: dark }));
    // Aufdruck (Stern)
    P.push(part(new THREE.CylinderGeometry(0.045, 0.045, 0.014, 5, 1), { pos: [0, M.torso * 0.62, 0.125], rot: [Math.PI / 2, 0, 0], color: '#ffffff' }));
  }
  if (cfg.accessory === 'rucksack') {
    const ac = cfg.accessoryColor;
    P.push(part(new THREE.BoxGeometry(0.27, 0.34, 0.14), { pos: [0, M.torso * 0.55, -0.17], jitter: 0.015, seed: 4, color: ac }));
    P.push(part(new THREE.BoxGeometry(0.2, 0.12, 0.05), { pos: [0, M.torso * 0.38, -0.25], color: darker(ac, 0.8) }));
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.035, 0.42, 0.04), { pos: [s * 0.1, M.torso * 0.6, 0.12], color: darker(ac, 0.7) }));
  }
  return merge(P);
}

function buildPelvis(cfg) {
  return merge([
    part(new THREE.CylinderGeometry(0.15, 0.145, 0.2, 8, 1), { pos: [0, 0.0, 0], scale: [1.2, 1, 0.76], color: cfg.bottoms }),
    part(new THREE.CylinderGeometry(0.152, 0.152, 0.035, 8, 1), { pos: [0, 0.085, 0], scale: [1.2, 1, 0.76], color: darker(cfg.bottoms, 0.7) }),
  ]);
}
function buildThigh(cfg) {
  return merge([part(new THREE.CylinderGeometry(0.085, 0.07, M.thigh + 0.05, 8, 1), { pos: [0, -M.thigh / 2, 0], color: cfg.bottoms })]);
}
function buildShin(cfg, side) {
  const lower = cfg.bottomsStyle === 'kurz' ? cfg.skin : cfg.bottoms;
  const P = [
    part(new THREE.CylinderGeometry(0.068, 0.054, M.shin, 8, 1), { pos: [0, -M.shin / 2, 0], color: lower }),
    // Sneaker
    part(new THREE.BoxGeometry(0.125, 0.09, 0.25), { pos: [0, -M.shin - 0.015, 0.04], jitter: 0.012, seed: 3 + side, color: cfg.shoes }),
    part(new THREE.IcosahedronGeometry(0.068, 1), { pos: [0, -M.shin - 0.02, 0.15], scale: [0.95, 0.7, 0.9], color: cfg.shoes }),
    part(new THREE.BoxGeometry(0.135, 0.035, 0.29), { pos: [0, -M.shin - 0.055, 0.06], color: darker(cfg.shoes, 0.6) }),
    part(new THREE.BoxGeometry(0.13, 0.012, 0.27), { pos: [0, -M.shin - 0.036, 0.06], color: cfg.accessoryColor }),
  ];
  if (cfg.bottomsStyle === 'kurz') P.push(part(new THREE.CylinderGeometry(0.055, 0.055, 0.045, 7, 1), { pos: [0, -M.shin + 0.06, 0], color: '#ffffff' }));
  return merge(P);
}
function buildUpperArm(cfg) {
  return merge([part(new THREE.CylinderGeometry(0.064, 0.055, M.upperArm + 0.04, 8, 1), { pos: [0, -M.upperArm / 2, 0], color: cfg.top })]);
}
function buildForearm(cfg) {
  const sleeve = cfg.topStyle === 'tshirt' ? cfg.skin : cfg.top;
  const P = [
    part(new THREE.CylinderGeometry(0.055, 0.046, M.forearm, 8, 1), { pos: [0, -M.forearm / 2, 0], color: sleeve }),
    part(new THREE.IcosahedronGeometry(0.06, 1), { pos: [0, -M.forearm - 0.045, 0.004], scale: [0.8, 1.15, 0.7], color: cfg.skin }),
    part(new THREE.IcosahedronGeometry(0.024, 0), { pos: [0, -M.forearm - 0.03, 0.045], color: cfg.skin }),
  ];
  if (cfg.topStyle === 'hoodie') P.push(part(new THREE.CylinderGeometry(0.056, 0.056, 0.04, 8, 1), { pos: [0, -M.forearm + 0.02, 0], color: darker(cfg.top, 0.82) }));
  return merge(P);
}

// ---- Aura-Shader ----
function auraMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color('#ffd166') }, uTime: { value: 0 }, uAlpha: { value: 0 } },
    vertexShader: /* glsl */`
      varying vec3 vN; varying vec3 vV; varying float vY;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        vY = position.y;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uColor; uniform float uTime; uniform float uAlpha;
      varying vec3 vN; varying vec3 vV; varying float vY;
      void main() {
        float f = pow(1.0 - abs(dot(vN, vV)), 2.2);
        float bands = 0.75 + 0.25 * sin(vY * 9.0 - uTime * 3.0);
        float a = f * bands * uAlpha * (0.55 + 0.45 * sin(uTime * 2.2)) + f * uAlpha * 0.35;
        gl_FragColor = vec4(uColor * 1.4, a);
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  });
}

// Weicher Boden-Schatten (Canvas-Textur, einmal erzeugt)
let blobTex = null;
function getBlobTexture() {
  if (blobTex) return blobTex;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 2, 32, 32, 31);
  gr.addColorStop(0, 'rgba(0,0,0,0.55)');
  gr.addColorStop(0.6, 'rgba(0,0,0,0.25)');
  gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  blobTex = new THREE.CanvasTexture(c);
  return blobTex;
}

// ---- Posen ----
const JOINTS = ['body', 'spine', 'head', 'hipL', 'hipR', 'kneeL', 'kneeR', 'shL', 'shR', 'elL', 'elR'];
function zeroPose() {
  const p = { bodyY: 0 };
  for (const j of JOINTS) p[j] = { x: 0, y: 0, z: 0 };
  return p;
}
// Ausdruck je Animation (wenn kein eigener gesetzt ist): brows −1 = zornig … +1 = besorgt, mouth −1 = schmollen … +1 = lächeln
const ANIM_EXPR = {
  idle: { brows: 0, mouth: 0, raise: 0 }, walk: { brows: 0, mouth: 0, raise: 0 }, run: { brows: -0.25, mouth: 0, raise: 0 },
  jump: { brows: -0.1, mouth: 0.2, raise: 0.3 }, fall: { brows: 0.3, mouth: -0.2, raise: 0.5 },
  wave: { brows: 0, mouth: 0.8, raise: 0.4 }, talk: { brows: 0.1, mouth: 0.2, raise: 0.2 }, cheer: { brows: 0, mouth: 1, raise: 0.6 },
  sad: { brows: 0.9, mouth: -0.9, raise: 0.1 }, angry: { brows: -1, mouth: -0.8, raise: 0 }, sit: { brows: 0, mouth: 0, raise: 0 },
  think: { brows: -0.3, mouth: 0, raise: 0.3 },
};

export function createHumanoid(config = {}, opts = {}) {
  let cfg = { ...DEFAULT_CONFIG, ...config };
  const material = getMaterial(opts.veil || null);
  const group = new THREE.Group();
  group.name = opts.name || 'humanoid';
  const body = new THREE.Group();
  group.add(body);
  const hips = new THREE.Group(); hips.position.y = M.hipY; body.add(hips);
  const spine = new THREE.Group(); spine.position.y = 0.06; hips.add(spine);
  const neck = new THREE.Group(); neck.position.y = M.torso + 0.07; spine.add(neck);
  const headPivot = new THREE.Group(); headPivot.position.y = M.headR * 0.95; neck.add(headPivot);
  const J = { body, spine, head: neck, hipL: new THREE.Group(), hipR: new THREE.Group(), kneeL: new THREE.Group(), kneeR: new THREE.Group(), shL: new THREE.Group(), shR: new THREE.Group(), elL: new THREE.Group(), elR: new THREE.Group() };
  J.hipL.position.set(0.095, -0.06, 0); J.hipR.position.set(-0.095, -0.06, 0);
  hips.add(J.hipL, J.hipR);
  J.kneeL.position.y = -M.thigh; J.kneeR.position.y = -M.thigh;
  J.hipL.add(J.kneeL); J.hipR.add(J.kneeR);
  J.shL.position.set(M.shoulderX, M.torso - 0.06, 0); J.shR.position.set(-M.shoulderX, M.torso - 0.06, 0);
  spine.add(J.shL, J.shR);
  J.elL.position.y = -M.upperArm; J.elR.position.y = -M.upperArm;
  J.shL.add(J.elL); J.shR.add(J.elR);

  const meshes = {};
  function mk(name, geo, parent) {
    if (meshes[name]) { parent.remove(meshes[name]); meshes[name].geometry.dispose(); }
    const m = new THREE.Mesh(geo, material);
    m.castShadow = true; m.receiveShadow = false;
    m.name = name;
    parent.add(m);
    meshes[name] = m;
    return m;
  }
  const face = { browL: null, browR: null, mouths: {} };
  function build() {
    mk('head', buildHead(cfg), headPivot);
    mk('torso', buildTorso(cfg), spine);
    mk('pelvis', buildPelvis(cfg), hips);
    mk('thighL', buildThigh(cfg), J.hipL); mk('thighR', buildThigh(cfg), J.hipR);
    mk('shinL', buildShin(cfg, 0), J.kneeL); mk('shinR', buildShin(cfg, 1), J.kneeR);
    mk('upperL', buildUpperArm(cfg), J.shL); mk('upperR', buildUpperArm(cfg), J.shR);
    mk('foreL', buildForearm(cfg), J.elL); mk('foreR', buildForearm(cfg), J.elR);
    // Gesicht (bewegliche Teile)
    face.browL = mk('browL', buildBrow(cfg, 1), headPivot);
    face.browR = mk('browR', buildBrow(cfg, -1), headPivot);
    for (const k of ['neutral', 'smile', 'frown']) {
      const m = mk('mouth-' + k, buildMouth(cfg, k), headPivot);
      m.position.set(0, -0.062, M.headR * 0.94);
      m.castShadow = false;
      face.mouths[k] = m;
    }
    for (const m of [face.browL, face.browR]) m.castShadow = false;
    group.scale.setScalar(cfg.scale || 1);
    applyExpression(0);
  }

  // Boden-Schatten
  const blob = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.0).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: getBlobTexture(), transparent: true, depthWrite: false, toneMapped: false }));
  blob.position.y = 0.03;
  blob.renderOrder = 4;
  group.add(blob);

  // Aura
  const auraMat = auraMaterial();
  const aura = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 1.15, 4, 12), auraMat);
  aura.position.y = 1.0;
  aura.visible = false;
  aura.renderOrder = 15;
  group.add(aura);
  const ringMat = new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.62, 0.8, 32).rotateX(-Math.PI / 2), ringMat);
  ring.position.y = 0.05;
  ring.visible = false;
  group.add(ring);
  let auraTarget = 0, auraAmt = 0;

  // Ausdruck
  const expr = { brows: 0, mouth: 0, raise: 0 };
  const exprCur = { brows: 0, mouth: 0, raise: 0 };
  let exprOverride = null;
  function applyExpression(dt) {
    const want = exprOverride || ANIM_EXPR[anim] || ANIM_EXPR.idle;
    const k = dt > 0 ? 1 - Math.exp(-dt * 6) : 1;
    exprCur.brows += (want.brows - exprCur.brows) * k;
    exprCur.mouth += (want.mouth - exprCur.mouth) * k;
    exprCur.raise += (want.raise - exprCur.raise) * k;
    const R = M.headR;
    for (const [m, s] of [[face.browL, 1], [face.browR, -1]]) {
      if (!m) continue;
      // brows < 0: innere Enden runter (zornig), > 0: innere Enden hoch (besorgt); raise hebt beide
      m.position.set(s * 0.056, 0.05 + exprCur.raise * 0.014 + Math.abs(exprCur.brows) * 0.004, R * 0.93);
      m.rotation.set(0, 0, s * (0.1 + exprCur.brows * 0.42));
    }
    const mo = exprCur.mouth;
    const kind = mo > 0.3 ? 'smile' : mo < -0.3 ? 'frown' : 'neutral';
    for (const [k2, m] of Object.entries(face.mouths)) {
      m.visible = k2 === kind;
      m.scale.set(1 + Math.abs(mo) * 0.35, 1, 1);
    }
  }

  // Animationszustand
  let anim = 'idle', animT = 0, prevAnim = 'idle';
  let phase = 0, moveSpeed = 0, lastStepHalf = 0;
  const cur = zeroPose(), tgt = zeroPose();
  let blend = 1;
  build();
  const h = {
    group, meshes, joints: J, blob, aura, face,
    get config() { return { ...cfg }; },
    get anim() { return anim; },
    get expression() { return { ...exprCur }; },
    height: 2.0,     // Scheitel inkl. Haar ≈ 2,0 m, Kopf (ohne Haar) ≈ 0,32 m → ~6,3 Kopfhöhen
    headRadius: M.headR,
    headHeight: M.headR * 2 * 1.12,
    vy: 0,           // vom Controller gesetzt (für Sprung/Fall)
    onStep: null,    // (fuß: 'L'|'R') => {}
    setConfig(c) { cfg = { ...cfg, ...c }; build(); },
    setAnim(name) {
      if (name === anim) return;
      prevAnim = anim; anim = name; animT = 0; blend = 0;
    },
    setMoveSpeed(v) { moveSpeed = v; },
    // Gesichtsausdruck überschreiben: { brows: -1..1, mouth: -1..1, raise: 0..1 } oder null (= je Animation)
    setExpression(e) { exprOverride = e ? { brows: 0, mouth: 0, raise: 0, ...e } : null; },
    setEmotionAura(color) {
      if (color) {
        auraMat.uniforms.uColor.value.set(color);
        ringMat.color.set(color);
        auraTarget = 1;
      } else auraTarget = 0;
    },
    update(dt) {
      animT += dt;
      blend = Math.min(1, blend + dt * 5);
      computePose(dt);
      const k = 1 - Math.exp(-dt * (anim === 'jump' || anim === 'fall' ? 14 : 11));
      cur.bodyY += (tgt.bodyY - cur.bodyY) * k;
      for (const j of JOINTS) {
        const a = cur[j], b = tgt[j];
        a.x += (b.x - a.x) * k; a.y += (b.y - a.y) * k; a.z += (b.z - a.z) * k;
        J[j].rotation.set(a.x, a.y, a.z);
      }
      body.position.y = cur.bodyY;
      applyExpression(dt);
      // Aura
      auraAmt += (auraTarget - auraAmt) * Math.min(1, dt * 3);
      aura.visible = ring.visible = auraAmt > 0.01;
      if (aura.visible) {
        auraMat.uniforms.uTime.value += dt;
        auraMat.uniforms.uAlpha.value = auraAmt;
        ringMat.opacity = auraAmt * (0.5 + 0.3 * Math.sin(auraMat.uniforms.uTime.value * 3));
        ring.scale.setScalar(1 + 0.08 * Math.sin(auraMat.uniforms.uTime.value * 2));
      }
    },
    dispose() {
      for (const m of Object.values(meshes)) m.geometry.dispose();
      blob.geometry.dispose(); aura.geometry.dispose(); ring.geometry.dispose(); auraMat.dispose();
    },
  };

  function set(j, x, y, z) { tgt[j].x = x; tgt[j].y = y; tgt[j].z = z; }
  function computePose(dt) {
    const t = animT;
    for (const j of JOINTS) set(j, 0, 0, 0);
    tgt.bodyY = 0;
    // Grundhaltung: Arme leicht vom Körper, lässig
    set('shL', 0.05, 0, 0.1); set('shR', 0.05, 0, -0.1);
    set('elL', -0.16, 0, 0); set('elR', -0.16, 0, 0);
    const breathe = Math.sin(t * 1.8);
    if (anim === 'idle' || anim === 'think') {
      tgt.bodyY = breathe * 0.008;
      set('spine', breathe * 0.02, 0, 0);
      set('head', -breathe * 0.02 + Math.sin(t * 0.37) * 0.04, Math.sin(t * 0.23) * 0.25, 0);
      set('shL', 0.04 + breathe * 0.02, 0, 0.09 + breathe * 0.015); set('shR', 0.04 + breathe * 0.02, 0, -0.09 - breathe * 0.015);
      // Gewicht auf einem Bein (Teen-Haltung)
      set('hipL', 0, 0, 0.05); set('hipR', 0.03, 0, -0.02); set('kneeR', 0.08, 0, 0);
      set('body', 0, 0, 0.015);
      if (anim === 'think') { set('shR', -0.9, 0.3, -0.35); set('elR', -2.1, 0, 0); set('head', 0.12, 0.15, 0.08); }
    } else if (anim === 'walk' || anim === 'run') {
      const run = THREE.MathUtils.clamp((moveSpeed - 2.5) / 3.5, 0, 1);
      const stride = 1.35 + run * 0.95;
      phase += (dt * Math.max(moveSpeed, 0.8) / stride) * Math.PI;
      const s = Math.sin(phase), c = Math.cos(phase);
      const A = 0.5 + run * 0.35;
      set('hipL', -s * A, 0, 0.02); set('hipR', s * A, 0, -0.02);
      set('kneeL', Math.max(0, c) * (0.9 + run * 0.6) + Math.max(0, s) * 0.12, 0, 0);
      set('kneeR', Math.max(0, -c) * (0.9 + run * 0.6) + Math.max(0, -s) * 0.12, 0, 0);
      const aa = 0.45 + run * 0.45;
      set('shL', s * aa, 0, 0.1 + run * 0.05); set('shR', -s * aa, 0, -0.1 - run * 0.05);
      set('elL', -0.35 - run * 0.8 - Math.max(0, -s) * 0.3, 0, 0); set('elR', -0.35 - run * 0.8 - Math.max(0, s) * 0.3, 0, 0);
      tgt.bodyY = (0.5 - Math.abs(s)) * (0.05 + run * 0.06) - run * 0.03;
      set('spine', 0.06 + run * 0.14, s * 0.12, 0);
      set('head', -0.04 - run * 0.08, -s * 0.08, 0);
      set('body', 0, 0, c * 0.03);
      // Schritt-Ereignis bei Fersenaufsatz
      const half = Math.floor((phase + Math.PI / 2) / Math.PI);
      if (half !== lastStepHalf) { lastStepHalf = half; if (h.onStep) h.onStep(half % 2 ? 'L' : 'R'); }
    } else if (anim === 'jump' || anim === 'fall') {
      const up = h.vy > 0;
      const tuck = up ? 1 : 0.4;
      set('hipL', -0.5 * tuck - 0.2, 0, 0.08); set('hipR', 0.2 - 0.3 * tuck, 0, -0.08);
      set('kneeL', 0.9 * tuck + 0.3, 0, 0); set('kneeR', 0.5 + 0.3 * tuck, 0, 0);
      set('shL', -0.3, 0, 1.2 + (up ? 0.6 : 0.2)); set('shR', -0.3, 0, -1.2 - (up ? 0.6 : 0.2));
      set('elL', -0.4, 0, 0); set('elR', -0.4, 0, 0);
      set('spine', up ? -0.08 : 0.08, 0, 0);
      set('head', up ? -0.12 : 0.1, 0, 0);
    } else if (anim === 'wave') {
      tgt.bodyY = breathe * 0.008;
      set('shR', -0.2, 0, -2.55); set('elR', -0.5 + Math.sin(t * 9) * 0.45, 0, 0);
      set('shL', 0.05, 0, 0.12);
      set('head', -0.08, 0.1, -0.1);
      set('spine', 0, 0.1, 0.05);
    } else if (anim === 'talk') {
      tgt.bodyY = breathe * 0.008;
      set('head', Math.sin(t * 5.2) * 0.07 + Math.sin(t * 2.1) * 0.04, Math.sin(t * 1.3) * 0.12, Math.sin(t * 1.7) * 0.05);
      set('shR', -0.45 + Math.sin(t * 2.3) * 0.2, 0.2, -0.3 - Math.sin(t * 1.9) * 0.1); set('elR', -1.2 + Math.sin(t * 3.1) * 0.25, 0, 0);
      set('shL', -0.2 + Math.sin(t * 1.7 + 1) * 0.15, -0.1, 0.25); set('elL', -0.9 + Math.sin(t * 2.6 + 2) * 0.2, 0, 0);
      set('spine', 0.03, Math.sin(t * 1.1) * 0.06, 0);
    } else if (anim === 'cheer') {
      const b = Math.abs(Math.sin(t * 6));
      tgt.bodyY = b * 0.12;
      set('shL', -0.3, 0, 2.6 + Math.sin(t * 12) * 0.2); set('shR', -0.3, 0, -2.6 - Math.sin(t * 12) * 0.2);
      set('elL', -0.3, 0, 0); set('elR', -0.3, 0, 0);
      set('kneeL', b * 0.4, 0, 0); set('kneeR', b * 0.4, 0, 0); set('hipL', -b * 0.25, 0, 0.05); set('hipR', -b * 0.25, 0, -0.05);
      set('head', -0.25, 0, 0);
    } else if (anim === 'sad') {
      tgt.bodyY = -0.02 + breathe * 0.005;
      set('spine', 0.22, 0, 0); set('head', 0.45, Math.sin(t * 0.4) * 0.1, 0);
      set('shL', 0.12, 0, 0.04); set('shR', 0.12, 0, -0.04);
      set('elL', -0.05, 0, 0); set('elR', -0.05, 0, 0);
    } else if (anim === 'angry') {
      const shake = Math.sin(t * 20) * 0.02;
      tgt.bodyY = Math.abs(Math.sin(t * 3)) * 0.03;
      set('spine', 0.1, shake, 0); set('head', 0.12, Math.sin(t * 3.3) * 0.15, 0);
      set('shL', -0.5, 0.6, 0.35); set('shR', -0.5, -0.6, -0.35);
      set('elL', -1.9, 0, 0); set('elR', -1.9, 0, 0);
      set('hipL', 0, 0, 0.12); set('hipR', 0, 0, -0.12);
      if (Math.sin(t * 3) > 0.9) set('hipR', -0.4, 0, -0.1);
    } else if (anim === 'sit') {
      tgt.bodyY = -0.46;
      set('hipL', -1.5, 0, 0.1); set('hipR', -1.5, 0, -0.1);
      set('kneeL', 1.5, 0, 0); set('kneeR', 1.5, 0, 0);
      set('shL', -0.3, 0, 0.15); set('shR', -0.3, 0, -0.15); set('elL', -0.6, 0, 0); set('elR', -0.6, 0, 0);
      set('head', Math.sin(t * 0.4) * 0.05, Math.sin(t * 0.3) * 0.2, 0);
    }
  }
  return h;
}

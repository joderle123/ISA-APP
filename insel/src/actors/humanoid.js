// Prozedurale Low-Poly-Figur (zwischen Fortnite und Roblox) mit prozeduralen Animationen.
// createHumanoid(config, { veil }) → { group, setAnim(name), update(dt), setMoveSpeed(v), setEmotionAura(color|null), setConfig(cfg) }
// Blickrichtung der Figur: +z. Füße bei y = 0.
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

// Maße (Meter)
const M = {
  hipY: 0.88, thigh: 0.37, shin: 0.36, torso: 0.5, shoulderX: 0.265, upperArm: 0.28, forearm: 0.26,
  headR: 0.265, neck: 0.07,
};

function darker(hex, k = 0.8) { return new THREE.Color(hex).multiplyScalar(k); }

// ---- Teile ----
function buildHead(cfg) {
  const P = [];
  const skin = cfg.skin, hair = cfg.hair, R = M.headR;
  P.push(part(new THREE.IcosahedronGeometry(R, 2), { scale: [1, 1.04, 0.97], color: skin }));
  // Ohren
  for (const s of [-1, 1]) P.push(part(new THREE.IcosahedronGeometry(0.06, 0), { pos: [s * R * 0.98, -0.01, 0], scale: [0.5, 1, 0.8], color: skin }));
  // Nase
  P.push(part(new THREE.ConeGeometry(0.035, 0.07, 4, 1), { pos: [0, -0.03, R * 0.98], rot: [Math.PI / 2, 0, 0], color: darker(skin, 0.92) }));
  // Augen: Weiß, Pupille, Glanz
  for (const s of [-1, 1]) {
    P.push(part(new THREE.SphereGeometry(0.056, 10, 8), { pos: [s * 0.092, 0.03, R * 0.87], scale: [0.95, 1.2, 0.42], color: '#ffffff' }));
    P.push(part(new THREE.SphereGeometry(0.043, 10, 8), { pos: [s * 0.09, 0.022, R * 0.905], scale: [0.95, 1.18, 0.4], color: cfg.eyes }));
    P.push(part(new THREE.SphereGeometry(0.016, 6, 4), { pos: [s * 0.09 + 0.016, 0.046, R * 0.95], color: '#ffffff' }));
    // Augenbraue
    P.push(part(new THREE.BoxGeometry(0.085, 0.022, 0.03), { pos: [s * 0.1, 0.12, R * 0.9], rot: [0, 0, -s * 0.12], color: darker(hair, 0.85) }));
    // Wangen
    P.push(part(new THREE.IcosahedronGeometry(0.035, 0), { pos: [s * 0.15, -0.06, R * 0.83], scale: [1, 0.6, 0.3], color: new THREE.Color(skin).lerp(new THREE.Color('#ff8a8a'), 0.45) }));
  }
  // Mund (Lächeln)
  P.push(part(new THREE.TorusGeometry(0.045, 0.012, 3, 8, Math.PI), { pos: [0, -0.085, R * 0.93], rot: [0, 0, Math.PI], color: '#8a3440' }));
  // Haare
  const capGeo = (r, thetaLen, lowBack = 0.1, frontY = 0.05) => part(new THREE.SphereGeometry(r, 14, 9, 0, Math.PI * 2, 0, Math.PI * thetaLen), {
    pos: [0, 0.015, -0.012], scale: [1.04, 1.05, 1.06],
    deform: (v) => {
      if (v.y < 0.08) {
        const f = THREE.MathUtils.smoothstep(v.z / r, -0.1, 0.45);
        v.y = THREE.MathUtils.lerp(v.y - lowBack, Math.max(v.y, frontY), f);
      }
    },
    color: hair, faceVar: 0.1, seed: 5,
  });
  const style = cfg.hairStyle;
  if (style === 'glatze') {
    P.push(capGeo(R * 1.005, 0.5, 0.02, 0.1));
    // kurz geschoren = etwas heller als Haar
  } else if (style === 'afro') {
    P.push(part(new THREE.IcosahedronGeometry(R * 1.45, 1), { pos: [0, 0.1, -0.04], jitter: 0.06, seed: 9, color: hair, faceVar: 0.14, deform: (v) => { if (v.z > 0.18 && v.y < 0.12) v.z = 0.18 + (v.z - 0.18) * 0.2; } }));
  } else {
    P.push(capGeo(R * 1.04, 0.56, style === 'lang' || style === 'locken' ? 0.16 : 0.1, 0.06));
    // Pony / Strähnen vorne
    const fringe = style === 'stachel' ? 0 : 5;
    for (let i = 0; i < fringe; i++) {
      const a = (i / (fringe - 1) - 0.5) * 1.3;
      P.push(part(new THREE.ConeGeometry(0.06, 0.14, 4, 1), { pos: [Math.sin(a) * R * 0.95, 0.14, Math.cos(a) * R * 0.88], rot: [2.3, a, 0], order: 'YXZ', color: hair }));
    }
  }
  if (style === 'kurz' || style === 'stachel' || style === 'dutt' || style === 'zopf') {
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.06, 0.16, 0.16), { pos: [s * R * 0.93, 0.02, -0.03], rot: [0, 0, s * 0.08], color: hair }));
  }
  if (style === 'lang') {
    P.push(part(new THREE.BoxGeometry(0.46, 0.46, 0.14), { pos: [0, -0.15, -0.2], rot: [0.12, 0, 0], jitter: 0.03, seed: 2, color: hair, faceVar: 0.1 }));
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.08, 0.34, 0.16), { pos: [s * 0.25, -0.1, -0.04], color: hair }));
  } else if (style === 'zopf') {
    P.push(part(new THREE.ConeGeometry(0.08, 0.42, 6, 1), { pos: [0, -0.05, -0.36], rot: [-2.5, 0, 0], color: hair }));
    P.push(part(new THREE.TorusGeometry(0.05, 0.02, 4, 8), { pos: [0, 0.07, -0.29], rot: [0.9, 0, 0], color: cfg.accessoryColor }));
  } else if (style === 'dutt') {
    P.push(part(new THREE.IcosahedronGeometry(0.11, 1), { pos: [0, 0.29, -0.1], color: hair, faceVar: 0.1 }));
  } else if (style === 'stachel') {
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const tilt = 0.5 + (i % 2) * 0.25;
      P.push(part(new THREE.ConeGeometry(0.07, 0.24, 4, 1), { pos: [Math.cos(a) * 0.1, 0.25, Math.sin(a) * 0.1 - 0.02], rot: [Math.sin(a) * tilt - 0.35, 0, -Math.cos(a) * tilt], color: hair }));
    }
  } else if (style === 'locken') {
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2, y = 0.05 + (i % 3) * 0.08;
      P.push(part(new THREE.IcosahedronGeometry(0.075, 0), { pos: [Math.cos(a) * R * 0.95, y, Math.sin(a) * R * 0.95 - 0.02], color: hair, faceVar: 0.2, seed: i }));
    }
  }
  // Accessoires am Kopf
  const ac = cfg.accessoryColor;
  if (cfg.accessory === 'cap') {
    P.push(part(new THREE.SphereGeometry(R * 1.1, 12, 6, 0, Math.PI * 2, 0, Math.PI * 0.5), { pos: [0, 0.05, 0], color: ac }));
    P.push(part(new THREE.CylinderGeometry(0.2, 0.2, 0.025, 10, 1), { pos: [0, 0.08, R * 0.95], scale: [1.05, 1, 0.8], color: darker(ac, 0.85) }));
    P.push(part(new THREE.IcosahedronGeometry(0.03, 0), { pos: [0, R * 1.14, 0], color: darker(ac, 0.7) }));
  } else if (cfg.accessory === 'muetze') {
    P.push(part(new THREE.SphereGeometry(R * 1.12, 12, 7, 0, Math.PI * 2, 0, Math.PI * 0.5), { pos: [0, 0.07, 0], scale: [1, 1.15, 1], color: ac }));
    P.push(part(new THREE.CylinderGeometry(R * 1.14, R * 1.14, 0.08, 12, 1), { pos: [0, 0.07, 0], color: darker(ac, 0.85) }));
    P.push(part(new THREE.IcosahedronGeometry(0.075, 1), { pos: [0, R * 1.3 + 0.07, 0], color: '#ffffff' }));
  } else if (cfg.accessory === 'kopfhoerer') {
    P.push(part(new THREE.TorusGeometry(R * 1.12, 0.025, 4, 14, Math.PI), { pos: [0, 0.03, 0], color: '#2b2b35' }));
    for (const s of [-1, 1]) P.push(part(new THREE.CylinderGeometry(0.09, 0.09, 0.07, 10, 1), { pos: [s * R * 1.08, -0.01, 0], rot: [0, 0, Math.PI / 2], color: ac }));
  } else if (cfg.accessory === 'brille') {
    for (const s of [-1, 1]) P.push(part(new THREE.TorusGeometry(0.058, 0.012, 4, 10), { pos: [s * 0.095, 0.035, R * 0.97], color: '#1d1d26' }));
    P.push(part(new THREE.BoxGeometry(0.06, 0.014, 0.014), { pos: [0, 0.04, R * 0.99], color: '#1d1d26' }));
  }
  return merge(P);
}

function buildTorso(cfg) {
  const P = [];
  const top = cfg.top, dark = darker(top, 0.82);
  P.push(part(new THREE.CylinderGeometry(0.21, 0.19, M.torso, 8, 2), {
    pos: [0, M.torso / 2, 0], scale: [1.2, 1, 0.8], color: top, faceVar: 0.05, seed: 11,
    deform: (v) => { if (v.y > 0.1) { v.x *= 1 + (v.y - 0.1) * 0.25; } },
  }));
  // Schultern
  for (const s of [-1, 1]) P.push(part(new THREE.IcosahedronGeometry(0.115, 1), { pos: [s * 0.235, M.torso - 0.055, 0], scale: [1.1, 0.9, 1], color: top }));
  // Hals
  P.push(part(new THREE.CylinderGeometry(0.075, 0.085, 0.12, 7, 1), { pos: [0, M.torso + 0.03, 0], color: cfg.skin }));
  if (cfg.topStyle === 'hoodie') {
    // Kapuze
    P.push(part(new THREE.TorusGeometry(0.13, 0.055, 5, 10), { pos: [0, M.torso + 0.0, -0.06], rot: [Math.PI / 2 + 0.35, 0, 0], scale: [1.2, 1, 1], color: dark }));
    // Tasche
    P.push(part(new THREE.BoxGeometry(0.24, 0.1, 0.03), { pos: [0, 0.14, 0.155], color: dark }));
    // Kordeln
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.018, 0.14, 0.018), { pos: [s * 0.045, M.torso - 0.1, 0.165], color: '#ffffff' }));
    // Bündchen
    P.push(part(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 8, 1), { pos: [0, 0.02, 0], scale: [1.16, 1, 0.78], color: dark }));
  } else {
    P.push(part(new THREE.TorusGeometry(0.085, 0.02, 3, 10), { pos: [0, M.torso - 0.01, 0.01], rot: [Math.PI / 2, 0, 0], color: dark }));
    // Aufdruck (Stern)
    P.push(part(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 5, 1), { pos: [0, M.torso * 0.6, 0.158], rot: [Math.PI / 2, 0, 0], color: '#ffffff' }));
  }
  if (cfg.accessory === 'rucksack') {
    const ac = cfg.accessoryColor;
    P.push(part(new THREE.BoxGeometry(0.34, 0.38, 0.16), { pos: [0, M.torso * 0.55, -0.2], jitter: 0.02, seed: 4, color: ac }));
    P.push(part(new THREE.BoxGeometry(0.26, 0.14, 0.06), { pos: [0, M.torso * 0.4, -0.3], color: darker(ac, 0.8) }));
    for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.045, 0.4, 0.05), { pos: [s * 0.12, M.torso * 0.6, 0.16], color: darker(ac, 0.7) }));
  }
  return merge(P);
}

function buildPelvis(cfg) {
  return merge([
    part(new THREE.CylinderGeometry(0.185, 0.17, 0.2, 8, 1), { pos: [0, 0.0, 0], scale: [1.15, 1, 0.8], color: cfg.bottoms }),
    part(new THREE.CylinderGeometry(0.19, 0.19, 0.04, 8, 1), { pos: [0, 0.09, 0], scale: [1.15, 1, 0.8], color: darker(cfg.bottoms, 0.7) }),
  ]);
}
function buildThigh(cfg) {
  return merge([part(new THREE.CylinderGeometry(0.108, 0.088, M.thigh + 0.05, 8, 1), { pos: [0, -M.thigh / 2, 0], color: cfg.bottoms })]);
}
function buildShin(cfg, side) {
  const lower = cfg.bottomsStyle === 'kurz' ? cfg.skin : cfg.bottoms;
  const P = [
    part(new THREE.CylinderGeometry(0.086, 0.068, M.shin, 8, 1), { pos: [0, -M.shin / 2, 0], color: lower }),
    // Schuh
    part(new THREE.BoxGeometry(0.15, 0.11, 0.27), { pos: [0, -M.shin - 0.02, 0.04], jitter: 0.015, seed: 3 + side, color: cfg.shoes }),
    part(new THREE.IcosahedronGeometry(0.082, 1), { pos: [0, -M.shin - 0.025, 0.16], scale: [0.95, 0.72, 0.9], color: cfg.shoes }),
    part(new THREE.BoxGeometry(0.16, 0.04, 0.31), { pos: [0, -M.shin - 0.07, 0.06], color: darker(cfg.shoes, 0.6) }),
  ];
  if (cfg.bottomsStyle === 'kurz') P.push(part(new THREE.CylinderGeometry(0.066, 0.066, 0.05, 7, 1), { pos: [0, -M.shin + 0.06, 0], color: '#ffffff' }));
  return merge(P);
}
function buildUpperArm(cfg) {
  const c = cfg.topStyle === 'tshirt' ? cfg.top : cfg.top;
  return merge([part(new THREE.CylinderGeometry(0.08, 0.068, M.upperArm + 0.04, 8, 1), { pos: [0, -M.upperArm / 2, 0], color: c })]);
}
function buildForearm(cfg) {
  const sleeve = cfg.topStyle === 'tshirt' ? cfg.skin : cfg.top;
  const P = [
    part(new THREE.CylinderGeometry(0.068, 0.056, M.forearm, 8, 1), { pos: [0, -M.forearm / 2, 0], color: sleeve }),
    part(new THREE.IcosahedronGeometry(0.074, 1), { pos: [0, -M.forearm - 0.05, 0.005], scale: [0.85, 1.1, 0.72], color: cfg.skin }),
    part(new THREE.IcosahedronGeometry(0.03, 0), { pos: [0, -M.forearm - 0.03, 0.055], color: cfg.skin }),
  ];
  if (cfg.topStyle === 'hoodie') P.push(part(new THREE.CylinderGeometry(0.07, 0.07, 0.045, 8, 1), { pos: [0, -M.forearm + 0.02, 0], color: darker(cfg.top, 0.82) }));
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

export function createHumanoid(config = {}, opts = {}) {
  let cfg = { ...DEFAULT_CONFIG, ...config };
  const material = getMaterial(opts.veil || null);
  const group = new THREE.Group();
  group.name = opts.name || 'humanoid';
  const body = new THREE.Group();
  group.add(body);
  const hips = new THREE.Group(); hips.position.y = M.hipY; body.add(hips);
  const spine = new THREE.Group(); spine.position.y = 0.06; hips.add(spine);
  const neck = new THREE.Group(); neck.position.y = M.torso + 0.06; spine.add(neck);
  const headPivot = new THREE.Group(); headPivot.position.y = M.headR * 0.95; neck.add(headPivot);
  const J = { body, spine, head: neck, hipL: new THREE.Group(), hipR: new THREE.Group(), kneeL: new THREE.Group(), kneeR: new THREE.Group(), shL: new THREE.Group(), shR: new THREE.Group(), elL: new THREE.Group(), elR: new THREE.Group() };
  J.hipL.position.set(0.11, -0.06, 0); J.hipR.position.set(-0.11, -0.06, 0);
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
  }
  function build() {
    mk('head', buildHead(cfg), headPivot);
    mk('torso', buildTorso(cfg), spine);
    mk('pelvis', buildPelvis(cfg), hips);
    mk('thighL', buildThigh(cfg), J.hipL); mk('thighR', buildThigh(cfg), J.hipR);
    mk('shinL', buildShin(cfg, 0), J.kneeL); mk('shinR', buildShin(cfg, 1), J.kneeR);
    mk('upperL', buildUpperArm(cfg), J.shL); mk('upperR', buildUpperArm(cfg), J.shR);
    mk('foreL', buildForearm(cfg), J.elL); mk('foreR', buildForearm(cfg), J.elR);
    group.scale.setScalar(cfg.scale || 1);
  }
  build();

  // Boden-Schatten
  const blob = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: getBlobTexture(), transparent: true, depthWrite: false, toneMapped: false }));
  blob.position.y = 0.03;
  blob.renderOrder = 4;
  group.add(blob);

  // Aura
  const auraMat = auraMaterial();
  const aura = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.1, 4, 12), auraMat);
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

  // Animationszustand
  let anim = 'idle', animT = 0, prevAnim = 'idle';
  let phase = 0, moveSpeed = 0, lastStepHalf = 0;
  const cur = zeroPose(), tgt = zeroPose();
  let blend = 1;
  const h = {
    group, meshes, joints: J, blob, aura,
    get config() { return { ...cfg }; },
    get anim() { return anim; },
    height: 1.95,
    vy: 0,           // vom Controller gesetzt (für Sprung/Fall)
    onStep: null,    // (fuß: 'L'|'R') => {}
    setConfig(c) { cfg = { ...cfg, ...c }; build(); },
    setAnim(name) {
      if (name === anim) return;
      prevAnim = anim; anim = name; animT = 0; blend = 0;
    },
    setMoveSpeed(v) { moveSpeed = v; },
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
    // Grundhaltung: Arme leicht vom Körper
    set('shL', 0.05, 0, 0.12); set('shR', 0.05, 0, -0.12);
    set('elL', -0.18, 0, 0); set('elR', -0.18, 0, 0);
    const breathe = Math.sin(t * 1.8);
    if (anim === 'idle' || anim === 'think') {
      tgt.bodyY = breathe * 0.008;
      set('spine', breathe * 0.02, 0, 0);
      set('head', -breathe * 0.02 + Math.sin(t * 0.37) * 0.04, Math.sin(t * 0.23) * 0.25, 0);
      set('shL', 0.04 + breathe * 0.02, 0, 0.1 + breathe * 0.015); set('shR', 0.04 + breathe * 0.02, 0, -0.1 - breathe * 0.015);
      set('hipL', 0, 0, 0.03); set('hipR', 0, 0, -0.03);
      if (anim === 'think') { set('shR', -0.9, 0.3, -0.35); set('elR', -2.1, 0, 0); set('head', 0.12, 0.15, 0.08); }
    } else if (anim === 'walk' || anim === 'run') {
      const run = THREE.MathUtils.clamp((moveSpeed - 2.5) / 3.5, 0, 1);
      const stride = 1.25 + run * 0.9;
      phase += (dt * Math.max(moveSpeed, 0.8) / stride) * Math.PI;
      const s = Math.sin(phase), c = Math.cos(phase);
      const A = 0.5 + run * 0.35;
      set('hipL', -s * A, 0, 0.02); set('hipR', s * A, 0, -0.02);
      set('kneeL', Math.max(0, c) * (0.9 + run * 0.6) + Math.max(0, s) * 0.12, 0, 0);
      set('kneeR', Math.max(0, -c) * (0.9 + run * 0.6) + Math.max(0, -s) * 0.12, 0, 0);
      const aa = 0.45 + run * 0.45;
      set('shL', s * aa, 0, 0.12 + run * 0.05); set('shR', -s * aa, 0, -0.12 - run * 0.05);
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
      tgt.bodyY = -0.42;
      set('hipL', -1.5, 0, 0.1); set('hipR', -1.5, 0, -0.1);
      set('kneeL', 1.5, 0, 0); set('kneeR', 1.5, 0, 0);
      set('shL', -0.3, 0, 0.15); set('shR', -0.3, 0, -0.15); set('elL', -0.6, 0, 0); set('elR', -0.6, 0, 0);
      set('head', Math.sin(t * 0.4) * 0.05, Math.sin(t * 0.3) * 0.2, 0);
    }
  }
  return h;
}

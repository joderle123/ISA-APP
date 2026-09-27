// Kopf (Stil-Bibel §8.2/§8.3): weicher Anime-Schädel mit flacher Gesichtsfläche, große zweitonige Augen mit Lidlinie und
// Glanzpunkten (gemalte Geometrie, unbeleuchtet), Blinzel-Lider, Brauen und vier Münder für den Ausdruck, 15 Frisuren aus
// Strähnenklumpen mit Glanzband, Brillen (Fresnel-Glas), Hörgeräte, Sommersprossen, Vitiligo. Alles in Kopf-Koordinaten
// (Drehpunkt = Hals, Kopfmitte = Ursprung). Blickrichtung +z, die linke Seite der Figur ist +x.
//   buildHead(cfg, { withFace, withHair, withTail })  buildHairTail(cfg) → { geo, pivot:[x,y,z] } | null
//   buildBrow(cfg, s) → { geo, anchor:{pos, n, up, q} }  buildMouths(cfg) → { neutral, smile, frown, open, anchor }
//   buildLids(cfg) → { geo, y }  buildLenses(cfg) → geo | null  EYE (Maße)
import * as THREE from 'three';
import { fig, merge, capsule, sphere, lathe, strand, tube, flat, circle, almondPts, band, ringGrad, radial, FLAG, RoundedBoxGeometry } from './geo.js';
import { M, darker, lighter, mixHex, luma, hash01, rotToNormal, quatToNormal } from './base.js';
import { buildHeadItem, buildMask } from './cosmetics.js';

const R = M.headR;
export const HEAD_SCALE = [0.94, 1.12, 0.98];
const _v = new THREE.Vector3(), _a = new THREE.Vector3(), _b = new THREE.Vector3(), _n = new THREE.Vector3();
const sm = (a, b, x) => THREE.MathUtils.smoothstep(x, a, b);

// ---- Schädelform: Kugel → Anime-Kopf (Gesicht flach, Kinn schmal, Wangen voll, Hinterkopf rund) ----
export function headDeform(v) {
  const y = v.y / R, z = v.z / R;
  if (z > 0.5) v.z = R * (0.5 + (z - 0.5) * 0.6);                       // Gesichtsfläche abflachen
  if (y < 0) {
    const k = 1 - Math.pow(-y, 1.25) * 0.26;                              // Kinn schmaler
    v.x *= k;
    v.z *= 0.9 + 0.1 * k;
    if (y > -0.62) v.z += R * 0.03 * (1 - Math.abs(y + 0.3) / 0.32) * Math.max(0, z);   // Wangen minimal voller
  }
  if (z < -0.2 && y > -0.1) v.z *= 1.035;                                 // Hinterkopf
}
// Punkt und Normale auf der fertigen Kopfoberfläche in Richtung d (Kopf-Koordinaten)
function surf(dx, dy, dz, out = new THREE.Vector3()) {
  out.set(dx, dy, dz).normalize().multiplyScalar(R);
  headDeform(out);
  out.x *= HEAD_SCALE[0]; out.y *= HEAD_SCALE[1]; out.z *= HEAD_SCALE[2];
  return out;
}
export function headAnchor(dx, dy, dz) {
  const p = surf(dx, dy, dz);
  _n.set(dx, dy, dz).normalize();
  // Normale numerisch: zwei Nachbarpunkte auf der Fläche
  _a.copy(_n).applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.03); surf(_a.x, _a.y, _a.z, _a);
  _b.copy(_n).applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.03); surf(_b.x, _b.y, _b.z, _b);
  const n = new THREE.Vector3().subVectors(_a, p).cross(_v.subVectors(_b, p)).normalize();
  if (n.dot(_n) < 0) n.negate();
  const q = quatToNormal(n.x, n.y, n.z);
  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(q);
  const right = new THREE.Vector3(1, 0, 0).applyQuaternion(q);
  return { pos: p, n, q, up, right, rot: rotToNormal(n.x, n.y, n.z) };
}
// flache Form auf der Kopfoberfläche platzieren (Abstand off entlang der Normalen)
function onFace(geo, A, off, opts) {
  return fig(geo, { ...opts, pos: [A.pos.x + A.n.x * off, A.pos.y + A.n.y * off, A.pos.z + A.n.z * off], rot: A.rot });
}

// ---- Augen (der wichtigste Ausdrucksträger) ----
export const EYE = { w: 0.078, up: 0.025, down: 0.019, tilt: 0.1, iris: 0.0215, pupil: 0.008, x: 0.37, y: -0.07, z: 0.93 };
export const eyeAnchor = (s) => headAnchor(s * EYE.x, EYE.y, EYE.z);
export function lidColor(cfg) { return luma(cfg.hair) > 0.45 ? new THREE.Color('#4a3a3a') : darker(cfg.hair, 0.6); }

function buildEye(cfg, s, P) {
  const A = eyeAnchor(s);
  const flag = FLAG.flat;
  // sehr dunkle Augenfarben bekommen einen warmen Kern, damit Iris und Glanzpunkte lesbar bleiben
  const eye = luma(cfg.eyes) < 0.06 ? mixHex(cfg.eyes, '#7a4a2e', 0.45) : new THREE.Color(cfg.eyes);
  const white = new THREE.Color('#ffffff'), shade = new THREE.Color('#dde6ff');
  // Augapfel: Mandel, oben leicht bläulich beschattet
  P.push(onFace(flat(almondPts(EYE.w, EYE.up, EYE.down, 14, EYE.tilt, s)), A, 0.003, { flag, color: (x, y, z, out) => out.copy(white).lerp(shade, sm(0.004, 0.024, y)) }));
  // Iris: Rand dunkel → Kern, unten heller (Anime)
  const irisDark = eye.clone().multiplyScalar(0.45), irisLight = eye.clone().lerp(new THREE.Color('#ffffff'), 0.42), irisTop = eye.clone().multiplyScalar(0.72);
  const cx = -s * 0.001, cy = -0.0025;
  P.push(onFace(ringGrad(EYE.iris * 0.62, EYE.iris, 12, { cx, cy }), A, 0.0038, { flag, color: (x, y, z, out) => { const d = Math.hypot(x - cx, y - cy) / EYE.iris; out.copy(eye).lerp(irisDark, sm(0.62, 1, d)); } }));
  P.push(onFace(circle(EYE.iris * 0.63, 10, { cx, cy }), A, 0.0042, { flag, color: (x, y, z, out) => out.copy(y - cy > 0 ? irisTop : eye).lerp(irisLight, sm(0.0, -0.012, y - cy)) }));
  // Pupille (leicht hochoval), zwei Glanzpunkte
  P.push(onFace(circle(EYE.pupil, 8, { ry: EYE.pupil * 1.25, cx, cy: cy - 0.0005 }), A, 0.0048, { flag, color: '#14102a' }));
  P.push(onFace(circle(0.0052, 8, { cx: cx + 0.0068, cy: cy + 0.0082 }), A, 0.0056, { flag, color: '#ffffff' }));
  P.push(onFace(circle(0.0026, 6, { cx: cx - 0.0062, cy: cy - 0.0068 }), A, 0.0056, { flag, color: '#ffffff' }));
  // Oberlid: dunkler Strich entlang der Oberkante, außen dicker und als Wimpernspitze über die Ecke hinaus
  const w2 = EYE.w / 2;
  const lidTop = (t) => { const x = (t * 2 - 1) * (w2 + 0.004); const u = Math.max(0, 1 - (x / w2) ** 2); return EYE.up * Math.sqrt(u) * Math.pow(1 - Math.abs(x / w2) * 0.15, 0.5) + (Math.abs(x) > w2 ? -0.004 * (Math.abs(x) - w2) / 0.004 : 0); };
  const outerT = (t) => (s > 0 ? t : 1 - t);
  const lid = band(-(w2 + 0.004), w2 + 0.005, lidTop, (t) => 0.0045 + 0.005 * Math.pow(outerT(t), 1.5), 10);
  lid.rotateZ(EYE.tilt * s);
  P.push(onFace(lid, A, 0.006, { flag, color: lidColor(cfg) }));
  // Unterlid: nur eine Hauttonkante außen
  const lower = band(s * w2 * 0.15, s * w2 * 0.92, (t) => -EYE.down * Math.sqrt(Math.max(0, 1 - ((0.15 + 0.77 * t)) ** 2)) - 0.0015, () => 0.0018, 8);
  lower.rotateZ(EYE.tilt * s);
  P.push(onFace(lower, A, 0.0045, { flag, color: darker(cfg.skin, 0.82) }));
}
// Blinzel-Lider (eigenes Mesh; skaliert von der Oberkante nach unten). Rückgabe: Geometrie (Ursprung auf der Lidlinie) + y
export function buildLids(cfg) {
  const P = [];
  let yLine = 0;
  for (const s of [-1, 1]) {
    const A = eyeAnchor(s);
    yLine = A.pos.y + A.up.y * (EYE.up + 0.003);
    P.push(onFace(flat(almondPts(EYE.w + 0.008, EYE.up + 0.004, EYE.down + 0.004, 16, EYE.tilt, s)).translate(0, -(EYE.up + 0.004) - 0.0005, 0), A, 0.0072, { flag: FLAG.skin, color: darker(cfg.skin, 0.94), pos: undefined }));
  }
  const g = merge(P);
  // Lidlinie auf y = 0 legen, damit scale.y = 0…1 das Lid schließt (Position des Meshes = yLine, siehe index.js)
  g.translate(0, -yLine, 0);
  return { geo: g, y: yLine };
}

// ---- Brauen (eigene Meshes) und Münder ----
export const BROW = { x: 0.35, y: 0.22, z: 0.9 };
export function buildBrow(cfg, s) {
  const st = cfg.brows || 'normal';
  const w = st === 'schmal' ? 0.05 : st === 'stark' ? 0.062 : 0.057;
  const th = st === 'schmal' ? 0.005 : st === 'stark' ? 0.0145 : 0.0095;
  const arch = st === 'geschwungen' ? 0.007 : 0.0018;
  const inner = (t) => (s > 0 ? 1 - t : t);       // 1 an der Nasenseite
  const g = band(-w / 2, w / 2, (t) => arch * Math.sin(Math.PI * t) - (st === 'geschwungen' ? 0.002 : 0), (t) => th * (0.55 + 0.45 * inner(t)), 10);
  const col = luma(cfg.hair) > 0.6 ? mixHex(cfg.hair, '#6a4a3a', 0.6) : darker(cfg.hair, 0.7);
  const anchor = headAnchor(s * BROW.x, BROW.y, BROW.z);
  return { geo: fig(g, { flag: FLAG.flat, color: col }), anchor };
}
export const MOUTH = { x: 0, y: -0.44, z: 0.9 };
export function mouthColor(cfg) { return mixHex(darker(cfg.skin, 0.55), '#8a4550', 0.5); }
export function buildMouth(cfg, kind) {
  const c = mouthColor(cfg);
  const flag = FLAG.flat;
  if (kind === 'neutral') return fig(band(-0.017, 0.017, () => 0, (t) => 0.0038 + 0.001 * Math.sin(Math.PI * t), 6), { flag, color: c });
  if (kind === 'smile') return fig(band(-0.024, 0.024, (t) => -0.011 * (1 - (2 * t - 1) ** 2), (t) => 0.003 + 0.0025 * Math.sin(Math.PI * t), 12), { flag, color: c });
  if (kind === 'frown') return fig(band(-0.018, 0.018, (t) => 0.008 * (1 - (2 * t - 1) ** 2) - 0.004, (t) => 0.003 + 0.002 * Math.sin(Math.PI * t), 10), { flag, color: c });
  // offen: dunkle Ellipse mit Zahnkante
  return merge([
    fig(circle(0.013, 14, { ry: 0.0105 }), { flag, color: '#7a2e3a' }),
    fig(band(-0.009, 0.009, () => 0.0065, () => 0.0032, 4).translate(0, 0, 0.0008), { flag, color: '#ffffff' }),
  ]);
}
export const mouthAnchor = () => headAnchor(MOUTH.x, MOUTH.y, MOUTH.z);

// ---- Haare ----
function hairPalette(cfg) {
  const hair = cfg.hair;
  const dark = luma(hair) < 0.16;
  return { base: new THREE.Color(hair), under: darker(hair, 0.72), shine: dark ? mixHex(hair, '#7a86b8', 0.42) : lighter(hair, 0.3), accent: new THREE.Color(cfg.hairAccent) };
}
// Farbfunktion mit Glanzband (Ring bei ~70 % Kopfhöhe, zur Stirn hin geneigt) und dunkler Unterseite
function hairColorFn(pal, { shineY = 0.05, shineH = 0.045, tilt = 0.2, underY = -0.02, accentTips = null } = {}) {
  return (x, y, z, out) => {
    const yb = shineY + z * tilt;
    const d = y - yb;
    if (d > 0 && d < shineH) out.copy(pal.shine);
    else if (y < underY) out.copy(pal.under).lerp(pal.base, sm(underY - 0.08, underY, y));
    else out.copy(pal.base);
    if (accentTips && y < accentTips) out.lerp(pal.accent, sm(accentTips, accentTips - 0.05, y));
  };
}
// Haar-Kappe: Kugelsegment, hinten tiefer, vorn eine Stirnkante, unten gezackter Saum (Strähnenspitzen statt Helmrand)
function cap(cfg, pal, r, thetaLen, lowBack = 0.1, frontY = 0.05, extra = {}, { scallop = 0.012, n = 11 } = {}) {
  return fig(new THREE.SphereGeometry(r, 20, 12, 0, Math.PI * 2, 0, Math.PI * thetaLen), {
    pos: [0, 0.02, -0.008], scale: [1.0, 1.12, 1.04],
    deform: (v) => {
      if (v.y < 0.05) {
        const f = sm(-0.1, 0.45, v.z / r);
        v.y = THREE.MathUtils.lerp(v.y - lowBack, Math.max(v.y, frontY), f);
        // Saum: gezackt (nur hinten/seitlich, vorn übernimmt der Pony)
        const a = Math.atan2(v.x, v.z);
        v.y += scallop * (1 - f) * (0.5 + 0.5 * Math.sin(a * n + 0.7)) * sm(0.02, -0.06, v.y - frontY);
      }
    },
    color: hairColorFn(pal), ...extra,
  });
}
// Strähne am Kopf: Basis in Richtung d auf dem Kappenradius, flach an den Kopf gedrückt, Blattprofil
function lock(pal, P, { d, y, len, dir, r = 0.018, bend = [0, 0, 0], flat = 0.4, taper = 0.55, k = 0.96, wave = 0, seed = 0, steps = 4, segs = 6, color = null, leaf = true }) {
  const Rc = R * 1.06 * k;
  const b = new THREE.Vector3(d[0], 0, d[2]).normalize();
  const at = [b.x * Rc, y, b.z * Rc * 1.02 - 0.008];
  P.push(fig(strand({ at, dir, len, r, bend, flat, flatDir: [b.x, 0.3, b.z], taper, wave, seed, steps, segs, leaf }), { color: color || hairColorFn(pal) }));
}
// Pony: viele flache, überlappende Strähnen über der Stirn, seitlich gefegt (side), Spitzen leicht nach innen
function fringe(cfg, pal, P, { n = 8, len = 0.085, side = 0.3, y = 0.07, spread = 1.35, r = 0.019, up = 0 } = {}) {
  for (let i = 0; i < n; i++) {
    const a = (i / (n - 1) - 0.5) * spread + 0.06;
    const sx = Math.sin(a), sz = Math.cos(a);
    const L = len * (0.85 + hash01(i, 3) * 0.3) * (1 - Math.abs(i / (n - 1) - 0.5) * 0.25);
    lock(pal, P, { d: [sx, 0, sz], y: y + Math.abs(a) * 0.012, len: L, dir: [sx * 0.35 + side, -1 + up, sz * 0.25], r: r * (0.85 + hash01(i, 5) * 0.3), bend: [-sx * 0.015 + side * 0.02, 0.0, -sz * 0.03], seed: i });
  }
}
// Schläfensträhnen vor den Ohren (zwei je Seite)
function sideLocks(pal, P, len = 0.09, r = 0.018) {
  for (const s of [-1, 1]) {
    lock(pal, P, { d: [s, 0, 0.2], y: 0.045, len, dir: [s * 0.05, -1, 0.1], r, bend: [-s * 0.01, 0, 0.01] });
    lock(pal, P, { d: [s, 0, 0.42], y: 0.055, len: len * 0.8, dir: [s * 0.12, -1, 0.18], r: r * 0.85, bend: [-s * 0.012, 0, -0.005] });
  }
}
// Nacken: Kranz kurzer flacher Strähnen am hinteren Saum
function napeLocks(pal, P, n = 6, len = 0.045) {
  for (let i = 0; i < n; i++) { const a = (i / (n - 1) - 0.5) * 1.6 + Math.PI; lock(pal, P, { d: [Math.sin(a), 0, Math.cos(a)], y: -0.035, len, dir: [Math.sin(a) * 0.15, -1, Math.cos(a) * 0.15], r: 0.015, bend: [-Math.sin(a) * 0.01, 0, -Math.cos(a) * 0.012], flat: 0.5 }); }
}
// Scheitel: ein paar flache Strähnen auf der Kalotte, die vom Pony nach hinten fegen (Haarrichtung)
function crownLocks(pal, P, side = 0.3, n = 5) {
  for (let i = 0; i < n; i++) {
    const u = i / (n - 1) - 0.5;
    const x0 = u * 0.09 - side * 0.02;
    P.push(fig(strand({ at: [x0, 0.165, -0.06], dir: [side * 0.6 + u * 0.3, -0.42, 1], len: 0.15 + hash01(i, 6) * 0.02, r: 0.024, bend: [side * 0.01, -0.045, 0], flat: 0.3, flatDir: [u * 0.5, 1, 0.3], leaf: true, segs: 6, steps: 5, seed: 20 + i }), { color: hairColorFn(pal) }));
  }
}
// Hinterkopf: flache Strähnen vom Wirbel abwärts (Haarrichtung auch von hinten lesbar)
function backLocks(pal, P, n = 3, len = 0.12) {
  for (let i = 0; i < n; i++) {
    const a = Math.PI + (i / (n - 1) - 0.5) * 1.3;
    const sx = Math.sin(a), sz = Math.cos(a);
    lock(pal, P, { d: [sx, 0, sz], y: 0.09 - Math.abs(i / (n - 1) - 0.5) * 0.03, len: len * (0.9 + hash01(i, 6) * 0.2), dir: [sx * 0.35, -1, sz * 0.4], r: 0.034, bend: [-sx * 0.02, -0.01, -sz * 0.03], flat: 0.28, k: 0.88, seed: 40 + i });
  }
}
// Hinterkopf als große Klumpen (Volumen hinter der Kappe)
function backVolume(pal, P, n = 3, y = 0.05) {
  for (let i = 0; i < n; i++) { const a = Math.PI + (i / (n - 1) - 0.5) * 1.1; lock(pal, P, { d: [Math.sin(a), 0, Math.cos(a)], y, len: 0.11, dir: [Math.sin(a) * 0.5, -1, Math.cos(a) * 0.5], r: 0.03, bend: [0, -0.01, 0], flat: 0.6, k: 0.9 }); }
}
// Haarschweif hinten (lang): breite Bahn mit gewelltem Saum (offene Drehform)
function backSheet(pal, len = 0.36, r0 = R * 1.1, r1 = R * 1.02, { phi = 0.8, flare = 0.03, pos = [0, 0.0, -0.012] } = {}) {
  return fig(lathe([[r0 * 0.92, 0.06], [r0, -0.02], [r0 * 0.98, -len * 0.4], [r1 + flare * 0.5, -len * 0.75], [r1 + flare, -len], [r1 + flare - 0.01, -len - 0.008]], 14, Math.PI * (1 - phi), Math.PI * 2 * phi), {
    pos, scale: [1, 1, 1.02],
    deform: (v) => { const a = Math.atan2(v.x, v.z); if (v.y < -len * 0.9) v.y += Math.sin(a * 9) * 0.012 - 0.005; if (v.y < -0.2) v.z -= (-0.2 - v.y) * 0.12; },
    color: hairColorFn(pal, { shineY: 0.05, underY: -0.12 }),
  });
}

function buildHair(cfg, P, { withTail = true } = {}) {
  const style = cfg.hairStyle, pal = hairPalette(cfg);
  switch (style) {
    case 'glatze':
      break;
    case 'buzz':
      P.push(cap(cfg, pal, R * 1.012, 0.5, 0.02, 0.055, { color: mixHex(cfg.hair, cfg.skin, 0.3) }));
      break;
    case 'afro':
      P.push(fig(new THREE.SphereGeometry(R * 1.48, 22, 14), {
        pos: [0, 0.05, -0.02],
        deform: (v) => {
          const b = 1 + 0.03 * Math.sin(v.x * 42 + 1) * Math.sin(v.y * 39) * Math.sin(v.z * 37 + 2);
          v.multiplyScalar(b);
          if (v.z > 0.1 && v.y < 0.08) v.z = 0.1 + (v.z - 0.1) * 0.22;
        },
        color: hairColorFn(pal, { shineY: 0.09, shineH: 0.06, tilt: 0.25, underY: -0.06 }),
      }));
      break;
    case 'locs': {
      P.push(cap(cfg, pal, R * 1.06, 0.52, 0.05, 0.05));
      if (!withTail) P.push(buildLocs(cfg, pal).geo);
      break;
    }
    case 'flechtzoepfe': {
      P.push(cap(cfg, pal, R * 1.03, 0.52, 0.06, 0.05));
      // Cornrow-Linien über die Kappe (dünne Schläuche entlang des Bogens)
      for (let i = 0; i < 5; i++) {
        const a = (i - 2) * 0.3, pts = [];
        for (let k = 0; k <= 8; k++) { const t = k / 8, lat = (t - 0.5) * Math.PI * 0.92; pts.push(new THREE.Vector3(Math.sin(a) * Math.cos(lat) * R * 1.05, Math.sin(lat) * R * 1.05 * 1.1 + 0.02, Math.cos(a) * Math.cos(lat) * R * 1.05 * 1.04 - 0.008)); }
        P.push(fig(tube(pts.map((p) => { const q = p.clone(); q.y = Math.max(q.y, 0.02); return q; }), pts.map(() => 0.009), { segs: 4 }), { color: darker(cfg.hair, 0.78) }));
      }
      if (!withTail) P.push(buildBraids(cfg, pal).geo);
      break;
    }
    case 'kopftuch': {
      const tuch = cfg.headColor;
      P.push(fig(new THREE.SphereGeometry(R * 1.13, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.62), { pos: [0, 0.015, -0.012], scale: [1, 1.08, 1.04], color: tuch, deform: (v) => { if (v.z > R * 0.55 && v.y < 0.09) v.y = Math.max(v.y, 0.09 - (v.z - R * 0.55) * 0.3); } }));
      P.push(fig(new THREE.CylinderGeometry(R * 1.12, 0.245, 0.3, 18, 3, true, 0.62, Math.PI * 2 - 1.24), { pos: [0, -0.14, -0.02], scale: [1, 1, 0.92], color: (x, y, z, out) => out.set(tuch).multiplyScalar(0.9 + 0.1 * sm(-0.15, 0.1, y)), deform: (v) => { v.z -= Math.max(0, -v.y - 0.05) * 0.1; } }));
      P.push(fig(new THREE.TorusGeometry(R * 1.09, 0.011, 6, 20, Math.PI * 1.3), { pos: [0, 0.075, -0.005], rot: [Math.PI / 2 - 0.55, 0, Math.PI * 0.35], color: darker(tuch, 0.82) }));
      break;
    }
    case 'bob':
      P.push(cap(cfg, pal, R * 1.06, 0.6, 0.13, 0.04, {}, { scallop: 0 }));
      fringe(cfg, pal, P, { n: 9, len: 0.075, side: 0, y: 0.075, spread: 1.4, r: 0.017 });
      for (const s of [-1, 1]) P.push(fig(lathe([[R * 1.0, 0.06], [R * 1.08, -0.02], [R * 1.07, -0.09], [R * 1.0, -0.15], [R * 0.9, -0.165]], 10, s > 0 ? Math.PI * 0.02 : Math.PI * 1.12, Math.PI * 0.86), { pos: [0, 0.0, -0.01], deform: (v) => { if (v.y < -0.1) v.z += (-0.1 - v.y) * 0.4; }, color: hairColorFn(pal, { shineY: 0.05, underY: -0.09 }) }));
      P.push(backSheet(pal, 0.16, R * 1.1, R * 1.04, { phi: 0.55, flare: 0.0 }));
      break;
    case 'undercut':
      P.push(cap(cfg, pal, R * 1.008, 0.5, 0.02, 0.055, { color: mixHex(cfg.hair, cfg.skin, 0.4) }));
      P.push(fig(new THREE.SphereGeometry(R * 1.05, 22, 12, 0, Math.PI * 2, 0, Math.PI * 0.4), { pos: [0, 0.035, -0.012], scale: [0.95, 1.1, 1.02], color: hairColorFn(pal, { shineY: 0.06 }) }));
      for (let i = 0; i < 9; i++) {
        const a = (i / 8 - 0.5) * 2.2 - 0.3, sx = Math.sin(a), sz = Math.cos(a);
        lock(pal, P, { d: [sx, 0, sz], y: 0.11 + Math.cos(a) * 0.015, len: 0.1 + hash01(i, 8) * 0.03, dir: [0.9, -0.3 + hash01(i, 9) * 0.2, sz * 0.5], r: 0.021, bend: [0.02, -0.035, 0], flat: 0.4, k: 0.9, seed: i });
      }
      fringe(cfg, pal, P, { n: 5, len: 0.07, side: 0.7, y: 0.075, spread: 0.9, r: 0.017 });
      break;
    case 'irokese':
      P.push(cap(cfg, pal, R * 1.008, 0.5, 0.02, 0.055, { color: mixHex(cfg.hair, cfg.skin, 0.4) }));
      for (let i = 0; i < 7; i++) {
        const z = 0.1 - i * 0.036, h = 0.14 + Math.sin(i / 6 * Math.PI) * 0.05;
        P.push(fig(strand({ at: [0, 0.11 + Math.sin(i / 6 * Math.PI) * 0.03, z], dir: [0, 1, 0.35 - i * 0.08], len: h, r: 0.028, bend: [0, 0, 0.02], flat: 0.45, flatDir: [1, 0, 0], taper: 0.7 }), { color: hairColorFn(pal, { shineY: 0.14, shineH: 0.05, tilt: 0, accentTips: null }) }));
      }
      break;
    case 'stachel':
      P.push(cap(cfg, pal, R * 1.05, 0.56, 0.06, 0.035, {}, { scallop: 0.008 }));
      sideLocks(pal, P, 0.06, 0.016);
      for (let i = 0; i < 11; i++) {
        const a = (i / 11) * Math.PI * 2 + 0.3, tilt = 0.5 + (i % 2) * 0.3, rr = 0.045 + (i % 3) * 0.015;
        P.push(fig(strand({ at: [Math.cos(a) * rr, 0.125 - (i % 3) * 0.01, Math.sin(a) * rr - 0.015], dir: [Math.cos(a) * tilt, 1, Math.sin(a) * tilt - 0.25], len: 0.11 + hash01(i, 4) * 0.03, r: 0.024, bend: [Math.cos(a) * 0.012, 0, Math.sin(a) * 0.01], flat: 0.7, leaf: true, segs: 6 }), { color: hairColorFn(pal, { shineY: 0.14, shineH: 0.05, accentTips: null }) }));
      }
      break;
    case 'locken':
      P.push(cap(cfg, pal, R * 1.08, 0.62, 0.1, 0.035, {}, { scallop: 0.018, n: 9 }));
      // Locken: weiche Kugelklumpen in zwei Kränzen plus Stirnlocken
      for (let i = 0; i < 18; i++) {
        const ring = i % 3, a = (Math.floor(i / 3) / 6) * Math.PI * 2 + ring * 0.35 + 0.2;
        const y = 0.0 + ring * 0.05, rr = R * (1.02 + ring * 0.03), sx = Math.sin(a), sz = Math.cos(a);
        if (sz > 0.75 && ring === 0) continue;
        P.push(fig(sphere(0.03 + hash01(i, 2) * 0.008, 8, 6), { pos: [sx * rr, y + 0.02, sz * rr * 1.02 - 0.01], scale: [1, 0.9, 1], color: hairColorFn(pal, { shineY: 0.06, shineH: 0.04 }) }));
      }
      for (let i = 0; i < 5; i++) { const a = (i / 4 - 0.5) * 1.3; P.push(fig(sphere(0.026, 8, 6), { pos: [Math.sin(a) * R * 0.98, 0.065 - Math.abs(a) * 0.02, Math.cos(a) * R * 1.0 + 0.005], scale: [1, 0.8, 0.7], color: hairColorFn(pal, { shineY: 0.06, shineH: 0.03 }) })); }
      break;
    case 'lang':
      P.push(cap(cfg, pal, R * 1.05, 0.56, 0.1, 0.035, {}, { scallop: 0 }));
      fringe(cfg, pal, P, { side: 0.25, y: 0.085, len: 0.095 });
      crownLocks(pal, P, 0.25, 4);
      for (const s of [-1, 1]) { lock(pal, P, { d: [s, 0, 0.35], y: 0.02, len: 0.3, dir: [s * 0.05, -1, 0.08], r: 0.024, bend: [-s * 0.012, 0, 0.02], flat: 0.5, steps: 6, leaf: true }); lock(pal, P, { d: [s, 0, 0.1], y: 0.0, len: 0.24, dir: [s * 0.08, -1, 0.02], r: 0.02, bend: [-s * 0.01, 0, 0.0], flat: 0.5, steps: 5, leaf: true }); }
      if (!withTail) P.push(buildBackSheet(cfg, pal).geo);
      break;
    case 'zopf':
      P.push(cap(cfg, pal, R * 1.05, 0.56, 0.06, 0.035, {}, { scallop: 0.006 }));
      fringe(cfg, pal, P, { side: 0.2, y: 0.085, len: 0.09 });
      crownLocks(pal, P, 0.1, 4);
      backLocks(pal, P, 4, 0.08);
      sideLocks(pal, P);
      if (!withTail) P.push(buildPonytail(cfg, pal).geo);
      break;
    case 'dutt':
      P.push(cap(cfg, pal, R * 1.05, 0.56, 0.06, 0.035, {}, { scallop: 0.006 }));
      fringe(cfg, pal, P, { side: 0.15, n: 7 });
      backLocks(pal, P, 4, 0.07);
      sideLocks(pal, P, 0.07);
      P.push(fig(sphere(0.062, 12, 9), { pos: [0, 0.15, -0.065], scale: [1.1, 0.95, 1], color: hairColorFn(pal, { shineY: 0.155, shineH: 0.03, tilt: 0.1 }) }));
      P.push(fig(new THREE.TorusGeometry(0.05, 0.0095, 5, 14), { pos: [0, 0.118, -0.048], rot: [0.75, 0, 0], color: pal.accent }));
      break;
    case 'kurz':
    default:
      P.push(cap(cfg, pal, R * 1.05, 0.58, 0.06, 0.02));
      fringe(cfg, pal, P, { side: 0.35, y: 0.085, len: 0.095 });
      crownLocks(pal, P, 0.35, 5);
      backLocks(pal, P);
      sideLocks(pal, P);
      napeLocks(pal, P);
  }
}
// ---- Haarschweif-Teile (in voller Stufe eigenes Mesh am Feder-Drehpunkt; in „lite“ in den Kopf gebacken) ----
function buildBackSheet(cfg, pal) { return { geo: backSheet(pal, 0.38), pivot: [0, 0.0, -0.05] }; }
function buildPonytail(cfg, pal) {
  const P = [];
  P.push(fig(strand({ at: [0, 0.03, -R * 1.0], dir: [0, -0.55, -0.85], len: 0.3, r: 0.034, bend: [0, -0.2, 0.12], taper: 0.7, flat: 0.8, steps: 7, wave: 0.004 }), { color: hairColorFn(pal, { shineY: 0.0, shineH: 0.04, tilt: 0 }) }));
  P.push(fig(new THREE.TorusGeometry(0.03, 0.011, 5, 10), { pos: [0, 0.03, -R * 1.05], rot: [0.9, 0, 0], color: pal.accent }));
  return { geo: merge(P), pivot: [0, 0.03, -R * 0.95] };
}
function buildLocs(cfg, pal) {
  const P = [];
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2 + 0.22;
    if (Math.cos(a) > 0.82) continue;              // vorn bleibt das Gesicht frei
    const len = 0.2 + hash01(i, 3) * 0.14;
    const x = Math.sin(a), z = Math.cos(a);
    P.push(fig(strand({ at: [x * R * 1.06, 0.03, z * R * 1.06 - 0.01], dir: [x * 0.22, -1, z * 0.2], len, r: 0.019, bend: [x * 0.01, 0, z * 0.01], taper: 0.28, flat: 1, steps: 6, wave: 0.006, seed: i }), { color: hairColorFn(pal, { shineY: 0.02, shineH: 0.03, underY: -0.1, accentTips: null }) }));
    if (i === 1 || i === 6 || i === 10) P.push(fig(new THREE.CylinderGeometry(0.023, 0.023, 0.022, 7, 1), { pos: [x * R * 1.12, -0.11, z * R * 1.12 - 0.01], color: pal.accent }));
  }
  return { geo: merge(P), pivot: [0, 0.03, -0.01] };
}
function buildBraids(cfg, pal) {
  const P = [];
  for (const s of [-1, 1]) {
    const pts = [], radii = [];
    for (let k = 0; k <= 12; k++) { const t = k / 12; pts.push(new THREE.Vector3(s * (R * 0.98 + 0.01 * (1 - t)), 0.0 - t * 0.31, -0.03 + t * 0.07)); radii.push(k === 12 ? 0 : 0.019 + 0.006 * Math.sin(t * 40) * (1 - t * 0.4)); }
    P.push(fig(tube(pts, radii, { segs: 6 }), { color: hairColorFn(pal, { shineY: 0.0, shineH: 0.03, tilt: 0, underY: -0.2 }) }));
    P.push(fig(new THREE.CylinderGeometry(0.02, 0.02, 0.026, 7, 1), { pos: [s * R * 0.98, -0.3, 0.035], color: pal.accent }));
  }
  return { geo: merge(P), pivot: [0, 0.0, -0.02] };
}
// Schweif-Teil je Frisur (oder null): { geo, pivot } – Geometrie in Kopf-Koordinaten (index.js verschiebt zum Drehpunkt)
export function buildHairTail(cfg) {
  const pal = hairPalette(cfg);
  switch (cfg.hairStyle) {
    case 'lang': return buildBackSheet(cfg, pal);
    case 'zopf': return buildPonytail(cfg, pal);
    case 'locs': return buildLocs(cfg, pal);
    case 'flechtzoepfe': return buildBraids(cfg, pal);
    default: return null;
  }
}

// ---- Sommersprossen und Vitiligo (flache Flecken auf der Kopfoberfläche) ----
function buildSkinMarks(cfg, P) {
  const skin = cfg.skin;
  const freck = Number(cfg.freckles) || 0;
  if (freck > 0) {
    const col = darker(skin, 0.74);
    const n = freck >= 2 ? 11 : 6;
    for (const s of [-1, 1]) for (let i = 0; i < n; i++) {
      const u = hash01(i, 7 + s), v = hash01(i, 19 + s);
      const A = headAnchor(s * (0.3 + u * 0.4), -0.16 - v * 0.2, 0.82 - u * 0.15);
      P.push(onFace(circle(0.0045 + hash01(i, 5) * 0.0025, 6), A, 0.002, { flag: FLAG.skin, color: col }));
    }
  }
  if (cfg.vitiligo) {
    const col = mixHex(skin, '#f8ede2', 0.7);
    const spots = [[0.55, 0.45, 0.7, 0.03], [-0.7, 0.1, 0.65, 0.026], [0.2, -0.6, 0.72, 0.022], [-0.35, 0.75, 0.5, 0.024], [0.85, -0.2, 0.35, 0.02]];
    spots.forEach(([ax, ay, az, r], i) => { const A = headAnchor(ax, ay, az); P.push(onFace(circle(r, 9, { ry: r * (0.8 + hash01(i, 2) * 0.4) }), A, 0.002, { flag: FLAG.skin, color: col })); });
  }
}

// ---- Brillen ----
const LENS = { off: 0.014 };
function buildGlassesFrame(cfg, P) {
  const g = cfg.glasses, c = cfg.glassesColor;
  if (!g || g === 'keine') return;
  const temple = (s) => {
    const A = eyeAnchor(s);
    const p0 = A.pos.clone().addScaledVector(A.right, s * 0.045).addScaledVector(A.n, LENS.off);
    const p1 = new THREE.Vector3(s * R * 0.97, 0.012, -0.02);
    P.push(fig(tube([p0, p0.clone().lerp(p1, 0.5), p1, p1.clone().add(new THREE.Vector3(0, -0.01, -0.03))], [0.004, 0.0035, 0.0035, 0.0025], { segs: 5 }), { color: c }));
  };
  if (g === 'rund') {
    for (const s of [-1, 1]) { const A = eyeAnchor(s); P.push(fig(new THREE.TorusGeometry(0.038, 0.0042, 5, 20), { pos: [A.pos.x + A.n.x * LENS.off, A.pos.y + A.n.y * LENS.off, A.pos.z + A.n.z * LENS.off], rot: A.rot, color: c })); }
    P.push(fig(new THREE.CylinderGeometry(0.0035, 0.0035, 0.04, 6, 1), { pos: [0, 0.006, R * 0.9 + 0.005], rot: [0, 0, Math.PI / 2], color: c }));
    temple(-1); temple(1);
  } else if (g === 'eckig') {
    for (const s of [-1, 1]) {
      const A = eyeAnchor(s);
      const pts = [];
      const w = 0.078, h = 0.05, r = 0.012;
      for (let k = 0; k <= 16; k++) { const t = k / 16 * Math.PI * 2; const cx = Math.cos(t), sy = Math.sin(t); const x = Math.sign(cx) * Math.max(0, Math.abs(cx) * (w / 2) - r) + cx * r; const y = Math.sign(sy) * Math.max(0, Math.abs(sy) * (h / 2) - r) + sy * r; pts.push(new THREE.Vector3(x, y, 0).applyQuaternion(A.q).add(A.pos).addScaledVector(A.n, LENS.off)); }
      P.push(fig(tube(pts, pts.map(() => 0.004), { segs: 5 }), { color: c }));
    }
    P.push(fig(new THREE.CylinderGeometry(0.0035, 0.0035, 0.03, 6, 1), { pos: [0, 0.01, R * 0.9 + 0.005], rot: [0, 0, Math.PI / 2], color: c }));
    temple(-1); temple(1);
  } else if (g === 'sport') {
    P.push(fig(new THREE.TorusGeometry(R * 1.02, 0.0095, 5, 18, Math.PI * 0.86), { pos: [0, 0.03, -0.005], rot: [Math.PI / 2, 0, Math.PI * 0.07], color: c }));
    for (const s of [-1, 1]) P.push(fig(capsule(0.005, 0.004, 0.12), { pos: [s * R * 0.99, 0.02, R * 0.3], rot: [Math.PI / 2, 0, 0], color: c }));
  }
}
// Gläser als eigene, durchsichtige Geometrie (Material: Glas mit Fresnel)
export function buildLenses(cfg) {
  const g = cfg.glasses;
  if (!g || g === 'keine') return null;
  const P = [];
  if (g === 'rund') for (const s of [-1, 1]) P.push(onFace(circle(0.035, 16), eyeAnchor(s), LENS.off - 0.002, { color: '#dff3ff', smooth: false }));
  else if (g === 'eckig') for (const s of [-1, 1]) P.push(onFace(new THREE.PlaneGeometry(0.07, 0.044), eyeAnchor(s), LENS.off - 0.002, { color: '#dff3ff', smooth: false }));
  else P.push(fig(new THREE.SphereGeometry(R * 1.015, 18, 6, Math.PI * 0.1, Math.PI * 0.8, Math.PI * 0.4, Math.PI * 0.18), { pos: [0, 0.03, -0.005], color: '#6a5cff' }));
  return merge(P);
}

function buildHearingAids(cfg, P) {
  const h = cfg.hearingAid;
  if (!h || h === 'keins') return;
  const sides = h === 'beide' ? [-1, 1] : h === 'links' ? [1] : [-1];
  const c = cfg.aidColor;
  for (const s of sides) {
    P.push(fig(new THREE.TorusGeometry(0.026, 0.0075, 5, 10, Math.PI), { pos: [s * R * 0.98, 0.012, -0.03], rot: [0, Math.PI / 2, 0], scale: [1, 1.2, 1], color: c }));
    P.push(fig(new RoundedBoxGeometry(0.011, 0.018, 0.013, 1, 0.004), { pos: [s * R * 0.94, -0.006, 0.002], color: darker(c, 0.7) }));
    P.push(fig(sphere(0.0045, 6, 4), { pos: [s * R * 1.0, 0.02, -0.045], flag: FLAG.flat, color: lighter(c, 0.6) }));
  }
}

// ---- Kopf zusammensetzen ----
// opts.withFace: Augen, Brauen (statisch), Mund neutral einbacken (lite) · opts.withTail: Schweif einbacken (lite)
export function buildHead(cfg, { withFace = true, withBrows = false, withMouth = false, withTail = false } = {}) {
  const P = [];
  const skin = cfg.skin;
  P.push(fig(new THREE.SphereGeometry(R, 20, 14), { scale: HEAD_SCALE, deform: headDeform, flag: FLAG.skin, color: skin }));
  // Ohren mit Innenfläche
  for (const s of [-1, 1]) {
    P.push(fig(sphere(0.032, 10, 7), { pos: [s * R * 0.92, -0.008, -0.012], scale: [0.5, 1.05, 0.8], flag: FLAG.skin, color: skin }));
    P.push(fig(circle(0.016, 8, { ry: 0.02 }), { pos: [s * (R * 0.92 + 0.017), -0.008, -0.012], rot: [0, s * Math.PI / 2, 0], flag: FLAG.skin, color: darker(skin, 0.84) }));
  }
  // Nase: kleiner weicher Keil, Schatten nur an der Seite
  const NA = headAnchor(0, -0.2, 1);
  P.push(fig(sphere(0.012, 8, 6), { pos: [NA.pos.x, NA.pos.y - 0.002, NA.pos.z + 0.004], scale: [0.7, 1.25, 1.0], flag: FLAG.skin, color: (x, y, z, out) => out.set(skin).multiplyScalar(x < -0.003 ? 0.9 : 1) }));
  // Wangen: 8 % Rosa als flache Flecken
  for (const s of [-1, 1]) { const A = headAnchor(s * 0.55, -0.32, 0.75); const blush = mixHex(skin, '#ff8fab', 0.16), sk = new THREE.Color(skin); P.push(onFace(circle(0.03, 10, { ry: 0.02 }), A, 0.0018, { flag: FLAG.skin, color: (x, y, z, out) => out.copy(blush).lerp(sk, Math.min(1, Math.hypot(x / 0.03, y / 0.02))) })); }
  if (withFace) { buildEye(cfg, 1, P); buildEye(cfg, -1, P); }
  if (withBrows) for (const s of [-1, 1]) { const b = buildBrow(cfg, s); P.push(reuse(b.geo, b.anchor)); }
  if (withMouth) { const A = mouthAnchor(); P.push(reuse(buildMouth(cfg, 'neutral'), A)); }
  buildSkinMarks(cfg, P);
  buildHair(cfg, P, { withTail: !withTail });
  buildGlassesFrame(cfg, P);
  buildHearingAids(cfg, P);
  if (cfg.hairStyle !== 'kopftuch') buildHeadItem(cfg, P);
  else if (cfg.head === 'kopfhoerer') buildHeadItem(cfg, P);
  if (cfg.mask && cfg.mask !== 'keine') buildMask(cfg, P);
  return merge(P.filter(Boolean));
}
// fertige (schon gefärbte) Geometrie an einen Anker legen
function reuse(geo, A, off = 0.004) {
  const g = geo.clone();
  const q = A.q, m = new THREE.Matrix4().compose(new THREE.Vector3(A.pos.x + A.n.x * off, A.pos.y + A.n.y * off, A.pos.z + A.n.z * off), q, new THREE.Vector3(1, 1, 1));
  g.applyMatrix4(m);
  geo.dispose();
  return g;
}

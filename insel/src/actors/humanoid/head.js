// Kopf (Stil-Bibel §8.2/§8.3): weicher Anime-Schädel (runder Hinterkopf, schmaler Kiefer, flache Gesichtsfläche), große
// zweitonige Augen, deren Iris vom Oberlid angeschnitten wird (ruhiger Blick statt Starren), Lidlinie mit Wimpernschwung,
// Blinzel-Lider mit eigener Lidlinie, Brauen und vier Münder für den Ausdruck, 15 Frisuren aus geschichteten Haarschalen
// mit spitzen Strähnen-Enden, breiten Pony-Klumpen und Zickzack-Glanzband, Brillen (Fresnel-Glas), Hörgeräte,
// Sommersprossen, Vitiligo. Alles in Kopf-Koordinaten (Drehpunkt = Hals, Kopfmitte = Ursprung). Blickrichtung +z,
// die linke Seite der Figur ist +x.
//   buildHead(cfg, { withFace, withBrows, withMouth, withTail })  buildHairTail(cfg) → { geo, pivot:[x,y,z] } | null
//   buildBrow(cfg, s) → { geo, anchor:{pos, n, up, q} }  buildMouth(cfg, kind)  buildLids(cfg) → { geo, y }
//   buildLenses(cfg) → geo | null  EYE (Maße)  headAnchor(dx, dy, dz)
import * as THREE from 'three';
import { fig, merge, capsule, sphere, lathe, strand, tube, flat, circle, lens, band, ringGrad, FLAG, RoundedBoxGeometry } from './geo.js';
import { M, darker, lighter, mixHex, luma, hash01, rotToNormal, quatToNormal } from './base.js';
import { buildHeadItem, buildMask } from './cosmetics.js';

const R = M.headR;
export const HEAD_SCALE = [0.94, 1.12, 0.98];
const _v = new THREE.Vector3(), _a = new THREE.Vector3(), _b = new THREE.Vector3(), _n = new THREE.Vector3();
// weiche Rampe a→b (auch fallend, a > b); THREE.MathUtils.smoothstep würde bei a > b zur harten Stufe
const sm = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const lerp = THREE.MathUtils.lerp;
const frac = (v) => v - Math.floor(v);
const TAU = Math.PI * 2;

// ---- Schädelform: Kugel → Anime-Kopf (Gesicht leicht gewölbt, Kiefer läuft zum Kinn zu, Wangen voll, Hinterkopf rund) ----
export function headDeform(v) {
  const y = v.y / R, z = v.z / R, x = v.x / R;
  if (z > 0.55) v.z = R * (0.55 + (z - 0.55) * 0.72);                      // Gesichtsfläche abflachen (leicht gewölbt)
  if (y < 0) {
    const t = -y;                                                           // 0 Augenhöhe … 1 Kinn
    const k = 1 - Math.pow(t, 1.3) * 0.4;                                   // Kiefer schmal, Kinn weich spitz
    v.x *= k;
    v.z *= 0.86 + 0.14 * k;
    if (t < 0.7) v.z += R * 0.03 * Math.sin(Math.PI * t / 0.7) * Math.max(0, z) * (1 - Math.abs(x) * 0.4);   // Wangen
    if (t > 0.55) v.z += R * 0.035 * ((t - 0.55) / 0.45) * Math.max(0, z);  // Kinn leicht vor
  } else {
    v.x *= 1 + 0.025 * y;                                                   // Schädel oben etwas breiter
    v.z *= 1 + (z < 0 ? 0.05 : 0.02) * y;                                   // Hinterkopf rund
  }
}
// Punkt und Normale auf der fertigen Kopfoberfläche in Richtung d (Kopf-Koordinaten)
function surf(dx, dy, dz, out = new THREE.Vector3()) {
  out.set(dx, dy, dz).normalize().multiplyScalar(R);
  headDeform(out);
  out.x *= HEAD_SCALE[0]; out.y *= HEAD_SCALE[1]; out.z *= HEAD_SCALE[2];
  return out;
}
const _Y = new THREE.Vector3(0, 1, 0), _X = new THREE.Vector3(1, 0, 0);
export function headAnchor(dx, dy, dz) {
  const p = surf(dx, dy, dz);
  _n.set(dx, dy, dz).normalize();
  // Normale numerisch: zwei Nachbarpunkte auf der Fläche
  _a.copy(_n).applyAxisAngle(_Y, 0.03); surf(_a.x, _a.y, _a.z, _a);
  _b.copy(_n).applyAxisAngle(_X, 0.03); surf(_b.x, _b.y, _b.z, _b);
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
// Punkt + Normale der Kopfoberfläche in Richtung d (ohne Quaternion, für viele Vertices)
const _sp = new THREE.Vector3(), _sa = new THREE.Vector3(), _sb = new THREE.Vector3(), _sd = new THREE.Vector3();
function surfaceAt(dx, dy, dz, outP, outN) {
  _sd.set(dx, dy, dz).normalize();
  surf(_sd.x, _sd.y, _sd.z, outP);
  _sa.copy(_sd).applyAxisAngle(_Y, 0.03); surf(_sa.x, _sa.y, _sa.z, _sa);
  _sb.copy(_sd).applyAxisAngle(_X, 0.03); surf(_sb.x, _sb.y, _sb.z, _sb);
  outN.subVectors(_sa, outP).cross(_sp.subVectors(_sb, outP)).normalize();
  if (outN.dot(_sd) < 0) outN.negate();
}
// Flache Form (x, y in der Tangentialebene des Ankers A, z = Zusatzabstand) auf die gewölbte Kopfoberfläche legen:
// jeder Vertex wird auf die Fläche projiziert und um off entlang der lokalen Normalen angehoben – Augen folgen so der
// Wölbung des Gesichts statt an den Ecken abzustehen.
const _wp = new THREE.Vector3(), _wn = new THREE.Vector3(), _ws = new THREE.Vector3();
function wrap(geo, A, off, opts) {
  const pa = geo.attributes.position;
  for (let i = 0; i < pa.count; i++) {
    const x = pa.getX(i), y = pa.getY(i), z = pa.getZ(i);
    _wp.copy(A.pos).addScaledVector(A.right, x).addScaledVector(A.up, y);
    surfaceAt(_wp.x / HEAD_SCALE[0], _wp.y / HEAD_SCALE[1], _wp.z / HEAD_SCALE[2], _ws, _wn);
    pa.setXYZ(i, _ws.x + _wn.x * (off + z), _ws.y + _wn.y * (off + z), _ws.z + _wn.z * (off + z));
  }
  return fig(geo, opts);
}

// ---- Augen (der wichtigste Ausdrucksträger) ----
// w Breite · lid Höhe der Lidlinie über der Augenmitte · down Tiefe unter der Mitte · tilt Neigung (äußerer Winkel höher)
export const EYE = { w: 0.078, up: 0.031, down: 0.022, lid: 0.02, tilt: 0.1, iris: 0.0215, pupil: 0.008, x: 0.45, y: -0.1, z: 0.9 };
export const eyeAnchor = (s) => headAnchor(s * EYE.x, EYE.y, EYE.z);
export function lidColor(cfg) { return luma(cfg.hair) > 0.45 ? new THREE.Color('#4a3a3a') : darker(cfg.hair, 0.55); }
// Lidlinie (Oberkante des sichtbaren Auges) und Unterkante als Funktionen von x (Augenmitte = 0)
const W2 = EYE.w / 2;
const lashY = (x) => EYE.lid * Math.pow(Math.max(0, 1 - (x / (W2 + 0.002)) ** 2), 0.55);
const lowY = (x) => -EYE.down * Math.sqrt(Math.max(0, 1 - (x / W2) ** 2)) * Math.sqrt(1 - Math.min(1, Math.abs(x) / W2) * 0.12);
const clampEye = (x, y) => Math.min(lashY(x) - 0.0004, Math.max(lowY(x) + 0.0004, y));

// Polygon-Punkte so ordnen, dass die Fläche nach +z zeigt (gespiegelte Seite umkehren)
const ccw = (pts, s) => (s < 0 ? pts.slice().reverse() : pts);
function buildEye(cfg, s, P) {
  const A = eyeAnchor(s);
  const flag = FLAG.flat;
  const tilt = EYE.tilt * s;
  const put = (geo, off, color, extra = {}) => { geo.rotateZ(tilt); P.push(wrap(geo, A, off, { flag, hull: 0, color, ...extra })); };
  // sehr dunkle Augenfarben bekommen einen warmen Kern, damit Iris und Glanzpunkte lesbar bleiben
  const eye = luma(cfg.eyes) < 0.06 ? mixHex(cfg.eyes, '#7a4a2e', 0.45) : new THREE.Color(cfg.eyes);
  const white = new THREE.Color('#f6f5f9'), shade = new THREE.Color('#cdd7ee');
  // Augapfel: Fläche unter der Lidlinie, oben leicht bläulich beschattet (Lidschatten)
  put(lens(-W2, W2, lashY, lowY, 16), 0.003, (x, y, z, out) => out.copy(white).lerp(shade, sm(0.002, 0.019, y)));
  // Iris: hohe Ellipse, oben vom Lid angeschnitten; Rand dunkel, Kern, unten heller (Anime)
  const cx = 0, cy = 0, ir = EYE.iris, ry = ir * 1.12;
  const irisRim = eye.clone().multiplyScalar(0.48), irisLight = eye.clone().lerp(white, 0.45), irisTop = eye.clone().multiplyScalar(0.8);
  put(ringGrad(ir * 0.74, ir, 16, { cx, cy, ry, clampY: clampEye }), 0.0038, (x, y, z, out) => { const d = Math.hypot((x - cx) / ir, (y - cy) / ry); out.copy(eye).lerp(irisRim, sm(0.7, 1.0, d)); });
  put(circle(ir * 0.75, 14, { cx, cy, ry, clampY: clampEye }), 0.0042, (x, y, z, out) => out.copy(y - cy > 0.003 ? irisTop : eye).lerp(irisLight, sm(-0.003, -0.02, y - cy)));
  // Pupille (hochoval), großer Glanzpunkt oben, kleiner unten gegenüber
  put(circle(EYE.pupil, 10, { ry: EYE.pupil * 1.35, cx, cy: cy - 0.001, clampY: clampEye }), 0.0048, '#14102a');
  put(circle(0.0064, 10, { cx: cx + 0.0075, cy: cy + 0.0092 }), 0.0056, '#ffffff');
  put(circle(0.0028, 8, { cx: cx - 0.007, cy: cy - 0.0085 }), 0.0056, '#ffffff');
  // Oberlid: dunkle Lidlinie entlang der Lidkante, außen dicker, mit Wimpernschwung über die äußere Ecke hinaus
  const outer = (t) => (s > 0 ? t : 1 - t);                       // 1 an der äußeren Ecke
  const x0 = -(W2 + 0.003), x1 = W2 + 0.003;
  const flick = 0.011;
  const lashLine = (t) => { const x = x0 + (x1 - x0) * t; const o = outer(t); const f = Math.max(0, (o - 0.9) / 0.1); return lashY(x) + 0.0018 + f * f * flick * 0.35; };
  const lashTh = (t) => 0.005 + 0.0038 * Math.pow(outer(t), 2);
  put(band(x0, x1, lashLine, lashTh, 14), 0.0068, lidColor(cfg));
  // Wimpernspitze: kleines Dreieck, das außen schräg nach oben zeigt
  const ex = s * (W2 + 0.002);
  put(flat(ccw([[ex, lashY(ex * 0.96) + 0.001], [ex + s * flick, lashY(ex * 0.96) + flick * 0.55], [ex - s * 0.004, lashY(ex * 0.96) + 0.006]], s)), 0.0069, lidColor(cfg));
  // Lidfalte: feine Linie über der Lidlinie (Teen, kein Baby)
  put(band(-W2 * 0.7, W2 * 0.7, (t) => lashY((t * 2 - 1) * W2 * 0.7) + 0.0082, () => 0.0016, 10), 0.0045, darker(cfg.skin, 0.86));
  // Unterlid: nur eine Hauttonkante, außen kräftiger (x aufsteigend, damit die Fläche nach vorn zeigt)
  const lx0 = Math.min(s * W2 * 0.12, s * W2 * 0.96), lx1 = Math.max(s * W2 * 0.12, s * W2 * 0.96);
  put(band(lx0, lx1, (t) => lowY(lx0 + (lx1 - lx0) * t) - 0.0012, (t) => 0.0014 + 0.001 * outer(t), 10), 0.0045, darker(cfg.skin, 0.8));
}
// Blinzel-Lider (eigenes Mesh; skaliert von der Lidlinie nach unten, mit eigener Lidlinie an der Unterkante, damit
// halb geschlossene Augen wie gezeichnet aussehen). Rückgabe: Geometrie (y = 0 auf der Lidlinie) + y
export function buildLids(cfg) {
  const P = [];
  let yLine = 0;
  const skin = darker(cfg.skin, 0.95), line = lidColor(cfg);
  for (const s of [-1, 1]) {
    const A = eyeAnchor(s);
    const tilt = EYE.tilt * s;
    yLine = A.pos.y + A.up.y * EYE.lid;
    const top = (x) => lashY(x) + 0.0075, bot = (x) => lowY(x) - 0.003;
    const g = lens(-(W2 + 0.006), W2 + 0.006, top, bot, 14);
    g.rotateZ(tilt);
    P.push(wrap(g, A, 0.0074, { flag: FLAG.skin, hull: 0, color: skin }));
    const l = band(-(W2 + 0.004), W2 + 0.004, (t) => lowY((t * 2 - 1) * (W2 + 0.004)) - 0.0005, (t) => 0.0034 + 0.002 * Math.sin(Math.PI * t), 12);
    l.rotateZ(tilt);
    P.push(wrap(l, A, 0.0078, { flag: FLAG.flat, hull: 0, color: line }));
  }
  const g = merge(P);
  // Lidlinie auf y = 0 legen, damit scale.y = 0…1 das Lid schließt (Position des Meshes = yLine, siehe index.js)
  g.translate(0, -yLine, 0);
  return { geo: g, y: yLine };
}

// ---- Brauen (eigene Meshes) und Münder ----
export const BROW = { x: 0.35, y: 0.17, z: 0.9 };
export function buildBrow(cfg, s) {
  const st = cfg.brows || 'normal';
  const w = st === 'schmal' ? 0.058 : st === 'stark' ? 0.07 : 0.065;
  const th = st === 'schmal' ? 0.0058 : st === 'stark' ? 0.016 : 0.0105;
  const arch = st === 'geschwungen' ? 0.0085 : 0.0025;
  const inner = (t) => (s > 0 ? 1 - t : t);       // 1 an der Nasenseite
  // Anime-Braue: innen dick und leicht tiefer, außen spitz auslaufend, leichter Bogen
  const g = band(-w / 2, w / 2, (t) => arch * Math.sin(Math.PI * Math.pow(t, s > 0 ? 1.25 : 0.8)) - (st === 'geschwungen' ? 0.002 : 0) - inner(t) * 0.0015, (t) => th * (0.35 + 0.65 * Math.pow(inner(t), 0.7)), 12);
  const col = luma(cfg.hair) > 0.6 ? mixHex(cfg.hair, '#6a4a3a', 0.6) : darker(cfg.hair, 0.65);
  const anchor = headAnchor(s * BROW.x, BROW.y, BROW.z);
  return { geo: fig(g, { flag: FLAG.flat, hull: 0, color: col }), anchor };
}
export const MOUTH = { x: 0, y: -0.56, z: 0.9 };
export function mouthColor(cfg) { return mixHex(darker(cfg.skin, 0.5), '#8a4550', 0.5); }
export function buildMouth(cfg, kind) {
  const c = mouthColor(cfg);
  const flag = FLAG.flat, hull = 0;
  if (kind === 'neutral') return fig(band(-0.016, 0.016, (t) => -0.0012 * Math.sin(Math.PI * t), (t) => 0.0032 + 0.0012 * Math.sin(Math.PI * t), 8), { flag, hull, color: c });
  if (kind === 'smile') {
    // Lächeln: Bogen mit betonten Mundwinkeln (kleine Punkte)
    return merge([
      fig(band(-0.024, 0.024, (t) => -0.012 * (1 - (2 * t - 1) ** 2), (t) => 0.0028 + 0.002 * Math.sin(Math.PI * t), 14), { flag, hull, color: c }),
      fig(circle(0.0026, 7, { cx: -0.024, cy: 0.001 }), { flag, hull, color: c }),
      fig(circle(0.0026, 7, { cx: 0.024, cy: 0.001 }), { flag, hull, color: c }),
    ]);
  }
  if (kind === 'frown') return fig(band(-0.018, 0.018, (t) => 0.0085 * (1 - (2 * t - 1) ** 2) - 0.0045, (t) => 0.003 + 0.0016 * Math.sin(Math.PI * t), 12), { flag, hull, color: c });
  // offen: dunkle Ellipse mit Zahnkante und Zungenbogen
  return merge([
    fig(circle(0.0135, 16, { ry: 0.0105 }), { flag, hull, color: '#6e2634' }),
    fig(band(-0.0095, 0.0095, () => 0.0062, () => 0.0034, 6).translate(0, 0, 0.0008), { flag, hull, color: '#ffffff' }),
    fig(circle(0.0075, 10, { ry: 0.004, cy: -0.0065 }).translate(0, 0, 0.0008), { flag, hull, color: '#b05060' }),
  ]);
}
export const mouthAnchor = () => headAnchor(MOUTH.x, MOUTH.y, MOUTH.z);

// ---- Haare ----
function hairPalette(cfg) {
  const hair = cfg.hair;
  const dark = luma(hair) < 0.16;
  return { base: new THREE.Color(hair), under: darker(hair, 0.7), shine: dark ? mixHex(hair, '#8a95c4', 0.4) : lighter(hair, 0.28), accent: new THREE.Color(cfg.hairAccent) };
}
// Farbfunktion mit Zickzack-Glanzband (Ring bei ~70 % Kopfhöhe, zur Stirn hin geneigt, Anime-„Shine“), dunkler Unterseite
// und optional Akzentfarbe an den Spitzen (accentTips = y, ab dem die Spitzen umfärben)
function hairColorFn(pal, { shineY = 0.06, shineH = 0.03, tilt = 0.22, underY = -0.02, accentTips = null, zig = 0.011, zigN = 7, groove = 0.07, grooveN = 11 } = {}) {
  return (x, y, z, out) => {
    const a = Math.atan2(x, z);
    const yb = shineY + z * tilt + zig * (1 - Math.abs(2 * frac(a * zigN / TAU) - 1)) * 2 - zig;
    const d = y - yb;
    if (d > 0 && d < shineH && z > -0.09) out.copy(pal.shine);
    else if (y < underY) out.copy(pal.under).lerp(pal.base, sm(underY - 0.09, underY, y));
    else out.copy(pal.base);
    // gemalte Strähnen-Rillen: schmale, vom Wirbel abwärts laufende Bänder, oben ausgeblendet (kein Helm-Eindruck)
    if (groove > 0) {
      const g = Math.pow(1 - Math.abs(2 * frac(a * grooveN / TAU + 0.5) - 1), 6);
      out.multiplyScalar(1 - groove * g * sm(0.16, 0.06, y));
    }
    if (accentTips !== null && y < accentTips) out.lerp(pal.accent, sm(accentTips, accentTips - 0.05, y));
  };
}
// Haarschale: Kugelsegment über dem Kopf, dessen unterer Rand in spitze Strähnen-Enden ausläuft (die Anime-Silhouette).
//   yFront/ySide/yBack = Höhe des Saums vorn/seitlich/hinten · tips = Anzahl Spitzen · tipLen = Länge der Spitzen ·
//   hug zieht die Spitzen an den Kopf · band = ab welcher Zeile (0 Scheitel … 1 Saum) die Verformung beginnt
function shell(pal, P, { r = R * 1.07, theta = 0.63, yFront = 0.055, ySide = 0.0, yBack = -0.05, tips = 9, tipLen = 0.04, tipMin = 0.3, phase = 0.3, pos = [0, 0.02, -0.01], scale = [1, 1.1, 1.04], color = null, hug = 0.02, hull = 1, seed = 0, band = 0.6, cutFront = 0, colorOpts = {} } = {}) {
  const geo = new THREE.SphereGeometry(r, 24, 12, 0, TAU, 0, Math.PI * theta);
  const polMax = Math.PI * theta;
  P.push(fig(geo, {
    pos, scale, hull,
    deform: (v) => {
      const pol = Math.acos(THREE.MathUtils.clamp(v.y / r, -1, 1));
      const u = pol / polMax;
      if (u < band) return;
      const w = (u - band) / (1 - band);
      const a = Math.atan2(v.x, v.z);           // 0 vorn
      const c = Math.cos(a);
      const yRim = c > 0 ? lerp(ySide, yFront, Math.pow(c, 1.6)) : lerp(ySide, yBack, Math.pow(-c, 1.2));
      const k = Math.floor(a * tips / TAU + phase);
      const tri = 1 - Math.abs(2 * frac(a * tips / TAU + phase) - 1);
      const L = tipLen * (tipMin + (1 - tipMin) * Math.pow(tri, 1.5)) * (0.82 + 0.36 * hash01(k + 3, seed + 1));
      const ww = Math.pow(w, 1.25);
      v.y = lerp(v.y, yRim - L, ww);
      const kk = 1 - hug * ww * 3;
      v.x *= kk; v.z *= kk;
      // vorn Platz fürs Gesicht: Saum steigt über der Stirn an
      if (cutFront && c > 0.3) v.y += cutFront * (c - 0.3) / 0.7 * ww;
    },
    color: color || hairColorFn(pal, colorOpts),
  }));
}
// Strähne am Kopf: Basis in Richtung d auf dem Kappenradius, flach an den Kopf gedrückt, Blattprofil
function lock(pal, P, { d, y, len, dir, r = 0.018, bend = [0, 0, 0], flat = 0.4, taper = 0.55, k = 0.96, wave = 0, seed = 0, steps = 4, segs = 6, color = null, leaf = true, hull = 0.5, colorOpts = {} }) {
  const Rc = R * 1.06 * k;
  const b = new THREE.Vector3(d[0], 0, d[2]).normalize();
  const at = [b.x * Rc, y, b.z * Rc * 1.02 - 0.008];
  P.push(fig(strand({ at, dir, len, r, bend, flat, flatDir: [b.x, 0.3, b.z], taper, wave, seed, steps, segs, leaf }), { hull, color: color || hairColorFn(pal, colorOpts) }));
}
// Pony: lange, flache, spitz zulaufende Strähnen, die unter der Haarschale hervorkommen, sich überlappen und bis zu
// den Brauen reichen (side = seitlich gefegt, Spitzen der äußeren Strähnen biegen nach außen). Zwei Lagen: lange Strähnen
// und kürzere davor in den Lücken – so liest sich der Pony als Haar, nicht als Perlenreihe.
function fringe(cfg, pal, P, { n = 6, len = 0.11, side = 0.3, y = 0.115, spread = 1.25, r = 0.03, up = 0, curl = 0.02, hull = 0.35 } = {}) {
  const one = (a, L, rr, k, seed, layer) => {
    const sx = Math.sin(a), sz = Math.cos(a);
    const outward = Math.sign(a - side * 0.12) * Math.min(1, Math.abs(a) * 1.4);
    lock(pal, P, { d: [sx, 0, sz], y: y + Math.abs(a) * 0.012 - layer * 0.008, len: L, dir: [sx * 0.25 + side * 0.85, -1 + up, sz * 0.12 - 0.22], r: rr, bend: [outward * curl + side * 0.02 - sx * 0.01, 0.0, -0.014], seed, steps: 5, segs: 6, hull, k, leaf: false, taper: 0.45, flat: 0.22, colorOpts: { shineY: 0.04, shineH: 0.035, tilt: 0.1 } });
  };
  for (let i = 0; i < n; i++) {
    const u = n > 1 ? i / (n - 1) - 0.5 : 0;
    const a = u * spread + side * 0.12;
    const L = len * (0.8 + hash01(i, 3) * 0.35) * (1 - Math.abs(u) * 0.15) * (1 + side * u * 0.45);
    one(a, L, r * (0.85 + hash01(i, 5) * 0.3), 0.96, i, 0);
  }
  // zweite Lage: kürzer, in den Lücken, etwas weiter außen (davor)
  for (let i = 0; i < n - 1; i++) {
    const u = (i + 0.5) / (n - 1) - 0.5;
    const a = u * spread + side * 0.12;
    one(a, len * (0.55 + hash01(i, 11) * 0.25) * (1 + side * u * 0.4), r * 0.8, 1.0, 40 + i, 1);
  }
}
// Schläfensträhnen vor den Ohren (zwei je Seite), flach und spitz
function sideLocks(pal, P, len = 0.1, r = 0.022, hull = 0.4) {
  for (const s of [-1, 1]) {
    lock(pal, P, { d: [s, 0, 0.25], y: 0.06, len, dir: [s * 0.06, -1, 0.14], r, bend: [-s * 0.012, 0, 0.012], hull, steps: 4, leaf: false, taper: 0.45, flat: 0.3 });
    lock(pal, P, { d: [s, 0, 0.5], y: 0.07, len: len * 0.8, dir: [s * 0.14, -1, 0.2], r: r * 0.85, bend: [-s * 0.014, 0, -0.004], hull, steps: 4, leaf: false, taper: 0.45, flat: 0.3 });
  }
}
// Scheitel: zwei, drei flache Strähnen auf der Kalotte, die vom Pony nach hinten fegen (Haarrichtung)
function crownLocks(pal, P, side = 0.3, n = 2, hull = 0.35) {
  for (let i = 0; i < n; i++) {
    const u = n > 1 ? i / (n - 1) - 0.5 : 0;
    const x0 = u * 0.1 - side * 0.02;
    P.push(fig(strand({ at: [x0, 0.17, -0.07], dir: [side * 0.6 + u * 0.35, -0.4, 1], len: 0.16 + hash01(i, 6) * 0.02, r: 0.03, bend: [side * 0.01, -0.05, 0], flat: 0.28, flatDir: [u * 0.5, 1, 0.3], leaf: true, segs: 6, steps: 5, seed: 20 + i }), { hull, color: hairColorFn(pal) }));
  }
}
// Haarschweif hinten (lang): breite Bahn mit gewelltem Saum (offene Drehform)
function backSheet(pal, len = 0.36, r0 = R * 1.1, r1 = R * 1.02, { phi = 0.8, flare = 0.03, pos = [0, 0.0, -0.012], hull = 0.8 } = {}) {
  return fig(lathe([[r0 * 0.92, 0.06], [r0, -0.02], [r0 * 0.98, -len * 0.4], [r1 + flare * 0.5, -len * 0.75], [r1 + flare, -len], [r1 + flare - 0.01, -len - 0.008]], 16, Math.PI * (1 - phi), TAU * phi), {
    pos, scale: [1, 1, 1.02], hull,
    deform: (v) => { const a = Math.atan2(v.x, v.z); if (v.y < -len * 0.9) v.y += (1 - Math.abs(2 * frac(a * 9 / TAU) - 1)) * 0.02 - 0.012; if (v.y < -0.2) v.z -= (-0.2 - v.y) * 0.12; },
    color: hairColorFn(pal, { shineY: 0.05, underY: -0.12 }),
  });
}

function buildHair(cfg, P, { withTail = true } = {}) {
  const style = cfg.hairStyle, pal = hairPalette(cfg);
  switch (style) {
    case 'glatze':
      break;
    case 'buzz':
      shell(pal, P, { r: R * 1.012, theta: 0.52, yFront: 0.06, ySide: 0.03, yBack: -0.01, tipLen: 0, band: 0.7, color: mixHex(cfg.hair, cfg.skin, 0.3) });
      break;
    case 'afro':
      P.push(fig(new THREE.SphereGeometry(R * 1.48, 24, 16), {
        pos: [0, 0.05, -0.02],
        deform: (v) => {
          const b = 1 + 0.025 * Math.sin(v.x * 42 + 1) * Math.sin(v.y * 39) * Math.sin(v.z * 37 + 2);
          v.multiplyScalar(b);
          if (v.z > 0.1 && v.y < 0.08) v.z = 0.1 + (v.z - 0.1) * 0.22;
        },
        color: hairColorFn(pal, { shineY: 0.1, shineH: 0.06, tilt: 0.25, underY: -0.06, zig: 0.02, zigN: 9 }),
      }));
      break;
    case 'locs': {
      shell(pal, P, { r: R * 1.06, theta: 0.55, yFront: 0.05, ySide: 0.03, yBack: 0.0, tipLen: 0.012, tips: 14, band: 0.7 });
      if (!withTail) P.push(buildLocs(cfg, pal).geo);
      break;
    }
    case 'flechtzoepfe': {
      shell(pal, P, { r: R * 1.03, theta: 0.55, yFront: 0.05, ySide: 0.03, yBack: 0.0, tipLen: 0.008, tips: 12, band: 0.75 });
      // Cornrow-Linien über die Kappe (dünne Schläuche entlang des Bogens)
      for (let i = 0; i < 5; i++) {
        const a = (i - 2) * 0.3, pts = [];
        for (let k = 0; k <= 8; k++) { const t = k / 8, lat = (t - 0.5) * Math.PI * 0.92; pts.push(new THREE.Vector3(Math.sin(a) * Math.cos(lat) * R * 1.05, Math.sin(lat) * R * 1.05 * 1.1 + 0.02, Math.cos(a) * Math.cos(lat) * R * 1.05 * 1.04 - 0.008)); }
        P.push(fig(tube(pts.map((p) => { const q = p.clone(); q.y = Math.max(q.y, 0.02); return q; }), pts.map(() => 0.009), { segs: 4 }), { hull: 0.3, color: darker(cfg.hair, 0.78) }));
      }
      if (!withTail) P.push(buildBraids(cfg, pal).geo);
      break;
    }
    case 'kopftuch': {
      const tuch = cfg.headColor;
      P.push(fig(new THREE.SphereGeometry(R * 1.13, 24, 14, 0, TAU, 0, Math.PI * 0.62), { pos: [0, 0.015, -0.012], scale: [1, 1.08, 1.04], color: tuch, deform: (v) => { if (v.z > R * 0.55 && v.y < 0.09) v.y = Math.max(v.y, 0.09 - (v.z - R * 0.55) * 0.3); } }));
      P.push(fig(new THREE.CylinderGeometry(R * 1.12, 0.245, 0.3, 18, 3, true, 0.62, TAU - 1.24), { pos: [0, -0.14, -0.02], scale: [1, 1, 0.92], color: (x, y, z, out) => out.set(tuch).multiplyScalar(0.9 + 0.1 * sm(-0.15, 0.1, y)), deform: (v) => { v.z -= Math.max(0, -v.y - 0.05) * 0.1; } }));
      P.push(fig(new THREE.TorusGeometry(R * 1.09, 0.011, 6, 20, Math.PI * 1.3), { pos: [0, 0.075, -0.005], rot: [Math.PI / 2 - 0.55, 0, Math.PI * 0.35], hull: 0.5, color: darker(tuch, 0.82) }));
      break;
    }
    case 'bob':
      // Bob: große Schale bis zum Kinn, Enden nach innen, gerader Pony
      shell(pal, P, { r: R * 1.1, theta: 0.7, yFront: 0.06, ySide: -0.12, yBack: -0.13, tips: 13, tipLen: 0.03, tipMin: 0.5, hug: 0.05, band: 0.55, cutFront: 0.1, scale: [1, 1.12, 1.06], colorOpts: { underY: -0.08 } });
      fringe(cfg, pal, P, { n: 7, len: 0.09, side: 0, spread: 1.35, r: 0.026, curl: 0.005 });
      break;
    case 'undercut':
      shell(pal, P, { r: R * 1.008, theta: 0.5, yFront: 0.06, ySide: 0.05, yBack: 0.02, tipLen: 0, band: 0.8, color: mixHex(cfg.hair, cfg.skin, 0.4) });
      shell(pal, P, { r: R * 1.06, theta: 0.42, yFront: 0.08, ySide: 0.085, yBack: 0.06, tips: 7, tipLen: 0.03, band: 0.55, pos: [0, 0.03, -0.012], scale: [0.96, 1.1, 1.02], colorOpts: { shineY: 0.07 } });
      for (let i = 0; i < 8; i++) {
        const a = (i / 7 - 0.5) * 2.2 - 0.3, sx = Math.sin(a), sz = Math.cos(a);
        lock(pal, P, { d: [sx, 0, sz], y: 0.115 + Math.cos(a) * 0.015, len: 0.1 + hash01(i, 8) * 0.03, dir: [0.9, -0.3 + hash01(i, 9) * 0.2, sz * 0.5], r: 0.024, bend: [0.02, -0.035, 0], flat: 0.4, k: 0.9, seed: i, hull: 0.45 });
      }
      fringe(cfg, pal, P, { n: 4, len: 0.095, side: 0.7, spread: 0.8, r: 0.026 });
      break;
    case 'irokese':
      shell(pal, P, { r: R * 1.008, theta: 0.5, yFront: 0.06, ySide: 0.05, yBack: 0.02, tipLen: 0, band: 0.8, color: mixHex(cfg.hair, cfg.skin, 0.4) });
      for (let i = 0; i < 7; i++) {
        const z = 0.1 - i * 0.036, h = 0.14 + Math.sin(i / 6 * Math.PI) * 0.05;
        P.push(fig(strand({ at: [0, 0.11 + Math.sin(i / 6 * Math.PI) * 0.03, z], dir: [0, 1, 0.35 - i * 0.08], len: h, r: 0.028, bend: [0, 0, 0.02], flat: 0.45, flatDir: [1, 0, 0], taper: 0.7 }), { hull: 0.6, color: hairColorFn(pal, { shineY: 0.14, shineH: 0.05, tilt: 0 }) }));
      }
      break;
    case 'stachel':
      shell(pal, P, { r: R * 1.05, theta: 0.58, yFront: 0.05, ySide: 0.0, yBack: -0.03, tips: 10, tipLen: 0.022, band: 0.62 });
      sideLocks(pal, P, 0.06, 0.017);
      for (let i = 0; i < 11; i++) {
        const a = (i / 11) * TAU + 0.3, tilt = 0.5 + (i % 2) * 0.3, rr = 0.045 + (i % 3) * 0.015;
        P.push(fig(strand({ at: [Math.cos(a) * rr, 0.125 - (i % 3) * 0.01, Math.sin(a) * rr - 0.015], dir: [Math.cos(a) * tilt, 1, Math.sin(a) * tilt - 0.25], len: 0.11 + hash01(i, 4) * 0.03, r: 0.026, bend: [Math.cos(a) * 0.012, 0, Math.sin(a) * 0.01], flat: 0.7, leaf: true, segs: 6 }), { hull: 0.55, color: hairColorFn(pal, { shineY: 0.14, shineH: 0.05 }) }));
      }
      break;
    case 'locken':
      shell(pal, P, { r: R * 1.09, theta: 0.64, yFront: 0.04, ySide: -0.03, yBack: -0.07, tips: 11, tipLen: 0.025, tipMin: 0.6, band: 0.6 });
      // Locken: weiche Kugelklumpen in zwei Kränzen plus Stirnlocken
      for (let i = 0; i < 18; i++) {
        const ring = i % 3, a = (Math.floor(i / 3) / 6) * TAU + ring * 0.35 + 0.2;
        const y = 0.0 + ring * 0.05, rr = R * (1.03 + ring * 0.03), sx = Math.sin(a), sz = Math.cos(a);
        if (sz > 0.75 && ring === 0) continue;
        P.push(fig(sphere(0.031 + hash01(i, 2) * 0.008, 9, 7), { pos: [sx * rr, y + 0.02, sz * rr * 1.02 - 0.01], scale: [1, 0.9, 1], hull: 0.6, color: hairColorFn(pal, { shineY: 0.06, shineH: 0.04 }) }));
      }
      for (let i = 0; i < 5; i++) { const a = (i / 4 - 0.5) * 1.3; P.push(fig(sphere(0.027, 9, 7), { pos: [Math.sin(a) * R * 0.98, 0.065 - Math.abs(a) * 0.02, Math.cos(a) * R * 1.0 + 0.005], scale: [1, 0.8, 0.7], hull: 0.6, color: hairColorFn(pal, { shineY: 0.06, shineH: 0.03 }) })); }
      break;
    case 'lang':
      shell(pal, P, { r: R * 1.06, theta: 0.6, yFront: 0.055, ySide: -0.02, yBack: -0.03, tips: 8, tipLen: 0.025, tipMin: 0.5, band: 0.62 });
      fringe(cfg, pal, P, { n: 6, side: 0.22, len: 0.11, spread: 1.3 });
      crownLocks(pal, P, 0.22, 2);
      for (const s of [-1, 1]) { lock(pal, P, { d: [s, 0, 0.35], y: 0.03, len: 0.3, dir: [s * 0.05, -1, 0.08], r: 0.026, bend: [-s * 0.012, 0, 0.02], flat: 0.5, steps: 6, hull: 0.6 }); lock(pal, P, { d: [s, 0, 0.1], y: 0.0, len: 0.24, dir: [s * 0.08, -1, 0.02], r: 0.022, bend: [-s * 0.01, 0, 0.0], flat: 0.5, steps: 5, hull: 0.6 }); }
      if (!withTail) P.push(buildBackSheet(cfg, pal).geo);
      break;
    case 'zopf':
      shell(pal, P, { r: R * 1.05, theta: 0.6, yFront: 0.055, ySide: 0.0, yBack: -0.02, tips: 8, tipLen: 0.018, tipMin: 0.6, band: 0.65 });
      fringe(cfg, pal, P, { n: 5, side: 0.2, len: 0.105 });
      crownLocks(pal, P, 0.1, 2);
      sideLocks(pal, P);
      if (!withTail) P.push(buildPonytail(cfg, pal).geo);
      break;
    case 'dutt':
      shell(pal, P, { r: R * 1.05, theta: 0.6, yFront: 0.055, ySide: 0.0, yBack: -0.02, tips: 8, tipLen: 0.014, tipMin: 0.6, band: 0.68 });
      fringe(cfg, pal, P, { side: 0.15, n: 5, len: 0.1 });
      sideLocks(pal, P, 0.07);
      P.push(fig(sphere(0.064, 12, 9), { pos: [0, 0.15, -0.065], scale: [1.1, 0.95, 1], color: hairColorFn(pal, { shineY: 0.155, shineH: 0.03, tilt: 0.1 }) }));
      P.push(fig(new THREE.TorusGeometry(0.05, 0.0095, 5, 14), { pos: [0, 0.118, -0.048], rot: [0.75, 0, 0], hull: 0.5, color: pal.accent }));
      break;
    case 'kurz':
    default:
      shell(pal, P, { r: R * 1.07, theta: 0.63, yFront: 0.055, ySide: -0.01, yBack: -0.045, tips: 10, tipLen: 0.036, band: 0.6 });
      fringe(cfg, pal, P, { n: 6, side: 0.35, len: 0.11, spread: 1.2 });
      crownLocks(pal, P, 0.35, 2);
      sideLocks(pal, P, 0.085, 0.02);
  }
}
// ---- Haarschweif-Teile (in voller Stufe eigenes Mesh am Feder-Drehpunkt; in „lite“ in den Kopf gebacken) ----
function buildBackSheet(cfg, pal) { return { geo: backSheet(pal, 0.38), pivot: [0, 0.0, -0.05] }; }
function buildPonytail(cfg, pal) {
  const P = [];
  P.push(fig(strand({ at: [0, 0.03, -R * 1.0], dir: [0, -0.55, -0.85], len: 0.3, r: 0.036, bend: [0, -0.2, 0.12], taper: 0.7, flat: 0.8, steps: 7, wave: 0.004 }), { hull: 0.8, color: hairColorFn(pal, { shineY: 0.0, shineH: 0.04, tilt: 0 }) }));
  P.push(fig(new THREE.TorusGeometry(0.03, 0.011, 5, 10), { pos: [0, 0.03, -R * 1.05], rot: [0.9, 0, 0], hull: 0.5, color: pal.accent }));
  return { geo: merge(P), pivot: [0, 0.03, -R * 0.95] };
}
function buildLocs(cfg, pal) {
  const P = [];
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * TAU + 0.22;
    if (Math.cos(a) > 0.82) continue;              // vorn bleibt das Gesicht frei
    const len = 0.2 + hash01(i, 3) * 0.14;
    const x = Math.sin(a), z = Math.cos(a);
    P.push(fig(strand({ at: [x * R * 1.06, 0.03, z * R * 1.06 - 0.01], dir: [x * 0.22, -1, z * 0.2], len, r: 0.02, bend: [x * 0.01, 0, z * 0.01], taper: 0.28, flat: 1, steps: 6, wave: 0.006, seed: i }), { hull: 0.6, color: hairColorFn(pal, { shineY: 0.02, shineH: 0.03, underY: -0.1 }) }));
    if (i === 1 || i === 6 || i === 10) P.push(fig(new THREE.CylinderGeometry(0.023, 0.023, 0.022, 7, 1), { pos: [x * R * 1.12, -0.11, z * R * 1.12 - 0.01], hull: 0.5, color: pal.accent }));
  }
  return { geo: merge(P), pivot: [0, 0.03, -0.01] };
}
function buildBraids(cfg, pal) {
  const P = [];
  for (const s of [-1, 1]) {
    const pts = [], radii = [];
    for (let k = 0; k <= 12; k++) { const t = k / 12; pts.push(new THREE.Vector3(s * (R * 0.98 + 0.01 * (1 - t)), 0.0 - t * 0.31, -0.03 + t * 0.07)); radii.push(k === 12 ? 0 : 0.019 + 0.006 * Math.sin(t * 40) * (1 - t * 0.4)); }
    P.push(fig(tube(pts, radii, { segs: 6 }), { hull: 0.7, color: hairColorFn(pal, { shineY: 0.0, shineH: 0.03, tilt: 0, underY: -0.2 }) }));
    P.push(fig(new THREE.CylinderGeometry(0.02, 0.02, 0.026, 7, 1), { pos: [s * R * 0.98, -0.3, 0.035], hull: 0.5, color: pal.accent }));
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
    const col = darker(skin, 0.76);
    const n = freck >= 2 ? 11 : 6;
    for (const s of [-1, 1]) for (let i = 0; i < n; i++) {
      const u = hash01(i, 7 + s), v = hash01(i, 19 + s);
      const A = headAnchor(s * (0.3 + u * 0.4), -0.2 - v * 0.2, 0.82 - u * 0.15);
      P.push(onFace(circle(0.0042 + hash01(i, 5) * 0.0024, 6), A, 0.002, { flag: FLAG.skin, hull: 0, color: col }));
    }
  }
  if (cfg.vitiligo) {
    const col = mixHex(skin, '#f8ede2', 0.7);
    const spots = [[0.55, 0.45, 0.7, 0.03], [-0.7, 0.1, 0.65, 0.026], [0.2, -0.6, 0.72, 0.022], [-0.35, 0.75, 0.5, 0.024], [0.85, -0.2, 0.35, 0.02]];
    spots.forEach(([ax, ay, az, r], i) => { const A = headAnchor(ax, ay, az); P.push(onFace(circle(r, 9, { ry: r * (0.8 + hash01(i, 2) * 0.4) }), A, 0.002, { flag: FLAG.skin, hull: 0, color: col })); });
  }
}

// ---- Brillen ----
const LENS = { off: 0.014 };
function buildGlassesFrame(cfg, P) {
  const g = cfg.glasses, c = cfg.glassesColor;
  if (!g || g === 'keine') return;
  const temple = (s) => {
    const A = eyeAnchor(s);
    const p0 = A.pos.clone().addScaledVector(A.right, s * 0.047).addScaledVector(A.n, LENS.off);
    const p1 = new THREE.Vector3(s * R * 0.97, 0.008, -0.02);
    P.push(fig(tube([p0, p0.clone().lerp(p1, 0.5), p1, p1.clone().add(new THREE.Vector3(0, -0.01, -0.03))], [0.004, 0.0035, 0.0035, 0.0025], { segs: 5 }), { hull: 0.5, color: c }));
  };
  if (g === 'rund') {
    for (const s of [-1, 1]) { const A = eyeAnchor(s); P.push(fig(new THREE.TorusGeometry(0.04, 0.0042, 5, 22), { pos: [A.pos.x + A.n.x * LENS.off, A.pos.y + A.n.y * LENS.off, A.pos.z + A.n.z * LENS.off], rot: A.rot, hull: 0.5, color: c })); }
    P.push(fig(new THREE.CylinderGeometry(0.0035, 0.0035, 0.036, 6, 1), { pos: [0, 0.0, R * 0.9 + 0.005], rot: [0, 0, Math.PI / 2], hull: 0.5, color: c }));
    temple(-1); temple(1);
  } else if (g === 'eckig') {
    for (const s of [-1, 1]) {
      const A = eyeAnchor(s);
      const pts = [];
      const w = 0.084, h = 0.054, r = 0.012;
      for (let k = 0; k <= 16; k++) { const t = k / 16 * TAU; const cx = Math.cos(t), sy = Math.sin(t); const x = Math.sign(cx) * Math.max(0, Math.abs(cx) * (w / 2) - r) + cx * r; const y = Math.sign(sy) * Math.max(0, Math.abs(sy) * (h / 2) - r) + sy * r; pts.push(new THREE.Vector3(x, y, 0).applyQuaternion(A.q).add(A.pos).addScaledVector(A.n, LENS.off)); }
      P.push(fig(tube(pts, pts.map(() => 0.004), { segs: 5 }), { hull: 0.5, color: c }));
    }
    P.push(fig(new THREE.CylinderGeometry(0.0035, 0.0035, 0.028, 6, 1), { pos: [0, 0.004, R * 0.9 + 0.005], rot: [0, 0, Math.PI / 2], hull: 0.5, color: c }));
    temple(-1); temple(1);
  } else if (g === 'sport') {
    P.push(fig(new THREE.TorusGeometry(R * 1.02, 0.0095, 5, 18, Math.PI * 0.86), { pos: [0, 0.022, -0.005], rot: [Math.PI / 2, 0, Math.PI * 0.07], hull: 0.7, color: c }));
    for (const s of [-1, 1]) P.push(fig(capsule(0.005, 0.004, 0.12), { pos: [s * R * 0.99, 0.012, R * 0.3], rot: [Math.PI / 2, 0, 0], hull: 0.5, color: c }));
  }
}
// Gläser als eigene, durchsichtige Geometrie (Material: Glas mit Fresnel)
export function buildLenses(cfg) {
  const g = cfg.glasses;
  if (!g || g === 'keine') return null;
  const P = [];
  if (g === 'rund') for (const s of [-1, 1]) P.push(onFace(circle(0.037, 16), eyeAnchor(s), LENS.off - 0.002, { color: '#dff3ff', smooth: false }));
  else if (g === 'eckig') for (const s of [-1, 1]) P.push(onFace(new THREE.PlaneGeometry(0.076, 0.048), eyeAnchor(s), LENS.off - 0.002, { color: '#dff3ff', smooth: false }));
  else P.push(fig(new THREE.SphereGeometry(R * 1.015, 18, 6, Math.PI * 0.1, Math.PI * 0.8, Math.PI * 0.42, Math.PI * 0.18), { pos: [0, 0.022, -0.005], color: '#6a5cff' }));
  return merge(P);
}

function buildHearingAids(cfg, P) {
  const h = cfg.hearingAid;
  if (!h || h === 'keins') return;
  const sides = h === 'beide' ? [-1, 1] : h === 'links' ? [1] : [-1];
  const c = cfg.aidColor;
  for (const s of sides) {
    P.push(fig(new THREE.TorusGeometry(0.026, 0.0075, 5, 10, Math.PI), { pos: [s * R * 0.96, 0.0, -0.035], rot: [0, Math.PI / 2, 0], scale: [1, 1.2, 1], hull: 0.6, color: c }));
    P.push(fig(new RoundedBoxGeometry(0.011, 0.018, 0.013, 1, 0.004), { pos: [s * R * 0.92, -0.018, -0.003], hull: 0.5, color: darker(c, 0.7) }));
    P.push(fig(sphere(0.0045, 6, 4), { pos: [s * R * 0.98, 0.008, -0.05], flag: FLAG.flat, color: lighter(c, 0.6) }));
  }
}

// ---- Kopf zusammensetzen ----
// opts.withFace: Augen einbacken · withBrows/withMouth: Brauen, Mund neutral statisch einbacken (lite) · withTail: Schweif einbacken (lite)
export function buildHead(cfg, { withFace = true, withBrows = false, withMouth = false, withTail = false } = {}) {
  const P = [];
  const skin = cfg.skin;
  P.push(fig(new THREE.SphereGeometry(R, 20, 16), { scale: HEAD_SCALE, deform: headDeform, flag: FLAG.skin, color: skin }));
  // Ohren mit Innenfläche (zwischen Augen- und Mundhöhe)
  for (const s of [-1, 1]) {
    P.push(fig(sphere(0.03, 8, 6), { pos: [s * R * 0.9, -0.024, -0.02], scale: [0.5, 1.05, 0.8], flag: FLAG.skin, hull: 0.7, color: skin }));
    P.push(fig(circle(0.015, 8, { ry: 0.019 }), { pos: [s * (R * 0.9 + 0.016), -0.024, -0.02], rot: [0, s * Math.PI / 2, 0], flag: FLAG.skin, hull: 0, color: darker(skin, 0.84) }));
  }
  // Nase: kleiner weicher Keil, Schatten nur an der Seite
  const NA = headAnchor(0, -0.28, 1);
  P.push(fig(sphere(0.011, 8, 6), { pos: [NA.pos.x, NA.pos.y - 0.002, NA.pos.z + 0.004], scale: [0.7, 1.3, 1.0], flag: FLAG.skin, hull: 0, color: (x, y, z, out) => out.set(skin).multiplyScalar(x < -0.003 ? 0.9 : 1) }));
  // Wangen: 8 % Rosa als flache Flecken
  for (const s of [-1, 1]) { const A = headAnchor(s * 0.55, -0.38, 0.75); const blush = mixHex(skin, '#ff8fab', 0.14), sk = new THREE.Color(skin); P.push(onFace(circle(0.03, 8, { ry: 0.018 }), A, 0.0018, { flag: FLAG.skin, hull: 0, color: (x, y, z, out) => out.copy(blush).lerp(sk, Math.min(1, Math.hypot(x / 0.03, y / 0.018))) })); }
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

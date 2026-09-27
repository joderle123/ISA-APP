// Geometrie-Werkzeuge der Figur (Stil-Bibel §8): weiche, verschweißte Formen statt Low-Poly-Facetten.
//   fig(geo, opts)      wie world/geom part(), aber mit weichen Normalen (Nähte verschweißt), Farben im LOKALEN Raum des Teils
//                       (vor pos/rot/scale) und Flächen-Flag (opts.flag: 0 Stoff · 1 Haut · 2 flach/unbeleuchtet) im Attribut aWind.
//   capsule(rTop, rBot, len)   Kapsel mit Kugelkappen um y = 0 (oben) und y = −len (unten) – Gelenkkugeln überlappen nahtlos
//   lathe(profile, segs)       Drehform aus [[r, y], …]
//   tube(points, radii, opts)  verjüngter Schlauch entlang einer Kurve (Haarsträhnen, Zöpfe); radii[last] = 0 → Spitze
//   strand(opts)               Haar-Klumpen: gebogener, spitz zulaufender Schlauch (opts.flat drückt ihn flach an den Kopf)
//   flat(points2d, opts)       flache Fläche (Fächer um den Schwerpunkt) für Augen, Mund, Brauen; almond(), circle(), arc()
//   RoundedBoxGeometry, merge  re-exportiert (Schuhe, Rucksack; Teile zusammenfügen)
import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { merge } from '../../world/geom.js';

export { merge, RoundedBoxGeometry };
export const FLAG = { cloth: 0, skin: 1, flat: 2 };

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _c = new THREE.Color(), _v = new THREE.Vector3(), _s = new THREE.Vector3(), _p = new THREE.Vector3();

// Nähte verschweißen (Lathe/Sphere-Naht, Pole) – danach ergeben computeVertexNormals weiche Normalen ohne Kante
export function weld(geo, tol = 1e-4) {
  geo.deleteAttribute('uv'); geo.deleteAttribute('normal');
  if (geo.attributes.uv1) geo.deleteAttribute('uv1');
  const g = mergeVertices(geo, tol);
  if (g !== geo) geo.dispose();
  return g;
}

/**
 * Teil vorbereiten (weich). opts: color (hex|Color|fn(x,y,z,out,i) – lokale Koordinaten), flag, pos, rot, scale, order,
 * deform fn(v) (lokal, vor der Transformation), smooth (false = Facetten behalten), colorAfter (Farben nach der Transformation)
 */
export function fig(geo, opts = {}) {
  let g = geo;
  const smooth = opts.smooth !== false;
  if (smooth) g = weld(g);
  else { if (g.index) g = g.toNonIndexed(); g.deleteAttribute('uv'); }
  const pa = g.attributes.position;
  if (opts.deform) {
    for (let i = 0; i < pa.count; i++) { _v.fromBufferAttribute(pa, i); opts.deform(_v); pa.setXYZ(i, _v.x, _v.y, _v.z); }
  }
  // Farben im lokalen Raum (vor der Transformation)
  const n = pa.count;
  const col = new Float32Array(n * 3);
  const flag = new Float32Array(n).fill(opts.flag || 0);
  const colorAt = (i) => {
    const x = pa.getX(i), y = pa.getY(i), z = pa.getZ(i);
    if (typeof opts.color === 'function') opts.color(x, y, z, _c, i); else _c.set(opts.color !== undefined ? opts.color : 0xffffff);
    col[i * 3] = _c.r; col[i * 3 + 1] = _c.g; col[i * 3 + 2] = _c.b;
  };
  if (!opts.colorAfter) for (let i = 0; i < n; i++) colorAt(i);
  const sc = opts.scale === undefined ? [1, 1, 1] : (typeof opts.scale === 'number' ? [opts.scale, opts.scale, opts.scale] : opts.scale);
  const r = opts.rot || [0, 0, 0], p = opts.pos || [0, 0, 0];
  _q.setFromEuler(_e.set(r[0], r[1], r[2], opts.order || 'XYZ'));
  _m.compose(_p.set(p[0], p[1], p[2]), _q, _s.set(sc[0], sc[1], sc[2]));
  g.applyMatrix4(_m);
  if (opts.colorAfter) for (let i = 0; i < n; i++) colorAt(i);
  g.deleteAttribute('normal');
  g.computeVertexNormals();
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  g.setAttribute('aWind', new THREE.BufferAttribute(flag, 1));
  if (g.index) g = g.toNonIndexed();
  return g;
}

// ---- Grundformen ----
export function lathe(profile, segs = 12, phiStart = 0, phiLength = Math.PI * 2) {
  return new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), segs, phiStart, phiLength);
}
// Kapsel: Kugelkappe (Radius rTop) um y = 0, Kugelkappe (rBot) um y = −len, dazwischen konisch
export function capsule(rTop, rBot, len, { segs = 10, caps = 3, topCap = true, botCap = true, rows = null } = {}) {
  let prof = capsuleProfile(rTop, rBot, len, caps, topCap, botCap);
  if (rows && rows.length) prof = withRows(prof, rows);
  return lathe(prof, segs);
}
export function sphere(r, w = 12, h = 9) { return new THREE.SphereGeometry(r, w, h); }
// Zusätzliche Profilzeilen einfügen (Profil nach y aufsteigend) – je zwei dicht beieinander ergeben eine scharfe Farbkante
export function withRows(profile, ys, edge = 0.0008) {
  const prof = profile.map((p) => [p[0], p[1]]);
  const all = [];
  for (const y of ys) all.push(y - edge, y + edge);
  for (const y of all) {
    for (let i = 1; i < prof.length; i++) {
      if (prof[i - 1][1] < y && y < prof[i][1]) { const t = (y - prof[i - 1][1]) / (prof[i][1] - prof[i - 1][1]); prof.splice(i, 0, [prof[i - 1][0] + (prof[i][0] - prof[i - 1][0]) * t, y]); break; }
    }
  }
  return prof;
}
// Kapsel-Profil (für withRows): wie capsule(), aber als Punktliste
export function capsuleProfile(rTop, rBot, len, caps = 3, topCap = true, botCap = true) {
  const prof = [];
  if (botCap) for (let i = 0; i <= caps; i++) { const a = -Math.PI / 2 + (i / caps) * (Math.PI / 2); prof.push([Math.cos(a) * rBot, -len + Math.sin(a) * rBot]); }
  else prof.push([0, -len], [rBot, -len]);
  if (topCap) for (let i = 0; i <= caps; i++) { const a = (i / caps) * (Math.PI / 2); prof.push([Math.cos(a) * rTop, Math.sin(a) * rTop]); }
  else prof.push([rTop, 0], [0, 0]);
  return prof;
}
// Verjüngter Schlauch entlang von Punkten. radii je Punkt; flat < 1 drückt den Querschnitt in Richtung flatDir zusammen.
export function tube(points, radii, { segs = 6, flat = 1, flatDir = null } = {}) {
  const n = points.length;
  const pos = [], idx = [];
  const t = new THREE.Vector3(), u = new THREE.Vector3(), w = new THREE.Vector3(), ref = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    const p = points[i], r = radii[i];
    t.subVectors(points[Math.min(n - 1, i + 1)], points[Math.max(0, i - 1)]).normalize();
    if (flatDir) ref.copy(flatDir); else ref.set(0, 1, 0);
    if (Math.abs(ref.dot(t)) > 0.95) ref.set(1, 0, 0);
    w.copy(ref).addScaledVector(t, -ref.dot(t)).normalize();
    u.crossVectors(t, w).normalize();
    for (let k = 0; k < segs; k++) {
      const a = (k / segs) * Math.PI * 2;
      pos.push(p.x + u.x * Math.cos(a) * r + w.x * Math.sin(a) * r * flat, p.y + u.y * Math.cos(a) * r + w.y * Math.sin(a) * r * flat, p.z + u.z * Math.cos(a) * r + w.z * Math.sin(a) * r * flat);
    }
  }
  for (let i = 0; i < n - 1; i++) for (let k = 0; k < segs; k++) {
    const a = i * segs + k, b = i * segs + (k + 1) % segs, c = a + segs, d = b + segs;
    idx.push(a, c, b, b, c, d);
  }
  // Deckel am Anfang (Fächer)
  const c0 = pos.length / 3;
  pos.push(points[0].x, points[0].y, points[0].z);
  for (let k = 0; k < segs; k++) idx.push(c0, k, (k + 1) % segs);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  return g;
}
// Haar-Klumpen: Basis at, Richtung dir, Länge len, Radius r, Biegung bend (Versatz an der Spitze), Verjüngung taper
export function strand({ at, dir, len, r, bend = [0, 0, 0], flat = 1, flatDir = null, segs = 5, steps = 4, taper = 0.55, wave = 0, seed = 0 } = {}) {
  const A = new THREE.Vector3(...at), D = new THREE.Vector3(...dir).normalize(), B = new THREE.Vector3(...bend);
  const pts = [], radii = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const p = A.clone().addScaledVector(D, len * t).addScaledVector(B, t * t);
    if (wave) { p.x += Math.sin(t * 6.0 + seed) * wave * t; p.z += Math.cos(t * 5.0 + seed * 1.3) * wave * t; }
    pts.push(p);
    radii.push(i === steps ? 0 : r * Math.pow(1 - t, taper) * (i === 0 ? 0.92 : 1));
  }
  return tube(pts, radii, { segs, flat, flatDir: flatDir ? new THREE.Vector3(...flatDir) : null });
}

// ---- Flache Formen (z = 0, Normale +z) ----
export function flat(points, { z = 0, center = null } = {}) {
  let cx = 0, cy = 0;
  if (center) { cx = center[0]; cy = center[1]; } else { for (const p of points) { cx += p[0]; cy += p[1]; } cx /= points.length; cy /= points.length; }
  const pos = [cx, cy, z];
  for (const p of points) pos.push(p[0], p[1], z);
  const idx = [];
  const n = points.length;
  for (let i = 0; i < n; i++) idx.push(0, 1 + i, 1 + (i + 1) % n);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  return g;
}
export function circle(r, segs = 12, { ry = r, cx = 0, cy = 0, z = 0 } = {}) {
  const pts = [];
  for (let i = 0; i < segs; i++) { const a = (i / segs) * Math.PI * 2; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * ry]); }
  return flat(pts, { z, center: [cx, cy] });
}
// Mandel: oben runder (hUp) als unten (hDown), leichte Neigung tilt (rad, äußerer Winkel höher), Breite w
export function almondPts(w, hUp, hDown, segs = 16, tilt = 0, s = 1) {
  const pts = [];
  for (let i = 0; i < segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    const x = Math.cos(a) * w / 2, sy = Math.sin(a);
    const y = sy * (sy > 0 ? hUp : hDown) * Math.pow(1 - Math.abs(Math.cos(a)) * 0.15, 0.5);
    pts.push([x * Math.cos(tilt) - y * Math.sin(tilt) * s, y * Math.cos(tilt) + x * Math.sin(tilt) * s]);
  }
  return pts;
}
// Bogenband (Lächeln, Lid): Kurve y = f(x) zwischen x0…x1 mit Dicke th(x); Rückgabe: geschlossenes Polygon
export function bandPts(x0, x1, f, th, segs = 10) {
  const top = [], bot = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs, x = x0 + (x1 - x0) * t, y = f(t), h = th(t);
    top.push([x, y + h / 2]); bot.push([x, y - h / 2]);
  }
  return bot.concat(top.reverse());
}
// Bogenband als Streifen-Geometrie (auch für dünne, stark gebogene Bänder sicher trianguliert)
export function band(x0, x1, f, th, segs = 10, z = 0) {
  const pos = [], idx = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs, x = x0 + (x1 - x0) * t, y = f(t), h = th(t);
    pos.push(x, y + h / 2, z, x, y - h / 2, z);
  }
  for (let i = 0; i < segs; i++) { const T = i * 2, B = T + 1, T2 = T + 2, B2 = T + 3; idx.push(T, B, B2, T, B2, T2); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  return g;
}
// Polygon mit Rand/Kern-Farbverlauf (für Iris): innere Scheibe + Ring als ein Teil
export function ringGrad(rIn, rOut, segs = 14, { cx = 0, cy = 0, z = 0 } = {}) {
  const pos = [], idx = [];
  for (let i = 0; i < segs; i++) { const a = (i / segs) * Math.PI * 2; pos.push(cx + Math.cos(a) * rIn, cy + Math.sin(a) * rIn, z); }
  for (let i = 0; i < segs; i++) { const a = (i / segs) * Math.PI * 2; pos.push(cx + Math.cos(a) * rOut, cy + Math.sin(a) * rOut, z); }
  for (let i = 0; i < segs; i++) { const j = (i + 1) % segs; idx.push(i, segs + i, segs + j, i, segs + j, j); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  return g;
}
// Schwerpunkt-Fächer, aber mit Zentrum als eigenem Punkt (für radiale Verläufe: Farbe nach Abstand vom Zentrum)
export const radial = (cIn, cOut, r, cx = 0, cy = 0) => {
  const A = new THREE.Color(cIn), B = new THREE.Color(cOut);
  return (x, y, z, out) => { out.copy(A).lerp(B, Math.min(1, Math.hypot(x - cx, y - cy) / r)); };
};
// Vertikaler Verlauf (Farbe nach y zwischen y0 und y1)
export const vgrad = (cBottom, cTop, y0, y1) => {
  const A = new THREE.Color(cBottom), B = new THREE.Color(cTop);
  return (x, y, z, out) => { out.copy(A).lerp(B, Math.max(0, Math.min(1, (y - y0) / (y1 - y0)))); };
};

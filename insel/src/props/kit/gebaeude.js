// Gebäude und Hafen-Kleinkram (Stil-Bibel §9.2/§9.4): Häuser in drei Größen S/M/L mit Steinsockel, Planken-Wänden
// (oben 5 % breiter, Wind-Waker-Lehne), Satteldach 38° mit 0,6 m Überstand, 0,25 m Dicke, First-Kappe und drei
// Ziegelbändern (oder Schiefer), gewölbter Tür mit Goldknauf, Fenstern mit Rahmen, Sprossen, Läden und Blumenkasten
// (tags Glas #BFE8FF, nachts emissiv #FFE7A0 > 1.0 → Bloom, geteiltes Material M.window), Schornstein, Türlaterne,
// Markise (Markt). Dazu Kiosk, Wimpelkette, Kisten, Fässer, Bojen, Netz, Ruderboot, Bank, Pflaster, Blumenkübel, Brunnen.
// Alle Bauteile sind bake-fähig (kit.bake): feste Teile teilen sich M.base / M.baseDouble / M.window / M.glow.
// Ursprung = Bodenpunkt in der Mitte des Grundrisses, +z = Vorderseite (Tür).
import * as THREE from 'three';
import { part, merge, qhash } from '../../world/geom.js';

const TAU = Math.PI * 2;
export const HAUS_WAENDE = ['#F4E9D3', '#E8735C', '#6FCFB8', '#E9B95C', '#4F88C8'];
export const HAUS_AKZENTE = ['#FF7A59', '#2FB8A8', '#FFD166', '#4F88C8', '#E8735C', '#B48CFF'];
const ZIEGEL = ['#C6553B', '#B44A33', '#D46A4A'];
const SCHIEFER = ['#3F4460', '#4A5070', '#363B55'];
const TRIM = '#FFF3D6', HOLZ = '#B47A4E', HOLZ_D = '#7A4E2E', TUER = '#6E4A30', SOCKEL = '#A69A8C', GOLD = '#FFD166', METALL = '#3F4460', METALL_H = '#C9CFE8';
const BLUMEN = ['#FF5D8F', '#FFD23F', '#FF7A59', '#FFFFFF', '#B48CFF', '#FF4D6D'];
export const HAUS_DIM = { S: [3.5, 3.0, 3.2], M: [4.5, 3.4, 4.0], L: [6.0, 6.4, 4.5] };
const ROOF_A = (38 * Math.PI) / 180;
const SOCLE_TOP = 0.4, SOCLE_DEPTH = 1.6;

const mesh = (geo, mat, dyn = false) => { const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = true; if (dyn) m.userData.dynamic = true; return m; };
const col = (hex) => new THREE.Color(hex);
// Farbe je Fläche leicht variieren (±amt), deterministisch aus Flächenindex und Seed
const varied = (hex, f, seed, amt = 0.03) => col(hex).multiplyScalar(1 + (qhash(f, seed, 3, seed + 11) - 0.5) * amt * 2);
const clamp01 = (v) => Math.max(0, Math.min(1, v));

// Fassaden-Koordinaten: face 'front' (+z) · 'back' (−z) · 'left' (−x) · 'right' (+x); l = [quer u, hoch v, nach außen w]
function facePlace(face, B, T, [u, v, w]) {
  switch (face) {
    case 'front': return { pos: [u, v, T / 2 + w], rot: [0, 0, 0] };
    case 'back': return { pos: [-u, v, -T / 2 - w], rot: [0, Math.PI, 0] };
    case 'right': return { pos: [B / 2 + w, v, -u], rot: [0, Math.PI / 2, 0] };
    default: return { pos: [-B / 2 - w, v, u], rot: [0, -Math.PI / 2, 0] };
  }
}
// Quer-Koordinate u einer Fassade aus Haus-Koordinaten (für Streifen quer zur Fassade)
const uOf = (face, x, z) => (face === 'front' ? x : face === 'back' ? -x : face === 'right' ? -z : z);
// Teil in Fassaden-Koordinaten setzen (Geometrie: +x quer, +y hoch, +z nach außen); o.rx/o.ry = lokale Vordrehung
function onFace(geo, face, B, T, l, o = {}) {
  if (o.rx) geo.rotateX(o.rx);
  if (o.ry) geo.rotateY(o.ry);
  const f = facePlace(face, B, T, l);
  return part(geo, { pos: f.pos, rot: f.rot, ...(o.opts || {}) });
}
function tuerShape(w, h, r) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, h - r);
  s.absarc(0, h - r, r, 0, Math.PI, false);
  s.lineTo(-w / 2, 0);
  return s;
}
const extrude = (shape, depth, segs = 8) => new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: segs });

// ---- Haus ----
//   o.size 'S'|'M'|'L' · o.wall / o.accent (Hex) · o.roof 'ziegel'|'schiefer' · o.markise (Markt) · o.door (u-Versatz der Tür)
//   o.windows [{ face, u, v?, shutters?, box? }] überschreibt die Standard-Fensterverteilung · o.chimney false
export function haus(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const size = HAUS_DIM[o.size] ? o.size : 'M';
  const [B, H, T] = HAUS_DIM[size];
  const wall = o.wall || R.pick(HAUS_WAENDE);
  const accent = o.accent || R.pick(HAUS_AKZENTE.filter((a) => a.toLowerCase() !== wall.toLowerCase()));
  const slate = o.roof === 'schiefer' || (o.roof === undefined && R.chance(0.3));
  const TILES = slate ? SCHIEFER : ZIEGEL;
  const ridgeCol = slate ? '#2C3049' : '#8F3A2A';
  const seed = Math.floor(R.float(0, 1000));
  const P = [], W = [], D = [], G = [];   // fest (base) · Fenster (window) · doppelseitig · leuchtend (glow)
  const lampLocal = new THREE.Vector3();
  const yT = SOCLE_TOP + H;                                  // Oberkante Wand
  const hw = B / 2 + 0.6;                                    // halbe Dachbreite mit Überstand
  const gableH = (B / 2) * Math.tan(ROOF_A) * 1.05;          // Giebelhöhe über der (oben breiteren) Wand
  const yR = yT + gableH;                                    // First
  const yE = yR - hw * Math.tan(ROOF_A);                     // Traufe
  const bul = (face, v) => ((face === 'front' || face === 'back' ? T : B) / 2) * 0.05 * clamp01((v - SOCLE_TOP) / H);

  // 1. Steinsockel (tief in den Hang gezogen, damit an Hängen keine Lücke entsteht), Steinreihen als Flächenfarbe
  P.push(part(new THREE.BoxGeometry(B + 0.2, SOCLE_DEPTH + SOCLE_TOP, T + 0.2, 1, 4, 1), {
    pos: [0, (SOCLE_TOP - SOCLE_DEPTH) / 2, 0],
    faceColor: (cx, cy, cz, out, f) => out.copy(varied(SOCKEL, Math.floor((cy + SOCLE_DEPTH) / 0.25) * 7 + (f % 2), seed, 0.05)),
  }));
  // 2. Wandkörper: oben 5 % breiter, Planken alle 0,35 m ±4 % als Flächenfarbe
  const rows = Math.max(4, Math.round(H / 0.35));
  P.push(part(new THREE.BoxGeometry(B, H, T, 1, rows, 1), {
    pos: [0, SOCLE_TOP + H / 2, 0],
    deform: (v) => { const t = clamp01((v.y + H / 2) / H); v.x *= 1 + 0.05 * t; v.z *= 1 + 0.05 * t; },
    faceColor: (cx, cy, cz, out) => out.copy(varied(wall, Math.floor((cy - SOCLE_TOP) / 0.35), seed + 3, 0.04)),
  }));
  // Giebel (Prismen vorn und hinten, in Wandfarbe leicht dunkler)
  {
    const gs = new THREE.Shape();
    gs.moveTo(-B * 0.525, yT); gs.lineTo(B * 0.525, yT); gs.lineTo(0, yR + 0.02); gs.lineTo(-B * 0.525, yT);
    const depth = T * 1.05 - 0.02;
    P.push(part(extrude(gs, depth, 1), { pos: [0, 0, -depth / 2], color: col(wall).multiplyScalar(0.94) }));
  }
  // 3. Dach: zwei Platten 0,25 m dick, 0,6 m Überstand, Ziegelreihen als drei Farbbänder, Unterseite Holz; First-Kappe
  const roofDepth = T * 1.05 + 1.2;
  for (const s of [-1, 1]) {
    const L = hw / Math.cos(ROOF_A);
    const nx = -s * Math.sin(ROOF_A), ny = Math.cos(ROOF_A);
    P.push(part(new THREE.BoxGeometry(L, 0.25, roofDepth, 9, 1, 2), {
      pos: [s * hw / 2 - nx * 0.125, (yR + yE) / 2 - ny * 0.125, 0], rot: [0, 0, -s * ROOF_A],
      faceColor: (cx, cy, cz, out, f) => {
        const dPlane = (cx) * nx + (cy - yR) * ny;
        if (dPlane < -0.12) { out.copy(varied(HOLZ_D, f, seed + 5, 0.03)); return; }
        const along = (yR - cy) / Math.sin(ROOF_A);
        const row = Math.max(0, Math.floor(along / 0.55));
        out.copy(varied(TILES[row % 3], f, seed + row, 0.03));
      },
    }));
  }
  P.push(part(new THREE.BoxGeometry(0.4, 0.16, roofDepth + 0.1), { pos: [0, yR + 0.1, 0], color: ridgeCol }));
  P.push(part(new THREE.BoxGeometry(0.16, 0.36, 0.16), { pos: [0, yR + 0.3, roofDepth / 2 - 0.1], color: ridgeCol }));   // Firstzier vorn
  // Stockwerksband (zweistöckig)
  if (size === 'L') P.push(part(new THREE.BoxGeometry(B * 1.03 + 0.14, 0.18, T * 1.03 + 0.14), { pos: [0, SOCLE_TOP + 3.3, 0], color: HOLZ_D }));

  // 4. Tür (gewölbt) mit Rahmen, Beschlägen, Goldknauf, Stufe
  const doorU = o.door !== undefined ? o.door : (size === 'S' ? 0 : -B * 0.22);
  {
    const w0 = bul('front', 1.5) + 0.02;
    P.push(onFace(extrude(tuerShape(1.16, 2.18, 0.58), 0.08), 'front', B, T, [doorU, SOCLE_TOP, w0], { opts: { color: TRIM } }));
    P.push(onFace(extrude(tuerShape(1.0, 2.1, 0.5), 0.1), 'front', B, T, [doorU, SOCLE_TOP, w0 + 0.03], {
      opts: { faceColor: (cx, cy, cz, out, f) => out.copy(varied(TUER, Math.floor((cx - doorU + 0.5) / 0.25), seed + 9, 0.05)) },
    }));
    for (const yy of [0.9, 1.9]) P.push(onFace(new THREE.BoxGeometry(0.34, 0.06, 0.03), 'front', B, T, [doorU - 0.32, SOCLE_TOP + yy, w0 + 0.14], { opts: { color: METALL } }));
    P.push(onFace(new THREE.IcosahedronGeometry(0.05, 1), 'front', B, T, [doorU + 0.34, SOCLE_TOP + 1.05, w0 + 0.16], { opts: { color: GOLD, smooth: true } }));
    P.push(onFace(new THREE.BoxGeometry(1.5, 0.18, 0.6), 'front', B, T, [doorU, SOCLE_TOP - 0.09, 0.28], { opts: { color: col(SOCKEL).multiplyScalar(1.06) } }));
    // 5. Laterne neben der Tür: Ausleger, Kappe mit heller Kante, Glas (leuchtet), Bodenplatte
    const lu = doorU + 0.92, lv = SOCLE_TOP + 2.25;
    P.push(onFace(new THREE.BoxGeometry(0.05, 0.05, 0.42), 'front', B, T, [lu, lv + 0.2, w0 + 0.2], { opts: { color: METALL } }));
    P.push(onFace(new THREE.ConeGeometry(0.19, 0.14, 4, 1), 'front', B, T, [lu, lv + 0.17, w0 + 0.42], { opts: { color: METALL }, ry: Math.PI / 4 }));
    P.push(onFace(new THREE.BoxGeometry(0.24, 0.02, 0.24), 'front', B, T, [lu, lv + 0.1, w0 + 0.42], { opts: { color: METALL_H } }));
    P.push(onFace(new THREE.BoxGeometry(0.26, 0.03, 0.26), 'front', B, T, [lu, lv - 0.2, w0 + 0.42], { opts: { color: METALL } }));
    G.push(onFace(new THREE.BoxGeometry(0.2, 0.28, 0.2), 'front', B, T, [lu, lv - 0.05, w0 + 0.42], { opts: { color: '#ffe08a' } }));
    lampLocal.set(lu, lv - 0.05, T / 2 + w0 + 0.42);
  }
  // Fenster: Rahmen aus vier Leisten (Laibung), zurückgesetzte Scheibe, Sprossen, Läden, Blumenkasten
  const lowerV = SOCLE_TOP + 1.55, upperV = SOCLE_TOP + 3.3 + 1.3;
  let windows = o.windows;
  if (!windows) {
    windows = [];
    if (size === 'S') { windows.push({ face: 'front', u: 1.05, shutters: false, box: true }, { face: 'left', u: 0, box: true }, { face: 'right', u: 0 }, { face: 'back', u: 0.6 }); }
    else if (size === 'M') { windows.push({ face: 'front', u: B * 0.26, box: true }, { face: 'left', u: -T * 0.2, box: true }, { face: 'left', u: T * 0.22 }, { face: 'right', u: 0, box: true }, { face: 'back', u: -B * 0.22 }, { face: 'back', u: B * 0.24 }); }
    else {
      windows.push({ face: 'front', u: B * 0.24, box: true }, { face: 'front', u: -B * 0.3, v: upperV, box: true }, { face: 'front', u: B * 0.05, v: upperV }, { face: 'front', u: B * 0.36, v: upperV, box: true },
        { face: 'left', u: -T * 0.2, box: true }, { face: 'left', u: T * 0.22 }, { face: 'left', u: 0, v: upperV }, { face: 'right', u: 0 }, { face: 'right', u: -T * 0.22, v: upperV }, { face: 'right', u: T * 0.22, v: upperV },
        { face: 'back', u: -B * 0.25 }, { face: 'back', u: B * 0.25, v: upperV });
    }
  }
  for (const win of windows) {
    const v = win.v !== undefined ? win.v : lowerV;
    const w0 = bul(win.face, v + 0.6) + 0.02;
    const fr = (x, y, sx, sy) => P.push(onFace(new THREE.BoxGeometry(sx, sy, 0.12), win.face, B, T, [win.u + x, v + y, w0 + 0.06], { opts: { color: TRIM } }));
    fr(0, 0.59, 1.06, 0.08); fr(0, -0.59, 1.06, 0.08); fr(-0.49, 0, 0.08, 1.1); fr(0.49, 0, 0.08, 1.1);
    W.push(onFace(new THREE.BoxGeometry(0.9, 1.1, 0.04), win.face, B, T, [win.u, v, w0 + 0.03], { opts: { color: (x, y, z, out) => out.set(y > v ? '#c8ecff' : '#a9d4f4') } }));
    P.push(onFace(new THREE.BoxGeometry(0.035, 1.1, 0.03), win.face, B, T, [win.u, v, w0 + 0.065], { opts: { color: TRIM } }));
    P.push(onFace(new THREE.BoxGeometry(0.9, 0.035, 0.03), win.face, B, T, [win.u, v + 0.08, w0 + 0.065], { opts: { color: TRIM } }));
    const shutters = win.shutters !== undefined ? win.shutters : (size !== 'L' || v === lowerV);
    if (shutters) for (const s of [-1, 1]) {
      P.push(onFace(new THREE.BoxGeometry(0.4, 1.22, 0.05, 1, 4, 1), win.face, B, T, [win.u + s * 0.76, v, w0 + 0.03], {
        opts: { faceColor: (cx, cy, cz, out) => out.copy(col(accent).multiplyScalar(Math.floor((cy - v + 0.61) / 0.3) % 2 ? 0.9 : 1.0)) },
      }));
    }
    if (win.box) {
      P.push(onFace(new THREE.BoxGeometry(1.04, 0.24, 0.3), win.face, B, T, [win.u, v - 0.72, w0 + 0.16], {
        opts: { faceColor: (cx, cy, cz, out, f) => out.copy(varied(HOLZ, f >> 1, seed + 21, 0.05)) },
      }));
      for (let k = 0; k < 4; k++) {
        const fu = -0.33 + k * 0.22, fc = BLUMEN[(k + seed) % BLUMEN.length];
        P.push(onFace(new THREE.IcosahedronGeometry(0.08 + (k % 2) * 0.015, 0), win.face, B, T, [win.u + fu, v - 0.52, w0 + 0.16 + (k % 2) * 0.06], { opts: { color: fc } }));
      }
      for (const s of [-1, 1]) P.push(onFace(new THREE.IcosahedronGeometry(0.12, 0), win.face, B, T, [win.u + s * 0.46, v - 0.56, w0 + 0.2], { opts: { color: '#5F9E3C', scale: [1, 0.7, 1] } }));
    }
  }
  // Schornstein auf der Rückseite mit Steinreihen und Kappe
  if (o.chimney !== false) {
    const cxp = -B * 0.28, zc = -T * 0.15;
    const yPl = yR - Math.abs(cxp) * Math.tan(ROOF_A);
    P.push(part(new THREE.BoxGeometry(0.56, 1.5, 0.56, 1, 5, 1), { pos: [cxp, yPl + 0.35, zc], faceColor: (x, cy, z, out, f) => out.copy(varied(SOCKEL, Math.floor(cy / 0.25) + (f % 2), seed + 31, 0.06)) }));
    P.push(part(new THREE.BoxGeometry(0.72, 0.14, 0.72), { pos: [cxp, yPl + 1.12, zc], color: '#5a4e4a' }));
  }
  // Markise (Markt): gestreiftes Sonnensegel über Tür und Fenster, zwei Streben
  if (o.markise) {
    const mw = Math.min(B * 0.9, 3.2), mv = SOCLE_TOP + 2.75, mu = size === 'S' ? 0 : doorU + 0.6;
    const w0 = bul('front', mv) + 0.02;
    const a = 0.42;
    P.push(onFace(new THREE.BoxGeometry(mw, 0.05, 1.15, 8, 1, 1), 'front', B, T, [mu, mv - Math.sin(a) * 0.575, w0 + Math.cos(a) * 0.575], {
      rx: a,
      opts: { faceColor: (cx, cy, cz, out) => out.set(Math.floor((uOf('front', cx, cz) - mu + mw / 2) / (mw / 8)) % 2 ? accent : TRIM) },
    }));
    // Wellenkante vorn
    for (let k = 0; k < 8; k++) P.push(onFace(new THREE.BoxGeometry(mw / 8 - 0.02, 0.16, 0.03), 'front', B, T, [mu - mw / 2 + (k + 0.5) * (mw / 8), mv - Math.sin(a) * 1.15 - 0.06, w0 + Math.cos(a) * 1.15], { opts: { color: k % 2 ? accent : TRIM } }));
    for (const s of [-1, 1]) P.push(onFace(new THREE.BoxGeometry(0.04, 0.04, 1.2), 'front', B, T, [mu + s * (mw / 2 - 0.1), mv - 0.5, w0 + 0.55], { rx: 0.9, opts: { color: METALL } }));
  }
  g.add(mesh(merge(P), M.base));
  if (W.length) g.add(mesh(merge(W), M.window()));
  if (D.length) g.add(mesh(merge(D), M.baseDouble));
  if (G.length) { const gl = mesh(merge(G), M.glow('#ffe08a', { intensity: 0.9 })); gl.castShadow = false; g.add(gl); }
  return {
    group: g, type: 'haus', size, wall, accent, dims: { B, H, T, ridge: yR, eave: yE },
    far: 260,
    // Traufpunkt in Haus-Koordinaten (für Wimpelketten): face + u
    eave(face, u = 0) { const p = facePlace(face, B, T, [u, yE + 0.1, 0.55]).pos; return new THREE.Vector3(p[0], p[1], p[2]); },
    // Türlaterne in Weltkoordinaten (Lichtpool)
    lampWorld(out = new THREE.Vector3()) { g.updateMatrixWorld(true); return g.localToWorld(out.copy(lampLocal)); },
    collide(colliders, x, z, y, yaw = 0) { return colliders.addBox(x, z, B / 2 + 0.25, T / 2 + 0.25, yaw, { group: 'props', tag: 'haus' }); },
  };
}

// ---- Kiosk: kleiner Verkaufsstand mit Theke, Rückwand, gestreifter Markise, Schild und Waren ----
export function kiosk(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const wall = o.wall || '#E9B95C', accent = o.accent || '#FF7A59';
  const seed = Math.floor(R.float(0, 1000));
  const P = [], G = [];
  P.push(part(new THREE.BoxGeometry(2.8, 0.22, 2.2), { pos: [0, 0.11, 0], color: SOCKEL }));
  P.push(part(new THREE.BoxGeometry(2.6, 2.3, 0.12, 1, 7, 1), { pos: [0, 1.37, -0.96], faceColor: (x, cy, z, out) => out.copy(varied(wall, Math.floor(cy / 0.33), seed, 0.04)) }));
  for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.12, 2.3, 2.0, 1, 7, 1), { pos: [s * 1.24, 1.37, 0], faceColor: (x, cy, z, out) => out.copy(varied(wall, Math.floor(cy / 0.33), seed + 1, 0.04)) }));
  P.push(part(new THREE.BoxGeometry(2.6, 1.0, 0.14, 1, 3, 1), { pos: [0, 0.72, 0.93], faceColor: (x, cy, z, out) => out.copy(varied(accent, Math.floor(cy / 0.33), seed + 2, 0.04)) }));
  P.push(part(new THREE.BoxGeometry(2.9, 0.09, 0.62), { pos: [0, 1.27, 0.9], color: HOLZ }));
  P.push(part(new THREE.BoxGeometry(3.0, 0.16, 2.7), { pos: [0, 2.56, 0.05], rot: [-0.05, 0, 0], color: HOLZ_D }));
  P.push(part(new THREE.BoxGeometry(3.0, 0.22, 0.06), { pos: [0, 2.5, 1.36], color: HOLZ }));
  // Markise
  const a = 0.5, mw = 3.0;
  P.push(part(new THREE.BoxGeometry(mw, 0.05, 1.0, 8, 1, 1), { pos: [0, 2.32 - Math.sin(a) * 0.5, 1.0 + Math.cos(a) * 0.5], rot: [a, 0, 0], faceColor: (cx, cy, cz, out) => out.set(Math.floor((cx + mw / 2) / (mw / 8)) % 2 ? accent : TRIM) }));
  for (let k = 0; k < 8; k++) P.push(part(new THREE.BoxGeometry(mw / 8 - 0.02, 0.16, 0.03), { pos: [-mw / 2 + (k + 0.5) * (mw / 8), 2.32 - Math.sin(a) * 1.0 - 0.06, 1.0 + Math.cos(a) * 1.0], color: k % 2 ? accent : TRIM }));
  // Schild auf dem Dach + Ausleger-Laterne
  P.push(part(new THREE.BoxGeometry(1.5, 0.5, 0.08), { pos: [-0.5, 2.92, 1.0], color: TRIM }));
  P.push(part(new THREE.BoxGeometry(1.4, 0.4, 0.02), { pos: [-0.5, 2.92, 1.05], color: accent }));
  P.push(part(new THREE.IcosahedronGeometry(0.11, 1), { pos: [-0.5, 2.92, 1.08], color: GOLD, smooth: true }));
  P.push(part(new THREE.BoxGeometry(0.05, 0.05, 0.5), { pos: [1.1, 2.6, 1.5], color: METALL }));
  P.push(part(new THREE.ConeGeometry(0.18, 0.13, 4, 1), { pos: [1.1, 2.5, 1.7], rot: [0, Math.PI / 4, 0], color: METALL }));
  P.push(part(new THREE.BoxGeometry(0.22, 0.02, 0.22), { pos: [1.1, 2.43, 1.7], color: METALL_H }));
  G.push(part(new THREE.BoxGeometry(0.18, 0.26, 0.18), { pos: [1.1, 2.29, 1.7], color: '#ffe08a' }));
  // Waren auf der Theke: Becher, Krug, Schale mit Obst, Flaschen im Regal
  for (let k = 0; k < 3; k++) P.push(part(new THREE.CylinderGeometry(0.06, 0.05, 0.13, 7, 1), { pos: [-1.0 + k * 0.17, 1.38, 0.95], color: ['#FFF3D6', '#2FB8A8', '#FF7A59'][k] }));
  P.push(part(new THREE.CylinderGeometry(0.14, 0.11, 0.34, 8, 1), { pos: [-0.4, 1.48, 0.9], color: '#4F88C8' }));
  P.push(part(new THREE.CylinderGeometry(0.28, 0.2, 0.12, 9, 1), { pos: [0.5, 1.37, 0.92], color: HOLZ }));
  for (let k = 0; k < 6; k++) P.push(part(new THREE.IcosahedronGeometry(0.075, 0), { pos: [0.5 + Math.cos(k * 1.05) * 0.14, 1.47 + (k % 2) * 0.05, 0.92 + Math.sin(k * 1.05) * 0.12], color: ['#FF7A59', '#FFD23F', '#45d15a', '#FF5D8F'][k % 4] }));
  P.push(part(new THREE.BoxGeometry(2.3, 0.06, 0.3), { pos: [0, 1.9, -0.75], color: HOLZ }));
  for (let k = 0; k < 6; k++) P.push(part(new THREE.CylinderGeometry(0.06, 0.06, 0.32, 6, 1), { pos: [-1.0 + k * 0.4, 2.08, -0.75], color: ['#2de2c9', '#ffd23f', '#ff5d8f', '#4d8cff', '#ff8c42', '#b48cff'][k] }));
  g.add(mesh(merge(P), M.base));
  const gl = mesh(merge(G), M.glow('#ffe08a', { intensity: 0.9 })); gl.castShadow = false; g.add(gl);
  return {
    group: g, type: 'kiosk', far: 220,
    lampWorld(out = new THREE.Vector3()) { g.updateMatrixWorld(true); return g.localToWorld(out.set(1.1, 2.29, 1.7)); },
    collide(colliders, x, z, y, yaw = 0) { return colliders.addBox(x, z, 1.55, 1.25, yaw, { group: 'props', tag: 'kiosk' }); },
  };
}

// ---- Wimpelkette: Schnur zwischen zwei Weltpunkten (durchhängend), Dreiecksflaggen in Regionsfarben ----
//   o.from/o.to [x, y, z] (Weltkoordinaten – Gruppe bei 0/0/0 setzen: x:0, z:0, y:0, onGround:false), o.colors, o.sag
export function wimpelkette(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const A = new THREE.Vector3(...(o.from || [0, 3, 0])), Bp = new THREE.Vector3(...(o.to || [6, 3, 0]));
  const colors = o.colors || ['#FF7A59', '#FFD166', '#2FB8A8', '#FFF3D6', '#4F88C8', '#FF5D8F'];
  const len = A.distanceTo(Bp);
  const sag = o.sag !== undefined ? o.sag : Math.min(1.4, 0.06 * len + 0.25);
  const n = Math.max(4, Math.round(len / 0.72));
  const pts = [];
  for (let i = 0; i <= n; i++) { const t = i / n; pts.push(new THREE.Vector3().lerpVectors(A, Bp, t).add(new THREE.Vector3(0, -sag * 4 * t * (1 - t), 0))); }
  const dir = new THREE.Vector3().subVectors(Bp, A); dir.y = 0; dir.normalize();
  const side = new THREE.Vector3(-dir.z, 0, dir.x);
  // Schnur als Kreuz-Band (von allen Seiten sichtbar)
  const pos = [], cols = [];
  const cord = col('#F4E9D3');
  const push = (p) => { pos.push(p.x, p.y, p.z); cols.push(cord.r, cord.g, cord.b); };
  const w = 0.014;
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[i + 1];
    const q = [a.clone().addScaledVector(side, w), a.clone().addScaledVector(side, -w), b.clone().addScaledVector(side, -w), b.clone().addScaledVector(side, w)];
    push(q[0]); push(q[1]); push(q[2]); push(q[0]); push(q[2]); push(q[3]);
    const u = [a.clone().add(new THREE.Vector3(0, w, 0)), a.clone().add(new THREE.Vector3(0, -w, 0)), b.clone().add(new THREE.Vector3(0, -w, 0)), b.clone().add(new THREE.Vector3(0, w, 0))];
    push(u[0]); push(u[1]); push(u[2]); push(u[0]); push(u[2]); push(u[3]);
  }
  // Flaggen: gleichschenklige Dreiecke unter der Schnur, jede leicht gedreht
  let fi = Math.floor(R.float(0, colors.length));
  for (let i = 1; i < n; i++) {
    const p = pts[i], c = col(colors[fi++ % colors.length]);
    const tilt = (qhash(i, 3, 1, 7) - 0.5) * 0.12;
    const s2 = side.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), tilt);
    const a = p.clone().addScaledVector(s2, 0.14), b = p.clone().addScaledVector(s2, -0.14), t = p.clone().add(new THREE.Vector3(s2.x * 0.03, -0.36, s2.z * 0.03));
    for (const v of [a, b, t]) { pos.push(v.x, v.y, v.z); cols.push(c.r, c.g, c.b); }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.computeVertexNormals();
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  geo.setAttribute('aWind', new THREE.BufferAttribute(new Float32Array(pos.length / 3), 1));
  geo.computeBoundingSphere();
  const m = mesh(geo, M.baseDouble);
  m.castShadow = false;
  g.add(m);
  const mid = pts[Math.floor(n / 2)];
  return { group: g, type: 'wimpelkette', center: { x: mid.x, z: mid.z }, radius: len / 2, far: 160 };
}

// ---- Kisten (1–3 gestapelt), Fass, Boje, Netz, Ruderboot, Bank, Blumenkübel, Brunnen, Pflaster ----
function kisteGeo(size, seed, tint = HOLZ) {
  const P = [];
  const h = size * 0.86;
  P.push(part(new THREE.BoxGeometry(size, h, size, 1, 1, 1), {
    pos: [0, h / 2, 0],
    faceColor: (cx, cy, cz, out, f) => out.copy(varied(tint, cy > h * 0.95 ? Math.floor((cx + size / 2) / (size / 4)) : Math.floor(cy / (h / 4)), seed + f % 2, 0.06)),
  }));
  for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) P.push(part(new THREE.BoxGeometry(0.07, h + 0.02, 0.07), { pos: [sx * (size / 2 - 0.02), h / 2, sz * (size / 2 - 0.02)], color: HOLZ_D }));
  for (const s of [-1, 1]) { P.push(part(new THREE.BoxGeometry(size + 0.02, 0.07, 0.07), { pos: [0, h - 0.03, s * (size / 2 - 0.02)], color: HOLZ_D })); P.push(part(new THREE.BoxGeometry(0.07, 0.07, size + 0.02), { pos: [s * (size / 2 - 0.02), h - 0.03, 0], color: HOLZ_D })); }
  return P;
}
export function kisten(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const n = Math.max(1, Math.min(3, o.n || 2));
  const seed = Math.floor(R.float(0, 1000));
  const P = [];
  const s0 = o.size || 0.74;
  P.push(...kisteGeo(s0, seed).map((p) => p));
  if (n >= 2) { const p2 = kisteGeo(s0 * 0.9, seed + 4, '#A8794A'); const m4 = new THREE.Matrix4().makeRotationY(0.35).setPosition(s0 * 0.95, 0, s0 * 0.15); p2.forEach((q) => q.applyMatrix4(m4)); P.push(...p2); }
  if (n >= 3) { const p3 = kisteGeo(s0 * 0.8, seed + 8); const m4 = new THREE.Matrix4().makeRotationY(-0.2).setPosition(s0 * 0.2, s0 * 0.86, -s0 * 0.05); p3.forEach((q) => q.applyMatrix4(m4)); P.push(...p3); }
  g.add(mesh(merge(P), M.base));
  return { group: g, type: 'kisten', far: 120, collide(colliders, x, z) { return colliders.addCircle(x, z, 0.5 + n * 0.2, { group: 'props', tag: 'kisten' }); } };
}
export function fass(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const seed = Math.floor(R.float(0, 1000));
  const H = 0.88, r = 0.33;
  const P = [];
  P.push(part(new THREE.CylinderGeometry(r, r, H, 12, 3), {
    pos: [0, H / 2, 0],
    deform: (v) => { const t = (v.y + H / 2) / H; const k = 1 + 0.1 * Math.sin(Math.PI * t); v.x *= k; v.z *= k; },
    faceColor: (cx, cy, cz, out, f) => { const sec = Math.floor(((Math.atan2(cz, cx) + Math.PI) / TAU) * 12); out.copy(varied(o.color || HOLZ, sec, seed, 0.02)).multiplyScalar(sec % 2 ? 0.92 : 1.0); if (cy > H - 0.02) out.copy(col(HOLZ_D)); },
  }));
  for (const y of [0.18, 0.7]) P.push(part(new THREE.CylinderGeometry(r * 1.09 + (y > 0.4 ? 0.02 : 0.02), r * 1.09 + 0.02, 0.06, 12, 1, true), { pos: [0, y, 0], color: METALL }));
  g.add(mesh(merge(P), M.base));
  if (o.lying) { g.children[0].rotation.z = Math.PI / 2; g.children[0].position.y = r * 1.1; }
  return { group: g, type: 'fass', far: 120, collide(colliders, x, z) { return colliders.addCircle(x, z, 0.42, { group: 'props', tag: 'fass' }); } };
}
export function boje(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const c1 = o.color || '#E8453C', c2 = o.color2 || '#FFF3D6';
  const P = [];
  P.push(part(new THREE.SphereGeometry(0.34, 12, 9), { pos: [0, 0.34, 0], smooth: true, faceColor: (cx, cy, cz, out) => out.set(cy > 0.42 ? c1 : cy > 0.26 ? c2 : c1) }));
  P.push(part(new THREE.CylinderGeometry(0.04, 0.05, 0.5, 5, 1), { pos: [0, 0.85, 0], color: METALL }));
  P.push(part(new THREE.IcosahedronGeometry(0.08, 1), { pos: [0, 1.12, 0], color: c2, smooth: true }));
  P.push(part(new THREE.TorusGeometry(0.1, 0.03, 4, 10), { pos: [0, 0.02, 0], rot: [Math.PI / 2, 0, 0], color: METALL }));
  const m = mesh(merge(P), M.base, !!o.floating);
  g.add(m);
  if (o.lying) { m.rotation.z = 0.9; m.rotation.x = 0.25; m.position.y = -0.05; }
  const ph = R.float(0, 6);
  return {
    group: g, type: 'boje', far: 120,
    update(dt, t) { if (o.floating) { g.position.y = (g.userData.baseY || 0) + Math.sin(t * 1.3 + ph) * 0.09; g.rotation.z = Math.sin(t * 0.9 + ph) * 0.12; g.rotation.x = Math.cos(t * 0.7 + ph) * 0.1; } },
  };
}
export function netz(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const seed = Math.floor(R.float(0, 100));
  const P = [];
  P.push(part(new THREE.IcosahedronGeometry(0.7, 1), { pos: [0, 0.16, 0], scale: [1.5, 0.32, 1.15], jitter: 0.16, seed: 700 + seed, faceVar: 0.14, color: '#B9A87A' }));
  P.push(part(new THREE.IcosahedronGeometry(0.4, 1), { pos: [0.5, 0.28, -0.2], scale: [1.2, 0.4, 1.0], jitter: 0.1, seed: 720 + seed, faceVar: 0.14, color: '#A89868' }));
  for (let k = 0; k < 4; k++) P.push(part(new THREE.SphereGeometry(0.09, 7, 5), { pos: [-0.5 + k * 0.36, 0.3 + (k % 2) * 0.06, 0.25 - (k % 2) * 0.4], smooth: true, color: k % 2 ? '#FF7A59' : '#FFF3D6' }));
  g.add(mesh(merge(P), M.base));
  return { group: g, type: 'netz', far: 100 };
}
export function ruderboot(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const c1 = o.color || '#2FB8A8', c2 = o.color2 || '#FFF3D6';
  const P = [];
  const L = 3.6;
  P.push(part(new THREE.CylinderGeometry(0.66, 0.4, L, 9, 4, false), {
    rot: [Math.PI / 2, 0, 0], scale: [1, 1, 0.5], smooth: true,
    deform: (v) => { const t = (v.y + L / 2) / L; if (t > 0.62) { const k = 1 - ((t - 0.62) / 0.38) * 0.9; v.x *= k; v.z = v.z * (0.5 + 0.5 * k); } if (t < 0.15) { const k = 0.75 + (t / 0.15) * 0.25; v.x *= k; } },
    color: (x, y, z, out) => out.set(y > 0.12 ? c2 : y > -0.02 ? c1 : '#2d4a7a'),
  }));
  P.push(part(new THREE.BoxGeometry(1.36, 0.06, L * 0.62), { pos: [0, 0.34, 0.1], rot: [0, 0, 0], color: HOLZ, deform: (v) => { const t = (v.z + L * 0.31) / (L * 0.62); v.x *= 0.4 + 0.6 * Math.sin(Math.PI * Math.min(1, t * 0.85 + 0.15)); } }));
  for (const z of [-0.7, 0.5]) P.push(part(new THREE.BoxGeometry(1.1, 0.07, 0.24), { pos: [0, 0.2, z], color: HOLZ_D }));
  for (const s of [-1, 1]) {
    P.push(part(new THREE.CylinderGeometry(0.025, 0.025, 2.3, 4, 1), { pos: [s * 0.55, 0.36, -0.1], rot: [0, 0, s * 1.2], color: HOLZ }));
    P.push(part(new THREE.BoxGeometry(0.11, 0.02, 0.4), { pos: [s * 1.55, 0.02, -0.1], rot: [0, 0, s * 1.2], color: HOLZ }));
  }
  const m = mesh(merge(P), M.base, true);
  g.add(m);
  const ph = R.float(0, 6);
  return {
    group: g, type: 'ruderboot', far: 220,
    update(dt, t) { g.position.y = (g.userData.baseY || 0) + Math.sin(t * 1.1 + ph) * 0.08; g.rotation.z = Math.sin(t * 0.9 + ph) * 0.03; g.rotation.x = Math.sin(t * 0.7 + ph) * 0.02; },
    collide(colliders, x, z, y, yaw = 0) { return colliders.addBox(x, z, 0.8, 1.9, yaw, { group: 'props', tag: 'boot' }); },
  };
}
export function bank(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const seed = Math.floor(R.float(0, 1000));
  const P = [];
  for (const s of [-1, 1]) {
    P.push(part(new THREE.BoxGeometry(0.1, 0.44, 0.48), { pos: [s * 0.72, 0.22, 0], color: HOLZ_D }));
    P.push(part(new THREE.BoxGeometry(0.08, 0.5, 0.06), { pos: [s * 0.72, 0.7, -0.2], rot: [-0.18, 0, 0], color: HOLZ_D }));
  }
  for (let k = 0; k < 3; k++) P.push(part(new THREE.BoxGeometry(1.7, 0.055, 0.14), { pos: [0, 0.47, -0.16 + k * 0.16], color: varied(HOLZ, k, seed, 0.06) }));
  for (let k = 0; k < 2; k++) P.push(part(new THREE.BoxGeometry(1.7, 0.11, 0.045), { pos: [0, 0.68 + k * 0.17, -0.24 - k * 0.03], rot: [-0.18, 0, 0], color: varied(HOLZ, k + 5, seed, 0.06) }));
  g.add(mesh(merge(P), M.base));
  return { group: g, type: 'bank', far: 110, collide(colliders, x, z, y, yaw = 0) { return colliders.addBox(x, z, 0.85, 0.3, yaw, { group: 'props', tag: 'bank' }); } };
}
export function blumenkuebel(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const seed = Math.floor(R.float(0, 1000));
  const P = [];
  P.push(part(new THREE.CylinderGeometry(0.3, 0.25, 0.44, 10, 1), { pos: [0, 0.22, 0], faceColor: (cx, cy, cz, out) => out.copy(col(HOLZ_D).multiplyScalar(Math.floor(((Math.atan2(cz, cx) + Math.PI) / TAU) * 10) % 2 ? 0.9 : 1)) }));
  P.push(part(new THREE.CylinderGeometry(0.32, 0.32, 0.05, 10, 1, true), { pos: [0, 0.36, 0], color: METALL }));
  P.push(part(new THREE.CylinderGeometry(0.27, 0.27, 0.04, 10, 1), { pos: [0, 0.44, 0], color: '#4a3a2a' }));
  for (let k = 0; k < 3; k++) P.push(part(new THREE.IcosahedronGeometry(0.16, 0), { pos: [Math.cos(k * 2.1) * 0.12, 0.55, Math.sin(k * 2.1) * 0.12], scale: [1, 0.75, 1], color: '#5F9E3C' }));
  for (let k = 0; k < 6; k++) P.push(part(new THREE.IcosahedronGeometry(0.075 + (k % 2) * 0.02, 0), { pos: [Math.cos(k * 1.05 + seed) * 0.17, 0.66 + (k % 3) * 0.05, Math.sin(k * 1.05 + seed) * 0.17], color: BLUMEN[(k + seed) % BLUMEN.length] }));
  g.add(mesh(merge(P), M.base));
  return { group: g, type: 'blumenkuebel', far: 90, collide(colliders, x, z) { return colliders.addCircle(x, z, 0.36, { group: 'props', tag: 'kuebel' }); } };
}
// Brunnen: Steinring, zwei Pfosten, kleines Ziegeldach, Winde mit Eimer
export function brunnen(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const seed = Math.floor(R.float(0, 1000));
  const P = [];
  P.push(part(new THREE.CylinderGeometry(1.0, 1.05, 0.95, 12, 2, true), { pos: [0, 0.47, 0], faceColor: (cx, cy, cz, out, f) => out.copy(varied(SOCKEL, Math.floor(cy / 0.32) * 12 + Math.floor(((Math.atan2(cz, cx) + Math.PI) / TAU) * 12), seed, 0.07)) }));
  P.push(part(new THREE.CylinderGeometry(1.08, 1.08, 0.12, 12, 1), { pos: [0, 1.0, 0], color: '#8d7868' }));
  P.push(part(new THREE.CircleGeometry(0.86, 12), { pos: [0, 0.55, 0], rot: [-Math.PI / 2, 0, 0], color: '#1a6a78' }));
  for (const s of [-1, 1]) P.push(part(new THREE.BoxGeometry(0.14, 1.8, 0.14), { pos: [s * 0.8, 1.9, 0], color: HOLZ_D }));
  P.push(part(new THREE.CylinderGeometry(0.06, 0.06, 1.7, 6, 1), { pos: [0, 2.2, 0], rot: [0, 0, Math.PI / 2], color: HOLZ }));
  P.push(part(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 6, 1), { pos: [0, 2.2, 0], rot: [0, 0, Math.PI / 2], color: HOLZ_D }));
  P.push(part(new THREE.BoxGeometry(0.05, 0.05, 0.3), { pos: [0.95, 2.2, 0.15], color: METALL }));
  P.push(part(new THREE.CylinderGeometry(0.02, 0.02, 0.7, 4, 1), { pos: [0, 1.85, 0], color: '#F4E9D3' }));
  P.push(part(new THREE.CylinderGeometry(0.18, 0.15, 0.26, 8, 1, true), { pos: [0, 1.4, 0], color: METALL }));
  for (const s of [-1, 1]) {
    P.push(part(new THREE.BoxGeometry(1.4 / Math.cos(ROOF_A), 0.14, 1.9, 4, 1, 1), {
      pos: [s * 0.62, 3.2 - 0.62 * Math.tan(ROOF_A) * 0.5, 0], rot: [0, 0, -s * ROOF_A],
      faceColor: (cx, cy, cz, out, f) => out.copy(varied(ZIEGEL[Math.floor((3.3 - cy) / 0.25) % 3], f, seed + 4, 0.03)),
    }));
  }
  P.push(part(new THREE.BoxGeometry(0.3, 0.12, 2.0), { pos: [0, 3.32, 0], color: '#8F3A2A' }));
  g.add(mesh(merge(P), M.base));
  return { group: g, type: 'brunnen', far: 200, collide(colliders, x, z) { return colliders.addCircle(x, z, 1.2, { group: 'props', tag: 'brunnen' }); } };
}
// Fels: kantiger Block in drei Tönen (Kraterrand-Felsen, Klippen); o.size, o.color (Basalt-Grundton)
export function fels(o = {}, K) {
  const { M, R } = K;
  const g = new THREE.Group();
  const sz = o.size || 1.4, seed = 800 + Math.floor(R.float(0, 200));
  const base = col(o.color || '#4B3F3D'), light = base.clone().multiplyScalar(1.35), dark = base.clone().multiplyScalar(0.72);
  const P = [];
  P.push(part(new THREE.DodecahedronGeometry(sz * 0.6, 0), { pos: [0, sz * 0.32, 0], scale: [1.25, 0.8, 1.05], jitter: sz * 0.22, seed, faceColor: (cx, cy, cz, out, f) => out.copy(cy > sz * 0.42 ? light : cy < sz * 0.18 ? dark : base).multiplyScalar(0.96 + qhash(f, seed, 1, 2) * 0.08) }));
  P.push(part(new THREE.DodecahedronGeometry(sz * 0.36, 0), { pos: [sz * 0.5, sz * 0.2, sz * 0.25], scale: [1.1, 0.75, 1], jitter: sz * 0.12, seed: seed + 3, faceColor: (cx, cy, cz, out, f) => out.copy(cy > sz * 0.28 ? light : base).multiplyScalar(0.96 + qhash(f, seed + 5, 1, 2) * 0.08) }));
  g.add(mesh(merge(P), M.base));
  return { group: g, type: 'fels', far: 200, collide(colliders, x, z) { return colliders.addCircle(x, z, sz * 0.7, { group: 'props', tag: 'fels' }); } };
}
// Pflaster: Kopfsteinscheibe/-ring auf dem Gelände (Weltkoordinaten o.cx/o.cz, Gruppe bei 0/0/0 mit onGround:false),
// Ecken folgen der Insel; o.r Außenradius, o.r0 Innenradius (Ring um ein Feuer), o.color Grundton
export function pflaster(o = {}, K) {
  const { M, R, island } = K;
  const g = new THREE.Group();
  const cx = o.cx || 0, cz = o.cz || 0, r = o.r || 4, r0 = o.r0 || 0;
  const seed = Math.floor(R.float(0, 1000));
  const N = Math.max(12, Math.round(r * 7));
  const rings = Math.max(2, Math.round((r - r0) / 0.9) + 1);
  const hAt = (x, z) => (island ? island.getHeight(x, z) : 0) + 0.07;
  const pos = [];
  const ring = (k) => r0 + (r - r0) * (k / (rings - 1));
  const push = (x, z) => pos.push(x, hAt(x, z), z);
  for (let k = 0; k < rings - 1; k++) {
    const ra = ring(k), rb = ring(k + 1);
    for (let i = 0; i < N; i++) {
      const a0 = (i / N) * TAU, a1 = ((i + 1) / N) * TAU;
      const p = (rr, a) => [cx + Math.cos(a) * rr, cz + Math.sin(a) * rr];
      const A = p(ra, a0), Bq = p(rb, a0), C = p(rb, a1), Dq = p(ra, a1);
      if (ra < 0.01) { push(...A); push(...C); push(...Bq); }
      else { push(...A); push(...C); push(...Bq); push(...A); push(...Dq); push(...C); }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  // Flächenfarbe je 1,4-m-Zelle (nicht je Dreieck – sonst lesen sich die dünnen Fächer-Dreiecke als Speichen), ±3 %,
  // dazu ein schmaler, etwas dunklerer Randstein
  const base = o.color || '#C9B08C';
  const kerb = col(base).multiplyScalar(0.9);
  const gp = part(geo, {
    faceColor: (x, y, z, out) => {
      const d = Math.hypot(x - cx, z - cz);
      const h = qhash(Math.floor(x / 1.4), Math.floor(z / 1.4), seed, 9);
      out.copy(d > r - 0.35 || (r0 && d < r0 + 0.35) ? kerb : col(base).multiplyScalar(0.97 + h * 0.06));
    },
  });
  // Normalen nach oben (ein Belag, keine Facetten in der Rampe), wirft keinen Schatten
  const nrm = gp.attributes.normal.array;
  for (let i = 0; i < nrm.length; i += 3) { nrm[i] = 0; nrm[i + 1] = 1; nrm[i + 2] = 0; }
  const m = mesh(gp, M.base);
  m.castShadow = false;
  g.add(m);
  return { group: g, type: 'pflaster', center: { x: cx, z: cz }, radius: r, far: 180 };
}

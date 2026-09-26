// Die Insel: deterministische Höhenkarte mit gestalteten Zonen, Wegen und Orten.
// Koordinaten: x = Osten, z = Süden (Norden = -z). Meeresspiegel y = 0. Inselradius ~170.
import { createNoise2D, fbm, ridged, smoothstep, clamp, lerp } from './noise.js';

export const SEA_LEVEL = 0;
export const ISLAND_RADIUS = 170;
export const WORLD_HALF = 240;          // Terrain-Raster deckt [-240, 240] ab
export const WORLD_LIMIT = 205;          // weiche Grenze im Meer
export const DEEP_WATER = -1.5;          // tiefer als das: nicht begehbar
export const SLOPE_LIMIT = 0.62;         // normal.y minimal (≈ 52°)

// Zonen (Mittelpunkt, Radius, deutscher Name). spawn = sicherer Startpunkt für Teleport.
export const ZONES = [
  { id: 'hafen', name: 'Hafen-Dorf', x: 6, z: 110, r: 42, spawn: { x: 6, z: 118 }, color: '#ffb347' },
  { id: 'strand', name: 'Palmenstrand', x: 136, z: 28, r: 40, spawn: { x: 132, z: 30 }, color: '#2de2c9' },
  { id: 'dschungel', name: 'Dschungel', x: 82, z: -82, r: 44, spawn: { x: 84, z: -80 }, color: '#4cd964' },
  { id: 'klippen', name: 'Sturmklippen', x: -96, z: -96, r: 46, spawn: { x: -100, z: -90 }, color: '#8fa3ff' },
  { id: 'markt', name: 'Markt-Hügel', x: -118, z: 14, r: 36, spawn: { x: -116, z: 16 }, color: '#ffd166' },
  { id: 'vulkan', name: 'Vulkan', x: 0, z: -42, r: 50, spawn: { x: 12, z: 30 }, color: '#ff6b3d' },
  { id: 'leuchtturm', name: 'Leuchtturm', x: -120, z: 122, r: 30, spawn: { x: -110, z: 122 }, color: '#fff3a0' },
];
export const ZONE_INDEX = Object.fromEntries(ZONES.map((z, i) => [z.id, i]));

// Besondere Punkte (für Figuren, Requisiten, Quests). r > 0 = ebene Fläche im Gelände.
export const SITES = {
  steg: { x: 6, z: 138, r: 0, zone: 'hafen' },                 // Anlegesteg (siehe landmarks.js)
  dorfplatz: { x: 4, z: 110, r: 11, zone: 'hafen' },
  kapitaenin: { x: 12, z: 126, r: 3, zone: 'hafen' },
  snackStand: { x: -16, z: 118, r: 5, zone: 'hafen' },
  questBrett: { x: 20, z: 108, r: 3, zone: 'hafen' },
  baumhaus: { x: -30, z: 98, r: 6, zone: 'hafen' },
  haus1: { x: 30, z: 100, r: 6, zone: 'hafen' },
  haus2: { x: -18, z: 96, r: 6, zone: 'hafen' },
  haus3: { x: 34, z: 120, r: 5, zone: 'hafen' },
  surfspot: { x: 172, z: 32, r: 0, zone: 'strand' },            // im Wasser
  strandHuette: { x: 128, z: 38, r: 6, zone: 'strand' },
  wasserfall: { x: 91, z: -98, r: 0, zone: 'dschungel' },
  lichtung: { x: 70, z: -70, r: 8, zone: 'dschungel' },
  klippenGipfel: { x: -116, z: -116, r: 6, zone: 'klippen' },
  klippenTor: { x: -98, z: -70, r: 5, zone: 'klippen' },
  marktplatz: { x: -118, z: 14, r: 12, zone: 'markt' },
  kraterRand: { x: -12, z: -29, r: 0, zone: 'vulkan' },
  vulkanFuss: { x: 14, z: 36, r: 5, zone: 'vulkan' },
  leuchtturm: { x: -122, z: 124, r: 0, zone: 'leuchtturm' },
};

// Wege (Polylinien, werden eingeebnet und als Pfad gefärbt)
export const PATHS = [
  { id: 'hafen-strand', pts: [[6, 118], [30, 112], [62, 98], [92, 74], [116, 50], [130, 32]] },
  { id: 'hafen-leuchtturm', pts: [[4, 118], [-20, 121], [-50, 124], [-80, 126], [-102, 124], [-114, 123]] },
  { id: 'hafen-markt', pts: [[-4, 106], [-30, 92], [-58, 74], [-84, 52], [-102, 32], [-112, 20]] },
  { id: 'markt-klippen', pts: [[-118, 4], [-116, -18], [-108, -42], [-100, -66], [-100, -88], [-110, -108]] },
  { id: 'strand-dschungel', pts: [[132, 24], [130, -2], [120, -30], [104, -58], [88, -78]] },
  { id: 'hafen-vulkan', pts: [[6, 104], [8, 82], [11, 58], [14, 36]] },
  { id: 'dschungel-vulkan', pts: [[80, -78], [60, -66], [44, -58]] },
  { id: 'steg', pts: [[6, 118], [6, 132]] },
];
// Serpentine auf den Vulkan (wird zusätzlich als Weg angelegt)
const VOLCANO = { x: 0, z: -42, rim: 14, top: 52, base: 86 };
function spiralPoints() {
  const pts = [];
  const a0 = Math.atan2(36 - VOLCANO.z, 14 - VOLCANO.x);
  const d0 = Math.hypot(14 - VOLCANO.x, 36 - VOLCANO.z);
  const turns = -1.35 * Math.PI;
  for (let i = 0; i <= 60; i++) {
    const s = i / 60;
    const a = a0 + turns * s;
    const d = lerp(d0, VOLCANO.rim + 1.5, Math.pow(s, 0.9));
    pts.push([VOLCANO.x + Math.cos(a) * d, VOLCANO.z + Math.sin(a) * d]);
  }
  return pts;
}
PATHS.push({ id: 'vulkan-serpentine', pts: spiralPoints() });
{
  // Ende der Serpentine = Kraterrand
  const sp = PATHS[PATHS.length - 1].pts;
  const e = sp[sp.length - 1];
  SITES.kraterRand.x = Math.round(e[0] * 10) / 10;
  SITES.kraterRand.z = Math.round(e[1] * 10) / 10;
}

// Gelände-Features, die andere Module brauchen
const RIDGE = { x: 86, z: -112, a: 40, b: 17, rot: -0.35, h: 22 };
const _rc = Math.cos(RIDGE.rot), _rs = Math.sin(RIDGE.rot);
const FALL_V = RIDGE.b * 0.83;
const FALL = { x: RIDGE.x - _rs * FALL_V, z: RIDGE.z + _rc * FALL_V };
const POOL = { x: FALL.x - _rs * 8.5, z: FALL.z + _rc * 8.5, r: 9, level: 5.2 };
export const FEATURES = {
  volcano: { x: VOLCANO.x, z: VOLCANO.z, rimRadius: VOLCANO.rim, top: VOLCANO.top, lavaLevel: 41.6, lavaRadius: 7.5 },
  waterfall: {
    top: { x: FALL.x + _rs * 1.2, z: FALL.z - _rc * 1.2 },
    bottom: { x: FALL.x - _rs * 3, z: FALL.z + _rc * 3 },
    dir: { x: -_rs, z: _rc }, // Fallrichtung (Süden-ish)
    width: 6,
  },
  pool: POOL,
  lighthouse: { x: -122, z: 124, y: 0 },
  dock: { x: 6, z0: 128, z1: 152, width: 3.6, deck: 1.45 },
  harbour: { x: 6, z: 112 },
};

const smax = (a, b, k) => {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.max(a, b) + h * h * k * 0.25;
};
const gauss = (d, w) => Math.exp(-(d / w) * (d / w));
const smin = (a, b, k) => -smax(-a, -b, k);
const angDiff = (a, b) => { let d = a - b; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; };
function segDist(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az;
  const l2 = dx * dx + dz * dz || 1;
  const t = clamp(((px - ax) * dx + (pz - az) * dz) / l2, 0, 1);
  const qx = ax + dx * t, qz = az + dz * t;
  return { d: Math.hypot(px - qx, pz - qz), t };
}

let current = null;

// Erzeugt die Insel. cell = Rasterweite (Qualität). Gibt das Insel-Objekt zurück.
export function createIsland({ cell = 2.5, seed = 7 } = {}) {
  const nCoast = createNoise2D(seed * 11 + 1);
  const nHill = createNoise2D(seed * 11 + 2);
  const nDet = createNoise2D(seed * 11 + 3);
  const nRock = createNoise2D(seed * 11 + 4);
  const nZone = createNoise2D(seed * 11 + 5);

  const BAY = Math.atan2(134, 6);
  const PEN = Math.atan2(FEATURES.lighthouse.z, FEATURES.lighthouse.x);
  const EAST = Math.atan2(28, 150);
  const NW = Math.atan2(-100, -100);

  // Küstenradius nach Winkel
  function coastRadius(th) {
    const c = Math.cos(th), s = Math.sin(th);
    let R = 150 + fbm(nCoast, c * 1.6 + 7, s * 1.6 + 7, 4) * 13 + nCoast(c * 6 + 3, s * 6 - 2) * 2.5;
    const dp = angDiff(th, PEN);
    R += 42 * gauss(dp, 0.105);
    const db = angDiff(th, BAY);
    R -= 20 * gauss(db, 0.15);
    R += 9 * gauss(db - 0.33, 0.09) + 7 * gauss(db + 0.33, 0.09);
    R += 10 * gauss(angDiff(th, EAST), 0.35);
    R += 8 * gauss(angDiff(th, NW), 0.4);
    return R;
  }
  // Strandbreite nach Winkel
  function beachWidth(th) {
    let bw = 9;
    bw += 18 * gauss(angDiff(th, EAST), 0.32);
    bw -= 7 * gauss(angDiff(th, NW), 0.45);
    bw -= 5 * gauss(angDiff(th, BAY), 0.12);
    bw += 4 * gauss(angDiff(th, PEN), 0.2);
    return Math.max(1.5, bw);
  }

  function coastDist(x, z) {
    const r = Math.hypot(x, z);
    return coastRadius(Math.atan2(z, x)) - r;
  }

  // Grundhöhe ohne Pads/Wege
  function heightBase(x, z) {
    const r = Math.hypot(x, z);
    const th = Math.atan2(z, x);
    const D = coastRadius(th) - r;
    const bw = beachWidth(th);
    let h;
    if (D < 0) {
      const shelf = 0.075 + 0.05 * (1 - gauss(angDiff(th, EAST), 0.4));
      h = 0.3 + D * shelf;
      if (D < -16) h -= (-D - 16) * 0.45;
      h = Math.max(h, -22);
    } else {
      h = 0.3 + 2.1 * smoothstep(0, bw, D);
      const hills = Math.pow(fbm(nHill, x / 95 + 3, z / 95 - 1, 4) * 0.5 + 0.55, 1.4);
      h += hills * 13 * smoothstep(bw * 0.7, bw + 38, D);
    }
    const cf = smoothstep(-2.5, 6, D); // Klippenfaktor an der Küste

    // Vulkan
    {
      const dx = x - VOLCANO.x, dz = z - VOLCANO.z;
      const d = Math.hypot(dx, dz);
      if (d < VOLCANO.base + 10) {
        let hv;
        if (d < VOLCANO.rim) hv = 40 + (VOLCANO.top - 1.5 - 40) * Math.pow(d / VOLCANO.rim, 2.4);
        else {
          const t = clamp((d - VOLCANO.rim) / (VOLCANO.base - VOLCANO.rim), 0, 1);
          hv = (VOLCANO.top - 1.5) * Math.pow(1 - t, 1.55) + 1.5 * (1 - smoothstep(0, 3, d - VOLCANO.rim));
          const a = Math.atan2(dz, dx);
          hv *= 1 + 0.07 * Math.sin(a * 11 + fbm(nRock, dx / 30, dz / 30, 2) * 3) * smoothstep(VOLCANO.rim + 4, VOLCANO.rim + 20, d);
        }
        if (d < VOLCANO.rim) h = hv; else h = smax(h, hv, 5);
      }
    }
    // Markt-Hügel (flache Kuppe)
    {
      const d = Math.hypot(x - ZONES[4].x, z - ZONES[4].z);
      if (d < 60) h = smax(h, 2.2 + 17.5 * smoothstep(52, 13, d), 4);
    }
    // Sturmklippen: gekipptes Plateau, fällt nach NW senkrecht ins Meer
    {
      const cx = -96, cz = -96;
      const dx = x - cx, dz = z - cz;
      const dn = Math.hypot(dx, dz) + fbm(nRock, x / 40, z / 40, 3) * 10;
      const pm = smoothstep(68, 42, dn);
      if (pm > 0) {
        const u = clamp((dx * -0.7071 + dz * -0.7071) / 42, -1.2, 1.2);
        const hp = 21 + 11 * u + ridged(nRock, x / 22, z / 22, 3) * 7;
        h = smax(h, hp * pm * cf, 3);
      }
      // Felsnadeln im Meer
      const stacks = [[-150, -112, 5, 16], [-128, -146, 4, 12], [-160, -84, 3.5, 9], [-112, -158, 3, 8]];
      for (const s of stacks) {
        const d = Math.hypot(x - s[0], z - s[1]) + nRock(x / 3, z / 3) * 1.2;
        if (d < s[2] + 4) h = Math.max(h, lerp(h, s[3], smoothstep(s[2] + 3, s[2] - 1, d)));
      }
    }
    // Dschungel-Grat mit Wasserfall
    {
      const dx = x - RIDGE.x, dz = z - RIDGE.z;
      const u = dx * _rc + dz * _rs;
      const v = -dx * _rs + dz * _rc;
      const e = Math.hypot(u / RIDGE.a, v / RIDGE.b) + fbm(nRock, x / 25, z / 25, 2) * 0.08;
      const m = smoothstep(1.0, 0.74, e);
      if (m > 0) {
        let hr = RIDGE.h + ridged(nRock, x / 16, z / 16, 3) * 4 - Math.abs(u) * 0.08;
        // Rinne zum Wasserfall
        const ch = segDist(x, z, RIDGE.x, RIDGE.z, FALL.x, FALL.z);
        hr -= 2.6 * smoothstep(3.2, 1.2, ch.d);
        h = smax(h, hr * m * cf, 2.5);
      }
    }
    // Leuchtturm-Kuppe
    {
      const L = FEATURES.lighthouse;
      const d = Math.hypot(x - L.x, z - L.z);
      if (d < 26) h = smax(h, 2.4 + 9.5 * smoothstep(21, 5.5, d), 3);
    }
    // Hafen einebnen (nur an Land)
    {
      const H = FEATURES.harbour;
      const d = Math.hypot((x - H.x) * 0.9, z - H.z);
      const w = smoothstep(40, 24, d) * smoothstep(-1.5, 3, D);
      if (w > 0) {
        const target = 1.75 + Math.max(0, 128 - z) * 0.045;
        h = lerp(h, target, w * 0.92);
      }
    }
    // Dschungel-Becken um den Teich
    {
      const d = Math.hypot(x - POOL.x, z - POOL.z);
      const w = smoothstep(22, 12, d);
      if (w > 0) h = lerp(h, POOL.level + 0.9 + d * 0.06, w);
    }
    // Feine Unebenheiten
    if (D > 0) {
      const flat = 1 - 0.7 * smoothstep(40, 20, Math.hypot(x - FEATURES.harbour.x, z - FEATURES.harbour.z));
      h += fbm(nDet, x / 11, z / 11, 3) * 0.75 * smoothstep(0, 10, D) * flat;
    }
    return h;
  }

  // ---- Pads (ebene Flächen an Orten) ----
  const pads = Object.values(SITES).filter((s) => s.r > 0).map((s) => ({ ...s, h: heightBase(s.x, s.z) }));
  function applyPads(x, z, h) {
    for (let i = 0; i < pads.length; i++) {
      const p = pads[i];
      const d = Math.hypot(x - p.x, z - p.z);
      if (d < p.r + 5) h = lerp(h, p.h, smoothstep(p.r + 5, p.r, d));
    }
    return h;
  }

  // ---- Wege: Abtastpunkte mit geglätteter Höhe + räumliches Hash ----
  const pathSamples = []; // {x,z,h}
  const pathSegs = [];    // [i0, i1]
  for (const p of PATHS) {
    const start = pathSamples.length;
    const pts = [];
    for (let i = 0; i < p.pts.length - 1; i++) {
      const [ax, az] = p.pts[i], [bx, bz] = p.pts[i + 1];
      const L = Math.hypot(bx - ax, bz - az);
      const n = Math.max(1, Math.ceil(L / 2));
      for (let k = 0; k < n; k++) pts.push([lerp(ax, bx, k / n), lerp(az, bz, k / n)]);
    }
    pts.push(p.pts[p.pts.length - 1]);
    let hs = pts.map(([x, z]) => applyPads(x, z, heightBase(x, z)));
    for (let pass = 0; pass < 4; pass++) {
      hs = hs.map((_, i) => {
        let s = 0, c = 0;
        for (let k = -4; k <= 4; k++) { const j = i + k; if (j >= 0 && j < hs.length) { s += hs[j]; c++; } }
        return s / c;
      });
    }
    pts.forEach(([x, z], i) => pathSamples.push({ x, z, h: Math.max(hs[i], 0.45) }));
    for (let i = start; i < pathSamples.length - 1; i++) pathSegs.push([i, i + 1]);
  }
  const PH_CELL = 8;
  const pathHash = new Map();
  pathSegs.forEach((seg, si) => {
    const a = pathSamples[seg[0]], b = pathSamples[seg[1]];
    const x0 = Math.floor((Math.min(a.x, b.x) - 6) / PH_CELL), x1 = Math.floor((Math.max(a.x, b.x) + 6) / PH_CELL);
    const z0 = Math.floor((Math.min(a.z, b.z) - 6) / PH_CELL), z1 = Math.floor((Math.max(a.z, b.z) + 6) / PH_CELL);
    for (let i = x0; i <= x1; i++) for (let j = z0; j <= z1; j++) {
      const k = i * 1000 + j;
      if (!pathHash.has(k)) pathHash.set(k, []);
      pathHash.get(k).push(si);
    }
  });
  // Nächster Weg: {d, h}
  function pathQuery(x, z) {
    const list = pathHash.get(Math.floor(x / PH_CELL) * 1000 + Math.floor(z / PH_CELL));
    let best = 1e9, bh = 0;
    if (list) for (const si of list) {
      const seg = pathSegs[si];
      const a = pathSamples[seg[0]], b = pathSamples[seg[1]];
      const r = segDist(x, z, a.x, a.z, b.x, b.z);
      if (r.d < best) { best = r.d; bh = lerp(a.h, b.h, r.t); }
    }
    return { d: best, h: bh };
  }
  function pathWeight(x, z) {
    const q = pathQuery(x, z);
    return smoothstep(2.6, 1.1, q.d + nZone(x / 3, z / 3) * 0.5);
  }

  function heightRaw(x, z) {
    let h = applyPads(x, z, heightBase(x, z));
    const q = pathQuery(x, z);
    if (q.d < 4.5) h = lerp(h, q.h - 0.12, smoothstep(4.5, 1.6, q.d));
    // Teich-Mulde
    const dp = Math.hypot(x - POOL.x, z - POOL.z);
    if (dp < POOL.r + 3) h = smin(h, POOL.level - 2.0 + Math.pow(dp / POOL.r, 2) * 2.6, 1.2);
    return h;
  }

  // ---- Raster ----
  const half = WORLD_HALF;
  const n = Math.ceil((2 * half) / cell) + 1;
  const c = (2 * half) / (n - 1);
  const heights = new Float32Array(n * n);
  for (let j = 0; j < n; j++) {
    const z = -half + j * c;
    for (let i = 0; i < n; i++) {
      const x = -half + i * c;
      const r = Math.hypot(x, z);
      heights[j * n + i] = r > 232 ? -22 : heightRaw(x, z);
    }
  }
  const H = (i, j) => heights[clamp(j, 0, n - 1) * n + clamp(i, 0, n - 1)];
  const flipAt = (i, j) => (i + j) & 1;

  // Höhe exakt wie das gerenderte Dreieck
  function getHeight(x, z) {
    const fx = (x + half) / c, fz = (z + half) / c;
    let i = Math.floor(fx), j = Math.floor(fz);
    if (i < 0 || j < 0 || i >= n - 1 || j >= n - 1) return -22;
    const u = fx - i, v = fz - j;
    const ha = H(i, j), hb = H(i + 1, j), hc = H(i, j + 1), hd = H(i + 1, j + 1);
    if (flipAt(i, j) === 0) {
      if (u + v <= 1) return ha + (hb - ha) * u + (hc - ha) * v;
      return hd + (hc - hd) * (1 - u) + (hb - hd) * (1 - v);
    }
    if (u >= v) return ha + (hb - ha) * u + (hd - hb) * v;
    return ha + (hc - ha) * v + (hd - hc) * u;
  }
  // Normale: Flächennormale des Dreiecks (smooth=true: geglättet)
  function getNormal(x, z, smooth = false, out = { x: 0, y: 1, z: 0 }) {
    const e = smooth ? c * 1.2 : c * 0.02;
    let dx, dz;
    if (smooth) {
      dx = (getHeight(x + e, z) - getHeight(x - e, z)) / (2 * e);
      dz = (getHeight(x, z + e) - getHeight(x, z - e)) / (2 * e);
    } else {
      const fx = (x + half) / c, fz = (z + half) / c;
      const i = Math.floor(fx), j = Math.floor(fz);
      const u = fx - i, v = fz - j;
      const ha = H(i, j), hb = H(i + 1, j), hc = H(i, j + 1), hd = H(i + 1, j + 1);
      if (flipAt(i, j) === 0) {
        if (u + v <= 1) { dx = (hb - ha) / c; dz = (hc - ha) / c; } else { dx = (hd - hc) / c; dz = (hd - hb) / c; }
      } else if (u >= v) { dx = (hb - ha) / c; dz = (hd - hb) / c; } else { dx = (hd - hc) / c; dz = (hc - ha) / c; }
    }
    const l = Math.hypot(dx, 1, dz);
    out.x = -dx / l; out.y = 1 / l; out.z = -dz / l;
    return out;
  }
  const _n = { x: 0, y: 1, z: 0 };
  function isWalkable(x, z) {
    if (Math.hypot(x, z) > WORLD_LIMIT) return false;
    const h = getHeight(x, z);
    if (h < DEEP_WATER) return false;
    return getNormal(x, z, false, _n).y >= SLOPE_LIMIT;
  }

  // Zonen-Gewichte (weich) und Zone am Punkt
  function zoneWeights(x, z, out = new Float32Array(ZONES.length)) {
    for (let k = 0; k < ZONES.length; k++) {
      const Z = ZONES[k];
      const d = Math.hypot(x - Z.x, z - Z.z);
      out[k] = 1 - smoothstep(Z.r * 0.7, Z.r * 1.2, d);
    }
    return out;
  }
  function zoneAt(x, z) {
    let best = null, bd = 1;
    for (const Z of ZONES) {
      const d = Math.hypot(x - Z.x, z - Z.z) / Z.r;
      if (d < bd) { bd = d; best = Z.id; }
    }
    return best;
  }
  function zoneById(id) { return ZONES[ZONE_INDEX[id]] || null; }

  // Oberfläche für Farben, Schritte und Vegetation
  function surfaceAt(x, z, h = getHeight(x, z), ny = getNormal(x, z, true, _n).y) {
    if (h < 0.05) return 'water';
    if (pathWeight(x, z) > 0.45) return 'path';
    const D = coastDist(x, z);
    const th = Math.atan2(z, x);
    const sandLimit = 1.55 + 1.6 * gauss(angDiff(th, EAST), 0.35) + nZone(x / 9, z / 9) * 0.45;
    if (h < sandLimit && D < beachWidth(th) + 6 && ny > 0.55) return 'sand';
    if (ny < 0.74) return 'rock';
    const dv = Math.hypot(x - VOLCANO.x, z - VOLCANO.z);
    if (dv < 62 && h > 17 + nZone(x / 14, z / 14) * 5) return 'ash';
    return 'grass';
  }

  // Wasserspiegel an einer Stelle (Meer 0, Teich höher)
  function waterLevel(x, z) {
    const d = Math.hypot(x - POOL.x, z - POOL.z);
    if (d < POOL.r + 1.5) return POOL.level;
    return SEA_LEVEL;
  }

  const island = {
    cell: c, n, half, heights, flipAt,
    ZONES, SITES, PATHS, FEATURES,
    spawn: { x: FEATURES.dock.x, z: 146, yaw: Math.PI }, // Blick nach Norden zur Insel
    getHeight, getNormal, isWalkable, zoneAt, zoneWeights, zoneById,
    coastDist, heightRaw, pathWeight, pathQuery, surfaceAt, waterLevel,
    noise: { zone: nZone, detail: nDet, rock: nRock },
    siteHeight(id) { const s = SITES[id]; return s ? getHeight(s.x, s.z) : 0; },
  };
  current = island;
  return island;
}

// Modul-Funktionen, die auf die zuletzt erzeugte Insel zeigen
export const getHeight = (x, z) => current.getHeight(x, z);
export const getNormal = (x, z, smooth, out) => current.getNormal(x, z, smooth, out);
export const isWalkable = (x, z) => current.isWalkable(x, z);
export const zoneAt = (x, z) => current.zoneAt(x, z);
export const getIsland = () => current;
export const SPAWN = { x: 6, z: 146, yaw: Math.PI };

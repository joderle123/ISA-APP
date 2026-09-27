// Körper (Stil-Bibel §8.1/§8.4): weiche Drehformen und Kapseln mit überlappenden Gelenkkugeln (keine Lücken beim Beugen),
// Rumpf mit 7 Oberteil-Stilen (Flat-Farbe + eine Bordüre + ein Akzent, leichte Falten), Becken/Beine mit 5 Unterteil-Stilen,
// 4 Schuh-Stilen (chunky, 1 Kopfhöhe lang, helle Sohle), Arme mit Ärmeln oder Haut, Hände mit Fingern (offen, Faust,
// Daumen, Stopp), Armprothese, Statur-Faktor W, Muster als Farbfunktionen, Rucksack-Riemen, Crew-Jacke mit Futter,
// Aufnäher. Alle Teile in Gelenk-Koordinaten. Farbfunktionen arbeiten im lokalen Raum des Teils (vor der Skalierung).
import * as THREE from 'three';
import { fig, merge, capsule, lathe, withRows, sphere, RoundedBoxGeometry, FLAG } from './geo.js';
const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
import { M, TORSO_PROFILE, TORSO_SCALE, torsoRadius, darker, lighter, mixHex, trim, buildWidth } from './base.js';
import { patternColor, buildBackItem, buildJacketLining } from './cosmetics.js';
import { buildPatchParts } from './patches.js';

const LONG_SLEEVE = new Set(['hoodie', 'jacke', 'hemd', 'pullover', 'crewjacke']);
export const hasLongSleeves = (style) => LONG_SLEEVE.has(style);
const sm = (a, b, x) => THREE.MathUtils.smoothstep(x, a, b);

// Grundfarbe (Muster oder Farbe) als Funktion, die `out` setzt
function baseFn(pat, color) {
  if (typeof pat === 'function') return pat;
  const c = new THREE.Color(pat !== undefined ? pat : color);
  return (x, y, z, out) => out.copy(c);
}

// ---- Rumpf ----
export function buildTorso(cfg, W = buildWidth(cfg.build)) {
  const P = [];
  const T = M.torso, style = cfg.topStyle, top = cfg.top, dark = trim(top);
  const tank = style === 'tanktop', crew = style === 'crewjacke';
  const base = baseFn(patternColor(cfg, top, { region: 'torso', w: W }), top);
  const acc = cfg.patternColor || '#ffffff';
  const hemBand = style !== 'tanktop' && style !== 'tshirt';
  const fz = (y, extra = 0) => torsoRadius(y, W).zr + extra;     // Vorderkante des Rumpfes auf Höhe y
  const rows = [0.036];
  if (tank) rows.push(T - 0.11);
  if (crew) rows.push(T * 0.6, T * 0.6 + 0.05);
  const torsoColor = (x, y, z, out) => {
    if (tank && y > T - 0.11) { out.set(cfg.skin); return; }
    if (crew && y > T * 0.6 && y < T * 0.6 + 0.05) { out.set(acc); return; }      // Brustband
    base(x, y, z, out);
    if (hemBand && y < 0.036) out.multiplyScalar(0.78);                             // Bordüre am Saum
    // leichte Falten: zwei weiche Bahnen von den Achseln zur Taille, Taille etwas dunkler
    const cx = 0.06 + (0.36 - y) * 0.22;
    const crease = Math.max(0, 1 - Math.abs(Math.abs(x) - cx) / 0.035) * sm(0.42, 0.3, y) * sm(0.03, 0.12, y);
    out.multiplyScalar(1 - crease * 0.07 - 0.04 * sm(0.22, 0.06, y));
  };
  P.push(fig(lathe(withRows(TORSO_PROFILE, rows), 16), { scale: [TORSO_SCALE.x * W, 1, TORSO_SCALE.z * W], flag: tank ? undefined : FLAG.cloth, color: torsoColor }));
  if (tank) {
    // Haut über dem Tanktop ist im Rumpf gefärbt; die Träger als Bänder
    for (const s of [-1, 1]) for (const f of [-1, 1]) P.push(fig(new RoundedBoxGeometry(0.036, 0.15, 0.014, 2, 0.006), { pos: [s * 0.1 * W, T - 0.075, f * 0.085 * W], rot: [f * 0.28, 0, s * -0.1], color: top }));
  }
  // Schultern (weich, unter dem Ärmelansatz)
  for (const s of [-1, 1]) P.push(fig(sphere(0.068, 10, 7), { pos: [s * 0.205 * W, T - 0.058, 0], scale: [1.05 * W, 0.82, 0.95 * W], flag: tank ? FLAG.skin : FLAG.cloth, color: tank ? cfg.skin : (x, y, z, out) => base(x * 2.6, T - 0.06, z, out) }));
  // Hals
  P.push(fig(capsule(0.053, 0.06, 0.14, { segs: 10, topCap: false, botCap: false }), { pos: [0, T + 0.08, 0], flag: FLAG.skin, color: (x, y, z, out) => out.set(cfg.skin).multiplyScalar(y < -0.06 ? 0.9 : 1) }));
  if (cfg.vitiligo) P.push(fig(new THREE.CircleGeometry(0.02, 8), { pos: [0.035, T + 0.04, 0.05], rot: [0, 0.6, 0], flag: FLAG.skin, color: mixHex(cfg.skin, '#f8ede2', 0.7) }));
  if (style === 'hoodie') {
    // Kapuze im Nacken als deutliches Volumen (wenn nicht aufgesetzt), Kordeln weiß, Bauchtasche
    if (cfg.head !== 'kapuze') {
      P.push(fig(new THREE.TorusGeometry(0.1, 0.045, 7, 14, Math.PI * 1.25), { pos: [0, T + 0.01, -0.035 * W], rot: [Math.PI / 2 + 0.35, 0, Math.PI * 0.875], scale: [1.35 * W, 1.1, 1], color: dark }));
      P.push(fig(sphere(0.09, 10, 7), { pos: [0, T - 0.05, -0.14 * W], scale: [1.35 * W, 0.7, 0.75], color: dark, deform: (v) => { if (v.y > 0) v.y *= 0.7; } }));
    }
    P.push(fig(new THREE.TorusGeometry(0.078, 0.02, 6, 16, Math.PI * 1.4), { pos: [0, T + 0.0, 0.0], rot: [Math.PI / 2, 0, Math.PI * 0.8], scale: [1.15 * W, 1, 0.95], color: dark }));
    for (const s of [-1, 1]) P.push(fig(capsule(0.0055, 0.006, 0.13, { segs: 6, caps: 2 }), { pos: [s * 0.034, T - 0.04, fz(T - 0.08, 0.008)], rot: [-0.1, 0, s * 0.05], color: '#ffffff' }));
    P.push(fig(new RoundedBoxGeometry(0.2 * W, 0.11, 0.03, 1, 0.01), { pos: [0, 0.14, fz(0.14, 0.008)], rot: [0.1, 0, 0], color: (x, y, z, out) => out.set(dark).multiplyScalar(y > 0.045 ? 0.9 : 1) }));
  } else if (style === 'tshirt') {
    P.push(fig(new THREE.TorusGeometry(0.058, 0.011, 6, 14), { pos: [0, T - 0.005, 0.012], rot: [Math.PI / 2, 0, 0], scale: [1.1, 1, 0.85], color: dark }));
    if (!cfg.pattern || cfg.pattern === 'keins') P.push(fig(new THREE.CylinderGeometry(0.042, 0.042, 0.008, 12, 1), { pos: [0, T * 0.62, fz(T * 0.62, 0.0)], rot: [Math.PI / 2 + 0.1, 0, 0], flag: FLAG.flat, color: acc }));
  } else if (style === 'jacke' || style === 'crewjacke') {
    const inner = crew ? (cfg.jacket && cfg.jacket.shirt) || '#f2ede3' : '#e9e4dc';
    // offener Reißverschluss: Hemd innen + Zipper-Linie, Kragen als weiche Keile
    P.push(fig(new RoundedBoxGeometry(0.07, T - 0.1, 0.02, 1, 0.008), { pos: [0, T / 2 - 0.02, fz(T * 0.55, 0.002)], color: inner }));
    P.push(fig(box(0.012, T - 0.14, 0.008), { pos: [0.033, T / 2 - 0.03, fz(T * 0.55, 0.012)], smooth: false, color: '#d8dbe4' }));
    for (const s of [-1, 1]) P.push(fig(new RoundedBoxGeometry(crew ? 0.12 : 0.095, crew ? 0.06 : 0.048, 0.018, 1, 0.007), { pos: [s * 0.078 * W, T - 0.005, 0.06 * W], rot: [0.5, s * -0.55, s * 0.15], color: crew ? darker(top, 0.7) : dark }));
    if (crew) buildJacketLining(cfg, P, W);
  } else if (style === 'hemd') {
    P.push(fig(box(0.036, T - 0.08, 0.01), { pos: [0, T / 2 - 0.02, fz(T * 0.55, 0.0)], smooth: false, color: lighter(top, 0.1) }));
    for (let i = 0; i < 4; i++) P.push(fig(sphere(0.0065, 6, 4), { pos: [0, 0.12 + i * 0.1, fz(0.12 + i * 0.1, 0.006)], scale: [1, 1, 0.5], color: '#f7f2e8' }));
    for (const s of [-1, 1]) P.push(fig(new RoundedBoxGeometry(0.085, 0.042, 0.012, 1, 0.005), { pos: [s * 0.062 * W, T - 0.008, 0.066 * W], rot: [0.55, s * -0.6, s * 0.2], color: lighter(top, 0.1) }));
  } else if (style === 'pullover') {
    P.push(fig(new THREE.TorusGeometry(0.068, 0.018, 6, 14), { pos: [0, T - 0.002, 0.008], rot: [Math.PI / 2, 0, 0], scale: [1.1, 1, 0.9], color: dark }));
  }
  buildBackItem(cfg, P, W, { straps: true, body: false });
  if (cfg.patches && cfg.patches.length && cfg.back !== 'rucksack') P.push(...buildPatchParts(cfg.patches, 'back', W));
  return merge(P);
}

// ---- Becken und Beine ----
const PELVIS_PROFILE = [[0.09, -0.16], [0.135, -0.13], [0.156, -0.07], [0.16, 0.0], [0.158, 0.07], [0.152, 0.1], [0.1, 0.108], [0, 0.11]];
export function buildPelvis(cfg, W = buildWidth(cfg.build)) {
  const bot = cfg.bottoms, band = trim(bot);
  const skirt = cfg.bottomsStyle === 'rock';
  const P = [fig(lathe(withRows(PELVIS_PROFILE, [0.07]), 14), { scale: [1.2 * W, 1, 0.76 * W], color: (x, y, z, out) => { out.set(y > 0.07 ? band : bot); if (y < -0.1) out.multiplyScalar(0.94); } })];
  if (skirt) {
    const pat = baseFn(patternColor(cfg, bot, { region: 'leg', w: W }), bot);
    P.push(fig(lathe([[0.17, -0.06], [0.2, -0.16], [0.24, -0.27], [0.25, -0.3], [0.235, -0.31]], 16), { pos: [0, -0.02, 0], scale: [1.15 * W, 1, 0.82 * W], deform: (v) => { const a = Math.atan2(v.x, v.z); if (v.y < -0.2) { const k = 1 + 0.035 * Math.sin(a * 8); v.x *= k; v.z *= k; } }, color: (x, y, z, out) => { pat(x, y, z, out); const a = Math.atan2(x, z); if (y < -0.2) out.multiplyScalar(0.93 + 0.07 * Math.sin(a * 8)); if (y < -0.3) out.multiplyScalar(0.78); } }));
  }
  return merge(P);
}
export function buildThigh(cfg, side, W = buildWidth(cfg.build)) {
  const st = cfg.bottomsStyle, s = side ? -1 : 1;
  const short = st === 'kurz', skirt = st === 'rock';
  const bot = cfg.bottoms, pat = baseFn(patternColor(cfg, bot, { region: 'leg', w: W }), bot);
  const L = M.thigh + 0.02;
  const col = skirt ? (x, y, z, out) => out.set(cfg.skin) : short ? (x, y, z, out) => { if (y > -0.27) { pat(x, y, z, out); if (y < -0.245) out.multiplyScalar(0.78); } else out.set(cfg.skin); } : (x, y, z, out) => { pat(x, y, z, out); if (Math.abs(x) < 0.006 && z < 0) out.multiplyScalar(0.92); };
  const P = [fig(capsule(0.088 * W, 0.066 * W, L, { segs: 10, rows: short ? [-0.245, -0.27] : [] }), { flag: skirt ? FLAG.skin : (short ? undefined : FLAG.cloth), color: col })];
  if (st === 'cargo') P.push(fig(new RoundedBoxGeometry(0.026, 0.11, 0.09, 1, 0.008), { pos: [s * 0.08 * W, -0.27, 0.01], color: darker(bot, 0.86) }));
  if (st === 'jogger') P.push(fig(box(0.01, L - 0.06, 0.018), { pos: [s * 0.081 * W, -L / 2, 0], rot: [0, 0, s * 0.04], smooth: false, color: cfg.patternColor || '#ffffff' }));
  return merge(P);
}
export function buildShin(cfg, side, W = buildWidth(cfg.build)) {
  const st = cfg.bottomsStyle, sh = cfg.shoesStyle, s = side ? -1 : 1;
  const bare = st === 'kurz' || st === 'rock';
  const bot = cfg.bottoms;
  const lower = bare ? cfg.skin : bot;
  const shoes = cfg.shoes, acc = cfg.shoesAccent, L = M.shin;
  const rows = [];
  if (st === 'jogger') rows.push(-L + 0.06);
  if (bare && st === 'kurz') rows.push(-L + 0.085);
  const P = [fig(capsule(0.068 * W, 0.049 * W, L, { segs: 10, rows }), {
    flag: bare ? FLAG.skin : FLAG.cloth,
    color: (x, y, z, out) => {
      out.set(lower);
      if (st === 'jogger' && y < -L + 0.06) out.set(darker(bot, 0.72));
      else if (bare && st === 'kurz' && y < -L + 0.085) out.set('#ffffff');
      else if (!bare && y < -L + 0.04) out.multiplyScalar(0.9);
    },
  })];
  if (st === 'jogger') P.push(fig(box(0.01, L - 0.1, 0.016), { pos: [s * 0.062 * W, -L / 2 + 0.02, 0], smooth: false, color: cfg.patternColor || '#ffffff' }));
  // Schuhe: chunky, Sohle hell, Akzentstreifen (1 Kopfhöhe lang)
  const foot = { w: 0.118 * W, len: 0.3, y: -L + 0.022, z: 0.065 };
  const toeUp = (v) => { v.y += Math.max(0, v.z - 0.09) * 0.22; };
  const sole = (h, col) => fig(new RoundedBoxGeometry(foot.w + 0.01, h, foot.len + 0.01, 1, 0.01), { pos: [0, -L - 0.028, foot.z], deform: toeUp, color: col });
  // Schuhkörper: liegende Kapsel (Ferse dicker als Spitze), seitlich breit, Spitze leicht angehoben
  const shoeBody = (h, col) => fig(capsule(0.052, 0.046, foot.len - 0.1, { segs: 10, caps: 3 }), { pos: [0, foot.y - 0.006, foot.z + 0.05], rot: [Math.PI / 2, 0, 0], scale: [foot.w / 0.1, 1, h / 0.1], deform: (v) => { if (v.y > -0.1) v.x *= 1.06; }, colorAfter: true, color: col });
  if (sh === 'boots') {
    P.push(fig(capsule(0.072 * W, 0.068 * W, 0.17, { segs: 10, topCap: false }), { pos: [0, -L + 0.14, 0.004], color: (x, y, z, out) => out.set(shoes).multiplyScalar(y > -0.02 ? 0.86 : 1) }));
    P.push(shoeBody(0.1, shoes));
    P.push(sole(0.036, darker(shoes, 0.5)));
    for (let i = 0; i < 3; i++) P.push(fig(box(0.055, 0.007, 0.007), { pos: [0, -L + 0.11 - i * 0.04, 0.066 * W], smooth: false, color: acc }));
  } else if (sh === 'sandalen') {
    P.push(fig(sphere(0.06, 10, 7), { pos: [0, -L - 0.01, 0.075], scale: [0.95 * W, 0.5, 1.6], flag: FLAG.skin, color: cfg.skin }));
    P.push(sole(0.028, shoes));
    P.push(fig(box(0.13 * W, 0.012, 0.028), { pos: [0, -L - 0.006, 0.115], smooth: false, color: acc }));
    P.push(fig(box(0.13 * W, 0.012, 0.028), { pos: [0, -L + 0.0, 0.01], smooth: false, color: acc }));
  } else if (sh === 'high') {
    P.push(fig(capsule(0.066 * W, 0.064 * W, 0.11, { segs: 10, topCap: false }), { pos: [0, -L + 0.09, 0.006], color: shoes }));
    P.push(shoeBody(0.1, (x, y, z, out) => out.set(z > 0.16 ? acc : shoes)));
    P.push(sole(0.03, '#f4f1ea'));
    P.push(fig(box(0.05, 0.1, 0.016), { pos: [0, -L + 0.07, 0.078], rot: [-0.3, 0, 0], smooth: false, color: acc }));
    P.push(fig(sphere(0.011, 8, 6), { pos: [s * 0.064 * W, -L + 0.05, 0.01], scale: [0.4, 1, 1], color: '#ffffff' }));
  } else {
    // Sneaker (Standard): Körper, helle Sohle, Akzentstreifen, Zunge, Schnürung
    P.push(shoeBody(0.098, (x, y, z, out) => out.set(shoes).multiplyScalar(z > 0.18 && y < foot.y ? 0.92 : 1)));
    P.push(sole(0.03, '#f4f1ea'));
    P.push(fig(box(foot.w + 0.012, 0.011, foot.len - 0.02), { pos: [0, -L - 0.008, foot.z], deform: toeUp, smooth: false, color: acc }));
    P.push(fig(box(0.046, 0.05, 0.018), { pos: [0, -L + 0.055, 0.075], rot: [-0.55, 0, 0], smooth: false, color: darker(shoes, 0.9) }));
    for (let i = 0; i < 2; i++) P.push(fig(box(0.036, 0.006, 0.006), { pos: [0, -L + 0.04 - i * 0.018, 0.1 + i * 0.012], smooth: false, color: '#ffffff' }));
  }
  return merge(P);
}

// ---- Arme ----
export function buildUpperArm(cfg, side, W = buildWidth(cfg.build)) {
  const st = cfg.topStyle;
  const L = M.upperArm + 0.02;
  const pat = baseFn(patternColor(cfg, cfg.top, { region: 'arm', w: W }), cfg.top);
  const acc = cfg.patternColor || '#ffffff';
  const rows = [];
  if (st === 'tshirt') rows.push(-0.14, -0.16);
  if (st === 'crewjacke') rows.push(-0.15, -0.172, -0.192, -0.214);
  let col, flag = FLAG.cloth;
  if (st === 'tanktop') { col = (x, y, z, out) => out.set(cfg.skin); flag = FLAG.skin; }
  else if (st === 'tshirt') { col = (x, y, z, out) => { if (y > -0.16) { pat(x, y, z, out); if (y < -0.14) out.multiplyScalar(0.78); } else out.set(cfg.skin); }; flag = undefined; }
  else if (st === 'crewjacke') col = (x, y, z, out) => { pat(x, y, z, out); if ((y < -0.15 && y > -0.172) || (y < -0.192 && y > -0.214)) out.set(acc); };
  else col = pat;
  const P = [fig(capsule(0.064 * W, 0.054 * W, L, { segs: 10, rows }), { flag, color: col })];
  if (cfg.patches && cfg.patches.length) P.push(...buildPatchParts(cfg.patches, side ? 'armR' : 'armL', W));
  return merge(P);
}
export function buildForearm(cfg, side, W = buildWidth(cfg.build)) {
  const s = side ? -1 : 1, L = M.forearm;
  const pro = cfg.prosthesis === (side ? 'rechts' : 'links');
  if (pro) return buildProsthesisForearm(cfg, W);
  const long = hasLongSleeves(cfg.topStyle);
  const sleeve = long ? cfg.top : cfg.skin;
  const P = [fig(capsule(0.055 * W, 0.046 * W, L, { segs: 10 }), { flag: long ? FLAG.cloth : FLAG.skin, color: sleeve })];
  if (cfg.topStyle === 'hoodie' || cfg.topStyle === 'pullover' || cfg.topStyle === 'crewjacke') {
    // Bündchen: 6 % weiter, Bordüre oder Akzent
    P.push(fig(lathe([[0.046 * W, -L + 0.008], [0.053 * W, -L + 0.012], [0.054 * W, -L + 0.05], [0.049 * W, -L + 0.054]], 10), { color: cfg.topStyle === 'crewjacke' ? cfg.patternColor || '#ffffff' : trim(cfg.top) }));
  }
  if (cfg.topStyle === 'hemd') P.push(fig(lathe([[0.047 * W, -L + 0.008], [0.052 * W, -L + 0.012], [0.052 * W, -L + 0.04], [0.048 * W, -L + 0.044]], 10), { color: lighter(cfg.top, 0.15) }));
  if (cfg.vitiligo && !long) P.push(fig(new THREE.CircleGeometry(0.018, 8), { pos: [s * 0.05 * W, -0.12, 0.01], rot: [0, s * Math.PI / 2, 0], flag: FLAG.skin, color: mixHex(cfg.skin, '#f8ede2', 0.7) }));
  return merge(P);
}
// Prothese: Schaft in Prothesenfarbe, dunkle Manschette am Ellbogen, leuchtende Naht, Handgelenk-Kugel
function buildProsthesisForearm(cfg, W) {
  const L = M.forearm, pc = cfg.prosthesisColor, dark = '#2a2a33', glow = new THREE.Color(cfg.aidColor).multiplyScalar(1.6);
  return merge([
    fig(capsule(0.058 * W, 0.056 * W, 0.07, { segs: 10, botCap: false }), { pos: [0, 0, 0], color: dark }),
    fig(lathe([[0.03 * W, -L + 0.01], [0.044 * W, -L + 0.02], [0.05 * W, -0.09], [0.054 * W, -0.06], [0.05 * W, -0.055]], 10), { color: (x, y, z, out) => out.set(pc).multiplyScalar(z < 0 ? 0.92 : 1) }),
    fig(new THREE.TorusGeometry(0.046 * W, 0.005, 6, 16), { pos: [0, -0.12, 0], rot: [Math.PI / 2, 0, 0], flag: FLAG.flat, color: glow }),
    fig(box(0.012, L - 0.13, 0.01), { pos: [0, -L / 2 - 0.02, 0.046 * W], smooth: false, color: dark }),
    fig(sphere(0.03 * W, 10, 7), { pos: [0, -L + 0.005, 0], color: dark }),
  ]);
}

// ---- Hände (am Handgelenk, y = 0): offen, Faust, Daumen hoch, Stopp; Prothesen-Greifer ----
export function buildHand(cfg, side, kind = 'open', W = buildWidth(cfg.build)) {
  const s = side ? -1 : 1;
  const pro = cfg.prosthesis === (side ? 'rechts' : 'links');
  if (pro) {
    const pc = cfg.prosthesisColor, dark = '#2a2a33', tip = new THREE.Color(cfg.aidColor).multiplyScalar(1.4);
    const P = [fig(new RoundedBoxGeometry(0.072 * W, 0.06, 0.046, 1, 0.012), { pos: [0, -0.035, 0], color: pc })];
    if (kind === 'fist') {
      P.push(fig(new RoundedBoxGeometry(0.066 * W, 0.05, 0.04, 1, 0.012), { pos: [0, -0.085, 0.008], color: dark }));
    } else {
      for (const k of [-1, 1]) P.push(fig(capsule(0.011, 0.009, 0.06, { segs: 6, caps: 2 }), { pos: [k * 0.02 * W, -0.065, 0.01], rot: [kind === 'stop' ? 0.2 : -0.1, 0, k * -0.12], color: dark }));
      P.push(fig(capsule(0.01, 0.009, 0.05, { segs: 6, caps: 2 }), { pos: [0, -0.05, 0.04], rot: [kind === 'thumb' ? -1.2 : -0.5, 0, 0], color: dark }));
      for (const k of [-1, 1]) P.push(fig(box(0.02, 0.012, 0.016), { pos: [k * 0.02 * W, -0.128, 0.008], smooth: false, flag: FLAG.flat, color: tip }));
    }
    return merge(P);
  }
  const skin = cfg.skin, flag = FLAG.skin;
  const palmW = 0.068 * W;
  const palm = (h, d, y) => fig(sphere(0.5, 8, 6), { pos: [0, y, 0], scale: [palmW * 1.05, h * 1.1, d * 1.15], flag, color: skin, deform: (v) => { v.y *= 1 + Math.max(0, -v.y) * 0.15; } });
  const finger = (x, y, z, len, r, rot, curl = 0) => fig(capsule(r, r * 0.86, len, { segs: 6, caps: 2 }), { pos: [x, y, z], rot, flag, color: skin, deform: (v) => { if (curl) v.z -= Math.max(0, -v.y) * curl; } });
  if (kind === 'fist') {
    // Faust: kompakter Block, Knöchelreihe vorn, Daumen quer davor
    const P = [palm(0.062, 0.05, -0.04)];
    for (let i = 0; i < 4; i++) P.push(fig(sphere(0.0125, 8, 6), { pos: [(i - 1.5) * 0.017 * W, -0.072, -0.008], flag, color: skin }));
    P.push(fig(sphere(0.017, 8, 6), { pos: [0, -0.078, 0.012], scale: [1.8 * W, 0.75, 0.9], flag, color: skin }));
    P.push(finger(-s * 0.02 * W, -0.028, 0.02, 0.04, 0.0105, [-0.9, 0, -s * 1.1]));
    return merge(P);
  }
  if (kind === 'thumb') {
    const P = [palm(0.062, 0.05, -0.04)];
    for (let i = 0; i < 4; i++) P.push(fig(sphere(0.0125, 8, 6), { pos: [(i - 1.5) * 0.017 * W, -0.072, -0.008], flag, color: skin }));
    P.push(fig(sphere(0.017, 8, 6), { pos: [0, -0.078, 0.012], scale: [1.8 * W, 0.75, 0.9], flag, color: skin }));
    P.push(finger(-s * 0.02 * W, -0.02, 0.012, 0.055, 0.011, [-Math.PI / 2 + 0.25, 0, -s * 0.25]));
    return merge(P);
  }
  // offen: Handfläche, vier Finger (leicht gespreizt und gekrümmt), Daumen innen; „stop“: Finger gerade und zusammen
  const stop = kind === 'stop';
  const P = [palm(0.074, 0.03, -0.04)];
  for (let i = 0; i < 4; i++) {
    const u = i - 1.5;
    const len = 0.05 * (i === 0 || i === 3 ? 0.85 : 1);
    P.push(finger(u * (stop ? 0.0155 : 0.0165) * W, -0.07, 0.0, len, 0.0092, [stop ? 0 : 0.18, 0, stop ? 0 : u * 0.07], stop ? 0 : 0.35));
  }
  P.push(finger(-s * 0.03 * W, -0.028, 0.006, 0.045, 0.0105, [stop ? 0.1 : -0.35, 0, -s * (stop ? 0.5 : 0.85)]));
  if (cfg.vitiligo && !side) P.push(fig(new THREE.CircleGeometry(0.012, 8), { pos: [0, -0.042, 0.016], flag, color: mixHex(skin, '#f8ede2', 0.7) }));
  return merge(P);
}

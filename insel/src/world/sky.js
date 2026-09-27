// Himmel, Licht und Tag-Nacht-Zyklus (Stil-Bibel §2.3, §5): gemalte Kuppel mit vier Farbstopps, Horizontband und zwei
// Sonnenhöfen, Anime-Cumulus (weiche Normalen, zwei Töne über die Toon-Rampe), Dauergewitter über den Sturmklippen,
// Sonne (Schatten) + Hemisphärenlicht als Schattenfarbe (oben kühl, unten warm), Luftperspektive (Dunst nah → fern),
// Farbkorrektur je Tageszeit (im Material auf „niedrig“, im Post-Pass auf mittel/hoch).
// API: sky.time.setTimeOfDay(h) · sky.night · sky.golden · sky.grade · sky.colors · sky.sunDir/lightDir · setStorm(v) · setQuality(q)
import * as THREE from 'three';
import { part, merge } from './geom.js';
import { mulberry32 } from './noise.js';

// Schlüsselbilder (Stunde → Werte). Farben als sRGB-Hex; Licht/Hemisphäre werden für three linear umgerechnet, die
// Kuppel malt direkt mit den sRGB-Werten (das ist der „gemalte“ Look). Sonne: Aufgang 6 Uhr, Untergang 19 Uhr.
//   top/mid/hor  Zenit · Himmel mitte (35°) · Horizontband (4°)      sun/sunI  Lichtfarbe · Stärke     halo  Sonnenhof
//   shadow       Schattentönung (Hemisphäre oben)                     ground    Bodenanteil der Hemisphäre (warm)
//   hazeN/hazeF  Dunst nah → fern (Nebel, unter dem Horizont)         hemiI     Hemisphären-Stärke (Schattenhelligkeit)
//   grade        [sat, contrast, lift-hex]                             exp/night Belichtung · Nachtanteil (Sterne, Mond)
const KEYS = [
  { h: 0.0, top: '#0A0F2C', mid: '#141B44', hor: '#2A3470', sun: '#8FA6FF', sunI: 1.3, halo: '#3A4A8A', haloAmt: 0.5, shadow: '#243270', ground: '#161C48', hazeN: '#222A58', hazeF: '#1C2354', grade: [0.8, 1.04, '#04071F'], exp: 0.94, night: 1, hemiI: 0.75, rim: '#8FA6FF' },
  { h: 4.9, top: '#0A0F2C', mid: '#141B44', hor: '#2A3470', sun: '#8FA6FF', sunI: 1.3, halo: '#3A4A8A', haloAmt: 0.5, shadow: '#243270', ground: '#161C48', hazeN: '#222A58', hazeF: '#1C2354', grade: [0.8, 1.04, '#04071F'], exp: 0.94, night: 1, hemiI: 0.75, rim: '#8FA6FF' },
  { h: 5.7, top: '#243070', mid: '#5A4E94', hor: '#E88A82', sun: '#FFB07A', sunI: 0.9, halo: '#FF8A6A', haloAmt: 0.9, shadow: '#4A4A88', ground: '#4A3448', hazeN: '#B08AA0', hazeF: '#A07A9A', grade: [1.0, 1.05, '#020210'], exp: 0.98, night: 0.55, hemiI: 1.1, rim: '#FFC8A0' },
  { h: 6.8, top: '#5C8FD8', mid: '#9FC5EE', hor: '#FFDDB8', sun: '#FFE0B8', sunI: 2.7, halo: '#FFC58A', haloAmt: 0.7, shadow: '#7C8CD0', ground: '#8A7A66', hazeN: '#EFE0D0', hazeF: '#E6D6C8', grade: [1.10, 1.05, '#000000'], exp: 1.02, night: 0, hemiI: 2.2, rim: '#FFE9C8' },
  { h: 9.5, top: '#3D8BE8', mid: '#79B6F0', hor: '#CDE8F6', sun: '#FFF6E0', sunI: 2.8, halo: '#FFF3D8', haloAmt: 0.4, shadow: '#6E86C8', ground: '#8C8A6C', hazeN: '#DCEAF6', hazeF: '#CFE3F4', grade: [1.06, 1.06, '#000000'], exp: 0.96, night: 0, hemiI: 2.15, rim: '#FFF1C8' },
  { h: 14.5, top: '#3D8BE8', mid: '#79B6F0', hor: '#CDE8F6', sun: '#FFF6E0', sunI: 2.8, halo: '#FFF3D8', haloAmt: 0.4, shadow: '#6E86C8', ground: '#8C8A6C', hazeN: '#DCEAF6', hazeF: '#CFE3F4', grade: [1.06, 1.06, '#000000'], exp: 0.96, night: 0, hemiI: 2.15, rim: '#FFF1C8' },
  { h: 16.6, top: '#3E6BC0', mid: '#8FA6DE', hor: '#FFC48A', sun: '#FFD2A0', sunI: 3.1, halo: '#FFA060', haloAmt: 0.7, shadow: '#7062B8', ground: '#8E7A66', hazeN: '#EBD6C6', hazeF: '#E2CCC2', grade: [1.10, 1.06, '#00030D'], exp: 1.02, night: 0, hemiI: 2.35, rim: '#FFE0B0' },
  { h: 18.5, top: '#35589E', mid: '#8A8CCC', hor: '#FFB078', sun: '#FFC08A', sunI: 2.6, halo: '#FF8E50', haloAmt: 0.85, shadow: '#6658AE', ground: '#846656', hazeN: '#E6C8B6', hazeF: '#DCC0B2', grade: [1.10, 1.06, '#00030D'], exp: 1.02, night: 0, hemiI: 2.2, rim: '#FFD0A0' },
  { h: 19.2, top: '#1A2358', mid: '#5A3E8C', hor: '#E86A6A', sun: '#D89AB8', sunI: 1.2, halo: '#FF6A5A', haloAmt: 0.85, shadow: '#3A3F80', ground: '#4A3448', hazeN: '#8A5A8A', hazeF: '#7A4A8A', grade: [1.0, 1.05, '#020210'], exp: 0.98, night: 0.3, hemiI: 1.2, rim: '#FFB0A0' },
  { h: 20.3, top: '#0A0F2C', mid: '#141B44', hor: '#2A3470', sun: '#8FA6FF', sunI: 1.3, halo: '#3A4A8A', haloAmt: 0.5, shadow: '#243270', ground: '#161C48', hazeN: '#222A58', hazeF: '#1C2354', grade: [0.8, 1.04, '#04071F'], exp: 0.94, night: 1, hemiI: 0.75, rim: '#8FA6FF' },
  { h: 24.0, top: '#0A0F2C', mid: '#141B44', hor: '#2A3470', sun: '#8FA6FF', sunI: 1.3, halo: '#3A4A8A', haloAmt: 0.5, shadow: '#243270', ground: '#161C48', hazeN: '#222A58', hazeF: '#1C2354', grade: [0.8, 1.04, '#04071F'], exp: 0.94, night: 1, hemiI: 0.75, rim: '#8FA6FF' },
];
const hexToV = (h) => { const n = parseInt(h.slice(1), 16); return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; };
const COLOR_KEYS = ['top', 'mid', 'hor', 'sun', 'halo', 'shadow', 'ground', 'hazeN', 'hazeF', 'rim'];
const NUM_KEYS = ['sunI', 'haloAmt', 'exp', 'night', 'hemiI'];
const KEYV = KEYS.map((k) => {
  const o = { h: k.h, gradeSat: k.grade[0], gradeCon: k.grade[1], lift: hexToV(k.grade[2]) };
  for (const c of COLOR_KEYS) o[c] = hexToV(k[c]);
  for (const c of NUM_KEYS) o[c] = k[c];
  return o;
});

// Zeitgewicht: langsame goldene Stunde, schnelle Nacht
function hourWeight(h) {
  if (h >= 16.0 && h < 19.0) return 4;      // lange goldene Stunde (~5 Minuten)
  if (h >= 20.6 || h < 4.8) return 0.45;    // kurze Nacht (~2 Minuten)
  return 0.8;
}
let W_TOTAL = 0;
for (let h = 0; h < 24; h += 0.01) W_TOTAL += hourWeight(h) * 0.01;

const DOME_VERT = /* glsl */`
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}`;
// Gemalter Himmel (§5.1): Zenit · Mitte (35°) · Horizontband (4°) · Dunst unter dem Horizont; Horizontband 3° hoch und
// 8 % heller mit warmer Kante; breiter Sonnenhof pow 3 und enger pow 48; Sonnenscheibe mit weichem Saum; Blue-Noise-Dithering.
const DOME_FRAG = /* glsl */`
uniform vec3 uTop;
uniform vec3 uMid;
uniform vec3 uHorizon;
uniform vec3 uBelow;
uniform vec3 uSunDir;
uniform vec3 uMoonDir;
uniform vec3 uHalo;
uniform vec3 uSunColor;
uniform float uHaloAmt;
uniform float uNight;
uniform float uTime;
uniform float uSunVis;
uniform float uFlash;
uniform float uLumoPost;
uniform vec3 uGradeLift;
uniform vec3 uGradeGain;
uniform float uGradeSat;
uniform float uGradeContrast;
varying vec3 vDir;
float hash13(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 grade(vec3 c) {
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  c = mix(vec3(l), c, uGradeSat);
  c = (c - 0.5) * uGradeContrast + 0.5;
  c = c * uGradeGain + uGradeLift * (1.0 - l);
  return clamp(c, 0.0, 1.0);
}
void main() {
  vec3 d = normalize(vDir);
  float y = d.y;
  // vier Stopps
  float tMid = 1.0 - exp(-max(y - 0.07, 0.0) * 4.2);
  float tTop = smoothstep(0.30, 1.0, y);
  vec3 col = mix(uHorizon, uMid, tMid);
  col = mix(col, uTop, tTop);
  // Horizontband: 3° hoch, 8 % heller, warme Kante
  float band = exp(-abs(y - 0.025) * 48.0);
  col = mix(col, mix(uHorizon * 1.08, uHalo, 0.2), band * 0.45);
  // zwei Sonnenhöfe (breit in Hof-Farbe, eng in Sonnenfarbe), am Horizont stärker
  float s = max(dot(d, uSunDir), 0.0);
  float hz = 1.0 - smoothstep(-0.05, 0.6, y) * 0.7;
  col = mix(col, uHalo, pow(s, 6.0) * 0.5 * uHaloAmt * hz);
  col = mix(col, uHalo, pow(s, 2.0) * 0.12 * uHaloAmt * hz);
  col += uSunColor * pow(s, 48.0) * 0.6 * uSunVis;
  // Sonnenscheibe mit weichem Saum (~0.3°)
  float disc = smoothstep(0.99930, 0.99972, s);
  vec3 sunCol = mix(vec3(1.0, 0.97, 0.88), uSunColor, 0.3);
  col = mix(col, sunCol, disc * uSunVis);
  // Sterne + Milchstraße
  if (uNight > 0.01 && y > 0.0) {
    vec3 p = d * 220.0;
    vec3 c = floor(p);
    float h = hash13(c);
    if (h > 0.972) {
      vec3 f = fract(p) - 0.5;
      float st = smoothstep(0.24, 0.0, length(f)) * (0.6 + 0.4 * sin(uTime * (2.0 + h * 5.0) + h * 50.0));
      vec3 starCol = mix(vec3(0.75, 0.83, 1.0), vec3(1.0), step(0.985, h));
      col += starCol * st * uNight * smoothstep(0.02, 0.25, y) * (h - 0.972) * 36.0;
    }
    float bandM = exp(-pow(dot(d, normalize(vec3(0.4, 0.3, 0.86))) * 4.0, 2.0));
    col += vec3(0.29, 0.29, 0.54) * bandM * uNight * 0.3 * smoothstep(0.0, 0.3, y);
  }
  // Mond mit zwei Höfen
  float m = max(dot(d, uMoonDir), 0.0);
  float mdisc = smoothstep(0.99905, 0.9993, m);
  col += vec3(0.23, 0.29, 0.54) * pow(m, 60.0) * uNight;
  col += vec3(0.10, 0.13, 0.25) * pow(m, 8.0) * uNight;
  col = mix(col, vec3(0.91, 0.93, 1.0), mdisc * uNight);
  // unter dem Horizont = Dunst fern (wie der Nebel)
  col = mix(col, uBelow, smoothstep(0.0, -0.06, y));
  col += vec3(0.5, 0.55, 0.7) * uFlash;
  // Dithering gegen Banding
  col += (hash12(gl_FragCoord.xy + fract(uTime) * 7.0) - 0.5) * (2.0 / 255.0);
  if (uLumoPost > 0.5) {
    // Post-Stack: linear ausgeben, Sonne und Mond über 1.0 (Bloom greift), Farbkorrektur macht der Grade-Pass
    vec3 lin = pow(max(col, vec3(0.0)), vec3(2.2));
    lin += sunCol * disc * uSunVis * 1.8 + vec3(0.9, 0.93, 1.0) * mdisc * uNight * 0.6;
    gl_FragColor = vec4(lin, 1.0);
  } else {
    gl_FragColor = vec4(grade(col), 1.0);
  }
}`;

// Anime-Cumulus (§5.2): 6–9 verschmolzene Kugeln mit weichen Normalen, flache Unterseite, Breite:Höhe ≈ 2.2:1
function makeCloud(rnd) {
  const parts = [];
  const n = 6 + Math.floor(rnd() * 4);
  const len = 18 + rnd() * 22;
  const base = -1.5;
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const r = (5.5 + rnd() * 5) * (1 - Math.abs(t - 0.5) * 0.8);
    const g = new THREE.SphereGeometry(r, 12, 9);
    parts.push(part(g, {
      pos: [(t - 0.5) * len, r * 0.35 + rnd() * 2.0, (rnd() - 0.5) * 8],
      scale: [1.15, 0.78 + rnd() * 0.15, 1],
      smooth: true,
      deform: (v) => { if (v.y < base) v.y = base - (v.y - base) * 0.08; },
      color: '#ffffff',
    }));
  }
  // zweite, kleinere Reihe obendrauf (Türmchen)
  for (let i = 0; i < 3; i++) {
    const r = 4 + rnd() * 3;
    parts.push(part(new THREE.SphereGeometry(r, 12, 9), {
      pos: [(rnd() - 0.5) * len * 0.5, 4 + rnd() * 3, (rnd() - 0.5) * 5], scale: [1.1, 0.9, 1], smooth: true, color: '#ffffff',
      deform: (v) => { if (v.y < base) v.y = base - (v.y - base) * 0.08; },
    }));
  }
  return merge(parts);
}

// Gewitterturm (§5.2): Sockel #3A3E5E, Kamm #8F97C4 (über die Rampe), Unterseite #262A44 – nie schwarz. Weiche Ballen.
function makeStormTower(rnd) {
  const parts = [];
  const dark = new THREE.Color('#4a4f74'), crest = new THREE.Color('#9aa2cc'), under = new THREE.Color('#33385a');
  // Kamm #9AA2CC schon ab y 40 sichtbar, Unterseite dunkel – weniger, dafür größere Ballen (klare Silhouette)
  const colFn = (x, y, z, out) => {
    const t = THREE.MathUtils.smoothstep(y, 38, 76);
    out.copy(dark).lerp(crest, t);
    if (y < 42) out.lerp(under, THREE.MathUtils.smoothstep(42 - y, 0, 9) * 0.7);
  };
  const blob = (x, y, z, R, sx, sy, sz, seed) => parts.push(part(new THREE.SphereGeometry(R, 14, 10), {
    pos: [x, y, z], scale: [sx, sy, sz], smooth: true, color: colFn,
    deform: (v) => { if (v.y < -R * 0.45) v.y = -R * 0.45 - (v.y + R * 0.45) * 0.2; },
  }));
  // Wolkenbasis: unregelmäßiger Rand aus großen Ballen
  for (let i = 0; i < 16; i++) {
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * 42;
    const R = 11 + rnd() * 6;
    blob(Math.cos(a) * r, 38 + rnd() * 7 - r * 0.05, Math.sin(a) * r, R, 1.3 + rnd() * 0.25, 0.72 + rnd() * 0.2, 1.3 + rnd() * 0.25, 200 + i);
  }
  // Fetzen außen (Böenfront)
  for (let i = 0; i < 6; i++) {
    const a = rnd() * Math.PI * 2, r = 44 + rnd() * 16;
    blob(Math.cos(a) * r, 33 + rnd() * 5, Math.sin(a) * r, 6 + rnd() * 4, 1.6, 0.55, 1.2, 260 + i);
  }
  // aufgetürmte Ballen, nach oben heller und enger
  for (let i = 0; i < 11; i++) {
    const t = i / 10;
    const a = rnd() * Math.PI * 2, r = (1 - t) * 24 + rnd() * 8;
    const R = 16 - t * 4 + rnd() * 4;
    blob(Math.cos(a) * r, 47 + t * 34, Math.sin(a) * r, R, 1.1, 0.95, 1.1, 300 + i);
  }
  // Amboss oben (vom Höhenwind verschoben)
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + rnd() * 0.5, r = 6 + rnd() * 22;
    blob(Math.cos(a) * r + 12, 85 + rnd() * 6, Math.sin(a) * r - 5, 13 + rnd() * 5, 1.9, 0.45, 1.9, 400 + i);
  }
  return merge(parts);
}

export function createSky({ scene, renderer, audio, quality, events }) {
  const sunDir = new THREE.Vector3(0, 1, 0);
  const moonDir = new THREE.Vector3(0, 1, 0);
  const lightDir = new THREE.Vector3(0, 1, 0);

  // ---- Kuppel ----
  const domeU = {
    uTop: { value: new THREE.Vector3() }, uMid: { value: new THREE.Vector3() }, uHorizon: { value: new THREE.Vector3() }, uBelow: { value: new THREE.Vector3() },
    uSunDir: { value: sunDir }, uMoonDir: { value: moonDir },
    uHalo: { value: new THREE.Vector3() }, uSunColor: { value: new THREE.Vector3(1, 1, 1) }, uHaloAmt: { value: 1 },
    uNight: { value: 0 }, uTime: { value: 0 }, uSunVis: { value: 1 }, uFlash: { value: 0 }, uLumoPost: { value: 0 },
    uGradeLift: { value: new THREE.Vector3() }, uGradeGain: { value: new THREE.Vector3(1, 1, 1) },
    uGradeSat: { value: 1 }, uGradeContrast: { value: 1 },
  };
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1, 48, 24),
    new THREE.ShaderMaterial({ vertexShader: DOME_VERT, fragmentShader: DOME_FRAG, uniforms: domeU, side: THREE.BackSide, depthWrite: false, depthTest: true, toneMapped: false, fog: false }),
  );
  dome.renderOrder = -10;
  dome.frustumCulled = false;
  dome.name = 'sky';
  scene.add(dome);

  // ---- Licht (§3.6): Sonne mit weichem Schattenwurf, Hemisphäre = Schattenfarbe ----
  const sun = new THREE.DirectionalLight(0xffffff, 3);
  sun.castShadow = quality.shadows;
  sun.shadow.mapSize.set(quality.shadowSize || 1024, quality.shadowSize || 1024);
  sun.shadow.bias = -0.0003;
  sun.shadow.normalBias = 0.05;
  // Schattenrand knapp weich (Toon: klare Schattenformen statt Blob), Feinheit über die Rampe in veil.js
  sun.shadow.radius = quality.name === 'high' ? 2 : 1.5;
  const shadowSpan = { v: quality.name === 'high' ? 60 : 44 };
  const sc = sun.shadow.camera;
  sc.near = 1; sc.far = 420;
  sc.left = -shadowSpan.v; sc.right = shadowSpan.v; sc.top = shadowSpan.v; sc.bottom = -shadowSpan.v;
  scene.add(sun, sun.target);
  const hemi = new THREE.HemisphereLight(0xbfdfff, 0x8a9a70, 2.6);
  scene.add(hemi);

  // ---- Nebel (Luftperspektive: near = 0.3 × Sichtweite, fern = 1.4 ×; Meer und Küste gehen nahtlos in den Dunst über) ----
  scene.fog = new THREE.Fog(0xcfe3f4, quality.drawDistance * 0.3, quality.drawDistance * 1.4);

  // ---- Wolken (zwei Töne über die Rampe „wolke“, kein Schleier, Nebel gedeckelt) ----
  const rnd = mulberry32(99);
  // Marker-Alpha 0.99 im Puffer: der Kontur-Pass lässt Wolken damit aus (keine Ballon-Ränder, §5.2). three erzwingt bei
  // undurchsichtigen Materialien Alpha 1.0 (OPAQUE), darum CustomBlending One/Zero (ergibt dasselbe Bild, schreibt aber das Alpha)
  const MARKER = { opacity: 0.99, blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.ZeroFactor, blendSrcAlpha: THREE.OneFactor, blendDstAlpha: THREE.ZeroFactor };
  const cloudMat = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: new THREE.Color('#ffffff'), emissiveIntensity: 0.12, fog: true, ...MARKER });
  const clouds = new THREE.Group();
  clouds.name = 'clouds';
  const cloudGeos = [makeCloud(rnd), makeCloud(rnd), makeCloud(rnd), makeCloud(rnd)];
  const CLOUD_N = { low: 10, medium: 18, high: 24 };
  const cloudList = [];
  for (let i = 0; i < 24; i++) {
    const m = new THREE.Mesh(cloudGeos[i % cloudGeos.length], cloudMat);
    const a = rnd() * Math.PI * 2;
    const near = i < 14;
    const r = near ? 60 + rnd() * 110 : 200 + rnd() * 250;
    m.position.set(Math.cos(a) * r, near ? 70 + rnd() * 40 : 100 + rnd() * 40, Math.sin(a) * r);
    m.rotation.y = rnd() * Math.PI;
    m.scale.setScalar(0.8 + rnd() * 0.9);
    m.userData.bob = rnd() * 10;
    m.userData.order = i;
    clouds.add(m);
    cloudList.push(m);
  }
  scene.add(clouds);

  // ---- Dauergewitter über den Sturmklippen ----
  const storm = { x: -100, z: -100, r: 55, intensity: 1, flash: 0, next: 3, bolt: null, boltT: 0 };
  const stormMat = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: new THREE.Color('#4a4e78'), emissiveIntensity: 0.5, fog: true, ...MARKER });
  const stormEmissiveBase = new THREE.Color('#4a4e78'), stormEmissiveFlash = new THREE.Color('#c9d0ff');
  const stormGroup = new THREE.Group();
  stormGroup.position.set(storm.x, 0, storm.z);
  stormGroup.add(new THREE.Mesh(makeStormTower(rnd), stormMat));
  // Regenvorhang (§5.2): Alpha 0.22, schräg, Streifen ~1.4 m
  const curtainMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uAmt: { value: 1 } },
    vertexShader: /* glsl */`
      varying vec2 vUv; varying float vDist;
      void main() {
        vUv = uv;
        vec4 w = modelMatrix * vec4(position, 1.0);
        vDist = distance(w.xyz, cameraPosition);
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */`
      uniform float uTime; uniform float uAmt; varying vec2 vUv; varying float vDist;
      float h1(float x) { return fract(sin(x * 78.23) * 43758.5); }
      void main() {
        float col = floor((vUv.x + vUv.y * 0.12) * 120.0);
        float gap = step(0.4, h1(col + 11.0));
        float s = fract(vUv.y * 2.2 + uTime * (1.4 + h1(col) * 0.8) + h1(col + 7.0));
        float streak = smoothstep(0.5, 1.0, s) * (0.3 + h1(col + 3.0) * 0.7);
        float a = (0.04 + streak * 0.18) * gap * smoothstep(0.0, 0.5, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
        a *= smoothstep(10.0, 40.0, vDist) * uAmt;
        gl_FragColor = vec4(vec3(0.72, 0.77, 0.9), a);
      }`,
    transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false,
  });
  {
    const veilC = new THREE.Mesh(new THREE.CylinderGeometry(34, 38, 36, 32, 1, true), curtainMat);
    veilC.position.set(0, 20, 0);
    veilC.renderOrder = 5;
    stormGroup.add(veilC);
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + 0.6, r = 8 + rnd() * 14;
      const c = new THREE.Mesh(new THREE.CylinderGeometry(6 + rnd() * 4, 9 + rnd() * 4, 38, 14, 1, true), curtainMat);
      c.position.set(Math.cos(a) * r, 19, Math.sin(a) * r);
      c.renderOrder = 5;
      stormGroup.add(c);
    }
  }
  scene.add(stormGroup);
  // Blitz: weißer Kern + blasse Hülle (§5.2)
  const boltMat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 1, fog: false, toneMapped: false });
  const boltHullMat = new THREE.MeshBasicMaterial({ color: '#b4c0ff', transparent: true, opacity: 0.5, fog: false, toneMapped: false, depthWrite: false });
  function makeBolt() {
    const pts = [];
    let x = (rnd() - 0.5) * 50, z = (rnd() - 0.5) * 50, y = 44;
    const ground = 20;
    while (y > ground) {
      const ny = y - 3 - rnd() * 5;
      const nx = x + (rnd() - 0.5) * 6, nz = z + (rnd() - 0.5) * 6;
      pts.push([x, y, z, nx, Math.max(ny, ground), nz]);
      x = nx; y = ny; z = nz;
    }
    const grp = new THREE.Group();
    for (const [ax, ay, az, bx, by, bz] of pts) {
      const len = Math.hypot(bx - ax, by - ay, bz - az);
      for (const [rad, mat] of [[0.25, boltMat], [0.6, boltHullMat]]) {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad * 1.3, len, 4, 1), mat);
        m.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
        m.lookAt(bx, by, bz);
        m.rotateX(Math.PI / 2);
        grp.add(m);
      }
    }
    return grp;
  }

  // Regen (Linien relativ zur Kamera, 25° schräg, #B8C4E6)
  const rainN = Math.round(900 * (quality.particles || 1));
  const rainPos = new Float32Array(rainN * 6);
  const rainEnd = new Float32Array(rainN * 2);
  for (let i = 0; i < rainN; i++) {
    const x = (rnd() - 0.5) * 60, y = rnd() * 40, z = (rnd() - 0.5) * 60;
    rainPos.set([x, y, z, x, y, z], i * 6);
    rainEnd[i * 2] = 0; rainEnd[i * 2 + 1] = 1;
  }
  const rainGeo = new THREE.BufferGeometry();
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
  rainGeo.setAttribute('aEnd', new THREE.BufferAttribute(rainEnd, 1));
  const rainU = { uTime: { value: 0 }, uCam: { value: new THREE.Vector3() }, uAmt: { value: 0 } };
  const rain = new THREE.LineSegments(rainGeo, new THREE.ShaderMaterial({
    uniforms: rainU, transparent: true, depthWrite: false,
    vertexShader: /* glsl */`
      attribute float aEnd; uniform float uTime; uniform vec3 uCam; varying float vA;
      void main() {
        vec3 p = position;
        p.y = mod(p.y - uTime * 28.0, 40.0) - 14.0 - aEnd * 1.4;
        p.x += aEnd * 0.6;
        vec3 w = uCam + p;
        vA = (1.0 - aEnd * 0.6) * (1.0 - smoothstep(12.0, 30.0, length(p.xz)));
        gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform float uAmt; varying float vA;
      void main() { gl_FragColor = vec4(0.72, 0.77, 0.9, 0.45 * vA * uAmt); }`,
  }));
  rain.frustumCulled = false;
  rain.visible = false;
  rain.renderOrder = 13;
  scene.add(rain);

  // ---- Zeit ----
  const time = {
    hour: 16.8,
    speed: 1,
    paused: false,
    cycleSeconds: 720,
    setTimeOfDay(h) { time.hour = ((h % 24) + 24) % 24; apply(); events && events.emit('time:set', time.hour); },
    getTimeOfDay() { return time.hour; },
    get night() { return state.night; },
    get isNight() { return state.night > 0.5; },
    get daylight() { return Math.max(0, Math.min(1, sunDir.y * 4 + 0.2)); },
  };
  const state = { night: 0, exposure: 1, golden: 0 };
  // interpolierte Werte (sRGB-Tripel für die Kuppel, Zahlen)
  const cur = { gradeSat: 1, gradeCon: 1, lift: [0, 0, 0] };
  for (const c of COLOR_KEYS) cur[c] = [0, 0, 0];
  for (const c of NUM_KEYS) cur[c] = 0;

  function sample(h) {
    let i = 0;
    while (i < KEYV.length - 2 && KEYV[i + 1].h <= h) i++;
    const a = KEYV[i], b = KEYV[i + 1];
    const t = Math.max(0, Math.min(1, (h - a.h) / (b.h - a.h || 1)));
    const s = t * t * (3 - 2 * t);
    for (const c of COLOR_KEYS) for (let j = 0; j < 3; j++) cur[c][j] = a[c][j] + (b[c][j] - a[c][j]) * s;
    for (let j = 0; j < 3; j++) cur.lift[j] = a.lift[j] + (b.lift[j] - a.lift[j]) * s;
    for (const c of NUM_KEYS) cur[c] = a[c] + (b[c] - a[c]) * s;
    cur.gradeSat = a.gradeSat + (b.gradeSat - a.gradeSat) * s;
    cur.gradeCon = a.gradeCon + (b.gradeCon - a.gradeCon) * s;
    state.exposure = cur.exp;
    state.night = cur.night;
  }

  const colors = {
    horizon: new THREE.Color(), top: new THREE.Color(), mid: new THREE.Color(), light: new THREE.Color(), glow: new THREE.Color(),
    hemiSky: new THREE.Color(), hemiGround: new THREE.Color(), ambient: new THREE.Color(), shadow: new THREE.Color(),
    hazeNear: new THREE.Color(), hazeFar: new THREE.Color(), rim: new THREE.Color(),
  };
  const setS = (c, v) => c.setRGB(v[0], v[1], v[2], THREE.SRGBColorSpace);
  const ss = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const grade = { lift: [0, 0, 0], gain: [1, 1, 1], sat: 1, contrast: 1 };
  const G_GAIN_GOLD = [1.04, 1.0, 0.95], G_GAIN_NIGHT = [0.86, 0.92, 1.12];
  let veilRef = null; // wird beim ersten update() gesetzt, damit setTimeOfDay die Farbkorrektur sofort setzt
  let post = 0;
  const _rimCool = new THREE.Color();
  const _cloudUnder = new THREE.Color('#b9c6e8');

  function apply() {
    const h = time.hour;
    sample(h);
    // Sonnenbahn: 6 Uhr Aufgang, 19 Uhr Untergang, mittags ~53° hoch
    const a = ((h - 6) / 13) * Math.PI;
    sunDir.set(Math.cos(a) * 0.92, Math.sin(a) * 0.8, Math.sin(a) * 0.4).normalize();
    moonDir.set(-Math.cos(a) * 0.8, Math.max(-Math.sin(a) * 0.75, -0.3), 0.35).normalize();
    const sunUp = sunDir.y > -0.01;
    lightDir.copy(sunUp ? sunDir : moonDir);
    if (lightDir.y < 0.14) { lightDir.y = 0.14; lightDir.normalize(); }
    // Übergang Sonne/Mond: Licht kurz abblenden
    const el = sunDir.y;
    const dip = Math.min(1, Math.abs(el) / 0.07);

    setS(colors.top, cur.top); setS(colors.mid, cur.mid); setS(colors.horizon, cur.hor); setS(colors.light, cur.sun);
    setS(colors.glow, cur.halo); setS(colors.shadow, cur.shadow); setS(colors.hemiGround, cur.ground);
    setS(colors.hazeNear, cur.hazeN); setS(colors.hazeFar, cur.hazeF); setS(colors.rim, cur.rim);
    // Hemisphäre: oben die Schattentönung (leicht aufgehellt), unten der warme Bodenanteil
    colors.hemiSky.copy(colors.shadow).lerp(colors.mid, 0.25);
    sun.color.copy(colors.light);
    sun.intensity = cur.sunI * (0.15 + 0.85 * dip);
    hemi.color.copy(colors.hemiSky);
    hemi.groundColor.copy(colors.hemiGround);
    hemi.intensity = cur.hemiI;
    scene.fog.color.copy(colors.hazeFar);
    renderer.toneMappingExposure = state.exposure;
    // nachts weicherer Schattenrand (§3.6: radius 3), tags klare Toon-Schattenformen
    sun.shadow.radius = (quality.name === 'high' ? 2 : 1.5) + state.night * 1.5;
    domeU.uTop.value.set(cur.top[0], cur.top[1], cur.top[2]);
    domeU.uMid.value.set(cur.mid[0], cur.mid[1], cur.mid[2]);
    domeU.uHorizon.value.set(cur.hor[0], cur.hor[1], cur.hor[2]);
    domeU.uBelow.value.set(cur.hazeF[0], cur.hazeF[1], cur.hazeF[2]);
    domeU.uHalo.value.set(cur.halo[0], cur.halo[1], cur.halo[2]);
    domeU.uSunColor.value.set(cur.sun[0], cur.sun[1], cur.sun[2]);
    domeU.uHaloAmt.value = cur.haloAmt;
    domeU.uNight.value = state.night;
    domeU.uSunVis.value = Math.max(0, Math.min(1, (sunDir.y + 0.03) * 12));
    // Wolken: Schattenseite über die Hemisphäre, leichter Eigen-Schimmer in Horizontfarbe (zwei Töne bleiben lesbar)
    cloudMat.emissive.copy(colors.horizon).lerp(_cloudUnder, 0.55).multiplyScalar(1 - state.night * 0.6);
    cloudMat.emissiveIntensity = 0.3;
    // ambient-Näherung für eigene Shader (linear)
    colors.ambient.copy(colors.hemiSky).lerp(colors.hemiGround, 0.35).multiplyScalar(cur.hemiI * 0.3);
    // Farbkorrektur (§2.3): Sättigung/Kontrast/Lift aus den Schlüsselbildern, Gain warm in der goldenen Stunde, kühl nachts
    state.golden = ss(15.3, 16.8, h) * (1 - ss(18.9, 19.6, h)) + ss(7.2, 6.2, h) * ss(5.4, 6.0, h);
    for (let i = 0; i < 3; i++) {
      const gg = 1 + (G_GAIN_GOLD[i] - 1) * state.golden;
      grade.gain[i] = gg + (G_GAIN_NIGHT[i] - gg) * state.night;
      grade.lift[i] = cur.lift[i];
    }
    grade.sat = cur.gradeSat;
    grade.contrast = cur.gradeCon;
    domeU.uGradeLift.value.set(grade.lift[0], grade.lift[1], grade.lift[2]);
    domeU.uGradeGain.value.set(grade.gain[0], grade.gain[1], grade.gain[2]);
    domeU.uGradeSat.value = grade.sat;
    domeU.uGradeContrast.value = grade.contrast;
    if (veilRef) applyVeil(veilRef);
  }
  // Toon-Uniforms an den Schleier/Material-Patch (Schattentönung, Kantenlicht, Dunst)
  function applyVeil(veil) {
    const u = veil.uniforms;
    veil.setGrade(grade);
    u.uShadowTint.value.copy(colors.shadow);
    u.uRimWarm.value.copy(colors.rim);
    _rimCool.set('#9fb4ff').lerp(colors.rim, state.night * 0.6);
    u.uRimCool.value.copy(_rimCool);
    u.uRimGlobal.value = 1 - state.night * 0.5;
    u.uFogNearColor.value.copy(colors.hazeNear);
    u.uFogSunColor.value.copy(colors.glow);
    u.uFogSunAmt.value = cur.haloAmt * 0.6;
    u.uFogMax.value = 0.72;
    u.uFogHeight.value = 0.08;
    // Wolkenschatten nur bei Sonne (Mondlicht wirft keine lesbaren Wolkenschatten)
    u.uCloudAmt.value = 0.3 * (1 - state.night) * (0.35 + 0.65 * Math.max(0, Math.min(1, sunDir.y * 3)));
    u.uSunColorLin.value.copy(sun.color).multiplyScalar(sun.intensity);
    post = u.uLumoPost.value;
    domeU.uLumoPost.value = post;
  }

  // Schatten folgt dem Fokus (Texel-Einrastung gegen Flimmern)
  const _m = new THREE.Matrix4(), _mi = new THREE.Matrix4(), _p = new THREE.Vector3(), _z = new THREE.Vector3(), _up = new THREE.Vector3(0, 1, 0);
  function placeShadow(focus) {
    _m.lookAt(lightDir, _z.set(0, 0, 0), Math.abs(lightDir.y) > 0.99 ? _up.set(0, 0, 1) : _up.set(0, 1, 0));
    _mi.copy(_m).invert();
    _p.copy(focus).applyMatrix4(_mi);
    const texel = (2 * shadowSpan.v) / (sun.shadow.mapSize.x || 1024);
    _p.x = Math.round(_p.x / texel) * texel;
    _p.y = Math.round(_p.y / texel) * texel;
    _p.applyMatrix4(_m);
    sun.target.position.copy(_p);
    sun.position.copy(_p).addScaledVector(lightDir, 200);
    sun.target.updateMatrixWorld();
  }

  apply();
  let cloudCount = CLOUD_N[quality.name] || 18;
  const applyClouds = () => { for (const c of cloudList) c.visible = c.userData.order < cloudCount; };
  applyClouds();

  const sky = {
    dome, sun, hemi, clouds, storm, rain, time, colors, sunDir, moonDir, lightDir, grade, cloudMat, stormMat,
    get night() { return state.night; },
    get golden() { return state.golden; },
    // Materialien der Wolken an den Schleier-Patch hängen (Rampe „wolke“, kein Schleier, Nebel gedeckelt)
    attachVeil(veil) {
      veilRef = veil;
      veil.patch(cloudMat, { key: 'wolke', veil: false, ramp: 'wolke' });
      veil.patch(stormMat, { key: 'sturm', veil: false, ramp: 'wolke', fogCap: 0.45 });
      applyVeil(veil);
    },
    setQuality(q) {
      sun.castShadow = q.shadows;
      if (q.shadows) {
        const s = q.shadowSize;
        if (sun.shadow.mapSize.x !== s) {
          sun.shadow.mapSize.set(s, s);
          if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map = null; }
        }
      }
      shadowSpan.v = q.name === 'high' ? 60 : 44;
      sc.left = -shadowSpan.v; sc.right = shadowSpan.v; sc.top = shadowSpan.v; sc.bottom = -shadowSpan.v;
      sc.updateProjectionMatrix();
      scene.fog.far = q.drawDistance * 1.4;
      scene.fog.near = q.drawDistance * 0.3;
      sun.shadow.radius = q.name === 'high' ? 2 : 1.5;
      cloudCount = CLOUD_N[q.name] || 18;
      applyClouds();
    },
    // Gewitter stärker/schwächer (0 = beruhigt)
    setStorm(v) { storm.intensity = Math.max(0, Math.min(1, v)); },
    update(dt, t, camera, focus, veil) {
      if (!time.paused) {
        const secPerHour = (time.cycleSeconds / W_TOTAL) * hourWeight(time.hour);
        time.hour = (time.hour + (dt * time.speed) / secPerHour) % 24;
      }
      if (veil && veilRef !== veil) sky.attachVeil(veil);
      apply();
      domeU.uTime.value = t;
      dome.position.copy(camera.position);
      dome.scale.setScalar(camera.far * 0.92);
      if (focus) placeShadow(focus);
      // Sonnenrichtung im Sichtraum (Nebel-Streuung, Kantenlicht, Transluzenz)
      if (veil) {
        veil.uniforms.uFogSunDir.value.copy(sunDir).transformDirection(camera.matrixWorldInverse);
        veil.uniforms.uSunDirView.value.copy(lightDir).transformDirection(camera.matrixWorldInverse);
      }
      // Wolken: langsame Drift, leichtes Atmen
      clouds.rotation.y += dt * 0.004;
      for (const c of cloudList) c.position.y += Math.sin(t * 0.2 + c.userData.bob) * dt * 0.3;
      // Gewitter
      stormGroup.rotation.y += dt * 0.012;
      curtainMat.uniforms.uTime.value = t;
      curtainMat.uniforms.uAmt.value = storm.intensity;
      stormGroup.visible = storm.intensity > 0.02;
      const camD = Math.hypot(camera.position.x - storm.x, camera.position.z - storm.z);
      if (storm.intensity > 0.05) {
        storm.next -= dt;
        if (storm.next <= 0) {
          storm.next = (2.5 + rnd() * 6) / storm.intensity;
          storm.flash = 1;
          if (storm.bolt) { scene.remove(storm.bolt); storm.bolt.traverse((o) => o.geometry && o.geometry.dispose()); }
          storm.bolt = makeBolt();
          storm.bolt.position.set(storm.x, 0, storm.z);
          scene.add(storm.bolt);
          storm.boltT = 0.22;
          if (audio && camD < 220) {
            const delay = Math.min(2.5, camD / 120);
            setTimeout(() => audio.play('thunder', { volume: Math.max(0.15, 1 - camD / 220) * storm.intensity }), delay * 1000);
          }
        }
      }
      if (storm.bolt) {
        storm.boltT -= dt;
        const k = Math.max(0, storm.boltT / 0.22) * (0.6 + 0.4 * Math.sin(t * 90));
        boltMat.opacity = k;
        boltHullMat.opacity = k * 0.5;
        if (storm.boltT <= 0) { scene.remove(storm.bolt); storm.bolt.traverse((o) => o.geometry && o.geometry.dispose()); storm.bolt = null; }
      }
      storm.flash = Math.max(0, storm.flash - dt * 5);
      const flicker = storm.flash * (0.6 + 0.4 * Math.sin(t * 70));
      stormMat.emissive.copy(stormEmissiveBase).lerp(stormEmissiveFlash, Math.min(1, flicker * storm.intensity));
      stormMat.emissiveIntensity = 0.5 + state.night * 0.1 + flicker * 1.4 * storm.intensity;
      const near = 1 - Math.min(1, Math.max(0, (camD - storm.r * 0.6) / (storm.r * 0.9)));
      domeU.uFlash.value = flicker * near * 0.25 * storm.intensity;
      hemi.intensity += flicker * near * 1.5 * storm.intensity;
      // Regen
      rainU.uAmt.value = near * storm.intensity;
      rain.visible = rainU.uAmt.value > 0.02;
      rainU.uTime.value = t;
      rainU.uCam.value.copy(camera.position);
      if (audio) audio.setAmbience({ night: state.night, day: 1 - state.night, wind: 0.4 + near * 0.6 * storm.intensity });
    },
  };
  return sky;
}

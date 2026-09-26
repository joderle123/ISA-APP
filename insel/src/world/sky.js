// Himmel, Licht und Tag-Nacht-Zyklus: Farbverlauf-Kuppel mit Sonne, Mond und Sternen,
// Low-Poly-Wolken, Dauergewitter über den Sturmklippen, Sonne (Schatten) + Hemisphärenlicht.
import * as THREE from 'three';
import { part, merge } from './geom.js';
import { mulberry32 } from './noise.js';

// Schlüsselbilder: Stunde, Himmel oben, Horizont, Lichtfarbe, Lichtstärke, Hemi-Himmel, Hemi-Boden, Hemi-Stärke,
// Sonnen-Dunst, Dunst-Stärke, Belichtung, Nacht (Sterne)
const KEYS = [
  [0.0, '#070b24', '#1b2352', '#9fb4ff', 0.9, '#4a5aa0', '#1c1f3a', 1.25, '#2a2f66', 0.2, 1.45, 1],
  [4.9, '#0a0f2c', '#232a5c', '#9fb4ff', 0.8, '#4a5aa0', '#1c1f3a', 1.25, '#3a3470', 0.3, 1.45, 1],
  [5.6, '#28306e', '#e38a8a', '#ff9d7a', 0.4, '#7078b8', '#3a3040', 1.3, '#ff9a7a', 0.8, 1.25, 0.5],
  [6.5, '#4a78c8', '#ffc08a', '#ffc58a', 2.2, '#9fb8e8', '#7a6a58', 1.5, '#ffb070', 0.9, 1.08, 0],
  [8.5, '#3d8be0', '#bde3f7', '#fff2dc', 3.0, '#bcdcff', '#8a9870', 1.7, '#fff0d0', 0.35, 1.0, 0],
  [12.0, '#2f7fe0', '#b5e0f8', '#ffffff', 3.2, '#c8e4ff', '#8aa070', 1.8, '#fff8e8', 0.3, 1.0, 0],
  [15.5, '#3582dc', '#c3e2f4', '#fff4dc', 3.1, '#c0dcff', '#90a070', 1.8, '#fff0d0', 0.35, 1.04, 0],
  [17.0, '#4a78cc', '#ffd49c', '#ffc27a', 3.1, '#a8c0f0', '#b08a68', 1.9, '#ffb566', 0.95, 1.12, 0],
  [17.8, '#3a5aa8', '#ffa066', '#ff9452', 2.5, '#9098d8', '#a06a58', 1.75, '#ff8040', 1.0, 1.16, 0],
  [18.5, '#2a3280', '#e8667a', '#ff7058', 0.6, '#7068b0', '#503848', 1.35, '#ff6a5a', 0.8, 1.2, 0.2],
  [19.4, '#141a52', '#5a3f86', '#a9b8ff', 0.6, '#4a5298', '#22223e', 1.25, '#7a4a8a', 0.4, 1.35, 0.8],
  [20.4, '#070b24', '#1b2352', '#9fb4ff', 0.9, '#4a5aa0', '#1c1f3a', 1.25, '#2a2f66', 0.2, 1.45, 1],
  [24.0, '#070b24', '#1b2352', '#9fb4ff', 0.9, '#4a5aa0', '#1c1f3a', 1.25, '#2a2f66', 0.2, 1.45, 1],
];
const hexToV = (h) => { const n = parseInt(h.slice(1), 16); return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; };
const KEYV = KEYS.map((k) => k.map((v) => (typeof v === 'string' ? hexToV(v) : v)));

// Zeitgewicht: langsame goldene Stunde, schnelle Nacht
function hourWeight(h) {
  if (h >= 16.0 && h < 18.6) return 4;      // lange goldene Stunde (~5 Minuten)
  if (h >= 20.5 || h < 4.8) return 0.45;    // kurze Nacht (~2 Minuten)
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
const DOME_FRAG = /* glsl */`
uniform vec3 uTop;
uniform vec3 uHorizon;
uniform vec3 uSunDir;
uniform vec3 uMoonDir;
uniform vec3 uGlow;
uniform float uGlowAmt;
uniform float uNight;
uniform float uTime;
uniform float uSunVis;
uniform float uFlash;
varying vec3 vDir;
float hash13(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
void main() {
  vec3 d = normalize(vDir);
  float y = d.y;
  float t = 1.0 - exp(-max(y, 0.0) * 5.5);
  vec3 col = mix(uHorizon, uTop, t);
  // heller Dunststreifen direkt am Horizont
  col = mix(col, uHorizon * 1.08, exp(-max(y, 0.0) * 30.0) * 0.5);
  // Dunst um die Sonne (gleich wie im Nebel)
  float s = max(dot(d, uSunDir), 0.0);
  float hz = 1.0 - smoothstep(-0.05, 0.55, y) * 0.75;
  col = mix(col, uGlow, pow(s, 4.0) * uGlowAmt * hz);
  col += uGlow * pow(s, 40.0) * 0.35 * uSunVis;
  // Sonnenscheibe
  float disc = smoothstep(0.99935, 0.99965, s);
  col = mix(col, vec3(1.0, 0.97, 0.86), disc * uSunVis);
  // Sterne
  if (uNight > 0.01 && y > 0.0) {
    vec3 p = d * 220.0;
    vec3 c = floor(p);
    float h = hash13(c);
    if (h > 0.975) {
      vec3 f = fract(p) - 0.5;
      float st = smoothstep(0.22, 0.0, length(f)) * (0.6 + 0.4 * sin(uTime * (2.0 + h * 5.0) + h * 50.0));
      col += vec3(0.9, 0.95, 1.0) * st * uNight * smoothstep(0.02, 0.25, y) * (h - 0.975) * 40.0;
    }
    // Milchstraße (dezent)
    float band = exp(-pow(dot(d, normalize(vec3(0.4, 0.3, 0.86))) * 4.0, 2.0));
    col += vec3(0.25, 0.22, 0.4) * band * uNight * 0.25 * smoothstep(0.0, 0.3, y);
  }
  // Mond
  float m = max(dot(d, uMoonDir), 0.0);
  float mdisc = smoothstep(0.99905, 0.9993, m);
  col += vec3(0.25, 0.3, 0.45) * pow(m, 60.0) * uNight;
  col = mix(col, vec3(0.95, 0.95, 0.88), mdisc * uNight);
  // unter dem Horizont = Horizontfarbe (wie Nebel)
  col = mix(col, uHorizon, smoothstep(0.0, -0.06, y));
  col += vec3(0.5, 0.55, 0.7) * uFlash;
  gl_FragColor = vec4(col, 1.0);
}`;

function makeCloud(rnd, dark) {
  const parts = [];
  const n = 5 + Math.floor(rnd() * 5);
  const len = 16 + rnd() * 26;
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const r = (5 + rnd() * 6) * (1 - Math.abs(t - 0.5) * 0.9);
    const g = new THREE.IcosahedronGeometry(r, rnd() > 0.5 ? 1 : 0);
    parts.push(part(g, {
      pos: [(t - 0.5) * len, r * 0.25 + rnd() * 2.5, (rnd() - 0.5) * 9],
      scale: [1.2, 0.7 + rnd() * 0.2, 1],
      jitter: r * 0.25, seed: Math.floor(rnd() * 1000),
      deform: (v) => { if (v.y < -r * 0.15) v.y = -r * 0.15 - (v.y + r * 0.15) * 0.1; },
      color: '#ffffff',
    }));
  }
  return merge(parts);
}

export function createSky({ scene, renderer, audio, quality, events }) {
  const sunDir = new THREE.Vector3(0, 1, 0);
  const moonDir = new THREE.Vector3(0, 1, 0);
  const lightDir = new THREE.Vector3(0, 1, 0);

  // ---- Kuppel ----
  const domeU = {
    uTop: { value: new THREE.Vector3() }, uHorizon: { value: new THREE.Vector3() },
    uSunDir: { value: sunDir }, uMoonDir: { value: moonDir },
    uGlow: { value: new THREE.Vector3() }, uGlowAmt: { value: 1 },
    uNight: { value: 0 }, uTime: { value: 0 }, uSunVis: { value: 1 }, uFlash: { value: 0 },
  };
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(1, 48, 24),
    new THREE.ShaderMaterial({ vertexShader: DOME_VERT, fragmentShader: DOME_FRAG, uniforms: domeU, side: THREE.BackSide, depthWrite: false, depthTest: true, toneMapped: false, fog: false }),
  );
  dome.renderOrder = -10;
  dome.frustumCulled = false;
  dome.name = 'sky';
  scene.add(dome);

  // ---- Licht ----
  const sun = new THREE.DirectionalLight(0xffffff, 3);
  sun.castShadow = quality.shadows;
  sun.shadow.mapSize.set(quality.shadowSize || 1024, quality.shadowSize || 1024);
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.06;
  sun.shadow.radius = 2;
  const shadowSpan = { v: quality.name === 'high' ? 70 : 52 };
  const sc = sun.shadow.camera;
  sc.near = 1; sc.far = 420;
  sc.left = -shadowSpan.v; sc.right = shadowSpan.v; sc.top = shadowSpan.v; sc.bottom = -shadowSpan.v;
  scene.add(sun, sun.target);
  const hemi = new THREE.HemisphereLight(0xbfdfff, 0x8a9a70, 1.5);
  scene.add(hemi);

  // ---- Nebel ----
  scene.fog = new THREE.Fog(0xffd0a0, 120, quality.drawDistance);

  // ---- Wolken ----
  const rnd = mulberry32(99);
  const cloudMat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, emissive: new THREE.Color('#ffffff'), emissiveIntensity: 0.25, fog: false });
  const clouds = new THREE.Group();
  clouds.name = 'clouds';
  for (let i = 0; i < 20; i++) {
    const g = makeCloud(rnd, false);
    const m = new THREE.Mesh(g, cloudMat);
    const a = rnd() * Math.PI * 2;
    const r = i < 5 ? 60 + rnd() * 110 : 190 + rnd() * 240;
    m.position.set(Math.cos(a) * r, 78 + rnd() * 50 + (r > 300 ? 20 : 0), Math.sin(a) * r);
    m.rotation.y = rnd() * Math.PI;
    m.scale.setScalar(0.8 + rnd() * 0.7);
    m.userData.bob = rnd() * 10;
    clouds.add(m);
  }
  scene.add(clouds);

  // ---- Dauergewitter über den Sturmklippen ----
  const storm = { x: -100, z: -100, r: 55, intensity: 1, flash: 0, next: 3, bolt: null, boltT: 0 };
  const stormMat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, emissive: new THREE.Color('#3a3646'), emissiveIntensity: 0.4, fog: false });
  const stormEmissiveBase = new THREE.Color('#2e2a38'), stormEmissiveFlash = new THREE.Color('#c8ceff');
  const stormGroup = new THREE.Group();
  stormGroup.position.set(storm.x, 0, storm.z);
  // Gewitterturm: breite dunkle Basis + aufgetürmte, oben hellere Wolkenballen
  {
    const parts = [];
    const dark = new THREE.Color('#3f3b4c'), light = new THREE.Color('#b3adc2');
    const colFn = (x, y, z, out) => out.copy(dark).lerp(light, THREE.MathUtils.smoothstep(y, 42, 100));
    for (let i = 0; i < 13; i++) {
      const a = rnd() * Math.PI * 2, r = 6 + rnd() * 30;
      const R = 8 + rnd() * 7;
      parts.push(part(new THREE.IcosahedronGeometry(R, 1), {
        pos: [Math.cos(a) * r, 43 + rnd() * 7, Math.sin(a) * r], scale: [1.35, 0.8, 1.35], jitter: R * 0.3, seed: 200 + i,
        deform: (v) => { if (v.y < -R * 0.3) v.y = -R * 0.3; }, color: colFn,
      }));
    }
    for (let i = 0; i < 16; i++) {
      const t = i / 15;
      const a = rnd() * Math.PI * 2, r = (1 - t) * 12 + rnd() * 6;
      const R = 15 - t * 5 + rnd() * 4;
      parts.push(part(new THREE.IcosahedronGeometry(R, 1), {
        pos: [Math.cos(a) * r, 52 + t * 34, Math.sin(a) * r], scale: [1.2, 0.9, 1.2], jitter: R * 0.3, seed: 300 + i, color: colFn,
      }));
    }
    // Amboss oben
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + rnd(), r = 10 + rnd() * 12;
      parts.push(part(new THREE.IcosahedronGeometry(11 + rnd() * 3, 1), {
        pos: [Math.cos(a) * r, 90 + rnd() * 4, Math.sin(a) * r], scale: [1.7, 0.45, 1.7], jitter: 3, seed: 400 + i, color: colFn,
      }));
    }
    const tower = new THREE.Mesh(merge(parts), stormMat);
    stormGroup.add(tower);
  }
  // Regenvorhänge (aus der Ferne sichtbar)
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
        float col = floor(vUv.x * 90.0);
        float s = fract(vUv.y * 3.0 + uTime * (1.6 + h1(col) * 0.8) + h1(col + 7.0));
        float streak = smoothstep(0.6, 1.0, s) * (0.4 + h1(col + 3.0) * 0.6);
        float a = (0.16 + streak * 0.22) * smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
        a *= smoothstep(12.0, 45.0, vDist) * uAmt;
        gl_FragColor = vec4(vec3(0.52, 0.55, 0.66), a);
      }`,
    transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false,
  });
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.3, r = i === 0 ? 0 : 20 + rnd() * 10;
    const c = new THREE.Mesh(new THREE.CylinderGeometry(9 + rnd() * 5, 12 + rnd() * 5, 48, 16, 1, true), curtainMat);
    c.position.set(Math.cos(a) * r, 22, Math.sin(a) * r);
    c.renderOrder = 5;
    stormGroup.add(c);
  }
  scene.add(stormGroup);
  const boltMat = new THREE.MeshBasicMaterial({ color: '#e8ecff', transparent: true, opacity: 1, fog: false, toneMapped: false });
  function makeBolt() {
    const pts = [];
    let x = (rnd() - 0.5) * 50, z = (rnd() - 0.5) * 50, y = 56;
    const ground = 20;
    while (y > ground) {
      const ny = y - 3 - rnd() * 5;
      const nx = x + (rnd() - 0.5) * 6, nz = z + (rnd() - 0.5) * 6;
      pts.push([x, y, z, nx, Math.max(ny, ground), nz]);
      x = nx; y = ny; z = nz;
    }
    const parts = pts.map(([ax, ay, az, bx, by, bz]) => {
      const len = Math.hypot(bx - ax, by - ay, bz - az);
      const g = new THREE.CylinderGeometry(0.25, 0.35, len, 4, 1);
      const m = new THREE.Mesh(g, boltMat);
      m.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
      m.lookAt(bx, by, bz);
      m.rotateX(Math.PI / 2);
      return m;
    });
    const grp = new THREE.Group();
    parts.forEach((p) => grp.add(p));
    return grp;
  }

  // Regen (Linien relativ zur Kamera)
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
        p.y = mod(p.y - uTime * 28.0, 40.0) - 14.0 - aEnd * 1.3;
        p.x += aEnd * 0.35;
        vec3 w = uCam + p;
        vA = (1.0 - aEnd * 0.6) * (1.0 - smoothstep(12.0, 30.0, length(p.xz)));
        gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform float uAmt; varying float vA;
      void main() { gl_FragColor = vec4(0.75, 0.8, 0.95, 0.45 * vA * uAmt); }`,
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
  const state = { night: 0, exposure: 1 };
  const tmpA = new THREE.Color(), tmpB = new THREE.Color();
  const cTop = [0, 0, 0], cHor = [0, 0, 0], cLight = [0, 0, 0], cHS = [0, 0, 0], cHG = [0, 0, 0], cGlow = [0, 0, 0];
  let lightI = 3, hemiI = 1.5, glowAmt = 1;

  function sample(h) {
    let i = 0;
    while (i < KEYV.length - 2 && KEYV[i + 1][0] <= h) i++;
    const a = KEYV[i], b = KEYV[i + 1];
    const t = Math.max(0, Math.min(1, (h - a[0]) / (b[0] - a[0] || 1)));
    const s = t * t * (3 - 2 * t);
    const L = (k, out) => { for (let j = 0; j < 3; j++) out[j] = a[k][j] + (b[k][j] - a[k][j]) * s; };
    L(1, cTop); L(2, cHor); L(3, cLight); L(5, cHS); L(6, cHG); L(8, cGlow);
    lightI = a[4] + (b[4] - a[4]) * s;
    hemiI = a[7] + (b[7] - a[7]) * s;
    glowAmt = a[9] + (b[9] - a[9]) * s;
    state.exposure = a[10] + (b[10] - a[10]) * s;
    state.night = a[11] + (b[11] - a[11]) * s;
  }

  const colors = {
    horizon: new THREE.Color(), top: new THREE.Color(), light: new THREE.Color(), glow: new THREE.Color(),
    hemiSky: new THREE.Color(), hemiGround: new THREE.Color(), ambient: new THREE.Color(),
  };
  const setS = (c, v) => c.setRGB(v[0], v[1], v[2], THREE.SRGBColorSpace);

  function apply() {
    const h = time.hour;
    sample(h);
    const a = ((h - 6) / 12) * Math.PI;
    sunDir.set(Math.cos(a) * 0.92, Math.sin(a) * 0.8, Math.sin(a) * 0.4).normalize();
    moonDir.set(-Math.cos(a) * 0.8, Math.max(-Math.sin(a) * 0.75, -0.3), 0.35).normalize();
    const sunUp = sunDir.y > -0.01;
    lightDir.copy(sunUp ? sunDir : moonDir);
    if (lightDir.y < 0.12) { lightDir.y = 0.12; lightDir.normalize(); }
    // Übergang Sonne/Mond: Licht kurz abblenden
    const el = sunDir.y;
    const dip = Math.min(1, Math.abs(el) / 0.07);

    setS(colors.top, cTop); setS(colors.horizon, cHor); setS(colors.light, cLight);
    setS(colors.glow, cGlow); setS(colors.hemiSky, cHS); setS(colors.hemiGround, cHG);
    sun.color.copy(colors.light);
    sun.intensity = lightI * (0.15 + 0.85 * dip);
    hemi.color.copy(colors.hemiSky);
    hemi.groundColor.copy(colors.hemiGround);
    hemi.intensity = hemiI;
    scene.fog.color.copy(colors.horizon);
    renderer.toneMappingExposure = state.exposure;
    domeU.uTop.value.set(cTop[0], cTop[1], cTop[2]);
    domeU.uHorizon.value.set(cHor[0], cHor[1], cHor[2]);
    domeU.uGlow.value.set(cGlow[0], cGlow[1], cGlow[2]);
    domeU.uGlowAmt.value = glowAmt;
    domeU.uNight.value = state.night;
    domeU.uSunVis.value = Math.max(0, Math.min(1, (sunDir.y + 0.03) * 12));
    // Wolkenfarbe
    cloudMat.emissive.copy(colors.horizon).lerp(colors.glow, 0.3);
    cloudMat.emissiveIntensity = 0.35 + state.night * 0.1;
    // ambient-Näherung für eigene Shader (linear)
    colors.ambient.copy(colors.hemiSky).lerp(colors.hemiGround, 0.35).multiplyScalar(hemiI * 0.35);
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

  const sky = {
    dome, sun, hemi, clouds, storm, rain, time, colors, sunDir, moonDir, lightDir,
    get night() { return state.night; },
    setQuality(q) {
      sun.castShadow = q.shadows;
      if (q.shadows) {
        const s = q.shadowSize;
        if (sun.shadow.mapSize.x !== s) {
          sun.shadow.mapSize.set(s, s);
          if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map = null; }
        }
      }
      shadowSpan.v = q.name === 'high' ? 70 : 52;
      sc.left = -shadowSpan.v; sc.right = shadowSpan.v; sc.top = shadowSpan.v; sc.bottom = -shadowSpan.v;
      sc.updateProjectionMatrix();
      scene.fog.far = q.drawDistance;
      scene.fog.near = q.drawDistance * 0.22;
    },
    // Gewitter stärker/schwächer (0 = beruhigt)
    setStorm(v) { storm.intensity = Math.max(0, Math.min(1, v)); },
    update(dt, t, camera, focus, veil) {
      if (!time.paused) {
        const secPerHour = (time.cycleSeconds / W_TOTAL) * hourWeight(time.hour);
        time.hour = (time.hour + (dt * time.speed) / secPerHour) % 24;
      }
      apply();
      domeU.uTime.value = t;
      dome.position.copy(camera.position);
      dome.scale.setScalar(camera.far * 0.92);
      if (focus) placeShadow(focus);
      // Nebel-Sonnenrichtung im Sichtraum (für veil.lumoFog)
      if (veil) {
        veil.uniforms.uFogSunDir.value.copy(sunDir).transformDirection(camera.matrixWorldInverse);
        veil.uniforms.uFogSunAmt.value = glowAmt;
        // Nebel wird nach der Farbraum-Umwandlung gemischt: rohe sRGB-Werte
        veil.uniforms.uFogSunColor.value.setRGB(cGlow[0], cGlow[1], cGlow[2], THREE.LinearSRGBColorSpace);
      }
      // Wolken
      clouds.rotation.y += dt * 0.004;
      for (const c of clouds.children) c.position.y += Math.sin(t * 0.2 + c.userData.bob) * dt * 0.3;
      // Gewitter
      stormGroup.rotation.y += dt * 0.03;
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
        boltMat.opacity = Math.max(0, storm.boltT / 0.22) * (0.6 + 0.4 * Math.sin(t * 90));
        if (storm.boltT <= 0) { scene.remove(storm.bolt); storm.bolt.traverse((o) => o.geometry && o.geometry.dispose()); storm.bolt = null; }
      }
      storm.flash = Math.max(0, storm.flash - dt * 5);
      const flicker = storm.flash * (0.6 + 0.4 * Math.sin(t * 70));
      stormMat.emissive.copy(stormEmissiveBase).lerp(stormEmissiveFlash, Math.min(1, flicker * storm.intensity));
      stormMat.emissiveIntensity = 0.35 + flicker * 1.3 * storm.intensity;
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

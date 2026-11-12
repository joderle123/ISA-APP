// Aura (WP17): Empathie-Blick-Darstellung an einer Figur.
//   Zwei Gefühlsfarben als Wirbel (Doppel-Aura ab e10), Intensitätsringe 0–10, Innen-/Außen-Aura (Masken-Blick e28),
//   Grenz-Decal am Boden (Grenz-Radien e22), Körpersignal-Hotspots (e09), 6 Tank-Säulen (e04), Streit-Tier-Symbol (e24),
//   Gefühls-Symbole für Farbenblinde (Sonne, Flamme, Zickzack, Tropfen, Wirbel, Stern) als Sprite über dem Kopf.
//   const aura = createAura({ group, joints }); aura.setEmotion({ emotion:'wut', intensity:7 }, { emotion:'angst', intensity:3 })
//   aura.setInner({…}) · setMaskView(true) · setBoundary(1.8, { color }) · setHotspots(['bauch','faeuste']) · setTanks({ koerper:0.7, … })
//   aura.setStreitTier('hai') · setSymbols(false) · setColors({ wut:'#…' }) · clear() · update(dt, camera) · dispose()
//   Kompatibel: setColor(hex|null) (alte setEmotionAura). Alles Prozedurale, ein Shader-Programm für alle Auren.
import * as THREE from 'three';
import { hasDOM } from './base.js';

export const EMOTION_COLORS = { freude: '#ffd23f', wut: '#ff4d4d', angst: '#9b6bff', trauer: '#4d8cff', ekel: '#5ad24f', ueberraschung: '#2de2c9' };
export const EMOTION_SYMBOLS = { freude: 'sonne', wut: 'flamme', angst: 'zickzack', trauer: 'tropfen', ekel: 'wirbel', ueberraschung: 'stern' };
export const TANK_ORDER = ['koerper', 'sicherheit', 'zugehoerigkeit', 'anerkennung', 'selbstbestimmung', 'spass'];
export const TANK_COLORS = { koerper: '#ff8a3d', sicherheit: '#3e78e0', zugehoerigkeit: '#ff4f8b', anerkennung: '#ffd166', selbstbestimmung: '#6c4bd6', spass: '#2de2c9' };
export const STREIT_TIERE = ['hai', 'schildkroete', 'teddy', 'fuchs', 'eule'];
// Symbolpfade (24×24, wie die UI-Icons) – Gefühle wie ui/icons.js, dazu die fünf Streit-Tiere
export const SYMBOL_PATHS = {
  sonne: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2',
  flamme: 'M12 21c-4 0-7-3-7-7 0-3 2-5 3-7 1 2 2 3 3 3 0-3 1-6 3-8 1 4 5 6 5 12 0 4-3 7-7 7zM12 21c-2 0-3-2-3-4s2-3 3-5c1 2 3 3 3 5s-1 4-3 4z',
  zickzack: 'M13 2L6 13h6l-1 9 7-12h-6z',
  tropfen: 'M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z',
  wirbel: 'M12 12a1 1 0 0 1 2 0c0 2-2 3-4 3-3 0-5-2-5-5 0-4 3-7 7-7 5 0 9 4 9 9 0 6-5 10-11 10',
  stern: 'M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 17l-5.6 3 1.3-6.2L3 9.5l6.3-.7z',
  hai: 'M3 14c4-3 8-4 12-4l3-5 1 6c2 1 3 2 3 3-6 2-13 3-19 0zM9 13l1 3M14 12l1 3',
  schildkroete: 'M5 14c0-4 3-7 7-7s7 3 7 7H5zM3 14h18M6 14l-1 3M18 14l1 3M12 7V5M9 14l1-4 2-1 2 1 1 4',
  teddy: 'M7 5a2 2 0 1 0 0 4M17 5a2 2 0 1 1 0 4M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM10 11h.01M14 11h.01M10 15c1 1 3 1 4 0',
  fuchs: 'M4 5l4 4h8l4-4-1 9c0 4-3 7-7 7s-7-3-7-7zM9 12h.01M15 12h.01M12 15l-1 1h2z',
  eule: 'M12 4c-5 0-7 4-7 8s2 8 7 8 7-4 7-8-2-8-7-8zM9 11a1.5 1.5 0 1 0 0 .1M15 11a1.5 1.5 0 1 0 0 .1M12 13l-1 2h2zM7 6l-2-2M17 6l2-2',
};
// Intensität 0–10 → Anzahl laufender Ringe (1…6) und Helligkeit (0,6…1,4)
export const ringsFor = (i) => 1 + Math.round(Math.max(0, Math.min(10, Number(i) || 0)) * 0.5);
export const glowFor = (i) => 0.6 + Math.max(0, Math.min(10, Number(i) || 0)) * 0.08;

// ---- Shader (ein Programm für alle Auren) ----
const VERT = /* glsl */`
  varying vec3 vN; varying vec3 vV; varying float vY; varying float vAng;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    vY = position.y;
    vAng = atan(position.x, position.z);
    gl_Position = projectionMatrix * mv;
  }`;
const FRAG = /* glsl */`
  uniform vec3 uColorA; uniform vec3 uColorB; uniform float uMix; uniform float uTime; uniform float uAlpha;
  uniform float uRings; uniform float uGlow;
  varying vec3 vN; varying vec3 vV; varying float vY; varying float vAng;
  void main() {
    // Fresnel-betonter Rand (STIL §10.5): Fläche höchstens 0.12, Rand höchstens 0.55 – das Gesicht bleibt frei lesbar
    float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 3.2);
    float swirl = 0.5 + 0.5 * sin(vAng * 2.0 + vY * 4.5 - uTime * 1.7);
    vec3 col = mix(uColorA, uColorB, swirl * uMix);
    float ring = 0.62 + 0.38 * smoothstep(0.3, 0.7, fract(vY * uRings * 0.8 - uTime * 0.35));
    float a = f * ring * uAlpha * (0.32 + 0.18 * sin(uTime * 2.2)) + uAlpha * 0.08 * (0.4 + 0.6 * f);
    gl_FragColor = vec4(col * uGlow * 1.35, min(a, 0.55 * uAlpha));
  }`;
function auraMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uColorA: { value: new THREE.Color('#ffd166') }, uColorB: { value: new THREE.Color('#ffd166') }, uMix: { value: 0 }, uTime: { value: 0 }, uAlpha: { value: 0 }, uRings: { value: 2 }, uGlow: { value: 1 } },
    vertexShader: VERT, fragmentShader: FRAG,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  });
}

// ---- Symbol-Texturen (Canvas, je Symbol+Farbe einmal) ----
const TEX = new Map();
export function symbolTexture(symbol, color = '#ffffff', { size = 128 } = {}) {
  if (!hasDOM) return null;
  const key = symbol + '|' + color;
  if (TEX.has(key)) return TEX.get(key);
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const r = size / 2;
  g.beginPath(); g.arc(r, r, r * 0.94, 0, Math.PI * 2); g.fillStyle = 'rgba(20,12,40,0.82)'; g.fill();
  g.lineWidth = size * 0.06; g.strokeStyle = color; g.stroke();
  const d = SYMBOL_PATHS[symbol];
  if (d && typeof Path2D !== 'undefined') {
    g.save();
    g.translate(size * 0.2, size * 0.2); g.scale(size * 0.6 / 24, size * 0.6 / 24);
    g.lineWidth = 2.2; g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = '#ffffff';
    g.stroke(new Path2D(d));
    g.restore();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  TEX.set(key, t);
  return t;
}
function makeSprite(symbol, color, scale = 0.36) {
  const map = symbolTexture(symbol, color);
  if (!map) return null;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map, transparent: true, depthWrite: false, depthTest: true }));
  s.scale.set(scale, scale, 1);
  s.renderOrder = 16;
  return s;
}

// Geteilte einfache Materialien
let SHARED = null;
function shared() {
  if (SHARED) return SHARED;
  SHARED = {
    hot: new THREE.MeshBasicMaterial({ color: '#ffb347', transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
    tank: new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.92, depthWrite: false, toneMapped: false }),
  };
  return SHARED;
}
const HOTSPOTS = {
  bauch: { joint: 'spine', pos: [0, 0.24, 0.17], r: 0.05 },
  faeuste: { joint: ['wristL', 'wristR'], pos: [0, -0.05, 0.02], r: 0.045 },
  schultern: { joint: ['shL', 'shR'], pos: [0, 0.03, 0], r: 0.045 },
  kiefer: { joint: 'head', pos: [0, -0.08, 0.12], r: 0.035 },
  brust: { joint: 'spine', pos: [0, 0.42, 0.15], r: 0.05 },
  kopf: { joint: 'head', pos: [0, 0.14, 0.05], r: 0.045 },
};
export const HOTSPOT_NAMES = Object.keys(HOTSPOTS);

// Ring am Boden mit zwei Farben um den Umfang (Vertexfarben) – optional gestrichelt (Grenz-Decal)
function ringGeo(r0, r1, colA, colB, { dashed = false, segments = 40 } = {}) {
  const g = new THREE.RingGeometry(r0, r1, segments, 1).rotateX(-Math.PI / 2);
  const pos = g.attributes.position, n = pos.count;
  const col = new Float32Array(n * 3);
  const A = new THREE.Color(colA), B = new THREE.Color(colB), c = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const a = Math.atan2(pos.getZ(i), pos.getX(i));
    const t = 0.5 + 0.5 * Math.sin(a * 2);
    c.copy(A).lerp(B, t);
    if (dashed && Math.floor(((a + Math.PI) / (Math.PI * 2)) * segments) % 2) c.set(0, 0, 0);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return g;
}

export function createAura({ group, joints, colors = {} } = {}) {
  const cols = { ...EMOTION_COLORS, ...colors };
  const root = new THREE.Group();
  root.name = 'aura';
  if (group) group.add(root);
  const mat = auraMaterial();
  const shell = new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 1.15, 4, 12), mat);
  shell.position.y = 1.0; shell.visible = false; shell.renderOrder = 15;
  root.add(shell);
  const innerMat = auraMaterial();
  const inner = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.9, 4, 10), innerMat);
  inner.position.y = 1.0; inner.visible = false; inner.renderOrder = 14;
  root.add(inner);
  const ringMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  const ring = new THREE.Mesh(ringGeo(0.62, 0.8, '#ffd166', '#ffd166'), ringMat);
  ring.position.y = 0.05; ring.visible = false;
  root.add(ring);
  const boundMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  let bound = null, boundR = 0, boundTarget = 0, boundAmt = 0;
  const symbols = new THREE.Group(); symbols.position.y = 2.12; root.add(symbols);
  let symA = null, symB = null, tierSprite = null, tierId = null;
  let hotMeshes = [];
  let tanks = null;

  let target = 0, amount = 0, time = 0, symbolsOn = true, maskView = false;
  let state = { primary: null, secondary: null, inner: null };
  const cA = new THREE.Color(), cB = new THREE.Color();

  function applyColors() {
    const p = state.primary, s = state.secondary;
    if (!p) return;
    cA.set(p.color || cols[p.emotion] || '#ffd166');
    cB.set(s ? (s.color || cols[s.emotion] || cA.getHex()) : cA.getHex());
    mat.uniforms.uColorA.value.copy(cA); mat.uniforms.uColorB.value.copy(cB);
    mat.uniforms.uMix.value = s ? 1 : 0;
    const inten = Math.max(p.intensity === undefined ? 5 : p.intensity, s ? (s.intensity === undefined ? 5 : s.intensity) : 0);
    mat.uniforms.uRings.value = ringsFor(inten);
    mat.uniforms.uGlow.value = glowFor(inten);
    ring.geometry.dispose(); ring.geometry = ringGeo(0.62, 0.8, cA, cB);
    syncSymbols();
  }
  function syncSymbols() {
    for (const s of [symA, symB]) if (s) { symbols.remove(s); s.material.dispose(); }
    symA = symB = null;
    if (!symbolsOn || !state.primary) return;
    const mk = (e, x) => { const sym = e.symbol || EMOTION_SYMBOLS[e.emotion]; if (!sym) return null; const sp = makeSprite(sym, e.color || cols[e.emotion] || '#ffffff'); if (sp) { sp.position.x = x; symbols.add(sp); } return sp; };
    if (state.secondary) { symA = mk(state.primary, -0.2); symB = mk(state.secondary, 0.2); }
    else symA = mk(state.primary, 0);
  }
  function applyInner() {
    const i = state.inner;
    inner.visible = false;
    if (!i) return;
    innerMat.uniforms.uColorA.value.set(i.color || cols[i.emotion] || '#ffffff');
    innerMat.uniforms.uColorB.value.copy(innerMat.uniforms.uColorA.value);
    innerMat.uniforms.uMix.value = 0;
    innerMat.uniforms.uRings.value = ringsFor(i.intensity === undefined ? 5 : i.intensity);
    innerMat.uniforms.uGlow.value = glowFor(i.intensity === undefined ? 5 : i.intensity) * 1.2;
  }

  const api = {
    root, shell, inner, ring, symbols,
    get amount() { return amount; },
    get visible() { return amount > 0.01; },
    get state() { return { ...state, maskView, symbols: symbolsOn }; },
    colors: cols,
    setColors(map) { Object.assign(cols, map || {}); applyColors(); applyInner(); },
    // Haupt-Aura: primary { emotion|color, intensity 0–10, symbol? }, secondary (Doppel-Aura) oder null
    setEmotion(primary, secondary = null) {
      if (!primary) return api.clear();
      state.primary = { ...primary }; state.secondary = secondary ? { ...secondary } : null;
      applyColors();
      target = 1;
      return api;
    },
    // Kompatibel zur alten API: eine Farbe (oder null)
    setColor(color) { return color ? api.setEmotion({ color, intensity: 5, symbol: null }) : api.clear(); },
    clear() { target = 0; return api; },
    setInner(inner) { state.inner = inner ? { ...inner } : null; applyInner(); return api; },
    setMaskView(v) { maskView = !!v; return api; },
    setSymbols(v) { symbolsOn = !!v; syncSymbols(); return api; },
    setBoundary(radius, { color = '#ff6b6b' } = {}) {
      if (!radius) { boundTarget = 0; return api; }
      if (!bound) { bound = new THREE.Mesh(new THREE.BufferGeometry(), boundMat); bound.position.y = 0.04; bound.renderOrder = 5; root.add(bound); }
      if (Math.abs(boundR - radius) > 0.01) { boundR = radius; bound.geometry.dispose(); bound.geometry = ringGeo(radius - 0.06, radius, color, color, { dashed: true, segments: 48 }); }
      boundTarget = 1;
      return api;
    },
    get boundary() { return boundTarget ? boundR : 0; },
    setHotspots(names) {
      for (const m of hotMeshes) { if (m.parent) m.parent.remove(m); m.geometry.dispose(); }
      hotMeshes = [];
      if (!names || !joints) return api;
      for (const n of names) {
        const def = HOTSPOTS[n]; if (!def) continue;
        const js = Array.isArray(def.joint) ? def.joint : [def.joint];
        for (const j of js) {
          const J = joints[j]; if (!J) continue;
          const m = new THREE.Mesh(new THREE.IcosahedronGeometry(def.r, 1), shared().hot);
          m.position.set(def.pos[0], def.pos[1], def.pos[2]);
          m.userData.hot = n; m.renderOrder = 15;
          J.add(m); hotMeshes.push(m);
        }
      }
      return api;
    },
    get hotspots() { return [...new Set(hotMeshes.map((m) => m.userData.hot))]; },
    // Sechs Tank-Säulen über dem Kopf: { koerper: 0..1, … } oder null
    setTanks(levels) {
      if (tanks) { root.remove(tanks); tanks.geometry.dispose(); tanks = null; }
      if (!levels) return api;
      const geos = [];
      const W = 0.07, G = 0.025, H = 0.34, X0 = -((W + G) * 6 - G) / 2 + W / 2;
      const push = (g, color) => { const n = g.attributes.position.count, col = new Float32Array(n * 3), c = new THREE.Color(color); for (let i = 0; i < n; i++) { col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b; } g.setAttribute('color', new THREE.BufferAttribute(col, 3)); geos.push(g.toNonIndexed ? g.toNonIndexed() : g); };
      TANK_ORDER.forEach((id, i) => {
        const lv = Math.max(0, Math.min(1, Number(levels[id]) || 0));
        const x = X0 + i * (W + G);
        push(new THREE.BoxGeometry(W, H, 0.02).translate(x, H / 2, -0.012), '#1d1330');
        if (lv > 0.01) push(new THREE.BoxGeometry(W * 0.8, H * lv, 0.03).translate(x, (H * lv) / 2 + 0.01, 0), TANK_COLORS[id]);
      });
      const g = mergeGeos(geos);
      tanks = new THREE.Mesh(g, shared().tank);
      tanks.position.y = 2.45; tanks.renderOrder = 16;
      root.add(tanks);
      return api;
    },
    get tanks() { return !!tanks; },
    setStreitTier(id) {
      if (tierSprite) { root.remove(tierSprite); tierSprite.material.dispose(); tierSprite = null; }
      tierId = null;
      if (!id || !STREIT_TIERE.includes(id)) return api;
      tierId = id;
      tierSprite = makeSprite(id, '#ffd166', 0.42);
      if (tierSprite) { tierSprite.position.y = 2.55; root.add(tierSprite); }
      return api;
    },
    get streitTier() { return tierId; },
    update(dt, camera) {
      time += dt;
      amount += (target - amount) * Math.min(1, dt * 3);
      const on = amount > 0.01;
      shell.visible = ring.visible = on;
      symbols.visible = on && symbolsOn;
      if (on) {
        mat.uniforms.uTime.value = time;
        mat.uniforms.uAlpha.value = amount * (maskView && state.inner ? 0.45 : 1);
        ringMat.opacity = amount * (0.5 + 0.3 * Math.sin(time * 3));
        ring.scale.setScalar(1 + 0.08 * Math.sin(time * 2));
        symbols.position.y = 2.12 + Math.sin(time * 1.6) * 0.03;
        for (const s of [symA, symB]) if (s) s.material.opacity = amount;
      }
      inner.visible = on && maskView && !!state.inner;
      if (inner.visible) { innerMat.uniforms.uTime.value = time * 1.3; innerMat.uniforms.uAlpha.value = amount; }
      boundAmt += (boundTarget - boundAmt) * Math.min(1, dt * 4);
      if (bound) { bound.visible = boundAmt > 0.01; boundMat.opacity = boundAmt * 0.8; bound.rotation.y = time * 0.25; }
      const pulse = 1 + 0.2 * Math.sin(time * 6);
      for (const m of hotMeshes) m.scale.setScalar(pulse);
      if (tanks && camera) tanks.lookAt(camera.position.x - root.matrixWorld.elements[12] + tanks.position.x, tanks.position.y, camera.position.z - root.matrixWorld.elements[14] + tanks.position.z);
    },
    dispose() {
      shell.geometry.dispose(); inner.geometry.dispose(); ring.geometry.dispose(); mat.dispose(); innerMat.dispose(); ringMat.dispose(); boundMat.dispose();
      if (bound) bound.geometry.dispose();
      api.setHotspots(null); api.setTanks(null); api.setStreitTier(null);
      for (const s of [symA, symB]) if (s) s.material.dispose();
      if (root.parent) root.parent.remove(root);
    },
  };
  return api;
}

// Kleine Geometrie-Zusammenführung (nur position + color), damit die Tank-Säulen ein Mesh bleiben
function mergeGeos(geos) {
  let total = 0;
  for (const g of geos) total += g.attributes.position.count;
  const pos = new Float32Array(total * 3), col = new Float32Array(total * 3);
  let o = 0;
  for (const g of geos) {
    const n = g.attributes.position.count;
    pos.set(g.attributes.position.array, o * 3);
    col.set(g.attributes.color.array, o * 3);
    o += n;
    g.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('color', new THREE.BufferAttribute(col, 3));
  out.computeVertexNormals();
  return out;
}

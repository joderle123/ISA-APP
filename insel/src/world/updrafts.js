// Aufwindsäulen (WP13): heben das Segel (und schwächer Springende). Krater bis 110 m, Baumhaus-Podest, Wasserfall,
// Klippen-Thermik, Mangrovenkrone. Rein: createUpdraftRegistry() · add({ id, x, z, r, yMin, yMax, strength }) · liftAt(x, y, z) → m/s
// Welt: createUpdrafts({ scene, island, particles, veil }) – dazu eine sanft leuchtende Säule und aufsteigende Funken.
import * as THREE from 'three';

export function createUpdraftRegistry() {
  const list = [];
  const reg = {
    list,
    add(def) {
      const u = { strength: 6, r: 6, yMin: -Infinity, yMax: Infinity, ...def };
      list.push(u);
      return u;
    },
    remove(id) { const i = list.findIndex((u) => u.id === id); if (i >= 0) list.splice(i, 1); },
    get(id) { return list.find((u) => u.id === id) || null; },
    // Ziel-Steiggeschwindigkeit (m/s) an einem Punkt: innen voll, zum Rand und nach oben hin schwächer
    liftAt(x, y, z) {
      let best = 0;
      for (const u of list) {
        if (y < u.yMin || y > u.yMax) continue;
        const d = Math.hypot(x - u.x, z - u.z) / u.r;
        if (d > 1) continue;
        const edge = 1 - d * d;
        const top = u.yMax === Infinity ? 1 : Math.min(1, (u.yMax - y) / Math.max(4, u.r));
        const v = u.strength * edge * Math.max(0.15, top);
        if (v > best) best = v;
      }
      return best;
    },
  };
  return reg;
}

export function createUpdrafts({ scene, island, particles, veil, quality } = {}) {
  const reg = createUpdraftRegistry();
  const group = new THREE.Group();
  group.name = 'updrafts';
  // Säule als stilisierter Schimmer (Stil-Bibel §10): dünne aufsteigende Streifen, am Rand (streifender Blick) stärker wie
  // ein Glasrohr, in der Fläche fast unsichtbar; nachts gedämpft (uRimGlobal des Schleiers = 1 − Nacht/2 als Nachtmaß).
  const nightU = veil && veil.uniforms && veil.uniforms.uRimGlobal ? veil.uniforms.uRimGlobal : { value: 1 };
  const mat = new THREE.ShaderMaterial({
    uniforms: { uT: { value: 0 }, uColor: { value: new THREE.Color('#ffe7b0') }, uRimGlobal: nightU },
    vertexShader: /* glsl */`
      varying vec2 vUv; varying vec3 vN; varying vec3 vW;
      void main(){
        vUv = uv;
        vN = normalize(mat3(modelMatrix) * normal);
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */`
      uniform float uT; uniform vec3 uColor; uniform float uRimGlobal;
      varying vec2 vUv; varying vec3 vN; varying vec3 vW;
      void main(){
        vec3 V = normalize(cameraPosition - vW);
        float rim = pow(1.0 - abs(dot(normalize(vN), V)), 1.6);
        float s = sin((vUv.y * 7.0 + vUv.x * 2.0 - uT * 1.4) * 6.2831);
        float streak = smoothstep(0.55, 0.9, s);
        float edge = smoothstep(0.0, 0.12, vUv.y) * (1.0 - smoothstep(0.7, 1.0, vUv.y));
        float night = clamp((1.0 - uRimGlobal) * 2.0, 0.0, 1.0);
        float a = (0.012 + streak * 0.05) * (0.25 + 0.75 * rim) * edge * (1.0 - night * 0.7);
        gl_FragColor = vec4(uColor, a);
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false,
  });
  const meshes = [];
  const qp = quality && quality.particles !== undefined ? quality.particles : 1;
  let fxT = 0;

  function addVisual(u, color) {
    const h = u.yMax - u.yMin;
    const geo = new THREE.CylinderGeometry(u.r * 0.85, u.r * 0.55, h, 14, 1, true);
    const m = new THREE.Mesh(geo, mat.clone());
    m.material.uniforms.uColor.value.set(color || '#ffe7b0');
    m.material.uniforms.uRimGlobal = nightU;   // clone() kopiert Uniforms – der Nachtwert muss live bleiben
    m.position.set(u.x, u.yMin + h / 2, u.z);
    m.renderOrder = 7;
    m.frustumCulled = true;
    group.add(m);
    u.mesh = m;
    meshes.push(m);
  }

  const api = Object.assign(reg, {
    group,
    addWithVisual(def, color) { const u = reg.add(def); addVisual(u, color); return u; },
    update(dt, t, playerPos) {
      for (const m of meshes) m.material.uniforms.uT.value = t;
      if (!particles || dt <= 0) return;
      fxT += dt;
      if (fxT < 0.12) return;
      fxT = 0;
      for (const u of reg.list) {
        if (!u.mesh) continue;
        const d = Math.hypot(playerPos.x - u.x, playerPos.z - u.z);
        if (d > 120) continue;
        const n = Math.max(1, Math.round((u.r / 6) * 2 * qp));
        const y0 = isFinite(u.yMin) ? u.yMin : (playerPos.y - 10);
        particles.emit({ x: u.x + (Math.random() - 0.5) * u.r * 1.4, y: y0 + Math.random() * Math.min(8, u.yMax - y0), z: u.z + (Math.random() - 0.5) * u.r * 1.4, count: n, spread: 0.5, speed: 0.3, up: 4 + u.strength * 0.4, color: u.color || 0xffe7b0, size: 0.5, life: 2.6, gravity: 0.4, drag: 0.2, additive: true, alpha: 0.55, grow: 0.8 });
      }
    },
  });

  // ---- Standard-Säulen ----
  const V = island.FEATURES.volcano;
  api.addWithVisual({ id: 'krater', x: V.x, z: V.z, r: 11, yMin: V.lavaLevel + 0.5, yMax: 112, strength: 9, color: 0xffb070 }, '#ffb070');
  const baum = island.SITES.baumhaus;
  const bg = island.getHeight(baum.x, baum.z);
  api.addWithVisual({ id: 'baumhaus', x: baum.x, z: baum.z + 5, r: 4.5, yMin: bg + 2, yMax: bg + 26, strength: 4.5, color: 0xd6ffe0 }, '#d6ffe0');
  const W = island.FEATURES.waterfall;
  api.addWithVisual({ id: 'wasserfall', x: W.bottom.x + W.dir.x * 6, z: W.bottom.z + W.dir.z * 6, r: 5, yMin: island.getHeight(W.bottom.x, W.bottom.z), yMax: 30, strength: 5.5, color: 0xd0f4ff }, '#d0f4ff');
  const kg = island.SITES.klippenGipfel;
  api.addWithVisual({ id: 'klippen-thermik', x: kg.x - 14, z: kg.z - 8, r: 7, yMin: 0, yMax: 60, strength: 6, color: 0xc8d4ff }, '#c8d4ff');
  scene.add(group);
  return api;
}

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
  const mat = new THREE.ShaderMaterial({
    uniforms: { uT: { value: 0 }, uColor: { value: new THREE.Color('#ffe7b0') } },
    vertexShader: 'varying vec2 vUv; varying float vH; void main(){ vUv = uv; vH = position.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: /* glsl */`
      uniform float uT; uniform vec3 uColor; varying vec2 vUv; varying float vH;
      void main(){
        float bands = 0.5 + 0.5 * sin((vUv.y * 9.0 - uT * 1.6) * 6.2831);
        float edge = smoothstep(0.0, 0.12, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y));
        float a = (0.05 + bands * 0.07) * edge;
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

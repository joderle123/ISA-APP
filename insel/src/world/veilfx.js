// Schleier-Effekte: graue Schwebeteilchen im Grauschleier (klein, träge, nur wo es grau ist)
// und die Farbwelle als Lichtvorhang (Regenbogenring), Funken, Böe durch die Vegetation.
// API: game.world.veilFx = { motes, ring, setQuality(q), update(dt, t, focus, camera) }
import * as THREE from 'three';
import { mulberry32 } from './noise.js';
import { VEIL_GLSL } from './veil.js';

const RAINBOW = [0xff5d73, 0xffb347, 0xffe14d, 0x7ce36a, 0x4fd6ff, 0xb58cff];

export function createVeilFx({ scene, veil, island, vegetation, particles, quality, events }) {
  const rnd = mulberry32(31337);
  const group = new THREE.Group();
  group.name = 'veilfx';

  // ---- Schwebeteilchen ----
  const MAX = 260;
  let count = Math.round(MAX * Math.max(0.35, quality.particles || 1));
  const RANGE = 22; // Halbbreite des Bereichs um die Figur
  const motes = [];
  for (let i = 0; i < MAX; i++) {
    motes.push({
      x: (rnd() - 0.5) * RANGE * 2, z: (rnd() - 0.5) * RANGE * 2, h: 0.3 + rnd() * rnd() * 5.5,
      vx: 0.12 + rnd() * 0.2, vz: (rnd() - 0.5) * 0.12, ph: rnd() * 6.28, sp: 0.5 + rnd() * 0.8,
      size: 0.05 + rnd() * 0.06, y: 0,
    });
  }
  const mPos = new Float32Array(MAX * 3);
  const mAlpha = new Float32Array(MAX);
  const mSize = new Float32Array(MAX);
  const mGeo = new THREE.BufferGeometry();
  mGeo.setAttribute('position', new THREE.BufferAttribute(mPos, 3).setUsage(THREE.DynamicDrawUsage));
  mGeo.setAttribute('aAlpha', new THREE.BufferAttribute(mAlpha, 1).setUsage(THREE.DynamicDrawUsage));
  mGeo.setAttribute('aSize', new THREE.BufferAttribute(mSize, 1).setUsage(THREE.DynamicDrawUsage));
  mGeo.setDrawRange(0, 0);
  const mU = { uScale: { value: 400 }, uColor: { value: new THREE.Color('#b9b3cc') } };
  const moteMat = new THREE.ShaderMaterial({
    uniforms: mU, transparent: true, depthWrite: false,
    vertexShader: /* glsl */`
      attribute float aAlpha; attribute float aSize; uniform float uScale; varying float vA;
      void main() {
        vA = aAlpha;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        // sichtbare, aber kleine Punkte (2–9 px)
        gl_PointSize = clamp(aSize * uScale / max(-mv.z, 0.5), 2.0, 9.0);
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uColor; varying float vA;
      void main() {
        vec2 p = gl_PointCoord * 2.0 - 1.0;
        float d = dot(p, p);
        if (d > 1.0) discard;
        float a = (1.0 - smoothstep(0.3, 1.0, d)) * vA;
        gl_FragColor = vec4(uColor, a);
      }`,
  });
  const motePoints = new THREE.Points(mGeo, moteMat);
  motePoints.frustumCulled = false;
  motePoints.renderOrder = 11;
  group.add(motePoints);

  // ---- Lichtvorhang der Farbwelle ----
  const ringU = Object.assign({ uK: { value: 0 }, uTime: { value: 0 } }, veil.uniforms);
  const ringMat = new THREE.ShaderMaterial({
    uniforms: ringU, transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, toneMapped: false,
    vertexShader: /* glsl */`
      varying vec2 vUv; varying vec3 vW;
      void main() { vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: /* glsl */`
      uniform float uK; uniform float uTime; varying vec2 vUv; varying vec3 vW;
      void main() {
        float a = vUv.x * 6.2831;
        vec3 rb = 0.5 + 0.5 * cos(a * 3.0 + uTime * 1.5 + vec3(0.0, 2.09, 4.19));
        rb = rb * rb;
        float fall = pow(1.0 - vUv.y, 2.2);
        float base = exp(-pow(vUv.y * 7.0, 2.0));
        float flick = 0.85 + 0.15 * sin(a * 24.0 - uTime * 9.0);
        float amt = (fall * 0.35 + base * 0.7) * flick * (1.0 - uK * 0.6);
        gl_FragColor = vec4(rb * 1.4 + base * 0.6, amt);
      }`,
  });
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 72, 1, true), ringMat);
  ring.visible = false;
  ring.renderOrder = 12;
  ring.frustumCulled = false;
  group.add(ring);
  scene.add(group);

  let wave = null; // { x, z, y, t, maxR, duration }
  let gust = 0;
  let sparkT = 0;
  events.on('veil:restore:start', (w) => {
    const y = Math.max(island.getHeight(w.x, w.z), island.waterLevel(w.x, w.z));
    wave = { x: w.x, z: w.z, y, maxR: w.maxR || 60, duration: w.duration || 4.6 };
    ring.visible = true;
    gust = 1;
    // Startknall: Funken aus der Mitte
    for (let i = 0; i < 6; i++) {
      particles.emit({ x: w.x, y: y + 0.6, z: w.z, count: 8, spread: 1.2, speed: 6, up: 6 + i * 1.5, color: RAINBOW[i], size: 0.9, life: 1.8, gravity: -3, drag: 0.9, additive: true, alpha: 1 });
    }
  });
  events.on('veil:restored', () => { wave = null; ring.visible = false; });

  let ground = 0;
  const fx = {
    group, motes: motePoints, ring,
    get count() { return count; },
    setQuality(q) { count = Math.round(MAX * Math.max(0.35, q.particles || 1)); },
    setViewport(heightPx, fovDeg) { mU.uScale.value = heightPx / (2 * Math.tan((fovDeg * Math.PI) / 360)); },
    update(dt, t, focus, camera) {
      // Schwebeteilchen um die Figur (nur im Schleier sichtbar; die Welle löscht sie mit)
      if (focus) {
        let visible = 0;
        for (let i = 0; i < count; i++) {
          const m = motes[i];
          m.x += m.vx * dt + Math.sin(t * 0.3 * m.sp + m.ph) * 0.25 * dt;
          m.z += m.vz * dt + Math.cos(t * 0.27 * m.sp + m.ph) * 0.25 * dt;
          // um die Figur herum wickeln
          let rx = m.x - focus.x, rz = m.z - focus.z;
          let wrapped = false;
          if (rx > RANGE) { m.x -= RANGE * 2; rx -= RANGE * 2; wrapped = true; } else if (rx < -RANGE) { m.x += RANGE * 2; rx += RANGE * 2; wrapped = true; }
          if (rz > RANGE) { m.z -= RANGE * 2; rz -= RANGE * 2; wrapped = true; } else if (rz < -RANGE) { m.z += RANGE * 2; rz += RANGE * 2; wrapped = true; }
          ground = Math.max(island.getHeight(m.x, m.z), island.waterLevel(m.x, m.z));
          const ty = ground + m.h + Math.sin(t * 0.6 * m.sp + m.ph) * 0.35;
          // beim Neueintritt (oder nach Teleport) sofort auf Höhe, sonst weich dem Gelände folgen
          if (wrapped || Math.abs(ty - m.y) > 6 || !isFinite(m.y)) m.y = ty;
          else m.y += (ty - m.y) * Math.min(1, dt * 1.5);
          const v = veil.amountAt(m.x, m.z);
          const dist = Math.hypot(rx, rz);
          const a = Math.max(0, Math.min(1, (v - 0.3) / 0.35)) * (1 - Math.max(0, (dist - 14) / (RANGE - 14))) * (0.35 + 0.65 * Math.pow(0.5 + 0.5 * Math.sin(t * (0.9 + m.sp) + m.ph * 5), 2));
          if (a > 0.01) {
            mPos[visible * 3] = m.x; mPos[visible * 3 + 1] = m.y; mPos[visible * 3 + 2] = m.z;
            mAlpha[visible] = a * 0.75;
            mSize[visible] = m.size;
            visible++;
          }
        }
        mGeo.setDrawRange(0, visible);
        if (visible > 0) {
          for (const k of ['position', 'aAlpha', 'aSize']) {
            const at = mGeo.attributes[k];
            at.needsUpdate = true;
            at.clearUpdateRanges();
            at.addUpdateRange(0, visible * at.itemSize);
          }
        }
      }
      // Farbwelle
      const w = veil.wave;
      if (wave && w) {
        const k = Math.min(1, w.t / w.duration);
        const r = Math.max(0.5, w.radius);
        const h = 5.5 + 4 * (1 - k);
        ring.position.set(wave.x, wave.y - 0.3, wave.z);
        ring.scale.set(r, h, r);
        ring.position.y += h / 2;
        ringU.uK.value = k;
        ringU.uTime.value = t;
        // Funken entlang der Welle (nur nahe der Kamera)
        sparkT += dt;
        if (sparkT > 0.05 && dt > 0) {
          sparkT = 0;
          const n = Math.round(14 * (quality.particles || 1));
          for (let i = 0; i < n; i++) {
            const a = rnd() * Math.PI * 2;
            const x = wave.x + Math.cos(a) * r, z = wave.z + Math.sin(a) * r;
            if (camera && Math.hypot(x - camera.position.x, z - camera.position.z) > 120) continue;
            const y = Math.max(island.getHeight(x, z), island.waterLevel(x, z)) + 0.3;
            particles.emit({ x, y, z, count: 1, spread: 2, speed: 0.8, up: 3 + rnd() * 4, color: RAINBOW[i % RAINBOW.length], size: 0.55 + rnd() * 0.5, life: 1.8, gravity: -0.5, drag: 0.8, additive: true, alpha: 1 });
          }
        }
      } else if (ring.visible) ring.visible = false;
      // Böe: Vegetation wogt mit der Welle und beruhigt sich wieder
      if (gust > 0 && vegetation) {
        gust = Math.max(0, gust - dt / 6);
        vegetation.setWind(1 + gust * 1.6);
      }
    },
  };
  return fx;
}

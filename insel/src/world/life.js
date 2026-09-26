// Tierleben: Möwen (Hafen/Strand), Schmetterlinge am Tag, Glühwürmchen in der Nacht.
import * as THREE from 'three';
import { part, merge } from './geom.js';
import { mulberry32 } from './noise.js';

function flapMaterial(veil, speed) {
  const m = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, side: THREE.DoubleSide });
  m.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aWind;\nuniform float uLumoTime;')
      .replace('#include <begin_vertex>', `#include <begin_vertex>
      {
        float ph = 0.0;
        #ifdef USE_INSTANCING
          ph = instanceMatrix[3].x * 1.7 + instanceMatrix[3].z * 0.9;
        #endif
        float f = sin(uLumoTime * ${speed.toFixed(1)} + ph);
        transformed.y += f * aWind * 0.9;
        transformed.x *= 1.0 - abs(f) * aWind * 0.25;
      }`);
  };
  m.userData.__lumoKey = 'flap' + speed;
  m.customProgramCacheKey = () => m.userData.__lumoKey;
  veil.patch(m, { key: 'flap' + speed });
  return m;
}

export function createLife({ island, veil, scene, quality }) {
  const rnd = mulberry32(777);
  const group = new THREE.Group();
  group.name = 'life';

  // ---- Möwen ----
  const gullGeo = merge([
    part(new THREE.IcosahedronGeometry(0.28, 0), { scale: [0.8, 0.75, 1.9], color: '#ffffff' }),
    part(new THREE.IcosahedronGeometry(0.17, 0), { pos: [0, 0.14, 0.5], color: '#ffffff' }),
    part(new THREE.ConeGeometry(0.05, 0.22, 4, 1), { pos: [0, 0.12, 0.72], rot: [Math.PI / 2, 0, 0], color: '#ffb000' }),
    part(new THREE.ConeGeometry(0.1, 0.3, 3, 1), { pos: [0, 0.02, -0.62], rot: [-Math.PI / 2, 0, 0], scale: [1.4, 1, 0.4], color: '#d9dde6' }),
    // Flügel (aWind = Abstand vom Körper)
    part(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([
      0.12, 0.05, 0.25, 1.35, 0.1, -0.05, 0.12, 0.05, -0.25,
      1.35, 0.1, -0.05, 1.9, 0.02, -0.35, 0.9, 0.08, -0.3,
      -0.12, 0.05, 0.25, -0.12, 0.05, -0.25, -1.35, 0.1, -0.05,
      -1.35, 0.1, -0.05, -0.9, 0.08, -0.3, -1.9, 0.02, -0.35,
    ], 3)), {
      color: (x, y, z, out) => out.set(Math.abs(x) > 1.4 ? '#3a3f4a' : '#e9edf3'),
      wind: (x) => Math.max(0, Math.abs(x) - 0.12) * 0.45,
    }),
  ]);
  const gullMat = flapMaterial(veil, 7.0);
  const GULLS = 10;
  const gulls = new THREE.InstancedMesh(gullGeo, gullMat, GULLS);
  gulls.frustumCulled = false;
  const gullData = [];
  const centres = [[8, 130], [140, 30], [-120, 120], [20, 100], [120, 60]];
  for (let i = 0; i < GULLS; i++) {
    const c = centres[i % centres.length];
    gullData.push({ cx: c[0] + (rnd() - 0.5) * 30, cz: c[1] + (rnd() - 0.5) * 30, r: 14 + rnd() * 24, h: 16 + rnd() * 16, sp: (0.18 + rnd() * 0.15) * (rnd() < 0.5 ? -1 : 1), ph: rnd() * 6.28 });
  }
  group.add(gulls);

  // ---- Schmetterlinge ----
  const bfGeo = merge([
    part(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([
      0, 0, 0.12, 0.34, 0, 0.2, 0.3, 0, -0.08,
      0, 0, 0.0, 0.3, 0, -0.08, 0.22, 0, -0.26,
      0, 0, 0.12, -0.3, 0, -0.08, -0.34, 0, 0.2,
      0, 0, 0.0, -0.22, 0, -0.26, -0.3, 0, -0.08,
    ], 3)), { color: '#ffffff', wind: (x) => Math.abs(x) * 1.6 }),
    part(new THREE.BoxGeometry(0.04, 0.04, 0.3), { color: '#2a2230' }),
  ]);
  const bfMat = flapMaterial(veil, 22.0);
  const BF = 12;
  const bflies = new THREE.InstancedMesh(bfGeo, bfMat, BF);
  bflies.frustumCulled = false;
  const bfCols = ['#ff9a3c', '#57b8ff', '#ffe14d', '#ff6fa8', '#b58cff'];
  const bfData = [];
  for (let i = 0; i < BF; i++) {
    bflies.setColorAt(i, new THREE.Color(bfCols[i % bfCols.length]));
    bfData.push({ x: 0, y: 0, z: 0, ox: (rnd() - 0.5) * 16, oz: (rnd() - 0.5) * 16, ph: rnd() * 10, sp: 0.6 + rnd() * 0.6 });
  }
  bflies.instanceColor.needsUpdate = true;
  group.add(bflies);

  // ---- Glühwürmchen ----
  const FF = Math.round(90 * (quality.particles || 1));
  const ffPos = new Float32Array(FF * 3);
  const ffSeed = new Float32Array(FF);
  for (let i = 0; i < FF; i++) { ffPos.set([(rnd() - 0.5) * 50, rnd(), (rnd() - 0.5) * 50], i * 3); ffSeed[i] = rnd() * 100; }
  const ffGeo = new THREE.BufferGeometry();
  ffGeo.setAttribute('position', new THREE.BufferAttribute(ffPos, 3));
  ffGeo.setAttribute('aSeed', new THREE.BufferAttribute(ffSeed, 1));
  const ffU = { uTime: { value: 0 }, uAmt: { value: 0 }, uCenter: { value: new THREE.Vector3() }, uScale: { value: 400 }, uGround: { value: 0 } };
  const fireflies = new THREE.Points(ffGeo, new THREE.ShaderMaterial({
    uniforms: ffU, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */`
      attribute float aSeed; uniform float uTime; uniform vec3 uCenter; uniform float uScale; uniform float uGround;
      varying float vB;
      void main() {
        vec3 p = position;
        p.x += sin(uTime * 0.3 + aSeed) * 3.0;
        p.z += cos(uTime * 0.27 + aSeed * 1.3) * 3.0;
        vec2 w = mod(p.xz - uCenter.xz + 25.0, 50.0) - 25.0;
        vec3 wp = vec3(uCenter.x + w.x, uGround + 0.6 + p.y * 2.5 + sin(uTime * 0.8 + aSeed) * 0.5, uCenter.z + w.y);
        vB = pow(0.5 + 0.5 * sin(uTime * (1.5 + fract(aSeed) * 2.0) + aSeed * 7.0), 2.0) * (1.0 - smoothstep(16.0, 25.0, length(w)));
        vec4 mv = viewMatrix * vec4(wp, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = max(0.5 * uScale / max(-mv.z, 0.5), 3.0);
      }`,
    fragmentShader: /* glsl */`
      uniform float uAmt; varying float vB;
      void main() {
        vec2 p = gl_PointCoord * 2.0 - 1.0;
        float a = exp(-dot(p, p) * 4.0) * vB * uAmt;
        gl_FragColor = vec4(vec3(0.8, 1.0, 0.4) * a * 2.2, a);
      }`,
  }));
  fireflies.frustumCulled = false;
  fireflies.renderOrder = 14;
  group.add(fireflies);

  scene.add(group);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1);

  return {
    group, gulls, butterflies: bflies, fireflies,
    setViewport(heightPx, fovDeg) { ffU.uScale.value = heightPx / (2 * Math.tan((fovDeg * Math.PI) / 360)); },
    update(dt, t, focus, night) {
      // Möwen kreisen
      for (let i = 0; i < GULLS; i++) {
        const g = gullData[i];
        const a = g.ph + t * g.sp;
        const x = g.cx + Math.cos(a) * g.r, z = g.cz + Math.sin(a) * g.r;
        const y = g.h + Math.sin(t * 0.5 + i) * 2;
        const yaw = Math.atan2(-Math.sin(a) * Math.sign(g.sp), Math.cos(a) * Math.sign(g.sp));
        e.set(0, yaw, -Math.sign(g.sp) * 0.35, 'YXZ');
        q.setFromEuler(e);
        m4.compose(v.set(x, y, z), q, one);
        gulls.setMatrixAt(i, m4);
      }
      gulls.instanceMatrix.needsUpdate = true;
      gulls.visible = night < 0.6;
      // Schmetterlinge um den Spieler (nur tagsüber, nicht im Schleier)
      const day = 1 - night;
      const showBf = day > 0.5 && focus;
      bflies.visible = !!showBf;
      if (showBf) {
        for (let i = 0; i < BF; i++) {
          const b = bfData[i];
          const tt = t * b.sp + b.ph;
          const x = focus.x + b.ox + Math.sin(tt * 0.7) * 5 + Math.sin(tt * 1.9) * 1.2;
          const z = focus.z + b.oz + Math.cos(tt * 0.6) * 5 + Math.cos(tt * 1.7) * 1.2;
          // Abstand zum Spieler halten: Anker langsam nachziehen
          if (Math.hypot(b.ox, b.oz) > 18) { b.ox *= 0.5; b.oz *= 0.5; }
          const gy = island.getHeight(x, z);
          const vis = gy > 0.5 && veil.amountAt(x, z) < 0.5 ? 1 : 0;
          const y = Math.max(gy, 0) + 0.8 + Math.sin(tt * 2.3) * 0.5;
          const yaw = Math.atan2(Math.cos(tt * 0.7) * 3.5, -Math.sin(tt * 0.6) * 3);
          e.set(0, yaw, 0, 'YXZ');
          q.setFromEuler(e);
          m4.compose(v.set(x, y, z), q, one.setScalar(vis * 0.6));
          bflies.setMatrixAt(i, m4);
          one.setScalar(1);
        }
        bflies.instanceMatrix.needsUpdate = true;
      }
      // Glühwürmchen
      ffU.uTime.value = t;
      ffU.uAmt.value = Math.max(0, (night - 0.3) / 0.7);
      fireflies.visible = ffU.uAmt.value > 0.01;
      if (focus) { ffU.uCenter.value.set(focus.x, 0, focus.z); ffU.uGround.value = Math.max(0, island.getHeight(focus.x, focus.z)); }
    },
  };
}

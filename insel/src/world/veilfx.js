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

  // ---- Nebelwand am Schleierrand (Stil-Bibel §10.3): 9 m hoch, Alpha 0.62 → 0 nach oben (linear), driftende Schlieren,
  // von innen und außen sichtbar – man sieht die Grenze. Ein Mesh je Slot (Zone/Fleck), folgt dem Gelände.
  const WALL_H = 9;
  const wallU = { uTime: { value: 0 }, uAmt: { value: 0 } };
  const wallVert = /* glsl */`
    varying vec2 vUv; varying vec3 vW; varying vec3 vFogView;
    #include <fog_pars_vertex>
    void main() {
      vUv = uv;
      vec4 w = modelMatrix * vec4(position, 1.0);
      vW = w.xyz;
      vec4 mv = viewMatrix * w;
      vFogView = mv.xyz;
      gl_Position = projectionMatrix * mv;
      #ifdef USE_FOG
        vFogDepth = -mv.z;
      #endif
    }`;
  const wallFrag = /* glsl */`
    uniform float uTime; uniform float uAmt;
    varying vec2 vUv; varying vec3 vW; varying vec3 vFogView;
    #include <fog_pars_fragment>
    ${veil.glsl}
    float h12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
    float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h12(i), h12(i + vec2(1, 0)), f.x), mix(h12(i + vec2(0, 1)), h12(i + vec2(1, 1)), f.x), f.y); }
    void main() {
      float ang = vUv.x * 40.0;
      float n = vn(vec2(ang, vUv.y * 2.5 - uTime * 0.12)) * 0.6 + vn(vec2(ang * 2.3 + 7.0, vUv.y * 5.0 - uTime * 0.2)) * 0.4;
      // dichter Fuß (0.55), nach oben in Schlieren ausfransend; heller Kamm, damit die Wand vor dem Boden lesbar ist
      // linearer Abfall über 9 m (quadratisch war nur die unterste Meterlage sichtbar, die das Gelände meist verdeckt)
      float a = 0.62 * (1.0 - vUv.y) * smoothstep(0.1, 0.6, n + 0.22 - vUv.y * 0.25) * uAmt;
      float dCam = length(vFogView);
      a *= smoothstep(2.0, 7.0, dCam);
      // weiche Ränder: an der Silhouette des Zylinders (streifender Blick) ausblenden, sonst liest sich die Wand als Glasplatte
      vec3 wallN = vec3(cos(vUv.x * 6.2831853), 0.0, sin(vUv.x * 6.2831853));
      vec3 toCam = normalize(cameraPosition - vW);
      a *= smoothstep(0.0, 0.4, abs(dot(wallN, toCam)));
      // hell vor dem dunklen Schleierboden (Duotone-Lichter ≈ #C9C4D8), unten dichter und etwas dunkler, oben helle Schlieren
      vec3 col = mix(vec3(0.42, 0.39, 0.55), vec3(0.78, 0.75, 0.9), vUv.y * 0.55 + n * 0.55);
      gl_FragColor = vec4(col, a);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      gLumoWorldY = vW.y;
      #ifdef USE_FOG
        gl_FragColor.rgb = lumoFog(gl_FragColor.rgb, vFogDepth, vFogView, fogColor, fogNear, fogFar);
      #endif
      gl_FragColor.rgb = lumoGrade(gl_FragColor.rgb);
    }`;
  const walls = new Map();   // slot-Index → { mesh, key }
  function wallGeometry(cx, cz, r) {
    const N = 96;
    const pos = [], uv = [], idx = [];
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2;
      const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
      const g = Math.max(island.getHeight(x, z), island.waterLevel(x, z)) - 0.8;
      pos.push(x, g, z, x, g + WALL_H, z);
      uv.push(i / N, 0, i / N, 1);
      if (i < N) { const b = i * 2; idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3); }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeBoundingSphere();
    return geo;
  }
  function wallFor(i, s) {
    const rr = s.patch ? s.r * 0.8 : s.r * 0.95;
    const key = `${s.id}:${s.x}:${s.z}:${rr.toFixed(1)}`;
    let w = walls.get(i);
    if (w && w.key === key) return w;
    if (w) { group.remove(w.mesh); w.mesh.geometry.dispose(); w.mesh.material.dispose(); }
    const mat = new THREE.ShaderMaterial({
      uniforms: Object.assign(THREE.UniformsUtils.merge([THREE.UniformsLib.fog]), { uTime: wallU.uTime, uAmt: { value: 0 } }, veil.uniforms),
      vertexShader: wallVert, fragmentShader: wallFrag, transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: true,
    });
    const mesh = new THREE.Mesh(wallGeometry(s.x, s.z, rr), mat);
    mesh.renderOrder = 10;
    mesh.name = 'nebelwand-' + s.id;
    group.add(mesh);
    w = { mesh, key, r: rr, x: s.x, z: s.z };
    walls.set(i, w);
    return w;
  }
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
      // Nebelwände: je verschleiertem Slot in Kameranähe; während einer Welle auf diesem Slot ausblenden
      wallU.uTime.value = t;
      if (camera) {
        const cx = camera.position.x, cz = camera.position.z;
        veil.slots.forEach((s, i) => {
          const near = s.id && s.r > 0 && Math.hypot(cx - s.x, cz - s.z) < s.r * 1.2 + 90;
          const waveHere = w && w.index === i;
          const amt = near && !waveHere ? Math.max(0, (s.veil - 0.15) / 0.85) : 0;
          if (amt <= 0.01) { const ex = walls.get(i); if (ex) ex.mesh.visible = false; return; }
          const wall = wallFor(i, s);
          wall.mesh.visible = true;
          wall.mesh.material.uniforms.uAmt.value = amt;
        });
      }
    },
    walls,
  };
  return fx;
}

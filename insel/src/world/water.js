// Stilisiertes Wasser: Meer mit Wellen, Tiefenfarben (gebackene Tiefenkarte), Schaumlinien, Glitzern, Fresnel.
// Dazu Wasserfall im Dschungel und ruhiger Teich darunter.
import * as THREE from 'three';
import { FEATURES } from './island.js';

const TEX_HALF = 256;

const OCEAN_VERT = /* glsl */`
uniform float uTime;
uniform sampler2D uDepthTex;
uniform float uTexHalf;
varying vec3 vWorld;
varying vec3 vVeilPos;
varying vec3 vFogView;
#include <fog_pars_vertex>
float waveH(vec2 p, float t) {
  float h = sin(dot(p, vec2(0.11, 0.045)) + t * 1.05) * 0.26;
  h += sin(dot(p, vec2(-0.063, 0.12)) + t * 0.87) * 0.2;
  h += sin(dot(p, vec2(0.19, -0.16)) + t * 1.63) * 0.09;
  h += sin(dot(p, vec2(-0.29, -0.07)) + t * 2.05) * 0.05;
  return h;
}
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vec2 uv = wp.xz / (2.0 * uTexHalf) + 0.5;
  float dEnc = texture(uDepthTex, uv).r;
  float depth = dEnc * dEnc * 24.0;
  if (abs(wp.x) > uTexHalf || abs(wp.z) > uTexHalf) depth = 24.0;
  float amp = mix(0.25, 1.0, smoothstep(0.2, 4.0, depth));
  amp *= 1.0 - smoothstep(420.0, 800.0, length(wp.xz));
  wp.y += waveH(wp.xz, uTime) * amp;
  vWorld = wp.xyz;
  vVeilPos = wp.xyz;
  vec4 mvPosition = viewMatrix * wp;
  vFogView = mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
  #ifdef USE_FOG
    vFogDepth = -mvPosition.z;
  #endif
}
`;

const OCEAN_FRAG = /* glsl */`
uniform float uTime;
uniform sampler2D uDepthTex;
uniform float uTexHalf;
uniform vec3 uShallow;
uniform vec3 uMid;
uniform vec3 uDeep;
uniform vec3 uFoam;
uniform vec3 uSunDir;
uniform vec3 uSunColor;
uniform vec3 uSkyColor;
uniform vec3 uHorizonColor;
uniform vec3 uAmbient;
uniform float uNight;
varying vec3 vWorld;
varying vec3 vVeilPos;
varying vec3 vFogView;
#include <fog_pars_fragment>
LUMO_VEIL
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), f.x), mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), f.x), f.y);
}
void main() {
  vec3 N = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
  if (N.y < 0.0) N = -N;
  vec2 uv = vWorld.xz / (2.0 * uTexHalf) + 0.5;
  float dEnc = texture(uDepthTex, uv).r;
  float depth = dEnc * dEnc * 24.0;
  if (abs(vWorld.x) > uTexHalf || abs(vWorld.z) > uTexHalf) depth = 24.0;
  vec3 V = normalize(cameraPosition - vWorld);
  float dist = length(cameraPosition - vWorld);

  // Farbe nach Tiefe
  vec3 col = mix(uShallow, uMid, smoothstep(0.3, 4.5, depth));
  col = mix(col, uDeep, smoothstep(4.0, 16.0, depth));
  // Licht
  float ndl = max(dot(N, uSunDir), 0.0);
  col *= uAmbient + uSunColor * (0.35 + 0.4 * ndl);
  // Fresnel / Himmel
  float fres = pow(1.0 - max(dot(N, V), 0.0), 4.0);
  col = mix(col, mix(uHorizonColor, uSkyColor, 0.4), clamp(fres * 0.6, 0.0, 0.55));
  // Glanzlichter (facettiert + Funkeln)
  vec3 Hh = normalize(uSunDir + V);
  float spec = pow(max(dot(N, Hh), 0.0), 220.0);
  float tw = step(0.72, hash12(floor(vWorld.xz * 1.3) + floor(uTime * 5.0)));
  col += uSunColor * (spec * 3.0 + spec * tw * 4.0) * (1.0 - uNight * 0.6);
  // breiter Sonnenpfad
  col += uSunColor * pow(max(dot(reflect(-V, N), uSunDir), 0.0), 24.0) * 0.25;

  // Schaum an der Küste
  float n1 = vnoise(vWorld.xz * 0.35 + uTime * 0.15);
  float n2 = vnoise(vWorld.xz * 1.1 - uTime * 0.2);
  float shore = 1.0 - smoothstep(0.05, 0.32 + n2 * 0.25, depth);
  float ph = depth * 1.6 - uTime * 0.3 + n1 * 0.5;
  float fl = fract(ph);
  float line = smoothstep(0.0, 0.04, fl) * (1.0 - smoothstep(0.06, 0.14, fl));
  line *= 1.0 - smoothstep(0.3, 1.3, depth);
  line *= smoothstep(0.4, 0.65, n2 + 0.15);
  float foam = clamp(max(shore, line * 0.9), 0.0, 1.0);
  // Schaum auf Wellenkämmen draußen (dezent)
  float crest = smoothstep(0.62, 0.8, N.x * 0.5 + 0.5) * smoothstep(3.0, 8.0, depth) * 0.12 * step(dist, 160.0);
  foam = max(foam, crest);
  vec3 foamCol = uFoam * (uAmbient + uSunColor * 0.55);
  col = mix(col, foamCol, foam);

  col = lumoApplyVeil(col, vVeilPos);
  float alpha = mix(0.5, 0.97, smoothstep(0.1, 3.5, depth));
  alpha = max(alpha, foam);
  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #ifdef USE_FOG
    gl_FragColor.rgb = lumoFog(gl_FragColor.rgb, vFogDepth, vFogView, fogColor, fogNear, fogFar);
  #endif
}
`;

// Tiefenkarte aus der Insel backen (R = sqrt(Tiefe/24))
function bakeDepth(island, size = 512) {
  const data = new Uint8Array(size * size * 4);
  for (let j = 0; j < size; j++) {
    const z = -TEX_HALF + ((j + 0.5) / size) * TEX_HALF * 2;
    for (let i = 0; i < size; i++) {
      const x = -TEX_HALF + ((i + 0.5) / size) * TEX_HALF * 2;
      const h = island.getHeight(x, z);
      const d = Math.max(0, Math.min(24, -h));
      const o = (j * size + i) * 4;
      data[o] = Math.round(Math.sqrt(d / 24) * 255);
      data[o + 1] = 0; data[o + 2] = 0; data[o + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.flipY = false;
  tex.needsUpdate = true;
  return tex;
}

// Gitter: dicht nahe der Insel, nach außen gestreckt bis zum Horizont
function oceanGeometry(seg) {
  const g = new THREE.PlaneGeometry(2, 2, seg, seg);
  g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  const warp = (t) => {
    const a = Math.abs(t);
    const inner = 0.74;
    if (a <= inner) return Math.sign(t) * (a / inner) * 300;
    const k = (a - inner) / (1 - inner);
    return Math.sign(t) * (300 + k * k * 2900);
  };
  for (let i = 0; i < p.count; i++) p.setXYZ(i, warp(p.getX(i)), 0, warp(p.getZ(i)));
  g.computeBoundingSphere();
  return g;
}

export function createWater({ island, veil, quality, scene }) {
  const depthTex = bakeDepth(island, 512);
  const uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.fog]);
  Object.assign(uniforms, {
    uTime: { value: 0 },
    uDepthTex: { value: depthTex },
    uTexHalf: { value: TEX_HALF },
    uShallow: { value: new THREE.Color('#27d3c3') },
    uMid: { value: new THREE.Color('#0b9cc2') },
    uDeep: { value: new THREE.Color('#0a3f8a') },
    uFoam: { value: new THREE.Color('#ffffff') },
    uSunDir: { value: new THREE.Vector3(0, 1, 0) },
    uSunColor: { value: new THREE.Color('#ffe0b0') },
    uSkyColor: { value: new THREE.Color('#6aa0e0') },
    uHorizonColor: { value: new THREE.Color('#ffd0a0') },
    uAmbient: { value: new THREE.Color('#8090a0') },
    uNight: { value: 0 },
  });
  Object.assign(uniforms, veil.uniforms);
  const mat = new THREE.ShaderMaterial({
    vertexShader: OCEAN_VERT,
    fragmentShader: OCEAN_FRAG.replace('LUMO_VEIL', veil.glsl),
    uniforms,
    transparent: true,
    fog: true,
    depthWrite: true,
  });
  let ocean = new THREE.Mesh(oceanGeometry(quality.waterSegments), mat);
  ocean.name = 'ocean';
  ocean.renderOrder = 1;
  ocean.frustumCulled = false;
  scene.add(ocean);

  // ---- Teich im Dschungel ----
  const P = FEATURES.pool;
  const W = FEATURES.waterfall;
  const poolMat = new THREE.ShaderMaterial({
    uniforms: Object.assign(THREE.UniformsUtils.merge([THREE.UniformsLib.fog]), {
      uTime: uniforms.uTime, uSunColor: uniforms.uSunColor, uAmbient: uniforms.uAmbient, uSunDir: uniforms.uSunDir,
      uCenter: { value: new THREE.Vector2(P.x, P.z) }, uRadius: { value: P.r },
      uImpact: { value: new THREE.Vector2(W.bottom.x, W.bottom.z) },
    }, veil.uniforms),
    vertexShader: /* glsl */`
      varying vec3 vWorld; varying vec3 vFogView;
      #include <fog_pars_vertex>
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        vec4 mvPosition = viewMatrix * wp;
        vFogView = mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
        #ifdef USE_FOG
          vFogDepth = -mvPosition.z;
        #endif
      }`,
    fragmentShader: /* glsl */`
      uniform float uTime; uniform vec3 uSunColor; uniform vec3 uAmbient; uniform vec3 uSunDir;
      uniform vec2 uCenter; uniform float uRadius; uniform vec2 uImpact;
      varying vec3 vWorld; varying vec3 vFogView;
      #include <fog_pars_fragment>
      ${veil.glsl}
      void main() {
        float r = distance(vWorld.xz, uCenter) / uRadius;
        vec3 col = mix(vec3(0.05, 0.62, 0.55), vec3(0.03, 0.3, 0.4), smoothstep(0.1, 0.9, 1.0 - r));
        float di = distance(vWorld.xz, uImpact);
        float ring = smoothstep(0.75, 1.0, sin(di * 2.2 - uTime * 4.0) * 0.5 + 0.5) * (1.0 - smoothstep(1.0, 7.0, di));
        float edge = smoothstep(0.82, 1.0, r);
        float foam = max(max(ring * 0.6, edge * 0.7), 1.0 - smoothstep(0.8, 2.6, di));
        col *= uAmbient + uSunColor * 0.5;
        col = mix(col, vec3(1.0) * (uAmbient + uSunColor * 0.5), foam);
        col = lumoApplyVeil(col, vWorld);
        gl_FragColor = vec4(col, 0.9);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #ifdef USE_FOG
          gl_FragColor.rgb = lumoFog(gl_FragColor.rgb, vFogDepth, vFogView, fogColor, fogNear, fogFar);
        #endif
      }`,
    transparent: true, fog: true,
  });
  const pool = new THREE.Mesh(new THREE.CircleGeometry(P.r + 1.4, 40).rotateX(-Math.PI / 2), poolMat);
  pool.position.set(P.x, P.level, P.z);
  pool.renderOrder = 2;
  scene.add(pool);

  // ---- Wasserfall ----
  const topY = island.getHeight(W.top.x, W.top.z) + 0.35;
  const botY = P.level;
  const rows = 18, cols = 6;
  const wfPos = [];
  const wfUv = [];
  const idx = [];
  const side = { x: -W.dir.z, z: W.dir.x };
  for (let r = 0; r <= rows; r++) {
    const s = r / rows;
    const y = topY - (topY - botY) * s;
    // Abstand vom Fels: Parabel, mindestens über dem Gelände
    let off = 0.3 + 3.2 * Math.sqrt(s);
    for (let k = 0; k < 30; k++) {
      const px = W.top.x + W.dir.x * off, pz = W.top.z + W.dir.z * off;
      if (island.getHeight(px, pz) < y - 0.5 || r === 0) break;
      off += 0.3;
    }
    for (let c = 0; c <= cols; c++) {
      const u = c / cols;
      const w = (u - 0.5) * W.width * (1 + s * 0.35);
      wfPos.push(W.top.x + W.dir.x * off + side.x * w, y, W.top.z + W.dir.z * off + side.z * w);
      wfUv.push(u, s);
    }
  }
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const a = r * (cols + 1) + c, b = a + 1, d = a + cols + 1, e = d + 1;
    idx.push(a, d, b, b, d, e);
  }
  const wfGeo = new THREE.BufferGeometry();
  wfGeo.setAttribute('position', new THREE.Float32BufferAttribute(wfPos, 3));
  wfGeo.setAttribute('uv', new THREE.Float32BufferAttribute(wfUv, 2));
  wfGeo.setIndex(idx);
  const wfMat = new THREE.ShaderMaterial({
    uniforms: Object.assign(THREE.UniformsUtils.merge([THREE.UniformsLib.fog]), { uTime: uniforms.uTime, uSunColor: uniforms.uSunColor, uAmbient: uniforms.uAmbient }, veil.uniforms),
    vertexShader: /* glsl */`
      varying vec2 vUv; varying vec3 vWorld; varying vec3 vFogView;
      #include <fog_pars_vertex>
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        vec4 mvPosition = viewMatrix * wp;
        vFogView = mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
        #ifdef USE_FOG
          vFogDepth = -mvPosition.z;
        #endif
      }`,
    fragmentShader: /* glsl */`
      uniform float uTime; uniform vec3 uSunColor; uniform vec3 uAmbient;
      varying vec2 vUv; varying vec3 vWorld; varying vec3 vFogView;
      #include <fog_pars_fragment>
      ${veil.glsl}
      float h1(float x) { return fract(sin(x * 91.7) * 43758.5); }
      void main() {
        float colId = floor(vUv.x * 14.0);
        float sp = 1.2 + h1(colId) * 0.8;
        float st = fract(vUv.y * 2.5 - uTime * sp + h1(colId + 3.0));
        float streak = smoothstep(0.0, 0.25, st) * (1.0 - smoothstep(0.35, 0.9, st));
        vec3 base = mix(vec3(0.35, 0.85, 0.9), vec3(0.95, 1.0, 1.0), streak * 0.8 + vUv.y * 0.3);
        vec3 col = base * (uAmbient + uSunColor * 0.6);
        col = lumoApplyVeil(col, vWorld);
        float edge = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
        float a = (0.72 + streak * 0.28) * edge * smoothstep(0.0, 0.06, vUv.y);
        gl_FragColor = vec4(col, a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #ifdef USE_FOG
          gl_FragColor.rgb = lumoFog(gl_FragColor.rgb, vFogDepth, vFogView, fogColor, fogNear, fogFar);
        #endif
      }`,
    transparent: true, side: THREE.DoubleSide, depthWrite: false, fog: true,
  });
  const waterfall = new THREE.Mesh(wfGeo, wfMat);
  waterfall.renderOrder = 3;
  scene.add(waterfall);

  // Bach oben auf dem Grat (flacher Streifen in der Rinne)
  const streamPts = [];
  const sx0 = FEATURES.waterfall.top.x - W.dir.x * 14, sz0 = FEATURES.waterfall.top.z - W.dir.z * 14;
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const x = sx0 + (W.top.x - sx0) * t, z = sz0 + (W.top.z - sz0) * t;
    streamPts.push({ x, z, y: island.getHeight(x, z) + 0.3 });
  }
  const sPos = [], sUv = [], sIdx = [];
  streamPts.forEach((p, i) => {
    const w = 1.2 + i * 0.12;
    sPos.push(p.x + side.x * w, p.y, p.z + side.z * w, p.x - side.x * w, p.y, p.z - side.z * w);
    sUv.push(0, i / 10, 1, i / 10);
    if (i < streamPts.length - 1) { const a = i * 2; sIdx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  });
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.Float32BufferAttribute(sPos, 3));
  sGeo.setAttribute('uv', new THREE.Float32BufferAttribute(sUv, 2));
  sGeo.setIndex(sIdx);
  const stream = new THREE.Mesh(sGeo, wfMat);
  stream.renderOrder = 3;
  scene.add(stream);

  const splash = { x: W.bottom.x, y: botY + 0.3, z: W.bottom.z, top: topY };
  let splashT = 0;

  return {
    ocean, pool, waterfall, stream, depthTex, uniforms, splash,
    material: mat,
    // Wassertiefe (Meer) an Stelle x,z (positiv = unter Wasser)
    depthAt(x, z) { return Math.max(0, -island.getHeight(x, z)); },
    // Wasserspiegel (Meer 0, Teich höher)
    levelAt(x, z) { return island.waterLevel(x, z); },
    waveHeight(x, z, t = uniforms.uTime.value) {
      return Math.sin(x * 0.11 + z * 0.045 + t * 1.05) * 0.26 + Math.sin(-x * 0.063 + z * 0.12 + t * 0.87) * 0.2;
    },
    setQuality(q) {
      const g = oceanGeometry(q.waterSegments);
      ocean.geometry.dispose();
      ocean.geometry = g;
    },
    update(dt, time, particles, cameraPos) {
      uniforms.uTime.value = time;
      // Gischt am Wasserfall
      if (particles && cameraPos) {
        const d = Math.hypot(cameraPos.x - splash.x, cameraPos.z - splash.z);
        if (d < 140) {
          splashT += dt;
          while (splashT > 0.07) {
            splashT -= 0.07;
            particles.emit({ x: splash.x, y: splash.y, z: splash.z, spread: 3.2, speed: 1.6, up: 3.2, count: 2, color: 0xeefcff, size: 1.1, life: 1.3, gravity: -2.5, drag: 1.2, grow: 1.8, alpha: 0.55 });
          }
        }
      }
    },
  };
}

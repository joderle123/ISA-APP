// Grauschleier: entsättigt Zonen per Shader, Farbwelle beim Befreien.
// Außerdem: gemeinsamer Material-Patch (Schleier + richtungsabhängiger Nebel) für alle Welt-Materialien.
// Nutzung für neue Materialien: game.world.veil.patch(material, { veil: true, key: 'meinprop' })
import * as THREE from 'three';
import { ZONES, ZONE_INDEX } from './island.js';

export const MAX_ZONES = 8;

// GLSL: Uniforms + Funktionen (auch für eigene ShaderMaterials nutzbar: veil.glsl)
export const VEIL_GLSL = /* glsl */`
uniform vec4 uVeilZones[${MAX_ZONES}];
uniform float uVeilBase;
uniform vec4 uVeilWave;
uniform float uVeilStrength;
uniform float uLumoTime;
uniform vec3 uVeilHaze;
uniform vec3 uVeilFogColor;
uniform vec3 uFogSunColor;
uniform vec3 uFogSunDir;
uniform float uFogSunAmt;
float gLumoVeil = 0.0;
float gLumoRing = 0.0;
float lumoVeilAmount(vec3 p) {
  float cov = 0.0, acc = 0.0, wsum = 0.0, ring = 0.0;
  for (int k = 0; k < ${MAX_ZONES}; k++) {
    vec4 z = uVeilZones[k];
    if (z.z <= 0.0) continue;
    float d = distance(p.xz, z.xy);
    float w = 1.0 - smoothstep(z.z * 0.72, z.z * 1.18, d);
    float v = z.w;
    if (abs(float(k) - uVeilWave.w) < 0.5 && uVeilWave.z >= 0.0) {
      float dw = distance(p.xz, uVeilWave.xy);
      float inside = 1.0 - smoothstep(uVeilWave.z - 6.0, uVeilWave.z, dw);
      v *= 1.0 - inside;
      float rr = (dw - uVeilWave.z) / 3.2;
      ring = max(ring, max(w, 0.35) * exp(-rr * rr));
    }
    acc += w * v; wsum += w; cov = max(cov, w);
  }
  gLumoRing = ring;
  float zv = wsum > 0.0 ? acc / wsum : 0.0;
  return mix(uVeilBase, zv, cov) * uVeilStrength;
}
vec3 lumoApplyVeil(vec3 col, vec3 p) {
  float v = lumoVeilAmount(p);
  gLumoVeil = v;
  float l = dot(col, vec3(0.299, 0.587, 0.114));
  vec3 grey = vec3(l) * vec3(0.92, 0.95, 1.04) * 0.86 + uVeilHaze * (0.02 + l * 0.08);
  col = mix(col, grey, v * 0.9);
  if (gLumoRing > 0.002) {
    float a = atan(p.z - uVeilWave.y, p.x - uVeilWave.x);
    vec3 rb = 0.5 + 0.5 * cos(6.2831 * (a / 6.2831 * 2.0 + uLumoTime * 0.4 + vec3(0.0, 0.33, 0.67)));
    col += (rb * 0.9 + 0.35) * gLumoRing * 1.4;
  }
  return col;
}
vec3 lumoFog(vec3 col, float depth, vec3 viewPos, vec3 fogCol, float fogNear, float fogFar) {
  float f = smoothstep(fogNear, fogFar, depth);
  vec3 dir = normalize(viewPos);
  float s = max(dot(dir, uFogSunDir), 0.0);
  vec3 fc = mix(fogCol, uFogSunColor, pow(s, 4.0) * uFogSunAmt);
  f = max(f, gLumoVeil * 0.3 * smoothstep(6.0, 45.0, depth));
  fc = mix(fc, uVeilFogColor, gLumoVeil * 0.45 * smoothstep(6.0, 45.0, depth));
  return mix(col, fc, f);
}
`;

const FOG_FRAG = /* glsl */`
#ifdef USE_FOG
  gl_FragColor.rgb = lumoFog(gl_FragColor.rgb, vFogDepth, vFogView, fogColor, fogNear, fogFar);
#endif
`;

export function createVeil({ events, audio } = {}) {
  const zones = ZONES.map((z) => ({ id: z.id, x: z.x, z: z.z, r: z.r, veil: z.id === 'hafen' ? 0 : 1 }));
  const zoneVecs = [];
  for (let i = 0; i < MAX_ZONES; i++) zoneVecs.push(new THREE.Vector4(0, 0, 0, 0));
  const uniforms = {
    uVeilZones: { value: zoneVecs },
    uVeilBase: { value: 0.55 },
    uVeilWave: { value: new THREE.Vector4(0, 0, -1, -1) },
    uVeilStrength: { value: 1 },
    uLumoTime: { value: 0 },
    uVeilHaze: { value: new THREE.Color('#a9a3c8') },
    uVeilFogColor: { value: new THREE.Color('#9d9aae') },
    uFogSunColor: { value: new THREE.Color('#ffb070') },
    uFogSunDir: { value: new THREE.Vector3(0, 0, -1) },
    uFogSunAmt: { value: 0.8 },
  };
  let base = 0.55;
  let wave = null; // {index, x, z, radius, maxR, t, duration, onDone}

  function sync() {
    zones.forEach((z, i) => zoneVecs[i].set(z.x, z.z, z.r, z.veil));
  }
  function baseTarget() {
    const m = zones.reduce((s, z) => s + z.veil, 0) / zones.length;
    return 0.68 * m;
  }
  sync();
  base = baseTarget();
  uniforms.uVeilBase.value = base;

  // Material patchen (onBeforeCompile wird verkettet)
  function patch(material, opts = {}) {
    const veilOn = opts.veil !== false;
    const prev = material.onBeforeCompile;
    const prevKey = material.customProgramCacheKey && material.userData.__lumoKey ? material.userData.__lumoKey : '';
    material.onBeforeCompile = (shader, renderer) => {
      if (prev && prev !== THREE.Material.prototype.onBeforeCompile) prev.call(material, shader, renderer);
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vVeilPos;\nvarying vec3 vFogView;')
        .replace('#include <fog_vertex>', `#include <fog_vertex>
  vec4 lumoWP = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    lumoWP = instanceMatrix * lumoWP;
  #endif
  lumoWP = modelMatrix * lumoWP;
  vVeilPos = lumoWP.xyz;
  vFogView = mvPosition.xyz;`);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vVeilPos;\nvarying vec3 vFogView;\n' + VEIL_GLSL + (opts.fragmentPars || ''))
        .replace('#include <opaque_fragment>', (opts.beforeVeil || '') + (veilOn ? 'outgoingLight = lumoApplyVeil(outgoingLight, vVeilPos);\n' : '') + (opts.afterVeil || '') + '#include <opaque_fragment>')
        .replace('#include <fog_fragment>', FOG_FRAG);
      if (opts.uniforms) Object.assign(shader.uniforms, opts.uniforms);
      if (opts.vertex) shader.vertexShader = opts.vertex(shader.vertexShader);
      if (opts.fragment) shader.fragmentShader = opts.fragment(shader.fragmentShader);
    };
    const key = prevKey + '|lumo' + (veilOn ? 'V' : 'n') + (opts.key || '');
    material.userData.__lumoKey = key;
    material.customProgramCacheKey = () => key;
    material.needsUpdate = true;
    return material;
  }

  const veil = {
    uniforms,
    glsl: VEIL_GLSL,
    zones,
    patch,
    // Sofort setzen (0 = farbig, 1 = grau)
    setZone(id, amount) {
      const z = zones[ZONE_INDEX[id]];
      if (!z) return;
      z.veil = Math.max(0, Math.min(1, amount));
      sync();
    },
    veilZone(id) { veil.setZone(id, 1); },
    isVeiled(id) { const z = zones[ZONE_INDEX[id]]; return !!z && z.veil > 0.5; },
    amountAt(x, z) {
      // CPU-Näherung der Shader-Formel
      let cov = 0, acc = 0, ws = 0;
      for (const Z of zones) {
        const d = Math.hypot(x - Z.x, z - Z.z);
        const t = Math.max(0, Math.min(1, (d - Z.r * 0.72) / (Z.r * 0.46)));
        const w = 1 - t * t * (3 - 2 * t);
        acc += w * Z.veil; ws += w; cov = Math.max(cov, w);
      }
      const zv = ws > 0 ? acc / ws : 0;
      return base + (zv - base) * cov;
    },
    // Farbwelle: breitet sich vom Punkt aus und befreit die Zone
    restoreZone(id, opts = {}) {
      const index = ZONE_INDEX[id];
      const z = zones[index];
      if (!z) return false;
      if (wave) finishWave();
      const cx = opts.x !== undefined ? opts.x : z.x;
      const cz = opts.z !== undefined ? opts.z : z.z;
      const maxR = Math.hypot(cx - z.x, cz - z.z) + z.r * 1.35;
      wave = { index, id, x: cx, z: cz, radius: 0, maxR, t: 0, duration: opts.duration || 4.2, onDone: opts.onDone };
      uniforms.uVeilWave.value.set(cx, cz, 0, index);
      if (audio && opts.sound !== false) audio.play('restore');
      events && events.emit('veil:restore:start', { id, x: cx, z: cz });
      return true;
    },
    // Ganze Insel befreien (Finale)
    restoreAll() { zones.forEach((z) => { z.veil = 0; }); sync(); },
    get waveActive() { return !!wave; },
    get wave() { return wave; },
    getState() { return Object.fromEntries(zones.map((z) => [z.id, z.veil])); },
    setState(s) { zones.forEach((z) => { if (s && typeof s[z.id] === 'number') z.veil = s[z.id]; }); sync(); base = baseTarget(); uniforms.uVeilBase.value = base; },
    update(dt, time) {
      uniforms.uLumoTime.value = time;
      if (wave) {
        wave.t += dt;
        const k = Math.min(1, wave.t / wave.duration);
        const e = 1 - Math.pow(1 - k, 2.2);
        wave.radius = e * wave.maxR;
        uniforms.uVeilWave.value.z = wave.radius;
        if (k >= 1) finishWave();
      }
      const bt = baseTarget();
      base += (bt - base) * Math.min(1, dt * 0.8);
      uniforms.uVeilBase.value = base;
    },
  };
  function finishWave() {
    const w = wave;
    wave = null;
    zones[w.index].veil = 0;
    sync();
    uniforms.uVeilWave.value.set(0, 0, -1, -1);
    events && events.emit('veil:restored', { id: w.id });
    if (w.onDone) w.onDone();
  }
  return veil;
}

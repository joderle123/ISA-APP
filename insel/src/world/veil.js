// Grauschleier (WP10): entsättigt Zonen und Flecken per Shader, Farbwelle beim Befreien (auch Teilwellen),
// blaugraue Rückfall-Welle nach innen, weiche Übergänge bei Teilwerten. 12 Slots: 8 Zonen + 4 Flecken (Mangrove,
// Glimmer, Quellen, Rückfall …). Die CPU-Funktion amountAt() rechnet exakt die Shader-Formel nach.
// Außerdem: gemeinsamer Material-Patch (Schleier + richtungsabhängiger Nebel + Farbkorrektur) für alle Welt-Materialien.
//   veil.setZone(id, amount, { seconds })      Zone sofort oder weich auf einen Wert (0 = farbig, 1 = grau)
//   veil.addPatch({ id, x, z, r, veil })       Fleck (überstimmt seine Zone) · setPatch(id, amount, { seconds }) · removePatch(id)
//   veil.restoreZone(id, { x, z, amount = 0, duration, onDone })   Farbwelle nach außen bis zum Zielwert (Teil-Farbwelle)
//   veil.relapse(id, { to = 1, duration, onDone })                 Rückfall: blaugraue Welle vom Rand nach innen
//   veil.amountAt(x, z) · isVeiled(id) · getState() (Zonen flach) · getFullState() ({ zones, patches }) · setState(flach | voll)
//   veil.patch(material, { veil: true, key: 'meinprop' })          Material mit Schleier/Nebel/Farbkorrektur
// Eigene ShaderMaterials: veil.glsl einbinden, veil.uniforms übernehmen, am Ende lumoGrade(lumoFog(...)).
// Ereignisse: veil:restore:start {id, x, z, maxR, duration, to} · veil:restored {id, to} · veil:relapse:start {id, x, z, maxR, duration, to}
//   · veil:relapsed {id, to} · veil:patch {id, action:'add'|'remove'}
import * as THREE from 'three';
import { ZONES, ZONE_INDEX } from './island.js';

export const MAX_ZONES = 12;        // Slots im Shader
export const NUM_ZONES = 8;         // Slots 0–7: Zonen (island.ZONES), 8–11: Flecken
export const MAX_PATCHES = MAX_ZONES - NUM_ZONES;
export const WAVE_FRONT = 7.0;      // Breite der Wellenfront (m)
export const RING_WIDTH = 4.5;      // Breite des Regenbogenrings (m)

// ---- Reine Formel (CPU), identisch zum GLSL unten ----
export const smoothstep = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const mix = (a, b, t) => a + (b - a) * t;
export const zoneWeight = (z, x, zz) => 1 - smoothstep(z.r * 0.72, z.r * 1.18, Math.hypot(x - z.x, zz - z.z));
export const patchWeight = (z, x, zz) => 1 - smoothstep(z.r * 0.55, z.r, Math.hypot(x - z.x, zz - z.z));
// Anteil „von der Welle schon erreicht“ an einem Punkt: nach außen laufend innen 1, nach innen laufend außen 1
export function waveInside(wave, x, z) {
  const dw = Math.hypot(x - wave.x, z - wave.z);
  return wave.dir > 0 ? 1 - smoothstep(wave.radius - WAVE_FRONT, wave.radius, dw) : smoothstep(wave.radius, wave.radius + WAVE_FRONT, dw);
}
/**
 * Schleierwert am Punkt. slots: [{x,z,r,veil}] (Länge MAX_ZONES, r<=0 = leer), base, wave: {index,x,z,radius,dir,from,to}|null
 */
export function veilFormula(slots, base, wave, x, z, strength = 1) {
  let cov = 0, acc = 0, wsum = 0;
  const valueOf = (k, v) => (wave && wave.index === k && wave.radius >= 0 ? mix(wave.from, wave.to, waveInside(wave, x, z)) : v);
  for (let k = 0; k < NUM_ZONES; k++) {
    const s = slots[k];
    if (!s || s.r <= 0) continue;
    const w = zoneWeight(s, x, z);
    acc += w * valueOf(k, s.veil); wsum += w; cov = Math.max(cov, w);
  }
  let amt = mix(base, wsum > 0 ? acc / wsum : 0, cov);
  for (let k = NUM_ZONES; k < MAX_ZONES; k++) {
    const s = slots[k];
    if (!s || s.r <= 0) continue;
    amt = mix(amt, valueOf(k, s.veil), patchWeight(s, x, z));
  }
  return amt * strength;
}

// GLSL: Uniforms + Funktionen (auch für eigene ShaderMaterials nutzbar: veil.glsl)
export const VEIL_GLSL = /* glsl */`
uniform vec4 uVeilZones[${MAX_ZONES}];
uniform float uVeilBase;
uniform vec4 uVeilWave;
uniform vec4 uVeilWave2;
uniform float uVeilStrength;
uniform float uLumoTime;
uniform vec3 uVeilHaze;
uniform vec3 uVeilFogColor;
uniform vec3 uFogSunColor;
uniform vec3 uFogSunDir;
uniform float uFogSunAmt;
uniform vec3 uGradeLift;
uniform vec3 uGradeGain;
uniform float uGradeSat;
uniform float uGradeContrast;
float gLumoVeil = 0.0;
float gLumoRing = 0.0;
float gLumoInside = 0.0;
// Wellenwert für Slot k (uVeilWave: x, z, Radius, Slot · uVeilWave2: von, nach, Richtung ±1, Art 0 Farbwelle / 1 Rückfall)
float lumoWaveValue(int k, float v, vec2 p, float w) {
  if (uVeilWave.z < 0.0 || abs(float(k) - uVeilWave.w) > 0.5) return v;
  float dw = distance(p, uVeilWave.xy);
  float R = uVeilWave.z;
  float ins = uVeilWave2.z > 0.0 ? 1.0 - smoothstep(R - ${WAVE_FRONT.toFixed(1)}, R, dw) : smoothstep(R, R + ${WAVE_FRONT.toFixed(1)}, dw);
  gLumoInside = max(gLumoInside, ins * w);
  float rr = (dw - R) / ${RING_WIDTH.toFixed(1)};
  gLumoRing = max(gLumoRing, max(w, 0.35) * exp(-rr * rr));
  return mix(uVeilWave2.x, uVeilWave2.y, ins);
}
float lumoVeilAmount(vec3 p) {
  float cov = 0.0, acc = 0.0, wsum = 0.0;
  gLumoRing = 0.0; gLumoInside = 0.0;
  for (int k = 0; k < ${NUM_ZONES}; k++) {
    vec4 z = uVeilZones[k];
    if (z.z <= 0.0) continue;
    float w = 1.0 - smoothstep(z.z * 0.72, z.z * 1.18, distance(p.xz, z.xy));
    float v = lumoWaveValue(k, z.w, p.xz, w);
    acc += w * v; wsum += w; cov = max(cov, w);
  }
  float amt = mix(uVeilBase, wsum > 0.0 ? acc / wsum : 0.0, cov);
  for (int k = ${NUM_ZONES}; k < ${MAX_ZONES}; k++) {
    vec4 z = uVeilZones[k];
    if (z.z <= 0.0) continue;
    float w = 1.0 - smoothstep(z.z * 0.55, z.z, distance(p.xz, z.xy));
    float v = lumoWaveValue(k, z.w, p.xz, w);
    amt = mix(amt, v, w);
  }
  return amt * uVeilStrength;
}
vec3 lumoApplyVeil(vec3 col, vec3 p) {
  float v = lumoVeilAmount(p);
  gLumoVeil = v;
  float l = dot(col, vec3(0.299, 0.587, 0.114));
  // „Verflucht“: Kontrast flach, kalt-violett getönt, dunkle Schatten, träge wandernde Schlieren
  float lf = 0.07 + l * 0.66;
  float drift = 0.9 + 0.1 * sin(p.x * 0.11 + uLumoTime * 0.25) * sin(p.z * 0.09 - uLumoTime * 0.19 + p.y * 0.2);
  vec3 grey = vec3(lf) * vec3(0.86, 0.87, 0.98) * drift + uVeilHaze * (0.03 + l * 0.08);
  col = mix(col, grey, clamp(v * 0.94, 0.0, 1.0));
  if (gLumoRing > 0.002) {
    float r = clamp(gLumoRing, 0.0, 1.0);
    if (uVeilWave2.w < 0.5) {
      // Farbwelle: breiter Regenbogenring mit hellem Vorderrand
      float a = atan(p.z - uVeilWave.y, p.x - uVeilWave.x);
      vec3 rb = 0.5 + 0.5 * cos(6.2831 * (a / 6.2831 * 3.0 + uLumoTime * 0.6 + vec3(0.0, 0.33, 0.67)));
      rb = rb * rb;
      col = mix(col, col * 0.5 + rb * 1.7 + 0.1, r * 0.9);
      col += vec3(1.0, 0.98, 0.9) * pow(r, 6.0) * 0.9;
    } else {
      // Rückfall: kalte, blaugraue Front mit dunklem Saum und Flackern
      float flick = 0.8 + 0.2 * sin(uLumoTime * 7.0 + p.x * 0.5 + p.z * 0.4);
      col = mix(col, vec3(0.42, 0.47, 0.66) * flick, r * 0.85);
      col = mix(col, vec3(0.16, 0.14, 0.24), pow(r, 5.0) * 0.8);
    }
  }
  // frisch befreite Fläche leuchtet kurz nach (innerhalb der Farbwelle)
  if (uVeilWave2.w < 0.5) col += col * gLumoInside * 0.25 * clamp(1.0 - (uVeilWave.z - distance(p.xz, uVeilWave.xy)) / 14.0, 0.0, 1.0);
  return col;
}
vec3 lumoFog(vec3 col, float depth, vec3 viewPos, vec3 fogCol, float fogNear, float fogFar) {
  float f = smoothstep(fogNear, fogFar, depth);
  vec3 dir = normalize(viewPos);
  float s = max(dot(dir, uFogSunDir), 0.0);
  vec3 fc = mix(fogCol, uFogSunColor, pow(s, 4.0) * uFogSunAmt);
  f = max(f, gLumoVeil * 0.34 * smoothstep(5.0, 40.0, depth));
  fc = mix(fc, uVeilFogColor, gLumoVeil * 0.5 * smoothstep(5.0, 40.0, depth));
  return mix(col, fc, f);
}
// Farbkorrektur (nach Tone-Mapping, im sRGB-Ausgaberaum): Sättigung, Kontrast, warme Lichter / kühle Schatten
vec3 lumoGrade(vec3 c) {
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  c = mix(vec3(l), c, uGradeSat);
  c = (c - 0.5) * uGradeContrast + 0.5;
  c = c * uGradeGain + uGradeLift * (1.0 - l);
  return clamp(c, 0.0, 1.0);
}
`;

const FOG_FRAG = /* glsl */`
#ifdef USE_FOG
  gl_FragColor.rgb = lumoFog(gl_FragColor.rgb, vFogDepth, vFogView, fogColor, fogNear, fogFar);
#endif
  gl_FragColor.rgb = lumoGrade(gl_FragColor.rgb);
`;

export function createVeil({ events, audio, zones: zoneDefs = ZONES } = {}) {
  // Slots 0..7 Zonen, 8..11 Flecken. veil = aktueller Wert, target/speed = weicher Übergang
  const slots = [];
  for (let i = 0; i < MAX_ZONES; i++) slots.push({ id: null, x: 0, z: 0, r: 0, veil: 0, target: null, rate: 0, patch: i >= NUM_ZONES });
  zoneDefs.slice(0, NUM_ZONES).forEach((z, i) => { Object.assign(slots[i], { id: z.id, x: z.x, z: z.z, r: z.r, veil: z.id === 'hafen' ? 0 : 1 }); });
  const zones = slots.slice(0, NUM_ZONES).filter((s) => s.id);
  const zoneIndex = Object.fromEntries(zones.map((z, i) => [z.id, i]));
  const zoneVecs = [];
  for (let i = 0; i < MAX_ZONES; i++) zoneVecs.push(new THREE.Vector4(0, 0, 0, 0));
  const uniforms = {
    uVeilZones: { value: zoneVecs },
    uVeilBase: { value: 0.55 },
    uVeilWave: { value: new THREE.Vector4(0, 0, -1, -1) },
    uVeilWave2: { value: new THREE.Vector4(1, 0, 1, 0) },
    uVeilStrength: { value: 1 },
    uLumoTime: { value: 0 },
    uVeilHaze: { value: new THREE.Color('#8f86b8') },
    uVeilFogColor: { value: new THREE.Color().setRGB(0.55, 0.54, 0.63, THREE.LinearSRGBColorSpace) }, // roh (sRGB)
    uFogSunColor: { value: new THREE.Color().setRGB(1, 0.69, 0.44, THREE.LinearSRGBColorSpace) }, // roh (sRGB)
    uFogSunDir: { value: new THREE.Vector3(0, 0, -1) },
    uFogSunAmt: { value: 0.8 },
    // Farbkorrektur (wird vom Himmel je nach Tageszeit gesetzt)
    uGradeLift: { value: new THREE.Vector3(0, 0, 0) },
    uGradeGain: { value: new THREE.Vector3(1, 1, 1) },
    uGradeSat: { value: 1 },
    uGradeContrast: { value: 1 },
  };
  let base = 0.55;
  let baseOverride = null;   // Innenräume (WP18): Schleierwert außerhalb aller Zonen, z. B. graue Hafengrotte
  let wave = null; // { index, id, x, z, radius, maxR, t, duration, dir, from, to, kind:'welle'|'rueckfall', onDone }

  const clamp01 = (v) => Math.max(0, Math.min(1, Number(v) || 0));
  function sync() {
    for (let i = 0; i < MAX_ZONES; i++) { const s = slots[i]; zoneVecs[i].set(s.x, s.z, s.r, s.veil); }
  }
  function baseTarget() {
    if (!zones.length) return 0;
    const m = zones.reduce((s, z) => s + z.veil, 0) / zones.length;
    return 0.32 * m;
  }
  sync();
  base = baseTarget();
  uniforms.uVeilBase.value = base;

  function slotOf(id) {
    if (zoneIndex[id] !== undefined) return zoneIndex[id];
    for (let i = NUM_ZONES; i < MAX_ZONES; i++) if (slots[i].id === id) return i;
    return -1;
  }
  function setValue(index, amount, opts = {}) {
    const s = slots[index];
    const a = clamp01(amount);
    const seconds = opts.seconds || opts.duration || 0;
    if (seconds > 0.01) { s.target = a; s.rate = Math.abs(a - s.veil) / seconds; }
    else { s.veil = a; s.target = null; sync(); }
    return a;
  }
  function startWave(index, { x, z, from, to, dir, kind, duration, onDone, maxR }) {
    if (wave) finishWave();
    const s = slots[index];
    const cx = x !== undefined ? x : s.x, cz = z !== undefined ? z : s.z;
    const R = maxR !== undefined ? maxR : Math.hypot(cx - s.x, cz - s.z) + s.r * 1.35;
    s.target = null;   // ein laufender Übergang wird von der Welle übernommen
    wave = { index, id: s.id, x: cx, z: cz, radius: dir > 0 ? 0 : R, maxR: R, t: 0, duration: duration || (dir > 0 ? 4.6 : 5.2), dir, from: from !== undefined ? clamp01(from) : s.veil, to: clamp01(to), kind, onDone };
    uniforms.uVeilWave.value.set(cx, cz, wave.radius, index);
    uniforms.uVeilWave2.value.set(wave.from, wave.to, dir, kind === 'rueckfall' ? 1 : 0);
    return wave;
  }
  function finishWave() {
    const w = wave;
    wave = null;
    slots[w.index].veil = w.to;
    slots[w.index].target = null;
    sync();
    uniforms.uVeilWave.value.set(0, 0, -1, -1);
    if (events) events.emit(w.kind === 'rueckfall' ? 'veil:relapsed' : 'veil:restored', { id: w.id, to: w.to });
    if (w.onDone) w.onDone();
  }
  function currentWave() {
    return wave ? { index: wave.index, x: wave.x, z: wave.z, radius: wave.radius, dir: wave.dir, from: wave.from, to: wave.to } : null;
  }

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
    slots,
    patch,
    get patches() { return slots.slice(NUM_ZONES).filter((s) => s.id); },
    // Farbkorrektur setzen: { lift:[r,g,b], gain:[r,g,b], sat, contrast }
    setGrade({ lift, gain, sat, contrast } = {}) {
      if (lift) uniforms.uGradeLift.value.set(lift[0], lift[1], lift[2]);
      if (gain) uniforms.uGradeGain.value.set(gain[0], gain[1], gain[2]);
      if (sat !== undefined) uniforms.uGradeSat.value = sat;
      if (contrast !== undefined) uniforms.uGradeContrast.value = contrast;
    },
    // Zone setzen (0 = farbig, 1 = grau); { seconds } = weicher Übergang
    setZone(id, amount, opts) {
      const i = zoneIndex[id];
      if (i === undefined) return false;
      setValue(i, amount, opts);
      return true;
    },
    veilZone(id) { veil.setZone(id, 1); },
    zoneValue(id) { const i = slotOf(id); return i < 0 ? null : slots[i].veil; },
    isVeiled(id) { const i = slotOf(id); return i >= 0 && slots[i].veil > 0.5; },
    // ---- Flecken (Slots 8–11): überstimmen ihre Zone ----
    addPatch({ id, x, z, r, veil: amount = 1, seconds } = {}) {
      if (!id || !(r > 0)) return null;
      let i = slotOf(id);
      if (i >= 0 && i < NUM_ZONES) return null;                       // Zonen-ID
      if (i < 0) { i = slots.findIndex((s, k) => k >= NUM_ZONES && !s.id); if (i < 0) return null; }
      const s = slots[i];
      const fresh = !s.id;
      Object.assign(s, { id, x, z, r, target: null });
      if (fresh || !seconds) s.veil = clamp01(amount); else setValue(i, amount, { seconds });
      sync();
      if (events && fresh) events.emit('veil:patch', { id, action: 'add' });
      return s;
    },
    setPatch(id, amount, opts) {
      const i = slotOf(id);
      if (i < NUM_ZONES) return false;
      setValue(i, amount, opts);
      return true;
    },
    removePatch(id) {
      const i = slotOf(id);
      if (i < NUM_ZONES) return false;
      if (wave && wave.index === i) { wave = null; uniforms.uVeilWave.value.set(0, 0, -1, -1); }
      Object.assign(slots[i], { id: null, x: 0, z: 0, r: 0, veil: 0, target: null });
      sync();
      if (events) events.emit('veil:patch', { id, action: 'remove' });
      return true;
    },
    getPatch(id) { const i = slotOf(id); return i >= NUM_ZONES ? slots[i] : null; },
    patchAt(x, z) { let best = null; for (let i = NUM_ZONES; i < MAX_ZONES; i++) { const s = slots[i]; if (s.id && Math.hypot(x - s.x, z - s.z) <= s.r) best = s; } return best; },
    amountAt(x, z) {
      // CPU-Nachbau der Shader-Formel (inkl. laufender Welle)
      return veilFormula(slots, base, currentWave(), x, z, uniforms.uVeilStrength.value);
    },
    // Farbwelle: breitet sich vom Punkt aus und befreit Zone oder Fleck bis zum Zielwert (amount, Standard 0)
    restoreZone(id, opts = {}) {
      const index = slotOf(id);
      if (index < 0) return false;
      const to = opts.amount !== undefined ? opts.amount : (opts.to !== undefined ? opts.to : 0);
      const w = startWave(index, { x: opts.x, z: opts.z, to, from: opts.from, dir: 1, kind: 'welle', duration: opts.duration, onDone: opts.onDone });
      if (audio && opts.sound !== false) audio.play('restore');
      if (events) events.emit('veil:restore:start', { id, x: w.x, z: w.z, maxR: w.maxR, duration: w.duration, to: w.to, from: w.from });
      return true;
    },
    // Schleier-Rückfall: kalte Welle vom Rand nach innen, der Ort wird wieder grau (to, Standard 1)
    relapse(id, opts = {}) {
      const index = slotOf(id);
      if (index < 0) return false;
      const to = opts.to !== undefined ? opts.to : (opts.amount !== undefined ? opts.amount : 1);
      const w = startWave(index, { x: opts.x, z: opts.z, to, from: opts.from, dir: -1, kind: 'rueckfall', duration: opts.duration, onDone: opts.onDone });
      if (audio && opts.sound !== false && audio.has && audio.has('rueckfall')) audio.play('rueckfall');
      if (events) events.emit('veil:relapse:start', { id, x: w.x, z: w.z, maxR: w.maxR, duration: w.duration, to: w.to, from: w.from });
      return true;
    },
    // Ganze Insel befreien (Finale)
    restoreAll() { for (const s of slots) if (s.id) { s.veil = 0; s.target = null; } sync(); },
    // Grundwert außerhalb aller Zonen festlegen (Innenräume liegen in einer Tasche ohne Zone); null = automatisch
    setBaseOverride(v) { baseOverride = v === null || v === undefined ? null : clamp01(v); if (baseOverride !== null) { base = baseOverride; uniforms.uVeilBase.value = base; } },
    get baseValue() { return base; },
    get waveActive() { return !!wave; },
    get wave() { return wave; },
    getState() { return Object.fromEntries(zones.map((z) => [z.id, +z.veil.toFixed(4)])); },
    getFullState() {
      return {
        zones: veil.getState(),
        patches: Object.fromEntries(veil.patches.map((p) => [p.id, { x: p.x, z: p.z, r: p.r, veil: +p.veil.toFixed(4) }])),
      };
    },
    setState(s) {
      if (!s) return;
      const zs = s.zones && typeof s.zones === 'object' ? s.zones : s;
      zones.forEach((z) => { if (typeof zs[z.id] === 'number') { z.veil = clamp01(zs[z.id]); z.target = null; } });
      if (s.patches && typeof s.patches === 'object') {
        for (const [id, p] of Object.entries(s.patches)) {
          if (!p) continue;
          const ex = veil.getPatch(id);
          if (ex) { ex.veil = clamp01(p.veil); ex.target = null; if (p.r) { ex.x = p.x; ex.z = p.z; ex.r = p.r; } }
          else if (p.r > 0) veil.addPatch({ id, x: p.x, z: p.z, r: p.r, veil: p.veil });
        }
      }
      sync(); base = baseTarget(); uniforms.uVeilBase.value = base;
    },
    update(dt, time) {
      uniforms.uLumoTime.value = time;
      let dirty = false;
      if (wave) {
        wave.t += dt;
        const k = Math.min(1, wave.t / wave.duration);
        const e = 1 - Math.pow(1 - k, 2.2);
        wave.radius = wave.dir > 0 ? e * wave.maxR : (1 - e) * wave.maxR;
        uniforms.uVeilWave.value.z = wave.radius;
        if (k >= 1) finishWave();
      }
      // weiche Übergänge
      for (const s of slots) {
        if (s.target === null || (wave && slots[wave.index] === s)) continue;
        const d = s.target - s.veil;
        const step = s.rate * dt;
        if (Math.abs(d) <= step) { s.veil = s.target; s.target = null; } else s.veil += Math.sign(d) * step;
        dirty = true;
      }
      if (dirty) sync();
      const bt = baseOverride !== null ? baseOverride : baseTarget();
      base += (bt - base) * Math.min(1, dt * (baseOverride !== null ? 6 : 0.8));
      uniforms.uVeilBase.value = base;
    },
  };
  return veil;
}

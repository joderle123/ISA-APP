// Materialien des Requisiten-Baukastens (WP43): alle schleierfähig (veil.patch), Low-Poly mit Flächenfarben.
//   base            Lambert, flach schattiert, Vertexfarben (Standard für alles Feste)
//   glow(hex, o)    Lambert mit Emission (Laternen, Kristalle, Runen); o.veil=false = leuchtet auch im Grau
//   glass(hex)      halbtransparent (Tanks, Glas)
//   flame()         Flammen: Vertexfarben, hell, Flackern im Vertex-Shader (aWind = Höhe 0..1)
//   flap(o)         Flügelschlag: aWind = Abstand vom Körper, Uniforms uFlapSpeed / uFlapAmp / uPhase je Material
//   cloud()         Wolkenkörper (Titan): weich, leicht durchscheinend, leuchtende Adern über aWind
import * as THREE from 'three';
import { lambertVC } from '../../world/landmarks.js';

export function createMaterials(veil) {
  const cache = new Map();
  const base = lambertVC(veil, 'props');
  const baseDouble = lambertVC(veil, 'props2', { side: THREE.DoubleSide });

  function glow(hex, { intensity = 0.7, veil: withVeil = true, opacity = 1 } = {}) {
    const key = `glow:${hex}:${intensity}:${withVeil}:${opacity}`;
    if (cache.has(key)) return cache.get(key);
    const m = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, emissive: new THREE.Color(hex), emissiveIntensity: intensity, transparent: opacity < 1, opacity });
    if (veil) veil.patch(m, { key: 'pglow' + (withVeil ? 'v' : 'n'), veil: withVeil });
    cache.set(key, m);
    return m;
  }
  function glass(hex = '#bfe8ff', { opacity = 0.35 } = {}) {
    const key = `glass:${hex}:${opacity}`;
    if (cache.has(key)) return cache.get(key);
    const m = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, transparent: true, opacity, depthWrite: false, side: THREE.DoubleSide, emissive: new THREE.Color(hex), emissiveIntensity: 0.12 });
    if (veil) veil.patch(m, { key: 'pglass' });
    cache.set(key, m);
    return m;
  }
  function flame() {
    if (cache.has('flame')) return cache.get('flame');
    const m = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.92, depthWrite: false, side: THREE.DoubleSide });
    m.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nattribute float aWind;\nuniform float uLumoTime;')
        .replace('#include <begin_vertex>', `#include <begin_vertex>
        {
          vec3 ip = vec3(0.0);
          #ifdef USE_INSTANCING
            ip = instanceMatrix[3].xyz;
          #endif
          float ph = ip.x * 1.3 + ip.z * 0.7 + position.y * 2.0;
          float k = aWind;
          transformed.x += sin(uLumoTime * 9.0 + ph) * k * 0.14 + sin(uLumoTime * 23.0 + ph * 3.0) * k * 0.04;
          transformed.z += cos(uLumoTime * 7.5 + ph) * k * 0.12;
          transformed.y *= 0.92 + 0.16 * sin(uLumoTime * 11.0 + ph) * k;
        }`);
    };
    m.userData.__lumoKey = 'flame';
    m.customProgramCacheKey = () => 'flame';
    if (veil) veil.patch(m, { key: 'pflame' });
    cache.set('flame', m);
    return m;
  }
  // Flügelschlag: jedes Material bekommt eigene Uniforms (gleicher Shader → ein Programm)
  function flap({ speed = 8, amp = 0.9, phase = 0, side = THREE.DoubleSide } = {}) {
    const u = { uFlapSpeed: { value: speed }, uFlapAmp: { value: amp }, uPhase: { value: phase } };
    const m = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, side });
    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, u);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nattribute float aWind;\nuniform float uLumoTime;\nuniform float uFlapSpeed;\nuniform float uFlapAmp;\nuniform float uPhase;')
        .replace('#include <begin_vertex>', `#include <begin_vertex>
        {
          float f = sin(uLumoTime * uFlapSpeed + uPhase);
          transformed.y += f * aWind * uFlapAmp;
          transformed.x *= 1.0 - abs(f) * aWind * 0.22;
        }`);
    };
    m.userData.__lumoKey = 'pflap';
    m.customProgramCacheKey = () => 'pflap';
    if (veil) veil.patch(m, { key: 'pflap' });
    m.userData.flap = u;
    return m;
  }
  function cloud(tint = '#5a5670') {
    const key = 'cloud:' + tint;
    if (cache.has(key)) return cache.get(key);
    const m = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, transparent: true, opacity: 0.94, emissive: new THREE.Color(tint), emissiveIntensity: 0.12 });
    if (veil) veil.patch(m, { key: 'pcloud', veil: false });
    cache.set(key, m);
    return m;
  }
  return { base, baseDouble, glow, glass, flame, flap, cloud, cache };
}

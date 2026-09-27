// Lichtpool (Stil-Bibel §5.5 „Laternen und Feuer als Hauptlichtquellen“): drei Punktlichter (mittel/hoch), die jedes Bild
// den drei nächsten leuchtenden Laternen/Feuern folgen – warm #FFB070, Reichweite 7 m, ohne Schatten. Die Lichtquellen
// meldet die Welt (lights.setEmitters([{ x, y, z, i, color }])), Feuer/Laternen mit lit = false fallen heraus.
// Nachts volle Stärke, tagsüber nur ein Hauch (die Sonne trägt); weiche Überblendung beim Wechsel der Quellen.
import * as THREE from 'three';

export const POOL_SIZE = 3;

export function createLightPool({ scene, quality }) {
  const lights = [];
  for (let i = 0; i < POOL_SIZE; i++) {
    const l = new THREE.PointLight(0xffb070, 0, 7, 2);
    l.castShadow = false;
    l.visible = false;
    l.name = 'pool-light-' + i;
    scene.add(l);
    lights.push({ light: l, target: null, level: 0, want: 0 });
  }
  let emitters = [];
  let enabled = !!(quality && quality.post);
  let refresh = 0;
  const _c = new THREE.Color();
  function pick(focus) {
    const near = emitters
      .map((e) => ({ e, d: Math.hypot(e.x - focus.x, e.z - focus.z) }))
      .filter((o) => o.d < 40)
      .sort((a, b) => a.d - b.d)
      .slice(0, POOL_SIZE);
    // bestehende Zuordnung behalten, freie Slots mit neuen Quellen füllen (kein Springen)
    const keep = new Set();
    for (const s of lights) { const still = near.find((o) => o.e === s.target); if (still) keep.add(s.target); else s.want = 0; }
    for (const o of near) {
      if (keep.has(o.e)) continue;
      const slot = lights.find((s) => s.target === null) || lights.find((s) => s.want === 0 && s.level < 0.05);
      if (!slot) continue;
      slot.target = o.e; slot.want = 1; slot.level = Math.max(slot.level, 0.0);
    }
    for (const s of lights) if (s.target && near.find((o) => o.e === s.target)) s.want = 1;
  }
  const api = {
    lights: lights.map((s) => s.light),
    get enabled() { return enabled; },
    setQuality(q) { enabled = !!(q && q.post); if (!enabled) for (const s of lights) { s.light.visible = false; s.light.intensity = 0; s.target = null; s.level = 0; } },
    setEmitters(list) { emitters = list || []; refresh = 0; },
    get emitters() { return emitters; },
    update(dt, focus, night = 0) {
      if (!enabled || !focus) return;
      refresh -= dt;
      if (refresh <= 0) { refresh = 0.4; pick(focus); }
      const strength = 0.12 + 0.88 * Math.max(0, Math.min(1, (night - 0.1) / 0.6));
      for (const s of lights) {
        s.level += (s.want - s.level) * Math.min(1, dt * 3);
        if (s.level < 0.02 && s.want === 0) { s.target = null; s.light.visible = false; s.light.intensity = 0; continue; }
        const e = s.target;
        if (!e) continue;
        s.light.visible = true;
        s.light.position.set(e.x, e.y, e.z);
        s.light.intensity = (e.i || 6) * s.level * strength * (e.flicker ? 0.9 + 0.1 * Math.sin(performance.now() * 0.011 + e.x) : 1);
        s.light.distance = e.r || 7;
        s.light.color.copy(_c.set(e.color || '#ffb070'));
      }
    },
  };
  return api;
}

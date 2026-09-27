// Glimm (WP33, DESIGN §8): ein schlanker Lichtsalamander auf der Schulter der Spielfigur. Seine Farbe ist der Puls
// (grün/gelb/rot, vorher Mint). Drei Skins: salamander (Standard), axolotl (Kiemenfächer), fledermaus (Funkenflügel).
//   const g = createGlimm({ humanoid, veil, skin }); g.setZone('gelb') · g.setColor('#…') · g.setSkin('axolotl') · g.hop()
//   g.update(dt, t) (jedes Bild) · g.attach(humanoid) · g.group · g.color · g.skin · g.dispose()
// Alles prozedural (geom.js part/merge), ein Toon-Material mit Emission – Glimm leuchtet auch im Grauschleier.
import * as THREE from 'three';
import { part, merge } from '../world/geom.js';
import { M, buildWidth } from './humanoid/base.js';

export const GLIMM_SKINS = ['salamander', 'axolotl', 'fledermaus'];
export const GLIMM_COLORS = { neutral: '#2de2c9', gruen: '#5ad24f', gelb: '#ffd23f', rot: '#ff5d5d' };
const SKIN_BODY = { salamander: '#1e2a3a', axolotl: '#f3a8c6', fledermaus: '#2a1e3a' };

function bodyMaterial(veil) {
  const m = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, emissive: new THREE.Color('#2de2c9'), emissiveIntensity: 0.35 });
  if (veil && veil.patch) veil.patch(m, { key: 'glimm', veil: false, ramp: 'figur' });
  return m;
}
function glowMaterial(veil, hex) {
  const m = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, emissive: new THREE.Color(hex), emissiveIntensity: 1.6 });
  if (veil && veil.patch) veil.patch(m, { key: 'glimmglow', veil: false, ramp: 'glow' });
  return m;
}

export function createGlimm({ humanoid = null, veil = null, skin = 'salamander' } = {}) {
  const group = new THREE.Group();
  group.name = 'glimm';
  const matBody = bodyMaterial(veil);
  const matGlow = glowMaterial(veil, GLIMM_COLORS.neutral);
  let curSkin = GLIMM_SKINS.includes(skin) ? skin : 'salamander';
  let color = new THREE.Color(GLIMM_COLORS.neutral), target = new THREE.Color(GLIMM_COLORS.neutral);
  let tail = null, head = null, spots = null, extras = [];
  let hopT = 0, blinkT = 0, attachedTo = null;

  function build() {
    while (group.children.length) { const c = group.children.pop(); c.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); }
    extras = [];
    const body = SKIN_BODY[curSkin] || SKIN_BODY.salamander;
    const belly = curSkin === 'axolotl' ? '#ffd6e6' : '#ffe9a8';
    // Rumpf: drei weiche Kugeln in Reihe (Kopf → Hüfte), Bauch heller
    const B = [];
    const col = (x, y, z, out) => out.set(y < 0.03 ? belly : body);
    B.push(part(new THREE.SphereGeometry(0.055, 7, 5), { pos: [0, 0.05, 0.06], scale: [1, 0.8, 1.3], color: col, jitter: 0.004, seed: 1 }));
    B.push(part(new THREE.SphereGeometry(0.05, 7, 5), { pos: [0, 0.045, -0.02], scale: [1.05, 0.8, 1.4], color: col, jitter: 0.004, seed: 2 }));
    // vier Beinchen
    for (const [sx, sz] of [[1, 0.06], [-1, 0.06], [1, -0.05], [-1, -0.05]]) {
      B.push(part(new THREE.CylinderGeometry(0.012, 0.016, 0.05, 5, 1), { pos: [sx * 0.05, 0.025, sz], rot: [0, 0, sx * 0.9], color: body }));
    }
    const bodyMesh = new THREE.Mesh(merge(B), matBody);
    bodyMesh.castShadow = false;
    group.add(bodyMesh);
    // Kopf mit Augen (Pivot für Nicken)
    head = new THREE.Group();
    head.position.set(0, 0.06, 0.12);
    const H = [];
    H.push(part(new THREE.SphereGeometry(0.045, 7, 5), { pos: [0, 0, 0.01], scale: [1.1, 0.85, 1.15], color: (x, y, z, out) => out.set(y < -0.005 ? belly : body), jitter: 0.003, seed: 3 }));
    H.push(part(new THREE.SphereGeometry(0.012, 5, 4), { pos: [0.028, 0.018, 0.03], color: '#0b0a14' }));
    H.push(part(new THREE.SphereGeometry(0.012, 5, 4), { pos: [-0.028, 0.018, 0.03], color: '#0b0a14' }));
    head.add(new THREE.Mesh(merge(H), matBody));
    group.add(head);
    // Leuchtpunkte auf dem Rücken (Puls-Farbe)
    const S = [];
    for (let i = 0; i < 5; i++) S.push(part(new THREE.SphereGeometry(0.011 + (i % 2) * 0.004, 5, 4), { pos: [(i % 2 ? 0.02 : -0.02), 0.085 - i * 0.004, 0.09 - i * 0.045], color: '#ffffff' }));
    spots = new THREE.Mesh(merge(S), matGlow);
    spots.castShadow = false;
    group.add(spots);
    // Schwanz: drei Glieder, im Update gewedelt
    tail = new THREE.Group();
    tail.position.set(0, 0.045, -0.08);
    let parent = tail;
    for (let i = 0; i < 3; i++) {
      const seg = new THREE.Group();
      const r = 0.03 - i * 0.008;
      seg.add(new THREE.Mesh(part(new THREE.SphereGeometry(r, 6, 4), { pos: [0, 0, -0.03], scale: [1, 0.8, 1.6], color: body }), matBody));
      seg.position.set(0, 0, i === 0 ? 0 : -0.05);
      parent.add(seg);
      parent = seg;
    }
    parent.add(new THREE.Mesh(part(new THREE.SphereGeometry(0.012, 5, 4), { pos: [0, 0, -0.06], color: '#ffffff' }), matGlow));
    group.add(tail);
    // Skins: Kiemenfächer (Axolotl) oder Funkenflügel (Fledermaus)
    if (curSkin === 'axolotl') {
      const G = [];
      for (const sx of [1, -1]) for (let k = 0; k < 3; k++) G.push(part(new THREE.ConeGeometry(0.008, 0.05, 4, 1), { pos: [sx * 0.04, 0.02 + k * 0.012, 0.1 - k * 0.012], rot: [0, 0, sx * (1.3 - k * 0.25)], color: '#ff7ab0' }));
      const gills = new THREE.Mesh(merge(G), matGlow); gills.castShadow = false; head.add(gills); gills.position.set(0, -0.04, -0.1);
      extras.push({ kind: 'kiemen', obj: gills });
    } else if (curSkin === 'fledermaus') {
      for (const sx of [1, -1]) {
        const w = new THREE.Group();
        w.position.set(sx * 0.035, 0.07, 0.0);
        const W = [part(new THREE.PlaneGeometry(0.1, 0.06, 2, 1), { pos: [sx * 0.05, 0.01, 0], rot: [0, 0, sx * 0.3], color: '#7a5cff', deform: (v) => { v.y -= Math.abs(v.x) * 0.25; } })];
        const wm = new THREE.Mesh(merge(W), matGlow); wm.material = matGlow; wm.castShadow = false;
        w.add(wm); group.add(w);
        extras.push({ kind: 'fluegel', obj: w, side: sx });
      }
    }
  }

  const api = {
    group,
    get skin() { return curSkin; },
    get color() { return '#' + color.getHexString(); },
    setSkin(s) { const k = GLIMM_SKINS.includes(s) ? s : 'salamander'; if (k === curSkin) return; curSkin = k; build(); },
    setColor(hex) { target.set(hex || GLIMM_COLORS.neutral); },
    setZone(zone) { api.setColor(GLIMM_COLORS[zone] || GLIMM_COLORS.neutral); },
    // kleiner Hüpfer (wenn Glimm eine Zeile sagt)
    hop() { hopT = 0.5; },
    // an eine Figur (Avatar-Pipeline) hängen: rechte Schulter, Blick nach vorn
    attach(h) {
      if (!h || !h.joints || !h.joints.spine) return false;
      if (group.parent) group.parent.remove(group);
      const W = buildWidth(h.config || {});
      group.position.set(-(M.shoulderX * W) - 0.02, M.torso + 0.01, -0.01);
      group.rotation.set(0, -0.35, 0);
      group.scale.setScalar(h.tier === 'low' ? 1.1 : 1.15);
      h.joints.spine.add(group);
      attachedTo = h;
      return true;
    },
    update(dt, t) {
      color.lerp(target, Math.min(1, dt * 2.2));
      matGlow.emissive.copy(color);
      matBody.emissive.copy(color).multiplyScalar(0.55);
      const breathe = 1 + Math.sin(t * 3.1) * 0.04;
      group.scale.y = (attachedTo && attachedTo.tier === 'low' ? 1.1 : 1.15) * breathe;
      if (tail) {
        const wag = Math.sin(t * 4.2) * 0.5;
        let seg = tail.children[0], k = 1;
        while (seg) { seg.rotation.y = wag * 0.35 * k; seg = seg.children.find((c) => c.isGroup); k += 0.6; }
      }
      if (head) {
        head.rotation.y = Math.sin(t * 0.7) * 0.4;
        head.rotation.x = Math.sin(t * 1.9) * 0.08 - (hopT > 0 ? 0.25 : 0);
        blinkT -= dt;
        if (blinkT < 0) { blinkT = 2.5 + Math.random() * 3; head.scale.y = 0.6; setTimeout(() => { head.scale.y = 1; }, 90); }
      }
      if (hopT > 0) { hopT -= dt; group.position.y = M.torso + 0.01 + Math.sin(Math.min(1, hopT / 0.5) * Math.PI) * 0.05; }
      if (spots) matGlow.emissiveIntensity = 1.3 + Math.sin(t * 5) * 0.35;
      for (const e of extras) {
        if (e.kind === 'fluegel') e.obj.rotation.z = e.side * (0.5 + Math.sin(t * 9) * 0.55);
        if (e.kind === 'kiemen') e.obj.rotation.x = Math.sin(t * 2.4) * 0.15;
      }
    },
    dispose() { if (group.parent) group.parent.remove(group); group.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); matBody.dispose(); matGlow.dispose(); },
  };
  build();
  if (humanoid) api.attach(humanoid);
  return api;
}

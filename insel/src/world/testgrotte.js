// Testgrotte (WP15): eingebauter Unterwasser-Raum tief unter der Insel, bis das Szenen-System (WP18) echte
// RoomDefs liefert. Fels-Innenraum, Sandboden, Leuchtmuscheln, Lichtstrahlen und ein Austrittsring oben.
//   const grotte = createTestgrotte({ scene, veil, island }); player.setWorld({ diveRoom: grotte })
//   grotte.enter(info, done) → { id, spawn, bounds, exitAt, colliders, update(dt), exit() }
import * as THREE from 'three';
import { part, merge } from './geom.js';
import { createColliders } from './colliders.js';

const AT = { x: 94, y: -60, z: -91 };   // unter dem Tränensee
const SIZE = { w: 26, h: 11, d: 26 };

export function createTestgrotte({ scene, veil } = {}) {
  let built = null;
  function build() {
    const g = new THREE.Group();
    g.name = 'testgrotte';
    g.visible = false;
    const rock = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, side: THREE.BackSide });
    const inner = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true });
    const glow = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, emissive: new THREE.Color('#5ef0d8'), emissiveIntensity: 0.9 });
    if (veil) { veil.patch(rock, { key: 'grotte', veil: false }); veil.patch(inner, { key: 'grotte-i', veil: false }); veil.patch(glow, { key: 'grotte-g', veil: false }); }
    // Höhle: Kasten von innen, mit Zittern und dunkler Felsfarbe
    const shell = new THREE.Mesh(part(new THREE.BoxGeometry(SIZE.w, SIZE.h, SIZE.d, 8, 4, 8), { jitter: 0.9, seed: 4, faceVar: 0.2, color: (x, y, z, out) => out.set(y > SIZE.h * 0.35 ? '#1b2f5a' : '#243a5e') }), rock);
    shell.position.set(AT.x, AT.y + SIZE.h / 2, AT.z);
    g.add(shell);
    // Boden: Sand + Felsen + Algen
    const P = [];
    P.push(part(new THREE.CylinderGeometry(SIZE.w * 0.62, SIZE.w * 0.62, 0.4, 16, 1), { pos: [0, 0.2, 0], jitter: 0.25, seed: 6, faceVar: 0.1, color: '#6d7f8a' }));
    const rocks = [[-7, 0, -6, 2.2], [6, 0, 5, 1.8], [8, 0, -7, 1.4], [-6, 0, 7, 1.6], [0, 0, -9, 1.2]];
    rocks.forEach((r, i) => P.push(part(new THREE.IcosahedronGeometry(r[3], 1), { pos: [r[0], r[3] * 0.5, r[2]], scale: [1.2, 0.8, 1], jitter: r[3] * 0.3, seed: 20 + i, faceVar: 0.15, color: '#33507a' })));
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2, rr = 5 + (i % 5) * 1.6;
      P.push(part(new THREE.ConeGeometry(0.12, 1.4 + (i % 3) * 0.6, 4, 1), { pos: [Math.cos(a) * rr, 0.9, Math.sin(a) * rr], rot: [Math.sin(a) * 0.3, 0, Math.cos(a) * 0.3], color: i % 2 ? '#2e8f6a' : '#3aa07a' }));
    }
    const floor = new THREE.Mesh(merge(P), inner);
    floor.position.set(AT.x, AT.y, AT.z);
    g.add(floor);
    // Leuchtmuscheln
    const S = [];
    const shells = [[-4, 0.4, 3], [5, 0.4, -3], [-2, 0.5, -7], [7, 0.4, 6], [-8, 0.5, -1]];
    shells.forEach((s, i) => { S.push(part(new THREE.SphereGeometry(0.42, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), { pos: s, scale: [1.2, 0.7, 1], color: '#bffff2', faceVar: 0.1, seed: i })); S.push(part(new THREE.IcosahedronGeometry(0.16, 0), { pos: [s[0], s[1] + 0.25, s[2]], color: '#ffffff' })); });
    // Austrittsring oben in der Mitte
    S.push(part(new THREE.TorusGeometry(1.7, 0.16, 6, 24), { pos: [0, SIZE.h - 1.2, 0], rot: [Math.PI / 2, 0, 0], color: '#7ff0ff' }));
    const lights = new THREE.Mesh(merge(S), glow);
    lights.position.set(AT.x, AT.y, AT.z);
    g.add(lights);
    // Lichtstrahlen von oben
    const beamMat = new THREE.MeshBasicMaterial({ color: '#7fd8ff', transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    for (let i = 0; i < 4; i++) {
      const b = new THREE.Mesh(new THREE.PlaneGeometry(3.5, SIZE.h - 0.5), beamMat);
      b.position.set(AT.x + (i - 1.5) * 4, AT.y + SIZE.h / 2, AT.z - 3 + i * 2);
      b.rotation.y = 0.4 + i * 0.7; b.rotation.z = 0.12;
      g.add(b);
    }
    // Innen-Kollider (Felsen)
    const colliders = createColliders();
    rocks.forEach((r) => colliders.addCircle(AT.x + r[0], AT.z + r[2], r[3] * 0.9, { group: 'grotte', tag: 'fels' }));
    scene.add(g);
    built = { group: g, colliders, beams: beamMat };
    return built;
  }
  const bounds = { min: { x: AT.x - SIZE.w / 2 + 0.8, y: AT.y + 0.7, z: AT.z - SIZE.d / 2 + 0.8 }, max: { x: AT.x + SIZE.w / 2 - 0.8, y: AT.y + SIZE.h - 0.8, z: AT.z + SIZE.d / 2 - 0.8 } };
  return {
    id: 'testgrotte', AT, SIZE, bounds,
    enter(info, done) {
      const b = built || build();
      b.group.visible = true;
      let t = 0;
      return {
        id: 'testgrotte',
        spawn: { x: AT.x, y: AT.y + 2.2, z: AT.z + 8, yaw: Math.PI },
        bounds,
        exitAt: { x: AT.x, y: AT.y + SIZE.h - 1.2, z: AT.z, r: 1.9 },
        colliders: b.colliders,
        update(dt) { t += dt; b.beams.opacity = 0.09 + Math.sin(t * 0.8) * 0.03; },
        exit() { b.group.visible = false; },
      };
    },
  };
}

// Ruderboot fürs Bootsrennen (WP36, Vorlage rennen · kind 'boot'): Low-Poly-Rumpf mit Pult für die Gefühlsvögel,
// fährt auf dem Wasserspiegel, steuert sich mit dem Joystick relativ zur Kamera, stoppt an Land und am Weltrand.
// Die Spielfigur steht auf einer begehbaren Fläche (Collider-Surface), die mit dem Boot mitwandert.
//   const boat = createBoat({ game, group }); boat.place(x, z, yaw) · boat.update(dt, { move, camYaw, frozen })
//   boat.x/z/y/yaw · boat.speed · boat.spin(seconds) (komischer Stillstand) · boat.dispose()
import * as THREE from 'three';
import { part, merge } from '../../world/geom.js';

export function createBoat({ game, speed = 8.5, turn = 1.9 } = {}) {
  const { scene, world, colliders } = game;
  const island = world.island;
  const P = [];
  P.push(part(new THREE.BoxGeometry(2.2, 0.7, 4.6), { pos: [0, 0.35, 0], color: '#b8743c', faceVar: 0.1, deform: (v) => { if (v.y < 0) { v.x *= 0.6; } } }));
  P.push(part(new THREE.ConeGeometry(1.1, 1.6, 4, 1), { pos: [0, 0.4, 3.0], rot: [Math.PI / 2, Math.PI / 4, 0], scale: [1, 1, 0.65], color: '#b8743c' }));
  P.push(part(new THREE.BoxGeometry(2.0, 0.12, 4.2), { pos: [0, 0.72, 0], color: '#e0b27a' }));   // Deck
  P.push(part(new THREE.BoxGeometry(2.3, 0.14, 0.2), { pos: [0, 0.8, -2.2], color: '#7a4a24' }));
  P.push(part(new THREE.BoxGeometry(1.2, 0.5, 0.3), { pos: [0, 1.0, 1.4], color: '#4d8cff' }));     // Pult
  P.push(part(new THREE.BoxGeometry(1.4, 0.08, 0.5), { pos: [0, 1.28, 1.35], color: '#ffd166' }));  // Vogelstange
  const geo = merge(P);
  const mat = game.props && game.props.materials ? game.props.materials.base : new THREE.MeshLambertMaterial({ vertexColors: true });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  const g = new THREE.Group();
  g.name = 'rennboot';
  g.add(mesh);
  scene.add(g);
  const st = { x: 0, z: 0, y: 0, yaw: 0, speed: 0, vx: 0, vz: 0, spinT: 0, t: 0 };
  const deckY = () => st.y + 0.78;
  const surface = colliders ? colliders.addSurface({ type: 'circle', x: 0, z: 0, r: 400, group: 'mg-boot', surface: 'wood', height: (x, z) => (Math.hypot(x - st.x, z - st.z) < 2.4 ? deckY() : -Infinity) }) : null;
  const waterY = (x, z) => (island.waterLevel ? island.waterLevel(x, z) : 0);
  const landAt = (x, z) => island.getHeight(x, z) > waterY(x, z) - 0.35;
  const boat = {
    group: g,
    get x() { return st.x; }, get z() { return st.z; }, get y() { return st.y; }, get yaw() { return st.yaw; }, get speed() { return st.speed; },
    get deckY() { return deckY(); },
    place(x, z, yaw = 0) { st.x = x; st.z = z; st.yaw = yaw; st.vx = st.vz = 0; st.speed = 0; st.y = waterY(x, z); g.position.set(x, st.y, z); g.rotation.y = yaw; },
    spin(seconds = 1.2) { st.spinT = seconds; st.speed = 0; st.vx = st.vz = 0; },
    update(dt, { move = { x: 0, y: 0 }, camYaw = 0, frozen = false } = {}) {
      st.t += dt;
      if (st.spinT > 0) { st.spinT -= dt; st.yaw += dt * 9; g.rotation.y = st.yaw; g.rotation.z = Math.sin(st.t * 14) * 0.15; return; }
      g.rotation.z = Math.sin(st.t * 1.7) * 0.03;
      if (!frozen) {
        const fwd = Math.max(0, move.y) * speed;
        if (Math.abs(move.x) > 0.05 && st.speed > 0.4) st.yaw -= move.x * turn * dt * Math.min(1, st.speed / 4);
        // Kamera-relativ: Vorwärts zeigt vom Bild weg; leichte Kurskorrektur zur Joystickrichtung
        if (Math.hypot(move.x, move.y) > 0.3) {
          const want = camYaw + Math.PI + Math.atan2(move.x, move.y);
          let d = want - st.yaw; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2;
          st.yaw += d * Math.min(1, dt * 2.2);
          st.speed += (Math.hypot(move.x, move.y) * speed - st.speed) * Math.min(1, dt * 1.6);
        } else st.speed *= Math.max(0, 1 - dt * 0.9);
        void fwd;
      } else st.speed *= Math.max(0, 1 - dt * 3);
      const nx = st.x + Math.sin(st.yaw) * st.speed * dt, nz = st.z + Math.cos(st.yaw) * st.speed * dt;
      if (landAt(nx, nz) || Math.hypot(nx, nz) > 235) { st.speed *= 0.2; }
      else { st.x = nx; st.z = nz; }
      st.y = waterY(st.x, st.z) + Math.sin(st.t * 2.1) * 0.05;
      g.position.set(st.x, st.y, st.z);
      g.rotation.y = st.yaw;
      g.rotation.x = -st.speed * 0.012;
    },
    dispose() { scene.remove(g); geo.dispose(); if (surface && colliders) colliders.remove(surface); },
  };
  return boat;
}

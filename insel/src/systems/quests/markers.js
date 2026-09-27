// Quest-Marker (WP31): Lichtsäule mit Bodenring und schwebendem Kristall am Ziel des aktuellen Schritts, dazu die
// Kompass-Markierung des HUD. „Ziel leuchtet“ (Hinweisleiter) macht die Säule breiter und heller.
//   const markers = createMarkers({ game }); markers.set({ x, z }, { label, icon, color }) · clear() · setGlow(v) · update(dt, t)
//   markers.target · markers.visible · markers.group
import * as THREE from 'three';

export const MARKER_COLOR = '#ffd166';

export function createMarkers({ game }) {
  const { scene, ui } = game;
  const island = game.world.island;
  const group = new THREE.Group();
  group.name = 'quest-marker';
  group.visible = false;
  const matBeam = new THREE.MeshBasicMaterial({ color: MARKER_COLOR, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
  const matRing = new THREE.MeshBasicMaterial({ color: MARKER_COLOR, transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide });
  const matGem = new THREE.MeshBasicMaterial({ color: '#fff3c4', transparent: true, opacity: 0.95 });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.5, 7, 10, 1, true), matBeam);
  beam.position.y = 3.5;
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.35, 28), matRing);
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.08;
  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), matGem);
  gem.position.y = 7.4;
  group.add(beam, ring, gem);
  scene.add(group);
  let target = null, glow = false;
  const color = new THREE.Color(MARKER_COLOR);

  const api = {
    group,
    get target() { return target; },
    get visible() { return !!target; },   // aktiv (die Säule selbst blendet in der Nähe aus)
    get shown() { return group.visible; },
    get glow() { return glow; },
    set(pos, { color: c = MARKER_COLOR, symbol = '◆' } = {}) {
      if (!pos || typeof pos.x !== 'number') return api.clear();
      target = { x: pos.x, z: pos.z, y: pos.y };
      color.set(c); matBeam.color.copy(color); matRing.color.copy(color);
      const y = typeof pos.y === 'number' && pos.y > 0 ? pos.y : island.getHeight(pos.x, pos.z);
      group.position.set(pos.x, Math.max(y, island.waterLevel ? island.waterLevel(pos.x, pos.z) : 0), pos.z);
      group.visible = true;
      if (ui && ui.setMarker) ui.setMarker('quest', pos.x, pos.z, symbol, c);
      return target;
    },
    clear() { target = null; group.visible = false; if (ui && ui.removeMarker) ui.removeMarker('quest'); },
    setGlow(v) { glow = !!v; },
    update(dt, t) {
      if (!target) return;   // (früher: einmal nah = für immer weg – jetzt kommt die Säule beim Weggehen wieder)
      const k = 0.5 + 0.5 * Math.sin(t * 2.4);
      const g = glow ? 1.8 : 1;
      beam.scale.set(g * (1 + k * 0.12), 1, g * (1 + k * 0.12));
      matBeam.opacity = (glow ? 0.5 : 0.24) + k * 0.12;
      ring.scale.setScalar(1 + k * 0.18 * g);
      gem.rotation.y = t * 1.6; gem.position.y = 7.4 + Math.sin(t * 2) * 0.25;
      // In der Nähe ausblenden, damit die Säule nicht im Bild steht
      const p = game.player.position;
      const d = Math.hypot(p.x - group.position.x, p.z - group.position.z);
      group.visible = d > 2.2;
    },
    dispose() { scene.remove(group); },
  };
  return api;
}

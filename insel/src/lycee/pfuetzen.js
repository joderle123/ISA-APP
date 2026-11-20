// Pfützen im Frühling (Kapitel 7–8) und an Regentagen auf dem Schulhof: wer hindurchrennt, lässt es spritzen –
// Tropfen fliegen, ein Ring läuft übers Wasser, es macht „platsch“. Zählt für die Frühlings-Wochenaufgabe.
import * as THREE from 'three';

export const PFUETZEN = [[-2, 14.6, 1.1, 0.7], [2.6, 22.6, 0.9, 0.6], [-15.2, 23.2, 1.2, 0.8], [-24, 15.4, 0.8, 0.6], [11.2, 9.6, 1.0, 0.65]];
const N = 36;

export function createPfuetzen({ scene, steuerung, tex = null, ton = () => {}, onPlatsch = () => {} }) {
  const wasser = new THREE.MeshStandardMaterial({ color: '#4a6f93', roughness: 0.02, metalness: 0.55, transparent: true, opacity: 0.9, emissive: '#1d3550', emissiveIntensity: 0.25 });
  const rand = new THREE.MeshBasicMaterial({ color: '#5b5f66', transparent: true, opacity: 0.45, depthWrite: false });   // nasser, dunkler Rand
  const ringMat = new THREE.MeshBasicMaterial({ color: '#dfefff', transparent: true, opacity: 0, depthWrite: false });
  const liste = PFUETZEN.map(([x, z, rx, rz]) => {
    const m = new THREE.Mesh(new THREE.CircleGeometry(1, 28), wasser); m.rotation.x = -Math.PI / 2; m.scale.set(rx, rz, 1); m.position.set(x, 0.078, z); m.receiveShadow = true; m.visible = false; m.name = 'pfuetze'; scene.add(m);
    const r = new THREE.Mesh(new THREE.RingGeometry(1, 1.18, 28), rand); r.rotation.x = -Math.PI / 2; r.scale.set(rx, rz, 1); r.position.set(x, 0.076, z); scene.add(r); r.visible = false; m.userData.rand = r;
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.9, 1, 32), ringMat.clone()); ring.rotation.x = -Math.PI / 2; ring.position.set(x, 0.082, z); ring.visible = false; scene.add(ring);
    const pos = new Float32Array(N * 3), v = new Float32Array(N * 3);
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.07, map: tex, color: '#cfe6ff', transparent: true, depthWrite: false })); pts.frustumCulled = false; pts.visible = false; scene.add(pts);
    return { x, z, rx, rz, m, ring, pts, pos, v, flug: 0, welle: 0, gesperrt: 0 };
  });
  let sichtbar = false;
  function platsch(p) {
    const s = steuerung.pos, y0 = steuerung.yaw || 0, t = steuerung.tempo || 2;
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.random() * 0.25;
      p.pos[i * 3] = s.x + Math.cos(a) * r; p.pos[i * 3 + 1] = 0.1; p.pos[i * 3 + 2] = s.z + Math.sin(a) * r;
      p.v[i * 3] = Math.cos(a) * (0.6 + Math.random() * 1.4) + Math.sin(y0) * t * 0.35; p.v[i * 3 + 1] = 1.6 + Math.random() * 2.2; p.v[i * 3 + 2] = Math.sin(a) * (0.6 + Math.random() * 1.4) + Math.cos(y0) * t * 0.35;
    }
    p.flug = 0.9; p.welle = 1.2; p.pts.visible = true; p.ring.visible = true; p.ring.position.x = s.x; p.ring.position.z = s.z;
    ton('platsch'); onPlatsch();
  }
  function tick(dt, an) {
    dt = Math.min(dt, 0.05);
    if (an !== sichtbar) { sichtbar = an; for (const p of liste) { p.m.visible = an; p.m.userData.rand.visible = an; if (!an) { p.pts.visible = false; p.ring.visible = false; p.flug = 0; p.welle = 0; } } }
    if (!an) return;
    const s = steuerung.pos, tempo = steuerung.tempo || 0;
    for (const p of liste) {
      p.gesperrt = Math.max(0, p.gesperrt - dt);
      const dx = (s.x - p.x) / p.rx, dz = (s.z - p.z) / p.rz;
      if (dx * dx + dz * dz < 1 && tempo > 1.2 && p.gesperrt <= 0) { p.gesperrt = 1.2; platsch(p); }
      if (p.flug > 0) {
        p.flug -= dt; const P = p.pos, V = p.v;
        for (let i = 0; i < N; i++) { const k = i * 3; V[k + 1] -= 9 * dt; P[k] += V[k] * dt; P[k + 1] = Math.max(0.06, P[k + 1] + V[k + 1] * dt); P[k + 2] += V[k + 2] * dt; }
        p.pts.geometry.attributes.position.needsUpdate = true; p.pts.material.opacity = Math.min(1, p.flug * 2);
        if (p.flug <= 0) p.pts.visible = false;
      }
      if (p.welle > 0) {
        p.welle -= dt; const k = 1.2 - p.welle; p.ring.scale.setScalar(0.15 + k * 0.7); p.ring.material.opacity = Math.max(0, p.welle / 1.2) * 0.7;
        if (p.welle <= 0) p.ring.visible = false;
      }
    }
  }
  return { tick, liste };
}

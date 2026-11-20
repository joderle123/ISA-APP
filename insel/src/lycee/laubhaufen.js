// Laubhaufen im Herbst (Kapitel 3–4) unter den Bäumen auf dem Schulhof: wer hineinrennt, lässt die Blätter hochfliegen.
// Sie segeln herunter, liegen kurz verstreut und wehen langsam wieder zum Haufen zusammen. Kleines Spiel ohne Regeln,
// zählt für die Herbst-Wochenaufgabe. Ein Haufen = eine Punktwolke aus Blättern (wenig Rechenaufwand).
import * as THREE from 'three';

export const LAUB_PLAETZE = [[-24, 5.2], [-14.5, 5.4], [5.2, 27.6], [-16, 31.4], [14.5, 31.2], [40.5, 31.6]];
const N = 140, FARBEN = ['#d9822b', '#c4561e', '#e9b949', '#a8431a', '#e07b39'];

export function createLaubhaufen({ scene, steuerung, tex, ton = () => {}, onSprung = () => {} }) {
  const haufen = LAUB_PLAETZE.map(([hx, hz], h) => {
    const pos = new Float32Array(N * 3), farbe = new Float32Array(N * 3), heim = new Float32Array(N * 3), v = new Float32Array(N * 3);
    const c = new THREE.Color();
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * 0.85, y = (1 - r / 0.85) * 0.42 * Math.random() + 0.03;
      heim[i * 3] = hx + Math.cos(a) * r; heim[i * 3 + 1] = y; heim[i * 3 + 2] = hz + Math.sin(a) * r * 0.8;
      pos.set([heim[i * 3], heim[i * 3 + 1], heim[i * 3 + 2]], i * 3);
      c.set(FARBEN[(i + h) % FARBEN.length]).multiplyScalar(0.85 + Math.random() * 0.3); farbe.set([c.r, c.g, c.b], i * 3);
    }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.BufferAttribute(farbe, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.16, map: tex || null, alphaTest: 0.4, vertexColors: true, transparent: !!tex, depthWrite: true }));
    pts.name = 'laubhaufen'; pts.frustumCulled = false; pts.visible = false; scene.add(pts);
    return { x: hx, z: hz, pts, pos, heim, v, flug: 0, ruhe: 0, gesperrt: 0 };
  });
  let sichtbar = false;
  function sprung(hf, richtung) {
    hf.flug = 2.2; hf.ruhe = 0;
    for (let i = 0; i < N; i++) {
      const dx = hf.pos[i * 3] - steuerung.pos.x, dz = hf.pos[i * 3 + 2] - steuerung.pos.z, d = Math.hypot(dx, dz) || 1;
      hf.v[i * 3] = dx / d * (0.6 + Math.random() * 1.6) + richtung.x * 1.2; hf.v[i * 3 + 1] = 2.2 + Math.random() * 2.6; hf.v[i * 3 + 2] = dz / d * (0.6 + Math.random() * 1.6) + richtung.z * 1.2;
    }
    ton('rascheln'); onSprung();
  }
  function tick(dt, an) {
    dt = Math.min(dt, 0.05);
    if (an !== sichtbar) { sichtbar = an; for (const hf of haufen) hf.pts.visible = an; }
    if (!an) return;
    const p = steuerung.pos, tempo = steuerung.tempo || 0, y0 = steuerung.yaw || 0;
    for (const hf of haufen) {
      const d = Math.hypot(p.x - hf.x, p.z - hf.z);
      hf.gesperrt = Math.max(0, hf.gesperrt - dt);
      if (d < 0.9 && tempo > 1.2 && hf.gesperrt <= 0 && hf.flug <= 0) { hf.gesperrt = 4; sprung(hf, { x: Math.sin(y0) * tempo * 0.3, z: Math.cos(y0) * tempo * 0.3 }); }
      if (hf.flug <= 0 && hf.ruhe <= 0 && d > 30) continue;   // weit weg und in Ruhe: nichts zu tun
      const P = hf.pos, H = hf.heim, V = hf.v;
      if (hf.flug > 0) {   // fliegen und segeln: Schwerkraft, starke Luftbremse, leichtes Pendeln
        hf.flug -= dt;
        for (let i = 0; i < N; i++) {
          const k = i * 3; V[k + 1] -= 6.5 * dt; V[k] *= 1 - dt * 1.6; V[k + 2] *= 1 - dt * 1.6; if (V[k + 1] < -0.7) V[k + 1] = -0.7;
          P[k] += (V[k] + Math.sin(hf.flug * 5 + i) * 0.3) * dt; P[k + 1] = Math.max(0.03, P[k + 1] + V[k + 1] * dt); P[k + 2] += V[k + 2] * dt;
        }
        if (hf.flug <= 0) hf.ruhe = 6;   // liegen verstreut, dann wehen sie zurück
      } else if (hf.ruhe > 0) {
        hf.ruhe -= dt;
        if (hf.ruhe < 4) { const f = Math.min(1, dt * 0.9); for (let k = 0; k < N * 3; k++) P[k] += (H[k] - P[k]) * f; }
        if (hf.ruhe <= 0) P.set(H);
      } else continue;
      hf.pts.geometry.attributes.position.needsUpdate = true;
    }
  }
  return { tick, haufen };
}

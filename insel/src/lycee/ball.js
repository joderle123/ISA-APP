// Fußball auf dem Stade Annexe (Auftrag 20.11.: „Fußball, Volleyball … das Spiel ultra spaßig“).
// Gegen den Ball laufen oder rollen = dribbeln (er rollt vor die Füße), Leertaste nah am Ball = Schuss (fest und hoch).
// Pfosten und Latte prallen ab, ein Tor bleibt kurz im Netz, dann rollt der Ball zum Anstoß. Geht auch mit Brett und Trottinette.
import * as THREE from 'three';

export function createFussball({ scene, steuerung, input, ton = () => {}, vib = () => {}, onTor = () => {}, onPfosten = () => {} }) {
  const SX0 = -104, SX1 = -68, SZ0 = -34, SZ1 = 18, XM = -86, FZ0 = SZ0 + 8, FZ1 = SZ1 - 8, FM = (FZ0 + FZ1) / 2;
  const R = 0.11, BODEN = 0.05, PH = 3.66, LATTE = 2.44;
  // Ball: weiß mit dunklen Fünfecken
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = 128;
  const g = cv.getContext('2d'); g.fillStyle = '#f4f4f0'; g.fillRect(0, 0, 256, 128); g.fillStyle = '#22252b';
  const fuenf = (x, y, r) => { g.beginPath(); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5; g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } g.closePath(); g.fill(); };
  for (let i = 0; i < 6; i++) { fuenf(i * 43 + 12, 34, 13); fuenf(i * 43 + 33, 94, 13); }
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  const ball = new THREE.Mesh(new THREE.SphereGeometry(R, 18, 12), new THREE.MeshLambertMaterial({ map: tex }));
  ball.castShadow = true; ball.name = 'fussball'; scene.add(ball);
  const schatten = new THREE.Mesh(new THREE.CircleGeometry(R * 1.15, 16), new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.25, depthWrite: false }));
  schatten.rotation.x = -Math.PI / 2; scene.add(schatten);
  const p = new THREE.Vector3(), v = new THREE.Vector3(), achse = new THREE.Vector3();
  let imNetz = 0, letzterKick = -9, uhr = 0, ruht = false;
  const anstoss = () => { p.set(XM, BODEN + R + 0.5, FM); v.set(0, 0, 0); ruht = false; };
  anstoss();
  const PFOSTEN = [[XM - PH, FZ0], [XM + PH, FZ0], [XM - PH, FZ1], [XM + PH, FZ1]];

  function tick(dt) {
    uhr += dt; dt = Math.min(dt, 0.05);
    const s = steuerung.pos, nah = Math.hypot(s.x - p.x, s.z - p.z);
    if (ruht && nah > 3) return;   // liegt still und niemand ist da: nichts rechnen
    if (imNetz > 0) { imNetz -= dt; if (imNetz <= 0) anstoss(); }
    // ---------- Spielfigur am Ball ----------
    if (nah < 1.4 && p.y < BODEN + 0.9 && uhr - letzterKick > 0.22 && imNetz <= 0 && (s.y || 0) < 0.6) {
      const fx = Math.sin(steuerung.yaw), fz = Math.cos(steuerung.yaw), dx = p.x - s.x, dz = p.z - s.z, d = Math.hypot(dx, dz) || 1;
      if (input.state.jump && (nah < 0.8 || (dx * fx + dz * fz) / d > 0.4)) {   // Schuss: nah dran oder der Ball liegt vor einem   // Schuss: in Blickrichtung, je schneller man ankommt, desto fester
        const kraft = 12.5 + Math.min(5, steuerung.tempo * 0.8);
        v.set(fx * kraft, 3.6 + Math.random() * 1.4, fz * kraft); letzterKick = uhr; ton('klack'); vib(22);
      } else if (nah < 0.55 && (dx * fx + dz * fz) / d > -0.2) {   // dribbeln: vor die Füße schieben
        const t = Math.max(2.3, steuerung.tempo * 1.3);
        v.x = (fx * 0.75 + dx / d * 0.25) * t; v.z = (fz * 0.75 + dz / d * 0.25) * t; v.y = Math.max(v.y, 0.35); letzterKick = uhr;
      }
      ruht = false;
    }
    // ---------- Flug, Aufprall, Rollen ----------
    v.y -= 9.8 * dt; p.addScaledVector(v, dt);
    if (p.y < BODEN + R) {
      p.y = BODEN + R;
      if (v.y < -1.4) { v.y = -v.y * 0.5; ton('klack'); } else v.y = 0;
      const reib = Math.max(0, 1 - dt * 0.85); v.x *= reib; v.z *= reib;
    }
    // Rand der Anlage (Bande)
    if (p.x < SX0 + R) { p.x = SX0 + R; v.x = Math.abs(v.x) * 0.55; }
    if (p.x > SX1 - R) { p.x = SX1 - R; v.x = -Math.abs(v.x) * 0.55; }
    if (p.z < SZ0 + R) { p.z = SZ0 + R; v.z = Math.abs(v.z) * 0.55; }
    if (p.z > SZ1 - R) { p.z = SZ1 - R; v.z = -Math.abs(v.z) * 0.55; }
    // Pfosten und Latte
    for (const [px, pz] of PFOSTEN) {
      const dx = p.x - px, dz = p.z - pz, d = Math.hypot(dx, dz);
      if (d < R + 0.06 && d > 1e-4 && p.y < LATTE) { const nx = dx / d, nz = dz / d, vn = v.x * nx + v.z * nz; if (vn < 0) { v.x -= 1.75 * vn * nx; v.z -= 1.75 * vn * nz; p.x = px + nx * (R + 0.06); p.z = pz + nz * (R + 0.06); ton('klack'); onPfosten(); } }
    }
    for (const z of [FZ0, FZ1]) if (Math.abs(p.x - XM) < PH && Math.abs(p.z - z) < R + 0.06 && Math.abs(p.y - LATTE) < R + 0.06) { v.y = -Math.abs(v.y) * 0.6; v.z = -v.z * 0.6; ton('klack'); onPfosten(); }
    // Tor: ganz über der Linie, zwischen den Pfosten, unter der Latte
    if (imNetz <= 0) for (const [z, sg] of [[FZ0, -1], [FZ1, 1]]) {
      const hinter = sg < 0 ? p.z < z - R : p.z > z + R, nahDran = Math.abs(p.z - z) < 1.6;
      if (hinter && nahDran && Math.abs(p.x - XM) < PH - R && p.y < LATTE) { imNetz = 2.4; v.multiplyScalar(0.2); onTor(sg < 0 ? 'sued' : 'nord'); }
    }
    if (imNetz > 0) {   // das Netz fängt den Ball
      v.x *= 0.92; v.z *= 0.92;
      if (p.z < FZ0 - 1.5) { p.z = FZ0 - 1.5; v.z = 0; } if (p.z > FZ1 + 1.5) { p.z = FZ1 + 1.5; v.z = 0; }
      if (Math.abs(p.x - XM) > PH - R && Math.abs(p.z - (p.z < FM ? FZ0 : FZ1)) < 1.6) { p.x = XM + Math.sign(p.x - XM) * (PH - R); v.x = 0; }
    }
    ball.position.copy(p);
    const vh = Math.hypot(v.x, v.z);
    if (vh > 0.02) { achse.set(v.z, 0, -v.x).normalize(); ball.rotateOnWorldAxis(achse, vh * dt / R); }
    schatten.position.set(p.x, BODEN + 0.012, p.z); schatten.scale.setScalar(Math.max(0.35, 1 - (p.y - BODEN) * 0.22));
    ruht = vh < 0.02 && Math.abs(v.y) < 0.01 && p.y <= BODEN + R + 1e-3 && imNetz <= 0;
  }
  return { tick, anstoss, get pos() { return p; } };
}

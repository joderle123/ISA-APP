// Volleyball in der Hall des sports (Auftrag 20.11.: „Fußball, Volleyball … ultra spaßig“): Ballwechsel mit einer Freundin
// oder einem Freund über das Netz. Der gelbe Ring zeigt, wo der Ball landet: hinlaufen, im richtigen Moment Leertaste
// (oder „Sprung“) = baggern. Perfekt getroffen (Ball auf Hüfthöhe) zählt doppelt. Jeder Ballwechsel macht es etwas schneller.
// Drei Bälle am Boden = Ende. Bestwert im Spielstand.
import * as THREE from 'three';

export function createVolleyball({ scene, steuerung, input, ui, ton = () => {}, vib = () => {}, holeFigur = async () => null }) {
  const NX = 46, MZ = -18, BODEN = 0.1, R = 0.12, NETZ = 2.24;
  // ---------- Netz (immer da): zwei Pfosten, Netzband, Maschen ----------
  const netz = new THREE.Group(); netz.name = 'volleynetz';
  const metall = new THREE.MeshLambertMaterial({ color: '#b8c0ca' });
  for (const z of [MZ - 5.2, MZ + 5.2]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, NETZ + 0.1, 10), metall); p.position.set(NX, BODEN + (NETZ + 0.1) / 2, z); netz.add(p); }
  { const cv = document.createElement('canvas'); cv.width = 512; cv.height = 64; const g = cv.getContext('2d');
    g.strokeStyle = 'rgba(30,30,36,0.85)'; g.lineWidth = 2; for (let x = 0; x <= 512; x += 10) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 64); g.stroke(); } for (let y = 0; y <= 64; y += 10) { g.beginPath(); g.moveTo(0, y); g.lineTo(512, y); g.stroke(); }
    g.fillStyle = '#f7f5ee'; g.fillRect(0, 0, 512, 7);
    const tex = new THREE.CanvasTexture(cv);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(10.4, 0.9), new THREE.MeshLambertMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
    m.rotation.y = Math.PI / 2; m.position.set(NX, BODEN + NETZ - 0.45, MZ); netz.add(m); }
  scene.add(netz);
  // ---------- Ball, Landering ----------
  const cv = document.createElement('canvas'); cv.width = 128; cv.height = 64; const g = cv.getContext('2d');
  ['#ffd23f', '#2f6db0', '#f7f5ee'].forEach((c, i) => { g.fillStyle = c; g.fillRect(0, i * 22, 128, 22); });
  const ballTex = new THREE.CanvasTexture(cv); ballTex.colorSpace = THREE.SRGBColorSpace;
  const ball = new THREE.Mesh(new THREE.SphereGeometry(R, 16, 12), new THREE.MeshLambertMaterial({ map: ballTex })); ball.visible = false; ball.name = 'volleyball'; scene.add(ball);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.7, 28), new THREE.MeshBasicMaterial({ color: '#ffd23f', transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2; ring.visible = false; ring.name = 'volleyring'; scene.add(ring);

  let lauf = null;
  const flug = (von, nach, T, H) => ({ von: von.clone(), nach: nach.clone(), T, H, t: 0 });
  const wo = (f, out) => { const u = Math.min(1, f.t / f.T); out.lerpVectors(f.von, f.nach, u); out.y = f.von.y + (f.nach.y - f.von.y) * u + 4 * f.H * u * (1 - u); return out; };
  const zuMir = (L) => {   // Partner spielt auf meine Seite: Ziel in meiner Hälfte, je länger der Ballwechsel, desto weiter weg und schneller
    const weit = Math.min(1, L.ballwechsel / 12);
    const p = steuerung.pos, z = THREE.MathUtils.clamp(p.z + (Math.random() - 0.5) * (2 + weit * 5), MZ - 4.2, MZ + 4.2), x = THREE.MathUtils.clamp(p.x + (Math.random() - 0.5) * (2 + weit * 4), 38, 44.6);
    L.f = flug(L.ball, new THREE.Vector3(x, BODEN + R, z), 1.9 - weit * 0.55, 3.6 - weit * 0.4); L.wer = 'ich'; ring.position.set(x, BODEN + 0.02, z); ring.visible = true;
  };
  const zuPartner = (L) => {
    const x = 47.6 + Math.random() * 4, z = MZ + (Math.random() - 0.5) * 6;
    L.f = flug(L.ball, new THREE.Vector3(x, BODEN + 1.0, z), 1.5, 3.2); L.wer = 'er'; L.ziel = new THREE.Vector3(x, 0, z); ring.visible = false;
  };
  function spiel({ partnerId = 'ben', partnerName = 'Ben', rekord = 0 } = {}) {
    return new Promise(async (ok) => {
      const figur = await holeFigur(partnerId);
      if (figur) { scene.add(figur.group); figur.group.position.set(50, 0, MZ); figur.group.rotation.set(0, -Math.PI / 2, 0); figur.spiele('Idle'); }
      steuerung.teleport(41.5, MZ, Math.PI / 2);
      const L = { ball: new THREE.Vector3(50, BODEN + 1.4, MZ), ballwechsel: 0, punkte: 0, leben: 3, f: null, wer: 'er', pause: 1.2, figur, partnerName, best: 0, rekord };
      lauf = L; ball.visible = true; ball.position.copy(L.ball);
      const ende = () => {
        if (!lauf) return; lauf = null; ball.visible = false; ring.visible = false;
        if (figur) scene.remove(figur.group);
        ui.skate(null); input.release('jump'); ok({ best: L.best, punkte: L.punkte });
      };
      L.ende = ende;
      ui.skate({ kopf: '🏐 Volleyball mit ' + partnerName, punkte: 0, ohneTricks: true, weg: ende, ziel: 'Zum gelben Ring laufen · Leertaste = baggern' + (rekord ? ' · Rekord ' + rekord : ''), trick: '❤️❤️❤️' });
    });
  }
  const tmp = new THREE.Vector3();
  function tick(dt) {
    const L = lauf; if (!L) return;
    dt = Math.min(dt, 0.05);
    if (L.pause > 0) { L.pause -= dt; if (L.pause <= 0) { L.ball.set(50, BODEN + 1.4, MZ); zuMir(L); } ball.position.copy(L.ball); return; }
    if (!L.f) return;
    L.f.t += dt; wo(L.f, L.ball); ball.position.copy(L.ball); ball.rotation.x += dt * 6; ball.rotation.z += dt * 3;
    const p = steuerung.pos;
    if (L.wer === 'ich') {
      ring.material.opacity = 0.5 + 0.4 * Math.sin(L.f.t * 10) ** 2;
      const h = L.ball.y - BODEN, d = Math.hypot(L.ball.x - p.x, L.ball.z - p.z);
      if (input.state.jump && d < 1.2 && h > 0.25 && h < 2.3 && L.f.t > L.f.T * 0.5) {   // großzügig: 12-Jährige, Tablet
        const perfekt = h > 0.6 && h < 1.4 && d < 0.75;
        L.ballwechsel++; L.punkte += perfekt ? 2 : 1; L.best = Math.max(L.best, L.ballwechsel);
        ton('klack'); vib(perfekt ? 22 : 12);
        ui.skate({ punkte: L.punkte, trick: (perfekt ? '✨ Perfekt! +2' : 'Bagger! +1') + ' · Ballwechsel ' + L.ballwechsel });
        zuPartner(L); return;
      }
      if (L.f.t >= L.f.T) {   // am Boden
        L.leben--; L.ballwechsel = 0; ton('platsch'); vib([30, 40, 30]);
        ui.skate({ trick: (L.leben > 0 ? '❤️'.repeat(L.leben) + ' – ' + ['Knapp!', 'Nächster!', 'Weiter!'][L.leben % 3] : 'Aus!') });
        if (L.leben <= 0) { setTimeout(() => L.ende && L.ende(), 1400); L.f = null; ring.visible = false; return; }
        L.f = null; ring.visible = false; L.pause = 1.4;
      }
    } else {   // Partner läuft hin und spielt zurück
      if (L.figur) { const q = L.figur.group.position; tmp.set(L.ziel.x - q.x, 0, L.ziel.z - q.z); const d = tmp.length(); if (d > 0.05) { q.addScaledVector(tmp.normalize(), Math.min(d, dt * 4.2)); L.figur.spiele('Run'); } else L.figur.spiele('Idle'); }
      if (L.f.t >= L.f.T) {
        if (L.figur) L.figur.spiele('Interact', { einmal: true });
        ton('klack');
        if (L.ballwechsel % 5 === 0 && L.ballwechsel) ui.skate({ trick: L.partnerName + ': „' + ['Stark!', 'Weiter so!', 'Wir sind gut!'][Math.floor(Math.random() * 3)] + '“' });
        zuMir(L);
      }
    }
  }
  return { spiel, tick, aktiv: () => !!lauf };
}

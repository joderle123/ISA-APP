// Dosenwerfen auf dem Marktplatz (Auftrag 20.11.: „spaßiger“): sechs Dosen als Pyramide, drei Bälle.
// ← → zielen (gelber Punkt), Leertaste halten = Kraft (Höhe), loslassen = Wurf. Fallen die unteren, fallen die oberen mit.
// Alle sechs = „Abgeräumt!“. Steuerung wie beim Elfmeter, damit man sie nur einmal lernen muss.
import * as THREE from 'three';

export const DOSEN_STAND = { x: 70, z: 121.9, tisch: 0.9, wurfZ: 117.2 };

// Pyramide 3-2-1: Positionen und wer auf wem steht (reine Daten, für Tests)
export function pyramide({ x = DOSEN_STAND.x, y = DOSEN_STAND.tisch, abst = 0.25, h = 0.25 } = {}) {
  return [
    { x: x - abst, y, auf: [] }, { x, y, auf: [] }, { x: x + abst, y, auf: [] },
    { x: x - abst / 2, y: y + h, auf: [0, 1] }, { x: x + abst / 2, y: y + h, auf: [1, 2] },
    { x, y: y + 2 * h, auf: [3, 4] },
  ];
}

export function createDosen({ scene, steuerung, input, ui, ton = () => {}, vib = () => {}, onWurf = () => {} }) {
  const { x: X, z: Z, tisch: T, wurfZ } = DOSEN_STAND, RD = 0.1, HD = 0.24, RB = 0.09, G = 9.8;
  const farben = ['#e85d75', '#5ec8ff', '#ffd166', '#7CFC9A', '#ff9f1c', '#b197fc'];
  const dosen = pyramide().map((d, i) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(RD, RD, HD, 14), new THREE.MeshLambertMaterial({ color: farben[i] }));
    const deckel = new THREE.Mesh(new THREE.CylinderGeometry(RD * 0.98, RD * 0.98, 0.012, 14), new THREE.MeshLambertMaterial({ color: '#c0c6cf' })); deckel.position.y = HD / 2; m.add(deckel);
    m.name = 'dose'; scene.add(m);
    return { ...d, m, p: new THREE.Vector3(), v: new THREE.Vector3(), w: new THREE.Vector3(), faellt: false, liegt: false };
  });
  const ball = new THREE.Mesh(new THREE.SphereGeometry(RB, 14, 10), new THREE.MeshLambertMaterial({ color: '#f4f4f0' })); ball.visible = false; ball.name = 'dosenball'; scene.add(ball);
  const ziel = new THREE.Mesh(new THREE.CircleGeometry(0.06, 16), new THREE.MeshBasicMaterial({ color: '#ffd23f', transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide }));
  ziel.visible = false; scene.add(ziel);
  function aufbauen() { for (const d of dosen) { d.p.set(d.x, d.y + HD / 2, Z); d.v.set(0, 0, 0); d.w.set(0, 0, 0); d.faellt = d.liegt = false; d.m.position.copy(d.p); d.m.rotation.set(0, 0, 0); } }
  aufbauen();
  const umfallen = (d, stoss) => { if (d.faellt) return; d.faellt = true; d.v.copy(stoss); d.w.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 8); };
  const gefallen = () => dosen.filter((d) => d.faellt).length;

  let lauf = null;
  function spiel({ rekord = 0 } = {}) {
    return new Promise((ok) => {
      aufbauen();
      steuerung.teleport(X, wurfZ, 0); steuerung.frei = false;
      const L = lauf = { wurf: 0, zx: X, kraft: 0, phase: 'zielen', t: 0, p: new THREE.Vector3(), v: new THREE.Vector3() };
      const neu = () => { L.phase = 'zielen'; L.t = 0; L.kraft = 0; L.zx = X + (Math.random() - 0.5) * 0.3; ball.visible = true; ziel.visible = true; L.p.set(X - 0.25, 1.35, wurfZ + 0.3); ball.position.copy(L.p); };
      L.ende = () => { if (!lauf) return; lauf = null; ball.visible = ziel.visible = false; steuerung.frei = true; ui.skate(null); input.release('jump'); ok({ dosen: gefallen(), wuerfe: L.wurf }); setTimeout(aufbauen, 4000); };
      L.neu = neu; neu();
      ui.skate({ kopf: '🥫 Dosenwerfen', punkte: 0, ohneTricks: true, minispiel: 'Kraft (halten)', einheit: ['Dose', 'Dosen'], weg: L.ende, ziel: '← → zielen · Leertaste halten = höher, loslassen = Wurf' + (rekord ? ' · Rekord ' + rekord + '/6' : ''), trick: 'Ball 1 von 3' });
    });
  }
  function dosenTick(dt) {
    for (const d of dosen) {
      if (!d.faellt || d.liegt) continue;
      d.v.y -= G * dt; d.p.addScaledVector(d.v, dt); d.m.rotation.x += d.w.x * dt; d.m.rotation.z += d.w.z * dt;
      const aufTisch = Math.abs(d.p.x - X) < 0.75 && Math.abs(d.p.z - Z) < 0.32, boden = aufTisch ? T + RD : RD;
      if (d.p.y < boden) {
        d.p.y = boden; d.v.multiplyScalar(0.35); d.v.y = Math.abs(d.v.y) * 0.3; d.w.multiplyScalar(0.5);
        if (d.v.length() < 0.25) { d.liegt = true; d.m.rotation.x = Math.PI / 2 * Math.sign(d.m.rotation.x || 1); d.m.rotation.z = 0; }
      }
      if (d.p.z > Z + 0.55) { d.p.z = Z + 0.55; d.v.z = -Math.abs(d.v.z) * 0.3; }   // Rückwand
      d.m.position.copy(d.p);
    }
    // Wer keinen Halt mehr hat, kippt mit
    for (const d of dosen) if (!d.faellt && d.auf.some((j) => dosen[j].faellt)) umfallen(d, new THREE.Vector3((Math.random() - 0.5) * 0.6, 0.3, 0.5));
  }
  function tick(dt) {
    dt = Math.min(dt, 0.05);
    dosenTick(dt);
    const L = lauf; if (!L) return;
    L.t += dt; const I = input.state;
    if (L.phase === 'zielen') {
      L.zx = THREE.MathUtils.clamp(L.zx - (I.move.x || 0) * dt * 0.9, X - 0.55, X + 0.55);
      if (I.jumpHeld) L.kraft = Math.min(1.2, L.kraft + dt * 0.8);
      else if (L.kraft > 0.05) {
        const zielY = T + 0.05 + L.kraft * 0.75 + (Math.random() - 0.5) * 0.08, zx = L.zx + (Math.random() - 0.5) * 0.08, F = 0.42;
        L.v.set((zx - L.p.x) / F, (zielY - L.p.y + 0.5 * G * F * F) / F, (Z - L.p.z) / F);
        L.phase = 'flug'; L.t = 0; L.wurf++; ziel.visible = false; ton('klack'); vib(14); onWurf();
      }
      ziel.position.set(L.zx, T + 0.05 + Math.max(0, L.kraft) * 0.75, Z - 0.2); ziel.scale.setScalar(1 + L.kraft * 0.5);
      return;
    }
    if (L.phase === 'flug') {
      const n = Math.ceil(dt / 0.006), h = dt / n;   // kleine Schritte: der Ball fliegt 10 m/s, die Dose ist nur 20 cm breit
      for (let k = 0; k < n; k++) {
        L.v.y -= G * h; L.p.addScaledVector(L.v, h);
        for (const d of dosen) {
          if (d.faellt) continue;
          const dx = L.p.x - d.p.x, dz = L.p.z - d.p.z, dy = L.p.y - d.p.y;
          if (Math.hypot(dx, dz) < RD + RB && Math.abs(dy) < HD / 2 + RB) { umfallen(d, new THREE.Vector3(L.v.x * 0.35 - dx * 4, 1.2, Math.max(1.5, L.v.z * 0.45))); ton('klack'); vib(10); L.v.multiplyScalar(0.7); }
        }
      }
      ball.position.copy(L.p);
      if (L.p.z > Z + 0.6 || L.p.y < 0.1 || L.t > 2) { L.phase = 'pause'; L.t = 0; ball.visible = false; }
      return;
    }
    if (L.phase === 'pause' && L.t > 1.3) {
      const n = gefallen();
      if (n >= 6) { ui.skate({ punkte: n, trick: '🎉 Abgeräumt! Alle sechs mit ' + L.wurf + (L.wurf === 1 ? ' Ball' : ' Bällen') }); ton('melodie2'); vib([20, 30, 20]); L.phase = 'aus'; L.t = 0; return; }
      if (L.wurf >= 3) { ui.skate({ punkte: n, trick: n + ' von 6 – ' + (n >= 4 ? 'stark!' : n >= 2 ? 'gar nicht schlecht.' : 'die Dosen sind heute frech.') }); L.phase = 'aus'; L.t = 0; return; }
      ui.skate({ punkte: n, trick: 'Ball ' + (L.wurf + 1) + ' von 3' }); L.neu();
      return;
    }
    if (L.phase === 'aus' && L.t > 2.2) L.ende();
  }
  return { spiel, tick, aktiv: () => !!lauf, beenden: () => { if (lauf) lauf.ende(); }, dosen };
}

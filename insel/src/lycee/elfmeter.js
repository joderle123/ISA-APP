// Elfmeterschießen auf dem Stade Annexe (Wochenplan Tag 2: Freizeit mit sozialer Seite). Fünf Schüsse gegen eine Torhüterin
// oder einen Torhüter aus der Klasse. Links/rechts = zielen (gelber Punkt am Tor), Leertaste halten = Kraft, loslassen = Schuss.
// Wer zu fest schießt, schießt drüber. Die Torhüterin / der Torhüter springt in eine Ecke – manchmal in die richtige.
import * as THREE from 'three';

export function createElfmeter({ scene, steuerung, input, ui, ton = () => {}, vib = () => {}, holeFigur = async () => null, versteckeBall = () => {}, onSchuss = () => {}, onTor = () => {} }) {
  const XM = -86, TORZ = 10, PUNKT = -1, R = 0.11, BODEN = 0.05, PH = 3.66, LATTE = 2.44;
  const ball = new THREE.Mesh(new THREE.SphereGeometry(R, 16, 12), new THREE.MeshLambertMaterial({ color: '#f4f4f0' })); ball.visible = false; ball.name = 'elfmeterball'; scene.add(ball);
  const ziel = new THREE.Mesh(new THREE.CircleGeometry(0.22, 20), new THREE.MeshBasicMaterial({ color: '#ffd23f', transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide }));
  ziel.visible = false; scene.add(ziel);
  let lauf = null;
  function spiel({ keeperId = 'ben', keeperName = 'Ben', rekord = 0 } = {}) {
    return new Promise(async (ok) => {
      const k = await holeFigur(keeperId);
      if (k) { scene.add(k.group); k.group.position.set(XM, 0, TORZ - 0.4); k.group.rotation.set(0, Math.PI, 0); k.spiele('Idle'); }
      versteckeBall(true);
      steuerung.teleport(XM, PUNKT - 1.4, 0); steuerung.frei = false;
      const L = lauf = { k, keeperName, schuss: 0, tore: 0, zx: XM, kraft: 0, phase: 'zielen', t: 0, v: new THREE.Vector3(), p: new THREE.Vector3(), sprung: 0, rekord };
      const neu = () => { L.p.set(XM, BODEN + R, PUNKT); L.v.set(0, 0, 0); L.zx = XM + (Math.random() - 0.5) * 2; L.kraft = 0; L.phase = 'zielen'; L.t = 0; L.sprung = 0; if (L.k) { L.k.group.position.set(XM, 0, TORZ - 0.4); L.k.group.rotation.set(0, Math.PI, 0); L.k.spiele('Idle'); } ball.position.copy(L.p); ball.visible = true; ziel.visible = true; };
      L.ende = () => {
        if (!lauf) return; lauf = null; ball.visible = false; ziel.visible = false; if (k) scene.remove(k.group);
        versteckeBall(false); steuerung.frei = true; ui.skate(null); input.release('jump'); ok({ tore: L.tore });
      };
      L.neu = neu; neu();
      ui.skate({ kopf: '⚽ Elfmeter gegen ' + keeperName, punkte: 0, ohneTricks: true, minispiel: 'Kraft (halten)', einheit: ['Tor', 'Tore'], weg: L.ende, ziel: '← → zielen · Leertaste halten = Kraft, loslassen = Schuss' + (rekord ? ' · Rekord ' + rekord + '/5' : ''), trick: 'Schuss 1 von 5' });
    });
  }
  function tick(dt) {
    const L = lauf; if (!L) return;
    dt = Math.min(dt, 0.05); L.t += dt;
    const I = input.state;
    if (L.phase === 'zielen') {
      L.zx = THREE.MathUtils.clamp(L.zx - (I.move.x || 0) * dt * 3.2, XM - PH + 0.3, XM + PH - 0.3);   // links/rechts aus Sicht der Spielfigur
      if (I.jumpHeld) { L.kraft = Math.min(1.25, L.kraft + dt * 0.9); ziel.scale.setScalar(1 + L.kraft * 0.6); }
      else if (L.kraft > 0.05) {   // loslassen = Schuss
        const zielY = 0.25 + L.kraft * 1.7 + (Math.random() - 0.5) * 0.3;   // zu fest = über die Latte
        const dz = TORZ - L.p.z, T = 0.62 - Math.min(0.25, L.kraft * 0.2);
        L.v.set((L.zx - L.p.x) / T, (zielY - L.p.y + 0.5 * 9.8 * T * T) / T, dz / T); L.phase = 'flug'; L.t = 0; ton('klack'); vib(20); ziel.visible = false; onSchuss();
        // Torhüter:in entscheidet sich: 40 % richtige Seite, sonst falsch oder Mitte
        const r = Math.random(), seite = Math.sign(L.zx - XM) || 1;
        L.sprung = r < 0.35 ? seite : r < 0.7 ? -seite : 0;
      }
      ziel.position.set(L.zx, 0.25 + Math.max(0, L.kraft) * 1.7, TORZ + 0.02); ziel.rotation.y = Math.PI;
      return;
    }
    if (L.phase === 'flug') {
      L.v.y -= 9.8 * dt; L.p.addScaledVector(L.v, dt); ball.position.copy(L.p); ball.rotation.x += dt * 12;
      if (L.k) { const q = L.k.group.position; q.x = THREE.MathUtils.clamp(q.x + L.sprung * dt * 5.5, XM - PH + 0.4, XM + PH - 0.4); if (L.sprung) L.k.spiele('Run'); }
      if (L.p.z >= TORZ - 0.35) {
        const kx = L.k ? L.k.group.position.x : XM;
        const gehalten = Math.abs(kx - L.p.x) < 0.85 && L.p.y < 1.9;
        const drin = !gehalten && Math.abs(L.p.x - XM) < PH - R && L.p.y < LATTE - R;
        L.schuss++;
        if (drin) { L.tore++; ton('melodie2'); vib([20, 30, 20]); onTor(); }
        else ton('klack');
        const text = drin ? '⚽ TOR!' : gehalten ? '🧤 Gehalten! ' + L.keeperName + ' jubelt.' : L.p.y >= LATTE - R ? '⬆️ Drüber! Weniger Kraft.' : '↔️ Daneben!';
        ui.skate({ punkte: L.tore, trick: text + ' · ' + L.tore + '/' + L.schuss });
        if (L.k) L.k.spiele(gehalten ? 'Jubeln' : 'Idle', { einmal: true });
        L.phase = 'pause'; L.t = 0; if (drin) { L.v.multiplyScalar(0.1); }
      }
      return;
    }
    if (L.phase === 'pause') {
      if (L.p.y > BODEN + R) { L.v.y -= 9.8 * dt; L.p.addScaledVector(L.v, dt); L.p.y = Math.max(BODEN + R, L.p.y); ball.position.copy(L.p); }
      if (L.t > 1.6) {
        if (L.schuss >= 5) { const t = L.tore; ui.skate({ trick: t >= 4 ? '🏆 ' + t + ' von 5 – stark!' : t >= 2 ? t + ' von 5 – gut gespielt.' : t + ' von 5 – nächstes Mal!' }); L.phase = 'aus'; L.t = 0; }
        else { L.neu(); ui.skate({ trick: 'Schuss ' + (L.schuss + 1) + ' von 5' }); }
      }
      return;
    }
    if (L.phase === 'aus' && L.t > 2.2) L.ende();
  }
  return { spiel, tick, aktiv: () => !!lauf, beenden: () => { if (lauf) lauf.ende(); } };
}

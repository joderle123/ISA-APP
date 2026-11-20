// Schnitzeljagd durchs Dorf (ab Kapitel 2): Lina hat Zettel versteckt. Sechs Stationen, jede mit einem kurzen Rätsel.
// Wer am richtigen Ort ankommt, findet einen Zettel an einem Pfosten (nur der aktuelle ist zu sehen) – dann kommt das
// nächste Rätsel. Nach zwei Minuten ohne Fund gibt Lina einen Tipp, und der Ort erscheint auf der Karte.
// Am Ende: Entdeckerhut in der Garderobe und Jetons. Kein Zeitdruck, nichts geht verloren.
import * as THREE from 'three';

export const JAGD = [
  { x: 0.4, z: 54.9, ort: 'Bäckerei', raetsel: 'Hier riecht es morgens nach warmem Brot.' },
  { x: -23.2, z: 43.2, ort: 'Bushaltestelle', raetsel: 'Hier wartet Opa Nik jeden Morgen auf den Bus.' },
  { x: 60, z: 115.2, ort: 'Brunnen am Markt', raetsel: 'Wasser plätschert mitten im Dorf, zwischen den Ständen.' },
  { x: 92.5, z: 79.5, ort: 'Skatepark', raetsel: 'Rampen, Rollen und Kratzer im Beton.' },
  { x: -40, z: 98.4, ort: 'Kiosk am Weiher', raetsel: 'Enten, Wasser und ein kleiner Kiosk.' },
  { x: 25.6, z: 118.8, ort: 'Jugendhaus', raetsel: 'Zum Schluss: wo Kicker, Billard und Tee warten.' },
];
export const FUND_R = 2.2, TIPP_NACH = 120;

// reiner Spielstand (für Tests): nächste Station, Fund, Ende
export function jagdStand(j) { return { i: (j && j.i) || 0, fertig: !!(j && j.fertig), station: JAGD[(j && j.i) || 0] || null }; }
export function jagdFund(j, x, z) {
  const st = JAGD[j.i]; if (!st || j.fertig) return null;
  if (Math.hypot(x - st.x, z - st.z) > FUND_R) return null;
  j.i++; j.zeit = 0; j.tipp = false;
  if (j.i >= JAGD.length) j.fertig = true;
  return { gefunden: st, naechste: JAGD[j.i] || null, fertig: !!j.fertig };
}

export function createSchatzsuche({ scene }) {
  // Pfosten mit Zettel (eine Gruppe, wandert zur aktuellen Station)
  const g = new THREE.Group(); g.name = 'schnitzeljagd'; g.visible = false; scene.add(g);
  const holz = new THREE.MeshLambertMaterial({ color: '#8a5a3a' });
  const pf = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 1.3, 8), holz); pf.position.y = 0.65; pf.castShadow = true; g.add(pf);
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = 192; const c = cv.getContext('2d');
  c.fillStyle = '#fff6dc'; c.fillRect(0, 0, 256, 192); c.strokeStyle = '#c9a24a'; c.lineWidth = 8; c.strokeRect(4, 4, 248, 184);
  c.font = '92px system-ui, "Noto Color Emoji", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('🗺️', 128, 84);
  c.fillStyle = '#7a4f2a'; c.font = 'bold 30px system-ui, sans-serif'; c.fillText('Lina war hier', 128, 160);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
  const zettel = new THREE.Mesh(new THREE.PlaneGeometry(0.52, 0.39), new THREE.MeshBasicMaterial({ map: t, side: THREE.DoubleSide, toneMapped: false }));
  zettel.position.set(0, 1.2, 0.05); g.add(zettel);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.45, 0.6, 32), new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.5, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.06; g.add(ring);
  let zeit = 0;
  function zeige(st) { if (!st) { g.visible = false; return; } g.visible = true; g.position.set(st.x + 0.9, 0, st.z + 0.6); }
  function tick(dt, kamera) {
    if (!g.visible) return;
    zeit += dt; ring.scale.setScalar(1 + Math.sin(zeit * 3) * 0.12); ring.material.opacity = 0.35 + Math.sin(zeit * 3) * 0.15;
    if (kamera) g.rotation.y = Math.atan2(kamera.position.x - g.position.x, kamera.position.z - g.position.z);   // Zettel zeigt zur Kamera
  }
  return { zeige, tick, gruppe: g };
}

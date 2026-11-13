// RESPAWN – Wettlauf: in einer festen Zeit zu einem Ziel kommen (zu Fuß oder mit dem Roller). Frei in der Welt, kein eigenes
// Bewegungsmodell: Es zählt nur, ob man rechtzeitig am Ziel ist.
//   const W = createWettlauf({ game }); const erg = await W.starte({ ziel: { x, z }, sekunden, name })   → { geschafft, zeit, rest }
//   W.aktiv · W.beende(geschafft)   (Tests und Autopilot: „respawn:weiter“ bricht ab = nicht geschafft)
import * as THREE from 'three';

// Winkel vom Blick der Kamera zum Ziel (rad, rechts = positiv) – für den Richtungspfeil in der Uhr
export function richtungZu(game, x, z) {
  const cam = game.camera, p = game.player.position;
  if (!cam) return 0;
  const f = new THREE.Vector3(); cam.getWorldDirection(f);
  const dx = x - p.x, dz = z - p.z;
  return Math.atan2(dx * -f.z + dz * f.x, dx * f.x + dz * f.z);
}
// Lichtsäule: zeigt von Weitem, wo das Ziel ist
export function lichtsaeule(game, x, z, hoehe = 34, farbe = 0x7ed957) {
  const y = game.world.island.getHeight ? game.world.island.getHeight(x, z) : 0;
  const geo = new THREE.CylinderGeometry(0.55, 0.9, hoehe, 12, 1, true);
  const mat = new THREE.MeshBasicMaterial({ color: farbe, transparent: true, opacity: 0.32, depthWrite: false, side: THREE.DoubleSide });
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y + hoehe / 2, z); m.name = 'rs-lichtsaeule'; m.renderOrder = 5;
  game.scene.add(m);
  return { mesh: m, weg() { game.scene.remove(m); geo.dispose(); mat.dispose(); }, puls(t) { mat.opacity = 0.26 + 0.1 * Math.sin(t * 3); } };
}

// Zielbogen: zwei Pfosten und ein kariertes Band quer zur Laufrichtung – man sieht, wo das Rennen endet
export function zielbogen(game, x, z, vonX, vonZ) {
  const y = game.world.island.getHeight ? game.world.island.getHeight(x, z) : 0;
  const g = new THREE.Group(); g.name = 'rs-zielbogen';
  const holz = new THREE.MeshLambertMaterial({ color: 0xf4efe6 });
  const pfosten = new THREE.CylinderGeometry(0.12, 0.14, 3.6, 8);
  for (const sx of [-2.6, 2.6]) { const m = new THREE.Mesh(pfosten, holz); m.position.set(sx, 1.8, 0); g.add(m); }
  let tex = null;
  if (typeof document !== 'undefined') {
    const c = document.createElement('canvas'); c.width = 256; c.height = 32;
    const k = c.getContext('2d');
    for (let i = 0; i < 16; i++) for (let j = 0; j < 2; j++) { k.fillStyle = (i + j) % 2 ? '#1b1736' : '#ffffff'; k.fillRect(i * 16, j * 16, 16, 16); }
    tex = new THREE.CanvasTexture(c); tex.magFilter = THREE.NearestFilter; tex.colorSpace = THREE.SRGBColorSpace;
  }
  const band = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 0.65), new THREE.MeshBasicMaterial({ map: tex, color: tex ? 0xffffff : 0xffd23f, side: THREE.DoubleSide }));
  band.position.set(0, 3.25, 0); g.add(band);
  g.position.set(x, y, z);
  g.rotation.y = Math.atan2(x - vonX, z - vonZ);   // quer zur Richtung, aus der man kommt
  game.scene.add(g);
  return { gruppe: g, weg() { game.scene.remove(g); pfosten.dispose(); holz.dispose(); band.geometry.dispose(); band.material.dispose(); if (tex) tex.dispose(); } };
}

export function createWettlauf({ game }) {
  const { player, events, ui } = game;
  let lauf = null;
  const anzeige = document.createElement('div');
  anzeige.className = 'rs-lauf';
  anzeige.style.cssText = 'position:fixed;left:50%;top:84px;transform:translateX(-50%);padding:9px 16px;border-radius:999px;background:rgba(20,22,34,.86);color:#fff;font:800 16px/1.2 system-ui,sans-serif;z-index:30;display:none;pointer-events:none;white-space:nowrap;font-variant-numeric:tabular-nums;';
  document.body.appendChild(anzeige);

  function starte({ ziel, sekunden = 26, name = 'Ziel' }) {
    if (lauf) return Promise.resolve(null);
    return new Promise((fertig) => {
      lauf = { ziel, sekunden, name, t: 0, fertig, saeule: lichtsaeule(game, ziel.x, ziel.z), bogen: zielbogen(game, ziel.x, ziel.z, game.player.position.x, game.player.position.z) };
      if (ui.setMarker) ui.setMarker('rs-lauf', ziel.x, ziel.z, '🏁', '#7ed957');
      anzeige.style.display = '';
    });
  }
  function beende(geschafft) {
    const l = lauf; if (!l) return;
    lauf = null;
    anzeige.style.display = 'none';
    if (l.saeule) l.saeule.weg();
    if (l.bogen) l.bogen.weg();
    if (ui.removeMarker) ui.removeMarker('rs-lauf');
    l.fertig({ geschafft: !!geschafft, zeit: +l.t.toFixed(1), rest: Math.max(0, +(l.sekunden - l.t).toFixed(1)) });
  }
  game.addUpdate((dt) => {
    const l = lauf; if (!l) return;
    l.t += dt;
    const p = player.position, d = Math.hypot(p.x - l.ziel.x, p.z - l.ziel.z);
    const rest = Math.max(0, l.sekunden - l.t);
    // Pfeil zum Ziel (dreht sich mit der Kamera), dann Name, Zeit, Meter
    if (l.saeule) l.saeule.puls(l.t);
    const grad = Math.round(richtungZu(game, l.ziel.x, l.ziel.z) * 180 / Math.PI);
    anzeige.innerHTML = '<span class="rs-pfeil" style="display:inline-block;transform:rotate(' + grad + 'deg);margin-right:8px;color:#7ed957">↑</span>🏁 ' + l.name + ' · ' + Math.ceil(rest) + ' s · ' + Math.round(d) + ' m';
    anzeige.style.background = rest < 6 ? 'rgba(160,40,30,.9)' : 'rgba(20,22,34,.86)';
    if (d < 6) beende(true);
    else if (l.t >= l.sekunden) beende(false);
  }, { order: 61 });
  events.on('respawn:weiter', () => { if (lauf && lauf.t > 0.4) beende(false); });

  return { starte, beende, get aktiv() { return !!lauf; }, get ziel() { return lauf ? { x: lauf.ziel.x, z: lauf.ziel.z } : null; }, get stand() { return lauf ? { sekunden: lauf.sekunden, t: lauf.t } : null; } };
}

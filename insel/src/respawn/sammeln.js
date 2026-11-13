// RESPAWN – Sammeln: mehrere Dinge liegen in der Welt, man läuft hin und hebt sie auf, die Uhr läuft. Frei in der Welt
// wie der Wettlauf – kein eigenes Bewegungsmodell.
//   const S = createSammeln({ game }); const erg = await S.starte({ dinge: [{ x, z }], sekunden, bild, name })
//     → { gefunden, von, geschafft, zeit, rest, sekunden }
//   S.aktiv · S.beende()   (Tests und Autopilot: „respawn:weiter“ bricht ab)
import * as THREE from 'three';

export function createSammeln({ game }) {
  const { player, events, ui } = game;
  let lauf = null;
  const hoehe = (x, z) => (game.world.island.getHeight ? game.world.island.getHeight(x, z) : game.world.island.heightAt(x, z));
  const anzeige = document.createElement('div');
  anzeige.className = 'rs-lauf rs-sammeln';
  anzeige.style.cssText = 'position:fixed;left:50%;top:84px;transform:translateX(-50%);padding:9px 16px;border-radius:999px;background:rgba(20,22,34,.86);color:#fff;font:800 16px/1.2 system-ui,sans-serif;z-index:30;display:none;pointer-events:none;white-space:nowrap';
  document.body.appendChild(anzeige);
  const geo = new THREE.OctahedronGeometry(0.42, 0);
  const ringGeo = new THREE.RingGeometry(0.9, 1.15, 24);

  function starte({ dinge, sekunden = 60, bild = '📦', name = 'Einsammeln', farbe = 0xffd23f }) {
    if (lauf || !dinge || !dinge.length) return Promise.resolve(null);
    return new Promise((fertig) => {
      const gruppe = new THREE.Group(); gruppe.name = 'rs-sammeln';
      const mat = new THREE.MeshBasicMaterial({ color: farbe });
      const ringMat = new THREE.MeshBasicMaterial({ color: farbe, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false });
      const liste = dinge.map((d, i) => {
        const y = hoehe(d.x, d.z);
        const m = new THREE.Mesh(geo, mat); m.position.set(d.x, y + 1.25, d.z);
        const r = new THREE.Mesh(ringGeo, ringMat); r.rotation.x = -Math.PI / 2; r.position.set(d.x, y + 0.12, d.z);
        gruppe.add(m, r);
        if (ui.setMarker) ui.setMarker('rs-ding-' + i, d.x, d.z, bild, '#ffd23f');
        return { x: d.x, z: d.z, y, m, r, da: true, i };
      });
      game.scene.add(gruppe);
      lauf = { liste, sekunden, bild, name, t: 0, fertig, gruppe, mat, ringMat };
      anzeige.style.display = '';
    });
  }
  function beende() {
    const l = lauf; if (!l) return;
    lauf = null;
    anzeige.style.display = 'none';
    l.liste.forEach((d) => { if (ui.removeMarker) ui.removeMarker('rs-ding-' + d.i); });
    game.scene.remove(l.gruppe); l.mat.dispose(); l.ringMat.dispose();
    const gefunden = l.liste.filter((d) => !d.da).length;
    l.fertig({ gefunden, von: l.liste.length, geschafft: gefunden >= l.liste.length, zeit: +l.t.toFixed(1), rest: Math.max(0, +(l.sekunden - l.t).toFixed(1)), sekunden: l.sekunden });
  }
  game.addUpdate((dt) => {
    const l = lauf; if (!l) return;
    l.t += dt;
    const p = player.position;
    let offen = 0, nah = Infinity;
    for (const d of l.liste) {
      if (!d.da) continue;
      const e = Math.hypot(p.x - d.x, p.z - d.z);
      if (e < 2.6) {
        d.da = false; d.m.visible = false; d.r.visible = false;
        if (ui.removeMarker) ui.removeMarker('rs-ding-' + d.i);
        if (game.particles) game.particles.emit({ x: d.x, y: d.y + 1.2, z: d.z, count: 14, spread: 0.6, speed: 2.2, up: 2.4, color: 0xffd23f, size: 0.3, life: 0.6, gravity: -3, drag: 2, alpha: 0.9 });
        events.emit('respawn:gesammelt', { i: d.i });
        continue;
      }
      offen += 1; nah = Math.min(nah, e);
      d.m.rotation.y += dt * 2.4; d.m.position.y = d.y + 1.25 + Math.sin(l.t * 2.6 + d.i) * 0.16;
    }
    const rest = Math.max(0, l.sekunden - l.t);
    anzeige.textContent = l.bild + ' ' + (l.liste.length - offen) + ' von ' + l.liste.length + ' · ' + Math.ceil(rest) + ' s' + (offen ? ' · ' + Math.round(nah) + ' m' : '');
    anzeige.style.background = rest < 8 ? 'rgba(160,40,30,.9)' : 'rgba(20,22,34,.86)';
    if (!offen || l.t >= l.sekunden) beende();
  }, { order: 61 });
  events.on('respawn:weiter', () => { if (lauf && lauf.t > 0.4) beende(); });

  return { starte, beende, get aktiv() { return !!lauf; }, get offen() { return lauf ? lauf.liste.filter((d) => d.da).map((d) => ({ x: d.x, z: d.z })) : []; }, get stand() { return lauf ? { sekunden: lauf.sekunden, t: lauf.t } : null; } };
}

// RESPAWN – ein Auto wirklich fahren. Kein eigenes Fahrmodell: Die Spielfigur wird schneller, unsichtbar, und der Wagen
// hängt an ihr. So gelten Gelände, Wasser und Hindernisse wie zu Fuß.
// Gemessen wird, was später zählt: wie weit, wie schnell, ob es gekracht hat, wer zur Seite springen musste.
//   const F = createFahren({ game }); const erg = await F.starte(mesh, { sekunden })   → { strecke, vmax, beulen, erschreckt: [id], weit }
//   F.aktiv · F.beende()  (auch für Tests; im Spiel: Aktionstaste „Aussteigen“ oder die Zeit läuft ab)
import * as THREE from 'three';

export function createFahren({ game }) {
  const { player, events, npcs } = game;
  let fahrt = null;
  const hoehe = (x, z) => (game.world.island.getHeight ? game.world.island.getHeight(x, z) : game.world.island.heightAt(x, z));

  const hinweis = document.createElement('div');
  hinweis.className = 'rs-fahrt';
  hinweis.style.cssText = 'position:fixed;left:50%;top:84px;transform:translateX(-50%);padding:8px 14px;border-radius:999px;background:rgba(20,22,34,.82);color:#fff;font:700 14px/1.2 system-ui,sans-serif;z-index:30;display:none;pointer-events:none;white-space:nowrap';
  document.body.appendChild(hinweis);

  function starte(mesh, { sekunden = 45 } = {}) {
    if (fahrt) return Promise.resolve(null);
    return new Promise((fertig) => {
      const start = { x: mesh.position.x, z: mesh.position.z };
      const b = mesh.geometry.boundingBox, s = mesh.scale.y;
      // an den Platz des Wagens, Blick in Fahrtrichtung
      player.teleport(mesh.position.x, mesh.position.z, mesh.rotation.y);
      if (game.cameraRig.behindPlayer) game.cameraRig.behindPlayer();
      player.setModifiers({ speed: 2.5, jump: 0 });
      const figur = player.humanoid.group; const sichtbar = figur.visible; figur.visible = false;
      const alt = { dist: game.cameraRig.targetDist };
      if (game.cameraRig.targetDist !== undefined) game.cameraRig.targetDist = Math.max(alt.dist || 0, 9);
      const aus = game.interactions.add({ id: 'rs-aussteigen', x: () => player.position.x, z: () => player.position.z, radius: 6, label: 'Aussteigen', priority: 99, onAction: () => beende() });
      fahrt = { mesh, t: 0, sekunden, strecke: 0, vmax: 0, beulen: 0, erschreckt: new Set(), vVor: 0, still: 0, letzte: player.position.clone(), fertig, start, aus, figur, sichtbar, alt, b, s, knall: 0 };
      hinweis.style.display = '';
    });
  }

  function beende() {
    const f = fahrt; if (!f) return;
    fahrt = null;
    hinweis.style.display = 'none';
    f.aus.remove();
    player.setModifiers({ speed: 1, jump: 1 });
    f.figur.visible = f.sichtbar;
    if (game.cameraRig.targetDist !== undefined && f.alt.dist !== undefined) game.cameraRig.targetDist = f.alt.dist;
    // aussteigen: links neben den Wagen
    const yaw = f.mesh.rotation.y, lx = Math.cos(yaw) * 2.1, lz = -Math.sin(yaw) * 2.1;
    player.teleport(f.mesh.position.x + lx, f.mesh.position.z + lz, yaw);
    f.fertig({ strecke: Math.round(f.strecke), vmax: +f.vmax.toFixed(1), beulen: f.beulen, erschreckt: [...f.erschreckt], weit: Math.round(Math.hypot(f.mesh.position.x - f.start.x, f.mesh.position.z - f.start.z)) });
  }

  game.addUpdate((dt) => {
    const f = fahrt; if (!f) return;
    f.t += dt;
    const p = player.position, v = player.speed || 0;
    f.strecke += Math.hypot(p.x - f.letzte.x, p.z - f.letzte.z); f.letzte.copy(p);
    f.vmax = Math.max(f.vmax, v);
    // der Wagen hängt an der Figur
    f.mesh.position.set(p.x, hoehe(p.x, p.z) + 0.1 - f.b.min.y * f.s, p.z);
    f.mesh.rotation.y = player.yaw;
    // Aufprall: eben noch schnell, jetzt steht der Wagen (Wand, Zaun, Baum)
    f.knall = Math.max(0, f.knall - dt);
    if (f.vVor > 6 && v < 1.6 && f.knall <= 0) {
      f.beulen++; f.knall = 1.2;
      if (game.audio && game.audio.play) { try { game.audio.play('bump'); } catch (e) { /* Ton ist Zugabe */ } }
      if (game.particles) game.particles.emit({ x: p.x, y: p.y + 0.8, z: p.z, count: 14, spread: 1.2, speed: 3, up: 1.5, color: 0xd9d9d9, size: 0.3, life: 0.6, gravity: -2 });
      events.emit('respawn:knall', { beulen: f.beulen });
    }
    f.vVor = v;
    // Menschen, die zur Seite springen müssen
    if (v > 4.5) for (const n of npcs.list()) {
      const q = n.position || (n.humanoid && n.humanoid.group.position); if (!q) continue;
      if (Math.hypot(q.x - p.x, q.z - p.z) < 2.6 && !f.erschreckt.has(n.id)) { f.erschreckt.add(n.id); if (npcs.setEmotion) { try { npcs.setEmotion(n.id, 'angst'); } catch (e) { /* egal */ } } }
    }
    f.still = v < 0.3 ? f.still + dt : 0;
    const rest = Math.max(0, Math.ceil(f.sekunden - f.t));
    hinweis.textContent = (f.beulen ? '💥 ' : '🚚 ') + 'Aussteigen: Aktion · ' + rest + ' s';
    if (f.t >= f.sekunden || (f.still > 6 && f.t > 8)) beende();
  }, { order: 61 });
  // Tests und Autopilot: „weiter“ beendet die Fahrt
  events.on('respawn:weiter', () => { if (fahrt && fahrt.t > 0.4) beende(); });

  return { starte, beende, get aktiv() { return !!fahrt; } };
}

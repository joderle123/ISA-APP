// RESPAWN – der eigene Tretroller (am Markt gekauft). Anders als der Lieferwagen ist er erlaubt: aufsteigen, wann man will.
// Wie beim Fahren gibt es kein eigenes Fahrmodell: Die Figur wird schneller und steht still auf dem Brett, der Roller hängt an ihr.
//   const Ro = createRoller({ game, mesh, darf: () => boolean });   Ro.aktiv · Ro.auf() · Ro.ab()
// „darf“ sagt, ob gerade gefahren werden kann (Roller gekauft, freier Tag, keine Szene). Die Aktionstaste zeigt dann
// „Roller fahren“, solange nichts anderes in der Nähe ist; beim Fahren „Absteigen“.
export function createRoller({ game, mesh, darf }) {
  const { player } = game;
  const hoehe = (x, z) => (game.world.island.getHeight ? game.world.island.getHeight(x, z) : game.world.island.heightAt(x, z));
  let aktiv = false, griff = null, kipp = 0, yawVor = 0;
  const b = mesh.geometry.boundingBox, s = mesh.scale.y;
  mesh.visible = false;

  function auf() {
    if (aktiv || !darf()) return;
    aktiv = true; mesh.visible = true; yawVor = player.yaw || 0;
    player.setModifiers({ speed: 1.75 });
    player.playAnim('idle', 0);
    knopf();
  }
  function ab() {
    if (!aktiv) return;
    aktiv = false; mesh.visible = false;
    player.setModifiers({ speed: 1 });
    player.stopAnim();
    knopf();
  }
  // Aktionstaste: geringe Priorität – alles andere in der Nähe (Leute, Orte) geht vor
  function knopf() {
    if (griff) { griff.remove(); griff = null; }
    if (!darf() && !aktiv) return;
    griff = game.interactions.add({ id: 'rs-roller', x: () => player.position.x, z: () => player.position.z, radius: 4, label: aktiv ? 'Absteigen' : '🛴 Roller fahren', priority: aktiv ? 1 : -20, onAction: () => (aktiv ? ab() : auf()) });
  }
  let pruef = 0, konnte = false;
  game.addUpdate((dt) => {
    // zweimal pro Sekunde nachsehen, ob der Knopf da sein soll
    pruef -= dt;
    if (pruef <= 0) { pruef = 0.5; const k = !!darf(); if (k !== konnte || (k && !griff)) { konnte = k; if (!k && aktiv) ab(); else knopf(); } }
    if (!aktiv) return;
    const p = player.position;
    // im Wasser oder in einer Szene fährt keiner Roller
    if (player.state === 'swim' || !darf()) { ab(); return; }
    mesh.position.set(p.x, hoehe(p.x, p.z) - 0.09 - b.min.y * s, p.z);   // leicht versenkt: Die Füße stehen sonst unter dem Trittbrett
    const yaw = player.yaw || 0;
    let d = yaw - yawVor; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; yawVor = yaw;
    kipp += ((Math.max(-0.3, Math.min(0.3, -d / Math.max(dt, 0.001) * 0.06))) - kipp) * Math.min(1, dt * 6);   // legt sich in die Kurve
    mesh.rotation.set(0, yaw, kipp);   // Lenker (im Modell bei +z) zeigt in Blickrichtung – geprüft am Bild in Fahrt
    if ((player.speed || 0) < 0.4) player.playAnim('idle', 0);
  }, { order: 61 });

  return { auf, ab, get aktiv() { return aktiv; }, knopf };
}

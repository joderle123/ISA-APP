// RESPAWN – Wettlauf: in einer festen Zeit zu einem Ziel kommen (zu Fuß oder mit dem Roller). Frei in der Welt, kein eigenes
// Bewegungsmodell: Es zählt nur, ob man rechtzeitig am Ziel ist.
//   const W = createWettlauf({ game }); const erg = await W.starte({ ziel: { x, z }, sekunden, name })   → { geschafft, zeit, rest }
//   W.aktiv · W.beende(geschafft)   (Tests und Autopilot: „respawn:weiter“ bricht ab = nicht geschafft)
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
      lauf = { ziel, sekunden, name, t: 0, fertig };
      if (ui.setMarker) ui.setMarker('rs-lauf', ziel.x, ziel.z, '🏁', '#7ed957');
      anzeige.style.display = '';
    });
  }
  function beende(geschafft) {
    const l = lauf; if (!l) return;
    lauf = null;
    anzeige.style.display = 'none';
    if (ui.removeMarker) ui.removeMarker('rs-lauf');
    l.fertig({ geschafft: !!geschafft, zeit: +l.t.toFixed(1), rest: Math.max(0, +(l.sekunden - l.t).toFixed(1)) });
  }
  game.addUpdate((dt) => {
    const l = lauf; if (!l) return;
    l.t += dt;
    const p = player.position, d = Math.hypot(p.x - l.ziel.x, p.z - l.ziel.z);
    const rest = Math.max(0, l.sekunden - l.t);
    anzeige.textContent = '🏁 ' + l.name + ' · ' + Math.ceil(rest) + ' s · ' + Math.round(d) + ' m';
    anzeige.style.background = rest < 6 ? 'rgba(160,40,30,.9)' : 'rgba(20,22,34,.86)';
    if (d < 6) beende(true);
    else if (l.t >= l.sekunden) beende(false);
  }, { order: 61 });
  events.on('respawn:weiter', () => { if (lauf && lauf.t > 0.4) beende(false); });

  return { starte, beende, get aktiv() { return !!lauf; }, get ziel() { return lauf ? { x: lauf.ziel.x, z: lauf.ziel.z } : null; }, get stand() { return lauf ? { sekunden: lauf.sekunden, t: lauf.t } : null; } };
}

// Verteidigung (WP38), reine Simulation: Wellen von Klammer-Geistern ziehen auf die Beete im Garten zu. Ein „Stopp“
// (Tippen auf den Geist) hält ihn an; er hakt nach (kommt nach einer Pause langsamer zurück). Ein zweites Stopp löst ihn auf.
// Wiederholen hält. Erreicht ein Geist ein Beet, klammert er sich fest und das Beet verliert eine Blüte.
//   createDefense({ w, h, waves, perWave, speed, beds, rng, stoppRadius }) → d
//     d.update(dt) → Ereignisse [{ type:'klammer'|'weg'|'zurueck'|'welle'|'ende', … }] · d.stopp(x, y) → Geist|null
//     d.ghosts · d.beds [{x,y,petals}] · d.wave · d.done · d.score (Blüten übrig / gesamt) · d.stopps · d.hits
export const PETALS = 3;

export function createDefense({ w = 100, h = 70, waves = 3, perWave = 4, speed = 6, beds = null, rng = null, stoppRadius = 9, pause = 2.2 } = {}) {
  const R = rng || { float: (a, b) => a + Math.random() * (b - a), int: (a, b) => a + Math.floor(Math.random() * (b - a + 1)) };
  const B = (beds || [[30, 25], [70, 25], [30, 48], [70, 48]]).map(([x, y], i) => ({ i, x, y, petals: PETALS }));
  const ghosts = [];
  let wave = 0, spawnT = 0, toSpawn = 0, nextId = 1, done = false, stopps = 0, hits = 0, t = 0, waveGap = 1.2;
  const total = B.length * PETALS;
  const cx = w / 2, cy = h / 2;

  function spawnOne() {
    const side = R.int(0, 3);
    const x = side === 0 ? R.float(4, w - 4) : side === 1 ? w - 2 : side === 2 ? R.float(4, w - 4) : 2;
    const y = side === 0 ? 2 : side === 1 ? R.float(4, h - 4) : side === 2 ? h - 2 : R.float(4, h - 4);
    const targets = B.filter((b) => b.petals > 0);
    const target = targets.length ? targets[R.int(0, targets.length - 1)] : null;
    ghosts.push({ id: nextId++, x, y, target, state: 'kommt', stopps: 0, pauseT: 0, speed: speed * R.float(0.8, 1.2), wobble: R.float(0, 6.28), born: t });
  }
  function startWave() {
    wave++;
    toSpawn = perWave + Math.floor((wave - 1) * 1.5);
    spawnT = 0;
    return { type: 'welle', wave, count: toSpawn };
  }

  const d = {
    w, h, beds: B, ghosts, get wave() { return wave; }, get waves() { return waves; }, get done() { return done; },
    get stopps() { return stopps; }, get hits() { return hits; }, get time() { return t; },
    get petals() { return B.reduce((s, b) => s + b.petals, 0); },
    get score() { return total ? d.petals / total : 0; },
    update(dt) {
      if (done) return [];
      t += dt;
      const ev = [];
      if (wave === 0) ev.push(startWave());
      if (toSpawn > 0) { spawnT -= dt; if (spawnT <= 0) { spawnOne(); toSpawn--; spawnT = R.float(0.6, 1.4); } }
      for (const g of ghosts) {
        if (g.state === 'weg') continue;
        if (g.state === 'stopp') {
          g.pauseT -= dt;
          if (g.pauseT <= 0) { g.state = 'kommt'; g.speed *= 0.7; ev.push({ type: 'zurueck', id: g.id }); }
          continue;
        }
        if (!g.target || g.target.petals <= 0) { const T = B.filter((b) => b.petals > 0); g.target = T.length ? T[0] : null; if (!g.target) { g.state = 'weg'; continue; } }
        const dx = g.target.x - g.x, dy = g.target.y - g.y, dist = Math.hypot(dx, dy);
        const wob = Math.sin(t * 2.4 + g.wobble) * 0.6;
        if (dist < 3.5) {
          g.target.petals = Math.max(0, g.target.petals - 1);
          g.state = 'weg';
          ev.push({ type: 'klammer', id: g.id, bed: g.target.i, petals: g.target.petals });
          continue;
        }
        const s = g.speed * dt;
        g.x += (dx / dist) * s + (-dy / dist) * wob * dt * 3;
        g.y += (dy / dist) * s + (dx / dist) * wob * dt * 3;
      }
      // Welle zu Ende, wenn nichts mehr kommt und keiner mehr unterwegs ist
      const alive = ghosts.some((g) => g.state !== 'weg');
      if (toSpawn <= 0 && !alive) {
        waveGap -= dt;
        if (waveGap <= 0) {
          waveGap = 1.2;
          if (wave >= waves || d.petals <= 0) { done = true; ev.push({ type: 'ende', score: d.score }); }
          else ev.push(startWave());
        }
      }
      if (!done && d.petals <= 0) { done = true; ev.push({ type: 'ende', score: 0 }); }
      return ev;
    },
    // Stopp sagen: der nächste Geist im Radius hält an; beim zweiten Mal löst er sich auf
    stopp(x, y) {
      let best = null, bd = stoppRadius;
      for (const g of ghosts) { if (g.state === 'weg') continue; const dd = Math.hypot(g.x - x, g.y - y); if (dd < bd) { bd = dd; best = g; } }
      stopps++;
      if (!best) return null;
      best.stopps++;
      hits++;
      if (best.stopps >= 2) { best.state = 'weg'; return { ghost: best, event: 'weg' }; }
      best.state = 'stopp'; best.pauseT = pause;
      // beim Stopp weicht er ein Stück zurück
      const dx = best.x - cx, dy = best.y - cy, dl = Math.hypot(dx, dy) || 1;
      best.x += (dx / dl) * 4; best.y += (dy / dl) * 4;
      return { ghost: best, event: 'stopp' };
    },
  };
  return d;
}

// rAF-Schleife mit begrenztem dt, Update-Registry (sortiert nach order) und Pause.
export function createLoop({ render, maxDt = 1 / 20 } = {}) {
  const updates = []; // {fn, order, always}
  let running = false;
  let last = 0;
  let rafId = 0;
  const loop = {
    paused: false,
    timeScale: 1,   // Zeitlupe (Kraft-Rad 0,25, Angst-Segel 0,5): skaliert die Spielzeit, nicht die Echtzeit
    time: 0,        // Spielzeit (steht bei Pause)
    realTime: 0,    // Echtzeit seit Start
    frame: 0,
    dt: 0,
    render,
    // fn(dt, time) · opts.order (klein = früher) · opts.always = läuft auch in der Pause
    add(fn, opts = {}) {
      const entry = { fn, order: opts.order || 0, always: !!opts.always };
      updates.push(entry);
      updates.sort((a, b) => a.order - b.order);
      return () => { const i = updates.indexOf(entry); if (i >= 0) updates.splice(i, 1); };
    },
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    },
    stop() { running = false; cancelAnimationFrame(rafId); },
    setPaused(p) { loop.paused = !!p; },
    // Für Tests: n Schritte synchron ausführen
    step(dt = 1 / 60) { runFrame(dt); },
  };
  function runFrame(rawDt) {
    const real = Math.min(Math.max(rawDt, 0), maxDt);
    const dt = real * (loop.timeScale > 0 ? loop.timeScale : 1);
    loop.dt = dt;
    loop.realTime += real;
    if (!loop.paused) loop.time += dt;
    for (let i = 0; i < updates.length; i++) {
      const u = updates[i];
      if (loop.paused && !u.always) continue;
      try { u.fn(loop.paused ? 0 : dt, loop.time, real); } catch (e) { console.error('[loop]', e); }
    }
    if (loop.render) loop.render(dt);
    loop.frame++;
  }
  function tick(now) {
    if (!running) return;
    rafId = requestAnimationFrame(tick);
    const raw = (now - last) / 1000;
    last = now;
    runFrame(raw);
  }
  return loop;
}

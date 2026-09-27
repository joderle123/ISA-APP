// 2D-Canvas-Helfer für Overlay-Minispiele (WP36): DPR-korrekt, passt sich der Karte an, liefert Zeiger-Ereignisse in
// Canvas-Koordinaten (Touch und Maus), rAF-Schleife mit Echtzeit (das Spiel ist im Overlay pausiert).
//   const cv = createCanvas(parent, { height, aspect, cls }); cv.canvas · cv.ctx · cv.w · cv.h · cv.resize()
//   cv.onPointer((type, x, y, e) => {})  type: 'down'|'move'|'up'   · cv.loop((now, dt) => {}) · cv.stop() · cv.dispose()
//   roundRect(ctx, x, y, w, h, r) · circle(ctx, x, y, r)
export function createCanvas(parent, { height = 300, aspect = null, cls = '' } = {}) {
  const canvas = document.createElement('canvas');
  canvas.className = 'mg-canvas' + (cls ? ' ' + cls : '');
  canvas.style.touchAction = 'none';
  parent.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const cv = { canvas, ctx, w: 0, h: 0, dpr: 1, running: false };
  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = Math.max(200, Math.floor(parent.clientWidth || canvas.parentElement.clientWidth || 600));
    const h = aspect ? Math.round(w / aspect) : height;
    cv.w = w; cv.h = h; cv.dpr = dpr;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  requestAnimationFrame(resize);
  const onResize = () => resize();
  window.addEventListener('resize', onResize);
  let handler = null;
  const toXY = (e) => { const r = canvas.getBoundingClientRect(); return [(e.clientX - r.left) * (cv.w / r.width), (e.clientY - r.top) * (cv.h / r.height)]; };
  const down = (e) => { if (!handler) return; e.preventDefault(); canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId); const [x, y] = toXY(e); handler('down', x, y, e); };
  const move = (e) => { if (!handler) return; const [x, y] = toXY(e); handler('move', x, y, e); };
  const up = (e) => { if (!handler) return; const [x, y] = toXY(e); handler('up', x, y, e); };
  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
  let raf = 0, last = 0, fn = null;
  const tick = (now) => {
    if (!cv.running) return;
    raf = requestAnimationFrame(tick);
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    try { fn && fn(now / 1000, dt); } catch (e) { console.error('[minigame canvas]', e); cv.running = false; }
  };
  Object.assign(cv, {
    resize,
    onPointer(h) { handler = h; },
    loop(f) { fn = f; if (cv.running) return; cv.running = true; last = 0; raf = requestAnimationFrame(tick); },
    stop() { cv.running = false; cancelAnimationFrame(raf); },
    dispose() { cv.stop(); window.removeEventListener('resize', onResize); canvas.remove(); },
  });
  return cv;
}

export function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
export function circle(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.closePath(); }

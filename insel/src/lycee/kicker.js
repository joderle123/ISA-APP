// Tischkicker im Jugendhaus (Auftrag 20.11.: „spaßiger“): Draufsicht, eigene blaue Stangen mit ↑/↓ (W/S) oder Finger/Maus ziehen,
// Leertaste / Tippen = schießen. Kim spielt Rot (wer oft verliert, bekommt eine ruhigere Kim – das regelt spiel.js über „leicht“). Bis 5 Tore.
export function kickerSpiel({ gegner = 'Kim', leicht = false, ton = () => {} } = {}) {
  return new Promise((ok) => {
    const W = 640, H = 380, TOR = 140, R = 9;
    const huelle = document.createElement('div');
    huelle.style.cssText = 'position:fixed;inset:0;z-index:60;background:rgba(20,24,32,.72);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;font-family:system-ui,sans-serif;touch-action:none';
    huelle.innerHTML = '<div style="color:#fff;font-weight:700;font-size:20px" data-k="stand"></div><canvas width="' + W + '" height="' + H + '" style="max-width:96vw;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.4);background:#2f8a3a"></canvas>' +
      '<div style="color:#e9ecef;font-size:14px;text-align:center">↑ ↓ (oder ziehen) = Stangen bewegen · Leertaste (oder tippen) = schießen</div><button type="button" style="font:600 15px system-ui;padding:8px 18px;border-radius:999px;border:0;background:#fff;color:#2b3a55">Aufhören</button>';
    document.body.appendChild(huelle);
    const cv = huelle.querySelector('canvas'), g = cv.getContext('2d'), standEl = huelle.querySelector('[data-k="stand"]');
    // Stangen: x-Position, Anzahl Figuren, Abstand; Blau spielt nach rechts, Rot nach links
    const STANGEN = [{ x: 60, n: 1, a: 0, f: 'b' }, { x: 160, n: 2, a: 120, f: 'b' }, { x: 390, n: 3, a: 110, f: 'b' }, { x: 580, n: 1, a: 0, f: 'r' }, { x: 480, n: 2, a: 120, f: 'r' }, { x: 250, n: 3, a: 110, f: 'r' }];   // spiegelgleich: Tor, Abwehr (2), Sturm (3)
    let blau = 0, rot = 0, fehler = 0, fehlerUhr = 0, ich = 0, er = 0, schuss = 0, rSchuss = 0, pause = 1.2, fertig = false, zieh = null;
    const ball = { x: W / 2, y: H / 2, vx: 0, vy: 0 };
    const anstoss = (richtung) => { ball.x = W / 2; ball.y = H / 2; ball.vx = richtung * (90 + Math.random() * 40); ball.vy = (Math.random() - 0.5) * 160; pause = 0.9; };
    anstoss(Math.random() < 0.5 ? 1 : -1);
    const figuren = (st) => { const off = st.f === 'b' ? blau : rot, out = []; for (let i = 0; i < st.n; i++) out.push({ x: st.x, y: H / 2 + off + (i - (st.n - 1) / 2) * st.a }); return out; };
    const tasten = {};
    const runter = (e) => { if (['ArrowUp', 'ArrowDown', 'KeyW', 'KeyS', 'Space'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); tasten[e.code] = true; if (e.code === 'Space') schuss = 0.22; } if (e.code === 'Escape') ende(); };
    const hoch = (e) => { tasten[e.code] = false; };
    document.addEventListener('keydown', runter, true); document.addEventListener('keyup', hoch, true);
    const punkt = (e) => { const r = cv.getBoundingClientRect(); return (e.clientY - r.top) / r.height * H; };
    cv.addEventListener('pointerdown', (e) => { zieh = { y: punkt(e), b: blau, t: performance.now() }; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', (e) => { if (zieh) blau = Math.max(-120, Math.min(120, zieh.b + punkt(e) - zieh.y)); });
    cv.addEventListener('pointerup', () => { if (zieh && performance.now() - zieh.t < 220) schuss = 0.22; zieh = null; });
    huelle.querySelector('button').onclick = () => ende();
    function ende() { if (fertig) return; fertig = true; document.removeEventListener('keydown', runter, true); document.removeEventListener('keyup', hoch, true); huelle.remove(); ok({ ich, er }); }
    let alt = performance.now();
    function bild(t) {
      if (fertig) return;
      const dt = Math.min(0.033, (t - alt) / 1000); alt = t;
      // Blau steuern
      const dir = (tasten.ArrowDown || tasten.KeyS ? 1 : 0) - (tasten.ArrowUp || tasten.KeyW ? 1 : 0);
      blau = Math.max(-120, Math.min(120, blau + dir * 330 * dt));
      // Rot (Kim): folgt dem Ball, nicht perfekt
      const tempo = leicht ? 170 : 230, rote = STANGEN.filter((s) => s.f === 'r').map((s) => figuren(s)).flat(), vorRot = rote.filter((p) => p.x > ball.x - 4), nahRot = (vorRot.length ? vorRot : rote).reduce((b, p) => (Math.abs(p.x - ball.x) < Math.abs(b.x - ball.x) ? p : b), { x: 1e9, y: 0 });
      fehlerUhr -= dt; if (fehlerUhr <= 0) { fehlerUhr = 0.5 + Math.random() * 0.5; fehler = (Math.random() - 0.5) * (leicht ? 90 : 50); }   // Kim ist nicht perfekt
      const ziel = Math.max(-120, Math.min(120, rot + (ball.y + fehler - nahRot.y) * 0.9));
      rot += Math.max(-tempo * dt, Math.min(tempo * dt, ziel - rot));
      schuss = Math.max(0, schuss - dt); rSchuss = Math.max(0, rSchuss - dt);
      // Ball
      if (pause > 0) pause -= dt;
      else {
        ball.x += ball.vx * dt; ball.y += ball.vy * dt; ball.vx *= 1 - dt * 0.35; ball.vy *= 1 - dt * 0.35;
        if (ball.y < R) { ball.y = R; ball.vy = Math.abs(ball.vy); } if (ball.y > H - R) { ball.y = H - R; ball.vy = -Math.abs(ball.vy); }
        const imTor = Math.abs(ball.y - H / 2) < TOR / 2;
        if (ball.x < R) { if (imTor) { er++; ton('klack'); anstoss(1); } else { ball.x = R; ball.vx = Math.abs(ball.vx); } }
        if (ball.x > W - R) { if (imTor) { ich++; ton('pling'); anstoss(-1); } else { ball.x = W - R; ball.vx = -Math.abs(ball.vx); } }
        // Figuren: abprallen oder schießen
        for (const st of STANGEN) for (const p of figuren(st)) {
          const dx = ball.x - p.x, dy = ball.y - p.y, d = Math.hypot(dx, dy), vorn = st.f === 'b' ? 1 : -1;
          if (d < R + 11 && dx * vorn > -6) {   // nur von vorn: von hinten rollt der Ball unter der Figur durch (sonst klemmt er an der Bande)
            const blauSt = st.f === 'b', kick = blauSt ? schuss > 0 : (rSchuss <= 0 && Math.random() < (leicht ? 0.6 : 0.75));
            if (kick) { const v = 460 + Math.random() * 140, torX = blauSt ? W : 0, zielY = H / 2 + (Math.random() - 0.5) * (TOR + 120) + dy * 3; ball.vx = (blauSt ? 1 : -1) * v; ball.vy = (zielY - ball.y) / Math.max(60, Math.abs(torX - ball.x)) * v; if (!blauSt) rSchuss = 0.5; else schuss = 0; ton('klack'); }
            else { const n = d || 1, v = Math.max(120, Math.hypot(ball.vx, ball.vy)) * 0.8; ball.vx = dx / n * v; ball.vy = dy / n * v; }
            ball.x = p.x + dx / (d || 1) * (R + 12); ball.y = p.y + dy / (d || 1) * (R + 12);
          }
        }
        if (Math.hypot(ball.vx, ball.vy) < 70) {   // langsamer Ball rollt wie auf einem leicht schrägen Tisch zur nächsten Figur (nie tote Zonen)
          const f = STANGEN.flatMap((q) => figuren(q).filter((p) => p.y > 0 && p.y < H)).reduce((b, p) => (Math.hypot(p.x - ball.x, p.y - ball.y) < Math.hypot(b.x - ball.x, b.y - ball.y) ? p : b), { x: 1e9, y: 1e9 });
          const fd = Math.hypot(f.x - ball.x, f.y - ball.y) || 1; ball.vx += (f.x - ball.x) / fd * 170 * dt; ball.vy += (f.y - ball.y) / fd * 170 * dt;
        }
      }
      // Zeichnen
      g.fillStyle = '#2f8a3a'; g.fillRect(0, 0, W, H);
      g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 3; g.strokeRect(6, 6, W - 12, H - 12); g.beginPath(); g.moveTo(W / 2, 6); g.lineTo(W / 2, H - 6); g.stroke();
      g.beginPath(); g.arc(W / 2, H / 2, 46, 0, Math.PI * 2); g.stroke();
      g.fillStyle = '#1b1f27'; g.fillRect(0, H / 2 - TOR / 2, 6, TOR); g.fillRect(W - 6, H / 2 - TOR / 2, 6, TOR);
      for (const st of STANGEN) {
        g.fillStyle = '#c0c6cf'; g.fillRect(st.x - 2, 0, 4, H);
        for (const p of figuren(st)) {
          const tritt = st.f === 'b' ? schuss > 0 : rSchuss > 0.3;
          g.fillStyle = st.f === 'b' ? '#3f78b8' : '#e85d75'; g.fillRect(p.x - 7 + (tritt ? (st.f === 'b' ? 5 : -5) : 0), p.y - 11, 14, 22);
          g.fillStyle = '#f1c7a2'; g.beginPath(); g.arc(p.x, p.y, 5, 0, Math.PI * 2); g.fill();
        }
      }
      g.fillStyle = '#ffffff'; g.beginPath(); g.arc(ball.x, ball.y, R, 0, Math.PI * 2); g.fill();
      standEl.textContent = 'Du ' + ich + ' : ' + er + ' ' + gegner + (pause > 0 && (ich || er) ? '   ⚽ Tor!' : '');
      if (ich >= 5 || er >= 5) { standEl.textContent = (ich > er ? '🏆 Gewonnen! ' : 'Knapp! ') + ich + ' : ' + er; fertig = true; document.removeEventListener('keydown', runter, true); document.removeEventListener('keyup', hoch, true); setTimeout(() => { huelle.remove(); ok({ ich, er }); }, 1400); return; }
      requestAnimationFrame(bild);
    }
    requestAnimationFrame(bild);
  });
}

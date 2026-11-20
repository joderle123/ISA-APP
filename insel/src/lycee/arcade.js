// Spielautomat im Jugendhaus: „Kevin rennt“ (Auftrag 20.11.: „spaßiger“). Kevin, der Kaktus (Linas Sticker), läuft durchs Dorf
// und springt über Hausaufgaben-Stapel, Pfützen und Tauben. Sterne sammeln, immer schneller. Leertaste/↑/Tippen = springen
// (lang = höher), ↓ = ducken. Eigenes kleines Spiel (eigene Figuren, eigene Regeln) – kein Nachbau eines bekannten Spiels.
export function kevinRennt({ ton = () => {}, rekord = 0 } = {}) {
  return new Promise((ok) => {
    const W = 640, H = 300, BODEN = 248;
    const huelle = document.createElement('div');
    huelle.style.cssText = 'position:fixed;inset:0;z-index:60;background:rgba(15,18,28,.82);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;font-family:system-ui,sans-serif;touch-action:none';
    huelle.innerHTML = '<div style="color:#ffd166;font:800 22px system-ui;letter-spacing:.06em">🌵 KEVIN RENNT</div><canvas width="' + W + '" height="' + H + '" style="max-width:96vw;border-radius:12px;border:6px solid #2b2f4a;box-shadow:0 0 0 3px #ff7ac8,0 10px 30px rgba(0,0,0,.5);background:#9fe3ff;image-rendering:pixelated"></canvas>' +
      '<div style="color:#e9ecef;font-size:14px;text-align:center">Leertaste / ↑ / tippen = springen (halten = höher) · ↓ = ducken</div><button type="button" style="font:600 15px system-ui;padding:8px 18px;border-radius:999px;border:0;background:#fff;color:#2b3a55">Aufhören</button>';
    document.body.appendChild(huelle);
    const cv = huelle.querySelector('canvas'), g = cv.getContext('2d');
    const k = { y: BODEN, vy: 0, duck: false, halten: false }, hind = [], sterne = [], wolken = [];
    let t = 0, tempo = 260, punkte = 0, st = 0, bisNext = 1.2, vorbei = false, fertig = false, alt = performance.now(), start = 1.2;
    for (let i = 0; i < 4; i++) wolken.push({ x: Math.random() * W, y: 20 + Math.random() * 80, s: 0.6 + Math.random() * 0.8 });
    const sprung = () => { if (vorbei) { neu(); return; } if (k.y >= BODEN - 0.5) { k.vy = -560; ton('pling'); } k.halten = true; };
    const neu = () => { hind.length = 0; sterne.length = 0; t = 0; tempo = 260; punkte = 0; st = 0; bisNext = 1.2; vorbei = false; k.y = BODEN; k.vy = 0; start = 0.8; };
    const runter = (e) => {
      if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); if (!e.repeat) sprung(); }
      if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); k.duck = true; }
      if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); ende(); }
    };
    const hoch = (e) => { if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) k.halten = false; if (['ArrowDown', 'KeyS'].includes(e.code)) k.duck = false; };
    document.addEventListener('keydown', runter, true); document.addEventListener('keyup', hoch, true);
    cv.addEventListener('pointerdown', (e) => { e.preventDefault(); sprung(); }); cv.addEventListener('pointerup', () => { k.halten = false; });
    huelle.querySelector('button').onclick = () => ende();
    let best = rekord;
    function ende() { if (fertig) return; fertig = true; document.removeEventListener('keydown', runter, true); document.removeEventListener('keyup', hoch, true); huelle.remove(); ok({ punkte: Math.max(best, Math.floor(punkte)), rekord: best > rekord }); }
    const TYPEN = [{ art: 'stapel', w: 26, h: 34 }, { art: 'stapel2', w: 26, h: 52 }, { art: 'pfuetze', w: 46, h: 8 }, { art: 'taube', w: 30, h: 18, fliegt: true }];
    function bild(ms) {
      if (fertig) return;
      const dt = Math.min(0.033, (ms - alt) / 1000); alt = ms;
      if (start > 0) start -= dt;
      else if (!vorbei) {
        t += dt; tempo = Math.min(560, 260 + t * 9); punkte += dt * tempo / 30;
        // Kevin: Schwerkraft, kurzer Druck = kleiner Sprung, halten = hoch
        k.vy += (k.halten && k.vy < 0 ? 1100 : 2300) * dt; k.y = Math.min(BODEN, k.y + k.vy * dt); if (k.y >= BODEN) k.vy = 0;
        bisNext -= dt;
        if (bisNext <= 0) {
          const typ = TYPEN[t < 8 ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 4)];
          hind.push({ ...typ, x: W + 20, y: typ.fliegt ? BODEN - 32 - Math.random() * 8 : BODEN });
          if (Math.random() < 0.55) sterne.push({ x: W + 120 + Math.random() * 80, y: BODEN - 70 - Math.random() * 70 });
          bisNext = 0.75 + Math.random() * 0.9 - Math.min(0.35, t * 0.008);
        }
        for (const h of hind) h.x -= tempo * dt * (h.fliegt ? 1.15 : 1);
        for (const s of sterne) s.x -= tempo * dt;
        while (hind.length && hind[0].x < -60) hind.shift();
        while (sterne.length && sterne[0].x < -30) sterne.shift();
        // Kollision (Kevin ist schmal; ducken = niedriger)
        const kh = k.duck && k.y >= BODEN ? 26 : 44, kx = 90, kw = 24;
        for (const h of hind) if (kx + kw / 2 > h.x - h.w / 2 + 4 && kx - kw / 2 < h.x + h.w / 2 - 4 && k.y > h.y - h.h + 3 && k.y - kh < h.y) { vorbei = true; ton('klack'); best = Math.max(best, Math.floor(punkte)); }
        for (const s of sterne) if (!s.weg && Math.abs(s.x - kx) < 22 && Math.abs(s.y - (k.y - kh / 2)) < 30) { s.weg = true; st++; punkte += 25; ton('pling'); }
      }
      for (const w of wolken) { w.x -= dt * 18 * w.s; if (w.x < -80) { w.x = W + 40; w.y = 20 + Math.random() * 80; } }
      // Zeichnen: Himmel, Wolken, Dorf-Silhouette, Boden
      g.fillStyle = '#9fe3ff'; g.fillRect(0, 0, W, H);
      g.fillStyle = '#ffffff'; for (const w of wolken) { g.beginPath(); g.ellipse(w.x, w.y, 34 * w.s, 12 * w.s, 0, 0, Math.PI * 2); g.fill(); }
      g.fillStyle = '#b8d8c8'; for (let i = 0; i < 9; i++) { const x = ((i * 90 - t * 30) % 810 + 810) % 810 - 80; g.fillRect(x, 170 - (i % 3) * 18, 60, 80 + (i % 3) * 18); g.beginPath(); g.moveTo(x - 6, 170 - (i % 3) * 18); g.lineTo(x + 30, 140 - (i % 3) * 18); g.lineTo(x + 66, 170 - (i % 3) * 18); g.fill(); }
      g.fillStyle = '#7cc46a'; g.fillRect(0, BODEN, W, H - BODEN); g.fillStyle = '#5ea84f'; for (let x = -((t * tempo) % 40); x < W; x += 40) g.fillRect(x, BODEN, 20, 4);
      // Hindernisse
      for (const h of hind) {
        if (h.art.startsWith('stapel')) { const n = h.art === 'stapel2' ? 5 : 3; for (let i = 0; i < n; i++) { g.fillStyle = ['#f4efe6', '#ffd166', '#5ec8ff', '#ff7ac8', '#f4efe6'][i]; g.fillRect(h.x - 13 + (i % 2) * 2, h.y - (i + 1) * (h.h / n), 26, h.h / n - 1); } }
        else if (h.art === 'pfuetze') { g.fillStyle = '#4a90c8'; g.beginPath(); g.ellipse(h.x, h.y - 2, 23, 5, 0, 0, Math.PI * 2); g.fill(); }
        else { g.fillStyle = '#7d8590'; g.beginPath(); g.ellipse(h.x, h.y - 9, 14, 8, 0, 0, Math.PI * 2); g.fill(); g.fillRect(h.x - 18, h.y - 12 + Math.sin(t * 20) * 4, 12, 3); g.fillRect(h.x + 6, h.y - 12 - Math.sin(t * 20) * 4, 12, 3); g.fillStyle = '#e9a23b'; g.fillRect(h.x - 17, h.y - 10, 5, 3); }
      }
      for (const s of sterne) if (!s.weg) { g.fillStyle = '#ffd23f'; g.font = '22px system-ui'; g.textAlign = 'center'; g.fillText('⭐', s.x, s.y + 8); }
      // Kevin der Kaktus mit Sonnenbrille
      { const kh = k.duck && k.y >= BODEN ? 26 : 44, x = 90, y = k.y, lauf = Math.sin(t * 22) * (k.y >= BODEN ? 2 : 0);
        g.fillStyle = '#3f9a4a'; g.fillRect(x - 11, y - kh, 22, kh); g.fillRect(x - 20, y - kh * 0.7 + lauf, 9, 14); g.fillRect(x + 11, y - kh * 0.8 - lauf, 9, 14);
        g.fillStyle = '#2b2b33'; g.fillRect(x - 9, y - kh + 8, 18, 6); g.fillStyle = '#c45a3a'; g.fillRect(x - 13, y - 6, 26, 6); }
      g.fillStyle = '#2b2f4a'; g.font = '700 18px system-ui'; g.textAlign = 'left'; g.fillText('Punkte ' + Math.floor(punkte) + '   ⭐ ' + st, 14, 26);
      g.textAlign = 'right'; g.fillText('Rekord ' + Math.max(best, rekord), W - 14, 26);
      if (start > 0 && !vorbei) { g.textAlign = 'center'; g.font = '800 34px system-ui'; g.fillText('Los geht’s!', W / 2, 120); }
      if (vorbei) { g.fillStyle = 'rgba(15,18,28,.6)'; g.fillRect(0, 0, W, H); g.fillStyle = '#fff'; g.textAlign = 'center'; g.font = '800 32px system-ui'; g.fillText('Autsch! ' + Math.floor(punkte) + ' Punkte', W / 2, 120); g.font = '600 18px system-ui'; g.fillText('Springen = nochmal · Aufhören = Ende', W / 2, 156); }
      requestAnimationFrame(bild);
    }
    requestAnimationFrame(bild);
  });
}

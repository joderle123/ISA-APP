// Annexe Junglinster – Mechaniken für Kapitel 5 „Admin“ (Heft #04 Gedanken). Das Werkzeug des Kapitels: 📷 Kamera-Check.
// Ein Gedanke fühlt sich an wie eine Tatsache. Eine Kamera sieht Verhalten – keine Gedanken. (Fach- und Jugend-Panel, Entwurf v2)
//   ui.kopfBlase(def)     – ein Gedanke erscheint groß über der Welt. 📷 antippen = prüfen (Standbild folgt in der Geschichte). → { geprueft }
//   ui.zurueckspulen(def) – das Bild spult zurück (Rauschen, Ton rückwärts). Gleicher Moment, anderer Gedanke. → Promise
//   ui.taubeTest(def)     – Clip vom Hallenturnier: Pässe der Blauen zählen. Gerd läuft mitten durchs Bild. → { zahl, richtig, gerd }
//   ui.eisRennen(def)     – Eisbahn von oben: eine Runde gegen Yusuf. Schwung bleibt, Bande = hinfallen. → { gewonnen, gefallen, sek }
//   ui.busfenster(def)    – beschlagenes Busfenster: den alten Satz wegwischen, den eigenen Beweis hinschreiben. → { satz, i }
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const warte = (ms) => new Promise((ok) => setTimeout(ok, ms));
const misch = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

export function mechanikenK5(ui, { ersetze = (t) => t, ton = () => {} } = {}) {
  const tasten = new Set();
  const halte = (f) => { const h = (e) => f(e); document.addEventListener('keydown', h, true); tasten.add(h); return h; };
  const loesche = () => { tasten.forEach((h) => document.removeEventListener('keydown', h, true)); tasten.clear(); };
  const taste = (codes, f) => halte((e) => { if (codes.includes(e.code)) { e.preventDefault(); e.stopPropagation(); f(e.code); } });
  const zeitFaktor = () => (ui.zeitlos ? 60 : 1) * (ui.ruhig ? 1.6 : 1) * (ui.einstellungen && ui.einstellungen().text !== 'normal' ? 1.3 : 1);
  const lese = (t) => Math.max(1600, String(t || '').split(/\s+/).length * 380) * (ui.ruhig ? 1.4 : 1);

  // ---------- Kopf-Blase ----------
  // def: { t: 'Alle wissen es.', stufe: 'gefuehrt' | 'frei' | 'klein', zeit: s }
  // gefuehrt: großer 📷 „Prüfen“ mit Hinweis, keine Zeit. frei: 📷 ohne Hinweis, Zeit läuft (dann geht es ohne Prüfen weiter).
  // klein: nur ein kleines 📷 am Rand (Freitag) – wer es nicht sieht, verpasst nichts Schlimmes.
  ui.kopfBlase = (def) => new Promise((ok) => {
    const st = def.stufe || 'frei';
    const k = ui.ebeneAuf('blase', '<div class="k5-blase-wrap ' + st + '"><div class="k5-blase"><span class="k5-b-icon">💭</span><b>' + esc(ersetze(def.t)) + '</b></div>' +
      '<button type="button" class="k5-kamera" data-a="check" aria-label="Kamera-Check: Was hätte eine Kamera gesehen?">📷' + (st === 'gefuehrt' ? '<span>Prüfen</span>' : '') + '</button>' +
      (st === 'gefuehrt' ? '<p class="k5-b-hinweis">Was hätte eine Kamera gesehen? Tipp auf 📷.</p>' : '<div class="k5-b-zeit"><i></i></div>') + '</div>');
    let aus = false, an = true, uhr = 0;
    const ende = (geprueft) => { if (aus) return; aus = true; an = false; clearTimeout(uhr); loesche(); ui.ebeneZu(); ok({ geprueft }); };
    k.querySelector('[data-a="check"]').onclick = () => { ton('kamera'); ende(true); };
    if (st !== 'gefuehrt') {
      const sek = (def.zeit || (st === 'klein' ? 6 : 8)) * zeitFaktor(), bar = k.querySelector('.k5-b-zeit i'), t0 = performance.now();
      const lauf = () => { if (!an) return; const r = Math.max(0, 1 - (performance.now() - t0) / (sek * 1000)); bar.style.transform = 'scaleX(' + r + ')'; if (r <= 0) { ende(false); return; } requestAnimationFrame(lauf); };
      requestAnimationFrame(lauf);
    }
    taste(['KeyE', 'Enter', 'Space'], () => { ton('kamera'); ende(true); });
  });

  // ---------- Zurückspulen ----------
  // def: { t: 'Zurück. Gleiche Tür.' }
  ui.zurueckspulen = (def = {}) => new Promise((ok) => {
    const k = ui.ebeneAuf('spulen', '<div class="k5-spul"><i class="k5-sp-streifen"></i><b>⏪</b><span>' + esc(ersetze(def.t || 'Zurück.')) + '</span><small class="k5-sp-zeit">−00:12</small></div>');
    ton('rueck'); setTimeout(() => ton('rueck'), 420);
    const z = k.querySelector('.k5-sp-zeit'); let n = 12; const iv = setInterval(() => { n = Math.max(0, n - 2); z.textContent = '−00:' + String(n).padStart(2, '0'); }, 220);
    setTimeout(() => { clearInterval(iv); ui.ebeneZu(); ok(); }, 1700);
  });

  // ---------- Taube-Test (Culture générale, Mme Rantini) ----------
  // def: { wo, paesse: 11, dauer: 20, gerd: [7.5, 12.5] } – Blau passt, Orange passt auch (Ablenkung). Gerd (Taube mit Partyhut)
  // läuft fünf Sekunden mitten durchs Bild. „👀 Mir fällt was auf“ geht jederzeit. Danach: Wie viele Pässe? Und Gerd? (Wiederholung mit Kreis)
  ui.taubeTest = (def) => new Promise((ok) => {
    const W = 600, H = 330, N = def.paesse || 11, D = (def.dauer || 20) * (ui.ruhig ? 1.15 : 1), G = def.gerd || [7.5, 12.5];
    const k = ui.ebeneAuf('szene', '<div class="sz k5-taube"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Saal 1.04 · Culture générale') + '</span><b>🎬 Der Clip vom Turnier</b></div>' +
      '<p class="sz-info k5-t-auftrag">Zähl die Pässe von <b style="color:#2e6fd8">Blau</b>. Nur Blau.</p><canvas width="' + W + '" height="' + H + '"></canvas>' +
      '<div class="sz-karten k5-t-knopf"><button type="button" data-a="auf">👀 Mir fällt was auf</button></div><div class="sz-bühne k5-t-rede"></div></div>');
    const cv = k.querySelector('canvas'), c = cv.getContext('2d'), knopf = k.querySelector('.k5-t-knopf'), rede = k.querySelector('.k5-t-rede');
    // Spieler: drei Blaue, drei Orange – laufen zu Zufallspunkten
    const sp = [0, 1, 2, 3, 4, 5].map((i) => ({ blau: i < 3, x: 120 + (i % 3) * 180, y: i < 3 ? 110 : 220, zx: 0, zy: 0, t: 0 }));
    const neuZiel = (p) => { p.zx = 60 + Math.random() * (W - 120); p.zy = 50 + Math.random() * (H - 100); p.t = 1 + Math.random() * 1.5; };
    sp.forEach(neuZiel);
    const passPlan = (anz, team) => { const l = []; let von = team ? 0 : 3; for (let i = 0; i < anz; i++) { let nach; do nach = (team ? 0 : 3) + Math.floor(Math.random() * 3); while (nach === von); l.push({ t: 0.8 + i * ((D - 1.8) / anz) + Math.random() * 0.35, von, nach }); von = nach; } return l; };
    const blauP = passPlan(N, true), orP = passPlan(Math.max(5, N - 3), false);
    let gerdGesehen = false, aufT = [];
    const ballPos = (plan, t, start) => { let h = start; for (const p of plan) { if (t < p.t) break; if (t < p.t + 0.55) { const a = sp[p.von], b = sp[p.nach], f = (t - p.t) / 0.55; return [a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f - Math.sin(f * Math.PI) * 18]; } h = p.nach; } return [sp[h].x + 12, sp[h].y - 4]; };
    const gerdPos = (t) => { if (t < G[0] || t > G[1]) return null; const f = (t - G[0]) / (G[1] - G[0]), m = Math.min(1, Math.max(0, (f - 0.45) / 0.12)); const x = -30 + (W + 60) * (f < 0.45 ? f / 0.45 * 0.5 : f > 0.57 ? 0.5 + (f - 0.57) / 0.43 * 0.5 : 0.5); return [x, 178 + Math.sin(t * 14) * 2, m > 0 && m < 1]; };
    const zeichneGerd = (x, y, kreis) => {
      c.save(); c.translate(x, y);
      c.fillStyle = '#8c929c'; c.beginPath(); c.ellipse(0, 0, 16, 10, 0, 0, Math.PI * 2); c.fill();   // Körper
      c.fillStyle = '#a3a9b2'; c.beginPath(); c.arc(13, -9, 7, 0, Math.PI * 2); c.fill();               // Kopf
      c.fillStyle = '#f2a33a'; c.beginPath(); c.moveTo(19, -9); c.lineTo(25, -7); c.lineTo(19, -6); c.fill(); // Schnabel
      c.fillStyle = '#e0384f'; c.beginPath(); c.moveTo(8, -15); c.lineTo(13, -30); c.lineTo(17, -15); c.fill(); // Partyhut
      c.strokeStyle = '#c47a2a'; c.lineWidth = 2; c.beginPath(); c.moveTo(-3, 9); c.lineTo(-5, 16); c.moveTo(4, 9); c.lineTo(5, 16); c.stroke();
      c.restore();
      if (kreis) { c.strokeStyle = '#ffd23f'; c.lineWidth = 4; c.beginPath(); c.arc(x + 4, y - 6, 40, 0, Math.PI * 2); c.stroke(); }
    };
    const feld = () => {
      c.fillStyle = '#d9b98a'; c.fillRect(0, 0, W, H);
      c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 3; c.strokeRect(14, 14, W - 28, H - 28); c.beginPath(); c.moveTo(W / 2, 14); c.lineTo(W / 2, H - 14); c.stroke();
      c.beginPath(); c.arc(W / 2, H / 2, 44, 0, Math.PI * 2); c.stroke();
    };
    const bild = (t, kreis) => {
      feld();
      for (const p of sp) { c.fillStyle = p.blau ? '#2e6fd8' : '#e67e22'; c.beginPath(); c.arc(p.x, p.y, 15, 0, Math.PI * 2); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(p.x - 4, p.y - 3, 2.4, 0, Math.PI * 2); c.arc(p.x + 4, p.y - 3, 2.4, 0, Math.PI * 2); c.fill(); }
      const g = gerdPos(t); if (g) zeichneGerd(g[0], g[1], kreis);
      const [bx, by] = ballPos(blauP, t, 0), [ox, oy] = ballPos(orP, t, 3);
      c.fillStyle = '#ffffff'; c.beginPath(); c.arc(bx, by, 7, 0, Math.PI * 2); c.fill(); c.strokeStyle = '#2e6fd8'; c.lineWidth = 2; c.stroke();
      c.fillStyle = '#ffe0bd'; c.beginPath(); c.arc(ox, oy, 7, 0, Math.PI * 2); c.fill(); c.strokeStyle = '#e67e22'; c.stroke();
    };
    const bewegen = (dt) => { for (const p of sp) { p.t -= dt; if (p.t <= 0) neuZiel(p); const dx = p.zx - p.x, dy = p.zy - p.y, d = Math.hypot(dx, dy) || 1, v = Math.min(d, 70 * dt); p.x += dx / d * v; p.y += dy / d * v; } };
    let t = 0, letzt = performance.now(), aus = false;
    knopf.querySelector('[data-a="auf"]').onclick = () => { aufT.push(t); if (t >= G[0] - 0.3 && t <= G[1] + 1.2) gerdGesehen = true; ton('klick'); rede.innerHTML = '<div class="sz-sys">Notiert. Weiter zählen.</div>'; };
    taste(['KeyE', 'Enter', 'Space'], () => knopf.querySelector('[data-a="auf"]') && knopf.querySelector('[data-a="auf"]').click());
    const loop = () => {
      if (aus) return; const j = performance.now(), dt = Math.min(0.05, (j - letzt) / 1000); letzt = j; t += dt; bewegen(dt); bild(t, false);
      if (t < D) { requestAnimationFrame(loop); return; }
      aus = true; loesche(); fragen();
    };
    const knoepfe = (html) => new Promise((r) => { knopf.innerHTML = html; knopf.querySelectorAll('[data-i]').forEach((b) => { b.onclick = () => r(+b.dataset.i); }); });
    const fragen = async () => {
      rede.innerHTML = ''; k.querySelector('.k5-t-auftrag').textContent = 'Wie viele Pässe hat Blau gespielt?';
      const zahlen = misch([N - 1, N, N + 2]);
      const i = await knoepfe(zahlen.map((z, n) => '<button type="button" data-i="' + n + '">' + z + '</button>').join(''));
      const richtig = zahlen[i] === N; ton(richtig ? 'pling' : 'klick');
      rede.innerHTML = '<div class="sz-sys">' + (richtig ? '✓ ' + N + ' Pässe.' : 'Es waren ' + N + '.') + '</div>';
      await warte(1500);
      k.querySelector('.k5-t-auftrag').textContent = 'Nochmal. Nur diese fünf Sekunden.';
      rede.innerHTML = '<div class="sz-sys">' + (gerdGesehen ? '👀 Du hast ihn gesehen.' : 'Gerd lief fünf Sekunden mitten durchs Bild.') + '</div>';
      // Wiederholung: nur die fünf Sekunden, Gerd im Kreis
      for (const p of sp) neuZiel(p);
      const t0 = performance.now();
      await new Promise((r) => { const re = () => { const tt = G[0] - 0.3 + (performance.now() - t0) / 1000; bild(tt, true); if (tt < G[1] + 0.3) requestAnimationFrame(re); else r(); }; requestAnimationFrame(re); });
      knopf.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      let zu = false; const fertig = () => { if (zu) return; zu = true; loesche(); ui.ebeneZu(); ok({ zahl: zahlen[i], richtig, gerd: gerdGesehen, auf: aufT.length }); };
      knopf.querySelector('[data-a="w"]').onclick = fertig; setTimeout(() => { if (!zu) taste(['KeyE', 'Enter'], fertig); }, 400);
    };
    bild(0, false);
    // Erst lesen lassen, dann läuft der Clip
    setTimeout(() => { letzt = performance.now(); requestAnimationFrame(loop); }, Math.min(2600, lese('Zähl die Pässe von Blau. Nur Blau.')));
  });

  // ---------- Eis-Rennen (Marktplatz, Freitag) ----------
  // def: { wo, gegner: { name, farbe }, zeit: 45 } – Finger halten = in diese Richtung Schwung holen (Pfeile gehen auch).
  // Eine Runde um die Insel in der Mitte. Zu schnell an die Bande = hinfallen (1,5 s). Yusuf fährt gleichmäßig, fällt nie.
  ui.eisRennen = (def) => new Promise((ok) => {
    const W = 600, H = 340, CX = W / 2, CY = H / 2, AX = 280, AY = 150, IX = 120, IY = 52;
    const g = def.gegner || { name: 'Yusuf', farbe: '#2e86de' };
    const k = ui.ebeneAuf('szene', '<div class="sz k5-eis"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Eisbahn · Marktplatz') + '</span><b>⛸️ Eine Runde gegen ' + esc(g.name) + '</b></div>' +
      '<p class="sz-info">Finger halten, wohin du willst. Du rutschst. Zu schnell an die Bande: hingefallen.</p><canvas width="' + W + '" height="' + H + '"></canvas><div class="sz-stand k5-e-stand"></div><div class="sz-karten k5-e-knopf"></div></div>');
    const cv = k.querySelector('canvas'), c = cv.getContext('2d'), stand = k.querySelector('.k5-e-stand'), knopf = k.querySelector('.k5-e-knopf');
    const ich = { x: CX, y: CY + (IY + AY) / 2, vx: 0, vy: 0, liegt: 0, w: 0, wAlt: Math.atan2((IY + AY) / 2, 0) };
    const er = { w: Math.PI / 2 + 0.12, liegt: 0 }, R = { x: (IX + AX) / 2 + 4, y: (IY + AY) / 2 };
    let finger = null, tasten2 = { l: 0, r: 0, o: 0, u: 0 }, t = 0, gefallen = 0, laeuft = false, aus = false, letzt = 0;
    const innen = (x, y, a, b) => ((x - CX) / a) ** 2 + ((y - CY) / b) ** 2;
    const pos = (e) => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H }; };
    cv.addEventListener('pointerdown', (e) => { finger = pos(e); try { cv.setPointerCapture(e.pointerId); } catch (x) { /* Test-Klick */ } });
    cv.__st = () => ({ x: ich.x, y: ich.y, laeuft, CX, CY, rx: (IX + AX) / 2, ry: (IY + AY) / 2, W, H });   // für den Testlauf
    cv.addEventListener('pointermove', (e) => { if (finger) finger = pos(e); });
    cv.addEventListener('pointerup', () => { finger = null; });
    halte((e) => { const an = e.type === 'keydown'; const m = { ArrowLeft: 'l', ArrowRight: 'r', ArrowUp: 'o', ArrowDown: 'u' }[e.code]; if (m) { e.preventDefault(); e.stopPropagation(); tasten2[m] = an ? 1 : 0; } });
    const auf = (e) => { const m = { ArrowLeft: 'l', ArrowRight: 'r', ArrowUp: 'o', ArrowDown: 'u' }[e.code]; if (m) tasten2[m] = 0; };
    document.addEventListener('keyup', auf, true);
    const winkel = (x, y) => Math.atan2((y - CY) / AY, (x - CX) / AX);
    const zeichne = () => {
      c.fillStyle = '#5b6b7a'; c.fillRect(0, 0, W, H);
      c.fillStyle = '#e8f4fb'; c.beginPath(); c.ellipse(CX, CY, AX, AY, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = '#c0392b'; c.lineWidth = 6; c.stroke();
      c.strokeStyle = 'rgba(120,160,190,.35)'; c.lineWidth = 1.5; for (let i = 0; i < 7; i++) { c.beginPath(); c.ellipse(CX, CY, IX + 18 + i * 22, IY + 12 + i * 13, 0, 0.2 * i, 0.2 * i + 2.2); c.stroke(); }
      c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(CX, CY, IX, IY, 0, 0, Math.PI * 2); c.fill(); c.strokeStyle = '#c0392b'; c.lineWidth = 4; c.stroke();
      c.fillStyle = '#2b3a55'; c.font = 'bold 16px system-ui, sans-serif'; c.textAlign = 'center'; c.fillText('⛄', CX, CY + 6);
      c.strokeStyle = '#2b3a55'; c.setLineDash([6, 6]); c.lineWidth = 3; c.beginPath(); c.moveTo(CX, CY + IY); c.lineTo(CX, CY + AY); c.stroke(); c.setLineDash([]);
      // Yusuf
      const ex = CX + Math.cos(er.w) * R.x, ey = CY + Math.sin(er.w) * R.y;
      c.fillStyle = g.farbe; c.beginPath(); c.arc(ex, ey, 11, 0, Math.PI * 2); c.fill(); c.fillStyle = '#fff'; c.font = 'bold 11px system-ui'; c.fillText(g.name[0], ex, ey + 4);
      // du
      c.fillStyle = ich.liegt > 0 ? '#9aa4b2' : '#2b3a55'; c.beginPath(); c.arc(ich.x, ich.y, 11, 0, Math.PI * 2); c.fill(); c.fillStyle = '#fff'; c.fillText('Du', ich.x, ich.y + 4);
      if (ich.liegt > 0) { c.fillStyle = '#c0392b'; c.font = 'bold 15px system-ui'; c.fillText('Hingefallen!', ich.x, ich.y - 18); }
      if (finger && laeuft) { c.strokeStyle = 'rgba(43,58,85,.35)'; c.lineWidth = 2; c.beginPath(); c.moveTo(ich.x, ich.y); c.lineTo(finger.x, finger.y); c.stroke(); }
    };
    const runde = (w0, w1) => { let d = w1 - w0; d = Math.atan2(Math.sin(d), Math.cos(d)); return d; };
    const ende = (sieg) => {
      if (aus) return; aus = true; laeuft = false; document.removeEventListener('keyup', auf, true);
      const sek = Math.round(t * 10) / 10;
      ton(sieg ? 'pling' : 'klick');
      stand.textContent = sieg ? '🏁 Erste:r! ' + sek + ' s' : '🏁 ' + g.name + ' war schneller.';
      knopf.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
      let zu = false; const fertig = () => { if (zu) return; zu = true; loesche(); ui.ebeneZu(); ok({ gewonnen: !!sieg, gefallen, sek }); };
      knopf.querySelector('[data-a="w"]').onclick = fertig; setTimeout(() => { if (!zu) taste(['KeyE', 'Enter'], fertig); }, 500);
    };
    let ichW = 0, erW = 0;
    const loop = () => {
      if (aus) return; const j = performance.now(), dt = Math.min(0.05, (j - letzt) / 1000); letzt = j; t += dt;
      // du
      if (ich.liegt > 0) { ich.liegt -= dt; ich.vx *= 0.9; ich.vy *= 0.9; }
      else {
        let ax = 0, ay = 0;
        if (finger) { const dx = finger.x - ich.x, dy = finger.y - ich.y, d = Math.hypot(dx, dy); if (d > 8) { ax = dx / d; ay = dy / d; } }
        else { ax = tasten2.r - tasten2.l; ay = tasten2.u - tasten2.o; const d = Math.hypot(ax, ay); if (d) { ax /= d; ay /= d; } }
        ich.vx += ax * 230 * dt; ich.vy += ay * 230 * dt;
      }
      const v = Math.hypot(ich.vx, ich.vy), MAX = def.vorsichtig ? 175 : 240; if (v > MAX) { ich.vx *= MAX / v; ich.vy *= MAX / v; }
      ich.vx *= Math.pow(0.55, dt); ich.vy *= Math.pow(0.55, dt);   // Eis: man gleitet lange
      let nx = ich.x + ich.vx * dt, ny = ich.y + ich.vy * dt;
      const aussen = innen(nx, ny, AX - 11, AY - 11) > 1, insel = innen(nx, ny, IX + 11, IY + 11) < 1;
      if (aussen || insel) {
        // Normale der Ellipse (nach außen); nur abprallen, wenn man auf die Bande zu fährt – entlangrutschen ist erlaubt
        const nxm = (ich.x - CX) / (aussen ? AX * AX : IX * IX), nym = (ich.y - CY) / (aussen ? AY * AY : IY * IY), nl = Math.hypot(nxm, nym) || 1, ux = nxm / nl, uy = nym / nl;
        const dot = ich.vx * ux + ich.vy * uy;
        if ((aussen && dot > 0) || (insel && dot < 0)) {
          if (Math.abs(dot) > 140 && ich.liegt <= 0 && !def.vorsichtig) { ich.liegt = 1.5; gefallen++; ton('platsch'); }   // frontal zu schnell: hingefallen
          ich.vx -= 1.6 * dot * ux; ich.vy -= 1.6 * dot * uy; ich.vx *= 0.6; ich.vy *= 0.6;
        }
        nx = ich.x; ny = ich.y;
      }
      ich.x = nx; ich.y = ny;
      const w = winkel(ich.x, ich.y); ichW += runde(ich.wAlt, w); ich.wAlt = w;
      // Yusuf: eine Runde in etwa 12 s (def.runde), gleichmäßig
      const ew = er.w; er.w -= (Math.PI * 2 / (def.runde || 12)) * dt; erW += Math.abs(runde(ew, er.w));
      const ichRunde = Math.abs(ichW) / (Math.PI * 2);
      stand.textContent = 'Du: ' + Math.min(100, Math.round(ichRunde * 100)) + ' % · ' + g.name + ': ' + Math.min(100, Math.round(erW / (Math.PI * 2) * 100)) + ' %' + (gefallen ? ' · gefallen: ' + gefallen : '');
      zeichne();
      if (ichRunde >= 1) { ende(true); return; }
      if (erW >= Math.PI * 2 || t > (def.zeit || 45)) { ende(false); return; }
      requestAnimationFrame(loop);
    };
    zeichne();
    (async () => {
      for (const n of ['3', '2', '1', 'Los!']) { stand.textContent = n; ton('klick'); await warte(650); }
      laeuft = true; letzt = performance.now(); requestAnimationFrame(loop);
    })();
  });

  // ---------- Busfenster ----------
  // def: { alt: 'Gleich lachen alle.', wort: 'alle', saetze: ['Ich hab losgelassen. Ayla hat geklatscht.', …] }
  // Der alte Satz steht im beschlagenen Fenster. Über das Wort wischen (oder 🧽) – dann einen eigenen Satz hinschreiben (≤ 3 zur Wahl).
  ui.busfenster = (def) => new Promise((ok) => {
    const W = 600, H = 250;
    const k = ui.ebeneAuf('szene', '<div class="sz k5-fenster"><div class="sz-kopf"><span class="sz-wo">' + esc(def.wo || 'Im Bus · 17:04') + '</span><b>Das Fenster ist beschlagen</b></div>' +
      '<p class="sz-info k5-f-info">Wisch „' + esc(def.wort || 'alle') + '“ weg.</p><canvas width="' + W + '" height="' + H + '"></canvas><div class="sz-karten k5-f-knopf ly-d-optionen"><button type="button" data-a="wisch">🧽 Wegwischen</button></div></div>');
    const cv = k.querySelector('canvas'), c = cv.getContext('2d'), info = k.querySelector('.k5-f-info'), knopf = k.querySelector('.k5-f-knopf');
    const nebel = document.createElement('canvas'); nebel.width = W; nebel.height = H; const n = nebel.getContext('2d');
    const draussen = () => {
      const gr = c.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#1d2b45'); gr.addColorStop(1, '#3b4a63'); c.fillStyle = gr; c.fillRect(0, 0, W, H);
      for (let i = 0; i < 26; i++) { const x = (i * 97) % W, y = 40 + ((i * 53) % (H - 80)), r = 6 + (i % 5) * 4; c.fillStyle = ['rgba(255,210,120,.45)', 'rgba(255,120,90,.35)', 'rgba(160,220,255,.35)'][i % 3]; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); }
    };
    const font = 'bold 40px "Segoe Print", "Bradley Hand", "Comic Neue", cursive';
    const nebelVoll = () => { n.globalCompositeOperation = 'source-over'; n.fillStyle = 'rgba(214,224,232,.86)'; n.fillRect(0, 0, W, H); for (let i = 0; i < 300; i++) { n.fillStyle = 'rgba(255,255,255,' + (Math.random() * 0.12) + ')'; n.fillRect(Math.random() * W, Math.random() * H, 2, 2); } };
    const zeilen = (t, max) => { c.font = font; const w = String(t).split(' '), l = []; let z = ''; for (const x of w) { const p = z ? z + ' ' + x : x; if (c.measureText(p).width > max && z) { l.push(z); z = x; } else z = p; } if (z) l.push(z); return l; };
    const schreib = (t, y0, anteil = 1) => { n.globalCompositeOperation = 'destination-out'; n.font = font; n.textAlign = 'left'; n.fillStyle = '#000'; const l = zeilen(t, W - 60); let rest = Math.round(String(t).length * anteil); l.forEach((z, i) => { const s = z.slice(0, Math.max(0, rest)); rest -= z.length + 1; n.fillText(s, 30, y0 + i * 50); }); n.globalCompositeOperation = 'source-over'; };
    const malen = () => { draussen(); c.drawImage(nebel, 0, 0); };
    nebelVoll(); const alt = ersetze(def.alt || 'Gleich lachen alle.'); schreib(alt, 70); malen();
    // Wo steht das Wort? (für Wischen und Fortschritt)
    c.font = font; const altZ = zeilen(alt, W - 60), wort = String(def.wort || 'alle').toLowerCase();
    let box = null; altZ.forEach((z, i) => { const p = z.toLowerCase().indexOf(wort); if (p >= 0 && !box) { const x0 = 30 + c.measureText(z.slice(0, p)).width, x1 = x0 + c.measureText(z.slice(p, p + wort.length)).width; box = { x0, x1, y0: 70 + i * 50 - 36, y1: 70 + i * 50 + 10 }; } });
    box = box || { x0: 30, x1: W - 30, y0: 30, y1: 90 };
    const proben = []; for (let i = 0; i < 40; i++) proben.push([box.x0 + Math.random() * (box.x1 - box.x0), box.y0 + Math.random() * (box.y1 - box.y0)]);
    let gewischt = false, wischen = false, fertigW = false;
    const wisch = (x, y) => { n.globalCompositeOperation = 'source-over'; n.fillStyle = 'rgba(214,224,232,.9)'; n.beginPath(); n.arc(x, y, 24, 0, Math.PI * 2); n.fill(); malen();
      const d = n.getImageData(0, 0, W, H).data; let zu = 0; for (const [px, py] of proben) { if (d[(Math.round(py) * W + Math.round(px)) * 4 + 3] > 180) zu++; } if (zu / proben.length > 0.8) wortWeg(); };
    const pos = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; };
    cv.addEventListener('pointerdown', (e) => { if (fertigW) return; wischen = true; try { cv.setPointerCapture(e.pointerId); } catch (x) { /* Test-Klick */ } gewischt = true; wisch(...pos(e)); });
    cv.addEventListener('pointermove', (e) => { if (wischen && !fertigW) wisch(...pos(e)); });
    cv.addEventListener('pointerup', () => { wischen = false; });
    const wortWeg = async () => {
      if (fertigW) return; fertigW = true; ton('rascheln');
      n.globalCompositeOperation = 'source-over'; n.fillStyle = 'rgba(214,224,232,.92)'; n.fillRect(box.x0 - 6, box.y0 - 6, box.x1 - box.x0 + 12, box.y1 - box.y0 + 14); malen();
      if (def.bilder) {   // „Hinter dem Beschlag“: nur was du selbst angeschaut hast, wird klar – der Rest bleibt beschlagen
        const B = def.bilder.slice(0, 4), kf = 'bold 24px "Segoe Print", "Bradley Hand", "Comic Neue", cursive';
        info.textContent = 'Was du diese Woche selbst gesehen hast:'; knopf.innerHTML = ''; loesche();
        nebelVoll(); malen(); await warte(350);
        for (let i = 0; i < B.length; i++) {
          const y = 50 + i * 52; n.globalCompositeOperation = 'destination-out'; n.font = kf; n.textAlign = 'left'; n.fillStyle = '#000';
          n.fillText(B[i].da ? ersetze(B[i].t) : '·  ·  ·', 34, y); malen(); ton(B[i].da ? 'pling' : 'klick'); await warte(B[i].da ? 650 : 300);
        }
        const zu1 = B.filter((b) => !b.da).length;
        info.textContent = zu1 ? 'Beschlagen bleibt, was du nicht angeschaut hast (' + zu1 + ').' : 'Alles klar. Du hast hingeschaut.';
        knopf.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
        let zu = false; const fertig = () => { if (zu) return; zu = true; loesche(); ui.ebeneZu(); ok({ gewischt, gesehen: B.filter((b) => b.da).map((b) => b.id) }); };
        knopf.querySelector('[data-a="w"]').onclick = fertig; setTimeout(() => { if (!zu) taste(['KeyE', 'Enter'], fertig); }, 400);
        return;
      }
      info.textContent = 'Und jetzt? Was hast du wirklich gesehen?';
      const S = (def.saetze || []).slice(0, 3);
      knopf.innerHTML = S.map((s, i) => '<button type="button" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd><span>' + esc(ersetze(s)) + '</span></button>').join('');
      loesche(); taste(['Digit1', 'Digit2', 'Digit3', 'Numpad1', 'Numpad2', 'Numpad3'], (cd) => { const b = knopf.querySelector('[data-i="' + (+cd.slice(-1) - 1) + '"]'); if (b) b.click(); });
      knopf.querySelectorAll('[data-i]').forEach((b) => { b.onclick = async () => {
        const i = +b.dataset.i, satz = ersetze(S[i]); knopf.innerHTML = ''; loesche(); info.textContent = '';
        nebelVoll(); for (let a = 0; a <= 1.0001; a += 0.04) { nebelVoll(); schreib(satz, 70, a); malen(); await warte(45); }
        ton('pling');
        knopf.innerHTML = '<button type="button" class="sz-weiter" data-a="w">Weiter <kbd>E</kbd></button>';
        let zu = false; const fertig = () => { if (zu) return; zu = true; loesche(); ui.ebeneZu(); ok({ satz, i, gewischt }); };
        knopf.querySelector('[data-a="w"]').onclick = fertig; setTimeout(() => { if (!zu) taste(['KeyE', 'Enter'], fertig); }, 400);
      }; });
    };
    knopf.querySelector('[data-a="wisch"]').onclick = async () => { if (fertigW) return; for (let x = box.x0; x <= box.x1; x += 12) { wisch(x, (box.y0 + box.y1) / 2); await warte(16); } wortWeg(); };
  });
}

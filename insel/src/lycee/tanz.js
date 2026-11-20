// Tanzfläche im Jugendhaus (Auftrag 20.11.: „spaßiger“): Rhythmus-Spiel. Pfeile fallen im Takt, im richtigen Moment
// ← ↓ ↑ → (oder W A S D, oder die vier Knöpfe) drücken. Die eigene Spielfigur tanzt dabei (spiel.js). Eigener Beat über den
// Effekt-Kanal (die Musik im Raum wird so lange leiser). Kein Druck: Daneben kostet keine Punkte, nur die Combo.
const SPUREN = [['←', '#5ec8ff', ['ArrowLeft', 'KeyA']], ['↓', '#7CFC9A', ['ArrowDown', 'KeyS']], ['↑', '#ffd166', ['ArrowUp', 'KeyW']], ['→', '#ff7ac8', ['ArrowRight', 'KeyD']]];

// Noten für 16 Takte (4/4): erst Viertel, dann Achtel dazu; „leicht“ bleibt bei Vierteln. Reine Funktion (Tests).
export function tanzNoten({ takte = 16, leicht = false, zufall = Math.random } = {}) {
  const noten = []; let letzte = -1;
  for (let t = 0; t < takte; t++) for (let s = 0; s < 8; s++) {
    const viertel = s % 2 === 0;
    const p = viertel ? (t < 2 ? (s % 4 === 0 ? 1 : 0) : 1) : (leicht || t < 4 ? 0 : t < 12 ? 0.3 : 0.5);
    if (zufall() >= p) continue;
    let spur = Math.floor(zufall() * 4); if (spur === letzte && zufall() < 0.6) spur = (spur + 1 + Math.floor(zufall() * 3)) % 4;
    noten.push({ schlag: t * 4 + s / 2, spur }); letzte = spur;
  }
  return noten;
}

export function tanzSpiel({ audio = null, leicht = false, ton = () => {}, onSchlag = () => {}, onTreffer = () => {} } = {}) {
  return new Promise((ok) => {
    const BPM = leicht ? 96 : 108, SCHLAG = 60 / BPM, VOR = 2.0, TEMPO = 300, FENSTER = 0.15, PERFEKT = 0.07;
    const noten = tanzNoten({ leicht }), ende = (noten.length ? noten[noten.length - 1].schlag : 60) * SCHLAG + VOR + 1.6;
    const ctx = audio && audio.context, uhr0 = ctx ? ctx.currentTime : performance.now() / 1000;
    const jetzt = () => (ctx ? ctx.currentTime : performance.now() / 1000) - uhr0 - VOR;   // Sekunden seit Schlag 0
    // ---- Beat (Bassdrum, Snare, Hi-Hat) vorausplanen ----
    let beatBus = null;
    if (ctx) {
      beatBus = ctx.createGain(); beatBus.gain.value = 0.55; beatBus.connect((audio.buses && audio.buses.sfx) || ctx.destination);
      const rausch = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate); { const d = rausch.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
      const kick = (t) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12); g.gain.setValueAtTime(0.9, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18); o.connect(g).connect(beatBus); o.start(t); o.stop(t + 0.2); };
      const zisch = (t, laut, lang, hoch) => { const q = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(); q.buffer = rausch; f.type = 'highpass'; f.frequency.value = hoch; g.gain.setValueAtTime(laut, t); g.gain.exponentialRampToValueAtTime(0.001, t + lang); q.connect(f).connect(g).connect(beatBus); q.start(t); q.stop(t + lang + 0.02); };
      const t0 = uhr0 + VOR, n = Math.ceil((ende - VOR) / SCHLAG);
      for (let i = -4; i < n; i++) {   // vier Schläge Einzähler
        const t = t0 + i * SCHLAG; if (t < ctx.currentTime) continue;
        if (i < 0) { zisch(t, 0.35, 0.05, 6000); continue; }
        if (i % 2 === 0) kick(t); else { kick(t); zisch(t, 0.45, 0.14, 1800); }
        zisch(t + SCHLAG / 2, 0.18, 0.04, 7000);
      }
    }
    // ---- Oberfläche: unten ein Streifen, oben bleibt die tanzende Figur sichtbar ----
    const huelle = document.createElement('div');
    huelle.style.cssText = 'position:fixed;left:0;right:0;bottom:0;height:min(58vh,440px);z-index:60;display:flex;flex-direction:column;align-items:center;gap:6px;padding-bottom:max(10px,env(safe-area-inset-bottom));font-family:system-ui,sans-serif;touch-action:none;pointer-events:auto;background:linear-gradient(to top,rgba(20,24,32,.78),rgba(20,24,32,.35) 70%,rgba(20,24,32,0))';
    huelle.innerHTML = '<div style="display:flex;gap:14px;align-items:center;color:#fff;font-weight:700;font-size:17px;text-shadow:0 1px 3px rgba(0,0,0,.6)"><span data-k="info">💃 Tanzfläche</span><button type="button" data-k="weg" style="font:600 13px system-ui;padding:5px 12px;border-radius:999px;border:0;background:#fff;color:#2b3a55">Aufhören</button></div>' +
      '<canvas width="400" height="300" style="flex:1;min-height:0;max-width:94vw;aspect-ratio:4/3"></canvas><div data-k="knoepfe" style="display:flex;gap:10px"></div>';
    document.body.appendChild(huelle);
    const cv = huelle.querySelector('canvas'), g = cv.getContext('2d'), info = huelle.querySelector('[data-k="info"]');
    const W = 400, H = 300, ZIEL = H - 46, SB = W / 4;
    const kn = huelle.querySelector('[data-k="knoepfe"]');
    SPUREN.forEach(([pf, farbe], i) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = pf; b.style.cssText = 'width:64px;height:52px;border-radius:14px;border:0;font:700 26px system-ui;color:#2b3a55;background:' + farbe; b.addEventListener('pointerdown', (e) => { e.preventDefault(); druck(i); }); kn.appendChild(b); });
    let punkte = 0, combo = 0, best = 0, treffer = 0, perfekt = 0, fertig = false, rueck = null, letzterSchlag = -99;
    const blitz = [0, 0, 0, 0];
    function druck(spur) {
      if (fertig) return;
      blitz[spur] = 0.18;
      const t = jetzt(); let n = null, d = 1e9;
      for (const x of noten) { if (x.erledigt || x.spur !== spur) continue; const dd = Math.abs(x.schlag * SCHLAG - t); if (dd < d) { d = dd; n = x; } }
      if (!n || d > FENSTER) return;   // zu früh/zu spät: kein Abzug
      n.erledigt = d <= PERFEKT ? 'perfekt' : 'gut'; treffer++; combo++; best = Math.max(best, combo);
      if (n.erledigt === 'perfekt') perfekt++;
      punkte += (n.erledigt === 'perfekt' ? 100 : 50) + Math.min(combo, 30) * 2;
      rueck = { text: n.erledigt === 'perfekt' ? 'Perfekt!' : 'Gut!', farbe: n.erledigt === 'perfekt' ? '#ffd166' : '#7CFC9A', t: 0.5 };
      onTreffer(n.erledigt, combo);
      if (combo > 0 && combo % 20 === 0) ton('melodie2');
    }
    const taste = (e) => {
      if (e.code === 'Escape') { e.preventDefault(); e.stopPropagation(); schluss(true); return; }
      const i = SPUREN.findIndex((s) => s[2].includes(e.code)); if (i < 0) return;
      e.preventDefault(); e.stopPropagation(); if (!e.repeat) druck(i);
    };
    document.addEventListener('keydown', taste, true);
    huelle.querySelector('[data-k="weg"]').onclick = () => schluss(true);
    function aufraeumen() { document.removeEventListener('keydown', taste, true); if (beatBus) { try { beatBus.gain.setTargetAtTime(0, ctx.currentTime, 0.05); setTimeout(() => beatBus.disconnect(), 400); } catch (e) { /* schon weg */ } } }
    function schluss(abbruch) {
      if (fertig) return; fertig = true; aufraeumen();
      const quote = noten.length ? treffer / noten.length : 0, sterne = quote >= 0.9 ? 3 : quote >= 0.7 ? 2 : quote >= 0.4 ? 1 : 0;
      if (abbruch) { huelle.remove(); ok({ punkte, treffer, gesamt: noten.length, best, sterne: 0, abbruch: true }); return; }
      kn.remove(); cv.remove();
      const box = document.createElement('div'); box.style.cssText = 'margin-top:12px;background:#fff;color:#2b3a55;border-radius:18px;padding:16px 22px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.35);max-width:90vw';
      box.innerHTML = '<div style="font-size:28px">' + ('⭐'.repeat(sterne) || '🙂') + '</div><div style="font:700 20px system-ui;margin:4px 0">' + Math.round(quote * 100) + ' % getroffen · ' + punkte + ' Punkte</div><div style="font-size:14px">Längste Combo: ' + best + ' · Perfekt: ' + perfekt + '</div><button type="button" style="margin-top:12px;font:600 15px system-ui;padding:8px 20px;border-radius:999px;border:0;background:#2fb8a8;color:#fff">Fertig</button>';
      huelle.appendChild(box); info.textContent = '💃 Geschafft!';
      const fertigTaste = (e) => { if (['KeyE', 'Enter', 'Space', 'Escape'].includes(e.code)) { e.preventDefault(); e.stopPropagation(); zu(); } };
      const zu = () => { document.removeEventListener('keydown', fertigTaste, true); huelle.remove(); ok({ punkte, treffer, gesamt: noten.length, best, sterne }); };
      box.querySelector('button').onclick = zu; setTimeout(() => document.addEventListener('keydown', fertigTaste, true), 600);
    }
    let alt = performance.now();
    function bild(ms) {
      if (fertig) return;
      const dt = Math.min(0.05, (ms - alt) / 1000); alt = ms;
      const t = jetzt();
      const schlag = Math.floor(t / SCHLAG); if (schlag !== letzterSchlag && t >= 0) { letzterSchlag = schlag; onSchlag(schlag); }
      for (const n of noten) if (!n.erledigt && t - n.schlag * SCHLAG > FENSTER) { n.erledigt = 'weg'; combo = 0; rueck = { text: 'Daneben', farbe: '#e9ecef', t: 0.4 }; }
      // Zeichnen
      g.clearRect(0, 0, W, H);
      for (let i = 0; i < 4; i++) { g.fillStyle = i % 2 ? 'rgba(255,255,255,.07)' : 'rgba(255,255,255,.12)'; g.fillRect(i * SB + 3, 0, SB - 6, H); }
      const puls = t >= 0 ? 1 - ((t / SCHLAG) % 1) : 0;
      SPUREN.forEach(([pf, farbe], i) => {   // Zielpfeile unten
        blitz[i] = Math.max(0, blitz[i] - dt);
        const x = i * SB + SB / 2; g.globalAlpha = 0.55 + 0.45 * Math.max(puls * 0.6, blitz[i] / 0.18);
        g.strokeStyle = farbe; g.lineWidth = 4; g.beginPath(); g.arc(x, ZIEL, 26 + puls * 3, 0, Math.PI * 2); g.stroke();
        g.fillStyle = farbe; g.font = '700 30px system-ui'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(pf, x, ZIEL + 1); g.globalAlpha = 1;
      });
      for (const n of noten) {
        if (n.erledigt) continue;
        const y = ZIEL - (n.schlag * SCHLAG - t) * TEMPO; if (y < -30 || y > H + 30) continue;
        const [pf, farbe] = SPUREN[n.spur], x = n.spur * SB + SB / 2;
        g.fillStyle = farbe; g.beginPath(); g.arc(x, y, 22, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#2b3a55'; g.font = '700 26px system-ui'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(pf, x, y + 1);
      }
      if (t < 0) { g.fillStyle = '#fff'; g.font = '800 54px system-ui'; g.textAlign = 'center'; g.fillText(String(Math.ceil(-t / SCHLAG)), W / 2, H / 2 - 30); }
      if (rueck && rueck.t > 0) { rueck.t -= dt; g.globalAlpha = Math.min(1, rueck.t * 3); g.fillStyle = rueck.farbe; g.font = '800 30px system-ui'; g.textAlign = 'center'; g.fillText(rueck.text, W / 2, H / 2 - 30); g.globalAlpha = 1; }
      info.textContent = '💃 ' + punkte + ' Punkte' + (combo >= 5 ? ' · Combo ' + combo + ' 🔥' : '');
      if (t > ende - VOR) { schluss(false); return; }
      requestAnimationFrame(bild);
    }
    requestAnimationFrame(bild);
  });
}

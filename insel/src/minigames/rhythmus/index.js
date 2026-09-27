// Vorlage rhythmus (WP36): Halten und Loslassen im Takt (Drachenleine, Tandem-Takt), Tippen auf den Schlag, laut/leise
// im Wechsel (Brandungsorgel). Böen kommen von rechts auf die Leine zu; im Zielfenster halten (Knopf, Leertaste, E, Tippen
// auf die Fläche), beim Abflauen loslassen. Jeder Treffer wirkt (params.onHit), jeder Fehlschlag auch (params.onMiss).
// Sichtbar ohne Ton: Böen als Bänder, Trefferleiste oben, Seilspannung; hörbar: Tick je Böe, Klang je Treffer.
//   params (je Modus): { window (s), beats, irregular, interval, hold, input:'hold'|'tap', pattern:'einzeln'|'wechsel', partner, onHit, onMiss }
//   Ergebnis: { hits (Quote 0..1), hitCount, beats, fails: 0 }
import { makeBeats, createRhythm, LEAD_IN } from './logic.js';
import { createCanvas, roundRect, circle } from '../shell/canvas.js';
import { esc } from '../../ui/overlay.js';

const PX_PER_SEC = 150;

export default {
  id: 'rhythmus', world: false, hint: 'Halten, wenn das Band die Mitte trifft. Loslassen, wenn es geht.',
  create(ctx) {
    const { def, params, mount, audio, events, icon, game } = ctx;
    const input = params.input || 'hold';
    const beats = makeBeats({ beats: params.beats || 8, interval: (params.interval || 1.6) * ctx.timing, hold: params.hold || 0.7, irregular: !!params.irregular, seed: ctx.rng.int ? ctx.rng.int(1, 99999) : 7, pattern: params.pattern || 'einzeln' });
    const R = createRhythm({ beats, window: (params.window || 0.22) * ctx.timing, input });
    const partner = params.partner || null;
    const partnerDef = partner && game.content ? game.content.get('npcs', partner) : null;
    const partnerName = partner && game.npcs && game.npcs.nameOf ? game.npcs.nameOf(partner) : (partnerDef && partnerDef.name) || '';
    const music = game.music || null;
    let cv = null, t0 = 0, now = 0, done = false, holdBtn = null, fx = [], feedback = null, lastTick = -1, offs = [], prog = null;
    const label = input === 'tap' ? 'Tippen' : params.pattern === 'wechsel' ? 'Laut' : 'Halten';

    function press() { if (done) return; R.press(now); if (holdBtn) holdBtn.classList.add('is-down'); if (music && music.orgel && params.pattern === 'wechsel' && music.orgel.active) music.orgel.setLevel(1); if (audio && input === 'tap') audio.play('click'); }
    function release() { if (done) return; R.release(now); if (holdBtn) holdBtn.classList.remove('is-down'); if (music && music.orgel && params.pattern === 'wechsel' && music.orgel.active) music.orgel.setLevel(0.2); }
    async function judged(list) {
      for (const j of list) {
        const el = prog && prog.children[j.i];
        if (el) el.className = 'is-' + j.result;
        feedback = { t: now, text: j.result === 'hit' ? 'Gut!' : j.result === 'fast' ? 'Fast.' : 'Weg.', kind: j.result };
        fx.push({ t: now, kind: j.result });
        if (audio) audio.play(j.result === 'hit' ? 'tile' : j.result === 'fast' ? 'bubble' : 'error');
        events.emit('rhythmus:beat', { id: ctx.id, i: j.i, result: j.result });
        if (j.result !== 'miss' && params.onHit) await ctx.applyEffects(params.onHit);
        if (j.result === 'miss' && params.onMiss) await ctx.applyEffects(params.onMiss);
      }
    }
    function finish() {
      if (done) return; done = true;
      if (cv) cv.stop();
      if (music && music.orgel && params.pattern === 'wechsel' && music.orgel.active) music.orgel.stop();
      const hitCount = R.results.filter((r) => r === 'hit').length + R.results.filter((r) => r === 'fast').length * 0.5;
      ctx.finish({ hits: +R.ratio.toFixed(3), hitCount: Math.round(hitCount * 10) / 10, beats: beats.length, fails: 0, results: R.results.slice() });
    }

    // ---- Zeichnen ----
    function draw(c, w, h) {
      c.clearRect(0, 0, w, h);
      const cx = w * 0.42, ropeY = h * 0.56;
      // Himmel/Boden
      const grd = c.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, '#1a1040'); grd.addColorStop(1, '#2a1650');
      c.fillStyle = grd; c.fillRect(0, 0, w, h);
      // Zielfenster
      const winPx = R.window * PX_PER_SEC;
      c.fillStyle = 'rgba(45,226,201,0.14)'; c.fillRect(cx - winPx, 0, winPx * 2, h);
      c.fillStyle = 'rgba(45,226,201,0.9)'; c.fillRect(cx - 2, 8, 4, h - 16);
      // Böen (Bänder), von rechts nach links
      for (const b of beats) {
        const x0 = cx + (b.t - now) * PX_PER_SEC, x1 = x0 + b.len * PX_PER_SEC;
        if (x1 < -20 || x0 > w + 20) continue;
        const ph = R.phase(b, now), res = R.results[b.i];
        c.fillStyle = res === 'hit' ? 'rgba(143,209,139,0.9)' : res === 'fast' ? 'rgba(255,209,102,0.85)' : res === 'miss' ? 'rgba(255,107,107,0.6)' : ph === 'aktiv' ? 'rgba(255,255,255,0.95)' : 'rgba(143,163,255,0.85)';
        if (input === 'tap') { circle(c, x0, ropeY, 22); c.fill(); }
        else { roundRect(c, x0, ropeY - 34, Math.max(12, x1 - x0), 68, 14); c.fill(); }
        // Wind-Striche im Band
        if (input !== 'tap' && !res) { c.strokeStyle = 'rgba(29,19,48,0.35)'; c.lineWidth = 2; for (let k = 1; k < 4; k++) { const y = ropeY - 34 + k * 17; c.beginPath(); c.moveTo(x0 + 8, y); c.lineTo(x1 - 8, y - 4); c.stroke(); } }
      }
      // Leine: gespannt beim Halten, sonst durchhängend
      const held = R.held;
      c.strokeStyle = held ? '#ffd166' : 'rgba(255,255,255,0.7)'; c.lineWidth = held ? 6 : 4;
      c.beginPath(); c.moveTo(24, ropeY + 40);
      const sag = held ? 4 : 26 + Math.sin(now * 3) * 4;
      c.quadraticCurveTo(w * 0.5, ropeY + 40 + sag, w - 24, ropeY - 30 - (held ? 10 : 0));
      c.stroke();
      // Spielfigur links (Silhouette) und Drachen/Partner rechts
      c.fillStyle = held ? '#ffd166' : '#d5c9ff';
      circle(c, 40, ropeY + 8, 12); c.fill();
      roundRect(c, 30, ropeY + 18, 20, 34, 8); c.fill();
      c.fillStyle = '#8fa3ff';
      c.beginPath(); c.moveTo(w - 24, ropeY - 62); c.lineTo(w - 4, ropeY - 30); c.lineTo(w - 24, ropeY + 2); c.lineTo(w - 44, ropeY - 30); c.closePath(); c.fill();
      // Rückmeldung
      if (feedback && now - feedback.t < 0.8) {
        const k = 1 - (now - feedback.t) / 0.8;
        c.globalAlpha = k; c.fillStyle = feedback.kind === 'hit' ? '#8fd18b' : feedback.kind === 'fast' ? '#ffd166' : '#ff8c8c';
        c.font = '900 30px ' + getComputedStyle(document.body).fontFamily; c.textAlign = 'center';
        c.fillText(feedback.text, cx, ropeY - 62 - (1 - k) * 20);
        c.globalAlpha = 1;
      }
      for (const f of fx) { const a = now - f.t; if (a > 0.6) continue; c.globalAlpha = 1 - a / 0.6; c.strokeStyle = f.kind === 'miss' ? '#ff8c8c' : '#2de2c9'; c.lineWidth = 3; circle(c, cx, ropeY, 30 + a * 90); c.stroke(); c.globalAlpha = 1; }
      fx = fx.filter((f) => now - f.t <= 0.6);
      if (now < LEAD_IN - 0.2) { c.fillStyle = 'rgba(255,255,255,0.85)'; c.font = '900 22px ' + getComputedStyle(document.body).fontFamily; c.textAlign = 'center'; c.fillText('Die Böen kommen …', cx, 36); }
    }

    const inst = {
      R,
      start() {
        mount.innerHTML = `<div class="mg-topline"><span>${partnerName ? esc(partnerName) + ' · ' : ''}${esc(label)}</span><span class="mg-prog" data-prog>${beats.map(() => '<i></i>').join('')}</span></div>`;
        prog = mount.querySelector('[data-prog]');
        cv = createCanvas(mount, { height: 250 });
        const bar = document.createElement('div'); bar.className = 'mg-actions';
        bar.innerHTML = `<button class="mg-hold" type="button" data-mg-hold aria-label="${esc(label)}">${icon(input === 'tap' ? 'hand' : 'seil', { size: 30 })} ${esc(label)}</button>`;
        mount.appendChild(bar);
        holdBtn = bar.querySelector('[data-mg-hold]');
        const down = (e) => { e.preventDefault(); press(); };
        const up = (e) => { e.preventDefault(); release(); };
        holdBtn.addEventListener('pointerdown', down); holdBtn.addEventListener('pointerup', up); holdBtn.addEventListener('pointercancel', up); holdBtn.addEventListener('pointerleave', up);
        cv.onPointer((type) => { if (type === 'down') press(); else if (type === 'up') release(); });
        const key = (e) => { if (e.repeat) return; if (e.code === 'Space' || e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); if (e.type === 'keydown') press(); else release(); } };
        window.addEventListener('keydown', key, true); window.addEventListener('keyup', key, true);
        offs.push(() => { window.removeEventListener('keydown', key, true); window.removeEventListener('keyup', key, true); });
        offs.push(events.on('input:jump:down', press), events.on('input:jump:up', release), events.on('input:action:down', press), events.on('input:action:up', release));
        if (music && music.orgel && params.pattern === 'wechsel') { try { music.orgel.start(); music.orgel.setLevel(0.2); } catch (e) { /* ohne Ton */ } }
        if (ctx.hint) ctx.line ? ctx.glimm(ctx.hint) : null;
        t0 = 0;
        cv.loop((tt) => {
          if (!t0) t0 = tt;
          now = tt - t0;
          const b = beats.find((x) => x.i > lastTick && now >= x.t - 0.02);
          if (b) { lastTick = b.i; if (audio) audio.play('click'); if (music && music.orgel && params.pattern === 'wechsel' && music.orgel.active) music.orgel.pulse(0.6); }
          const j = R.tick(now);
          if (j.length) judged(j);
          draw(cv.ctx, cv.w, cv.h);
          if (R.done(now)) finish();
        });
      },
      stop() { done = true; if (cv) { cv.dispose(); cv = null; } for (const f of offs.splice(0)) f(); if (music && music.orgel && params.pattern === 'wechsel' && music.orgel.active) music.orgel.stop(); },
      // Tests: auto('gold'|'silber'|'bronze'|'fail') simuliert Halten auf einen Anteil der Böen
      async auto(level = 'gold') {
        const ratio = { gold: 1, silber: 0.85, bronze: 0.6, fail: 0.2 }[level] ?? 1;
        if (cv) cv.stop();
        beats.forEach((b, i) => { if (i < Math.round(ratio * beats.length)) { R.press(b.t); R.release(b.t + b.len); } });
        const end = beats[beats.length - 1].t + 10;
        now = end;
        await judged(R.tick(end));
        finish();
      },
      act(name) { if (name === 'press') press(); else if (name === 'release') release(); return true; },
    };
    return inst;
  },
};

// Vorlage oberflaeche „Unter der Oberfläche“ (Kostprobe B2, Gesprächs-Minispiel über choice.minigame): das echte
// Gefühl hinter Worten. Oben steht der Satz der Figur (über der Wasserlinie), darunter treibt eine Farbströmung.
// Tippen, wenn die Farbe im Blick-Kreis ist; nach genug Treffern ist sie klar – dann das feine Wort aus drei wählen.
// Fehltipp und falsches Wort kosten nur Sekunden. Zeit um → „Später.“ (die Hülle bietet Nochmal / Kurzfassung).
//   params (je Modus überschreibbar): { partner, satz, farbe, need, window, period, duration, frage, words:[{ t, ok? }], streams:1 }
//   Ergebnis: { score, hits, precision, caught, misses, wrong, complete, fails, text }
//   Tests: auto('gold'|'silber'|'bronze'|'fail') · act('tap') · act('pick', i) · inst.O (Logik) · inst.now
import { createOberflaeche, nextWindow } from './logic.js';
import { createCanvas, roundRect, circle } from '../shell/canvas.js';
import { esc } from '../../ui/overlay.js';

export default {
  id: 'oberflaeche', world: false, gespraech: true, hint: 'Tipp, wenn die Farbe im Kreis ist.',
  create(ctx) {
    const { params, mount, audio, events, icon, game, textOf } = ctx;
    const words = (params.words || []).map((w) => (typeof w === 'string' ? { t: w } : w));
    const win = (params.window ?? 0.11) * ctx.timing;
    const O = createOberflaeche({ need: params.need ?? 3, window: win, period: (params.period ?? 2.4) * Math.sqrt(ctx.timing), duration: (params.duration ?? 18) * ctx.timing, words, phase0: -Math.PI / 2 });
    const partner = params.partner || null;
    const name = partner && game.npcs && game.npcs.nameOf ? game.npcs.nameOf(partner) : (partner || '');
    const farbe = params.farbe || '#6f8cff';
    let cv = null, now = 0, done = false, prog = null, tapBtn = null, timeEl = null, wordsEl = null, offs = [];
    let fx = [];   // { t, kind }

    function tap() {
      if (done || O.phase !== 'tippen') return;
      const r = O.tap(now);
      if (!r || r === 'warte') return;
      fx.push({ t: now, kind: r });
      if (r === 'treffer') {
        if (audio) audio.play('tile');
        const el = prog && prog.children[O.caught - 1]; if (el) el.className = 'is-hit';
        events.emit('oberflaeche:treffer', { id: ctx.id, caught: O.caught });
        if (O.phase === 'wort') showWords();
      } else if (audio) audio.play('click');
    }
    function showWords() {
      if (audio) audio.play('chime');
      if (tapBtn) tapBtn.closest('.mg-actions').style.display = 'none';
      wordsEl.hidden = false;
      wordsEl.innerHTML = `<p class="mg-guideline">${esc(textOf(params.frage) || 'Was fühlt er echt?')}</p><div class="mg-tiles">${words.map((w, i) => `<button class="mg-tile" type="button" data-word="${i}"><span class="mg-tile-icon" style="--tile:${esc(w.farbe || 'rgba(255,255,255,.14)')}">${icon('tropfen', { size: 22 })}</span><span>${esc(textOf(w.t))}</span></button>`).join('')}</div>`;
      wordsEl.querySelectorAll('[data-word]').forEach((b) => b.addEventListener('click', () => pick(Number(b.dataset.word))));
    }
    function pick(i) {
      if (done) return;
      const r = O.pick(i);
      if (!r) return;
      const b = wordsEl && wordsEl.querySelector(`[data-word="${i}"]`);
      if (r === 'richtig') { if (b) b.classList.add('is-on'); if (audio) audio.play('pickup'); setTimeout(finish, 450); }
      else { if (b) { b.classList.add('is-shake', 'is-leer'); b.disabled = true; } if (audio) audio.play('bubble'); }
      events.emit('oberflaeche:wort', { id: ctx.id, i, result: r });
    }
    function finish() {
      if (done) return; done = true;
      if (cv) cv.stop();
      const r = O.result();
      const right = words.find((w) => w.ok);
      ctx.finish({ ...r, text: r.complete && right ? `Unter der Oberfläche: ${textOf(right.t)}` : '' });
    }

    // ---- Zeichnen: Wasserlinie oben, Farbströmung darunter, Blick-Kreis in der Mitte ----
    function draw(c, w, h) {
      c.clearRect(0, 0, w, h);
      const top = 26;
      c.fillStyle = '#2a1d52'; c.fillRect(0, 0, w, top);
      const water = c.createLinearGradient(0, top, 0, h); water.addColorStop(0, '#1f5a7a'); water.addColorStop(1, '#0c1f3a');
      c.fillStyle = water; c.fillRect(0, top, w, h - top);
      // Wasserlinie (bewegt)
      c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 3; c.beginPath();
      for (let x = 0; x <= w; x += 12) { const y = top + Math.sin(x * 0.04 + now * 2) * 3; x === 0 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke();
      const cy = top + (h - top) * 0.5;
      const lensR = Math.max(12, win * w);
      // Farbströmung: weicher Fleck, wird mit jedem Treffer deutlicher; taucht nach einem Treffer kurz ab
      const x = O.pos(now) * w;
      const dive = O.diving(now) ? 1 : 0;
      const rev = O.reveal;
      const depth = dive ? 40 : 0;
      const r0 = 34 + rev * 16;
      const g = c.createRadialGradient(x, cy + depth, 2, x, cy + depth, r0 * 1.8);
      const a = dive ? 0.25 : 0.7 + rev * 0.3;
      g.addColorStop(0, hexA(farbe, a)); g.addColorStop(0.6, hexA(farbe, a * 0.5)); g.addColorStop(1, hexA(farbe, 0));
      c.fillStyle = g; c.fillRect(x - r0 * 2, cy + depth - r0 * 2, r0 * 4, r0 * 4);
      // Schweif der Strömung
      for (let k = 1; k < 6; k++) { const xs = O.pos(now - k * 0.06) * w; c.fillStyle = hexA(farbe, (dive ? 0.08 : 0.18) * (1 - k / 6)); circle(c, xs, cy + depth, r0 * (1 - k / 8)); c.fill(); }
      // Blick-Kreis: leuchtet, solange die Farbe drin ist
      const inside = O.inWindow(now) && O.phase === 'tippen';
      c.strokeStyle = inside ? '#2de2c9' : 'rgba(255,255,255,0.55)'; c.lineWidth = inside ? 6 : 3;
      const rx = lensR + 14, ry = Math.min(rx, (h - top) / 2 - 10);
      c.beginPath(); c.ellipse(w / 2, cy, rx, ry, 0, 0, Math.PI * 2); c.stroke();
      // Rückmeldung
      for (const f of fx) { const t = now - f.t; if (t > 0.6) continue; c.globalAlpha = 1 - t / 0.6; c.strokeStyle = f.kind === 'treffer' ? '#2de2c9' : 'rgba(255,255,255,0.6)'; c.lineWidth = 4; c.beginPath(); c.ellipse(w / 2, cy, rx + t * 60, ry + t * 30, 0, 0, Math.PI * 2); c.stroke(); c.globalAlpha = 1; }
      fx = fx.filter((f) => now - f.t <= 0.6);
      // Ist die Farbe klar, steigt sie zur Oberfläche und färbt die Wasserlinie
      if (O.phase !== 'tippen') { c.fillStyle = hexA(farbe, 0.45); roundRect(c, 0, top - 4, w, 10, 5); c.fill(); }
    }
    function hexA(hex, a) {
      const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
      const n = m ? parseInt(m[1], 16) : 0x6f8cff;
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
    }

    const inst = {
      O,
      get now() { return now; },
      start() {
        mount.innerHTML = `<div class="mg-topline"><span>${name ? esc(name) + ' · ' : ''}Unter der Oberfläche</span><span class="mg-prog" data-prog>${Array.from({ length: O.need }, () => '<i></i>').join('')}</span></div>
          <div class="mg-timebar"><i data-time></i></div>
          <p class="mg-sentence" data-satz>${icon('sprechblase', { size: 22 })} ${esc(textOf(params.satz) || '…')}</p>`;
        prog = mount.querySelector('[data-prog]');
        timeEl = mount.querySelector('[data-time]');
        cv = createCanvas(mount, { height: 220 });
        const bar = document.createElement('div'); bar.className = 'mg-actions';
        bar.innerHTML = `<button class="mg-hold" type="button" data-mg-tap aria-label="Tippen">${icon('blick', { size: 30 })} Tippen</button>`;
        mount.appendChild(bar);
        wordsEl = document.createElement('div'); wordsEl.dataset.words = '1'; wordsEl.hidden = true; mount.appendChild(wordsEl);
        tapBtn = bar.querySelector('[data-mg-tap]');
        tapBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); tap(); });
        cv.onPointer((type) => { if (type === 'down') tap(); });
        const key = (e) => { if (e.repeat || e.type !== 'keydown') return; if (e.code === 'Space' || e.code === 'KeyE' || e.code === 'Enter') { if (O.phase !== 'tippen') return; e.preventDefault(); e.stopPropagation(); tap(); } };
        window.addEventListener('keydown', key, true);
        offs.push(() => window.removeEventListener('keydown', key, true));
        offs.push(events.on('input:jump:down', tap), events.on('input:action:down', tap));
        if (ctx.hint) ctx.glimm(ctx.hint);
        cv.loop((tt) => {
          now = tt;
          if (O.tick(now) === 'zeit') { finish(); return; }
          if (timeEl) timeEl.style.transform = `scaleX(${O.phase === 'tippen' ? (O.timeLeft(now) / ((params.duration ?? 18) * ctx.timing)).toFixed(3) : 1})`;
          draw(cv.ctx, cv.w, cv.h);
        });
      },
      stop() { done = true; if (cv) { cv.dispose(); cv = null; } for (const f of offs.splice(0)) f(); },
      // Tests: gold = jeder Tipp sitzt, Wort beim ersten Mal · silber = ein Fehltipp + ein falsches Wort · bronze = viele
      // Fehltipps + falsches Wort · fail = Zeit läuft ab
      async auto(level = 'gold') {
        if (cv) cv.stop();
        let t = now;
        if (level === 'fail') { O.tick(t); t += (params.duration ?? 18) * ctx.timing + 1; O.tick(t); now = t; finish(); return; }
        const missN = level === 'silber' ? 1 : level === 'bronze' ? 3 : 0;
        for (let k = 0; k < missN; k++) { t += 0.02; while (O.inWindow(t) || O.diving(t)) t += 0.05; now = t; tap(); t += 0.4; }
        while (O.phase === 'tippen') { const nt = nextWindow(O, t + 0.001); if (nt === null) break; t = nt + 0.005; now = t; tap(); }
        now = t;
        if (O.phase === 'wort') {
          if (level !== 'gold') { const wi = words.findIndex((w) => !w.ok); if (wi >= 0) pick(wi); }
          pick(words.findIndex((w) => w.ok));
        }
        finish();
      },
      act(name, i) { if (name === 'tap') tap(); else if (name === 'pick') pick(i); return { phase: O.phase, caught: O.caught }; },
    };
    return inst;
  },
};

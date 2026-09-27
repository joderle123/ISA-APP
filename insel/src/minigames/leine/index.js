// Vorlage leine „Leine halten“ (Kostprobe B1, Gesprächs-Minispiel über choice.minigame): Stille aushalten.
// Bild: ihr sitzt nebeneinander am Steg, zwischen euch eine Leine. Knopf halten = bleiben (die Leine strafft sich).
// Wendet sich die Figur ab → loslassen (nachgeben), rückt sie näher → wieder halten. Test-Sätze sind ein Zucken der
// Leine: weiter halten. Die Falle „Was sagen“ gibt nur „Egal.“ und die Welle beginnt neu (kein Abbruch).
// Kein Wartebildschirm: sichtbare Spannung mit Knarzen, die Kamera rückt nach jeder überstandenen Welle näher, die Figur
// macht kleine Gesten (schaut hoch, legt den Stift weg, rückt näher), jede Welle klingt als kleiner Erfolg.
//   params (je Figur, je Modus überschreibbar): { partner, farbe, waves, pause, ab, abLen, nahLen, tests:[Satz],
//     gesten:['schaut'|'stift'|'rueckt'], need, grace, cue (Knopf zeigt „Loslassen“) }
//   Ergebnis: { hits, score, survived, waves, gesagt, fails, text }
//   Tests: auto('gold'|'bronze'|'fail'|'sagen') · act('press'|'release'|'sagen') · inst.L (Logik) · inst.now
import { buildLeine, createLeine, simulate } from './logic.js';
import { createCanvas, roundRect, circle } from '../shell/canvas.js';
import { esc } from '../../ui/overlay.js';

// Leises Knarzen der Leine (prozedural, einmal registriert)
function ensureKnarz(audio) {
  if (!audio || !audio.register || (audio.has && audio.has('knarz'))) return;
  audio.register('knarz', (ctx, bus, _rev, o = {}) => {
    const t = ctx.currentTime, v = Math.min(1, o.volume ?? 0.6);
    const osc = ctx.createOscillator(); osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(48 + Math.random() * 14, t); osc.frequency.linearRampToValueAtTime(36 + Math.random() * 10, t + 0.28);
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 700 + Math.random() * 300; f.Q.value = 5;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.06 * v, t + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
    osc.connect(f); f.connect(g); g.connect(bus); osc.start(t); osc.stop(t + 0.36);
  });
}

export default {
  id: 'leine', world: false, gespraech: true, hint: 'Sie dreht sich weg? Kurz loslassen.',
  create(ctx) {
    const { params, mount, audio, events, icon, game } = ctx;
    const grace = (params.grace ?? 0.6) * ctx.timing;
    const plan = buildLeine(params);
    let L = createLeine(plan, { need: params.need ?? 0.65, grace });
    const partner = params.partner || null;
    const name = partner && game.npcs && game.npcs.nameOf ? game.npcs.nameOf(partner) : (partner || '');
    const farbe = params.farbe || '#8d8a99';
    const cue = !!params.cue;
    ensureKnarz(audio);
    let cv = null, now = 0, done = false, holdBtn = null, prog = null, offs = [];
    let zoom = 1, zoomTarget = 1, closer = 0, stiftWeg = false, lastKnarz = -9;
    let bubble = null;      // { text, t, until }
    let geste = null;       // { name, t }
    let fx = [];
    let segKind = 'still', segT = 0;

    function press() { if (done) return; L.press(now); if (holdBtn) holdBtn.classList.add('is-down'); }
    function release() { if (done) return; L.release(now); if (holdBtn) holdBtn.classList.remove('is-down'); }
    function sagen() {
      if (done) return;
      const r = L.sagen(now);
      if (!r.text) return;
      bubble = { text: r.text, t: now, until: now + 1.6 };
      if (audio) audio.play('bubble');
      if (ctx.speech && ctx.speech.settings && ctx.speech.settings.autoRead) ctx.speech.speak(r.text, { who: partner || 'erzaehler', auto: true });
      events.emit('leine:sagen', { id: ctx.id, text: r.text });
    }
    function onEvents(list) {
      for (const e of list) {
        if (e.type === 'seg') {
          segKind = e.kind; segT = now;
          if (e.kind === 'test' && e.text) {
            bubble = { text: e.text, t: now, until: now + 2.2 };
            if (audio) audio.play('knarz', { volume: 0.9 });
            if (ctx.speech && ctx.speech.settings && ctx.speech.settings.autoRead) ctx.speech.speak(e.text, { who: partner || 'erzaehler', auto: true });
          }
          if (holdBtn) holdBtn.classList.toggle('is-los', (cue || L.wave === 0) && e.want === 'locker');
          if (holdBtn) holdBtn.querySelector('[data-label]').textContent = (cue || L.wave === 0) && e.want === 'locker' ? 'Loslassen' : 'Halten';
        }
        if (e.type === 'welle') {
          const el = prog && prog.children[e.i];
          if (el) el.className = e.ok ? 'is-hit' : 'is-miss';
          events.emit('leine:welle', { id: ctx.id, i: e.i, ok: e.ok });
          if (e.ok) {
            zoomTarget = Math.min(1.4, zoomTarget + 0.13);
            geste = e.geste ? { name: e.geste, t: now } : null;
            if (e.geste === 'rueckt') closer += 16;
            if (e.geste === 'stift') stiftWeg = true;
            fx.push({ t: now });
            if (audio) audio.play('chime');
          } else if (audio) audio.play('bubble');
          segKind = 'pause';
        }
        if (e.type === 'fertig') finish();
      }
    }
    function finish() {
      if (done) return; done = true;
      if (cv) cv.stop();
      const r = L.result();
      ctx.finish({ ...r, text: `${r.survived} von ${r.waves} geschafft` });
    }

    // ---- Zeichnen (Weltkoordinaten: Stegkante y = 0, Mitte zwischen euch x = 0) ----
    function figure(c, x, { color, facing = 1, away = false, lookUp = false, lean = 0, stift = false, you = false }) {
      c.save(); c.translate(x + lean, 0);
      // Beine über der Kante
      c.fillStyle = you ? '#5b4a8a' : '#4b4a58';
      roundRect(c, -12, -6, 10, 36, 5); c.fill(); roundRect(c, 2, -6, 10, 36, 5); c.fill();
      // Körper (Kapuzenpulli)
      c.fillStyle = color;
      roundRect(c, -18, -50, 36, 50, 14); c.fill();
      // Kopf + Kapuze
      const hy = lookUp ? -70 : -64;
      c.fillStyle = you ? '#f2c79b' : '#d9b08c';
      circle(c, 0, hy, 14); c.fill();
      if (!you) { c.fillStyle = color; c.beginPath(); c.arc(away ? 4 : 0, hy - 2, 17, Math.PI * 0.95, Math.PI * 2.05); c.fill(); }
      // Blickrichtung: Augen nur, wenn zugewandt
      if (!away) { c.fillStyle = '#1d1330'; circle(c, facing * 5, hy + (lookUp ? -2 : 1), 2.2); c.fill(); circle(c, facing * 11, hy + (lookUp ? -2 : 1), 2); c.fill(); }
      else { c.fillStyle = color; circle(c, 6, hy, 12); c.fill(); }
      // Heft und Stift auf dem Schoß
      if (stift) { c.fillStyle = '#f4ecd8'; roundRect(c, -14 * facing - 8, -26, 20, 14, 3); c.fill(); c.strokeStyle = '#ffd166'; c.lineWidth = 3; c.beginPath(); c.moveTo(-6 * facing, -30); c.lineTo(-16 * facing, -16); c.stroke(); }
      c.restore();
    }
    function draw(c, w, h) {
      c.clearRect(0, 0, w, h);
      const sky = c.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#2a1d52'); sky.addColorStop(0.55, '#7a4a78'); sky.addColorStop(1, '#1b3550');
      c.fillStyle = sky; c.fillRect(0, 0, w, h);
      zoom += (zoomTarget - zoom) * 0.06;
      c.save();
      c.translate(w / 2, h * 0.74);
      c.scale(zoom * (w / 520), zoom * (w / 520));
      // Wasser mit leichten Wellen
      c.fillStyle = '#1e4a6a'; c.fillRect(-900, 8, 1800, 400);
      c.strokeStyle = 'rgba(255,255,255,0.12)'; c.lineWidth = 2;
      for (let k = 0; k < 5; k++) { c.beginPath(); for (let x = -420; x <= 420; x += 20) { const y = 40 + k * 26 + Math.sin(x * 0.03 + now * 1.4 + k) * 3; x === -420 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); }
      // Steg
      c.fillStyle = '#8a5a2b'; c.fillRect(-900, -2, 1800, 14);
      c.fillStyle = '#6b4320'; for (let x = -300; x <= 300; x += 90) c.fillRect(x, 12, 12, 60);
      // Figur-Lage aus dem aktuellen Stück
      const since = now - segT;
      const away = segKind === 'ab' || (bubble && bubble.text === 'Egal.' && now < bubble.until);
      const lean = away ? 22 : segKind === 'nah' ? -8 * Math.min(1, since * 3) : 0;
      const lookUp = geste && geste.name === 'schaut' && now - geste.t < 1.6;
      const px = -62, jx = 62 - closer;
      figure(c, px, { color: '#ffd166', facing: 1, you: true });
      figure(c, jx, { color: farbe, facing: -1, away, lookUp, lean, stift: !stiftWeg });
      if (stiftWeg) { c.strokeStyle = '#ffd166'; c.lineWidth = 3; c.beginPath(); c.moveTo(jx + 26, -3); c.lineTo(jx + 42, -3); c.stroke(); c.fillStyle = '#f4ecd8'; roundRect(c, jx + 30, -9, 18, 6, 2); c.fill(); }
      // Die Leine: Spannung sichtbar (straff/locker), Zucken bei Test-Sätzen, Zittern beim Festhalten gegen das Abwenden
      const T = L.tension, strain = L.strain;
      const twitch = segKind === 'test' && since < 0.6 ? Math.sin(now * 55) * 7 * (1 - since / 0.6) : 0;
      const shake = strain ? Math.sin(now * 70) * 2.5 * T : 0;
      const ax = px + 16, ay = -24, bx = jx + lean - 16, by = -24;
      const sag = (1 - T) * 46 + 4;
      c.strokeStyle = strain && T > 0.8 ? '#ff8c6b' : L.held ? '#ffd166' : 'rgba(255,255,255,0.8)';
      c.lineWidth = L.held ? 5 : 3.5;
      c.beginPath(); c.moveTo(ax, ay); c.quadraticCurveTo((ax + bx) / 2, ay + sag + twitch + shake, bx, by); c.stroke();
      // Erfolg je Welle: Ringe an der Leine
      for (const f of fx) { const a = now - f.t; if (a > 0.9) continue; c.globalAlpha = 1 - a / 0.9; c.strokeStyle = '#2de2c9'; c.lineWidth = 4; circle(c, (ax + bx) / 2, ay + sag * 0.5, 16 + a * 70); c.stroke(); c.globalAlpha = 1; }
      fx = fx.filter((f) => now - f.t <= 0.9);
      c.restore();
      // Sprechblase der Figur (Bildschirm-Koordinaten, gut lesbar)
      if (bubble && now < bubble.until) {
        const font = '800 22px ' + getComputedStyle(document.body).fontFamily;
        c.font = font; const tw = c.measureText(bubble.text).width;
        const bw = tw + 36, bh = 48, bx0 = Math.min(w - bw - 12, Math.max(12, w * 0.62 - bw / 2)), by0 = 14;
        c.fillStyle = 'rgba(255,255,255,0.95)'; roundRect(c, bx0, by0, bw, bh, 18); c.fill();
        c.beginPath(); c.moveTo(bx0 + bw * 0.5 - 8, by0 + bh); c.lineTo(bx0 + bw * 0.5 + 6, by0 + bh + 14); c.lineTo(bx0 + bw * 0.5 + 10, by0 + bh); c.fill();
        c.fillStyle = '#1d1330'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(bubble.text, bx0 + 18, by0 + bh / 2 + 1);
      }
      if (now < plan.waves[0].t0 - 0.2 && !(bubble && now < bubble.until)) { c.fillStyle = 'rgba(255,255,255,0.9)'; c.font = '900 22px ' + getComputedStyle(document.body).fontFamily; c.textAlign = 'center'; c.fillText('Halten = bleiben', w / 2, 34); }
    }

    const inst = {
      get L() { return L; },
      get now() { return now; },
      plan,
      start() {
        mount.innerHTML = `<div class="mg-topline"><span>${name ? esc(name) + ' · ' : ''}Leine halten</span><span class="mg-prog" data-prog>${plan.waves.map(() => '<i></i>').join('')}</span></div>`;
        prog = mount.querySelector('[data-prog]');
        cv = createCanvas(mount, { height: 300 });
        const bar = document.createElement('div'); bar.className = 'mg-actions';
        bar.innerHTML = `<button class="mg-hold" type="button" data-mg-hold aria-label="Halten">${icon('seil', { size: 30 })} <span data-label>Halten</span></button>
          <button class="mg-chip" type="button" data-mg-sagen>${icon('sprechblase', { size: 22 })}<span>Was sagen</span></button>`;
        mount.appendChild(bar);
        holdBtn = bar.querySelector('[data-mg-hold]');
        const down = (e) => { e.preventDefault(); press(); };
        const up = (e) => { e.preventDefault(); release(); };
        holdBtn.addEventListener('pointerdown', down); holdBtn.addEventListener('pointerup', up); holdBtn.addEventListener('pointercancel', up); holdBtn.addEventListener('pointerleave', up);
        bar.querySelector('[data-mg-sagen]').addEventListener('click', () => sagen());
        cv.onPointer((type) => { if (type === 'down') press(); else if (type === 'up') release(); });
        const key = (e) => { if (e.repeat) return; if (e.code === 'Space' || e.code === 'KeyE' || e.code === 'Enter') { e.preventDefault(); e.stopPropagation(); if (e.type === 'keydown') press(); else release(); } };
        window.addEventListener('keydown', key, true); window.addEventListener('keyup', key, true);
        offs.push(() => { window.removeEventListener('keydown', key, true); window.removeEventListener('keyup', key, true); });
        offs.push(events.on('input:jump:down', press), events.on('input:jump:up', release), events.on('input:action:down', press), events.on('input:action:up', release));
        if (ctx.hint) ctx.glimm(ctx.hint);
        cv.loop((tt) => {
          now = tt;
          onEvents(L.tick(now));
          if (done) return;
          if (L.strain && L.tension > 0.72 && now - lastKnarz > 0.45) { lastKnarz = now; if (audio) audio.play('knarz'); }
          draw(cv.ctx, cv.w, cv.h);
        });
      },
      stop() { done = true; if (cv) { cv.dispose(); cv = null; } for (const f of offs.splice(0)) f(); },
      // Tests: ganzer Lauf simuliert (gold = alles richtig, bronze = eine Welle falsch, fail = alle falsch, sagen = einmal „Was sagen“)
      async auto(level = 'gold') {
        if (cv) cv.stop();
        L = createLeine(plan, { need: params.need ?? 0.65, grace });
        const wrongWaves = level === 'fail' ? plan.waves.map((w) => w.i) : level === 'bronze' ? [plan.waves.length - 1] : [];
        const r = simulate(L, plan, { wrongWaves, sagenIn: level === 'sagen' ? 0 : -1 });
        now = r.t;
        finish();
      },
      act(name) { if (name === 'press') press(); else if (name === 'release') release(); else if (name === 'sagen') { sagen(); return bubble ? bubble.text : null; } return true; },
    };
    return inst;
  },
};


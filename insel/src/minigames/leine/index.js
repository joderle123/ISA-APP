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
    // Stil wie die 3D-Insel: Abendlicht von vorn, ihr sitzt mit dem Rücken zur Kamera am Stegende (keine Kindergesichter),
    // Farben aus dem echten Look (Spielfigur = eigener Avatar mit Rucksack, Partner = Figur-Look), Name klein davor.
    const DEF_YOU = { skin: '#f0c09a', hair: '#4a2e1f', hairStyle: 'kurz', top: '#ff5d73', bottoms: '#2f4a7a', accessory: 'rucksack', accessoryColor: '#ffd166' };
    let youLook = DEF_YOU, npcLook = { skin: '#d9b08c', hair: '#6b4a2f', hairStyle: 'lang', top: farbe, bottoms: '#2b3350' };
    try { if (game.avatar && game.avatar.look) youLook = { ...DEF_YOU, ...game.avatar.look() }; } catch (_) { /* Standard-Look */ }
    try { const d = partner && game.content && game.content.get('npcs', partner); if (d && d.look) npcLook = { ...npcLook, ...d.look, top: params.farbe || d.look.top }; } catch (_) { /* Standard-Look */ }
    // Gegenlicht: Farben leicht abdunkeln und Richtung Abendviolett ziehen
    const shade = (hex, k = 0.72) => { const n = parseInt(String(hex).replace('#', '').padEnd(6, '0').slice(0, 6), 16) || 0; const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; return `rgb(${Math.round(r * k + 40 * (1 - k))},${Math.round(g * k + 22 * (1 - k))},${Math.round(b * k + 60 * (1 - k))})`; };
    const RIM = 'rgba(255,190,120,0.85)';
    function figure(c, x, { look, away = false, lookUp = false, lean = 0, toward = 0, stift = false, you = false, label = '' }) {
      c.save(); c.translate(x + lean, 0);
      const top = shade(look.top || '#888'), hair = shade(look.hair || '#333', 0.6), skin = shade(look.skin || '#d9b08c', 0.62);
      // Sitzfläche (Hose auf dem Steg)
      c.fillStyle = shade(look.bottoms || '#2b3350', 0.6); roundRect(c, -22, -8, 44, 12, 6); c.fill();
      // Rücken im Kapuzenpulli: runde Schultern, nach unten etwas breiter
      c.fillStyle = top;
      c.beginPath(); c.moveTo(-24, -2); c.quadraticCurveTo(-26, -40, -17, -54); c.quadraticCurveTo(0, -62, 17, -54); c.quadraticCurveTo(26, -40, 24, -2); c.closePath(); c.fill();
      // Gegenlicht-Kante an den Schultern
      c.strokeStyle = RIM; c.lineWidth = 2; c.beginPath(); c.moveTo(-23, -30); c.quadraticCurveTo(-22, -50, -12, -57); c.moveTo(12, -57); c.quadraticCurveTo(22, -50, 23, -30); c.stroke();
      // Kapuze hängt im Nacken (oder ist auf)
      const hood = look.head === 'kapuze';
      if (!hood) { c.fillStyle = shade(look.top || '#888', 0.6); roundRect(c, -12, -58, 24, 12, 6); c.fill(); }
      // Rucksack der Spielfigur
      if (you && look.accessory === 'rucksack') { c.fillStyle = shade(look.accessoryColor || '#ffd166', 0.8); roundRect(c, -13, -44, 26, 30, 7); c.fill(); c.fillStyle = 'rgba(0,0,0,0.18)'; roundRect(c, -9, -30, 18, 10, 4); c.fill(); }
      // Kopf von hinten: Haar deckt fast alles, beim Abwenden/Zuwenden schaut ein Stück Wange hervor
      const tilt = away ? 7 : toward ? -5 * toward : 0;
      const hy = lookUp ? -76 : -70;
      c.save(); c.translate(tilt, 0);
      c.fillStyle = skin; circle(c, -13, hy + 2, 4); c.fill(); circle(c, 13, hy + 2, 4); c.fill();   // Ohren
      if (away || toward) { c.fillStyle = skin; circle(c, away ? 7 : -7 * toward, hy + 3, 12); c.fill(); }
      c.fillStyle = hood ? top : hair; circle(c, 0, hy, hood ? 16 : 14); c.fill();
      if (!hood && look.hairStyle === 'lang') { roundRect(c, -14, hy, 28, 26, 10); c.fill(); }
      if (!hood && look.hairStyle === 'dutt') { circle(c, 0, hy - 14, 6); c.fill(); }
      c.strokeStyle = RIM; c.lineWidth = 2; c.beginPath(); c.arc(0, hy, hood ? 16 : 14, Math.PI * 1.15, Math.PI * 1.85); c.stroke();
      c.restore();
      // Heft und Stift neben der Hüfte
      if (stift) { c.fillStyle = '#e8dcc0'; roundRect(c, 20, -14, 18, 12, 2); c.fill(); c.strokeStyle = '#ffd166'; c.lineWidth = 3; c.beginPath(); c.moveTo(26, -18); c.lineTo(36, -8); c.stroke(); }
      // Name klein vor der Figur auf dem Steg (wer ist wer, ohne Kopfzeile lesen zu müssen)
      if (label) {
        c.font = '800 13px ' + FONT; const tw = c.measureText(label).width;
        c.fillStyle = you ? 'rgba(255,209,102,0.95)' : 'rgba(255,255,255,0.85)'; roundRect(c, -tw / 2 - 8, 14, tw + 16, 20, 10); c.fill();
        c.fillStyle = '#1d1330'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(label, 0, 24.5);
      }
      c.restore();
    }
    const FONT = getComputedStyle(document.body).fontFamily;
    // Ferne Schären-Silhouetten (fest, damit nichts flackert)
    const RIDGE = [[-420, 0], [-360, -18], [-300, -8], [-250, -30], [-190, -12], [-150, -4], [150, -6], [200, -22], [260, -40], [300, -26], [360, -14], [420, 0]];
    function draw(c, w, h) {
      c.clearRect(0, 0, w, h);
      // Abendhimmel mit tief stehender Sonne
      const sky = c.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#1f1845'); sky.addColorStop(0.46, '#6a3f6e'); sky.addColorStop(0.66, '#e08a5c'); sky.addColorStop(0.68, '#2b4a66'); sky.addColorStop(1, '#10263a');
      c.fillStyle = sky; c.fillRect(0, 0, w, h);
      zoom += (zoomTarget - zoom) * 0.06;
      const s = zoom * (w / 520);
      c.save();
      c.translate(w / 2, h * 0.68);
      c.scale(s, s);
      // Sonne am Horizont + Glanzbahn auf dem Wasser
      const sun = c.createRadialGradient(0, -6, 2, 0, -6, 90); sun.addColorStop(0, 'rgba(255,214,150,0.95)'); sun.addColorStop(0.25, 'rgba(255,170,110,0.55)'); sun.addColorStop(1, 'rgba(255,140,90,0)');
      c.fillStyle = sun; c.fillRect(-200, -120, 400, 140);
      c.fillStyle = 'rgba(255,220,170,0.95)'; c.beginPath(); c.arc(0, 0, 18, Math.PI, 0); c.fill();
      // Ferne Schären
      c.fillStyle = '#3a2d52'; c.beginPath(); c.moveTo(RIDGE[0][0], 0); for (const [x, y] of RIDGE) c.lineTo(x, y); c.lineTo(420, 0); c.closePath(); c.fill();
      // Wasser
      c.fillStyle = '#1c3a55'; c.fillRect(-900, 0, 1800, 400);
      for (let k = 0; k < 9; k++) {
        const y = 4 + k * k * 1.6, wdt = 14 + k * 9;
        c.fillStyle = `rgba(255,200,140,${0.5 - k * 0.045})`;
        const off = Math.sin(now * 1.3 + k * 1.7) * 6;
        c.fillRect(-wdt / 2 + off, y, wdt, 1.6 + k * 0.25);
      }
      c.strokeStyle = 'rgba(255,255,255,0.08)'; c.lineWidth = 1.5;
      for (let k = 0; k < 4; k++) { c.beginPath(); for (let x = -420; x <= 420; x += 20) { const y = 12 + k * 18 + Math.sin(x * 0.03 + now * 1.4 + k) * 2; x === -420 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); }
      // Steg im Vordergrund (Planken laufen auf die Kamera zu)
      c.fillStyle = '#3d2716'; c.beginPath(); c.moveTo(-190, 2); c.lineTo(190, 2); c.lineTo(420, 200); c.lineTo(-420, 200); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(0,0,0,0.35)'; c.lineWidth = 2;
      for (let i = -5; i <= 5; i++) { c.beginPath(); c.moveTo(i * 38, 2); c.lineTo(i * 84, 200); c.stroke(); }
      c.strokeStyle = 'rgba(255,190,120,0.35)'; c.beginPath(); c.moveTo(-190, 2.5); c.lineTo(190, 2.5); c.stroke();
      // Poller mit Laterne rechts vorn (warmes Licht, wie am echten Steg)
      c.fillStyle = '#2a1a0e'; roundRect(c, 196, -30, 16, 70, 4); c.fill();
      const lg = c.createRadialGradient(204, -40, 1, 204, -40, 34); lg.addColorStop(0, 'rgba(255,209,102,0.9)'); lg.addColorStop(1, 'rgba(255,209,102,0)');
      c.fillStyle = lg; c.fillRect(160, -80, 90, 80); c.fillStyle = '#ffd166'; roundRect(c, 198, -48, 12, 14, 3); c.fill();
      // Figur-Lage aus dem aktuellen Stück
      const since = now - segT;
      const away = segKind === 'ab' || (bubble && bubble.text === 'Egal.' && now < bubble.until);
      const lean = away ? 22 : segKind === 'nah' ? -8 * Math.min(1, since * 3) : 0;
      const lookUp = geste && geste.name === 'schaut' && now - geste.t < 1.6;
      const px = -62, jx = 62 - closer;
      figure(c, px, { look: youLook, you: true, label: 'Du' });
      figure(c, jx, { look: npcLook, away, lookUp, lean, toward: segKind === 'nah' ? 1 : 0, stift: !stiftWeg, label: name });
      if (stiftWeg) { c.strokeStyle = '#ffd166'; c.lineWidth = 3; c.beginPath(); c.moveTo(jx + 30, 6); c.lineTo(jx + 46, 6); c.stroke(); c.fillStyle = '#e8dcc0'; roundRect(c, jx + 34, 0, 18, 6, 2); c.fill(); }
      // Die Leine: Spannung sichtbar (straff/locker), Zucken bei Test-Sätzen, Zittern beim Festhalten gegen das Abwenden
      const T = L.tension, strain = L.strain;
      const twitch = segKind === 'test' && since < 0.6 ? Math.sin(now * 55) * 7 * (1 - since / 0.6) : 0;
      const shake = strain ? Math.sin(now * 70) * 2.5 * T : 0;
      const ax = px + 22, ay = -14, bx = jx + lean - 22, by = -14;
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
        const font = '800 22px ' + FONT;
        c.font = font; const tw = c.measureText(bubble.text).width;
        const bw = tw + 36, bh = 48, bx0 = Math.min(w - bw - 12, Math.max(12, w * 0.62 - bw / 2)), by0 = 14;
        c.fillStyle = 'rgba(255,255,255,0.95)'; roundRect(c, bx0, by0, bw, bh, 18); c.fill();
        c.beginPath(); c.moveTo(bx0 + bw * 0.5 - 8, by0 + bh); c.lineTo(bx0 + bw * 0.5 + 6, by0 + bh + 14); c.lineTo(bx0 + bw * 0.5 + 10, by0 + bh); c.fill();
        c.fillStyle = '#1d1330'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(bubble.text, bx0 + 18, by0 + bh / 2 + 1);
      }
      if (now < plan.waves[0].t0 - 0.2 && !(bubble && now < bubble.until)) { c.fillStyle = 'rgba(255,255,255,0.9)'; c.font = '900 22px ' + FONT; c.textAlign = 'center'; c.fillText('Halten = bleiben', w / 2, 34); }
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


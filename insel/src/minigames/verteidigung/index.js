// Vorlage verteidigung (WP38): Tower-Defense-lite auf einem 2D-Garten. Klammer-Geister ziehen auf die Beete zu; ein Tipp
// auf einen Geist ist dein „Stopp“ – er hält, weicht zurück und hakt später nach. Ein zweites Stopp löst ihn auf:
// Wiederholen hält. Jedes erreichte Beet verliert eine Blüte. Wellen und Tempo je Modus.
//   params: { waves, perWave, speed, stoppRadius } · Ergebnis: { score (Blüten übrig), stopps, waves, fails: 0 }
import { createDefense, PETALS } from './logic.js';
import { createCanvas, circle, roundRect } from '../shell/canvas.js';
import { esc } from '../../ui/overlay.js';

export default {
  id: 'verteidigung', world: false, hint: 'Tipp den Geist an: Stopp. Kommt er zurück, nochmal.',
  create(ctx) {
    const { params, mount, audio, icon, events } = ctx;
    const W = 100, H = 66;
    const D = createDefense({ w: W, h: H, waves: params.waves || 3, perWave: params.perWave || 4, speed: (params.speed || 6) / ctx.timing, rng: ctx.rng, stoppRadius: params.stoppRadius || 9 });
    let cv = null, done = false, shouts = [], t = 0, msg = null;
    const font = () => getComputedStyle(document.body).fontFamily;

    function draw(c, w, h) {
      const sx = w / W, sy = h / H;
      c.clearRect(0, 0, w, h);
      const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1f4a2c'); g.addColorStop(1, '#173b25');
      c.fillStyle = g; c.fillRect(0, 0, w, h);
      // Wege
      c.strokeStyle = 'rgba(255,255,255,0.08)'; c.lineWidth = 8 * sx; c.beginPath(); c.moveTo(w / 2, 0); c.lineTo(w / 2, h); c.moveTo(0, h / 2); c.lineTo(w, h / 2); c.stroke();
      // Beete mit Blüten
      for (const b of D.beds) {
        c.fillStyle = '#5a3a22'; roundRect(c, (b.x - 9) * sx, (b.y - 6) * sy, 18 * sx, 12 * sy, 6); c.fill();
        for (let i = 0; i < PETALS; i++) {
          const px = (b.x - 5 + i * 5) * sx, py = b.y * sy;
          if (i < b.petals) { c.fillStyle = ['#ff8ccf', '#ffd166', '#8fd18b'][i]; circle(c, px, py, 4.2 * sx); c.fill(); c.fillStyle = '#fff'; circle(c, px, py, 1.6 * sx); c.fill(); }
          else { c.strokeStyle = 'rgba(255,255,255,0.25)'; c.lineWidth = 1.5; circle(c, px, py, 3.2 * sx); c.stroke(); }
        }
      }
      // Geister
      for (const gh of D.ghosts) {
        if (gh.state === 'weg') continue;
        const x = gh.x * sx, y = gh.y * sy, r = 4.6 * sx;
        const stopped = gh.state === 'stopp';
        c.globalAlpha = stopped ? 0.55 : 0.85;
        c.fillStyle = gh.stopps ? '#b8a6ff' : '#d5c9ff';
        c.beginPath(); c.arc(x, y - r * 0.2, r, Math.PI, 0); c.lineTo(x + r, y + r * 0.9); c.lineTo(x + r * 0.5, y + r * 0.5); c.lineTo(x, y + r); c.lineTo(x - r * 0.5, y + r * 0.5); c.lineTo(x - r, y + r * 0.9); c.closePath(); c.fill();
        // Klammer-Hände
        c.strokeStyle = '#8f7bff'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(x - r, y); c.lineTo(x - r * 1.8, y + Math.sin(t * 6 + gh.id) * r * 0.4); c.moveTo(x + r, y); c.lineTo(x + r * 1.8, y + Math.cos(t * 6 + gh.id) * r * 0.4); c.stroke();
        c.fillStyle = '#2a1650'; circle(c, x - r * 0.35, y - r * 0.2, r * 0.18); c.fill(); circle(c, x + r * 0.35, y - r * 0.2, r * 0.18); c.fill();
        c.globalAlpha = 1;
        if (stopped) { c.fillStyle = '#ffd166'; c.font = `900 ${Math.round(14 * sx)}px ${font()}`; c.textAlign = 'center'; c.fillText('…?', x, y - r * 1.5); }
      }
      // Stopp-Rufe
      for (const s of shouts) { const a = t - s.t; if (a > 0.6) continue; c.globalAlpha = 1 - a / 0.6; c.strokeStyle = '#ffd166'; c.lineWidth = 3; circle(c, s.x * sx, s.y * sy, (4 + a * 30) * sx); c.stroke(); c.fillStyle = '#fff'; c.font = `900 ${Math.round(16 * sx)}px ${font()}`; c.textAlign = 'center'; c.fillText('Stopp!', s.x * sx, s.y * sy - 14 * sx); c.globalAlpha = 1; }
      shouts = shouts.filter((s) => t - s.t <= 0.6);
      if (msg && t - msg.t < 1.6) { c.fillStyle = 'rgba(24,14,44,0.75)'; roundRect(c, w / 2 - 120, 12, 240, 40, 14); c.fill(); c.fillStyle = '#ffd166'; c.font = `900 20px ${font()}`; c.textAlign = 'center'; c.fillText(msg.text, w / 2, 40); }
    }
    function topline() {
      const el = mount.querySelector('[data-top]');
      if (el) el.innerHTML = `<span>Welle ${Math.max(1, D.wave)} / ${D.waves}</span><span>Blüten ${D.petals}</span>`;
    }
    function finish() {
      if (done) return; done = true;
      if (cv) cv.stop();
      ctx.finish({ score: +D.score.toFixed(3), stopps: D.stopps, waves: D.waves, fails: 0, petals: D.petals });
    }
    return {
      D,
      start() {
        mount.innerHTML = `<div class="mg-topline" data-top></div>${ctx.hint ? `<p class="mg-hintline">${esc(ctx.hint)}</p>` : ''}`;
        cv = createCanvas(mount, { aspect: W / H });
        topline();
        cv.onPointer((type, x, y) => {
          if (type !== 'down' || done) return;
          const gx = x / (cv.w / W), gy = y / (cv.h / H);
          const r = D.stopp(gx, gy);
          shouts.push({ t, x: gx, y: gy });
          if (r) { if (audio) audio.play(r.event === 'weg' ? 'pickup' : 'tile'); msg = { t, text: r.event === 'weg' ? 'Er lässt los.' : 'Er stoppt. Erstmal.' }; events.emit('verteidigung:stopp', { id: ctx.id, event: r.event }); }
          else if (audio) audio.play('click');
        });
        cv.loop((_, dt) => {
          t += dt;
          for (const ev of D.update(dt)) {
            if (ev.type === 'klammer') { if (audio) audio.play('error'); msg = { t, text: 'Er klammert. Eine Blüte weg.' }; }
            if (ev.type === 'welle') { msg = { t, text: `Welle ${ev.wave}` }; if (audio) audio.play('whoosh', { duration: 0.8 }); }
            if (ev.type === 'zurueck') msg = { t, text: 'Er hakt nach.' };
            if (ev.type === 'ende') finish();
          }
          topline();
          draw(cv.ctx, cv.w, cv.h);
        });
      },
      stop() { done = true; if (cv) { cv.dispose(); cv = null; } },
      auto(level = 'gold') {
        if (cv) cv.stop();
        const keep = { gold: 1, silber: 0.8, bronze: 0.55, fail: 0.2 }[level] ?? 1;
        const total = D.beds.length * PETALS, lose = Math.round(total * (1 - keep));
        // simulierter Lauf: vom vollen Beet aus (was im echten Lauf schon gefressen wurde, zählt hier nicht)
        for (const b of D.beds) b.petals = PETALS;
        let k = 0; for (const b of D.beds) while (k < lose && b.petals > 0) { b.petals--; k++; }
        done = true;
        ctx.finish({ score: +(D.petals / total).toFixed(3), stopps: 0, waves: D.waves, fails: 0, petals: D.petals, auto: true });
      },
      act(name, x, y) { if (name === 'stopp') { const r = D.stopp(x, y); return r ? r.event : null; } if (name === 'tick') { D.update(x || 0.1); return true; } return false; },
    };
  },
};

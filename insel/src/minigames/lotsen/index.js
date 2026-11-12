// Vorlage lotsen (WP38): Befehle-Modus (Hafengrotte: Symbolbefehle an eine Figur mit Stopp-Recht auf einem dunklen
// Raster mit Laternen, Blickrichtung und Wasser; Drängeln lässt sie zurückweichen) und Folgen-Modus (folgen.js: dein
// Bild wird dunkel, Stimme im Stereo und sichtbare Lichtpunkte führen). Beide funktionieren ohne Ton.
//   params: { mode:'befehle'|'folgen', guide, map?:[…], lanternRadius, points?, count } · Ergebnis: { score, steps, draengeln, commands }
import { createGrotto, DEFAULT_MAP, DIRS, CMDS } from './grid.js';
import { createFolgen } from './folgen.js';
import { createCanvas, circle, roundRect } from '../shell/canvas.js';
import { esc } from '../../ui/overlay.js';

const CMD_DEF = { vor: ['pfeilhoch', 'Vor'], links: ['zurueck', 'Links'], rechts: ['weiter', 'Rechts'], warten: ['ruhe', 'Warten'], laterne: ['laterne', 'Laterne'] };
const SAY = { unsicher: 'Ich seh nichts. Warte kurz.', draengeln: 'Nicht drängeln. Ich geh zurück.', beruhigt: 'Okay. Ich geh.', laterne: 'Besser. Jetzt seh ich was.', wasser: 'Da ist Wasser.', wand: 'Da ist Fels.', ziel: 'Raus. Danke.', 'keine-laterne': 'Hier ist keine Laterne.' };

export default {
  id: 'lotsen', world: (def) => !!(def && def.params && def.params.mode === 'folgen'), hint: 'Stoppt sie, dann warte. Laternen machen Wege sicher.',
  create(ctx) {
    const { params, mount, audio, icon, game, events } = ctx;
    if (params.mode === 'folgen') return createFolgen(ctx);
    const guide = params.guide || 'jolie';
    const name = game.npcs && game.npcs.nameOf ? game.npcs.nameOf(guide) : guide;
    const G = createGrotto({ map: params.map || DEFAULT_MAP, lanternRadius: params.lanternRadius || 2 });
    let cv = null, done = false, t = 0, commands = 0, bubble = null, keyH = null, anim = { x: G.pos.x, y: G.pos.y };
    const font = () => getComputedStyle(document.body).fontFamily;
    const C = { wall: '#2a2140', floor: '#4a3f66', water: '#1c3f6e', fog: '#0b0716' };

    function draw(c, w, h) {
      const cs = Math.min(w / G.w, h / G.h), ox = (w - cs * G.w) / 2, oy = (h - cs * G.h) / 2;
      c.clearRect(0, 0, w, h);
      c.fillStyle = C.fog; c.fillRect(0, 0, w, h);
      for (let y = 0; y < G.h; y++) for (let x = 0; x < G.w; x++) {
        const vis = G.visible(x, y);
        if (!vis) continue;
        const ch = G.at(x, y);
        const px = ox + x * cs, py = oy + y * cs;
        c.fillStyle = ch === '#' ? C.wall : ch === '~' ? C.water : C.floor;
        roundRect(c, px + 1, py + 1, cs - 2, cs - 2, 6); c.fill();
        if (ch === '~') { c.strokeStyle = 'rgba(120,190,255,0.5)'; c.lineWidth = 2; c.beginPath(); for (let k = 0; k < 2; k++) { const yy = py + cs * (0.35 + k * 0.3); c.moveTo(px + cs * 0.15, yy); c.quadraticCurveTo(px + cs * 0.5, yy + Math.sin(t * 3 + x + k) * 4, px + cs * 0.85, yy); } c.stroke(); }
        if (ch === 'X') { c.fillStyle = 'rgba(255,209,102,0.35)'; roundRect(c, px + 4, py + 4, cs - 8, cs - 8, 8); c.fill(); c.strokeStyle = '#ffd166'; c.lineWidth = 3; c.stroke(); }
        if (!G.lit(x, y)) { c.fillStyle = 'rgba(0,0,0,0.35)'; roundRect(c, px + 1, py + 1, cs - 2, cs - 2, 6); c.fill(); }
      }
      // Laternen
      for (const l of G.lanterns) {
        if (!G.visible(l.x, l.y)) continue;
        const px = ox + (l.x + 0.5) * cs, py = oy + (l.y + 0.5) * cs;
        if (l.lit) { const g = c.createRadialGradient(px, py, 2, px, py, cs * 2.6); g.addColorStop(0, 'rgba(255,209,102,0.45)'); g.addColorStop(1, 'rgba(255,209,102,0)'); c.fillStyle = g; circle(c, px, py, cs * 2.6); c.fill(); }
        c.fillStyle = l.lit ? '#ffd166' : '#6b5a3a'; roundRect(c, px - cs * 0.14, py - cs * 0.3, cs * 0.28, cs * 0.5, 4); c.fill();
        c.fillStyle = '#3a2a1a'; c.fillRect(px - cs * 0.04, py + cs * 0.2, cs * 0.08, cs * 0.25);
      }
      // Figur (weich bewegt) mit Blickrichtung und Kapuze
      const p = G.pos;
      anim.x += (p.x - anim.x) * 0.25; anim.y += (p.y - anim.y) * 0.25;
      const fx = ox + (anim.x + 0.5) * cs, fy = oy + (anim.y + 0.5) * cs;
      const [dx, dy] = DIRS[G.dir];
      c.fillStyle = '#39d0c8'; circle(c, fx, fy, cs * 0.3); c.fill();
      c.fillStyle = '#f0c09a'; circle(c, fx, fy - cs * 0.04, cs * 0.16); c.fill();
      c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.moveTo(fx + dx * cs * 0.32, fy + dy * cs * 0.32); c.lineTo(fx + dx * cs * 0.5, fy + dy * cs * 0.5); c.stroke();
      if (G.unsure) { c.fillStyle = 'rgba(255,255,255,0.95)'; roundRect(c, fx - 22, fy - cs * 0.9 - 14, 44, 28, 10); c.fill(); c.fillStyle = '#1d1330'; c.font = `900 18px ${font()}`; c.textAlign = 'center'; c.fillText('…?', fx, fy - cs * 0.9 + 6); }
      if (bubble && t - bubble.t < 2.2) { c.fillStyle = 'rgba(24,14,44,0.85)'; const tw = c.measureText(bubble.text).width + 30; roundRect(c, w / 2 - tw / 2, 10, tw, 36, 12); c.fill(); c.fillStyle = '#2de2c9'; c.font = `900 17px ${font()}`; c.textAlign = 'center'; c.fillText(bubble.text, w / 2, 34); }
    }
    function say(key) { const text = SAY[key]; if (!text) return; bubble = { t, text }; const gl = mount.querySelector('[data-guideline]'); if (gl) gl.textContent = `${name}: ${text}`; }
    function cmd(k) {
      if (done || !CMDS.includes(k)) return null;
      commands++;
      const r = G.command(k);
      if (audio) audio.play(r.event === 'draengeln' || r.event === 'wasser' || r.event === 'wand' ? 'error' : r.event === 'unsicher' ? 'bubble' : r.event === 'laterne' ? 'chime' : 'click');
      say(r.event);
      events.emit('lotsen:command', { id: ctx.id, cmd: k, event: r.event, pos: r.pos });
      if (r.event === 'ziel') setTimeout(finish, 700);
      return r;
    }
    function finish() {
      if (done) return; done = true;
      if (cv) cv.stop();
      ctx.finish({ score: +G.score.toFixed(3), steps: G.steps, draengeln: G.draengeln, commands, optimal: G.optimal, fails: 0 });
    }
    return {
      G,
      start() {
        mount.innerHTML = `<div class="mg-topline"><span>${esc(name)} lotsen</span><span data-count>0 Befehle</span></div>`;
        cv = createCanvas(mount, { aspect: G.w / G.h });
        const bar = document.createElement('div'); bar.className = 'mg-cmds';
        bar.innerHTML = CMDS.map((k) => `<button class="mg-cmd${k === 'warten' ? ' is-stopp' : ''}" type="button" data-cmd="${k}" aria-label="${CMD_DEF[k][1]}">${icon(CMD_DEF[k][0], { size: 28 })}<span>${CMD_DEF[k][1]}</span></button>`).join('');
        mount.appendChild(bar);
        const gl = document.createElement('p'); gl.className = 'mg-guideline'; gl.dataset.guideline = '1'; gl.textContent = ctx.hint || `${name}: Sag mir, wo lang.`; mount.appendChild(gl);
        bar.querySelectorAll('[data-cmd]').forEach((b) => b.addEventListener('click', () => { cmd(b.dataset.cmd); const cnt = mount.querySelector('[data-count]'); if (cnt) cnt.textContent = `${commands} Befehle`; }));
        keyH = (e) => { const map = { ArrowUp: 'vor', KeyW: 'vor', ArrowLeft: 'links', KeyA: 'links', ArrowRight: 'rechts', KeyD: 'rechts', Space: 'warten', KeyE: 'laterne' }; const k = map[e.code]; if (!k) return; e.preventDefault(); e.stopPropagation(); if (!e.repeat) cmd(k); };
        window.addEventListener('keydown', keyH, true);
        cv.loop((_, dt) => { t += dt; draw(cv.ctx, cv.w, cv.h); });
      },
      stop() { done = true; if (cv) { cv.dispose(); cv = null; } if (keyH) window.removeEventListener('keydown', keyH, true); },
      // Tests: auto('gold') führt sie auf dem kürzesten Weg (mit Warten bei Stopp), auto('fail') drängelt dreimal
      auto(level = 'gold') {
        if (cv) cv.stop();
        if (level === 'fail') { for (let i = 0; i < 3; i++) { G.command('vor'); G.command('vor'); } }
        // BFS-Weg als Richtungsfolge
        const q = [{ x: G.start.x, y: G.start.y, path: [] }]; const seen = new Set([G.start.x + ',' + G.start.y]); let path = null;
        while (q.length && !path) { const c = q.shift(); if (G.exit && c.x === G.exit.x && c.y === G.exit.y) { path = c.path; break; } DIRS.forEach(([dx, dy], d) => { const nx = c.x + dx, ny = c.y + dy, k = nx + ',' + ny; if (!G.walkable(nx, ny) || seen.has(k)) return; seen.add(k); q.push({ x: nx, y: ny, path: c.path.concat(d) }); }); }
        let guard = 200;
        for (const d of path || []) {
          while (G.dir !== d && guard-- > 0) G.command(((d - G.dir + 4) % 4) === 1 ? 'rechts' : 'links');
          let r = G.command('vor');
          if (r.event === 'unsicher') { G.command('warten'); r = G.command('vor'); }
          if (r.event === 'ziel') break;
        }
        commands = G.steps + G.waits;
        done = true;
        ctx.finish({ score: +G.score.toFixed(3), steps: G.steps, draengeln: G.draengeln, commands, optimal: G.optimal, fails: 0, auto: true });
      },
      act(name, k) { if (name === 'cmd') return cmd(k); return false; },
    };
  },
};

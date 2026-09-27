// Lotsen · Folgen-Modus (WP38, Rollentausch): dein Bild wird dunkel, die Figur führt dich mit Stimme (Stereo) und
// sichtbaren Lichtpunkten. Der nächste Lichtpunkt leuchtet immer, der übernächste nur schwach – ohne Ton allein über
// die Lichter lösbar. Die Figur (WP34) geht voraus, wenn sie in der Welt steht.
//   params: { guide, points?: [Pos…], count, spacing } · Ergebnis: { score, seconds, points, fails: 0 }
import * as THREE from 'three';

const LINES = ['Hier lang.', 'Zu mir.', 'Links von dir.', 'Rechts. Langsam.', 'Ich bin hier.', 'Gleich da.', 'Noch ein Stück.'];
const _v = new THREE.Vector3();

export function createFolgen(ctx) {
  const { game, params, ui, audio, state } = ctx;
  const { player, camera, cameraRig, world, events } = game;
  const island = world.island;
  const guide = params.guide || 'jolie';
  const npc = game.npcs && game.npcs.get ? game.npcs.get(guide) : null;
  const spacing = params.spacing || 7;
  let points = (params.points || []).map((p) => ctx.resolvePos(p)).filter(Boolean);
  if (!points.length) {
    // Pfad aus der Spielerposition heraus: leichte Kurven, nur begehbar
    const n = params.count || 6;
    let x = player.position.x, z = player.position.z, yaw = player.yaw || 0;
    for (let i = 0; i < n; i++) {
      let placed = false;
      for (let k = 0; k < 6 && !placed; k++) {
        const turn = (ctx.rng.float ? ctx.rng.float(-0.7, 0.7) : 0) + (k ? (k % 2 ? 1 : -1) * k * 0.5 : 0);
        const nx = x + Math.sin(yaw + turn) * spacing, nz = z + Math.cos(yaw + turn) * spacing;
        const ok = (!island.isWalkable || island.isWalkable(nx, nz)) && Math.hypot(nx, nz) < 220 && island.getHeight(nx, nz) > island.waterLevel(nx, nz) - 0.2;
        if (ok) { x = nx; z = nz; yaw += turn; placed = true; }
      }
      if (!placed) break;
      points.push({ x, z });
    }
  }
  points = points.map((p) => ({ x: p.x, z: p.z, y: p.y !== undefined ? p.y : island.getHeight(p.x, p.z) }));
  let dark = null, lights = [], idx = 0, t = 0, phase = 'neu', stopped = false, hudT = 0, said = -1;

  function dom() {
    dark = document.createElement('div'); dark.className = 'mg-dark'; dark.dataset.mgDark = '1'; ui.root.appendChild(dark);
    for (let i = 0; i < 2; i++) { const l = document.createElement('div'); l.className = 'mg-light' + (i ? ' is-next' : ''); l.dataset.mgLight = String(i); l.style.display = 'none'; ui.root.appendChild(l); lights.push(l); }
    requestAnimationFrame(() => { if (dark) dark.classList.add('is-in'); });   // Spiel kann vor dem Frame schon zu sein
  }
  function project(p, el) {
    _v.set(p.x, p.y + 1.1, p.z).project(camera);
    const w = ui.root.clientWidth, h = ui.root.clientHeight;
    const behind = _v.z > 1;
    el.style.display = behind ? 'none' : '';
    el.style.left = ((_v.x * 0.5 + 0.5) * w).toFixed(0) + 'px';
    el.style.top = ((-_v.y * 0.5 + 0.5) * h).toFixed(0) + 'px';
  }
  // Stereo-Ruf: kurzer Ton, nach links oder rechts geschwenkt, je nachdem wo das Licht liegt
  function call(p) {
    if (!audio || !audio.context || !audio.buses) return;
    try {
      const ac = audio.context, bus = audio.buses.sfx;
      const dx = p.x - player.position.x, dz = p.z - player.position.z;
      const ang = Math.atan2(dx, dz) - (cameraRig.yaw + Math.PI);
      const pan = Math.max(-1, Math.min(1, Math.sin(ang)));
      const o = ac.createOscillator(), g = ac.createGain(), pn = ac.createStereoPanner ? ac.createStereoPanner() : null;
      o.type = 'triangle'; o.frequency.value = 520; o.frequency.setValueAtTime(520, ac.currentTime); o.frequency.exponentialRampToValueAtTime(700, ac.currentTime + 0.25);
      g.gain.value = 0.0001; g.gain.exponentialRampToValueAtTime(0.12, ac.currentTime + 0.05); g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.9);
      if (pn) { pn.pan.value = pan; o.connect(g).connect(pn).connect(bus); } else o.connect(g).connect(bus);
      o.start(); o.stop(ac.currentTime + 1);
    } catch (e) { /* ohne Ton */ }
  }
  function goto(i) {
    idx = i;
    const p = points[idx];
    if (!p) return;
    if (npc && npc.setOverride) npc.setOverride({ x: p.x, z: p.z, anim: 'idle', lookAt: { x: player.position.x, y: player.position.y + 1.5, z: player.position.z } });
    call(p);
    const line = LINES[idx % LINES.length];
    if (said !== idx) { said = idx; ui.say({ who: guide, text: line, anchor: npc && npc.group ? npc.group : null, wait: false, seconds: 1.8, lock: false }); }
    ctx.hudSet({ info: `Licht ${idx + 1}/${points.length}` });
  }
  return {
    points,
    async start() {
      dom();
      ctx.hudSet({ time: 0, info: `Licht 1/${points.length}`, ghost: '' });
      ctx.lock(true);
      await ctx.count(2);
      if (stopped) return;
      ctx.lock(false);
      phase = 'lauf'; t = 0;
      if (ctx.hint) ctx.glimm(ctx.hint);
      goto(0);
    },
    update(dt, real) {
      if (phase !== 'lauf' || stopped) return;
      t += dt;
      const p = points[idx];
      if (!p) return;
      project(p, lights[0]);
      const nx = points[idx + 1]; if (nx) project(nx, lights[1]); else lights[1].style.display = 'none';
      lights[0].style.setProperty('--s', (1 + Math.sin(t * 5) * 0.15).toFixed(2));
      const d = Math.hypot(player.position.x - p.x, player.position.z - p.z);
      if (d < 2.0) {
        if (audio) audio.play('chime');
        if (idx + 1 >= points.length) {
          phase = 'ziel';
          const score = Math.max(0, Math.min(1, (points.length * 8) / Math.max(1, t)));
          ctx.finish({ score: +score.toFixed(3), seconds: +t.toFixed(2), points: points.length, fails: 0 });
          return;
        }
        goto(idx + 1);
      }
      hudT += real; if (hudT > 0.1) { hudT = 0; ctx.hudSet({ time: t }); }
    },
    stop() {
      stopped = true; phase = 'aus';
      if (dark) { dark.classList.remove('is-in'); const el = dark; setTimeout(() => el.remove(), 700); dark = null; }
      for (const l of lights) l.remove(); lights = [];
      if (npc && npc.clearOverride) npc.clearOverride();
      ctx.lock(false);
    },
    auto(level = 'gold') {
      const last = points[points.length - 1];
      if (last) player.teleport(last.x, last.z);
      const sec = { gold: points.length * 5, silber: points.length * 10, bronze: points.length * 20, fail: points.length * 60 }[level] ?? points.length * 5;
      phase = 'ziel';
      ctx.finish({ score: +Math.min(1, (points.length * 8) / sec).toFixed(3), seconds: sec, points: points.length, fails: 0, auto: true });
    },
    act(name) { if (name === 'licht') { const p = points[idx]; if (p) player.teleport(p.x, p.z); return true; } return false; },
  };
}

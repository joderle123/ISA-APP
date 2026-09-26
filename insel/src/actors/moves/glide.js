// Gefühlssegel (WP13): Springen in der Luft halten öffnet das Segel. Sechs Modi (ein Gefühl = eine Flugregel):
//   freude Aufwind · wut Schub (bricht Dornen) · angst Zeitlupe 0,5 (Fallen leuchten) · trauer Sturzflug ins Wasser (→ Tauchen)
//   ekel durch Sporen · ueberraschung 2 s Schwebe-Stopp.  Kombis (segel.kombi): freude+trauer Regenbogenbogen, angst+wut Schutzschub.
// Rune-Tore schalten in Entspannt/Abenteuer automatisch; in Profi wählt man im Kraft-Rad (player.segel.setMode).
// Wackeln nur über ctx.mod.glideStability (1 = ruhig); ctx.mod.glideVisualOnly = nur Optik (Entspannt).
// Ereignisse: segel:open · segel:close · segel:mode {mode, second, combo, source} · segel:hover · gate:break {id} · rune:pass {id, emotion}
import { K, wishDir, damp, angleLerp, clamp } from './index.js';

export const EMOTIONS = ['freude', 'wut', 'angst', 'trauer', 'ekel', 'ueberraschung'];
// Flugregeln je Modus (Basis: neutral)
export const SEGEL_MODES = {
  neutral: { fwd: 9.0, sink: 1.4, turn: 1.9, lift: 1.0 },
  freude: { fwd: 9.0, sink: 0.75, turn: 1.9, lift: 1.7 },
  wut: { fwd: 13.5, sink: 1.6, turn: 1.5, lift: 1.0, breaks: true },
  angst: { fwd: 8.0, sink: 1.2, turn: 2.2, lift: 1.0, timeScale: 0.5, reveal: true },
  trauer: { fwd: 6.0, sink: 11, turn: 1.4, lift: 0, dive: true },
  ekel: { fwd: 8.5, sink: 1.4, turn: 1.9, lift: 1.0, sporen: true },
  ueberraschung: { fwd: 8.5, sink: 1.4, turn: 2.0, lift: 1.0, hover: 2.0 },
};
export const COMBOS = {
  'freude+trauer': { id: 'regenbogen', fwd: 9.5, sink: 0.9, turn: 1.9, lift: 1.6, dive: true, arc: true },
  'angst+wut': { id: 'schutzschub', fwd: 12, sink: 1.3, turn: 1.8, lift: 1.0, timeScale: 0.6, breaks: true, reveal: true, shield: true },
};
export function resolveMode(mode, second, kombi) {
  if (!mode || mode === 'neutral') return { id: 'neutral', ...SEGEL_MODES.neutral };
  if (second && kombi) {
    const key = [mode, second].sort().join('+');
    if (COMBOS[key]) return { id: COMBOS[key].id, ...COMBOS[key], combo: true };
  }
  return { id: mode, ...(SEGEL_MODES[mode] || SEGEL_MODES.neutral) };
}

export function createGlide(ctx) {
  let mode = 'neutral', second = null, rule = resolveMode('neutral');
  let feathers = new Set();          // gesammelte Federn (Modi, die man wählen darf)
  let speed = 8, hoverT = 0, hoverCd = 0, flareT = 0, arcT = 0;
  let noiseT = 0, wob = 0, roll = 0, pitchVis = 0, trailT = 0, dornenT = 0;
  let autoSwitch = true;
  const prev = { x: 0, y: 0, z: 0 };

  function setMode(m, s = null, source = 'manual') {
    if (m && m !== 'neutral' && !feathers.has(m) && source !== 'debug') return false;
    if (s && !feathers.has(s)) s = null;
    mode = m || 'neutral'; second = s;
    rule = resolveMode(mode, second, ctx.abilities.kombi);
    if (rule.hover && ctx.state === 'glide' && hoverCd <= 0) { hoverT = rule.hover; hoverCd = 4; ctx.events.emit('segel:hover', { seconds: rule.hover }); }
    if (rule.arc) arcT = 0.9;
    ctx.events.emit('segel:mode', { mode, second, combo: rule.combo ? rule.id : null, rule: rule.id, source, timeScale: rule.timeScale || 1 });
    if (ctx.segel) ctx.segel.setMode(mode, second, rule);
    return true;
  }

  const glide = {
    name: 'glide',
    get mode() { return mode; },
    get second() { return second; },
    get rule() { return rule; },
    get speed() { return speed; },
    get hovering() { return hoverT > 0; },
    get autoSwitch() { return autoSwitch; },
    set autoSwitch(v) { autoSwitch = !!v; },
    setMode,
    setFeathers(list) { feathers = new Set(list || []); if (mode !== 'neutral' && !feathers.has(mode)) setMode('neutral', null, 'system'); },
    get feathers() { return [...feathers]; },
    enter(d) {
      const v = (d && d.vel) || ctx.vel;
      speed = clamp(Math.hypot(v.x, v.z), 5.5, 12);
      ctx.vel.y = Math.max(v.y, -3);
      ctx.grounded = false;
      hoverT = 0; flareT = 0; wob = 0; roll = 0; dornenT = 0;
      if (rule.hover && hoverCd <= 0) { hoverT = rule.hover; hoverCd = 4; }
      if (ctx.segel) { ctx.segel.open(); ctx.segel.setMode(mode, second, rule); }
      ctx.audio.play('segel');
      ctx.events.emit('segel:open', { mode });
      prev.x = ctx.pos.x; prev.y = ctx.pos.y; prev.z = ctx.pos.z;
    },
    exit(to) {
      if (ctx.segel) ctx.segel.close();
      ctx.events.emit('segel:close', { to });
      if (rule.timeScale) ctx.events.emit('segel:mode', { mode: 'neutral', second: null, combo: null, rule: 'neutral', source: 'close', timeScale: 1 });
    },
    update(dt) {
      const { pos, vel, intent } = ctx;
      hoverCd = Math.max(0, hoverCd - dt);
      // ---- Segel schließen: Knopf losgelassen ----
      if (!intent.jumpHeld) { return ctx.go('air', { fromGlide: true }); }
      // Zeitlupe: eigene Physik langsamer (die Welt regelt das Puls-/Rad-System über loop.timeScale)
      const ts = rule.timeScale && !ctx.worldTimeScaled ? rule.timeScale : 1;
      const pdt = dt * ts;

      // ---- Steuerung ----
      const { mx, mz, mag } = wishDir(intent);
      // Zielrichtung: Joystick lenkt die Flugrichtung (Rate), vorwärts/zurück = Nase runter/hoch
      const cy = intent.camYaw || 0;
      const steer = mag > 0.08 ? intent.x : 0;
      const pitchIn = mag > 0.08 ? intent.y : 0;
      const stab = clamp(ctx.mod.glideStability, 0, 1);
      noiseT += pdt;
      const wobble = (1 - stab) * (Math.sin(noiseT * 5.1) * 0.6 + Math.sin(noiseT * 2.3 + 1) * 0.4);
      const ctrlWobble = ctx.mod.glideVisualOnly ? 0 : wobble;
      const turn = rule.turn * (steer + ctrlWobble * 0.5);
      ctx.yaw = ctx.yaw - turn * pdt;
      // Zielgeschwindigkeit und Sinken
      let fwd = rule.fwd, sink = rule.sink;
      if (pitchIn > 0.1) { fwd *= 1 + pitchIn * 0.3; sink *= 1 + pitchIn * 1.6; flareT = 0; }
      else if (pitchIn < -0.1) { flareT += pdt; if (flareT < 0.7) { sink *= 0.45; fwd *= 0.8; } else { sink *= 1.5; fwd *= 0.7; } }
      else flareT = Math.max(0, flareT - pdt * 2);
      if (arcT > 0) { arcT -= pdt; sink = -5.5; fwd *= 1.1; }
      if (hoverT > 0) { hoverT -= pdt; fwd = 0; sink = 0; }
      speed += (fwd - speed) * damp(1.6, pdt);
      const dirx = Math.sin(ctx.yaw), dirz = Math.cos(ctx.yaw);
      vel.x = dirx * speed; vel.z = dirz * speed;
      // Vertikal: Richtung Sinkrate, Aufwind hebt
      let vyT = -sink;
      if (ctx.updrafts) { const lift = ctx.updrafts.liftAt(pos.x, pos.y, pos.z) * rule.lift; if (lift > 0) vyT = Math.max(vyT, lift - sink * 0.3); }
      vel.y += (vyT - vel.y) * damp(rule.dive ? 6 : 3.2, pdt);
      if (hoverT > 0) vel.y *= 1 - damp(6, pdt);

      // ---- Bewegen ----
      prev.x = pos.x; prev.y = pos.y; prev.z = pos.z;
      const nx = pos.x + vel.x * pdt, nz = pos.z + vel.z * pdt;
      if (!ctx.isBlocked(nx, nz, pos.y, { air: true })) { pos.x = nx; pos.z = nz; }
      else { speed *= 0.5; }
      const hit = ctx.colliders.resolve(pos, K.RADIUS, pos.y, K.HEIGHT);
      if (hit) speed = Math.max(3, speed * 0.6);
      pos.y += vel.y * pdt;

      // ---- Runen, Dornen, Sporen ----
      if (ctx.runes) {
        const tor = ctx.runes.passTor(prev, pos);
        if (tor) {
          ctx.events.emit('rune:pass', { id: tor.id, emotion: tor.emotion, auto: autoSwitch });
          if (autoSwitch && tor.emotion) setMode(tor.emotion, tor.second || null, 'rune');
          ctx.audio.play('rune');
          ctx.particles.emit({ x: pos.x, y: pos.y + 1, z: pos.z, count: 18, spread: 1.4, speed: 2.5, up: 1, color: tor.color, size: 0.6, life: 0.9, gravity: 0, drag: 2, additive: true, alpha: 0.9 });
        }
        const dorn = ctx.runes.hitDornen(pos, K.RADIUS + 0.4);
        if (dorn) {
          if (rule.breaks) { ctx.runes.breakDornen(dorn); ctx.events.emit('gate:break', { id: dorn.id, mode }); ctx.audio.play('break'); }
          else { pos.x = prev.x; pos.z = prev.z; speed = Math.max(2, speed * 0.3); wob = 1; dornenT += dt; if (dornenT > 0.12) { dornenT = 0; ctx.events.emit('gate:blocked', { id: dorn.id, needs: 'wut' }); } }
        }
        const sp = ctx.runes.inSporen(pos);
        if (sp) {
          if (rule.sporen || rule.shield) { if (Math.random() < 0.5) ctx.particles.emit({ x: pos.x, y: pos.y + 1, z: pos.z, count: 2, spread: 1, speed: 1, up: 0.5, color: 0x9fe85a, size: 0.4, life: 0.8, gravity: 0, drag: 1, alpha: 0.6 }); }
          else {
            // hinausgedrückt, Segel wackelt
            const dx = pos.x - sp.x, dz = pos.z - sp.z; const d = Math.hypot(dx, dz) || 1;
            pos.x += (dx / d) * 7 * pdt; pos.z += (dz / d) * 7 * pdt; wob = 1; speed = Math.max(3, speed * 0.85);
          }
        }
      }

      // ---- Landung / Wasser ----
      const wl = ctx.waterLevel(pos.x, pos.z);
      const g = ctx.groundAt(pos.x, pos.z, pos.y + 0.5);
      ctx.groundY = g.y;
      const deep = wl - g.y > K.SWIM_DEPTH;
      if (pos.y <= wl - 0.15 && deep) {
        ctx.splash(1.4);
        if ((rule.dive || vel.y < -6.5) && ctx.abilities.tauchen) return ctx.go('dive', { from: 'glide', x: pos.x, z: pos.z });
        if (ctx.abilities.schwimmen) return ctx.go('swim', { from: 'glide' });
        pos.y = wl; vel.y = 0; return ctx.go('air', { fromGlide: true });
      }
      if (pos.y <= g.y) {
        pos.y = g.y;
        const impact = Math.max(0, -vel.y);
        vel.y = 0;
        ctx.land(Math.min(impact, 6));   // Segel-Landung ist immer weich
        if (ctx.inLava(pos)) return ctx.respawn('lava');
        return ctx.go('ground', { impact });
      }
      if (pos.y < K.VOID_Y) return ctx.respawn('leere');

      // ---- Optik: Rollen, Wackeln, Spur ----
      wob = Math.max(0, wob - dt * 1.5);
      roll += ((-steer * 0.55 - wobble * 0.3 - wob * Math.sin(noiseT * 14) * 0.25) - roll) * damp(5, dt);
      pitchVis += ((pitchIn * 0.35 + (rule.dive ? 0.8 : 0)) - pitchVis) * damp(4, dt);
      if (ctx.segel) ctx.segel.update(dt, { speed, roll, pitch: pitchVis, wobble: Math.abs(wobble) + wob, hover: hoverT > 0 });
      trailT += dt;
      if (trailT > 0.06 && speed > 4) {
        trailT = 0;
        const c = ctx.segel ? ctx.segel.color : 0xffffff;
        ctx.particles.emit({ x: pos.x - dirx * 0.6, y: pos.y + 1.4, z: pos.z - dirz * 0.6, count: 2, spread: 0.5, speed: 0.4, color: c, size: 0.45, life: 0.8, gravity: 0, drag: 1.5, additive: true, alpha: 0.5, grow: 1.2 });
      }
      ctx.setBaseAnim('fall', 'glide', { roll, pitch: pitchVis, hover: hoverT > 0 });
      return null;
    },
  };
  return glide;
}

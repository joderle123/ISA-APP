// Inselwetter (WP42, DESIGN §10): Ruhewetter (goldener Abend, gebremste Stürme, halbierter Puls für 20 Minuten),
// Festwetter (Laternen, Feuerwerk), Frühlingswetter (Frühlingspalette). Alle tippen denselben Code, niemand wird
// herausgehoben. Läuft in Spielzeit (Pause hält an).
//   const weather = createWeather({ game, seasons }); weather.set('ruhe', { minutes }) · clear() · current · remaining · update(dt)
//   Ereignisse: weather:start {id, minutes} · weather:end {id} · puls:factor {factor}
//   Laufzeit: state.session.weather = { id, remaining } · state.session.pulsFactor (Puls-Systeme multiplizieren damit)
import { WEATHER } from './logic.js';

export function createWeather({ game, seasons = null }) {
  const { events, state, world } = game;
  const sky = world.sky;
  let cur = null;      // { id, def, remaining, timeSpeed0, fireworksT }
  let lanterns = [];
  const emit = (n, p) => events.emit(n, p);

  function set(id, { minutes } = {}) {
    const def = WEATHER[id];
    if (!def) return false;
    if (cur) clear({ silent: true });
    const remaining = (minutes || def.minutes) * 60;
    cur = { id, def, remaining, timeSpeed0: sky.time.speed, fireworksT: 1.5 };
    sky.time.setTimeOfDay(def.hour);
    sky.time.speed = def.timeSpeed;
    sky.setStorm(def.storm);
    state.set('session.weather', { id, remaining: Math.round(remaining) });
    state.set('session.pulsFactor', def.pulsFactor);
    if (def.pulsFactor < 1 && state.get('session.puls', 0) > 0) { const p = Math.round(state.get('session.puls', 0) * def.pulsFactor); state.set('session.puls', p); emit('puls:set', { value: p, zone: p < 30 ? 'gruen' : p < 70 ? 'gelb' : 'rot' }); }
    emit('puls:factor', { factor: def.pulsFactor });
    if (def.lanterns && world.decor && world.decor.find) { lanterns = world.decor.find('laterne'); for (const l of lanterns) if (l.setLit) l.setLit(true); }
    if (def.season && seasons) seasons.override(def.season);
    if (game.ui) { if (game.ui.toast) game.ui.toast(def.name + ' für ' + Math.round(remaining / 60) + ' Minuten'); if (game.ui.glimm) game.ui.glimm(def.glimm); }
    emit('weather:start', { id, minutes: Math.round(remaining / 60) });
    return true;
  }
  function clear({ silent = false } = {}) {
    if (!cur) return false;
    const id = cur.id;
    sky.time.speed = cur.timeSpeed0 || 1;
    sky.setStorm(1);
    if (cur.def.season && seasons) seasons.override(null);
    cur = null;
    state.set('session.weather', null);
    state.set('session.pulsFactor', 1);
    emit('puls:factor', { factor: 1 });
    if (!silent) { if (game.ui && game.ui.toast) game.ui.toast('Das Inselwetter zieht weiter.'); emit('weather:end', { id }); }
    return true;
  }
  function fireworks(dt) {
    if (!cur || !cur.def.fireworks || !game.particles) return;
    cur.fireworksT -= dt;
    if (cur.fireworksT > 0) return;
    cur.fireworksT = 2.2 + Math.random() * 2.5;
    const H = world.island.FEATURES.harbour;
    const x = H.x + (Math.random() - 0.5) * 60, z = H.z + 30 + (Math.random() - 0.5) * 40, y = 26 + Math.random() * 16;
    const colors = ['#ffd23f', '#ff5d8f', '#2de2c9', '#ff8c42', '#b06bff'];
    game.particles.emit({ x, y, z, count: 46, spread: 0.3, speed: 9, up: 0, color: colors[Math.floor(Math.random() * colors.length)], size: 3.2, life: 1.6, gravity: -3, drag: 1.2, additive: true });
    if (game.audio && game.audio.has && game.audio.has('chime') && Math.random() < 0.5) game.audio.play('chime', { volume: 0.3 });
  }
  return {
    WEATHER,
    set, clear, fireworks,
    get current() { return cur ? cur.id : null; },
    get remaining() { return cur ? Math.max(0, Math.round(cur.remaining)) : 0; },
    get pulsFactor() { return cur ? cur.def.pulsFactor : 1; },
    update(dt) {
      if (!cur) return;
      cur.remaining -= dt;
      fireworks(dt);
      const s = state.get('session.weather');
      if (s && Math.abs(s.remaining - cur.remaining) > 5) state.set('session.weather', { id: cur.id, remaining: Math.round(cur.remaining) });
      if (cur.remaining <= 0) clear();
    },
  };
}

// Kern-Installation (wird von game.js einmal aufgerufen): Zustand, Inhalte, Speichern, Zufall, dann alle Plugins.
//   await installCore(game, { plugins: PLUGINS, content: CONTENT, params })
// Danach: game.state, game.content, game.save, game.rng (seedbar je Spielstand), game.plugins, game.plugin(id), game.params
import { createState } from './state.js';
import { createContent } from './content.js';
import { createSave } from './save.js';
import { createRng } from './rng.js';
import { installPlugins } from './plugins.js';

export async function installCore(game, { plugins = [], content = [], params = null, storage = null } = {}) {
  const { events } = game;
  game.params = params || new URLSearchParams(typeof location !== 'undefined' ? location.search : '');
  game.state = createState({ events });
  game.content = createContent({ entries: content, island: game.world && game.world.island });
  game.save = createSave({ state: game.state, events, storage, game });
  game.rng = createRng(1);

  // Standard-Haken: Welt ↔ Zustand (Position, Tageszeit, Schleier). Spätere Systeme ergänzen eigene über onCapture/onApply.
  game.save.onCapture((d) => {
    const p = game.player && game.player.position;
    if (p && game.started) d.pos = { scene: 'welt', x: +p.x.toFixed(2), z: +p.z.toFixed(2), yaw: +(game.player.yaw || 0).toFixed(3) };
    if (game.time) d.time = { ...(d.time || {}), hour: +game.time.hour.toFixed(3) };
    if (game.world && game.world.veil && game.world.veil.getState) d.veil = { ...(d.veil || {}), zones: game.world.veil.getState() };
  });
  game.save.onApply((d) => {
    game.rng = createRng(d.seed || 1);
    if (d.time && typeof d.time.hour === 'number' && game.time) game.time.setTimeOfDay(d.time.hour);
    const zones = d.veil && d.veil.zones;
    if (zones && Object.keys(zones).length && game.world && game.world.veil && game.world.veil.setState) game.world.veil.setState(zones);
    if (d.pos && d.pos.scene === 'welt' && game.player && !game.started) game.player.teleport(d.pos.x, d.pos.z, d.pos.yaw);
  });
  const restored = game.save.boot();
  game.save.attachWindow();
  if (game.loop) game.loop.add((dt) => { if (game.started) game.save.tick(dt); }, { order: 98 });

  game.plugins = { core: { state: game.state, content: game.content, save: game.save, get rng() { return game.rng; } }, list: [], failed: [] };
  await installPlugins(game, plugins);
  events.emit('core:ready', { restored, plugins: game.plugins.list.slice() });
  return game.plugins;
}

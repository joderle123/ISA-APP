// Props-Plugin (WP43): stellt den Requisiten-Baukasten als game.props bereit und animiert alle gesetzten Requisiten.
//   game.props.spawn('signalfeuer', { x, z }) · game.props.bake([...]) · game.props.gallery() · LUMO.debug.propsGallery(on)
// Regionen (WP50+) setzen ihre Requisiten selbst; die Welt-Dekoration für M0–M3 liegt im Plugin 'welt' (src/world/plugin.js).
import { createPropKit, PROP_TYPES, BIRDS, TRI_BUDGET, triangleCount } from './index.js';

export default {
  id: 'props', order: 21, deps: [],
  install(game) {
    const { world, colliders, particles, player, scene } = game;
    const kit = createPropKit({ veil: world.veil, island: world.island, colliders, particles, rng: game.rng, scene, focus: () => player.position });
    game.props = kit;
    game.addUpdate((dt, t) => kit.update(dt, t), { order: -12 });
    // Bei neuem Spielstand (anderer Seed) den Zufall der Requisiten neu ziehen
    game.events.on('state:reset', () => { kit.rng = game.rng && game.rng.fork ? game.rng.fork('props') : kit.rng; });

    const D = game.debug || (game.debug = {});
    let gal = null;
    // Galerie aller Requisiten am Hafenstrand (Screenshots); propsGallery(false) räumt auf
    D.propsGallery = (on = true, opts = {}) => {
      if (gal) { gal.remove(); gal = null; }
      if (!on) return null;
      gal = kit.gallery({ x: opts.x !== undefined ? opts.x : 30, z: opts.z !== undefined ? opts.z : 136, spacing: opts.spacing || 6, yaw: opts.yaw || 0 });
      return gal.handles.map((h) => ({ id: h.id, type: h.type, tris: triangleCount(h.group) }));
    };
    D.propsBudget = () => PROP_TYPES.map((type) => {
      const h = type === 'vogel' ? kit.make(type, { emotion: 'freude' }) : type === 'bohlenweg' ? kit.make(type, { pts: [[0, 0], [0, 8], [6, 12]] }) : kit.make(type, {});
      const tris = triangleCount(h.group);
      h.group.traverse((o) => { if (o.isMesh && o.geometry) o.geometry.dispose(); });
      return { type, tris, ok: tris <= TRI_BUDGET };
    });
    return Object.assign(kit, { types: PROP_TYPES, BIRDS, TRI_BUDGET });
  },
};

// Jahreszeit-Paletten je Modul (WP42, DESIGN §1): legt sich nach dem Himmel über die Farbkorrektur des Schleiers,
// skaliert Nebelweite und Sturmstärke. Die Jahreszeit folgt dem höchsten freigeschalteten Modul; Inselwetter kann sie
// vorübergehend übersteuern.
//   const seasons = createSeasons({ game }); seasons.current · seasons.palette · seasons.override(id|null) · seasons.refresh()
//   Ereignis: season:change { season, prev }
import { seasonFor, SEASON_PALETTES } from './logic.js';

export function createSeasons({ game }) {
  const { events, state, world } = game;
  const veil = world.veil, sky = world.sky;
  let current = null, override = null;
  const tmp = { lift: [0, 0, 0], gain: [1, 1, 1], sat: 1, contrast: 1 };
  const emit = (n, p) => events.emit(n, p);

  function refresh() {
    const s = seasonFor(state.get('units') || {}, override);
    if (s === current) return current;
    const prev = current;
    current = s;
    const P = SEASON_PALETTES[s];
    if (sky.setStorm) sky.setStorm(P.storm);
    emit('season:change', { season: s, prev, name: P.name });
    return s;
  }
  const api = {
    SEASON_PALETTES,
    get current() { return current; },
    get palette() { return SEASON_PALETTES[current] || SEASON_PALETTES.spaetsommer; },
    get overrideId() { return override; },
    override(id) { override = id && SEASON_PALETTES[id] ? id : null; return refresh(); },
    refresh,
    // Nach dem Himmel (order -10): Paletten-Zusatz auf die Farbkorrektur, Nebel- und Sichtweite
    update() {
      const P = api.palette;
      const g = sky.grade;
      if (!g) return;
      for (let i = 0; i < 3; i++) { tmp.lift[i] = g.lift[i] + P.lift[i]; tmp.gain[i] = g.gain[i] * P.gain[i]; }
      tmp.sat = g.sat * P.sat; tmp.contrast = g.contrast;
      veil.setGrade(tmp);
      const q = game.quality && game.quality.tier;
      if (q && q.drawDistance && game.scene.fog && !(game.scenes && game.scenes.isInterior)) {
        game.scene.fog.far = q.drawDistance * P.fog;
        game.scene.fog.near = q.drawDistance * 0.22 * P.fog;
      }
    },
  };
  for (const ev of ['unit:unlock', 'unit:complete', 'state:reset', 'core:ready']) events.on(ev, refresh);
  state.on('units', refresh);
  refresh();
  return api;
}

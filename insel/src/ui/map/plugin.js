// Karte (WP42, DESIGN §17): Tagebuch-Seite „Karte“ mit Nebelkacheln (entdeckt beim Gehen, groß an Aussichtspunkten),
// gesperrten Teasern samt Fähigkeitssymbol, Hauptziel, Signalfeuern, gefundenen Aussichtspunkten, Sammelzählern je Zone.
//   game.plugins.karte → { reveal(x, z, r), isRevealed(x, z), revealed (Set), revealedCount(), teasers(), render(canvas), refresh(), N, R }
//   Ereignisse: map:reveal {tiles} · Spielstand: map.revealed [Kachel-Indizes]
import { drawMap, tileOf, tilesInRadius, MAP_N, MAP_R, REGION_NEEDS, REGION_CENTER } from './render.js';
import { ZONE_NAME, moduleProgress, MODULE_REGION } from '../../systems/session/logic.js';
import { UNIT_MODULE } from '../../content/schema/consts.js';

const REVEAL_WALK = 26, REVEAL_VIEW = 72;

export default {
  id: 'karte', order: 66, deps: ['ui', 'collectibles', 'session'],
  install(game) {
    const { events, state, content, player, world, ui } = game;
    const island = world.island;
    const emit = (n, p) => events.emit(n, p);
    let revealed = new Set(state.get('map.revealed') || []);
    let walkT = 0, lastTile = -1;
    const persist = () => state.set('map.revealed', [...revealed]);

    function reveal(x, z, r = REVEAL_WALK) {
      const tiles = tilesInRadius(x, z, r, MAP_N, MAP_R).filter((t) => !revealed.has(t));
      if (!tiles.length) return 0;
      for (const t of tiles) revealed.add(t);
      persist();
      emit('map:reveal', { tiles: tiles.length, total: revealed.size });
      return tiles.length;
    }
    events.on('state:reset', () => { revealed = new Set(state.get('map.revealed') || []); lastTile = -1; });
    events.on('aussicht:found', (e) => { if (e) { reveal(e.x, e.z, REVEAL_VIEW); if (ui && ui.toast) ui.toast('Ein Stück Karte mehr.'); } });
    events.on('signalfeuer:travel', () => { lastTile = -1; });
    game.addUpdate((dt) => {
      if (!game.started || (game.scenes && game.scenes.isInterior)) return;
      walkT -= dt;
      if (walkT > 0) return;
      walkT = 0.5;
      const p = player.position;
      const t = tileOf(p.x, p.z);
      if (t === lastTile) return;
      lastTile = t;
      reveal(p.x, p.z, REVEAL_WALK);
    }, { order: 14 });

    // Regionen: offen (Modul erreicht) oder Teaser mit Fähigkeit
    function teasers() {
      const us = state.get('units') || {};
      const out = [];
      for (const [mod, region] of Object.entries(MODULE_REGION)) {
        const open = Object.entries(us).some(([id, st]) => UNIT_MODULE[id] === mod && st && st !== 'gesperrt');
        const def = content.get('regions', region);
        let ability = REGION_NEEDS[region] || null;
        if (def && def.gates && def.gates.length) { const n = def.gates[0].needs || {}; ability = n.ability || (n.upgrade ? n.upgrade.split('.')[0] : ability); }
        const Z = island.zoneById(region);
        const c = Z ? { x: Z.x, z: Z.z } : REGION_CENTER[region];
        if (!c || region === 'hafen') continue;
        out.push({ region, x: c.x, z: c.z, ability, name: ZONE_NAME[region] || region, open });
      }
      return out;
    }
    // Wegfähigkeiten aus Bindungen (WP34, DESIGN §9): Noor „farbmarken“ zeigt offene Sammelsachen, Kim „netzreise“ erlaubt Schnellreise aus der Karte
    const hasWeg = (id) => !!(game.npcs && game.npcs.hasWeg && game.npcs.hasWeg(id));
    function marks() {
      const C = game.plugins.collectibles;
      if (!C || !hasWeg('farbmarken')) return [];
      return [...C.list('lichtsplitter', { open: true }), ...C.list('muschel', { open: true })].map((it) => ({ x: it.pos.x, z: it.pos.z, type: it.type }));
    }
    function travelTargets() {
      const S = game.session;
      if (!S || !hasWeg('netzreise')) return [];
      const p = player.position;
      return S.signalfeuer.list().filter((f) => f.lit && Math.hypot(f.x - p.x, f.z - p.z) > 12).slice(0, 8);
    }
    function render(cv) {
      const S = game.session, C = game.plugins.collectibles;
      const counts = {};
      if (C) for (const Z of island.ZONES) { const all = C.list('lichtsplitter', { zone: Z.id }).filter((it) => !it.hidden || C.isCollected(it.id) || C.isVisible(it.id)); counts[Z.id] = { found: all.filter((it) => C.isCollected(it.id)).length, total: all.length }; }
      const viewpoints = C ? C.list('aussicht').map((it) => ({ x: it.pos.x, z: it.pos.z, found: C.isCollected(it.id) })) : [];
      const ctx = {
        island, veil: world.veil, revealed, player: { x: player.position.x, z: player.position.z, yaw: player.yaw },
        target: S && S.target ? S.target : null, fires: S ? S.signalfeuer.list() : [], viewpoints, teasers: teasers(), counts, marks: marks(),
        baumhaus: island.SITES.baumhaus, zoneNames: ZONE_NAME, redraw: null,
      };
      let pending = false;
      ctx.redraw = () => { if (pending || !cv.isConnected) return; pending = true; setTimeout(() => { pending = false; if (cv.isConnected) drawMap(cv, ctx); }, 60); };
      drawMap(cv, ctx);
      return cv;
    }
    // Tagebuch-Seite ersetzen
    ui.journal.registerPage({
      id: 'karte', label: 'Karte', icon: 'karte', order: 10,
      render(el) {
        const cv = document.createElement('canvas'); cv.width = cv.height = 640; cv.className = 'map-canvas'; cv.dataset.map = '1';
        render(cv);
        const prog = moduleProgress(state.get('units') || {});
        const known = Math.round(revealed.size / (MAP_N * MAP_N) * 100);
        const S = game.session;
        const travel = travelTargets();
        el.innerHTML = `<div class="map-wrap"></div>
          <p class="jn-lead">${S && S.target ? `Ziel: ${esc(S.target.title || '')}` : 'Geh los. Die Karte füllt sich.'}</p>
          <p class="jn-note">${known}% entdeckt · Grau = Schleier · Schloss = braucht eine Fähigkeit · ${prog.done} Aufnäher.${hasWeg('farbmarken') ? ' Punkte = Noors Farbmarken.' : ''}</p>
          ${travel.length ? `<p class="jn-note">Netz-Schnellreise (Kim):</p><div class="map-travel" style="display:flex;flex-wrap:wrap;gap:8px">${travel.map((f) => `<button class="btn" type="button" data-map-travel="${esc(f.id)}">${ui.icon ? ui.icon('feuer', { size: 20 }) : ''}<span>${esc(f.name)}</span></button>`).join('')}</div>` : ''}`;
        el.querySelector('.map-wrap').appendChild(cv);
        el.querySelectorAll('[data-map-travel]').forEach((b) => b.addEventListener('click', () => { const id = b.dataset.mapTravel; ui.journal.close(); setTimeout(() => game.session.signalfeuer.travel(id), 120); }));
      },
    });

    const api = {
      N: MAP_N, R: MAP_R, REVEAL_WALK, REVEAL_VIEW,
      get revealed() { return revealed; },
      reveal, teasers, render,
      isRevealed: (x, z) => revealed.has(tileOf(x, z)),
      revealedCount: () => revealed.size,
      refresh() { if (ui.journal.isOpen && ui.journal.current === 'karte') ui.journal.refresh(); },
    };
    const D = game.debug || (game.debug = {});
    D.mapReveal = (x, z, r) => reveal(x, z, r);
    D.mapInfo = () => ({ revealed: revealed.size, of: MAP_N * MAP_N, teasers: teasers().filter((t) => !t.open).map((t) => t.region + ':' + t.ability), marks: marks().length, travel: travelTargets().map((f) => f.id) });
    return api;
  },
};
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

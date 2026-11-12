// Stil-Plugin (WP41): Stil-Studio (Overlay mit Drehteller), Tagebuch-Seite „Stil“, Spiegel im Baumhaus, erster Start.
//   game.ui.stil → { open({ first, tab }), close(), isOpen, studio, draft }
//   Erster Start: ohne gespeicherten Avatar öffnet sich das Studio nach dem Start (nicht mit ?test oder ?nostil);
//   ?stil öffnet es immer. Ereignisse: stil:open {first} · stil:close {reason} · stil:change {key, value}
import { createStudio } from './studio.js';

export default {
  id: 'stil', order: 65, deps: ['ui', 'cosmetics'],
  install(game) {
    const { events, state, ui, audio, world } = game;
    const cosmetics = game.plugins.cosmetics;
    const icon = ui.icon;
    const speech = game.speech || null;
    const params = game.params || new URLSearchParams('');
    const studio = createStudio({ game, ui, cosmetics, icon, audio, speech });
    const api = {
      studio,
      open(o) { return studio.open(o || {}); },
      close() { studio.close(); },
      get isOpen() { return studio.isOpen; },
      get draft() { return studio.draft; },
    };
    ui.stil = api;

    // ---- Tagebuch-Seite „Stil“ (ersetzt die Hülle aus WP21) ----
    ui.journal.registerPage({
      id: 'stil', label: 'Stil', icon: 'stil', order: 70,
      badge: () => { const n = cosmetics.owned().filter((it) => it.slot !== 'emote' && !(it.source && it.source.start)).length; return n || null; },
      render(el) {
        const A = game.avatar;
        const owned = cosmetics.owned().filter((it) => !(it.source && it.source.start));
        const total = cosmetics.list().filter((it) => !(it.source && it.source.start)).length;
        const eq = cosmetics.equipped;
        const worn = Object.entries(eq).filter(([, id]) => id).map(([slot, id]) => cosmetics.byId(id)).filter(Boolean);
        el.innerHTML = `
          <div class="stil-card"><span class="stil-avatar">${icon('stil', { size: 48 })}</span><div><small>Dein Spielname</small><h4>${A.handle}</h4><p>${A.isSet ? 'Dein Look ist gespeichert.' : 'Noch kein eigener Look.'} ${owned.length} von ${total} Extras gefunden.</p></div><button class="btn btn-primary" type="button" data-open-stil>${icon('stil', { size: 24 })}<span>Stil-Studio</span></button></div>
          ${worn.length ? `<h4 class="jn-sub">Angelegt</h4><div class="stil-extras">${worn.map((it) => `<span class="st-opt is-on" style="min-height:48px">${icon(it.icon || 'stern', { size: 22 })}<span>${it.name || it.id}</span></span>`).join('')}</div>` : ''}
          <p class="jn-note">Am Spiegel im Baumhaus änderst du Haare, Kleidung und Muster. Kein Shop, kein Geld. Alles kommt aus der Welt.</p>`;
        el.querySelector('[data-open-stil]').addEventListener('click', () => { audio.play('tile'); ui.journal.close(); setTimeout(() => studio.open(), 120); });
      },
    });

    // ---- Spiegel am Baumhaus-Podest (Interaktion „Stil“) ----
    try {
      const site = world.island.SITES && world.island.SITES.baumhaus;
      if (site && game.interactions && game.materials) {
        const THREE = game.THREE, { part, merge } = game.geom;
        const x = site.x + 2.4, z = site.z + 1.2, y = world.island.getHeight(x, z);
        const geo = merge([
          part(new THREE.BoxGeometry(0.9, 1.9, 0.08), { pos: [0, 1.0, 0], color: '#6b4a2f', faceVar: 0.1, seed: 5 }),
          part(new THREE.BoxGeometry(0.74, 1.72, 0.03), { pos: [0, 1.0, 0.04], color: '#cfe9ff' }),
          part(new THREE.BoxGeometry(0.16, 0.9, 0.16), { pos: [0, 0.2, -0.25], rot: [-0.35, 0, 0], color: '#5a3d26' }),
          part(new THREE.BoxGeometry(0.6, 0.06, 0.3), { pos: [0, 0.03, -0.1], color: '#5a3d26' }),
        ]);
        const mirror = new THREE.Mesh(geo, game.materials.lambertVC('spiegel'));
        mirror.position.set(x, y, z);
        mirror.rotation.y = Math.atan2(site.x - x, site.z - z);
        mirror.castShadow = true;
        game.scene.add(mirror);
        game.interactions.add({ id: 'spiegel', x, z, radius: 2.8, label: 'Stil', onAction: () => { audio.play('open'); studio.open(); } });
      }
    } catch (e) { console.warn('[stil] Spiegel nicht gebaut:', e); }

    // ---- Erster Start ----
    const autoOpen = () => {
      if (params.has('stil')) { setTimeout(() => studio.open({ first: !game.avatar.isSet }), 900); return; }
      if (params.has('test') || params.has('nostil') || game.avatar.isSet) return;
      setTimeout(() => { if (!game.avatar.isSet && game.started && !ui.overlay.count) studio.open({ first: true }); }, 1400);
    };
    if (game.started) autoOpen(); else events.on('game:start', autoOpen);

    // Debug
    const D = game.debug || (game.debug = {});
    D.openStil = (o) => studio.open(o);
    return api;
  },
};

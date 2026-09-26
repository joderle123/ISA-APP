// Signalfeuer (WP42, DESIGN §3/§11): Schnellreise und Speichern. Dunkel, solange der Ort grau ist; sie leuchten auf,
// wenn die Zone frei wird (oder RegionDef.signalfeuer[].litBy erfüllt ist). Am Feuer: Schnellreise zu anderen
// brennenden Feuern, „Für heute Schluss“ (Abend am Feuer), Speichern.
//   const fires = createSignalfeuer({ game, evalCond, onSchluss }); fires.list() · get(id) · lit(id) · light(id, {silent})
//   fires.nearest(x, z, { lit }) · fires.travel(id) → Promise · fires.refresh() · fires.litIds()
//   Ereignisse: signalfeuer:lit {id, zone} · signalfeuer:travel {from, to} · signalfeuer:menu {id}
//   Spielstand: signalfeuer.<id> = true (brennt)
import { ZONE_NAME, ZONE_ICON, ZONE_COLOR } from './logic.js';

// Standard-Feuer je Zone (die Welt-Dekoration setzt die Requisiten am Hafen, Strand, Dschungel und an den Klippen)
export const DEFAULT_FIRES = [
  { id: 'sf-hafen-steg', zone: 'hafen', x: 18, z: 118, name: 'Am Steg' },
  { id: 'sf-hafen-west', zone: 'hafen', x: -10, z: 120, name: 'Westufer' },
  { id: 'sf-hafen-platz', zone: 'hafen', x: 16, z: 100, name: 'Dorfplatz' },
  { id: 'sf-hafen-baumhaus', zone: 'hafen', x: -8, z: 100, name: 'Beim Baumhaus' },
  { id: 'sf-strand', zone: 'strand', x: 133, z: 46, name: 'Muschelbucht' },
  { id: 'sf-dschungel', zone: 'dschungel', x: 76, z: -64, name: 'Lichtung' },
  { id: 'sf-klippen', zone: 'klippen', x: -92, z: -71, name: 'Wetterwarte' },
  { id: 'sf-moor', zone: 'moor', x: -124, z: 56, name: 'Stille Lichtung' },
  { id: 'sf-markt', zone: 'markt', x: -110, z: 8, name: 'Marktplatz' },
  { id: 'sf-vulkan', zone: 'vulkan', x: 18, z: 40, name: 'Vulkanfuß' },
  { id: 'sf-leuchtturm', zone: 'leuchtturm', x: -118, z: 118, name: 'Leuchtturm' },
];

export function createSignalfeuer({ game, evalCond, onSchluss }) {
  const { events, state, world, player, content } = game;
  const island = world.island;
  const fires = new Map();   // id → { id, zone, x, z, name, prop, interaction, litBy }
  let fadeEl = null;
  const emit = (n, p) => events.emit(n, p);
  const isLit = (id) => !!(state.get('signalfeuer') || {})[id];

  function findProp(x, z) {
    const decor = world.decor;
    if (!decor || !decor.find) return null;
    let best = null, bd = 6;
    for (const h of decor.find('signalfeuer')) {
      const p = h.group.getWorldPosition(new game.THREE.Vector3());
      const d = Math.hypot(p.x - x, p.z - z);
      if (d < bd) { bd = d; best = h; }
    }
    return best;
  }
  function add(def) {
    if (fires.has(def.id)) return fires.get(def.id);
    const f = { ...def };
    f.prop = findProp(f.x, f.z) || (game.props ? game.props.spawn('signalfeuer', { id: 'sf-' + f.id, x: f.x, z: f.z, lit: false }) : null);
    if (f.prop && f.prop.setLit) f.prop.setLit(isLit(f.id));
    if (game.interactions) {
      f.interaction = game.interactions.add({ id: 'feuer-' + f.id, x: f.x, z: f.z, radius: 3.4, label: 'Feuer', priority: 0, onAction: () => menu(f.id) });
    }
    fires.set(f.id, f);
    return f;
  }
  function light(id, { silent = false } = {}) {
    const f = fires.get(id);
    if (!f || isLit(id)) return false;
    state.set('signalfeuer.' + id, true);
    if (f.prop && f.prop.setLit) f.prop.setLit(true);
    if (!silent) {
      if (game.audio) game.audio.play('chime');
      if (game.ui && game.ui.toast) game.ui.toast(`Signalfeuer brennt: ${f.name}`);
    }
    emit('signalfeuer:lit', { id, zone: f.zone });
    return true;
  }
  // Prüfen, welche Feuer jetzt brennen dürfen: litBy-Bedingung oder Zone frei (Schleier < 0,5)
  function refresh() {
    for (const f of fires.values()) {
      if (isLit(f.id)) { if (f.prop && f.prop.setLit) f.prop.setLit(true); continue; }
      const zoneFree = world.veil.zoneValue(f.zone) !== null ? world.veil.zoneValue(f.zone) < 0.5 : false;
      const ok = f.litBy ? evalCond(f.litBy) : zoneFree;
      if (ok) light(f.id, { silent: !game.started });
    }
  }
  function ensureFade() {
    if (fadeEl || typeof document === 'undefined' || !game.ui || !game.ui.root) return;
    const st = document.createElement('style');
    st.textContent = '.sf-fade{position:absolute;inset:0;background:#05030c;opacity:0;pointer-events:none;z-index:21;transition:opacity .35s ease}.sf-fade.is-on{opacity:1}';
    document.head.appendChild(st);
    fadeEl = document.createElement('div'); fadeEl.className = 'sf-fade'; game.ui.root.appendChild(fadeEl);
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  async function travel(id, { fade = true } = {}) {
    const f = fires.get(id);
    if (!f || !isLit(id)) return false;
    const from = api.nearest(player.position.x, player.position.z, { lit: false });
    ensureFade();
    if (fade && fadeEl) { fadeEl.classList.add('is-on'); await wait(380); }
    const a = Math.atan2(f.x - island.zoneById(f.zone).x, f.z - island.zoneById(f.zone).z);
    const px = f.x + Math.sin(a) * 3.2, pz = f.z + Math.cos(a) * 3.2;
    player.teleport(px, pz, Math.atan2(f.x - px, f.z - pz) + Math.PI);
    if (game.cameraRig) { game.cameraRig.behindPlayer(); game.cameraRig.snap(); }
    if (game.audio) game.audio.play('chime');
    emit('signalfeuer:travel', { from: from ? from.id : null, to: id });
    if (fade && fadeEl) { await wait(80); fadeEl.classList.remove('is-on'); }
    if (game.save) game.save.request('travel');
    return true;
  }
  async function menu(id) {
    const f = fires.get(id);
    if (!f || !game.ui || !game.ui.ask) return null;
    emit('signalfeuer:menu', { id });
    const lit = isLit(id);
    const others = api.list().filter((o) => o.id !== id && isLit(o.id));
    const items = [];
    if (lit && others.length) items.push({ id: 'reise', label: 'Schnellreise', icon: 'karte' });
    items.push({ id: 'schluss', label: 'Für heute Schluss', icon: 'feuer' });
    items.push({ id: 'speichern', label: 'Speichern', icon: 'speichern' });
    if (!lit) items.push({ id: 'dunkel', label: 'Noch dunkel', icon: 'schloss', disabled: true, sub: 'Farbe bringt es zurück' });
    const r = await game.ui.ask({ prompt: lit ? `Signalfeuer · ${f.name}` : 'Ein dunkles Signalfeuer', items, system: { rueckzug: { label: 'Zurück' }, hilfe: false } });
    if (!r || r.system || !r.id) return r;
    if (r.id === 'speichern') { const ok = game.save.request('force'); if (game.ui.toast) game.ui.toast(ok ? 'Gespeichert.' : 'Gerade eben gespeichert.'); if (game.audio) game.audio.play('pickup'); return r; }
    if (r.id === 'schluss') { if (onSchluss) onSchluss({ via: 'signalfeuer', id }); return r; }
    if (r.id === 'reise') {
      const dest = await game.ui.ask({ prompt: 'Wohin?', items: others.slice(0, 6).map((o) => ({ id: o.id, label: o.name, icon: ZONE_ICON[o.zone] || 'feuer', color: ZONE_COLOR[o.zone], sub: ZONE_NAME[o.zone] })), system: { rueckzug: { label: 'Zurück' }, hilfe: false } });
      if (dest && dest.id && !dest.system) await travel(dest.id);
      return dest;
    }
    return r;
  }

  const api = {
    list() { return [...fires.values()].map((f) => ({ id: f.id, zone: f.zone, x: f.x, z: f.z, name: f.name, lit: isLit(f.id) })); },
    get(id) { const f = fires.get(id); return f ? { id: f.id, zone: f.zone, x: f.x, z: f.z, name: f.name, lit: isLit(f.id) } : null; },
    lit: isLit,
    litIds() { return [...fires.keys()].filter(isLit); },
    light, refresh, travel, menu, add,
    nearest(x, z, { lit = true } = {}) {
      let best = null, bd = Infinity;
      for (const f of fires.values()) { if (lit && !isLit(f.id)) continue; const d = Math.hypot(f.x - x, f.z - z); if (d < bd) { bd = d; best = f; } }
      return best ? { ...api.get(best.id), dist: bd } : null;
    },
    unlight(id) { const f = fires.get(id); if (!f) return false; state.remove('signalfeuer.' + id); if (f.prop && f.prop.setLit) f.prop.setLit(false); return true; },
  };

  // ---- Aufbau: Standardfeuer + Regionen ----
  for (const d of DEFAULT_FIRES) add(d);
  for (const region of content.list('regions')) {
    for (const s of region.signalfeuer || []) {
      const site = content.resolveSite(region.sites && region.sites[s.site] ? `${region.id}.${s.site}` : s.site);
      if (!site) continue;
      const zone = (region.veil && region.veil.zone) || region.id;
      const near = api.nearest(site.x, site.z, { lit: false });
      if (near && near.dist < 12) { fires.get(near.id).litBy = s.litBy || null; fires.get(near.id).regionId = s.id; continue; }
      add({ id: s.id, zone, x: site.x, z: site.z, name: s.site, litBy: s.litBy || null });
    }
  }
  refresh();
  for (const ev of ['veil:restored', 'veil:set', 'unit:complete', 'state:reset', 'core:ready']) events.on(ev, () => refresh());
  return api;
}

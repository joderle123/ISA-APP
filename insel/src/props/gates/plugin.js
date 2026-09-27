// Tore-Plugin (WP35): stellt die Tore aus RegionDef.gates (und Standard-Tore für M0–M3) in die Welt. Jedes Tor zeigt das
// Symbol seiner Fähigkeit (Schloss, solange zu), blockiert mit Kollider, öffnet sich, sobald die Bedingung (Cond-DSL,
// auch weg/gadget) stimmt oder ein Effekt {gate:{open}} es erzwingt (state.gates.<id>). Zonen-Tore wirken auf den Puls:
// Windschatten = Senke, Flüsterstein/Sturmfeld/Hitze-Ring/Orbfeld = Quelle. Gadgets und Mut greifen ein: Kältekristall
// friert ein Sturmfeld ein (koffer:frost), die Klangmuschel trägt die Klangbrücke (koffer:klang), Kopf-Gadgets öffnen
// Kopf-Schlösser (koffer:kopf, params.lock 'kopf'), Klarklang öffnet Klangtore (mut:klarklang), Stopp löst Orbfelder (mut:stopp).
//   game.gates = game.plugins.gates → { list(), get(id), add(def), remove(id), isOpen(id), open(id), close(id), refresh(),
//     symbolFor(id), near(radius), evalCond(c), TYPES, DEFAULT_GATES }
//   GateDef: { id, type, needs?: Cond, params?: { r, width, lock, color, … }, pos: {x,z,y?}|{site} , yaw?, region? }
//   Ereignisse: gate:spawn {id, type} · gate:state {id, open, first} · gate:opened {id, type} · gate:near {id, open, symbol}
//     · gate:frozen {id, seconds} · gate:klang {id, seconds}
//   Debug: LUMO.debug.gates() · gateInfo(id) · openGate(id) · closeGate(id)
import * as THREE from 'three';
import { build, createSymbolSprite } from './index.js';
import { GATE_META, GATE_TYPES, gateSymbol, needsFor, isOpen as evalOpen } from './model.js';
import { createMaterials } from '../kit/materials.js';
import { createDslContext, evalCond } from '../../systems/quests/dsl.js';
import { mulberry32 } from '../../world/noise.js';

// Standard-Tore für die spielbare Hälfte (stabile IDs; Inhalts-WPs dürfen sie über gates.remove(id) ersetzen)
export const DEFAULT_GATES = [
  { id: 'strand-bruecke', type: 'runentor', needs: { upgrade: 'teamgeist.ruf' }, pos: { x: 118, z: 58 }, yaw: 0.6, region: 'strand' },
  { id: 'hoehle-flut', type: 'gezeitentuer', needs: { ability: 'schwimmen' }, pos: { x: 156, z: 4 }, yaw: -0.4, region: 'strand' },
  { id: 'mangrove-spalt', type: 'spalt', needs: { weg: 'spalt' }, pos: { x: 142, z: -20 }, yaw: 0.9, region: 'strand' },
  { id: 'lichtung-dornen', type: 'dornenwand', needs: { feather: 'wut' }, pos: { x: 62, z: -60 }, yaw: 0.4, region: 'dschungel' },
  { id: 'klippen-windschatten-1', type: 'windschatten', pos: { x: -99, z: -78 }, yaw: 2.6, region: 'klippen' },
  { id: 'klippen-windschatten-2', type: 'windschatten', pos: { x: -102, z: -86 }, yaw: 2.4, region: 'klippen' },
  { id: 'klippen-windschatten-3', type: 'windschatten', pos: { x: -105, z: -92 }, yaw: 2.8, region: 'klippen' },
  { id: 'klippen-sturmfeld', type: 'kaeltefeld', needs: { gadget: 'kaeltekristall' }, pos: { x: -110, z: -100 }, params: { r: 3 }, region: 'klippen' },
  { id: 'klangschlucht-tor', type: 'klangtor', needs: { any: [{ upgrade: 'mut.klarklang' }, { gadget: 'klangmuschel' }] }, pos: { x: -116, z: -106 }, yaw: -0.5, region: 'klippen' },
  { id: 'gedankenschlucht-schloss', type: 'runentor', needs: { any: [{ gadget: 'zaehllaterne' }, { gadget: 'abcrune' }] }, params: { lock: 'kopf', color: '#c9bff0' }, pos: { x: -88, z: -110 }, yaw: 0.3, region: 'klippen' },
  { id: 'gipfel-faecher', type: 'aufwindfaecher', needs: { weg: 'aufwindfaecher' }, pos: { x: -108, z: -100 }, region: 'klippen' },
  { id: 'vulkan-heizring', type: 'heizring', needs: { upgrade: 'ruhe.ampel' }, pos: { x: -8, z: -30 }, params: { r: 3 }, region: 'vulkan' },
  { id: 'moor-bohle', type: 'bohle', needs: { unit: 'j1-e16' }, pos: { x: -108, z: 62 }, yaw: -0.3, params: { length: 8 }, region: 'moor' },
  { id: 'moor-fluesterstein', type: 'fluesterstein', needs: { unit: 'j1-e16' }, pos: { x: -112, z: 72 }, region: 'moor' },
  { id: 'glimmer-orbfeld', type: 'orbfeld', needs: { upgrade: 'mut.stopp' }, pos: { x: 24, z: -112 }, params: { r: 3.2 }, region: 'glimmer' },
];

export default {
  id: 'gates', order: 37, deps: ['welt', 'props'],
  install(game) {
    const { events, state, content, world, scene, colliders, player } = game;
    const island = world.island;
    const emit = (n, p) => events.emit(n, p);
    const M = createMaterials(world.veil);
    const R0 = mulberry32(77);
    const R = { float: (a, b) => a + R0() * (b - a), int: (a, b) => a + Math.floor(R0() * (b - a + 1)) };
    const K = { M, R, THREE, props: game.props || null };
    const root = new THREE.Group(); root.name = 'tore'; scene.add(root);
    const gates = new Map();
    const dsl = createDslContext({ state, events, content, time: () => ({ hour: game.time ? game.time.hour : 12, day: Number(state.get('time.day', 1)) || 1 }), mode: () => state.get('settings.mode', 'abenteuer') });
    const cond = (c) => evalCond(c, dsl);
    const _wp = new THREE.Vector3();
    const ctxFx = { particles: game.particles, worldPos: (g) => g.getWorldPosition(_wp), near: (g, d) => { const p = g.getWorldPosition(_wp); return Math.hypot(p.x - player.position.x, p.z - player.position.z) < d; } };

    function resolvePos(pos) {
      if (!pos) return null;
      const r = content.resolveSite(pos);
      if (r) return { x: r.x, z: r.z, y: r.y };
      if (typeof pos === 'object' && typeof pos.x === 'number') return { x: pos.x, z: pos.z, y: pos.y };
      return null;
    }
    function add(def) {
      if (!def || !def.id || !GATE_META[def.type]) return null;
      if (gates.has(def.id)) remove(def.id);
      const p = resolvePos(def.pos);
      if (!p) return null;
      const meta = GATE_META[def.type];
      const y = typeof p.y === 'number' ? p.y : Math.max(island.getHeight(p.x, p.z), island.waterLevel ? island.waterLevel(p.x, p.z) : 0);
      const yaw = def.yaw || 0;
      let handle;
      try { handle = build(def.type, { def, K }); } catch (e) { console.error('[tore]', def.id, e); return null; }
      handle.group.position.set(p.x, y, p.z);
      handle.group.rotation.y = yaw;
      handle.group.name = 'tor-' + def.id;
      root.add(handle.group);
      const symbol = gateSymbol(def);
      const sp = createSymbolSprite({ icon: symbol.icon, color: symbol.color, locked: true });
      sp.sprite.position.set(0, (meta.height || 3) + 0.9, 0);
      sp.sprite.scale.set(1.4, 1.4, 1);
      handle.group.add(sp.sprite);
      const g = { id: def.id, def, type: def.type, meta, x: p.x, z: p.z, y, yaw, handle, symbol, symbolSprite: sp, open: null, colliderRefs: [], surfaceRefs: [], zoneInside: false, nearT: -99, active: false, activeUntil: 0 };
      gates.set(def.id, g);
      applyState(g, computeOpen(g), true);
      emit('gate:spawn', { id: def.id, type: def.type });
      return g;
    }
    function remove(id) {
      const g = gates.get(id);
      if (!g) return false;
      clearColliders(g);
      root.remove(g.handle.group);
      g.symbolSprite.dispose();
      g.handle.group.traverse((o) => { if (o.isMesh && o.geometry) o.geometry.dispose(); });
      leaveZone(g);
      gates.delete(id);
      return true;
    }
    function clearColliders(g) { for (const c of g.colliderRefs) colliders.remove(c); g.colliderRefs = []; }
    function clearSurfaces(g) { for (const c of g.surfaceRefs) colliders.remove(c); g.surfaceRefs = []; }
    function computeOpen(g) {
      const forced = state.get('gates.' + g.id);
      return evalOpen(g.def, { evalCond: cond, forced: forced === true ? true : forced === false ? false : null });
    }
    function applyState(g, open, first = false) {
      if (g.open === open) return;
      g.open = open;
      g.handle.setOpen(open, { instant: first });
      g.symbolSprite.setLocked(!open);
      g.symbolSprite.sprite.material.opacity = open ? 0.45 : 1;
      g.symbolSprite.sprite.scale.set(open ? 1.0 : 1.4, open ? 1.0 : 1.4, 1);
      clearColliders(g);
      if (!open && g.meta.blocks && g.handle.collide && !(g.type === 'kaeltefeld' && g.active)) { const c = g.handle.collide(colliders, g.x, g.z, g.y, g.yaw); g.colliderRefs = Array.isArray(c) ? c : c ? [c] : []; }
      if (open && g.type === 'bohle' && g.handle.surfaces) { clearSurfaces(g); g.surfaceRefs = g.handle.surfaces(colliders, g.x, g.z, g.y, g.yaw) || []; }
      if (open && g.type === 'aufwindfaecher' && world.updrafts && world.updrafts.add && !g.updraft) { g.updraft = (world.updrafts.addWithVisual || world.updrafts.add).call(world.updrafts, { id: 'tor-' + g.id, x: g.x, z: g.z, r: 4, yMin: g.y - 2, yMax: g.y + 60, strength: 7 }); }
      if (!open && g.updraft && world.updrafts && world.updrafts.remove) { world.updrafts.remove('tor-' + g.id); g.updraft = null; }
      emit('gate:state', { id: g.id, open, first });
      if (open && !first) {
        emit('gate:opened', { id: g.id, type: g.type });
        if (game.audio && game.audio.has && game.audio.has('unlock')) game.audio.play('unlock');
        if (game.particles) game.particles.emit({ x: g.x, y: g.y + 1.5, z: g.z, count: 30, spread: 1.6, speed: 1.2, up: 1.8, color: new THREE.Color(g.symbol.color).getHex(), size: 0.5, life: 1.4, gravity: -0.3, drag: 1.5, additive: true, alpha: 0.9, grow: 1.5 });
      }
    }
    function refresh() { for (const g of gates.values()) applyState(g, computeOpen(g)); }

    // ---- Zonen-Wirkung auf den Puls (Windschatten = Senke, sonst Quelle), nur solange das Tor zu ist ----
    function enterZone(g) {
      const P = game.puls; if (!P) return;
      if (g.meta.shelter) P.shelter('tor-' + g.id, { x: g.x, z: g.z, r: (g.def.params && g.def.params.r) || 3.4 });
      else if (g.meta.source && !g.open && !(g.type === 'kaeltefeld' && g.active)) P.source('tor-' + g.id, { rate: g.meta.source.rate, cap: g.meta.source.cap });
      g.zoneInside = true;
    }
    function leaveZone(g) {
      const P = game.puls; if (!P || !g.zoneInside) return;
      P.removeShelter('tor-' + g.id); P.removeSource('tor-' + g.id);
      g.zoneInside = false;
    }
    // Windschatten sind Senken-Zonen: das Puls-Plugin prüft selbst, ob die Figur drinsteht
    events.on('plugin:installed', (e) => { if (e && e.id === 'puls') for (const g of gates.values()) if (g.meta.shelter) game.puls.shelter('tor-' + g.id, { x: g.x, z: g.z, r: (g.def.params && g.def.params.r) || 3.4 }); });

    let t = 0;
    function tick(dt, tt) {
      t += dt;
      const p = player.position;
      const now = game.loop ? game.loop.realTime : 0;
      for (const g of gates.values()) {
        const d = Math.hypot(g.x - p.x, g.z - p.z);
        if (d < 70) { if (g.handle.update) g.handle.update(dt, tt, ctxFx); g.symbolSprite.sprite.position.y = (g.meta.height || 3) + 0.9 + Math.sin(tt * 1.6) * 0.12; }
        if (g.active && g.activeUntil && now > g.activeUntil) setActive(g, false);
        // Quellen-Zonen (Hitze, Orbs, Sturmfeld, Flüsterstein) wirken, solange man drinsteht
        if (g.meta.zone && !g.meta.shelter) {
          const r = (g.def.params && g.def.params.r) || 3.2;
          const inside = d <= r + 0.6 && Math.abs(p.y - g.y) < 4;
          if (inside && !g.zoneInside) enterZone(g); else if (!inside && g.zoneInside) leaveZone(g);
        }
        // Nähe an einem gesperrten Tor: Symbol erklären (höchstens alle 15 s je Tor)
        if (!g.open && d < 6 && now - g.nearT > 15 && game.started) {
          g.nearT = now;
          emit('gate:near', { id: g.id, open: false, symbol: g.symbol, type: g.type });
          if (game.ui && game.ui.toast) game.ui.toast(`Zu. Braucht: ${g.symbol.label}`, 2400);
          if (game.glimm && game.glimm.line) game.glimm.line('gate');
        }
      }
    }
    game.addUpdate((dt, tt) => { if (game.started) tick(dt, tt); }, { order: -14 });

    // ---- Gadgets und Mut greifen ein ----
    function setActive(g, on, seconds = 0) {
      g.active = !!on;
      g.activeUntil = on && seconds ? (game.loop ? game.loop.realTime : 0) + seconds : 0;
      if (g.handle.setActive) g.handle.setActive(on);
      if (g.type === 'kaeltefeld') {
        clearColliders(g);
        if (!on && !g.open && g.handle.collide) { const c = g.handle.collide(colliders, g.x, g.z, g.y, g.yaw); g.colliderRefs = Array.isArray(c) ? c : c ? [c] : []; }
        if (g.zoneInside && game.puls) { if (on) game.puls.removeSource('tor-' + g.id); else if (!g.open) game.puls.source('tor-' + g.id, { rate: g.meta.source.rate, cap: g.meta.source.cap }); }
        emit('gate:frozen', { id: g.id, frozen: on, seconds });
      }
      if (g.type === 'klangtor') { clearSurfaces(g); if (on && g.handle.surfaces) g.surfaceRefs = g.handle.surfaces(colliders, g.x, g.z, g.y, g.yaw) || []; emit('gate:klang', { id: g.id, on, seconds }); }
    }
    const within = (x, z, r, types) => [...gates.values()].filter((g) => types.includes(g.type) && Math.hypot(g.x - x, g.z - z) <= r);
    events.on('koffer:frost', (e) => { if (!e) return; for (const g of within(e.x, e.z, (e.r || 4) + 3, ['kaeltefeld'])) setActive(g, true, e.seconds || 12); });
    events.on('koffer:klang', (e) => { if (!e) return; for (const g of within(e.x, e.z, 14, ['klangtor'])) setActive(g, true, e.seconds || 6); });
    events.on('koffer:kopf', (e) => { if (!e) return; for (const g of within(e.x, e.z, e.r || 7, ['runentor', 'gezeitentuer'])) if (g.def.params && g.def.params.lock === 'kopf') open(g.id); });
    events.on('mut:klarklang', (e) => { if (!e || !e.clean) return; const p = player.position; for (const g of within(p.x, p.z, 14, ['klangtor'])) open(g.id); });
    events.on('mut:stopp', () => { const p = player.position; for (const g of within(p.x, p.z, 12, ['orbfeld'])) open(g.id); });
    events.on('gate:break', (e) => { if (e && e.id && gates.has(e.id)) open(e.id); });

    function open(id) { const g = gates.get(id); if (!g) return false; state.set('gates.' + id, true); applyState(g, true); return true; }
    function close(id) { const g = gates.get(id); if (!g) return false; state.set('gates.' + id, false); applyState(g, false); return true; }
    for (const key of ['abilities', 'upgrades', 'wege', 'gadgets', 'items', 'units', 'feathers', 'flags', 'gates', 'bonds', 'deeds', 'shards']) state.on(key, refresh);
    events.on('state:reset', refresh);
    events.on('gate:open', (e) => { if (e && e.id && gates.has(e.id)) applyState(gates.get(e.id), true); });
    events.on('gate:close', (e) => { if (e && e.id && gates.has(e.id)) applyState(gates.get(e.id), false); });

    // ---- Tore aus den Regionen, dann die Standard-Tore (nur, wenn die ID noch frei ist) ----
    for (const region of content.list('regions')) for (const gd of region.gates || []) add({ ...gd, region: region.id });
    for (const gd of DEFAULT_GATES) if (!gates.has(gd.id)) add(gd);

    const api = {
      list: () => [...gates.values()].map((g) => ({ id: g.id, type: g.type, open: g.open, x: g.x, z: g.z, region: g.def.region || null, symbol: g.symbol, active: g.active })),
      get: (id) => gates.get(id) || null,
      add, remove, open, close, refresh,
      isOpen: (id) => { const g = gates.get(id); return g ? !!g.open : null; },
      symbolFor: (id) => { const g = gates.get(id); return g ? g.symbol : null; },
      needsFor: (id) => { const g = gates.get(id); return g ? needsFor(g.def) : null; },
      near: (radius = 8) => { const p = player.position; return [...gates.values()].filter((g) => Math.hypot(g.x - p.x, g.z - p.z) <= radius).map((g) => g.id); },
      setActive: (id, on, seconds) => { const g = gates.get(id); if (g) setActive(g, on, seconds); return !!g; },
      evalCond: cond, root, TYPES: GATE_TYPES, META: GATE_META, DEFAULT_GATES,
    };
    game.gates = api;
    const D = game.debug || (game.debug = {});
    D.gates = () => api.list();
    D.gateInfo = (id) => { const g = gates.get(id); return g ? { id: g.id, type: g.type, open: g.open, needs: needsFor(g.def), symbol: g.symbol, colliders: g.colliderRefs.length, surfaces: g.surfaceRefs.length, active: g.active, zoneInside: g.zoneInside, x: g.x, z: g.z } : null; };
    D.openGate = (id) => open(id);
    D.closeGate = (id) => close(id);
    return api;
  },
};

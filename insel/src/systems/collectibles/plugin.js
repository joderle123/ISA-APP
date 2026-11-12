// Sammelsachen (WP42, DESIGN §9): Lichtsplitter (instanziert, glitzern auch im Grau), Erinnerungsmuscheln, Aussichtspunkte
// (8 s stillstehen → Kartenstück und versteckte Splitter), Nebelkerne und Knobel-Tafeln (Marker mit Interaktion; WP36+
// füllen die Rätsel). Standard-Positionen aus defaults.js, Inhalte unter content/collectibles/* ergänzen sie.
//   game.plugins.collectibles → { items, get(id), isCollected(id), isVisible(id), collect(id, { silent }), count(type),
//     total(type), stats(), nearest(x, z, type), list(type, { zone, open }), refresh(), aussicht: { active, progress },
//     solveKern(id), knobel(id), COUNTS }
//   Ereignisse: collect {id, type, zone, count, total} · aussicht:start {id} · aussicht:found {id, name, x, z} · collectibles:refresh
//   Spielstand: collectibles.<id> = Tag · lichtsplitter = Anzahl (Kosmetik-Quelle)
//   Debug: LUMO.debug.collect(id) · collectAll(type) · collectibles() · aussicht(id)
import * as THREE from 'three';
import { generateDefaults, mergeCollectibles, countByType, COUNTS } from './defaults.js';
import { evalCond } from '../session/logic.js';

const CSS = `
.ap-ring{position:absolute;left:50%;top:38%;width:96px;height:96px;margin:-48px 0 0 -48px;pointer-events:none;z-index:9;opacity:0;transition:opacity .3s ease}
.ap-ring.is-on{opacity:1}
.ap-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
.ap-ring circle{fill:none;stroke-width:7;stroke-linecap:round}
.ap-ring .bg{stroke:rgba(255,255,255,.22)}
.ap-ring .fg{stroke:#2de2c9;stroke-dasharray:264;stroke-dashoffset:264;transition:stroke-dashoffset .12s linear}
.ap-ring span{position:absolute;inset:0;display:grid;place-items:center;color:#fff;font:900 15px/1 system-ui,sans-serif;letter-spacing:.06em;text-shadow:0 2px 6px #000}
`;

export default {
  id: 'collectibles', order: 44, deps: ['props', 'welt'],
  install(game) {
    const { events, state, content, player, scene, world } = game;
    const island = world.island;
    const emit = (n, p) => events.emit(n, p);
    const { part, merge } = game.geom;
    const M = game.props.materials;
    const day = () => Number(state.get('time.day', 1)) || 1;
    const collected = () => state.get('collectibles') || {};
    const isCollected = (id) => !!collected()[id];
    const cond = (c) => evalCond(c, { state, hour: () => game.time.hour, regionFreed: (id) => { const v = world.veil.zoneValue(id); return v !== null ? v < 0.5 : false; } });

    // ---- Definitionen ----
    const zones = island.ZONES.map((z) => ({ id: z.id, x: z.x, z: z.z, r: z.r, spawn: z.spawn }));
    const defaults = generateDefaults({ zones, heightAt: island.getHeight, walkable: island.isWalkable, waterLevel: island.waterLevel });
    const items = mergeCollectibles(defaults, content.list('collectibles'));
    const byId = new Map(items.map((it) => [it.id, it]));
    const worldY = (it) => { const p = it.pos; const g = Math.max(island.getHeight(p.x, p.z), island.waterLevel ? island.waterLevel(p.x, p.z) : 0); return g + (p.y || 0); };
    const visible = new Map();   // id → bool (Bedingung erfüllt und nicht eingesammelt)
    function computeVisible() {
      let changed = false;
      for (const it of items) {
        const v = !isCollected(it.id) && (!it.needs || cond(it.needs));
        if (visible.get(it.id) !== v) { visible.set(it.id, v); changed = true; }
      }
      return changed;
    }

    // ---- Geometrien ----
    const root = new THREE.Group(); root.name = 'sammelsachen'; scene.add(root);
    const shardGeo = merge([
      part(new THREE.OctahedronGeometry(0.26, 0), { pos: [0, 0.75, 0], scale: [0.7, 1.7, 0.7], color: '#fff6b0' }),
      part(new THREE.OctahedronGeometry(0.12, 0), { pos: [0.22, 0.55, 0.1], scale: [0.7, 1.4, 0.7], color: '#ffe066' }),
    ]);
    const shellGeo = merge([
      part(new THREE.ConeGeometry(0.34, 0.22, 7, 1), { pos: [0, 0.11, 0], rot: [0, 0.3, 0], scale: [1, 1, 0.75], color: '#ffd8e8' }),
      part(new THREE.IcosahedronGeometry(0.09, 0), { pos: [0, 0.2, 0.05], color: '#e8fbff' }),
    ]);
    const shardMat = M.glow('#fff1a0', { intensity: 0.95, veil: false });
    const shellMat = M.glow('#ffd0ea', { intensity: 0.35, veil: false });
    const shards = items.filter((it) => it.type === 'lichtsplitter');
    const shells = items.filter((it) => it.type === 'muschel');
    const shardMesh = new THREE.InstancedMesh(shardGeo, shardMat, Math.max(1, shards.length));
    const shellMesh = new THREE.InstancedMesh(shellGeo, shellMat, Math.max(1, shells.length));
    for (const m of [shardMesh, shellMesh]) { m.instanceMatrix.setUsage(THREE.DynamicDrawUsage); m.frustumCulled = false; m.castShadow = false; root.add(m); }
    const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _p = new THREE.Vector3(), _s = new THREE.Vector3(), _e = new THREE.Euler();
    function placeInstances(mesh, list, t, near) {
      for (let i = 0; i < list.length; i++) {
        const it = list[i];
        const on = visible.get(it.id);
        if (!on) { _s.set(0, 0, 0); _p.set(0, -50, 0); _q.identity(); }
        else {
          const y = worldY(it);
          const anim = near ? near(it) : true;
          _p.set(it.pos.x, y + (anim ? Math.sin(t * 2.1 + i) * 0.08 : 0), it.pos.z);
          _e.set(0, anim ? t * 1.3 + i : i, 0); _q.setFromEuler(_e);
          _s.set(1, 1, 1);
        }
        _m.compose(_p, _q, _s); mesh.setMatrixAt(i, _m);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
    // Feste Marker (Aussichtspunkte, Nebelkerne, Tafeln): je Typ ein Mesh, neu gebacken bei Sichtbarkeitswechsel
    const baked = { aussicht: null, nebelkern: null, knobel: null };
    function bakeStatic() {
      for (const type of Object.keys(baked)) {
        if (baked[type]) { root.remove(baked[type]); baked[type].geometry.dispose(); baked[type] = null; }
        const parts = [];
        for (const it of items) {
          if (it.type !== type || !(visible.get(it.id) || (type === 'aussicht' && isCollected(it.id) && (!it.needs || cond(it.needs))))) continue;
          const x = it.pos.x, z = it.pos.z, y = worldY(it);
          const found = isCollected(it.id);
          if (type === 'aussicht') {
            parts.push(part(new THREE.TorusGeometry(1.5, 0.09, 6, 18), { pos: [x, y + 0.08, z], rot: [Math.PI / 2, 0, 0], color: found ? '#2de2c9' : '#a9f5ea' }));
            for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + 0.4; parts.push(part(new THREE.CylinderGeometry(0.06, 0.09, 0.7, 5), { pos: [x + Math.cos(a) * 1.5, y + 0.35, z + Math.sin(a) * 1.5], color: found ? '#2de2c9' : '#7fe0d6' })); }
            parts.push(part(new THREE.OctahedronGeometry(0.2, 0), { pos: [x, y + 1.25, z], color: found ? '#ffffff' : '#2de2c9' }));
          } else if (type === 'nebelkern') {
            parts.push(part(new THREE.IcosahedronGeometry(0.95, 1), { pos: [x, y + 1.0, z], color: '#5a5870', faceVar: 0.25, seed: 3 }));
            for (let k = 0; k < 5; k++) { const a = k * 1.256, r = 1.3 + (k % 2) * 0.3; parts.push(part(new THREE.IcosahedronGeometry(0.28 + (k % 3) * 0.08, 0), { pos: [x + Math.cos(a) * r, y + 0.5 + (k % 3) * 0.45, z + Math.sin(a) * r], color: '#3d3b52' })); }
          } else if (type === 'knobel') {
            parts.push(part(new THREE.BoxGeometry(1.0, 1.25, 0.14), { pos: [x, y + 0.7, z], rot: [-0.12, 0.6, 0], color: '#6b5a4a', faceVar: 0.12, seed: 2 }));
            parts.push(part(new THREE.BoxGeometry(0.76, 0.9, 0.04), { pos: [x, y + 0.78, z + 0.08], rot: [-0.12, 0.6, 0], color: '#ffd166' }));
          }
        }
        if (!parts.length) continue;
        const mesh = new THREE.Mesh(merge(parts), type === 'nebelkern' ? M.base : M.glow(type === 'aussicht' ? '#2de2c9' : '#ffd166', { intensity: 0.45 }));
        mesh.castShadow = false; mesh.receiveShadow = false;
        root.add(mesh);
        baked[type] = mesh;
      }
    }

    // ---- Interaktionen für Nebelkerne und Tafeln ----
    const inter = new Map();
    function syncInteractions() {
      if (!game.interactions) return;
      for (const it of items) {
        if (it.type !== 'nebelkern' && it.type !== 'knobel') continue;
        const on = !!visible.get(it.id);
        const cur = inter.get(it.id);
        if (on && !cur) {
          const h = game.interactions.add({ id: 'sammel-' + it.id, x: it.pos.x, z: it.pos.z, radius: 3, label: it.type === 'nebelkern' ? 'Nebelkern' : 'Tafel', priority: 0, onAction: () => onMarker(it) });
          inter.set(it.id, h);
        } else if (!on && cur) { cur.remove(); inter.delete(it.id); }
      }
    }
    function onMarker(it) {
      const ev = { id: it.id, type: it.type, handled: false };
      emit('collectible:interact', ev);
      if (ev.handled) return;
      if (game.audio) game.audio.play('click');
      if (game.ui && game.ui.glimm) game.ui.glimm(it.type === 'nebelkern' ? 'Grau und fest. Später.' : 'Eine Tafel. Kommt bald.');
    }

    // ---- Sammeln ----
    function collect(id, { silent = false } = {}) {
      const it = byId.get(id);
      if (!it || isCollected(id)) return false;
      state.set('collectibles.' + id, day());
      if (it.type === 'lichtsplitter') state.set('lichtsplitter', api.count('lichtsplitter'));
      visible.set(id, false);
      const count = api.count(it.type), total = api.total(it.type);
      if (!silent) {
        if (game.audio) game.audio.play(it.type === 'muschel' ? 'chime' : 'pickup');
        if (game.particles) game.particles.emit({ x: it.pos.x, y: worldY(it) + 0.8, z: it.pos.z, count: 18, spread: 0.4, speed: 2.2, up: 1.4, color: it.type === 'muschel' ? '#ffd0ea' : '#fff1a0', size: 2.2, life: 0.9, gravity: -2, drag: 2, additive: true });
        if (game.ui && game.ui.toast) {
          if (it.type === 'lichtsplitter' && (count % 5 === 0 || count === 1)) game.ui.toast(`Lichtsplitter: ${count} von ${total}`);
          else if (it.type === 'muschel') game.ui.toast(`Erinnerungsmuschel ${count} von ${total}`);
          else if (it.type === 'aussicht') game.ui.toast(`Aussichtspunkt: ${it.name || it.id}`);
        }
      }
      if (it.type === 'aussicht') { computeVisible(); bakeStatic(); syncInteractions(); }
      if (it.type === 'nebelkern' || it.type === 'knobel') { bakeStatic(); syncInteractions(); }
      emit('collect', { id, type: it.type, zone: it.zone, count, total, x: it.pos.x, z: it.pos.z });
      return true;
    }

    // ---- Aussichtspunkt: 8 Sekunden stillstehen ----
    const AP_SECONDS = 8;
    let ap = null;   // { it, t, grace }
    let ring = null, ringFg = null, ringTxt = null;
    function ensureRing() {
      if (ring || typeof document === 'undefined' || !game.ui || !game.ui.root) return;
      const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
      ring = document.createElement('div'); ring.className = 'ap-ring'; ring.dataset.apRing = '1';
      ring.innerHTML = '<svg viewBox="0 0 96 96"><circle class="bg" cx="48" cy="48" r="42"/><circle class="fg" cx="48" cy="48" r="42"/></svg><span></span>';
      game.ui.root.appendChild(ring);
      ringFg = ring.querySelector('.fg'); ringTxt = ring.querySelector('span');
    }
    function apUpdate(dt) {
      const p = player.position;
      let near = null;
      for (const it of items) {
        if (it.type !== 'aussicht' || !visible.get(it.id)) continue;
        const d = Math.hypot(p.x - it.pos.x, p.z - it.pos.z);
        if (d < 3.4 && Math.abs(p.y - worldY(it)) < 3) { near = it; break; }
      }
      const still = near && player.speed < 0.2 && player.grounded && !(game.ui && game.ui.lock && game.ui.lock.active);
      if (near && (!ap || ap.it !== near)) { ap = { it: near, t: 0, grace: 0 }; emit('aussicht:start', { id: near.id }); if (game.ui && game.ui.glimm) game.ui.glimm('Bleib kurz. Schau.'); }
      if (!near) { if (ap) { ap = null; if (ring) ring.classList.remove('is-on'); } return; }
      if (still) { ap.t += dt; ap.grace = 0; } else { ap.grace += dt; if (ap.grace > 0.6) ap.t = 0; }
      ensureRing();
      if (ring) { ring.classList.toggle('is-on', ap.t > 0.2); const k = Math.min(1, ap.t / AP_SECONDS); if (ringFg) ringFg.style.strokeDashoffset = String(264 * (1 - k)); if (ringTxt) ringTxt.textContent = String(Math.ceil(AP_SECONDS - ap.t)); }
      if (ap.t >= AP_SECONDS) {
        const it = ap.it; ap = null;
        if (ring) ring.classList.remove('is-on');
        collect(it.id);
        if (game.cameraRig && game.cameraRig.shake) game.cameraRig.shake(0.15, 0.4);
        emit('aussicht:found', { id: it.id, name: it.name || it.id, x: it.pos.x, z: it.pos.z, zone: it.zone });
      }
    }

    // ---- Schleife ----
    let t = 0, pickT = 0, condT = 0;
    game.addUpdate((dt) => {
      if (!game.started || (game.scenes && game.scenes.isInterior)) return;
      t += dt;
      const p = player.position;
      const near = (it) => Math.hypot(it.pos.x - p.x, it.pos.z - p.z) < 60;
      placeInstances(shardMesh, shards, t, near);
      placeInstances(shellMesh, shells, t, near);
      pickT -= dt;
      if (pickT <= 0) {
        pickT = 0.12;
        for (const it of items) {
          if ((it.type !== 'lichtsplitter' && it.type !== 'muschel') || !visible.get(it.id)) continue;
          const dx = it.pos.x - p.x, dz = it.pos.z - p.z;
          if (dx * dx + dz * dz > 2.4) continue;
          if (Math.abs(worldY(it) - p.y) > 2.6) continue;
          collect(it.id);
        }
      }
      apUpdate(dt);
      condT -= dt;
      if (condT <= 0) { condT = 1.5; if (computeVisible()) { bakeStatic(); syncInteractions(); emit('collectibles:refresh', {}); } }
    }, { order: -7 });

    const api = {
      COUNTS, items,
      get: (id) => byId.get(id) || null,
      isCollected, isVisible: (id) => !!visible.get(id),
      collect,
      count(type) { const c = collected(); return items.filter((it) => (!type || it.type === type) && c[it.id]).length; },
      total(type) { return items.filter((it) => !type || it.type === type).length; },
      stats() { const c = countByType(items); const out = {}; for (const k of Object.keys(c)) out[k] = { found: api.count(k), total: c[k] }; return out; },
      list(type, { zone, open } = {}) { return items.filter((it) => (!type || it.type === type) && (!zone || it.zone === zone) && (!open || (visible.get(it.id) && !isCollected(it.id)))); },
      nearest(x, z, type = 'lichtsplitter') { let best = null, bd = Infinity; for (const it of items) { if (it.type !== type || !visible.get(it.id)) continue; const d = Math.hypot(it.pos.x - x, it.pos.z - z); if (d < bd) { bd = d; best = it; } } return best ? { id: best.id, x: best.pos.x, z: best.pos.z, dist: bd, type } : null; },
      refresh() { computeVisible(); bakeStatic(); syncInteractions(); },
      solveKern(id) { const it = byId.get(id); return !!it && it.type === 'nebelkern' && collect(id); },
      knobel(id) { const it = byId.get(id); return !!it && it.type === 'knobel' && collect(id); },
      aussicht: { get active() { return ap ? ap.it.id : null; }, get progress() { return ap ? Math.min(1, ap.t / AP_SECONDS) : 0; }, SECONDS: AP_SECONDS },
      worldY,
    };

    computeVisible(); bakeStatic(); syncInteractions();
    placeInstances(shardMesh, shards, 0); placeInstances(shellMesh, shells, 0);
    for (const ev of ['state:reset', 'unit:unlock', 'unit:complete', 'ability:grant', 'veil:restored']) events.on(ev, () => api.refresh());
    state.on('collectibles', () => { if (state.get('lichtsplitter') !== api.count('lichtsplitter')) state.set('lichtsplitter', api.count('lichtsplitter')); });

    const D = game.debug || (game.debug = {});
    D.collect = (id) => collect(id);
    D.collectAll = (type) => { let n = 0; for (const it of items) if ((!type || it.type === type) && collect(it.id, { silent: true })) n++; api.refresh(); return n; };
    D.collectibles = () => api.stats();
    D.aussicht = (id) => { const it = byId.get(id); if (!it) return false; collect(it.id); emit('aussicht:found', { id: it.id, name: it.name || it.id, x: it.pos.x, z: it.pos.z, zone: it.zone }); return true; };
    return api;
  },
};

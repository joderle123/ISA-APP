// Bergen-Plugin (BAUPLAN §2.1 A3): 10 feste Kisten im Schären-Sektor, Haken vom Boot aus, 4 Materialien.
//   · Aktion halten in 2 m Reichweite (ab Bordwand): Die Leine spannt sich, die Kiste kommt längsseits (0,9 s).
//     Loslassen zu früh oder Wurf zu kurz: Die Kiste treibt ein Stück weiter. Sonst passiert nichts.
//   · Wrack-Kisten liegen hinter der Nebelwand (erst mit Laterne), die Klippen-Kiste auf dem Vorsprung der Möwenklippe.
//   · Jeder Fund wird sofort gespeichert (abgeschlossener Schritt). Materialzähler: kielpost-HUD.
//   Spielstand: bergen { gefunden[], material{ holz, tau, tuch, metall } }
//   Ereignisse: bergen:haken {id} · bergen:fund {id, material} · bergen:fehl {id, why}
//   game.plugins.bergen → { funde, nearest({ fogOpen, kind }), posOf(id), found(id), collect(id), inReach() }
//   Debug: LUMO.debug.bergen.{ collect(id), nearest(), goTo(id) (Boot neben die Kiste setzen) }
import * as THREE from 'three';
import { part, merge } from '../../world/geom.js';
import { fundorte, fundPos, nearestFund, missDrift, addMaterials, gapTo, HOOK, isOpen } from './model.js';

export default {
  id: 'bergen', order: 66.6, deps: ['kielpost'],
  install(game) {
    const { events, state, player, ui, world, scene, particles, audio, content, interactions } = game;
    const kp = game.plugins.kielpost;
    const def = content.get('bergen', 'hafen');
    const funde = fundorte(def);
    const TEILE = content.get('boot', 'teile') || { materialien: [] };
    const matName = Object.fromEntries((TEILE.materialien || []).map((m) => [m.id, m.name]));
    const drifts = {};
    const got = () => state.get('bergen.gefunden', []) || [];
    const fogOpen = () => !!state.get('boot.nebel.wrackbank');
    let t = 0;

    // ---- Kisten: gemeinsame Geometrie, je Fund ein Mesh (10 Stück) ----
    const crateGeo = merge([
      part(new THREE.BoxGeometry(0.9, 0.7, 0.9), { color: '#a8743f', faceVar: 0.12, seed: 4 }),
      part(new THREE.BoxGeometry(0.94, 0.1, 0.94), { pos: [0, 0.2, 0], color: '#5a3a20' }),
      part(new THREE.BoxGeometry(0.94, 0.1, 0.94), { pos: [0, -0.2, 0], color: '#5a3a20' }),
      part(new THREE.BoxGeometry(0.3, 0.3, 0.02), { pos: [0, 0.05, 0.47], color: '#f2c14e' }),
    ]);
    const mat = game.materials.lambertVC('bergen-kiste');
    const group = new THREE.Group(); group.name = 'bergen';
    // Alle Kisten in EINEM InstancedMesh (ein Draw-Call); je Fund ein Object3D als Platzhalter für Lage und Sichtbarkeit
    const inst = new THREE.InstancedMesh(crateGeo, mat, funde.length);
    inst.castShadow = true; inst.name = 'bergen-kisten'; inst.frustumCulled = false;
    group.add(inst);
    const meshes = {};
    for (const f of funde) meshes[f.id] = new THREE.Object3D();
    const _zero = new THREE.Matrix4().makeScale(0, 0, 0);
    function syncInstances() {
      funde.forEach((f, i) => { const o = meshes[f.id]; if (o.visible) { o.updateMatrix(); inst.setMatrixAt(i, o.matrix); } else inst.setMatrixAt(i, _zero); });
      inst.instanceMatrix.needsUpdate = true;
    }
    // Ring um die Kiste in Reichweite (zeigt: jetzt Haken!)
    const ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 1.3, 0.5), transparent: true, opacity: 0.8, depthWrite: false, toneMapped: false });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.06, 4, 24), ringMat);
    ring.rotation.x = Math.PI / 2; ring.visible = false; group.add(ring);
    // Leine vom Boot zur Kiste (spannt sich beim Ziehen)
    const LN = 10;
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(LN * 3), 3));
    const lineMesh = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: '#f0e2b8' }));
    lineMesh.frustumCulled = false; lineMesh.visible = false; group.add(lineMesh);
    scene.add(group);

    const posOf = (id, out = {}) => { const f = funde.find((x) => x.id === id); return f ? fundPos(f, t, drifts[id], out) : null; };
    function syncVisible() { const g = new Set(got()); for (const f of funde) meshes[f.id].visible = !g.has(f.id); }
    syncVisible();
    state.on('bergen', syncVisible);
    events.on('state:reset', () => { for (const k of Object.keys(drifts)) delete drifts[k]; syncVisible(); });
    if (game.save && game.save.onApply) game.save.onApply(syncVisible);

    const boatXZ = () => ({ x: kp.boat.x, z: kp.boat.z });
    function nearest({ fogOpen: fo = fogOpen(), kind = null } = {}) {
      const list = kind ? funde.filter((f) => f.kind === kind) : funde;
      return nearestFund(list, got(), boatXZ(), t, drifts, { fogOpen: fo });
    }

    let fundToast = null;   // { el, sum, until } des letzten Fund-Toasts
    function collect(id, { silent = false } = {}) {
      const f = funde.find((x) => x.id === id);
      if (!f || got().includes(id)) return false;
      state.addUnique('bergen.gefunden', id);
      state.set('bergen.material', addMaterials(state.get('bergen.material', {}), f.material));
      meshes[id].visible = false;
      if (!silent) {
        const p = kp.boat;
        audio.play('pickup');
        particles.emit({ x: p.x, y: p.y + 1.2, z: p.z, count: 22, spread: 0.6, up: 2.2, speed: 2, color: '#ffd166', size: 0.15, life: 1, gravity: -1.5, drag: 1.4, additive: true });
        // Mehrere Funde kurz hintereinander: EIN Sammel-Toast statt gestapelter Banner (ruhiger, nichts wirkt „falsch“)
        const nowMs = Date.now();
        const sum = fundToast && fundToast.el && fundToast.el.isConnected && nowMs < fundToast.until ? addMaterials(fundToast.sum, f.material) : { ...f.material };
        if (fundToast && fundToast.el) fundToast.el.remove();
        const txt = Object.entries(sum).filter(([, v]) => v > 0).map(([k, v]) => `+${v} ${matName[k] || k}`).join('  ');
        fundToast = { sum, until: nowMs + 2000, el: ui.toast ? ui.toast(txt, 2200) : null };
        if (f.kind === 'klippe') world.schaeren.gullUp(f.x, f.z);
      }
      events.emit('bergen:fund', { id, material: { ...f.material } });
      if (game.save && game.save.request) game.save.request('force');   // Fund = abgeschlossener Schritt
      return true;
    }

    // ---- Haken: Aktion halten ----
    const hook = { phase: 'idle', id: null, k: 0, t: 0, from: new THREE.Vector3(), to: new THREE.Vector3() };
    let prevHeld = false, tipT = 0;
    const hakenItem = interactions.add({ id: 'bergen-haken', x: () => player.position.x, z: () => player.position.z, radius: 1, label: 'Haken', priority: 3, enabled: false, onAction: () => {} });
    function miss(id, why) {
      const f = funde.find((x) => x.id === id);
      if (f) drifts[id] = missDrift(f, drifts[id], boatXZ(), t);
      const p = posOf(id) || hook.to;
      audio.play('splash');
      particles.emit({ x: p.x, y: 0.1, z: p.z, count: 10, spread: 0.5, speed: 1.6, up: 2.2, color: 0xeafcff, size: 0.35, life: 0.6, gravity: -8, drag: 1, alpha: 0.8 });
      events.emit('bergen:fehl', { id, why });
    }
    function drawLine(sag) {
      const a = lineGeo.attributes.position;
      for (let i = 0; i < LN; i++) {
        const u = i / (LN - 1);
        const x = hook.from.x + (hook.to.x - hook.from.x) * u, z = hook.from.z + (hook.to.z - hook.from.z) * u;
        const y = hook.from.y + (hook.to.y - hook.from.y) * u - Math.sin(u * Math.PI) * sag;
        a.setXYZ(i, x, y, z);
      }
      a.needsUpdate = true;
    }
    const _p = {};
    game.addUpdate((dt) => {
      t += dt;
      // Kisten schaukeln
      for (const f of funde) {
        const m = meshes[f.id];
        if (!m.visible) continue;
        if (hook.phase === 'ziehen' && hook.id === f.id) continue;
        fundPos(f, t, drifts[f.id], _p);
        const bob = f.kind === 'klippe' ? 0 : Math.sin(t * 1.6 + f.index) * 0.08;
        m.position.set(_p.x, (f.kind === 'klippe' ? _p.y + 0.35 : 0.12) + bob, _p.z);
        m.rotation.set(Math.sin(t * 0.9 + f.index) * 0.08, f.index * 0.7 + t * 0.05, Math.cos(t * 1.1 + f.index) * 0.07);
      }
      const on = kp.onBoat;
      const n = on ? nearest() : null;
      const inReach = !!(n && n.gap <= HOOK.reach);
      hakenItem.enabled = on && inReach && hook.phase === 'idle';
      ring.visible = inReach && hook.phase === 'idle';
      if (ring.visible) { ring.position.set(n.pos.x, 0.25 + (n.fund.kind === 'klippe' ? n.pos.y : 0), n.pos.z); ring.scale.setScalar(1 + Math.sin(t * 5) * 0.08); }
      tipT = Math.max(0, tipT - dt);
      syncInstances();
      if (!on) { hook.phase = 'idle'; lineMesh.visible = false; prevHeld = false; return; }
      const held = !!player.intent.actionHeld;
      const pressed = held && !prevHeld;
      prevHeld = held;
      const b = kp.boat;
      const side = { x: b.x + Math.cos(b.yaw) * 0.9, z: b.z - Math.sin(b.yaw) * 0.9 };
      hook.from.set(side.x, b.y + 1.0, side.z);
      if (hook.phase === 'idle' && pressed && n) {
        if (inReach) { hook.phase = 'ziehen'; hook.id = n.fund.id; hook.k = 0; audio.play('greifen'); events.emit('bergen:haken', { id: hook.id }); }
        else if (n.gap <= HOOK.near) {
          // Wurf zu kurz: Haken platscht vor die Kiste, die treibt ein Stück weiter
          hook.phase = 'fehlwurf'; hook.id = n.fund.id; hook.t = 0;
          const dx = n.pos.x - side.x, dz = n.pos.z - side.z, l = Math.hypot(dx, dz) || 1;
          hook.to.set(side.x + dx / l * Math.min(l - 1, HOOK.hull + HOOK.reach + 0.5), 0, side.z + dz / l * Math.min(l - 1, HOOK.hull + HOOK.reach + 0.5));
          audio.play('whoosh', { duration: 0.4 });
        } else if (tipT <= 0 && n.gap < 25 && ui.glimm) { tipT = 12; ui.glimm('Näher ran!', { seconds: 1.8 }); }
      }
      if (hook.phase === 'fehlwurf') {
        hook.t += dt;
        lineMesh.visible = true; drawLine(0.8 * Math.min(1, hook.t * 3));
        if (hook.t > 0.45 && hook.t - dt <= 0.45) miss(hook.id, 'kurz');
        if (hook.t > 0.8) { hook.phase = 'idle'; lineMesh.visible = false; }
      } else if (hook.phase === 'ziehen') {
        const f = funde.find((x) => x.id === hook.id);
        const m = meshes[hook.id];
        if (!held) { hook.phase = 'idle'; lineMesh.visible = false; miss(hook.id, 'losgelassen'); return; }
        hook.k = Math.min(1, hook.k + dt / HOOK.pull);
        fundPos(f, t, drifts[f.id], _p);
        // Kiste kommt längsseits
        const k = hook.k * hook.k;
        const tx = side.x + Math.cos(b.yaw) * 0.5, tz = side.z - Math.sin(b.yaw) * 0.5;
        m.position.set(_p.x + (tx - _p.x) * k, (f.kind === 'klippe' ? _p.y + 0.35 : 0.12) * (1 - k) + (b.y + 0.3) * k, _p.z + (tz - _p.z) * k);
        hook.to.copy(m.position);
        lineMesh.visible = true; drawLine((1 - hook.k) * 0.6);
        if (Math.random() < dt * 4) audio.play('click');
        if (hook.k >= 1) { const id = hook.id; hook.phase = 'idle'; lineMesh.visible = false; collect(id); }
      }
      syncInstances();
    }, { order: -44 });

    const D = game.debug || (game.debug = {});
    D.bergen = {
      collect: (id) => collect(id),
      nearest: () => { const n = nearest(); return n ? { id: n.fund.id, gap: +n.gap.toFixed(2), x: +n.pos.x.toFixed(2), z: +n.pos.z.toFixed(2) } : null; },
      // Boot längsseits neben eine Kiste setzen (Szenarien): Abstand ab Bordwand ≈ 1 m
      goTo: (id) => {
        const f = funde.find((x) => x.id === id); if (!f) return null;
        const p = posOf(id);
        const r = Math.hypot(p.x, p.z) || 1;
        let ax = -p.x / r, az = -p.z / r;   // von der Kiste Richtung Insel
        if (f.kind === 'klippe') { const c = world.schaeren.SCHAEREN.moewenklippe; const dx = p.x - c.x, dz = p.z - c.z, l = Math.hypot(dx, dz) || 1; ax = dx / l; az = dz / l; }
        const d = HOOK.hull + 1.0 + (f.kind === 'klippe' ? 0.5 : 0);
        kp.boat.place(p.x + ax * d, p.z + az * d, Math.atan2(-az, ax));
        return { x: kp.boat.x, z: kp.boat.z, gap: +gapTo(boatXZ(), posOf(id)).toFixed(2) };
      },
      info: () => ({ gefunden: got(), material: state.get('bergen.material', {}), phase: hook.phase }),
    };
    return { funde, nearest, posOf, found: (id) => got().includes(id), collect, isOpen: (f) => isOpen(f, { fogOpen: fogOpen() }), get hook() { return { phase: hook.phase, id: hook.id, k: hook.k }; } };
  },
};

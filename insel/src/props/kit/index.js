// Requisiten-Baukasten (WP43): prozedurale, schleierfähige Props aus geom.js.
//   const kit = createPropKit({ veil, island, colliders, particles, rng, scene });
//   kit.make('laterne', { variant: 'papier', color }) → Handle { group, type, update?, api…, collide? }   (nicht in der Szene)
//   kit.spawn('signalfeuer', { id, x, z, y?, yaw, onGround, collide, ...opts }) → Handle + remove()   (in der Szene, animiert, mit Kollider)
//   kit.bake([{ type, x, z, yaw, ...opts }], { id, castShadow }) → { group, handles, remove() }   feste Teile zu einem Mesh je Material verschmolzen
//   kit.gallery({ x, z, spacing }) → alle Typen in einer Reihe (Screenshots)   ·   kit.update(dt, t)   ·   kit.triangles(handle)
//   Typen: signalfeuer laterne tank marktstand fluesterstein kristall planke bohlenweg windrad drachen menhir orgel
//          glimmerinsel glimmerkugel vogel grisel titan
//          haus kiosk wimpelkette kisten fass boje netz ruderboot bank blumenkuebel brunnen pflaster fels (gebaeude.js, §9.2)
import * as THREE from 'three';
import { createMaterials } from './materials.js';
import * as B from './builders.js';
import * as GB from './gebaeude.js';
import { vogel, BIRDS, BIRD_EMOTIONS } from './birds.js';
import { grisel, titan } from './creatures.js';
import { mulberry32 } from '../../world/noise.js';

export const BUILDERS = {
  signalfeuer: B.signalfeuer, laterne: B.laterne, tank: B.tank, marktstand: B.marktstand, fluesterstein: B.fluesterstein,
  kristall: B.kristall, planke: B.planke, bohlenweg: B.bohlenweg, windrad: B.windrad, drachen: B.drachen, menhir: B.menhir,
  orgel: B.orgel, glimmerinsel: B.glimmerinsel, glimmerkugel: B.glimmerkugel, vogel, grisel, titan,
  haus: GB.haus, kiosk: GB.kiosk, wimpelkette: GB.wimpelkette, kisten: GB.kisten, fass: GB.fass, boje: GB.boje, netz: GB.netz,
  ruderboot: GB.ruderboot, bank: GB.bank, blumenkuebel: GB.blumenkuebel, brunnen: GB.brunnen, pflaster: GB.pflaster, fels: GB.fels,
};
export { HAUS_WAENDE, HAUS_AKZENTE, HAUS_DIM } from './gebaeude.js';
export const PROP_TYPES = Object.keys(BUILDERS);
export { BIRDS, BIRD_EMOTIONS };
export const NEED_COLORS = B.NEED_COLORS;
export const TRI_BUDGET = B.TRI_BUDGET;

function fallbackRng(seed = 9) {
  const r = mulberry32(seed);
  return { next: r, float: (a, b) => a + r() * (b - a), int: (a, b) => a + Math.floor(r() * (b - a + 1)), pick: (arr) => arr[Math.floor(r() * arr.length)], chance: (p) => r() < p, fork: () => fallbackRng(seed + 1) };
}

export function triangleCount(obj) {
  let n = 0;
  obj.traverse((o) => { if (o.isMesh && o.geometry) { const g = o.geometry; n += g.index ? g.index.count / 3 : g.attributes.position.count / 3; } });
  return n;
}

export function createPropKit({ veil = null, island = null, colliders = null, particles = null, rng = null, scene = null, focus = null } = {}) {
  const M = createMaterials(veil);
  const R = rng && rng.fork ? rng.fork('props') : fallbackRng(9);
  const K = { M, R, island, THREE };
  const root = new THREE.Group();
  root.name = 'props';
  if (scene) scene.add(root);
  const spawned = new Map();   // id → handle
  let nextId = 1;
  const _wp = new THREE.Vector3();
  const ctx = {
    particles,
    worldPos(g) { return g.getWorldPosition(_wp); },
    near(g, dist) { const f = focus ? focus() : null; if (!f) return true; const p = g.getWorldPosition(_wp); return Math.hypot(p.x - f.x, p.z - f.z) < dist; },
  };

  function make(type, opts = {}) {
    const b = BUILDERS[type];
    if (!b) throw new Error('Unbekannte Requisite: ' + type);
    const h = b(opts, K);
    h.type = h.type || type;
    h.opts = opts;
    h.group.name = 'prop-' + type;
    return h;
  }
  function place(h, { x = 0, z = 0, y, yaw = 0, onGround = true, collide = true } = {}) {
    const gy = y !== undefined ? y : (onGround && island ? Math.max(island.getHeight(x, z), island.waterLevel ? island.waterLevel(x, z) : 0) : 0);
    h.group.position.set(x, gy, z);
    h.group.rotation.y = yaw;
    h.group.userData.baseY = gy;
    if (collide && colliders && h.collide) { const c = h.collide(colliders, x, z, gy, yaw); h.colliderRefs = Array.isArray(c) ? c : c ? [c] : []; }
    return h;
  }
  function spawn(type, { id, x = 0, z = 0, y, yaw = 0, onGround = true, collide = true, parent = root, ...opts } = {}) {
    const h = make(type, opts);
    place(h, { x, z, y, yaw, onGround, collide });
    h.id = id || `${type}-${nextId++}`;
    parent.add(h.group);
    h.remove = () => {
      parent.remove(h.group);
      spawned.delete(h.id);
      if (h.colliderRefs && colliders) for (const c of h.colliderRefs) colliders.remove(c);
      h.group.traverse((o) => { if (o.isMesh && o.geometry && !o.userData.shared) o.geometry.dispose(); });
    };
    spawned.set(h.id, h);
    return h;
  }
  // Feste Teile vieler Props zu wenigen Meshes verschmelzen (Laternenketten, Menhir-Kreise, Steinfelder …)
  function bake(items, { id, parent = root, castShadow = true } = {}) {
    const handles = items.map((it) => { const { type, x, z, y, yaw, onGround, collide, ...opts } = it; const h = make(type, opts); place(h, { x, z, y, yaw, onGround, collide }); return h; });
    const byMat = new Map();
    const group = new THREE.Group();
    group.name = 'props-bake' + (id ? '-' + id : '');
    for (const h of handles) {
      h.group.updateMatrixWorld(true);
      h.group.traverse((o) => {
        if (!o.isMesh) return;
        if (o.userData.dynamic) return;
        const geo = o.geometry.clone().applyMatrix4(o.matrixWorld);
        if (!byMat.has(o.material)) byMat.set(o.material, []);
        byMat.get(o.material).push(geo);
        o.userData.baked = true;
      });
      // dynamische Teile bleiben als eigene Meshes (mit Welt-Transformation ihrer Gruppe)
      const dyn = [];
      h.group.traverse((o) => { if (o.isMesh && o.userData.dynamic) dyn.push(o); });
      if (dyn.length) group.add(h.group);
      h.group.traverse((o) => { if (o.isMesh && o.userData.baked) { o.visible = false; } });
    }
    for (const [mat, geos] of byMat) {
      const merged = mergeGeos(geos);
      const m = new THREE.Mesh(merged, mat);
      m.castShadow = castShadow; m.receiveShadow = true;   // flache Beläge (Pflaster) werfen keine Schatten (Acne auf sich selbst)
      m.userData.shared = false;
      group.add(m);
    }
    parent.add(group);
    const bid = id || 'bake-' + nextId++;
    // Mittelpunkt/Radius fürs Distanz-Culling: Requisiten in Weltkoordinaten (Bohlenweg, Pflaster, Wimpelkette) liefern
    // ihren eigenen Mittelpunkt, sonst zählt die Gruppenposition
    const cOf = (h) => h.center || h.group.position;
    let cx = 0, cz = 0, rad = 0;
    for (const h of handles) { cx += cOf(h).x; cz += cOf(h).z; }
    cx /= handles.length || 1; cz /= handles.length || 1;
    for (const h of handles) rad = Math.max(rad, Math.hypot(cOf(h).x - cx, cOf(h).z - cz) + (h.radius || 0));
    const handle = {
      id: bid, group, handles, type: 'bake', center: { x: cx, z: cz }, radius: rad, far: Math.max(...handles.map((h) => (h.far !== undefined ? h.far : 150))),
      update(dt, t, c) { for (const h of handles) if (h.update) h.update(dt, t, c); },
      remove() {
        parent.remove(group);
        spawned.delete(bid);
        for (const h of handles) if (h.colliderRefs && colliders) for (const c of h.colliderRefs) colliders.remove(c);
        group.traverse((o) => { if (o.isMesh && o.geometry) o.geometry.dispose(); });
      },
    };
    spawned.set(bid, handle);
    return handle;
  }
  function mergeGeos(geos) {
    let total = 0;
    for (const g of geos) total += g.attributes.position.count;
    const pos = new Float32Array(total * 3), nor = new Float32Array(total * 3), col = new Float32Array(total * 3), wind = new Float32Array(total);
    let o = 0;
    for (const g of geos) {
      const c = g.attributes.position.count;
      pos.set(g.attributes.position.array, o * 3);
      if (g.attributes.normal) nor.set(g.attributes.normal.array, o * 3);
      if (g.attributes.color) col.set(g.attributes.color.array, o * 3); else col.fill(1, o * 3, (o + c) * 3);
      if (g.attributes.aWind) wind.set(g.attributes.aWind.array, o);
      o += c;
      g.dispose();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setAttribute('aWind', new THREE.BufferAttribute(wind, 1));
    g.computeBoundingSphere();
    return g;
  }
  // Galerie: jede Requisite einmal in einer Reihe (für den Galerie-Screenshot), die sechs Vögel nebeneinander
  function gallery({ x = 0, z = 0, spacing = 6, yaw = 0, y } = {}) {
    const list = [];
    let i = 0;
    const put = (type, opts = {}) => { const px = x + Math.cos(yaw) * spacing * i, pz = z + Math.sin(yaw) * spacing * i; i++; list.push(spawn(type, { x: px, z: pz, y, yaw: -yaw, ...opts })); };
    put('signalfeuer'); put('laterne'); put('laterne', { variant: 'papier', color: '#ff5d8f' }); put('tank', { need: 'anerkennung', fill: 0.7 }); put('marktstand');
    put('fluesterstein', { active: true }); put('kristall', { kind: 'fakt' }); put('kristall', { kind: 'urteil' }); put('planke'); put('windrad'); put('drachen');
    put('menhir'); put('orgel', { yaw: Math.PI });
    for (const e of BIRD_EMOTIONS) put('vogel', { emotion: e, pose: 'sitzen' });
    put('glimmerkugel', { y: (y || 0) + 2 }); put('glimmerinsel', { y: (y || 0) + 4 }); put('grisel', { y: (y || 0) + 3 }); put('titan', { size: 0.35 });
    put('haus', { size: 'S' }); put('haus', { size: 'M', markise: true }); put('haus', { size: 'L' }); put('kiosk'); put('kisten', { n: 3 }); put('fass'); put('boje', { lying: true });
    put('netz'); put('ruderboot'); put('bank'); put('blumenkuebel'); put('brunnen'); put('fels');
    put('pflaster', { x: 0, z: 0, y: 0, onGround: false, cx: x + Math.cos(yaw) * spacing * i, cz: z + Math.sin(yaw) * spacing * i, r: 2.5 });
    put('wimpelkette', { x: 0, z: 0, y: 0, onGround: false, from: [x + Math.cos(yaw) * spacing * i, (y || 0) + 3, z + Math.sin(yaw) * spacing * i], to: [x + Math.cos(yaw) * spacing * (i + 1), (y || 0) + 3, z + Math.sin(yaw) * spacing * (i + 1)] });
    return { handles: list, remove() { list.forEach((h) => h.remove()); } };
  }

  const kit = {
    root, materials: M, rng: R, types: PROP_TYPES, BIRDS, NEED_COLORS, TRI_BUDGET,
    make, spawn, bake, gallery, place,
    get(id) { return spawned.get(id) || null; },
    list() { return [...spawned.values()]; },
    get count() { return spawned.size; },
    remove(id) { const h = spawned.get(id); if (h) h.remove(); return !!h; },
    removeAll() { for (const h of [...spawned.values()]) h.remove(); },
    triangles: triangleCount,
    setFocus(fn) { focus = fn; },
    // Animation + Distanz-Culling: Requisiten jenseits von h.far (Standard 150 m) werden nicht gezeichnet
    update(dt, t) {
      const f = focus ? focus() : null;
      for (const h of spawned.values()) {
        if (f && h.group) {
          const far = h.far !== undefined ? h.far : (h.opts && h.opts.far !== undefined ? h.opts.far : 150);
          const c = h.center || h.group.position;
          const vis = Math.hypot(c.x - f.x, c.z - f.z) < far + (h.radius || 0);
          if (h.group.visible !== vis && !h.hidden) h.group.visible = vis;
          if (!vis) continue;
        }
        if (h.update) h.update(dt, t, ctx);
      }
    },
  };
  return kit;
}

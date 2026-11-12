// Raum-Baukasten (WP18): RoomDef → fertiger Raum (Gruppe in lokalen Koordinaten, Kollider, Flächen, Lichter, Wasser).
//   const kit = createRoomKit({ veil, props, island, rng });
//   kit.register(def) · kit.get(id) · kit.list() · kit.build(idOrDef) → Raum { id, def, group, size, preset, lights, spawns, exits,
//     inside(lx, lz), floorAt(lx, lz), registerColliders(registry, pocket), bounds(pocket), update(dt, t, ctx), dispose() }
// RoomDef (CONTENT-SCHEMA): { id, kit, size:[w,h,d], light, water:{level, tide, min?, max?, period?}, spawns:{name:[x,y,z]},
//   exits:[{ at:[x,y,z], r?, to:{region, site}|{room, spawn}, label?, kind:'tuer'|'bogen'|'ring'|'luke' }], features:[{type, at, yaw, …}] }
import * as THREE from 'three';
import { part, merge } from '../geom.js';
import { createMaterials } from '../../props/kit/materials.js';
import { buildRoom, KITS, KIT_NAMES, FEATURE_TYPES } from './kits.js';
import { LIGHT_PRESETS, KIT_DEFAULT_LIGHT } from './presets.js';
import { mulberry32 } from '../noise.js';

export { KITS, KIT_NAMES, FEATURE_TYPES, LIGHT_PRESETS };

// Eingebaute Räume (Platzhalter für die Inhalts-WPs; gleiche IDs werden von src/content/rooms/*.js überschrieben)
export const DEFAULT_ROOMS = [
  {
    id: 'hafengrotte', kit: 'hoehle', size: [22, 9, 26], light: 'biolumineszenz',
    spawns: { eingang: [0, 0, 7] },
    exits: [{ at: [0, 0, 12.2], to: { site: 'hafengrotte' }, label: 'Hinaus', kind: 'bogen' }],
    features: [{ type: 'kristall', at: [-6, 0, -6], kind: 'fakt' }, { type: 'kristall', at: [6, 0, -4], kind: 'fakt', color: '#7a5cff' }, { type: 'podest', at: [0, 0, -8], radius: 2 }, { type: 'laterne', at: [3, 0, 10], variant: 'pfahl', lit: true }],
  },
  {
    id: 'gezeitenhoehle', kit: 'hoehle', size: [40, 14, 60], light: 'biolumineszenz', floorColor: '#8a9a94',
    water: { level: 0.4, tide: true, min: 0.15, max: 1.6, period: 60 },
    spawns: { eingang: [0, 0, 23] },
    exits: [{ at: [0, 0, 29.2], to: { region: 'strand', site: 'strand.gezeitenhoehle' }, label: 'Hinaus', kind: 'bogen' }],
    features: [{ type: 'gezeitenhorn', at: [4, 0, 20] }, { type: 'orgel', at: [0, 0, -24], yaw: 0 }, { type: 'podest', at: [0, 0, -18], radius: 3, height: 0.8 }, { type: 'kristall', at: [-12, 0, 0], kind: 'fakt' }, { type: 'kristall', at: [13, 0, -8], kind: 'fakt', color: '#7a5cff' }],
  },
  {
    id: 'federtempel', kit: 'tempel', size: [24, 10, 36], light: 'fackeln',
    spawns: { eingang: [0, 0, 11] },
    exits: [{ at: [0, 0, 17.2], to: { site: 'federtempel' }, label: 'Hinaus', kind: 'tuer' }],
    features: [{ type: 'fackel', at: [-9, 0, 12] }, { type: 'fackel', at: [9, 0, 12] }, { type: 'fackel', at: [-9, 0, -8] }, { type: 'fackel', at: [9, 0, -8] }, { type: 'kristall', at: [0, 1.05, -14], kind: 'fakt', color: '#9b5cff' }],
  },
  {
    id: 'leuchtturm-etage', kit: 'turmetage', size: [12, 7, 12], light: 'fenster',
    spawns: { eingang: [0, 0, 2] },
    exits: [{ at: [0, 0, 5.2], to: { site: 'leuchtturm' }, label: 'Hinaus', kind: 'tuer' }],
    features: [{ type: 'kiste', at: [-3.5, 0, -2] }, { type: 'schild', at: [3.5, 0, -2.5], icon: true, iconColor: '#ffd166' }],
  },
  {
    id: 'werkstatt', kit: 'werkstatt', size: [14, 5, 12], light: 'lampe',
    spawns: { eingang: [0, 0, 2.5] },
    exits: [{ at: [0, 0, 5.6], to: { site: 'kapitaenin' }, label: 'Hinaus', kind: 'tuer' }],
    features: [{ type: 'kiste', at: [-5, 0, 3] }, { type: 'kiste', at: [-5, 0, 1.6], size: 0.8 }, { type: 'tank', at: [4.5, 0, 3], need: 'sicherheit', fill: 0.55 }],
  },
  {
    id: 'muschelgrotte', kit: 'unterwasser', size: [26, 11, 26], light: 'unterwasser',
    spawns: { eingang: [0, 2.2, 8] },
    exits: [{ at: [0, 9.8, 0], r: 1.9, kind: 'ring', label: 'Auftauchen' }],
    features: [],
  },
  {
    id: 'baumhaus', kit: 'baumhaus', size: [12, 5, 12], light: 'baumhaus',
    spawns: { eingang: [0, 0, 2.2] },
    exits: [{ at: [0, 0, 5.4], to: { site: 'baumhaus' }, label: 'Hinaus', kind: 'tuer' }],
    features: [{ type: 'haengematte', at: [-3.2, 0, -1.5], yaw: 0.4 }, { type: 'glas', at: [3.6, 0, -2.6] }, { type: 'jukebox', at: [4.2, 0, 1.2], yaw: -Math.PI / 2 }, { type: 'spiegel', at: [-4.6, 0, 1.6], yaw: Math.PI / 2 }, { type: 'pinnwand', at: [0, 0, -5.2] }, { type: 'bonsai', at: [1.2, 0, -3.6] }, { type: 'tisch', at: [0, 0, 0.2], width: 1.8 }],
  },
];

function fallbackRng(seed = 5) { const r = mulberry32(seed); return { next: r, float: (a, b) => a + r() * (b - a), int: (a, b) => a + Math.floor(r() * (b - a + 1)), pick: (arr) => arr[Math.floor(r() * arr.length)], fork: () => fallbackRng(seed + 1) }; }

export function createRoomKit({ veil = null, props = null, island = null, rng = null, materials = null } = {}) {
  const M = materials || (props && props.materials) || createMaterials(veil);
  const K = { M, rng: rng && rng.fork ? rng.fork('rooms') : fallbackRng(5), props, island, THREE };
  const defs = new Map();
  for (const d of DEFAULT_ROOMS) defs.set(d.id, d);

  function normalize(def) {
    const d = { light: KIT_DEFAULT_LIGHT[def.kit] || 'daemmerung', spawns: { eingang: [0, 0, 0] }, exits: [], features: [], ...def };
    d.size = d.size || [20, 8, 20];
    if (!d.spawns.eingang) d.spawns.eingang = Object.values(d.spawns)[0] || [0, 0, 0];
    return d;
  }

  function build(idOrDef) {
    const def = normalize(typeof idOrDef === 'string' ? defs.get(idOrDef) : idOrDef);
    if (!def) throw new Error('Unbekannter Raum: ' + idOrDef);
    const [w, h, d] = def.size;
    const round = def.kit === 'turmetage' || def.kit === 'baumhaus';
    const built = buildRoom(def, K);
    const group = built.group;
    group.name = 'raum-' + def.id;
    const preset = LIGHT_PRESETS[def.light] || LIGHT_PRESETS.daemmerung;
    // Lichter: Preset-Punkte (Anteile) + Einrichtungslichter (Fackeln) als Vorgaben in lokalen Koordinaten.
    // Die echten PointLights hält das Szenen-System in einem festen Pool (keine Shader-Neukompilierung beim Betreten).
    const lights = [];
    const lightScale = Math.max(1, Math.max(w, d) / 24);   // große Räume: Lichter reichen weiter und sind stärker
    for (const p of preset.points || []) lights.push({ color: p.color, intensity: p.intensity * lightScale, distance: p.distance * lightScale, x: p.at[0] * w * 0.5, y: p.at[1] * h, z: p.at[2] * d * 0.5 });
    for (const l of built.lights) lights.push({ color: l.color, intensity: l.intensity, distance: l.distance, x: l.x, y: l.y, z: l.z });
    // Wasser: Fläche mit Pegel (Gezeiten schwingen zwischen min und max)
    let water = null;
    if (def.water) {
      const wm = new THREE.MeshLambertMaterial({ color: '#2aa4a0', transparent: true, opacity: 0.55, depthWrite: false, emissive: new THREE.Color('#1a6a70'), emissiveIntensity: 0.25 });
      if (veil) veil.patch(wm, { key: 'raumwasser' });
      const plane = new THREE.Mesh(round ? new THREE.CircleGeometry(w / 2, 24).rotateX(-Math.PI / 2) : new THREE.PlaneGeometry(w, d).rotateX(-Math.PI / 2), wm);
      plane.renderOrder = 3;
      plane.position.y = def.water.level;
      group.add(plane);
      water = { plane, level: def.water.level, tide: !!def.water.tide, min: def.water.min !== undefined ? def.water.min : def.water.level, max: def.water.max !== undefined ? def.water.max : def.water.level, period: def.water.period || 60, phase: 0, auto: !!def.water.tide };
    }
    // Ausgänge: Bogen/Tür/Ring/Luke als sichtbare Marke
    const exits = (def.exits || []).map((e, i) => ({ ...e, index: i, r: e.r || 2.2, kind: e.kind || 'tuer', label: e.label || 'Hinaus' }));
    const EX = [];
    for (const e of exits) {
      const [x, y, z] = e.at;
      const yaw = Math.atan2(-x, -z);   // zur Raummitte
      if (e.kind === 'ring') { EX.push(part(new THREE.TorusGeometry(e.r * 0.85, 0.16, 6, 24), { pos: [x, y, z], rot: [Math.PI / 2, 0, 0], color: '#7ff0ff' })); continue; }
      if (e.kind === 'luke') { EX.push(part(new THREE.TorusGeometry(1.0, 0.1, 6, 18), { pos: [x, y, z], rot: [Math.PI / 2, 0, 0], color: '#ffe6a0' })); continue; }
      const c = Math.cos(yaw), s = Math.sin(yaw);
      for (const sx of [-1, 1]) EX.push(part(new THREE.BoxGeometry(0.3, 3.2, 0.3), { pos: [x + c * sx * 1.2, y + 1.6, z - s * sx * 1.2], color: '#ffe6a0' }));
      EX.push(part(new THREE.BoxGeometry(2.9, 0.3, 0.3), { pos: [x, y + 3.25, z], rot: [0, yaw, 0], color: '#ffe6a0' }));
      EX.push(part(new THREE.CircleGeometry(1.0, 12), { pos: [x, y + 0.03, z], rot: [-Math.PI / 2, 0, 0], color: '#ffefc0' }));
    }
    if (EX.length) { const m = new THREE.Mesh(merge(EX), M.glow('#ffd166', { intensity: 0.6, veil: false })); m.name = 'raum-ausgaenge'; group.add(m); }
    const floorSurf = { surface: def.kit === 'werkstatt' || def.kit === 'baumhaus' || def.kit === 'turmetage' ? 'wood' : def.kit === 'unterwasser' || def.kit === 'hoehle' ? 'sand' : 'rock' };
    const margin = 0.6;
    const room = {
      id: def.id, def, kit: def.kit, group, size: def.size, preset, lights, water, exits, spawns: def.spawns, props: built.props, dynamic: built.dynamic,
      colliders: built.colliders, surfaces: built.surfaces, floorSurf, round,
      inside(lx, lz, m = margin) { return round ? Math.hypot(lx, lz) <= w / 2 - m : Math.abs(lx) <= w / 2 - m && Math.abs(lz) <= d / 2 - m; },
      floorAt() { return 0; },
      bounds(p) { return { min: { x: p.x - w / 2 + margin, y: p.y + 0.3, z: p.z - d / 2 + margin }, max: { x: p.x + w / 2 - margin, y: p.y + h - 0.6, z: p.z + d / 2 - margin } }; },
      spawn(name, p) { const s = def.spawns[name] || def.spawns.eingang; return { x: p.x + s[0], y: p.y + (s[1] || 0), z: p.z + s[2], yaw: Math.atan2(-s[0], -s[2]) }; },
      // Kollider und Flächen in eine Registry (Weltkoordinaten) eintragen; Requisiten registrieren ihre eigenen
      registerColliders(reg, p) {
        for (const c of built.colliders) { if (c.type === 'circle') reg.addCircle(p.x + c.x, p.z + c.z, c.r, { group: 'raum', tag: c.tag }); else reg.addBox(p.x + c.x, p.z + c.z, c.hw, c.hd, c.rot || 0, { group: 'raum', tag: c.tag }); }
        for (const s of built.surfaces) reg.addSurface({ ...s, x: p.x + s.x, z: p.z + s.z, y: p.y + (s.y || 0), group: 'raum' });
        for (const hnd of built.props) if (hnd.collide) { const r = hnd.collide(reg, p.x + hnd.localAt[0], p.z + hnd.localAt[2], p.y + (hnd.localAt[1] || 0), hnd.yaw || 0); hnd.colliderRefs = Array.isArray(r) ? r : r ? [r] : []; }
        return reg;
      },
      update(dt, t, ctx) {
        for (const hnd of built.props) if (hnd.update) hnd.update(dt, t, ctx);
        if (water && water.auto && dt > 0) { water.phase = (water.phase + dt / water.period) % 1; water.level = water.min + (water.max - water.min) * (0.5 - 0.5 * Math.cos(water.phase * Math.PI * 2)); }
        if (water) { water.plane.position.y = water.level; water.plane.material.opacity = 0.5 + 0.05 * Math.sin(t * 1.3); }
      },
      setTide(v) { if (!water) return null; water.auto = false; water.level = water.min + (water.max - water.min) * Math.max(0, Math.min(1, v)); return water.level; },
      triangles() { let n = 0; group.traverse((o) => { if (o.isMesh && o.geometry) n += o.geometry.index ? o.geometry.index.count / 3 : o.geometry.attributes.position.count / 3; }); return n; },
      dispose() { group.traverse((o) => { if (o.isMesh && o.geometry) o.geometry.dispose(); }); if (group.parent) group.parent.remove(group); },
    };
    return room;
  }

  return {
    K, M, defs, LIGHT_PRESETS, KITS, kits: KIT_NAMES, features: FEATURE_TYPES,
    register(def) { if (def && def.id) defs.set(def.id, def); return def; },
    get(id) { return defs.get(id) || null; },
    has(id) { return defs.has(id); },
    list() { return [...defs.values()]; },
    build, normalize,
  };
}

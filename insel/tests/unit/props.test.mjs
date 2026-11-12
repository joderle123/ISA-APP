// Unit-Tests Requisiten und Räume (WP43/WP18, Node ohne Browser): jede Requisite < 3k Dreiecke, sechs Vögel mit
// eigener Silhouette, Backen verschmilzt feste Teile, Raum-Baukasten baut alle Kits aus RoomDefs (Bounds, Spawn, Ausgänge,
// Kollider in Weltkoordinaten), Presets vollständig.
// Aufruf: node --test tests/unit/props.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createPropKit, PROP_TYPES, TRI_BUDGET, triangleCount, BIRD_EMOTIONS, BIRDS } from '../../src/props/kit/index.js';
import { createRoomKit, DEFAULT_ROOMS, KIT_NAMES, LIGHT_PRESETS } from '../../src/world/roomkit/index.js';
import { KIT_DEFAULT_LIGHT } from '../../src/world/roomkit/presets.js';
import { createColliders } from '../../src/world/colliders.js';

const kit = createPropKit({});

test('Alle Requisiten bauen und bleiben unter dem Dreiecks-Budget', () => {
  for (const type of PROP_TYPES) {
    const opts = type === 'vogel' ? { emotion: 'wut' } : type === 'bohlenweg' ? { pts: [[0, 0], [0, 8], [6, 12]] } : {};
    const h = kit.make(type, opts);
    assert.ok(h.group && h.group.children.length > 0, type + ' hat Geometrie');
    const tris = triangleCount(h.group);
    assert.ok(tris > 0 && tris <= TRI_BUDGET, `${type}: ${tris} Dreiecke (Budget ${TRI_BUDGET})`);
  }
});

test('Sechs Gefühlsvögel: Farbe je Gefühl, unterschiedliche Silhouetten, Flügelschlag-Uniforms, Pose sitzen/fliegen', () => {
  assert.deepEqual(BIRD_EMOTIONS.sort(), ['angst', 'ekel', 'freude', 'trauer', 'ueberraschung', 'wut']);
  const seen = new Set();
  for (const e of BIRD_EMOTIONS) {
    const b = kit.make('vogel', { emotion: e });
    assert.equal(b.emotion, e); assert.equal(b.id, BIRDS[e].id);
    assert.ok(/^#[0-9a-f]{6}$/i.test(b.color));
    const box = { w: BIRDS[e].wing[0], legs: BIRDS[e].legs, scale: BIRDS[e].scale };
    seen.add(JSON.stringify(box));
    const u = b.wings.material.userData.flap;
    assert.ok(u && u.uFlapSpeed.value === BIRDS[e].flap);
    b.pose('sitzen'); assert.ok(u.uFlapAmp.value < 0.1);
    b.pose('fliegen'); assert.equal(u.uFlapAmp.value, BIRDS[e].amp);
    assert.ok(b.edges.material.emissive.getHex() > 0, 'leuchtende Kanten');
  }
  assert.equal(seen.size, 6, 'jede Art hat eine eigene Silhouette');
  assert.ok(BIRDS.wachkranich === undefined && BIRDS.angst.legs > BIRDS.wut.legs, 'Kranich mit langen Beinen');
  assert.ok(BIRDS.ueberraschung.flap > 25, 'Kolibri schlägt schnell');
});

test('Requisiten-API: spawn/remove mit Kollidern, bake verschmilzt statische Teile je Material, Tank/Feuer/Kristall steuerbar', () => {
  const colliders = createColliders();
  const k = createPropKit({ colliders });
  const f = k.spawn('signalfeuer', { x: 3, z: 4 });
  assert.equal(colliders.count, 1); assert.ok(k.get(f.id) === f);
  f.setLit(false); f.update(1, 1); assert.equal(f.lit, false);
  const t = k.spawn('tank', { x: 10, z: 4, need: 'anerkennung', fill: 0.2 });
  t.add(0.5); t.update(2, 2); assert.ok(Math.abs(t.fill - 0.7) < 1e-9); t.slosh(1);
  assert.equal(t.color, k.NEED_COLORS.anerkennung);
  const c = k.spawn('kristall', { x: 20, z: 4, kind: 'urteil' });
  assert.equal(c.kind, 'urteil');
  f.remove(); t.remove(); c.remove();
  assert.equal(colliders.count, 0); assert.equal(k.count, 0);
  const b = k.bake([{ type: 'laterne', x: 0, z: 0 }, { type: 'laterne', x: 3, z: 0 }, { type: 'menhir', x: 6, z: 0 }, { type: 'windrad', x: 9, z: 0 }]);
  const meshes = b.group.children.filter((o) => o.isMesh);
  const groups = b.group.children.filter((o) => !o.isMesh);
  assert.ok(meshes.length >= 2 && meshes.length <= 4, `verschmolzen zu ${meshes.length} Meshes`);
  assert.equal(groups.length, 1, 'nur das Windrad bleibt eine eigene Gruppe (Rotor)');
  assert.ok(colliders.count >= 3, 'Kollider auch beim Backen');
  b.update(0.1, 1); b.remove();
  assert.equal(colliders.count, 0);
  const g = k.gallery({ x: 0, z: 0 });
  assert.ok(g.handles.length >= PROP_TYPES.length + 5);
  g.remove(); assert.equal(k.count, 0);
});

test('Raum-Baukasten: alle Kits bauen aus RoomDefs, Bounds/Spawn/Ausgänge in Weltkoordinaten, Kollider registriert', () => {
  const rooms = createRoomKit({ props: kit });
  assert.deepEqual(KIT_NAMES.slice(0, 6), ['hoehle', 'tempel', 'turmetage', 'werkstatt', 'unterwasser', 'baumhaus']);
  for (const def of DEFAULT_ROOMS) {
    const r = rooms.build(def.id);
    assert.equal(r.id, def.id);
    const tris = r.triangles();
    assert.ok(tris > 100 && tris < 60000, `${def.id}: ${tris} Dreiecke`);
    const p = { x: 0, y: 320, z: 470 };
    const b = r.bounds(p);
    assert.ok(b.min.x < b.max.x && b.min.y < b.max.y && b.min.z < b.max.z);
    const s = r.spawn('eingang', p);
    assert.ok(r.inside(s.x - p.x, s.z - p.z), 'Spawn liegt im Raum');
    assert.ok(!r.inside(def.size[0], 0), 'außerhalb erkannt');
    const reg = createColliders();
    r.registerColliders(reg, p);
    assert.ok(reg.count > 0, 'Wände/Einrichtung als Kollider');
    assert.ok(r.lights.length > 0, 'Lichter aus dem Preset');
    assert.ok(LIGHT_PRESETS[def.light], 'Preset ' + def.light);
    if (def.water) { assert.ok(r.water); r.setTide(1); assert.ok(Math.abs(r.water.level - def.water.max) < 1e-9); }
    r.update(0.1, 1, null);
    r.dispose();
  }
  for (const k of KIT_NAMES) assert.ok(LIGHT_PRESETS[KIT_DEFAULT_LIGHT[k]], 'Standard-Preset für ' + k);
  // Eigene RoomDef mit Requisite aus dem Props-Baukasten und eingebauter Einrichtung
  const custom = rooms.build({ id: 'test-raum', kit: 'tempel', size: [20, 8, 20], features: [{ type: 'orgel', at: [0, 0, -6] }, { type: 'kiste', at: [4, 0, 4] }, { type: 'fackel', at: [-6, 0, 0] }] });
  assert.equal(custom.props.length, 1, 'Orgel aus dem Props-Kit');
  assert.ok(custom.lights.length >= 4, 'Fackel bringt ein Licht');
  const reg = createColliders();
  custom.registerColliders(reg, { x: 5, y: 1, z: 5 });
  assert.ok(reg.surfaceHeight(5 + 4, 5 + 4, 10) > 1.8, 'Kiste ist eine begehbare Fläche in Weltkoordinaten');
  custom.dispose();
  rooms.register({ id: 'test-raum', kit: 'hoehle', size: [10, 6, 10] });
  assert.equal(rooms.get('test-raum').kit, 'hoehle', 'register überschreibt');
});

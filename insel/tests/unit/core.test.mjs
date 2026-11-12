// Unit-Tests Kern (Node, ohne Browser): Zustand, Speichern (Slots, Export/Import ohne private Felder, Wipe, Migration),
// Zufall, Inhalte-Registry, Plugin-Reihenfolge und der Autoload-Generator mit Dummy-Plugin und Dummy-Inhalt.
// Aufruf: node tests/unit/core.test.mjs   (oder node --test tests/unit)
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync, rmSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createEvents } from '../../src/engine/events.js';
import { createState } from '../../src/core/state.js';
import { createSave, defaultState, encodeCode, decodeCode, SLOT_COUNT, SAVE_VERSION, MIGRATIONS, migrate, PRIVATE_PATHS } from '../../src/core/save.js';
import { createRng, hashString } from '../../src/core/rng.js';
import { createContent, normCode } from '../../src/core/content.js';
import { installPlugins } from '../../src/core/plugins.js';
import { generate, orderPlugins } from '../../tools/gen.mjs';
import UNITS from '../../src/content/units.js';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '../..');
const SCRATCH = process.env.SCRATCH || join(process.env.TMPDIR || '/tmp', 'lumo-unit');

function memStorage() {
  const m = new Map();
  return { get length() { return m.size; }, key: (i) => [...m.keys()][i] ?? null, getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), _map: m };
}

test('state: get/set/on mit Pfaden, Ereignis state:change', () => {
  const events = createEvents();
  const state = createState({ events, data: defaultState(7) });
  const seen = [];
  events.on('state:change', (e) => seen.push(e.path));
  const hits = [];
  state.on('units', (e) => hits.push(e));
  state.set('units.j1-e11', 'offen');
  assert.equal(state.get('units.j1-e11'), 'offen');
  assert.equal(seen[0], 'units.j1-e11');
  assert.equal(hits.length, 1);
  assert.equal(hits[0].prev, undefined);
  state.addUnique('abilities', 'segel'); state.addUnique('abilities', 'segel');
  assert.deepEqual(state.get('abilities'), ['segel']);
  state.inc('session.puls', 8); state.inc('session.puls', 8);
  assert.equal(state.get('session.puls'), 16);
  state.set('bonds.luc', 2);
  assert.equal(state.get('bonds.luc'), 2);
  assert.equal(state.get('bonds.nix', 0), 0);
  state.merge('settings', { mode: 'profi' });
  assert.equal(state.get('settings.mode'), 'profi');
  assert.equal(state.get('settings.reducedFx'), false);
  state.remove('bonds.luc');
  assert.equal(state.has('bonds.luc'), false);
  const snap = state.snapshot();
  snap.units['j1-e11'] = 'fertig';
  assert.equal(state.get('units.j1-e11'), 'offen', 'snapshot ist eine Kopie');
});

test('save: 8 Slots, Roundtrip, Slot-Übersicht, current', () => {
  const events = createEvents();
  const storage = memStorage();
  const state = createState({ events, data: {} });
  const save = createSave({ state, events, storage, now: () => 1000 });
  assert.equal(save.slots().length, SLOT_COUNT);
  assert.equal(save.boot(), false, 'nichts gespeichert → neues Spiel');
  assert.equal(state.get('v'), SAVE_VERSION);
  assert.match(state.get('handle'), /^[A-Za-z]+ \d{1,2}$/);
  state.set('units.j1-e01', 'fertig');
  state.set('private.glaubenssatz', 'geheim');
  state.set('session.puls', 42);
  assert.equal(save.save(3), true);
  assert.equal(save.current, 3);
  const raw = JSON.parse(storage.getItem('lumo.save.3'));
  assert.equal(raw.session, undefined, 'session wird nicht gespeichert');
  assert.equal(raw.private.glaubenssatz, 'geheim', 'private bleibt lokal gespeichert');
  const slots = save.slots();
  assert.equal(slots[3].empty, false);
  assert.equal(slots[3].unitsDone, 1);
  assert.equal(slots[0].empty, true);
  state.set('units.j1-e01', 'offen');
  assert.equal(save.load(3), true);
  assert.equal(state.get('units.j1-e01'), 'fertig');
  assert.equal(state.get('session.puls'), 0, 'session frisch nach dem Laden');
  // zweiter Bus/State: boot lädt lumo.save.current
  const s2 = createState({ events: createEvents(), data: {} });
  const save2 = createSave({ state: s2, storage });
  assert.equal(save2.boot(), true);
  assert.equal(save2.current, 3);
  assert.equal(s2.get('units.j1-e01'), 'fertig');
  save.delete(3);
  assert.equal(save.slots()[3].empty, true);
  assert.throws(() => save.save(8));
});

test('save: Export-Code ohne private Felder, Import-Roundtrip, kaputte Codes', () => {
  const events = createEvents();
  const storage = memStorage();
  const state = createState({ events, data: defaultState(11) });
  const save = createSave({ state, events, storage });
  state.set('units.j1-e11', 'fertig');
  state.set('abilities', ['blick', 'segel']);
  state.set('private.glaubenssatz', 'Ich bin ein Witz');
  state.set('private.sichererOrt', { biom: 'wald' });
  state.set('baumhaus.glas', ['muschel-1']);
  state.set('baumhaus.furniture', ['hocker']);
  const code = save.exportCode();
  assert.match(code, /^LUMO1\.[0-9a-z]+\.[A-Za-z0-9_-]+$/);
  assert.ok(!code.includes('Witz'));
  const decoded = decodeCode(code);
  assert.equal(decoded.error, undefined);
  const d = decoded.data;
  assert.equal(d.units['j1-e11'], 'fertig');
  assert.deepEqual(d.abilities, ['blick', 'segel']);
  assert.equal(d.private.glaubenssatz, null, 'private auf Standard');
  assert.deepEqual(d.private.sichererOrt, {});
  assert.deepEqual(d.baumhaus.glas, [], 'Glas fehlt im Export');
  assert.deepEqual(d.baumhaus.furniture, ['hocker']);
  // Rohdaten enthalten kein private-Feld
  const json = new TextDecoder().decode(Uint8Array.from(atob(code.split('.')[2].replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0)));
  const rawObj = JSON.parse(json);
  for (const p of PRIVATE_PATHS) {
    const keys = p.split('.');
    let cur = rawObj;
    for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
    assert.equal(cur[keys[keys.length - 1]], undefined, `Export enthält ${p} nicht`);
  }
  assert.equal(rawObj.session, undefined);
  const imp = save.importCode(code);
  assert.equal(imp.ok, true);
  assert.equal(imp.slot, 0, 'freier Slot');
  assert.equal(save.load(imp.slot), true);
  assert.equal(state.get('units.j1-e11'), 'fertig');
  assert.ok(save.importCode('HALLO').error);
  assert.ok(save.importCode(code.slice(0, -4) + 'xxxx').error, 'Prüfsumme');
  assert.ok(save.importCode('LUMO9.abc.' + code.split('.')[2]).error, 'neuere Version');
  const spaced = code.replace(/(.{20})/g, '$1 ');
  assert.equal(save.importCode(spaced, 5).ok, true, 'Leerzeichen/Umbrüche sind egal');
});

test('save: Wipe löscht alle lumo.*-Schlüssel', () => {
  const events = createEvents();
  const storage = memStorage();
  storage.setItem('lumo.settings', '{"volume":1}');
  storage.setItem('andere.app', 'bleibt');
  const state = createState({ events, data: {} });
  const save = createSave({ state, events, storage });
  save.newGame(2);
  save.save(5);
  assert.ok(storage.getItem('lumo.save.2') && storage.getItem('lumo.save.5') && storage.getItem('lumo.save.current'));
  const n = save.wipe();
  assert.ok(n >= 4);
  for (let i = 0; i < storage.length; i++) assert.ok(!storage.key(i).startsWith('lumo.'), 'kein lumo.-Schlüssel übrig: ' + storage.key(i));
  assert.equal(storage.getItem('andere.app'), 'bleibt');
  assert.equal(state.get('v'), SAVE_VERSION);
  assert.deepEqual(state.get('units'), {});
});

test('save: Version und Migration, Autosave über tick', () => {
  const old = { v: 0, units: { 'j1-e01': 'fertig' }, seed: 3 };
  MIGRATIONS.push({ to: 1, run(d) { d.flags = { ...(d.flags || {}), migriert: true }; return d; } });
  const m = migrate(JSON.parse(JSON.stringify(old)));
  MIGRATIONS.pop();
  assert.equal(m.v, SAVE_VERSION);
  assert.equal(m.flags.migriert, true);
  assert.deepEqual(m.abilities, [], 'fehlende Felder ergänzt');
  assert.equal(m.units['j1-e01'], 'fertig');
  const events = createEvents();
  const storage = memStorage();
  const state = createState({ events, data: {} });
  const save = createSave({ state, events, storage });
  save.boot();
  save.autosave.interval = 10;
  let saved = 0;
  events.on('save:saved', () => saved++);
  for (let i = 0; i < 9; i++) save.tick(1);
  assert.equal(saved, 0);
  save.tick(1.5);
  assert.equal(saved, 1);
  assert.ok(state.get('playSeconds') > 10);
  events.emit('unit:complete', { id: 'j1-e01' });
  assert.equal(saved, 2, 'unit:complete speichert sofort');
  events.emit('unit:complete', { id: 'j1-e02' });
  assert.equal(saved, 3, 'Meilensteine speichern immer');
  assert.equal(save.request('autosave'), false, 'minGap bremst gewöhnliche Anfragen');
});

test('rng: seedbar, fork, Verteilung', () => {
  const a = createRng(42), b = createRng(42), c = createRng(43);
  const sa = Array.from({ length: 5 }, () => a.next());
  const sb = Array.from({ length: 5 }, () => b.next());
  assert.deepEqual(sa, sb);
  assert.notDeepEqual(sa, Array.from({ length: 5 }, () => c.next()));
  assert.equal(createRng('welle').seed, hashString('welle'));
  const f1 = createRng(42).fork('koffer'), f2 = createRng(42).fork('koffer'), f3 = createRng(42).fork('maexchen');
  assert.equal(f1.next(), f2.next());
  assert.notEqual(f1.next(), f3.next());
  const r = createRng(1);
  let min = 1, max = 0, sum = 0;
  for (let i = 0; i < 5000; i++) { const v = r.next(); min = Math.min(min, v); max = Math.max(max, v); sum += v; }
  assert.ok(min >= 0 && max < 1 && Math.abs(sum / 5000 - 0.5) < 0.03);
  const ints = new Set(); for (let i = 0; i < 200; i++) ints.add(r.int(1, 6));
  assert.deepEqual([...ints].sort(), [1, 2, 3, 4, 5, 6]);
  assert.equal(r.shuffle([1, 2, 3]).length, 3);
  assert.ok(r.float(0.7, 1.3) >= 0.7);
});

test('content: Registry, Einheiten und Codes', () => {
  const content = createContent({ entries: [{ file: 'content/units.js', kind: 'units', name: 'units', def: UNITS }, { file: 'content/npcs/luc.js', kind: 'npcs', name: 'luc', def: { id: 'luc', name: 'Luc' } }], island: { SITES: { steg: { x: 6, z: 138, r: 0, zone: 'hafen' } }, zoneById: () => null } });
  assert.equal(content.units.length, 39);
  assert.equal(content.unit('j1-e11').code, 'WELLE');
  assert.equal(content.lookupCode('welle').id, 'j1-e11');
  assert.equal(content.lookupCode(' Welle ').id, 'j1-e11');
  assert.equal(content.lookupCode('herzglas-99').kind, 'demo');
  assert.equal(content.lookupCode('LEUCHTFEUER 42').kind, 'teacher');
  assert.equal(content.lookupCode('ruhewetter').id, 'ruhe');
  assert.equal(content.lookupCode('kompass-3').id, 'j1-m3');
  assert.equal(content.lookupCode('quatsch'), null);
  assert.equal(normCode('Bäume-ß'), 'BAEUMESS');
  const codes = UNITS.units.map((u) => normCode(u.code));
  assert.equal(new Set(codes).size, 39, 'alle 39 Code-Wörter eindeutig');
  assert.equal(content.get('npcs', 'luc').name, 'Luc');
  assert.equal(content.has('npcs', 'jolie'), false);
  content.register('regions', { id: 'strand', sites: { muschelbucht: { x: 128, z: 38 } } });
  assert.deepEqual(content.resolveSite('strand.muschelbucht'), { x: 128, z: 38, region: 'strand', name: 'strand.muschelbucht' });
  assert.equal(content.resolveSite('steg').x, 6);
  assert.equal(content.resolveSite('muschelbucht').region, 'strand');
  assert.equal(content.resolveSite({ x: 1, z: 2 }).z, 2);
  assert.equal(content.resolveSite('nirgends'), null);
  assert.ok(content.siteIds().includes('strand.muschelbucht'));
  assert.ok(UNITS.units.find((u) => u.id === 'j1-j08').teacherOnly);
});

test('plugins: Reihenfolge nach order und deps, Fehler werden übersprungen', async () => {
  const order = [];
  const mk = (id, o, deps, fail) => ({ id, order: o, deps, install(g) { if (fail) throw new Error('kaputt'); order.push(id); return { id }; } });
  const game = { events: createEvents(), plugins: { core: {}, list: [], failed: [] } };
  await installPlugins(game, [
    { file: 'b/plugin.js', plugin: mk('b', 10, ['a']) },
    { file: 'a/plugin.js', plugin: mk('a', 20, []) },
    { file: 'c/plugin.js', plugin: mk('c', 5, ['core']) },
    { file: 'd/plugin.js', plugin: mk('d', 30, [], true) },
    { file: 'e/plugin.js', plugin: mk('e', 40, ['d']) },
    { file: 'f/plugin.js', plugin: mk('f', 50, ['nix']) },
    { file: 'x/plugin.js', plugin: { nix: true } },
  ]);
  assert.deepEqual(order, ['c', 'a', 'b'], 'b wartet auf a, obwohl order kleiner');
  assert.deepEqual(game.plugins.list, ['c', 'a', 'b']);
  assert.equal(game.plugins.b.id, 'b');
  assert.equal(game.plugin('b').id, 'b');
  assert.ok(game.plugins.failed.find((f) => f.id === 'd'));
  assert.ok(game.plugins.failed.find((f) => f.id === 'e'), 'e fehlt, weil d fehlschlug');
  assert.ok(game.plugins.failed.find((f) => f.id === 'f'));
  const { problems } = orderPlugins([{ id: 'p', file: 'p', order: 1, deps: ['q'] }, { id: 'q', file: 'q', order: 2, deps: ['p'] }]);
  assert.ok(problems.some((p) => p.includes('Zyklus')));
});

test('gen: Dummy-Plugin und Dummy-Inhalt werden ohne Importänderung eingesammelt und geladen', async () => {
  const dir = join(SCRATCH, 'gen-' + Date.now());
  const src = join(dir, 'src');
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(join(src, 'systems/dummy'), { recursive: true });
  mkdirSync(join(src, 'content/npcs'), { recursive: true });
  mkdirSync(join(src, 'content/schema'), { recursive: true });
  writeFileSync(join(src, 'systems/dummy/plugin.js'), "export default { id: 'dummy', order: 30, deps: ['core'], install(game) { game.dummyInstalled = true; return { hallo: 'welt' }; } };\n");
  writeFileSync(join(src, 'systems/plugin.js'), "export default { id: 'zwei', order: 10, deps: ['dummy'], install() { return 2; } };\n");
  writeFileSync(join(src, 'content/npcs/dummy.js'), "export default { id: 'dummy', name: 'Dummy' };\n");
  writeFileSync(join(src, 'content/glimm.js'), "export default { id: 'glimm', lines: ['Hm.'] };\n");
  writeFileSync(join(src, 'content/schema/consts.js'), 'export const X = 1;\n');
  writeFileSync(join(src, 'content/kein-default.js'), 'export const a = 1;\n');
  const r = generate({ srcDir: src });
  assert.equal(r.problems.length, 0);
  assert.deepEqual(r.plugins.map((p) => p.id), ['dummy', 'zwei'], 'zwei kommt nach dummy (deps), trotz kleinerem order');
  assert.deepEqual(r.content.map((c) => c.kind + '/' + c.name).sort(), ['glimm/glimm', 'npcs/dummy']);
  assert.ok(r.warnings.some((w) => w.includes('kein-default')));
  assert.ok(existsSync(join(src, '_gen/plugins.js')) && existsSync(join(src, '_gen/content.js')));
  assert.ok(readFileSync(join(src, '_gen/plugins.js'), 'utf8').includes('../systems/dummy/plugin.js'));
  const plugins = (await import('file://' + join(src, '_gen/plugins.js'))).default;
  const content = (await import('file://' + join(src, '_gen/content.js'))).default;
  const game = { events: createEvents(), plugins: { core: {}, list: [], failed: [] } };
  await installPlugins(game, plugins);
  assert.equal(game.dummyInstalled, true);
  assert.equal(game.plugins.dummy.hallo, 'welt');
  const reg = createContent({ entries: content });
  assert.equal(reg.get('npcs', 'dummy').name, 'Dummy');
  assert.deepEqual(reg.get('glimm', 'glimm').lines, ['Hm.']);
  rmSync(dir, { recursive: true, force: true });
});

test('gen: das echte src-Verzeichnis enthält das Debug-Plugin und die Einheiten', () => {
  const r = generate({ srcDir: join(ROOT, 'src') });
  assert.equal(r.problems.length, 0);
  assert.ok(r.plugins.some((p) => p.id === 'debug'));
  assert.ok(r.content.some((c) => c.kind === 'units'));
});

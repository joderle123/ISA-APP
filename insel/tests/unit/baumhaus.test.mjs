// Unit-Tests Baumhaus (WP40, Node ohne Browser): Möbel-Raster, Stärken-Bonsai aus dem Taten-Log, Glas, Jukebox-Komponist,
// Trophäen, Ruhe-Puls; Raum-Definition und Stationen; das Glas fehlt im Export-Code.
// Aufruf: node --test tests/unit/baumhaus.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import * as M from '../../src/systems/baumhaus/model.js';
import { BAUMHAUS_ROOM, STATIONS, STATION_IDS, stationById, DECK } from '../../src/scenes/baumhaus.js';
import { defaultState, encodeCode, decodeCode } from '../../src/core/save.js';
import { VALIDATORS } from '../../src/content/schema/defs.js';

test('Möbel-Raster: Zellen im runden Raum, Stationen gesperrt, Setzen ersetzt, Entfernen', () => {
  assert.ok(M.cellInRoom(3, 3));
  assert.ok(!M.cellInRoom(0, 0), 'Ecke liegt außerhalb des runden Bodens');
  assert.ok(!M.cellInRoom(7, 3) && !M.cellInRoom(-1, 2));
  const blocked = M.blockedCells(STATIONS);
  assert.ok(blocked.size > 8);
  const pin = STATIONS.find((s) => s.id === 'pinnwand');
  const o = (M.GRID.n - 1) / 2;
  assert.ok(blocked.has(`${Math.round(pin.at[0] / M.GRID.cell + o)},${Math.round(pin.at[2] / M.GRID.cell + o)}`), 'Pinnwand-Zelle gesperrt');
  assert.ok(blocked.has('3,4'), 'Mäxchen-Tisch sperrt die Mitte');
  let free = null;
  for (let cz = 0; cz < M.GRID.n && !free; cz++) for (let cx = 0; cx < M.GRID.n; cx++) if (M.cellFree(cx, cz, blocked, [])) { free = [cx, cz]; break; }
  assert.ok(free, 'es gibt freie Zellen');
  let r = M.placeFurniture([], { id: 'hafenkiste', cx: free[0], cz: free[1] }, blocked);
  assert.ok(r.ok && r.list.length === 1);
  r = M.placeFurniture(r.list, { id: 'papierlaterne', cx: free[0], cz: free[1] }, blocked);
  assert.ok(r.ok && r.list.length === 1 && r.list[0].id === 'papierlaterne', 'gleiche Zelle ersetzt');
  const bad = M.placeFurniture(r.list, { id: 'hafenkiste', cx: 0, cz: 0 }, blocked);
  assert.ok(!bad.ok && bad.list === r.list);
  assert.ok(!M.placeFurniture(r.list, { id: 'hafenkiste', cx: 3, cz: 4 }, blocked).ok, 'gesperrte Zelle');
  const rm = M.removeFurniture(r.list, free[0], free[1]);
  assert.ok(rm.ok && rm.list.length === 0);
  assert.ok(!M.removeFurniture([], 1, 1).ok);
  assert.ok(!M.cellFree(free[0], free[1], blocked, r.list));
});

test('Möbel-Katalog: Grundstück immer, Rest je Bedingung, Kosmetik-Möbel dazu', () => {
  const none = M.availableFurniture({ evalCond: () => false });
  assert.deepEqual(none.map((f) => f.id), ['hafenkiste']);
  const all = M.availableFurniture({ evalCond: () => true, cosmetics: [{ id: 'moebel-x', slot: 'moebel', label: 'X' }, { id: 'segel-y', slot: 'segel' }] });
  assert.equal(all.length, M.FURNITURE.length + 1);
  assert.ok(all.find((f) => f.id === 'moebel-x').cosmetic);
  assert.equal(M.furnitureDef('surfbrett').shape, 'brett');
  assert.equal(M.furnitureDef('gibtsnicht'), null);
});

test('Stärken-Bonsai: eine Frucht je Tat (ohne Doppelte), Äste aus Sätzen, wächst sichtbar mit dem Log', () => {
  const npcDefs = [{ id: 'jolie', name: 'Jolie', color: '#39d0c8', icon: 'muschel' }];
  const empty = M.bonsaiFrom({});
  assert.equal(empty.fruits.length, 0); assert.equal(empty.stage, 'keimling');
  const log = [{ id: 'jolie-a', day: 1, npc: 'jolie', text: 'Du hast gewartet.' }, { id: 'jolie-a', day: 2, npc: 'jolie' }, { id: 'tun-b', day: 2, npc: 'tun' }];
  const m = M.bonsaiFrom({ deedLog: log, deeds: ['tun-b', 'extra-c'], npcDefs, nameOf: (id) => (id === 'jolie' ? 'Lina' : null), glaubenssatz: { text: 'Ich darf Fehler machen.' }, bonsai: [{ id: 'klarklang-1', text: 'Ich fühle mich …', color: '#ffd166' }] });
  assert.equal(m.fruits.length, 3, 'jolie-a einmal, tun-b, extra-c');
  assert.equal(m.fruits[0].npcName, 'Lina'); assert.equal(m.fruits[0].color, '#39d0c8');
  assert.equal(m.branches.length, 2); assert.equal(m.branches[0].kind, 'glaubenssatz');
  assert.ok(m.size > empty.size && m.size <= 1);
  const big = M.bonsaiFrom({ deedLog: Array.from({ length: 40 }, (_, i) => ({ id: 'd' + i, day: 1 })) });
  assert.equal(big.size, 1); assert.equal(big.stage, 'ehrwuerdig');
});

test('Glas: Glühwürmchen und anonyme Muscheln, nur gültige Bedürfnisse', () => {
  const s = M.glassSummary([{ moment: 'tat-x', day: 1 }, { need: 'spass', day: 1 }, { need: 'spass', day: 2 }, null]);
  assert.equal(s.fireflies.length, 1); assert.equal(s.shells.length, 2); assert.equal(s.byNeed.spass, 2); assert.equal(s.byNeed.koerper, 0);
  assert.ok(!M.addShell([], 'geld').ok);
  const a = M.addShell([], 'koerper', 3);
  assert.ok(a.ok && a.list[0].need === 'koerper' && a.list[0].day === 3 && !('text' in a.list[0]) && !('name' in a.list[0]));
});

test('Jukebox-Komponist: vier Takte, Wechsel, nächster Takt, Stimmung', () => {
  assert.deepEqual(M.playlistFrom(null), ['still', 'still', 'still', 'still']);
  assert.deepEqual(M.playlistFrom(['auf', 'x']), ['auf', 'still', 'still', 'still']);
  let pl = M.cycleLoop([], 0); assert.equal(pl[0], 'runter');
  pl = M.cycleLoop(pl, 0); assert.equal(pl[0], 'auf');
  pl = M.cycleLoop(pl, 0); assert.equal(pl[0], 'still');
  assert.equal(M.firstIndex(['still', 'still', 'auf', 'runter']), 2);
  assert.equal(M.nextIndex(['still', 'still', 'auf', 'runter'], 3), 2, 'läuft im Kreis');
  assert.equal(M.nextIndex([], 0), -1);
  assert.equal(M.playlistMood(['auf', 'auf', 'still', 'runter']), 1 / 3);
  assert.equal(M.playlistMood([]), 0);
});

test('Trophäenwand: Medaillen, Aufnäher, Wege, Jacke, Sammler; nach Rang sortiert', () => {
  const list = M.trophiesFrom({
    medals: { 'hafen-daecher': { medal: 'gold', stern: true }, 'e11-tauziehen': { medal: 'bronze' }, leer: {} },
    units: { 'j1-e11': 'fertig', 'j1-e01': 'offen' }, jackePatches: ['muschel'], wege: ['spalt'],
    minigameDefs: [{ id: 'hafen-daecher', title: 'Hafen-Dächer', icon: 'sprint', color: '#fff' }], questDefs: [{ id: 'j1-e11', title: 'Das Sturmbarometer', patch: { icon: 'barometer', color: '#8fa3ff' } }],
    collectibles: Object.fromEntries(Array.from({ length: 12 }, (_, i) => ['ls' + i, 1])),
  });
  assert.equal(list.length, 6);
  assert.equal(list[0].id, 'medal-hafen-daecher'); assert.equal(list[0].tier, 'stern');
  assert.ok(list.find((t) => t.id === 'patch-j1-e11').label === 'Das Sturmbarometer');
  assert.ok(list.find((t) => t.id === 'sammler').tier === 'bronze');
});

test('Ruhe: Puls fällt auf 10, nie darunter, nie zurück nach oben', () => {
  assert.equal(M.restPuls(80, 0), 80);
  assert.equal(M.restPuls(80, 99), 10);
  assert.equal(M.restPuls(5, 99), 10);
  let last = 80;
  for (let t = 0; t <= 3; t += 0.1) { const p = M.restPuls(80, t); assert.ok(p <= last); last = p; }
});

test('Raum: gültige RoomDef mit Stationen und Ausgang aufs Podest', () => {
  const ctx = { errors: [], warnings: [], refs: [], file: 'x', kind: 'rooms', id: 'baumhaus', path: [] };
  const errs = [];
  const fakeCtx = new Proxy(ctx, { get: (t, k) => t[k] });
  try { VALIDATORS.rooms(fakeCtx, BAUMHAUS_ROOM); } catch (e) { errs.push(e); }
  assert.equal(errs.length, 0);
  assert.equal(BAUMHAUS_ROOM.id, 'baumhaus'); assert.equal(BAUMHAUS_ROOM.kit, 'baumhaus');
  assert.ok(BAUMHAUS_ROOM.exits[0].to.site === 'baumhaus');
  for (const id of ['haengematte', 'glas', 'jukebox', 'spiegel', 'pinnwand', 'bonsai', 'tisch', 'trophaeen', 'tuer', 'kiste']) assert.ok(STATION_IDS.includes(id), id);
  for (const s of STATIONS) { assert.ok(Math.hypot(s.at[0], s.at[2]) < BAUMHAUS_ROOM.size[0] / 2 - 0.4, s.id + ' im Raum'); assert.ok(s.label.split(/\s+/).length <= 2); }
  assert.equal(stationById('bonsai').icon, 'bonsai');
  assert.ok(DECK.height === 12 && DECK.minAbove < DECK.height);
});

test('Der Inhalt des Glases fehlt im Export-Code', () => {
  const d = defaultState(7);
  d.baumhaus.glas = [{ moment: 'tat-x', day: 1 }, { need: 'spass', day: 1 }];
  d.baumhaus.furniture = [{ id: 'hafenkiste', cx: 3, cz: 3, yaw: 0 }];
  d.units['j1-e01'] = 'fertig';
  const code = encodeCode(d);
  const back = decodeCode(code).data;
  assert.deepEqual(back.baumhaus.glas, [], 'Glas leer nach Export/Import');
  assert.equal(back.baumhaus.furniture.length, 1, 'Möbel wandern mit');
  assert.ok(!code.includes('spass') && !code.includes('tat-x'));
});

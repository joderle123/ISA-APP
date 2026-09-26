// Unit-Tests Sitzungsfluss und Welt-Systeme (WP42, Node ohne Browser): Recap-Karten, Lagerfeuer-Sätze, Momente,
// Cliffhanger, Jahreszeit je Modul, Modus-Parameter, Inselwetter, Bedingungen, Sammelsachen-Standards, Nachtwache-Varianten,
// Karten-Kacheln.
// Aufruf: node --test tests/unit/session.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildRecap, buildCampfireLines, buildMoments, pickCliffhanger, seasonFor, SEASON_PALETTES, moduleProgress, modeParams, WEATHER, evalCond, CLIFFHANGERS } from '../../src/systems/session/logic.js';
import { generateDefaults, mergeCollectibles, countByType, COUNTS, AUSSICHTSPUNKTE, NEBELKERNE } from '../../src/systems/collectibles/defaults.js';
import { generateNachtwache, pickTonight, variantCount, HELPS, isNightHour } from '../../src/systems/nachtwache/generate.js';
import { tileOf, tilesInRadius, MAP_N, REGION_NEEDS } from '../../src/ui/map/render.js';
import { createState } from '../../src/core/state.js';
import { defaultState } from '../../src/core/save.js';
import { createIsland } from '../../src/world/island.js';
import { countWords } from '../../src/content/schema/text.js';
import { loadContent } from '../../tools/content-load.mjs';

test('Recap „Letztes Mal“: immer drei Karten (wo, was, was jetzt leuchtet), ≤ 12 Wörter', () => {
  const cards = buildRecap({ recap: { zone: 'strand', deed: { text: 'Du hast dich neben Jolie gesetzt.', icon: 'muschel', color: '#39d0c8', title: 'Mit Jolie' }, collected: 3 }, target: { icon: 'feuer', title: 'Signalfeuer', text: 'Es wartet am Dorfplatz.' } });
  assert.equal(cards.length, 3);
  assert.equal(cards[0].title, 'Palmenstrand'); assert.equal(cards[1].title, 'Mit Jolie'); assert.equal(cards[2].title, 'Signalfeuer');
  for (const c of cards) assert.ok(countWords(c.text) <= 12, c.text);
  const first = buildRecap({});
  assert.equal(first[0].title, 'Hafen-Dorf'); assert.equal(first[1].title, 'Angekommen'); assert.equal(first[2].title, 'Der nächste Code');
});

test('Lagerfeuer: bis zu 3 Figuren mit je einem Satz zur heutigen Tat, nur heute, je Figur ein Satz', () => {
  const npcDefs = [
    { id: 'jolie', lines: { campfire: { 'jolie-dazugesetzt': 'Du hast dich einfach neben mich gesetzt.' }, campfireDefault: 'Danke.' } },
    { id: 'tun', lines: { campfire: {}, campfireDefault: 'Okay, die Regel war gut.' } },
    { id: 'luc', lines: {} },
    { id: 'ilda', lines: { campfireDefault: 'Guter Tag.' } },
  ];
  const deedLog = [
    { id: 'jolie-dazugesetzt', day: 3, npc: 'jolie' }, { id: 'tun-kodex', day: 3, npc: 'tun' }, { id: 'luc-leine', day: 3, npc: 'luc', text: 'Danke für die Leine.' },
    { id: 'ilda-schluessel', day: 3, npc: 'ilda' }, { id: 'jolie-alt', day: 2, npc: 'jolie' }, { id: 'tun-zweite', day: 3, npc: 'tun' },
  ];
  const lines = buildCampfireLines({ deedLog, day: 3, npcDefs });
  assert.equal(lines.length, 3);
  assert.deepEqual(lines.map((l) => l.who), ['tun', 'ilda', 'luc'], 'neueste zuerst, je Figur einmal');
  assert.equal(lines[2].text, 'Danke für die Leine.', 'Text aus dem Log, wenn die Figur keinen eigenen Satz hat');
  for (const l of lines) assert.ok(countWords(l.text) <= 12);
  assert.equal(buildCampfireLines({ deedLog, day: 9, npcDefs }).length, 0);
  const m = buildMoments([{ id: 'a', kind: 'zone', title: 'Hafen-Dorf' }, { id: 'b', kind: 'zone', title: 'Strand' }, { id: 'c', kind: 'tat', title: 'Mit Jolie' }, { id: 'd', kind: 'fund', title: 'Muschel' }]);
  assert.equal(m.length, 3);
  assert.ok(m.some((x) => x.kind !== 'zone' || true) && new Set(m.map((x) => x.id)).size === 3, 'drei verschiedene Momente');
});

test('Cliffhanger: passend zum Modul, deterministisch je Tag, ≤ 12 Wörter', () => {
  for (const [m, list] of Object.entries(CLIFFHANGERS)) for (const t of list) assert.ok(countWords(t) <= 12, `M${m}: ${t}`);
  const a = pickCliffhanger({ module: 3, day: 5 }), b = pickCliffhanger({ module: 3, day: 5 }), c = pickCliffhanger({ module: 3, day: 6 });
  assert.equal(a, b); assert.ok(CLIFFHANGERS[3].includes(a)); assert.ok(CLIFFHANGERS[3].includes(c));
  assert.equal(pickCliffhanger({ module: 2, day: 1, extra: ['Kurz.'] , pool: {} }), 'Kurz.');
});

test('Jahreszeit je Modul, Modus-Parameter, Inselwetter', () => {
  assert.equal(seasonFor({}), 'spaetsommer');
  assert.equal(seasonFor({ 'j1-e01': 'fertig', 'j1-e07': 'offen' }), 'herbst');
  assert.equal(seasonFor({ 'j1-e11': 'offen' }), 'winter');
  assert.equal(seasonFor({ 'j1-e16': 'kurz' }), 'tauwetter');
  assert.equal(seasonFor({ 'j1-e27': 'offen' }), 'fruehling');
  assert.equal(seasonFor({ 'j1-e30': 'offen' }), 'sommer');
  assert.equal(seasonFor({ 'j1-e30': 'fertig' }), 'sommernacht');
  assert.equal(seasonFor({ 'j1-e01': 'offen' }, 'fruehling'), 'fruehling', 'Übersteuerung (Frühlingswetter)');
  assert.deepEqual(moduleProgress({ 'j1-e01': 'fertig', 'j1-e02': 'fertig', 'j1-e04': 'offen' }), { module: 1, done: 2, opened: 3, finale: false });
  for (const s of Object.values(SEASON_PALETTES)) { assert.equal(s.lift.length, 3); assert.equal(s.gain.length, 3); assert.ok(s.sat > 0.5 && s.fog > 0.5); }
  assert.equal(modeParams('entspannt').pulsRate, 0.6); assert.equal(modeParams('profi').auras, false); assert.equal(modeParams('quatsch').label, 'Abenteuer');
  assert.equal(WEATHER.ruhe.pulsFactor, 0.5); assert.equal(WEATHER.ruhe.minutes, 20); assert.ok(WEATHER.fest.fireworks && WEATHER.fruehling.season === 'fruehling');
});

test('Bedingungen (Teilmenge der Cond-DSL)', () => {
  const state = createState({ data: defaultState(5) });
  state.set('units.j1-e05', 'fertig'); state.set('units.j1-e06', 'offen'); state.addUnique('abilities', 'blick'); state.addUnique('upgrades', 'blick.tanks');
  state.set('bonds.jolie', 2); state.set('flags.kodex', 3); state.set('collectibles.ap-gipfel', 2);
  const ctx = { state, hour: () => 23, regionFreed: (id) => id === 'hafen' };
  const ok = (c) => evalCond(c, ctx);
  assert.ok(ok({ unit: 'j1-e06' }) && ok({ unitDone: 'j1-e05' }) && !ok({ unitDone: 'j1-e06' }) && !ok({ unit: 'j1-e07' }));
  assert.ok(ok({ ability: 'blick' }) && ok({ upgrade: 'blick.tanks' }) && !ok({ upgrade: 'blick.masken' }));
  assert.ok(ok({ bond: ['jolie', 2] }) && !ok({ bond: ['jolie', 3] }));
  assert.ok(ok({ flag: 'kodex' }) && ok({ flag: ['kodex', '>=', 3] }) && !ok({ flag: ['kodex', '>', 3] }));
  assert.ok(ok({ time: 'night' }) && !ok({ time: 'day' }) && ok({ time: [22, 24] }));
  assert.ok(ok({ regionFreed: 'hafen' }) && !ok({ regionFreed: 'strand' }) && ok({ collectible: 'ap-gipfel' }));
  assert.ok(ok({ all: [{ ability: 'blick' }, { not: { mode: 'profi' } }] }) && ok({ any: [{ unit: 'x' }, { mode: 'abenteuer' }] }));
  assert.equal(ok(undefined), true); assert.equal(ok({ unbekannt: 1 }), false);
});

test('Sammelsachen-Standards: 100 Lichtsplitter, 30 Muscheln, 12 Aussichtspunkte, 10 Nebelkerne, 24 Tafeln – stabile IDs, begehbar', () => {
  const island = createIsland({ cell: 4 });
  const zones = island.ZONES.map((z) => ({ id: z.id, x: z.x, z: z.z, r: z.r, spawn: z.spawn }));
  const ctx = { zones, heightAt: island.getHeight, walkable: island.isWalkable, waterLevel: island.waterLevel };
  const items = generateDefaults(ctx);
  assert.deepEqual(countByType(items), COUNTS);
  const ids = items.map((it) => it.id);
  assert.equal(new Set(ids).size, ids.length, 'IDs eindeutig');
  assert.deepEqual(items.map((it) => it.id), generateDefaults(ctx).map((it) => it.id), 'deterministisch');
  const free = items.filter((it) => it.type === 'lichtsplitter' && !it.hidden);
  assert.equal(free.length, 64);
  assert.equal(items.filter((it) => it.type === 'lichtsplitter' && it.hidden).length, 36, 'drei versteckte je Aussichtspunkt');
  for (const it of free.concat(items.filter((it) => it.type === 'muschel'))) assert.ok(island.isWalkable(it.pos.x, it.pos.z) && island.getHeight(it.pos.x, it.pos.z) > 0.2, it.id + ' liegt an Land');
  assert.equal(AUSSICHTSPUNKTE.length, 12); assert.equal(NEBELKERNE.length, 10);
  assert.ok(items.filter((it) => it.type === 'lichtsplitter' && it.hidden).every((it) => it.needs && it.needs.collectible), 'versteckte Splitter brauchen den Aussichtspunkt');
  const merged = mergeCollectibles(items, [{ items: [{ id: 'ls-hafen-01', type: 'lichtsplitter', pos: { x: 1, z: 2 } }, { id: 'neu', type: 'muschel', pos: { x: 0, z: 0 } }] }]);
  assert.equal(merged.length, items.length + 1);
  assert.equal(merged.find((it) => it.id === 'ls-hafen-01').pos.x, 1, 'Inhalt ersetzt Standard mit gleicher ID');
});

test('Nachtwache: Varianten aus Figur × Tank, jede Hilfe wird belohnt, Kandidat je Nacht, Nachtfenster', async () => {
  const defs = (await loadContent()).filter((e) => e.kind === 'npcs' && !e.loadError).map((e) => e.def);
  assert.ok(variantCount(defs) >= 20, `${variantCount(defs)} Varianten`);
  const jolie = defs.find((d) => d.id === 'jolie');
  const nw = generateNachtwache(jolie, { need: 'zugehoerigkeit', day: 3 });
  assert.equal(nw.id, 'nw-jolie-zugehoerigkeit'); assert.equal(nw.help.length, 4);
  assert.ok(nw.help.some((h) => h.fits === 'zugehoerigkeit') && nw.help.some((h) => h.adult), 'passende Hilfe und Erwachsene holen sind dabei');
  assert.ok(nw.reward.other.length >= 1 && nw.reward.fit.length >= 2, 'nie „falsch“');
  assert.ok(countWords(nw.line.fit) <= 12 && countWords(nw.line.other) <= 12);
  assert.deepEqual(nw.inner, ['trauer', 7]);
  assert.equal(nw.outer[0] === 'wut' || nw.outer[0] === 'angst', false, 'außen ruhig');
  for (const h of HELPS) assert.ok(countWords(h.label) <= 5, h.label);
  const cand = [{ id: 'jolie', needValue: 15, zoneFree: true }, { id: 'tun', needValue: 30, zoneFree: true }, { id: 'luc', needValue: 5, zoneFree: false }];
  assert.equal(pickTonight({ candidates: cand, day: 1 }), 'jolie', 'nur freie Regionen, leerster Tank');
  assert.equal(pickTonight({ candidates: cand, day: 1, lastNpc: 'jolie' }), 'tun', 'nicht zweimal in Folge');
  assert.equal(pickTonight({ candidates: [{ id: 'luc', needValue: 5, zoneFree: false }], day: 1 }), null);
  assert.ok(isNightHour(23) && isNightHour(2) && !isNightHour(12) && !isNightHour(19.5));
});

test('Karte: Kacheln, Umkreis, Teaser-Fähigkeiten', () => {
  assert.equal(tileOf(-190, -190), 0); assert.equal(tileOf(189, 189), MAP_N * MAP_N - 1); assert.equal(tileOf(500, 0), -1);
  const t = tilesInRadius(0, 0, 26);
  assert.ok(t.length >= 9 && t.length <= 25, `${t.length} Kacheln`);
  assert.ok(t.includes(tileOf(0, 0)));
  assert.ok(tilesInRadius(0, 0, 72).length > t.length);
  for (const v of Object.values(REGION_NEEDS)) assert.ok(['blick', 'teamgeist', 'schwimmen', 'klettern', 'segel', 'tauchen', 'ruhe', 'mut'].includes(v));
});

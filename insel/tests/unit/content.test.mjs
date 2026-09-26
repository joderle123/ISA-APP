// Unit-Tests Content-Schema: gültige Fixtures (Beispiele aus CONTENT-SCHEMA.md) gehen durch, kaputte werden
// mit deutscher Meldung (Datei, Pfad, Grund) abgelehnt; Text-Linter (Wortgrenzen, Blasen, Verbotsliste, Quest-Pflichtfelder).
// Aufruf: node tests/unit/content.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadContent, knownSites } from '../../tools/content-load.mjs';
import { validateContent, lintContent, formatIssue, countWords, hasForbidden, bubblesBeforeChoice, checkCond, checkEffects, UNIT_IDS, FORBIDDEN_WORDS } from '../../src/content/schema/index.js';
import { createCtx } from '../../src/content/schema/util.js';

const FIX = join(fileURLToPath(new URL('.', import.meta.url)), '../fixtures');
const sites = await knownSites();
const has = (issues, file, path, part) => issues.some((i) => i.file.endsWith(file) && (path === null || i.path === path) && i.msg.includes(part));

test('gültige Fixtures: Validator und Linter ohne Fehler', async () => {
  const t0 = Date.now();
  const entries = await loadContent(join(FIX, 'valid'));
  assert.equal(entries.filter((e) => e.loadError).length, 0);
  const r = validateContent(entries, { knownSites: sites });
  assert.deepEqual(r.errors.map(formatIssue), []);
  assert.ok(Object.keys(r.counts).length >= 12, 'alle Inhaltsarten vertreten: ' + Object.keys(r.counts).join(','));
  const l = lintContent(entries);
  assert.deepEqual(l.errors.map(formatIssue), []);
  assert.ok(Date.now() - t0 < 5000, 'unter 5 s');
});

test('kaputte Fixtures: jede Datei wird mit Datei · Pfad · Grund abgelehnt', async () => {
  const entries = await loadContent(join(FIX, 'broken'));
  const r = validateContent(entries, { knownSites: sites });
  const files = new Set(r.errors.map((e) => e.file));
  for (const e of entries) assert.ok(files.has(e.file), 'Fehler erwartet in ' + e.file);
  for (const e of r.errors) { assert.ok(e.file && typeof e.msg === 'string' && e.msg.length > 5); assert.match(formatIssue(e), /^✘ content\//); }
  assert.ok(has(r.errors, 'echoes/echo-boese.js', '', 'braucht repair'), 'negatives Echo ohne Reparatur');
  assert.ok(has(r.errors, 'quests/j1-e11.js', 'steps.0.params.dialogue', "gibt es nicht"), 'ID-Verweis');
  assert.ok(has(r.errors, 'quests/j1-e11.js', 'patch.back', 'Pflichtfeld'), 'Pflichtfeld');
  assert.ok(has(r.errors, 'quests/j1-e11.js', 'onComplete.0.bond', 'nie sinken'));
  assert.ok(has(r.errors, 'quests/j1-e11.js', 'onComplete.1.kaputt', 'unbekannter Effekt'), 'Effect-DSL');
  assert.ok(has(r.errors, 'quests/j1-e11.js', 'steps.1.params.win', 'gewaltfrei'));
  assert.ok(has(r.errors, 'dialogues/e99-kaputt.js', 'unit', "'j1-e99' gibt es nicht"), 'Einheiten-ID');
  assert.ok(has(r.errors, 'dialogues/e99-kaputt.js', 'nodes.c.choices.0.goto', 'kein Knoten'));
  assert.ok(has(r.errors, 'regions/nirgendwo.js', 'id', 'unbekannt'));
  assert.ok(has(r.errors, 'minigames/x.js', 'template', 'unbekannt'));
  assert.ok(has(r.errors, 'npcs/kaputt.js', 'tanks.hunger', 'unbekannter Tank'));
  assert.ok(has(r.errors, 'gadgets/atem.js', 'effect.puls', 'senken'));
  assert.ok(r.warnings.some((w) => w.msg.includes('pulsCap') || w.msg.includes('Rot')));
});

test('Text-Linter: Wortgrenzen, Blasen, Verbotsliste, Quest-Pflichtfelder', async () => {
  const entries = await loadContent(join(FIX, 'broken'));
  const l = lintContent(entries);
  assert.ok(has(l.errors, 'dialogues/e99-kaputt.js', 'nodes.c.say', 'SAY hat 15'));
  assert.ok(has(l.errors, 'dialogues/e99-kaputt.js', 'nodes.c', '3 Blasen'));
  assert.ok(has(l.errors, 'dialogues/e99-kaputt.js', 'nodes.c.choices.2.label', 'LABEL hat 6'));
  assert.ok(has(l.errors, 'quests/j1-e11.js', 'glimm', 'einatmen'));
  assert.ok(has(l.errors, 'quests/j1-e11.js', 'glimm', 'GLIMM hat 7'));
  assert.ok(has(l.errors, 'gadgets/atem.js', 'name', 'atemübung'));
  assert.ok(has(l.errors, 'regions/nirgendwo.js', 'sites.bodyscan', 'bodyscan'), 'Verbotsliste auch in Schlüsseln/IDs');
  for (const f of ['patch.back', 'echteWelt', 'debrief']) assert.ok(has(l.errors, 'quests/j1-e11.js', f, 'Jede Quest braucht'));
  assert.equal(countWords('Bei Rot hört keiner zu.'), 5);
  assert.equal(countWords('…'), 0);
  assert.equal(countWords('Anspannung 0–100: Grün, Gelb, Rot.'), 5);
  for (const w of FORBIDDEN_WORDS) assert.ok(hasForbidden('xx ' + w.toUpperCase() + ' yy'), w);
  assert.equal(hasForbidden('Die Böe kam.'), null);
  assert.equal(hasForbidden('Der Traum ist groß.'), null);
  const b = bubblesBeforeChoice({ nodes: { a: { say: '1', goto: 'b' }, b: { say: '2', goto: 'c' }, c: { say: '3', choices: [{ say: 'x', end: true }] }, d: { say: 'solo', choices: [] } } });
  assert.deepEqual(b, [{ node: 'c', bubbles: 3 }, { node: 'd', bubbles: 1 }]);
});

test('Cond/Effect-DSL: Beispiele aus dem Schema', () => {
  const ok = (fn, v) => { const ctx = createCtx('t', 'x'); const r = fn(ctx, [], v); return r && ctx.errors.length === 0; };
  const conds = [{ unit: 'j1-e04' }, { unitDone: 'j1-e04' }, { ability: 'segel' }, { upgrade: 'blick.tanks' }, { feather: 'wut' }, { item: 'kaeltekristall' },
    { flag: 'kodex.stopp' }, { flag: ['x', '>=', 3] }, { bond: ['jolie', 2] }, { time: 'night' }, { time: [18, 23] }, { puls: ['<', 70] }, { npcHitze: ['luc', '>', 70] },
    { mode: 'profi' }, { shard: 4 }, { all: [{ mode: 'profi' }, { shard: 1 }] }, { any: [{ time: 'day' }] }, { not: { ability: 'mut' } }];
  for (const c of conds) assert.ok(ok(checkCond, c), JSON.stringify(c));
  for (const c of [{ ability: 'fliegen' }, { puls: 70 }, { bond: ['jolie', 5] }, { time: 'abend' }, { unit: 'j1-e40' }, { x: 1 }, { all: [] }, { ability: 'segel', mode: 'profi' }]) assert.ok(!ok(checkCond, c), 'abgelehnt: ' + JSON.stringify(c));
  const effects = [{ flag: 'x', set: true }, { bond: ['tiago', +1] }, { deed: 'jolie-im-dunkeln-gefuehrt' }, { tank: { npc: 'tiago', tank: 'anerkennung', add: 60, kind: 'need' } },
    { puls: -20 }, { npcHitze: ['luc', -30] }, { emotion: { npc: 'maelle', primary: ['freude', 6], secondary: ['trauer', 8] } }, { grant: 'segel' }, { upgrade: 'blick.doppel' },
    { feather: 'angst' }, { gadget: 'klangmuschel' }, { wurzel: 'krabbe' }, { veil: { zone: 'strand', to: 0.3, from: { site: 'strand.muschelbucht' } } }, { relapse: { patch: 'surfspot', to: 0.9 } },
    { patch: 'j1-e04' }, { lichtsplitter: 3 }, { cosmetic: 'segel-regenbogen' }, { shard: 2 }, { quest: ['start', 'j1-e05'] }, { scene: { enter: 'gezeitenhoehle', spawn: 'eingang' } },
    { glimm: 'Da. Windstille.' }, { anim: { npc: 'jolie', emote: 'sitzen-neben' } }, { gate: { open: 'markt-hintertor' } }];
  assert.ok(ok(checkEffects, effects));
  for (const e of [{ bond: ['x', -1] }, { veil: { zone: 'mond', to: 0.5 } }, { shard: 10 }, { grant: 'zaubern' }, { mood: ['luc', 'verstimmt'] }, { tank: { npc: 'x', tank: 'hunger', add: 1 } }]) assert.ok(!ok(checkEffects, [e]), 'abgelehnt: ' + JSON.stringify(e));
  assert.equal(UNIT_IDS.length, 39);
});

// Unit-Tests Quest-Engine (Node, ohne Browser): Cond/Effect-DSL, Zustände, Beispiel-Quest j1-e11 headless mit einem
// Fake-Adapter, Minimaltest je Vorlage (12), Hinweisleiter bei simulierten Fehlschlägen, Kurzfassung, Taten-Log,
// Echos (negativ nur mit Reparatur), Teil-Farbwelle und Aufnäher beim Abschluss.
// Aufruf: node --test tests/unit/quests.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createEvents } from '../../src/engine/events.js';
import { createState } from '../../src/core/state.js';
import { createContent } from '../../src/core/content.js';
import { defaultState } from '../../src/core/save.js';
import { createDslContext, evalCond, applyEffects, pulsZone } from '../../src/systems/quests/dsl.js';
import { createQuestEngine } from '../../src/systems/quests/engine.js';
import { createRunner, TEMPLATES } from '../../src/systems/quests/templates.js';
import { createHintLadder, HINT_STAGES } from '../../src/systems/quests/hints.js';
import { createDeeds, createEchoes } from '../../src/systems/quests/deeds.js';
import UNITS from '../../src/content/units.js';
import QUEST_E11 from '../../src/content/quests/j1-e11.js';
import DIALOG_E11 from '../../src/content/dialogues/e11-luc-kante.js';
import MINI_E11 from '../../src/content/minigames/e11-tauziehen.js';
import NPC_LUC from '../../src/content/npcs/luc.js';
import REGION_KLIPPEN from '../../src/content/regions/klippen.js';

const SITES = { wetterwarte: { x: -98, z: -70, r: 5 }, kante: { x: -104, z: -96, r: 0 }, dorfplatz: { x: 4, z: 110, r: 11 }, steg: { x: 6, z: 138, r: 0 } };

// ---- Testwelt: Zustand, Inhalte, DSL, Fake-Adapter ----
function world({ extra = [] } = {}) {
  const events = createEvents();
  const state = createState({ events, data: defaultState(3) });
  const content = createContent({ entries: [
    { file: 'content/units.js', kind: 'units', name: 'units', def: UNITS },
    { file: 'content/quests/j1-e11.js', kind: 'quests', name: 'j1-e11', def: QUEST_E11 },
    { file: 'content/dialogues/e11-luc-kante.js', kind: 'dialogues', name: 'e11-luc-kante', def: DIALOG_E11 },
    { file: 'content/minigames/e11-tauziehen.js', kind: 'minigames', name: 'e11-tauziehen', def: MINI_E11 },
    { file: 'content/npcs/luc.js', kind: 'npcs', name: 'luc', def: NPC_LUC },
    { file: 'content/regions/klippen.js', kind: 'regions', name: 'klippen', def: REGION_KLIPPEN },
    ...extra,
  ], island: { SITES, zoneById: () => null } });
  const log = { veil: [], glimm: [], markers: [], quests: [], events: [], dialogues: [] };
  const dsl = createDslContext({ state, events, content, hooks: {
    veil: (v) => { log.veil.push(v); state.set('veil.zones.' + v.zone, v.to); return true; },
    glimm: (t) => { log.glimm.push(t); },
    quest: (v) => { log.quests.push(v); if (v[0] === 'start') engine.start(v[1]); if (v[0] === 'offer') engine.offer(v[1]); },
  } });
  const player = { x: 0, z: 0, y: 0, speed: 0, sprinting: false, state: 'ground', yaw: 0 };
  const interactions = new Map();
  const ctx = {
    resolvePos: (p) => content.resolveSite(p),
    player: () => ({ ...player }),
    marker: (t, o) => { log.markers.push({ t, o }); },
    dialogue: async (id) => { log.dialogues.push(id); return { reason: ctx.dialogueResult || 'end', id }; },
    minigame: async (id) => ctx.minigameResult || { ok: true, medal: 'bronze' },
    memory: async (id) => ({ memory: id, shard: 5 }),
    nachtwache: async (pool) => ({ id: pool[0], fit: true }),
    enterRoom: async () => true,
    lotsen: async () => ({ ok: true }),
    interaction: (o) => { interactions.set(o.id, o); return { remove: () => interactions.delete(o.id) }; },
    spawn: () => ({ remove() {} }),
    carry: () => { ctx.carried = true; }, drop: () => { ctx.carried = false; }, carrying: () => !!ctx.carried,
    on: (n, fn) => events.on(n, fn),
    glimm: (t) => log.glimm.push(t), toast: () => {}, say: () => {},
    pulsCap: (v) => { ctx.cap = v; },
    evalCond: (c) => evalCond(c, dsl),
    applyEffects: (l) => applyEffects(l, dsl),
    minMedal: () => 'bronze',
    rueckenwind: () => { ctx.rueckenwindCount = (ctx.rueckenwindCount || 0) + 1; },
    markerGlow: (v) => { ctx.glow = v; },
    offerSkip: async () => (ctx.skipAnswer !== undefined ? ctx.skipAnswer : true),
    emit: (n, p) => events.emit(n, p),
  };
  const engine = createQuestEngine({ content, state, ctx, dsl, emit: (n, p) => { log.events.push([n, p]); events.emit(n, p); } });
  events.on('unit:unlock', (e) => engine.onUnitState(e.id, 'offen'));
  state.on('units', (e) => { const id = e.path.split('.')[1]; if (id && e.value) engine.onUnitState(id, e.value); });
  const tick = (n = 1, dt = 1 / 30) => { for (let i = 0; i < n; i++) engine.update(dt); };
  const settle = () => new Promise((r) => setTimeout(r, 0));
  return { events, state, content, dsl, ctx, engine, player, interactions, log, tick, settle };
}

test('DSL: Bedingungen und Wirkungen (Flags, Bindung nie sinkend, Puls/Hitze 0–100, Upgrades, Splitter)', async () => {
  const w = world();
  const { state, dsl } = w;
  await applyEffects([{ flag: 'kodex.stopp', set: true }, { flag: 'zaehler', set: 3 }, { bond: ['luc', 2] }, { bond: ['luc', -5] }, { puls: 120 }, { npcHitze: ['luc', 90], set: true }, { npcHitze: ['luc', -30] }, { upgrade: 'ruhe.puls' }, { grant: 'segel' }, { shard: 4 }, { lichtsplitter: 3 }, { lichtsplitter: 2 }, { deed: 'luc-leine' }], dsl);
  assert.equal(state.get('flags.kodex.stopp'), true);
  assert.equal(state.get('bonds.luc'), 2, 'negative Bindung wird ignoriert');
  assert.equal(state.get('session.puls'), 100);
  assert.equal(dsl.hitze('luc'), 60);
  assert.deepEqual(state.get('upgrades'), ['ruhe.puls']);
  assert.ok(state.get('abilities').includes('ruhe') && state.get('abilities').includes('segel'));
  assert.deepEqual(state.get('shards'), [4]);
  assert.equal(state.get('lichtsplitter'), 5);
  assert.ok(state.get('deeds').includes('luc-leine') && state.get('deedLog').length === 1);
  assert.equal(evalCond({ all: [{ flag: 'kodex.stopp' }, { flag: ['zaehler', '>=', 3] }, { bond: ['luc', 2] }, { puls: ['>', 70] }, { npcHitze: ['luc', '<', 70] }, { upgrade: 'ruhe.puls' }, { shard: 4 }, { not: { unitDone: 'j1-e11' } }] }, dsl), true);
  assert.equal(evalCond({ any: [{ bond: ['luc', 3] }, { mode: 'profi' }] }, dsl), false);
  state.set('time.hour', 23);
  assert.equal(evalCond({ time: 'night' }, dsl), true);
  assert.equal(evalCond({ time: [18, 6] }, dsl), true);
  assert.equal(pulsZone(29), 'gruen'); assert.equal(pulsZone(30), 'gelb'); assert.equal(pulsZone(70), 'rot');
});

test('Beispiel-Quest j1-e11 läuft headless: Code → offen → aktiv → Schritte → fertig mit Teil-Farbwelle, Aufnäher, Glimm', async () => {
  const w = world();
  const { state, engine, player, log, tick, settle, events } = w;
  assert.equal(engine.status('j1-e11'), 'gesperrt');
  state.set('units.j1-e11', 'offen'); events.emit('unit:unlock', { id: 'j1-e11' });
  assert.equal(engine.status('j1-e11'), 'aktiv', 'offen startet automatisch, wenn nichts läuft');
  assert.equal(engine.active, 'j1-e11');
  assert.equal(engine.stepInfo().step.id, 'wetterwarte');
  assert.ok(log.glimm.includes('Ich hab jetzt Farben.'), 'onStart-Glimm');
  const m = engine.markerTarget();
  assert.ok(m && Math.abs(m.x - -98) < 1e-9 && Math.abs(m.z - -70) < 1e-9, 'Marker zeigt zur Wetterwarte');
  // hinlaufen (Teleport in die Nähe), ein Update-Tick erledigt den Schritt
  player.x = -97; player.z = -70; tick(2); await settle();
  assert.equal(engine.stepInfo().step.id, 'windschatten');
  player.x = -104; player.z = -96; tick(2); await settle(); await settle();
  // Szene startet an der Kante (Fake-Dialog endet sofort mit 'end') → Schritt fertig, optionaler Schritt prognose folgt
  assert.deepEqual(log.dialogues, ['e11-luc-kante'], 'Szene an der Kante gespielt');
  assert.equal(engine.stepInfo().step.id, 'prognose');
  assert.ok(engine.stepInfo().step.optional);
  engine.skipStep();
  await settle(); await settle();
  assert.equal(engine.status('j1-e11'), 'fertig');
  assert.equal(engine.active, null);
  assert.ok(log.veil.some((v) => v.zone === 'klippen' && v.to === 0.8), 'Teil-Farbwelle auf 0,8');
  assert.equal(state.get('veil.zones.klippen'), 0.8);
  assert.ok(state.get('patches').includes('j1-e11'), 'Aufnäher');
  assert.equal(state.get('lichtsplitter'), 3);
  assert.equal(state.get('bonds.luc'), 1);
  assert.ok(log.glimm.includes('Bei Rot hört keiner zu.'), 'Glimm-Zeile der Quest');
  assert.ok(log.events.some(([n, p]) => n === 'unit:complete' && p.id === 'j1-e11'));
  assert.ok(log.events.some(([n, p]) => n === 'quest:complete' && p.id === 'j1-e11' && p.kurz === false));
  const q = state.get('quests.j1-e11');
  assert.deepEqual(q.done, ['wetterwarte', 'windschatten', 'luc', 'prognose']);
  assert.deepEqual(q.skipped, ['prognose']);
});

test('Kurzfassung: units kurz → Fähigkeit und Schleier-Anteil sofort, 3-Minuten-Szene spielbar, Einheit bleibt kurz', async () => {
  const w = world();
  const { state, engine, player, tick, settle, log } = w;
  state.set('units.j1-e11', 'kurz');
  await settle();
  assert.ok(state.get('upgrades').includes('ruhe.puls'), 'Upgrade aus der Kurzfassung');
  assert.equal(state.get('veil.zones.klippen'), 0.8);
  assert.equal(engine.status('j1-e11'), 'kurz');
  assert.ok(engine.startKurz('j1-e11'));
  assert.equal(engine.stepInfo().step.id, 'windschatten', 'nur die Kurz-Schritte');
  player.x = -104; player.z = -96; tick(2); await settle(); await settle(); await settle();
  assert.equal(engine.status('j1-e11'), 'kurz', 'Kurzfassung macht die Einheit nicht fertig');
  assert.equal(state.get('quests.j1-e11').kurzDone, true);
  assert.ok(!log.events.some(([n]) => n === 'unit:complete'));
});

test('Hinweisleiter: 2 → Puls −20 + Rückenwind, 3 → Glimm, 5 → Ziel leuchtet, 8 → Überspringen', async () => {
  const w = world();
  const { state, engine, ctx, log, settle } = w;
  state.set('session.puls', 60);
  state.set('units.j1-e11', 'offen');
  const stages = [];
  w.events.on('quest:hint', (e) => stages.push(e.stage));
  for (let i = 0; i < 5; i++) engine.failStep('sturz');
  assert.deepEqual(stages, ['rueckenwind', 'glimm', 'leuchten']);
  assert.equal(state.get('session.puls'), 40, 'Puls −20');
  assert.equal(ctx.rueckenwindCount, 1);
  assert.ok(log.glimm.includes('Da drüben. Windstille.'));
  assert.equal(ctx.glow, true, 'Ziel leuchtet nach 5');
  for (let i = 0; i < 3; i++) engine.failStep('sturz');
  await settle();
  assert.deepEqual(stages, ['rueckenwind', 'glimm', 'leuchten', 'ueberspringen']);
  assert.equal(state.get('quests.j1-e11').fails.wetterwarte, 8);
  assert.equal(engine.stepInfo().step.id, 'windschatten', 'Überspringen angenommen → nächster Schritt');
  assert.equal(ctx.glow, false, 'Leuchten aus nach Schrittwechsel');
  // reine Leiter: Stufen feuern je Schritt nur einmal, Reset löscht
  const h = createHintLadder();
  const fired = [];
  for (let i = 0; i < 10; i++) { const r = h.fail('x'); if (r.stage) fired.push(r.stage.id); }
  assert.deepEqual(fired, HINT_STAGES.map((s) => s.id));
  h.reset('x'); assert.equal(h.failsOf('x'), 0);
});

test('jede Vorlage hat einen Minimaltest', async () => {
  const w = world();
  const { ctx, player, events, interactions } = w;
  const run = (step, opts = {}) => new Promise((resolve) => {
    const fails = [];
    const r = createRunner(step, { quest: { id: 'test' }, ctx: { ...ctx, ...(opts.ctx || {}) }, done: (res) => resolve({ res, r, fails }), fail: (why) => fails.push(why) });
    r.start();
    if (opts.after) opts.after(r, fails);
  });
  const tick = (r, n, dt = 1 / 30) => { for (let i = 0; i < n; i++) r.update(dt); };
  assert.equal(TEMPLATES.length, 12);
  // wegTor
  {
    const p = run({ id: 'w', template: 'wegTor', params: { to: { site: 'kante' } } }, { after: (r) => { player.x = 0; player.z = 0; tick(r, 2); player.x = -104; player.z = -96; tick(r, 1); } });
    const { res } = await p; assert.ok(res.at && res.at.x === -104);
  }
  // tragen
  {
    const p = run({ id: 't', template: 'tragen', params: { item: 'wasser', from: { site: 'steg' }, to: { site: 'dorfplatz' }, count: 2 } }, { after: (r) => {
      for (let k = 0; k < 2; k++) { player.x = 6; player.z = 138; r.pickup(); tick(r, 1); player.x = 4; player.z = 110; tick(r, 1); }
    } });
    const { res } = await p; assert.equal(res.spilled, 0); assert.equal(res.gold, true);
  }
  // szene: Rückzug lässt den Schritt offen, 'Reden' wiederholt, Ende schließt ab
  {
    let calls = 0;
    const dialogue = async () => (++calls === 1 ? { reason: 'rueckzug' } : { reason: 'end' });
    const p = run({ id: 's', template: 'szene', params: { dialogue: 'e11-luc-kante' } }, { ctx: { dialogue } });
    await new Promise((r) => setTimeout(r, 5));
    const it = interactions.get('szene-s'); assert.ok(it, 'Reden-Interaktion nach Rückzug'); it.onAction();
    const { res } = await p; assert.equal(res.reason, 'end'); assert.equal(calls, 2);
  }
  // ermitteln: 2 Fakten nötig, Urteil zählt nicht
  {
    const p = run({ id: 'e', template: 'ermitteln', params: { board: 'gericht', need: 2, evidence: [
      { id: 'f1', kind: 'fakt', pos: { x: 1, z: 1 }, say: '22 von 60.' }, { id: 'u1', kind: 'urteil', pos: { x: 2, z: 2 }, say: 'Dumm.' }, { id: 'f2', kind: 'fakt', pos: { x: 3, z: 3 }, say: 'Davor 15.' }] } },
    { after: (r) => { r.collect('u1'); assert.ok(r.active); r.collect('f1'); r.collect('f2'); } });
    const { res } = await p; assert.equal(res.fakten, 2); assert.equal(res.board, 'gericht');
  }
  // treppe: Fehlschlag auf Stufe 2 (Minispiel scheitert) rutscht auf Stufe 1 zurück, dann klappt es
  {
    const steps = [{ id: 'a', template: 'wegTor', params: { to: { x: 10, z: 10 } } }, { id: 'b', template: 'pruefung', params: { minigame: 'e11-tauziehen' } }];
    let calls = 0;
    const minigame = async () => (++calls === 1 ? { ok: false, cancelled: false } : { ok: true, medal: 'gold' });
    const stufen = [];
    const off = events.on('treppe:stufe', (e) => stufen.push(e.stufe));
    let r0 = null;
    const p = run({ id: 'tr', template: 'treppe', params: { npcs: ['luc', 'tun'], steps, slideBack: true } }, { ctx: { minigame }, after: (r) => { r0 = r; player.x = 10; player.z = 10; tick(r, 1); } });
    await new Promise((r) => setTimeout(r, 5));
    assert.equal(r0.stufe, 0, 'nach dem Fehlschlag zurück auf Stufe 1');
    tick(r0, 1);
    const { res, fails } = await p;
    off();
    assert.equal(res.stufen, 2); assert.equal(fails.length, 1); assert.equal(calls, 2);
    assert.deepEqual(stufen, [0, 1, 0, 1]);
  }
  // befreunden: still sitzen 6 s, Sprint vertreibt
  {
    const p = run({ id: 'b', template: 'befreunden', params: { creature: 'tiefentaucher', rule: 'still-sitzen', seconds: 2, pos: { x: 0, z: 0 } } }, { after: (r, fails) => {
      player.x = 1; player.z = 1; player.speed = 0; player.sprinting = true; tick(r, 1); assert.equal(fails.length, 1, 'Sprint = Flucht');
      player.sprinting = false; tick(r, 70);
    } });
    const { res } = await p; assert.equal(res.rule, 'still-sitzen'); assert.ok(res.seconds >= 2);
  }
  // lotsen
  {
    const p = run({ id: 'l', template: 'lotsen', params: { guide: 'jolie', mode: 'befehle', stoppRecht: true, room: 'hafengrotte' } });
    await new Promise((r) => setTimeout(r, 2));
    interactions.get('lotsen-l').onAction();
    const { res } = await p; assert.equal(res.ok, true);
  }
  // boss: 2 Phasen, Sieg durch Hilfe holen (Ereignis), Puls-Deckel gesetzt und wieder frei
  {
    const p = run({ id: 'bo', template: 'boss', params: { win: 'hilfe-holen', phases: [
      { zone: 'gruen', template: 'wegTor', params: { to: { x: 30, z: 30 } }, pulsCap: 60 }, { zone: 'rot', template: 'wegTor', params: { to: { x: 40, z: 40 } }, pulsCap: 80 }] } },
    { after: (r) => { assert.equal(ctx.cap, 60); player.x = 30; player.z = 30; tick(r, 1); assert.equal(ctx.cap, 80); player.x = 40; player.z = 40; tick(r, 1); events.emit('hilfe:holen', {}); } });
    const { res } = await p; assert.equal(res.win, 'hilfe-holen'); assert.equal(ctx.cap, null);
  }
  // bauen / pruefung: Bronze reicht, Scheitern zählt, failForward nach 3 Versuchen
  {
    const { res } = await run({ id: 'pr', template: 'pruefung', params: { minigame: 'e11-tauziehen' } }, { ctx: { minigame: async () => ({ ok: false, medal: 'silber' }) } });
    assert.equal(res.medal, 'silber');
    let n = 0;
    const p = run({ id: 'ba', template: 'bauen', params: { minigame: 'e11-tauziehen' } }, { ctx: { minigame: async () => { n++; return { ok: false, cancelled: false, medal: null }; } } });
    await new Promise((r) => setTimeout(r, 3));
    interactions.get('mini-ba').onAction(); await new Promise((r) => setTimeout(r, 3));
    interactions.get('mini-ba').onAction();
    const b = await p; assert.equal(n, 3); assert.equal(b.res.ok, false); assert.equal(b.fails.length, 2);
  }
  // nachtwache, erinnerung
  {
    const { res } = await run({ id: 'n', template: 'nachtwache', params: { pool: ['nw-jolie-steg'] } }); assert.equal(res.id, 'nw-jolie-steg');
    const e = await run({ id: 'm', template: 'erinnerung', params: { memory: 'erinnerung-5-pit' } }); assert.equal(e.res.shard, 5);
  }
});

test('Taten-Log und Echos: Lagerfeuer-Sätze, negatives Echo nur mit Reparatur, Reparatur-Quest hebt „verstimmt“ auf', async () => {
  const w = world({ extra: [
    { file: 'content/npcs/tiago.js', kind: 'npcs', name: 'tiago', def: { id: 'tiago', name: 'Tiago', icon: 'surfbrett', color: '#ff8c2a', lines: { campfire: { 'tiago-publikum': 'Danke fürs Publikum.' } } } },
    { file: 'content/quests/rep-tiago-surfspot.js', kind: 'quests', name: 'rep-tiago-surfspot', def: { id: 'rep-tiago-surfspot', title: 'Nachholen am Surfspot', region: 'strand', steps: [{ id: 'hin', template: 'wegTor', params: { to: { site: 'steg' } } }], onComplete: [{ bond: ['tiago', 1] }], glimm: 'Besser spät als nie.', patch: { icon: 'surfbrett', color: '#ff8c2a', back: 'Reparatur.' }, echteWelt: 'x', debrief: ['y'] } },
  ] });
  const { state, engine, dsl, events, player, tick, settle } = w;
  const deeds = createDeeds({ state, content: w.content, time: () => ({ day: 3 }) });
  deeds.add('tiago-publikum', { npc: 'tiago', unit: 'j1-e04' });
  deeds.add('luc-leine', { npc: 'luc' });
  assert.equal(deeds.today().length, 2);
  assert.deepEqual(deeds.campfireLines(3), [{ who: 'luc', text: 'Danke für die Leine.', deed: 'luc-leine' }, { who: 'tiago', text: 'Danke fürs Publikum.', deed: 'tiago-publikum' }], 'neueste Tat zuerst, je Figur ein Satz');
  assert.deepEqual(deeds.campfireLines(1).map((l) => l.who), ['luc']);
  assert.ok(state.get('deeds').includes('luc-leine'));
  const echoes = createEchoes({ state, evalCond: (c) => evalCond(c, dsl), time: () => ({ day: Number(state.get('time.day', 1)) }) });
  assert.equal(echoes.register({ id: 'boese', effect: { mood: ['tiago', 'verstimmt'] } }), false, 'negativ ohne Reparatur abgelehnt');
  assert.equal(echoes.register({ id: 'echo-tiago-rennen', when: { flag: 'e05.tiago-rennen-verpasst' }, delay: { days: 1 }, effect: { mood: ['tiago', 'verstimmt'] }, line: { npc: 'tiago', say: 'Du warst nicht beim Rennen.' }, repair: { quest: 'rep-tiago-surfspot', clears: true } }), true);
  assert.deepEqual(echoes.check(), [], 'Bedingung falsch');
  state.set('flags.e05.tiago-rennen-verpasst', true);
  assert.deepEqual(echoes.check(), [], 'Verzögerung: 1 Tag');
  state.set('time.day', 2);
  assert.deepEqual(echoes.check(), ['echo-tiago-rennen']);
  assert.equal(state.get('moods.tiago'), 'verstimmt');
  assert.equal(echoes.pending('tiago')[0].line.say, 'Du warst nicht beim Rennen.');
  echoes.consume('echo-tiago-rennen');
  assert.equal(echoes.pending('tiago').length, 0);
  assert.deepEqual(echoes.repairFor('rep-tiago-surfspot'), ['echo-tiago-rennen']);
  echoes.clear('echo-tiago-rennen');
  assert.equal(state.get('moods.tiago'), undefined, 'Reparatur hebt verstimmt auf');
  // über die Engine: Echo feuert → Reparatur-Quest wird angeboten und gestartet, Abschluss räumt das Echo
  engine.echoes.register({ id: 'echo-2', when: { flag: 'e05.tiago-rennen-verpasst' }, effect: { mood: ['tiago', 'verstimmt'] }, line: { npc: 'tiago', say: 'Hm.' }, repair: { quest: 'rep-tiago-surfspot', clears: true } });
  assert.deepEqual(engine.echoes.check(), ['echo-2']);
  assert.equal(engine.active, 'rep-tiago-surfspot');
  assert.equal(state.get('moods.tiago'), 'verstimmt');
  player.x = 6; player.z = 138; tick(2); await settle(); await settle();
  assert.equal(engine.status('rep-tiago-surfspot'), 'fertig');
  assert.equal(state.get('moods.tiago'), undefined);
  assert.equal(state.get('bonds.tiago'), 1);
  assert.ok(events);
});

test('Wiederaufnahme: laufende Quest wird am gespeicherten Schritt fortgesetzt', async () => {
  const w = world();
  const { state, engine, player, tick, settle } = w;
  state.set('units.j1-e11', 'offen'); engine.onUnitState('j1-e11', 'offen');
  player.x = -97; player.z = -70; tick(2); await settle();
  assert.equal(state.get('quests.j1-e11').step, 'windschatten');
  const snap = state.snapshot();
  // „Neu laden“: frischer Zustand aus dem Schnappschuss, Engine nimmt wieder auf
  state.reset(snap);
  engine.resume();
  assert.equal(engine.active, 'j1-e11');
  assert.equal(engine.stepInfo().step.id, 'windschatten');
  assert.equal(engine.progress().done, 1);
});

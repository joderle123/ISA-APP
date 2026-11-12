// Unit-Tests Mission QUELLE „Leck im Nest“ (j1-e04, BAUPLAN §2.1 C, §2.3 Punkt 2/8/11): Quest-Daten (11 Schritte,
// Kurzfassung Blick + Crew-Glas), Quest-Vorlage 'auftrag' (fertig über ein Flag, auch nach Neuladen), Ablauf headless
// bis Aufnäher + Farbwelle am Nest, Kurzfassung gibt Blick-Stufe und Aufnäher, Falle Hängematte/Schlaf führt nicht
// weiter, nur die Winde öffnet die Fotowand, eigene Muschel im Crew-Glas wird nie gespeichert, der Lehrsatz steht nur
// auf der Rückseite (nie in Dialog oder Glimm), Texte kurz, Lehrerheft mit Wortliste und Hinweissatz.
// Aufruf: node --test tests/unit/quelle.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createEvents } from '../../src/engine/events.js';
import { createState } from '../../src/core/state.js';
import { createContent } from '../../src/core/content.js';
import { defaultState } from '../../src/core/save.js';
import { createDslContext, evalCond, applyEffects } from '../../src/systems/quests/dsl.js';
import { createQuestEngine } from '../../src/systems/quests/engine.js';
import { createRunner } from '../../src/systems/quests/templates.js';
import { VALIDATORS } from '../../src/content/schema/defs.js';
import UNITS from '../../src/content/units.js';
import QUEST from '../../src/content/quests/j1-e04.js';
import HAFEN from '../../src/content/regions/hafen.js';
import GLIMM from '../../src/content/glimm.js';
import D_ILDA from '../../src/content/dialogues/e04-ilda-blick.js';
import D_TUN from '../../src/content/dialogues/e04-tun.js';
import D_MOTOR from '../../src/content/dialogues/e04-blitzmotor.js';
import D_WINDE from '../../src/content/dialogues/e04-winde.js';
import D_JOLIE from '../../src/content/dialogues/e04-jolie.js';
import D_CREW from '../../src/content/dialogues/e04-crewglas.js';
import M_OBER from '../../src/content/minigames/e04-oberflaeche-tun.js';
import M_LEINE from '../../src/content/minigames/e04-leine-jolie.js';
import { buildLehrerheft } from '../../tools/postbuild/lehrerheft.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const DIALOGE = [D_ILDA, D_TUN, D_MOTOR, D_WINDE, D_JOLIE, D_CREW];
const vctx = () => ({ file: 't', errors: [], warnings: [], refs: [] });
const words = (s) => String(s).split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

function world() {
  const events = createEvents();
  const state = createState({ events, data: defaultState(3) });
  const content = createContent({ entries: [
    { file: 'content/units.js', kind: 'units', name: 'units', def: UNITS },
    { file: 'content/quests/j1-e04.js', kind: 'quests', name: 'j1-e04', def: QUEST },
    { file: 'content/regions/hafen.js', kind: 'regions', name: 'hafen', def: HAFEN },
  ], island: { SITES: { bootshaus: { x: 0, z: 0, r: 0 } }, zoneById: () => null } });
  const log = { veil: [], dialogues: [], minigames: [] };
  const dsl = createDslContext({ state, events, content, hooks: {
    veil: (v) => { log.veil.push(v); state.set('veil.patches.' + v.zone, v.to); return true; },
    relapse: (v) => { log.veil.push({ relapse: v.patch, to: v.to }); state.set('veil.patches.' + v.patch, v.to); return true; },
  } });
  const ctx = {
    resolvePos: () => ({ x: 0, z: 0, r: 4 }),        // alle Orte „hier“: Szenen starten sofort
    player: () => ({ x: 0, z: 0, y: 0, speed: 0 }),
    marker: () => {}, interaction: () => ({ remove() {} }), spawn: () => ({ remove() {} }), on: (n, fn) => events.on(n, fn),
    dialogue: async (id) => { log.dialogues.push(id); return { reason: 'end' }; },
    minigame: async (id) => { log.minigames.push(id); return { ok: true, medal: 'bronze' }; },
    glimm: () => {}, evalCond: (c) => evalCond(c, dsl), applyEffects: (l) => applyEffects(l, dsl), minMedal: () => 'bronze',
    emit: (n, p) => events.emit(n, p),
  };
  const engine = createQuestEngine({ content, state, ctx, dsl, emit: (n, p) => events.emit(n, p), log: { warn() {}, error() {} } });
  state.on('units', (e) => { const id = e.path.split('.')[1]; if (id && e.value) engine.onUnitState(id, e.value); });
  const settle = () => new Promise((r) => setTimeout(r, 0));
  const tick = (n = 2) => { for (let i = 0; i < n; i++) engine.update(1 / 30); };
  return { events, state, content, dsl, engine, log, settle, tick };
}

test('Quest-Daten: 11 Schritte wie WERKZEUG-QUESTS Nr. 1, Kurzfassung Blick + Crew-Glas, Brücken in den Unterricht, gültig', () => {
  assert.deepEqual(QUEST.steps.map((s) => s.id), ['leck', 'blick', 'tun', 'spuren', 'motor', 'winde', 'fotowand', 'wasserwerk', 'jolie', 'dachboden', 'crewglas']);
  assert.deepEqual(QUEST.kurzfassung.steps, ['blick', 'crewglas']);
  assert.deepEqual(QUEST.kurzfassung.grants, [{ upgrade: 'blick.tanks' }]);
  assert.ok(QUEST.kurzfassung.onComplete.some((e) => e.patch === 'j1-e04'));
  assert.equal(QUEST.patch.back, 'Wichtig und leer = größte Lücke.');
  assert.equal(QUEST.echteWelt, 'Welches Glas füllen bei dir Leute, nicht Dinge?');
  assert.deepEqual(QUEST.debrief, ['Warum hat die Hängematte Tun nicht geholfen?', 'Was wollte Tun, und was hat er gebraucht?']);
  assert.equal(QUEST.steps.find((s) => s.id === 'wasserwerk').params.minigame, 'e04-tank-leitungen');
  assert.equal(QUEST.steps.find((s) => s.id === 'wasserwerk').params.label, 'Wasserwerk', 'Station heißt „Wasserwerk“, nicht nur „Start“');
  assert.ok(QUEST.lehrerheft.wortliste.some((w) => w.wort === 'gekränkt'), 'gekränkt steht im Lehrerheft (vorher einführen)');
  assert.equal(QUEST.grants, undefined, 'die Blick-Stufe gibt Ilda mitten in der Quest, nicht der Start');
  const c = vctx(); assert.ok(VALIDATORS.quests(c, QUEST), JSON.stringify(c.errors));
  for (const d of DIALOGE) { const c2 = vctx(); assert.ok(VALIDATORS.dialogues(c2, d), d.id + ' ' + JSON.stringify(c2.errors)); }
  for (const m of [M_OBER, M_LEINE]) { const c3 = vctx(); assert.ok(VALIDATORS.minigames(c3, m), m.id + ' ' + JSON.stringify(c3.errors)); }
  assert.equal(M_OBER.params.words.find((w) => w.ok).t, 'gekränkt');
  assert.ok(M_LEINE.params.tests.includes('Was willst du?') && M_LEINE.params.tests.includes('Geh doch.'));
  assert.ok(UNITS.units.find((u) => u.id === 'j1-e04').code === 'QUELLE');
});

test("Vorlage 'auftrag': Marker am Ort, fertig sobald das Flag steht (auch sofort, wenn es schon gesetzt ist)", async () => {
  const w = world();
  let done = null; const marks = [];
  const ctx = { resolvePos: () => ({ x: 3, z: 4 }), marker: (t) => marks.push(t), evalCond: (c) => evalCond(c, w.dsl), emit() {} };
  const r = createRunner({ id: 'x', template: 'auftrag', label: 'Wasser im Nest', params: { flag: 'e04.leck', at: { site: 'bootshaus' } } }, { quest: { id: 'q' }, ctx, done: (res) => { done = res; } });
  r.start();
  assert.deepEqual(marks[0], { x: 3, z: 4 });
  assert.deepEqual(r.describe().target, { x: 3, z: 4 });
  r.update(0.1); assert.equal(done, null);
  w.state.set('flags.e04.leck', true);
  r.update(0.1); assert.deepEqual(done, { flag: 'e04.leck' });
  let d2 = null;
  const r2 = createRunner({ id: 'y', template: 'auftrag', params: { flag: 'e04.leck' } }, { quest: { id: 'q' }, ctx, done: (res) => { d2 = res; } });
  r2.start(); r2.update(0.1); assert.ok(d2, 'Flag schon gesetzt (Neu laden) → sofort fertig');
});

test('Ablauf headless: Code QUELLE → Nest-Schritte über Flags → Aufnäher, Lichtsplitter, Farbwelle am Nest; Neu laden = gleicher Schritt', async () => {
  const w = world();
  const { state, engine, settle, tick, log } = w;
  state.set('units.j1-e04', 'offen');
  await settle();
  assert.equal(engine.active, 'j1-e04');
  assert.equal(engine.stepInfo().step.id, 'leck');
  assert.ok(log.veil.some((v) => v.relapse === 'nest'), 'das Nest wird grau (Rückfall-Welle)');
  assert.ok(!(state.get('upgrades', []) || []).includes('blick.tanks'), 'noch keine Blick-Stufe');
  // Neu laden mitten im Leck: derselbe Schritt, halbe Planken bleiben
  state.set('flags.e04.planken', 1);
  engine.resume(); await settle();
  assert.equal(engine.stepInfo().step.id, 'leck');
  assert.equal(state.get('flags.e04.planken'), 1);
  const flags = { leck: 'e04.leck', spuren: 'e04.spuren', fotowand: 'e04.fotowand', dachboden: 'e04.dachboden' };
  for (let i = 0; i < 40 && engine.active; i++) {
    const s = engine.stepInfo();
    if (s && s.step && flags[s.step.id]) state.set('flags.' + flags[s.step.id], true);
    tick(); await settle();
  }
  assert.equal(state.get('units.j1-e04'), 'fertig');
  assert.deepEqual(log.dialogues, ['e04-ilda-blick', 'e04-tun', 'e04-blitzmotor', 'e04-winde', 'e04-jolie', 'e04-crewglas']);
  assert.deepEqual(log.minigames, ['e04-tank-leitungen']);
  assert.ok((state.get('patches', []) || []).includes('j1-e04'));
  assert.ok(state.get('lichtsplitter') >= 3);
  assert.ok(log.veil.some((v) => v.zone === 'nest' && v.to === 0), 'Farbwelle: der Fleck am Nest wird frei (freeAt)');
});

test('Kurzfassung auf frischem Spielstand: Blick-Stufe sofort, Szenen Ilda + Crew-Glas, dann Aufnäher', async () => {
  const w = world();
  const { state, engine, settle, log } = w;
  state.set('units.j1-e04', 'kurz');
  await settle();
  assert.ok(state.get('upgrades').includes('blick.tanks'));
  assert.ok(!(state.get('patches', []) || []).includes('j1-e04'));
  assert.ok(engine.startKurz('j1-e04'));
  for (let i = 0; i < 10 && engine.active; i++) { engine.update(1 / 30); await settle(); }
  assert.deepEqual(log.dialogues, ['e04-ilda-blick', 'e04-crewglas']);
  assert.ok(state.get('patches').includes('j1-e04'));
  assert.equal(state.get('units.j1-e04'), 'kurz', 'die volle Quest bleibt mit dem Code erhalten');
});

// Dialog statisch ablaufen: Knoten + Wahl-Index → Ziel und Wirkungen
const choice = (d, node, startsWith) => d.nodes[node].choices.find((c) => (c.say || c.label).startsWith(startsWith));
test('Falle und richtige Tat: Schlaf/Crew führen zurück zu Tun (kein Fortschritt), nur die Winde öffnet die Fotowand', () => {
  const s = choice(D_WINDE, 'b', 'Du brauchst'); const t = choice(D_WINDE, 'b', 'Tun gehört'); const wi = choice(D_WINDE, 'b', 'Tun hat die Winde');
  assert.equal(D_WINDE.nodes[s.goto].say, 'Danke. Trotzdem.');
  assert.equal(D_WINDE.nodes[s.goto].goto, 'b'); assert.equal(D_WINDE.nodes[t.goto].goto, 'b');
  const eff = D_WINDE.nodes[wi.goto].effects;
  assert.ok(eff.some((e) => e.flag === 'nest.offen.fotowand'));
  assert.ok(eff.some((e) => e.tank && e.tank.tank === 'anerkennung'));
  assert.ok(![s, t].some((c) => JSON.stringify(D_WINDE.nodes[c.goto]).includes('nest.offen')));
  // Blitz-Motor: der Plan kommt immer, jede Antwort ist okay
  assert.ok(D_MOTOR.nodes.b.effects.some((e) => e.flag === 'boot.plan.blitzmotor'));
  // Jolie: beide Angebote öffnen die Dachboden-Ecke
  assert.ok(D_JOLIE.nodes.d.choices.every((c) => c.effects.some((e) => e.flag === 'nest.offen.dachboden')));
  // Tun: Unter der Oberfläche hängt am Witz
  assert.equal(choice(D_TUN, 'd', 'Genau hinsehen').minigame, 'e04-oberflaeche-tun');
  assert.equal(choice(D_JOLIE, 'b', 'Dableiben').minigame, 'e04-leine-jolie');
});

test('Crew-Glas: Muscheln ohne Namen – die eigene Wahl hat keine Wirkung; nur die Abstimmung wird als Wahl gespeichert', () => {
  const shells = [...D_CREW.nodes.b.choices, ...D_CREW.nodes.b2.choices].filter((c) => c.muschel || /Keine/.test(c.label || ''));
  assert.equal(shells.filter((c) => c.muschel).length, 6, 'alle sechs Bedürfnisse wählbar');
  for (const c of shells) assert.equal(c.effects, undefined, 'Muschel schreibt nichts: ' + (c.label || c.say));
  assert.ok(D_CREW.nodes.e2.choices.every((c) => c.effects.length === 1 && c.effects[0].flag === 'nest.naechsterRaum'));
});

test('Der Lehrsatz fällt nie im Spiel (nur Rückseite); Texte kurz; kein Freitext', () => {
  const all = JSON.stringify(DIALOGE) + JSON.stringify(GLIMM.quelle) + JSON.stringify(QUEST.steps);
  assert.ok(!/wichtig und leer|größte Lücke|groesste Luecke/i.test(all), 'Lehrsatz im Spiel gefunden');
  for (const d of DIALOGE) for (const [id, n] of Object.entries(d.nodes)) {
    if (n.say) assert.ok(words(n.say) <= 12, `${d.id}.${id}: ${n.say}`);
    if (n.speaker === 'glimm') assert.ok(words(n.say) <= 6, `Glimm ${d.id}.${id}`);
    for (const c of n.choices || []) assert.ok(!('input' in c) && !('freitext' in c));
  }
  for (const l of Object.values(GLIMM.quelle).flat()) assert.ok(words(l) <= 6, l);
});

test('Lehrerheft: QUELLE mit Rückseite, Echte-Welt-Karte, 2 Debrief-Fragen, Wortliste mit Bild und dem Hinweissatz', async () => {
  const r = await buildLehrerheft({ root: ROOT });
  const i = r.html.indexOf('data-unit="j1-e04"');
  assert.ok(i > 0);
  const card = r.html.slice(i, r.html.indexOf('</article>', i));
  assert.ok(card.includes('Leck im Nest') && card.includes('QUELLE'));
  assert.ok(card.includes('Wichtig und leer = größte Lücke.'));
  assert.ok(card.includes('Welches Glas füllen bei dir Leute, nicht Dinge?'));
  assert.ok(card.includes('Warum hat die Hängematte Tun nicht geholfen?') && card.includes('Was wollte Tun, und was hat er gebraucht?'));
  assert.ok(card.includes('Spielbegriffe') && (card.match(/<td class="pic"><svg/g) || []).length >= 8, 'Wortliste mit Bildern');
  assert.ok(card.includes('Eine eingelöste Quest heißt nicht, dass das Thema behandelt ist.'));
  assert.ok(card.includes('Blick: Gläser'));
});

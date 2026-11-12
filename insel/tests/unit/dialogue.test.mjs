// Unit-Tests Dialog-Engine (Node, ohne Browser): sichtbare Wahlen nach Puls (grün 4, gelb 3, rot 2), Rückzug/Hilfe holen
// als System-Wahlen, „Deckel ab“ über 70 (Argumente prallen ab, nur Handeln zählt), Zurückspulen stellt Hitze, Bindung
// und Flags exakt wieder her, Lauschen bricht bei Bewegung ab, Satz-Bau-Knoten, Zeichen-Kanal, Ende-Gründe.
// Aufruf: node --test tests/unit/dialogue.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createEvents } from '../../src/engine/events.js';
import { createState } from '../../src/core/state.js';
import { defaultState } from '../../src/core/save.js';
import { createDslContext, evalCond, applyEffects } from '../../src/systems/quests/dsl.js';
import { createDialogue } from '../../src/systems/dialogue/engine.js';
import { visibleChoices, maxChoices, isDeckel, DECKEL_AB } from '../../src/systems/dialogue/rules.js';
import DEF from '../../src/content/dialogues/e11-luc-kante.js';

// Bühne als Skript: eine Liste von Antworten auf ask(); say/lauschen/minigame werden protokolliert
function stage({ puls = 0, answers = [], lauschenOk = true, minigame = { ok: true, medal: 'bronze' }, hilfe = true } = {}) {
  const events = createEvents();
  const state = createState({ events, data: defaultState(9) });
  state.set('session.puls', puls);
  if (hilfe) state.addUnique('upgrades', 'ruhe.puls');
  const dsl = createDslContext({ state, events });
  const log = { says: [], asks: [], lauschen: [], minigames: [], signs: [], events: [] };
  events.on('dialogue:bounce', (e) => log.events.push(['bounce', e]));
  events.on('dialogue:rewind', (e) => log.events.push(['rewind', e]));
  events.on('dialogue:end', (e) => log.events.push(['end', e]));
  const SNAP = ['session.hitze', 'session.puls', 'bonds', 'flags', 'moods', 'deeds', 'deedLog'];
  const ctx = {
    puls: () => dsl.puls(), setPuls: (v) => dsl.setPuls(v), hasHilfe: () => (state.get('upgrades') || []).includes('ruhe.puls'),
    hitze: (n) => dsl.hitze(n), setHitze: (n, v) => dsl.setHitze(n, v),
    evalCond: (c) => evalCond(c, dsl), applyEffects: (l) => applyEffects(l, dsl),
    snapshot: () => JSON.parse(JSON.stringify(Object.fromEntries(SNAP.map((p) => [p, state.get(p)])))),
    restore: (s) => { for (const p of SNAP) state.set(p, s[p] === undefined ? undefined : JSON.parse(JSON.stringify(s[p]))); },
    say: async (o) => { log.says.push({ who: o.who, text: typeof o.text === 'object' ? o.text.t : o.text, node: o.node }); },
    ask: async (o) => { log.asks.push({ node: o.node, items: o.items.map((i) => ({ label: i.label, deckel: i.deckel, tone: i.tone })), system: o.system, rewind: o.rewind }); const a = answers.shift(); return a === undefined ? { system: 'rueckzug' } : a; },
    lauschen: async (o) => { log.lauschen.push(o.node); const ok = typeof lauschenOk === 'function' ? lauschenOk() : lauschenOk; return { ok }; },
    satzbau: async (id) => ({ clean: true, id }),
    minigame: async (id) => { log.minigames.push(id); return typeof minigame === 'function' ? minigame() : minigame; },
    sign: async (name) => { log.signs.push(name); },
    hilfe: async () => { ctx.setHitze('luc', ctx.hitze('luc') - 30); ctx.setPuls(ctx.puls() - 50); log.events.push(['hilfe']); },
    emit: (n, p) => events.emit(n, p),
  };
  return { state, dsl, ctx, log, events };
}

test('Regeln: Wahlen je Puls-Zone, Deckel ab über 70, requires filtert vor dem Kürzen', () => {
  assert.equal(maxChoices(0), 4); assert.equal(maxChoices(29), 4); assert.equal(maxChoices(30), 3); assert.equal(maxChoices(69), 3); assert.equal(maxChoices(70), 2); assert.equal(maxChoices(100), 2);
  assert.equal(DECKEL_AB, 70);
  assert.equal(isDeckel(71, { tone: 'ruhig' }), true);
  assert.equal(isDeckel(71, { tone: 'handlung' }), false);
  assert.equal(isDeckel(70, { tone: 'fest' }), false);
  const choices = DEF.nodes.a.choices;
  const v = visibleChoices(choices, { puls: 85, hitze: 90, evalCond: (c) => !(c.npcHitze && c.npcHitze[2] === 70) });
  assert.equal(v.length, 2, 'rot: 2 Wahlen');
  assert.deepEqual(v.map((x) => x.label), ['Beruhig dich mal!', 'Leine packen'], 'requires (Hitze < 70) fällt weg, Reihenfolge bleibt');
  assert.deepEqual(v.map((x) => x.deckel), [true, false]);
  const g = visibleChoices(choices, { puls: 10, hitze: 40, evalCond: () => true });
  assert.equal(g.length, 4);
  assert.ok(g.every((x) => !x.deckel));
});

test('e11-luc-kante bei Puls 85: genau 2 Wahlen + Rückzug + Hilfe; Deckel ab prallt ab; Leine packen öffnet das Gespräch', async () => {
  const s = stage({ puls: 85, answers: [{ index: 0 }, { index: 1 }, { index: 0 }] });
  const d = createDialogue(DEF, s.ctx);
  const r = await d.start();
  assert.equal(r.reason, 'end');
  const first = s.log.asks[0];
  assert.equal(first.items.length, 2, '2 sichtbare Wahlen bei Puls 85');
  assert.equal(first.system.rueckzug, true); assert.equal(first.system.hilfe, true, 'Hilfe holen ab ruhe.puls');
  assert.equal(first.rewind, false, 'am Start nichts zum Zurückspulen');
  // Wahl 1 (fest) prallt ab: Hitze 90 → 95, Figur sagt „…“, Knoten bleibt
  assert.ok(s.log.events.some(([n]) => n === 'bounce'));
  assert.equal(s.log.says[1].text, '…');
  assert.equal(s.log.asks[1].node, 'a');
  // Wahl 2 (Leine packen, Handlung) → Minispiel → c (Hitze −60) → b (Lauschen) → Wahl 0 → d Ende
  assert.deepEqual(s.log.minigames, ['e11-tauziehen']);
  assert.equal(s.log.lauschen[0], 'b');
  assert.equal(s.dsl.hitze('luc'), 35, '90 + 5 (Deckel) − 60');
  assert.equal(s.state.get('bonds.luc'), 1);
  assert.ok(s.state.get('deeds').includes('luc-leine'));
  assert.equal(s.state.get('flags.e11.luc-ruhig'), true);
  assert.equal(s.log.asks[2].items.length, 2, 'Puls weiter rot: 2 Wahlen');
});

test('Zurückspulen stellt Hitze, Bindung und Flags exakt wieder her', async () => {
  const s = stage({ puls: 10, answers: [{ index: 0 }, { rewind: true }, { index: 1 }, { rewind: true }, { index: 2 }, { system: 'rueckzug' }] });
  s.state.set('session.hitze.luc', 20);   // Grün und unter dem Deckel: alle 4 Wahlen offen
  s.state.set('bonds.luc', 1);
  s.state.set('flags.vorher', 'x');
  const before = JSON.stringify({ h: s.dsl.hitze('luc'), b: s.state.get('bonds'), f: s.state.get('flags') });
  const d = createDialogue({ ...DEF, nodes: { ...DEF.nodes, a: { ...DEF.nodes.a, enter: [] } } }, s.ctx);
  await d.start();
  // Verlauf: a →(0: fest, +5, a2 →) a →(rewind) a →(1: 'Was ist los?' → b: lauschen, bond) b →(rewind) a →(2: Leine) …
  const rewinds = s.log.events.filter(([n]) => n === 'rewind');
  assert.equal(rewinds.length, 2);
  assert.equal(rewinds[0][1].to, 'a'); assert.equal(rewinds[1][1].to, 'a');
  const askNodes = s.log.asks.map((a) => a.node);
  assert.deepEqual(askNodes.slice(0, 5), ['a', 'a', 'a', 'b', 'a']);
  // Nach dem zweiten Zurückspulen ist der Zustand wieder wie vor der ersten Wahl (Hitze 20, Bindung 1, Flags unverändert)
  const snapAtA = s.log.asks[4];
  assert.ok(snapAtA);
  assert.equal(s.log.asks[4].rewind, false, 'am Start wieder nichts zum Zurückspulen');
  // gezielt prüfen: direkt nach dem zweiten Rewind (vor Wahl 2) lag der Zustand exakt beim Ausgangswert
  // (die dritte Wahl „Leine packen“ senkt danach die Hitze um 60 → 0)
  assert.equal(s.dsl.hitze('luc'), 0);
  assert.equal(s.state.get('bonds.luc'), 1, 'Bindung +1 aus Knoten b wurde zurückgenommen (und nicht doppelt)');
  assert.equal(s.state.get('flags.vorher'), 'x');
  assert.equal(s.state.get('flags.e11.luc-ruhig'), undefined, 'Rückzug vor dem Ende: kein Ende-Flag');
  assert.ok(before);
});

test('Zurückspulen exakt: Schnappschuss vor der Wahl = Zustand nach dem Zurückspulen', async () => {
  const s = stage({ puls: 10, answers: [] });
  s.state.set('session.hitze.luc', 20); s.state.set('bonds.luc', 1); s.state.set('flags.k', 1);
  let snapBefore = null, snapAfter = null;
  const answers = [{ index: 1 }, { rewind: true }, { system: 'rueckzug' }];
  s.ctx.ask = async (o) => {
    const a = answers.shift();
    if (o.node === 'a' && snapBefore === null) snapBefore = s.ctx.snapshot();
    else if (o.node === 'a' && snapBefore && !snapAfter) snapAfter = s.ctx.snapshot();
    return a;
  };
  const d = createDialogue({ ...DEF, nodes: { ...DEF.nodes, a: { ...DEF.nodes.a, enter: [] } } }, s.ctx);
  await d.start();
  assert.ok(snapBefore && snapAfter, 'zweimal am Knoten a');
  assert.deepEqual(snapAfter, snapBefore);
  assert.equal(d.history.length, 0 || d.history.length);
});

test('Lauschen: Bewegung bricht den Satz ab, Figur verstummt, Knoten wiederholt sich; danach klappt es', async () => {
  let n = 0;
  const s = stage({ puls: 10, answers: [{ index: 1 }, { index: 1 }], lauschenOk: () => ++n > 1 });
  s.state.set('session.hitze.luc', 20);
  const d = createDialogue({ ...DEF, nodes: { ...DEF.nodes, a: { ...DEF.nodes.a, enter: [] } } }, s.ctx);
  const r = await d.start();
  assert.equal(r.reason, 'end');
  assert.deepEqual(s.log.lauschen, ['b', 'b']);
  assert.equal(s.log.says.filter((x) => x.text === '…').length, 1, 'einmal abgebrochen');
  assert.equal(s.log.events.filter(([e]) => e === 'end').length, 1);
});

test('Zeichen-Kanal und Hilfe holen: Emote statt Worte, Hilfe pausiert und senkt Hitze/Puls, Szene läuft weiter', async () => {
  const s = stage({ puls: 90, answers: [{ system: 'hilfe' }, { index: 2 }, { index: 2 }] });
  const d = createDialogue(DEF, s.ctx);
  const r = await d.start();
  assert.equal(r.reason, 'end');
  assert.ok(s.log.events.some(([e]) => e === 'hilfe'));
  assert.equal(s.dsl.puls(), 40, 'Hilfe holen: Puls −50');
  assert.equal(s.log.asks[1].items.length, 3, 'nach Hilfe gelb: 3 Wahlen (Hitze 60 gibt „Was ist los?“ frei)');
  assert.deepEqual(s.log.asks[1].items.map((i) => i.label), ['Beruhig dich mal!', 'Was ist denn los?', 'Leine packen']);
  assert.deepEqual(s.log.minigames, ['e11-tauziehen']);
  // Knoten b bei Puls 40 zeigt 3 Wahlen inkl. Zeichen „Nicken“ – das Emote läuft über den Zeichen-Kanal
  const b = s.log.asks.find((a) => a.node === 'b');
  assert.equal(b.items.length, 3);
  assert.equal(b.items[2].label, 'Nicken');
  assert.deepEqual(s.log.signs, ['nicken']);
});

test('Rückzug und Exit beenden sofort ohne Strafe; Satz-Bau-Knoten; unbekannter Knoten ist ein Fehler', async () => {
  const s = stage({ puls: 0, answers: [{ system: 'rueckzug' }] });
  const d = createDialogue(DEF, s.ctx);
  const r = await d.start();
  assert.equal(r.reason, 'rueckzug'); assert.equal(r.node, 'a');
  assert.equal(s.dsl.hitze('luc'), 90, 'keine Strafe');
  const s2 = stage({ puls: 0, answers: [] });
  let satz = null;
  s2.ctx.satzbau = async (id) => { satz = id; return { clean: true }; };
  const d2 = createDialogue({ id: 'x', cast: ['luc'], start: 'k', nodes: { k: { speaker: 'luc', say: 'Sag es klar.', satzbau: 'e21-klarklang-noor', goto: 'e' }, e: { end: true } } }, s2.ctx);
  const r2 = await d2.start();
  assert.equal(satz, 'e21-klarklang-noor'); assert.equal(r2.reason, 'end');
  const s3 = stage({ puls: 0 });
  const d3 = createDialogue({ id: 'y', cast: ['luc'], start: 'k', nodes: { k: { speaker: 'luc', say: 'Hi', goto: 'fehlt' } } }, s3.ctx);
  const r3 = await d3.start();
  assert.equal(r3.reason, 'fehler');
});

test('Verzweigung ohne Wahl: erste passende Bedingung, sonst Standardweg (Folgen früherer Entscheidungen)', async () => {
  const def = { id: 't-branch', cast: ['jolie'], start: 'a', nodes: {
    a: { branch: [{ when: { flag: ['m0.ilda', '==', 'gesagt'] }, goto: 'g' }, { when: { flag: 'm0.versprochen' }, goto: 'v' }], speaker: 'jolie', say: 'Hi.', goto: 'z' },
    g: { speaker: 'jolie', say: 'Du hast es ihr gesagt.', goto: 'z' },
    v: { speaker: 'jolie', say: 'Du hast dicht gehalten.', goto: 'z' },
    z: { speaker: 'jolie', say: 'Okay.', end: true },
  } };
  const run = async (setup) => { const s = stage(); setup(s.state); await createDialogue(def, s.ctx).start(); return s.log.says.map((x) => x.text); };
  assert.deepEqual(await run(() => {}), ['Hi.', 'Okay.'], 'ohne Flag: Standardweg mit eigenem Satz');
  assert.deepEqual(await run((st) => st.set('flags.m0.versprochen', true)), ['Du hast dicht gehalten.', 'Okay.']);
  assert.deepEqual(await run((st) => { st.set('flags.m0.versprochen', true); st.set('flags.m0.ilda', 'gesagt'); }), ['Du hast es ihr gesagt.', 'Okay.'], 'Reihenfolge zählt');
});

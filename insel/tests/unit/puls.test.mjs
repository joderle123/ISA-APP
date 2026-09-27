// Unit-Tests Puls, Koffer und Sicherer Ort (WP33, Node ohne Browser): Zonen, Modus-Faktoren, Anti-Spirale (Fehlschläge
// nie über 55, 2 in Folge → Windschatten), Deckel, Senken, Steuer-Modifikatoren (Entspannt ändert nichts), Gadget-Faktor
// je Spielstand, Kopf-Gadget verpufft bei Rot, Tester, Ampelplan, Gadget-Inhalte, Glimm-Zeilen ≤ 6 Wörter, Raum des Sicheren Orts.
// Aufruf: node --test tests/unit/puls.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { zoneOf, applyRise, applyFail, createPulsCounter, decayRate, modifiersFor, vignetteFor, heartbeatBpm, FAIL_MAX, MODE_PARAMS } from '../../src/systems/puls/model.js';
import { factorFor, effectFor, canUse, reichweiteFor, testerEntry, ampelSet, pickForZone, planFor, FAECHER } from '../../src/systems/koffer/model.js';
import { roomDefFor, normalizeConfig, OPTIONS, DEFAULT_CONFIG } from '../../src/scenes/sicherer-ort.js';
import { countWords } from '../../src/content/schema/text.js';
import { loadContent } from '../../tools/content-load.mjs';

test('Zonen: grün 0–30, gelb 30–70, rot 70–100', () => {
  assert.equal(zoneOf(0), 'gruen'); assert.equal(zoneOf(29), 'gruen'); assert.equal(zoneOf(30), 'gelb'); assert.equal(zoneOf(69), 'gelb'); assert.equal(zoneOf(70), 'rot'); assert.equal(zoneOf(100), 'rot');
});

test('Anstieg × Modus (0,6 / 1 / 1,3) × Inselwetter; Senken wirken voll; 0–100', () => {
  assert.equal(applyRise(50, 10, { mode: 'entspannt' }), 56);
  assert.equal(applyRise(50, 10, { mode: 'abenteuer' }), 60);
  assert.equal(applyRise(50, 10, { mode: 'profi' }), 63);
  assert.equal(applyRise(50, 10, { mode: 'profi', factor: 0.5 }), 56.5);
  assert.equal(applyRise(50, -30, { mode: 'entspannt' }), 20);
  assert.equal(applyRise(95, 20, {}), 100);
  assert.equal(applyRise(5, -20, {}), 0);
});

test('Deckel (Bosse): ein Anstieg geht nie über den Deckel, ein Deckel senkt aber nicht', () => {
  assert.equal(applyRise(70, 20, { cap: 80 }), 80);
  assert.equal(applyRise(85, 20, { cap: 80 }), 85);
  assert.equal(applyRise(85, -10, { cap: 80 }), 75);
});

test('Anti-Spirale: 10 Fehlschläge hintereinander heben den Puls nie über 55; jeder zweite löst den Windschatten aus', () => {
  let p = 20;
  const c = createPulsCounter();
  const spirals = [];
  for (let i = 0; i < 10; i++) { p = applyFail(p, { mode: 'profi' }); const r = c.fail(); if (r.antiSpiral) spirals.push(i + 1); assert.ok(p <= FAIL_MAX, `Fehlschlag ${i + 1}: ${p}`); }
  assert.equal(p, FAIL_MAX);
  assert.deepEqual(spirals, [2, 4, 6, 8, 10]);
  assert.equal(applyFail(90, {}), 90, 'über 55 ändert ein Fehlschlag nichts');
  c.success(); assert.equal(c.consecutive, 0);
});

test('Steuerung: Entspannt ändert keine Parameter; Abenteuer/Profi greifen bei Gelb und Rot (Greifen −15/−25 %, −30/−40 %)', () => {
  for (const z of ['gruen', 'gelb', 'rot']) assert.deepEqual(modifiersFor('entspannt', z), { grabTolerance: 1, glideStability: 1 });
  assert.deepEqual(modifiersFor('abenteuer', 'gruen'), { grabTolerance: 1, glideStability: 1 });
  assert.equal(modifiersFor('abenteuer', 'gelb').grabTolerance, 0.85);
  assert.equal(modifiersFor('abenteuer', 'rot').grabTolerance, 0.7);
  assert.equal(modifiersFor('profi', 'gelb').grabTolerance, 0.75);
  assert.equal(modifiersFor('profi', 'rot').grabTolerance, 0.6);
  assert.equal(modifiersFor('profi', 'rot').glideStability, 0.85);
  assert.equal(MODE_PARAMS.entspannt.rise, 0.6); assert.equal(MODE_PARAMS.profi.rise, 1.3);
});

test('Vignette gedeckelt (≤ 0,5), bei Grün und mit „reduzierte Effekte“ 0; Herzschlag 64–106', () => {
  for (const m of ['entspannt', 'abenteuer', 'profi']) for (const z of ['gelb', 'rot']) { assert.ok(vignetteFor(m, z) > 0 && vignetteFor(m, z) <= 0.5, m + z); assert.equal(vignetteFor(m, z, true), 0); }
  assert.equal(vignetteFor('profi', 'gruen'), 0);
  assert.ok(vignetteFor('entspannt', 'gelb') < vignetteFor('profi', 'gelb'));
  assert.equal(heartbeatBpm(70), 64); assert.equal(heartbeatBpm(100), 106);
});

test('Senken je Sekunde: Abklingen, Windschatten, Co-Regulation (höchstens 2 Figuren), keine bei 0 oder unter aktiver Quelle', () => {
  assert.equal(decayRate(0, {}), 0);
  assert.equal(decayRate(50, {}), 0.9);
  assert.equal(decayRate(50, { shelter: true }), 5.9);
  assert.equal(decayRate(50, { calmNpcs: 3 }), 0.9 + 3);
  assert.equal(decayRate(50, { sources: 3 }), 0);
  assert.equal(decayRate(50, { sources: 3, shelter: true }), 5);
});

test('Koffer: Faktor je Spielstand deterministisch in 0,7–1,3, je Figur npcFit; Reichweite 10–100', () => {
  const def = { id: 'sprintventil', effect: { puls: -20 }, perSave: [0.7, 1.3], npcFit: { luc: 1.3 }, reichweite: 90 };
  const f1 = factorFor(1, 'sprintventil'), f2 = factorFor(2, 'sprintventil');
  assert.equal(f1, factorFor(1, 'sprintventil'));
  assert.ok(f1 >= 0.7 && f1 <= 1.3 && f2 >= 0.7 && f2 <= 1.3);
  const e = effectFor(def, { seed: 1 }), eL = effectFor(def, { seed: 1, npc: 'luc' });
  assert.ok(e.puls < 0 && eL.puls <= e.puls, 'Luc braucht Sprints: Wirkung größer');
  assert.ok(e.reichweite >= 10 && e.reichweite <= 100);
  assert.equal(reichweiteFor({ reichweite: 60 }, 1), 60);
});

test('Kopf-Gadgets verpuffen bei Rot, sonst erlaubt; Tester-Eintrag; Ampelplan mit Hinweis statt Verbot', () => {
  const kopf = { id: 'zaehllaterne', fach: 'kopf', zones: { gruen: 1, gelb: 1, rot: 0 } };
  const koerper = { id: 'quetschkoralle', fach: 'koerper', zones: { gruen: 1, gelb: 1, rot: 1 } };
  assert.equal(canUse(kopf, 'rot'), 'verpufft'); assert.equal(canUse(kopf, 'gelb'), 'ok'); assert.equal(canUse(koerper, 'rot'), 'ok');
  assert.deepEqual(testerEntry({ before: 62, after: 42, reichweite: 80 }), { before: 62, after: 42, delta: -20, reichweite: 80, wirkt: true });
  const defs = { zaehllaterne: kopf, quetschkoralle: koerper };
  const r = ampelSet({ gruen: null, gelb: null, rot: null, notfall: null }, 'rot', 'zaehllaterne', defs);
  assert.equal(r.plan.rot, 'zaehllaterne'); assert.equal(r.warn, 'kopf-bei-rot');
  assert.equal(ampelSet(r.plan, 'gelb', 'quetschkoralle', defs).warn, null);
  assert.equal(ampelSet(r.plan, 'lila', 'x', defs).warn, 'zone');
  assert.equal(pickForZone({ rot: 'quetschkoralle' }, 'rot', defs).id, 'quetschkoralle');
  assert.equal(pickForZone({ rot: null }, 'rot', defs), null);
  assert.deepEqual(planFor({ ampel: { gruen: 'a' } }), { gruen: 'a', gelb: null, rot: null, notfall: null });
  assert.equal(FAECHER.length, 5);
});

test('Inhalte: 11 Gadgets in 5 Fächern, Kopf-Gadgets rot: 0, Hilfe holen immer; Glimm-Zeilen ≤ 6 Wörter ohne Übungswörter', async () => {
  const entries = await loadContent();
  const gadgets = entries.filter((e) => e.kind === 'gadgets').map((e) => e.def);
  assert.equal(gadgets.length, 11);
  assert.deepEqual([...new Set(gadgets.map((g) => g.fach))].sort(), [...FAECHER].sort());
  for (const g of gadgets.filter((g) => g.fach === 'kopf')) assert.equal(g.zones.rot, 0, g.id);
  const hilfe = gadgets.find((g) => g.id === 'hilfeholen');
  assert.deepEqual(hilfe.zones, { gruen: 1, gelb: 1, rot: 1 }); assert.equal(hilfe.effect.puls, -50);
  const glimm = entries.find((e) => e.kind === 'glimm').def;
  const walk = (v) => { if (typeof v === 'string') { assert.ok(countWords(v) <= 6, v); assert.ok(!/atme|bodyscan|5-4-3-2-1/i.test(v), v); } else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') Object.values(v).forEach(walk); };
  walk(glimm);
  assert.ok(glimm.zone.rot.length >= 2 && glimm.gadget.verpufft.length >= 2 && glimm.hilfe.length >= 2);
});

test('Sicherer Ort: RoomDef aus der Auswahl (Biom → Kit, Licht „passend“, Tier als Vogel), unbekannte Werte fallen zurück', () => {
  assert.deepEqual(normalizeConfig({ biom: 'quatsch', tier: 'vogel-sonne' }), { ...DEFAULT_CONFIG, tier: 'vogel-sonne' });
  const d = roomDefFor({ biom: 'tempel', licht: 'auto', tier: 'vogel-blau', wetter: 'regen' });
  assert.equal(d.id, 'sicherer-ort'); assert.equal(d.kit, 'tempel'); assert.equal(d.light, 'kerzen');
  assert.ok(d.features.some((f) => f.type === 'vogel' && f.emotion === 'trauer'));
  assert.ok(d.exits.length === 1 && d.spawns.eingang);
  const d2 = roomDefFor({ biom: 'hoehle', licht: 'daemmerung', tier: 'keins' });
  assert.equal(d2.light, 'daemmerung'); assert.ok(!d2.features.some((f) => f.type === 'vogel'));
  for (const k of Object.keys(OPTIONS)) for (const o of OPTIONS[k]) assert.ok(countWords(o.label) <= 5, o.label);
});

// Unit-Tests Figuren-System (WP34, Node ohne Browser): Gefühlsmodell, Tank-Dynamik (Wunsch fällt am Morgen zurück,
// Bedürfnis hält 7 Tage), Bindung sinkt nie dauerhaft (verstimmt + Reparatur), Grenz-Radius, Streit-Stil je Gegenüber,
// Körpersprache aus dem Gefühl, Blick-Stufen, Tagesablauf, Sichtbudget (12 animiert), Umbenennung, Inhalte der 16 Figuren.
// Aufruf: node --test tests/unit/npc.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createEmotion, createTanks, createBonds, bondStep, boundaryRadius, streitStilFor, tellFor, bodyFor, auraView, scheduleAt, pickAnimated, displayName, WISH_BOOST, NEED_DAYS, MAX_ANIMATED, TANKS } from '../../src/systems/npc/model.js';
import { createState } from '../../src/core/state.js';
import { createEvents } from '../../src/engine/events.js';
import { defaultState } from '../../src/core/save.js';
import { loadContent } from '../../tools/content-load.mjs';
import { countWords } from '../../src/content/schema/text.js';

test('Gefühlsmodell: Hauptgefühl, Zweitgefühl, Innen, Hitze mit Deckel ab, Rückdrift', () => {
  const e = createEmotion({ primary: ['trauer', 4], secondary: ['angst', 2], inner: ['wut', 6] });
  let s = e.get();
  assert.deepEqual(s.primary, ['trauer', 4]); assert.deepEqual(s.secondary, ['angst', 2]); assert.deepEqual(s.inner, ['wut', 6]);
  assert.equal(s.capOff, false); assert.equal(s.zone, 'gruen');
  e.nudge('freude', 7);
  s = e.get();
  assert.equal(s.primary[0], 'freude', 'stärkeres Gefühl wird Hauptgefühl');
  assert.equal(s.secondary[0], 'trauer');
  e.setHeat(90);
  s = e.get();
  assert.equal(s.capOff, true); assert.equal(s.zone, 'rot');
  e.heat(-30);
  assert.equal(e.get().heat, 60);
  for (let i = 0; i < 400; i++) e.tick(0.5);   // 200 s Spielzeit
  s = e.get();
  assert.equal(s.primary[0], 'trauer', 'driftet zum Grundgefühl zurück');
  assert.equal(s.heat, 0, 'Hitze klingt ab');
  const j = JSON.parse(JSON.stringify(e.toJSON()));
  const e2 = createEmotion({ primary: ['freude', 1] }).fromJSON(j);
  assert.deepEqual(e2.get().primary, e.get().primary);
});

test('Tanks: Wunsch +40 fällt am Morgen zurück, Bedürfnis hält 7 Tage', () => {
  const t = createTanks({ anerkennung: 15, koerper: 70 }, { day: 1 });
  assert.equal(t.value('anerkennung'), 15);
  assert.equal(t.lowest(), 'anerkennung');
  t.add('anerkennung', 60, { kind: 'wish', day: 1 });
  assert.equal(t.value('anerkennung'), 15 + WISH_BOOST, 'Wunsch ist auf +40 begrenzt');
  t.morning(2);
  assert.equal(t.value('anerkennung'), 15, 'Wunsch ist am Morgen weg');
  t.add('anerkennung', 60, { kind: 'need', day: 2 });
  assert.equal(t.value('anerkennung'), 75);
  for (let d = 3; d < 2 + NEED_DAYS; d++) { t.morning(d); assert.equal(t.value('anerkennung'), 75, 'Bedürfnis hält Tag ' + d); }
  t.morning(2 + NEED_DAYS);
  assert.equal(t.value('anerkennung'), 15, 'Bedürfnis endet nach 7 Tagen');
  assert.deepEqual(Object.keys(t.values()), TANKS);
  assert.ok(t.empties(25).includes('anerkennung'));
  const t2 = createTanks({ anerkennung: 15 }, { day: 1 }).fromJSON(JSON.parse(JSON.stringify(createTanks({ anerkennung: 15 }, { day: 1 }).toJSON())));
  assert.equal(t2.value('anerkennung'), 15);
});

test('Bindung 0–3 sinkt nie dauerhaft: negativer Zug = verstimmt mit Ursache und Reparatur', () => {
  assert.deepEqual(bondStep(2, 1), { level: 3, verstimmt: null });
  assert.deepEqual(bondStep(3, 1), { level: 3, verstimmt: null });
  const r = bondStep(2, -1, { cause: 'Rennen verpasst', repair: 'rep-tiago-surfspot' });
  assert.equal(r.level, 2, 'Stufe bleibt');
  assert.equal(r.verstimmt.cause, 'Rennen verpasst'); assert.equal(r.verstimmt.repair, 'rep-tiago-surfspot');
  const events = createEvents();
  const state = createState({ events, data: defaultState(3) });
  const seen = [];
  events.on('bond:change', (e) => seen.push('change:' + e.level));
  events.on('npc:verstimmt', (e) => seen.push('verstimmt:' + e.cause));
  events.on('npc:repaired', (e) => seen.push('repaired:' + e.how));
  const bonds = createBonds(state, { day: () => 4, emit: (n, p) => events.emit(n, p) });
  bonds.add('tiago', 1); bonds.add('tiago', 1);
  assert.equal(bonds.get('tiago'), 2);
  bonds.add('tiago', -2, { cause: 'nicht beim Rennen', repair: 'rep-tiago' });
  assert.equal(bonds.get('tiago'), 2, 'nie dauerhaft gesunken');
  assert.equal(bonds.isVerstimmt('tiago'), true);
  assert.equal(state.get('moods.tiago').repair, 'rep-tiago');
  assert.equal(bonds.repair('tiago'), true);
  assert.equal(bonds.isVerstimmt('tiago'), false);
  bonds.add('tiago', -1, { cause: 'x' });
  bonds.add('tiago', 1);   // gute Tat hebt die Verstimmung auf
  assert.equal(bonds.isVerstimmt('tiago'), false);
  assert.equal(bonds.get('tiago'), 3);
  assert.deepEqual(seen, ['change:1', 'change:2', 'verstimmt:nicht beim Rennen', 'repaired:quest', 'verstimmt:x', 'change:3', 'repaired:tat']);
});

test('Grenz-Radius nach Bindung und Stimmung, Streit-Stil je Gegenüber, Tells je Modus', () => {
  const b = { byBond: [2.4, 1.8, 1.2, 0.9], mood: { angst: 1.3 } };
  assert.equal(boundaryRadius(b, 0, { primary: ['freude', 3], heat: 0 }), 2.4);
  assert.equal(boundaryRadius(b, 2, { primary: ['freude', 3], heat: 0 }), 1.2);
  assert.equal(boundaryRadius(b, 0, { primary: ['angst', 10], heat: 0 }), 3.12, 'Angst vergrößert den Radius');
  assert.ok(boundaryRadius(b, 0, { primary: ['freude', 3], heat: 90 }) > 2.4, 'Deckel ab vergrößert den Radius');
  assert.equal(boundaryRadius(null, 3, null), 1.0, 'Standard ohne Angabe');
  const tiago = { streitStil: { default: 'hai', vs: { noor: 'hai', mika: 'teddy' } } };
  assert.equal(streitStilFor(tiago, 'noor'), 'hai'); assert.equal(streitStilFor(tiago, 'mika'), 'teddy'); assert.equal(streitStilFor(tiago, 'jolie'), 'hai'); assert.equal(streitStilFor({}, null), 'schildkroete');
  const tell = { tell: { bluff: 'grinst', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } } };
  assert.equal(tellFor(tell, 'profi').amp, 0.3); assert.equal(tellFor(tell, 'entspannt').amp, 1); assert.equal(tellFor({}, 'abenteuer').bluff, 'blick-weg');
});

test('Körpersprache aus dem Gefühlsmodell und Blick-Stufen', () => {
  const w = bodyFor({ primary: ['wut', 8], secondary: ['angst', 4], heat: 80 });
  assert.ok(w.fistClench > 0.9 && w.jawTension > 0.9, 'Wut + Deckel ab: Fäuste und Kiefer');
  assert.ok(w.shoulderUp > 0.15, 'Zweitgefühl Angst mit halbem Gewicht');
  const v = bodyFor({ primary: ['freude', 3], heat: 0 }, { verstimmt: true });
  assert.ok(v.armCross > 0.5 && v.gazeAway > 0.3, 'verstimmt: verschränkte Arme, Blick weg');
  assert.equal(auraView({}).aura, false, 'ohne Blick keine Aura');
  assert.equal(auraView({ abilities: ['blick'] }).aura, true);
  assert.equal(auraView({ abilities: ['blick'], mode: 'profi' }).aura, false, 'Profi: Farben aus');
  const full = auraView({ abilities: ['blick'], upgrades: ['blick.tanks', 'blick.doppel', 'blick.grenzen', 'blick.streittiere', 'blick.masken', 'blick.koerper'] });
  assert.ok(full.tanks && full.doppel && full.grenzen && full.streittiere && full.masken && full.koerper);
});

test('Tagesablauf (über Mitternacht) und Sichtbudget: höchstens 12 animierte Figuren', () => {
  const s = [{ from: 6, to: 11, site: 'steg' }, { from: 11, to: 17, site: 'bucht' }, { from: 22, to: 6, site: 'haus', hidden: true }];
  assert.equal(scheduleAt(s, 8).site, 'steg'); assert.equal(scheduleAt(s, 12.5).site, 'bucht'); assert.equal(scheduleAt(s, 23).site, 'haus'); assert.equal(scheduleAt(s, 2).site, 'haus');
  assert.equal(scheduleAt(s, 19).site, 'steg', 'Lücke → erster Eintrag');
  assert.equal(scheduleAt([], 9), null);
  const list = Array.from({ length: 20 }, (_, i) => ({ id: 'n' + i, dist: 5 + i * 4, inView: i % 5 !== 0 }));
  const r = pickAnimated(list, MAX_ANIMATED);
  assert.equal(r.animated.size, 12); assert.equal(r.lite.size + r.hidden.size, 8);
  assert.ok(r.animated.has('n1') && !r.animated.has('n19'));
  const far = pickAnimated([{ id: 'a', dist: 300 }, { id: 'b', dist: 10, hidden: true }, { id: 'c', dist: 200, priority: 1 }], 12);
  assert.ok(far.hidden.has('a') && far.hidden.has('b') && far.animated.has('c'), 'weit weg = ausgeblendet, beschäftigt = immer animiert');
});

test('Umbenennung: state.names gilt vor dem Inhalt, leer = Inhalt', () => {
  const def = { id: 'jolie', name: 'Jolie' };
  assert.equal(displayName(def, {}), 'Jolie');
  assert.equal(displayName(def, { jolie: 'Lina' }), 'Lina');
  assert.equal(displayName(def, { jolie: '   ' }), 'Jolie');
  assert.equal(displayName(def, { jolie: 'x'.repeat(40) }).length, 24);
});

test('Inhalte: 16 Figuren mit Icon, Farbe, Tagesablauf, Tanks, Bindung; Sätze ≤ 12 Wörter', async () => {
  const entries = (await loadContent()).filter((e) => e.kind === 'npcs' && !e.loadError);
  assert.ok(entries.length >= 16, `${entries.length} Figuren`);
  for (const e of entries) {
    const d = e.def;
    assert.ok(d.icon && /^#[0-9a-f]{6}$/i.test(d.color), d.id + ': Icon und Farbe');
    if (!d.noSpawn) { assert.ok(Array.isArray(d.schedule) && d.schedule.length >= 3, d.id + ': Tagesablauf'); assert.ok(d.look, d.id + ': Aussehen'); }
    assert.ok(d.tanks && d.emotion && d.emotion.base, d.id + ': Tanks und Gefühl');
    for (const [k, v] of Object.entries(d.lines || {})) {
      const texts = typeof v === 'string' ? [v] : Array.isArray(v) ? v : Object.values(v);
      for (const t of texts) assert.ok(countWords(typeof t === 'object' ? t.t : t) <= 12, `${d.id}.lines.${k}: „${t}“`);
    }
  }
  const ids = new Set(entries.map((e) => e.def.id));
  for (const id of ['ilda', 'jolie', 'tun', 'tiago', 'maelle', 'luc', 'jhemp', 'pit', 'noor', 'lucinda', 'mika', 'yara', 'kim', 'senait', 'fraenz', 'grisel']) assert.ok(ids.has(id), id);
});

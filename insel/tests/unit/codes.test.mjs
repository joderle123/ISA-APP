// Unit-Tests Codes (WP30, Node ohne Browser): Wortliste (256, ohne Umlaute, alle Code-Wörter enthalten), alle Codes
// eindeutig (Wort und Ersatzcode), Groß/Klein/Umlaute egal, Vorschläge nur aus der Wortliste, Freischalt-Plan
// (Kurzfassung für frühere Einheiten, Joker, j08 nur per eigenem Code, Lines & Veils), Lehrer-Einstellungen
// (Gerätespeicher, L&V-Umschaltung, Farben, Namen), Lehrerheft mit 39 Einheiten.
// Aufruf: node --test tests/unit/codes.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createEvents } from '../../src/engine/events.js';
import { createState } from '../../src/core/state.js';
import { createContent } from '../../src/core/content.js';
import { defaultState } from '../../src/core/save.js';
import UNITS from '../../src/content/units.js';
import WORDLIST from '../../src/content/wordlist.js';
import QUEST_E11 from '../../src/content/quests/j1-e11.js';
import NPC_LUC from '../../src/content/npcs/luc.js';
import { UNIT_IDS } from '../../src/content/schema/consts.js';
import * as M from '../../src/systems/codes/model.js';
import { createTeacherSettings, TEACHER_KEY, EMOTION_DEFAULTS } from '../../src/systems/codes/teacher.js';
import { EMOTION_COLORS as AURA_COLORS } from '../../src/actors/humanoid/aura.js';
import { buildLehrerheft } from '../../tools/postbuild/lehrerheft.mjs';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '../..');
const words = WORDLIST.words;

function world() {
  const events = createEvents();
  const state = createState({ events, data: defaultState(7) });
  const content = createContent({ entries: [
    { file: 'content/units.js', kind: 'units', name: 'units', def: UNITS },
    { file: 'content/wordlist.js', kind: 'wordlist', name: 'wordlist', def: WORDLIST },
    { file: 'content/quests/j1-e11.js', kind: 'quests', name: 'j1-e11', def: QUEST_E11 },
    { file: 'content/npcs/luc.js', kind: 'npcs', name: 'luc', def: NPC_LUC },
  ] });
  const store = (() => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); }, removeItem: (k) => { m.delete(k); }, map: m }; })();
  const log = [];
  events.on('*', () => {});
  const game = { events, state, content, save: { storage: store }, quests: null, npcs: null };
  return { events, state, content, store, game, log };
}
const opts = { words };

test('Wortliste: genau 256 Wörter, Großschrift ohne Umlaute, eindeutig, alle Code-Wörter enthalten', () => {
  assert.equal(words.length, 256);
  assert.equal(new Set(words).size, 256);
  for (const w of words) assert.match(w, /^[A-Z]{3,16}$/, w);
  for (const u of UNITS.units) assert.ok(words.includes(u.code), `Code-Wort ${u.code} fehlt in der Wortliste`);
});

test('Alle Codes eindeutig (Wort und Ersatzcode), 39 Einheiten + 10 Module + Demo + Lehrer + 3 Wetter', () => {
  const content = createContent({ entries: [{ file: 'content/units.js', kind: 'units', name: 'units', def: UNITS }] });
  const all = M.allCodes(content, opts);
  assert.equal(all.length, 54);
  assert.equal(all.filter((c) => c.kind === 'unit').length, 39);
  assert.equal(all.filter((c) => c.kind === 'module').length, 10);
  assert.equal(all.filter((c) => c.kind === 'weather').length, 3);
  const norm = all.flatMap((c) => [M.normCode(c.code), M.normCode(c.alt)]);
  assert.equal(new Set(norm).size, norm.length, 'Codes kollidieren');
  for (const c of all) assert.match(c.alt, /^[A-Z]+-[A-Z]+-\d{1,2}$/, c.alt);
  // Ersatzcode ist stabil und hängt am Salz
  assert.equal(M.hashCode('unit', 'j1-e11', opts), M.hashCode('unit', 'j1-e11', opts));
  assert.notEqual(M.hashCode('unit', 'j1-e11', opts), M.hashCode('unit', 'j1-e11', { words, salt: 'anderes-jahr' }));
  // j08 nur in der Lehrer-Liste
  assert.ok(all.find((c) => c.id === 'j1-j08').teacherOnly);
});

test('Groß/Klein, Leerzeichen, Bindestriche und Umlaute sind egal; Ersatzcode wird erkannt; Unbekanntes → null', () => {
  const content = createContent({ entries: [{ file: 'content/units.js', kind: 'units', name: 'units', def: UNITS }] });
  for (const input of ['welle', 'WELLE', ' Welle ', 'w-e-l-l-e']) assert.equal(M.resolveCode(input, content, opts).id, 'j1-e11', input);
  assert.equal(M.resolveCode('Herzglas 99', content, opts).kind, 'demo');
  assert.equal(M.resolveCode('kompass 3', content, opts).id, 'j1-m3');
  assert.equal(M.resolveCode('KOMPASS-3', content, opts).id, 'j1-m3');
  assert.equal(M.resolveCode('frühlingswetter', content, opts).id, 'fruehling');
  assert.equal(M.resolveCode('leuchtfeuer-42', content, opts).kind, 'teacher');
  const alt = M.hashCode('unit', 'j1-e04', opts);
  const r = M.resolveCode(alt.toLowerCase().replace(/-/g, ' '), content, opts);
  assert.equal(r.id, 'j1-e04'); assert.equal(r.alt, true);
  assert.equal(M.resolveCode('quatsch', content, opts), null);
  assert.equal(M.resolveCode('', content, opts), null);
  assert.equal(M.friendlyError(), 'Dieser Code passt hier nicht.');
  assert.ok(M.friendlyError().split(' ').length <= 12);
});

test('Vorschläge kommen nur aus der Wortliste: Präfix zuerst, dann Tippfehler; nichts bei 1 Zeichen', () => {
  assert.deepEqual(M.suggest('WEL', words), ['WELLE']);
  assert.deepEqual(M.suggest('wele', words), ['WELLE']);
  assert.deepEqual(M.suggest('DELFN', words), ['DELFIN']);
  assert.deepEqual(M.suggest('x', words), []);
  assert.ok(M.suggest('SCH', words, { max: 4 }).length <= 4);
  for (const s of M.suggest('kompas-3', words)) assert.ok(words.includes(s));
  assert.deepEqual(M.suggest('WELLE', words), []);   // das Wort selbst ist kein Vorschlag
});

test('Freischalt-Plan: Code öffnet die Einheit, frühere ohne Code werden Kurzfassung, Joker bis after, j08 allein', () => {
  const content = createContent({ entries: [{ file: 'content/units.js', kind: 'units', name: 'units', def: UNITS }] });
  const units = content.units;
  const p = M.planUnlock(M.resolveCode('welle', content), { units, states: {} });
  assert.deepEqual(p.open, ['j1-e11']);
  assert.deepEqual(p.kurz, UNIT_IDS.slice(0, 10));
  assert.equal(p.already, false);
  // schon fertig → already, nichts Neues
  const p2 = M.planUnlock(M.resolveCode('welle', content), { units, states: { 'j1-e11': 'fertig', ...Object.fromEntries(UNIT_IDS.slice(0, 10).map((id) => [id, 'kurz'])) } });
  assert.equal(p2.already, true); assert.deepEqual(p2.open, []); assert.deepEqual(p2.kurz, []);
  // Kurzfassung → volle Quest mit eigenem Code
  const p3 = M.planUnlock(M.resolveCode('quelle', content), { units, states: { 'j1-e04': 'kurz' } });
  assert.deepEqual(p3.open, ['j1-e04']);
  // Joker j01 (nach e08): e01–e08 als Kurzfassung, keine anderen Joker
  const pj = M.planUnlock(M.resolveCode('krabbe', content), { units, states: {} });
  assert.deepEqual(pj.open, ['j1-j01']); assert.deepEqual(pj.kurz, UNIT_IDS.slice(0, 8));
  // j08 nur per eigenem Code, ohne Kurzfassungen; Demo und Modul lassen j08 aus
  const p8 = M.planUnlock(M.resolveCode('linde', content), { units, states: {} });
  assert.deepEqual(p8.open, ['j1-j08']); assert.deepEqual(p8.kurz, []);
  const pd = M.planUnlock(M.resolveCode('herzglas-99', content), { units, states: {} });
  assert.equal(pd.kurz.length, 38); assert.ok(!pd.kurz.includes('j1-j08'));
  const pm = M.planUnlock(M.resolveCode('kompass-3', content), { units, states: { 'j1-e01': 'fertig' } });
  assert.equal(pm.kurz.length, 14); assert.ok(!pm.kurz.includes('j1-e01') && pm.kurz.includes('j1-e15') && !pm.kurz.includes('j1-e16'));
  // Lehrer/Wetter ändern keine Einheiten
  assert.deepEqual(M.planUnlock(M.resolveCode('ruhewetter', content), { units, states: {} }).open, []);
});

test('Lines & Veils: e17/e26/e28/j08 laufen als Kurzfassung ohne Szene; Umschalten holt geöffnete zurück', () => {
  const content = createContent({ entries: [{ file: 'content/units.js', kind: 'units', name: 'units', def: UNITS }] });
  const units = content.units;
  const p = M.planUnlock(M.resolveCode('wurzel', content), { units, states: {}, linesVeils: true });
  assert.deepEqual(p.veiled, ['j1-e17']); assert.deepEqual(p.open, []);
  assert.deepEqual(M.planUnlock(M.resolveCode('wurzel', content), { units, states: {}, linesVeils: false }).open, ['j1-e17']);
  assert.deepEqual(M.planUnlock(M.resolveCode('adler', content), { units, states: {}, linesVeils: true }).veiled, ['j1-e26']);
  assert.deepEqual(M.planUnlock(M.resolveCode('welle', content), { units, states: {}, linesVeils: true }).open, ['j1-e11']);   // nicht heikel
  const on = M.planLinesVeils(true, { units, states: { 'j1-e17': 'offen', 'j1-e26': 'aktiv', 'j1-e11': 'aktiv' } });
  assert.deepEqual(on.toKurz, ['j1-e17', 'j1-e26']);
  const off = M.planLinesVeils(false, { units, states: { 'j1-e17': 'kurz', 'j1-e28': 'kurz' }, codesUsed: ['unit:j1-e17'] });
  assert.deepEqual(off.toOpen, ['j1-e17']);   // e28 war nie per Code offen → bleibt Kurzfassung
  assert.ok(M.isLinesVeilsUnit({ id: 'x' }, { linesAndVeils: true }));
});

test('Lehrer-Einstellungen: Gerätespeicher, L&V-Umschaltung wirkt auf den Spielstand, Farben, Namen, Salz', () => {
  const { events, state, game, store } = world();
  const T = createTeacherSettings({ game });
  const got = [];
  events.on('linesVeils:change', (e) => got.push(e));
  // L&V an: offene heikle Einheit wird Kurzfassung ohne Szene
  state.set('units.j1-e17', 'offen'); state.push('codesUsed', 'unit:j1-e17');
  const r = T.linesVeils.set(true);
  assert.deepEqual(r.toKurz, ['j1-e17']);
  assert.equal(state.get('units.j1-e17'), 'kurz'); assert.equal(state.get('quests.j1-e17.linesVeils'), true);
  assert.equal(state.get('session.linesVeils'), true);
  assert.ok(store.getItem(TEACHER_KEY).includes('"linesVeils":true'));
  assert.ok(T.linesVeils.units().find((x) => x.id === 'j1-e17').veiled);
  // L&V aus: per Code geöffnete Einheit kommt zurück
  const r2 = T.linesVeils.set(false);
  assert.deepEqual(r2.toOpen, ['j1-e17']); assert.equal(state.get('units.j1-e17'), 'offen'); assert.equal(got.length, 2);
  // Farben: nur gültige Hex-Werte, Standard wird nicht gespeichert, wirkt auf die Aura-Farben
  T.colors.set({ wut: '#AA0000', freude: 'rot', angst: EMOTION_DEFAULTS.angst });
  assert.equal(T.colors.get().wut, '#aa0000'); assert.equal(T.colors.get().freude, EMOTION_DEFAULTS.freude);
  assert.equal(AURA_COLORS.wut, '#aa0000'); assert.ok(T.colors.isCustom());
  assert.deepEqual(Object.keys(T.device.get('colors')), ['wut']);
  T.colors.reset(); assert.equal(AURA_COLORS.wut, EMOTION_DEFAULTS.wut); assert.ok(!T.colors.isCustom());
  // Namen: Figur, Glimm und Vögel; gekürzt, leer = zurück; landen im Spielstand (names.<id>)
  assert.equal(T.names.set('luc', '  Lenny  '), 'Lenny'); assert.equal(state.get('names.luc'), 'Lenny');
  assert.equal(T.names.set('glimm', 'Funke'), 'Funke'); assert.equal(state.get('names.glimm'), 'Funke');
  assert.equal(T.names.set('sonnensegler', 'x'.repeat(40)).length, 16);
  assert.equal(T.names.set('luc', ''), null); assert.equal(state.get('names.luc'), undefined);
  assert.ok(T.names.list().some((n) => n.id === 'luc' && n.kind === 'figur') && T.names.list().some((n) => n.kind === 'vogel'));
  // Nach Laden/Neu gewinnen die Gerätenamen
  state.reset(defaultState(9));
  assert.equal(state.get('names.glimm'), 'Funke');
  // Salz
  assert.equal(T.salt.get(), M.DEFAULT_SALT); T.salt.set('schuljahr-27'); assert.ok(T.salt.isCustom()); T.salt.set(''); assert.ok(!T.salt.isCustom());
  // Wipe-Verhalten: ist der Schlüssel weg, ist alles Standard
  store.removeItem(TEACHER_KEY);
  assert.equal(T.linesVeils.active, false); assert.deepEqual(T.names.list().filter((n) => n.custom), []);
});

test('Vorlesen und Zahlenrad: spellOut und composeCode', () => {
  assert.equal(M.spellOut('WELLE'), 'W, E, L, L, E');
  assert.equal(M.spellOut('welle-korn-11'), 'W, E, L, L, E, Strich, K, O, R, N, Strich, 11');
  assert.equal(M.composeCode('welle', 42), 'WELLE-42');
  assert.equal(M.composeCode('welle', null), 'WELLE');
  assert.equal(M.composeCode(' welle '), 'WELLE');
  assert.equal(M.composeCode('kompass', 3), 'KOMPASS-3');
});

test('Lehrerheft: 39 Einheiten, alle Codes, Kursziele aus dem Kurs-JSON, Brücken der Beispiel-Quest, j08 markiert', async () => {
  const r = await buildLehrerheft({ root: ROOT });
  assert.equal(r.units, 39);
  assert.equal((r.html.match(/data-unit="/g) || []).length, 39);
  for (const u of UNITS.units) assert.ok(r.html.includes(`>${u.code}<`), u.code);
  assert.ok(r.html.includes('Anspannung 0–100'));                       // Rückseite j1-e11
  assert.ok(r.html.includes('Warum konnte man Luc bei 90 nicht zutexten?'));   // Debrief
  assert.ok(r.html.includes('Schätz dreimal am Tag'));                  // Echte Welt
  assert.ok(r.html.includes('erklären mit der Anspannungsskala'));      // Kursziel aus dem JSON
  assert.ok(r.html.includes('nur Lehrer-Liste'));
  assert.ok(r.html.includes('LEUCHTFEUER-42') && r.html.includes('RUHEWETTER') && r.html.includes('KOMPASS-3'));
  assert.ok(r.withQuest >= 1);
  assert.ok(r.html.includes('@page'));
});

// Unit-Tests Spiegel im Baumhaus (BAUPLAN §2.3 Punkt 5 „Privat bleibt privat“, KONZEPT §15):
//   Spiegel-Werte liegen unter state.private.spiegel · fehlen nachweislich im Export-Code · „Neu anfangen“ und Wipe löschen
//   sie · „Nicht merken“ speichert nichts · die Zeigen-Karte schreibt nichts · ist der Schalter „Spiegel-Stationen“ aus
//   (Standard), erscheint die Station nicht und nichts wird angelegt. Dazu: größte Lücke, Schritt-Karten, gleicher Stich.
// Aufruf: node --test tests/unit/spiegel.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { createState } from '../../src/core/state.js';
import { createEvents } from '../../src/engine/events.js';
import { createSave, decodeCode, PRIVATE_PATHS } from '../../src/core/save.js';
import { createTeacherSettings, TEACHER_KEY } from '../../src/systems/codes/teacher.js';
import { createSpiegel, spiegelLuecke, SPIEGEL_PATH, SPIEGEL_DEVICE_KEY } from '../../src/systems/baumhaus/spiegel.js';
import BED from '../../src/content/beduerfnisse.js';

function memStore() {
  const m = new Map();
  return { get length() { return m.size; }, key: (i) => [...m.keys()][i] ?? null, getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); }, removeItem: (k) => { m.delete(k); }, dump: () => [...m.entries()].map(([k, v]) => k + '=' + v).join('\n') };
}
function world() {
  const events = createEvents();
  const state = createState({ events });
  const store = memStore();
  const save = createSave({ state, events, storage: store, now: () => 1000 });
  save.newGame(0, { seed: 7 });
  const game = { state, events, save, content: { get: () => null, list: () => [] } };
  const T = createTeacherSettings({ game, storage: store, listen: false });
  const S = createSpiegel({ state, device: T.device });
  return { events, state, store, save, T, S };
}
const MARK = 0.75;   // gut auffindbarer Wert
const allValues = (S) => { for (const b of BED.liste) { S.set(b.id, 'wichtig', b.id === 'schlaf' ? 1 : 0.25); S.set(b.id, 'voll', b.id === 'schlaf' ? 0 : MARK); } };

test('Schalter AUS (Standard): keine Station, kein Wert, nichts wird angelegt', () => {
  const { state, store, S, T } = world();
  assert.equal(T.device.get(SPIEGEL_DEVICE_KEY, false), false, 'Standard aus');
  const before = JSON.stringify(state.snapshot()), storeBefore = store.dump();
  assert.equal(S.available(), false);
  assert.equal(S.values(), null);
  assert.deepEqual(S.glasses(), []);
  assert.deepEqual(S.schritte(), []);
  assert.equal(S.set('schlaf', 'voll', 0.1), false);
  assert.equal(S.setMerken(true), false);
  assert.equal(S.waehle('schlaf'), false);
  assert.equal(S.zeigen(['luecke']), null);
  assert.equal(S.fertig(), null); assert.equal(S.nichtHeute(), null);
  assert.equal(JSON.stringify(state.snapshot()), before, 'Spielstand unverändert');
  assert.equal(store.dump(), storeBefore, 'Gerätespeicher unverändert');
  assert.equal(state.get(SPIEGEL_PATH), undefined);
});

test('„Nicht merken“ (Standard) speichert nichts: weder im Spielstand noch im Gerätespeicher', () => {
  const { state, store, save, S, T } = world();
  T.device.set(SPIEGEL_DEVICE_KEY, true);
  assert.equal(S.available(), true);
  assert.equal(S.merken, false, 'Nicht merken ist voreingestellt');
  assert.equal(S.schritt, 'keiner', '„Keiner davon“ ist voreingestellt');
  allValues(S);
  S.waehle('schlaf');
  assert.equal(S.values().schlaf.wichtig, 1, 'Werte gelten in der Sitzung');
  assert.equal(state.get(SPIEGEL_PATH), undefined);
  save.save(0);
  const raw = store.getItem('lumo.save.0');
  assert.ok(!raw.includes('"spiegel"') && !raw.includes('"voll"'), 'nichts im gespeicherten Slot');
  assert.ok(!store.dump().includes('schlaf'));
});

test('„Merken (nur hier)“: Werte liegen unter state.private.spiegel und fehlen im Export-Code', () => {
  const { state, save, S, T } = world();
  T.device.set(SPIEGEL_DEVICE_KEY, true);
  allValues(S);
  S.setMerken(true);
  S.waehle('schlaf');
  const p = state.get(SPIEGEL_PATH);
  assert.equal(p.merken, true);
  assert.equal(p.werte.schlaf.wichtig, 1); assert.equal(p.werte.dazugehoeren.voll, MARK); assert.equal(p.schritt, 'schlaf');
  assert.ok(PRIVATE_PATHS.includes('private'));
  // Export-Code: nachweislich ohne private.spiegel (und ohne den Wert)
  const code = save.exportCode();
  const dec = decodeCode(code);
  assert.ok(dec.data);
  assert.equal(dec.data.private && dec.data.private.spiegel, undefined);
  const b64 = code.split('.')[2];
  const json = Buffer.from(b64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
  assert.ok(!json.includes('"spiegel"') && !json.includes('"werte"'), 'Export-JSON kennt keinen Spiegel');
  // Merken → Nicht merken: private.spiegel ist wieder ganz weg, Werte bleiben nur in der Sitzung
  S.setMerken(false);
  assert.equal(state.get(SPIEGEL_PATH), undefined);
  assert.equal(S.values().schlaf.wichtig, 1);
});

test('„Neu anfangen“ und Wipe löschen die Spiegel-Werte', () => {
  const { state, store, save, S, T, events } = world();
  T.device.set(SPIEGEL_DEVICE_KEY, true);
  allValues(S); S.setMerken(true); save.save(0);
  assert.ok(store.getItem('lumo.save.0').includes('"spiegel"'), 'gemerkt = auf dem Gerät');
  events.on('state:reset', () => S.forget());   // wie im Baumhaus-Plugin
  save.newGame(0, { seed: 9 });                  // Pause → Einstellungen → Neu anfangen
  assert.equal(state.get(SPIEGEL_PATH), undefined);
  assert.ok(!store.getItem('lumo.save.0').includes('"spiegel"'));
  assert.equal(S.values().schlaf.wichtig, 0.5, 'auch der Sitzungsspeicher ist leer');
  // Wipe: alles weg, auch der Schalter
  allValues(S); S.setMerken(true); save.save(0);
  save.wipe();
  assert.equal(state.get(SPIEGEL_PATH), undefined);
  assert.ok(!store.dump().includes('"spiegel"'));
  assert.equal(store.getItem(TEACHER_KEY), null);
  assert.equal(S.available(), false, 'nach dem Wipe wieder aus');
});

test('Zeigen-Karte schreibt nichts und zeigt nur das Ausgewählte', () => {
  const { state, store, S, T } = world();
  T.device.set(SPIEGEL_DEVICE_KEY, true);
  allValues(S); S.setMerken(true); S.waehle('schlaf');
  const before = JSON.stringify(state.snapshot()), storeBefore = store.dump();
  const a = S.zeigen(['luecke']);
  assert.deepEqual(a.items.map((i) => [i.kind, i.id]), [['luecke', 'schlaf']]);
  const b = S.zeigen(['bewegung', 'schritt']);
  assert.deepEqual(b.items.map((i) => [i.kind, i.id]), [['glas', 'bewegung'], ['schritt', 'schlaf']]);
  assert.deepEqual(S.zeigen([]).items, []);
  assert.equal(JSON.stringify(state.snapshot()), before);
  assert.equal(store.dump(), storeBefore);
});

test('Größte Lücke leuchtet erst eindeutig; drei Schritt-Karten + „Keiner davon“; „Nicht heute“ = derselbe Stich', () => {
  const { S, T, state } = world();
  T.device.set(SPIEGEL_DEVICE_KEY, true);
  assert.equal(S.luecke(), null, 'Startwerte: nichts leuchtet');
  S.set('mitbestimmen', 'wichtig', 1); S.set('mitbestimmen', 'voll', 0);
  assert.equal(S.luecke(), 'mitbestimmen');
  assert.equal(S.glasses().filter((g) => g.gross).length, 1);
  const k = S.schritte();
  assert.equal(k.length, 3);
  assert.equal(k[0].id, 'mitbestimmen');
  assert.ok(k.every((x) => typeof x.text === 'string' && x.text.length));
  assert.equal(S.waehle('keiner'), true); assert.equal(S.waehle('quatsch'), false);
  const before = JSON.stringify(state.snapshot());
  assert.deepEqual(S.fertig(), S.nichtHeute(), 'gleicher Stich');
  assert.equal(JSON.stringify(state.snapshot()), before, 'der Stich ist kein Eintrag');
  assert.equal(spiegelLuecke(Object.fromEntries(BED.liste.map((b) => [b.id, { wichtig: 0.5, voll: 0.5 }]))), null);
});

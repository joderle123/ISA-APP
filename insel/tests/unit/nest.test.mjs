// Unit-Tests Nest (BAUPLAN §2.1 A5 + C2/C4, §2.3 Punkt 4): Bedürfnisse an einer Stelle, Gläser je Figur (wichtig/voll,
// größte Lücke), Bauplätze Fotowand und Dachboden-Ecke, KEIN Zeitverfall (7 simulierte Tage ohne Spielen → gleich),
// Blitz-Motor-Riss hängt am Sitzungswechsel (Laden), nicht an der Uhr; Gefäße der Blick-Stufe als SVG.
// Aufruf: node --test tests/unit/nest.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import BED from '../../src/content/beduerfnisse.js';
import TUN from '../../src/content/npcs/tun.js';
import JOLIE from '../../src/content/npcs/jolie.js';
import ILDA from '../../src/content/npcs/ilda.js';
import * as N from '../../src/systems/nest/model.js';
import { vesselSVG, shelfHTML, vesselHeight } from '../../src/systems/abilities/gefaesse.js';
import { GLAS, glasTarget, blickStages } from '../../src/systems/abilities/model.js';
import { VALIDATORS } from '../../src/content/schema/defs.js';
import { BEDUERFNISSE } from '../../src/content/schema/consts.js';
import { createState } from '../../src/core/state.js';

const ctx = () => ({ file: 't', errors: [], warnings: [], refs: [] });

test('Bedürfnisse: die sechs Namen aus dem Kurs an EINER Stelle, gültig im Schema', () => {
  assert.deepEqual(BED.liste.map((b) => b.name), ['Dazugehören', 'Ruhe und Erholung', 'Anerkennung', 'Bewegung', 'Schlaf', 'Mitbestimmen']);
  assert.deepEqual(BED.liste.map((b) => b.id), BEDUERFNISSE);
  assert.deepEqual(N.NEEDS, BEDUERFNISSE);
  for (const b of BED.liste) { assert.ok(b.kurz.split(/\s+/).length <= 6, b.kurz); assert.ok(b.schritt.split(/\s+/).length <= 6, b.schritt); assert.match(b.color, /^#[0-9a-f]{6}$/i); }
  const c = ctx(); assert.ok(VALIDATORS.beduerfnisse(c, BED), JSON.stringify(c.errors));
  for (const d of [TUN, JOLIE, ILDA]) { const c2 = ctx(); assert.ok(VALIDATORS.npcs(c2, d), d.id + ' ' + JSON.stringify(c2.errors)); }
});

test('Gläser je Figur: Gefäßform, größte Lücke = wichtig und leer (Tun Anerkennung, Jolie Mitbestimmen, Ilda Dazugehören)', () => {
  assert.equal(TUN.glaeser.form, 'dose'); assert.equal(JOLIE.glaeser.form, 'tintenfass'); assert.equal(ILDA.glaeser.form, 'laternenglas');
  const t = N.glassesOf(TUN, N.emptyNest());
  assert.equal(t.length, 6);
  assert.equal(N.groessteLuecke(t), 'anerkennung');
  assert.equal(t.filter((g) => g.gross).length, 1);
  // Tun: drei niedrige Gläser, nur eines davon ist hoch (WERKZEUG-QUESTS Nr. 1 Schritt 3)
  const low = t.filter((g) => g.voll <= 0.3).map((g) => g.id).sort();
  assert.deepEqual(low, ['anerkennung', 'dazugehoeren', 'schlaf']);
  assert.deepEqual(low.filter((id) => TUN.glaeser.wichtig[id] >= 0.9), ['anerkennung']);
  assert.equal(N.groessteLuecke(N.glassesOf(JOLIE, null)), 'mitbestimmen');
  // Ilda: hohes halbvolles vs. kleines leeres Glas – das hohe fehlt mehr
  const il = N.glassesOf(ILDA, null);
  assert.equal(N.groessteLuecke(il), 'dazugehoeren');
  assert.ok(il.find((g) => g.id === 'schlaf').voll === 0 && il.find((g) => g.id === 'schlaf').wichtig < 0.5);
  for (const d of [TUN, JOLIE, ILDA]) assert.ok(N.folgeAktiv(N.glassesOf(d, null)), d.id + ' zeigt eine Folge');
});

test('Füllen über Ereignisse: setVoll/addVoll, falsche Tat füllt ein kleines Glas, größte Lücke bleibt', () => {
  let n = N.emptyNest();
  let r = N.addVoll(n, 'tun', 'schlaf', 0.7, TUN);   // Hängematte flicken
  assert.ok(r.ok); n = r.nest;
  assert.equal(N.glassesOf(TUN, n).find((g) => g.id === 'schlaf').voll, 0.9);
  assert.equal(N.groessteLuecke(N.glassesOf(TUN, n)), 'anerkennung', '„Danke. Trotzdem.“');
  r = N.setVoll(n, 'tun', 'anerkennung', 0.9, TUN); n = r.nest;   // Winde würdigen + Fotowand
  assert.equal(r.prev, 0.15);
  assert.notEqual(N.groessteLuecke(N.glassesOf(TUN, n)), 'anerkennung');
  assert.ok(!N.folgeAktiv(N.glassesOf(TUN, n)) || N.groessteLuecke(N.glassesOf(TUN, n)) === 'dazugehoeren');
  assert.equal(N.setVoll(n, 'tun', 'unbekannt', 1).ok, false);
  assert.equal(N.setVoll(n, 'tun', 'schlaf', 7).voll, 1, 'geklemmt');
});

test('Kein Verfall: 7 simulierte Tage ohne Spielen ändern kein Nest-Glas', () => {
  const realNow = Date.now;
  let n = N.emptyNest();
  n = N.setVoll(n, 'tun', 'anerkennung', 0.9, TUN).nest;
  n = N.setVoll(n, 'jolie', 'mitbestimmen', 0.4, JOLIE).nest;
  n = N.buildSlot(n, 'fotowand', true).nest;
  const before = JSON.stringify({ n, t: N.glassesOf(TUN, n), j: N.glassesOf(JOLIE, n) });
  // Spielstand wie im Spiel: state.time.day springt 7 Tage, die Uhr läuft 7 Tage weiter
  const st = createState({ data: { time: { day: 1, hour: 12 }, nest: n } });
  try {
    Date.now = () => realNow() + 7 * 24 * 3600 * 1000;
    for (let d = 2; d <= 8; d++) st.set('time.day', d);
    const n2 = N.normNest(st.get('nest'));
    const after = JSON.stringify({ n: n2, t: N.glassesOf(TUN, n2), j: N.glassesOf(JOLIE, n2) });
    assert.equal(after, before);
  } finally { Date.now = realNow; }
  // Das Modell kennt keine Zeit: keine Funktion nimmt Tag, Stunde oder Sekunden
  for (const [k, f] of Object.entries(N)) if (typeof f === 'function') assert.ok(!/\b(day|hour|seconds|Date|now)\b/.test(String(f)), k + ' hängt an der Zeit');
});

test('Bauplätze: zu → offen (Mission) → gebaut; Fotowand nimmt Bilder; Route auf Jolies Karte', () => {
  let n = N.emptyNest();
  assert.equal(N.slotState(n, 'fotowand', false), 'zu');
  assert.equal(N.buildSlot(n, 'fotowand', false).reason, 'zu');
  assert.equal(N.hangBild(n, 'tun').ok, false, 'ohne Fotowand kein Bild');
  let r = N.buildSlot(n, 'fotowand', true); assert.ok(r.ok); n = r.nest;
  assert.equal(N.slotState(n, 'fotowand', true), 'gebaut');
  assert.equal(N.buildSlot(n, 'fotowand', true).reason, 'gebaut');
  r = N.hangBild(n, 'tun'); assert.ok(r.ok); n = r.nest;
  assert.equal(N.hangBild(n, 'tun').ok, false, 'nicht doppelt');
  n = N.buildSlot(n, 'dachboden', true).nest;
  n = N.setRoute(n, 'lagune').nest;
  assert.deepEqual([n.gebaut, n.bilder, n.route], [['fotowand', 'dachboden'], ['tun'], 'lagune']);
  assert.deepEqual(N.SLOTS.map((s) => s.id), ['fotowand', 'dachboden']);
});

test('Blitz-Motor: Glas sofort voll mit Riss; leckt bis zur NÄCHSTEN Sitzung (Laden), nicht nach Uhrzeit', () => {
  const realNow = Date.now;
  let n = N.startSession(N.emptyNest()).nest;   // Sitzung 1
  const r = N.blitzmotor(n, TUN); assert.ok(r.ok); n = r.nest;
  let a = N.glassesOf(TUN, n).find((g) => g.id === 'anerkennung');
  assert.equal(a.voll, 1); assert.ok(a.riss); assert.equal(a.echt, 0.15);
  assert.ok(n.deko.includes('blitzmotor'), 'Material bleibt als Deko-Motor');
  assert.equal(N.blitzmotor(n, TUN).ok, false, 'nur ein Riss zugleich');
  try {
    Date.now = () => realNow() + 30 * 24 * 3600 * 1000;   // Uhr allein ändert nichts
    a = N.glassesOf(TUN, n).find((g) => g.id === 'anerkennung');
    assert.equal(a.voll, 1); assert.ok(a.riss);
  } finally { Date.now = realNow; }
  // Echte Tat in derselben Sitzung ändert den echten Wert unter dem Riss
  n = N.setVoll(n, 'tun', 'anerkennung', 0.5, TUN).nest;
  assert.equal(N.glassesOf(TUN, n).find((g) => g.id === 'anerkennung').voll, 1);
  // Nächste Sitzung: ausgelaufen, der Wunsch ist weg, der echte Wert bleibt
  const s2 = N.startSession(n);
  assert.deepEqual(s2.ausgelaufen, { npc: 'tun', need: 'anerkennung' });
  a = N.glassesOf(TUN, s2.nest).find((g) => g.id === 'anerkennung');
  assert.equal(a.voll, 0.5); assert.equal(a.riss, false);
  assert.equal(s2.nest.riss.phase, 'aus');
  assert.equal(N.startSession(s2.nest).ausgelaufen, null, 'nur einmal');
});

test('Blick-Stufe Gläser: Höhe = wichtig, Füllung = voll, Form je Figur, größte Lücke markiert, Riss tropft', () => {
  assert.ok(vesselHeight(1) > vesselHeight(0.3));
  const g = { id: 'anerkennung', wichtig: 1, voll: 0.15, color: '#ff5d8f', riss: false };
  for (const f of ['dose', 'tintenfass', 'laternenglas', 'glas']) assert.match(vesselSVG(g, f), /^<svg[\s\S]*clipPath[\s\S]*<\/svg>$/);
  assert.ok(vesselSVG({ ...g, riss: true }, 'dose').includes('gf-riss'));
  const html = shelfHTML(N.glassesOf(TUN, null), { form: 'dose', color: TUN.color });
  assert.equal((html.match(/class="gf-col/g) || []).length, 6);
  assert.equal((html.match(/is-gross/g) || []).length, 1);
  for (const b of BED.liste) assert.ok(html.includes(b.name), b.name);
  assert.ok(GLAS.hold > 0.5 && GLAS.hold < 2.5, 'kurz hinschauen reicht');
  assert.equal(glasTarget([{ id: 'a', d: 3, facing: -1 }, { id: 'b', d: 5, facing: 0.9 }]).id, 'b');
  assert.equal(glasTarget([{ id: 'a', d: 3, facing: -1 }], 'a').id, 'a');
  assert.equal(blickStages(['blick.tanks'], ['blick']).tanks, true);
});

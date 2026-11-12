// Unit-Tests Gesprächs-Minispiele (Kostprobe B, Node ohne Browser): Leine halten (Zeitplan, Bewertung, Falle „Was
// sagen“ → „Egal.“, jeder Modus schaffbar, Dauerhalten/Nie-halten scheitern) und Unter der Oberfläche (Zeitfenster,
// Abtauchen, Wortwahl, Zeit um → „Später.“, jeder Modus schaffbar), Medaillen aus den Inhalten, Einhängepunkte in e01/e02.
// Aufruf: node --test tests/unit/gespraech.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLeine, createLeine, simulate } from '../../src/minigames/leine/logic.js';
import { createOberflaeche, nextWindow } from '../../src/minigames/oberflaeche/logic.js';
import { medalFor, timingFor } from '../../src/minigames/shell/medals.js';
import LEINE from '../../src/content/minigames/e01-leine-jolie.js';
import OBER from '../../src/content/minigames/e02-oberflaeche-tun.js';
import JOLIE from '../../src/content/dialogues/e01-jolie.js';
import NACHFRAGEN from '../../src/content/dialogues/e02-nachfragen.js';

const MODES = ['entspannt', 'abenteuer', 'profi'];
const leineFor = (mode) => {
  const p = { ...LEINE.params, ...LEINE.modes[mode] };
  const plan = buildLeine(p);
  return { p, plan, L: createLeine(plan, { need: p.need, grace: p.grace * timingFor(mode) }) };
};

test('Leine: fester Zeitplan je Figur (kein Zufall), Wellen mit Abwenden, Näherkommen und Test-Satz', () => {
  const a = buildLeine({ ...LEINE.params, ...LEINE.modes.abenteuer });
  const b = buildLeine({ ...LEINE.params, ...LEINE.modes.abenteuer });
  assert.deepEqual(a, b);
  assert.equal(a.waves.length, 3);
  for (const w of a.waves) {
    const kinds = w.segs.map((s) => s.kind);
    assert.ok(kinds.includes('ab') && kinds.includes('nah') && kinds.includes('test'), kinds.join());
    assert.equal(w.segs.find((s) => s.kind === 'ab').want, 'locker');
    assert.equal(w.segs.find((s) => s.kind === 'nah').want, 'halten');
  }
  assert.deepEqual(a.waves.map((w) => w.geste), ['schaut', 'stift', 'rueckt']);
  const profi = buildLeine({ ...LEINE.params, ...LEINE.modes.profi });
  assert.equal(profi.waves[0].segs.filter((s) => s.kind === 'ab').length, 2, 'Profi: zweimal Abwenden je Welle');
  // Kein Wartebildschirm: eine Runde dauert unter 40 s
  for (const m of MODES) assert.ok(buildLeine({ ...LEINE.params, ...LEINE.modes[m] }).end < 40, m);
});

test('Leine: in jedem Modus mit der richtigen Eingabe schaffbar (Gold), Ergebnis { hits, score }', () => {
  for (const mode of MODES) {
    const { plan, L } = leineFor(mode);
    const ev = simulate(L, plan).events;
    const r = L.result();
    assert.equal(r.hits, 1, mode); assert.equal(r.survived, 3, mode); assert.ok(r.score >= 0.97, mode + ' ' + r.score);
    assert.equal(ev.filter((e) => e.type === 'welle' && e.ok).length, 3, mode + ': jede Welle ist ein kleiner Erfolg');
    const m = medalFor(LEINE, r, { mode });
    assert.equal(m.medal, 'gold', mode); assert.equal(m.stern, true, mode);
  }
});

test('Leine: Dauer-Halten (gegen das Abwenden ziehen) und Nie-Halten scheitern → „Später.“ ohne Medaille', () => {
  for (const mode of MODES) {
    for (const hold of [true, false]) {
      const { L } = leineFor(mode);
      if (hold) L.press(0);
      for (let t = 0; !L.done() && t < 200; t += 1 / 30) L.tick(t);
      const r = L.result();
      assert.equal(r.hits, 0, `${mode} hold=${hold}`);
      assert.equal(medalFor(LEINE, r, { mode }).medal, null);
    }
  }
  // Festhalten, während sie sich abwendet, spannt die Leine sichtbar (Knarzen)
  const { plan, L } = leineFor('abenteuer');
  const ab = plan.waves[0].segs.find((s) => s.kind === 'ab');
  L.press(0);
  for (let t = 0; t < ab.t0 + 1; t += 1 / 30) L.tick(t);
  assert.ok(L.strain && L.tension > 0.8, 'straff: ' + L.tension);
});

test('Leine: eine verpatzte Welle = Bronze (weiter geht es trotzdem)', () => {
  const { plan, L } = leineFor('abenteuer');
  simulate(L, plan, { wrongWaves: [2] });
  const r = L.result();
  assert.equal(r.survived, 2);
  const m = medalFor(LEINE, r, { mode: 'abenteuer' });
  assert.equal(m.medal, 'bronze');
});

test('Leine: die Falle „Was sagen“ gibt „Egal.“ – kein Abbruch, die Welle beginnt neu, kostet nur Sekunden, kein Stern', () => {
  const { plan, L } = leineFor('abenteuer');
  const base = (() => { const x = leineFor('abenteuer'); return simulate(x.L, x.plan).t; })();
  const run = simulate(L, plan, { sagenIn: 1 });
  const said = run.events.find((e) => e && e.text !== undefined && !e.type);
  assert.equal(said.text, 'Egal.');
  const r = L.result();
  assert.equal(r.gesagt, 1); assert.equal(r.hits, 1, 'kein Abbruch, alle Wellen noch schaffbar');
  assert.ok(run.t > base && run.t - base < 8, `nur Sekunden: ${base.toFixed(1)} → ${run.t.toFixed(1)}`);
  const m = medalFor(LEINE, r, { mode: 'abenteuer' });
  assert.equal(m.medal, 'gold'); assert.equal(m.stern, false);
});

test('Oberfläche: Tippen im Fenster trifft, daneben kostet nur Zeit, nach dem Treffer taucht die Farbe ab', () => {
  const O = createOberflaeche({ need: 3, window: 0.1, period: 2.4, duration: 18, words: OBER.params.words, phase0: -Math.PI / 2 });
  O.tick(0);
  const t1 = nextWindow(O, 0);
  assert.ok(t1 !== null && t1 > 0);
  assert.equal(O.tap(t1 - 0.4), 'daneben');
  assert.equal(O.tap(t1 - 0.3), 'warte', 'kurze Sperre nach Fehltipp');
  assert.equal(O.tap(t1 + 0.01), 'treffer');
  assert.equal(O.tap(t1 + 0.05), 'warte', 'abgetaucht: kein Doppel-Tippen');
  let t = t1 + 0.01;
  while (O.phase === 'tippen') { t = nextWindow(O, t + 0.001) + 0.005; O.tap(t); }
  assert.equal(O.phase, 'wort'); assert.equal(O.caught, 3); assert.equal(O.reveal, 1);
  assert.equal(O.pick(0), 'falsch', '„lustig“ ist nur die Oberfläche');
  assert.equal(O.pick(0), null, 'dasselbe Wort nicht nochmal');
  assert.equal(O.pick(1), 'richtig');
  const r = O.result();
  assert.ok(r.complete); assert.equal(r.wrong, 1); assert.equal(r.misses, 1);
  assert.equal(r.score, +(0.6 + 0.2 * 0.75).toFixed(3));
});

test('Oberfläche: in jedem Modus schaffbar (Gold mit sauberem Tippen und richtigem Wort); Zeit um → Später.', () => {
  for (const mode of MODES) {
    const p = { ...OBER.params, ...OBER.modes[mode] };
    const k = timingFor(mode);
    const O = createOberflaeche({ need: p.need, window: p.window * k, period: p.period * Math.sqrt(k), duration: p.duration * k, words: p.words, phase0: -Math.PI / 2 });
    O.tick(0);
    let t = 0;
    while (O.phase === 'tippen') { t = nextWindow(O, t + 0.001) + 0.005; assert.equal(O.tap(t), 'treffer', mode); }
    assert.ok(t < p.duration * k, `${mode}: in der Zeit (${t.toFixed(1)} s)`);
    O.pick(p.words.findIndex((w) => w.ok));
    const m = medalFor(OBER, O.result(), { mode });
    assert.equal(m.medal, 'gold', mode);
    // Zeit um
    const O2 = createOberflaeche({ need: p.need, window: p.window, period: p.period, duration: p.duration, words: p.words });
    O2.tick(0);
    assert.equal(O2.tick(p.duration + 0.1), 'zeit');
    assert.equal(O2.phase, 'fertig');
    const r2 = O2.result();
    assert.equal(r2.score, 0); assert.equal(medalFor(OBER, r2, { mode }).medal, null);
  }
});

test('Inhalte: drei Modi, Kurzfassung, kurze Texte; Einhängepunkte in e01-jolie und e02-nachfragen mit „Später.“-Weg', () => {
  const words = (s) => String(s).trim().split(/\s+/).length;
  for (const d of [LEINE, OBER]) {
    for (const m of MODES) assert.ok(d.modes[m], d.id + ' ' + m);
    assert.ok(Array.isArray(d.kurz) && d.kurz.length >= 1 && d.kurz.length <= 3, d.id + ' kurz');
    for (const l of d.kurz) assert.ok(words(l) <= 12, l);
    assert.ok(words(d.intro) <= 12, d.intro);
    assert.equal(d.story.minMedal, 'bronze');
  }
  for (const s of LEINE.params.tests) assert.ok(words(s) <= 12, s);
  assert.ok(OBER.params.words.length === 3 && OBER.params.words.filter((w) => w.ok).length === 1);
  const hook = (dlg, id) => {
    for (const [nid, n] of Object.entries(dlg.nodes)) for (const c of n.choices || []) if (c.minigame === id) return { nid, c };
    return null;
  };
  const j = hook(JOLIE, 'e01-leine-jolie');
  assert.ok(j && j.c.label === 'Dazusetzen' && JOLIE.nodes[j.c.goto] && JOLIE.nodes[j.c.gotoFail], 'e01: Dazusetzen → Leine');
  assert.equal(JOLIE.nodes[j.c.gotoFail].goto, j.nid, 'Später → dieselbe Wahl nochmal');
  const t = hook(NACHFRAGEN, 'e02-oberflaeche-tun');
  assert.ok(t && NACHFRAGEN.nodes[t.c.goto] && NACHFRAGEN.nodes[t.c.gotoFail], 'e02: Oberfläche eingehängt');
  assert.equal(NACHFRAGEN.nodes[t.c.gotoFail].goto, t.nid);
  // Story-Flags bleiben: Versprechen (m0.jolie) und Plakat (m0.plakat), Akku-Lüge mit Lämpchen (h2)
  const eff = (dlg) => JSON.stringify(dlg.nodes);
  assert.ok(eff(JOLIE).includes('"m0.jolie"') && eff(NACHFRAGEN).includes('"m0.plakat"') && NACHFRAGEN.nodes.h2);
});

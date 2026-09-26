// Szenario-Test (WP00/WP02): Plugin-Autoload, Inhalte, Zustand, Speichern im Browser, Debug-Werkzeuge,
// Beispielszenario headless, Export/Import, Reload-Persistenz, Debug-Panel nur mit ?debug.
// Aufruf: node tests/scenario.mjs   (SHOTS=Ordner, Q=low|medium|high)
import { launch, openGame, startGame, frames, shot, runScenario, hold, stateGet, IPAD_LANDSCAPE } from './lib.mjs';

const Q = process.env.Q || 'low';
const results = [];
let failed = false;
function check(name, ok, info = '') {
  results.push({ name, ok, info });
  console.log(ok ? '✔' : '✘', name, info);
  if (!ok) failed = true;
}

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart&debug` });
  await startGame(page);

  // ---- Kern und Autoload ----
  const core = await page.evaluate(() => ({
    plugins: LUMO.plugins.list, failed: LUMO.plugins.failed, units: LUMO.content.units.length, kinds: LUMO.content.kinds(),
    hasState: !!LUMO.state && typeof LUMO.state.get === 'function', slot: LUMO.save.current, handle: LUMO.state.get('handle'),
    seed: LUMO.state.get('seed'), rngSeed: LUMO.rng.seed, code: LUMO.content.lookupCode('welle'), panel: !!document.querySelector('.dbg-panel'),
  }));
  check('Debug-Plugin per Autoload installiert', core.plugins.includes('debug') && core.failed.length === 0, JSON.stringify(core.plugins));
  check('Inhalte per Autoload: 39 Einheiten', core.units === 39 && core.kinds.includes('units'), core.kinds.join(','));
  check('Zustand und Spielstand angelegt', core.hasState && core.slot === 0 && /\d/.test(core.handle) && core.seed === core.rngSeed, `${core.handle} · Seed ${core.seed}`);
  check('Code-Wort WELLE → j1-e11', core.code && core.code.id === 'j1-e11');
  check('Debug-Panel mit ?debug vorhanden', core.panel);

  // ---- Beispielszenario (headless) ----
  const r = await runScenario(page, [
    'teleport hafen',
    'expect zone == hafen',
    'expect started == true',
    'code welle',
    'expect units.j1-e11 == offen',
    'expect units.j1-e10 == kurz',
    'expect state.codesUsed ~ unit:j1-e11',
    'complete j1-e11',
    'expect units.j1-e11 == fertig',
    'grant segel',
    'grant blick.tanks',
    'expect state.abilities ~ segel',
    'expect state.upgrades ~ blick.tanks',
    'puls 80',
    'expect puls == 80',
    'mode profi',
    'expect mode == profi',
    'bond luc 2',
    'expect state.bonds.luc == 2',
    'time 12',
    'expect time >= 11.9',
    'veil strand 0.3',
    'expect veil.strand == 0.3',
    'veil strand 1',
    'restore strand 2',
    'wait 4',
    'expect veil.strand < 0.2',
    'site baumhaus',
    'expect zone == hafen',
    'teleport hafen',
    'set flags.test true',
    'expect state.flags.test == true',
    'move 0 1 2',
    'expect player.z < 116',
    'hold jump 0.2',
    'expect player.grounded == false',
    'wait 1.5',
    'expect player.grounded == true',
    'save',
    'expect dom:.dbg-panel == true',
    'log Szenario fertig',
  ], { log: !!process.env.VERBOSE });
  check('Beispielszenario läuft headless durch', r.ok, r.ok ? `${r.steps.length} Schritte` : r.steps.filter((s) => !s.ok).map((s) => s.step + ' · ' + s.info).join(' | '));
  const bad = await runScenario(page, ['expect puls == 5', 'quatsch machen']);
  check('Fehlschläge werden gemeldet', !bad.ok && bad.failures === 2, JSON.stringify(bad.steps.map((s) => s.info)));

  // ---- Speichern im Browser: Export ohne private Felder, Import, Reload ----
  const sv = await page.evaluate(() => {
    LUMO.state.set('private.glaubenssatz', 'GEHEIM-1234');
    LUMO.state.set('baumhaus.glas', ['muschel-geheim']);
    LUMO.save.save();
    const code = LUMO.save.exportCode();
    const imp = LUMO.save.importCode(code, 4);
    const slots = LUMO.save.slots();
    const raw = localStorage.getItem('lumo.save.0');
    return { len: code.length, leak: code.includes('GEHEIM') || code.includes('muschel-geheim'), imp, s0: slots[0], s4: slots[4], rawHasPrivate: raw.includes('GEHEIM-1234'), rawHasSession: raw.includes('"session"'), keys: Object.keys(localStorage).filter((k) => k.startsWith('lumo.')) };
  });
  check('Export-Code ohne private Felder, Import in Slot 4', !sv.leak && sv.imp.ok && sv.imp.slot === 4 && !sv.s4.empty && sv.s4.unitsDone === 1, `${sv.len} Zeichen · ${sv.keys.join(',')}`);
  check('Slot 0 lokal gespeichert (private bleibt lokal, session nicht)', !sv.s0.empty && sv.rawHasPrivate && !sv.rawHasSession);
  await page.reload();
  await page.waitForFunction(() => window.LUMO && LUMO.loop && LUMO.loop.frame > 1, null, { timeout: 180000 });
  const after = await page.evaluate(() => ({ unit: LUMO.state.get('units.j1-e11'), mode: LUMO.state.get('settings.mode'), priv: LUMO.state.get('private.glaubenssatz'), slot: LUMO.save.current, puls: LUMO.state.get('session.puls'), veil: LUMO.world.veil.getState().strand, pos: LUMO.state.get('pos') }));
  check('Spielstand überlebt Neuladen (Slot, Einheit, Modus, Schleier)', after.unit === 'fertig' && after.mode === 'profi' && after.priv === 'GEHEIM-1234' && after.slot === 0 && after.puls === 0 && after.veil < 0.2, JSON.stringify(after));
  await startGame(page);
  const wipe = await page.evaluate(() => { const n = LUMO.save.wipe(); return { n, keys: Object.keys(localStorage).filter((k) => k.startsWith('lumo.')), unit: LUMO.state.get('units.j1-e11') }; });
  check('Wipe löscht alle lumo.*-Schlüssel', wipe.n >= 2 && wipe.keys.length === 0 && wipe.unit === undefined, JSON.stringify(wipe));

  // ---- Debug-Panel ansehen ----
  await page.evaluate(() => { LUMO.debug.panel.open(true); LUMO.debug.setPuls(64); LUMO.debug.teleport('hafen'); LUMO.debug.advance(0.5); LUMO.cameraRig.snap(); });
  await page.click('.dbg-panel [data-a=stats]');
  await frames(page, 3);
  await shot(page, '70_debug_panel');
  const val = await page.evaluate(() => LUMO.debug.validateContent());
  check('Inhalte im Browser validierbar', val.ok && val.counts.units === 1, JSON.stringify(val.counts));
  await hold(page, 'jump', 0.15);
  check('Keine Seitenfehler (mit ?debug)', errors.length === 0, errors.slice(0, 5).join('\n'));
  await context.close();

  // ---- Ohne ?debug: keine Debug-UI, aber API ----
  const P = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await startGame(P.page);
  const nd = await P.page.evaluate(() => ({ panel: !!document.querySelector('.dbg-panel, .dbg-tab'), api: typeof LUMO.debug.runScenario === 'function', plugin: LUMO.plugins.debug && LUMO.plugins.debug.panel }));
  check('Ohne ?debug keine Debug-UI', !nd.panel && nd.api && nd.plugin === false, JSON.stringify(nd));
  await frames(P.page, 2);
  await shot(P.page, '71_ohne_debug');
  check('Keine Seitenfehler (ohne ?debug)', P.errors.length === 0, P.errors.slice(0, 5).join('\n'));
  await P.context.close();
} catch (e) {
  console.error(e);
  failed = true;
} finally {
  await browser.close();
}
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} Prüfungen ok`);
process.exit(failed ? 1 : 0);

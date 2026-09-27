// Szenario Demo-Pfad Hafen (Browser, headless): Start → Ankunft (Ilda gibt den Blick) → Code BOJE → Möwen-Rennen, Kodex,
// Jolie (Dazusetzen, Splitter 1) → Farbwelle → Code DELFIN → Nachfragen, Funken tragen, Komplimente → Code OTTER →
// Brücke, Hafengrotte, Kodex-Zeile → Hafen ganz bunt, Signalfeuer brennen → Speichern und „Weiter“ in einem neuen Tab →
// graue Regionen: „Kommt bald“ ohne Absturz → Demo-/Lehrer-Code. Aufruf: node tests/scenarios/demo.mjs (Q=low|medium)
import { launch, openGame, startGame, frames, shot, runScenario, pickChoice, IPAD_LANDSCAPE, DIST } from '../lib.mjs';

const Q = process.env.Q || 'low';
const results = [];
let failed = false;
function check(name, ok, info = '') {
  results.push({ name, ok, info });
  console.log(ok ? '✔' : '✘', name, info);
  if (!ok) failed = true;
}
const J = (o) => JSON.stringify(o);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const scen = (page, steps) => runScenario(page, steps, { log: !!process.env.VERBOSE });
const info = (page) => page.evaluate(() => LUMO.debug.questInfo());
// Warten mit Spielzeit: unter ?test läuft die Simulation nur über LUMO.debug.advance – also abwechselnd prüfen und vorspulen
async function waitFor(page, fn, ms = 40000) {
  const t0 = Date.now();
  for (;;) {
    if (await page.evaluate(fn)) return true;
    if (Date.now() - t0 > ms) throw new Error(`waitFor: Timeout ${ms} ms`);
    await page.evaluate(() => LUMO.debug.advance(0.4));
    await sleep(80);
  }
}
const pressAction = (page) => page.evaluate(() => { LUMO.input.press('action'); LUMO.debug.advance(1 / 30); LUMO.input.release('action'); LUMO.debug.advance(0.1); });
const veilHafen = (page) => page.evaluate(() => LUMO.world.veil.zoneValue('hafen'));

// Szene durchspielen: Blasen per Aktion weiter, Lauschen abwarten, Kacheln nach Vorliebe (Textanfang) sonst die erste,
// eingebettete Minispiele automatisch (mgAuto). Gibt true zurück, sobald die Szene zu ist.
async function playScene(page, prefer = [], { timeout = 90000, onChoices = null } = {}) {
  const t0 = Date.now();
  let guard = 0;
  playScene.seen = [];
  while (Date.now() - t0 < timeout) {
    const st = await page.evaluate(() => ({
      open: !!(LUMO.dialogue && LUMO.dialogue.isOpen),
      choices: LUMO.ui.choices.open ? [...document.querySelectorAll('.choices:not(.is-out) [data-choice]')].filter((e) => !e.classList.contains('is-system')).map((e) => e.querySelector('.choice-label').textContent) : null,
      lauschen: !!document.querySelector('.bubble.is-lauschen'),
      bubble: !!document.querySelector('.bubble:not(.is-out)'),
      minigame: !!document.querySelector('[data-overlay="minigame"]'),
    }));
    if (!st.open && !st.minigame) return true;
    if (st.minigame) { await page.evaluate(() => LUMO.debug.mgAuto('gold')); await sleep(300); continue; }
    if (st.lauschen) { await page.evaluate(() => LUMO.debug.advance(4.8)); await sleep(200); continue; }
    if (st.choices && st.choices.length) {
      if (!playScene.seen.length && onChoices) await onChoices(st.choices);
      playScene.seen.push(...st.choices);
      let idx = st.choices.findIndex((l) => prefer.some((p) => l.startsWith(p)));
      if (idx < 0) idx = 0;
      await pickChoice(page, idx);
      await sleep(300);
      continue;
    }
    if (st.bubble) { await pressAction(page); await sleep(220); continue; }
    if (++guard > 400) break;
    await page.evaluate(() => LUMO.debug.advance(0.5));   // Zeichen/Emote, Übergänge: Spielzeit vorspulen
    await sleep(100);
  }
  return false;
}
// Zum Ort gehen und den wartenden Schritt anstoßen (Szene „Reden“ / Minispiel „Start“ / Tragen „Nehmen“)
async function goAndAct(page, site, cond, ms = 15000) {
  await scen(page, [`site ${site}`, 'wait 0.6']);
  await frames(page, 2);
  const t0 = Date.now();
  for (let i = 0; ; i++) {
    if (await page.evaluate(cond)) return true;
    if (Date.now() - t0 > ms) {
      const diag = await page.evaluate(() => ({ cur: LUMO.interactions.current && LUMO.interactions.current.label, ov: LUMO.ui.overlay.count, lock: LUMO.ui.lock.reasons, dlg: LUMO.dialogue.isOpen, step: LUMO.debug.questInfo().step, zone: LUMO.zone, paused: LUMO.paused }));
      throw new Error(`goAndAct ${site}: ${JSON.stringify(diag)}`);
    }
    if (i % 3 === 0) await pressAction(page);
    await page.evaluate(() => LUMO.debug.advance(0.4));
    await sleep(120);
  }
}
const sceneOpen = () => !!(LUMO.dialogue && LUMO.dialogue.isOpen);
const mgOpen = () => !!document.querySelector('[data-overlay="minigame"]');

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart&debug&demo` });
  await startGame(page, { hour: 17.3 });

  // ---- 1 Start: Plugins, Inhalte, Hafen grau, Ankunft läuft ----
  const api = await page.evaluate(() => ({ plugins: LUMO.plugins.list, failed: LUMO.plugins.failed.map((f) => f.id), defs: LUMO.quests.defs().map((d) => d.id), regions: LUMO.content.list('regions').map((r) => r.id) }));
  check('Plugin hafen installiert, kein Plugin gescheitert', api.plugins.includes('hafen') && !api.failed.length, api.failed.length ? 'gescheitert: ' + J(api.failed) : '');
  check('Quests hafen-ankunft, j1-e01, j1-e02, j1-e03 und Region hafen registriert', ['hafen-ankunft', 'j1-e01', 'j1-e02', 'j1-e03'].every((id) => api.defs.includes(id)) && api.regions.includes('hafen'), J(api.defs));
  await waitFor(page, () => LUMO.state.get('flags.hafenStart') && LUMO.quests.active === 'hafen-ankunft', 15000);
  const s0 = await page.evaluate(() => ({ veil: LUMO.world.veil.zoneValue('hafen'), active: LUMO.quests.active, step: LUMO.debug.questInfo().step, marker: LUMO.quests.markers.target, blick: LUMO.state.get('abilities', []).includes('blick') }));
  check('Erster Start: Hafen halb grau (≈ 0,55), Ankunft aktiv mit Marker am Steg, noch kein Blick', Math.abs(s0.veil - 0.55) < 0.05 && s0.step === 'ilda' && s0.marker && Math.abs(s0.marker.z - 130) < 1 && !s0.blick, J(s0));
  await page.evaluate(() => { LUMO.debug.teleport({ x: 6, z: 128 }, Math.atan2(4 - 6, 106 - 128)); LUMO.debug.advance(0.5); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); });
  await frames(page, 4);
  await shot(page, '200_demo_hafen_grau');

  // ---- 2 Ankunft: Ilda gibt den Blick ----
  await goAndAct(page, 'hafen.steg', sceneOpen);
  const d0 = await page.evaluate(() => ({ id: LUMO.dialogue.current && LUMO.dialogue.current.id, who: (document.querySelector('.bubble') || {}).dataset && document.querySelector('.bubble').dataset.who, cam: LUMO.cameraRig.mode }));
  check('Am Steg: Szene ankunft-ilda, Ilda spricht, Talk-Kamera', d0.id === 'ankunft-ilda' && d0.who === 'ilda' && d0.cam === 'talk', J(d0));
  await frames(page, 2);
  await shot(page, '201_demo_ilda');
  const ok1 = await playScene(page, ['Was ist passiert', 'Ja.']);
  await waitFor(page, () => LUMO.quests.status('hafen-ankunft') === 'fertig', 20000);
  const s1 = await page.evaluate(() => ({ blick: LUMO.state.get('abilities', []).includes('blick'), deed: LUMO.state.get('deeds', []).includes('ilda-blick'), aura: LUMO.npcs.view ? LUMO.npcs.view.aura : null, active: LUMO.quests.active }));
  check('Ankunft fertig: Blick gewährt (Auren an), Tat im Log, kein Auftrag mehr aktiv', ok1 && s1.blick && s1.deed && s1.aura !== false && !s1.active, J(s1));

  // ---- 3 Code BOJE → j1-e01: Möwen-Rennen, Kodex, Jolie ----
  const r1 = await scen(page, ['code boje', 'expect state.units.j1-e01 == aktiv']);
  check('Code BOJE öffnet und startet j1-e01', r1.ok, r1.steps.filter((s) => !s.ok).map((s) => s.step + ' · ' + s.info).join(' | '));
  await goAndAct(page, 'hafen.steg', mgOpen);
  const m1 = await page.evaluate(() => ({ title: (document.querySelector('[data-overlay="minigame"] .ov-title') || {}).textContent, step: LUMO.debug.questInfo().step }));
  check('Schritt moewe: Rennen „Hafen-Dächer“ startet am Steg', m1.title === 'Hafen-Dächer' && m1.step === 'moewe', J(m1));
  await shot(page, '202_demo_rennen');
  await page.evaluate(() => LUMO.debug.mgAuto('gold'));
  await waitFor(page, () => LUMO.debug.questInfo().step === 'kodex', 30000);
  await goAndAct(page, 'hafen.dorfplatz', sceneOpen);
  const d1 = await page.evaluate(() => ({ id: LUMO.dialogue.current && LUMO.dialogue.current.id, cast: [...document.querySelectorAll('.bubble')].map((b) => b.dataset.who) }));
  check('Schritt kodex: Szene e01-kodex mit Tun', d1.id === 'e01-kodex', J(d1));
  const ok2 = await playScene(page, ['Eine Regel', 'Niemand wird ausgelacht', 'Dann lacht keiner', 'Nehmen wir']);
  await waitFor(page, () => LUMO.debug.questInfo().step === 'jolie', 20000);
  const k1 = await page.evaluate(() => ({ lachen: LUMO.state.get('flags.kodex.lachen'), deed: LUMO.state.get('deeds', []).includes('kodex-regel'), bond: LUMO.npcs.bond('tun') }));
  check('Kodex ausgehandelt: Regel „Niemand wird ausgelacht“, Tat, Bindung Tun 1', ok2 && k1.lachen === true && k1.deed && k1.bond >= 1, J(k1));
  await goAndAct(page, 'hafen.ufer', sceneOpen);
  const ok3 = await playScene(page, ['Dazusetzen'], { onChoices: async () => { await frames(page, 2); await shot(page, '203_demo_jolie'); } });
  check('Jolie: Kacheln mit „Dazusetzen“ (Zeichen), Szene bis zum Ende', ok3 && playScene.seen.includes('Dazusetzen'), J(playScene.seen));
  await waitFor(page, () => LUMO.state.get('units.j1-e01') === 'fertig', 30000);
  await frames(page, 6);
  await shot(page, '204_demo_farbwelle');
  await waitFor(page, () => LUMO.world.veil.zoneValue('hafen') <= 0.31, 40000);
  const e1 = await page.evaluate(() => ({ shards: LUMO.state.get('shards', []), patches: LUMO.state.get('patches', []), splitter: LUMO.state.get('lichtsplitter'), veil: LUMO.world.veil.zoneValue('hafen'), bond: LUMO.npcs.bond('jolie'), fire: !!LUMO.state.get('signalfeuer.sf-hafen-platz') }));
  check('e01 fertig: Splitter 1, Aufnäher j1-e01, Lichtsplitter, Farbwelle → Schleier 0,3, Bindung Jolie, Signalfeuer Dorfplatz brennt', ok3 && e1.shards.includes(1) && e1.patches.includes('j1-e01') && e1.splitter >= 2 && e1.veil <= 0.31 && e1.bond >= 1 && e1.fire, J(e1));

  // ---- 4 Code DELFIN → j1-e02: Nachfragen, Funken, Komplimente ----
  const r2 = await scen(page, ['code delfin', 'expect state.units.j1-e02 == aktiv']);
  check('Code DELFIN öffnet und startet j1-e02', r2.ok, r2.steps.filter((s) => !s.ok).map((s) => s.step + ' · ' + s.info).join(' | '));
  await goAndAct(page, 'hafen.dorfplatz', sceneOpen);
  const ok4 = await playScene(page, ['Was machst du gern', 'Und dann?']);
  await waitFor(page, () => LUMO.debug.questInfo().step === 'funken', 20000);
  const n1 = await page.evaluate(() => ({ faeden: LUMO.state.get('upgrades', []).includes('blick.faeden'), deed: LUMO.state.get('deeds', []).includes('tun-nachgefragt') }));
  check('Nachfragen: Faden-Stufe des Blicks, Tat im Log', ok4 && n1.faeden && n1.deed, J(n1));
  let delivered = 0;
  for (let i = 0; i < 3; i++) {
    await scen(page, ['site hafen.feuerPlatz', 'wait 0.4']);
    await pressAction(page);
    await waitFor(page, () => !!LUMO.player.carrying, 8000);
    await scen(page, ['site hafen.laternen', 'wait 0.3']);
    await waitFor(page, () => !LUMO.player.carrying, 8000);   // am Ziel abgestellt = geliefert
    delivered++;
  }
  check('Funken tragen: drei Ladungen vom Feuer zu den Laternen', delivered === 3, `delivered=${delivered}`);
  await waitFor(page, () => LUMO.debug.questInfo().step === 'kompliment', 15000);
  await goAndAct(page, 'hafen.dorfplatz', mgOpen);
  const m2 = await page.evaluate(() => (document.querySelector('[data-overlay="minigame"] .ov-title') || {}).textContent);
  check('Schritt kompliment: Satz-Bau „Die Laterne steigt“', m2 === 'Die Laterne steigt', J(m2));
  await page.evaluate(() => LUMO.debug.mgAuto('gold'));
  await waitFor(page, () => LUMO.state.get('units.j1-e02') === 'fertig', 30000);
  await waitFor(page, () => LUMO.world.veil.zoneValue('hafen') <= 0.16, 40000);
  const e2 = await page.evaluate(() => ({ patches: LUMO.state.get('patches', []), veil: LUMO.world.veil.zoneValue('hafen'), bond: LUMO.npcs.bond('tun') }));
  check('e02 fertig: Aufnäher, Schleier 0,15, Bindung Tun', e2.patches.includes('j1-e02') && e2.veil <= 0.16 && e2.bond >= 1, J(e2));

  // ---- 5 Code OTTER → j1-e03: Brücke, Grotte, Kodex-Zeile ----
  const r3 = await scen(page, ['code otter', 'expect state.units.j1-e03 == aktiv']);
  check('Code OTTER öffnet und startet j1-e03', r3.ok, r3.steps.filter((s) => !s.ok).map((s) => s.step + ' · ' + s.info).join(' | '));
  await goAndAct(page, 'hafen.bruecke', sceneOpen);
  const ok5 = await playScene(page, ['Allein wird das nichts', 'Jolie, geh du vor']);
  await waitFor(page, () => LUMO.debug.questInfo().step === 'grotte', 20000);
  const t1 = await page.evaluate(() => ({ team: LUMO.state.get('abilities', []).includes('teamgeist'), ruf: LUMO.state.get('upgrades', []).includes('teamgeist.ruf'), deed: LUMO.state.get('deeds', []).includes('crew-bruecke') }));
  check('Brücke der Drei: Teamgeist + Crew-Ruf, Tat im Log', ok5 && t1.team && t1.ruf && t1.deed, J(t1));
  await goAndAct(page, 'hafen.grotte', mgOpen);
  const m3 = await page.evaluate(() => (document.querySelector('[data-overlay="minigame"] .ov-title') || {}).textContent);
  check('Schritt grotte: Lotsen „Die Hafengrotte“', m3 === 'Die Hafengrotte', J(m3));
  await shot(page, '205_demo_grotte');
  await page.evaluate(() => LUMO.debug.mgAuto('gold'));
  await waitFor(page, () => ['rollentausch', 'kodexzeile'].includes(LUMO.debug.questInfo().step), 30000);
  if ((await info(page)).step === 'rollentausch') {
    await sleep(400);
    const open = await page.evaluate(mgOpen);
    if (open) { await page.evaluate(() => LUMO.debug.mgAuto('gold')); } else { await page.evaluate(() => LUMO.debug.skipStep()); }
    await waitFor(page, () => LUMO.debug.questInfo().step === 'kodexzeile', 30000);
  }
  await goAndAct(page, 'hafen.dorfplatz', sceneOpen);
  const ok6 = await playScene(page, ['Beim Führen gilt Stopp']);
  await waitFor(page, () => LUMO.state.get('units.j1-e03') === 'fertig', 30000);
  await waitFor(page, () => LUMO.world.veil.zoneValue('hafen') <= 0.01, 40000);
  const e3 = await page.evaluate(() => ({ zeile: LUMO.state.get('flags.kodex.zeile'), patches: LUMO.state.get('patches', []), veil: LUMO.world.veil.zoneValue('hafen'), fires: LUMO.session.signalfeuer.litIds().filter((id) => id.startsWith('sf-hafen')).length, saved: LUMO.save.slots()[LUMO.save.current].unitsDone }));
  check('e03 fertig: Kodex-Zeile, drei Aufnäher, Hafen ganz bunt (Schleier 0), vier Hafen-Feuer brennen, Spielstand gesichert (3 Einheiten)', ok6 && e3.zeile === 'stopp' && e3.patches.length === 3 && e3.veil <= 0.01 && e3.fires === 4 && e3.saved === 3, J(e3));
  await page.evaluate(() => { LUMO.debug.teleport({ x: 6, z: 128 }, Math.atan2(4 - 6, 106 - 128)); LUMO.debug.advance(0.5); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); });
  await frames(page, 4);
  await shot(page, '206_demo_hafen_bunt');

  // ---- 6 Namensschilder: nah klein, fern größer (Weltmaß), immer lesbar ----
  const tags = await page.evaluate(() => { const n = LUMO.npcs.get('ilda'); const p = n.group.position; const at = (d) => { LUMO.debug.teleport({ x: p.x + d, z: p.z }, Math.atan2(-d, 0)); LUMO.debug.advance(0.3); return +n.humanoid.group.children.find((c) => c.isSprite).scale.y.toFixed(3); }; return { near: at(1.8), far: at(12) }; });
  check('Namensschild skaliert mit dem Abstand (nah ≈ 0,15 m, fern 0,48 m)', tags.near < 0.2 && tags.far > 0.45, J(tags));

  // ---- 7 Graue Regionen: freundlicher Hinweis, kein Absturz ----
  await scen(page, ['teleport strand', 'wait 0.5']);
  await waitFor(page, () => (document.querySelector('.glimm-line') || {}).textContent && document.querySelector('.glimm-line').textContent.includes('Kommt bald'), 8000).catch(() => null);
  const g1 = await page.evaluate(() => ({ zone: LUMO.zone, veil: LUMO.world.veil.zoneValue('strand'), glimm: (document.querySelector('.glimm-line') || {}).textContent || '' }));
  check('Strand grau: Glimm „Grau hier. Kommt bald.“', g1.veil >= 0.5 && g1.glimm.includes('Kommt bald'), J(g1));
  await scen(page, ['teleport dschungel', 'wait 0.5', 'teleport klippen', 'wait 0.5', 'teleport hafen', 'wait 0.5']);

  // ---- 8 Weiter: neuer Tab, Spielstand geladen, nichts startet doppelt ----
  await page.evaluate(() => LUMO.save.save());
  await page.close();   // ein Tab reicht dem Software-Renderer; der Kontext (localStorage) bleibt
  const page2 = await context.newPage();
  page2.setDefaultTimeout(180000);
  const errors2 = [];
  page2.on('pageerror', (e) => errors2.push('pageerror: ' + (e && e.message ? e.message : e)));
  await page2.goto('file://' + DIST + `?test&q=${Q}&skipintro&autostart&debug&demo`);
  await page2.waitForFunction(() => window.LUMO && LUMO.loop && LUMO.loop.frame > 1, null, { timeout: 180000 });
  await startGame(page2, { hour: 17.3 });
  await sleep(900);
  const c1 = await page2.evaluate(() => ({ e03: LUMO.state.get('units.j1-e03'), active: LUMO.quests.active, veil: LUMO.world.veil.zoneValue('hafen'), blick: LUMO.state.get('abilities', []).includes('blick'), patches: (LUMO.state.get('patches', []) || []).length, ankunft: LUMO.quests.status('hafen-ankunft') }));
  check('„Weiter“: Spielstand geladen – e03 fertig, Hafen bunt, Blick da, Ankunft startet nicht nochmal', c1.e03 === 'fertig' && !c1.active && c1.veil <= 0.01 && c1.blick && c1.patches === 3 && c1.ankunft === 'fertig', J(c1));

  // ---- 9 Demo- und Lehrer-Code ----
  const r4 = await runScenario(page2, ['code herzglas-99', 'expect state.units.j1-e04 == kurz', 'expect state.units.j1-e03 == fertig']);
  check('Demo-Code HERZGLAS-99: übrige Einheiten als Kurzfassung, fertige bleiben fertig', r4.ok, r4.steps.filter((s) => !s.ok).map((s) => s.step + ' · ' + s.info).join(' | '));
  const r5 = await runScenario(page2, ['code leuchtfeuer-42', 'expect state.session.teacher == true']);
  check('Lehrer-Code LEUCHTFEUER-42 öffnet das Lehrer-Panel', r5.ok, r5.steps.filter((s) => !s.ok).map((s) => s.step + ' · ' + s.info).join(' | '));
  await page2.evaluate(() => { LUMO.codes.endTeacher(); });

  const allErrors = errors.concat(errors2).filter((e) => !/favicon|AudioContext|WebGL|ResizeObserver/.test(e));
  check('Keine Seitenfehler', allErrors.length === 0, allErrors.slice(0, 3).join(' | '));
} catch (e) {
  check('Szenario ohne Ausnahme', false, String(e && e.stack ? e.stack.split('\n').slice(0, 3).join(' ') : e));
} finally {
  await browser.close();
}
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} Prüfungen ok`);
process.exit(failed ? 1 : 0);

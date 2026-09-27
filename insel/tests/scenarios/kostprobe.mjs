// Szenario Kostprobe Teil 1 „Die Kielpost fährt“ (BAUPLAN §2.1 A, §2.3 Punkt 2 erster Spiegelstrich + Punkt 7 Wasser):
// HERZGLAS-99 macht die Kielpost verfügbar → am Steg einsteigen (Ilda gibt die Laterne) → fahren (Tempo, Gischt) →
// Fehlversuch mit dem Haken → 6 Kisten bergen → Nebel ohne Licht dreht ab → Pause „Zurück zum Steg“ → an der Werft
// Laterne bauen (Mesh am Boot) → Nebelwand löst sich auf → Kiste an der Wrackbank bergen → am Steg anlegen und
// aussteigen → neu laden mitten auf dem Wasser: Start am Steg, Funde bleiben.
// Aufruf: flock /tmp/lumo-chrome.lock node tests/scenarios/kostprobe.mjs   (Screenshots 300_… im SHOTS-Ordner)
import { launch, openGame, startGame, frames, shot, runScenario, pickChoice, DIST } from '../lib.mjs';

const Q = process.env.Q || 'low';
let failed = false;
function check(name, ok, info = '') { console.log(ok ? '✔' : '✘', name, info); if (!ok) failed = true; }
const J = (o) => JSON.stringify(o);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pressAction = (page) => page.evaluate(() => { LUMO.input.press('action'); LUMO.debug.advance(1 / 30); LUMO.input.release('action'); LUMO.debug.advance(0.1); });

async function playScene(page, prefer = [], timeout = 60000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeout) {
    const st = await page.evaluate(() => ({
      open: !!(LUMO.dialogue && LUMO.dialogue.isOpen),
      choices: LUMO.ui.choices.open ? [...document.querySelectorAll('.choices:not(.is-out) [data-choice]')].filter((e) => !e.classList.contains('is-system')).map((e) => e.querySelector('.choice-label').textContent) : null,
      bubble: !!document.querySelector('.bubble:not(.is-out)'),
    }));
    if (!st.open) return true;
    if (st.choices && st.choices.length) { let i = st.choices.findIndex((l) => prefer.some((p) => l.startsWith(p))); await pickChoice(page, i < 0 ? 0 : i); await sleep(250); continue; }
    if (st.bubble) { await pressAction(page); await sleep(200); continue; }
    await page.evaluate(() => LUMO.debug.advance(0.5)); await sleep(80);
  }
  return false;
}
// Fahren mit Absicht (Joystick kamerabezogen), Spielzeit vorspulen
const drive = (page, x, y, s, extra = {}) => page.evaluate(([x, y, s, e]) => {
  let maxSp = 0;
  for (let t = 0; t < s; t += 0.05) { LUMO.player.setIntent({ x, y, camYaw: e.camYaw !== undefined ? e.camYaw : LUMO.cameraRig.yaw, jumpHeld: !!e.sail }); LUMO.debug.advance(0.05); maxSp = Math.max(maxSp, LUMO.debug.kielpost.info().speed); }
  LUMO.player.setIntent(null);
  return { ...LUMO.debug.kielpost.info(), maxSp };
}, [x, y, s, extra]);
// Haken: Aktion halten (Sekunden), dann loslassen
const hook = (page, s) => page.evaluate((s) => { LUMO.input.press('action'); for (let t = 0; t < s; t += 0.05) LUMO.debug.advance(0.05); LUMO.input.release('action'); LUMO.debug.advance(0.1); return LUMO.debug.bergen.info(); }, s);
const view = (page) => page.evaluate(() => { LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); LUMO.debug.advance(0.2); });

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { query: `q=${Q}&skipintro&autostart&debug` });
  await startGame(page, { hour: 11 });
  const p0 = await page.evaluate(() => ({ failed: LUMO.plugins.failed.map((f) => f.id), has: ['kielpost', 'bergen', 'werft'].every((id) => LUMO.plugins.list.includes(id)), av: LUMO.debug.kielpost.info().available }));
  check('Plugins kielpost/bergen/werft da, Kielpost vor OTTER noch nicht verfügbar', p0.has && !p0.failed.length && !p0.av, J(p0));

  // ---- 1 HERZGLAS-99 (j1-e03 als Kurzfassung) → Kielpost liegt am Steg ----
  const r1 = await runScenario(page, ['code herzglas-99']);
  const p1 = await page.evaluate(() => ({ e03: LUMO.state.get('units.j1-e03'), ...LUMO.debug.kielpost.info(), goal: LUMO.freeGoal && LUMO.freeGoal() }));
  check('HERZGLAS-99: Kielpost sichtbar am Steg, Ziel-Zeile „Zur Kielpost am Steg“', r1.ok && p1.available && p1.visible && Math.abs(p1.x - 2.4) < 0.1 && p1.goal && /Kielpost/.test(p1.goal.text), J(p1));

  // ---- 2 Einsteigen: Ilda erwischt dich, gibt die Laterne ----
  await page.evaluate(() => { LUMO.debug.teleport({ x: 5.2, z: 146.2 }, -Math.PI / 2); LUMO.debug.advance(0.4); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); LUMO.debug.advance(0.2); });
  const lbl = await page.evaluate(() => LUMO.interactions.current && LUMO.interactions.current.label);
  await shot(page, '300_kielpost_am_steg');
  await pressAction(page);
  for (let i = 0; i < 40 && !(await page.evaluate(() => LUMO.dialogue.isOpen)); i++) { await page.evaluate(() => LUMO.debug.advance(0.2)); await sleep(60); }
  const seen = [];
  await page.evaluate(() => { window.__n = []; LUMO.events.on('dialogue:node', (e) => window.__n.push(e.node)); });
  const okD = await playScene(page, ['Was ist da', 'Nur kurz']);
  for (let i = 0; i < 30 && (await page.evaluate(() => LUMO.player.state)) !== 'boot'; i++) { await page.evaluate(() => LUMO.debug.advance(0.2)); await sleep(60); }
  const p2 = await page.evaluate(() => ({ state: LUMO.player.state, plan: LUMO.state.get('flags.boot.plan.laterne'), ilda: LUMO.state.get('boot.ilda'), nodes: window.__n }));
  void seen;
  check('„Einsteigen“ am Steg → Ilda: „Eine Fahrt. Ohne Mist.“ … „Nimm die. War meine.“ → Plan Laterne, du sitzt im Boot', lbl === 'Einsteigen' && okD && p2.state === 'boot' && p2.plan === true && p2.ilda && p2.nodes.includes('d') && p2.nodes.includes('f'), J({ lbl, ...p2 }));

  // ---- 3 Fahren: beschleunigen, Kurve, Gischt ----
  await view(page);
  const d1 = await drive(page, 0, 1, 7);
  await shot(page, '301_kielpost_fahrt');
  const d2 = await drive(page, 0.8, 0.6, 1.2);
  await shot(page, '302_kielpost_kurve');
  check('Fahren: Kielpost beschleunigt auf See (Tempo > 5), bleibt im Boot', d1.maxSp > 5 && d1.onBoat && d2.onBoat && Math.hypot(d1.x - 2.4, d1.z - 146) > 15, J({ d1, d2 }));

  // ---- 4 Fehlversuch + 6 Kisten bergen ----
  await page.evaluate(() => LUMO.debug.bergen.goTo('d1'));
  await view(page);
  await shot(page, '303_kiste_in_reichweite');
  const g0 = await page.evaluate(() => ({ ring: LUMO.interactions.current && LUMO.interactions.current.label }));
  const m0 = await hook(page, 0.3);
  const m0n = await page.evaluate(() => LUMO.debug.bergen.nearest());
  check('Fehlversuch (zu früh losgelassen): nichts geborgen, Kiste treibt ein Stück weiter', g0.ring === 'Haken' && !m0.gefunden.includes('d1') && m0n.gap > 1, J({ g0, m0, m0n }));
  let okAll = true;
  for (const id of ['d1', 'd2', 'd3', 'd4', 'd5', 'd6']) {
    await page.evaluate((i) => LUMO.debug.bergen.goTo(i), id);
    await page.evaluate(() => LUMO.debug.advance(0.1));
    if (id === 'd2') { await page.evaluate(() => { LUMO.input.press('action'); for (let t = 0; t < 0.5; t += 0.05) LUMO.debug.advance(0.05); }); await view(page); await shot(page, '304_haken_leine'); await page.evaluate(() => { for (let t = 0; t < 0.8; t += 0.05) LUMO.debug.advance(0.05); LUMO.input.release('action'); LUMO.debug.advance(0.1); }); }
    else await hook(page, 1.3);
    const got = await page.evaluate((i) => LUMO.state.get('bergen.gefunden', []).includes(i), id);
    if (!got) { okAll = false; console.log('  nicht geborgen:', id, J(await page.evaluate(() => LUMO.debug.bergen.info()))); }
  }
  const p4 = await page.evaluate(() => ({ n: LUMO.state.get('bergen.gefunden').length, mat: LUMO.state.get('bergen.material'), hud: !document.querySelector('.kp-hud').classList.contains('is-off'), holz: document.querySelector('.kp-mat[data-mat="holz"] em').textContent, goal: LUMO.freeGoal().text }));
  await shot(page, '305_material_hud');
  check('6 treibende Kisten geborgen, Material im HUD (nur auf dem Boot), Ziel „Zur Werft: Laterne bauen“', okAll && p4.n === 6 && p4.hud && p4.holz === String(p4.mat.holz) && /Werft/.test(p4.goal), J(p4));

  // ---- 5 Nebelwand ohne Licht: sanft abdrehen, Glimm „Zu dicht. Licht?“ ----
  await page.evaluate(() => { LUMO.debug.kielpost.place(66, 158, 0); LUMO.debug.advance(0.1); });
  const f5 = await page.evaluate(() => {
    let minD = 1e9, glimm = '';
    for (let t = 0; t < 12; t += 0.05) {
      const b = LUMO.plugins.kielpost.boat;
      const want = Math.atan2(66 - b.x, 186 - b.z);
      LUMO.player.setIntent({ x: 0, y: 1, camYaw: want + Math.PI });
      LUMO.debug.advance(0.05);
      minD = Math.min(minD, Math.hypot(b.x - 66, b.z - 186));
      for (const g of document.querySelectorAll('.glimm-line')) if (/Zu dicht/.test(g.textContent)) glimm = g.textContent;
    }
    LUMO.player.setIntent(null);
    return { minD: +minD.toFixed(1), glimm, fog: LUMO.world.schaeren.fogActive };
  });
  await view(page);
  await shot(page, '306_nebelwand_ohne_licht');
  check('Nebelwand ohne Laterne: Boot kommt nicht zum Wrack, Glimm „Zu dicht. Licht?“', f5.minD > 12.5 && f5.fog && /Zu dicht/.test(f5.glimm), J(f5));

  // ---- 6 Pause → „Zurück zum Steg“ ----
  await page.evaluate(() => LUMO.ui.pauseMenu.open());
  await sleep(300);
  const hasBtn = await page.evaluate(() => !!document.querySelector('[data-go="steg"]'));
  if (hasBtn) await page.click('[data-go="steg"]');
  await page.evaluate(() => LUMO.debug.advance(0.3));
  const p6 = await page.evaluate(() => ({ state: LUMO.player.state, x: +LUMO.player.position.x.toFixed(1), z: +LUMO.player.position.z.toFixed(1), boat: LUMO.debug.kielpost.info() }));
  check('Pause → „Zurück zum Steg“: zu Fuß auf dem Steg, Boot am Liegeplatz', hasBtn && p6.state === 'ground' && Math.abs(p6.x - 5.4) < 0.3 && Math.abs(p6.boat.x - 2.4) < 0.1, J(p6));

  // ---- 7 Werft: Laterne bauen ----
  await page.evaluate(() => { LUMO.debug.teleport({ x: 15.5, z: 134.2 }, Math.PI); LUMO.debug.advance(0.4); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); LUMO.debug.advance(0.2); });
  const wl = await page.evaluate(() => LUMO.interactions.current && LUMO.interactions.current.label);
  await shot(page, '307_werft');
  await pressAction(page);
  await sleep(700);
  await frames(page, 3);
  const wOpen = await page.evaluate(() => ({ open: LUMO.ui.overlay.isOpen('werft'), cards: document.querySelectorAll('.wf-card').length, lat: !!document.querySelector('[data-build="laterne"]:not([disabled])'), segel: !!document.querySelector('[data-build="segel"]:not([disabled])') }));
  await shot(page, '308_werft_menue');
  if (wOpen.lat) await page.click('[data-build="laterne"]');
  await sleep(200);
  const p7 = await page.evaluate(() => ({ teile: LUMO.state.get('boot.teile'), mesh: LUMO.plugins.kielpost.boat.group.getObjectByName('kielpost-laterne').visible, mat: LUMO.state.get('bergen.material'), goal: LUMO.freeGoal().text }));
  await page.evaluate(() => LUMO.ui.overlay.closeAll());
  check('Werft: 3 Teile, Laterne baubar → gebaut, Mesh am Boot sichtbar, Ziel „Mit Licht in den Nebel“', wl === 'Werft' && wOpen.open && wOpen.cards === 3 && wOpen.lat && p7.teile.includes('laterne') && p7.mesh && /Nebel/.test(p7.goal), J({ wl, wOpen, p7 }));

  // ---- 8 Mit Licht durch den Nebel, Kiste an der Wrackbank ----
  await page.evaluate(() => { LUMO.debug.teleport({ x: 5.2, z: 146.2 }, -Math.PI / 2); LUMO.debug.advance(0.3); });
  await pressAction(page);
  await page.evaluate(() => LUMO.debug.advance(0.3));
  const onB = await page.evaluate(() => LUMO.player.state);
  await page.evaluate(() => { LUMO.debug.kielpost.place(66, 162, 0); LUMO.debug.advance(0.1); });
  await view(page);
  await shot(page, '309_nebel_mit_laterne');
  const f8 = await page.evaluate(() => {
    for (let t = 0; t < 6; t += 0.05) { const b = LUMO.plugins.kielpost.boat; LUMO.player.setIntent({ x: 0, y: 1, camYaw: Math.atan2(66 - b.x, 186 - b.z) + Math.PI }); LUMO.debug.advance(0.05); }
    LUMO.player.setIntent(null);
    return { open: LUMO.state.get('boot.nebel.wrackbank'), ...LUMO.debug.kielpost.info() };
  });
  await page.evaluate(() => LUMO.debug.advance(2.6));
  await view(page);
  await shot(page, '310_nebel_offen');
  await page.evaluate(() => LUMO.debug.bergen.goTo('w1'));
  await view(page);
  await shot(page, '311_wrackbank');
  const w1 = await hook(page, 1.3);
  check('Mit Laterne: Nebelwand löst sich auf, Kiste an der Wrackbank geborgen', onB === 'boot' && f8.open === true && !f8.fog && w1.gefunden.includes('w1'), J({ onB, f8, w1 }));

  // ---- 9 Am Steg anlegen und aussteigen ----
  await page.evaluate(() => { LUMO.debug.kielpost.place(2.4, 158, Math.PI); LUMO.debug.advance(0.1); });
  await drive(page, 0, 0, 0.5);
  await page.evaluate(() => { LUMO.debug.kielpost.place(2.4, 150, Math.PI); LUMO.debug.advance(0.2); });
  const aus = await page.evaluate(() => LUMO.interactions.current && LUMO.interactions.current.label);
  await pressAction(page);
  await page.evaluate(() => LUMO.debug.advance(0.3));
  const p9 = await page.evaluate(() => ({ state: LUMO.player.state, x: +LUMO.player.position.x.toFixed(1), y: +LUMO.player.position.y.toFixed(2) }));
  check('Am Steg: „Aussteigen“ → zu Fuß auf den Planken', aus === 'Aussteigen' && p9.state === 'ground' && p9.y > 1.2, J({ aus, ...p9 }));

  // ---- 10 Hartes Beenden auf dem Wasser → Neustart am Steg ----
  await pressAction(page);
  await page.evaluate(() => LUMO.debug.advance(0.3));
  await page.evaluate(() => { LUMO.debug.kielpost.place(-20, 200, 0); LUMO.debug.advance(0.3); LUMO.save.save(); });
  const before = await page.evaluate(() => ({ state: LUMO.player.state, n: LUMO.state.get('bergen.gefunden').length }));
  await page.close();
  const page2 = await context.newPage();
  page2.setDefaultTimeout(180000);
  const errors2 = [];
  page2.on('pageerror', (e) => errors2.push('pageerror: ' + (e && e.message ? e.message : e)));
  await page2.goto('file://' + DIST + `?test&q=${Q}&skipintro&autostart&debug`);
  await page2.waitForFunction(() => window.LUMO && LUMO.loop && LUMO.loop.frame > 1, null, { timeout: 180000 });
  await startGame(page2, { hour: 11 });
  await sleep(500);
  const p10 = await page2.evaluate(() => ({ state: LUMO.player.state, x: +LUMO.player.position.x.toFixed(1), z: +LUMO.player.position.z.toFixed(1), n: LUMO.state.get('bergen.gefunden').length, teile: LUMO.state.get('boot.teile'), fog: LUMO.world.schaeren.fogActive, boat: LUMO.debug.kielpost.info() }));
  await shot(page2, '312_neu_geladen_am_steg');
  check('Neu laden mitten auf dem Wasser: zu Fuß am Steg, Boot am Liegeplatz, Funde/Laterne/Nebel bleiben', before.state === 'boot' && p10.state === 'ground' && Math.abs(p10.x - 5.4) < 0.5 && Math.abs(p10.z - 145) < 0.5 && p10.n === 7 && p10.teile.includes('laterne') && !p10.fog && Math.abs(p10.boat.x - 2.4) < 0.1, J({ before, p10 }));

  const errs = [...errors, ...errors2].filter((e) => !/favicon|AudioContext/.test(e));
  check('Keine Seitenfehler', !errs.length, errs.slice(0, 3).join(' | '));
} catch (e) {
  console.error(e); failed = true;
} finally {
  await browser.close();
}
console.log(failed ? '✘ Kostprobe-Szenario mit Fehlern' : '✔ Kostprobe-Szenario grün');
process.exit(failed ? 1 : 0);

// Szenario Demo-Pfad Hafen (Browser, headless): Start → Ankunft (Ilda gibt den Blick) → Code BOJE → Möwen-Rennen, Kodex,
// Jolie (Dazusetzen, Splitter 1) → Farbwelle → Code DELFIN → Nachfragen, Funken tragen, Komplimente → Code OTTER →
// Brücke, Hafengrotte, Kodex-Zeile → Hafen ganz bunt, Signalfeuer brennen → Speichern und „Weiter“ in einem neuen Tab →
// graue Regionen: „Kommt bald“ ohne Absturz → Demo-/Lehrer-Code. Aufruf: node tests/scenarios/demo.mjs (Q=low|medium)
// Story (docs/STORY.md §6): die drei M0-Entscheidungen setzen flags.m0.*; die Beats (Nacht, Heft, Finale) werden per
// LUMO.debug.storyBeat abgespielt und zeigen die passende Verzweigung (Knoten-Protokoll über dialogue:node).
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
  await page.evaluate(() => { window.__nodes = []; LUMO.events.on('dialogue:node', (e) => window.__nodes.push(e.id + ':' + e.node)); });
  const visited = (id, node) => page.evaluate(([i, n]) => window.__nodes.includes(i + ':' + n), [id, node]);
  const playBeat = async (id, prefer, shotName) => {
    await page.evaluate((i) => LUMO.debug.storyBeat(i), id);
    await waitFor(page, sceneOpen, 15000);
    const ok = await playScene(page, prefer, { onChoices: shotName ? async () => { await frames(page, 3); await shot(page, shotName); } : null });
    return ok;
  };

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
  // Ziel-Zeile, Namensschilder entflechtet, sanfter Stupser nach 40 s ohne Annäherung
  await page.evaluate(() => { for (let i = 0; i < 10; i++) LUMO.debug.advance(0.1); });
  await frames(page, 2);
  const o0 = await page.evaluate(() => ({ obj: LUMO.debug.objective(), tags: LUMO.debug.tagOverlaps() }));
  check('Ziel-Zeile sichtbar: „Zur Kapitänin am Steg“', o0.obj.visible && o0.obj.dom && !o0.obj.dom.off && o0.obj.text === 'Zur Kapitänin am Steg', J(o0.obj));
  check('Namensschilder überlappen nicht (Hafen-Start)', o0.tags.shown >= 2 && o0.tags.pairs.length === 0, J(o0.tags));
  await page.evaluate(() => { LUMO.debug.teleport({ x: -10, z: 100 }, 0); LUMO.debug.advance(0.3); });
  await page.evaluate(() => { for (let i = 0; i < 44; i++) LUMO.debug.advance(1); });
  const o1 = await page.evaluate(() => LUMO.debug.objective());
  check('Stupser nach 40 s ohne Annäherung (Ziel-Zeile pulsiert, Marker leuchtet)', o1.nudges >= 1 && o1.dist > 20, J(o1));
  const il = await page.evaluate(() => { const n = LUMO.npcs.get('ilda'), p = n.group.position; return { d: +Math.hypot(p.x - 6, p.z - 130).toFixed(1), hold: !!(n.override && n.override.questHold) }; });
  check('Ilda wartet am Steg, solange die Ziel-Zeile dorthin zeigt (nicht laut Tagesablauf am Dorfplatz)', il.d < 5, J(il));
  await frames(page, 2);
  await shot(page, '200b_demo_ziel_stupser');
  await page.setViewportSize({ width: 820, height: 1180 });
  await page.evaluate(() => { LUMO.debug.teleport({ x: 6, z: 124 }, Math.atan2(4 - 6, 106 - 124)); LUMO.debug.advance(0.5); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); });
  await frames(page, 3);
  await shot(page, '200c_demo_hochformat');
  // Ziel hinter der Figur: die Kamera steht fast in der Lichtsäule – die darf dann nicht halb den Bildschirm füllen
  const beam = await page.evaluate(() => { const m = LUMO.quests.markers, g = m.group, c = LUMO.camera.position; return { cd: +Math.hypot(c.x - g.position.x, c.z - g.position.z).toFixed(2), vis: g.visible && g.children[0].visible, op: +g.children[0].material.opacity.toFixed(2) }; });
  check('Lichtsäule blendet aus, wenn die Kamera in ihr steht', !(beam.cd < 1.5 && beam.vis && beam.op > 0.05), J(beam));
  await page.setViewportSize(IPAD_LANDSCAPE);
  await frames(page, 2);

  // ---- 2 Ankunft: Ilda gibt den Blick ----
  await goAndAct(page, 'hafen.steg', sceneOpen);
  const d0 = await page.evaluate(() => ({ id: LUMO.dialogue.current && LUMO.dialogue.current.id, who: (document.querySelector('.bubble') || {}).dataset && document.querySelector('.bubble').dataset.who, cam: LUMO.cameraRig.mode }));
  check('Am Steg: Szene ankunft-ilda, Ilda spricht, Talk-Kamera', d0.id === 'ankunft-ilda' && d0.who === 'ilda' && d0.cam === 'talk', J(d0));
  await frames(page, 2);
  await shot(page, '201_demo_ilda');
  const ok1 = await playScene(page, ['Mehr oder weniger', 'Warum ist alles so grau']);
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
  const ok3 = await playScene(page, ['Dazusetzen', 'Ich hab Zeit', 'Wo gefunden', 'Versprochen'], { onChoices: async () => { await frames(page, 2); await shot(page, '203_demo_jolie'); } });
  const j1 = await page.evaluate(() => ({ jolie: LUMO.state.get('flags.m0.jolie'), deed: LUMO.state.get('deeds', []).includes('jolie-versprochen') }));
  check('Jolie: Kacheln mit „Dazusetzen“ (Zeichen), Szene bis zum Ende, Wahl 1 „Versprochen.“ → flags.m0.jolie', ok3 && playScene.seen.includes('Dazusetzen') && j1.jolie === 'versprochen' && j1.deed, J({ seen: playScene.seen, j1 }));
  await waitFor(page, () => LUMO.state.get('units.j1-e01') === 'fertig', 30000);
  await frames(page, 6);
  await shot(page, '204_demo_farbwelle');
  await waitFor(page, () => LUMO.world.veil.zoneValue('hafen') <= 0.31, 40000);
  const e1 = await page.evaluate(() => ({ shards: LUMO.state.get('shards', []), patches: LUMO.state.get('patches', []), splitter: LUMO.state.get('lichtsplitter'), veil: LUMO.world.veil.zoneValue('hafen'), bond: LUMO.npcs.bond('jolie'), fire: !!LUMO.state.get('signalfeuer.sf-hafen-platz') }));
  check('e01 fertig: Splitter 1, Aufnäher j1-e01, Lichtsplitter, Farbwelle → Schleier 0,3, Bindung Jolie, Signalfeuer Dorfplatz brennt', ok3 && e1.shards.includes(1) && e1.patches.includes('j1-e01') && e1.splitter >= 2 && e1.veil <= 0.31 && e1.bond >= 1 && e1.fire, J(e1));

  await waitFor(page, () => LUMO.debug.feel().shown >= 1, 20000).catch(() => null);
  const f1 = await page.evaluate(() => LUMO.debug.feel());
  check('Aufnäher-Moment für j1-e01 kommt nach der Szene (nichts wartet mehr)', f1.shown >= 1 && f1.pending === 0, J(f1));

  // ---- 3b Nacht am Feuer (m0-nach-e01): Uhr 22:30, Wahl 2 „Weiß ich nicht.“ → danach Morgen ----
  await page.evaluate(() => LUMO.debug.storyBeat('m0-nach-e01'));
  await waitFor(page, sceneOpen, 15000);
  const night = await page.evaluate(() => LUMO.time.getTimeOfDay());
  await page.evaluate(() => LUMO.debug.advance(0.3));
  // Stille Szene: keine Ziel-Säule über den Figuren, keine unbeteiligte Dorf-Figur direkt am Feuer
  const quiet = await page.evaluate(() => {
    const I = LUMO.npcs.get('ilda').position;
    const near = LUMO.npcs.list().filter((o) => o.id !== 'ilda' && !o.hidden && Math.hypot(o.position.x - I.x, o.position.z - I.z) < 10).map((o) => o.id);
    return { marker: LUMO.quests.markers.group.visible, near };
  });
  check('Nachtszene ruhig: keine Ziel-Säule, keine Zaungäste am Feuer', !quiet.marker && quiet.near.length === 0, J(quiet));
  const okN = await playScene(page, ['Dazusetzen', 'Kann sein', 'Schweigen', 'Weiß ich nicht'], { onChoices: async () => { await frames(page, 3); await shot(page, '204b_story_nacht'); } });
  await sleep(300);
  const n0 = await page.evaluate(() => ({ ilda: LUMO.state.get('flags.m0.ilda'), hour: LUMO.time.getTimeOfDay(), seen: !!LUMO.state.get('story.seen.m0-nach-e01') }));
  check('Nachtszene: 22:30 am Feuer, Wahl 2 „Weiß ich nicht.“ → flags.m0.ilda, danach Morgen', okN && night > 22 && night < 23 && n0.ilda === 'ausgewichen' && n0.hour > 7 && n0.hour < 9 && n0.seen, J({ night, n0 }));

  // ---- 4 Code DELFIN → j1-e02: Nachfragen, Funken, Komplimente ----
  const r2 = await scen(page, ['code delfin', 'expect state.units.j1-e02 == aktiv']);
  check('Code DELFIN öffnet und startet j1-e02', r2.ok, r2.steps.filter((s) => !s.ok).map((s) => s.step + ' · ' + s.info).join(' | '));
  await goAndAct(page, 'hafen.dorfplatz', sceneOpen);
  const ok4 = await playScene(page, ['Umdrehen', 'Was machst du gern', 'Und dann?']);
  await waitFor(page, () => LUMO.debug.questInfo().step === 'funken', 20000);
  const n1 = await page.evaluate(() => ({ faeden: LUMO.state.get('upgrades', []).includes('blick.faeden'), deed: LUMO.state.get('deeds', []).includes('tun-nachgefragt') }));
  const plakat = await page.evaluate(() => LUMO.state.get('flags.m0.plakat'));
  check('Nachfragen: Wahl 3 Plakat „Umdrehen.“, Akku-Lüge mit grünem Lämpchen, Faden-Stufe des Blicks, Tat im Log', ok4 && plakat === 'umgedreht' && n1.faeden && n1.deed && (await visited('e02-nachfragen', 'h2')), J({ n1, plakat }));
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

  // ---- 4b Morgen (m0-nach-e02): Jolies Heft – sie weiß, dass du dichtgehalten hast (Wahl 1 + 2) ----
  const okH = await playBeat('m0-nach-e02', ['Du hast mich gezeichnet', 'Was war da drauf'], '205a_story_heft');
  const hb = { b1: await visited('m0-nach-e02', 'b1'), g0: await visited('m0-nach-e02', 'g0'), h1: await visited('m0-nach-e02', 'h1') };
  check('Heft-Szene: Folge „dichtgehalten“ (b1), nicht „gesagt“ (g0), Plakat umgedreht → kein Jhemp-Bild (h1)', okH && hb.b1 && !hb.g0 && !hb.h1, J(hb));

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
  const kd = { d5: await visited('e03-kodex', 'd6'), d3: await visited('e03-kodex', 'd3') };
  check('e03-Kodex: Ilda merkt das Ausweichen (Blick, „Einer muss ja.“), kein Dank an Jolie', kd.d5 && !kd.d3, J(kd));
  check('e03 fertig: Kodex-Zeile, drei Aufnäher, Hafen ganz bunt (Schleier 0), vier Hafen-Feuer brennen, Spielstand gesichert (3 Einheiten)', ok6 && e3.zeile === 'stopp' && e3.patches.length === 3 && e3.veil <= 0.01 && e3.fires === 4 && e3.saved === 3, J(e3));
  await page.evaluate(() => { LUMO.debug.teleport({ x: 6, z: 128 }, Math.atan2(4 - 6, 106 - 128)); LUMO.debug.advance(0.5); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); });
  await frames(page, 4);
  await shot(page, '206_demo_hafen_bunt');

  // Aufnäher-Moment im Bild (CSS-Animation läuft in Echtzeit) und Aktion-Feedback
  // (Software-Renderer: ein Frame dauert länger als die 2,6-s-Animation – fürs Bild eine angehaltene Kopie im Höhepunkt)
  const f3 = await page.evaluate(() => {
    LUMO.debug.patchReveal('j1-e03');
    const r = { ...LUMO.debug.feel(), patches: (LUMO.state.get('patches', []) || []).length };
    const el = document.querySelector('.patch-reveal');
    if (el) { const c = el.cloneNode(true); c.id = 'pr-still'; c.style.animation = 'none'; c.style.transform = 'translate(-50%, -50%)'; el.parentNode.appendChild(c); }
    return r;
  });
  await frames(page, 2);
  await shot(page, '206b_demo_aufnaeher_moment');
  await page.evaluate(() => { const c = document.getElementById('pr-still'); if (c) c.remove(); });
  check('Aufnäher-Momente: je fertigem Auftrag einer, Abzeichen im Bild', f3.shown >= 4 && f3.reveal && f3.pending === 0, J(f3));

  // ---- 6 Namensschilder: klein und elegant, in Bildschirmgröße geklemmt (nah ≈ 32 px, fern ≈ 26 px Pille) ----
  const tagPx = async (d) => {
    await page.evaluate((d) => { const p = LUMO.npcs.get('ilda').group.position; LUMO.debug.teleport({ x: p.x + d, z: p.z }, Math.atan2(-d, 0)); LUMO.debug.advance(0.3); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); }, d);
    await frames(page, 2);
    return page.evaluate(() => {
      const s = LUMO.npcs.get('ilda').humanoid.group.children.find((c) => c.isSprite);
      const cam = LUMO.cameraRig.camera || LUMO.camera, H = LUMO.renderer ? LUMO.renderer.domElement.clientHeight : innerHeight;
      const fov = cam && cam.fov ? cam.fov : 50;
      // sizeAttenuation aus: Weltmaß bei 1 m Abstand → Bildschirm-Pixel der ganzen Canvas (Pille = 32/40 davon)
      // sichtbar = in Reichweite; ob es gerade einem näheren Schild ausweicht (Entflechten), ist hier egal
      const t = LUMO.npcs.get('ilda').tag;
      return { px: +(s.scale.y * H / (2 * Math.tan((fov * Math.PI / 180) / 2)) * 0.8).toFixed(1), vis: s.visible || !!(t && t.eligible) };
    });
  };
  const tNear = await tagPx(1.8);
  await shot(page, '207_demo_namensschild_nah');
  const tFar = await tagPx(12);
  check('Namensschild klein und elegant: Pille 24–34 px nah wie fern', tNear.vis && tFar.vis && tNear.px >= 24 && tNear.px <= 34 && tFar.px >= 24 && tFar.px <= 34, J({ near: tNear, far: tFar }));

  // ---- 6b Demo-Ende (m0-finale, nach den Bild-Prüfungen, weil die Szene Figuren umstellt): Mika an der Hafenmauer mit der Spitze zum umgedrehten Plakat, Ilda auf Nachfrage ----
  const okF = await playBeat('m0-finale', ['Warum packen', 'Und warum sprühst', 'Und wem hilft', 'Zeig mal', 'Was glitzert', 'Klar', 'Und dann?', 'Noch nicht'], '206b_story_mika');
  const fb = { e2: await visited('m0-finale', 'e2'), g1: await visited('m0-finale', 'g1'), l1: await visited('m0-finale', 'l1'), q: await visited('m0-finale', 'q') };
  check('Demo-Ende: Mika zitiert das umgedrehte Plakat (e2), Mikas Riss „… Mir.“ (g1), „Und dann?“ → Ildas Plan (l1), Entwurf „Noch nicht.“ bis zum Schluss', okF && fb.e2 && fb.g1 && fb.l1 && fb.q, J(fb));

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

  // ---- 10 Neu anfangen: Einstellungen → fragen → löschen (ohne ?debug-Kasten) ----
  await page2.evaluate(() => { LUMO.ui.overlay.closeAll && LUMO.ui.overlay.closeAll(); LUMO.ui.pauseMenu.open('einstellungen'); });
  await sleep(500);
  await page2.click('[data-reset-ask]');
  await sleep(200);
  const askShown = await page2.evaluate(() => !!document.querySelector('[data-reset-yes]') && !!document.querySelector('[data-reset-no]'));
  await shot(page2, '208_demo_neu_anfangen');
  await page2.click('[data-reset-no]');
  await sleep(200);
  const keptAfterNo = await page2.evaluate(() => LUMO.state.get('units.j1-e03') === 'fertig' && !!document.querySelector('[data-reset-ask]'));
  await page2.evaluate(() => localStorage.setItem('lumo.save.7', localStorage.getItem('lumo.save.' + LUMO.save.current)));   // Spielstand einer anderen Person
  await page2.click('[data-reset-ask]');
  await sleep(150);
  await page2.click('[data-reset-yes]');
  await sleep(300);
  const rs = await page2.evaluate(() => { const k = []; for (let i = 0; i < localStorage.length; i++) k.push(localStorage.key(i)); return { e03: LUMO.state.get('units.j1-e03') || null, patches: (LUMO.state.get('patches', []) || []).length, other: !!localStorage.getItem('lumo.save.7'), keys: k.filter((x) => x.startsWith('lumo.') && !x.startsWith('lumo.device')) }; });
  check('Neu anfangen: erst Nachfrage, „Lieber nicht“ behält alles, „Ja“ setzt nur den eigenen Spielstand zurück', askShown && keptAfterNo && rs.e03 !== 'fertig' && rs.patches === 0 && rs.other, J({ askShown, keptAfterNo, rs }));

  const allErrors = errors.concat(errors2).filter((e) => !/favicon|AudioContext|WebGL|ResizeObserver/.test(e));
  check('Keine Seitenfehler', allErrors.length === 0, allErrors.slice(0, 3).join(' | '));
} catch (e) {
  check('Szenario ohne Ausnahme', false, String(e && e.stack ? e.stack.split('\n').slice(0, 3).join(' ') : e));
} finally {
  await browser.close();
}
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} Prüfungen ok`);
process.exit(failed ? 1 : 0);

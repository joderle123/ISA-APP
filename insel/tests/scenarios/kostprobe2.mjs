// Szenario Kostprobe Teil 2: Mission QUELLE „Leck im Nest“ (j1-e04, BAUPLAN §2.1 C, §2.3 Punkt 2 zweiter und dritter
// Spiegelstrich, Punkt 7). Nach OTTER: Code QUELLE → Leck stopfen (2 Planken tragen, Kiste mit dem Haken, zu früh
// loslassen = treibt weiter, Diele → Logbuchseite 2) → Ilda gibt den Blick „Gläser“ → Tun (Unter der Oberfläche) →
// Spuren im Nest (Falle Hängematte: „Danke. Trotzdem.“) → Blitz-Motor (Plan, Bau, Riss) → vor der Crew die Winde
// würdigen (erst die Falle, dann richtig) → Fotowand bauen + Bild → Wasserwerk → Jolie (Leine halten) → Dachboden-Ecke +
// Jolie wählt die Route → Crew-Glas am Feuer (Abstimmung) → Aufnäher, Lichtsplitter, Farbwelle, beide Bauplätze gebaut.
// Dazu: neu laden mitten in der Mission (Start am letzten fertigen Schritt, halbe Planken bleiben) und die Kurzfassung auf
// frischem Spielstand (Blick-Stufe + Aufnäher). Auch nach HERZGLAS-99 öffnet QUELLE die volle Mission.
// Aufruf: SHOTS=…/shots/k2 flock /tmp/lumo-chrome.lock node tests/scenarios/kostprobe2.mjs   (Screenshots 500_…)
import { launch, openGame, startGame, frames, shot as rawShot, runScenario, pickChoice } from '../lib.mjs';

const Q = process.env.Q || 'low';
let failed = false;
function check(name, ok, info = '') { console.log(ok ? '✔' : '✘', name, info); if (!ok) failed = true; }
const J = (o) => JSON.stringify(o);
// Screenshot erst, wenn Einblendungen (Overlay, Tafeln, Kacheln) fertig sind
const shot = async (page, name) => { await new Promise((r) => setTimeout(r, 550)); await frames(page, 2); return rawShot(page, name); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pressAction = (page) => page.evaluate(() => { LUMO.input.press('action'); LUMO.debug.advance(1 / 30); LUMO.input.release('action'); LUMO.debug.advance(0.3); });
const adv = (page, s) => page.evaluate((s) => { for (let t = 0; t < s; t += 0.1) LUMO.debug.advance(0.1); }, s);
const info = (page) => page.evaluate(() => ({ q: LUMO.debug.questInfo(), m: LUMO.debug.quelle.info() }));

// Szene durchspielen: Wahlen nach Reihenfolge (erste passende aus prefer, einmal benutzte fallen weg), Minispiele automatisch
async function playScene(page, prefer = [], { timeout = 90000, onChoices = null } = {}) {
  const t0 = Date.now();
  const left = prefer.slice();
  let guard = 0;
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
      if (onChoices) await onChoices(st.choices);
      let k = left.findIndex((p) => st.choices.some((l) => l.startsWith(p)));
      let idx = 0;
      if (k >= 0) { idx = st.choices.findIndex((l) => l.startsWith(left[k])); left.splice(k, 1); }
      await pickChoice(page, idx);
      await sleep(300);
      continue;
    }
    if (st.bubble) { await pressAction(page); await sleep(200); continue; }
    if (++guard > 400) break;
    await page.evaluate(() => LUMO.debug.advance(0.5));
    await sleep(100);
  }
  return false;
}
// Zum Ort gehen und den wartenden Schritt anstoßen (Szene „Reden“ / Minispiel „Start“)
async function goAndAct(page, site, cond, ms = 20000) {
  await runScenario(page, [`site ${site}`, 'wait 0.6']);
  await frames(page, 2);
  const t0 = Date.now();
  for (let i = 0; ; i++) {
    if (await page.evaluate(cond)) return true;
    if (Date.now() - t0 > ms) {
      const d = await page.evaluate(() => ({ cur: LUMO.interactions.current && LUMO.interactions.current.label, ov: LUMO.ui.overlay.count, dlg: LUMO.dialogue.isOpen, step: LUMO.debug.questInfo().step }));
      throw new Error(`goAndAct ${site}: ${J(d)}`);
    }
    if (i % 3 === 0) await pressAction(page);
    await page.evaluate(() => LUMO.debug.advance(0.4));
    await sleep(120);
  }
}
const sceneOpen = () => !!(LUMO.dialogue && LUMO.dialogue.isOpen);
// Ins Nest: vor die Tür, Aktion „Nest“
async function enterNest(page) {
  await page.evaluate(() => { const d = LUMO.nest.outside.door; LUMO.debug.teleport({ x: d.x - 0.4, z: d.z - 0.9 }, Math.atan2(0.4, 0.9)); LUMO.debug.advance(0.3); });
  for (let i = 0; i < 10 && !(await page.evaluate(() => LUMO.nest.isInside)); i++) { await pressAction(page); await sleep(250); }
  await page.waitForFunction(() => LUMO.nest.isInside, null, { timeout: 20000 });
  await adv(page, 1.2);
}
async function exitNest(page) { await page.evaluate(() => LUMO.nest.exit()); await page.waitForFunction(() => !LUMO.scenes.isInterior, null, { timeout: 20000 }); await adv(page, 0.8); }
// Im Nest an einen Ort (lokal) stellen und die Interaktion mit diesem Label auslösen
async function actAt(page, local, label) {
  const cur = await page.evaluate(([l]) => { const p = LUMO.scenes.pocket; LUMO.debug.teleport({ x: p.x + l[0], z: p.z + l[2] }, 0); LUMO.debug.advance(0.3); return LUMO.interactions.current && LUMO.interactions.current.label; }, [local]);
  if (label && cur !== label) return { ok: false, cur };
  await pressAction(page);
  return { ok: true, cur };
}
// Planke zum Leck bringen: hingehen liefert ab (wie die Vorlage 'tragen')
const bringTo = (page) => page.evaluate(() => { const p = LUMO.scenes.pocket; const before = LUMO.debug.quelle.info().planken; LUMO.debug.teleport({ x: p.x - 3.0, z: p.z + 2.3 }, Math.PI); LUMO.debug.advance(0.4); return { ok: LUMO.debug.quelle.info().planken === before + 1 && !LUMO.player.carrying }; });
const nestView = (page, eye, look) => page.evaluate(([e, l]) => { const p = LUMO.scenes.pocket; LUMO.debug.setShot({ x: p.x + e[0], y: p.y + e[1], z: p.z + e[2] }, { x: p.x + l[0], y: p.y + l[1], z: p.z + l[2] }); LUMO.debug.advance(0.2); }, [eye, look]);
const freeView = (page) => page.evaluate(() => { LUMO.debug.setShot(null, null); LUMO.debug.advance(0.1); });
const dismissBubbles = async (page) => { for (let i = 0; i < 6 && (await page.evaluate(() => !!document.querySelector('.bubble:not(.is-out)'))); i++) { await pressAction(page); await sleep(150); } };

const browser = await launch();
try {
  // =============== Teil A: volle Mission nach OTTER ===============
  const { page, errors } = await openGame(browser, { query: `q=${Q}&skipintro&autostart&debug` });
  await startGame(page, { hour: 11 });
  const p0 = await page.evaluate(() => ({ failed: LUMO.plugins.failed.map((f) => f.id), has: LUMO.plugins.list.includes('quelle'), quest: !!LUMO.content.get('quests', 'j1-e04') }));
  check('Plugin quelle da, Quest j1-e04 geladen', p0.has && p0.quest && !p0.failed.length, J(p0));
  // „nach OTTER“: die drei Hafen-Einheiten fertig, Kielpost gehoben
  await page.evaluate(() => { for (const u of ['j1-e01', 'j1-e02', 'j1-e03']) LUMO.state.set('units.' + u, 'fertig'); LUMO.state.set('flags.boot.da', true); LUMO.debug.advance(0.3); });
  const relapse = [];
  await page.evaluate(() => { window.__veil = []; LUMO.events.on('veil:relapse:start', (e) => window.__veil.push(['rueckfall', e.id])); LUMO.events.on('veil:restore:start', (e) => window.__veil.push(['welle', e.id, e.to])); });
  const r1 = await runScenario(page, ['code quelle', 'wait 1', 'expect state.units.j1-e04 == aktiv']);
  const q1 = await page.evaluate(() => ({ q: LUMO.debug.questInfo(), obj: LUMO.debug.objective(), veil: window.__veil.slice(), up: LUMO.state.get('upgrades', []) }));
  check('Code QUELLE nach OTTER: Mission aktiv, Schritt „Wasser im Nest“, Nest wird grau, Blick-Stufe noch nicht da', r1.ok && q1.q.step === 'leck' && /Wasser im Nest/.test((q1.obj.text || "")) && q1.veil.some((v) => v[0] === 'rueckfall' && v[1] === 'nest') && !q1.up.includes('blick.tanks'), J({ r1: r1.ok, q1 }));
  await page.evaluate(() => { const d = LUMO.nest.outside.door; LUMO.debug.teleport({ x: d.x + 4, z: d.z - 4 }, Math.atan2(-4, 4)); LUMO.debug.advance(0.3); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); LUMO.debug.advance(0.8); });
  await shot(page, '500_quelle_nest_grau');

  // ---- 1 Leck stopfen ----
  await enterNest(page);
  const i1 = await info(page);
  await nestView(page, [0.5, 4.6, 5.2], [-2.2, 0.6, -0.5]);
  await shot(page, '501_nest_wasser');
  await freeView(page);
  check('Im Nest: Wasser steht, Planken an der Werkbank, „Planke nehmen“', i1.m.water && i1.m.planken === 0 && i1.m.inside, J(i1));
  const t1 = await actAt(page, [-1.9, 0, -4.0], 'Planke nehmen');
  const c1 = await page.evaluate(() => LUMO.player.carrying && LUMO.player.carrying.id);
  await page.evaluate(() => { LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); LUMO.debug.advance(0.3); });
  await shot(page, '502_planke_tragen');
  const s1 = await bringTo(page);
  const t2 = await actAt(page, [-1.9, 0, -4.0], 'Planke nehmen');
  const s2 = await bringTo(page);
  const i2 = await info(page);
  check('Zwei Planken getragen und ins Leck gestopft (Tragen), dann treibt eine Kiste', t1.ok && c1 === 'planke' && s1.ok && t2.ok && s2.ok && i2.m.planken === 2 && i2.m.hook === 'treibt', J({ t1, c1, s1, t2, s2, i2: i2.m }));
  const h0 = await page.evaluate(() => { const p = LUMO.scenes.pocket; LUMO.debug.teleport({ x: p.x - 3.0, z: p.z + 1.9 }, 0); LUMO.debug.advance(0.3); const lbl = LUMO.interactions.current && LUMO.interactions.current.label; const r = LUMO.debug.quelle.haken(0.4); return { lbl, kiste: r.kiste, hook: r.hook }; });
  await nestView(page, [0.2, 3.6, 5.4], [-3.1, 0.3, 3.0]);
  await shot(page, '503_haken_kiste');
  await freeView(page);
  const mat0 = await page.evaluate(() => ({ ...(LUMO.state.get('bergen.material') || {}) }));
  const h1 = await page.evaluate(() => LUMO.debug.quelle.haken(1.3));
  const mat1 = await page.evaluate(() => ({ ...(LUMO.state.get('bergen.material') || {}) }));
  check('Haken: zu früh losgelassen → Kiste treibt weiter; gehalten → Kiste geborgen (Metall 2, Holz 2, Tau 1)', h0.lbl === 'Haken' && !h0.kiste && h0.hook === 'treibt' && h1.kiste && (mat1.metall || 0) - (mat0.metall || 0) === 2 && (mat1.holz || 0) - (mat0.holz || 0) === 2, J({ h0, h1: h1.kiste, mat0, mat1 }));
  const d1 = await actAt(page, [2.4, 0, 0.3], 'Diele heben');
  await page.waitForFunction(() => LUMO.ui.overlay.isOpen('e04-logbuch'), null, { timeout: 5000 });
  const lb = await page.evaluate(() => document.querySelector('[data-overlay="e04-logbuch"]').textContent);
  await shot(page, '504_logbuchseite_2');
  await page.click('[data-overlay="e04-logbuch"] [data-q4="ok"]');
  await adv(page, 0.6);
  const i3 = await info(page);
  check('Diele → Logbuchseite 2 „Jhemp hat drei Nächte nicht geschlafen.“ (Chronik) → nächster Schritt Ilda', d1.ok && /drei Nächte nicht geschlafen/.test(lb) && i3.m.logbuch.includes(2) && i3.m.leck && i3.q.step === 'blick' && !i3.m.water, J({ d1, i3 }));

  // ---- 2 Ilda gibt den Blick „Gläser“ ----
  await exitNest(page);
  await goAndAct(page, 'hafen.steg', sceneOpen);
  let ildaPanel = null;
  const okIlda = await playScene(page, ['Das kleine'], { onChoices: async () => { if (!ildaPanel) { ildaPanel = await page.evaluate(() => { const p = document.querySelector('.q4-panel'); return p ? { svgs: p.querySelectorAll('svg').length, txt: p.textContent } : null; }); await shot(page, '505_ilda_zwei_glaeser'); } } });
  const i4 = await page.evaluate(() => ({ up: LUMO.state.get('upgrades', []), step: LUMO.debug.questInfo().step }));
  check('Ilda: zwei Laternengläser (Bild), „Welches fehlt mehr?“ → Blick-Stufe Gläser', okIlda && ildaPanel && ildaPanel.svgs === 2 && i4.up.includes('blick.tanks') && i4.step === 'tun', J({ ildaPanel, i4 }));

  // ---- 3 Tun: Unter der Oberfläche (gekränkt), danach seine Dosen ----
  await goAndAct(page, 'hafen.nest', sceneOpen);
  const okTun = await playScene(page, ['Was ist', 'Genau hinsehen']);
  await adv(page, 1.2);
  await page.evaluate(() => { const n = LUMO.npcs.get('tun'); const p = n.position; LUMO.debug.teleport({ x: p.x + 2.2, z: p.z + 2.2 }, Math.atan2(-2.2, -2.2)); LUMO.debug.advance(0.3); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); LUMO.debug.advance(0.3); });
  const i5 = await page.evaluate(() => ({ step: LUMO.debug.questInfo().step, deed: (LUMO.state.get('deeds', []) || []).includes('tun-gekraenkt-gesehen'), glas: LUMO.debug.blickGlas(), gross: [...document.querySelectorAll('.gf-col.is-gross')].map((e) => e.dataset.need), medal: LUMO.state.get('medals.e04-oberflaeche-tun') }));
  await shot(page, '506_tun_dosen');
  check('Tun: Oberfläche geschafft (gekränkt), danach Tuns Blechdosen, größte Lücke leuchtet', okTun && i5.deed && i5.step === 'spuren' && i5.glas && i5.glas.npc === 'tun' && i5.gross.join() === 'anerkennung', J(i5));

  // ---- 4 Spuren im Nest, Falle Hängematte ----
  await enterNest(page);
  const hm = await page.evaluate(() => { const a = LUMO.nest.SPOTS.haengematte.act, p = LUMO.scenes.pocket; LUMO.debug.teleport({ x: p.x + a[0], z: p.z + a[2] + 0.3 }, Math.PI); LUMO.debug.advance(0.3); return LUMO.interactions.current && LUMO.interactions.current.label; });
  await pressAction(page);
  await page.waitForFunction(() => LUMO.ui.overlay.isOpen('e04-spur'), null, { timeout: 5000 });
  const sp = await page.evaluate(() => ({ ves: !!document.querySelector('[data-overlay="e04-spur"] .q4-ves svg'), need: (document.querySelector('[data-overlay="e04-spur"] .q4-need') || {}).textContent, btn: [...document.querySelectorAll('[data-overlay="e04-spur"] [data-q4]')].map((b) => b.textContent.trim()) }));
  await shot(page, '507_spur_haengematte');
  const schlaf0 = await page.evaluate(() => LUMO.nest.glaeser.get('tun', 'schlaf').voll);
  await page.click('[data-overlay="e04-spur"] [data-q4="flicken"]');
  await page.waitForFunction(() => !!document.querySelector('.bubble:not(.is-out)'), null, { timeout: 5000 });
  const bub = await page.evaluate(() => document.querySelector('.bubble:not(.is-out)').textContent);
  await dismissBubbles(page);
  const f1 = await page.evaluate(() => ({ schlaf: LUMO.nest.glaeser.get('tun', 'schlaf').voll, luecke: LUMO.nest.glaeser.luecke('tun'), folge: LUMO.nest.glaeser.folge('tun') }));
  check('Falle Hängematte: Karte mit kleiner Dose „Schlaf“, Flicken füllt sie, Tun: „Danke. Trotzdem.“, größte Lücke bleibt', hm === 'Hängematte' && sp.ves && sp.need === 'Schlaf' && sp.btn.some((b) => /Flicken/.test(b)) && f1.schlaf > schlaf0 && /Danke\. Trotzdem\./.test(bub) && f1.luecke === 'anerkennung' && f1.folge, J({ hm, sp, schlaf0, f1, bub }));
  await page.evaluate(() => { LUMO.debug.quelle.spur('winde'); });   // Karte bleibt offen (nicht auf das Schließen warten)
  await page.waitForFunction(() => LUMO.ui.overlay.isOpen('e04-spur'), null, { timeout: 5000 });
  await page.waitForFunction(() => { const l = [...document.querySelectorAll('[data-overlay="e04-spur"] .q4-need')].pop(); return l && l.textContent !== 'Schlaf'; }, null, { timeout: 5000 });
  const spw = await page.evaluate(() => ([...document.querySelectorAll('[data-overlay="e04-spur"] .q4-need')].pop() || {}).textContent);
  await shot(page, '508_spur_winde');
  await page.evaluate(() => [...document.querySelectorAll('[data-overlay="e04-spur"] [data-q4="ok"]')].pop().click());
  await adv(page, 0.5);
  const li = await actAt(page, [-2.3, 0, 4.5], 'Crew-Liste');
  await page.waitForFunction(() => LUMO.ui.overlay.isOpen('e04-spur'), null, { timeout: 5000 });
  await page.evaluate(() => [...document.querySelectorAll('[data-overlay="e04-spur"] [data-q4="ok"]')].pop().click());
  await adv(page, 0.6);
  const i6 = await info(page);
  check('Spuren: Winde (Anerkennung), Crew-Liste (Dazugehören) → Schritt „Tun will einen Motor“', spw === 'Anerkennung' && li.ok && i6.m.spuren.length === 3 && i6.q.step === 'motor', J({ spw, li, i6 }));

  // ---- 5 Blitz-Motor: Plan, Bau (man darf), Riss ----
  await exitNest(page);
  await goAndAct(page, 'hafen.nest', sceneOpen);
  const okM = await playScene(page, ['Okay']);
  await adv(page, 0.6);
  const bm = await page.evaluate(() => { const ok = LUMO.debug.werft.build('blitzmotor'); LUMO.debug.advance(0.3); return { ok, plan: LUMO.state.get('flags.boot.plan.blitzmotor'), riss: LUMO.nest.riss(), a: LUMO.nest.glaeser.get('tun', 'anerkennung'), motor: LUMO.debug.quelle.info().motor, step: LUMO.debug.questInfo().step }; });
  check('Blitz-Motor: Tun gibt den Plan, Bau mit dem Treibgut geht, Glas voll mit Riss (Szene „vor der Crew“ wartet am Dorfplatz)', okM && !(await page.evaluate(() => LUMO.dialogue.isOpen)) && bm.plan && bm.ok && bm.riss && bm.riss.phase === 'leckt' && bm.a.riss && bm.motor && bm.step === 'winde', J(bm));

  // ---- 6 Vor der Crew (Dorfplatz): erst die Falle, dann die Winde ----
  await page.evaluate(() => { window.__nodes = []; LUMO.events.on('dialogue:node', (e) => window.__nodes.push(e.id + ':' + e.node)); });
  await goAndAct(page, 'hafen.dorfplatz', sceneOpen);
  const okW = await playScene(page, ['Du brauchst', 'Tun hat die Winde']);
  const said = await page.evaluate(() => window.__nodes.slice());
  const i7 = await page.evaluate(() => ({ step: LUMO.debug.questInfo().step, offen: LUMO.nest.slots.state('fotowand'), deed: (LUMO.state.get('deeds', []) || []).includes('tun-winde-gewuerdigt') }));
  check('Crew: „Du brauchst mehr Schlaf“ → „Danke. Trotzdem.“, Winde würdigen → Fotowand-Bauplatz offen', okW && said.includes('e04-winde:s') && said.includes('e04-winde:w') && said.indexOf('e04-winde:s') < said.indexOf('e04-winde:w') && i7.deed && i7.offen === 'offen' && i7.step === 'fotowand', J({ i7, said: said.slice(-2) }));

  // ---- 7 Fotowand bauen, Tuns Bild ----
  await enterNest(page);
  const b1 = await actAt(page, [-5.3, 0, -0.4], 'Bauen');
  await adv(page, 0.5);
  const b2 = await actAt(page, [-5.3, 0, -0.4], 'Bild aufhängen');
  await page.waitForFunction(() => !!document.querySelector('.bubble:not(.is-out)'), null, { timeout: 5000 });
  await dismissBubbles(page);
  await adv(page, 0.5);
  await nestView(page, [-1.2, 3.2, 1.5], [-6.5, 1.6, -0.6]);
  await shot(page, '509_fotowand_bild');
  await freeView(page);
  const i8 = await page.evaluate(() => ({ step: LUMO.debug.questInfo().step, slot: LUMO.nest.slots.state('fotowand'), bilder: LUMO.nest.fotowand.bilder(), emo: LUMO.npcs.emotion('tun') }));
  check('Fotowand gebaut, Tuns Bild hängt, Tun bekommt Farbe → Wasserwerk', b1.ok && b2.ok && i8.slot === 'gebaut' && i8.bilder.includes('tun') && i8.step === 'wasserwerk', J({ b1, b2, i8: { ...i8, emo: i8.emo && i8.emo.primary } }));

  // ---- 8 Wasserwerk (e04-tank-leitungen) ----
  await exitNest(page);
  await goAndAct(page, 'hafen.nest', () => !!document.querySelector('[data-overlay="minigame"]'));
  for (let i = 0; i < 20 && (await page.evaluate(() => LUMO.debug.questInfo().step === 'wasserwerk')); i++) {
    if (await page.evaluate(() => !!document.querySelector('[data-overlay="minigame"]'))) await page.evaluate(() => LUMO.debug.mgAuto('gold'));
    await sleep(300);
  }
  await adv(page, 0.5);
  const i9 = await page.evaluate(() => LUMO.debug.questInfo().step);
  check('Wasserwerk (Tank-Leitungen) geschafft → Jolie', i9 === 'jolie', J(i9));

  // ---- 9 Jolie: Leine halten, eigene Ecke ----
  await goAndAct(page, 'hafen.nest', sceneOpen);
  const okJ = await playScene(page, ['Dableiben', 'Willst du']);
  const i10 = await page.evaluate(() => ({ step: LUMO.debug.questInfo().step, slot: LUMO.nest.slots.state('dachboden'), medal: LUMO.state.get('medals.e04-leine-jolie') }));
  check('Jolie: Leine halten geschafft, Dachboden-Ecke offen', okJ && i10.slot === 'offen' && i10.step === 'dachboden', J(i10));

  // ---- 10 Dachboden-Ecke bauen, Jolie wählt die Route ----
  await enterNest(page);
  const db = await actAt(page, [3.3, 0, -1.9], 'Bauen');
  await adv(page, 0.5);
  const mb0 = await page.evaluate(() => LUMO.nest.glaeser.get('jolie', 'mitbestimmen').voll);
  const rt = await actAt(page, [2.4, 0, 3.6], 'Route wählen');
  await page.waitForFunction(() => LUMO.ui.overlay.isOpen('e04-karte'), null, { timeout: 5000 });
  await shot(page, '510_karte_wer_waehlt');
  await page.click('[data-overlay="e04-karte"] [data-q4="ich"]');
  await page.waitForFunction(() => !!document.querySelector('.bubble:not(.is-out)'), null, { timeout: 5000 });
  const ich = await page.evaluate(() => ({ bub: document.querySelector('.bubble:not(.is-out)').textContent, route: LUMO.nest.route.get(), done: LUMO.debug.quelle.info().dachboden }));
  await dismissBubbles(page);
  await actAt(page, [2.4, 0, 3.6], 'Route wählen');
  await page.waitForFunction(() => LUMO.ui.overlay.isOpen('e04-karte'), null, { timeout: 5000 });
  await page.click('[data-overlay="e04-karte"] [data-q4="jolie"]');
  await page.waitForFunction(() => !!document.querySelector('.bubble:not(.is-out)'), null, { timeout: 5000 });
  await dismissBubbles(page);
  await adv(page, 0.5);
  const mb1 = await page.evaluate(() => LUMO.nest.glaeser.get('jolie', 'mitbestimmen').voll);
  await nestView(page, [0.6, 4.4, 4.8], [3.2, 1.2, -0.8]);
  await shot(page, '511_dachboden_route');
  await freeView(page);
  const i11 = await page.evaluate(() => ({ step: LUMO.debug.questInfo().step, slot: LUMO.nest.slots.state('dachboden'), route: LUMO.nest.route.get(), karte: LUMO.debug.nest.info().parts.karte }));
  check('Dachboden-Ecke gebaut; „Ich wähle.“ → „Klar. Wie immer.“ (nichts ändert sich); „Jolie wählt.“ → Route auf der Karte, Glas steigt ein Stück', db.ok && rt.ok && /Wie immer/.test(ich.bub) && !ich.route && !ich.done && i11.slot === 'gebaut' && i11.route === 'lagune' && i11.karte.route === 'lagune' && mb1 > mb0 && mb1 < 1 && i11.step === 'crewglas', J({ db, rt, ich, mb0, mb1, i11 }));

  // ---- 11 Crew-Glas am Feuer ----
  await exitNest(page);
  const before = await page.evaluate(() => ({ ls: LUMO.state.get('lichtsplitter', 0), patches: (LUMO.state.get('patches', []) || []).slice() }));
  await goAndAct(page, 'hafen.feuerPlatz', sceneOpen);
  let crewPanel = null, snapA = null, snapB = null, crewPanel2 = null;
  const snap = () => page.evaluate(() => JSON.stringify(LUMO.state.snapshot()));
  const okC = await playScene(page, ['Andere', 'Schlaf', 'Schlafraum'], { onChoices: async (ch) => {
    if (ch.some((c) => c.startsWith('Bewegung')) && !crewPanel) { crewPanel = await page.evaluate(() => document.querySelectorAll('.q4-panel .q4-shell').length); snapA = await snap(); await shot(page, '512_crewglas'); }
    if (ch.some((c) => c.startsWith('Ausguck')) && !snapB) { snapB = await snap(); crewPanel2 = await page.evaluate(() => document.querySelectorAll('.q4-panel .q4-shell').length); }
  } });
  await adv(page, 4);
  const shells = !(snapA && snapA === snapB) || crewPanel2 !== 4;
  const fin = await page.evaluate(() => ({ unit: LUMO.state.get('units.j1-e04'), patches: LUMO.state.get('patches', []), ls: LUMO.state.get('lichtsplitter', 0), raum: LUMO.state.get('flags.nest.naechsterRaum'), slots: LUMO.nest.slots.list().map((s) => s.id + ':' + s.state), veil: window.__veil.slice(), nestVeil: LUMO.state.get('veil.patches.nest') }));
  await page.evaluate(() => { const d = LUMO.nest.outside.door; LUMO.debug.teleport({ x: d.x + 4, z: d.z - 4 }, Math.atan2(-4, 4)); LUMO.debug.advance(0.3); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); LUMO.debug.advance(1); });
  await shot(page, '513_quelle_fertig_farbe');
  check('Crew-Glas: drei Muscheln ohne Namen + deine, eigene Muschel nicht gespeichert, Abstimmung gespeichert', okC && crewPanel === 3 && !shells && fin.raum === 'schlafraum', J({ crewPanel, shells, raum: fin.raum }));
  check('QUELLE fertig: Aufnäher, Lichtsplitter, Farbwelle am Nest, Fotowand und Dachboden-Ecke gebaut', fin.unit === 'fertig' && fin.patches.includes('j1-e04') && fin.ls >= before.ls + 3 && fin.veil.some((v) => v[0] === 'welle' && v[1] === 'nest' && v[2] === 0) && fin.slots.join() === 'fotowand:gebaut,dachboden:gebaut', J({ fin, before }));
  const errs = errors.filter((e) => !/favicon|AudioContext/.test(e));
  check('Keine Fehler in der Konsole (Teil A)', !errs.length, errs.slice(0, 3).join(' | '));

  // =============== Teil B: neu laden mitten in der Mission (HERZGLAS-99, dann QUELLE) ===============
  const B = await openGame(browser, { query: `q=${Q}&skipintro&autostart&debug` });
  await startGame(B.page, { hour: 11 });
  const rb = await runScenario(B.page, ['code herzglas-99', 'wait 0.5', 'expect state.units.j1-e04 == kurz', 'code quelle', 'wait 1', 'expect state.units.j1-e04 == aktiv']);
  await enterNest(B.page);
  await actAt(B.page, [-1.9, 0, -4.0], 'Planke nehmen');
  await bringTo(B.page);
  const halb = await info(B.page);
  await B.page.evaluate(() => LUMO.save.save());
  await B.page.reload();
  await B.page.waitForFunction(() => window.LUMO && LUMO.loop && LUMO.loop.frame > 1, null, { timeout: 180000 });
  await startGame(B.page, { hour: 11 });
  await adv(B.page, 1);
  const rl1 = await info(B.page);
  check('HERZGLAS-99, dann QUELLE: volle Mission; neu laden mitten im Leck → wieder bei „leck“, eine Planke bleibt, draußen', rb.ok && halb.m.planken === 1 && rl1.q.active === 'j1-e04' && rl1.q.step === 'leck' && rl1.m.planken === 1 && !rl1.m.inside, J({ rb: rb.ok, halb: halb.m.planken, rl1 }));
  // Leck fertig machen, Ilda (Schritt fertig), neu laden → weiter bei Tun
  await enterNest(B.page);
  await actAt(B.page, [-1.9, 0, -4.0], 'Planke nehmen');
  await bringTo(B.page);
  await B.page.evaluate(() => LUMO.debug.quelle.haken(1.3));
  await B.page.evaluate(() => { LUMO.debug.quelle.diele(); });
  await B.page.waitForFunction(() => LUMO.ui.overlay.isOpen('e04-logbuch'), null, { timeout: 5000 });
  await B.page.click('[data-overlay="e04-logbuch"] [data-q4="ok"]');
  await adv(B.page, 0.5);
  await exitNest(B.page);
  await goAndAct(B.page, 'hafen.steg', sceneOpen);
  await playScene(B.page, []);
  await adv(B.page, 0.5);
  const mid = await info(B.page);
  await B.page.evaluate(() => LUMO.save.save());
  await B.page.reload();
  await B.page.waitForFunction(() => window.LUMO && LUMO.loop && LUMO.loop.frame > 1, null, { timeout: 180000 });
  await startGame(B.page, { hour: 11 });
  await adv(B.page, 1);
  const rl2 = await B.page.evaluate(() => ({ q: LUMO.debug.questInfo(), up: LUMO.state.get('upgrades', []), leck: LUMO.state.get('flags.e04.leck'), log: LUMO.state.get('chronik.logbuch') }));
  check('Neu laden nach Ilda: weiter bei „Tun neben dem Nest“, Blick-Stufe, Leck und Logbuchseite bleiben', mid.q.step === 'tun' && rl2.q.step === 'tun' && rl2.up.includes('blick.tanks') && rl2.leck && (rl2.log || []).includes(2), J({ mid: mid.q.step, rl2 }));
  const errsB = B.errors.filter((e) => !/favicon|AudioContext/.test(e));
  check('Keine Fehler in der Konsole (Teil B)', !errsB.length, errsB.slice(0, 3).join(' | '));

  // =============== Teil C: Kurzfassung auf frischem Spielstand ===============
  const C = await openGame(browser, { query: `q=${Q}&skipintro&autostart&debug` });
  await startGame(C.page, { hour: 11 });
  const k0 = await C.page.evaluate(() => { LUMO.state.set('units.j1-e04', 'kurz'); LUMO.debug.advance(0.3); return { up: LUMO.state.get('upgrades', []), ok: LUMO.debug.startKurz('j1-e04'), q: LUMO.debug.questInfo() }; });
  await goAndAct(C.page, 'hafen.steg', sceneOpen);
  await playScene(C.page, []);
  await adv(C.page, 0.5);
  const k1 = await C.page.evaluate(() => LUMO.debug.questInfo());
  await goAndAct(C.page, 'hafen.feuerPlatz', sceneOpen);
  await playScene(C.page, []);
  await adv(C.page, 3);
  const k2 = await C.page.evaluate(() => ({ up: LUMO.state.get('upgrades', []), patches: LUMO.state.get('patches', []), unit: LUMO.state.get('units.j1-e04'), kurzDone: (LUMO.state.get('quests.j1-e04') || {}).kurzDone, active: LUMO.debug.questInfo().active }));
  check('Kurzfassung (frischer Spielstand): Blick (Gläser) bei Ilda + Crew-Glas → Blick-Stufe und Aufnäher', k0.ok && k0.up.includes('blick.tanks') && k0.q.step === 'blick' && k0.q.kurz && k1.step === 'crewglas' && k2.up.includes('blick.tanks') && k2.patches.includes('j1-e04') && k2.kurzDone && !k2.active, J({ k0, k1: k1.step, k2 }));
  const errsC = C.errors.filter((e) => !/favicon|AudioContext/.test(e));
  check('Keine Fehler in der Konsole (Teil C)', !errsC.length, errsC.slice(0, 3).join(' | '));
} catch (e) { console.error(e); failed = true; }
await browser.close();
console.log(failed ? '✘ kostprobe2: Fehler' : '✔ kostprobe2: alles grün');
process.exit(failed ? 1 : 0);

// Szenario Nest + Blick (Gläser) + Blitz-Motor + Spiegel (Kostprobe Teil 2, Systeme für QUELLE):
// Bootshaus zu Fuß vom Hafen → Nest betreten (Werkbank öffnet die Werft) → Bauplätze erst zu, Mission öffnet sie (Flag),
// Aktion „Bauen“ → Fotowand + Bild, Dachboden-Ecke → Blick-Stufe Gläser: erst die Folge (Winde klemmt), dann nach dem
// Hinschauen die Gefäße über Tun (6 Gläser, eine größte Lücke) → Blitz-Motor an der Werft (versteckt bis Plan) → Riss
// leckt, 7 Tage Spielzeit ändern nichts, neu laden = nächste Sitzung: ausgelaufen → Spiegel im Baumhaus: aus = keine
// Station, Lehrer-Schalter an → Station, Regler, „Nicht merken“ speichert nichts, Zeigen-Karte, Pause blendet aus.
// Aufruf: flock /tmp/lumo-chrome.lock node tests/scenarios/nest.mjs   (Screenshots 400_… im SHOTS-Ordner)
import { launch, openGame, startGame, frames, shot } from '../lib.mjs';

const Q = process.env.Q || 'low';
let failed = false;
function check(name, ok, info = '') { console.log(ok ? '✔' : '✘', name, info); if (!ok) failed = true; }
const J = (o) => JSON.stringify(o);
const pressAction = (page) => page.evaluate(() => { LUMO.input.press('action'); LUMO.debug.advance(1 / 30); LUMO.input.release('action'); LUMO.debug.advance(0.3); });
const adv = (page, s) => page.evaluate((s) => { for (let t = 0; t < s; t += 0.1) LUMO.debug.advance(0.1); }, s);

const browser = await launch();
try {
  const { page, errors } = await openGame(browser, { query: `q=${Q}&skipintro&autostart&debug` });
  await startGame(page, { hour: 10.5 });
  const p0 = await page.evaluate(() => ({ failed: LUMO.plugins.failed.map((f) => f.id), has: LUMO.plugins.list.includes('nest'), info: LUMO.debug.nest.info(), site: LUMO.content.resolveSite('bootshaus') }));
  check('Plugin nest da, Ort „bootshaus“ auflösbar, Sitzung 1, Bauplätze zu', p0.has && !p0.failed.length && p0.site && p0.info.sitzung === 1 && p0.info.slots.join() === 'fotowand:zu,dachboden:zu', J(p0));

  // ---- 1 Zu Fuß vom Steg zum Bootshaus (nach OTTER), Tür „Nest“ ----
  await page.evaluate(() => { LUMO.state.set('units.j1-e03', 'kurz'); LUMO.debug.advance(0.2); });
  const walk = await page.evaluate(() => {
    const d = LUMO.nest.outside.door, s = LUMO.nest.site;
    LUMO.debug.teleport({ x: s.x + 3, z: s.z - 1 }, Math.atan2(d.x - s.x - 3, d.z - s.z + 1));
    LUMO.debug.advance(0.2); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); LUMO.debug.advance(0.1);
    for (let t = 0; t < 4 && !(LUMO.interactions.current && LUMO.interactions.current.label === 'Nest'); t += 0.05) { LUMO.player.setIntent({ x: 0, y: 1, camYaw: LUMO.cameraRig.yaw }); LUMO.debug.advance(0.05); }
    LUMO.player.setIntent(null); LUMO.debug.advance(0.2); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); LUMO.debug.advance(0.2);
    return { label: LUMO.interactions.current && LUMO.interactions.current.label, x: +LUMO.player.position.x.toFixed(1), z: +LUMO.player.position.z.toFixed(1), state: LUMO.player.state };
  });
  await shot(page, '400_bootshaus_tuer');
  check('Bootshaus zu Fuß erreichbar: Tür „Nest“', walk.label === 'Nest' && walk.state !== 'boot', J(walk));
  await pressAction(page);
  await page.waitForFunction(() => LUMO.nest.isInside, null, { timeout: 20000 });
  await adv(page, 1);
  const p1 = await page.evaluate(() => ({ info: LUMO.debug.nest.info(), room: LUMO.scenes.current.id }));
  check('Nest betreten: Winde, Luke, Karte, keine Bauplatz-Umrisse', p1.room === 'nest' && p1.info.parts.winde && p1.info.parts.winde.klemmt === true && p1.info.parts.fotowand.state === 'zu' && p1.info.parts.karte.leer === true, J(p1));
  await page.evaluate(() => { const p = LUMO.scenes.pocket; LUMO.debug.setShot({ x: p.x + 2.5, y: p.y + 4.4, z: p.z + 5.6 }, { x: p.x - 1.5, y: p.y + 1.2, z: p.z - 2.5 }); LUMO.debug.advance(0.2); });
  await shot(page, '401_nest_innen_leer');
  await page.evaluate(() => { LUMO.debug.setShot(null, null); LUMO.debug.advance(0.1); });

  // ---- 2 Werkbank öffnet die Werft ----
  const wb = await page.evaluate(() => { const p = LUMO.scenes.pocket, a = LUMO.nest.SPOTS.werkbank.act; LUMO.debug.teleport({ x: p.x + a[0], z: p.z + a[2] + 0.4 }, Math.PI); LUMO.debug.advance(0.3); return LUMO.interactions.current && LUMO.interactions.current.label; });
  await pressAction(page);
  const wOpen = await page.evaluate(() => ({ open: LUMO.ui.overlay.isOpen('werft'), cards: document.querySelectorAll('.wf-card').length, bm: !!document.querySelector('[data-teil="blitzmotor"]') }));
  check('Werkbank im Nest öffnet die Werft (Blitz-Motor noch versteckt)', wb === 'Werkbank' && wOpen.open && wOpen.cards === 3 && !wOpen.bm, J({ wb, wOpen }));
  await page.evaluate(() => LUMO.ui.overlay.close('werft'));

  // ---- 3 Mission öffnet Bauplätze (Flag), Aktion „Bauen“ ----
  await page.evaluate(() => { LUMO.state.set('flags.nest.offen.fotowand', true); LUMO.state.set('flags.nest.offen.dachboden', true); LUMO.debug.advance(0.2); });
  const fw = await page.evaluate(() => { const p = LUMO.scenes.pocket, a = LUMO.nest.SPOTS.fotowand.act; LUMO.debug.teleport({ x: p.x + a[0] + 0.3, z: p.z + a[2] }, -Math.PI / 2); LUMO.debug.advance(0.3); return { label: LUMO.interactions.current && LUMO.interactions.current.label, part: LUMO.debug.nest.info().parts.fotowand }; });
  await page.evaluate(() => { const p = LUMO.scenes.pocket; LUMO.debug.setShot({ x: p.x + 1.5, y: p.y + 3.4, z: p.z + 3.5 }, { x: p.x - 6, y: p.y + 1.5, z: p.z - 1 }); LUMO.debug.advance(0.2); });
  await shot(page, '402_nest_bauplatz_offen');
  await page.evaluate(() => { LUMO.debug.setShot(null, null); LUMO.debug.advance(0.1); });
  await pressAction(page);
  await page.evaluate(() => { LUMO.nest.fotowand.hang('tun'); LUMO.nest.slots.build('dachboden'); LUMO.debug.advance(0.3); });
  const p3 = await page.evaluate(() => LUMO.debug.nest.info());
  check('Bauplatz offen → „Bauen“ → Fotowand gebaut, Bild hängt, Dachboden-Ecke gebaut', fw.label === 'Bauen' && fw.part.state === 'offen' && p3.slots.join() === 'fotowand:gebaut,dachboden:gebaut' && p3.bilder.includes('tun') && p3.parts.fotowand.bilder === 1, J({ fw, p3 }));

  // ---- 4 Blick-Stufe Gläser im Nest: Folge in der Welt (Winde klemmt) ----
  await page.evaluate(() => { LUMO.state.addUnique('abilities', 'blick'); LUMO.state.addUnique('upgrades', 'blick.tanks'); const p = LUMO.scenes.pocket, w = LUMO.nest.SPOTS.winde.act; LUMO.debug.teleport({ x: p.x + w[0] + 1, z: p.z + w[2] + 1 }, -2.4); LUMO.debug.advance(0.3); });
  const bf = await page.evaluate(() => { const got = []; const off = LUMO.events.on('blick:folge', (e) => got.push(e)); const r = LUMO.abilities.use('blick'); LUMO.debug.advance(0.3); off(); return { glas: r && r.glas, got }; });
  check('Blick im Nest: Folge zuerst – Tuns Winde klemmt', bf.glas && bf.glas.folgen.includes('winde') && bf.glas.line === 'Die Winde klemmt.', J(bf));
  await page.evaluate(() => { LUMO.nest.exit(); });
  await page.waitForFunction(() => !LUMO.scenes.isInterior, null, { timeout: 20000 });

  // ---- 5 Blick bei Tun: erst Folge-Zeichen, Hinschauen → Gefäße ----
  const bt = await page.evaluate(() => {
    const n = LUMO.npcs.get('tun'); const p = n.position; const x = p.x + 2.2, z = p.z + 2.2;
    LUMO.debug.teleport({ x, z }, Math.atan2(p.x - x, p.z - z)); LUMO.debug.advance(0.3); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); LUMO.debug.advance(0.2);
    const r = LUMO.abilities.use('blick'); LUMO.debug.advance(0.2);
    return { target: r.glas && r.glas.target, badge: !!document.querySelector('.gf-folge'), shelf: !!document.querySelector('.gf-shelf'), cur: LUMO.debug.blickGlas() };
  });
  await shot(page, '403_blick_tun_folge');
  await adv(page, 1.4);
  const bs = await page.evaluate(() => ({ cur: LUMO.debug.blickGlas(), cols: document.querySelectorAll('.gf-shelf .gf-col').length, gross: [...document.querySelectorAll('.gf-col.is-gross')].map((e) => e.dataset.need), names: [...document.querySelectorAll('.gf-name')].map((e) => e.textContent) }));
  await shot(page, '404_blick_tun_glaeser');
  check('Blick bei Tun: erst Folge (kein Gefäß), nach Hinschauen 6 Blechdosen, größte Lücke Anerkennung', bt.target === 'tun' && bt.badge && !bt.shelf && bs.cur && bs.cur.phase === 'offen' && bs.cols === 6 && bs.gross.join() === 'anerkennung' && bs.names.includes('Ruhe und Erholung'), J({ bt, bs }));

  // ---- 6 Blitz-Motor: Plan → Werft → Riss; 7 Tage Spielzeit ändern nichts ----
  const bm = await page.evaluate(() => {
    LUMO.state.set('flags.boot.plan.blitzmotor', true);
    LUMO.state.set('bergen.material', { holz: 3, tau: 2, tuch: 1, metall: 2 });
    const ok = LUMO.debug.werft.build('blitzmotor'); LUMO.debug.advance(0.3);
    return { ok, riss: LUMO.nest.riss(), a: LUMO.nest.glaeser.get('tun', 'anerkennung'), deko: LUMO.debug.nest.info().deko, gross: [...document.querySelectorAll('.gf-col.is-riss')].map((e) => e.dataset.need) };
  });
  await shot(page, '405_blick_tun_riss');
  const before = await page.evaluate(() => JSON.stringify(LUMO.state.get('nest')));
  await page.evaluate(() => { const d0 = LUMO.state.get('time.day', 1); for (let d = 1; d <= 7; d++) { LUMO.state.set('time.day', d0 + d); LUMO.events.emit('day:new', { day: d0 + d }); for (let i = 0; i < 20; i++) LUMO.debug.advance(0.5); } });
  const after = await page.evaluate(() => JSON.stringify(LUMO.state.get('nest')));
  check('Blitz-Motor: Glas voll mit Riss, Deko-Motor; 7 Tage Spielzeit ändern kein Nest-Glas', bm.ok && bm.riss && bm.riss.phase === 'leckt' && bm.a.voll === 1 && bm.a.riss && bm.deko.includes('blitzmotor') && bm.gross.join() === 'anerkennung' && before === after, J({ bm, same: before === after }));
  await page.evaluate(() => { LUMO.debug.blickGlaeser(null); LUMO.save.save(); });

  // ---- 7 Neu laden = nächste Sitzung: Riss ausgelaufen ----
  await page.reload();
  await page.waitForFunction(() => window.LUMO && LUMO.loop && LUMO.loop.frame > 1, null, { timeout: 180000 });
  await startGame(page, { hour: 10.5 });
  const p7 = await page.evaluate(() => ({ s: LUMO.nest.sitzung, riss: LUMO.nest.riss(), a: LUMO.nest.glaeser.get('tun', 'anerkennung'), gebaut: LUMO.debug.nest.info().slots }));
  check('Neu laden: nächste Sitzung, Riss ausgelaufen, Glas wieder niedrig, Bauplätze bleiben', p7.s === 2 && p7.riss.phase === 'aus' && p7.a.voll === 0.15 && !p7.a.riss && p7.gebaut.join() === 'fotowand:gebaut,dachboden:gebaut', J(p7));

  // ---- 8 Spiegel: aus = nichts; Lehrer-Schalter an = Station ----
  await page.evaluate(() => LUMO.debug.enterBaumhaus());
  await adv(page, 0.8);
  const s0 = await page.evaluate(() => ({ part: !!LUMO.baumhaus.parts.spiegelglaeser, it: LUMO.interactions.list ? LUMO.interactions.list().some((i) => i.id === 'bh-spiegelglaeser') : null, mesh: !!LUMO.scene.getObjectByName('bh-spiegelglaeser'), priv: LUMO.state.get('private.spiegel'), open: LUMO.baumhaus.open('spiegelglaeser') }));
  check('Spiegel aus (Standard): keine Station, kein Mesh, nichts angelegt, Öffnen geht nicht', !s0.part && !s0.mesh && s0.it !== true && s0.priv === undefined && !s0.open, J(s0));
  await page.evaluate(() => { LUMO.codes.teacher.device.set('spiegel', true); LUMO.events.emit('spiegel:schalter', { an: true }); LUMO.debug.advance(0.3); });
  const s1 = await page.evaluate(() => ({ part: !!LUMO.baumhaus.parts.spiegelglaeser, mesh: !!LUMO.scene.getObjectByName('bh-spiegelglaeser') }));
  await page.evaluate(() => { const p = LUMO.scenes.pocket, a = LUMO.baumhaus.SPIEGEL_STATION.at; LUMO.debug.teleport({ x: p.x + a[0] - 1.6, z: p.z + a[2] - 1.2 }, Math.atan2(1.6, 1.2)); LUMO.debug.advance(0.3); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); LUMO.debug.advance(0.3); });
  await shot(page, '406_spiegel_regal');
  const lbl = await page.evaluate(() => LUMO.interactions.current && LUMO.interactions.current.label);
  await pressAction(page);
  const s2 = await page.evaluate(() => ({ open: LUMO.ui.overlay.isOpen('spiegelglaeser'), glas: document.querySelectorAll('.sp-glas').length, keiner: !!document.querySelector('[data-schritt="keiner"].is-on'), nicht: !!document.querySelector('[data-merken="0"].is-on') }));
  check('Schalter an: Regal steht, „Gläser“ öffnet sechs Gläser; „Keiner davon“ und „Nicht merken“ voreingestellt', s1.part && s1.mesh && lbl === 'Gläser' && s2.open && s2.glas === 6 && s2.keiner && s2.nicht, J({ s1, lbl, s2 }));
  // Regler: Schlaf wichtig und leer → leuchtet; Nicht merken = nichts im Spielstand
  await page.evaluate(() => {
    const setR = (need, key, v) => { const i = document.querySelector(`input[data-need="${need}"][data-key="${key}"]`); i.value = String(v); i.dispatchEvent(new Event('input', { bubbles: true })); };
    setR('schlaf', 'wichtig', 4); setR('schlaf', 'voll', 0); setR('bewegung', 'voll', 4); setR('anerkennung', 'wichtig', 3); setR('anerkennung', 'voll', 1);
    document.querySelector('input[data-need="schlaf"][data-key="voll"]').dispatchEvent(new Event('change', { bubbles: true }));
  });
  await page.evaluate(() => document.querySelector('[data-schritt="schlaf"]') && document.querySelector('[data-schritt="schlaf"]').click());
  const s3 = await page.evaluate(() => ({ gross: [...document.querySelectorAll('.sp-glas.is-gross')].map((e) => e.dataset.glas), priv: LUMO.state.get('private.spiegel'), saved: (LUMO.save.save(), (localStorage.getItem('lumo.save.' + LUMO.save.current) || '').includes('"spiegel"')) }));
  await shot(page, '407_spiegel_glaeser');
  check('Größte Lücke leuchtet (Schlaf); „Nicht merken“ speichert nichts', s3.gross.join() === 'schlaf' && s3.priv === undefined && !s3.saved, J(s3));
  // Zeigen: nur die größte Lücke, Vollbild, Ausblenden; schreibt nichts
  const snapBefore = await page.evaluate(() => JSON.stringify(LUMO.state.snapshot()));
  await page.evaluate(() => document.querySelector('[data-zeigen]').click());
  await page.evaluate(() => document.querySelector('[data-pick="luecke"]').click());
  await page.evaluate(() => document.querySelector('[data-go]').click());
  await page.waitForFunction(() => LUMO.ui.overlay.isOpen('spiegel-zeigen'), null, { timeout: 5000 });
  const z = await page.evaluate(() => ({ items: document.querySelectorAll('.sp-show-item').length, txt: document.querySelector('.sp-show').textContent }));
  await shot(page, '408_spiegel_zeigen');
  await page.evaluate(() => document.querySelector('[data-weg]').click());
  const snapAfter = await page.evaluate(() => JSON.stringify(LUMO.state.snapshot()));
  check('Zeigen: Vollbild nur mit der größten Lücke, Ausblenden, schreibt nichts', z.items === 1 && /Schlaf/.test(z.txt) && !/Bewegung/.test(z.txt) && snapBefore === snapAfter, J(z));
  // Pause blendet sofort aus
  await page.evaluate(() => { LUMO.ui.overlay.closeAll && LUMO.ui.overlay.closeAll(); LUMO.baumhaus.open('spiegelglaeser'); });
  await page.evaluate(() => LUMO.events.emit('ui:overlay', { id: 'pause', open: true, kind: 'panel' }));
  const pz = await page.evaluate(() => LUMO.ui.overlay.isOpen('spiegelglaeser'));
  check('Pause blendet den Spiegel sofort aus', pz === false);
  // Merken: Werte privat, nie im Export-Code
  const mk = await page.evaluate(() => { const S = LUMO.baumhaus.spiegel; S.setMerken(true); const code = LUMO.save.exportCode(); const b = code.split('.')[2].replace(/-/g, '+').replace(/_/g, '/'); const json = decodeURIComponent(escape(atob(b + '==='.slice((b.length + 3) % 4)))); return { priv: !!LUMO.state.get('private.spiegel.werte'), inCode: json.includes('"spiegel"') }; });
  check('Merken: Werte unter private.spiegel, nicht im Export-Code', mk.priv && !mk.inCode, J(mk));

  const errs = errors.filter((e) => !/favicon|AudioContext/.test(e));
  check('Keine Fehler in der Konsole', !errs.length, errs.slice(0, 3).join(' | '));
} catch (e) { console.error(e); failed = true; }
await browser.close();
process.exit(failed ? 1 : 0);

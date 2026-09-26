// Rauchtest: lädt dist/index.html in Chromium (iPad quer + hoch, Touch), prüft Fehler,
// macht Screenshots (Titel, Intro, Hafen, alle Zonen, goldene Stunde, Nacht, Schleier vorher/nachher, Figur),
// simuliert den Joystick und misst die Frame-Zeit.
// Aufruf: node tests/smoke.mjs   (Umgebung: SHOTS=Ordner, Q=low|medium|high für Screenshots)
import { launch, openGame, frames, shot, measureFrames, touch, IPAD_LANDSCAPE, IPAD_PORTRAIT, PREVIEW, SHOTS } from './lib.mjs';

const Q = process.env.Q || 'high';
const results = [];
let failed = false;
const log = (...a) => console.log('·', ...a);
function check(name, ok, info = '') {
  results.push({ name, ok, info });
  console.log(ok ? '✔' : '✘', name, info);
  if (!ok) failed = true;
}

const browser = await launch();
try {
  // ---------- Querformat ----------
  const t0 = Date.now();
  const L = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&intro=1`, waitReady: false });
  const { page, context, errors } = L;
  await page.waitForSelector('#boot', { timeout: 60000 });
  await shot(page, '01_titel_laden');
  await page.waitForFunction(() => window.LUMO && window.LUMO.loop && window.LUMO.loop.frame > 1, null, { timeout: 180000 });
  log('geladen in', Date.now() - t0, 'ms');
  await page.waitForSelector('#boot-start:not(.is-hidden)', { timeout: 60000 });
  await frames(page, 2);
  await shot(page, '02_titel_bereit');

  // Start per Touch (Intro läuft)
  await page.tap('#boot-start', { force: true });
  await page.evaluate(() => LUMO.debug.freezeTime(true));
  await page.waitForFunction(() => LUMO.cameraRig.mode === 'intro', null, { timeout: 20000 });
  // Intro-Zwischenstände (Zeit per Schritt vorspulen, damit SwiftShader nicht bremst)
  await page.evaluate(() => { document.getElementById('boot')?.remove(); LUMO.cameraRig.intro.t = 3.2; LUMO.ui.showIntro(true); });
  await frames(page, 3);
  await shot(page, '03_intro_anflug');
  await page.evaluate(() => { LUMO.cameraRig.intro.t = 7.4; });
  await frames(page, 3);
  await shot(page, '04_intro_hafen');
  await page.evaluate(() => { LUMO.cameraRig.intro.t = 99; });
  await frames(page, 3);
  check('Intro beendet, Spiel gestartet', await page.evaluate(() => LUMO.started && LUMO.cameraRig.mode === 'follow'));
  await page.evaluate(() => LUMO.debug.setTimeOfDay(17.3));
  await frames(page, 3);
  await shot(page, '05_hafen_start');

  // Joystick: Touch links unten, nach oben ziehen = vorwärts
  const p0 = await page.evaluate(() => ({ x: LUMO.player.position.x, z: LUMO.player.position.z }));
  const T = await touch(page, context);
  await T.start([{ x: 200, y: 640, id: 1 }]);
  await T.move([{ x: 200, y: 600, id: 1 }]);
  await T.move([{ x: 205, y: 560, id: 1 }]);
  const joy = await page.evaluate(() => ({ ...LUMO.input.state.move, active: LUMO.input.state.joystick.active }));
  // gleichzeitig Kamera drehen (Multi-Touch)
  await T.start([{ x: 205, y: 560, id: 1 }, { x: 900, y: 400, id: 2 }]);
  await T.move([{ x: 205, y: 560, id: 1 }, { x: 860, y: 400, id: 2 }]);
  const yawBefore = await page.evaluate(() => LUMO.cameraRig.yaw);
  await T.move([{ x: 205, y: 560, id: 1 }, { x: 800, y: 405, id: 2 }]);
  await frames(page, 2);
  const yawAfter = await page.evaluate(() => LUMO.cameraRig.yaw);
  await page.evaluate(() => LUMO.debug.advance(1.5));
  await frames(page, 2);
  await shot(page, '06_joystick_laufen');
  await T.end();
  const p1 = await page.evaluate(() => ({ x: LUMO.player.position.x, z: LUMO.player.position.z }));
  const moved = Math.hypot(p1.x - p0.x, p1.z - p0.z);
  check('Joystick aktiv', joy.active && joy.y > 0.5, JSON.stringify(joy));
  check('Spieler bewegt sich per Joystick', moved > 2, `${moved.toFixed(2)} m`);
  check('Kamera dreht sich gleichzeitig (Multi-Touch)', Math.abs(yawAfter - yawBefore) > 0.01, `Δyaw ${(yawAfter - yawBefore).toFixed(3)}`);

  // Springen per Knopf
  const y0 = await page.evaluate(() => LUMO.player.position.y);
  await page.evaluate(() => { LUMO.input.press('jump'); LUMO.debug.advance(0.25); LUMO.input.release('jump'); });
  const y1 = await page.evaluate(() => LUMO.player.position.y);
  check('Springen', y1 > y0 + 0.5, `Δy ${(y1 - y0).toFixed(2)}`);
  await page.evaluate(() => LUMO.debug.advance(1.2));

  // Tastatur (PC)
  const k0 = await page.evaluate(() => ({ x: LUMO.player.position.x, z: LUMO.player.position.z }));
  await page.keyboard.down('KeyW');
  await page.evaluate(() => LUMO.debug.advance(1));
  await page.keyboard.up('KeyW');
  const k1 = await page.evaluate(() => ({ x: LUMO.player.position.x, z: LUMO.player.position.z }));
  check('Tastatur WASD', Math.hypot(k1.x - k0.x, k1.z - k0.z) > 2, `${Math.hypot(k1.x - k0.x, k1.z - k0.z).toFixed(2)} m`);

  // Zonen
  const zones = await page.evaluate(() => LUMO.debug.zones);
  for (const z of zones) {
    await page.evaluate((z) => { LUMO.debug.teleport(z); LUMO.debug.advance(0.8); }, z);
    await frames(page, 3);
    const info = await page.evaluate(() => ({ zone: LUMO.world.island.zoneAt(LUMO.player.position.x, LUMO.player.position.z), y: LUMO.player.position.y, walk: LUMO.world.island.isWalkable(LUMO.player.position.x, LUMO.player.position.z) }));
    check(`Teleport ${z}`, info.zone === z && info.walk, JSON.stringify(info));
    await shot(page, `10_zone_${z}`);
  }

  // Tageszeiten (Aussicht vom Hafen)
  const vista = { pos: { x: 34, y: 16, z: 160 }, look: { x: 0, y: 12, z: 60 } };
  for (const [name, h] of [['20_goldene_stunde', 17.4], ['21_sonnenuntergang', 18.3], ['22_nacht', 23], ['23_mittag', 12.5]]) {
    await page.evaluate(([h, v]) => { LUMO.debug.teleport('hafen'); LUMO.debug.setTimeOfDay(h); LUMO.debug.setShot(v.pos, v.look); LUMO.debug.advance(0.3); }, [h, vista]);
    await frames(page, 3);
    await shot(page, name);
  }
  await page.evaluate(() => { LUMO.debug.setShot(null); LUMO.debug.setTimeOfDay(17.4); });

  // Schleier vorher / Farbwelle / nachher
  const veilShot = { pos: { x: 150, y: 16, z: 72 }, look: { x: 128, y: 3, z: 20 } };
  await page.evaluate((v) => { LUMO.debug.teleport('strand'); LUMO.debug.setShot(v.pos, v.look); LUMO.debug.advance(0.3); }, veilShot);
  await frames(page, 3);
  await shot(page, '30_schleier_vorher');
  check('Strand ist verschleiert', await page.evaluate(() => LUMO.world.veil.isVeiled('strand')));
  await page.evaluate(() => { LUMO.debug.restoreZone('strand'); LUMO.debug.advance(1.6); });
  await frames(page, 2);
  await shot(page, '31_farbwelle');
  await page.evaluate(() => LUMO.debug.advance(4));
  await frames(page, 3);
  await shot(page, '32_schleier_nachher');
  check('Strand befreit', await page.evaluate(() => !LUMO.world.veil.isVeiled('strand')));

  // Figur aus der Nähe
  await page.evaluate(() => {
    LUMO.debug.setShot(null);
    LUMO.debug.teleport('hafen');
    const r = LUMO.cameraRig;
    r.targetDist = 3.4; r.pitch = 0.1; r.lookOffsetY = 1.15; r.yaw = LUMO.player.yaw + 0.45;
    LUMO.player.playAnim('wave', 60);
    LUMO.debug.advance(0.8);
    r.snap();
  });
  await frames(page, 3);
  await shot(page, '40_figur_nah');
  await page.evaluate(() => { const r = LUMO.cameraRig; r.targetDist = 8.5; r.lookOffsetY = 1.45; r.pitch = 0.32; LUMO.player.stopAnim(); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); });

  // Menü
  await page.tap('.hud-menu-btn');
  await frames(page, 2);
  check('Menü öffnet und pausiert', await page.evaluate(() => LUMO.ui.menuOpen && LUMO.paused));
  await shot(page, '41_menue');
  await page.evaluate(() => LUMO.ui.closeMenu());

  // Frame-Zeit
  await page.evaluate(() => LUMO.debug.freezeTime(false));
  const ms = await measureFrames(page, 12);
  const stats = await page.evaluate(() => LUMO.debug.stats());
  log('Frame-Zeit (SwiftShader, Software-Rendering)', ms.toFixed(1), 'ms', JSON.stringify(stats));
  check('Keine Seitenfehler (quer)', errors.length === 0, errors.slice(0, 5).join('\n'));
  await context.close();

  // ---------- Hochformat ----------
  const P = await openGame(browser, { viewport: IPAD_PORTRAIT, query: `q=${Q}&skipintro` });
  await P.page.tap('#boot-start', { force: true });
  await P.page.waitForFunction(() => LUMO.started, null, { timeout: 30000 });
  await P.page.evaluate(() => { document.getElementById('boot')?.remove(); LUMO.debug.freezeTime(true); LUMO.debug.setTimeOfDay(17.4); LUMO.debug.advance(0.5); });
  await frames(P.page, 3);
  await shot(P.page, '50_hoch_hafen');
  await P.page.evaluate(() => { LUMO.debug.teleport('vulkan'); LUMO.debug.advance(0.5); });
  await frames(P.page, 3);
  await shot(P.page, '51_hoch_vulkan');
  // Drehen: Hochformat → Querformat
  await P.page.setViewportSize(IPAD_LANDSCAPE);
  await P.page.waitForTimeout(600);
  await frames(P.page, 2);
  const sz = await P.page.evaluate(() => ({ w: LUMO.renderer.domElement.width, h: LUMO.renderer.domElement.height, aspect: LUMO.camera.aspect }));
  check('Drehung passt Größe an', sz.w === IPAD_LANDSCAPE.width && Math.abs(sz.aspect - IPAD_LANDSCAPE.width / IPAD_LANDSCAPE.height) < 0.01, JSON.stringify(sz));
  check('Keine Seitenfehler (hoch)', P.errors.length === 0, P.errors.slice(0, 5).join('\n'));
  await P.context.close();

  // ---------- Automatische Qualität + Vorschau-Datei ----------
  const A = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: 'skipintro&autostart', file: PREVIEW });
  await A.page.waitForFunction(() => LUMO.started, null, { timeout: 30000 });
  await frames(A.page, 3);
  const autoMs = await measureFrames(A.page, 12);
  const aq = await A.page.evaluate(() => LUMO.debug.stats());
  log('Vorschau-Datei, automatische Qualität:', aq.quality, 'Frame-Zeit', autoMs.toFixed(1), 'ms');
  await shot(A.page, '60_vorschau_auto');
  check('Vorschau-Datei lädt ohne Fehler', A.errors.length === 0, A.errors.slice(0, 5).join('\n'));
  await A.context.close();
} catch (e) {
  console.error(e);
  failed = true;
} finally {
  await browser.close();
}
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} Prüfungen ok · Screenshots: ${SHOTS}`);
process.exit(failed ? 1 : 0);

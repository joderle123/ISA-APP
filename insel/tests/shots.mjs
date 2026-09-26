// Schnelle Bild-Serie für die Art-Direction (ohne Prüfungen): Hafen-Spawn, Übersicht, Gewitter, Krater,
// Schleier vorher/Welle/nachher, Wald-Kamera, Figur nah (Ausdrücke), Nacht.
// Aufruf: node tests/shots.mjs   (Umgebung: SHOTS=Ordner, Q=low|medium|high)
import { launch, openGame, frames, shot, IPAD_LANDSCAPE, SHOTS } from './lib.mjs';

const Q = process.env.Q || 'high';
const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await page.waitForFunction(() => LUMO.started, null, { timeout: 60000 });
  await page.evaluate(() => { document.getElementById('boot')?.remove(); LUMO.debug.freezeTime(true); LUMO.debug.setTimeOfDay(17.3); LUMO.debug.advance(0.6); LUMO.cameraRig.snap(); });
  await frames(page, 3);
  await shot(page, 'a01_hafen_spawn');

  const view = async (name, pos, look, extra) => {
    await page.evaluate(([p, l, ex]) => { LUMO.debug.setShot(p, l); if (ex) LUMO.debug.setTimeOfDay(ex.h); LUMO.debug.advance(0.4); }, [pos, look, extra || null]);
    await frames(page, 3);
    await shot(page, name);
  };
  await view('a02_uebersicht', { x: -40, y: 120, z: 330 }, { x: 0, y: 10, z: 20 });
  await view('a03_gewitter_nah', { x: -30, y: 40, z: -20 }, { x: -100, y: 40, z: -100 });
  await view('a04_krater', { x: 30, y: 62, z: -12 }, { x: 0, y: 44, z: -42 });
  await view('a05_hafen_boden', { x: 12, y: 5, z: 128 }, { x: 4, y: 2, z: 100 });
  await view('a06_marktplatz', { x: -100, y: 26, z: 30 }, { x: -118, y: 20, z: 14 });
  await view('a07_nacht_hafen', { x: 34, y: 16, z: 160 }, { x: 0, y: 12, z: 60 }, { h: 23 });
  await view('a08_nacht_vulkan', { x: 60, y: 30, z: 40 }, { x: 0, y: 40, z: -42 }, { h: 23.5 });
  await page.evaluate(() => { LUMO.debug.setShot(null); LUMO.debug.setTimeOfDay(17.3); });

  // Schleier: vorher / Welle / nachher (Strand)
  const veilShot = { pos: { x: 150, y: 16, z: 72 }, look: { x: 128, y: 3, z: 20 } };
  await page.evaluate((v) => { LUMO.debug.teleport('strand'); LUMO.debug.setShot(v.pos, v.look); LUMO.debug.advance(1.5); }, veilShot);
  await frames(page, 3);
  await shot(page, 'a10_schleier_vorher');
  await page.evaluate(() => { LUMO.debug.restoreZone('strand'); LUMO.debug.advance(1.4); });
  await frames(page, 2);
  await shot(page, 'a11_farbwelle');
  await page.evaluate(() => { LUMO.debug.advance(1.2); });
  await frames(page, 2);
  await shot(page, 'a12_farbwelle_2');
  await page.evaluate(() => LUMO.debug.advance(4));
  await frames(page, 3);
  await shot(page, 'a13_schleier_nachher');
  // Schleier aus Spielersicht (Dschungel)
  await page.evaluate(() => { LUMO.debug.setShot(null); LUMO.debug.teleport('dschungel'); LUMO.debug.advance(1.5); LUMO.cameraRig.snap(); });
  await frames(page, 3);
  await shot(page, 'a14_schleier_dschungel');
  // Wald-Kamera: mehrere Blickwinkel, Abstand messen
  const dists = [];
  for (let i = 0; i < 6; i++) {
    const d = await page.evaluate((i) => { const r = LUMO.cameraRig; r.yaw = i * 1.05; LUMO.debug.advance(1.2); return LUMO.camera.position.distanceTo(r.focus); }, i);
    dists.push(+d.toFixed(2));
  }
  await frames(page, 2);
  await shot(page, 'a15_wald_kamera');
  console.log('Kamera-Abstände im Dschungel:', dists.join(' '));

  // Figur nah: neutral, dann Ausdrücke
  await page.evaluate(() => {
    LUMO.debug.teleport('hafen');
    const r = LUMO.cameraRig;
    r.targetDist = 3.2; r.pitch = 0.08; r.lookOffsetY = 1.25; r.yaw = LUMO.player.yaw + 0.5;
    LUMO.debug.advance(0.8); r.snap();
  });
  await frames(page, 3);
  await shot(page, 'a20_figur_neutral');
  await page.evaluate(() => { LUMO.player.humanoid.setExpression({ brows: -1, mouth: -0.8 }); LUMO.debug.advance(1); });
  await frames(page, 2);
  await shot(page, 'a21_figur_zornig');
  await page.evaluate(() => { LUMO.player.humanoid.setExpression({ brows: 0.9, mouth: -0.9, raise: 0.2 }); LUMO.debug.advance(1); });
  await frames(page, 2);
  await shot(page, 'a22_figur_traurig');
  await page.evaluate(() => { LUMO.player.humanoid.setExpression(null); LUMO.player.playAnim('wave', 60); LUMO.debug.advance(1); });
  await frames(page, 2);
  await shot(page, 'a23_figur_winkt');
  await page.evaluate(() => { LUMO.player.stopAnim(); const r = LUMO.cameraRig; r.targetDist = 6; r.pitch = 0.1; r.lookOffsetY = 1.2; r.yaw = LUMO.player.yaw + Math.PI + 0.6; LUMO.debug.advance(0.8); r.snap(); });
  await frames(page, 2);
  await shot(page, 'a24_figur_ganz');
  // Laufen
  await page.evaluate(() => { const r = LUMO.cameraRig; r.targetDist = 8.5; r.lookOffsetY = 1.6; r.pitch = 0.24; r.behindPlayer(); r.snap(); });
  await page.keyboard.down('KeyW');
  await page.evaluate(() => LUMO.debug.advance(1.2));
  await frames(page, 2);
  await shot(page, 'a25_laufen');
  await page.keyboard.up('KeyW');
  console.log('Statistik:', JSON.stringify(await page.evaluate(() => LUMO.debug.stats())));
  console.log('Fehler:', errors.length, errors.slice(0, 5).join('\n'));
  await context.close();
} catch (e) {
  console.error(e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
console.log('Screenshots:', SHOTS);

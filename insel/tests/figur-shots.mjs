// Figuren-Nahaufnahmen für die Art-Direction (Ergänzung zu tests/shots.mjs): neutral, zornig, traurig, winken, ganz, laufen, Wald-Kamera.
// Aufruf: SHOTS=<Ordner> Q=high node tests/figur-shots.mjs
import { launch, openGame, frames, shot, IPAD_LANDSCAPE } from './lib.mjs';

const Q = process.env.Q || 'high';
const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await page.waitForFunction(() => LUMO.started, null, { timeout: 60000 });
  await page.evaluate(() => { document.getElementById('boot')?.remove(); LUMO.debug.freezeTime(true); LUMO.debug.setTimeOfDay(17.3); LUMO.debug.advance(0.6); LUMO.cameraRig.snap(); });
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
  await page.evaluate(() => { const r = LUMO.cameraRig; r.targetDist = 8.5; r.lookOffsetY = 1.6; r.pitch = 0.24; r.behindPlayer(); r.snap(); });
  await page.keyboard.down('KeyW');
  await page.evaluate(() => LUMO.debug.advance(1.2));
  await frames(page, 2);
  await shot(page, 'a25_laufen');
  await page.keyboard.up('KeyW');
  // Wald-Kamera im Dschungel (farbig, damit man die Bäume sieht)
  await page.evaluate(() => { LUMO.debug.restoreZone('dschungel', { duration: 0.1 }); LUMO.debug.advance(1); LUMO.debug.teleport('dschungel'); LUMO.debug.advance(1.2); LUMO.cameraRig.snap(); });
  await frames(page, 3);
  await shot(page, 'a15_wald_kamera');
  console.log('Fehler:', errors.length, errors.slice(0, 5).join('\n'));
  await context.close();
} catch (e) {
  console.error(e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
console.log('Fertig');

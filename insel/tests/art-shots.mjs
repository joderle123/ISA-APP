// Art-Direction-Bildserie (zusätzlich zu tests/shots.mjs): Titel, Hafen mit Figuren aus Spielersicht, Strand, Dschungel,
// Klippen im Gewitter, Vulkan, Nacht, Dialog mit Kacheln, Figur nah, HUD.
// Aufruf: SHOTS=<Ordner> Q=high node tests/art-shots.mjs   (Standardordner siehe tests/lib.mjs)
import { launch, openGame, frames, shot, IPAD_LANDSCAPE } from './lib.mjs';

const Q = process.env.Q || 'high';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await launch();
try {
  // ---- Titel / Ladebildschirm ----
  {
    const { page, context } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}`, waitReady: true });
    await page.waitForFunction(() => !document.getElementById('boot-start').classList.contains('is-hidden'), null, { timeout: 60000 });
    await frames(page, 3);
    await shot(page, 'b00_titel');
    await context.close();
  }

  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await page.waitForFunction(() => LUMO.started, null, { timeout: 60000 });
  await page.evaluate(() => { document.getElementById('boot')?.remove(); LUMO.debug.freezeTime(true); LUMO.debug.setTimeOfDay(17.3); LUMO.debug.advance(0.8); LUMO.cameraRig.snap(); });
  await frames(page, 3);
  // HUD / Spielersicht Hafen (Standardkamera)
  await shot(page, 'b01_hud_hafen');

  // Hafen mit Figuren: Kamera etwas höher, Blick auf den Dorfplatz
  const zoneShot = async (name, zone, opts = {}) => {
    await page.evaluate(([z, o]) => {
      LUMO.debug.setShot(null);
      LUMO.debug.teleport(z);
      if (o.h !== undefined) LUMO.debug.setTimeOfDay(o.h);
      const r = LUMO.cameraRig;
      if (o.yaw !== undefined) r.yaw = LUMO.player.yaw + Math.PI + o.yaw;
      if (o.pitch !== undefined) r.pitch = o.pitch;
      if (o.dist !== undefined) r.targetDist = o.dist;
      LUMO.debug.advance(1.2);
      r.snap();
    }, [zone, opts]);
    await frames(page, 4);
    await shot(page, name);
  };
  await zoneShot('b02_hafen_figuren', 'hafen', { pitch: 0.28, dist: 11, yaw: 0.2 });
  // Dorfplatz-Blick (Signalfeuer, Laternen)
  await page.evaluate(() => { LUMO.debug.setShot({ x: 14, y: 6, z: 134 }, { x: 2, y: 3, z: 108 }); LUMO.debug.advance(0.5); });
  await frames(page, 3);
  await shot(page, 'b03_hafen_platz');
  await page.evaluate(() => LUMO.debug.setShot(null));

  await zoneShot('b04_strand', 'strand', { pitch: 0.22, dist: 10 });
  await zoneShot('b05_dschungel', 'dschungel', { pitch: 0.2, dist: 9 });
  await zoneShot('b06_klippen_sturm', 'klippen', { pitch: 0.25, dist: 10 });
  await zoneShot('b07_vulkan', 'vulkan', { pitch: 0.3, dist: 11 });
  await zoneShot('b08_markt', 'markt', { pitch: 0.24, dist: 10 });
  await zoneShot('b09_leuchtturm', 'leuchtturm', { pitch: 0.22, dist: 10 });
  await zoneShot('b10_hafen_nacht', 'hafen', { pitch: 0.26, dist: 10, h: 22.5 });
  await zoneShot('b11_strand_mittag', 'strand', { pitch: 0.22, dist: 10, h: 12.5 });
  await zoneShot('b12_hafen_morgen', 'hafen', { pitch: 0.26, dist: 10, h: 6.8 });

  // Dialog mit Sprechblase + Kacheln (Gesprächs-Kamera)
  await page.evaluate(() => { LUMO.debug.setTimeOfDay(17.3); LUMO.debug.teleport('hafen'); LUMO.debug.advance(0.5); });
  await page.evaluate(() => {
    const P = LUMO.player.position;
    const npc = LUMO.spawnHumanoid({ skin: '#d29a6e', hairStyle: 'lang', hair: '#6b4a2f', top: '#39d0c8', topStyle: 'hoodie' }, { x: P.x + 1.4, z: P.z - 2.4, yaw: Math.PI, anim: 'talk', name: 'jolie-test' });
    window.__npc = npc;
    LUMO.cameraRig.setMode('talk', { target: npc.humanoid.group, side: 1 });
    LUMO.debug.advance(0.6);
    window.__dlg = LUMO.ui.say({ who: 'jolie', text: 'Du bist neu hier, oder? Moien.', anchor: npc.humanoid.group });
    LUMO.ui.bubbles.update();
  });
  await sleep(400);
  await frames(page, 3);
  await shot(page, 'b20_dialog_blase');
  await page.evaluate(() => {
    LUMO.ui.bubbles.clear();
    window.__ask = LUMO.ui.ask({ prompt: 'Was sagst du?', items: [
      { id: 'hi', label: 'Moien. Ich bin neu.', icon: 'hand' },
      { id: 'turm', label: 'Was ist mit dem Turm?', icon: 'frage' },
      { id: 'still', label: 'Einfach dazusetzen.', icon: 'herz', tone: 'ruhig' },
      { id: 'boot', label: 'Zeig mir das Boot.', icon: 'boot' },
    ] });
  });
  await sleep(400);
  await frames(page, 3);
  await shot(page, 'b21_dialog_kacheln');
  await page.evaluate(() => { LUMO.events.emit('dialogue:choose', { index: 0 }); LUMO.ui.choices.close && LUMO.ui.choices.close(); LUMO.cameraRig.setMode(null); LUMO.debug.advance(0.3); });

  // Figur nah mit Aura
  await page.evaluate(() => {
    const r = LUMO.cameraRig;
    r.targetDist = 3.0; r.pitch = 0.05; r.lookOffsetY = 1.3; r.yaw = LUMO.player.yaw + 0.4;
    LUMO.player.humanoid.setEmotionAura('#ffd23f');
    LUMO.debug.advance(0.8); r.snap();
  });
  await frames(page, 3);
  await shot(page, 'b30_figur_nah_aura');
  await page.evaluate(() => { LUMO.player.humanoid.setEmotionAura(null); window.__npc && window.__npc.remove(); });

  // Pause-Menü und Tagebuch
  await page.evaluate(() => { LUMO.cameraRig.targetDist = 8.5; LUMO.cameraRig.pitch = 0.24; LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); LUMO.ui.pauseMenu.open(); });
  await sleep(400);
  await frames(page, 3);
  await shot(page, 'b40_pause');
  await page.evaluate(() => { LUMO.ui.overlay.closeAll('x'); LUMO.ui.journal.open(); });
  await sleep(500);
  await frames(page, 3);
  await shot(page, 'b41_tagebuch');
  await page.evaluate(() => { LUMO.ui.overlay.closeAll('x'); });

  // Kraft-Rad
  await page.evaluate(() => { LUMO.input.press('power'); LUMO.debug.advance(0.4); });
  await sleep(300);
  await frames(page, 3);
  await shot(page, 'b42_kraftrad');
  await page.evaluate(() => { LUMO.input.release('power'); LUMO.debug.advance(0.2); });

  console.log('Statistik:', JSON.stringify(await page.evaluate(() => LUMO.debug.stats())));
  console.log('Fehler:', errors.length, errors.slice(0, 5).join('\n'));
  await context.close();
} catch (e) {
  console.error(e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
console.log('Fertig');

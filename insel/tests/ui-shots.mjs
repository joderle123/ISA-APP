// Oberflächen-Bildserie (Stil-Bibel §11, §15): Titel, HUD mit Zonen-Banner und Toast, Glimm-Zeile, Sprechblase (frei und
// verankert), Kacheln, Pause, Tagebuch-Seiten, Kraft-Rad, Recap, Lagerfeuer, Intro-Titel, Fotomodus, Hochformat.
// Aufruf: SHOTS=<Ordner> Q=medium node tests/ui-shots.mjs
import { launch, openGame, frames, shot, IPAD_LANDSCAPE, IPAD_PORTRAIT } from './lib.mjs';

const Q = process.env.Q || 'medium';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await launch();
try {
  // ---- Titel / Ladebildschirm ----
  {
    const { page, context } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}`, waitReady: true });
    await page.waitForFunction(() => !document.getElementById('boot-start').classList.contains('is-hidden'), null, { timeout: 60000 });
    await frames(page, 3);
    await shot(page, 'u00_titel');
    await context.close();
  }
  {
    const { page, context } = await openGame(browser, { viewport: IPAD_PORTRAIT, query: `q=${Q}`, waitReady: true });
    await page.waitForFunction(() => !document.getElementById('boot-start').classList.contains('is-hidden'), null, { timeout: 60000 });
    await frames(page, 3);
    await shot(page, 'u20_titel_hoch');
    await context.close();
  }

  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await page.waitForFunction(() => LUMO.started, null, { timeout: 60000 });
  await page.evaluate(() => { document.getElementById('boot')?.remove(); LUMO.debug.freezeTime(true); LUMO.debug.setTimeOfDay(17.3); LUMO.debug.advance(0.8); LUMO.cameraRig.snap(); });
  await frames(page, 3);

  // HUD mit Zonen-Banner, Toast, Aktionspille
  await page.evaluate(() => { LUMO.ui.toast('Ein Stück Karte mehr.', 8000); LUMO.ui.setAction('Reden', () => {}); LUMO.ui.setPower({ enabled: true, label: 'Blick' }); });
  await frames(page, 2);
  await page.evaluate(() => { LUMO.ui.showZone('Hafen-Dorf', 'Willkommen auf der Insel!', 'Du bist angekommen'); });
  await sleep(750);
  await frames(page, 2);
  await shot(page, 'u01_hud');
  await page.evaluate(() => { LUMO.ui.setAction(null); });

  // Glimm-Zeile
  await page.evaluate(() => { LUMO.ui.glimm('Regeln. Gähn. Okay, die war gut.', { seconds: 8 }); });
  await sleep(400);
  await frames(page, 3);
  await shot(page, 'u02_glimm');

  // Intro-Titel über der Welt
  await page.evaluate(() => { LUMO.ui.showIntro(true); });
  await sleep(1500);
  await frames(page, 3);
  await shot(page, 'u03_intro_titel');
  await page.evaluate(() => { LUMO.ui.showIntro(false); });

  // Dialog: verankerte Blase (Gesprächs-Kamera), dann Kacheln
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
  await shot(page, 'u04_blase_verankert');
  await page.evaluate(() => {
    LUMO.ui.bubbles.clear();
    window.__ask = LUMO.ui.ask({ prompt: 'Was sagst du?', items: [
      { id: 'hi', label: 'Moien. Ich bin neu.', icon: 'hand' },
      { id: 'turm', label: 'Was ist mit dem Turm?', icon: 'frage' },
      { id: 'still', label: 'Einfach dazusetzen.', icon: 'herz', tone: 'ruhig' },
      { id: 'boot', label: 'Zeig mir das Boot.', icon: 'boot', tone: 'fest' },
    ] });
  });
  await sleep(400);
  await frames(page, 3);
  await shot(page, 'u05_kacheln');
  await page.evaluate(() => { LUMO.events.emit('dialogue:choose', { index: 0 }); LUMO.cameraRig.setMode(null); LUMO.debug.advance(0.3); window.__npc && window.__npc.remove(); });
  // Freie Blase (Erzähler) unten
  await page.evaluate(() => { LUMO.cameraRig.targetDist = 8.5; LUMO.cameraRig.pitch = 0.24; LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); window.__dlg2 = LUMO.ui.say({ who: 'ilda', text: 'Moien. Willkommen an Bord.' }); });
  await sleep(400);
  await frames(page, 3);
  await shot(page, 'u06_blase_frei');
  await page.evaluate(() => { LUMO.ui.bubbles.clear(); });

  // Pause und Tagebuch-Seiten
  await page.evaluate(() => { LUMO.debug.unlockUnit('j1-e11'); LUMO.debug.completeUnit('j1-e03'); LUMO.state.set('shards', [1, 2]); LUMO.ui.pauseMenu.open(); });
  await sleep(400);
  await frames(page, 3);
  await shot(page, 'u07_pause');
  for (const id of ['karte', 'auftraege', 'skillspass', 'koffer', 'stil', 'code', 'einstellungen']) {
    await page.evaluate((id) => { LUMO.ui.overlay.closeAll('x'); LUMO.ui.journal.open(id); }, id);
    await sleep(500);
    await frames(page, 3);
    await shot(page, `u08_tagebuch_${id}`);
  }
  await page.evaluate(() => { LUMO.ui.overlay.closeAll('x'); });

  // Recap und Lagerfeuer
  await page.evaluate(() => { window.__recap = LUMO.ui.demo.recap(); });
  await sleep(1500);
  await frames(page, 3);
  await shot(page, 'u09_recap');
  await page.evaluate(() => { LUMO.ui.overlay.closeAll('go'); window.__cf = LUMO.ui.demo.campfire(); });
  await sleep(500);
  await frames(page, 3);
  await shot(page, 'u10_lagerfeuer');
  await page.click('[data-cf-next]'); await sleep(350);
  await page.click('[data-cf-next]'); await sleep(500);
  await frames(page, 3);
  await shot(page, 'u11_bester_moment');
  await page.evaluate(() => { LUMO.ui.overlay.closeAll('x'); });
  await sleep(300);

  // Bestätigung
  await page.evaluate(() => { window.__c = LUMO.ui.overlay.confirm({ title: 'Wirklich gehen?', text: 'Dein Fortschritt bleibt gespeichert.', yes: 'Ja, gehen', no: 'Bleiben' }); });
  await sleep(400);
  await frames(page, 3);
  await shot(page, 'u12_bestaetigung');
  await page.evaluate(() => { LUMO.ui.overlay.closeAll('x'); });

  // Kraft-Rad
  await page.evaluate(() => { LUMO.debug.grantAbility && LUMO.debug.grantAbility('blick'); LUMO.input.press('power'); LUMO.debug.advance(0.4); });
  await sleep(300);
  await frames(page, 3);
  await shot(page, 'u13_kraftrad');
  await page.evaluate(() => { LUMO.input.release('power'); LUMO.debug.advance(0.2); });

  // Fotomodus
  await page.evaluate(() => { const B = LUMO.plugins.bewegung; if (B && B.photomode) B.photomode.enter(); });
  await sleep(400);
  await frames(page, 3);
  await shot(page, 'u14_fotomodus');
  await page.evaluate(() => { const B = LUMO.plugins.bewegung; if (B && B.photomode) B.photomode.exit(); });

  console.log('Fehler:', errors.length, errors.slice(0, 5).join('\n'));
  await context.close();

  // ---- Hochformat ----
  const P = await openGame(browser, { viewport: IPAD_PORTRAIT, query: `q=${Q}&skipintro&autostart` });
  await P.page.waitForFunction(() => LUMO.started, null, { timeout: 60000 });
  await P.page.evaluate(() => { document.getElementById('boot')?.remove(); LUMO.debug.freezeTime(true); LUMO.debug.setTimeOfDay(17.3); LUMO.debug.advance(0.8); LUMO.cameraRig.snap(); LUMO.ui.showZone('Hafen-Dorf', 'Willkommen auf der Insel!', 'Du bist angekommen'); LUMO.ui.setAction('Reden', () => {}); });
  await sleep(600);
  await frames(P.page, 3);
  await shot(P.page, 'u21_hud_hoch');
  await P.page.evaluate(() => { LUMO.ui.setAction(null); LUMO.ui.say({ who: 'tun', text: 'Ey, neu hier? Ich film das.' }); LUMO.ui.ask({ prompt: 'Was sagst du?', items: [{ id: 'a', label: 'Lass das.', icon: 'stopp', tone: 'fest' }, { id: 'b', label: 'Haha, okay.', icon: 'sonne' }, { id: 'c', label: 'Warum?', icon: 'frage' }] }); });
  await sleep(400);
  await frames(P.page, 3);
  await shot(P.page, 'u22_dialog_hoch');
  await P.page.evaluate(() => { LUMO.events.emit('dialogue:choose', { index: 0 }); LUMO.ui.bubbles.clear(); LUMO.ui.journal.open('karte'); });
  await sleep(500);
  await frames(P.page, 3);
  await shot(P.page, 'u23_tagebuch_hoch');
  await P.page.evaluate(() => { LUMO.ui.overlay.closeAll('x'); LUMO.ui.pauseMenu.open(); });
  await sleep(400);
  await frames(P.page, 3);
  await shot(P.page, 'u24_pause_hoch');
  console.log('Fehler (hoch):', P.errors.length, P.errors.slice(0, 5).join('\n'));
  await P.context.close();
} catch (e) {
  console.error(e);
  process.exitCode = 1;
} finally {
  await browser.close();
}
console.log('Fertig');

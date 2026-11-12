/* Test: Partyspiele („Schnell & lustig“) im Spiel-Modus – jedes Spiel läuft im Auto-Modus bis zum Endbild,
   das Endbild zeigt Punkte und Crew-Rekord, „Nochmal“ ist der Hauptknopf, der Rekord wird gespeichert und steht
   danach auf der Kachel. Keine Erklärkarte, keine Nachbesprechung.
   Aufruf:  node crew/build.js && node crew/tests/party.mjs */
import { createRequire } from 'module';
import { DIST, VIEWPORTS, layoutCheck, shot } from './lib.mjs';

const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }

const problems = [];
const expect = (cond, msg) => { if (!cond) problems.push(msg); };
const PARTY = ['zuendschnur', 'geheimauftrag', 'zwei-wahrheiten', 'notfall-pitch', 'sags-mal-so', 'gleicher-kopf', 'nicht-zucken', 'fehler-im-bild', 'treffer', 'seitenwechsel', 'jagd',
  'kritzel-blitz', 'verboten', 'ohne-worte', 'tauziehen', 'blink-kette', 'zehn-sekunden'];

for (const [name, vp] of [['ipadLandscape', VIEWPORTS.ipadLandscape], ['handy', { width: 390, height: 780 }]]) {
  const browser = await pw.chromium.launch();
  const context = await browser.newContext({ viewport: vp, hasTouch: true, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.addInitScript(() => { const _st = window.setTimeout; window.__fast = true; window.setTimeout = (fn, ms, ...a) => _st(fn, Math.min(ms || 0, 250), ...a); });
  await page.goto('file://' + DIST);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.evaluate(() => window.CREW.debug.found('Test Crew', 'arena'));
  await page.waitForTimeout(150);

  const ids = await page.evaluate(() => window.CREW.games.list().filter((g) => g.theme === 'party').map((g) => g.id));
  expect(PARTY.every((id) => ids.includes(id)) && ids.length === PARTY.length, `${name}: erwartet ${PARTY.length} Partyspiele, gefunden ${ids.length}`);

  for (const id of PARTY) {
    const tag = name + ':' + id;
    await page.evaluate((id) => window.CREW.debug.startGame(id, { auto: true, autoEndWait: 700 }), id);
    await page.locator('.game-screen[data-game="' + id + '"]').first().waitFor({ timeout: 5000 });
    expect(await page.locator('.warum-card').count() === 0, `${tag}: Erklärkarte im Spiel-Modus`);
    let rekordGesehen = false, nochmal = false, mitte = false;
    const t0 = Date.now();
    for (let i = 0; i < 900; i++) {
      const st = await page.evaluate(() => window.CREW.debug.gameStatus());
      if (!rekordGesehen && await page.locator('#p-rekord').count()) {
        rekordGesehen = true;
        nochmal = (await page.locator('#btn-nochmal').count()) === 1;
        if (name === 'ipadLandscape') await shot(page, 'party-' + id + '-ende', 60);
        problems.push(...await layoutCheck(page, tag + '-ende'));
      }
      if (!mitte && i === 6) { mitte = true; if (name === 'ipadLandscape') await shot(page, 'party-' + id + '-mitte', 0); problems.push(...await layoutCheck(page, tag + '-mitte')); }
      if (st.done && st.done.id === id) { expect(st.done.ok, `${tag}: Fehler: ${st.done.error}`); break; }
      if (!st.running) { problems.push(`${tag}: läuft nicht mehr, aber kein Ergebnis`); break; }
      await page.waitForTimeout(40);
      if (Date.now() - t0 > 60000) { problems.push(`${tag}: Zeitüberschreitung`); break; }
    }
    expect(rekordGesehen, `${tag}: Endbild ohne Punkte/Crew-Rekord`);
    expect(nochmal, `${tag}: „Nochmal“ fehlt auf dem Endbild`);
    expect(await page.locator('.nach-screen, [data-nach]').count() === 0, `${tag}: Nachbesprechung im Spiel-Modus`);
    const rek = await page.evaluate((id) => (window.CREW.state.spielRekorde || {})[id] || null, id);
    expect(rek && typeof rek.best === 'number' && rek.n >= 1, `${tag}: Rekord nicht gespeichert`);
    await page.locator('#btn-finder').waitFor({ timeout: 5000 }).catch(() => problems.push(`${tag}: nach dem Spiel nicht im Spiele-Hub`));
  }
  // Hub: Partyspiele oben, Rekord auf der Kachel
  await page.evaluate(() => window.CREW.games.renderHub());
  await page.locator('.hub-theme').first().waitFor();
  expect((await page.locator('.hub-theme').first().getAttribute('data-theme')) === 'party', `${name}: „Schnell & lustig“ steht nicht oben`);
  expect(await page.locator('.hub-party .hub-tile').count() === PARTY.length, `${name}: Kacheln der Partyspiele fehlen`);
  expect(await page.locator('.hub-party .t-rek').count() === PARTY.length, `${name}: Rekord steht nicht auf den Kacheln`);
  if (name === 'ipadLandscape') await shot(page, 'party-hub');
  problems.push(...await layoutCheck(page, name + '-hub'));
  expect(errors.length === 0, `${name}: Seitenfehler: ${errors.slice(0, 3).join(' | ')}`);
  await browser.close();
}
if (problems.length) { console.log('PROBLEME:\n' + problems.join('\n')); process.exit(1); }
console.log('party :: ' + PARTY.length + ' Spiele auf 2 Bildschirmgrößen, 0 Probleme');

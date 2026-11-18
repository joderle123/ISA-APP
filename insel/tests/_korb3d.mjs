// Basketball am echten Korb (korb3d.js): Würfe mit Maus-Halten, Bilder. node tests/_korb3d.mjs ORDNER [quer|handy] [frei|dreier|horse]
import { launch } from './lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'lycee.html');
const [OUT, TAG = 'quer', MODUS = 'frei'] = process.argv.slice(2);
const vp = TAG === 'handy' ? { width: 390, height: 844 } : { width: 1180, height: 820 };
const browser = await launch();
const ctx = await browser.newContext({ viewport: vp, hasTouch: TAG === 'handy' }); const page = await ctx.newPage();
page.setDefaultTimeout(90000);
const fehler = []; page.on('pageerror', (e) => fehler.push(String(e)));
await page.goto('file://' + DIST + '?test&start=1&figur=1');
await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && LYCEE.ui && LYCEE.teleport);
for (let i = 0; i < 80 && await page.evaluate(() => LYCEE.imGespraech || !!document.querySelector('.ly-ebene:not([hidden])')); i++) {
  const w = await page.evaluate(() => { const b = document.querySelector('.ly-ebene:not([hidden]) [data-a="w"]'); if (b) { b.click(); return true; } return false; });
  if (!w) await page.keyboard.press('KeyE'); await page.waitForTimeout(200);
}
await page.evaluate((p) => LYCEE.teleport(p), process.env.WO === 'halle' ? { x: 42, z: -18 } : { x: 29, z: 13 });
await page.waitForTimeout(800);
await page.evaluate((m) => { window.__t = null; LYCEE.ui.freiwurf({ modus: m }).then((t) => { window.__t = t; }); }, MODUS);
await page.waitForSelector('.ly-wurf');
await page.waitForTimeout(1200);
await page.screenshot({ path: join(OUT, 'korb-' + TAG + '-' + MODUS + '-start.png') });
const halte = [830, 830, 500, 1150, 830, 830, 830, 830, 830, 830];
for (let w = 0; w < 10; w++) {
  if (await page.evaluate(() => window.__t !== null || !document.querySelector('.ly-wurf'))) break;
  await page.waitForTimeout(MODUS === 'horse' ? 4200 : 2600);
  const x = vp.width / 2, y = vp.height * 0.6;
  await page.mouse.move(x, y); await page.mouse.down();
  await page.waitForTimeout(Math.max(0, halte[w] - 200));
  await page.mouse.move(x + (w === 4 ? 120 : 0), y - 160, { steps: 3 });
  await page.waitForTimeout(150);
  if (w === 0) await page.screenshot({ path: join(OUT, 'korb-' + TAG + '-' + MODUS + '-halten.png') });
  await page.mouse.up();
  await page.waitForTimeout(450);
  if (w === 0) await page.screenshot({ path: join(OUT, 'korb-' + TAG + '-' + MODUS + '-flug.png') });
  await page.waitForTimeout(500);
  if (w === 0) await page.screenshot({ path: join(OUT, 'korb-' + TAG + '-' + MODUS + '-flug2.png') });
  console.log('wurf', w, await page.$eval('.ly-wurf-kopf span', (e) => e.textContent).catch(() => '-'), '|', await page.$eval('.ly-wurf-msg', (e) => e.textContent).catch(() => '-'));
}
await page.waitForFunction(() => window.__t !== null, null, { timeout: 40000 }).catch(() => console.log('kein Ergebnis'));
console.log(TAG, MODUS, 'Treffer', await page.evaluate(() => window.__t), 'Runde', await page.evaluate(() => JSON.stringify(LYCEE.ui.letzteRunde || null)), 'HUD weg', await page.evaluate(() => !document.querySelector('.ly-wurf')), 'Fehler', fehler);
await browser.close();

// Lese-Ecke (CDI) und Basketball auf dem Handy: öffnen, blättern, Bilder machen. node tests/_lesen.mjs ORDNER
import { launch } from './lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'lycee.html');
const OUT = process.argv[2];
const browser = await launch();
for (const [tag, vp] of [['handy', { width: 390, height: 844 }], ['quer', { width: 1180, height: 820 }]]) {
  const ctx = await browser.newContext({ viewport: vp, hasTouch: tag === 'handy' }); const page = await ctx.newPage();
  page.setDefaultTimeout(60000);
  const fehler = []; page.on('pageerror', (e) => fehler.push(String(e)));
  await page.goto('file://' + DIST + '?test&start=1&figur=1');
  await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && LYCEE.ia);
  for (let i = 0; i < 60 && await page.evaluate(() => LYCEE.imGespraech || !!document.querySelector('.ly-ebene:not([hidden])')); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(200); }
  page.evaluate(() => LYCEE.aktion(LYCEE.ia.liste.find((x) => x.tu === 'buch')));
  await page.waitForSelector('.le-regal');
  await page.screenshot({ path: join(OUT, 'lesen-' + tag + '-regal.png') });
  await page.click('.le-regal [data-h="0"]');
  await page.waitForSelector('.le-heft');
  await page.click('.le-heft [data-a="w"]');
  await page.screenshot({ path: join(OUT, 'lesen-' + tag + '-comic.png') });
  for (let i = 0; i < 8 && await page.$('.le-heft'); i++) await page.keyboard.press('KeyE');
  await page.click('.le-regal [data-h="4"]');
  await page.screenshot({ path: join(OUT, 'lesen-' + tag + '-geschichte.png') });
  await page.keyboard.press('Escape'); await page.waitForTimeout(200); await page.keyboard.press('Escape');
  await page.waitForTimeout(800);
  console.log(tag, 'gelesen', await page.evaluate(() => LYCEE.zustand.merke.gelesen), 'offen', await page.evaluate(() => !!document.querySelector('.ly-ebene:not([hidden])')));
  if (tag === 'handy') { page.evaluate(() => { LYCEE.ui.freiwurf(); }); await page.waitForSelector('canvas.ly-bb'); await page.waitForTimeout(600); await page.screenshot({ path: join(OUT, 'basket-handy-neu.png') }); }
  console.log(tag, 'Fehler', fehler);
  await ctx.close();
}
await browser.close();

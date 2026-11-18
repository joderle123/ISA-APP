import { launch } from './lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'lycee.html');
const OUT = process.argv[2];
const browser = await launch();
const NUR = process.argv[3], MODUS = process.argv[4] || 'frei';
for (const [tag, vp] of [['quer', { width: 1180, height: 820 }], ['handy', { width: 390, height: 844 }]].filter(([t]) => !NUR || t === NUR)) {
  const ctx = await browser.newContext({ viewport: vp, hasTouch: tag === 'handy' }); const page = await ctx.newPage();
  page.setDefaultTimeout(60000);
  const fehler = []; page.on('pageerror', (e) => fehler.push(String(e)));
  await page.goto('file://' + DIST + '?test&start=1&figur=1');
  await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && LYCEE.ui);
  for (let i = 0; i < 60 && await page.evaluate(() => LYCEE.imGespraech || !!document.querySelector('.ly-ebene:not([hidden])')); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(200); }
  console.log(tag, 'start'); await page.evaluate((m) => { window.__fw = null; LYCEE.ui.freiwurf({ modus: m }).then((t) => { window.__fw = t; }); }, MODUS);
  await page.waitForSelector('canvas.ly-bb');
  const box = await page.$eval('canvas.ly-bb', (c) => { c.scrollIntoView({ block: 'center' }); const r = c.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  const P = (x, y) => ({ x: box.x + x / 520 * box.w, y: box.y + y / 420 * box.h });
  for (let w = 0; w < (MODUS === 'horse' ? 10 : 5); w++) {
    const da = await page.waitForFunction(() => window.__fw !== null || document.querySelector('canvas.ly-bb')?.dataset.bereit === '1', null, { timeout: 20000 }).then(() => page.evaluate(() => window.__fw === null), async () => { console.log('HÄNGT', fehler, await page.$eval('canvas.ly-bb', (c) => c.dataset.zustand), await page.evaluate(() => new Promise((r) => setTimeout(() => r(document.querySelector('canvas.ly-bb').dataset.zustand + ' perf ' + Math.round(performance.now())), 1000))), await page.$eval('.ly-fw-stand', (e) => e.textContent)); return false; });
    if (!da) break;
    const a = P(260, 372), b = P(260 + (w === 3 ? 60 : 0), 240);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    await page.waitForTimeout(w === 4 ? 300 : 790);
    await page.mouse.move(b.x, b.y, { steps: 4 });
    if (w === 1) await page.screenshot({ path: join(OUT, 'basket-' + tag + '-' + MODUS + '-halten.png') });
    await page.mouse.up();
    console.log(tag, 'wurf', w, 'gezählt', await page.$eval('canvas.ly-bb', (c) => c.dataset.wurf));
    await page.waitForTimeout(900);
    if (w === 0) await page.screenshot({ path: join(OUT, 'basket-' + tag + '-flug.png') });
  }
  await page.waitForFunction(() => window.__fw !== null, null, { timeout: 20000 }).catch((e) => console.log('timeout', String(e).slice(0, 80)));
  console.log(tag, MODUS, 'Treffer', await page.evaluate(() => window.__fw), 'Runde', await page.evaluate(() => JSON.stringify(LYCEE.ui.letzteRunde || null)), 'Fehler', fehler);
  await ctx.close();
}
await browser.close();

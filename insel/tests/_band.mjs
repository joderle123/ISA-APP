import { launch } from './lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'lycee.html');
const OUT = process.argv[2];
const browser = await launch();
for (const [tag, vp] of [['quer', { width: 1180, height: 820 }], ['handy', { width: 390, height: 844 }]]) {
  const page = await (await browser.newContext({ viewport: vp, hasTouch: tag === 'handy' })).newPage();
  page.setDefaultTimeout(240000);
  const fehler = []; page.on('pageerror', (e) => fehler.push(String(e)));
  await page.goto('file://' + DIST + '?test&start=1&figur=1');
  await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && LYCEE.ia);
  for (let i = 0; i < 40 && await page.evaluate(() => LYCEE.imGespraech); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(150); }
  page.evaluate(() => LYCEE.aktion(LYCEE.ia.liste.find((x) => x.tu === 'schlagzeug')));
  await page.waitForSelector('.ly-bp-knoepfe');
  const t0 = Date.now();
  await page.waitForTimeout(3500);
  await page.screenshot({ path: join(OUT, 'band-' + tag + '.png') });
  // perfekt im Takt: jede Note genau zur richtigen Zeit (im Browser geplant)
  await page.evaluate(() => { const b = window.__band; const code = ['Digit1', 'Digit2', 'Digit3'];
    for (const n of b.noten) { const ms = (b.start() + n.zeit) * 1000 - performance.now(); setTimeout(() => document.dispatchEvent(new KeyboardEvent('keydown', { code: code[n.sp], bubbles: true })), Math.max(0, ms)); } });
  await page.waitForFunction(() => !document.querySelector('.ly-bp-knoepfe'), null, { timeout: 60000 });
  const r = await page.evaluate(() => ({ rekord: LYCEE.zustand.merke.bandRekord, mal: LYCEE.zustand.merke.bandMal, toast: document.querySelector('.ly-toasts').textContent }));
  console.log(tag, 'Dauer', Math.round((Date.now() - t0) / 1000), 's', JSON.stringify(r), 'Fehler', fehler.length);
}
await browser.close();

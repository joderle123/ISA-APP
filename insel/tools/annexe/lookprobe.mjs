// Annexe Junglinster – Look-Probe: dieselbe Szene (Hof am Nachmittag, Figuren am Brunnen) als Vorher, A Comic, B Skizzenbuch,
// C Weich – und alles zusammen als ein Vergleichsbild.
// Aufruf (aus insel/): node tools/annexe/lookprobe.mjs ORDNER [--groesse=1180x820]
import { launch } from '../../tests/lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, mkdirSync } from 'node:fs';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist', 'lycee.html');
const [OUT] = process.argv.slice(2);
const [W, H] = (process.argv.find((a) => a.startsWith('--groesse=')) || '--groesse=1180x820').slice(10).split('x').map(Number);
mkdirSync(OUT, { recursive: true });
const LOOKS = [['aus', 'Vorher'], ['comic', 'A · Comic'], ['skizze', 'B · Skizzenbuch'], ['weich', 'C · Weich']];
const browser = await launch();
for (const [look] of LOOKS) {
  const page = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage();
  page.setDefaultTimeout(240000);
  await page.goto('file://' + DIST + '?test&start=1&figur=1&q=high&look=' + look);
  await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && LYCEE.steuerung);
  await page.evaluate(() => LYCEE.springe('k4_baecker'));
  await page.waitForTimeout(1500);
  for (let i = 0; i < 40 && await page.evaluate(() => LYCEE.imGespraech); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(120); }
  await page.addStyleTag({ content: '.ly-dialog,.ly-ebene,.ly-auftrag,.ly-knoepfe,.ly-uhr,.ly-raum,.ly-hinweis,.ly-toasts,.ly-bingo,.ly-debug{display:none!important}' });
  await page.evaluate(() => {
    LYCEE.teleport({ x: -4.3, z: 10.9 }, -0.94); const c = LYCEE.steuerung.cam; c.yaw = -0.94; c.pitch = 0.1; c.ziel = 3.6;
    LYCEE.sky.time.setTimeOfDay(15.5);
  });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: join(OUT, 'look-' + look + '.png') });
  console.log(look, 'ok');
  await page.close();
}
// Vergleichsbild: 2×2 mit Beschriftung
const b64 = (f) => 'data:image/png;base64,' + readFileSync(join(OUT, f)).toString('base64');
const page = await (await browser.newContext({ viewport: { width: W, height: H + 120 }, deviceScaleFactor: 1 })).newPage();
await page.setContent('<html><body style="margin:0;background:#1d2433;font:700 22px system-ui;color:#fff7e8">' +
  '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px">' +
  LOOKS.map(([l, t]) => '<figure style="margin:0;position:relative"><img src="' + b64('look-' + l + '.png') + '" style="width:100%;display:block;border-radius:6px"><figcaption style="position:absolute;left:10px;top:8px;background:#e8743b;padding:4px 12px;border-radius:999px">' + t + '</figcaption></figure>').join('') +
  '</div><div style="padding:0 14px 10px;font-weight:500;font-size:16px;opacity:.85">Annexe Junglinster · Look-Probe · Hof am Nachmittag · gleiche Szene, gleiche Kamera</div></body></html>');
await page.waitForTimeout(500);
await page.screenshot({ path: join(OUT, 'look-vergleich.png'), fullPage: true });
await browser.close();
console.log('fertig: ' + join(OUT, 'look-vergleich.png'));

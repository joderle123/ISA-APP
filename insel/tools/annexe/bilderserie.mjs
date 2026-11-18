// Annexe Junglinster – Bilderserie für die Grafik-Durchsicht (feste Kamerapositionen, Figuren nah, Übersicht).
// Aufruf (aus insel/): node tools/annexe/bilderserie.mjs ORDNER TAG
import { launch } from '../../tests/lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist', 'lycee.html');
const [OUT, TAG = 'b'] = process.argv.slice(2);
const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1180, height: 760 } })).newPage();
page.setDefaultTimeout(90000);
await page.goto('file://' + DIST + '?test&start=1&figur=1');
await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && LYCEE.ui);
for (let i = 0; i < 40 && await page.evaluate(() => LYCEE.imGespraech); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(150); }
// Pause-Schritt (viele Leute auf dem Hof)
await page.evaluate(() => LYCEE.springe('pause'));
await page.waitForTimeout(2500);
for (let i = 0; i < 20 && await page.evaluate(() => LYCEE.imGespraech || !!LYCEE.ui.ebeneArt()); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(250); }
const BLICKE = [
  ['hof-oben', [0, 22, 46], [0, 0, 12]],
  ['hof-auge', [6, 1.7, 30], [-4, 1.4, 14]],
  ['brunnen-nah', [-10, 1.6, 26], [-13.5, 1.2, 21.5]],
  ['figur-nah', null, null],
  ['gang', [10, 1.7, -15.2], [-8, 1.5, -16.6]],
  ['kantine', [26, 2.2, -4], [14, 1, -12]],
  ['saal', [-18, 2.4, -19.5], [-24, 1, -27]],
  ['skate', [-24, 3, 20], [-36, 0.5, 11]],
  ['eingang', [0, 2.2, 14], [0, 3, -2]],
  ['innenhof', [-4, 3, -36], [-14, 1, -46]],
];
await page.evaluate(() => { LYCEE.steuerung.kameraAus = true; });
for (const [n, pos, ziel] of BLICKE) {
  if (n === 'figur-nah') {
    await page.evaluate(() => { const l = LYCEE.leute; const id = Object.keys(l).find((k) => l[k].f.group.visible) || 'mila'; const p = l[id].pos; LYCEE.camera.position.set(p.x + 1.6, 1.55, p.z + 1.2); LYCEE.camera.lookAt(p.x, 1.25, p.z); });
  } else await page.evaluate(([p, z]) => { LYCEE.camera.position.set(...p); LYCEE.camera.lookAt(...z); }, [pos, ziel]);
  await page.waitForTimeout(1600);
  await page.screenshot({ path: join(OUT, TAG + '-' + n + '.png') });
}
await browser.close();

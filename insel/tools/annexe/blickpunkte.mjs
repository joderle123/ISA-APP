// Annexe Junglinster – acht feste Blickpunkte für Vorher-nachher-Bilder, mit Messwerten.
// Aufruf (aus insel/): node tools/annexe/blickpunkte.mjs ORDNER TAG [--q=high|medium|low] [--groesse=1180x820]
// Ergebnis: ORDNER/TAG-<ort>.png und ORDNER/TAG-messwerte.json (Zeichenaufrufe, Dreiecke je Blick, Startzeit, Dateigröße).
// Hinweis: Im Headless-Browser läuft die Grafik in Software – Bilder pro Sekunde sind dort NICHT aussagekräftig.
import { launch } from '../../tests/lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { statSync, writeFileSync, mkdirSync } from 'node:fs';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist', 'lycee.html');
const [OUT, TAG] = process.argv.slice(2);
const q = (process.argv.find((a) => a.startsWith('--q=')) || '--q=high').slice(4);
const [W, H] = (process.argv.find((a) => a.startsWith('--groesse=')) || '--groesse=1180x820').slice(10).split('x').map(Number);
mkdirSync(OUT, { recursive: true });

// [name, x, z, yaw, pitch, abstand, uhr] – yaw: Blickrichtung (0 = +z)
export const BLICKE = [
  ['hof', 0, 6, 0.35, 0.22, 6, 15.5],
  ['skate', -29.5, 7.5, -0.98, 0.2, 5, 15.5],
  ['bus', -13.5, 37.5, -0.95, 0.18, 5, 7.6],
  ['gang', -5, -15.5, -1.5708, 0.12, 3.4, 10],
  ['saal', -16.6, -24, -1.5708, 0.25, 3.4, 9],
  ['kantine', 14, -6, 1.84, 0.2, 3.4, 12.3],
  ['werkstatt', -45, -2.5, -2.55, 0.22, 3.4, 10],
  ['bibliothek', -12, -20, 2.36, 0.2, 3.4, 10],
];

const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage();
page.setDefaultTimeout(240000);
const fehler = []; page.on('pageerror', (e) => fehler.push(String(e)));
const t0 = Date.now();
await page.goto('file://' + DIST + '?test&start=1&figur=1&q=' + q);
await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && LYCEE.steuerung);
const startMs = Date.now() - t0;
for (let i = 0; i < 40 && await page.evaluate(() => !!document.querySelector('.ly-dialog:not([hidden])')); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(120); }
await page.addStyleTag({ content: '.ly-dialog,.ly-ebene,.ly-auftrag,.ly-knoepfe,.ly-uhr,.ly-raum,.ly-hinweis,.ly-toasts,.ly-bingo,.ly-debug{display:none!important}' });
const werte = { tag: TAG, qualitaet: q, groesse: W + 'x' + H, startMs, dateiMB: +(statSync(DIST).size / 1048576).toFixed(2), blicke: {} };
for (const [n, x, z, yaw, pitch, dist, uhr] of BLICKE) {
  await page.evaluate(([x, z, yaw, pitch, dist, uhr]) => {
    LYCEE.teleport({ x, z }, yaw); const c = LYCEE.steuerung.cam; c.yaw = yaw; c.pitch = pitch; c.ziel = dist;
    if (LYCEE.sky && LYCEE.sky.time && LYCEE.sky.time.setTimeOfDay) LYCEE.sky.time.setTimeOfDay(uhr);
  }, [x, z, yaw, pitch, dist, uhr]);
  await page.waitForTimeout(2500);
  const info = await page.evaluate(() => { const r = LYCEE.rr && LYCEE.rr.renderer; if (!r) return null; r.info.reset(); return new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(() => ok({ calls: r.info.render.calls, dreiecke: r.info.render.triangles, geometrien: r.info.memory.geometries, texturen: r.info.memory.textures })))); });
  werte.blicke[n] = info;
  await page.screenshot({ path: join(OUT, TAG + '-' + n + '.png') });
  console.log(n.padEnd(11), JSON.stringify(info));
}
werte.fehler = fehler.slice(0, 5);
writeFileSync(join(OUT, TAG + '-messwerte.json'), JSON.stringify(werte, null, 1));
console.log('Start ' + startMs + ' ms · Datei ' + werte.dateiMB + ' MB · Fehler ' + fehler.length);
await browser.close();

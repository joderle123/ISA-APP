// Annexe Junglinster – jedes Kapitel per Autoplay (?debug, „Durchspielen“) bis zum Ende laufen lassen.
// Aufruf (aus insel/): node tools/annexe/durchspielen.mjs [kapitel …] [--wahl=zufall|0|letzte] [--bilder=ORDNER]
// Bericht: je Kapitel Schritte, Zeit, ob das Ende erreicht wurde, Konsolenfehler. Hängt ein Schritt > 90 s, wird er gemeldet.
import { launch } from '../../tests/lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist', 'lycee.html');
const args = process.argv.slice(2);
const wahl = (args.find((a) => a.startsWith('--wahl=')) || '--wahl=zufall').slice(7);
const bilder = (args.find((a) => a.startsWith('--bilder=')) || '').slice(9);
const KAP = args.filter((a) => /^\d+$/.test(a)).map(Number);
const browser = await launch();
let gesamtFehler = 0;
for (const kap of KAP.length ? KAP : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
  const page = await (await browser.newContext({ viewport: { width: 1000, height: 640 } })).newPage();
  page.setDefaultTimeout(120000);
  const fehler = []; page.on('pageerror', (e) => fehler.push(String(e))); page.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text()); });
  await page.goto('file://' + DIST + '?test&start=1&figur=1&debug');
  await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && document.querySelector('.ly-debug select[data-d="schritt"] option[value="0"]'));
  const erster = await page.evaluate((k) => LYCEE.daten.SCHRITTE.findIndex((s) => (s.kap || 1) === k), kap);
  await page.evaluate((i) => LYCEE.springe(i), erster);
  await page.selectOption('.ly-debug [data-d="wahl"]', wahl);
  await page.check('.ly-debug [data-d="lauf"]');
  const t0 = Date.now(); let letzter = '', seit = Date.now(), besucht = [], ende = false, haengt = '';
  while (Date.now() - t0 < 15 * 60 * 1000) {
    await page.waitForTimeout(1000);
    const z = await page.evaluate(() => ({ s: LYCEE.schritt, kap: (LYCEE.daten.SCHRITTE.find((x) => x.id === LYCEE.schritt) || {}).kap || 1, fertig: !!LYCEE.zustand.fertig, ende: !!document.querySelector('.ly-ebene[data-art="ende"]:not([hidden])') }));
    if (z.s !== letzter) { besucht.push(z.s); letzter = z.s; seit = Date.now(); if (bilder) await page.screenshot({ path: join(bilder, 'k' + kap + '-' + besucht.length + '-' + z.s + '.png') }); }
    if (z.kap !== kap || z.ende || z.fertig) { ende = true; break; }
    if (Date.now() - seit > 90000) { haengt = z.s; if (bilder) await page.screenshot({ path: join(bilder, 'k' + kap + '-haengt.png') }); break; }
  }
  gesamtFehler += fehler.length;
  console.log('Kapitel ' + kap + ': ' + (ende ? '✓ bis zum Ende' : '✗ nicht fertig' + (haengt ? ' – hängt bei „' + haengt + '“' : '')) + ' · ' + besucht.length + ' Schritte · ' + Math.round((Date.now() - t0) / 1000) + ' s · Konsolenfehler: ' + fehler.length + (fehler.length ? ' → ' + JSON.stringify(fehler.slice(0, 3)) : ''));
  await page.close();
}
await browser.close();
process.exitCode = gesamtFehler ? 1 : 0;

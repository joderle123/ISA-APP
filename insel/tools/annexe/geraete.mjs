// Annexe Junglinster – Bildschirmfotos in drei Größen: iPad quer (1180×820), iPad hoch (820×1180), Handy hoch (390×844).
// Aufruf (aus insel/): node tools/annexe/geraete.mjs ORDNER [schrittId]
// Szenen je Größe: Start mit erster Sprechblase, Auswahl, Hof frei, Blattwahl am Platz, Journal. Meldet Konsolenfehler und
// Elemente, die über den Rand ragen.
import { launch } from '../../tests/lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist', 'lycee.html');
const [OUT, SCHRITT] = process.argv.slice(2);
mkdirSync(OUT, { recursive: true });
const GROESSEN = [['ipad-quer', 1180, 820], ['ipad-hoch', 820, 1180], ['handy', 390, 844]];
const browser = await launch();
for (const [name, w, h] of GROESSEN) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: name !== 'ipad-quer' || true, hasTouch: true });
  const page = await ctx.newPage();
  page.setDefaultTimeout(120000);
  const fehler = []; page.on('pageerror', (e) => fehler.push(String(e))); page.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text()); });
  const L = (f, a) => page.evaluate(f, a);
  const rand = () => L(() => { const W = innerWidth, out = []; for (const e of document.querySelectorAll('.ly-ebene *, .ly-dialog *, .ly-hud > *')) { const r = e.getBoundingClientRect(); if (!r.width) continue; const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden') continue; if (r.right > W + 1 || r.left < -1) out.push(String(e.className || e.tagName).slice(0, 30)); } return [...new Set(out)].slice(0, 6); });
  const foto = async (n) => { await page.screenshot({ path: join(OUT, name + '-' + n + '.png') }); const r = await rand(); if (r.length) console.log('  ' + name + '-' + n + ' ragt über den Rand: ' + r.join(', ')); };
  await page.goto('file://' + DIST + '?test&start=1&figur=1');
  await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && LYCEE.ia);
  if (SCHRITT) { await L((s) => LYCEE.springe(s), SCHRITT); }
  await page.waitForTimeout(1500);
  await foto('1-start');
  let wahlFoto = false;
  for (let i = 0; i < 60 && await L(() => LYCEE.imGespraech); i++) {
    if (!wahlFoto && await page.isVisible('.ly-d-optionen button')) { await foto('2-auswahl'); wahlFoto = true; await page.click('.ly-d-optionen button'); }
    else await page.keyboard.press('KeyE');
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(800);
  await foto('3-frei');
  await L(() => { LYCEE.teleport({ x: -22.0, z: -24.3 }); });
  await page.waitForTimeout(400);
  await L(() => { const i = LYCEE.ia.liste.find((x) => x.tu === 'arbeiten' && Math.hypot(x.x + 22.1, x.z + 24.4) < 3); if (i) LYCEE.aktion(i); });
  await page.waitForSelector('.ly-k-blattwahl').catch(() => {});
  await page.waitForTimeout(400);
  await foto('4-blattwahl');
  await page.keyboard.press('Escape'); await page.waitForTimeout(500);
  await page.waitForFunction(() => !LYCEE.imGespraech).catch(() => {});
  const jk = await page.$('.ly-knoepfe [data-k="journal"], [data-a="journal"], .ly-menu');
  if (jk) { await jk.click().catch(() => {}); await page.waitForTimeout(600); await foto('5-menue'); }
  console.log(name + ': Konsolenfehler ' + fehler.length + (fehler.length ? ' → ' + JSON.stringify(fehler.slice(0, 3)) : ''));
  await ctx.close();
}
await browser.close();

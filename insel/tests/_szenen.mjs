// Zeigt jedes Situations-Spiel einzeln (aus den Gesprächsdaten) und macht Bilder: node tests/_szenen.mjs ORDNER [quer|handy]
import { launch } from './lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'lycee.html');
const OUT = process.argv[2], art = process.argv[3] || 'quer';
const vp = art === 'handy' ? { width: 390, height: 844 } : { width: 1180, height: 820 };
const browser = await launch();
const page = await (await browser.newContext({ viewport: vp, hasTouch: art === 'handy' })).newPage();
page.setDefaultTimeout(120000);
const fehler = []; page.on('pageerror', (e) => fehler.push(String(e)));
await page.goto('file://' + DIST + '?test&start=1&figur=1');
await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && LYCEE.ui);
for (let i = 0; i < 40 && await page.evaluate(() => LYCEE.imGespraech); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(150); }
await page.evaluate((n) => { window.__nur = n; }, process.argv[4] || 'n');
const liste = await page.evaluate(() => {
  const out = []; const G = LYCEE.daten.GESPRAECHE;
  const such = (arr, key, pfad) => (arr || []).forEach((z, i) => { if (z && z.szene) out.push({ key, pfad: pfad.concat(i), szene: z.szene, id: z.id || '' });
    if (z && z.wahl) z.wahl.forEach((w, j) => such(w.dann, key, pfad.concat(i, 'w', j))); });
  for (const k of Object.keys(G)) if (Array.isArray(G[k]) && k.startsWith(window.__nur || 'n')) such(G[k], k, []);
  return out;
});
const SZ = { hitze: 'hitzeDuell', chat: 'liveChat', checkin: 'checkIn', namen: 'namenRekord', zwei: 'zweiWahrheiten', blind: 'blindParcours', stempel: 'skillsStempel', tanks: 'tankRaten', meinetanks: 'meineTanks', nachhaken: 'nachhaken', teams: 'teamsWaehlen', linie: 'linie', staerken: 'staerkenSchenken', sort: 'sortSprint', platz: 'platzwechsel', koerper: 'koerperKarte', synchron: 'synchron', spuren: 'spurenWand', thermo: 'thermometer', zonen: 'zonenWette', test: 'mathTest', atem: 'atemSync', koffer: 'koffer', pult: 'gefuehlsPult', lesen: 'gesichterLesen', mischpult: 'mischpult' };
const gesehen = new Set();
for (const s of liste) {
  const name = s.szene + (s.id ? '-' + s.id : '');
  if (gesehen.has(name)) continue; gesehen.add(name);
  page.evaluate(([s, fn]) => { let n = LYCEE.daten.GESPRAECHE[s.key]; const p = s.pfad.slice(); let z = n[p.shift()]; while (p.length) { if (p[0] === 'w') { p.shift(); z = z.wahl[p.shift()].dann[p.shift()]; } else z = z[p.shift()]; }
    const def = typeof z.def === 'function' ? z.def(LYCEE.zustand.merke, LYCEE.zustand) : z.def; window.__sz = LYCEE.ui[fn](def); }, [s, SZ[s.szene]]);
  await page.waitForTimeout(s.szene === 'namen' ? 9500 : s.szene === 'zwei' ? 3500 : s.szene === 'chat' ? 6500 : 2200);
  if (s.szene === 'hitze') { await page.keyboard.press('Digit1'); await page.waitForTimeout(2600); }
  await page.screenshot({ path: join(OUT, art + '-' + name + '.png') });
  // beenden: E mehrfach
  for (let i = 0; i < 60 && await page.evaluate(() => !!document.querySelector('.ly-ebene:not([hidden]) .sz')); i++) { await page.keyboard.press(i % 3 === 0 ? 'Digit1' : 'KeyE'); await page.waitForTimeout(400); }
  console.log('✓', name);
}
console.log('Fehler', fehler.length, fehler.slice(0, 3));
await browser.close();

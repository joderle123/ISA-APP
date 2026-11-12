// RESPAWN am Handy (hochkant, kleines Bild wie im Browser mit Leisten): Jeder volle Bildschirm muss bedienbar sein –
// der Hauptknopf liegt im sichtbaren Bereich, und was nicht passt, lässt sich wischen (Meldung vom 12.11.2026:
// „Deine Karten“ war höher als das Bild, der Knopf unten nicht erreichbar, Wischen ging nicht).
// Aufruf: node tests/scenarios/respawn-handy.mjs   (SHOTS=Ordner für Bilder)
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { launch, ROOT } from '../lib.mjs';

const SHOTS = process.env.SHOTS || '';
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
let ok = 0, bad = 0;
const check = (name, cond, info = '') => { if (cond) { ok++; console.log('✔', name); } else { bad++; console.log('✘', name, typeof info === 'string' ? info : JSON.stringify(info).slice(0, 400)); } };

const browser = await launch();
try {
  for (const [name, vp] of [['Handy 412×700', { width: 412, height: 700 }], ['kleines Handy 360×560', { width: 360, height: 560 }]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
    const page = await ctx.newPage(); page.setDefaultTimeout(240000);
    const errors = []; page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('file://' + join(ROOT, 'dist/respawn.html') + '?q=low&skipintro&autostart');
    await page.waitForFunction(() => window.LUMO && LUMO.started);
    await page.evaluate(() => document.getElementById('boot')?.remove());
    // Maße eines vollen Bildschirms: liegt der Hauptknopf im Bild? lässt sich der Rest wischen?
    const mass = (sel) => page.evaluate((sel) => {
      const v = document.querySelector(sel); if (!v) return null;
      const h = v.querySelector('.ist-haupt') || v.querySelector('button');
      const r = h.getBoundingClientRect(), s = getComputedStyle(v);
      const oben = v.firstElementChild.getBoundingClientRect().top;
      return { knopfUnten: Math.round(r.bottom), bild: innerHeight, knopfH: Math.round(r.height), inhalt: v.scrollHeight, sicht: v.clientHeight, oben: Math.round(oben), wischen: v.classList.contains('ov-scroll') && /pan-y|auto/.test(s.touchAction) && /auto|scroll/.test(s.overflowY) };
    }, sel);
    await page.waitForSelector('.rs-voll.ist-start.is-da');
    const st = await mass('.rs-voll.ist-start');
    check(`${name} · Start: Hauptknopf im Bild, Bildschirm lässt sich wischen`, st.knopfUnten <= st.bild && st.oben >= 0 && st.wischen && st.knopfH >= 44, st);
    await page.evaluate(() => LUMO.events.emit('respawn:start', 'neu'));
    await page.waitForSelector('.rs-voll.ist-karten.is-da');
    await page.waitForTimeout(900);
    const k = await mass('.rs-voll.ist-karten');
    check(`${name} · Deine Karten: „So spiele ich“ ist ohne Wischen im Bild`, k.knopfUnten <= k.bild && k.knopfH >= 44, k);
    check(`${name} · Deine Karten: Inhalt beginnt oben (nichts abgeschnitten) und lässt sich wischen`, k.oben >= 0 && k.wischen, k);
    // wirklich wischen: der Bildschirm rollt, wenn der Inhalt höher ist als das Bild
    const roll = await page.evaluate(() => { const v = document.querySelector('.rs-voll.ist-karten'); const max = v.scrollHeight - v.clientHeight; v.scrollTop = max; return { max, top: v.scrollTop }; });
    check(`${name} · Deine Karten: rollt bis ganz nach unten`, roll.top >= roll.max - 1, roll);
    const tm = await page.evaluate(() => { const v = document.querySelector('.rs-voll.ist-karten .rs-karte'); const e = new Event('touchmove', { bubbles: true, cancelable: true }); for (const n of ['touches', 'changedTouches', 'targetTouches']) Object.defineProperty(e, n, { value: [] }); v.dispatchEvent(e); return e.defaultPrevented; });
    check(`${name} · Wischen auf den Karten wird vom Spiel nicht verschluckt`, tm === false, tm);
    if (SHOTS) await page.screenshot({ path: join(SHOTS, `rs-handy-karten-${vp.width}.png`) });
    // der Knopf funktioniert mit einem echten Tipp
    await page.tap('.rs-voll.ist-karten [data-k="los"]');
    const weg = await page.waitForFunction(() => !document.querySelector('.rs-voll.ist-karten'), null, { timeout: 15000 }).then(() => true, () => false);
    check(`${name} · Tipp auf „So spiele ich“ startet die Runde`, weg);
    check(`${name} · Keine Fehler`, errors.length === 0, errors.slice(0, 3));
    await ctx.close();
  }
} finally { await browser.close(); }
console.log(`respawn-handy :: ${ok} ok, ${bad} Fehler`);
process.exit(bad ? 1 : 0);

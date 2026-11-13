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
    // Erste Szene mit echten Fingertipps (Meldung vom 12.11.2026, 22:21 Uhr: „Hier bleibt es hängen“ – die Sprechblase war
    // breiter als das Bild, der Weiter-Knopf lag rechts außerhalb). Blase ganz im Bild, unter der Leiste; ein Tipp
    // irgendwo ins Bild schaltet weiter.
    const lage = () => page.evaluate(() => {
      const r = (e) => { if (!e) return null; const q = e.getBoundingClientRect(); return [Math.round(q.left), Math.round(q.top), Math.round(q.right), Math.round(q.bottom)]; };
      const bl = document.querySelector('.bubble.is-in');
      return { titel: !!document.querySelector('.rs-voll.ist-titel'), zeile: !!document.querySelector('.rs-zeile.is-da'), blase: r(bl), text: bl ? bl.querySelector('.bubble-text').textContent : '',
        knopf: bl ? r(bl.querySelector('[data-next]')) : null, leiste: r(document.querySelector('.rs-leiste')), wahl: LUMO.ui.choices.open, b: innerWidth, h: innerHeight };
    });
    let bl = null, zeilen = 0;
    for (let i = 0; i < 80 && !bl; i++) {
      await page.waitForTimeout(400);
      const l = await lage();
      if (l.blase) { bl = l; break; }
      if (l.titel || l.zeile) { if (l.zeile) zeilen++; await page.touchscreen.tap(Math.round(vp.width / 2), Math.round(vp.height * 0.45)); }
    }
    check(`${name} · Erste Szene: Mit Tipps ins Bild (Titel, Erzählzeile) kommt man bis zur Sprechblase`, !!bl, { bl, zeilen });
    if (bl) {
      check(`${name} · Sprechblase liegt ganz im Bild und unter der Leiste`, bl.blase[0] >= 0 && bl.blase[2] <= bl.b && bl.blase[1] >= (bl.leiste ? bl.leiste[3] : 0) - 2 && bl.blase[3] <= bl.h, bl);
      check(`${name} · Weiter-Knopf der Blase ist im Bild (mindestens 44 px)`, !!bl.knopf && bl.knopf[0] >= 0 && bl.knopf[2] <= bl.b && bl.knopf[2] - bl.knopf[0] >= 44, bl);
      if (SHOTS) await page.screenshot({ path: join(SHOTS, `rs-handy-blase-${vp.width}.png`) });
      await page.touchscreen.tap(Math.round(vp.width / 2), Math.round(vp.height * 0.62));
      await page.waitForTimeout(900);
      const d = await lage();
      check(`${name} · Tipp irgendwo ins Bild schaltet die Blase weiter`, d.text !== bl.text || !d.blase, d);
      // und der Knopf selbst geht auch
      if (d.blase && d.knopf) { await page.touchscreen.tap((d.knopf[0] + d.knopf[2]) / 2, (d.knopf[1] + d.knopf[3]) / 2); await page.waitForTimeout(900); const e = await lage(); check(`${name} · Tipp auf den Weiter-Knopf schaltet weiter`, e.text !== d.text || !e.blase, e); }
    }
    // Leiste oben (Druck, Geld, Handy) und Pause-Knopf dürfen sich nicht überlappen
    const oben = await page.evaluate(() => { const l = document.querySelector('.rs-leiste'), p = document.querySelector('.hud-menu-btn'); if (!l || !p) return null; const a = l.getBoundingClientRect(), b = p.getBoundingClientRect(); return { leisteRechts: Math.round(a.right), pauseLinks: Math.round(b.left), leisteLinks: Math.round(a.left) }; });
    check(`${name} · Leiste oben berührt den Pause-Knopf nicht`, !!oben && oben.leisteRechts <= oben.pauseLinks && oben.leisteLinks >= 0, oben);
    // Einmal bis zum Ende durchspielen (nur schlafen): Auch der Abschluss mit Akte muss am Handy bedienbar sein
    if (vp.width === 412) {
      const ende = await page.evaluate(() => new Promise((resolve) => {
        const P = LUMO.plugin('respawn'), E = LUMO.events, t0 = Date.now();
        window.__morgen = [];
        E.on('respawn:frei', () => { window.__morgen.push(P.sichtFrei()); });   // einmal je Morgen messen
        const tick = setInterval(() => {
          if (document.querySelector('.rs-voll.ist-ende')) { clearInterval(tick); resolve(true); }
          else if (LUMO.ui.choices.open) E.emit('dialogue:choose', { index: LUMO.ui.choices.current.items.filter((x) => !x.disabled)[0].index });
          else if (LUMO.ui.bubbles.current) E.emit('input:action:down');
          else if (P.frei) P.tue({ schlafen: true });
          else E.emit('respawn:weiter');
          if (Date.now() - t0 > 200000) { clearInterval(tick); resolve(false); }
        }, 25);
      }));
      check(`${name} · Runde bis zum Abschluss gespielt`, ende);
      // Jeden Morgen (und nach der Ankunft) muss die Kamera die eigene Figur sehen – nicht in einer Wand stecken
      const morgen = await page.evaluate(() => window.__morgen || []);
      check(`${name} · An jedem Morgen ist die eigene Figur zu sehen (${morgen.length} Tage)`, morgen.length >= 10 && morgen.every((m) => m.frei && m.weit >= 2.5), morgen.filter((m) => !m.frei || m.weit < 2.5).slice(0, 3));
      if (ende) {
        await page.waitForTimeout(700);
        const a = await mass('.rs-voll.ist-ende');
        check(`${name} · Abschluss: Knopf unten ist im Bild, der Rest lässt sich wischen`, a.knopfUnten <= a.bild && a.oben >= 0 - 1 && a.wischen, a);
        const r2 = await page.evaluate(() => { const v = document.querySelector('.rs-voll.ist-ende'); const max = v.scrollHeight - v.clientHeight; v.scrollTop = max; const t = v.scrollTop; v.scrollTop = 0; return { max, top: t }; });
        check(`${name} · Abschluss: rollt bis ganz nach unten`, r2.top >= r2.max - 1, r2);
        // nichts ragt seitlich über das Bild (die Ausgangs-Karte war 40 Pixel zu breit)
        const breit = await page.evaluate(() => [...document.querySelectorAll('.rs-voll.ist-ende *')].filter((e) => e.offsetParent).map((e) => { const q = e.getBoundingClientRect(); return { k: String(e.className).split(' ')[0] || e.tagName, l: Math.round(q.left), r: Math.round(q.right) }; }).filter((q) => q.l < -1 || q.r > innerWidth + 1).slice(0, 4));
        check(`${name} · Abschluss: nichts ragt seitlich über das Bild`, breit.length === 0, breit);
        if (SHOTS) await page.screenshot({ path: join(SHOTS, 'rs-handy-ende.png') });
      }
    }
    check(`${name} · Keine Fehler`, errors.length === 0, errors.slice(0, 3));
    await ctx.close();
  }
} finally { await browser.close(); }
console.log(`respawn-handy :: ${ok} ok, ${bad} Fehler`);
process.exit(bad ? 1 : 0);

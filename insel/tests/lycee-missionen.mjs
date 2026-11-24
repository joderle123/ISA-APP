// Test: Kurs-Missionen (REAL TALK ↔ Annexe). Code eingeben, Mission spielen (Wege per Teleport, Antworten zufällig
// oder fest), Resümee mit eigenem Satz, Belohnung, Lehrer-Ansicht. Aufruf: node build-lycee.mjs && node tests/lycee-missionen.mjs [CODE …]
// Umgebung: WAHL=erste|zufall (Standard: zufall), BILDER=1 für Bildschirmfotos (SHOTS).
import { launch, SHOTS } from './lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'lycee.html');
let ok = 0, bad = 0;
const check = (name, cond, info) => { if (cond) { ok++; console.log('  ✓ ' + name); } else { bad++; console.log('  ✗ ' + name + (info !== undefined ? '  → ' + JSON.stringify(info).slice(0, 400) : '')); } };
const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1100, height: 760 } })).newPage();
page.setDefaultTimeout(240000);
const fehler = [];
page.on('pageerror', (e) => fehler.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text()); });
const L = (f, a) => page.evaluate(f, a);
const bild = (n) => (process.env.BILDER ? page.screenshot({ path: join(SHOTS, 'km-' + n + '.png') }) : null);
const WAHL = process.env.WAHL || 'zufall';

await page.goto('file://' + DIST + '?test&start=1&figur=1');
await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && LYCEE.km);
// Einstieg wegklicken, bis frei gelaufen werden kann
async function klickWeiter(wahl = 'erste') {
  return L((wahl) => {
    const d = document.querySelector('.ly-dialog:not([hidden])');
    if (d) {
      const opt = [...d.querySelectorAll('.ly-d-optionen [data-i]')];
      if (opt.length) { (wahl === 'zufall' ? opt[Math.floor(Math.random() * opt.length)] : opt[0]).click(); return 'wahl'; }
      const w = d.querySelector('.ly-d-weiter'); if (w) { w.click(); return 'weiter'; }
    }
    return '';
  }, wahl);
}
for (let i = 0; i < 200; i++) {
  const r = await klickWeiter(); const e = await L(() => (document.querySelector('.ly-ebene:not([hidden])') || {}).dataset?.art || '');
  if (e && e !== 'km') await L(() => { const k = document.querySelector('.ly-ebene:not([hidden])'); const b = k.querySelector('.ly-primaer, .ly-zu, button'); if (b) b.click(); });
  if (!r && !e && !(await L(() => LYCEE.imGespraech))) break;
  await page.waitForTimeout(120);
}

// 🎟-Knopf da?
check('🎟-Knopf im Spiel', !!(await page.$('[data-k="mission"]')));
await page.click('[data-k="mission"]'); await page.waitForTimeout(300);
check('Missionen-Fenster mit Code-Feld', !!(await page.$('.km-fenster input')));
await page.fill('.km-fenster input', 'xyz-9'); await page.press('.km-fenster input', 'Enter'); await page.waitForTimeout(200);
check('Falscher Code: freundliche Meldung', /kenne ich nicht/.test(await page.textContent('.km-meldung').catch(() => '')));

const CODES = process.argv.slice(2).length ? process.argv.slice(2) : await L(() => Object.keys(LYCEE.km.skripte || {}));
for (const code of CODES) {
  await L(() => { if (LYCEE.ui.ebeneArt()) LYCEE.ui.ebeneZu(); });
  await page.click('[data-k="mission"]'); await page.waitForTimeout(200);
  await page.fill('.km-fenster input', code.toLowerCase().replace('-', ' ')); await page.press('.km-fenster input', 'Enter'); await page.waitForTimeout(250);
  const karte = await L(() => !!document.querySelector('.km-karte [data-a="los"]'));
  check(code + ': Code erkannt, Missionskarte', karte);
  if (!karte) continue;
  await bild(code + '-karte');
  await page.click('.km-karte [data-a="los"]');
  let res = false, runden = 0, orte = 0;
  const t0 = Date.now();
  while (Date.now() - t0 < 180000 && runden < 2000) {
    runden++;
    const art = await L(() => LYCEE.ui.ebeneArt());
    if (art === 'km') {
      const was = await L(() => {
        const k = document.querySelector('.ly-ebene:not([hidden])');
        if (k.querySelector('.km-res')) return 'res';
        const ta = k.querySelector('textarea'); if (ta) { ta.value = 'Test-Notiz'; }
        const b = k.querySelector('[data-a="ja"]'); if (b) { b.click(); return 'eingabe'; }
        return 'anders';
      });
      if (was === 'res') { res = true; break; }
      await page.waitForTimeout(80); continue;
    }
    if (art) { await L(() => LYCEE.ui.ebeneZu()); continue; }
    const r = await klickWeiter(WAHL);
    if (r) { await page.waitForTimeout(40); continue; }
    // kein Dialog: zum Ziel des Schritts gehen
    const ziel = await L(() => { const l = LYCEE.km.lauf; if (!l || l.inSzene) return null; const st = l.def.schritte[l.i]; return st ? st.p || 'ohne' : null; });
    if (ziel && ziel !== 'ohne') { await L((p) => LYCEE.teleport({ x: p[0] + 0.6, z: p[1] + 0.6 }), ziel); orte++; await page.waitForTimeout(700); }
    else await page.waitForTimeout(250);
  }
  check(code + ': bis zum Resümee gespielt (' + orte + ' Orte)', res, await L(() => [LYCEE.km.lauf && LYCEE.km.lauf.i, LYCEE.ui.ebeneArt()]));
  if (!res) continue;
  const r = await L(() => { const k = document.querySelector('.km-res'); return { ent: k.querySelectorAll('.km-ent li').length, frage: !!k.querySelector('.km-gruppe p').textContent.trim(), satz: !!k.parentElement.querySelector('.km-satz') }; });
  check(code + ': Resümee mit Entscheidungen, Gruppenfrage und Satz-Feld', r.ent >= 3 && r.frage && r.satz, r);
  await bild(code + '-resuemee');
  await page.fill('.km-satz', 'Ich probiere das diese Woche.');
  await page.click('.ly-ebene [data-a="ok"]'); await page.waitForTimeout(400);
  const f = await L((c) => LYCEE.zustand.merke.km.fertig && LYCEE.zustand.merke.km.fertig[c], code);
  check(code + ': gespeichert mit eigenem Satz', !!f && f.satz === 'Ich probiere das diese Woche.', f && f.satz);
  await L(() => { document.querySelectorAll('.ly-beloh-zu').forEach((b) => b.click()); });
}

// Lehrer-Ansicht
await L(() => { if (LYCEE.ui.ebeneArt()) LYCEE.ui.ebeneZu(); });
await page.click('[data-k="mission"]'); await page.waitForTimeout(200);
await page.fill('.km-fenster input', 'Lehrer'); await page.press('.km-fenster input', 'Enter'); await page.waitForTimeout(250);
const n = await L(() => document.querySelectorAll('.km-fenster .km-liste li').length);
check('Lehrer-Ansicht zeigt die Resümees', n >= 1, n);
await bild('lehrer');
check('Keine Fehler in der Konsole', !fehler.length, fehler.slice(0, 5));
console.log(ok + ' ok, ' + bad + ' Fehler');
await browser.close();
process.exit(bad ? 1 : 0);

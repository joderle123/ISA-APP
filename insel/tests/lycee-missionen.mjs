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
await L(() => { LYCEE.ui.atemMs = 30; });
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
// Die Hauptgeschichte beginnt mit Vorschau und Suchbild: beides lösen, bis man frei laufen kann (sonst nimmt das Spiel keine Missionen an)
for (let i = 0; i < 400; i++) {
  const r = await klickWeiter();
  const s = await L(() => {
    const vo = document.querySelector('.mv-voraus'); if (vo) { vo.click(); return 'voraus'; }
    const sb = document.querySelector('.mv-such .mv-bild');
    if (sb && !sb.classList.contains('aus')) {
      const z = JSON.parse(sb.dataset.ziele || '[]'); window.__sk = window.__sk || [];
      const q = z.find((q) => q[3] && !window.__sk.includes(q[0]));
      if (q) { window.__sk.push(q[0]); const b = sb.getBoundingClientRect(); sb.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: b.left + q[1] * b.width, clientY: b.top + q[2] * b.height })); }
      return 'such';
    }
    const w = document.querySelector('.ly-ebene:not([hidden]) .sz-weiter, .ly-ebene:not([hidden]) .ly-primaer'); if (w) { w.click(); return 'weiter'; }
    return LYCEE.imGespraech ? 'gespraech' : '';
  });
  if (!r && !s) break;
  await page.waitForTimeout(s === 'such' ? 700 : 150);
}
await L(() => { for (let i = 0; i < 5 && LYCEE.ui.ebeneArt(); i++) LYCEE.ui.ebeneZu(); });

// 🎟-Knopf da?
check('🎟-Knopf im Spiel', !!(await page.$('[data-k="mission"]')));
await page.click('[data-k="mission"]'); await page.waitForTimeout(300);
check('Missionen-Fenster mit Code-Feld', !!(await page.$('.km-code:not(.km-partner) input')));
await page.fill('.km-code:not(.km-partner) input', 'xyz-9'); await page.press('.km-code:not(.km-partner) input', 'Enter'); await page.waitForTimeout(200);
check('Falscher Code: freundliche Meldung', /kenne ich nicht/.test(await page.textContent('.km-meldung').catch(() => '')));

const CODES = process.argv.slice(2).length ? process.argv.slice(2) : await L(() => Object.keys(LYCEE.km.skripte || {}));
for (const code of CODES) {
  await L(() => { if (LYCEE.ui.ebeneArt()) LYCEE.ui.ebeneZu(); });
  await page.click('[data-k="mission"]'); await page.waitForTimeout(200);
  await page.fill('.km-code:not(.km-partner) input', code.toLowerCase().replace('-', ' ')); await page.press('.km-code:not(.km-partner) input', 'Enter'); await page.waitForTimeout(250);
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
    if (art === 'atem') { await L(() => { LYCEE.ui.atemMs = 30; const b = document.querySelector('.ly-ebene [data-a="weiter"]'); if (b && !b.hidden) b.click(); }); await page.waitForTimeout(60); continue; }
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

// Brief an mich (ENDE-4): privat gespeichert, nicht im Resümee
if (CODES.includes('ENDE-4')) {
  const b = await L(() => { const m = LYCEE.zustand.merke.km; const e = (m.fertig || {})['ENDE-4']; return { brief: !!(m.briefe && m.briefe['ENDE-4'] && m.briefe['ENDE-4'].text), imResuemee: !!(e && JSON.stringify(e).includes(m.briefe && m.briefe['ENDE-4'] ? m.briefe['ENDE-4'].text : '§§')) }; });
  check('ENDE-4: Brief an mich privat gespeichert, nicht im Resümee', b.brief && !b.imResuemee, b);
}
// Erinnerungen (BLEIBT-3): frühere Missionen tauchen im Album auf
if (CODES.includes('BLEIBT-3') && CODES.some((c) => ['ICH-2', 'GRENZE-3', 'EULE-1', 'BUEHNE-3', 'ONLINE-2', 'BUS-12', 'WORT-6', 'ZAHL-100', 'BEWEIS-3'].includes(c) && CODES.indexOf(c) < CODES.indexOf('BLEIBT-3'))) {
  const n = await L(() => ((LYCEE.zustand.merke.km.fertig['BLEIBT-3'] || {}).momente || []).filter((x) => /^Erinnerung an/.test(x)).length);
  check('BLEIBT-3: Erinnerungen an eigene frühere Missionen', n >= 1, n);
}

// Lehrer-Ansicht
await L(() => { if (LYCEE.ui.ebeneArt()) LYCEE.ui.ebeneZu(); });
await page.click('[data-k="mission"]'); await page.waitForTimeout(200);
await page.fill('.km-code:not(.km-partner) input', 'Lehrer'); await page.press('.km-code:not(.km-partner) input', 'Enter'); await page.waitForTimeout(250);
const n = await L(() => document.querySelectorAll('.km-fenster .km-liste li').length);
check('Lehrer-Ansicht zeigt die Resümees', n >= 1, n);
await bild('lehrer');
check('Keine Fehler in der Konsole', !fehler.length, fehler.slice(0, 5));
console.log(ok + ' ok, ' + bad + ' Fehler');
await browser.close();
process.exit(bad ? 1 : 0);

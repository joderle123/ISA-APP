/* Test: ALLE registrierten Spiele (src/games/**) laufen im Auto-Modus bis zum Ende – ohne Seitenfehler,
   auf iPad quer (1180×820) und Beamer (1600×900). Dazu: Pass/X auf jedem Startbild, Sticker-Wand,
   Finder (Einheit, Thema, Format, ELDiB), Deep-Link mit Rolle + Tagescode, QR-Codes im Lehrermodus.
   Aufruf:  node crew/build.js && flock /tmp/crew-chrome.lock node crew/tests/games.mjs
   Nur bestimmte Spiele:  CREW_GAMES=frag-weiter,dealoderkein node crew/tests/games.mjs */
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { DIST, SHOTS, VIEWPORTS, layoutCheck, shot } from './lib.mjs';

const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }

const problems = [];
const expect = (cond, msg) => { if (!cond) problems.push(msg); };
const ONLY = process.env.CREW_GAMES ? process.env.CREW_GAMES.split(',').map((s) => s.trim()).filter(Boolean) : null;

/* Eigener Start: Wartezeiten kürzen, aber nicht auf 30 ms (Endbild soll kurz stehen bleiben) */
async function launch(viewport) {
  const browser = await pw.chromium.launch();
  const context = await browser.newContext({ viewport, hasTouch: true, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.addInitScript(() => {
    const _st = window.setTimeout;
    window.__fast = true;
    window.setTimeout = (fn, ms, ...a) => _st(fn, Math.min(ms || 0, 250), ...a);
  });
  await page.goto('file://' + DIST);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.evaluate(() => window.CREW.debug.found('Test Crew', 'arena'));
  await page.waitForTimeout(150);
  return { browser, page, errors };
}

/* Ein Spiel im Auto-Modus bis zum Ende spielen */
async function playGame(page, id, tag, withShots) {
  const t0 = Date.now();
  await page.evaluate((id) => window.CREW.debug.startGame(id, { auto: true, autoEndWait: 900 }), id);
  // Startbild: Regel-Satz, Pass-Knopf, X-Karte, Vorlese-Knopf
  await page.locator('.game-screen[data-game="' + id + '"]').first().waitFor({ timeout: 5000 });
  const hasIntro = await page.locator('#btn-go').count();
  if (hasIntro) {
    expect(await page.locator('#btn-pass:visible').count() === 1, `${tag}: Pass-Knopf fehlt auf dem Startbild`);
    expect(await page.locator('#btn-x:visible').count() === 1, `${tag}: X-Karte fehlt auf dem Startbild`);
    expect(await page.locator('.game-screen .read-btn').count() >= 1, `${tag}: Vorlese-Knopf fehlt auf dem Startbild`);
    expect(await page.locator('.game-screen .bigcard .say').count() >= 1, `${tag}: Regel-Satz fehlt auf dem Startbild`);
    if (withShots) { await shot(page, tag + '-01-start', 200); problems.push(...await layoutCheck(page, tag + '-start')); }
  }
  // Mittendrin ein paar Bilder (nur erster Durchlauf)
  let mid = 0;
  let endShot = false;
  for (let i = 0; i < 1200; i++) {
    const st = await page.evaluate(() => window.CREW.debug.gameStatus());
    if (st.done && st.done.id === id) {
      expect(st.done.ok, `${tag}: Spiel endete mit Fehler: ${st.done.error}`);
      break;
    }
    if (!st.running) { problems.push(`${tag}: Spiel läuft nicht mehr, aber kein Ergebnis`); break; }
    if (withShots && !endShot && await page.locator('#btn-done').count()) {
      await shot(page, tag + '-09-ende', 100);
      problems.push(...await layoutCheck(page, tag + '-ende'));
      endShot = true;
    }
    if (withShots && mid < 4 && i > 0 && i % 5 === 0) { await shot(page, tag + '-0' + (mid + 2) + '-mitte', 0); problems.push(...await layoutCheck(page, tag + '-mitte' + mid)); mid++; }
    await page.waitForTimeout(40);
    if (Date.now() - t0 > 90000) { problems.push(`${tag}: Zeitüberschreitung (90 s)`); break; }
  }
  // Danach: zurück im Spiele-Hub
  await page.locator('#btn-finder').waitFor({ timeout: 5000 }).catch(() => problems.push(`${tag}: nach dem Spiel nicht im Spiele-Hub`));
  return Date.now() - t0;
}

/* ---------- Spiele auf zwei Bildschirmgrößen ---------- */
for (const [vpName, vp] of [['ipadLandscape', VIEWPORTS.ipadLandscape], ['beamer', VIEWPORTS.beamer]]) {
  const { browser, page, errors } = await launch(vp);
  let ids = await page.evaluate(() => window.CREW.games.list().map((g) => g.id));
  if (ONLY) ids = ids.filter((id) => ONLY.includes(id));
  expect(ids.length > 0, 'Keine Spiele registriert');
  // Jedes Spiel hat Katalog-Daten (Thema, Format, Einheiten, ELDiB) und eine Vorlage
  const meta = await page.evaluate(() => window.CREW.games.list().map((g) => ({ id: g.id, theme: g.theme, format: g.format, template: g.template, units: g.units.length, eldib: g.eldib.length, inKatalog: !!window.CREW.katalog.spiele[g.id] })));
  meta.forEach((m) => {
    expect(m.inKatalog, `${m.id}: nicht im Katalog (docs/spielekatalog.json)`);
    expect(/^T[0-6]$/.test(m.template), `${m.id}: Vorlage fehlt`);
    expect(m.units > 0, `${m.id}: keine Einheit j1-eXX`);
    expect(m.eldib > 0, `${m.id}: keine ELDiB-Codes`);
  });
  const timings = [];
  for (const id of ids) {
    const ms = await playGame(page, id, `game-${vpName}-${id}`, vpName === 'ipadLandscape');
    timings.push(id + ' ' + (ms / 1000).toFixed(1) + 's');
    const errHere = errors.splice(0);
    errHere.forEach((e) => problems.push(`game-${vpName}-${id}: ${e}`));
  }
  console.log(`${vpName}: ${ids.length} Spiele gespielt (${timings.join(', ')})`);

  if (vpName === 'ipadLandscape') {
    // Sticker-Wand im HQ: ein Sticker pro gespieltem Spiel (dealoderkein zählt, Team-iPad-Zweig nicht)
    const st = await page.evaluate(() => window.CREW.state.stickers);
    ids.forEach((id) => expect(st[id] && st[id].n >= 1, `sticker: ${id} fehlt auf der Sticker-Wand`));
    await page.evaluate(() => window.CREW.app.renderBase());
    await page.locator('#sticker-wall').waitFor({ timeout: 3000 });
    expect(await page.locator('#sticker-wall .sticker').count() === ids.length, 'sticker: Wand zeigt nicht alle Sticker');
    await shot(page, 'games-sticker-wand');
    problems.push(...await layoutCheck(page, 'sticker-wand'));
    // Spielstand-Migration: alter Spielstand ohne stickers-Feld lädt sauber
    const migrated = await page.evaluate(() => { const s = JSON.parse(JSON.stringify(window.CREW.state)); delete s.stickers; window.CREW.importCode(btoa(unescape(encodeURIComponent(JSON.stringify(s))))); return window.CREW.state.stickers && typeof window.CREW.state.stickers === 'object'; });
    expect(migrated, 'migration: stickers-Feld nach Import fehlt');

    // Hub & Finder
    await page.evaluate(() => window.CREW.games.renderHub());
    await page.locator('.hub-theme').first().waitFor();
    expect(await page.locator('.hub-theme').count() === 8, 'hub: 8 Themen erwartet');
    expect(ONLY || (await page.locator('.hub-tile:not(.soon)').count()) === ids.length, 'hub: spielbare Kacheln ≠ registrierte Spiele');
    await shot(page, 'games-hub');
    problems.push(...await layoutCheck(page, 'hub'));
    await page.locator('#btn-finder').click();
    await page.locator('#finder-unit').waitFor();
    expect(await page.locator('.game-row').count() === 62, 'finder: 62 Spiele erwartet');
    await page.selectOption('#finder-unit', 'j1-e07');
    await page.waitForTimeout(150);
    expect(await page.locator('.unit-card').count() === 1, 'finder: Einheiten-Karte fehlt');
    expect((await page.locator('.game-row').first().getAttribute('data-game')) === 'gefuehls-funk', 'finder: Abschlussspiel der Einheit steht nicht oben');
    expect(await page.locator('.unit-variant').count() >= 1, 'finder: Varianten-Text der Einheit fehlt');
    await shot(page, 'games-finder-einheit');
    problems.push(...await layoutCheck(page, 'finder'));
    // Einheit, deren Katalog-Spiel NICHT gebaut ist: beste gebaute Variante statt totem Link
    const unbuilt = await page.evaluate(() => (window.CREW.katalog.einheiten.find((e) => !window.CREW.games.get(e.spiel)) || {}).id || '');
    if (unbuilt) {
      await page.selectOption('#finder-unit', unbuilt);
      await page.waitForTimeout(150);
      const altId = await page.locator('.unit-card').getAttribute('data-alt');
      expect(!!altId, `finder: ${unbuilt} ohne gebaute Variante`);
      expect(await page.locator('.unit-alt').count() === 1, `finder: ${unbuilt} Varianten-Zeile fehlt`);
      expect(await page.locator('#play-alt-' + altId + ':enabled').count() === 1, `finder: ${unbuilt} Varianten-Knopf fehlt`);
      expect((await page.locator('.game-row').first().getAttribute('data-game')) === altId, `finder: ${unbuilt} Variante steht nicht oben`);
      expect(await page.locator('.game-row[data-built="0"] button:enabled:has-text("Spielen")').count() === 0, `finder: ${unbuilt} toter Spielen-Knopf`);
      await shot(page, 'games-finder-variante');
    }
    // Storystaffel: Weitergabe im Kreis – bei n=4..6 ist jeder Platz genau einmal dran, bevor es von vorn geht
    const drehOk = await page.evaluate(() => { const g = window.CREW.games.get('storystaffel'); if (!g || !g.dreh) return 'fehlt'; for (let n = 4; n <= 6; n++) { let z = 1; const seen = []; for (let i = 0; i < n; i++) { seen.push(z); z = g.dreh(z, n); } if (z !== 1 || new Set(seen).size !== n) return 'n=' + n + ': ' + seen.join(','); } return 'ok'; });
    expect(drehOk === 'ok' || (ONLY && drehOk === 'fehlt'), 'storystaffel: Weitergabe-Reihenfolge ' + drehOk);
    // Zwei Brillen: jeder richtige Chip (ABCD) steht wörtlich in mindestens zwei Quellen (q), jede Szene hat mindestens zwei
    const zbOk = await page.evaluate(() => { const g = window.CREW.games.get('zwei-brillen'); if (!g || !g.szenen) return 'fehlt'; const bad = []; g.szenen.forEach((sz) => { const ok = sz.chips.filter((c) => c.fits === 'ABCD'); if (ok.length < 2) bad.push(sz.id + ': <2 richtige'); ok.forEach((c) => { if (!c.q || c.q.length < 2) bad.push(sz.id + ': „' + c.t + '“ ohne zwei Quellen'); }); sz.chips.filter((c) => c.fits !== 'ABCD').forEach((c) => { if (c.q) bad.push(sz.id + ': „' + c.t + '“ hat q, ist aber nicht ABCD'); }); }); return bad.length ? bad.join('; ') : 'ok'; });
    expect(zbOk === 'ok' || (ONLY && zbOk === 'fehlt'), 'zwei-brillen: ' + zbOk);
    await page.selectOption('#finder-unit', '');
    await page.locator('[data-chip="format-bewegung"]').click();
    await page.waitForTimeout(150);
    const fmtRows = await page.locator('.game-row').count();
    const fmtWant = await page.evaluate(() => Object.values(window.CREW.katalog.spiele).filter((k) => k.format === 'bewegung').length);
    expect(fmtRows === fmtWant, `finder: Format Bewegung erwartet ${fmtWant} Spiele, ${fmtRows}`);
    await page.locator('[data-chip="format-"]').click();
    await page.locator('[data-chip="thema-konflikt"]').click();
    await page.waitForTimeout(150);
    const themeWant = await page.evaluate(() => window.CREW.katalog.themen.find((t) => t.id === 'konflikt').spiele.length);
    expect(await page.locator('.game-row').count() === themeWant, 'finder: Thema Konflikt erwartet ' + themeWant + ' Spiele');
    await page.locator('[data-chip="thema-"]').click();
    await page.selectOption('#finder-eldib', 'KOG-38');
    await page.waitForTimeout(150);
    expect(await page.locator('.game-row').count() > 3, 'finder: ELDiB KOG-38 liefert zu wenig');
    await page.selectOption('#finder-eldib', '');
    await page.locator('#finder-q').fill('Tür');
    await page.waitForTimeout(150);
    expect(await page.locator('.game-row[data-game="frag-weiter"]').count() === 1, 'finder: Suche „Tür“ findet Frag weiter nicht');
    await page.locator('#finder-q').fill('');
    // Spielen-Knopf aus dem Finder startet das Spiel
    await page.locator('#play-frag-weiter').click();
    await page.locator('.game-screen[data-game="frag-weiter"]').waitFor({ timeout: 4000 });
    expect(await page.locator('#btn-pass:visible').count() === 1, 'finder: Spielen startet ohne Pass-Knopf');
    // Home-Knopf fragt nach, „Weiterspielen“ bleibt im Spiel
    await page.locator('#btn-home').click();
    await page.locator('.modal').waitFor();
    expect(await page.locator('.modal', { hasText: 'Spiel beenden' }).count() === 1, 'start: Nachfrage beim Verlassen fehlt');
    await page.locator('.modal button', { hasText: 'Beenden' }).click();
    await page.locator('#tile-session').waitFor({ timeout: 4000 });

    // Lehrermodus: Tab „Spiele“ mit Tagescode, Basis-URL und QR
    await page.evaluate(() => { window.CREW.state.settings.pin = '2468'; window.CREW.save(); window.CREW.app.renderTeacher('spiele'); });
    await page.locator('#t-daycode').waitFor();
    const code = await page.locator('#t-daycode').textContent();
    expect(/^\d{4}$/.test(code.trim()), 'lehrer: Tagescode nicht 4-stellig');
    await page.locator('#t-newcode').click();
    const code2 = await page.locator('#t-daycode').textContent();
    expect(/^\d{4}$/.test(code2.trim()), 'lehrer: neuer Tagescode nicht 4-stellig');
    await shot(page, 'games-lehrer-spiele');
    problems.push(...await layoutCheck(page, 'lehrer-spiele'));
    await page.locator('#qr-gefuehls-funk').click();
    await page.locator('.modal .qr-grid').waitFor();
    expect(await page.locator('.modal .qr-item').count() === 4, 'qr: Rollen-Puzzle braucht 4 QR-Codes (A–D)');
    expect(await page.locator('.modal svg.qr').count() === 4, 'qr: SVG fehlt');
    const url = await page.locator('.modal .qr-url').textContent();
    expect(url.includes('spiel=gefuehls-funk') && url.includes('code=' + code2.trim()) && url.startsWith('https://joderle123.github.io/ISA-APP/crew/dist/index.html'), 'qr: Link falsch: ' + url);
    expect(!/name|crew=|test/i.test(url), 'qr: Link enthält persönliche Daten');
    await shot(page, 'games-qr');
    problems.push(...await layoutCheck(page, 'qr'));
    await page.locator('.modal button', { hasText: 'Schließen' }).click();
    await page.locator('#qr-frag-weiter').click();
    await page.locator('.modal .qr-grid').waitFor();
    expect(await page.locator('.modal .qr-item').count() === 1, 'qr: Paar-Spiel braucht 1 QR-Code');
    await page.locator('.modal button', { hasText: 'Schließen' }).click();
    // Basis-URL speichern
    await page.locator('#t-baseurl').fill('https://beispiel.lu/crew/index.html');
    await page.locator('#t-baseurl-save').click();
    expect((await page.evaluate(() => window.CREW.games.linkFor('frag-weiter'))).startsWith('https://beispiel.lu/crew/index.html?spiel=frag-weiter'), 'lehrer: Basis-URL nicht übernommen');

    // Tagescode-Bildschirm (ohne Auto): Code eintippen, Platz setzen
    await page.evaluate(() => { window.CREW.store.del('daycode'); window.CREW.debug.startGame('je-nach-ort', {}); });
    await page.locator('#btn-go').waitFor();
    await page.locator('#btn-go').click();
    await page.locator('#daycode-now').waitFor();
    await shot(page, 'games-tagescode');
    problems.push(...await layoutCheck(page, 'tagescode'));
    await page.locator('#btn-othercode').click();
    for (const d of ['7', '3', '1', '9']) await page.locator('.game-screen .valuepad button', { hasText: new RegExp('^' + d + '$') }).click();
    expect((await page.locator('#daycode-now').textContent()).trim() === '7319', 'tagescode: Eintippen setzt den Code nicht');
    await page.locator('.game-screen .stepper button').nth(1).click();
    await page.locator('#btn-next').click();
    expect((await page.evaluate(() => [window.CREW.seed.getCode(), window.CREW.seed.getSeat()])).join() === '7319,2', 'tagescode: Code/Platz nicht gespeichert');
    // Gleicher Code + gleiche Crew-Größe → gleiche Paare und Rollen auf jedem Gerät
    const same = await page.evaluate(() => { const s = window.CREW.seed; const a = s.pairs('7319', 6), b = s.pairs('7319', 6); const r = [1, 2, 3, 4, 5, 6].map((x) => s.roleOf('7319', 6, x)); return JSON.stringify(a) === JSON.stringify(b) && new Set(r.filter((x) => x !== 'X')).size === 4 && r.filter((x) => x === 'X').length === 2 && a.every((p) => p.seats.length === 2); });
    expect(same, 'seed: Paare/Rollen nicht stabil oder nicht vollständig');
    await page.evaluate(() => window.CREW.app.goHome(true));
  }
  errors.splice(0).forEach((e) => problems.push(`${vpName}: ${e}`));
  await browser.close();
}

/* ---------- Deep-Link: index.html?spiel=…&rolle=…&code=… öffnet direkt das Spiel ---------- */
{
  const browser = await pw.chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORTS.ipadLandscape, hasTouch: true });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  // Team-iPad B bei „Deal oder kein Deal“: nur die Geheim-Karte von Team B, kein Startbild
  await page.goto('file://' + DIST + '?spiel=dealoderkein&rolle=B&code=4821&platz=3');
  await page.locator('.game-screen[data-game="dealoderkein"]').waitFor({ timeout: 5000 });
  expect(await page.getByText('Team-iPad B').count() === 1, 'deeplink: Rolle B nicht übernommen');
  expect(await page.locator('#btn-pass:visible').count() === 1, 'deeplink: Pass fehlt');
  expect((await page.evaluate(() => [window.CREW.seed.getCode(), window.CREW.seed.getSeat()])).join() === '4821,3', 'deeplink: Tagescode/Platz nicht gesetzt');
  expect(!(await page.evaluate(() => location.search)), 'deeplink: Parameter bleiben in der Adresse');
  await shot(page, 'games-deeplink-team-b');
  problems.push(...await layoutCheck(page, 'deeplink'));
  // Rollen-Puzzle mit Rolle C: nach dem Start kein Tagescode-Bildschirm, Rolle C vorgewählt
  await page.goto('file://' + DIST + '?spiel=gefuehls-funk&rolle=C&code=4821');
  await page.locator('#btn-go').waitFor({ timeout: 5000 });
  await page.locator('#btn-go').click();
  await page.locator('.role-card').waitFor({ timeout: 4000 });
  expect((await page.locator('.role-card').getAttribute('data-role')) === 'C', 'deeplink: Rolle C nicht vorgewählt');
  expect(await page.locator('#daycode-now').count() === 0, 'deeplink: Tagescode-Bildschirm trotz Link');
  await shot(page, 'games-deeplink-rolle-c');
  // Unbekanntes Spiel: Startbildschirm, kein Absturz
  await page.goto('file://' + DIST + '?spiel=gibt-es-nicht');
  await page.locator('#tile-session, #btn-found').first().waitFor({ timeout: 5000 });
  errors.forEach((e) => problems.push('deeplink: ' + e));
  await browser.close();
}

if (problems.length) {
  console.log('PROBLEME:\n' + [...new Set(problems)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Spiele-Test OK – alle Spiele laufen im Auto-Modus bis zum Ende, Deep-Link und QR geprüft.');
}

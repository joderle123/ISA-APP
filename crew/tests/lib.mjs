/* Test-Helfer für CREW (Playwright, iPad-Größe).
   Aufruf eines Tests:  node crew/tests/smoke.mjs  (vorher: node crew/build.js) */
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const DIST = process.env.CREW_DIST ? path.resolve(process.env.CREW_DIST, 'index.html') : path.resolve(HERE, '..', 'dist', 'index.html');
export const SHOTS = process.env.CREW_SHOTS || path.resolve(HERE, '..', '.shots');

export const VIEWPORTS = {
  ipadLandscape: { width: 1180, height: 820 },
  ipadPortrait: { width: 820, height: 1180 },
  beamer: { width: 1600, height: 900 },
  phone: { width: 390, height: 844 },
};

export async function launch(viewport = VIEWPORTS.ipadLandscape) {
  const browser = await pw.chromium.launch();
  const context = await browser.newContext({ viewport, hasTouch: true, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  // Animationen & Wartezeiten stark verkürzen, damit Tests schnell laufen
  await page.addInitScript(() => {
    const _st = window.setTimeout;
    window.__fast = true;
    window.setTimeout = (fn, ms, ...a) => _st(fn, Math.min(ms || 0, 30), ...a);
  });
  await page.goto('file://' + DIST);
  return { browser, context, page, errors };
}

export async function shot(page, name, wait = 450) {
  fs.mkdirSync(SHOTS, { recursive: true });
  await page.waitForTimeout(wait); // Einblend-Animationen abwarten
  const file = path.join(SHOTS, name + '.png');
  await page.screenshot({ path: file });
  return file;
}

export async function clickText(page, text, opts = {}) {
  const loc = page.locator('button:visible', { hasText: text }).first();
  await loc.waitFor({ state: 'visible', timeout: opts.timeout || 5000 });
  await loc.click();
  await page.waitForTimeout(opts.after ?? 120);
}

export async function waitText(page, text, timeout = 5000) {
  await page.getByText(text, { exact: false }).first().waitFor({ state: 'visible', timeout });
}

// Prüft: kein horizontales Scrollen, keine abgeschnittenen Buttons
export async function layoutCheck(page, label) {
  return page.evaluate((label) => {
    const issues = [];
    const st = document.getElementById('stage');
    if (st.scrollWidth > st.clientWidth + 2) issues.push(`${label}: horizontales Scrollen (${st.scrollWidth} > ${st.clientWidth})`);
    document.querySelectorAll('button').forEach((b) => {
      if (b.closest('.paddle-tabs')) return; // Absichtlich seitlich scrollbar
      const r = b.getBoundingClientRect();
      if (r.width && r.right > window.innerWidth + 1) issues.push(`${label}: Button ragt rechts raus: "${b.textContent.trim().slice(0, 30)}"`);
      if (r.width && r.height < 40 && b.offsetParent) issues.push(`${label}: Button zu klein zum Tippen (${Math.round(r.height)}px): "${b.textContent.trim().slice(0, 30)}"`);
    });
    return issues;
  }, label);
}

export async function fresh(page, look = 'arena') {
  await page.evaluate((look) => { localStorage.clear(); }, look);
  await page.reload();
  await page.evaluate((look) => window.CREW.debug.found('Test Crew', look), look);
  await page.waitForTimeout(150);
}

// Level-up-Dialoge wegklicken (Wahl A/B, dann „Stark!“), bis „Bis morgen!“ bereit ist
export async function closeLevelUp(page) {
  for (let i = 0; i < 40; i++) {
    const m = page.locator('.overlay .modal button');
    if (await m.count()) { await m.last().click(); await page.waitForTimeout(150); continue; }
    if (await page.locator('button:visible', { hasText: 'Bis morgen' }).count()) return;
    await page.waitForTimeout(200);
  }
}

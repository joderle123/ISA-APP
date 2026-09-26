// Test-Helfer: Chromium (SwiftShader/WebGL2) starten, Spiel laden, Frames abwarten, Screenshots.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const require = createRequire(import.meta.url);
const PW = process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright';
const { chromium } = require(PW);

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const DIST = join(ROOT, 'dist/index.html');
export const PREVIEW = join(ROOT, 'dist/lumo-vorschau.html');
export const SHOTS = process.env.SHOTS || '/tmp/claude-0/-home-user/f6080bde-1b7f-57ff-8c41-9f899e920847/scratchpad/shots/insel';
mkdirSync(SHOTS, { recursive: true });

export const IPAD_LANDSCAPE = { width: 1180, height: 820 };
export const IPAD_PORTRAIT = { width: 820, height: 1180 };

export function launch() {
  return chromium.launch({
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl', '--autoplay-policy=no-user-gesture-required'],
  });
}

export async function openGame(browser, { viewport = IPAD_LANDSCAPE, query = '', touch = true, file = DIST, waitReady = true } = {}) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, hasTouch: touch });
  const page = await context.newPage();
  page.setDefaultTimeout(180000);
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + (e && e.stack ? e.stack : e)));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push('console.error: ' + m.text());
    if (process.env.VERBOSE) console.log('[page]', m.type(), m.text());
  });
  await page.goto('file://' + file + '?test&' + query);
  if (waitReady) await page.waitForFunction(() => window.LUMO && window.LUMO.loop && window.LUMO.loop.frame > 1, null, { timeout: 180000 });
  return { context, page, errors };
}

// n gerenderte Frames abwarten
export function frames(page, n = 3) {
  return page.evaluate((n) => new Promise((res) => {
    let k = 0;
    const f = () => { if (++k >= n) res(); else requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }), n);
}

// Durchschnittliche Frame-Zeit messen (ms)
export function measureFrames(page, n = 20) {
  return page.evaluate((n) => new Promise((res) => {
    const times = [];
    let last = performance.now();
    const f = (now) => {
      times.push(now - last); last = now;
      if (times.length >= n) { times.shift(); res(times.reduce((a, b) => a + b, 0) / times.length); } else requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }), n);
}

export async function shot(page, name) {
  const p = join(SHOTS, name + '.png');
  await page.screenshot({ path: p, timeout: 180000 });
  return p;
}

// Touch-Wischen über CDP (Multi-Touch-fähig)
export async function touch(page, context) {
  const cdp = await context.newCDPSession(page);
  return {
    start: (pts) => cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pts }),
    move: (pts) => cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pts }),
    end: () => cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }),
  };
}

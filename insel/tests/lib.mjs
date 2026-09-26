// Test-Helfer: Chromium (SwiftShader/WebGL2) starten, Spiel laden, Frames abwarten, Screenshots,
// Knöpfe halten, Kraft-Rad, Dialogwahl, Szenarien (LUMO.debug.runScenario) mit Screenshots dazwischen.
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

// Spiel ohne Intro starten (falls nicht schon per autostart), Ladebildschirm entfernen, Zeit anhalten
export async function startGame(page, { hour = 17.3, freeze = true } = {}) {
  await page.waitForFunction(() => window.LUMO && LUMO.loop && LUMO.loop.frame > 1);
  await page.evaluate(([h, f]) => {
    if (!LUMO.started) LUMO.start({ intro: false });
    document.getElementById('boot')?.remove();
    if (f) LUMO.debug.freezeTime(true);
    LUMO.debug.setTimeOfDay(h);
    LUMO.debug.advance(0.5);
    LUMO.cameraRig.snap();
  }, [hour, freeze]);
  await page.waitForFunction(() => LUMO.started);
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

// ---- Spielzeit und Eingabe (headless über LUMO.debug.advance) ----
export const advance = (page, seconds) => page.evaluate((s) => LUMO.debug.advance(s), seconds);
// Knopf kurz tippen: 'jump' | 'action' | 'power'
export const tap = (page, btn) => page.evaluate((b) => { LUMO.input.press(b); LUMO.debug.advance(1 / 30); LUMO.input.release(b); }, btn);
// Knopf halten (z. B. Pumpsprung, Segel): press → advance → release
export const hold = (page, btn, seconds) => page.evaluate(([b, s]) => { LUMO.input.press(b); LUMO.debug.advance(s); LUMO.input.release(b); LUMO.debug.advance(1 / 30); }, [btn, seconds]);
// Joystick simulieren: x (−1..1 seitlich), y (+1 vorwärts) für n Sekunden
export const move = (page, x, y, seconds) => runScenario(page, [`move ${x} ${y} ${seconds}`]);
export const stateGet = (page, path) => page.evaluate((p) => LUMO.state.get(p), path);
export const debugCall = (page, fn, ...args) => page.evaluate(([f, a]) => LUMO.debug[f](...a), [fn, args]);

// Kraft-Rad (WP19): Kraft-Knopf halten (≥ 0,25 s), Segment wählen. DOM-Konvention: [data-kraft-segment="n"];
// solange das Rad noch nicht existiert, wird das Ereignis 'kraftrad:select' {segment} ausgelöst.
export async function kraftRad(page, segment) {
  await page.evaluate(() => { LUMO.input.press('power'); LUMO.debug.advance(0.35); });
  await frames(page, 1);
  const el = await page.$(`[data-kraft-segment="${segment}"]`);
  if (el) await el.click({ force: true });
  else await page.evaluate((s) => LUMO.events.emit('kraftrad:select', { segment: s }), segment);
  await page.evaluate(() => { LUMO.input.release('power'); LUMO.debug.advance(1 / 30); });
}

// Dialogwahl (WP32): DOM-Konvention [data-choice] (Index oder Textanfang); Fallback: Ereignis 'dialogue:choose' {index|text}
export async function pickChoice(page, which) {
  const els = await page.$$('[data-choice]');
  if (els.length) {
    if (typeof which === 'number') { await els[which].click({ force: true }); return true; }
    for (const el of els) { const t = (await el.textContent()) || ''; if (t.trim().startsWith(which)) { await el.click({ force: true }); return true; } }
    return false;
  }
  return page.evaluate((w) => { LUMO.events.emit('dialogue:choose', typeof w === 'number' ? { index: w } : { text: w }); return true; }, which);
}

// Szenario ausführen; 'shot name' macht hier einen Screenshot (in der Seite ist es nur ein Log-Schritt)
export async function runScenario(page, steps, { log = false } = {}) {
  const all = { ok: true, failures: 0, steps: [] };
  let chunk = [];
  const flush = async () => {
    if (!chunk.length) return;
    const r = await page.evaluate((s) => LUMO.debug.runScenario(s), chunk);
    all.steps.push(...r.steps); all.failures += r.failures; if (!r.ok) all.ok = false;
    if (log) for (const s of r.steps) console.log((s.ok ? '  ✔ ' : '  ✘ ') + s.step + (s.info ? ' · ' + s.info : ''));
    chunk = [];
  };
  for (const step of steps) {
    const m = typeof step === 'string' && step.trim().match(/^shot\s+(\S+)/);
    if (m) { await flush(); await frames(page, 3); const p = await shot(page, m[1]); all.steps.push({ step, ok: true, info: p }); if (log) console.log('  📷 ' + p); }
    else chunk.push(step);
  }
  await flush();
  return all;
}

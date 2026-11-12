// Performance-Bericht (WP02): Draw-Calls, Dreiecke, Frame-Zeit je Region auf Qualität „niedrig“ (4 Blickrichtungen).
// Budget (DESIGN §20): ≤ 220 Draw-Calls auf „niedrig“. Standard: Bericht + Warnung; mit PERF_STRICT=1 schlägt der Test fehl.
// Die Frame-Zeit unter SwiftShader (Software) ist nur ein Vergleichswert, kein iPad-Wert.
// Aufruf: node tests/perf.mjs   (Q=low|medium|high, PERF_STRICT=1)
import { launch, openGame, startGame, frames, measureFrames, IPAD_LANDSCAPE } from './lib.mjs';

const Q = process.env.Q || 'low';
const BUDGET = { calls: Q === 'low' ? 220 : Q === 'medium' ? 320 : 450, tris: Q === 'low' ? 900000 : 1500000 };
const strict = !!process.env.PERF_STRICT;
let failed = false;

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await startGame(page, { hour: 12 });
  const zones = await page.evaluate(() => LUMO.debug.zones);
  const rows = [];
  for (const z of zones) {
    let maxCalls = 0, maxTris = 0, sumMs = 0, n = 0;
    for (let k = 0; k < 4; k++) {
      await page.evaluate(([z, k]) => { LUMO.debug.teleport(z); LUMO.cameraRig.yaw = k * Math.PI / 2; LUMO.cameraRig.targetDist = 8.5; LUMO.debug.advance(0.6); LUMO.cameraRig.snap(); }, [z, k]);
      await frames(page, 3);
      const ms = await measureFrames(page, 8);
      const s = await page.evaluate(() => ({ calls: LUMO.renderer.info.render.calls, tris: LUMO.renderer.info.render.triangles }));
      maxCalls = Math.max(maxCalls, s.calls); maxTris = Math.max(maxTris, s.tris); sumMs += ms; n++;
    }
    rows.push({ zone: z, calls: maxCalls, tris: maxTris, ms: sumMs / n });
  }
  const stats = await page.evaluate(() => LUMO.debug.stats());
  console.log(`Qualität ${stats.quality} · DPR ${stats.dpr} · Terrain ${stats.terrainTris} Dreiecke · ${stats.vegetation} Pflanzen · ${stats.colliders} Kollider`);
  console.log('Zone          Draw-Calls  Dreiecke   Frame (SwiftShader)');
  for (const r of rows) {
    const over = r.calls > BUDGET.calls || r.tris > BUDGET.tris;
    console.log(`${(over ? '⚠ ' : '  ') + r.zone.padEnd(12)} ${String(r.calls).padStart(9)}  ${String((r.tris / 1000).toFixed(0) + 'k').padStart(8)}   ${r.ms.toFixed(1)} ms`);
    if (over) { console.log(`   Budget: ≤ ${BUDGET.calls} Draw-Calls, ≤ ${(BUDGET.tris / 1000).toFixed(0)}k Dreiecke auf ${Q}`); if (strict) failed = true; }
  }
  if (errors.length) { console.log('✘ Seitenfehler:', errors.slice(0, 3).join('\n')); failed = true; }
  await context.close();
} catch (e) {
  console.error(e);
  failed = true;
} finally {
  await browser.close();
}
console.log(failed ? '\n✘ perf' : '\n✔ perf');
process.exit(failed ? 1 : 0);

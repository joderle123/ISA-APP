// Kern-Prüfungen (schnell, Qualität „niedrig“): Sprung-Puffer und Kanten-Toleranz, Kamera-Mindestabstand im Wald,
// Schleier-Formel während der Welle, Figur-Proportionen und Ausdrucks-API, Farbkorrektur-Uniforms.
// Aufruf: node tests/core.mjs
import { launch, openGame, frames } from './lib.mjs';

const results = [];
let failed = false;
function check(name, ok, info = '') {
  results.push({ name, ok, info });
  console.log(ok ? '✔' : '✘', name, info);
  if (!ok) failed = true;
}

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { query: 'q=low&skipintro&autostart' });
  await page.waitForFunction(() => LUMO.started, null, { timeout: 60000 });
  await page.evaluate(() => { document.getElementById('boot')?.remove(); LUMO.debug.freezeTime(true); LUMO.debug.setTimeOfDay(12); LUMO.debug.teleport('hafen'); LUMO.debug.advance(0.5); });

  // ---- Sprung-Puffer: kurz vor der Landung gedrückt → springt beim Aufsetzen erneut ----
  const buf = await page.evaluate(() => {
    const P = LUMO.player, I = LUMO.input, D = LUMO.debug;
    I.press('jump'); D.advance(1 / 30); I.release('jump');
    D.advance(0.6);                       // noch in der Luft (Flugzeit ≈ 0,73 s)
    const airborne = !P.grounded;
    I.press('jump'); D.advance(1 / 30); I.release('jump');
    D.advance(0.15);                      // Landung (≈0,66 s) + gepufferter Sprung
    return { airborne, vy: P.velocity.y, grounded: P.grounded };
  });
  check('Sprung-Puffer löst zweiten Sprung aus', buf.airborne && !buf.grounded && buf.vy > 2, JSON.stringify(buf));
  await page.evaluate(() => LUMO.debug.advance(1.5));

  // ---- Kanten-Toleranz: kurz nach dem Verlassen des Bodens springen geht noch ----
  const coy = await page.evaluate(() => {
    const P = LUMO.player, I = LUMO.input, D = LUMO.debug;
    P.position.y += 1.5; D.advance(1 / 30);   // Boden verloren (kein Sprung)
    const fell = !P.grounded && P.velocity.y <= 0;
    D.advance(0.05);
    I.press('jump'); D.advance(1 / 30); I.release('jump');
    const vy = P.velocity.y;
    D.advance(1.5);
    // zu spät: 0,3 s nach der Kante darf es nicht mehr gehen
    P.position.y += 1.5; D.advance(0.3);
    I.press('jump'); D.advance(1 / 30); I.release('jump');
    const vyLate = P.velocity.y;
    D.advance(1.5);
    return { fell, vy, vyLate };
  });
  check('Kanten-Toleranz erlaubt späten Sprung (0,08 s)', coy.fell && coy.vy > 3, JSON.stringify(coy));
  check('Kanten-Toleranz endet nach 0,12 s', coy.vyLate <= 0, `vy ${coy.vyLate.toFixed(2)}`);

  // ---- Kamera im Wald: nie näher als 2,8 m an den Fokus ----
  const cam = await page.evaluate(() => {
    const r = LUMO.cameraRig;
    LUMO.debug.teleport('dschungel');
    const min = [];
    for (let i = 0; i < 8; i++) {
      r.yaw = i * 0.79; r.targetDist = 8.5;
      let m = 99;
      // die ersten Bilder nach dem harten Drehsprung überspringen (Kamera schwenkt über die Sehne)
      for (let k = 0; k < 50; k++) { LUMO.debug.advance(1 / 30); if (k >= 12) m = Math.min(m, LUMO.camera.position.distanceTo(r.focus)); }
      min.push(+m.toFixed(2));
    }
    return min;
  });
  check('Kamera bleibt im Dschungel ≥ 2,8 m entfernt', cam.every((d) => d >= 2.8), cam.join(' '));

  // ---- Schleier-Formel während der Welle ----
  const veilT = await page.evaluate(() => {
    const V = LUMO.world.veil, Z = LUMO.world.island.zoneById('strand');
    const before = V.amountAt(Z.x, Z.z);
    LUMO.debug.restoreZone('strand');
    LUMO.debug.advance(1.2);
    const centre = V.amountAt(Z.x, Z.z);
    const radius = V.wave.radius;                       // ≈ 26 m
    const outside = V.amountAt(Z.x + 36, Z.z);          // in der Zone, aber noch vor der Welle
    const ringVisible = LUMO.world.veilFx.ring.visible;
    LUMO.debug.advance(5);
    return { before, centre, outside, radius, ringVisible, after: V.amountAt(Z.x, Z.z), done: !V.waveActive };
  });
  check('Welle: Mitte farbig, außen noch grau, Lichtring an', veilT.before > 0.8 && veilT.centre < 0.15 && veilT.outside > 0.55 && veilT.ringVisible && veilT.radius > 15 && veilT.radius < 36, JSON.stringify(veilT));
  check('Welle beendet, Zone frei', veilT.done && veilT.after < 0.4, `after ${veilT.after.toFixed(2)}`);

  // ---- Figur ----
  const fig = await page.evaluate(() => {
    const h = LUMO.player.humanoid;
    // nur die Körperteile (ohne unsichtbare Aura/Ring)
    const box = new LUMO.THREE.Box3();
    for (const m of Object.values(h.meshes)) box.union(new LUMO.THREE.Box3().setFromObject(m));
    const total = box.max.y - box.min.y;
    const headH = h.headHeight;   // Kopf ohne Haare
    h.setExpression({ brows: -1, mouth: -0.8 });
    h.update(1);
    const e1 = h.expression;
    h.setExpression(null); h.update(1);
    return { height: h.height, total, headH, heads: total / headH, e1, mouths: Object.keys(h.face.mouths), api: typeof h.setExpression };
  });
  check('Figur ≈ 6 Kopfhöhen (Teen-Proportion)', fig.heads >= 5.6 && fig.heads <= 7.2 && Math.abs(fig.total - fig.height) < 0.15, `${fig.heads.toFixed(2)} Köpfe (Kopf ${fig.headH.toFixed(2)} m, Höhe ${fig.total.toFixed(2)} m)`);
  check('Ausdrucks-API (Brauen/Mund)', fig.api === 'function' && fig.e1.brows < -0.9 && fig.mouths.length === 3, JSON.stringify(fig.e1));

  // ---- Farbkorrektur und Nacht ----
  const grade = await page.evaluate(() => {
    LUMO.debug.setTimeOfDay(17.4);
    const g = { ...LUMO.world.sky.grade, golden: LUMO.world.sky.golden, sunY: LUMO.world.sky.sunDir.y };
    LUMO.debug.setTimeOfDay(23);
    const n = { night: LUMO.world.sky.night, exposure: LUMO.renderer.toneMappingExposure, hemi: LUMO.world.sky.hemi.intensity, sat: LUMO.world.veil.uniforms.uGradeSat.value };
    LUMO.debug.setTimeOfDay(17.3);
    return { g, n };
  });
  check('Goldene Stunde: warme Korrektur, Sonne ≥ 15°', grade.g.golden > 0.9 && grade.g.gain[0] > grade.g.gain[2] && grade.g.sunY > 0.25, JSON.stringify(grade.g));
  check('Nacht: dunkel, entsättigt', grade.n.night > 0.95 && grade.n.exposure < 1 && grade.n.hemi < 0.8 && grade.n.sat < 0.9, JSON.stringify(grade.n));

  await frames(page, 2);
  check('Keine Seitenfehler', errors.length === 0, errors.slice(0, 5).join('\n'));
  await context.close();
} catch (e) {
  console.error(e);
  failed = true;
} finally {
  await browser.close();
}
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} Prüfungen ok`);
process.exit(failed ? 1 : 0);

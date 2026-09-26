// Szenario WP10/11/18/43 (Browser): Schleier mit Flecken, Teil-Farbwelle und Rückfall (Screenshots), Gezeitenbecken mit
// sichtbar änderbarem Pegel, neue Orte Tag/Nacht (Moor, Lagune, Quellen), Requisiten-Galerie, Räume betreten/verlassen
// (10× ohne Speicherwachsen > 5 MB, Übergang < 1 s, Pause innen, Kamera im Raum), Tauchraum aus dem Baukasten.
// Aufruf: node tests/scenarios/welt.mjs   (SHOTS=Ordner, Q=low|medium|high, VERBOSE=1)
import { launch, openGame, startGame, frames, shot, IPAD_LANDSCAPE } from '../lib.mjs';

const Q = process.env.Q || 'low';
const results = [];
let failed = false;
function check(name, ok, info = '') {
  results.push({ name, ok, info });
  console.log(ok ? '✔' : '✘', name, info);
  if (!ok) failed = true;
}
// Helligkeitsraster des Bildes (16×16) – zum Vergleich zweier Zustände ohne PNG-Dekoder
const lumGrid = (page) => page.evaluate(() => {
  const src = LUMO.renderer.domElement;
  const c = document.createElement('canvas'); c.width = 16; c.height = 16;
  const g = c.getContext('2d'); g.drawImage(src, 0, 0, 16, 16);
  const d = g.getImageData(0, 0, 16, 16).data;
  const out = [];
  for (let i = 0; i < 256; i++) out.push((d[i * 4] * 0.3 + d[i * 4 + 1] * 0.59 + d[i * 4 + 2] * 0.11) / 255);
  return out;
});
const gridDiff = (a, b) => a.reduce((s, v, i) => s + Math.abs(v - b[i]), 0) / a.length;
const view = async (page, name, pos, look, hour) => {
  await page.evaluate(([p, l, h]) => { if (h !== undefined) LUMO.debug.setTimeOfDay(h); LUMO.debug.setShot(p, l); LUMO.debug.advance(0.5); }, [pos, look, hour]);
  await frames(page, 3);
  await shot(page, name);
};

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await startGame(page, { hour: 16.5 });

  // ---- Plugins, Slots, Orte ----
  const api = await page.evaluate(() => ({
    plugins: LUMO.plugins.list, failed: LUMO.plugins.failed,
    slots: LUMO.world.veil.slots.filter((s) => s.id).map((s) => s.id), patches: LUMO.world.veil.patches.map((p) => p.id),
    zones: LUMO.world.island.ZONES.map((z) => z.id), rooms: LUMO.debug.rooms(), decor: LUMO.world.decor.list().length,
    bodies: LUMO.world.island.WATER_BODIES.map((b) => b.id), props: LUMO.props.types.length, budget: LUMO.debug.propsBudget().filter((b) => !b.ok),
  }));
  check('Plugins props + welt installiert', api.plugins.includes('props') && api.plugins.includes('welt') && api.failed.length === 0, JSON.stringify(api.plugins));
  check('Schleier: 8 Zonen (mit Moor) + Standard-Flecken', api.slots.length === 11 && api.zones[7] === 'moor' && api.patches.includes('mangrove') && api.patches.includes('glimmer'), api.slots.join(','));
  check('Gewässer und Räume registriert', api.bodies.length >= 10 && api.rooms.length >= 7, `${api.bodies.length} Gewässer · ${api.rooms.length} Räume`);
  check('Requisiten: 17 Typen, alle unter 3k Dreiecken, Dekor gesetzt', api.props >= 17 && api.budget.length === 0 && api.decor >= 20, `${api.decor} Dekor-Gruppen`);

  // ---- Teil-Farbwelle und Rückfall (Screenshots) ----
  await page.evaluate(() => { LUMO.debug.teleport('strand'); LUMO.debug.setShot({ x: 150, y: 16, z: 72 }, { x: 128, y: 3, z: 20 }); LUMO.debug.advance(0.3); });
  await frames(page, 2);
  await page.evaluate(() => { LUMO.debug.restorePatch('strand', 0.5); LUMO.debug.advance(1.8); });
  await frames(page, 2);
  await shot(page, '90_teilwelle');
  const mid = await page.evaluate(() => ({ active: LUMO.world.veil.waveActive, dir: LUMO.world.veil.wave && LUMO.world.veil.wave.dir, here: LUMO.world.veil.amountAt(136, 28) }));
  await page.evaluate(() => LUMO.debug.advance(4));
  const after = await page.evaluate(() => ({ strand: LUMO.world.veil.zoneValue('strand'), mangrove: LUMO.world.veil.amountAt(150, -8), active: LUMO.world.veil.waveActive }));
  check('Teil-Farbwelle auf 0,5: Welle läuft nach außen, Zone endet bei 0,5, Mangroven-Fleck bleibt grau', mid.active && mid.dir === 1 && mid.here < 0.6 && Math.abs(after.strand - 0.5) < 1e-6 && after.mangrove > 0.9 && !after.active, JSON.stringify({ mid, after }));
  await page.evaluate(() => { LUMO.debug.relapse('strand', 1); LUMO.debug.advance(2.2); });
  await frames(page, 2);
  await shot(page, '91_rueckfall');
  const rl = await page.evaluate(() => ({ active: LUMO.world.veil.waveActive, dir: LUMO.world.veil.wave && LUMO.world.veil.wave.dir, kind: LUMO.world.veil.uniforms.uVeilWave2.value.w }));
  await page.evaluate(() => LUMO.debug.advance(5));
  const rl2 = await page.evaluate(() => LUMO.world.veil.zoneValue('strand'));
  check('Rückfall: blaugraue Welle nach innen, Zone wieder 1', rl.active && rl.dir === -1 && rl.kind === 1 && rl2 === 1, JSON.stringify(rl));
  // Fleck per Ereignis und Speichern
  const st = await page.evaluate(() => { LUMO.events.emit('veil:set', { zone: 'mangrove', amount: 0.25 }); LUMO.save.save(); const raw = JSON.parse(localStorage.getItem('lumo.save.' + LUMO.save.current)); return { v: LUMO.world.veil.getPatch('mangrove').veil, saved: raw.veil && raw.veil.patches && raw.veil.patches.mangrove && raw.veil.patches.mangrove.veil }; });
  check('Fleck über veil:set setzbar und im Spielstand (veil.patches)', st.v === 0.25 && st.saved === 0.25, JSON.stringify(st));
  await page.evaluate(() => { LUMO.debug.setPatch('mangrove', 1); LUMO.debug.setShot(null); });

  // ---- Gezeitenbecken: Pegel 0,2 → 1,8 sichtbar ----
  await page.evaluate(() => { LUMO.debug.setVeil('strand', 0); LUMO.debug.setShot({ x: 136, y: 9, z: 62 }, { x: 148, y: 0.5, z: 48 }); LUMO.debug.setTide('alle', 0); LUMO.debug.advance(0.5); });
  await frames(page, 3);
  await shot(page, '92_gezeiten_ebbe');
  const g0 = await lumGrid(page);
  const lv0 = await page.evaluate(() => LUMO.world.island.waterLevel(152, 46));
  await page.evaluate(() => { LUMO.debug.setTide('alle', 1); LUMO.debug.advance(0.5); });
  await frames(page, 3);
  await shot(page, '93_gezeiten_flut');
  const g1 = await lumGrid(page);
  const lv1 = await page.evaluate(() => ({ l: LUMO.world.island.waterLevel(152, 46), mesh: LUMO.world.water.body('gezeiten-ost').mesh.position.y, auto: LUMO.world.water.tide.auto }));
  check('Gezeitenbecken: Pegel per API 0,2 → 1,8 m, Mesh folgt, Bild ändert sich sichtbar', lv0 === 0.2 && lv1.l === 1.8 && lv1.mesh === 1.8 && !lv1.auto && gridDiff(g0, g1) > 0.01, `Δ Bild ${gridDiff(g0, g1).toFixed(3)}`);

  // ---- Neue Orte ohne Schleier, Tag und Nacht ----
  await page.evaluate(() => { for (const z of ['strand', 'moor', 'vulkan', 'dschungel']) LUMO.debug.setVeil(z, 0); LUMO.debug.setPatch('quellen', 0); LUMO.debug.setPatch('mangrove', 0); });
  await view(page, '94_moor_tag', { x: -84, y: 20, z: 86 }, { x: -114, y: 2, z: 68 }, 12.5);
  await view(page, '95_moor_nacht', { x: -84, y: 20, z: 86 }, { x: -114, y: 2, z: 68 }, 23);
  await view(page, '96_lagune_tag', { x: 150, y: 14, z: 18 }, { x: 150, y: 1, z: -8 }, 12.5);
  await view(page, '97_quellen_tag', { x: 30, y: 26, z: -6 }, { x: 47, y: 14, z: -23 }, 12.5);
  await view(page, '98_quellen_nacht', { x: 30, y: 26, z: -6 }, { x: 47, y: 14, z: -23 }, 22.5);
  await view(page, '99_voegel', { x: 84, y: 14, z: -52 }, { x: 70, y: 9, z: -70 }, 15);
  const bloom = await page.evaluate(() => { LUMO.debug.advance(1); return LUMO.world.vegetation.bloom; });
  check('Heide blüht, wenn das Moor frei ist (Blüten-Uniform > 0,8)', bloom > 0.8, String(bloom.toFixed(2)));
  await page.evaluate(() => { for (const z of ['strand', 'moor', 'vulkan', 'dschungel']) LUMO.debug.setVeil(z, 1); LUMO.debug.setPatch('quellen', 1); LUMO.debug.setPatch('mangrove', 1); LUMO.debug.setTimeOfDay(16.5); });

  // ---- Requisiten-Galerie ----
  await page.evaluate(() => { LUMO.debug.setVeil('hafen', 0); LUMO.debug.propsGallery(true, { x: 20, z: 140, spacing: 5.5 }); });
  await view(page, '100_galerie_1', { x: 42, y: 7, z: 152 }, { x: 42, y: 1.5, z: 140 });
  await view(page, '101_galerie_2', { x: 100, y: 8, z: 153 }, { x: 100, y: 2, z: 140 });
  await view(page, '102_galerie_voegel', { x: 122, y: 6, z: 150 }, { x: 118, y: 1.8, z: 141 });
  await page.evaluate(() => { LUMO.debug.propsGallery(false); LUMO.debug.setShot(null); });

  // ---- Räume: betreten/verlassen, Übergang, Pause innen, Kamera im Raum, Heap ----
  const t0 = Date.now();
  const r1 = await page.evaluate(async () => {
    LUMO.debug.teleport('hafen');
    const before = { x: LUMO.player.position.x, z: LUMO.player.position.z };
    // Übergangsdauer: Bauen + Aktivieren ohne Blende messen (die Blende selbst ist fest 0,6 s; unter SwiftShader-Last
    // würden die 300-ms-Timer der Blende sonst mit der Frame-Zeit skalieren)
    const start = performance.now();
    const id = await LUMO.scenes.enter('gezeitenhoehle', { fade: false });
    const ms = performance.now() - start + LUMO.scenes.fadeSeconds * 1000;
    LUMO.debug.advance(0.5); LUMO.cameraRig.snap();
    const b = LUMO.cameraRig.bounds, c = LUMO.camera.position;
    const inside = b && c.x >= b.min.x - 0.01 && c.x <= b.max.x + 0.01 && c.y >= b.min.y - 0.01 && c.y <= b.max.y + 0.01 && c.z >= b.min.z - 0.01 && c.z <= b.max.z + 0.01;
    LUMO.setPaused(true); const pausedT = LUMO.loop.time; LUMO.debug.advance(0.5); const pausedOk = LUMO.paused && LUMO.loop.time === pausedT; LUMO.setPaused(false);
    const water = LUMO.scenes.current.water;
    return { id: id && id.id, ms: Math.round(ms), interior: LUMO.scenes.isInterior, state: LUMO.player.state, grounded: LUMO.player.grounded, y: +LUMO.player.position.y.toFixed(1), inside, pausedOk, before, timePaused: LUMO.time.paused, water: !!water, veilHere: LUMO.world.veil.amountAt(LUMO.player.position.x, LUMO.player.position.z) };
  });
  await frames(page, 3);
  await shot(page, '110_gezeitenhoehle');
  const calls = await page.evaluate(() => LUMO.renderer.info.render.calls);
  check('Gezeitenhöhle betreten: Übergang < 1 s, Figur steht im Raum, Kamera im Raum, Pause innen, Oberwelt-Zeit steht', r1.id === 'gezeitenhoehle' && r1.ms < 1000 && r1.interior && r1.state === 'ground' && r1.grounded && r1.y > 300 && r1.inside && r1.pausedOk && r1.timePaused && r1.water, JSON.stringify(r1));
  check('Innenraum: wenige Draw-Calls (Oberwelt ausgeblendet)', calls < 120, String(calls));
  // Laufen im Raum: Wände halten, Boden trägt
  const walk = await page.evaluate(() => {
    const P = LUMO.player, y0 = P.position.y;
    P.setIntent({ x: 0, y: 1, camYaw: P.yaw + Math.PI, run: true }); LUMO.debug.advance(6); P.setIntent(null);
    const p = LUMO.scenes.pocket, l = { x: P.position.x - p.x, z: P.position.z - p.z };
    return { dy: +(P.position.y - y0).toFixed(2), inside: LUMO.scenes.current.inside(l.x, l.z, 0), state: P.state };
  });
  check('Im Raum laufen: Wände halten, Figur bleibt auf dem Boden', walk.inside && Math.abs(walk.dy) < 1.5 && walk.state !== 'locked', JSON.stringify(walk));
  const orgel = await page.evaluate(() => { const o = LUMO.scenes.current.props.find((h) => h.type === 'orgel'); if (o) o.pulse(1); LUMO.debug.advance(0.2); return !!o; });
  check('Brandungsorgel steht in der Gezeitenhöhle (props-Feature)', orgel);
  // Die Oberwelt-Zeit läuft nach dem Verlassen wieder so wie vorher (der Test hält sie eingefroren: freeze aus, prüfen, wieder an)
  const ex = await page.evaluate(async () => {
    await LUMO.scenes.exit(); LUMO.debug.advance(0.3);
    const r = { interior: LUMO.scenes.isInterior, zone: LUMO.zone, x: +LUMO.player.position.x.toFixed(1), z: +LUMO.player.position.z.toFixed(1), y: +LUMO.player.position.y.toFixed(1), bounds: LUMO.cameraRig.bounds };
    LUMO.debug.freezeTime(false);
    await LUMO.scenes.enter('werkstatt', { fade: false }); r.insidePaused = LUMO.time.paused;
    await LUMO.scenes.exit({ fade: false }); r.timePaused = LUMO.time.paused;
    LUMO.debug.freezeTime(true);
    return r;
  });
  check('Raum verlassen: zurück am Rückkehrpunkt, Zone Hafen, Zeit läuft wieder, Kamera frei', !ex.interior && ex.zone === 'hafen' && Math.abs(ex.x - r1.before.x) < 0.5 && Math.abs(ex.z - r1.before.z) < 0.5 && ex.y < 20 && ex.insidePaused && !ex.timePaused && !ex.bounds, JSON.stringify(ex));
  // 10× rein/raus: Heap stabil (Chromium: performance.memory)
  const heap = await page.evaluate(async () => {
    const mem = () => (performance.memory ? performance.memory.usedJSHeapSize / 1048576 : 0);
    await LUMO.scenes.enter('hafengrotte', { fade: false }); await LUMO.scenes.exit({ fade: false });
    const m0 = mem();
    for (let i = 0; i < 10; i++) { await LUMO.scenes.enter(i % 2 ? 'hafengrotte' : 'werkstatt', { fade: false }); LUMO.debug.advance(0.2); await LUMO.scenes.exit({ fade: false }); LUMO.debug.advance(0.2); }
    const m1 = mem();
    return { m0: +m0.toFixed(1), m1: +m1.toFixed(1), delta: +(m1 - m0).toFixed(1), interior: LUMO.scenes.isInterior, built: LUMO.scenes.built.size };
  });
  check('10× Raum betreten/verlassen: Heap stabil (± 5 MB), Räume gecacht', Math.abs(heap.delta) < 5 && !heap.interior, JSON.stringify(heap));
  // Raum aus Raum (Stapel) und Speichern innen = Rückkehrpunkt
  const stack = await page.evaluate(async () => {
    await LUMO.scenes.enter('federtempel', { fade: false });
    await LUMO.scenes.enter('leuchtturm-etage', { fade: false });
    const depth = LUMO.scenes.depth, cur = LUMO.scenes.current.id;
    LUMO.save.save();
    const raw = JSON.parse(localStorage.getItem('lumo.save.' + LUMO.save.current));
    await LUMO.scenes.exit({ fade: false });
    const back = LUMO.scenes.current && LUMO.scenes.current.id;
    await LUMO.scenes.exit({ fade: false });
    return { depth, cur, back, pos: raw.pos, interior: LUMO.scenes.isInterior };
  });
  check('Szenenstapel: Raum aus Raum, zurück in den vorigen; Speichern innen trägt den Rückkehrpunkt ein', stack.depth === 2 && stack.cur === 'leuchtturm-etage' && stack.back === 'federtempel' && stack.pos && stack.pos.scene === 'welt' && stack.pos.z < 200 && !stack.interior, JSON.stringify(stack));
  for (const id of ['federtempel', 'werkstatt', 'baumhaus']) {
    await page.evaluate(async (id) => { await LUMO.scenes.enter(id, { fade: false }); LUMO.debug.advance(0.5); LUMO.cameraRig.snap(); }, id);
    await frames(page, 3);
    await shot(page, '111_raum_' + id);
    await page.evaluate(() => LUMO.scenes.exit({ fade: false }));
  }
  // Tauchraum aus dem Baukasten: Ring mit room-Feld
  const dive = await page.evaluate(() => {
    const P = LUMO.player, D = LUMO.debug;
    D.grantMoves(true);
    LUMO.world.runes.addWithVisual({ id: 'tauchring-test', kind: 'tauchring', x: 182, z: 40, r: 3, room: 'muschelgrotte' });
    D.teleport({ x: 178, z: 34 }); D.advance(0.3);
    let room = null, exit = null;
    const o1 = LUMO.events.on('dive:room', (e) => { room = e.id; });
    const o2 = LUMO.events.on('dive:exit', (e) => { exit = e.reason; });
    for (let i = 0; i < 10 * 30 && !room; i++) { P.setIntent({ x: 0, y: 1, camYaw: Math.atan2(182 - P.position.x, 40 - P.position.z) + Math.PI }); D.advance(1 / 30); }
    P.setIntent(null);
    const inRoom = { state: P.state, y: +P.position.y.toFixed(0), interior: LUMO.scenes.isInterior };
    LUMO.cameraRig.snap();
    return { room, inRoom, exit, o1: !!o1, o2: !!o2 };
  });
  await frames(page, 3);
  await shot(page, '112_muschelgrotte');
  const diveEnd = await page.evaluate(() => { const P = LUMO.player, D = LUMO.debug; let exit = null; const o = LUMO.events.on('dive:exit', (e) => { exit = e.reason; }); for (let i = 0; i < 40 * 30 && !exit; i++) { P.setIntent({ x: 0, y: 0.6, camYaw: P.yaw + Math.PI, jumpHeld: true }); D.advance(1 / 30); } P.setIntent(null); o(); LUMO.world.runes.remove('tauchring-test'); D.grantMoves(false); return { exit, state: P.state, y: +P.position.y.toFixed(1) }; });
  check('Tauchring mit room → Muschelgrotte aus dem Baukasten, Auftauchen zurück ins Freie', dive.room === 'muschelgrotte' && dive.inRoom.state === 'dive' && dive.inRoom.y > 300 && !dive.inRoom.interior && !!diveEnd.exit && diveEnd.state !== 'dive' && diveEnd.y < 20, JSON.stringify({ dive, diveEnd }));
  console.log('· Räume geprüft in', Date.now() - t0, 'ms');

  await page.evaluate(() => { LUMO.debug.teleport('hafen'); LUMO.debug.advance(0.3); });
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

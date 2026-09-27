// Szenario WP40 + WP54 (Browser): Baumhaus-Podest mit Tür (nur oben nutzbar), Innenraum mit allen Stationen erreichbar,
// Bonsai wächst sichtbar mit dem Taten-Log, Glas (Muscheln nur auf dem Gerät, fehlen im Export-Code), Möbel-Raster,
// Jukebox, Trophäenwand, Hängematte (Puls → 10); Chronik: vier Erinnerungs-Dioramen, Pinnwand mit Zeitstrahl, Kette,
// Widersprüche mit Warum-Slot, Tagebuch-Seite, Cliffhanger-Pool, Grisel ab M3.
// Aufruf: node tests/scenarios/baumhaus.mjs   (SHOTS=Ordner, Q=low|medium|high, VERBOSE=1)
import { launch, openGame, startGame, frames, shot, IPAD_LANDSCAPE } from '../lib.mjs';
import { decodeCode } from '../../src/core/save.js';

const Q = process.env.Q || 'low';
const results = [];
let failed = false;
function check(name, ok, info = '') {
  results.push({ name, ok, info });
  console.log(ok ? '✔' : '✘', name, info);
  if (!ok) failed = true;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const J = (o) => JSON.stringify(o);

const browser = await launch();
try {
  const { page, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart&nostil` });
  await startGame(page, { hour: 15.5 });

  // ---- Plugins ----
  const api = await page.evaluate(() => ({ plugins: LUMO.plugins.list, failed: LUMO.plugins.failed, bh: !!LUMO.baumhaus, ch: !!LUMO.chronik, stations: LUMO.baumhaus.stations.map((s) => s.id), rooms: LUMO.scenes.rooms() }));
  check('Plugins baumhaus und chronik installiert, keine Ausfälle', api.plugins.includes('baumhaus') && api.plugins.includes('chronik') && api.failed.length === 0 && api.bh && api.ch, J(api.failed));
  check('Alle zehn Stationen definiert, Raum registriert', api.stations.length === 10 && api.rooms.includes('baumhaus'), api.stations.join(','));

  // ---- Podest: Tür nur oben ----
  const deck = await page.evaluate(async () => {
    const B = LUMO.baumhaus.deck;
    LUMO.player.teleport(B.x + 6.5, B.z + 1, 0); LUMO.debug.advance(0.4);   // unten am Stamm (neben dem Podest)
    const low = LUMO.debug.baumhaus().doorEnabled;
    LUMO.player.teleport(B.door.x, B.door.z + 0.2, 0); LUMO.debug.advance(0.8);   // Teleport landet auf der Podest-Fläche
    const y = LUMO.player.position.y;
    const high = LUMO.debug.baumhaus().doorEnabled;
    LUMO.debug.setShot({ x: B.x + 7, y: B.y + 3.5, z: B.z + 6 }, { x: B.x + 1, y: B.y + 1.2, z: B.z });
    LUMO.debug.advance(0.3);
    return { low, high, y, deckY: B.y };
  });
  await frames(page, 3);
  await shot(page, '140_baumhaus_podest');
  check('Tür ins Baumhaus: unten aus, oben auf dem Podest an', !deck.low && deck.high && deck.y > deck.deckY - 1, J(deck));

  // ---- Innenraum ----
  const inside = await page.evaluate(async () => {
    LUMO.debug.setShot(null);
    const id = await LUMO.debug.enterBaumhaus();
    LUMO.debug.advance(0.5);
    const info = LUMO.debug.baumhaus();
    const dyn = LUMO.scenes.room('baumhaus').group.getObjectByName('bh-dyn');
    const names = []; dyn.traverse((o) => { if (o.isMesh) names.push(o.name); });
    const acts = LUMO.interactions ? true : false;
    return { id, inside: info.inside, parts: Object.keys(info.parts), fruits: info.parts.bonsai && info.parts.bonsai.fruits, names: [...new Set(names)], acts };
  });
  await frames(page, 3);
  await shot(page, '141_baumhaus_innen');
  check('Raum betreten, alle wachsenden Stationen gebaut', inside.id === 'baumhaus' && inside.inside && ['bonsai', 'glas', 'pinnwand', 'trophaeen', 'tuer'].every((p) => inside.parts.includes(p)), J(inside.parts));
  check('Bonsai startet ohne Früchte', inside.fruits === 0, J(inside.fruits));

  // Alle Stationen sind Interaktionen im Raum
  const its = await page.evaluate(() => {
    const pocket = LUMO.scenes.pocket;
    const out = {};
    for (const s of LUMO.baumhaus.stations) {
      LUMO.player.teleport(pocket.x + s.at[0] * 0.75, pocket.z + s.at[2] * 0.75, 0);
      LUMO.debug.advance(0.3);
      const cur = LUMO.interactions.current;
      out[s.id] = cur ? cur.id : null;
    }
    LUMO.player.teleport(pocket.x, pocket.z + 2.5, 0); LUMO.debug.advance(0.2);
    return out;
  });
  const reached = Object.entries(its).filter(([id, cur]) => cur === 'bh-' + id).length;
  check('Alle zehn Stationen sind im Raum erreichbar (Interaktion in Reichweite)', reached === 10, J(its));

  // ---- Bonsai wächst mit dem Taten-Log ----
  const bonsai = await page.evaluate(() => {
    const before = LUMO.debug.baumhaus().parts.bonsai;
    let grow = null; LUMO.events.on('bonsai:grow', (e) => { grow = e; });
    LUMO.npcs.deed('jolie', 'test-jolie-1', 'Du hast gewartet.');
    LUMO.npcs.deed('tun', 'test-tun-1', 'Danke fürs Tragen.');
    LUMO.npcs.deed('jolie', 'test-jolie-2');
    LUMO.baumhaus.bonsai.addBranch('test-satz', 'Ich darf langsam sein.', '#ffd166');
    LUMO.debug.advance(0.2);
    const after = LUMO.debug.baumhaus().parts.bonsai;
    const dyn = LUMO.scenes.room('baumhaus').group.getObjectByName('bh-dyn');
    let fruitMeshes = 0; dyn.traverse((o) => { if (o.isMesh && o.name === 'bh-bonsai-frucht') fruitMeshes++; });
    return { before, after, grow, fruitMeshes, model: LUMO.debug.bonsaiInfo().fruits.map((f) => f.id) };
  });
  check('Bonsai: drei Taten = drei Früchte, ein Satz = ein Ast, sichtbar größer', bonsai.after.fruits === 3 && bonsai.after.branches === 1 && bonsai.after.size > bonsai.before.size && bonsai.fruitMeshes >= 1 && bonsai.grow && bonsai.grow.fruits === 3, J({ b: bonsai.before, a: bonsai.after, m: bonsai.fruitMeshes }));
  await page.evaluate(() => { const p = LUMO.scenes.pocket; LUMO.debug.setShot({ x: p.x + 3.2, y: p.y + 2.2, z: p.z - 1.6 }, { x: p.x + 1.6, y: p.y + 1.1, z: p.z - 4.6 }); LUMO.debug.advance(0.2); });
  await frames(page, 3);
  await shot(page, '142_baumhaus_bonsai');
  await page.evaluate(() => { LUMO.baumhaus.open('bonsai'); });
  await frames(page, 2);
  const bonsaiOv = await page.evaluate(() => ({ open: LUMO.ui.overlay.isOpen('bh-bonsai'), rows: document.querySelectorAll('[data-overlay=bh-bonsai] .bh-row').length }));
  await shot(page, '143_baumhaus_bonsai_liste');
  check('Bonsai-Fenster listet Früchte und Ast', bonsaiOv.open && bonsaiOv.rows === 4, J(bonsaiOv));
  await page.evaluate(() => LUMO.ui.overlay.closeAll());

  // ---- Glas: Muschel anonym, fehlt im Export ----
  const glas = await page.evaluate(() => {
    LUMO.debug.setShot(null);
    const ok = LUMO.debug.addShell('spass');
    LUMO.state.push('baumhaus.glas', { moment: 'tat-test', day: 1 });
    LUMO.debug.advance(0.2);
    const info = LUMO.debug.baumhaus();
    const dyn = LUMO.scenes.room('baumhaus').group.getObjectByName('bh-dyn');
    let flies = 0; dyn.traverse((o) => { if (o.isMesh && o.name === 'bh-glas-gluehwuermchen') flies++; });
    return { ok, glas: info.glas, parts: info.parts.glas, flies, code: LUMO.save.exportCode(), stored: LUMO.state.get('baumhaus.glas') };
  });
  const decoded = decodeCode(glas.code);
  check('Glas: Muschel und Glühwürmchen im Raum sichtbar', glas.ok && glas.parts.shells === 1 && glas.parts.fireflies === 1 && glas.flies === 1, J(glas.parts));
  check('Der Inhalt des Glases fehlt im Export-Code (Spielstand sonst vollständig)', decoded.data && decoded.data.baumhaus.glas.length === 0 && glas.stored.length === 2 && !glas.code.includes('spass'), J({ export: decoded.data && decoded.data.baumhaus.glas, stored: glas.stored.length }));
  await page.evaluate(() => LUMO.baumhaus.open('glas'));
  await frames(page, 2);
  const glasOv = await page.evaluate(() => ({ open: LUMO.ui.overlay.isOpen('bh-glas'), chips: document.querySelectorAll('[data-overlay=bh-glas] .bh-chip').length }));
  await shot(page, '144_baumhaus_glas');
  check('Glas-Fenster mit sechs Bedürfnis-Fächern', glasOv.open && glasOv.chips === 6, J(glasOv));
  await page.evaluate(() => LUMO.ui.overlay.closeAll());

  // ---- Möbel-Raster ----
  const moebel = await page.evaluate(() => {
    const cat = LUMO.baumhaus.furniture.catalog().map((d) => d.id);
    const blocked = new Set(LUMO.baumhaus.furniture.blocked());
    let free = null;
    for (let cz = 0; cz < 7 && !free; cz++) for (let cx = 0; cx < 7; cx++) if (!blocked.has(`${cx},${cz}`) && Math.hypot((cx - 3) * 1.4, (cz - 3) * 1.4) <= 5.4) { free = [cx, cz]; break; }
    const r1 = LUMO.debug.placeFurniture('hafenkiste', free[0], free[1]);
    const r2 = LUMO.debug.placeFurniture('hafenkiste', 3, 4);
    const r3 = LUMO.debug.placeFurniture('glutstein', free[0], free[1]);
    LUMO.debug.advance(0.2);
    const dyn = LUMO.scenes.room('baumhaus').group.getObjectByName('bh-dyn');
    let n = 0; dyn.traverse((o) => { if (o.name === 'bh-moebel') n++; });
    return { cat, free, r1: r1.ok, r2: r2.ok, r3: r3.ok, n, list: LUMO.baumhaus.furniture.list() };
  });
  check('Möbel: Grundkiste setzbar, gesperrte Zelle nicht, unbekanntes Möbel nicht, steht im Raum', moebel.r1 && !moebel.r2 && !moebel.r3 && moebel.n === 1 && moebel.list.length === 1, J(moebel));
  await page.evaluate(() => LUMO.baumhaus.open('kiste'));
  await frames(page, 2);
  const kisteOv = await page.evaluate(() => ({ open: LUMO.ui.overlay.isOpen('bh-einrichten'), cells: document.querySelectorAll('[data-overlay=bh-einrichten] .bh-cell').length, full: document.querySelectorAll('[data-overlay=bh-einrichten] .bh-cell.is-full').length, cat: document.querySelectorAll('[data-overlay=bh-einrichten] [data-item]').length }));
  await shot(page, '145_baumhaus_einrichten');
  check('Einrichten-Fenster: 7×7 Raster, ein besetztes Feld, Katalog', kisteOv.open && kisteOv.cells === 49 && kisteOv.full === 1 && kisteOv.cat >= 1, J(kisteOv));
  await page.evaluate(() => LUMO.ui.overlay.closeAll());

  // ---- Jukebox ----
  const jb = await page.evaluate(() => {
    let ev = null; LUMO.events.on('jukebox:play', (e) => { ev = e; });
    LUMO.baumhaus.jukebox.set(0, 'auf');
    const ok = LUMO.baumhaus.jukebox.play();
    const cur = LUMO.baumhaus.jukebox.current;
    const music = LUMO.music && LUMO.music.jukebox ? LUMO.music.jukebox.current : null;
    LUMO.baumhaus.jukebox.stop();
    return { ok, cur, music, ev, composer: LUMO.baumhaus.jukebox.composer, after: LUMO.baumhaus.jukebox.current };
  });
  check('Jukebox spielt „Auf“ und stoppt, Komponist vor e13 noch zu', jb.ok && jb.cur && jb.cur.loop === 'auf' && jb.music === 'auf' && jb.ev && jb.ev.loop === 'auf' && !jb.composer && jb.after === null, J(jb));
  await page.evaluate(() => LUMO.baumhaus.open('jukebox'));
  await frames(page, 2);
  await shot(page, '146_baumhaus_jukebox');
  await page.evaluate(() => LUMO.ui.overlay.closeAll());

  // ---- Trophäen ----
  const troph = await page.evaluate(() => {
    LUMO.state.set('medals.hafen-daecher', { medal: 'gold', stern: false, best: 30 });
    LUMO.state.set('units.j1-e11', 'fertig');
    LUMO.debug.advance(0.2);
    return { n: LUMO.baumhaus.trophies().length, part: LUMO.debug.baumhaus().parts.trophaeen };
  });
  check('Trophäenwand zeigt Medaille und Aufnäher', troph.n >= 2 && troph.part.count === troph.n, J(troph));
  await page.evaluate(() => LUMO.baumhaus.open('trophaeen'));
  await frames(page, 2);
  await shot(page, '147_baumhaus_trophaeen');
  await page.evaluate(() => LUMO.ui.overlay.closeAll());

  // ---- Hängematte: Puls fällt auf 10 ----
  const restStart = await page.evaluate(() => {
    LUMO.state.set('session.puls', 80);
    let ev = null; LUMO.events.on('ruhe:start', (e) => { ev = e; });
    LUMO.baumhaus.open('haengematte');
    return { ev, open: LUMO.ui.overlay.isOpen('ruhe') };
  });
  await sleep(3200);
  await frames(page, 2);
  await shot(page, '148_baumhaus_haengematte');
  const restEnd = await page.evaluate(async () => {
    const during = LUMO.state.get('session.puls');
    let ev = null; LUMO.events.on('ruhe:end', (e) => { ev = e; });
    LUMO.ui.overlay.close('ruhe', 'weiter');
    await new Promise((r) => setTimeout(r, 50));
    return { during, ev, puls: LUMO.state.get('session.puls'), open: LUMO.ui.overlay.isOpen('ruhe') };
  });
  check('Hängematte: Ruhe-Szene öffnet, Puls fällt von 80 auf 10, Weiter beendet', restStart.open && restStart.ev && restStart.ev.puls === 80 && restEnd.during <= 15 && restEnd.puls === 10 && restEnd.ev && !restEnd.open, J({ s: restStart, e: restEnd }));

  // ---- Chronik: vier Erinnerungen als Diorama ----
  const memIds = ['erinnerung-1-jolie', 'erinnerung-2-tiago', 'erinnerung-3-maelle', 'erinnerung-4-jhemp'];
  for (let i = 0; i < memIds.length; i++) {
    const id = memIds[i];
    await page.evaluate((id) => { window.__mem = LUMO.debug.showMemory(id); }, id);
    await page.waitForFunction(() => LUMO.chronik.active && document.querySelector('[data-overlay=erinnerung] [data-ok]'), null, { timeout: 20000 });
    await page.evaluate(() => LUMO.debug.advance(0.4));
    await frames(page, 4);
    const during = await page.evaluate(() => ({ active: LUMO.chronik.active, cam: LUMO.cameraRig.mode, hum: LUMO.player.humanoid.group.visible, caption: document.querySelector('.mem-caption') && document.querySelector('.mem-caption').textContent, figures: LUMO.scene.getObjectByName('diorama-' + LUMO.chronik.active.id).children.length }));
    await shot(page, `150_erinnerung_${i + 1}`);
    await page.click('[data-overlay=erinnerung] [data-ok]', { force: true });
    const after = await page.evaluate(async () => { const r = await window.__mem; await new Promise((res) => setTimeout(res, 100)); return { r, cam: LUMO.cameraRig.mode, hum: LUMO.player.humanoid.group.visible, shards: LUMO.state.get('shards'), active: LUMO.chronik.active, seen: LUMO.state.get('chronik.seen') }; });
    check(`Erinnerung ${i + 1}: Diorama mit Figuren, feste Kamera, Bildunterschrift ≤ 12 Wörter; danach Splitter ${i + 1} und alles zurück`, during.active && during.active.shard === i + 1 && during.cam === 'free' && !during.hum && during.caption && during.caption.split(/\s+/).length <= 12 && during.figures >= 3 && after.r.shard === i + 1 && !after.r.closed && after.cam === 'follow' && after.hum && after.shards.includes(i + 1) && !after.active && after.seen.includes(id), J({ during, after: { cam: after.cam, hum: after.hum, shards: after.shards } }));
  }
  const inRoom = await page.evaluate(() => ({ inside: LUMO.baumhaus.isInside, scene: LUMO.scenes.current && LUMO.scenes.current.id }));
  check('Nach den Erinnerungen weiter im Baumhaus', inRoom.inside && inRoom.scene === 'baumhaus', J(inRoom));

  // ---- Pinnwand: legen, Kette, Widerspruch ----
  await page.evaluate(() => LUMO.debug.openChronik());
  await frames(page, 2);
  const board0 = await page.evaluate(() => ({ open: LUMO.ui.overlay.isOpen('chronik'), cards: document.querySelectorAll('[data-overlay=chronik] [data-card]').length, slots: document.querySelectorAll('[data-overlay=chronik] [data-slot]').length, why: document.querySelectorAll('[data-overlay=chronik] [data-why]').length }));
  check('Pinnwand: vier Karten im Vorrat, neun Plätze, ein Widerspruch sichtbar (3↔4)', board0.open && board0.cards === 4 && board0.slots === 9 && board0.why === 1, J(board0));
  await shot(page, '151_chronik_pinnwand');
  const slotOf = await page.evaluate(() => LUMO.chronik.model.SLOT_OF);
  await page.click('[data-overlay=chronik] [data-card="3"]', { force: true });
  await page.click(`[data-overlay=chronik] [data-slot="${slotOf[3]}"]`, { force: true });
  await page.click('[data-overlay=chronik] [data-card="4"]', { force: true });
  await page.click(`[data-overlay=chronik] [data-slot="${slotOf[1]}"]`, { force: true });   // falscher Platz: erlaubt, wackelt
  await frames(page, 2);
  const board1 = await page.evaluate(() => ({ placed: LUMO.chronik.placed(), correct: LUMO.chronik.model.correctCount(LUMO.chronik.placed()), wobble: !!document.querySelector('[data-overlay=chronik] .ch-slot.is-wobble'), full: document.querySelectorAll('[data-overlay=chronik] .ch-slot.is-full').length, tiles: document.querySelectorAll('[data-overlay=chronik] [data-tile]').length, links: document.querySelectorAll('[data-overlay=chronik] .ch-link:not(.is-empty)').length }));
  check('Legen: Splitter 3 richtig, Splitter 4 falsch (wackelt, kein Fehler), Kette zeigt zwei Glieder, Warum-Slot bereit', board1.placed.length === 2 && board1.correct === 1 && board1.wobble && board1.full === 2 && board1.tiles === 3 && board1.links === 2, J(board1));
  await page.click('[data-overlay=chronik] [data-card="4"]', { force: true }).catch(() => {});
  await page.evaluate((s) => { LUMO.debug.placeShard(4, s[4]); }, slotOf);
  await page.evaluate(() => { LUMO.ui.overlay.close('chronik'); LUMO.debug.openChronik(); });
  await frames(page, 2);
  const ls0 = await page.evaluate(() => LUMO.state.get('lichtsplitter', 0));
  await page.click('[data-overlay=chronik] [data-why="wer-rannte"] [data-tile="absicht"]', { force: true });
  const why1 = await page.evaluate(() => ({ solved: LUMO.state.get('chronik.solved', []), off: !!document.querySelector('[data-overlay=chronik] [data-tile="absicht"].is-off') }));
  await page.click('[data-overlay=chronik] [data-why="wer-rannte"] [data-tile="zu-laut"]', { force: true });
  await frames(page, 2);
  const why2 = await page.evaluate(() => ({ solved: LUMO.state.get('chronik.solved', []), ls: LUMO.state.get('lichtsplitter', 0), solvedEl: document.querySelectorAll('[data-overlay=chronik] .ch-solved').length, pin: LUMO.debug.baumhaus().parts.pinnwand }));
  await shot(page, '152_chronik_warum');
  check('Warum-Slot: unpassende Kachel prallt nur ab, passende löst (+2 Lichtsplitter), Pinnwand im Raum zeigt zwei richtige', why1.solved.length === 0 && why1.off && why2.solved.includes('wer-rannte') && why2.ls === ls0 + 2 && why2.solvedEl === 1 && why2.pin.placed === 2 && why2.pin.correct === 2, J({ why1, why2, ls0 }));
  await page.evaluate(() => LUMO.ui.overlay.closeAll());
  await page.evaluate(() => { const p = LUMO.scenes.pocket; LUMO.debug.setShot({ x: p.x + 0.5, y: p.y + 2.4, z: p.z - 2.2 }, { x: p.x, y: p.y + 1.6, z: p.z - 5.9 }); LUMO.debug.advance(0.2); });
  await frames(page, 3);
  await shot(page, '153_chronik_pinnwand_3d');
  await page.evaluate(() => LUMO.debug.setShot(null));

  // ---- Tagebuch-Seite und Cliffhanger ----
  const jn = await page.evaluate(async () => {
    LUMO.ui.journal.open('chronik');
    await new Promise((r) => setTimeout(r, 120));
    const btn = !!document.querySelector('[data-open-chronik]');
    const found = document.querySelectorAll('.jn-page .shard.is-found').length;
    LUMO.ui.journal.close();
    const pool = LUMO.content.list('cliffhangers');
    const cliff = LUMO.session.cliffhanger();
    return { btn, found, poolIds: pool.map((c) => c.id), lines: pool.find((c) => c.id === 'chronik').lines, cliff };
  });
  check('Tagebuch-Seite Chronik mit Knopf zur Pinnwand und vier gefundenen Splittern', jn.btn && jn.found === 4, J({ btn: jn.btn, found: jn.found }));
  check('Cliffhanger-Pool der Chronik registriert, Lagerfeuer-Satz ≤ 12 Wörter', jn.poolIds.includes('chronik') && jn.lines.length >= 2 && jn.lines.every((t) => t.split(/\s+/).length <= 12) && jn.cliff.split(/\s+/).length <= 12, J({ lines: jn.lines, cliff: jn.cliff }));

  // ---- Grisel ab M3 ----
  await page.evaluate(() => LUMO.debug.exitRoom());
  await page.waitForFunction(() => !LUMO.scenes.isInterior, null, { timeout: 10000 });
  const grisel = await page.evaluate(() => {
    const before = LUMO.chronik.grisel.state;
    LUMO.state.set('units.j1-e11', 'gesperrt'); LUMO.state.set('units.j1-e01', 'fertig');
    LUMO.chronik.grisel.refresh();
    const m0 = LUMO.chronik.grisel.state;
    let ev = null; LUMO.events.on('grisel:state', (e) => { ev = e; });
    LUMO.debug.unlockUnit('j1-e11');
    const m3 = LUMO.chronik.grisel.state;
    LUMO.debug.setTimeOfDay(22.5); LUMO.debug.advance(0.5);
    const vis = LUMO.chronik.grisel.handle.group.visible;
    const g = LUMO.chronik.grisel.handle.group.position;
    const S = LUMO.world.island.SITES.klippenGipfel;
    LUMO.debug.setShot({ x: S.x + 40, y: g.y + 6, z: S.z + 30 }, { x: g.x, y: g.y, z: g.z });
    LUMO.debug.advance(0.3);
    return { before, m0, m3, ev, vis, pos: { x: +g.x.toFixed(1), y: +g.y.toFixed(1), z: +g.z.toFixed(1) } };
  });
  await frames(page, 3);
  await shot(page, '154_grisel_ferne');
  check('Grisel: vor M3 verborgen, ab M3 Silhouette über dem Gipfel (nachts sichtbar)', grisel.m0 === 'verborgen' && grisel.m3 === 'ferne' && grisel.ev && grisel.ev.state === 'ferne' && grisel.vis, J(grisel));
  const lf = await page.evaluate(() => { const s = LUMO.debug.grisel('lichtfalter'); const st = LUMO.chronik.grisel.handle.state; LUMO.debug.grisel(null); LUMO.debug.setShot(null); LUMO.debug.setTimeOfDay(15.5); return { s, st, back: LUMO.chronik.grisel.state }; });
  check('Grisel-Zustände umschaltbar (Lichtfalter fürs Finale)', lf.s === 'lichtfalter' && lf.st === 'lichtfalter' && lf.back === 'ferne', J(lf));

  // ---- Wieder rein: Erinnerung noch mal ansehen von der Pinnwand aus (replay gibt keinen neuen Splitter) ----
  const replay = await page.evaluate(async () => {
    const n0 = LUMO.state.get('shards').length;
    const p = LUMO.debug.showMemory(2, true);
    await new Promise((r) => setTimeout(r, 900));
    const act = LUMO.chronik.active;
    LUMO.ui.overlay.close('erinnerung', 'ok');
    const r = await p;
    return { act, r, n1: LUMO.state.get('shards').length, n0 };
  });
  check('Erinnerung erneut ansehen: Replay ohne neuen Splitter', replay.act && replay.act.shard === 2 && replay.r.replay && replay.n1 === replay.n0, J(replay));

  check('Keine Seitenfehler', errors.length === 0, errors.slice(0, 3).join(' | '));
} finally {
  await browser.close();
}
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} Prüfungen bestanden`);
process.exit(failed ? 1 : 0);

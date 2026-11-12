// Szenario WP33 + WP35 (Browser): Puls (Zonen, Anti-Spirale: 10 Fehlschläge nie über 55, Windschatten-Stein, Modus-
// Modifikatoren – Entspannt ändert nichts, Vignette gedeckelt und aus bei reduzierten Effekten, Quellen/Senken), Glimm auf der
// Schulter (Farbe = Puls, Skins), Koffer (Kopf-Gadget verpufft bei 80, Tester vorher/nachher, Ampelplan, Ruhe-Kraft),
// Hilfe holen bei jedem Puls (−50, erwachsene Figur kommt), Sicherer Ort (< 1 s, Puls 10, Umbau), Tore mit Symbol (zu/offen,
// Kollider, Kältekristall friert das Sturmfeld ein), Stopp-Schild (Fenster je Modus, 4 Lichter), Crew-Ruf (< 10 s), Blick-Wörter,
// Klarklang über Satz-Bau, Zuschauer-Wende, Tagebuch-Seiten Koffer und Kräfte.
// Aufruf: node tests/scenarios/kraefte.mjs   (SHOTS=Ordner, Q=low|medium|high, VERBOSE=1)
import { launch, openGame, startGame, frames, shot, IPAD_LANDSCAPE } from '../lib.mjs';

const Q = process.env.Q || 'low';
const results = [];
let failed = false;
function check(name, ok, info = '') {
  results.push({ name, ok, info });
  console.log(ok ? '✔' : '✘', name, info);
  if (!ok) failed = true;
}
const J = (o) => JSON.stringify(o);
const waitFor = (page, fn, ms = 20000) => page.waitForFunction(fn, null, { timeout: ms });

const browser = await launch();
try {
  const { page, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await startGame(page, { hour: 14 });

  // ---- Plugins und Glimm ----
  const p0 = await page.evaluate(() => ({ plugins: LUMO.plugins.list, failed: LUMO.plugins.failed, glimmParent: LUMO.glimm.mesh.parent === LUMO.player.humanoid.joints.spine, skin: LUMO.glimm.skin, color: LUMO.debug.puls().glimmColor, active: LUMO.puls.active, zone: LUMO.puls.zone }));
  check('Plugins puls, koffer, abilities, gates installiert, keine Ausfälle', ['puls', 'koffer', 'abilities', 'gates'].every((x) => p0.plugins.includes(x)) && p0.failed.length === 0, J(p0.failed));
  check('Glimm sitzt auf der Schulter (Kind der Wirbelsäule), Skin Salamander, vor e11 neutral/mint', p0.glimmParent && p0.skin === 'salamander' && !p0.active && p0.zone === 'gruen', J(p0));
  await page.evaluate(() => { LUMO.debug.teleport('hafen'); LUMO.debug.setTimeOfDay(16.8); const p = LUMO.player.position; const y = LUMO.player.yaw; LUMO.debug.setShot({ x: p.x + Math.sin(y) * 2.2 - Math.cos(y) * 1.2, y: p.y + 1.9, z: p.z + Math.cos(y) * 2.2 + Math.sin(y) * 1.2 }, { x: p.x, y: p.y + 1.45, z: p.z }); LUMO.debug.advance(0.5); });
  await frames(page, 3);
  await shot(page, '160_glimm_schulter');
  await page.evaluate(() => LUMO.debug.setShot(null));

  // ---- Puls: Zonen, Glimm-Farbe, Anti-Spirale ----
  const z1 = await page.evaluate(() => { LUMO.debug.grantAbility('ruhe.puls'); LUMO.debug.setPuls(80); LUMO.debug.advance(3); return { zone: LUMO.puls.zone, color: LUMO.debug.puls().glimmColor, badge: document.querySelector('.glimm-badge').dataset.zone, vig: parseFloat(document.querySelector('.puls-vignette').style.opacity), rotCls: document.querySelector('.puls-vignette').classList.contains('is-rot') }; });
  check('Puls 80 → Zone rot, Glimm rot (3D und Badge), Vignette gedeckelt ≤ 0,5 mit Herzschlag-Klasse', z1.zone === 'rot' && /^#ff/i.test(z1.color) && z1.badge === 'rot' && z1.vig > 0.3 && z1.vig <= 0.5 && z1.rotCls, J(z1));
  await frames(page, 2);
  await shot(page, '161_puls_rot_vignette');
  const anti = await page.evaluate(async () => {
    LUMO.debug.setPuls(20);
    const values = [];
    for (let i = 0; i < 10; i++) { LUMO.debug.pulsFail(1, 'test'); values.push(LUMO.puls.value); await new Promise((r) => setTimeout(r, 5)); }
    const info = LUMO.debug.puls();
    return { values, max: Math.max(...values), shelters: info.shelters.length, consecutive: info.consecutive, stone: !!LUMO.scene.getObjectByName('prop-menhir') };
  });
  check('Anti-Spirale: 10 Fehlschläge hintereinander heben den Puls nie über 55; ab dem 2. erscheint ein Windschatten-Stein', anti.max <= 55 && anti.shelters >= 1 && anti.consecutive === 10 && anti.stone, J(anti));

  // ---- Modus-Modifikatoren, reduzierte Effekte, Quellen und Senken ----
  const mods = await page.evaluate(() => {
    const out = {};
    LUMO.debug.setPuls(90);
    for (const m of ['entspannt', 'abenteuer', 'profi']) { LUMO.debug.setMode(m); LUMO.debug.advance(0.1); const x = LUMO.player.modifiers; out[m] = { grab: x.grabTolerance, glide: x.glideStability, visual: x.glideVisualOnly, vig: parseFloat(document.querySelector('.puls-vignette').style.opacity) }; }
    LUMO.debug.setMode('abenteuer');
    LUMO.ui.settings.set('reducedFx', true); LUMO.debug.advance(0.1);
    out.reduced = { cls: document.documentElement.classList.contains('reduced-fx'), vig: parseFloat(document.querySelector('.puls-vignette').style.opacity) };
    LUMO.ui.settings.set('reducedFx', false); LUMO.debug.advance(0.1);
    LUMO.debug.setPuls(20); LUMO.debug.advance(0.1);
    out.gruen = { grab: LUMO.player.modifiers.grabTolerance, vig: parseFloat(document.querySelector('.puls-vignette').style.opacity) };
    return out;
  });
  check('Entspannt ändert keine Steuerparameter (nur Optik); Abenteuer Rot: Greifen −30 %; Profi Rot: −40 %, Segel ±15 %', mods.entspannt.grab === 1 && mods.entspannt.glide === 1 && mods.entspannt.visual === true && mods.entspannt.vig > 0 && mods.abenteuer.grab === 0.7 && mods.profi.grab === 0.6 && mods.profi.glide === 0.85, J(mods));
  check('Reduzierte Effekte nehmen die Vignette heraus; bei Grün keine Vignette und volle Steuerung', mods.reduced.cls && mods.reduced.vig === 0 && mods.gruen.grab === 1 && mods.gruen.vig === 0, J({ r: mods.reduced, g: mods.gruen }));
  const flow = await page.evaluate(() => {
    LUMO.debug.setPuls(50); LUMO.debug.pulsSource('test', 6); LUMO.debug.advance(4);
    const up = LUMO.puls.value;
    LUMO.debug.pulsSource('test', null); LUMO.debug.pulsShelter(true); LUMO.debug.advance(4);
    const down = LUMO.puls.value; const inside = LUMO.debug.puls().inShelter;
    LUMO.debug.pulsShelter(false);
    return { up, down, inside };
  });
  check('Quellen heben den Puls (50 → > 60 in 4 s), Windschatten senkt ihn deutlich', flow.up > 60 && flow.down < flow.up - 12 && flow.inside === 'debug', J(flow));

  // ---- Koffer: Gadgets, Verpuffen bei Rot, Tester, Ampelplan, Ruhe-Kraft ----
  const kf = await page.evaluate(async () => {
    for (const g of ['zaehllaterne', 'quetschkoralle', 'kaeltekristall', 'sprintventil', 'hilfeholen']) LUMO.debug.grantGadget(g);
    let verpufft = null; LUMO.events.on('koffer:verpufft', (e) => { verpufft = e; });
    LUMO.debug.setPuls(80);
    const r1 = await LUMO.debug.useGadget('zaehllaterne');
    const chip = document.querySelector('[data-puls-chip]') && document.querySelector('[data-puls-chip]').textContent;
    const glimm = (document.querySelector('.glimm-line') || {}).textContent || '';
    const p1 = LUMO.puls.value;
    LUMO.debug.setPuls(40);
    const r2 = await LUMO.debug.useGadget('zaehllaterne');
    LUMO.debug.setPuls(80);
    const r3 = await LUMO.debug.useGadget('quetschkoralle');
    const k = LUMO.debug.koffer();
    return { r1, r2, r3, verpufft: !!verpufft, chip, glimm, p1, tests: k.tests, owned: k.owned, ampel: k.ampel };
  });
  check('Kopf-Gadget bei 80 verpufft sichtbar und ohne Strafe (Puls bleibt 80, Chip „puff“, Glimm-Zeile)', kf.r1.verpufft === true && kf.p1 === 80 && kf.verpufft && /puff/i.test(kf.chip || '') && /Puff|Kopf/.test(kf.glimm), J({ r1: kf.r1, chip: kf.chip, glimm: kf.glimm }));
  check('Bei Gelb wirkt die Zähl-Laterne; Quetschkoralle bei 80 senkt; Tester merkt vorher/nachher und Reichweite', kf.r2.ok && kf.r2.after < 40 && kf.r3.ok && kf.r3.after < 80 && kf.tests.quetschkoralle && kf.tests.quetschkoralle.before === 80 && kf.tests.quetschkoralle.reichweite > 0, J({ r2: kf.r2, r3: kf.r3, t: kf.tests.quetschkoralle }));
  check('Neue Gadgets landen automatisch in freien Ampel-Zonen; Notfall-Slot mit erwachsener Figur', kf.owned.length === 5 && kf.ampel.gruen && kf.ampel.notfall === 'ilda', J(kf.ampel));
  const am = await page.evaluate(async () => {
    const w = LUMO.debug.setAmpel('rot', 'zaehllaterne');
    LUMO.debug.setAmpel('rot', 'quetschkoralle');
    LUMO.debug.setPuls(85);
    LUMO.events.emit('kraft:tap', { id: 'ruhe' });
    await new Promise((r) => setTimeout(r, 60));
    return { warn: w.warn, after: LUMO.puls.value, rot: LUMO.debug.koffer().ampel.rot };
  });
  check('Ampelplan: Kopf auf Rot gibt nur einen Hinweis; Ruhe-Kraft tippen nutzt das Rot-Gadget (85 → kleiner)', am.warn === 'kopf-bei-rot' && am.rot === 'quetschkoralle' && am.after < 85, J(am));
  await page.evaluate(() => LUMO.ui.journal.open('koffer'));
  await frames(page, 3);
  const kp = await page.evaluate(() => ({ faecher: document.querySelectorAll('.kf-fach').length, gadgets: document.querySelectorAll('.kf-gadget').length, ampel: !!document.querySelector('.kf-ampel'), on: document.querySelectorAll('.kf-opt.is-on').length, graph: !!document.querySelector('.kf-graph') }));
  check('Tagebuch „Koffer“: 5 Fächer, 5 Gadgets, Ampelplan mit Auswahl, Tester-Graph', kp.faecher === 5 && kp.gadgets === 5 && kp.ampel && kp.on >= 4 && kp.graph, J(kp));
  await shot(page, '162_koffer_seite');
  await page.evaluate(() => LUMO.ui.overlay.closeAll('test'));

  // ---- Hilfe holen bei jedem Puls: erwachsene Figur kommt, Puls −50 ----
  const hilfeAt = async (start) => {
    await page.evaluate((s) => { LUMO.debug.teleport('hafen'); LUMO.debug.setTimeOfDay(14); LUMO.debug.setPuls(s); window.__hilfe = LUMO.debug.hilfe(); LUMO.debug.advance(9); }, start);
    await waitFor(page, () => document.querySelector('.bubble[data-who="ilda"]'), 15000);
    const near = await page.evaluate(() => { const n = LUMO.npcs.get('ilda'); return n.distTo(LUMO.player.position); });
    await page.evaluate(() => { const b = document.querySelector('.bubble [data-next]'); if (b) b.click(); else LUMO.ui.bubbles.clear(); });
    const r = await page.evaluate(() => window.__hilfe);
    return { ...r, near: +near.toFixed(1) };
  };
  const h1 = await hilfeAt(95);
  check('Hilfe holen bei Rot (95): Ilda kommt in Gesprächsabstand, sagt einen Satz, Puls −50 → 45', h1.npc === 'ilda' && h1.before === 95 && h1.after === 45 && h1.near < 4, J(h1));
  const h2 = await hilfeAt(10);
  check('Hilfe holen ist bei jedem Puls da (auch Grün, 10 → 0)', h2.npc === 'ilda' && h2.after === 0 && h2.near < 4, J(h2));

  // ---- Sicherer Ort: < 1 s, Puls 10, Umbau, zurück ----
  const so = await page.evaluate(async () => {
    LUMO.debug.grantAbility('ruhe.kopf');
    LUMO.debug.setPuls(75);
    const before = { x: LUMO.player.position.x, z: LUMO.player.position.z };
    let entered = null; LUMO.events.on('safeplace:entered', (e) => { entered = e; });
    LUMO.events.emit('safeplace:open', { kind: 'sichererOrt' });
    const t0 = performance.now();
    while (!LUMO.sichererOrt.isInside && performance.now() - t0 < 5000) await new Promise((r) => setTimeout(r, 30));
    const ms = performance.now() - t0;
    LUMO.debug.advance(0.5);
    return { inside: LUMO.sichererOrt.isInside, ms: Math.round(ms), entered: entered ? Math.round(entered.ms) : null, puls: LUMO.puls.value, scene: LUMO.scenes.current && LUMO.scenes.current.id, before, cfg: LUMO.sichererOrt.config };
  });
  check('Sicherer Ort über das Pause-Ereignis: drin in unter 1 s, Puls fällt auf 10', so.inside && so.ms < 1000 && so.entered !== null && so.entered < 1000 && so.puls === 10 && so.scene === 'sicherer-ort', J(so));
  await frames(page, 3);
  await shot(page, '163_sicherer_ort');
  const so2 = await page.evaluate(async () => {
    LUMO.sichererOrt.set('biom', 'tempel'); LUMO.sichererOrt.set('tier', 'vogel-sonne'); LUMO.sichererOrt.set('wetter', 'funken');
    const h = LUMO.sichererOrt.edit();
    const opts = h.el.querySelectorAll('.so-opt').length, on = h.el.querySelectorAll('.so-opt.is-on').length;
    h.close('test');
    await LUMO.sichererOrt.exit();
    await LUMO.sichererOrt.enter();
    const def = LUMO.sichererOrt.roomDef();
    const vogel = !!LUMO.scene.getObjectByName('prop-vogel');
    await LUMO.sichererOrt.exit();
    LUMO.debug.advance(0.3);
    return { opts, on, kit: def.kit, vogel, out: !LUMO.sichererOrt.isInside, scene: LUMO.scenes.current, priv: LUMO.state.get('private.sichererOrt') };
  });
  check('Umbau: Editor mit Optionen je Kategorie, Tempel-Biom mit Sonnenvogel gebaut (privat gespeichert), Verlassen führt zurück', so2.opts >= 20 && so2.on === 5 && so2.kit === 'tempel' && so2.vogel && so2.out && so2.scene === null && so2.priv.biom === 'tempel', J(so2));

  // ---- Tore mit Symbol ----
  const gt = await page.evaluate(() => {
    const list = LUMO.gates.list();
    const withSym = list.filter((g) => LUMO.gates.get(g.id).symbolSprite && LUMO.gates.get(g.id).symbolSprite.sprite.visible).length;
    const st = LUMO.debug.gateInfo('klippen-sturmfeld'), br = LUMO.debug.gateInfo('strand-bruecke'), ws = LUMO.debug.gateInfo('klippen-windschatten-1');
    LUMO.debug.grantAbility('teamgeist.ruf');
    const br2 = LUMO.debug.gateInfo('strand-bruecke');
    return { n: list.length, withSym, types: [...new Set(list.map((g) => g.type))].length, st, br, br2, ws };
  });
  check('Tore: ≥ 15 gesetzt, jedes mit Symbol; Sturmfeld offen (Kältekristall im Koffer), Windschatten immer frei', gt.n >= 15 && gt.withSym === gt.n && gt.types >= 12 && gt.st.open === true && gt.ws.open === true && gt.ws.symbol.label === 'frei', J({ n: gt.n, st: gt.st.open, ws: gt.ws }));
  check('Runentor am Strand: zu mit Kollider und Symbol Teamgeist/Crew-Ruf, öffnet sich mit dem Upgrade (Kollider weg)', gt.br.open === false && gt.br.colliders === 1 && gt.br.symbol.icon === 'team' && gt.br.symbol.label === 'Crew-Ruf' && gt.br2.open === true && gt.br2.colliders === 0, J({ br: gt.br, br2: gt.br2 }));
  const gn = await page.evaluate(() => {
    const g = LUMO.debug.gateInfo('klangschlucht-tor');
    LUMO.debug.teleport({ x: g.x + 3, z: g.z + 4 }, Math.atan2(g.x - (g.x + 3), g.z - (g.z + 4)));
    LUMO.debug.advance(0.6);
    const toast = [...document.querySelectorAll('.toasts *')].map((e) => e.textContent).join(' | ');
    LUMO.debug.setShot({ x: g.x + 7, y: g.y + 5, z: g.z + 9 }, { x: g.x, y: g.y + 2.4, z: g.z });
    LUMO.debug.advance(0.2);
    return { open: g.open, toast, label: g.symbol.label };
  });
  check('Nahe an einem gesperrten Klangtor: Hinweis „Zu. Braucht: …“ mit der Fähigkeit', gn.open === false && /Braucht/.test(gn.toast) && gn.toast.includes(gn.label), J(gn));
  await frames(page, 3);
  await shot(page, '164_tor_symbol');
  await page.evaluate(() => LUMO.debug.setShot(null));

  // ---- Stopp-Schild ----
  const stp = await page.evaluate(() => {
    LUMO.debug.grantAbility('mut.stopp'); LUMO.debug.setMode('abenteuer');
    LUMO.debug.teleport('klippen'); LUMO.debug.setTimeOfDay(14); LUMO.debug.advance(0.5);
    const luc = LUMO.npcs.get('luc');
    luc.warpTo(LUMO.player.position.x + Math.sin(LUMO.player.yaw) * 3, LUMO.player.position.z + Math.cos(LUMO.player.yaw) * 3);
    LUMO.npcs.setHeat('luc', 85);
    let done = null; LUMO.events.on('mut:stopp', (e) => { done = e; });
    const start = LUMO.debug.stopp();
    LUMO.debug.advance(0.3);
    const info = LUMO.debug.stoppInfo();
    const shown = document.querySelector('.stopp-schild').classList.contains('is-on');
    return { start, info, shown };
  });
  check('Stopp-Schild startet mit Ziel Luc, Fenster ±150 ms (Abenteuer), Anzeige mit vier Lichtern', stp.start.ok && stp.start.target === 'luc' && stp.info.windowMs === 150 && stp.info.lights === 0 && stp.shown, J(stp));
  await frames(page, 2);
  await shot(page, '165_stopp_schild');
  const stp2 = await page.evaluate(async () => {
    let done = null; LUMO.events.on('mut:stopp', (e) => { done = e; });
    const r = LUMO.debug.stoppAuto();
    await new Promise((res) => setTimeout(res, 40));
    return { r, done, heat: LUMO.debug.hitze('luc'), hidden: !document.querySelector('.stopp-schild').classList.contains('is-on'), profiWin: (LUMO.debug.setMode('profi'), LUMO.debug.stopp('luc').ok && LUMO.debug.stoppInfo().windowMs) };
  });
  check('Vier Treffer im Ring = Stopp: Ereignis, Lucs Hitze −25 (85 → 60), Anzeige geht aus; Profi-Fenster ±100 ms', stp2.r && stp2.r.done && stp2.r.lights === 4 && stp2.done && stp2.done.target === 'luc' && stp2.heat === 60 && stp2.hidden && stp2.profiWin === 100, J(stp2));
  await page.evaluate(() => { LUMO.abilities.mut.stoppCancel(); LUMO.debug.setMode('abenteuer'); });

  // ---- Crew-Ruf: Helfer erreicht das Ziel in < 10 s ----
  const cr = await page.evaluate(async () => {
    LUMO.debug.teleport('hafen'); LUMO.debug.setTimeOfDay(14); LUMO.debug.advance(0.3);
    const p = LUMO.player.position, y = LUMO.player.yaw;
    const target = { id: 'test-ziel', x: p.x + Math.sin(y) * 4, z: p.z + Math.cos(y) * 4 };
    const pr = LUMO.debug.crewRuf('jolie', target);
    for (let i = 0; i < 12; i++) { LUMO.debug.advance(1); await new Promise((r) => setTimeout(r, 5)); }
    const r = await pr;
    const j = LUMO.npcs.get('jolie');
    return { r, dist: +Math.hypot(j.position.x - target.x, j.position.z - target.z).toFixed(2) };
  });
  check('Crew-Ruf: Jolie läuft zur Markierung und ist in unter 10 s da (< 2,5 m)', cr.r.ok && cr.r.seconds < 10 && cr.dist < 2.5, J(cr));
  await frames(page, 2);
  await shot(page, '166_crew_ruf');

  // ---- Blick-Wörter, Fäden, Zuschauer, Tagebuch „Kräfte“ ----
  const bl = await page.evaluate(() => {
    LUMO.debug.grantAbility('blick'); LUMO.debug.grantAbility('blick.faeden'); LUMO.debug.setMode('abenteuer');
    const tun = LUMO.npcs.get('tun');
    const p = LUMO.player.position;
    tun.warpTo(p.x + Math.sin(LUMO.player.yaw) * 3, p.z + Math.cos(LUMO.player.yaw) * 3);
    LUMO.debug.setNpcEmotion('tun', 'wut', 8);
    LUMO.debug.setNpcEmotion('jolie', 'wut', 8);
    LUMO.debug.advance(0.2);
    const r = LUMO.debug.blick();
    const zs = LUMO.debug.zuschauer('tun');
    return { ok: r.ok, n: r.npcs.length, word: r.word, faeden: r.threads.length, lines: !!LUMO.scene.getObjectByName('blick-faden'), worte: LUMO.state.get('blickWorte', []), zs };
  });
  check('Blick-Impuls: Figuren in der Nähe, feineres Wort von Tun (wütend), Wort gesammelt, Fäden zwischen Tun und Jolie', bl.ok && bl.n >= 2 && bl.word && bl.word.npc === 'tun' && bl.word.word === 'wütend' && bl.worte.includes('wütend') && bl.faeden >= 1 && bl.lines, J(bl));
  check('Zuschauer-Wende: Umstehende wenden sich zu, Tuns Hitze sinkt −15 je Person (max. 3)', bl.zs.ok && bl.zs.count >= 1 && bl.zs.heat === -15 * Math.min(3, bl.zs.count), J(bl.zs));
  await page.evaluate(() => LUMO.ui.journal.open('kraefte'));
  await frames(page, 3);
  const kr = await page.evaluate(() => ({ cards: document.querySelectorAll('.kr-card').length, on: document.querySelectorAll('.kr-stufe.is-on').length, words: document.querySelectorAll('.kr-word').length, wordsOn: document.querySelectorAll('.kr-word.is-on').length }));
  check('Tagebuch „Kräfte“: vier Karten, freigeschaltete Stufen markiert, 36 Wort-Felder mit gesammelten Wörtern', kr.cards === 4 && kr.on >= 5 && kr.words === 36 && kr.wordsOn >= 1, J(kr));
  await shot(page, '167_kraefte_seite');
  await page.evaluate(() => LUMO.ui.overlay.closeAll('test'));

  // ---- Klarklang über Satz-Bau ----
  const kk = await page.evaluate(async () => {
    LUMO.debug.grantAbility('mut.klarklang');
    const noor = LUMO.npcs.get('noor'); const p = LUMO.player.position;
    noor.warpTo(p.x + 2, p.z + 2); LUMO.npcs.setHeat('noor', 80); LUMO.debug.advance(0.2);
    let ev = null; LUMO.events.on('mut:klarklang', (e) => { ev = e; });
    window.__kk = LUMO.debug.klarklang('noor');
    await new Promise((r) => setTimeout(r, 200));
    return { overlay: !!document.querySelector('[data-overlay="minigame"]'), current: LUMO.minigames.current && LUMO.minigames.current.id };
  });
  check('Klarklang startet den Satz-Bau (Minispiel-Hülle) für Noor', kk.overlay && kk.current === 'e21-klarklang-noor', J(kk));
  await page.evaluate(async () => { await LUMO.debug.mgAuto('gold'); });
  await waitFor(page, () => !document.querySelector('[data-overlay="minigame"]'), 20000);
  const kk2 = await page.evaluate(async () => { const r = await window.__kk; return { ok: r.ok, clean: r.clean, heat: LUMO.debug.hitze('noor') }; });
  check('Sauberer Klarklang (Gold): Ergebnis clean, Noors Hitze sinkt (80 → < 50)', kk2.ok && kk2.clean && kk2.heat < 50, J(kk2));

  // ---- Fehler ----
  const errs = errors.filter((e) => !/favicon|WebGL|GPU|swiftshader|AudioContext|speechSynthesis/i.test(e));
  check('Keine Seitenfehler', errs.length === 0, errs.slice(0, 4).join(' | '));
} finally {
  await browser.close();
}
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} Prüfungen bestanden`);
process.exit(failed ? 1 : 0);

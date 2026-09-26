// Szenario WP34 + WP42 (Browser): Figuren am Hafen (≥ 14, höchstens 12 animiert), Namensschilder und Umbenennung überall,
// Blick-Stufen (Aura an/aus, Profi ohne Farben), Gefühlsmodell und Körpersprache, Tanks (Wunsch fällt am Morgen zurück),
// Bindung (nie dauerhaft sinkend, verstimmt + Reparatur), Grenz-Radius, Gespräch, Tagesablauf; Sitzung: Recap, Hauptmarker,
// Abend am Feuer mit Tat-Satz, Bester Moment, Cliffhanger, Speichern, neuer Tag; Signalfeuer (anzünden, Schnellreise);
// Sammelsachen (Lichtsplitter, Aussichtspunkt 8 s, versteckte Splitter, Karte); Karte mit Nebel und Teasern; Ruhewetter
// halbiert den Puls; Jahreszeit je Modul; Nachtwache nur nachts in befreiten Regionen.
// Aufruf: node tests/scenarios/figuren.mjs   (SHOTS=Ordner, Q=low|medium|high, VERBOSE=1)
import { launch, openGame, startGame, frames, shot, measureFrames, IPAD_LANDSCAPE } from '../lib.mjs';

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
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await startGame(page, { hour: 10.5 });

  // ---- Plugins und Figuren am Hafen ----
  const api = await page.evaluate(() => {
    LUMO.debug.teleport('hafen'); LUMO.debug.advance(0.6);
    const st = LUMO.debug.npcLod();
    const inHafen = LUMO.debug.npcList().filter((n) => n.zone === 'hafen');
    return { plugins: LUMO.plugins.list, failed: LUMO.plugins.failed, st, hafen: inHafen.length, main: inHafen.filter((n) => !n.ambient).map((n) => n.id), tags: LUMO.npcs.list().filter((n) => n.tag && n.tag.sprite).length, maxA: LUMO.npcs.MAX_ANIMATED };
  });
  check('Plugins npcs, session, nachtwache, collectibles, karte installiert', ['npcs', 'session', 'nachtwache', 'collectibles', 'karte'].every((p) => api.plugins.includes(p)) && api.failed.length === 0, J(api.failed));
  check('Hafen: ≥ 14 Figuren (Hauptfiguren + Dorfleute), höchstens 12 animiert (6 auf niedrig), alle mit Namensschild', api.hafen >= 14 && api.st.animated <= 12 && api.tags === api.st.total, `${api.hafen} am Hafen · ${J(api.st)} · Hauptfiguren ${api.main.join(',')}`);
  await page.evaluate(() => { LUMO.debug.setShot({ x: 20, y: 14, z: 140 }, { x: 4, y: 2, z: 112 }); LUMO.debug.advance(0.5); });
  await frames(page, 3);
  await shot(page, '120_hafen_figuren');
  await page.evaluate(() => LUMO.debug.freezeTime(false));
  const ms = await measureFrames(page, 12);
  await page.evaluate(() => LUMO.debug.freezeTime(true));
  const stats = await page.evaluate(async () => {
    const next = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
    await next(); const all = LUMO.renderer.info.render.calls;
    LUMO.npcs.root.visible = false; await next(); const world = LUMO.renderer.info.render.calls; LUMO.npcs.root.visible = true;
    return { all, world, npcs: all - world, triangles: LUMO.renderer.info.render.triangles, impostors: LUMO.npcs.list().filter((n) => n.impostor).length };
  });
  console.log('· Hafen mit Figuren: Frame-Zeit (SwiftShader)', ms.toFixed(1), 'ms · Draw-Calls gesamt', stats.all, '(Welt allein', stats.world + ')', '· Dreiecke', stats.triangles);
  check('Figuren kosten am Hafen höchstens 150 Draw-Calls auf „niedrig“ (6 animiert à ~20, Rest Impostor mit 1 Call)', stats.npcs <= 150 && stats.impostors >= 8, J(stats));

  // ---- Umbenennung: Schild, Blase ----
  const rn = await page.evaluate(async () => {
    LUMO.debug.setShot(null);
    const before = LUMO.npcs.nameOf('jolie');
    LUMO.debug.renameNpc('jolie', 'Lina');
    const tag = LUMO.npcs.get('jolie').tag.name;
    const p = LUMO.ui.say({ who: 'jolie', text: 'Hi.', wait: true });
    await new Promise((r) => setTimeout(r, 50));
    const bubble = document.querySelector('.bubble .bubble-name') && document.querySelector('.bubble .bubble-name').textContent;
    LUMO.ui.bubbles.clear(); await p;
    const speaker = LUMO.ui.bubbles.speaker('jolie').name;
    const saved = LUMO.state.get('names.jolie');
    LUMO.debug.renameNpc('jolie', null);
    return { before, tag, bubble, speaker, saved, after: LUMO.npcs.nameOf('jolie') };
  });
  check('Umbenennung gilt überall: Schild, Sprechblase, Sprecher-Register, Spielstand; zurücksetzen geht', rn.before === 'Jolie' && rn.tag === 'Lina' && rn.bubble === 'Lina' && rn.speaker === 'Lina' && rn.saved === 'Lina' && rn.after === 'Jolie', J(rn));

  // ---- Gefühlsmodell, Blick-Stufen, Körpersprache ----
  const em = await page.evaluate(() => {
    const n = LUMO.npcs.get('tun');
    const px = n.position.x + 2.2, pz = n.position.z + 2.2;
    LUMO.debug.teleport({ x: px, z: pz }, Math.atan2(n.position.x - px, n.position.z - pz)); LUMO.npcs.updateLod(); LUMO.debug.advance(0.5);
    const lod = n.lod;
    const noBlick = n.humanoid.aura.visible;
    LUMO.debug.grantAbility('blick'); LUMO.debug.advance(1.2);
    const withBlick = n.humanoid.aura.visible;
    LUMO.debug.setNpcEmotion('tun', 'wut', 8, 'angst', 4); LUMO.debug.npcHeat('tun', 90); LUMO.debug.advance(1.2);
    const snap = LUMO.npcs.emotion('tun');
    const poses = n.humanoid.bodyLanguage.targets;
    LUMO.debug.setMode('profi'); LUMO.debug.advance(3);
    const profi = n.humanoid.aura.visible;
    LUMO.debug.setMode('abenteuer'); LUMO.debug.grantAbility('blick.doppel'); LUMO.debug.grantAbility('blick.tanks'); LUMO.debug.grantAbility('blick.grenzen'); LUMO.debug.advance(1);
    const view = LUMO.npcs.view;
    const st = n.humanoid.aura.state;
    return { lod, noBlick, withBlick, snap, fist: poses.fistClench, jaw: poses.jawTension, profi, view, auraState: st && { mix: st.mix, secondary: !!st.secondary, boundary: st.boundary }, boundary: LUMO.npcs.boundary('tun') };
  });
  check('Aura erst mit Blick, in Profi ohne Farben; Wut 8 + Hitze 90 → Deckel ab, Fäuste und Kiefer in der Körpersprache', em.lod === 'full' && !em.noBlick && em.withBlick && !em.profi && em.snap.capOff && em.snap.primary[0] === 'wut' && em.fist > 0.9 && em.jaw > 0.9, J({ ...em, view: undefined }));
  check('Blick-Stufen: Doppel-Aura, Tanks, Grenz-Radius (Deckel ab vergrößert ihn)', em.view.doppel && em.view.tanks && em.view.grenzen && em.boundary > 1.6, J({ view: em.view, boundary: em.boundary }));
  await page.evaluate(() => { const n = LUMO.npcs.get('tun'); const r = LUMO.cameraRig; LUMO.debug.teleport({ x: n.position.x + 2.2, z: n.position.z + 2.6 }); r.targetDist = 5; r.pitch = 0.12; r.yaw = Math.atan2(LUMO.player.position.x - n.position.x, LUMO.player.position.z - n.position.z); LUMO.debug.advance(0.6); r.snap(); });
  await frames(page, 3);
  await shot(page, '121_figur_aura_deckel_ab');
  await page.evaluate(() => { LUMO.debug.npcHeat('tun', 0); LUMO.debug.setNpcEmotion('tun', 'freude', 6, 'ueberraschung', 3); LUMO.cameraRig.targetDist = 8.5; LUMO.cameraRig.pitch = 0.24; });

  // ---- Tanks: Wunsch +40 fällt am Morgen zurück, Bedürfnis hält ----
  const tk = await page.evaluate(() => {
    const t0 = LUMO.npcs.tanks('tiago').anerkennung;
    LUMO.debug.npcTank('tiago', 'anerkennung', 60, 'wish');
    const wish = LUMO.npcs.tanks('tiago').anerkennung;
    LUMO.debug.npcTank('tiago', 'spass', 20, 'need');
    const need = LUMO.npcs.tanks('tiago').spass;
    LUMO.debug.newDay();
    const after = LUMO.npcs.tanks('tiago');
    return { t0, wish, need, afterA: after.anerkennung, afterS: after.spass, day: LUMO.state.get('time.day'), hour: +LUMO.time.hour.toFixed(1) };
  });
  check('Tanks: Wunsch +40 (gedeckelt) fällt am Morgen zurück, Bedürfnis hält; neuer Tag = 7:30 Uhr', tk.wish === tk.t0 + 40 && tk.afterA === tk.t0 && tk.afterS === tk.need && tk.day === 2 && tk.hour === 7.5, J(tk));

  // ---- Bindung sinkt nie dauerhaft, Grenz-Radius nach Bindung, Verstimmung mit Reparatur ----
  const bd = await page.evaluate(() => {
    LUMO.debug.setBond('jolie', 2);
    const r0 = LUMO.npcs.boundary('jolie');
    LUMO.debug.npcBond('jolie', -2);
    const lvl = LUMO.npcs.bond('jolie'), verst = LUMO.npcs.isVerstimmt('jolie'), mood = LUMO.state.get('moods.jolie');
    LUMO.npcs.repair('jolie');
    const rep = LUMO.npcs.isVerstimmt('jolie');
    LUMO.debug.setBond('jolie', 0);
    const r1 = LUMO.npcs.boundary('jolie');
    LUMO.debug.setBond('jolie', 2);
    LUMO.ui.bubbles.clear(); LUMO.debug.advance(0.3);   // Stufe 2 löst Jolies Satz zur Wegfähigkeit aus (Prüfung unten mit Tiago)
    return { r0, r1, lvl, verst, mood, rep };
  });
  check('Bindung bleibt bei negativem Zug (verstimmt mit Ursache), Reparatur hebt auf; Grenz-Radius schrumpft mit Bindung', bd.lvl === 2 && bd.verst && bd.mood && bd.mood.kind === 'verstimmt' && !bd.rep && bd.r1 > bd.r0, J(bd));

  // ---- Gespräch: Aktion bei der Figur → Blase mit Begrüßung, Kamera im Talk-Modus ----
  const talk = await page.evaluate(async () => {
    const n = LUMO.npcs.get('ilda');
    LUMO.debug.teleport({ x: n.position.x + 1.6, z: n.position.z + 1.4 }); LUMO.debug.advance(0.6);
    const label = LUMO.ui.el.actionLbl.textContent, off = LUMO.ui.el.action.classList.contains('is-off');
    let ev = null; LUMO.events.once('npc:talk', (e) => { ev = e.id; });
    LUMO.input.press('action'); LUMO.debug.advance(1 / 30); LUMO.input.release('action'); LUMO.debug.advance(0.3);
    await new Promise((r) => setTimeout(r, 80));
    const b = document.querySelector('.bubble');
    const out = { label, off, ev, who: b && b.dataset.who, text: b && b.querySelector('.bubble-text').textContent, cam: LUMO.cameraRig.mode, facing: !!n.busy };
    LUMO.ui.bubbles.clear(); LUMO.debug.advance(0.3);
    await new Promise((r) => setTimeout(r, 60));
    out.camAfter = LUMO.cameraRig.mode; out.free = !n.busy;
    return out;
  });
  check('Gespräch: „Reden“ am Aktionsknopf, Blase mit Ildas Begrüßung, Talk-Kamera, danach frei', talk.label === 'Reden' && !talk.off && talk.ev === 'ilda' && talk.who === 'ilda' && talk.text && talk.cam === 'talk' && talk.camAfter === 'follow' && talk.free, J(talk));

  // ---- Tagesablauf: nachts zu Hause (versteckt), morgens am Steg ----
  const sched = await page.evaluate(() => {
    LUMO.debug.setTimeOfDay(23.5); LUMO.debug.advance(1.2);
    const n = LUMO.npcs.get('jolie');
    const night = { hidden: n.hidden, visible: n.group.visible, entry: n.entry && n.entry.site };
    LUMO.debug.setTimeOfDay(8); LUMO.debug.advance(32);
    const site = LUMO.content.resolveSite('steg');
    const day = { hidden: n.hidden, entry: n.entry && n.entry.site, dist: +Math.hypot(n.position.x - site.x, n.position.z - site.z).toFixed(1), anim: n.anim };
    LUMO.debug.setTimeOfDay(10.5);
    return { night, day };
  });
  check('Tagesablauf: 23:30 versteckt (haus2), 8:00 am Steg und sitzt', sched.night.hidden && !sched.night.visible && sched.night.entry === 'haus2' && !sched.day.hidden && sched.day.entry === 'steg' && sched.day.dist < 6 && sched.day.anim === 'sit', J(sched));

  // ---- Sitzung: Hauptmarker, Recap ----
  const rc = await page.evaluate(async () => {
    const marker = !!document.querySelector('.compass-mark.is-poi');
    const target = LUMO.session.target;
    const p = LUMO.session.recap({ force: true, seconds: 120 });
    await new Promise((r) => setTimeout(r, 120));
    const cards = document.querySelectorAll('[data-overlay="recap"] .recap-card').length;
    const x = !!document.querySelector('[data-overlay="recap"] .ov-close');
    window.__recap = p;
    const dist = target ? Math.hypot(target.x - LUMO.player.position.x, target.z - LUMO.player.position.z) : Infinity;
    return { marker, target: target && target.title, dist: +dist.toFixed(0), cards, x, paused: LUMO.paused };
  });
  check('Hauptziel ist nah: unter 450 m (unter 3 Minuten Fußweg, DESIGN §3)', rc.dist < 450, `${rc.dist} m · ${rc.target}`);
  await frames(page, 3);
  await shot(page, '122_recap');
  await page.click('[data-recap-go]');
  const rc2 = await page.evaluate(async () => ({ ...(await window.__recap), paused: LUMO.paused }));
  check('Hauptmarker am Kompass und Recap „Letztes Mal“ mit 3 Karten, X, Pause; „Los“ beendet', rc.marker && rc.target && rc.cards === 3 && rc.x && rc.paused && rc2.shown && !rc2.skipped && !rc2.paused, J({ rc, rc2 }));

  // ---- Abend am Feuer: Tat-Satz der Figur, Bester Moment, Cliffhanger, Speichern, neuer Tag im Baumhaus ----
  const cf = await page.evaluate(async () => {
    LUMO.session.deed('jolie', 'jolie-dazugesetzt', null);
    LUMO.session.moment({ id: 'm-test', icon: 'muschel', title: 'Am Steg', color: '#39d0c8', kind: 'test' });
    const day0 = LUMO.state.get('time.day');
    const raw0 = localStorage.getItem('lumo.save.' + LUMO.save.current);
    window.__cf = LUMO.session.end({ via: 'test' });
    await new Promise((r) => setTimeout(r, 200));
    const line = document.querySelector('[data-overlay="campfire"] .cf-line');
    return { day0, raw0len: (raw0 || '').length, who: line && line.querySelector('b').textContent, text: line && line.querySelector('p').textContent, plan: LUMO.session.campfirePlan() };
  });
  check('Lagerfeuer: Jolie sagt ihren Satz zur Tat von heute', cf.who === 'Jolie' && cf.text === 'Du hast dich einfach neben mich gesetzt.' && cf.plan.lines.length >= 1 && cf.plan.cliffhanger, J({ who: cf.who, text: cf.text, cliff: cf.plan.cliffhanger }));
  await frames(page, 3);
  await shot(page, '123_lagerfeuer_satz');
  await page.click('[data-overlay="campfire"] [data-cf-next]');
  await sleep(900);   // Karte blendet 0,3 s ein
  const mo = await page.evaluate(() => document.querySelectorAll('[data-overlay="campfire"] [data-moment]').length);
  check('Bester Moment: drei Bilder (im Test auch vor e05)', mo >= 1 && mo <= 3, String(mo));
  await shot(page, '124_lagerfeuer_moment');
  await page.click('[data-overlay="campfire"] [data-moment]');
  await sleep(1500);
  const cliff = await page.evaluate(() => ({ cliff: document.querySelector('[data-overlay="campfire"] .cf-cliff p') && document.querySelector('[data-overlay="campfire"] .cf-cliff p').textContent, saved: !!document.querySelector('[data-overlay="campfire"] .cf-saved'), end: !!document.querySelector('[data-cf-end]') }));
  check('Cliffhanger-Satz und „Gespeichert“ mit „Bis morgen“', !!cliff.cliff && cliff.saved && cliff.end, J(cliff));
  await page.click('[data-cf-end]');
  await sleep(400);
  const nd = await page.evaluate(async () => {
    const r = await window.__cf;
    const B = LUMO.world.island.SITES.baumhaus;
    const raw = JSON.parse(localStorage.getItem('lumo.save.' + LUMO.save.current));
    return { r, day: LUMO.state.get('time.day'), hour: +LUMO.time.hour.toFixed(1), dist: +Math.hypot(LUMO.player.position.x - B.x, LUMO.player.position.z - B.z).toFixed(1), glas: (LUMO.state.get('baumhaus.glas') || []).length, savedDay: raw.time.day, savedRecap: !!raw.recap && raw.recap.zone, savedNpcs: !!raw.npcs && !!raw.npcs.jolie, overlays: LUMO.ui.overlay.count, paused: LUMO.paused };
  });
  check('Nach „Bis morgen“: neuer Tag 7:30 im Baumhaus, Glühwürmchen im Glas, Spielstand mit Tag, Recap und Figuren gespeichert', nd.r && nd.r.moment === 'm-test' && nd.day === 3 && nd.hour === 7.5 && nd.dist < 8 && nd.glas === 1 && nd.savedDay === 3 && nd.savedRecap && nd.savedNpcs && nd.overlays === 0 && !nd.paused, J(nd));

  // ---- Bindungs-Belohnungen (DESIGN §9): Stufe 2 → Wegfähigkeit + Satz der Figur, Stufe 3 → Jacken-Aufnäher + Lagerfeuer-Geschichte ----
  const br = await page.evaluate(async () => {
    const ev = [];
    LUMO.events.on('bond:ability', (e) => ev.push('weg:' + e.npc + ':' + e.id));
    LUMO.events.on('bond:jacket', (e) => ev.push('jacke:' + e.npc + ':' + e.patch));
    const w0 = LUMO.debug.wege();
    LUMO.debug.setBond('tiago', 1);
    const at1 = LUMO.debug.wege();
    LUMO.debug.setBond('tiago', 2);
    await new Promise((r) => setTimeout(r, 80));
    const bubble = document.querySelector('.bubble');
    const say = bubble && bubble.querySelector('.bubble-text') && bubble.querySelector('.bubble-text').textContent;
    LUMO.ui.bubbles.clear();
    const at2 = LUMO.debug.wege();
    LUMO.debug.setBond('tiago', 3);
    const at3 = LUMO.debug.wege();
    LUMO.debug.setBond('tiago', 3);   // nochmal: keine doppelte Belohnung
    const deeds = (LUMO.state.get('deedLog') || []).filter((d) => d.id === 'tiago-bindung-3');
    const cond = LUMO.session.evalCond({ weg: 'surfbrett' }), condNo = LUMO.session.evalCond({ weg: 'nix' });
    const lines = LUMO.session.campfirePlan().lines;
    LUMO.debug.setBond('tiago', 0);
    return { w0, at1, at2, at3, say, ev, deeds: deeds.length, deedText: deeds[0] && deeds[0].text, cond, condNo, campfire: lines.find((l) => l.who === 'tiago') };
  });
  check('Bindung Stufe 2: Wegfähigkeit „surfbrett“ in state.wege, Tiago sagt seinen Satz; Stufe 3: Aufnäher + Geschichte, je genau einmal', !br.w0.wege.includes('surfbrett') && !br.at1.wege.includes('surfbrett') && br.at2.wege.includes('surfbrett') && br.say && br.at3.jacke.length === 1 && br.deeds === 1 && !!br.deedText && br.ev.length === 2 && br.cond && !br.condNo && br.campfire && br.campfire.text === br.deedText, J(br));

  // ---- Signalfeuer: dunkel im Grau, leuchtet nach der Farbwelle, Schnellreise ----
  const sf = await page.evaluate(async () => {
    const list = LUMO.session.signalfeuer.list();
    const strand0 = LUMO.session.signalfeuer.lit('sf-strand');
    let litEv = null; LUMO.events.on('signalfeuer:lit', (e) => { litEv = e.id; });
    LUMO.debug.restoreZone('strand'); LUMO.debug.advance(6);
    const strand1 = LUMO.session.signalfeuer.lit('sf-strand');
    const ok = await LUMO.debug.travel('sf-strand');
    LUMO.debug.advance(0.3);
    const f = LUMO.session.signalfeuer.get('sf-strand');
    return { n: list.length, hafenLit: list.filter((x) => x.zone === 'hafen' && x.lit).length, strand0, strand1, litEv, ok, dist: +Math.hypot(LUMO.player.position.x - f.x, LUMO.player.position.z - f.z).toFixed(1), zone: LUMO.world.island.zoneAt(LUMO.player.position.x, LUMO.player.position.z) };
  });
  check('Signalfeuer: 11 Feuer, Hafen brennt, Strand erst nach der Farbwelle; Schnellreise zum Strandfeuer', sf.n >= 11 && sf.hafenLit === 4 && !sf.strand0 && sf.strand1 && sf.litEv === 'sf-strand' && sf.ok && sf.dist < 5 && sf.zone === 'strand', J(sf));
  await page.evaluate(() => { LUMO.cameraRig.snap(); LUMO.debug.advance(0.3); });
  await frames(page, 3);
  await shot(page, '125_signalfeuer_strand');
  // Menü am Feuer: Kacheln mit Schnellreise, Schluss, Speichern und Zurück
  const menu = await page.evaluate(async () => {
    const f = LUMO.session.signalfeuer.get('sf-strand');
    LUMO.debug.teleport({ x: f.x + 2, z: f.z + 1.5 }); LUMO.debug.advance(0.5);
    const label = LUMO.ui.el.actionLbl.textContent;
    const p = LUMO.session.signalfeuer.menu('sf-strand');
    await new Promise((r) => setTimeout(r, 120));
    const items = [...document.querySelectorAll('[data-choice]')].map((b) => b.textContent.trim());
    LUMO.events.emit('dialogue:choose', { id: 'rueckzug' });
    await p;
    return { label, items };
  });
  check('Am Feuer: Aktion „Feuer“, Kacheln Schnellreise · Für heute Schluss · Speichern · Zurück', menu.label === 'Feuer' && menu.items.some((t) => t.includes('Schnellreise')) && menu.items.some((t) => t.includes('Schluss')) && menu.items.some((t) => t.includes('Speichern')) && menu.items.some((t) => t.includes('Zurück')), J(menu));

  // ---- Sammelsachen: Lichtsplitter einsammeln, Aussichtspunkt 8 s, versteckte Splitter, Karte ----
  const co = await page.evaluate(() => {
    const C = LUMO.plugins.collectibles;
    const stats0 = C.stats();
    const near = C.nearest(LUMO.player.position.x, LUMO.player.position.z);
    let ev = null; LUMO.events.on('collect', (e) => { if (!ev) ev = e; });
    LUMO.debug.teleport({ x: near.x, z: near.z }); LUMO.debug.advance(0.6);
    const got = C.isCollected(near.id);
    const hidden0 = C.list('lichtsplitter').filter((it) => it.hidden && C.isVisible(it.id)).length;
    const rev0 = LUMO.plugins.karte.revealedCount();
    const ap = C.get('ap-steg');
    let found = null; LUMO.events.on('aussicht:found', (e) => { found = e.id; });
    LUMO.debug.teleport({ x: ap.pos.x, z: ap.pos.z }); LUMO.debug.advance(1);
    const active = C.aussicht.active;
    LUMO.debug.advance(4);
    const half = C.aussicht.progress;
    const ring = !!document.querySelector('.ap-ring.is-on');
    LUMO.debug.advance(4.5);
    const hidden1 = C.list('lichtsplitter').filter((it) => it.hidden && C.isVisible(it.id)).length;
    return { stats0: stats0.lichtsplitter, near: near.id, got, ev: ev && ev.id, count: LUMO.state.get('lichtsplitter'), hidden0, active, half: +half.toFixed(2), ring, found, hidden1, rev0, rev1: LUMO.plugins.karte.revealedCount(), apDone: C.isCollected('ap-steg') };
  });
  check('Lichtsplitter: nächster liegt nah, wird beim Berühren eingesammelt (Ereignis collect, Zähler im Spielstand)', co.stats0.total === 100 && co.got && co.ev === co.near && co.count === 1, J({ near: co.near, got: co.got, ev: co.ev, count: co.count }));
  check('Aussichtspunkt: 8 s stillstehen mit Ring, dann gefunden; 3 versteckte Splitter erscheinen; Karte deckt auf', co.active === 'ap-steg' && co.half > 0.3 && co.half < 0.7 && co.ring && co.found === 'ap-steg' && co.apDone && co.hidden0 === 0 && co.hidden1 === 3 && co.rev1 > co.rev0 + 8, J({ active: co.active, half: co.half, ring: co.ring, found: co.found, hidden: [co.hidden0, co.hidden1], rev: [co.rev0, co.rev1] }));
  // Karte im Tagebuch – mit Noors Farbmarken (Bindung 2) und Kims Netz-Schnellreise (Bindung 2)
  await page.evaluate(() => { const i0 = LUMO.debug.mapInfo(); window.__map0 = { marks: i0.marks, travel: i0.travel.length }; LUMO.debug.setBond('noor', 2); LUMO.debug.setBond('kim', 2); LUMO.ui.bubbles.clear(); LUMO.debug.advance(0.3); LUMO.ui.journal.open('karte'); });
  await sleep(300);
  const mp = await page.evaluate(() => { const cv = document.querySelector('canvas[data-map]'); const info = LUMO.debug.mapInfo(); return { before: window.__map0, canvas: !!cv, w: cv && cv.width, teasers: info.teasers.length, revealed: info.revealed, marks: info.marks, travel: info.travel.length, buttons: document.querySelectorAll('[data-map-travel]').length, note: document.querySelector('.jn-page-body .jn-note') && document.querySelector('.jn-page-body .jn-note').textContent }; });
  await frames(page, 3);
  await shot(page, '126_karte_nebel');
  check('Karte: Canvas mit Nebelkacheln, 9 Teaser mit Fähigkeitssymbol, Prozent entdeckt', mp.canvas && mp.w === 640 && mp.teasers === 9 && mp.revealed > 20 && /% entdeckt/.test(mp.note || ''), J({ ...mp, before: undefined }));
  check('Wegfähigkeiten auf der Karte: Noors Farbmarken erst ab Bindung 2, Kims Netz-Schnellreise als Knöpfe zu brennenden Feuern', mp.before.marks === 0 && mp.before.travel === 0 && mp.marks > 50 && mp.travel >= 2 && mp.buttons === mp.travel, J({ before: mp.before, marks: mp.marks, travel: mp.travel, buttons: mp.buttons }));
  const tr = await page.evaluate(async () => { const id = document.querySelector('[data-map-travel]').dataset.mapTravel; const f = LUMO.session.signalfeuer.get(id); document.querySelector('[data-map-travel]').click(); await new Promise((r) => setTimeout(r, 700)); LUMO.debug.advance(0.3); return { id, journal: LUMO.ui.journal.isOpen, dist: +Math.hypot(LUMO.player.position.x - f.x, LUMO.player.position.z - f.z).toFixed(1) }; });
  check('Netz-Schnellreise aus der Karte: Tagebuch zu, Spielfigur am gewählten Feuer', !tr.journal && tr.dist < 5, J(tr));
  await page.evaluate(() => { if (LUMO.ui.journal.isOpen) LUMO.ui.journal.close(); });

  // ---- Inselwetter: Ruhewetter halbiert den Puls, 20 Minuten ----
  const we = await page.evaluate(() => {
    LUMO.debug.setPuls(80);
    LUMO.debug.weather('ruhe');
    const w = LUMO.session.weather;
    const r = { puls: LUMO.state.get('session.puls'), factor: LUMO.state.get('session.pulsFactor'), remaining: w.remaining, speed: LUMO.time.speed, hour: +LUMO.time.hour.toFixed(1), storm: LUMO.world.sky.storm.intensity, current: w.current };
    LUMO.debug.advance(60);
    r.remaining2 = w.remaining;
    LUMO.debug.weather(null);
    r.after = { factor: LUMO.state.get('session.pulsFactor'), speed: LUMO.time.speed, current: w.current };
    LUMO.debug.setPuls(0);
    return r;
  });
  check('Ruhewetter: Puls 80 → 40, Faktor 0,5, goldener Abend (17,4 Uhr, Zeit langsam), Sturm gebremst, 20 Minuten laufen ab; Ende stellt alles zurück', we.puls === 40 && we.factor === 0.5 && we.remaining === 1200 && we.speed === 0.25 && we.hour === 17.4 && we.storm === 0.25 && we.current === 'ruhe' && we.remaining2 === 1140 && we.after.factor === 1 && we.after.speed === 1 && !we.after.current, J(we));

  // ---- Jahreszeit je Modul ----
  const se = await page.evaluate(() => {
    const s0 = LUMO.session.seasons.current;
    const g0 = LUMO.world.veil.uniforms.uGradeGain.value.z;
    LUMO.debug.unlockUnit('j1-e11', { kurz: false }); LUMO.debug.advance(0.2);
    const s1 = LUMO.session.seasons.current;
    const g1 = LUMO.world.veil.uniforms.uGradeGain.value.z;
    LUMO.debug.season('fruehling'); const s2 = LUMO.session.seasons.current; LUMO.debug.season(null);
    LUMO.state.remove('units.j1-e11'); LUMO.session.seasons.refresh();
    return { s0, s1, s2, g0: +g0.toFixed(3), g1: +g1.toFixed(3), back: LUMO.session.seasons.current };
  });
  check('Jahreszeit: Spätsommer → Winter mit M3 (kühlere Farbkorrektur), Übersteuerung Frühling, zurück', se.s0 === 'spaetsommer' && se.s1 === 'winter' && se.g1 > se.g0 && se.s2 === 'fruehling' && se.back === 'spaetsommer', J(se));

  // ---- Nachtwache: nur nachts, nur in befreiten Regionen, ab e05 ----
  const nw = await page.evaluate(async () => {
    const NW = LUMO.plugins.nachtwache;
    LUMO.debug.teleport('hafen'); LUMO.debug.setTimeOfDay(12); LUMO.debug.advance(0.5);
    const noUnit = { unlocked: NW.unlocked(), tonight: NW.tonight() };
    LUMO.debug.unlockUnit('j1-e05');
    LUMO.debug.setVeil('hafen', 1); LUMO.debug.setVeil('strand', 1);
    LUMO.debug.setTimeOfDay(23); LUMO.debug.advance(2.5);
    const veiled = { night: NW.isNight(), tonight: NW.tonight(), active: !!NW.active };
    LUMO.debug.setVeil('hafen', 0); LUMO.debug.advance(2.5);
    const free = { tonight: NW.tonight(), active: NW.active };
    let ev = [];
    LUMO.events.on('nachtwache:clue', (e) => ev.push('clue:' + e.npc));
    LUMO.events.on('nachtwache:done', (e) => ev.push('done:' + e.help + ':' + e.fit));
    if (!NW.active) LUMO.debug.nachtwache();
    const a = NW.active;
    const npc = LUMO.npcs.get(a.npc);
    LUMO.debug.advance(12);
    const lantern = LUMO.props.get('nw-laterne-' + a.npc);
    const pose = npc.humanoid.bodyLanguage.targets;
    const dist = +Math.hypot(npc.position.x - a.where.x, npc.position.z - a.where.z).toFixed(1);
    const marker = !!document.querySelector('.compass-mark.is-poi');
    return { noUnit, veiled, free, active: a, zone: LUMO.world.island.zoneAt(npc.position.x, npc.position.z), lantern: lantern ? lantern.lit : null, slump: pose.slump, dist, anim: npc.anim, override: !!npc.override, marker, ev, inner: LUMO.npcs.emotion(a.npc).inner };
  });
  check('Nachtwache startet nur nachts in einer befreiten Region (ab e05): tagsüber nichts, verschleiert nichts, frei → Figur am Hafen', !noUnitOk(nw.noUnit) && nw.veiled.night && nw.veiled.tonight === null && !nw.veiled.active && nw.free.tonight && nw.free.active && nw.zone === 'hafen', J({ noUnit: nw.noUnit, veiled: nw.veiled, free: nw.free && nw.free.active && nw.free.active.npc }));
  check('Nachtwache: Figur weicht vom Ablauf ab, sitzt zusammengesunken am stillen Ort, Laterne aus, Glimm-Hinweis, Marker, Innen anders als außen', nw.override && nw.dist < 2 && nw.anim === 'sit' && nw.slump > 0.5 && nw.lantern === false && nw.ev.includes('clue:' + nw.active.npc) && nw.marker && nw.inner, J({ dist: nw.dist, anim: nw.anim, slump: nw.slump, lantern: nw.lantern, ev: nw.ev, inner: nw.inner, help: nw.active.help }));
  // Foto von schräg vorn (feste Kamera, sonst verdeckt die stehende Spielfigur die sitzende Figur)
  await page.evaluate(() => { const a = LUMO.plugins.nachtwache.active; const n = LUMO.npcs.get(a.npc); LUMO.debug.teleport({ x: n.position.x - 2.6, z: n.position.z + 2.4 }); LUMO.debug.advance(0.6); const f = { x: Math.sin(n.yaw), z: Math.cos(n.yaw) }; LUMO.debug.setShot({ x: n.position.x + f.x * 4.2 + f.z * 2.2, y: n.position.y + 2.0, z: n.position.z + f.z * 4.2 - f.x * 2.2 }, { x: n.position.x, y: n.position.y + 0.8, z: n.position.z }); LUMO.debug.advance(0.3); });
  await frames(page, 3);
  await shot(page, '127_nachtwache');
  await page.evaluate(() => { LUMO.debug.setShot(null); LUMO.cameraRig.snap(); });
  // Gespräch: Kacheln mit vier Hilfen, „Hinsetzen“ wählen
  const help = await page.evaluate(async () => {
    const a = LUMO.plugins.nachtwache.active;
    const n = LUMO.npcs.get(a.npc);
    const bond0 = LUMO.npcs.bond(a.npc), ls0 = LUMO.state.get('lichtsplitter', 0);
    LUMO.debug.teleport({ x: n.position.x + 1.4, z: n.position.z + 1.2 }); LUMO.debug.advance(0.5);
    let done = null; LUMO.events.on('nachtwache:done', (e) => { done = e; });
    LUMO.input.press('action'); LUMO.debug.advance(1 / 30); LUMO.input.release('action'); LUMO.debug.advance(0.5);
    for (let i = 0; i < 40 && !document.querySelector('[data-choice]'); i++) { LUMO.debug.advance(0.1); await new Promise((r) => setTimeout(r, 60)); }
    const items = [...document.querySelectorAll('[data-choice]')].map((b) => b.textContent.trim());
    const sitzen = [...document.querySelectorAll('[data-choice]')].find((b) => /Hinsetzen/.test(b.textContent));
    if (sitzen) sitzen.click();
    // Die Hilfe dauert ein paar Sekunden Echtzeit (Emote), dann kommt die Dank-Blase: bis zu 20 s warten, Blasen weiterklicken
    for (let i = 0; i < 250 && !done; i++) { LUMO.debug.advance(0.1); await new Promise((r) => setTimeout(r, 80)); const nb = document.querySelector('.bubble [data-next]'); if (nb) nb.click(); }
    LUMO.debug.advance(0.5);
    const d = LUMO.state.get('nachtwache');
    return { items, done, bond: [bond0, LUMO.npcs.bond(a.npc)], ls: [ls0, LUMO.state.get('lichtsplitter', 0)], lastDay: d && d.lastDay, day: LUMO.state.get('time.day'), doneN: d && d.done.length, deed: (LUMO.state.get('deedLog') || []).slice(-1)[0], active: !!LUMO.plugins.nachtwache.active, tonight: LUMO.plugins.nachtwache.tonight() };
  });
  check('Nachtwache-Gespräch: vier Hilfen als Kacheln (+ Später), Hinsetzen → Dank, Belohnung (Bindung oder Splitter), Tat im Log, heute keine zweite', help.items.filter((t) => !/Später|Hilfe/.test(t)).length === 4 && help.done && help.done.help === 'sitzen' && (help.bond[1] > help.bond[0] || help.ls[1] > help.ls[0]) && help.lastDay === help.day && help.doneN === 1 && help.deed && help.deed.npc === help.done.npc && !help.active && help.tonight === null, J(help));

  await page.evaluate(() => { LUMO.debug.setTimeOfDay(10.5); LUMO.debug.teleport('hafen'); LUMO.debug.advance(0.5); });
  check('Keine Seitenfehler', errors.length === 0, errors.slice(0, 5).join('\n'));
  await context.close();
} catch (e) {
  console.error(e);
  failed = true;
} finally {
  await browser.close();
}
function noUnitOk(n) { return n.unlocked || n.tonight; }
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} Prüfungen ok`);
process.exit(failed ? 1 : 0);

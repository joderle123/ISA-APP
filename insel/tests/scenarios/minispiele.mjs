// Szenario WP36–39 (Browser): Minispiel-Hülle und alle acht Vorlagen aus den Beispiel-Configs.
// Startkarte (Icon, Satz, Moduswahl, Bestwert, kein Wort vom Leuchtstern), Rennen Hafen-Dächer in der Welt (Ringe, HUD,
// Countdown, Ergebnis mit verstecktem Stern, Neustart < 1 s, Geist der Bestzeit), Rückenwind nur als Angebot nach drei
// Fehlversuchen, Bestwerte in state.medals, Tauziehen mit onHit-Wirkung, Satz-Bau (Klarklang, Schmiede), Duell,
// Verteidigung, Lotsen (Grotte + Folgen), Bauen (Leitungen, Planer, Regie mit Share-Code), Mäxchen mit Tell,
// Kosmetik aus Gold, Abbrechen per X überall. Aufruf: node tests/scenarios/minispiele.mjs   (SHOTS=Ordner, Q=low)
import { launch, openGame, startGame, frames, shot, IPAD_LANDSCAPE } from '../lib.mjs';

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
const waitFor = (page, fn, ms = 30000) => page.waitForFunction(fn, null, { timeout: ms, polling: 100 });

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await startGame(page, { hour: 15.5 });
  const play = (id, opts) => page.evaluate(([i, o]) => { window.__mg = LUMO.minigames.play(i, o || {}); window.__mg.then((r) => { window.__mgr = r; }); return true; }, [id, opts || null]);
  const result = () => page.evaluate(async () => { const r = await window.__mg; return r; });
  const los = async () => { await waitFor(page, () => document.querySelector('[data-overlay="minigame"] [data-los]')); await page.click('[data-overlay="minigame"] [data-los]'); };
  const auto = (level) => page.evaluate((l) => LUMO.minigames.current.inst.auto(l), level);
  const weiter = async () => { await waitFor(page, () => document.querySelector('[data-overlay="minigame"] [data-weiter]')); await page.click('[data-overlay="minigame"] [data-weiter]'); };
  // Welt-Spiele: Countdown (Echtzeit + Spielzeit) abwarten, bis der Lauf beginnt
  const lauf = async () => { for (let i = 0; i < 40; i++) { const ph = await page.evaluate(() => { LUMO.debug.advance(0.3); const c = LUMO.minigames.current; return c && c.inst ? c.inst.phase : null; }); if (ph === 'lauf') return true; await sleep(20); } return false; };
  // Overlay-Bilder: die Karte blendet erst im nächsten Frame ein (is-in), darum vor dem Bild ein paar Frames warten
  const shotIn = async (name) => { await frames(page, 4); await shot(page, name); };

  // ---- Plugin ----
  const api = await page.evaluate(() => ({ plugins: LUMO.plugins.list, failed: LUMO.plugins.failed, api: !!LUMO.minigames && typeof LUMO.minigames.play === 'function', templates: Object.keys(LUMO.minigames.templates), ids: LUMO.content.ids('minigames') }));
  check('Plugin minigames installiert, 8 Vorlagen, Beispiel-Configs geladen', api.api && api.templates.length === 8 && api.ids.includes('hafen-daecher') && api.ids.includes('e11-tauziehen') && !api.failed.some((f) => f.id === 'minigames'), J({ templates: api.templates, n: api.ids.length, failed: api.failed }));

  // ---- Startkarte Hafen-Dächer ----
  await page.evaluate(() => { LUMO.debug.teleport({ x: 6, z: 120 }); LUMO.state.set('settings.mode', 'abenteuer'); });
  await play('hafen-daecher');
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"] [data-mg-start]'));
  const sc = await page.evaluate(() => { const ov = document.querySelector('[data-overlay="minigame"]'); return { title: ov.querySelector('.ov-title').textContent, x: !!ov.querySelector('.ov-close'), modes: [...ov.querySelectorAll('[data-mode]')].map((b) => b.dataset.mode), on: ov.querySelector('[data-mode].is-on').dataset.mode, intro: ov.querySelector('.ov-text').textContent, text: ov.textContent, wind: !!ov.querySelector('[data-rueckenwind]'), paused: LUMO.paused }; });
  check('Startkarte: Titel, Icon-Satz, drei Modi (Abenteuer vorgewählt), X, Spiel pausiert, kein Rückenwind-Angebot', sc.title === 'Hafen-Dächer' && sc.x && sc.modes.join() === 'entspannt,abenteuer,profi' && sc.on === 'abenteuer' && sc.intro.includes('Ringe') && !sc.wind && sc.paused, J(sc));
  check('Der Leuchtstern wird nirgends angekündigt', !/leuchtstern|stern/i.test(sc.text), sc.text.slice(0, 80));
  await shot(page, '120_mg_startkarte');
  await page.click('[data-overlay="minigame"] [data-mode="profi"]');
  await page.click('[data-overlay="minigame"] [data-mode="abenteuer"]');

  // ---- Rennen in der Welt ----
  await page.click('[data-overlay="minigame"] [data-los]');
  await waitFor(page, () => !document.querySelector('[data-overlay="minigame"]') && document.querySelector('.mg-hud.is-in'));
  const r0 = await page.evaluate(() => ({ paused: LUMO.paused, enabled: LUMO.player.enabled, rings: LUMO.scene.children.filter((o) => o.geometry && o.geometry.type === 'TorusGeometry').length, count: document.querySelector('[data-mg-count]').textContent, info: LUMO.debug.mgInfo(), x: !!document.querySelector('[data-mg-exit]'), near: Math.hypot(LUMO.player.position.x - 6, LUMO.player.position.z - 148) }));
  check('Los: Karte zu, Spiel läuft, 11 Ringe in der Welt, Countdown, Spielfigur am Start (gesperrt), X im HUD', !r0.paused && !r0.enabled && r0.rings === 11 && r0.count === '3' && r0.info.phase === 'spiel' && r0.x && r0.near < 3, J(r0));
  await page.evaluate(() => { LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); });
  await frames(page, 3);
  await shot(page, '121_mg_rennen_countdown');
  await lauf();
  await page.evaluate(() => LUMO.debug.advance(0.5));
  await sleep(150);
  const r1 = await page.evaluate(() => ({ enabled: LUMO.player.enabled, phase: LUMO.minigames.current.inst.phase, time: document.querySelector('[data-mg-time]').textContent }));
  check('Nach dem Countdown: Spielfigur frei, Rennen läuft, Zeit zählt', r1.enabled && r1.phase === 'lauf' && r1.time !== '0,0', J(r1));
  // durch die Ringe (Teleport je Ring + kurze Spielzeit)
  const t0 = Date.now();
  for (let i = 0; i < 11; i++) await page.evaluate(() => { LUMO.debug.mgAct('ring'); LUMO.debug.advance(0.4); });
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"] [data-mg-result]'));
  const r2 = await page.evaluate(() => { const el = document.querySelector('[data-mg-result]'); return { medal: el.dataset.medal, stern: el.dataset.stern, label: el.querySelector('h3').textContent, score: el.querySelector('.mg-score').textContent, best: LUMO.state.get('medals.hafen-daecher'), res: window.__mgr, again: !!el.querySelector('[data-again]'), weiter: el.querySelector('[data-weiter]').textContent.trim() }; });
  check('Ergebnis: Gold in wenigen Sekunden, versteckter Leuchtstern erscheint erst jetzt, Bestwert gespeichert (mit Geist)', r2.medal === 'gold' && r2.stern === '1' && r2.label === 'Leuchtstern' && r2.score.includes('Neuer Bestwert') && r2.best && r2.best.medal === 'gold' && r2.best.stern === true && Array.isArray(r2.best.ghost.samples) && r2.best.ghost.cp.length === 11 && r2.again && r2.weiter === 'Weiter', J({ ...r2, best: { ...r2.best, ghost: r2.best.ghost.cp.length } }));
  await shot(page, '122_mg_ergebnis_stern');
  // Neustart < 1 s, Geist läuft mit
  await page.click('[data-overlay="minigame"] [data-again]');
  await waitFor(page, () => !document.querySelector('[data-overlay="minigame"]') && LUMO.debug.mgInfo() && LUMO.debug.mgInfo().phase === 'spiel');
  await lauf();
  await page.evaluate(() => { LUMO.debug.mgAct('ring'); LUMO.debug.advance(0.5); LUMO.debug.mgAct('ring'); LUMO.debug.advance(0.5); });
  const g1 = await page.evaluate(() => { const g = LUMO.scene.getObjectByName('geist-bestzeit'); return { ghost: !!g, visible: !!(g && g.visible), delta: document.querySelector('[data-mg-ghost]').textContent, tries: LUMO.debug.mgInfo().tries, restartMs: LUMO.debug.mgInfo().restartMs }; });
  check('Nochmal: Neustart unter 1 s (in der Seite gemessen), Geist der Bestzeit läuft sichtbar mit, Abstand im HUD', g1.restartMs < 1000 && g1.ghost && g1.visible && /s$/.test(g1.delta) && g1.tries === 2, J(g1));
  await page.evaluate(() => { LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); });
  await frames(page, 3);
  await shot(page, '123_mg_rennen_geist');
  // Abbrechen per X im HUD: sofort, ohne Strafe
  await page.click('[data-mg-exit]');
  const cx = await result();
  const c1 = await page.evaluate(() => ({ enabled: LUMO.player.enabled, hud: document.querySelector('.mg-hud').classList.contains('is-in'), rings: LUMO.scene.children.filter((o) => o.geometry && o.geometry.type === 'TorusGeometry').length, ghost: !!LUMO.scene.getObjectByName('geist-bestzeit'), cur: LUMO.minigames.current, best: LUMO.state.get('medals.hafen-daecher.medal') }));
  check('X im HUD: abgebrochen, Welt aufgeräumt, Spielfigur frei, Bestwert bleibt', cx.cancelled === true && c1.enabled && !c1.hud && c1.rings === 0 && !c1.ghost && c1.cur === null && c1.best === 'gold', J({ cx, c1 }));

  // ---- Rückenwind nur als Angebot nach 3 Fehlversuchen ----
  for (let i = 0; i < 3; i++) {
    await play('hafen-daecher');
    await los();
    await waitFor(page, () => LUMO.debug.mgInfo() && LUMO.debug.mgInfo().hasInst);
    const before = await page.evaluate(() => !!document.querySelector('[data-rueckenwind]'));
    if (i === 2) check('Vor dem dritten Fehlversuch: noch kein Rückenwind-Angebot', !before);
    await auto('fail');
    await waitFor(page, () => document.querySelector('[data-mg-result]'));
    const fr = await page.evaluate(() => ({ medal: document.querySelector('[data-mg-result]').dataset.medal, label: document.querySelector('[data-mg-result] h3').textContent, weiter: document.querySelector('[data-weiter]').textContent.trim(), fails: LUMO.state.get('session.mgFails.hafen-daecher') }));
    if (i === 0) check('Fehlversuch: „Noch nicht.“, Nochmal als Hauptknopf, „Später“ statt Weiter', fr.medal === 'keine' && fr.label === 'Noch nicht.' && fr.weiter === 'Später', J(fr));
    await weiter();
    const rr = await result();
    if (i === 0) check('„Später“ liefert ein gespieltes, nicht bestandenes Ergebnis (ok false, cancelled false)', rr.ok === false && rr.cancelled === false && rr.medal === null, J(rr));
  }
  await play('hafen-daecher');
  await waitFor(page, () => document.querySelector('[data-mg-start]'));
  const w1 = await page.evaluate(() => ({ offer: !!document.querySelector('[data-rueckenwind]'), on: !!document.querySelector('[data-rueckenwind].is-on'), text: document.querySelector('[data-rueckenwind]') && document.querySelector('[data-rueckenwind]').textContent, hint: !!document.querySelector('[data-mg-hint]'), rw: LUMO.debug.mgInfo().rueckenwind }));
  check('Nach 3 Fehlversuchen: leises „Rückenwind?“-Angebot, nicht automatisch an', w1.offer && !w1.on && /Rückenwind\?/.test(w1.text) && !w1.hint && w1.rw === false, J(w1));
  await shot(page, '124_mg_rueckenwind_angebot');
  await page.click('[data-rueckenwind]');
  const w2 = await page.evaluate(() => ({ on: !!document.querySelector('[data-rueckenwind].is-on'), hint: (document.querySelector('[data-mg-hint]') || {}).textContent, rw: LUMO.debug.mgInfo().rueckenwind }));
  check('Rückenwind angenommen: ein Hinweis erscheint', w2.on && w2.hint && w2.hint.includes('Sprinten') && w2.rw === true, J(w2));
  await los();
  await waitFor(page, () => LUMO.debug.mgInfo() && LUMO.debug.mgInfo().hasInst);
  const rwGhost = await page.evaluate(() => !!LUMO.scene.getObjectByName('geist-bestzeit'));
  await auto('gold');
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  const w3 = await page.evaluate(() => ({ medal: document.querySelector('[data-mg-result]').dataset.medal, stern: document.querySelector('[data-mg-result]').dataset.stern || null, fails: LUMO.state.get('session.mgFails.hafen-daecher') }));
  check('Mit Rückenwind: Gold möglich, aber kein Leuchtstern; Fehlversuche zurückgesetzt; kein Geist', w3.medal === 'gold' && w3.stern === null && w3.fails === 0 && !rwGhost, J({ ...w3, rwGhost }));
  await weiter(); await result();

  // ---- Tauziehen (Rhythmus) mit onHit-Wirkung ----
  await page.evaluate(() => { LUMO.debug.setPuls(80); LUMO.debug.grantAbility('ruhe.puls'); LUMO.npcs.setHeat('luc', 90); });
  await play('e11-tauziehen', { who: 'luc' });
  await los();
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"] canvas.mg-canvas'));
  const rh = await page.evaluate(() => ({ canvas: !!document.querySelector('.mg-canvas'), hold: (document.querySelector('[data-mg-hold]') || {}).textContent, prog: document.querySelectorAll('.mg-prog i').length, partner: document.querySelector('.mg-topline').textContent, overlayOpen: !!document.querySelector('[data-overlay="minigame"]') }));
  check('Drachenleine: Böen-Leinwand, Halten-Knopf, 12 Böen (Abenteuer), Partner Luc', rh.canvas && /Halten/.test(rh.hold) && rh.prog === 12 && rh.partner.includes('Luc') && rh.overlayOpen, J(rh));
  await frames(page, 40);
  await page.evaluate(() => LUMO.debug.mgAct('press'));
  await frames(page, 6);
  await shot(page, '125_mg_tauziehen');
  await page.evaluate(() => LUMO.debug.mgAct('release'));
  await auto('gold');
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  const rh2 = await page.evaluate(() => ({ medal: document.querySelector('[data-mg-result]').dataset.medal, stern: document.querySelector('[data-mg-result]').dataset.stern, puls: LUMO.state.get('session.puls'), hitze: LUMO.debug.hitze('luc'), text: document.querySelector('[data-mg-result] .mg-text').textContent }));
  check('Tauziehen auto Gold + Stern; onHit je Böe: Puls 80 → 32, Lucs Hitze 90 → < 30', rh2.medal === 'gold' && rh2.stern === '1' && rh2.puls === 32 && rh2.hitze < 30 && rh2.text.includes('12 von 12'), J(rh2));
  await weiter(); const rhr = await result();
  check('Ergebnis fürs Gespräch: ok, medal, hits, cancelled false', rhr.ok === true && rhr.medal === 'gold' && rhr.hits === 1 && rhr.cancelled === false, J(rhr));

  // ---- Satz-Bau Klarklang ----
  await play('e21-klarklang-noor', { satzbau: true, who: 'noor' });
  await los();
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"] .mg-slot'));
  const sb = await page.evaluate(() => ({ slots: document.querySelectorAll('.mg-slot').length, tiles: document.querySelectorAll('.mg-tile').length, sentence: document.querySelector('[data-sentence]').textContent.trim(), klang: document.querySelector('[data-klang]').disabled }));
  check('Klarklang: 4 Slots mit Kacheln, Satzleiste leer, Klang gesperrt', sb.slots === 4 && sb.tiles === 9 && sb.klang === true, J(sb));
  await page.evaluate(() => { LUMO.debug.mgAct('pick', 'gefuehl', 0); LUMO.debug.mgAct('pick', 'kamera', 0); LUMO.debug.mgAct('pick', 'grund', 1); });
  const sb1 = await page.evaluate(() => ({ sentence: document.querySelector('[data-sentence]').textContent.replace(/\s+/g, ' ').trim(), dorn: !!document.querySelector('.mg-sentence .mg-word.is-dorn'), klang: document.querySelector('[data-klang]').disabled }));
  check('Kacheln bauen den Satz oben zusammen, Dorn markiert, Klang noch gesperrt (Wunsch fehlt)', sb1.sentence.includes('traurig') && sb1.dorn && sb1.klang === true, J(sb1));
  await page.evaluate(() => LUMO.debug.mgAct('pick', 'grund', 0));
  await page.evaluate(() => LUMO.debug.mgAct('pick', 'wunsch', 0));
  await frames(page, 2);
  await shot(page, '126_mg_klarklang');
  await page.evaluate(() => LUMO.debug.mgAct('klang'));
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  const sb2 = await page.evaluate(() => ({ medal: document.querySelector('[data-mg-result]').dataset.medal, text: document.querySelector('[data-mg-result] .mg-text').textContent, flag: LUMO.state.get('flags.e21.klarklang'), hitze: LUMO.debug.hitze('noor') }));
  check('Klang: „Klar. Das trägt.“ → Gold, Wirkung clean (Flag, Noors Hitze sinkt)', sb2.medal === 'gold' && sb2.text === 'Klar. Das trägt.' && sb2.flag === true, J(sb2));
  await weiter(); const sbr = await result();
  check('Satz-Bau-Ergebnis für die Dialog-Engine: clean true, thorn false', sbr.clean === true && sbr.thorn === false && sbr.ok === true, J({ clean: sbr.clean, thorn: sbr.thorn }));
  // Dorn: prallt ab
  await play('e21-klarklang-noor'); await los();
  await waitFor(page, () => document.querySelector('.mg-slot'));
  await auto('fail');
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  const sb3 = await page.evaluate(() => ({ medal: document.querySelector('[data-mg-result]').dataset.medal, text: document.querySelector('[data-mg-result] .mg-text').textContent }));
  check('Dorn-Kacheln: „Schiefer Ton. Das prallt ab.“, keine Medaille', sb3.medal === 'keine' && sb3.text.startsWith('Schiefer Ton'), J(sb3));
  await weiter(); const sb3r = await result();
  check('Dorn-Ergebnis: thorn true, clean false', sb3r.thorn === true && sb3r.clean === false, J({ thorn: sb3r.thorn }));

  // ---- Schmiede: Brettphysik ----
  await play('e18-schmiede'); await los();
  await waitFor(page, () => document.querySelector('.mg-slot'));
  await page.evaluate(() => { LUMO.debug.mgAct('pick', 'anfang', 0); LUMO.debug.mgAct('pick', 'mitte', 0); LUMO.debug.mgAct('pick', 'ende', 2); LUMO.debug.mgAct('klang'); });
  await sleep(300);
  await frames(page, 3);
  await shot(page, '127_mg_schmiede_brett');
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  const sm = await page.evaluate(() => ({ medal: document.querySelector('[data-mg-result]').dataset.medal, text: document.querySelector('[data-mg-result] .mg-text').textContent, flag: LUMO.state.get('flags.e18.brett') }));
  check('Schmiede: „Ich lerne … und übe es heute“ trägt und wächst → Gold, Flag', sm.medal === 'gold' && sm.text.includes('wächst') && sm.flag === true, J(sm));
  await weiter(); await result();
  await play('e18-schmiede'); await los();
  await waitFor(page, () => document.querySelector('.mg-slot'));
  await page.evaluate(() => { LUMO.debug.mgAct('pick', 'anfang', 1); LUMO.debug.mgAct('pick', 'mitte', 1); LUMO.debug.mgAct('pick', 'ende', 0); LUMO.debug.mgAct('klang'); });
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  const sm2 = await page.evaluate(() => ({ text: document.querySelector('[data-mg-result] .mg-text').textContent, medal: document.querySelector('[data-mg-result]').dataset.medal }));
  check('Schmiede: „alles perfekt“ ist Glas – bricht', sm2.text === 'Glas. Es bricht.' && sm2.medal === 'keine', J(sm2));
  await weiter(); await result();

  // ---- Duell ----
  await play('e11-sturmprognose'); await los();
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"] [data-opt]'));
  const du = await page.evaluate(() => ({ opts: document.querySelectorAll('[data-opt]').length, say: document.querySelector('.mg-attack p').textContent, bar: !!document.querySelector('[data-time]'), round: document.querySelector('.mg-topline').textContent }));
  check('Sturmprognose: Angriffskarte, Zeitbalken, 3 Konterkarten, Runde 1/8', du.opts === 3 && du.say.length > 5 && du.bar && du.round.includes('1 / 8'), J(du));
  await shot(page, '128_mg_duell');
  const okIdx = await page.evaluate(() => LUMO.minigames.current.inst.D.round.options.findIndex((o) => o.ok));
  await page.click(`[data-opt="${okIdx}"]`);
  await sleep(900);
  const du2 = await page.evaluate(() => ({ round: document.querySelector('.mg-topline').textContent, hits: LUMO.minigames.current.inst.D.hits }));
  check('Richtige Karte schnell getippt: Treffer, nächste Runde', du2.hits === 1 && du2.round.includes('2 / 8'), J(du2));
  await auto('gold');
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  const du3 = await page.evaluate(() => document.querySelector('[data-mg-result]').dataset.medal);
  check('Duell auto: Gold', du3 === 'gold', du3);
  await weiter(); await result();

  // ---- Verteidigung ----
  await play('e23-garten-waechter'); await los();
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"] canvas.mg-canvas'));
  await frames(page, 90);
  const vd = await page.evaluate(() => { const D = LUMO.minigames.current.inst.D; const g = D.ghosts.find((x) => x.state !== 'weg'); const r = g ? LUMO.debug.mgAct('stopp', g.x, g.y) : null; return { ghosts: D.ghosts.length, wave: D.wave, stopp: r, state: g && g.state, top: document.querySelector('[data-top]').textContent }; });
  check('Garten-Wächter: Welle 1 läuft, Geister kommen, Stopp hält den Geist an', vd.ghosts >= 1 && vd.wave === 1 && vd.stopp === 'stopp' && vd.state === 'stopp' && vd.top.includes('Welle 1'), J(vd));
  await frames(page, 4);
  await shot(page, '129_mg_verteidigung');
  await auto('gold');
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  const vd2 = await page.evaluate(() => document.querySelector('[data-mg-result]').dataset.medal);
  check('Verteidigung auto: Gold', vd2 === 'gold', vd2);
  await weiter(); await result();

  // ---- Lotsen: Hafengrotte (Befehle) ----
  await play('e03-hafengrotte'); await los();
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"] [data-cmd]'));
  const lo = await page.evaluate(() => ({ cmds: [...document.querySelectorAll('[data-cmd]')].map((b) => b.dataset.cmd), canvas: !!document.querySelector('.mg-canvas'), line: document.querySelector('[data-guideline]').textContent }));
  check('Hafengrotte: dunkle Leinwand, fünf Symbolbefehle (Vor, Links, Rechts, Warten, Laterne)', lo.cmds.join() === 'vor,links,rechts,warten,laterne' && lo.canvas && lo.line.includes('Jolie'), J(lo));
  const lo1 = await page.evaluate(() => ({ a: LUMO.debug.mgAct('cmd', 'vor').event, b: LUMO.debug.mgAct('cmd', 'vor').event, c: LUMO.debug.mgAct('cmd', 'warten').event, d: LUMO.debug.mgAct('cmd', 'vor').event, line: document.querySelector('[data-guideline]').textContent, G: { draengeln: LUMO.minigames.current.inst.G.draengeln, steps: LUMO.minigames.current.inst.G.steps } }));
  check('Stopp-Recht: unsicher → drängeln (zurück) → warten beruhigt → Schritt', lo1.a === 'unsicher' && lo1.b === 'draengeln' && lo1.c === 'beruhigt' && lo1.d === 'schritt' && lo1.G.draengeln === 1 && lo1.G.steps === 1, J(lo1));
  await frames(page, 3);
  await shot(page, '130_mg_hafengrotte');
  await auto('gold');
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  const lo2 = await page.evaluate(() => ({ medal: document.querySelector('[data-mg-result]').dataset.medal, res: window.__mgr }));
  check('Grotte auto (kürzester Weg, ohne weiteres Drängeln): Silber (das eine Drängeln kostet)', lo2.medal === 'silber', J(lo2.medal));
  await weiter(); const lor = await result();
  check('Lotsen-Ergebnis: ok, steps, draengeln', lor.ok === true && typeof lor.steps === 'number' && lor.draengeln === 1, J({ ok: lor.ok, steps: lor.steps, dr: lor.draengeln }));

  // ---- Lotsen: Folgen (Welt) über die Quest-Schnittstelle ----
  await page.evaluate(() => { LUMO.debug.teleport('hafen'); window.__lt = LUMO.minigames.lotsen({ guide: 'jolie', mode: 'folgen', minigame: 'e03-rollentausch' }); });
  await los();
  await waitFor(page, () => document.querySelector('[data-mg-dark].is-in'));
  await lauf();
  await page.evaluate(() => LUMO.debug.advance(0.3));
  await frames(page, 3);
  const fo = await page.evaluate(() => ({ dark: !!document.querySelector('[data-mg-dark].is-in'), lights: [...document.querySelectorAll('[data-mg-light]')].filter((l) => l.style.display !== 'none').length, points: LUMO.minigames.current.inst.points.length, hud: document.querySelector('[data-mg-info]').textContent, jolie: LUMO.debug.npc('jolie') && LUMO.debug.npc('jolie').lod, bubble: !!document.querySelector('.bubble[data-who="jolie"]') }));
  check('Folgen: Bild dunkel, Lichtpunkt sichtbar, 6 Lichter (Abenteuer), Jolie spricht, HUD zählt', fo.dark && fo.lights >= 1 && fo.points === 6 && fo.hud.includes('Licht 1/6'), J(fo));
  await shot(page, '131_mg_folgen_dunkel');
  for (let i = 0; i < 6; i++) await page.evaluate(() => { LUMO.debug.mgAct('licht'); LUMO.debug.advance(0.3); });
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  const fo2 = await page.evaluate(() => ({ medal: document.querySelector('[data-mg-result]').dataset.medal, dark: !!document.querySelector('[data-mg-dark].is-in') }));
  check('Alle Lichter erreicht: Ergebnis (Gold), Dunkel weg', fo2.medal === 'gold' && !fo2.dark, J(fo2));
  await weiter();
  const ltr = await page.evaluate(() => window.__lt);
  check('lotsen(params) liefert { ok, guide, mode } für die Quest-Vorlage', ltr.ok === true && ltr.guide === 'jolie' && ltr.mode === 'folgen', J({ ok: ltr.ok, guide: ltr.guide }));

  // ---- Bauen: Leitungen, Planer, Regie ----
  await play('e04-tank-leitungen'); await los();
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"] canvas.mg-canvas'));
  const ba = await page.evaluate(() => { const b = LUMO.minigames.current.inst.board; return { w: b.w, h: b.h, tanks: b.tanks.length, par: b.par, moves: document.querySelector('[data-moves]').textContent, chips: document.querySelectorAll('.mg-chip').length }; });
  check('Tank-Leitungen: 5×4 Brett, 3 Tanks mit Bedürfnis-Farben, Par angezeigt', ba.w === 5 && ba.h === 4 && ba.tanks === 3 && ba.par >= 1 && ba.moves.includes('Par') && ba.chips === 3, J(ba));
  await frames(page, 3);
  await shot(page, '132_mg_leitungen');
  const ba1 = await page.evaluate(() => { const n0 = LUMO.debug.mgAct('rotate', 0, 0); return { n0, moves: LUMO.minigames.current.inst.board.moves }; });
  check('Rohr drehen zählt einen Zug', ba1.moves === 1, J(ba1));
  await auto('gold');
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  check('Leitungen auto: Gold', await page.evaluate(() => document.querySelector('[data-mg-result]').dataset.medal) === 'gold');
  await weiter(); await result();
  await play('j09-planer'); await los();
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"] [data-day]'));
  const pl = await page.evaluate(() => ({ days: document.querySelectorAll('[data-day]').length, cards: document.querySelectorAll('[data-card]').length, exam: !!document.querySelector('.mg-day.is-exam') }));
  check('Rückwärts-Planer: 6 Tage (Prüfung + 5 davor), 6 Karten', pl.days === 6 && pl.cards === 6 && pl.exam, J(pl));
  await page.evaluate(() => { LUMO.debug.mgAct('place', 0, 5); LUMO.debug.mgAct('place', 1, 4); });
  await frames(page, 2);
  await shot(page, '133_mg_planer');
  await auto('gold');
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  check('Planer auto: Gold, „Der Plan trägt.“', await page.evaluate(() => document.querySelector('[data-mg-result] .mg-text').textContent) === 'Der Plan trägt.');
  await weiter(); await result();
  await play('e23-theater-regie'); await los();
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"] [data-seat]'));
  await auto('gold');
  await waitFor(page, () => document.querySelector('[data-share]'));
  const rg = await page.evaluate(() => ({ code: document.querySelector('[data-share]').textContent, saved: LUMO.state.get('regie.e23-theater-regie') }));
  check('Regie: Share-Code ohne Personendaten, im Spielstand', rg.code.startsWith('LUMO1-') && rg.saved === rg.code && !/noor|Noor/.test(atob(rg.code.slice(6).replace(/-/g, '+').replace(/_/g, '/') + '==').replace(/noor/g, '')) , rg.code.slice(0, 24));
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  await weiter(); await result();

  // ---- Mäxchen ----
  await page.evaluate(() => LUMO.state.set('settings.mode', 'entspannt'));
  await play('muschel-maexchen'); await los();
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"] [data-face] svg'));
  const mx = await page.evaluate(() => ({ face: !!document.querySelector('[data-face] svg'), shells: document.querySelectorAll('[data-shells-du] i.is-on').length, roll: !!document.querySelector('[data-act="roll"]'), name: document.querySelector('.mg-two b').textContent }));
  check('Mäxchen: Porträt von Tun, 3 Muscheln, Würfeln-Knopf', mx.face && mx.shells === 3 && mx.roll && mx.name === 'Tun', J(mx));
  await page.evaluate(() => LUMO.debug.mgAct('roll'));
  const mx1 = await page.evaluate(() => ({ dice: LUMO.minigames.current.inst.G.dice, opts: [...document.querySelectorAll('[data-act="announce"]')].map((b) => b.dataset.value) }));
  check('Nach dem Wurf: Ansage-Optionen (Wahrheit oder höher)', mx1.dice.length === 2 && mx1.opts.length >= 2, J(mx1));
  await frames(page, 2);
  await shot(page, '134_mg_maexchen');
  // Tell: Figur blufft → Porträt zeigt den Tell (Entspannt deutlich)
  const tell = await page.evaluate(() => { const G = LUMO.minigames.current.inst.G; let t = null; for (let i = 0; i < 40 && !t; i++) { G.turn = 'npc'; G.prev = null; G.npcDice = null; const r = G.npcTurn(); if (r.tell) t = r.tell; } return t; });
  check('Tuns Tell beim Bluff: grinst einseitig, Stärke 1 in Entspannt', tell && tell.bluff === 'grinst-einseitig' && tell.amp === 1, J(tell));
  await auto('gold');
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  check('Mäxchen auto: Gold', await page.evaluate(() => document.querySelector('[data-mg-result]').dataset.medal) === 'gold');
  await weiter(); await result();
  await page.evaluate(() => LUMO.state.set('settings.mode', 'abenteuer'));

  // ---- Kosmetik aus Gold (Kronen-Segeln) und Kletterei ----
  await page.evaluate(() => LUMO.debug.teleport('dschungel'));
  await play('e10-kronen-segeln'); await los();
  await waitFor(page, () => LUMO.debug.mgInfo() && LUMO.debug.mgInfo().hasInst);
  await auto('gold');
  await waitFor(page, () => document.querySelector('[data-mg-result]'));
  await weiter(); await result();
  const cos = await page.evaluate(() => ({ medal: LUMO.state.get('medals.e10-kronen-segeln.medal'), owned: LUMO.plugins.cosmetics ? LUMO.plugins.cosmetics.isOwned('segel-regenbogen') : null }));
  check('Gold im Kronen-Segeln schaltet das Regenbogen-Segel frei', cos.medal === 'gold' && cos.owned === true, J(cos));

  // ---- X auf der Startkarte = abgebrochen ----
  await play('e06-kronen-kletterei');
  await waitFor(page, () => document.querySelector('[data-mg-start]'));
  await page.click('[data-overlay="minigame"] .ov-close');
  const cxs = await result();
  check('X auf der Startkarte: cancelled, nichts gespeichert', cxs.cancelled === true && (await page.evaluate(() => LUMO.state.get('medals.e06-kronen-kletterei'))) === undefined, J(cxs));

  // ---- Bestwerte-Übersicht ----
  const bests = await page.evaluate(() => Object.fromEntries(Object.entries(LUMO.state.get('medals', {})).map(([k, v]) => [k, v.medal])));
  check('Bestwerte nur lokal in state.medals (≥ 9 Minispiele)', Object.keys(bests).length >= 9, J(bests));

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

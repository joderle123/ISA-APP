// Szenario WP31/WP32 (Browser): Beispiel-Quest j1-e11 headless – Code WELLE öffnet und startet die Quest, Marker
// (Lichtsäule + Kompass), Hinweisleiter bei simulierten Fehlschlägen (Puls −20, Windschatten-Stein, Glimm, Leuchten),
// Szene e11-luc-kante: bei Puls 85 genau 2 Wahlen + Rückzug + Hilfe holen, Deckel ab prallt ab, Minispiel-Ersatz,
// Lauschen bricht beim Joystick ab, Zurückspulen stellt Hitze/Puls/Taten wieder her, Ende → Teil-Farbwelle, Aufnäher
// mit Rückseite, Glimm-Zeile, Echte-Welt-Karte mit Stich; Kurzfassung. Aufruf: node tests/scenarios/quests.mjs
import { launch, openGame, startGame, frames, shot, runScenario, pickChoice, IPAD_LANDSCAPE } from '../lib.mjs';

const Q = process.env.Q || 'low';
const results = [];
let failed = false;
function check(name, ok, info = '') {
  results.push({ name, ok, info });
  console.log(ok ? '✔' : '✘', name, info);
  if (!ok) failed = true;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const scen = (page, steps) => runScenario(page, steps, { log: !!process.env.VERBOSE });
const info = (page) => page.evaluate(() => LUMO.debug.questInfo());
const waitFor = (page, fn, ms = 30000) => page.waitForFunction(fn, null, { timeout: ms, polling: 100 });   // Zeit-Polling: rAF ist unter SwiftShader langsam
const pressAction = (page) => page.evaluate(() => { LUMO.input.press('action'); LUMO.debug.advance(1 / 30); LUMO.input.release('action'); LUMO.debug.advance(0.1); });

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart&debug` });
  await startGame(page, { hour: 15.5 });

  // ---- Plugins und API ----
  const api = await page.evaluate(() => ({
    plugins: LUMO.plugins.list, failed: LUMO.plugins.failed,
    quests: !!LUMO.quests && typeof LUMO.quests.start === 'function', dialogue: !!LUMO.dialogue && typeof LUMO.dialogue.play === 'function',
    dsl: !!LUMO.dsl, defs: LUMO.quests.defs().map((d) => d.id), pages: LUMO.ui.journal.pages.map((p) => p.id),
  }));
  check('Plugins dialogue + quests installiert', api.plugins.includes('dialogue') && api.plugins.includes('quests') && !api.failed.some((f) => f.id === 'dialogue' || f.id === 'quests'), JSON.stringify(api.plugins) + (api.failed.length ? ' · andere fehlgeschlagen: ' + JSON.stringify(api.failed) : ''));
  check('game.quests / game.dialogue / game.dsl vorhanden, Quest j1-e11 registriert', api.quests && api.dialogue && api.dsl && api.defs.includes('j1-e11'), api.defs.join(','));
  check('Tagebuch-Seiten Aufträge und Skills-Pass ersetzt', api.pages.includes('auftraege') && api.pages.includes('skillspass'));

  // ---- Code WELLE → Quest offen → startet → Marker ----
  const r1 = await scen(page, ['teleport hafen', 'puls 60', 'code welle', 'expect state.units.j1-e11 == aktiv', 'expect state.upgrades ~ ruhe.puls', 'expect state.units.j1-e10 == kurz']);
  check('Code WELLE: Einheit aktiv, Upgrade ruhe.puls, frühere Einheit als Kurzfassung', r1.ok, r1.steps.filter((s) => !s.ok).map((s) => s.step + ' · ' + s.info).join(' | '));
  const q1 = await info(page);
  const m1 = await page.evaluate(() => ({ poi: !!document.querySelector('.compass-mark.is-poi'), beam: LUMO.quests.markers.visible, target: LUMO.quests.markers.target }));
  check('Erster Schritt „wetterwarte“ mit Marker (Kompass + Lichtsäule)', q1.step === 'wetterwarte' && m1.poi && m1.beam && Math.abs(m1.target.x - -98) < 1 && Math.abs(m1.target.z - -70) < 1, JSON.stringify({ q1, m1 }));
  // Blick auf die Lichtsäule
  await page.evaluate(() => { LUMO.debug.teleport({ x: -90, z: -58 }, Math.atan2(-98 - -90, -70 - -58)); LUMO.debug.advance(0.5); LUMO.cameraRig.behindPlayer(); LUMO.cameraRig.snap(); });
  await frames(page, 3);
  await shot(page, '100_quest_marker');
  await page.evaluate(() => { LUMO.ui.journal.open('auftraege'); });
  await frames(page, 2);
  const jn = await page.evaluate(() => ({ steps: [...document.querySelectorAll('.quest-step')].length, current: document.querySelector('.quest-step.is-current') && document.querySelector('.quest-step.is-current').dataset.step, title: document.querySelector('.quest-main h4') && document.querySelector('.quest-main h4').textContent }));
  check('Aufträge-Seite: Hauptauftrag mit 4 Schritten, aktueller markiert', jn.steps === 4 && jn.current === 'wetterwarte' && jn.title === 'Das Sturmbarometer', JSON.stringify(jn));
  await shot(page, '101_auftraege');
  await page.evaluate(() => LUMO.ui.journal.close());

  // ---- Schritt 1 erledigt durch Ankommen ----
  await scen(page, ['site wetterwarte', 'wait 0.5']);
  const q2 = await info(page);
  check('Ankommen an der Wetterwarte schließt den Schritt, Marker zeigt zur Kante', q2.step === 'windschatten' && Math.abs(q2.marker.x - -104) < 1, JSON.stringify(q2));

  // ---- Hinweisleiter: 2 Fehlschläge → Puls −20 + Windschatten-Stein + Glimm; 3 → Glimm-Hinweis; 5 → Ziel leuchtet ----
  await page.evaluate(() => { LUMO.debug.setPuls(60); LUMO.debug.failStep('sturz'); LUMO.debug.failStep('sturz'); });
  await frames(page, 2);
  const h2 = await page.evaluate(() => ({ puls: LUMO.state.get('session.puls'), stein: !!LUMO.props.get('rueckenwind'), glimm: (document.querySelector('.glimm-line') || {}).textContent || '', fails: LUMO.debug.questInfo().fails }));
  check('Nach 2 Fehlschlägen: Puls 60 → 40, Windschatten-Stein, Glimm „Da drüben. Windstille.“', h2.puls === 40 && h2.stein && h2.glimm.includes('Windstille') && h2.fails === 2, JSON.stringify(h2));
  await page.evaluate(() => { const r = LUMO.cameraRig; r.behindPlayer(); r.snap(); LUMO.debug.advance(0.3); });
  await frames(page, 3);
  await shot(page, '102_rueckenwind');
  await page.evaluate(() => LUMO.debug.failStep('sturz'));
  await sleep(50);
  const h3 = await page.evaluate(() => (document.querySelector('.glimm-line') || {}).textContent || '');
  check('Nach 3 Fehlschlägen: Glimm-Hinweis des Schritts („Da. Windstille.“)', h3.includes('Da. Windstille.'), h3);
  await page.evaluate(() => { LUMO.debug.failStep('sturz'); LUMO.debug.failStep('sturz'); });
  const h5 = await info(page);
  check('Nach 5 Fehlschlägen leuchtet das Ziel', h5.glow === true && h5.fails === 5, JSON.stringify(h5));

  // ---- Szene an der Kante bei Puls 85 ----
  await page.evaluate(() => LUMO.debug.setPuls(85));
  await scen(page, ['site kante', 'wait 0.6']);
  await waitFor(page, () => LUMO.dialogue.isOpen && document.querySelector('.bubble[data-who="luc"]'));
  const s1 = await page.evaluate(() => ({ open: LUMO.dialogue.isOpen, cam: LUMO.cameraRig.mode, bar: !!document.querySelector('.dlg-bar.is-in'), who: document.querySelector('.bubble').dataset.who, text: document.querySelector('.bubble-text').textContent, read: !!document.querySelector('.bubble [data-read]'), stein: !!LUMO.props.get('rueckenwind'), hitze: LUMO.debug.hitze('luc'), actor: !!LUMO.dialogue.actor('luc') }));
  check('Szene e11-luc-kante: Kamera „talk“, Luc spricht (Blase mit Vorlesen), Leiste mit Verlassen, Hitze 90', s1.open && s1.cam === 'talk' && s1.bar && s1.who === 'luc' && s1.text.startsWith('Lass mich') && s1.read && s1.hitze >= 85 && s1.hitze <= 90 && s1.actor, JSON.stringify(s1));
  check('Windschatten-Stein nach dem Schrittwechsel weg', !s1.stein);
  await frames(page, 3);
  const bb = await page.evaluate(() => { const r = document.querySelector('.bubble').getBoundingClientRect(); return { top: Math.round(r.top), left: Math.round(r.left), right: Math.round(r.right), h: Math.round(r.height) }; });
  check('Verankerte Blase ganz im Bild (Name nicht abgeschnitten)', bb.top >= 0 && bb.left >= 0 && bb.right <= 1180, JSON.stringify(bb));
  await shot(page, '103_szene_luc');
  await pressAction(page);
  await waitFor(page, () => (LUMO.ui.choices.open && document.querySelector('.choices')));
  const c1 = await page.evaluate(() => { const els = [...document.querySelectorAll('[data-choice]')]; return { n: els.filter((e) => !e.classList.contains('is-system')).length, labels: els.map((e) => e.querySelector('.choice-label').textContent), deckel: els.filter((e) => e.classList.contains('tone-deckel')).length, ids: els.map((e) => e.dataset.id), rewind: document.querySelector('.dlg-bar [data-rewind]').disabled }; });
  check('Bei Puls 85: genau 2 Wahlen + Rückzug + Hilfe holen; „Beruhig dich“ trägt den Deckel', c1.n === 2 && c1.ids.includes('rueckzug') && c1.ids.includes('hilfe') && c1.labels[0].startsWith('Beruhig') && c1.labels[1] === 'Leine packen' && c1.deckel === 1 && c1.rewind === true, JSON.stringify(c1));
  await shot(page, '104_wahlen_rot');
  // Deckel ab: Argument prallt ab
  const h0 = await page.evaluate(() => LUMO.debug.hitze('luc'));
  await pickChoice(page, 0);
  await waitFor(page, () => document.querySelector('.bubble') && document.querySelector('.bubble-text').textContent === '…');
  const b1 = await page.evaluate(() => LUMO.debug.hitze('luc'));
  check('Deckel ab: Luc sagt „…“, Hitze +5, Knoten bleibt', b1 >= h0 + 3 && b1 <= h0 + 5, `${h0} → ${b1}`);
  await waitFor(page, () => (LUMO.ui.choices.open && document.querySelector('.choices')), 6000);
  // Handeln: Leine packen → Minispiel-Ersatz
  await pickChoice(page, 1);
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"]'));
  const mg = await page.evaluate(() => ({ title: document.querySelector('[data-overlay="minigame"] .ov-title').textContent, x: !!document.querySelector('[data-overlay="minigame"] .ov-close') }));
  check('Minispiel-Ersatz „Die Drachenleine“ mit X', mg.title === 'Die Drachenleine' && mg.x, JSON.stringify(mg));
  await shot(page, '105_minispiel');
  await page.click('[data-overlay="minigame"] [data-los]');
  await waitFor(page, () => !document.querySelector('[data-overlay="minigame"]') && document.querySelector('.bubble[data-who="luc"]'), 20000);
  const c2a = await page.evaluate(() => ({ text: document.querySelector('.bubble-text').textContent, hitze: LUMO.debug.hitze('luc'), puls: LUMO.state.get('session.puls') }));
  await page.evaluate(() => { window.__lsn = []; LUMO.events.on('dialogue:lauschen', (e) => window.__lsn.push({ ok: e.ok, node: e.node })); });
  await pressAction(page);
  // Lauschen: Joystick bricht ab
  await waitFor(page, () => document.querySelector('.bubble.is-lauschen'));
  const c2 = await page.evaluate(() => ({ hitze: LUMO.debug.hitze('luc'), deed: LUMO.state.get('deeds', []).includes('luc-leine') }));
  check('Nach der Leine: „Okay. Okay. Danke.“, Hitze durch die Schläge gesunken (< 70), Puls gesunken; Knoten c senkt weiter (< 20), Tat im Log', c2a.text.startsWith('Okay') && c2a.hitze < 70 && c2a.puls < 85 && c2.hitze < 20 && c2.deed, JSON.stringify({ c2a, c2 }));
  await page.evaluate(() => LUMO.debug.advance(1.0));
  const l1 = await page.evaluate(() => ({ ring: !!document.querySelector('.lauschen-ring'), partial: document.querySelector('.bubble.is-lauschen .bubble-text').textContent }));
  await scen(page, ['move 0 1 0.3']);
  await waitFor(page, () => window.__lsn.length === 1 && window.__lsn[0].ok === false);
  const l2 = await page.evaluate(() => [...document.querySelectorAll('.bubble:not(.is-out) .bubble-text')].map((e) => e.textContent));
  check('Lauschen: Satz entsteht Wort für Wort, Joystick bricht ab („…“), Knoten b wiederholt sich', l1.ring && l1.partial.length > 0 && l1.partial.length < 'Die Böe kam. Und alle haben gelacht.'.length && l2.includes('…'), JSON.stringify({ l1, l2 }));
  // zweiter Versuch ohne Bewegung: erst wartet die Figur („…“), dann entsteht der Satz noch einmal
  await waitFor(page, () => window.__lsn.length === 1 && document.querySelector('.bubble.is-lauschen') && ![...document.querySelectorAll('.bubble')].some((b) => !b.classList.contains('is-lauschen') && !b.classList.contains('is-out')));
  await page.evaluate(() => LUMO.debug.advance(4.6));
  await waitFor(page, () => window.__lsn.length === 2 && window.__lsn[1].ok === true);
  await waitFor(page, () => (LUMO.ui.choices.open && document.querySelector('.choices')));
  const c3 = await page.evaluate(() => ({ n: [...document.querySelectorAll('.choices:not(.is-out) [data-choice]')].filter((e) => !e.classList.contains('is-system')).length, labels: [...document.querySelectorAll('.choices:not(.is-out) [data-choice]')].map((e) => e.querySelector('.choice-label').textContent), puls: LUMO.state.get('session.puls'), node: LUMO.dialogue.current.node, rewind: document.querySelector('.dlg-bar [data-rewind]').disabled }));
  check('Nach dem Lauschen: Knoten b, Puls gelb → 3 Wahlen (mit Zeichen „Nicken“), Zurückspulen möglich', c3.node === 'b' && c3.n === 3 && c3.labels.includes('Nicken') && c3.puls >= 30 && c3.puls < 70 && c3.rewind === false, JSON.stringify(c3));
  await shot(page, '106_lauschen_wahlen');
  // Zurückspulen: zurück zum Knoten a, Hitze wieder 90, Puls wieder 85, Tat weg
  await page.click('.dlg-bar [data-rewind]');
  await waitFor(page, () => LUMO.dialogue.current && LUMO.dialogue.current.node === 'a' && document.querySelector('.bubble[data-who="luc"]') && !document.querySelector('.choices'));
  const rw = await page.evaluate(() => ({ node: LUMO.dialogue.current.node, hitze: LUMO.debug.hitze('luc'), puls: LUMO.state.get('session.puls'), deed: LUMO.state.get('deeds', []).includes('luc-leine') }));
  check('Zurückspulen: Knoten a, Hitze wieder 90, Puls 85, Tat zurückgenommen', rw.node === 'a' && rw.hitze >= 88 && rw.hitze <= 90 && rw.puls === 85 && !rw.deed, JSON.stringify(rw));
  // noch einmal: Leine → Lauschen → Wahl → Ende
  await pressAction(page);
  await waitFor(page, () => (LUMO.ui.choices.open && document.querySelector('.choices')));
  await pickChoice(page, 1);
  await waitFor(page, () => document.querySelector('[data-overlay="minigame"]'));
  await page.click('[data-overlay="minigame"] [data-los]');
  await waitFor(page, () => !document.querySelector('[data-overlay="minigame"]') && document.querySelector('.bubble[data-who="luc"]'), 20000);
  await pressAction(page);
  await waitFor(page, () => document.querySelector('.bubble.is-lauschen') && LUMO.dialogue.current.node === 'b');
  await page.evaluate(() => LUMO.debug.advance(4.6));
  await waitFor(page, () => window.__lsn.length === 3 && window.__lsn[2].ok === true);
  await waitFor(page, () => (LUMO.ui.choices.open && document.querySelector('.choices')));
  await pickChoice(page, 0);
  await waitFor(page, () => document.querySelector('.bubble') && document.querySelector('.bubble-text').textContent.startsWith('Morgen'));
  await pressAction(page);
  await waitFor(page, () => !LUMO.dialogue.isOpen);
  const e1 = await page.evaluate(() => ({ cam: LUMO.cameraRig.mode, enabled: LUMO.player.enabled, bar: !!document.querySelector('.dlg-bar.is-in'), flag: LUMO.state.get('flags.e11.luc-ruhig'), bond: LUMO.state.get('bonds.luc'), step: LUMO.debug.questInfo().step }));
  check('Szene endet: Kamera zurück, Spieler frei, Flag gesetzt, Bindung +1, Schritt „prognose“ (freiwillig)', e1.cam === 'follow' && e1.enabled && !e1.bar && e1.flag === true && e1.bond === 1 && e1.step === 'prognose', JSON.stringify(e1));

  // ---- Freiwilligen Schritt überspringen → Quest fertig: Teil-Farbwelle, Aufnäher, Glimm, Echte-Welt ----
  const veilBefore = await page.evaluate(() => LUMO.world.veil.zoneValue('klippen'));
  await page.evaluate(() => LUMO.debug.skipStep());
  await sleep(50);
  await page.evaluate(() => LUMO.debug.advance(0.5));
  const done = await page.evaluate(() => ({ unit: LUMO.state.get('units.j1-e11'), wave: LUMO.world.veil.waveActive, patches: LUMO.state.get('patches'), splitter: LUMO.state.get('lichtsplitter'), bond: LUMO.state.get('bonds.luc'), glimm: (document.querySelector('.glimm-line') || {}).textContent || '', active: LUMO.quests.active, marker: LUMO.quests.markers.visible }));
  check('Quest fertig: Einheit fertig, Farbwelle läuft, Aufnäher, 3 Lichtsplitter, Bindung 2, Glimm-Zeile, kein Marker', done.unit === 'fertig' && done.wave && done.patches.includes('j1-e11') && done.splitter === 3 && done.bond === 2 && done.glimm.includes('Bei Rot') && done.active === null && !done.marker, JSON.stringify(done));
  const ovs = await page.evaluate(() => { const ids = LUMO.ui.overlay.ids; LUMO.ui.overlay.closeAll('test'); return ids; });
  if (ovs.length) console.log('· Overlays nach der Quest (andere Systeme):', ovs.join(','));
  await page.evaluate(() => { LUMO.debug.teleport({ x: -80, z: -50 }, Math.atan2(-104 - -80, -96 - -50)); LUMO.debug.setShot({ x: -70, y: 22, z: -40 }, { x: -104, y: 6, z: -96 }); LUMO.debug.advance(1.6); });
  await frames(page, 3);
  await shot(page, '107_teilwelle_klippen');
  await page.evaluate(() => { LUMO.debug.advance(5); LUMO.debug.setShot(null); });
  const veilAfter = await page.evaluate(() => LUMO.world.veil.zoneValue('klippen'));
  check('Teil-Farbwelle: Klippen 1,0 → 0,8 (nicht ganz frei)', veilBefore > 0.95 && Math.abs(veilAfter - 0.8) < 1e-6, `${veilBefore} → ${veilAfter}`);
  await page.evaluate(() => LUMO.ui.journal.open('skillspass'));
  await frames(page, 2);
  const sp = await page.evaluate(() => { const p = document.querySelector('.patch.is-done[data-patch="j1-e11"]'); p.click(); return { flipped: p.classList.contains('is-flipped'), back: p.querySelector('.patch-back p').textContent, icon: !!p.querySelector('.patch-front svg'), stitch: !!p.querySelector('.patch-stitch') }; });
  check('Skills-Pass: Aufnäher j1-e11 mit Rückseite (Kursbegriff), noch ohne Stich', sp.flipped && sp.back.startsWith('Anspannung 0–100') && sp.icon && !sp.stitch, JSON.stringify(sp));
  await shot(page, '108_skillspass');
  await page.evaluate(() => LUMO.ui.journal.open('echteWelt'));
  await frames(page, 2);
  const ew = await page.evaluate(() => { const b = document.querySelector('[data-ew="j1-e11"] [data-answer="versucht"]'); if (!b) return { card: false }; b.click(); return { card: true, answer: LUMO.state.get('echteWelt.j1-e11'), stitch: LUMO.state.get('stiche.j1-e11') }; });
  check('Echte-Welt-Karte: einmal antippen → ein Stich auf dem Aufnäher', ew.card && ew.answer === 'versucht' && ew.stitch === 1, JSON.stringify(ew));
  await page.evaluate(() => LUMO.ui.journal.open('skillspass'));
  await frames(page, 2);
  const st2 = await page.evaluate(() => !!document.querySelector('.patch[data-patch="j1-e11"] .patch-stitch'));
  check('Skills-Pass zeigt den Stich', st2);
  await page.evaluate(() => LUMO.ui.journal.close());

  // ---- Echos: Figuren zitieren deine Tat beim nächsten Treffen; negatives Echo = „verstimmt“ mit Ursache und Reparatur-Quest ----
  const ec = await page.evaluate(() => {
    const E = LUMO.quests.echoes;
    E.register({ id: 'echo-test-luc', when: { deed: 'luc-leine' }, line: { npc: 'luc', say: 'Du hast die Leine gehalten. Danke.' } });
    LUMO.content.register('quests', { id: 'rep-test-jolie', title: 'Nachholen am Dorfplatz', region: 'hafen', steps: [{ id: 'hin', label: 'Zum Dorfplatz', template: 'wegTor', params: { to: { site: 'dorfplatz' } } }], onComplete: [], glimm: 'Na also.', patch: { icon: 'muschel', color: '#39d0c8', back: 'Reparatur.' }, echteWelt: 'x', debrief: ['y'] }, { file: 'test', name: 'rep-test-jolie' });
    E.register({ id: 'echo-test-jolie', when: { flag: 'test.jolie' }, effect: { mood: ['jolie', 'verstimmt'] }, line: { npc: 'jolie', say: 'Du warst nicht am Steg.' }, repair: { quest: 'rep-test-jolie', clears: true } });
    LUMO.state.set('flags.test.jolie', true);
    const fired = E.check();
    return { fired, mood: LUMO.state.get('moods.jolie'), verstimmt: LUMO.npcs.isVerstimmt('jolie'), bond: LUMO.state.get('bonds.jolie') || 0, active: LUMO.quests.active, pendLuc: E.pending('luc').length, pendJolie: E.pending('jolie').length };
  });
  check('Echos zünden: Luc-Zeile offen, Jolie verstimmt (Ursache + Reparatur, Bindung bleibt), Reparatur-Quest läuft', ec.fired.length === 2 && ec.pendLuc === 1 && ec.pendJolie === 1 && ec.verstimmt && ec.mood && ec.mood.kind === 'verstimmt' && ec.mood.repair === 'rep-test-jolie' && ec.bond === 0 && ec.active === 'rep-test-jolie', JSON.stringify(ec));
  await page.evaluate(() => { LUMO.ui.overlay.closeAll('test'); window.__talk = LUMO.npcs.talk('luc'); });
  await waitFor(page, () => document.querySelector('.bubble[data-who="luc"]') && document.querySelector('.bubble-text').textContent.startsWith('Du hast die Leine'));
  const el1 = await page.evaluate(() => ({ cam: LUMO.cameraRig.mode, top: Math.round(document.querySelector('.bubble').getBoundingClientRect().top), anchored: document.querySelector('.bubble').classList.contains('is-anchored') }));
  await frames(page, 2);
  await shot(page, '109_echo_luc');
  await pressAction(page);
  const el2 = await page.evaluate(async () => { await window.__talk; return { open: !!document.querySelector('.bubble:not(.is-out)'), pend: LUMO.quests.echoes.pending('luc').length, cam: LUMO.cameraRig.mode }; });
  check('Reden mit Luc: Echo-Zeile als Blase (Kamera „talk“, ganz im Bild), danach verbraucht', el1.cam === 'talk' && el1.top >= 0 && el1.anchored && !el2.open && el2.pend === 0 && el2.cam === 'follow', JSON.stringify({ el1, el2 }));
  await page.evaluate(() => { window.__talk2 = LUMO.npcs.talk('jolie'); });
  await waitFor(page, () => document.querySelector('.bubble[data-who="jolie"]') && document.querySelector('.bubble-text').textContent.startsWith('Du warst nicht'));
  await frames(page, 2);
  await shot(page, '110_echo_jolie');
  await pressAction(page);
  // Nach der Zeile: Hinweis auf die Reparatur-Quest (Toast), danach die Quest erledigen
  const ej = await page.evaluate(async () => { await window.__talk2; return { toast: [...document.querySelectorAll('.toast')].map((t) => t.textContent).join('|') }; });
  await scen(page, ['site dorfplatz', 'wait 0.5']);
  await sleep(50);
  const rep = await page.evaluate(() => ({ status: LUMO.quests.status('rep-test-jolie'), verstimmt: LUMO.npcs.isVerstimmt('jolie'), mood: LUMO.state.get('moods.jolie'), cleared: (LUMO.state.get('echoes') || []).find((e) => e.id === 'echo-test-jolie'), patches: LUMO.state.get('patches') }));
  check('Jolies Echo nennt die Ursache und die Reparatur; die Reparatur-Quest hebt „verstimmt“ auf, ohne Einheiten-Aufnäher', ej.toast.includes('Wiedergutmachen') && rep.status === 'fertig' && !rep.verstimmt && rep.mood === undefined && rep.cleared && rep.cleared.cleared === true && !rep.patches.includes('rep-test-jolie'), JSON.stringify({ ej, rep }));

  // ---- Kurzfassung: Einheit ohne Code → Fähigkeit und Schleier sofort, 3-Minuten-Szene spielbar ----
  await page.evaluate(() => { LUMO.save.newGame(2, { seed: 5, persist: false }); LUMO.debug.freezeTime(true); LUMO.debug.advance(0.2); });
  await sleep(50);
  const k0 = await page.evaluate(() => ({ unit: LUMO.state.get('units.j1-e11'), upg: LUMO.state.get('upgrades', []), veil: LUMO.world.veil.zoneValue('klippen') }));
  await page.evaluate(() => { LUMO.state.set('units.j1-e11', 'kurz'); });
  await sleep(50);
  const k1 = await page.evaluate(() => ({ upg: LUMO.state.get('upgrades', []), veil: LUMO.state.get('veil.zones.klippen'), status: LUMO.quests.status('j1-e11'), ok: LUMO.debug.startKurz('j1-e11'), step: LUMO.debug.questInfo().step, kurz: LUMO.debug.questInfo().kurz }));
  check('Kurzfassung: ruhe.puls und Schleier 0,8 sofort, Kurz-Szene startet bei „windschatten“', !k0.upg.includes('ruhe.puls') && k1.upg.includes('ruhe.puls') && k1.veil === 0.8 && k1.status === 'kurz' && k1.ok && k1.step === 'windschatten' && k1.kurz, JSON.stringify({ k0, k1 }));
  await page.evaluate(() => LUMO.quests.stop());

  // ---- Rückzug und Verlassen: sofort, ohne Strafe ----
  await page.evaluate(() => { LUMO.ui.overlay.closeAll('test'); LUMO.debug.teleport('hafen'); LUMO.debug.setPuls(20); window.__dlg = LUMO.debug.playDialogue('e11-luc-kante'); });
  await waitFor(page, () => document.querySelector('.bubble[data-who="luc"]'));
  await pressAction(page);
  await waitFor(page, () => (LUMO.ui.choices.open && document.querySelector('.choices')));
  const g4 = await page.evaluate(() => [...document.querySelectorAll('[data-choice]')].filter((e) => !e.classList.contains('is-system')).length);
  check('Bei Puls 20 (grün) alle Wahlen, deren Bedingung stimmt: 3 von 4 („Was ist los?“ braucht Hitze < 70)', g4 === 3, String(g4));
  await page.click('.dlg-bar [data-exit]');
  const ex = await page.evaluate(async () => { const r = await window.__dlg; return { reason: r.reason, open: LUMO.dialogue.isOpen, hitze: LUMO.debug.hitze('luc'), enabled: LUMO.player.enabled }; });
  check('Szene verlassen (X): Ende ohne Strafe, Spieler frei', ex.reason === 'exit' && !ex.open && ex.hitze >= 85 && ex.enabled, JSON.stringify(ex));
  await page.evaluate(() => { window.__dlg2 = LUMO.debug.playDialogue('e11-luc-kante'); });
  await waitFor(page, () => document.querySelector('.bubble[data-who="luc"]'));
  await pressAction(page);
  await waitFor(page, () => (LUMO.ui.choices.open && document.querySelector('.choices')));
  await page.evaluate(() => LUMO.events.emit('dialogue:choose', { id: 'rueckzug' }));
  const rz = await page.evaluate(async () => { const r = await window.__dlg2; return r.reason; });
  check('Rückzug beendet die Szene', rz === 'rueckzug', rz);

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

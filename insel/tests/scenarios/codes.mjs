// Szenario WP30 (Browser): Tagebuch-Seite „Code“ (Wort-Vorschläge aus der Wortliste, Zahlenrad, Vorlesen, freundliche
// Fehlermeldung ohne Hinweis), Code WELLE → j1-e11 aktiv + e01–e10 Kurzfassung, Groß/Klein egal, Modul-/Demo-/
// Ersatzcode, Lehrer-Code → Lehrer-Panel (Codes, Inselwetter, Lines & Veils, Namen, Farben, Eingelöst), Panel ohne
// Lehrer-Code unerreichbar, Gerätespeicher überlebt Neuladen, Wipe löscht ihn, Hochformat ohne Überlauf.
// Aufruf: node tests/scenarios/codes.mjs   (SHOTS=Ordner, Q=low|medium|high, VERBOSE=1)
import { launch, openGame, startGame, frames, shot, runScenario, IPAD_LANDSCAPE, IPAD_PORTRAIT } from '../lib.mjs';

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
const bad = (r) => r.steps.filter((s) => !s.ok).map((s) => s.step + ' · ' + s.info).join(' | ');
const installFakeSynth = (page) => page.evaluate(() => {
  window.__spoken = [];
  LUMO.speech.setSynth({ getVoices: () => [{ lang: 'de-DE', name: 'Anna', localService: true }], speak(u) { window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 20); }, cancel() {} });
});
const typeCode = async (page, text) => { await page.fill('.jn-page[data-page-id="code"] .code-input', ''); await page.type('.jn-page[data-page-id="code"] .code-input', text); };
const submitCode = (page) => page.evaluate(() => { document.querySelector('.jn-page[data-page-id="code"] form').dispatchEvent(new Event('submit', { cancelable: true })); });
const openCodePage = async (page) => { await page.evaluate(() => { LUMO.ui.overlay.closeAll(); LUMO.ui.journal.open('code'); }); await frames(page, 2); };

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart&debug` });
  await startGame(page);
  await installFakeSynth(page);

  // ---- Plugins, API, Panel unerreichbar ----
  const api = await page.evaluate(() => ({
    plugins: LUMO.plugins.list, failed: LUMO.plugins.failed,
    codes: !!LUMO.codes && typeof LUMO.codes.redeem === 'function' && LUMO.codes.words.length === 256,
    list: LUMO.codes.list().length, teacherOpen: LUMO.plugins.teacher.open(), panel: !!document.querySelector('.ov[data-overlay=lehrer]'),
    pages: LUMO.ui.journal.pages.map((p) => p.id), teacher: LUMO.codes.isTeacher(),
  }));
  check('Plugins gefuehlsfarben + codes + teacher installiert', ['gefuehlsfarben', 'codes', 'teacher'].every((p) => api.plugins.includes(p)) && !api.failed.some((f) => ['codes', 'teacher', 'gefuehlsfarben'].includes(f.id)), JSON.stringify(api.plugins) + (api.failed.length ? ' · fehlgeschlagen: ' + JSON.stringify(api.failed) : ''));
  check('game.codes mit 54 Codes und 256 Wörtern; Tagebuch-Seite „Code“, „Lehrer“ versteckt', api.codes && api.list === 54 && api.pages.includes('code') && !api.pages.includes('lehrer'), JSON.stringify({ list: api.list, pages: api.pages }));
  check('Lehrer-Panel ohne Lehrer-Code unerreichbar', api.teacherOpen === false && !api.panel && !api.teacher);

  // ---- Tagebuch-Seite Code: falscher Code, Vorschläge, Zahlenrad, Vorlesen ----
  await openCodePage(page);
  const dom0 = await page.evaluate(() => ({ input: !!document.querySelector('.code-input'), dial: document.querySelector('[data-dial]').hidden, toggle: !!document.querySelector('[data-dial-toggle]'), read: !!document.querySelector('[data-read]'), x: !!document.querySelector('.ov[data-overlay=tagebuch] .ov-close') }));
  check('Code-Seite: Eingabe, Zahlenrad (zu), Vorlesen, X', dom0.input && dom0.dial === true && dom0.toggle && dom0.read && dom0.x, JSON.stringify(dom0));
  await typeCode(page, 'quatsch');
  await submitCode(page);
  await sleep(80);
  const wrong = await page.evaluate(() => ({ msg: document.querySelector('.code-msg').textContent, cls: document.querySelector('.code-msg').className, chips: [...document.querySelectorAll('.code-chip')].map((c) => c.textContent), used: LUMO.state.get('codesUsed', []).length }));
  check('Falscher Code: freundliche Meldung ohne Hinweis, nichts eingelöst', wrong.msg === 'Dieser Code passt hier nicht.' && wrong.cls.includes('is-bad') && wrong.chips.length === 0 && wrong.used === 0, JSON.stringify(wrong));
  await typeCode(page, 'wele');
  const live = await page.evaluate(() => [...document.querySelectorAll('.code-chip')].map((c) => c.textContent));
  await submitCode(page);
  await sleep(80);
  const typo = await page.evaluate(() => ({ msg: document.querySelector('.code-msg').textContent, label: (document.querySelector('.code-sugg small') || {}).textContent, chips: [...document.querySelectorAll('.code-chip')].map((c) => c.textContent) }));
  check('Tippfehler „wele“: Vorschlag WELLE aus der Wortliste (beim Tippen und nach Abweisen)', live.includes('WELLE') && typo.chips.includes('WELLE') && typo.label === 'Meintest du …?' && typo.msg === 'Dieser Code passt hier nicht.', JSON.stringify({ live, typo }));
  await typeCode(page, 'del');
  const pre = await page.evaluate(() => [...document.querySelectorAll('.code-chip')].map((c) => c.textContent));
  check('Präfix „del“: Vorschläge beginnen mit DEL (≤ 4)', pre.length >= 1 && pre.length <= 4 && pre.every((w) => w.startsWith('DEL')), pre.join(','));
  await page.click('.code-chip');
  const filled = await page.evaluate(() => document.querySelector('.code-input').value);
  check('Vorschlag antippen füllt die Eingabe', filled === pre[0], filled);
  await frames(page, 2);
  await shot(page, '110_code_seite');
  // Vorlesen buchstabiert
  await typeCode(page, 'welle');
  await page.click('[data-read]');
  await sleep(60);
  const spoken = await page.evaluate(() => window.__spoken.slice(-1)[0]);
  check('Vorlesen buchstabiert den Code', spoken === 'W, E, L, L, E', spoken);
  // Zahlenrad
  await page.click('[data-dial-toggle]');
  await page.click('.dial[data-digit=tens] [data-up]'); await page.click('.dial[data-digit=tens] [data-up]'); await page.click('.dial[data-digit=tens] [data-up]'); await page.click('.dial[data-digit=tens] [data-up]');
  await page.click('.dial[data-digit=ones] [data-down]'); await page.click('.dial[data-digit=ones] [data-down]'); await page.click('.dial[data-digit=ones] [data-down]'); await page.click('.dial[data-digit=ones] [data-down]'); await page.click('.dial[data-digit=ones] [data-down]'); await page.click('.dial[data-digit=ones] [data-down]'); await page.click('.dial[data-digit=ones] [data-down]'); await page.click('.dial[data-digit=ones] [data-down]');
  const dial = await page.evaluate(() => ({ hidden: document.querySelector('[data-dial]').hidden, tens: document.querySelector('.dial[data-digit=tens] output').textContent, ones: document.querySelector('.dial[data-digit=ones] output').textContent }));
  check('Zahlenrad: sichtbar, Zehner 4, Einer 2 (mit Überlauf)', !dial.hidden && dial.tens === '4' && dial.ones === '2', JSON.stringify(dial));
  await frames(page, 2);
  await shot(page, '111_code_zahlenrad');

  // ---- Lehrer-Code über Wort + Zahlenrad → Panel ----
  await typeCode(page, 'leuchtfeuer');
  await submitCode(page);
  await page.waitForFunction(() => !!document.querySelector('.ov[data-overlay=lehrer].is-in'), null, { timeout: 20000 });
  await frames(page, 2);
  const tp = await page.evaluate(() => ({ teacher: LUMO.codes.isTeacher(), open: LUMO.plugins.teacher.isOpen, page: document.querySelector('.ov[data-overlay=lehrer] .jn-page').dataset.pageId, tabs: [...document.querySelectorAll('.ov[data-overlay=lehrer] [data-page]')].map((b) => b.dataset.page), rows: document.querySelectorAll('.ov[data-overlay=lehrer] tr[data-unit]').length, j08: !!document.querySelector('.ov[data-overlay=lehrer] tr[data-unit="j1-j08"]'), x: !!document.querySelector('.ov[data-overlay=lehrer] .ov-close'), used: LUMO.state.get('codesUsed', []), lehrerPage: LUMO.ui.journal.pages.some((p) => p.id === 'lehrer') }));
  check('LEUCHTFEUER-42 öffnet das Lehrer-Panel: 6 Seiten, 39 Einheiten inkl. j08, X, Tagebuch-Seite „Lehrer“', tp.teacher && tp.open && tp.page === 'codes' && tp.tabs.length === 6 && tp.rows === 39 && tp.j08 && tp.x && tp.used.includes('teacher:teacher') && tp.lehrerPage, JSON.stringify(tp));
  await shot(page, '112_lehrer_codes');
  // Ersatzcodes einblenden
  await page.click('.ov[data-overlay=lehrer] [data-show-alt]');
  await frames(page, 1);
  const alt = await page.evaluate(() => ({ small: document.querySelectorAll('.ov[data-overlay=lehrer] .tp-code small').length, text: (document.querySelector('.ov[data-overlay=lehrer] tr[data-unit="j1-e11"] .tp-code small') || {}).textContent, expect: LUMO.codes.hashCode('unit', 'j1-e11') }));
  check('Ersatzcodes einblendbar (WORT-WORT-ZZ)', alt.small >= 54 && alt.text === alt.expect, JSON.stringify(alt));
  await page.click('.ov[data-overlay=lehrer] [data-show-alt]');

  // ---- Seiten des Panels ----
  const tabs = {};
  for (const id of ['wetter', 'lines', 'namen', 'farben', 'eingeloest']) {
    await page.click(`.ov[data-overlay=lehrer] [data-page="${id}"]`);
    await frames(page, 1);
    tabs[id] = await page.evaluate(() => { const el = document.querySelector('.ov[data-overlay=lehrer] .jn-page'); return { id: el.dataset.pageId, weather: el.querySelectorAll('[data-weather]').length, lv: !!el.querySelector('[data-lv]'), names: el.querySelectorAll('[data-name]').length, colors: el.querySelectorAll('[data-emo]').length, slots: el.querySelectorAll('.tp-slot').length, end: !!el.querySelector('[data-teacher-end]') }; });
    if (id === 'lines' || id === 'namen' || id === 'farben') await shot(page, `113_lehrer_${id}`);
  }
  check('Panel-Seiten: 3 Wetter, L&V-Schalter, ≥ 20 Namen, 6 Farben, Spielstände, Beenden', tabs.wetter.weather === 3 && tabs.lines.lv && tabs.namen.names >= 20 && tabs.farben.colors === 6 && tabs.eingeloest.slots >= 1 && Object.values(tabs).every((t) => t.end), JSON.stringify(tabs));

  // ---- Lines & Veils ----
  await page.click('.ov[data-overlay=lehrer] [data-page="lines"]');
  await frames(page, 1);
  await page.click('.ov[data-overlay=lehrer] [data-lv]');
  await frames(page, 1);
  const lv = await page.evaluate(() => { const r = LUMO.codes.redeem('wurzel', { via: 'test' }); return { active: LUMO.codes.teacher.linesVeils.active, session: LUMO.state.get('session.linesVeils'), r: { ok: r.ok, veiled: r.veiled, message: r.message }, e17: LUMO.state.get('units.j1-e17'), flag: LUMO.state.get('quests.j1-e17.linesVeils'), e16: LUMO.state.get('units.j1-e16'), stored: JSON.parse(localStorage.getItem('lumo.teacher') || '{}').linesVeils }; });
  check('Lines & Veils an: WURZEL (e17) wird Kurzfassung ohne Szene, frühere Einheiten Kurzfassung', lv.active && lv.session && lv.r.ok && lv.r.veiled[0] === 'j1-e17' && lv.r.message.startsWith('Kurzfassung') && lv.e17 === 'kurz' && lv.flag === true && lv.e16 === 'kurz' && lv.stored === true, JSON.stringify(lv));
  await page.click('.ov[data-overlay=lehrer] [data-lv]');
  await frames(page, 1);
  const lv2 = await page.evaluate(() => ({ active: LUMO.codes.teacher.linesVeils.active, e17: LUMO.state.get('units.j1-e17'), flag: LUMO.state.get('quests.j1-e17.linesVeils') }));
  check('Lines & Veils aus: per Code geöffnete Einheit kommt zurück auf offen', !lv2.active && lv2.e17 === 'offen' && lv2.flag === false, JSON.stringify(lv2));

  // ---- Namen ----
  await page.click('.ov[data-overlay=lehrer] [data-page="namen"]');
  await frames(page, 1);
  await page.fill('.ov[data-overlay=lehrer] [data-name="luc"] input', 'Lenny');
  await page.click('.ov[data-overlay=lehrer] [data-name="luc"] [data-name-save]');
  await frames(page, 1);
  await page.fill('.ov[data-overlay=lehrer] [data-name="glimm"] input', 'Funke');
  await page.press('.ov[data-overlay=lehrer] [data-name="glimm"] input', 'Enter');
  await frames(page, 1);
  const nm = await page.evaluate(() => ({ luc: LUMO.npcs.nameOf('luc'), state: LUMO.state.get('names.luc'), glimm: LUMO.state.get('names.glimm'), device: JSON.parse(localStorage.getItem('lumo.teacher') || '{}').names, row: (document.querySelector('.ov[data-overlay=lehrer] [data-name="luc"] small') || {}).textContent }));
  check('Umbenennen: Luc → Lenny, Glimm → Funke (Figur, Spielstand, Gerät)', nm.luc === 'Lenny' && nm.state === 'Lenny' && nm.glimm === 'Funke' && nm.device && nm.device.luc === 'Lenny' && nm.device.glimm === 'Funke' && nm.row.includes('Lenny'), JSON.stringify(nm));

  // ---- Farben ----
  await page.click('.ov[data-overlay=lehrer] [data-page="farben"]');
  await frames(page, 1);
  await page.evaluate(() => { const i = document.querySelector('.ov[data-overlay=lehrer] [data-emo="wut"] input'); i.value = '#aa0000'; i.dispatchEvent(new Event('input', { bubbles: true })); });
  await frames(page, 1);
  const col = await page.evaluate(() => ({ ui: LUMO.ui.EMOTION_COLOR.wut, css: getComputedStyle(document.documentElement).getPropertyValue('--emo-wut').trim(), stored: JSON.parse(localStorage.getItem('lumo.teacher') || '{}').colors, reset: !document.querySelector('.ov[data-overlay=lehrer] [data-colors-reset]').disabled }));
  check('Gefühlsrad-Farbe Wut → #aa0000 (Icons, CSS-Variable, Gerät)', col.ui === '#aa0000' && col.css === '#aa0000' && col.stored && col.stored.wut === '#aa0000' && col.reset, JSON.stringify(col));
  await page.click('.ov[data-overlay=lehrer] [data-colors-reset]');
  await frames(page, 1);
  const col2 = await page.evaluate(() => ({ ui: LUMO.ui.EMOTION_COLOR.wut, stored: JSON.parse(localStorage.getItem('lumo.teacher') || '{}').colors }));
  check('Standardfarben stellen zurück', col2.ui === '#ff4d4d' && !col2.stored, JSON.stringify(col2));

  // ---- Inselwetter ----
  await page.click('.ov[data-overlay=lehrer] [data-page="wetter"]');
  await frames(page, 1);
  await page.click('.ov[data-overlay=lehrer] [data-weather="ruhe"]');
  await sleep(120);
  await frames(page, 1);
  const w = await page.evaluate(() => ({ cur: LUMO.plugins.session.weather.current, factor: LUMO.state.get('session.pulsFactor'), used: LUMO.state.get('codesUsed', []).includes('weather:ruhe'), lead: document.querySelector('.ov[data-overlay=lehrer] .jn-lead').textContent }));
  check('Ruhewetter per Panel: läuft, Puls-Faktor 0,5, als Code vermerkt', w.cur === 'ruhe' && w.factor === 0.5 && w.used && w.lead.includes('Ruhewetter'), JSON.stringify(w));
  await page.click('.ov[data-overlay=lehrer] [data-weather-clear]');
  await sleep(80);
  check('Wetter beenden', await page.evaluate(() => LUMO.plugins.session.weather.current === null));

  // ---- Eingelöst und Beenden ----
  await page.click('.ov[data-overlay=lehrer] [data-page="eingeloest"]');
  await frames(page, 1);
  const used = await page.evaluate(() => ({ chips: [...document.querySelectorAll('.ov[data-overlay=lehrer] .tp-chips span')].map((c) => c.textContent), text: document.querySelector('.ov[data-overlay=lehrer] .jn-page').textContent }));
  check('Eingelöst: Codes dieses Geräts (Lehrer, WURZEL, Ruhewetter), keine Personendaten', used.chips.some((c) => c.includes('WURZEL')) && used.chips.includes('Ruhewetter') && used.chips.includes('Lehrer-Panel') && !used.text.includes('Lenny'), JSON.stringify(used.chips));
  await shot(page, '114_lehrer_eingeloest');
  await page.click('.ov[data-overlay=lehrer] [data-teacher-end]');
  await sleep(300);
  const ended = await page.evaluate(() => ({ teacher: LUMO.codes.isTeacher(), open: LUMO.plugins.teacher.isOpen, again: LUMO.plugins.teacher.open(), page: LUMO.ui.journal.pages.some((p) => p.id === 'lehrer') }));
  check('Lehrer-Modus beenden: Panel zu und wieder unerreichbar', !ended.teacher && !ended.open && ended.again === false && !ended.page, JSON.stringify(ended));

  // ---- Einheiten-Codes headless ----
  const r1 = await scen(page, ['teleport hafen', 'code welle', 'expect state.units.j1-e11 == aktiv', 'expect state.units.j1-e10 == kurz', 'expect state.units.j1-e01 == kurz', 'expect state.upgrades ~ ruhe.puls', 'expect state.codesUsed ~ unit:j1-e11', 'code WELLE', 'expect state.units.j1-e11 == aktiv']);
  check('Code WELLE (Debug delegiert an game.codes): e11 aktiv, e01–e10 Kurzfassung, ruhe.puls, Groß/Klein egal', r1.ok, bad(r1));
  const again = await page.evaluate(() => { const r = LUMO.codes.redeem('Welle'); return { already: r.already, message: r.message, used: LUMO.state.get('codesUsed', []).filter((k) => k === 'unit:j1-e11').length }; });
  check('Zweites Einlösen: „Schon offen“, nur einmal vermerkt', again.already && again.message.startsWith('Schon offen') && again.used === 1, JSON.stringify(again));
  const mod = await page.evaluate(() => { const r = LUMO.codes.redeem('kompass-4'); return { ok: r.ok, kurz: r.kurz, e15: LUMO.state.get('units.j1-e15'), e19: LUMO.state.get('units.j1-e19'), e20: LUMO.state.get('units.j1-e20'), e11: LUMO.state.get('units.j1-e11'), message: r.message }; });
  // e12–e17 sind seit WURZEL schon Kurzfassung; der Modul-Code holt den Rest bis e19 nach, e20 bleibt zu
  check('Modul-Code KOMPASS-4: Rest bis e19 als Kurzfassung, Laufendes bleibt', mod.ok && mod.kurz.includes('j1-e18') && mod.kurz.includes('j1-e19') && mod.e15 === 'kurz' && mod.e19 === 'kurz' && !mod.e20 && mod.e11 === 'aktiv', JSON.stringify(mod));
  const altc = await page.evaluate(() => { const c = LUMO.codes.hashCode('unit', 'j1-e04'); const r = LUMO.codes.redeem(c.toLowerCase()); return { c, ok: r.ok, alt: r.alt, e04: LUMO.state.get('units.j1-e04') }; });
  check('Ersatzcode öffnet die volle Quest einer Kurzfassung', altc.ok && altc.alt && altc.e04 === 'offen', JSON.stringify(altc));
  const j08 = await page.evaluate(() => { const r = LUMO.codes.redeem('linde'); return { ok: r.ok, st: LUMO.state.get('units.j1-j08'), kurz: r.kurz.length }; });
  check('j08 nur per eigenem Code LINDE (keine Kurzfassungen dabei)', j08.ok && j08.st === 'offen' && j08.kurz === 0, JSON.stringify(j08));
  // Erfolgsmeldung auf der Seite und Wechsel zu den Aufträgen
  await openCodePage(page);
  await typeCode(page, 'brise');
  await submitCode(page);
  await sleep(60);
  const okMsg = await page.evaluate(() => ({ msg: document.querySelector('.code-msg').textContent, cls: document.querySelector('.code-msg').className, spoken: window.__spoken.slice(-1)[0] }));
  await sleep(1100);
  const after = await page.evaluate(() => LUMO.ui.journal.current);
  check('Seite: „Geöffnet: Ebbe und Flut.“ (vorgelesen), danach Aufträge', okMsg.msg === 'Geöffnet: Ebbe und Flut.' && okMsg.cls.includes('is-ok') && after === 'auftraege', JSON.stringify({ okMsg, after }));

  // ---- Hochformat ----
  await page.setViewportSize(IPAD_PORTRAIT);
  await frames(page, 2);
  await openCodePage(page);
  await page.click('[data-dial-toggle]');
  await frames(page, 2);
  const portrait = await page.evaluate(() => { const el = document.querySelector('.ov[data-overlay=tagebuch] .ov-card'); const small = [...document.querySelectorAll('.jn-page[data-page-id="code"] button')].map((b) => b.getBoundingClientRect()).filter((r) => r.width > 0 && (r.width < 44 || r.height < 44)); return { overflow: document.documentElement.scrollWidth > window.innerWidth + 1 || el.scrollWidth > el.clientWidth + 1, small: small.length }; });
  check('Hochformat: kein Überlauf, Knöpfe ≥ 44 px', !portrait.overflow && portrait.small === 0, JSON.stringify(portrait));
  await shot(page, '115_code_hochformat');
  await page.setViewportSize(IPAD_LANDSCAPE);

  // ---- Neuladen: Gerätespeicher bleibt, Wipe löscht ihn ----
  await page.evaluate(() => { LUMO.codes.teacher.names.set('tun', 'Timo'); LUMO.save.save(); });
  await page.reload();
  await page.waitForFunction(() => window.LUMO && LUMO.loop && LUMO.loop.frame > 1, null, { timeout: 180000 });
  await startGame(page);
  const re = await page.evaluate(() => ({ tun: LUMO.state.get('names.tun'), luc: LUMO.npcs.nameOf('luc'), used: LUMO.state.get('codesUsed', []).includes('unit:j1-e11'), device: LUMO.codes.teacher.names.get('tun') }));
  check('Nach Neuladen: Namen vom Gerät, eingelöste Codes im Spielstand', re.tun === 'Timo' && re.luc === 'Lenny' && re.used && re.device === 'Timo', JSON.stringify(re));
  const wipe = await page.evaluate(() => { LUMO.save.wipe(); return { key: localStorage.getItem('lumo.teacher'), names: LUMO.codes.teacher.names.list().filter((n) => n.custom).length, lv: LUMO.codes.teacher.linesVeils.active, tun: LUMO.state.get('names.tun') }; });
  check('Wipe löscht auch lumo.teacher', wipe.key === null && wipe.names === 0 && !wipe.lv && wipe.tun === undefined, JSON.stringify(wipe));
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

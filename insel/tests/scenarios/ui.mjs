// Szenario WP20/WP21 (Browser): Overlays mit X überall, Sprechblasen mit Vorlese-Knopf, Auswahl-Kacheln (Rückzug/Hilfe),
// Tagebuch-Seiten, Einstellungen (großer Text, reduzierte Effekte, Auto-Vorlesen, Glimm stumm, Modus), Recap, Lagerfeuer,
// Touch-Ziele ≥ 64 px, Hochformat ohne Überlauf, Musik-Pegel offline (≤ −6 dBFS, kein Sprung > 12 dB/100 ms), Vorlesen.
// Aufruf: node tests/scenarios/ui.mjs   (SHOTS=Ordner, Q=low|medium|high, VERBOSE=1)
import { launch, openGame, startGame, frames, shot, pickChoice, IPAD_LANDSCAPE, IPAD_PORTRAIT } from '../lib.mjs';

const Q = process.env.Q || 'low';
const results = [];
let failed = false;
function check(name, ok, info = '') {
  results.push({ name, ok, info });
  console.log(ok ? '✔' : '✘', name, info);
  if (!ok) failed = true;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// Ersatz-Sprachausgabe in der Seite (Chromium ohne Stimmen)
const installFakeSynth = (page) => page.evaluate(() => {
  window.__spoken = [];
  LUMO.speech.setSynth({ getVoices: () => [{ lang: 'de-DE', name: 'Anna', localService: true }], speak(u) { window.__spoken.push({ text: u.text, lang: u.lang, rate: u.rate, who: LUMO.speech.current && LUMO.speech.current.who }); setTimeout(() => u.onend && u.onend(), 30); }, cancel() {} });
});

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await startGame(page);
  await installFakeSynth(page);

  // ---- Plugins und API ----
  const api = await page.evaluate(() => ({
    plugins: LUMO.plugins.list, failed: LUMO.plugins.failed,
    ui: ['overlay', 'bubbles', 'choices', 'settings', 'journal', 'recap', 'campfire', 'pauseMenu', 'lock', 'say', 'ask', 'glimm'].filter((k) => !LUMO.ui[k]),
    music: !!LUMO.music && LUMO.music.state.started, speech: !!LUMO.speech, theme: LUMO.music.state.theme, icons: LUMO.ui.icons.length,
  }));
  check('Plugins audio + ui installiert', api.plugins.includes('audio') && api.plugins.includes('ui') && api.failed.length === 0, JSON.stringify(api.plugins));
  check('game.ui hat alle Bausteine', api.ui.length === 0 && api.icons > 60, 'fehlt: ' + api.ui.join(','));
  check('Musik läuft nach dem Start (Hafen-Thema)', api.music && api.theme === 'hafen', api.theme);

  // ---- Sprechblase ----
  const b1 = await page.evaluate(() => {
    window.__p1 = LUMO.ui.say({ who: 'jolie', text: 'Du bist neu hier, oder? Moien.' });
    const el = document.querySelector('.bubble');
    return { el: !!el, read: !!el.querySelector('[data-read]'), next: !!el.querySelector('[data-next]'), name: el.querySelector('.bubble-name').textContent, color: el.style.getPropertyValue('--who'), text: el.querySelector('.bubble-text').textContent, locked: !LUMO.player.enabled, hudHidden: document.getElementById('hud').classList.contains('has-bubble') };
  });
  check('Sprechblase: Figur-Icon, Name, Farbe, Vorlese-Knopf, Weiter', b1.el && b1.read && b1.next && b1.name === 'Jolie' && b1.color === '#39d0c8' && b1.text.includes('Moien'), JSON.stringify(b1));
  check('Sprechblase sperrt den Spieler, HUD-Aktionsknopf weicht', b1.locked && b1.hudHidden);
  await frames(page, 3);
  await shot(page, '80_blase');
  await page.click('.bubble [data-read]');
  await sleep(80);
  const spoke = await page.evaluate(() => window.__spoken.slice(-1)[0]);
  check('Vorlese-Knopf spricht de-DE mit Tempo 0,95', spoke && spoke.lang === 'de-DE' && Math.abs(spoke.rate - 0.95 * 0.95) < 1e-6 && spoke.text.includes('Moien'), JSON.stringify(spoke));
  const dismissed = await page.evaluate(async () => { LUMO.input.press('action'); LUMO.debug.advance(1 / 30); LUMO.input.release('action'); const r = await window.__p1; LUMO.debug.advance(0.5); return { ...r, enabled: LUMO.player.enabled, gone: !document.querySelector('.bubble.is-in') }; });
  check('Aktion blättert weiter, Spieler wieder frei', dismissed.dismissed === 'action' && dismissed.enabled && dismissed.gone, JSON.stringify(dismissed));

  // ---- Glimm ----
  const g1 = await page.evaluate(() => { LUMO.ui.glimm('Regeln. Gähn. Okay, die war gut.'); const el = document.querySelector('.glimm-line'); return { text: el && el.textContent.trim(), badge: document.querySelector('.glimm-badge').dataset.zone }; });
  check('Glimm-Zeile oben links, Glimm-Anzeige neutral vor e11', g1.text === 'Regeln. Gähn. Okay, die war gut.' && g1.badge === 'neutral', JSON.stringify(g1));
  const gm = await page.evaluate(async () => { LUMO.ui.settings.set('glimmMuted', true); const r = await LUMO.ui.glimm('Psst.'); const muted = document.querySelector('.glimm-badge').classList.contains('is-muted'); LUMO.ui.settings.set('glimmMuted', false); return { ...r, muted }; });
  check('Glimm stumm: keine Zeile, keine Stimme, Anzeige gedimmt', gm.muted === true && gm.shown === false, JSON.stringify(gm));
  await page.evaluate(() => { LUMO.debug.grantAbility('ruhe.puls'); LUMO.debug.setPuls(82); });
  const gz = await page.evaluate(() => document.querySelector('.glimm-badge').dataset.zone);
  check('Glimm-Anzeige zeigt Puls-Zone (rot bei 82)', gz === 'rot', gz);

  // ---- Auswahl-Kacheln ----
  await page.evaluate(() => { window.__p2 = LUMO.ui.say({ who: 'jolie', text: 'Was willst du wissen?', lock: true }); window.__ask = LUMO.ui.ask({ prompt: 'Was sagst du?', items: [{ id: 'hi', label: 'Moien. Ich bin neu.', icon: 'hand' }, { id: 'turm', label: 'Was ist mit dem Turm?', icon: 'frage' }, { id: 'still', label: 'Einfach dazusetzen.', icon: 'herz', tone: 'ruhig' }, { id: 'boot', label: 'Zeig mir das Boot.', icon: 'boot' }] }); });
  await frames(page, 3);
  const c1 = await page.evaluate(() => { const els = [...document.querySelectorAll('[data-choice]')]; return { n: els.length, ids: els.map((e) => e.dataset.id), icons: els.every((e) => e.querySelector('.choice-icon svg')), sizes: els.map((e) => { const r = e.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; }) }; });
  check('4 Kacheln + Rückzug + Hilfe holen (ab ruhe.puls), alle mit Icon', c1.n === 6 && c1.ids.includes('rueckzug') && c1.ids.includes('hilfe') && c1.icons, JSON.stringify(c1.ids));
  check('Kacheln ≥ 64 px hoch', c1.sizes.every(([w, h]) => h >= 64 && w >= 64), JSON.stringify(c1.sizes));
  await shot(page, '81_kacheln');
  await pickChoice(page, 1);
  const pr = await page.evaluate(async () => { const r = await window.__ask; return { id: r.id, index: r.index, system: r.system, gone: !document.querySelector('.choices.is-in') }; });
  check('Kachel 2 gewählt (data-choice-Konvention)', pr.id === 'turm' && pr.index === 1 && pr.system === false && pr.gone, JSON.stringify(pr));
  await page.evaluate(() => { LUMO.ui.bubbles.clear(); });
  const sys = await page.evaluate(async () => { const p = LUMO.ui.ask({ items: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] }); LUMO.events.emit('dialogue:choose', { id: 'hilfe' }); const r = await p; return r; });
  check('Hilfe holen als System-Wahl per Ereignis', sys.system === 'hilfe' && sys.id === 'hilfe', JSON.stringify(sys));
  const keyPick = await page.evaluate(() => { window.__ask3 = LUMO.ui.ask({ items: [{ id: 'eins', label: 'Eins' }, { id: 'zwei', label: 'Zwei' }, { id: 'drei', label: 'Drei' }] }); return true; });
  await page.keyboard.press('Digit3');
  const kp = await page.evaluate(async () => (await window.__ask3).id);
  check('Taste 3 wählt die dritte Kachel', keyPick && kp === 'drei', kp);

  // ---- Pause-Overlay über den HUD-Knopf (Esc schließt), jedes Overlay hat ein X ----
  await page.tap('.hud-menu-btn');
  await frames(page, 3);
  const pm = await page.evaluate(() => ({ open: LUMO.ui.menuOpen, paused: LUMO.paused, x: !!document.querySelector('[data-overlay="pause"] .ov-close'), btns: [...document.querySelectorAll('[data-overlay="pause"] .menu-btn span')].map((s) => s.textContent) }));
  check('Pause-Overlay: pausiert, X vorhanden, Hängematte und Für heute Schluss', pm.open && pm.paused && pm.x && pm.btns.includes('Hängematte') && pm.btns.includes('Für heute Schluss'), JSON.stringify(pm.btns));
  await shot(page, '82_pause');
  await page.keyboard.press('Escape');
  await frames(page, 3);
  const pm2 = await page.evaluate(() => ({ open: LUMO.ui.menuOpen, paused: LUMO.paused, overlays: LUMO.ui.overlay.count }));
  check('Esc schließt das Overlay und hebt die Pause auf', !pm2.open && !pm2.paused && pm2.overlays === 0, JSON.stringify(pm2));

  // ---- Tagebuch: jede Seite, Touch-Ziele, kein Überlauf ----
  await page.evaluate(() => { LUMO.debug.unlockUnit('j1-e11'); LUMO.debug.completeUnit('j1-e03'); LUMO.state.set('shards', [1, 2]); LUMO.state.set('gadgets', []); });
  const pages = await page.evaluate(() => { LUMO.ui.journal.open(); return LUMO.ui.journal.pages.map((p) => p.id); });
  await sleep(400); await frames(page, 3);   // Einblend-Übergang abwarten, sonst misst man die Karte bei 97 %
  check('Tagebuch-Seiten registriert', ['karte', 'auftraege', 'skillspass', 'koffer', 'chronik', 'echteWelt', 'stil', 'code', 'einstellungen'].every((id) => pages.includes(id)), pages.join(','));
  const small = [];
  let overflow = [];
  for (const id of pages) {
    const r = await page.evaluate((id) => {
      LUMO.ui.journal.open(id);
      const ov = document.querySelector('[data-overlay="tagebuch"]');
      const bad = [];
      for (const b of ov.querySelectorAll('button')) { const rc = b.getBoundingClientRect(); if (rc.width === 0 && rc.height === 0) continue; if (rc.width < 64 || rc.height < 64) bad.push(`${id}:${(b.className || '').split(' ')[0]} ${Math.round(rc.width)}×${Math.round(rc.height)}`); }
      const card = ov.querySelector('.ov-card').getBoundingClientRect();
      return { bad, x: !!ov.querySelector('.ov-close'), page: document.querySelector('.jn-page').dataset.pageId, over: card.right > innerWidth + 1 || card.bottom > innerHeight + 1 || document.documentElement.scrollWidth > innerWidth, tab: !!ov.querySelector(`.jn-tab.is-on[data-page="${id}"]`) };
    }, id);
    if (!r.x || !r.tab || r.page !== id) check(`Tagebuch-Seite ${id}`, false, JSON.stringify(r));
    small.push(...r.bad);
    if (r.over) overflow.push(id);
    await frames(page, 2);
    if (['karte', 'auftraege', 'skillspass', 'einstellungen'].includes(id)) await shot(page, `83_tagebuch_${id}`);
  }
  check('Tagebuch: alle Knöpfe ≥ 64 px', small.length === 0, small.slice(0, 6).join(' | '));
  check('Tagebuch: kein Überlauf (quer)', overflow.length === 0, overflow.join(','));
  const flip = await page.evaluate(() => { LUMO.ui.journal.open('skillspass'); const p = document.querySelector('.patch.is-done'); p.click(); return { flipped: p.classList.contains('is-flipped'), back: p.querySelector('.patch-back p').textContent, doneCount: document.querySelectorAll('.patch.is-done').length }; });
  check('Skills-Pass: Aufnäher lässt sich umdrehen', flip.flipped && flip.back.length > 3 && flip.doneCount === 1, JSON.stringify(flip));
  await frames(page, 4);
  await shot(page, '84_aufnaeher_umgedreht');

  // ---- Einstellungen ----
  const st = await page.evaluate(() => {
    const S = LUMO.ui.settings;
    S.set('bigText', true); S.set('reducedFx', true); S.set('autoRead', true); S.set('mode', 'profi');
    const html = document.documentElement;
    const out = { big: html.classList.contains('big-text'), red: html.classList.contains('reduced-fx'), heart: LUMO.audio.heartbeat.enabled, mode: LUMO.state.get('settings.mode'), auto: LUMO.speech.settings.autoRead, scale: getComputedStyle(html).getPropertyValue('--txt-scale').trim(), gameRed: LUMO.reducedFx };
    return out;
  });
  check('Einstellungen wirken: großer Text, reduzierte Effekte (Herzschlag aus), Auto-Vorlesen, Modus Profi', st.big && st.red && st.heart === false && st.mode === 'profi' && st.auto && st.scale === '1.25' && st.gameRed, JSON.stringify(st));
  await page.evaluate(() => LUMO.ui.journal.open('einstellungen'));
  await frames(page, 3);
  await shot(page, '85_einstellungen_grosstext');
  await page.evaluate(() => LUMO.ui.journal.close());
  const auto = await page.evaluate(async () => { window.__spoken.length = 0; const p = LUMO.ui.say({ who: 'ilda', text: 'Moien. Willkommen an Bord.', wait: false, seconds: 0.4 }); await p; return window.__spoken.map((s) => s.text); });
  check('Auto-Vorlesen liest die Blase sofort', auto.length === 1 && auto[0].startsWith('Moien'), JSON.stringify(auto));
  await page.evaluate(() => { const S = LUMO.ui.settings; S.set('bigText', false); S.set('reducedFx', false); S.set('autoRead', false); S.set('mode', 'abenteuer'); });
  // Einstellungen überleben Speichern/Laden
  const persist = await page.evaluate(() => { LUMO.ui.settings.set('bigText', true); LUMO.save.save(); LUMO.ui.settings.set('bigText', false); LUMO.save.load(LUMO.save.current); return { big: document.documentElement.classList.contains('big-text'), st: LUMO.state.get('settings.bigText') }; });
  check('Einstellungen im Spielstand, nach Laden wieder angewendet', persist.big && persist.st === true, JSON.stringify(persist));
  await page.evaluate(() => LUMO.ui.settings.set('bigText', false));

  // ---- Recap ----
  await page.evaluate(() => { window.__recap = LUMO.ui.demo.recap(); });
  await sleep(700);
  await frames(page, 3);
  const rc = await page.evaluate(() => ({ cards: document.querySelectorAll('[data-overlay="recap"] .recap-card.is-in').length, x: !!document.querySelector('[data-overlay="recap"] .ov-close'), paused: LUMO.paused }));
  check('Recap: drei Bildkarten, X, pausiert', rc.cards === 3 && rc.x && rc.paused, JSON.stringify(rc));
  await shot(page, '86_recap');
  await page.click('[data-recap-go]');
  const rr = await page.evaluate(async () => ({ ...(await window.__recap), paused: LUMO.paused }));
  check('Recap: „Los“ beendet ohne Überspringen', rr.skipped === false && !rr.paused, JSON.stringify(rr));

  // ---- Lagerfeuer ----
  await page.evaluate(() => { window.__cf = LUMO.ui.demo.campfire(); });
  await sleep(400);
  await frames(page, 3);
  const cf1 = await page.evaluate(() => ({ line: document.querySelector('[data-overlay="campfire"] .cf-line b').textContent, x: !!document.querySelector('[data-overlay="campfire"] .ov-close'), fire: !!document.querySelector('.cf-fire') }));
  check('Lagerfeuer: erste Figur spricht, X vorhanden', cf1.line === 'Jolie' && cf1.x && cf1.fire, JSON.stringify(cf1));
  await shot(page, '87_lagerfeuer');
  await page.click('[data-cf-next]'); await sleep(350);
  await page.click('[data-cf-next]'); await sleep(450);
  await frames(page, 2);
  const cf2 = await page.evaluate(() => document.querySelectorAll('[data-moment]').length);
  check('Lagerfeuer: „Bester Moment heute?“ mit drei Bildern', cf2 === 3, String(cf2));
  await shot(page, '88_bester_moment');
  await page.click('[data-moment="steg"]');
  await sleep(1600);
  await frames(page, 2);
  const cf3 = await page.evaluate(() => ({ end: !!document.querySelector('[data-cf-end]'), cliff: (document.querySelector('.cf-cliff p') || {}).textContent, glas: LUMO.state.get('baumhaus.glas', []).length, leak: LUMO.save.exportCode().includes('steg') }));
  check('Lagerfeuer: Glühwürmchen im Glas (nur lokal, nicht im Export), Cliffhanger, Bis morgen', cf3.end && cf3.cliff && cf3.glas === 1 && !cf3.leak, JSON.stringify(cf3));
  await shot(page, '89_cliffhanger');
  await page.click('[data-cf-end]');
  const cfr = await page.evaluate(async () => ({ ...(await window.__cf), paused: LUMO.paused }));
  check('Lagerfeuer endet mit gewähltem Moment', cfr.moment === 'steg' && cfr.closed === false && !cfr.paused, JSON.stringify(cfr));

  // ---- Sicherheits-Linter: jedes geöffnete Overlay hat ein X ----
  const lint = await page.evaluate(async () => {
    const out = [];
    const probe = (id) => { const el = document.querySelector(`[data-overlay="${id}"]`); out.push({ id, x: !!(el && el.querySelector('.ov-close')) }); };
    LUMO.ui.pauseMenu.open(); probe('pause'); LUMO.ui.overlay.closeAll();
    LUMO.ui.journal.open(); probe('tagebuch'); LUMO.ui.overlay.closeAll();
    const c = LUMO.ui.overlay.confirm({ title: 'Wirklich?', text: 'Test' }); probe('confirm'); LUMO.ui.overlay.close('confirm'); const cr = await c;
    out.push({ id: 'confirm-x=nein', x: cr === false });
    return { out, count: LUMO.ui.overlay.count, paused: LUMO.paused };
  });
  check('Jedes Overlay hat Pause/X, X heißt Nein', lint.out.every((o) => o.x) && lint.count === 0 && !lint.paused, JSON.stringify(lint));

  // ---- Musik: Pegel offline, Klangmuschel exakt, Klarklang, Jukebox, Leitmotiv ----
  const au = await page.evaluate(async () => {
    const A = LUMO.plugins.audio;
    const out = {};
    out.hafen = await A.renderOffline(5, { region: 'hafen', veil: 0 });
    out.vulkan = await A.renderOffline(5, { region: 'vulkan', veil: 0, puls: 95, motifAt: { t: 1.5, id: 'wut' }, sfxAt: { t: 2.5, name: 'thunder' } });
    out.wechsel = await A.renderOffline(5, { region: 'klippen', veil: 1, veilAt: { t: 1.5, veil: 0 } });
    const m = LUMO.music;
    const k = m.klangmuschel(2.5);
    out.muschel = k ? +(k.end - k.start).toFixed(3) : null;
    out.konsonant = m.klarklang('konsonant').consonant; out.dissonant = m.klarklang('dissonant').consonant;
    out.motif = !!m.motif('freude');
    m.jukebox.play('runter'); LUMO.debug.advance(0.2); out.juke = m.state.theme; m.jukebox.stop(); LUMO.debug.advance(0.2); out.back = m.state.theme;
    out.grey = m.layerMix(1).filter((v) => v > 0.01).length; out.free = m.layerMix(0).filter((v) => v > 0.99).length;
    return out;
  });
  for (const k of ['hafen', 'vulkan', 'wechsel']) check(`Musik offline ${k}: Spitze ≤ −6 dBFS, Sprung ≤ 12 dB/100 ms`, au[k].peakDb <= -6 && au[k].maxJumpDb <= 12, `peak ${au[k].peakDb} dB · Sprung ${au[k].maxJumpDb} dB bei ${au[k].jumpAt}s · RMS ${au[k].rmsDb} dB`);
  check('Klangmuschel endet exakt nach 2,5 s', au.muschel === 2.5, String(au.muschel));
  check('Klarklang: konsonant trägt, dissonant klingt schief', au.konsonant === true && au.dissonant === false);
  check('Jukebox-Loop ersetzt das Thema und kehrt zurück; grau 1 Schicht, frei 4', au.motif && au.juke === 'jukebox-runter' && au.back === 'hafen' && au.grey === 1 && au.free === 4, JSON.stringify([au.juke, au.back, au.grey, au.free]));
  await page.evaluate(() => { LUMO.debug.teleport('klippen'); LUMO.debug.advance(0.6); });
  const theme = await page.evaluate(() => LUMO.music.state.theme);
  check('Zonenwechsel wechselt das Thema (Klippen)', theme === 'klippen', theme);

  check('Keine Seitenfehler (quer)', errors.length === 0, errors.slice(0, 5).join('\n'));
  await context.close();

  // ---- Hochformat ----
  const P = await openGame(browser, { viewport: IPAD_PORTRAIT, query: `q=${Q}&skipintro&autostart` });
  await startGame(P.page);
  await P.page.evaluate(() => { LUMO.ui.say({ who: 'tun', text: 'Ey, neu hier? Ich film das.' }); LUMO.ui.ask({ items: [{ id: 'a', label: 'Lass das.', icon: 'stopp' }, { id: 'b', label: 'Haha, okay.', icon: 'sonne' }, { id: 'c', label: 'Warum?', icon: 'frage' }] }); });
  await frames(P.page, 3);
  const po = await P.page.evaluate(() => { const b = document.querySelector('.bubble').getBoundingClientRect(), c = document.querySelector('.choices').getBoundingClientRect(), j = document.querySelector('.hud-btn-jump').getBoundingClientRect(); return { bubbleIn: b.left >= 0 && b.right <= innerWidth, choicesAbove: c.bottom <= b.top + 2, noOverlapJump: b.bottom <= j.top || b.right <= j.left, scroll: document.documentElement.scrollWidth <= innerWidth }; });
  check('Hochformat: Blase und Kacheln im Bild, keine Überlappung mit den Knöpfen', po.bubbleIn && po.choicesAbove && po.noOverlapJump && po.scroll, JSON.stringify(po));
  await shot(P.page, '90_hoch_dialog');
  await P.page.evaluate(() => { LUMO.events.emit('dialogue:choose', { index: 0 }); LUMO.ui.bubbles.clear(); LUMO.ui.journal.open('auftraege'); });
  await frames(P.page, 3);
  const pj = await P.page.evaluate(() => { const rail = document.querySelector('.jn-rail').getBoundingClientRect(), pg = document.querySelector('.jn-page').getBoundingClientRect(); return { railTop: rail.bottom <= pg.top + 1, fits: document.querySelector('.ov-card').getBoundingClientRect().right <= innerWidth + 1, scroll: document.documentElement.scrollWidth <= innerWidth }; });
  check('Hochformat: Tagebuch-Leiste oben, kein Überlauf', pj.railTop && pj.fits && pj.scroll, JSON.stringify(pj));
  await shot(P.page, '91_hoch_tagebuch');
  await P.page.evaluate(() => { LUMO.ui.journal.close(); LUMO.ui.demo.campfire(); });
  await sleep(400); await frames(P.page, 3);
  await shot(P.page, '92_hoch_lagerfeuer');
  check('Keine Seitenfehler (hoch)', P.errors.length === 0, P.errors.slice(0, 5).join('\n'));
  await P.context.close();
} catch (e) {
  console.error(e);
  failed = true;
} finally {
  await browser.close();
}
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} Prüfungen ok`);
process.exit(failed ? 1 : 0);

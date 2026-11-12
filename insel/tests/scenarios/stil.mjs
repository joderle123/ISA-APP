// Szenario WP41 (Browser): Stil-Studio öffnen (Overlay mit X), Drehteller-Vorschau rendert, Register wechseln,
// Optionen antippen (Hautton, Frisur, Kleidung, Muster, Statur), Fertig → state.avatar und Spielfigur; Zufall;
// Spielname neu würfeln; Kosmetik: Einheit abschließen → Toast/Ereignis, Maske anlegen erscheint sofort an der Figur;
// Hochformat ohne Überlauf; Tagebuch-Seite „Stil“; erster Start öffnet das Studio (ohne ?test).
// Aufruf: node tests/scenarios/stil.mjs   (SHOTS=Ordner, Q=low|medium|high)
import { launch, openGame, startGame, frames, shot, IPAD_LANDSCAPE, IPAD_PORTRAIT } from '../lib.mjs';

const Q = process.env.Q || 'low';
let failed = false;
function check(name, ok, info = '') { console.log(ok ? '✔' : '✘', name, info); if (!ok) failed = true; }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await launch();
try {
  const { page, context, errors } = await openGame(browser, { viewport: IPAD_LANDSCAPE, query: `q=${Q}&skipintro&autostart` });
  await startGame(page);

  const api = await page.evaluate(() => ({ plugins: LUMO.plugins.list, failed: LUMO.plugins.failed, stil: !!(LUMO.ui.stil && LUMO.ui.stil.open), cosmetics: !!LUMO.plugins.cosmetics, avatar: !!LUMO.avatar, items: LUMO.plugins.cosmetics.items.length, owned: LUMO.plugins.cosmetics.owned().length }));
  check('Plugins cosmetics + stil installiert', api.plugins.includes('cosmetics') && api.plugins.includes('stil') && api.failed.length === 0, JSON.stringify(api.failed));
  check('Kosmetik-Inventar geladen, Start-Emotes gehören dazu', api.items >= 30 && api.owned >= 4, `${api.owned} von ${api.items}`);

  // ---- Studio öffnen ----
  await page.evaluate(() => LUMO.ui.stil.open());
  await sleep(500);
  await frames(page, 4);
  const o1 = await page.evaluate(() => {
    const ov = document.querySelector('[data-overlay="stil-studio"]');
    const cv = ov && ov.querySelector('canvas');
    return { ov: !!ov, x: !!(ov && ov.querySelector('.ov-close')), canvas: !!cv, cw: cv && cv.width, ch: cv && cv.height, tabs: ov ? ov.querySelectorAll('.st-tab').length : 0, paused: LUMO.paused, handle: ov && ov.querySelector('.st-handle b').textContent, preview: !!(LUMO.ui.stil.studio.preview && LUMO.ui.stil.studio.preview.humanoid) };
  });
  check('Studio-Overlay mit X, 7 Registern, Vorschau-Canvas, Spiel pausiert', o1.ov && o1.x && o1.canvas && o1.tabs === 7 && o1.paused && o1.preview, JSON.stringify(o1));
  check('Spielname wird gezeigt (erzeugt, nie getippt)', /^[A-Za-zäöü]+ \d+$/.test(o1.handle || ''), o1.handle);
  await shot(page, '90_stil_koerper');

  // Touch-Ziele ≥ 64 px (Optionen, Farbfelder ≥ 56, Register)
  const small = await page.evaluate(() => [...document.querySelectorAll('[data-overlay="stil-studio"] .st-opt, [data-overlay="stil-studio"] .st-tab')].filter((b) => { const r = b.getBoundingClientRect(); return r.height < 63 || r.width < 63; }).length);
  check('Optionen und Register sind ≥ 64 px', small === 0, `${small} zu klein`);

  // Hautton wählen, Statur schieben
  const skin = await page.evaluate(() => { const b = document.querySelectorAll('[data-overlay="stil-studio"] [data-key="skin"]')[12]; b.click(); return b.dataset.val; });
  await page.evaluate(() => { const r = document.querySelector('[data-overlay="stil-studio"] input[data-key="build"]'); r.value = '0.9'; r.dispatchEvent(new Event('input', { bubbles: true })); });
  let d = await page.evaluate(() => LUMO.ui.stil.draft);
  check('Hautton und Statur im Entwurf', d.skin === skin && d.build === 0.9, `${d.skin} ${d.build}`);

  // Register Haare: Locs + Farbe; Kleidung: Jacke + Rock + Boots; Muster: Camo
  await page.evaluate(() => document.querySelector('[data-overlay="stil-studio"] [data-tab="haare"]').click());
  await page.evaluate(() => document.querySelector('[data-overlay="stil-studio"] [data-key="hairStyle"][data-val="locs"]').click());
  await page.evaluate(() => document.querySelectorAll('[data-overlay="stil-studio"] [data-key="hair"]')[9].click());
  await frames(page, 3);
  await shot(page, '91_stil_haare');
  await page.evaluate(() => document.querySelector('[data-overlay="stil-studio"] [data-tab="kleidung"]').click());
  await page.evaluate(() => { const q = (s) => document.querySelector('[data-overlay="stil-studio"] ' + s).click(); q('[data-key="topStyle"][data-val="jacke"]'); q('[data-key="bottomsStyle"][data-val="rock"]'); q('[data-key="shoesStyle"][data-val="boots"]'); q('[data-key="head"][data-val="bandana"]'); });
  await page.evaluate(() => document.querySelectorAll('[data-overlay="stil-studio"] [data-key="top"]')[4].click());
  await page.evaluate(() => document.querySelector('[data-overlay="stil-studio"] [data-tab="muster"]').click());
  await page.evaluate(() => document.querySelector('[data-overlay="stil-studio"] [data-key="pattern"][data-val="camo"]').click());
  await page.evaluate(() => document.querySelector('[data-overlay="stil-studio"] [data-tab="hilfsmittel"]').click());
  await page.evaluate(() => { const q = (s) => document.querySelector('[data-overlay="stil-studio"] ' + s).click(); q('[data-key="glasses"][data-val="eckig"]'); q('[data-key="prosthesis"][data-val="rechts"]'); });
  await frames(page, 3);
  await shot(page, '92_stil_hilfsmittel');
  d = await page.evaluate(() => LUMO.ui.stil.draft);
  check('Entwurf: Locs, Jacke, Rock, Boots, Bandana, Camo, eckige Brille, Prothese rechts', d.hairStyle === 'locs' && d.topStyle === 'jacke' && d.bottomsStyle === 'rock' && d.shoesStyle === 'boots' && d.head === 'bandana' && d.pattern === 'camo' && d.glasses === 'eckig' && d.prosthesis === 'rechts', JSON.stringify(d));
  const pv = await page.evaluate(() => { const h = LUMO.ui.stil.studio.preview.humanoid; return { hair: h.config.hairStyle, pro: h.config.prosthesis, meshes: Object.keys(h.meshes).length }; });
  check('Vorschau-Figur folgt dem Entwurf', pv.hair === 'locs' && pv.pro === 'rechts', JSON.stringify(pv));

  // Emote vorführen (Start-Emote winken), Spielname neu würfeln
  await page.evaluate(() => document.querySelector('[data-overlay="stil-studio"] [data-emote="winken"]').click());
  const em = await page.evaluate(() => LUMO.ui.stil.studio.preview.humanoid.emote);
  check('Emote-Knopf spielt das Emote in der Vorschau', em === 'winken', String(em));
  const h0 = await page.evaluate(() => LUMO.avatar.handle);
  await page.evaluate(() => document.querySelector('[data-overlay="stil-studio"] [data-reroll]').click());
  const h1 = await page.evaluate(() => ({ handle: LUMO.avatar.handle, shown: document.querySelector('[data-overlay="stil-studio"] .st-handle b').textContent }));
  check('Neuer Spielname wird erzeugt und angezeigt', h1.handle !== h0 && h1.shown === h1.handle, `${h0} → ${h1.handle}`);

  // Fertig: Avatar gespeichert und an der Spielfigur
  await page.evaluate(() => document.querySelector('[data-overlay="stil-studio"] [data-done]').click());
  await sleep(300);
  const saved = await page.evaluate(() => ({ closed: !document.querySelector('[data-overlay="stil-studio"]'), avatar: LUMO.state.get('avatar'), player: LUMO.player.humanoid.config, paused: LUMO.paused, look: JSON.parse(localStorage.getItem('lumo.settings') || '{}').look }));
  check('Fertig schließt, speichert state.avatar und baut die Spielfigur um', saved.closed && saved.avatar && saved.avatar.hairStyle === 'locs' && saved.player.hairStyle === 'locs' && saved.player.prosthesis === 'rechts' && !saved.paused, JSON.stringify({ a: saved.avatar && saved.avatar.hairStyle, p: saved.player.hairStyle }));
  check('Gerätekopie des Looks für den nächsten Start', saved.look && saved.look.hairStyle === 'locs');
  await page.evaluate(() => { const r = LUMO.cameraRig; r.targetDist = 3.4; r.pitch = 0.1; r.lookOffsetY = 1.2; r.yaw = LUMO.player.yaw + Math.PI + 0.4; LUMO.debug.advance(0.8); r.snap(); });
  await frames(page, 3);
  await shot(page, '93_stil_spielfigur');

  // ---- Kosmetik: Einheit e24 abschließen → Masken frei, Toast, Ereignis; Maske anlegen → sofort an der Figur ----
  const unlock = await page.evaluate(async () => {
    const got = [];
    LUMO.events.on('cosmetic:unlock', (e) => got.push(e.id));
    LUMO.debug.completeUnit('j1-e24');
    await new Promise((r) => setTimeout(r, 50));
    return { got, toast: document.querySelector('.toasts') && document.querySelector('.toasts').textContent, ownedMasks: LUMO.plugins.cosmetics.owned('maske').length };
  });
  check('Einheit fertig → 5 Masken frei, Ereignis cosmetic:unlock, Toast', unlock.got.filter((id) => id.startsWith('maske-')).length === 5 && unlock.ownedMasks === 5 && /Stil-Studio/.test(unlock.toast || ''), JSON.stringify(unlock));
  await page.evaluate(() => LUMO.ui.stil.open({ tab: 'extras' }));
  await sleep(400);
  await frames(page, 3);
  await page.evaluate(() => document.querySelector('[data-overlay="stil-studio"] [data-item="maske-fuchs"]').click());
  await frames(page, 3);
  await shot(page, '94_stil_extras_maske');
  const worn = await page.evaluate(() => ({ eq: LUMO.plugins.cosmetics.equipped.maske, player: LUMO.player.humanoid.config.mask, preview: LUMO.ui.stil.studio.preview.humanoid.config.mask, lockedHint: document.querySelector('[data-overlay="stil-studio"] [data-item="jacke-crew"] small').textContent }));
  check('Maske anlegen: sofort an Spielfigur und Vorschau', worn.eq === 'maske-fuchs' && worn.player === 'fuchs' && worn.preview === 'fuchs', JSON.stringify(worn));
  check('Gesperrte Kosmetik zeigt, woher sie kommt', /Leuchtfeuer|Aus:/.test(worn.lockedHint), worn.lockedHint);
  const locked = await page.evaluate(() => { document.querySelector('[data-overlay="stil-studio"] [data-item="jacke-crew"]').click(); return LUMO.plugins.cosmetics.equipped.jacke || null; });
  check('Gesperrtes lässt sich nicht anlegen', locked === null);
  // Zufall verändert Haare/Kleidung, behält Hautton und Hilfsmittel
  const before = await page.evaluate(() => LUMO.ui.stil.draft);
  await page.evaluate(() => document.querySelector('[data-overlay="stil-studio"] [data-random]').click());
  const after = await page.evaluate(() => LUMO.ui.stil.draft);
  check('Zufall behält Hautton, Brille und Prothese', after.skin === before.skin && after.glasses === before.glasses && after.prosthesis === before.prosthesis);
  await page.evaluate(() => LUMO.ui.stil.close());
  await sleep(300);

  // ---- Tagebuch-Seite Stil ----
  await page.evaluate(() => LUMO.ui.journal.open('stil'));
  await frames(page, 3);
  const jn = await page.evaluate(() => { const p = document.querySelector('.jn-page'); return { page: p && p.dataset.pageId, btn: !!(p && p.querySelector('[data-open-stil]')), text: p && p.textContent }; });
  check('Tagebuch-Seite „Stil“ mit Spielname und Studio-Knopf', jn.page === 'stil' && jn.btn && /Extras/.test(jn.text || ''));
  await shot(page, '95_stil_tagebuch');
  await page.evaluate(() => document.querySelector('.jn-page [data-open-stil]').click());
  await sleep(500);
  check('Tagebuch-Knopf öffnet das Studio', await page.evaluate(() => LUMO.ui.stil.isOpen));
  await page.evaluate(() => LUMO.ui.stil.close());
  await sleep(300);
  check('Keine Seitenfehler (Querformat)', errors.length === 0, errors.slice(0, 3).join('\n'));
  await context.close();

  // ---- Hochformat + erster Start (ohne ?test: Studio öffnet sich von selbst) ----
  const P = await openGame(browser, { viewport: IPAD_PORTRAIT, query: `q=${Q}&skipintro&autostart&stil`, file: undefined });
  await startGame(P.page);
  await P.page.waitForFunction(() => LUMO.ui.stil && LUMO.ui.stil.isOpen, null, { timeout: 20000 });
  await sleep(400);
  await frames(P.page, 4);
  const port = await P.page.evaluate(() => { const ov = document.querySelector('[data-overlay="stil-studio"]'); const card = ov.querySelector('.ov-card'); const r = card.getBoundingClientRect(); const foot = ov.querySelector('.st-foot').getBoundingClientRect(); return { w: r.width, h: r.height, footInside: foot.bottom <= r.bottom + 1 && foot.top > 0, title: ov.querySelector('.ov-title').textContent, x: !!ov.querySelector('.ov-close'), first: document.documentElement.scrollWidth <= window.innerWidth + 1 }; });
  check('Hochformat: Studio passt, Fertig-Leiste sichtbar, Titel „Das bist du“, X vorhanden', port.footInside && port.x && port.title === 'Das bist du' && port.first, JSON.stringify(port));
  await shot(P.page, '96_stil_hochformat');
  await P.page.evaluate(() => document.querySelector('[data-overlay="stil-studio"] .ov-close').click());
  await sleep(300);
  const firstSaved = await P.page.evaluate(() => ({ set: LUMO.avatar.isSet, open: LUMO.ui.stil.isOpen }));
  check('X beim ersten Start legt den Avatar fest (kein zweites Nachfragen)', firstSaved.set && !firstSaved.open);
  check('Keine Seitenfehler (Hochformat)', P.errors.length === 0, P.errors.slice(0, 3).join('\n'));
  await P.context.close();
} catch (e) {
  console.error(e);
  failed = true;
} finally {
  await browser.close();
}
console.log(failed ? '\n✘ stil' : '\n✔ stil');
process.exit(failed ? 1 : 0);

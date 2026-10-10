/* Test: Thema „Kommunikation & Grenzen“ – die sieben neuen Spiele (uebersetzer, stillepost, zuhoerfalle, okayradar,
   naeher-nicht, stoppcheck, familienfunk).
   1) Inhalte: Pflichtfelder, keine fremden Vornamen (nur Mika, Yara, Luca, Sam), die beste Antwort ist nicht immer die
      längste, Grenzen-Spiele bleiben bei Figuren und Skalen, Familien in verschiedenen Formen, keine gilt als „normal“.
   2) Spielen im Auto-Modus auf iPad quer, iPad hoch und Handy: Startbild (Darum geht’s, Level-Leiste, Pass, X),
      ein Bild mittendrin, Level-Wechsel, Nachbesprechung (3 Fragen, Pass), Ende mit Sticker (und Hilfenummern, wo nötig).
      Auf jedem dieser Bilder: kein horizontales Scrollen, keine zu kleinen oder abgeschnittenen Knöpfe.
   3) Registrierung: nicht mehr „bald“ im Hub, Finder zeigt für j1-e20 … j1-e23 das gebaute Spiel, Deep-Link startet.
   Aufruf:  node crew/build.js && node crew/tests/kommunikation.mjs
   Bilder:  crew/.shots/kommunikation/<viewport>-<spiel>-<bild>.png */
import { createRequire } from 'module';
import path from 'path';
import { DIST, SHOTS, VIEWPORTS, layoutCheck } from './lib.mjs';

const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }

const IDS = ['uebersetzer', 'stillepost', 'zuhoerfalle', 'okayradar', 'naeher-nicht', 'stoppcheck', 'familienfunk'];
const ONLY = process.env.CREW_GAMES ? process.env.CREW_GAMES.split(',').map((s) => s.trim()).filter(Boolean) : IDS;
const HELP = ['okayradar', 'stoppcheck', 'familienfunk'];
// Ein typisches Bild mittendrin pro Spiel
const MITTE = {
  uebersetzer: '.ue-halves', stillepost: '.sl-vergleich', zuhoerfalle: '.zf-erzaehl', okayradar: '.okr-figs',
  'naeher-nicht': '.nn-gang', stoppcheck: '.stc-bild', familienfunk: '.ff-meters',
};
const MITTE2 = {
  uebersetzer: '.ue-test', stillepost: '.sl-runden', zuhoerfalle: '.zf-satz.big', okayradar: '.okr-signale',
  'naeher-nicht': '.nn-skala', stoppcheck: '.stc-bau', familienfunk: '.ff-ende',
};
const OUT = path.join(SHOTS, 'kommunikation');
const problems = [];
const expect = (c, m) => { if (!c) problems.push(m); };

async function launch(viewport) {
  const browser = await pw.chromium.launch();
  const context = await browser.newContext({ viewport, hasTouch: true, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.addInitScript(() => {
    const _st = window.setTimeout;
    window.__fast = true;
    window.setTimeout = (fn, ms, ...a) => _st(fn, Math.min(ms || 0, 250), ...a);
  });
  await page.goto('file://' + DIST);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.evaluate(() => window.CREW.debug.found('Test Crew', 'arena'));
  await page.waitForTimeout(150);
  return { browser, page, errors };
}

/* ---------- 1) Inhalte ---------- */
{
  const { browser, page, errors } = await launch(VIEWPORTS.ipadLandscape);
  const data = await page.evaluate((ids) => {
    const G = window.CREW.games;
    const out = {};
    ids.forEach((id) => { const g = G.get(id); out[id] = g ? JSON.parse(JSON.stringify(g, (k, v) => (typeof v === 'function' ? undefined : v))) : null; });
    out.__did = window.CREW.didaktik.games;
    return out;
  }, IDS);
  const FREMDE_NAMEN = /\b(Paul|Lena|Noa|Noah|Jonas|Emma|Mia|Ben|Ali|Tom|Lea|Samir|Nora|Milan|Jeff|Jules|Mateo|Noé|Leon|Finn|Lina|Max|Tim|Anna)\b/;
  IDS.forEach((id) => {
    const g = data[id];
    expect(!!g, id + ': nicht registriert');
    if (!g) return;
    expect(!!data.__did[id], id + ': Didaktik-Eintrag fehlt');
    const txt = JSON.stringify(g);
    expect(!FREMDE_NAMEN.test(txt), id + ': fremder Vorname im Inhalt: ' + (txt.match(FREMDE_NAMEN) || [''])[0]);
    expect(!/\bnormal\b/i.test(txt) || id === 'stillepost', id + ': das Wort „normal“ im Inhalt prüfen');
    expect(/^T[0-6]$/.test(g.template), id + ': Vorlage fehlt');
  });
  // „Die beste Antwort ist nicht immer die längste“ (Befund P1): höchstens 60 % der Fälle
  const nichtImmerLaengste = (tag, faelle) => {
    const n = faelle.length;
    const laengste = faelle.filter(([best, alle]) => alle.every((t) => t.length <= best.length)).length;
    expect(n > 0 && laengste / n <= 0.6, tag + ': beste Antwort ist in ' + laengste + ' von ' + n + ' Fällen die längste');
  };
  const ue = data.uebersetzer;
  if (ue) {
    ue.nachrichten.forEach((n) => {
      ['offen', 'annahme', 'konter', 'still'].forEach((k) => expect(n.rueck[k] && n.rueck[k].t && n.rueck[k].a, 'uebersetzer ' + n.id + ': Rückfrage ' + k + ' unvollständig'));
      expect(['nett', 'ironisch', 'sauer', 'egal'].includes(n.gemeint), 'uebersetzer ' + n.id + ': gemeint unbekannt');
      expect(['mika', 'yara', 'luca', 'sam'].includes(n.von) && ['mika', 'yara', 'luca', 'sam'].includes(n.an) && n.von !== n.an, 'uebersetzer ' + n.id + ': Figuren');
    });
    expect(ue.nachrichten.filter((n) => n.stufe === 1).length >= 3 && ue.nachrichten.filter((n) => n.stufe === 2).length >= 3, 'uebersetzer: zu wenige Nachrichten je Level');
    const gem = new Set(ue.nachrichten.map((n) => n.gemeint));
    expect(gem.size === 4, 'uebersetzer: nicht alle vier Lesarten kommen als „gemeint“ vor');
    nichtImmerLaengste('uebersetzer (offen)', ue.nachrichten.map((n) => [n.rueck.offen.t, ['annahme', 'konter', 'still'].map((k) => n.rueck[k].t)]));
    ue.senden.forEach((s) => {
      const klar = s.versionen.filter((v) => Object.values(v.lesen).every((x) => x === s.ziel));
      expect(klar.length === 1, 'uebersetzer senden ' + s.id + ': genau eine Version muss bei allen so ankommen, wie gemeint');
      expect(s.versionen.some((v) => new Set(Object.values(v.lesen)).size > 1), 'uebersetzer senden ' + s.id + ': keine Version mit gemischten Lesarten');
    });
  }
  const sp = data.stillepost;
  if (sp) {
    sp.kombi.forEach((k) => expect(sp.bitten[k.bitte], 'stillepost: Kombi mit unbekannter Bitte ' + k.bitte));
    expect(Object.keys(sp.bitten).length >= 6, 'stillepost: zu wenige Bitten für fünf Auswahl-Knöpfe');
  }
  const zf = data.zuhoerfalle;
  if (zf) {
    zf.geschichten.forEach((g) => {
      const need = g.stufe === 1 ? ['treffer', 'sachlich', 'ratschlag', 'ichauch'] : ['treffer', 'sachlich', 'ratschlag', 'ichauch', 'kleinreden'];
      expect(need.every((k) => g.antworten[k]) && Object.keys(g.antworten).length === need.length, 'zuhoerfalle ' + g.id + ': Antworten');
      if (g.stufe === 2) {
        expect(g.gefuehle.includes(g.gefuehl) && g.gefuehle.includes(g.oberflaeche), 'zuhoerfalle ' + g.id + ': Gefühl/Oberfläche fehlen in der Auswahl');
        expect(g.satz && g.satz.gefuehle.includes(g.gefuehl) && g.satz.inhalte.filter((x) => x.ok).length === 1, 'zuhoerfalle ' + g.id + ': Satz-Bausteine');
      }
    });
    expect(zf.geschichten.filter((g) => g.stufe === 2).length >= 2, 'zuhoerfalle: Level 2 und 3 brauchen zwei Geschichten');
    nichtImmerLaengste('zuhoerfalle (treffer)', zf.geschichten.map((g) => [g.antworten.treffer, Object.keys(g.antworten).filter((k) => k !== 'treffer').map((k) => g.antworten[k])]));
  }
  const ok = data.okayradar;
  if (ok) {
    ok.szenen.forEach((s) => {
      const vals = Object.values(s.figs).map((x) => x[0]);
      expect(Object.keys(s.figs).length === 4 && new Set(vals).size >= 2, 'okayradar ' + s.id + ': Figuren-Radar braucht vier Figuren und mindestens zwei Einstellungen');
    });
    ['koerper', 'gefuehl', 'digital'].forEach((a) => expect(ok.szenen.filter((s) => s.art === a).length >= 2, 'okayradar: zu wenige Szenen „' + a + '“'));
    ok.fragen.forEach((f) => expect(f.wie.echt && f.reakt.annehmen && f.nein, 'okayradar fragen ' + f.id + ': echt/annehmen/nein fehlt'));
    nichtImmerLaengste('okayradar (Nein annehmen)', ok.fragen.map((f) => [f.reakt.annehmen.t, Object.keys(f.reakt).filter((k) => k !== 'annehmen').map((k) => f.reakt[k].t)]));
    // Altersgerecht: keine Kuss-/Intim-Szenen
    expect(!/küss|kuss|intim|nackt|sex/i.test(JSON.stringify(ok)), 'okayradar: Szene nicht altersgerecht');
  }
  const nn = data['naeher-nicht'];
  if (nn) {
    nn.personen.forEach((p) => {
      const v = Object.values(p.figs);
      expect(v.every((x) => x >= 1 && x <= 5) && new Set(v).size >= 2, 'naeher-nicht ' + p.id + ': Figuren-Marken 1–5, mindestens zwei verschiedene');
      expect(typeof p.fig !== 'string' || !p.figs[p.fig], 'naeher-nicht ' + p.id + ': die kommende Figur steht nicht selbst auf der Skala');
    });
    expect(nn.personen.filter((p) => p.stufe === 1).length === 2 && nn.personen.filter((p) => p.stufe === 2).length >= 2, 'naeher-nicht: Personen je Level');
    expect(!/berühr|anfass|umarmt euch|fasst/i.test(JSON.stringify(nn.personen.map((p) => p.rolle + p.ort))), 'naeher-nicht: Berührungsaufgabe zwischen Jugendlichen');
  }
  const sc = data.stoppcheck;
  if (sc) {
    const teile = Object.fromEntries(sc.teile.map((t) => [t.id, t]));
    expect(sc.teile.map((t) => t.id).join() === 'haltung,blick,hand,stimme,worte', 'stoppcheck: fünf Bausteine Haltung, Blick, Hand, Stimme, Worte');
    sc.fehlerL1.forEach((f) => expect(Object.keys(f).length === 1 && Object.entries(f).every(([k, i]) => teile[k] && teile[k].falsch[i]), 'stoppcheck: Level-1-Fehler ungültig ' + JSON.stringify(f)));
    sc.fehlerL2.forEach((f) => expect(Object.keys(f).length === 2 && Object.entries(f).every(([k, i]) => teile[k] && teile[k].falsch[i]), 'stoppcheck: Level-2-Fehler ungültig ' + JSON.stringify(f)));
    // Die vier Fehler aus dem Katalog: lächelt, schaut weg, zu leise, redet zu viel
    const l1 = sc.fehlerL1.map((f) => Object.entries(f).map(([k, i]) => teile[k].falsch[i])[0]).join(' | ');
    ['lächelt', 'Boden', 'leise', 'Ähm'].forEach((w) => expect(l1.includes(w), 'stoppcheck: Katalog-Fehler „' + w + '“ fehlt in Level 1'));
    sc.szenen.forEach((s) => expect(s.zurueck && s.zoegert && s.weiter && s.nachhaken.length === 2 && s.fig !== s.an, 'stoppcheck ' + s.id + ': Szene unvollständig'));
  }
  const ff = data.familienfunk;
  if (ff) {
    expect(new Set(ff.familien.map((f) => f.wer)).size === ff.familien.length && ff.familien.length >= 4, 'familienfunk: mindestens vier verschiedene Familienformen');
    ff.familien.forEach((f) => {
      ['ich', 'ichohne', 'getarnt', 'vorwurf', 'tuer'].forEach((k) => expect(f.a[k] && f.a[k].t && f.a[k].r, 'familienfunk ' + f.id + ': Antwort a.' + k));
      ['kompromiss', 'schmollen', 'vorwurf', 'tuer'].forEach((k) => expect(f.b[k] && f.b[k].t && f.b[k].r, 'familienfunk ' + f.id + ': Antwort b.' + k));
      expect(f.deal && f.thema && f.lage, 'familienfunk ' + f.id + ': Deal/Thema/Lage');
      expect(40 + ff.art.tuer.hz >= ff.knall, 'familienfunk: Türknall muss knallen');
    });
    Object.values(ff.opts).forEach((o) => expect(o.a.includes('ich') && o.b.includes('kompromiss'), 'familienfunk: beste Antwort fehlt in einem Level'));
    nichtImmerLaengste('familienfunk (Klartext/Gegenvorschlag)', ff.familien.flatMap((f) => [[f.a.ich.t, ['ichohne', 'getarnt', 'vorwurf'].map((k) => f.a[k].t)], [f.b.kompromiss.t, ['schmollen', 'vorwurf'].map((k) => f.b[k].t)]]));
  }
  errors.forEach((e) => problems.push('inhalt: ' + e));
  await browser.close();
}

/* ---------- 2) Spielen + Bilder auf drei Größen ---------- */
async function playWithShots(page, id, vp) {
  const tag = vp + '-' + id;
  const seen = { start: false, mitte: false, mitte2: false, level: false, nach: false, ende: false };
  const shot = async (name) => { await page.screenshot({ path: path.join(OUT, tag + '-' + name + '.png') }); problems.push(...await layoutCheck(page, tag + '-' + name)); };
  await page.evaluate(() => { window.__crewAutoDelay = 420; });
  await page.evaluate((gid) => window.CREW.debug.startGame(gid, { auto: true, autoEndWait: 1200 }), id);
  await page.locator('.game-screen[data-game="' + id + '"]').first().waitFor({ timeout: 5000 });
  const t0 = Date.now();
  for (;;) {
    const st = await page.evaluate(() => window.CREW.debug.gameStatus());
    if (st.done && st.done.id === id) { expect(st.done.ok, tag + ': Spiel endete mit Fehler ' + st.done.error); break; }
    if (!st.running && !(st.done && st.done.id === id)) { problems.push(tag + ': Spiel läuft nicht mehr'); break; }
    if (!seen.start && await page.locator('#btn-go').count()) {
      seen.start = true;
      expect(await page.locator('.game-screen .warum-card').count() === 1, tag + ': „Darum geht’s“ fehlt im Intro');
      expect(await page.locator('.game-screen .stufen').count() >= 1, tag + ': Level-Leiste fehlt im Intro');
      expect(await page.locator('.game-screen .skill-chip.karte').count() >= 1, tag + ': Skill-Karte fehlt im Intro');
      expect(await page.locator('#btn-pass:visible').count() === 1, tag + ': Pass fehlt im Intro');
      expect(await page.locator('#btn-x:visible').count() === 1, tag + ': X-Karte fehlt');
      await shot('1-start');
    }
    if (!seen.mitte && await page.locator(MITTE[id]).count()) { seen.mitte = true; await page.waitForTimeout(120); await shot('2-mitte'); }
    if (!seen.level && await page.locator('.level-screen').count()) { seen.level = true; await shot('3-level'); }
    if (!seen.mitte2 && await page.locator(MITTE2[id]).count()) { seen.mitte2 = true; await page.waitForTimeout(120); await shot('4-mitte'); }
    if (!seen.nach && await page.locator('.nach-screen').count()) {
      seen.nach = true;
      expect(await page.locator('.nach-screen .nach-q').count() === 3, tag + ': Nachbesprechung ohne drei Fragen');
      expect(await page.locator('#nach-pass').count() === 1, tag + ': Pass in der Nachbesprechung fehlt');
      await shot('5-nachbesprechung');
    }
    if (!seen.ende && await page.locator('#btn-done').count()) {
      seen.ende = true;
      expect(await page.locator('.game-screen .sticker.big').count() === 1, tag + ': Sticker fehlt am Ende');
      if (HELP.includes(id)) expect(await page.locator('.game-screen .help-card').count() >= 1, tag + ': Hilfenummern fehlen am Ende');
      await shot('6-ende');
    }
    // Pass auf jedem Spiel-Bildschirm (außer dem Endbild)
    const passOk = await page.evaluate(() => { const s = document.querySelector('.game-screen'); return !s || !!s.querySelector('#btn-done') || !!s.querySelector('#btn-pass'); });
    expect(passOk, tag + ': ein Bildschirm ohne Pass');
    await page.waitForTimeout(60);
    if (Date.now() - t0 > 150000) { problems.push(tag + ': Zeitüberschreitung'); break; }
  }
  Object.entries(seen).forEach(([k, v]) => expect(v, tag + ': Bild „' + k + '“ nie gesehen'));
  await page.evaluate(() => { window.__crewAutoDelay = 0; });
}

const fs = await import('fs');
fs.mkdirSync(OUT, { recursive: true });
for (const [vp, size] of [['ipad', VIEWPORTS.ipadLandscape], ['ipadhoch', VIEWPORTS.ipadPortrait], ['handy', VIEWPORTS.phone]]) {
  const { browser, page, errors } = await launch(size);
  for (const id of ONLY) {
    await playWithShots(page, id, vp);
    errors.splice(0).forEach((e) => problems.push(vp + '-' + id + ': ' + e));
    await page.locator('#btn-finder').waitFor({ timeout: 5000 }).catch(() => problems.push(vp + '-' + id + ': nach dem Spiel nicht im Spiele-Hub'));
  }
  // Sticker für jedes gespielte Spiel
  const st = await page.evaluate(() => window.CREW.state.stickers);
  ONLY.forEach((id) => expect(st[id] && st[id].n >= 1, vp + ': Sticker ' + id + ' fehlt'));
  await browser.close();
}

/* ---------- 3) Registrierung: Hub, Finder, Deep-Link ---------- */
{
  const { browser, page, errors } = await launch(VIEWPORTS.ipadLandscape);
  await page.evaluate(() => window.CREW.games.renderHub());
  await page.locator('.hub-theme[data-theme="kommunikation"]').waitFor();
  for (const id of IDS) expect(await page.locator('.hub-tile[data-game="' + id + '"]:not(.soon)').count() === 1, 'hub: ' + id + ' steht noch als „bald“');
  expect((await page.locator('.hub-theme[data-theme="kommunikation"] .muted.small').first().textContent()).trim() === '9/9', 'hub: Kommunikation & Grenzen nicht 9/9');
  await page.locator('#btn-finder').click();
  await page.locator('#finder-unit').waitFor();
  for (const [unit, id] of [['j1-e20', 'uebersetzer'], ['j1-e22', 'okayradar'], ['j1-e23', 'stoppcheck']]) {
    await page.selectOption('#finder-unit', unit);
    await page.waitForTimeout(120);
    expect((await page.locator('.unit-card').getAttribute('data-alt')) === '', 'finder ' + unit + ': zeigt Ersatz statt ' + id);
    expect((await page.locator('.game-row').first().getAttribute('data-game')) === id, 'finder ' + unit + ': ' + id + ' steht nicht oben');
    expect(await page.locator('#play-' + id + ':enabled').count() === 1, 'finder ' + unit + ': Spielen-Knopf für ' + id + ' fehlt');
  }
  await page.selectOption('#finder-unit', 'j1-e21');
  await page.waitForTimeout(120);
  for (const id of ['zuhoerfalle', 'familienfunk', 'funkstille', 'hitzeecken']) expect(await page.locator('.game-row[data-game="' + id + '"] button:enabled:has-text("Spielen")').count() === 1, 'finder j1-e21: ' + id + ' nicht spielbar');
  // Deep-Link (QR) ohne persönliche Daten
  const url = await page.evaluate(() => window.CREW.games.linkFor('okayradar', { platz: 2 }));
  expect(/\?spiel=okayradar&code=\d{4}&platz=2$/.test(url), 'deeplink: Link falsch ' + url);
  await page.goto('file://' + DIST + '?spiel=naeher-nicht&code=4821');
  await page.locator('.game-screen[data-game="naeher-nicht"] #btn-go').waitFor({ timeout: 5000 });
  expect(await page.locator('#btn-pass:visible').count() === 1, 'deeplink: Pass fehlt');
  errors.forEach((e) => problems.push('registrierung: ' + e));
  await browser.close();
}

if (problems.length) {
  console.log('PROBLEME:\n' + [...new Set(problems)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Kommunikation-Test OK – 7 Spiele: Inhalte, drei Bildschirmgrößen, Nachbesprechung, Sticker, Hub, Finder, Deep-Link. Bilder in .shots/kommunikation/');
}

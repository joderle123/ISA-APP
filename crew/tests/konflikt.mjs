/* Test: die Spiele des Themas „Konflikt, Druck & Mobbing“ (Sorry-Werkstatt, 100 Prozent, Gerecht oder gleich?,
   Nein-Trainer, Vier Zeugen, Leiter-Lauf, Wer fehlt?).
   Prüft: Registrierung (nicht mehr „bald“), Finder je Einheit, Didaktik (Lehrer-Hinweise „wenn es kippt“ mit
   Régent/SePAS bei Mobbing-Spielen), Spiel-Logik (Sorry-Hitze, 100 % ohne 0/100, Mobbing-Merkmale, keine Folge
   ohne Preis, je drei Zeichen …), Sicherheit (Sicht per Los, Beobachter:in statt Sicht, Rollen-iPad ohne
   Nachbesprechung, nichts gespeichert, großer Pass), Bedienung (Beamer nimmt erst nach vier Sichten an, Regler)
   und das Layout am Handy (390×844) und am iPad hoch (820×1180) mit Bildern von Start, Mitte und Ende.
   Aufruf:  node crew/build.js && flock /tmp/crew-chrome.lock node crew/tests/konflikt.mjs */
import { createRequire } from 'module';
import { DIST, VIEWPORTS, layoutCheck, shot } from './lib.mjs';

const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }

const IDS = ['sorrywerkstatt', 'hundert-prozent', 'gerecht-oder-gleich', 'nein-trainer', 'vier-zeugen', 'leiter-lauf', 'wer-fehlt'];
const TEMPLATE = { sorrywerkstatt: 'T5', 'hundert-prozent': 'T2', 'gerecht-oder-gleich': 'T4', 'nein-trainer': 'T0', 'vier-zeugen': 'T2', 'leiter-lauf': 'T4', 'wer-fehlt': 'T1' };
const HELP = ['nein-trainer', 'vier-zeugen', 'leiter-lauf', 'wer-fehlt'];
const MOBBING = ['vier-zeugen', 'leiter-lauf', 'wer-fehlt'];
const FIGS = ['mika', 'yara', 'luca', 'sam'];

const problems = [];
const expect = (c, m) => { if (!c) problems.push(m); };

async function launch(viewport, search) {
  const browser = await pw.chromium.launch();
  const context = await browser.newContext({ viewport, hasTouch: true, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.addInitScript(() => { const _st = window.setTimeout; window.__fast = true; window.setTimeout = (fn, ms, ...a) => _st(fn, Math.min(ms || 0, 250), ...a); });
  await page.goto('file://' + DIST);
  await page.evaluate(() => localStorage.clear());
  await page.goto('file://' + DIST + (search || ''));
  if (!search) await page.evaluate(() => window.CREW.debug.found('Test Crew', 'arena'));
  await page.waitForTimeout(150);
  return { browser, page, errors };
}
const click = async (page, sel) => { const l = page.locator(sel).first(); await l.waitFor({ state: 'visible', timeout: 5000 }); await l.click(); await page.waitForTimeout(60); };
const done = (page, id) => page.waitForFunction((gid) => { const st = window.CREW.debug.gameStatus(); return st.done && st.done.id === gid; }, id, { timeout: 60000 });

/* ---------- 1) Registrierung, Hub, Finder, Didaktik, Logik (iPad quer) ---------- */
{
  const { browser, page, errors } = await launch(VIEWPORTS.ipadLandscape);
  const meta = await page.evaluate((ids) => ids.map((id) => { const g = window.CREW.games.get(id); return g ? { id, theme: g.theme, template: g.template, units: g.units, help: !!g.help, d: window.CREW.didaktik.games[id] || null } : { id, missing: true }; }), IDS);
  meta.forEach((m) => {
    if (m.missing) { problems.push(m.id + ': nicht registriert'); return; }
    expect(m.theme === 'konflikt', m.id + ': Thema nicht konflikt');
    expect(m.template === TEMPLATE[m.id], m.id + ': Vorlage ' + m.template + ' statt ' + TEMPLATE[m.id]);
    expect(m.units.length > 0, m.id + ': keine Einheit');
    expect(m.help === HELP.includes(m.id), m.id + ': Hilfenummern ' + (m.help ? 'unerwartet' : 'fehlen'));
    expect(m.d && m.d.lehrer && m.d.lehrer.kippt, m.id + ': Lehrer-Hinweis „wenn es kippt“ fehlt');
    if (MOBBING.includes(m.id)) expect(m.d && /Régent/.test(m.d.lehrer.kippt) && /SePAS/.test(m.d.lehrer.kippt), m.id + ': „wenn es kippt“ ohne Régent/SePAS');
  });
  expect(meta.find((m) => m.id === 'nein-trainer').d.karte === 'Anker vor dem Nein', 'nein-trainer: Skill-Karte „Anker vor dem Nein“ fehlt');

  // Hub: Thema Konflikt komplett spielbar, keine „bald“-Kachel mehr
  await page.evaluate(() => window.CREW.games.renderHub());
  await page.locator('.hub-theme[data-theme="konflikt"]').waitFor();
  for (const id of IDS) expect(await page.locator('.hub-tile[data-game="' + id + '"]:not(.soon):enabled').count() === 1, 'hub: ' + id + ' noch „bald“');
  expect(await page.locator('.hub-theme[data-theme="konflikt"] .hub-tile.soon').count() === 0, 'hub: Konflikt hat noch „bald“-Kacheln');

  // Finder: Einheiten-Spiel oben und spielbar
  await page.locator('#btn-finder').click();
  await page.locator('#finder-unit').waitFor();
  await page.selectOption('#finder-unit', 'j1-e26');
  await page.waitForTimeout(150);
  expect((await page.locator('.game-row').first().getAttribute('data-game')) === 'vier-zeugen', 'finder: j1-e26 zeigt Vier Zeugen nicht oben');
  expect(await page.locator('.unit-alt').count() === 0, 'finder: j1-e26 zeigt noch einen Ersatz');
  for (const id of ['vier-zeugen', 'leiter-lauf', 'hundert-prozent', 'wer-fehlt']) expect(await page.locator('#play-' + id + ':enabled').count() === 1, 'finder: j1-e26 ' + id + ' nicht spielbar');
  await page.selectOption('#finder-unit', 'j1-e24');
  await page.waitForTimeout(150);
  for (const id of ['sorrywerkstatt', 'hundert-prozent', 'gerecht-oder-gleich']) expect(await page.locator('#play-' + id + ':enabled').count() === 1, 'finder: j1-e24 ' + id + ' nicht spielbar');
  await page.selectOption('#finder-unit', 'j1-e25');
  await page.waitForTimeout(150);
  expect(await page.locator('#play-nein-trainer:enabled').count() === 1, 'finder: j1-e25 Nein-Trainer nicht spielbar');
  await page.selectOption('#finder-unit', 'j1-e02');
  await page.waitForTimeout(150);
  expect(await page.locator('#play-wer-fehlt:enabled').count() === 1, 'finder: j1-e02 Wer fehlt? nicht spielbar');
  await page.selectOption('#finder-unit', '');
  await page.locator('#finder-q').fill('Sorry');
  await page.waitForTimeout(150);
  expect(await page.locator('.game-row[data-game="sorrywerkstatt"][data-built="1"]').count() === 1, 'finder: Suche „Sorry“ findet die Sorry-Werkstatt nicht als gebaut');

  // Logik
  const logik = await page.evaluate((FIGS) => {
    const out = [];
    const G = (id) => window.CREW.games.get(id);
    // Sorry-Werkstatt: „aber“ = wieder auf 80, Kernteile + Hitze unter 30
    const S = G('sorrywerkstatt').logik;
    S.SZENEN.forEach((sz) => {
      const b = (a) => ({ art: a, text: sz.teile[a] });
      if (Object.keys(sz.teile).sort().join() !== Object.keys(S.ARTEN).sort().join()) out.push('sorry ' + sz.id + ': Bausteine unvollständig');
      if (S.hitzeVon(sz.start.map(b)) !== S.START) out.push('sorry ' + sz.id + ': erster Versuch nicht auf ' + S.START);
      const echt = Object.keys(S.ARTEN).filter((a) => S.ARTEN[a].echt);
      if (S.hitzeVon(echt.concat(['aber']).map(b)) !== S.START) out.push('sorry ' + sz.id + ': „aber“ setzt nicht auf 80');
      if (!S.angenommen(echt.map(b))) out.push('sorry ' + sz.id + ': alle echten Teile werden nicht angenommen');
      if (S.angenommen(['tat', 'verantwortung', 'wieder'].map(b))) out.push('sorry ' + sz.id + ': drei Teile reichen schon (zu leicht)');
      if (!S.angenommen(['tat', 'verantwortung', 'wieder', 'wirkung'].map(b))) out.push('sorry ' + sz.id + ': Kern + Wirkung reicht nicht');
      if (S.angenommen(['tat', 'verantwortung', 'wirkung', 'zukunft'].map(b))) out.push('sorry ' + sz.id + ': ohne Wiedergutmachung angenommen');
      if (S.angenommen(echt.concat(['falls']).map(b))) out.push('sorry ' + sz.id + ': mit Fake angenommen');
      const len = (arr) => arr.reduce((a, x) => a + sz.teile[x].length, 0) / arr.length;
      const fake = Object.keys(S.ARTEN).filter((a) => !S.ARTEN[a].echt);
      if (Math.abs(len(echt) - len(fake)) > 8) out.push('sorry ' + sz.id + ': echte und Fake-Teile unterschiedlich lang (verrät die Lösung)');
      if (sz.wieder.filter((w) => w.k === 'passt').length !== 1) out.push('sorry ' + sz.id + ': nicht genau ein passender Wiedergutmach-Zug');
      if (!FIGS.includes(sz.A) || !FIGS.includes(sz.B)) out.push('sorry ' + sz.id + ': unbekannte Figur');
    });
    // 100 Prozent: niemand 0, niemand 100, Summe 100; Selbstsicht zusammen klar unter 100
    const H = G('hundert-prozent');
    if (!H.verteilOk([25, 25, 25, 25]) || !H.verteilOk([40, 30, 20, 10])) out.push('100%: gültige Verteilung abgelehnt');
    if (H.verteilOk([0, 40, 30, 30]) || H.verteilOk([100, 0, 0, 0]) || H.verteilOk([30, 30, 30, 5])) out.push('100%: ungültige Verteilung angenommen');
    H.faelle.forEach((f) => {
      const figs = ['A', 'B', 'C', 'D'].map((r) => f.rollen[r].fig);
      if (new Set(figs).size !== 4 || figs.some((x) => !FIGS.includes(x))) out.push('100% ' + f.id + ': nicht vier verschiedene Figuren');
      const selbst = ['A', 'B', 'C', 'D'].reduce((a, r) => a + f.rollen[r].selbst, 0);
      if (selbst > 60) out.push('100% ' + f.id + ': Selbstsicht zu hoch (' + selbst + ')');
      ['A', 'B', 'C', 'D'].forEach((r) => { const z = f.rollen[r].zuege; if (!z.passt || !z.klein || !z.gross || !f.rollen[r].detail) out.push('100% ' + f.id + ' ' + r + ': Zug oder Detail fehlt'); });
    });
    // Vier Zeugen: jedes Detail gehört zu genau einem Merkmal; Mobbing nur, wenn alle vier zutreffen; auch Spaß/Konflikt
    const V = G('vier-zeugen');
    const urteile = new Set();
    V.faelle.forEach((f) => {
      urteile.add(f.urteil);
      const m = ['A', 'B', 'C', 'D'].map((r) => f.sichten[r].merkmal).sort().join();
      if (m !== V.merkmale.map((x) => x.id).sort().join()) out.push('zeugen ' + f.id + ': Details decken nicht alle vier Merkmale ab');
      if ((f.urteil === 'mobbing') !== (f.ja.length === 4)) out.push('zeugen ' + f.id + ': Urteil passt nicht zu den Merkmalen');
      if (f.sichten.D.fig !== null) out.push('zeugen ' + f.id + ': Lehrkraft soll keine Figur sein');
      ['A', 'B', 'C'].forEach((r) => { if (!FIGS.includes(f.sichten[r].fig)) out.push('zeugen ' + f.id + ': Sicht ' + r + ' ohne Figur'); });
      if (Object.keys(f.leiter).sort().join() !== 's1,s2,s3,s4,s5') out.push('zeugen ' + f.id + ': Leiter unvollständig');
      if (f.urteil === 'mobbing' && f.leiter.s4[0] !== 'top') out.push('zeugen ' + f.id + ': Bei Mobbing ist „Erwachsene holen“ nicht die stärkste Stufe');
    });
    ['spass', 'konflikt', 'mobbing'].forEach((u) => { if (!urteile.has(u)) out.push('zeugen: kein Fall „' + u + '“'); });
    // Gerecht oder gleich: kein Weg ohne Preis
    G('gerecht-oder-gleich').dilemmata.forEach((d) => ['a', 'b', 'mitte'].forEach((w) => {
      const r = d[w].react;
      if (!r.some(([, mood]) => mood !== 'froh')) out.push('gerecht ' + d.id + '/' + w + ': Weg ohne Preis');
      if (!r.some(([, mood]) => mood === 'froh' || mood === 'neutral')) out.push('gerecht ' + d.id + '/' + w + ': Weg ohne Gewinn');
      if (r.some(([f]) => !FIGS.includes(f))) out.push('gerecht ' + d.id + ': unbekannte Figur');
    }));
    // Leiter-Lauf: fünf Stufen, jede Szene hat für jede Stufe eine Folge; bei Drohungen „Erwachsene holen“
    const L = G('leiter-lauf');
    if (L.stufen.length !== 5) out.push('leiter: nicht fünf Stufen');
    Object.entries(L.szenen).forEach(([k, s]) => { if (Object.keys(s.folgen).sort().join() !== 'mitte,s1,s2,s3,s4,s5') out.push('leiter ' + k + ': Folgen unvollständig'); });
    if (L.szenen.chat.stark !== 's4') out.push('leiter: Drohung im Chat – „Erwachsene holen“ nicht die stärkste Stufe');
    // Wer fehlt: genau drei Zeichen, mindestens zwei Ablenker, genau ein Mini-Zug
    G('wer-fehlt').szenen.forEach((s) => {
      if (s.spots.filter((x) => x.sign).length !== 3) out.push('wer-fehlt ' + s.id + ': nicht drei Zeichen');
      if (s.spots.filter((x) => !x.sign).length < 2) out.push('wer-fehlt ' + s.id + ': zu wenige Ablenker');
      if (s.zuege.filter((z) => z.k === 'mini').length !== 1 || s.zuege.length !== 4) out.push('wer-fehlt ' + s.id + ': Züge falsch');
      if (!FIGS.includes(s.fig)) out.push('wer-fehlt ' + s.id + ': unbekannte Figur');
    });
    // Nein-Trainer: drei Stufen, vier Nein-Arten, zweimal Nachhaken
    G('nein-trainer').druck.forEach((d) => {
      if (d.nein.length !== 3 || d.nein.some((n) => Object.keys(n).length !== 4)) out.push('nein ' + d.id + ': Nein-Sätze unvollständig');
      if (Object.keys(d.nach1).length !== 4 || Object.keys(d.nach2).length !== 4 || !d.ende.stark || !d.ende.ausweich) out.push('nein ' + d.id + ': Nachhaken unvollständig');
    });
    return out;
  }, FIGS);
  problems.push(...logik);

  // Vier Zeugen am Beamer: erst wenn alle vier Sichten erzählt haben, geht es zur Ampel; Urteil erst mit voller Ampel
  await page.evaluate(() => window.CREW.debug.startGame('vier-zeugen', {}));
  await click(page, '#btn-go');
  await click(page, '#vz-beamer');
  await click(page, '#vz-qr');
  await page.locator('#vz-zur-ampel').waitFor();
  expect(await page.locator('#vz-zur-ampel:disabled').count() === 1, 'zeugen: Ampel ohne gehörte Sichten erreichbar');
  for (const r of ['A', 'B', 'C']) await click(page, '#vz-gehoert-' + r);
  expect(await page.locator('#vz-zur-ampel:disabled').count() === 1, 'zeugen: Ampel nach drei Sichten erreichbar');
  await shot(page, 'konflikt-zeugen-hoeren');
  // Sicht D liest die Lehrkraft vor (z. B. wenn jemand Beobachter:in sein wollte)
  await click(page, '#vz-vorlesen-D');
  await page.locator('.modal .vz-sicht[data-role="D"]').waitFor();
  await page.locator('.modal button', { hasText: 'Vorgelesen' }).click();
  await page.waitForTimeout(150);
  expect(await page.locator('#vz-zur-ampel:enabled').count() === 1, 'zeugen: nach vier Sichten keine Ampel');
  await click(page, '#vz-zur-ampel');
  await click(page, '#btn-level');
  await page.locator('.vz-ampel').waitFor();
  expect(await page.locator('#vz-urteil-mobbing:disabled').count() === 1, 'zeugen: Urteil ohne Ampel möglich');
  for (const m of ['oft', 'macht', 'absicht', 'wehrlos']) await click(page, '.vz-licht[data-merkmal="' + m + '"][data-licht="unklar"]');
  expect(await page.locator('#vz-urteil-mobbing:enabled').count() === 1, 'zeugen: Urteil mit voller Ampel nicht möglich');
  await shot(page, 'konflikt-zeugen-ampel');
  problems.push(...await layoutCheck(page, 'zeugen-ampel'));
  await page.evaluate(() => window.CREW.app.goHome(true));

  // 100 Prozent: Regler – niemand unter 5 %, Weiter nur bei genau 100 %
  await page.evaluate(() => window.CREW.debug.startGame('hundert-prozent', {}));
  await click(page, '#btn-go');
  await click(page, '#hp-beamer');
  await click(page, '#hp-qr');
  await page.locator('#hp-zum-verteilen').waitFor();
  expect(await page.locator('#hp-zum-verteilen:disabled').count() === 1, '100%: Verteilen ohne Erzählrunde möglich');
  for (const r of ['A', 'B', 'C', 'D']) await click(page, '#hp-erzaehlt-' + r);
  await click(page, '#hp-zum-verteilen');
  await click(page, '#btn-level');
  await page.locator('#hp-verteilt').waitFor();
  expect(await page.locator('#hp-verteilt:enabled').count() === 1, '100%: Start 4×25 nicht gültig');
  await click(page, '#hp-minus-A');
  expect(await page.locator('#hp-verteilt:disabled').count() === 1, '100%: Weiter trotz 95 %');
  expect(await page.locator('.hp-regler + p, .pill.accent', { hasText: 'Noch 5 %' }).count() >= 1, '100%: Rest-Anzeige fehlt');
  await click(page, '#hp-plus-B');
  expect(await page.locator('#hp-verteilt:enabled').count() === 1, '100%: Weiter nach Ausgleich gesperrt');
  for (let i = 0; i < 6; i++) { if (await page.locator('#hp-minus-A:enabled').count()) await click(page, '#hp-minus-A'); }
  expect((await page.locator('.hp-reg').first().locator('.hp-wert').textContent()).trim() === '5 %', '100%: Minimum 5 % nicht gehalten');
  expect(await page.locator('#hp-minus-A:disabled').count() === 1, '100%: unter 5 % möglich');
  await shot(page, 'konflikt-100-regler');
  await page.evaluate(() => window.CREW.app.goHome(true));

  // Nichts gespeichert: Nein-Sätze, Sorry-Bausteine und Züge landen nicht im Speicher
  for (const id of ['nein-trainer', 'sorrywerkstatt', 'wer-fehlt']) {
    await page.evaluate((gid) => window.CREW.debug.startGame(gid, { auto: true, autoEndWait: 60 }), id);
    await done(page, id).catch(() => problems.push(id + ': endet nicht'));
    await page.waitForTimeout(200);
  }
  const speicher = await page.evaluate(() => JSON.stringify(Object.keys(localStorage).map((k) => localStorage.getItem(k))));
  ['Nein, ich komm nicht mit', 'Mutprobe', 'Passwort', 'Sorry, aber', 'Tasche runter', 'Bringst du deine Musikbox'].forEach((t) => expect(!speicher.includes(t), 'speicher: „' + t + '“ wurde gespeichert'));
  const st = await page.evaluate(() => window.CREW.state.stickers);
  ['nein-trainer', 'sorrywerkstatt', 'wer-fehlt'].forEach((id) => expect(st[id] && st[id].n >= 1, 'sticker: ' + id + ' fehlt'));

  // Auto-Lauf mit Beobachtung: Hilfenummern am Ende, großer Pass bei der Bonusfrage, Level-Leiste, Nachbesprechung
  for (const id of IDS) {
    await page.evaluate((gid) => {
      const seen = { help: 0, bonusPass: 0, level: 0, nach: 0, stufen: 0 };
      window.__seen = seen;
      if (window.__obs) window.__obs.disconnect();
      window.__obs = new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => {
        if (!(n instanceof Element)) return;
        if (n.querySelector('.help-card')) seen.help++;
        const bp = n.querySelector('#wf-bonus-pass');
        if (bp) seen.bonusPass = Math.max(seen.bonusPass, Math.round(bp.getBoundingClientRect().height));
        if (n.querySelector('.level-screen')) seen.level++;
        if (n.querySelector('.nach-screen') || (n.classList && n.classList.contains('nach-screen'))) seen.nach++;
        if (n.querySelector('.stufen')) seen.stufen++;
      })));
      window.__obs.observe(document.body, { childList: true, subtree: true });
      window.CREW.debug.startGame(gid, { auto: true, autoEndWait: 60 });
    }, id);
    await done(page, id).catch(() => problems.push(id + ': endet nicht (Auto)'));
    const seen = await page.evaluate(() => window.__seen);
    expect(seen.level >= 2, id + ': weniger als zwei Level-Wechsel');
    expect(seen.stufen >= 1, id + ': Level-Leiste fehlt');
    expect(seen.nach >= 1, id + ': Nachbesprechung fehlt');
    if (HELP.includes(id)) expect(seen.help >= 1, id + ': Hilfenummern fehlen');
    if (id === 'wer-fehlt') expect(seen.bonusPass >= 80, 'wer-fehlt: Pass bei der Bonusfrage nicht groß (' + seen.bonusPass + ' px)');
    const ok = await page.evaluate(() => window.CREW.debug.gameStatus().done);
    expect(ok && ok.ok, id + ': Fehler im Auto-Lauf ' + (ok && ok.error));
  }
  errors.splice(0).forEach((e) => problems.push('ipad: ' + e));
  await browser.close();
}

/* ---------- 2) Deep-Link: Sicht-/Rollen-iPad zeigt nur die eigene Sicht, keine Nachbesprechung, kein Sticker ---------- */
{
  const { browser, page, errors } = await launch(VIEWPORTS.ipadLandscape, '?spiel=vier-zeugen&rolle=C&code=4821&platz=3');
  await page.evaluate(() => { if (!window.CREW.state.crew || !window.CREW.state.crew.name) { /* Gerät ohne Crew ist okay */ } });
  await click(page, '#btn-go');
  await page.locator('#vz-los-ok').waitFor();
  expect(await page.locator('.role-card[data-role="C"]').count() === 1, 'deeplink: Sicht C nicht übernommen');
  expect(await page.locator('#vz-los-x').count() === 1, 'deeplink: „Lieber Beobachter:in“ fehlt');
  await shot(page, 'konflikt-zeugen-los');
  await click(page, '#vz-los-ok');
  await page.locator('.vz-sicht[data-role="C"]').waitFor();
  const fall = await page.evaluate(() => { const V = window.CREW.games.get('vier-zeugen'); return V.faelle.map((f) => ({ A: f.sichten.A.sagt, B: f.sichten.B.sagt, D: f.sichten.D.sagt, C: f.sichten.C.sagt })); });
  const text = await page.locator('#stage').textContent();
  expect(fall.some((f) => text.includes(f.C)), 'deeplink: Sicht C zeigt ihren Text nicht');
  expect(!fall.some((f) => text.includes(f.A) || text.includes(f.B) || text.includes(f.D)), 'deeplink: Sicht C sieht fremde Sichten');
  problems.push(...await layoutCheck(page, 'deeplink-sicht-c'));
  await click(page, '#btn-next');
  // Ende ohne Nachbesprechung und ohne Sticker
  await page.locator('#btn-done').waitFor({ timeout: 5000 }).catch(() => problems.push('deeplink: Sicht-iPad ohne Endbild'));
  const after = await page.evaluate(() => ({ st: (window.CREW.state.stickers || {})['vier-zeugen'], nach: !!document.querySelector('.nach-screen'), sticker: !!document.querySelector('#stage .sticker') }));
  expect(!after.sticker, 'deeplink: Endbild zeigt einen Sticker');
  await click(page, '#btn-done');
  await done(page, 'vier-zeugen').catch(() => problems.push('deeplink: Sicht-iPad endet nicht'));
  expect(!after.st, 'deeplink: Sicht-iPad bekommt einen Sticker');
  expect(!after.nach, 'deeplink: Nachbesprechung auf dem Sicht-iPad');
  // Rolle A will lieber Beobachter:in sein: dann sieht sie keine Sicht
  await page.goto('file://' + DIST + '?spiel=vier-zeugen&rolle=A&code=4821&platz=1');
  await click(page, '#btn-go');
  await click(page, '#vz-los-x');
  await page.locator('.slice').waitFor();
  const t2 = await page.locator('#stage').textContent();
  expect(t2.includes('Beobachter:in') && !fall.some((f) => t2.includes(f.A)), 'deeplink: Beobachter:in sieht die Sicht A');
  // 100 Prozent als Rollen-iPad B
  await page.goto('file://' + DIST + '?spiel=hundert-prozent&rolle=B&code=4821&platz=2');
  await click(page, '#btn-go');
  await page.locator('.role-card[data-role="B"]').waitFor();
  await click(page, '#btn-next');
  await page.locator('.hp-rolle[data-role="B"]').waitFor();
  expect(await page.locator('.hp-rolle').count() === 1, '100% deeplink: mehr als eine Rolle sichtbar');
  await shot(page, 'konflikt-100-rolle-b');
  errors.forEach((e) => problems.push('deeplink: ' + e));
  await browser.close();
}

/* ---------- 3) Layout: Handy und iPad hoch – Start, Mitte, Ende ---------- */
for (const [vpName, vp] of [['phone', VIEWPORTS.phone], ['ipadPortrait', VIEWPORTS.ipadPortrait]]) {
  const { browser, page, errors } = await launch(vp);
  for (const id of IDS) {
    await page.evaluate((gid) => window.CREW.debug.startGame(gid, { auto: true, autoEndWait: 700 }), id);
    const seen = new Set();
    let n = 0, mid = 0, end = false;
    const t0 = Date.now();
    for (;;) {
      const st = await page.evaluate(() => window.CREW.debug.gameStatus());
      if (st.done && st.done.id === id) { expect(st.done.ok, vpName + ' ' + id + ': Fehler ' + st.done.error); break; }
      const sig = await page.evaluate(() => { const s = document.querySelector('#stage .game-screen'); return s ? ((s.querySelector('.game-head .eyebrow') || {}).textContent || '') + '|' + s.textContent.length : ''; });
      if (sig && !seen.has(sig)) {
        seen.add(sig);
        problems.push(...await layoutCheck(page, vpName + '-' + id + '-' + n));
        if (n === 0) await shot(page, 'konflikt-' + vpName + '-' + id + '-1-start', 0);
        else if (!end && await page.locator('#btn-done').count()) { await shot(page, 'konflikt-' + vpName + '-' + id + '-9-ende', 0); end = true; }
        else if (mid < 2 && n % 6 === 3) { await shot(page, 'konflikt-' + vpName + '-' + id + '-' + (mid + 2) + '-mitte', 0); mid++; }
        n++;
      }
      await page.waitForTimeout(15);
      if (Date.now() - t0 > 60000) { problems.push(vpName + ' ' + id + ': Zeitüberschreitung'); break; }
    }
    expect(n >= 8, vpName + ' ' + id + ': zu wenige Bildschirme gesehen (' + n + ')');
    errors.splice(0).forEach((e) => problems.push(vpName + ' ' + id + ': ' + e));
  }
  await browser.close();
}

if (problems.length) {
  console.log('PROBLEME:\n' + [...new Set(problems)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Konflikt-Test OK – 7 Spiele: Logik, Sicherheit, Beamer-Regeln, Deep-Links und Layout (Handy, iPad hoch).');
}

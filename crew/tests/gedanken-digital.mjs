/* Test: die zehn Spiele aus „Gedanken & Glaubenssätze“ und „Digital, Gesundheit & Abschluss“
   (woher-satz, satz-werkstatt, beweis-jaeger, haltungs-switch, trick-erkannt, geruecht-staffel, red-flag,
   akku-woche, spaeter-monster, jahres-quest).
   Prüft: Inhalte (lösbar, nicht trivial, nur erfundene Figuren und Apps), Mechanik ohne Auto-Modus (Kenne-ich-Knopf,
   Wischen, Pass/Weitergeben, X-Karte, rote Flaggen, Stopp-Satz, Werkbank-Rolle per Deep-Link), Datenschutz (nur der Sticker
   wird gespeichert), Layout auf Handy und iPad hoch (kein seitliches Scrollen) mit Fotos von Start, Mitte und
   Nachbesprechung, Finder (Einheit → Spiel) und Hub (Themen voll).
   Aufruf:  node crew/build.js && node crew/tests/gedanken-digital.mjs
   Nur bestimmte Spiele für das Layout:  CREW_GAMES=red-flag,jahres-quest node crew/tests/gedanken-digital.mjs */
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DIST, SHOTS, VIEWPORTS } from './lib.mjs';

const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }

const HERE = path.dirname(fileURLToPath(import.meta.url));
const IDS = ['woher-satz', 'satz-werkstatt', 'beweis-jaeger', 'haltungs-switch', 'trick-erkannt', 'geruecht-staffel', 'red-flag', 'akku-woche', 'spaeter-monster', 'jahres-quest'];
const ONLY = process.env.CREW_GAMES ? process.env.CREW_GAMES.split(',').map((s) => s.trim()).filter(Boolean) : null;
const problems = [];
const expect = (c, m) => { if (!c) problems.push(m); };

async function launch(viewport, cap = 250) {
  const browser = await pw.chromium.launch();
  const context = await browser.newContext({ viewport, hasTouch: true, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.addInitScript((c) => { const _st = window.setTimeout; window.__fast = true; window.setTimeout = (fn, ms, ...a) => _st(fn, Math.min(ms || 0, c), ...a); }, cap);
  await page.goto('file://' + DIST);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.evaluate(() => window.CREW.debug.found('Test Crew', 'arena'));
  await page.waitForTimeout(120);
  return { browser, page, errors };
}
const waitDone = (page, id, ms = 60000) => page.waitForFunction((gid) => { const st = window.CREW.debug.gameStatus(); return st.done && st.done.id === gid; }, id, { timeout: ms });

/* ---------- 1) Quelltexte: keine echten Plattformen, nur die vier Figuren ---------- */
{
  const BANNED = /\b(Instagram|Insta|TikTok|Snapchat|WhatsApp|YouTube|Facebook|Fortnite|Roblox|Minecraft|Discord|Twitch|Telegram|Threads|BeReal)\b/;
  for (const id of IDS) {
    const theme = ['woher-satz', 'satz-werkstatt', 'beweis-jaeger', 'haltungs-switch'].includes(id) ? 'gedanken' : 'digital';
    const src = fs.readFileSync(path.join(HERE, '..', 'src', 'games', theme, id + '.js'), 'utf8');
    const m = src.match(BANNED);
    expect(!m, id + ': echte Plattform im Text: ' + (m && m[0]));
    const figs = [...src.matchAll(/\bfig:\s*'([a-z]+)'/g)].map((x) => x[1]);
    figs.forEach((f) => expect(['mika', 'yara', 'luca', 'sam'].includes(f), id + ': unbekannte Figur ' + f));
    expect(fs.existsSync(path.join(HERE, '..', 'src', 'games', theme, id + '.css')), id + ': CSS-Datei fehlt');
  }
}

/* ---------- 2) Inhalte: lösbar, nicht trivial ---------- */
{
  const { browser, page, errors } = await launch(VIEWPORTS.ipadLandscape);
  const res = await page.evaluate((ids) => {
    const out = [];
    const C = window.CREW;
    const G = (id) => C.games.get(id);
    ids.forEach((id) => { if (!G(id)) out.push(id + ': nicht registriert'); });
    const K = C.katalog;
    ids.forEach((id) => { const kg = K.spiele[id]; if (!kg) out.push(id + ': nicht im Katalog'); });
    // Woher kommt der Satz? – genau eine Quelle, die Quelle klingt wie der Satz (Detektiv-Hinweis)
    const sig = (t) => new Set(t.toLowerCase().replace(/[^a-zäöüß ]/g, ' ').split(/\s+/).filter((w) => w.length > 3));
    (G('woher-satz').figuren || []).forEach((f) => {
      const q = f.schnipsel.filter((s) => s.quelle);
      if (f.schnipsel.length !== 3 || q.length !== 1) out.push('woher-satz ' + f.id + ': braucht 3 Schnipsel mit genau einer Quelle');
      else { const a = sig(f.satz), b = sig(q[0].text); const n = [...a].filter((w) => b.has(w)).length; if (n < 2) out.push('woher-satz ' + f.id + ': Quelle klingt nicht wie der Satz'); }
      if (new Set(f.schnipsel.map((s) => s.art)).size !== 3) out.push('woher-satz ' + f.id + ': Spruch, Vergleich, Erfahrung je einmal');
      if (!f.update || !f.update.fair || !f.update.schoen || !f.update.urteil) out.push('woher-satz ' + f.id + ': Update unvollständig');
    });
    // Satz-Werkstatt – jeder Fall lösbar mit echtem Beweis, jede Regel kann scheitern
    const sw = G('satz-werkstatt');
    sw.faelle.forEach((f) => {
      const m = sw.muster(f);
      if (!m) out.push('satz-werkstatt ' + f.id + ': keine Lösung mit 4 von 4');
      if (f.beweis.filter((b) => b.echt).length !== f.beweise.length) out.push('satz-werkstatt ' + f.id + ': echte Beweis-Bausteine ≠ Beweis-Karten von C');
      const alle = f.kern.concat(f.beweis, f.schluss);
      if (!alle.some((b) => b.wort)) out.push('satz-werkstatt ' + f.id + ': keine immer/nie-Falle');
      if (!alle.some((b) => b.ich === false)) out.push('satz-werkstatt ' + f.id + ': keine Ich-Form-Falle');
      if (!alle.some((b) => b.lang)) out.push('satz-werkstatt ' + f.id + ': kein Bandwurm');
      if (!f.kern.some((b) => b.schoen)) out.push('satz-werkstatt ' + f.id + ': kein schöngeredeter Kern');
      const r = sw.pruefe({ kern: f.kern.find((k) => k.wort) || f.kern[1], beweis: null, schluss: null }, false);
      if (r.nie) out.push('satz-werkstatt ' + f.id + ': Falle wird nicht erkannt');
      const ohne = sw.pruefe({ kern: f.kern[0], beweis: null, schluss: null }, true);
      if (ohne.real) out.push('satz-werkstatt ' + f.id + ': Level 2 ohne Beweis gilt als realistisch');
    });
    // Beweis-Jäger
    G('beweis-jaeger').figuren.forEach((f) => {
      if (f.momente.length !== 7) out.push('beweis-jaeger ' + f.id + ': 7 Momente erwartet');
      if (f.momente.filter((m) => m.art === 'trick').length !== 1) out.push('beweis-jaeger ' + f.id + ': genau ein Trick-Moment');
      if (f.momente.filter((m) => m.art === 'beweis').length < 3) out.push('beweis-jaeger ' + f.id + ': zu wenig Beweise');
      if (f.scans.length !== 3 || new Set(f.scans.map((s) => s.art)).size !== 2) out.push('beweis-jaeger ' + f.id + ': 3 Scans, alt und neu');
    });
    // Haltungs-Switch: jede Crew-Größe spielt alle drei Level
    const hs = G('haltungs-switch');
    for (let n = 2; n <= 10; n++) { const p = hs.plan(n); if (![1, 2, 3].every((l) => p.includes(l))) out.push('haltungs-switch: Plan für ' + n + ' ohne alle Level'); if (p.length > hs.szenen.length) out.push('haltungs-switch: zu wenige Szenen für ' + n); }
    // Trick erkannt
    G('trick-erkannt').apps.forEach((a, i) => {
      const t = Object.values(a.hot).filter((x) => x.trick), d = Object.values(a.hot).filter((x) => !x.trick);
      if (t.length < 3 || d.length < 2) out.push('trick-erkannt ' + a.id + ': mind. 3 Tricks und 2 harmlose Stellen');
      t.forEach((x) => { if (!x.kopf || !x.name) out.push('trick-erkannt ' + a.id + ': Trick ohne Erklärung'); });
      if (i === 1) t.forEach((x) => { if (!x.raten || x.raten.length !== 3) out.push('trick-erkannt: Level 2 braucht 3 Antworten je Trick'); });
      if (i === 2) t.forEach((x) => { if (!x.gegen || x.gegen.filter((g) => g.gut).length !== 1) out.push('trick-erkannt: Level 3 braucht genau einen starken Gegenzug'); });
    });
    // Gerücht-Staffel: Verlockung wächst, je drei Stopp-Sätze, beide Level vorhanden
    const gs = G('geruecht-staffel');
    gs.stationen.forEach((s, i) => { if (i && s.plus < gs.stationen[i - 1].plus) out.push('geruecht-staffel: Verlockung wächst nicht'); });
    [1, 2].forEach((l) => { if (gs.geruechte.filter((g) => g.L === l).length < 2) out.push('geruecht-staffel: zu wenige Gerüchte für Level ' + l); });
    gs.geruechte.forEach((g) => { if (g.stopp.length !== 3 || !g.wahr) out.push('geruecht-staffel ' + g.id + ': 3 Stopp-Sätze und Auflösung'); });
    // Red Flag
    const rf = G('red-flag');
    rf.chats.forEach((c) => { const f = c.msgs.filter((m) => m.flag).length, ok = c.msgs.filter((m) => m.who === 'x' && !m.flag).length; if (f < 4 || ok < 1) out.push('red-flag ' + c.id + ': zu wenig Flaggen oder harmlose Nachrichten'); });
    ['screenshot', 'block', 'erwachsen'].forEach((z) => { const x = rf.zuege.find((y) => y.id === z); if (!x || !x.gut) out.push('red-flag: Zug ' + z + ' fehlt'); });
    [rf.klasse.antwort1, rf.klasse.antwort2].forEach((a, i) => { if (!a.some((x) => x.gut) || !a.some((x) => !x.gut)) out.push('red-flag: Antworten ' + (i + 1) + ' brauchen gute und schwache'); });
    // Akku-Woche: Werte bleiben 0–100, jeder kleine Schritt hilft einer schwachen Woche
    const ak = G('akku-woche');
    const schlecht = ak.tage.map((d) => d.opts.slice().sort((a, b) => a.akku - b.akku)[0].id);
    const gut = ak.tage.map((d) => (d.opts.find((o) => o.best) || d.opts[0]).id);
    const s0 = ak.simuliere(schlecht), s1 = ak.simuliere(gut);
    if (s0.length !== 6) out.push('akku-woche: 6 Morgen erwartet (Mo–Sa)');
    if (!(s1[5].akku > s0[5].akku)) out.push('akku-woche: gute Woche nicht besser als schwache');
    s0.concat(s1).forEach((p) => { if (p.akku < 0 || p.akku > 100 || p.pegel < 0 || p.pegel > 100) out.push('akku-woche: Wert außerhalb 0–100'); });
    ak.schritte.forEach((s) => { const n = ak.simuliere(ak.mitSchritt(schlecht, s.id)); if (!(n[5].akku > s0[5].akku)) out.push('akku-woche: Schritt ' + s.id + ' hilft nicht'); });
    // Später-Monster
    const sm = G('spaeter-monster');
    ['klein', 'mittel', 'gross'].forEach((g) => { if (!sm.schritte.some((s) => s.groesse === g)) out.push('spaeter-monster: Startschritt ' + g + ' fehlt'); });
    sm.fluestern.forEach((f) => { if (!(f.echt > f.gefuehlt)) out.push('spaeter-monster: Loop kostet nicht mehr als gefühlt'); });
    // Jahres-Quest: acht Inseln decken alle 30 Einheiten genau einmal ab, Themen passen
    const jq = G('jahres-quest');
    const units = jq.inseln.flatMap((x) => x.units);
    const kat = K.einheiten.map((e) => e.id);
    if (units.length !== 30 || new Set(units).size !== 30 || !kat.every((u) => units.includes(u))) out.push('jahres-quest: Einheiten nicht genau einmal abgedeckt');
    jq.inseln.forEach((x) => { if (!K.themen.some((t) => t.id === x.thema)) out.push('jahres-quest: unbekanntes Thema ' + x.thema); });
    if (jq.inseln.length !== K.themen.length) out.push('jahres-quest: eine Insel pro Thema');
    return { out, karten: jq.rucksack.map((r) => r.name.replace(/­/g, '')) };
  }, IDS);
  problems.push(...res.out);
  const KARTEN = ['5-4-3-2-1', 'Komplimente', 'Gemeinsam atmen', 'Atem 4-7-8', 'Dankbarkeitsblitz', 'Bodyscan', 'Sinnes-Spaziergang', 'Achtsames Hören', 'Luftballon-Atem', 'Spaziergang ohne Worte', 'Partneratmung', 'Bis es still ist', 'Mein sicherer Ort', 'Gedankenschiffchen', 'Die freundliche Stimme', 'Achtsamkeit nach Wahl', 'Fester Stand', 'Runter unter 70', 'Anker vor dem Nein', 'Positivitätskette', 'Drei Atemzüge vorm Handy', 'Teilen-Bremse', 'Wer steht am Pult?', 'Satz für schwere Tage', 'Handy-Stopp', 'Energie-Check', 'Unsichtbare Skills'];
  res.karten.forEach((k) => expect(KARTEN.includes(k), 'jahres-quest: Rucksack-Skill ist keine Skill-Karte: ' + k));

  /* ---------- 3) Finder und Hub ---------- */
  await page.evaluate(() => window.CREW.games.renderFinder());
  await page.locator('#finder-unit').waitFor();
  for (const [unit, id] of [['j1-e17', 'woher-satz'], ['j1-e19', 'beweis-jaeger'], ['j1-e27', 'trick-erkannt'], ['j1-e29', 'akku-woche'], ['j1-e30', 'jahres-quest']]) {
    await page.selectOption('#finder-unit', unit);
    await page.waitForTimeout(80);
    expect((await page.locator('.game-row').first().getAttribute('data-game')) === id, 'finder ' + unit + ': ' + id + ' steht nicht oben');
    expect(await page.locator('.unit-alt').count() === 0, 'finder ' + unit + ': Ersatz angezeigt, obwohl gebaut');
    expect(await page.locator('#play-' + id + ':enabled').count() === 1, 'finder ' + unit + ': Spielen-Knopf fehlt');
  }
  await page.evaluate(() => window.CREW.games.renderHub());
  for (const t of ['gedanken', 'digital']) {
    const soon = await page.locator('.hub-theme[data-theme="' + t + '"] .hub-tile.soon').count();
    expect(soon === 0, 'hub ' + t + ': noch ' + soon + ' Spiele „bald“');
  }

  /* ---------- 4) Mechanik ohne Auto-Modus ---------- */
  const start = async (id, opts) => { await page.evaluate(([gid, o]) => window.CREW.debug.startGame(gid, o), [id, opts || {}]); await page.locator('#btn-go').waitFor({ timeout: 4000 }); await page.locator('#btn-go').click(); };
  const stateNow = () => page.evaluate(() => JSON.stringify(window.CREW.state));
  // Woher kommt der Satz? – „Kenne ich“ zeigt die Entlastung, zählt und speichert nichts; Antippen stempelt
  {
    await start('woher-satz', { code: '4821' });
    await page.locator('#ws-kenne').waitFor({ timeout: 4000 });
    const before = await stateNow();
    await page.locator('#ws-kenne').click();
    expect(await page.locator('.ws-kenne-note:visible', { hasText: 'nicht allein' }).count() === 1, 'woher-satz: „Kenne ich“ zeigt keine Entlastung');
    expect((await stateNow()) === before, 'woher-satz: „Kenne ich“ verändert den Spielstand');
    await page.locator('.ws-snip').first().click();
    await page.locator('.ws-stamp').first().waitFor({ timeout: 3000 });
    expect(await page.locator('.ws-stamp').count() === 3 && await page.locator('.ws-stamp', { hasText: 'Quelle' }).count() === 1, 'woher-satz: Stempel Quelle/Verstärker fehlen');
    await page.evaluate(() => window.CREW.app.goHome(true));
  }
  // Beweis-Jäger – nach rechts wischen zählt als Beweis
  {
    await start('beweis-jaeger', { code: '4821' });
    await page.locator('.bj-deck .bj-card').waitFor({ timeout: 4000 });
    const box = await page.locator('.bj-deck .bj-card').first().boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 80, box.y + box.height / 2, { steps: 4 });
    await page.mouse.move(box.x + box.width / 2 + 170, box.y + box.height / 2, { steps: 4 });
    await page.mouse.up();
    await page.waitForFunction(() => document.querySelector('.bj-card[aria-label^="Moment 2"]'), null, { timeout: 4000 }).catch(() => problems.push('beweis-jaeger: Wischen führt nicht zum nächsten Moment'));
    expect((await page.locator('.bj-lupe b').first().textContent()).trim() === '1', 'beweis-jaeger: Wischen nach rechts zählt nicht als Beweis');
    await page.evaluate(() => window.CREW.app.goHome(true));
  }
  // Haltungs-Switch – Pass auf dem Deckblatt gibt sofort weiter
  {
    await start('haltungs-switch');
    await page.locator('#hs-pass').waitFor({ timeout: 4000 });
    await page.locator('#hs-pass').click();
    await page.locator('#btn-passed').waitFor({ timeout: 3000 }).catch(() => problems.push('haltungs-switch: Pass gibt nicht weiter'));
    await page.locator('#btn-passed').click();
    // Das nächste Paar spielt das nächste Level (ein Pass hält die Crew nicht auf)
    await page.locator('#btn-level, #hs-schauen').first().waitFor({ timeout: 3000 });
    if (await page.locator('#btn-level').count()) await page.locator('#btn-level').click();
    await page.locator('#hs-schauen').waitFor({ timeout: 3000 }).catch(() => {});
    expect(await page.locator('.game-screen', { hasText: 'Paar 2 von' }).count() >= 1, 'haltungs-switch: nach Pass kommt nicht das nächste Paar');
    await page.evaluate(() => window.CREW.app.goHome(true));
  }
  // Trick erkannt – harmlos = „kein Trick“, Trick = Treffer, X-Karte überspringt die App
  {
    await start('trick-erkannt');
    await page.locator('.te-phone').waitFor({ timeout: 4000 });
    await page.locator('[data-hot="suche"]').click();
    expect(await page.locator('.te-miss', { hasText: 'Kein Trick' }).count() === 1, 'trick-erkannt: harmlose Stelle nicht als „kein Trick“ markiert');
    await page.locator('[data-hot="autoplay"]').click();
    expect(await page.locator('.te-hit-name', { hasText: 'Autoplay' }).count() === 1, 'trick-erkannt: Treffer zeigt keine Erklärung');
    expect((await page.locator('.te-turn b').textContent()).startsWith('1 / 3'), 'trick-erkannt: Zähler stimmt nicht');
    await page.locator('#btn-x').click();
    await page.locator('.level-screen').waitFor({ timeout: 3000 }).catch(() => problems.push('trick-erkannt: X-Karte überspringt die App nicht'));
    await page.evaluate(() => window.CREW.app.goHome(true));
  }
  // Red Flag – Nachricht antippen setzt die rote Flagge, Zähler zählt mit
  {
    await start('red-flag');
    await page.locator('#rf-weiter').waitFor({ timeout: 4000 });
    for (let i = 0; i < 3; i++) await page.locator('#rf-weiter').click();
    await page.locator('.rf-msg.x[data-i="3"]').click();
    expect(await page.locator('.rf-msg.x[data-i="3"].flagged').count() === 1, 'red-flag: Flagge wird nicht gesetzt');
    expect((await page.locator('.rf-count b').textContent()).includes('1'), 'red-flag: Flaggen-Zähler zählt nicht');
    await page.locator('#rf-stopp').click();
    await page.locator('.rf-bilanz').waitFor({ timeout: 3000 }).catch(() => problems.push('red-flag: Stopp führt nicht zur Bilanz'));
    await page.evaluate(() => window.CREW.app.goHome(true));
  }
  // Gerücht-Staffel – Stopp an Station 1, Stopp-Satz, Auflösung „Gestoppt an Station 1“
  {
    await start('geruecht-staffel');
    await page.locator('#btn-next').waitFor({ timeout: 4000 });
    await page.locator('#btn-next').click(); // Reihe steht
    await page.locator('#btn-next').click(); // Handy an Station 1
    await page.locator('#gs-stopp').click();
    await page.locator('#gs-satz-0').click();
    await page.locator('.gs-result-t').waitFor({ timeout: 3000 });
    expect((await page.locator('.gs-result-t').textContent()).includes('Station 1'), 'geruecht-staffel: Stopp an Station 1 nicht ausgewertet');
    await page.evaluate(() => window.CREW.app.goHome(true));
  }
  // Satz-Werkstatt – Deep-Link mit Rolle D: Werkbank, Prüfen leuchtet die Regel-Lampen
  {
    await page.goto('file://' + DIST + '?spiel=satz-werkstatt&rolle=D&code=4821&platz=4');
    await page.locator('#btn-go').waitFor({ timeout: 5000 });
    await page.locator('#btn-go').click();
    await page.locator('.role-card[data-role="D"]').waitFor({ timeout: 4000 }).catch(() => problems.push('satz-werkstatt: Rolle D aus dem Link fehlt'));
    expect(await page.locator('#daycode-now').count() === 0, 'satz-werkstatt: Tagescode-Bildschirm trotz Link');
    await page.locator('#btn-next').click(); // Das bin ich
    await page.locator('#btn-next').click(); // Zur Werkbank
    await page.locator('.sw-bench').waitFor({ timeout: 3000 });
    expect(await page.locator('#sw-pruefen:disabled').count() === 1, 'satz-werkstatt: Prüfen geht ohne Kern');
    await page.locator('.sw-block[data-zeile="kern"]').first().click();
    await page.locator('#sw-pruefen').click();
    await page.locator('.sw-lamps').waitFor({ timeout: 3000 });
    expect(await page.locator('.sw-lamp').count() === 4, 'satz-werkstatt: vier Regel-Lampen erwartet');
    await page.evaluate(() => window.CREW.app.goHome(true));
  }
  // Datenschutz: Zwei Spiele bis zum Ende – gespeichert wird nur der Sticker
  {
    const before = await page.evaluate(() => { const s = JSON.parse(JSON.stringify(window.CREW.state)); delete s.stickers; delete s.seen; return JSON.stringify(s); });
    for (const id of ['jahres-quest', 'akku-woche']) {
      await page.evaluate((gid) => window.CREW.debug.startGame(gid, { auto: true }), id);
      await waitDone(page, id).catch(() => problems.push(id + ': endet im Auto-Modus nicht'));
    }
    const after = await page.evaluate(() => { const s = JSON.parse(JSON.stringify(window.CREW.state)); const st = s.stickers; delete s.stickers; delete s.seen; return { s: JSON.stringify(s), st }; });
    expect(after.s === before, 'datenschutz: Spiel speichert mehr als den Sticker');
    expect(after.st['jahres-quest'] && after.st['akku-woche'], 'datenschutz: Sticker fehlen');
    const raw = await page.evaluate(() => JSON.stringify(localStorage));
    expect(!/2031|Rucksack|Postkarte|Kenne ich/i.test(raw), 'datenschutz: Postkarte oder Antworten im Speicher');
  }
  problems.push(...errors.map((e) => 'inhalt/mechanik: ' + e));
  await browser.close();
}

/* ---------- 5) Layout auf Handy und iPad hoch: kein seitliches Scrollen, Fotos von Start, Mitte, Nachbesprechung ---------- */
for (const [vpName, vp] of [['handy', VIEWPORTS.phone], ['ipad-hoch', VIEWPORTS.ipadPortrait]]) {
  const { browser, page, errors } = await launch(vp, 700);
  await page.evaluate(() => {
    // Jeder neue Bildschirm wird kurz nach dem Einblenden geprüft
    window.__lay = [];
    const check = () => {
      const st = document.getElementById('stage');
      const eb = (document.querySelector('.game-head .eyebrow') || {}).textContent || '';
      if (st && st.scrollWidth > st.clientWidth + 2) window.__lay.push('seitliches Scrollen ' + st.scrollWidth + '>' + st.clientWidth + ' bei „' + eb + '“');
      document.querySelectorAll('#stage button').forEach((b) => { const r = b.getBoundingClientRect(); if (r.width && r.right > window.innerWidth + 1) window.__lay.push('Knopf ragt raus: „' + b.textContent.trim().slice(0, 30) + '“ bei „' + eb + '“'); if (r.width && r.height < 40 && b.offsetParent) window.__lay.push('Knopf zu klein (' + Math.round(r.height) + 'px): „' + b.textContent.trim().slice(0, 30) + '“'); });
    };
    new MutationObserver((ms) => { if (ms.some((m) => [...m.addedNodes].some((n) => n.classList && n.classList.contains('wrap')))) setTimeout(check, 450); }).observe(document.getElementById('stage'), { childList: true });
  });
  const ids = ONLY ? IDS.filter((x) => ONLY.includes(x)) : IDS;
  for (const id of ids) {
    await page.evaluate((gid) => { window.__lay.length = 0; window.__crewAutoDelay = 260; window.CREW.debug.startGame(gid, { auto: true, autoEndWait: 260 }); }, id);
    const shot = { start: false, mitte: false, nach: false };
    const t0 = Date.now();
    for (;;) {
      const st = await page.evaluate((gid) => { const s = window.CREW.debug.gameStatus(); return { done: s.done && s.done.id === gid, ok: s.done && s.done.ok, err: s.done && s.done.error, intro: !!document.querySelector('#btn-go'), nach: !!document.querySelector('.nach-screen'), l2: !!document.querySelector('.stufe-pill[data-level="2"]') }; }, id);
      if (st.done) { expect(st.ok, vpName + ' ' + id + ': endet mit Fehler ' + st.err); break; }
      for (const [k, on] of [['start', st.intro], ['mitte', st.l2], ['nach', st.nach]]) {
        if (on && !shot[k]) { shot[k] = true; fs.mkdirSync(SHOTS, { recursive: true }); await page.screenshot({ path: path.join(SHOTS, 'w2-' + id + '-' + vpName + '-' + k + '.png') }); }
      }
      if (Date.now() - t0 > 120000) { problems.push(vpName + ' ' + id + ': Zeitüberschreitung'); break; }
      await page.waitForTimeout(60);
    }
    expect(shot.start && shot.nach, vpName + ' ' + id + ': Start oder Nachbesprechung nicht gesehen');
    await page.waitForTimeout(500);
    const lay = await page.evaluate(() => window.__lay.slice());
    [...new Set(lay)].forEach((l) => problems.push(vpName + ' ' + id + ': ' + l));
    errors.splice(0).forEach((e) => problems.push(vpName + ' ' + id + ': ' + e));
  }
  await browser.close();
}

if (problems.length) {
  console.log('PROBLEME:\n' + [...new Set(problems)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Gedanken & Digital OK – 10 Spiele: Inhalte, Mechanik, Datenschutz, Finder und Layout (Handy, iPad hoch). Fotos: ' + SHOTS + '/w2-*.png');
}

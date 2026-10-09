/* Test: Didaktik – „Darum geht’s“, Level, Nachbesprechung und Lehrer-Hinweise.
   Prüft die Inhalte (content/didaktik.js) für jedes Spiel, jede Mission und jedes Solo-Spiel
   und spielt drei Spiele im Auto-Modus an: Darum-geht’s-Karte im Intro, Level-Leiste, Nachbesprechung.
   Aufruf:  node crew/build.js && node crew/tests/didaktik.mjs */
import { launch, VIEWPORTS } from './lib.mjs';

const problems = [];
const expect = (c, m) => { if (!c) problems.push(m); };

// Skill-Karten aus dem Skills-Kurs Jahr 1, die ein Spiel nennen darf
const KARTEN = ['5-4-3-2-1', 'Komplimente', 'Gemeinsam atmen', 'Atem 4-7-8', 'Dankbarkeitsblitz', 'Bodyscan', 'Sinnes-Spaziergang', 'Achtsames Hören',
  'Luftballon-Atem', 'Spaziergang ohne Worte', 'Partneratmung', 'Bis es still ist', 'Mein sicherer Ort', 'Gedankenschiffchen', 'Die freundliche Stimme',
  'Achtsamkeit nach Wahl', 'Fester Stand', 'Runter unter 70', 'Anker vor dem Nein', 'Positivitätskette', 'Drei Atemzüge vorm Handy', 'Teilen-Bremse',
  'Wer steht am Pult?', 'Satz für schwere Tage', 'Handy-Stopp', 'Energie-Check', 'Unsichtbare Skills'];

const { browser, page, errors } = await launch(VIEWPORTS.ipadLandscape);
try {
  await page.waitForFunction(() => window.CREW && window.CREW.didaktik && window.CREW.games, null, { timeout: 5000 });
  const data = await page.evaluate(() => ({
    d: window.CREW.didaktik,
    games: window.CREW.games.all.map((g) => g.id),
    missions: window.CREW.missions.map((m) => m.id),
    solo: window.CREW.soloGames.map((s) => s.id),
  }));
  const words = (t) => String(t || '').trim().split(/\s+/).filter(Boolean).length;
  const check = (kind, id, e, nFragen) => {
    const tag = kind + ':' + id;
    if (!e) { problems.push(tag + ': Eintrag fehlt'); return; }
    expect(e.warum && words(e.warum) <= 26, tag + ': „Darum geht’s“ fehlt oder zu lang (' + words(e.warum) + ' Wörter)');
    expect(e.skill && words(e.skill) <= 8, tag + ': Skill fehlt oder zu lang');
    expect(!e.karte || KARTEN.includes(e.karte), tag + ': unbekannte Skill-Karte „' + e.karte + '“');
    expect(e.geuebt && words(e.geuebt) <= 25, tag + ': „Das habt ihr geübt“ fehlt oder zu lang');
    expect(Array.isArray(e.fragen) && e.fragen.length === nFragen, tag + ': erwartet ' + nFragen + ' Nachbesprechungs-Fragen');
    (e.fragen || []).forEach((q, i) => expect(words(q) <= 20 && /\?[“”"]?$/.test(q.trim()), tag + ': Frage ' + (i + 1) + ' zu lang oder ohne Fragezeichen'));
    const L = e.lehrer || {};
    expect(L.ziel && L.stufen && L.achten && L.kippt, tag + ': Lehrer-Hinweise unvollständig');
    expect(Array.isArray(L.impulse) && L.impulse.length >= 2, tag + ': zu wenige Gesprächsimpulse');
    const all = JSON.stringify(e);
    expect(!/\bISA\b/.test(all), tag + ': sichtbares „ISA“');
  };
  data.games.forEach((id) => check('spiel', id, data.d.games[id], 3));
  data.missions.forEach((id) => { check('mission', id, data.d.missions[id], 3); expect(data.d.missions[id] && data.d.missions[id].einheit, 'mission:' + id + ': Einheit fehlt'); });
  data.solo.forEach((id) => { check('solo', id, data.d.solo[id], 2); expect(data.d.solo[id] && data.d.solo[id].solo === true, 'solo:' + id + ': solo-Markierung fehlt'); });
  expect(data.games.length >= 28, 'erwartet mindestens 28 Spiele, gefunden ' + data.games.length);
  expect(data.missions.length === 5 && data.solo.length === 5, 'erwartet 5 Missionen und 5 Solo-Spiele');

  // Lehrer-Hinweise als Fenster: Spiel, Mission, Solo
  for (const [kind, id] of [['games', 'gedanken-weiche'], ['missions', 'clash'], ['solo', 'chill']]) {
    const n = await page.evaluate(([k, i]) => {
      window.CREW.games.showHinweise(k, i, 'Test');
      const box = document.querySelector('.lehrer-hinweise');
      const c = box ? box.querySelectorAll('.lh-sec').length : 0;
      document.querySelectorAll('.overlay, .modal-back, .modal').forEach((x) => x.remove());
      return c;
    }, [kind, id]);
    expect(n >= 6, 'Hinweise ' + kind + ':' + id + ': erwartet mindestens 6 Abschnitte, gefunden ' + n);
  }

  // Drei Spiele anspielen: Intro mit „Darum geht’s“ + Level-Leiste, dann die Nachbesprechung.
  // Der Auto-Modus läuft in Tests sehr schnell – ein MutationObserver merkt sich, was zu sehen war.
  await page.evaluate(() => window.CREW.debug.found('Crew Test'));
  for (const id of ['tatsache-urteil', 'pult-tausch', 'storystaffel']) {
    await page.evaluate((gid) => {
      const seen = { warum: 0, stufen: 0, skill: 0, nach: 0, nachQ: 0, geuebt: 0, pass: 0, done: 0 };
      window.__seen = seen;
      const look = (root) => {
        if (!(root instanceof Element)) return;
        const q = (sel) => (root.matches && root.matches(sel) ? [root] : []).concat([...root.querySelectorAll(sel)]);
        if (q('.game-screen .warum-card, .game-screen.warum-card').length || (root.closest && root.closest('.game-screen') && q('.warum-card').length)) seen.warum++;
        if (q('.stufen').length) seen.stufen++;
        if (q('.skill-row').length) seen.skill++;
        q('.nach-screen').forEach((n) => {
          seen.nach++;
          seen.nachQ = Math.max(seen.nachQ, n.querySelectorAll('.nach-q').length);
          seen.geuebt = Math.max(seen.geuebt, n.querySelectorAll('.nach-geuebt').length);
          seen.pass = Math.max(seen.pass, n.querySelectorAll('#nach-pass').length);
          seen.done = Math.max(seen.done, n.querySelectorAll('#nach-done').length);
        });
      };
      if (window.__obs) window.__obs.disconnect();
      window.__obs = new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach(look)));
      window.__obs.observe(document.body, { childList: true, subtree: true });
      window.CREW.debug.startGame(gid, { auto: true, autoEndWait: 300 });
    }, id);
    await page.waitForFunction((gid) => { const st = window.CREW.debug.gameStatus(); return st.done && st.done.id === gid; }, id, { timeout: 30000 })
      .catch(() => problems.push(id + ': Spiel endet nicht'));
    const seen = await page.evaluate(() => window.__seen);
    expect(seen.warum >= 1, id + ': Darum-geht’s-Karte fehlt im Intro');
    expect(seen.stufen >= 1, id + ': Level-Leiste fehlt');
    expect(seen.skill >= 1, id + ': Skill-Zeile fehlt');
    expect(seen.nach >= 1, id + ': Nachbesprechung erscheint nicht');
    expect(seen.nachQ === 3, id + ': Nachbesprechung ohne drei Fragen');
    expect(seen.geuebt === 1, id + ': „Das habt ihr heute geübt“ fehlt');
    expect(seen.pass === 1 && seen.done === 1, id + ': Pass/Fertig fehlt in der Nachbesprechung');
  }
} catch (e) {
  problems.push('Abbruch: ' + e.message.split('\n')[0]);
}
problems.push(...errors);
await browser.close();

if (problems.length) {
  console.log('PROBLEME:\n' + [...new Set(problems)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Didaktik-Test OK – Darum geht’s, Level, Nachbesprechung und Hinweise für alle Spiele, Missionen und Solo-Spiele.');
}

/* Test: Solo-Zone – „Chill-Zone“ (chill) und „Gefühls-Decoder“ (decoder).
   Aufruf:  CREW_DIST=<ordner> CREW_SHOTS=<ordner> node crew/tests/solo-test.mjs
   Prüft: Inhalte, alle drei Chill-Übungen, eine komplette Decoder-Runde, X-Karte mitten im Spiel,
   Rückkehr zur Solo-Zone, Rekord ohne Namen, Layout an jedem wichtigen Bildschirm, Seitenfehler. */
import { launch, shot, clickText, waitText, layoutCheck, fresh, VIEWPORTS } from './lib.mjs';

const problems = [];
function expect(cond, msg) { if (!cond) problems.push(msg); }

const WORDS = ['Wut', 'Angst', 'Trauer', 'Freude', 'Scham', 'Stolz', 'Ekel', 'Überraschung', 'Ärger', 'Frust', 'Neid', 'Eifersucht',
  'Nervosität', 'Unsicherheit', 'Sorge', 'Schreck', 'Enttäuschung', 'Einsamkeit', 'Erleichterung', 'Vorfreude', 'Dankbarkeit',
  'Verlegenheit', 'Schuldgefühl', 'Mitgefühl', 'Langeweile'];
const NAMES = ['Tiago', 'Lena', 'Aylin', 'Jeff', 'Mia', 'Noah', 'Sara', 'Luca', 'Emir', 'Yara', 'Dylan', 'Inês', 'Lara', 'Milan', 'Jana', 'Rui', 'Amira', 'Kevin', 'Nora', 'Elias'];

const RUNS = [
  ['ipadLandscape', VIEWPORTS.ipadLandscape, 'arena', false],
  ['ipadPortrait', VIEWPORTS.ipadPortrait, 'neon', false],
  ['phone', VIEWPORTS.phone, 'pixel', true], // Handy: zusätzlich „weniger Bewegung“
];

async function watchToasts(page) {
  await page.evaluate(() => {
    window.__toasts = [];
    new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => {
      if (n.classList && n.classList.contains('toast')) window.__toasts.push(n.textContent);
    }))).observe(document.getElementById('overlays'), { childList: true });
  });
}
const toasts = (page) => page.evaluate(() => window.__toasts.slice());

for (const [vpName, vp, look, calm] of RUNS) {
  const { browser, page, errors } = await launch(vp);
  const tag = (n) => `solo-${vpName}-${n}`;
  const check = async (n) => problems.push(...await layoutCheck(page, tag(n)));
  try {
    if (calm) await page.emulateMedia({ reducedMotion: 'reduce' });
    await fresh(page, look);
    await watchToasts(page);

    /* ---------- Inhalte (einmal) ---------- */
    if (vpName === 'ipadLandscape') {
      const c = await page.evaluate(({ WORDS, NAMES }) => {
        const pool = window.CREW.content.decoder || [];
        const ids = new Set(pool.map((s) => s.id));
        const sentences = (t) => String(t || '').split(/(?<=[.!?…“])\s+/).filter(Boolean);
        const tooLong = pool.filter((s) => [s.text, s.say, s.body, s.clue].some((t) => sentences(t).some((x) => x.split(/\s+/).filter((w) => /[\wÄÖÜäöüß]/.test(w)).length > 15)));
        const bad = pool.filter((s) => !s.id || !s.text || !s.clue || !s.answer || !Array.isArray(s.options) || s.options.length !== 4
          || new Set(s.options).size !== 4 || !s.options.includes(s.answer) || s.options.some((w) => !WORDS.includes(w))
          || ![1, 2, 3].includes(s.intensity) || (s.also || []).some((w) => !s.options.includes(w) || w === s.answer)
          || !Array.isArray(s.signs) || !s.signs.length || s.signs.some((x) => !['koerper', 'worte', 'situation'].includes(x))
          || !NAMES.includes(s.who));
        const forbidden = pool.filter((s) => /\b(Alex|Ben|Chase|Jason)\b/.test([s.text, s.say, s.body, s.clue].join(' ')));
        const solo = window.CREW.soloGames.map((g) => g.id);
        return {
          n: pool.length, safe: pool.filter((s) => !s.heikel).length, heikel: pool.filter((s) => s.heikel).length, unique: ids.size === pool.length,
          tooLong: tooLong.map((s) => s.id), bad: bad.map((s) => s.id), forbidden: forbidden.map((s) => s.id), solo,
          answers: [...new Set(pool.map((s) => s.answer))].length,
        };
      }, { WORDS, NAMES });
      console.log('Inhalte:', JSON.stringify(c));
      expect(c.n >= 36, `Nur ${c.n} Szenen (mind. 36)`);
      expect(c.safe >= 36, `Nur ${c.safe} nicht-heikle Szenen`);
      expect(c.unique, 'Szenen-IDs nicht eindeutig');
      expect(!c.bad.length, 'Ungültige Szenen: ' + c.bad.join(','));
      expect(!c.tooLong.length, 'Sätze mit mehr als 15 Wörtern: ' + c.tooLong.join(','));
      expect(!c.forbidden.length, 'Verbotene Namen: ' + c.forbidden.join(','));
      expect(c.solo.includes('chill') && c.solo.includes('decoder'), 'Solo-Spiele nicht registriert: ' + c.solo.join(','));
    }

    /* ---------- Solo-Zone: Kacheln ---------- */
    await page.locator('#tile-solo').click();
    await page.locator('#solo-chill').waitFor();
    await page.locator('#solo-decoder').waitFor();
    await shot(page, tag('00-hub'));
    await check('hub');

    /* =================== Chill-Zone =================== */
    await page.locator('#solo-chill').click();
    await waitText(page, 'Such dir etwas aus');
    await shot(page, tag('01-chill-menu'), 700);
    await check('chill-menu');

    // (a) Atem-Welle
    await page.locator('#chill-welle').click();
    await waitText(page, 'Wie lange? Welcher Takt?');
    await page.locator('[data-min="1"]').click();
    await page.locator(`[data-rhythm="${vpName === 'ipadPortrait' ? 'ruhig' : 'box'}"]`).click();
    await shot(page, tag('02-atem-setup'));
    await check('atem-setup');
    await page.locator('#breath-start').click();
    await page.locator('.solo-port').waitFor();
    if (vpName === 'ipadLandscape') {
      // X-Karte mitten in der Übung → zurück ins Menü, ohne Fehler
      await page.waitForFunction(() => /Einatmen|Halten|Ausatmen/.test(document.querySelector('.solo-phase-label')?.textContent || ''), null, { timeout: 5000 });
      await shot(page, tag('03-atem-lauf'), 120);
      await check('atem-lauf');
      await page.locator('#btn-x').click();
      await waitText(page, 'Such dir etwas aus', 5000);
      expect((await toasts(page)).some((t) => t.includes('Übersprungen')), 'X-Karte (Atem): kein Hinweis „Übersprungen“');
      await page.locator('#chill-welle').click();
      await waitText(page, 'Wie lange? Welcher Takt?');
      await page.locator('#breath-start').click();
    } else if (vpName === 'phone') {
      await page.waitForFunction(() => /Einatmen|Halten|Ausatmen/.test(document.querySelector('.solo-phase-label')?.textContent || ''), null, { timeout: 5000 });
      await shot(page, tag('03-atem-lauf'), 120);
      await check('atem-lauf');
      await page.locator('#breath-stop').click();
      await waitText(page, 'Auch kurz hilft', 5000);
      await page.locator('#chill-again').click(); // Nochmal → wieder Einstellungen
      await waitText(page, 'Wie lange? Welcher Takt?');
      await page.locator('#breath-start').click();
    } else {
      await page.waitForFunction(() => /Ausatmen/.test(document.querySelector('.solo-phase-label')?.textContent || ''), null, { timeout: 5000 });
      await shot(page, tag('03-atem-lauf'), 60);
      await check('atem-lauf');
    }
    await waitText(page, 'Geschafft.', 20000);
    await shot(page, tag('04-atem-fertig'));
    await check('atem-fertig');
    await page.locator('[data-feel="ruhiger"]').click();
    await waitText(page, 'Merk dir, was dir gerade geholfen hat');
    await shot(page, tag('05-atem-gefuehl'), 150);
    await page.locator('#chill-menu').click();
    await waitText(page, 'Such dir etwas aus');

    // (b) Glitzerglas
    await page.locator('#chill-glas').click();
    const cv = page.locator('.solo-jar-canvas');
    await cv.waitFor();
    await page.waitForTimeout(600);
    await shot(page, tag('06-glas-start'), 200);
    await check('glas-start');
    const painted = await page.evaluate(() => {
      const c = document.querySelector('.solo-jar-canvas');
      const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
      let n = 0;
      for (let i = 3; i < d.length; i += 16) if (d[i] > 0) n++;
      return n;
    });
    expect(painted > 1000, 'Glitzerglas: Canvas bleibt leer');
    // Mit dem Finger durchwischen
    const bb = await cv.boundingBox();
    await page.mouse.move(bb.x + bb.width * 0.35, bb.y + bb.height * 0.8);
    await page.mouse.down();
    for (let k = 0; k < 14; k++) await page.mouse.move(bb.x + bb.width * (0.35 + 0.3 * Math.sin(k / 2)), bb.y + bb.height * (0.8 - k * 0.04), { steps: 2 });
    await page.mouse.up();
    await page.waitForTimeout(150);
    await shot(page, tag('07-glas-wirbel'), 60);
    expect(await page.locator('.solo-jar-box[data-settled="0"]').count() === 1, 'Glitzerglas: Wischen wirbelt nichts auf');
    await page.locator('.solo-jar-box[data-settled="1"]').waitFor({ timeout: 30000 });
    await waitText(page, 'Gedanken ruhiger');
    await shot(page, tag('08-glas-ruhig'), 200);
    await check('glas-ruhig');
    await page.locator('#jar-shake').click();
    await page.waitForTimeout(100);
    expect(await page.locator('.solo-jar-box[data-settled="0"]').count() === 1, 'Glitzerglas: Schütteln wirbelt nichts auf');
    await page.locator('#jar-done').click();
    await waitText(page, 'Schön ruhig.');
    await check('glas-fertig');
    await page.locator('[data-feel="unruhig"]').click();
    await waitText(page, 'Probier eine andere Übung');
    await page.locator('#chill-menu').click();
    await waitText(page, 'Such dir etwas aus');

    // (c) 5-4-3-2-1
    await page.locator('#chill-sinne').click();
    await waitText(page, 'Zurück ins Hier und Jetzt');
    await shot(page, tag('09-sinne-intro'));
    await check('sinne-intro');
    await page.locator('#sinne-go').click();
    await page.locator('[data-sense="sehen"]').waitFor();
    for (let k = 0; k < 5; k++) await page.locator('.solo-dot').nth(k).click();
    expect(await page.locator('#sinne-next.solo-ready').count() === 1, '5-4-3-2-1: Weiter pulsiert nicht, obwohl alles gefunden');
    await shot(page, tag('10-sinne-sehen'));
    await check('sinne-sehen');
    await page.locator('#sinne-next').click();
    await page.locator('[data-sense="hoeren"]').waitFor();
    // X-Karte: „Hören“ überspringen → direkt „Spüren“
    await page.locator('#btn-x').click();
    await page.locator('[data-sense="fuehlen"]').waitFor({ timeout: 5000 });
    await page.locator('.solo-dot').nth(0).click();
    await shot(page, tag('11-sinne-spueren'));
    await check('sinne-spueren');
    await page.locator('#sinne-next').click();
    await page.locator('[data-sense="riechen"]').waitFor();
    await page.locator('#sinne-next').click();
    await page.locator('[data-sense="schmecken"]').waitFor();
    await page.locator('.solo-dot').nth(0).click();
    await shot(page, tag('12-sinne-schmecken'));
    await check('sinne-schmecken');
    await page.locator('#sinne-next').click();
    await waitText(page, 'Du bist hier. Jetzt.');
    await shot(page, tag('13-sinne-fertig'));
    await check('sinne-fertig');
    await page.locator('#chill-menu').click();
    await waitText(page, 'Such dir etwas aus');

    // Zurück zur Solo-Zone (Portrait: per X-Karte im Menü)
    if (vpName === 'ipadPortrait') await page.locator('#btn-x').click();
    else await page.locator('#chill-back').click();
    await page.locator('#solo-decoder').waitFor({ timeout: 5000 });

    /* =================== Gefühls-Decoder =================== */
    await page.evaluate(() => { window.CREW.debug.startSolo('decoder'); });
    await waitText(page, 'Lies die Szene');
    await shot(page, tag('20-dec-intro'), 600);
    await check('dec-intro');
    await page.locator('#dec-start').click();

    let expectScore = 0, played = 0;
    for (let i = 0; i < 10; i++) {
      await page.locator(`.solo-dec-hud .eyebrow:has-text("Szene ${i + 1} von 10")`).waitFor({ timeout: 6000 });
      await page.locator('.solo-opt').first().waitFor();
      const id = await page.locator('[data-scene]').getAttribute('data-scene');
      const sc = await page.evaluate((id) => window.CREW.content.decoder.find((s) => s.id === id), id);
      expect(!!sc, 'Szene nicht gefunden: ' + id);
      if (i === 0) { await shot(page, tag('21-dec-szene')); await check('dec-szene'); }
      if (i === 5) {
        // X-Karte beim Gefühl → Szene fällt aus, Spiel läuft weiter
        await page.locator('#btn-x').click();
        continue;
      }
      let word = sc.answer, lvl = sc.intensity;
      if (i === 6) { word = sc.options.find((w) => w !== sc.answer && !(sc.also || []).includes(w)); lvl = sc.intensity === 3 ? 2 : sc.intensity + 1; }
      await page.locator(`.solo-opt[data-word="${word}"]`).click();
      await page.locator('.solo-lv').first().waitFor();
      if (i === 0) { await shot(page, tag('22-dec-staerke')); await check('dec-staerke'); }
      if (i === 7) {
        // X-Karte bei der Stärke → Szene fällt aus
        await page.locator('#btn-x').click();
        continue;
      }
      await page.locator(`.solo-lv[data-level="${lvl}"]`).click();
      await page.locator('#dec-next').waitFor({ timeout: 5000 });
      played++;
      expectScore += (word === sc.answer ? 2 : 0) + (lvl === sc.intensity ? 1 : 0);
      const shown = Number(await page.locator('.solo-score-num').textContent());
      expect(shown === expectScore, `Szene ${i + 1}: Punkte ${shown}, erwartet ${expectScore}`);
      if (i === 0) { await shot(page, tag('23-dec-aufloesung'), 900); await check('dec-aufloesung'); }
      if (i === 6) {
        await waitText(page, 'Andere Spur');
        await shot(page, tag('24-dec-andere-spur'), 900);
        await check('dec-andere-spur');
      }
      await page.locator('#dec-next').click();
    }
    await waitText(page, 'Deine Bilanz', 6000);
    await page.waitForTimeout(1200);
    await shot(page, tag('25-dec-bilanz'));
    await check('dec-bilanz');
    const ts = await toasts(page);
    expect(ts.some((t) => t.includes('3er-Serie')), 'Keine Feier bei 3er-Serie');
    expect(ts.some((t) => t.includes('5er-Serie')), 'Keine Feier bei 5er-Serie');
    const saved = await page.evaluate(() => ({ score: window.CREW.state.solo['decoder:score'], serie: window.CREW.state.solo['decoder:serie'] }));
    expect(saved.score === expectScore, `Rekord gespeichert ${saved.score}, erwartet ${expectScore}`);
    expect(saved.serie === 5, `Beste Serie ${saved.serie}, erwartet 5`);
    expect(await page.locator('#dec-newrecord').count() === 1, 'Kein „Neuer Rekord!“ beim ersten Spiel');
    const big = Number(await page.locator('.solo-dec-big').textContent());
    expect(big === expectScore, `Bilanz zeigt ${big}, erwartet ${expectScore}`);
    expect(played === 8, 'Gespielt: ' + played);
    // Keine Namen im Speicher
    const stored = await page.evaluate(() => JSON.stringify(window.CREW.state.solo));
    expect(!NAMES.some((n) => stored.includes(n)), 'Namen im Solo-Speicher: ' + stored);

    if (vpName === 'ipadLandscape') {
      // Nochmal → neue Runde startet; dann per Home raus und Rekord im Intro prüfen
      await page.locator('#dec-again').click();
      await page.locator('.solo-dec-hud .eyebrow:has-text("Szene 1 von 10")').waitFor({ timeout: 5000 });
      await page.locator('#btn-home').click();
      await page.locator('#tile-solo').waitFor();
      await page.locator('#tile-solo').click();
      await page.locator('#solo-decoder').click();
      await page.locator('#dec-record').waitFor({ timeout: 5000 });
      expect((await page.locator('#dec-record').textContent()).includes(String(expectScore)), 'Intro zeigt den Rekord nicht');
      await clickText(page, 'Zurück');
      await page.locator('#solo-decoder').waitFor({ timeout: 5000 });
    } else {
      await page.locator('#dec-done').click();
      await page.locator('#solo-decoder').waitFor({ timeout: 5000 });
    }
    await shot(page, tag('26-zurueck-hub'));
  } catch (e) {
    problems.push(`${vpName}: Abbruch: ${e.message.split('\n')[0]}`);
    try { await shot(page, tag('99-fehler')); } catch { /* egal */ }
  }
  problems.push(...errors.map((e) => `${vpName}: ${e}`));
  await browser.close();
}

if (problems.length) {
  console.log('PROBLEME:\n' + [...new Set(problems)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Solo-Test OK – Chill-Zone und Gefühls-Decoder ohne Fehler.');
}

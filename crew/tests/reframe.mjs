/* Test: Mission „Reframe-Battle“ (reframe) + Solo „Reframe-Rush“ – komplett durchspielen.
   Aufruf:  CREW_DIST=<ordner> CREW_SHOTS=<ordner> node crew/tests/reframe.mjs
   Prüft: Inhalte (Menge, Felder, Satzlänge, Namen, Speed-Match eindeutig), Layout an jedem wichtigen
   Bildschirm (iPad quer/hoch, Handy, Beamer), X-Karte mitten in der Mission und im Solo,
   Timer-Ende, Punkte-Übersteuerung durch die Lehrkraft, Seitenfehler. */
import { launch, shot, clickText, waitText, layoutCheck, fresh, VIEWPORTS, closeLevelUp } from './lib.mjs';

const problems = [];
function expect(cond, msg) { if (!cond) problems.push(msg); }

const RUNS = [
  // name, viewport, look, Crew-Größe (Start: 5)
  ['ipadLandscape', VIEWPORTS.ipadLandscape, 'arena', 5],
  ['ipadPortrait', VIEWPORTS.ipadPortrait, 'neon', 6],
  ['phone', VIEWPORTS.phone, 'pixel', 4],
  ['beamer', VIEWPORTS.beamer, 'pixel', 2],
];

async function eyebrow(page) {
  return ((await page.locator('.reframe-hud .eyebrow').first().textContent()) || '').trim();
}
async function plus(page, panelIdx, times) {
  const btn = page.locator('.reframe-panel.vote').nth(panelIdx).locator('.stepper button').nth(1);
  for (let i = 0; i < times; i++) await btn.click();
}

for (const [vpName, vp, look, crew] of RUNS) {
  const { browser, page, errors } = await launch(vp);
  const tag = (n) => `reframe-${vpName}-${n}`;
  const check = async (n) => problems.push(...await layoutCheck(page, tag(n)));
  try {
    await fresh(page, look);

    /* ---------- Inhalte prüfen (einmal) ---------- */
    if (vpName === 'ipadLandscape') {
      const c = await page.evaluate(() => {
        const CREW = window.CREW;
        const pool = CREW.content.reframe || [];
        const normal = pool.filter((x) => !x.heikel);
        const ids = new Set(pool.map((x) => x.id));
        const words = (s) => s.trim().split(/\s+/).length;
        const bad = pool.filter((x) => !x.id || !x.gruppe || !x.satz || !x.etikett || !x.wer || !x.staerke || !x.staerke2 || !Array.isArray(x.reframes) || x.reframes.length !== 3);
        const long = [];
        pool.forEach((x) => {
          if (words(x.satz) > 15) long.push(x.id + ':satz');
          x.reframes.forEach((r, i) => { if (words(x.wer + ', ' + r) > 15) long.push(x.id + ':r' + i); if (!/[.!?]$/.test(r)) long.push(x.id + ':r' + i + ' ohne Punkt'); });
        });
        const names = pool.filter((x) => /\b(Alex|Ben|Chase|Jason)\b/.test(JSON.stringify(x)));
        // Reframes dürfen das Etikett nicht verraten (gleicher Wortstamm)
        const STOP = ['alles', 'immer', 'sich', 'überall', 'viel', 'will', 'gern', 'allein'];
        const leak = [];
        pool.forEach((x) => {
          const stems = x.etikett.toLowerCase().split(/\s+/).filter((w) => w.length >= 4 && !STOP.includes(w)).map((w) => w.slice(0, 5));
          x.reframes.forEach((r, i) => {
            const rw = r.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/);
            if (stems.some((s) => rw.some((w) => w.startsWith(s)))) leak.push(x.id + ':r' + i);
          });
        });
        // Speed-Match: 4 verschiedene Optionen, falsche nie aus ähnlichen Gruppen
        const K = CREW.reframe;
        const optBad = [];
        const fakeCtx = { state: CREW.state };
        normal.forEach((x) => {
          for (let t = 0; t < 15; t++) {
            const o = K.buildOptions(fakeCtx, x);
            const et = new Set(o.map((y) => y.card.etikett));
            const okN = o.filter((y) => y.ok).length;
            const near = o.filter((y) => !y.ok && K.isNear(x.gruppe, y.card.gruppe));
            const gr = new Set(o.map((y) => y.card.gruppe));
            if (o.length !== 4 || et.size !== 4 || okN !== 1 || near.length || gr.size !== 4 || o.some((y) => y.card.heikel)) { optBad.push(x.id); break; }
          }
        });
        const m = CREW.missions.find((y) => y.id === 'reframe');
        const s = CREW.soloGames.find((y) => y.id === 'reframe');
        return {
          n: pool.length, normal: normal.length, heikel: pool.length - normal.length, unique: ids.size === pool.length,
          bad: bad.map((x) => x.id), long, names: names.map((x) => x.id), leak, optBad,
          mission: !!m, day: m && m.day, debrief: m && m.debrief.length, eldib: m && m.eldib.length, solo: !!s,
          eldibCodes: m && m.eldib.map((e) => e.code).join(' '),
        };
      });
      console.log('Inhalte:', JSON.stringify(c));
      expect(c.normal >= 40, `Nur ${c.normal} normale Etiketten (mind. 40)`);
      expect(c.unique, 'IDs nicht eindeutig');
      expect(!c.bad.length, 'Unvollständige Karten: ' + c.bad.join(','));
      expect(!c.long.length, 'Zu lange Sätze / fehlender Punkt: ' + c.long.join(','));
      expect(!c.names.length, 'Verbotene Namen: ' + c.names.join(','));
      expect(!c.leak.length, 'Reframe verrät das Etikett: ' + c.leak.join(','));
      expect(!c.optBad.length, 'Speed-Match-Optionen nicht eindeutig: ' + c.optBad.join(','));
      expect(c.mission && c.day === 5, 'Mission reframe fehlt oder falscher Tag');
      expect(c.debrief >= 5 && c.debrief <= 8, 'Debrief: 5–8 Fragen erwartet');
      expect(c.eldib >= 3 && c.eldib <= 5, 'ELDiB: 3–5 Codes erwartet');
      expect(c.solo, 'Solo-Spiel reframe fehlt');
    }

    // Handy: Timer stark beschleunigen, um das automatische Ende der Bedenkzeit zu testen
    if (vpName === 'phone') {
      await page.evaluate(() => { const si = window.setInterval; window.setInterval = (fn, ms, ...a) => si(fn, Math.min(ms || 0, 25), ...a); });
    }

    /* ---------- Session starten ---------- */
    await page.evaluate(() => { window.CREW.debug.startMission('reframe'); });
    await waitText(page, 'Wie viele spielen heute mit?');
    const diff = crew - 5;
    for (let i = 0; i < Math.abs(diff); i++) await page.locator('.stepper button').nth(diff > 0 ? 1 : 0).click();
    await clickText(page, 'Los geht');
    await waitText(page, 'Wetter-Check');
    await clickText(page, 'Überspringen');

    // Intro
    await waitText(page, 'Aus einem blöden Spruch', 8000);
    await shot(page, tag('01-intro'), 1200);
    await check('intro');
    const teamTxt = await page.locator('.reframe-teams').textContent();
    const sa = Math.ceil(crew / 2), sb = crew - sa;
    expect(teamTxt.includes(sa + (sa === 1 ? ' Person' : ' Leute')) && teamTxt.includes(sb + (sb === 1 ? ' Person' : ' Leute')), `${vpName}: Team-Größen falsch: ${teamTxt}`);
    await page.click('#rf-start');

    /* ---------- Battle 1: Tipp, Abstimmung, ein Team überzeugt ---------- */
    await waitText(page, 'Dreht es um!', 8000);
    expect((await eyebrow(page)).includes('Battle 1 von 3'), `${vpName}: Battle 1 nicht angezeigt`);
    await shot(page, tag('02-etikett'), 700);
    await check('etikett');
    await page.click('#rf-tip');
    await waitText(page, 'Stichwort');
    if (vpName === 'phone') {
      // Timer läuft von selbst ab → Bühne frei
      await waitText(page, 'Bühne frei!', 8000);
    } else {
      await page.click('#rf-think-done');
      await waitText(page, 'Bühne frei!', 5000);
    }
    await shot(page, tag('03-buehne'));
    await check('buehne');
    await page.click('#rf-vote-go');
    await waitText(page, 'Wie viele Ja?', 8000);
    // Team A (zuerst) bekommt Mehrheit, Team B nur 1 Ja (bei 2 Leuten ist Team B dann trotzdem knapp)
    const judgesA = (crew - sa) + 1;
    await plus(page, 0, Math.ceil(judgesA / 2));
    await plus(page, 1, 1);
    await shot(page, tag('04-abstimmung'));
    await check('abstimmung');
    await page.click('#rf-vote-done');
    await page.locator('#rf-profi').waitFor({ timeout: 8000 });
    await shot(page, tag('05-ergebnis'), 1600);
    await check('ergebnis');
    const blocks1 = await page.locator('.reframe-tower .reframe-block').count();
    expect(blocks1 >= 1, `${vpName}: Nach Battle 1 kein Turm-Block (${blocks1})`);
    const scoreA = await page.locator('.reframe-hud .reframe-score.tA .reframe-score-num').textContent();
    expect(Number(scoreA) === Math.ceil(judgesA / 2), `${vpName}: Punkte Team A falsch (${scoreA})`);
    await page.click('#rf-profi');
    await waitText(page, 'So drehen es Profis um');
    await shot(page, tag('06-profis'));
    await check('profis');
    expect(await page.locator('.reframe-profi').count() === 2, `${vpName}: Nicht 2 Profi-Reframes`);
    await page.click('#rf-next');

    /* ---------- Battle 2: X-Karte → Runde wird übersprungen ---------- */
    await waitText(page, 'Dreht es um!', 5000);
    expect((await eyebrow(page)).includes('Battle 2 von 3'), `${vpName}: Battle 2 nicht angezeigt`);
    await page.locator('#btn-x').click();
    await page.waitForTimeout(250);
    expect((await eyebrow(page)).includes('Battle 3 von 3'), `${vpName}: X-Karte hat Battle 2 nicht übersprungen`);

    /* ---------- Battle 3: beide Teams überzeugen ---------- */
    await waitText(page, 'Dreht es um!', 5000);
    await page.click('#rf-think-done');
    await page.click('#rf-vote-go');
    await waitText(page, 'Wie viele Ja?', 8000);
    await shot(page, tag('04b-abstimmung-b'));
    await plus(page, 0, 7);
    await plus(page, 1, 7);
    await page.click('#rf-vote-done');
    await page.locator('#rf-profi').waitFor({ timeout: 8000 });
    await shot(page, tag('05b-ergebnis-doppelt'), 1800);
    await check('ergebnis-doppelt');
    const blocks3 = await page.locator('.reframe-tower .reframe-block').count();
    expect(blocks3 === blocks1 + 2, `${vpName}: Doppel-Block fehlt (${blocks1} → ${blocks3})`);
    await page.click('#rf-profi');
    await waitText(page, 'So drehen es Profis um');
    await page.click('#rf-next');

    /* ---------- Speed-Match ---------- */
    await waitText(page, 'Speed-Match', 5000);
    await shot(page, tag('07-speed-intro'));
    await check('speed-intro');
    await page.click('#rf-speed-go');

    // Runde 1: Team A falsch, Team B richtig (+2)
    await waitText(page, 'Welches Team war zuerst?', 5000);
    await shot(page, tag('08-speed'));
    await check('speed');
    let correct = await page.locator('.reframe-opt[data-ok]').getAttribute('data-letter');
    let wrongL = ['A', 'B', 'C', 'D'].find((l) => l !== correct);
    await page.click('#rf-first-A');
    await waitText(page, 'Welche Karte zeigt', 5000);
    await page.click('#rf-letter-' + wrongL);
    await waitText(page, 'eure Chance', 5000);
    await shot(page, tag('09-speed-chance'));
    await check('speed-chance');
    await page.click('#rf-letter-' + correct);
    await page.locator('#rf-speed-next').waitFor({ timeout: 5000 });
    await shot(page, tag('10-speed-aufloesung'), 1200);
    await check('speed-aufloesung');
    await waitText(page, 'Richtig! +2');
    await page.click('#rf-speed-next');

    // Runde 2: je nach Gerät anders
    await waitText(page, 'Welches Team war zuerst?', 5000);
    if (vpName === 'phone') {
      // X-Karte mitten im Speed-Match → direkt zum Finale
      await page.locator('#btn-x').click();
    } else if (vpName === 'ipadPortrait') {
      // Team B falsch, Team A passt → Lehrkraft gibt für gute Begründung trotzdem +2
      correct = await page.locator('.reframe-opt[data-ok]').getAttribute('data-letter');
      wrongL = ['A', 'B', 'C', 'D'].find((l) => l !== correct);
      await page.click('#rf-first-B');
      await page.click('#rf-letter-' + wrongL);
      await page.click('#rf-pass');
      await page.locator('#rf-override-B').waitFor({ timeout: 5000 });
      await shot(page, tag('11-speed-override'), 1000);
      await check('speed-override');
      await page.click('#rf-override-B');
      await waitText(page, 'Gut begründet');
      await clickText(page, 'Weiter');
    } else {
      await page.click('#rf-first-none');
      await page.locator('#rf-speed-next').waitFor({ timeout: 5000 });
      expect(await page.locator('[id^="rf-override-"]').count() === 0, `${vpName}: Übersteuerung ohne Versuch angezeigt`);
      await page.click('#rf-speed-next');
    }

    /* ---------- Finale ---------- */
    await waitText(page, 'Euer Stärken-Turm', 6000);
    await shot(page, tag('12-finale'), 1800);
    await check('finale');
    expect(await page.locator('.reframe-roof.on').count() === 1, `${vpName}: Dach fehlt im Finale`);
    await page.click('#rf-done');
    await waitText(page, 'Nachspielzeit', 5000);
    await shot(page, tag('13-debrief'));
    await check('debrief');
    await clickText(page, 'Fertig');
    await waitText(page, 'Mission geschafft', 5000);
    await page.waitForTimeout(1300);
    const energyTxt = await page.locator('.wrap .display').filter({ hasText: /^\d+$/ }).first().textContent();
    const energy = Number(energyTxt);
    expect(energy >= 4 && energy <= 10, `${vpName}: Energie außerhalb 4–10: ${energyTxt}`);
    await shot(page, tag('14-energie'));
    await closeLevelUp(page);
    await clickText(page, 'Bis morgen');

    /* ---------- Solo: Reframe-Rush ---------- */
    await page.locator('#tile-solo').click();
    await page.locator('#solo-reframe').click();
    await waitText(page, 'Du siehst eine Stärke');
    await shot(page, tag('15-solo-intro'), 900);
    await check('solo-intro');
    await page.click('#rf-solo-start');
    let hits = 0;
    for (let i = 0; i < 8; i++) {
      await page.locator('.reframe-opt.as-btn:not([disabled])').first().waitFor({ timeout: 5000 });
      const eb = await eyebrow(page);
      expect(eb.includes('Karte ' + (i + 1) + ' von 8'), `${vpName}: Solo zeigt „${eb}“ statt Karte ${i + 1}`);
      if (i === 0) { await shot(page, tag('16-solo-karte')); await check('solo-karte'); }
      if (i === 2 && vpName !== 'beamer') {
        // X-Karte im Solo: Karte wird übersprungen
        await page.locator('#btn-x').click();
        await page.waitForTimeout(200);
        continue;
      }
      const right = i % 3 !== 1;
      await page.locator(right ? '.reframe-opt.as-btn[data-ok]' : '.reframe-opt.as-btn:not([data-ok])').first().click();
      if (right) hits++;
      await page.locator('.reframe-reveal').waitFor({ timeout: 5000 });
      if (i === 0 || i === 1) { await shot(page, tag(i === 0 ? '17-solo-treffer' : '18-solo-daneben'), 1000); await check('solo-feedback-' + i); }
      await clickText(page, i < 7 ? 'Nächste Karte' : 'Fertig');
    }
    await waitText(page, 'Dein Stärken-Turm', 5000);
    await shot(page, tag('19-solo-ende'), 1600);
    await check('solo-ende');
    const endTxt = await page.locator('.reframe-final-l h2').textContent();
    expect(endTxt.startsWith(hits + ' von 8'), `${vpName}: Solo-Ergebnis falsch: ${endTxt} (erwartet ${hits})`);
    await page.click('#rf-solo-done');
    await page.locator('#solo-reframe').waitFor({ timeout: 5000 });
  } catch (e) {
    problems.push(`${vpName}: Abbruch: ${e.message.split('\n')[0]}`);
    try { await shot(page, tag('99-fehler'), 100); } catch { /* egal */ }
  }
  problems.push(...errors.map((e) => `${vpName}: ${e}`));
  await browser.close();
}

if (problems.length) {
  console.log('PROBLEME:\n' + [...new Set(problems)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Reframe-Test OK – keine Fehler.');
}

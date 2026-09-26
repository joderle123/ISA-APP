/* Rauchtest: Gründung, Start, Session mit „Steh auf, wenn …“, Antwort-Karte, Lehrermodus, HQ, Solo. */
import { launch, shot, clickText, waitText, layoutCheck, VIEWPORTS } from './lib.mjs';

const problems = [];
for (const [vpName, vp] of Object.entries({ ipadLandscape: VIEWPORTS.ipadLandscape, ipadPortrait: VIEWPORTS.ipadPortrait, phone: VIEWPORTS.phone })) {
  const { browser, page, errors } = await launch(vp);
  const tag = (n) => `core-${vpName}-${n}`;
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // Gründung
  await waitText(page, 'Gründet eure Crew');
  await shot(page, tag('01-gruendung'));
  problems.push(...await layoutCheck(page, tag('gruendung')));
  await page.locator('.chip').first().click();
  await page.locator('[data-look="pixel"]').click();
  await shot(page, tag('02-gruendung-pixel'));
  await page.locator('[data-look="arena"]').click();
  await clickText(page, 'Crew gründen');
  await page.locator('.modal, #tile-session').first().waitFor();

  // Start
  await page.locator('#tile-session').waitFor();
  await shot(page, tag('03-start'));
  problems.push(...await layoutCheck(page, tag('start')));

  // Session mit Steh auf
  await page.evaluate(() => window.CREW.debug.startMission('stehauf'));
  await waitText(page, 'Wie viele spielen heute mit?');
  await shot(page, tag('04-anzahl'));
  await clickText(page, 'Los geht');
  await waitText(page, 'inneres Wetter');
  await shot(page, tag('05-checkin'));
  problems.push(...await layoutCheck(page, tag('checkin')));
  await clickText(page, 'Alle bereit');
  await waitText(page, 'Was zeigt die Crew?', 8000);
  const plus = page.locator('.tally .t-item').nth(0).locator('button').nth(1);
  await plus.click(); await plus.click();
  await page.locator('.tally .t-item').nth(4).locator('button').nth(1).click();
  await shot(page, tag('06-checkin-tally'));
  problems.push(...await layoutCheck(page, tag('tally')));
  await clickText(page, 'Crew-Wetter anzeigen');
  await shot(page, tag('07-crewwetter'));
  await clickText(page, 'Zur Mission');
  // Mission (erzwungen) startet direkt
  await waitText(page, 'Karte 1 von');
  await shot(page, tag('08-stehauf-karte'));
  problems.push(...await layoutCheck(page, tag('stehauf-karte')));
  for (let i = 0; i < 5; i++) {
    await clickText(page, 'Alle haben geschätzt');
    await waitText(page, 'Wie viele stehen gerade?', 8000);
    if (i === 0) await shot(page, tag('09-stehauf-stehen'));
    await clickText(page, 'Auflösen');
    await waitText(page, 'richtig', 5000);
    if (i === 0) { await page.waitForTimeout(400); await shot(page, tag('10-stehauf-aufloesung')); problems.push(...await layoutCheck(page, tag('aufloesung'))); }
    await page.locator('.card .stepper button').nth(1).click();
    await clickText(page, i < 4 ? 'Nächste Karte' : 'Fertig');
  }
  await waitText(page, 'Kurz drüber reden');
  await shot(page, tag('11-debrief'));
  problems.push(...await layoutCheck(page, tag('debrief')));
  await clickText(page, 'Fertig');
  await waitText(page, 'Energie', 5000);
  await page.waitForTimeout(600);
  await shot(page, tag('12-ergebnis'));
  // Level-Up-Dialog möglich
  const stark = page.locator('.modal button', { hasText: 'Stark' });
  if (await stark.count()) { await shot(page, tag('13-levelup')); await stark.click(); }
  await clickText(page, 'Bis morgen');

  // Antwort-Karte
  await page.locator('#tile-paddle').click();
  await waitText(page, 'Antwort-Karte');
  await page.locator('.paddle-grid button').nth(7).click();
  await shot(page, tag('14-paddle'));
  problems.push(...await layoutCheck(page, tag('paddle')));
  await clickText(page, 'Zeigen');
  await shot(page, tag('15-paddle-zeigen'));
  await page.locator('#btn-paddle-back').click();
  await page.locator('[data-tab="wetter"]').click();
  await shot(page, tag('16-paddle-wetter'));
  problems.push(...await layoutCheck(page, tag('paddle-wetter')));

  // Lehrermodus
  await page.locator('#btn-home').click();
  await page.locator('#tile-teacher').click();
  for (const d of ['1', '2', '3', '4']) await page.locator('.valuepad button', { hasText: new RegExp('^' + d + '$') }).click();
  await waitText(page, 'Lehrermodus');
  await shot(page, tag('17-lehrer'));
  problems.push(...await layoutCheck(page, tag('lehrer')));
  for (const t of ['inhalte', 'einstellungen', 'fortschritt', 'anleitung']) {
    await page.locator(`[data-tab="${t}"]`).click();
    await page.waitForTimeout(100);
    await shot(page, tag('18-lehrer-' + t));
    problems.push(...await layoutCheck(page, tag('lehrer-' + t)));
  }
  await clickText(page, 'Schließen');

  // HQ & Solo & Hilfe
  await page.locator('#tile-base').click();
  await shot(page, tag('19-hq'));
  problems.push(...await layoutCheck(page, tag('hq')));
  await page.locator('#btn-help').click();
  await shot(page, tag('20-hilfe'));
  await page.locator('.modal button', { hasText: 'Schließen' }).click();
  await page.locator('#btn-home').click();
  await page.locator('#tile-solo').click();
  await shot(page, tag('21-solo'));

  problems.push(...errors.map((e) => `${vpName}: ${e}`));
  await browser.close();
}

if (problems.length) {
  console.log('PROBLEME:\n' + [...new Set(problems)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Rauchtest OK – keine Fehler.');
}

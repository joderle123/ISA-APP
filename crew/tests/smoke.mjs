/* Rauchtest: Gründung, Start, Session mit „Wer steht?“, Antwort-Karte, Lehrermodus, HQ, Solo. */
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
  // Vor der Gründung: kein „Rohbau“ oben; ohne Namen sagt der Knopf, was fehlt
  if (await page.locator('.energy-mini').count()) problems.push(`${tag('gruendung')}: Energie-Balken vor der Gründung sichtbar`);
  await page.locator('#btn-found', { hasText: 'Erst Namen wählen' }).click();
  if (!(await page.locator('.card.need').count())) problems.push(`${tag('gruendung')}: Namens-Kasten ohne Hervorhebung`);
  if (await page.evaluate(() => window.CREW.state.crew.founded)) problems.push(`${tag('gruendung')}: ohne Namen gegründet`);
  await page.locator('.chip').first().click();
  await page.locator('[data-look="pixel"]').click();
  await shot(page, tag('02-gruendung-pixel'));
  await page.locator('[data-look="arena"]').click();
  await clickText(page, 'Crew gründen');
  // Einmal nach der Gründung: „So geht CREW“ (3 Schritte), dann Start
  await waitText(page, 'So geht CREW');
  await shot(page, tag('02c-so-geht-crew'));
  problems.push(...await layoutCheck(page, tag('so-geht-crew')));
  if ((await page.locator('.howto-step').count()) !== 3) problems.push(`${tag('so-geht-crew')}: erwartet 3 Schritte`);
  await page.locator('#howto-go').click();
  await page.locator('.modal, #tile-session').first().waitFor();
  if (await page.evaluate(() => window.CREW.state.seen.howto !== true)) problems.push(`${tag('so-geht-crew')}: nicht als gesehen gespeichert`);

  // Start
  await page.locator('#tile-session').waitFor();
  await shot(page, tag('03-start'));
  problems.push(...await layoutCheck(page, tag('start')));

  // Session mit Steh auf
  await page.evaluate(() => window.CREW.debug.startMission('stehauf'));
  await waitText(page, 'Wie viele spielen heute mit?');
  await shot(page, tag('04-anzahl'));
  await clickText(page, 'Los geht');
  await waitText(page, 'Wetter-Check');
  await shot(page, tag('05-checkin'));
  problems.push(...await layoutCheck(page, tag('checkin')));
  await clickText(page, 'Alle bereit');
  await waitText(page, 'Was zeigt die Crew?', 8000);
  await shot(page, tag('06a-checkin-schnell'));
  problems.push(...await layoutCheck(page, tag('checkin-schnell')));
  await clickText(page, 'genauer zählen');
  await waitText(page, 'Wetter zählen', 5000);
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
  const N = await page.evaluate(() => window.CREW.state.lastCrewSize);
  // Karte zeigt „So geht's“ (3 Schritte), die Punkte-Regel und die Ehrlichkeits-Regel
  if ((await page.locator('.sa-how .howto-step').count()) !== 3) problems.push(`${tag('stehauf-karte')}: erwartet 3 Schritte „So geht's“`);
  if (!(await page.locator('.sa-score', { hasText: 'Genau richtig' }).count())) problems.push(`${tag('stehauf-karte')}: Punkte-Regel fehlt`);
  if (!(await page.getByText('nicht wegen der Zahl').count())) problems.push(`${tag('stehauf-karte')}: Ehrlichkeits-Regel fehlt`);
  if (!(await page.getByText('Sitzen bleiben ist immer okay').count())) problems.push(`${tag('stehauf-karte')}: „Sitzen bleiben ist immer okay“ fehlt`);
  for (let i = 0; i < 3; i++) {
    if (i === 2) await waitText(page, 'Goldene Karte', 5000);
    await clickText(page, 'Alle sind fertig');
    await waitText(page, 'Wie viele stehen?', 8000);
    if ((await page.locator('#sa-standrow button').count()) !== N + 1) problems.push(`${tag('stehen')}: erwartet Zahlen 0 bis ${N}`);
    if (i === 0) { await shot(page, tag('09-stehauf-stehen')); problems.push(...await layoutCheck(page, tag('stehen'))); }
    // Einmal verklickt: 3 statt 2, dann korrigieren
    if (i === 0) {
      await page.locator('#sa-standrow button', { hasText: /^3$/ }).click();
      await waitText(page, 'So viele stehen', 5000);
      await clickText(page, 'Zahl ändern');
      await waitText(page, 'Wie viele stehen?', 5000);
    }
    await page.locator('#sa-standrow button', { hasText: /^2$/ }).click();
    await waitText(page, 'So viele stehen', 5000);
    if ((await page.locator('.sa-bignum').textContent()).trim() !== '2') problems.push(`${tag('stehen-gross')}: große Zahl falsch`);
    if (i === 0) { await shot(page, tag('09b-stehauf-zahl-gross')); problems.push(...await layoutCheck(page, tag('stehen-gross'))); }
    await page.locator('#sa-show').click();
    await waitText(page, 'Zählt nur diese zwei', 8000);
    // Nur zwei Zähler, vorbelegt mit 0 – keine einzelnen Zahlen mehr eintippen
    if ((await page.locator('.sa-counter').count()) !== 2) problems.push(`${tag('zeigen')}: erwartet 2 Zähler`);
    if (await page.locator('.valuepad').count()) problems.push(`${tag('zeigen')}: altes Zahlenfeld noch da`);
    if (!(await page.locator('.sa-counter', { hasText: '1 oder 3' }).count())) problems.push(`${tag('zeigen')}: „1 daneben“ nennt nicht 1 oder 3`);
    await page.locator('#sa-exact-plus').click();
    await page.locator('#sa-exact-plus').click();
    await page.locator('#sa-near-plus').click();
    // Mehr Treffer als Leute geht nicht
    for (let k = 0; k < N + 2; k++) await page.locator('#sa-near-plus').click();
    const sum = await page.evaluate(() => [...document.querySelectorAll('.sa-cval')].reduce((a, e) => a + Number(e.textContent), 0));
    if (sum !== N) problems.push(`${tag('zeigen')}: Zähler zusammen ${sum} statt höchstens ${N}`);
    for (let k = 0; k < N - 3; k++) await page.locator('#sa-near-minus').click();
    if (i === 0) { await shot(page, tag('10a-stehauf-zeigen')); problems.push(...await layoutCheck(page, tag('zeigen'))); }
    await clickText(page, 'Auflösen');
    await waitText(page, 'Volltreffer', 5000);
    // 2 genau + 1 daneben = 5 Sterne (Goldene Karte ×2 = 10)
    const want = i === 2 ? 10 : 5;
    if ((await page.locator('.sa-starrow .sa-star').count()) !== want) problems.push(`${tag('aufloesung')}: erwartet ${want} Sterne`);
    if (!(await page.getByText('+' + want + ' Crew-Punkte').count())) problems.push(`${tag('aufloesung')}: erwartet +${want} Crew-Punkte`);
    if (!(await page.getByText('Wer steht, darf was sagen. Muss aber nicht.').count())) problems.push(`${tag('aufloesung')}: Satz „Wer steht, darf was sagen“ fehlt`);
    if (i === 0) { await page.waitForTimeout(400); await shot(page, tag('10-stehauf-aufloesung')); problems.push(...await layoutCheck(page, tag('aufloesung'))); }
    await clickText(page, i < 2 ? 'Nächste Karte' : 'Weiter');
  }
  await waitText(page, 'Blitzrunde', 5000);
  await clickText(page, 'Los!');
  await waitText(page, 'Nachspielzeit', 12000);
  await shot(page, tag('11-debrief'));
  problems.push(...await layoutCheck(page, tag('debrief')));
  await clickText(page, 'Fertig');
  await waitText(page, 'Energie', 5000);
  await page.waitForTimeout(600);
  await shot(page, tag('12-ergebnis'));
  // Level-up: Die Crew wählt A oder B, dann Glanz-Dialog
  const vote = page.locator('.modal button', { hasText: 'A:' });
  await vote.waitFor({ timeout: 5000 });
  await shot(page, tag('12b-wahl'));
  await vote.click();
  const stark = page.locator('.modal button', { hasText: 'Stark' });
  if (await stark.count()) { await shot(page, tag('13-levelup')); await stark.click(); }
  await clickText(page, 'Bis morgen');

  // Antwort-Karte
  await page.locator('#tile-paddle').click();
  await waitText(page, 'Antwort-Karte');
  await page.locator('[data-tab="zahl"]').click();
  await page.locator('.paddle-grid button').nth(7).click();
  await shot(page, tag('14-paddle'));
  problems.push(...await layoutCheck(page, tag('paddle')));
  // Zahl-Karte: Zeigen geht wie immer direkt (Radar & Co.)
  await clickText(page, 'Zeigen');
  await shot(page, tag('15-paddle-zeigen'));
  await page.locator('#btn-paddle-back').click();
  // Fertig sperrt und verdeckt die Zahl, ZEIGEN zeigt sie groß, danach ist alles zurückgesetzt
  await page.locator('.paddle-grid button').nth(3).click();
  await page.locator('#btn-lock').click();
  await waitText(page, 'Gesperrt', 3000);
  if (await page.locator('.paddle-grid').count()) problems.push(`${tag('paddle-gesperrt')}: Zahlen trotz Sperre wählbar`);
  if (await page.locator('.paddle', { hasText: /\b3\b/ }).count()) problems.push(`${tag('paddle-gesperrt')}: Zahl trotz Sperre sichtbar`);
  await shot(page, tag('15b-paddle-gesperrt'));
  problems.push(...await layoutCheck(page, tag('paddle-gesperrt')));
  await clickText(page, 'Zeigen');
  if ((await page.locator('.paddle-show .answer').textContent()).trim() !== '3') problems.push(`${tag('paddle-gesperrt')}: ZEIGEN zeigt nicht die gesperrte Zahl`);
  await shot(page, tag('15c-paddle-gesperrt-zeigen'));
  await page.locator('#btn-paddle-back', { hasText: 'Neue Runde' }).click();
  if (await page.locator('#paddle-locked').count() || !(await page.locator('.paddle-grid').count())) problems.push(`${tag('paddle-gesperrt')}: Neue Runde setzt nicht zurück`);
  // Andere Karten haben kein „Fertig“
  await page.locator('[data-tab="janein"]').click();
  await page.locator('.paddle-grid button').first().click();
  if (await page.locator('#btn-lock').count()) problems.push(`${tag('paddle')}: „Fertig“ auf der Ja/Nein-Karte`);
  await page.locator('[data-tab="wetter"]').click();
  await shot(page, tag('16-paddle-wetter'));
  problems.push(...await layoutCheck(page, tag('paddle-wetter')));

  // Schnellstart für Vertretung (ohne PIN)
  await page.locator('#btn-home').click();
  await page.locator('#tile-quick').click();
  await waitText(page, 'Schnellstart für Vertretung');
  if ((await page.locator('.modal .quick-steps li').count()) !== 5) problems.push(`${tag('schnellstart')}: erwartet 5 Schritte`);
  await shot(page, tag('16b-schnellstart'));
  await page.locator('.modal button', { hasText: 'Alles klar' }).click();

  // Lehrermodus
  await page.locator('#tile-teacher').click();
  for (const d of ['1', '2', '3', '4']) await page.locator('.valuepad button', { hasText: new RegExp('^' + d + '$') }).click();
  // Start-PIN: erst eine eigene PIN festlegen
  await page.locator('#t-newpin').fill('2468');
  await page.locator('.modal button', { hasText: 'PIN speichern' }).click();
  await waitText(page, 'Missionen');
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

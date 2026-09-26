/* Test: Mission „Gefühls-Radar“ (radar) – komplett durchspielen auf iPad quer/hoch und Handy.
   Aufruf:  CREW_DIST=<ordner> CREW_SHOTS=<ordner> node crew/tests/radar.mjs
   Prüft: Inhalte, Layout an jedem wichtigen Bildschirm, X-Karte mitten in der Mission, Seitenfehler. */
import { launch, shot, clickText, waitText, layoutCheck, fresh, VIEWPORTS } from './lib.mjs';

const problems = [];
const EMO = ['Wut', 'Angst', 'Trauer', 'Freude', 'Scham', 'Stolz', 'Ekel', 'Überraschung'];

// Kleiner Helfer: Zahl im Zahlenfeld antippen
async function tapValue(page, n) {
  await page.locator('.valuepad button', { hasText: new RegExp('^' + n + '$') }).first().click();
  await page.waitForTimeout(40);
}
async function tallyPlus(page, idx, times = 1) {
  const plus = page.locator('.tally .t-item').nth(idx).locator('button').nth(1);
  for (let i = 0; i < times; i++) await plus.click();
}
async function eyebrow(page) {
  return page.locator('.radar-head .eyebrow').first().textContent();
}
async function sayText(page) {
  return (await page.locator('.bigcard .say').first().textContent()).trim();
}
function expect(cond, msg) { if (!cond) problems.push(msg); }

const RUNS = [
  ['ipadLandscape', VIEWPORTS.ipadLandscape, 'arena'],
  ['ipadPortrait', VIEWPORTS.ipadPortrait, 'neon'],
  ['phone', VIEWPORTS.phone, 'pixel'],
];

for (const [vpName, vp, look] of RUNS) {
  const { browser, page, errors } = await launch(vp);
  const tag = (n) => `radar-${vpName}-${n}`;
  const check = async (n) => problems.push(...await layoutCheck(page, tag(n)));
  try {
    await fresh(page, look);

    // Inhalte prüfen (nur einmal nötig, schadet aber nicht)
    const content = await page.evaluate((EMO) => {
      const pool = window.CREW.content.radar || [];
      const ids = new Set(pool.map((c) => c.id));
      const bad = pool.filter((c) => !c.id || !c.text || !Array.isArray(c.gefuehle) || !c.gefuehle.length || c.gefuehle.some((g) => !EMO.includes(g)));
      const longWords = pool.filter((c) => c.text.split(/[.!?]\s/).some((s) => s.split(/\s+/).length > 15));
      const names = pool.filter((c) => /\b(Alex|Ben|Chase|Jason)\b/.test(c.text));
      const m = window.CREW.missions.find((x) => x.id === 'radar');
      return {
        n: pool.length, unique: ids.size === pool.length, heikel: pool.filter((c) => c.heikel).length,
        bad: bad.map((c) => c.id), long: longWords.map((c) => c.id), names: names.map((c) => c.id),
        mission: !!m, day: m && m.day, debrief: m && m.debrief.length, eldib: m && m.eldib.length,
      };
    }, EMO);
    expect(content.n >= 40, `Nur ${content.n} Situationen (mind. 40)`);
    expect(content.unique, 'IDs der Situationen nicht eindeutig');
    expect(!content.bad.length, 'Ungültige Situationen: ' + content.bad.join(','));
    expect(!content.long.length, 'Sätze mit mehr als 15 Wörtern: ' + content.long.join(','));
    expect(!content.names.length, 'Verbotene Namen: ' + content.names.join(','));
    expect(content.mission && content.day === 2, 'Mission radar fehlt oder falscher Tag');
    expect(content.debrief >= 5 && content.debrief <= 8, 'Debrief: 5–8 Fragen erwartet');
    expect(content.eldib >= 3 && content.eldib <= 5, 'ELDiB: 3–5 Codes erwartet');
    if (vpName === 'ipadLandscape') console.log('Inhalte:', JSON.stringify(content));

    // Session starten (Crew-Größe 5 ist Standard)
    await page.evaluate(() => { window.CREW.debug.startMission('radar'); });
    await waitText(page, 'Wie viele spielen heute mit?');
    await clickText(page, 'Los geht');
    await waitText(page, 'inneres Wetter');
    await clickText(page, 'Überspringen');

    // Intro
    await waitText(page, 'Gleiche Situation. Gleiches Gefühl?', 8000);
    await shot(page, tag('01-intro'), 900);
    await check('intro');
    await clickText(page, 'Radar an');

    /* ---------- Runde 1: alles mit Wort-Upgrade, Volltreffer ---------- */
    await waitText(page, 'Welches Gefühl?', 8000);
    expect((await eyebrow(page)).includes('Runde 1 von 4'), 'Runde 1: falsche Anzeige');
    await shot(page, tag('02-situation'));
    await check('situation');
    await clickText(page, 'Alle bereit');
    await waitText(page, 'Was zeigt die Crew?', 8000);
    await tallyPlus(page, 0, 2); // Wut
    await tallyPlus(page, 1, 1); // Angst
    await tallyPlus(page, 3, 1); // Freude
    await shot(page, tag('03-tally'));
    await check('tally');
    await clickText(page, 'Mix zeigen');
    await waitText(page, '3 verschiedene Gefühle', 5000);
    await shot(page, tag('04-mix'), 1300);
    await check('mix');
    await clickText(page, 'Wort-Upgrade');
    await waitText(page, 'Wut hat Stufen', 5000);
    await page.locator('.radar-word').nth(2).click();
    await shot(page, tag('05-upgrade'));
    await check('upgrade');
    // Anderes Gefühl wählen
    await page.locator('.radar-switch .chip').first().click();
    await waitText(page, 'Angst hat Stufen', 5000);
    await clickText(page, 'Weiter');
    await waitText(page, 'Wie stark?', 5000);
    await waitText(page, 'direkt links von der Lehrkraft');
    await shot(page, tag('06-profi'), 700);
    await check('profi');
    await clickText(page, 'Zeigt her');
    await waitText(page, 'Welche Zahlen seht ihr?', 8000);
    for (const n of [5, 6, 4, 5, 5]) await tapValue(page, n);
    await shot(page, tag('07-werte'));
    await check('werte');
    await clickText(page, 'Radar starten');
    await page.locator('.radar-verdict.on').waitFor({ timeout: 8000 });
    await waitText(page, 'Volltreffer!', 3000);
    await shot(page, tag('08-radar-treffer'), 1900);
    await check('radar-treffer');
    await clickText(page, 'Nächste Runde');

    /* ---------- Runde 2: X-Karte beim Lesen → neue Situation, gleiche Runde ---------- */
    await waitText(page, 'Welches Gefühl?', 8000);
    expect((await eyebrow(page)).includes('Runde 2 von 4'), 'Runde 2: falsche Anzeige');
    const before = await sayText(page);
    await page.locator('#btn-x').click();
    await page.waitForTimeout(250);
    await waitText(page, 'Welches Gefühl?', 5000);
    const after = await sayText(page);
    expect(before !== after, 'X-Karte: Situation hat nicht gewechselt');
    expect((await eyebrow(page)).includes('Runde 2 von 4'), 'X-Karte: Runde sollte gleich bleiben');
    await shot(page, tag('09-nach-xkarte'));
    await clickText(page, 'Alle bereit');
    await waitText(page, 'Was zeigt die Crew?', 8000);
    await tallyPlus(page, 5, 5); // alle Stolz
    await clickText(page, 'Mix zeigen');
    await waitText(page, 'Alle auf einer Welle', 5000);
    await shot(page, tag('10-mix-welle'), 1300);
    await clickText(page, 'Wie stark?');
    await waitText(page, 'Die nächste Person links davon', 5000);
    await page.locator('#radar-tipp .stepper button').nth(1).click(); // Tipp 6
    await clickText(page, 'Zeigt her');
    await waitText(page, 'Welche Zahlen seht ihr?', 8000);
    for (const n of [9, 10, 8, 9, 2]) await tapValue(page, n);
    await clickText(page, 'Radar starten');
    await page.locator('.radar-verdict.on').waitFor({ timeout: 8000 });
    await waitText(page, 'Knapp dran', 3000);
    await shot(page, tag('11-radar-knapp'), 1900);
    await check('radar-knapp');
    await clickText(page, 'Nächste Runde');

    /* ---------- Runde 3: X-Karte mitten in „Wie stark?“ → Runde 4 geht weiter ---------- */
    await waitText(page, 'Welches Gefühl?', 8000);
    expect((await eyebrow(page)).includes('Runde 3 von 4'), 'Runde 3: falsche Anzeige');
    await clickText(page, 'Alle bereit');
    await waitText(page, 'Was zeigt die Crew?', 8000);
    await tallyPlus(page, 6, 1); await tallyPlus(page, 7, 2); await tallyPlus(page, 4, 1);
    await clickText(page, 'Mix zeigen');
    await clickText(page, 'Wie stark?');
    await clickText(page, 'Zeigt her');
    await waitText(page, 'Welche Zahlen seht ihr?', 8000);
    await tapValue(page, 3);
    await page.locator('#btn-x').click();
    await page.waitForTimeout(250);

    /* ---------- Runde 4: Zählen überspringen, schwächer als gedacht ---------- */
    await waitText(page, 'Welches Gefühl?', 8000);
    expect((await eyebrow(page)).includes('Runde 4 von 4'), 'Nach X-Karte in Runde 3 sollte Runde 4 kommen');
    await clickText(page, 'Alle bereit');
    await waitText(page, 'Was zeigt die Crew?', 8000);
    await clickText(page, 'Überspringen');
    await waitText(page, 'Wie stark?', 5000);
    await shot(page, tag('12-profi-runde4'), 700);
    await check('profi-runde4');
    await clickText(page, 'Zeigt her');
    await waitText(page, 'Welche Zahlen seht ihr?', 8000);
    for (const n of [1, 0, 2, 1, 1]) await tapValue(page, n);
    await clickText(page, 'Radar starten');
    await page.locator('.radar-verdict.on').waitFor({ timeout: 8000 });
    await waitText(page, 'Schwächer als gedacht', 3000);
    await shot(page, tag('13-radar-schwaecher'), 1900);
    await check('radar-schwaecher');
    await clickText(page, 'Zur Radar-Bilanz');

    // Bilanz
    await waitText(page, 'Radar-Bilanz', 5000);
    await shot(page, tag('14-bilanz'), 700);
    await check('bilanz');
    const tiles = await page.locator('.radar-tile .radar-big').allTextContents();
    expect(tiles[0] === '4', 'Bilanz: 4 Runden erwartet, gesehen ' + tiles[0]);
    expect(tiles[1] === '1', 'Bilanz: 1 Volltreffer erwartet, gesehen ' + tiles[1]);
    await clickText(page, 'Weiter');

    // Nachbesprechung & Energie
    await waitText(page, 'Kurz drüber reden', 5000);
    await shot(page, tag('15-debrief'));
    await check('debrief');
    await clickText(page, 'Fertig');
    await waitText(page, 'Energie', 5000);
    await page.waitForTimeout(700);
    await shot(page, tag('16-ergebnis'));
    const hist = await page.evaluate(() => window.CREW.state.history.slice(-1)[0]);
    expect(hist && hist.mission === 'radar', 'Kein Eintrag im Verlauf');
    expect(hist && hist.energy >= 5 && hist.energy <= 10, 'Energie außerhalb 5–10: ' + (hist && hist.energy));
    const stark = page.locator('.modal button', { hasText: 'Stark' });
    if (await stark.count()) await stark.click();
    await clickText(page, 'Bis morgen');
    await page.locator('#tile-session').waitFor();
  } catch (e) {
    problems.push(`${vpName}: Ablauf abgebrochen: ${e.message.split('\n')[0]}`);
    await shot(page, tag('99-fehler'), 100).catch(() => {});
  }
  problems.push(...errors.map((e) => `${vpName}: ${e}`));
  await browser.close();
}

// Heikle Karten: nur mit Freigabe
{
  const { browser, page, errors } = await launch(VIEWPORTS.ipadLandscape);
  await fresh(page, 'arena');
  const r = await page.evaluate(() => {
    const C = window.CREW;
    const off = C.pickContent('radar', 60).filter((x) => x.heikel).length;
    C.state.settings.sensitive = true; C.state.used = {};
    const on = C.pickContent('radar', 60).filter((x) => x.heikel).length;
    return { off, on };
  });
  expect(r.off === 0, 'Heikle Karten erscheinen ohne Freigabe');
  expect(r.on > 0, 'Heikle Karten erscheinen auch mit Freigabe nicht');
  problems.push(...errors);
  await browser.close();
}

if (problems.length) {
  console.log('PROBLEME:\n' + [...new Set(problems)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Gefühls-Radar OK – keine Fehler.');
}

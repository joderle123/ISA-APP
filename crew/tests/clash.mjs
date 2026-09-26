/* Test „Clash“ (Friedenstreppe): ganze Mission auf iPad quer + hoch + Handy (drei Looks),
   Zurückspulen, X-Karte mitten in der Mission, Solo-Variante und Inhaltsprüfung.
   Aufruf:  CREW_DIST=… CREW_SHOTS=… node crew/tests/clash.mjs */
import { launch, shot, clickText, waitText, layoutCheck, fresh, VIEWPORTS, closeLevelUp } from './lib.mjs';

const problems = [];
const RUNS = [
  { name: 'ipadLandscape', vp: VIEWPORTS.ipadLandscape, look: 'arena', solo: true, swap: true },
  { name: 'ipadPortrait', vp: VIEWPORTS.ipadPortrait, look: 'neon', solo: false, swap: false },
  { name: 'phone', vp: VIEWPORTS.phone, look: 'pixel', solo: true, swap: false },
];

/* Wartet, bis ein Clash-Bildschirm bedienbar ist, und liefert seinen Typ */
async function screenType(page, timeout = 10000) {
  const handle = await page.waitForFunction(() => {
    const w = document.querySelector('#stage .wrap');
    if (!w) return null;
    if (document.querySelector('#overlays .overlay')) return null; // Countdown/Zurückspulen läuft noch
    const t = w.dataset.clash;
    if (!t) {
      if (w.textContent.includes('Nachspielzeit')) return 'debrief';
      if (w.textContent.includes('Solo-Zone')) return 'solohub';
      return null;
    }
    if (t === 'turn' || t === 'joint') return w.querySelector('.clash-opt:not([disabled])') ? t : null;
    const last = w.lastElementChild;
    return last && last.querySelector('button.btn:not([disabled])') ? t : null;
  }, null, { timeout, polling: 60 });
  return handle.jsonValue();
}

const nowKey = (page) => page.evaluate(() => { const c = document.querySelector('.clash-hud .clash-cell.now'); return c ? c.dataset.key : null; });

async function pickKind(page, kind) {
  const loc = page.locator(`.clash-opt[data-kind="${kind}"]:not([disabled])`).first();
  await loc.click();
  await page.waitForTimeout(80);
}

/* Spielt die Stufen bis zum Finale. Gibt Infos zurück. */
async function playStairs(page, tag, opts) {
  const o = opts || {};
  const info = { turns: 0, joints: 0, rewinds: 0, xDone: false, results: 0 };
  let wantRewind = false;
  const shotOnce = new Set();
  for (let guard = 0; guard < 80; guard++) {
    const t = await screenType(page);
    if (t === 'turn' || t === 'joint') {
      const hasTried = await page.locator('.clash-opt.tried').count();
      if (t === 'turn' && !hasTried) info.turns++;
      if (t === 'joint' && !hasTried) info.joints++;
      if (!shotOnce.has(t) && !hasTried) {
        shotOnce.add(t);
        await shot(page, tag(t === 'turn' ? '04-stufe1' : '09-stufe4'), 500);
        problems.push(...await layoutCheck(page, tag(t)));
      }
      // X-Karte mitten in der Mission (3. Zug): Stufe wird übersprungen, Spiel läuft weiter
      if (o.pressX && t === 'turn' && info.turns === 3 && !info.xDone && !hasTried) {
        const before = await nowKey(page);
        await page.locator('#btn-x').click();
        const t2 = await screenType(page);
        const after = await nowKey(page);
        if (t2 !== 'turn' || !after || after === before) problems.push(`${tag('x')}: Nach X-Karte ging es nicht weiter (vorher ${before}, nachher ${t2}/${after})`);
        const skipped = await page.locator(`.clash-hud .clash-cell.skip[data-key="${before}"]`).count();
        if (!skipped) problems.push(`${tag('x')}: Übersprungene Stufe ${before} nicht markiert`);
        await shot(page, tag('07-nach-x'), 300);
        info.xDone = true;
        continue;
      }
      let kind;
      if (hasTried) kind = t === 'turn' ? 'ich' : (await page.locator('.clash-opt[data-kind="echt"]').count()) ? 'echt' : 'klar';
      else if (o.mixed && t === 'turn' && info.turns === 1) { kind = 'du'; wantRewind = true; }
      else if (o.mixed && t === 'turn' && info.turns === 2) kind = 'weg';
      else if (o.mixed && t === 'joint' && info.joints === 1) { kind = 'halb'; wantRewind = true; }
      else kind = t === 'turn' ? 'ich' : (await page.locator('.clash-opt[data-kind="echt"]').count()) ? 'echt' : 'klar';
      if (!(await page.locator(`.clash-opt[data-kind="${kind}"]`).count())) { problems.push(`${tag(t)}: Keine Antwort der Art ${kind}`); kind = null; }
      if (kind) await pickKind(page, kind);
      else await page.locator('.clash-opt').first().click();
    } else if (t === 'result') {
      info.results++;
      // X-Karte auf einem Wirkungs-Bildschirm (Stufe 3): zählt als übersprungen, Spiel läuft weiter
      if (o.pressXResult && info.turns === 5 && !info.xResult) {
        info.xResult = true;
        const key = await page.evaluate(() => { const c = document.querySelector('.clash-hud .clash-cell.now'); return c ? c.dataset.key : null; });
        await page.locator('#btn-x').click();
        const t2 = await screenType(page);
        if (t2 !== 'turn') problems.push(`${tag('x-result')}: Nach X auf Wirkung kein neuer Zug (${t2})`);
        if (!(await page.locator(`.clash-hud .clash-cell.skip[data-key="${key}"]`).count())) problems.push(`${tag('x-result')}: Stufe ${key} nicht als übersprungen markiert`);
        continue;
      }
      const hot = await page.locator('.clash-feedback.hot').count();
      const name = hot ? (wantRewind ? '05-folge-hitze' : '06-folge-ausweichen') : '08-folge-cool';
      if (!shotOnce.has(name)) {
        shotOnce.add(name);
        await shot(page, tag(name), 1100); // Hitze-Meter animiert (CSS)
        problems.push(...await layoutCheck(page, tag(name)));
      }
      if (hot && wantRewind) {
        wantRewind = false;
        info.rewinds++;
        await page.locator('#clash-rewind').click();
        if (info.rewinds === 1) {
          await page.locator('.clash-rewind').first().waitFor({ state: 'attached', timeout: 3000 }).catch(() => {});
          await shot(page, tag('05b-zurueckspulen'), 120);
        }
        const back = await screenType(page);
        if (back !== 'turn' && back !== 'joint') problems.push(`${tag('rewind')}: Nach Zurückspulen kein Auswahl-Bildschirm (${back})`);
        if (!(await page.locator('.clash-opt.tried').count())) problems.push(`${tag('rewind')}: Probierte Antwort nicht markiert`);
        if (info.rewinds === 1) await shot(page, tag('05c-nochmal'), 400);
      } else if (hot) {
        await clickText(page, 'Trotzdem weiter');
      } else {
        await clickText(page, 'Weiter');
      }
    } else if (t === 'finale') {
      await shot(page, tag('10-finale'), 1300);
      problems.push(...await layoutCheck(page, tag('finale')));
      const peace = await page.locator('.clash-peace').count();
      if (!peace) problems.push(`${tag('finale')}: Kein „Frieden!“`);
      await clickText(page, 'Weiter');
      return info;
    } else {
      problems.push(`${tag('loop')}: Unerwarteter Bildschirm ${t}`);
      return info;
    }
  }
  problems.push(`${tag('loop')}: Finale nicht erreicht`);
  return info;
}

/* ---------- Inhalte prüfen ---------- */
async function checkContent(page) {
  const res = await page.evaluate(() => {
    const out = [];
    const C = window.CREW.content.clash || [];
    const m = window.CREW.missions.find((x) => x.id === 'clash');
    if (!m) out.push('Mission clash nicht registriert');
    else {
      if (m.day !== 3) out.push('Mission clash: day ist nicht 3');
      if (!(m.debrief.length >= 5 && m.debrief.length <= 8)) out.push('Mission clash: 5–8 Debrief-Fragen nötig');
      if (!(m.eldib.length >= 3 && m.eldib.length <= 5)) out.push('Mission clash: 3–5 ELDiB-Codes nötig');
    }
    if (!window.CREW.soloGames.find((x) => x.id === 'clash')) out.push('Solo clash nicht registriert');
    if (C.length < 6) out.push('Weniger als 6 Szenen: ' + C.length);
    const ids = new Set();
    const texts = [];
    const add = (where, s) => { if (typeof s !== 'string' || !s.trim()) out.push(where + ': Text fehlt'); else texts.push([where, s]); };
    C.forEach((sc) => {
      const w = sc.id;
      if (ids.has(sc.id)) out.push('Doppelte ID ' + sc.id);
      ids.add(sc.id);
      add(w + '.title', sc.title);
      ['personA', 'personB'].forEach((p) => { if (!sc[p] || !sc[p].name || !sc[p].color) out.push(w + ': ' + p + ' unvollständig'); });
      if (!(sc.intro.length >= 3 && sc.intro.length <= 4)) out.push(w + ': 3–4 Intro-Blasen nötig');
      sc.intro.forEach((b, i) => { if (!['A', 'B'].includes(b.who)) out.push(w + '.intro' + i + ': who'); add(w + '.intro' + i, b.text); });
      [1, 2, 3].forEach((s) => ['A', 'B'].forEach((side) => {
        const list = (sc.steps[s] || {})[side] || [];
        const kinds = list.map((o) => o.kind).sort().join(',');
        if (kinds !== 'du,ich,weg') out.push(`${w}.steps.${s}.${side}: braucht genau ich/du/weg (hat ${kinds})`);
        list.forEach((o, i) => {
          add(`${w}.${s}${side}${i}`, o.text); add(`${w}.${s}${side}${i}.reaction`, o.reaction);
          if (typeof o.heat !== 'number') out.push(`${w}.${s}${side}${i}: heat fehlt`);
          if (o.kind === 'ich' && o.heat >= 0) out.push(`${w}.${s}${side}${i}: Ich-Botschaft muss Hitze senken`);
          if (o.kind !== 'ich' && o.heat <= 0) out.push(`${w}.${s}${side}${i}: Vorwurf/Ausweichen muss Hitze erhöhen`);
        });
      }));
      [['versoehnung', 'echt', 'halb'], ['vereinbarung', 'klar', 'vage']].forEach(([k, good, weak]) => {
        const list = sc[k] || [];
        if (!(list.length >= 3 && list.length <= 4)) out.push(w + '.' + k + ': 3–4 Einträge nötig');
        if (!list.some((o) => o.kind === good)) out.push(w + '.' + k + ': kein ' + good);
        list.forEach((o, i) => {
          if (![good, weak].includes(o.kind)) out.push(`${w}.${k}${i}: kind ${o.kind}`);
          if (!['A', 'B'].includes(o.by)) out.push(`${w}.${k}${i}: by`);
          add(`${w}.${k}${i}`, o.text); add(`${w}.${k}${i}.reaction`, o.reaction);
        });
      });
    });
    const all = JSON.stringify(C) + JSON.stringify(m || {});
    ['Alex', 'Ben', 'Chase', 'Jason'].forEach((n) => { if (new RegExp('\\b' + n + '\\b').test(all)) out.push('Verbotener Name: ' + n); });
    // Kurze Sätze (max. 15 Wörter)
    texts.forEach(([where, s]) => {
      s.split(/(?<=[.!?])\s+/).forEach((sent) => {
        const words = sent.split(/\s+/).filter((x) => /[\wÄÖÜäöüß]/.test(x)).length;
        if (words > 15) out.push(`${where}: Satz zu lang (${words} Wörter): ${sent}`);
      });
    });
    return { out, scenes: C.length, options: C.length * 18, texts: texts.length };
  });
  problems.push(...res.out);
  return res;
}

let contentInfo = null;
const energies = [];
for (const run of RUNS) {
  const { browser, page, errors } = await launch(run.vp);
  const tag = (n) => `clash-${run.name}-${n}`;
  await fresh(page, run.look);
  if (!contentInfo) contentInfo = await checkContent(page);

  // Session starten, Check-in überspringen → Mission startet direkt
  await page.evaluate(() => { window.CREW.debug.startMission('clash'); });
  await clickText(page, 'Los geht');
  await waitText(page, 'Wetter-Check');
  await clickText(page, 'Überspringen');

  // Comic-Intro
  let t = await screenType(page);
  if (t !== 'intro') problems.push(`${tag('intro')}: erwartet intro, bekam ${t}`);
  const bubbles = await page.locator('.clash-bubble').count();
  if (bubbles < 3) problems.push(`${tag('intro')}: nur ${bubbles} Sprechblasen`);
  await shot(page, tag('01-intro'), 700);
  problems.push(...await layoutCheck(page, tag('intro')));
  if (run.swap) {
    const title1 = await page.locator('#stage h2').first().textContent();
    await clickText(page, 'Andere Szene');
    t = await screenType(page);
    const title2 = await page.locator('#stage h2').first().textContent();
    if (t !== 'intro' || title1 === title2) problems.push(`${tag('swap')}: Andere Szene hat nicht gewechselt (${title1} → ${title2})`);
    await shot(page, tag('02-andere-szene'), 600);
  }
  await clickText(page, 'Clash lösen');

  // Crew aufteilen
  t = await screenType(page);
  if (t !== 'crew') problems.push(`${tag('crew')}: erwartet crew, bekam ${t}`);
  await shot(page, tag('03-teams'), 500);
  problems.push(...await layoutCheck(page, tag('crew')));
  // 3-2-1 einmal ausprobieren (auf dem ersten Zug)
  await clickText(page, 'Los: Stufe 1');
  if (run.name === 'ipadLandscape') {
    await screenType(page);
    await page.locator('#clash-321').click();
    await shot(page, tag('04a-321'), 40);
  }

  const info = await playStairs(page, tag, { mixed: true, pressX: true, pressXResult: run.name === 'ipadPortrait' });
  if (run.name === 'ipadPortrait' && !info.xResult) problems.push(`${tag('x-result')}: X auf Wirkung nicht getestet`);
  if (info.turns < 5) problems.push(`${tag('turns')}: nur ${info.turns} Züge auf Stufe 1–3`);
  if (info.joints !== 2) problems.push(`${tag('joints')}: ${info.joints} gemeinsame Stufen statt 2`);
  if (info.rewinds < 2) problems.push(`${tag('rewind')}: Zurückspulen nur ${info.rewinds}×`);
  if (!info.xDone) problems.push(`${tag('x')}: X-Karte nicht getestet`);

  // Nachbesprechung + Energie
  t = await screenType(page);
  if (t !== 'debrief') problems.push(`${tag('debrief')}: erwartet Nachbesprechung, bekam ${t}`);
  await shot(page, tag('11-debrief'), 400);
  problems.push(...await layoutCheck(page, tag('debrief')));
  await clickText(page, 'Fertig');
  await waitText(page, 'Energie', 5000);
  await page.waitForTimeout(1500);
  await shot(page, tag('12-ergebnis'), 200);
  const last = await page.evaluate(() => window.CREW.state.history[window.CREW.state.history.length - 1]);
  if (!last || last.mission !== 'clash') problems.push(`${tag('energie')}: Kein Verlaufseintrag`);
  else {
    energies.push(last.energy);
    if (last.energy < 5 || last.energy > 10) problems.push(`${tag('energie')}: Energie ${last.energy} nicht in 5–10`);
  }
  await closeLevelUp(page);
  await clickText(page, 'Bis morgen');

  // Solo-Variante
  if (run.solo) {
    await page.evaluate(() => { window.CREW.debug.startSolo('clash'); });
    t = await screenType(page);
    if (t !== 'intro') problems.push(`${tag('solo')}: erwartet intro, bekam ${t}`);
    const eyebrow = await page.locator('#stage .eyebrow').first().textContent();
    if (!/Solo/.test(eyebrow)) problems.push(`${tag('solo')}: Kein Solo-Hinweis im Intro`);
    await clickText(page, 'Clash lösen');
    t = await screenType(page);
    await shot(page, tag('13-solo-start'), 400);
    problems.push(...await layoutCheck(page, tag('solo-start')));
    if (await page.locator('.paddle-hint').count()) problems.push(`${tag('solo')}: Antwort-Karten-Hinweis im Solo`);
    await clickText(page, 'Los: Stufe 1');
    await screenType(page);
    await shot(page, tag('14-solo-zug'), 400);
    problems.push(...await layoutCheck(page, tag('solo-zug')));
    await playStairs(page, (n) => tag('solo-' + n), { mixed: false, pressX: false });
    t = await screenType(page);
    if (t !== 'solo-end') problems.push(`${tag('solo')}: erwartet Solo-Ende, bekam ${t}`);
    await shot(page, tag('15-solo-ende'), 900);
    problems.push(...await layoutCheck(page, tag('solo-ende')));
    const best = await page.evaluate(() => window.CREW.state.solo['clash:cool']);
    if (best !== 8) problems.push(`${tag('solo')}: Bestwert sollte 8 sein, ist ${best}`);
    await clickText(page, 'Fertig');
    t = await screenType(page);
    if (t !== 'solohub') problems.push(`${tag('solo')}: nach Fertig nicht in der Solo-Zone (${t})`);
  }

  problems.push(...errors.map((e) => `${run.name}: ${e}`));
  await browser.close();
}

console.log(`Inhalte: ${contentInfo ? contentInfo.scenes : 0} Szenen, ${contentInfo ? contentInfo.texts : 0} Texte geprüft. Energie je Lauf: ${energies.join(', ')}`);
if (problems.length) {
  console.log('PROBLEME:\n' + [...new Set(problems)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Clash-Test OK – keine Fehler.');
}

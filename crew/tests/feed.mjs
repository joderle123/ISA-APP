/* Test „Feed-Check“ (Mission Donnerstag): ganze Mission auf iPad quer + hoch + Handy (drei Looks),
   alle vier Rundentypen, Eingabe der Lehrkraft, „Alle Wege“, X-Karte mitten in der Mission,
   Ende mit BEE SECURE, Solo-Variante und Inhaltsprüfung.
   Aufruf:  CREW_DIST=… CREW_SHOTS=… node crew/tests/feed.mjs */
import { launch, shot, layoutCheck, fresh, clickText, waitText, VIEWPORTS } from './lib.mjs';

const problems = [];
const RUNS = [
  { name: 'ipadLandscape', vp: VIEWPORTS.ipadLandscape, look: 'arena', solo: true, splash: true, xKette: false },
  { name: 'ipadPortrait', vp: VIEWPORTS.ipadPortrait, look: 'neon', solo: false, heikel: true, xKette: false },
  { name: 'phone', vp: VIEWPORTS.phone, look: 'pixel', solo: true, xKette: true },
];

/* Wartet, bis ein neuer, bedienbarer Feed-Bildschirm da ist (kein Overlay, neue Sequenznummer) */
async function nextStage(page, lastSeq, timeout = 12000) {
  const handle = await page.waitForFunction((last) => {
    if (document.querySelector('#overlays .overlay')) return null; // 3-2-1, Übergang, Dialog
    const w = document.querySelector('#stage .wrap');
    if (!w) return null;
    const st = w.dataset.feed;
    const seq = Number(w.dataset.seq || 0);
    if (!st) {
      if (w.textContent.includes('Kurz drüber reden')) return { stage: 'debrief', seq: last + 1 };
      if (w.textContent.includes('Solo-Zone')) return { stage: 'solohub', seq: last + 1 };
      return null;
    }
    if (seq <= last || /-(intro|wait)$/.test(st)) return null;
    const btn = w.querySelector('button:not([disabled])');
    return btn ? { stage: st, seq } : null;
  }, lastSeq, { timeout, polling: 50 });
  return handle.jsonValue();
}
const eyebrow = (page) => page.evaluate(() => { const e = document.querySelector('#stage .feed-hud .eyebrow'); return e ? e.textContent : ''; });
const click = async (page, sel) => { await page.locator(sel).first().click(); await page.waitForTimeout(60); };

/* Langsame Zeit für einen Moment (Übergangs-Bildschirm fotografieren) */
async function slowTime(page, on) {
  await page.evaluate((on) => {
    if (on) {
      window.__fastST = window.setTimeout;
      window.setTimeout = (fn, ms, ...a) => { const t0 = performance.now(); const tick = () => (performance.now() - t0 >= (ms || 0) ? fn(...a) : requestAnimationFrame(tick)); requestAnimationFrame(tick); return 0; };
    } else if (window.__fastST) window.setTimeout = window.__fastST;
  }, on);
}

/* Spielt eine Mission oder ein Solo-Spiel bis zum Schluss */
async function playThrough(page, tag, run, solo) {
  const info = { types: new Set(), stages: [], xFakt: false, xKette: false, allWays: 0, keSteps: 0, splashShot: false, endOk: false, soloPts: null };
  let seq = 0;
  const seen = new Set();
  let n = 0;
  let faktAsks = 0;
  for (let guard = 0; guard < 140; guard++) {
    const { stage: s, seq: q } = await nextStage(page, seq);
    seq = q;
    info.stages.push(s);
    if (s === 'debrief' || s === 'solohub') return info;
    const type = s.split('-')[0];
    if (['fakt', 'tun', 'kette', 'druck'].includes(type)) info.types.add(type);
    if (!seen.has(s)) {
      seen.add(s);
      n++;
      await shot(page, tag(String(n).padStart(2, '0') + '-' + s), /-(out|done)$|^end$|solo-end/.test(s) ? 1400 : 500);
      problems.push(...await layoutCheck(page, tag(s)));
    }
    switch (s) {
      case 'intro': {
        const notis = await page.locator('.feed-noti').count();
        if (!notis) problems.push(`${tag('intro')}: keine Benachrichtigungen auf dem Sperrbildschirm`);
        await click(page, '#feed-go');
        break;
      }
      case 'fakt-ask': {
        faktAsks++;
        const eb = await eyebrow(page);
        // X-Karte beim 2. Kommentar: Kommentar wird übersprungen, Spiel läuft weiter
        if (faktAsks === 2 && !info.xFakt) {
          if (!/Kommentar 2 von 3/.test(eb)) problems.push(`${tag('x')}: erwartet Kommentar 2, war „${eb}“`);
          await page.locator('#btn-x').click();
          const nx = await nextStage(page, seq);
          seq = nx.seq;
          const eb2 = await eyebrow(page);
          if (nx.stage !== 'fakt-ask' || !/Kommentar 3 von 3/.test(eb2)) problems.push(`${tag('x')}: Nach X-Karte nicht bei Kommentar 3 (${nx.stage}, „${eb2}“)`);
          const skipped = await page.locator('.feed-cmt.skipped').count();
          if (!skipped) problems.push(`${tag('x')}: übersprungener Kommentar nicht markiert`);
          await shot(page, tag('xx-nach-x-karte'), 300);
          info.xFakt = true;
          // Jetzt normal weiter mit Kommentar 3
        }
        if (solo) await click(page, '#feed-solo-F');
        else await click(page, '#feed-show');
        break;
      }
      case 'fakt-call':
        await click(page, '.feed-seg[data-team="A"][data-v="F"]');
        await click(page, '.feed-seg[data-team="B"][data-v="M"]');
        if (!seen.has('fakt-call-sel')) { seen.add('fakt-call-sel'); await shot(page, tag('02b-fakt-call-auswahl'), 150); }
        await click(page, '#feed-reveal');
        break;
      case 'tun-ask': case 'druck-ask': case 'kette-ask':
        if (solo) {
          const sel = s === 'tun-ask' ? '.feed-opt[data-p="3"]' : s === 'druck-ask' ? '.feed-opt[data-k="cool"]' : '.feed-opt[data-k="stark"]';
          await click(page, sel);
        } else await click(page, '#feed-show');
        break;
      case 'tun-call': case 'druck-call': case 'kette-call': {
        // Team A zeigt A, Team B zeigt C → zwei verschiedene Folgen
        await click(page, '.feed-seg[data-team="A"][data-v="A"]');
        await click(page, '.feed-seg[data-team="B"][data-v="C"]');
        await click(page, '#feed-reveal');
        break;
      }
      case 'fakt-done':
        await click(page, '#feed-next');
        break;
      case 'tun-out': case 'druck-out': case 'kette-out': {
        const outs = await page.locator('.feed-out').count();
        if (!outs) problems.push(`${tag(s)}: keine Folgen-Karte`);
        if (s === 'druck-out' && !(await page.locator('.feed-nein-l').count())) problems.push(`${tag(s)}: keine Nein-Sätze`);
        if (s === 'kette-out' && !(await page.locator('.feed-truth').count())) problems.push(`${tag(s)}: „Was wirklich war“ fehlt`);
        if (s === 'tun-out' && !solo) {
          const cards = await page.locator('.feed-out[data-p]').count();
          if (cards !== 2) problems.push(`${tag(s)}: erwartet 2 Folgen-Karten, sind ${cards}`);
        }
        if (!info.allWays && (await page.locator('#feed-all').count())) {
          await click(page, '#feed-all');
          await page.locator('.modal .feed-way').first().waitFor({ state: 'visible', timeout: 3000 });
          const ways = await page.locator('.modal .feed-way').count();
          if (ways !== 4) problems.push(`${tag(s)}: „Alle Wege“ zeigt ${ways} statt 4`);
          await shot(page, tag('xx-alle-wege'), 350);
          await page.locator('.modal button', { hasText: 'Schließen' }).click();
          await page.waitForTimeout(80);
          info.allWays++;
        }
        // Übergang zur nächsten Runde einmal langsam fotografieren
        if (run.splash && !info.splashShot) {
          await slowTime(page, true);
          await click(page, '#feed-next');
          await page.locator('.feed-splash').waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
          await page.waitForTimeout(420);
          await shot(page, tag('xx-uebergang'), 0);
          await slowTime(page, false);
          info.splashShot = true;
        } else await click(page, '#feed-next');
        break;
      }
      case 'kette-step': {
        info.keSteps++;
        const k = info.keSteps;
        if (run.xKette && !solo && k === 2 && !info.xKette) {
          // X-Karte mitten in der Kette: die Runde wird übersprungen, die nächste startet
          const before = await eyebrow(page);
          await page.locator('#btn-x').click();
          const nx = await nextStage(page, seq);
          seq = nx.seq;
          const after = await eyebrow(page);
          if (!nx.stage.startsWith('druck') || before === after) problems.push(`${tag('x-kette')}: Nach X-Karte keine neue Runde (${nx.stage}, „${before}“ → „${after}“)`);
          await shot(page, tag('xx-nach-x-kette'), 300);
          info.xKette = true;
          await click(page, '#feed-show');
          break;
        }
        if (k > 1 && !solo) await shot(page, tag('04-kette-schritt-' + k), 450);
        if (solo) await click(page, k === 2 ? '#feed-solo-stop' : '#feed-solo-go');
        else {
          if (k === 2) await click(page, '.feed-toggle[data-team="A"]');
          if (k === 3) await click(page, '.feed-toggle[data-team="B"]');
          if (k === 2 || k === 3) await shot(page, tag('04-kette-stopp-' + k), 150);
          await click(page, '#feed-next');
        }
        break;
      }
      case 'end': {
        const txt = await page.locator('#stage').textContent();
        if (!/BEE SECURE/.test(txt) || !/8002 1234/.test(txt)) problems.push(`${tag('end')}: BEE SECURE Helpline fehlt`);
        const sums = await page.evaluate(() => {
          const t = [...document.querySelectorAll('.feed-formula .feed-sc b')].map((b) => Number(b.textContent));
          return { teams: t, crew: Number(document.querySelector('.feed-endnum').textContent) };
        });
        if (sums.teams.length !== 2 || sums.teams[0] + sums.teams[1] !== sums.crew) problems.push(`${tag('end')}: Crew-Summe stimmt nicht (${JSON.stringify(sums)})`);
        info.endOk = true;
        await click(page, '#feed-next');
        break;
      }
      case 'solo-end': {
        info.soloPts = await page.evaluate(() => Number(document.querySelector('.feed-endnum').textContent));
        await click(page, '#feed-done');
        break;
      }
      default:
        problems.push(`${tag('loop')}: unbekannter Bildschirm ${s}`);
        return info;
    }
  }
  problems.push(`${tag('loop')}: Ende nicht erreicht`);
  return info;
}

/* ---------- Inhalte prüfen ---------- */
async function checkContent(page) {
  const res = await page.evaluate(() => {
    const out = [];
    const C = window.CREW.content.feed || [];
    const m = window.CREW.missions.find((x) => x.id === 'feed');
    if (!m) out.push('Mission feed nicht registriert');
    else {
      if (m.day !== 4) out.push('Mission feed: day ist nicht 4');
      if (!(m.debrief.length >= 5 && m.debrief.length <= 8)) out.push('Mission feed: 5–8 Debrief-Fragen nötig');
      if (!(m.eldib.length >= 3 && m.eldib.length <= 5)) out.push('Mission feed: 3–5 ELDiB-Codes nötig');
      m.eldib.forEach((e) => { if (!/^(V|K|SOZ|KOG)-\d+$/.test(e.code)) out.push('ELDiB-Code ungültig: ' + e.code); });
    }
    if (!window.CREW.soloGames.find((x) => x.id === 'feed')) out.push('Solo feed nicht registriert');
    const count = (t) => C.filter((x) => x.type === t).length;
    const cnt = { fakt: count('fakt'), tun: count('tun'), kette: count('kette'), druck: count('druck') };
    if (C.length < 20) out.push('Weniger als 20 Runden: ' + C.length);
    if (cnt.fakt < 6 || cnt.tun < 8 || cnt.kette < 5 || cnt.druck < 6) out.push('Zu wenige Runden je Typ: ' + JSON.stringify(cnt));
    // Ohne heikle Karten muss jeder Typ genug für mehrere Sessions haben
    ['fakt', 'tun', 'kette', 'druck'].forEach((t) => { if (C.filter((x) => x.type === t && !x.heikel).length < 4) out.push('Zu wenige nicht-heikle Runden: ' + t); });
    const ids = new Set();
    const texts = [];
    const add = (w, s) => { if (typeof s !== 'string' || !s.trim()) out.push(w + ': Text fehlt'); else texts.push([w, s]); };
    C.forEach((c) => {
      const w = c.id;
      if (ids.has(c.id)) out.push('Doppelte ID ' + c.id);
      ids.add(c.id);
      if (c.type === 'fakt') {
        add(w + '.post', c.post && c.post.text);
        if (!c.items || c.items.length !== 3) out.push(w + ': genau 3 Kommentare nötig');
        (c.items || []).forEach((it, i) => { add(w + '.' + i, it.text); add(w + '.' + i + '.why', it.why); if (typeof it.fakt !== 'boolean') out.push(w + '.' + i + ': fakt fehlt'); if (!it.von) out.push(w + '.' + i + ': von fehlt'); });
        if (!(c.items || []).some((x) => x.fakt) || !(c.items || []).some((x) => !x.fakt)) out.push(w + ': braucht Fakt UND Meinung');
      } else if (c.type === 'tun') {
        add(w + '.lage', c.lage); add(w + '.ziel', c.ziel);
        if (!c.zahl || !c.zahl.label || typeof c.zahl.start !== 'number') out.push(w + ': zahl fehlt');
        if (!c.szene || !['chat', 'post'].includes(c.szene.art)) out.push(w + ': szene fehlt');
        else if (c.szene.art === 'chat') { if (!(c.szene.msgs && c.szene.msgs.length >= 2)) out.push(w + ': zu wenige Nachrichten'); c.szene.msgs.forEach((x, i) => { if (x.text) add(w + '.msg' + i, x.text); }); }
        else add(w + '.post', c.szene.text);
        if (!c.opts || c.opts.length !== 4) out.push(w + ': genau 4 Wege nötig');
        (c.opts || []).forEach((o, i) => {
          add(w + '.o' + i, o.t); add(w + '.o' + i + '.line', o.line);
          if (![0, 1, 2, 3].includes(o.p)) out.push(w + '.o' + i + ': p ungültig');
          if (typeof o.n !== 'number' || typeof o.feel !== 'number' || o.feel < 0 || o.feel > 100) out.push(w + '.o' + i + ': n/feel ungültig');
        });
        if (!(c.opts || []).some((o) => o.p === 3) || !(c.opts || []).some((o) => o.p <= 1)) out.push(w + ': braucht starke UND schwache Wege');
      } else if (c.type === 'kette') {
        if (!c.steps || c.steps.length !== 4) out.push(w + ': genau 4 Schritte nötig');
        (c.steps || []).forEach((s, i) => { add(w + '.s' + i, s.text); if (i && s.views <= c.steps[i - 1].views) out.push(w + '.s' + i + ': views muss steigen'); });
        if (!c.ende || c.ende.views <= c.steps[c.steps.length - 1].views) out.push(w + ': ende.views zu klein');
        add(w + '.ende', c.ende && c.ende.text); add(w + '.wahr', c.wahr);
        if (!c.wie || c.wie.length !== 4) out.push(w + ': genau 4 Wege nötig');
        (c.wie || []).forEach((o, i) => { add(w + '.w' + i, o.t); add(w + '.w' + i + '.line', o.line); if (!['stark', 'okay', 'riskant'].includes(o.k)) out.push(w + '.w' + i + ': k ungültig'); });
        if (!(c.wie || []).some((o) => o.k === 'stark') || !(c.wie || []).some((o) => o.k === 'riskant')) out.push(w + ': braucht stark UND riskant');
      } else if (c.type === 'druck') {
        add(w + '.lage', c.lage);
        if (!c.msgs || c.msgs.length < 3) out.push(w + ': mind. 3 Druck-Nachrichten');
        (c.msgs || []).forEach((x, i) => add(w + '.m' + i, x.text));
        const kinds = (c.opts || []).map((o) => o.k).sort().join(',');
        if (kinds !== 'ausrede,cool,hart,ja') out.push(w + ': braucht genau cool/hart/ausrede/ja (hat ' + kinds + ')');
        (c.opts || []).forEach((o, i) => { add(w + '.o' + i, o.t); add(w + '.o' + i + '.line', o.line); if (!o.antwort || !o.antwort.von) out.push(w + '.o' + i + ': antwort fehlt'); else add(w + '.o' + i + '.antwort', o.antwort.text); });
        if (!c.nein || c.nein.length < 2) out.push(w + ': mind. 2 Nein-Sätze');
        (c.nein || []).forEach((s, i) => add(w + '.nein' + i, s));
      } else out.push(w + ': unbekannter Typ ' + c.type);
      // Vapes und Familie nur mit Freigabe
      const js = JSON.stringify(c);
      if (/Vape|Nikotin|Eltern|trennen/i.test(js) && !c.heikel) out.push(w + ': Vape/Familie muss heikel sein');
    });
    (m ? m.debrief : []).forEach((q, i) => add('debrief' + i, q));
    const all = JSON.stringify(C) + JSON.stringify(m || {});
    ['Alex', 'Ben', 'Chase', 'Jason'].forEach((n) => { if (new RegExp('\\b' + n + '\\b').test(all)) out.push('Verbotener Name: ' + n); });
    if (/nackt|nude|sexting|selbstmord|suizid|ritzen/i.test(all)) out.push('Verbotenes Thema im Inhalt');
    if (/TikTok|Instagram|WhatsApp|Snapchat|YouTube|Facebook|Discord/i.test(all)) out.push('Echte Marke im Inhalt');
    texts.forEach(([where, s]) => {
      s.split(/(?<=[.!?])\s+/).forEach((sent) => {
        const words = sent.split(/\s+/).filter((x) => /[\wÄÖÜäöüß]/.test(x)).length;
        if (words > 15) out.push(`${where}: Satz zu lang (${words} Wörter): ${sent}`);
      });
    });
    return { out, cnt, total: C.length, heikel: C.filter((x) => x.heikel).length, texts: texts.length };
  });
  problems.push(...res.out);
  return res;
}

let contentInfo = null;
const energies = [];
for (const run of RUNS) {
  const { browser, page, errors } = await launch(run.vp);
  const tag = (n) => `feed-${run.name}-${n}`;
  await fresh(page, run.look);
  if (!contentInfo) contentInfo = await checkContent(page);
  if (run.heikel) await page.evaluate(() => { window.CREW.state.settings.sensitive = true; window.CREW.save(); });

  // Session starten, Check-in überspringen → Mission startet direkt
  await page.evaluate(() => { window.CREW.debug.startMission('feed'); });
  await clickText(page, 'Los geht');
  await waitText(page, 'inneres Wetter');
  await clickText(page, 'Überspringen');

  const info = await playThrough(page, tag, run, false);
  ['fakt', 'tun', 'kette', 'druck'].forEach((t) => { if (!info.types.has(t)) problems.push(`${tag('typen')}: Rundentyp ${t} nicht gespielt`); });
  if (!info.xFakt) problems.push(`${tag('x')}: X-Karte nicht getestet`);
  if (run.xKette && !info.xKette) problems.push(`${tag('x-kette')}: X-Karte in der Kette nicht getestet`);
  if (!info.endOk) problems.push(`${tag('end')}: Endbildschirm nicht erreicht`);
  if (!info.allWays) problems.push(`${tag('alle-wege')}: „Alle Wege“ nicht getestet`);

  // Nachbesprechung + Energie
  await shot(page, tag('90-debrief'), 400);
  problems.push(...await layoutCheck(page, tag('debrief')));
  await clickText(page, 'Fertig');
  await waitText(page, 'Energie', 5000);
  await page.waitForTimeout(1500);
  await shot(page, tag('91-ergebnis'), 200);
  const last = await page.evaluate(() => window.CREW.state.history[window.CREW.state.history.length - 1]);
  if (!last || last.mission !== 'feed') problems.push(`${tag('energie')}: kein Verlaufseintrag`);
  else {
    energies.push(last.energy);
    if (last.energy < 4 || last.energy > 10) problems.push(`${tag('energie')}: Energie ${last.energy} nicht in 4–10`);
  }
  const stark = page.locator('.modal button', { hasText: 'Stark' });
  if (await stark.count()) await stark.click();
  await clickText(page, 'Bis morgen');

  // Solo-Variante
  if (run.solo) {
    await page.evaluate(() => { window.CREW.debug.startSolo('feed'); });
    const sinfo = await playThrough(page, (n) => tag('solo-' + n), run, true);
    ['fakt', 'tun', 'kette', 'druck'].forEach((t) => { if (!sinfo.types.has(t)) problems.push(`${tag('solo')}: Rundentyp ${t} nicht gespielt`); });
    if (sinfo.stages[sinfo.stages.length - 1] !== 'solohub') problems.push(`${tag('solo')}: nach Fertig nicht in der Solo-Zone`);
    const best = await page.evaluate(() => window.CREW.state.solo['feed:punkte']);
    if (!(best > 0) || best !== sinfo.soloPts) problems.push(`${tag('solo')}: Bestwert ${best} passt nicht zu ${sinfo.soloPts}`);
    if (await page.locator('.paddle-hint').count()) problems.push(`${tag('solo')}: Antwort-Karten-Hinweis im Solo`);
  }

  problems.push(...errors.map((e) => `${run.name}: ${e}`));
  await browser.close();
}

console.log(`Inhalte: ${contentInfo ? contentInfo.total : 0} Runden ${contentInfo ? JSON.stringify(contentInfo.cnt) : ''}, ${contentInfo ? contentInfo.heikel : 0} heikel, ${contentInfo ? contentInfo.texts : 0} Texte geprüft. Energie je Lauf: ${energies.join(', ')}`);
if (problems.length) {
  console.log('PROBLEME:\n' + [...new Set(problems)].join('\n'));
  process.exitCode = 1;
} else {
  console.log('Feed-Check-Test OK – keine Fehler.');
}

// RESPAWN – ganze Runden im Browser (dist/respawn.html): Start → Karten → vier Jahreszeiten → Ausgang und Akte.
// Ein kleiner Autopilot spielt mit verschiedenen Karten und Spielweisen (immer die erste freie Wahl, hart, ruhig, zufällig).
// Geprüft: keine Fehler, jede Runde endet mit einem Ausgang, die LUMO-Spielstände bleiben unberührt, das Album zählt mit.
// Aufruf: node tests/scenarios/respawn.mjs   (Umgebung: SHOTS=Ordner für Bilder, Q=low|medium|high, RUNDEN=Anzahl)
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { launch, openGame, ROOT } from '../lib.mjs';

const FILE = join(ROOT, 'dist/respawn.html');
const SHOTS = process.env.SHOTS || '';
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
let ok = 0, bad = 0;
const check = (name, cond, info = '') => { if (cond) { ok++; console.log('✔', name); } else { bad++; console.log('✘', name, typeof info === 'string' ? info : JSON.stringify(info).slice(0, 500)); } };

const browser = await launch();
try {
  const { page, errors } = await openGame(browser, { file: FILE, query: `q=${process.env.Q || 'low'}&skipintro&autostart` });
  await page.waitForFunction(() => LUMO.started, null, { timeout: 120000 });
  await page.evaluate(() => { document.getElementById('boot')?.remove(); });
  check('Modus RESPAWN ist an, Baustein geladen', await page.evaluate(() => LUMO.gameMode === 'respawn' && !!LUMO.plugin('respawn') && document.getElementById('lumo-root').classList.contains('mode-respawn')));
  await page.waitForSelector('.rs-voll.ist-start', { timeout: 30000 });
  check('Startmenü: Neue Runde, Aussehen, Album', await page.evaluate(() => ['neu', 'aussehen', 'album'].every((s) => !!document.querySelector(`.ist-start [data-s="${s}"]`))));
  if (SHOTS) await page.screenshot({ path: join(SHOTS, 'rs-01-start.png') });

  // Autopilot im Spiel: reagiert auf das, was gerade offen ist
  const runde = (karten, weise, seed) => page.evaluate(([k, w, s]) => new Promise((resolve) => {
    let a = s; const rnd = () => { a = (a * 1103515245 + 12345) & 0x7fffffff; return a / 0x7fffffff; };
    const E = LUMO.events, log = { wahlen: 0, situationen: [], ausgang: null };
    const ab1 = E.on('respawn:wahl', (e) => { log.wahlen++; if (!log.situationen.includes(e.sit)) log.situationen.push(e.sit); });
    const ab2 = E.on('respawn:ausgang', (e) => { log.ausgang = e.id; log.akte = e.akte; log.druck = e.R.druck; log.geld = e.R.geld; });
    const t0 = Date.now();
    const tick = setInterval(() => {
      if (document.querySelector('.rs-voll.ist-start')) E.emit('respawn:start', 'neu');
      else if (document.querySelector('.rs-voll.ist-karten')) E.emit('respawn:karten', k);
      else if (document.querySelector('.rs-voll.ist-frei')) { const l = [...document.querySelectorAll('.rs-frei')]; E.emit('respawn:frei', l[Math.floor(rnd() * l.length)].dataset.f); }
      else if (document.querySelector('.rs-voll.ist-ende')) {
        clearInterval(tick); ab1(); ab2();
        log.akteZeilen = document.querySelectorAll('.rs-akte tbody tr').length; log.andere = document.querySelectorAll('.rs-andere details').length;
        log.titel = (document.querySelector('.rs-ausgang h2') || {}).textContent;
        resolve(log);
      } else if (LUMO.ui.choices.open) {
        const l = LUMO.ui.choices.current.items.filter((x) => !x.disabled);
        const art = (x) => (x.tone || '').replace('rs-', '').split(' ')[0];
        let p = l[0];
        if (w === 'hart') p = l.find((x) => art(x) === 'hart') || l.find((x) => art(x) === 'weg') || l[0];
        else if (w === 'ruhig') p = l.find((x) => ['ruhig', 'nein', 'hilfe', 'mut'].includes(art(x))) || l[0];
        else if (w === 'zufall') p = l[Math.floor(rnd() * l.length)];
        else if (w === 'letzte') p = l[l.length - 1];
        E.emit('dialogue:choose', { index: p.index });
      } else if (LUMO.ui.bubbles.current) E.emit('input:action:down');
      else E.emit('respawn:weiter');
      if (Date.now() - t0 > 150000) { clearInterval(tick); resolve({ ...log, zeit: true }); }
    }, 25);
  }), [karten, weise, seed]);

  const plan = [
    [{ kopf: 'zuendschnur', zuhause: 'oma', tasche: 'ok' }, 'hart'],
    [{ kopf: 'nein', zuhause: 'zwei', tasche: 'leer' }, 'ruhig'],
    [{ kopf: 'trau', zuhause: 'allein', tasche: 'ok' }, 'zufall'],
    [{ kopf: 'voll', zuhause: 'oma', tasche: 'leer' }, 'letzte'],
    [{ kopf: 'zuendschnur', zuhause: 'allein', tasche: 'leer' }, 'erste'],
    [{ kopf: 'voll', zuhause: 'zwei', tasche: 'ok' }, 'zufall'],
  ].slice(0, Number(process.env.RUNDEN) || 6);
  const gefunden = new Set(), gespielt = new Set();
  let n = 0;
  for (const [karten, weise] of plan) {
    n++;
    const r = await runde(karten, weise, 17 * n);
    r.situationen.forEach((s) => gespielt.add(s)); if (r.ausgang) gefunden.add(r.ausgang);
    check(`Runde ${n} (${karten.kopf}, ${weise}): Ausgang „${r.titel}“, ${r.situationen.length} Situationen, ${r.wahlen} Wahlen, Akte ${r.akteZeilen}`,
      !!r.ausgang && !r.zeit && r.situationen.length >= 7 && r.wahlen >= 9 && r.akteZeilen >= 1, r);
    if (SHOTS) await page.screenshot({ path: join(SHOTS, `rs-ende-${n}.png`) });
    await page.evaluate(() => LUMO.events.emit('respawn:ende'));
    await page.waitForSelector('.rs-voll.ist-start', { timeout: 20000 });
  }
  check('Verschiedene Ausgänge erreicht', gefunden.size >= 3, [...gefunden]);
  check('Viele verschiedene Situationen gespielt', gespielt.size >= 12, [...gespielt]);
  const meta = await page.evaluate(() => ({ meta: JSON.parse(localStorage.getItem('respawn.meta')), lumo: Object.keys(localStorage).filter((k) => k.startsWith('lumo.save')), lauf: localStorage.getItem('respawn.lauf') }));
  check('Album zählt mit, keine laufende Runde übrig, LUMO-Spielstände unberührt', meta.meta.runden === plan.length && Object.keys(meta.meta.ausgaenge).length === gefunden.size && !meta.lauf && meta.lumo.length === 0, meta);
  check('Keine Fehler', errors.length === 0, errors.slice(0, 4));
} finally { await browser.close(); }
console.log(`\nrespawn :: ${ok} ok, ${bad} Fehler`);
process.exit(bad ? 1 : 0);

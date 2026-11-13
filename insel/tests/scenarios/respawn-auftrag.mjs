// RESPAWN – Aufträge (Missionen) am Handy durchspielen: Jeder Auftrag läuft von der Annahme bis zur Karte „Geschafft“.
// Ein Test-Spieler LÄUFT die Strecken wirklich (geradeaus zum Ziel, weicht aus, wenn er hängt) – so zeigt sich, ob die Zeit
// für Wettlauf und Sammeln reicht (mit Luft für Kinder) und ob nichts im Weg steht.
// Aufruf: node tests/scenarios/respawn-auftrag.mjs   (NUR=lieferung,sturm · SHOTS=Ordner für Bilder)
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { launch, ROOT } from '../lib.mjs';

const SHOTS = process.env.SHOTS || '';
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const NUR = (process.env.NUR || '').split(',').filter(Boolean);
const LUFT = +(process.env.LUFT || 0.2);   // so viel der Zeit muss dem Test-Spieler übrig bleiben
let ok = 0, bad = 0;
const check = (name, cond, info = '') => { if (cond) { ok++; console.log('✔', name); } else { bad++; console.log('✘', name, typeof info === 'string' ? info : JSON.stringify(info).slice(0, 500)); } };

const browser = await launch();
try {
  const probe = await browser.newPage();
  await probe.goto('file://' + join(ROOT, 'dist/respawn.html') + '?q=low&skipintro&autostart&thema=nein,wut');
  await probe.waitForFunction(() => window.LUMO && LUMO.started, null, { timeout: 240000 });
  const alle = await probe.evaluate(() => LUMO.plugin('respawn').missionenListe);
  await probe.close();
  check('Es gibt Aufträge', alle.length >= 5, alle);
  for (const m of alle.filter((x) => !NUR.length || NUR.includes(x.id))) {
    const ctx = await browser.newContext({ viewport: { width: 360, height: 640 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
    const page = await ctx.newPage(); page.setDefaultTimeout(240000);
    const errors = []; page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('file://' + join(ROOT, 'dist/respawn.html') + '?q=low&skipintro&autostart&thema=nein,wut');
    await page.waitForFunction(() => window.LUMO && LUMO.started);
    await page.evaluate(() => document.getElementById('boot')?.remove());
    await page.waitForSelector('.rs-voll.ist-start.is-da');
    // ein Schritt des Test-Spielers; gibt zurück, was gerade los ist
    const schritt = (id) => page.evaluate((id) => {
      const P = LUMO.plugin('respawn'), E = LUMO.events, pl = LUMO.player, T = (window.__t = window.__t || { log: [], pos: null, still: 0, aus: 0 });
      if (!T.hoert) { T.hoert = true; E.on('respawn:auftrag', (e) => T.log.push(e)); }
      const z = P.lauf ? P.ziele : [];
      if (z.length) {
        const p = pl.position, dx = z[0].x - p.x, dz = z[0].z - p.z;
        // hängt er (unter 0,25 m in 0,2 s)? dann kurz seitlich ausweichen und springen
        const weg = T.pos ? Math.hypot(p.x - T.pos.x, p.z - T.pos.z) : 1; T.pos = { x: p.x, z: p.z };
        T.still = weg < 0.25 ? T.still + 1 : 0;
        if (T.still >= 4) { T.aus = 6; T.seite = T.seite === 1 ? -1 : 1; T.still = 0; T.haenger = (T.haenger || 0) + 1; }
        let yaw = Math.atan2(-dx, -dz);
        if (T.aus > 0) { T.aus -= 1; yaw += 1.2 * (T.seite || 1); }
        pl.setIntent({ x: 0, y: 1, run: true, jump: T.aus > 4, jumpHeld: T.aus > 4, camYaw: yaw });
        const u = P.uhrStand;
        return { was: 'lauf', rest: u ? +(u.sekunden - u.t).toFixed(1) : 0, sek: u ? u.sekunden : 0, m: Math.round(Math.hypot(dx, dz)), offen: z.length };
      }
      pl.setIntent(null); T.pos = null; T.still = 0;
      const voll = document.querySelector('.rs-voll.is-da') || document.querySelector('.rs-voll');
      if (voll && voll.classList.contains('ist-start')) { E.emit('respawn:start', 'neu'); return { was: 'start' }; }
      if (voll && voll.classList.contains('ist-karten')) { E.emit('respawn:karten', { kopf: 'ruhig', zuhause: 'voll', tasche: 'voll' }); return { was: 'karten' }; }
      if (voll && voll.classList.contains('ist-fertig')) { const k = voll.querySelector('.rs-ak'), b = voll.querySelector('button'), r = b.getBoundingClientRect(); const erg = { was: 'fertig', text: k.textContent.replace(/\s+/g, ' ').slice(0, 160), knopfUnten: Math.round(r.bottom), bild: innerHeight }; if (T.fertigGesehen) b.click(); T.fertigGesehen = true; return erg; }
      if (LUMO.ui.choices.open) { const c = document.querySelector('.choices .choice'); if (c) c.click(); return { was: 'wahl' }; }
      if (LUMO.ui.bubbles.current) { E.emit('input:action:down'); return { was: 'blase' }; }
      if (P.frei && !T.an) { T.an = true; P.auftragAn(id); return { was: 'an' }; }
      if (P.frei && T.an && !P.auftrag) return { was: 'ende', log: T.log, haenger: T.haenger || 0, lauf: { missionen: P.lauf.missionen, kraft: P.lauf.kraft, geld: P.lauf.geld } };
      if (P.frei && P.auftrag && P.auftrag.art === 'hin') {
        const a = document.querySelector('.rs-auftrag'), r = a ? a.getBoundingClientRect() : null;
        const erg = { was: 'hin', i: P.auftrag.i, text: P.auftrag.text, anzeige: r ? { oben: Math.round(r.top), unten: Math.round(r.bottom), links: Math.round(r.left), rechts: Math.round(r.right), sichtbar: a.style.display !== 'none' && r.width > 0, bild: innerWidth } : null };
        if (T.hinGesehen === P.auftrag.i) P.auftragWeiter(); T.hinGesehen = P.auftrag.i;
        return erg;
      }
      E.emit('respawn:weiter');
      return { was: 'weiter' };
    }, id);
    let ende = null, bilder = {}, laeufe = [], letzter = null, hin = [], fertig = null;
    const t0 = Date.now();
    while (Date.now() - t0 < 200000) {
      const s = await schritt(m.id);
      if (s.was === 'lauf') { if (!letzter || letzter.was !== 'lauf') laeufe.push({ sek: s.sek, m: s.m, offen: s.offen }); laeufe[laeufe.length - 1].rest = s.rest; }
      if (s.was === 'hin' && !hin.some((h) => h.i === s.i)) hin.push(s);
      if (s.was === 'fertig') fertig = s;
      if (SHOTS && ['hin', 'lauf', 'fertig'].includes(s.was) && !bilder[s.was]) { bilder[s.was] = true; await page.waitForTimeout(s.was === 'lauf' ? 900 : 300); await page.screenshot({ path: join(SHOTS, `${m.id}-${s.was}.png`) }); }
      if (s.was === 'ende') { ende = s; break; }
      letzter = s;
      await page.waitForTimeout(200);
    }
    const ergs = ende ? ende.log.filter((e) => e.was === 'lauf' || e.was === 'sammeln') : [];
    check(`${m.id}: läuft bis zur Karte „Geschafft“ durch`, !!ende && !!ende.lauf.missionen && !!ende.lauf.missionen[m.id], { letzter, laeufe });
    if (ende) {
      check(`${m.id}: jeder Lauf und jedes Sammeln geschafft – mit mindestens ${Math.round(LUFT * 100)} % Zeit übrig`, ergs.every((e) => e.erg.geschafft && e.erg.rest / (e.erg.sekunden || (e.erg.zeit + e.erg.rest) || 1) >= LUFT), { ergs: ergs.map((e) => ({ was: e.was, ...e.erg })), laeufe, haenger: ende.haenger });
      check(`${m.id}: mindestens 2 Sterne`, ende.lauf.missionen[m.id].sterne >= 2, ende.lauf.missionen[m.id]);
      check(`${m.id}: Anzeige „Auftrag“ steht im Bild (360 px breit)`, hin.length === 0 || hin.every((h) => h.anzeige && h.anzeige.sichtbar && h.anzeige.links >= 0 && h.anzeige.rechts <= h.anzeige.bild && h.anzeige.oben >= 0), hin.map((h) => h.anzeige));
      check(`${m.id}: Karte „Geschafft“ – der Knopf liegt im Bild`, !!fertig && fertig.knopfUnten <= fertig.bild, fertig);
      console.log('   ', m.id, 'Läufe:', JSON.stringify(ergs.map((e) => ({ was: e.was, rest: e.erg.rest, zeit: e.erg.zeit }))), 'Hänger:', ende.haenger, 'Sterne:', ende.lauf.missionen[m.id].sterne);
    }
    check(`${m.id}: keine Fehler`, errors.length === 0, errors.slice(0, 3));
    await ctx.close();
  }
} finally { await browser.close(); }
console.log(`\nrespawn-auftrag :: ${ok} ok, ${bad} Fehler`);
process.exit(bad ? 1 : 0);

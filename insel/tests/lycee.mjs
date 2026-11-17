// Test: Lycée-Simulator (dist/lycee.html) – Kapitel 1 „Rentrée“ einmal ganz durchspielen.
// Geprüft: lädt ohne Fehler, Titel → Figur und Name, alle Schritte der Geschichte (Bushaltestelle, Sekretariat, Gang,
// Saal 1.04, Klassen-Bingo mit vier Feldern, Pause mit Mila und Freiwürfen, Kantine, Tisch, Gruppenarbeit, Heimweg),
// Stärken und Herzen werden gesammelt, Entdeckungen, Journal (Tab), Speichern im Browser und Weiterspielen nach Neuladen,
// Kapitel-Ende mit Bilanz, keine Netzanfragen. Nur erfundene Namen.
// Aufruf: node build-lycee.mjs && node tests/lycee.mjs
import { launch, SHOTS } from './lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'lycee.html');
let ok = 0, bad = 0;
const check = (name, cond, info) => { if (cond) { ok++; console.log('  ✓ ' + name); } else { bad++; console.log('  ✗ ' + name + (info !== undefined ? '  → ' + JSON.stringify(info).slice(0, 400) : '')); } };

const browser = await launch();
const context = await browser.newContext({ viewport: { width: 1000, height: 640 }, deviceScaleFactor: 1 });
const page = await context.newPage();
page.setDefaultTimeout(240000);
const fehler = [], netz = [];
page.on('pageerror', (e) => fehler.push(String(e && e.stack || e)));
page.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text()); });
await page.route('**/*', (r) => { const u = r.request().url(); if (u.startsWith('file:') || u.startsWith('data:') || u.startsWith('blob:')) return r.continue(); netz.push(u); return r.abort(); });
const L = (f, a) => page.evaluate(f, a);
const bild = (n) => page.screenshot({ path: join(SHOTS, 'lycee-' + n + '.png'), timeout: 240000 });

await page.goto('file://' + DIST + '?test');
await page.waitForSelector('.ly-k-titel', { timeout: 240000 });
check('Titelbild „Lycée des Collines“', /Lycée/.test(await page.textContent('.ly-k-titel')));
await page.click('[data-a="neu"]');
await page.click('[data-f="1"]');
await page.fill('.ly-w-name input', 'Robin');
await page.click('[data-a="start"]');
await page.waitForFunction(() => window.LYCEE && window.LYCEE.zustand && window.LYCEE.zustand.name === 'Robin');
check('Figur 2 und Name gewählt', (await L(() => [LYCEE.zustand.figur, LYCEE.zustand.name])).join() === '1,Robin');

// Gespräche durchklicken: immer die erste Antwort (Index wahl), sonst weiter; Freiwurf: werfen; Ende: weiter herumlaufen
async function klick(wahl = 0, max = 80) {
  for (let i = 0; i < max; i++) {
    const z = await L(() => {
      const e = document.querySelector('.ly-ebene:not([hidden])');
      if (e) return 'ebene:' + e.dataset.art;
      const d = document.querySelector('.ly-dialog:not([hidden])');
      if (!d) return LYCEE.imGespraech ? 'warten' : '';
      return d.classList.contains('ly-wahl') ? 'wahl' : 'zeile';
    });
    if (!z) return;
    if (z === 'wahl') { const n = await page.$$eval('.ly-d-optionen button', (l) => l.length); await page.keyboard.press('Digit' + (Math.min(wahl, n - 1) + 1)); }
    else if (z === 'zeile') await page.keyboard.press('KeyE');
    else if (z === 'ebene:spiel') { await page.keyboard.press('KeyE'); await page.waitForTimeout(900); }
    else if (z === 'ebene:ende') return 'ende';
    else if (z === 'ebene:bild') await page.waitForTimeout(600);
    await page.waitForTimeout(120);
  }
}
const schritt = () => L(() => LYCEE.schritt);
const rede = async (id, wahl) => { await page.waitForFunction((id) => LYCEE.leute[id] && LYCEE.leute[id].f.group.visible && !LYCEE.imGespraech, id); await L((id) => { const p = LYCEE.leute[id].pos; LYCEE.teleport({ x: p.x + 0.9, z: p.z + 0.3 }); }, id); await page.waitForTimeout(300); L((id) => LYCEE.rede(id), id); await page.waitForTimeout(300); return klick(wahl); };
const geh = async (ort, wahl) => { await L((o) => LYCEE.teleport(o), ort); await page.waitForFunction(() => LYCEE.imGespraech); return klick(wahl); };

await klick();   // Einleitung
check('Schritt 1: Bushaltestelle, Auftrag „Sprich mit Noah“', (await schritt()) === 'ankunft' && /Noah/.test(await page.textContent('.ly-auftrag')));
await bild('1-start');
await rede('noah');
check('Noah: „Ich bin Robin“ → Stärke „Kontakt aufnehmen“, Herz für Noah', (await L(() => LYCEE.zustand.staerken.kontakt)) === 1 && (await L(() => LYCEE.zustand.herz.noah)) >= 3);
check('Schritt 2: Sekretariat', (await schritt()) === 'sekretariat');
await page.waitForFunction(() => LYCEE.leute.weber && LYCEE.leute.weber.f.group.visible); await L(() => LYCEE.teleport({ x: -21, z: -12.4 }, 0));
await page.waitForFunction(() => LYCEE.imGespraech || (/Mme Weber/.test(document.querySelector('.ly-hinweis').textContent) && !document.querySelector('.ly-hinweis').hidden), null, { polling: 300 });
check('Hinweis „Mit Mme Weber reden“ hinter der Theke (größere Reichweite)', await L(() => LYCEE.imGespraech || LYCEE.naechste === 'weber'));
await bild('2-sekretariat');
if (!(await L(() => LYCEE.imGespraech))) await page.keyboard.press('KeyE'); await page.waitForFunction(() => LYCEE.imGespraech); await klick(0);
check('Warten → Stärke „Den Moment abwarten“; Stundenplan bekommen', (await L(() => LYCEE.zustand.staerken.warten)) === 1 && (await L(() => LYCEE.zustand.stundenplan)) === true);
check('Schritt 3: Gang', (await schritt()) === 'gang');
await geh('saal104Tuer', 0);
check('„Pardon, darf ich mal durch?“ → Stärke „Freundlich und klar“', (await L(() => LYCEE.zustand.staerken.klar)) >= 1);
check('Schritt 4: Saal 1.04', (await schritt()) === 'klasse');
await rede('hoffmann', 1);
check('Schritt 5: Bingo, Karte sichtbar', (await schritt()) === 'bingo' && await page.isVisible('.ly-bingo'));
await bild('3-bingo');
for (const id of ['ben', 'ayla', 'chiara']) await rede(id, 0);
const bingo = await L(() => LYCEE.zustand.bingo);
check('Bingo: Ben (Tier, Sport), Ayla (Musik), Chiara (Kochen) – alle vier Felder', bingo.tier === 'ben' && bingo.sport === 'ben' && bingo.musik === 'ayla' && bingo.kochen === 'chiara', bingo);
check('Schritt 6: Große Pause', (await schritt()) === 'pause');
await rede('mila', 0);
check('Mila: Herzen, Stärke „Zuhören“', (await L(() => LYCEE.zustand.herz.mila)) >= 4 && (await L(() => LYCEE.zustand.staerken.zuhoeren)) >= 1);
check('Pause geht weiter (noch nicht beides gemacht)', (await schritt()) === 'pause');
await rede('ben', 0);
check('Freiwürfe gespielt (0–5 Treffer)', typeof (await L(() => LYCEE.zustand.merke.freiwurf)) === 'number');
check('Schritt 7: Kantine', (await schritt()) === 'kantine');
await geh('kantineAusgabe', 0);
check('Vordrängeln: „Hey, ich war gerade dran.“', (await L(() => LYCEE.zustand.staerken.klar)) >= 2);
check('Schritt 8: Tisch wählen', (await schritt()) === 'tisch');
await bild('4-kantine');
await rede('mila', 0);
check('Zu Mila gesetzt', (await L(() => LYCEE.zustand.merke.tisch)) === 'mila');
check('Schritt 9: Gruppenarbeit', (await schritt()) === 'gruppe');
await rede('jo', 0);
check('Lina einbezogen → Stärke „Andere einbeziehen“', (await L(() => LYCEE.zustand.staerken.einbeziehen)) === 1 && (await L(() => LYCEE.zustand.merke.linaGefragt)) === true);
check('Schritt 10: Heimweg', (await schritt()) === 'heimweg');
// Speichern und Weiterspielen
await page.reload();
await page.waitForSelector('.ly-k-titel');
check('Nach Neuladen: „Weiterspielen“', await page.isVisible('[data-a="weiter"]'));
await page.click('[data-a="weiter"]');
await page.waitForFunction(() => window.LYCEE && LYCEE.schritt === 'heimweg' && LYCEE.leute.noah);
check('Weiter beim Heimweg, Name und Stärken noch da', (await L(() => LYCEE.zustand.name)) === 'Robin' && (await L(() => Object.keys(LYCEE.zustand.staerken).length)) >= 5);
// Journal
await page.keyboard.press('Tab'); await page.waitForSelector('.ly-k-journal');
check('Journal: Menschen mit Herzen (Mila dabei)', /Mila/.test(await page.textContent('.ly-k-journal')));
await page.click('.ly-k-journal [data-r="staerken"]');
check('Journal: Stärken', /Andere einbeziehen/.test(await page.textContent('.ly-k-journal')));
await bild('5-journal');
await page.keyboard.press('Escape');
// Entdeckung
await L(() => LYCEE.teleport({ x: -8, z: 16 })); await page.waitForFunction(() => LYCEE.zustand.entdeckt.includes('brunnen'), null, { timeout: 30000, polling: 300 }).catch(() => {});
check('Entdeckt: Der Brunnen', (await L(() => LYCEE.zustand.entdeckt)).includes('brunnen'));
const e = await geh('bus', 0);
check('Kapitel-Ende mit Bilanz', e === 'ende' && /Dein erster Tag/.test(await page.textContent('.ly-k-ende')));
await bild('6-ende');
await page.click('.ly-k-ende [data-a="frei"]'); await page.waitForTimeout(500);
check('Danach frei herumlaufen, Kapitel als geschafft gespeichert', (await L(() => LYCEE.zustand.fertig)) === true && /Freies Herumlaufen/.test(await page.textContent('.ly-auftrag')));
check('Keine Fehler in der Konsole', fehler.length === 0, fehler.slice(0, 5));
check('Kein Netz', netz.length === 0, netz.slice(0, 5));
console.log(`lycee :: ${ok} ok, ${bad} Fehler  (Bilder in ${SHOTS})`);
await browser.close();
process.exit(bad ? 1 : 0);

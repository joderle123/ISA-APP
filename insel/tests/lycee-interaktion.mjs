// Test: Annexe Junglinster – mit Dingen etwas machen. Hinsetzen auf der Rundbank, Snackautomat, Buch im Lesesaal,
// Arbeitsblatt am eigenen Platz (Wahl, Lücken ausfüllen, Zeichen wählen, prüfen, Fortschritt gespeichert), keine Fehler.
// Aufruf: node build-lycee.mjs && node tests/lycee-interaktion.mjs
import { launch, SHOTS } from './lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'lycee.html');
let ok = 0, bad = 0;
const check = (name, cond, info) => { if (cond) { ok++; console.log('  ✓ ' + name); } else { bad++; console.log('  ✗ ' + name + (info !== undefined ? '  → ' + JSON.stringify(info).slice(0, 300) : '')); } };
const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1000, height: 640 } })).newPage();
page.setDefaultTimeout(240000);
const fehler = [];
page.on('pageerror', (e) => fehler.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text()); });
const L = (f, a) => page.evaluate(f, a);
const bild = (n) => page.screenshot({ path: join(SHOTS, 'lycee-' + n + '.png') });

await page.goto('file://' + DIST + '?test&start=1&figur=1');
await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && LYCEE.ia);
for (let i = 0; i < 40 && await L(() => !!document.querySelector('.ly-dialog:not([hidden])')); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(150); }
await page.waitForFunction(() => !LYCEE.imGespraech);
const geheZu = (f) => L((f) => {
  const i = LYCEE.ia.liste.find((x) => x.tu === f.tu && (!f.near || Math.hypot(x.x - f.near[0], x.z - f.near[1]) < 3));
  LYCEE.steuerung.sitzt = false; LYCEE.teleport({ x: i.x + 0.15, z: i.z + 0.15 }); return [i.x, i.z];
}, f);

check('Viele Sitzplätze (Stühle und Bänke)', (await L(() => LYCEE.ia.liste.filter((i) => i.tu === 'sitzen').length)) > 150);
await geheZu({ tu: 'sitzen', near: [2, -37.3] }); await page.waitForFunction(() => LYCEE.iaNah === 'sitzen', null, { timeout: 30000 }).catch(() => {});
check('Hinweis „Hinsetzen“ an der Rundbank', (await L(() => LYCEE.iaNah)) === 'sitzen' && /Hinsetzen/.test(await page.textContent('.ly-hinweis')), [await L(() => LYCEE.iaNah), await page.textContent('.ly-hinweis'), await L(() => [LYCEE.steuerung.pos.x, LYCEE.steuerung.pos.z, LYCEE.steuerung.sitzt, LYCEE.imGespraech])]);
await page.keyboard.press('KeyE'); await page.waitForFunction(() => LYCEE.steuerung.sitzt, null, { timeout: 20000 }).catch(() => {});
check('Hingesetzt (E)', await L(() => LYCEE.steuerung.sitzt));
await bild('i1-sitzen');

await geheZu({ tu: 'automat' }); await page.waitForFunction(() => LYCEE.iaNah === 'automat', null, { timeout: 30000 }).catch(() => {});
await page.keyboard.press('KeyE'); await page.waitForFunction(() => (LYCEE.zustand.merke || {}).automat === 1, null, { timeout: 20000 }).catch(() => {});
check('Snackautomat: gezählt, Toast', (await L(() => (LYCEE.zustand.merke || {}).automat)) === 1 && (await page.$$('.ly-toasts > *')).length > 0, await L(() => [LYCEE.iaNah, (LYCEE.zustand.merke || {}).automat, LYCEE.steuerung.sitzt, LYCEE.imGespraech]));
await page.waitForFunction(() => !LYCEE.imGespraech);

await geheZu({ tu: 'buch' }); await page.waitForFunction(() => LYCEE.iaNah === 'buch', null, { timeout: 30000 }).catch(() => {});
await page.keyboard.press('KeyE'); await page.waitForSelector('.ly-ebene[data-art="bild"]');
check('Lesesaal: Buch genommen', (await page.textContent('.ly-ebene')).length > 10);
await page.waitForFunction(() => !LYCEE.imGespraech, null, { timeout: 20000 });

// Arbeitsblatt am eigenen Platz
await geheZu({ tu: 'arbeiten', near: [-22.1, -24.4] }); await page.waitForFunction(() => LYCEE.iaNah === 'arbeiten', null, { timeout: 30000 }).catch(() => {});
check('Am eigenen Platz: „Arbeitsblatt bearbeiten“', (await L(() => LYCEE.iaNah)) === 'arbeiten');
await page.keyboard.press('KeyE'); await page.waitForSelector('.ly-k-blattwahl');
check('Blattwahl mit Rechen-Modulen aus der Toolbox', (await page.$$eval('.ly-bw-liste [data-b]', (l) => l.length)) >= 8);
await page.click('.ly-bw-liste [data-b="kk-r6-plus-ueber-zehner"]');
await page.waitForSelector('.ly-ab-papier');
check('Sitzt am Platz; Papier mit Merkkasten und Lücken', (await L(() => LYCEE.steuerung.sitzt)) && (await page.$$eval('.ly-ab-liste input', (l) => l.length)) >= 8);
await bild('i2-blatt-leer');
const loes = await L(() => LYCEE.daten.BLAETTER.find((b) => b.id === 'kk-r6-plus-ueber-zehner').aufgaben.map((a) => a.a));
const felder = await page.$$('.ly-ab-liste input');
let k = 0;
for (let i = 0; i < loes.length; i++) for (const v of loes[i]) { await felder[k].fill(i === 0 ? '999' : v); k++; }
await page.click('[data-a="pruefen"]');
check('Prüfen: eine falsch, Rest grün', (await page.textContent('.ly-ab-stand')).startsWith((loes.length - 1) + ' von ' + loes.length) && (await page.$$eval('.ly-ab-liste li.gut', (l) => l.length)) === loes.length - 1);
await bild('i3-blatt-geprueft');
await felder[0].fill(loes[0][0]); await page.click('[data-a="pruefen"]');
check('Korrigiert: alles richtig', /alles richtig/.test(await page.textContent('.ly-ab-stand')));
await page.click('[data-a="pruefen"]');
await page.waitForFunction(() => !document.querySelector('.ly-ab-papier'));
check('Fortschritt gespeichert', (await L(() => (LYCEE.zustand.blaetter || {})['kk-r6-plus-ueber-zehner']?.richtig)) === loes.length);
await page.waitForFunction(() => !LYCEE.imGespraech);

// Vergleichen: Zeichen wählen
await geheZu({ tu: 'arbeiten', near: [-22.1, -24.4] }); await page.waitForFunction(() => LYCEE.iaNah === 'arbeiten', null, { timeout: 30000 }).catch(() => {}); await page.keyboard.press('KeyE');
await page.waitForSelector('.ly-k-blattwahl'); await page.click('.ly-bw-liste [data-b="kk-r1-vergleichen"]'); await page.waitForSelector('.ly-ab-papier');
const vg = await L(() => LYCEE.daten.BLAETTER.find((b) => b.id === 'kk-r1-vergleichen').aufgaben.map((a) => a.a));
for (let i = 0; i < vg.length; i++) await page.click('.ly-ab-liste li[data-i="' + i + '"] [data-w="' + vg[i] + '"]');
await page.click('[data-a="pruefen"]');
check('Vergleichen mit < = >: alles richtig', /alles richtig/.test(await page.textContent('.ly-ab-stand')));
await page.click('[data-a="weg"]');
// Mathe-Pilot: Modul wählen, Blatt mit Erklärung, Tipp bei Fehler, alles richtig, neue Zahlen
await page.waitForFunction(() => !LYCEE.imGespraech);
await geheZu({ tu: 'arbeiten', near: [-22.1, -24.4] }); await page.waitForFunction(() => LYCEE.iaNah === 'arbeiten', null, { timeout: 30000 }).catch(() => {}); await page.keyboard.press('KeyE');
await page.waitForSelector('.ly-k-blattwahl');
check('Mathe: sechs Module zur Wahl', (await page.$$eval('.ly-bw-module [data-m]', (l) => l.length)) === 6);
await page.click('.ly-bw-module [data-m="4"]');
check('Modul 4 gewählt: „Geld und Komma“', /Geld und Komma/.test(await page.textContent('.ly-bw-ziel')));
await page.click('.ly-bw-liste [data-b="mathe:4:m4-rueckgeld"]'); await page.waitForSelector('.ly-ab-erkl');
check('Blatt mit „So geht’s“ (Idee, Schritte, Beispiel)', /So geht/.test(await page.textContent('.ly-ab-erkl')) && (await page.$$eval('.ly-ab-erkl ol li', (l) => l.length)) >= 2);
await bild('i4-mathe-blatt');
const mt = await page.$$eval('.ly-ab-liste li .ly-ab-t', (l) => l.map((x) => x.textContent));
const ml = mt.map((t) => { const m = t.match(/Preis ([\d,]+) €, du zahlst (\d+) €/); return m ? (Number(m[2]) - Number(m[1].replace(',', '.'))).toFixed(2).replace('.', ',') : ''; });
const mf = await page.$$('.ly-ab-liste input');
await mf[0].fill('0,01');
for (let i = 1; i < mf.length; i++) await mf[i].fill(ml[i].replace(/0$/, ''));
await page.click('[data-a="pruefen"]');
check('Falsche Antwort zeigt einen Tipp', await page.isVisible('.ly-ab-liste li[data-i="0"] .ly-ab-tipp'));
await mf[0].fill(ml[0]); await page.click('[data-a="pruefen"]');
check('Rückgeld: alles richtig (auch „3,1“ statt „3,10“ zählt)', /alles richtig/.test(await page.textContent('.ly-ab-stand')));
await page.click('[data-a="neu"]'); await page.waitForFunction((alt) => document.querySelector('.ly-ab-liste li .ly-ab-t') && document.querySelector('.ly-ab-liste li .ly-ab-t').textContent !== alt, mt[0]);
check('„Neue Zahlen“: frisches Blatt', true);
await page.click('[data-a="weg"]');
check('Mathe-Fortschritt gespeichert (Modul 4)', (await L(() => LYCEE.zustand.mathe.modul)) === 4 && (await L(() => LYCEE.zustand.mathe.stand['m4-rueckgeld'].richtig)) === mf.length);
// Gesprächsfaden: Ben mag dich (2 Herzen) → beim Ansprechen ein tieferes Gespräch; danach im selben Abschnitt nur Plaudern
await page.waitForFunction(() => !LYCEE.imGespraech);
await L(() => { LYCEE.zustand.herz.ben = 2; LYCEE.rede('ben'); });
await page.waitForFunction(() => /Witze/.test((document.querySelector('.ly-dialog:not([hidden])') || {}).textContent || ''), null, { timeout: 20000 }).catch(() => {});
check('Gesprächsfaden mit Ben startet („Witze“)', /Witze/.test(await page.textContent('.ly-dialog')));
for (let i = 0; i < 12 && await L(() => LYCEE.imGespraech); i++) {
  if (await page.isVisible('.ly-d-optionen button')) await page.click('.ly-d-optionen button[data-i="1"]'); else await page.keyboard.press('KeyE');
  await page.waitForTimeout(250);
}
check('Faden gespeichert, Freundschaft gewachsen', (await L(() => LYCEE.zustand.faeden.ben)) === 1 && (await L(() => LYCEE.zustand.herz.ben)) >= 3, await L(() => [LYCEE.zustand.faeden, LYCEE.zustand.herz.ben]));
await L(() => { LYCEE.rede('ben'); });
await page.waitForFunction(() => LYCEE.imGespraech, null, { timeout: 10000 }).catch(() => {});
check('Im selben Abschnitt: nur kurz plaudern', !/Bauch|Test/.test(await page.textContent('.ly-dialog')) && (await L(() => LYCEE.zustand.faeden.ben)) === 1);
for (let i = 0; i < 8 && await L(() => LYCEE.imGespraech); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(250); }

// Tischtennis auf dem Hof: Spiel öffnet sich; ohne Schlag sind die drei Bälle weg, das Spiel endet von selbst
await geheZu({ tu: 'tischtennis' }); await page.waitForFunction(() => LYCEE.iaNah === 'tischtennis', null, { timeout: 30000 }).catch(() => {});
await page.keyboard.press('KeyE');
await page.waitForSelector('.ly-k-spiel canvas', { timeout: 20000 }).catch(() => {});
check('Tischtennis: Spielfeld offen', /Tischtennis/.test(await page.textContent('.ly-ebene')));
await page.waitForTimeout(1500); await bild('i6-tischtennis');
await page.waitForFunction(() => !document.querySelector('.ly-k-spiel'), null, { timeout: 60000 }).catch(() => {});
check('Tischtennis endet nach drei Bällen, Rekord gespeichert', (await L(() => LYCEE.zustand.merke.ttRekord)) === 0);
await page.waitForFunction(() => !LYCEE.imGespraech);

// Skateboard in der Skate-Ecke: aufsteigen, mit Schwung springen (Ollie = 1 Punkt), absteigen, Rekord gespeichert
await page.waitForFunction(() => !LYCEE.imGespraech);
await geheZu({ tu: 'skate' }); await page.waitForFunction(() => LYCEE.iaNah === 'skate', null, { timeout: 30000 }).catch(() => {});
check('Hinweis „Skateboard fahren“', /Skateboard/.test(await page.textContent('.ly-hinweis')));
await page.keyboard.press('KeyE');
await page.waitForFunction(() => !!LYCEE.steuerung.brett, null, { timeout: 20000 }).catch(() => {});
check('Auf dem Brett: Anzeige mit Zeit und Punkten, Knöpfe Sprung/Absteigen', !!(await L(() => LYCEE.steuerung.brett)) && await page.isVisible('.ly-skate') && await page.isVisible('.ly-skate-knoepfe [data-s="sprung"]'));
await L(() => { LYCEE.steuerung.yaw = 0; LYCEE.steuerung.tempo = 3.5; });
await page.waitForTimeout(200);
await page.keyboard.down('Space'); await page.waitForTimeout(150); await page.keyboard.up('Space');
await page.waitForFunction(() => /^1 Punkt$/.test(document.querySelector('.ly-skate [data-s="punkte"]').textContent), null, { timeout: 30000 }).catch(() => {});
check('Ollie mit Schwung: 1 Punkt', /^1 Punkt$/.test(await page.textContent('.ly-skate [data-s="punkte"]')), await page.textContent('.ly-skate'));
await bild('i5-skate');
await page.click('.ly-skate-knoepfe [data-s="weg"]');
await page.waitForFunction(() => !LYCEE.steuerung.brett, null, { timeout: 20000 }).catch(() => {});
check('Abgestiegen: Rekord gespeichert', !(await L(() => LYCEE.steuerung.brett)) && (await L(() => LYCEE.zustand.merke.skateRekord)) >= 1);
check('Keine Fehler in der Konsole', fehler.length === 0, fehler.slice(0, 4));
console.log(`lycee-interaktion :: ${ok} ok, ${bad} Fehler`);
await browser.close();
process.exit(bad ? 1 : 0);

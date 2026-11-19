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
for (let i = 0; i < 120 && await L(() => LYCEE.imGespraech || !!document.querySelector('.ly-dialog:not([hidden]), .ly-ebene:not([hidden])')); i++) { const w = await L(() => { const b = document.querySelector('.ly-ebene:not([hidden]) [data-a="w"], .ly-ebene:not([hidden]) [data-a="weg"]'); if (b) { b.click(); return true; } return false; }); if (!w) await page.keyboard.press('KeyE'); await page.waitForTimeout(250); }
await page.waitForFunction(() => !LYCEE.imGespraech);
// Nach jeder Aktion ist E 0,35 s gesperrt (gegen Doppeldrücken) – darum kurz warten, bevor der Test E drückt
const geheZu = async (f) => { const r = await L((f) => {
  const i = LYCEE.ia.liste.find((x) => x.tu === f.tu && (!f.near || Math.hypot(x.x - f.near[0], x.z - f.near[1]) < 3));
  LYCEE.steuerung.sitzt = false; LYCEE.teleport({ x: i.x + 0.15, z: i.z + 0.15 }); return [i.x, i.z];
}, f); await page.waitForTimeout(500); return r; };

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
await page.keyboard.press('KeyE'); await page.waitForSelector('.le-regal');
check('Lese-Ecke: Regal mit Heften', (await page.$$('.le-regal [data-h]')).length >= 6);
await page.click('.le-regal [data-h="1"]');
for (let i = 0; i < 10 && await page.$('.le-heft'); i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(120); }
check('Lese-Ecke: Heft zu Ende, zurück im Regal', !!(await page.$('.le-regal')));
await page.click('.le-box [data-a="weg"]');
await page.waitForFunction(() => !document.querySelector('.ly-ebene:not([hidden])') && !LYCEE.imGespraech, null, { timeout: 20000 });
check('Lese-Ecke: gemerkt', ((await L(() => LYCEE.zustand.merke.gelesen)) || []).includes('kevin'));

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
// Deutsch: Fach wechseln, neun Module, Blatt „der, die oder das?“ mit Auswahl-Knöpfen
await page.waitForFunction(() => !LYCEE.imGespraech);
await geheZu({ tu: 'arbeiten', near: [-22.1, -24.4] }); await page.waitForFunction(() => LYCEE.iaNah === 'arbeiten', null, { timeout: 30000 }).catch(() => {}); await page.keyboard.press('KeyE');
await page.waitForSelector('.ly-k-blattwahl');
await page.click('.ly-bw-faecher [data-fach="deutsch"]');
check('Deutsch: neun Module zur Wahl', (await page.$$eval('.ly-bw-module [data-m]', (l) => l.length)) === 9);
await page.click('.ly-bw-module [data-m="3"]');
await page.click('.ly-bw-liste [data-b="deutsch:3:d3-artikel"]'); await page.waitForSelector('.ly-ab-erkl');
check('Deutsch-Blatt: 8 Aufgaben mit der/die/das', (await page.$$eval('.ly-ab-liste li', (l) => l.length)) === 8 && (await page.$$eval('.ly-ab-liste li [data-w="das"]', (l) => l.length)) === 8);
await bild('i8-deutsch');
await page.click('[data-a="weg"]');
await page.waitForFunction(() => !LYCEE.imGespraech);
check('Deutsch-Fortschritt im Spielstand (Modul 3)', (await L(() => LYCEE.zustand.fach.deutsch.modul)) === 3);

// Unterricht: Deutsch Modul 1 – jede Lernform einmal durchspielen (Tafel, Rollenspiel, Paare, Satzbau, Hören, Uhr, Groß/klein, Wegsuche, Blatt)
const LEKS = await L(() => LYCEE.daten.LEKTIONEN.deutsch[0].lektionen);
const oeffneModul1 = async () => {
  await page.waitForFunction(() => !LYCEE.imGespraech);
  for (let i = 0; i < 30 && await L(() => LYCEE.imGespraech); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(200); }
  await geheZu({ tu: 'arbeiten', near: [-22.1, -24.4] }); await page.waitForTimeout(400);
  await L(() => { LYCEE.aktion(LYCEE.ia.liste.find((i) => i.tu === 'arbeiten' && Math.hypot(i.x + 22.1, i.z + 24.4) < 3)); });
  await page.waitForSelector('.ly-k-blattwahl'); await page.click('.ly-bw-faecher [data-fach="deutsch"]'); await page.click('.ly-bw-module [data-m="1"]');
};
const fussNr = async () => +(((await page.textContent('.ly-sb-fuss')) || '').match(/(\d+) von/) || [0, 1])[1] - 1;
const gesehen = new Set();
async function spieleLektion(lid, einmalFalsch) {
  const lek = LEKS.find((x) => x.id === lid), abl = (art) => (lek.ablauf || []).find((x) => x.art === art), formen = new Set();
  await oeffneModul1(); await page.click('[data-b="lektion:deutsch:1:' + lid + '"]');
  let falsch = !einmalFalsch, blattOk = false;
  const foto = async (n) => { if (!gesehen.has(n)) { gesehen.add(n); await bild(n); } };
  for (let i = 0; i < 200 && await L(() => LYCEE.imGespraech); i++) {
    if (await page.isVisible('.ly-k-lern [data-a="w"]')) await page.click('.ly-k-lern [data-a="w"]');
    else if (await page.isVisible('.ly-k-merke')) { formen.add('tafel'); await foto('i9-tafel'); await page.click('.ly-k-merke [data-a="ok"]'); }
    else if (await page.isVisible('.ly-sb-teile button:not([disabled])')) {
      formen.add('satzbau'); await foto('i11-satzbau'); const st = abl('satzbau').saetze[await fussNr()];
      for (const w of st.woerter) { const bs = await page.$$('.ly-sb-teile button:not([disabled])'); for (const b of bs) if ((await b.textContent()) === w) { await b.click(); break; } }
      await page.waitForTimeout(900);
    } else if (await page.isVisible('.ly-pa button:not([disabled])')) {
      formen.add('paare'); await foto('i12-paare'); const n = abl('paare').paare.length;
      for (let k = 0; k < n; k++) { await page.click('.ly-pa [data-l="' + k + '"]'); await page.click('.ly-pa [data-r="' + k + '"]'); }
    } else if (await page.isVisible('.ly-ho .ly-d-optionen button:not([disabled])')) {
      formen.add('hoeren'); await foto('i13-hoeren'); const it = abl('hoeren').items[await fussNr()]; await page.click('.ly-ho [data-i="' + it.richtig + '"]'); await page.waitForTimeout(900);
    } else if (await page.isVisible('.ly-uh .ly-d-optionen button:not([disabled])')) {
      formen.add('uhr'); await foto('i14-uhr'); const it = abl('uhr').items[await fussNr()]; await page.click('.ly-uh [data-i="' + it.richtig + '"]'); await page.waitForTimeout(850);
    } else if (await page.isVisible('.ly-gk button:not([disabled])')) {
      formen.add('gross'); await foto('i15-gross'); const st = abl('gross').saetze[await fussNr()];
      for (let k = 0; k < st.woerter.length; k++) if (st.woerter[k][0] !== st.woerter[k][0].toLowerCase()) await page.click('.ly-gk [data-i="' + k + '"]');
      await page.click('.ly-sb-fuss [data-a="p"]'); await page.waitForTimeout(1100);
    } else if (await page.isVisible('.ly-ab-papier')) {
      formen.add('blatt');
      for (const li of await page.$$('.ly-ab-liste li')) {
        const t = await li.$eval('.ly-ab-t', (x) => x.textContent);
        const u = lek.uebung.find((x) => x[0].replace(/_{2,}/g, '').replace('◻', '?') === t);
        if (!u) continue;
        if (u.length === 3) await (await li.$('[data-w="' + u[2] + '"]')).click(); else await (await li.$('input')).fill(u[1]);
      }
      await page.click('[data-a="pruefen"]'); blattOk = /alles richtig/.test(await page.textContent('.ly-ab-stand'));
      if (lid === 'de-m1-das-bin-ich') await foto('i10-lektion-blatt');
      await page.click('[data-a="weg"]');
    } else if ((await page.textContent('.ly-a-titel').catch(() => '')) === 'Folge der Beschreibung' && !(await page.isVisible('.ly-dialog:not([hidden])'))) {
      formen.add('weg'); await foto('i16-weg'); const ziel = await page.textContent('.ly-a-ziel'), sch = abl('weg').schritte.find((x) => ziel.includes(x.sagen));
      if (sch) await L((z) => LYCEE.teleport({ x: z.x, z: z.z }), sch); await page.waitForTimeout(400);
    } else if (await page.isVisible('.ly-d-optionen button')) {
      formen.add('rollenspiel'); const frage = await page.textContent('.ly-dialog .ly-d-text');
      const r = lek.rolle.find((x) => frage.includes(x.sagt.replace('{name}', 'Sam')));
      if (r && !falsch) { falsch = true; await page.click('.ly-d-optionen button[data-i="' + ((r.richtig + 1) % r.optionen.length) + '"]'); }
      else await page.click('.ly-d-optionen button[data-i="' + (r ? r.richtig : 0) + '"]');
    } else await page.keyboard.press('KeyE');
    await page.waitForTimeout(150);
  }
  return { formen: [...formen], blattOk, falsch, stand: await L((id) => (LYCEE.zustand.lektionen || {})[id], lid) };
}
await oeffneModul1();
check('Deutsch Modul 1: acht Lektionen zur Wahl', (await page.$$eval('.ly-bw-liste [data-b^="lektion:deutsch:1:"]', (l) => l.length)) === 8);
await page.click('.ly-k-blattwahl .ly-zu');
for (const [lid, erwartet, einmalFalsch] of [['de-m1-das-bin-ich', ['tafel', 'rollenspiel', 'blatt'], true], ['de-m1-hobbys', ['paare', 'rollenspiel', 'blatt']], ['de-m1-w-fragen', ['satzbau', 'hoeren', 'blatt']],
  ['de-m1-uhrzeit', ['uhr', 'hoeren', 'blatt']], ['de-m1-weg', ['weg', 'rollenspiel', 'blatt']], ['de-m1-einladung', ['gross', 'rollenspiel', 'blatt']]]) {
  const r = await spieleLektion(lid, einmalFalsch);
  check('Lektion ' + lid + ': ' + erwartet.join(' + ') + ', Blatt alles richtig, gespeichert', erwartet.every((f) => r.formen.includes(f)) && r.blattOk && r.falsch && r.stand && r.stand.richtig === 8, r);
}
check('Lernkarten im Journal', (await L(() => (LYCEE.zustand.lernkarten || []).length)) >= 6, await L(() => LYCEE.zustand.lernkarten));

// Gesprächsfaden: Ben mag dich (2 Herzen) → beim Ansprechen ein tieferes Gespräch; danach im selben Abschnitt nur Plaudern
await page.waitForFunction(() => !LYCEE.imGespraech);
await L(() => { LYCEE.zustand.herz.ben = 2; LYCEE.rede('ben'); });
await page.waitForFunction(() => /Geschäftsmodell/.test((document.querySelector('.ly-dialog:not([hidden])') || {}).textContent || ''), null, { timeout: 20000 }).catch(() => {});
check('Gesprächsfaden mit Ben startet („Geschäftsmodell“)', /Geschäftsmodell/.test(await page.textContent('.ly-dialog')));
for (let i = 0; i < 12 && await L(() => LYCEE.imGespraech); i++) {
  if (await page.isVisible('.ly-d-optionen button')) await page.click('.ly-d-optionen button[data-i="1"]'); else await page.keyboard.press('KeyE');
  await page.waitForTimeout(250);
}
check('Faden gespeichert, Freundschaft gewachsen', (await L(() => LYCEE.zustand.faeden.ben)) === 1 && (await L(() => LYCEE.zustand.herz.ben)) >= 3, await L(() => [LYCEE.zustand.faeden, LYCEE.zustand.herz.ben]));
await L(() => { LYCEE.rede('ben'); });
await page.waitForFunction(() => LYCEE.imGespraech, null, { timeout: 10000 }).catch(() => {});
check('Im selben Abschnitt: nur kurz plaudern', !/Geschäftsmodell|Investor/.test(await page.textContent('.ly-dialog')) && (await L(() => LYCEE.zustand.faeden.ben)) === 1);
// (manchmal fragt Ben zufällig „Weißt du noch?“ – dann eine Antwort anklicken)
for (let i = 0; i < 20 && await L(() => LYCEE.imGespraech); i++) { const opt = await page.$$('.ly-d-optionen button'); if (opt.length) await opt[i % opt.length].click(); else await page.keyboard.press('KeyE'); await page.waitForTimeout(300); }

// Tischtennis auf dem Hof: Spiel öffnet sich; ohne Schlag sind die drei Bälle weg, das Spiel endet von selbst
// alles Offene schließen (Bens zufällige Quizfrage kann noch offen sein)
for (let i = 0; i < 40 && await L(() => LYCEE.imGespraech || !!document.querySelector('.ly-dialog:not([hidden]), .ly-ebene:not([hidden])')); i++) { const opt = await page.$$('.ly-d-optionen button'); if (opt.length) await opt[0].click(); else await page.keyboard.press('KeyE'); await page.waitForTimeout(300); }
await page.waitForTimeout(800);
await geheZu({ tu: 'tischtennis' }); await page.waitForFunction(() => LYCEE.iaNah === 'tischtennis', null, { timeout: 30000 }).catch(() => {});
for (let v = 0; v < 3 && !(await page.$('.ly-k-spiel canvas')); v++) { await page.keyboard.press('KeyE'); await page.waitForSelector('.ly-k-spiel canvas', { timeout: 7000 }).catch(() => {}); }
check('Tischtennis: Spielfeld offen', /Tischtennis/.test(await page.textContent('.ly-ebene')), await L(() => ({ iaNah: LYCEE.iaNah, gespr: LYCEE.imGespraech, ebene: LYCEE.ui.ebeneArt(), dlg: ((document.querySelector('.ly-dialog:not([hidden])') || {}).textContent || '').slice(0, 100), hinweis: (document.querySelector('.ly-hinweis') || {}).textContent, pos: [LYCEE.steuerung.pos.x, LYCEE.steuerung.pos.z], frei: LYCEE.steuerung.frei, sitzt: LYCEE.steuerung.sitzt, tt: LYCEE.zustand.merke.ttRekord })));
await page.waitForTimeout(1500); await bild('i6-tischtennis');
await page.waitForFunction(() => !document.querySelector('.ly-k-spiel'), null, { timeout: 60000 }).catch(() => {});
check('Tischtennis endet nach drei Bällen, Rekord gespeichert', (await L(() => LYCEE.zustand.merke.ttRekord)) === 0);
await page.waitForFunction(() => !LYCEE.imGespraech);

// Freundschaft messbar: Ben hat Punkte und eine Stufe; das Journal zeigt Freundeskreis, Typ und Gründe
check('Freundschaftspunkte für Ben (mind. „Kumpel“)', (await L(() => LYCEE.zustand.freund.ben)) >= 20, await L(() => [LYCEE.zustand.freund, LYCEE.zustand.freundGrund && LYCEE.zustand.freundGrund.ben]));
await L(() => LYCEE.ui.onJournal());
await page.waitForSelector('.ly-fr-kreis', { timeout: 10000 }).catch(() => {});
const jt = await page.textContent('.ly-ebene');
check('Journal: Freundeskreis, Typ „Der Spaßvogel“, Stufe und Gründe', /Dein Freundeskreis/.test(jt) && /Der Spaßvogel/.test(jt) && /^(Kumpel|Freund|Enge Freundschaft)$/.test(await page.textContent('.ly-fr-stufe')) && /tiefe Gespräche/.test(jt), jt.slice(0, 300));
await bild('i7-freunde');
await page.click('.ly-ebene .ly-zu');

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

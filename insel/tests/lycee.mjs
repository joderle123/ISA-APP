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
check('Titelbild „Annexe Junglinster“', /Annexe/.test(await page.textContent('.ly-k-titel')));
// Für Lehrpersonen: eine eigene Aufgabe anlegen (Phase 2)
await page.click('.ly-k-titel [data-a="lehrer"]');
await page.waitForSelector('.ly-k-lehrer');
await page.fill('.ly-k-lehrer [data-f="titel"]', 'Mathe 7P2');
await page.fill('.ly-k-lehrer [data-f="fach"]', 'Mathe');
await page.fill('.ly-k-lehrer [data-f="frage"]', '3 · 4 = ?');
await page.fill('.ly-k-lehrer [data-f="a0"]', '12'); await page.fill('.ly-k-lehrer [data-f="a1"]', '7'); await page.fill('.ly-k-lehrer [data-f="a2"]', '');
await page.click('.ly-k-lehrer [data-a="aufnehmen"]');
await page.click('.ly-k-lehrer [data-a="speichern"]');
const pk = await L(() => JSON.parse(localStorage.getItem('lycee.aufgaben') || 'null'));
check('Lehrpersonen-Editor: Paket „Mathe 7P2“ gespeichert (8 Beispiel-Aufgaben + 1 eigene, nur Aufgaben)', pk && pk.titel === 'Mathe 7P2' && pk.aufgaben.length === 9 && pk.aufgaben[8].frage === '3 · 4 = ?' && pk.aufgaben[8].antworten.join('|') === '12|7' && pk.aufgaben[8].richtig === 0, pk && pk.aufgaben.length);
await page.click('.ly-k-lehrer .ly-zu');
await page.waitForSelector('.ly-k-titel');
await page.click('[data-a="neu"]');
await page.click('[data-f="1"]');
await page.fill('.ly-w-name input', 'Robin');
await page.click('[data-a="start"]');
await page.waitForFunction(() => window.LYCEE && window.LYCEE.zustand && window.LYCEE.zustand.name === 'Robin');
check('Figur 2 und Name gewählt', (await L(() => [LYCEE.zustand.figur, LYCEE.zustand.name])).join() === '1,Robin');

// Gespräche durchklicken: immer die erste Antwort (Index wahl), sonst weiter; Freiwurf: werfen; Ende: weiter herumlaufen
let ichWahl = [], skalaWahl = [];
let warteN = 0;
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
    // Antworten stehen gemischt da: nach dem Platz in den Daten wählen (data-i). wahl = Zahl oder Liste (eine Zahl je Auswahl)
    if (z === 'wahl') { const k = Array.isArray(wahl) ? (wahl.length > 1 ? wahl.shift() : wahl[0]) : wahl; const n = await page.$$eval('.ly-d-optionen button', (l) => l.length); await page.click('.ly-d-optionen [data-i="' + Math.min(k, n - 1) + '"]'); }
    else if (z === 'zeile') await page.keyboard.press('KeyE');
    else if (z === 'ebene:skala') await page.keyboard.press('Digit' + (skalaWahl.shift() || 3));
    else if (z === 'ebene:sort') { if (await page.isVisible('.ly-k-sort [data-a="w"]')) await page.keyboard.press('KeyE'); else await page.keyboard.press('Digit1'); }
    else if (z === 'ebene:woche') await page.keyboard.press('KeyE');
    else if (z === 'warten') { await page.waitForTimeout(400); if (warteN++ < 600) i--; }   // Mutprobe läuft: stehen bleiben
    else if (z === 'ebene:spiel') { await page.keyboard.press('KeyE'); await page.waitForTimeout(900); }
    else if (z === 'ebene:ende') return 'ende';
    else if (z === 'ebene:bild') await page.waitForTimeout(600);
    else if (z === 'ebene:handy') await page.keyboard.press('KeyE');
    else if (z === 'ebene:laden' || z === 'ebene:spind') await page.keyboard.press('KeyE');
    else if (z === 'ebene:quiz') { if (await page.isVisible('.ly-k-quiz [data-j]')) await page.keyboard.press('Digit1'); else await page.keyboard.press('KeyE'); }
    else if (z === 'ebene:reihe') { if (await page.isVisible('.ly-k-reihe [data-a="w"]')) await page.keyboard.press('KeyE'); else { const n = await page.$$eval('.ly-r-fertig li', (l) => l.length); await page.click('.ly-k-reihe [data-k="' + n + '"]'); } }
    else if (z === 'ebene:saege') { await page.keyboard.press('KeyE'); await page.waitForTimeout(900); }
    else if (z === 'ebene:atem') { if (await page.isVisible('.ly-k-atem [data-a="weiter"]')) await page.keyboard.press('KeyE'); else await page.waitForTimeout(400); }
    else if (z === 'ebene:ich') { if (await page.isVisible('.ly-k-ich [data-a="sagen"]')) await page.keyboard.press('KeyE'); else await page.keyboard.press('Digit' + (ichWahl.shift() || 1)); }
    await page.waitForTimeout(120);
  }
}
const schritt = () => L(() => LYCEE.schritt);
const rede = async (id, wahl) => { await page.waitForFunction((id) => LYCEE.leute[id] && LYCEE.leute[id].f.group.visible && !LYCEE.imGespraech, id); await L((id) => { const p = LYCEE.leute[id].pos; LYCEE.teleport({ x: p.x + 0.9, z: p.z + 0.3 }); }, id); await page.waitForTimeout(300); L((id) => LYCEE.rede(id), id); await page.waitForTimeout(300); return klick(wahl); };
const frei = () => page.waitForFunction(() => !document.querySelector('.ly-ebene:not([hidden])') && !LYCEE.imGespraech, null, { polling: 300 }).then(() => page.waitForTimeout(500));
const geh = async (ort, wahl) => { await frei(); await L((o) => LYCEE.teleport(o), ort); await page.waitForFunction(() => LYCEE.imGespraech); return klick(wahl); };

await klick();   // Einleitung
check('Schritt 1: Bushaltestelle, Auftrag „Sprich mit Noah“', (await schritt()) === 'ankunft' && /Noah/.test(await page.textContent('.ly-auftrag')));
await bild('1-start');
await rede('noah');
check('Noah: „Ja. Robin. 7P2. Du?“ → Stärke „Kontakt aufnehmen“, Herz für Noah', (await L(() => LYCEE.zustand.staerken.kontakt)) === 1 && (await L(() => LYCEE.zustand.herz.noah)) >= 3);
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
check('Mila auf der Bank: „Ist hier frei?“ → Herz für Mila', (await L(() => LYCEE.zustand.herz.mila)) >= 2 && (await L(() => LYCEE.zustand.staerken.kontakt)) >= 5);
check('Pause geht weiter (noch nicht beides gemacht)', (await schritt()) === 'pause');
await rede('ben', 0);
check('Freiwürfe gespielt (0–5 Treffer)', typeof (await L(() => LYCEE.zustand.merke.freiwurf)) === 'number');
check('Schritt 7: Kantine', (await schritt()) === 'kantine');
await geh('kantineAusgabe', 0);
check('Vordrängeln: „Ey. Ich war dran.“ – und nachgelegt', (await L(() => LYCEE.zustand.staerken.klar)) >= 2);
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
check('Kapitel-Ende mit Bilanz und „Weiter: Kapitel 2“', e === 'ende' && /Dein erster Tag/.test(await page.textContent('.ly-k-ende')) && await page.isVisible('.ly-k-ende [data-a="weiter"]'));
await bild('6-ende');
await page.click('.ly-k-ende [data-a="weiter"]');
await page.waitForFunction(() => LYCEE.schritt === 'di_sport' && LYCEE.leute.sommer && LYCEE.leute.sommer.f.group.visible);
await klick();
check('Kapitel 2, Dienstag: Sport, Uhr zeigt „Di“', /Kapitel 2/.test(await page.textContent('.ly-auftrag')) && /^Di /.test(await page.textContent('.ly-uhr')));
await bild('7-turnhalle');
await rede('sommer', 0);
check('Turnschuhe vergessen: ehrlich gesagt → Stärke „Ehrlich sein“', (await L(() => LYCEE.zustand.staerken.ehrlich)) === 1);
check('Teams wählen', (await schritt()) === 'di_teams');
await rede('jo', 2);
check('Lina ins Team geholt, Korbwurf gespielt', (await L(() => LYCEE.zustand.merke.linaTeam)) === true && typeof (await L(() => LYCEE.zustand.merke.korb)) === 'number');
check('Mittwoch: Mathe im CDI', (await schritt()) === 'mi_cdi');
await klick();
await rede('chiara', 0);
check('Mathe: um Hilfe gebeten, ½ + ¼ = ¾ gelernt (Lernkarte)', (await L(() => LYCEE.zustand.merke.matheRichtig)) === true && (await L(() => (LYCEE.zustand.lernkarten || []).length)) === 1);
check('AG wählen', (await schritt()) === 'mi_ag');
await geh('pinnwand', 2);
check('Schulgarten-AG gewählt → „Selbst entscheiden“', (await L(() => LYCEE.zustand.merke.agGarten)) === true && (await L(() => LYCEE.zustand.staerken.entscheiden)) === 1);
check('Donnerstag: Klassenchat', (await schritt()) === 'do_chat');
await klick();
await geh('preau', 1);
check('Chat: „Jo, echt jetzt?“ in die Gruppe → Stärke „Für andere einstehen“, das Foto bleibt', (await L(() => LYCEE.zustand.merke.chatMut)) === true && (await L(() => LYCEE.zustand.staerken.mut)) >= 1);
await rede('mila', 0);
check('Mila: erst Petze-Angst, dann „Ich sag, ich hab’s gemeldet“ → SePAS-Szene gibt es nur deshalb', (await L(() => LYCEE.zustand.merke.ichMelde)) === true && (await schritt()) === 'do_sepas');
await rede('kaya', 0);
check('Freitag: Mathe-Test', (await schritt()) === 'fr_test');
await L(() => { LYCEE.ui.atemMs = 250; });
await klick();
await geh('meinPlatz', 0);
check('Am Platz gesessen, geatmet → Stärke „Sich beruhigen“', (await L(() => LYCEE.zustand.staerken.atmen)) === 1);
check('Klassenrat', (await schritt()) === 'fr_rat');
await rede('hoffmann', [1, 1]);
check('Klassenrat: erst abwarten, dann „Fotos nur, wenn der andere Ja sagt“', (await L(() => LYCEE.zustand.merke.regelVorschlag)) === true);
check('Wochenende', (await schritt()) === 'fr_heim');
const e2 = await geh('bus', 0);
check('Kapitel 2 geschafft: „Deine erste Woche“', e2 === 'ende' && /Deine erste Woche/.test(await page.textContent('.ly-k-ende')));
await bild('8-woche');
await page.click('.ly-k-ende [data-a="weiter"]');
await page.waitForFunction(() => LYCEE.schritt === 'k3_bus');
await klick();
check('Kapitel 3 „Der Schnuppertag“: Bus verpasst', /Kapitel 3/.test(await page.textContent('.ly-auftrag')));
await rede('noah', 0);
check('Im Sekretariat angerufen → Stärke „Telefonieren“', (await L(() => LYCEE.zustand.staerken.telefon)) === 1);
check('Zu spät in die Klasse', (await schritt()) === 'k3_spaet');
await rede('hoffmann', 0);
check('Werkstatt', (await schritt()) === 'k3_atelier');
await bild('9-werkstatt');
await rede('becker', 0);
check('Sicherheitsregeln → „Auf Sicherheit achten“', (await L(() => LYCEE.zustand.staerken.sicher)) === 1);
await geh('werkbank', 0);
check('Gemessen und gesägt (Abweichung in cm)', typeof (await L(() => LYCEE.zustand.merke.saege)) === 'number');
check('Zu zweit mit Kenan', (await schritt()) === 'k3_kenan');
await rede('kenan', 0);
await rede('becker', 0);
check('Rückmeldung angenommen, Beruf: Holz', (await L(() => LYCEE.zustand.staerken.rueckmeldung)) === 1 && (await L(() => LYCEE.zustand.merke.berufHolz)) === true);
check('Am Tor: Kenan raucht (neue Szene)', (await schritt()) === 'k3_tor');
await rede('kenan', [3, 0]);
check('Kippe vor deinen Füßen: „Mir nicht.“ – Kenan gedeckt', (await L(() => LYCEE.zustand.merke.kenanGedeckt)) === true);
check('Heimweg', (await schritt()) === 'k3_heim');
const e3 = await geh('bus', 0);
check('Kapitel 3 geschafft: „Dein Schnuppertag“', e3 === 'ende' && /Dein Schnuppertag/.test(await page.textContent('.ly-k-ende')));
await page.click('.ly-k-ende [data-a="weiter"]');
await page.waitForFunction(() => LYCEE.schritt === 'k4_noah');
await klick();
check('Kapitel 4 „Nein sagen“', /Kapitel 4/.test(await page.textContent('.ly-auftrag')));
await rede('noah', 2);
check('Abschreiben: Nein, aber erklärt → „Nein sagen“', (await L(() => LYCEE.zustand.staerken.neinsagen)) === 1 && (await L(() => LYCEE.zustand.merke.erklaert)) === true);
check('Bäcker: kein Geld (neue Szene)', (await schritt()) === 'k4_baecker');
await rede('ayla', [2, 0, 2]);
check('„Bin pleite“ – Noah zahlt; Ben will leihen: „Du gibst Yusuf auch nie was zurück.“', (await L(() => LYCEE.zustand.merke.noahGezahlt)) === true && (await L(() => LYCEE.zustand.merke.benSchulden)) === true);
check('Skate-Ecke (neue Szene)', (await schritt()) === 'k4_skate');
await rede('kenan', 2);
check('Skate-Ecke: „Nur ohne Kamera.“', (await schritt()) === 'k4_halle');
await klick();
await rede('dario', [0, 0]);
check('Schwänzen und Vape: zweimal Nein gesagt', (await L(() => LYCEE.zustand.staerken.neinsagen)) === 3 && !(await L(() => LYCEE.zustand.merke.geschwaenzt)));
check('WC: Bens Portemonnaie (neue Szene)', (await schritt()) === 'k4_wc');
await geh('wc', 0);
check('Portemonnaie zurückgebracht; die Hoffmann-Szene (nur nach Abschreiben) fällt weg', (await L(() => LYCEE.zustand.merke.portiZurueck)) === true && (await schritt()) === 'k4_club');
await klick();
await bild('10-club');
await rede('laurent', 0);
check('Hausaufgaben-Club: drei Aufgaben aus dem Paket gelöst → „Dranbleiben“', (await L(() => (LYCEE.zustand.geloest || []).length)) === 3 && (await L(() => LYCEE.zustand.staerken.dranbleiben)) === 1);
await klick();
await rede('ben', 1);
check('Streit mit Handy-Video: Frau Sommer geholt', (await L(() => LYCEE.zustand.merke.sommerGeholt)) === true);
await rede('hoffmann', 0);
check('Wochenziel gewählt', (await L(() => LYCEE.zustand.merke.zielFragen)) === true);
const e4 = await geh('bus', 0);
check('Kapitel 4 geschafft: „Deine dritte Woche“', e4 === 'ende' && /Deine dritte Woche/.test(await page.textContent('.ly-k-ende')));
await page.click('.ly-k-ende [data-a="weiter"]');
await page.waitForFunction(() => LYCEE.schritt === 'k5_gruppe');
await klick();
check('Kapitel 5 „Gerüchte“', /Kapitel 5/.test(await page.textContent('.ly-auftrag')));
await geh('preau', [1, 0, 0]);
check('Aus der Gruppe geflogen; Bild von dir gesehen; Noah leitet es weiter', (await L(() => LYCEE.zustand.merke.beweisDu)) === true);
await rede('ayla', [1, 0]);
check('Gerücht mit Mila: „Und wenn? Was geht’s Luca an?“', (await L(() => LYCEE.zustand.merke.geruechtStehen)) === true);
await klick();
await geh('meinPlatz', [1, 1, 0]);
check('Schlechter Morgen: „Zuhause war Stress.“ – Hoffmann nach der Stunde', (await L(() => LYCEE.zustand.merke.hoffmannReden)) === true);
await geh('meinPlatz', 2);
check('Zu Unrecht rausgeschickt: rausgehen, nichts sagen', (await L(() => LYCEE.zustand.merke.schuldGeschluckt)) === true);
const e5 = await geh('bus', 0);
check('Kapitel 5 geschafft: „Deine vierte Woche“', e5 === 'ende' && /Deine vierte Woche/.test(await page.textContent('.ly-k-ende')));
await bild('11-ende5');
// Kapitel 6 „Kleine Schritte“: Mutleiter, Anspannung live, Gedanken prüfen, „Gleich“-Karte, Kritiker, eigene Stufe
await page.click('.ly-k-ende [data-a="weiter"]');
await page.waitForFunction(() => LYCEE.schritt === 'k6_tor');
await L(() => { LYCEE.mutTempo = 30; });
await klick();
check('Kapitel 6 „Kleine Schritte“', /Kapitel 6/.test(await page.textContent('.ly-auftrag')));
skalaWahl = [4];
await geh('tor', 0);
const m6 = () => L(() => LYCEE.zustand.merke);
check('Am Tor: Anspannung eingeschätzt (4), reingegangen', (await m6()).torWert === 4 && (await m6()).torRein === true);
await rede('kaya', [0, 0]);
const z6 = () => L(() => LYCEE.zustand);
check('Herr Kaya: eigene Mutleiter sortiert (5 Stufen), Karte genommen', (await z6()).leiter.length === 5 && (await m6()).karte === true, (await z6()).leiter);
skalaWahl = [4, 2];
await geh('preau', 1);
await bild('12-mutprobe');
const log6 = async (id) => ((await z6()).mutLog || []).find((x) => x.id === id);
check('Stufe 1: bei der Gruppe geblieben, Anspannung 4 → 2, Stärke „Dabeibleiben“', (await log6('pause'))?.geblieben === true && (await log6('pause')).nachher === 2 && (await z6()).staerken.bleiben >= 1, await log6('pause'));
skalaWahl = [4, 2];
await geh('gangLachen', [1, 0, 1]);
check('Lachen im Gang: hingeschaut, „wie sicher“ 4 → 2', (await m6()).lachenGeschaut === true && (await log6('lachen'))?.nachher === 2);
await geh('meinPlatz', [4, 0]);
check('Drangenommen: „Gleich“-Karte hingelegt, dann gelesen → Leiter „Vorlesen“ geschafft', (await m6()).tafelKarte === true && (await z6()).leiterStatus.tafel === 'ok');
await rede('laurent', 2);
check('Viel Rot: Mme Laurent gefragt, Komma-Fehler geübt → Leiter „Frage stellen“', (await m6()).testFrage === true && (await z6()).leiterStatus.frage === 'ok');
await rede('kaya', 1);
check('Freitag: Stufe selbst gewählt (Kantine)', (await m6()).stufeKantine === true);
skalaWahl = [3, 1];
await geh('kantinePlatz', 1);
check('Kantine: sitzen geblieben, Bäcker-Szene übersprungen', (await log6('kantine'))?.geblieben === true && !(await log6('baecker')));
const e6 = await geh('bus', 0);
check('Kapitel 6 geschafft: „Deine fünfte Woche“', e6 === 'ende' && /Deine fünfte Woche/.test(await page.textContent('.ly-k-ende')));
// Kapitel 7 „Praktikum“ (Weg Werkstatt, weil im Schnuppertag „Holz“): Liste, Verträge, Kenan als Betreuer, falsches Loch
await page.click('.ly-k-ende [data-a="weiter"]');
await page.waitForFunction(() => LYCEE.schritt === 'k7_liste');
await klick();
check('Kapitel 7 „Praktikum“', /Kapitel 7/.test(await page.textContent('.ly-auftrag')));
await geh('pinnwand', 0);
check('Praktikumsliste gelesen', (await schritt()) === 'k7_vertrag');
await rede('kaya', 0);
check('Verträge bei Herrn Kaya; Werkstatt-Weg (kein Anruf, keine Küche)', (await schritt()) === 'k7_werk', await schritt());
await geh('werkbank', 0);
await rede('mila', 0);
check('Werkstatt mit Kenan, Pause mit Mila', (await schritt()) === 'k7_fehler', await schritt());
await rede('becker', 0);
check('Das falsche Loch: „Ich.“ – für Kenan eingestanden', (await m6()).kenanGerettet === true);
await bild('14-praktikum');
const e7 = await geh('bus', 0);
check('Kapitel 7 geschafft: „Deine erste Arbeitswoche“', e7 === 'ende' && /Deine erste Arbeitswoche/.test(await page.textContent('.ly-k-ende')));
await page.click('.ly-k-ende [data-a="frei"]'); await page.waitForTimeout(500);
await page.keyboard.press('Tab'); await page.waitForSelector('.ly-k-journal'); await page.click('.ly-k-journal [data-r="leiter"]');
check('Journal: Mutleiter mit Häkchen', (await page.$$eval('.ly-leiter li.ok', (l) => l.length)) >= 3);
await bild('13-leiter');
await page.keyboard.press('Escape');
await page.keyboard.press('KeyP'); await page.waitForSelector('.ly-k-raus');
await page.click('.ly-k-raus [data-w="sinne"]');
check('„Kurz raus“ (P): 5-4-3-2-1 startet', /5 Dinge/.test(await page.textContent('.ly-k-raus')));
await page.keyboard.press('Escape'); await page.waitForTimeout(300);
check('„Kurz raus“ mit Escape geschlossen', !(await page.isVisible('.ly-k-raus')));
// Lernstation außerhalb der Geschichte: die eigene Aufgabe kommt dran (noch nicht gelöst)
await L(() => LYCEE.teleport({ x: -4.2, z: -26 })); await page.waitForTimeout(600);
L(() => LYCEE.rede('laurent')); await page.waitForTimeout(400);
await klick(0);
check('Lernstation (Mme Laurent): weitere Aufgaben gelöst, auch die eigene', (await L(() => LYCEE.zustand.geloest)).includes(pk.aufgaben[8].id), await L(() => LYCEE.zustand.geloest));
check('Danach frei herumlaufen, als geschafft gespeichert', (await L(() => LYCEE.zustand.fertig)) === true && /Freies Herumlaufen/.test(await page.textContent('.ly-auftrag')));
check('Keine Fehler in der Konsole', fehler.length === 0, fehler.slice(0, 5));
check('Kein Netz', netz.length === 0, netz.slice(0, 5));
console.log(`lycee :: ${ok} ok, ${bad} Fehler  (Bilder in ${SHOTS})`);
await browser.close();
process.exit(bad ? 1 : 0);

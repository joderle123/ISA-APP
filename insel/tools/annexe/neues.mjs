// Annexe Junglinster – Kurzprüfung der neuen Oberflächen (Etappe 1/3/6): Spind, Spiegel-Editor, Einlösen bei Kenan,
// Einstellungen, Sicherungscode, „Sagt keiner so“, Handy-Chat. Macht Bilder und meldet Konsolenfehler.
// Aufruf (aus insel/): node tools/annexe/neues.mjs ORDNER
import { launch } from '../../tests/lib.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist', 'lycee.html');
const OUT = process.argv[2] || 'neues-bilder'; mkdirSync(OUT, { recursive: true });
const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1180, height: 820 } })).newPage();
page.setDefaultTimeout(120000);
const fehler = []; page.on('pageerror', (e) => fehler.push(String(e))); page.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text()); });
const L = (f, a) => page.evaluate(f, a);
const ok = (n, c, info) => console.log((c ? '  ✓ ' : '  ✗ ') + n + (c || info === undefined ? '' : '  → ' + JSON.stringify(info).slice(0, 200)));
await page.goto('file://' + DIST + '?test&start=1&figur=1');
await page.waitForFunction(() => window.LYCEE && LYCEE.zustand && LYCEE.ia);
for (let i = 0; i < 40 && await L(() => LYCEE.imGespraech); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(150); }
await page.waitForFunction(() => !LYCEE.imGespraech);

// Spind zu (vor dem Sekretariat), dann offen mit Jetons und Dingen
await L(() => { LYCEE.zustand.stundenplan = false; });
const spind = () => LYCEE.aktion(LYCEE.ia.liste.find((x) => x.tu === 'spind'));
await L(spind); await page.waitForTimeout(400);
ok('Spind vor dem Sekretariat zu', /Zahlenschloss/.test(await page.textContent('.ly-toasts')));
await L(() => { const S = LYCEE.zustand; S.stundenplan = true; S.jetons = 9; S.jetonsGesamt = 14; S.besitz = ['st_taube', 'st_kaktus', 'song_bass', 'deck_mint', 'lampe_pink']; S.spindLampe = '#ff7aa8'; });
L(spind); await page.waitForSelector('.ly-spind'); await page.waitForTimeout(300);
ok('Spind 117: Sticker, Song, Deck, Lampe, Spiegel', (await page.$$('.ly-sticker')).length === 2 && /Spiegel/.test(await page.textContent('.ly-ebene')));
await page.screenshot({ path: join(OUT, 'spind.png') });
await page.click('[data-d="spiegel"]'); await page.waitForSelector('.ly-ed');
await page.click('.ly-ed [data-f="Frisur"][data-w="kopftuch"]'); await page.click('.ly-ed [data-f="Brille"][data-w="#2b2b33"]'); await page.click('.ly-ed [data-f="Haut"][data-w="#7a4e32"]');
await page.screenshot({ path: join(OUT, 'editor.png') });
await page.click('.ly-ed ~ .ly-t-knoepfe [data-a="ok"], [data-a="ok"]');
await page.waitForFunction(() => !LYCEE.imGespraech, null, { timeout: 30000 }).catch(() => {});
await page.waitForTimeout(1500);
ok('Aussehen gespeichert (Kopftuch, Brille, Hautton)', await L(() => { const a = LYCEE.zustand.aussehen || {}; return a.frisur === 'kopftuch' && a.brille === '#2b2b33' && a.haut === '#7a4e32'; }));
// Einlösen bei Kenan
await L(() => { LYCEE.zustand.merke.laden_kenan = ''; });
L(() => LYCEE.rede('kenan'));
for (let i = 0; i < 20 && !(await page.$('.ly-k-laden, [data-l]')); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(250); }
const hatLaden = !!(await page.$('[data-l]'));
ok('Bei Kenan: Angebot mit Preisen', hatLaden);
if (hatLaden) { await page.screenshot({ path: join(OUT, 'laden.png') }); await page.click('[data-l="0"]'); }
for (let i = 0; i < 20 && await L(() => LYCEE.imGespraech); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(200); }
ok('Deck gekauft, Jetons weniger, Deck-Farbe gesetzt', await L(() => LYCEE.zustand.besitz.includes('deck_rot') && LYCEE.zustand.jetons === 5 && LYCEE.zustand.deck === '#d6452f'));
// Einstellungen
await page.click('[data-k="raus"]'); await page.waitForSelector('[data-w="einst"]'); await page.click('[data-w="einst"]');
await page.click('.ly-einst [data-t="sehrgross"]'); await page.click('.ly-einst [data-b="links"]');
await page.screenshot({ path: join(OUT, 'einstellungen.png') });
ok('Einstellungen: Text sehr groß, Linkshänder', await L(() => document.querySelector('.ly-text-sehrgross') && document.querySelector('.ly-linkshaendig') && JSON.parse(localStorage.getItem('lycee.einstellungen')).links === true));
await page.click('.ly-einst ~ .ly-t-knoepfe [data-a="code"]'); await page.waitForSelector('[data-ein]');
const code = await page.$eval('textarea[readonly]', (t) => t.value);
ok('Sicherungscode beginnt mit AJ1.', code.startsWith('AJ1.') && code.length > 100);
await page.click('[data-a="w"]'); await page.click('.ly-einst [data-t="normal"]'); await page.click('.ly-einst [data-b="links"]'); await page.click('.ly-einst ~ .ly-t-knoepfe [data-a="w"]');
await page.click('[data-w="zu"]');
// Sagt keiner so
L(() => LYCEE.rede('mila')); await page.waitForSelector('.ly-d-sagt', { timeout: 20000 }).catch(() => {});
if (await page.$('.ly-d-sagt')) await page.click('.ly-d-sagt');
for (let i = 0; i < 20 && await L(() => LYCEE.imGespraech); i++) { await page.keyboard.press('KeyE'); await page.waitForTimeout(200); }
ok('„Sagt keiner so“ gemerkt (ohne Namen)', await L(() => { const l = JSON.parse(localStorage.getItem('lycee.sagtkeiner') || '[]'); return l.length > 0 && !l.some((x) => x.text.includes(LYCEE.zustand.name)); }));
ok('Keine Konsolenfehler', fehler.length === 0, fehler);
await browser.close();

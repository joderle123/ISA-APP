/* Test der Hub-Anbindung (integration/crew-hub.js) – reines Node, kein Browser.
   Aufruf:  node crew/build.js && node crew/tests/hub.mjs */
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const H = require(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'integration', 'crew-hub.js'));
const problems = [];
const expect = (c, m) => { if (!c) problems.push(m); };

expect(Object.keys(H.katalog.spiele).length === 62, 'Katalog hat 62 Spiele');
expect(H.katalog.gebaut >= 28, 'mindestens 28 gebaute Spiele markiert');
// Jede Einheit bekommt ein gebautes Spiel – nie ein toter Link
H.katalog.einheiten.forEach((e) => { const s = H.suggest({ einheit: e.id, max: 1 }); expect(s.length === 1 && s[0].gebaut, 'Einheit ' + e.id + ' hat ein gebautes Spiel'); });
expect(H.suggest({ einheit: 'j1-e04' })[0].id === 'tank-detektiv', 'Katalogspiel der Einheit steht vorn');
expect(H.suggest({}).length === 0, 'ohne Kriterien kein Vorschlag');
// ELDiB + Themen → Grund für die Lehrkraft
const v = H.suggest({ eldib: ['V-21'], themen: ['wut'], max: 3 });
expect(v.length === 3 && v.every((x) => x.grund && x.url.includes('spiel=' + x.id)), 'Vorschläge mit Grund und Link');
expect(H.suggest({ eldib: ['V-21'], themen: ['wut'], ohne: [v[0].id] })[0].id !== v[0].id, 'ohne: schließt aus');
// Themen aus Notizen: lokal, nur Tags, leer bleibt leer
expect(H.themenAusNotizen('').length === 0, 'leere Notiz → keine Tags');
const t = H.themenAusNotizen('Streit in der Pause, abends lange am Handy, doheem Problemer mam Papp');
expect(t.includes('streit') && t.includes('digital') && t.includes('familie'), 'de/lb Stichwörter gefunden: ' + t.join(','));
expect(t.every((x) => typeof x === 'string' && /^[a-z]+$/.test(x)), 'nur Tag-IDs zurück');
expect(H.themenAusNotizen('colère et bagarre, peur', { details: true }).some((d) => d.id === 'wut'), 'fr Stichwörter');
expect(H.themenListe().find((x) => x.id === 'familie').vorsicht === true, 'familie trägt vorsicht');
// Deep-Link und QR
const u = H.spielUrl('funkstille', { rolle: 'b', code: '1234', platz: 3 });
expect(u === H.DEFAULT_BASE + '?spiel=funkstille&code=1234&rolle=B&platz=3', 'Deep-Link: ' + u);
expect(H.spielUrl('x', { basis: 'https://s.lu/i.html' }).startsWith('https://s.lu/i.html?spiel=x&code=' + H.tagescode()), 'Basis + Tagescode');
expect(/^\d{4}$/.test(H.tagescode('2026-10-03')), 'Tagescode 4-stellig');
let threw = false; try { H.spielUrl('Böse Id'); } catch { threw = true; } expect(threw, 'ungültige ID wird abgelehnt');
expect(H.qrSvg(u, { size: 120 }).startsWith('<svg') && H.qrSvg(u).includes('<path'), 'QR-SVG');
expect(H.eldibName('SOZ-32').length > 5 && H.eldibName('ZZ-1') === 'ZZ-1', 'ELDiB-Kurzname');

if (problems.length) { console.log('Hub-Test: ' + problems.length + ' Problem(e)\n- ' + problems.join('\n- ')); process.exit(1); }
console.log('Hub-Test OK – keine Fehler.');

// Erzeugt die Belohnungs-Übersicht für Lehrpersonen (annexe/belohnungen-lehrpersonen.html) aus garderobe.js und pokale.js.
// Aufruf (in insel/): node tools/annexe/belohnungen-liste.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GARDEROBE, ARTEN, LEVEL_AB } from '../../src/lycee/garderobe.js';
import { POKALE } from '../../src/lycee/pokale.js';

const hier = path.dirname(fileURLToPath(import.meta.url));
const ZIEL = path.join(hier, '..', '..', 'annexe', 'belohnungen-lehrpersonen.html');
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const abschnitte = ARTEN.map(([art, titel]) => {
  const teile = GARDEROBE.filter((g) => g.art === art);
  return '<section><h2>' + esc(titel) + ' <small>(' + teile.length + ')</small></h2><table><tr><th></th><th>Teil</th><th>So bekommt man es</th></tr>' +
    teile.map((g) => '<tr><td class="sy">' + g.sy + '</td><td>' + esc(g.name) + '</td><td>' + esc(g.hinweis) + '</td></tr>').join('') + '</table></section>';
}).join('');
const pokale = '<section><h2>🏆 Pokale im Jugendhaus <small>(' + POKALE.length + ')</small></h2><table><tr><th>Pokal</th><th>So bekommt man ihn</th></tr>' +
  POKALE.map((p) => '<tr><td>' + esc(p.name) + '</td><td>' + esc(p.wie) + '</td></tr>').join('') + '</table></section>';
const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Belohnungen im Spiel</title>
<style>body{font:15px/1.45 system-ui,sans-serif;color:#1f2a3d;max-width:900px;margin:24px auto;padding:0 16px;background:#fbf8f2}h1{font-size:26px;margin:0 0 6px}h2{font-size:19px;margin:26px 0 8px}h2 small{color:#6b7280;font-weight:400}
.kasten{background:#fff;border:1px solid #e5dfd3;border-radius:12px;padding:12px 16px}table{width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden}th,td{text-align:left;padding:6px 10px;border-bottom:1px solid #eee;vertical-align:top}th{background:#f1ebe0;font-size:13px}td.sy{width:32px;font-size:20px}
@media print{body{background:#fff;margin:0}section{break-inside:avoid}}</style></head><body>
<h1>Belohnungen im Spiel „Annexe Junglinster“</h1>
<p>Für Lehrpersonen: Was die Jugendlichen im Spiel verdienen können – und wofür.</p>
<div class="kasten"><b>Grundsätze</b><ul>
<li>Alles wird <b>verdient</b> – durch Nebenaufgaben, Spiele im Dorf, Freundschaften und <b>Lernen</b> (Arbeitsblätter, Lektionen zählen für das Dorf-Level).</li>
<li><b>Kein Zufall</b> (keine Lootboxen), <b>kein Geld</b>, <b>nichts läuft ab</b>, nichts geht verloren.</li>
<li>Gesperrte Teile zeigen im Spiel, wie man sie bekommt, mit Fortschrittsbalken (z. B. 3/5).</li>
<li>Dorf-Level: Jetons für Lernen und Aufgaben. Stufen bei ${LEVEL_AB.slice(1).join(', ')} Jetons (Level 2 bis ${LEVEL_AB.length}).</li>
<li>Im Spiel: Garderobe mit Taste G (oder 👕), Emote-Rad mit Taste X (oder 🙌).</li></ul></div>
${abschnitte}${pokale}
<p style="color:#6b7280;font-size:13px;margin-top:28px">Erzeugt aus dem Spiel (garderobe.js, pokale.js) · ${GARDEROBE.length} Teile, ${POKALE.length} Pokale.</p>
</body></html>`;
fs.writeFileSync(ZIEL, html);
console.log('✓ ' + path.relative(process.cwd(), ZIEL) + ' · ' + GARDEROBE.length + ' Teile, ' + POKALE.length + ' Pokale');

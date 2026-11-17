// Annexe Junglinster – DREHBUCH.md aus den Quelltexten erzeugen (nie von Hand bearbeiten).
// Aufruf (aus insel/): node tools/annexe/drehbuch.mjs [--datei=kapitel2.js] [--aus=PFAD]
// Format je Gespräch: Überschrift = Datei · Gespräch, darunter [Sprecher, Text] und Antworten als „→ …“.
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { texte } from './texte.mjs';

const arg = (n, d) => (process.argv.find((a) => a.startsWith('--' + n + '=')) || '').slice(n.length + 3) || d;
const nur = arg('datei', '');
const aus = arg('aus', join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'annexe', 'DREHBUCH.md'));
const NAMEN = { erzaehler: 'Erzähler', du: 'Du', kopf: 'Kopf', bauch: 'Bauch', stolz: 'Stolz', kritiker: 'Fiese Stimme' };
const name = (w) => NAMEN[w] || w.charAt(0).toUpperCase() + w.slice(1);

const alle = texte().filter((t) => !nur || t.datei === nur);
let md = '# Annexe Junglinster – Drehbuch\n\nErzeugt mit `node tools/annexe/drehbuch.mjs` am ' + new Date().toISOString().slice(0, 10) +
  '. Nicht von Hand ändern: Texte stehen in `src/lycee/*.js`.\n' +
  'Format: **[Sprecher]** Text · Antworten als „→“. Zeilennummer in Klammern.\n';
let datei = '', block = '';
for (const t of alle) {
  if (t.datei !== datei) { datei = t.datei; block = ''; md += '\n## ' + datei + '\n'; }
  if (t.block !== block) { block = t.block; md += '\n### ' + block + '\n\n'; }
  if (t.art === 'antwort') md += '- → ' + t.text + ' <sub>(' + t.zeile + ')</sub>\n';
  else if (t.art === 'zeile') md += '- **[' + name(t.wer) + ']** ' + t.text + ' <sub>(' + t.zeile + ')</sub>\n';
  else md += '- *' + (t.wer ? name(t.wer) + ': ' : '') + t.text + '* <sub>(' + t.zeile + ')</sub>\n';
}
writeFileSync(aus, md);
console.log('geschrieben: ' + aus + ' · ' + alle.length + ' Texte');

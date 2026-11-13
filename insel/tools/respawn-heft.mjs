// RESPAWN – Heft für die Lehrperson, aus den Auftrags-Daten erzeugt (immer aktuell).
// Aufruf: node tools/respawn-heft.mjs   → schreibt docs/RESPAWN-Auftraege.md
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { MISSIONEN, THEMEN, MISSION_WEG } from '../src/respawn/daten/index.js';
import { ORTE, FIGUREN } from '../src/respawn/daten/index.js';

const hier = dirname(fileURLToPath(import.meta.url));
const ZEIT = ['Herbst', 'Winter', 'Frühling', 'Sommer'];
const TEIL = { lauf: 'Wettlauf gegen die Uhr', sammeln: 'Einsammeln gegen die Uhr', merk: 'Merken', zuck: 'Still bleiben (nicht zucken)', spiel: 'Geschick (im richtigen Moment tippen)', atem: 'Ruhig atmen' };
const NAME = { ilda: 'Ilda', fraenz: 'Fränz', lucinda: 'Oma Lucinda', jolie: 'Jolie', tun: 'Tun', pit: 'Pit', mika: 'Mika', yara: 'Yara', luc: 'Luc', noor: 'Noor', tiago: 'Tiago', maelle: 'Maëlle' };
const wer = (id) => NAME[id] || (FIGUREN[id] && FIGUREN[id].name) || id;
const ort = (id) => (ORTE.find((o) => o.id === id) || { name: id }).name;

// Was fordert der Auftrag? Schritte in der Welt + Spielteile, die im Quelltext der Szenen stehen
function fordert(m) {
  const s = new Set();
  for (const x of m.schritte) {
    if (TEIL[x.art]) s.add(TEIL[x.art]);
    const q = String(x.szene || '') + String(x.nach || '');
    for (const k of ['merk', 'zuck', 'spiel', 'atem']) if (q.includes("['" + k + "'")) s.add(TEIL[k]);
  }
  return [...s];
}
const wann = (m) => (m.bis != null && m.bis === m.ab ? 'nur im ' + ZEIT[m.ab] : 'ab ' + ZEIT[m.ab || 0]);

function block(m) {
  const z = [];
  z.push(`### ${m.bild} ${m.titel}`);
  z.push('');
  z.push(`*${m.kurz}*`);
  z.push('');
  z.push(`- **Wann und wo:** ${wann(m)}, bei ${wer(m.von)} (${ort(m.ort)})`);
  z.push(`- **So läuft es:** ${m.wie.join(' ')}`);
  z.push(`- **Das fordert:** ${fordert(m).join(' · ')}`);
  const weg = (MISSION_WEG[m.id] || []).map(([, t]) => t);
  if (weg.length) z.push(`- **Mögliche Wege auf der Karte „Dein Weg“:** ${weg.join(' / ')}`);
  z.push('- **Fragen für danach:**');
  for (const f of m.gespraech || []) z.push(`  - ${f}`);
  z.push('');
  return z.join('\n');
}

const aus = [];
aus.push('# RESPAWN – Aufträge. Heft für die Lehrperson');
aus.push('');
aus.push('Diese Datei wird aus den Spieldaten erzeugt (`node tools/respawn-heft.mjs`). Bitte nicht von Hand ändern.');
aus.push('');
aus.push('## So arbeiten Sie damit');
aus.push('');
aus.push('- Ein Auftrag dauert etwa 5 bis 10 Minuten. Die Jugendlichen spielen allein oder zu zweit an einem Gerät.');
aus.push('- Kein Auftrag hat „die richtige Antwort“. Jeder Weg hat einen Preis und einen Gewinn.');
aus.push('- Am Ende steht auf der Karte **„Dein Weg“**: bis zu drei Sätze, was die Person getan hat – ohne Urteil.');
aus.push('  Das ist der Einstieg ins Gespräch: Wer hat welchen Weg? Was ist am nächsten Morgen daraus geworden?');
aus.push('- Die Fragen unten sind Vorschläge. Im Spiel selbst wird nicht nachgefragt und nicht belehrt.');
aus.push('- **Themen-Aufträge** gehören zu einem Thema aus dem Skills-Kurs. Sie sind aus, bis Sie sie einschalten:');
aus.push('  im Startbild unter „Themen“ – oder im Link, zum Beispiel `respawn.html?thema=netz,streit`.');
aus.push('- Mit `?sanft` im Link bleiben die härteren Inhalte aus.');
aus.push('');
aus.push('## Aufträge, die zum Spiel gehören');
aus.push('');
for (const m of MISSIONEN.filter((x) => !x.thema)) aus.push(block(m));
aus.push('## Themen-Aufträge (einschaltbar)');
aus.push('');
for (const t of THEMEN) {
  aus.push(`**${t.bild} ${t.name}** – ${t.kurz} Im Link: \`?thema=${t.id}\``);
  aus.push('');
  for (const m of MISSIONEN.filter((x) => x.thema === t.id)) aus.push(block(m));
}
const ziel = join(hier, '..', 'docs', 'RESPAWN-Auftraege.md');
writeFileSync(ziel, aus.join('\n'));
console.log('geschrieben:', ziel, '·', MISSIONEN.length, 'Aufträge');

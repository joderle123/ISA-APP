// Auszug: Rechenaufgaben aus den Kernkompetenz-Arbeitsblättern der Toolbox (src/data/blaetter/kern*.json) für das
// Arbeitsblatt am eigenen Platz im Schulsimulator. Nur Aufgaben mit eindeutiger Lösung (Rechnen, Lücke, Einheiten,
// Stellenwerte, Vergleichen, Nachbarzahlen). Schreibt src/lycee/blaetter.js. Aufruf: node tools/lycee/blaetter-auszug.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const HIER = dirname(fileURLToPath(import.meta.url));
const QUELLE = join(HIER, '..', '..', '..', 'src', 'data', 'blaetter');
const ZIEL = join(HIER, '..', '..', 'src', 'lycee', 'blaetter.js');

const zahl = (s) => { s = String(s).trim().replace(/\s/g, '').replace(',', '.'); return /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : NaN; };
const op = (a, o, b) => (o === '+' ? a + b : o === '-' ? a - b : o === '*' ? a * b : o === '/' ? (b && Number.isInteger(a / b) ? a / b : NaN) : NaN);
const norm = (t) => t.replace(/[–−]/g, '-').replace(/[·×x]/g, '*').replace(/:/g, '/');
const fmt = (n) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100).replace('.', ','));
const LUECKE = /_{2,}/;
const EINHEIT = [[/^1 ?kg$/, 'g', 1000], [/^(\d+) ?kg$/, 'g', 1000], [/^(\d+) ?m$/, 'cm', 100], [/^(\d+) ?km$/, 'm', 1000], [/^(\d+) ?l$/, 'ml', 1000],
  [/^(\d+) Minuten?$/, 'Sekunden', 60], [/^(\d+) Stunden?$/, 'Minuten', 60], [/^eine halbe Stunde$/, 'Minuten', 30, true], [/^eine Viertelstunde$/, 'Minuten', 15, true]];

function loese(t, frage = '') {
  const roh = t.trim();
  if (!LUECKE.test(roh) && !/\[\]/.test(roh)) return null;
  // Vergleich: „5 € [] 4,99 €“
  let m = roh.match(/^([\d.,]+)\s*([€a-zA-Z]*)\s*\[\]\s*([\d.,]+)\s*\2$/);
  if (m) { const a = zahl(m[1]), b = zahl(m[3]); if (isNaN(a) || isNaN(b)) return null; return { t: roh.replace('[]', '◻'), wahl: ['<', '=', '>'], a: a < b ? '<' : a > b ? '>' : '=' }; }
  // Nachbarzahlen: „___ < 495 < ___“
  m = roh.match(/^_{2,}\s*<\s*(\d+)\s*<\s*_{2,}$/);
  if (m) {
    const n = Number(m[1]), st = /Hunderter/.test(frage) ? 100 : /Zehner/.test(frage) ? 10 : 1;
    if (st === 1) return { t: roh, a: [fmt(n - 1), fmt(n + 1)] };
    const u = Math.floor(n / st) * st; return n % st ? { t: roh, a: [fmt(u), fmt(u + st)] } : null;
  }
  // Einheiten: „1 kg = ___ g“
  m = roh.match(/^(.+?)\s*=\s*_{2,}\s*(\S+)$/);
  if (m) for (const [re, ein, f, fest] of EINHEIT) { const k = m[1].trim().match(re); if (k && m[2] === ein) return { t: roh, a: [fmt(fest ? f : Number(k[1] || 1) * f)] }; }
  // Stellenwerte: „3 H + 4 Z + 5 E = ___“
  m = roh.match(/^(\d+) H \+ (\d+) Z \+ (\d+) E = _{2,}$/);
  if (m) return { t: roh, a: [String(Number(m[1]) * 100 + Number(m[2]) * 10 + Number(m[3]))] };
  // „6 + 6 = 12, also 6 + 7 = ___“ → nur der letzte Teil zählt
  const teil = roh.includes('also') ? roh.split('also').pop() : roh;
  const n = norm(teil).replace(/\s+/g, ' ').trim();
  // a op b = ___ · a op ___ = c · ___ op b = c
  m = n.match(/^(-?[\d.,]+) ([-+*/]) (-?[\d.,]+) = _{2,}$/);
  if (m) { const r = op(zahl(m[1]), m[2], zahl(m[3])); return isNaN(r) ? null : { t: roh, a: [fmt(r)] }; }
  m = n.match(/^(-?[\d.,]+) ([-+*/]) _{2,} = (-?[\d.,]+)$/);
  if (m) { const a = zahl(m[1]), c = zahl(m[3]); const r = m[2] === '+' ? c - a : m[2] === '-' ? a - c : m[2] === '*' ? c / a : a / c; return Number.isFinite(r) && Number.isInteger(r) ? { t: roh, a: [fmt(r)] } : null; }
  m = n.match(/^_{2,} ([-+*/]) (-?[\d.,]+) = (-?[\d.,]+)$/);
  if (m) { const b = zahl(m[2]), c = zahl(m[3]); const r = m[1] === '+' ? c - b : m[1] === '-' ? c + b : m[1] === '*' ? c / b : c * b; return Number.isFinite(r) && Number.isInteger(r) ? { t: roh, a: [fmt(r)] } : null; }
  return null;
}

const blaetter = [];
for (const f of ['kern.json', 'kern-2.json']) {
  for (const b of JSON.parse(readFileSync(join(QUELLE, f), 'utf8'))) {
    const aufgaben = [], info = [];
    let frage = '';
    for (const x of b.de.bausteine) {
      if (x.art === 'info' && x.punkte && info.length < 3) info.push(...x.punkte.slice(0, 3 - info.length));
      if (x.art === 'aufgabe') frage = x.text;
      if (x.art === 'paeckchen') for (const it of x.items) { const l = loese(it, frage); if (l) aufgaben.push({ ...l, frage }); }
      // Tabelle „Vorgänger · Zahl · Nachfolger“ → Nachbarzahlen
      if (x.art === 'tabelle' && (x.spalten || []).join('|') === 'Vorgänger|Zahl|Nachfolger') for (const w of x.werte || []) { const n = zahl(w[1]); if (!isNaN(n)) aufgaben.push({ t: '___ < ' + w[1] + ' < ___', a: [fmt(n - 1), fmt(n + 1)], frage: 'Schreib die Nachbarzahlen auf: Vorgänger und Nachfolger.' }); }
    }
    if (aufgaben.length >= 4) {
      const modul = (b.schlagworte || []).find((s) => /^[RS]\d+$/.test(s)) || b.id.split('-')[1].toUpperCase();
      blaetter.push({ id: b.id, modul, titel: b.de.titel, untertitel: b.de.untertitel || '', info, aufgaben: aufgaben.slice(0, 12) });
    }
  }
}
const kopf = '// Erzeugt von tools/lycee/blaetter-auszug.mjs aus den Kernkompetenz-Arbeitsblättern der Toolbox. Nicht von Hand ändern.\n';
writeFileSync(ZIEL, kopf + 'export const BLAETTER = ' + JSON.stringify(blaetter, null, 0).replace(/\},\{"id"/g, '},\n{"id"') + ';\n');
console.log(blaetter.length + ' Blätter, ' + blaetter.reduce((s, b) => s + b.aufgaben.length, 0) + ' Aufgaben → ' + ZIEL);
for (const b of blaetter) console.log(' ', b.modul, b.titel, b.aufgaben.length);

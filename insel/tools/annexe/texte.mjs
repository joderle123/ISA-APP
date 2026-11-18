// Annexe Junglinster – alle Spieltexte aus den Quellen holen (für Regel-Prüfung und DREHBUCH.md).
// Liest die Quelltexte direkt (kein Ausführen): Sprechzeilen ['wer', 'Text'], Antworten { t: 'Text' }, Plauder- und
// Gruß-Listen. Jede Zeile kommt mit Datei, Zeilennummer, Block (das Gespräch, in dem sie steht) und Art.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const LYCEE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src', 'lycee');
export const DATEIEN = ['story/kapitel1.js', 'story/kapitel2.js', 'story/kapitel3.js', 'story/kapitel4.js', 'story/kapitel5.js', 'story/kapitel6.js', 'story/kapitel7.js', 'story/kapitel8.js', 'story/kapitel9.js', 'story/kapitel10.js', 'geschichte.js', 'kapitel2.js', 'kapitel3.js', 'kapitel4.js', 'kapitel5.js', 'kapitel6.js', 'kapitel7.js', 'faeden.js', 'freunde.js', 'spiel.js', 'stimmen.js', 'welttexte.js'];

const ZEILE = /\[\s*'([a-z][a-z0-9_]*)'\s*,\s*'((?:[^'\\]|\\.)*)'\s*\]/g;   // ['wer', 'Text']
const WAHL = /\bt:\s*'((?:[^'\\]|\\.)*)'/g;                                   // { t: 'Antwort' }
const LISTE = /^\s{2}([a-z][a-z0-9_]*):\s*\[((?:\s*'(?:[^'\\]|\\.)*',?)+)\s*\],?\s*$/;   // id: ['…', '…'] (Plaudern)
const PAAR = /^\s{2}([a-z0-9][a-z0-9_]*):\s*'((?:[^'\\]|\\.)*)',?\s*$/;                    // id: '…' (Gruß)
const BLOCK = /^\s{0,4}([a-zA-Z][a-zA-Z0-9_]*)\s*:\s*(?:\[|\(|async|\{|function)/;

const unesc = (s) => s.replace(/\\'/g, "'").replace(/\\n/g, ' ').replace(/\\\\/g, '\\');

export function texte() {
  const out = [];
  for (const d of DATEIEN) {
    let src; try { src = readFileSync(join(LYCEE, d), 'utf8'); } catch { continue; }
    const zeilen = src.split('\n');
    let block = '', kommentar = false;
    zeilen.forEach((z, i) => {
      const t = z.trim();
      if (t.startsWith('/*')) kommentar = true;
      if (kommentar) { if (t.includes('*/')) kommentar = false; return; }
      if (t.startsWith('//')) return;
      const b = z.match(BLOCK); if (b) block = b[1];
      const k = z.match(/^(?:export\s+)?const\s+([A-Za-z0-9_]+)\s*=/); if (k) block = k[1];
      const ohneKomm = z.replace(/\s\/\/ .*$/, '').replace(/\b(marker|eins|felder|reden|fach|weg)\s*:\s*\[[^\]]*\]/g, '');   // Daten-Listen sind keine Sprechzeilen
      let m;
      ZEILE.lastIndex = 0;
      while ((m = ZEILE.exec(ohneKomm))) {
        if (/^(icon|motiv|haus|skate|stadt)$/.test(m[1])) continue;
        out.push({ datei: d, zeile: i + 1, block, art: 'zeile', wer: m[1], text: unesc(m[2]) });
      }
      WAHL.lastIndex = 0;
      while ((m = WAHL.exec(ohneKomm))) out.push({ datei: d, zeile: i + 1, block, art: 'antwort', wer: 'du', text: unesc(m[1]) });
      const l = ohneKomm.match(LISTE);
      if (l && (d === 'spiel.js' || d === 'stimmen.js')) for (const s of l[2].match(/'((?:[^'\\]|\\.)*)'/g)) out.push({ datei: d, zeile: i + 1, block: block + '.' + l[1], art: 'plaudern', wer: l[1], text: unesc(s.slice(1, -1)) });
      const p = ohneKomm.match(PAAR);
      if (p && d === 'freunde.js' && /GRUSS|ZUSATZ|ENDE/.test(block)) out.push({ datei: d, zeile: i + 1, block, art: 'gruss', wer: p[1], text: unesc(p[2]) });
    });
  }
  return out;
}

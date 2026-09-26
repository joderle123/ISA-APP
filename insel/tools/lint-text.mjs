// Text-Linter für Spielertexte: SAY ≤ 12 Wörter, ≤ 2 Blasen vor einer Wahl, GLIMM ≤ 6, LABEL ≤ 5, Kachel ≤ 6,
// Verbotsliste der Übungswörter (einatmen, ausatmen, Atemübung, Bodyscan, 5-4-3-2-1, Gedankenschiffchen, Traumreise, 4-7-8),
// jede Quest hat patch.back, echteWelt, debrief und glimm.
// Aufruf: node tools/lint-text.mjs [--dir ordner] [--quiet] [--stats]
import { join } from 'node:path';
import { loadContent, ROOT } from './content-load.mjs';
import { lintContent, formatIssue, collectTexts, countWords } from '../src/content/schema/index.js';

const args = process.argv.slice(2);
const argOf = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const dir = argOf('--dir') ? join(process.cwd(), argOf('--dir')) : join(ROOT, 'src/content');
const quiet = args.includes('--quiet');

const t0 = Date.now();
const entries = (await loadContent(dir)).filter((e) => !e.loadError);
const r = lintContent(entries);
let texts = 0, words = 0;
for (const e of entries) for (const t of collectTexts(e.kind, e.def)) { if (!t.teacher) { texts++; words += countWords(t.text); } }

if (!quiet) {
  for (const w of r.warnings) console.log(formatIssue(w, '⚠'));
  for (const e of r.errors) console.log(formatIssue(e, '✘'));
}
console.log(`${r.errors.length ? '✘' : '✔'} Texte geprüft: ${entries.length} Datei(en), ${texts} Spielertexte, ${words} Wörter · ${r.errors.length} Fehler · ${r.warnings.length} Hinweis(e) · ${Date.now() - t0} ms`);
process.exit(r.errors.length ? 1 : 0);

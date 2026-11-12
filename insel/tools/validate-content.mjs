// Content-Validator: Pflichtfelder, Wertelisten, ID-Verweise, Cond/Effect-DSL, Einheiten-IDs, Echos ohne Reparatur.
// Aufruf: node tools/validate-content.mjs [--dir ordner] [--quiet] [--warn-fail]
// Ausgabe je Problem: ✘ datei · pfad · grund (deutsch). Exit 1 bei Fehlern.
import { join } from 'node:path';
import { loadContent, knownSites, ROOT } from './content-load.mjs';
import { validateContent, formatIssue } from '../src/content/schema/index.js';

const args = process.argv.slice(2);
const argOf = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const dir = argOf('--dir') ? join(process.cwd(), argOf('--dir')) : join(ROOT, 'src/content');
const quiet = args.includes('--quiet');
const warnFail = args.includes('--warn-fail');

const t0 = Date.now();
const entries = await loadContent(dir);
const loadErrors = entries.filter((e) => e.loadError).map((e) => ({ file: e.file, path: '', msg: 'Datei lädt nicht: ' + (e.loadError.message || e.loadError) }));
const sites = await knownSites();
const r = validateContent(entries.filter((e) => !e.loadError), { knownSites: sites });
const errors = loadErrors.concat(r.errors);

if (!quiet) {
  for (const w of r.warnings) console.log(formatIssue(w, '⚠'));
  for (const e of errors) console.log(formatIssue(e, '✘'));
}
const kinds = Object.entries(r.counts).map(([k, n]) => `${k} ${n}`).join(', ') || 'keine Inhalte';
console.log(`${errors.length ? '✘' : '✔'} Inhalte geprüft: ${entries.length} Datei(en) [${kinds}] · ${errors.length} Fehler · ${r.warnings.length} Hinweis(e) · ${Date.now() - t0} ms`);
process.exit(errors.length || (warnFail && r.warnings.length) ? 1 : 0);

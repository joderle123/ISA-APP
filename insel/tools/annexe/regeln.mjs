// Annexe Junglinster – Regel-Prüfung aller Spieltexte (vor jeder Abgabe laufen lassen).
// Aufruf (aus insel/): node tools/annexe/regeln.mjs [--alle]   (ohne --alle: nur Fehler und die ersten Hinweise)
// Prüft: Wortzahl je Sprechblase/Antwort (max. 12), verbotene Wörter (derb, sexuell); Jugendsprache nur bei Jugendlichen,
// Therapie- und Moralsprache, Einwürfe aus anderen Sprachen (nur aus der Liste, höchstens einer je Gespräch, nur die
// der Figur), Telefonnummern (nur 112, 116 111 und BEE SECURE 8002 1234 aus der Kurs-Vorlage), Gewichts- und Kalorienangaben.
import { texte } from './texte.mjs';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { LYCEE } from './texte.mjs';

const ALLE = process.argv.includes('--alle');
const MAX_WOERTER = 12;

// Einwürfe: genau diese Liste (vom Auftraggeber gepflegt). Schreibweise wie hier.
export const EINWUERFE = ['Moien', 'Äddi', 'Merci', 'Wéi geet et?', 'Bis muer', 'Gudden Appetit', 'Salut', 'Ça va?', 'Voilà', 'Allez', 'Tudo bem?', 'Fixe', 'Obrigado', 'Obrigada'];
const EINWURF_RE = new RegExp('(^|[^\\p{L}])(' + EINWUERFE.map((e) => e.replace(/[?.]/g, '\\$&').replace(/\\\?$/, '\\??')).join('|') + ')(?=$|[^\\p{L}])', 'giu');
// Fremdwörter, die wie Einwürfe klingen, aber nicht auf der Liste stehen
const FREMD = /(^|[^\p{L}])(hola|ciao|bonjour|bonsoir|olá|oi|bom dia|gracias|grazie|thanks|sorry bro|inshallah|pardon|bisou|bisous|tschau|addi|moin|servus|grüezi|merci vill|okidoki)(?=$|[^\p{L}])/iu;
const VERBOTEN = [
  ['derb', /(scheiß|scheiss|scheiße|arsch|fick|fuck|wichs|hure|fotze|schlampe|bastard|spast|behindert|mongo|schwuchtel|missgeburt|hurensohn|kacke|pisse)/iu],
  ['sexuell', /(sex|nackt|titten|porno)/iu],
];
// Jugendsprache (Entscheidung 18.11.: ausdrücklich erwünscht – so reden Jugendliche heute). Nur Erwachsene und Erzähler
// sollen sie nicht benutzen; tun sie es doch, ist es ein Hinweis (kann ein gewollter Witz sein: die Klassenlehrerin versucht „Jugendsprache“).
const SLANG = /(^|[^\p{L}])(digga|diggah|bro|brudi|bruh|cringe|wallah|vallah|yolo|sheesh|lowkey|ehrenmann|ehrenlos|lost|sus|slay|aura|sein vater|ich schwör|safe|goofy|no cap|real talk|wyld|lit|rizz)(?=$|[^\p{L}])/iu;
const ERWACHSEN = ['hoffmann', 'weber', 'kremer', 'becker', 'sommer', 'laurent', 'kaya', 'fahrer', 'baeckerin', 'erzaehler', 'mesenberg', 'nouvelle', 'kiesser', 'sabli', 'lenning', 'rantini'];
const THERAPIE = [
  /wie war das für dich/i, /was denkst du selbst/i, /es ist okay,? (angst|traurig|wütend)/i, /danke,? dass du so ehrlich/i, /ich merke,? dass/i,
  /das macht mich (traurig|wütend)/i, /du hast gelernt/i, /lohnt sich/i, /ich-botschaft/i, /mutleiter/i, /gefühle? (sind|ist) (okay|normal)/i,
  /fehler gehören/i, /das hilft der ganzen klasse/i, /eure freundschaft ist gewachsen/i,
];
const TELEFON = /(\+?\d[\d \/.-]{4,}\d)/g;
const GEWICHT = /(\d+([.,]\d+)?\s?(kg|g|gramm|kilo|kilogramm|pfund)\b|kalorie|kcal|\bkilos?\b)/i;

const woerter = (t) => t.replace(/\{name\}/g, 'Sam').split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

let EIN_JE_FIGUR = null;
if (existsSync(join(LYCEE, 'stimmen.js'))) {
  try { const m = await import(pathToFileURL(join(LYCEE, 'stimmen.js')).href); EIN_JE_FIGUR = m.EINWURF || null; } catch (e) { console.log('! stimmen.js nicht lesbar: ' + e.message); }
}

const T = texte();
const fehler = [], hinweise = [];
// Auftrag 22.11.2026: zu viel Jugendsprache wirkt aufgesetzt („20-mal Minus Aura“). Meme-Wörter gar nicht, übriger Slang
// sparsam: jedes Wort höchstens 6-mal im ganzen Spiel. Die alten Kapitel (laufen nicht mehr) zählen nicht.
const ALT = /^(kapitel[2-7]|geschichte)\.js$/;
const MEME = /(^|[^\p{L}])(aura|wie sagt ihr|real talk|no cap|rizz|slay|sheesh|yolo|goofy)(?=$|[^\p{L}])/iu;
const SLANG_ALLE = new RegExp(SLANG.source, 'giu');
const slangZahl = {};
const ort = (x) => x.datei + ':' + x.zeile + ' [' + x.wer + '] „' + x.text.slice(0, 70) + (x.text.length > 70 ? '…' : '') + '“';
const einwuerfeJeBlock = new Map();
for (const x of T) {
  const n = woerter(x.text);
  if (n > MAX_WOERTER) (x.wer === 'erzaehler' ? hinweise : fehler).push(['Wortzahl ' + n, ort(x)]);
  for (const [name, re] of VERBOTEN) if (re.test(x.text)) fehler.push(['verboten (' + name + ')', ort(x)]);
  if (!ALT.test(x.datei) && MEME.test(x.text)) fehler.push(['Meme-Wort (wirkt aufgesetzt)', ort(x)]);
  if (!ALT.test(x.datei)) for (const m of x.text.matchAll(SLANG_ALLE)) { const w = m[2].toLowerCase(); slangZahl[w] = (slangZahl[w] || 0) + 1; }
  if (ERWACHSEN.includes(x.wer) && SLANG.test(x.text)) hinweise.push(['Jugendsprache bei Erwachsenen (gewollt?)', ort(x)]);
  for (const re of THERAPIE) if (re.test(x.text)) fehler.push(['Therapie/Moral', ort(x)]);
  // Stammgäste (stammgaeste.js) sprechen ihre Sprache mit Absicht (Rosa Luxemburgisch, Paulo Portugiesisch): keine Einwurf-Regel
  const eigeneSprache = x.datei.endsWith('stammgaeste.js') || x.datei.endsWith('situationen.js');   // Tante Lisette spricht Luxemburgisch
  if (!eigeneSprache && FREMD.test(x.text)) fehler.push(['Einwurf nicht auf der Liste', ort(x)]);
  const ein = eigeneSprache ? [] : [...x.text.matchAll(EINWURF_RE)].map((m) => m[2]);
  if (ein.length) {
    const k = x.datei + '#' + x.block; einwuerfeJeBlock.set(k, (einwuerfeJeBlock.get(k) || []).concat(ein.map((e) => [e, x])));
    if (EIN_JE_FIGUR && x.wer !== 'du' && x.wer !== 'erzaehler') {
      const erlaubt = (EIN_JE_FIGUR[x.wer] || []).map((e) => e.toLowerCase().replace(/\?$/, ''));
      for (const e of ein) if (!erlaubt.includes(e.toLowerCase().replace(/\?$/, ''))) fehler.push(['Einwurf „' + e + '“ gehört nicht zu ' + x.wer, ort(x)]);
    }
  }
  for (const m of x.text.matchAll(TELEFON)) {
    const z = m[1].replace(/\D/g, '');
    if (z.length >= 5 && z !== '116111' && z !== '80021234' && !/^(19|20)\d\d$/.test(z)) fehler.push(['Telefonnummer?', ort(x)]);
  }
  if (/\b112\b/.test(x.text) === false && /\b11[0-9]\b/.test(x.text) && /ruf|tel|nummer/i.test(x.text)) hinweise.push(['Nummer prüfen', ort(x)]);
  if (GEWICHT.test(x.text)) fehler.push(['Gewicht/Kalorien', ort(x)]);
}
for (const [w, n] of Object.entries(slangZahl)) if (n > 6) hinweise.push(['Slang zu oft (' + n + '×)', '„' + w + '“']);
for (const [k, l] of einwuerfeJeBlock) if (l.length > 1) fehler.push(['mehr als ein Einwurf im Gespräch (' + l.map((e) => e[0]).join(', ') + ')', ort(l[1][1])]);

const zaehl = (l) => Object.entries(l.reduce((a, [k]) => { const g = k.replace(/ \d+$/, '').replace(/„.*“ gehört nicht zu .*/, 'Einwurf falsche Figur'); a[g] = (a[g] || 0) + 1; return a; }, {})).map(([k, v]) => k + ': ' + v).join(' · ');
console.log('Texte geprüft: ' + T.length + ' (Zeilen ' + T.filter((x) => x.art === 'zeile').length + ', Antworten ' + T.filter((x) => x.art === 'antwort').length + ', Plaudern/Gruß ' + T.filter((x) => x.art !== 'zeile' && x.art !== 'antwort').length + ')');
console.log('Fehler: ' + fehler.length + (fehler.length ? '  (' + zaehl(fehler) + ')' : ''));
console.log('Hinweise: ' + hinweise.length + (hinweise.length ? '  (' + zaehl(hinweise) + ')' : ''));
for (const [k, o] of fehler.slice(0, ALLE ? 1e9 : 40)) console.log('  ✗ ' + k + ' · ' + o);
if (!ALLE && fehler.length > 40) console.log('  … (' + (fehler.length - 40) + ' weitere, mit --alle)');
for (const [k, o] of hinweise.slice(0, ALLE ? 1e9 : 10)) console.log('  · ' + k + ' · ' + o);
process.exitCode = fehler.length ? 1 : 0;

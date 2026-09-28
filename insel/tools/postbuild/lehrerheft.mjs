// Postbuild-Hook (WP30, DESIGN §10): erzeugt dist/lehrerheft.html – druckbar (A4), offline, nur für die Lehrkraft.
// Pro Einheit: Code-Wort, Ersatzcode, Kursziele (tools/data/skills-kurs-j1.json), Quest, Neu im Spiel (QuestDef grants/
// templates), Aufnäher-Rückseite, Glimm-Zeile, Debrief-Fragen, Echte-Welt-Karte. Vorne: So funktioniert es, Sonder-Codes,
// Codeliste zum Abreißen. j08 steht nur hier (teacherOnly). Eigenes Salz für Ersatzcodes: LUMO_SALT=… node build.mjs
//   import { buildLehrerheft } from './lehrerheft.mjs'; const { html, units, withQuest } = await buildLehrerheft({ root });
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadContent } from '../content-load.mjs';
import { createContent } from '../../src/core/content.js';
import { allCodes, DEFAULT_SALT, isLinesVeilsUnit } from '../../src/systems/codes/model.js';
import { icon } from '../../src/ui/icons.js';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const t = (v) => (v && typeof v === 'object' ? v.t : v) || '';
const MODULE_COLOR = { 'j1-m0': '#e9a23b', 'j1-m1': '#22b8a3', 'j1-m2': '#3fb954', 'j1-m3': '#6f86e6', 'j1-m4': '#9b5cff', 'j1-m5': '#d9a800', 'j1-m6': '#e85d2a', 'j1-m7': '#e06aa9', 'j1-m8': '#5fae5b', 'j1-m9': '#b8a52a', joker: '#556' };
const REGION_NAME = { hafen: 'Hafen-Dorf', strand: 'Palmenstrand', dschungel: 'Dschungel', klippen: 'Sturmklippen', moor: 'Flüstermoor', markt: 'Markt-Hügel', vulkan: 'Vulkan', glimmer: 'Glimmerwolke', quellen: 'Quellental', leuchtturm: 'Leuchtturm' };
const ABILITY_LABEL = { blick: 'Blick', teamgeist: 'Teamgeist', schwimmen: 'Schwimmen', klettern: 'Klettern', segel: 'Gefühlssegel', tauchen: 'Tauchen', ruhe: 'Ruhe', mut: 'Mut' };
const UPGRADE_LABEL = {
  'blick.faeden': 'Blick: Fäden', 'blick.tanks': 'Blick: Gläser', 'blick.koerper': 'Blick: Körpersignale', 'blick.doppel': 'Blick: Doppel-Auren', 'blick.grenzen': 'Blick: Grenzen', 'blick.streittiere': 'Blick: Streit-Tiere', 'blick.masken': 'Blick: Masken',
  'segel.kombi': 'Segel: Kombis', 'ruhe.puls': 'Ruhe: Puls', 'ruhe.koerper': 'Ruhe: Körper-Skills', 'ruhe.sinne': 'Ruhe: Sinnes-Skills', 'ruhe.kopf': 'Ruhe: Kopf-Skills', 'ruhe.ampel': 'Ruhe: Ampelplan', 'ruhe.rucksack': 'Ruhe: Rucksack',
  'mut.zeichen': 'Mut: Zeichen', 'mut.klarklang': 'Mut: Klarklang', 'mut.stopp': 'Mut: Stopp-Schild', 'mut.nein': 'Mut: Nein-Züge', 'mut.leiter': 'Mut: Leiter',
  'teamgeist.ruf': 'Teamgeist: Crew-Ruf', 'teamgeist.hilfe': 'Teamgeist: Hilfe holen', 'teamgeist.zweitesNein': 'Teamgeist: zweites Nein', 'teamgeist.zuschauer': 'Teamgeist: Zuschauer',
};
const TEMPLATE_LABEL = { wegTor: 'Weg und Tor', tragen: 'Tragen', szene: 'Szene', ermitteln: 'Ermitteln', treppe: 'Treppe', befreunden: 'Befreunden', lotsen: 'Lotsen', boss: 'Boss', bauen: 'Bauen', pruefung: 'Prüfung', nachtwache: 'Nachtwache', erinnerung: 'Erinnerung', auftrag: 'Auftrag' };

function grantLabels(q) {
  const out = [];
  // Ohne eigene grants (z. B. QUELLE: die Stufe gibt eine Figur mitten in der Quest) gilt die Kurzfassung
  const list = q && Array.isArray(q.grants) ? q.grants : (q && q.kurzfassung && q.kurzfassung.grants) || [];
  for (const g of list) {
    if (!g || typeof g !== 'object') continue;
    if (g.grant) out.push(ABILITY_LABEL[g.grant] || g.grant);
    if (g.upgrade) out.push(UPGRADE_LABEL[g.upgrade] || g.upgrade);
    if (g.feather) out.push('Feder: ' + g.feather);
    if (g.gadget) out.push('Gadget: ' + g.gadget);
  }
  return out;
}

export async function buildLehrerheft({ root, salt = process.env.LUMO_SALT || DEFAULT_SALT, now = new Date() } = {}) {
  const entries = (await loadContent(join(root, 'src/content'))).filter((e) => !e.loadError);
  const content = createContent({ entries, log: { warn: () => {} } });
  const wl = content.get('wordlist', 'wordlist');
  const words = wl && wl.words && wl.words.length >= 256 ? wl.words : null;
  const kurs = JSON.parse(readFileSync(join(root, 'tools/data/skills-kurs-j1.json'), 'utf8'));
  const kursUnit = (id) => (kurs.units || []).find((u) => u.id === id) || null;
  const kursModule = (id) => (kurs.modules || []).find((m) => m.id === id) || null;
  const unitsDef = content.get('units', 'units');
  const modules = unitsDef.modules || [];
  const codes = allCodes(content, { words, salt, questDefs: (id) => content.get('quests', id) });
  const codeOf = (kind, id) => codes.find((c) => c.kind === kind && c.id === id) || null;
  const units = content.units;
  let withQuest = 0;
  const missingQuests = [];

  // ---- Einheit als Karte ----
  function unitCard(u) {
    const q = content.get('quests', u.id);
    const k = kursUnit(u.id);
    const c = codeOf('unit', u.id);
    if (q) withQuest++; else missingQuests.push(u.id);
    const lv = isLinesVeilsUnit(u, q);
    const grants = grantLabels(q);
    const templates = (q && q.templates ? q.templates : []).map((x) => TEMPLATE_LABEL[x] || x);
    const ziele = (k && k.ziele) || (q && q.kursziele) || [];
    const col = MODULE_COLOR[u.module] || MODULE_COLOR.joker;
    const nr = u.joker ? 'J' + u.nr : String(u.nr);
    return `
    <article class="unit" data-unit="${esc(u.id)}" style="--mod:${col}">
      <header class="unit-head">
        <span class="unit-nr">${esc(nr)}</span>
        <div class="unit-titles">
          <h3>${esc(u.title)}</h3>
          <p class="unit-meta">${esc(u.joker ? 'Joker' : 'Einheit ' + u.nr)}${k && k.dauer ? ` · ${esc(k.dauer)} min Kurs` : ''}${u.stamp ? ` · Stempel „${esc(u.stamp)}“` : ''}${u.teacherOnly ? ' · <b>nur Lehrer-Liste</b>' : ''}${lv ? ' · <b>Lines &amp; Veils</b>' : ''}${u.after ? ` · passt nach Einheit ${esc(u.after.replace('j1-e', ''))}` : ''}</p>
        </div>
        <div class="unit-code"><span class="code">${esc(c ? c.code : u.code)}</span>${c && c.alt ? `<small>Ersatz: ${esc(c.alt)}</small>` : ''}</div>
      </header>
      ${k && k.kurz ? `<p class="unit-kurz">${esc(k.kurz)}</p>` : ''}
      <div class="unit-grid">
        <section>
          <h4>Kursziele</h4>
          ${ziele.length ? `<ul>${ziele.map((z) => `<li>${esc(z)}</li>`).join('')}</ul>` : '<p class="muted">–</p>'}
        </section>
        <section>
          <h4>Im Spiel</h4>
          <p><b>${esc(u.quest)}</b> · ${esc(REGION_NAME[u.region] || u.region)}${q && q.estMinutes ? ` · etwa ${esc(q.estMinutes)} min` : ''}${q && q.kurzfassung && q.kurzfassung.minutes ? ` · Kurzfassung ${esc(q.kurzfassung.minutes)} min` : ''}</p>
          ${q ? `<p><b>Neu:</b> ${esc(grants.length ? grants.join(', ') : 'keine neue Kraft')}${templates.length ? ` · <span class="muted">${esc(templates.join(' · '))}</span>` : ''}</p>` : '<p class="muted">Quest-Daten folgen mit dem Inhalts-Paket der Region.</p>'}
          ${q && q.glimm ? `<p><b>Glimm:</b> „${esc(t(q.glimm))}“</p>` : ''}
        </section>
        <section class="bridge">
          <h4>Brücken in den Unterricht</h4>
          <p><b>Rückseite des Aufnähers:</b> ${q && q.patch && q.patch.back ? `„${esc(t(q.patch.back))}“` : '<span class="muted">folgt</span>'}</p>
          <p><b>Echte-Welt-Karte:</b> ${q && q.echteWelt ? esc(t(q.echteWelt)) : '<span class="muted">folgt</span>'}</p>
          <p><b>Debrief:</b></p>
          ${q && Array.isArray(q.debrief) && q.debrief.length ? `<ol>${q.debrief.map((d) => `<li>${esc(t(d))}</li>`).join('')}</ol>` : '<p class="muted">folgt</p>'}
        </section>
        ${q && q.lehrerheft ? extraCard(q.lehrerheft) : ''}
      </div>
    </article>`;
  }

  // Zusatz je Quest (QuestDef.lehrerheft): Wortliste der Spielbegriffe mit Bild, Hinweise für die Lehrkraft
  function extraCard(x) {
    const words = Array.isArray(x.wortliste) ? x.wortliste : [];
    return `
        <section class="bridge extra">
          ${words.length ? `<h4>Spielbegriffe (Wortliste mit Bild)</h4><table class="words"><tbody>${words.map((w) => `<tr><td class="pic">${icon(w.bild || 'punkt', { size: 22 })}</td><td><b>${esc(w.wort)}</b></td><td>${esc(w.heisst || '')}</td></tr>`).join('')}</tbody></table>` : ''}
          ${x.hinweis ? `<p class="hint"><b>${esc(x.hinweis)}</b></p>` : ''}
          ${x.spiegel ? `<p class="muted">${esc(x.spiegel)}</p>` : ''}
        </section>`;
  }

  // ---- Module und Joker ----
  const sections = [];
  for (const m of modules) {
    const km = kursModule(m.id);
    const list = units.filter((u) => u.module === m.id);
    sections.push(`
    <section class="module" style="--mod:${MODULE_COLOR[m.id] || '#556'}">
      <header class="module-head">
        <span class="module-nr">M${esc(m.nr)}</span>
        <div><h2>${esc(m.title)}</h2>${km && km.leitfrage ? `<p class="module-frage">${esc(km.leitfrage)}</p>` : ''}${km && km.zielAmEnde ? `<p class="module-ziel">${esc(km.zielAmEnde)}</p>` : ''}<p class="module-region">Region: ${esc(REGION_NAME[m.region] || m.region)} · Modul-Code für Neue: <b>${esc((unitsDef.codes.modules || {})[m.id] || '–')}</b></p></div>
      </header>
      ${list.map(unitCard).join('')}
    </section>`);
  }
  const jokers = units.filter((u) => u.joker);
  sections.push(`
    <section class="module" style="--mod:${MODULE_COLOR.joker}">
      <header class="module-head"><span class="module-nr">J</span><div><h2>Joker-Einheiten</h2><p class="module-ziel">Event-Episoden, frei platzierbar, nie nötig für den Hauptweg. j08 „Der stille Abend“ steht nur in dieser Liste: ohne Timer, ohne Wertung, nur mit Lehrer-Code.</p></div></header>
      ${jokers.map(unitCard).join('')}
    </section>`);

  // ---- Vorne: Codeliste, Sonder-Codes ----
  const codeRows = units.map((u) => { const c = codeOf('unit', u.id); return `<tr${u.teacherOnly ? ' class="teacher-only"' : ''}><td>${esc(u.joker ? 'J' + u.nr : String(u.nr))}</td><td>${esc(u.title)}</td><td class="code">${esc(c ? c.code : u.code)}</td><td class="alt">${esc(c && c.alt ? c.alt : '')}</td></tr>`; });
  const special = codes.filter((c) => c.kind !== 'unit');
  const specialRows = special.map((c) => `<tr><td class="code">${esc(c.code)}</td><td>${esc(c.label)}</td><td class="alt">${esc(c.alt || '')}</td></tr>`);
  const date = now.toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LUMO – Lehrerheft (Staffel 1)</title>
<style>
  :root { --ink: #1a1830; --muted: #5a5870; --line: #d8d6e4; --paper: #fff; --mod: #556; }
  * { box-sizing: border-box; }
  html { background: #f2f1f7; }
  body { margin: 0; color: var(--ink); font: 15px/1.45 "Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif; }
  .sheet { max-width: 210mm; margin: 0 auto; padding: 16mm 14mm; background: var(--paper); }
  h1 { margin: 0 0 4px; font-size: 34px; letter-spacing: 0.02em; }
  h2 { margin: 0; font-size: 24px; }
  h3 { margin: 0; font-size: 19px; }
  h4 { margin: 0 0 6px; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--mod); }
  p { margin: 0 0 6px; }
  ul, ol { margin: 0 0 6px; padding-left: 20px; }
  li { margin-bottom: 3px; }
  .muted { color: var(--muted); }
  .kicker { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); }
  .lead { font-size: 17px; }
  .cover { padding-bottom: 12mm; border-bottom: 3px solid var(--ink); margin-bottom: 10mm; }
  .cover .meta { color: var(--muted); font-size: 13px; }
  .box { padding: 12px 16px; border: 1.5px solid var(--line); border-radius: 12px; margin-bottom: 12px; background: #fafaff; }
  .box h3 { margin-bottom: 6px; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th, td { padding: 6px 8px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
  thead th { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
  td.code, .code { font-family: "SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace; font-weight: 700; letter-spacing: 0.08em; }
  td.alt { font-family: Menlo, Consolas, monospace; font-size: 12px; color: var(--muted); }
  tr.teacher-only td { background: #fff3f6; }
  .tear { border: 2px dashed var(--ink); border-radius: 12px; padding: 10px 14px; margin: 10mm 0; }
  .module { margin-top: 10mm; page-break-before: always; break-before: page; }
  .module-head { display: flex; gap: 14px; align-items: flex-start; padding-bottom: 10px; margin-bottom: 12px; border-bottom: 3px solid var(--mod); }
  .module-nr { flex: none; width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; background: var(--mod); color: #fff; font-weight: 800; font-size: 20px; }
  .module-frage { font-size: 16px; font-weight: 600; margin-top: 4px; }
  .module-ziel { color: var(--muted); }
  .module-region { font-size: 13px; color: var(--muted); }
  .unit { border: 1.5px solid var(--line); border-left: 6px solid var(--mod); border-radius: 12px; padding: 12px 14px; margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid; }
  .unit-head { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 8px; }
  .unit-nr { flex: none; min-width: 40px; height: 40px; padding: 0 8px; border-radius: 10px; display: grid; place-items: center; background: var(--mod); color: #fff; font-weight: 800; font-size: 17px; }
  .unit-titles { flex: 1; min-width: 0; }
  .unit-meta { font-size: 13px; color: var(--muted); }
  .unit-code { flex: none; text-align: right; }
  .unit-code .code { display: block; font-size: 22px; padding: 4px 10px; border: 2px solid var(--ink); border-radius: 8px; }
  .unit-code small { display: block; margin-top: 4px; font-size: 11px; color: var(--muted); font-family: Menlo, Consolas, monospace; }
  .unit-kurz { font-style: italic; color: #33314a; margin-bottom: 10px; }
  .unit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 16px; }
  .unit-grid .bridge { grid-column: 1 / -1; padding-top: 8px; border-top: 1px dashed var(--line); }
  .words td { padding: 3px 6px; font-size: 13px; }
  .words td.pic { width: 30px; color: var(--mod); }
  .words svg { display: block; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .hint { margin-top: 8px; padding: 6px 10px; border-left: 4px solid var(--mod); background: #fafaff; }
  .foot { margin-top: 14mm; padding-top: 8px; border-top: 1px solid var(--line); font-size: 12px; color: var(--muted); }
  @media print {
    html { background: #fff; }
    .sheet { max-width: none; padding: 0; }
    a { color: inherit; text-decoration: none; }
    @page { size: A4; margin: 14mm; }
  }
  @media (max-width: 640px) { .cols, .unit-grid { grid-template-columns: 1fr; } .unit-head { flex-wrap: wrap; } }
</style>
</head>
<body>
<div class="sheet">
  <header class="cover">
    <p class="kicker">Skills-Kurs Jahr 1 · CDSE Annexe Junglinster</p>
    <h1>LUMO – Lehrerheft</h1>
    <p class="lead">Staffel 1 „Das zerbrochene Herzglas“ · 10 Module, 30 Einheiten, 9 Joker – jede Stunde endet mit einem Code, der genau ihre Quest öffnet.</p>
    <p class="meta">Stand ${esc(date)} · erzeugt beim Build · nur für die Lehrkraft · Druck auf A4</p>
  </header>

  <section class="box">
    <h3>So funktioniert es</h3>
    <div class="cols">
      <div>
        <p><b>Code am Ende der Stunde.</b> Ein Wort (z. B. <span class="code">WELLE</span>), groß oder klein, im Tagebuch unter „Code“. Es öffnet die Hauptquest, die neue Kraft, die Regionsschicht, den Aufnäher und die Echte-Welt-Karte. Inhalte kommen nie vor der Stunde.</p>
        <p><b>Verpasst?</b> Jeder spätere Code setzt frühere Einheiten ohne Code auf <b>Kurzfassung</b>: Fähigkeit, Splitter und Farbe sind da, dazu eine 3-Minuten-Szene. Die volle Quest bleibt mit ihrem Code erhalten.</p>
        <p><b>Ersatzcode.</b> Wenn ein Code-Wort die Runde macht: Jede Einheit hat zusätzlich einen Ersatzcode WORT-WORT-ZAHL (Zahl über das Zahlenrad). Eigenes Salz pro Schuljahr: <span class="code">LUMO_SALT=… node build.mjs</span>${salt !== DEFAULT_SALT ? ' (dieses Heft: eigenes Salz)' : ''}.</p>
      </div>
      <div>
        <p><b>Drei Brücken in den Unterricht:</b> die Rückseite des Aufnähers („Dreht mal eure Aufnäher um.“), die freiwillige Echte-Welt-Karte (gemacht / versucht / diesmal nicht – jede Antwort zählt gleich, nichts verlässt das Gerät) und 1–2 Debrief-Fragen pro Quest in diesem Heft.</p>
        <p><b>Lehrer-Panel</b> (Code <span class="code">${esc(unitsDef.codes.teacher || '–')}</span>): Codeliste, Inselwetter, Lines &amp; Veils, Umbenennen (Figuren, Glimm, Vögel – damit keine Figur wie ein Kind der Gruppe heißt), Farben des Gefühlsrads, eingelöste Codes je Spielstand.</p>
        <p><b>Wichtig:</b> Eine eingelöste Quest heißt nicht, dass das Thema behandelt ist.</p>
        <p><b>Lines &amp; Veils.</b> Bei einem aktuellen Vorfall laufen e17, e26, e28, j08 und markierte Szenen nur als Kurzfassung ohne Szene. Pause/X, Ausgang, Zurückspulen und „Hilfe holen“ sind immer da.</p>
      </div>
    </div>
  </section>

  <section class="box">
    <h3>Sonder-Codes</h3>
    <table><thead><tr><th>Code</th><th>Wirkung</th><th>Ersatzcode</th></tr></thead><tbody>${specialRows.join('')}</tbody></table>
    <p class="muted" style="margin-top:6px">Inselwetter: alle tippen denselben Code, damit niemand herausgehoben wird – 20 Minuten Spielzeit. Modul-Codes für Neue: alle Einheiten bis zu diesem Modul als Kurzfassung.</p>
  </section>

  <section class="tear">
    <h3>Codeliste zum Abreißen</h3>
    <table><thead><tr><th>Nr</th><th>Einheit</th><th>Code</th><th>Ersatzcode</th></tr></thead><tbody>${codeRows.join('')}</tbody></table>
    <p class="muted" style="margin-top:6px">Rosa: nur in dieser Liste (nicht an die Klasse geben).</p>
  </section>

  ${sections.join('')}

  <footer class="foot">LUMO – die Skills-Insel · ${esc(units.length)} Einheiten, ${esc(withQuest)} davon mit vollständigen Quest-Daten · Dieses Heft enthält Kursbegriffe und Debrief-Fragen und ist nicht für Schüler:innen gedacht.</footer>
</div>
</body>
</html>
`;
  return { html, units: units.length, withQuest, missingQuests, codes: codes.length, salt };
}

export default async function lehrerheft({ root, distDir, log }) {
  const r = await buildLehrerheft({ root });
  writeFileSync(join(distDir, 'lehrerheft.html'), r.html);
  log(`Lehrerheft: ${r.units} Einheiten (${r.withQuest} mit Quest-Daten), ${r.codes} Codes → dist/lehrerheft.html (${(Buffer.byteLength(r.html) / 1024).toFixed(0)} KB)`);
}

// Sport-Einheiten (Auftrag 22.11.2026): je Sportart 6 Stunden zum Mitnehmen in die Halle.
// Aufbau je Sportart: Übersichtsseite (Lernziele, 6-Wochen-Plan, Material, Mini-Regeln, „So bleiben alle dran“) und je
// Stunde eine Seite (Satz der Stunde, Blöcke mit Minuten, Aufbau, Ablauf, leichter/schwerer, Spielfeld-Skizze,
// Doppelstunde, Tipp für alle). Dazu ein Grundlagen-Heft (Prinzipien, Aufwärmspiele, Match-Formate, Teams ohne Wählen).
// Aufruf (aus isa-app/): node tools/sport/bau.mjs [handball fussball …]   → offline/sport/Sport-<Name>.pdf
// Inhalt: tools/sport/inhalt/<id>.mjs (export const SPORT = {...}); Grundlagen: inhalt/grundlagen.mjs (export const GRUND).
import { writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { esc, md, SCHRIFT, skizze } from './gemeinsam.mjs'

const HIER = dirname(fileURLToPath(import.meta.url)), ROOT = join(HIER, '..', '..')
const AUS = join(ROOT, 'offline', 'sport'), HTML = join(HIER, 'aus')
mkdirSync(AUS, { recursive: true }); mkdirSync(HTML, { recursive: true })
const require = createRequire(import.meta.url)

const ART = { auf: 'Aufwärmspiel', technik: 'Technik im Spiel', spielnah: 'Spielnah üben', match: 'Match', schluss: 'Abschluss', station: 'Stationen', extra: 'Zusatz' }

function block(b, von, farbe) {
  const bis = von + b.min
  return `<div class="block art-${b.art}">
    <div class="zeit"><b>${von}–${bis}</b><span>Min.</span></div>
    <div class="inh">
      <h3>${esc(b.name)} <span class="art">${ART[b.art] || ''}</span></h3>
      ${b.aufbau ? `<p class="aufbau"><b>Aufbau:</b> ${md(b.aufbau)}</p>` : ''}
      ${b.ablauf?.length ? `<ul>${b.ablauf.map((x) => `<li>${md(x)}</li>`).join('')}</ul>` : ''}
      ${b.leichter || b.schwerer ? `<p class="var">${b.leichter ? `<span class="l">leichter</span> ${md(b.leichter)}` : ''}${b.schwerer ? ` <span class="s">schwerer</span> ${md(b.schwerer)}` : ''}</p>` : ''}
      ${b.achtung ? `<p class="achtung">⚠ ${md(b.achtung)}</p>` : ''}
    </div>
    ${b.skizze ? `<div class="sk">${skizze(b.skizze, farbe)}</div>` : ''}
  </div>`
}

function stundeSeite(sp, st, i) {
  let t = 0
  const bl = st.bloecke.map((b) => { const h = block(b, t, sp.farbe); t += b.min; return h }).join('')
  return `<section class="seite stunde" data-nr="${i + 2}">
    <header class="kopf"><div class="band"><span class="sp">${esc(sp.name)}</span><span class="wo">Woche ${st.nr} von 6</span></div>
      <h1>${esc(st.titel)}</h1><p class="sw">${md(st.schwerpunkt)}</p></header>
    <div class="satz"><span>Satz der Stunde</span><p>„${esc(st.satz)}“</p></div>
    <div class="inhalt">${bl}
      ${st.doppel ? `<div class="doppel"><b>Doppelstunde (+45 Min.):</b> ${md(st.doppel)}</div>` : ''}
    </div>
    <footer class="fuss"><div><b>Material:</b> ${md(st.material)}</div>${st.alle ? `<div class="alle"><b>Damit alle dabei bleiben:</b> ${md(st.alle)}</div>` : ''}</footer>
  </section>`
}

function uebersicht(sp) {
  return `<section class="seite deck" data-nr="1">
    <header class="titel"><div class="kicker">Sport · 6 Wochen · Annexe</div><h1>${esc(sp.name)}</h1><p>${md(sp.untertitel)}</p></header>
    <div class="inhalt">
      <div class="zwei">
        <div class="karte"><h2>Nach 6 Wochen können sie …</h2><ul>${sp.lernziele.map((x) => `<li>${md(x)}</li>`).join('')}</ul></div>
        <div class="karte"><h2>Die Regeln, die reichen</h2><ul>${sp.regeln.map((x) => `<li>${md(x)}</li>`).join('')}</ul></div>
      </div>
      <h2 class="plan-t">Der 6-Wochen-Plan</h2>
      <table class="plan"><thead><tr><th>Wo.</th><th>Thema</th><th>Aufwärmspiel</th><th>Kern</th><th>Match mit Extra-Regel</th></tr></thead><tbody>
        ${sp.stunden.map((st) => { const f = (a) => st.bloecke.find((b) => b.art === a); const kern = st.bloecke.filter((b) => b.art === 'technik' || b.art === 'spielnah' || b.art === 'station').map((b) => b.name).join(' · ')
          return `<tr><td class="n">${st.nr}</td><td><b>${esc(st.titel)}</b></td><td>${esc(f('auf')?.name)}</td><td>${esc(kern)}</td><td>${esc(st.matchKurz || f('match')?.name)}</td></tr>` }).join('')}
      </tbody></table>
      <div class="zwei">
        <div class="karte dran"><h2>So bleiben alle dran</h2><ul>${sp.dran.map((x) => `<li>${md(x)}</li>`).join('')}</ul></div>
        <div class="karte"><h2>Material für den Block</h2><ul>${sp.material.map((x) => `<li>${md(x)}</li>`).join('')}</ul>
          ${sp.challenge ? `<h2 style="margin-top:2.5mm">Klassen-Challenge (6 Wochen)</h2><p>${md(sp.challenge)}</p>` : ''}</div>
      </div>
      ${sp.sicherheit ? `<p class="sicher"><b>Sicherheit:</b> ${md(sp.sicherheit)}</p>` : ''}
    </div>
    <footer class="fuss leg"><span><i class="pa"></i> Team A</span><span><i class="pb"></i> Team B</span><span><i class="pj"></i> Joker</span><span><i class="pk"></i> Hütchen</span><span>- - → Pass</span><span>—→ Laufweg</span><span>⌇→ Dribbeln</span></footer>
  </section>`
}

function grundSeiten(g) {
  return g.seiten.map((s, i) => `<section class="seite grund" data-nr="${i + 1}">
    <header class="kopf"><div class="band"><span class="sp">Sport · Grundlagen</span><span class="wo">${i + 1} / ${g.seiten.length}</span></div><h1>${esc(s.titel)}</h1>${s.unter ? `<p class="sw">${md(s.unter)}</p>` : ''}</header>
    <div class="inhalt">${s.teile.map((t) => t.liste ? `<div class="karte${t.breit ? ' breit' : ''}"><h2>${esc(t.titel)}</h2><ul>${t.liste.map((x) => `<li>${md(x)}</li>`).join('')}</ul></div>`
      : t.spiele ? `<div class="spiele">${t.spiele.map((x) => `<div class="spiel"><h3>${esc(x.name)}${x.fuer ? ` <span class="art">${esc(x.fuer)}</span>` : ''}</h3><p>${md(x.text)}</p>${x.tipp ? `<p class="var"><span class="l">Tipp</span> ${md(x.tipp)}</p>` : ''}</div>`).join('')}</div>`
      : `<div class="karte breit"><h2>${esc(t.titel)}</h2><p>${md(t.text)}</p></div>`).join('')}</div>
  </section>`).join('')
}

const CSS = `${SCHRIFT}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#fff}
body{font-family:Atkinson,sans-serif;color:#222b38;font-size:9.6pt;line-height:1.3;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.seite{background:#fff;width:210mm;height:297mm;padding:10mm 11mm 9mm;display:flex;flex-direction:column;page-break-after:always;overflow:hidden;position:relative}
h1,h2,h3,.band,.kicker,.zeit b,th{font-family:Lexend,sans-serif}
.band{display:flex;justify-content:space-between;align-items:center;background:var(--f);color:#fff;border-radius:2.5mm;padding:1.6mm 3.5mm;font-weight:700;font-size:9pt;letter-spacing:.06em;text-transform:uppercase}
.kopf h1{font-size:19pt;font-weight:800;margin:2.6mm 0 .6mm;line-height:1.1}
.kopf .sw{font-size:10pt;color:#4a5668}
.satz{margin:2.6mm 0 2.4mm;border-left:2.2mm solid var(--f);background:var(--z);border-radius:0 2.5mm 2.5mm 0;padding:1.8mm 3.5mm;display:flex;gap:3mm;align-items:center}
.satz span{font-family:Lexend;font-weight:700;font-size:7.6pt;text-transform:uppercase;letter-spacing:.05em;color:var(--t);white-space:nowrap}
.satz p{font-size:11.5pt;font-weight:700}
.inhalt{flex:1;display:flex;flex-direction:column;gap:2.1mm;min-height:0}
.block{display:grid;grid-template-columns:13mm 1fr;gap:2.6mm;border:.35mm solid #d9dee6;border-radius:2.6mm;padding:2mm 2.6mm;break-inside:avoid;background:#fff}
.block:has(.sk){grid-template-columns:13mm 1fr 52mm}
.block.art-match{border-color:var(--f);background:var(--z)}
.zeit{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:.6mm}
.zeit b{font-size:10.5pt;font-weight:800;color:var(--t)}.zeit span{font-size:7pt;color:#6b7585}
.inh h3{font-size:10.8pt;font-weight:700;margin-bottom:.8mm}
.art{font-family:Atkinson;font-weight:700;font-size:7.2pt;text-transform:uppercase;letter-spacing:.05em;color:var(--t);background:var(--z);border-radius:9mm;padding:.2mm 1.8mm;margin-left:1mm;vertical-align:middle}
.aufbau{color:#3f4a5a;margin-bottom:.6mm}
.inh ul{padding-left:4mm;margin:.4mm 0}.inh li{margin:.3mm 0}
.var{margin-top:.8mm;font-size:8.9pt}
.var .l,.var .s{font-family:Lexend;font-weight:700;font-size:7pt;text-transform:uppercase;border-radius:1mm;padding:.1mm 1.2mm;margin-right:.6mm;color:#fff}
.var .l{background:#2f9e44}.var .s{background:#c92a2a;margin-left:1.5mm}
.achtung{font-size:8.7pt;color:#a23b00;margin-top:.6mm}
.sk{align-self:center}.skizze{width:100%;display:block}
.skizze .ft{font:700 2.8px Lexend;text-anchor:middle}.skizze .lt{font:600 2.6px Lexend;fill:#3d4a5c;text-anchor:middle}.skizze .zt{font:700 2.4px Lexend;fill:#3d4a5c;text-anchor:middle;opacity:.75}
.doppel{border:.35mm dashed var(--f);border-radius:2.6mm;padding:1.8mm 3mm;font-size:9.2pt;background:#fff}
.fuss{margin-top:2mm;border-top:.35mm solid #d9dee6;padding-top:1.6mm;font-size:8.8pt;display:flex;flex-direction:column;gap:.8mm}
.fuss .alle{color:#3f4a5a}
.deck .titel{background:var(--f);color:#fff;border-radius:4mm;padding:6mm 7mm 5mm}
.kicker{font-size:8.5pt;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.85}
.deck h1{font-size:34pt;font-weight:800;line-height:1;margin:1.5mm 0 1.5mm}
.deck .titel p{font-size:11pt;max-width:160mm}
.deck .inhalt{margin-top:4mm;gap:3mm}
.zwei{display:grid;grid-template-columns:1fr 1fr;gap:3mm}
.karte{border:.35mm solid #d9dee6;border-radius:3mm;padding:2.6mm 3.4mm;background:#fff}
.karte h2{font-size:10.8pt;font-weight:700;margin-bottom:1mm;color:var(--t)}
.karte ul{padding-left:4.2mm}.karte li{margin:.5mm 0}
.karte.dran{background:var(--z);border-color:var(--f)}
.plan-t{font-size:12pt;font-weight:800;margin-top:1mm}
table.plan{width:100%;border-collapse:separate;border-spacing:0;font-size:8.9pt;border:.35mm solid #d9dee6;border-radius:3mm;overflow:hidden}
.plan th{background:var(--z);color:var(--t);font-size:8pt;text-align:left;padding:1.4mm 2mm;font-weight:700}
.plan td{padding:1.3mm 2mm;border-top:.3mm solid #e6e9ee;vertical-align:top}
.plan td.n{font-family:Lexend;font-weight:800;color:var(--t);text-align:center;width:9mm}
.sicher{font-size:9pt;color:#3f4a5a;border-left:1.6mm solid #f08c00;padding:1mm 2.6mm;background:#fff8ec;border-radius:0 2mm 2mm 0}
.leg{flex-direction:row;flex-wrap:wrap;gap:4mm;color:#4a5668;font-size:8pt;align-items:center}
.leg i{display:inline-block;width:3mm;height:3mm;border-radius:50%;vertical-align:-.5mm;margin-right:1mm}
.leg .pa{background:var(--f)}.leg .pb{background:#fff;border:.35mm solid #3d4a5c}.leg .pj{background:#f5c400}
.leg .pk{width:0;height:0;border-radius:0;border-left:1.6mm solid transparent;border-right:1.6mm solid transparent;border-bottom:3mm solid #f08c00}
.grund .inhalt{display:grid;grid-template-columns:1fr 1fr;gap:3mm;align-content:start;margin-top:3mm}
.grund .breit,.grund .spiele{grid-column:1/-1}
.spiele{display:grid;grid-template-columns:1fr 1fr;gap:2.4mm}
.spiel{border:.35mm solid #d9dee6;border-radius:2.6mm;padding:2mm 2.8mm;break-inside:avoid}
.spiel h3{font-size:10.4pt;font-weight:700;margin-bottom:.6mm}
.dicht .block{padding:1.5mm 2.2mm}.dicht .inhalt{gap:1.5mm}.dicht{font-size:9.1pt}
.dichter{font-size:8.7pt}.dichter .block:has(.sk){grid-template-columns:12mm 1fr 46mm}
`

function seite(titel, farbe, inhalt) {
  const tief = farbe, z = farbe + '1f'
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${esc(titel)}</title><style>${CSS}:root{--f:${farbe};--t:${tief};--z:${z}}</style></head><body>${inhalt}<script>document.fonts.ready.then(()=>document.body.dataset.fertig='1')</script></body></html>`
}

async function pdf(browser, name, html) {
  const datei = join(HTML, name + '.html'); writeFileSync(datei, html)
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } })
  await page.goto(pathToFileURL(datei).href); await page.waitForFunction(() => document.body.dataset.fertig === '1')
  // zu volle Seiten verdichten, dann echten Überlauf melden
  const bericht = await page.evaluate(() => {
    const voll = (s) => { const i = s.querySelector('.inhalt'); return i && i.scrollHeight > i.clientHeight + 1 }
    const r = []
    document.querySelectorAll('.seite').forEach((s, n) => {
      if (voll(s)) s.classList.add('dicht'); if (voll(s)) s.classList.add('dichter')
      const i = s.querySelector('.inhalt'); if (voll(s)) r.push('S.' + (n + 1) + ' Überlauf ' + Math.round((i.scrollHeight - i.clientHeight) / 3.78) + ' mm')
    })
    return r
  })
  await page.pdf({ path: join(AUS, name + '.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true })
  await page.close()
  console.log((bericht.length ? '✗ ' : '✓ ') + name + (bericht.length ? '  ' + bericht.join(' · ') : ''))
  return bericht.length
}

const wahl = process.argv.slice(2)
const ids = wahl.length ? wahl : readdirSync(join(HIER, 'inhalt')).filter((d) => d.endsWith('.mjs')).map((d) => d.slice(0, -4))
const { chromium } = require('playwright')
const browser = await chromium.launch()
let schlecht = 0
for (const id of ids) {
  const m = await import(pathToFileURL(join(HIER, 'inhalt', id + '.mjs')).href)
  if (m.GRUND) { schlecht += await pdf(browser, 'Sport-00-Grundlagen', seite('Sport – Grundlagen', m.GRUND.farbe, grundSeiten(m.GRUND))); continue }
  const sp = m.SPORT
  for (const st of sp.stunden) { const t = st.bloecke.reduce((x, b) => x + b.min, 0); if (t !== 50) { console.log('✗ ' + sp.name + ' Woche ' + st.nr + ': ' + t + ' Min. statt 50'); schlecht++ } }
  schlecht += await pdf(browser, 'Sport-' + String(sp.nr).padStart(2, '0') + '-' + sp.datei, seite('Sport – ' + sp.name, sp.farbe, uebersicht(sp) + sp.stunden.map((st, i) => stundeSeite(sp, st, i)).join('')))
}
await browser.close()
process.exitCode = schlecht ? 1 : 0

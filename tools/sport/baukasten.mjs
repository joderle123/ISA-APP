// Sport-Baukasten (Auftrag 22.11.2026): ein Heft mit allen guten Bausteinen – Aufwärmen, Fit machen, Koordination,
// Ball-Übungen, Spiele, Match je Sportart, Team, Runterkommen. Die Lehrperson nimmt pro Farbe einen Baustein und hat
// ihre Stunde. Jede Karte: Skizze oder Bild, drei kurze Sätze, Minuten, Gruppengröße, Puls, Material.
// Aufruf (aus isa-app/): node tools/sport/baukasten.mjs   → offline/sport/Sport-Baukasten.pdf
// Inhalt: tools/sport/baukasten-inhalt.mjs. Skizzen wie in den Sportart-Heften (gemeinsam.mjs).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { esc, md, SCHRIFT, skizze } from './gemeinsam.mjs'
import { KATEGORIEN, REZEPTE } from './baukasten-inhalt.mjs'

const HIER = dirname(fileURLToPath(import.meta.url)), ROOT = join(HIER, '..', '..')
const AUS = join(ROOT, 'offline', 'sport'), HTML = join(HIER, 'aus')
mkdirSync(AUS, { recursive: true }); mkdirSync(HTML, { recursive: true })
const require = createRequire(import.meta.url)
const ICONS = JSON.parse(readFileSync(join(ROOT, 'src/blatt/bilder/icons.json'), 'utf8'))

// Tabler-Piktogramm (MIT) als SVG
function icon(name, { farbe = 'currentColor', groesse = '1em', breite = 2, klasse = '' } = {}) {
  const teile = ICONS[name]
  if (!teile) throw new Error('Piktogramm fehlt: ' + name)
  const inhalt = teile.map(({ t, ...a }) => `<${t} ${Object.entries(a).map(([k, v]) => `${k}="${v}"`).join(' ')}/>`).join('')
  return `<svg viewBox="0 0 24 24" width="${groesse}" height="${groesse}" class="${klasse}" fill="none" stroke="${farbe}" stroke-width="${breite}" stroke-linecap="round" stroke-linejoin="round">${inhalt}</svg>`
}

const KAT = new Map(KATEGORIEN.map((k) => [k.id, k]))
const katVon = (code) => KAT.get(code[0])
const karteVon = (code) => katVon(code).karten.find((x) => x.c === code)

function puls(n) {
  return [1, 2, 3].map((i) => icon('bolt', { farbe: i <= n ? '#e8590c' : '#cfd5dd', groesse: '3.3mm', breite: 2.4 })).join('')
}

function karte(x, kat) {
  const bild = x.sk ? skizze(x.sk, kat.farbe) : `<div class="ikon">${icon(x.icon, { farbe: kat.farbe, groesse: '19mm', breite: 1.6 })}</div>`
  return `<div class="karte">
    <div class="kk"><span class="code">${esc(x.c)}</span><h3>${esc(x.n)}</h3></div>
    <div class="bild">${bild}</div>
    <p class="so">${md(x.so)}</p>
    ${x.tipp ? `<p class="tipp"><b>Tipp:</b> ${md(x.tipp)}</p>` : ''}
    <div class="fakten">
      <span>${icon('clock', { groesse: '3.3mm' })} ${esc(x.min)} Min.</span>
      <span>${icon('users', { groesse: '3.3mm' })} ${esc(x.wer)}</span>
      <span class="puls" title="Puls">${puls(x.int)}</span>
    </div>
    <p class="mat"><b>Material:</b> ${esc(x.mat)}</p>
    ${x.tags?.length ? `<div class="tags">${x.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
  </div>`
}

function abschnitt(kat) {
  return `<div class="abschnitt" style="--k:${kat.farbe}">
    <header class="kat"><span class="buchst">${kat.id}</span><div><h2>${esc(kat.name)}</h2><p>${esc(kat.satz)}</p></div><span class="dauer">${esc(kat.zeit)}</span></header>
    <div class="raster">${kat.karten.map((x) => karte(x, kat)).join('')}</div>
  </div>`
}

// Seitenaufteilung: große Gruppen allein, kleine (6 Karten) zu zweit auf einer Seite
const SEITEN = [['A'], ['B', 'C'], ['D'], ['E'], ['F'], ['G', 'H']]
const seiteVon = new Map(SEITEN.flatMap((ids, i) => ids.map((id) => [id, i + 2])))

function fuss(nr) {
  return `<footer class="fuss"><span>Sport-Baukasten · CDSE</span><span>${nr}</span></footer>`
}

function titelSeite() {
  const schritte = [
    { n: 'Aufwärmen', min: 8, ids: ['A'], oder: 'oder B, C' },
    { n: 'Üben', min: 12, ids: ['D'], oder: 'oder B, C' },
    { n: 'Spielen', min: 25, ids: ['E', 'F'], oder: 'oder G' },
    { n: 'Runterkommen', min: 5, ids: ['H'], oder: '' },
  ]
  return `<section class="seite titel">
    <header class="deckel">
      <div class="streifen">${KATEGORIEN.map((k) => `<i style="background:${k.farbe}"></i>`).join('')}</div>
      <div class="kicker">Sport · für alle Sportarten</div>
      <h1>Sport-Baukasten</h1>
      <p>Alle Bausteine für deine Stunde auf einen Blick. Nimm aus jeder Farbe einen – fertig ist die Stunde.</p>
    </header>
    <div class="inhalt">
      <h2 class="t">So baust du deine Stunde (50 Min.)</h2>
      <div class="leiste">${schritte.map((s, i) => `<div class="schritt" style="flex:${s.min};--k:${KAT.get(s.ids[0]).farbe}">
        <b>${i + 1}. ${esc(s.n)}</b><span>${s.min} Min.</span>
        <div class="kc">${s.ids.map((id) => `<em style="background:${KAT.get(id).farbe}">${id}</em>`).join('')}<small>${esc(s.oder)}</small></div></div>`).join('')}</div>
      <ol class="drei">
        <li><b>Aussuchen:</b> aus jeder Farbe einen Baustein.</li>
        <li><b>Aufschreiben:</b> die Codes in den Plan auf der letzten Seite, z. B. <b>A3 · D2 · E5 · H1</b>.</li>
        <li><b>Material holen – los!</b> Höchstens 30 Sekunden erklären, dann spielen.</li>
      </ol>
      <h2 class="t">Beispiel: eine fertige Stunde</h2>
      <div class="bsp">${[['A3', 8], ['D2', 12], ['E5', 25], ['H1', 5]].map(([c, m], i) => { const k = karteVon(c), f = katVon(c).farbe
        return `${i ? '<span class="pfeil">→</span>' : ''}<div class="bk" style="--k:${f}"><em>${c}</em><b>${esc(k.n)}</b><small>${m} Min. · ${esc(k.mat)}</small></div>` }).join('')}</div>
      <h2 class="t">Die 8 Farben</h2>
      <div class="farben">${KATEGORIEN.map((k) => `<div class="farbe" style="--k:${k.farbe}"><span class="buchst">${k.id}</span><div><b>${esc(k.name)}</b><small>${esc(k.zeit)} · ${k.karten.length} Bausteine · Seite ${seiteVon.get(k.id)}</small></div></div>`).join('')}</div>
      <h2 class="t">So liest du eine Karte</h2>
      <div class="lesen">
        <div class="beispiel">${karte(karteVon('D3'), KAT.get('D'))}</div>
        <ul class="legende">
          <li>${icon('clock', { groesse: '4.2mm' })} <b>Minuten</b> – wie lange der Baustein dauert</li>
          <li>${icon('users', { groesse: '4.2mm' })} <b>Wie viele</b> – Gruppengröße</li>
          <li><span class="puls">${puls(1)}</span> ruhig · <span class="puls">${puls(3)}</span> Power</li>
          <li><i class="pa"></i> Team A · <i class="pb"></i> Team B · <i class="pj"></i> Joker · <i class="pk"></i> Hütchen</li>
          <li><b>- - →</b> Pass · <b>—→</b> laufen · <b>⌇→</b> dribbeln · Braun = Matte oder Kasten</li>
          <li><b>Tipp</b> und kleine Schilder: leichter oder schwerer machen, wenig Platz, ohne Material, auch draußen</li>
        </ul>
      </div>
    </div>
    ${fuss(1)}
  </section>`
}

function bausteinSeite(ids, nr) {
  const zwei = ids.length > 1
  return `<section class="seite bausteine${zwei ? ' zwei' : ''}">
    <div class="inhalt">${ids.map((id) => abschnitt(KAT.get(id))).join('')}</div>
    ${fuss(nr)}
  </section>`
}

function planSeite(nr) {
  const zeilen = [['Aufwärmen', 'A'], ['Üben', 'D'], ['Spielen', 'E'], ['Runterkommen', 'H']]
  const plan = `<table class="plan"><thead><tr><th></th><th>Code</th><th>Name</th><th>Min.</th><th>Material</th></tr></thead><tbody>
    ${zeilen.map(([n, id], i) => `<tr><td class="n" style="--k:${KAT.get(id).farbe}"><b>${i + 1}</b> ${n}</td><td></td><td></td><td></td><td></td></tr>`).join('')}
  </tbody></table>`
  return `<section class="seite plan-s">
    <header class="kat" style="--k:#343a40"><span class="buchst">✎</span><div><h2>Meine Stunde</h2><p>Codes eintragen, Material holen, los. Die Seite kann man kopieren.</p></div></header>
    <div class="inhalt">
      <div class="vorlage"><div class="kopf"><span>Datum: ______________</span><span>Gruppe: ______________</span><span>Halle / draußen</span></div>${plan}
        <div class="notiz"><b>Das hat geklappt / nächstes Mal:</b><div class="linie"></div><div class="linie"></div></div></div>
      <div class="vorlage"><div class="kopf"><span>Datum: ______________</span><span>Gruppe: ______________</span><span>Halle / draußen</span></div>${plan}
        <div class="notiz"><b>Das hat geklappt / nächstes Mal:</b><div class="linie"></div></div></div>
      <h2 class="t">Schnelle Rezepte</h2>
      <div class="rezepte">${REZEPTE.map((r) => `<div class="rezept"><b>${esc(r.name)}</b><div>${r.karten.map((c) => `<span class="rc" style="--k:${katVon(c).farbe}"><em>${c}</em> ${esc(karteVon(c).n)}</span>`).join('')}</div></div>`).join('')}</div>
      <div class="gut">
        <div><h3>Damit alle dabei bleiben</h3><ul>
          <li>Teams nie wählen lassen: Karten oder Leibchen ziehen.</li>
          <li>Niemand wartet lange: höchstens zwei in der Schlange.</li>
          <li>Wer nicht mitmacht, bekommt eine Aufgabe: Joker, Schiri, Zeit nehmen.</li>
          <li>Jeder wählt: leichter oder schwerer.</li></ul></div>
        <div><h3>Sicherheit</h3><ul>
          <li>Schmuck ab, Schuhe zu.</li>
          <li>Bei Wurfspielen nur weiche Bälle, nie auf den Kopf.</li>
          <li>Tore sichern, nicht an Tore oder Körbe hängen.</li>
          <li>Draußen: Treffpunkt, Handy dabei, Notruf 112.</li></ul>
          <p class="mehr">Mehr Ideen: die Sportart-Hefte (je 6 Stunden) und das Grundlagen-Heft.</p></div>
      </div>
    </div>
    ${fuss(nr)}
  </section>`
}

const CSS = `${SCHRIFT}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#fff}
body{font-family:Atkinson,sans-serif;color:#222b38;font-size:9pt;line-height:1.28;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.seite{width:210mm;height:297mm;padding:9mm 9mm 7mm;display:flex;flex-direction:column;page-break-after:always;overflow:hidden;position:relative;background:#fff}
h1,h2,h3,.code,.buchst,th,.kicker,.dauer,.schritt b{font-family:Lexend,sans-serif}
.inhalt{flex:1;display:flex;flex-direction:column;gap:3mm;min-height:0}
.fuss{display:flex;justify-content:space-between;font-size:7.5pt;color:#6b7585;border-top:.3mm solid #e3e7ec;padding-top:1.4mm;margin-top:2mm}
/* Kategorie-Kopf */
.kat{display:flex;align-items:center;gap:3mm;background:var(--k);color:#fff;border-radius:3mm;padding:2mm 3.5mm}
.kat .buchst{font-size:20pt;font-weight:800;line-height:1;background:#ffffff33;border-radius:2mm;width:11mm;height:11mm;display:flex;align-items:center;justify-content:center}
.kat h2{font-size:14pt;font-weight:800;line-height:1.1}.kat p{font-size:9pt;opacity:.95}
.kat .dauer{margin-left:auto;font-weight:700;font-size:9pt;background:#ffffff2e;border-radius:9mm;padding:.8mm 3mm;white-space:nowrap}
.abschnitt{display:flex;flex-direction:column;gap:2.4mm;flex:1;min-height:0}
.raster{flex:1;display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:1fr;gap:2.4mm;min-height:0}
/* Karte */
.karte{border:.35mm solid #d9dee6;border-top:1.6mm solid var(--k);border-radius:2.6mm;padding:1.8mm 2.2mm;display:flex;flex-direction:column;gap:1mm;background:#fff;min-height:0;overflow:hidden}
.kk{display:flex;align-items:baseline;gap:1.6mm}
.code{font-size:8.5pt;font-weight:800;color:#fff;background:var(--k);border-radius:1.2mm;padding:.2mm 1.4mm;flex:none}
.kk h3{font-size:10.2pt;font-weight:700;line-height:1.12}
.bild{height:24mm;display:flex;align-items:center;justify-content:center;flex:none}
.bild .skizze{height:100%;width:auto;max-width:100%}
.ikon{height:100%;aspect-ratio:100/56;background:color-mix(in srgb,var(--k) 9%,#fff);border-radius:1.6mm;display:flex;align-items:center;justify-content:center}
.so{font-size:8.9pt;line-height:1.27}
.tipp{font-size:8.2pt;color:#3f4a5a;background:#f6f8fa;border-radius:1.2mm;padding:.5mm 1.4mm}
.fakten{display:flex;gap:2.2mm;align-items:center;font-size:8pt;color:#3d4a5c;margin-top:auto;flex-wrap:wrap}
.fakten span{display:inline-flex;align-items:center;gap:.6mm;white-space:nowrap}
.fakten svg{vertical-align:-.6mm}
.puls{display:inline-flex;gap:0}
.mat{font-size:7.9pt;color:#4a5668}
.tags{display:flex;gap:1mm;flex-wrap:wrap}
.tags span{font-size:6.8pt;font-weight:700;text-transform:uppercase;letter-spacing:.03em;color:var(--k);background:color-mix(in srgb,var(--k) 10%,#fff);border-radius:9mm;padding:.1mm 1.5mm}
.skizze .ft{font:700 2.8px Lexend;text-anchor:middle}.skizze .lt{font:600 3.4px Lexend;fill:#3d4a5c;text-anchor:middle}.skizze .zt{font:700 3.2px Lexend;fill:#3d4a5c;text-anchor:middle;opacity:.75}
.zwei .abschnitt{flex:1}
.dicht .so{font-size:8.4pt}.dicht .bild{height:21mm}.dicht .karte{gap:.7mm;padding:1.5mm 2mm}
.dichter .so{font-size:8pt}.dichter .bild{height:18mm}.dichter .mat{font-size:7.4pt}
/* Titelseite */
.deckel{background:#1d2633;color:#fff;border-radius:4mm;padding:5mm 7mm 6mm;position:relative;overflow:hidden}
.streifen{display:flex;height:2.4mm;border-radius:1mm;overflow:hidden;margin-bottom:4mm}.streifen i{flex:1}
.kicker{font-size:8.5pt;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.8}
.deckel h1{font-size:34pt;font-weight:800;line-height:1;margin:1.5mm 0 2mm}
.deckel p{font-size:11.5pt;max-width:165mm}
h2.t{font-size:12.5pt;font-weight:800;margin-top:1mm}
.leiste{display:flex;gap:1.6mm}
.schritt{min-width:39mm;background:color-mix(in srgb,var(--k) 12%,#fff);border:.4mm solid var(--k);border-radius:2.6mm;padding:2mm 2.4mm;display:flex;flex-direction:column;gap:.6mm;min-width:0}
.schritt b{font-size:10pt;color:#1d2633}.schritt>span{font-size:8.5pt;color:#4a5668}
.kc{display:flex;gap:1mm;align-items:center;flex-wrap:wrap}.kc em,.rc em{font-style:normal;font-family:Lexend;font-weight:800;font-size:8.5pt;color:#fff;border-radius:1.2mm;padding:.2mm 1.5mm}
.kc small{font-size:7.6pt;color:#4a5668}
.drei{padding-left:5mm;font-size:10pt;display:flex;flex-direction:column;gap:.8mm}
.farben{display:grid;grid-template-columns:repeat(4,1fr);gap:2mm}
.farbe{display:flex;gap:2mm;align-items:center;border:.35mm solid #d9dee6;border-left:2mm solid var(--k);border-radius:2mm;padding:1.6mm 2mm}
.farbe .buchst{font-size:15pt;font-weight:800;color:var(--k);width:7mm;text-align:center}
.farbe b{font-size:9.5pt;display:block;line-height:1.15}.farbe small{font-size:7.6pt;color:#5b6676}
.lesen{display:grid;grid-template-columns:64mm 1fr;gap:5mm;align-items:start}
.beispiel .karte{height:auto}
.legende{list-style:none;display:flex;flex-direction:column;gap:2mm;font-size:9.6pt}
.legende svg{vertical-align:-1mm}
.legende i{display:inline-block;width:3.2mm;height:3.2mm;border-radius:50%;vertical-align:-.5mm}
.legende .pa{background:#1864ab}.legende .pb{background:#fff;border:.35mm solid #3d4a5c}.legende .pj{background:#f5c400}
.legende .pk{width:0;height:0;border-radius:0;border-left:1.6mm solid transparent;border-right:1.6mm solid transparent;border-bottom:3mm solid #f08c00}
.bsp{display:flex;align-items:stretch;gap:1.6mm}
.bsp .pfeil{align-self:center;font-family:Lexend;font-weight:800;color:#8a94a3}
.bk{flex:1;border:.35mm solid var(--k);border-left:2mm solid var(--k);border-radius:2mm;padding:1.6mm 2.2mm;display:flex;flex-direction:column;gap:.5mm}
.bk em{font-style:normal;font-family:Lexend;font-weight:800;font-size:8.5pt;color:#fff;background:var(--k);border-radius:1.2mm;padding:.1mm 1.4mm;align-self:flex-start}
.bk b{font-family:Lexend;font-size:9.4pt;line-height:1.15}.bk small{font-size:7.8pt;color:#4a5668}
/* Plan-Seite */
.vorlage{border:.35mm solid #c9d0d9;border-radius:3mm;padding:2.4mm 3mm}
.vorlage .kopf{display:flex;justify-content:space-between;font-size:9pt;margin-bottom:1.6mm}
table.plan{width:100%;border-collapse:collapse;font-size:9pt}
.plan th{font-size:7.8pt;text-align:left;color:#4a5668;padding:.8mm 1.6mm;border-bottom:.35mm solid #c9d0d9}
.plan td{height:8.5mm;border-bottom:.3mm solid #e3e7ec;padding:0 1.6mm}
.plan td.n{width:33mm;font-family:Lexend;font-size:9pt;border-left:1.6mm solid var(--k)}
.plan td:nth-child(2){width:15mm}.plan td:nth-child(4){width:13mm}.plan td:nth-child(5){width:45mm}
.notiz{margin-top:1.6mm;font-size:8.6pt}.notiz .linie{border-bottom:.3mm solid #c9d0d9;height:6mm}
.rezepte{display:grid;grid-template-columns:1fr 1fr;gap:1.8mm}
.rezept{border:.35mm solid #d9dee6;border-radius:2mm;padding:1.4mm 2.2mm;font-size:9pt}
.rezept b{display:block;font-family:Lexend;font-size:9pt;margin-bottom:.8mm}
.rezept div{display:flex;flex-wrap:wrap;gap:1.2mm}
.rc{font-size:7.8pt;color:#3d4a5c;display:inline-flex;gap:.8mm;align-items:center}.rc em{background:var(--k)}
.gut{display:grid;grid-template-columns:1fr 1fr;gap:3mm;font-size:9pt}
.gut h3{font-size:10pt;margin-bottom:.8mm}.gut ul{padding-left:4.2mm}.gut li{margin:.4mm 0}
.mehr{margin-top:1.4mm;color:#4a5668;font-size:8.6pt}
`

function dokument(inhalt) {
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Sport-Baukasten</title><style>${CSS}</style></head><body>${inhalt}<script>document.fonts.ready.then(()=>document.body.dataset.fertig='1')</script></body></html>`
}

const seiten = [titelSeite(), ...SEITEN.map((ids, i) => bausteinSeite(ids, i + 2)), planSeite(SEITEN.length + 2)]
// Prüfung der Inhalte: Codes eindeutig, Rezepte verweisen auf vorhandene Karten, Piktogramme vorhanden
const codes = KATEGORIEN.flatMap((k) => k.karten.map((x) => x.c))
if (new Set(codes).size !== codes.length) throw new Error('Doppelter Code')
for (const r of REZEPTE) for (const c of r.karten) if (!karteVon(c)) throw new Error('Rezept ' + r.name + ': Karte fehlt ' + c)

const datei = join(HTML, 'Sport-Baukasten.html')
writeFileSync(datei, dokument(seiten.join('')))
const { chromium } = require('playwright')
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } })
await page.goto(pathToFileURL(datei).href); await page.waitForFunction(() => document.body.dataset.fertig === '1')
const bericht = await page.evaluate(() => {
  const r = []
  const voll = (s) => [...s.querySelectorAll('.karte')].some((k) => k.scrollHeight > k.clientHeight + 1) || (() => { const i = s.querySelector('.inhalt'); return i.scrollHeight > i.clientHeight + 1 })()
  document.querySelectorAll('.seite').forEach((s, n) => {
    if (voll(s)) s.classList.add('dicht'); if (voll(s)) s.classList.add('dichter')
    if (voll(s)) r.push('S.' + (n + 1) + ' zu voll: ' + [...s.querySelectorAll('.karte')].filter((k) => k.scrollHeight > k.clientHeight + 1).map((k) => k.querySelector('.code').textContent).join(' '))
  })
  return r
})
await page.pdf({ path: join(AUS, 'Sport-Baukasten.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true })
await browser.close()
console.log((bericht.length ? '✗ ' : '✓ ') + 'Sport-Baukasten · ' + codes.length + ' Bausteine · ' + seiten.length + ' Seiten' + (bericht.length ? '\n  ' + bericht.join('\n  ') : ''))
process.exitCode = bericht.length ? 1 : 0

// Kleine Mathe-Bilder (SVG/HTML) für die Modulhefte: Stellenwerttafel, Zahlenstrahl, Figuren, Kreis, Symmetrie,
// Umrechnungstreppe, Thermometer. Farben über var(--f) usw., damit sie zum Modul passen.

const Z = '#1f2430'
const L = '#c9d3e3'

/** Stellenwerttafel; `zeilen` = Liste von [Beschriftung, Zahl als Text oder ''] ; leer=true → nur Raster (Lösung im Lösungsheft) */
export function stellentafel(zeilen, { leer = false, stellen = ['HT', 'ZT', 'T', 'H', 'Z', 'E'] } = {}) {
  const kopf = `<tr><th></th>${stellen.map((s) => `<th style="text-align:center">${s}</th>`).join('')}</tr>`
  const reihen = zeilen.map(([name, zahl]) => {
    const ziffern = String(zahl).replace(/\D/g, '').padStart(stellen.length, ' ').slice(-stellen.length).split('')
    return `<tr><td class="vorgabe">${name}</td>${ziffern.map((d) => `<td style="text-align:center;font-size:15pt;font-family:${leer ? 'Hand' : 'Lexend'};font-weight:700">${d.trim() ? (leer ? `<span class="l">${d}</span>` : d) : ''}</td>`).join('')}</tr>`
  }).join('')
  return `<table class="raster stellen"><colgroup><col style="width:34%">${stellen.map(() => `<col style="width:${66 / stellen.length}%">`).join('')}</colgroup>${kopf}${reihen}</table>`
}

/** Zahlenstrahl von a bis b; `teile` Abschnitte; `marken` = [{w, t, oben}] (Pfeil mit Text); `zahlen` = beschriftete Werte */
export function zahlenstrahl(a, b, { teile = 10, marken = [], zahlen, breite = 170 } = {}) {
  const W = breite, x = (v) => 6 + ((v - a) / (b - a)) * (W - 12)
  let s = `<line x1="2" y1="22" x2="${W - 1}" y2="22" stroke="${Z}" stroke-width="0.9"/><path d="M ${W - 3} 19.6 L ${W} 22 L ${W - 3} 24.4" fill="none" stroke="${Z}" stroke-width="0.9"/>`
  for (let i = 0; i <= teile; i++) {
    const v = a + ((b - a) * i) / teile, gross = i === 0 || i === teile || (teile >= 10 && i === teile / 2)
    s += `<line x1="${x(v)}" y1="${gross ? 17.5 : 19.5}" x2="${x(v)}" y2="${gross ? 26.5 : 24.5}" stroke="${Z}" stroke-width="${gross ? 0.9 : 0.6}"/>`
  }
  for (const v of zahlen || [a, b]) s += `<text x="${x(v)}" y="33" text-anchor="middle" font-family="Lexend" font-size="4.2" fill="${Z}">${String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</text>`
  for (const m of marken) s += `<path d="M ${x(m.w)} 8 L ${x(m.w)} 16" stroke="var(--f)" stroke-width="1.1"/><path d="M ${x(m.w) - 1.8} 13.5 L ${x(m.w)} 16.5 L ${x(m.w) + 1.8} 13.5" fill="none" stroke="var(--f)" stroke-width="1.1"/><text x="${x(m.w)}" y="5.5" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="4.4" fill="var(--f)">${m.t}</text>`
  return `<svg viewBox="0 0 ${W} 36" style="width:100%">${s}</svg>`
}

/** Grundfiguren mit Namen (oder Nummern zum Benennen) */
export function figuren({ nummern = false } = {}) {
  const f = [
    ['Quadrat', `<rect x="6" y="6" width="28" height="28" fill="var(--f-zart)" stroke="${Z}" stroke-width="1"/>`],
    ['Rechteck', `<rect x="2" y="11" width="40" height="20" fill="var(--f-zart)" stroke="${Z}" stroke-width="1"/>`],
    ['Dreieck', `<path d="M 20 5 L 37 34 L 3 34 Z" fill="var(--f-zart)" stroke="${Z}" stroke-width="1" stroke-linejoin="round"/>`],
    ['Kreis', `<circle cx="20" cy="20" r="15" fill="var(--f-zart)" stroke="${Z}" stroke-width="1"/>`],
  ]
  return `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5mm;text-align:center">${f.map(([n, svg], i) => `<div><svg viewBox="0 0 44 40" style="height:24mm">${svg}</svg><div style="font-family:Lexend;font-weight:700;font-size:11.5pt">${nummern ? `${i + 1} <span class="uhr-linie" style="display:inline-block;width:30mm;height:7mm"><span class="l">${n}</span></span>` : n}</div></div>`).join('')}</div>`
}

/** Kreis mit Mittelpunkt M, Radius r und Durchmesser d */
export function kreisTeile() {
  return `<svg viewBox="0 0 120 64" style="width:100%;max-height:44mm"><circle cx="40" cy="32" r="26" fill="var(--f-zart)" stroke="${Z}" stroke-width="1"/><circle cx="40" cy="32" r="1.4" fill="${Z}"/><text x="38" y="29" font-family="Lexend" font-weight="700" font-size="5" text-anchor="end">M</text>
  <line x1="40" y1="32" x2="58.4" y2="13.6" stroke="var(--f)" stroke-width="1.3"/><text x="52" y="21" font-family="Lexend" font-weight="700" font-size="5" fill="var(--f)">r</text>
  <line x1="14" y1="40" x2="66" y2="40" stroke="#2f8a4c" stroke-width="1.3"/><text x="40" y="47" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="5" fill="#2f8a4c">d</text>
  <text x="76" y="22" font-family="Atkinson" font-size="5">M = Mittelpunkt</text><text x="76" y="32" font-family="Atkinson" font-size="5" fill="var(--f)">r = Radius</text><text x="76" y="42" font-family="Atkinson" font-size="5" fill="#2f8a4c">d = Durchmesser</text><text x="76" y="52" font-family="Atkinson" font-size="5">d = 2 · r</text></svg>`
}

/** Buchstaben zum Prüfen auf Symmetrie (Achsen nur im Lösungsheft) */
export function symmetrieBuchstaben(buchstaben, achsen) {
  return `<div style="display:grid;grid-template-columns:repeat(${buchstaben.length},1fr);gap:3mm;text-align:center">${buchstaben.map((b, i) => {
    const a = achsen[i] || ''
    const v = a.includes('s') ? `<line class="plan-l" x1="20" y1="2" x2="20" y2="42" stroke="var(--loesung)" stroke-width="1" stroke-dasharray="2 1.5"/>` : ''
    const h = a.includes('w') ? `<line class="plan-l" x1="2" y1="22" x2="38" y2="22" stroke="var(--loesung)" stroke-width="1" stroke-dasharray="2 1.5"/>` : ''
    return `<div style="border:0.3mm solid ${L};border-radius:2mm;padding:1mm"><svg viewBox="0 0 40 44" style="height:20mm"><text x="20" y="36" text-anchor="middle" font-family="Atkinson" font-weight="700" font-size="34" fill="${Z}">${b}</text>${v}${h}</svg></div>`
  }).join('')}</div>`
}

/** Umrechnungstreppe für Einheiten, z. B. ['km','m','dm','cm','mm'] mit Faktoren ['· 1000','· 10','· 10','· 10'] */
export function treppe(einheiten, faktoren) {
  const n = einheiten.length, w = 30, h = 11
  let s = ''
  einheiten.forEach((e, i) => {
    s += `<rect x="${4 + i * w}" y="${6 + i * h}" width="${w - 3}" height="${h - 1.5}" rx="2" fill="var(--f)" /><text x="${4 + i * w + (w - 3) / 2}" y="${6 + i * h + 6.6}" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="5.2" fill="#fff">${e}</text>`
    if (i < n - 1) s += `<path d="M ${4 + i * w + w - 6} ${6 + i * h + h - 1} q 6 2 8 ${h - 3}" fill="none" stroke="var(--f)" stroke-width="0.8"/><text x="${4 + i * w + w + 2}" y="${6 + i * h + h + 1}" font-family="Lexend" font-weight="700" font-size="4.2" fill="${Z}">${faktoren[i]}</text>`
  })
  return `<svg viewBox="0 0 ${8 + n * w} ${12 + n * h}" style="width:100%;max-height:52mm">${s}<text x="${4 + (n - 1) * w}" y="9" font-family="Atkinson" font-size="4.2" fill="${Z}">nach unten: mal</text><text x="${4 + (n - 1) * w}" y="15" font-family="Atkinson" font-size="4.2" fill="${Z}">nach oben: geteilt</text></svg>`
}

/** Thermometer mit Skala von a bis b (°C) und Wert w */
export function thermometer(a, b, w, { schritt = 5, beschriftung = true } = {}) {
  const H = 90, y = (v) => 8 + ((b - v) / (b - a)) * (H - 20)
  let s = `<rect x="14" y="4" width="8" height="${H - 12}" rx="4" fill="#fff" stroke="${Z}" stroke-width="0.8"/><circle cx="18" cy="${H - 6}" r="7" fill="#d0312d" stroke="${Z}" stroke-width="0.8"/>`
  if (w !== undefined) s += `<rect x="16" y="${y(w)}" width="4" height="${H - 6 - y(w)}" fill="#d0312d"/>`
  for (let v = a; v <= b; v += schritt) s += `<line x1="22" y1="${y(v)}" x2="${v % 10 === 0 ? 28 : 25}" y2="${y(v)}" stroke="${Z}" stroke-width="0.6"/>${beschriftung && v % 10 === 0 ? `<text x="30" y="${y(v) + 1.5}" font-family="Lexend" font-size="4.2" fill="${Z}">${v < 0 ? '−' + -v : v}</text>` : ''}`
  return `<svg viewBox="0 0 48 ${H + 2}" style="height:40mm">${s}</svg>`
}

/** Stellenwerttafel für Dezimalzahlen: Ganze (H, Z, E) | Komma | Teile (z, h, t) ; zeilen = [[Beschriftung, '3,45']] */
export function dezimaltafel(zeilen, { leer = false, ganz = ['H', 'Z', 'E'], teile = ['z', 'h', 't'] } = {}) {
  const kopf = `<tr><th></th>${ganz.map((s) => `<th style="text-align:center">${s}</th>`).join('')}<th style="text-align:center;width:5%">,</th>${teile.map((s) => `<th style="text-align:center;background:var(--f-zart)">${s}</th>`).join('')}</tr>`
  const zelle = (d) => `<td style="text-align:center;font-size:15pt;font-family:${leer ? 'Hand' : 'Lexend'};font-weight:700">${d ? (leer ? `<span class="l">${d}</span>` : d) : ''}</td>`
  const reihen = zeilen.map(([name, zahl]) => {
    const [g, t = ''] = String(zahl).split(',')
    const gz = g.padStart(ganz.length, ' ').slice(-ganz.length).split('').map((c) => c.trim())
    const tz = t.padEnd(teile.length, ' ').slice(0, teile.length).split('').map((c) => c.trim())
    return `<tr><td class="vorgabe">${name}</td>${gz.map(zelle).join('')}<td style="text-align:center;font-size:16pt;font-weight:800">${leer ? '<span class="l">,</span>' : ','}</td>${tz.map(zelle).join('')}</tr>`
  }).join('')
  return `<table class="raster stellen"><colgroup><col style="width:32%"></colgroup>${kopf}${reihen}</table>`
}

/** Bruchstreifen: n gleiche Teile, k gefärbt; text darunter */
export function bruchstreifen(n, k, { text = '', breite = 120 } = {}) {
  const w = breite / n
  let s = ''
  for (let i = 0; i < n; i++) s += `<rect x="${1 + i * w}" y="1" width="${w}" height="14" fill="${i < k ? 'var(--f)' : '#fff'}" stroke="${Z}" stroke-width="0.6"/>`
  return `<div style="display:flex;align-items:center;gap:4mm"><svg viewBox="0 0 ${breite + 2} 16" style="width:${breite * 0.75}mm">${s}</svg>${text ? `<span style="font-size:12.5pt">${text}</span>` : ''}</div>`
}

/** Kreis in n gleiche Teile, k gefärbt */
export function kreisBruch(n, k, groesse = 26) {
  let s = `<circle cx="20" cy="20" r="18" fill="#fff" stroke="${Z}" stroke-width="0.8"/>`
  for (let i = 0; i < n; i++) {
    const a1 = (i / n) * 2 * Math.PI - Math.PI / 2, a2 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2
    const p = (a) => `${(20 + 18 * Math.cos(a)).toFixed(2)} ${(20 + 18 * Math.sin(a)).toFixed(2)}`
    s += `<path d="M 20 20 L ${p(a1)} A 18 18 0 ${n === 1 ? 1 : 0} 1 ${p(a2)} Z" fill="${i < k ? 'var(--f)' : '#fff'}" stroke="${Z}" stroke-width="0.7"/>`
  }
  return `<svg viewBox="0 0 40 40" style="height:${groesse}mm">${s}</svg>`
}

/** Punkt, Gerade, Halbgerade, Strecke mit Schreibweise */
export function linienarten({ nummern = false } = {}) {
  const pkt = (x, y, n) => `<path d="M ${x - 1.6} ${y - 1.6} L ${x + 1.6} ${y + 1.6} M ${x - 1.6} ${y + 1.6} L ${x + 1.6} ${y - 1.6}" stroke="${Z}" stroke-width="0.8"/><text x="${x}" y="${y - 3.5}" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="4.2">${n}</text>`
  const f = [
    ['Punkt A', `${pkt(30, 14, 'A')}`, 'A'],
    ['Gerade (AB)', `<line x1="2" y1="16" x2="58" y2="16" stroke="var(--f)" stroke-width="1"/>${pkt(18, 16, 'A')}${pkt(42, 16, 'B')}`, '(AB)'],
    ['Halbgerade [AB)', `<line x1="12" y1="16" x2="58" y2="16" stroke="var(--f)" stroke-width="1"/>${pkt(12, 16, 'A')}${pkt(38, 16, 'B')}`, '[AB)'],
    ['Strecke [AB]', `<line x1="12" y1="16" x2="48" y2="16" stroke="var(--f)" stroke-width="1"/>${pkt(12, 16, 'A')}${pkt(48, 16, 'B')}`, '[AB]'],
  ]
  return `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;text-align:center">${f.map(([n, svg], i) => `<div style="border:0.3mm solid ${L};border-radius:2mm;padding:1mm"><svg viewBox="0 0 60 24" style="width:100%">${svg}</svg><div style="font-family:Lexend;font-weight:700;font-size:11pt">${nummern ? `${i + 1}` : n}</div></div>`).join('')}</div>`
}

/** Winkelarten: spitz, recht, stumpf (Beschriftung nur im Lösungsheft, wenn leer=true) */
export function winkelarten({ leer = false, winkel = [40, 90, 135] } = {}) {
  const namen = (w) => (w < 90 ? 'spitz' : w === 90 ? 'recht' : w < 180 ? 'stumpf' : 'gestreckt')
  return `<div style="display:grid;grid-template-columns:repeat(${winkel.length},1fr);gap:4mm;text-align:center">${winkel.map((w, i) => {
    const r = (w * Math.PI) / 180, x2 = 8 + 30 * Math.cos(r), y2 = 34 - 30 * Math.sin(r)
    const bogen = w === 90 ? `<path d="M 15 34 L 15 27 L 8 27" fill="none" stroke="var(--f)" stroke-width="0.8"/><circle cx="11.5" cy="30.5" r="0.8" fill="var(--f)"/>` : `<path d="M 18 34 A 10 10 0 ${w > 180 ? 1 : 0} 0 ${(8 + 10 * Math.cos(r)).toFixed(2)} ${(34 - 10 * Math.sin(r)).toFixed(2)}" fill="none" stroke="var(--f)" stroke-width="0.9"/>`
    return `<div style="border:0.3mm solid ${L};border-radius:2mm;padding:1mm"><svg viewBox="-24 0 66 38" style="width:100%;max-height:26mm"><line x1="8" y1="34" x2="40" y2="34" stroke="${Z}" stroke-width="1"/><line x1="8" y1="34" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${Z}" stroke-width="1"/>${bogen}</svg><div style="font-family:Lexend;font-weight:700;font-size:11pt">${leer ? `${i + 1} <span class="uhr-linie" style="display:inline-block;width:24mm;height:7mm"><span class="l">${namen(w)}</span></span>` : namen(w)}</div></div>`
  }).join('')}</div>`
}

/** Rechteck / Quadrat / Dreieck mit Seitenlängen für den Umfang */
export function umfangFiguren(figs) {
  return `<div style="display:grid;grid-template-columns:repeat(${figs.length},1fr);gap:5mm;text-align:center">${figs.map((f) => {
    let svg = ''
    if (f.art === 'rechteck') svg = `<rect x="8" y="6" width="44" height="26" fill="var(--f-zart)" stroke="${Z}" stroke-width="1"/><text x="30" y="40" text-anchor="middle" font-family="Lexend" font-size="4.6">${f.a}</text><text x="56" y="21" font-family="Lexend" font-size="4.6">${f.b}</text>`
    if (f.art === 'quadrat') svg = `<rect x="14" y="4" width="30" height="30" fill="var(--f-zart)" stroke="${Z}" stroke-width="1"/><text x="29" y="40" text-anchor="middle" font-family="Lexend" font-size="4.6">${f.a}</text>`
    if (f.art === 'dreieck') svg = `<path d="M 8 34 L 52 34 L 22 6 Z" fill="var(--f-zart)" stroke="${Z}" stroke-width="1" stroke-linejoin="round"/><text x="30" y="40" text-anchor="middle" font-family="Lexend" font-size="4.6">${f.a}</text><text x="40" y="18" font-family="Lexend" font-size="4.6">${f.b}</text><text x="4" y="20" font-family="Lexend" font-size="4.6" text-anchor="start">${f.c}</text>`
    return `<div><svg viewBox="0 0 66 42" style="width:100%;max-height:30mm">${svg}</svg>${f.name ? `<div style="font-family:Lexend;font-weight:700;font-size:11pt">${f.name}</div>` : ''}</div>`
  }).join('')}</div>`
}

/** Senkrechtes Balkendiagramm; daten = [[Name, Wert]]; leer=true → Balken nur im Lösungsheft (zum Selberzeichnen) */
export function balkendiagramm(daten, { max, schritt = 1, leer = false, titel = '', einheit = '' } = {}) {
  const M = max || Math.max(...daten.map((d) => d[1])), H = 60, B = 16, x0 = 14, y0 = 6
  const y = (v) => y0 + H - (v / M) * H
  let s = ''
  for (let v = 0; v <= M; v += schritt) s += `<line x1="${x0}" y1="${y(v)}" x2="${x0 + daten.length * B + 4}" y2="${y(v)}" stroke="${v === 0 ? Z : '#d5dbe6'}" stroke-width="${v === 0 ? 0.8 : 0.35}"/><text x="${x0 - 2}" y="${y(v) + 1.4}" text-anchor="end" font-family="Lexend" font-size="3.6" fill="${Z}">${v}</text>`
  s += `<line x1="${x0}" y1="${y0 - 3}" x2="${x0}" y2="${y0 + H}" stroke="${Z}" stroke-width="0.8"/>`
  daten.forEach(([n, v], i) => {
    const x = x0 + 4 + i * B
    s += `<rect class="${leer ? 'plan-l' : ''}" x="${x}" y="${y(v)}" width="${B - 6}" height="${y0 + H - y(v)}" fill="${leer ? 'var(--loesung)' : 'var(--f)'}" opacity="${leer ? 0.55 : 1}"/><text x="${x + (B - 6) / 2}" y="${y0 + H + 5}" text-anchor="middle" font-family="Lexend" font-size="3.6" fill="${Z}">${n}</text>`
  })
  if (einheit) s += `<text x="${x0 - 2}" y="${y0 - 4}" text-anchor="end" font-family="Atkinson" font-size="3.4" fill="${Z}">${einheit}</text>`
  return `<div class="plan">${titel ? `<div style="font-family:Lexend;font-weight:700;font-size:11.5pt;margin-bottom:1mm">${titel}</div>` : ''}<svg viewBox="0 0 ${x0 + daten.length * B + 8} ${y0 + H + 9}" style="width:100%;max-height:62mm">${s}</svg></div>`
}

/** Rechteck auf Kästchenpapier (l × b Kästchen) */
export function kaestchenFlaeche(l, b, { text = '' } = {}) {
  const k = 5
  let s = ''
  for (let i = 0; i < l; i++) for (let j = 0; j < b; j++) s += `<rect x="${2 + i * k}" y="${2 + j * k}" width="${k}" height="${k}" fill="var(--f-zart)" stroke="var(--f)" stroke-width="0.35"/>`
  s += `<rect x="2" y="2" width="${l * k}" height="${b * k}" fill="none" stroke="${Z}" stroke-width="0.8"/>`
  return `<div style="display:flex;align-items:center;gap:5mm"><svg viewBox="0 0 ${l * k + 4} ${b * k + 4}" style="width:${(l * k + 4) * 0.9}mm">${s}</svg>${text ? `<span style="font-size:12.5pt">${text}</span>` : ''}</div>`
}

/** Hunderterfeld (10 × 10), k Kästchen gefärbt */
export function hunderterfeld(k, { groesse = 34 } = {}) {
  let s = ''
  for (let i = 0; i < 100; i++) { const x = (i % 10) * 4, y = Math.floor(i / 10) * 4; s += `<rect x="${x + 0.5}" y="${y + 0.5}" width="4" height="4" fill="${i < k ? 'var(--f)' : '#fff'}" stroke="#9aa6ba" stroke-width="0.25"/>` }
  return `<svg viewBox="0 0 41 41" style="height:${groesse}mm">${s}<rect x="0.5" y="0.5" width="40" height="40" fill="none" stroke="${Z}" stroke-width="0.6"/></svg>`
}

/** Dreiecksarten nach Seiten / Winkeln */
export function dreiecksarten() {
  const f = [
    ['gleichseitig', `<path d="M 30 6 L 50 40 L 10 40 Z" fill="var(--f-zart)" stroke="${Z}" stroke-width="1" stroke-linejoin="round"/>`],
    ['gleichschenklig', `<path d="M 30 4 L 44 40 L 16 40 Z" fill="var(--f-zart)" stroke="${Z}" stroke-width="1" stroke-linejoin="round"/>`],
    ['rechtwinklig', `<path d="M 12 6 L 12 40 L 50 40 Z" fill="var(--f-zart)" stroke="${Z}" stroke-width="1" stroke-linejoin="round"/><path d="M 12 34 L 18 34 L 18 40" fill="none" stroke="var(--f)" stroke-width="0.8"/>`],
    ['stumpfwinklig', `<path d="M 6 40 L 54 40 L 18 26 Z" fill="var(--f-zart)" stroke="${Z}" stroke-width="1" stroke-linejoin="round"/>`],
  ]
  return `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;text-align:center">${f.map(([n, svg]) => `<div><svg viewBox="0 0 60 44" style="width:100%;max-height:24mm">${svg}</svg><div style="font-family:Lexend;font-weight:700;font-size:10.5pt">${n}</div></div>`).join('')}</div>`
}

/** Dreieck mit Grundseite g und Höhe h */
export function dreieckHoehe({ g = '6 cm', h = '4 cm' } = {}) {
  return `<svg viewBox="0 0 100 52" style="width:100%;max-height:40mm"><path d="M 10 44 L 80 44 L 34 8 Z" fill="var(--f-zart)" stroke="${Z}" stroke-width="1" stroke-linejoin="round"/><line x1="34" y1="8" x2="34" y2="44" stroke="var(--f)" stroke-width="1" stroke-dasharray="2.5 1.5"/><path d="M 34 39 L 39 39 L 39 44" fill="none" stroke="var(--f)" stroke-width="0.8"/><text x="45" y="50.5" text-anchor="middle" font-family="Lexend" font-size="4.6">g = ${g}</text><text x="36" y="28" font-family="Lexend" font-size="4.6" fill="var(--f)">h = ${h}</text><text x="84" y="22" font-family="Atkinson" font-size="4.4">A = (g · h) ÷ 2</text></svg>`
}

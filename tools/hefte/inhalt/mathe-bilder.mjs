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

// Bilder für die praktischen Fächer: Atelier (Werkstatt, Küche, Garten) und Sport (EDUPH).
// Alles selbst gezeichnet (SVG) bzw. mit freien Tabler-Icons; Lösungen stehen nur im Lösungsheft (Klassen *-l).
import { readFileSync } from 'node:fs'

const tabler = (n) => readFileSync(new URL(`../../../node_modules/@tabler/icons/icons/outline/${n}.svg`, import.meta.url), 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/\s(width|height)="24"/g, '')
const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-family="${o.hand ? 'Hand' : 'Lexend'}" font-size="${o.gr || 12}" font-weight="${o.fett || 600}" text-anchor="${o.anker || 'middle'}" fill="${o.farbe || '#2a2f3a'}"${o.klasse ? ` class="${o.klasse}"` : ''}>${s}</text>`
const nr = (x, y, n, farbe = '#c0392b', r = 10) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${farbe}" stroke="#fff" stroke-width="2"/>${t(x, y + r * 0.42, n, { gr: r * 1.15, fett: 800, farbe: '#fff' })}`

/** Lineal in Millimetern mit Ablesepfeilen A, B, C … (Werte nur im Lösungsheft über die Liste) */
export function lineal({ cm = 15, marken = [] } = {}) {
  const mm = cm * 10, s = 6, x0 = 20, W = x0 * 2 + mm * s, H = 120
  let o = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="lineal-svg"><rect x="${x0 - 12}" y="44" width="${mm * s + 24}" height="58" rx="5" fill="#f6e7b8" stroke="#b8963e" stroke-width="1.5"/>`
  for (let i = 0; i <= mm; i++) {
    const x = x0 + i * s, l = i % 10 === 0 ? 22 : i % 5 === 0 ? 15 : 9
    o += `<line x1="${x}" y1="44" x2="${x}" y2="${44 + l}" stroke="#3a2f12" stroke-width="${i % 10 === 0 ? 1.6 : 0.9}"/>`
    if (i % 10 === 0) o += t(x, 82, i / 10, { gr: 13, fett: 700, farbe: '#3a2f12' })
  }
  o += t(x0 + mm * s - 4, 98, 'cm', { gr: 10, anker: 'end', farbe: '#7a6420' })
  marken.forEach((m, k) => {
    const x = x0 + m.mm * s
    o += `<path d="M${x} 40 L${x - 6} 26 L${x + 6} 26 Z" fill="#c0392b"/>` + t(x, 20, m.name || String.fromCharCode(65 + k), { gr: 15, fett: 800, farbe: '#c0392b' })
  })
  return `<figure class="lineal">${o}</svg></figure>`
}

/** Sicherheitszeichen (vereinfacht nach den Farben der Norm): Gebot blau, Verbot rot, Warnung gelb, Rettung grün, Brandschutz rot */
export const SICHERHEIT = [
  { art: 'gebot', icon: 'eyeglass', name: 'Schutzbrille tragen' },
  { art: 'gebot', icon: 'ear', name: 'Gehörschutz tragen' },
  { art: 'gebot', icon: 'hand-stop', name: 'Schutzhandschuhe tragen' },
  { art: 'gebot', icon: 'shoe', name: 'Sicherheitsschuhe tragen' },
  { art: 'verbot', icon: 'flame', name: 'Feuer verboten' },
  { art: 'verbot', icon: 'tools-kitchen-2', name: 'Essen und Trinken verboten' },
  { art: 'warn', icon: 'bolt', name: 'Warnung vor Strom' },
  { art: 'warn', icon: 'flame', name: 'Warnung vor Feuer und Hitze' },
  { art: 'rettung', icon: 'first-aid-kit', name: 'Erste Hilfe' },
  { art: 'rettung', icon: 'run', name: 'Notausgang' },
  { art: 'brand', icon: 'fire-extinguisher', name: 'Feuerlöscher' },
]
const FORM = {
  gebot: (i) => `<circle cx="30" cy="30" r="27" fill="#1f5fae"/><g transform="translate(13 13) scale(1.42)" color="#fff">${i}</g>`,
  verbot: (i) => `<circle cx="30" cy="30" r="25" fill="#fff" stroke="#d7263d" stroke-width="6"/><g transform="translate(15 15) scale(1.25)" color="#1a1a1a">${i}</g><line x1="12" y1="12" x2="48" y2="48" stroke="#d7263d" stroke-width="6"/>`,
  warn: (i) => `<path d="M30 4 L57 54 L3 54 Z" fill="#f5c400" stroke="#1a1a1a" stroke-width="3.5" stroke-linejoin="round"/><g transform="translate(18 22) scale(1)" color="#1a1a1a">${i}</g>`,
  rettung: (i) => `<rect x="3" y="3" width="54" height="54" rx="4" fill="#178a4c"/><g transform="translate(13 13) scale(1.42)" color="#fff">${i}</g>`,
  brand: (i) => `<rect x="3" y="3" width="54" height="54" rx="4" fill="#d7263d"/><g transform="translate(13 13) scale(1.42)" color="#fff">${i}</g>`,
}
export function sicherheitsZeichen({ auswahl, leer = false, spalten = 4 } = {}) {
  const liste = auswahl ? auswahl.map((i) => SICHERHEIT[i]) : SICHERHEIT
  return `<div class="sz" style="grid-template-columns:repeat(${spalten},1fr)">${liste.map((z, k) => `<div class="sz-k"><svg viewBox="0 0 60 60" class="sz-svg">${FORM[z.art](tabler(z.icon).replace('<svg', '<svg width="24" height="24"'))}</svg><div class="sz-t"><b>${k + 1}</b>${leer ? `<span class="sz-l">${z.name}</span>` : `<span>${z.name}</span>`}</div></div>`).join('')}</div>`
}

/** Einfacher Stromkreis: Batterie, Schalter, Lampe, Leitungen – mit Nummern zum Beschriften */
export function stromkreis({ offen = false } = {}) {
  const W = 420, H = 230
  let o = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="strom-svg">`
  const L = (d) => `<path d="${d}" fill="none" stroke="#2a2f3a" stroke-width="3" stroke-linecap="round"/>`
  // Leitungen
  o += L('M60 60 H180') + L('M240 60 H360 V170 H250') + L('M170 170 H60 V60')
  // Batterie unten (lange und kurze Platte)
  o += `<line x1="200" y1="150" x2="200" y2="190" stroke="#2a2f3a" stroke-width="4"/><line x1="218" y1="160" x2="218" y2="180" stroke="#2a2f3a" stroke-width="8"/>` + L('M170 170 H200') + L('M218 170 H250')
  o += t(196, 145, '+', { gr: 16, fett: 800 }) + t(224, 145, '–', { gr: 16, fett: 800 })
  // Schalter oben
  o += `<circle cx="180" cy="60" r="4" fill="#2a2f3a"/><circle cx="240" cy="60" r="4" fill="#2a2f3a"/>` + (offen ? L('M180 60 L232 34') : L('M180 60 L240 60'))
  // Lampe rechts
  o += `<circle cx="360" cy="115" r="18" fill="#fff8d6" stroke="#2a2f3a" stroke-width="3"/><path d="M347 102 L373 128 M373 102 L347 128" stroke="#2a2f3a" stroke-width="2.5"/>`
  // Nummern
  o += nr(209, 214, 1) + nr(210, 22, 2) + nr(398, 115, 3) + nr(60, 115, 4)
  return `<figure class="strom">${o}</svg></figure>`
}

/** Bemaßtes Brett (Draufsicht) mit Bohrungen – für „Zeichnung lesen“ */
export function brettZeichnung({ laenge = 200, breite = 80, loch = 8, rand = 20 } = {}) {
  const s = 1.6, x0 = 60, y0 = 40, w = laenge * s, h = breite * s, W = x0 * 2 + w + 40, H = y0 + h + 90
  let o = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="brett-svg">`
  o += `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#f3dfb3" stroke="#2a2f3a" stroke-width="2.5"/>`
  for (const lx of [rand, laenge - rand]) o += `<circle cx="${x0 + lx * s}" cy="${y0 + h / 2}" r="${(loch / 2) * s}" fill="#fff" stroke="#2a2f3a" stroke-width="2"/><path d="M${x0 + lx * s - 12} ${y0 + h / 2} H${x0 + lx * s + 12} M${x0 + lx * s} ${y0 + h / 2 - 12} V${y0 + h / 2 + 12}" stroke="#7d8597" stroke-dasharray="4 3"/>`
  const masz = (x1, y1, x2, y2, txt, tx, ty) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1f5fae" stroke-width="1.4" marker-start="url(#pf2)" marker-end="url(#pf2)"/>` + t(tx, ty, txt, { gr: 13, fett: 700, farbe: '#1f5fae' })
  o += `<defs><marker id="pf2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse"><path d="M0 0 L8 4 L0 8z" fill="#1f5fae"/></marker></defs>`
  o += `<line x1="${x0}" y1="${y0 + h}" x2="${x0}" y2="${y0 + h + 52}" stroke="#1f5fae" stroke-width="0.8"/><line x1="${x0 + w}" y1="${y0 + h}" x2="${x0 + w}" y2="${y0 + h + 52}" stroke="#1f5fae" stroke-width="0.8"/>`
  o += masz(x0, y0 + h + 46, x0 + w, y0 + h + 46, laenge, x0 + w / 2, y0 + h + 40)
  o += `<line x1="${x0 + rand * s}" y1="${y0 + h / 2}" x2="${x0 + rand * s}" y2="${y0 + h + 24}" stroke="#1f5fae" stroke-width="0.8"/>` + masz(x0, y0 + h + 20, x0 + rand * s, y0 + h + 20, rand, x0 + (rand * s) / 2, y0 + h + 15)
  o += `<line x1="${x0 + w}" y1="${y0}" x2="${x0 + w + 34}" y2="${y0}" stroke="#1f5fae" stroke-width="0.8"/><line x1="${x0 + w}" y1="${y0 + h}" x2="${x0 + w + 34}" y2="${y0 + h}" stroke="#1f5fae" stroke-width="0.8"/>`
  o += `<line x1="${x0 + w + 28}" y1="${y0}" x2="${x0 + w + 28}" y2="${y0 + h}" stroke="#1f5fae" stroke-width="1.4" marker-start="url(#pf2)" marker-end="url(#pf2)"/>` + t(x0 + w + 36, y0 + h / 2 + 4, breite, { gr: 13, fett: 700, farbe: '#1f5fae', anker: 'start' })
  o += t(x0 + rand * s + 18, y0 + h / 2 - 14, `Ø ${loch}`, { gr: 12, fett: 700, farbe: '#1f5fae', anker: 'start' })
  o += t(x0, y0 - 14, 'Maße in mm', { gr: 11, anker: 'start', farbe: '#5b6475' })
  return `<figure class="brett">${o}</svg></figure>`
}

/** Spielfelder (vereinfacht, nicht maßstabsgetreu) mit Nummern zum Beschriften */
export function spielfeld(art = 'fussball', { nummern = true } = {}) {
  const W = 520, H = 320, g = (x) => x
  let o = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="feld-svg">`
  const linie = 'fill="none" stroke="#fff" stroke-width="3"'
  if (art === 'fussball') {
    o += `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#3f9b4f"/><rect x="20" y="20" width="480" height="280" ${linie}/><line x1="260" y1="20" x2="260" y2="300" stroke="#fff" stroke-width="3"/><circle cx="260" cy="160" r="45" ${linie}/><circle cx="260" cy="160" r="4" fill="#fff"/>`
    o += `<rect x="20" y="85" width="80" height="150" ${linie}/><rect x="420" y="85" width="80" height="150" ${linie}/><rect x="20" y="125" width="28" height="70" ${linie}/><rect x="472" y="125" width="28" height="70" ${linie}/><rect x="8" y="140" width="12" height="40" fill="#fff"/><rect x="500" y="140" width="12" height="40" fill="#fff"/><circle cx="76" cy="160" r="3.5" fill="#fff"/>`
    if (nummern) o += nr(10, 200, 1) + nr(98, 66, 2) + nr(282, 40, 3) + nr(318, 160, 4) + nr(160, 300, 5) + nr(76, 180, 6)
  } else if (art === 'basketball') {
    o += `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#d79a5a"/><rect x="20" y="20" width="480" height="280" ${linie}/><line x1="260" y1="20" x2="260" y2="300" stroke="#fff" stroke-width="3"/><circle cx="260" cy="160" r="36" ${linie}/>`
    for (const [x, d] of [[20, 1], [500, -1]]) {
      o += `<rect x="${d > 0 ? x : x - 110}" y="115" width="110" height="90" fill="rgba(255,255,255,0.18)" stroke="#fff" stroke-width="3"/><circle cx="${x + d * 110}" cy="160" r="36" ${linie}/>`
      o += `<path d="M${x} 42 H${x + d * 30} A140 140 0 0 ${d > 0 ? 1 : 0} ${x + d * 30} 278 H${x}" ${linie}/><circle cx="${x + d * 30}" cy="160" r="9" fill="none" stroke="#e05a1c" stroke-width="3"/><line x1="${x + d * 18}" y1="146" x2="${x + d * 18}" y2="174" stroke="#fff" stroke-width="4"/>`
    }
    if (nummern) o += nr(64, 160, 1) + nr(130, 102, 2) + nr(178, 50, 3) + nr(282, 300, 4) + nr(94, 196, 5) + nr(260, 112, 6)
  } else if (art === 'badminton') {
    o += `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#2f7a8a"/><rect x="30" y="30" width="460" height="260" ${linie}/><line x1="30" y1="52" x2="490" y2="52" stroke="#fff" stroke-width="3"/><line x1="30" y1="268" x2="490" y2="268" stroke="#fff" stroke-width="3"/>`
    o += `<line x1="200" y1="30" x2="200" y2="290" stroke="#fff" stroke-width="3"/><line x1="320" y1="30" x2="320" y2="290" stroke="#fff" stroke-width="3"/><line x1="56" y1="30" x2="56" y2="290" stroke="#fff" stroke-width="3"/><line x1="464" y1="30" x2="464" y2="290" stroke="#fff" stroke-width="3"/>`
    o += `<line x1="30" y1="160" x2="200" y2="160" stroke="#fff" stroke-width="3"/><line x1="320" y1="160" x2="490" y2="160" stroke="#fff" stroke-width="3"/><line x1="260" y1="16" x2="260" y2="304" stroke="#1a1a1a" stroke-width="6" stroke-dasharray="3 3"/>`
    if (nummern) o += nr(260, 160, 1) + nr(200, 210, 2) + nr(120, 160, 3) + nr(110, 52, 4) + nr(110, 30, 5) + nr(56, 230, 6)
  } else if (art === 'volleyball') {
    o += `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#e8a13a"/><rect x="40" y="40" width="440" height="240" ${linie}/><line x1="187" y1="40" x2="187" y2="280" stroke="#fff" stroke-width="3"/><line x1="333" y1="40" x2="333" y2="280" stroke="#fff" stroke-width="3"/><line x1="260" y1="20" x2="260" y2="300" stroke="#1a1a1a" stroke-width="6" stroke-dasharray="3 3"/>`
    if (nummern) o += nr(260, 160, 1) + nr(187, 210, 2) + nr(110, 120, 3) + nr(40, 220, 4) + nr(400, 40, 5) + nr(225, 160, 6)
  }
  return `<figure class="feld">${o}</svg></figure>`
}

/** Pulskurve: Herzschläge pro Minute während einer Sportstunde */
export function pulsKurve(punkte = [[0, 75], [5, 80], [10, 115], [15, 125], [20, 160], [25, 165], [30, 155], [35, 120], [40, 100], [45, 85]], phasen = [[0, 5, 'Ruhe'], [5, 15, 'Aufwärmen'], [15, 32, 'Spiel'], [32, 45, 'Erholung']]) {
  const W = 520, H = 260, x0 = 50, y0 = 20, w = 450, h = 190, xs = (m) => x0 + (m / 45) * w, ys = (p) => y0 + h - ((p - 60) / 140) * h
  let o = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="puls-svg">`
  const farben = ['#e8f1fb', '#fdf2d8', '#fbe3e3', '#e3f5ea']
  phasen.forEach(([a, b, n], i) => { o += `<rect x="${xs(a)}" y="${y0}" width="${xs(b) - xs(a)}" height="${h}" fill="${farben[i % 4]}"/>` + t((xs(a) + xs(b)) / 2, y0 + 14, n, { gr: 11, fett: 700, farbe: '#5b6475' }) })
  for (let p = 60; p <= 200; p += 20) o += `<line x1="${x0}" y1="${ys(p)}" x2="${x0 + w}" y2="${ys(p)}" stroke="#d6dbe3" stroke-width="1"/>` + t(x0 - 8, ys(p) + 4, p, { gr: 10, anker: 'end', fett: 500 })
  for (let m = 0; m <= 45; m += 5) o += t(xs(m), y0 + h + 16, m, { gr: 10, fett: 500 })
  o += t(x0 + w / 2, H - 4, 'Minuten', { gr: 11, fett: 600, farbe: '#5b6475' }) + `<text x="14" y="${y0 + h / 2}" transform="rotate(-90 14 ${y0 + h / 2})" font-family="Lexend" font-size="11" text-anchor="middle" fill="#5b6475">Puls (Schläge pro Minute)</text>`
  o += `<polyline points="${punkte.map(([m, p]) => `${xs(m)},${ys(p)}`).join(' ')}" fill="none" stroke="#c0392b" stroke-width="3.5" stroke-linejoin="round"/>` + punkte.map(([m, p]) => `<circle cx="${xs(m)}" cy="${ys(p)}" r="4" fill="#c0392b"/>`).join('')
  o += `<line x1="${x0}" y1="${y0 + h}" x2="${x0 + w}" y2="${y0 + h}" stroke="#2a2f3a" stroke-width="1.5"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 + h}" stroke="#2a2f3a" stroke-width="1.5"/>`
  return `<figure class="puls">${o}</svg></figure>`
}

/** Kühlschrank mit nummerierten Fächern (Was gehört wohin?) */
export function kuehlschrank() {
  const W = 300, H = 400
  let o = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="kuehl-svg">`
  o += `<rect x="20" y="10" width="190" height="380" rx="12" fill="#f4f7fb" stroke="#5b6475" stroke-width="3"/><rect x="214" y="10" width="66" height="380" rx="10" fill="#e9eef5" stroke="#5b6475" stroke-width="3"/>`
  for (const y of [100, 190, 270]) o += `<line x1="28" y1="${y}" x2="202" y2="${y}" stroke="#8fa3bb" stroke-width="4"/>`
  o += `<rect x="30" y="285" width="170" height="92" rx="8" fill="#dff0e3" stroke="#7aa98a" stroke-width="2"/>`
  for (const y of [90, 200, 310]) o += `<rect x="222" y="${y}" width="50" height="10" rx="3" fill="#b9c6d6"/>`
  o += `<text x="115" y="30" font-family="Lexend" font-size="11" text-anchor="middle" fill="#5b6475">ca. 8 °C</text><text x="115" y="262" font-family="Lexend" font-size="11" text-anchor="middle" fill="#2f6db5">ca. 2 °C – am kältesten</text>`
  o += nr(115, 60, 1) + nr(115, 148, 2) + nr(115, 232, 3) + nr(115, 330, 4) + nr(247, 150, 5)
  return `<figure class="kuehl">${o}</svg></figure>`
}

/** Werkstück (L-Winkel) räumlich + drei Ansichten A, B, C zum Zuordnen */
export function ansichten() {
  const c = Math.cos(Math.PI / 6), s = 0.5, k = 1.6
  const P = ([x, y, z]) => [140 + (x - z) * c * k, 150 + ((x + z) * s - y) * k]
  const poly = (pts, f) => `<polygon points="${pts.map(P).map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')}" fill="${f}" stroke="#2a2f3a" stroke-width="2" stroke-linejoin="round"/>`
  let o = `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" class="ansicht-svg">`
  o += poly([[20, 20, 0], [60, 20, 0], [60, 20, 30], [20, 20, 30]], '#f6e2b5') + poly([[60, 0, 0], [60, 20, 0], [60, 20, 30], [60, 0, 30]], '#d9b77a') + poly([[0, 0, 30], [60, 0, 30], [60, 20, 30], [0, 20, 30]], '#e8c98f')
  o += poly([[0, 50, 0], [20, 50, 0], [20, 50, 30], [0, 50, 30]], '#f6e2b5') + poly([[20, 20, 0], [20, 50, 0], [20, 50, 30], [20, 20, 30]], '#d9b77a') + poly([[0, 20, 30], [20, 20, 30], [20, 50, 30], [0, 50, 30]], '#e8c98f')
  const pf = ([x0, y0], [x1, y1]) => `<path d="M${x0} ${y0} L${x1} ${y1}" stroke="#c0392b" stroke-width="2" marker-end="url(#pfa)"/>`
  o += `<defs><marker id="pfa" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" fill="#c0392b"/></marker></defs>`
  o += pf([150, 238], [150, 214]) + t(150, 254, 'von vorn', { gr: 11, farbe: '#c0392b' }) + pf([108, 18], [118, 40]) + t(96, 14, 'von oben', { gr: 11, farbe: '#c0392b' }) + pf([262, 128], [238, 128]) + t(278, 120, 'von rechts', { gr: 11, farbe: '#c0392b', anker: 'start' })
  const q = 2.1, box = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w * q}" height="${h * q}" fill="#fff" stroke="#2a2f3a" stroke-width="2.2"/>`
  // A = Draufsicht (60 × 30, Kante bei x = 20)
  let ax = 330, ay = 40
  o += box(ax, ay, 60, 30) + `<line x1="${ax + 20 * q}" y1="${ay}" x2="${ax + 20 * q}" y2="${ay + 30 * q}" stroke="#2a2f3a" stroke-width="2.2"/>` + t(ax + 30 * q, ay - 10, 'A', { gr: 16, fett: 800, farbe: '#1f6aa0' })
  // B = Seitenansicht von rechts (30 × 50, Kante bei y = 20)
  let bx = 520, by = 30
  o += box(bx, by, 30, 50) + `<line x1="${bx}" y1="${by + 30 * q}" x2="${bx + 30 * q}" y2="${by + 30 * q}" stroke="#2a2f3a" stroke-width="2.2"/>` + t(bx + 15 * q, by - 10, 'B', { gr: 16, fett: 800, farbe: '#1f6aa0' })
  // C = Vorderansicht (L-Form)
  const cx = 340, cy = 150, L = (x, y) => `${cx + x * q},${cy + (50 - y) * q * 0.9}`
  o += `<polygon points="${[[0, 0], [60, 0], [60, 20], [20, 20], [20, 50], [0, 50]].map(([x, y]) => L(x, y)).join(' ')}" fill="#fff" stroke="#2a2f3a" stroke-width="2.2"/>` + t(cx + 30 * q, cy - 8, 'C', { gr: 16, fett: 800, farbe: '#1f6aa0' })
  return `<figure class="ansicht">${o}</svg></figure>`
}

/** Linienarten der technischen Zeichnung */
export function linienarten() {
  let o = `<svg viewBox="0 0 520 150" xmlns="http://www.w3.org/2000/svg" class="linien-svg">`
  o += `<line x1="70" y1="30" x2="300" y2="30" stroke="#1a1a1a" stroke-width="4"/>` + nr(40, 30, 1, '#1f6aa0', 12)
  o += `<line x1="70" y1="75" x2="300" y2="75" stroke="#1a1a1a" stroke-width="2.4" stroke-dasharray="14 8"/>` + nr(40, 75, 2, '#1f6aa0', 12)
  o += `<line x1="70" y1="120" x2="300" y2="120" stroke="#1a1a1a" stroke-width="1.6" stroke-dasharray="26 6 3 6"/>` + nr(40, 120, 3, '#1f6aa0', 12)
  return `<figure class="linienarten">${o}</svg></figure>`
}

/** Akkuschrauber von der Seite mit Nummern: 1 Bohrfutter, 2 Drehmoment-Ring, 3 Gang-Schalter, 4 Rechts-/Linkslauf, 5 Ein-/Aus-Schalter, 6 Akku */
export function akkuschrauber() {
  const W = 470, H = 330
  const lin = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#c0392b" stroke-width="1.6"/>`
  let o = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="akku-svg">`
  // Bit
  o += `<rect x="18" y="88" width="62" height="10" rx="2" fill="#b8bec8" stroke="#5b6475" stroke-width="1.5"/>`
  for (let x = 26; x < 78; x += 10) o += `<line x1="${x}" y1="88" x2="${x + 6}" y2="98" stroke="#5b6475" stroke-width="1.2"/>`
  // Bohrfutter
  o += `<polygon points="76,74 124,66 124,120 76,112" fill="#4a4f5a" stroke="#2a2f3a" stroke-width="2" stroke-linejoin="round"/>`
  for (let x = 86; x < 122; x += 8) o += `<line x1="${x}" y1="${73 - (x - 76) / 6}" x2="${x}" y2="${113 + (x - 76) / 6}" stroke="#2a2f3a" stroke-width="1.2"/>`
  // Drehmoment-Ring
  o += `<rect x="122" y="60" width="24" height="66" rx="5" fill="#f0b429" stroke="#2a2f3a" stroke-width="2"/>`
  for (let y = 68; y < 122; y += 7) o += `<line x1="125" y1="${y}" x2="143" y2="${y}" stroke="#a87a10" stroke-width="1.2"/>`
  // Gehäuse
  o += `<rect x="142" y="54" width="206" height="78" rx="32" fill="#2e7d9a" stroke="#2a2f3a" stroke-width="2.4"/>`
  for (let x = 300; x <= 330; x += 8) o += `<line x1="${x}" y1="74" x2="${x}" y2="112" stroke="#1d566b" stroke-width="3" stroke-linecap="round"/>`
  // Griff
  o += `<polygon points="226,124 302,124 292,272 238,272" fill="#2e7d9a" stroke="#2a2f3a" stroke-width="2.4" stroke-linejoin="round"/>`
  o += `<polygon points="270,150 300,150 293,262 266,262" fill="#3a3f4a"/>`
  // Gang-Schalter oben
  o += `<rect x="238" y="44" width="34" height="12" rx="4" fill="#3a3f4a" stroke="#2a2f3a" stroke-width="1.5"/>` + t(246, 41, '1', { gr: 9 }) + t(264, 41, '2', { gr: 9 })
  // Rechts-/Linkslauf
  o += `<rect x="232" y="132" width="30" height="11" rx="3" fill="#3a3f4a" stroke="#2a2f3a" stroke-width="1.5"/>`
  // Abzug
  o += `<path d="M214 140 Q206 160 214 186 L232 186 L232 140 Z" fill="#3a3f4a" stroke="#2a2f3a" stroke-width="2"/>`
  // Akku
  o += `<rect x="200" y="268" width="142" height="48" rx="9" fill="#3a3f4a" stroke="#2a2f3a" stroke-width="2.4"/>`
  for (let i = 0; i < 3; i++) o += `<circle cx="${222 + i * 12}" cy="292" r="4" fill="#5fd38d"/>`
  // Nummern mit Linien
  o += lin(100, 40, 100, 70) + nr(100, 30, 1) + lin(134, 30, 134, 60) + nr(134, 20, 2) + lin(285, 22, 270, 44) + nr(296, 18, 3)
  o += lin(262, 137, 330, 160) + nr(342, 164, 4) + lin(208, 165, 160, 190) + nr(150, 196, 5) + lin(342, 292, 380, 292) + nr(392, 292, 6)
  return `<figure class="akku">${o}</svg></figure>`
}

/** Drei Bohrer-Spitzen zum Zuordnen: A Holz (Zentrierspitze), B Metall (kegelige Spitze), C Stein (Hartmetallplatte) */
export function bohrerArten() {
  const h = 11, x1 = 390
  let o = `<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg" class="bohrer-svg">`
  const schaft = (y, f) => {
    let s = `<rect x="80" y="${y - h}" width="120" height="${2 * h}" rx="3" fill="${f}" stroke="#2a2f3a" stroke-width="1.8"/><rect x="198" y="${y - h}" width="${x1 - 198}" height="${2 * h}" fill="${f}" stroke="#2a2f3a" stroke-width="1.8"/>`
    for (let x = 204; x < x1 - 8; x += 18) s += `<path d="M${x} ${y - h} L${x + 14} ${y + h}" stroke="#2a2f3a" stroke-width="1.8"/>`
    return s
  }
  const P = (pts, f) => `<polygon points="${pts.map((q) => q.join(',')).join(' ')}" fill="${f}" stroke="#2a2f3a" stroke-width="1.8" stroke-linejoin="round"/>`
  // A Holzbohrer: lange Zentrierspitze, zwei Vorschneider außen
  let y = 48
  o += schaft(y, '#d4b483') + P([[x1, y - 4], [x1 + 30, y], [x1, y + 4]], '#d4b483') + P([[x1, y - h], [x1 + 14, y - h], [x1, y - h + 6]], '#d4b483') + P([[x1, y + h], [x1 + 14, y + h], [x1, y + h - 6]], '#d4b483')
  o += t(44, y + 7, 'A', { gr: 20, fett: 800, farbe: '#1f6aa0' })
  // B Metallbohrer: kegelige Spitze
  y = 125
  o += schaft(y, '#c9cfd8') + P([[x1, y - h], [x1 + 10, y], [x1, y + h]], '#c9cfd8')
  o += t(44, y + 7, 'B', { gr: 20, fett: 800, farbe: '#1f6aa0' })
  // C Steinbohrer: breite Hartmetallplatte
  y = 202
  o += schaft(y, '#8e96a3') + P([[x1 - 6, y - h - 5], [x1 + 8, y - h - 5], [x1 + 18, y], [x1 + 8, y + h + 5], [x1 - 6, y + h + 5]], '#e3c35a')
  o += t(44, y + 7, 'C', { gr: 20, fett: 800, farbe: '#1f6aa0' })
  return `<figure class="bohrer">${o}</svg></figure>`
}

/** Handyständer aus Alublech: Zuschnitt mit Biegelinien (oben) und fertig gebogen von der Seite (unten) */
export function blechHalter() {
  const q = 2.2, x0 = 70, y0 = 84, L = 150 * q, B = 70 * q
  const m = (x1, x2, y, s) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#2f6db5" stroke-width="1.3" marker-start="url(#bh-a)" marker-end="url(#bh-a)"/>` + t((x1 + x2) / 2, y - 5, s, { gr: 12, farbe: '#2f6db5' })
  let o = `<svg viewBox="0 0 520 430" xmlns="http://www.w3.org/2000/svg" class="blech-svg"><defs><marker id="bh-a" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse"><path d="M0 1 L8 4 L0 7z" fill="#2f6db5"/></marker></defs>`
  o += t(x0, 16, 'Zuschnitt (Maße in mm)', { gr: 12, anker: 'start', farbe: '#5b6475' })
  o += `<rect x="${x0}" y="${y0}" width="${L}" height="${B}" rx="8" fill="#e6eaf0" stroke="#2a2f3a" stroke-width="2.2"/>`
  for (const [mm, n] of [[20, 1], [80, 2]]) {
    const x = x0 + mm * q
    o += `<line x1="${x}" y1="${y0 - 8}" x2="${x}" y2="${y0 + B + 8}" stroke="#c0392b" stroke-width="1.6" stroke-dasharray="22 5 3 5"/>` + nr(x + 14, y0 + B - 16, n, '#c0392b', 9)
  }
  o += `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 - 38}" stroke="#2f6db5" stroke-width="1"/><line x1="${x0 + 20 * q}" y1="${y0 - 8}" x2="${x0 + 20 * q}" y2="${y0 - 16}" stroke="#2f6db5" stroke-width="1"/><line x1="${x0 + 80 * q}" y1="${y0 - 8}" x2="${x0 + 80 * q}" y2="${y0 - 36}" stroke="#2f6db5" stroke-width="1"/>`
  o += m(x0, x0 + 20 * q, y0 - 12, '20') + m(x0, x0 + 80 * q, y0 - 32, '80')
  o += `<line x1="${x0}" y1="${y0 + B}" x2="${x0}" y2="${y0 + B + 42}" stroke="#2f6db5" stroke-width="1"/><line x1="${x0 + L}" y1="${y0 + B}" x2="${x0 + L}" y2="${y0 + B + 42}" stroke="#2f6db5" stroke-width="1"/>` + m(x0, x0 + L, y0 + B + 38, '150')
  o += `<line x1="${x0 + L}" y1="${y0}" x2="${x0 + L + 30}" y2="${y0}" stroke="#2f6db5" stroke-width="1"/><line x1="${x0 + L}" y1="${y0 + B}" x2="${x0 + L + 30}" y2="${y0 + B}" stroke="#2f6db5" stroke-width="1"/>`
  o += `<line x1="${x0 + L + 24}" y1="${y0}" x2="${x0 + L + 24}" y2="${y0 + B}" stroke="#2f6db5" stroke-width="1.3" marker-start="url(#bh-a)" marker-end="url(#bh-a)"/>` + t(x0 + L + 40, y0 + B / 2 + 4, '70', { gr: 12, farbe: '#2f6db5' })
  o += t(x0 + L + 40, y0 + B + 34, 'Dicke: 2', { gr: 11, farbe: '#5b6475' })
  // Seitenansicht
  const yb = 400, xa = 170, s = 1.6, w = (65 * Math.PI) / 180
  const xe = xa + 60 * s, xt = xe + 70 * s * Math.cos(w), yt = yb - 70 * s * Math.sin(w)
  o += t(x0, 300, 'fertig gebogen, von der Seite', { gr: 12, anker: 'start', farbe: '#5b6475' })
  o += `<line x1="${xa + 6}" y1="${yb - 4}" x2="${xt - 6}" y2="${yt + 4}" stroke="#cfd8e3" stroke-width="13" stroke-linecap="round"/>` + t((xa + xt) / 2 - 26, (yb + yt) / 2 - 12, 'Handy', { gr: 11, farbe: '#7a8699' })
  o += `<polyline points="${xa},${yb - 20 * s} ${xa},${yb} ${xe},${yb} ${xt.toFixed(1)},${yt.toFixed(1)}" fill="none" stroke="#2a2f3a" stroke-width="4" stroke-linejoin="round"/>`
  o += nr(xa - 16, yb, 1, '#c0392b', 9) + nr(xe + 4, yb + 16, 2, '#c0392b', 9) + t(xe + 34, yb - 8, 'ca. 65°', { gr: 11, farbe: '#5b6475', anker: 'start' })
  return `<figure class="blech">${o}</svg></figure>`
}

/** Pflanze mit Nummern: 1 Blüte, 2 Blatt, 3 Stängel, 4 Wurzel, 5 Frucht */
export function pflanze() {
  let o = `<svg viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg" class="pflanze-svg">`
  o += `<rect x="0" y="250" width="380" height="130" fill="#e9d8c2"/><path d="M0 250 Q95 240 190 250 T380 250" fill="none" stroke="#8a6a46" stroke-width="3"/>`
  for (const [x, y] of [[40, 290], [320, 300], [90, 345], [290, 352], [150, 330]]) o += `<circle cx="${x}" cy="${y}" r="3" fill="#b89b78"/>`
  // Wurzeln
  const W = (d, w = 3) => `<path d="${d}" fill="none" stroke="#a07a4f" stroke-width="${w}" stroke-linecap="round"/>`
  o += W('M190 250 Q186 300 192 350', 4) + W('M189 270 Q160 290 140 320') + W('M191 275 Q222 295 245 318') + W('M190 300 Q170 320 165 345', 2) + W('M191 305 Q215 325 218 352', 2) + W('M150 305 Q130 310 118 330', 2)
  // Stängel und Seitenast
  o += `<path d="M190 250 L190 92" stroke="#3f8a3a" stroke-width="6" stroke-linecap="round"/><path d="M190 170 Q225 160 248 142" fill="none" stroke="#3f8a3a" stroke-width="4" stroke-linecap="round"/>`
  // Blätter
  const B = (cx, cy, rot) => `<ellipse cx="${cx}" cy="${cy}" rx="38" ry="14" transform="rotate(${rot} ${cx} ${cy})" fill="#6dbb5c" stroke="#3f8a3a" stroke-width="2"/><line x1="${cx - 30 * Math.cos(rot * Math.PI / 180)}" y1="${cy - 30 * Math.sin(rot * Math.PI / 180)}" x2="${cx + 30 * Math.cos(rot * Math.PI / 180)}" y2="${cy + 30 * Math.sin(rot * Math.PI / 180)}" stroke="#3f8a3a" stroke-width="1.5"/>`
  o += B(152, 205, 20) + B(228, 222, -20) + B(156, 140, -15)
  // Frucht
  o += `<circle cx="256" cy="150" r="17" fill="#e0533d" stroke="#a5321f" stroke-width="2"/><path d="M250 134 L256 128 L262 134" fill="#3f8a3a" stroke="#3f8a3a" stroke-width="2"/>`
  // Blüte
  for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; o += `<ellipse cx="${190 + 22 * Math.cos(a)}" cy="${72 + 22 * Math.sin(a)}" rx="14" ry="8" transform="rotate(${(i * 45)} ${190 + 22 * Math.cos(a)} ${72 + 22 * Math.sin(a)})" fill="#ffd34d" stroke="#d9a400" stroke-width="1.5"/>` }
  o += `<circle cx="190" cy="72" r="13" fill="#9a5b1e"/>`
  o += nr(246, 40, 1) + nr(96, 172, 2) + nr(214, 112, 3) + nr(272, 312, 4) + nr(300, 150, 5)
  o += `<line x1="236" y1="44" x2="214" y2="58" stroke="#c0392b" stroke-width="1.5"/><line x1="106" y1="176" x2="120" y2="190" stroke="#c0392b" stroke-width="1.5"/><line x1="204" y1="116" x2="194" y2="122" stroke="#c0392b" stroke-width="1.5"/><line x1="262" y1="310" x2="242" y2="316" stroke="#c0392b" stroke-width="1.5"/><line x1="290" y1="150" x2="274" y2="150" stroke="#c0392b" stroke-width="1.5"/>`
  return `<figure class="pflanze">${o}</svg></figure>`
}

/** Rückseite einer Samentüte (Radieschen) mit Angaben und Aussaat-/Erntekalender */
export function samenTuete() {
  const M = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
  let o = `<svg viewBox="0 0 420 400" xmlns="http://www.w3.org/2000/svg" class="tuete-svg">`
  o += `<path d="M20 30 L40 14 L60 30 L80 14 L100 30 L120 14 L140 30 L160 14 L180 30 L200 14 L220 30 L240 14 L260 30 L280 14 L300 30 L320 14 L340 30 L360 14 L380 30 L400 14 L400 388 L20 388 Z" fill="#fbf6ea" stroke="#8a6a46" stroke-width="2.5"/>`
  // Radieschen
  o += `<ellipse cx="68" cy="88" rx="26" ry="23" fill="#d9415a" stroke="#9e2539" stroke-width="2"/><path d="M68 111 L68 126" stroke="#e8b4bd" stroke-width="2"/><path d="M60 66 Q50 44 58 36 Q66 50 66 66 M70 66 Q76 42 88 40 Q84 56 74 66" fill="#5aa84a" stroke="#3f8a3a" stroke-width="2"/>`
  o += t(110, 82, 'Radieschen', { gr: 24, fett: 800, anker: 'start', farbe: '#9e2539' }) + t(110, 104, 'für Beet, Balkonkasten und Topf', { gr: 12, anker: 'start', farbe: '#5b6475' })
  const zeilen = [['Aussaat ins Freie', 'März bis September'], ['Saattiefe', '1 cm'], ['Abstand in der Reihe', '3 bis 5 cm'], ['Abstand zwischen den Reihen', '15 cm'], ['Keimung', 'nach 5 bis 8 Tagen'], ['Standort', 'sonnig bis halbschattig'], ['Ernte', 'nach 4 bis 6 Wochen']]
  zeilen.forEach(([a, b], i) => { const y = 150 + i * 22; o += t(40, y, a, { gr: 12.5, anker: 'start', fett: 600, farbe: '#5b6475' }) + t(248, y, b, { gr: 12.5, anker: 'start', fett: 700 }) + `<line x1="40" y1="${y + 7}" x2="380" y2="${y + 7}" stroke="#e6dcc6" stroke-width="1"/>` })
  // Kalender
  const x0 = 40, w = 28, ya = 352
  M.forEach((m, i) => { o += t(x0 + i * w + w / 2, ya - 22, m, { gr: 11, farbe: '#5b6475' }) })
  for (let i = 0; i < 12; i++) {
    const saat = i >= 2 && i <= 8, ernte = i >= 3 && i <= 9
    o += `<rect x="${x0 + i * w + 2}" y="${ya - 16}" width="${w - 4}" height="10" rx="2" fill="${saat ? '#5aa84a' : '#eee7d6'}"/><rect x="${x0 + i * w + 2}" y="${ya - 3}" width="${w - 4}" height="10" rx="2" fill="${ernte ? '#e8963a' : '#eee7d6'}"/>`
  }
  o += `<rect x="${x0}" y="${ya + 14}" width="10" height="10" rx="2" fill="#5aa84a"/>` + t(x0 + 16, ya + 23, 'Aussaat', { gr: 11, anker: 'start' }) + `<rect x="${x0 + 90}" y="${ya + 14}" width="10" height="10" rx="2" fill="#e8963a"/>` + t(x0 + 106, ya + 23, 'Ernte', { gr: 11, anker: 'start' })
  return `<figure class="tuete">${o}</svg></figure>`
}

/** Toleranz-Skala: Sollmaß ± Toleranz als grüner Bereich, gemessene Teile A, B, C … als Marken */
export function toleranz({ soll = 100, tol = 1, werte = [] } = {}) {
  const x0 = 40, W = 440, von = soll - 3, bis = soll + 3, X = (v) => x0 + ((v - von) / (bis - von)) * W
  let o = `<svg viewBox="0 0 520 170" xmlns="http://www.w3.org/2000/svg" class="tol-svg">`
  o += `<rect x="${X(soll - tol)}" y="70" width="${X(soll + tol) - X(soll - tol)}" height="34" rx="4" fill="#d7efd9" stroke="#3f8a3a" stroke-width="1.5"/>`
  o += t((X(soll - tol) + X(soll + tol)) / 2, 124, 'gut (Toleranz)', { gr: 13, farbe: '#2e6b2a' })
  o += `<line x1="${x0}" y1="87" x2="${x0 + W}" y2="87" stroke="#2a2f3a" stroke-width="2"/>`
  for (let v = von; v <= bis + 1e-9; v += 0.5) {
    const ganz = Math.abs(v - Math.round(v)) < 1e-9
    o += `<line x1="${X(v)}" y1="${ganz ? 78 : 82}" x2="${X(v)}" y2="${ganz ? 96 : 92}" stroke="#2a2f3a" stroke-width="${ganz ? 2 : 1.2}"/>`
    if (ganz) o += t(X(v), 146, String(v), { gr: 15, fett: v === soll ? 800 : 600, farbe: v === soll ? '#3f8a3a' : '#2a2f3a' })
  }
  o += t(X(soll), 164, 'Sollmaß', { gr: 12, farbe: '#3f8a3a' })
  werte.forEach(([n, v], i) => { const x = X(v), y = 30 + (i % 2) * 18; o += `<line x1="${x}" y1="${y + 8}" x2="${x}" y2="84" stroke="#c0392b" stroke-width="1.5"/>` + nr(x, y, n, '#c0392b', 11) })
  o += t(x0 + W + 14, 92, 'mm', { gr: 11, farbe: '#5b6475' })
  return `<figure class="tol">${o}</svg></figure>`
}

/** Pflegesymbole (vereinfacht) A–H zum Zuordnen */
export function pflegeSymbole() {
  const S = (d, w = 3) => `<path d="${d}" fill="none" stroke="#2a2f3a" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`
  const kreuz = (x, y) => S(`M${x - 4} ${y - 4} L${x + 74} ${y + 48} M${x + 74} ${y - 4} L${x - 4} ${y + 48}`, 3)
  const wanne = (x, y, innen = '') => S(`M${x} ${y} L${x + 8} ${y + 42} H${x + 62} L${x + 70} ${y}`) + S(`M${x + 2} ${y + 9} q8.5 -8 17 0 t17 0 t17 0 t17 0`, 2.4) + innen
  const eisen = (x, y, punkte) => S(`M${x} ${y + 42} H${x + 70} L${x + 64} ${y + 18} Q${x + 60} ${y + 10} ${x + 48} ${y + 10} H${x + 16} M${x + 16} ${y + 10} L${x + 12} ${y + 2} H${x + 50}`) + Array.from({ length: punkte }, (_, i) => `<circle cx="${x + 36 + (i - (punkte - 1) / 2) * 12}" cy="${y + 30}" r="3.4" fill="#2a2f3a"/>`).join('')
  const P = [
    (x, y) => wanne(x, y, t(x + 35, y + 34, '30', { gr: 17, fett: 800 })),
    (x, y) => wanne(x, y, t(x + 35, y + 34, '60', { gr: 17, fett: 800 })),
    (x, y) => wanne(x, y, S(`M${x + 26} ${y + 38} V${y + 24} q0 -4 3 -4 q3 0 3 4 V${y + 18} q0 -4 3 -4 q3 0 3 4 V${y + 20} q0 -4 3 -4 q3 0 3 4 V${y + 32} q0 8 -9 8 H${x + 30} Z`, 2)),
    (x, y) => wanne(x, y) + kreuz(x, y),
    (x, y) => S(`M${x + 35} ${y} L${x + 70} ${y + 44} H${x} Z`) + kreuz(x, y),
    (x, y) => S(`M${x + 4} ${y} H${x + 66} V${y + 46} H${x + 4} Z`) + `<circle cx="${x + 35}" cy="${y + 23}" r="17" fill="none" stroke="#2a2f3a" stroke-width="3"/><circle cx="${x + 35}" cy="${y + 23}" r="3.4" fill="#2a2f3a"/>`,
    (x, y) => eisen(x, y, 2),
    (x, y) => eisen(x, y, 0) + kreuz(x, y),
  ]
  let o = `<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg" class="pflege-svg">`
  P.forEach((f, i) => { const x = 30 + (i % 4) * 125, y = 30 + Math.floor(i / 4) * 115; o += f(x, y) + t(x + 35, y + 78, 'ABCDEFGH'[i], { gr: 17, fett: 800, farbe: '#1f6aa0' }) })
  return `<figure class="pflege">${o}</svg></figure>`
}

/** Drei Handstiche A Vorstich, B Rückstich, C Überwendlingsstich */
export function stiche() {
  let o = `<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg" class="stiche-svg">`
  const stoff = (y, h = 46) => `<rect x="70" y="${y}" width="420" height="${h}" rx="4" fill="#f3e6d3" stroke="#c9b18c" stroke-width="1.5"/>`
  const faden = '#c0392b'
  // A Vorstich
  o += stoff(16) + t(36, 46, 'A', { gr: 20, fett: 800, farbe: '#1f6aa0' })
  for (let x = 90; x < 470; x += 30) o += `<line x1="${x}" y1="39" x2="${x + 16}" y2="39" stroke="${faden}" stroke-width="4" stroke-linecap="round"/>`
  // B Rückstich
  o += stoff(96) + t(36, 126, 'B', { gr: 20, fett: 800, farbe: '#1f6aa0' })
  for (let x = 90; x < 470; x += 20) o += `<line x1="${x}" y1="119" x2="${x + 16}" y2="119" stroke="${faden}" stroke-width="4" stroke-linecap="butt"/>`
  // C Überwendlingsstich über eine Kante
  o += stoff(186, 46) + `<rect x="70" y="186" width="420" height="14" fill="#e8d6bb" stroke="#c9b18c" stroke-width="1.5"/>` + t(36, 216, 'C', { gr: 20, fett: 800, farbe: '#1f6aa0' })
  for (let x = 92; x < 470; x += 22) o += `<line x1="${x}" y1="178" x2="${x + 12}" y2="208" stroke="${faden}" stroke-width="4" stroke-linecap="round"/>`
  o += t(500, 196, 'Kante', { gr: 10, farbe: '#7a6a52', anker: 'end' })
  return `<figure class="stiche">${o}</svg></figure>`
}

/** Nähmaschine von der Seite: 1 Handrad, 2 Garnrolle, 3 Fadengeber, 4 Nadel, 5 Nähfuß, 6 Stichwahl, 7 Rückwärtstaste, 8 Fußanlasser */
export function naehmaschine() {
  const lin = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#c0392b" stroke-width="1.5"/>`
  let o = `<svg viewBox="0 0 520 370" xmlns="http://www.w3.org/2000/svg" class="naeh-svg">`
  o += `<path d="M60 248 H420 Q430 248 430 258 V282 Q430 292 420 292 H60 Q50 292 50 282 V258 Q50 248 60 248 Z" fill="#e9eef5" stroke="#2a2f3a" stroke-width="2.4"/>`
  o += `<path d="M90 70 H400 Q420 70 420 90 V250 H340 V130 H150 V178 H90 Z" fill="#f7f9fc" stroke="#2a2f3a" stroke-width="2.4" stroke-linejoin="round"/>`
  o += `<rect x="96" y="250" width="70" height="6" fill="#b9c3d0"/>`
  // Nadelstange, Nadel, Nähfuß
  o += `<rect x="112" y="178" width="8" height="30" fill="#8a96a8"/><line x1="116" y1="208" x2="116" y2="240" stroke="#5b6475" stroke-width="2.5"/><path d="M100 236 H138 L142 246 H96 Z" fill="#8a96a8" stroke="#2a2f3a" stroke-width="1.5"/><rect x="124" y="190" width="6" height="40" fill="#b9c3d0"/>`
  // Fadengeber
  o += `<path d="M96 100 L72 92" stroke="#2a2f3a" stroke-width="5" stroke-linecap="round"/>`
  // Garnrolle
  o += `<line x1="300" y1="70" x2="300" y2="36" stroke="#5b6475" stroke-width="3"/><rect x="288" y="40" width="24" height="28" rx="3" fill="#e0533d" stroke="#2a2f3a" stroke-width="1.5"/>`
  o += `<path d="M300 44 Q220 30 150 60 Q110 76 84 96" fill="none" stroke="#e0533d" stroke-width="1.5" stroke-dasharray="4 3"/>`
  // Handrad
  o += `<ellipse cx="428" cy="120" rx="16" ry="38" fill="#cfd8e3" stroke="#2a2f3a" stroke-width="2.4"/>`
  // Stichwahl und Rückwärtstaste
  o += `<circle cx="380" cy="160" r="18" fill="#fff" stroke="#2a2f3a" stroke-width="2.4"/><line x1="380" y1="160" x2="380" y2="146" stroke="#2a2f3a" stroke-width="3"/><rect x="352" y="208" width="34" height="14" rx="4" fill="#3a3f4a"/>`
  // Fußanlasser mit Kabel
  o += `<path d="M430 270 Q470 300 446 330" fill="none" stroke="#5b6475" stroke-width="2"/><path d="M400 330 H480 L470 356 H410 Z" fill="#3a3f4a" stroke="#2a2f3a" stroke-width="2"/>`
  o += lin(444, 120, 470, 120) + nr(482, 120, 1) + lin(312, 50, 340, 30) + nr(352, 26, 2) + lin(74, 92, 50, 70) + nr(40, 62, 3)
  o += lin(116, 232, 60, 214) + nr(48, 210, 4) + lin(140, 242, 190, 320) + nr(196, 330, 5) + lin(398, 160, 470, 180) + nr(482, 182, 6) + lin(352, 215, 300, 216) + nr(288, 216, 7) + lin(410, 344, 380, 344) + nr(368, 344, 8)
  return `<figure class="naeh">${o}</svg></figure>`
}

/** Näh-Übungsbahnen für die Nähmaschine ohne Faden (auf Papier) */
export function naehUebung() {
  let o = `<svg viewBox="0 0 520 330" xmlns="http://www.w3.org/2000/svg" class="nbahn-svg">`
  const bahn = (d, y, nrr) => `<path d="${d}" fill="none" stroke="#2a2f3a" stroke-width="2" stroke-dasharray="7 5"/><circle cx="30" cy="${y}" r="6" fill="#2f8a6b"/>` + t(30, y - 12, 'Start', { gr: 10, farbe: '#2f8a6b' }) + nr(500, y, nrr, '#1f6aa0', 11)
  o += bahn('M30 40 H480', 40, 1)
  o += bahn('M30 115 Q90 75 150 115 T270 115 T390 115 T480 115', 115, 2)
  o += bahn('M30 190 L75 160 L120 190 L165 160 L210 190 L255 160 L300 190 L345 160 L390 190 L435 160 L480 190', 190, 3)
  o += bahn('M30 275 H170 V245 H300 V305 H420 V275 H480', 275, 4)
  return `<figure class="nbahn">${o}</svg></figure>`
}

/** Einfacher Farbkreis mit 6 Feldern (1 Gelb … 6 Grün), optional ohne Farbe zum Ausmalen */
export function farbkreis({ leer = false } = {}) {
  const F = ['#f6d23a', '#f0922b', '#d93a32', '#7b4aa0', '#2f63b5', '#3f9a48']
  const cx = 150, cy = 150, r = 120, ri = 46
  let o = `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="fkreis-svg">`
  for (let i = 0; i < 6; i++) {
    const a1 = (-90 - 30 + i * 60) * Math.PI / 180, a2 = (-90 + 30 + i * 60) * Math.PI / 180
    const p = (a, rr) => `${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`
    o += `<path d="M${p(a1, ri)} L${p(a1, r)} A${r} ${r} 0 0 1 ${p(a2, r)} L${p(a2, ri)} A${ri} ${ri} 0 0 0 ${p(a1, ri)} Z" fill="${leer ? '#fff' : F[i]}" stroke="#2a2f3a" stroke-width="2"/>`
    const am = (-90 + i * 60) * Math.PI / 180
    o += nr(Math.round(cx + 84 * Math.cos(am)), Math.round(cy + 84 * Math.sin(am)), i + 1, '#2a2f3a', 12)
  }
  return `<figure class="fkreis">${o}</svg></figure>`
}

/** Stärken-Netz (Spinnennetz) zum Selbsteinschätzen: Achsen mit Stufen 1–4, leer zum Einzeichnen */
export function staerkenNetz(achsen = ['Werkzeug, Maschinen', 'genau arbeiten', 'planen', 'Teamarbeit', 'durchhalten', 'Ordnung, Sicherheit']) {
  const n = achsen.length, cx = 260, cy = 175, R = 130
  const P = (i, r) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)] }
  let o = `<svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" class="netz-svg">`
  for (let s = 4; s >= 1; s--) o += `<polygon points="${achsen.map((_, i) => P(i, (R * s) / 4).map((v) => v.toFixed(1)).join(',')).join(' ')}" fill="${s === 4 ? '#f6f8fb' : 'none'}" stroke="#c3cad6" stroke-width="1.2"/>`
  achsen.forEach((name, i) => {
    const [x, y] = P(i, R), [lx, ly] = P(i, R + 22)
    o += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#9aa4b4" stroke-width="1.2"/>`
    for (let s = 1; s <= 4; s++) { const [px, py] = P(i, (R * s) / 4); o += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3" fill="#9aa4b4"/>` }
    const anker = Math.abs(lx - cx) < 10 ? 'middle' : lx > cx ? 'start' : 'end'
    o += t(lx.toFixed(1), (ly + 4).toFixed(1), name, { gr: 12.5, fett: 700, anker })
  })
  for (let s = 1; s <= 4; s++) { const [px, py] = P(0, (R * s) / 4); o += t((px + 9).toFixed(1), (py + 4).toFixed(1), String(s), { gr: 10, farbe: '#7a8699', anker: 'start' }) }
  return `<figure class="netz">${o}</svg></figure>`
}

/** Strichfigur: { kopf, hals, huefte, arme: [[ellbogen, hand]], beine: [[knie, fuss]], ruecken (optional Kontrollpunkt) } */
function strichfigur(f, farbe = '#2a2f3a') {
  const L = (a, b) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${farbe}" stroke-width="5" stroke-linecap="round"/>`
  let o = f.ruecken ? `<path d="M${f.hals[0]} ${f.hals[1]} Q${f.ruecken[0]} ${f.ruecken[1]} ${f.huefte[0]} ${f.huefte[1]}" fill="none" stroke="${farbe}" stroke-width="5" stroke-linecap="round"/>` : L(f.hals, f.huefte)
  for (const [e, h] of f.arme || []) o += L(f.hals, e) + L(e, h)
  for (const [k, fu] of f.beine || []) o += L(f.huefte, k) + L(k, fu)
  o += `<circle cx="${f.kopf[0]}" cy="${f.kopf[1]}" r="11" fill="#fff" stroke="${farbe}" stroke-width="4"/>`
  return o
}

/** Rolle vorwärts in vier Phasen (Seitenansicht) */
export function rolleVorwaerts() {
  let o = `<svg viewBox="0 0 520 230" xmlns="http://www.w3.org/2000/svg" class="rolle-svg">`
  o += `<rect x="10" y="170" width="500" height="18" rx="5" fill="#9fc3e6" stroke="#5b86b5" stroke-width="2"/>`
  o += strichfigur({ kopf: [70, 92], hals: [66, 106], huefte: [48, 140], arme: [[[86, 112], [104, 108]]], beine: [[[80, 128], [74, 168]], [[74, 132], [64, 168]]] })
  o += strichfigur({ kopf: [192, 146], hals: [184, 134], ruecken: [176, 104], huefte: [158, 112], arme: [[[192, 152], [200, 168]], [[186, 154], [192, 168]]], beine: [[[160, 142], [148, 168]], [[156, 144], [142, 168]]] })
  o += strichfigur({ kopf: [278, 152], hals: [286, 156], ruecken: [300, 168], huefte: [314, 150], arme: [[[304, 140], [322, 124]]], beine: [[[316, 116], [300, 110]], [[322, 118], [306, 114]]] })
  o += strichfigur({ kopf: [440, 76], hals: [438, 90], huefte: [432, 126], arme: [[[454, 98], [474, 96]], [[450, 102], [470, 102]]], beine: [[[442, 148], [436, 168]], [[434, 148], [426, 168]]] })
  const pf = (x) => `<path d="M${x} 60 L${x + 26} 60" stroke="#c0392b" stroke-width="2.5" marker-end="url(#rv-a)"/>`
  o += `<defs><marker id="rv-a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" fill="#c0392b"/></marker></defs>` + pf(112) + pf(232) + pf(360)
  o += nr(62, 212, 1, '#1f6aa0', 12) + nr(172, 212, 2, '#1f6aa0', 12) + nr(300, 212, 3, '#1f6aa0', 12) + nr(440, 212, 4, '#1f6aa0', 12)
  return `<figure class="rolle">${o}</svg></figure>`
}

/** Körper von vorn und hinten mit Muskelgruppen 1–8 (vereinfacht, neutrale Farbe) */
export function muskeln() {
  const K = '#e3e7ee', R = '#2a2f3a', M = '#f2a39a'
  const koerper = (x) => {
    let o = `<circle cx="${x}" cy="40" r="20" fill="${K}" stroke="${R}" stroke-width="2"/><rect x="${x - 8}" y="58" width="16" height="12" fill="${K}" stroke="${R}" stroke-width="2"/>`
    o += `<path d="M${x - 42} 72 Q${x} 62 ${x + 42} 72 L${x + 36} 170 Q${x} 180 ${x - 36} 170 Z" fill="${K}" stroke="${R}" stroke-width="2"/>`
    o += `<rect x="${x - 64}" y="76" width="18" height="96" rx="9" transform="rotate(8 ${x - 55} 76)" fill="${K}" stroke="${R}" stroke-width="2"/><rect x="${x + 46}" y="76" width="18" height="96" rx="9" transform="rotate(-8 ${x + 55} 76)" fill="${K}" stroke="${R}" stroke-width="2"/>`
    o += `<rect x="${x - 34}" y="168" width="28" height="120" rx="12" fill="${K}" stroke="${R}" stroke-width="2"/><rect x="${x + 6}" y="168" width="28" height="120" rx="12" fill="${K}" stroke="${R}" stroke-width="2"/>`
    return o
  }
  const fl = (cx, cy, rx, ry, rot = 0) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="${M}" stroke="#c0392b" stroke-width="1.2"/>`
  let o = `<svg viewBox="0 0 520 330" xmlns="http://www.w3.org/2000/svg" class="muskel-svg">`
  const a = 140, b = 380
  o += koerper(a) + koerper(b)
  // vorn: Brust, Bizeps, Bauch, Oberschenkel vorn
  o += fl(a - 17, 92, 15, 10) + fl(a + 17, 92, 15, 10) + fl(a - 58, 108, 7, 16, 8) + fl(a + 58, 108, 7, 16, -8) + `<rect x="${a - 14}" y="110" width="28" height="50" rx="6" fill="${M}" stroke="#c0392b" stroke-width="1.2"/>` + fl(a - 20, 210, 11, 30) + fl(a + 20, 210, 11, 30)
  // hinten: Trizeps, Rücken, Po, Waden
  o += fl(b - 58, 110, 7, 16, 8) + fl(b + 58, 110, 7, 16, -8) + `<path d="M${b - 34} 80 Q${b} 70 ${b + 34} 80 L${b + 20} 140 Q${b} 146 ${b - 20} 140 Z" fill="${M}" stroke="#c0392b" stroke-width="1.2"/>` + fl(b - 15, 170, 15, 14) + fl(b + 15, 170, 15, 14) + fl(b - 20, 252, 9, 22) + fl(b + 20, 252, 9, 22)
  const lin = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#c0392b" stroke-width="1.4"/>`
  o += lin(a + 30, 92, 236, 80) + nr(248, 80, 1) + lin(a - 62, 108, 40, 100) + nr(28, 100, 2) + lin(a + 14, 135, 236, 140) + nr(248, 140, 3) + lin(a - 30, 210, 40, 220) + nr(28, 220, 4)
  o += lin(b + 62, 110, 476, 100) + nr(488, 100, 5) + lin(b - 20, 100, 290, 90) + nr(278, 90, 6) + lin(b + 28, 170, 476, 180) + nr(488, 180, 7) + lin(b - 28, 252, 290, 262) + nr(278, 262, 8)
  o += t(a, 318, 'von vorn', { gr: 13, farbe: '#5b6475' }) + t(b, 318, 'von hinten', { gr: 13, farbe: '#5b6475' })
  return `<figure class="muskel">${o}</svg></figure>`
}

/** Tischtennisplatte von oben: 1 Netz, 2 Mittellinie, 3 Grundlinie, 4 Seitenlinie */
export function tischtennis({ nummern = true } = {}) {
  let o = `<svg viewBox="0 0 520 290" xmlns="http://www.w3.org/2000/svg" class="tt-svg">`
  o += `<rect x="40" y="40" width="440" height="210" rx="4" fill="#1f5fa0" stroke="#fff" stroke-width="6"/><rect x="40" y="40" width="440" height="210" rx="4" fill="none" stroke="#123b66" stroke-width="2"/>`
  o += `<line x1="40" y1="145" x2="480" y2="145" stroke="#fff" stroke-width="2.5"/>`
  o += `<line x1="260" y1="26" x2="260" y2="264" stroke="#1a1a1a" stroke-width="7" stroke-dasharray="3 2"/><rect x="254" y="22" width="12" height="8" fill="#1a1a1a"/><rect x="254" y="260" width="12" height="8" fill="#1a1a1a"/>`
  o += `<circle cx="150" cy="100" r="7" fill="#fff" stroke="#d98b1c" stroke-width="2"/>`
  if (nummern) o += nr(260, 12, 1) + nr(370, 145, 2) + nr(480, 200, 3) + nr(150, 250, 4)
  return `<figure class="tt">${o}</svg></figure>`
}

// ---------- Tanz: Fußspuren (V-Step und Kreuzschritt) ----------
const SOHLE = 'M -4,-28 C 6,-30 13,-22 12,-10 C 11,0 8,6 8,14 C 8,24 4,28 -1,28 C -7,28 -9,22 -9,14 C -9,6 -12,-2 -12,-12 C -12,-22 -10,-27 -4,-28 Z'
function fuss(x, y, seite, { rot = 0, start = false } = {}) {
  const farbe = seite === 'R' ? '#d0662a' : '#2f6fb0'
  const stil = start ? `fill="#fff" stroke="${farbe}" stroke-width="2" stroke-dasharray="4 3"` : `fill="${farbe}" stroke="#fff" stroke-width="1.5"`
  return `<g transform="translate(${x} ${y}) rotate(${rot})${seite === 'L' ? ' scale(-1 1)' : ''}"><path d="${SOHLE}" ${stil}/></g>` + t(x, y + 5, seite, { gr: 13, fett: 800, farbe: start ? farbe : '#fff' })
}
const pfeil = (x1, y1, x2, y2, farbe = '#8a8f99') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${farbe}" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#fs-spitze)"/>`
export function fussSchritte() {
  let o = `<svg viewBox="0 0 540 270" xmlns="http://www.w3.org/2000/svg" class="fuss-svg"><defs><marker id="fs-spitze" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#8a8f99"/></marker></defs>`
  o += `<rect x="4" y="4" width="252" height="262" rx="12" fill="#f6f3ec"/><rect x="284" y="4" width="252" height="262" rx="12" fill="#f6f3ec"/>`
  o += nr(26, 28, 'A', '#2a2f3a', 13) + nr(306, 28, 'B', '#2a2f3a', 13)
  // A: V-Step – Start Füße zusammen, 1 rechts schräg vor, 2 links schräg vor, 3 rechts zurück, 4 links zurück
  o += pfeil(145, 172, 186, 118) + pfeil(110, 172, 72, 118)
  o += fuss(112, 205, 'L', { start: true }) + fuss(146, 205, 'R', { start: true })
  o += fuss(200, 88, 'R', { rot: 15 }) + fuss(58, 88, 'L', { rot: -15 })
  o += nr(226, 60, 1) + nr(32, 60, 2) + nr(176, 214, 3) + nr(82, 214, 4)
  o += t(129, 254, 'Start: Füße zusammen', { gr: 11, fett: 500, farbe: '#6b7080' })
  // B: Kreuzschritt nach rechts – 1 rechts zur Seite, 2 links hinten kreuzen, 3 rechts zur Seite, 4 links antippen
  o += fuss(318, 120, 'L', { start: true }) + fuss(352, 120, 'R', { start: true })
  o += fuss(412, 120, 'R') + fuss(434, 176, 'L', { rot: 8 }) + fuss(500, 120, 'R') + fuss(468, 120, 'L', { start: true })
  o += nr(412, 78, 1) + nr(462, 196, 2) + nr(500, 78, 3) + nr(468, 78, 4)
  o += pfeil(330, 236, 500, 236, '#2a2f3a')
  o += t(352, 228, 'Richtung', { gr: 11, fett: 500, farbe: '#6b7080' })
  o += t(410, 254, 'gestrichelt = Start oder nur antippen', { gr: 10, fett: 500, farbe: '#6b7080' })
  return `<figure class="fuss">${o}</svg></figure>`
}

// ---------- Tanz: Formationen ----------
export function formationen({ namen = false } = {}) {
  const N = ['Linie', 'Block', 'Kreis', 'Dreieck']
  const punkte = [
    (c) => [-45, -27, -9, 9, 27, 45].map((d) => [c + d, 72]),
    (c) => [-32, 0, 32].flatMap((d) => [[c + d, 52], [c + d, 92]]),
    (c) => [0, 1, 2, 3, 4, 5].map((i) => [c + Math.round(36 * Math.cos(Math.PI / 2 + i * Math.PI / 3)), 72 + Math.round(36 * Math.sin(Math.PI / 2 + i * Math.PI / 3))]),
    (c) => [[c, 104], [c - 20, 78], [c + 20, 78], [c - 40, 52], [c, 52], [c + 40, 52]],
  ]
  let o = `<svg viewBox="0 0 520 170" xmlns="http://www.w3.org/2000/svg" class="form-svg">`
  N.forEach((n, i) => {
    const c = 65 + i * 130
    o += `<rect x="${c - 60}" y="14" width="120" height="118" rx="8" fill="#f6f3ec" stroke="#d8cfbd" stroke-width="1.5"/><line x1="${c - 60}" y1="132" x2="${c + 60}" y2="132" stroke="#a23b72" stroke-width="4" stroke-linecap="round"/>`
    for (const [x, y] of punkte[i](c)) o += `<circle cx="${x}" cy="${y}" r="9" fill="#a23b72" stroke="#fff" stroke-width="2"/>`
    o += namen ? t(c, 152, n, { gr: 13, fett: 700 }) : nr(c, 150, i + 1)
  })
  o += t(260, 168, 'farbige Linie = vorne, dort sitzt das Publikum', { gr: 10, fett: 500, farbe: '#6b7080' })
  return `<figure class="form">${o}</svg></figure>`
}

// ---------- Volleyball: Positionen und Rotation (halbes Feld, Netz oben) ----------
export function volleyRotation({ leer = false } = {}) {
  const POS = [[2, 300, 72], [3, 200, 72], [4, 100, 72], [5, 100, 196], [6, 200, 196], [1, 300, 196]]
  const BUCH = { 4: 'A', 3: 'B', 2: 'C', 5: 'D', 6: 'E', 1: 'F' }
  let o = `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" class="vrot-svg"><defs><marker id="vr-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#c0392b"/></marker></defs>`
  o += `<rect x="40" y="30" width="320" height="240" fill="#e8a13a" stroke="#fff" stroke-width="4"/><line x1="40" y1="110" x2="360" y2="110" stroke="#fff" stroke-width="3"/>`
  o += `<line x1="30" y1="30" x2="370" y2="30" stroke="#1a1a1a" stroke-width="7" stroke-dasharray="3 3"/>` + t(200, 18, 'Netz', { gr: 12, fett: 700 })
  const pf = (a, b) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#c0392b" stroke-width="3" marker-end="url(#vr-a)"/>`
  o += pf([300, 100], [300, 166]) + pf([272, 196], [230, 196]) + pf([172, 196], [130, 196]) + pf([100, 168], [100, 102]) + pf([128, 72], [170, 72]) + pf([228, 72], [270, 72])
  for (const [p, x, y] of POS) o += `<circle cx="${x}" cy="${y}" r="22" fill="#fff" stroke="#2a2f3a" stroke-width="2.5"/>` + t(x, y + 7, leer ? BUCH[p] : p, { gr: 20, fett: 800, farbe: leer ? '#6b7080' : '#2a2f3a' })
  o += t(300, 290, leer ? '' : 'Position 1 schlägt auf', { gr: 11, fett: 600, farbe: '#6b7080' }) + t(100, 290, 'Pfeile: Rotation', { gr: 11, fett: 600, farbe: '#c0392b' })
  return `<figure class="vrot">${o}</svg></figure>`
}

// ---------- Schiedsrichter-Handzeichen (Fußball, vereinfacht) ----------
function schiri(cx, { armR, armL, seitlich = false, karte = false }) {
  const F = '#2a2f3a', L = (a, b, f = F) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${f}" stroke-width="5" stroke-linecap="round"/>`
  const sR = seitlich ? [cx, 86] : [cx + 12, 86], sL = seitlich ? [cx, 92] : [cx - 12, 86]
  let o = `<circle cx="${cx}" cy="${64}" r="11" fill="#fff" stroke="${F}" stroke-width="4"/>` + L([cx, 75], [cx, 142])
  if (!seitlich) o += L(sL, sR)
  o += seitlich ? L([cx, 142], [cx + 6, 178]) + L([cx + 6, 178], [cx + 2, 212]) + L([cx, 142], [cx - 8, 178]) + L([cx - 8, 178], [cx - 12, 212])
    : L([cx, 142], [cx - 10, 178]) + L([cx - 10, 178], [cx - 14, 212]) + L([cx, 142], [cx + 10, 178]) + L([cx + 10, 178], [cx + 14, 212])
  o += L(sR, armR[0], '#1f6aa0') + L(armR[0], armR[1], '#1f6aa0') + L(sL, armL[0], '#1f6aa0') + L(armL[0], armL[1], '#1f6aa0')
  if (karte) o += `<rect x="${armR[1][0] - 9}" y="${armR[1][1] - 30}" width="20" height="28" rx="2" fill="#f2c200" stroke="#b08a00" stroke-width="2"/>`
  return o
}
export function schiriZeichen() {
  let o = `<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg" class="schiri-svg">`
  for (let i = 0; i < 4; i++) o += `<rect x="${6 + i * 128}" y="6" width="124" height="238" rx="10" fill="#f6f3ec"/><line x1="${14 + i * 128}" y1="214" x2="${122 + i * 128}" y2="214" stroke="#cfc6b4" stroke-width="3"/>`
  const unten = (cx, d) => [[cx + d * 18, 112], [cx + d * 20, 138]]
  o += schiri(68, { armR: [[86, 58], [88, 28]], armL: unten(68, -1) })
  o += schiri(196, { armR: [[218, 70], [242, 54]], armL: unten(196, -1) })
  o += schiri(316, { armR: [[340, 90], [366, 92]], armL: [[338, 98], [364, 102]], seitlich: true })
  o += schiri(452, { armR: [[470, 60], [474, 38]], armL: unten(452, -1), karte: true })
  o += nr(68, 232, 'A', '#2a2f3a', 11) + nr(196, 232, 'B', '#2a2f3a', 11) + nr(324, 232, 'C', '#2a2f3a', 11) + nr(452, 232, 'D', '#2a2f3a', 11)
  return `<figure class="schiri">${o}</svg></figure>`
}

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
export function spielfeld(art = 'fussball') {
  const W = 520, H = 320, g = (x) => x
  let o = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="feld-svg">`
  const linie = 'fill="none" stroke="#fff" stroke-width="3"'
  if (art === 'fussball') {
    o += `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#3f9b4f"/><rect x="20" y="20" width="480" height="280" ${linie}/><line x1="260" y1="20" x2="260" y2="300" stroke="#fff" stroke-width="3"/><circle cx="260" cy="160" r="45" ${linie}/><circle cx="260" cy="160" r="4" fill="#fff"/>`
    o += `<rect x="20" y="85" width="80" height="150" ${linie}/><rect x="420" y="85" width="80" height="150" ${linie}/><rect x="20" y="125" width="28" height="70" ${linie}/><rect x="472" y="125" width="28" height="70" ${linie}/><rect x="8" y="140" width="12" height="40" fill="#fff"/><rect x="500" y="140" width="12" height="40" fill="#fff"/><circle cx="76" cy="160" r="3.5" fill="#fff"/>`
    o += nr(10, 200, 1) + nr(98, 66, 2) + nr(282, 40, 3) + nr(318, 160, 4) + nr(160, 300, 5) + nr(76, 180, 6)
  } else if (art === 'basketball') {
    o += `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#d79a5a"/><rect x="20" y="20" width="480" height="280" ${linie}/><line x1="260" y1="20" x2="260" y2="300" stroke="#fff" stroke-width="3"/><circle cx="260" cy="160" r="36" ${linie}/>`
    for (const [x, d] of [[20, 1], [500, -1]]) {
      o += `<rect x="${d > 0 ? x : x - 110}" y="115" width="110" height="90" fill="rgba(255,255,255,0.18)" stroke="#fff" stroke-width="3"/><circle cx="${x + d * 110}" cy="160" r="36" ${linie}/>`
      o += `<path d="M${x} 42 H${x + d * 30} A140 140 0 0 ${d > 0 ? 1 : 0} ${x + d * 30} 278 H${x}" ${linie}/><circle cx="${x + d * 30}" cy="160" r="9" fill="none" stroke="#e05a1c" stroke-width="3"/><line x1="${x + d * 18}" y1="146" x2="${x + d * 18}" y2="174" stroke="#fff" stroke-width="4"/>`
    }
    o += nr(64, 160, 1) + nr(130, 102, 2) + nr(178, 50, 3) + nr(282, 300, 4) + nr(94, 196, 5) + nr(260, 112, 6)
  } else if (art === 'badminton') {
    o += `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#2f7a8a"/><rect x="30" y="30" width="460" height="260" ${linie}/><line x1="30" y1="52" x2="490" y2="52" stroke="#fff" stroke-width="3"/><line x1="30" y1="268" x2="490" y2="268" stroke="#fff" stroke-width="3"/>`
    o += `<line x1="200" y1="30" x2="200" y2="290" stroke="#fff" stroke-width="3"/><line x1="320" y1="30" x2="320" y2="290" stroke="#fff" stroke-width="3"/><line x1="56" y1="30" x2="56" y2="290" stroke="#fff" stroke-width="3"/><line x1="464" y1="30" x2="464" y2="290" stroke="#fff" stroke-width="3"/>`
    o += `<line x1="30" y1="160" x2="200" y2="160" stroke="#fff" stroke-width="3"/><line x1="320" y1="160" x2="490" y2="160" stroke="#fff" stroke-width="3"/><line x1="260" y1="16" x2="260" y2="304" stroke="#1a1a1a" stroke-width="6" stroke-dasharray="3 3"/>`
    o += nr(260, 160, 1) + nr(200, 210, 2) + nr(120, 160, 3) + nr(110, 52, 4) + nr(110, 30, 5) + nr(56, 230, 6)
  } else if (art === 'volleyball') {
    o += `<rect x="0" y="0" width="${W}" height="${H}" rx="8" fill="#e8a13a"/><rect x="40" y="40" width="440" height="240" ${linie}/><line x1="187" y1="40" x2="187" y2="280" stroke="#fff" stroke-width="3"/><line x1="333" y1="40" x2="333" y2="280" stroke="#fff" stroke-width="3"/><line x1="260" y1="20" x2="260" y2="300" stroke="#1a1a1a" stroke-width="6" stroke-dasharray="3 3"/>`
    o += nr(260, 160, 1) + nr(187, 210, 2) + nr(110, 120, 3) + nr(40, 220, 4) + nr(400, 40, 5) + nr(225, 160, 6)
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

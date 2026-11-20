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

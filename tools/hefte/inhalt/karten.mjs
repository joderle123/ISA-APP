// Karten für die Modulhefte (Culture générale, Vie et société …): Luxemburg mit Kantonen, Europa, Welt.
// Daten: daten/geo-*.json (aus Natural Earth – gemeinfrei – und OpenStreetMap/geoBoundaries – ODbL), vereinfacht.
// Beschriftungen mit Klasse "karte-l" stehen nur im Lösungsheft; "karte-h" nur im Heft (z. B. leere Kästchen).
import { readFileSync } from 'node:fs'

const lade = (n) => JSON.parse(readFileSync(new URL(`../daten/${n}`, import.meta.url), 'utf8'))
const LU = lade('geo-lu.json'), EU = lade('geo-europa.json'), WELT = lade('geo-welt.json')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const KARTEN_QUELLE = 'Karten: Natural Earth (gemeinfrei); Kantone © OpenStreetMap-Mitwirkende (ODbL) über geoBoundaries; vereinfacht.'

// Text mit weißem Rand (gut lesbar auf Flächen)
const txt = (x, y, t, { gr = 30, fett = 700, farbe = '#2a2f3a', anker = 'middle', klasse = '', kursiv = false, abstand = 0 } = {}) =>
  `<text class="${klasse}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="Lexend" font-size="${gr}" font-weight="${fett}" fill="${farbe}" text-anchor="${anker}" ${kursiv ? 'font-style="italic"' : ''} ${abstand ? `letter-spacing="${abstand}"` : ''} paint-order="stroke" stroke="#fff" stroke-width="${gr / 4.5}" stroke-linejoin="round">${esc(t)}</text>`
const nummer = (x, y, n, { r = 22, farbe = '#2a2f3a' } = {}) =>
  `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="#fff" stroke="${farbe}" stroke-width="4"/><text x="${x.toFixed(1)}" y="${(y + r * 0.36).toFixed(1)}" font-family="Lexend" font-size="${r * 1.05}" font-weight="800" fill="${farbe}" text-anchor="middle">${esc(n)}</text>`
const BUCHST = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const rahmen = (svg, breite, unter = '') => `<figure class="karte" style="width:${breite}mm;max-width:100%">${svg}${unter}</figure>`

// Liste unter der Karte: 1 ____ (Lösung in Handschrift)
export const kartenListe = (eintraege, spalten = 3) => `<div class="karten-liste" style="grid-template-columns:repeat(${spalten},1fr)">${eintraege
  .map(([n, l]) => `<div><b>${esc(n)}</b><span class="linie">${l ? `<span class="l">${esc(l)}</span>` : ''}</span></div>`).join('')}</div>`

/** Luxemburg.
 * kantone: 'namen' | 'nummern' (Nummern, Namen nur in der Lösung) | 'keine'
 * farben: { Kantonname: Farbe } · oesling: true färbt Ösling/Gutland
 * orte: ['Luxemburg', …] · orteArt: 'namen' | 'buchstaben' (Punkte mit Buchstaben, Namen in der Lösung)
 * fluesse: true | 'nummern' (Flussnamen nur in der Lösung) | false
 * marken: [{ ort, icon?, text }] · breite in mm */
export function luxKarte(o = {}) {
  const { kantone = 'namen', farben = {}, oesling = false, orte = [], orteArt = 'namen', fluesse = true, marken = [], breite = 105, nachbarn = true, massstab = true, kompass = true } = o
  const B = LU.breite, H = LU.hoehe
  const OESLING = ['Clervaux', 'Wiltz', 'Vianden']
  let s = `<svg viewBox="-70 -50 ${B + 140} ${H + 100}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">`
  s += `<rect x="-70" y="-50" width="${B + 140}" height="${H + 100}" fill="#eef2f6"/>`
  if (nachbarn) s += LU.nachbarn.map((n) => `<path d="${n.d}" fill="#f4f1ea" stroke="#b9b3a6" stroke-width="2"/>`).join('')
  s += LU.kantone.map((k) => {
    const f = farben[k.name] || (oesling ? (OESLING.includes(k.name) ? '#d9c9a3' : '#cfe3b8') : '#fbf7ec')
    return `<path d="${k.d}" fill="${f}" stroke="#7d8798" stroke-width="2.2" stroke-linejoin="round"/>`
  }).join('')
  let flussTxt = ''
  if (fluesse) {
    const nr = {}
    s += LU.fluesse.map((f) => `<path d="${f.d}" fill="none" stroke="#3f8fc9" stroke-width="${f.name === 'Mosel' ? 9 : 6}" stroke-linecap="round" stroke-linejoin="round" ${f.schema ? 'stroke-dasharray="none"' : ''}/>`).join('')
    const FL = { 'Sauer (Sûre)': [700, 628, 28], Mosel: [905, 1105, -62], Alzette: [370, 840, 72], Our: [700, 360, 70], Wiltz: [275, 650, -5] }
    let i = 0
    for (const [n, [x, y, rot]] of Object.entries(FL)) {
      if (!LU.fluesse.some((f) => f.name === n)) continue
      const kurz = n.replace(' (Sûre)', '')
      if (fluesse === 'nummern') { nr[n] = ++i; flussTxt += `<g>${nummer(x, y, `F${i}`, { r: 24, farbe: '#1f6aa0' })}</g>` }
      else flussTxt += `<g transform="rotate(${rot} ${x} ${y})">${txt(x, y, n === 'Sauer (Sûre)' ? 'Sauer' : kurz, { gr: 30, fett: 600, farbe: '#1f6aa0', kursiv: true })}</g>`
    }
  }
  if (kantone !== 'keine') {
    const VERSATZ = { Luxembourg: [0, 40], Capellen: [-20, 0], 'Esch-sur-Alzette': [10, -15], Vianden: [15, 0], Remich: [10, 10], Echternach: [10, 10] }
    LU.kantone.forEach((k, i) => {
      const [dx, dy] = VERSATZ[k.name] || [0, 0]
      const x = k.cx + dx, y = k.cy + dy
      if (kantone === 'nummern') s += nummer(x, y, i + 1)
      else s += txt(x, y + 10, k.name === 'Luxembourg' ? 'Luxemburg' : k.name, { gr: k.name.length > 10 ? 27 : 31, fett: 700, farbe: '#5b6474' })
    })
  }
  orte.forEach((n, i) => {
    const p = LU.orte[n]
    if (!p) throw new Error(`Ort unbekannt: ${n}`)
    const haupt = n === 'Luxemburg'
    s += haupt ? `<rect x="${p[0] - 13}" y="${p[1] - 13}" width="26" height="26" fill="#c0392b" stroke="#fff" stroke-width="4"/>` : `<circle cx="${p[0]}" cy="${p[1]}" r="11" fill="#2a2f3a" stroke="#fff" stroke-width="4"/>`
    const rechts = p[0] < 820
    if (orteArt === 'buchstaben') {
      s += txt(p[0] + (rechts ? 22 : -22), p[1] + 11, BUCHST[i], { gr: 34, fett: 800, anker: rechts ? 'start' : 'end', farbe: '#b4432e' })
      s += txt(p[0] + (rechts ? 60 : -60), p[1] + 11, n, { gr: 28, fett: 600, anker: rechts ? 'start' : 'end', klasse: 'karte-l', farbe: '#c0392b' })
    } else s += txt(p[0] + (rechts ? 20 : -20), p[1] + 10, n, { gr: haupt ? 34 : 29, fett: haupt ? 800 : 600, anker: rechts ? 'start' : 'end' })
  })
  s += flussTxt
  marken.forEach((m) => {
    const p = LU.orte[m.ort] || [m.x, m.y]
    s += `<circle cx="${p[0]}" cy="${p[1]}" r="26" fill="${m.farbe || '#b4432e'}" stroke="#fff" stroke-width="5"/>`
    if (m.text) s += txt(p[0] + 36, p[1] + 10, m.text, { gr: 29, anker: 'start', farbe: m.farbe || '#b4432e' })
  })
  if (nachbarn) {
    s += txt(-35, 360, 'BELGIEN', { gr: 30, fett: 600, farbe: '#8a8170', abstand: 6 }).replace('<text', `<text transform="rotate(-90 -35 360)"`)
    s += txt(B + 35, 420, 'DEUTSCHLAND', { gr: 30, fett: 600, farbe: '#8a8170', abstand: 6 }).replace('<text', `<text transform="rotate(90 ${B + 35} 420)"`)
    s += txt(260, H + 30, 'FRANKREICH', { gr: 30, fett: 600, farbe: '#8a8170', abstand: 6 })
  }
  if (kompass) s += `<g transform="translate(${B - 40} 40)"><path d="M0,-38 L16,14 L0,4 L-16,14 Z" fill="#2a2f3a"/><text x="0" y="-48" font-family="Lexend" font-size="30" font-weight="800" text-anchor="middle" fill="#2a2f3a">N</text></g>`
  if (massstab) {
    const km10 = 1000 / (0.86 * Math.cos(49.8 * Math.PI / 180) * 111.32) * 10
    s += `<g transform="translate(${B - 30 - km10} ${H - 30})"><rect x="0" y="0" width="${(km10 / 2).toFixed(1)}" height="12" fill="#2a2f3a"/><rect x="${(km10 / 2).toFixed(1)}" y="0" width="${(km10 / 2).toFixed(1)}" height="12" fill="#fff" stroke="#2a2f3a" stroke-width="3"/>${txt(0, -10, '0', { gr: 24, fett: 600 })}${txt(km10, -10, '10 km', { gr: 24, fett: 600 })}</g>`
  }
  s += '</svg>'
  return rahmen(s, breite)
}
export const KANTONE = LU.kantone.map((k) => (k.name === 'Luxembourg' ? 'Luxemburg' : k.name))
export const LU_ORTE = Object.keys(LU.orte)

/** Europa. markiere: [Land] oder { Land: Farbe } · eu: true färbt EU-Länder
 * nummern: [Land] → Nummern auf der Karte, Namen nur in der Lösung · namen: [Land] → Namen sichtbar
 * hauptstaedte: [Land] Punkte (+ Name, außer hauptstadtArt 'loesung') · ausschnitt: [x, y, b, h] */
// Kleine Länder: Nummer etwas versetzt, damit sie nicht übereinander liegen
const VERS = { Luxemburg: [-4, 30], Belgien: [-22, -6], Niederlande: [0, -12], Schweiz: [-6, 6], Slowenien: [0, -6], Liechtenstein: [0, 0] }
export function europaKarte(o = {}) {
  const { markiere = [], eu = false, nummern = [], namen = [], hauptstaedte = [], hauptstadtArt = 'namen', ausschnitt, breite = 150, legende } = o
  const farbe = Array.isArray(markiere) ? Object.fromEntries(markiere.map((m) => [m, '#f2b84b'])) : markiere
  const [vx, vy, vb, vh] = ausschnitt || [0, 0, EU.breite, EU.hoehe]
  let s = `<svg viewBox="${vx} ${vy} ${vb} ${vh}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block"><rect x="${vx}" y="${vy}" width="${vb}" height="${vh}" fill="#dceaf5"/>`
  s += EU.laender.map((l) => `<path d="${l.d}" fill="${farbe[l.name] || (eu && l.eu ? '#bcd7f0' : '#f7f4ec')}" stroke="#8a93a3" stroke-width="0.9" stroke-linejoin="round"/>`).join('')
  const k = vb / 1000
  EU.laender.forEach((l) => {
    const ni = nummern.indexOf(l.name)
    if (ni >= 0 && l.lx != null) s += nummer(l.lx + (VERS[l.name]?.[0] || 0) * k, l.ly + (VERS[l.name]?.[1] || 0) * k, ni + 1, { r: 15 * k, farbe: '#2a2f3a' }) + txt(l.lx + (VERS[l.name]?.[0] || 0) * k, l.ly + (VERS[l.name]?.[1] || 0) * k + 36 * k, l.name, { gr: 19 * k, klasse: 'karte-l', farbe: '#c0392b' })
    if (namen.includes(l.name) && l.lx != null) s += txt(l.lx + (VERS[l.name]?.[0] || 0) * k, l.ly + (VERS[l.name]?.[1] || 0) * k + 6 * k, l.name, { gr: 20 * k, fett: 700 })
    if (hauptstaedte.includes(l.name) && l.hauptstadt) {
      const h = l.hauptstadt
      s += `<circle cx="${h.x}" cy="${h.y}" r="${6 * k}" fill="#c0392b" stroke="#fff" stroke-width="${2 * k}"/>`
      s += txt(h.x + 9 * k, h.y + 6 * k, h.name, { gr: 17 * k, fett: 600, anker: 'start', klasse: hauptstadtArt === 'loesung' ? 'karte-l' : '', farbe: hauptstadtArt === 'loesung' ? '#c0392b' : '#2a2f3a' })
    }
  })
  s += '</svg>'
  return rahmen(s, breite, legende ? `<figcaption>${legende}</figcaption>` : '')
}
export const EU_LAENDER = EU.laender.filter((l) => l.eu).map((l) => l.name)

// Equal-Earth-Projektion (wie in den Daten)
function ee(lon, lat) {
  const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796, M = Math.sqrt(3) / 2
  const l = lon * Math.PI / 180, p = lat * Math.PI / 180
  const th = Math.asin(M * Math.sin(p)), t2 = th * th, t6 = t2 * t2 * t2
  return [l * Math.cos(th) / (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2))), th * (A1 + A2 * t2 + t6 * (A3 + A4 * t2))]
}
const WX = ee(180, 0)[0], WY = ee(0, 90)[1], WS = 1000 / (2 * WX)
export const weltXY = (lon, lat) => { const [x, y] = ee(lon, lat); return [(x + WX) * WS, (WY - y) * WS] }

const KONT_FARBE = { Afrika: '#f2c46b', Europa: '#8fb8e8', Asien: '#f29b8f', Nordamerika: '#a7d68c', Südamerika: '#c9a7e8', Ozeanien: '#f5a3c8', Antarktis: '#e9eef3' }
const KONT_POS = { Afrika: [20, 5], Europa: [15, 54], Asien: [90, 45], Nordamerika: [-100, 45], Südamerika: [-58, -15], Ozeanien: [135, -25], Antarktis: [20, -69] }
const OZEAN_POS = { 'Atlantischer Ozean': [-35, 15], 'Pazifischer Ozean': [-140, 5], 'Indischer Ozean': [78, -22], 'Arktischer Ozean': [25, 73], 'Südlicher Ozean': [-60, -60] }

/** Welt. kontinente: 'farben' | 'grau' · kontinentNamen: true | 'nummern' (Namen in der Lösung) | false
 * ozeane: true | 'nummern' | false · punkte: [{ lon, lat, text, farbe }] · linien: ['aequator', 'wendekreise', 'polarkreise'] */
export function weltKarte(o = {}) {
  const { kontinente = 'farben', kontinentNamen = true, ozeane = false, punkte = [], linien = [], markiere = {}, breite = 165 } = o
  const H = WELT.hoehe
  let s = `<svg viewBox="0 0 1000 ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">`
  // Umriss der Erde
  const rand = []
  for (let lat = -90; lat <= 90; lat += 5) rand.push(weltXY(-180, lat))
  for (let lat = 90; lat >= -90; lat -= 5) rand.push(weltXY(180, lat))
  s += `<path d="M${rand.map((p) => p.map((v) => v.toFixed(1)).join(',')).join('L')}Z" fill="#dceaf5" stroke="#9fb4c8" stroke-width="1.2"/>`
  const lin = (lat, farbe, strich) => { const p = []; for (let lon = -180; lon <= 180; lon += 10) p.push(weltXY(lon, lat)); return `<path d="M${p.map((q) => q.map((v) => v.toFixed(1)).join(',')).join('L')}" fill="none" stroke="${farbe}" stroke-width="1.4" ${strich ? `stroke-dasharray="${strich}"` : ''}/>` }
  s += WELT.laender.map((l) => `<path d="${l.d}" fill="${markiere[l.name] || (kontinente === 'farben' ? KONT_FARBE[l.kontinent] : '#f4f1ea')}" stroke="#ffffff" stroke-width="0.5" stroke-linejoin="round"/>`).join('')
  if (linien.includes('aequator')) s += lin(0, '#c0392b') + txt(...weltXY(-178, 2), 'Äquator', { gr: 13, anker: 'start', farbe: '#c0392b' })
  if (linien.includes('wendekreise')) s += lin(23.44, '#d08a2a', '6 4') + lin(-23.44, '#d08a2a', '6 4')
  if (linien.includes('polarkreise')) s += lin(66.56, '#5b8fd6', '6 4') + lin(-66.56, '#5b8fd6', '6 4')
  let i = 0
  if (kontinentNamen) for (const [n, [lon, lat]] of Object.entries(KONT_POS)) {
    const [x, y] = weltXY(lon, lat)
    if (kontinentNamen === 'nummern') s += nummer(x, y, ++i, { r: 13 }) + txt(x, y + 30, n, { gr: 15, klasse: 'karte-l', farbe: '#c0392b' })
    else s += txt(x, y + 6, n, { gr: 17, fett: 800 })
  }
  if (ozeane) { let j = 0; for (const [n, [lon, lat]] of Object.entries(OZEAN_POS)) {
    const [x, y] = weltXY(lon, lat)
    if (ozeane === 'nummern') s += nummer(x, y, String.fromCharCode(65 + j++), { r: 13, farbe: '#1f6aa0' }) + txt(x, y + 30, n, { gr: 14, klasse: 'karte-l', farbe: '#c0392b' })
    else s += txt(x, y, n, { gr: 14, fett: 600, farbe: '#1f6aa0', kursiv: true })
  } }
  punkte.forEach((p) => { const [x, y] = weltXY(p.lon, p.lat); s += `<circle cx="${x}" cy="${y}" r="5" fill="${p.farbe || '#c0392b'}" stroke="#fff" stroke-width="1.6"/>` + (p.text ? txt(x + 8, y + 5, p.text, { gr: 13, anker: 'start', klasse: p.loesung ? 'karte-l' : '', farbe: p.farbe || '#2a2f3a' }) : '') })
  s += '</svg>'
  return rahmen(s, breite)
}

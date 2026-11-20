// Schaubilder für die Sachfächer (selbst gezeichnet, SVG). Nummern 1, 2, 3 … zum Beschriften.
// Beschriftungen mit class="nur-l" stehen nur im Lösungsheft.

const nr = (x, y, t, r = 10) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#2a2f3a" stroke-width="2"/><text x="${x}" y="${y + r * 0.42}" text-anchor="middle" font-family="Lexend" font-size="${r * 1.2}" font-weight="800" fill="#2a2f3a">${t}</text>`
const linie = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2a2f3a" stroke-width="1.4"/>`
const svg = (b, h, inhalt, breite = 140) => `<svg viewBox="0 0 ${b} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:${breite}mm;max-width:100%;display:block;margin:0 auto">${inhalt}</svg>`
const t = (x, y, s, { gr = 13, farbe = '#2a2f3a', anker = 'middle', fett = 600, klasse = '' } = {}) => `<text class="${klasse}" x="${x}" y="${y}" text-anchor="${anker}" font-family="Lexend" font-size="${gr}" font-weight="${fett}" fill="${farbe}">${s}</text>`

/** Blütenpflanze: 1 Blüte, 2 Blatt, 3 Stängel, 4 Wurzel, 5 Knospe */
export function pflanze({ breite = 95 } = {}) {
  const blatt = (x, y, w, s) => `<path d="M${x},${y} q${30 * s},-${18} ${60 * s},${w}" fill="none"/><path d="M${x},${y} q${18 * s},-${30} ${58 * s},-${10} q-${12 * s},${26} -${58 * s},${10} z" fill="#7cbf6a" stroke="#4b8a3b" stroke-width="2"/>`
  return svg(300, 330, `
  <rect x="0" y="230" width="300" height="100" fill="#d9c2a0"/><rect x="0" y="226" width="300" height="8" fill="#9bc96f"/>
  <path d="M150,232 C148,180 152,130 150,82" stroke="#4b8a3b" stroke-width="7" fill="none"/>
  ${blatt(150, 180, 0, 1)}${blatt(150, 140, 0, -1)}
  <path d="M150,232 q-30,30 -60,40 M150,240 q10,40 -10,70 M150,236 q30,25 70,30 M150,250 q-5,30 30,60 M120,262 q-15,10 -25,30" stroke="#7a5a3a" stroke-width="3" fill="none"/>
  ${[0, 60, 120, 180, 240, 300].map((w) => `<ellipse cx="${150 + 22 * Math.cos(w * Math.PI / 180)}" cy="${68 + 22 * Math.sin(w * Math.PI / 180)}" rx="17" ry="11" transform="rotate(${w} ${150 + 22 * Math.cos(w * Math.PI / 180)} ${68 + 22 * Math.sin(w * Math.PI / 180)})" fill="#f2a0b5" stroke="#c25b7a" stroke-width="1.5"/>`).join('')}
  <circle cx="150" cy="68" r="11" fill="#f2c94c" stroke="#c99a1a" stroke-width="1.5"/>
  <path d="M152,150 q30,-50 48,-62" stroke="#4b8a3b" stroke-width="4" fill="none"/><ellipse cx="204" cy="84" rx="8" ry="13" transform="rotate(35 204 84)" fill="#9bd48b" stroke="#4b8a3b" stroke-width="2"/>
  ${linie(172, 58, 240, 30)}${nr(252, 26, 1)}${linie(85, 125, 50, 120)}${nr(38, 120, 2)}${linie(153, 205, 220, 205)}${nr(232, 205, 3)}${linie(100, 275, 60, 300)}${nr(48, 305, 4)}${linie(212, 78, 250, 70)}${nr(262, 68, 5)}`, breite)
}

/** Nahrungskette als Pfeilreihe. glieder: [{ name, icon? }] · leer: Indizes, deren Namen nur in der Lösung stehen */
export function nahrungskette(glieder, { leer = [], rollen } = {}) {
  return `<div class="kette">${glieder.map((g, i) => `${i ? '<span class="pfeil">→</span>' : ''}<div class="glied ${leer.includes(i) ? 'leer' : ''}"><b>${leer.includes(i) ? `<span class="nur-l">${g.name}</span>` : g.name}</b>${rollen ? `<small>${rollen[i] || ''}</small>` : ''}</div>`).join('')}</div>`
}

/** Ernährungspyramide: 6 Stufen von unten (Getränke) nach oben (Süßes) */
export function ernaehrungspyramide({ leer = false, breite = 120 } = {}) {
  const stufen = [
    ['Getränke: Wasser, ungesüßter Tee', '#8ec5e8', 'reichlich'],
    ['Gemüse und Obst', '#9bd48b', 'reichlich'],
    ['Brot, Nudeln, Reis, Kartoffeln', '#f2d38a', 'reichlich'],
    ['Milch, Käse, Fleisch, Fisch, Eier', '#f2b38a', 'mäßig'],
    ['Öle und Fette', '#f5e07a', 'wenig'],
    ['Süßes, Chips, Limonade', '#f29b9b', 'selten'],
  ]
  const H = 300, B = 320, h = H / stufen.length
  let s = ''
  stufen.forEach(([name, farbe, wie], i) => {
    const y1 = H - i * h, y0 = y1 - h
    const w1 = B * (1 - i / stufen.length), w0 = B * (1 - (i + 1) / stufen.length)
    const x = (B - w1) / 2 + 20, xo = (B - w0) / 2 + 20
    s += `<path d="M${x},${y1} L${x + w1},${y1} L${xo + w0},${y0} L${xo},${y0} Z" fill="${farbe}" stroke="#fff" stroke-width="3"/>`
    s += t(B / 2 + 20, y0 + h / 2 + 5, String(i + 1), { gr: 15, fett: 800 })
    s += `<line x1="${x + w1 + 4}" y1="${y0 + h / 2}" x2="${B + 40}" y2="${y0 + h / 2}" stroke="#c3c9d4" stroke-dasharray="3 3"/>`
    s += t(B + 46, y0 + h / 2 - 2, name, { gr: 12.5, anker: 'start', klasse: leer ? 'nur-l' : '', farbe: leer ? '#c0392b' : '#2a2f3a' })
    s += t(B + 46, y0 + h / 2 + 14, wie, { gr: 11, anker: 'start', fett: 400, farbe: '#6b7487' })
  })
  return svg(560, H + 10, s, breite)
}

/** Teller-Modell: Hälfte Gemüse/Obst, Viertel Getreide, Viertel Eiweiß */
export function teller({ breite = 70 } = {}) {
  const bogen = (a0, a1, f) => { const r = 100, cx = 120, cy = 120, p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `<path d="M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1},${y1} Z" fill="${f}" stroke="#fff" stroke-width="3"/>` }
  return svg(240, 240, `<circle cx="120" cy="120" r="112" fill="#fff" stroke="#c3c9d4" stroke-width="4"/>${bogen(Math.PI / 2, Math.PI * 1.5, '#9bd48b')}${bogen(-Math.PI / 2, 0, '#f2d38a')}${bogen(0, Math.PI / 2, '#f2b38a')}
  ${t(72, 116, 'Gemüse', { gr: 14, fett: 700 })}${t(72, 134, 'und Obst', { gr: 14, fett: 700 })}${t(166, 76, 'Getreide,', { gr: 12, fett: 700 })}${t(166, 92, 'Kartoffeln', { gr: 12, fett: 700 })}${t(166, 160, 'Eiweiß', { gr: 12, fett: 700 })}${t(166, 176, '(Fisch, Ei …)', { gr: 11 })}`, breite)
}

/** Balkendiagramm (HTML), daten: [[Beschriftung, Wert]] */
export function balken(titel, daten, { einheit = '', max, farbe = 'var(--f)' } = {}) {
  const m = max || Math.max(...daten.map((d) => d[1]))
  return `<div class="balken"><div class="bt">${titel}</div>${daten.map(([l, v]) => `<div class="bz"><span>${l}</span><div class="bb"><div style="width:${(v / m) * 100}%;background:${farbe}"></div><b>${String(v).replace('.', ',')}${einheit ? ' ' + einheit : ''}</b></div></div>`).join('')}</div>`
}

/** Stromkreis: Batterie, Schalter, Lampe (nummeriert) – offen oder geschlossen */
export function stromkreis({ geschlossen = true, breite = 100 } = {}) {
  const sx = geschlossen ? 'M200,40 L250,40' : 'M200,40 L245,22'
  return svg(360, 220, `
  <path d="M60,40 L200,40 M250,40 L300,40 L300,180 L60,180 L60,40" fill="none" stroke="#2a2f3a" stroke-width="4"/>
  <path d="${sx}" stroke="#2a2f3a" stroke-width="4"/><circle cx="200" cy="40" r="5" fill="#2a2f3a"/><circle cx="250" cy="40" r="5" fill="#2a2f3a"/>
  <rect x="40" y="90" width="40" height="40" fill="#fff"/><line x1="44" y1="100" x2="76" y2="100" stroke="#2a2f3a" stroke-width="5"/><line x1="52" y1="116" x2="68" y2="116" stroke="#2a2f3a" stroke-width="5"/>
  ${t(90, 104, '+', { gr: 16 })}${t(90, 124, '−', { gr: 16 })}
  <circle cx="300" cy="110" r="22" fill="${geschlossen ? '#ffe680' : '#fff'}" stroke="#2a2f3a" stroke-width="4"/><line x1="285" y1="95" x2="315" y2="125" stroke="#2a2f3a" stroke-width="3"/><line x1="315" y1="95" x2="285" y2="125" stroke="#2a2f3a" stroke-width="3"/>
  ${geschlossen ? '<path d="M330,90 l14,-8 M332,110 h16 M330,130 l14,8" stroke="#e8b400" stroke-width="3"/>' : ''}
  ${nr(20, 110, 1)}${linie(30, 110, 40, 110)}${nr(225, 80, 2)}${nr(300, 160, 3)}${nr(160, 205, 4)}${linie(160, 195, 160, 181)}`, breite)
}

/** Wasserkreislauf mit Nummern: 1 Verdunstung, 2 Wolken (Kondensation), 3 Niederschlag, 4 Abfluss/Versickern */
export function wasserkreislauf({ breite = 130 } = {}) {
  return svg(420, 250, `
  <rect width="420" height="250" fill="#eaf4fb"/><circle cx="60" cy="50" r="26" fill="#f6c945"/>
  <path d="M0,210 L120,210 Q170,120 220,150 Q270,90 330,130 Q380,150 420,140 L420,250 L0,250 Z" fill="#9bc96f"/>
  <path d="M0,215 L130,215 Q150,230 0,240 Z" fill="#5fa8dc"/><rect x="0" y="212" width="135" height="38" fill="#5fa8dc"/>
  <g fill="#fff" stroke="#9fb4c8" stroke-width="2"><ellipse cx="230" cy="55" rx="55" ry="22"/><ellipse cx="270" cy="45" rx="40" ry="20"/><ellipse cx="200" cy="48" rx="30" ry="16"/></g>
  ${[0, 1, 2, 3, 4].map((i) => `<line x1="${215 + i * 14}" y1="${85 + (i % 2) * 6}" x2="${209 + i * 14}" y2="${105 + (i % 2) * 6}" stroke="#3f8fc9" stroke-width="3"/>`).join('')}
  <path d="M70,195 C70,150 120,110 175,70" fill="none" stroke="#c0392b" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#pf)"/>
  <path d="M300,160 C260,200 200,215 140,214" fill="none" stroke="#3f8fc9" stroke-width="3" marker-end="url(#pf2)"/>
  <defs><marker id="pf" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#c0392b"/></marker><marker id="pf2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#3f8fc9"/></marker></defs>
  ${nr(95, 140, 1)}${nr(320, 40, 2)}${nr(270, 105, 3)}${nr(240, 200, 4)}`, breite)
}

/** Thermometer mit Skala (für Wetter/Aggregatzustände) */
export function thermometer(wert, { min = -20, max = 40, breite = 22, leer = false } = {}) {
  const y = (v) => 250 - ((v - min) / (max - min)) * 220
  let s = `<rect x="40" y="20" width="20" height="240" rx="10" fill="#fff" stroke="#2a2f3a" stroke-width="2"/><circle cx="50" cy="268" r="18" fill="#d0312d" stroke="#2a2f3a" stroke-width="2"/><rect x="45" y="${y(wert)}" width="10" height="${260 - y(wert)}" fill="#d0312d"/>`
  for (let v = min; v <= max; v += 10) s += `<line x1="60" y1="${y(v)}" x2="72" y2="${y(v)}" stroke="#2a2f3a" stroke-width="2"/>${t(76, y(v) + 4, v + '°', { gr: 13, anker: 'start' })}`
  return svg(110, 295, s, breite)
}

/** Vereinfachtes Skelett: 1 Schädel, 2 Wirbelsäule, 3 Rippen (Brustkorb), 4 Becken, 5 Oberschenkelknochen, 6 Oberarmknochen */
export function skelett({ breite = 60 } = {}) {
  const k = (x1, y1, x2, y2, w = 9) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#e9e2d0" stroke-width="${w}" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#8a7f66" stroke-width="${w}" stroke-linecap="round" stroke-opacity="0.25"/>`
  let s = `<rect width="260" height="420" fill="#f3f6fa"/>`
  s += `<ellipse cx="130" cy="46" rx="28" ry="32" fill="#e9e2d0" stroke="#8a7f66" stroke-width="2"/><circle cx="120" cy="44" r="6" fill="#8a7f66"/><circle cx="140" cy="44" r="6" fill="#8a7f66"/><rect x="118" y="62" width="24" height="10" rx="3" fill="#fff" stroke="#8a7f66"/>`
  for (let i = 0; i < 6; i++) s += `<path d="M130,${108 + i * 15} q${-42 + i * 2},4 ${-46 + i * 3},${18}" fill="none" stroke="#c9bfa6" stroke-width="5"/><path d="M130,${108 + i * 15} q${42 - i * 2},4 ${46 - i * 3},${18}" fill="none" stroke="#c9bfa6" stroke-width="5"/>`
  for (let y = 84; y < 236; y += 10) s += `<rect x="125" y="${y}" width="10" height="8" rx="2" fill="#e9e2d0" stroke="#8a7f66" stroke-width="1"/>`
  s += k(88, 96, 172, 96, 7)
  s += k(88, 98, 70, 170) + k(70, 170, 60, 236, 7) + k(172, 98, 190, 170) + k(190, 170, 200, 236, 7)
  s += `<path d="M96,236 Q130,214 164,236 L156,262 Q130,276 104,262 Z" fill="#e9e2d0" stroke="#8a7f66" stroke-width="2"/>`
  s += k(108, 262, 100, 340, 11) + k(100, 340, 98, 404, 8) + k(152, 262, 160, 340, 11) + k(160, 340, 162, 404, 8)
  s += `${linie(158, 40, 214, 30)}${nr(226, 28, 1)}${linie(136, 190, 214, 196)}${nr(226, 198, 2)}${linie(110, 130, 40, 120)}${nr(28, 118, 3)}${linie(150, 250, 214, 258)}${nr(226, 260, 4)}${linie(104, 300, 40, 300)}${nr(28, 300, 5)}${linie(80, 135, 36, 170)}${nr(24, 176, 6)}`
  return svg(260, 420, s, breite)
}

/** Atmungsorgane: 1 Luftröhre, 2 Lunge, 3 Bronchien, 4 Zwerchfell */
export function lunge({ breite = 70 } = {}) {
  return svg(300, 280, `<rect width="300" height="280" fill="#f3f6fa"/>
  <rect x="140" y="20" width="20" height="80" rx="8" fill="#e8b4b4" stroke="#a65d5d" stroke-width="2"/>
  <path d="M150,100 L110,130 M150,100 L190,130" stroke="#a65d5d" stroke-width="8" stroke-linecap="round"/>
  <path d="M135,108 C70,90 40,160 50,215 C60,250 120,245 135,220 Z" fill="#f2a0a0" stroke="#a65d5d" stroke-width="2"/>
  <path d="M165,108 C230,90 260,160 250,215 C240,250 180,245 165,220 Z" fill="#f2a0a0" stroke="#a65d5d" stroke-width="2"/>
  <path d="M110,130 l-20,25 M110,130 l-5,35 M190,130 l20,25 M190,130 l5,35" stroke="#a65d5d" stroke-width="3"/>
  <path d="M30,250 Q150,215 270,250" fill="none" stroke="#c98a06" stroke-width="5"/>
  ${linie(160, 40, 230, 30)}${nr(242, 28, 1)}${linie(70, 190, 30, 170)}${nr(20, 165, 2)}${linie(205, 150, 262, 120)}${nr(272, 116, 3)}${linie(150, 233, 150, 262)}${nr(150, 270, 4)}`, breite)
}

/** Verdauung: 1 Mund, 2 Speiseröhre, 3 Magen, 4 Dünndarm, 5 Dickdarm, 6 Leber */
export function verdauung({ breite = 62 } = {}) {
  return svg(260, 380, `<rect width="260" height="380" fill="#f3f6fa"/>
  <path d="M90,20 Q130,0 170,20 Q185,60 165,80 L150,90 L150,120 Q200,125 215,170 L220,330 Q130,370 40,330 L45,170 Q60,125 110,120 L110,90 L95,80 Q75,60 90,20 Z" fill="#fff" stroke="#c3c9d4" stroke-width="3"/>
  <ellipse cx="130" cy="52" rx="16" ry="8" fill="#e58c8c"/>
  <path d="M130,60 L130,160" stroke="#e8a77a" stroke-width="9" stroke-linecap="round"/>
  <path d="M84,160 Q70,190 100,200 Q130,206 140,180 Z" fill="#c25b5b" opacity="0.85"/>
  <path d="M128,160 C170,150 190,175 175,200 C160,220 130,210 128,190 Z" fill="#f2b38a" stroke="#c98a5a" stroke-width="2"/>
  <path d="M75,225 L75,305 L185,305 L185,225 L75,225" fill="none" stroke="#8fb8e8" stroke-width="14" stroke-linejoin="round"/>
  <path d="M95,240 q20,15 40,0 q20,-15 40,0 M95,262 q20,15 40,0 q20,-15 40,0 M95,284 q20,15 40,0 q20,-15 40,0" fill="none" stroke="#f2a0b5" stroke-width="8" stroke-linecap="round"/>
  ${linie(146, 52, 220, 40)}${nr(232, 38, 1)}${linie(130, 110, 40, 104)}${nr(28, 102, 2)}${linie(170, 182, 232, 166)}${nr(240, 162, 3)}${linie(135, 270, 232, 280)}${nr(240, 282, 4)}${linie(75, 300, 28, 320)}${nr(20, 324, 5)}${linie(90, 180, 28, 200)}${nr(20, 204, 6)}`, breite)
}

/** Herz-Kreislauf vereinfacht: Herz in der Mitte, Lungenkreislauf oben, Körperkreislauf unten */
export function kreislauf({ breite = 80 } = {}) {
  return svg(320, 300, `<rect width="320" height="300" fill="#f3f6fa"/>
  <defs><marker id="kr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#c0392b"/></marker><marker id="kb" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#3f6fc9"/></marker></defs>
  <ellipse cx="160" cy="45" rx="70" ry="28" fill="#f2c4c4" stroke="#a65d5d" stroke-width="2"/>${t(160, 50, 'Lunge', { gr: 14, fett: 800 })}
  <path d="M140,150 C120,125 95,140 105,165 C115,190 160,215 160,215 C160,215 205,190 215,165 C225,140 200,125 180,150 Z" fill="#d0312d"/>${t(160, 175, 'Herz', { gr: 14, fett: 800, farbe: '#fff' })}
  <rect x="66" y="240" width="188" height="40" rx="10" fill="#e9eef3" stroke="#9fb4c8" stroke-width="2"/>${t(160, 265, 'Körper (Muskeln, Organe)', { gr: 12, fett: 700 })}
  <path d="M120,140 C80,110 80,80 110,66" fill="none" stroke="#3f6fc9" stroke-width="5" marker-end="url(#kb)"/>
  <path d="M210,66 C240,80 240,110 200,140" fill="none" stroke="#c0392b" stroke-width="5" marker-end="url(#kr)"/>
  <path d="M215,175 C270,200 260,240 232,255" fill="none" stroke="#c0392b" stroke-width="5" marker-end="url(#kr)"/>
  <path d="M90,258 C55,240 50,200 105,175" fill="none" stroke="#3f6fc9" stroke-width="5" marker-end="url(#kb)"/>
  ${t(268, 105, 'sauerstoffreich', { gr: 11, farbe: '#c0392b', anker: 'middle' })}${t(48, 105, 'sauerstoffarm', { gr: 11, farbe: '#3f6fc9', anker: 'middle' })}`, breite)
}

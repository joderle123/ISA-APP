// Gemeinsame Bausteine der Sport-Hefte (bau.mjs, baukasten.mjs): Text-Hilfen, eingebettete Schriften, Spielfeld-Skizze.
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
export const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
export const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/„(.+?)“/g, '„<i>$1</i>“')
const FONTS = join(ROOT, 'src/assets/fonts/heft')
const b64 = (f) => readFileSync(join(FONTS, f)).toString('base64')
const face = (fam, w, f, st = 'normal') => `@font-face{font-family:'${fam}';font-weight:${w};font-style:${st};src:url(data:font/woff2;base64,${b64(f)}) format('woff2')}`
export const SCHRIFT = [
  face('Lexend', 500, 'lexend-latin-500-normal.woff2'), face('Lexend', 700, 'lexend-latin-700-normal.woff2'), face('Lexend', 800, 'lexend-latin-800-normal.woff2'),
  face('Atkinson', 400, 'atkinson-hyperlegible-latin-400-normal.woff2'), face('Atkinson', 700, 'atkinson-hyperlegible-latin-700-normal.woff2'),
  face('Atkinson', 400, 'atkinson-hyperlegible-latin-400-italic.woff2', 'italic'),
].join('\n')

// ---------- Spielfeld-Skizze ----------
// Koordinaten: x 0–100, y 0–56. Felder: halle (zwei Tore), halb (ein Tor rechts), frei, netz (Netz in der Mitte),
// tisch (Tischtennis von oben), korb (Basketball-Halbfeld, Korb rechts), weg (Strecke, nur Rand).
// a/b: Spieler:innen Team A (Farbe) / B (weiß), j: Joker (gelb), t: Torhut, k: Hütchen, ball: Bälle, m: Matten/Kästen
// [x,y,w,h], z: Zonen [x,y,w,h,'Text'], pf: Pfeile [x1,y1,x2,y2,'p'|'l'|'d'] (Pass gestrichelt, Laufweg, Dribbeln Zickzack),
// tx: Beschriftung [x,y,'Text'].
export function skizze(s, farbe) {
  if (!s) return ''
  const W = 100, H = 56, o = []
  const linie = 'stroke="#3d4a5c" stroke-width=".55" fill="none"'
  o.push(`<rect x=".6" y=".6" width="${W - 1.2}" height="${H - 1.2}" rx="1.6" fill="${s.feld === 'weg' ? '#f3f6ef' : '#fbf6ee'}" ${linie}/>`)
  const tor = (x, links) => `<rect x="${links ? x - 1.6 : x}" y="${H / 2 - 5}" width="1.6" height="10" fill="#3d4a5c"/>` +
    `<path d="M${x} ${H / 2 - 13} A 13 13 0 0 ${links ? 1 : 0} ${x} ${H / 2 + 13}" ${linie} stroke-dasharray="0"/>`
  if (s.feld === 'halle') o.push(`<line x1="50" y1=".6" x2="50" y2="${H - .6}" ${linie}/>`, tor(1.4, true), tor(W - 1.4, false))
  if (s.feld === 'halb') o.push(tor(W - 1.4, false))
  if (s.feld === 'netz') o.push(`<line x1="50" y1="2" x2="50" y2="${H - 2}" stroke="#3d4a5c" stroke-width="1.4"/>`, `<line x1="50" y1="2" x2="50" y2="${H - 2}" stroke="#fff" stroke-width=".5" stroke-dasharray="1 1"/>`)
  if (s.feld === 'tisch') o.push(`<rect x="22" y="12" width="56" height="32" fill="#2f6db0" stroke="#fff" stroke-width=".8"/>`, `<line x1="50" y1="10" x2="50" y2="46" stroke="#3d4a5c" stroke-width="1.2"/>`, `<line x1="22" y1="28" x2="78" y2="28" stroke="#fff" stroke-width=".4"/>`)
  if (s.feld === 'korb') o.push(`<path d="M${W - .6} ${H / 2 - 16} H ${W - 20} V ${H / 2 + 16} H ${W - .6}" ${linie}/>`, `<path d="M${W - .6} 4 A 26 26 0 0 0 ${W - .6} ${H - 4}" ${linie}/>`, `<circle cx="${W - 5}" cy="${H / 2}" r="1.8" fill="none" stroke="#d9480f" stroke-width=".8"/>`, `<line x1="${W - 2.4}" y1="${H / 2 - 4}" x2="${W - 2.4}" y2="${H / 2 + 4}" stroke="#3d4a5c" stroke-width=".9"/>`)
  for (const [x, y, w, h, t] of s.z || []) o.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.2" fill="${farbe}" fill-opacity=".12" stroke="${farbe}" stroke-width=".4" stroke-dasharray="1.2 .8"/>` + (t ? `<text x="${x + w / 2}" y="${y + 3.4}" class="zt">${esc(t)}</text>` : ''))
  for (const [x, y, w, h] of s.m || []) o.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx=".6" fill="#c9b8a0" stroke="#7a6650" stroke-width=".4"/>`)
  for (const [x1, y1, x2, y2, art] of s.pf || []) {
    const id = art === 'p' ? 'pp' : art === 'd' ? 'pd' : 'pl'
    if (art === 'd') {
      const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), n = Math.max(3, Math.round(L / 3)), nx = -dy / L, ny = dx / L
      let d = `M${x1} ${y1}`; for (let i = 1; i <= n; i++) { const f = i / n, a = i === n ? 0 : (i % 2 ? 1.1 : -1.1); d += ` L${(x1 + dx * f + nx * a).toFixed(1)} ${(y1 + dy * f + ny * a).toFixed(1)}` }
      o.push(`<path d="${d}" fill="none" stroke="#3d4a5c" stroke-width=".55" marker-end="url(#${id})"/>`)
    } else o.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${art === 'p' ? farbe : '#3d4a5c'}" stroke-width="${art === 'p' ? .7 : .55}" ${art === 'p' ? 'stroke-dasharray="1.6 1"' : ''} marker-end="url(#${id})"/>`)
  }
  for (const [x, y] of s.k || []) o.push(`<path d="M${x} ${y - 1.7} L${x + 1.5} ${y + 1.1} L${x - 1.5} ${y + 1.1} Z" fill="#f08c00" stroke="#a35f00" stroke-width=".25"/>`)
  for (const [x, y] of s.ball || []) o.push(`<circle cx="${x}" cy="${y}" r="1.3" fill="#fff" stroke="#3d4a5c" stroke-width=".35"/><circle cx="${x}" cy="${y}" r=".4" fill="#3d4a5c"/>`)
  const figur = (x, y, f, rand, t) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${f}" stroke="${rand}" stroke-width=".5"/>` + (t ? `<text x="${x}" y="${y + .9}" class="ft" fill="${f === '#fff' ? '#3d4a5c' : '#fff'}">${t}</text>` : '')
  for (const [x, y, t] of s.a || []) o.push(figur(x, y, farbe, '#fff', t))
  for (const [x, y, t] of s.b || []) o.push(figur(x, y, '#fff', '#3d4a5c', t))
  for (const [x, y, t] of s.j || []) o.push(figur(x, y, '#f5c400', '#7a6200', t ?? 'J'))
  for (const [x, y] of s.t || []) o.push(figur(x, y, '#3d4a5c', '#fff', 'T'))
  for (const [x, y, t] of s.tx || []) o.push(`<text x="${x}" y="${y}" class="lt">${esc(t)}</text>`)
  return `<svg viewBox="0 0 ${W} ${H}" class="skizze"><defs>` +
    `<marker id="pp" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="3.2" markerHeight="3.2" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="${farbe}"/></marker>` +
    `<marker id="pl" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="3" markerHeight="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#3d4a5c"/></marker>` +
    `<marker id="pd" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="3" markerHeight="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#3d4a5c"/></marker>` +
    `</defs>${o.join('')}</svg>`
}

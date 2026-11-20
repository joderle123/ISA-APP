// Multimodale Modulhefte (Auftrag 20.11.): Heft + Lösungsheft als PDF, mit Lesetexten und Hörtexten (QR-Code → Audio).
//   npx tsx --tsconfig tsconfig.scripts.json tools/hefte/heft.tsx deutsch-m1 [weitere …] [--png] [--ohne-audio-liste]
// Inhalte: tools/hefte/inhalt/<id>.mjs (MODUL, LEKTIONEN). Ausgabe: tmp/hefte/<id>/ (nicht im Repo).
// Zusätzlich: tmp/hefte/<id>/spuren.json – die Hörtexte für tools/hefte/audio.py (Vorlese-Stimmen) und die Abspiel-Seite h/.
// Gedruckt wird mit Chromium (Playwright); die Seitenzahlen im Inhalt kommen aus einem ersten Durchlauf (PyMuPDF).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { renderToStaticMarkup } from 'react-dom/server'
import qrcode from 'qrcode-generator'
import { ZeichnungSvg } from '../../src/blatt/ZeichnungSvg'
import { palette } from '../../src/blatt/zeichnung'
import { peepZeichnung } from '../../src/blatt/peeps'
import { URHEBER } from '../../src/lib/urheber'

const HIER = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HIER, '..', '..')
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.NODE_PATH ? join(process.env.NODE_PATH.split(':')[0], 'playwright') : 'playwright')

/** Adresse der Abspiel-Seite (GitHub Pages des Projekts). Der QR-Code enthält <BASIS>?<code>, z. B. …/h/?de1-01h */
export const HOER_BASIS = process.env.HOER_BASIS || 'https://joderle123.github.io/ISA-APP/h/'

// ---------------------------------------------------------------- Hilfen
const esc = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Inline-Auszeichnung: [Lösung] = Lücke · [Lösung|30] = Lücke 30 mm · **fett** · __Endung__ · ==markiert== · //kursiv// */
function inl(s: string): string {
  // \[ und \] = echte Klammern (z. B. Strecke [AB]); {{3/4}} = Bruch
  let h = esc(s).replace(/\\\[/g, '\u0001').replace(/\\\]/g, '\u0002').replace(/\{\{(\d+|▢)\/(\d+|▢)\}\}/g, '<span class="bruch"><span>$1</span><span>$2</span></span>')
  h = h.replace(/\[([^\]|]*)(?:\|(\d+))?\]/g, (_m, l: string, b?: string) => {
    const breite = b ? Number(b) : Math.max(20, Math.min(70, l.length * 2.9 + 8))
    return `<span class="luecke" style="min-width:${breite}mm"><span class="l">${l}</span></span>`
  })
  h = h.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/__(.+?)__/g, '<span class="endung">$1</span>')
  h = h.replace(/==(.+?)==/g, '<span class="markiert">$1</span>').replace(/\/\/(.+?)\/\//g, '<i>$1</i>')
  h = h.replace(/~~(.+?)~~/g, '<s class="falsch">$1</s>')
  return h.replace(/\u0001/g, '[').replace(/\u0002/g, ']')
}
/** Lösung ohne Auszeichnung (für Linien) */
const roh = (s: string) => s.replace(/\\\[/g, '\u0001').replace(/\\\]/g, '\u0002').replace(/\{\{([^/{}]+)\/([^/{}]+)\}\}/g, '$1/$2').replace(/\[([^\]|]*)(?:\|\d+)?\]/g, '$1').replace(/~~.+?~~/g, '').replace(/\*\*|__|==|\/\//g, '').replace(/\u0001/g, '[').replace(/\u0002/g, ']')

const ICON_CACHE: Record<string, string> = {}
function icon(name: string, gefuellt = false): string {
  const k = (gefuellt ? 'f:' : 'o:') + name
  if (!ICON_CACHE[k]) {
    const datei = join(ROOT, 'node_modules/@tabler/icons/icons', gefuellt ? 'filled' : 'outline', name + '.svg')
    ICON_CACHE[k] = readFileSync(datei, 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/\s(width|height)="24"/g, '').replace(/stroke-width="2"/, 'stroke-width="2.1"').trim()
  }
  return ICON_CACHE[k]
}

let FARBEN = { tief: '#b4432e', mittel: '#eaa38f', zart: '#fbefe9' }
function peep(wer: string, gefuehl = 'froh', haltung = 'brust'): string {
  return renderToStaticMarkup(<ZeichnungSvg z={peepZeichnung(wer, gefuehl, haltung)} p={palette(FARBEN)} />)
}
/** Bildangabe 'noah' | 'noah:froh' | 'noah:froh:stehen' */
function bild(angabe: string): string {
  const [wer, g, h] = angabe.split(':')
  return peep(wer, g || 'froh', h || 'brust')
}

function qr(text: string): string {
  const q = qrcode(0, 'M'); q.addData(text); q.make()
  return q.createSvgTag({ cellSize: 4, margin: 0, scalable: true })
}

const stufen = (n: number) => `<span class="stufen">${[1, 2, 3].map((i) => `<i class="${i <= n ? 'an' : ''}"></i>`).join('')}</span>`

// ---------------------------------------------------------------- Aufgaben
type Aufgabe = Record<string, any> & { art: string; stufe?: number; auftrag?: string; hilfe?: string }

function linien(n: number, loesungen: string[] = [], anfaenge: string[] = []): string {
  let h = '<div class="linien">'
  for (let i = 0; i < n; i++) {
    const a = anfaenge[i] ? `<span class="anfang">${inl(anfaenge[i])}</span>` : ''
    const l = loesungen[i] ? `<span class="l" style="${anfaenge[i] ? `left:${Math.min(120, anfaenge[i].length * 2.35 + 3)}mm` : ''}">${esc(roh(loesungen[i]))}</span>` : ''
    h += `<div class="zeile">${a}${l}</div>`
  }
  return h + '</div>'
}

const ABC = 'ABCDEFGHIJKLMNOP'

/** Analoge Uhr als SVG, z. B. uhr('7:15') */
function uhr(zeit: string): string {
  const [h, m] = zeit.split(':').map(Number)
  const wm = (m / 60) * 360, wh = ((h % 12) / 12) * 360 + (m / 60) * 30
  const strich = Array.from({ length: 60 }, (_, i) => { const w = (i * 6 * Math.PI) / 180, l = i % 5 ? 3 : 7; return `<line x1="${50 + Math.sin(w) * 44}" y1="${50 - Math.cos(w) * 44}" x2="${50 + Math.sin(w) * (44 - l)}" y2="${50 - Math.cos(w) * (44 - l)}" stroke="#1b2233" stroke-width="${i % 5 ? 0.8 : 2}"/>` }).join('')
  const zahlen = Array.from({ length: 12 }, (_, i) => { const w = ((i + 1) * 30 * Math.PI) / 180; return `<text x="${50 + Math.sin(w) * 31}" y="${50 - Math.cos(w) * 31 + 3.6}" text-anchor="middle" font-family="Lexend" font-weight="600" font-size="10" fill="#1b2233">${i + 1}</text>` }).join('')
  const zeiger = (w: number, l: number, b: number, f: string) => { const r = (w * Math.PI) / 180; return `<line x1="50" y1="50" x2="${50 + Math.sin(r) * l}" y2="${50 - Math.cos(r) * l}" stroke="${f}" stroke-width="${b}" stroke-linecap="round"/>` }
  return `<svg viewBox="0 0 100 100" class="uhr"><circle cx="50" cy="50" r="48" fill="#fff" stroke="var(--f)" stroke-width="3"/>${strich}${zahlen}${zeiger(wh, 24, 5, '#1b2233')}${zeiger(wm, 37, 3, 'var(--f)')}<circle cx="50" cy="50" r="3.5" fill="#1b2233"/></svg>`
}

/** Vereinfachter Stadtplan: Raster (A–F, 1–4) für das Straßenverzeichnis, Fluss, Straßen mit Namen, Orte mit Symbol.
 *  orte: [{x, y, icon, name, nr?, leer?}] – leer = nur Nummer (zum Eintragen); weg: [[x,y],…] = eingezeichneter Weg (nur Lösung) */
function stadtplan(a: any): string {
  const W = a.breite || 16, H = a.hoehe || 10, k = 10, sp = a.spalten || 6, zl = a.zeilen || 4
  const cid = 'kp' + Math.random().toString(36).slice(2, 8)
  let h = `<defs><clipPath id="${cid}"><rect x="0" y="0" width="${W * k}" height="${H * k}" rx="3"/></clipPath></defs><g clip-path="url(#${cid})"><rect x="0" y="0" width="${W * k}" height="${H * k}" fill="#f6f4ee"/>`
  for (const g of a.gruen || []) h += `<rect x="${g.x * k}" y="${g.y * k}" width="${g.w * k}" height="${g.h * k}" rx="4" fill="#dcefd9"/>${g.name ? `<text x="${(g.x + g.w / 2) * k}" y="${(g.y + g.h / 2) * k + 1.5}" text-anchor="middle" font-family="Lexend" font-size="3.4" fill="#2f8a4c">${esc(g.name)}</text>` : ''}`
  if (a.fluss) h += `<path d="${a.fluss.d}" fill="none" stroke="#a9d2ec" stroke-width="${(a.fluss.b || 1.6) * k}" stroke-linecap="round"/>${a.fluss.name ? `<text x="${a.fluss.tx * k}" y="${a.fluss.ty * k}" font-family="Lexend" font-style="italic" font-size="4" fill="#1f7a99" transform="rotate(${a.fluss.rot || -90} ${a.fluss.tx * k} ${a.fluss.ty * k})">${esc(a.fluss.name)}</text>` : ''}`
  for (const st of a.strassen || []) {
    h += `<line x1="${st.x1 * k}" y1="${st.y1 * k}" x2="${st.x2 * k}" y2="${st.y2 * k}" stroke="#fff" stroke-width="${st.breit ? 6 : 4.2}" stroke-linecap="round"/><line x1="${st.x1 * k}" y1="${st.y1 * k}" x2="${st.x2 * k}" y2="${st.y2 * k}" stroke="#d6d1c4" stroke-width="0.5"/>`
    if (st.name) { const mx = ((st.x1 + st.x2) / 2) * k, my = ((st.y1 + st.y2) / 2) * k, w = (Math.atan2(st.y2 - st.y1, st.x2 - st.x1) * 180) / Math.PI, ww = w > 90 || w < -90 ? w + 180 : w
      h += `<text x="${mx}" y="${my + 1.6}" text-anchor="middle" font-family="Atkinson" font-size="2.9" fill="#5a6376" transform="rotate(${ww} ${mx} ${my})">${esc(st.name)}</text>` }
  }
  h += '</g>'
  if (a.weg) h += `<polyline class="plan-l" points="${a.weg.map(([x, y]: number[]) => `${x * k},${y * k}`).join(' ')}" fill="none" stroke="var(--loesung)" stroke-width="1.6" stroke-dasharray="3 2" stroke-linecap="round" stroke-linejoin="round"/>`
  for (const o of a.orte || []) {
    const r = 3.4, ic = icon(o.icon || 'map-pin').replace('<svg', `<svg x="${o.x * k - 2.3}" y="${o.y * k - 2.3}" width="4.6" height="4.6" color="#fff"`)
    h += `<circle cx="${o.x * k}" cy="${o.y * k}" r="${r}" fill="${o.farbe || 'var(--f)'}" stroke="#fff" stroke-width="0.8"/>${ic}`
    const pos = o.pos || (o.links ? 'l' : 'r')
    const lx = o.x * k + (pos === 'l' ? -5 : pos === 'r' ? 5 : 0), ly = o.y * k + (pos === 'o' ? -5 : pos === 'u' ? 7.5 : 1.3)
    const anchor = pos === 'l' ? 'end' : pos === 'r' ? 'start' : 'middle'
    const fs = 3.5, halo = `stroke="#f6f4ee" stroke-width="1.3" paint-order="stroke"`
    if (o.leer) h += `<text x="${lx}" y="${ly}" text-anchor="${anchor}" font-family="Lexend" font-weight="800" font-size="4.6" fill="var(--f)" ${halo}>${esc(o.nr)}</text><text class="plan-l" x="${lx + (pos === 'l' ? -5 : 5)}" y="${ly}" text-anchor="${anchor}" font-family="Hand" font-size="4" fill="var(--loesung)">${esc(o.name)}</text>`
    else h += `<text x="${lx}" y="${ly}" text-anchor="${anchor}" font-family="Lexend" font-weight="600" font-size="${fs}" fill="#1b2233" ${halo}>${o.nr ? `<tspan font-weight="800" fill="var(--f)">${esc(o.nr)} </tspan>` : ''}${esc(o.name)}</text>`
  }
  if (a.start) h += `<g transform="translate(${a.start.x * k},${a.start.y * k})"><circle r="2.8" fill="#d0312d"/><circle r="1.1" fill="#fff"/></g><text x="${a.start.x * k + 4}" y="${a.start.y * k + 1.3}" font-family="Lexend" font-weight="700" font-size="3.4" fill="#d0312d">${esc(a.start.text || 'Start')}</text>`
  // Raster
  if (a.raster !== false) {
    for (let i = 1; i < sp; i++) h += `<line x1="${(i * W * k) / sp}" y1="0" x2="${(i * W * k) / sp}" y2="${H * k}" stroke="#1b2233" stroke-width="0.25" stroke-dasharray="1.5 2" opacity="0.45"/>`
    for (let j = 1; j < zl; j++) h += `<line x1="0" y1="${(j * H * k) / zl}" x2="${W * k}" y2="${(j * H * k) / zl}" stroke="#1b2233" stroke-width="0.25" stroke-dasharray="1.5 2" opacity="0.45"/>`
    for (let i = 0; i < sp; i++) h += `<text x="${((i + 0.5) * W * k) / sp}" y="-2.5" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="4" fill="var(--leise)">${'ABCDEFGH'[i]}</text>`
    for (let j = 0; j < zl; j++) h += `<text x="-3" y="${((j + 0.5) * H * k) / zl + 1.8}" text-anchor="end" font-family="Lexend" font-weight="700" font-size="4" fill="var(--leise)">${j + 1}</text>`
  }
  h += `<rect x="0" y="0" width="${W * k}" height="${H * k}" rx="3" fill="none" stroke="#1b2233" stroke-width="1"/>`
  const leg = a.legende ? `<div class="legende">${a.legende.map(([ic, t]: string[]) => `<span><i>${icon(ic)}</i>${esc(t)}</span>`).join('')}</div>` : ''
  return `<div class="plan stadt">${a.titel ? `<div class="plantitel">${esc(a.titel)}</div>` : ''}<svg viewBox="-9 -8 ${W * k + 12} ${H * k + 12}">${h}</svg>${leg}</div>`
}

/** Grundriss (Schulplan): Räume als Rechtecke in einem Raster, optional ohne Namen (zum Eintragen) und mit Startpunkt */
function plan(a: any): string {
  const W = a.breite || 16, H = a.hoehe || 9, k = 10
  const raeume = a.raeume.map((r: any) => {
    const leer = r.leer, name = leer ? '' : r.name
    const text = leer ? `<text x="${(r.x + r.w / 2) * k}" y="${(r.y + r.h / 2) * k + 4}" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="9" fill="var(--f)">${esc(r.marke || '')}</text><text class="plan-l" x="${(r.x + r.w / 2) * k}" y="${(r.y + r.h / 2) * k + 13}" text-anchor="middle" font-family="Hand" font-size="${r.w < 3.2 ? 5 : 6.5}" fill="var(--loesung)">${esc(r.name)}</text>`
      : `<text x="${(r.x + r.w / 2) * k}" y="${(r.y + r.h / 2) * k + 4}" text-anchor="middle" font-family="Lexend" font-weight="600" font-size="${r.w < 3 ? 4.6 : 5.6}" fill="#1b2233">${esc(name)}</text>`
    return `<rect x="${r.x * k}" y="${r.y * k}" width="${r.w * k}" height="${r.h * k}" rx="3" fill="${r.farbe || '#fff'}" stroke="#8f98a8" stroke-width="0.8"/>${text}`
  }).join('')
  const flur = (a.flure || []).map((f: any) => `<rect x="${f.x * k}" y="${f.y * k}" width="${f.w * k}" height="${f.h * k}" fill="#f5f7fa"/>`).join('')
  const start = a.start ? `<g transform="translate(${a.start.x * k},${a.start.y * k})"><circle r="4.2" fill="#d0312d"/><circle r="1.6" fill="#fff"/></g>${a.start.text ? `<text x="${a.start.x * k}" y="${a.start.y * k + 13}" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="6" fill="#d0312d">${esc(a.start.text)}</text>` : ''}` : ''
  const treppe = (a.treppen || []).map((t: any) => `<g transform="translate(${t.x * k},${t.y * k})"><rect width="${1.4 * k}" height="${1.4 * k}" rx="2" fill="#fdf5e1" stroke="#c98a06"/>${[0, 1, 2, 3].map((i) => `<line x1="${2 + i * 3}" y1="${12 - i * 3}" x2="${5 + i * 3}" y2="${12 - i * 3}" stroke="#c98a06" stroke-width="1.6"/>`).join('')}</g>`).join('')
  const titel = a.titel ? `<text x="2" y="-5" font-family="Lexend" font-weight="700" font-size="6" letter-spacing="0.6" fill="var(--leise)">${esc(a.titel)}</text>` : ''
  return `<div class="plan"><svg viewBox="-2 -10 ${W * k + 4} ${H * k + 26}">${titel}<rect x="0" y="0" width="${W * k}" height="${H * k}" rx="3" fill="#fff" stroke="#1b2233" stroke-width="1.2"/>${flur}${raeume}${treppe}${start}</svg></div>`
}
function aufgabeKoerper(a: Aufgabe): string {
  switch (a.art) {
    case 'luecken': {
      const ws = a.woerter ? `<div class="wortspeicher">${a.woerter.map((w: string) => `<span>${esc(w)}</span>`).join('')}</div>` : ''
      return ws + `<ol class="saetze">${a.saetze.map((s: string) => `<li>${inl(s)}</li>`).join('')}</ol>`
    }
    case 'rf': {
      const k = a.spalten || ['richtig', 'falsch']
      return `<table class="raster rf"><tr><th></th>${k.map((x: string) => `<th style="text-align:center">${esc(x)}</th>`).join('')}</tr>${a.saetze
        .map(([s, r]: [string, boolean]) => `<tr><td>${inl(s)}</td><td class="k"><span class="kaestchen ${r ? 'x' : ''}"></span></td><td class="k"><span class="kaestchen ${r ? '' : 'x'}"></span></td></tr>`)
        .join('')}</table>`
    }
    case 'wer': {
      return `<table class="raster rf"><tr><th></th>${a.personen.map((p: string) => `<th style="text-align:center">${esc(p)}</th>`).join('')}</tr>${a.saetze
        .map(([s, wer]: [string, string]) => `<tr><td>${inl(s)}</td>${a.personen.map((p: string) => `<td class="k"><span class="kaestchen ${[].concat(wer as any).includes(p as never) ? 'x' : ''}"></span></td>`).join('')}</tr>`)
        .join('')}</table>`
    }
    case 'mc': {
      return `<div class="mc">${a.fragen
        .map((f: any, i: number) => `<div class="frage"><div>${a.fragen.length > 1 ? `<span style="color:var(--leise);font-size:11pt">${'abcdefgh'[i]})</span> ` : ''}${inl(f.f)}</div><div class="optionen">${f.o
          .map((o: string, j: number) => `<span><span class="kaestchen ${j === f.r || (Array.isArray(f.r) && f.r.includes(j)) ? 'x' : ''}"></span>${inl(o)}</span>`)
          .join('')}</div></div>`)
        .join('')}</div>`
    }
    case 'zuordnen': {
      const n = a.links.length, ordnung: number[] = a.ordnung || [...Array(n).keys()].map((i) => (i * 3 + 1) % n)
      // rechts in gemischter Reihenfolge: Platz k zeigt rechts[ordnung[k]]
      const buchstabe = (i: number) => ABC[ordnung.indexOf(i)]
      let h = '<div class="zuordnen">'
      for (let i = 0; i < n; i++) {
        h += `<div class="a"><span class="zz">${i + 1}</span>${inl(a.links[i])}</div><div class="feld"><span class="l">${buchstabe(i)}</span></div><div class="b"><span class="zz">${ABC[i]}</span>${inl(a.rechts[ordnung[i]])}</div>`
      }
      return h + '</div>'
    }
    case 'tabelle': {
      const br = a.breiten ? a.breiten.map((b: number) => `<col style="width:${b}%">`).join('') : ''
      return `<table class="raster"><colgroup>${br}</colgroup><tr>${a.kopf.map((k: string) => `<th>${esc(k)}</th>`).join('')}</tr>${a.zeilen
        .map((z: string[]) => `<tr>${z.map((c) => {
          const m = /^\[(.*)\]$/.exec(c)
          return m ? `<td><span class="l">${esc(m[1])}</span></td>` : `<td class="vorgabe">${inl(c)}</td>`
        }).join('')}</tr>`)
        .join('')}</table>`
    }
    case 'fragen': {
      return a.fragen.map((f: any, i: number) => `<div class="frage-block"><div class="f"><span style="color:var(--leise);font-size:11pt">${'abcdefgh'[i]})</span> ${inl(f.f)}</div>${linien(f.zeilen || 1, [f.l || ''])}</div>`).join('')
    }
    case 'abschreiben': {
      return `<table class="raster"><colgroup><col style="width:47%"><col></colgroup><tr><th>${esc(a.kopf?.[0] || 'so nicht')}</th><th>${esc(a.kopf?.[1] || 'so ist es richtig')}</th></tr>${a.saetze
        .map(([f, r]: [string, string]) => `<tr><td style="height:14mm">${inl(f)}</td><td><span class="l">${esc(r)}</span></td></tr>`)
        .join('')}</table>`
    }
    case 'ordnen': {
      const n = a.teile.length, ordnung: number[] = a.ordnung || [...Array(n).keys()].map((i) => (i * 2 + 1) % n)
      return `<div style="display:grid;gap:2.2mm">${ordnung
        .map((i) => `<div style="display:flex;gap:3mm;align-items:center"><span class="feld" style="border:0.35mm solid var(--tinte);border-radius:2mm;width:10mm;height:9mm;display:flex;align-items:center;justify-content:center;flex:none"><span class="l lsg-hand">${i + 1}</span></span><span style="font-size:12.6pt">${inl(a.teile[i])}</span></div>`)
        .join('')}</div>`
    }
    case 'schreiben': {
      const anf = a.anfaenge ? `<div class="anfaenge">${a.anfaenge.map((x: string) => `<span>${esc(x)}</span>`).join('')}</div>` : ''
      const bsp = a.beispiel ? `<div class="nur-loesung" style="font-family:Hand;color:var(--loesung);font-size:14pt;line-height:1.5;margin:1mm 0 2mm">${esc(a.beispiel)}</div>` : ''
      return anf + bsp + `<div class="nur-heft">${linien(a.zeilen || 6, [], a.zeilenAnfaenge || [])}</div>`
    }
    case 'steckbrief': {
      return `<div class="steckbrief"><div class="foto">${esc(a.bildText || (a.sp === 'fr' ? 'Dessine ici un symbole pour toi.' : 'Zeichne hier ein Symbol für dich.'))}</div><div class="felder">${a.felder.map((f: string) => `<div class="feld"><span>${esc(f)}</span><span></span></div>`).join('')}</div></div>`
    }
    case 'sprechen': {
      return `<div class="sprechkarte">${a.karten.map((k: any) => `<div class="karte"><b>${esc(k.titel)}</b>${[].concat(k.text).map((z: string) => `<div>${inl(z)}</div>`).join('')}</div>`).join('')}</div>`
    }
    case 'interview': {
      return `<table class="raster"><tr>${['Frage', ...a.spalten].map((k: string) => `<th>${esc(k)}</th>`).join('')}</tr>${a.fragen
        .map((f: string) => `<tr><td>${inl(f)}</td>${a.spalten.map(() => '<td></td>').join('')}</tr>`)
        .join('')}</table>`
    }
    case 'uhren': {
      return `<div class="uhren">${a.zeiten.map((z: string, i: number) => `<div class="uhr-feld">${uhr(z)}<div class="uhr-linie">${a.loesungen?.[i] ? `<span class="l">${esc(a.loesungen[i])}</span>` : ''}</div></div>`).join('')}</div>`
    }
    case 'plan':
      return plan(a)
    case 'stadtplan':
      return stadtplan(a)
    case 'personen': {
      const bilderH = `<div class="personen">${a.bilder.map((b: string, i: number) => `<div class="pb"><div class="pbild">${bild(b)}</div><b>${ABC[i]}</b></div>`).join('')}</div>`
      const liste = a.saetze ? `<div class="pliste">${a.saetze.map(([t, l]: [string, string]) => `<div class="pz"><span class="feld"><span class="l lsg-hand">${esc(l)}</span></span><span>${inl(t)}</span></div>`).join('')}</div>` : ''
      return bilderH + liste
    }
    case 'symbole':
      return `${a.woerter ? `<div class="wortspeicher">${a.woerter.map((w: string) => `<span>${esc(w)}</span>`).join('')}</div>` : ''}<div class="symbole">${a.symbole.map(([ic, l]: string[]) => `<div class="sym"><i>${icon(ic)}</i><div class="uhr-linie"><span class="l">${esc(l)}</span></div></div>`).join('')}</div>`
    case 'satzzeichen':
      return `<table class="raster rf"><tr><th></th>${['.', '?', '!'].map((x) => `<th style="text-align:center;font-size:14pt">${x}</th>`).join('')}</tr>${a.saetze
        .map(([nr, z]: [string, string]) => `<tr><td>${inl(nr)}</td>${['.', '?', '!'].map((x) => `<td class="k"><span class="kaestchen ${x === z ? 'x' : ''}"></span></td>`).join('')}</tr>`).join('')}</table>`
    case 'rechnen': {
      const sp = a.spalten || 2
      return `<div class="rechnen" style="grid-template-columns:repeat(${sp},1fr)">${a.items.map((it: any, i: number) => `<div class="ri"><div class="ra"><span class="rn">${'abcdefghijklmnop'[i]})</span>${inl(it.a)}</div>${it.tbl
        ? `<table class="raster"><tr>${it.tbl.cols.map((c: string) => `<th>${esc(c)}</th>`).join('')}</tr>${Array.from({ length: it.tbl.rows }, () => `<tr>${it.tbl.cols.map(() => '<td style="height:9mm"></td>').join('')}</tr>`).join('')}</table><div class="nur-loesung" style="font-family:Hand;color:var(--loesung);font-size:13pt;margin-top:1mm">${esc(it.l || '')}</div>`
        : `<div class="rk" style="height:${Math.round((it.raum ?? 1) * 10 + 5)}mm"><span class="l">${esc(it.l || '')}</span></div>`}</div>`).join('')}</div>`
    }
    case 'frei':
      return a.html
    default:
      throw new Error('Unbekannte Aufgabenart: ' + a.art)
  }
}

function aufgabe(a: Aufgabe, nr: number, klasse = ''): string {
  const lang = ['schreiben', 'fragen'].includes(a.art) && (a.zeilen || 0) > 12
  return `<div class="aufgabe ${klasse} ${lang ? 'lang' : ''}"><div class="kopf"><span class="nr">${nr}</span><span class="auftrag">${inl(a.auftrag || '')}</span>${a.stufe ? stufen(a.stufe) : ''}</div>${
    a.hilfe ? `<div class="hilfe">${inl(a.hilfe)}</div>` : ''}<div class="koerper">${aufgabeKoerper(a)}</div></div>`
}

// ---------------------------------------------------------------- Teile einer Lektion
const TEILE: Record<string, { name: Record<string, string>; icon: string }> = {
  start: { name: { de: 'Los geht’s', fr: 'C’est parti' }, icon: 'rocket' },
  lesen: { name: { de: 'Lesen', fr: 'Lire' }, icon: 'book' },
  hoeren: { name: { de: 'Hören', fr: 'Écouter' }, icon: 'headphones' },
  regel: { name: { de: 'Die Regel', fr: 'La règle' }, icon: 'bulb' },
  ueben: { name: { de: 'Üben', fr: 'S’entraîner' }, icon: 'pencil' },
  sprechen: { name: { de: 'Sprechen', fr: 'Parler' }, icon: 'messages' },
  schreiben: { name: { de: 'Schreiben', fr: 'Écrire' }, icon: 'writing' },
  check: { name: { de: 'Kurz-Check', fr: 'Mini-bilan' }, icon: 'checklist' },
}
let AKTIV: any = null
function teilKopf(art: string, sp: string, was = ''): string {
  const t = TEILE[art], o = AKTIV?.teile?.[art]
  return `<div class="teil ${art}"><span class="ic">${icon(o?.icon || t.icon)}</span><h3>${o?.[sp] || t.name[sp]}</h3>${was ? `<span class="was">${inl(was)}</span>` : ''}</div>`
}

interface Kontext { modul: any; sp: string; nr: number; zaehler: number; spuren: any[] }

function audioKarte(code: string, art: 'lesen' | 'hoeren', titel: string, unter: string, klein = false): string {
  return `<div class="audio ${art} ${klein ? 'klein' : ''}"><div class="qr">${qr(HOER_BASIS + '?' + code)}</div><div><div class="t">${esc(titel)}</div><div class="s">${inl(unter)}</div><span class="code">🎧 ${esc(code)}</span></div></div>`
}

function lesenTeil(L: any, k: Kontext): string {
  const r = L.lesen, code = `${k.modul.kuerzel}-${String(k.nr).padStart(2, '0')}l`
  let text = ''
  if (r.art === 'profile') {
    text = r.profile.map((p: any) => `<div class="profil"><div class="kopf">${bild(p.bild)}</div><div><div class="name">${esc(p.name)}</div><p class="abs">${inl(p.text)}</p></div></div>`).join('')
  } else if (r.art === 'chat') {
    text = `<div class="chat">${r.nachrichten.map(([wer, t, seite]: [string, string, string]) => `<div class="msg ${seite || (wer === r.ich ? 'r' : 'l')}"><span class="von">${esc(wer)}</span>${inl(t)}</div>`).join('')}</div>`
  } else if (r.art === 'anleitung') {
    text = `<div class="material"><b>${k.sp === 'de' ? 'Du brauchst:' : 'Il te faut :'}</b> ${r.material.map((m: string) => `<span>${inl(m)}</span>`).join('')}</div><ol class="schritte">${r.schritte
      .map((x: any, i: number) => `<li><span class="sn">${i + 1}</span><span class="si">${icon(x.icon || 'point')}</span><span class="st">${inl(x.text)}</span></li>`).join('')}</ol>${(r.danach || []).map((p: string) => `<p class="abs">${inl(p)}</p>`).join('')}`
  } else if (r.art === 'bd') {
    // Roman-photo / BD : cases avec figures, légende du narrateur et bulles
    text = `<div class="bd">${r.cases.map((c: any) => `<div class="case">${c.erz ? `<div class="cap">${inl(c.erz)}</div>` : ''}<div class="figs">${[].concat(c.bild || []).map((b: string) => bild(b)).join('')}</div><div class="bl">${(c.blasen || []).map(([w, t]: [string, string]) => `<p><b>${esc(w)}</b>${inl(t)}</p>`).join('')}</div></div>`).join('')}</div>`
  } else if (r.art === 'theater') {
    // scène de théâtre : nom en capitales, didascalies en italique
    text = `<div class="theater">${r.personen ? `<p class="pers">${inl(r.personen)}</p>` : ''}${r.zeilen.map(([w, t, rg]: [string, string, string]) => w ? `<p><span class="wer">${esc(w)}</span>${rg ? `<i class="rg">(${inl(rg)})</i> ` : ''}${inl(t)}</p>` : `<p class="regie">${inl(t)}</p>`).join('')}</div>`
  } else if (r.art === 'erklaerung') {
    // Mathe: Einstieg, Begriff, Erklärschritte mit Beispiel
    text = `${r.einstieg ? `<p class="abs">${inl(r.einstieg)}</p>` : ''}${r.def ? `<div class="def"><b>${inl(r.def.begriff)}</b> ${inl(r.def.text)}</div>` : ''}<ol class="erkl">${r.schritte.map((s: any) => `<li><b>${inl(s.titel)}</b> ${inl(s.text)}${s.beispiel ? `<div class="bsp"><span>Beispiel</span>${inl(s.beispiel)}</div>` : ''}</li>`).join('')}</ol>${r.bild ? `<div class="erkl-bild">${r.bild}</div>` : ''}`
  } else if (r.art === 'gedicht') {
    // poème / chanson : strophes, refrain en retrait
    text = `<div class="gedicht ${r.spalten ? 'zwei' : ''}">${r.autor ? `<p class="autor">${inl(r.autor)}</p>` : ''}${r.strophen.map((s: any) => { const z = Array.isArray(s) ? s : s.zeilen; return `<div class="strophe ${s.refrain ? 'refrain' : ''}">${s.refrain ? `<span class="rmark">Refrain</span>` : ''}${z.map((x: string) => `<p>${inl(x)}</p>`).join('')}</div>` }).join('')}</div>`
  } else if (r.art === 'dokumente') {
    text = `<div class="dokumente">${r.dokumente.map((d: any) => `<div class="dok ${d.stil || 'karte'}">${d.kopf ? `<div class="dk">${inl(d.kopf)}</div>` : ''}${d.text.map((z: string) => `<p>${inl(z)}</p>`).join('')}${d.gruss ? `<p class="gruss">${inl(d.gruss)}</p>` : ''}</div>`).join('')}</div>`
  } else {
    text = r.absaetze.map((p: string, i: number) => `<p class="abs">${r.nummern === false ? '' : `<span class="n">${i + 1}</span>`}${inl(p)}</p>`).join('')
  }
  const woerter = r.woerter?.length ? `<div class="woerter"><h5>${k.sp === 'de' ? 'Wörter' : 'Mots'}</h5>${r.woerter.map(([a, b]: [string, string]) => `<div class="w"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join('')}</div>` : ''
  k.spuren.push({ code, art: 'lesen', lektion: k.nr, titel: r.titel, sprache: k.sp, stimme: r.stimme || 'w', teile: lesenSprechtext(r, k.sp) })
  let h = '<div class="zusammen">' + teilKopf('lesen', k.sp, r.was || '')
  if (r.plan) h += `<div class="plan-gross">${plan(r.plan)}</div></div><div>`
  if (r.stadtplan) h += `<div class="plan-gross">${stadtplan(r.stadtplan)}</div></div><div>`
  h += `<div class="lesetext"><div class="blatt">${r.quelle ? `<div class="quelle">${esc(r.quelle)}</div>` : ''}<h4>${inl(r.titel)}</h4>${text}</div><div class="rand">${audioKarte(code, 'lesen', r.karte?.titel || (k.sp === 'de' ? 'Text anhören' : 'Écouter le texte'), r.karte?.unter || (k.sp === 'de' ? 'Hör zu und lies mit.' : 'Écoute et lis en même temps.'), true)}${woerter}</div></div></div>`
  for (const a of r.aufgaben || []) h += aufgabe(a, ++k.zaehler, 'in-lesen')
  return h
}
function lesenSprechtext(r: any, sp = 'de'): { wer: string; text: string }[] {
  const t: { wer: string; text: string }[] = [{ wer: '', text: roh(r.titel) }]
  if (r.art === 'profile') for (const p of r.profile) t.push({ wer: p.stimme || '', text: roh(p.name) + '. ' + roh(p.text) })
  else if (r.art === 'chat') for (const [wer, x] of r.nachrichten) t.push({ wer: r.stimmen?.[wer] || '', text: roh(x) })
  else if (r.art === 'bd') for (const c of r.cases) { if (c.erz) t.push({ wer: r.erzaehler || '', text: roh(c.erz) }); for (const [w, x] of c.blasen || []) t.push({ wer: r.stimmen?.[w] || '', text: roh(x) }) }
  else if (r.art === 'theater') for (const [w, x] of r.zeilen) { if (w) t.push({ wer: r.stimmen?.[w] || '', text: roh(x) }); else if (r.erzaehler) t.push({ wer: r.erzaehler, text: roh(x) }) }
  else if (r.art === 'erklaerung') { if (r.einstieg) t.push({ wer: '', text: roh(r.einstieg) }); if (r.def) t.push({ wer: '', text: roh(r.def.begriff).replace(/[.:]?$/, '. ') + roh(r.def.text) }); r.schritte.forEach((s: any, i: number) => t.push({ wer: '', text: `${i + 1}. ${roh(s.titel).replace(/[.:]?$/, '.')} ${roh(s.text)}${s.beispiel ? ' Beispiel: ' + roh(s.beispiel) : ''}` })) }
  else if (r.art === 'gedicht') for (const s of r.strophen) { const z: string[] = Array.isArray(s) ? s : s.zeilen; t.push({ wer: '', text: z.map((x) => roh(x).trim()).map((x) => (/[.!?,;:…»]$/.test(x) ? x : x + ',')).join(' ').replace(/,$/, '.') }) }
  else if (r.art === 'anleitung') { t.push({ wer: '', text: (r.materialSprech || (sp === 'fr' ? 'Il te faut : ' : 'Du brauchst: ')) + r.material.map(roh).join(', ') + '.' }); r.schritte.forEach((x: any, i: number) => t.push({ wer: '', text: `${sp === 'fr' ? 'Étape' : 'Schritt'} ${i + 1}: ${roh(x.text)}` })); for (const p of r.danach || []) t.push({ wer: '', text: roh(p) }) }
  else if (r.art === 'dokumente') for (const d of r.dokumente) t.push({ wer: d.stimme || '', text: [d.kopf, ...d.text, d.gruss].filter(Boolean).map((z: string) => roh(z).trim()).map((z: string) => (/[.!?:,…“”"]$/.test(z) ? z : z + '.')).join(' ') })
  else for (const p of r.absaetze) t.push({ wer: '', text: roh(p) })
  return t
}

function hoerenTeil(L: any, k: Kontext): string {
  const r = L.hoeren, code = `${k.modul.kuerzel}-${String(k.nr).padStart(2, '0')}h`
  k.spuren.push({ code, art: 'hoeren', lektion: k.nr, titel: r.titel, sprache: k.sp, sprecher: r.sprecher, teile: r.text.map(([wer, t]: [string, string]) => ({ wer, text: t })) })
  let h = (r.neueSeite ? '<div class="neue-seite"></div>' : '') + '<div class="zusammen">' + teilKopf('hoeren', k.sp, r.was || '')
  h += `<div class="hoerkarte"><div class="szene"><div class="wo">${esc(r.wo || '')}</div><h4>${inl(r.titel)}</h4><p>${inl(r.situation)}</p>${r.bild ? `<div class="bild">${r.bild.map(bild).join('')}</div>` : ''}</div>${audioKarte(code, 'hoeren', k.sp === 'de' ? 'Scanne den Code' : 'Scanne le code', k.sp === 'de' ? (r.wieOft || 'Du hörst den Text zweimal.') : (r.wieOft || 'Tu écoutes deux fois.'))}</div></div>`
  const schritte: [string, string][] = k.sp === 'de' ? [['vor', 'Vor dem Hören'], ['beim', 'Beim Hören'], ['nach', 'Nach dem Hören']] : [['vor', 'Avant l’écoute'], ['beim', 'Pendant l’écoute'], ['nach', 'Après l’écoute']]
  for (const [s, name] of schritte) {
    if (!r[s]?.length) continue
    r[s].forEach((a: any, i: number) => { h += (i === 0 ? `<div class="zusammen"><div class="schritt">${name}</div>` : '') + aufgabe(a, ++k.zaehler, a.art === 'sprechen' ? 'in-sprechen' : 'in-hoeren') + (i === 0 ? '</div>' : '') })
  }
  h += `<div class="transkript nur-loesung"><h5>${k.sp === 'de' ? 'Hörtext' : 'Transcription'} ${esc(code)}</h5><div class="dialog">${r.text.map(([wer, t]: [string, string]) => `<span class="wer">${esc(wer)}</span><span>${esc(t)}</span>`).join('')}</div></div>`
  return h
}

function regelTeil(L: any, k: Kontext): string {
  const r = L.regel
  let h = '<div class="zusammen">' + teilKopf('regel', k.sp, r.was || '')
  const ic: Record<string, string> = { merke: 'bulb', achtung: 'alert-triangle', tipp: 'sparkles', beispiel: 'pencil' }
  const liste = (x: any) => { const t = x.nummern ? 'ol' : 'ul'; return `<${t}${x.nummern ? ' class="nummern"' : ''}>${x.punkte.map((p: string) => `<li>${inl(p)}</li>`).join('')}</${t}>` }
  const kasten = (x: any) => `<div class="merke ${x.art || ''}"><h4>${icon(ic[x.art || 'merke'])}${inl(x.titel)}</h4>${x.vor ? `<p class="vor">${inl(x.vor)}</p>` : ''}${x.punkte ? liste(x) : ''}${
    x.tabelle ? `<table class="formen"><tr>${x.tabelle.kopf.map((c: string) => `<th>${esc(c)}</th>`).join('')}</tr>${x.tabelle.zeilen.map((z: string[]) => `<tr>${z.map((c) => `<td>${inl(c)}</td>`).join('')}</tr>`).join('')}</table>` : ''}${x.text ? `<p style="margin-top:2mm">${inl(x.text)}</p>` : ''}</div>`
  r.reihen.forEach((reihe: any[], i: number) => { h += `<div class="regelkasten ${reihe.length === 1 ? 'eins' : ''}">${reihe.map(kasten).join('')}</div>` + (i === 0 ? '</div>' : '') })
  return h
}

function checkTeil(L: any, k: Kontext): string {
  const smile = (n: string) => icon(n)
  const kopf = k.sp === 'de' ? ['Das kann ich …', 'sicher', 'geht so', 'noch nicht'] : ['Je sais …', 'sûr', 'à peu près', 'pas encore']
  return '<div class="zusammen">' + teilKopf('check', k.sp) + `<div class="check"><div class="z kopf"><div style="text-align:left;padding-left:4mm">${kopf[0]}</div><div>${kopf[1]}</div><div>${kopf[2]}</div><div>${kopf[3]}</div></div>${L.check
    .map((c: string) => `<div class="z"><div>${inl(c)}</div><div class="s" style="color:#2f8a4c">${smile('mood-happy')}</div><div class="s" style="color:#c98a06">${smile('mood-empty')}</div><div class="s" style="color:#d0577b">${smile('mood-sad')}</div></div>`)
    .join('')}</div></div>`
}

function lektion(L: any, k: Kontext): string {
  const m = k.modul, sp = k.sp
  let h = `<section class="lektion" id="l${k.nr}"><span class="marke-seite">§§L${k.nr}§§</span>`
  h += `<div class="seitenkopf"><span class="marke">${sp === 'de' ? 'Lektion' : 'Leçon'} ${k.nr}</span><span>${esc(m.fach[sp])} · ${sp === 'de' ? 'Modul' : 'Module'} ${m.nr} · ${esc(m.titel[sp])}</span></div>`
  h += `<div class="auftakt"><div class="gross">${k.nr}</div><div class="text"><div class="nr">${sp === 'de' ? 'Lektion' : 'Leçon'} ${k.nr} · ${esc(L.thema)}</div><h2>${inl(L.titel)}</h2><div class="unter">${inl(L.untertitel)}</div><div class="ziel"><b>${sp === 'de' ? 'Mein Ziel:' : 'Mon but :'}</b><span>${inl(L.ziel[sp])}<span class="fr">${inl(L.ziel[sp === 'de' ? 'fr' : 'de'])}</span></span></div></div>${
    L.bild ? `<div class="bild">${L.bild.map(bild).join('')}</div>` : ''}</div>`
  const block = (kopf: string, liste: any[], klasse?: string) => liste.map((a: any, i: number) => (i === 0 ? '<div class="zusammen">' + kopf : '') + aufgabe(a, ++k.zaehler, klasse) + (i === 0 ? '</div>' : '')).join('')
  if (L.start) h += block(teilKopf('start', sp, L.start.was || ''), L.start.aufgaben)
  if (L.lesen) h += lesenTeil(L, k)
  if (L.hoeren) h += hoerenTeil(L, k)
  if (L.regel) h += (L.regel.neueSeite ? '<div class="neue-seite"></div>' : '') + regelTeil(L, k)
  if (L.ueben?.length) h += block(teilKopf('ueben', sp), L.ueben)
  if (L.sprechen?.length) h += block(teilKopf('sprechen', sp), L.sprechen, 'in-sprechen')
  const zusammenEnde = m.checkMitSchreiben && L.schreiben?.length && L.check?.length
  if (zusammenEnde) h += '<div class="zusammen">'
  if (L.schreiben?.length) h += (L.schreibenNeueSeite ? '<div class="neue-seite"></div>' : '') + block(teilKopf('schreiben', sp), L.schreiben, 'in-schreiben')
  if (L.check?.length) h += checkTeil(L, k)
  if (zusammenEnde) h += '</div>'
  return h + '</section>'
}

// ---------------------------------------------------------------- Deckblatt, Inhalt, Anhang
function deckblatt(m: any, sp: string, loesungen: boolean, L: any[]): string {
  const figuren = (m.deckbild || ['sami:froh:stehen', 'lina:froh:stehen', 'noah:froh:stehen']).map(bild).join('')
  const blasen = (m.blasen || []).map((b: any) => `<div class="blase" style="left:${b.x}mm;top:${b.y}mm">${esc(b.t)}</div>`).join('')
  const medien = m.medien || (sp === 'de'
    ? [['book', 'var(--lesen)', 'Lesen', 'Texte aus dem Alltag'], ['headphones', 'var(--hoeren)', 'Hören', 'QR-Code scannen'], ['bulb', 'var(--regel)', 'Regeln', 'kurz und klar'], ['writing', 'var(--schreiben)', 'Schreiben', 'mit viel Platz']]
    : [['book', 'var(--lesen)', 'Lire', 'des textes du quotidien'], ['headphones', 'var(--hoeren)', 'Écouter', 'scanner le code QR'], ['bulb', 'var(--regel)', 'Règles', 'courtes et claires'], ['writing', 'var(--schreiben)', 'Écrire', 'avec beaucoup de place']])
  return `<section class="deckblatt"><svg class="muster" width="210mm" height="210mm" viewBox="0 0 210 210">${Array.from({ length: 14 }, (_, i) => `<circle cx="${(i * 37) % 210}" cy="${(i * 53) % 190}" r="${8 + (i % 4) * 6}" fill="none" stroke="#fff" stroke-width="1.4"/>`).join('')}</svg>
  <div class="oben"><div class="fachzeile">${esc(m.fach[sp])} · ${esc(m.klasse)} · ${m.niveau}${loesungen ? ` · <span style="background:#fff;color:var(--f);padding:0.6mm 2mm;border-radius:1mm">${sp === 'de' ? 'Lösungen' : 'Solutions'}</span>` : ''}</div><h1>${sp === 'de' ? 'Modul' : 'Module'} ${m.nr}</h1><div class="titel">${esc(m.titel[sp])}</div><div class="unter">${esc(m.untertitel[sp])}</div></div>
  <div class="figuren">${figuren}</div>${blasen}
  <div class="unten"><h3>${sp === 'de' ? 'So lernst du mit diesem Heft' : 'Comment apprendre avec ce cahier'}</h3><div class="medien">${medien.map(([i, f, t, s]) => `<div class="medium"><span class="ic" style="background:${f}">${icon(i)}</span><b>${t}</b>${s}</div>`).join('')}</div>
  <div class="name"><div>${sp === 'de' ? 'Name' : 'Nom'}</div><div>${sp === 'de' ? 'Klasse' : 'Classe'}</div><div>${sp === 'de' ? 'Schuljahr' : 'Année scolaire'}</div></div></div></section>`
}

function inhalt(m: any, sp: string, L: any[], seiten: Record<string, number>): string {
  let h = `<section class="inhalt"><div class="seitenkopf"><span class="marke">${sp === 'de' ? 'Modul' : 'Module'} ${m.nr}</span><span>${esc(m.fach[sp])} · ${esc(m.titel[sp])}</span></div><h2>${sp === 'de' ? 'Inhalt' : 'Sommaire'}</h2>`
  let i = 0
  for (const t of m.themen) {
    h += `<div class="thema">${icon(t.icon || 'bookmark')}${esc(t.titel[sp])}</div>`
    for (let j = 0; j < t.lektionen; j++) {
      const l = L[i++], nr = i
      const med = [l.lesen && ['book', 'var(--lesen)'], l.hoeren && ['headphones', 'var(--hoeren)'], l.schreiben && ['writing', 'var(--schreiben)']].filter(Boolean) as string[][]
      h += `<div class="zeile"><span class="nr">${nr}</span><span><span class="t">${inl(l.titel)}</span><span class="medien">${med.map(([ic, f]) => `<span style="background:${f}">${icon(ic)}</span>`).join('')}</span><span class="z">${inl(l.ziel[sp === 'de' ? 'de' : 'fr'])}</span></span><span class="s">${seiten['L' + nr] || ''}</span></div>`
    }
  }
  h += `<div class="zeile" style="margin-top:2mm"><span class="nr" style="background:var(--leise)">A</span><span><span class="t">${sp === 'de' ? 'Wörterliste Deutsch – Französisch' : 'Liste de mots'}</span></span><span class="s">${seiten.A || ''}</span></div>`
  h += `<div class="zeile"><span class="nr" style="background:var(--leise)">B</span><span><span class="t">${sp === 'de' ? 'Mein Lernstand' : 'Où j’en suis'}</span></span><span class="s">${seiten.B || ''}</span></div>`
  h += `<div class="anleitung"><h3>${sp === 'de' ? 'So arbeitest du mit dem Heft' : 'Comment travailler avec ce cahier'}</h3><ul>${(m.anleitung || []).map((x: string) => `<li>${inl(x)}</li>`).join('')}</ul></div></section>`
  return h
}

function anhang(m: any, sp: string, L: any[]): string {
  let h = `<section class="anhang lektion"><span class="marke-seite">§§A§§</span><div class="seitenkopf"><span class="marke">${sp === 'de' ? 'Anhang' : 'Annexe'} A</span><span>${esc(m.fach[sp])} · ${sp === 'de' ? 'Modul' : 'Module'} ${m.nr}</span></div><h2>${sp === 'de' ? 'Wörterliste' : 'Liste de mots'}</h2><p class="klein" style="margin-bottom:4mm">${sp === 'de' ? 'Alle neuen Wörter aus den Lesetexten, nach Lektionen. Decke eine Spalte ab und teste dich selbst.' : 'Tous les mots nouveaux, par leçon. Cache une colonne et teste-toi.'}</p><div class="zweispaltig"><table class="wortliste">`
  L.forEach((l, i) => {
    const w = [...(l.lesen?.woerter || []), ...(l.wortschatz || [])]
    if (!w.length) return
    h += `<tr class="th"><td colspan="2">${i + 1} · ${inl(l.titel)}</td></tr>` + w.map(([a, b]: [string, string]) => `<tr><td>${esc(a)}</td><td class="fr">${esc(b)}</td></tr>`).join('')
  })
  h += '</table></div></section>'
  h += `<section class="anhang lektion"><span class="marke-seite">§§B§§</span><div class="seitenkopf"><span class="marke">${sp === 'de' ? 'Anhang' : 'Annexe'} B</span><span>${esc(m.fach[sp])} · ${sp === 'de' ? 'Modul' : 'Module'} ${m.nr}</span></div><h2>${sp === 'de' ? 'Mein Lernstand' : 'Où j’en suis'}</h2><p class="klein" style="margin-bottom:4mm">${sp === 'de' ? 'Male am Ende jeder Lektion aus: grün = sicher, gelb = geht so, rot = noch nicht. Was rot ist, übst du noch einmal.' : 'Colorie à la fin de chaque leçon : vert = sûr, jaune = à peu près, rouge = pas encore.'}</p>`
  L.forEach((l, i) => { h += `<div style="margin:3mm 0 1.5mm;font-family:Lexend;font-weight:700;color:var(--f)">${i + 1} · ${inl(l.titel)}</div>` + `<div class="check">${(l.check || []).map((c: string) => `<div class="z" style="grid-template-columns:1fr 12mm 12mm 12mm"><div style="font-size:11pt;padding:1.6mm 3mm">${inl(c)}</div><div class="s"><span class="kaestchen" style="border-color:#2f8a4c"></span></div><div class="s"><span class="kaestchen" style="border-color:#c98a06"></span></div><div class="s"><span class="kaestchen" style="border-color:#d0577b"></span></div></div>`).join('')}</div>` })
  h += `<p class="klein" style="margin-top:8mm">${esc(URHEBER[sp as 'de' | 'fr'] || '')} · ${sp === 'de' ? 'Alle Texte und Aufgaben sind selbst geschrieben; Personen sind ausgedacht. Stimmen der Hörtexte: Piper (Thorsten, Kerstin – CC0; MLS – CC BY 4.0; SIWIS – CC BY 4.0; UPMC – CC BY-SA 4.0). Schrift: Atkinson Hyperlegible, Lexend (SIL OFL). Figuren: Open Peeps (CC0). Piktogramme: Tabler Icons (MIT).' : 'Textes et exercices originaux ; personnages inventés. Voix : Piper (CC0 / CC BY 4.0 / CC BY-SA 4.0). Polices : Atkinson Hyperlegible, Lexend (SIL OFL). Figures : Open Peeps (CC0). Pictogrammes : Tabler Icons (MIT).'}</p></section>`
  return h
}

// ---------------------------------------------------------------- Bauen
function html(m: any, L: any[], loesungen: boolean, seiten: Record<string, number>, spuren: any[]): string {
  const sp = m.sprache
  AKTIV = m
  const css = readFileSync(join(HIER, 'stil.css'), 'utf8').replace(/FONTS_PDF\//g, pathToFileURL(join(ROOT, 'src/assets/fonts/pdf')).href + '/').replace(/FONTS\//g, pathToFileURL(join(ROOT, 'src/assets/fonts/heft')).href + '/')
  const f = m.farben
  const fuss = `${m.fach[sp]} · ${sp === 'de' ? 'Modul' : 'Module'} ${m.nr} · ${m.titel[sp]}${loesungen ? (sp === 'de' ? ' · Lösungen' : ' · Solutions') : ''}`
  const seitenCss = `@page { @bottom-left { content: "${fuss.replace(/"/g, '')}"; font-family: Lexend, Atkinson, sans-serif; font-size: 8pt; color: #8a93a3; } @bottom-right { content: counter(page); font-family: Lexend; font-weight: 700; font-size: 9.5pt; color: ${f.tief}; } }`
  let body = deckblatt(m, sp, loesungen, L) + inhalt(m, sp, L, seiten)
  L.forEach((l, i) => { body += lektion(l, { modul: m, sp, nr: i + 1, zaehler: 0, spuren }) })
  body += anhang(m, sp, L)
  // französische Typografie: geschütztes Leerzeichen vor ! ? ; : » und nach «, damit nichts allein umbricht
  if (sp === 'fr') body = body.replace(/>([^<]+)</g, (_: string, t: string) => '>' + t.replace(/ ([!?;:»])/g, '\u00a0$1').replace(/« /g, '«\u00a0') + '<')
  return `<!doctype html><html lang="${sp}"><head><meta charset="utf-8"><title>${esc(m.fach[sp])} ${sp === 'de' ? 'Modul' : 'Module'} ${m.nr}</title><style>${css}
:root { --f: ${f.tief}; --f-mittel: ${f.mittel}; --f-zart: ${f.zart}; --f-tief: ${f.dunkel}; }
${seitenCss}</style></head><body class="${loesungen ? 'loesungen' : ''}">${body}</body></html>`
}

function seitenFinden(pdf: string): Record<string, number> {
  const out = execFileSync('python3', ['-I', '-c', `import pymupdf,sys,json,re
d=pymupdf.open(sys.argv[1]); r={}
for i,p in enumerate(d):
  for m in re.findall(r'§§([A-Z0-9]+)§§', p.get_text()):
    r.setdefault(m, i+1)
print(json.dumps(r))`, pdf]).toString()
  return JSON.parse(out)
}

async function baue(id: string, browser: any, png: boolean) {
  const { MODUL, LEKTIONEN } = await import(pathToFileURL(join(HIER, 'inhalt', id + '.mjs')).href)
  FARBEN = { tief: MODUL.farben.tief, mittel: MODUL.farben.mittel, zart: MODUL.farben.zart }
  const ziel = join(ROOT, 'tmp/hefte', id); mkdirSync(ziel, { recursive: true })
  const seite = await browser.newPage()
  for (const loesungen of [false, true]) {
    const name = `${MODUL.dateiname}_${loesungen ? (MODUL.sprache === 'de' ? 'Loesungen' : 'Solutions') : (MODUL.sprache === 'de' ? 'Heft' : 'Cahier')}`
    let seiten: Record<string, number> = {}
    for (let durchlauf = 0; durchlauf < 2; durchlauf++) {
      const spuren: any[] = []
      const h = html(MODUL, LEKTIONEN, loesungen, seiten, spuren)
      const hdatei = join(ziel, name + '.html'); writeFileSync(hdatei, h)
      await seite.goto(pathToFileURL(hdatei).href, { waitUntil: 'load' })
      await seite.evaluate(() => (document as any).fonts.ready)
      // Prüfen: Nichts darf breiter sein als der Satzspiegel – sonst verkleinert Chromium das ganze Heft.
      await seite.emulateMedia({ media: 'print' }); await seite.setViewportSize({ width: 680, height: 1000 })
      const zuBreit = await seite.evaluate(() => { const W = document.body.getBoundingClientRect().width, out: string[] = []
        for (const e of Array.from(document.querySelectorAll('body *'))) { const q = e.getBoundingClientRect(); if (q.width && q.right > W + 1 && !e.closest('.deckblatt')) out.push(`${e.tagName}.${typeof (e as HTMLElement).className === 'string' ? (e as HTMLElement).className : ''} (${Math.round(q.right - W)} px): ${(e.textContent || (e.closest('section') ? 'in ' + e.closest('section')!.id : '')).slice(0, 50)}`) }
        return out })
      if (zuBreit.length) { console.error(`✗ ${name}: ${zuBreit.length} Elemente zu breit – das Heft würde verkleinert:`); zuBreit.slice(0, 8).forEach((z: string) => console.error('   ' + z)); process.exitCode = 1 }
      const pdf = join(ziel, name + '.pdf')
      await seite.pdf({ path: pdf, format: 'A4', printBackground: true, preferCSSPageSize: true })
      if (durchlauf === 0) seiten = seitenFinden(pdf)
      else {
        if (!loesungen) writeFileSync(join(ziel, 'spuren.json'), JSON.stringify({ modul: MODUL.kuerzel, titel: MODUL.titel, sprache: MODUL.sprache, aussprache: MODUL.aussprache || {}, spuren }, null, 1))
        const n = execFileSync('python3', ['-I', '-c', 'import pymupdf,sys;print(len(pymupdf.open(sys.argv[1])))', pdf]).toString().trim()
        console.log(`✓ ${pdf} (${n} Seiten)`)
        if (png) execFileSync('python3', ['-I', '-c', `import pymupdf,sys
d=pymupdf.open(sys.argv[1])
for i,p in enumerate(d): p.get_pixmap(dpi=int(sys.argv[2])).save(sys.argv[1][:-4]+'-%02d.png'%(i+1))`, pdf, '70'])
      }
    }
  }
  await seite.close()
}

const args = process.argv.slice(2)
const ids = args.filter((a) => !a.startsWith('--'))
if (!ids.length) { console.error('Aufruf: heft.tsx <modul-id> …  (z. B. deutsch-m1)'); process.exit(1) }
const browser = await chromium.launch()
try { for (const id of ids) { if (!existsSync(join(HIER, 'inhalt', id + '.mjs'))) throw new Error('Fehlt: inhalt/' + id + '.mjs'); await baue(id, browser, args.includes('--png')) } }
finally { await browser.close() }

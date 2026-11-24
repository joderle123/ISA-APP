// REAL TALK – eine Einheit als zusammenhängende Stunde (seit 16.11.2026).
// Statt einer immer gleichen Doppelseite: Stationen in der Reihenfolge des Unterrichts, mit Fahrplan auf der ersten Seite,
// einem Streifen „wo sind wir?“ auf jeder weiteren und allem Material (Karten) im Heft. Inhalt: Track.stunde (typen.ts).
import type { Baustein, Frage, Station, Track } from './typen'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Gefühls-Gesichter (Fluent Emoji, MIT) – nur auf Wort-Karten mit einem Gefühlswort (Auftrag 22.11.2026)
const EMO_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'tools', 'hefte', 'emoji')
const EMO: Record<string, string> = JSON.parse(readFileSync(join(EMO_DIR, 'gefuehle.json'), 'utf8'))
const emoji = (wort: string): string => {
  const n = EMO[wort.trim().toLowerCase()]
  return n && !wort.startsWith('_') ? `<img class="emo" alt="" src="data:image/svg+xml;base64,${readFileSync(join(EMO_DIR, n + '.svg')).toString('base64')}">` : ''
}

export interface StundenHelfer {
  t: (s: string) => string
  esc: (s: string) => string
  figur: (id: string) => string
  ic: (name: string) => string
  qr: (url: string) => string
  kurzlink: (url: string) => string
  linien: (n: number) => string
  frage: (f: Frage, i: number) => string
}

/** Stationen einer Stunde in Reihenfolge (ohne Fortsetzungen) – für Fahrplan, Streifen und die Seiten der Leitung */
export function stationen(e: Track): { nr: number; s: Station; seite: number }[] {
  const l: { nr: number; s: Station; seite: number }[] = []
  e.stunde?.seiten.forEach((p, k) => p.stationen.forEach((s) => { if (!s.fort) l.push({ nr: l.length + 1, s, seite: k }) }))
  return l
}

/** kurzer Name einer Station für Fahrplan und Streifen: der Teil vor dem Doppelpunkt */
export const kurzName = (s: Station) => s.titel.split(':')[0].trim()

export function baueStunde(e: Track, i: number, h: StundenHelfer): string[] {
  const { t, esc, figur, ic, qr, kurzlink, linien, frage } = h
  const st = e.stunde!
  const z2 = (n: number) => String(n).padStart(2, '0')
  const alle = stationen(e)
  /** Fragen einer Station laufen durch (1, 2, 3 …), auch über mehrere Bausteine */
  let fn = 0
  const fragen = (l?: Frage[]) => (l && l.length ? `<div class="sd-fr">${l.map((f) => frage(f, fn++)).join('')}</div>` : '')

  const baustein = (b: Baustein): string => {
    switch (b.art) {
      case 'text':
        return `<div class="sd-tx">${b.x.map((x) => `<p>${t(x)}</p>`).join('')}</div>`
      case 'fall':
        return `<div class="bx p szene sd-fall"><div class="wer"><div class="pk punkt"></div><div class="fig">${figur(b.bild)}</div><div class="nm mo">${esc(b.name)}</div></div>
          <div class="tx"><p>${t(b.text)}</p>${b.zeitleiste ? `<div class="sd-zl">${b.zeitleiste.map((z) => `<span class="mo">${esc(z[0])}</span><span>${t(z[1])}</span>`).join('')}</div>` : ''}</div></div>${fragen(b.fragen)}`
      case 'chat':
        return `<div class="sd-chat${b.zeilen.some((z) => z.zeit) ? '' : ' ohne'}">${b.titel ? `<div class="kp mo">${ic('message-circle')}${esc(b.titel)}</div>` : ''}${b.zeilen.map((z) => `<div class="z ${z.art ?? 'sagt'}">${z.zeit ? `<span class="mo u">${esc(z.zeit)}</span>` : '<span></span>'}<b>${esc(z.wer)}</b><span class="x">${t(z.x)}</span></div>`).join('')}</div>${fragen(b.fragen)}`
      case 'akte':
        return `<div class="sd-akte"><div class="blatt"><div class="kp"><span class="mo">${esc(b.titel)}</span><b>${t(b.kopf)}</b></div><ul>${b.eintraege.map((x) => `<li>${t(x)}</li>`).join('')}</ul><div class="stempel an">${esc(b.stempel)}</div></div>
          <div class="daneben"><div class="mo">${esc(b.daneben.titel)}</div><ul>${b.daneben.punkte.map((x) => `<li><span>${t(x)}</span></li>`).join('')}</ul></div></div>${fragen(b.fragen)}`
      case 'modell': {
        // Tankanzeige zum Ausmalen: fünf Felder von leer (unten) bis voll (oben)
        const anz = b.anzeige ? `<div class="anz"><span class="mo">${esc(b.anzeige)}</span><div>${'<i></i>'.repeat(5)}</div><span class="mo">leer</span></div>` : ''
        return `<div class="sd-modell${b.anzeige ? ' mit-anz' : ''}">${b.punkte.map((p, k) => `<div>${anz}<div class="tx"><div class="o"><span class="z">${k + 1}</span>${ic(p.icon)}<h3>${t(p.t)}</h3></div><p>${t(p.x)}</p>${p.warn || p.luecke ? `<p class="w"><b class="mo">${esc(b.warnTitel ?? 'Warnlicht')}</b>${p.warn ? t(p.warn) : ''}${p.luecke ? '<span class="lu"></span>' : ''}</p>` : ''}${b.beweis ? `<p class="bw"><b class="mo">${esc(b.beweis)}</b><span class="lu"></span></p>` : ''}</div></div>`).join('')}</div>`
      }
      case 'spuren':
        return `<div class="sd-spuren">${b.spuren.map((s) => `<div><div class="kp"><span class="k">${esc(s.k)}</span>${ic(s.icon)}<span class="mo">${esc(s.quelle)}</span></div><p>${t(s.x)}</p></div>`).join('')}</div>${fragen(b.fragen)}`
      case 'clip':
        return `<div class="sd-clip"><div class="clip"><div class="qr">${qr(b.clip.url)}</div><div class="tx"><div class="lab mo">${ic('player-play')}Clip · ${esc(b.clip.dauer)}</div><h3>${t(b.clip.titel)}</h3><div class="ka mo">${esc(b.clip.kanal)} · ${esc(kurzlink(b.clip.url))}</div><div class="fr2">${t(b.clip.frage)}</div></div></div>
          <div class="drei"><div><div class="lab mo">${ic('eye')}Vorher</div>${b.vorher.map(frage).join('')}</div>
            <div><div class="lab mo">${ic('pencil')}Beim Schauen</div><p class="k">Schreib mit – Stichwörter reichen:</p>${b.dabei.map((x) => `<div class="satz"><span>${t(x)}</span></div>${linien(1)}`).join('')}</div>
            <div><div class="lab mo">${ic('message-circle')}Danach</div>${b.nachher.map(frage).join('')}</div></div></div>`
      case 'fragen':
        return `${b.kontext ? `<p class="sd-kon">${t(b.kontext)}</p>` : ''}${fragen(b.fragen)}`
      case 'aktion':
        return `<div class="sd-akt"><div class="ziel"><span class="mo">Ziel</span><span>${t(b.ziel)}</span></div><div class="ziel"><span class="mo">Material</span><span>${t(b.material)}</span></div>
          <ol>${b.schritte.map((x) => `<li><span>${t(x)}</span></li>`).join('')}</ol>
          ${b.runden ? `<div class="runden">${b.runden.map((r) => `<div><b class="mo">${esc(r.t)}</b><span>${t(r.x)}</span></div>`).join('')}</div>` : ''}
          ${b.regeln ? `<div class="regeln">${b.regeln.map((x) => `<div>${ic('shield-check')}<span>${t(x)}</span></div>`).join('')}</div>` : ''}
          ${b.zu3 ? `<p class="z3"><b class="mo">Zu dritt</b> ${t(b.zu3)}</p>` : ''}
          ${b.wertung ? `<table class="sd-tab wert"><tr>${b.wertung.kopf.map((x) => `<th>${t(x)}</th>`).join('')}</tr>${b.wertung.zeilen.map((z) => `<tr><td>${t(z)}</td>${b.wertung!.kopf.slice(1).map(() => '<td></td>').join('')}</tr>`).join('')}</table>` : ''}
          ${b.notiz ? `<div class="not"><b>${t(b.notiz.titel)}</b>${linien(b.notiz.linien)}</div>` : ''}
          ${b.auswertung ? `<div class="aus"><div class="mo">${ic('messages')}Auswertung im Kreis</div>${b.auswertung.map((x) => `<p>${t(x)}</p>`).join('')}</div>` : ''}</div>`
      case 'karten':
        return `${b.hinweis ? `<p class="sd-kon sch">${ic('scissors')}<span>${t(b.hinweis)}</span></p>` : ''}<div class="sd-karten" style="grid-template-columns:repeat(${b.spalten},1fr)${b.hoehe ? `;--kh:${b.hoehe}mm` : ''}">${b.karten.map((k) => `<div class="${b.wort ? 'wort' : ''}">${b.wort ? emoji(k.t) : ''}<b>${t(k.t)}</b>${k.x ? `<span>${t(k.x)}</span>` : ''}${k.marke ? `<i class="mo">${esc(k.marke)}</i>` : ''}</div>`).join('')}</div>`
      case 'tabelle':
        return `<table class="sd-tab"${b.breiten ? ` style="--br:${b.breiten}"` : ''}>${b.breiten ? `<colgroup>${b.breiten.split(' ').map((w) => `<col style="width:${w}">`).join('')}</colgroup>` : ''}<tr>${b.kopf.map((x) => `<th>${t(x)}</th>`).join('')}</tr>${b.zeilen.map((z) => `<tr${b.hoehe ? ` style="height:${b.hoehe}mm"` : ''}>${z.map((x) => `<td>${t(x)}</td>`).join('')}</tr>`).join('')}</table>`
      case 'menue':
        return `<div class="sd-menue"><div class="mo kp">${ic('gas-station')}${esc(b.titel)}</div><div class="g">${b.gruppen.map((g) => `<div><b>${t(g.t)}</b>${g.punkte.map((x) => `<span><i></i>${t(x)}</span>`).join('')}</div>`).join('')}</div></div>`
      case 'reden':
        return `<div class="sd-reden"><div class="kp mo">${ic('messages')}${esc(b.titel ?? 'Redet darüber')}</div>${b.x.map((x) => `<p>${t(x)}</p>`).join('')}</div>`
      case 'merk':
        return `<div class="merk"><span class="mo">Merk dir</span><div class="mk">${t(b.x)}</div></div>`
      case 'woche':
        return `<div class="wo sd-wo"><span class="mo">Diese Woche</span><span>${t(b.x)}</span>${b.kaestchen ? `<span class="wk2">${b.kaestchen.map((k) => `<span><i></i><b class="mo">${esc(k)}</b></span>`).join('')}</span>` : ''}</div>`
    }
  }

  let lauf = 0
  const station = (s: Station): string => {
    if (!s.fort) lauf++
    fn = 0
    // Material gehört zur großen Runde: die Nummer wird hier ausgerechnet, nicht von Hand gepflegt
    const runde = alle.find((x) => /^Die große Runde/.test(x.s.titel))
    const wie = s.fort && /^Material/.test(s.titel) && runde ? s.wie.replace(/zu Station \d+/, `zu Station ${runde.nr}`) : s.wie
    return `<div class="sd-st${s.fort ? ' fort' : ''}"><div class="kp"><div class="b">${s.fort ? ic(s.icon) : lauf}</div><h3>${t(s.titel)}</h3><div class="me mo"><span>${ic(s.fort ? 'paperclip' : s.icon)}${esc(wie)}</span>${s.zeit ? `<span>${esc(s.zeit)}</span>` : ''}</div></div><div class="kb">${s.bausteine.map(baustein).join('')}</div></div>`
  }
  /** Streifen: alle Stationen der Stunde, die dieser Seite hervorgehoben */
  const streifen = (seite: number) => `<div class="sd-weg">${alle.map((x) => `<span class="${x.seite === seite ? 'da' : x.seite < seite ? 'war' : ''}"><i>${x.nr}</i>${esc(kurzName(x.s))}</span>`).join('')}</div>`

  return st.seiten.map((p, k) => {
    const kopf = k === 0
      ? `<div class="th sd-th"><div class="znr">${z2(i + 1)}</div><div class="lab mo">Stunde ${z2(i + 1)} · ${esc(st.dauer)}</div><h1 class="an${e.titel.length > 15 ? ' kl' : ''}">${t(e.titel)}</h1><div class="ut">${t(st.frage)}</div></div>
         <div class="sd-plan"><div class="kann"><span class="mo">Am Ende kannst du</span>${st.kannst.map((x) => `<span>${ic('check')}${t(x)}</span>`).join('')}</div>
           <div class="weg">${alle.map((x) => `<div><i>${x.nr}</i><b>${esc(kurzName(x.s))}</b><span class="mo">${esc(x.s.zeit)}</span></div>`).join('')}</div></div>`
      : `<div class="sd-kopf"><div><span class="mo">Stunde ${z2(i + 1)}</span><b class="an">${t(e.titel)}</b></div>${streifen(k)}</div>`
    return `<div>${kopf}<div class="inhalt sd${k === 0 ? ' eins' : ''}">${p.stationen.map(station).join('')}</div></div>`
  })
}

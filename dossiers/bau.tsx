// Baut ein Skills-Dossier (Schülerheft je Modul) als eine HTML-Datei.
//   npx tsx --tsconfig tsconfig.scripts.json dossiers/bau.tsx m5 [m3 …]
// Danach:  node dossiers/pdf.cjs m5   (PDF, Überlauf-Prüfung, Bilder der Seiten)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import { ZeichnungSvg } from '../src/blatt/ZeichnungSvg'
import { bildZeichnung, bildGueltig, palette } from '../src/blatt/zeichnung'
import type { Dossier, Einheit, Frage } from './typen'

const HIER = dirname(fileURLToPath(import.meta.url))
export const FARBEN: [string, string][] = [
  ['#C2500F', '#FCE9DD'], ['#1E8A5A', '#DDF3E7'], ['#2468C9', '#DFEBFB'],
  ['#C9304F', '#FBE1E6'], ['#6D45C4', '#EAE2FA'], ['#0E8C96', '#DAF2F3'],
]
const fehler: string[] = []

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
/** Text mit **fett** und Zeilenumbruch. */
const t = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')

function bild(id: string, a = '#C2500F', z = '#FCE9DD'): string {
  if (!bildGueltig(id)) { fehler.push('Bild fehlt: ' + id); return '' }
  return renderToStaticMarkup(<ZeichnungSvg z={bildZeichnung(id)} p={palette({ tief: a, mittel: z, zart: z } as never)} />)
}
const ic = (name: string) => `<span class="ic">${bild('icon:' + name)}</span>`
const istPeep = (id: string) => id.startsWith('peep:')
const STERN = '<svg viewBox="0 0 24 24"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z" fill="none" stroke="#1E2440" stroke-width="1.7" stroke-linejoin="round"/></svg>'
const sterne = (n = 5) => `<span class="sterne">${Array.from({ length: n }, () => `<i>${STERN}</i>`).join('')}</span>`
const linien = (n: number) => Array.from({ length: n }, () => '<div class="linie"></div>').join('')
const stil = (f: [string, string]) => `style="--a:${f[0]};--z:${f[1]}"`

function frage(f: Frage, i: number): string {
  let a = ''
  if (f.kreis) a += `<div class="kreise">${f.kreis.map((w) => `<span>${t(w)}</span>`).join('')}</div>`
  if (f.kreuz) a += `<div class="kreuze${f.unter ? ' unter' : ''}">${f.kreuz.map((w) => `<span><i></i>${t(w)}</span>`).join('')}</div>`
  if (f.skala) a += `<div class="skala">${f.skala.map((w) => `<span>${t(w)}</span><div class="zahlen">${[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((n) => `<span>${n}</span>`).join('')}</div>`).join('')}</div>`
  if (f.satz) a += f.satz.map((w) => `<div class="satz"><span>${t(w)}</span><div class="linie"></div></div>`).join('')
  if (f.paare) a += `<div class="paare"><div class="l">${f.paare[0].map((w) => `<span>${t(w)}</span>`).join('')}</div><div class="r">${f.paare[1].map((w) => `<span>${t(w)}</span>`).join('')}</div></div>`
  if (f.sort) a += `<div class="sort"><div class="tab" style="grid-template-columns:repeat(${f.sort.spalten.length},1fr)">${f.sort.spalten.map((w) => `<div><b>${t(w)}</b></div>`).join('')}</div><div class="wortbank" style="margin-top:1.5mm">${f.sort.woerter.map((w) => `<span>${t(w)}</span>`).join('')}</div></div>`
  if (f.raster) a += `<div class="raster" style="grid-template-columns:1fr repeat(${f.raster.spalten.length},auto)"><span></span>${f.raster.spalten.map((w) => `<b>${t(w)}</b>`).join('')}${f.raster.zeilen.map((z) => `<span>${t(z)}</span>${f.raster!.spalten.map(() => '<i></i>').join('')}`).join('')}</div>`
  if (f.linien) a += linien(f.linien)
  return `<div class="frage"><span class="num">${i + 1}</span><div class="fk"><div class="ft">${t(f.f)}</div>${a}</div></div>`
}

function baue(d: Dossier): string {
  const seiten: { html: string; e?: number; klasse?: string }[] = []
  const fb = d.farbe
  const ef = (e: Einheit) => FARBEN[e.farbe]
  const fuss = (nr: number, e?: number) =>
    `<div class="fuss"><span>${esc(d.fuss)}</span><span class="punkte">${d.einheiten.map((x, i) => `<i class="${i === e ? 'an' : ''}" style="background:${ef(x)[0]}"></i>`).join('')}</span><span class="nr">${nr}</span></div>`
  const kopf = (o: { kreis: string; ober?: string; titel: string; unter?: string; rechts?: string; kl?: boolean; grau?: boolean }) =>
    `<div class="kopf"><div class="kreis">${o.kreis}</div><div class="titel">${o.ober ? `<div class="ober">${esc(o.ober)}</div>` : ''}<h1 class="${o.kl ? 'kl' : ''}">${t(o.titel)}</h1>${o.unter ? `<div class="unter${o.grau ? ' gr' : ''}">${t(o.unter)}</div>` : ''}</div>${o.rechts ?? ''}</div>`
  const pille = (p: [string, string]) => `<div class="pille">${ic(p[0])}${esc(p[1])}</div>`
  const kb = (icon: string) => `<span class="bild">${bild('icon:' + icon)}</span>`

  // 1 Deckblatt
  const dk = d.deck
  seiten.push({
    html: `<div class="deck" ${stil(fb)}><div class="feld">
      <span class="ecke a">${bild(dk.ecken[0], ...fb)}</span><span class="ecke b">${bild(dk.ecken[1], ...fb)}</span>
      <div class="band">${esc(d.band)}</div>
      <h1 class="${d.titel.length > 9 ? 'lang' : ''}">${t(d.titel)}</h1><div class="ut">${t(d.unter)}</div>
      <div class="buehne">${dk.figuren.map((f) => `<div class="fig">${f.blase ? `<div class="blase">${esc(f.blase)}</div>` : ''}<div class="sv">${bild(f.bild, ...fb)}</div></div>`).join('')}</div>
      <div class="zaehler">${dk.zaehler.map((z) => `<span>${esc(z)}</span>`).join('')}</div>
    </div>
    <div class="pass"><div class="haupt"><div class="oben"><h2>${ic(dk.pass.icon)}${esc(dk.pass.titel)}</h2><small>${esc(dk.pass.rechts)}</small></div>
      <div class="felder"><div class="leer"><small>${esc(dk.pass.name)}</small><i></i></div><div class="leer1"><small>${esc(dk.pass.gruppe)}</small><i></i></div>
      ${dk.pass.felder.map((f) => `<div><small>${esc(f[0])}</small><b>${esc(f[1])}</b></div>`).join('')}</div></div>
      <div class="stub"><b>${esc(dk.pass.stub)}</b><span class="bild">${bild(dk.pass.stubBild, ...fb)}</span><span class="code"></span></div></div></div>`,
  })

  // 2 Anleitung
  const an = d.anleitung
  seiten.push({
    html: `<div ${stil(fb)}>${kopf({ kreis: kb(an.icon), ober: d.fuss, titel: an.titel, unter: an.unter, grau: true })}
    <div class="inhalt">
      <div class="gr">${pille(['list-check', an.schrittTitel])}
<div class="reihe r3 schritt3">${an.schritte.map((s, i) => `<div class="karte"><div class="bild">${bild(s.bild, ...fb)}</div><h3><span class="num">${i + 1}</span>${t(s.t)}</h3><p>${t(s.x)}</p></div>`).join('')}</div></div>
      <div class="gr">${pille(['tools', an.werkzeugTitel])}
<div class="karte sch werkzeug">${an.werkzeug.map((w) => `<div class="w"><div class="bild">${bild(w.bild, ...fb)}</div><h3>${t(w.name)}</h3><p>${t(w.x)}</p></div>`).join('')}</div></div>
      <div class="gr">${pille(['users', an.leuteTitel])}
<div class="reihe r4 leute">${an.leute.map((l) => `<div class="karte"><div class="bild">${bild(l.bild, ...fb)}</div><h3>${t(l.name)}</h3><p>${t(l.x)}</p></div>`).join('')}</div></div>
      <div class="karte regeln"><h3>${t(an.regelnTitel)}</h3><ul>${an.regeln.map((r, i) => `<li><span class="num">${i + 1}</span><span>${t(r)}</span></li>`).join('')}</ul></div>
    </div></div>`,
  })

  // 3 Übersicht
  const ub = d.uebersicht
  const ersteSeite = 4
  seiten.push({
    html: `<div ${stil(fb)}>${kopf({ kreis: kb(ub.icon), ober: d.fuss, titel: ub.titel, unter: ub.unter, grau: true })}
    <div class="inhalt">
      <div class="weg">${d.einheiten.map((e, i) => `<div class="st" ${stil(ef(e))}><div class="k">${i + 1}</div><div class="tx"><h3>${t(e.titel)}</h3><p>${t(e.kurz)}</p></div><div class="bild">${bild(e.bild, ...ef(e))}</div><div class="s">Seite ${ersteSeite + i * 2}</div></div>`).join('')}</div>
      <div class="karte ziele"><h3>${t(ub.zielTitel)}</h3><ul>${ub.ziele.map((z) => `<li>${ic('circle-check')}<span>${t(z)}</span></li>`).join('')}</ul></div>
      <div class="karte sch warm"><h3>${t(ub.warm.titel)}</h3><p>${t(ub.warm.text)}</p>${ub.warm.fragen.map(frage).join('')}</div>
      <div class="karte stpass"><div class="tx"><h3>${t(d.wort.pass)}</h3><p>${t(ub.passText)}</p></div><div class="kr">${d.einheiten.map((e, i) => `<div style="--a:${ef(e)[0]}"><b>${i + 1}</b><small>${esc(e.stempel)}</small></div>`).join('')}</div></div>
    </div></div>`,
  })

  // Doppelseiten
  d.einheiten.forEach((e, i) => {
    const f = ef(e)
    const eck = `<div class="eck${istPeep(e.bild) ? '' : ' frei'}">${bild(e.bild, ...f)}</div>`
    seiten.push({
      e: i,
      html: `<div ${stil(f)}>${kopf({ kreis: `<small>${esc(d.wort.station)}</small><b>${i + 1}</b>`, titel: e.titel, unter: e.unter, rechts: eck, kl: e.titel.length > 18 })}
      <div class="inhalt ls">
        <p class="intro">${t(e.intro)}</p>
        <div class="gr">${pille(e.pA)}
<div class="reihe r3">${e.ideen.map((x, k) => `<div class="karte idee"><h3><span class="num">${k + 1}</span>${t(x.t)}</h3><p>${t(x.x)}</p></div>`).join('')}</div></div>
        <div class="gr">${pille(e.pB)}
<div class="reihe r2">${e.karten.map((x) => `<div class="karte ding"><div class="kachel${istPeep(x.bild) ? ' peep' : ''}">${bild(x.bild, ...f)}</div><div class="tx"><div class="zeile"><h3>${t(x.name)}</h3>${x.tag ? `<span class="etikett">${esc(x.tag)}</span>` : ''}</div><div class="ort">${esc(x.ort)}</div><p>${t(x.x)}</p></div></div>`).join('')}</div></div>
        <div class="gr">${pille(e.pC)}
<div class="chips">${e.chips.map((c) => `<span class="chip">${t(c[0])}${c[1] ? ` <span>· ${t(c[1])}</span>` : ''}</span>`).join('')}</div></div>
        <div class="karte gelb"><div class="birne">${bild('icon:bulb')}</div><div><h3>${t(e.wusst.t ?? 'Wusstest du?')}</h3><p>${t(e.wusst.x)}</p></div></div>
      </div></div>`,
    })
    const tu = e.tun
    const dreier = `<div class="dreier">${tu.dreier.map((w, k) => `<span><i>${k + 1}</i>${esc(w)}</span>`).join('')}</div>`
    seiten.push({
      e: i,
      html: `<div ${stil(f)}>${kopf({ kreis: kb(tu.icon), ober: `${d.wort.station} ${i + 1} · ${e.stempel}`, titel: tu.titel, unter: tu.unter, rechts: dreier, grau: true })}
      <div class="inhalt rs">
        ${tu.missionen.map((m, k) => `<div class="karte sch mission"><div class="links"><div class="lab">${esc(m.lab ?? 'Mission ' + 'ABC'[k])}</div><div class="bild${istPeep(m.bild) ? ' peep' : ''}">${bild(m.bild, ...f)}</div><div class="wie">${t(m.wie)}</div><div class="zeit">${ic('clock')}${esc(m.zeit)}</div></div>
          <div class="rechts"><h3>${t(m.titel)}</h3><div class="zeile2">${t(m.zeile)}</div>${m.kontext ? `<p class="kontext">${t(m.kontext)}</p>` : ''}${m.fragen.map(frage).join('')}</div></div>`).join('')}
        <div class="unten"><div class="karte bonus"><div class="links"><div class="lab">Bonus</div><div class="bild">${bild(tu.bonus.bild, ...f)}</div></div><div class="rechts"><h3>${t(tu.bonus.titel)}</h3><p>${t(tu.bonus.x)}</p>${linien(tu.bonus.linien ?? 1)}</div></div>
          <div class="karte mitmach"><div class="lab">${ic('hand-stop')}Mitmach-Mission</div><h3>${t(tu.mitmach.titel)}</h3><p>${t(tu.mitmach.x)}</p></div></div>
        <div class="ende"><div class="stempel"><small>${esc(d.wort.station)} ${i + 1}</small><b>${esc(e.stempel)}</b><small>Stempel</small></div>
          <div class="tx"><div class="f">${t(tu.sternText)} ${sterne()}</div><div class="f" style="margin-top:1.5mm">${t(tu.merke ?? 'Das merke ich mir:')}</div>${linien(1)}<div class="linie extra"></div></div></div>
        <div class="woche"><b>Für die Woche</b><span>${t(tu.woche)}</span></div>
        ${tu.hilfe ? `<div class="hilfe">${ic('phone')}<span>${t(d.hilfeText ?? 'Wenn dich etwas belastet: Sprich mit einer erwachsenen Person, der du vertraust. Kanner-Jugendtelefon **116 111** · Notruf **112**')}</span></div>` : ''}
      </div></div>`,
    })
  })

  // Rätsel
  const ra = d.raetsel
  seiten.push({
    html: `<div ${stil(fb)}>${kopf({ kreis: kb('search'), ober: d.fuss, titel: ra.titel, unter: ra.unter, grau: true })}
    <div class="inhalt">
      <div class="gr">${pille(['help-circle', 'Wer oder was bin ich?'])}
        <div class="reihe r2 wer">${ra.wer.map((w, i) => `<div class="karte"><span class="num">${i + 1}</span><div style="flex:1"><p>${t(w.x)}</p><div class="linie"></div></div></div>`).join('')}</div>
        <div class="wortbank">${ra.bank.map((w) => `<span>${t(w)}</span>`).join('')}</div></div>
      <div class="gr">${pille(['arrows-shuffle', ra.sort.titel])}
        <p class="intro">${t(ra.sort.frage)}</p>
        <div class="wortbank">${ra.sort.woerter.map((w) => `<span>${t(w)}</span>`).join('')}</div>
        <div class="sort"><div class="tab" style="grid-template-columns:repeat(${ra.sort.spalten.length},1fr)">${ra.sort.spalten.map((w) => `<div style="min-height:${ra.sort.hoehe ?? 34}mm"><b>${t(w)}</b></div>`).join('')}</div></div></div>
    </div></div>`,
  })

  // Quiz mit Lösungswort
  const qz = d.quiz
  const wort = qz.wort.toUpperCase()
  if (wort.length !== qz.fragen.length) fehler.push(`Quiz: ${qz.fragen.length} Fragen, aber Lösungswort mit ${wort.length} Buchstaben`)
  const ABC = 'ABCDEFGHIJKLMNOPRSTUVWZ'
  const quizLoesung: string[] = []
  const quizHtml = qz.fragen.map((q, i) => {
    const richtig = wort[i]
    const andere = ABC.split('').filter((b) => b !== richtig)
    const bs = q.o.map((_, k) => (k === q.r ? richtig : andere[(i * 7 + k * 5 + 3) % andere.length]))
    if (new Set(bs).size !== bs.length) bs.forEach((b, k) => { if (k !== q.r && bs.indexOf(b) !== k) bs[k] = andere[(i * 7 + k * 5 + 9) % andere.length] })
    quizLoesung.push(`${i + 1} ${richtig} (${q.o[q.r]})`)
    return `<div class="q" style="border-color:${FARBEN[d.einheiten[q.e].farbe][0]}"><span class="num" style="background:${FARBEN[d.einheiten[q.e].farbe][0]}">${i + 1}</span><div class="fk"><div class="ft">${t(q.f)}</div>${q.o.map((o, k) => `<div class="op"><i>${bs[k]}</i><span>${t(o)}</span></div>`).join('')}</div></div>`
  }).join('')
  seiten.push({
    html: `<div ${stil(fb)}>${kopf({ kreis: kb('trophy'), ober: d.fuss, titel: qz.titel, unter: qz.unter, grau: true })}
    <div class="inhalt" style="gap:3.2mm">
      <div class="quiz">${quizHtml}</div>
      <div class="karte lwort" style="padding-bottom:6.5mm"><h3>Lösungswort:</h3><div class="kaest">${wort.split('').map((_, i) => `<div><small>${i + 1}</small></div>`).join('')}</div></div>
      <div class="gr">${pille(['circle-check', 'Stimmt das?'])}
<div class="rf">${qz.rf.map((r) => `<div><span>${t(r.x)}</span><span class="jn"><i>stimmt</i><i>stimmt nicht</i></span></div>`).join('')}</div></div>
    </div></div>`,
  })

  // Rückblick
  const rb = d.rueckblick
  seiten.push({
    html: `<div ${stil(fb)}>${kopf({ kreis: kb('notebook'), ober: d.fuss, titel: rb.titel, unter: rb.unter, grau: true })}
    <div class="inhalt">
      <div class="gr">${pille(['star', rb.sternTitel])}
<div class="karte tb">${d.einheiten.map((e, i) => `<div class="z"><span class="p" style="background:${ef(e)[0]}"></span><b>${i + 1} · ${t(e.titel)}</b>${sterne()}<div class="linie"></div></div>`).join('')}</div></div>
      <div class="gr">${pille(['pencil', rb.satzTitel])}
<div class="karte">${rb.saetze.map((s) => `<div class="satz" style="margin-top:2.4mm"><span><strong>${t(s)}</strong></span><div class="linie"></div></div>${linien(1)}`).join('')}</div></div>
      <div class="gr">${pille(['tools', rb.werkzeugTitel])}
      <div class="karte wahl"><p>${t(rb.werkzeugFrage)}</p><div class="wortbank">${an.werkzeug.map((w) => `<span>${t(w.name)}</span>`).join('')}</div></div></div>
      <div class="gr">${pille(['scissors', 'Zum Ausschneiden'])}
<div class="urkunde"><span class="schere">${bild('icon:scissors')}</span><div class="bild">${bild(rb.urkunde.bild, ...fb)}</div><div class="tx"><small>${esc(rb.urkunde.klein)}</small><h2>${t(rb.urkunde.titel)}</h2><div class="name"></div><p>${t(rb.urkunde.text)}</p><div class="u2"><div>Datum</div><div>Unterschrift Leitung</div></div></div></div></div>
    </div></div>`,
  })

  // Leitung 1: Einsatz
  const lt = d.leitung
  const seiteVon = (i: number) => ersteSeite + i * 2
  const lkopf = (titel: string) => `<div class="lk"><span class="mark">Nur für die Leitung</span><h1>${t(titel)}</h1></div>`
  seiten.push({
    klasse: 'lt',
    html: `<div ${stil(fb)}>${lkopf('Hinweise zum Einsatz')}<div class="inhalt">
      <div class="fakten">${lt.fakten.map((x) => `<div><small>${esc(x[0])}</small><b>${t(x[1])}</b></div>`).join('')}</div>
      <div><h2>Wozu dieses Heft?</h2><p>${t(lt.wozu)}</p></div>
      <div><h2>Lernziele</h2><ul>${lt.lernziele.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>
      <div><h2>Das Heft in den Einheiten</h2><table class="t"><tr><th>Einheit</th><th>Seiten</th><th>So passt das Heft in die 100 Minuten</th></tr>
        <tr><td>vor Einheit ${d.einheiten[0].nr}</td><td>1–3</td><td>${t(lt.start)}</td></tr>
        ${d.einheiten.map((e, i) => `<tr><td>E${e.nr} · ${t(e.titel)}</td><td>${seiteVon(i)}–${seiteVon(i) + 1}</td><td>${t(e.leitung.einsatz)}</td></tr>`).join('')}
        <tr><td>nach Einheit ${d.einheiten[d.einheiten.length - 1].nr}</td><td>${seiteVon(d.einheiten.length)}–${seiteVon(d.einheiten.length) + 2}</td><td>${t(lt.schluss)}</td></tr></table></div>
      <div><h2>Eine Einheit mit dem Heft</h2><div class="zl">
        <div style="flex:10">Ankommen<small>0–10</small></div><div style="flex:6">Brücke<small>10–15</small></div>
        <div class="h" style="flex:30">Hauptteil 1 · Heft<small>15–45 · linke Seite lesen, Mission A</small></div><div style="flex:15">Pause<small>45–60</small></div>
        <div class="h" style="flex:25">Hauptteil 2 · Heft<small>60–85 · Mitmach-Mission, Mission B</small></div><div style="flex:11">Skill<small>85–95</small></div><div class="h" style="flex:9">Schluss<small>Stempel</small></div></div></div>
      <div class="sp2"><div class="kasten"><h2>Wenn es schwerfällt</h2><ul>${lt.hilfe.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>
        <div class="kasten"><h2>Wenn jemand mehr will</h2><ul>${lt.forder.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div></div>
      <div class="kasten g"><h2>Wichtig für das Gespräch</h2><p>${t(lt.gespraech)}</p></div>
    </div></div>`,
  })
  // Leitung 2: Lösungen
  seiten.push({
    klasse: 'lt gross',
    html: `<div ${stil(fb)}>${lkopf('Lösungen und erwartete Antworten')}<div class="inhalt">
      <p class="klein">Bei offenen Fragen gibt es kein Richtig oder Falsch. Genannt ist, was häufig kommt und woran sich das Gespräch anknüpfen lässt.</p>
      <div class="sp2">${d.einheiten.map((e, i) => `<div class="los"><h3><i style="background:${ef(e)[0]}"></i>${d.wort.station} ${i + 1} · ${t(e.titel)}</h3><ul>${e.leitung.loesungen.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>`).join('')}</div>
      <div><h2>Fragen für die Runde nach den Missionen</h2><table class="t">${d.einheiten.map((e, i) => `<tr><td>${d.wort.station} ${i + 1}</td><td>${e.leitung.impulse.map((x) => t(x)).join('<br>')}</td></tr>`).join('')}</table></div>
      <div class="sp2"><div class="kasten"><h2>${t(ra.titel)}</h2><p><strong>Wer bin ich?</strong> ${ra.wer.map((w, i) => `${i + 1} ${t(w.l)}`).join(' · ')}</p><p style="margin-top:1mm"><strong>${t(ra.sort.titel.replace(/[?!.]$/, ''))}:</strong> ${ra.sort.spalten.map((s, i) => `<em>${t(s)}</em>: ${t(ra.sort.loesung[i].join(', '))}`).join(' — ')}</p></div>
        <div class="kasten"><h2>${t(qz.titel)}</h2><p>Lösungswort: <strong>${wort}</strong></p><p>${quizLoesung.map(t).join(' · ')}</p><p style="margin-top:1mm"><strong>Stimmt das?</strong> ${qz.rf.map((r, i) => `${i + 1} ${r.r ? 'stimmt' : 'stimmt nicht'}${r.w ? ` (${t(r.w)})` : ''}`).join(' · ')}</p></div></div>
    </div></div>`,
  })
  // Leitung 3: Material und Druck
  seiten.push({
    klasse: 'lt gross',
    html: `<div ${stil(fb)}>${lkopf('Material, Vorbereitung und Druck')}<div class="inhalt">
      <div><h2>Was Sie je Einheit zusätzlich brauchen</h2><table class="t"><tr><th>Einheit</th><th>Für die Missionen im Heft</th><th>Aus dem Kurs (Toolbox)</th></tr>
        ${d.einheiten.map((e) => `<tr><td>E${e.nr} · ${t(e.titel)}</td><td>${t(e.leitung.material)}</td><td>${t(e.leitung.blaetter)}</td></tr>`).join('')}</table></div>
      <div class="sp2"><div class="kasten"><h2>Drucken</h2><ul>${lt.druck.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>
        <div class="kasten"><h2>Stempel und Pass</h2><ul>${lt.stempel.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div></div>
      <div class="kasten g"><h2>Achtung bei diesem Modul</h2><p>${t(lt.achtung)}</p></div>
      <div><h2>Fachlicher Hintergrund in Kürze</h2><p>${t(lt.hintergrund)}</p><p class="klein" style="margin-top:1.5mm">${t(lt.quellen)}</p></div>
      <p class="klein">Die Jugendlichen im Heft sind erfunden. Zeichnungen: Open Peeps (Pablo Stanley, CC0), Tabler Icons (MIT), Fluent Emoji (Microsoft, MIT). Schriften: Fredoka und Nunito (SIL Open Font License). Stand: ${esc(d.stand)}.</p>
    </div></div>`,
  })

  const schrift = (datei: string) => readFileSync(join(HIER, 'schrift', datei)).toString('base64')
  const css = readFileSync(join(HIER, 'stil.css'), 'utf8')
  const fonts = `@font-face{font-family:'Fredoka';font-weight:300 700;src:url(data:font/woff2;base64,${schrift('fredoka-latin-wght-normal.woff2')}) format('woff2')}
@font-face{font-family:'Nunito';font-weight:200 1000;src:url(data:font/woff2;base64,${schrift('nunito-latin-wght-normal.woff2')}) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'Nunito';font-weight:200 1000;src:url(data:font/woff2;base64,${schrift('nunito-latin-ext-wght-normal.woff2')}) format('woff2');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}`
  const body = seiten.map((s, i) => `<section class="seite ${s.klasse ?? ''}" data-nr="${i + 1}">${s.html}${i === 0 ? '' : fuss(i + 1, s.e)}</section>`).join('\n')
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${esc(d.titel)} – ${esc(d.band)}</title><style>${fonts}\n${css}</style></head><body>\n${body}\n<script>${SKRIPT}</script></body></html>`
}

const SKRIPT = `document.fonts.ready.then(function(){
  function frei(el){var cs=getComputedStyle(el),k=[].slice.call(el.children),h=0;k.forEach(function(c){h+=c.getBoundingClientRect().height});
    return el.clientHeight-parseFloat(cs.paddingTop)-h-(k.length-1)*parseFloat(cs.rowGap||0)}
  [].forEach.call(document.querySelectorAll('.inhalt.rs,.inhalt.ls'),function(el){
    if(frei(el)>72)el.classList.add('luft'); if(frei(el)>72)el.classList.add('luft2')});
  document.body.dataset.fertig='1'})`

const ziel = join(HIER, 'aus')
mkdirSync(ziel, { recursive: true })
for (const id of process.argv.slice(2)) {
  const mod = (await import(`./inhalt/${id}.ts`)) as { default: Dossier }
  const html = baue(mod.default)
  writeFileSync(join(ziel, `${mod.default.datei}.html`), html)
  console.log(id, '→', `aus/${mod.default.datei}.html`, Math.round(html.length / 1024), 'KB')
}
if (fehler.length) { console.error(fehler.join('\n')); process.exit(1) }

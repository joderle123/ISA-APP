// Baut eine Ausgabe von „REAL TALK“ (Heft je Modul des Skills-Kurses) als eine HTML-Datei.
//   npx tsx --tsconfig tsconfig.scripts.json dossiers/bau.tsx m5 [m3 …]
// Danach:  node dossiers/pdf.cjs m5   (PDF, Überlauf-Prüfung, Bilder der Seiten)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import { ZeichnungSvg } from '../src/blatt/ZeichnungSvg'
import { bildZeichnung, bildGueltig, palette } from '../src/blatt/zeichnung'
import type { Heft, Frage } from './typen'

const HIER = dirname(fileURLToPath(import.meta.url))
const fehler: string[] = []

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
/** Text mit **fett**, ==markiert== und Zeilenumbruch. */
const t = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/==(.+?)==/g, '<span class="hl">$1</span>').replace(/\n/g, '<br>')

/** Figur (Open Peeps) in Graustufen – als Vektor, damit der Druck scharf bleibt. */
function figur(id: string): string {
  if (!bildGueltig(id)) { fehler.push('Bild fehlt: ' + id); return '' }
  const svg = renderToStaticMarkup(<ZeichnungSvg z={bildZeichnung(id)} p={palette({ tief: '#111111', mittel: '#BBBBBB', zart: '#EEEEEE' } as never)} />)
  return svg.replace(/#([0-9a-fA-F]{6})\b/g, (_, h: string) => {
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
    let y = 0.299 * r + 0.587 * g + 0.114 * b
    y = Math.max(0, Math.min(255, (y - 128) * 1.18 + 132))
    const x = Math.round(y).toString(16).padStart(2, '0')
    return `#${x}${x}${x}`
  })
}
/** Tabler-Icon (Linie) aus dem vollen Satz. */
function icon(name: string): string {
  const p = join(HIER, '..', 'node_modules', '@tabler', 'icons', 'icons', 'outline', name + '.svg')
  if (!existsSync(p)) { fehler.push('Icon fehlt: ' + name); return '' }
  return readFileSync(p, 'utf8').replace(/<svg[^>]*>/, '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">').replace(/<!--[\s\S]*?-->/g, '')
}
const ic = (name: string) => `<span class="ic">${icon(name)}</span>`
const linien = (n: number) => Array.from({ length: n }, () => '<div class="linie"></div>').join('')
const tape = (i: string, s: string, a = false) => `<div class="tape mo${a ? ' a' : ''}">${ic(i)}${esc(s)}</div>`

function frage(f: Frage, i: number): string {
  let a = ''
  if (f.kreis) a += `<div class="kreise">${f.kreis.map((w) => `<span>${t(w)}</span>`).join('')}</div>`
  if (f.kreuz) a += `<div class="kreuze${f.unter ? ' unter' : ''}">${f.kreuz.map((w) => `<span><i></i>${t(w)}</span>`).join('')}</div>`
  if (f.skala) a += `<div class="skala">${f.skala.map((w) => `<span class="mo">${t(w)}</span><div class="zahlen">${[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((n) => `<span>${n}</span>`).join('')}</div>`).join('')}</div>`
  if (f.satz) a += f.satz.map((w) => `<div class="satz"><span>${t(w)}</span><div class="linie"></div></div>`).join('')
  if (f.raster) a += `<div class="raster" style="grid-template-columns:1fr repeat(${f.raster.spalten.length},auto)"><span></span>${f.raster.spalten.map((w) => `<b class="mo">${t(w)}</b>`).join('')}${f.raster.zeilen.map((z) => `<span>${t(z)}</span>${f.raster!.spalten.map(() => '<i></i>').join('')}`).join('')}</div>`
  if (f.preis) a += `<div class="preis"><span class="k mo">Möglichkeit</span><span class="k mo">${t(f.preis.kopf[0])}</span><span class="k mo">${t(f.preis.kopf[1])}</span>${f.preis.optionen.map((o) => `<span class="o">${t(o)}</span><span></span><span></span>`).join('')}</div>`
  if (f.zahl) a += `<div class="zahl">${f.zahl.map((w) => `<div><span>${t(w)}</span><i></i></div>`).join('')}</div>`
  if (f.strich) a += `<div class="strich"><span class="mo">${t(f.strich[0])}</span><div></div><span class="mo">${t(f.strich[1])}</span></div>`
  if (f.feld) a += `<div class="feld" style="height:${f.feld}mm"></div>`
  if (f.linien) a += linien(f.linien)
  return `<div class="frage"><span class="n">${i + 1}</span><div class="fk2"><div class="ft">${t(f.f)}</div>${a}</div></div>`
}

function baue(d: Heft): string {
  const seiten: { html: string; e?: number; klasse?: string; ohneFuss?: boolean }[] = []
  const marke = `REAL TALK #${d.nr}`
  const z2 = (n: number) => String(n).padStart(2, '0')
  const fuss = (nr: number, e?: number) =>
    `<div class="fuss"><span class="mo">${marke} · ${esc(d.thema)}</span><span class="tr mo">${d.tracks.map((_, i) => `<i class="${i === e ? 'an2' : ''}">${z2(i + 1)}</i>`).join('')}</span><span class="nr">${nr}</span></div>`
  const kh = (titel: string, unter: string, sticker?: string) =>
    `<div class="kh"><div><div class="mo" style="color:var(--g);margin-bottom:1.4mm">${marke} · ${esc(d.thema)}</div><h1 class="an">${t(titel)}</h1><div class="ut">${t(unter)}</div></div>${sticker ? `<div class="st">${t(sticker)}</div>` : ''}</div>`
  const ersteSeite = 4
  const seiteVon = (i: number) => ersteSeite + i * 2

  // 1 Titel
  seiten.push({
    ohneFuss: true,
    html: `<div class="cv">
      <div class="top"><div class="mo">Das Heft zum Skills-Kurs<br>Jahr 1 · Ausgabe ${esc(d.nr)}</div><div class="no">#${esc(d.nr)}</div></div>
      <div class="logo">Real<br><span>Talk</span></div>
      <div class="block"><div class="mo">In dieser Ausgabe</div><div class="th2${d.thema.length > 9 ? ' kl' : ''}">${t(d.thema)}</div><div class="hd">${t(d.headline)}</div></div>
      <div class="stk">${t(d.cover.sticker)}</div>
      <div class="figur">${figur(d.cover.bild)}</div>
      <div class="zl">${d.cover.zeilen.map((x) => `<div><span>${t(x)}</span></div>`).join('')}</div>
      <div class="unten"><div class="ge"><span class="mo">Dieses Heft gehört</span><i></i></div><div class="code"></div><div class="pr mo">Preis:<br>1 ehrliche Antwort</div></div>
    </div>`,
  })

  // 2 Ansage
  seiten.push({
    html: `<div>${kh('Ansage', 'Worum es hier geht – und worum nicht', 'Ohne Predigt')}
    <div class="inhalt">
      <div class="ansage">${d.ansage.text.map((x) => `<p>${t(x)}</p>`).join('')}<div class="zit">${t(d.ansage.zitat)}</div></div>
      <div class="gr">${tape('book-2', 'So liest du das Heft')}
        <div class="so">${d.ansage.so.map((s) => `<div><b>${t(s[0])}</b><span>${t(s[1])}</span></div>`).join('')}</div></div>
      <div class="gr">${tape('bolt', 'Drei Regeln. Mehr gibt es nicht.', true)}
        <div class="bx p regeln">${d.ansage.regeln.map((r, i) => `<div><b class="z">${i + 1}</b><span>${t(r)}</span></div>`).join('')}</div></div>
      <div class="hilfe">${ic('phone')}<span>${t(d.hilfeText ?? 'Wenn dich etwas aus dem Heft nicht loslässt: Sprich mit jemandem, dem du vertraust. Kanner-Jugendtelefon **116 111** · Notruf **112**')}</span></div>
    </div></div>`,
  })

  // 3 Tracklist und Cast
  seiten.push({
    html: `<div>${kh('Tracklist', `${['', 'Ein', 'Zwei', 'Drei', 'Vier', 'Fünf', 'Sechs'][d.tracks.length]} Tracks, ein Thema: ${d.thema}`)}
    <div class="inhalt">
      <div class="tl">${d.tracks.map((e, i) => `<div class="t"><div class="z">${z2(i + 1)}</div><div class="tx"><h3>${t(e.titel)}</h3><p>${t(e.kurz)}</p></div><div class="s mo">S. ${seiteVon(i)}</div></div>`).join('')}
        <div class="t x"><div class="z">+</div><div class="tx"><h3>Hot Takes · Code · Karten · Abspann</h3><p>Streiten nach Regeln, den Code knacken, Karten für die Tasche.</p></div><div class="s mo">S. ${seiteVon(d.tracks.length)}</div></div></div>
      <div class="gr">${tape('users', 'Cast – alle erfunden, alles schon passiert')}
        <div class="cast">${d.cast.map((c) => `<div class="c"><div class="b"><div class="pk punkt"></div><div class="fig">${figur(c.bild)}</div></div><div class="tx"><h3>${t(c.name)}</h3><p>${t(c.x)}</p></div></div>`).join('')}</div></div>
      <div class="bx warm"><h3>${t(d.warm.titel)}</h3><p>${t(d.warm.text)}</p>${d.warm.fragen.map(frage).join('')}</div>
    </div></div>`,
  })

  // Doppelseiten je Track
  d.tracks.forEach((e, i) => {
    seiten.push({
      e: i,
      html: `<div><div class="th"><div class="zahl">${z2(i + 1)}</div><div class="lab mo">Track ${z2(i + 1)}</div><h1 class="an${e.titel.length > 15 ? ' kl' : ''}">${t(e.titel)}</h1><div class="ut">${t(e.unter)}</div></div>
      <div class="inhalt ls">
        <div class="gr">${tape('movie', 'Szene')}
          <div class="bx p szene"><div class="wer"><div class="pk punkt"></div><div class="fig">${figur(e.szene.bild)}</div><div class="nm mo">${esc(e.szene.name)}</div></div>
          <div class="tx"><p>${t(e.szene.text)}</p><div class="fr mk">${ic('arrow-big-right')}<span>${t(e.szene.frage)}</span></div><div class="linie"></div></div></div></div>
        <div class="gr">${tape('bulb', e.faktenTitel ?? 'Was dahinter steckt')}
          <div class="fk">${e.fakten.map((x, k) => `<div><div class="z">${k + 1}</div><h3>${t(x.t)}</h3><p>${t(x.x)}</p></div>`).join('')}</div></div>
        <div class="my"><div class="kopf"><span class="mo">Mythos</span><span class="mo">Real</span></div>${e.mythen.map((m) => `<div class="z"><span>${ic('x')}<span>${t(m[0])}</span></span><span>${ic('check')}<span>${t(m[1])}</span></span></div>`).join('')}</div>
        <div class="merk"><span class="mo">Merk dir</span><div class="mk">${t(e.merk)}</div></div>
      </div></div>`,
    })
    seiten.push({
      e: i,
      html: `<div><div class="mh"><div><div class="mo" style="margin-bottom:1mm">Track ${z2(i + 1)} · ${esc(e.titel)}</div><h1 class="an">Dein Move</h1><div class="ut">${t(e.moveUnter)}</div></div><div class="re mo">lesen<br>machen<br>mitnehmen</div></div>
      <div class="inhalt rs">
        ${e.moves.map((m, k) => `<div class="bx mv"><div class="kp"><div class="b">${'ABC'[k]}</div><h3>${t(m.titel)}</h3><div class="me mo"><span>${esc(m.wie)}</span><span>${esc(m.zeit)}</span></div></div>
          <div class="kb">${m.kontext ? `<p class="kontext">${t(m.kontext)}</p>` : ''}${m.fragen.map(frage).join('')}</div></div>`).join('')}
        <div class="zwei"><div class="bx ak ch"><div class="lab mo"><span>Challenge</span><span>${esc(e.challenge.wie)}</span></div><h3>${t(e.challenge.titel)}</h3><p>${t(e.challenge.x)}</p></div>
          <div class="bx ln"><div class="lab mo">Deine Line</div><h3>${t(e.line.titel)}</h3><p>${t(e.line.x)}</p>${e.line.feld ? `<div class="feld" style="height:${e.line.feld}mm"></div>` : ''}${linien(e.line.linien ?? 0)}</div></div>
        <div class="wo"><span class="mo">Diese Woche</span><span>${t(e.woche)}</span></div>
        <div class="vibe"><span class="mo">Track erledigt <i></i></span><span class="mo">Vibe: <i></i> lahm <i></i> okay <i></i> stark</span><span class="mo">Datum: ____________</span></div>
        ${e.hilfe ? `<div class="hilfe">${ic('phone')}<span>${t(d.hilfeText ?? 'Wenn dich etwas belastet: Sprich mit jemandem, dem du vertraust. Kanner-Jugendtelefon **116 111** · Notruf **112**')}</span></div>` : ''}
      </div></div>`,
    })
  })

  // Hot Takes
  seiten.push({
    html: `<div>${kh('Hot Takes', d.hot.unter, 'Kein Richtig, kein Falsch')}
    <div class="inhalt">
      <p style="font-size:10.8pt">${t(d.hot.regeln)}</p>
      <div>${d.hot.takes.map((x, i) => `<div class="take"><div class="z">${i + 1}</div><div class="s">${t(x)}</div><div class="strich"><span class="mo">stimmt nie</span><div></div><span class="mo">stimmt immer</span></div></div>`).join('')}</div>
      <div class="bx p"><div class="satz" style="margin-top:0"><span><strong>Bei diesem Take habe ich meine Meinung geändert:</strong> Nr.</span><div class="linie" style="max-width:20mm"></div><span><strong>– weil</strong></span><div class="linie"></div></div></div>
    </div></div>`,
  })

  // Code knacken
  const qz = d.quiz
  const wort = qz.wort.toUpperCase()
  if (wort.length !== qz.fragen.length) fehler.push(`Quiz: ${qz.fragen.length} Fragen, aber Lösungswort mit ${wort.length} Buchstaben`)
  const ABC = 'ABCDEFGHIJKLMNOPRSTUVWZ'
  const quizLoesung: string[] = []
  const quizHtml = qz.fragen.map((q, i) => {
    const richtig = wort[i]
    const andere = ABC.split('').filter((b) => b !== richtig)
    const bs = q.o.map((_, k) => (k === q.r ? richtig : andere[(i * 7 + k * 5 + 3) % andere.length]))
    bs.forEach((b, k) => { if (k !== q.r && bs.indexOf(b) !== k) bs[k] = andere[(i * 7 + k * 5 + 9) % andere.length] })
    quizLoesung.push(`${i + 1} ${richtig} (${q.o[q.r]})`)
    return `<div class="q"><span class="n">${i + 1}</span><div><div class="ft">${t(q.f)}</div>${q.o.map((o, k) => `<div class="op"><i>${bs[k]}</i><span>${t(o)}</span></div>`).join('')}</div></div>`
  }).join('')
  seiten.push({
    html: `<div>${kh('Knack den Code', qz.unter, `${wort.length} Fragen`)}
    <div class="inhalt">
      <div class="quiz${qz.fragen.length > 8 ? ' eng' : ''}">${quizHtml}</div>
      <div class="bx ak code" style="padding-bottom:7mm"><h3>Der Code:</h3><div class="ka">${wort.split('').map((_, i) => `<div><small>${i + 1}</small></div>`).join('')}</div></div>
      <p class="mo" style="color:var(--g)">Jede richtige Antwort liefert einen Buchstaben. Stimmt der Code, stimmt alles.</p>
    </div></div>`,
  })

  // Karten zum Ausschneiden
  seiten.push({
    html: `<div>${kh('Für die Tasche', `${d.karten.length === 6 ? 'Sechs' : d.karten.length} Karten. Ausschneiden, einstecken, benutzen.`, 'Zum Ausschneiden')}
    <div class="inhalt">
      <div class="kk${d.karten.length > 4 ? ' sechs' : ''}">${d.karten.map((k) => `<div class="karte"><div class="o"><h3>${t(k.titel)}</h3>${ic(k.icon)}</div><div class="m">${k.zeilen.map((x) => `<div><span>${t(x)}</span></div>`).join('')}</div>${k.eigen ? `<div class="e"><span><strong>${t(k.eigen)}</strong></span><i></i></div>` : ''}</div>`).join('')}</div>
      <p class="mo" style="color:var(--g);text-align:center">Passt ins Portemonnaie oder hinter die Handyhülle · ${marke}</p>
    </div></div>`,
  })

  // Abspann
  const ab = d.abspann
  seiten.push({
    html: `<div>${kh('Abspann', 'Was bleibt hängen?')}
    <div class="inhalt ab">
      <div class="bon"><h3>Quittung</h3><div class="ze">${marke} · ${esc(d.thema)} · Danke für deine Zeit</div>
        ${ab.posten.map((p) => `<div class="po"><span>1× ${esc(p)}</span><span><i></i> kann ich <i></i> übe ich noch</span></div>`).join('')}
        <div class="su"><span>Summe</span><span>mehr als vorher</span></div></div>
      <div class="bx">${ab.saetze.map((s) => `<div class="satz"><span><strong>${t(s)}</strong></span><div class="linie"></div></div>${linien(1)}`).join('')}</div>
      <div class="bx ak shout"><h3>Shoutout</h3><p>Wer aus der Gruppe hat dich in diesen Wochen überrascht – und womit? Ein Name muss nicht drauf.</p>${linien(1)}</div>
      <p class="mk" style="font-size:15pt;text-align:center">Nächste Ausgabe: gleicher Ort, neues Thema.</p>
    </div></div>`,
  })

  // Leitung
  const lt = d.leitung
  const n = d.tracks.length
  const lkopf = (titel: string) => `<div class="lk"><span class="mark mo">Nur für die Leitung</span><h1>${t(titel)}</h1></div>`
  seiten.push({
    klasse: 'lt',
    html: `<div>${lkopf('Hinweise zum Einsatz')}<div class="inhalt">
      <div class="fakten">${lt.fakten.map((x) => `<div><small>${esc(x[0])}</small><b>${t(x[1])}</b></div>`).join('')}</div>
      <div><h2>Wozu dieses Heft?</h2><p>${t(lt.wozu)}</p></div>
      <div><h2>Lernziele</h2><ul>${lt.lernziele.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>
      <div><h2>Das Heft in den Einheiten</h2><table class="t"><tr><th>Einheit</th><th>Seiten</th><th>So passt das Heft in die 100 Minuten</th></tr>
        <tr><td>vor Einheit ${d.tracks[0].nr}</td><td>1–3</td><td>${t(lt.start)}</td></tr>
        ${d.tracks.map((e, i) => `<tr><td>E${e.nr} · Track ${z2(i + 1)}</td><td>${seiteVon(i)}–${seiteVon(i) + 1}</td><td>${t(e.leitung.einsatz)}</td></tr>`).join('')}
        <tr><td>nach Einheit ${d.tracks[n - 1].nr}</td><td>${seiteVon(n)}–${seiteVon(n) + 3}</td><td>${t(lt.schluss)}</td></tr></table></div>
      <div><h2>Eine Einheit mit dem Heft</h2><div class="zl">
        <div style="flex:10">Ankommen<small>0–10</small></div><div style="flex:6">Brücke<small>10–15</small></div>
        <div class="h" style="flex:30">Hauptteil 1 · Heft<small>15–45 · Szene lesen, Fakten, Move A</small></div><div style="flex:15">Pause<small>45–60</small></div>
        <div class="h" style="flex:25">Hauptteil 2 · Heft<small>60–85 · Challenge, Move B</small></div><div style="flex:11">Skill<small>85–95</small></div><div class="h" style="flex:9">Schluss<small>Line</small></div></div></div>
      <div class="sp2"><div class="kasten"><h2>Wenn es schwerfällt</h2><ul>${lt.hilfe.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>
        <div class="kasten"><h2>Wenn jemand mehr will</h2><ul>${lt.forder.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div></div>
      <div class="kasten g"><h2>Wichtig für das Gespräch</h2><p>${t(lt.gespraech)}</p></div>
    </div></div>`,
  })
  seiten.push({
    klasse: 'lt gross',
    html: `<div>${lkopf('Lösungen und Fragen für die Runde')}<div class="inhalt">
      <p class="klein">Bei offenen Fragen gibt es kein Richtig oder Falsch. Genannt ist, was häufig kommt und woran sich das Gespräch anknüpfen lässt.</p>
      <div class="sp2">${d.tracks.map((e, i) => `<div class="los"><h3>Track ${z2(i + 1)} · ${t(e.titel)}</h3><ul>${e.leitung.loesungen.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>`).join('')}</div>
      <div><h2>Fragen für die Runde</h2><table class="t">${d.tracks.map((e, i) => `<tr><td>Track ${z2(i + 1)}</td><td>${e.leitung.impulse.map((x) => t(x)).join('<br>')}</td></tr>`).join('')}</table></div>
      <div class="sp2"><div class="kasten"><h2>Hot Takes</h2><p>${t(lt.hot)}</p></div>
        <div class="kasten"><h2>Knack den Code</h2><p>Code: <strong>${wort}</strong></p><p>${quizLoesung.map(t).join(' · ')}</p></div></div>
    </div></div>`,
  })
  seiten.push({
    klasse: 'lt gross',
    html: `<div>${lkopf('Material, Druck und Hintergrund')}<div class="inhalt">
      <div><h2>Was Sie je Einheit zusätzlich brauchen</h2><table class="t"><tr><th>Einheit</th><th>Für das Heft</th><th>Aus dem Kurs (Toolbox)</th></tr>
        ${d.tracks.map((e, i) => `<tr><td>E${e.nr} · Track ${z2(i + 1)}</td><td>${t(e.leitung.material)}</td><td>${t(e.leitung.blaetter)}</td></tr>`).join('')}</table></div>
      <div class="sp2"><div class="kasten"><h2>Drucken</h2><ul>${lt.druck.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>
        <div class="kasten g"><h2>Achtung bei dieser Ausgabe</h2><p>${t(lt.achtung)}</p></div></div>
      <div><h2>Fachlicher Hintergrund in Kürze</h2><p>${t(lt.hintergrund)}</p><p class="klein" style="margin-top:1.5mm">${t(lt.quellen)}</p></div>
      <p class="klein">Alle Personen und Szenen im Heft sind erfunden. Zeichnungen: Open Peeps (Pablo Stanley, CC0), Tabler Icons (MIT). Schriften: Anton, Space Grotesk (SIL Open Font License), Permanent Marker (Apache-Lizenz 2.0). Stand: ${esc(d.stand)}.</p>
    </div></div>`,
  })

  const schrift = (datei: string) => readFileSync(join(HIER, 'schrift', datei)).toString('base64')
  const face = (fam: string, w: string, datei: string, range = '') => `@font-face{font-family:'${fam}';font-weight:${w};src:url(data:font/woff2;base64,${schrift(datei)}) format('woff2');${range}}`
  const LAT = 'unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
  const EXT = 'unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'
  const fonts = [
    face('Anton', '400', 'anton-latin-400-normal.woff2', LAT), face('Anton', '400', 'anton-latin-ext-400-normal.woff2', EXT),
    face('Permanent Marker', '400', 'permanent-marker-latin-400-normal.woff2'),
    face('Space Grotesk', '300 700', 'space-grotesk-latin-wght-normal.woff2', LAT), face('Space Grotesk', '300 700', 'space-grotesk-latin-ext-wght-normal.woff2', EXT),
  ].join('\n')
  const css = readFileSync(join(HIER, 'stil.css'), 'utf8')
  const body = seiten.map((s, i) => `<section class="seite ${s.klasse ?? ''}" data-nr="${i + 1}">${s.html}${s.ohneFuss ? '' : fuss(i + 1, s.e)}</section>`).join('\n')
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="datei" content="${esc(d.datei)}"><title>REAL TALK #${esc(d.nr)} – ${esc(d.thema)}</title><style>${fonts}\n${css}\n:root{--a:${d.farbe}}</style></head><body>\n${body}\n<script>${SKRIPT}</script></body></html>`
}

const SKRIPT = `document.fonts.ready.then(function(){
  function frei(el){var cs=getComputedStyle(el),k=[].slice.call(el.children),h=0;k.forEach(function(c){h+=c.getBoundingClientRect().height});
    return el.clientHeight-parseFloat(cs.paddingTop)-h-(k.length-1)*parseFloat(cs.rowGap||0)}
  [].forEach.call(document.querySelectorAll('.inhalt.rs,.inhalt.ls'),function(el){if(frei(el)>68)el.classList.add('luft')});
  document.body.dataset.fertig='1'})`

const ziel = join(HIER, 'aus')
mkdirSync(ziel, { recursive: true })
for (const id of process.argv.slice(2)) {
  const mod = (await import(`./inhalt/${id}.ts`)) as { default: Heft }
  const html = baue(mod.default)
  writeFileSync(join(ziel, `${id}.html`), html)
  console.log(id, '→', `aus/${id}.html`, Math.round(html.length / 1024), 'KB')
}
if (fehler.length) { console.error(fehler.join('\n')); process.exit(1) }

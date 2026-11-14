// Baut eine Ausgabe von „REAL TALK“ (Heft je Modul des Skills-Kurses) als eine HTML-Datei.
//   npx tsx --tsconfig tsconfig.scripts.json dossiers/bau.tsx m5 [m3 …]
// Danach:  node dossiers/pdf.cjs m5   (PDF, Überlauf-Prüfung, Bilder der Seiten)
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import { ZeichnungSvg } from '../src/blatt/ZeichnungSvg'
import { bildZeichnung, bildGueltig, palette } from '../src/blatt/zeichnung'
import qrcode from 'qrcode-generator'
import type { Heft, Frage, Track } from './typen'
import { URHEBER } from '../src/lib/urheber'
import { baueSolo } from './solo-bau'
import { baueAktion } from './aktion-bau'
import type { AktionsHeft } from './aktion-typen'
import type { Solo } from './solo-typen'

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
/** QR-Code als SVG (ein Pfad, scharf im Druck). */
function qr(url: string): string {
  const q = qrcode(0, 'M')
  q.addData(url)
  q.make()
  const n = q.getModuleCount()
  let pfad = ''
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) pfad += `M${c} ${r}h1v1h-1z`
  return `<svg viewBox="-2 -2 ${n + 4} ${n + 4}" shape-rendering="crispEdges"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#fff"/><path d="${pfad}" fill="#111"/></svg>`
}
/** youtu.be-Kurzlink zum Abtippen */
const kurzlink = (url: string) => {
  const m = url.match(/[?&]v=([\w-]{6,})/) ?? url.match(/youtu\.be\/([\w-]{6,})/)
  return m ? 'youtu.be/' + m[1] : url.replace(/^https?:\/\/(www\.)?/, '')
}
const ic = (name: string) => `<span class="ic">${icon(name)}</span>`
const linien = (n: number) => Array.from({ length: n }, () => '<div class="linie"></div>').join('')
const tape = (i: string, s: string, a = false) => `<div class="tape mo${a ? ' a' : ''}">${ic(i)}${esc(s)}</div>`

function frage(f: Frage, i: number): string {
  let a = ''
  if (f.kreis) a += `<div class="kreise">${f.kreis.map((w) => `<span>${t(w)}</span>`).join('')}</div>`
  if (f.kreuz) a += `<div class="kreuze${f.unter ? ' unter' : ''}">${f.kreuz.map((w) => `<span><i></i>${t(w)}</span>`).join('')}</div>`
  if (f.skala) a += `<div class="skala">${f.skala.map((w) => `<span class="mo">${t(w)}</span><div class="zahlen">${[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((n) => `<span>${n}</span>`).join('')}</div>`).join('')}</div>`
  if (f.regler) a += `<div class="skala reg">${f.regler.map((w) => `<span class="mo">${t(w)}</span><div class="zahlen">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `<span>${n}</span>`).join('')}</div>`).join('')}</div>`
  if (f.satz) a += f.satz.map((w) => `<div class="satz"><span>${t(w)}</span><div class="linie"></div></div>`).join('')
  if (f.raster) a += `<div class="raster" style="grid-template-columns:1fr repeat(${f.raster.spalten.length},auto)"><span></span>${f.raster.spalten.map((w) => `<b class="mo">${t(w)}</b>`).join('')}${f.raster.zeilen.map((z) => `<span>${t(z)}</span>${f.raster!.spalten.map(() => '<i></i>').join('')}`).join('')}</div>`
  if (f.preis) a += `<div class="preis"><span class="k mo">${t(f.preis.erste ?? 'Möglichkeit')}</span><span class="k mo">${t(f.preis.kopf[0])}</span><span class="k mo">${t(f.preis.kopf[1])}</span>${f.preis.optionen.map((o) => `<span class="o">${t(o)}</span><span></span><span></span>`).join('')}</div>`
  if (f.zahl) a += `<div class="zahl">${f.zahl.map((w) => `<div><span>${t(w)}</span><i></i></div>`).join('')}</div>`
  if (f.gitter) a += `<div class="gitter">${f.gitter.map((w) => `<div>${t(w)}</div>`).join('')}</div>`
  if (f.striche) a += `<div class="striche">${f.striche.map((w) => `<span class="mo l">${t(w[0])}</span><div></div><span class="mo">${t(w[1])}</span>`).join('')}</div>`
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
  const nT = d.tracks.length
  const kk = d.kino ? 1 : 0
  const nAkt = d.tracks.reduce((x, e) => x + e.gruppe.length, 0)
  /** Sessions-Seiten: bis acht Aktionen zwei Seiten, sonst vier Aktionen je Seite */
  const nSes = nAkt > 8 ? Math.ceil(nAkt / 4) : 2
  const S = { ses: seiteVon(nT), kino: seiteVon(nT) + nSes, hot: seiteVon(nT) + nSes + kk, code: seiteVon(nT) + nSes + 1 + kk, karten: seiteVon(nT) + nSes + 2 + kk, ab: seiteVon(nT) + nSes + 3 + kk }
  /** Text mit Seiten-Platzhaltern: {K} Karten, {J} letzte Seite für Jugendliche, {L} Seiten der Leitung, {S} Sessions */
  const tp = (x: string) => t(x.replace(/\{K\}/g, String(S.karten)).replace(/\{J\}/g, String(S.ab)).replace(/\{L\}/g, `${S.ab + 1}–${S.ab + 3}`).replace(/\{S\}/g, `${S.ses}–${S.ses + nSes - 1}`))

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
        <div class="t x"><div class="z">+</div><div class="tx"><h3>Sessions · ${d.kino ? 'Kino · ' : ''}Hot Takes · Code · Karten</h3><p>Aktionen für die ganze Gruppe, ${d.kino ? 'der Film des Trimesters, ' : ''}Streiten nach Regeln, Karten für die Tasche.</p></div><div class="s mo">S. ${S.ses}</div></div></div>
      <div class="gr">${tape('users', 'Cast – alle erfunden, alles schon passiert')}
        <div class="cast">${d.cast.map((c) => `<div class="c"><div class="b"><div class="pk punkt"></div><div class="fig">${figur(c.bild)}</div></div><div class="tx"><h3>${t(c.name)}</h3><p>${t(c.x)}</p></div></div>`).join('')}</div></div>
      <div class="bx warm"><h3>${t(d.warm.titel)}</h3><p>${t(d.warm.text)}</p>${d.warm.fragen.map(frage).join('')}</div>
    </div></div>`,
  })

  // Doppelseiten je Track
  d.tracks.forEach((e, i) => {
    seiten.push({
      e: i,
      html: `<div><div class="th"><div class="znr">${z2(i + 1)}</div><div class="lab mo">Track ${z2(i + 1)}</div><h1 class="an${e.titel.length > 15 ? ' kl' : ''}">${t(e.titel)}</h1><div class="ut">${t(e.unter)}</div></div>
      <div class="inhalt ls">
        <div class="gr">${tape('movie', 'Szene')}
          <div class="bx p szene"><div class="wer"><div class="pk punkt"></div><div class="fig">${figur(e.szene.bild)}</div><div class="nm mo">${esc(e.szene.name)}</div></div>
          <div class="tx"><p>${t(e.szene.text)}</p><div class="fr mk">${ic('arrow-big-right')}<span>${t(e.szene.frage)}</span></div><div class="linie"></div></div></div></div>
        <div class="gr">${tape('bulb', e.faktenTitel ?? 'Was dahinter steckt')}
          <div class="fk${e.fakten.length > 3 ? ' sechs' : ''}">${e.fakten.map((x, k) => `<div><div class="z">${k + 1}</div><h3>${t(x.t)}</h3><p>${t(x.x)}</p></div>`).join('')}</div></div>
        ${e.clip ? `<div class="clip"><div class="qr">${qr(e.clip.url)}</div><div class="tx"><div class="lab mo">${ic('player-play')}Clip zum Track · ${esc(e.clip.dauer)}</div><h3>${t(e.clip.titel)}</h3><div class="ka mo">${esc(e.clip.kanal)} · ${esc(kurzlink(e.clip.url))}</div><div class="fr2">${t(e.clip.frage)}</div></div></div>` : ''}
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
        <div class="zwei"><div class="bx ak ch"><div class="lab mo"><span>Challenge</span><span>${esc(e.challenge.wie)}</span></div><h3>${t(e.challenge.titel)}</h3><p>${t(e.challenge.x)}</p>${e.challenge.zu3 ? `<p class="z3"><b class="mo">Zu dritt</b> ${t(e.challenge.zu3)}</p>` : ''}</div>
          <div class="bx ln"><div class="lab mo">Dein Satz</div><h3>${t(e.line.titel)}</h3><p>${tp(e.line.x)}</p>${e.line.feld ? `<div class="feld" style="height:${e.line.feld}mm"></div>` : ''}${e.line.kaestchen ? `<div class="wk">${e.line.kaestchen.map((k) => `<span><i></i><b class="mo">${esc(k)}</b></span>`).join('')}</div>` : ''}${linien(e.line.linien ?? 0)}</div></div>
        <div class="wo"><span class="mo">Diese Woche</span><span>${t(e.woche)}</span></div>
        <div class="vibe"><span class="mo">Erledigt <i></i></span><span class="mo">Der Track war: <i></i> nichts für mich <i></i> okay <i></i> gut</span><span class="mo">Datum: ____________</span></div>
        ${e.hilfe ? `<div class="hilfe">${ic('phone')}<span>${t(d.hilfeText ?? 'Wenn dich etwas belastet: Sprich mit jemandem, dem du vertraust. Kanner-Jugendtelefon **116 111** · Notruf **112**')}</span></div>` : ''}
      </div></div>`,
    })
  })

  // Sessions: Aktionen für die ganze Gruppe
  const WANN = { Start: 0, Mitte: 1, Schluss: 2 } as const
  const WANN_TEXT = { Start: 'zum Start', Mitte: 'mittendrin', Schluss: 'zum Schluss' } as const
  const alle = d.tracks.flatMap((e, i) => e.gruppe.map((g) => ({ ...g, tr: i })).sort((a, b) => (a.wann ? WANN[a.wann] : 1) - (b.wann ? WANN[b.wann] : 1)))
  const ses = (g: (typeof alle)[number]) => `<div class="se"><div class="kp"><span class="mo tr2">Track ${z2(g.tr + 1)}${g.wann ? ' · ' + WANN_TEXT[g.wann] : ''}</span><span class="mo">${esc(g.wer)} · ${esc(g.zeit)}</span></div><h3>${t(g.titel)}</h3><div class="mat mo">${ic('box')}<span>${esc(g.material)}</span></div><ol>${g.schritte.map((x) => `<li><span>${t(x)}</span></li>`).join('')}</ol>${g.zu3 ? `<div class="l2"><b class="mo">Zu dritt</b><span>${t(g.zu3)}</span></div>` : ''}${g.level2 ? `<div class="l2"><b class="mo">Level 2</b><span>${t(g.level2)}</span></div>` : ''}<div class="da">${ic('message-circle')}<span>${t(g.frage)}</span></div></div>`
  const teile = nAkt > 8 ? Array.from({ length: nSes }, (_, i) => alle.slice(i * 4, i * 4 + 4)) : [alle.slice(0, Math.ceil(alle.length / 2)), alle.slice(Math.ceil(alle.length / 2))]
  const regel = (x: string) => `<div class="se regel${x}"><h3>Für jede Session gilt</h3><ol><li><span>Wer nicht mitspielen will, schaut zu, stoppt die Zeit oder ist Jury.</span></li><li><span>Gespielt wird mit erfundenen Situationen – nie mit echten Leuten aus der Gruppe.</span></li><li><span>Seid ihr nur zu dritt: Die Leitung spielt mit. Statt zwei Teams seid ihr ein Team gegen die Uhr.</span></li><li><span>Nach dem Spiel: Rolle abschütteln. So ist hier niemand wirklich.</span></li></ol></div>`
  const eigen = (x: string) => `<div class="se eigen${x}"><h3>Eure Session</h3><p>Erfindet eine eigene Aktion zum Thema. Wer sie erfindet, leitet sie an.</p><div class="satz"><span><strong>Name:</strong></span><div class="linie"></div></div><div class="satz"><span><strong>So geht es:</strong></span><div class="linie"></div></div>${linien(1)}</div>`
  teile.forEach((g, i) => {
    const erste = i === 0
    const letzte = i === teile.length - 1
    const x = g.length % 2 === 0 ? ' x' : ''
    seiten.push({
      html: `<div>${kh('Sessions', erste ? `${alle.length} Aktionen für die ganze Gruppe` : letzte ? 'Letzter Teil – und Platz für eure eigene' : 'Teil zwei', letzte && !erste ? 'Selbst anleiten' : 'Alle machen mit')}
    <div class="inhalt"><div class="ses">${g.map(ses).join('')}${erste ? regel(x) : letzte ? eigen(x) : ''}</div>
    </div></div>`,
    })
  })

  // Kino
  const kino = d.kino
  if (kino) seiten.push({
    html: `<div>${kh('Kino', kino.filme.length === 1 ? 'Der Film dieses Trimesters' : 'Ein Film für die Gruppe – und einer für danach', 'Popcorn erlaubt')}
    <div class="inhalt">
      <div class="filme${kino.filme.length === 1 ? ' eins' : ''}">${kino.filme.map((f, i) => `<div class="film"><div class="ab mo"><span>${i === 0 ? 'Hauptfilm' : 'Noch ein Tipp'}</span><span>${f.jahr} · ${f.fsk === null ? 'FSK prüfen' : 'FSK ' + f.fsk} · ${esc(f.laenge)}</span></div><h3>${t(f.titel)}</h3><p>${t(f.worum)}</p><div class="ach"><span class="mo">Achte auf</span><ul>${f.achte.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>${f.achtung ? `<div class="warn mo">${ic('alert-triangle')}<span>${t(f.achtung)}</span></div>` : ''}</div>`).join('')}</div>
      <div class="kz"><div class="gr">${tape('layout-grid', 'Kino-Bingo zum Hauptfilm', true)}
          <div class="bingo">${kino.bingo.map((x) => `<div>${t(x)}</div>`).join('')}</div><p class="mo" style="color:var(--g)">Entdeckt? Ankreuzen. Drei in einer Reihe: leise „Bingo“.</p></div>
        <div class="bx nach"><div class="tape mo" style="margin-bottom:2.4mm">${ic('message-circle')}Nach dem Abspann</div>${kino.nachher.map((x, i) => frage({ f: x, linien: 2 }, i)).join('')}</div></div>
      <div class="vibe"><span class="mo">Meine Wertung: <i></i><i></i><i></i><i></i><i></i> Popcorn</span><span class="mo">Beste Szene: ______________________________</span></div>
    </div></div>`,
  })

  // Hot Takes
  seiten.push({
    html: `<div>${kh('Hot Takes', d.hot.unter, 'Kein Richtig, kein Falsch')}
    <div class="inhalt">
      <p style="font-size:10.8pt">${t(d.hot.regeln)} Seid ihr nur zu dritt: Die Leitung stellt sich mit auf – und bei heiklen Sätzen reicht das Kreuz im Heft.</p>
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
      <div class="kk${d.karten.length > 4 ? ' sechs' : ''}">${d.karten.map((k) => `<div class="karte"><div class="o"><h3>${t(k.titel)}</h3>${ic(k.icon)}</div><div class="m">${k.zeilen.map((x) => (x.startsWith('_') ? `<p class="leer"><b>${esc(x.slice(1))}</b><i></i></p>` : `<div><span>${t(x)}</span></div>`)).join('')}</div>${k.eigen ? `<div class="e"><span><strong>${t(k.eigen)}</strong></span><i></i></div>` : ''}</div>`).join('')}</div>
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
      <div class="bx ak shout"><h3>Respekt an</h3><p>Wer aus der Gruppe hat dich in diesen Wochen überrascht – und womit? Ein Name muss nicht drauf.</p>${linien(1)}</div>
      <p class="mk" style="font-size:15pt;text-align:center">${t(ab.schluss ?? 'Nächste Ausgabe: gleicher Ort, neues Thema.')}</p>
    </div></div>`,
  })

  // Leitung
  const lt = d.leitung
  const n = d.tracks.length
  const ablauf = (e: Track) => {
    if (!e.gruppe.some((x) => x.wann)) return ''
    const alle2 = [{ titel: `Challenge „${e.challenge.titel}“`, wann: e.challenge.wann ?? 'Mitte' }, ...e.gruppe.map((x) => ({ titel: x.titel, wann: x.wann ?? 'Mitte' }))]
    const g = (w: string) => alle2.filter((x) => x.wann === w).map((x) => esc(x.titel)).join(', ')
    return `<span class="abl">${['Start', 'Mitte', 'Schluss'].filter((w) => g(w)).map((w) => `<b>${w}:</b> ${g(w)}`).join(' · ')}</span>`
  }
  const lkopf = (titel: string) => `<div class="lk"><span class="mark mo">Nur für die Leitung</span><h1>${t(titel)}</h1></div>`
  seiten.push({
    klasse: 'lt eng',
    html: `<div>${lkopf('Hinweise zum Einsatz')}<div class="inhalt">
      <div class="fakten">${lt.fakten.map((x) => `<div><small>${esc(x[0])}</small><b>${t(x[1])}</b></div>`).join('')}</div>
      <div><h2>Wozu dieses Heft?</h2><p>${t(lt.wozu)}</p></div>
      <div><h2>Lernziele</h2><ul>${lt.lernziele.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>
      <div><h2>Das Heft in den Einheiten</h2><table class="t"><tr><th>Einheit</th><th>Seiten</th><th>So passt das Heft in die 100 Minuten</th></tr>
        <tr><td>vor Einheit ${d.tracks[0].nr}</td><td>1–3</td><td>${t(lt.start)}</td></tr>
        ${d.tracks.map((e, i) => `<tr><td>E${e.nr} · Track ${z2(i + 1)}</td><td>${seiteVon(i)}–${seiteVon(i) + 1}</td><td>${tp(e.leitung.einsatz)}${ablauf(e)}</td></tr>`).join('')}
        <tr><td>nach Einheit ${d.tracks[n - 1].nr}</td><td>${S.ses + nSes}–${S.ab}</td><td>${tp(lt.schluss)}</td></tr></table></div>
      <div><h2>Eine Einheit mit dem Heft</h2><div class="zl">
        <div style="flex:10">Ankommen<small>0–10 · Session zum Start</small></div><div style="flex:6">Brücke<small>10–15</small></div>
        <div class="h" style="flex:30">Hauptteil 1 · Heft<small>15–45 · Szene lesen, Fakten, Move A</small></div><div style="flex:15">Pause<small>45–60</small></div>
        <div class="h" style="flex:25">Hauptteil 2 · Heft<small>60–85 · Challenge, Move B, Session</small></div><div style="flex:11">Skill<small>85–95 · Session zum Schluss</small></div><div class="h" style="flex:9">Schluss<small>Dein Satz</small></div></div></div>
      <div class="sp2"><div class="kasten"><h2>Wenn es schwerfällt</h2><ul>${lt.hilfe.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>
        <div class="kasten"><h2>Wenn jemand mehr will</h2><ul>${lt.forder.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div></div>
      <div class="kasten g"><h2>Wichtig für das Gespräch</h2><p>${t(lt.gespraech)}</p></div>
    </div></div>`,
  })
  seiten.push({
    klasse: n > 4 ? 'lt' : 'lt gross',
    html: `<div>${lkopf('Lösungen und Fragen für die Runde')}<div class="inhalt">
      <p class="klein">Bei offenen Fragen gibt es kein Richtig oder Falsch. Genannt ist, was häufig kommt und woran sich das Gespräch anknüpfen lässt.</p>
      <div class="sp2">${d.tracks.map((e, i) => `<div class="los"><h3>Track ${z2(i + 1)} · ${t(e.titel)}</h3><ul>${e.leitung.loesungen.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>`).join('')}</div>
      <div><h2>Fragen für die Runde</h2><table class="t">${d.tracks.map((e, i) => `<tr><td>Track ${z2(i + 1)}</td><td>${e.leitung.impulse.map((x) => t(x)).join('<br>')}</td></tr>`).join('')}</table></div>
      <div class="sp2"><div class="kasten"><h2>Hot Takes</h2><p>${t(lt.hot)}</p></div>
        <div class="kasten"><h2>Knack den Code</h2><p>Code: <strong>${wort}</strong></p><p>${quizLoesung.map(t).join(' · ')}</p></div></div>
    </div></div>`,
  })
  seiten.push({
    klasse: n > 4 ? 'lt eng' : 'lt',
    html: `<div>${lkopf('Material, Videos, Druck und Hintergrund')}<div class="inhalt">
      <div><h2>Was Sie je Einheit zusätzlich brauchen</h2><table class="t"><tr><th>Einheit</th><th>Für das Heft</th><th>Aus dem Kurs (Toolbox)</th></tr>
        ${d.tracks.map((e, i) => `<tr><td>E${e.nr} · Track ${z2(i + 1)}</td><td>${t(e.leitung.material)}</td><td>${t(e.leitung.blaetter)}</td></tr>`).join('')}</table></div>
      <div><h2>${kino ? 'Videos und Film' : 'Videos'} (Links geprüft am ${esc(d.geprueft ?? kino?.geprueft ?? '14.11.2026')})</h2><table class="t"><tr><th>Wo</th><th>Titel und Kanal</th><th>Link</th><th>läuft</th></tr>
        ${d.tracks.filter((e) => e.clip).map((e) => `<tr><td>Track ${z2(d.tracks.indexOf(e) + 1)}</td><td>${t(e.clip!.titel)} – ${esc(e.clip!.kanal)} (${esc(e.clip!.dauer)})</td><td>${esc(kurzlink(e.clip!.url))}</td><td>☐</td></tr>`).join('')}
        ${(kino?.filme ?? []).map((f) => `<tr><td>Kino</td><td>${t(f.titel)} (${f.jahr}, ${esc(f.laenge)}, ${f.fsk === null ? 'FSK vor dem Einsatz prüfen' : 'FSK ' + f.fsk})${f.achtung ? ' – ' + t(f.achtung) : ''}</td><td>DVD, Mediathek oder Streaming</td><td>☐</td></tr>`).join('')}</table>
        <p class="klein" style="margin-top:1mm">Videos können verschwinden: vor jeder Einheit kurz öffnen.${kino ? ' Den Film vorher selbst ansehen und die Vorführrechte der Einrichtung beachten.' : ''}</p></div>
      <div class="sp2"><div class="kasten"><h2>Drucken</h2><ul>${lt.druck.map((x) => `<li>${tp(x)}</li>`).join('')}</ul></div>
        <div class="kasten g"><h2>Achtung bei dieser Ausgabe</h2><p>${t(lt.achtung)}</p></div></div>
      <div><h2>Fachlicher Hintergrund in Kürze</h2><p>${t(lt.hintergrund)}</p><p class="klein" style="margin-top:1.5mm">${t(lt.quellen)}</p></div>
      <p class="klein">Alle Personen und Szenen im Heft sind erfunden. Zeichnungen: Open Peeps (Pablo Stanley, CC0), Tabler Icons (MIT). Schriften: Anton, Space Grotesk (SIL Open Font License), Permanent Marker (Apache-Lizenz 2.0). ${esc(URHEBER.de)} Stand: ${esc(d.stand)}.</p>
    </div></div>`,
  })

  const body = seiten.map((s, i) => `<section class="seite ${s.klasse ?? ''}" data-nr="${i + 1}">${s.html}${s.ohneFuss ? '' : fuss(i + 1, s.e)}</section>`).join('\n')
  return huelle(d.datei, `REAL TALK #${d.nr} – ${d.thema}`, d.farbe, body)
}

function huelle(datei: string, titel: string, farbe: string, body: string, ordner = 'real-talk'): string {
  const schrift = (f: string) => readFileSync(join(HIER, 'schrift', f)).toString('base64')
  const face = (fam: string, w: string, f: string, range = '') => `@font-face{font-family:'${fam}';font-weight:${w};src:url(data:font/woff2;base64,${schrift(f)}) format('woff2');${range}}`
  const LAT = 'unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
  const EXT = 'unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'
  const fonts = [
    face('Anton', '400', 'anton-latin-400-normal.woff2', LAT), face('Anton', '400', 'anton-latin-ext-400-normal.woff2', EXT),
    face('Permanent Marker', '400', 'permanent-marker-latin-400-normal.woff2'),
    face('Space Grotesk', '300 700', 'space-grotesk-latin-wght-normal.woff2', LAT), face('Space Grotesk', '300 700', 'space-grotesk-latin-ext-wght-normal.woff2', EXT),
  ].join('\n')
  const css = readFileSync(join(HIER, 'stil.css'), 'utf8')
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="datei" content="${esc(datei)}"><meta name="ordner" content="${esc(ordner)}"><title>${esc(titel)}</title><style>${fonts}\n${css}\n:root{--a:${farbe}}</style></head><body>\n${body}\n<script>${SKRIPT}</script></body></html>`
}

/** Jahresplan für die Leitung: alle Ausgaben, Videos und Filme auf drei Seiten. */
function bauePlan(hefte: Heft[]): string {
  const z2 = (n: number) => String(n).padStart(2, '0')
  const einh = (d: Heft) => { const a = [...new Set(d.tracks.map((x) => x.nr))]; return a.length > 1 ? `E${a[0]}–E${a[a.length - 1]}` : `E${a[0]}` }
  const kopf = (titel: string) => `<div class="lk"><span class="mark mo">Nur für die Leitung</span><h1>${t(titel)}</h1></div>`
  const punkt = (d: Heft) => `<i class="pk" style="background:${d.farbe}"></i>`
  const clips = hefte.flatMap((d) => d.tracks.map((e, i) => ({ d, e, i })).filter((x) => x.e.clip))
  const filme = hefte.flatMap((d) => (d.kino?.filme ?? []).map((f) => ({ d, f })))
  const reserve = hefte.flatMap((d) => (d.reserve ?? []).map((f) => ({ d, f })))
  const seiten = [
    `<div>${kopf('Das Jahr auf einen Blick')}<div class="inhalt">
      <p><strong>REAL TALK</strong> begleitet das erste Jahr des Skills-Kurses: neun Ausgaben, ${hefte.reduce((s, d) => s + d.tracks.length, 0)} Tracks, ${clips.length} Videos und ein Film je Trimester. Jede Ausgabe gehört zu einem Modul. Ein Track passt in eine Einheit; wo ein Modul mehr Stoff hat, gibt es Zusatz-Tracks für einen eigenen Termin.</p>
      <table class="t plan"><tr><th>Ausgabe</th><th>Einheiten</th><th>Tracks</th><th>Kino</th><th>Seiten</th></tr>
      ${hefte.map((d) => `<tr><td>${punkt(d)}#${esc(d.nr)} ${esc(d.thema)}</td><td>${einh(d)}</td><td>${d.tracks.map((e, i) => `${z2(i + 1)} ${esc(e.titel)}`).join(' · ')}</td><td>${d.kino ? d.kino.filme.map((f) => esc(f.titel)).join(' · ') : '–'}</td><td>${10 + (d.kino ? 1 : 0) + d.tracks.length * 2 + (d.tracks.reduce((x, e) => x + e.gruppe.length, 0) > 8 ? Math.ceil(d.tracks.reduce((x, e) => x + e.gruppe.length, 0) / 4) : 2)}</td></tr>`).join('')}</table>
      <div class="zwei">
        <div class="kasten"><h2>So ist jede Ausgabe gebaut</h2><ul><li><span><strong>Titel, Ansage, Tracklist</strong> – Einstieg, etwa 10 Minuten</span></li><li><span><strong>Je Track eine Doppelseite</strong> – links Szene, Fakten, Clip, Mythos/Real; rechts „Dein Move“ mit Challenge</span></li><li><span><strong>Sessions</strong> – die Gruppenspiele in Kurzform</span></li><li><span><strong>Hot Takes, Knack den Code</strong> – Streiten nach Regeln und Wiederholung</span></li><li><span><strong>Kino</strong> – nur in drei Ausgaben: ein Film je Trimester</span></li><li><span><strong>Karten und Abspann</strong> – zum Mitnehmen und für die Rückmeldung</span></li><li><span><strong>Drei Seiten für die Leitung</strong> – Einsatz, Lösungen, Material</span></li></ul></div>
        <div class="kasten g"><h2>Ein möglicher Rhythmus</h2><ul><li><span><strong>Pro Einheit ein Track.</strong> Das Heft ersetzt die Arbeitsblätter der Einheit, nicht die Spiele.</span></li><li><span><strong>Sessions verteilen:</strong> eine zum Start, eine mittendrin oder zum Schluss. Der Zeitpunkt steht auf jeder Karte.</span></li><li><span><strong>Ein Film pro Trimester</strong> – als eigener Termin, mit Bingo und drei Fragen. Mehr braucht es nicht.</span></li><li><span><strong>Letzte Einheit des Moduls:</strong> Hot Takes, Code, Karten, Abspann.</span></li><li><span><strong>Die Hefte bleiben im Raum</strong> oder gehen am Ende des Moduls mit nach Hause – die Gruppe entscheidet.</span></li></ul></div>
      </div>
      <div class="kasten"><h2>Kleine Gruppe: drei bis sechs Jugendliche</h2><ul><li><span><strong>Zu dritt spielt die Leitung mit.</strong> Statt zwei Teams gibt es ein Team gegen die Uhr oder gegen die eigene erste Runde. Wo es mehr braucht, steht auf der Karte der Hinweis „Zu dritt“.</span></li><li><span><strong>Niemand steht allein da.</strong> Bei Linien und Aufstellungen stellt sich die Leitung mit auf. Anonyme Zettel schreibt sie mit, damit niemand erkennbar ist.</span></li><li><span><strong>Zeit:</strong> Zu dritt sind Kreis- und Ratespiele schneller vorbei. Eine zweite Runde oder „Level 2“ einplanen – oder früher Schluss machen.</span></li><li><span><strong>Wenn Ausgang, eigene Handys oder Material fehlen:</strong> Draußen-Übungen am Fenster oder im Flur machen, Fotos und Songs über ein Gerät der Leitung, Kühlpack statt Eiswürfel.</span></li><li><span><strong>Augen zu und Berührung</strong> sind immer freiwillig. Der Blick auf den Boden reicht, geschrieben wird auf Zettel statt auf den Rücken.</span></li></ul></div>
      <p class="klein">Alle Personen und Szenen in den Heften sind erfunden. Die Figuren kehren in mehreren Ausgaben wieder; ihre Geschichten passen zueinander.</p>
    </div></div>`,
    ...[0, 1].map((teil) => { const liste = clips.filter((c) => (Number(c.d.nr) <= 3) === (teil === 0)); return `<div>${kopf(teil === 0 ? 'Alle Videos · #00 bis #03' : 'Alle Videos · #04 bis #08')}<div class="inhalt">
      ${teil === 0 ? '<p>Die Videos werden im Heft per QR-Code geöffnet. <strong>Bitte jedes Video vor dem Einsatz selbst ansehen:</strong> Geprüft ist nur, dass es unter diesem Titel und Kanal abrufbar war. Inhalt und Länge wurden nicht gesichtet. Wo „die ersten 5 Min.“ steht, reicht ein Ausschnitt.</p>' : ''}
      <table class="t plan"><tr><th>Ausgabe · Track</th><th>Video</th><th>Kanal</th><th>Link</th></tr>
      ${liste.map(({ d, e, i }) => `<tr><td>${punkt(d)}#${esc(d.nr)} · ${z2(i + 1)} ${esc(e.titel)}</td><td>${esc(e.clip!.titel)}</td><td>${esc(e.clip!.kanal)}</td><td class="mo">${esc(kurzlink(e.clip!.url))}</td></tr>`).join('')}</table>
      ${teil === 1 ? '<p class="klein">Verschwindet ein Video, bleibt der Track vollständig: Szene, Fakten und Moves funktionieren ohne Clip. Tracks ohne Video sind Absicht – dort wurde kein passendes gefunden.</p>' : ''}
    </div></div>` }),
    `<div>${kopf('Ein Film pro Trimester')}<div class="inhalt">
      <p>REAL TALK ist kein Filmkurs. Pro Trimester läuft <strong>ein Film</strong> – dort, wo er zum Thema passt und etwas zeigt, das sich nicht erklären lässt. Die Kino-Seite steht nur in diesen drei Ausgaben.</p>
      <table class="t plan fi"><tr><th>Trimester</th><th>Film</th><th>FSK</th><th>Länge</th><th>Vorher wissen</th></tr>
      ${filme.map(({ d, f }, i) => `<tr><td>${punkt(d)}${i + 1} · #${esc(d.nr)} ${esc(d.thema)}</td><td><strong>${esc(f.titel)}</strong> (${f.jahr})</td><td>${f.fsk === null ? '–' : f.fsk}</td><td>${esc(f.laenge)}</td><td>${esc(f.achtung ?? '–')}</td></tr>`).join('')}</table>
      ${reserve.length ? `<div><h2>Ersatz, falls ein Film nicht zur Gruppe passt</h2><table class="t plan fi"><tr><th>Statt</th><th>Film</th><th>FSK</th><th>Länge</th><th>Vorher wissen</th></tr>
      ${reserve.map(({ d, f }) => `<tr><td>${punkt(d)}#${esc(d.nr)} ${esc(d.thema)}</td><td><strong>${esc(f.titel)}</strong> (${f.jahr})</td><td>${f.fsk === null ? '–' : f.fsk}</td><td>${esc(f.laenge)}</td><td>${esc(f.achtung ?? '–')}</td></tr>`).join('')}</table><p class="klein" style="margin-top:1mm">Zum Ersatzfilm gibt es keine Kino-Seite im Heft. Das Bingo passt meist trotzdem; die drei Fragen nach dem Abspann stellen Sie mündlich.</p></div>` : ''}
      <div class="zwei">
        <div class="kasten g"><h2>Vor dem Film</h2><ul><li><span><strong>Selbst ansehen.</strong> Die Hinweise oben ersetzen das nicht – Sie kennen Ihre Gruppe.</span></li><li><span><strong>Altersfreigabe prüfen.</strong> Die Angaben stammen aus Kino- und Filmdatenbanken, nicht direkt von der FSK.</span></li><li><span><strong>Vorführrechte klären.</strong> Eine Vorführung in der Gruppe ist keine private Nutzung; es gelten die Regeln Ihrer Einrichtung.</span></li></ul></div>
        <div class="kasten"><h2>Im Heft dazu</h2><ul><li><span><strong>Bingo:</strong> neun Felder zum Abhaken während des Films.</span></li><li><span><strong>Nach dem Abspann:</strong> drei Fragen für die Runde.</span></li><li><span><strong>Wertung:</strong> Jede Person bewertet den Film.</span></li><li><span>Ein langer Film darf in zwei Teilen laufen.</span></li></ul></div>
      </div>
      <p class="klein">Stand: ${esc(hefte[hefte.length - 1].stand)}. Zeichnungen: Open Peeps (Pablo Stanley, CC0), Tabler Icons (MIT). Schriften: Anton, Space Grotesk (SIL Open Font License), Permanent Marker (Apache-Lizenz 2.0). ${esc(URHEBER.de)}</p>
    </div></div>`,
  ]
  const body = seiten.map((h, i) => `<section class="seite lt plan" data-nr="${i + 1}">${h}<div class="fuss"><span class="mo">REAL TALK · Jahresplan</span><span></span><span class="nr">${i + 1}</span></div></section>`).join('\n')
  return huelle('Real-Talk-Jahresplan', 'REAL TALK – Jahresplan', '#FFD60A', body)
}

const SKRIPT = `document.fonts.ready.then(function(){
  function frei(el){var cs=getComputedStyle(el),k=[].slice.call(el.children),h=0;k.forEach(function(c){h+=c.getBoundingClientRect().height});
    return el.clientHeight-parseFloat(cs.paddingTop)-h-(k.length-1)*parseFloat(cs.rowGap||0)}
  [].forEach.call(document.querySelectorAll('.inhalt.rs,.inhalt.ls,.inhalt.sol'),function(el){if(frei(el)>68)el.classList.add('luft')});
  [].forEach.call(document.querySelectorAll('.inhalt.ak'),function(el){if(frei(el)>300)el.classList.add('luft')});
  document.body.dataset.fertig='1'})`

const ziel = join(HIER, 'aus')
mkdirSync(ziel, { recursive: true })
for (const id of process.argv.slice(2)) {
  let html: string
  if (id === 'plan') {
    const hefte: Heft[] = []
    for (let i = 0; i <= 8; i++) hefte.push(((await import(`./inhalt/m${i}.ts`)) as { default: Heft }).default)
    html = bauePlan(hefte)
  } else if (id === 'solo-index') {
    // Verzeichnis der SOLO-Hefte für die Toolbox (Bereich „Bezugszeit“): Kopfdaten, Videos und Quiz
    const dateien = readdirSync(join(HIER, 'solo')).filter((f) => /^s\d+\.ts$/.test(f)).sort()
    const liste = []
    for (const f of dateien) {
      const d = ((await import(`./solo/${f}`)) as { default: Solo }).default
      const clips = d.seiten.flatMap((x) => x.bloecke.flatMap((b) => (b.art === 'clip' ? [b.clip] : [])))
      // Aktions-Heft (acht Aktionen zum Machen), falls es eines zu diesem Thema gibt
      const ak = join(HIER, 'aktion', `a${d.nr}.ts`)
      const aktion = existsSync(ak) ? ((await import(`./aktion/a${d.nr}.ts`)) as { default: AktionsHeft }).default.datei : undefined
      liste.push({ id: d.id, nr: d.nr, reihe: d.reihe, thema: d.thema, headline: d.headline, farbe: d.farbe, datei: d.datei, aktion, wann: d.begleitung.wann, ziel: d.begleitung.ziel,
        clips: clips.map((c) => ({ titel: c.titel, kanal: c.kanal, url: c.url, dauer: c.dauer })), quiz: d.quiz ?? [] })
    }
    writeFileSync(join(HIER, '..', 'src', 'data', 'solo.json'), JSON.stringify(liste, null, 1) + '\n')
    console.log('solo-index →', 'src/data/solo.json', liste.length, 'Hefte')
    continue
  } else if (/^a\d/.test(id)) {
    // SOLO AKTION: Hefte zum Machen (je Thema acht Aktionen)
    const mod = (await import(`./aktion/${id}.ts`)) as { default: AktionsHeft }
    html = baueAktion(mod.default, { t, esc, figur, ic, qr, kurzlink, linien, tape, frage, huelle, urheber: URHEBER.de })
  } else if (/^s\d/.test(id)) {
    // SOLO: Hefte für die Bezugszeit
    const mod = (await import(`./solo/${id}.ts`)) as { default: Solo }
    html = baueSolo(mod.default, { t, esc, figur, ic, qr, kurzlink, linien, tape, frage, huelle, urheber: URHEBER.de })
  } else {
    const mod = (await import(`./inhalt/${id}.ts`)) as { default: Heft }
    html = baue(mod.default)
  }
  writeFileSync(join(ziel, `${id}.html`), html)
  console.log(id, '→', `aus/${id}.html`, Math.round(html.length / 1024), 'KB')
}
if (fehler.length) { console.error(fehler.join('\n')); process.exit(1) }

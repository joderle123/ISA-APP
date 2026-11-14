// SOLO AKTION – setzt ein Aktions-Heft (siehe aktion-typen.ts). Die Helfer kommen aus bau.tsx.
import type { Aktion, AktionsHeft, Zone } from './aktion-typen'
import type { Helfer } from './solo-bau'

const KOERPER = `<svg viewBox="0 0 100 200" fill="#fff" stroke="#111" stroke-width="2.2" stroke-linejoin="round"><circle cx="50" cy="21" r="15"/><path d="M50 39C31 40 23 51 21 68L14 110C13 119 24 121 26 113L33 80L33 121L28 186C27 197 42 198 43 187L50 132L57 187C58 198 73 197 72 186L67 121L67 80L74 113C76 121 87 119 86 110L79 68C77 51 69 40 50 39Z"/></svg>`
const TAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

export function baueAktion(d: AktionsHeft, h: Helfer): string {
  const { t, esc, ic } = h
  const marke = `SOLO AKTION #${d.nr} · ${d.thema}`

  const zone = (z: Zone): string => {
    switch (z.art) {
      case 'fragen':
        return `<div class="ak-z">${z.fragen.map(h.frage).join('')}</div>`
      case 'tabelle':
        return `<div class="ak-z"><table class="ak-tb"><tr>${z.kopf.map((k) => `<th>${t(k)}</th>`).join('')}</tr>${z.zeilen.map((r) => `<tr><td>${t(r)}</td>${z.kopf.slice(1).map(() => '<td></td>').join('')}</tr>`).join('')}</table></div>`
      case 'werte':
        return `<div class="ak-z"><div class="ak-th"><span class="mo">0 · ${esc(z.von ?? 'gar nicht')}</span><div>${Array.from({ length: 11 }, (_, i) => `<i style="opacity:${0.12 + i * 0.088}"></i>`).join('')}</div><span class="mo">10 · ${esc(z.bis ?? 'extrem')}</span></div>
          <div class="ak-we"><div class="k"><span></span><b class="mo">${esc(z.kopf[0])}</b><b class="mo">${esc(z.kopf[1])}</b></div>${z.zeilen.map((r) => `<div><span>${t(r)}</span><i></i><i></i></div>`).join('')}</div></div>`
      case 'koerper':
        return `<div class="ak-z ak-ko"><div class="fig">${KOERPER}</div><div class="w">${z.woerter.map((w) => `<span><i></i>${t(w)}</span>`).join('')}</div></div>`
      case 'comic':
        return `<div class="ak-co">${z.bilder.map((b, i) => `<div><div class="o"><b>${i + 1}</b>${ic(b[0])}</div><p>${t(b[1])}</p></div>`).join('')}</div>`
      case 'wahl':
        return `<div class="ak-z ak-wa">${z.punkte.map((p) => `<div>${ic(p[0])}<span>${t(p[1])}</span><i></i></div>`).join('')}</div>`
      case 'clip':
        return `<div class="clip"><div class="qr">${h.qr(z.clip.url)}</div><div class="tx"><div class="lab mo">${ic('player-play')}Video · ${esc(z.clip.dauer)}</div><h3>${t(z.clip.titel)}</h3><div class="ka mo">${esc(z.clip.kanal)} · ${esc(h.kurzlink(z.clip.url))}</div><div class="fr2">${t(z.clip.frage)}</div></div></div>`
      case 'daumen':
        return `<div class="ak-z ak-da"><div class="k"><span></span><b class="mo">du</b><b class="mo">Gegenüber</b></div>${z.saetze.map((s) => `<div><span>${t(s)}</span><em>${ic('thumb-up')}${ic('thumb-down')}</em><em>${ic('thumb-up')}${ic('thumb-down')}</em></div>`).join('')}</div>`
      case 'woche':
        return `<div class="ak-z"><table class="ak-tb ak-wo"><tr><th></th>${TAGE.map((x) => `<th>${x}</th>`).join('')}</tr>${z.zeilen.map((r) => `<tr><td>${t(r)}</td>${TAGE.map(() => '<td></td>').join('')}</tr>`).join('')}</table></div>`
      case 'karten':
        return `<div class="kk">${z.karten.map((k) => `<div class="karte"><div class="o"><h3>${t(k.titel)}</h3>${ic(k.icon)}</div><div class="m">${k.zeilen.map((x) => (x.startsWith('_') ? `<p class="leer"><b>${esc(x.slice(1))}</b><i></i></p>` : `<div><span>${t(x)}</span></div>`)).join('')}</div></div>`).join('')}</div>`
    }
  }

  const seiteAktion = (a: Aktion, nr: string, label: string) =>
    `<div><div class="ak-kh"><div class="nr">${esc(nr)}</div><div class="ti"><div class="mo">${esc(label)}</div><h1>${t(a.titel)}</h1>
        <div class="chips"><span>${ic('clock')}${esc(a.zeit)}</span><span>${ic('users')}${esc(a.wer)}</span>${a.material ? `<span>${ic('backpack')}${esc(a.material)}</span>` : ''}</div></div><div class="bi">${ic(a.icon)}</div></div>
      <div class="inhalt ak"><div class="ak-so"><ol class="ak-st">${a.schritte.map((s) => `<li><span>${t(s)}</span></li>`).join('')}</ol>${a.bild ? `<div class="fig">${h.figur(a.bild)}</div>` : ''}</div>
        ${a.zonen.map(zone).join('')}
        <div class="ak-un"><div class="ak-aha"><span class="mo">Merk dir</span><div>${t(a.aha)}</div></div>
        <div class="ak-ok mo"><span><i></i> gemacht</span><span>War: <i></i> lahm <i></i> okay <i></i> gut</span></div></div></div></div>`

  const seiten: { html: string; klasse?: string }[] = []
  // Seite 1: Titel und Karte der Aktionen
  seiten.push({
    klasse: 'akt',
    html: `<div><div class="so-cv"><div class="l"><div class="top mo"><span>Bezugszeit · Aktion</span><span>#${esc(d.nr)}</span></div><div class="logo">SO<span>LO</span></div>
        <div class="th2${d.thema.length > 9 ? ' kl' : ''}">${t(d.thema)}</div><div class="hd mk">${t(d.headline)}</div></div>
        <div class="r"><div class="fig">${h.figur(d.bild)}</div><div class="stk">${t(d.sticker)}</div></div></div>
      <div class="inhalt ak"><div class="ak-start">${d.start.map((x) => `<p>${t(x)}</p>`).join('')}</div>
        <div class="gr">${h.tape('map-2', 'Such dir aus, womit du anfängst')}
        <div class="ak-map">${d.aktionen.map((a, i) => `<div><b>${i + 1}</b>${ic(a.icon)}<span>${t(a.titel)}</span><small class="mo">${esc(a.zeit)}</small><i></i></div>`).join('')}</div></div>
        <div class="ak-un"><div class="ak-aha"><span class="mo">Regeln</span><div>„Weiter“ gilt immer. Dein Gegenüber macht mit. Kein Vortrag.</div></div>
        <div class="ak-name"><span>Dieses Heft gehört:</span><i></i><span>Mein Gegenüber:</span><i></i></div></div></div></div>`,
  })
  d.aktionen.forEach((a, i) => seiten.push({ klasse: 'akt', html: seiteAktion(a, String(i + 1), `Aktion ${i + 1} von ${d.aktionen.length}`) }))
  seiten.push({ klasse: 'akt', html: seiteAktion(d.woche, '+', 'Für die Woche') })

  // Seite für die Bezugsperson
  const lkopf = (titel: string) => `<div class="lk"><span class="mark mo">Für die Bezugsperson</span><h1>${t(titel)}</h1></div>`
  const b = d.begleitung
  seiten.push({
    klasse: 'lt gross',
    html: `<div>${lkopf('So nutzen Sie das Aktions-Heft')}<div class="inhalt">
      <div class="fakten"><div><small>Für wen</small><b>12–17 Jahre, auch mit Förderbedarf</b></div><div><small>Dauer</small><b>10–15 Min. je Aktion</b></div><div><small>Tempo</small><b>1–2 Aktionen je Bezugszeit</b></div><div><small>Material</small><b>${t(b.material)}</b></div></div>
      <div class="sp2"><div class="kasten"><h2>So geht es</h2><ul><li>Der Jugendliche wählt auf Seite 1, womit er anfängt. Die Reihenfolge ist frei.</li><li><strong>Sie machen jede Aktion selbst mit</strong> – mit eigenen, ehrlichen Werten.</li><li>„Weiter“ beendet eine Aktion ohne Erklärung.</li><li>„Merk dir“ einmal laut lesen. Nicht erklären, nicht nachfragen, ob es verstanden ist.</li><li>Eine Aktion darf wiederholt werden. Zweimal dieselbe ist besser als acht halbe.</li></ul></div>
        <div class="kasten g"><h2>Bei Förderbedarf</h2><ul><li>Die Schritte <strong>vorlesen und vormachen</strong>. Immer nur einen Schritt; die anderen abdecken.</li><li>Zeigen, sagen oder zeichnen zählt wie schreiben. Sie tragen ein, wenn der Jugendliche das möchte.</li><li>Eine Aktion pro Stunde reicht. Lieber kurz und fertig als lang und abgebrochen.</li><li>Unbekannte Wörter an einem eigenen Beispiel zeigen, nicht umschreiben.</li></ul></div></div>
      <div class="kasten g"><h2>Achtung</h2><p>${t(b.achtung)}</p></div>
    </div></div>`,
  })
  seiten.push({
    klasse: 'lt gross',
    html: `<div>${lkopf('Die Aktionen im Überblick')}<div class="inhalt">
      <div><table class="t"><tr><th>Nr.</th><th>Aktion</th><th>Ziel</th><th>Tipp</th></tr>${[...d.aktionen, d.woche].map((a, i) => `<tr><td>${i < d.aktionen.length ? i + 1 : '+'}</td><td><strong>${t(a.titel)}</strong><br><span class="klein">${esc(a.zeit)} · ${esc(a.material || 'kein Material')}</span></td><td>${t(a.ziel)}</td><td>${t(a.tipp)}</td></tr>`).join('')}</table></div>
      <p class="klein">${t(b.mehr)} Alle Personen und Szenen sind erfunden. Zeichnungen: Open Peeps (Pablo Stanley, CC0), Tabler Icons (MIT). ${esc(h.urheber)} Stand: ${esc(d.stand)}.</p>
    </div></div>`,
  })

  const body = seiten
    .map((s, i) => `<section class="seite ${s.klasse ?? ''}" data-nr="${i + 1}">${s.html}<div class="fuss"><span class="mo">${esc(marke)}</span><span></span><span class="nr">${i + 1}</span></div></section>`)
    .join('\n')
  return h.huelle(d.datei, `SOLO AKTION #${d.nr} – ${d.thema}`, d.farbe, body, 'solo')
}

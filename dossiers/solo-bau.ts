// SOLO – setzt ein Heft für die Bezugszeit aus Bausteinen (siehe solo-typen.ts). Die Helfer kommen aus bau.tsx.
import type { Frage } from './typen'
import type { Block, Solo } from './solo-typen'

export interface Helfer {
  t: (s: string) => string
  esc: (s: string) => string
  figur: (id: string) => string
  ic: (name: string) => string
  qr: (url: string) => string
  kurzlink: (url: string) => string
  linien: (n: number) => string
  tape: (icon: string, text: string, akzent?: boolean) => string
  frage: (f: Frage, i: number) => string
  huelle: (datei: string, titel: string, farbe: string, body: string, ordner?: string) => string
  urheber: string
}

export function baueSolo(d: Solo, h: Helfer): string {
  const { t, esc, ic } = h
  const marke = `SOLO #${d.nr} · ${d.thema}`
  let buchstabe = 0

  const block = (b: Block): string => {
    switch (b.art) {
      case 'text':
        return `<div class="so-text">${b.x.map((x) => `<p>${t(x)}</p>`).join('')}</div>`
      case 'regeln':
        return `<div class="so-deal"><h3>${t(b.titel)}</h3><ol>${b.punkte.map((x) => `<li><span>${t(x)}</span></li>`).join('')}</ol></div>`
      case 'kasten':
        return `<div class="bx ${b.akzent ? 'ak' : 'p'} so-ka">${b.label ? `<div class="lab mo">${esc(b.label)}</div>` : ''}${b.titel ? `<h3>${t(b.titel)}</h3>` : ''}<p>${t(b.x)}</p>${h.linien(b.linien ?? 0)}</div>`
      case 'fragen': {
        const kopf = b.band
          ? `<div class="b bd">${ic(b.band[0])}</div>`
          : `<div class="b">${'ABCDEF'[buchstabe++]}</div>`
        return `<div class="bx mv${b.band ? ' so-bd' : ''}"><div class="kp">${kopf}<h3>${b.band ? `<small class="mo">${esc(b.band[1])}</small>` : ''}${t(b.titel)}</h3><div class="me mo"><span>${esc(b.wie ?? '')}</span><span>${esc(b.zeit ?? '')}</span></div></div>
          <div class="kb">${b.kontext ? `<p class="kontext">${t(b.kontext)}</p>` : ''}${b.fragen.map(h.frage).join('')}</div></div>`
      }
      case 'szene':
        return `<div class="gr">${h.tape('movie', 'Der Fall')}
          <div class="bx p szene"><div class="wer"><div class="pk punkt"></div><div class="fig">${h.figur(b.bild)}</div><div class="nm mo">${esc(b.name)}</div></div>
          <div class="tx"><p>${t(b.text)}</p><div class="fr mk">${ic('arrow-big-right')}<span>${t(b.frage)}</span></div><div class="linie"></div></div></div></div>`
      case 'fakten':
        return `<div class="gr">${h.tape('bulb', b.titel)}
          <div class="fk${b.fakten.length > 3 ? ' sechs' : ''}">${b.fakten.map((x, k) => `<div><div class="z">${k + 1}</div><h3>${t(x.t)}</h3><p>${t(x.x)}</p></div>`).join('')}</div></div>`
      case 'clip':
        return `<div class="clip"><div class="qr">${h.qr(b.clip.url)}</div><div class="tx"><div class="lab mo">${ic('player-play')}Video · ${esc(b.clip.dauer)}</div><h3>${t(b.clip.titel)}</h3><div class="ka mo">${esc(b.clip.kanal)} · ${esc(h.kurzlink(b.clip.url))}</div><div class="fr2">${t(b.clip.frage)}</div></div></div>`
      case 'marker':
        return `<div class="so-mk"><div class="merk"><span class="mo">${esc(b.label)}</span><div class="mk">${t(b.x)}</div></div>${h.linien(b.linien ?? 0)}</div>`
      case 'experiment':
        return `<div class="bx ak so-ex"><div class="lab mo"><span>${ic('flask')}Experiment bis zum nächsten Mal</span></div><h3>${t(b.titel)}</h3><p>${t(b.x)}</p>
          <div class="satz"><span><strong>Meine Wette:</strong></span><div class="linie"></div></div><div class="satz"><span><strong>Ergebnis:</strong></span><div class="linie"></div></div></div>`
      case 'karten':
        return `<div class="gr">${h.tape('scissors', 'Für die Tasche – ausschneiden')}<div class="kk">${b.karten.map((k) => `<div class="karte"><div class="o"><h3>${t(k.titel)}</h3>${ic(k.icon)}</div><div class="m">${k.zeilen.map((x) => (x.startsWith('_') ? `<p class="leer"><b>${esc(x.slice(1))}</b><i></i></p>` : `<div><span>${t(x)}</span></div>`)).join('')}</div>${k.eigen ? `<div class="e"><span><strong>${t(k.eigen)}</strong></span><i></i></div>` : ''}</div>`).join('')}</div></div>`
      case 'tiefe':
        return `<div class="gr">${h.tape('messages', 'Du wählst die Tiefe')}
          <div class="so-tf">${b.fragen.map((f, k) => `<div class="s${k + 1}"><div class="lab mo"><b>Stufe ${k + 1}</b><span>${['leicht', 'ehrlich', 'tief'][k]}</span></div>${f.map((x) => `<p>${t(x)}</p>`).join('')}</div>`).join('')}</div>
          <p class="mo so-hin">Du suchst die Stufe aus. Du darfst dieselbe Frage zurückstellen. „Weiter“ gilt immer.</p></div>`
      case 'logbuch':
        return `<table class="so-log"><tr><th>Datum</th><th>Akku 0–10</th><th>Thema</th><th>Mein Experiment: Was kam raus?</th><th>War</th></tr>${Array.from({ length: b.zeilen }, () => '<tr><td></td><td></td><td></td><td></td><td><i></i><i></i><i></i></td></tr>').join('')}</table>
          <p class="mo so-hin">War: drei Kästchen – nichts für mich · okay · gut</p>`
      case 'check':
        return `<div class="vibe"><span class="mo">Heute war: <i></i> nichts für mich <i></i> okay <i></i> gut</span><span class="mo">Nächstes Thema: ______________________</span><span class="mo">Datum: __________</span></div>`
      case 'zwei':
        return `<div class="zwei so-zw"><div class="gr">${b.links.map(block).join('')}</div><div class="gr">${b.rechts.map(block).join('')}</div></div>`
    }
  }

  const seiten: { html: string; klasse?: string }[] = []
  d.seiten.forEach((s, i) => {
    buchstabe = 0
    const kopf =
      i === 0
        ? `<div class="so-cv"><div class="l"><div class="top mo"><span>Bezugszeit · ${d.reihe === 'Start' ? 'Start' : 'Thema'}</span><span>#${esc(d.nr)}</span></div><div class="logo">SO<span>LO</span></div>
            <div class="th2${d.thema.length > 9 ? ' kl' : ''}">${t(d.thema)}</div><div class="hd mk">${t(d.headline)}</div></div>
            <div class="r"><div class="fig">${h.figur(d.bild)}</div><div class="stk">${t(d.sticker)}</div></div></div>`
        : `<div class="kh"><div><div class="mo" style="color:var(--g);margin-bottom:1.4mm">${esc(marke)}</div><h1 class="an${s.titel.length > 18 ? ' kl2' : ''}">${t(s.titel)}</h1><div class="ut">${t(s.unter)}</div></div>${s.sticker ? `<div class="st">${t(s.sticker)}</div>` : ''}</div>`
    seiten.push({ html: `<div>${kopf}<div class="inhalt sol">${s.bloecke.map(block).join('')}</div></div>` })
  })

  // Seiten für die Bezugsperson
  const b = d.begleitung
  const lkopf = (titel: string) => `<div class="lk"><span class="mark mo">Für die Bezugsperson</span><h1>${t(titel)}</h1></div>`
  const clips = d.seiten.flatMap((s) => s.bloecke.flatMap((x) => (x.art === 'clip' ? [x.clip] : x.art === 'zwei' ? [...x.links, ...x.rechts].flatMap((y) => (y.art === 'clip' ? [y.clip] : [])) : [])))
  seiten.push({
    klasse: 'lt gross',
    html: `<div>${lkopf('So läuft die Stunde')}<div class="inhalt">
      <div class="fakten">${b.fakten.map((x) => `<div><small>${esc(x[0])}</small><b>${t(x[1])}</b></div>`).join('')}</div>
      <div class="sp2"><div class="kasten"><h2>Wann dieses Heft passt</h2><ul>${b.wann.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>
        <div class="kasten g"><h2>Ziel der Stunde</h2><p>${t(b.ziel)}</p>${b.anschluss ? `<p style="margin-top:1.4mm"><strong>Anschluss:</strong> ${t(b.anschluss)}</p>` : ''}</div></div>
      <div><h2>Ablauf (45 bis 50 Minuten)</h2><table class="t"><tr><th>Minute</th><th>Was</th></tr>${b.ablauf.map((x) => `<tr><td>${esc(x[0])}</td><td>${t(x[1])}</td></tr>`).join('')}</table></div>
      <div class="sp2"><div class="kasten"><h2>Haltung</h2><ul>${b.haltung.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div>
        <div class="kasten"><h2>Hinweise zu den Seiten</h2><ul>${b.hinweise.map((x) => `<li>${t(x)}</li>`).join('')}</ul></div></div>
      <div class="kasten g"><h2>Achtung</h2><p>${t(b.achtung)}</p></div>
    </div></div>`,
  })
  seiten.push({
    klasse: 'lt gross',
    html: `<div>${lkopf(d.quiz ? 'Quiz, Videos, Hintergrund' : 'Videos und Hintergrund')}<div class="inhalt">
      ${d.quiz ? `<div><h2>Quiz: ${d.quiz.length} Fragen – in der Toolbox spielen, in Kahoot einlesen oder mündlich stellen</h2><table class="t so-qz"><tr><th>Nr.</th><th>Frage</th><th>Richtig</th><th>Warum</th></tr>${d.quiz.map((q, i) => `<tr><td>${i + 1}</td><td>${t(q.f)}<br><span class="klein">${q.o.map((o, k) => (k === q.r ? `<u>${t(o)}</u>` : t(o))).join(' · ')}</span></td><td>${t(q.o[q.r])}</td><td>${t(q.warum ?? '')}</td></tr>`).join('')}</table></div>` : ''}
      ${clips.length || b.extra?.length ? `<div><h2>Videos (Links geprüft am 14.11.2026)</h2><table class="t"><tr><th>Für</th><th>Titel und Kanal</th><th>Link</th></tr>
        ${clips.map((c) => `<tr><td>die Stunde</td><td>${t(c.titel)} – ${esc(c.kanal)} (${esc(c.dauer)})</td><td>${esc(h.kurzlink(c.url))}</td></tr>`).join('')}
        ${(b.extra ?? []).map((c) => `<tr><td>Sie selbst</td><td>${t(c.titel)} – ${esc(c.kanal)}. ${t(c.frage)}</td><td>${esc(h.kurzlink(c.url))}</td></tr>`).join('')}</table>
        <p class="klein" style="margin-top:1mm">Geprüft ist nur, dass das Video unter diesem Titel und Kanal abrufbar war. Inhalt und Länge bitte vor der Stunde selbst ansehen.</p></div>` : ''}
      <div><h2>Fachlicher Hintergrund in Kürze</h2><p>${t(b.hintergrund)}</p><p class="klein" style="margin-top:1.5mm">${t(b.quellen)}</p></div>
      <p class="klein">Alle Personen und Szenen im Heft sind erfunden. Zeichnungen: Open Peeps (Pablo Stanley, CC0), Tabler Icons (MIT). Schriften: Anton, Space Grotesk (SIL Open Font License), Permanent Marker (Apache-Lizenz 2.0). ${esc(h.urheber)} Stand: ${esc(d.stand)}.</p>
    </div></div>`,
  })

  const body = seiten
    .map((s, i) => `<section class="seite ${s.klasse ?? ''}" data-nr="${i + 1}">${s.html}<div class="fuss"><span class="mo">${esc(marke)}</span><span></span><span class="nr">${i + 1}</span></div></section>`)
    .join('\n')
  return h.huelle(d.datei, `SOLO #${d.nr} – ${d.thema}`, d.farbe, body, 'solo')
}

// Berufsbegleitung (11.11.2026): ein eigener Reiter der Toolbox für Jugendliche der Voie de préparation.
// Schritt für Schritt: Talenttest → Berufe entdecken → Merkliste → CCP oder DAP? → Lehrstelle finden.
// Inhalte: src/data/berufe/berufe.json (aus offiziellen Quellen, je Beruf mit Quelle). Alles bleibt in diesem Browser
// (localStorage 'toolbox-beruf': Antworten des Tests und Merkliste) – keine Namen, nichts geht nach außen.
// Drucken: Berufs-Steckbrief, CCP- oder DAP-Dossier (alle Berufe mit allen Angaben), Infoheft, Testergebnis – mit QR-Codes.
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import qrcode from 'qrcode-generator'
import { Icon } from '../components/Icon'
import daten from '../data/berufe/berufe.json'

type Abschluss = 'CCP' | 'DAP'
interface Beruf {
  id: string
  de: string
  fr: string
  abschluss: Abschluss[]
  bereich: string
  einfach?: string
  taetigkeiten?: string[]
  wege: Weg[]
  link?: string
  quelle?: string
  hinweis?: string
}
interface Weg { abschluss: Abschluss; dauer?: string; form?: string; sprachen?: string; lycees?: string[]; zugang?: string; lohn?: string[]; danach?: string; francophone?: string[]; kategorie?: string; link?: string }
const dauerVon = (b: Beruf) => [...new Set(b.wege.map((w) => w.dauer).filter(Boolean))].join(' / ')
interface Bereich { id: string; name: string; farbe: string; zart: string; passt: string; bild: string }
interface InfoTeil { id: string; titel: string; kurz: string; punkte: string[]; quelle?: string }
interface Link { titel: string; url: string; wofuer: string }
interface Frage { id: string; text: string; bereich: string }
interface Daten {
  stand: string
  bereiche: Bereich[]
  fragen: Frage[]
  stil: { id: string; a: string; b: string }[]
  infoheft: InfoTeil[]
  links: Link[]
  quellen: { titel: string; url: string }[]
  berufe: Beruf[]
}
const D = daten as unknown as Daten
const BEREICH = new Map(D.bereiche.map((b) => [b.id, b]))

// ---------------------------------------------------------------- Speicher (nur dieser Browser)
interface Stand { antworten: Record<string, number>; stil: Record<string, 'a' | 'b'>; merk: string[] }
const KEY = 'toolbox-beruf'
function laden(): Stand {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || '{}')
    return { antworten: s.antworten || {}, stil: s.stil || {}, merk: Array.isArray(s.merk) ? s.merk : [] }
  } catch {
    return { antworten: {}, stil: {}, merk: [] }
  }
}
function sichern(s: Stand) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    /* privates Fenster: dann eben nur für diese Sitzung */
  }
}

// ---------------------------------------------------------------- Hilfen
function esc(s: string) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}
function qrSvg(url: string, px = 92): string {
  try {
    const q = qrcode(0, 'M')
    q.addData(url)
    q.make()
    return q.createSvgTag({ cellSize: Math.max(2, Math.floor(px / (q.getModuleCount() + 2))), margin: 1, scalable: true })
  } catch {
    return ''
  }
}
function Qr({ url, groesse = 96 }: { url: string; groesse?: number }) {
  return <span className="block shrink-0" style={{ width: groesse, height: groesse }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: qrSvg(url, groesse) }} />
}
function Bild({ b, groesse = 40 }: { b: Bereich; groesse?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-2xl" style={{ width: groesse, height: groesse, background: b.zart, color: b.farbe }} aria-hidden="true">
      <svg viewBox="0 0 24 24" width={groesse * 0.58} height={groesse * 0.58} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: b.bild }} />
    </span>
  )
}
function Marke({ a }: { a: Abschluss }) {
  return (
    <span className={'inline-flex items-center rounded-full px-2.5 py-0.5 text-[13px] font-bold ' + (a === 'CCP' ? 'bg-[#e3f4ea] text-[#1e6b45]' : 'bg-[#e6edff] text-[#2e3a9c]')}>{a}</span>
  )
}
function ergebnis(s: Stand) {
  const summe: Record<string, number> = {}
  const max: Record<string, number> = {}
  for (const f of D.fragen) {
    max[f.bereich] = (max[f.bereich] || 0) + 2
    summe[f.bereich] = (summe[f.bereich] || 0) + (s.antworten[f.id] ?? 0)
  }
  return D.bereiche
    .map((b) => ({ b, wert: max[b.id] ? Math.round((100 * (summe[b.id] || 0)) / max[b.id]) : 0 }))
    .sort((x, y) => y.wert - x.wert)
}

// ---------------------------------------------------------------- Drucken
const DRUCK_CSS = `
*{box-sizing:border-box}body{font:11pt/1.5 'Segoe UI',system-ui,sans-serif;color:#0e1628;margin:14mm 14mm 12mm}
h1{font-size:22pt;margin:0 0 1mm;line-height:1.15}h2{font-size:14pt;margin:7mm 0 2mm}h3{font-size:12pt;margin:4mm 0 1mm}
.u{color:#586277;margin:0 0 5mm}.marke{display:inline-block;border-radius:99px;padding:.5mm 3mm;font-weight:700;font-size:10pt;margin-right:1.5mm}
.ccp{background:#e3f4ea;color:#1e6b45}.dap{background:#e6edff;color:#2e3a9c}
.karte{border:1px solid #e2e6ec;border-radius:4mm;padding:4mm 5mm;margin:0 0 4mm;break-inside:avoid}
.fakten{display:grid;grid-template-columns:32mm 1fr;gap:1.2mm 4mm;margin:2mm 0}.fakten dt{color:#586277}.fakten dd{margin:0}
.qr{display:flex;gap:4mm;align-items:center;margin-top:3mm}.qr svg{width:24mm;height:24mm}.qr small{color:#586277;word-break:break-all}
ul{margin:1mm 0 0;padding-left:5mm}li{margin-bottom:1mm}.fuss{color:#667084;font-size:8.5pt;margin-top:6mm;border-top:1px solid #e2e6ec;padding-top:2mm}
.balken{display:grid;grid-template-columns:48mm 1fr 12mm;gap:2mm;align-items:center;margin:1.5mm 0}.balken i{display:block;height:4mm;border-radius:2mm}
.seite{break-before:page}.kopf{display:flex;justify-content:space-between;gap:6mm;align-items:flex-start}
`
function drucken(titel: string, inhalt: string) {
  const f = document.createElement('iframe')
  Object.assign(f.style, { position: 'fixed', width: '0', height: '0', border: '0' })
  document.body.appendChild(f)
  const doc = f.contentWindow!.document
  doc.open()
  doc.write(`<!doctype html><html lang="de"><head><meta charset="utf-8"><title>${esc(titel)}</title><style>${DRUCK_CSS}</style></head><body>${inhalt}<p class="fuss">CDSE Toolbox · Berufsbegleitung · Angaben aus offiziellen Quellen, Stand ${esc(D.stand)}. Bitte vor wichtigen Entscheidungen auf den verlinkten Seiten prüfen.</p></body></html>`)
  doc.close()
  setTimeout(() => {
    try {
      f.contentWindow!.focus()
      f.contentWindow!.print()
    } catch {
      /* nichts */
    }
    setTimeout(() => f.remove(), 2000)
  }, 300)
}
function berufHtml(b: Beruf, seite = false): string {
  const B = BEREICH.get(b.bereich)
  const weg = (w: Weg) => {
    const f: [string, string | undefined][] = [['Zugang', w.zugang], ['Dauer', w.dauer], ['So lernst du', w.form], ['Sprachen', w.sprachen], ['Schule', w.lycees?.join(', ')], ['Klasse auf Französisch', w.francophone?.join(', ')], ['Lehrlingsgeld', w.lohn?.join(' · ')], ['Danach', w.danach]]
    return `<h3><span class="marke ${w.abschluss.toLowerCase()}">${w.abschluss}</span>${w.kategorie ? ' Kategorie ' + esc(w.kategorie) : ''}</h3><dl class="fakten">${f.filter((x) => x[1]).map((x) => `<dt>${x[0]}</dt><dd>${esc(x[1] as string)}</dd>`).join('')}</dl>`
  }
  return `<section class="karte${seite ? ' seite' : ''}"><div class="kopf"><div><h1>${esc(b.de)}</h1><p class="u">${esc(b.fr)}</p>
    ${b.abschluss.map((a) => `<span class="marke ${a.toLowerCase()}">${a}</span>`).join('')}</div></div>
    ${b.einfach ? `<p>${esc(b.einfach)}</p>` : ''}
    ${b.taetigkeiten?.length ? `<h3>Was machst du?</h3><ul>${b.taetigkeiten.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
    ${B ? `<p class="u">Berufsfeld: ${esc(B.name)}</p>` : ''}${b.wege.map(weg).join('')}${b.hinweis ? `<p class="u">Hinweis: ${esc(b.hinweis)}</p>` : ''}
    ${b.link ? `<div class="qr">${qrSvg(b.link, 96)}<small>Mehr dazu: ${esc(b.link)}</small></div>` : ''}</section>`
}
function infoheftHtml(): string {
  return `<h1>CCP oder DAP? Dein Weg in einen Beruf</h1><p class="u">Infoheft für die Voie de préparation · Stand ${esc(D.stand)}</p>` +
    D.infoheft.map((t) => `<section class="karte"><h2>${esc(t.titel)}</h2><p>${esc(t.kurz)}</p><ul>${t.punkte.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></section>`).join('') +
    `<h2>Wichtige Seiten</h2>` + D.links.map((l) => `<div class="karte qr">${qrSvg(l.url, 96)}<div><b>${esc(l.titel)}</b><br>${esc(l.wofuer)}<br><small>${esc(l.url)}</small></div></div>`).join('')
}

// ---------------------------------------------------------------- Seite
type Ansicht = 'start' | 'test' | 'ergebnis' | 'berufe' | 'info' | 'merk'
const SCHRITTE: { id: Ansicht; titel: string; text: string }[] = [
  { id: 'test', titel: 'Talenttest', text: `Was machst du gern? ${D.fragen.length + D.stil.length} kurze Fragen.` },
  { id: 'berufe', titel: 'Berufe entdecken', text: 'Alle CCP- und DAP-Berufe – einfach erklärt.' },
  { id: 'merk', titel: 'Meine Merkliste', text: 'Berufe sammeln, die dich interessieren.' },
  { id: 'info', titel: 'CCP oder DAP?', text: 'Was ist der Unterschied? Was brauchst du?' },
]

export default function Beruf({ aktiv }: { aktiv: boolean }) {
  const [stand, setStand] = useState<Stand>(laden)
  const [ansicht, setAnsicht] = useState<Ansicht>('start')
  const [offen, setOffen] = useState<Beruf | null>(null)
  useEffect(() => sichern(stand), [stand])
  // Verweise aus dem Hub: #beruf=info (Infoheft), #beruf=test, #beruf=<id> (ein Beruf)
  useEffect(() => {
    const lesen = () => {
      const m = /^#\/?beruf=([^&]+)/.exec(window.location.hash)
      if (!m) return
      const w = decodeURIComponent(m[1])
      if (w === 'info' || w === 'test' || w === 'berufe' || w === 'merk') setAnsicht(w === 'test' && Object.keys(laden().antworten).length >= D.fragen.length ? 'ergebnis' : (w as Ansicht))
      else {
        const b = D.berufe.find((x) => x.id === w)
        if (b) {
          setAnsicht('berufe')
          setOffen(b)
        }
      }
    }
    lesen()
    window.addEventListener('hashchange', lesen)
    return () => window.removeEventListener('hashchange', lesen)
  }, [])
  const merken = (id: string) => setStand((s) => ({ ...s, merk: s.merk.includes(id) ? s.merk.filter((x) => x !== id) : [...s.merk, id] }))
  const beantwortet = Object.keys(stand.antworten).length
  const fertig = beantwortet >= D.fragen.length

  return (
    <section hidden={!aktiv} aria-labelledby="beruf-titel" className="mx-auto max-w-[1180px] px-4 pt-4 pb-24 sm:px-6 sm:pt-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 id="beruf-titel" className="disp text-2xl text-ink">Mein Weg in einen Beruf</h1>
          <p className="text-[15px] text-muted">Talenttest, alle CCP- und DAP-Berufe einfach erklärt, und was du für deine Ausbildung brauchst.</p>
        </div>
        {ansicht !== 'start' && (
          <button type="button" className="btn btn-sm" onClick={() => setAnsicht('start')}>
            <Icon name="chevronLeft" />
            Übersicht
          </button>
        )}
      </div>

      {ansicht === 'start' && <Start setAnsicht={setAnsicht} fertig={fertig} beantwortet={beantwortet} merk={stand.merk.length} />}
      {ansicht === 'test' && <Test stand={stand} setStand={setStand} fertig={() => setAnsicht('ergebnis')} />}
      {ansicht === 'ergebnis' && <Ergebnis stand={stand} setStand={setStand} setAnsicht={setAnsicht} oeffnen={setOffen} merken={merken} />}
      {ansicht === 'berufe' && <Katalog stand={stand} oeffnen={setOffen} merken={merken} />}
      {ansicht === 'merk' && <Merkliste stand={stand} oeffnen={setOffen} merken={merken} setAnsicht={setAnsicht} />}
      {ansicht === 'info' && <Infoheft />}
      {offen && <Detail b={offen} zu={() => setOffen(null)} gemerkt={stand.merk.includes(offen.id)} merken={() => merken(offen.id)} />}
    </section>
  )
}

function Karte({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={'rounded-[20px] border border-line bg-surface p-5 shadow-[0_1px_2px_rgba(14,22,40,.05)] ' + className}>{children}</div>
}

function Start({ setAnsicht, fertig, beantwortet, merk }: { setAnsicht: (a: Ansicht) => void; fertig: boolean; beantwortet: number; merk: number }) {
  const ccp = D.berufe.filter((b) => b.abschluss.includes('CCP')).length
  const dap = D.berufe.filter((b) => b.abschluss.includes('DAP')).length
  return (
    <div className="grid gap-4">
      <div className="overflow-hidden rounded-[24px] bg-[linear-gradient(120deg,#2e3a9c,#5b3fd1)] p-6 text-white sm:p-8">
        <p className="text-[13px] font-bold tracking-wide uppercase opacity-80">Berufsbegleitung</p>
        <h2 className="disp mt-1 text-[28px] leading-tight sm:text-[34px]">Finde heraus, welcher Beruf zu dir passt.</h2>
        <p className="mt-2 max-w-[620px] text-[16px] opacity-90">
          Es gibt {ccp} Berufe mit CCP und {dap} mit DAP. Wir gehen Schritt für Schritt: erst schauen, was du gern machst – dann passende Berufe – dann, was du dafür brauchst.
        </p>
        <button type="button" className="mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 text-[16px] font-bold text-[#2e3a9c]" onClick={() => setAnsicht(fertig ? 'ergebnis' : 'test')}>
          {fertig ? 'Mein Ergebnis ansehen' : beantwortet ? 'Talenttest weitermachen' : 'Talenttest starten'}
          <Icon name="arrowRight" />
        </button>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SCHRITTE.map((s, i) => (
          <li key={s.id}>
            <button type="button" onClick={() => setAnsicht(s.id === 'test' && fertig ? 'ergebnis' : s.id)} className="flex h-full w-full flex-col gap-2 rounded-[20px] border border-line bg-surface p-5 text-left transition hover:border-accent-line hover:shadow-md">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-[15px] font-bold text-accent">{i + 1}</span>
              <span className="text-[17px] font-bold text-ink">{s.titel}{s.id === 'merk' && merk ? ` (${merk})` : ''}</span>
              <span className="text-[14px] text-muted">{s.text}</span>
            </button>
          </li>
        ))}
      </ol>
      <Karte>
        <h3 className="text-[17px] font-bold text-ink">Die Berufsfelder</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {D.bereiche.map((b) => (
            <div key={b.id} className="flex items-center gap-3">
              <Bild b={b} />
              <div>
                <p className="text-[15px] font-semibold text-ink">{b.name}</p>
                <p className="text-[13px] text-muted">{D.berufe.filter((x) => x.bereich === b.id).length} Berufe</p>
              </div>
            </div>
          ))}
        </div>
      </Karte>
    </div>
  )
}

function Test({ stand, setStand, fertig }: { stand: Stand; setStand: (f: (s: Stand) => Stand) => void; fertig: () => void }) {
  const alle = [...D.fragen.map((f) => ({ typ: 'frage' as const, f })), ...D.stil.map((s) => ({ typ: 'stil' as const, s }))]
  const erste = alle.findIndex((x) => (x.typ === 'frage' ? stand.antworten[x.f.id] === undefined : stand.stil[x.s.id] === undefined))
  const [i, setI] = useState(erste < 0 ? 0 : erste)
  const x = alle[i]
  const weiter = () => (i + 1 >= alle.length ? fertig() : setI(i + 1))
  const B = x.typ === 'frage' ? BEREICH.get(x.f.bereich) : null
  return (
    <div className="mx-auto grid max-w-[720px] gap-4">
      <div className="flex items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-page-2" role="progressbar" aria-valuemin={0} aria-valuemax={alle.length} aria-valuenow={i} aria-label="Fortschritt">
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${(100 * i) / alle.length}%` }} />
        </div>
        <span className="text-[14px] text-muted">{i + 1} von {alle.length}</span>
      </div>
      <Karte className="grid gap-6 p-7 text-center sm:p-10">
        {x.typ === 'frage' ? (
          <>
            {B && <span className="mx-auto"><Bild b={B} groesse={72} /></span>}
            <p className="disp text-[24px] leading-snug text-ink sm:text-[28px]">{x.f.text}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {([[2, 'Ja, total', '#1e6b45', '#e3f4ea'], [1, 'Ein bisschen', '#6b4a0c', '#fbf3e1'], [0, 'Eher nicht', '#586277', '#eef1f6']] as const).map(([w, t, fg, bg]) => (
                <button key={w} type="button" className="min-h-[56px] rounded-2xl border-2 px-4 text-[17px] font-bold transition hover:scale-[1.02]" style={{ color: fg, background: bg, borderColor: stand.antworten[x.f.id] === w ? fg : 'transparent' }}
                  onClick={() => { setStand((s) => ({ ...s, antworten: { ...s.antworten, [x.f.id]: w } })); weiter() }}>{t}</button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-[14px] font-bold tracking-wide text-muted uppercase">Was ist dir lieber?</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {(['a', 'b'] as const).map((k) => (
                <button key={k} type="button" className="min-h-[88px] rounded-2xl border-2 bg-accent-soft px-5 text-[20px] font-bold text-accent transition hover:scale-[1.02]" style={{ borderColor: stand.stil[x.s.id] === k ? 'var(--color-accent)' : 'transparent' }}
                  onClick={() => { setStand((s) => ({ ...s, stil: { ...s.stil, [x.s.id]: k } })); weiter() }}>{x.s[k]}</button>
              ))}
            </div>
          </>
        )}
      </Karte>
      <div className="flex justify-between">
        <button type="button" className="btn btn-sm" disabled={i === 0} onClick={() => setI(i - 1)}><Icon name="chevronLeft" />Zurück</button>
        <button type="button" className="btn btn-sm" onClick={weiter}>Überspringen<Icon name="chevronRight" /></button>
      </div>
    </div>
  )
}

function BerufKarte({ b, oeffnen, gemerkt, merken }: { b: Beruf; oeffnen: (b: Beruf) => void; gemerkt: boolean; merken: (id: string) => void }) {
  const B = BEREICH.get(b.bereich)!
  return (
    <div className="flex items-start gap-3 rounded-[18px] border border-line bg-surface p-4 transition hover:border-accent-line hover:shadow-md">
      <Bild b={B} groesse={44} />
      <button type="button" className="min-w-0 flex-1 text-left" onClick={() => oeffnen(b)}>
        <span className="block text-[16px] font-bold leading-snug text-ink">{b.de}</span>
        <span className="block text-[13px] text-muted">{b.fr}</span>
        <span className="mt-1.5 flex flex-wrap gap-1.5">{b.abschluss.map((a) => <Marke key={a} a={a} />)}{dauerVon(b) && <span className="text-[13px] text-muted">{dauerVon(b)}</span>}</span>
      </button>
      <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-[20px]" style={{ color: gemerkt ? '#c2560a' : '#9aa3b5' }} aria-pressed={gemerkt} aria-label={gemerkt ? 'Von der Merkliste nehmen' : 'Merken'} title={gemerkt ? 'Gemerkt' : 'Merken'} onClick={() => merken(b.id)}>
        {gemerkt ? '★' : '☆'}
      </button>
    </div>
  )
}

function Ergebnis({ stand, setStand, setAnsicht, oeffnen, merken }: { stand: Stand; setStand: (f: (s: Stand) => Stand) => void; setAnsicht: (a: Ansicht) => void; oeffnen: (b: Beruf) => void; merken: (id: string) => void }) {
  const e = ergebnis(stand)
  const top = e.slice(0, 3)
  const stil = D.stil.filter((s) => stand.stil[s.id]).map((s) => s[stand.stil[s.id]])
  const druck = () =>
    drucken('Mein Talenttest', `<h1>Mein Talenttest</h1><p class="u">Name: ______________________ · Datum: ${new Date().toLocaleDateString('de-LU')}</p><h2>Das mache ich gern</h2>` +
      e.map((x) => `<div class="balken"><span>${esc(x.b.name)}</span><i style="width:${Math.max(2, x.wert)}%;background:${x.b.farbe}"></i><b>${x.wert} %</b></div>`).join('') +
      (stil.length ? `<h2>So arbeite ich am liebsten</h2><ul>${stil.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : '') +
      `<h2>Berufe, die zu mir passen könnten</h2>` + top.map((t) => `<h3>${esc(t.b.name)}</h3><ul>${D.berufe.filter((b) => b.bereich === t.b.id).map((b) => `<li>${esc(b.de)} (${b.abschluss.join('/')})</li>`).join('')}</ul>`).join(''))
  return (
    <div className="grid gap-4">
      <Karte>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="disp text-[24px] text-ink">Dein Ergebnis</h2>
            <p className="text-[15px] text-muted">Das machst du am liebsten. Es ist kein Zeugnis – nur ein Startpunkt zum Entdecken.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn btn-sm" onClick={druck}><Icon name="printer" />Drucken</button>
            <button type="button" className="btn btn-sm" onClick={() => { setStand((s) => ({ ...s, antworten: {}, stil: {} })); setAnsicht('test') }}><Icon name="reset" />Neu starten</button>
          </div>
        </div>
        <div className="mt-4 grid gap-2.5">
          {e.map((x, k) => (
            <div key={x.b.id} className="grid grid-cols-[44px_minmax(120px,220px)_1fr_48px] items-center gap-3">
              <Bild b={x.b} groesse={40} />
              <span className={'text-[15px] ' + (k < 3 ? 'font-bold text-ink' : 'text-muted')}>{x.b.name}</span>
              <span className="h-4 overflow-hidden rounded-full bg-page-2"><span className="block h-full rounded-full" style={{ width: `${Math.max(3, x.wert)}%`, background: x.b.farbe }} /></span>
              <span className="text-right text-[14px] text-muted">{x.wert} %</span>
            </div>
          ))}
        </div>
        {stil.length > 0 && <p className="mt-4 text-[15px] text-ink-2"><b>So arbeitest du am liebsten:</b> {stil.join(' · ')}</p>}
      </Karte>
      {top.map((t) => (
        <div key={t.b.id}>
          <h3 className="mb-2 flex items-center gap-2 text-[18px] font-bold text-ink"><Bild b={t.b} groesse={32} />{t.b.name}<span className="text-[14px] font-normal text-muted">– {t.b.passt}</span></h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {D.berufe.filter((b) => b.bereich === t.b.id).sort((a, b) => Number(b.abschluss.includes('CCP')) - Number(a.abschluss.includes('CCP'))).map((b) => (
              <BerufKarte key={b.id} b={b} oeffnen={oeffnen} gemerkt={stand.merk.includes(b.id)} merken={merken} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Katalog({ stand, oeffnen, merken }: { stand: Stand; oeffnen: (b: Beruf) => void; merken: (id: string) => void }) {
  const [q, setQ] = useState('')
  const [ab, setAb] = useState<'' | Abschluss>('')
  const [be, setBe] = useState('')
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  const liste = useMemo(() => D.berufe.filter((b) => (!ab || b.abschluss.includes(ab)) && (!be || b.bereich === be) && (!q || norm(b.de + ' ' + b.fr + ' ' + (b.taetigkeiten || []).join(' ')).includes(norm(q)))).sort((a, b) => a.de.localeCompare(b.de, 'de')), [q, ab, be])
  const dossier = (a: Abschluss) => drucken(`${a}-Dossier`, `<h1>Alle ${a}-Berufe</h1><p class="u">${D.berufe.filter((b) => b.abschluss.includes(a)).length} Berufe · Stand ${esc(D.stand)}</p>` + D.infoheft.filter((t) => t.id === a.toLowerCase()).map((t) => `<section class="karte"><h2>${esc(t.titel)}</h2><p>${esc(t.kurz)}</p><ul>${t.punkte.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></section>`).join('') + D.berufe.filter((b) => b.abschluss.includes(a)).sort((x, y) => x.de.localeCompare(y.de, 'de')).map((b) => berufHtml(b)).join(''))
  return (
    <div className="grid gap-4">
      <Karte className="grid gap-3">
        <label className="flex items-center gap-2 rounded-full border border-line bg-surface-2 px-4">
          <Icon name="search" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Beruf suchen, z. B. Koch, Maler, Verkauf …" className="min-h-[46px] flex-1 bg-transparent text-[16px] outline-none" aria-label="Beruf suchen" />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {(['', 'CCP', 'DAP'] as const).map((a) => (
            <button key={a || 'alle'} type="button" onClick={() => setAb(a)} className={'min-h-[38px] rounded-full border px-4 text-[14px] font-semibold ' + (ab === a ? 'border-ink bg-ink text-white' : 'border-line bg-surface text-ink')}>{a || 'Alle'}</button>
          ))}
          <select value={be} onChange={(e) => setBe(e.target.value)} className="min-h-[38px] rounded-full border border-line bg-surface px-3 text-[14px]" aria-label="Berufsfeld">
            <option value="">Alle Berufsfelder</option>
            {D.bereiche.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <span className="ml-auto flex gap-2">
            <button type="button" className="btn btn-sm" onClick={() => dossier('CCP')}><Icon name="printer" />CCP-Dossier</button>
            <button type="button" className="btn btn-sm" onClick={() => dossier('DAP')}><Icon name="printer" />DAP-Dossier</button>
          </span>
        </div>
      </Karte>
      <p className="text-[14px] text-muted">{liste.length} Berufe</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {liste.map((b) => <BerufKarte key={b.id} b={b} oeffnen={oeffnen} gemerkt={stand.merk.includes(b.id)} merken={merken} />)}
      </div>
    </div>
  )
}

function Merkliste({ stand, oeffnen, merken, setAnsicht }: { stand: Stand; oeffnen: (b: Beruf) => void; merken: (id: string) => void; setAnsicht: (a: Ansicht) => void }) {
  const l = D.berufe.filter((b) => stand.merk.includes(b.id))
  return (
    <div className="grid gap-4">
      <Karte className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="disp text-[22px] text-ink">Meine Merkliste</h2>
          <p className="text-[15px] text-muted">{l.length ? 'Sprich mit deiner Lehrkraft über diese Berufe – und schau sie dir bei einem Praktikum an.' : 'Noch leer. Tippe bei einem Beruf auf den Stern.'}</p>
        </div>
        {l.length > 0 ? (
          <button type="button" className="btn btn-sm" onClick={() => drucken('Meine Merkliste', '<h1>Meine Merkliste</h1><p class="u">Name: ______________________</p>' + l.map((b, k) => berufHtml(b, k > 0)).join(''))}><Icon name="printer" />Alle drucken</button>
        ) : (
          <button type="button" className="btn btn-sm" onClick={() => setAnsicht('berufe')}>Berufe entdecken<Icon name="arrowRight" /></button>
        )}
      </Karte>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{l.map((b) => <BerufKarte key={b.id} b={b} oeffnen={oeffnen} gemerkt merken={merken} />)}</div>
    </div>
  )
}

function Infoheft() {
  return (
    <div className="grid gap-4">
      <Karte className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="disp text-[24px] text-ink">CCP oder DAP?</h2>
          <p className="text-[15px] text-muted">Alles Wichtige auf einen Blick – einfach erklärt.</p>
        </div>
        <button type="button" className="btn btn-sm" onClick={() => drucken('Infoheft CCP und DAP', infoheftHtml())}><Icon name="printer" />Infoheft drucken</button>
      </Karte>
      <div className="grid gap-4 md:grid-cols-2">
        {D.infoheft.map((t) => (
          <Karte key={t.id} className={t.id === 'ccp' ? 'border-[#bfe3cd] bg-[#f4fbf6]' : t.id === 'dap' ? 'border-[#cbd7fb] bg-[#f5f8ff]' : ''}>
            <h3 className="flex items-center gap-2 text-[19px] font-bold text-ink">{(t.id === 'ccp' || t.id === 'dap') && <Marke a={t.id.toUpperCase() as Abschluss} />}{t.titel}</h3>
            <p className="mt-1 text-[15px] text-ink-2">{t.kurz}</p>
            <ul className="mt-2 grid gap-1.5 text-[15px] text-ink">
              {t.punkte.map((p, k) => <li key={k} className="flex gap-2"><span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{p}</li>)}
            </ul>
          </Karte>
        ))}
      </div>
      <h3 className="mt-2 text-[18px] font-bold text-ink">Wichtige Seiten – mit dem Handy scannen</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {D.links.map((l) => (
          <a key={l.url} href={l.url} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-[18px] border border-line bg-surface p-4 hover:border-accent-line">
            <Qr url={l.url} groesse={84} />
            <span className="min-w-0"><b className="block text-[15px] text-ink">{l.titel}</b><span className="block text-[14px] text-muted">{l.wofuer}</span></span>
          </a>
        ))}
      </div>
      <p className="text-[13px] text-muted">Quellen: {D.quellen.map((q) => q.titel).join(' · ')} · Stand {D.stand}</p>
    </div>
  )
}

function Detail({ b, zu, gemerkt, merken }: { b: Beruf; zu: () => void; gemerkt: boolean; merken: () => void }) {
  const B = BEREICH.get(b.bereich)!
  useEffect(() => {
    const t = (e: KeyboardEvent) => e.key === 'Escape' && zu()
    document.addEventListener('keydown', t)
    return () => document.removeEventListener('keydown', t)
  }, [zu])
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-[rgba(14,22,40,.45)] p-4 sm:p-8" onClick={(e) => e.target === e.currentTarget && zu()} role="dialog" aria-modal="true" aria-label={b.de}>
      <div className="w-full max-w-[720px] overflow-hidden rounded-[24px] bg-surface shadow-2xl">
        <div className="flex items-start gap-4 p-6" style={{ background: B.zart }}>
          <Bild b={B} groesse={64} />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold tracking-wide uppercase" style={{ color: B.farbe }}>{B.name}</p>
            <h2 className="disp text-[26px] leading-tight text-ink">{b.de}</h2>
            <p className="text-[14px] text-muted">{b.fr}</p>
            <p className="mt-2 flex gap-1.5">{b.abschluss.map((a) => <Marke key={a} a={a} />)}</p>
          </div>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-white" aria-label="Schließen" onClick={zu}><Icon name="x" /></button>
        </div>
        <div className="grid gap-4 p-6">
          {b.einfach && <p className="text-[17px] leading-relaxed text-ink">{b.einfach}</p>}
          {b.taetigkeiten && b.taetigkeiten.length > 0 && (
            <div>
              <h3 className="text-[16px] font-bold text-ink">Was machst du?</h3>
              <ul className="mt-1.5 grid gap-1.5 text-[15px]">{b.taetigkeiten.map((t, k) => <li key={k} className="flex gap-2"><Icon name="check" />{t}</li>)}</ul>
            </div>
          )}
          <div className={'grid gap-3 ' + (b.wege.length > 1 ? 'sm:grid-cols-2' : '')}>
            {b.wege.map((w) => (
              <div key={w.abschluss} className={'rounded-2xl border p-4 ' + (w.abschluss === 'CCP' ? 'border-[#bfe3cd] bg-[#f4fbf6]' : 'border-[#cbd7fb] bg-[#f5f8ff]')}>
                <p className="flex items-center gap-2"><Marke a={w.abschluss} />{w.kategorie && <span className="text-[13px] text-muted">Kategorie {w.kategorie}</span>}{w.dauer && <b className="ml-auto text-[15px] text-ink">{w.dauer}</b>}</p>
                {w.zugang && <p className="mt-2 text-[14px] text-ink"><b>Das brauchst du:</b> {w.zugang}</p>}
                <dl className="mt-2 grid gap-1 text-[14px]">
                  {([['So lernst du', w.form], ['Sprachen', w.sprachen], ['Schule', w.lycees?.join(', ')], ['Klasse auf Französisch', w.francophone?.join(', ')], ['Lehrlingsgeld', w.lohn?.join('\n')]] as [string, string | undefined][])
                    .filter((x) => x[1]).map((x) => <div key={x[0]}><dt className="inline text-muted">{x[0]}: </dt><dd className={'text-ink ' + (x[0] === 'Lehrlingsgeld' ? 'whitespace-pre-line' : 'inline')}>{x[1]}</dd></div>)}
                </dl>
                {w.danach && <p className="mt-2 text-[14px] text-ink-2">{w.danach}</p>}
                {w.link && b.wege.length > 1 && <a href={w.link} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1 text-[14px] font-semibold text-accent underline">Offizielle Seite ({w.abschluss})<Icon name="external" /></a>}
              </div>
            ))}
          </div>
          {b.hinweis && <p className="rounded-xl bg-warn-soft p-3 text-[14px] text-warn">{b.hinweis}</p>}
          {b.link && (
            <a href={b.link} target="_blank" rel="noopener" className="flex items-center gap-4 rounded-2xl border border-line p-3 hover:border-accent-line">
              <Qr url={b.link} groesse={92} />
              <span><b className="block text-[15px] text-ink">Mehr über diesen Beruf</b><span className="block text-[14px] text-muted">Mit dem Handy scannen oder hier klicken.</span><span className="block text-[13px] break-all text-faint">{b.link}</span></span>
            </a>
          )}
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn" onClick={merken} aria-pressed={gemerkt}>{gemerkt ? '★ Gemerkt' : '☆ Merken'}</button>
            <button type="button" className="btn" onClick={() => drucken(b.de, berufHtml(b))}><Icon name="printer" />Steckbrief drucken</button>
          </div>
          {b.quelle && <p className="text-[13px] text-faint">Quelle: {b.quelle}</p>}
        </div>
      </div>
    </div>
  )
}

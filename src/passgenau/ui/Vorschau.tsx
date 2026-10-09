// Passgenau – Vorschau aus dem echten Renderer (T-M8): das PDF des Kerns (pdfSitzungMitTeilen → react-pdf), mit pdf.js als
// Bild gezeichnet; darüber je Teil (Plan-Zeile, Blatt-Teil) eine antippbare Fläche aus den Layoutdaten des Kerns.
// Geht pdf.js nicht (sehr alter Browser), zeigt die Seite eine Skizze (HTML) mit denselben Teilen – als Skizze beschriftet.
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import type { Plan } from '../typen'
import * as K from './kern'
import { usePg, useProfil, type Ort } from './zustand'
import { Ic } from './zeichen'
import { A4Blatt, MM } from './A4'
import { zerlegen } from './blattTeile'
import { blattZusatz } from './erweitert'
import { istBlattSchritt, minutenVon, teilText, warumListe } from './anzeige'
import { Chip, HeikelBanner, Pill } from './Teile'
import { PHASE_NAME, ROLLE_NAME, datumKurz, zielKurz, SOZIALFORM_NAME } from './texte'
import { ladePdfjs } from '../../lib/pdfjs'

/** pdf.js zeichnet das PDF selbst – nur ohne Canvas (sehr alte Browser) bleibt die Skizze */
export const pdfAnzeigbar = (): boolean => typeof document !== 'undefined' && !!document.createElement('canvas').getContext

/** Plan, wie er gedruckt wird: „Mein Ziel“ aufs Blatt nur mit Haken und unter 12 Jahren (E-M13) */
export function druckPlan(plan: Plan, mitZiel: boolean): Plan {
  return { ...plan, sitzungen: plan.sitzungen.map((s) => (s.blatt ? { ...s, blatt: { ...s.blatt, ziel: mitZiel } } : s)) }
}

interface Seite {
  url: string
  b: number
  h: number
}
interface Teilflaeche {
  id: string
  seite: number
  x: number
  y: number
  b: number
  h: number
}
interface Gezeichnet {
  seiten: Seite[]
  teile: Teilflaeche[]
}

// Zwischenspeicher der gezeichneten PDFs (Schlüssel aus Plan-Sitzung und Druckoptionen)
const PDF_CACHE = new Map<string, Gezeichnet>()
function cacheSetzen(k: string, g: Gezeichnet) {
  PDF_CACHE.set(k, g)
  while (PDF_CACHE.size > 6) {
    const [alt, x] = PDF_CACHE.entries().next().value as [string, Gezeichnet]
    x.seiten.forEach((s) => URL.revokeObjectURL(s.url))
    PDF_CACHE.delete(alt)
  }
}

// In der Skizze gemessene Seitenfüllung (genauer als die Schätzung des Kerns). Schlüssel: Blatt + Layout.
const GEMESSEN = new Map<string, number[]>()
const MESS_HOERER = new Set<() => void>()
const messSchluessel = (plan: Plan, nr: number, layout: string, ziel: boolean) => JSON.stringify([nr, plan.sitzungen.find((x) => x.nr === nr)?.blatt ?? null, layout, ziel])
function gemessenSetzen(key: string, f: number[]) {
  const alt = GEMESSEN.get(key)
  if (alt && alt.join() === f.join()) return
  GEMESSEN.set(key, f)
  while (GEMESSEN.size > 40) GEMESSEN.delete(GEMESSEN.keys().next().value as string)
  MESS_HOERER.forEach((h) => h())
}
function useGemessen(key: string): number[] | undefined {
  return useSyncExternalStore(
    (h) => (MESS_HOERER.add(h), () => MESS_HOERER.delete(h)),
    () => GEMESSEN.get(key),
  )
}

/** PDF (Blob) mit pdf.js in Bilder zeichnen – je Seite eins, `px` breit */
async function zeichnen(blob: Blob, px: number): Promise<Seite[]> {
  const pdfjs = await ladePdfjs()
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await blob.arrayBuffer()), isEvalSupported: false, useSystemFonts: true }).promise
  const seiten: Seite[] = []
  try {
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i)
      const v1 = page.getViewport({ scale: 1 })
      const vp = page.getViewport({ scale: px / v1.width })
      const c = document.createElement('canvas')
      c.width = Math.round(vp.width)
      c.height = Math.round(vp.height)
      const ctx = c.getContext('2d')!
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, c.width, c.height)
      await page.render({ canvasContext: ctx, viewport: vp }).promise
      const bild = await new Promise<Blob>((ok, fehler) => c.toBlob((b) => (b ? ok(b) : fehler(new Error('Bild nicht möglich'))), 'image/png'))
      seiten.push({ url: URL.createObjectURL(bild), b: v1.width, h: v1.height })
      page.cleanup()
    }
  } finally {
    doc.destroy()
  }
  return seiten
}

/** Rechtecke je Teil und Seite vereinigen (ein Teil kann aus mehreren Bausteinen bestehen) */
function vereinigen(l: { id: string; seite: number; x: number; y: number; b: number; h: number }[]): Teilflaeche[] {
  const m = new Map<string, Teilflaeche>()
  for (const t of l) {
    const k = t.id + '|' + t.seite
    const a = m.get(k)
    if (!a) m.set(k, { ...t })
    else {
      const x2 = Math.max(a.x + a.b, t.x + t.b)
      const y2 = Math.max(a.y + a.h, t.y + t.h)
      a.x = Math.min(a.x, t.x)
      a.y = Math.min(a.y, t.y)
      a.b = x2 - a.x
      a.h = y2 - a.y
    }
  }
  return [...m.values()]
}

/** Ort im Plan aus der Kennung eines Teils („pg-teil:<nr>:schritt:<i>“ / „pg-teil:<nr>:blatt:<i>“) */
function ortVon(id: string): Ort | null {
  const m = /^pg-teil:(\d+):(schritt|blatt):(\d+)$/.exec(id)
  if (!m) return null
  return m[2] === 'schritt' ? { sitzung: +m[1], schritt: +m[3] } : { sitzung: +m[1], blatt: +m[3] }
}

/** Das echte PDF einer Sitzung als Bild, jeder Teil antippbar. `nurBlatt`: nur die Seiten des Blatts (eine bei `nurErste`). */
export function PdfSeiten({ plan, nr, breite, nurBlatt, nurErste, onOrt, markiert, titel }: { plan: Plan; nr: number; breite: number; nurBlatt?: boolean; nurErste?: boolean; onOrt?: (o: Ort) => void; markiert?: Ort | null; titel: string }) {
  const pg = usePg()
  const p = useProfil()
  const sitzung = plan.sitzungen.find((s) => s.nr === nr)
  const mitZiel = pg.druck.ziel && p.alterJahre < 12
  const opt = { sprache: p.sprache.blatt, warum: !pg.druck.ohneWarum, karten: true }
  const px = Math.min(1600, Math.round(Math.max(breite, 320) * Math.min(2, window.devicePixelRatio || 1) * 1.25))
  const key = JSON.stringify([plan.id, nr, sitzung?.schritte.map((s) => [s.ref, s.min, s.ueber]), sitzung?.blatt, opt, mitZiel, p.anrede, p.layout, p.stufen, px])
  const [erg, setErg] = useState<Gezeichnet | null>(PDF_CACHE.get(key) ?? null)
  const [laedt, setLaedt] = useState(!PDF_CACHE.has(key))
  const [fehler, setFehler] = useState<string | null>(null)
  const lauf = useRef(0)
  useEffect(() => {
    const da = PDF_CACHE.get(key)
    if (da) {
      setErg(da)
      setLaedt(false)
      return
    }
    const id = ++lauf.current
    setLaedt(true)
    const t = window.setTimeout(async () => {
      if (!pg.katalog) return
      try {
        const r = await K.pdfSitzungMitTeilen(pg.katalog, p, druckPlan(plan, mitZiel), nr, opt)
        const seiten = await zeichnen(r.blob, px)
        const g: Gezeichnet = { seiten, teile: vereinigen(r.teile) }
        cacheSetzen(key, g)
        if (id === lauf.current) {
          setErg(g)
          setLaedt(false)
          setFehler(null)
        }
      } catch (e) {
        if (id === lauf.current) {
          setFehler(e instanceof Error ? e.message : 'PDF nicht möglich')
          setLaedt(false)
        }
      }
    }, 400)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  const blattSeiten = useMemo(() => new Set((erg?.teile ?? []).filter((t) => t.id.includes(':blatt:')).map((t) => t.seite)), [erg])
  let nummern = (erg?.seiten ?? []).map((_, i) => i + 1)
  if (nurBlatt) nummern = nummern.filter((n) => blattSeiten.has(n))
  if (nurErste) nummern = nummern.slice(0, 1)
  const name = (o: Ort): string => {
    const s = plan.sitzungen.find((x) => x.nr === o.sitzung)
    const t = o.schritt !== undefined ? s?.schritte[o.schritt] : o.blatt !== undefined ? s?.blatt?.bausteine[o.blatt] : undefined
    return t ? teilText(pg.katalog, t.ref, p.sprache.blatt, t.t).titel : 'Teil'
  }
  const gleich = (a?: Ort | null, b?: Ort | null) => !!a && !!b && a.sitzung === b.sitzung && a.schritt === b.schritt && a.blatt === b.blatt
  return (
    <div className="pg-pdfseiten" aria-label={titel} aria-busy={laedt}>
      {nummern.map((n) => {
        const seite = erg!.seiten[n - 1]
        return (
          <div key={n} className="pg-pdfseite" style={{ aspectRatio: `${seite.b} / ${seite.h}` }}>
            <img src={seite.url} alt={`${titel} – Seite ${n}`} draggable={false} />
            {onOrt &&
              erg!.teile
                .filter((t) => t.seite === n)
                .map((t) => {
                  const o = ortVon(t.id)
                  if (!o) return null
                  // der Platz des Blatts im Ablauf ist kein eigener Teil (das Blatt steht darunter)
                  if (o.schritt !== undefined && sitzung?.schritte[o.schritt] && istBlattSchritt(sitzung.schritte[o.schritt])) return null
                  return (
                    <button
                      key={t.id + n}
                      type="button"
                      className={'pg-tippflaeche' + (gleich(o, markiert) ? ' an' : '')}
                      style={{ left: `${(100 * t.x) / seite.b}%`, top: `${(100 * t.y) / seite.h}%`, width: `${(100 * t.b) / seite.b}%`, height: `${(100 * t.h) / seite.h}%` }}
                      aria-label={`${o.blatt !== undefined ? 'Blatt' : 'Plan'}: ${name(o)} – antippen zum Ersetzen`}
                      title={`${name(o)} – antippen zum Ersetzen`}
                      onClick={() => onOrt(o)}
                    />
                  )
                })}
          </div>
        )
      })}
      {!erg && laedt && <div className="pg-pdfplatz" style={{ aspectRatio: '595 / 842' }} />}
      {laedt && (
        <div className="pg-pdflaedt" role="status">
          <span className="pg-spin" /> {erg ? 'wird aktualisiert …' : 'PDF wird erstellt …'}
        </div>
      )}
      {fehler && <div className="pg-pdflaedt">{fehler}</div>}
    </div>
  )
}

/** Blatt einer Sitzung: echtes PDF oder Skizze; `onTeil` öffnet die Alternativen eines Blatt-Teils */
export function BlattAnsicht({ plan, nr, breite, nurErste, onTeil, markiert, pdf = true }: { plan: Plan; nr: number; breite: number; nurErste?: boolean; onTeil?: (i: number) => void; markiert?: number; pdf?: boolean }) {
  const pg = usePg()
  const p = useProfil()
  const s = plan.sitzungen.find((x) => x.nr === nr)
  const zerlegt = useMemo(() => (pg.katalog && s?.blatt ? zerlegen(pg.katalog, p, plan, nr, p.sprache.blatt) : null), [pg.katalog, p, plan, nr, s?.blatt])
  if (!s?.blatt || !zerlegt) return <p className="pg-leise">Diese Sitzung hat kein Blatt.</p>
  if (pdf && pdfAnzeigbar())
    return (
      <PdfSeiten
        plan={plan}
        nr={nr}
        breite={breite}
        nurBlatt
        nurErste={nurErste}
        titel={`Blatt „${s.blatt.titel}“`}
        onOrt={onTeil ? (o) => o.blatt !== undefined && onTeil(o.blatt) : undefined}
        markiert={markiert !== undefined && markiert >= 0 ? { sitzung: nr, blatt: markiert } : null}
      />
    )
  const zus = blattZusatz(zerlegt.blatt)
  const teilName = (i: number) => {
    const t = s.blatt!.bausteine[i]
    return t ? teilText(pg.katalog, t.ref, p.sprache.blatt, t.t).titel : `Teil ${i + 1}`
  }
  return (
    <div className="pg-skizze">
      {!nurErste && (
        <p className="pg-skizzehinweis">
          <Ic n="info" />
          Skizze zum Antippen – dieser Browser zeigt das PDF nicht direkt an. Das gedruckte Blatt kann leicht abweichen.
        </p>
      )}
      <A4Blatt
        zerlegt={zerlegt}
        layout={p.layout}
        kopfzeile={`Passgenau · ${p.stufen.join(', ')}`}
        vorname={p.anrede}
        quellen={zus?.herkunft ?? ''}
        breite={breite}
        nurErste={nurErste}
        onTeil={onTeil}
        markiert={markiert}
        teilName={teilName}
        ziel={pg.druck.ziel && p.alterJahre < 12 ? (zus?.ziel?.[p.sprache.blatt] ?? zus?.ziel?.de ?? null) : null}
        onFuellung={(f) => gemessenSetzen(messSchluessel(plan, nr, p.layout, pg.druck.ziel && p.alterJahre < 12), f)}
      />
    </div>
  )
}

/** Füllung je Seite: in der Skizze gemessen, sonst geschätzt (Kern) */
export function useSeitenFuellung(plan: Plan, nr: number): number[] {
  const pg = usePg()
  const p = useProfil()
  const s = plan.sitzungen.find((x) => x.nr === nr)
  const gemessen = useGemessen(messSchluessel(plan, nr, p.layout, pg.druck.ziel && p.alterJahre < 12))
  if (!pg.katalog || !s?.blatt) return []
  return gemessen ?? K.seitenFuellung(pg.katalog, p, plan, nr)
}

/** Seitenkontrolle als Balken (7.4) */
export function Seitenkontrolle({ plan, nr }: { plan: Plan; nr: number }) {
  const p = useProfil()
  const fuell = useSeitenFuellung(plan, nr)
  if (!fuell.length) return null
  const max = p.layout === 'bild' || p.layout === 'gross' ? 1 : 2
  const zuViel = fuell.length > max || fuell.some((f) => f > 1)
  return (
    <div className="pg-seitenkontrolle" aria-label="Seitenkontrolle">
      {fuell.map((f, i) => {
        const proz = Math.round(f * 100)
        const art = f > 1 ? 'bad' : f < 0.35 && i > 0 ? 'warn' : ''
        return (
          <span key={i} className={'pg-sbar ' + art}>
            Seite {i + 1}
            <span className="bahn" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.min(100, proz)} aria-label={`Seite ${i + 1} zu ${proz} % gefüllt`}>
              <i style={{ width: Math.min(100, proz) + '%' }} />
            </span>
            {proz} %
          </span>
        )
      })}
      {zuViel ? (
        <Pill art="bad" icon="info">
          zu lang: höchstens {max} {max === 1 ? 'Seite' : 'Seiten'} – Linien kürzen oder einen kleineren Baustein tauschen
        </Pill>
      ) : fuell.length > 1 && fuell[fuell.length - 1] < 0.35 ? (
        <Pill art="warn" icon="info">
          letzte Seite fast leer – noch ein Baustein?
        </Pill>
      ) : (
        <Pill art="ok" icon="check">
          passt auf A4 ({fuell.length} {fuell.length === 1 ? 'Seite' : 'Seiten'})
        </Pill>
      )}
    </div>
  )
}

/** Planblatt für die Fachkraft (Skizze, wenn kein PDF angezeigt werden kann) */
function PlanSeite({ plan, nr, breite, onSchritt }: { plan: Plan; nr: number; breite: number; onSchritt: (i: number) => void }) {
  const pg = usePg()
  const p = useProfil()
  const s = plan.sitzungen.find((x) => x.nr === nr)!
  const leicht = s.phase === 'leicht'
  const z = breite / (210 * MM)
  const innen = useRef<HTMLDivElement>(null)
  const [h, setH] = useState(297 * MM)
  useEffect(() => {
    if (innen.current) setH(Math.max(297 * MM, innen.current.scrollHeight))
  })
  let t = 0
  const material: string[] = []
  s.schritte.forEach((x) => {
    const e = pg.katalog ? K.eintrag(pg.katalog, x.ref) : undefined
    if (e?.typ === 'schritt') material.push(...e.material)
  })
  if (s.blatt) material.push(`Blatt „${s.blatt.titel}“, Stifte`)
  const wc = { profil: p, vorname: pg.vorname, plan }
  return (
    <div className="pga-huelle" style={{ width: breite, height: h * z }}>
      <div ref={innen} className="pga-seite pga-plan" style={{ transform: `scale(${z})`, minHeight: '297mm', height: 'auto', '--bf': '#2E3A9C', '--bf-z': '#ECEEFA' } as React.CSSProperties}>
        <div className="pga-skopf">
          <span className="tag">Plan</span>
          <span>Passgenau · für die Fachkraft – nicht fürs Kind</span>
          <span className="nd">
            <span>{pg.ich.name}</span>
          </span>
        </div>
        <div className="pga-strich" />
        <div className="ptitel">{leicht ? `Heute leicht${pg.vorname ? ' · ' + pg.vorname : ''}` : plan.n > 1 ? `${plan.titel} · Sitzung ${nr} von ${plan.n}` : plan.titel}</div>
        <div className="pmeta">
          {minutenVon(s)} Min. · {SOZIALFORM_NAME[plan.auftrag?.sozialform ?? 'einzeln']} · {leicht ? 'ohne Förderziel' : 'Phase: ' + PHASE_NAME[s.phase]} · Rituale wie immer
        </div>
        {!leicht && (
          <div className="zl">
            {plan.ziele.map((c) => (
              <span key={c}>
                <b>{c}</b> {p.ziele.find((x) => x.code === c)?.ich ?? zielKurz(c)}
              </span>
            ))}
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th style={{ width: '15mm' }}>Min.</th>
              <th style={{ width: '24mm' }}>Teil</th>
              <th>Was – und so kannst du es sagen</th>
            </tr>
          </thead>
          <tbody>
            {s.schritte.map((x, i) => {
              const von = t
              t += x.min
              const e = pg.katalog ? K.eintrag(pg.katalog, x.ref) : undefined
              if (istBlattSchritt(x))
                return (
                  <tr key={i}>
                    <td className="min">{`${von}–${t}`}</td>
                    <td>Übung · Blatt</td>
                    <td>
                      <b>Blatt „{s.blatt?.titel}“</b> – {s.blatt?.bausteine.length ?? 0} Bausteine, Aufgaben vorlesen, beim Schreiben helfen.
                    </td>
                  </tr>
                )
              const tx = e ? K.textVon(e, p.sprache.blatt) : null
              const extra = e as { achtung?: string; elternbrief?: string } | undefined
              return (
                <tr key={i}>
                  <td className="min">{`${von}–${t}`}</td>
                  <td>{ROLLE_NAME[x.rolle]}</td>
                  <td>
                    <button type="button" className="pga-zeile" onClick={() => onSchritt(i)} aria-label={`${ROLLE_NAME[x.rolle]}: ${tx?.titel ?? x.t} – antippen zum Ersetzen`}>
                      <b>{tx?.titel ?? x.t ?? 'nicht mehr im Katalog'}</b> – {tx?.text}
                      {tx?.sagen?.[0] && <span className="s">„{tx.sagen[0]}“</span>}
                      {tx?.wennEsKippt && <span className="s">Wenn es kippt: {tx.wennEsKippt}</span>}
                      {extra?.achtung && <span className="a">Beachten: {extra.achtung.slice(0, 240)}</span>}
                      {!pg.druck.ohneWarum && x.warum?.length ? <span className="w">Warum: {warumListe(x.warum, wc, true).join(' · ')}</span> : null}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <h4>Material</h4>
        <div className="mat">
          {[...new Set(material)].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <h4>Nach der Stunde</h4>
        <div className="pmeta">Hat geklappt · teils · nicht geklappt – ein Klick schreibt die Notiz ins Dossier.</div>
        <div className="notiz" />
        <div className="pga-sfuss">
          <span className="logo" />
          <div>
            <b>CDSE Toolbox</b> · Passgenau · Planblatt
            <br />
            vertraulich – nicht fürs Kind · keine Testwerte, keine Diagnosen
          </div>
          <span className="rechts">Gewichte {plan.gewichte}</span>
        </div>
      </div>
    </div>
  )
}

/** Liste der Teile einer Sitzung zum Antippen (neben dem PDF) */
export function TeileListe({ plan, nr, onOrt }: { plan: Plan; nr: number; onOrt: (o: Ort) => void }) {
  const pg = usePg()
  const p = useProfil()
  const s = plan.sitzungen.find((x) => x.nr === nr)!
  const k = pg.katalog
  const seiten = k && s.blatt ? K.seitenFuellung(k, p, plan, nr) : []
  // grobe Seitenzuordnung nach Reihenfolge und Höhe (bis der Kern Positionen liefert)
  const seiteVon = (i: number) => {
    if (seiten.length <= 1) return 1
    const anteil = (i + 1) / (s.blatt?.bausteine.length ?? 1)
    return anteil <= seiten[0] / (seiten[0] + seiten[1]) ? 1 : 2
  }
  return (
    <div className="pg-teileliste">
      <h3>Im Plan</h3>
      <ul>
        {s.schritte.map((x, i) => {
          if (istBlattSchritt(x)) return null
          const e = k ? K.eintrag(k, x.ref) : undefined
          return (
            <li key={i}>
              <button type="button" onClick={() => onOrt({ sitzung: nr, schritt: i })}>
                <span className={'pg-rolle r-' + x.rolle}>{ROLLE_NAME[x.rolle]}</span>
                <span className="t">{e ? K.textVon(e, p.sprache.blatt).titel : x.t}</span>
                <Ic n="tausch" />
              </button>
            </li>
          )
        })}
      </ul>
      {s.blatt && (
        <>
          <h3>Auf dem Blatt</h3>
          <ul>
            {s.blatt.bausteine.map((b, i) => {
              return (
                <li key={i}>
                  <button type="button" onClick={() => onOrt({ sitzung: nr, blatt: i })}>
                    <span className="pg-pill">S. {seiteVon(i)}</span>
                    <span className="t">{teilText(k, b.ref, p.sprache.blatt, b.t).titel}</span>
                    <Ic n="tausch" />
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export function Vorschau() {
  const pg = usePg()
  const p = useProfil()
  const plan = pg.plan
  const ref = useRef<HTMLDivElement>(null)
  const [breite, setBreite] = useState(560)
  useEffect(() => {
    const messen = () => {
      const w = ref.current?.clientWidth ?? 1000
      setBreite(Math.max(260, Math.min(600, w > 1000 ? (w - 24) / 2 : w)))
    }
    messen()
    window.addEventListener('resize', messen)
    return () => window.removeEventListener('resize', messen)
  }, [])
  if (!plan || !pg.sitzung) return null
  const s = pg.sitzung
  const pdf = pdfAnzeigbar()
  return (
    <>
      <section className="pg-kopf">
        <div>
          <div className="pg-eyebrow">PDF-Vorschau · Sitzung {s.nr}{s.gedruckt ? ` · gedruckt ${datumKurz(s.gedruckt)}` : ''}</div>
          <h1>Plan und Blatt</h1>
          <p className="pg-lead">
            {pdf ? 'Das echte PDF – derselbe Renderer wie jedes Toolbox-Blatt. Tippe im PDF (oder in der Liste der Teile) auf einen Teil, um ihn zu ersetzen.' : 'Skizze: Tippe auf einen Teil – im Plan oder auf dem Blatt –, um ihn zu ersetzen.'}
          </p>
        </div>
        <div className="pg-btnrow">
          <Chip an={pg.druck.vorname} onClick={() => pg.setDruck((d) => ({ ...d, vorname: !d.vorname }))}>
            Vorname einsetzen
          </Chip>
          <Chip an={pg.druck.ziel && p.alterJahre < 12} disabled={p.alterJahre >= 12} titel={p.alterJahre >= 12 ? 'bei Jugendlichen nie' : undefined} onClick={() => pg.setDruck((d) => ({ ...d, ziel: !d.ziel }))}>
            „Mein Ziel“ drucken
          </Chip>
          <Chip an={pg.druck.ohneWarum} onClick={() => pg.setDruck((d) => ({ ...d, ohneWarum: !d.ohneWarum }))}>
            ohne Begründungen
          </Chip>
          <button type="button" className="pg-btn" onClick={() => pg.setAnsicht('ergebnis')}>
            <Ic n="zurueck" />
            Zurück
          </button>
          <button type="button" className="pg-btn primaer" onClick={() => pg.pdfErzeugen(s.nr)}>
            <Ic n="drucken" />
            PDF erzeugen
          </button>
        </div>
      </section>
      <HeikelBanner />
      <Seitenkontrolle plan={plan} nr={s.nr} />
      <div ref={ref} className={'pg-vorschau' + (pdf ? ' mitpdf' : '')}>
        {pdf ? (
          <>
            <div className="pg-vorschau-pdf">
              <PdfSeiten plan={plan} nr={s.nr} breite={Math.min(760, breite * 1.35)} titel={`Plan und Blatt, Sitzung ${s.nr}`} onOrt={(o) => pg.setDlg({ art: 'ersetzen', ort: o })} markiert={pg.dlg?.art === 'ersetzen' ? pg.dlg.ort : null} />
            </div>
            <aside className="pg-card">
              <TeileListe plan={plan} nr={s.nr} onOrt={(o) => pg.setDlg({ art: 'ersetzen', ort: o })} />
            </aside>
          </>
        ) : (
          <>
            <PlanSeite plan={plan} nr={s.nr} breite={breite} onSchritt={(i) => pg.setDlg({ art: 'ersetzen', ort: { sitzung: s.nr, schritt: i } })} />
            {s.blatt && <BlattAnsicht plan={plan} nr={s.nr} breite={breite} onTeil={(i) => pg.setDlg({ art: 'ersetzen', ort: { sitzung: s.nr, blatt: i } })} />}
          </>
        )}
      </div>
    </>
  )
}

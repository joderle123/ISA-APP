// Passgenau – Vorschau aus dem echten Renderer (T-M8): das PDF des Kerns (pdfSitzung → react-pdf) im Rahmen, daneben die
// Teile zum Antippen. Kann der Browser kein PDF anzeigen (Android, eingebettete Ansichten), zeigt die Seite eine Skizze
// (HTML) mit denselben Teilen – ausdrücklich als Skizze beschriftet.
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import type { Plan } from '../typen'
import * as K from './kern'
import { usePg, useProfil, type Ort } from './zustand'
import { Ic } from './zeichen'
import { A4Blatt, MM } from './A4'
import { zerlegen } from './blattTeile'
import { blattZusatz } from './erweitert'
import { istBlattSchritt, minutenVon, warumListe } from './anzeige'
import { Chip, HeikelBanner, Pill } from './Teile'
import { PHASE_NAME, ROLLE_NAME, datumKurz, zielKurz } from './texte'

export const pdfAnzeigbar = (): boolean => (navigator as Navigator & { pdfViewerEnabled?: boolean }).pdfViewerEnabled !== false

// Zwischenspeicher der erzeugten PDFs (Schlüssel aus Plan-Sitzung und Druckoptionen)
const PDF_CACHE = new Map<string, string>()
function cacheSetzen(k: string, url: string) {
  PDF_CACHE.set(k, url)
  while (PDF_CACHE.size > 8) {
    const [alt, u] = PDF_CACHE.entries().next().value as [string, string]
    URL.revokeObjectURL(u)
    PDF_CACHE.delete(alt)
  }
}

// In der Skizze gemessene Seitenfüllung (genauer als die Schätzung, solange kein Kern misst). Schlüssel: Blatt + Layout.
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

/** Das echte PDF einer Sitzung im Rahmen (entprellt, eine Erzeugung gleichzeitig) */
function PdfRahmen({ plan, nr, hoehe, titel }: { plan: Plan; nr: number; hoehe: number; titel: string }) {
  const pg = usePg()
  const p = useProfil()
  const sitzung = plan.sitzungen.find((s) => s.nr === nr)
  const opt = { sprache: p.sprache.blatt, warum: !pg.druck.ohneWarum, karten: true, ziel: pg.druck.ziel && p.alterJahre < 12, vorname: pg.druck.vorname }
  const key = JSON.stringify([plan.id, nr, sitzung?.schritte.map((s) => [s.ref, s.min, s.ueber]), sitzung?.blatt, opt, p.anrede, p.layout, p.stufen])
  const [url, setUrl] = useState<string | null>(PDF_CACHE.get(key) ?? null)
  const [laedt, setLaedt] = useState(!PDF_CACHE.has(key))
  const [fehler, setFehler] = useState<string | null>(null)
  const lauf = useRef(0)
  useEffect(() => {
    if (PDF_CACHE.has(key)) {
      setUrl(PDF_CACHE.get(key)!)
      setLaedt(false)
      return
    }
    const id = ++lauf.current
    setLaedt(true)
    const t = window.setTimeout(() => {
      if (!pg.katalog) return
      K.pdfSitzung(pg.katalog, p, plan, nr, opt)
        .then((blob) => {
          const u = URL.createObjectURL(blob)
          cacheSetzen(key, u)
          if (id === lauf.current) {
            setUrl(u)
            setLaedt(false)
            setFehler(null)
          }
        })
        .catch((e) => id === lauf.current && (setFehler(e instanceof Error ? e.message : 'PDF nicht möglich'), setLaedt(false)))
    }, 450)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return (
    <div className="pg-pdfrahmen" style={{ height: hoehe }}>
      {url && <iframe src={url + '#toolbar=0&navpanes=0&view=FitH'} title={titel} />}
      {laedt && (
        <div className="pg-pdflaedt" role="status">
          <span className="pg-spin" /> {url ? 'wird aktualisiert …' : 'PDF wird erstellt …'}
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
  if (pdf && pdfAnzeigbar()) return <PdfRahmen plan={plan} nr={nr} hoehe={Math.round(breite * 1.414 * (nurErste ? 1 : 1.02)) + (nurErste ? 0 : 40)} titel={`Blatt „${s.blatt.titel}“`} />
  const zus = blattZusatz(zerlegt.blatt)
  const teilName = (i: number) => {
    const t = s.blatt!.bausteine[i]
    const e = pg.katalog && t ? K.eintrag(pg.katalog, t.ref) : undefined
    return e ? K.textVon(e, p.sprache.blatt).titel : t?.t ?? `Teil ${i + 1}`
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
          {minutenVon(s)} Min. · Einzel · {leicht ? 'ohne Förderziel' : 'Phase: ' + PHASE_NAME[s.phase]} · Rituale wie immer
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
              const e = k ? K.eintrag(k, b.ref) : undefined
              return (
                <li key={i}>
                  <button type="button" onClick={() => onOrt({ sitzung: nr, blatt: i })}>
                    <span className="pg-pill">S. {seiteVon(i)}</span>
                    <span className="t">{e ? K.textVon(e, p.sprache.blatt).titel : b.t}</span>
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
            {pdf ? 'Das PDF entsteht mit demselben Renderer wie jedes Toolbox-Blatt. Tippe rechts auf einen Teil, um ihn zu ersetzen.' : 'Tippe auf einen Teil – im Plan oder auf dem Blatt –, um ihn zu ersetzen.'}
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
              <BlattAnsicht plan={plan} nr={s.nr} breite={Math.min(760, breite * 1.35)} />
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

// ---------------------------------------------------------------------------
// Arbeitsblätter: stöbern, filtern, als PDF ansehen und herunterladen.
// ---------------------------------------------------------------------------
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { alleBlaetter, blattById } from '../data/blaetter'
import type { Bereich, NummeriertesBlatt, Sprache, Stufe } from '../blatt/typen'
import { BEREICHE, bereichById, STUFEN_REIHE, stufenText, THEMEN, themaLabel } from '../blatt/katalog'
import { bildZeichnung, iconZeichnung, palette } from '../blatt/zeichnung'
import { ZeichnungSvg } from '../blatt/ZeichnungSvg'
import { eldibGoalById } from '../data/taxonomy'
import { domainStyle, goalText } from '../lib/ui'
import { loadPdfModule } from '../lib/loadPdf'
import { toast } from '../lib/toast'
import type { Bewertungen } from '../lib/useBewertungen'
import { BewertungKurz, BewertungVoll } from '../components/Bewertung'
import { Dialog } from '../components/Dialog'
import { Icon } from '../components/Icon'

export interface BlattFilter {
  suche: string
  bereich: Bereich | ''
  thema: string
  stufen: Stufe[]
  nurFr: boolean
  eldib: string[]
}
export const leererBlattFilter: BlattFilter = { suche: '', bereich: '', thema: '', stufen: [], nurFr: false, eldib: [] }

type Sortierung = 'nummer' | 'bewertung' | 'titel'

const SOZIAL: Record<string, string> = { einzeln: 'Einzeln', gruppe: 'Kleingruppe', klasse: 'Klasse' }

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function trifft(b: NummeriertesBlatt, f: BlattFilter): boolean {
  if (f.bereich && b.bereich !== f.bereich) return false
  if (f.thema && b.thema !== f.thema) return false
  if (f.stufen.length && !b.stufen.some((s) => f.stufen.includes(s))) return false
  if (f.nurFr && !b.fr) return false
  if (f.eldib.length && !b.eldib.some((e) => f.eldib.includes(e))) return false
  const q = norm(f.suche.trim())
  if (q) {
    const text = norm(
      [b.nr, b.id, b.de.titel, b.de.untertitel ?? '', b.fr?.titel ?? '', b.schlagworte.join(' '), themaLabel(b.bereich, b.thema), bereichById.get(b.bereich)?.de ?? '', b.eldib.join(' '), b.stufen.join(' ')].join(' '),
    )
    if (!q.split(/\s+/).every((w) => text.includes(w))) return false
  }
  return true
}

function Leitbild({ b, klein }: { b: NummeriertesBlatt; klein?: boolean }) {
  const bereich = bereichById.get(b.bereich)!
  const p = palette(bereich.farben)
  const id = b.bild ?? 'icon:' + bereich.icon
  const z = bildZeichnung(id)
  const istIcon = id.startsWith('icon:')
  const zz = istIcon ? { ...z, w: 1.5 } : z
  return (
    <span className={`bl-bild ${klein ? 'klein' : ''}`} style={{ background: bereich.farben.zart }}>
      <ZeichnungSvg z={zz} p={p} className={istIcon ? 'icon' : 'motiv'} />
    </span>
  )
}

function BlattKarte({ b, bew, gewaehlt, onOeffnen, onWaehlen, onLaden, laedt }: { b: NummeriertesBlatt; bew: Bewertungen; gewaehlt: boolean; onOeffnen: () => void; onWaehlen: () => void; onLaden: () => void; laedt: boolean }) {
  const bereich = bereichById.get(b.bereich)!
  return (
    <article className="bl-karte" style={{ ['--bc' as string]: bereich.farben.tief, ['--bz' as string]: bereich.farben.zart }}>
      <div className="bl-karte-kopf">
        <Leitbild b={b} />
        <div className="min-w-0">
          <span className="bl-nr">{b.nr}</span>
          <span className="bl-bereich">{bereich.de}</span>
        </div>
        <label className="bl-wahl" title={gewaehlt ? 'Aus der Mappe nehmen' : 'In die Mappe legen'}>
          <input type="checkbox" checked={gewaehlt} onChange={onWaehlen} />
          <span className="sr-only">In die Mappe: {b.de.titel}</span>
          <Icon name={gewaehlt ? 'check' : 'layers'} />
        </label>
      </div>
      <div className="flex grow flex-col gap-2 px-4 pt-3 pb-3">
        <h3 className="disp text-[17.5px] leading-[1.25] text-ink">
          <button type="button" className="card-open text-left" onClick={onOeffnen}>
            {b.de.titel}
          </button>
        </h3>
        {b.de.untertitel ? <p className="clamp-2 text-[13.5px] leading-[1.5] text-muted">{b.de.untertitel}</p> : null}
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
          <span className="tag">{stufenText(b.stufen)}</span>
          <span className="tag tag-outline">{themaLabel(b.bereich, b.thema)}</span>
          {b.fr ? (
            <span className="tag tag-outline" title="Auch auf Französisch">
              FR
            </span>
          ) : null}
          <span className="text-[12.5px] text-muted">{b.dauer}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-line px-4 py-2.5">
        <BewertungKurz gesamt={bew.gesamt.get(b.id)} eigen={bew.eigene[b.id] || 0} />
        <span className="grow" />
        <button type="button" className="btn btn-sm raise" onClick={onLaden} disabled={laedt} aria-label={`PDF herunterladen: ${b.de.titel}`}>
          {laedt ? <span className="spin" /> : <Icon name="download" />}
          PDF
        </button>
      </div>
    </article>
  )
}

function Vorschau({ b, sprache, lehrer }: { b: NummeriertesBlatt; sprache: Sprache; lehrer: boolean }) {
  const [url, setUrl] = useState<string | null>(null)
  const [fehler, setFehler] = useState<string | null>(null)
  useEffect(() => {
    let aus = false
    let u: string | null = null
    setUrl(null)
    setFehler(null)
    loadPdfModule()
      .then((m) => m.blattBlob(b, { sprache, nr: b.nr, lehrer }))
      .then((blob) => {
        if (aus) return
        u = URL.createObjectURL(blob)
        setUrl(u)
      })
      .catch((e) => !aus && setFehler(e instanceof Error ? e.message : 'Vorschau nicht möglich'))
    return () => {
      aus = true
      if (u) URL.revokeObjectURL(u)
    }
  }, [b, sprache, lehrer])
  if (fehler) return <div className="bl-vorschau leer">{fehler}</div>
  if (url && (navigator as Navigator & { pdfViewerEnabled?: boolean }).pdfViewerEnabled === false)
    return (
      <div className="bl-vorschau leer flex-col text-center">
        <Leitbild b={b} />
        <p className="max-w-[260px]">Dieser Browser zeigt PDFs nicht direkt an. Lade das Blatt herunter oder öffne es in einem neuen Tab.</p>
        <a className="btn" href={url} target="_blank" rel="noreferrer">
          <Icon name="external" />
          In neuem Tab öffnen
        </a>
      </div>
    )
  if (!url)
    return (
      <div className="bl-vorschau leer">
        <span className="spin" /> Vorschau wird erstellt …
      </div>
    )
  return <iframe className="bl-vorschau" src={url + '#toolbar=0&navpanes=0&view=FitH'} title={`Vorschau: ${b.de.titel}`} />
}

/** Detail eines Blatts (Vorschau, Download, Bewertung). Auch vom Skills-Kurs benutzt – dort ohne Mappe. */
export function BlattDetail({ b, bew, onSchliessen, onOeffnen, gewaehlt, onWaehlen }: { b: NummeriertesBlatt; bew: Bewertungen; onSchliessen: () => void; onOeffnen: (id: string) => void; gewaehlt?: boolean; onWaehlen?: () => void }) {
  const [sprache, setSprache] = useState<Sprache>('de')
  const [laedt, setLaedt] = useState<string | null>(null)
  const bereich = bereichById.get(b.bereich)!
  const inhalt = sprache === 'fr' && b.fr ? b.fr : b.de
  const verwandt = useMemo(
    () => alleBlaetter.filter((x) => x.id !== b.id && (x.thema === b.thema && x.bereich === b.bereich || (b.verwandt ?? []).includes(x.id))).slice(0, 6),
    [b],
  )
  async function laden(art: 'schueler' | 'lehrer' | 'beide') {
    setLaedt(art)
    try {
      const m = await loadPdfModule()
      const name = await m.downloadBlatt(b, { sprache, nr: b.nr, schueler: art !== 'lehrer', lehrer: art !== 'schueler' })
      toast(`PDF erstellt: ${name}`, 'ok')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'PDF konnte nicht erstellt werden.', 'error')
    } finally {
      setLaedt(null)
    }
  }
  return (
    <Dialog onClose={onSchliessen} labelledBy="bl-detail-titel" className="dlg-wide bl-detail">
      <header className="dlg-head items-center" style={{ ['--bc' as string]: bereich.farben.tief }}>
        <Leitbild b={b} klein />
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] font-semibold text-muted">
            <span style={{ color: bereich.farben.tief }}>{bereich.de}</span> · {themaLabel(b.bereich, b.thema)} · Arbeitsblatt {b.nr}
          </div>
          <h2 id="bl-detail-titel" className="disp truncate text-[20px] leading-tight">
            {inhalt.titel}
          </h2>
        </div>
        {b.fr ? (
          <div className="seg" role="group" aria-label="Sprache">
            <button type="button" aria-pressed={sprache === 'de'} onClick={() => setSprache('de')}>
              DE
            </button>
            <button type="button" aria-pressed={sprache === 'fr'} onClick={() => setSprache('fr')}>
              FR
            </button>
          </div>
        ) : null}
        <button type="button" onClick={onSchliessen} className="icon-btn" aria-label="Schließen">
          <Icon name="x" />
        </button>
      </header>
      <div className="dlg-body scroll-slim bl-detail-body" data-autofocus tabIndex={-1} style={{ outline: 'none' }}>
        <div className="bl-detail-vorschau">
          <Vorschau b={b} sprache={sprache} lehrer />
        </div>
        <div className="bl-detail-info">
          <div className="flex flex-col gap-2">
            <button type="button" className="btn btn-primary justify-center" onClick={() => laden('schueler')} disabled={!!laedt}>
              {laedt === 'schueler' ? <span className="spin" /> : <Icon name="download" />}
              Arbeitsblatt (PDF)
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="btn justify-center" onClick={() => laden('beide')} disabled={!!laedt}>
                {laedt === 'beide' ? <span className="spin" /> : <Icon name="file" />}
                Mit Lehrerseite
              </button>
              <button type="button" className="btn justify-center" onClick={() => laden('lehrer')} disabled={!!laedt}>
                {laedt === 'lehrer' ? <span className="spin" /> : <Icon name="book" />}
                Nur Lehrerseite
              </button>
            </div>
            {onWaehlen ? (
              <button type="button" className="btn btn-quiet justify-center" onClick={onWaehlen}>
                <Icon name={gewaehlt ? 'check' : 'layers'} />
                {gewaehlt ? 'In der Mappe' : 'In die Mappe legen'}
              </button>
            ) : null}
          </div>

          <dl className="bl-fakten">
            <div>
              <dt>Ziel</dt>
              <dd>{inhalt.lehrer.ziel}</dd>
            </div>
            <div>
              <dt>Stufe</dt>
              <dd>{stufenText(b.stufen)}</dd>
            </div>
            <div>
              <dt>Dauer</dt>
              <dd>{b.dauer}</dd>
            </div>
            <div>
              <dt>Sozialform</dt>
              <dd>{b.sozialform.map((s) => SOZIAL[s] ?? s).join(', ')}</dd>
            </div>
            {inhalt.lehrer.material ? (
              <div>
                <dt>Material</dt>
                <dd>{inhalt.lehrer.material}</dd>
              </div>
            ) : null}
            <div>
              <dt>ELDiB</dt>
              <dd className="flex flex-wrap gap-1.5">
                {b.eldib.map((g) => (
                  <span key={g} className="code" style={domainStyle(g)} title={goalText(g)}>
                    {g} <span className="font-normal">{eldibGoalById.get(g)?.label}</span>
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <BewertungVoll
            titel={b.de.titel}
            gesamt={bew.gesamt.get(b.id)}
            eigen={bew.eigene[b.id] || 0}
            notiz={bew.notizen[b.id] || ''}
            verbunden={bew.verbunden}
            onBewerten={(n) => bew.bewerten(b.id, n)}
            onNotiz={(t) => bew.notieren(b.id, t)}
          />

          {verwandt.length > 0 && (
            <section>
              <h3 className="bew-label mb-2">Zum selben Thema</h3>
              <ul className="bl-verwandt">
                {verwandt.map((x) => (
                  <li key={x.id}>
                    <button type="button" onClick={() => onOeffnen(x.id)}>
                      <span className="tag">{stufenText(x.stufen)}</span>
                      <span className="truncate">{x.de.titel}</span>
                      <span className="text-muted">{x.nr}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </Dialog>
  )
}

export function Blaetter({
  aktiv,
  bew,
  startFilter,
  startBlatt,
  onEinheitenZuEldib,
}: {
  aktiv: boolean
  bew: Bewertungen
  startFilter: BlattFilter
  startBlatt: string | null
  onEinheitenZuEldib: (codes: string[]) => void
}) {
  const [filter, setFilter] = useState<BlattFilter>(startFilter)
  const [sort, setSort] = useState<Sortierung>('nummer')
  const [offen, setOffen] = useState<NummeriertesBlatt | null>(() => (startBlatt ? (blattById.get(startBlatt) ?? null) : null))
  const [mappe, setMappe] = useState<string[]>([])
  const [laedt, setLaedt] = useState<string | null>(null)
  const [filterOffen, setFilterOffen] = useState(false)
  const suchRef = useRef<HTMLInputElement>(null)

  useEffect(() => setFilter(startFilter), [startFilter])
  useEffect(() => {
    if (startBlatt) setOffen(blattById.get(startBlatt) ?? null)
  }, [startBlatt])

  const q = useDeferredValue(filter)
  const treffer = useMemo(() => {
    const l = alleBlaetter.filter((b) => trifft(b, q))
    if (sort === 'titel') l.sort((a, b) => a.de.titel.localeCompare(b.de.titel, 'de'))
    else if (sort === 'bewertung') l.sort((a, b) => (bew.gesamt.get(b.id)?.schnitt ?? bew.eigene[b.id] ?? 0) - (bew.gesamt.get(a.id)?.schnitt ?? bew.eigene[a.id] ?? 0))
    return l
  }, [q, sort, bew.gesamt, bew.eigene])

  const zaehle = useCallback((f: Partial<BlattFilter>) => alleBlaetter.filter((b) => trifft(b, { ...q, ...f })).length, [q])
  const themen = THEMEN.filter((t) => !filter.bereich || t.bereich === filter.bereich)
  const set = (p: Partial<BlattFilter>) => setFilter((f) => ({ ...f, ...p }))
  const aktivZahl = (filter.bereich ? 1 : 0) + (filter.thema ? 1 : 0) + filter.stufen.length + (filter.nurFr ? 1 : 0) + filter.eldib.length + (filter.suche ? 1 : 0)

  function umschalten(id: string) {
    setMappe((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]))
  }
  async function laden(b: NummeriertesBlatt) {
    setLaedt(b.id)
    try {
      const m = await loadPdfModule()
      toast(`PDF erstellt: ${await m.downloadBlatt(b, { nr: b.nr, lehrer: false })}`, 'ok')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'PDF konnte nicht erstellt werden.', 'error')
    } finally {
      setLaedt(null)
    }
  }
  async function mappeLaden(lehrer: boolean) {
    const liste = mappe.map((id) => blattById.get(id)).filter(Boolean) as NummeriertesBlatt[]
    if (!liste.length) return
    setLaedt('mappe')
    try {
      const m = await loadPdfModule()
      toast(`Mappe erstellt: ${await m.downloadMappe(liste.map((b) => ({ blatt: b, nr: b.nr })), 'Arbeitsblaetter', { lehrer })}`, 'ok')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Mappe konnte nicht erstellt werden.', 'error')
    } finally {
      setLaedt(null)
    }
  }

  // Deep-Link #blatt=… aktuell halten
  useEffect(() => {
    if (!aktiv) return
    const h = offen ? '#blatt=' + encodeURIComponent(offen.id) : filter.eldib.length ? '#eldib=' + filter.eldib.map(encodeURIComponent).join(',') : '#'
    if (window.location.hash !== h && !(h === '#' && !window.location.hash)) history.replaceState(null, '', h === '#' ? window.location.pathname + window.location.search : h)
  }, [aktiv, offen, filter.eldib])

  const filterInhalt = (
    <div className="bl-filter">
      <section>
        <h3>Stufe</h3>
        <div className="flex flex-wrap gap-1.5">
          {STUFEN_REIHE.map((s) => {
            const an = filter.stufen.includes(s)
            return (
              <button key={s} type="button" className="fchip" aria-pressed={an} onClick={() => set({ stufen: an ? filter.stufen.filter((x) => x !== s) : [...filter.stufen, s] })}>
                {s === 'C1' ? 'C1 · Spielschule' : s === 'ES' ? 'ES · Sekundar' : s}
                <span className="n">{zaehle({ stufen: [s] })}</span>
              </button>
            )
          })}
        </div>
      </section>
      <section>
        <h3>Thema</h3>
        <div className="flex flex-col gap-0.5">
          {themen.map((t) => {
            const n = zaehle({ thema: t.id, bereich: t.bereich })
            if (!n && filter.thema !== t.id) return null
            const an = filter.thema === t.id
            return (
              <button key={t.bereich + t.id} type="button" className={`bl-thema ${an ? 'an' : ''}`} onClick={() => set({ thema: an ? '' : t.id, bereich: an ? filter.bereich : t.bereich })}>
                <span className="dot" style={{ background: bereichById.get(t.bereich)?.farben.tief }} />
                <span className="grow text-left">{t.de}</span>
                <span className="n">{n}</span>
              </button>
            )
          })}
        </div>
      </section>
      <section>
        <label className="check-row">
          <input type="checkbox" checked={filter.nurFr} onChange={(e) => set({ nurFr: e.target.checked })} />
          Auch auf Französisch
        </label>
      </section>
    </div>
  )

  return (
    <div className={aktiv ? '' : 'hidden'}>
      <div className="mx-auto max-w-[1440px] px-4 pt-6 pb-16 sm:px-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
          <div className="min-w-0">
            <h1 className="disp text-[26px] leading-tight text-ink sm:text-[30px]">Arbeitsblätter</h1>
            <p className="mt-1 text-[14px] text-muted" aria-live="polite">
              <b className="font-semibold text-ink">{treffer.length}</b>
              {treffer.length !== alleBlaetter.length ? ` von ${alleBlaetter.length}` : ''} Blätter · Spielschule bis Sekundarschule · jedes mit Seite für die Lehrperson
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="search search-sm w-[260px] max-w-full">
              <Icon name="search" />
              <span className="sr-only">Arbeitsblätter durchsuchen</span>
              <input ref={suchRef} type="search" value={filter.suche} onChange={(e) => set({ suche: e.target.value })} placeholder="Suchen: Wut, Freundschaft, V-21 …" autoComplete="off" />
            </label>
            <button type="button" className="btn lg:hidden" onClick={() => setFilterOffen(true)}>
              <Icon name="filter" />
              Filter
            </button>
            <label className="flex items-center gap-2 text-[13px] text-muted">
              <span className="max-sm:sr-only">Sortieren</span>
              <select className="field w-auto py-1.5 pr-8" value={sort} onChange={(e) => setSort(e.target.value as Sortierung)}>
                <option value="nummer">Nach Bereich</option>
                <option value="bewertung">Beste Bewertung</option>
                <option value="titel">Titel A–Z</option>
              </select>
            </label>
          </div>
        </div>

        <nav className="bl-bereiche" aria-label="Bereiche">
          <button type="button" className={`bl-bereich-kachel ${!filter.bereich ? 'an' : ''}`} onClick={() => set({ bereich: '', thema: '' })}>
            <span className="bl-bereich-ic" style={{ background: 'var(--accent-soft)' }}>
              <Icon name="layers" />
            </span>
            <span className="min-w-0">
              <b>Alle</b>
              <span>{zaehle({ bereich: '', thema: '' })} Blätter</span>
            </span>
          </button>
          {BEREICHE.map((br) => {
            const an = filter.bereich === br.id
            return (
              <button key={br.id} type="button" className={`bl-bereich-kachel ${an ? 'an' : ''}`} style={{ ['--bc' as string]: br.farben.tief, ['--bz' as string]: br.farben.zart }} onClick={() => set({ bereich: an ? '' : br.id, thema: '' })} aria-pressed={an}>
                <span className="bl-bereich-ic" style={{ background: br.farben.zart }}>
                  <ZeichnungSvg z={{ ...iconZeichnung(br.icon), w: 1.6 }} p={{ ...palette(br.farben), tinte: br.farben.tief }} />
                </span>
                <span className="min-w-0">
                  <b>{br.de}</b>
                  <span>{zaehle({ bereich: br.id, thema: '' })} Blätter</span>
                </span>
              </button>
            )
          })}
        </nav>

        {filter.eldib.length > 0 && (
          <div className="callout callout-info mb-4">
            <Icon name="info" />
            <div className="flex flex-wrap items-center gap-2">
              <span>Passend zu</span>
              {filter.eldib.map((g) => (
                <span key={g} className="code" style={domainStyle(g)} title={goalText(g)}>
                  {g}
                </span>
              ))}
              <button type="button" className="link-btn" onClick={() => onEinheitenZuEldib(filter.eldib)}>
                Auch Einheiten dazu ansehen
              </button>
              <button type="button" className="link-btn" onClick={() => set({ eldib: [] })}>
                Filter entfernen
              </button>
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
          <aside className="hidden lg:block" aria-label="Filter">
            <div className="panel scroll-slim sticky top-[80px] max-h-[calc(100vh-96px)] overflow-y-auto px-4 py-3">
              <div className="mb-1 flex items-center justify-between">
                <h2 className="disp text-[16px] text-ink">Filter</h2>
                {aktivZahl > 0 && (
                  <button type="button" className="link-btn text-[13px]" onClick={() => setFilter(leererBlattFilter)}>
                    Zurücksetzen
                  </button>
                )}
              </div>
              {filterInhalt}
            </div>
          </aside>
          <main id="blaetter" className="min-w-0">
            {treffer.length === 0 ? (
              <div className="panel px-6 py-12 text-center">
                <h2 className="disp text-[20px] text-ink">Kein passendes Arbeitsblatt</h2>
                <p className="mx-auto mt-2 max-w-[520px] text-[14.5px] text-muted">Entferne einzelne Filter oder suche nach einem anderen Stichwort.</p>
                <button type="button" className="btn btn-primary mt-5" onClick={() => setFilter(leererBlattFilter)}>
                  <Icon name="reset" />
                  Alle Filter zurücksetzen
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-4">
                {treffer.map((b) => (
                  <BlattKarte key={b.id} b={b} bew={bew} gewaehlt={mappe.includes(b.id)} onOeffnen={() => setOffen(b)} onWaehlen={() => umschalten(b.id)} onLaden={() => laden(b)} laedt={laedt === b.id} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {mappe.length > 0 && (
        <div className="bl-mappe" role="region" aria-label="Mappe">
          <Icon name="layers" />
          <span>
            <b>{mappe.length}</b> {mappe.length === 1 ? 'Blatt' : 'Blätter'} in der Mappe
          </span>
          <button type="button" className="btn btn-sm btn-primary" disabled={laedt === 'mappe'} onClick={() => mappeLaden(false)}>
            {laedt === 'mappe' ? <span className="spin" /> : <Icon name="download" />}
            Als ein PDF
          </button>
          <button type="button" className="btn btn-sm" disabled={laedt === 'mappe'} onClick={() => mappeLaden(true)}>
            Mit Lehrerseiten
          </button>
          <button type="button" className="icon-btn" onClick={() => setMappe([])} aria-label="Mappe leeren" title="Mappe leeren">
            <Icon name="x" />
          </button>
        </div>
      )}

      {offen && <BlattDetail key={offen.id} b={offen} bew={bew} onSchliessen={() => setOffen(null)} onOeffnen={(id) => setOffen(blattById.get(id) ?? null)} gewaehlt={mappe.includes(offen.id)} onWaehlen={() => umschalten(offen.id)} />}

      {filterOffen && (
        <Dialog onClose={() => setFilterOffen(false)} labelledBy="bl-filter-titel" className="dlg-mid">
          <header className="dlg-head items-center">
            <h2 id="bl-filter-titel" className="disp flex-1 text-[19px]">
              Filter
            </h2>
            <button type="button" className="icon-btn" onClick={() => setFilterOffen(false)} aria-label="Schließen">
              <Icon name="x" />
            </button>
          </header>
          <div className="dlg-body scroll-slim px-4 sm:px-6" data-autofocus tabIndex={-1} style={{ outline: 'none' }}>
            {filterInhalt}
          </div>
          <footer className="dlg-foot">
            <button type="button" className="btn btn-primary w-full" onClick={() => setFilterOffen(false)}>
              {treffer.length} Blätter anzeigen
            </button>
          </footer>
        </Dialog>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Arbeitsblätter: stöbern, filtern, als PDF ansehen und herunterladen.
// ---------------------------------------------------------------------------
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { alleBlaetter, blattById } from '../data/blaetter'
import { kursFrei } from '../lib/nutzer'
import type { Baustein, Bereich, NummeriertesBlatt, Sprache, Stufe } from '../blatt/typen'
import { BEREICHE, bereichById, STUFEN_REIHE, stufenText, THEMEN, themaLabel } from '../blatt/katalog'
import { MODULE, lektionenZahl, type Modul } from '../blatt/module'
import { ZUSAETZE, zusaetzeVon, type Zusatz } from '../blatt/spielschule'
import { experimentVon } from '../blatt/forschen'
import { bildZeichnung, iconZeichnung, palette } from '../blatt/zeichnung'
import { ZeichnungSvg } from '../blatt/ZeichnungSvg'
import { eldibGoalById } from '../data/taxonomy'
import { domainStyle, goalText } from '../lib/ui'
import { prepareInIdle, searchText, searchTokens, tokenMatch, type SearchToken } from '../lib/filter'
import { loadPdfModule } from '../lib/loadPdf'
import { ladePdfjs } from '../lib/pdfjs'
import type { Pdfjs } from '../lib/pdfjs-modul'
import { repositionToasts, toast } from '../lib/toast'
import { setBlattSprache, useBlattSprache } from '../lib/sprache'
import { MAPPE_MAX, mappeBereinigen, mappeFassung, mappeHinzufuegen, mappeLeeren, mappeUmschalten, useMappe } from '../lib/mappen'
import { FASSUNGEN, groesseresLayout, kuerzbar, type Fassung } from '../blatt/variante'
import { urheberschaft } from '../lib/urheber'
import { Urheber } from '../components/Urheber'
import type { Bewertungen } from '../lib/useBewertungen'
import { BewertungKurz, BewertungVoll } from '../components/Bewertung'
import { Dialog } from '../components/Dialog'
import { Icon, type IconName } from '../components/Icon'
import { alterText, stufeMitAlter, stufenKurz } from '../components/stufe'
import { MappeDialog } from './MappeDialog'

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
const ZUSATZ_ICON: Record<Zusatz, IconName> = { klassenraster: 'layers', portfolio: 'user', elternbrief: 'send', forscherblatt: 'lightbulb' }

/** So viele Karten erscheinen zuerst (und je Klick auf „Mehr zeigen“ dazu) – 500 auf einmal wären ~20.000 Knoten im Baum. */
const KARTEN_SEITE = 48

/** Kurznamen für die Bereichsauswahl (die langen Namen bleiben in Tooltip und Screenreader-Name). */
const BEREICH_KURZ: Partial<Record<Bereich, string>> = { lernen: 'Lernen', werkzeuge: 'Werkzeuge', selbstreflexion: 'Selbstreflexion' }

/** Die Mappe wird beim ersten Mal mit Text erklärt („Zur Mappe“), danach genügt das Symbol. */
const MAPPE_BEKANNT_KEY = 'toolbox-mappe-bekannt'
function mappeBekanntLesen(): boolean {
  try {
    return localStorage.getItem(MAPPE_BEKANNT_KEY) === '1'
  } catch {
    return false
  }
}
function mappeBekanntMerken(): void {
  try {
    localStorage.setItem(MAPPE_BEKANNT_KEY, '1')
  } catch {
    /* Speicher gesperrt: die Beschriftung bleibt dann stehen – kein Schaden */
  }
}

/** „1 Blatt“, „3 Blätter“ (auch im Skills-Kurs). */
export function blaetterText(n: number): string {
  return n === 1 ? '1 Blatt' : `${n} Blätter`
}

/** Aufgabentexte eines Blatts (Aufgaben mit Hinweis, Fragen), auch in Spalten. */
function aufgaben(bs: Baustein[]): string[] {
  return bs.flatMap((x) =>
    x.art === 'aufgabe' ? [x.text, x.hinweis ?? ''] : x.art === 'frage' ? [x.text] : x.art === 'spalten' ? [...aufgaben(x.links), ...aufgaben(x.rechts)] : [],
  )
}

/** Suchtext eines Blatts – einmal vorbereitet, nicht bei jedem Tastendruck. */
const suchCache = new WeakMap<NummeriertesBlatt, { titel: string; meta: string; alles: string }>()
function suchtext(b: NummeriertesBlatt) {
  let d = suchCache.get(b)
  if (!d) {
    const titel = searchText(b.de.titel + ' ' + (b.fr?.titel ?? ''))
    const meta = searchText([b.nr, b.id, b.de.untertitel ?? '', b.schlagworte.join(' '), themaLabel(b.bereich, b.thema), bereichById.get(b.bereich)?.de ?? '', b.eldib.join(' ')].join(' '))
    const text = searchText([...aufgaben(b.de.bausteine), ...(b.fr ? aufgaben(b.fr.bausteine) : [])].join(' '))
    d = { titel, meta, alles: [titel, meta, text].join('\n') }
    suchCache.set(b, d)
  }
  return d
}

/** Punkte eines Blatts für die Suche (0 = kein Treffer): jedes Wort muss vorkommen – im Titel 6,
 *  in Untertitel, Schlagwörtern, Stufe oder ELDiB 3, nur in den Aufgaben 1. Je Suche nur einmal
 *  berechnet (die Zahlen an Kacheln und Filtern fragen dieselbe Suche oft ab). */
let letzteSuche = { q: '', woerter: [] as SearchToken[], punkte: new WeakMap<NummeriertesBlatt, number>() }
function suchPunkte(b: NummeriertesBlatt, q: string): number {
  if (letzteSuche.q !== q) letzteSuche = { q, woerter: searchTokens(q), punkte: new WeakMap() }
  if (!letzteSuche.woerter.length) return 1
  let p = letzteSuche.punkte.get(b)
  if (p === undefined) {
    const d = suchtext(b)
    p = 0
    for (const w of letzteSuche.woerter) {
      if (!tokenMatch(d.alles, w, b.stufen)) {
        p = 0
        break
      }
      p += tokenMatch(d.titel, w) ? 6 : tokenMatch(d.meta, w, b.stufen) ? 3 : 1
    }
    letzteSuche.punkte.set(b, p)
  }
  return p
}

function trifft(b: NummeriertesBlatt, f: BlattFilter): boolean {
  if (f.bereich && b.bereich !== f.bereich) return false
  if (f.thema && b.thema !== f.thema) return false
  if (f.stufen.length && !b.stufen.some((s) => f.stufen.includes(s))) return false
  if (f.nurFr && !b.fr) return false
  if (f.eldib.length && !b.eldib.some((e) => f.eldib.includes(e))) return false
  const q = f.suche.trim()
  return !q || suchPunkte(b, q) > 0
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

function BlattKarte({ b, bew, gewaehlt, sprache, mitText, onOeffnen, onWaehlen, onLaden, laedt }: { b: NummeriertesBlatt; bew: Bewertungen; gewaehlt: boolean; sprache: Sprache; mitText: boolean; onOeffnen: () => void; onWaehlen: () => void; onLaden: () => void; laedt: boolean }) {
  const bereich = bereichById.get(b.bereich)!
  return (
    <article className="bl-karte" style={{ ['--bc' as string]: bereich.farben.tief, ['--bz' as string]: bereich.farben.zart }}>
      <div className="bl-karte-kopf">
        <Leitbild b={b} />
        <div className="min-w-0">
          <span className="bl-nr">{b.nr}</span>
          <span className="bl-bereich">{bereich.de}</span>
        </div>
      </div>
      <div className="flex grow flex-col gap-2 px-4 pt-3 pb-3">
        <h3 className="disp text-lg leading-[1.25] text-ink">
          <button type="button" className="card-open text-left" onClick={onOeffnen}>
            {b.de.titel}
          </button>
        </h3>
        {b.de.untertitel ? <p className="clamp-2 text-sm leading-[1.5] text-muted">{b.de.untertitel}</p> : null}
        {/* ruhige Metazeile: Alter und Dauer; Thema und Sprache grau darunter (Stufe C3 usw. im Tooltip) */}
        <div className="bl-meta mt-auto pt-1">
          <p className="bl-meta-eins" title={`Stufe ${stufenKurz(b.stufen)}`}>
            <b>{alterText(b.stufen)}</b> · {b.dauer}
          </p>
          <p className="bl-meta-zwei">
            {themaLabel(b.bereich, b.thema)}
            {b.fr ? ' · auch Französisch' : ''}
          </p>
        </div>
      </div>
      <div className="bl-karte-fuss">
        <BewertungKurz gesamt={bew.gesamt.get(b.id)} eigen={bew.eigene[b.id] || 0} />
        <span className="grow" />
        <button
          type="button"
          className={`btn btn-sm raise bl-mappe-knopf ${gewaehlt ? 'an' : ''} ${mitText ? '' : 'nur-symbol'}`}
          aria-pressed={gewaehlt}
          aria-label={`${gewaehlt ? 'Aus der Mappe nehmen' : 'Zur Mappe'}: ${b.de.titel}`}
          title={gewaehlt ? 'Aus der Mappe nehmen' : 'Zur Mappe: aus mehreren Blättern wird ein Heft'}
          onClick={onWaehlen}
        >
          <Icon name={gewaehlt ? 'check' : 'layers'} />
          {mitText ? (gewaehlt ? 'In der Mappe' : 'Zur Mappe') : null}
        </button>
        <button type="button" className="btn btn-sm raise" onClick={onLaden} disabled={laedt} aria-label={`PDF herunterladen: ${b.de.titel}${sprache === 'fr' ? ' (französisch)' : ''}`}>
          {laedt ? <span className="spin" /> : <Icon name="download" />}
          {sprache === 'fr' ? 'PDF · FR' : 'PDF'}
        </button>
      </div>
    </article>
  )
}

type PdfDok = Awaited<ReturnType<Pdfjs['getDocument']>['promise']>

/** Vorschau des Blatts: das echte PDF, Seite für Seite mit pdf.js auf eine Zeichenfläche gemalt (wie in Passgenau) –
 *  nicht im PDF-Betrachter des Browsers, den Handys und iPads oft gar nicht haben. Bis das PDF steht (rund 3 s),
 *  hält ein Platzhalter im A4-Verhältnis den Platz frei. „In neuem Tab öffnen“ bleibt als Reserve. */
function Vorschau({ b, sprache, lehrer, fassung }: { b: NummeriertesBlatt; sprache: Sprache; lehrer: boolean; fassung: Fassung }) {
  const [url, setUrl] = useState<string | null>(null)
  const [blob, setBlob] = useState<Blob | null>(null)
  const [fehler, setFehler] = useState<string | null>(null)
  const [dok, setDok] = useState<PdfDok | null>(null)
  const [seite, setSeite] = useState(1)
  const [gemalt, setGemalt] = useState(false)
  const [ohnePdfjs, setOhnePdfjs] = useState(false)
  const leinwand = useRef<HTMLCanvasElement>(null)
  const lauf = useRef(0)

  // 1. das PDF bauen
  useEffect(() => {
    let aus = false
    let u: string | null = null
    setUrl(null)
    setBlob(null)
    setFehler(null)
    setDok(null)
    setSeite(1)
    setGemalt(false)
    setOhnePdfjs(false)
    loadPdfModule()
      .then((m) => m.blattBlob(b, { sprache, nr: b.nr, lehrer }, fassung))
      .then((bl) => {
        if (aus) return
        u = URL.createObjectURL(bl)
        setBlob(bl)
        setUrl(u)
      })
      .catch((e) => !aus && setFehler(e instanceof Error ? e.message : 'Vorschau nicht möglich'))
    return () => {
      aus = true
      if (u) URL.revokeObjectURL(u)
    }
  }, [b, sprache, lehrer, fassung])

  // 2. das PDF mit pdf.js öffnen (scheitert das, bleibt der PDF-Betrachter des Browsers bzw. der Link)
  useEffect(() => {
    if (!blob) return
    let aus = false
    let d: PdfDok | null = null
    blob
      .arrayBuffer()
      .then(async (buf) => {
        const pdfjs = await ladePdfjs()
        d = await pdfjs.getDocument({ data: new Uint8Array(buf), isEvalSupported: false, useSystemFonts: true }).promise
        if (aus) return void d.destroy()
        setDok(d)
      })
      .catch(() => !aus && setOhnePdfjs(true))
    return () => {
      aus = true
      d?.destroy()
    }
  }, [blob])

  // 3. die gewählte Seite malen
  useEffect(() => {
    const c = leinwand.current
    if (!dok || !c) return
    const id = ++lauf.current
    ;(async () => {
      try {
        const page = await dok.getPage(seite)
        const v1 = page.getViewport({ scale: 1 })
        const breite = c.parentElement?.clientWidth || 520
        const vp = page.getViewport({ scale: (breite * Math.min(2, window.devicePixelRatio || 1)) / v1.width })
        if (id !== lauf.current) return
        c.width = Math.round(vp.width)
        c.height = Math.round(vp.height)
        const ctx = c.getContext('2d')!
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, c.width, c.height)
        await page.render({ canvasContext: ctx, viewport: vp }).promise
        if (id === lauf.current) setGemalt(true)
      } catch {
        if (id === lauf.current) setOhnePdfjs(true)
      }
    })()
  }, [dok, seite])

  if (fehler)
    return (
      <div className="bl-vorschau leer" role="alert">
        {fehler}
      </div>
    )
  // Notbehelf ohne pdf.js: der PDF-Betrachter des Browsers, sonst ein Link
  if (ohnePdfjs && url) {
    if ((navigator as Navigator & { pdfViewerEnabled?: boolean }).pdfViewerEnabled === false)
      return (
        <div className="bl-vorschau leer flex-col text-center">
          <Leitbild b={b} />
          <p className="max-w-[260px]">Die Vorschau ist hier nicht möglich. Lade das Blatt herunter oder öffne es in einem neuen Tab.</p>
          <a className="btn" href={url} target="_blank" rel="noreferrer">
            <Icon name="external" />
            In neuem Tab öffnen
          </a>
        </div>
      )
    return <iframe className="bl-vorschau" src={url + '#toolbar=0&navpanes=0&view=FitH'} title={`Vorschau: ${b.de.titel}`} />
  }
  const seiten = dok?.numPages ?? 1
  return (
    <div className="bl-vorschau-wrap">
      <div className={`bl-vorschau ${gemalt ? 'fertig' : 'platz'}`} aria-busy={!gemalt}>
        <canvas ref={leinwand} className="bl-vorschau-bild" role="img" aria-label={`Vorschau von ${b.de.titel}, Seite ${seite} von ${seiten}`} />
        {!gemalt ? (
          <div className="bl-vorschau-platz" role="status">
            <Leitbild b={b} />
            <b>{b.de.titel}</b>
            <span>
              <span className="spin" /> Vorschau wird erstellt …
            </span>
          </div>
        ) : null}
      </div>
      {gemalt ? (
        <div className="bl-vorschau-leiste">
          {seiten > 1 ? (
            <div className="flex items-center gap-1" role="group" aria-label="Seite der Vorschau">
              <button type="button" className="icon-btn" onClick={() => setSeite((n) => Math.max(1, n - 1))} disabled={seite <= 1} aria-label="Vorige Seite">
                <Icon name="chevronLeft" />
              </button>
              <span className="text-sm text-muted" aria-live="polite">
                Seite {seite} von {seiten}
              </span>
              <button type="button" className="icon-btn" onClick={() => setSeite((n) => Math.min(seiten, n + 1))} disabled={seite >= seiten} aria-label="Nächste Seite">
                <Icon name="chevronRight" />
              </button>
            </div>
          ) : (
            <span />
          )}
          {url ? (
            <a className="link-btn" href={url} target="_blank" rel="noreferrer">
              <Icon name="external" />
              In neuem Tab öffnen
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

/** „zum Beobachten, zum Forschen und für die Familien“ – je nachdem, welche Zusatzseiten es gibt. */
function zusatzZweck(ids: Zusatz[]): string {
  const teile = [
    ids.includes('klassenraster') || ids.includes('portfolio') ? 'zum Beobachten' : null,
    ids.includes('forscherblatt') ? 'zum Forschen' : null,
    ids.includes('elternbrief') ? 'für die Familien' : null,
  ].filter((x): x is string => !!x)
  return teile.length > 1 ? `${teile.slice(0, -1).join(', ')} und ${teile[teile.length - 1]}` : (teile[0] ?? '')
}

/** Detail eines Blatts (Vorschau, Download, Bewertung). Auch vom Skills-Kurs benutzt – dort ohne Mappe. */
/** Brücke Blatt → Stunde (Aufgabe 154): Passgenau ohne Kind, mit Ziel und Alter des Blatts vorbelegt */
const ALTER_FUER_STUFE: Record<Stufe, number> = { C1: 5, C2: 7, C3: 9, C4: 11, ES: 13 }
function alterFuer(b: NummeriertesBlatt): number {
  return Math.min(...b.stufen.map((x) => ALTER_FUER_STUFE[x] ?? 9))
}
function stundeDazu(b: NummeriertesBlatt): string {
  return `#passgenau&ziel=${encodeURIComponent(b.eldib[0])}&alter=${alterFuer(b)}`
}

export function BlattDetail({
  b,
  bew,
  onSchliessen,
  onOeffnen,
  gewaehlt,
  mappeFassung: fassungInMappe,
  onWaehlen,
  onFassung,
}: {
  b: NummeriertesBlatt
  bew: Bewertungen
  onSchliessen: () => void
  onOeffnen: (id: string) => void
  gewaehlt?: boolean
  /** Fassung, mit der das Blatt in der Mappe liegt – das Blatt öffnet in derselben Fassung */
  mappeFassung?: Fassung
  onWaehlen?: (sprache: Sprache, fassung: Fassung) => void
  /** Fassung gewechselt, während das Blatt in der Mappe liegt */
  onFassung?: (fassung: Fassung) => void
}) {
  // gemerkte Sprache (gilt für alle Blätter); ohne französische Fassung Deutsch
  const gewaehlteSprache = useBlattSprache()
  const sprache: Sprache = b.fr ? gewaehlteSprache : 'de'
  const [laedt, setLaedt] = useState<string | null>(null)
  // Fassung zum Drucken (Standard · Größer · Wenig schreiben); gilt für Vorschau, Download und Mappe
  const [fassung, setFassung] = useState<Fassung>(fassungInMappe ?? 'standard')
  const kannGroesser = groesseresLayout(b) !== null
  const kannKuerzen = useMemo(() => kuerzbar(b), [b])
  const bereich = bereichById.get(b.bereich)!
  const inhalt = sprache === 'fr' && b.fr ? b.fr : b.de
  const diff = inhalt.lehrer.differenzierung
  const verwandt = useMemo(
    () => alleBlaetter.filter((x) => x.id !== b.id && (x.thema === b.thema && x.bereich === b.bereich || (b.verwandt ?? []).includes(x.id))).slice(0, 6),
    [b],
  )
  // Spielschule: Klassenraster, Portfolio-Blatt und Elternbrief einzeln (nur wenn die Einheit die Daten hat)
  const zusaetze = ZUSAETZE.filter((z) => zusaetzeVon(b, sprache).includes(z.id))
  async function laden(art: 'schueler' | 'lehrer' | 'beide' | Zusatz) {
    setLaedt(art)
    try {
      const m = await loadPdfModule()
      const zusatz = art !== 'schueler' && art !== 'lehrer' && art !== 'beide'
      // Zusatzseiten und die Lehrerseite allein sehen in jeder Fassung gleich aus
      const name = await m.downloadBlatt(
        b,
        zusatz ? { sprache, nr: b.nr, schueler: false, lehrer: false, zusaetze: [art] } : { sprache, nr: b.nr, schueler: art !== 'lehrer', lehrer: art !== 'schueler' },
        zusatz || art === 'lehrer' ? 'standard' : fassung,
      )
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
          <div className="text-sm font-semibold text-muted">
            <span style={{ color: bereich.farben.tief }}>{bereich.de}</span> · {themaLabel(b.bereich, b.thema)} · Arbeitsblatt {b.nr}
          </div>
          <h2 id="bl-detail-titel" className="disp text-lg leading-tight break-words sm:text-xl">
            {inhalt.titel}
          </h2>
        </div>
        {b.fr ? (
          <div className="seg" role="group" aria-label="Sprache">
            <button type="button" aria-pressed={sprache === 'de'} onClick={() => setBlattSprache('de')}>
              DE
            </button>
            <button type="button" aria-pressed={sprache === 'fr'} onClick={() => setBlattSprache('fr')}>
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
          <Vorschau b={b} sprache={sprache} lehrer fassung={fassung} />
        </div>
        <div className="bl-detail-info">
          <section aria-labelledby="bl-fassung-titel" className="bl-zuerst">
            <h3 id="bl-fassung-titel" className="bew-label mb-1.5">
              Fassung zum Drucken
            </h3>
            <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby="bl-fassung-titel">
              {FASSUNGEN.map((f) => {
                const gesperrt = (f.id === 'groesser' && !kannGroesser) || (f.id === 'wenigSchreiben' && !kannKuerzen)
                return (
                  <button
                    key={f.id}
                    type="button"
                    className="fchip"
                    aria-pressed={fassung === f.id}
                    disabled={gesperrt}
                    title={gesperrt ? (f.id === 'groesser' ? 'Dieses Blatt ist schon in der größten Fassung.' : 'Auf diesem Blatt gibt es nichts zu kürzen.') : f.hinweis}
                    onClick={() => {
                      setFassung(f.id)
                      if (gewaehlt) onFassung?.(f.id)
                    }}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
            <p className="mt-1.5 text-sm leading-[1.45] text-muted" aria-live="polite">
              {FASSUNGEN.find((f) => f.id === fassung)?.hinweis}
            </p>
          </section>

          <div className="bl-zuerst flex flex-col gap-2">
            {/* Hauptweg: das Blatt als PDF; daneben die Mappe als Symbolknopf */}
            <div className="flex gap-2">
              <button type="button" className="btn btn-primary btn-gross grow justify-center" onClick={() => laden('schueler')} disabled={!!laedt}>
                {laedt === 'schueler' ? <span className="spin" /> : <Icon name="download" />}
                Arbeitsblatt (PDF)
              </button>
              {onWaehlen ? (
                <button
                  type="button"
                  className={`btn btn-gross bl-mappe-knopf ${gewaehlt ? 'an' : ''}`}
                  aria-pressed={!!gewaehlt}
                  title={gewaehlt ? 'Aus der Mappe nehmen' : 'In die Mappe legen: aus mehreren Blättern wird ein Heft'}
                  onClick={() => onWaehlen(sprache, fassung)}
                >
                  <Icon name={gewaehlt ? 'check' : 'layers'} />
                  <span className="max-[420px]:sr-only">{gewaehlt ? 'In der Mappe' : 'Zur Mappe'}</span>
                </button>
              ) : null}
            </div>
            {/* zweitwichtigster Weg: die Brücke zum Hauptwerkzeug */}
            {b.eldib.length ? (
              <a className="btn btn-gross justify-center" href={stundeDazu(b)} title={`Passgenau: eine Stunde zu ${b.eldib[0]} planen (ohne Kind, Alter ${alterFuer(b)} J.)`}>
                <Icon name="compass" />
                Stunde dazu planen
              </a>
            ) : null}
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="btn btn-sm justify-center" onClick={() => laden('beide')} disabled={!!laedt}>
                {laedt === 'beide' ? <span className="spin" /> : <Icon name="file" />}
                Mit Lehrerseite
              </button>
              <button type="button" className="btn btn-sm justify-center" onClick={() => laden('lehrer')} disabled={!!laedt}>
                {laedt === 'lehrer' ? <span className="spin" /> : <Icon name="book" />}
                Nur Lehrerseite
              </button>
            </div>
            {zusaetze.length ? (
              <div>
                <div className="mb-1.5 text-sm text-muted">Je 1 Seite {zusatzZweck(zusaetze.map((z) => z.id))}:</div>
                <div className="flex flex-wrap gap-2">
                  {zusaetze.map((z) => (
                    <button key={z.id} type="button" className="btn btn-sm" onClick={() => laden(z.id)} disabled={!!laedt} title={`${z.de} als eigenes PDF${sprache === 'fr' ? ' (französisch)' : ''}`}>
                      {laedt === z.id ? <span className="spin" /> : <Icon name={ZUSATZ_ICON[z.id]} />}
                      {z.knopf}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <dl className="bl-fakten">
            <div>
              <dt>Ziel</dt>
              <dd>{inhalt.lehrer.ziel}</dd>
            </div>
            <div>
              <dt>Alter</dt>
              <dd>
                {alterText(b.stufen)} <span className="text-muted">({stufenText(b.stufen)})</span>
              </dd>
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
              <dt>Ziele (ELDiB)</dt>
              <dd className="flex flex-wrap gap-1.5">
                {b.eldib.map((g) => (
                  <span key={g} className="code" style={domainStyle(g)} title={goalText(g)}>
                    {g} <span className="font-normal">{eldibGoalById.get(g)?.label}</span>
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          {diff && (diff.leichter || diff.schwerer) ? (
            // Hinweis für die Fachkraft: die Differenzierung von der Lehrerseite (steht dort auch gedruckt)
            <section aria-labelledby="bl-diff-titel">
              <h3 id="bl-diff-titel" className="bew-label mb-1.5">
                Anpassen an die Gruppe
              </h3>
              <div className="bl-fassung-diff">
                {diff.leichter ? (
                  <p>
                    <b>Leichter:</b> {diff.leichter}
                  </p>
                ) : null}
                {diff.schwerer ? (
                  <p>
                    <b>Anspruchsvoller:</b> {diff.schwerer}
                  </p>
                ) : null}
              </div>
            </section>
          ) : null}

          {inhalt.lehrer.spielschule ? (
            // Spielschule: die Woche auf einen Blick (alles Weitere auf der Seite „Aktivitäten & Ideen“ im PDF)
            <section className="bl-woche">
              <h3 className="bew-label mb-2">{sprache === 'fr' ? 'La semaine en un coup d’œil' : 'Die Woche auf einen Blick'}</h3>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {inhalt.lehrer.spielschule.wortschatz.map((w) => (
                  <span key={w} className="tag">
                    {w}
                  </span>
                ))}
              </div>
              <ul className="bl-woche-liste">
                {inhalt.lehrer.spielschule.aktivitaeten.map((a) => (
                  <li key={a.titel}>
                    <b>{a.titel}</b>
                    {a.dauer ? <span className="text-muted"> · {a.dauer}</span> : null}
                  </li>
                ))}
                {inhalt.lehrer.spielschule.experiment ? (
                  <li>
                    <b>{inhalt.lehrer.spielschule.experiment.titel}</b>
                    <span className="text-muted"> · {sprache === 'fr' ? 'expérience de la semaine' : 'Experiment der Woche'}</span>
                  </li>
                ) : null}
                {inhalt.lehrer.spielschule.reim ? (
                  <li>
                    <b>{inhalt.lehrer.spielschule.reim.titel}</b>
                    <span className="text-muted"> · {sprache === 'fr' ? 'comptine' : 'Reim'}</span>
                  </li>
                ) : null}
              </ul>
            </section>
          ) : null}

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
                      <span className="tag" title={`Stufe ${stufenKurz(x.stufen)}`}>
                        {alterText(x.stufen)}
                      </span>
                      <span className="truncate">{x.de.titel}</span>
                      <span className="text-muted">{x.nr}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        {/* Alle Blätter sind mit KI erstellt: Vermerk in der Sprache, in der das Blatt gerade gezeigt wird */}
        {/* Spielschule: Michèle Wagner, ohne CDSE-Logo (lib/urheber.ts) */}
        <Urheber text={urheberschaft(b.bereich).text[sprache]} logo={urheberschaft(b.bereich).logo} className="urheber bl-detail-urheber" lang={sprache} />
      </div>
    </Dialog>
  )
}

/** Ein ganzes Modul als Heft herunterladen (z. B. Mathe Modul 2): das Heft und das Lösungsheft als PDF, sonst nichts. */
function ModulheftLeiste({ modul, sprache, laedt, onLaden }: { modul: Modul; sprache: Sprache; laedt: string | null; onLaden: (loesungen: boolean) => void }) {
  const bereich = bereichById.get(modul.bereich)!
  const fr = sprache === 'fr' ? ' · FR' : ''
  const heft = 'heft:' + modul.id
  const beschaeftigt = laedt === heft || laedt === heft + ':loesungen'
  return (
    <section className="bl-heft" style={{ ['--bc' as string]: bereich.farben.tief }} aria-label={`${modul.fach.de} Modul ${modul.nr} als Heft`}>
      <span className="bl-bereich-ic" style={{ background: bereich.farben.zart }}>
        <ZeichnungSvg z={{ ...iconZeichnung(bereich.icon), w: 1.6 }} p={{ ...palette(bereich.farben), tinte: bereich.farben.tief }} />
      </span>
      <div className="bl-heft-text">
        <b>
          {modul.fach.de} Modul {modul.nr} als Heft
        </b>
        <span>Alle {lektionenZahl(modul)} Lektionen in einem PDF – mit Deckblatt, Inhalt, Wortschatz und Lernstand.</span>
      </div>
      <div className="bl-heft-knoepfe">
        <button type="button" className="btn btn-sm btn-primary" disabled={beschaeftigt} onClick={() => onLaden(false)}>
          {laedt === heft ? <span className="spin" /> : <Icon name="download" />}
          Heft (PDF){fr}
        </button>
        <button type="button" className="btn btn-sm" disabled={beschaeftigt} onClick={() => onLaden(true)}>
          {laedt === heft + ':loesungen' ? <span className="spin" /> : <Icon name="book" />}
          Lösungsheft{fr}
        </button>
      </div>
    </section>
  )
}

/** Spielschule: alle Experimente der Woche als Forscherkartei (Deckblatt, Inhalt, je Experiment eine Seite, Register). */
function ForscherkarteiLeiste({ anzahl, sprache, laedt, onLaden }: { anzahl: number; sprache: Sprache; laedt: boolean; onLaden: () => void }) {
  const bereich = bereichById.get('spielschule')!
  return (
    <section className="bl-heft" style={{ ['--bc' as string]: bereich.farben.tief }} aria-label="Forscherkartei Spielschule">
      <span className="bl-bereich-ic" style={{ background: bereich.farben.zart }}>
        <ZeichnungSvg z={{ ...iconZeichnung('search'), w: 1.6 }} p={{ ...palette(bereich.farben), tinte: bereich.farben.tief }} />
      </span>
      <div className="bl-heft-text">
        <b>Forscherkartei Spielschule</b>
        <span>
          {anzahl === 1 ? 'Das Experiment der Woche' : `Alle ${anzahl} Experimente der Woche`} in einem PDF – nach Jahreszeiten und Themen, mit Inhalt und Register nach Phänomenen.
        </span>
      </div>
      <div className="bl-heft-knoepfe">
        <button type="button" className="btn btn-sm btn-primary" disabled={laedt} onClick={onLaden}>
          {laedt ? <span className="spin" /> : <Icon name="download" />}
          Forscherkartei (PDF){sprache === 'fr' ? ' · FR' : ''}
        </button>
      </div>
    </section>
  )
}

/** Spielschule: Jahresplan als Drei-Jahres-Rad (Festkalender, 36 Wochen je Jahr, Kompetenzlandkarte, Joker). Nur Deutsch. */
function JahresplanLeiste({ laedt, onLaden }: { laedt: boolean; onLaden: () => void }) {
  const bereich = bereichById.get('spielschule')!
  return (
    <section className="bl-heft" style={{ ['--bc' as string]: bereich.farben.tief }} aria-label="Jahresplan Spielschule">
      <span className="bl-bereich-ic" style={{ background: bereich.farben.zart }}>
        <ZeichnungSvg z={{ ...iconZeichnung('calendar'), w: 1.6 }} p={{ ...palette(bereich.farben), tinte: bereich.farben.tief }} />
      </span>
      <div className="bl-heft-text">
        <b>Jahresplan Spielschule</b>
        <span>Drei-Jahres-Rad: je Jahr 36 Themenwochen mit Luxemburger Festkalender und Ferienrhythmus, Kompetenzlandkarte nach dem Plan d’études und Joker für besondere Wochen.</span>
      </div>
      <div className="bl-heft-knoepfe">
        <button type="button" className="btn btn-sm btn-primary" disabled={laedt} onClick={onLaden}>
          {laedt ? <span className="spin" /> : <Icon name="download" />}
          Jahresplan (PDF)
        </button>
      </div>
    </section>
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
  /** Blatt aus einem Link (#blatt=…) – neues Objekt bei jedem Link, auch bei derselben id */
  startBlatt: { id: string } | null
  onEinheitenZuEldib: (codes: string[]) => void
}) {
  const [filter, setFilter] = useState<BlattFilter>(startFilter)
  const [sort, setSort] = useState<Sortierung>('nummer')
  const [offen, setOffen] = useState<NummeriertesBlatt | null>(() => (startBlatt ? (blattById.get(startBlatt.id) ?? null) : null))
  // Die Mappe (lib/mappen.ts): bleibt nach dem Neuladen; je Blatt mit Sprache und Fassung, in denen es gewählt wurde
  const mappe = useMappe()
  const [mappeOffen, setMappeOffen] = useState(false)
  // gemerkte Sprache (DE/FR) – für Karten und Mappe wie im Dialog; Blätter ohne Französisch bleiben deutsch
  const gewaehlteSprache = useBlattSprache()
  const spracheVon = (b: NummeriertesBlatt): Sprache => (b.fr ? gewaehlteSprache : 'de')
  const [laedt, setLaedt] = useState<string | null>(null)
  const [filterOffen, setFilterOffen] = useState(false)
  const [mappeBekannt, setMappeBekannt] = useState(mappeBekanntLesen)
  const suchRef = useRef<HTMLInputElement>(null)
  const bereichRef = useRef<HTMLDivElement>(null)

  useEffect(() => setFilter(startFilter), [startFilter])
  // Suchtexte der Blätter vorbereiten, solange der Browser nichts zu tun hat
  useEffect(() => prepareInIdle(alleBlaetter, suchtext), [])
  // Blätter, die es nicht mehr gibt, fliegen aus der gespeicherten Mappe
  useEffect(() => mappeBereinigen((id) => blattById.has(id)), [])
  useEffect(() => {
    if (!startBlatt) return
    const b = blattById.get(startBlatt.id)
    setOffen(b ?? null)
    if (!b) toast(`Das Arbeitsblatt „${startBlatt.id}“ wurde nicht gefunden.`, 'error')
  }, [startBlatt])

  const q = useDeferredValue(filter)
  const treffer = useMemo(() => {
    const l = alleBlaetter.filter((b) => trifft(b, q))
    if (sort === 'titel') l.sort((a, b) => a.de.titel.localeCompare(b.de.titel, 'de'))
    else if (sort === 'bewertung') l.sort((a, b) => (bew.gesamt.get(b.id)?.schnitt ?? bew.eigene[b.id] ?? 0) - (bew.gesamt.get(a.id)?.schnitt ?? bew.eigene[a.id] ?? 0))
    else if (q.suche.trim()) {
      // Beim Suchen: Treffer im Titel zuerst, Treffer nur in den Aufgaben zuletzt, sonst in der Reihenfolge der Bereiche
      const s = q.suche.trim()
      l.sort((a, b) => suchPunkte(b, s) - suchPunkte(a, s))
    }
    return l
  }, [q, sort, bew.gesamt, bew.eigene])

  const zaehle = useCallback((f: Partial<BlattFilter>) => alleBlaetter.filter((b) => trifft(b, { ...q, ...f })).length, [q])
  const themen = THEMEN.filter((t) => !filter.bereich || t.bereich === filter.bereich)
  const set = (p: Partial<BlattFilter>) => setFilter((f) => ({ ...f, ...p }))
  const aktivZahl = (filter.bereich ? 1 : 0) + (filter.thema ? 1 : 0) + filter.stufen.length + (filter.nurFr ? 1 : 0) + filter.eldib.length + (filter.suche ? 1 : 0)
  // Im Filter-Fach einstellbar (der Bereich steht sichtbar in der Reihe darüber, die Suche im Suchfeld)
  const fachZahl = (filter.thema ? 1 : 0) + filter.stufen.length + (filter.nurFr ? 1 : 0)

  useEffect(() => {
    if (mappe.eintraege.length > 0 && !mappeBekannt) {
      mappeBekanntMerken()
      setMappeBekannt(true)
    }
  }, [mappe.eintraege.length, mappeBekannt])

  const inMappe = (id: string) => mappe.eintraege.some((x) => x.id === id)
  // Offene Hinweise über die Mappe-Leiste heben (bzw. wieder senken), wenn sie erscheint oder verschwindet
  const mitLeiste = aktiv && mappe.eintraege.length > 0
  useEffect(() => repositionToasts(), [mitLeiste])
  function umschalten(id: string, sprache: Sprache, fassung: Fassung = 'standard') {
    const drin = inMappe(id)
    if (!mappeUmschalten(id, sprache, fassung) && !drin) toast(`Die Mappe ist voll (höchstens ${MAPPE_MAX} Blätter).`, 'error')
  }
  // Alle Treffer auf einmal in die Mappe (z. B. „Wut“ + C3 → ein Heft)
  const trefferNeu = treffer.filter((b) => !inMappe(b.id)).length
  function trefferInMappe() {
    const neu = mappeHinzufuegen(treffer.map((b) => ({ id: b.id, sprache: spracheVon(b) })))
    if (neu === trefferNeu) toast(`${blaetterText(neu)} in die Mappe gelegt.`, 'ok')
    else toast(`${blaetterText(neu)} in die Mappe gelegt – dann war sie voll (höchstens ${MAPPE_MAX} Blätter).`, 'error')
  }
  async function laden(b: NummeriertesBlatt) {
    setLaedt(b.id)
    try {
      const m = await loadPdfModule()
      toast(`PDF erstellt: ${await m.downloadBlatt(b, { nr: b.nr, lehrer: false, sprache: spracheVon(b) })}`, 'ok')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'PDF konnte nicht erstellt werden.', 'error')
    } finally {
      setLaedt(null)
    }
  }
  // Heft in der gemerkten Sprache, wenn alle Lektionen auch auf Französisch da sind
  const heftSprache = (modul: Modul): Sprache => (modul.themen.every((t) => t.lektionen.every((id) => blattById.get(id)?.fr)) ? gewaehlteSprache : 'de')
  async function heftLaden(modul: Modul, loesungen: boolean) {
    setLaedt(`heft:${modul.id}${loesungen ? ':loesungen' : ''}`)
    try {
      const m = await loadPdfModule()
      const name = await m.downloadModulheft(modul, blattById, heftSprache(modul), loesungen)
      toast(`${loesungen ? 'Lösungsheft' : 'Heft'} erstellt: ${name}`, 'ok')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Das Heft konnte nicht erstellt werden.', 'error')
    } finally {
      setLaedt(null)
    }
  }

  // Forscherkartei: Einheiten mit Experiment; Französisch nur, wenn jedes Experiment auch eine FR-Fassung hat
  const mitExperiment = useMemo(() => alleBlaetter.filter((b) => experimentVon(b, 'de')), [])
  const karteiSprache: Sprache = mitExperiment.every((b) => experimentVon(b, 'fr')) ? gewaehlteSprache : 'de'
  async function karteiLaden() {
    setLaedt('kartei')
    try {
      const m = await loadPdfModule()
      toast(`Forscherkartei erstellt: ${await m.downloadForscherkartei(alleBlaetter.map((b) => ({ blatt: b, nr: b.nr })), karteiSprache)}`, 'ok')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Die Forscherkartei konnte nicht erstellt werden.', 'error')
    } finally {
      setLaedt(null)
    }
  }

  async function jahresplanLaden() {
    setLaedt('jahresplan')
    try {
      const m = await loadPdfModule()
      toast(`Jahresplan erstellt: ${await m.downloadJahresplan(alleBlaetter.map((b) => ({ blatt: b, nr: b.nr })))}`, 'ok')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Der Jahresplan konnte nicht erstellt werden.', 'error')
    } finally {
      setLaedt(null)
    }
  }

  // Deep-Link #blatt=… aktuell halten – auch nach einem Link auf ein unbekanntes Blatt (startBlatt),
  // sonst bliebe er im Hash stehen und derselbe Link löste kein hashchange mehr aus
  useEffect(() => {
    if (!aktiv) return
    // ohne Blatt und ohne Ziel steht #blaetter (damit „Zurück“ zwischen den Reitern die Seite erkennt)
    const h = offen ? '#blatt=' + encodeURIComponent(offen.id) : filter.eldib.length ? '#eldib=' + filter.eldib.map(encodeURIComponent).join(',') : '#blaetter'
    if (window.location.hash !== h) history.replaceState(null, '', h)
  }, [aktiv, offen, filter.eldib, startBlatt])

  // Pfeiltasten in der Bereichsauswahl (Radiogruppe: ein Tab-Stopp, wie bei nativen Radios wählt der Pfeil gleich aus)
  function bereichTaste(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return
    const radios = [...(bereichRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)') ?? [])]
    const i = radios.indexOf(document.activeElement as HTMLButtonElement)
    if (i < 0) return
    e.preventDefault()
    const vor = e.key === 'ArrowRight' || e.key === 'ArrowDown'
    const ziel = e.key === 'Home' ? 0 : e.key === 'End' ? radios.length - 1 : (i + (vor ? 1 : -1) + radios.length) % radios.length
    radios[ziel].focus()
    radios[ziel].click()
  }

  // Aktive Filter als entfernbare Chips – das Filter-Fach ist meist zu, die Auswahl soll trotzdem sichtbar bleiben
  const themaDef = filter.thema ? (THEMEN.find((t) => t.id === filter.thema && t.bereich === filter.bereich) ?? THEMEN.find((t) => t.id === filter.thema)) : undefined
  const chips: { key: string; label: string; remove: () => void }[] = [
    ...filter.stufen.map((x) => ({ key: 's' + x, label: stufeMitAlter(x), remove: () => set({ stufen: filter.stufen.filter((y) => y !== x) }) })),
    ...(filter.thema ? [{ key: 'thema', label: `Thema: ${themaDef?.de ?? filter.thema}`, remove: () => set({ thema: '' }) }] : []),
    ...(filter.nurFr ? [{ key: 'fr', label: 'Auch auf Französisch', remove: () => set({ nurFr: false }) }] : []),
  ]

  const filterInhalt = (
    <div className="bl-filter">
      <section>
        <h3>Alter</h3>
        <div className="flex flex-wrap gap-1.5">
          {STUFEN_REIHE.map((x) => {
            const an = filter.stufen.includes(x)
            const n = zaehle({ stufen: [x] })
            return (
              <button key={x} type="button" className="fchip" aria-pressed={an} disabled={!an && n === 0} onClick={() => set({ stufen: an ? filter.stufen.filter((y) => y !== x) : [...filter.stufen, x] })}>
                {stufeMitAlter(x)}
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
      <section className="bl-filter-breit">
        {/* nur geöffnet, wenn schon ein Bereich oder Thema gewählt ist: ohne Bereich wären es rund 100 Einträge */}
        <details className="bl-thema-fach" open={!!filter.bereich || !!filter.thema}>
          <summary>
            Thema <span className="n">({themen.length})</span>
            {!filter.bereich ? <span className="hinweis"> – erst einen Bereich wählen, dann wird die Liste kurz</span> : null}
          </summary>
          <div className="bl-themen">
            {themen.map((t) => {
              const n = zaehle({ thema: t.id, bereich: t.bereich })
              if (!n && filter.thema !== t.id) return null
              const an = filter.thema === t.id
              return (
                <button key={t.bereich + t.id} type="button" className={`bl-thema ${an ? 'an' : ''}`} aria-pressed={an} onClick={() => set({ thema: an ? '' : t.id, bereich: an ? filter.bereich : t.bereich })}>
                  <span className="dot" style={{ background: bereichById.get(t.bereich)?.farben.tief }} />
                  <span className="grow text-left">{t.de}</span>
                  <span className="n">{n}</span>
                </button>
              )
            })}
          </div>
        </details>
      </section>
    </div>
  )

  const rasterKey = JSON.stringify(q) + sort
  const renderKarte = (b: NummeriertesBlatt) => (
    <BlattKarte key={b.id} b={b} bew={bew} gewaehlt={inMappe(b.id)} sprache={spracheVon(b)} mitText={!mappeBekannt} onOeffnen={() => setOffen(b)} onWaehlen={() => umschalten(b.id, spracheVon(b))} onLaden={() => laden(b)} laedt={laedt === b.id} />
  )

  return (
    <main className={aktiv ? '' : 'hidden'}>
      <div className="mx-auto max-w-[1440px] px-4 pt-4 pb-16 sm:px-6 sm:pt-5">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
          <div className="min-w-0">
            <h1 className="disp text-xl leading-tight text-ink sm:text-2xl">Arbeitsblätter</h1>
            <p className="mt-1 text-base text-muted" aria-live="polite">
              <b className="font-semibold text-ink">{treffer.length}</b>
              {treffer.length !== alleBlaetter.length ? ` von ${alleBlaetter.length} Blättern` : ' Blätter'} · Spielschule bis Sekundarschule · jedes mit Seite für die Lehrperson
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="search search-sm w-[260px] max-w-full max-sm:w-full">
              <Icon name="search" />
              <span className="sr-only">Arbeitsblätter durchsuchen</span>
              <input ref={suchRef} type="search" value={filter.suche} onChange={(e) => set({ suche: e.target.value })} placeholder="Suchen: Wut, Angst …" autoComplete="off" />
            </label>
            <button type="button" className="btn" aria-expanded={filterOffen} aria-controls="bl-filterfach" onClick={() => setFilterOffen((o) => !o)}>
              <Icon name="filter" />
              Filter
              {fachZahl > 0 ? (
                <span className="fsec-count" aria-label={`${fachZahl} aktiv`}>
                  {fachZahl}
                </span>
              ) : null}
              <Icon name={filterOffen ? 'chevronUp' : 'chevronDown'} />
            </button>
            {mappe.eintraege.length > 0 ? (
              <button type="button" className="btn" onClick={() => setMappeOffen(true)} title="Die Mappe als Heft ansehen">
                <Icon name="layers" />
                Mappe ({mappe.eintraege.length})
              </button>
            ) : null}
            <label className="flex items-center gap-2 text-sm text-muted">
              <span className="max-sm:sr-only">Sortieren</span>
              <select className="field w-auto py-1.5 pr-8" value={sort} onChange={(e) => setSort(e.target.value as Sortierung)}>
                <option value="nummer">Nach Bereich</option>
                <option value="bewertung">Beste Bewertung</option>
                <option value="titel">Titel A–Z</option>
              </select>
            </label>
          </div>
        </div>

        {/* Bereichsauswahl: eine Zeile, seitlich wischbar; Bereiche ohne Treffer sind aus */}
        <div className="bl-bereiche scroll-slim" role="radiogroup" aria-label="Bereich" ref={bereichRef} onKeyDown={bereichTaste}>
          <button type="button" role="radio" aria-checked={!filter.bereich} tabIndex={!filter.bereich ? 0 : -1} className={`bl-bereich-kachel ${!filter.bereich ? 'an' : ''}`} onClick={() => set({ bereich: '', thema: '' })}>
            <span className="bl-bereich-ic" style={{ background: 'var(--accent-soft)' }}>
              <Icon name="layers" />
            </span>
            <b>Alle</b>
            <span className="n">{zaehle({ bereich: '', thema: '' })}</span>
          </button>
          {BEREICHE.filter((br) => br.id !== 'skills' || kursFrei()).map((br) => {
            const an = filter.bereich === br.id
            const n = zaehle({ bereich: br.id, thema: '' })
            return (
              <button
                key={br.id}
                type="button"
                role="radio"
                aria-checked={an}
                tabIndex={an ? 0 : -1}
                disabled={n === 0 && !an}
                aria-label={`${br.de}, ${blaetterText(n)}`}
                title={br.de}
                className={`bl-bereich-kachel ${an ? 'an' : ''}`}
                style={{ ['--bc' as string]: br.farben.tief, ['--bz' as string]: br.farben.zart }}
                onClick={() => set({ bereich: br.id, thema: '' })}
              >
                <span className="bl-bereich-ic" style={{ background: br.farben.zart }}>
                  <ZeichnungSvg z={{ ...iconZeichnung(br.icon), w: 1.6 }} p={{ ...palette(br.farben), tinte: br.farben.tief }} />
                </span>
                <b>{BEREICH_KURZ[br.id] ?? br.de}</b>
                <span className="n">{n}</span>
              </button>
            )
          })}
        </div>

        {chips.length > 0 ? (
          <div className="mb-3 flex flex-wrap items-center gap-1.5" role="group" aria-label="Aktive Filter">
            {chips.map((c) => (
              <span key={c.key} className="achip">
                <span>{c.label}</span>
                <button type="button" onClick={c.remove} aria-label={`Filter entfernen: ${c.label}`} title="Filter entfernen">
                  <Icon name="x" />
                </button>
              </span>
            ))}
            {chips.length > 1 ? (
              <button type="button" className="link-btn ml-1 text-sm" onClick={() => setFilter({ ...leererBlattFilter, suche: filter.suche, bereich: filter.bereich, eldib: filter.eldib })}>
                Filter zurücksetzen
              </button>
            ) : null}
          </div>
        ) : null}

        {filterOffen ? (
          <section id="bl-filterfach" className="panel bl-fach" aria-label="Filter">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="disp text-lg text-ink">Filter</h2>
              <div className="flex items-center gap-1">
                {aktivZahl > 0 ? (
                  <button type="button" className="link-btn text-sm" onClick={() => setFilter(leererBlattFilter)}>
                    Alles zurücksetzen
                  </button>
                ) : null}
                <button type="button" className="icon-btn" onClick={() => setFilterOffen(false)} aria-label="Filter einklappen" title="Einklappen">
                  <Icon name="chevronUp" />
                </button>
              </div>
            </div>
            {filterInhalt}
            <div className="bl-fach-fuss">
              <button type="button" className="btn btn-primary" onClick={() => setFilterOffen(false)}>
                {blaetterText(treffer.length)} anzeigen
              </button>
            </div>
          </section>
        ) : null}

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

        <section id="blaetter" tabIndex={-1} aria-label="Treffer" className="min-w-0 outline-none">
          {MODULE.filter((m) => m.bereich === filter.bereich).map((m) => (
            <ModulheftLeiste key={m.id} modul={m} sprache={heftSprache(m)} laedt={laedt} onLaden={(loesungen) => heftLaden(m, loesungen)} />
          ))}
          {filter.bereich === 'spielschule' && mitExperiment.length ? <ForscherkarteiLeiste anzahl={mitExperiment.length} sprache={karteiSprache} laedt={laedt === 'kartei'} onLaden={karteiLaden} /> : null}
          {filter.bereich === 'spielschule' ? <JahresplanLeiste laedt={laedt === 'jahresplan'} onLaden={jahresplanLaden} /> : null}
          {treffer.length === 0 ? (
            <div className="panel px-6 py-12 text-center">
              <h2 className="disp text-xl text-ink">Kein passendes Arbeitsblatt</h2>
              <p className="mx-auto mt-2 max-w-[520px] text-base text-muted">Entferne einzelne Filter oder suche nach einem anderen Stichwort.</p>
              <button type="button" className="btn btn-primary mt-5" onClick={() => setFilter(leererBlattFilter)}>
                <Icon name="reset" />
                Alle Filter zurücksetzen
              </button>
            </div>
          ) : (
            <>
              {treffer.length >= 2 && treffer.length <= 40 ? (
                <div className="mb-3 flex justify-end">
                  <button type="button" className="btn btn-sm" onClick={trefferInMappe} disabled={trefferNeu === 0}>
                    <Icon name={trefferNeu === 0 ? 'check' : 'layers'} />
                    {trefferNeu === 0 ? `Alle ${treffer.length} Treffer sind in der Mappe` : `Alle ${treffer.length} Treffer in die Mappe`}
                  </button>
                </div>
              ) : null}
              <BlattRaster key={rasterKey} items={treffer} render={renderKarte} />
            </>
          )}
        </section>
      </div>

      {mappe.eintraege.length > 0 && (
        <div className="bl-mappe" role="region" aria-label="Mappe">
          <Icon name="layers" />
          <span>
            <b>{mappe.eintraege.length}</b> {mappe.eintraege.length === 1 ? 'Blatt' : 'Blätter'} in der Mappe
          </span>
          <button type="button" className="btn btn-sm btn-primary" onClick={() => setMappeOffen(true)}>
            <Icon name="book" />
            Mappe als Heft
          </button>
          <button type="button" className="icon-btn" onClick={mappeLeeren} aria-label="Mappe leeren" title="Mappe leeren">
            <Icon name="x" />
          </button>
        </div>
      )}

      {offen && (
        <BlattDetail
          key={offen.id}
          b={offen}
          bew={bew}
          onSchliessen={() => setOffen(null)}
          onOeffnen={(id) => setOffen(blattById.get(id) ?? null)}
          gewaehlt={inMappe(offen.id)}
          mappeFassung={mappe.eintraege.find((x) => x.id === offen.id)?.fassung}
          onWaehlen={(sprache, fassung) => umschalten(offen.id, sprache, fassung)}
          onFassung={(fassung) => mappeFassung(offen.id, fassung)}
        />
      )}

      {mappeOffen && <MappeDialog onSchliessen={() => setMappeOffen(false)} />}
    </main>
  )
}

/** Raster der Karten: erst 48, dann „Mehr zeigen“. Mit neuem Schlüssel (Filter/Sortierung) beginnt die Zählung wieder bei 48. */
function BlattRaster({ items, render }: { items: NummeriertesBlatt[]; render: (b: NummeriertesBlatt) => ReactNode }) {
  const [anzahl, setAnzahl] = useState(KARTEN_SEITE)
  const sichtbar = items.slice(0, anzahl)
  const rest = items.length - sichtbar.length
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-4">{sichtbar.map(render)}</div>
      {rest > 0 ? (
        <div className="bl-mehr">
          <p role="status">
            {sichtbar.length} von {items.length} Blättern angezeigt
          </p>
          <button type="button" className="btn" onClick={() => setAnzahl((n) => n + KARTEN_SEITE)}>
            Mehr zeigen ({Math.min(KARTEN_SEITE, rest)} weitere)
          </button>
        </div>
      ) : null}
    </>
  )
}

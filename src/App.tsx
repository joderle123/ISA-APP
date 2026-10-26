// ---------------------------------------------------------------------------
// CDSE Toolbox: drei Bereiche unter einem Dach –
//   Stunde planen (Passgenau), Bibliothek (Arbeitsblätter und Einheiten), Skills-Kurs
//   (Kursjahre mit Einheiten) und Team-Material (eigenes Material teilen).
// Deep-Links (unverändert): #blatt=<id> · #eldib=V-13 · #eldib=V-13&material=<id> · #team ·
//   #einheiten · #seite=einheiten · #blaetter · #kurs · #kurs=<einheit-id> · #kurs=grundlagen ·
//   #passgenau · #passgenau=<ref>&weg=schnell|leicht|gruendlich&ziel=V-21 · #passgenau=<ref1>,<ref2>
// Jeder Reiter schreibt seinen Hash und legt einen Verlaufseintrag an: „Zurück“ wechselt zwischen den
// Reitern, statt die App zu verlassen. Seiten werden erst beim ersten Besuch gebaut.
// ---------------------------------------------------------------------------
import { useCallback, useEffect, useRef, useState } from 'react'
import { Blaetter, leererBlattFilter, type BlattFilter } from './seiten/Blaetter'
import { Einheiten } from './seiten/Einheiten'
import { Team } from './seiten/Team'
import { Kurs } from './seiten/Kurs'
import { Passgenau } from './seiten/Passgenau'
import { startAusHash, type PassgenauStart } from './passgenau/ui/hub'
import { Toaster } from './components/Toaster'
import { Icon, type IconName } from './components/Icon'
import { teamSync } from './lib/teamSync'
import { useBewertungen } from './lib/useBewertungen'
import { alleBlaetter } from './data/blaetter'
import type { Material } from './types/material'
import { normaliseEldibCode } from './lib/deeplink'
import { kursFrei } from './lib/nutzer'

type Seite = 'blaetter' | 'kurs' | 'einheiten' | 'team' | 'passgenau' | 'spiele'
type ReiterId = 'passgenau' | 'kurse' | 'bibliothek' | 'kurs' | 'team' | 'spiele'

/** Name der Seite – für Dokumenttitel und Menü */
const SEITENNAME: Record<Seite, string> = {
  passgenau: 'Stunde planen',
  blaetter: 'Arbeitsblätter',
  einheiten: 'Einheiten',
  kurs: 'Skills-Kurs',
  team: 'Team-Material',
  spiele: 'Spiele (CREW)',
}

const WILLKOMMEN_KEY = 'toolbox-willkommen'
function willkommenGelesen(): boolean {
  try {
    return localStorage.getItem(WILLKOMMEN_KEY) === '1'
  } catch {
    return false
  }
}
function willkommenMerken(): void {
  try {
    localStorage.setItem(WILLKOMMEN_KEY, '1')
  } catch {
    /* Speicher gesperrt (z. B. eingebetteter Frame): die Leiste erscheint dann beim nächsten Besuch wieder */
  }
}

function hashParameter(hash: string): URLSearchParams {
  return new URLSearchParams(hash.replace(/^#\/?/, ''))
}

/** Welche Seite ein Link meint (null = keine Angabe). */
function seiteAusHash(hash: string): Seite | null {
  const h = hash.replace(/^#\/?/, '')
  if (!h) return null
  if (h === 'team' || h.startsWith('team&')) return 'team'
  if (h === 'passgenau' || h.startsWith('passgenau=') || h.startsWith('passgenau&') || h.startsWith('passgenau/')) return 'passgenau'
  // Den Skills-Kurs sehen nur die Konten aus CDSE_SKILLSKURS (lib/nutzer kursFrei) – sonst die Arbeitsblätter
  if (h === 'kurs' || h.startsWith('kurs=') || h.startsWith('kurs&')) return kursFrei() ? 'kurs' : 'blaetter'
  if (h === 'einheiten') return 'einheiten'
  // CREW (26.10.2026): die Spiele der Crew als Reiter der Toolbox (früher eine eigene App im Hub)
  if (h === 'spiele' || h === 'crew') return 'spiele'
  if (h === 'blaetter') return 'blaetter'
  const p = hashParameter(hash)
  if (p.get('seite') === 'einheiten') return 'einheiten'
  if (p.get('seite') === 'team') return 'team'
  if (p.has('blatt')) return 'blaetter'
  if (p.has('material') || p.has('alter') || p.has('q')) return 'einheiten'
  if (p.has('eldib')) return 'blaetter'
  return null
}

/** #blatt=<id> – jedes Mal ein neues Objekt, damit derselbe Link auch ein zweites Mal ausgewertet wird. */
function blattAusHash(hash: string): { id: string } | null {
  const id = hashParameter(hash).get('blatt')
  return id ? { id } : null
}

function filterAusHash(hash: string): BlattFilter {
  const p = hashParameter(hash)
  const eldib = (p.get('eldib') || '')
    .split(/[\s,;]+/)
    .map((x) => normaliseEldibCode(x))
    .filter((x): x is string => !!x)
  return eldib.length ? { ...leererBlattFilter, eldib } : leererBlattFilter
}

/** Hash, den der Reiter beim Anklicken schreibt (der Kurs und Passgenau behalten ihren Unterstand). */
function reiterHash(s: Seite): string {
  const h = window.location.hash
  if (s === 'passgenau') return seiteAusHash(h) === 'passgenau' ? h : '#passgenau'
  if (s === 'kurs') return seiteAusHash(h) === 'kurs' ? h : '#kurs'
  return '#' + s
}

function neuerEintrag(hash: string) {
  if (hash === window.location.hash) return
  try {
    history.pushState(null, '', hash)
  } catch {
    /* z. B. eingebetteter Frame ohne Verlauf: der Reiter wechselt trotzdem */
  }
}

/** Sprungmarken: zum Ziel springen, ohne die Adresse (den Hash) zu verändern. */
function springeZu(id: string) {
  return (e: React.MouseEvent) => {
    const ziel = document.getElementById(id)
    if (!ziel) return
    e.preventDefault()
    ziel.focus({ preventScroll: true })
    ziel.scrollIntoView({ block: 'start' })
  }
}

const SPRUNGLINK =
  'sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-[var(--r-sm)] focus:bg-surface focus:px-3 focus:py-2 focus:shadow-[var(--shadow-3)]'

export default function App() {
  const [seite, setSeite] = useState<Seite>(() => seiteAusHash(window.location.hash) ?? 'blaetter')
  const [blattFilter, setBlattFilter] = useState<BlattFilter>(() => filterAusHash(window.location.hash))
  const [startBlatt, setStartBlatt] = useState<{ id: string } | null>(() => blattAusHash(window.location.hash))
  const [teamMaterial, setTeamMaterial] = useState<Material[]>([])
  const [pgStart, setPgStart] = useState<PassgenauStart | null>(() => (seiteAusHash(window.location.hash) === 'passgenau' ? startAusHash(window.location.hash) : null))
  // Willkommensleiste: nur beim ersten Besuch ohne Link (der Hub öffnet immer mit Hash)
  const [willkommen, setWillkommen] = useState(() => !window.location.hash.replace(/^#\/?/, '') && !willkommenGelesen())
  const [menue, setMenue] = useState(false)
  // „Hilfe finden“ (Einheiten) von überall aus öffnen: ein neuer Zählerstand öffnet den Dialog dort
  const [finderNr, setFinderNr] = useState(0)
  const bew = useBewertungen()

  // Seiten erst beim ersten Besuch bauen (die Blätter-Liste allein sind sonst ~20.000 Knoten im Baum)
  const besucht = useRef<Set<Seite>>(new Set())
  besucht.current.add(seite)
  // zuletzt gezeigte Seite der Bibliothek – der Reiter „Bibliothek“ kehrt dorthin zurück
  const letzteBib = useRef<'blaetter' | 'einheiten'>('blaetter')
  if (seite === 'blaetter' || seite === 'einheiten') letzteBib.current = seite

  // Team-Ablage verbinden (falls schon einmal gewählt) und Uploads mitlesen.
  useEffect(() => {
    const aus = teamSync.onChange(setTeamMaterial)
    teamSync.reconnect().catch(() => {})
    return aus
  }, [])

  // welche Ansicht Passgenau zeigt (Reiter „Kurse“ ist Passgenau mit der Ansicht „kurse“)
  const [pgAnsicht, setPgAnsicht] = useState<string>('')
  useEffect(() => {
    const merken = (e: Event) => setPgAnsicht(String((e as CustomEvent<string>).detail))
    window.addEventListener('passgenau-ansicht', merken)
    return () => window.removeEventListener('passgenau-ansicht', merken)
  }, [])

  // Links vom Hub (oder zurück/vor im Browser)
  useEffect(() => {
    function onHash(e: HashChangeEvent) {
      // Der Hash des Links selbst: die Seiten halten den Hash aktuell und können ihn schon umgeschrieben haben
      const hash = new URL(e.newURL).hash
      const s = seiteAusHash(hash)
      if (s) setSeite(s)
      if (s === 'passgenau') setPgStart(startAusHash(hash))
      if (s === 'blaetter') {
        setBlattFilter(filterAusHash(hash))
        setStartBlatt(blattAusHash(hash))
      }
      setMenue(false)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Dokumenttitel je Seite; Klasse am body für die untere Tableiste (am Handy) – in Passgenau steht dort die Aktionsleiste
  useEffect(() => {
    document.title = `${SEITENNAME[seite]} · Toolbox`
    document.body.classList.toggle('mit-tabbar', seite !== 'passgenau')
    document.body.classList.toggle('seite-passgenau', seite === 'passgenau')
    return () => document.body.classList.remove('mit-tabbar', 'seite-passgenau')
  }, [seite])

  // Menü (Handy, nur in Passgenau): Escape schließt, ein Klick daneben auch
  useEffect(() => {
    if (!menue) return
    const zu = (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent) return void (e.key === 'Escape' && setMenue(false))
      if (!(e.target as HTMLElement | null)?.closest('.menue-wrap')) setMenue(false)
    }
    document.addEventListener('keydown', zu)
    document.addEventListener('mousedown', zu)
    return () => {
      document.removeEventListener('keydown', zu)
      document.removeEventListener('mousedown', zu)
    }
  }, [menue])

  const wechseln = useCallback(
    (s: Seite) => {
      setMenue(false)
      // Klick auf den offenen Reiter „Skills-Kurs“: zurück zur Übersicht (wie „‹ Jahresweg“, mit Verlaufseintrag)
      if (s === 'kurs' && seite === 'kurs' && window.location.hash !== '#kurs') {
        window.location.hash = 'kurs'
        return
      }
      if (s === seite) {
        setStartBlatt(null)
        window.scrollTo({ top: 0 })
        return
      }
      // #kurs=… schreibt der Kurs selbst (die zuletzt offene Einheit bleibt)
      neuerEintrag(reiterHash(s))
      setSeite(s)
      setStartBlatt(null)
      if (s === 'passgenau') setPgStart((alt) => alt ?? startAusHash('#passgenau'))
      window.scrollTo({ top: 0 })
    },
    [seite],
  )

  const hilfeFinden = useCallback(() => {
    setFinderNr((n) => n + 1)
    wechseln('einheiten')
  }, [wechseln])

  const zuBlaettern = useCallback((codes: string[]) => {
    setBlattFilter({ ...leererBlattFilter, eldib: codes })
    setStartBlatt(null)
    neuerEintrag('#eldib=' + codes.map(encodeURIComponent).join(','))
    setSeite('blaetter')
    window.scrollTo({ top: 0 })
  }, [])
  const zuEinheiten = useCallback((codes: string[]) => {
    // Seite und Ziele wechseln zusammen beim hashchange (hier und in „Einheiten“)
    const h = '#eldib=' + codes.map(encodeURIComponent).join(',') + '&seite=einheiten'
    if (window.location.hash !== h) window.location.hash = h
    else setSeite('einheiten')
  }, [])

  function willkommenSchliessen() {
    setWillkommen(false)
    willkommenMerken()
  }
  function willkommenStart(ziel: Seite | 'suchen') {
    willkommenSchliessen()
    if (ziel === 'suchen') {
      document.querySelector<HTMLInputElement>('.search input')?.focus()
      return
    }
    wechseln(ziel)
  }

  const kurs = kursFrei()
  const reiter: { id: ReiterId; name: string; zusatz?: string; icon: IconName; n?: number }[] = [
    { id: 'passgenau', name: 'Stunde planen', zusatz: 'Passgenau', icon: 'compass' },
    // Kurs-Bibliothek (22.10.2026): liegt in Passgenau (#passgenau/kurse), damit „Kurs starten“ das Kind kennt
    { id: 'kurse', name: 'Kurse', icon: 'layers' },
    { id: 'bibliothek', name: 'Blätter', icon: 'book' },
    // „Skills“ statt „Kurs“: neben dem Reiter „Kurse“ (Kurs-Bibliothek) sonst verwechselbar
    ...(kurs ? [{ id: 'kurs' as const, name: 'Skills', icon: 'stairs' as const }] : []),
    { id: 'spiele', name: 'Spiele', zusatz: 'CREW', icon: 'game' },
    { id: 'team', name: 'Team', icon: 'folder', n: teamMaterial.length },
  ]
  const aktivReiter: ReiterId = seite === 'blaetter' || seite === 'einheiten' ? 'bibliothek' : seite === 'passgenau' && pgAnsicht === 'kurse' ? 'kurse' : seite
  const waehle = (id: ReiterId) => {
    if (id === 'kurse') {
      // ohne hashchange: ein neuer Start-Hash würde Passgenau neu starten (und das Kind aus dem Hub verlieren)
      neuerEintrag('#passgenau/kurse')
      setSeite('passgenau')
      setPgStart((alt) => alt ?? startAusHash('#passgenau'))
      window.dispatchEvent(new CustomEvent('passgenau-oeffnen', { detail: 'kurse' }))
      window.scrollTo({ top: 0 })
      setMenue(false)
      return
    }
    if (id === 'passgenau' && seite === 'passgenau' && pgAnsicht === 'kurse') {
      window.dispatchEvent(new CustomEvent('passgenau-oeffnen', { detail: 'start' }))
      return
    }
    wechseln(id === 'bibliothek' ? letzteBib.current : id)
  }
  const inBibliothek = seite === 'blaetter' || seite === 'einheiten'

  const knoepfe = (mitZusatz: boolean) =>
    reiter.map((r) => (
      <button key={r.id} type="button" aria-current={aktivReiter === r.id ? 'page' : undefined} onClick={() => waehle(r.id)}>
        <Icon name={r.icon} />
        <span>{r.name}</span>
        {mitZusatz && r.zusatz ? <small className="zusatz">{r.zusatz}</small> : null}
        {mitZusatz && r.n ? <span className="n">{r.n}</span> : null}
      </button>
    ))

  return (
    <div className="min-h-screen">
      <a href="#inhalt" className={SPRUNGLINK} onClick={springeZu('inhalt')}>
        Zum Inhalt springen
      </a>
      {inBibliothek ? (
        <a href="#blaetter" className={SPRUNGLINK} onClick={springeZu(seite === 'blaetter' ? 'blaetter' : 'ergebnisse')}>
          Zu den Treffern
        </a>
      ) : null}
      <header className="sticky top-0 z-30 border-b border-line bg-surface/95 sm:backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center gap-x-5 px-4 py-2 sm:px-6 sm:py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[var(--r-md)] bg-accent text-white shadow-[0_6px_14px_-6px_var(--accent)] sm:h-9 sm:w-9">
              <Icon name="briefcase" className="ic h-[18px] w-[18px] sm:h-[19px] sm:w-[19px]" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="disp block text-lg text-ink">Toolbox</span>
              <span className="hidden truncate text-xs font-medium text-muted sm:block">Material für das CDSE</span>
            </span>
          </div>
          <nav className="haupt-reiter" aria-label="Bereiche der Toolbox">
            {knoepfe(true)}
          </nav>
          {seite === 'passgenau' ? (
            // Handy: in Passgenau fehlt die untere Tableiste (dort steht die Aktionsleiste) – das Menü ersetzt sie
            <div className="menue-wrap ml-auto sm:hidden">
              <button type="button" className="btn btn-sm" aria-expanded={menue} aria-controls="menue-liste" onClick={() => setMenue((m) => !m)}>
                <Icon name={menue ? 'x' : 'menu'} />
                Menü
              </button>
              {menue ? (
                <ul id="menue-liste" className="menue-liste">
                  {reiter.map((r) => (
                    <li key={r.id}>
                      <button type="button" aria-current={aktivReiter === r.id ? 'page' : undefined} onClick={() => waehle(r.id)}>
                        <Icon name={r.icon} />
                        {r.name}
                        {r.id === 'passgenau' ? <small className="zusatz">Passgenau</small> : null}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      </header>

      <div id="inhalt" tabIndex={-1} className="outline-none">
        {willkommen && seite === 'blaetter' ? (
          <div className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6">
            <section className="willkommen" aria-labelledby="willkommen-titel">
              <div className="willkommen-kopf">
                <div className="min-w-0">
                  <p id="willkommen-titel" className="disp willkommen-titel">
                    Willkommen in der Toolbox
                  </p>
                  <p className="willkommen-text">Material und Stundenplanung für die Arbeit im CDSE – im Browser, auch ohne Internet. Wo möchtest du anfangen?</p>
                </div>
                <button type="button" className="icon-btn" onClick={willkommenSchliessen} aria-label="Willkommen schließen" title="Schließen">
                  <Icon name="x" />
                </button>
              </div>
              <div className="willkommen-wahl">
                <button type="button" className="willkommen-karte primaer" onClick={() => willkommenStart('passgenau')}>
                  <span className="willkommen-icon">
                    <Icon name="compass" />
                  </span>
                  <span className="min-w-0">
                    <b>Stunde planen</b>
                    <small>Passgenau stellt dir aus Alter und Zielen eine fertige Stunde zusammen – als PDF zum Ausdrucken.</small>
                  </span>
                </button>
                <button type="button" className="willkommen-karte" onClick={() => willkommenStart('suchen')}>
                  <span className="willkommen-icon">
                    <Icon name="file" />
                  </span>
                  <span className="min-w-0">
                    <b>
                      <span className="nur-gross">Arbeitsblatt suchen</span>
                      <span className="nur-klein">Blatt suchen</span>
                    </b>
                    <small>{alleBlaetter.length} Blätter von der Spielschule bis zur Sekundarschule, jedes mit Seite für Erwachsene.</small>
                  </span>
                </button>
                {kurs ? (
                  <button type="button" className="willkommen-karte" onClick={() => willkommenStart('kurs')}>
                    <span className="willkommen-icon">
                      <Icon name="stairs" />
                    </span>
                    <span className="min-w-0">
                      <b>Skills-Kurs</b>
                      <small>Kursjahre mit fertigen Einheiten für Kleingruppen von 12 bis 16 Jahren.</small>
                    </span>
                  </button>
                ) : (
                  <button type="button" className="willkommen-karte" onClick={() => willkommenStart('einheiten')}>
                    <span className="willkommen-icon">
                      <Icon name="book" />
                    </span>
                    <span className="min-w-0">
                      <b>
                        <span className="nur-gross">Aktivitäten ansehen</span>
                        <span className="nur-klein">Aktivitäten</span>
                      </b>
                      <small>Aktivitäten und Kursstunden aus der CDSE-Sammlung, nach Alter und Thema sortiert.</small>
                    </span>
                  </button>
                )}
              </div>
            </section>
          </div>
        ) : null}

        {inBibliothek ? (
          <div className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-5">
            <nav className="seg bib-unter" aria-label="Bibliothek">
              <button type="button" aria-current={seite === 'blaetter' ? 'page' : undefined} onClick={() => wechseln('blaetter')}>
                Arbeitsblätter
                <span className="n">{alleBlaetter.length}</span>
              </button>
              <button type="button" aria-current={seite === 'einheiten' ? 'page' : undefined} onClick={() => wechseln('einheiten')}>
                <span className="nur-gross">Aktivitäten &amp; Kursstunden</span>
                <span className="nur-klein">Aktivitäten</span>
              </button>
            </nav>
          </div>
        ) : null}

        {besucht.current.has('blaetter') && <Blaetter aktiv={seite === 'blaetter'} bew={bew} startFilter={blattFilter} startBlatt={startBlatt} onEinheitenZuEldib={zuEinheiten} onHilfeFinden={hilfeFinden} />}
        {kurs && besucht.current.has('kurs') && <Kurs aktiv={seite === 'kurs'} bew={bew} />}
        {besucht.current.has('einheiten') && <Einheiten aktiv={seite === 'einheiten'} bew={bew} teamMaterials={teamMaterial} onBlaetterZuEldib={zuBlaettern} finderNr={finderNr} />}
        {besucht.current.has('team') && <Team aktiv={seite === 'team'} material={teamMaterial} bew={bew} />}
        {besucht.current.has('spiele') && <Spiele aktiv={seite === 'spiele'} />}
        {besucht.current.has('passgenau') && <Passgenau aktiv={seite === 'passgenau'} start={pgStart} onHilfeFinden={hilfeFinden} />}
      </div>

      {/* Handy: feste Tableiste unten (in Passgenau ausgeblendet, siehe Menü oben) */}
      <nav className="tabbar" aria-label="Bereiche der Toolbox">
        {knoepfe(false)}
      </nav>
      <Toaster />
    </div>
  )
}

/**
 * Spiele der Crew (apps/crew im Hub-Ordner, neben toolbox.html): die Startseite mit Skills-Abschlussspiel,
 * QR-Codes und iPads – eingebettet. Ohne Hub-Ordner (Toolbox allein geöffnet) fehlt sie; dann hilft der Hinweis.
 */
function Spiele({ aktiv }: { aktiv: boolean }) {
  return (
    <section hidden={!aktiv} aria-labelledby="spiele-titel" className="mx-auto max-w-[1440px] px-4 pt-4 pb-24 sm:px-6 sm:pt-5">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 id="spiele-titel" className="disp text-2xl text-ink">Spiele der CREW</h1>
          <p className="text-sm text-muted">Am Beamer oder auf den iPads per QR-Code – das Abschlussspiel jeder Skills-Stunde und Spiele passend zu den Zielen eines Kindes.</p>
        </div>
        <a className="btn btn-sm" href="crew/start.html" target="_blank" rel="noopener">
          <Icon name="external" />
          Im eigenen Tab öffnen
        </a>
      </div>
      <iframe
        src="crew/start.html"
        title="Spiele der CREW"
        className="block w-full rounded-[var(--r-md)] border border-line bg-surface"
        style={{ height: 'calc(100vh - 210px)', minHeight: 520 }}
      />
      <p className="mt-2 text-xs text-muted">Bleibt das Feld leer, liegt die Toolbox nicht im Hub-Ordner: Die Spiele stehen dort unter apps/crew.</p>
    </section>
  )
}

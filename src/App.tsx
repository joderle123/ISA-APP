// ---------------------------------------------------------------------------
// CDSE Toolbox: drei Bereiche unter einem Dach –
//   Arbeitsblätter (neu, professionell gesetzt), Einheiten (Bibliothek) und
//   Team-Material (eigenes Material teilen).
// Deep-Links: #blatt=<id> · #eldib=V-13 · #eldib=V-13&material=<id> · #team
// ---------------------------------------------------------------------------
import { useCallback, useEffect, useState } from 'react'
import { Blaetter, leererBlattFilter, type BlattFilter } from './seiten/Blaetter'
import { Einheiten } from './seiten/Einheiten'
import { Team } from './seiten/Team'
import { Toaster } from './components/Toaster'
import { Icon } from './components/Icon'
import { teamSync } from './lib/teamSync'
import { useBewertungen } from './lib/useBewertungen'
import { alleBlaetter } from './data/blaetter'
import type { Material } from './types/material'
import { normaliseEldibCode } from './lib/deeplink'

type Seite = 'blaetter' | 'einheiten' | 'team'

function hashParameter(hash: string): URLSearchParams {
  return new URLSearchParams(hash.replace(/^#\/?/, ''))
}

/** Welche Seite ein Link meint (null = keine Angabe). */
function seiteAusHash(hash: string): Seite | null {
  const h = hash.replace(/^#\/?/, '')
  if (!h) return null
  if (h === 'team' || h.startsWith('team&')) return 'team'
  if (h === 'einheiten') return 'einheiten'
  if (h === 'blaetter') return 'blaetter'
  const p = hashParameter(hash)
  if (p.get('seite') === 'einheiten') return 'einheiten'
  if (p.get('seite') === 'team') return 'team'
  if (p.has('blatt')) return 'blaetter'
  if (p.has('material') || p.has('alter') || p.has('q')) return 'einheiten'
  if (p.has('eldib')) return 'blaetter'
  return null
}

function filterAusHash(hash: string): BlattFilter {
  const p = hashParameter(hash)
  const eldib = (p.get('eldib') || '')
    .split(/[\s,;]+/)
    .map((x) => normaliseEldibCode(x))
    .filter((x): x is string => !!x)
  return eldib.length ? { ...leererBlattFilter, eldib } : leererBlattFilter
}

export default function App() {
  const [seite, setSeite] = useState<Seite>(() => seiteAusHash(window.location.hash) ?? 'blaetter')
  const [blattFilter, setBlattFilter] = useState<BlattFilter>(() => filterAusHash(window.location.hash))
  const [startBlatt, setStartBlatt] = useState<string | null>(() => hashParameter(window.location.hash).get('blatt'))
  const [teamMaterial, setTeamMaterial] = useState<Material[]>([])
  const bew = useBewertungen()

  // Team-Ablage verbinden (falls schon einmal gewählt) und Uploads mitlesen.
  useEffect(() => {
    const aus = teamSync.onChange(setTeamMaterial)
    teamSync.reconnect().catch(() => {})
    return aus
  }, [])

  // Links vom Hub (oder zurück/vor im Browser)
  useEffect(() => {
    function onHash() {
      const s = seiteAusHash(window.location.hash)
      if (s) setSeite(s)
      if (s === 'blaetter') {
        setBlattFilter(filterAusHash(window.location.hash))
        setStartBlatt(hashParameter(window.location.hash).get('blatt'))
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const wechseln = useCallback((s: Seite) => {
    setSeite(s)
    setStartBlatt(null)
    if (s === 'team') history.replaceState(null, '', '#team')
    else if (s === 'blaetter') history.replaceState(null, '', window.location.pathname + window.location.search)
    window.scrollTo({ top: 0 })
  }, [])

  const zuBlaettern = useCallback((codes: string[]) => {
    setBlattFilter({ ...leererBlattFilter, eldib: codes })
    setStartBlatt(null)
    setSeite('blaetter')
    window.scrollTo({ top: 0 })
  }, [])
  const zuEinheiten = useCallback((codes: string[]) => {
    window.location.hash = '#eldib=' + codes.map(encodeURIComponent).join(',') + '&seite=einheiten'
    setSeite('einheiten')
  }, [])

  const reiter: [Seite, string, string, number][] = [
    ['blaetter', 'Arbeitsblätter', 'file', alleBlaetter.length],
    ['einheiten', 'Einheiten', 'book', 0],
    ['team', 'Team-Material', 'folder', teamMaterial.length],
  ]

  return (
    <div className="min-h-screen">
      <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2 focus:shadow-[var(--shadow-3)]">
        Zum Inhalt springen
      </a>
      <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-accent text-white shadow-[0_6px_14px_-6px_var(--accent)]">
              <Icon name="briefcase" className="ic h-[19px] w-[19px]" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="disp block text-[17px] text-ink">Toolbox</span>
              <span className="block truncate text-[11.5px] font-medium text-muted">Material für das CDSE</span>
            </span>
          </div>
          <nav className="haupt-reiter" aria-label="Bereiche der Toolbox">
            {reiter.map(([id, name, icon, n]) => (
              <button key={id} type="button" aria-current={seite === id ? 'page' : undefined} onClick={() => wechseln(id)}>
                <Icon name={icon as never} />
                <span>{name}</span>
                {n > 0 && <span className="n">{n}</span>}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div id="inhalt" tabIndex={-1} className="outline-none">
        <Blaetter aktiv={seite === 'blaetter'} bew={bew} startFilter={blattFilter} startBlatt={startBlatt} onEinheitenZuEldib={zuEinheiten} />
        <Einheiten aktiv={seite === 'einheiten'} bew={bew} teamMaterials={teamMaterial} onBlaetterZuEldib={zuBlaettern} />
        <Team aktiv={seite === 'team'} material={teamMaterial} bew={bew} />
      </div>
      <Toaster />
    </div>
  )
}

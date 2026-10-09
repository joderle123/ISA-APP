// Passgenau – kleine Bausteine der Oberfläche: Chips, Segmente, Rollen-Etikett, Warum, Daumen mit Gründen, Hinweise.
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Dialog } from '../../components/Dialog'
import type { DaumenGrund, KatalogEintrag, Rolle } from '../typen'
import { Ic, type Zeichen } from './zeichen'
import { DAUMEN_GRUENDE, ROLLE_NAME } from './texte'
import { usePg } from './zustand'

export function Chip({ an, onClick, children, klein, titel, disabled, gross }: { an: boolean; onClick: () => void; children: ReactNode; klein?: ReactNode; titel?: string; disabled?: boolean; gross?: boolean }) {
  return (
    <button type="button" className={'pg-chip' + (an ? ' an' : '') + (gross ? ' gross' : '')} aria-pressed={an} onClick={onClick} title={titel} disabled={disabled}>
      {an && <Ic n="check" />}
      {children}
      {klein && <small>{klein}</small>}
    </button>
  )
}

export function Seg<T extends string | number>({ wert, optionen, onWahl, label }: { wert: T | undefined; optionen: [T, string][]; onWahl: (v: T) => void; label: string }) {
  return (
    <div className="pg-seg" role="group" aria-label={label}>
      {optionen.map(([v, t]) => (
        <button key={String(v)} type="button" aria-pressed={wert === v} className={wert === v ? 'an' : ''} onClick={() => onWahl(v)}>
          {t}
        </button>
      ))}
    </div>
  )
}

export function RolleBadge({ rolle }: { rolle: Rolle | 'blatt' | 'wahl' }) {
  return <span className={'pg-rolle r-' + rolle}>{ROLLE_NAME[rolle]}</span>
}

export function Warum({ texte }: { texte: string[] }) {
  if (!texte.length) return null
  return (
    <div className="pg-warum">
      <Ic n="info" />
      <span>
        <span className="sr-only">Warum: </span>
        {texte.map((t, i) => (
          <span key={i}>
            {i > 0 && ' · '}
            <FettCodes t={t} />
          </span>
        ))}
      </span>
    </div>
  )
}

/** ELDiB-Codes im Text fett */
export function FettCodes({ t }: { t: string }) {
  const teile = t.split(/\b((?:V|K|SOZ|KOG)-\d{1,2})\b/)
  return <>{teile.map((x, i) => (i % 2 ? <b key={i}>{x}</b> : x))}</>
}

export function Pill({ art, children, icon }: { art?: 'ok' | 'warn' | 'akz' | 'erk' | 'bad'; children: ReactNode; icon?: Zeichen }) {
  return (
    <span className={'pg-pill' + (art ? ' ' + art : '')}>
      {icon && <Ic n={icon} />}
      {children}
    </span>
  )
}

/** Daumen hoch/runter an einem Teil; runter öffnet die Gründe (6.3). Gemeldet wird beim Schließen – mit oder ohne Grund. */
export function Daumen({
  schluessel, titel, eintrag, ort, rolle, onErsetzen, erkundung,
}: {
  schluessel: string
  titel: string
  eintrag?: KatalogEintrag
  ort: { sitzung: number | null }
  rolle?: Rolle
  onErsetzen?: () => void
  erkundung?: boolean
}) {
  const pg = usePg()
  const stand = pg.daumenStand[schluessel]
  const [offen, setOffen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const gemeldet = useRef(false)
  const titelId = useId()

  const runterMelden = (grund: DaumenGrund | null) => {
    if (gemeldet.current) return
    gemeldet.current = true
    pg.melde('daumen_runter', { sitzung: ort.sitzung, baustein: eintrag?.id ?? null, h: eintrag?.h ?? null, tags: pg.tagsVon(eintrag, rolle), wert: -1, grund, erkundung }, eintrag)
  }
  const schliessen = (grund: DaumenGrund | null) => {
    runterMelden(grund)
    setOffen(false)
  }

  useEffect(() => {
    if (!offen) return
    const weg = (e: MouseEvent | TouchEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) schliessen(null)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && schliessen(null)
    document.addEventListener('mousedown', weg)
    document.addEventListener('touchstart', weg)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', weg)
      document.removeEventListener('touchstart', weg)
      document.removeEventListener('keydown', esc)
    }
  })

  const hoch = () => {
    if (stand === 'hoch') {
      pg.setDaumenStand((d) => ({ ...d, [schluessel]: undefined as never }))
      return
    }
    pg.setDaumenStand((d) => ({ ...d, [schluessel]: 'hoch' }))
    pg.melde('daumen_hoch', { sitzung: ort.sitzung, baustein: eintrag?.id ?? null, h: eintrag?.h ?? null, tags: pg.tagsVon(eintrag, rolle), wert: 1, erkundung }, eintrag)
    pg.hinweisZeigen('Gemerkt: mehr davon – gilt für alle deine Kinder.', 'ok', pg.lernenKind ? { label: `Passt gut zu ${pg.vorname}`, aktion: () => passtGut() } : undefined)
  }
  const passtGut = () => {
    pg.melde('daumen_hoch', { sitzung: ort.sitzung, baustein: eintrag?.id ?? null, h: eintrag?.h ?? null, tags: pg.tagsVon(eintrag, rolle), wert: 1, grund: 'passt-gut' }, eintrag)
    pg.hinweisZeigen(`Gemerkt für ${pg.vorname}.`)
  }
  const runter = () => {
    if (stand === 'runter') {
      pg.setDaumenStand((d) => ({ ...d, [schluessel]: undefined as never }))
      setOffen(false)
      return
    }
    pg.setDaumenStand((d) => ({ ...d, [schluessel]: 'runter' }))
    gemeldet.current = false
    setOffen(true)
  }
  const grundText: Record<string, string> = {
    'zu-lang': `Gemerkt für ${pg.vorname}: kürzere Schritte bevorzugt.`,
    'zu-kindlich': `Gemerkt für ${pg.vorname}: älter gestaltete Bausteine bevorzugt.`,
    'zu-schwer': `Gemerkt für ${pg.vorname}: weniger Schreiben, leichtere Bausteine.`,
    'zu-leicht': `Gemerkt für ${pg.vorname}: etwas mehr zutrauen.`,
    'passt-nicht': `Gemerkt für ${pg.vorname} – gilt auch für Kolleginnen, die mit ${pg.vorname} planen.`,
    'mag-nicht': 'Gemerkt für dich: kommt seltener (gilt für alle deine Kinder).',
  }
  const gruende: [DaumenGrund, string][] = [...DAUMEN_GRUENDE.slice(0, 3), ['zu-leicht' as DaumenGrund, 'zu leicht'], ...DAUMEN_GRUENDE.slice(3)]
  return (
    <div className="pg-daumen" ref={box}>
      <button type="button" className={'pg-ibtn' + (stand === 'hoch' ? ' an' : '')} aria-pressed={stand === 'hoch'} aria-label={`Daumen hoch: ${titel}`} title="Daumen hoch" onClick={hoch}>
        <Ic n="hoch" />
      </button>
      <button type="button" className={'pg-ibtn' + (stand === 'runter' ? ' an-runter' : '')} aria-pressed={stand === 'runter'} aria-label={`Daumen runter: ${titel}`} title="Daumen runter" aria-expanded={offen} onClick={runter}>
        <Ic n="runter" />
      </button>
      {offen && (
        <div className="pg-popover" role="dialog" aria-labelledby={titelId}>
          <h4 id={titelId}>
            Gemerkt. Warum nicht? <span className="pg-leise pg-klein">(optional)</span>
          </h4>
          <div className="pg-chips">
            {gruende.map(([g, t]) => (
              <button
                key={g}
                type="button"
                className="pg-chip"
                onClick={() => {
                  schliessen(g)
                  pg.hinweisZeigen(grundText[g] ?? 'Gemerkt.')
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="pg-btnrow pg-zwischen">
            <span className="pg-leise pg-klein">ändert nur die Gewichte</span>
            {onErsetzen && (
              <button
                type="button"
                className="pg-btn klein"
                onClick={() => {
                  schliessen(null)
                  onErsetzen()
                }}
              >
                <Ic n="tausch" />
                Jetzt ersetzen
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/** Dialog im Stil von Passgenau auf Basis des nativen <dialog> der Toolbox */
export function PgDialog({ titel, unter, onClose, children, fuss, breit, schmal }: { titel: string; unter?: ReactNode; onClose: () => void; children: ReactNode; fuss?: ReactNode; breit?: boolean; schmal?: boolean }) {
  const id = useId()
  return (
    <Dialog onClose={onClose} labelledBy={id} className={'pg-dlg' + (breit ? ' breit' : '') + (schmal ? ' schmal' : '')}>
      <div className="pg-dkopf">
        <div>
          <h2 id={id}>{titel}</h2>
          {unter && <p>{unter}</p>}
        </div>
        <button type="button" className="pg-ibtn" onClick={onClose} aria-label="Schließen" data-autofocus>
          <Ic n="x" />
        </button>
      </div>
      <div className="pg-dbody">{children}</div>
      {fuss && <div className="pg-dfuss">{fuss}</div>}
    </Dialog>
  )
}

/** Hinweisleiste unten (mit optionalem Knopf, z. B. „Rückgängig“); im offenen Dialog dort hinein */
export function Hinweisleiste() {
  const pg = usePg()
  const h = pg.hinweis
  const [, neu] = useState(0)
  useEffect(() => {
    const t = window.setTimeout(() => neu((x) => x + 1), 30)
    return () => window.clearTimeout(t)
  }, [pg.dlg])
  const host = typeof document !== 'undefined' ? document.querySelector('dialog.pg-dlg[open]') : null
  const leiste = (
    <div className="pg-hinweise" role="status" aria-live="polite">
      {h && (
        <div className={'pg-toast ' + (h.art ?? '')} key={h.id}>
          <Ic n={h.art === 'warn' ? 'info' : 'check'} />
          <span>{h.text}</span>
          {h.knopf && (
            <button
              type="button"
              className="pg-btn klein hell"
              onClick={() => {
                h.knopf!.aktion()
                pg.setHinweis(null)
              }}
            >
              {h.knopf.label}
            </button>
          )}
          <button type="button" className="pg-toast-x" aria-label="Hinweis schließen" onClick={() => pg.setHinweis(null)}>
            <Ic n="x" />
          </button>
        </div>
      )}
    </div>
  )
  return host ? createPortal(leiste, host) : leiste
}

/** Banner bei heiklem Thema (E-M2) */
export function HeikelBanner() {
  const pg = usePg()
  const p = pg.profil
  if (!p) return null
  const heikel = (p.achtung?.length ?? 0) > 0 || p.vorsicht.includes('heikel')
  if (!heikel) return null
  return (
    <div className="pg-banner warn" role="note">
      <Ic n="schild" />
      <div>
        <b>Zu {pg.vorname} ist ein heikles Thema offen.</b> Passgenau ersetzt keine Abklärung. Hinweise stehen im Dossier unter Material.
      </div>
    </div>
  )
}

/** Versions- und Rechte-Hinweise (T-M11) */
export function VersionsBanner() {
  const pg = usePg()
  if (!pg.version.hinweis) return null
  return (
    <div className="pg-banner warn" role="note">
      <Ic n="info" />
      <div>{pg.version.hinweis}</div>
    </div>
  )
}

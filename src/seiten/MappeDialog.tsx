// ---------------------------------------------------------------------------
// „Mappe als Heft“: Titel, Untertitel, Reihenfolge, Fassung je Blatt und Druck-Optionen
// einstellen und das Heft als PDF laden. Die Mappe selbst steht in lib/mappen.ts
// (bleibt nach dem Neuladen); der PDF-Teil (Deckblatt, Inhalt) in blatt/pdf/Mappe.tsx.
// ---------------------------------------------------------------------------
import { useEffect, useMemo, useRef, useState } from 'react'
import { blattById } from '../data/blaetter'
import { stufenText } from '../blatt/katalog'
import { FASSUNGEN, groesseresLayout, istFassung, kuerzbar } from '../blatt/variante'
import { loadPdfModule } from '../lib/loadPdf'
import { toast } from '../lib/toast'
import {
  TITEL_MAX,
  UNTERTITEL_MAX,
  mappeEntfernen,
  mappeFassung,
  mappeLeeren,
  mappeSetzen,
  mappeVerschieben,
  useMappe,
  type LehrerSeiten,
} from '../lib/mappen'
import { Dialog } from '../components/Dialog'
import { Icon } from '../components/Icon'

const LEHRER_WAHL: { id: LehrerSeiten; label: string }[] = [
  { id: 'keine', label: 'Keine' },
  { id: 'hinten', label: 'Hinten gesammelt' },
  { id: 'nach', label: 'Nach jedem Blatt' },
]

export function MappeDialog({ onSchliessen }: { onSchliessen: () => void }) {
  const mappe = useMappe()
  const [laedt, setLaedt] = useState(false)
  const koerperRef = useRef<HTMLDivElement>(null)
  // Knöpfe der Zeilen, damit der Fokus nach dem Verschieben beim Blatt bleibt
  const knoepfe = useRef(new Map<string, HTMLButtonElement>())
  const fokus = useRef<string | null>(null)

  // Blätter, die es (noch) gibt, in der Reihenfolge der Mappe
  const zeilen = useMemo(
    () =>
      mappe.eintraege.flatMap((e) => {
        const b = blattById.get(e.id)
        return b ? [{ e, b }] : []
      }),
    [mappe.eintraege],
  )

  useEffect(() => {
    const ziel = fokus.current
    fokus.current = null
    if (!ziel) return
    const k = ziel.lastIndexOf(':')
    const id = ziel.slice(0, k)
    const art = ziel.slice(k + 1)
    const el = knoepfe.current.get(ziel)
    // am Rand der Liste ist der Knopf gesperrt: dann der andere Pfeil, sonst der Dialog selbst
    const anderer = knoepfe.current.get(`${id}:${art === 'hoch' ? 'runter' : 'hoch'}`)
    const f = el && !el.disabled ? el : anderer && !anderer.disabled ? anderer : koerperRef.current
    f?.focus({ preventScroll: true })
  }, [mappe.eintraege])

  const knopfRef = (key: string) => (el: HTMLButtonElement | null) => {
    if (el) knoepfe.current.set(key, el)
    else knoepfe.current.delete(key)
  }
  function verschieben(id: string, richtung: -1 | 1) {
    fokus.current = `${id}:${richtung < 0 ? 'hoch' : 'runter'}`
    mappeVerschieben(id, richtung)
  }
  function entfernen(id: string) {
    fokus.current = 'koerper:'
    mappeEntfernen(id)
  }

  async function laden() {
    if (!zeilen.length) return
    setLaedt(true)
    try {
      const m = await loadPdfModule()
      const name = await m.downloadMappeHeft(
        zeilen.map(({ e, b }) => ({ blatt: b, nr: b.nr, sprache: b.fr ? e.sprache : 'de', fassung: e.fassung })),
        { titel: mappe.titel.trim() || 'Meine Mappe', untertitel: mappe.untertitel.trim(), lehrer: mappe.lehrer, deckblatt: mappe.deckblatt },
      )
      toast(`Heft erstellt: ${name}`, 'ok')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Das Heft konnte nicht erstellt werden.', 'error')
    } finally {
      setLaedt(false)
    }
  }

  return (
    <Dialog onClose={onSchliessen} labelledBy="mp-dialog-titel" className="dlg-mid">
      <header className="dlg-head items-center">
        <div className="min-w-0 flex-1">
          <h2 id="mp-dialog-titel" className="disp text-[20px] leading-tight">
            Mappe als Heft
          </h2>
          <p className="mt-0.5 text-[13px] text-muted">
            {zeilen.length === 1 ? '1 Blatt' : `${zeilen.length} Blätter`} · bleibt in diesem Browser gespeichert
          </p>
        </div>
        <button type="button" onClick={onSchliessen} className="icon-btn" aria-label="Schließen">
          <Icon name="x" />
        </button>
      </header>

      <div ref={koerperRef} className="dlg-body scroll-slim flex flex-col gap-5 px-4 py-4 sm:px-6" data-autofocus tabIndex={-1} style={{ outline: 'none' }}>
        <section className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="bew-label mb-1 block">Titel</span>
            <input className="field" value={mappe.titel} maxLength={TITEL_MAX} onChange={(e) => mappeSetzen({ titel: e.target.value })} placeholder="Meine Mappe" autoComplete="off" />
          </label>
          <label className="block">
            <span className="bew-label mb-1 block">Untertitel / Für wen (freiwillig)</span>
            <input
              className="field"
              value={mappe.untertitel}
              maxLength={UNTERTITEL_MAX}
              onChange={(e) => mappeSetzen({ untertitel: e.target.value })}
              placeholder="z. B. Gruppe Mittwoch"
              autoComplete="off"
              aria-describedby="mp-untertitel-hinweis"
            />
            <span id="mp-untertitel-hinweis" className="mt-1 block text-[12.5px] text-muted">
              Bitte keine Namen von Kindern eintragen.
            </span>
          </label>
        </section>

        <section className="flex flex-wrap items-start gap-x-8 gap-y-4">
          <div>
            <span className="bew-label mb-1 block" id="mp-lehrer-label">
              Seiten für die Lehrperson
            </span>
            <div className="seg" role="group" aria-labelledby="mp-lehrer-label">
              {LEHRER_WAHL.map((w) => (
                <button key={w.id} type="button" aria-pressed={mappe.lehrer === w.id} onClick={() => mappeSetzen({ lehrer: w.id })}>
                  {w.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="bew-label mb-1 block">Vorspann</span>
            <label className="check-row">
              <input type="checkbox" checked={mappe.deckblatt} onChange={(e) => mappeSetzen({ deckblatt: e.target.checked })} />
              Deckblatt und Inhalt
            </label>
          </div>
        </section>

        <section>
          <h3 className="bew-label mb-2">Blätter in dieser Reihenfolge</h3>
          {zeilen.length === 0 ? (
            <p className="mp-leer">Die Mappe ist leer. Lege Blätter mit dem Mappen-Symbol auf der Karte oder im Blatt in die Mappe.</p>
          ) : (
            <ol className="mp-liste">
              {zeilen.map(({ e, b }, i) => {
                const inhalt = e.sprache === 'fr' && b.fr ? b.fr : b.de
                return (
                  <li key={b.id} className="mp-zeile">
                    <span className="mp-pos" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="mp-text">
                      <div className="mp-titel">{inhalt.titel}</div>
                      <div className="mp-meta">
                        <span>{b.nr}</span>
                        <span>{stufenText(b.stufen)}</span>
                        {e.sprache === 'fr' && b.fr ? <span className="tag tag-outline">FR</span> : null}
                      </div>
                    </div>
                    <div className="mp-knoepfe">
                      <select
                        className="field"
                        value={e.fassung}
                        onChange={(ev) => {
                          const f = ev.target.value
                          if (istFassung(f)) mappeFassung(b.id, f)
                        }}
                        aria-label={`Fassung: ${inhalt.titel}`}
                      >
                        {FASSUNGEN.map((f) => (
                          <option key={f.id} value={f.id} disabled={f.id !== e.fassung && ((f.id === 'groesser' && !groesseresLayout(b)) || (f.id === 'wenigSchreiben' && !kuerzbar(b)))}>
                            {f.label}
                          </option>
                        ))}
                      </select>
                      <button type="button" className="icon-btn" ref={knopfRef(`${b.id}:hoch`)} onClick={() => verschieben(b.id, -1)} disabled={i === 0} aria-label={`Nach oben: ${inhalt.titel}`} title="Nach oben">
                        <Icon name="chevronDown" className="ic mp-hoch" />
                      </button>
                      <button type="button" className="icon-btn" ref={knopfRef(`${b.id}:runter`)} onClick={() => verschieben(b.id, 1)} disabled={i === zeilen.length - 1} aria-label={`Nach unten: ${inhalt.titel}`} title="Nach unten">
                        <Icon name="chevronDown" />
                      </button>
                      <button type="button" className="icon-btn" onClick={() => entfernen(b.id)} aria-label={`Aus der Mappe nehmen: ${inhalt.titel}`} title="Aus der Mappe nehmen">
                        <Icon name="x" />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ol>
          )}
          {zeilen.length > 40 ? <p className="mt-2 text-[12.5px] text-muted">Große Hefte brauchen beim Erstellen etwas Geduld.</p> : null}
        </section>
      </div>

      <footer className="dlg-foot flex-wrap">
        <button
          type="button"
          className="btn btn-sm btn-quiet"
          disabled={!zeilen.length && !mappe.eintraege.length}
          onClick={() => {
            mappeLeeren()
            onSchliessen()
          }}
        >
          <Icon name="trash" />
          Mappe leeren
        </button>
        <span className="grow" />
        <button type="button" className="btn btn-primary max-sm:grow" disabled={!zeilen.length || laedt} onClick={laden}>
          {laedt ? <span className="spin" /> : <Icon name="download" />}
          Heft herunterladen (PDF)
        </button>
      </footer>
    </Dialog>
  )
}

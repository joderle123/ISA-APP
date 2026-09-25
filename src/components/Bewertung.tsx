// Bewertung im Stil der Toolbox: Durchschnitt aus dem Team (goldene Sterne mit
// Bruchteil), eigene Sterne und kurze Praxis-Tipps.
import { useEffect, useId, useState } from 'react'
import type { Gesamtbewertung } from '../lib/teamSync'
import { StarRating } from './StarRating'
import { Icon } from './Icon'

const STERN = 'm12 2.6 2.83 5.95 6.52.83-4.78 4.5 1.2 6.46L12 17.2l-5.77 3.14 1.2-6.46-4.78-4.5 6.52-.83z'

/** Fünf Sterne mit anteiliger Füllung (z. B. 4,3). */
export function SterneAnzeige({ wert, groesse = 14 }: { wert: number; groesse?: number }) {
  const id = useId().replace(/:/g, '')
  return (
    <span className="inline-flex items-center gap-[1px]" role="img" aria-label={wert ? `Durchschnitt ${wert.toFixed(1).replace('.', ',')} von 5 Sternen` : 'Noch nicht bewertet'}>
      {[0, 1, 2, 3, 4].map((i) => {
        const f = Math.max(0, Math.min(1, wert - i))
        return (
          <svg key={i} width={groesse} height={groesse} viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id={`${id}-${i}`}>
                <stop offset={f} stopColor="#E0A526" />
                <stop offset={f} stopColor="transparent" />
              </linearGradient>
            </defs>
            <path d={STERN} fill={`url(#${id}-${i})`} stroke={f > 0 ? '#B07D0B' : '#AEB6C4'} strokeWidth={1.4} strokeLinejoin="round" />
          </svg>
        )
      })}
    </span>
  )
}

function zahl(x: number) {
  return x.toFixed(1).replace('.', ',')
}

/** Kompakt für Karten: Team-Schnitt (oder eigene Sterne, solange es keinen gibt). */
export function BewertungKurz({ gesamt, eigen }: { gesamt?: Gesamtbewertung; eigen: number }) {
  if (gesamt && gesamt.anzahl > 0)
    return (
      <span className="bew-kurz" title={`${gesamt.anzahl} ${gesamt.anzahl === 1 ? 'Bewertung' : 'Bewertungen'} aus dem Team${eigen ? ` · deine: ${eigen}` : ''}`}>
        <SterneAnzeige wert={gesamt.schnitt} groesse={13} />
        <b>{zahl(gesamt.schnitt)}</b>
        <span className="n">{gesamt.anzahl}</span>
      </span>
    )
  if (eigen)
    return (
      <span className="bew-kurz" title="Deine Bewertung">
        <SterneAnzeige wert={eigen} groesse={13} />
        <span className="n">deine</span>
      </span>
    )
  return <span className="bew-kurz leer">Noch keine Bewertung</span>
}

/** Ausführlich in der Detailansicht. */
export function BewertungVoll({
  titel,
  gesamt,
  eigen,
  notiz,
  verbunden,
  onBewerten,
  onNotiz,
}: {
  titel: string
  gesamt?: Gesamtbewertung
  eigen: number
  notiz: string
  verbunden: boolean
  onBewerten: (n: number) => void
  onNotiz: (t: string) => void
}) {
  const [entwurf, setEntwurf] = useState(notiz)
  useEffect(() => setEntwurf(notiz), [notiz])
  const tId = useId()
  const n = gesamt?.anzahl ?? 0
  return (
    <section className="bew-voll" aria-label="Bewertung">
      <div className="bew-kopf">
        <div className="bew-schnitt">
          <span className="disp bew-zahl">{n ? zahl(gesamt!.schnitt) : '–'}</span>
          <div>
            <SterneAnzeige wert={n ? gesamt!.schnitt : 0} groesse={16} />
            <div className="bew-anzahl">{n ? `${n} ${n === 1 ? 'Bewertung' : 'Bewertungen'} aus dem Team` : 'Noch keine Bewertung aus dem Team'}</div>
          </div>
        </div>
        <div className="bew-eigen">
          <span className="bew-label">Deine Bewertung</span>
          <StarRating value={eigen} onChange={onBewerten} size={20} label={titel} />
        </div>
      </div>
      <label htmlFor={tId} className="bew-label mt-3 block">
        Tipp für das Team <span className="font-normal text-muted">(optional, z. B. „klappt gut in der Kleingruppe“)</span>
      </label>
      <div className="mt-1.5 flex gap-2">
        <input id={tId} className="field" maxLength={400} value={entwurf} placeholder="Deine Erfahrung in einem Satz" onChange={(e) => setEntwurf(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onNotiz(entwurf)} />
        <button type="button" className="btn" disabled={entwurf.trim() === notiz.trim()} onClick={() => onNotiz(entwurf)}>
          Speichern
        </button>
      </div>
      {!verbunden && (
        <p className="mt-2 flex items-start gap-1.5 text-[12.5px] text-muted">
          <Icon name="info" className="ic mt-[2px] h-3.5 w-3.5 shrink-0" />
          Ohne verbundene Team-Ablage bleibt deine Bewertung auf diesem PC.
        </p>
      )}
      {gesamt && gesamt.notizen.length > 0 && (
        <ul className="bew-notizen">
          {gesamt.notizen.slice(0, 6).map((x, i) => (
            <li key={i}>
              <p>„{x.text}“</p>
              <span>
                {x.name}
                {x.t ? ' · ' + new Date(x.t).toLocaleDateString('de-LU', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

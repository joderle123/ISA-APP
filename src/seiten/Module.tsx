// Module (23.11.2026): alle multimodalen Modulhefte der Voie de préparation (Heft + Lösungen) und die Sporthefte.
// Die PDFs liegen neben der Toolbox (offline/module/ und offline/sport/ → im Hub apps/<toolbox>/module/ und …/sport/).
// Die Liste (src/data/modulhefte.json) schreibt `node tools/hefte/module-index.mjs` aus tools/hefte/inhalt/ und offline/sport/.
// Verweise: #module, #module=<fach> (z. B. #module=deutsch), #sport
import { useEffect, useState } from 'react'
import daten from '../data/modulhefte.json'
import { Icon } from '../components/Icon'

interface Modul {
  id: string
  nr: number
  niveau: string
  titel: string
  titelDe?: string
  untertitel: string
  farbe: string
  zart: string
  lektionen: number
  heft: string
  loesungen: string
  mb: number
  mbLoesungen: number
}
interface Fach {
  id: string
  name: string
  nameFr: string
  sprache: string
  klasse: string
  farbe: string
  module: Modul[]
}
interface SportHeft {
  datei: string
  name: string
  untertitel: string
  farbe: string
  art: string
  mb: number
  stunden?: number
}

const FAECHER = daten.faecher as Fach[]
const SPORT = daten.sport as SportHeft[]
const ANZAHL = FAECHER.reduce((s, f) => s + f.module.length, 0)
type Wahl = 'alle' | 'sport' | string

function wahlAusHash(): Wahl | null {
  const h = window.location.hash.replace(/^#\/?/, '')
  if (h === 'sport') return 'sport'
  const m = /^module=([a-z]+)/.exec(h)
  if (m && (m[1] === 'sport' || FAECHER.some((f) => f.id === m[1]))) return m[1]
  return h === 'module' ? 'alle' : null
}

const groesse = (mb: number) => (mb ? ` · ${mb.toLocaleString('de-DE')} MB` : '')

function ModulKarte({ m, fach }: { m: Modul; fach: Fach }) {
  const fr = fach.sprache === 'fr'
  return (
    <li className="flex overflow-hidden rounded-[16px] border border-line bg-surface shadow-[0_1px_2px_rgba(14,22,40,.05)]">
      <div className="flex w-[58px] flex-none flex-col items-center gap-1 pt-3 text-white" style={{ background: m.farbe }}>
        <span className="text-[11px] font-bold tracking-wide uppercase opacity-85">{fr ? 'Mod.' : 'Modul'}</span>
        <span className="disp text-[26px] leading-none">{m.nr}</span>
      </div>
      <div className="min-w-0 flex-1 p-4">
        <p className="text-[12px] font-bold tracking-wide text-muted uppercase">
          {fach.name}
          {m.niveau ? ` · ${m.niveau}` : ''} · {m.lektionen} {fr ? 'leçons' : 'Lektionen'}
        </p>
        <h3 className="disp mt-0.5 text-[19px] leading-snug text-ink">{m.titel}</h3>
        {m.titelDe && m.titelDe !== m.titel ? <p className="text-[13px] text-muted italic">{m.titelDe}</p> : null}
        <p className="mt-1 line-clamp-2 text-[14px] leading-snug text-ink-2">{m.untertitel}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a className="btn btn-sm btn-primary no-underline" href={`module/${m.heft}.pdf`} target="_blank" rel="noopener" title={`Öffnet das Heft als PDF in einem neuen Tab${groesse(m.mb)}`}>
            <Icon name="file" />
            {fr ? 'Cahier' : 'Heft'}
          </a>
          <a className="btn btn-sm no-underline" href={`module/${m.loesungen}.pdf`} target="_blank" rel="noopener" title={`Das ganze Heft mit eingetragenen Lösungen${groesse(m.mbLoesungen)}`}>
            <Icon name="checkCircle" />
            {fr ? 'Solutions' : 'Lösungen'}
          </a>
        </div>
      </div>
    </li>
  )
}

function SportKarte({ s }: { s: SportHeft }) {
  const gross = s.art === 'baukasten'
  return (
    <li className={'flex overflow-hidden rounded-[16px] border border-line bg-surface shadow-[0_1px_2px_rgba(14,22,40,.05)] ' + (gross ? 'sm:col-span-2' : '')}>
      <div className="w-[10px] flex-none" style={{ background: s.farbe }} />
      <div className="min-w-0 flex-1 p-4">
        <p className="text-[12px] font-bold tracking-wide text-muted uppercase">{gross ? 'Zum Zusammenstellen' : s.art === 'grundlagen' ? 'Zuerst lesen' : `Sport · ${s.stunden ?? 6} Stunden`}</p>
        <h3 className="disp mt-0.5 text-[19px] leading-snug text-ink">{s.name}</h3>
        <p className="mt-1 line-clamp-2 text-[14px] leading-snug text-ink-2">{s.untertitel}</p>
        <div className="mt-3">
          <a
            className={'btn btn-sm no-underline ' + (gross ? 'btn-primary' : '')}
            href={`sport/${s.datei}.pdf`}
            target="_blank"
            rel="noopener"
            title={`Öffnet das Heft als PDF in einem neuen Tab${groesse(s.mb)}`}
          >
            <Icon name="file" />
            Heft öffnen
          </a>
        </div>
      </div>
    </li>
  )
}

export default function Module({ aktiv }: { aktiv: boolean }) {
  const [wahl, setWahl] = useState<Wahl>(() => wahlAusHash() ?? 'alle')
  useEffect(() => {
    const lesen = () => {
      const w = wahlAusHash()
      if (w) setWahl(w)
    }
    window.addEventListener('hashchange', lesen)
    return () => window.removeEventListener('hashchange', lesen)
  }, [])
  const faecher = wahl === 'alle' ? FAECHER : FAECHER.filter((f) => f.id === wahl)
  const mitSport = wahl === 'alle' || wahl === 'sport'
  const chips: { id: Wahl; name: string; farbe?: string }[] = [
    { id: 'alle', name: 'Alle' },
    ...FAECHER.map((f) => ({ id: f.id, name: f.name, farbe: f.farbe })),
    { id: 'sport', name: 'Sportstunden', farbe: '#1e8a5a' },
  ]

  return (
    <section hidden={!aktiv} aria-labelledby="module-titel" className="mx-auto max-w-[1180px] px-4 pt-4 pb-24 sm:px-6 sm:pt-5">
      <div className="mb-4">
        <h1 id="module-titel" className="disp text-2xl text-ink">
          Modulhefte
        </h1>
        <p className="max-w-[760px] text-[15px] text-muted">
          Alle {ANZAHL} Module der Voie de préparation als Heft zum Ausdrucken – jedes mit einem zweiten Heft, in dem die Lösungen stehen. Dazu der Sport-Baukasten und die Sportstunden für zehn
          Sportarten.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Fach wählen">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={wahl === c.id}
            onClick={() => setWahl(c.id)}
            className={
              'inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-[14px] font-semibold ' + (wahl === c.id ? 'border-ink bg-ink text-white' : 'border-line bg-surface text-ink')
            }
          >
            {c.farbe ? <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.farbe }} aria-hidden="true" /> : null}
            {c.name}
          </button>
        ))}
      </div>

      {faecher.length > 0 && (
        <div className="mb-5 flex items-start gap-3 rounded-[16px] border border-line bg-surface-2 p-4 text-[14px] text-ink-2">
          <Icon name="info" />
          <p>
            <b>So arbeiten Sie damit:</b> Heft öffnen und ausdrucken (A4, beidseitig). In Deutsch und Französisch steht bei den Lese- und Hörtexten ein QR-Code – mit dem Handy scannen,
            dann wird der Text vorgelesen (braucht Internet). Mathe hat in jeder Lektion zusätzliche Beispiele, Übungspäckchen und Wiederholung. Das Lösungsheft ist dasselbe
            Heft mit eingetragenen Lösungen.
          </p>
        </div>
      )}

      {faecher.map((f) => (
        <div key={f.id} className="mb-7">
          <h2 className="disp mb-1 flex flex-wrap items-baseline gap-x-2 text-[21px] text-ink">
            <span className="inline-block h-3 w-3 rounded-full" style={{ background: f.farbe }} aria-hidden="true" />
            {f.name}
            <span className="text-[14px] font-normal text-muted">
              {f.nameFr !== f.name ? `${f.nameFr} · ` : ''}
              {f.module.length} Module
              {f.sprache === 'fr' ? ' · Heft auf Französisch' : ''}
            </span>
          </h2>
          <ul className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {f.module.map((m) => (
              <ModulKarte key={m.id} m={m} fach={f} />
            ))}
          </ul>
        </div>
      ))}

      {mitSport && (
        <div className="mb-7">
          <h2 className="disp mb-1 flex items-baseline gap-2 text-[21px] text-ink">
            <span className="inline-block h-3 w-3 rounded-full bg-[#1e8a5a]" aria-hidden="true" />
            Sportstunden
            <span className="text-[14px] font-normal text-muted">für die Lehrperson · Baukasten · Grundlagen · {SPORT.filter((s) => s.art === 'sportart').length} Sportarten</span>
          </h2>
          <ul className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {SPORT.map((s) => (
              <SportKarte key={s.datei} s={s} />
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

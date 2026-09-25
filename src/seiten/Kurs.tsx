// ---------------------------------------------------------------------------
// Skills-Kurs: Kursjahre → Module → Einheiten (je ca. 100 Min.). Oben steht
// immer die nächste Einheit der gewählten Gruppe; jede Einheit öffnet sich als
// ganze Seite mit Ablauf, Anleitung, Material und Schülerblättern.
// Deep-Links: #kurs · #kurs=j1-e07 · #kurs=grundlagen
// Der Fortschritt liegt nur in diesem Browser (src/kurs/fortschritt.ts).
// ---------------------------------------------------------------------------
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal, flushSync } from 'react-dom'
import type { Abschnitt, Einheit, Phase, Schritt } from '../kurs/typen'
import { einheitById, einheitenVon, geplanteEinheiten, grundlagen, jahrByNr, jokerVon, kursjahre, modulById, moduleVon } from '../data/kurs'
import { blattById } from '../data/blaetter'
import type { NummeriertesBlatt } from '../blatt/typen'
import { heute, neueGruppe, useKursStand, type Gruppe } from '../kurs/fortschritt'
import { loadPdfModule } from '../lib/loadPdf'
import { toast } from '../lib/toast'
import type { Bewertungen } from '../lib/useBewertungen'
import { BlattDetail } from './Blaetter'
import { Dialog } from '../components/Dialog'
import { Icon } from '../components/Icon'

const PHASE: Record<Phase, { name: string; farbe: string }> = {
  ankommen: { name: 'Ankommen', farbe: '#3E6FB0' },
  bruecke: { name: 'Brücke', farbe: '#7A8396' },
  input: { name: 'Input', farbe: '#2E3A9C' },
  uebung: { name: 'Übung', farbe: '#1F6B6F' },
  pause: { name: 'Pause', farbe: '#B7791F' },
  aktiv: { name: 'Aktiv', farbe: '#2F855A' },
  skill: { name: 'Skill', farbe: '#6E4A7E' },
  abschluss: { name: 'Abschluss', farbe: '#B4533A' },
}
const phase = (p: Phase) => PHASE[p] ?? { name: p, farbe: '#7A8396' }

const MONATE = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.']
function datum(iso: string, mitJahr = true): string {
  const [j, m, t] = iso.split('-').map(Number)
  if (!j || !m || !t) return iso
  return `${t}. ${MONATE[m - 1]}${mitJahr ? ' ' + j : ''}`
}

function blaetterVon(e: Einheit): NummeriertesBlatt[] {
  return (e.blaetter ?? []).map((id) => blattById.get(id)).filter((b): b is NummeriertesBlatt => !!b)
}

function nrAusId(id: string): number {
  return Number(/(\d+)$/.exec(id)?.[1] ?? 0)
}

// --- Ansicht aus dem Hash --------------------------------------------------------------

type Ansicht = { art: 'uebersicht' } | { art: 'einheit'; id: string } | { art: 'grundlagen' }

function ansichtAusHash(hash: string): Ansicht | null {
  const h = hash.replace(/^#\/?/, '')
  if (h === 'kurs') return { art: 'uebersicht' }
  const k = new URLSearchParams(h).get('kurs')
  if (k === null) return null
  if (k === 'grundlagen') return { art: 'grundlagen' }
  if (einheitById.has(k)) return { art: 'einheit', id: k }
  return { art: 'uebersicht' }
}

function gehe(a: Ansicht) {
  const h = a.art === 'einheit' ? 'kurs=' + a.id : a.art === 'grundlagen' ? 'kurs=grundlagen' : 'kurs'
  if (window.location.hash.replace(/^#/, '') !== h) window.location.hash = h
}

// --- Kleine Bausteine -------------------------------------------------------------------

function AblaufLeiste({ e, klein }: { e: Einheit; klein?: boolean }) {
  const gesamt = e.dauer || 100
  return (
    <div className={`ku-leiste ${klein ? 'klein' : ''}`} role="img" aria-label={'Ablauf: ' + e.ablauf.map((z) => `${z.min} Minuten ${z.titel}`).join(', ')}>
      {e.ablauf.map((z, i) => {
        const [a, b] = z.min.split('–').map(Number)
        return <span key={i} style={{ width: `${(((b || 0) - (a || 0)) / gesamt) * 100}%`, background: phase(z.phase).farbe }} title={`${z.min} Min. · ${z.titel}`} />
      })}
    </div>
  )
}

function Fortschritt({ gruppe }: { gruppe: Gruppe }) {
  const liste = einheitenVon(gruppe.jahr)
  const geplant = Math.max(geplanteEinheiten(gruppe.jahr), liste.length)
  const gehalten = liste.filter((e) => gruppe.erledigt[e.id]).length
  return (
    <div className="ku-fortschritt">
      <div className="ku-fortschritt-balken" role="progressbar" aria-valuemin={0} aria-valuemax={geplant} aria-valuenow={gehalten} aria-label="Gehaltene Einheiten">
        <span style={{ width: `${geplant ? (gehalten / geplant) * 100 : 0}%` }} />
      </div>
      <span>
        <b>{gehalten}</b> von {geplant} Einheiten gehalten
      </span>
    </div>
  )
}

// --- Übersicht ------------------------------------------------------------------------

function Naechste({ gruppe, onOeffnen, onGehalten }: { gruppe: Gruppe; onOeffnen: (id: string) => void; onGehalten: (id: string) => void }) {
  const liste = einheitenVon(gruppe.jahr)
  const naechste = liste.find((e) => !gruppe.erledigt[e.id])
  const zuletzt = liste
    .filter((e) => gruppe.erledigt[e.id])
    .sort((a, b) => (gruppe.erledigt[b.id] ?? '').localeCompare(gruppe.erledigt[a.id] ?? ''))[0]
  const [laedt, setLaedt] = useState(false)

  if (!liste.length)
    return (
      <section className="ku-held">
        <p className="ku-held-kicker">Kursjahr {gruppe.jahr}</p>
        <h2 className="disp">Dieses Kursjahr wird gerade ausgearbeitet.</h2>
        <p className="ku-held-kurz">Wähle in den Gruppen-Einstellungen ein anderes Kursjahr.</p>
      </section>
    )

  const geplant = geplanteEinheiten(gruppe.jahr)
  if (!naechste && liste.length < geplant)
    return (
      <section className="ku-held">
        <p className="ku-held-kicker">Kursjahr {gruppe.jahr}</p>
        <h2 className="disp">Die nächste Einheit wird gerade ausgearbeitet.</h2>
        <p className="ku-held-kurz">Alle fertigen Einheiten sind gehalten. Bis es weitergeht, passen die Joker-Einheiten unten.</p>
        <Fortschritt gruppe={gruppe} />
      </section>
    )

  if (!naechste)
    return (
      <section className="ku-held ku-held-fertig">
        <p className="ku-held-kicker">Kursjahr {gruppe.jahr} · geschafft</p>
        <h2 className="disp">Alle Einheiten sind gehalten.</h2>
        <p className="ku-held-kurz">
          {jahrByNr.has(gruppe.jahr + 1)
            ? `Mit dieser Gruppe kann es im nächsten Schuljahr mit Kursjahr ${gruppe.jahr + 1} weitergehen – einstellbar unter „Gruppen“.`
            : 'Die Joker-Einheiten unten passen jederzeit, zum Beispiel vor den Ferien.'}
        </p>
        <Fortschritt gruppe={gruppe} />
      </section>
    )

  const m = modulById.get(naechste.modul)
  const bl = blaetterVon(naechste)
  async function mappe() {
    setLaedt(true)
    try {
      const pdf = await loadPdfModule()
      const name = await pdf.downloadMappe(
        bl.map((b) => ({ blatt: b, nr: b.nr })),
        `Einheit ${naechste!.nr} ${naechste!.titel}`,
        { lehrer: true },
      )
      toast(`Blätter erstellt: ${name}`, 'ok')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Die Blätter konnten nicht erstellt werden.', 'error')
    } finally {
      setLaedt(false)
    }
  }
  return (
    <section className="ku-held" aria-labelledby="ku-naechste-titel">
      <div className="ku-held-kopf">
        <p className="ku-held-kicker">
          <Icon name="arrowRight" /> Als Nächstes · Einheit {naechste.nr}
          {m ? ` · ${m.titel}` : ''}
        </p>
        {zuletzt ? (
          <p className="ku-held-zuletzt">
            Zuletzt: Einheit {zuletzt.nr} am {datum(gruppe.erledigt[zuletzt.id], false)}
          </p>
        ) : null}
      </div>
      <h2 id="ku-naechste-titel" className="disp">
        <button type="button" className="ku-held-link" onClick={() => onOeffnen(naechste.id)}>
          {naechste.titel}
        </button>
      </h2>
      <p className="ku-held-kurz">{naechste.kurz}</p>
      <div className="ku-held-fakten">
        <span>
          <Icon name="clock" /> {naechste.dauer} Min.
        </span>
        <span>
          <Icon name="file" /> {bl.length} {bl.length === 1 ? 'Schülerblatt' : 'Schülerblätter'}
        </span>
        <span>
          <Icon name="check" /> {naechste.material.length} Dinge Material
        </span>
      </div>
      <AblaufLeiste e={naechste} />
      <div className="ku-held-aktionen">
        <button type="button" className="btn btn-primary" onClick={() => onOeffnen(naechste.id)}>
          Einheit vorbereiten
          <Icon name="arrowRight" />
        </button>
        {bl.length ? (
          <button type="button" className="btn" onClick={mappe} disabled={laedt}>
            {laedt ? <span className="spin" /> : <Icon name="download" />}
            Alle Blätter (PDF)
          </button>
        ) : null}
        <button type="button" className="btn btn-quiet" onClick={() => onGehalten(naechste.id)}>
          <Icon name="checkCircle" />
          Heute gehalten
        </button>
      </div>
      <Fortschritt gruppe={gruppe} />
    </section>
  )
}

function Jahresweg({ gruppe, onOeffnen }: { gruppe: Gruppe; onOeffnen: (id: string) => void }) {
  const jahr = jahrByNr.get(gruppe.jahr)
  const module = moduleVon(gruppe.jahr)
  const naechsteId = einheitenVon(gruppe.jahr).find((e) => !gruppe.erledigt[e.id])?.id
  if (!jahr) return null
  return (
    <section className="ku-weg" aria-labelledby="ku-weg-titel">
      <div className="ku-abschnitt-kopf">
        <h2 id="ku-weg-titel" className="disp">
          Der Jahresweg
        </h2>
        <p>{jahr.faden}</p>
      </div>
      <ol className="ku-module">
        {module.map((m) => {
          const fertig = m.einheiten.filter((id) => gruppe.erledigt[id]).length
          const aktuell = naechsteId ? m.einheiten.includes(naechsteId) : false
          return (
            <li key={m.id} className={`ku-modul ${aktuell ? 'aktuell' : ''} ${fertig === m.einheiten.length ? 'fertig' : ''}`}>
              <header>
                <span className="ku-modul-nr" aria-hidden="true">
                  {m.nr}
                </span>
                <div className="min-w-0">
                  <h3>{m.titel}</h3>
                  <p>{m.leitfrage}</p>
                </div>
                <span className="ku-modul-stand">
                  {fertig}/{m.einheiten.length}
                </span>
              </header>
              <ul>
                {m.einheiten.map((id) => {
                  const e = einheitById.get(id)
                  if (!e)
                    return (
                      <li key={id}>
                        <span className="ku-e fehlt">
                          <span className="ku-e-nr">{nrAusId(id)}</span>
                          <span className="ku-e-titel">wird ausgearbeitet</span>
                        </span>
                      </li>
                    )
                  const erl = gruppe.erledigt[id]
                  const ist = id === naechsteId
                  return (
                    <li key={id}>
                      <button type="button" className={`ku-e ${erl ? 'erledigt' : ''} ${ist ? 'naechste' : ''}`} onClick={() => onOeffnen(id)}>
                        <span className="ku-e-nr">{erl ? <Icon name="check" /> : e.nr}</span>
                        <span className="ku-e-titel">{e.titel}</span>
                        <span className="ku-e-status">{erl ? datum(erl, false) : ist ? 'als Nächstes' : ''}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function JokerListe({ gruppe, onOeffnen }: { gruppe: Gruppe; onOeffnen: (id: string) => void }) {
  const joker = jokerVon(gruppe.jahr)
  if (!joker.length) return null
  return (
    <section className="ku-joker" aria-labelledby="ku-joker-titel">
      <div className="ku-abschnitt-kopf">
        <h2 id="ku-joker-titel" className="disp">
          Joker-Einheiten
        </h2>
        <p>Für Filme, Naturtage, besondere Lagen – oder wenn eine Einheit ausfällt. Sie zählen nicht zum Jahresweg.</p>
      </div>
      <ul>
        {joker.map((j) => (
          <li key={j.id}>
            <button type="button" className={`ku-joker-karte ${gruppe.erledigt[j.id] ? 'erledigt' : ''}`} onClick={() => onOeffnen(j.id)}>
              <span className="ku-joker-tag">Joker {j.nr}</span>
              <b>{j.titel}</b>
              {j.passt ? <span className="ku-joker-passt">Passt {j.passt}</span> : null}
              {gruppe.erledigt[j.id] ? (
                <span className="ku-joker-erl">
                  <Icon name="check" /> {datum(gruppe.erledigt[j.id], false)}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

// --- Einheit --------------------------------------------------------------------------

function SchrittKarte({ s, i, onBlatt }: { s: Schritt; i: number; onBlatt: (id: string) => void }) {
  const p = phase(s.phase)
  const blatt = s.blatt ? blattById.get(s.blatt) : undefined
  return (
    <li className="ku-schritt" style={{ ['--pf' as string]: p.farbe }}>
      <header>
        <span className="ku-schritt-nr">{i + 1}</span>
        <div className="min-w-0">
          <span className="ku-schritt-meta">
            {s.dauer} Min. · {p.name}
          </span>
          <h3>{s.titel}</h3>
        </div>
      </header>
      <p className="ku-schritt-text">{s.text}</p>
      {s.punkte?.length ? (
        <ul className="ku-punkte">
          {s.punkte.map((x, k) => (
            <li key={k}>{x}</li>
          ))}
        </ul>
      ) : null}
      {s.tabelle ? (
        <div className="ku-tabelle-rahmen">
          <table className="ku-tabelle">
            <thead>
              <tr>
                {s.tabelle.spalten.map((x, k) => (
                  <th key={k}>{x}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.tabelle.zeilen.map((z, k) => (
                <tr key={k}>
                  {z.map((x, n) => (
                    <td key={n}>{x}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {s.sagen?.length ? (
        <div className="ku-sagen">
          <span className="ku-sagen-titel">
            <Icon name="message" /> So kann es klingen
          </span>
          {s.sagen.map((x, k) => (
            <p key={k}>„{x}“</p>
          ))}
        </div>
      ) : null}
      {s.tipp ? (
        <div className="ku-hinweis ku-tipp">
          <Icon name="lightbulb" />
          <p>
            <b>Aus der Praxis:</b> {s.tipp}
          </p>
        </div>
      ) : null}
      {s.wennEsKippt ? (
        <div className="ku-hinweis ku-kippt">
          <Icon name="alert" />
          <p>
            <b>Wenn es kippt:</b> {s.wennEsKippt}
          </p>
        </div>
      ) : null}
      {blatt ? (
        <button type="button" className="ku-blatt-chip" onClick={() => onBlatt(blatt.id)}>
          <Icon name="file" />
          <span>
            Schülerblatt {blatt.nr} · {blatt.de.titel}
          </span>
        </button>
      ) : null}
    </li>
  )
}

function Notiz({ wert, onSpeichern }: { wert: string; onSpeichern: (t: string) => void }) {
  const [text, setText] = useState(wert)
  const zeit = useRef<number | undefined>(undefined)
  useEffect(() => setText(wert), [wert])
  useEffect(() => () => window.clearTimeout(zeit.current), [])
  function aendern(t: string) {
    setText(t)
    window.clearTimeout(zeit.current)
    zeit.current = window.setTimeout(() => onSpeichern(t), 700)
  }
  return (
    <label className="ku-notiz">
      <span className="ku-seite-label">Meine Notizen zu dieser Einheit</span>
      <textarea
        className="field"
        rows={4}
        value={text}
        onChange={(e) => aendern(e.target.value)}
        onBlur={() => {
          window.clearTimeout(zeit.current)
          if (text !== wert) onSpeichern(text)
        }}
        placeholder="Was lief gut? Was ändere ich beim nächsten Mal?"
      />
      <span className="ku-klein">Nur für dich, nur in diesem Browser. Bitte keine Namen oder persönlichen Angaben von Jugendlichen.</span>
    </label>
  )
}

function EinheitSeite({ e, gruppe, gruppeAendern, bew, aktiv }: { e: Einheit; gruppe: Gruppe; gruppeAendern: (fn: (g: Gruppe) => Gruppe) => void; bew: Bewertungen; aktiv: boolean }) {
  const m = modulById.get(e.modul)
  const jahr = jahrByNr.get(e.jahr)
  const liste = e.joker ? jokerVon(e.jahr) : einheitenVon(e.jahr)
  const pos = liste.findIndex((x) => x.id === e.id)
  const vor = pos > 0 ? liste[pos - 1] : undefined
  const nach = pos >= 0 ? liste[pos + 1] : undefined
  const bl = blaetterVon(e)
  const [offen, setOffen] = useState<NummeriertesBlatt | null>(null)
  const [laedt, setLaedt] = useState<string | null>(null)
  const [druckArt, setDruckArt] = useState<'voll' | 'kurz'>('voll')
  const erl = gruppe.erledigt[e.id]
  const haken = gruppe.material[e.id] ?? []

  function gehalten(an: string | null) {
    gruppeAendern((g) => {
      const erledigt = { ...g.erledigt }
      if (an) erledigt[e.id] = an
      else delete erledigt[e.id]
      return { ...g, erledigt }
    })
  }
  function haken_(i: number) {
    gruppeAendern((g) => {
      const alt = g.material[e.id] ?? []
      const neu = alt.includes(i) ? alt.filter((x) => x !== i) : [...alt, i]
      return { ...g, material: { ...g.material, [e.id]: neu } }
    })
  }
  function drucken(art: 'voll' | 'kurz') {
    // Druckfassung erst umschalten, dann drucken (Strg+P druckt immer die volle Fassung)
    flushSync(() => setDruckArt(art))
    window.print()
    setDruckArt('voll')
  }
  async function mappe(lehrer: boolean) {
    setLaedt(lehrer ? 'lehrer' : 'schueler')
    try {
      const pdf = await loadPdfModule()
      const name = await pdf.downloadMappe(
        bl.map((b) => ({ blatt: b, nr: b.nr })),
        `${e.joker ? 'Joker ' + e.nr : 'Einheit ' + e.nr} ${e.titel}`,
        { lehrer },
      )
      toast(`Blätter erstellt: ${name}`, 'ok')
    } catch (x) {
      toast(x instanceof Error ? x.message : 'Die Blätter konnten nicht erstellt werden.', 'error')
    } finally {
      setLaedt(null)
    }
  }

  const kopfzeile = e.joker ? `Joker ${e.nr}${e.passt ? ' · passt ' + e.passt : ''}` : `${m ? `Modul ${m.nr} · ${m.titel} · ` : ''}Einheit ${e.nr} von ${geplanteEinheiten(e.jahr)}`

  return (
    <article className="ku-einheit" aria-labelledby="ku-einheit-titel">
      <nav className="ku-einheit-nav" aria-label="Einheiten blättern">
        <button type="button" className="link-btn" onClick={() => gehe({ art: 'uebersicht' })}>
          <Icon name="chevronLeft" />
          Jahresweg
        </button>
        <span className="grow" />
        {vor ? (
          <button type="button" className="btn btn-sm" onClick={() => gehe({ art: 'einheit', id: vor.id })} title={vor.titel}>
            <Icon name="chevronLeft" />
            {e.joker ? `Joker ${vor.nr}` : `Einheit ${vor.nr}`}
          </button>
        ) : null}
        {nach ? (
          <button type="button" className="btn btn-sm" onClick={() => gehe({ art: 'einheit', id: nach.id })} title={nach.titel}>
            {e.joker ? `Joker ${nach.nr}` : `Einheit ${nach.nr}`}
            <Icon name="chevronRight" />
          </button>
        ) : null}
      </nav>

      <header className="ku-einheit-kopf">
        <p className="ku-held-kicker">{kopfzeile}</p>
        <h1 id="ku-einheit-titel" className="disp">
          {e.titel}
        </h1>
        <p className="ku-einheit-kurz">{e.kurz}</p>
        <div className="ku-einheit-aktionen">
          {erl ? (
            <span className="ku-gehalten">
              <Icon name="checkCircle" />
              Gehalten am
              <input type="date" className="field" value={erl} max={heute()} onChange={(x) => x.target.value && gehalten(x.target.value)} aria-label="Datum, an dem die Einheit gehalten wurde" />
              <button type="button" className="link-btn" onClick={() => gehalten(null)}>
                Zurücknehmen
              </button>
            </span>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => gehalten(heute())}>
              <Icon name="checkCircle" />
              Heute gehalten
            </button>
          )}
          <button type="button" className="btn" onClick={() => drucken('voll')}>
            <Icon name="printer" />
            Einheit drucken
          </button>
          <button type="button" className="btn" onClick={() => drucken('kurz')} title="Eine Seite für die Hand: Ablauf, Impulse, Material">
            <Icon name="file" />
            Spickzettel
          </button>
          {bl.length ? (
            <>
              <button type="button" className="btn" onClick={() => mappe(false)} disabled={!!laedt}>
                {laedt === 'schueler' ? <span className="spin" /> : <Icon name="download" />}
                Schülerblätter (PDF)
              </button>
              <button type="button" className="btn btn-quiet" onClick={() => mappe(true)} disabled={!!laedt}>
                {laedt === 'lehrer' ? <span className="spin" /> : <Icon name="book" />}
                Mit Lehrerseiten
              </button>
            </>
          ) : null}
        </div>
      </header>

      <section className="ku-ablauf" aria-label="Ablauf">
        <AblaufLeiste e={e} />
        <ol className="ku-ablauf-liste">
          {e.ablauf.map((z, i) => (
            <li key={i}>
              <span className="ku-ablauf-min">{z.min}</span>
              <span className="ku-ablauf-phase" style={{ color: phase(z.phase).farbe }}>
                <i style={{ background: phase(z.phase).farbe }} />
                {phase(z.phase).name}
              </span>
              <span className="ku-ablauf-titel">{z.titel}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="ku-einheit-raster">
        <div className="min-w-0">
          <h2 className="ku-zwischen disp">Schritt für Schritt</h2>
          <ol className="ku-schritte">
            {e.schritte.map((s, i) => (
              <SchrittKarte key={i} s={s} i={i} onBlatt={(id) => setOffen(blattById.get(id) ?? null)} />
            ))}
          </ol>
          {e.bruecke ? (
            <div className="ku-bruecke">
              <span className="ku-seite-label">Ausblick zum Schluss</span>
              <p>„{e.bruecke}“</p>
            </div>
          ) : null}
          {e.hintergrund ? (
            <details className="ku-hintergrund">
              <summary>Fachlicher Hintergrund{e.quellen?.length ? ' und Quellen' : ''}</summary>
              <p>{e.hintergrund}</p>
              {e.quellen?.length ? (
                <ul>
                  {e.quellen.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              ) : null}
            </details>
          ) : null}
          <Notiz
            wert={gruppe.notizen[e.id] ?? ''}
            onSpeichern={(t) =>
              gruppeAendern((g) => {
                const notizen = { ...g.notizen }
                if (t.trim()) notizen[e.id] = t
                else delete notizen[e.id]
                return { ...g, notizen }
              })
            }
          />
        </div>

        <aside className="ku-seite" aria-label="Auf einen Blick">
          <section>
            <span className="ku-seite-label">Ziele</span>
            <ul className="ku-ziele">
              {e.ziele.map((z, i) => (
                <li key={i}>{z.charAt(0).toUpperCase() + z.slice(1)}</li>
              ))}
            </ul>
          </section>
          <section>
            <span className="ku-seite-label">
              Material · {haken.length}/{e.material.length}
            </span>
            <ul className="ku-material">
              {e.material.map((x, i) => (
                <li key={i}>
                  <label>
                    <input type="checkbox" checked={haken.includes(i)} onChange={() => haken_(i)} />
                    <span>{x}</span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
          {e.vorbereitung?.length ? (
            <section>
              <span className="ku-seite-label">Vorbereitung</span>
              <ul className="ku-liste">
                {e.vorbereitung.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {bl.length ? (
            <section>
              <span className="ku-seite-label">Schülerblätter</span>
              <ul className="ku-blaetter">
                {bl.map((b) => (
                  <li key={b.id}>
                    <button type="button" onClick={() => setOffen(b)}>
                      <span className="ku-blatt-nr">{b.nr}</span>
                      <span className="min-w-0 grow">
                        <b>{b.de.titel}</b>
                        <span>{b.dauer}</span>
                      </span>
                      <Icon name="arrowRight" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {e.achtung ? (
            <section className="ku-achtung">
              <span className="ku-seite-label">
                <Icon name="alert" /> Achtung
              </span>
              <p>{e.achtung}</p>
            </section>
          ) : null}
        </aside>
      </div>

      {offen && <BlattDetail key={offen.id} b={offen} bew={bew} onSchliessen={() => setOffen(null)} onOeffnen={(id) => setOffen(blattById.get(id) ?? null)} />}
      {aktiv
        ? createPortal(
            druckArt === 'kurz' ? <Spickzettel e={e} kopfzeile={kopfzeile} /> : <DruckEinheit e={e} kopfzeile={kopfzeile} jahrTitel={jahr?.titel ?? ''} notiz={gruppe.notizen[e.id]} />,
            document.body,
          )
        : null}
    </article>
  )
}

/** Eine Seite für die Hand während der Einheit: Minuten, Schritte, erster Impuls, Material. */
function Spickzettel({ e, kopfzeile }: { e: Einheit; kopfzeile: string }) {
  let t = 0
  return (
    <div className="ku-druck ku-spick">
      <p className="ku-druck-kopf">CDSE Skills-Kurs · Spickzettel · {kopfzeile}</p>
      <h1>{e.titel}</h1>
      <table className="ku-spick-tab">
        <thead>
          <tr>
            <th>Min.</th>
            <th>Schritt</th>
            <th>So kann es klingen</th>
          </tr>
        </thead>
        <tbody>
          {e.schritte.map((s, i) => {
            const von = t
            t += s.dauer
            const blatt = s.blatt ? blattById.get(s.blatt) : undefined
            return (
              <tr key={i}>
                <td>
                  {von}–{t}
                </td>
                <td>
                  <b>{s.titel}</b>
                  <span>
                    {phase(s.phase).name}
                    {blatt ? ` · Blatt ${blatt.nr}` : ''}
                  </span>
                </td>
                <td>{s.sagen?.[0] ? `„${s.sagen[0]}“` : s.punkte?.length ? <span className="ku-spick-punkte">{s.punkte.slice(0, 5).join(' · ')}</span> : ''}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="ku-druck-spalten">
        <div>
          <h2>Material</h2>
          <ul className="ku-druck-haken">
            {e.material.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          {e.achtung ? (
            <>
              <h2>Achtung</h2>
              <p className="ku-druck-klein">{e.achtung}</p>
            </>
          ) : null}
          {e.bruecke ? (
            <>
              <h2>Ausblick</h2>
              <p className="ku-druck-klein">„{e.bruecke}“</p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/** Nur im Druck sichtbar (Strg+P oder „Einheit drucken“). */
function DruckEinheit({ e, kopfzeile, jahrTitel, notiz }: { e: Einheit; kopfzeile: string; jahrTitel: string; notiz?: string }) {
  const bl = blaetterVon(e)
  return (
    <div className="ku-druck">
      <p className="ku-druck-kopf">
        CDSE Skills-Kurs · {jahrTitel} · {kopfzeile}
      </p>
      <h1>{e.titel}</h1>
      <p className="ku-druck-kurz">{e.kurz}</p>
      <div className="ku-druck-spalten">
        <div>
          <h2>Ziele</h2>
          <ul>
            {e.ziele.map((z, i) => (
              <li key={i}>{z.charAt(0).toUpperCase() + z.slice(1)}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Material</h2>
          <ul className="ku-druck-haken">
            {e.material.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
          {e.vorbereitung?.length ? (
            <>
              <h2>Vorbereitung</h2>
              <ul>
                {e.vorbereitung.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
      <h2>Ablauf ({e.dauer} Min.)</h2>
      <table className="ku-druck-ablauf">
        <tbody>
          {e.ablauf.map((z, i) => (
            <tr key={i}>
              <td>{z.min}</td>
              <td>{phase(z.phase).name}</td>
              <td>{z.titel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {e.achtung ? (
        <div className="ku-druck-achtung">
          <b>Achtung:</b> {e.achtung}
        </div>
      ) : null}
      <h2>Schritt für Schritt</h2>
      {e.schritte.map((s, i) => {
        const blatt = s.blatt ? blattById.get(s.blatt) : undefined
        return (
          <section key={i} className="ku-druck-schritt">
            <h3>
              {i + 1}. {s.titel} <span>· {s.dauer} Min. · {phase(s.phase).name}</span>
            </h3>
            <p>{s.text}</p>
            {s.punkte?.length ? (
              <ul>
                {s.punkte.map((x, k) => (
                  <li key={k}>{x}</li>
                ))}
              </ul>
            ) : null}
            {s.tabelle ? (
              <table className="ku-druck-tab">
                <thead>
                  <tr>
                    {s.tabelle.spalten.map((x, k) => (
                      <th key={k}>{x}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.tabelle.zeilen.map((z, k) => (
                    <tr key={k}>
                      {z.map((x, n) => (
                        <td key={n}>{x}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
            {s.sagen?.length ? (
              <div className="ku-druck-sagen">
                {s.sagen.map((x, k) => (
                  <p key={k}>„{x}“</p>
                ))}
              </div>
            ) : null}
            {s.tipp ? (
              <p className="ku-druck-klein">
                <b>Aus der Praxis:</b> {s.tipp}
              </p>
            ) : null}
            {s.wennEsKippt ? (
              <p className="ku-druck-klein">
                <b>Wenn es kippt:</b> {s.wennEsKippt}
              </p>
            ) : null}
            {blatt ? (
              <p className="ku-druck-klein">
                <b>Schülerblatt:</b> {blatt.nr} {blatt.de.titel}
              </p>
            ) : null}
          </section>
        )
      })}
      {e.bruecke ? (
        <p className="ku-druck-bruecke">
          <b>Ausblick:</b> „{e.bruecke}“
        </p>
      ) : null}
      {bl.length ? (
        <p className="ku-druck-klein">
          <b>Schülerblätter:</b> {bl.map((b) => `${b.nr} ${b.de.titel}`).join(' · ')}
        </p>
      ) : null}
      {e.hintergrund ? (
        <>
          <h2>Fachlicher Hintergrund</h2>
          <p className="ku-druck-klein">{e.hintergrund}</p>
          {e.quellen?.length ? (
            <ul className="ku-druck-quellen">
              {e.quellen.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}
      {notiz ? (
        <>
          <h2>Meine Notizen</h2>
          <p className="ku-druck-klein">{notiz}</p>
        </>
      ) : null}
    </div>
  )
}

// --- Grundlagen -----------------------------------------------------------------------

function AbschnittInhalt({ a }: { a: Abschnitt }) {
  return (
    <section className="ku-gl-abschnitt">
      <h3>{a.titel}</h3>
      {a.text ? a.text.split('\n\n').map((t, i) => <p key={i}>{t}</p>) : null}
      {a.punkte?.length ? (
        <ul className="ku-liste">
          {a.punkte.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      ) : null}
      {a.tabelle ? (
        <div className="ku-tabelle-rahmen">
          <table className="ku-tabelle">
            <thead>
              <tr>
                {a.tabelle.spalten.map((x, i) => (
                  <th key={i}>{x}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {a.tabelle.zeilen.map((z, i) => (
                <tr key={i}>
                  {z.map((x, k) => (
                    <td key={k}>{x}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

function GrundlagenSeite({ aktiv }: { aktiv: boolean }) {
  const [id, setId] = useState(grundlagen[0]?.id ?? '')
  const g = grundlagen.find((x) => x.id === id) ?? grundlagen[0]
  return (
    <article className="ku-einheit" aria-labelledby="ku-gl-titel">
      <nav className="ku-einheit-nav">
        <button type="button" className="link-btn" onClick={() => gehe({ art: 'uebersicht' })}>
          <Icon name="chevronLeft" />
          Jahresweg
        </button>
        <span className="grow" />
        {grundlagen.length ? (
          <button type="button" className="btn btn-sm" onClick={() => window.print()}>
            <Icon name="printer" />
            Drucken
          </button>
        ) : null}
      </nav>
      <header className="ku-einheit-kopf">
        <p className="ku-held-kicker">Skills-Kurs · Für die Leitung</p>
        <h1 id="ku-gl-titel" className="disp">
          Grundlagen und Methoden
        </h1>
        <p className="ku-einheit-kurz">Was für alle Einheiten gilt: Aufbau, Rituale, Rahmen und Sicherheit, Material und ein Pool an Übungen für jede Lage.</p>
      </header>
      {!g ? (
        <p className="ku-klein">Die Grundlagen werden gerade ausgearbeitet.</p>
      ) : (
        <>
          <div className="seg ku-gl-reiter" role="tablist" aria-label="Teile">
            {grundlagen.map((x) => (
              <button key={x.id} type="button" role="tab" aria-selected={x.id === g.id} onClick={() => setId(x.id)}>
                {x.titel}
              </button>
            ))}
          </div>
          <div className="ku-gl-inhalt">
            {g.abschnitte.map((a, i) => (
              <AbschnittInhalt key={i} a={a} />
            ))}
          </div>
          {aktiv
            ? createPortal(
                <div className="ku-druck">
                  <p className="ku-druck-kopf">CDSE Skills-Kurs · Grundlagen und Methoden</p>
                  {grundlagen.map((x) => (
                    <section key={x.id}>
                      <h1>{x.titel}</h1>
                      {x.abschnitte.map((a, i) => (
                        <AbschnittInhalt key={i} a={a} />
                      ))}
                    </section>
                  ))}
                </div>,
                document.body,
              )
            : null}
        </>
      )}
    </article>
  )
}

// --- Gruppen --------------------------------------------------------------------------

function GruppenDialog({ onClose, stand, aendern }: { onClose: () => void; stand: ReturnType<typeof useKursStand>['stand']; aendern: ReturnType<typeof useKursStand>['aendern'] }) {
  const [neu, setNeu] = useState('')
  const [loeschen, setLoeschen] = useState<string | null>(null)
  function anlegen() {
    const g = neueGruppe(neu || `Gruppe ${stand.gruppen.length + 1}`, kursjahre[0]?.nr ?? 1)
    aendern((s) => ({ ...s, gruppen: [...s.gruppen, g], aktiv: g.id }))
    setNeu('')
  }
  return (
    <Dialog onClose={onClose} labelledBy="ku-gruppen-titel" className="dlg-mid">
      <header className="dlg-head items-center">
        <h2 id="ku-gruppen-titel" className="disp flex-1 text-[19px]">
          Meine Kursgruppen
        </h2>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Schließen">
          <Icon name="x" />
        </button>
      </header>
      <div className="dlg-body scroll-slim ku-gruppen" data-autofocus tabIndex={-1} style={{ outline: 'none' }}>
        <p className="ku-klein">
          Jede Gruppe hat ihren eigenen Stand: welche Einheiten gehalten sind, abgehaktes Material und Notizen. Gespeichert wird nur in diesem Browser. Bitte Gruppen nach Tag und Uhrzeit benennen, nicht nach Jugendlichen.
        </p>
        <ul>
          {stand.gruppen.map((g) => {
            const n = einheitenVon(g.jahr).filter((e) => g.erledigt[e.id]).length
            return (
              <li key={g.id} className={g.id === stand.aktiv ? 'aktiv' : ''}>
                <input
                  className="field"
                  defaultValue={g.name}
                  aria-label="Name der Gruppe"
                  onBlur={(x) => {
                    const name = x.target.value.trim()
                    if (name && name !== g.name) aendern((s) => ({ ...s, gruppen: s.gruppen.map((y) => (y.id === g.id ? { ...y, name } : y)) }))
                  }}
                />
                {kursjahre.length > 1 ? (
                  <select className="field w-auto" value={g.jahr} aria-label="Kursjahr" onChange={(x) => aendern((s) => ({ ...s, gruppen: s.gruppen.map((y) => (y.id === g.id ? { ...y, jahr: Number(x.target.value) } : y)) }))}>
                    {kursjahre.map((j) => (
                      <option key={j.nr} value={j.nr}>
                        Kursjahr {j.nr}
                      </option>
                    ))}
                  </select>
                ) : null}
                <span className="ku-klein whitespace-nowrap">{n} gehalten</span>
                {stand.gruppen.length > 1 ? (
                  loeschen === g.id ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        aendern((s) => {
                          const gruppen = s.gruppen.filter((y) => y.id !== g.id)
                          return { ...s, gruppen, aktiv: s.aktiv === g.id ? (gruppen[0]?.id ?? null) : s.aktiv }
                        })
                        setLoeschen(null)
                      }}
                    >
                      Wirklich löschen
                    </button>
                  ) : (
                    <button type="button" className="icon-btn" onClick={() => setLoeschen(g.id)} aria-label={`Gruppe ${g.name} löschen`} title="Gruppe löschen">
                      <Icon name="trash" />
                    </button>
                  )
                ) : null}
              </li>
            )
          })}
        </ul>
        <form
          className="ku-gruppe-neu"
          onSubmit={(x) => {
            x.preventDefault()
            anlegen()
          }}
        >
          <input className="field" value={neu} onChange={(x) => setNeu(x.target.value)} placeholder="z. B. Dienstag 14 Uhr" aria-label="Name der neuen Gruppe" />
          <button type="submit" className="btn">
            <Icon name="plus" />
            Neue Gruppe
          </button>
        </form>
      </div>
    </Dialog>
  )
}

// --- Seite ----------------------------------------------------------------------------

export function Kurs({ aktiv, bew }: { aktiv: boolean; bew: Bewertungen }) {
  const { stand, gruppe, aendern, gruppeAendern, gespeichert } = useKursStand()
  const [ansicht, setAnsicht] = useState<Ansicht>(() => ansichtAusHash(window.location.hash) ?? { art: 'uebersicht' })
  const [gruppenOffen, setGruppenOffen] = useState(false)

  useEffect(() => {
    function onHash() {
      const a = ansichtAusHash(window.location.hash)
      if (a) {
        setAnsicht(a)
        window.scrollTo({ top: 0 })
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const einheit = ansicht.art === 'einheit' ? einheitById.get(ansicht.id) : undefined
  const jahr = gruppe ? jahrByNr.get(gruppe.jahr) : undefined
  const oeffnen = (id: string) => gehe({ art: 'einheit', id })
  const heuteGehalten = (id: string) => {
    gruppeAendern((g) => ({ ...g, erledigt: { ...g.erledigt, [id]: heute() } }))
    const e = einheitById.get(id)
    toast(`Einheit ${e?.nr ?? ''} ist als gehalten eingetragen.`, 'ok')
  }

  const gruppenWahl = useMemo(
    () =>
      gruppe ? (
        <div className="ku-gruppenwahl">
          <label>
            <span className="sr-only">Gruppe wählen</span>
            <select className="field w-auto py-1.5 pr-8" value={gruppe.id} onChange={(x) => aendern((s) => ({ ...s, aktiv: x.target.value }))}>
              {stand.gruppen.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="btn" onClick={() => setGruppenOffen(true)}>
            <Icon name="settings" />
            Gruppen
          </button>
        </div>
      ) : null,
    [gruppe, stand.gruppen, aendern],
  )

  let inhalt: ReactNode
  if (!gruppe) inhalt = null
  else if (ansicht.art === 'grundlagen') inhalt = <GrundlagenSeite aktiv={aktiv} />
  else if (einheit) inhalt = <EinheitSeite key={einheit.id} e={einheit} gruppe={gruppe} gruppeAendern={gruppeAendern} bew={bew} aktiv={aktiv} />
  else
    inhalt = (
      <>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
          <div className="min-w-0">
            <h1 className="disp text-[26px] leading-tight text-ink sm:text-[30px]">Skills-Kurs</h1>
            <p className="mt-1 text-[14px] text-muted">
              {jahr ? `${jahr.titel} · ${jahr.untertitel}` : 'Kursjahr wählen'} · für Kleingruppen von 12 bis 16 Jahren
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {gruppenWahl}
            <button type="button" className="btn" onClick={() => gehe({ art: 'grundlagen' })}>
              <Icon name="book" />
              Grundlagen und Methoden
            </button>
          </div>
        </div>
        <Naechste gruppe={gruppe} onOeffnen={oeffnen} onGehalten={heuteGehalten} />
        <Jahresweg gruppe={gruppe} onOeffnen={oeffnen} />
        <JokerListe gruppe={gruppe} onOeffnen={oeffnen} />
      </>
    )

  return (
    <div className={aktiv ? '' : 'hidden'}>
      <div className="mx-auto max-w-[1180px] px-4 pt-6 pb-16 sm:px-6">
        {!gespeichert ? (
          <div className="callout mb-4">
            <Icon name="alert" />
            <span>Der Stand kann in diesem Browser nicht gespeichert werden (Speicher gesperrt oder voll). Änderungen gehen beim Schließen verloren.</span>
          </div>
        ) : null}
        {inhalt}
      </div>
      {gruppenOffen && <GruppenDialog onClose={() => setGruppenOffen(false)} stand={stand} aendern={aendern} />}
    </div>
  )
}

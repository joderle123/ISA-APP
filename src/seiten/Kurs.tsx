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

/** Titel eines Kursjahres ohne „Kursjahr N · “ davor. */
function jahrKurztitel(t: string): string {
  return t.replace(/^Kursjahr\s*\d+\s*[·:–-]\s*/, '')
}

/** Von–bis-Minuten jedes Schritts, lückenlos aus den Dauern (wie im Spickzettel). */
function schrittZeiten(e: Einheit): { von: number; bis: number }[] {
  let t = 0
  return e.schritte.map((s) => {
    const von = t
    t += s.dauer
    return { von, bis: t }
  })
}

function blaetterText(n: number): string {
  return n === 1 ? '1 Blatt' : `${n} Blätter`
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

/** Was die Farben der Ablauf-Leiste bedeuten (nur die Phasen dieser Einheit). */
function PhasenLegende({ e }: { e: Einheit }) {
  const gesehen: Phase[] = []
  e.ablauf.forEach((z) => {
    if (!gesehen.includes(z.phase)) gesehen.push(z.phase)
  })
  return (
    <ul className="ku-legende" aria-hidden="true">
      {gesehen.map((p) => (
        <li key={p}>
          <i style={{ background: phase(p).farbe }} />
          {phase(p).name}
        </li>
      ))}
    </ul>
  )
}

/** Reiter für die Kursjahre: jedes Jahr lässt sich ansehen, die Gruppe bleibt in ihrem Jahr. */
function JahrWahl({ sicht, gruppeJahr, onWahl }: { sicht: number; gruppeJahr: number; onWahl: (n: number) => void }) {
  if (kursjahre.length < 2) return null
  return (
    <div className="ku-jahre" role="tablist" aria-label="Kursjahr">
      {kursjahre.map((j) => (
        <button key={j.nr} type="button" role="tab" aria-selected={j.nr === sicht} className={`ku-jahr ${j.nr === sicht ? 'an' : ''}`} onClick={() => onWahl(j.nr)}>
          <span className="ku-jahr-nr">
            Kursjahr {j.nr}
            {j.nr === gruppeJahr ? <span className="ku-jahr-gruppe">eure Gruppe</span> : null}
          </span>
          <span className="ku-jahr-titel">{jahrKurztitel(j.titel)}</span>
          <span className="ku-jahr-info">
            {geplanteEinheiten(j.nr)} Einheiten · {moduleVon(j.nr).length} Module
          </span>
        </button>
      ))}
    </div>
  )
}

/** Hinweis, wenn ein anderes Kursjahr angezeigt wird als das der Gruppe. */
function SichtInfo({ gruppe, jahrNr, onUmstellen }: { gruppe: Gruppe; jahrNr: number; onUmstellen: (n: number) => void }) {
  const j = jahrByNr.get(jahrNr)
  return (
    <section className="ku-sichtinfo" role="status">
      <Icon name="info" />
      <div className="min-w-0 grow">
        <p>
          <b>{gruppe.name}</b> ist in Kursjahr {gruppe.jahr}. Hier seht ihr Kursjahr {jahrNr}
          {j ? ` – ${jahrKurztitel(j.titel)}` : ''} zum Ansehen und Vorbereiten.
        </p>
      </div>
      <button type="button" className="btn btn-sm" onClick={() => onUmstellen(jahrNr)}>
        Gruppe auf Kursjahr {jahrNr} umstellen
      </button>
    </section>
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
      <div className="ku-leiste-rahmen">
        <AblaufLeiste e={naechste} />
        <PhasenLegende e={naechste} />
      </div>
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

/** Der Jahresweg als Treppe: je Modul eine Stufe (Leitfrage, Stand), daneben die Einheiten als Kacheln. */
function Jahresweg({ jahrNr, gruppe, onOeffnen }: { jahrNr: number; gruppe: Gruppe; onOeffnen: (id: string) => void }) {
  const jahr = jahrByNr.get(jahrNr)
  const module = moduleVon(jahrNr)
  const naechsteId = jahrNr === gruppe.jahr ? einheitenVon(jahrNr).find((e) => !gruppe.erledigt[e.id])?.id : undefined
  if (!jahr) return null
  return (
    <section className="ku-weg" aria-labelledby="ku-weg-titel">
      <div className="ku-abschnitt-kopf">
        <h2 id="ku-weg-titel" className="disp">
          Der Jahresweg
        </h2>
        <p>{jahr.faden}</p>
      </div>
      <ol className="ku-treppe">
        {module.map((m) => {
          const fertig = m.einheiten.filter((id) => gruppe.erledigt[id]).length
          const ganz = m.einheiten.length > 0 && fertig === m.einheiten.length
          const aktuell = naechsteId ? m.einheiten.includes(naechsteId) : false
          return (
            <li key={m.id} className={`ku-stufe ${aktuell ? 'aktuell' : ''} ${ganz ? 'fertig' : ''}`}>
              <div className="ku-stufe-kopf">
                <span className="ku-modul-nr" aria-hidden="true">
                  {ganz ? <Icon name="check" /> : m.nr}
                </span>
                <div className="min-w-0">
                  <p className="ku-stufe-kicker">
                    Modul {m.nr}
                    {aktuell ? <span className="ku-stufe-jetzt">jetzt dran</span> : null}
                  </p>
                  <h3>{m.titel}</h3>
                  <p className="ku-stufe-frage">{m.leitfrage}</p>
                  <div className="ku-stufe-stand">
                    <span className="ku-mini-balken" aria-hidden="true">
                      <span style={{ width: `${m.einheiten.length ? (fertig / m.einheiten.length) * 100 : 0}%` }} />
                    </span>
                    {fertig} von {m.einheiten.length} gehalten
                  </div>
                </div>
              </div>
              <ul className="ku-kacheln">
                {m.einheiten.map((id) => {
                  const e = einheitById.get(id)
                  if (!e)
                    return (
                      <li key={id}>
                        <span className="ku-kachel fehlt">
                          <span className="ku-kachel-nr">{nrAusId(id)}</span>
                          <span className="ku-kachel-text">
                            <span className="ku-kachel-titel">wird ausgearbeitet</span>
                          </span>
                        </span>
                      </li>
                    )
                  const erl = gruppe.erledigt[id]
                  const ist = id === naechsteId
                  const nb = (e.blaetter ?? []).length
                  return (
                    <li key={id}>
                      <button type="button" className={`ku-kachel ${erl ? 'erledigt' : ''} ${ist ? 'naechste' : ''}`} onClick={() => onOeffnen(id)}>
                        <span className="ku-kachel-nr">{erl ? <Icon name="check" /> : e.nr}</span>
                        <span className="ku-kachel-text">
                          <span className="ku-kachel-titel">{e.titel}</span>
                          <span className="ku-kachel-status">{erl ? `gehalten am ${datum(erl, false)}` : ist ? 'als Nächstes' : `${e.dauer} Min.${nb ? ' · ' + blaetterText(nb) : ''}`}</span>
                        </span>
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

function JokerListe({ jahrNr, gruppe, onOeffnen }: { jahrNr: number; gruppe: Gruppe; onOeffnen: (id: string) => void }) {
  const joker = jokerVon(jahrNr)
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

function SchrittKarte({ s, i, zeit, onBlatt }: { s: Schritt; i: number; zeit: { von: number; bis: number }; onBlatt: (id: string) => void }) {
  const p = phase(s.phase)
  const blatt = s.blatt ? blattById.get(s.blatt) : undefined
  return (
    <li id={'ku-s-' + i} data-i={i} className="ku-schritt" style={{ ['--pf' as string]: p.farbe }}>
      <header>
        <span className="ku-schritt-zeit" aria-label={`Minute ${zeit.von} bis ${zeit.bis}`}>
          <b>
            {zeit.von}–{zeit.bis}
          </b>
          <small>Min.</small>
        </span>
        <div className="min-w-0">
          <span className="ku-schritt-meta">
            <i aria-hidden="true" />
            {p.name} · {s.dauer} Min.
          </span>
          <h3>
            <span className="ku-schritt-nr-text">{i + 1}.</span> {s.titel}
          </h3>
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
      {s.tipp || s.wennEsKippt ? (
        <div className="ku-hinweise">
          {s.tipp ? (
            <div className="ku-hinweis ku-tipp">
              <Icon name="lightbulb" />
              <p>
                <b>Aus der Praxis</b>
                {s.tipp}
              </p>
            </div>
          ) : null}
          {s.wennEsKippt ? (
            <div className="ku-hinweis ku-kippt">
              <Icon name="alert" />
              <p>
                <b>Wenn es kippt</b>
                {s.wennEsKippt}
              </p>
            </div>
          ) : null}
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
  const zeiten = useMemo(() => schrittZeiten(e), [e])

  /* Fahrplan: markiert ist der Schritt, der gerade oben im Bild beginnt; ein Klick springt hin */
  const [aktivSchritt, setAktivSchritt] = useState(0)
  const fahrplan = useRef<HTMLElement>(null)
  const sperre = useRef(0)
  useEffect(() => {
    if (!aktiv) return
    let rahmen = 0
    let spaeter = 0
    function pruefen() {
      rahmen = 0
      if (Date.now() < sperre.current) return
      const kopf = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--kopf-h'), 10) || 61
      const linie = kopf + (window.innerWidth <= 960 ? 90 : 70)
      let i = 0
      document.querySelectorAll<HTMLElement>('.ku-schritt[data-i]').forEach((el, k) => {
        if (el.getBoundingClientRect().top <= linie) i = k
      })
      setAktivSchritt(i)
    }
    function beimScrollen() {
      if (!rahmen) rahmen = requestAnimationFrame(pruefen)
      window.clearTimeout(spaeter)
      spaeter = window.setTimeout(pruefen, 950)
    }
    window.addEventListener('scroll', beimScrollen, { passive: true })
    window.addEventListener('resize', beimScrollen)
    pruefen()
    return () => {
      window.removeEventListener('scroll', beimScrollen)
      window.removeEventListener('resize', beimScrollen)
      if (rahmen) cancelAnimationFrame(rahmen)
      window.clearTimeout(spaeter)
    }
  }, [e.id, aktiv])
  useEffect(() => {
    const nav = fahrplan.current
    const b = nav?.querySelector<HTMLElement>('button.an')
    if (!nav || !b) return
    if (nav.scrollWidth > nav.clientWidth + 2) nav.scrollTo({ left: Math.max(0, b.offsetLeft - 16), behavior: 'smooth' })
    else if (nav.scrollHeight > nav.clientHeight + 2) nav.scrollTo({ top: Math.max(0, b.offsetTop - nav.clientHeight / 3), behavior: 'smooth' })
  }, [aktivSchritt])
  function zuSchritt(i: number) {
    setAktivSchritt(i)
    sperre.current = Date.now() + 900   /* während des sanften Scrollens nicht umspringen */
    document.getElementById('ku-s-' + i)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
        <div className="ku-held-fakten">
          <span>
            <Icon name="clock" /> {e.dauer} Min.
          </span>
          <span>
            <Icon name="file" /> {bl.length === 1 ? '1 Schülerblatt' : `${bl.length} Schülerblätter`}
          </span>
          <span>
            <Icon name="check" /> {e.material.length} Dinge Material
          </span>
          {e.joker && e.passt ? (
            <span>
              <Icon name="info" /> Passt {e.passt}
            </span>
          ) : null}
        </div>
        <div className="ku-leiste-rahmen">
          <AblaufLeiste e={e} />
          <PhasenLegende e={e} />
        </div>
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

      {e.achtung ? (
        <details className="ku-achtung-band" open>
          <summary>
            <Icon name="alert" />
            <b>Achtung</b>
            <span>– darauf achtet die Leitung in dieser Einheit</span>
          </summary>
          <p>{e.achtung}</p>
        </details>
      ) : null}

      <section className="ku-vorb" aria-labelledby="ku-vorb-titel">
        <h2 id="ku-vorb-titel" className="ku-zwischen disp">
          Vorbereiten
        </h2>
        <div className="ku-vorb-raster">
          <div className="ku-vorb-karte">
            <span className="ku-seite-label">Ziele</span>
            <ul className="ku-ziele">
              {e.ziele.map((z, i) => (
                <li key={i}>{z.charAt(0).toUpperCase() + z.slice(1)}</li>
              ))}
            </ul>
          </div>
          <div className="ku-vorb-karte">
            <span className="ku-seite-label">
              Material · {haken.length}/{e.material.length} bereit
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
          </div>
          {e.vorbereitung?.length || bl.length ? (
            <div className="ku-vorb-karte">
              {e.vorbereitung?.length ? (
                <>
                  <span className="ku-seite-label">Vorher erledigen</span>
                  <ul className="ku-liste">
                    {e.vorbereitung.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {bl.length ? (
                <>
                  <span className="ku-seite-label ku-seite-label-abstand">Schülerblätter</span>
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
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section className="ku-durchfuehren" aria-labelledby="ku-ablauf-titel">
        <h2 id="ku-ablauf-titel" className="ku-zwischen disp">
          Schritt für Schritt
        </h2>
        <div className="ku-durchfuehren-raster">
          <nav className="ku-fahrplan" ref={fahrplan} aria-label="Ablauf der Einheit">
            <span className="ku-seite-label">
              <Icon name="clock" /> Ablauf · {e.dauer} Min.
            </span>
            <ol>
              {e.schritte.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={i === aktivSchritt ? 'an' : ''}
                    aria-current={i === aktivSchritt ? 'step' : undefined}
                    onClick={() => zuSchritt(i)}
                    style={{ ['--pf' as string]: phase(s.phase).farbe }}
                  >
                    <span className="ku-fp-zeit">
                      {zeiten[i].von}–{zeiten[i].bis}
                    </span>
                    <span className="ku-fp-titel">{s.titel}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          <div className="min-w-0">
            <ol className="ku-schritte">
              {e.schritte.map((s, i) => (
                <SchrittKarte key={i} s={s} i={i} zeit={zeiten[i]} onBlatt={(id) => setOffen(blattById.get(id) ?? null)} />
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
        </div>
      </section>

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

function AbschnittInhalt({ a, id }: { a: Abschnitt; id?: string }) {
  return (
    <section className="ku-gl-abschnitt" id={id}>
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
          <div className="ku-gl-raster">
            <div className="ku-gl-inhalt">
              {g.abschnitte.map((a, i) => (
                <AbschnittInhalt key={i} a={a} id={`ku-gl-${g.id}-${i}`} />
              ))}
            </div>
            {g.abschnitte.length > 2 ? (
              <nav className="ku-gl-toc" aria-label="Auf dieser Seite">
                <span className="ku-seite-label">Auf dieser Seite</span>
                <ol>
                  {g.abschnitte.map((a, i) => (
                    <li key={i}>
                      <button type="button" onClick={() => document.getElementById(`ku-gl-${g.id}-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                        {a.titel}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
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
  /* Höhe der festen Kopfleiste (am Handy zweizeilig) – für Fahrplan und Sprungziele */
  useEffect(() => {
    const kopf = document.querySelector<HTMLElement>('header.sticky')
    if (!kopf) return
    const setzen = () => document.documentElement.style.setProperty('--kopf-h', kopf.offsetHeight + 'px')
    setzen()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(setzen)
    ro.observe(kopf)
    return () => ro.disconnect()
  }, [])
  /* Angezeigtes Kursjahr: das der Gruppe, außer man schaut sich ein anderes an */
  const [sichtJahr, setSichtJahr] = useState<number | null>(null)
  useEffect(() => setSichtJahr(null), [gruppe?.id, gruppe?.jahr])
  const sicht = sichtJahr ?? gruppe?.jahr ?? kursjahre[0]?.nr ?? 1

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
  const oeffnen = (id: string) => gehe({ art: 'einheit', id })
  const heuteGehalten = (id: string) => {
    gruppeAendern((g) => ({ ...g, erledigt: { ...g.erledigt, [id]: heute() } }))
    const e = einheitById.get(id)
    toast(`Einheit ${e?.nr ?? ''} ist als gehalten eingetragen.`, 'ok')
  }
  const jahrUmstellen = (n: number) => {
    gruppeAendern((g) => ({ ...g, jahr: n }))
    toast(`${gruppe?.name ?? 'Die Gruppe'} ist jetzt in Kursjahr ${n}.`, 'ok')
  }

  const gruppenWahl = useMemo(
    () =>
      gruppe ? (
        <div className="ku-gruppenwahl">
          <label>
            <span className="ku-gruppenwahl-label">Gruppe</span>
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
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
          <div className="min-w-0">
            <h1 className="disp text-[26px] leading-tight text-ink sm:text-[30px]">Skills-Kurs</h1>
            <p className="mt-1 text-[14px] text-muted">
              Für Kleingruppen von 12 bis 16 Jahren · {kursjahre.length === 1 ? 'ein Kursjahr' : `${kursjahre.length} Kursjahre`}, je ein Schuljahr mit rund 100 Minuten pro Woche
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
        <JahrWahl sicht={sicht} gruppeJahr={gruppe.jahr} onWahl={(n) => setSichtJahr(n === gruppe.jahr ? null : n)} />
        {sicht === gruppe.jahr ? <Naechste gruppe={gruppe} onOeffnen={oeffnen} onGehalten={heuteGehalten} /> : <SichtInfo gruppe={gruppe} jahrNr={sicht} onUmstellen={jahrUmstellen} />}
        <Jahresweg jahrNr={sicht} gruppe={gruppe} onOeffnen={oeffnen} />
        <JokerListe jahrNr={sicht} gruppe={gruppe} onOeffnen={oeffnen} />
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

// Passgenau – Baukasten-Editor (7): Bausteine suchen · Sitzung/Blatt bearbeiten · Vorschau (am Handy drei Reiter).
// Text ändern nur in den Feldern aus `textfelder` (mit Längengrenze), sortieren, löschen mit Rückgängig, Platzhalter.
import { useDeferredValue, useMemo, useRef, useState } from 'react'
import type { BlattTeil, KatalogEintrag, Plan, Rolle } from '../typen'
import * as K from './kern'
import { usePg, useProfil } from './zustand'
import { Ic } from './zeichen'
import { Chip, Pill, RolleBadge } from './Teile'
import { BlattAnsicht, Seitenkontrolle, useSeitenFuellung } from './Vorschau'
import { PLATZHALTER, inhaltVon, pfadLabel, wertAnPfad, zerlegen } from './blattTeile'
import { istBlattSchritt, minutenVon, teilText, warumListe } from './anzeige'
import { PHASE_NAME, ROLLE_NAME, zielKurz } from './texte'

type Tab = 'blatt' | 'ablauf'
type MTab = 'suche' | 'bearbeiten' | 'vorschau'

const BOGEN_F: [string, string][] = [['', 'alle Phasen'], ['wahrnehmen', 'Wahrnehmen'], ['verstehen', 'Verstehen'], ['ueben', 'Üben'], ['uebertragen', 'Übertragen'], ['reflektieren', 'Reflexion']]
const FORMAT_F: [string, string][] = [['', 'alle Arten'], ['comic', 'Comic'], ['skala', 'Skala'], ['schreiben', 'Schreiben'], ['malen', 'Malen'], ['karten', 'Karten'], ['denkmodell', 'Modell'], ['ankreuzen', 'Ankreuzen']]
const ROLLE_F: [Rolle, string][] = [['einstieg', 'Einstieg'], ['kern', 'Kern'], ['bewegung', 'Bewegung'], ['spiel', 'Spiel'], ['regulation', 'Regulation'], ['reflexion', 'Reflexion']]
const QUELLE_F: [string, string][] = [['', 'alle Quellen'], ['kurs', 'Skills'], ['foerderfach', 'Förderfach'], ['material', 'Material'], ['spielschule', 'Spielschule'], ['crew', 'CREW'], ['freude', 'Freude & Beziehung'], ['praxis', 'Aus der Praxis']]

function teilAendern(plan: Plan, nr: number, f: (l: BlattTeil[]) => BlattTeil[]): Plan {
  return { ...plan, sitzungen: plan.sitzungen.map((s) => (s.nr === nr ? { ...s, blatt: { titel: s.blatt?.titel ?? 'Mein Blatt', bausteine: f(s.blatt?.bausteine ?? []) } } : s)) }
}

export function Baukasten() {
  const pg = usePg()
  const p = useProfil()
  const plan = pg.plan!
  const s = pg.sitzung!
  const nr = s.nr
  const k = pg.katalog!
  const [tab, setTab] = useState<Tab>(s.blatt || s.phase !== 'leicht' ? 'blatt' : 'ablauf')
  const [mtab, setMtab] = useState<MTab>('bearbeiten')
  const [bogen, setBogen] = useState('')
  const [format, setFormat] = useState('')
  const [ziel, setZiel] = useState('')
  const [rolle, setRolle] = useState<Rolle>('kern')
  const [quelle, setQuelle] = useState('')
  const [text, setText] = useState('')
  const [nurPasst, setNurPasst] = useState(true)
  const [offen, setOffen] = useState(-1)
  const [einfuegenBei, setEinfuegenBei] = useState<number | null>(null)
  const zuletzt = useRef<{ el: HTMLInputElement | HTMLTextAreaElement; i: number; pfad: string } | null>(null)
  const teile = s.blatt?.bausteine ?? []
  const deferredPlan = useDeferredValue(plan)
  const zerlegt = useMemo(() => (s.blatt ? zerlegen(k, p, plan, nr, p.sprache.blatt) : null), [k, p, plan, nr, s.blatt])
  const original = (e: KatalogEintrag) => inhaltVon(k, p, plan, nr, e, p.sprache.blatt)
  const kleineStufe = p.layout === 'bild' || p.layout === 'gross'

  // freier Platz auf dem Blatt (für „passt aufs Blatt“)
  const fuellung = useSeitenFuellung(plan, nr)
  const fuell = s.blatt ? fuellung : [0]
  const maxSeiten = kleineStufe ? 1 : 2
  const frei = Math.max(0, Array.from({ length: maxSeiten }, (_, i) => 1 - Math.min(1, fuell[i] ?? 0)).reduce((a, b) => a + b, 0) * 200)

  const treffer = useMemo(() => {
    const filter =
      tab === 'blatt'
        ? { typ: 'baustein' as const, bogen, format: format || undefined, ziel: ziel || undefined, text: text || undefined, passtHoehe: nurPasst ? frei : undefined }
        : { typ: 'schritt' as const, rolle, ziel: ziel || undefined, quelle: quelle || undefined, text: text || undefined }
    const imPlan = new Set([...s.schritte.map((x) => x.ref), ...teile.map((t) => t.ref)])
    return K.suchen(k, p, filter, 40).filter((a) => !imPlan.has(a.eintrag.id))
  }, [tab, bogen, format, ziel, text, nurPasst, frei, rolle, quelle, k, p, s.schritte, teile])

  const wc = { profil: p, vorname: pg.vorname, plan }

  const einfuegen = (e: KatalogEintrag) => {
    if (tab === 'blatt') {
      const pos = einfuegenBei ?? (() => {
        const r = teile.findIndex((t) => { const x = K.eintrag(k, t.ref); return x?.typ === 'baustein' && x.bogen === 'reflektieren' })
        return r < 0 ? teile.length : r
      })()
      pg.planAendern((pl) => teilAendern(pl, nr, (l) => [...l.slice(0, pos), { ref: e.id, h: e.h, t: K.textVon(e, 'de').titel.slice(0, 60) }, ...l.slice(pos)]))
      setOffen(-1)
    } else {
      const pos = einfuegenBei ?? Math.max(0, s.schritte.findIndex((x) => x.rolle === 'abschluss'))
      const r = (e.rolle.find((x) => x === rolle) ?? e.rolle[0]) as Rolle
      pg.planAendern((pl) => ({ ...pl, sitzungen: pl.sitzungen.map((x) => (x.nr === nr ? { ...x, schritte: [...x.schritte.slice(0, pos), { ref: e.id, h: e.h, rolle: r, min: e.dauer.typ, t: K.textVon(e, 'de').titel.slice(0, 60) }, ...x.schritte.slice(pos)] } : x)) }))
    }
    setEinfuegenBei(null)
    pg.setGetauscht((g) => ({ ...g, [plan.id]: (g[plan.id] ?? 0) + 1 }))
    pg.hinweisZeigen(`Eingefügt: „${K.textVon(e, p.sprache.blatt).titel}“ aus „${K.textVon(e, p.sprache.blatt).quelle}“.`)
    if (window.innerWidth <= 760) setMtab('bearbeiten')
  }

  const verschieben = (i: number, d: -1 | 1) => {
    const j = i + d
    if (j < 0 || j >= teile.length) return
    pg.planAendern((pl) => teilAendern(pl, nr, (l) => { const n = [...l]; [n[i], n[j]] = [n[j], n[i]]; return n }))
    const e = K.eintrag(k, teile[i].ref)
    const andere = K.eintrag(k, teile[j].ref)
    if (e?.typ === 'baustein' && e.braucht?.includes(teile[j].ref) && d < 0) pg.hinweisZeigen(`Achtung: „${K.textVon(e, 'de').titel}“ bezieht sich auf „${andere ? K.textVon(andere, 'de').titel : ''}“ – steht jetzt davor.`, 'warn')
    if (offen === i) setOffen(j)
  }
  const loeschen = (i: number) => {
    const t = teile[i]
    const e = K.eintrag(k, t.ref)
    const abhaengig = teile.filter((x) => { const y = K.eintrag(k, x.ref); return y?.typ === 'baustein' && y.braucht?.includes(t.ref) })
    const vorher = plan
    pg.planAendern((pl) => teilAendern(pl, nr, (l) => l.filter((_, j) => j !== i)))
    setOffen(-1)
    if (e) pg.melde('geloescht', { sitzung: nr, baustein: e.id, h: e.h, tags: pg.tagsVon(e), wert: -0.5 }, e)
    pg.hinweisZeigen(`Gelöscht: „${e ? K.textVon(e, p.sprache.blatt).titel : t.t}“${abhaengig.length ? ` – ${abhaengig.length} Baustein bezieht sich darauf` : ''}.`, 'ok', { label: 'Rückgängig', aktion: () => pg.setPlan(vorher) }, 10000)
  }
  const textSetzen = (i: number, pfad: string, wert: string) => {
    pg.planAendern(
      (pl) => teilAendern(pl, nr, (l) => l.map((x, j) => (j === i ? { ...x, ueber: { ...x.ueber, [pfad]: wert }, ueberHerkunft: { ...x.ueberHerkunft, [pfad]: 'eigen' } } : x))),
      { merken: false },
    )
  }
  const zuruecksetzen = (i: number) => pg.planAendern((pl) => teilAendern(pl, nr, (l) => l.map((x, j) => (j === i ? { ref: x.ref, h: x.h, t: x.t } : x))))
  const platzhalter = (ph: string) => {
    const z = zuletzt.current
    if (!z) return
    const el = z.el
    const a = el.selectionStart ?? el.value.length
    const b = el.selectionEnd ?? a
    const neu = (el.value.slice(0, a) + `{${ph}}` + el.value.slice(b)).slice(0, el.maxLength > 0 ? el.maxLength : 999)
    textSetzen(z.i, z.pfad, neu)
    window.setTimeout(() => {
      el.focus()
      el.setSelectionRange(a + ph.length + 2, a + ph.length + 2)
    }, 0)
  }
  const minuten = (i: number, d: number) =>
    pg.planAendern((pl) => ({ ...pl, sitzungen: pl.sitzungen.map((x) => (x.nr === nr ? { ...x, schritte: x.schritte.map((y, j) => (j === i ? { ...y, min: Math.max(1, y.min + d) } : y)) } : x)) }))
  const schrittVerschieben = (i: number, d: -1 | 1) =>
    pg.planAendern((pl) => ({ ...pl, sitzungen: pl.sitzungen.map((x) => { if (x.nr !== nr) return x; const l = [...x.schritte]; const j = i + d; if (j < 0 || j >= l.length) return x; [l[i], l[j]] = [l[j], l[i]]; return { ...x, schritte: l } }) }))
  const schrittLoeschen = (i: number) => {
    const vorher = plan
    const x = s.schritte[i]
    pg.planAendern((pl) => ({ ...pl, sitzungen: pl.sitzungen.map((y) => (y.nr === nr ? { ...y, schritte: y.schritte.filter((_, j) => j !== i) } : y)) }))
    const e = K.eintrag(k, x.ref)
    if (e) pg.melde('geloescht', { sitzung: nr, baustein: e.id, h: e.h, tags: pg.tagsVon(e, x.rolle), wert: -0.5 }, e)
    pg.hinweisZeigen(`Gelöscht: „${e ? K.textVon(e, p.sprache.blatt).titel : x.t}“.`, 'ok', { label: 'Rückgängig', aktion: () => pg.setPlan(vorher) }, 10000)
  }

  const breite = typeof window !== 'undefined' ? (window.innerWidth <= 760 ? window.innerWidth - 40 : window.innerWidth <= 1180 ? Math.min(560, window.innerWidth - 80) : 380) : 380
  const EinfuegenHier = ({ i }: { i: number }) => (
    <div className="pg-einfuegen">
      <button
        type="button"
        className={einfuegenBei === i ? 'an' : ''}
        aria-pressed={einfuegenBei === i}
        onClick={() => {
          setEinfuegenBei(einfuegenBei === i ? null : i)
          if (window.innerWidth <= 760) setMtab('suche')
        }}
      >
        <Ic n="plus" /> {einfuegenBei === i ? 'hier wird eingefügt' : 'hier einfügen'}
      </button>
    </div>
  )

  return (
    <>
      <section className="pg-kopf">
        <div>
          <div className="pg-eyebrow">Baukasten · {plan.n > 1 ? `Sitzung ${nr} von ${plan.n}` : plan.titel}</div>
          <h1>Bausteine kombinieren</h1>
          <p className="pg-lead">Aus verschiedenen Blättern zusammenstellen, Texte ändern, sortieren, tauschen. Du hast das letzte Wort.</p>
        </div>
        <div className="pg-btnrow">
          <div className="pg-tabs" role="tablist" aria-label="Was bearbeiten">
            <button type="button" role="tab" aria-selected={tab === 'blatt'} className={tab === 'blatt' ? 'an' : ''} onClick={() => setTab('blatt')}>
              Blatt
            </button>
            <button type="button" role="tab" aria-selected={tab === 'ablauf'} className={tab === 'ablauf' ? 'an' : ''} onClick={() => setTab('ablauf')}>
              Ablauf
            </button>
          </div>
          <button type="button" className="pg-btn" disabled={!pg.rueckgaengig.length} onClick={pg.zurueck}>
            <Ic n="rueckgaengig" />
            Rückgängig
          </button>
          <button type="button" className="pg-btn primaer" onClick={() => pg.setAnsicht('ergebnis')}>
            <Ic n="check" />
            Fertig
          </button>
        </div>
      </section>
      <div className="pg-tabs pg-mtabs" role="tablist" aria-label="Spalte">
        {(
          [
            ['suche', 'Bausteine'],
            ['bearbeiten', tab === 'blatt' ? 'Blatt' : 'Ablauf'],
            ['vorschau', 'Vorschau'],
          ] as [MTab, string][]
        ).map(([t, l]) => (
          <button key={t} type="button" role="tab" aria-selected={mtab === t} className={mtab === t ? 'an' : ''} onClick={() => setMtab(t)}>
            {l}
          </button>
        ))}
      </div>
      <div className="pg-edgrid">
        <div className={'pg-ed-spalte' + (mtab === 'suche' ? ' mzeigen' : '')}>
          <div className="pg-card">
            <h2>Bausteine suchen</h2>
            {einfuegenBei !== null && (
              <div className="pg-hinweisbox klein">
                <Ic n="plus" />
                <span>
                  Einfügen an Stelle {einfuegenBei + 1}.{' '}
                  <button type="button" className="pg-link" onClick={() => setEinfuegenBei(null)}>
                    am Ende
                  </button>
                </span>
              </div>
            )}
            <label className="pg-suche">
              <Ic n="lupe" />
              <span className="sr-only">Suchwort (optional)</span>
              <input type="search" value={text} placeholder="Suchwort (optional)" onChange={(e) => setText(e.target.value)} maxLength={40} />
            </label>
            {tab === 'blatt' ? (
              <>
                <div className="pg-chips pg-mb" role="group" aria-label="Phase">
                  {BOGEN_F.map(([b, t]) => (
                    <Chip key={b} an={bogen === b} onClick={() => setBogen(b)}>
                      {t}
                    </Chip>
                  ))}
                </div>
                <div className="pg-chips pg-mb" role="group" aria-label="Art">
                  {FORMAT_F.map(([f, t]) => (
                    <Chip key={f} an={format === f} onClick={() => setFormat(f)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="pg-chips pg-mb" role="group" aria-label="Rolle">
                  {ROLLE_F.map(([r, t]) => (
                    <Chip key={r} an={rolle === r} onClick={() => setRolle(r)}>
                      {t}
                    </Chip>
                  ))}
                </div>
                <div className="pg-chips pg-mb" role="group" aria-label="Quelle">
                  {QUELLE_F.map(([q, t]) => (
                    <Chip key={q} an={quelle === q} onClick={() => setQuelle(q)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </>
            )}
            {p.ziele.length > 0 && (
              <div className="pg-chips pg-mb" role="group" aria-label="Ziel">
                <Chip an={!ziel} onClick={() => setZiel('')}>
                  alle Ziele
                </Chip>
                {p.ziele.map((z) => (
                  <Chip key={z.code} an={ziel === z.code} onClick={() => setZiel(z.code)}>
                    {z.code}
                  </Chip>
                ))}
              </div>
            )}
            {tab === 'blatt' && (
              <div className="pg-chips pg-mb">
                <Chip an={nurPasst} onClick={() => setNurPasst(!nurPasst)}>
                  passt aufs Blatt (~{Math.round(frei)} mm frei)
                </Chip>
              </div>
            )}
            <div className="pg-suchliste" aria-live="polite">
              {treffer.map((a) => {
                const e = a.eintrag
                const tx = K.textVon(e, p.sprache.blatt)
                return (
                  <div key={e.id} className="pg-sk">
                    <div className="skt">
                      {e.typ === 'baustein' ? <Pill>{tx.text}</Pill> : <RolleBadge rolle={(e.rolle.find((r) => r === rolle) ?? e.rolle[0]) as Rolle} />}
                      <b className="pg-clamp2">{tx.titel}</b>
                      <small>
                        {e.typ === 'baustein' ? `aus „${tx.quelle}“ · ${PHASE_NAME[e.bogen]} · ~${e.hoehe[p.layout] ?? '?'} mm` : `${tx.quelle} · ${e.dauer.typ} Min.`}
                        {p.sprache.blatt === 'fr' && !e.sprache.fr ? ' · nur DE' : ''}
                      </small>
                      {a.warum.length > 0 && <small className="ein">{warumListe(a.warum, wc)[0]}</small>}
                    </div>
                    <button type="button" className="pg-ibtn" onClick={() => einfuegen(e)} aria-label={`Einfügen: ${tx.titel}`} title="Einfügen">
                      <Ic n="plus" />
                    </button>
                  </div>
                )
              })}
              {!treffer.length && <p className="pg-leise">Keine passenden Bausteine – Filter lockern.</p>}
            </div>
          </div>
        </div>

        <div className={'pg-ed-spalte' + (mtab === 'bearbeiten' ? ' mzeigen' : '')}>
          <div className="pg-card">
            {tab === 'blatt' ? (
              <>
                <Seitenkontrolle plan={plan} nr={nr} />
                <div className="pg-er offen pg-mt">
                  <div className="felder">
                    <label htmlFor="pg-titel">
                      Titel des Blatts <span>{(s.blatt?.titel ?? '').length}/40</span>
                    </label>
                    <input
                      id="pg-titel"
                      maxLength={40}
                      value={s.blatt?.titel ?? ''}
                      onFocus={() => pg.planAendern((x) => x)}
                      onChange={(e) => pg.planAendern((pl) => ({ ...pl, sitzungen: pl.sitzungen.map((x) => (x.nr === nr ? { ...x, blatt: { titel: e.target.value, bausteine: x.blatt?.bausteine ?? [] } } : x)) }), { merken: false })}
                    />
                  </div>
                </div>
                <div className="pg-ed-liste">
                  {teile.length === 0 && <p className="pg-leise">Noch keine Bausteine – links suchen und mit „+“ einfügen.</p>}
                  {teile.map((t, i) => {
                    const e = K.eintrag(k, t.ref)
                    const tx = teilText(k, t.ref, p.sprache.blatt, t.t)
                    const ist = zerlegt?.teile[i] ?? []
                    const orig = e && t.ueber ? original(e) : ist
                    const istOffen = offen === i
                    // Zeilentitel: geänderte Aufgabe (erstes Textfeld), sonst der Titel aus dem Katalog
                    const erstes = e?.typ === 'baustein' ? e.textfelder[0]?.pfad : undefined
                    const titel = (erstes && t.ueber?.[erstes]) || tx.titel || t.t || t.ref
                    return (
                      <div key={i + t.ref}>
                        <EinfuegenHier i={i} />
                        <div className={'pg-er' + (istOffen ? ' offen' : '')}>
                          <div className="erk-kopf">
                            <button type="button" className="ertitel" onClick={() => setOffen(istOffen ? -1 : i)} aria-expanded={istOffen} aria-label={`Text ändern: ${titel}`}>
                              <b>{titel}</b>
                              <small>
                                {tx.text}{tx.quelle ? ` · aus „${tx.quelle}“` : ''}{t.ueber ? ' · ' : ''}
                                {t.ueber && <span className="geaendert">geändert</span>}
                                {e?.typ === 'baustein' && p.sprache.blatt === 'fr' && !e.sprache.fr ? ' · nur DE' : ''}
                              </small>
                            </button>
                            <span className="knoepfe">
                              <button type="button" className="pg-ibtn" disabled={i === 0} onClick={() => verschieben(i, -1)} aria-label={`nach oben: ${titel}`} title="nach oben">
                                <Ic n="auf" />
                              </button>
                              <button type="button" className="pg-ibtn" disabled={i === teile.length - 1} onClick={() => verschieben(i, 1)} aria-label={`nach unten: ${titel}`} title="nach unten">
                                <Ic n="ab" />
                              </button>
                              <button type="button" className="pg-ibtn" onClick={() => pg.setDlg({ art: 'ersetzen', ort: { sitzung: nr, blatt: i } })} aria-label={`tauschen: ${titel}`} title="tauschen">
                                <Ic n="tausch" />
                              </button>
                              <button type="button" className="pg-ibtn" onClick={() => setOffen(istOffen ? -1 : i)} aria-label={`Text ändern: ${titel}`} title="Text ändern" aria-expanded={istOffen}>
                                <Ic n="stift" />
                              </button>
                              <button type="button" className="pg-ibtn" onClick={() => loeschen(i)} aria-label={`löschen: ${titel}`} title="löschen">
                                <Ic n="muell" />
                              </button>
                            </span>
                          </div>
                          {istOffen && e?.typ === 'baustein' && (
                            <div className="felder">
                              {e.textfelder.length === 0 && <p className="pg-leise pg-klein">Dieser Baustein hat keine änderbaren Texte.</p>}
                              {e.textfelder.map((f) => {
                                const wert = t.ueber?.[f.pfad] ?? wertAnPfad(orig, f.pfad) ?? ''
                                const id = `pg-tf-${i}-${f.pfad}`
                                const woerter = wert.trim().split(/\s+/).filter(Boolean).length
                                const Feld = f.max > 60 ? 'textarea' : 'input'
                                return (
                                  <div key={f.pfad} className="feld">
                                    <label htmlFor={id}>
                                      {pfadLabel(ist.length ? ist : orig, f.pfad)}
                                      <span>
                                        {wert.length}/{f.max}
                                      </span>
                                    </label>
                                    <Feld
                                      id={id}
                                      maxLength={f.max}
                                      value={wert}
                                      onFocus={(ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                        zuletzt.current = { el: ev.target, i, pfad: f.pfad }
                                        pg.planAendern((x) => x)
                                      }}
                                      onChange={(ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => textSetzen(i, f.pfad, ev.target.value.slice(0, f.max))}
                                    />
                                    {kleineStufe && woerter > 10 && <small className="warn">Für diese Stufe besser höchstens 10 Wörter je Satz.</small>}
                                  </div>
                                )
                              })}
                              {e.textfelder.length > 0 && (
                                <div className="pg-chips" role="group" aria-label="Platzhalter einsetzen">
                                  <span className="pg-leise pg-klein">Platzhalter:</span>
                                  {PLATZHALTER.map((ph) => (
                                    <button key={ph} type="button" className="pg-ph" onMouseDown={(ev) => ev.preventDefault()} onClick={() => platzhalter(ph)} title={ph === 'NAME' ? 'Vorname (nur, wenn „Vorname einsetzen“ an ist)' : ph === 'INTERESSE' ? 'erstes Interesse des Kindes' : 'Wochenziel'}>
                                      {'{' + ph + '}'}
                                    </button>
                                  ))}
                                </div>
                              )}
                              {t.ueber && (
                                <button type="button" className="pg-btn klein" onClick={() => zuruecksetzen(i)}>
                                  <Ic n="zurueck" />
                                  Original wiederherstellen
                                </button>
                              )}
                              {e.braucht?.length ? <small className="pg-leise">Bezieht sich auf einen anderen Baustein (z. B. eine Geschichte) – beim Verschieben zusammen lassen.</small> : null}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  {teile.length > 0 && <EinfuegenHier i={teile.length} />}
                </div>
              </>
            ) : (
              <>
                <p className="pg-leise pg-klein pg-m0">
                  Schritte verschieben, Minuten anpassen, tauschen. Summe: <b>{minutenVon(s)} Min.</b> (geplant {plan.dauer} Min.)
                </p>
                <div className="pg-ed-liste">
                  {s.schritte.map((x, i) => {
                    const e = K.eintrag(k, x.ref)
                    const blatt = istBlattSchritt(x)
                    const titel = blatt ? `Blatt „${s.blatt?.titel ?? ''}“` : e ? K.textVon(e, p.sprache.blatt).titel : x.t ?? x.ref
                    return (
                      <div key={i + x.ref}>
                        <EinfuegenHier i={i} />
                        <div className="pg-er">
                          <div className="erk-kopf">
                            <span className="ertitel statisch">
                              <span className="pg-zeile1">
                                <RolleBadge rolle={blatt ? 'blatt' : x.rolle} />
                              </span>
                              <b>{titel}</b>
                              <small>{blatt ? 'aus Bausteinen' : e ? K.textVon(e, p.sprache.blatt).quelle : ''}</small>
                            </span>
                            <span className="knoepfe">
                              <button type="button" className="pg-ibtn" onClick={() => minuten(i, -1)} aria-label={`eine Minute weniger: ${titel}`}>
                                <Ic n="minus" />
                              </button>
                              <b className="min" aria-live="polite">{x.min} Min.</b>
                              <button type="button" className="pg-ibtn" onClick={() => minuten(i, 1)} aria-label={`eine Minute mehr: ${titel}`}>
                                <Ic n="plus" />
                              </button>
                              <button type="button" className="pg-ibtn" disabled={i === 0} onClick={() => schrittVerschieben(i, -1)} aria-label={`nach oben: ${titel}`}>
                                <Ic n="auf" />
                              </button>
                              <button type="button" className="pg-ibtn" disabled={i === s.schritte.length - 1} onClick={() => schrittVerschieben(i, 1)} aria-label={`nach unten: ${titel}`}>
                                <Ic n="ab" />
                              </button>
                              {!blatt && (
                                <button type="button" className="pg-ibtn" onClick={() => pg.setDlg({ art: 'ersetzen', ort: { sitzung: nr, schritt: i } })} aria-label={`tauschen: ${titel}`}>
                                  <Ic n="tausch" />
                                </button>
                              )}
                              {!blatt && (
                                <button type="button" className="pg-ibtn" onClick={() => schrittLoeschen(i)} aria-label={`löschen: ${titel}`}>
                                  <Ic n="muell" />
                                </button>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <EinfuegenHier i={s.schritte.length} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className={'pg-ed-spalte pg-edvorschau' + (mtab === 'vorschau' ? ' mzeigen' : '')}>
          {s.blatt ? (
            <BlattAnsicht plan={deferredPlan} nr={nr} breite={breite} onTeil={(i) => { setTab('blatt'); setOffen(i); setMtab('bearbeiten') }} markiert={offen} />
          ) : (
            <div className="pg-card">
              <p className="pg-leise">Noch kein Blatt. Links Bausteine suchen und mit „+“ einfügen{p.ziele[0] ? ` – zum Beispiel zu ${p.ziele[0].code} ${zielKurz(p.ziele[0].code)}` : ''}.</p>
            </div>
          )}
          <p className="pg-leise pg-klein">Vorschau: {ROLLE_NAME.blatt} · Seiten wie im Druck {kleineStufe ? '(höchstens 1 Seite)' : '(höchstens 2 Seiten)'}</p>
        </div>
      </div>
    </>
  )
}

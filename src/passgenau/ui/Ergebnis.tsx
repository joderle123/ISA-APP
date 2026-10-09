// Passgenau – Ergebnis (2.6): Folge-Leiste, Ablauf mit Rolle/Minuten/Quelle/Warum, Blatt als Liste und A4,
// antippen → Alternativen, Daumen, ganze Sitzung tauschen, Speichern/PDF/Vorlage/Baukasten.
import { useEffect, useRef, useState } from 'react'
import type { KatalogEintrag, PlanSchritt } from '../typen'
import * as K from './kern'
import { teilenErlaubt, usePg, useProfil, type Ort } from './zustand'
import { Ic } from './zeichen'
import { Daumen, FettCodes, HeikelBanner, Pill, RolleBadge, VersionsBanner, Warum } from './Teile'
import { BlattAnsicht } from './Vorschau'
import { istBlattSchritt, minutenVon, warumListe } from './anzeige'
import { PHASE_NAME, TF_NAME, datumKurz } from './texte'
import { ergebnisText } from './Start'

function quelleIcon(e?: KatalogEintrag): string {
  if (!e) return 'info'
  if (e.typ === 'baustein') return 'feder'
  return e.quelle.art === 'kurs' || e.quelle.art === 'foerderfach' ? 'gruppe' : e.quelle.art === 'ritual' ? 'stern' : e.quelle.art === 'freude' ? 'herz' : 'feder'
}

function Hinweise({ e }: { e?: KatalogEintrag }) {
  const [offen, setOffen] = useState(false)
  if (!e) return null
  const x = e as KatalogEintrag & { achtung?: string; vorbereitung?: string; elternbrief?: string }
  const druck = e.typ === 'schritt' ? e.blatt ?? [] : []
  const material = e.typ === 'schritt' ? e.material : []
  if (!x.achtung && !x.vorbereitung && !x.elternbrief && !druck.length && !material.length) return null
  const lang = (x.achtung?.length ?? 0) > 140
  return (
    <div className="pg-schritt-hinweise">
      {x.achtung && (
        <div className="pg-beachten">
          <Ic n="schild" />
          <span>
            <b>Beachten:</b> {lang && !offen ? x.achtung.slice(0, 140) + ' …' : x.achtung}{' '}
            {lang && (
              <button type="button" className="pg-link" onClick={() => setOffen(!offen)} aria-expanded={offen}>
                {offen ? 'weniger' : 'mehr'}
              </button>
            )}
          </span>
        </div>
      )}
      {x.vorbereitung && (
        <div className="pg-zeile-klein">
          <b>Vorbereitung:</b> {x.vorbereitung}
        </div>
      )}
      {x.elternbrief && (
        <label className="pg-check klein">
          <input type="checkbox" /> Vorher: Eltern informiert (Hausregel)? <span className="pg-leise">– {x.elternbrief}</span>
        </label>
      )}
      {(material.length > 0 || druck.length > 0) && (
        <div className="pg-zeile-klein">
          <b>Material:</b> {[...material, ...druck.map((r) => 'Druckt mit: ' + (r.includes('stopp-ampel:3') ? 'Stopp-Karten (liegen dem Blatt bei)' : 'Zusatzseite'))].join(' · ')}
        </div>
      )}
    </div>
  )
}

function SchrittKarte({ s, i, nr }: { s: PlanSchritt; i: number; nr: number }) {
  const pg = usePg()
  const p = useProfil()
  const e = pg.katalog ? K.eintrag(pg.katalog, s.ref) : undefined
  const tx = e ? K.textVon(e, p.sprache.blatt) : null
  const ort: Ort = { sitzung: nr, schritt: i }
  const oeffnen = () => pg.setDlg({ art: 'ersetzen', ort })
  const ritual = (s.rolle === 'ankommen' || s.rolle === 'abschluss') && e?.typ === 'schritt' && (e.quelle.art === 'ritual' || e.ohneZiel)
  const ueberarbeitet = e && s.h && e.h !== s.h
  const titel = tx?.titel ?? s.t ?? 'unbekannter Baustein'
  const wc = { profil: p, vorname: pg.vorname, plan: pg.plan }
  const nurDe = p.sprache.blatt === 'fr' && e && !e.sprache.fr
  if (!e)
    return (
      <article className="pg-schritt fehlt">
        <div className="zeit">
          {s.min}
          <small>Min.</small>
        </div>
        <div>
          <div className="zeile1">
            <RolleBadge rolle={s.rolle} />
            <Pill art="warn">nicht mehr im Katalog</Pill>
          </div>
          <h3>{s.t ?? s.ref}</h3>
        </div>
        <div className="aktionen">
          <button type="button" className="pg-btn klein" onClick={oeffnen}>
            <Ic n="tausch" />
            Ersetzen
          </button>
        </div>
      </article>
    )
  return (
    <article className={'pg-schritt' + (s.erkundung ? ' erk' : '')}>
      <div className="zeit">
        {s.min}
        <small>Min.</small>
      </div>
      <button type="button" className="pg-schritt-haupt" onClick={oeffnen} aria-label={`${RolleLabel(s.rolle)}: ${titel}, ${s.min} Minuten – antippen für Alternativen`}>
        <span className="zeile1">
          <RolleBadge rolle={s.rolle} />
          <span className="pg-quelle">
            <Ic n={quelleIcon(e)} />
            {tx?.quelle}
          </span>
          {s.erkundung && <Pill art="erk">neu ausprobiert</Pill>}
          {ritual && <Pill>Ritual</Pill>}
          {nurDe && <Pill art="warn">nur DE</Pill>}
          {ueberarbeitet && <Pill art="warn">überarbeitet</Pill>}
        </span>
        <h3>{titel}</h3>
        <span className="text pg-clamp2">{tx?.text}</span>
        {tx?.sagen?.[0] && <span className="sagen">„{tx.sagen[0]}“</span>}
      </button>
      <div className="aktionen">
        <Daumen schluessel={`${pg.plan?.id}:${nr}:s${i}:${s.ref}`} titel={titel} eintrag={e} ort={{ sitzung: nr }} rolle={s.rolle} onErsetzen={oeffnen} erkundung={s.erkundung} />
        <button type="button" className="pg-ibtn" onClick={oeffnen} aria-label={`Ersetzen: ${titel}`} title="Ersetzen">
          <Ic n="tausch" />
        </button>
      </div>
      <div className="unten">
        {ueberarbeitet && (
          <div className="pg-hinweisbox gelb klein">
            <Ic n="info" />
            <span>
              Dieser Baustein wurde in der Toolbox überarbeitet.{' '}
              <button type="button" className="pg-link" onClick={() => pg.planAendern((pl) => ({ ...pl, sitzungen: pl.sitzungen.map((x) => (x.nr === nr ? { ...x, schritte: x.schritte.map((y, j) => (j === i ? { ...y, h: e.h } : y)) } : x)) }))}>
                Neue Fassung nehmen
              </button>
            </span>
          </div>
        )}
        <Warum texte={warumListe(s.warum, wc)} />
        <Hinweise e={e} />
      </div>
    </article>
  )
}

function RolleLabel(r: string): string {
  return ({ ankommen: 'Ankommen', einstieg: 'Einstieg', kern: 'Kern', uebung: 'Übung', bewegung: 'Bewegung', spiel: 'Spiel', regulation: 'Regulation', reflexion: 'Reflexion', abschluss: 'Abschluss', transfer: 'Transfer' } as Record<string, string>)[r] ?? r
}

function BlattKarte({ s, nr }: { s: PlanSchritt; nr: number }) {
  const pg = usePg()
  const p = useProfil()
  const sitzung = pg.plan!.sitzungen.find((x) => x.nr === nr)!
  const bl = sitzung.blatt
  if (!bl) return null
  const eintraege = bl.bausteine.map((b) => (pg.katalog ? K.eintrag(pg.katalog, b.ref) : undefined))
  const quellen = [...new Set(eintraege.map((e) => (e?.typ === 'baustein' ? e.quelle.nr : '')).filter((x) => x && !/^[PWF]-/.test(x)))]
  const arten = eintraege.map((e) => (e ? K.textVon(e, p.sprache.blatt).text : '?'))
  return (
    <article className="pg-schritt blatt">
      <div className="zeit">
        {s.min}
        <small>Min.</small>
      </div>
      <button type="button" className="pg-schritt-haupt" onClick={() => pg.setAnsicht('baukasten')} aria-label={`Blatt „${bl.titel}“ im Baukasten bearbeiten`}>
        <span className="zeile1">
          <RolleBadge rolle="blatt" />
          <span className="pg-quelle">
            <Ic n="feder" />
            zusammengesetzt aus {quellen.length || 1} {quellen.length === 1 ? 'Blatt' : 'Blättern'}
          </span>
        </span>
        <h3>Blatt „{bl.titel}“</h3>
        <span className="text">
          {bl.bausteine.length} Bausteine: {arten.join(' · ')}
        </span>
      </button>
      <div className="aktionen">
        <button type="button" className="pg-btn klein" onClick={() => pg.setAnsicht('baukasten')}>
          <Ic n="stift" />
          Bearbeiten
        </button>
      </div>
      <div className="unten">
        <Warum texte={quellen.length ? [`Bausteine aus ${quellen.join(', ')}`, sitzung.phase === 'leicht' ? 'Mitmach-Seite, kein Lesen nötig' : `passend zur Phase: ${PHASE_NAME[sitzung.phase]}`] : []} />
      </div>
    </article>
  )
}

/** E-M14: Vorschläge statt Automatik – „Weniger Text?“ nach „nicht geklappt“, „Mehr zutrauen?“ nach 3 × geklappt */
function ZugangVorschlag({ nr }: { nr: number }) {
  const pg = usePg()
  const p = useProfil()
  const [weg, setWeg] = useState(false)
  if (!pg.plan || weg) return null
  const vorher = pg.plan.sitzungen.filter((s) => s.nr < nr && s.rueckmeldung)
  const letzte = vorher[vorher.length - 1]?.rueckmeldung
  const dreiGut = vorher.length >= 3 && vorher.slice(-3).every((s) => s.rueckmeldung?.ergebnis === 'geklappt')
  let frage: string | null = null
  let delta = 0
  if (letzte?.ergebnis === 'nicht' && p.zugang.lesen > 0) {
    frage = `Sitzung ${nr - 1} hat nicht geklappt. Weniger Text für ${pg.vorname}?`
    delta = -1
  } else if (dreiGut && p.zugang.lesen < 3) {
    frage = `Dreimal hat es geklappt. Etwas mehr zutrauen?`
    delta = 1
  }
  if (!frage) return null
  return (
    <div className="pg-banner gelb">
      <Ic n="info" />
      <div>
        {frage}{' '}
        <span className="pg-btnrow pg-inline">
          <button
            type="button"
            className="pg-btn klein"
            onClick={() => {
              pg.korrektur((k) => ({ ...k, zugang: { ...k.zugang, lesen: Math.max(0, Math.min(3, p.zugang.lesen + delta)) as 0 | 1 | 2 | 3 }, zugangBestaetigt: new Date().toISOString().slice(0, 10) }), 'Gemerkt – als Korrektur beim Kind.')
              setWeg(true)
            }}
          >
            ja
          </button>
          <button type="button" className="pg-btn klein leer" onClick={() => setWeg(true)}>
            nein
          </button>
        </span>
      </div>
    </div>
  )
}

export function Ergebnis() {
  const pg = usePg()
  const p = useProfil()
  const plan = pg.plan
  const ref = useRef<HTMLDivElement>(null)
  const [breite, setBreite] = useState(330)
  useEffect(() => {
    const m = () => {
      const w = window.innerWidth
      setBreite(w <= 760 ? Math.min(w - 64, 420) : w <= 1180 ? 300 : 334)
    }
    m()
    window.addEventListener('resize', m)
    return () => window.removeEventListener('resize', m)
  }, [])
  useEffect(() => {
    const a = ref.current?.querySelector<HTMLElement>('.pg-fs.akt')
    const leiste = a?.parentElement
    if (a && leiste && leiste.scrollWidth > leiste.clientWidth + 4) leiste.scrollLeft = a.offsetLeft - leiste.offsetLeft - 8
  }, [pg.si])
  if (!plan || !pg.sitzung) return null
  const s = pg.sitzung
  const leicht = s.phase === 'leicht'
  const h = plan.auftrag?.heute
  const tauschbar = teilenErlaubt(plan, pg.getauscht[plan.id] ?? 0)
  const blattSchritt = s.schritte.find(istBlattSchritt)
  const nurDe = p.sprache.blatt === 'fr' && pg.katalog ? s.blatt?.bausteine.filter((b) => { const e = K.eintrag(pg.katalog!, b.ref); return e && !e.sprache.fr }).length ?? 0 : 0
  const vorherKlaeren = (nr: number) => plan.sitzungen.find((x) => x.nr === nr)?.schritte.some((y) => { const e = pg.katalog ? K.eintrag(pg.katalog, y.ref) as { achtung?: string; elternbrief?: string } | undefined : undefined; return !!(e?.achtung || e?.elternbrief) })
  const tfs = plan.auftrag?.tagesformen ?? (plan.auftrag?.tagesform ? [plan.auftrag.tagesform] : [])

  const sitzungNeu = () => {
    if (!pg.katalog) return
    const alt = plan
    pg.setPlan(K.sitzungNeu(pg.katalog, p, plan, s.nr, pg.vor), { merken: true })
    pg.setGetauscht((g) => ({ ...g, [plan.id]: (g[plan.id] ?? 0) + 1 }))
    pg.hinweisZeigen(`Sitzung ${s.nr} neu zusammengestellt – Rituale bleiben.`, 'ok', { label: 'Rückgängig', aktion: () => pg.setPlan(alt) })
  }

  return (
    <div ref={ref}>
      <div className="pg-ekopf">
        <div>
          <div className="pg-eyebrow">{leicht ? 'Weg 3 · Heute geht nicht viel' : plan.n > 1 ? 'Folge · ' + plan.titel : plan.titel}</div>
          <h2 className="pg-disp">{leicht ? 'Heute leicht – ' + tfs.map((t) => TF_NAME[t]).join(' und ') : plan.n > 1 ? `Sitzung ${s.nr} von ${plan.n} · ${PHASE_NAME[s.phase]}` : `Stunde · ${PHASE_NAME[s.phase]}`}</h2>
          <div className="pg-meta">
            <span>
              {pg.vorname} · {minutenVon(s)} Min. · Einzel
            </span>
            {leicht ? <Pill art="ok">ohne Förderziel</Pill> : plan.ziele.slice(0, 2).map((z) => <Pill key={z} art="akz">{z}</Pill>)}
            {h && (
              <Pill icon="uhr">
                heute: Energie {h.energie} · Konz. {h.konzentration} · Stimmung {h.stimmung}
              </Pill>
            )}
            {s.status === 'angepasst' && <Pill art="warn">angepasst nach Sitzung {s.nr - 1}</Pill>}
            {pg.gespeichert[plan.id] && <Pill art="ok" icon="check">gespeichert {pg.gespeichert[plan.id]}</Pill>}
          </div>
        </div>
        <div className="pg-btnrow">
          <button type="button" className="pg-btn" onClick={() => pg.setAnsicht('baukasten')}>
            <Ic n="stift" />
            Baukasten
          </button>
          <button type="button" className="pg-btn" onClick={() => pg.setAnsicht('vorschau')}>
            <Ic n="augen" />
            Vorschau
          </button>
          <button type="button" className="pg-btn" onClick={() => pg.pdfErzeugen(s.nr)}>
            <Ic n="drucken" />
            PDF
          </button>
          {s.status === 'gehalten' ? (
            <Pill art="ok" icon="check">
              gehalten{s.rueckmeldung ? ' · ' + ergebnisText(s.rueckmeldung.ergebnis) : ''}
            </Pill>
          ) : (
            <button type="button" className="pg-btn primaer" onClick={() => pg.setDlg({ art: 'nachher', nr: s.nr })}>
              <Ic n="check" />
              Stunde gehalten
            </button>
          )}
        </div>
      </div>
      <VersionsBanner />
      <HeikelBanner />
      {(s.hinweise ?? []).map((t, i) => (
        <div key={i} className="pg-banner gelb">
          <Ic n="info" />
          <div>{t}</div>
        </div>
      ))}
      {nurDe > 0 && (
        <div className="pg-banner gelb">
          <Ic n="info" />
          <div>
            {nurDe} von {s.blatt?.bausteine.length} Teilen des Blatts gibt es nur auf Deutsch.
          </div>
        </div>
      )}
      <ZugangVorschlag nr={s.nr} />
      <div className="pg-egrid">
        <nav className="pg-folge" aria-label="Sitzungen">
          {plan.n > 1 ? (
            plan.sitzungen.map((x, i) => {
              const kern = x.schritte.find((y) => y.rolle === 'kern')
              const ke = kern && pg.katalog ? K.eintrag(pg.katalog, kern.ref) : undefined
              return (
                <button key={x.nr} type="button" className={'pg-fs' + (i === pg.si ? ' akt' : '') + (x.status === 'gehalten' ? ' gehalten' : '')} aria-current={i === pg.si ? 'step' : undefined} onClick={() => pg.setSi(i)}>
                  <span className="fnr">{x.status === 'gehalten' ? <Ic n="check" /> : x.nr}</span>
                  <span>
                    <b>{PHASE_NAME[x.phase]}</b>
                    <small>{ke ? K.textVon(ke, p.sprache.blatt).titel : kern?.t}</small>
                    {x.status === 'gehalten' && <small className="ok">gehalten {datumKurz(x.datum)}{x.rueckmeldung ? ' · ' + ergebnisText(x.rueckmeldung.ergebnis) : ''}</small>}
                    {x.status === 'angepasst' && <small className="warn">angepasst</small>}
                    {x.gedruckt && x.status !== 'gehalten' && <small>gedruckt {datumKurz(x.gedruckt)}</small>}
                    {vorherKlaeren(x.nr) && x.status !== 'gehalten' && <small className="warn">Vorher klären</small>}
                  </span>
                </button>
              )
            })
          ) : (
            <div className="pg-card pg-klein-karte">
              <b>{leicht ? 'Beziehungszeit' : 'Einzelstunde'}</b>
              <p className="pg-leise pg-klein">{leicht ? 'Ohne Förderziel. Die laufende Folge geht nächstes Mal weiter – nichts wird verschoben.' : 'Daraus eine Folge machen?'}</p>
              {!leicht && (
                <button type="button" className="pg-btn klein" onClick={() => pg.setAnsicht('gruendlich')}>
                  Gründlich planen
                </button>
              )}
            </div>
          )}
          <div className="pg-legende">
            <Ic n="info" />
            <span>Antippen ersetzt · Daumen bewerten</span>
          </div>
        </nav>
        <section className="pg-ablauf" aria-label="Ablauf der Sitzung">
          {s.schritte.map((x, i) => (istBlattSchritt(x) ? <BlattKarte key={i} s={x} nr={s.nr} /> : <SchrittKarte key={i + x.ref} s={x} i={i} nr={s.nr} />))}
          {!blattSchritt && s.blatt && <BlattKarte s={{ ref: 'blatt', h: '', rolle: 'uebung', min: 0 }} nr={s.nr} />}
          <div className="pg-ablauf-fuss">
            {s.schritte.some((x) => x.erkundung) && <p className="pg-leise pg-klein">„Neu ausprobiert“: bewusst etwas Neues neben dem Kern (Erkundung {Math.round((pg.vor.ich.erkundung ?? 0.2) * 100)} %), damit sich nichts festfährt.</p>}
            <div className="pg-btnrow">
              <button type="button" className="pg-btn klein" onClick={() => pg.planSichern(plan, 'knopf')}>
                <Ic n={pg.ohneKind ? 'datei' : 'speichern'} />
                {pg.ohneKind ? 'Als Datei speichern' : 'Beim Kind speichern'}
              </button>
              <button type="button" className="pg-btn klein" onClick={pg.alsEigeneVorlage}>
                <Ic n="kopie" />
                Als eigene Vorlage
              </button>
              {s.status !== 'gehalten' && (
                <button type="button" className="pg-btn klein" onClick={sitzungNeu}>
                  <Ic n="tausch" />
                  Ganze Sitzung tauschen
                </button>
              )}
              {plan.n > 1 && (
                <button type="button" className="pg-btn klein" onClick={() => pg.pdfErzeugen('folge')}>
                  <Ic n="drucken" />
                  Folge als PDF
                </button>
              )}
              {pg.schalter.teilen && pg.hubDa && (
                <button type="button" className="pg-btn klein" disabled={!tauschbar} title={tauschbar ? undefined : plan.n > 1 ? 'Teilen nach mindestens 3 gehaltenen Sitzungen' : 'Teilen, wenn du mindestens einen Teil selbst getauscht hast'} onClick={() => pg.setDlg({ art: 'teilen' })}>
                  <Ic n="teilen" />
                  Fürs Team teilen
                </button>
              )}
            </div>
            {pg.schalter.teilen && pg.hubDa && !tauschbar && <p className="pg-leise pg-klein">Teilen geht {plan.n > 1 ? 'nach mindestens drei gehaltenen Sitzungen' : 'bei Einzelstunden, in denen du selbst etwas getauscht hast'}.</p>}
          </div>
        </section>
        <aside className="pg-seitenleiste">
          {s.blatt ? (
            <div className="pg-card">
              <h2 className="pg-zwischen">
                <span>
                  {leicht ? 'Mitmach-Seite' : 'Blatt'} {leicht && <Pill>optional</Pill>}
                </span>
                <button type="button" className="pg-btn klein" onClick={() => pg.setAnsicht('vorschau')}>
                  <Ic n="augen" />
                  Vorschau
                </button>
              </h2>
              <BlattAnsicht plan={plan} nr={s.nr} breite={breite} nurErste onTeil={(i) => pg.setDlg({ art: 'ersetzen', ort: { sitzung: s.nr, blatt: i } })} />
              <ul className="pg-bliste">
                {s.blatt.bausteine.map((b, i) => {
                  const e = pg.katalog ? K.eintrag(pg.katalog, b.ref) : undefined
                  const tx = e ? K.textVon(e, p.sprache.blatt) : null
                  const titel = tx?.titel ?? b.t ?? b.ref
                  return (
                    <li key={i + b.ref}>
                      <button type="button" className="haupt" onClick={() => pg.setDlg({ art: 'ersetzen', ort: { sitzung: s.nr, blatt: i } })} aria-label={`Blatt-Teil ${i + 1}: ${titel} – antippen für Alternativen`}>
                        <span className="art">{tx?.text}</span>
                        <span className="bt">
                          <FettCodes t={titel} />
                          <small>aus „{tx?.quelle}“{p.sprache.blatt === 'fr' && e && !e.sprache.fr ? ' · nur DE' : ''}</small>
                        </span>
                      </button>
                      <Daumen schluessel={`${plan.id}:${s.nr}:b${i}:${b.ref}`} titel={titel} eintrag={e} ort={{ sitzung: s.nr }} onErsetzen={() => pg.setDlg({ art: 'ersetzen', ort: { sitzung: s.nr, blatt: i } })} />
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            <div className="pg-card">
              <h2>Ohne Blatt</h2>
              <p className="pg-leise pg-klein">Diese Stunde kommt ohne Blatt aus. Im Baukasten kannst du trotzdem eins zusammenstellen.</p>
              <button type="button" className="pg-btn klein" onClick={() => pg.setAnsicht('baukasten')}>
                <Ic n="stift" />
                Baukasten
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

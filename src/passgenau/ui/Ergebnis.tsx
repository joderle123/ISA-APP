// Passgenau – Ergebnis (2.6): Folge-Leiste, Ablauf mit Rolle/Minuten/Quelle/Warum, Blatt als Liste und A4,
// antippen → Alternativen, Daumen, ganze Sitzung tauschen, Speichern/PDF/Vorlage/Baukasten.
import { planGruende } from './warum'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import type { KatalogEintrag, Plan, PlanSchritt } from '../typen'
import * as K from './kern'
import { teilenErlaubt, usePg, useProfil, type Ort } from './zustand'
import { Ic } from './zeichen'
import { Daumen, FettCodes, HeikelBanner, MehrMenue, Pill, RolleBadge, VersionsBanner, Warum, useGekuerzt } from './Teile'
import { BlattAnsicht } from './Vorschau'
import { istBlattSchritt, minutenVon, teilText, warumListe } from './anzeige'
import { PHASE_NAME, ROLLE_NAME, TF_NAME, datumKurz, kindWort, SOZIALFORM_NAME } from './texte'
import { ergebnisText } from './Start'
import { AufEinenBlick, MATERIAL_MOTIV as MATERIAL_MOTIV_UI, SagenBlasen, SchrittBild, StundenLeiste, bildFuer, rolleFarbe, type LeistenTeil, type MaterialPunkt, HilfenBlock } from './Stundenbild'

function quelleIcon(e?: KatalogEintrag): string {
  if (!e) return 'info'
  if (e.typ === 'baustein') return 'feder'
  return e.quelle.art === 'kurs' || e.quelle.art === 'foerderfach' ? 'gruppe' : e.quelle.art === 'ritual' ? 'stern' : e.quelle.art === 'freude' ? 'herz' : 'feder'
}

function Hinweise({ e, ohneMaterial }: { e?: KatalogEintrag; ohneMaterial?: boolean }) {
  const pg = usePg()
  const p = useProfil()
  const [offen, setOffen] = useState(false)
  if (!e) return null
  const x = e as KatalogEintrag & { achtung?: string; vorbereitung?: string; elternbrief?: string }
  const druck = e.typ === 'schritt' ? e.blatt ?? [] : []
  // Der Katalog führt Schlüssel („handpuppe“, „wuerfel“); lesbar wie im PDF
  const material = e.typ === 'schritt' && !ohneMaterial ? e.material.map((m) => (pg.katalog ? K.materialName(pg.katalog, m, p.sprache.blatt) : m)) : []
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
          <b>Material:</b>{' '}
          {[
            ...material,
            ...druck.map((r) => {
              const d = pg.katalog ? K.eintrag(pg.katalog, r) : undefined
              return 'druckt mit: ' + (d ? K.textVon(d, 'de').titel : 'Zusatzseite')
            }),
          ].join(' · ')}
        </div>
      )}
    </div>
  )
}

function SchrittKarte({ s, i, nr, d, ab }: { s: PlanSchritt; i: number; nr: number; d?: K.DruckSchritt; ab: number }) {
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
  // Der Text zeigt höchstens vier Zeilen (CSS); „Ganzer Text“ erscheint nur, wenn wirklich etwas fehlt
  const textRef = useRef<HTMLSpanElement>(null)
  const [textOffen, setTextOffen] = useState(false)
  const gekuerzt = useGekuerzt(textRef, textOffen, tx?.text ?? '')
  // Stundenbild: Bild, Farbe der Rolle, alle Sätze zum Sagen, „Wenn es kippt“ und das Material als Zeichen
  const f = rolleFarbe(s.rolle)
  const farbe = { '--rf': f.tief, '--rm': f.mittel, '--rz': f.zart } as CSSProperties
  const sagen = d?.sagen?.length ? d.sagen : (tx?.sagen ?? [])
  const kurz = d?.kurz && tx?.text && !tx.text.trim().startsWith(d.kurz.replace(/…$/, '').trim()) ? d.kurz : undefined
  const mat = e?.typ === 'schritt' ? e.material.map((m) => ({ k: m, name: pg.katalog ? K.materialName(pg.katalog, m, p.sprache.blatt) : m })) : []
  const mehrDa = gekuerzt || textOffen || sagen.length > 2
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
    <article id={`pg-sb-k-${i}`} className={'pg-schritt pg-sb' + (s.erkundung ? ' erk' : '') + (textOffen ? ' offen' : '')} style={farbe}>
      <div className="zeit">
        {s.min}
        <small>Min.</small>
        <SchrittBild id={bildFuer(e, titel, s.rolle)} rolle={s.rolle} />
        <span className="pg-sb-ab">ab {ab}′</span>
      </div>
      <button type="button" className="pg-schritt-haupt" onClick={oeffnen} aria-label={`${RolleLabel(s.rolle)}: ${titel}, ${s.min} Minuten – antippen zum Tauschen`}>
        <span className="zeile1">
          <RolleBadge rolle={s.rolle} />
          {s.etikett && <span className="pg-fo-etikett">{s.etikett.de}</span>}
          {/* Die Quelle nur, wenn sie etwas Neues sagt: nicht noch einmal die Rolle („Einstieg“) und nicht „Ritual“ (steht als Pille daneben) */}
          {tx?.quelle && tx.quelle !== ROLLE_NAME[s.rolle] && !(ritual && tx.quelle === 'Ritual') && (
            <span className="pg-quelle">
              <Ic n={quelleIcon(e)} />
              {tx.quelle}
            </span>
          )}
          {s.erkundung && <Pill art="erk">neu ausprobiert</Pill>}
          {ritual && <Pill>Ritual</Pill>}
          {nurDe && <Pill art="warn">nur DE</Pill>}
          {s.gelockert && <Pill art="warn">gelockert</Pill>}
          {ueberarbeitet && <Pill art="warn">überarbeitet</Pill>}
        </span>
        <h3>{titel}</h3>
        {kurz && <span className="pg-sb-kurz">{kurz}</span>}
        <span ref={textRef} className="text">
          {tx?.text}
        </span>
        <SagenBlasen sagen={sagen} alle={textOffen} rolle={s.rolle} />
      </button>
      {/* Eine benannte Schaltfläche statt dreier Symbole: „Tauschen“. Die Daumen sind leise und zeigen sich erst beim Darüberfahren
          oder Fokussieren (auf Touch-Geräten immer, aber blass). */}
      <div className="aktionen">
        <button type="button" className="pg-btn klein tausch" onClick={oeffnen} aria-label={`Tauschen: ${titel}`}>
          <Ic n="tausch" />
          Tauschen
        </button>
        <Daumen schluessel={`${pg.plan?.id}:${nr}:s${i}:${s.ref}`} titel={titel} eintrag={e} ort={{ sitzung: nr }} rolle={s.rolle} onErsetzen={oeffnen} erkundung={s.erkundung} />
      </div>
      <div className="unten">
        {mehrDa && (
          <button type="button" className="pg-link pg-textmehr" onClick={() => setTextOffen(!textOffen)} aria-expanded={textOffen}>
            {textOffen ? 'Weniger Text' : 'Ganzer Text'}
          </button>
        )}
        {(mat.length > 0 || (e.typ === 'schritt' && e.ort && e.ort !== 'raum')) && (
          <div className="pg-sb-chips" aria-label="Material">
            {e.typ === 'schritt' && e.ort && e.ort !== 'raum' && (
              <span className="pg-sb-chip ort">
                <SchrittBild id={e.ort === 'draussen' ? 'motiv:baum' : 'motiv:turnmatte'} rolle={s.rolle} className="mini" />
                {e.ort === 'draussen' ? 'draußen' : 'Turnhalle'}
              </span>
            )}
            {mat.map((m) => (
              <span key={m.k} className="pg-sb-chip">
                <SchrittBild id={'motiv:' + (MATERIAL_MOTIV_UI[m.k] ?? 'korb')} rolle="abschluss" className="mini" />
                {m.name}
              </span>
            ))}
          </div>
        )}
        {d?.wennEsKippt && (
          <div className={'pg-sb-kippt' + (textOffen ? ' offen' : '')}>
            <Ic n="welle" />
            <span>
              <b>Wenn es kippt:</b> {d.wennEsKippt}
            </span>
          </div>
        )}
        {d?.imSpiel && (
          <div className="pg-sb-imspiel">
            <Ic n="stern" />
            <span>
              <b>Im Spiel üben:</b> {d.imSpiel}
            </span>
          </div>
        )}
        {ueberarbeitet && (
          <div className="pg-hinweisbox gelb klein">
            <Ic n="info" />
            <span>
              Dieser Schritt wurde in der Toolbox überarbeitet.{' '}
              <button type="button" className="pg-link" onClick={() => pg.planAendern((pl) => ({ ...pl, sitzungen: pl.sitzungen.map((x) => (x.nr === nr ? { ...x, schritte: x.schritte.map((y, j) => (j === i ? { ...y, h: e.h } : y)) } : x)) }))}>
                Neue Fassung nehmen
              </button>
            </span>
          </div>
        )}
        {/* „Ritual – bleibt in der Folge gleich“ steht je Ritual-Karte gleich da: einmal in der Legende links reicht */}
        <Warum texte={warumListe(s.warum, wc).filter((t) => !(ritual && /^Ritual – bleibt in der Folge gleich/.test(t)))} />
        {s.hinweis && !(s.warum ?? []).includes(s.hinweis) && <p className="pg-leise pg-klein pg-m0">{s.hinweis}</p>}
        {e?.typ === 'schritt' && <HilfenBlock h={(p.sprache.blatt === 'fr' ? e.hilfen?.fr : undefined) ?? e.hilfen?.de} />}
        <Hinweise e={e} ohneMaterial />
      </div>
    </article>
  )
}

function RolleLabel(r: string): string {
  return ({ ankommen: 'Ankommen', einstieg: 'Einstieg', kern: 'Kern', uebung: 'Übung', bewegung: 'Bewegung', spiel: 'Spiel', regulation: 'Regulation', reflexion: 'Reflexion', abschluss: 'Abschluss', transfer: 'Transfer' } as Record<string, string>)[r] ?? r
}

function BlattKarte({ s, nr, idx, ab }: { s: PlanSchritt; nr: number; idx?: number; ab?: number }) {
  const pg = usePg()
  const p = useProfil()
  const sitzung = pg.plan!.sitzungen.find((x) => x.nr === nr)!
  const bl = sitzung.blatt
  if (!bl) return null
  const eintraege = bl.bausteine.map((b) => (pg.katalog ? K.eintrag(pg.katalog, b.ref) : undefined))
  const quellen = [...new Set(eintraege.map((e) => (e?.typ === 'baustein' ? e.quelle.nr : '')).filter((x) => x && !/^[PWF]-/.test(x)))]
  const arten = bl.bausteine.map((b) => teilText(pg.katalog, b.ref, p.sprache.blatt, b.t).titel)
  return (
    <article id={ab !== undefined ? `pg-sb-k-${idx}` : undefined} className="pg-schritt blatt pg-sb" style={{ '--rf': rolleFarbe('blatt').tief, '--rm': rolleFarbe('blatt').mittel, '--rz': rolleFarbe('blatt').zart } as CSSProperties}>
      <div className="zeit">
        {s.min > 0 ? s.min : '–'}
        <small>{s.min > 0 ? 'Min.' : 'optional'}</small>
        <SchrittBild id="motiv:stift" rolle="blatt" />
        {ab !== undefined && s.min > 0 && <span className="pg-sb-ab">ab {ab}′</span>}
      </div>
      <button type="button" className="pg-schritt-haupt" onClick={() => pg.setAnsicht('baukasten')} aria-label={`Blatt „${bl.titel}“ anpassen`}>
        <span className="zeile1">
          <RolleBadge rolle="blatt" />
          <span className="pg-quelle">
            <Ic n="feder" />
            {quellen.length > 1 ? `zusammengesetzt aus ${quellen.length} Blättern` : quellen.length === 1 ? 'aus einem Blatt der Toolbox' : 'Mitmach-Seite der Toolbox'}
          </span>
        </span>
        <h3>Blatt „{bl.titel}“</h3>
        <span className="text">{bl.bausteine.length === 1 ? 'Blatt mit 1 Teil' : `Blatt mit ${bl.bausteine.length} Teilen: ${arten.join(' · ')}`}</span>
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

/** Steht die ruhige Zeile „Die Stunde ist noch nicht gesichert“? Nur wenn etwas zu sichern ist, das sich lohnt: die Stunde lässt sich im
 *  CDSE-Hub speichern, oder sie wurde verändert (getauscht, angepasst). Eine frische Stunde ohne CDSE-Hub braucht sie nicht –
 *  die PDF ist dann das Ergebnis; „Als Datei sichern“ steht unten bei den Stunden-Knöpfen. */
function speicherzeileNoetig(pg: ReturnType<typeof usePg>): boolean {
  return pg.ungespeichert && (pg.hubSpeichert || pg.rueckgaengig.length > 0)
}

/** „Die Stunde ist noch nicht gesichert“ – eine ruhige graue Zeile (kein gelber Streifen), bis der Plan gesichert ist (im CDSE-Hub
 *  oder als Datei). Sagt dazu in einem Satz, wo die Stunde gerade liegt. */
function Speicherstreifen({ plan }: { plan: Plan }) {
  const pg = usePg()
  if (!speicherzeileNoetig(pg)) return null
  const gruppe = (pg.profil?.gruppe?.length ?? 0) > 1
  const text = pg.darfSpeichern
    ? 'Beim Drucken wird sie beim Kind gespeichert – oder gleich jetzt.'
    : pg.darfTresor
      ? 'Beim Drucken landet sie in deiner persönlichen Ablage im CDSE-Hub (nur du siehst sie).'
      : pg.hubDa
        ? 'Dir fehlt das Recht, beim Kind zu speichern.'
        : 'Sie liegt nur in diesem Fenster.'
  return (
    <div className="pg-streifen" role="note">
      <p>
        <b>Die Stunde ist noch nicht gesichert.</b> {text}
      </p>
      <button type="button" className="pg-btn klein" onClick={() => pg.planSichern(plan, 'knopf')}>
        <Ic n={pg.darfSpeichern ? 'speichern' : 'datei'} />
        {pg.darfSpeichern ? (gruppe ? 'Bei allen Kindern speichern' : 'Beim Kind speichern') : 'Als Datei sichern'}
      </button>
    </div>
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
    frage = `Sitzung ${nr - 1} hat nicht geklappt. Weniger Text für ${pg.kind.akk}?`
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
  // Stundenbild: dieselben Druckdaten wie das PDF (Kurzzeile, alle Sätze, „Wenn es kippt“, Ziel, erster Satz, Vorbereitung)
  const sitzNr = pg.sitzung?.nr
  const druck = useMemo(() => {
    if (!plan || !pg.katalog || sitzNr === undefined) return null
    try {
      return K.druckSitzung(pg.katalog, p, plan, sitzNr, { sprache: p.sprache.blatt, warum: false })
    } catch {
      return null
    }
  }, [plan, pg.katalog, sitzNr, p])
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

  // Überschrift = das Thema (nicht „Stunde · Üben“): „Impulskontrolle für Mio · 20 Min.“; Art und Phase stehen in der Zeile darüber
  const kd = kindWort(pg.roh?.vorname, plan.auftrag?.sozialform)
  const minuten = minutenVon(s)
  const titelTeile = /^([^:]{3,30}):\s+(.+)$/.exec(plan.titel)
  const thema = titelTeile ? titelTeile[2] : plan.titel
  const fuer = kd.name ? ` für ${kd.akk}` : ''
  // Folge: Welche Sitzung es ist, gehört in die Überschrift (sie ist das, was man beim Blättern sucht); Phase und Minuten darüber
  const ueberschrift = leicht
    ? `Heute leicht – ${tfs.map((t) => TF_NAME[t]).join(' und ')} · ${minuten} Min.`
    : plan.n > 1
      ? `${plan.titel}${fuer} · Sitzung ${s.nr} von ${plan.n}`
      : `${thema}${fuer} · ${minuten} Min.`
  const eyebrow = leicht ? 'Heute geht nicht viel' : plan.n > 1 ? `Folge · ${PHASE_NAME[s.phase]} · ${minuten} Min.` : `${titelTeile ? titelTeile[1] : 'Stunde'} · ${PHASE_NAME[s.phase]}`
  // Zeitleiste und Material für „Auf einen Blick“
  const startMin: number[] = []
  const leiste: LeistenTeil[] = s.schritte.map((x, i) => {
    startMin.push(s.schritte.slice(0, i).reduce((a, y) => a + (y.min || 0), 0))
    const e = pg.katalog ? K.eintrag(pg.katalog, x.ref) : undefined
    const bl = istBlattSchritt(x)
    const titel = bl ? `Blatt „${s.blatt?.titel ?? ''}“` : e ? K.textVon(e, p.sprache.blatt).titel : (x.t ?? '')
    return { rolle: bl ? 'blatt' : x.rolle, min: x.min, titel, bild: bl ? 'motiv:stift' : bildFuer(e, titel, x.rolle), name: x.etikett?.de }
  })
  const materialPunkte: MaterialPunkt[] = []
  for (const x of s.schritte) {
    const e = pg.katalog ? K.eintrag(pg.katalog, x.ref) : undefined
    if (e?.typ !== 'schritt') continue
    for (const m of e.material) if (!materialPunkte.some((y) => y.schluessel === m)) materialPunkte.push({ schluessel: m, name: pg.katalog ? K.materialName(pg.katalog, m, p.sprache.blatt) : m })
  }
  if (s.blatt && !materialPunkte.some((y) => y.schluessel === 'blatt-druck')) materialPunkte.push({ schluessel: 'blatt-druck', name: `Blatt „${s.blatt.titel}“ ausgedruckt` })
  const springen = (i: number) => {
    const el = document.getElementById(`pg-sb-k-${i}`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.add('pg-sb-blink')
    window.setTimeout(() => el.classList.remove('pg-sb-blink'), 1400)
  }
  // Handlungsfelder des Nationalen Rahmenplans (Rituale und Blatt zählen nicht)
  const felder = pg.katalog ? K.felderStunde(s.schritte.filter((x) => x.rolle !== 'ankommen' && x.rolle !== 'abschluss').map((x) => K.eintrag(pg.katalog!, x.ref)), plan.auftrag?.form, plan.ziele) : []
  const gesichert = !pg.ungespeichert ? (pg.gespeichert[plan.id] ? `gespeichert ${pg.gespeichert[plan.id]}` : pg.dateiZeit[plan.id] ? `als Datei gesichert ${pg.dateiZeit[plan.id]}` : null) : null

  return (
    <div ref={ref}>
      <div className="pg-ekopf">
        <div>
          <div className="pg-eyebrow">{eyebrow}</div>
          <h1 className="pg-disp">{ueberschrift}</h1>
          <div className="pg-meta">
            <span>
              {kd.name ? kd.nom + ' · ' : ''}
              {SOZIALFORM_NAME[plan.auftrag?.sozialform ?? 'einzeln']}
            </span>
            {leicht ? <Pill art="ok">ohne Förderziel</Pill> : plan.ziele.slice(0, 2).map((z) => <Pill key={z} art="akz">{z}</Pill>)}
            {h && (
              <Pill icon="uhr">
                heute: Energie {h.energie} · Konz. {h.konzentration} · Stimmung {h.stimmung}
              </Pill>
            )}
            {s.status === 'angepasst' && <Pill art="warn">angepasst nach Sitzung {s.nr - 1}</Pill>}
            {gesichert && <Pill art="ok" icon="check">{gesichert}</Pill>}
          </div>
          {felder.length > 0 && (
            <div className="pg-rp" aria-label="Nationaler Rahmenplan: Handlungsfelder dieser Stunde">
              <span className="pg-rp-l" title="Nationaler Rahmenplan zur non-formalen Bildung (Cadre de référence national)">Rahmenplan</span>
              {felder.slice(0, 3).map((id) => {
                const f = K.FELDER.find((x) => x.id === id)!
                return (
                  <span key={id} className="pg-rp-feld" style={{ background: f.farbe[1], color: f.farbe[0] }} title={`${f.de} · ${f.fr}`}>
                    {f.kurz}
                  </span>
                )
              })}
            </div>
          )}
        </div>
        <div className="pg-aktionen">
          {/* Vorschau und „Blatt anpassen“ braucht man selten: sie liegen unter „Mehr“. */}
          <div className="pg-aktgruppe sek">
            <MehrMenue
              rechts
              punkte={[
                { icon: 'augen', text: 'Vorschau', onClick: () => pg.setAnsicht('vorschau') },
                { icon: 'stift', text: 'Blatt anpassen', onClick: () => pg.setAnsicht('baukasten') },
                { icon: 'info', text: 'Hilfe', onClick: () => pg.setDlg({ art: 'hilfe' }) },
              ]}
            />
          </div>
          {/* Vor der Stunde ist Drucken der nächste Schritt: „PDF öffnen / drucken“ ist der Hauptknopf, „Stunde gehalten“ kommt danach
              (erst wenn gedruckt wurde, wird er hervorgehoben). Mobil steht diese Gruppe als feste Leiste unten. */}
          <div className="pg-aktgruppe haupt">
            <button type="button" className="pg-btn primaer" onClick={() => pg.pdfErzeugen(s.nr)}>
              <Ic n="drucken" />
              <span className="nur-gross">PDF öffnen / drucken</span>
              <span className="nur-klein">PDF öffnen</span>
            </button>
            {s.status === 'gehalten' ? (
              <Pill art="ok" icon="check">
                gehalten{s.rueckmeldung ? ' · ' + ergebnisText(s.rueckmeldung.ergebnis) : ''}
              </Pill>
            ) : (
              <button type="button" className={'pg-btn' + (s.gedruckt ? ' primaer' : '')} onClick={() => pg.setDlg({ art: 'nachher', nr: s.nr })}>
                <Ic n="check" />
                Stunde gehalten
              </button>
            )}
          </div>
        </div>
      </div>
      <Speicherstreifen plan={plan} />
      <VersionsBanner />
      <HeikelBanner />
      {plan.n > 1 && !leicht && pg.katalog && !pg.ohneKind && <WarumFolge />}
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
      <AufEinenBlick ziel={druck?.ziel} einstieg={druck?.einstieg} werkzeug={druck?.werkzeug} material={materialPunkte} vorbereitung={druck?.vorbereitung ?? []} minuten={minuten} leiste={leiste.length > 1 ? <StundenLeiste teile={leiste} onSprung={springen} /> : undefined} />
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
              <b>{leicht ? 'Beziehungszeit' : (plan.auftrag?.sozialform ?? 'einzeln') !== 'einzeln' ? 'Gruppenstunde' : 'Einzelstunde'}</b>
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
            <span>„Tauschen“ ersetzt einen Schritt.{plan.n > 1 ? ' Rituale bleiben in der Folge gleich.' : ''}</span>
          </div>
        </nav>
        <section className="pg-ablauf pg-sb-ablauf" aria-label="Ablauf der Sitzung">
          {s.schritte.map((x, i) => (istBlattSchritt(x) ? <BlattKarte key={i} s={x} nr={s.nr} idx={i} ab={startMin[i]} /> : <SchrittKarte key={i + x.ref} s={x} i={i} nr={s.nr} d={druck?.schritte[i]} ab={startMin[i]} />))}
          {!blattSchritt && s.blatt && <BlattKarte s={{ ref: 'blatt', h: '', rolle: 'uebung', min: 0 }} nr={s.nr} />}
          <div className="pg-ablauf-fuss">
            {s.schritte.some((x) => x.erkundung) && <p className="pg-leise pg-klein">„Neu ausprobiert“: bewusst etwas Neues neben dem Bewährten (etwa {Math.round((pg.vor.ich.erkundung ?? 0.2) * 100)} % der Stunde), damit sich nichts festfährt.</p>}
            <div className="pg-btnrow">
              {/* solange die Zeile „noch nicht gesichert“ oben steht, hat sie diesen Knopf – nicht zweimal derselbe */}
              {!speicherzeileNoetig(pg) && (
                <button type="button" className="pg-btn klein" onClick={() => pg.planSichern(plan, 'knopf')}>
                  <Ic n={pg.ohneKind ? 'datei' : 'speichern'} />
                  {pg.ohneKind ? 'Als Datei sichern' : (pg.profil?.gruppe?.length ?? 0) > 1 ? 'Bei allen Kindern speichern' : 'Beim Kind speichern'}
                </button>
              )}
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
                  Ganze Folge als PDF
                </button>
              )}
              {pg.schalter.teilen && pg.hubDa && (
                <button type="button" className="pg-btn klein" disabled={!tauschbar} title={tauschbar ? undefined : plan.n > 1 ? 'Teilen nach mindestens 3 gehaltenen Sitzungen' : 'Teilen, wenn du mindestens einen Teil selbst getauscht hast'} onClick={() => pg.setDlg({ art: 'teilen' })}>
                  <Ic n="teilen" />
                  Fürs Team teilen
                </button>
              )}
            </div>
            {pg.schalter.teilen && pg.hubDa && !tauschbar && <p className="pg-leise pg-klein">Teilen geht {plan.n > 1 ? 'nach mindestens drei gehaltenen Sitzungen' : 'bei Stunden, in denen du selbst etwas getauscht hast'}.</p>}
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
                  const tx = teilText(pg.katalog, b.ref, p.sprache.blatt, b.t)
                  const titel = tx.titel
                  return (
                    <li key={i + b.ref}>
                      <button type="button" className="haupt" onClick={() => pg.setDlg({ art: 'ersetzen', ort: { sitzung: s.nr, blatt: i } })} aria-label={`Blatt-Teil ${i + 1}: ${titel} – antippen für Alternativen`}>
                        {tx.art && <span className="art">{tx.art}</span>}
                        <span className="bt">
                          <FettCodes t={titel} />
                          <small>{tx.quelle ? `aus „${tx.quelle}“` : tx.text}{p.sprache.blatt === 'fr' && e && !e.sprache.fr ? ' · nur DE' : ''}</small>
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
              <p className="pg-leise pg-klein">Diese Stunde kommt ohne Blatt aus. Mit „Blatt anpassen“ kannst du trotzdem eins zusammenstellen.</p>
              <button type="button" className="pg-btn klein" onClick={() => pg.setAnsicht('baukasten')}>
                <Ic n="stift" />
                Blatt anpassen
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

/** „Warum diese Folge?“ – woraus der Plan entstanden ist (Kurs, Ziele und ihre Herkunft, Variante, Vorsicht, Interessen) */
function WarumFolge() {
  const pg = usePg()
  const p = useProfil()
  if (!pg.plan || !pg.katalog) return null
  const g = planGruende(pg.katalog, p, pg.plan)
  if (!g.punkte.length && !g.luecke) return null
  return (
    <details className="pg-warumfolge" open={pg.si === 0}>
      <summary>
        <Ic n="info" />
        Warum diese Folge?
      </summary>
      <ul>
        {g.punkte.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {g.luecke && <p className="pg-klein">{g.luecke}</p>}
      <button type="button" className="pg-link" onClick={() => pg.setAnsicht('wissen')}>
        Stimmt etwas nicht? In „Das weiß ich schon“ korrigieren
      </button>
    </details>
  )
}

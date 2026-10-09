// Passgenau – „Aus der Praxis“ (8): Bereich mit Filtern und Karten, Teilen mit Vorschau „Das wird geteilt“ und Prüfung
// eigener Texte (E-M6), Übernehmen mit Originaltexten (E-M7), Melden, Kuratieren für Berechtigte (E-M8).
import { useEffect, useMemo, useState } from 'react'
import type { KatalogEintrag, PraxisVorlage, TeamZaehler, VorlagenInhalt } from '../typen'
import * as K from './kern'
import * as hub from './hub'
import { teilenErlaubt, usePg, useProfil } from './zustand'
import { Ic } from './zeichen'
import { Chip, PgDialog, Pill } from './Teile'
import { inhaltVon, wertAnPfad } from './blattTeile'
import { FORMAT_NAME, themaName, zielKurz } from './texte'
import type { FachkraftVorlieben } from './vorlieben'

/** Zahlen ehrlich (E-M8): Prozent erst ab 10 Rückmeldungen, darunter „3 von 4“ */
export function quoteText(z: TeamZaehler): string {
  const r = z.geklappt + z.teils + z.nicht
  if (!r) return 'noch keine Rückmeldung'
  if (r < 10) return `${z.geklappt} von ${r} als gelungen angegeben`
  return `${Math.round((100 * z.geklappt) / r)} % hat geklappt (${r})`
}

const STATUS: Record<PraxisVorlage['status'], [string, 'ok' | 'warn' | 'akz' | undefined]> = {
  eingereicht: ['noch nicht geprüft', 'warn'],
  sichtbar: ['noch nicht geprüft', 'warn'],
  freigegeben: ['geprüft (Datenschutz, Machbarkeit)', 'ok'],
  offiziell: ['offiziell', 'akz'],
  ausgeblendet: ['ausgeblendet', undefined],
}
const geprueft = (v: PraxisVorlage) => v.status === 'freigegeben' || v.status === 'offiziell'
const BAENDER = ['3-5', '6-8', '9-11', '12-14', '15+']
function bandUeberlappt(band: string, alter: number): boolean {
  const [a, b] = band.replace('+', '-99').split('-').map(Number)
  return alter >= a - 1 && alter <= (b || 99) + 1
}
function refsVon(i: VorlagenInhalt | undefined): string[] {
  return (i?.sitzungen ?? []).flatMap((s) => [...s.schritte.map((x) => x.ref), ...(s.blatt?.bausteine.map((b) => b.ref) ?? [])])
}

export function Praxis() {
  const pg = usePg()
  const p = pg.profil
  const v = pg.vorname
  const [ziel, setZiel] = useState('')
  const [band, setBand] = useState('')
  const [art, setArt] = useState<'' | 'einzel' | 'folge'>('')
  const [dauer, setDauer] = useState<'' | 'kurz' | 'mittel' | 'lang'>('')
  const [pruefstand, setPruefstand] = useState<'geprueft' | 'offen'>('geprueft')
  const [passtSort, setPasstSort] = useState(!pg.ohneKind)
  useEffect(() => {
    if (!pg.praxis.geladen && !pg.praxis.laedt) pg.praxisLaden()
  }, [pg])
  const k = pg.katalog
  const passt = (x: PraxisVorlage) => {
    if (!p || pg.ohneKind || !geprueft(x)) return false
    if (!bandUeberlappt(x.altersband, p.alterJahre)) return false
    if (!x.ziele.some((z) => p.ziele.some((y) => y.code === z)) && !x.themen.some((t) => p.themen.some((y) => y.key === t))) return false
    // Vorsicht-Filter gilt auch hier (E-M7)
    if (k && p.vorsicht.length) {
      const es = refsVon(x.inhalt).map((r) => K.eintrag(k, r)).filter((e): e is KatalogEintrag => !!e)
      if (es.some((e) => (p.vorsicht.includes('trauma') && (e.merkmale?.wettbewerb || e.merkmale?.gewaltbezug)) || (p.vorsicht.includes('reiz') && e.merkmale?.laut) || (e.typ === 'baustein' && !!e.sensibel))) return false
    }
    return true
  }
  const liste = useMemo(() => {
    const l = pg.praxis.liste.filter((x) => {
      if (x.status === 'ausgeblendet' && !pg.kuratieren) return false
      if (pruefstand === 'geprueft' ? !geprueft(x) : geprueft(x)) return false
      if (ziel && !x.ziele.includes(ziel)) return false
      if (band && x.altersband !== band) return false
      if (art && (art === 'folge') !== x.n > 1) return false
      if (dauer && !(dauer === 'kurz' ? x.dauer <= 20 : dauer === 'mittel' ? x.dauer > 20 && x.dauer <= 30 : x.dauer > 30)) return false
      return true
    })
    // Sortierung: Passung zum Kind, dann Nutzung – nie nach Quote bei n < 10
    return l.sort((a, b) => (passtSort ? Number(passt(b)) - Number(passt(a)) : 0) || (b.zaehler?.n ?? 0) - (a.zaehler?.n ?? 0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pg.praxis.liste, ziel, band, art, dauer, pruefstand, passtSort, p, k])
  const zielAuswahl = [...new Set([...(p?.ziele.map((z) => z.code) ?? []), ...pg.praxis.liste.flatMap((x) => x.ziele)])].slice(0, 8)
  const teilenOk = teilenErlaubt(pg.plan, pg.plan ? pg.getauscht[pg.plan.id] ?? 0 : 0)

  const signal = (x: PraxisVorlage, art: hub.PraxisSignalArt) => {
    hub.praxisSignal(x.id, art).catch(() => {})
  }

  if (!pg.schalter.teilen)
    return (
      <div className="pg-mitte">
        <h1>Aus der Praxis</h1>
        <div className="pg-banner">
          <Ic n="info" />
          <div>„Aus der Praxis“ ist in diesem Hub ausgeschaltet.</div>
        </div>
      </div>
    )
  return (
    <>
      <section className="pg-kopf">
        <div>
          <div className="pg-eyebrow">Toolbox · Aus der Praxis</div>
          <h1>Sitzungen, die im Team geklappt haben</h1>
          <p className="pg-lead">Geteilt von Kolleginnen und Kollegen am selben Hub – anonymisiert, ohne Kinddaten. „Übernehmen“ passt eine Vorlage an {pg.ohneKind ? 'dein Profil' : v} an. Wer eine Vorlage einsetzt, bleibt fachlich verantwortlich.</p>
        </div>
        {pg.hubDa && (
          <button type="button" className="pg-btn" disabled={!teilenOk} title={teilenOk ? undefined : 'Erst eine Folge mit 3 gehaltenen Sitzungen oder eine Stunde mit eigenem Tausch'} onClick={() => pg.setDlg({ art: 'teilen' })}>
            <Ic n="teilen" />
            Eigene Stunde teilen
          </button>
        )}
      </section>
      {!pg.hubDa ? (
        <div className="pg-banner">
          <Ic n="info" />
          <div>„Aus der Praxis“ liegt verschlüsselt im Hub-Ordner. Öffne Passgenau aus dem Hub, um Vorlagen zu sehen und zu teilen.</div>
        </div>
      ) : (
        <>
          <div className="pg-card pg-filter">
            <div className="pg-chips" role="group" aria-label="Filter">
              <Chip an={pruefstand === 'geprueft'} onClick={() => setPruefstand('geprueft')}>
                geprüft
              </Chip>
              <Chip an={pruefstand === 'offen'} onClick={() => setPruefstand('offen')}>
                noch nicht geprüft
              </Chip>
              <span className="pg-trenner" />
              {zielAuswahl.map((z) => (
                <Chip key={z} an={ziel === z} onClick={() => setZiel(ziel === z ? '' : z)}>
                  {z}
                </Chip>
              ))}
              <span className="pg-trenner" />
              {BAENDER.map((b) => (
                <Chip key={b} an={band === b} onClick={() => setBand(band === b ? '' : b)}>
                  {b.replace('-', '–')} J.
                </Chip>
              ))}
              <span className="pg-trenner" />
              <Chip an={art === 'einzel'} onClick={() => setArt(art === 'einzel' ? '' : 'einzel')}>
                Einzelstunde
              </Chip>
              <Chip an={art === 'folge'} onClick={() => setArt(art === 'folge' ? '' : 'folge')}>
                Folge
              </Chip>
              <span className="pg-trenner" />
              {(
                [
                  ['kurz', 'bis 20 Min.'],
                  ['mittel', '30 Min.'],
                  ['lang', 'ab 45 Min.'],
                ] as const
              ).map(([d, t]) => (
                <Chip key={d} an={dauer === d} onClick={() => setDauer(dauer === d ? '' : d)}>
                  {t}
                </Chip>
              ))}
              {!pg.ohneKind && (
                <>
                  <span className="pg-trenner" />
                  <Chip an={passtSort} onClick={() => setPasstSort(!passtSort)}>
                    passt zu {v} zuerst
                  </Chip>
                </>
              )}
            </div>
          </div>
          {pg.praxis.laedt && <p className="pg-leise">Vorlagen werden geladen …</p>}
          {pg.praxis.fehler && pg.praxis.fehler !== 'ohne-hub' && <p className="pg-hinweisbox gelb">Vorlagen nicht erreichbar: {pg.praxis.fehler}</p>}
          <div className="pg-prgrid">
            {liste.map((x) => {
              const [st, stArt] = STATUS[x.status]
              const z = x.zaehler
              const r = z ? z.geklappt + z.teils + z.nicht : 0
              return (
                <article key={x.id} className="pg-card pg-pr">
                  <div className="zeile1">
                    {passt(x) && (
                      <Pill art="akz" icon="check">
                        passt zu {v}
                      </Pill>
                    )}
                    <Pill art={stArt}>{st}</Pill>
                    <button type="button" className="pg-ibtn melden" onClick={() => pg.setDlg({ art: 'melden', vorlage: x })} aria-label={`Melden: ${x.titel}`} title="Melden (Datenschutz, fachlich falsch, unpassend)">
                      <Ic n="fahne" />
                    </button>
                  </div>
                  <h3>{x.titel}</h3>
                  {x.fuerWen && <p className="pg-leise pg-klein pg-m0">{x.fuerWen}</p>}
                  <div className="pg-meta">
                    {x.n > 1 ? `Folge · ${x.n} Sitzungen` : 'Einzelstunde'} · {x.dauer} Min. · {x.altersband.replace('-', '–')} J.
                  </div>
                  <div className="pg-chips">
                    {x.ziele.length ? x.ziele.map((c) => <Pill key={c} art="akz">{c}</Pill>) : <Pill art="ok">ohne Förderziel</Pill>}
                    {x.themen.map((t) => (
                      <Pill key={t}>{themaName(t)}</Pill>
                    ))}
                  </div>
                  {x.formate.length > 0 && <div className="pg-klein pg-leise">{x.formate.slice(0, 4).map((f) => FORMAT_NAME[f] ?? f).join(' · ')}</div>}
                  <div className="zahlen">
                    <span>
                      <b>{z?.n ?? 0}×</b> genutzt
                    </span>
                    <span>{z ? r >= 10 ? <><b>{Math.round((100 * z.geklappt) / r)} %</b> hat geklappt ({r})</> : quoteText(z) : 'noch keine Rückmeldung'}</span>
                  </div>
                  {z && r >= 10 && (
                    <div className="pg-quote" aria-hidden="true">
                      <i style={{ width: Math.round((100 * z.geklappt) / r) + '%' }} />
                    </div>
                  )}
                  <div className="fuss">
                    <span className="pg-quelle">
                      <Ic n={x.von ? 'feder' : 'person'} />
                      {x.von ? 'von ' + x.von : 'anonym'}
                      {x.version > 1 ? ' · Version ' + x.version : ''}
                    </span>
                    <span className="pg-btnrow">
                      <button type="button" className="pg-ibtn" aria-label={`Daumen hoch: ${x.titel}`} onClick={() => { signal(x, 'hoch'); pg.hinweisZeigen('Danke – zählt fürs Team.') }}>
                        <Ic n="hoch" />
                      </button>
                      <button type="button" className="pg-ibtn" aria-label={`Daumen runter: ${x.titel}`} onClick={() => { signal(x, 'runter'); pg.hinweisZeigen('Gemerkt.') }}>
                        <Ic n="runter" />
                      </button>
                      {pg.kuratieren && (
                        <button type="button" className="pg-btn klein" onClick={() => pg.setDlg({ art: 'kuratieren', vorlage: x })}>
                          Prüfen
                        </button>
                      )}
                      <button type="button" className="pg-btn klein primaer" onClick={() => pg.setDlg({ art: 'uebernehmen', vorlage: x })}>
                        Übernehmen
                      </button>
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
          {!pg.praxis.laedt && !liste.length && <p className="pg-leise">Keine Vorlage zu diesen Filtern.</p>}
        </>
      )}
      <div className="pg-hinweisbox pg-mt2">
        <Ic n="schloss" />
        <span>Gespeichert verschlüsselt im Hub-Ordner (gemeinsam/passgenau-vorlagen). Zwischen Annexe-Hub und CDSE-Hub: Export und Import als Datei. Prüfung durch Responsable oder Kuratorin, Melden und Ausblenden möglich.</span>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------------------------------------------

type Entscheidung = 'original' | 'eigen' | 'weg'

/** Fürs Team teilen (8.1, 8.2, E-M6, E-M8) */
export function Teilen() {
  const pg = usePg()
  const p = useProfil()
  const plan = pg.plan!
  const k = pg.katalog!
  const ft = useMemo(() => K.fuerTeam(plan, p), [plan, p])
  const ziel = plan.ziele[0]
  const formate = ft.vorlage.formate.slice(0, 2).map((f) => (FORMAT_NAME[f] ?? f).replace(/e?n$/, ''))
  const vorschlaege = plan.weg === 'leicht' ? ['Leichte Stunde mit Wahlkarte', 'Ankommen, wenn nichts geht'] : [`${ziel ? zielKurz(ziel) : 'Stunde'} mit ${formate.join(' und ') || 'Bewegung'}`, plan.titel, plan.sitzungen[0]?.blatt?.titel ?? 'Mein Blatt'].filter((x, i, l) => x && l.indexOf(x) === i)
  const saetze = ['für Kinder, die schnell explodieren', 'für Einzelstunden mit viel Bewegung', 'für Kinder, die wenig schreiben', 'für schwere Tage']
  const geteilt = (pg.vor.ich as FachkraftVorlieben).geteilt ?? 0
  const [titel, setTitel] = useState(vorschlaege[0])
  const [satz, setSatz] = useState('')
  const [urheber, setUrheber] = useState<'name' | 'anonym'>('anonym')
  const [nurOriginal, setNurOriginal] = useState(true)
  const [entscheidung, setEntscheidung] = useState<Record<string, Entscheidung>>({})
  const [haken, setHaken] = useState<Record<string, boolean>>({})
  const [treffer, setTreffer] = useState<{ pfad: string; von: number; bis: number; art: string }[] | null>(null)
  const [laeuft, setLaeuft] = useState(false)
  const eigene = ft.eigeneTexte

  // Original eines eigenen Texts (Pfad „s<nr>.b<i>.<pfad>“)
  const original = (pfad: string): string => {
    const m = /^s(\d+)\.b(\d+)\.(.+)$/.exec(pfad)
    if (!m) return ''
    const s = plan.sitzungen.find((x) => x.nr === +m[1])
    const t = s?.blatt?.bausteine[+m[2]]
    const e = t ? K.eintrag(k, t.ref) : undefined
    return e ? wertAnPfad(inhaltVon(k, p, plan, +m[1], e, p.sprache.blatt), m[3]) ?? '' : ''
  }
  useEffect(() => {
    if (nurOriginal || !eigene.length || treffer || !pg.ref) return
    hub.praxisPruefen(pg.ref, ft.vorlage).then((r) => {
      setTreffer(r.treffer ?? [])
      // Vorgabe bei Treffern: „Originaltext nehmen“
      setEntscheidung((alt) => {
        const n = { ...alt }
        for (const t of r.treffer ?? []) if (!n[t.pfad]) n[t.pfad] = 'original'
        return n
      })
    }).catch(() => setTreffer([]))
  }, [nurOriginal, eigene.length, treffer, pg.ref, ft.vorlage])

  const entw = (): Omit<PraxisVorlage, 'id' | 'version' | 'status' | 'erstellt'> => {
    const inhalt: VorlagenInhalt = structuredClone(ft.vorlage.inhalt)
    inhalt.sitzungen.forEach((s, si) => {
      const nr = plan.sitzungen[si]?.nr ?? si + 1
      s.blatt?.bausteine.forEach((b, bi) => {
        if (!b.ueber) return
        for (const pf of Object.keys(b.ueber)) {
          const key = `s${nr}.b${bi}.${pf}`
          const e = nurOriginal ? 'original' : entscheidung[key] ?? 'eigen'
          if (e === 'original') delete b.ueber[pf]
          else if (e === 'weg') b.ueber[pf] = ''
          else b.ueberHerkunft = { ...b.ueberHerkunft, [pf]: 'eigen' }
        }
        if (!Object.keys(b.ueber).length) {
          delete b.ueber
          delete b.ueberHerkunft
        }
      })
    })
    return { ...ft.vorlage, titel: titel.trim() || vorschlaege[0], fuerWen: satz || undefined, von: urheber === 'anonym' ? null : `${pg.ich.name}${pg.ich.team ? ' · ' + pg.ich.team : ''}`, inhalt }
  }
  const zuTeilen = nurOriginal ? [] : eigene.filter((t) => (entscheidung[t.pfad] ?? 'eigen') === 'eigen')
  const ok = !!titel.trim() && zuTeilen.every((t) => haken[t.pfad])
  const nBausteine = refsVon(ft.vorlage.inhalt).length
  const aehnlich = pg.praxis.liste.find((x) => {
    const a = new Set(refsVon(x.inhalt)), b = refsVon(ft.vorlage.inhalt)
    return b.length && b.filter((r) => a.has(r)).length / b.length >= 0.7
  })
  const teilen = async () => {
    setLaeuft(true)
    try {
      const r = await hub.praxisTeilen(entw())
      pg.setVor((v) => ({ ...v, ich: { ...(v.ich as FachkraftVorlieben), geteilt: geteilt + 1 } }))
      pg.setPraxis((x) => ({ ...x, liste: [{ ...entw(), id: r.id, version: r.version, status: r.status, erstellt: new Date().toISOString().slice(0, 7) }, ...x.liste] }))
      pg.setDlg(null)
      pg.hinweisZeigen(r.status === 'eingereicht' ? 'Eingereicht – sichtbar nach der Prüfung durch die Kuratorin. Anonymisiert, ohne Kinddaten.' : 'Geteilt – für alle am Hub sichtbar.')
    } catch (e) {
      pg.hinweisZeigen('Teilen nicht möglich: ' + (e instanceof Error ? e.message : 'Hub antwortet nicht'), 'warn')
    } finally {
      setLaeuft(false)
    }
  }
  const markiert = (text: string, pfad: string) => {
    const t = (treffer ?? []).filter((x) => x.pfad === pfad).sort((a, b) => a.von - b.von)
    if (!t.length) return <>{text}</>
    const teile: React.ReactNode[] = []
    let i = 0
    t.forEach((x, j) => {
      teile.push(text.slice(i, x.von))
      teile.push(<mark key={j} className="pg-gelbmark" title={x.art}>{text.slice(x.von, x.bis)}</mark>)
      i = x.bis
    })
    teile.push(text.slice(i))
    return <>{teile}</>
  }
  return (
    <PgDialog
      titel="Fürs Team teilen"
      unter="Aus der Praxis – sichtbar für alle am selben Hub, nach Prüfung durch die Kuratorin."
      onClose={() => pg.setDlg(null)}
      breit
      fuss={
        <>
          <span className="links">
            <Ic n="schloss" /> verschlüsselt in gemeinsam/passgenau-vorlagen
          </span>
          <button type="button" className="pg-btn" onClick={() => pg.setDlg(null)}>
            Abbrechen
          </button>
          <button type="button" className="pg-btn primaer" disabled={!ok || laeuft} onClick={teilen}>
            <Ic n="teilen" />
            Teilen
          </button>
        </>
      }
    >
      <div>
        <label className="pg-klein-titel" htmlFor="pg-teilen-titel">
          Titel
        </label>
        <div className="pg-chips pg-mt">
          {vorschlaege.map((x) => (
            <Chip key={x} an={titel === x} onClick={() => setTitel(x)}>
              {x}
            </Chip>
          ))}
        </div>
        <input id="pg-teilen-titel" className="pg-feld pg-mt" value={titel} maxLength={60} onChange={(e) => setTitel(e.target.value)} />
      </div>
      <div>
        <b className="pg-klein-titel">
          Wofür, für wen? <span className="pg-leise">(optional)</span>
        </b>
        <div className="pg-chips pg-mt">
          {saetze.map((x) => (
            <Chip key={x} an={satz === x} onClick={() => setSatz(satz === x ? '' : x)}>
              {x}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <b className="pg-klein-titel">Urheberschaft</b>
        <div className="pg-chips pg-mt">
          <Chip an={urheber === 'anonym'} onClick={() => setUrheber('anonym')}>
            anonym
          </Chip>
          <Chip an={urheber === 'name'} onClick={() => setUrheber('name')}>
            von {pg.ich.name}
            {pg.ich.team ? ' · ' + pg.ich.team : ''}
          </Chip>
        </div>
        {urheber === 'anonym' && <p className="pg-leise pg-klein pg-m0 pg-mt">Anonym fürs Team – die Kuratorin kann dich über die verschlüsselte Kennung erreichen.</p>}
      </div>
      {aehnlich && (
        <div className="pg-hinweisbox">
          <Ic n="info" />
          <span>Es gibt schon eine ähnliche Vorlage: „{aehnlich.titel}“. Ergänzen statt neu? Du kannst trotzdem teilen.</span>
        </div>
      )}
      <div className="pg-geteilt">
        <b>Das wird geteilt</b>
        <ul>
          <li>
            <b>{titel || vorschlaege[0]}</b>
            {satz ? ' – ' + satz : ''} · {urheber === 'anonym' ? 'anonym' : `von ${pg.ich.name}`}
          </li>
          <li>
            abgeleitet aus den Bausteinen: {ft.vorlage.altersband.replace('-', '–')} Jahre · {ft.vorlage.ziele.length ? ft.vorlage.ziele.join(', ') : 'ohne Förderziel'} · {plan.dauer} Min. · {plan.n} {plan.n === 1 ? 'Sitzung' : 'Sitzungen'}
            {ft.vorlage.themen.length ? ' · ' + ft.vorlage.themen.map(themaName).join(', ') : ''}
          </li>
          <li>{nBausteine} Bausteine als Verweise (keine Kopien), Rituale als Vorschlag</li>
          <li>
            Platzhalter bleiben: <span className="pg-ph">{'{NAME}'}</span> · <span className="pg-ph">{'{INTERESSE}'}</span> · <span className="pg-ph">{'{WOCHENZIEL}'}</span>
          </li>
          <li className="pg-leise">
            weggelassen: <span className="pg-gestrichen">Begründungen</span>, <span className="pg-gestrichen">Rückmeldungen und Notizen</span>, <span className="pg-gestrichen">Daten und Tagesform</span>, <span className="pg-gestrichen">Vorname und Profil</span>
          </li>
        </ul>
      </div>
      <label className="pg-check">
        <input type="checkbox" checked={nurOriginal} onChange={(e) => setNurOriginal(e.target.checked)} />
        Nur Original-Bausteine teilen (keine eigenen Texte){geteilt < 3 ? ' – empfohlen für die ersten Male' : ''}
      </label>
      {!nurOriginal && eigene.length > 0 && (
        <div className="pg-hinweisbox gelb">
          <Ic n="info" />
          <div className="pg-breit">
            <b>
              {eigene.length} eigene{eigene.length === 1 ? 'r' : ''} Text{eigene.length === 1 ? '' : 'e'}
              {treffer === null ? ' – Prüfung im Hub läuft …' : treffer.length ? ` · Prüfung im Hub: ${treffer.length} Treffer` : ' · Prüfung im Hub: keine Treffer'}
            </b>
            {eigene.map((t) => {
              const e = entscheidung[t.pfad] ?? 'eigen'
              const orig = original(t.pfad)
              return (
                <div key={t.pfad} className="pg-diff">
                  <div className="neu">
                    <small>dein Text</small>„{markiert(t.text, t.pfad)}“
                  </div>
                  <div className="alt">
                    <small>Original der Toolbox</small>„{orig}“
                  </div>
                  <div className="pg-chips">
                    {(
                      [
                        ['original', 'Originaltext nehmen'],
                        ['eigen', 'meinen Text teilen'],
                        ['weg', 'entfernen'],
                      ] as [Entscheidung, string][]
                    ).map(([w, l]) => (
                      <Chip key={w} an={e === w} onClick={() => setEntscheidung((x) => ({ ...x, [t.pfad]: w }))}>
                        {l}
                      </Chip>
                    ))}
                  </div>
                  {e === 'eigen' && (
                    <label className="pg-check klein">
                      <input type="checkbox" checked={!!haken[t.pfad]} onChange={(ev) => setHaken((h) => ({ ...h, [t.pfad]: ev.target.checked }))} />
                      Kein Kind erkennbar (keine Namen, Orte, Daten, Besonderheiten)
                    </label>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
      {!nurOriginal && !eigene.length && <p className="pg-leise pg-klein pg-m0">Du hast keine Texte geändert – es werden nur Original-Bausteine geteilt.</p>}
    </PgDialog>
  )
}

/** Für das Kind übernehmen (8.4, E-M7) */
export function Uebernehmen({ vorlage }: { vorlage: PraxisVorlage }) {
  const pg = usePg()
  const p = useProfil()
  const k = pg.katalog!
  const erg = useMemo(() => K.uebernehmen(k, p, vorlage, pg.vor), [k, p, vorlage, pg.vor])
  const gesperrt = p.vorsicht.length > 0
  const fremde = erg.plan.sitzungen.flatMap((s) =>
    (s.blatt?.bausteine ?? []).flatMap((b, i) => Object.entries(b.ueber ?? {}).map(([pfad, text]) => ({ key: `${s.nr}.${i}.${pfad}`, nr: s.nr, i, pfad, text, ref: b.ref }))),
  )
  const [behalten, setBehalten] = useState<Record<string, boolean>>({})
  const originalText = (f: (typeof fremde)[number]) => {
    const e = K.eintrag(k, f.ref)
    return e ? wertAnPfad(inhaltVon(k, p, erg.plan, f.nr, e, p.sprache.blatt), f.pfad) ?? '' : ''
  }
  const oeffnen = () => {
    const plan = {
      ...erg.plan,
      sitzungen: erg.plan.sitzungen.map((s) => ({
        ...s,
        blatt: s.blatt
          ? {
              ...s.blatt,
              bausteine: s.blatt.bausteine.map((b, i) => {
                if (!b.ueber) return b
                const ueber: Record<string, string> = {}
                const herkunft: Record<string, 'eigen' | 'vorlage'> = {}
                for (const [pf, t] of Object.entries(b.ueber)) if (!gesperrt && behalten[`${s.nr}.${i}.${pf}`]) { ueber[pf] = t; herkunft[pf] = 'vorlage' }
                const { ueber: _u, ueberHerkunft: _h, ...rest } = b
                void _u
                void _h
                return Object.keys(ueber).length ? { ...rest, ueber, ueberHerkunft: herkunft } : rest
              }),
            }
          : null,
      })),
    }
    pg.setPlan(plan)
    pg.setSi(0)
    hub.praxisSignal(vorlage.id, 'genutzt').catch(() => {})
    pg.setAnsicht('baukasten')
    pg.hinweisZeigen(`„${vorlage.titel}“ für ${pg.vorname} übernommen – alles bleibt änderbar.`)
  }
  return (
    <PgDialog
      titel={`Für ${pg.vorname} übernehmen`}
      unter={`„${vorlage.titel}“ · ${vorlage.n > 1 ? `Folge · ${vorlage.n} Sitzungen` : 'Einzelstunde'} · ${vorlage.von ? 'von ' + vorlage.von : 'anonym'}`}
      onClose={() => pg.setDlg(null)}
      schmal
      fuss={
        <>
          <button type="button" className="pg-btn" onClick={() => pg.setDlg(null)}>
            Abbrechen
          </button>
          <button type="button" className="pg-btn primaer" onClick={oeffnen}>
            <Ic n="stift" />
            Im Baukasten öffnen
          </button>
        </>
      }
    >
      <div className="pg-geteilt">
        <b>Automatisch angepasst</b>
        <ul>
          {erg.angepasst.map((a) => (
            <li key={a}>{a.split(/(\{[A-Z]+\})/).map((x, i) => (i % 2 ? <span key={i} className="pg-ph">{x}</span> : x))}</li>
          ))}
        </ul>
      </div>
      {fremde.length > 0 && (
        <div className="pg-geteilt">
          <b>Texte der Autorin ({fremde.length})</b>
          {gesperrt && <p className="pg-hinweisbox gelb klein">Texte der Autorin sind nicht auf die Vorsicht bei {pg.vorname} geprüft – es gelten die Originaltexte.</p>}
          {fremde.map((f) => (
            <div key={f.key} className="pg-diff">
              <div className="neu">
                <small>Text der Autorin</small>„{f.text}“
              </div>
              <div className="alt">
                <small>Original der Toolbox</small>„{originalText(f)}“
              </div>
              {!gesperrt && (
                <div className="pg-chips">
                  <Chip an={!behalten[f.key]} onClick={() => setBehalten((b) => ({ ...b, [f.key]: false }))}>
                    Original nehmen
                  </Chip>
                  <Chip an={!!behalten[f.key]} onClick={() => setBehalten((b) => ({ ...b, [f.key]: true }))}>
                    Text der Autorin behalten
                  </Chip>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="pg-leise pg-klein pg-m0">Alles bleibt im Baukasten änderbar. Gespeichert wird ein eigener Plan mit Verweis auf die Vorlage (Version {vorlage.version}).</p>
    </PgDialog>
  )
}

export function Melden({ vorlage }: { vorlage: PraxisVorlage }) {
  const pg = usePg()
  const [grund, setGrund] = useState<'' | 'datenschutz' | 'fachlich' | 'unpassend'>('')
  const melden = () => {
    if (!grund) return
    hub.praxisSignal(vorlage.id, ('melden-' + grund) as hub.PraxisSignalArt).catch(() => {})
    if (grund === 'datenschutz') pg.setPraxis((x) => ({ ...x, liste: x.liste.map((v) => (v.id === vorlage.id ? { ...v, status: 'ausgeblendet' } : v)) }))
    pg.setDlg(null)
    pg.hinweisZeigen(grund === 'datenschutz' ? 'Gemeldet – sofort ausgeblendet, Responsable und Datenschutz-Ansprechperson werden informiert.' : 'Gemeldet – die Kuratorin prüft.')
  }
  return (
    <PgDialog
      titel="Vorlage melden"
      unter={`„${vorlage.titel}“`}
      onClose={() => pg.setDlg(null)}
      schmal
      fuss={
        <>
          <button type="button" className="pg-btn" onClick={() => pg.setDlg(null)}>
            Abbrechen
          </button>
          <button type="button" className="pg-btn primaer" disabled={!grund} onClick={melden}>
            <Ic n="fahne" />
            Melden
          </button>
        </>
      }
    >
      <div className="pg-chips">
        <Chip an={grund === 'datenschutz'} onClick={() => setGrund('datenschutz')}>
          Datenschutz
        </Chip>
        <Chip an={grund === 'fachlich'} onClick={() => setGrund('fachlich')}>
          fachlich falsch
        </Chip>
        <Chip an={grund === 'unpassend'} onClick={() => setGrund('unpassend')}>
          unpassend
        </Chip>
      </div>
      <p className="pg-leise pg-klein pg-m0">Eine Datenschutz-Meldung blendet die Vorlage sofort aus; zwei andere Meldungen ebenfalls, bis zur Prüfung. Gedruckte Blätter lassen sich nicht zurückholen.</p>
    </PgDialog>
  )
}

export function Kuratieren({ vorlage }: { vorlage: PraxisVorlage }) {
  const pg = usePg()
  const k = pg.katalog!
  const [haken, setHaken] = useState<Record<string, boolean>>({})
  const PUNKTE = ['Datenschutz (Texte gelesen)', 'Alter und Belastung stimmig', 'roter Faden', 'keine Wirksamkeitsbehauptung']
  const eintraege = refsVon(vorlage.inhalt).map((r) => K.eintrag(k, r)).filter((e): e is KatalogEintrag => !!e)
  const schwer = eintraege.some((e) => e.belastung >= 2 || (e.typ === 'baustein' && !!e.sensibel))
  const darf = !schwer || pg.nutzer.rolle === 'responsable' || pg.nutzer.rolle === 'admin' || /psycholog/i.test(pg.hallo?.ich?.funktion ?? '')
  const texte = (vorlage.inhalt?.sitzungen ?? []).flatMap((s, si) => (s.blatt?.bausteine ?? []).flatMap((b) => Object.entries(b.ueber ?? {}).map(([pf, t]) => ({ key: `${si}.${b.ref}.${pf}`, t, ref: b.ref, pf }))))
  const aktion = async (a: 'freigeben' | 'ausblenden' | 'offiziell') => {
    try {
      const r = await hub.praxisKuratieren(vorlage.id, a)
      pg.setPraxis((x) => ({ ...x, liste: x.liste.map((v) => (v.id === vorlage.id ? { ...v, status: r.status } : v)) }))
      pg.setDlg(null)
      pg.hinweisZeigen(a === 'freigeben' ? 'Geprüft – für alle sichtbar (diese Version).' : a === 'ausblenden' ? 'Ausgeblendet.' : 'Als offiziell vorgeschlagen.')
    } catch (e) {
      pg.hinweisZeigen('Nicht möglich: ' + (e instanceof Error ? e.message : 'Hub antwortet nicht'), 'warn')
    }
  }
  return (
    <PgDialog
      titel="Vorlage prüfen"
      unter={`„${vorlage.titel}“ · Version ${vorlage.version} · ${STATUS[vorlage.status][0]}`}
      onClose={() => pg.setDlg(null)}
      breit
      fuss={
        <>
          <button type="button" className="pg-btn" onClick={() => aktion('ausblenden')}>
            Ausblenden
          </button>
          {vorlage.status === 'freigegeben' && (
            <button type="button" className="pg-btn" onClick={() => aktion('offiziell')}>
              Als offiziell vorschlagen
            </button>
          )}
          <button type="button" className="pg-btn primaer" disabled={!darf || PUNKTE.some((x) => !haken[x])} onClick={() => aktion('freigeben')}>
            <Ic n="check" />
            Geprüft – freigeben
          </button>
        </>
      }
    >
      <div className="pg-geteilt">
        <b>Geänderte Texte ({texte.length})</b>
        {texte.length ? (
          texte.map((x) => {
            const e = K.eintrag(k, x.ref)
            return (
              <div key={x.key} className="pg-diff">
                <div className="neu">
                  <small>Text der Autorin</small>„{x.t}“
                </div>
                <div className="alt">
                  <small>Original</small>„{e && pg.profil && pg.plan ? wertAnPfad(inhaltVon(k, pg.profil, pg.plan, pg.plan.sitzungen[0].nr, e, 'de'), x.pf) ?? '' : '–'}“
                </div>
              </div>
            )
          })
        ) : (
          <p className="pg-leise pg-m0">Keine – nur Original-Bausteine.</p>
        )}
      </div>
      <div className="pg-geteilt">
        <b>Bausteine ({eintraege.length})</b>
        <ul>
          {eintraege.map((e, i) => (
            <li key={e.id + i}>
              {K.textVon(e, 'de').titel}
              {e.belastung >= 1 && <Pill art="warn">Belastung {e.belastung}</Pill>}
              {e.typ === 'baustein' && e.sensibel && <Pill art="bad">sensibel</Pill>}
            </li>
          ))}
        </ul>
      </div>
      <div className="pg-chips">
        {PUNKTE.map((x) => (
          <label key={x} className="pg-check">
            <input type="checkbox" checked={!!haken[x]} onChange={(ev) => setHaken((h) => ({ ...h, [x]: ev.target.checked }))} />
            {x}
          </label>
        ))}
      </div>
      {!darf && <p className="pg-hinweisbox gelb klein">Diese Vorlage enthält belastende oder sensible Bausteine – freigeben dürfen nur Psychologin oder Responsable.</p>}
    </PgDialog>
  )
}

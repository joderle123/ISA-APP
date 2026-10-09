// Passgenau – die drei Wege: Gründlich (2.3), Schnell für heute (2.4), Heute geht nicht viel (2.5). Kein Freitext.
import { useState } from 'react'
import type { Auftrag, FormatWunsch, Profil, Schwerpunkt, Tagesform } from '../typen'
import { usePg, useProfil } from './zustand'
import { Ic } from './zeichen'
import { Chip, HeikelBanner, VersionsBanner } from './Teile'
import { BOGEN_ANZEIGE, FORMAT_WUNSCH, LAYOUT_NAME, PHASE_KURZ, PHASE_NAME, SCHWERPUNKTE, SOZIALFORM_NAME, TAGESFORM, THEMA_NAME, heuteIso, zielKurz } from './texte'

type Dauer = Auftrag['dauer']
const DAUERN: Dauer[] = [10, 15, 20, 30, 45, 60]

/** Dauer-Vorbelegung nach Alter (P3): ≤ 5 J. 15, 6–8 J. 20, ab 9 J. die der letzten Folge, sonst 30; Psychologin 45 */
/** Sozialform (Aufgabe 151): Einzel, zu zweit, Kleingruppe – in einer Gruppe aus dem Hub vorbelegt */
function SozialformWahl({ mt }: { mt?: boolean }) {
  const pg = usePg()
  const n = useProfil().gruppe?.length ?? 0
  return (
    <div className={'pg-chips' + (mt ? ' pg-mt' : '')} role="group" aria-label="Sozialform">
      {(['einzeln', 'zu-zweit', 'kleingruppe'] as const).map((f) => (
        <Chip key={f} an={pg.sozialform === f} disabled={n > 1 && f === 'einzeln'} titel={n > 1 && f === 'einzeln' ? 'mehrere Kinder gewählt' : undefined} onClick={() => pg.setSozialform(f)}>
          {SOZIALFORM_NAME[f]}
        </Chip>
      ))}
    </div>
  )
}

export function dauerVorgabe(p: Profil, funktion?: string, letzte?: number): Dauer {
  if (p.alterJahre <= 5) return 15
  if (p.alterJahre <= 8) return 20
  if (letzte && DAUERN.includes(letzte as Dauer)) return letzte as Dauer
  if (funktion && /psycholog/i.test(funktion)) return 45
  return 30
}

/** Blatt mit/ohne (P2): ≤ 5 J. ohne; Kind schreibt ungern (Zähler deutlich negativ) → ohne; sonst mit */
function blattVorgabe(p: Profil): 'mit' | 'ohne' {
  return blattGrund(p) ? 'ohne' : 'mit'
}
function blattGrund(p: Profil): string | null {
  if (p.alterJahre <= 5) return 'bis 5 Jahre: ohne Blatt vorgewählt'
  const z = p.vorlieben?.z['format:schreiben']
  if (z && z.b > z.a * 2 && z.a + z.b >= 3) return `ohne vorgewählt: Schreiben kam bei ${p.vorname ?? 'dem Kind'} bisher nicht gut an`
  return null
}

/** Schwerpunkt aus den Zielen (2.3 Schritt 3) */
function schwerpunktAus(ziele: string[]): Schwerpunkt[] {
  const c = ziele[0] ?? ''
  if (c.startsWith('V-')) return ['ueben', 'uebertragen']
  if (c.startsWith('K-')) return ['verstehen', 'ueben']
  if (c.startsWith('SOZ-')) return ['ueben', 'beziehung']
  return ['verstehen']
}

/** Formate-Mix aus den Vorlieben des Kindes (nicht der Fachkraft, S3e) */
function formateAus(p: Profil): FormatWunsch[] {
  const z = p.vorlieben?.z ?? {}
  const r: FormatWunsch[] = []
  const gut = (k: string) => z[k] && z[k].a > z[k].b * 1.5 && z[k].a >= 2
  if (gut('format:bewegung')) r.push('bewegung')
  if (gut('format:malen') || gut('format:comic') || gut('format:basteln')) r.push('kreativ')
  if (gut('format:spiel')) r.push('spiel')
  if (p.zugang.schreiben <= 1 || (z['format:schreiben'] && z['format:schreiben'].b > z['format:schreiben'].a)) r.push('wenig-schreiben')
  return r
}

const KOMPETENZEN = ['Gefühle erkennen', 'Gefühle ausdrücken', 'Selbstregulation', 'Impulskontrolle', 'Aufmerksamkeit', 'Ausdauer/Arbeitsverhalten', 'Kooperation', 'Konflikte', 'Kommunikation', 'Selbstbild', 'Lernstrategien', 'Alltag/Selbstständigkeit']
const THEMEN_DUENN = ['wut', 'angst', 'freundschaft', 'trauer', 'schule', 'selbstwert', 'konzentration', 'medien', 'veraenderung']

/** „Worum soll es heute gehen?“ (T-M5) – bei dünnen Daten statt eines Ziels */
function WorumKarte({ thema, setThema, kennenlernen, setKennenlernen }: { thema: string[]; setThema: (t: string[]) => void; kennenlernen: boolean; setKennenlernen: (b: boolean) => void }) {
  const umschalten = (t: string) => {
    setKennenlernen(false)
    setThema(thema.includes(t) ? thema.filter((x) => x !== t) : thema.length < 2 ? [...thema, t] : [thema[1], t])
  }
  return (
    <div>
      <p className="pg-leise pg-klein">Noch keine Förderziele im Dossier. Wähle ein oder zwei Schwerpunkte – oder plane eine erste Stunde zum Kennenlernen.</p>
      <div className="pg-chips pg-mt">
        {KOMPETENZEN.map((k) => (
          <Chip key={k} an={thema.includes('kompetenz:' + k)} onClick={() => umschalten('kompetenz:' + k)}>
            {k}
          </Chip>
        ))}
      </div>
      <div className="pg-chips pg-mt">
        {THEMEN_DUENN.map((t) => (
          <Chip key={t} an={thema.includes(t)} onClick={() => umschalten(t)}>
            {THEMA_NAME[t] ?? t}
          </Chip>
        ))}
      </div>
      <div className="pg-chips pg-mt">
        <Chip an={kennenlernen} onClick={() => { setKennenlernen(!kennenlernen); setThema([]) }}>
          Ohne Schwerpunkt (erste Stunde zum Kennenlernen)
        </Chip>
      </div>
    </div>
  )
}

function WissenZeile() {
  const pg = usePg()
  const p = useProfil()
  return (
    <button type="button" className="pg-wissenzeile" onClick={() => pg.setAnsicht('wissen')}>
      <Ic n="person" />
      <span>
        <b>Das weiß ich schon:</b> {p.alterJahre} J., {p.sprache.blatt.toUpperCase()}
        {p.ziele.length ? ', ' + p.ziele.slice(0, 3).map((z) => z.code).join(', ') : ''}
        {p.interessen.length ? ' …' : ''}
      </span>
      <span className="pg-link">ändern</span>
    </button>
  )
}

export function Gruendlich() {
  const pg = usePg()
  const p = useProfil()
  const v = pg.vorname
  const duenn = p.ziele.length === 0 || p.dichte === 'duenn'
  const letzteFolge = pg.verlauf.plaene.find((x) => x.n > 1)
  const [ziele, setZiele] = useState<string[]>(() => {
    const l = p.ziele.slice(0, 2).map((z) => z.code)
    if (pg.startZiel && p.ziele.some((z) => z.code === pg.startZiel)) return [pg.startZiel, ...l.filter((c) => c !== pg.startZiel)].slice(0, 3)
    return l
  })
  const [thema, setThema] = useState<string[]>([])
  const [kennenlernen, setKennenlernen] = useState(false)
  const [n, setN] = useState(letzteFolge?.n ?? (duenn ? 3 : 6))
  const [dauer, setDauer] = useState<Dauer>(() => dauerVorgabe(p, pg.hallo?.ich?.funktion, letzteFolge?.dauer))
  const [blatt, setBlatt] = useState<'mit' | 'ohne'>(() => blattVorgabe(p))
  const [schwerpunkt, setSchwerpunkt] = useState<Schwerpunkt[]>(() => schwerpunktAus(p.ziele.map((z) => z.code)))
  const [formate, setFormate] = useState<FormatWunsch[]>(() => formateAus(p))
  const [heuteAn, setHeuteAn] = useState(false)
  const [heute, setHeute] = useState({ energie: 4, konzentration: 4, stimmung: 4 })
  const bogen = BOGEN_ANZEIGE[n] ?? BOGEN_ANZEIGE[6]
  const bereit = duenn ? thema.length > 0 || kennenlernen : ziele.length > 0
  const toggle = <T,>(l: T[], x: T) => (l.includes(x) ? l.filter((y) => y !== x) : [...l, x])
  const bauen = () =>
    pg.planBauen({
      weg: 'gruendlich', ziele: duenn ? [] : ziele, n, dauer, sozialform: 'einzeln', schwerpunkt, formate, blatt,
      heute: heuteAn ? heute : undefined, sprache: p.sprache.blatt, datum: heuteIso(), thema: duenn ? thema : undefined,
    })
  return (
    <>
      <section className="pg-kopf">
        <div>
          <div className="pg-eyebrow">Weg 1 · Gründlich planen</div>
          <h1>Eine Folge für {v}</h1>
          <p className="pg-lead">Alles ist vorausgefüllt – meistens reicht „Folge bauen“. Jede Sitzung baut auf der vorigen auf.</p>
        </div>
        <span className="pg-uhrhinweis">
          <Ic n="uhr" />
          meist unter 3 Minuten
        </span>
      </section>
      <VersionsBanner />
      <div className="pg-fgrid">
        <div className="pg-card">
          <div className="pg-fblock">
            <h3>
              <span className="nr">1</span>
              {duenn ? 'Worum soll es gehen?' : 'Ziele'}
            </h3>
            {duenn ? (
              <WorumKarte thema={thema} setThema={setThema} kennenlernen={kennenlernen} setKennenlernen={setKennenlernen} />
            ) : (
              <>
                <p className="pg-leise pg-klein">Reihenfolge = Priorität. Vorausgewählt aus PEI und Themen der letzten 14 Tage.</p>
                <div className="pg-chips">
                  {p.ziele.map((z) => {
                    const i = ziele.indexOf(z.code)
                    return (
                      <Chip key={z.code} an={i >= 0} klein={z.quelle === 'pei' ? 'PEI' : z.quelle === 'vorgemerkt' ? 'vorgemerkt' : undefined} onClick={() => setZiele((l) => (i >= 0 ? l.filter((c) => c !== z.code) : l.length < 3 ? [...l, z.code] : l))}>
                        {i >= 0 ? `${i + 1}. ` : ''}
                        <b>{z.code}</b>&nbsp;{zielKurz(z.code)}
                      </Chip>
                    )
                  })}
                </div>
              </>
            )}
          </div>
          <div className="pg-fblock">
            <h3>
              <span className="nr">2</span>Rahmen
            </h3>
            <p className="pg-leise pg-klein">Sitzungen · Dauer · Blatt · Sozialform</p>
            <div className="pg-chips pg-mb" role="group" aria-label="Anzahl Sitzungen">
              {[1, 3, 4, 6, 8, 10].map((x) => (
                <Chip key={x} an={n === x} onClick={() => setN(x)}>
                  {x} {x === 1 ? 'Sitzung' : 'Sitzungen'}
                </Chip>
              ))}
            </div>
            <div className="pg-chips pg-mb" role="group" aria-label="Dauer">
              {DAUERN.map((d) => (
                <Chip key={d} an={dauer === d} onClick={() => setDauer(d)}>
                  {d} Min.
                </Chip>
              ))}
            </div>
            <div className="pg-chips pg-mb" role="group" aria-label="Blatt">
              <Chip an={blatt === 'mit'} onClick={() => setBlatt('mit')}>
                mit Blatt
              </Chip>
              <Chip an={blatt === 'ohne'} onClick={() => setBlatt('ohne')}>
                ohne Blatt
              </Chip>
              {blattGrund(p) && <span className="pg-leise pg-klein pg-mitte-v">{blattGrund(p)}</span>}
            </div>
            <SozialformWahl />
          </div>
          <div className="pg-fblock">
            <h3>
              <span className="nr">3</span>Schwerpunkt
            </h3>
            <p className="pg-leise pg-klein">Aus den Zielen abgeleitet{ziele[0] ? ` (${ziele[0]} → ${schwerpunktAus(ziele).map((s) => SCHWERPUNKTE.find((x) => x[0] === s)?.[1]).join(' und ')})` : ''}.</p>
            <div className="pg-chips">
              {SCHWERPUNKTE.map(([s, t]) => (
                <Chip key={s} an={schwerpunkt.includes(s)} onClick={() => setSchwerpunkt((l) => toggle(l, s))}>
                  {t}
                </Chip>
              ))}
            </div>
          </div>
          <div className="pg-fblock">
            <h3>
              <span className="nr">4</span>Formate-Mix
            </h3>
            <p className="pg-leise pg-klein">Vorausgewählt aus dem, was bei {v} klappt.</p>
            <div className="pg-chips">
              {FORMAT_WUNSCH.map(([f, t]) => (
                <Chip key={f} an={formate.includes(f)} onClick={() => setFormate((l) => toggle(l, f))}>
                  {t}
                </Chip>
              ))}
            </div>
          </div>
          <div className="pg-fblock">
            <h3>
              <span className="nr">5</span>Heute <span className="pg-leise pg-klein">(optional, für Sitzung 1)</span>
            </h3>
            <Chip an={heuteAn} onClick={() => setHeuteAn(!heuteAn)}>
              Tagesform für Sitzung 1 einstellen
            </Chip>
            {heuteAn && <ReglerBlock heute={heute} setHeute={setHeute} vorname={v} />}
          </div>
        </div>
        <div className="pg-card pg-sticky">
          <h2>So wird die Folge</h2>
          <div className="pg-bogenleiste" aria-label="Bogen der Folge">
            {bogen.slice(0, n).map((b, i) => (
              <span key={i} title={PHASE_NAME[b]}>
                {i + 1}
                <br />
                {PHASE_KURZ[b]}
              </span>
            ))}
          </div>
          <dl className="pg-dl">
            <dt>{duenn ? 'Schwerpunkt' : 'Ziele'}</dt>
            <dd>{duenn ? (kennenlernen ? 'Kennenlernen' : thema.map((t) => t.replace('kompetenz:', '')).map((t) => THEMA_NAME[t] ?? t).join(', ') || <span className="pg-leise">bitte eins wählen</span>) : ziele.length ? ziele.join(', ') : <span className="pg-leise">bitte eins wählen</span>}</dd>
            <dt>Umfang</dt>
            <dd>
              {n} × {dauer} Min. · {SOZIALFORM_NAME[pg.sozialform]}
            </dd>
            <dt>Rituale</dt>
            <dd>gleich in jeder Sitzung</dd>
            <dt>Blätter</dt>
            <dd>{blatt === 'mit' && dauer >= 20 ? 'je Sitzung eins, aus Bausteinen' : 'ohne Blatt'}</dd>
            <dt>Gestaltung</dt>
            <dd>
              {p.stufen.join(', ')} · {LAYOUT_NAME[p.layout]}
            </dd>
          </dl>
          <button type="button" className="pg-btn primaer gross breit pg-mt2" disabled={!bereit} onClick={bauen}>
            <Ic n="liste" />
            Folge bauen
          </button>
          <p className="pg-leise pg-klein pg-mt">Ohne KI, im Browser gerechnet – gleiche Angaben, gleicher Plan. Du kannst danach jeden Teil tauschen.</p>
        </div>
      </div>
    </>
  )
}

const REGLER: [keyof Heute, string, string, string, string][] = [
  ['energie', 'Energie', 'Wie viel Energie hat {v} heute?', 'sehr müde', 'sehr aufgedreht'],
  ['konzentration', 'Konzentration', 'Wie lange kann {v} heute bei einer Sache bleiben?', 'kaum', 'lange'],
  ['stimmung', 'Stimmung', 'Wie geht es {v} heute?', 'sehr schlecht', 'sehr gut'],
]
type Heute = { energie: number; konzentration: number; stimmung: number }

function Regler({ k, titel, frage, links, rechts, wert, onWert }: { k: string; titel: string; frage: string; links: string; rechts: string; wert: number; onWert: (n: number) => void }) {
  const id = 'pg-r-' + k
  return (
    <div className="pg-regler">
      <label htmlFor={id}>
        {titel}
        <small>{frage}</small>
      </label>
      <div className="bahn">
        <input id={id} type="range" min={1} max={7} step={1} value={wert} aria-valuetext={`${wert} von 7 – ${wert <= 2 ? links : wert >= 6 ? rechts : 'mittel'}`} onChange={(e) => onWert(+e.target.value)} />
        <div className="ticks" aria-hidden="true">
          {[1, 2, 3, 4, 5, 6, 7].map((t) => (
            <button key={t} type="button" tabIndex={-1} className={t === wert ? 'an' : ''} onClick={() => onWert(t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="skalatext">
          <span>{links}</span>
          <span>{rechts}</span>
        </div>
      </div>
      <output htmlFor={id}>{wert}</output>
    </div>
  )
}

function ReglerBlock({ heute, setHeute, vorname }: { heute: Heute; setHeute: (h: Heute) => void; vorname: string }) {
  const VOR: [string, Heute][] = [
    ['normal', { energie: 4, konzentration: 4, stimmung: 4 }],
    ['müde', { energie: 3, konzentration: 3, stimmung: 3 }],
    ['aufgewühlt', { energie: 6, konzentration: 2, stimmung: 2 }],
    ['angespannt', { energie: 4, konzentration: 3, stimmung: 3 }],
  ]
  return (
    <div className="pg-reglerblock">
      <div className="pg-chips" role="group" aria-label="Voreinstellung">
        {VOR.map(([t, h]) => (
          <Chip key={t} an={heute.energie === h.energie && heute.konzentration === h.konzentration && heute.stimmung === h.stimmung} onClick={() => setHeute(h)}>
            {t === 'normal' ? 'Alles normal' : t}
          </Chip>
        ))}
      </div>
      {REGLER.map(([k, titel, frage, l, r]) => (
        <Regler key={k} k={k} titel={titel} frage={frage.replace('{v}', vorname)} links={l} rechts={r} wert={heute[k]} onWert={(n) => setHeute({ ...heute, [k]: n })} />
      ))}
    </div>
  )
}

export function Schnell() {
  const pg = usePg()
  const p = useProfil()
  const v = pg.vorname
  const f = p.folge && p.folge.gehalten < p.folge.n ? p.folge : null
  const duenn = p.ziele.length === 0 || p.dichte === 'duenn'
  const [heute, setHeute] = useState<Heute>({ energie: 4, konzentration: 4, stimmung: 4 })
  const letzte = (pg.vor.ich as { dauer?: number }).dauer
  const [dauer, setDauer] = useState<Dauer>(() => dauerVorgabe(p, pg.hallo?.ich?.funktion, letzte ?? pg.verlauf.plaene.find((x) => x.id === f?.id)?.dauer))
  const [blatt, setBlatt] = useState<'mit' | 'ohne'>(() => blattVorgabe(p))
  const [weiter, setWeiter] = useState(true)
  const [thema, setThema] = useState<string[]>([])
  const [kennenlernen, setKennenlernen] = useState(false)
  const tief = [heute.energie, heute.konzentration, heute.stimmung].filter((x) => x <= 2).length >= 2
  const bereit = !duenn || thema.length > 0 || kennenlernen
  const ziele = pg.startZiel && p.ziele.some((z) => z.code === pg.startZiel) ? [pg.startZiel] : []
  const bauen = () =>
    pg.planBauen(
      { weg: 'schnell', ziele, n: 1, dauer, sozialform: 'einzeln', heute, blatt, sprache: p.sprache.blatt, datum: heuteIso(), thema: duenn ? thema : undefined },
      { profilOhneFolge: !(f && weiter) },
    )
  return (
    <div className="pg-mitte">
      <div className="pg-eyebrow">Weg 2 · Schnell für heute</div>
      <h1>{v} heute</h1>
      <p className="pg-lead pg-mb">Drei Regler, ein Klick. Der Rest kommt aus dem Dossier.</p>
      <VersionsBanner />
      <WissenZeile />
      {duenn && (
        <div className="pg-card pg-mb">
          <h2>Worum soll es heute gehen?</h2>
          <WorumKarte thema={thema} setThema={setThema} kennenlernen={kennenlernen} setKennenlernen={setKennenlernen} />
        </div>
      )}
      <div className="pg-card">
        <ReglerBlock heute={heute} setHeute={setHeute} vorname={v} />
        <hr className="pg-fein" />
        <div className="pg-chips" role="group" aria-label="Dauer">
          {DAUERN.map((d) => (
            <Chip key={d} an={dauer === d} onClick={() => setDauer(d)}>
              {d} Min.
            </Chip>
          ))}
        </div>
        <div className="pg-chips pg-mt" role="group" aria-label="Blatt">
          <Chip an={blatt === 'mit'} onClick={() => setBlatt('mit')}>
            mit Blatt
          </Chip>
          <Chip an={blatt === 'ohne'} onClick={() => setBlatt('ohne')}>
            ohne Blatt
          </Chip>
          {blattGrund(p) && <span className="pg-leise pg-klein pg-mitte-v">{blattGrund(p)}</span>}
        </div>
        <SozialformWahl mt />
        {f && (
          <>
            <hr className="pg-fein" />
            <label className="pg-check">
              <input type="checkbox" checked={weiter} onChange={(e) => setWeiter(e.target.checked)} />
              Weiter mit Sitzung {f.gehalten + 1} von {f.n} der Folge „{f.titel}“
            </label>
          </>
        )}
        {tief && (
          <div className="pg-hinweisbox gelb pg-mt">
            <Ic n="info" />
            <div>
              Heute geht nicht viel?{' '}
              <button type="button" className="pg-link" onClick={() => pg.setAnsicht('leicht')}>
                Leichte Stunde zeigen
              </button>{' '}
              – ohne Förderziel.
            </div>
          </div>
        )}
        <button type="button" className="pg-btn primaer gross breit pg-mt2" disabled={!bereit} onClick={bauen}>
          <Ic n="blitz" />
          Stunde bauen
        </button>
      </div>
    </div>
  )
}

export function Leicht() {
  const pg = usePg()
  const p = useProfil()
  const v = pg.vorname
  const [tf, setTf] = useState<Tagesform[]>([])
  const [dauer, setDauer] = useState<Dauer>(() => (p.alterJahre <= 5 ? 10 : 20))
  const alle = TAGESFORM
  const waehle = (t: Tagesform) =>
    setTf((l) => (l.includes(t) ? l.filter((x) => x !== t) : l.length < 2 ? [...l, t] : [l[1], t]))
  const bauen = () =>
    pg.planBauen({ weg: 'leicht', ziele: [], n: 1, dauer, sozialform: 'einzeln', tagesform: tf[0], tagesformen: tf, sprache: p.sprache.blatt, datum: heuteIso() })
  return (
    <div className="pg-mitte">
      <div className="pg-eyebrow">Weg 3 · Heute geht nicht viel</div>
      <h1>Wie ist {v} heute?</h1>
      <p className="pg-lead pg-mb">
        Leichte Stunde ohne Förderziel: Spiel, Bewegung, Kreatives, Beziehung. {v} wählt in der Stunde selbst – nichts wird abgefragt. Bis zu zwei Angaben.
      </p>
      <HeikelBanner />
      <WissenZeile />
      <div className="pg-card">
        <div className="pg-tfgrid" role="group" aria-label="Tagesform, bis zu zwei">
          {alle.map(([k, name, icon]) => (
            <button key={k} type="button" className={'pg-tf' + (tf.includes(k) ? ' an' : '')} aria-pressed={tf.includes(k)} onClick={() => waehle(k)}>
              <Ic n={icon} />
              {name}
            </button>
          ))}
        </div>
        <hr className="pg-fein" />
        <div className="pg-chips" role="group" aria-label="Dauer">
          {([10, 20, 30] as Dauer[]).map((d) => (
            <Chip key={d} an={dauer === d} onClick={() => setDauer(d)}>
              {d} Min.
            </Chip>
          ))}
        </div>
        <button type="button" className="pg-btn primaer gross breit pg-mt2" disabled={!tf.length} onClick={bauen}>
          <Ic n="herz" />
          Leichte Stunde zeigen
        </button>
      </div>
      <p className="pg-uhrhinweis pg-mt">
        <Ic n="uhr" />
        Zwei Klicks · Notiz danach: „Beziehungszeit“ ohne ELDiB-Bezug
      </p>
    </div>
  )
}

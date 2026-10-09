// Passgenau – Start (2.1), laufende Folge, „gedruckt, ohne Rückmeldung“ (P7) und „Ohne Kind planen“.
import { useEffect, useMemo, useState } from 'react'
import type { Auftrag, Plan, PraxisVorlage, Sprache } from '../typen'
import * as K from './kern'
import { usePg, useProfil } from './zustand'
import { Ic, type Zeichen } from './zeichen'
import { Chip, HeikelBanner, Pill, Seg, VersionsBanner } from './Teile'
import { LAYOUT_NAME, PHASE_NAME, SPRACHE_NAME, ZIELE_OHNE_KIND, datumKurz, heuteIso, interesseName, themaName, zielKurz, zugangText } from './texte'
import { useRueckmeldung } from './Nachher'
import { dauerVorgabe } from './Wege'
import { quoteText } from './Praxis'

function Weg({ titel, zeit, farbe, icon, text, punkte, onClick }: { titel: string; zeit: string; farbe: [string, string]; icon: Zeichen; text: string; punkte: string[]; onClick: () => void }) {
  return (
    <button type="button" className="pg-weg" onClick={onClick}>
      <span className="wicon" style={{ background: farbe[0], color: farbe[1] }}>
        <Ic n={icon} />
      </span>
      <span className="pg-pill zeit">
        <Ic n="uhr" />
        {zeit}
      </span>
      <h3>{titel}</h3>
      <p>{text}</p>
      <ul>
        {punkte.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <span className="los">
        Los <Ic n="pfeil" />
      </span>
    </button>
  )
}

/** Sitzungen, die gedruckt, aber noch nicht zurückgemeldet sind (P7) – aus den gespeicherten Plänen und dem offenen */
function useOffeneDrucke(): { plan: Plan; nr: number; titel: string; gedruckt: string }[] {
  const pg = usePg()
  return useMemo(() => {
    const plaene = [...(pg.plan ? [pg.plan] : []), ...pg.verlauf.plaene.filter((p) => p.id !== pg.plan?.id)]
    return plaene.flatMap((p) =>
      p.sitzungen
        .filter((s) => s.gedruckt && !s.rueckmeldung && s.status !== 'gehalten')
        .map((s) => ({ plan: p, nr: s.nr, titel: p.n > 1 ? `${p.titel} · Sitzung ${s.nr} von ${p.n}` : p.titel, gedruckt: s.gedruckt! })),
    )
  }, [pg.plan, pg.verlauf.plaene])
}

export function Start() {
  const pg = usePg()
  const p = useProfil()
  const v = pg.vorname
  const f = p.folge
  const offene = useOffeneDrucke()
  const rm = useRueckmeldung()
  const folgePlan = f ? pg.verlauf.plaene.find((x) => x.id === f.id) : undefined
  const letzte = folgePlan?.sitzungen.filter((s) => s.rueckmeldung).slice(-1)[0]
  const naechste = folgePlan?.sitzungen[f?.gehalten ?? 0]
  const testUnbestaetigt = !p.zugangBestaetigt && p.zugang.quelle.some((q) => q.startsWith('test'))

  useEffect(() => {
    if (!pg.praxis.geladen && !pg.praxis.laedt && pg.hubDa && pg.schalter.teilen) pg.praxisLaden()
  }, [pg])

  const weiter = () => {
    const a: Auftrag = {
      weg: 'schnell', ziele: [], n: 1, dauer: ((folgePlan?.dauer ?? (pg.vor.ich as { dauer?: number }).dauer ?? dauerVorgabe(p)) as Auftrag['dauer']),
      sozialform: 'einzeln', sprache: p.sprache.blatt, datum: heuteIso(), heute: { energie: 4, konzentration: 4, stimmung: 4 },
    }
    pg.planBauen(a)
  }
  const passend = pg.praxis.liste
    .filter((x) => (x.status === 'freigegeben' || x.status === 'offiziell') && x.ziele.some((z) => p.ziele.some((y) => y.code === z)))
    .slice(0, 2)

  return (
    <>
      <section className="pg-kopf">
        <div>
          <div className="pg-eyebrow">Passgenau · aus dem Dossier geöffnet</div>
          <h1>Was machst du heute mit {v}?</h1>
          <p className="pg-lead">Der Hub kennt {v} schon – Alter, Sprachen, Förderziele, Notizen und frühere Stunden sind vorausgefüllt. Du klickst nur noch an, was stimmt.</p>
        </div>
        <button type="button" className="pg-btn" onClick={() => pg.setAnsicht('wissen')}>
          <Ic n="person" />
          Das weiß ich schon
        </button>
      </section>
      <VersionsBanner />
      <HeikelBanner />
      {testUnbestaetigt && (
        <div className="pg-banner gelb">
          <Ic n="info" />
          <div>
            <b>Lesen · Schreiben · Bilder</b> kommen aus einem Test. Sie wirken erst, wenn du sie einmal bestätigst.{' '}
            <button type="button" className="pg-link" onClick={() => pg.setAnsicht('wissen')}>
              Ansehen und bestätigen
            </button>
          </div>
        </div>
      )}
      {f && f.gehalten < f.n && (
        <div className="pg-folgeband">
          <span className="fb-icon">
            <Ic n="liste" />
          </span>
          <div className="fb-text">
            <div className="pg-eyebrow">Laufende Folge</div>
            <b className="fb-titel">{f.titel}</b>
            <div className="pg-meta">
              <span>
                Sitzung {f.gehalten + 1} von {f.n}
                {naechste ? ' · ' + PHASE_NAME[naechste.phase] : ''}
                {folgePlan ? ` · ${folgePlan.dauer} Min.` : ''}
              </span>
              <span className="pg-punkte" aria-hidden="true">
                {Array.from({ length: f.n }, (_, i) => (
                  <i key={i} className={i < f.gehalten ? 'voll' : i === f.gehalten ? 'jetzt' : ''} />
                ))}
              </span>
              {letzte?.rueckmeldung && (
                <Pill art={letzte.rueckmeldung.ergebnis === 'geklappt' ? 'ok' : 'warn'} icon={letzte.rueckmeldung.ergebnis === 'geklappt' ? 'check' : 'info'}>
                  letzte Stunde {datumKurz(letzte.datum)}: {ergebnisText(letzte.rueckmeldung.ergebnis)}
                </Pill>
              )}
            </div>
          </div>
          <button type="button" className="pg-btn primaer gross" onClick={weiter}>
            Weiter mit Sitzung {f.gehalten + 1}
            <Ic n="pfeil" />
          </button>
        </div>
      )}
      {offene.length > 0 && (
        <div className="pg-card pg-offen">
          <h2>Gedruckt, ohne Rückmeldung</h2>
          <ul>
            {offene.map((o) => (
              <li key={o.plan.id + o.nr}>
                <span className="t">
                  <b>{o.titel}</b>
                  <small>gedruckt {datumKurz(o.gedruckt)}</small>
                </span>
                <span className="pg-btnrow">
                  {(
                    [
                      ['geklappt', 'hat geklappt'],
                      ['teils', 'teils'],
                      ['nicht', 'nicht geklappt'],
                    ] as const
                  ).map(([e, t]) => (
                    <button key={e} type="button" className="pg-btn klein" onClick={() => rm.schnell(o.plan, o.nr, e)}>
                      {t}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="pg-btn klein leer"
                    onClick={() => {
                      if (pg.plan?.id !== o.plan.id) {
                        pg.setPlan(o.plan)
                        pg.setSi(o.plan.sitzungen.findIndex((s) => s.nr === o.nr))
                      }
                      pg.setDlg({ art: 'nachher', nr: o.nr })
                    }}
                  >
                    Mehr …
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="pg-wege">
        <Weg titel="Gründlich planen" zeit="< 3 Min." farbe={['#ECEEFA', '#2E3A9C']} icon="liste" text="Ziele, Anzahl Sitzungen, Dauer und Schwerpunkt – eine aufbauende Folge mit Blättern." punkte={['Bogen: wahrnehmen → üben → übertragen', 'gleiche Rituale, wechselnde Inhalte', 'jede Sitzung mit eigenem Blatt']} onClick={() => pg.setAnsicht('gruendlich')} />
        <Weg titel="Schnell für heute" zeit="< 30 Sek." farbe={['#FDF3E7', '#9A4F0B']} icon="blitz" text="Drei Regler für heute, ein Klick – fertige Stunde mit Blatt." punkte={['Energie, Konzentration, Stimmung', f ? 'nächster Schritt der laufenden Folge' : 'wichtigstes Ziel zuerst', 'sofort als PDF']} onClick={() => pg.setAnsicht('schnell')} />
        <Weg titel="Heute geht nicht viel" zeit="leicht" farbe={['#EAF2E7', '#3F6E3A']} icon="herz" text="Spiele, Bewegung, Kreatives, Beziehung – bewusst ohne Förderziel." punkte={[`ein Klick: Wie ist ${v} heute?`, 'Wahlkarte statt Befragung', 'Mitmach-Seite zum Drucken']} onClick={() => pg.setAnsicht('leicht')} />
      </div>
      <div className="pg-zwei">
        <div className="pg-card">
          <h2>
            Das weiß ich schon <Pill>vorausgefüllt</Pill>
          </h2>
          <WissenKurz />
          <hr className="pg-fein" />
          <button type="button" className="pg-btn klein" onClick={() => pg.setAnsicht('wissen')}>
            <Ic n="stift" />
            Ansehen und korrigieren
          </button>
        </div>
        <div className="pg-card">
          {pg.schalter.teilen && pg.hubDa ? (
            <>
              <h2>Aus der Praxis – passt zu {v}</h2>
              {passend.length ? (
                passend.map((x) => <PraxisZeile key={x.id} x={x} />)
              ) : (
                <p className="pg-leise">{pg.praxis.laedt ? 'Vorlagen werden geladen …' : 'Noch keine geprüfte Vorlage zu diesen Zielen.'}</p>
              )}
              <button type="button" className="pg-btn klein" onClick={() => pg.setAnsicht('praxis')}>
                <Ic n="gruppe" />
                Alle Vorlagen
              </button>
            </>
          ) : (
            <>
              <h2>Eigene Vorlagen</h2>
              <EigeneVorlagen />
            </>
          )}
        </div>
      </div>
    </>
  )
}

function PraxisZeile({ x }: { x: PraxisVorlage }) {
  return (
    <div className="pg-przeile">
      <b>{x.titel}</b>
      <div className="pg-meta">
        {x.n > 1 ? `Folge · ${x.n} Sitzungen` : 'Einzelstunde'} · {x.dauer} Min. · {x.altersband.replace('-', '–')} J.
        {x.zaehler && <Pill art="ok">{quoteText(x.zaehler)}</Pill>}
      </div>
    </div>
  )
}

function EigeneVorlagen() {
  const pg = usePg()
  const l = pg.vor.ich.eigeneVorlagen ?? []
  if (!l.length) return <p className="pg-leise">Noch keine. Im Ergebnis: „Als eigene Vorlage“ – nur für dich, ohne Kind.</p>
  return (
    <ul className="pg-liste-einfach">
      {l.slice(0, 4).map((v) => (
        <li key={v.id}>
          <span>{v.titel}</span>
          <button
            type="button"
            className="pg-btn klein"
            onClick={() => {
              pg.setPlan({ ...v.inhalt, id: 'pl-' + Date.now().toString(36), kinder: ['self'], erstellt: new Date().toISOString().slice(0, 16) })
              pg.setSi(0)
              pg.setAnsicht('baukasten')
            }}
          >
            Öffnen
          </button>
        </li>
      ))}
    </ul>
  )
}

export function ergebnisText(e: string): string {
  return ({ geklappt: 'hat geklappt', teils: 'teils', nicht: 'nicht geklappt', beruhigt: 'hat sich beruhigt', dabei: 'war dabei', 'nur-da': 'wollte nur da sein', abgebrochen: 'abgebrochen' } as Record<string, string>)[e] ?? e
}

export function WissenKurz() {
  const pg = usePg()
  const p = useProfil()
  const themen = [...new Set(p.themen.map((t) => t.key))]
  return (
    <dl className="pg-dl">
      <dt>Alter &amp; Blatt</dt>
      <dd>
        {p.alterJahre} Jahre · {p.stufen.join(', ')} · Gestaltung „{LAYOUT_NAME[p.layout]}“
      </dd>
      <dt>Sprache</dt>
      <dd>
        Blatt {SPRACHE_NAME[p.sprache.blatt]}
        {p.sprache.woerter.length > 0 && ' · Wörter auch ' + p.sprache.woerter.map((w) => SPRACHE_NAME[w]).join(', ')}
      </dd>
      <dt>Zugang</dt>
      <dd>{zugangText(p.zugang)}</dd>
      <dt>Förderziele</dt>
      <dd>
        {p.ziele.length
          ? p.ziele.map((z, i) => (
              <span key={z.code}>
                {i > 0 && ' · '}
                <b>{z.code}</b> {zielKurz(z.code)}
              </span>
            ))
          : 'noch keine – „Worum soll es heute gehen?“ beim Planen'}
      </dd>
      {themen.length > 0 && (
        <>
          <dt>Themen</dt>
          <dd>
            {themen.map((k, i) => (
              <span key={k}>
                {i > 0 && ' · '}
                {themaName(k)}{' '}
                <span className="pg-leise pg-klein">
                  ({p.themen.filter((t) => t.key === k).map((t) => `${t.art === 'reunion' ? 'Réunion' : t.art === 'vorfall' ? 'Vorfall' : 'Notiz'} ${datumKurz(t.datum)}`).join(' · ')})
                </span>
              </span>
            ))}
          </dd>
        </>
      )}
      {p.interessen.length > 0 && (
        <>
          <dt>Interessen</dt>
          <dd>{p.interessen.map(interesseName).join(' · ')}</dd>
        </>
      )}
      {(p.hilft?.length ?? 0) > 0 && (
        <>
          <dt>Was hilft</dt>
          <dd>{p.hilft!.map((h) => ({ stundenleiste: 'Stundenleiste', bewegungspausen: 'Bewegungspausen', reizarm: 'leise/reizarm', bildplan: 'Bildplan' })[h]).join(' · ')}</dd>
        </>
      )}
      {pg.heikel.length > 0 && (
        <>
          <dt>Freigeschaltet</dt>
          <dd>heikles Thema, nur für diese Stunde</dd>
        </>
      )}
    </dl>
  )
}

/** Ohne Hub: Profil per Chips (Alter, Sprache, Ziele) – gespeichert wird nur als Datei bzw. eigene Vorlage */
export function OhneKind() {
  const pg = usePg()
  const [alter, setAlter] = useState(pg.startAlter ?? 9)
  const [sprache, setSprache] = useState<Sprache>('de')
  const [ziele, setZiele] = useState<string[]>(() => (pg.startZiel ? [pg.startZiel] : []))
  // vom Blatt aus (Brücke, Aufgabe 154): dessen Ziel steht vorn, auch wenn es nicht zu den üblichen gehört
  const alle = pg.startZiel && !ZIELE_OHNE_KIND.includes(pg.startZiel) ? [pg.startZiel, ...ZIELE_OHNE_KIND] : ZIELE_OHNE_KIND
  const los = () => {
    const p = K.ohneKindProfil({ alterJahre: alter, sprache, ziele })
    pg.setRoh({ ...p, vorname: undefined })
    pg.setOhneKind(true)
    pg.setAnsicht('start')
  }
  return (
    <div className="pg-mitte">
      <div className="pg-eyebrow">Passgenau · ohne Hub</div>
      <h1>Ohne Kind planen</h1>
      <p className="pg-lead">
        {pg.hallo ? 'Die Toolbox wurde ohne Kind geöffnet.' : 'Kein Hub verbunden.'} Wähle Alter, Sprache und bis zu drei Ziele – für ein Kind, zu zweit oder eine Kleingruppe (im nächsten Schritt). Gespeichert wird nichts beim Kind – nur als Datei oder als eigene Vorlage.
      </p>
      {pg.fehler && (
        <div className="pg-banner warn">
          <Ic n="info" />
          <div>Das Profil kam nicht an: {pg.fehler}</div>
        </div>
      )}
      <div className="pg-card">
        <div className="pg-fblock">
          <h3>
            <span className="nr">1</span>Alter
          </h3>
          <div className="pg-chips">
            {Array.from({ length: 14 }, (_, i) => i + 3).map((a) => (
              <Chip key={a} an={alter === a} onClick={() => setAlter(a)}>
                {a === 16 ? '16+' : a} J.
              </Chip>
            ))}
          </div>
        </div>
        <div className="pg-fblock">
          <h3>
            <span className="nr">2</span>Sprache des Blatts
          </h3>
          <Seg label="Sprache" wert={sprache} optionen={[['de', 'Deutsch'], ['fr', 'Français']]} onWahl={setSprache} />
        </div>
        <div className="pg-fblock">
          <h3>
            <span className="nr">3</span>Ziele <span className="pg-leise pg-klein">(bis zu drei, Reihenfolge = Priorität)</span>
          </h3>
          <div className="pg-chips">
            {alle.map((c) => {
              const i = ziele.indexOf(c)
              return (
                <Chip key={c} an={i >= 0} onClick={() => setZiele((l) => (i >= 0 ? l.filter((x) => x !== c) : l.length < 3 ? [...l, c] : l))}>
                  {i >= 0 ? `${i + 1}. ` : ''}
                  <b>{c}</b>&nbsp;{zielKurz(c)}
                </Chip>
              )
            })}
          </div>
          <p className="pg-leise pg-klein">Ohne Ziel: „Worum soll es heute gehen?“ beim Planen.</p>
        </div>
        <button type="button" className="pg-btn primaer gross breit" onClick={los}>
          <Ic n="pfeil" />
          Weiter
        </button>
      </div>
    </div>
  )
}

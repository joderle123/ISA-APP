// Passgenau – Start (2.1), laufende Folge, „gedruckt, ohne Rückmeldung“ (P7) und der Einstieg „Stunde planen“ (ohne Hub).
import { useEffect, useMemo, useState } from 'react'
import type { Auftrag, Plan, PraxisVorlage, Sprache } from '../typen'
import * as K from './kern'
import { usePg, useProfil } from './zustand'
import { Ic, type Zeichen } from './zeichen'
import { Chip, HeikelBanner, Pill, Seg, VersionsBanner } from './Teile'
import { LAYOUT_NAME, PHASE_NAME, SOZIALFORM_NAME, SPRACHE_NAME, ZIELE_OHNE_KIND, datumKurz, heuteIso, interesseName, themaName, zielGruppen, zielKurz, zugangText } from './texte'
import { useRueckmeldung } from './Nachher'
import { dauerVorgabe } from './Wege'
import { quoteText } from './Praxis'
import { KursHinweis } from './Kurse'

function Weg({ titel, farbe, icon, text, punkte, onClick }: { titel: string; farbe: [string, string]; icon: Zeichen; text: string; punkte: string[]; onClick: () => void }) {
  return (
    <button type="button" className="pg-weg" onClick={onClick}>
      <span className="wicon" style={{ background: farbe[0], color: farbe[1] }}>
        <Ic n={icon} />
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
  const k = pg.kind
  const ohne = pg.ohneKind
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
  const zweiteKarte = (pg.schalter.teilen && pg.hubDa) || (pg.vor.ich.eigeneVorlagen?.length ?? 0) > 0

  return (
    <>
      <section className="pg-kopf">
        <div>
          {/* Ohne Kind gibt es kein Dossier und kein „Kind“, von dem die Rede sein könnte: neutral schreiben */}
          <div className="pg-eyebrow">{ohne ? 'Stunde planen' : 'Passgenau · aus dem Dossier geöffnet'}</div>
          <h1>{ohne ? 'Was machst du heute?' : `Was machst du heute mit ${k.dat}?`}</h1>
          <p className="pg-lead">
            {ohne
              ? 'Alter, Sprache und Ziele stehen. Such dir einen der drei Wege aus.'
              : `Der CDSE-Hub kennt ${k.akk} schon – Alter, Sprachen, Förderziele, Notizen und frühere Stunden sind vorausgefüllt. Du klickst nur noch an, was stimmt.`}
          </p>
        </div>
        <button type="button" className="pg-btn" onClick={() => pg.setAnsicht(ohne ? 'ohnekind' : 'wissen')}>
          <Ic n={ohne ? 'stift' : 'person'} />
          {ohne ? 'Alter oder Ziele ändern' : 'Das weiß ich schon'}
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
        <Weg titel="Gründlich planen" farbe={['#ECEEFA', '#2E3A9C']} icon="liste" text="Ziele, Anzahl Sitzungen und Dauer – eine aufbauende Folge mit Blättern." punkte={['Bogen: wahrnehmen → üben → übertragen', 'gleiche Rituale, wechselnde Inhalte', 'jede Sitzung mit eigenem Blatt']} onClick={() => pg.setAnsicht('gruendlich')} />
        <Weg titel="Schnell für heute" farbe={['#FDF3E7', '#9A4F0B']} icon="blitz" text="Drei Regler für heute, ein Klick – fertige Stunde mit Blatt." punkte={['Energie, Konzentration, Stimmung', f ? 'nächster Schritt der laufenden Folge' : 'wichtigstes Ziel zuerst', 'sofort als PDF']} onClick={() => pg.setAnsicht('schnell')} />
        <Weg titel="Heute geht nicht viel" farbe={['#EAF2E7', '#3F6E3A']} icon="herz" text="Spiele, Bewegung, Kreatives, Beziehung – bewusst ohne Förderziel." punkte={[`ein Klick: Wie ist ${k.nom} heute?`, 'Wahlkarte statt Befragung', 'Mitmach-Seite zum Drucken']} onClick={() => pg.setAnsicht('leicht')} />
        <Weg titel="Nach Aktivität" farbe={['#F6E7F0', '#8E3B6E']} icon="stern" text="Experiment, Theater, Kochen, Draußen … – du wählst, was ihr macht." punkte={['16 Formen zum Antippen', 'zum Förderziel oder zu einem Thema', 'Ablauf passend zur Form']} onClick={() => pg.setAnsicht('form')} />
      </div>
      <KursHinweis />
      <div className={'pg-zwei' + (zweiteKarte ? '' : ' eine')}>
        <div className="pg-card">
          <h2>
            {ohne ? (
              'Deine Auswahl'
            ) : (
              <>
                Das weiß ich schon <Pill>vorausgefüllt</Pill>
              </>
            )}
          </h2>
          <WissenKurz />
          <hr className="pg-fein" />
          <button type="button" className="pg-btn klein" onClick={() => pg.setAnsicht(ohne ? 'ohnekind' : 'wissen')}>
            <Ic n="stift" />
            {ohne ? 'Alter oder Ziele ändern' : 'Ansehen und korrigieren'}
          </button>
        </div>
        {/* Die Karte „Eigene Vorlagen“ gibt es nur, wenn schon eine da ist – eine leere Karte sagt nichts */}
        {zweiteKarte && (
          <div className="pg-card">
            {pg.schalter.teilen && pg.hubDa ? (
              <>
                <h2>Aus der Praxis – passt zu {k.dat}</h2>
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
        )}
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
      {/* Ohne Kind kommt der Zugang nur aus dem Alter – eine Angabe über das Kind ist das nicht */}
      {!pg.ohneKind && (
        <>
          <dt>Zugang</dt>
          <dd>{zugangText(p.zugang)}</dd>
        </>
      )}
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
          <dd>{p.hilft!.map((h) => ({ stundenleiste: 'Stundenleiste', bewegungspausen: 'Bewegungspausen', reizarm: 'leise/reizarm', bildplan: 'Bildplan', woertlich: 'klar und wörtlich' })[h]).join(' · ')}</dd>
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

/** Typische Anliegen ohne Kind: ein Klick, ein erklärender Satz (Ziele aus ZIELE_OHNE_KIND) */
const REZEPTE: { titel: string; text: string; alter: number; ziele: string[]; sozialform: 'einzeln' | 'zu-zweit' | 'kleingruppe'; weg: 'schnell' | 'gruendlich' }[] = [
  { titel: 'Wut im Griff', text: 'Wut früh bemerken, stoppen und etwas anderes tun.', alter: 8, ziele: ['V-21', 'V-18'], sozialform: 'kleingruppe', weg: 'schnell' },
  { titel: 'Gefühle benennen', text: 'Gefühle erkennen und mit passenden Wörtern sagen.', alter: 6, ziele: ['K-26'], sozialform: 'kleingruppe', weg: 'schnell' },
  { titel: 'Warten und abwechseln', text: 'Geduld üben: warten, bis man dran ist, und teilen.', alter: 5, ziele: ['SOZ-14', 'SOZ-19'], sozialform: 'kleingruppe', weg: 'schnell' },
  { titel: 'Streit lösen', text: 'Einen Streit ruhig besprechen und gemeinsam eine Lösung finden.', alter: 9, ziele: ['SOZ-34', 'SOZ-32'], sozialform: 'zu-zweit', weg: 'schnell' },
  { titel: 'Sich in andere einfühlen', text: 'Wahrnehmen, wie es anderen geht, und darauf reagieren.', alter: 10, ziele: ['SOZ-37', 'K-26'], sozialform: 'kleingruppe', weg: 'gruendlich' },
  { titel: 'Erwachsene ansprechen', text: 'Sich trauen, um Hilfe zu bitten und Erwachsene anzusprechen.', alter: 7, ziele: ['K-12', 'K-17'], sozialform: 'einzeln', weg: 'schnell' },
  { titel: 'Fortschritt sehen', text: 'Erkennen, was schon klappt – für Jugendliche, die sich selbst einschätzen.', alter: 13, ziele: ['V-22'], sozialform: 'einzeln', weg: 'gruendlich' },
  { titel: 'Aufhören, wenn es Zeit ist', text: 'Ein Spiel oder eine Aufgabe beenden können, ohne Ärger.', alter: 7, ziele: ['V-15', 'V-10'], sozialform: 'einzeln', weg: 'schnell' },
]

/** Ohne Hub: Anliegen antippen, Alter und Sprache darüber, eigene Ziele zugeklappt darunter – gespeichert wird nur als Datei
 *  bzw. eigene Vorlage */
export function OhneKind() {
  const pg = usePg()
  // Wer vom Plan hierher zurückkommt, findet seine Auswahl wieder; vom Blatt aus (Brücke) ist das Alter vorbelegt (pg.startAlter)
  const bisher = pg.ohneKind ? pg.roh : null
  // null = nichts gewählt: dann gilt bei einem Anliegen sein eigenes Alter
  const [alter, setAlter] = useState<number | null>(bisher?.alterJahre ?? pg.startAlter ?? null)
  const [sprache, setSprache] = useState<Sprache>(bisher?.sprache.blatt ?? 'de')
  const [ziele, setZiele] = useState<string[]>(() => (bisher ? bisher.ziele.map((z) => z.code).slice(0, 3) : pg.startZiel ? [pg.startZiel] : []))
  const [selbst, setSelbst] = useState(!!bisher || !!pg.startZiel)
  // vom Blatt aus (Brücke, Aufgabe 154): dessen Ziel steht vorn, auch wenn es nicht zu den üblichen gehört
  const alle = pg.startZiel && !ZIELE_OHNE_KIND.includes(pg.startZiel) ? [pg.startZiel, ...ZIELE_OHNE_KIND] : ZIELE_OHNE_KIND
  const gruppen = zielGruppen(alle)
  const satz = (c: string) => (pg.katalog ? K.zielSatz(pg.katalog, { ziele: [] }, c, 'de') : undefined)
  const los = () => {
    const p = K.ohneKindProfil({ alterJahre: alter ?? 9, sprache, ziele })
    pg.setRoh({ ...p, vorname: undefined })
    pg.setOhneKind(true)
    pg.setAnsicht('start')
  }
  // Schnellstart (Aufgabe 154): ein Klick – Profil, Sozialform und Weg stehen, Dauer und Blatt wählt man danach
  const schnellstart = (r: (typeof REZEPTE)[number]) => {
    const p = K.ohneKindProfil({ alterJahre: alter ?? r.alter, sprache, ziele: r.ziele })
    pg.setRoh({ ...p, vorname: undefined })
    pg.setOhneKind(true)
    pg.setSozialform(r.sozialform)
    pg.setAnsicht(r.weg)
  }
  return (
    <div className="pg-mitte breit">
      <div className="pg-eyebrow">Stunde planen</div>
      <h1>Was möchtest du üben?</h1>
      <p className="pg-lead">Tippe auf ein Anliegen. Alter und Sprache stellst du gleich darunter ein.</p>
      {pg.fehler && (
        <div className="pg-banner warn">
          <Ic n="info" />
          <div>Das Profil kam nicht an: {pg.fehler}</div>
        </div>
      )}
      <div className="pg-angaben">
        <label className="pg-angabe" htmlFor="pg-alter">
          Wie alt ist das Kind?
        </label>
        <select id="pg-alter" className="pg-select" value={alter ?? ''} onChange={(e) => setAlter(e.target.value === '' ? null : +e.target.value)}>
          <option value="">Alter wählen</option>
          {Array.from({ length: 14 }, (_, i) => i + 3).map((a) => (
            <option key={a} value={a}>
              {a === 16 ? '16 Jahre und älter' : `${a} Jahre`}
            </option>
          ))}
        </select>
        <Seg label="Sprache des Blatts" wert={sprache} optionen={[['de', 'Deutsch'], ['fr', 'Français']]} onWahl={setSprache} />
      </div>
      <KursHinweis />
      <h2 className="pg-abschnitt">Typische Anliegen</h2>
      <div className="pg-anliegen-raster">
        {REZEPTE.map((r) => (
          <button key={r.titel} type="button" className="pg-anliegen" onClick={() => schnellstart(r)} title={'Förderziele: ' + r.ziele.map((c) => `${c} ${zielKurz(c)}`.trim()).join(' · ')}>
            <b>{r.titel}</b>
            <span>{r.text}</span>
            <small>
              {alter != null ? `${alter} J.` : `ab ${r.alter} J.`} · {SOZIALFORM_NAME[r.sozialform]}
            </small>
          </button>
        ))}
      </div>
      {pg.hilfeFinden && (
        <p className="pg-hilfelink">
          Lieber beschreiben, worum es geht?{' '}
          <button type="button" className="pg-link" onClick={pg.hilfeFinden}>
            <Ic n="lupe" />
            Hilfe finden
            <Ic n="pfeil" />
          </button>
        </p>
      )}
      <details className="pg-selbst" open={selbst} onToggle={(e) => setSelbst(e.currentTarget.open)}>
        <summary>
          <span>
            <b>Eigene Ziele wählen</b>
            <small>Förderziele selbst auswählen</small>
          </span>
        </summary>
        <div className="pg-card">
          <div className="pg-fblock">
            <h3>
              Förderziele <span className="pg-leise pg-klein">(bis zu drei – die Reihenfolge deiner Wahl ist die Priorität)</span>
            </h3>
            {gruppen.map((g) => (
              <div key={g.id} className="pg-zielgruppe" style={{ ['--bereich' as string]: g.farbe }}>
                <div className="pg-zielgruppe-name" id={`pg-zg-${g.id}`}>
                  <i aria-hidden="true" />
                  {g.name}
                </div>
                <div className="pg-chips" role="group" aria-labelledby={`pg-zg-${g.id}`}>
                  {g.codes.map((c) => {
                    const i = ziele.indexOf(c)
                    return (
                      <Chip key={c} an={i >= 0} titel={satz(c)} onClick={() => setZiele((l) => (i >= 0 ? l.filter((x) => x !== c) : l.length < 3 ? [...l, c] : l))}>
                        {i >= 0 ? `${i + 1}. ` : ''}
                        <b>{c}</b>&nbsp;{zielKurz(c)}
                      </Chip>
                    )
                  })}
                </div>
              </div>
            ))}
            {ziele.length > 0 ? (
              <ul className="pg-zielsaetze" aria-label="Das bedeuten deine Ziele">
                {ziele.map((c) => (
                  <li key={c}>
                    <b>{c}</b> {satz(c)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="pg-leise pg-klein pg-zielhinweis">Ohne Ziel fragt dich Passgenau beim Planen: „Worum soll es heute gehen?“</p>
            )}
          </div>
          {alter == null && <p className="pg-leise pg-klein">Ohne Altersangabe planen wir für 9 Jahre. Das Alter stellst du oben ein.</p>}
          <button type="button" className="pg-btn primaer gross breit" onClick={los}>
            <Ic n="pfeil" />
            Weiter
          </button>
        </div>
      </details>
    </div>
  )
}

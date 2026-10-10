// ---------------------------------------------------------------------------
// Passgenau: Einzelstunden für ein Kind, aus dem, was der Hub schon weiß.
//   #passgenau=<ref>[&weg=gruendlich|schnell|leicht][&ziel=V-21]
// Ohne Antwort des Hubs (1,5 s): „Ohne Kind planen“. Rechnen tut der Kern
// (src/passgenau/kern über src/passgenau/ui/kern.ts), die Brücke zum Hub steckt in
// src/passgenau/ui/hub.ts (Protokoll: src/passgenau/PROTOKOLL.md).
// ---------------------------------------------------------------------------
import '../passgenau/ui/passgenau.css'
import { Component, useEffect, type ReactNode } from 'react'
import type { PassgenauStart } from '../passgenau/ui/hub'
import { PgAnbieter, usePg, type Ansicht } from '../passgenau/ui/zustand'
import { Ic } from '../passgenau/ui/zeichen'
import { Hinweisleiste } from '../passgenau/ui/Teile'
import { OhneKind, Start } from '../passgenau/ui/Start'
import { Wissen } from '../passgenau/ui/Wissen'
import { Gruendlich, Leicht, Schnell } from '../passgenau/ui/Wege'
import { Ergebnis } from '../passgenau/ui/Ergebnis'
import { Vorschau } from '../passgenau/ui/Vorschau'
import { Baukasten } from '../passgenau/ui/Baukasten'
import { Alternativen } from '../passgenau/ui/Alternativen'
import { Nachher } from '../passgenau/ui/Nachher'
import { Gelernt } from '../passgenau/ui/Gelernt'
import { Kuratieren, Melden, Praxis, Teilen, Uebernehmen } from '../passgenau/ui/Praxis'

const PLANEN: Ansicht[] = ['start', 'wissen', 'ohnekind', 'gruendlich', 'schnell', 'leicht', 'ergebnis', 'vorschau', 'baukasten']

function Kopfzeile() {
  const pg = usePg()
  const p = pg.profil
  const reiter: [Ansicht, string, string][] = [
    ['start', 'Planen', 'ziel'],
    ['gelernt', 'Vorlieben', 'birne'],
    ...(pg.schalter.teilen ? ([['praxis', 'Aus der Praxis', 'gruppe']] as [Ansicht, string, string][]) : []),
  ]
  const aktiv = (a: Ansicht) => (a === 'start' ? PLANEN.includes(pg.ansicht) : pg.ansicht === a)
  return (
    <div className="pg-leiste">
      <nav className="pg-unterreiter" aria-label="Passgenau">
        {reiter.map(([a, t, icon]) => (
          <button key={a} type="button" aria-label={t} aria-current={aktiv(a) ? 'page' : undefined} onClick={() => pg.setAnsicht(a)}>
            <Ic n={icon} />
            <span>{t}</span>
          </button>
        ))}
        {pg.plan && !['ergebnis', 'vorschau', 'baukasten'].includes(pg.ansicht) && (
          <button type="button" aria-label="Zum Plan" onClick={() => pg.setAnsicht('ergebnis')}>
            <Ic n="liste" />
            <span>Zum Plan</span>
          </button>
        )}
      </nav>
      <div className="pg-leiste-rechts">
        {pg.speicherStatus && (
          <span className={'pg-speicher ' + pg.speicherStatus.art} role="status">
            {pg.speicherStatus.art === 'fehler' ? (
              <button type="button" className="pg-link" onClick={() => pg.flush()}>
                {pg.speicherStatus.text}
              </button>
            ) : (
              pg.speicherStatus.text
            )}
          </span>
        )}
        <span className={'pg-hubchip' + (pg.hubDa ? ' an' : '')} title={pg.hubDa ? 'Mit dem Hub verbunden' : 'Ohne Hub – wird nicht beim Kind gespeichert'}>
          <Ic n="hub" />
          <span>{pg.hubDa ? 'Hub' : 'ohne Hub'}</span>
        </span>
        {p && (
          <button type="button" className="pg-kindchip" onClick={() => pg.setAnsicht(pg.ohneKind ? 'ohnekind' : 'wissen')} aria-label={pg.ohneKind ? 'Profil ohne Kind ändern' : `${pg.vorname}: Das weiß ich schon`}>
            <span className="avatar" aria-hidden="true">
              {pg.ohneKind ? '?' : pg.vorname.slice(0, 1)}
            </span>
            <b>{pg.ohneKind ? 'Ohne Kind' : pg.vorname}</b>
            <small>
              {p.alterJahre} J. · {p.stufen.join(', ')}
            </small>
          </button>
        )}
      </div>
    </div>
  )
}

function Inhalt() {
  const pg = usePg()
  // Ein Plan gehört zu einem Kind: Ansichten, die einen Plan brauchen, fallen sonst auf den Start zurück
  useEffect(() => {
    if (['ergebnis', 'vorschau', 'baukasten'].includes(pg.ansicht) && !pg.plan) pg.setAnsicht('start')
  }, [pg])
  if (pg.status === 'warten' || pg.status === 'verbinden' || !pg.katalog)
    return (
      <div className="pg-laden" role="status">
        <span className="pg-spin" /> {pg.status === 'verbinden' ? 'Verbinde mit dem Hub …' : 'Passgenau wird geladen …'}
      </div>
    )
  if (pg.status === 'abgeschaltet')
    return (
      <div className="pg-mitte">
        <h1>Passgenau ist ausgeschaltet</h1>
        <p className="pg-lead">In diesem Hub ist Passgenau abgeschaltet (Einstellung der Verwaltung). Alle anderen Bereiche der Toolbox stehen wie gewohnt bereit.</p>
      </div>
    )
  const a = pg.profil ? pg.ansicht : pg.ansicht === 'praxis' || pg.ansicht === 'gelernt' ? pg.ansicht : 'ohnekind'
  const d = pg.dlg
  return (
    <>
      {a === 'ohnekind' && <OhneKind key={pg.startKey} />}
      {pg.profil && a === 'start' && <Start />}
      {pg.profil && a === 'wissen' && (pg.ohneKind ? <OhneKind /> : <Wissen />)}
      {pg.profil && a === 'gruendlich' && <Gruendlich />}
      {pg.profil && a === 'schnell' && <Schnell />}
      {pg.profil && a === 'leicht' && <Leicht />}
      {pg.profil && pg.plan && a === 'ergebnis' && <Ergebnis />}
      {pg.profil && pg.plan && a === 'vorschau' && <Vorschau />}
      {pg.profil && pg.plan && a === 'baukasten' && <Baukasten />}
      {a === 'gelernt' && <Gelernt />}
      {a === 'praxis' && <Praxis />}
      {d?.art === 'ersetzen' && pg.plan && pg.profil && <Alternativen ort={d.ort} />}
      {d?.art === 'nachher' && pg.plan && pg.profil && <Nachher nr={d.nr} />}
      {d?.art === 'teilen' && pg.plan && pg.profil && <Teilen />}
      {d?.art === 'uebernehmen' && pg.profil && <Uebernehmen vorlage={d.vorlage} />}
      {d?.art === 'melden' && <Melden vorlage={d.vorlage} />}
      {d?.art === 'kuratieren' && <Kuratieren vorlage={d.vorlage} />}
    </>
  )
}

/** Ein Fehler in einer Ansicht soll nicht die ganze Toolbox leeren: Hinweis + zurück zum Plan (der Zustand bleibt). */
class Auffangen extends Component<{ children: ReactNode; schluessel: string; zurueck: () => void }, { fehler: string | null; bei: string }> {
  state = { fehler: null as string | null, bei: '' }
  static getDerivedStateFromError(e: unknown) {
    return { fehler: e instanceof Error ? e.message : String(e) }
  }
  componentDidCatch(e: unknown) {
    console.error('Passgenau:', e)
  }
  static getDerivedStateFromProps(p: { schluessel: string }, s: { fehler: string | null; bei: string }) {
    return p.schluessel !== s.bei ? { fehler: null, bei: p.schluessel } : null
  }
  render() {
    if (!this.state.fehler) return this.props.children
    return (
      <div className="pg-mitte" role="alert">
        <h1>Das hat nicht geklappt</h1>
        <p className="pg-lead">Diese Ansicht konnte nicht angezeigt werden. Dein Plan ist nicht verloren.</p>
        <button type="button" className="pg-btn primaer" onClick={() => { this.setState({ fehler: null }); this.props.zurueck() }}>
          Zurück
        </button>
      </div>
    )
  }
}

function MitAuffangen({ children }: { children: ReactNode }) {
  const pg = usePg()
  return (
    <Auffangen schluessel={pg.ansicht + (pg.dlg?.art ?? '')} zurueck={() => { pg.setDlg(null); pg.setAnsicht(pg.plan ? 'ergebnis' : 'start') }}>
      {children}
    </Auffangen>
  )
}

export function Passgenau({ aktiv, start }: { aktiv: boolean; start: PassgenauStart | null }) {
  // Schmaler Bildschirm: „Passgenau“ ist der letzte Hub-Reiter und liegt sonst außerhalb des Bildes
  useEffect(() => {
    if (aktiv) document.querySelector('.haupt-reiter [aria-current="page"]')?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [aktiv])
  return (
    <div className={aktiv ? 'pg' : 'hidden'}>
      <PgAnbieter startHash={start} aktiv={aktiv}>
        <Kopfzeile />
        <main className="pg-main">
          <MitAuffangen>
            <Inhalt />
          </MitAuffangen>
        </main>
        <Hinweisleiste />
      </PgAnbieter>
    </div>
  )
}

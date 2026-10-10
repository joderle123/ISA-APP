// Passgenau – „Was Passgenau gelernt hat“ (6.7): drei Ebenen, einsehen, je Merkmal oder ganz zurücksetzen; Erkundung.
import { useState } from 'react'
import * as K from './kern'
import * as hub from './hub'
import { usePg } from './zustand'
import { Ic } from './zeichen'
import { PgDialog, Seg } from './Teile'
import type { FachkraftVorlieben } from './vorlieben'

type Ebene = 'kind' | 'ich' | 'team'

/** Systembausteine tragen im Kern einen Schlüssel; hier steht ein lesbarer Name */
const SYSTEM_NAME: Record<string, string> = {
  'pg:kernblatt': 'Fragen zum Kernbaustein (Blatt)',
  'pg:stundenleiste': 'Stundenleiste (Blatt)',
  'pg:notfall': 'Hilfe-Zeile (Blatt)',
}

export function Gelernt() {
  const pg = usePg()
  const v = pg.vorname
  const [ebene, setEbene] = useState<Ebene>(pg.ohneKind ? 'ich' : 'kind')
  const [frage, setFrage] = useState(false)
  const k = pg.katalog
  if (!k) return null
  const zeilen = K.gelernt(pg.vor, ebene, k)
  const zuruecksetzen = (schluessel?: string) => {
    if (ebene === 'team') return
    const neu = K.zuruecksetzen(pg.vor, ebene, schluessel)
    pg.setVor(neu)
    if (ebene === 'kind' && pg.ref && pg.darfSpeichern) {
      hub.vorlieben(pg.ref, { vorlieben: neu.kind, zuruecksetzen: schluessel ?? true }).catch(() => pg.hinweisZeigen('Zurücksetzen im Dossier nicht gespeichert.', 'warn'))
    }
    pg.hinweisZeigen(schluessel ? 'Merkmal zurückgesetzt.' : `Zurückgesetzt${ebene === 'kind' ? ' – Zeile im Protokoll des Dossiers' : ''}. Ab jetzt wieder Kaltstart.`)
  }
  const tabs: [Ebene, string][] = [...(pg.ohneKind ? [] : ([['kind', `Bei ${v}`]] as [Ebene, string][])), ['ich', 'Meine Vorlieben'], ['team', 'Im Team beliebt']]
  const gewichte = K.GEWICHTE_V1
  return (
    <>
      <section className="pg-kopf">
        <div>
          <div className="pg-eyebrow">Lernende Vorlieben</div>
          <h1>Was Passgenau gelernt hat</h1>
          <p className="pg-lead">Aus Daumen, Tauschen und Rückmeldungen nach der Stunde. Vorlieben verschieben eine Bewertung um höchstens 30 % – Förderziele bleiben das Wichtigste. Alte Erfahrungen verblassen mit der Zeit.</p>
        </div>
      </section>
      {!pg.schalter.lernen && (
        <div className="pg-banner warn">
          <Ic n="info" />
          <div>Das Lernen ist in diesem Hub ausgeschaltet. Passgenau plant nur nach Zielen, Alter und Zugang.</div>
        </div>
      )}
      <div className="pg-tabs pg-mb" role="tablist" aria-label="Ebene">
        {tabs.map(([e, t]) => (
          <button key={e} type="button" role="tab" aria-selected={ebene === e} className={ebene === e ? 'an' : ''} onClick={() => setEbene(e)}>
            {t}
          </button>
        ))}
      </div>
      <div className="pg-zwei">
        <div className="pg-card">
          <h2>{ebene === 'kind' ? `Was bei ${v} funktioniert` : ebene === 'ich' ? 'Deine Vorlieben' : 'Im Team beliebt'}</h2>
          <p className="pg-leise pg-klein pg-m0">
            {ebene === 'kind'
              ? `Gilt für alle, die mit ${v} planen · gespeichert verschlüsselt im Dossier · Erfahrungen verblassen nach etwa vier Monaten`
              : ebene === 'ich'
                ? 'Gilt für alle deine Kinder · nur in deinem persönlichen Tresor · Erfahrungen verblassen nach etwa einem halben Jahr'
                : 'Zähler ohne Namen und ohne Kinder, erst ab 3 Personen sichtbar. Fließt mit 20 % in die Vorlieben.'}
          </p>
          {ebene === 'kind' && !pg.lernenKind && pg.schalter.lernen && <p className="pg-hinweisbox gelb klein">Passgenau lernt bei {v} nicht mit (Schalter in „Das weiß ich schon“).</p>}
          <div className="pg-vliste">
            {zeilen.map((z) => {
              const [rohName, ...rest] = z.text.split(': ')
              const name = SYSTEM_NAME[rohName] ?? rohName
              return (
                <div key={z.schluessel ?? z.text} className="pg-vbalken">
                  <span className="name">{name}</span>
                  <span className="vbahn" role="meter" aria-valuemin={-100} aria-valuemax={100} aria-valuenow={Math.round(z.wert * 100)} aria-label={`${name}: ${rest.join(': ')}`}>
                    <i className={z.wert >= 0 ? 'pos' : 'neg'} style={{ width: Math.round(Math.abs(z.wert) * 50) + '%' }} />
                  </span>
                  <small>{rest.join(': ') || `${z.n} Rückmeldungen`}</small>
                  {ebene !== 'team' && z.schluessel && (
                    <button type="button" className="pg-ibtn" onClick={() => zuruecksetzen(z.schluessel)} aria-label={`zurücksetzen: ${name}`} title="Merkmal zurücksetzen">
                      <Ic n="rueckgaengig" />
                    </button>
                  )}
                </div>
              )
            })}
            {!zeilen.length && (
              <p className="pg-leise">
                {ebene === 'team' ? 'Noch zu wenige Personen mit Rückmeldungen (ab 3 sichtbar).' : 'Noch nichts gelernt – Kaltstart aus dem Dossier (Interessen, Notizen, Alter).'}
              </p>
            )}
          </div>
          {ebene !== 'team' && (
            <>
              <hr className="pg-fein" />
              <button type="button" className="pg-btn klein" onClick={() => (ebene === 'kind' ? setFrage(true) : zuruecksetzen())}>
                <Ic n="rueckgaengig" />
                {ebene === 'kind' ? `Vorlieben von ${v} zurücksetzen` : 'Meine Vorlieben zurücksetzen'}
              </button>
            </>
          )}
        </div>
        <div className="pg-card">
          <h2>So rechnet Passgenau</h2>
          <dl className="pg-dl">
            <dt>Erkundung</dt>
            <dd>
              <Seg
                label="Erkundung"
                wert={pg.vor.ich.erkundung ?? 0.2}
                optionen={[0, 0.1, 0.2, 0.3].map((x) => [x, Math.round(x * 100) + ' %'] as [number, string])}
                onWahl={(x) => {
                  pg.setVor((vv) => ({ ...vv, ich: { ...(vv.ich as FachkraftVorlieben), erkundung: x } }))
                  pg.hinweisZeigen(`Erkundung: ${Math.round(x * 100)} % – gilt ab der nächsten Planung.`)
                }}
              />
              <span className="pg-leise pg-klein pg-block">so viel bewusst Neues je Stunde – kein Filter-Tunnel</span>
            </dd>
          </dl>
          <details className="pg-rechnung">
            <summary>So wird bewertet</summary>
            <dl className="pg-dl">
              <dt>Zähler</dt>
              <dd>je Merkmal „gut“ und „schlecht“ (Bewegung, Comic, lange Schritte, einzelner Baustein …)</dd>
              <dt>Gewicht</dt>
              <dd>Kind 50 % · du 30 % · Team 20 %</dd>
              <dt>Deckel</dt>
              <dd>± 30 % auf die Bewertung, harte Regeln nie</dd>
              <dt>Stärkstes Signal</dt>
              <dd>„hat geklappt“ nach der Stunde (3×), Daumen (1×), Tauschen (0,3×); schwere Tage zählen nie negativ</dd>
              <dt>Gewichte V1</dt>
              <dd className="pg-klein">
                {Object.entries(gewichte)
                  .map(([n, w]) => `${n} ${Math.round(w * 100)} %`)
                  .join(' · ')}
              </dd>
            </dl>
          </details>
          <div className="pg-hinweisbox pg-mt">
            <Ic n="info" />
            <span>Was Passgenau nicht weiß: ob eine Methode wirkt und warum eine Stunde gut oder schlecht lief. Es merkt sich nur, was bei {pg.ohneKind ? 'deinen Kindern' : v} gut ankam.</span>
          </div>
        </div>
      </div>
      {frage && (
        <PgDialog
          titel={`Vorlieben von ${v} zurücksetzen?`}
          unter="Gilt für alle, die mit diesem Kind planen. Im Dossier steht danach eine Zeile im Protokoll."
          onClose={() => setFrage(false)}
          schmal
          fuss={
            <>
              <button type="button" className="pg-btn" onClick={() => setFrage(false)}>
                Abbrechen
              </button>
              <button
                type="button"
                className="pg-btn primaer"
                onClick={() => {
                  setFrage(false)
                  zuruecksetzen()
                }}
              >
                Zurücksetzen
              </button>
            </>
          }
        >
          <p className="pg-m0">Danach beginnt Passgenau wieder mit dem Kaltstart aus dem Dossier (Interessen, Notizen, Alter).</p>
        </PgDialog>
      )}
    </>
  )
}

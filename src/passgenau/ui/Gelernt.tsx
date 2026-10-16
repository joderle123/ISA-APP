// Passgenau – „Was Passgenau bei dir merkt“ (6.7): drei Ebenen, einsehen, je Merkmal oder ganz zurücksetzen; „Neues ausprobieren“.
import { useState } from 'react'
import * as K from './kern'
import * as hub from './hub'
import { usePg } from './zustand'
import { Ic } from './zeichen'
import { PgDialog, Seg } from './Teile'
import type { FachkraftVorlieben } from './vorlieben'

type Ebene = 'kind' | 'ich' | 'team'

/** „Neues ausprobieren“: Anteil der Stunde, der bewusst neu ist (im Kern „erkundung“) */
const NEUES: [number, string][] = [[0, 'gar nicht'], [0.1, 'wenig'], [0.2, 'mittel'], [0.3, 'viel']]

/** Systembausteine tragen im Kern einen Schlüssel; hier steht ein lesbarer Name */
const SYSTEM_NAME: Record<string, string> = {
  'pg:kernblatt': 'Blatt zur Übung',
  'pg:stundenleiste': 'Stundenleiste (Blatt)',
  'pg:notfall': 'Hilfe-Zeile (Blatt)',
}

export function Gelernt() {
  const pg = usePg()
  const kd = pg.kind
  const [ebene, setEbene] = useState<Ebene>(pg.ohneKind ? 'ich' : 'kind')
  const [frage, setFrage] = useState(false)
  const k = pg.katalog
  if (!k) return null
  const zeilen = K.gelernt(pg.vor, ebene, k)
  const neuWert = pg.vor.ich.erkundung ?? 0.2
  const zuruecksetzen = (schluessel?: string) => {
    if (ebene === 'team') return
    const neu = K.zuruecksetzen(pg.vor, ebene, schluessel)
    pg.setVor(neu)
    if (ebene === 'kind' && pg.ref && pg.darfSpeichern) {
      hub.vorlieben(pg.ref, { vorlieben: neu.kind, zuruecksetzen: schluessel ?? true }).catch(() => pg.hinweisZeigen('Zurücksetzen im Dossier nicht gespeichert.', 'warn'))
    }
    pg.hinweisZeigen(schluessel ? 'Merkmal zurückgesetzt.' : `Zurückgesetzt${ebene === 'kind' ? ' – Zeile im Protokoll des Dossiers' : ''}. Passgenau fängt wieder bei null an.`)
  }
  const tabs: [Ebene, string][] = [...(pg.ohneKind ? [] : ([['kind', `Bei ${kd.dat}`]] as [Ebene, string][])), ['ich', 'Meine Vorlieben'], ['team', 'Im Team beliebt']]
  const gewichte = K.GEWICHTE_V1
  return (
    <>
      <section className="pg-kopf">
        <div>
          <div className="pg-eyebrow">Vorlieben</div>
          <h1>Was Passgenau bei dir merkt</h1>
          <p className="pg-lead">Aus Daumen, Tauschen und den Rückmeldungen nach der Stunde merkt sich Passgenau, was gut ankam. Das schiebt die Vorschläge nur ein wenig – Förderziele bleiben das Wichtigste. Alte Erfahrungen verblassen mit der Zeit.</p>
        </div>
      </section>
      {!pg.schalter.lernen && (
        <div className="pg-banner warn">
          <Ic n="info" />
          <div>Das Merken ist im CDSE-Hub ausgeschaltet. Passgenau plant nur nach Zielen, Alter und Zugang.</div>
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
          <h2>{ebene === 'kind' ? `Was bei ${kd.dat} funktioniert` : ebene === 'ich' ? 'Was bei dir gut ankommt' : 'Im Team beliebt'}</h2>
          <p className="pg-leise pg-klein pg-m0">
            {ebene === 'kind'
              ? `Gilt für alle, die mit ${kd.dat} planen · verschlüsselt im Dossier gespeichert · Erfahrungen verblassen nach etwa vier Monaten`
              : ebene === 'ich'
                ? 'Gilt für alle deine Kinder · nur für dich gespeichert · Erfahrungen verblassen nach etwa einem halben Jahr'
                : 'Zähler ohne Namen und ohne Kinder, erst ab 3 Personen sichtbar. Fließt mit 20 % in die Vorlieben.'}
          </p>
          {ebene === 'kind' && !pg.lernenKind && pg.schalter.lernen && <p className="pg-hinweisbox gelb klein">Passgenau merkt sich bei {kd.dat} nichts (Schalter in „Das weiß ich schon“).</p>}
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
                {ebene === 'team' ? 'Noch zu wenige Personen mit Rückmeldungen (ab 3 sichtbar).' : ebene === 'kind' ? 'Noch nichts gemerkt – Passgenau beginnt mit Alter, Interessen und Notizen.' : 'Noch nichts gemerkt – das kommt mit Daumen und Rückmeldungen nach der Stunde.'}
              </p>
            )}
          </div>
          {ebene !== 'team' && (
            <>
              <hr className="pg-fein" />
              <button type="button" className="pg-btn klein" onClick={() => (ebene === 'kind' ? setFrage(true) : zuruecksetzen())}>
                <Ic n="rueckgaengig" />
                {ebene === 'kind' ? `Vorlieben ${kd.von} zurücksetzen` : 'Meine Vorlieben zurücksetzen'}
              </button>
            </>
          )}
        </div>
        <div className="pg-card">
          <h2>Wie viel Neues darf dabei sein?</h2>
          <dl className="pg-dl">
            <dt>Neues ausprobieren</dt>
            <dd>
              <Seg
                label="Neues ausprobieren"
                wert={neuWert}
                optionen={NEUES.map(([x, t]) => [x, t] as [number, string])}
                onWahl={(x) => {
                  pg.setVor((vv) => ({ ...vv, ich: { ...(vv.ich as FachkraftVorlieben), erkundung: x } }))
                  pg.hinweisZeigen(`Neues ausprobieren: ${NEUES.find(([w]) => w === x)?.[1] ?? ''} – gilt ab der nächsten Planung.`)
                }}
              />
              <span className="pg-leise pg-klein pg-block">
                {neuWert === 0 ? 'Passgenau bleibt bei dem, was schon gut ankam.' : `Etwa ${Math.round(neuWert * 100)} % der Stunde ist bewusst neu – damit sich nichts festfährt.`}
              </span>
            </dd>
          </dl>
          <details className="pg-rechnung">
            <summary>So wird gerechnet (für Interessierte)</summary>
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
            <span>Was Passgenau nicht weiß: ob eine Methode wirkt und warum eine Stunde gut oder schlecht lief. Es merkt sich nur, was bei {pg.ohneKind ? 'deinen Kindern' : kd.dat} gut ankam.</span>
          </div>
        </div>
      </div>
      {frage && (
        <PgDialog
          titel={`Vorlieben ${kd.von} zurücksetzen?`}
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
          <p className="pg-m0">Danach fängt Passgenau bei null an – nur mit Alter, Interessen und Notizen.</p>
        </PgDialog>
      )}
    </>
  )
}

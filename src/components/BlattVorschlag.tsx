// „Vorschlag zum Blatt“: unter jedem Arbeitsblatt schreibt das Team, was fehlt oder besser sein könnte. Der Hub sammelt
// alles geordnet nach Blatt für die Verwaltung (src/lib/blattVorschlag.ts). Wer dasselbe denkt, klickt „Sehe ich auch so“ –
// so gibt es keine doppelten Vorschläge, und das Wichtigste steht oben.
import { useEffect, useId, useState } from 'react'
import { toast } from '../lib/toast'
import { Icon } from './Icon'
import {
  mitHub,
  VORSCHLAG_ARTEN,
  vorschlaegeLesen,
  vorschlagFehlerText,
  vorschlagPlus,
  vorschlagSenden,
  vorschlagWeg,
  type BlattKennung,
  type Vorschlag,
  type VorschlagArt,
} from '../lib/blattVorschlag'
import { HubFehler } from '../passgenau/ui/hub'

function tag(iso: string) {
  const d = new Date(iso)
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('de-LU', { day: 'numeric', month: 'short' })
}

export function BlattVorschlag({ kennung }: { kennung: BlattKennung }) {
  const [stand, setStand] = useState<'laedt' | 'bereit' | 'ohne-hub' | 'fehler'>(() => (mitHub() ? 'laedt' : 'ohne-hub'))
  const [hinweis, setHinweis] = useState('')
  const [liste, setListe] = useState<Vorschlag[]>([])
  const [offen, setOffen] = useState(false)
  const [art, setArt] = useState<VorschlagArt>('uebung')
  const [text, setText] = useState('')
  const [sendet, setSendet] = useState(false)
  const [namen, setNamen] = useState('')
  const [beschaeftigt, setBeschaeftigt] = useState('')
  const tId = useId()

  useEffect(() => {
    let weg = false
    setListe([])
    setOffen(false)
    setText('')
    setNamen('')
    if (!mitHub()) {
      setStand('ohne-hub')
      return
    }
    setStand('laedt')
    vorschlaegeLesen(kennung.blatt).then(
      (r) => {
        if (weg) return
        setListe(r.liste)
        setStand('bereit')
      },
      (e) => {
        if (weg) return
        setHinweis(vorschlagFehlerText(e))
        setStand('fehler')
      },
    )
    // zurück im Fenster (z. B. aus dem Hub): die Liste neu – andere haben vielleicht etwas dazugeschrieben
    function sichtbar() {
      if (document.visibilityState !== 'visible' || !mitHub()) return
      vorschlaegeLesen(kennung.blatt).then(
        (r) => {
          if (!weg) setListe(r.liste)
        },
        () => {},
      )
    }
    document.addEventListener('visibilitychange', sichtbar)
    return () => {
      weg = true
      document.removeEventListener('visibilitychange', sichtbar)
    }
  }, [kennung.blatt])

  function senden(trotzdem = false) {
    const t = text.trim()
    if (t.length < 3) {
      toast('Bitte kurz beschreiben, was fehlt oder besser sein könnte.', 'error')
      return
    }
    setSendet(true)
    vorschlagSenden(kennung, art, t, trotzdem)
      .then((r) => {
        setListe(r.liste)
        setText('')
        setNamen('')
        setOffen(false)
        toast('Danke! Dein Vorschlag ist beim Team.', 'ok')
      })
      .catch((e) => {
        if (e instanceof HubFehler && e.grund === 'namen') setNamen(e.message)
        else toast(vorschlagFehlerText(e), 'error')
      })
      .finally(() => setSendet(false))
  }
  function aendern(id: string, was: 'plus' | 'weg') {
    setBeschaeftigt(id)
    ;(was === 'plus' ? vorschlagPlus(id) : vorschlagWeg(id))
      .then((r) => setListe(r.liste))
      .catch((e) => toast(vorschlagFehlerText(e), 'error'))
      .finally(() => setBeschaeftigt(''))
  }

  return (
    <section className="vor-blatt" aria-labelledby={tId + '-t'}>
      <div className="vor-kopf">
        <h3 id={tId + '-t'} className="bew-label">
          <Icon name="lightbulb" className="ic mr-1 inline h-4 w-4 align-[-3px]" />
          Vorschlag zum Blatt
        </h3>
        {stand === 'bereit' && !offen ? (
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              setOffen(true)
              // vor dem Schreiben den neuesten Stand zeigen – vielleicht hat schon jemand dasselbe vorgeschlagen
              vorschlaegeLesen(kennung.blatt).then(
                (r) => setListe(r.liste),
                () => {},
              )
            }}
          >
            <Icon name="plus" />
            Vorschlag machen
          </button>
        ) : null}
      </div>
      {stand === 'ohne-hub' ? <p className="vor-leise">Fehlt eine Übung, oder stimmt etwas nicht? Öffne die Toolbox aus dem Hub – dort kannst du es dem Team vorschlagen.</p> : null}
      {stand === 'laedt' ? <p className="vor-leise">Lese die Vorschläge …</p> : null}
      {stand === 'fehler' ? <p className="vor-leise">{hinweis}</p> : null}
      {stand === 'bereit' && !liste.length && !offen ? <p className="vor-leise">Fehlt eine Übung, oder stimmt etwas nicht? Schreib es hier – die Blätter werden damit verbessert.</p> : null}

      {stand === 'bereit' && liste.length ? (
        <ul className="vor-liste" aria-label="Vorschläge aus dem Team">
          {liste.map((v) => (
            <li key={v.id}>
              <span className={'vor-art vor-art-' + v.art}>{v.artText || VORSCHLAG_ARTEN.find((a) => a.key === v.art)?.text}</span>
              <p className="vor-text">{v.text}</p>
              <div className="vor-meta">
                <span>
                  {v.von === 'du' ? 'Von dir' : v.von || 'Aus dem Team'}
                  {v.am ? ' · ' + tag(v.am) : ''}
                  {v.plus ? ` · ${v.plus} ${v.plus === 1 ? 'sieht' : 'sehen'} es auch so` : ''}
                </span>
                {v.eigen ? (
                  <button type="button" className="vor-knopf" disabled={beschaeftigt === v.id} onClick={() => aendern(v.id, 'weg')}>
                    <Icon name="trash" className="ic h-3.5 w-3.5" />
                    Zurücknehmen
                  </button>
                ) : (
                  <button type="button" className="vor-knopf" aria-pressed={v.ichPlus} disabled={beschaeftigt === v.id} onClick={() => aendern(v.id, 'plus')}>
                    <Icon name="check" className="ic h-3.5 w-3.5" />
                    {v.ichPlus ? 'Sehe ich auch so' : 'Sehe ich auch so?'}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {stand === 'bereit' && offen ? (
        <div className="vor-form">
          <div className="vor-arten" role="radiogroup" aria-label="Worum geht es?">
            {VORSCHLAG_ARTEN.map((a) => (
              <button key={a.key} type="button" role="radio" aria-checked={art === a.key} className={'vor-wahl' + (art === a.key ? ' an' : '')} onClick={() => setArt(a.key)}>
                {a.text}
              </button>
            ))}
          </div>
          <label htmlFor={tId} className="sr-only">
            Dein Vorschlag
          </label>
          <textarea
            id={tId}
            className="field vor-feld"
            rows={3}
            maxLength={1200}
            value={text}
            placeholder={art === 'uebung' ? 'Welche Übung fehlt? z. B. „Eine Übung zum Zuordnen von Gesichtern“' : 'Was fehlt oder könnte besser sein?'}
            onChange={(e) => {
              setText(e.target.value)
              if (namen) setNamen('')
            }}
          />
          <p className="vor-leise">Bitte ohne Namen von Kindern. Der Hub ordnet deinen Vorschlag dem Blatt zu.</p>
          {namen ? (
            <div className="vor-namen" role="alert">
              <p>{namen}</p>
              <button type="button" className="btn btn-sm" disabled={sendet} onClick={() => senden(true)}>
                Das ist kein Name – trotzdem senden
              </button>
            </div>
          ) : null}
          <div className="vor-knoepfe">
            <button type="button" className="btn" disabled={sendet} onClick={() => setOffen(false)}>
              Abbrechen
            </button>
            <button type="button" className="btn btn-primary" disabled={sendet || text.trim().length < 3} onClick={() => senden(false)}>
              {sendet ? <span className="spin" /> : <Icon name="send" />}
              Vorschlag senden
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

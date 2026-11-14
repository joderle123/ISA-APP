// Bezugszeit (SOLO): Hefte für die Einzelarbeit mit einem Jugendlichen – Kennenlernen, Themenwahl und
// Themenhefte mit Video und Quiz. Die PDFs liegen neben der Toolbox (offline/solo/ → im Hub apps/solo/).
// Die Liste (src/data/solo.json) schreibt `dossiers/bau.tsx solo-index` aus den Heften in dossiers/solo/.
import { useMemo, useState } from 'react'
import hefteRoh from '../data/solo.json'
import { Dialog } from '../components/Dialog'
import { Icon } from '../components/Icon'
import { toast } from '../lib/toast'

interface QuizFrage {
  f: string
  o: string[]
  r: number
  warum?: string
}
interface SoloHeft {
  id: string
  nr: string
  reihe: string
  thema: string
  headline: string
  farbe: string
  datei: string
  /** Dateiname des Aktions-Hefts (acht Aktionen zum Machen), falls vorhanden */
  aktion?: string
  wann: string[]
  ziel: string
  clips: { titel: string; kanal: string; url: string; dauer: string }[]
  quiz: QuizFrage[]
}

const HEFTE = hefteRoh as SoloHeft[]
const pdf = (h: SoloHeft) => `solo/${h.datei}.pdf`

/** Fragen so, wie die Tabellenvorlage von Kahoot sie erwartet: Frage, vier Antworten, Sekunden, richtige Antwort. */
function kahootText(h: SoloHeft): string {
  return h.quiz.map((q) => [q.f, ...q.o, ...Array.from({ length: 4 - q.o.length }, () => ''), '20', String(q.r + 1)].join('\t')).join('\n')
}

async function kopieren(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const t = document.createElement('textarea')
    t.value = text
    t.style.position = 'fixed'
    t.style.opacity = '0'
    document.body.appendChild(t)
    t.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    t.remove()
    return ok
  }
}

// --- Quiz ------------------------------------------------------------------------------------

type Modus = 'allein' | 'duell'
const FORMEN = ['▲', '◆', '●', '■']

function Quiz({ heft, onClose }: { heft: SoloHeft; onClose: () => void }) {
  const [modus, setModus] = useState<Modus | null>(null)
  const [nr, setNr] = useState(0)
  const [wahl, setWahl] = useState<(number | null)[]>([null, null])
  const [punkte, setPunkte] = useState([0, 0])
  const [fertig, setFertig] = useState(false)

  const fragen = heft.quiz
  const q = fragen[nr]
  const spieler = modus === 'duell' ? ['Du', 'Gegenüber'] : ['Du']
  // Wer ist dran? Im Duell wählt erst Spieler 1 (verdeckt), dann Spieler 2 – dann wird aufgedeckt.
  const dran = modus === 'duell' ? (wahl[0] === null ? 0 : wahl[1] === null ? 1 : -1) : wahl[0] === null ? 0 : -1
  const aufgedeckt = dran === -1

  const waehle = (i: number) => {
    if (dran < 0) return
    const neu = [...wahl]
    neu[dran] = i
    setWahl(neu)
    const letzter = modus === 'duell' ? dran === 1 : true
    if (letzter) setPunkte((p) => p.map((x, k) => x + (neu[k] === q.r ? 1 : 0)))
  }
  const weiter = () => {
    if (nr + 1 >= fragen.length) setFertig(true)
    else {
      setNr(nr + 1)
      setWahl([null, null])
    }
  }
  const neustart = (m: Modus | null) => {
    setModus(m)
    setNr(0)
    setWahl([null, null])
    setPunkte([0, 0])
    setFertig(false)
  }

  return (
    <Dialog onClose={onClose} labelledBy="sq-titel" className="sq">
      <div className="sq-kopf" style={{ background: heft.farbe }}>
        <div>
          <p className="sq-kicker">SOLO #{heft.nr} · Quiz</p>
          <h2 id="sq-titel">{heft.thema}</h2>
        </div>
        <button type="button" className="sq-zu" onClick={onClose} aria-label="Quiz schließen">
          <Icon name="x" />
        </button>
      </div>

      {modus === null ? (
        <div className="sq-start">
          <p>
            {fragen.length} Fragen. Kein Konto, kein Internet. Im <strong>Duell</strong> antwortet erst die eine Person verdeckt, dann die andere – danach wird aufgedeckt.
          </p>
          <div className="sq-modi">
            <button type="button" className="sq-modus" data-autofocus onClick={() => neustart('duell')}>
              <strong>Duell</strong>
              <span>du gegen dein Gegenüber</span>
            </button>
            <button type="button" className="sq-modus" onClick={() => neustart('allein')}>
              <strong>Allein</strong>
              <span>eine Person spielt</span>
            </button>
          </div>
        </div>
      ) : fertig ? (
        <div className="sq-ende">
          <h3>Fertig.</h3>
          <div className="sq-stand gross">
            {spieler.map((s, k) => (
              <div key={s}>
                <span>{s}</span>
                <b>
                  {punkte[k]} / {fragen.length}
                </b>
              </div>
            ))}
          </div>
          {modus === 'duell' ? (
            <p>{punkte[0] === punkte[1] ? 'Unentschieden.' : punkte[0] > punkte[1] ? 'Dein Gegenüber hat verloren. Das darf man ruhig feiern.' : 'Dein Gegenüber liegt vorn. Revanche?'}</p>
          ) : null}
          <p className="sq-frage-danach">Welche Antwort hat dich überrascht – und welche glaubst du immer noch nicht?</p>
          <div className="sq-modi">
            <button type="button" className="btn btn-primary" onClick={() => neustart(modus)}>
              Noch mal
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Schließen
            </button>
          </div>
        </div>
      ) : (
        <div className="sq-spiel">
          <div className="sq-leiste">
            <span>
              Frage {nr + 1} von {fragen.length}
            </span>
            <div className="sq-stand">
              {spieler.map((s, k) => (
                <div key={s} className={dran === k ? 'dran' : ''}>
                  <span>{s}</span>
                  <b>{punkte[k]}</b>
                </div>
              ))}
            </div>
          </div>
          <h3 className="sq-frage">{q.f}</h3>
          {modus === 'duell' && !aufgedeckt ? (
            <p className="sq-dran">
              {dran === 0 ? 'Du wählst zuerst. Dein Gegenüber schaut weg.' : 'Jetzt dein Gegenüber. Die erste Antwort bleibt verdeckt.'}
            </p>
          ) : null}
          <div className="sq-antworten">
            {q.o.map((o, i) => {
              const richtig = aufgedeckt && i === q.r
              const falsch = aufgedeckt && i !== q.r && (wahl[0] === i || wahl[1] === i)
              const wer = aufgedeckt ? spieler.filter((_, k) => wahl[k] === i) : []
              return (
                <button key={o} type="button" className={`sq-a f${i} ${richtig ? 'richtig' : ''} ${falsch ? 'falsch' : ''} ${aufgedeckt && !richtig ? 'blass' : ''}`} disabled={aufgedeckt} onClick={() => waehle(i)}>
                  <span className="sq-form" aria-hidden="true">
                    {FORMEN[i]}
                  </span>
                  <span className="sq-text">{o}</span>
                  {wer.length ? <span className="sq-wer">{wer.join(' + ')}</span> : null}
                </button>
              )
            })}
          </div>
          {aufgedeckt ? (
            <div className="sq-warum">
              <p>
                <strong>Richtig: {q.o[q.r]}.</strong> {q.warum ?? ''}
              </p>
              <button type="button" className="btn btn-primary" data-autofocus onClick={weiter}>
                {nr + 1 >= fragen.length ? 'Zum Ergebnis' : 'Weiter'}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </Dialog>
  )
}

// --- Seite -----------------------------------------------------------------------------------

function HeftKarte({ h, onQuiz }: { h: SoloHeft; onQuiz: (h: SoloHeft) => void }) {
  const kahoot = async () => {
    const ok = await kopieren(kahootText(h))
    toast(ok ? 'Fragen kopiert. In der Tabellenvorlage von Kahoot in die erste Fragezeile einfügen (ungeprüft – bitte einmal testen).' : 'Kopieren hat nicht geklappt.', ok ? 'ok' : 'error', 8000)
  }
  return (
    <li className="bz-karte">
      <div className="bz-farbe" style={{ background: h.farbe }}>
        <span>#{h.nr}</span>
      </div>
      <div className="bz-inhalt">
        <p className="bz-kicker">{h.reihe === 'Start' ? 'Start' : 'Thema'}</p>
        <h3>{h.thema}</h3>
        <p className="bz-headline">{h.headline}</p>
        <p className="bz-wann">
          <strong>Passt, wenn:</strong> {h.wann[0]}
        </p>
        <div className="bz-knoepfe">
          {h.aktion ? (
            <a className="btn btn-sm btn-primary" href={`solo/${h.aktion}.pdf`} target="_blank" rel="noopener" title="Acht Aktionen zum Machen: wenig Text, einfache Sprache, eine Seite je Aktion">
              <Icon name="book" />
              Aktions-Heft
            </a>
          ) : null}
          <a className={h.aktion ? 'btn btn-sm' : 'btn btn-sm btn-primary'} href={pdf(h)} target="_blank" rel="noopener" title="Öffnet das Heft als PDF in einem neuen Tab">
            <Icon name="book" />
            {h.aktion ? 'Heft mit Hintergrund' : 'Heft (PDF)'}
          </a>
          {h.clips.map((c) => (
            <a key={c.url} className="btn btn-sm" href={c.url} target="_blank" rel="noopener" title={`${c.titel} – ${c.kanal} (braucht Internet)`}>
              <Icon name="external" />
              Video
            </a>
          ))}
          {h.quiz.length ? (
            <>
              <button type="button" className="btn btn-sm" onClick={() => onQuiz(h)}>
                <Icon name="game" />
                Quiz spielen
              </button>
              <button type="button" className="btn btn-sm btn-quiet" onClick={kahoot} title="Kopiert die Fragen für die Tabellenvorlage von Kahoot">
                für Kahoot kopieren
              </button>
            </>
          ) : null}
        </div>
      </div>
    </li>
  )
}

export function BezugszeitSeite({ onZurueck }: { onZurueck: () => void }) {
  const [quiz, setQuiz] = useState<SoloHeft | null>(null)
  const start = useMemo(() => HEFTE.filter((h) => h.reihe === 'Start'), [])
  const themen = useMemo(() => HEFTE.filter((h) => h.reihe !== 'Start'), [])
  return (
    <article className="ku-einheit bz" aria-labelledby="bz-titel">
      <nav className="ku-einheit-nav">
        <button type="button" className="link-btn" onClick={onZurueck}>
          <Icon name="chevronLeft" />
          Jahresweg
        </button>
      </nav>
      <header className="ku-einheit-kopf">
        <p className="ku-held-kicker">Bezugszeit · Einzelarbeit</p>
        <h1 id="bz-titel" className="disp">
          SOLO – der rote Faden für die Bezugszeit
        </h1>
        <p className="bz-intro">
          Hefte für die Arbeit mit einem einzelnen Jugendlichen, im Stil von REAL TALK. Sie setzen voraus, dass der Jugendliche die üblichen Sätze schon kennt: Er ist der Profi, die
          Bezugsperson macht bei den Aufgaben mit. Die letzten zwei Seiten jedes Hefts sind für die Bezugsperson.
        </p>
        <p className="bz-intro">
          <strong>Neu: Aktions-Hefte.</strong> Zu jedem Thema gibt es acht Aktionen zum Machen – eine Seite je Aktion, wenig Text, einfache Sprache, Ankreuzen und Zeichnen statt
          Schreiben. Geeignet auch für Jugendliche mit Förderbedarf. Ein Thema reicht so für mehrere Bezugszeiten.
        </p>
      </header>

      <ol className="bz-faden">
        <li>
          <b>1</b>
          <span>
            <strong>Start</strong> – erste Stunde: Der Jugendliche fragt zuerst.
          </span>
        </li>
        <li>
          <b>2</b>
          <span>
            <strong>Landkarte</strong> – er wählt die Themen und sein eigenes Ziel. Dazu das Logbuch.
          </span>
        </li>
        <li>
          <b>3</b>
          <span>
            <strong>Themenhefte</strong> – in seiner Reihenfolge. Jedes endet mit einem Experiment bis zum nächsten Mal.
          </span>
        </li>
      </ol>

      <h2 className="bz-h2">Start</h2>
      <ul className="bz-liste">
        {start.map((h) => (
          <HeftKarte key={h.id} h={h} onQuiz={setQuiz} />
        ))}
      </ul>
      <h2 className="bz-h2">Themen</h2>
      <ul className="bz-liste">
        {themen.map((h) => (
          <HeftKarte key={h.id} h={h} onQuiz={setQuiz} />
        ))}
      </ul>
      <p className="bz-hinweis">
        Videos: Geprüft ist nur, dass sie unter Titel und Kanal abrufbar waren – bitte vor der Stunde selbst ansehen. Zu jedem Thema der Landkarte (Heft #01) gibt es ein Themenheft.
      </p>
      {quiz ? <Quiz key={quiz.id} heft={quiz} onClose={() => setQuiz(null)} /> : null}
    </article>
  )
}

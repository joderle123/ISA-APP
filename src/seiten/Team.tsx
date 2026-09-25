// ---------------------------------------------------------------------------
// Team-Material: eigene Einheiten und Blätter (PDF/Word) in die gemeinsame
// Ablage auf O:\ legen – alle Verbundenen sehen sie sofort und können sie
// herunterladen. Bearbeiten/Löschen: wer hochgeladen hat und Responsables.
// ---------------------------------------------------------------------------
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { AgeLevel, Material } from '../types/material'
import { teamSync, type TeamStatus } from '../lib/teamSync'
import { slug } from '../lib/slug'
import { toast } from '../lib/toast'
import { aktuellerNutzer, darfVerwalten, nameMerken, type Nutzer } from '../lib/nutzer'
import { BEREICHE, bereichById } from '../blatt/katalog'
import type { Bewertungen } from '../lib/useBewertungen'
import { BewertungKurz, BewertungVoll } from '../components/Bewertung'
import { Dialog } from '../components/Dialog'
import { Icon } from '../components/Icon'

const STUFEN: AgeLevel[] = ['C1', 'C2', 'C3', 'C4', 'ES']
const ENDUNGEN = ['pdf', 'doc', 'docx']
const MAX_MB = 40

/** Bereich der Toolbox → Themenbereich der Einheiten-Bibliothek (für deren Filter). */
const ALTES_THEMA: Record<string, string> = {
  gefuehle: 'emotionen',
  verhalten: 'impulskontrolle',
  miteinander: 'kooperation',
  lernen: 'motivation',
  alltag: 'ressourcen',
  werkzeuge: 'etep-epu',
}

function groesse(b: number) {
  return b > 1024 * 1024 ? (b / 1024 / 1024).toFixed(1).replace('.', ',') + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'
}
function datum(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return isNaN(+d) ? '' : d.toLocaleDateString('de-LU', { day: 'numeric', month: 'short', year: 'numeric' })
}
function bereichVon(m: Material): string {
  return m.tags.find((t) => BEREICHE.some((b) => b.id === t)) ?? ''
}
function eigenes(m: Material, n: Nutzer) {
  return (m.uploadedById && m.uploadedById === n.id) || (!!n.name && m.uploadedBy === n.name)
}

function Verbindung({ status, onVerbinden }: { status: TeamStatus; onVerbinden: () => void }) {
  return (
    <section className="panel p-5" aria-label="Verbindung mit dem Team-Ordner">
      <div className="flex flex-wrap items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <Icon name="folder" className="ic h-5 w-5" />
        </span>
        <div className="min-w-[240px] flex-1">
          <h2 className="disp text-[18px] text-ink">{status.needsPermission ? 'Zugriff bestätigen' : 'Mit dem Team-Ordner verbinden'}</h2>
          <p className="mt-1 text-[14px] leading-relaxed text-muted">
            {status.needsPermission
              ? 'Der Ordner ist gemerkt – Edge fragt nach einem Neustart einmal neu nach der Erlaubnis.'
              : 'Das Team-Material liegt in einem gemeinsamen Ordner auf O:\\ (z. B. O:\\ISA-Blaetter). Einmal verbinden – danach geht es automatisch.'}
          </p>
          <ol className="mt-3 grid gap-1.5 text-[13.5px] text-ink-2 sm:grid-cols-3">
            <li className="team-schritt">
              <b>1</b> Auf „Verbinden“ klicken
            </li>
            <li className="team-schritt">
              <b>2</b> Den Team-Ordner auf O:\ wählen
            </li>
            <li className="team-schritt">
              <b>3</b> Zugriff erlauben – fertig
            </li>
          </ol>
          {!status.supported && (
            <p className="mt-3 text-[13px] text-danger">Nur mit Microsoft Edge oder Chrome möglich.</p>
          )}
          {status.error && (
            <p className="mt-3 flex items-start gap-1.5 text-[13px] text-danger" role="alert">
              <Icon name="alert" className="ic mt-px h-4 w-4" />
              {status.error}
            </p>
          )}
        </div>
        <button type="button" className="btn btn-primary" onClick={onVerbinden} disabled={!status.supported}>
          <Icon name="folder" />
          {status.needsPermission ? 'Zugriff bestätigen' : 'Verbinden'}
        </button>
      </div>
    </section>
  )
}

function Hochladen({ nutzer, onFertig }: { nutzer: Nutzer; onFertig: () => void }) {
  const [datei, setDatei] = useState<File | null>(null)
  const [ueber, setUeber] = useState(false)
  const [titel, setTitel] = useState('')
  const [name, setName] = useState(nutzer.name)
  const [stufen, setStufen] = useState<AgeLevel[]>([])
  const [bereich, setBereich] = useState('')
  const [text, setText] = useState('')
  const [laeuft, setLaeuft] = useState(false)
  const eingabe = useRef<HTMLInputElement>(null)
  const id = useId()

  function waehlen(f: File | undefined | null) {
    if (!f) return
    const ext = (f.name.split('.').pop() || '').toLowerCase()
    if (!ENDUNGEN.includes(ext)) return toast('Bitte eine PDF- oder Word-Datei wählen.', 'error')
    if (f.size > MAX_MB * 1024 * 1024) return toast(`Die Datei ist größer als ${MAX_MB} MB.`, 'error')
    setDatei(f)
    if (!titel) setTitel(f.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim())
  }

  async function speichern() {
    if (!datei) return
    if (!titel.trim()) return toast('Bitte einen Titel angeben.', 'error')
    if (!name.trim()) return toast('Bitte deinen Namen angeben.', 'error')
    if (!nutzer.ausHub) nameMerken(name)
    setLaeuft(true)
    try {
      const m: Material = {
        id: 'cdse-' + (slug(titel) || 'material').slice(0, 50) + '-' + Date.now().toString(36).slice(-5),
        title: titel.trim(),
        author: name.trim(),
        ageLevels: stufen.length ? stufen : ['C2', 'C3', 'C4'],
        type: ['Aktivitéit'],
        participants: [],
        themes: bereich ? [ALTES_THEMA[bereich]] : [],
        tags: ['Team', ...(bereich ? [bereich] : [])],
        shortDescription: text.trim() || 'Aus dem Team hochgeladen.',
        ablauf: [{ text: 'Original-Datei – über „Öffnen“ ansehen oder herunterladen.' }],
        etepStufen: [],
        eldibGoals: [],
        language: 'de',
        source: 'cdse',
        uploadedById: nutzer.id,
      }
      await teamSync.uploadMaterial(m, datei, name.trim())
      toast(`„${m.title}“ ist jetzt für alle im Team sichtbar.`, 'ok')
      setDatei(null)
      setTitel('')
      setText('')
      setStufen([])
      setBereich('')
      onFertig()
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Hochladen fehlgeschlagen.', 'error')
    } finally {
      setLaeuft(false)
    }
  }

  return (
    <section className="panel p-5" aria-label="Material hochladen">
      <h2 className="disp text-[18px] text-ink">Eigenes Material teilen</h2>
      <p className="mt-1 text-[14px] text-muted">Einheit, Arbeitsblatt oder Spielidee als PDF oder Word – alle im Team sehen es sofort.</p>
      {!datei ? (
        <button
          type="button"
          className={`team-drop ${ueber ? 'ueber' : ''}`}
          onClick={() => eingabe.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setUeber(true)
          }}
          onDragLeave={() => setUeber(false)}
          onDrop={(e) => {
            e.preventDefault()
            setUeber(false)
            waehlen(e.dataTransfer.files?.[0])
          }}
        >
          <Icon name="upload" className="ic h-7 w-7" />
          <b>Datei hierher ziehen</b>
          <span>oder klicken zum Auswählen · PDF, DOC, DOCX · bis {MAX_MB} MB</span>
        </button>
      ) : (
        <div className="mt-4 grid gap-4">
          <div className="team-datei">
            <span className={`team-typ ${datei.name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'word'}`}>{datei.name.split('.').pop()?.toUpperCase()}</span>
            <span className="min-w-0 flex-1 truncate">{datei.name}</span>
            <span className="text-[12.5px] text-muted">{groesse(datei.size)}</span>
            <button type="button" className="icon-btn" onClick={() => setDatei(null)} aria-label="Andere Datei wählen">
              <Icon name="x" />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={id + '-t'} className="team-label">
                Titel
              </label>
              <input id={id + '-t'} className="field" value={titel} onChange={(e) => setTitel(e.target.value)} maxLength={120} />
            </div>
            <div>
              <label htmlFor={id + '-n'} className="team-label">
                Von
              </label>
              <input id={id + '-n'} className="field" value={name} onChange={(e) => setName(e.target.value)} readOnly={nutzer.ausHub} placeholder="Dein Name" />
              {nutzer.ausHub && <p className="mt-1 text-[12px] text-muted">Aus deinem Hub-Konto.</p>}
            </div>
          </div>
          <div>
            <span className="team-label">Für welche Stufe?</span>
            <div className="flex flex-wrap gap-1.5">
              {STUFEN.map((s) => (
                <button key={s} type="button" className="fchip" aria-pressed={stufen.includes(s)} onClick={() => setStufen((l) => (l.includes(s) ? l.filter((x) => x !== s) : [...l, s]))}>
                  {s === 'C1' ? 'C1 · Spielschule' : s === 'ES' ? 'ES · Sekundar' : s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="team-label">Bereich</span>
            <div className="flex flex-wrap gap-1.5">
              {BEREICHE.map((b) => (
                <button key={b.id} type="button" className="fchip" aria-pressed={bereich === b.id} onClick={() => setBereich(bereich === b.id ? '' : b.id)} style={{ ['--bc' as string]: b.farben.tief }}>
                  <span className="dot" style={{ background: b.farben.tief }} />
                  {b.de}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor={id + '-b'} className="team-label">
              Kurze Beschreibung <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea id={id + '-b'} className="field min-h-[72px]" value={text} onChange={(e) => setText(e.target.value)} maxLength={600} placeholder="Worum geht es, für wen passt es, was braucht man?" />
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <button type="button" className="btn" onClick={() => setDatei(null)}>
              Abbrechen
            </button>
            <button type="button" className="btn btn-primary" onClick={speichern} disabled={laeuft}>
              {laeuft ? <span className="spin" /> : <Icon name="upload" />}
              Für das Team freigeben
            </button>
          </div>
        </div>
      )}
      <input
        ref={eingabe}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={(e) => {
          waehlen(e.target.files?.[0])
          e.target.value = ''
        }}
      />
    </section>
  )
}

function Bearbeiten({ m, onSchliessen }: { m: Material; onSchliessen: () => void }) {
  const [titel, setTitel] = useState(m.title)
  const [text, setText] = useState(m.shortDescription)
  const [stufen, setStufen] = useState<AgeLevel[]>(m.ageLevels)
  const [bereich, setBereich] = useState(bereichVon(m))
  const [laeuft, setLaeuft] = useState(false)
  const id = useId()
  async function speichern() {
    setLaeuft(true)
    try {
      await teamSync.editMaterial(m.id, {
        title: titel.trim() || m.title,
        shortDescription: text.trim() || m.shortDescription,
        ageLevels: stufen.length ? stufen : m.ageLevels,
        themes: bereich ? [ALTES_THEMA[bereich]] : m.themes,
        tags: ['Team', ...(bereich ? [bereich] : [])],
      })
      toast('Gespeichert.', 'ok')
      onSchliessen()
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Speichern fehlgeschlagen.', 'error')
    } finally {
      setLaeuft(false)
    }
  }
  return (
    <Dialog onClose={onSchliessen} labelledBy={id} className="dlg-mid">
      <header className="dlg-head items-center">
        <h2 id={id} className="disp flex-1 text-[19px]">
          Angaben bearbeiten
        </h2>
        <button type="button" className="icon-btn" onClick={onSchliessen} aria-label="Schließen">
          <Icon name="x" />
        </button>
      </header>
      <div className="dlg-body scroll-slim grid gap-4 p-5" data-autofocus tabIndex={-1} style={{ outline: 'none' }}>
        <div>
          <label htmlFor={id + '-t'} className="team-label">
            Titel
          </label>
          <input id={id + '-t'} className="field" value={titel} onChange={(e) => setTitel(e.target.value)} maxLength={120} />
        </div>
        <div>
          <span className="team-label">Stufe</span>
          <div className="flex flex-wrap gap-1.5">
            {STUFEN.map((s) => (
              <button key={s} type="button" className="fchip" aria-pressed={stufen.includes(s)} onClick={() => setStufen((l) => (l.includes(s) ? l.filter((x) => x !== s) : [...l, s]))}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="team-label">Bereich</span>
          <div className="flex flex-wrap gap-1.5">
            {BEREICHE.map((b) => (
              <button key={b.id} type="button" className="fchip" aria-pressed={bereich === b.id} onClick={() => setBereich(bereich === b.id ? '' : b.id)}>
                <span className="dot" style={{ background: b.farben.tief }} />
                {b.de}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor={id + '-b'} className="team-label">
            Beschreibung
          </label>
          <textarea id={id + '-b'} className="field min-h-[90px]" value={text} onChange={(e) => setText(e.target.value)} maxLength={600} />
        </div>
      </div>
      <footer className="dlg-foot flex justify-end gap-2">
        <button type="button" className="btn" onClick={onSchliessen}>
          Abbrechen
        </button>
        <button type="button" className="btn btn-primary" onClick={speichern} disabled={laeuft}>
          {laeuft ? <span className="spin" /> : <Icon name="check" />}
          Speichern
        </button>
      </footer>
    </Dialog>
  )
}

export function Team({ aktiv, material, bew }: { aktiv: boolean; material: Material[]; bew: Bewertungen }) {
  const [status, setStatus] = useState<TeamStatus>(teamSync.status())
  const [nutzer, setNutzer] = useState<Nutzer>(() => aktuellerNutzer())
  const [suche, setSuche] = useState('')
  const [bearbeiten, setBearbeiten] = useState<Material | null>(null)
  const [loeschen, setLoeschen] = useState<Material | null>(null)
  const [offen, setOffen] = useState<Material | null>(null)
  const [laedt, setLaedt] = useState<string | null>(null)

  useEffect(() => {
    if (!aktiv) return
    const t = setInterval(() => setStatus(teamSync.status()), 1500)
    setNutzer(aktuellerNutzer())
    return () => clearInterval(t)
  }, [aktiv])

  const liste = useMemo(() => {
    const q = suche.trim().toLowerCase()
    return material
      .filter((m) => !q || [m.title, m.author ?? '', m.uploadedBy ?? '', m.shortDescription].join(' ').toLowerCase().includes(q))
      .sort((a, b) => (b.uploadedAt ?? '').localeCompare(a.uploadedAt ?? ''))
  }, [material, suche])

  async function verbinden() {
    await teamSync.connect()
    setStatus(teamSync.status())
  }
  async function oeffnen(m: Material) {
    setLaedt(m.id)
    try {
      const url = await teamSync.getFileUrl(m)
      if (!url) throw new Error('Datei nicht verfügbar – ist die Team-Ablage verbunden?')
      const a = document.createElement('a')
      a.href = url
      a.download = m.upload?.fileName || m.title
      if (m.upload?.ext === 'pdf') a.target = '_blank'
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 60000)
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Datei konnte nicht geöffnet werden.', 'error')
    } finally {
      setLaedt(null)
    }
  }
  async function wirklichLoeschen(m: Material) {
    try {
      await teamSync.removeMaterial(m.id)
      toast(`„${m.title}“ wurde entfernt.`, 'ok')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Löschen fehlgeschlagen.', 'error')
    } finally {
      setLoeschen(null)
    }
  }

  const verwalten = darfVerwalten(nutzer)

  return (
    <div className={aktiv ? '' : 'hidden'}>
      <div className="mx-auto max-w-[1180px] px-4 pt-6 pb-16 sm:px-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="disp text-[26px] leading-tight text-ink sm:text-[30px]">Team-Material</h1>
            <p className="mt-1 text-[14px] text-muted">Eigene Einheiten und Blätter teilen – gespeichert im Team-Ordner auf O:\, ohne Internet.</p>
          </div>
          {status.connected && (
            <span className="badge badge-ok" title={status.folderName ?? ''}>
              <Icon name="checkCircle" />
              Verbunden mit {status.folderName}
            </span>
          )}
        </div>

        <div className="grid gap-5">
          {!status.connected ? <Verbindung status={status} onVerbinden={verbinden} /> : <Hochladen nutzer={nutzer} onFertig={() => setStatus(teamSync.status())} />}

          <section aria-label="Geteiltes Material">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h2 className="disp text-[19px] text-ink">
                Im Team geteilt <span className="text-muted">({material.length})</span>
              </h2>
              {material.length > 4 && (
                <label className="search search-sm w-[240px] max-w-full">
                  <Icon name="search" />
                  <span className="sr-only">Team-Material durchsuchen</span>
                  <input type="search" value={suche} onChange={(e) => setSuche(e.target.value)} placeholder="Titel, Name …" />
                </label>
              )}
            </div>
            {!liste.length ? (
              <div className="panel px-6 py-10 text-center text-[14.5px] text-muted">
                {status.connected ? 'Noch nichts geteilt. Das erste Material kannst du oben hochladen.' : 'Nach dem Verbinden erscheint hier das Material aus dem Team.'}
              </div>
            ) : (
              <ul className="team-liste">
                {liste.map((m) => {
                  const b = bereichById.get(bereichVon(m) as never)
                  const darf = verwalten || eigenes(m, nutzer)
                  return (
                    <li key={m.id} className="team-eintrag">
                      <span className={`team-typ ${m.upload?.ext === 'pdf' ? 'pdf' : 'word'}`}>{(m.upload?.ext ?? 'PDF').toUpperCase()}</span>
                      <div className="min-w-0 flex-1">
                        <button type="button" className="team-titel" onClick={() => setOffen(m)}>
                          {m.title}
                        </button>
                        <div className="team-meta">
                          <span>{m.uploadedBy || m.author || 'Team'}</span>
                          {m.uploadedAt ? <span>{datum(m.uploadedAt)}</span> : null}
                          <span>{m.ageLevels.join(', ')}</span>
                          {b ? (
                            <span className="inline-flex items-center gap-1">
                              <span className="dot" style={{ background: b.farben.tief }} />
                              {b.de}
                            </span>
                          ) : null}
                          {m.upload ? <span>{groesse(m.upload.size)}</span> : null}
                        </div>
                        {m.shortDescription && m.shortDescription !== 'Aus dem Team hochgeladen.' ? <p className="clamp-2 mt-1 text-[13.5px] text-muted">{m.shortDescription}</p> : null}
                      </div>
                      <div className="team-aktionen">
                        <BewertungKurz gesamt={bew.gesamt.get(m.id)} eigen={bew.eigene[m.id] || 0} />
                        <button type="button" className="btn btn-sm" onClick={() => oeffnen(m)} disabled={laedt === m.id}>
                          {laedt === m.id ? <span className="spin" /> : <Icon name="download" />}
                          Öffnen
                        </button>
                        {darf && !m.upload?.loose ? (
                          <button type="button" className="icon-btn" title="Angaben bearbeiten" aria-label={`Bearbeiten: ${m.title}`} onClick={() => setBearbeiten(m)}>
                            <Icon name="file" />
                          </button>
                        ) : null}
                        {darf ? (
                          <button type="button" className="icon-btn" title="Entfernen" aria-label={`Entfernen: ${m.title}`} onClick={() => setLoeschen(m)}>
                            <Icon name="trash" />
                          </button>
                        ) : null}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        </div>
      </div>

      {bearbeiten && <Bearbeiten m={bearbeiten} onSchliessen={() => setBearbeiten(null)} />}
      {loeschen && (
        <Dialog onClose={() => setLoeschen(null)} labelledBy="team-loeschen" className="dlg-mid">
          <header className="dlg-head items-center">
            <h2 id="team-loeschen" className="disp flex-1 text-[19px]">
              Material entfernen?
            </h2>
          </header>
          <div className="dlg-body p-5 text-[14.5px] text-ink-2" data-autofocus tabIndex={-1} style={{ outline: 'none' }}>
            „{loeschen.title}“ wird für alle im Team entfernt.
          </div>
          <footer className="dlg-foot flex justify-end gap-2">
            <button type="button" className="btn" onClick={() => setLoeschen(null)}>
              Abbrechen
            </button>
            <button type="button" className="btn btn-danger" onClick={() => wirklichLoeschen(loeschen)}>
              <Icon name="trash" />
              Entfernen
            </button>
          </footer>
        </Dialog>
      )}
      {offen && (
        <Dialog onClose={() => setOffen(null)} labelledBy="team-offen" className="dlg-mid">
          <header className="dlg-head items-center">
            <span className={`team-typ ${offen.upload?.ext === 'pdf' ? 'pdf' : 'word'}`}>{(offen.upload?.ext ?? 'PDF').toUpperCase()}</span>
            <div className="min-w-0 flex-1">
              <h2 id="team-offen" className="disp truncate text-[19px]">
                {offen.title}
              </h2>
              <p className="text-[12.5px] text-muted">
                Von {offen.uploadedBy || offen.author || 'Team'}
                {offen.uploadedAt ? ' · ' + datum(offen.uploadedAt) : ''}
              </p>
            </div>
            <button type="button" className="icon-btn" onClick={() => setOffen(null)} aria-label="Schließen">
              <Icon name="x" />
            </button>
          </header>
          <div className="dlg-body scroll-slim grid gap-4 p-5" data-autofocus tabIndex={-1} style={{ outline: 'none' }}>
            <p className="text-[14.5px] leading-relaxed text-ink-2">{offen.shortDescription}</p>
            <button type="button" className="btn btn-primary justify-self-start" onClick={() => oeffnen(offen)}>
              <Icon name="download" />
              Datei öffnen
            </button>
            <BewertungVoll
              titel={offen.title}
              gesamt={bew.gesamt.get(offen.id)}
              eigen={bew.eigene[offen.id] || 0}
              notiz={bew.notizen[offen.id] || ''}
              verbunden={bew.verbunden}
              onBewerten={(n) => bew.bewerten(offen.id, n)}
              onNotiz={(t) => bew.notieren(offen.id, t)}
            />
          </div>
        </Dialog>
      )}
    </div>
  )
}

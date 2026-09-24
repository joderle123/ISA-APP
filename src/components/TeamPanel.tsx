import { useEffect, useId, useState, type ReactNode } from 'react'
import { teamSync, type TeamStatus } from '../lib/teamSync'
import { ageLevels, materialTypes, themes as allThemes } from '../data/taxonomy'
import { slug } from '../lib/slug'
import type { AgeLevel, Material, MaterialType } from '../types/material'
import { Dialog } from './Dialog'
import { Icon } from './Icon'
import { toast } from '../lib/toast'

interface Props {
  onClose: () => void
  teamMaterials: Material[]
}

// Shared secret that unlocks the upload capability for selected staff.
// (Trust model = network-drive access + this code; change it for your team.)
const UPLOADER_CODE = 'sixseven_aurafarming'

function fmtTime(ts: number | null): string {
  if (!ts) return '—'
  const d = new Date(ts)
  return d.toLocaleTimeString('de', { hour: '2-digit', minute: '2-digit' })
}

export function TeamPanel({ onClose, teamMaterials }: Props) {
  const [status, setStatus] = useState<TeamStatus>(teamSync.status())
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem('isa_team_user') || ''
    } catch {
      return ''
    }
  })
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem('isa_uploader_ok') === '1'
    } catch {
      return false
    }
  })
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [showHelp, setShowHelp] = useState(() => !teamSync.status().connected)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const titleId = useId()

  useEffect(() => {
    const i = setInterval(() => setStatus(teamSync.status()), 1500)
    return () => clearInterval(i)
  }, [])

  function saveName(v: string) {
    setName(v)
    try {
      localStorage.setItem('isa_team_user', v || 'Unbekannt')
    } catch {
      /* ignore */
    }
  }
  async function connect() {
    await teamSync.connect()
    setStatus(teamSync.status())
  }
  function disconnect() {
    teamSync.disconnect()
    setStatus(teamSync.status())
  }
  function unlock() {
    if (code.trim() === UPLOADER_CODE) {
      setUnlocked(true)
      setCodeError(false)
      try {
        localStorage.setItem('isa_uploader_ok', '1')
      } catch {
        /* ignore */
      }
    } else setCodeError(true)
  }

  return (
    <Dialog onClose={onClose} labelledBy={titleId} className="dlg-mid">
      <header className="dlg-head items-center">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <Icon name="folder" className="ic h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="disp text-[19px] leading-tight">
            Team-Ablage (CDSE)
          </h2>
          <p className="text-[13px] text-muted">Gemeinsamer Ordner auf O:\ – hochgeladene Blätter sehen alle</p>
        </div>
        <button
          type="button"
          onClick={() => setShowHelp((v) => !v)}
          aria-expanded={showHelp}
          className="btn btn-sm btn-quiet"
        >
          <Icon name="help" />
          <span className="max-sm:sr-only">So geht’s</span>
        </button>
        <button type="button" onClick={onClose} className="icon-btn" aria-label="Schließen">
          <Icon name="x" />
        </button>
      </header>

      <div className="dlg-body scroll-slim space-y-5 p-5 sm:p-6" data-autofocus tabIndex={-1} style={{ outline: 'none' }}>
        {showHelp && <HelpGuide onClose={() => setShowHelp(false)} />}
        {!status.supported && (
          <div className="callout callout-error" role="alert">
            <Icon name="alert" />
            <div>
              Dieser Browser unterstützt die gemeinsame Ablage nicht. Bitte in <b>Microsoft Edge</b> oder <b>Chrome</b>{' '}
              öffnen (Firefox und Safari können das nicht).
            </div>
          </div>
        )}

        {/* Who am I */}
        <div>
          <label htmlFor={titleId + '-name'} className="mb-1.5 block text-[13px] font-semibold text-ink-2">
            Dein Name
          </label>
          <input
            id={titleId + '-name'}
            value={name}
            onChange={(e) => saveName(e.target.value)}
            placeholder="z. B. Anna Muster"
            className="field"
          />
          <p className="mt-1 text-[12.5px] text-muted">Erscheint bei „zuletzt von …“ und bei deinen Uploads.</p>
        </div>

        {/* Connection */}
        <section className="panel p-4" aria-label="Verbindung">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-[14.5px] font-semibold text-ink">Verbindung</h3>
            {status.connected ? (
              <span className="badge badge-ok">
                <Icon name="checkCircle" />
                Verbunden
              </span>
            ) : (
              <span className="badge badge-ki">Nicht verbunden</span>
            )}
          </div>
          {status.connected ? (
            <>
              <p className="flex flex-wrap items-center gap-x-1.5 text-[14px] text-ink-2">
                <Icon name="folder" className="ic h-4 w-4 text-muted" />
                <b className="font-semibold">{status.folderName}</b>
                <span className="text-muted">
                  · {status.count} Blätter · zuletzt {fmtTime(status.lastSync)}
                  {status.lastBy ? ` · von ${status.lastBy}` : ''}
                </span>
              </p>
              <button type="button" onClick={disconnect} className="btn btn-sm mt-3">
                Trennen
              </button>
            </>
          ) : (
            <>
              <p className="text-[14px] leading-relaxed text-muted">
                {status.needsPermission
                  ? 'Der Ordner ist gemerkt – bitte den Zugriff einmal neu bestätigen.'
                  : 'Eine Person legt einen Ordner auf O:\\ an (z. B. O:\\ISA-Blaetter). Alle anderen wählen genau diesen Ordner.'}
              </p>
              <button type="button" onClick={connect} disabled={!status.supported} className="btn btn-primary mt-3">
                <Icon name="folder" />
                {status.needsPermission ? 'Zugriff bestätigen' : 'Team-Ordner verbinden'}
              </button>
            </>
          )}
          {status.error && (
            <p className="mt-2 flex items-start gap-1.5 text-[13px] text-danger" role="alert">
              <Icon name="alert" className="ic mt-px h-4 w-4" />
              {status.error}
            </p>
          )}
        </section>

        {/* Upload (gated) */}
        {status.connected && (
          <section className="panel p-4" aria-label="Material hochladen">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="text-[14.5px] font-semibold text-ink">Material hochladen</h3>
              {unlocked && (
                <span className="badge badge-ok">
                  <Icon name="check" />
                  Freigeschaltet
                </span>
              )}
            </div>
            {!unlocked ? (
              <form
                className="flex flex-wrap items-end gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  unlock()
                }}
              >
                <div className="min-w-[200px] flex-1">
                  <label htmlFor={titleId + '-code'} className="mb-1 block text-[13px] text-muted">
                    Nur für berechtigte CDSE-Mitarbeitende. Code eingeben:
                  </label>
                  <input
                    id={titleId + '-code'}
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value)
                      setCodeError(false)
                    }}
                    type="password"
                    placeholder="Uploader-Code"
                    className="field"
                    aria-invalid={codeError}
                    aria-describedby={codeError ? titleId + '-codeerr' : undefined}
                  />
                </div>
                <button type="submit" className="btn">
                  <Icon name="lock" />
                  Freischalten
                </button>
                {codeError && (
                  <p id={titleId + '-codeerr'} className="w-full text-[13px] text-danger" role="alert">
                    Der Code stimmt nicht.
                  </p>
                )}
              </form>
            ) : showUpload ? (
              <UploadForm
                uploaderName={name || 'CDSE'}
                onDone={() => {
                  setShowUpload(false)
                  toast('Hochgeladen – das Blatt ist jetzt für alle sichtbar.', 'ok')
                }}
                onCancel={() => setShowUpload(false)}
              />
            ) : (
              <button type="button" onClick={() => setShowUpload(true)} className="btn btn-primary">
                <Icon name="upload" />
                PDF oder Word hochladen
              </button>
            )}
          </section>
        )}

        {/* Uploaded list */}
        {teamMaterials.length > 0 && (
          <section aria-label="Team-Blätter">
            <h3 className="eyebrow mb-2">Team-Blätter ({teamMaterials.length})</h3>
            <ul className="scroll-slim m-0 max-h-64 list-none space-y-1.5 overflow-y-auto p-0 pr-1">
              {teamMaterials.map((m) => (
                <li key={m.id} className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-surface p-2.5 text-[14px]">
                  <span className="badge badge-upload">
                    <Icon name="folder" />
                    CDSE
                  </span>
                  <span className="min-w-0 flex-1 truncate text-ink">{m.title}</span>
                  <span className="shrink-0 text-[12.5px] text-muted">{m.uploadedBy}</span>
                  {unlocked &&
                    (confirmId === m.id ? (
                      <span className="flex items-center gap-1.5">
                        <span className="text-[12.5px] text-danger">Für alle entfernen?</span>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger btn-primary"
                          onClick={() => {
                            setConfirmId(null)
                            teamSync.removeMaterial(m.id).catch(() => toast('Entfernen fehlgeschlagen.', 'error'))
                          }}
                        >
                          Entfernen
                        </button>
                        <button type="button" className="btn btn-sm btn-quiet" onClick={() => setConfirmId(null)}>
                          Abbrechen
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmId(m.id)}
                        className="btn btn-sm btn-quiet btn-danger"
                        aria-label={`${m.title} entfernen`}
                      >
                        <Icon name="trash" />
                      </button>
                    ))}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Dialog>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-[12px] font-bold text-white">{n}</span>
      <div className="text-[14px] leading-relaxed text-ink-2">
        <b className="font-semibold text-ink">{title}</b> {children}
      </div>
    </li>
  )
}

function HelpGuide({ onClose }: { onClose: () => void }) {
  return (
    <section className="rounded-2xl border border-accent-line bg-accent-soft/60 p-4" aria-label="Anleitung Team-Ablage">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
          <Icon name="book" className="ic h-4 w-4 text-accent" />
          So funktioniert die Team-Ablage
        </h3>
        <button type="button" onClick={onClose} className="link-btn text-[13px]">
          Ausblenden
        </button>
      </div>

      <div className="callout py-2 text-[13px]">
        <Icon name="alert" className="ic h-4 w-4" />
        <div>
          Nur mit <b>Microsoft Edge</b> oder <b>Chrome</b> (Firefox und Safari können das nicht).
        </div>
      </div>

      <h4 className="eyebrow mt-4">1 · Verbinden (einmalig)</h4>
      <ol className="m-0 mt-2 list-none space-y-2.5 p-0">
        <Step n={1} title="Namen eintragen">
          oben ins Feld „Dein Name“ – erscheint bei „zuletzt von …“.
        </Step>
        <Step n={2} title="Ordner anlegen">
          Eine Person legt auf dem Laufwerk O:\ einen Ordner an, z. B. <code className="rounded bg-page-2 px-1.5">O:\ISA-Blaetter</code>.
        </Step>
        <Step n={3} title="Verbinden">
          Auf „Team-Ordner verbinden“ klicken, diesen Ordner wählen und den Zugriff <b>erlauben</b>.
        </Step>
        <Step n={4} title="Alle anderen">
          machen dasselbe und wählen <b>genau denselben</b> Ordner. Fertig – es steht „Verbunden“.
        </Step>
      </ol>

      <h4 className="eyebrow mt-4">2 · Blatt hochladen – zwei Wege</h4>
      <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface p-3">
          <div className="mb-1 flex items-center gap-1.5 text-[14px] font-semibold text-ink">
            <Icon name="folder" className="ic h-4 w-4 text-accent" />
            Einfach hineinlegen
          </div>
          <p className="text-[13px] leading-relaxed text-muted">
            PDF oder Word direkt in den Ordner <code className="rounded bg-page-2 px-1">O:\ISA-Blaetter</code> kopieren. Nach ein paar
            Sekunden erscheint die Datei bei <b>allen</b> (Titel = Dateiname).
          </p>
        </div>
        <div className="rounded-xl border border-line bg-surface p-3">
          <div className="mb-1 flex items-center gap-1.5 text-[14px] font-semibold text-ink">
            <Icon name="upload" className="ic h-4 w-4 text-accent" />
            In der Toolbox hochladen
          </div>
          <p className="text-[13px] leading-relaxed text-muted">
            „Material hochladen“ → Code eingeben → Datei mit <b>Titel, Alter und Thema</b> angeben. Besser für Suche und
            Material-Finder.
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-line bg-surface p-3 text-[13px] text-muted">
        <b className="font-semibold text-ink">Gut zu wissen</b>
        <ul className="mt-1 list-disc space-y-0.5 pl-4">
          <li>
            <b>Sehen</b> können alle Verbundenen, <b>hochladen</b> nur berechtigte Kolleginnen und Kollegen (mit Code).
          </li>
          <li>
            Alles bleibt <b>im Haus</b> auf O:\ – kein Internet, keine Cloud.
          </li>
          <li>Nach einem Browser-Neustart evtl. einmal „Zugriff bestätigen“ klicken (Edge fragt die Erlaubnis neu).</li>
          <li>
            <span className="badge badge-ok align-middle">ISA-Team</span> = geprüftes Material,{' '}
            <span className="badge badge-upload align-middle">Team-Ablage</span> = Upload aus dem Team,{' '}
            <span className="badge badge-ki align-middle">KI-Entwurf</span> = KI-generiert, vor dem Einsatz prüfen.
          </li>
        </ul>
      </div>
    </section>
  )
}

const AGE_IDS: AgeLevel[] = ['C1', 'C2', 'C3', 'C4', 'ES']

function UploadForm({ uploaderName, onDone, onCancel }: { uploaderName: string; onDone: () => void; onCancel: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [ages, setAges] = useState<AgeLevel[]>([])
  const [themeIds, setThemeIds] = useState<string[]>([])
  const [type, setType] = useState<MaterialType>('Aktivitéit')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const id = useId()

  function toggle<T>(arr: T[], v: T, set: (a: T[]) => void, max = Infinity) {
    if (arr.includes(v)) set(arr.filter((x) => x !== v))
    else if (arr.length < max) set([...arr, v])
  }

  async function submit() {
    if (!file) {
      setErr('Bitte eine Datei wählen.')
      return
    }
    if (!title.trim()) {
      setErr('Bitte einen Titel eingeben.')
      return
    }
    setBusy(true)
    setErr(null)
    try {
      const mid = 'cdse-' + (slug(title) || 'material') + '-' + Date.now().toString(36)
      const m: Material = {
        id: mid,
        title: title.trim(),
        author: uploaderName,
        ageLevels: ages.length ? ages : ['ES'],
        type: [type],
        participants: [],
        themes: themeIds.slice(0, 3),
        tags: ['CDSE'],
        shortDescription: desc.trim() || 'Von CDSE hochgeladenes Material.',
        ablauf: [{ text: 'Original-Datei — über „Datei öffnen" ansehen / herunterladen.' }],
        etepStufen: [],
        eldibGoals: [],
        language: 'de',
        source: 'cdse',
      }
      await teamSync.uploadMaterial(m, file)
      onDone()
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload fehlgeschlagen')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-3.5">
      <div>
        <label htmlFor={id + '-file'} className="mb-1 block text-[13px] font-semibold text-ink-2">
          Datei (PDF oder Word)
        </label>
        <input
          id={id + '-file'}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => {
            const f = e.target.files?.[0] || null
            setFile(f)
            if (f && !title) setTitle(f.name.replace(/\.[^.]+$/, ''))
          }}
          className="block w-full text-[14px] text-ink-2 file:mr-3 file:rounded-lg file:border file:border-line-2 file:bg-surface file:px-3 file:py-1.5 file:font-semibold file:text-ink"
        />
      </div>
      <div>
        <label htmlFor={id + '-title'} className="mb-1 block text-[13px] font-semibold text-ink-2">
          Titel *
        </label>
        <input id={id + '-title'} value={title} onChange={(e) => setTitle(e.target.value)} className="field" />
      </div>
      <div>
        <label htmlFor={id + '-desc'} className="mb-1 block text-[13px] font-semibold text-ink-2">
          Kurzbeschreibung
        </label>
        <textarea id={id + '-desc'} value={desc} onChange={(e) => setDesc(e.target.value)} rows={2} className="field resize-y" />
      </div>
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-1.5 text-[13px] font-semibold text-ink-2">Altersstufe</legend>
        <div className="flex flex-wrap gap-1.5">
          {AGE_IDS.map((a) => (
            <button key={a} type="button" aria-pressed={ages.includes(a)} onClick={() => toggle(ages, a, setAges)} className="fchip">
              {ageLevels.find((x) => x.id === a)?.label ?? a}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-1.5 text-[13px] font-semibold text-ink-2">Format</legend>
        <div className="flex flex-wrap gap-1.5">
          {materialTypes
            .filter((t) => t.id !== 'Hospi')
            .map((t) => (
              <button key={t.id} type="button" aria-pressed={type === t.id} onClick={() => setType(t.id)} className="fchip">
                {t.labelDe}
              </button>
            ))}
        </div>
      </fieldset>
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-1.5 text-[13px] font-semibold text-ink-2">Themen (höchstens 3)</legend>
        <div className="scroll-slim max-h-32 overflow-y-auto rounded-xl border border-line p-2">
          <div className="flex flex-wrap gap-1.5">
            {allThemes.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={themeIds.includes(t.id)}
                onClick={() => toggle(themeIds, t.id, setThemeIds, 3)}
                className="fchip min-h-[28px] text-[12.5px]"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </fieldset>
      {err && (
        <p className="flex items-center gap-1.5 text-[13px] text-danger" role="alert">
          <Icon name="alert" className="ic h-4 w-4" />
          {err}
        </p>
      )}
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="btn btn-quiet">
          Abbrechen
        </button>
        <button type="button" onClick={submit} disabled={busy} className="btn btn-primary">
          {busy ? <span className="spin" /> : <Icon name="upload" />}
          {busy ? 'Wird hochgeladen …' : 'Hochladen und teilen'}
        </button>
      </div>
    </div>
  )
}

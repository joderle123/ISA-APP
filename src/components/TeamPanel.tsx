import { useEffect, useMemo, useState } from 'react'
import { teamSync, type TeamStatus } from '../lib/teamSync'
import { ageLevels, materialTypes, themes as allThemes } from '../data/taxonomy'
import { slug } from '../lib/slug'
import type { AgeLevel, Material, MaterialType } from '../types/material'

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
    try { return localStorage.getItem('isa_team_user') || '' } catch { return '' }
  })
  const [unlocked, setUnlocked] = useState(() => {
    try { return localStorage.getItem('isa_uploader_ok') === '1' } catch { return false }
  })
  const [code, setCode] = useState('')
  const [showUpload, setShowUpload] = useState(false)

  useEffect(() => {
    const i = setInterval(() => setStatus(teamSync.status()), 1500)
    return () => clearInterval(i)
  }, [])

  function saveName(v: string) {
    setName(v)
    try { localStorage.setItem('isa_team_user', v || 'Unbekannt') } catch { /* ignore */ }
  }
  async function connect() { await teamSync.connect(); setStatus(teamSync.status()) }
  function disconnect() { teamSync.disconnect(); setStatus(teamSync.status()) }
  function unlock() {
    if (code.trim() === UPLOADER_CODE) {
      setUnlocked(true)
      try { localStorage.setItem('isa_uploader_ok', '1') } catch { /* ignore */ }
    } else alert('Code stimmt nicht.')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-sm sm:p-8" onClick={onClose}>
      <div className="my-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-5">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-600 text-lg">🗂️</div>
            <div>
              <div className="font-bold text-slate-800">Team-Ablage (CDSE)</div>
              <div className="text-xs text-slate-400">Gemeinsamer Ordner auf O:\ — hochgeladene Blätter sehen alle</div>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100" aria-label="Schließen">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-5 p-5">
          {!status.supported && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
              Dieser Browser unterstützt die gemeinsame Ablage nicht. Bitte in <b>Microsoft Edge</b> oder <b>Chrome</b> öffnen (Firefox/Safari können das nicht).
            </div>
          )}

          {/* Who am I */}
          <div>
            <label className="mb-1 block text-xs font-semibold tracking-wide text-slate-500 uppercase">Wer bin ich?</label>
            <input
              value={name}
              onChange={(e) => saveName(e.target.value)}
              placeholder={'Dein Name (erscheint bei „zuletzt von …")'}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-600"
            />
          </div>

          {/* Connection */}
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Verbindung</span>
              {status.connected ? (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">✓ Verbunden</span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">nicht verbunden</span>
              )}
            </div>
            {status.connected ? (
              <>
                <div className="text-sm text-slate-600">
                  📁 <b>{status.folderName}</b> · {status.count} Blätter · zuletzt {fmtTime(status.lastSync)}
                  {status.lastBy ? ` · von ${status.lastBy}` : ''}
                </div>
                <button type="button" onClick={disconnect} className="mt-3 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                  Trennen
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-500">
                  {status.needsPermission
                    ? 'Ordner gemerkt — bitte Zugriff erneut bestätigen.'
                    : 'Eine Person legt einen Ordner auf O:\\ an (z. B. O:\\ISA-Blaetter). Alle anderen wählen genau diesen Ordner.'}
                </p>
                <button
                  type="button"
                  onClick={connect}
                  disabled={!status.supported}
                  className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  📂 Team-Ordner verbinden
                </button>
              </>
            )}
            {status.error && <div className="mt-2 text-xs text-rose-600">{status.error}</div>}
          </div>

          {/* Upload (gated) */}
          {status.connected && (
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Material hochladen</span>
                {unlocked && <span className="text-xs text-emerald-600">freigeschaltet</span>}
              </div>
              {!unlocked ? (
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <p className="mb-1 text-xs text-slate-500">Nur für berechtigte CDSE-Mitarbeiter. Code eingeben:</p>
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      type="password"
                      placeholder="Uploader-Code"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                    />
                  </div>
                  <button type="button" onClick={unlock} className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700">
                    Freischalten
                  </button>
                </div>
              ) : showUpload ? (
                <UploadForm
                  uploaderName={name || 'CDSE'}
                  onDone={() => setShowUpload(false)}
                  onCancel={() => setShowUpload(false)}
                />
              ) : (
                <button type="button" onClick={() => setShowUpload(true)} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                  ⬆️ PDF / Word hochladen
                </button>
              )}
            </div>
          )}

          {/* Uploaded list */}
          {teamMaterials.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Team-Blätter ({teamMaterials.length})
              </div>
              <div className="max-h-52 space-y-1.5 overflow-y-auto pr-1">
                {teamMaterials.map((m) => (
                  <div key={m.id} className="flex items-center gap-2 rounded-lg border border-slate-100 p-2 text-sm">
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-200">CDSE</span>
                    <span className="min-w-0 flex-1 truncate text-slate-700">{m.title}</span>
                    <span className="shrink-0 text-xs text-slate-400">{m.uploadedBy}</span>
                    {unlocked && (
                      <button
                        type="button"
                        onClick={() => { if (confirm('Dieses Team-Blatt für alle entfernen?')) teamSync.removeMaterial(m.id) }}
                        className="shrink-0 rounded px-1.5 py-0.5 text-xs text-rose-500 hover:bg-rose-50"
                      >
                        entfernen
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
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

  const themeOptions = useMemo(() => allThemes, [])

  function toggle<T>(arr: T[], v: T, set: (a: T[]) => void) {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])
  }

  async function submit() {
    if (!file) { setErr('Bitte eine Datei wählen.'); return }
    if (!title.trim()) { setErr('Bitte einen Titel eingeben.'); return }
    setBusy(true); setErr(null)
    try {
      const id = 'cdse-' + (slug(title) || 'material') + '-' + Date.now().toString(36)
      const m: Material = {
        id,
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
    <div className="space-y-3">
      <input
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={(e) => { const f = e.target.files?.[0] || null; setFile(f); if (f && !title) setTitle(f.name.replace(/\.[^.]+$/, '')) }}
        className="w-full text-sm"
      />
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titel *" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-600" />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={2} placeholder="Kurzbeschreibung" className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-600" />
      <div>
        <div className="mb-1 text-xs font-medium text-slate-500">Altersstufe</div>
        <div className="flex flex-wrap gap-1.5">
          {AGE_IDS.map((a) => (
            <button key={a} type="button" onClick={() => toggle(ages, a, setAges)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${ages.includes(a) ? 'bg-emerald-600 text-white ring-emerald-600' : 'bg-white text-slate-600 ring-slate-200'}`}>
              {ageLevels.find((x) => x.id === a)?.label ?? a}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-slate-500">Typ</div>
        <div className="flex flex-wrap gap-1.5">
          {materialTypes.filter((t) => t.id !== 'Hospi').map((t) => (
            <button key={t.id} type="button" onClick={() => setType(t.id)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${type === t.id ? 'bg-emerald-600 text-white ring-emerald-600' : 'bg-white text-slate-600 ring-slate-200'}`}>
              {t.labelDe}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1 text-xs font-medium text-slate-500">Themen (max. 3)</div>
        <div className="max-h-28 overflow-y-auto rounded-lg border border-slate-100 p-2">
          <div className="flex flex-wrap gap-1.5">
            {themeOptions.map((t) => (
              <button key={t.id} type="button" onClick={() => toggle(themeIds, t.id, setThemeIds)}
                className={`rounded-full px-2 py-0.5 text-[11px] ring-1 ${themeIds.includes(t.id) ? 'bg-isa-blue-deep text-white ring-isa-blue-deep' : 'bg-white text-slate-600 ring-slate-200'}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {err && <div className="text-xs text-rose-600">{err}</div>}
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">Abbrechen</button>
        <button type="button" onClick={submit} disabled={busy} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">
          {busy ? 'Lädt hoch…' : 'Hochladen & teilen'}
        </button>
      </div>
    </div>
  )
}

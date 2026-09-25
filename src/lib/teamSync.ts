// ---------------------------------------------------------------------------
// ISA_SYNC — shared team folder on a network drive (e.g. O:\), no server, no
// cloud. Modelled on the proven "KB_SYNC" pattern: a small manifest JSON that
// every browser reads/merges on a timer, PLUS a subfolder holding the real
// uploaded PDF/Word files (kept out of the JSON so large files stay fast).
//
// Uses the File System Access API → Chromium only (Edge / Chrome). The folder
// handle is persisted in IndexedDB so the app auto-reconnects. Records merge
// per-id, newer `_ts` wins, deletions travel as tombstones (`_del`). Eventually
// consistent by polling — plenty for a small team.
// ---------------------------------------------------------------------------
import type { Material } from '../types/material'
import { slug } from './slug'
import { aktuellerNutzer } from './nutzer'

const MANIFEST = 'isa-manifest.json'
const FILES_DIR = 'blaetter'
const FORMAT = 'isa-shared-v1'
const POLL_MS = 5000
const IDB_DB = 'isa-team'
const IDB_KEY = 'dirHandle'

export interface TeamRecord extends Material {
  _ts: number
  _del?: boolean
}
interface Manifest {
  _format: string
  _savedAt?: string
  _savedBy?: string
  materials: TeamRecord[]
}

export interface TeamStatus {
  supported: boolean
  connected: boolean
  needsPermission: boolean
  folderName: string | null
  lastSync: number | null
  lastBy: string | null
  count: number
  error: string | null
}

// --- Gemeinsame Bewertungen ----------------------------------------------------
// Pro Person eine eigene Datei in bewertungen/ – so überschreibt niemand die
// Bewertungen der anderen, auch wenn mehrere gleichzeitig speichern.
const RATINGS_DIR = 'bewertungen'
const RATINGS_FORMAT = 'isa-bewertung-v1'
const RATINGS_POLL_MS = 30000

export interface EigeneBewertung {
  /** 1–5 Sterne, 0 = keine */
  s: number
  /** kurzer Praxis-Tipp (optional) */
  notiz?: string
  /** Zeitpunkt (ms) */
  t: number
}
export interface BewertungsDatei {
  _format: string
  name: string
  stand: string
  werte: Record<string, EigeneBewertung>
}
export interface Gesamtbewertung {
  schnitt: number
  anzahl: number
  notizen: { name: string; text: string; t: number }[]
}
type RatingListener = (alle: Map<string, Gesamtbewertung>) => void

let ratingFiles = new Map<string, { mod: number; data: BewertungsDatei }>()
let ratingTimer: ReturnType<typeof setInterval> | null = null
let ratingListeners: RatingListener[] = []
let aggregiert = new Map<string, Gesamtbewertung>()

function aggregieren(): Map<string, Gesamtbewertung> {
  const summe = new Map<string, { s: number; n: number; notizen: { name: string; text: string; t: number }[] }>()
  for (const { data } of ratingFiles.values()) {
    for (const [id, w] of Object.entries(data.werte || {})) {
      const e = summe.get(id) ?? { s: 0, n: 0, notizen: [] }
      if (w.s >= 1 && w.s <= 5) {
        e.s += w.s
        e.n += 1
      }
      if (w.notiz && w.notiz.trim()) e.notizen.push({ name: data.name || 'Kollegin/Kollege', text: w.notiz.trim().slice(0, 400), t: w.t || 0 })
      summe.set(id, e)
    }
  }
  const out = new Map<string, Gesamtbewertung>()
  for (const [id, e] of summe) out.set(id, { schnitt: e.n ? e.s / e.n : 0, anzahl: e.n, notizen: e.notizen.sort((a, b) => b.t - a.t) })
  return out
}

// --- tiny IndexedDB (handle persistence) ------------------------------------
function idb(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const r = indexedDB.open(IDB_DB, 1)
    r.onupgradeneeded = () => r.result.createObjectStore('kv')
    r.onsuccess = () => res(r.result)
    r.onerror = () => rej(r.error)
  })
}
async function idbGet<T>(key: string): Promise<T | undefined> {
  const db = await idb()
  return new Promise((res, rej) => {
    const tx = db.transaction('kv', 'readonly').objectStore('kv').get(key)
    tx.onsuccess = () => res(tx.result as T)
    tx.onerror = () => rej(tx.error)
  })
}
async function idbSet(key: string, val: unknown): Promise<void> {
  const db = await idb()
  return new Promise((res, rej) => {
    const tx = db.transaction('kv', 'readwrite').objectStore('kv').put(val, key)
    tx.onsuccess = () => res()
    tx.onerror = () => rej(tx.error)
  })
}

// --- merge (exported for tests) ---------------------------------------------
function mergeRecords(a: TeamRecord[], b: TeamRecord[]): TeamRecord[] {
  const map = new Map<string, TeamRecord>()
  for (const r of [...a, ...b]) {
    const prev = map.get(r.id)
    if (!prev || (r._ts || 0) >= (prev._ts || 0)) map.set(r.id, r)
  }
  return [...map.values()]
}

// --- the engine -------------------------------------------------------------
type Handle = FileSystemDirectoryHandle
type Listener = (materials: Material[]) => void

let dir: Handle | null = null
let cache: TeamRecord[] = []
let timer: ReturnType<typeof setInterval> | null = null
let listeners: Listener[] = []
const status: TeamStatus = {
  supported: typeof window !== 'undefined' && 'showDirectoryPicker' in window,
  connected: false,
  needsPermission: false,
  folderName: null,
  lastSync: null,
  lastBy: null,
  count: 0,
  error: null,
}

function whoAmI(): string {
  const n = aktuellerNutzer()
  return n.name || 'Unbekannt'
}

function emit() {
  const mats = cache.filter((r) => !r._del).map(stripMeta)
  status.count = mats.length
  for (const l of listeners) l(mats)
}
function stripMeta(r: TeamRecord): Material {
  const { _ts, _del, ...m } = r
  void _ts
  void _del
  return m as Material
}

async function verifyPermission(h: Handle, write: boolean): Promise<boolean> {
  const opts = { mode: write ? 'readwrite' : 'read' }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyH = h as any
  if ((await anyH.queryPermission(opts)) === 'granted') return true
  if ((await anyH.requestPermission(opts)) === 'granted') return true
  return false
}

async function readManifest(h: Handle): Promise<Manifest | null> {
  try {
    const fh = await h.getFileHandle(MANIFEST)
    const f = await fh.getFile()
    const txt = await f.text()
    if (!txt.trim()) return { _format: FORMAT, materials: [] }
    const j = JSON.parse(txt) as Manifest
    return j && Array.isArray(j.materials) ? j : { _format: FORMAT, materials: [] }
  } catch {
    return { _format: FORMAT, materials: [] } // not created yet
  }
}
async function writeManifest(h: Handle, m: Manifest): Promise<void> {
  const fh = await h.getFileHandle(MANIFEST, { create: true })
  const w = await fh.createWritable()
  await w.write(JSON.stringify(m, null, 2))
  await w.close()
}

async function filesDir(create = false): Promise<FileSystemDirectoryHandle | null> {
  if (!dir) return null
  try {
    return await dir.getDirectoryHandle(FILES_DIR, { create })
  } catch {
    return null
  }
}

const FILE_EXT = new Set(['pdf', 'doc', 'docx'])

/** Auto-detect PDF/Word files dropped straight into the shared folder (not yet
 *  in the manifest) so „einfach in den Ordner legen" just works for everyone. */
async function scanLoose(known: Set<string>): Promise<TeamRecord[]> {
  if (!dir) return []
  const out: TeamRecord[] = []
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for await (const entry of (dir as any).values()) {
      if (entry.kind !== 'file') continue
      const name: string = entry.name
      if (name === MANIFEST || name.startsWith('.')) continue
      const ext = (name.split('.').pop() || '').toLowerCase()
      if (!FILE_EXT.has(ext)) continue
      const base = name.replace(/\.[^.]+$/, '')
      const id = 'cdse-loose-' + (slug(base) || 'datei')
      if (known.has(id)) continue // already imported (or tombstoned)
      const f = await entry.getFile()
      out.push({
        id,
        title: base,
        author: 'CDSE (Ordner)',
        ageLevels: ['ES'],
        type: ['Aktivitéit'],
        participants: [],
        themes: [],
        tags: ['CDSE'],
        shortDescription: 'Direkt in den Team-Ordner gelegtes Material.',
        ablauf: [{ text: 'Original-Datei — über „Datei öffnen" ansehen / herunterladen.' }],
        etepStufen: [],
        eldibGoals: [],
        language: 'de',
        source: 'cdse',
        uploadedBy: 'Ordner',
        uploadedAt: new Date(f.lastModified).toISOString(),
        upload: { fileName: name, ext, mime: f.type || 'application/octet-stream', size: f.size, loose: true },
        _ts: f.lastModified || Date.now(),
      })
    }
  } catch {
    /* listing not possible – ignore */
  }
  return out
}

/** One read → scan loose files → merge → (write back if we hold newer) → emit. */
async function cycle(): Promise<void> {
  if (!dir) return
  try {
    const remote = await readManifest(dir)
    if (!remote) return
    const known = new Set([...cache.map((r) => r.id), ...remote.materials.map((r) => r.id)])
    const loose = await scanLoose(known)
    const merged = mergeRecords(mergeRecords(remote.materials, cache), loose)
    const remoteKey = JSON.stringify(remote.materials.map((r) => [r.id, r._ts, r._del]).sort())
    const mergedKey = JSON.stringify(merged.map((r) => [r.id, r._ts, r._del]).sort())
    if (mergedKey !== remoteKey) {
      // we hold changes not yet in the file → propagate
      await writeManifest(dir, { _format: FORMAT, _savedAt: new Date().toISOString(), _savedBy: whoAmI(), materials: merged })
    }
    const changed = JSON.stringify(cache.map((r) => [r.id, r._ts, r._del]).sort()) !== mergedKey
    cache = merged
    status.lastSync = Date.now()
    status.lastBy = remote._savedBy || status.lastBy
    status.error = null
    if (changed) emit()
    else {
      status.count = cache.filter((r) => !r._del).length
    }
  } catch (e) {
    status.error = e instanceof Error ? e.message : 'Sync-Fehler'
  }
}

async function ratingCycle(): Promise<void> {
  if (!dir) return
  try {
    const rd = await dir.getDirectoryHandle(RATINGS_DIR, { create: false }).catch(() => null)
    if (!rd) return
    const gesehen = new Set<string>()
    let geaendert = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for await (const entry of (rd as any).values()) {
      if (entry.kind !== 'file' || !entry.name.endsWith('.json')) continue
      gesehen.add(entry.name)
      const f: File = await entry.getFile()
      const alt = ratingFiles.get(entry.name)
      if (alt && alt.mod === f.lastModified) continue
      try {
        const data = JSON.parse(await f.text()) as BewertungsDatei
        if (data && data._format === RATINGS_FORMAT && data.werte) {
          ratingFiles.set(entry.name, { mod: f.lastModified, data })
          geaendert = true
        }
      } catch {
        /* halb geschriebene Datei – beim nächsten Mal */
      }
    }
    for (const k of [...ratingFiles.keys()]) if (!gesehen.has(k)) (ratingFiles.delete(k), (geaendert = true))
    if (geaendert) {
      aggregiert = aggregieren()
      for (const l of ratingListeners) l(aggregiert)
    }
  } catch {
    /* Ordner nicht lesbar – später erneut */
  }
}

async function afterConnect(): Promise<void> {
  status.connected = true
  status.needsPermission = false
  status.folderName = dir?.name ?? null
  await cycle()
  emit()
  if (timer) clearInterval(timer)
  timer = setInterval(cycle, POLL_MS)
  await ratingCycle()
  if (ratingTimer) clearInterval(ratingTimer)
  ratingTimer = setInterval(ratingCycle, RATINGS_POLL_MS)
}

export const teamSync = {
  status: () => ({ ...status }),
  onChange(cb: Listener) {
    listeners.push(cb)
    return () => { listeners = listeners.filter((l) => l !== cb) }
  },

  /** Restore a previously-picked folder (call on startup). May need a click to
   *  re-grant permission after a full browser restart. */
  async reconnect(): Promise<boolean> {
    if (!status.supported) return false
    const h = await idbGet<Handle>(IDB_KEY)
    if (!h) return false
    dir = h
    status.folderName = h.name
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const perm = await (h as any).queryPermission({ mode: 'readwrite' })
    if (perm === 'granted') {
      await afterConnect()
      return true
    }
    status.needsPermission = true
    return false
  },

  /** Prompt the user to pick / re-grant the shared team folder. */
  async connect(): Promise<boolean> {
    if (!status.supported) {
      status.error = 'Dieser Browser unterstützt keine gemeinsame Ablage. Bitte Microsoft Edge oder Chrome verwenden.'
      return false
    }
    try {
      let h = dir
      if (!h || status.needsPermission) h = (await idbGet<Handle>(IDB_KEY)) || null
      if (!h) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        h = await (window as any).showDirectoryPicker({ mode: 'readwrite', id: 'isa-team' })
      }
      if (!h) return false
      if (!(await verifyPermission(h, true))) {
        status.error = 'Kein Schreibrecht auf den Ordner erhalten.'
        return false
      }
      dir = h
      await idbSet(IDB_KEY, h)
      await afterConnect()
      return true
    } catch (e) {
      if ((e as DOMException)?.name === 'AbortError') return false
      status.error = e instanceof Error ? e.message : 'Verbindung fehlgeschlagen'
      return false
    }
  },

  disconnect() {
    if (timer) clearInterval(timer)
    timer = null
    if (ratingTimer) clearInterval(ratingTimer)
    ratingTimer = null
    ratingFiles = new Map()
    aggregiert = new Map()
    for (const l of ratingListeners) l(aggregiert)
    dir = null
    cache = []
    status.connected = false
    status.folderName = null
    status.count = 0
    idbSet(IDB_KEY, undefined).catch(() => {})
    emit()
  },

  /** Add / replace a material with its uploaded file. */
  async uploadMaterial(meta: Material, file: File, von?: string): Promise<void> {
    if (!dir) throw new Error('Nicht mit der Team-Ablage verbunden.')
    const fd = await filesDir(true)
    if (!fd) throw new Error('Datei-Ordner nicht verfügbar.')
    const ext = (file.name.split('.').pop() || 'pdf').toLowerCase()
    const fh = await fd.getFileHandle(`${meta.id}.${ext}`, { create: true })
    const w = await fh.createWritable()
    await w.write(file)
    await w.close()
    const rec: TeamRecord = {
      ...meta,
      source: 'cdse',
      uploadedBy: von || whoAmI(),
      uploadedAt: new Date().toISOString(),
      upload: { fileName: file.name, ext, mime: file.type || 'application/octet-stream', size: file.size },
      _ts: Date.now(),
    }
    cache = mergeRecords(cache, [rec])
    await cycle()
    emit()
  },

  async removeMaterial(id: string): Promise<void> {
    const found = cache.find((r) => r.id === id)
    if (!found) return
    cache = mergeRecords(cache, [{ ...found, _del: true, _ts: Date.now() }])
    await cycle()
    emit()
  },

  /** Blob URL for an uploaded material's file (for viewing / download). */
  async getFileUrl(m: Material): Promise<string | null> {
    if (!dir || !m.upload) return null
    try {
      let fh: FileSystemFileHandle
      if (m.upload.loose) {
        // dropped straight into the shared folder → read by its real name
        fh = await dir.getFileHandle(m.upload.fileName)
      } else {
        const fd = await filesDir(false)
        if (!fd) return null
        fh = await fd.getFileHandle(`${m.id}.${m.upload.ext}`)
      }
      const f = await fh.getFile()
      return URL.createObjectURL(f)
    } catch {
      return null
    }
  },

  /** Gemeinsame Bewertungen (Durchschnitt, Anzahl, Praxis-Tipps) abonnieren. */
  onRatings(cb: RatingListener) {
    ratingListeners.push(cb)
    cb(aggregiert)
    return () => { ratingListeners = ratingListeners.filter((l) => l !== cb) }
  },

  /** Eigene Bewertungen in die Team-Ablage schreiben (eigene Datei). */
  async writeOwnRatings(nutzerId: string, name: string, werte: Record<string, EigeneBewertung>): Promise<boolean> {
    if (!dir) return false
    try {
      const rd = await dir.getDirectoryHandle(RATINGS_DIR, { create: true })
      const datei = slug(nutzerId).slice(0, 60) + '.json'
      const data: BewertungsDatei = { _format: RATINGS_FORMAT, name, stand: new Date().toISOString(), werte }
      const fh = await rd.getFileHandle(datei, { create: true })
      const w = await fh.createWritable()
      await w.write(JSON.stringify(data))
      await w.close()
      const f = await fh.getFile()
      ratingFiles.set(datei, { mod: f.lastModified, data })
      aggregiert = aggregieren()
      for (const l of ratingListeners) l(aggregiert)
      return true
    } catch {
      return false
    }
  },

  /** Eigene Datei lesen (um Bewertungen von einem anderen Gerät zu übernehmen). */
  ownRatings(nutzerId: string): BewertungsDatei | null {
    return ratingFiles.get(slug(nutzerId).slice(0, 60) + '.json')?.data ?? null
  },

  /** Angaben eines hochgeladenen Materials ändern (ohne neue Datei). */
  async editMaterial(id: string, patch: Partial<Material>): Promise<void> {
    const found = cache.find((r) => r.id === id)
    if (!found) throw new Error('Material nicht gefunden.')
    cache = mergeRecords(cache, [{ ...found, ...patch, id, source: 'cdse', upload: found.upload, _ts: Date.now() }])
    await cycle()
    emit()
  },

  _test: { mergeRecords, aggregieren },
}

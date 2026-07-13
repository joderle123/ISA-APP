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
  try {
    return localStorage.getItem('isa_team_user') || 'Unbekannt'
  } catch {
    return 'Unbekannt'
  }
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

/** One read → merge → (write back if we hold newer) → emit cycle. */
async function cycle(): Promise<void> {
  if (!dir) return
  try {
    const remote = await readManifest(dir)
    if (!remote) return
    const merged = mergeRecords(remote.materials, cache)
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

async function afterConnect(): Promise<void> {
  status.connected = true
  status.needsPermission = false
  status.folderName = dir?.name ?? null
  await cycle()
  emit()
  if (timer) clearInterval(timer)
  timer = setInterval(cycle, POLL_MS)
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
    dir = null
    cache = []
    status.connected = false
    status.folderName = null
    status.count = 0
    idbSet(IDB_KEY, undefined).catch(() => {})
    emit()
  },

  /** Add / replace a material with its uploaded file. */
  async uploadMaterial(meta: Material, file: File): Promise<void> {
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
      uploadedBy: whoAmI(),
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
    const fd = await filesDir(false)
    if (!fd) return null
    try {
      const fh = await fd.getFileHandle(`${m.id}.${m.upload.ext}`)
      const f = await fh.getFile()
      return URL.createObjectURL(f)
    } catch {
      return null
    }
  },

  _test: { mergeRecords },
}

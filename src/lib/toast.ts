// Kleine Hinweisleiste unten (wie im Hub) – ersetzt alert(), das in einem
// eingebetteten (sandboxed) Hub-Frame blockiert sein kann.
import { useSyncExternalStore } from 'react'

export interface ToastMsg {
  id: number
  text: string
  kind: 'info' | 'ok' | 'error'
}

let list: ToastMsg[] = []
let nextId = 1
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

export function toast(text: string, kind: ToastMsg['kind'] = 'info', ms = kind === 'error' ? 7000 : 4000): void {
  const msg = { id: nextId++, text, kind }
  list = [...list.slice(-2), msg]
  emit()
  window.setTimeout(() => dismissToast(msg.id), ms)
}

export function dismissToast(id: number): void {
  const next = list.filter((t) => t.id !== id)
  if (next.length !== list.length) {
    list = next
    emit()
  }
}

export function useToasts(): ToastMsg[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => list,
  )
}

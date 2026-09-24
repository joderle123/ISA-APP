import { createPortal } from 'react-dom'
import { dismissToast, useToasts } from '../lib/toast'
import { Icon } from './Icon'

/** Hinweise unten in der Mitte (wie im Hub), für Screenreader angesagt. Ist
 *  gerade ein Dialog offen, erscheinen sie in diesem Dialog – sonst lägen sie
 *  unter der obersten Ebene (top layer) des modalen Dialogs verborgen – und
 *  zwar über dessen Fußleiste, damit die Knöpfe dort klickbar bleiben. */
export function Toaster() {
  const toasts = useToasts()
  const host = typeof document !== 'undefined' ? document.querySelector('dialog[open]') : null
  const list = (
    <div
      className={`pointer-events-none fixed inset-x-0 z-[60] flex flex-col items-center gap-2 px-4 ${
        host ? 'bottom-[84px]' : 'bottom-5'
      }`}
      role="status"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div key={t.id} className={`toast pointer-events-auto ${t.kind === 'error' ? 'error' : ''}`}>
          <Icon name={t.kind === 'error' ? 'alert' : t.kind === 'ok' ? 'checkCircle' : 'info'} />
          <span className="min-w-0 flex-1 break-words">{t.text}</span>
          <button
            type="button"
            className="-mr-1 grid h-7 w-7 shrink-0 place-items-center rounded-md text-white/80 hover:bg-white/10 hover:text-white"
            onClick={() => dismissToast(t.id)}
            aria-label="Hinweis schließen"
          >
            <Icon name="x" className="ic h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
  return host && toasts.length ? createPortal(list, host) : list
}

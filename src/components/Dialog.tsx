import { useLayoutEffect, useRef, type ReactNode } from 'react'

// Modaler Dialog auf Basis des nativen <dialog>: Fokus bleibt im Dialog,
// Escape schließt, Klick auf den abgedunkelten Hintergrund schließt, und beim
// Schließen springt der Fokus zurück auf das auslösende Element.
export function Dialog({
  onClose,
  labelledBy,
  className = '',
  children,
}: {
  onClose: () => void
  labelledBy: string
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const closeRef = useRef(onClose)
  useLayoutEffect(() => {
    closeRef.current = onClose
  })

  useLayoutEffect(() => {
    const d = ref.current
    if (!d) return
    const before = document.activeElement as HTMLElement | null
    if (!d.open) d.showModal()
    document.documentElement.classList.add('dialog-open')
    // Gezielter Startfokus (sonst fokussiert der Browser das erste Bedienelement).
    const first = d.querySelector<HTMLElement>('[data-autofocus]')
    first?.focus({ preventScroll: true })
    return () => {
      if (d.open) d.close()
      if (!document.querySelector('dialog[open]')) document.documentElement.classList.remove('dialog-open')
      if (before && before.isConnected && typeof before.focus === 'function') before.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      className={`dlg ${className}`}
      onCancel={(e) => {
        e.preventDefault()
        closeRef.current()
      }}
      onMouseDown={(e) => {
        // Nur ein Klick direkt auf den Hintergrund (nicht auf Inhalte) schließt.
        if (e.target === ref.current) {
          const r = ref.current.getBoundingClientRect()
          const inside =
            e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
          if (!inside) closeRef.current()
        }
      }}
    >
      {children}
    </dialog>
  )
}

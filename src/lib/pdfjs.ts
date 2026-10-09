// Lazy access to pdf.js (Passgenau-Vorschau) – loaded on the first preview only. Im Build ersetzt vite.config.ts diese
// Datei durch das komprimierte Modul (wie loadPdf.ts).
import type { Pdfjs } from './pdfjs-modul'

let laden: Promise<Pdfjs> | null = null

export function ladePdfjs(): Promise<Pdfjs> {
  laden ??= import('./pdfjs-modul').then((m) => m.pdfjs)
  laden.catch(() => {
    laden = null
  })
  return laden
}

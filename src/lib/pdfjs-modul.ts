// pdf.js für die antippbare Vorschau in Passgenau (T-M8): Legacy-Build, der „Worker“ läuft im Hauptfaden (kein eigener
// Worker – unter file:// und ohne Netz das Verlässlichste). Im Build ein eigenes, komprimiertes Modul (vite.config.ts),
// erst bei der ersten Vorschau entpackt; im Dev-Server ein normaler dynamischer Import.
import * as worker from 'pdfjs-dist/legacy/build/pdf.worker.mjs'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'

;(globalThis as { pdfjsWorker?: unknown }).pdfjsWorker = worker

export const pdfjs = { getDocument }
export type Pdfjs = typeof pdfjs

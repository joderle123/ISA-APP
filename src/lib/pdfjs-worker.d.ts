// pdf.js liefert für den Worker keine Typen – hier reicht, dass es ihn gibt (src/lib/pdfjs-modul.ts).
declare module 'pdfjs-dist/legacy/build/pdf.worker.mjs' {
  export const WorkerMessageHandler: unknown
}

import { build, defineConfig, type Plugin, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { readFileSync, readdirSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'

// base './' + viteSingleFile() bundle ALL JS/CSS inline into a single
// dist/index.html. That file runs offline by double-click (file://) with no
// web server — ES modules are inlined, so Chromium/Edge don't block them.

const INFLATE = fileURLToPath(new URL('./src/lib/inflate.ts', import.meta.url)).replace(/\\/g, '/')
const PDF_ENTRY = fileURLToPath(new URL('./src/lib/pdf.tsx', import.meta.url))
const PDFJS_ENTRY = fileURLToPath(new URL('./src/lib/pdfjs-modul.ts', import.meta.url))

const gzipBase64 = (text: string) => gzipSync(text, { level: 9 }).toString('base64')

/**
 * Loading speed of the single offline file (build only; `npm run dev` is
 * unchanged):
 *  1. The big material lists (src/data/materials/{digitized,generated,youth}.ts,
 *     ~4 MB of object literals) are embedded gzip-compressed and unpacked at
 *     start with the browser's DecompressionStream + JSON.parse — much faster
 *     to load than parsing the literals, and ~2 MB smaller.
 *  2. The PDF renderer (@react-pdf, ~1.5 MB) is built separately and embedded
 *     compressed; it is unpacked and run only on the first PDF download.
 *  3. Passgenau: the worksheets are shared with the toolbox (one compressed
 *     block, src/data/blaetter/dateien.ts); its own data (catalogue, contents)
 *     is a second compressed block, unpacked only when Passgenau opens.
 *  4. pdf.js (legacy build, worker in the main thread) for the tappable
 *     Passgenau preview: built separately, embedded compressed, unpacked on
 *     the first preview only.
 */
/** Ein Modul getrennt als IIFE bauen (für window[name]) und gzip/base64 zurückgeben. */
async function iifeGz(entry: string, name: string, plugins: PluginOption[] = []): Promise<string> {
  const out = await build({
    configFile: false,
    logLevel: 'warn',
    plugins,
    define: { 'process.env.NODE_ENV': JSON.stringify('production'), 'import.meta.url': 'document.baseURI' },
    build: { write: false, emptyOutDir: false, minify: true, lib: { entry, formats: ['iife'], name, fileName: () => name + '.js' } },
  })
  const outputs = (Array.isArray(out) ? out : [out]).flatMap((o) => ('output' in o ? o.output : []))
  const chunk = outputs.find((o) => o.type === 'chunk')
  if (!chunk || chunk.type !== 'chunk') throw new Error(`Modul ${name} konnte nicht gebaut werden`)
  return gzipBase64(chunk.code)
}

/** Lädt ein eingebettetes, komprimiertes IIFE-Modul beim ersten Aufruf (Quelltext für loadPdf.ts / pdfjs.ts). */
function ladeCode(fn: string, name: string, code: string, fehler: string): string {
  return (
    `import { inflateText } from ${JSON.stringify(INFLATE)}\n` +
    `const CODE = ${JSON.stringify(code)}\n` +
    `let ready = null\n` +
    `export function ${fn}() {\n` +
    `  ready = ready || inflateText(CODE).then((code) => {\n` +
    `    const s = document.createElement('script')\n` +
    `    s.textContent = code\n` +
    `    document.head.appendChild(s)\n` +
    `    s.remove()\n` +
    `    if (!window.${name}) throw new Error(${JSON.stringify(fehler)})\n` +
    `    return window.${name}${name === '__isaPdfjs' ? '.pdfjs' : ''}\n` +
    `  })\n` +
    `  ready.catch(() => { ready = null })\n` +
    `  return ready\n` +
    `}\n`
  )
}

function compactOfflineBundle(): Plugin {
  let pdfBundle = ''
  let pdfjsBundle = ''
  return {
    name: 'isa-compact-offline-bundle',
    apply: 'build',
    enforce: 'pre',
    async buildStart() {
      // 4. pdf.js (Passgenau-Vorschau, T-M8): eigenes Modul, erst bei der ersten Vorschau entpackt
      pdfjsBundle = await iifeGz(PDFJS_ENTRY, '__isaPdfjs')
      // 2. PDF renderer (react-pdf)
      pdfBundle = await iifeGz(PDF_ENTRY, '__isaPdf', [react()])
    },
    load(id) {
      const file = id.split('?')[0].replace(/\\/g, '/')
      // 1. Material lists: the .ts files are "export const x: Material[] = <JSON>".
      const data = /\/src\/data\/materials\/(digitized|generated|youth)\.ts$/.exec(file)
      if (data) {
        const src = readFileSync(file, 'utf8')
        const name = /export const (\w+)\s*:/.exec(src)?.[1]
        const start = src.indexOf('= [')
        if (!name || start < 0) return null
        let list: unknown
        try {
          list = JSON.parse(src.slice(start + 2))
        } catch {
          this.warn(`${data[1]}.ts ist kein reines JSON – wird unkomprimiert eingebaut.`)
          return null
        }
        return (
          `import { inflateJson } from ${JSON.stringify(INFLATE)}\n` +
          `export const ${name} = await inflateJson(${JSON.stringify(gzipBase64(JSON.stringify(list)))})\n`
        )
      }
      // 1b. Arbeitsblätter (src/data/blaetter/*.json): alle Dateien zusammen komprimiert einbetten und beim Start
      //     entpacken – UNGEFILTERT (index.ts filtert die Skills-Blätter nach kursFrei, Passgenau nutzt alle Teile).
      if (file.endsWith('/src/data/blaetter/dateien.ts')) {
        const ordner = file.slice(0, -'dateien.ts'.length)
        const dateien: Record<string, unknown> = {}
        for (const d of readdirSync(ordner).sort()) if (d.endsWith('.json')) dateien['./' + d] = JSON.parse(readFileSync(ordner + d, 'utf8'))
        return (
          `import { inflateJson } from ${JSON.stringify(INFLATE)}\n` +
          `export const blattDateien = await inflateJson(${JSON.stringify(gzipBase64(JSON.stringify(dateien)))})\n`
        )
      }
      // 1c. Passgenau (src/passgenau/daten.ts): Katalog, ELDiB-Bank, CREW, neue Inhalte als EIN komprimierter Block,
      //     Einheiten des Förderfachs (7e, Annexe); entpackt erst beim ersten Öffnen von Passgenau (nicht beim Start der Toolbox).
      if (file.endsWith('/src/passgenau/daten.ts')) {
        const pg = fileURLToPath(new URL('./src/data/passgenau/', import.meta.url))
        const json = (f: string) => JSON.parse(readFileSync(pg + f, 'utf8'))
        const inhalte = readdirSync(pg + 'inhalte').filter((d) => d.endsWith('.json')).sort().map((d) => ({ datei: d, daten: json('inhalte/' + d) }))
        const ff = (f: string) => JSON.parse(readFileSync(fileURLToPath(new URL('./src/data/foerderfach/' + f, import.meta.url)), 'utf8'))
        const daten = { bausteine: json('bausteine.json'), schritte: json('schritte.json'), eldib: json('eldib.json'), crew: json('crew.json'), ff: ff('einheiten-7e.json'), ffAnnexe: ff('annexe/einheiten-7e.json'), inhalte }
        return (
          `import { inflateJson } from ${JSON.stringify(INFLATE)}\n` +
          `const CODE = ${JSON.stringify(gzipBase64(JSON.stringify(daten)))}\n` +
          `let laden = null\n` +
          `export function ladeDaten() {\n` +
          `  laden = laden || inflateJson(CODE)\n` +
          `  laden.catch(() => { laden = null })\n` +
          `  return laden\n` +
          `}\n`
        )
      }
      // 2. PDF renderer on demand instead of the dynamic import.
      if (file.endsWith('/src/lib/loadPdf.ts')) return ladeCode('loadPdfModule', '__isaPdf', pdfBundle, 'PDF-Modul konnte nicht geladen werden.')
      // 4. pdf.js for the tappable Passgenau preview, also on demand.
      if (file.endsWith('/src/lib/pdfjs.ts')) return ladeCode('ladePdfjs', '__isaPdfjs', pdfjsBundle, 'pdf.js konnte nicht geladen werden.')
      return null
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [compactOfflineBundle(), react(), tailwindcss(), viteSingleFile()],
})

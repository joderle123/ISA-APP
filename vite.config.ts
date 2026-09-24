import { build, defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'

// base './' + viteSingleFile() bundle ALL JS/CSS inline into a single
// dist/index.html. That file runs offline by double-click (file://) with no
// web server — ES modules are inlined, so Chromium/Edge don't block them.

const INFLATE = fileURLToPath(new URL('./src/lib/inflate.ts', import.meta.url)).replace(/\\/g, '/')
const PDF_ENTRY = fileURLToPath(new URL('./src/lib/pdf.tsx', import.meta.url))

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
 */
function compactOfflineBundle(): Plugin {
  let pdfBundle = ''
  return {
    name: 'isa-compact-offline-bundle',
    apply: 'build',
    enforce: 'pre',
    async buildStart() {
      const out = await build({
        configFile: false,
        logLevel: 'warn',
        plugins: [react()],
        // import.meta.url (yoga-layout) wie im Hauptbundle: die Adresse der Seite
        define: { 'process.env.NODE_ENV': JSON.stringify('production'), 'import.meta.url': 'document.baseURI' },
        build: {
          write: false,
          emptyOutDir: false,
          minify: true,
          lib: { entry: PDF_ENTRY, formats: ['iife'], name: '__isaPdf', fileName: () => 'isa-pdf.js' },
        },
      })
      const outputs = (Array.isArray(out) ? out : [out]).flatMap((o) => ('output' in o ? o.output : []))
      const chunk = outputs.find((o) => o.type === 'chunk')
      if (!chunk || chunk.type !== 'chunk') throw new Error('PDF-Modul konnte nicht gebaut werden')
      pdfBundle = gzipBase64(chunk.code)
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
      // 2. PDF renderer on demand instead of the dynamic import.
      if (file.endsWith('/src/lib/loadPdf.ts')) {
        return (
          `import { inflateText } from ${JSON.stringify(INFLATE)}\n` +
          `const CODE = ${JSON.stringify(pdfBundle)}\n` +
          `let ready = null\n` +
          `export function loadPdfModule() {\n` +
          `  ready = ready || inflateText(CODE).then((code) => {\n` +
          `    const s = document.createElement('script')\n` +
          `    s.textContent = code\n` +
          `    document.head.appendChild(s)\n` +
          `    s.remove()\n` +
          `    if (!window.__isaPdf) throw new Error('PDF-Modul konnte nicht geladen werden.')\n` +
          `    return window.__isaPdf\n` +
          `  })\n` +
          `  ready.catch(() => { ready = null })\n` +
          `  return ready\n` +
          `}\n`
        )
      }
      return null
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [compactOfflineBundle(), react(), tailwindcss(), viteSingleFile()],
})

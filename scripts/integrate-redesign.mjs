#!/usr/bin/env node
// Apply redesigned worksheets (redesign-worksheets workflow) back into
// generated.* and youth.*. Keeps the original on any invalid/thin rewrite.
// Usage: node scripts/integrate-redesign.mjs <outDir>
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const outDir = process.argv[2]
if (!outDir) { console.error('Bitte outDir angeben'); process.exit(1) }

const WS_KINDS = new Set(['heading', 'instruction', 'question', 'lines', 'box', 'checklist', 'table', 'scale', 'columns', 'wordbank', 'sentences', 'bubble', 'steps', 'thermometer', 'bodymap', 'target', 'mindmap'])
// Kinds that are meaningful without text/items (space or default visuals).
const BARE = new Set(['lines', 'box', 'bodymap', 'thermometer', 'target', 'mindmap', 'bubble'])
// Kinds that need a non-empty items array to make sense.
const NEED_ITEMS = new Set(['checklist', 'scale', 'table', 'columns', 'wordbank', 'sentences', 'steps'])
const VISUAL = new Set(['checklist', 'scale', 'table', 'columns', 'wordbank', 'sentences', 'bubble', 'steps', 'thermometer', 'bodymap', 'target', 'mindmap', 'box'])

function sanitizeWorksheet(w) {
  if (!w || !Array.isArray(w.blocks)) return undefined
  const blocks = w.blocks
    .filter((b) => b && WS_KINDS.has(b.kind))
    .map((b) => ({
      kind: b.kind,
      text: typeof b.text === 'string' && b.text.trim() ? b.text.trim() : undefined,
      lines: Number.isFinite(b.lines) ? Math.min(12, Math.max(1, b.lines)) : undefined,
      // Empty strings are meaningful for steps/mindmap ("blank to fill in").
      items: Array.isArray(b.items)
        ? b.items
            .map((x) => String(x).trim())
            .filter((x) => x !== '' || b.kind === 'steps' || b.kind === 'mindmap')
            .slice(0, 14)
        : undefined,
    }))
    .filter((b) => {
      if (NEED_ITEMS.has(b.kind)) return b.items && b.items.length > 0
      if (BARE.has(b.kind)) return true
      return !!b.text // heading/instruction/question
    })
  if (!blocks.length) return undefined
  return {
    title: w.title && String(w.title).trim() ? String(w.title).trim().slice(0, 90) : undefined,
    intro: w.intro && String(w.intro).trim() ? String(w.intro).trim().slice(0, 320) : undefined,
    blocks: blocks.slice(0, 20),
  }
}

function analyse(ws) {
  const b = ws.blocks
  const tasks = b.filter((x) => !['heading', 'instruction'].includes(x.kind)).length
  const visualKinds = new Set(b.filter((x) => VISUAL.has(x.kind)).map((x) => x.kind))
  let wu = 0
  for (const x of b) {
    const it = (x.items || []).length
    if (x.kind === 'question') wu += x.lines || 2
    else if (x.kind === 'lines') wu += x.lines || 3
    else if (x.kind === 'box') wu += x.lines || 4
    else if (x.kind === 'table') wu += (x.lines || 3) * (it || 1)
    else if (x.kind === 'columns') wu += (x.lines || 4) * (it || 2)
    else if (x.kind === 'checklist') wu += it * 0.5
    else if (x.kind === 'scale') wu += 1
    else if (x.kind === 'wordbank') wu += it * 0.4
    else if (x.kind === 'sentences') wu += it * (x.lines || 1)
    else if (x.kind === 'bubble') wu += (it || 1) * (x.lines || 2)
    else if (x.kind === 'steps') wu += it
    else if (x.kind === 'thermometer') wu += it || 4
    else if (x.kind === 'bodymap') wu += 4
    else if (x.kind === 'target') wu += 2
    else if (x.kind === 'mindmap') wu += (it || x.lines || 6) * 0.7
  }
  return { tasks, blocks: b.length, visual: visualKinds.size, wu }
}

// ---- Load fixes -------------------------------------------------------------
const files = fs.existsSync(outDir) ? fs.readdirSync(outDir).filter((f) => /^wsr-\d+\.json$/.test(f)).sort() : []
const fixes = new Map()
let badFiles = 0
for (const f of files) {
  try {
    const j = JSON.parse(fs.readFileSync(path.join(outDir, f), 'utf8'))
    for (const r of j.results || []) {
      if (r && r.id && r.worksheet) fixes.set(r.id, r.worksheet)
    }
  } catch { badFiles++ }
}

// ---- Patch both catalogues --------------------------------------------------
const stats = { files: files.length, badFiles, candidates: fixes.size, applied: 0, rejected: 0 }

function patch(file) {
  const p = path.join(ROOT, 'src/data/materials', file)
  const arr = JSON.parse(fs.readFileSync(p, 'utf8'))
  let changed = 0
  for (const m of arr) {
    const raw = fixes.get(m.id)
    if (!raw || !m.worksheet) continue
    const ws = sanitizeWorksheet(raw)
    if (!ws) { stats.rejected++; continue }
    const a = analyse(ws)
    const young = (m.ageLevels || []).includes('C1') || (m.ageLevels || []).includes('C2')
    const minTasks = young ? 3 : 4
    if (a.tasks < minTasks || a.blocks < 6 || a.visual < 2 || a.wu < 7) { stats.rejected++; continue }
    m.worksheet = ws
    changed++
    stats.applied++
  }
  fs.writeFileSync(p, JSON.stringify(arr, null, 2) + '\n')
  return { arr, changed }
}
function emitTs(file, varName, arr, header) {
  const ts = `import type { Material } from '../../types/material'

${header}
export const ${varName}: Material[] = ${JSON.stringify(arr, null, 2)}
`
  fs.writeFileSync(path.join(ROOT, 'src/data/materials', file), ts)
}

const g = patch('generated.data.json')
emitTs('generated.ts', 'generated', g.arr, `// AI-generated library materials (one-time generation; offline thereafter).
// Auto-written by scripts/integrate.mjs — do not edit by hand.
// Each is a draft for human review before classroom use.`)
const y = patch('youth.data.json')
emitTs('youth.ts', 'youth', y.arr, `// Youth / secondary (ES) materials — AI-generated, adolescent-focused set.
// Auto-written by scripts/integrate-youth.mjs — do not edit by hand.
// Each is a draft for human review before classroom use.`)

console.log('── Arbeitsblätter neu layouten ──')
console.log({ ...stats, generatedUpdated: g.changed, youthUpdated: y.changed })
console.log(`\n✓ ${stats.applied} Arbeitsblätter neu gestaltet · ${stats.rejected} Rewrites verworfen (Original behalten)`)
if (badFiles) console.log(`⚠ ${badFiles} fehlerhafte Batch-Dateien`)

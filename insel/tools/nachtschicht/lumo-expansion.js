export const meta = {
  name: 'lumo-expansion-m4-m9',
  description: 'Grow LUMO Season 1: regions M4-M9 with all remaining year-1 quests, teacher booklet, then integration, review and polish (Fable agents)',
  phases: [
    { title: 'Regions A', detail: 'M4 Moor + M5 Markt', model: 'fable' },
    { title: 'Regions B', detail: 'M6 Vulkan + M7 Glimmerwolke', model: 'fable' },
    { title: 'Finale', detail: 'M8/M9 finale + Lehrerheft content', model: 'fable' },
    { title: 'Integrate', detail: 'whole season end to end', model: 'fable' },
    { title: 'Review', detail: 'fun, pedagogy, art critics', model: 'fable' },
    { title: 'Polish', detail: 'fixers + final verify', model: 'fable' },
  ],
}
const S = args.scratch
const I = '/home/user/ISA-APP/insel'
const M = 'fable'
const CTX = `PROJECT: "LUMO – die Skills-Insel", a 3D low-poly open-world game (three.js + own ES modules, bundled by esbuild into ONE offline HTML file: ${I}/build.mjs → ${I}/dist/index.html) for 12–16-year-olds with socio-emotional needs at the CDSE Annexe Junglinster (Luxembourg). It accompanies the teacher's own Skills-Kurs: each lesson ends with a code that unlocks that unit's quest. FUN first, beautiful, detailed, not too easy; course themes are embedded as game rules, never as exercises, quizzes or lectures.
READ FIRST: ${I}/DESIGN.md (incl. §20a multiplayer-readiness rules — mandatory), ${I}/BAUPLAN.md, ${I}/CONTENT-SCHEMA.md, ${I}/docs/vs-protokoll.md (state of the vertical slice M0–M3), and the conventions at the top of ${I}/src/game.js and ${I}/src/core/state.js (plugin convention, content registry, state, save, debug/scenario tools). Look at how the existing regions M0–M3 are built (src/content/**, src/regions/**) and follow the same patterns. Course data year 1: ${S}/skills-kurs-j1.json and /home/user/ISA-APP/skills/src/content/kurs-j1.js (unit code words, skills, realistic situations).
RULES: German player-facing text (≤12 words per bubble, du-form, not childish). Procedural art/audio only, no network. iPad Safari + PC. No personal data. Never write exercise instructions (breathing, body scan, 5-4-3-2-1 …). Keep the build green: node build.mjs, npm run test:fast, node tests/smoke.mjs and the scenario tests must pass after your work. Look at a few screenshots with the Read tool. Do NOT git commit or push. Only edit files your task owns (plus minimal hooks, mention them). Comments in German.`
const OUT = { type: 'object', properties: { done: { type: 'array', items: { type: 'string' } }, api: { type: 'string' }, tests: { type: 'string' }, open: { type: 'array', items: { type: 'string' } } }, required: ['done', 'api', 'tests', 'open'] }
const EFFORT = {'Integration S1': 'high', 'final-verify': 'medium'}
const effortFor = (label) => EFFORT[label] || 'medium'
const notes = []
const run = (label, phaseName, task) => agent(`${CTX}\n\nNOTES FROM EARLIER AGENTS:\n${notes.join('\n---\n').slice(-10000)}\n\nYOUR TASK (${label}):\n${task}\n\nReturn: done, API/conventions for others, test results, open points.`, { label, phase: phaseName, schema: OUT, model: M, ...(effortFor(label) ? { effort: effortFor(label) } : {}) })
  .then((r) => { if (r) notes.push(`[${label}] ${r.api}`); return r })
const commit = (msg) => agent(`In /home/user/ISA-APP run: git add -A insel && git commit -m "${msg}" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_018gV6PaeSbmQbnTJRvrxG3K" (skip if nothing to commit), then git push -u origin claude/youth-game-socio-emotional-ntxd04 (retry up to 4 times with 2/4/8/16 s backoff on network errors). Nothing else. Return the commit hash or "nothing".`, { label: 'commit', model: M, effort: 'low' })
const wave = async (phaseName, tasks) => {
  phase(phaseName)
  const res = await parallel(tasks.map(([label, t]) => () => run(label, phaseName, t)))
  const failed = tasks.filter((_, i) => !res[i]).map(([l]) => l)
  if (failed.length) log(`${phaseName}: failed ${failed.join(', ')}`)
  await commit(`LUMO: ${phaseName} (${tasks.map(([l]) => l).join(', ')})`)
  return failed
}
const f1 = await wave('Regions A', [
  ['WP56 Moor', 'Implement WP56: region moor (M4 "Meine Gedanken"): RegionDef incl. the moor terrain from WP11 if still missing, NPCs, quests j1-e16..e19 and j1-j02, Satz-Schmiede plank physics, whisper/thought mechanics, the stone giant set piece, patches, short versions. Follow DESIGN §11–13 exactly.'],
  ['WP57 Markt', 'Implement WP57: region markt (M5 "Kommunikation & Grenzen"): RegionDef, NPCs, quests j1-e20..e23 and j1-j05, Klarklang, Lausch-Modus, Stopp-Schild with Klammer-Geister, market stalls alive, theatre/video joker, patches, short versions. Follow DESIGN §11–13.'],
])
const f2 = await wave('Regions B', [
  ['WP58 Vulkan', 'Implement WP58: region vulkan (M6 "Wenn es schwierig wird"): RegionDef, NPCs, quests j1-e24..e26 (conflict steps, group pressure + saying no, bullying + civil courage), animal masks, lava tubes, relapse wave of the veil, the volcano set piece. Follow DESIGN §11–13.'],
  ['WP59 Glimmerwolke', 'Implement WP59: region glimmerwolke (M7 "Digitale Welt"): RegionDef, sky islands reachable by updraft, NPCs, quests j1-e27, j1-e28 and j1-j03 (feeds, fake vs real, the share-brake as a world mechanic), ring race. Follow DESIGN §11–13.'],
])
const f3 = await wave('Finale', [
  ['WP60 Finale', 'Implement WP60: M8 "Gesund & stark" and M9 "Abschluss" incl. j1-e29, j1-e30, j1-j04 and j1-j08 (j08 teacher-only), the night crossing, the lighthouse finale (all colours return, Herzglas restored), the message-in-a-bottle for season 2, remaining memories 5–9 of the chronicle.'],
  ['WP61 Lehrerheft', 'Implement WP61: complete teacher booklet content for all 39 year-1 units (code, goals, patch back side, 1–2 debrief questions, Echte-Welt card, what happens in the quest) generated into dist/lehrerheft.html, plus a printable transfer card; verify every unit code works in-game.'],
])
phase('Integrate')
await run('Integration S1', 'Integrate', 'Integrate the whole of Season 1 (M0–M9): a fresh save can unlock every unit code in order and complete every quest; scenario tests per module; performance on low/medium; safety checklist §19; reading load. Fix every integration bug (any file). Update docs/vs-protokoll.md → docs/staffel1-protokoll.md (German) with the honest state and a playtest guide for the teacher.')
await commit('LUMO: Staffel 1 integriert')
phase('Review')
const REV = { type: 'object', properties: { verdict: { type: 'string' }, fixes: { type: 'array', items: { type: 'object', properties: { priority: { type: 'number' }, area: { type: 'string' }, files: { type: 'string' }, problem: { type: 'string' }, change: { type: 'string' } }, required: ['priority', 'area', 'files', 'problem', 'change'] } } }, required: ['verdict', 'fixes'] }
const reviews = (await parallel([
  ['fun+teen', 'three skeptical 14-year-olds from a special-education group + a senior game designer: fun, challenge, coolness, cringe, reading load, frustration'],
  ['pedagogy+safety', 'a DBT-A skills trainer + ETEP expert who knows the course: invisible and faithful embedding of each unit, transfer, no exercises/lectures, safety §19'],
  ['art+tech', 'an art director + tech lead: visual wow and consistency across all regions, performance on iPad tiers, bugs, touch controls'],
].map(([k, who]) => () => agent(`${CTX}\n\nReview Season 1 as ${who}. Build, play via Playwright scripts (tests/lib.mjs), look at many screenshots, read content. Return at most 20 prioritised concrete fixes tied to files. Do not edit files.`, { label: `review:${k}`, phase: 'Review', schema: REV, model: M, effort: 'medium' })))).filter(Boolean)
const fixes = reviews.flatMap((r) => r.fixes).sort((a, b) => a.priority - b.priority)
phase('Polish')
const isVisual = (f) => /welt|world|art|grafik|visual|terrain|water|sky|perf/i.test(f.area + f.files)
await parallel([fixes.filter(isVisual), fixes.filter((f) => !isVisual(f))].map((g, i) => () => run(`polish-${i ? 'gameplay' : 'visual'}`, 'Polish', `Implement these review fixes (priority 1–2 all, others if feasible). The other group is handled in parallel — ${i ? 'you own gameplay/content/UI/systems files, not world rendering' : 'you own world rendering/art/performance files, not gameplay/content/UI'}.\n${JSON.stringify(g.slice(0, 25), null, 1)}`)))
await run('final-verify', 'Polish', 'Final verification: build, run ALL tests, fix breakage, screenshot tour of every region, update docs/staffel1-protokoll.md honestly.')
await commit('LUMO: Staffel 1 – Review-Befunde umgesetzt, Endprüfung')
return { failed: [...f1, ...f2, ...f3], reviews: reviews.map((r) => r.verdict), notes: notes.slice(-5) }

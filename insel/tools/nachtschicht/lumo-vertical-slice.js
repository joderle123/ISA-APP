export const meta = {
  name: 'lumo-vertical-slice',
  description: 'Build LUMO Skills-Insel modules 0-3 (vertical slice) in waves with Fable agents: stabilise world core, foundation, systems, content, integration, review and polish',
  phases: [
    { title: 'Stabilise', detail: 'finish world-core polish, green build', model: 'fable' },
    { title: 'Foundation', detail: 'WP00-02 core, schemas, debug', model: 'fable' },
    { title: 'Systems1', detail: 'UI/audio, movement, avatar, world/props/scenes', model: 'fable' },
    { title: 'Systems2', detail: 'quests+dialogue, NPC+session, codes+teacher, minigames', model: 'fable' },
    { title: 'Systems3', detail: 'puls/glimm/koffer+abilities, baumhaus+chronik', model: 'fable' },
    { title: 'Content', detail: 'regions M0-M3 with all quests', model: 'fable' },
    { title: 'Integrate', detail: 'vertical slice acceptance', model: 'fable' },
    { title: 'Review', detail: 'fun, pedagogy, art critics', model: 'fable' },
    { title: 'Polish', detail: 'fixers + final verify', model: 'fable' },
  ],
}
const S = args.scratch
const I = '/home/user/ISA-APP/insel'
const M = 'fable'
const CTX = `PROJECT: "LUMO – die Skills-Insel", a 3D low-poly open-world game (three.js r186 + own ES modules, bundled by esbuild into ONE offline HTML file: ${I}/build.mjs → ${I}/dist/index.html and dist/lumo-vorschau.html) for 12–16-year-olds with socio-emotional needs at the CDSE Annexe Junglinster (Luxembourg). It accompanies the teacher's own Skills-Kurs: each lesson ends with a code that unlocks that unit's quest. The game must be FUN first, beautiful, detailed and not too easy; the course themes are embedded as game rules, never as exercises, quizzes or lectures.
READ FIRST: ${I}/DESIGN.md (the full German game design: laws §0, controls, abilities, Puls, Koffer, avatar, regions, the 39 quests, NPCs, minigames, UI, audio, safety §19, tech §20), ${I}/BAUPLAN.md (work packages WP.. with files, scope, acceptance), ${I}/CONTENT-SCHEMA.md (data formats). Existing engine: ${I}/src (game.js creates window.LUMO; world/, actors/, engine/, ui/; API described at the top of game.js and in the modules). Course data for year 1: ${S}/skills-kurs-j1.json (units, goals, activities) and /home/user/ISA-APP/skills/src/content/kurs-j1.js (per unit: code word, e.g. j1-e11 → WELLE; skills; realistic situations) — USE THESE UNIT CODE WORDS as the unlock codes (simple for kids), plus teacher/demo codes as in DESIGN §10.
RULES: German player-facing text (short: ≤12 words per bubble, du-form, not childish). Procedural art/audio only, no network. iPad Safari (touch) + PC. No names or personal data stored; saves only in localStorage. Never write exercise instructions (breathing, body scan, 5-4-3-2-1 …) into the game. Keep the build green: after your work, node build.mjs must succeed and node tests/smoke.mjs (and any tests you add) must pass. Look at a few screenshots with the Read tool to check your visuals. Do NOT git commit or push (a separate step does that). Only edit the files your task owns unless a one-line hook in a shared file is unavoidable (then keep it minimal and mention it). Comments in German.`
const OUT = { type: 'object', properties: { done: { type: 'array', items: { type: 'string' } }, api: { type: 'string', description: 'APIs/conventions other agents need' }, tests: { type: 'string' }, open: { type: 'array', items: { type: 'string' } } }, required: ['done', 'api', 'tests', 'open'] }
const notes = []
const run = (label, phaseName, task) => agent(`${CTX}\n\nNOTES FROM EARLIER AGENTS (APIs, conventions):\n${notes.join('\n---\n').slice(-12000)}\n\nYOUR TASK (${label}):\n${task}\n\nReturn: what is done, the API/conventions others need, test results, open points.`, { label, phase: phaseName, schema: OUT, model: M })
  .then((r) => { if (r) notes.push(`[${label}] ${r.api}`); return r })
const commit = (msg) => agent(`In /home/user/ISA-APP run: git add -A insel && git commit -m "${msg}" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_018gV6PaeSbmQbnTJRvrxG3K" (skip if nothing to commit), then git push -u origin claude/youth-game-socio-emotional-ntxd04 (retry up to 4 times with 2/4/8/16 s backoff on network errors). Do nothing else. Return the commit hash or "nothing".`, { label: 'commit', model: M, effort: 'low' })
const wave = async (phaseName, tasks) => {
  phase(phaseName)
  const res = await parallel(tasks.map(([label, t]) => () => run(label, phaseName, t)))
  const failed = tasks.filter((_, i) => !res[i]).map(([l]) => l)
  if (failed.length) log(`${phaseName}: failed ${failed.join(', ')}`)
  await commit(`LUMO: ${phaseName} (${tasks.map(([l]) => l).join(', ')})`)
  return { res, failed }
}

// 0) Welt-Kern stabilisieren
const w0 = await wave('Stabilise', [['stabilise', `The world core (terrain, water, sky, vegetation, veil, humanoid, player, camera, HUD) was being polished after an art-director critique when work stopped mid-way (uncommitted-then-committed WIP). Make it solid and beautiful: run node build.mjs and node tests/smoke.mjs, fix anything broken, then address the critique's highest-impact items that are still open: warm golden-hour light with visible shadows + a subtle colour grade/vignette; smooth path/plaza surfaces instead of big triangle mosaics; the storm cloud must read as a storm, not a UFO; a strong veil look (cursed, desaturated, drifting motes of sane size) and a spectacular colour-restore wave; camera never slams into the head in forests; believable night; a heroic volcano with proper smoke; a less childish, more stylish teen character (proportions ~6.5 heads, expressive brows, no permanent smile); jump buffer + coyote time on touch. Keep performance reasonable for iPads (quality tiers). Take a before/after screenshot set of the harbour spawn, overview, a veiled zone and after restore, the character close-up, night.`]])
if (w0.failed.length) return { stopped: 'Stabilise failed', notes }

// 1) Fundament
const w1 = await wave('Foundation', [['WP00-02', `Implement WP00 (plugin autoload in build.mjs generating src/_gen/plugins.js and src/_gen/content.js, src/core/state.js with get/set/on + state:change, src/core/save.js with 8 slots, versioning, autosave, export/import code, wipe, src/core/content.js registry, src/core/rng.js), WP01 (content schema validators + tools/validate-content.mjs + tools/lint-text.mjs incl. the forbidden exercise words, wired into npm test) and WP02 (debug plugin with ?debug: unlock/complete unit, grant ability, set Puls, time, teleport to site, veil, mode; LUMO.debug.runScenario; tests/lib.mjs helpers; tests/perf.mjs). Establish the plugin convention clearly (a plugin = src/**/plugin.js exporting {id, order, deps, install(game)}), document it at the top of src/core/state.js and in your api output — every later agent builds on it.`]])
if (w1.failed.length) return { stopped: 'Foundation failed', notes }

// 2) Systeme I
await wave('Systems1', [
  ['WP20+21 UI/Audio', 'Implement WP21 (UI framework: speech bubbles with read-aloud, choice tiles, overlay system with Pause/X everywhere, Tagebuch shell with page registry, recap/campfire shells, settings incl. large text, reduced effects, auto read-aloud, Glimm mute, mode Entspannt/Abenteuer/Profi) and WP20 (music layers per region reacting to veil, leitmotifs, speech.js queue de-DE rate 0.95, limiter). Make the UI look premium and teen-appropriate (DESIGN §17).'],
  ['WP12-15+19 Bewegung', 'Implement WP12 (movement state machine ground/air/climb/glide/swim/dive/carry/locked, sprint, pump jump, carry spill, modifiers, respawn), WP14 (climbing + Halt-Ring), WP15 (swim/dive incl. underwater interior hook), WP13 (Gefühlssegel glide with the 6 emotion modes, updrafts, rune gates) and WP19 (tap/hold detection, Kraft-Rad, camera modes follow/glide/climb/talk/photo). Traversal must feel great on touch and keyboard.'],
])
await wave('Systems1b', [
  ['WP16+17+41 Avatar', 'Implement WP16 (humanoid split into modules, 16 skin tones, diverse hair incl. headscarf/locs/braids/buzz, freckles/vitiligo, glasses/hearing aid/prosthetic arm, build/height sliders, clothing layers, patterns, patch grid for up to 39 patches, animal masks, crew jacket; NPCs use the same pipeline), WP17 (additive poses, emotes, 2-colour aura shader with intensity rings, symbols for colour-blind players) and WP41 (Stil-Studio editor with turntable preview, generated player handle, cosmetics inventory). The avatar must look cool to teens.'],
  ['WP10+11+18+43 Welt', 'Implement WP10 (veil: patches, partial restore, relapse wave, CPU amount = GLSL), WP11 only what M0–M3 need (tide pools, mangrove lagoon, spring terraces, water bodies, reeds/mangroves; moor can wait), WP18 (scene stack overworld/interior with crossfade, room kit from RoomDef: cave, temple, tower floor, workshop, underwater, treehouse interior) and WP43 (procedural props kit: signal fires, lanterns, tide tanks, market stalls, whisper stones, crystals, planks, windmills/kites, the 6 emotion birds, menhirs, organ, Titan cloud body). Everything veil-aware and pretty.'],
])

// 3) Systeme II
await wave('Systems2', [
  ['WP31+32 Quests+Dialog', 'Implement WP31 (quest engine with states, steps from 12 templates, markers, rewards, patches with back side, Glimm line, Echte-Welt card, hint ladder, deed log, positive echoes, partial colour wave per unit) and WP32 (data-driven dialogue scenes: visible choices by Puls, NPC heat with "Deckel ab" above 70, Zurückspulen restoring state, listening nodes, sentence-building node, sign channel, camera framing, read-aloud).'],
  ['WP34+42 Figuren+Sitzung', 'Implement WP34 (NPC system: spawn from NpcDef with name tag, daily routines, emotion model, 6 tanks, boundary radius, argument style, bond 0–3 never permanently dropping with repair hook, body language, max 12 animated NPCs in view, renaming) and WP42 (session flow: "Letztes Mal" recap, evening campfire with best moment + cliffhanger + save, signal fires, modes, night-watch scheduler, collectibles Lichtsplitter/shells/viewpoints/cores, map with fog tiles and teasers, per-module season palettes, island-weather events).'],
])
await wave('Systems2b', [
  ['WP30 Codes+Lehrer', 'Implement WP30 adapted: unlock codes are the unit code WORDS from /home/user/ISA-APP/skills/src/content/kurs-j1.js (case-insensitive, with gentle suggestions), plus teacher code, demo code, module codes and 3 island-weather codes; short versions (Kurzfassung) for missed units; teacher panel (all codes, island weather, lines & veils toggles, renaming, emotion-wheel colours, redeemed codes); tools/postbuild/lehrerheft.mjs generating dist/lehrerheft.html (per unit: code, goals, patch back side, debrief questions, Echte-Welt card).'],
  ['WP36-39 Minispiele', 'Implement WP36 (minigame shell with start card, bronze/silver/gold + hidden star, instant restart, tailwind offer after 3 fails, local bests, ghost) with rennen + rhythmus, and WP37 (satzbau with rule sets klarklang/schmiede/kompliment/…; duell), WP38 (verteidigung, lotsen) and WP39 (bauen, wuerfel/Mäxchen) — at least the ones M0–M3 quests need, fully polished; the rest as working basic versions. Genuinely challenging but fair.'],
])

// 4) Systeme III
await wave('Systems3', [
  ['WP33+35 Puls+Kräfte', 'Implement WP33 (Puls 0–100 from e11 with sources/sinks, zone effects via modifiers, capped vignette, anti-spiral, co-regulation; Glimm the salamander companion with colour = Puls and ≤6-word lines; Skills-Koffer with 5 compartments, gadgets, tester, Ampelplan, head gadgets fizzle at red, emergency slot; Sicherer Ort pocket world) and WP35 (abilities Blick stages, Mut: Klarklang + Stopp-Schild, Teamgeist: crew call, get help, second no, bystanders; all gate types with their ability symbol).'],
  ['WP40+54 Baumhaus+Chronik', 'Implement WP40 (treehouse interior + deck, furniture grid, strengths bonsai from the deed log, jukebox, jar of anonymous shells, door to Sicherer Ort, chronicle pinboard, trophy wall, mirror to Stil-Studio, Mäxchen table, hammock) and WP54 (9 memory dioramas framework + the first 4 memories, chronicle pinboard with optional contradictions, Grisel silhouette from M3, cliffhanger pool).'],
])

// 5) Inhalte M0–M3
await wave('Content', [
  ['WP50 Hafen', 'Implement WP50: region hafen (M0) fully: RegionDef, NPCs ilda, jolie, tun, senait + villagers, quests j1-e01..e03 and j1-j07 with short versions, dialogues, Hafen-Kodex tiles, lantern festival, Hafengrotte, harbour-roof race, crate chamber, night-watch variants, patches. Follow DESIGN §11–13 exactly; make the harbour look alive and gorgeous (buildings, stalls, boats, lights).'],
  ['WP51 Strand', 'Implement WP51: region strand (M1) fully: RegionDef + mangrove patch, NPC tiago, quests j1-e04..e06, water tanks, Gezeitenhöhle with surf organ, mirror pool, climbable mangrove, tide chamber, mangrove race, veil core. Follow DESIGN §11–13; beautiful beach and lagoon.'],
])
await wave('Content2', [
  ['WP52 Dschungel', 'Implement WP52: region dschungel (M2) fully: RegionDef, NPC maelle, the 6 birds with befriending rules, quests j1-e07..e10 and j1-j01 (dream-ship scene), feather temple, boat race, shell grotto, canopy village platforms, drum festival, festival rings, feather chamber.'],
  ['WP53 Klippen', 'Implement WP53: region klippen (M3) fully: RegionDef, NPCs luc and jhemp, quests j1-e11..e15, j1-j06 and j1-j09, Windschatten route, kite tug-of-war, Skills-Labor and tester, sound gorge, thought gorge, the 3-phase Gewitter-Titan with Puls cap 80, lightning-rod chamber, storm run.'],
])

// 6) Integration
phase('Integrate')
const integ = await run('WP55 Integration', 'Integrate', 'Implement WP55: integrate M0–M3 end to end (fresh save → intro → avatar → harbour → unlock codes j1-e01..e15 + jokers in order → each quest completable), ?nosel mode, scenario tests tests/scenarios/m0..m3.mjs, performance check on low/medium, reading-load check, safety checklist §19. Fix every integration bug you find (you may edit any file). Produce docs/vs-protokoll.md (German) listing what works, what is missing, and how the teacher should run a playtest with 3–5 youths.')
await commit('LUMO: Vertical Slice M0–M3 integriert')

// 7) Review
phase('Review')
const REV = { type: 'object', properties: { verdict: { type: 'string' }, fixes: { type: 'array', items: { type: 'object', properties: { priority: { type: 'number' }, area: { type: 'string' }, files: { type: 'string' }, problem: { type: 'string' }, change: { type: 'string' } }, required: ['priority', 'area', 'files', 'problem', 'change'] } } }, required: ['verdict', 'fixes'] }
const reviews = (await parallel([
  ['fun+teen', 'three skeptical 14-year-olds from a special-education group + a senior game designer: fun, challenge, coolness, cringe, reading load, frustration, would they keep playing?'],
  ['pedagogy+safety', 'a DBT-A skills trainer + ETEP expert who knows the course: are the unit themes embedded invisibly and faithfully, transfer to real life, no exercises/lectures, safety §19, heikel handling'],
  ['art+tech', 'an art director + tech lead: visual wow, consistency, performance on iPad tiers, bugs, touch controls'],
].map(([k, who]) => () => agent(`${CTX}\n\nReview the integrated vertical slice as ${who}. Build it, play it via Playwright scripts (see tests/), look at many screenshots, read content. Return at most 20 prioritised concrete fixes tied to files. Do not edit files.`, { label: `review:${k}`, phase: 'Review', schema: REV, model: M })))).filter(Boolean)
const fixes = reviews.flatMap((r) => r.fixes).sort((a, b) => a.priority - b.priority)

// 8) Politur
phase('Polish')
const half = Math.ceil(fixes.length / 2)
const groups = [fixes.filter((f) => /welt|world|art|grafik|visual|terrain|water|sky|perf/i.test(f.area + f.files)), fixes.filter((f) => !/welt|world|art|grafik|visual|terrain|water|sky|perf/i.test(f.area + f.files))]
await parallel(groups.map((g, i) => () => run(`polish-${i ? 'gameplay' : 'visual'}`, 'Polish', `Implement these review fixes (priority 1 first; all priority 1–2, others if feasible). Another agent handles the other group in parallel — ${i ? 'you own gameplay/content/UI/systems files, not world rendering files' : 'you own world rendering, art, performance files, not gameplay/content/UI systems'}.\n${JSON.stringify(g.slice(0, 25), null, 1)}`)))
const final = await run('final-verify', 'Polish', 'Final verification: build, run ALL tests (smoke, scenarios, perf, validate, lint:text), fix any breakage, take a screenshot tour (title, avatar editor, harbour day, beach, jungle, cliffs storm, a dialogue, a minigame, the treehouse, colour restore) and update docs/vs-protokoll.md with the honest final state.')
await commit('LUMO: Vertical Slice M0–M3 – Review-Befunde umgesetzt, Endprüfung')
return { integ, reviews: reviews.map((r) => r.verdict), final, notes: notes.slice(-6) }
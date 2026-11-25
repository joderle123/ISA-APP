// Liste aller Modulhefte (Heft + Lösungen) und Sporthefte für die Toolbox-Seite „Module“ (src/seiten/Module.tsx).
// Kopiert die gebauten Hefte aus tmp/hefte/<id>/ nach offline/module/ (im Hub: apps/module/) und schreibt
// src/data/modulhefte.json. Die Sporthefte liegen schon in offline/sport/ (tools/sport/bau.mjs, baukasten.mjs).
//   node tools/hefte/module-index.mjs            → kopieren + Liste schreiben
//   node tools/hefte/module-index.mjs --pruefen  → nur prüfen, ob alle Dateien da sind
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const INHALT = join(ROOT, 'tools/hefte/inhalt')
const ZIEL = join(ROOT, 'offline/module')
const SPORT = join(ROOT, 'offline/sport')
const nurPruefen = process.argv.includes('--pruefen')

// Reihenfolge der Fächer auf der Seite
const FAECHER = ['deutsch', 'franzoesisch', 'mathe', 'culge', 'vieso', 'atelier', 'eduph']
// Module im kompakten Format (alte Toolbox-Hefte + neue Erklärungen): node tools/hefte/mathe-kompakt.mjs <nr>, dann
// npx tsx --tsconfig tsconfig.scripts.json scripts/modulheft.tsx offline/module --nur=mathe-m<nr>
const KOMPAKT = new Set(['mathe-m3'])
const mb = (datei) => Math.round((statSync(datei).size / 1048576) * 10) / 10

const ids = readdirSync(INHALT)
  .map((d) => /^([a-z]+)-m(\d+)\.mjs$/.exec(d))
  .filter((m) => m && FAECHER.includes(m[1]))
  .sort((a, b) => FAECHER.indexOf(a[1]) - FAECHER.indexOf(b[1]) || Number(a[2]) - Number(b[2]))
  .map((m) => `${m[1]}-m${m[2]}`)

if (!nurPruefen) mkdirSync(ZIEL, { recursive: true })
const fehlt = []
const faecher = []
for (const id of ids) {
  const { MODUL: m, LEKTIONEN } = await import(pathToFileURL(join(INHALT, id + '.mjs')).href)
  const sp = m.sprache
  const heft = `${m.dateiname}_${sp === 'de' ? 'Heft' : 'Cahier'}`
  const loes = `${m.dateiname}_${sp === 'de' ? 'Loesungen' : 'Solutions'}`
  const dateien = {}
  for (const name of [heft, loes]) {
    const quelle = join(ROOT, 'tmp/hefte', id, name + '.pdf')
    const ziel = join(ZIEL, name + '.pdf')
    // Kompakte Mathe-Hefte (Rückmeldung der Mathelehrerin) baut scripts/modulheft.tsx direkt nach offline/module – nicht überschreiben
    if (!nurPruefen && existsSync(quelle) && !KOMPAKT.has(id)) copyFileSync(quelle, ziel)
    if (existsSync(ziel)) dateien[name] = mb(ziel)
    else fehlt.push(name)
  }
  const fachId = id.replace(/-m\d+$/, '')
  let fach = faecher.find((f) => f.id === fachId)
  if (!fach) faecher.push((fach = { id: fachId, name: m.fach.de, nameFr: m.fach.fr, sprache: sp, klasse: m.klasse, farbe: m.farben.tief, module: [] }))
  fach.module.push({
    id,
    nr: m.nr,
    niveau: m.niveau || '',
    titel: m.titel[sp],
    ...(sp !== 'de' ? { titelDe: m.titel.de } : {}),
    untertitel: m.untertitel[sp],
    farbe: m.farben.tief,
    zart: m.farben.zart,
    lektionen: LEKTIONEN.length,
    heft,
    loesungen: loes,
    mb: dateien[heft] ?? 0,
    mbLoesungen: dateien[loes] ?? 0,
  })
}

// Sport: Baukasten, Grundlagen, zehn Sportarten
const sport = []
const sportDatei = (name, rest) => {
  if (existsSync(join(SPORT, name + '.pdf'))) sport.push({ datei: name, mb: mb(join(SPORT, name + '.pdf')), ...rest })
  else fehlt.push('sport/' + name)
}
sportDatei('Sport-Baukasten', { name: 'Sport-Baukasten', untertitel: 'Alle guten Warm-ups, Übungen und Spiele auf Karten – dazu je Sportart eine Seite. So stellen Sie Ihre Stunde selbst zusammen.', farbe: '#1e8a5a', art: 'baukasten' })
const { GRUND } = await import(pathToFileURL(join(ROOT, 'tools/sport/inhalt/grundlagen.mjs')).href)
sportDatei('Sport-00-Grundlagen', { name: 'Grundlagen', untertitel: 'So sind die Stunden gebaut: Ablauf, Regeln, Gruppen, schwierige Momente.', farbe: GRUND.farbe, art: 'grundlagen' })
const sportarten = []
for (const d of readdirSync(join(ROOT, 'tools/sport/inhalt'))) {
  if (d === 'grundlagen.mjs' || !d.endsWith('.mjs')) continue
  const { SPORT: s } = await import(pathToFileURL(join(ROOT, 'tools/sport/inhalt', d)).href)
  if (s) sportarten.push(s)
}
for (const s of sportarten.sort((a, b) => a.nr - b.nr)) {
  sportDatei(`Sport-${String(s.nr).padStart(2, '0')}-${s.datei}`, { name: s.name, untertitel: s.untertitel, farbe: s.farbe, art: 'sportart', stunden: s.stunden?.length ?? 6 })
}

if (fehlt.length) {
  console.error(`Fehlt (${fehlt.length}): ${fehlt.join(', ')}`)
  process.exitCode = 1
}
const n = faecher.reduce((s, f) => s + f.module.length, 0)
if (!nurPruefen) {
  writeFileSync(join(ROOT, 'src/data/modulhefte.json'), JSON.stringify({ faecher, sport }, null, 1) + '\n')
  console.log(`✓ src/data/modulhefte.json: ${faecher.length} Fächer, ${n} Module, ${sport.length} Sporthefte`)
} else console.log(`${n} Module geprüft, ${sport.length} Sporthefte`)

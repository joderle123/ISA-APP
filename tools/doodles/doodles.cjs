// „Open Doodles“ von Pablo Stanley (opendoodles.com, CC0) → Formen für die Arbeitsblätter (src/blatt/bilder/doodles.json).
//   npm pack react-open-doodles && tar -xzf react-open-doodles-*.tgz      (außerhalb des Projekts)
//   NODE_PATH=node_modules node tools/doodles/doodles.cjs <pfad>/package
// Farbrollen: Strich 'tinte', Fläche 'akzent' (wird beim Zeichnen zur Bereichsfarbe), Weiß 'papier'.
const path = require('path'), fs = require('fs')
const React = require('react'), { renderToStaticMarkup } = require('react-dom/server')
const lib = require(path.join(process.argv[2], 'dist'))
const TINTE = '#111111', AKZENT = '#FF00AA'
const NAME = { Clumsy: 'stolpern', Unboxing: 'auspacken', DogJump: 'hund-springt', Levitate: 'schweben', Sleek: 'laessig', IceCream: 'eis', SittingReading: 'lesen-sitzen',
  ReadingSide: 'lesen-liegen', Jumping: 'springen', Groovy: 'tanzen-locker', Ballet: 'ballett', RollerSkating: 'rollschuh', Swinging: 'schaukeln', Plant: 'pflanze', Petting: 'streicheln',
  Chilling: 'chillen', Rolling: 'joggen', Strolling: 'spazieren', Dancing: 'tanzen', Sitting: 'sitzen', Sprinting: 'sprinten', Coffee: 'kaffee', Loving: 'umarmen', Moshing: 'feiern',
  Doggie: 'hund', Running: 'laufen', Laying: 'liegen', Float: 'treiben', Selfie: 'selfie', Zombieing: 'abgelenkt', Meditating: 'meditieren', Reading: 'lesen' }
const WEG = ['Bikini']   // passt nicht in Arbeitsblätter
const rolle = (f) => (!f || f === 'none' ? undefined : f.toUpperCase() === AKZENT ? 'akzent' : f === TINTE ? 'tinte' : /^#f{3,6}$/i.test(f) ? 'papier' : f.toUpperCase())
// Pfad neu schreiben, Zahlen auf eine Nachkommastelle. Der Pfad wird dafür richtig gelesen: Zahlen stehen oft ohne Trenner
// hintereinander ("1.5.5" = 1.5 und 0.5), und bei Bögen (a/A) sind die beiden Schalter einzelne Ziffern ("01.5" = 0, 1, 0.5).
function kurz(d) {
  const aus = []
  let i = 0
  const n = d.length
  const zahl = () => {
    while (i < n && /[\s,]/.test(d[i])) i++
    const m = /^[+-]?(\d*\.\d+|\d+\.?)(e[+-]?\d+)?/i.exec(d.slice(i, i + 40))
    if (!m) return null
    i += m[0].length
    return String(+(+m[0]).toFixed(1))
  }
  const schalter = () => { while (i < n && /[\s,]/.test(d[i])) i++; return d[i++] }
  while (i < n) {
    while (i < n && /[\s,]/.test(d[i])) i++
    if (i >= n) break
    const c = d[i++]
    if (!/[a-zA-Z]/.test(c)) return d   // unerwartet: Pfad unverändert lassen
    const teile = []
    if (c === 'a' || c === 'A') {
      for (;;) {
        const rx = zahl(); if (rx === null) break
        teile.push(rx, zahl(), zahl(), schalter(), schalter(), zahl(), zahl())
      }
    } else if (c !== 'z' && c !== 'Z') {
      for (;;) { const z = zahl(); if (z === null) break; teile.push(z) }
    }
    aus.push(c + teile.join(' '))
  }
  return aus.join('')
}
function lies(svg) {
  // sehr kleiner Leser: nur <g …>, </g>, <path …/> – mehr kommt in den Doodles nicht vor
  const stapel = [{ formen: [], fill: undefined }]
  for (const m of svg.matchAll(/<(\/?)(g|path)\b([^>]*?)(\/?)>/g)) {
    const a = Object.fromEntries([...m[3].matchAll(/([a-zA-Z-]+)="([^"]*)"/g)].map((x) => [x[1], x[2]]))
    const oben = stapel[stapel.length - 1]
    if (m[2] === 'g' && !m[1]) {
      const g = { formen: [], fill: a.fill ?? oben.fill, tf: a.transform, o: a.opacity }
      stapel.push(g)
      if (m[4]) stapel.pop()
    } else if (m[2] === 'g') {
      const g = stapel.pop(), eltern = stapel[stapel.length - 1]
      if (!g.formen.length) continue
      if (g.tf || g.o) eltern.formen.push({ t: 'g', tf: g.tf || '', formen: g.formen, ...(g.o ? { o: +g.o } : {}) })
      else eltern.formen.push(...g.formen)
    } else if (a.d) {
      const f = rolle(a.fill ?? oben.fill), s = rolle(a.stroke)
      if (!f && !s) continue
      const form = { t: 'path', d: kurz(a.d), ...(f ? { f } : {}), ...(s ? { s, w: +(a['stroke-width'] ?? 1) } : {}), ...(a.opacity ? { o: +a.opacity } : {}) }
      if ((form.d.match(/[Mm]/g) || []).length > 1) form.er = true
      if (a.transform) oben.formen.push({ t: 'g', tf: a.transform, formen: [form] })
      else oben.formen.push(form)
    }
  }
  return stapel[0].formen
}
const aus = {}
for (const k of Object.keys(lib).filter((k) => /Doodle$/.test(k))) {
  const kurzname = k.replace(/Doodle$/, '')
  if (WEG.includes(kurzname)) continue
  const svg = renderToStaticMarkup(React.createElement(lib[k], { ink: TINTE, accent: AKZENT }))
  const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1].split(/\s+/).map(Number)
  aus[NAME[kurzname] || kurzname.toLowerCase()] = { vb, f: lies(svg) }
}
const ziel = path.join(__dirname, '..', '..', 'src', 'blatt', 'bilder', 'doodles.json')
fs.writeFileSync(ziel, JSON.stringify(aus))
console.log(Object.keys(aus).length, 'Szenen →', ziel, Math.round(fs.statSync(ziel).size / 1024) + ' KB')
console.log(Object.keys(aus).join(' '))

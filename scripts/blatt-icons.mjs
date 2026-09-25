// Liest die benötigten Piktogramme aus @tabler/icons (MIT-Lizenz) und schreibt
// sie kompakt nach src/blatt/bilder/icons.json. Nur diese Auswahl landet in der
// App. Aufruf: node scripts/blatt-icons.mjs
//
// Tabler Icons – MIT License – Copyright (c) 2020-2024 Paweł Kuna
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const QUELLE = join(ROOT, 'node_modules/@tabler/icons/icons/outline')
const ZIEL = join(ROOT, 'src/blatt/bilder/icons.json')

// Auswahl (alphabetisch). Neue Namen hier ergänzen und das Skript erneut ausführen.
export const AUSWAHL = `
abacus alarm alert-triangle alphabet-latin apple armchair arrow-big-right arrow-fork arrow-right arrows-shuffle award
baby-bottle baby-carriage backpack ball-basketball ball-football balloon bandage basket bath battery battery-1 battery-4
bed bell bike bolt bone book book-2 bookmark books bottle brain bread brush bubble bucket building-community bulb bus butterfly
cactus cake calculator calendar calendar-event camera candle car carrot cash cat chalkboard checkbox checklist chess
circle-check clipboard-check clipboard-list clock cloud cloud-rain cloud-storm coffee coin compass confetti cookie crown cup
device-desktop device-gamepad-2 device-laptop device-mobile device-mobile-message device-tv dice-5 dog door door-enter door-exit droplet
ear ear-off eye eye-off feather file-text fish flag flame flower friends ghost gift
hand-click hand-finger hand-grab hand-love-you hand-move hand-off hand-stop hand-three-fingers hand-two-fingers hanger headphones headset
heart heart-broken heart-handshake hearts help-circle home horse hourglass ice-cream info-circle key
ladder lamp leaf lifebuoy list-check lock lock-open mail map map-pin mask masks-theater math medal message message-2 message-circle messages
microphone microscope mood-angry mood-cry mood-happy mood-nervous mood-sad mood-smile mood-surprised moon moon-stars mountain mushroom music
notebook notes paint palette paper-bag paperclip paw pencil pencil-check pencil-plus phone photo piano pig pig-money pill pillow pizza
plane plant player-pause player-play player-stop podium pool puzzle question-mark rainbow road road-sign robot rocket route ruler run
salt school scissors search seedling send shield shield-check shirt shoe shopping-cart sign-left sign-right snowflake snowman soup sparkles
speakerphone spray square-check stairs stairs-up star stretching sun sunrise sunset swimming table target temperature temperature-plus tent
thumb-down thumb-up timeline tir toilet-paper tools tools-kitchen-2 traffic-lights trash tree trees trophy truck umbrella user user-heart
users users-group volcano walk wallet wand wind world writing yoga zzz
`.trim().split(/\s+/)

function attrs(s) {
  const out = {}
  for (const m of s.matchAll(/([a-zA-Z-]+)="([^"]*)"/g)) out[m[1]] = m[2]
  return out
}

const n = (v) => Number(v)
const ergebnis = {}
for (const name of AUSWAHL) {
  const svg = readFileSync(join(QUELLE, name + '.svg'), 'utf8')
  const formen = []
  for (const m of svg.matchAll(/<(path|circle|rect|line|polyline|polygon|ellipse)\b([^>]*)\/?>/g)) {
    const a = attrs(m[2])
    if (a.stroke === 'none') continue
    const fill = a.fill === 'currentColor' ? 'ink' : undefined
    let f
    switch (m[1]) {
      case 'path':
        f = { t: 'path', d: a.d }
        break
      case 'circle':
        f = { t: 'circle', cx: n(a.cx), cy: n(a.cy), r: n(a.r) }
        break
      case 'ellipse':
        f = { t: 'ellipse', cx: n(a.cx), cy: n(a.cy), rx: n(a.rx), ry: n(a.ry) }
        break
      case 'rect':
        f = { t: 'rect', x: n(a.x || 0), y: n(a.y || 0), b: n(a.width), h: n(a.height) }
        if (a.rx) f.rx = n(a.rx)
        break
      case 'line':
        f = { t: 'line', x1: n(a.x1), y1: n(a.y1), x2: n(a.x2), y2: n(a.y2) }
        break
      case 'polyline':
      case 'polygon':
        f = { t: m[1], p: a.points }
        break
    }
    if (fill) f.f = fill
    formen.push(f)
  }
  if (!formen.length) throw new Error('Leeres Piktogramm: ' + name)
  ergebnis[name] = formen
}
mkdirSync(dirname(ZIEL), { recursive: true })
writeFileSync(ZIEL, JSON.stringify(ergebnis))
console.log(AUSWAHL.length + ' Piktogramme →', ZIEL)

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
abacus acorn alarm alert-triangle alphabet-latin ambulance angle apple armchair arrow-big-right arrow-fork arrow-right
arrows-shuffle award baby-bottle baby-carriage backpack ball-basketball ball-football ball-tennis ball-volleyball
balloon banana bandage basket bath battery battery-1 battery-4 beach bed bell bell-ringing bell-school bike bolt bone
book book-2 bookmark books bottle bowl bowl-spoon brain bread brush bubble bucket bug building-castle building-community
building-cottage bulb bus butterfly cactus cake calculator calendar calendar-event camera campfire candle candy car
car-crane carrot cash cat chalkboard chart-bar chart-pie checkbox checklist cheese chef-hat cherry chess christmas-ball
christmas-tree circle circle-check clipboard-check clipboard-list clock clothes-rack cloud cloud-rain cloud-snow
cloud-storm coffee coin coin-euro compass confetti cookie cookie-man crown cube cup decimal deer dental device-desktop
device-gamepad-2 device-laptop device-mobile device-mobile-message device-tv dice dice-3 dice-5 dog door door-enter
door-exit dragon droplet ear ear-off egg egg-fried eggs eye eye-off eyeglass feather fence file-text firetruck
first-aid-kit fish flag flame flower footsteps fridge friends gas-station ghost gift gift-card glass-full globe grape
hammer hand-click hand-finger hand-grab hand-love-you hand-move hand-off hand-sanitizer hand-stop hand-three-fingers
hand-two-fingers hanger headphones headset heart heart-broken heart-handshake hearts helicopter help-circle hexagon home
horse hourglass ice-cream info-circle jacket key ladder lamp layout-grid leaf leaf-2 lemon lifebuoy line list-check lock
lock-open lollipop magnet mail mailbox map map-2 map-pin mask masks-theater math math-avg math-greater math-symbols
medal melon message message-2 message-circle messages microphone microscope milk mood-angry mood-cry mood-happy mood-kid
mood-nervous mood-sad mood-sick mood-smile mood-surprised mood-tongue mood-wink moon moon-stars mountain mug mushroom
music music-heart needle-thread notebook notes number-0 number-1 number-10 number-2 number-3 number-4 number-5 number-6
number-7 number-8 number-9 nurse oval package paint palette paper-bag paperclip paw pencil pencil-check pencil-plus
pepper phone photo piano pig pig-money pill pillow pizza plane plant plant-2 player-pause player-play player-stop podium
pool pumpkin-scary puzzle question-mark rainbow receipt rectangle road road-sign robot rocket route ruler ruler-2
ruler-measure run run-sprint sailboat salad salt sandbox scale school scissors scooter search seedling send shape
shape-2 shield shield-check ship shirt shirt-sport shoe shopping-bag shopping-cart shovel sign-left sign-right
skateboard skateboarding ski-jumping snowboarding snowflake snowman soccer-field soup sparkles speakerphone spider spray
square square-check stairs stairs-up star stars stethoscope stopwatch stretching sun sun-high sunglasses sunrise sunset
swimming table tallymarks target temperature temperature-plus temperature-snow temperature-sun tent thumb-down thumb-up
timeline tir toilet-paper tools tools-kitchen-2 tower tractor traffic-lights train trash tree trees triangle trophy
truck umbrella user user-heart users users-group volcano walk wall wallet wand weight wind world writing yoga zzz
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

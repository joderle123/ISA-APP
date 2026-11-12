// Liest eine Auswahl farbiger Bilder aus „Fluent Emoji“ (Microsoft, MIT-Lizenz; Stil „flat“) und schreibt sie kompakt
// nach src/blatt/bilder/emoji.json. Nur diese Auswahl landet in der App.
//   npm pack fluentui-emoji && tar -xzf fluentui-emoji-*.tgz       (einmal, außerhalb des Projekts)
//   node scripts/blatt-emoji.mjs <pfad>/package/icons/flat
// Verwendung im Arbeitsblatt: 'emoji:<name>', z. B. 'emoji:pizza' (src/blatt/zeichnung.ts).
//
// Fluent Emoji – MIT License – Copyright (c) Microsoft Corporation
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const QUELLE = process.argv[2] ?? join(ROOT, 'node_modules/fluentui-emoji/icons/flat')
const ZIEL = join(ROOT, 'src/blatt/bilder/emoji.json')

// Auswahl nach Themen. Neue Namen hier ergänzen und das Skript erneut ausführen (Dateinamen ohne .svg).
export const AUSWAHL = `
grinning-face smiling-face-with-smiling-eyes beaming-face-with-smiling-eyes face-with-tears-of-joy winking-face neutral-face
thinking-face face-with-rolling-eyes confused-face worried-face frowning-face crying-face loudly-crying-face angry-face
enraged-face pouting-face fearful-face anxious-face-with-sweat flushed-face astonished-face sleeping-face sleepy-face tired-face
yawning-face nauseated-face partying-face star-struck smiling-face-with-sunglasses pleading-face disappointed-face
face-with-raised-eyebrow zany-face shushing-face hugging-face exploding-head relieved-face sad-but-relieved-face

thumbs-up-default thumbs-down-default waving-hand-default raised-hand-default clapping-hands-default handshake
folded-hands-default ok-hand-default victory-hand-default flexed-biceps-default writing-hand-default raising-hands-default
oncoming-fist-default crossed-fingers-default open-hands-default ear-default eye eyes mouth nose-default brain tooth
foot-default leg-default lungs speaking-head bust-in-silhouette busts-in-silhouette footprints

red-apple green-apple banana grapes strawberry cherries watermelon lemon tangerine pear peach pineapple kiwi-fruit
blueberries avocado carrot broccoli cucumber tomato potato onion garlic bell-pepper ear-of-corn leafy-green mushroom
bread croissant baguette-bread pretzel cheese-wedge egg cooking pancakes waffle butter bacon hamburger french-fries pizza
hot-dog sandwich taco burrito spaghetti cooked-rice steaming-bowl pot-of-food green-salad popcorn cookie doughnut
birthday-cake cupcake chocolate-bar candy lollipop ice-cream soft-ice-cream honey-pot glass-of-milk hot-beverage teapot
cup-with-straw beverage-box tumbler-glass bottle-with-popping-cork fork-and-knife fork-and-knife-with-plate spoon
bowl-with-spoon kitchen-knife salt canned-food shopping-cart shopping-bags basket

dog cat mouse hamster rabbit fox bear panda koala tiger lion cow pig frog chicken rooster baby-chick penguin bird duck
eagle owl bat wolf horse unicorn honeybee bug butterfly snail lady-beetle ant spider turtle snake lizard octopus fish
tropical-fish dolphin whale shark crab elephant giraffe zebra monkey gorilla kangaroo camel hedgehog squirrel deer
sheep ewe goat t-rex sauropod dragon paw-prints

deciduous-tree evergreen-tree palm-tree cactus seedling herb four-leaf-clover maple-leaf fallen-leaf tulip rose sunflower
blossom cherry-blossom bouquet potted-plant sun sun-behind-cloud cloud cloud-with-rain cloud-with-snow
cloud-with-lightning rainbow snowflake snowman umbrella umbrella-with-rain-drops droplet water-wave fire high-voltage
star glowing-star sparkles crescent-moon full-moon mountain snow-capped-mountain volcano beach-with-umbrella
desert-island camping tent national-park sunrise sunset night-with-stars globe-showing-europe-africa world-map

house house-with-garden houses school hospital bank post-office convenience-store department-store office-building
factory church mosque synagogue castle stadium fountain playground-slide bus-stop bridge-at-night cityscape door window
bed couch-and-lamp chair toilet shower bathtub mirror key locked unlocked

automobile taxi bus minibus ambulance fire-engine police-car delivery-truck tractor bicycle kick-scooter motor-scooter
motorcycle skateboard train high-speed-train locomotive tram metro airplane helicopter rocket sailboat ship ferry
motor-boat canoe fuel-pump vertical-traffic-light horizontal-traffic-light stop-sign construction warning

soccer-ball basketball volleyball tennis ping-pong badminton baseball american-football rugby-football bowling
ice-skate skis sled roller-skate running-shoe swimming-pool goal-net trophy sports-medal 1st-place-medal 2nd-place-medal
3rd-place-medal military-medal bullseye kite yo-yo puzzle-piece game-die chess-pawn joystick video-game teddy-bear balloon
party-popper confetti-ball wrapped-gift christmas-tree jack-o-lantern fireworks performing-arts artist-palette paintbrush
crayon guitar violin drum trumpet musical-keyboard saxophone microphone headphone musical-note musical-notes radio
television movie-camera clapper-board camera popcorn ticket circus-tent ferris-wheel roller-coaster

backpack books open-book closed-book notebook green-book blue-book orange-book pencil pen fountain-pen memo clipboard
straight-ruler triangular-ruler scissors paperclip pushpin abacus calendar spiral-calendar tear-off-calendar
alarm-clock stopwatch timer-clock hourglass-not-done watch graduation-cap briefcase laptop desktop-computer keyboard
computer-mouse printer mobile-phone telephone telephone-receiver e-mail envelope love-letter package postbox newspaper
light-bulb flashlight battery low-battery electric-plug magnifying-glass-tilted-left microscope telescope test-tube
magnet compass world-map globe-with-meridians bell megaphone loudspeaker speech-balloon thought-balloon
right-anger-bubble zzz hundred-points check-mark-button cross-mark question-mark exclamation-mark red-heart
broken-heart sparkling-heart heart-with-ribbon collision dizzy sweat-droplets dashing-away

t-shirt jeans shorts dress coat scarf gloves socks running-shirt billed-cap womans-hat top-hat crown glasses sunglasses
mans-shoe hiking-boot flat-shoe thong-sandal handbag purse luggage closed-umbrella ring

soap sponge toothbrush lotion-bottle razor roll-of-paper broom bucket wastebasket basket safety-pin thread yarn
sewing-needle adhesive-bandage pill syringe stethoscope thermometer crutch white-cane ear-with-hearing-aid-default
manual-wheelchair motorized-wheelchair mechanical-arm mechanical-leg x-ray drop-of-blood microbe

hammer wrench screwdriver hammer-and-wrench toolbox carpentry-saw axe ladder nut-and-bolt gear brick wood
fire-extinguisher money-bag coin euro-banknote credit-card receipt gem-stone balance-scale shield robot alien ghost
magic-wand crystal-ball linked-paperclips motorway sheaf-of-rice
teacher-default student-default health-worker-default cook-default farmer-default mechanic-default firefighter-default
police-officer-default construction-worker-default office-worker-default scientist-default artist-default
technologist-default pilot-default judge-default astronaut-default singer-default detective-default
`.split(/\s+/).filter(Boolean)

const zahl = (s) => +(+s).toFixed(2)
function formen(svg) {
  if (/Gradient|<mask|clip-path|<g[ >]|transform=|<use|<image|<text/.test(svg)) return null
  const out = []
  for (const m of svg.matchAll(/<(path|circle|rect|ellipse)\b([^>]*)\/?>/g)) {
    const a = Object.fromEntries([...m[2].matchAll(/([a-z-]+)="([^"]*)"/g)].map((x) => [x[1], x[2]]))
    const fill = a.fill && a.fill !== 'none' ? a.fill.toUpperCase() : undefined
    const stil = {}
    if (fill) stil.f = fill
    if (a.stroke && a.stroke !== 'none') { stil.s = a.stroke.toUpperCase(); stil.w = zahl(a['stroke-width'] ?? 1) }
    const o = a.opacity ?? a['fill-opacity']
    if (o !== undefined && +o < 1) stil.o = zahl(o)
    if (!stil.f && !stil.s) continue
    if (m[1] === 'path') out.push({ t: 'path', d: a.d, ...(a['fill-rule'] === 'evenodd' ? { er: true } : {}), ...stil })
    else if (m[1] === 'circle') out.push({ t: 'circle', cx: zahl(a.cx ?? 0), cy: zahl(a.cy ?? 0), r: zahl(a.r), ...stil })
    else if (m[1] === 'ellipse') out.push({ t: 'ellipse', cx: zahl(a.cx ?? 0), cy: zahl(a.cy ?? 0), rx: zahl(a.rx), ry: zahl(a.ry), ...stil })
    else out.push({ t: 'rect', x: zahl(a.x ?? 0), y: zahl(a.y ?? 0), b: zahl(a.width), h: zahl(a.height), ...(a.rx ? { rx: zahl(a.rx) } : {}), ...stil })
  }
  return out.length ? out : null
}

const bilder = {}
const fehlt = []
for (const name of [...new Set(AUSWAHL)].sort()) {
  const datei = join(QUELLE, name + '.svg')
  const f = existsSync(datei) ? formen(readFileSync(datei, 'utf8')) : null
  if (f) bilder[name.replace(/-default$/, '')] = f
  else fehlt.push(name)
}
writeFileSync(ZIEL, JSON.stringify(bilder))
console.log(`${Object.keys(bilder).length} Bilder → ${ZIEL} (${Math.round(JSON.stringify(bilder).length / 1024)} KB)`)
if (fehlt.length) console.log('nicht gefunden oder zu aufwendig gezeichnet:', fehlt.join(' '))

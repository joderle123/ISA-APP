/* LUMO · Content-Schema v1 (Staffel 1). Alle Inhalte sind reine Daten: `export default {…}`.
Die Ablage wird vom Build automatisch eingesammelt, es gibt keinen Index:
  src/content/regions/<id>.js   npcs/<id>.js   quests/<unitId>.js   dialogues/<id>.js
  minigames/<id>.js   rooms/<id>.js   memories/<id>.js   nachtwache/<id>.js
  gadgets/<id>.js     cosmetics/<set>.js   collectibles/<region>.js   glimm.js
Konventionen:
  IDs in ASCII kebab-case. Einheiten exakt: 'j1-e01'…'j1-e30', 'j1-j01'…'j1-j09'.
  Text = string | { t, tts?, icon? }. SAY ≤ 12 Wörter, GLIMM ≤ 6, LABEL ≤ 5 (Linter).
  Pos = { x, z, y? } | { site: 'baumhaus' } | { site: 'strand.muschelbucht' }
  Emotionen: freude|wut|angst|trauer|ekel|ueberraschung
  Tanks: koerper|sicherheit|zugehoerigkeit|anerkennung|selbstbestimmung|spass
  Streit-Stile: hai|schildkroete|teddy|fuchs|eule
  Zonen: gruen|gelb|rot
  Modi: entspannt|abenteuer|profi
  Fähigkeiten: blick|teamgeist|schwimmen|klettern|segel|tauchen|ruhe|mut
  Upgrades: blick.(faeden|tanks|koerper|doppel|grenzen|streittiere|masken), segel.kombi,
    ruhe.(puls|koerper|sinne|kopf|ampel|rucksack), mut.(zeichen|klarklang|stopp|nein|leiter),
    teamgeist.(ruf|hilfe|zweitesNein|zuschauer)
*/

// ---- Bedingungen (Cond) ----
// {unit:'j1-e04'} (freigeschaltet oder kurz)   {unitDone:'j1-e04'}
// {ability:'segel'}  {upgrade:'blick.tanks'}   {feather:'wut'}   {item:'kaeltekristall'}
// {flag:'kodex.stopp'} | {flag:['x','>=',3]}   {bond:['jolie',2]}   {time:'night'|[18,23]}
// {puls:['<',70]}  {npcHitze:['luc','>',70]}   {mode:'profi'}   {shard:4}
// {all:[…]}  {any:[…]}  {not:Cond}

// ---- Effekte (Effect) ----
// {flag:'x', set:true}   {bond:['tiago',+1]}   {deed:'jolie-im-dunkeln-gefuehrt'}
// {tank:{npc:'tiago', tank:'anerkennung', add:60, kind:'need'|'wish'}}
// {puls:-20}   {npcHitze:['luc',-30]}   {emotion:{npc:'maelle', primary:['freude',6], secondary:['trauer',8]}}
// {grant:'segel'}   {upgrade:'blick.doppel'}   {feather:'angst'}   {gadget:'klangmuschel'}   {wurzel:'krabbe'}
// {veil:{zone:'strand', to:0.3, from:{site:'strand.muschelbucht'}}}   {relapse:{patch:'surfspot', to:0.9}}
// {patch:'j1-e04'}   {lichtsplitter:3}   {cosmetic:'segel-regenbogen'}   {shard:2}
// {echo:EchoDef}   {quest:['start','j1-e05']}   {scene:{enter:'gezeitenhoehle', spawn:'eingang'}}
// {glimm:'Da. Windstille.'}   {anim:{npc:'jolie', emote:'sitzen-neben'}}   {gate:{open:'markt-hintertor'}}

// ---- RegionDef ----
export default {
  id: 'strand', module: 'j1-m1', name: 'Palmenstrand',
  veil: {
    zone: 'strand', start: 1, steps: { 'j1-e04': 0.6, 'j1-e05': 0.3, 'j1-e06': 0 },
    patches: [{ id: 'mangrove', x: 150, z: -8, r: 18, start: 1, freeAt: 'j1-e06' }],
  },
  teaserFrom: 'j1-e03',                                  // sichtbar, aber gesperrt
  palette: { key: '#2de2c9', accent: '#ff7a59', dyes: ['#2de2c9', '#ffe29a', '#ff7a59', '#0b6e79'] },
  season: 'spaetsommer',
  music: { theme: 'strand', layers: ['marimba', 'bass', 'steeldrum', 'chor'] },
  sites: {
    muschelbucht: { x: 128, z: 38, r: 10 },
    gezeitenhoehle: { x: 160, z: 0, interior: 'gezeitenhoehle' },
    mangrove: { x: 150, z: -8 },
    spiegelbecken: { x: 142, z: 44 },
    surfspot: { x: 172, z: 32 },
  },
  signalfeuer: [{ id: 'sf-strand', site: 'muschelbucht', litBy: { unitDone: 'j1-e04' } }],
  gates: [
    { id: 'strand-bruecke', type: 'runentor', needs: { upgrade: 'teamgeist.ruf' }, pos: { x: 118, z: 58 } },
    { id: 'hoehle-flut', type: 'gezeitentuer', params: { need: 'flut' }, pos: { site: 'strand.gezeitenhoehle' } },
  ],
  climbables: [{ id: 'mangrove-stamm', kind: 'wurzel', pos: { site: 'strand.mangrove' }, height: 40 }],
  lichtkammer: 'gezeitenkammer', rennstrecken: ['mangroven-kletterei'], nebelkern: 'nk-strand',
  aussichtspunkte: [{ id: 'ap-mangrove', x: 150, z: -8, y: 42 }],
  npcs: ['tiago'], ambient: { count: 6, seed: 41 },
};

// ---- NpcDef ----
export const npcBeispiel = {
  id: 'jolie', name: 'Jolie', surname: 'Wagner', age: 13, renameable: true,
  icon: 'muschel', color: '#39d0c8', silhouette: 'grosse-kapuze', introducedIn: 'j1-e01',
  look: { skin: '#f0c09a', hairStyle: 'lang', hair: '#6b4a2f', top: '#39d0c8', topStyle: 'hoodie', bottoms: '#2b3350' },
  voice: { pitch: 1.15, rate: 0.95 },
  schedule: [
    { from: 6, to: 11, site: 'steg', anim: 'sit' },
    { from: 11, to: 17, site: 'strand.muschelbucht', anim: 'think' },
    { from: 17, to: 22, site: 'dorfplatz' },
    { from: 22, to: 6, site: 'haus2', hidden: true },
  ],
  emotion: { base: { primary: ['trauer', 4] } },
  tanks: { koerper: 70, sicherheit: 60, zugehoerigkeit: 15, anerkennung: 40, selbstbestimmung: 60, spass: 50 },
  boundary: { byBond: [2.4, 1.8, 1.2, 0.9], mood: { angst: 1.3 } },   // Radius in Metern
  streitStil: { default: 'schildkroete', vs: { tun: 'fuchs' } },
  temperament: 'ebbe',
  bond: {
    ability: { level: 2, id: 'spalt', say: 'Ich zeig dir die Spalten.' },
    jacket: 'muschel',
    finale: 'Du hast dich einfach neben mich gesetzt.',
  },
  tell: { bluff: 'blick-links-unten', amp: { entspannt: 1, abenteuer: 0.6, profi: 0.3 } },
  lines: {
    greet: ['Hi.', 'Oh. Du wieder.'],
    campfire: { 'jolie-im-dunkeln-gefuehrt': 'Im Dunkeln war ich froh, dass du gewartet hast.' },
  },
  nachtwache: ['nw-jolie-steg'],
};

// ---- DialogueDef ----
// 'Deckel ab': Bei Hitze > 70 prallen Wahlen mit tone != 'handlung' ab.
export const dialogBeispiel = {
  id: 'e11-luc-kante', unit: 'j1-e11', cast: ['luc'], camera: 'talk', rewind: true, start: 'a',
  nodes: {
    a: {
      speaker: 'luc', say: 'Lass mich! Der Drachen reißt gleich alles ab!', anim: 'angry',
      enter: [{ npcHitze: ['luc', 90] }],
      choices: [
        { say: 'Beruhig dich mal!', icon: 'hand', tone: 'fest', effects: [{ npcHitze: ['luc', +5] }], goto: 'a2' },
        { say: 'Was ist denn los?', icon: 'frage', tone: 'ruhig', requires: { npcHitze: ['luc', '<', 70] }, goto: 'b' },
        { label: 'Leine packen', icon: 'seil', tone: 'handlung', minigame: 'e11-tauziehen', goto: 'c' },
      ],
    },
    a2: { speaker: 'luc', say: '…', anim: 'angry', goto: 'a' },
    c: { speaker: 'luc', say: 'Okay. Okay. Danke.', effects: [{ npcHitze: ['luc', -60] }, { deed: 'luc-leine' }], goto: 'b' },
    b: {
      speaker: 'luc', say: 'Die Böe kam. Und alle haben gelacht.', anim: 'sad',
      lauschen: { seconds: 4 },                                      // Stillstehen, sonst bricht der Satz ab
      choices: [
        { say: 'Das klingt richtig mies.', icon: 'herz', effects: [{ bond: ['luc', +1] }], goto: 'd' },
        { say: 'Zeig mir das Windrad.', icon: 'windrad', goto: 'd' },
      ],
    },
    d: { end: true, effects: [{ flag: 'e11.luc-ruhig', set: true }] },
  },
  // System-Wahlen, die automatisch dazukommen: 'Rückzug' immer, 'Hilfe holen' ab ruhe.puls
};

// ---- QuestDef ----
export const questBeispiel = {
  id: 'j1-e11', module: 'j1-m3', title: 'Das Sturmbarometer', region: 'klippen', estMinutes: 18,
  templates: ['wegTor', 'szene', 'pruefung'],
  grants: [{ upgrade: 'ruhe.puls' }],
  kurzfassung: {
    minutes: 3, steps: ['windschatten', 'luc'],
    grants: [{ upgrade: 'ruhe.puls' }], veil: { zone: 'klippen', to: 0.8 },
  },
  steps: [
    { id: 'wetterwarte', template: 'wegTor', params: { to: { site: 'klippen.wetterwarte' } }, marker: true, onStart: [{ glimm: 'Ich hab jetzt Farben.' }] },
    { id: 'windschatten', template: 'wegTor', params: { route: 'klippenpfad', pulsSources: ['boeen', 'donner'], shelters: 4, to: { site: 'klippen.kante' } }, hints: { glimm: ['Da. Windstille.'] } },
    { id: 'luc', template: 'szene', params: { dialogue: 'e11-luc-kante' } },
    { id: 'prognose', template: 'pruefung', optional: true, params: { minigame: 'e11-sturmprognose' } },
  ],
  onComplete: [
    { veil: { zone: 'klippen', to: 0.8, from: { site: 'klippen.kante' } } },
    { patch: 'j1-e11' }, { lichtsplitter: 3 }, { bond: ['luc', +1] },
  ],
  teaser: { gate: 'klangschlucht-tor' },
  glimm: 'Bei Rot hört keiner zu.',
  patch: { icon: 'barometer', color: '#8fa3ff', back: 'Anspannung 0–100: Grün, Gelb, Rot. Bei Rot erst runter, dann reden.' },
  echteWelt: 'Schätz dreimal am Tag deine Anspannung von 0 bis 100.',
  debrief: ['Warum konnte man Luc bei 90 nicht zutexten?', 'Was half dir zurück auf Grün?'],
  kursziele: ['Momente ohne Kontrolle', 'Skala 0–30/30–70/70–100', 'Situationen einschätzen'],
  shard: null, linesAndVeils: false,
};

// ---- Parameter der Schritt-Vorlagen ----
// wegTor     { to:Pos, route?, gate?, pulsSources?:[], shelters?:n }
// tragen     { item, from:Pos, to:Pos, slosh?:0–1, fragile?, avoidRadii?, count? }
// szene      { dialogue }
// ermitteln  { evidence:[{id, kind:'fakt'|'urteil', pos, say}], board:'gericht'|'chronik'|'repost', need:n, chain?:[npcId] }
// treppe     { npcs:[a,b], steps:[{id, template, params}], slideBack:true, checkDay?:n }
// befreunden { creature, rule:'nicht-rennen'|'linie-achten'|'still-sitzen'|'fangen'|'frisch-fuettern'|'stillstehen-umsehen', seconds? }
// lotsen     { guide, mode:'befehle'|'folgen', stoppRecht:true, visualFallback:true, room }
// boss       { phases:[{zone, template, params, pulsCap}], win:'hilfe-holen'|'zuschauer'|'lauschen'|'fakten' }
// bauen / pruefung { minigame }
// nachtwache { pool:[id] }
// erinnerung { memory }

// ---- MinigameDef (Vorlagen: rennen|rhythmus|satzbau|duell|verteidigung|lotsen|bauen|wuerfel) ----
export const minigameBeispiel = {
  id: 'e11-tauziehen', template: 'rhythmus', title: 'Die Drachenleine', icon: 'seil',
  intro: 'Halten, wenn die Böe kommt. Loslassen, wenn sie geht.',
  modes: {
    entspannt: { window: 0.35, beats: 8 },
    abenteuer: { window: 0.22, beats: 12 },
    profi: { window: 0.14, beats: 16, irregular: true },
  },
  medals: { bronze: { hits: 0.5 }, silber: { hits: 0.8 }, gold: { hits: 0.95 }, stern: { hits: 1, noHint: true, noRewind: true } },
  story: { minMedal: 'bronze', failForward: true },
  params: { input: 'hold', partner: 'luc', onHit: [{ puls: -4 }, { npcHitze: ['luc', -6] }] },
};
export const satzbauBeispiel = {
  id: 'e21-klarklang-noor', template: 'satzbau', ruleset: 'klarklang', title: 'Der Klarklang', icon: 'horn',
  slots: [
    { id: 'gefuehl', label: 'Ich fühle mich …', tiles: [{ t: 'traurig', ok: true }, { t: 'egal', ok: false }] },
    { id: 'kamera', label: 'wenn …', tiles: [{ t: 'mein Bild übermalt wird', ok: true }, { t: 'du immer alles kaputt machst', thorn: true }] },
    { id: 'grund', label: 'weil …', tiles: [{ t: 'ich drei Tage gemalt habe', ok: true }, { t: 'du fies bist', thorn: true }] },
    { id: 'wunsch', label: 'Ich wünsche mir …', tiles: [{ t: 'dass du vorher fragst', ok: true }, { t: 'dass du verschwindest', thorn: true }] },
  ],
  outcome: {
    clean: [{ npcHitze: ['saftverkaeufer', -40] }, { gate: { open: 'markt-hintertor' } }],
    thorn: [{ npcHitze: ['saftverkaeufer', +15] }],
  },
};
// ruleset 'schmiede': tiles tragen rules:{realistisch, aktiv, gegenwart, beeinflussbar, wachstum, ohneNicht}
//   → Brettphysik glas | spaet | bricht | waechst

// ---- RoomDef ----
export const roomBeispiel = {
  id: 'gezeitenhoehle', kit: 'hoehle', size: [40, 14, 60], light: 'biolumineszenz',
  water: { level: 0.4, tide: true },
  spawns: { eingang: [0, 0, 28] },
  exits: [{ at: [0, 0, 30], to: { region: 'strand', site: 'strand.gezeitenhoehle' } }],
  features: [{ type: 'gezeitenhorn', at: [4, 0, 20] }, { type: 'orgel', at: [0, 0, -24], minigame: 'e05-brandungsorgel' }],
};

// ---- GadgetDef ----
export const gadgetBeispiel = {
  id: 'kaeltekristall', fach: 'sinne', unit: 'j1-e13', name: 'Kältekristall', icon: 'kristall', use: 'werfen',
  effect: { puls: -30, world: 'sturmfeld-einfrieren', radius: 4, seconds: 12 },
  zones: { gruen: 1, gelb: 1, rot: 1 },     // Kopf-Gadgets: rot: 0 → verpufft ohne Strafe
  perSave: [0.7, 1.3], npcFit: { luc: 0.8, pit: 1.2 }, reichweite: 95, cooldown: 20,
};

// ---- MemoryDef (Herzglas) ----
export const memoryBeispiel = {
  id: 'erinnerung-5-pit', shard: 5, owner: 'pit', unit: 'j1-e18', feeling: 'scham',
  filter: { tint: '#6a8f5a', blur: 0.4, focus: 'lachende-gesichter' },
  diorama: {
    scene: 'sommerfest-buehne', hour: 21.8, props: ['buehne', 'laternen', 'handys'],
    figures: [
      { npc: 'pit', pose: 'slump' },
      { npc: 'jhemp', pose: 'stolpern' },
      { crowd: 12, pose: 'lachen', facing: 'handy' },
    ],
  },
  caption: 'Alle lachen. Pit war sicher: über mich.',
  chain: { step: 'gedanke', say: 'Ein Gedanke färbt, was man erinnert.' },
  laterTruth: { unlockAt: 'j1-e28', say: 'Das Lachen galt einem Video.' },
};

// ---- NachtwacheDef ----
export const nachtwacheBeispiel = {
  id: 'nw-jolie-steg', npc: 'jolie', from: 'j1-e05', where: { site: 'steg' },
  clue: { routineBreak: true, glimm: 'Jolie ist weg. Komisch.', tracks: true },
  outer: ['freude', 3], inner: ['trauer', 7],   // inner erst mit blick.masken, vorher Pose 'slump'
  need: 'zugehoerigkeit',
  help: [
    { id: 'sitzen', label: 'Hinsetzen', fits: 'zugehoerigkeit', emote: 'sitzen-neben', seconds: 8 },
    { id: 'decke', label: 'Decke bringen', fits: 'koerper' },
    { id: 'zuhoeren', label: 'Zuhören', fits: 'anerkennung', dialogue: 'nw-jolie-lauschen' },
  ],
  reward: { fit: [{ bond: ['jolie', +1] }, { lichtsplitter: 2 }], other: [{ lichtsplitter: 1 }] },   // nie 'falsch'
  line: { fit: 'Danke, dass du da bist.', other: 'Nett von dir.' },
};

// ---- EchoDef: nur positiv, oder mit Reparatur-Quest (sonst lehnt der Validator ab) ----
export const echoBeispiel = {
  id: 'echo-tiago-rennen', when: { flag: 'e05.tiago-rennen-verpasst' }, delay: { days: 1 },
  effect: { mood: ['tiago', 'verstimmt'] },
  line: { npc: 'tiago', say: 'Du warst nicht beim Rennen.' },
  repair: { quest: 'rep-tiago-surfspot', clears: true },
};

// ---- CosmeticDef ----
export const cosmetics = {
  items: [
    { id: 'segel-regenbogen', slot: 'segel', source: { minigame: 'e10-kronen-segeln', medal: 'gold' }, builder: 'segelMuster', params: { stripes: 6 } },
    { id: 'glimm-axolotl', slot: 'glimm', source: { nebelkern: 'nk-strand' } },
    { id: 'maske-eule', slot: 'maske', source: { unitDone: 'j1-e24' } },
    { id: 'emote-trommeltanz', slot: 'emote', source: { unitDone: 'j1-e09' } },
    { id: 'farbe-lagune', slot: 'farbset', source: { regionFreed: 'strand' } },
  ],
};   // Slots: kopf|oberteil|unterteil|schuhe|muster|farbset|segel|spur|glimm|maske|emote|moebel|jacke

// ---- CollectibleDef ----
// { items: [{ id:'ls-strand-03', type:'lichtsplitter'|'muschel'|'aussicht'|'knobel', pos, needs?:Cond, memoryImage? }] }

// ---- SaveState (core/save.js), 'private' geht nie in den Export ----
// { v:1, handle:'Nebelfuchs 7', symbolLock?:['muschel','stern','anker'],
//   settings:{mode, reducedFx, bigText, autoRead, glimmMuted},
//   avatar, cosmetics:{owned, equipped},
//   units:{ 'j1-e01':'fertig'|'aktiv'|'offen'|'kurz'|'gesperrt' }, codesUsed:[],
//   quests:{ [id]:{ step, data } },
//   abilities:[], upgrades:[], feathers:[], gadgets:[], ampel:{ gruen, gelb, rot, notfall },
//   wurzeln:{ base:3, extra:[] }, bonds:{}, moods:{}, deeds:[], echoes:[], flags:{},
//   veil:{ zones:{}, patches:{} }, shards:[], chronik:{ placed:[] },
//   collectibles:{}, medals:{ [id]:{ best, medal, stern } },
//   baumhaus:{ furniture:[], bonsai:[], jukebox:[], glas:[] },
//   echteWelt:{ [unit]:'gemacht'|'versucht'|'diesmal-nicht' },
//   private:{ glaubenssatz:null, flaschenpost:null, sichererOrt:{}, spiegelbecken:{} },
//   time:{ day, hour }, pos:{ scene, x, z, yaw } }

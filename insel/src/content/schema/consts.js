// Feste Wertelisten des Content-Schemas v1 (siehe CONTENT-SCHEMA.md). Reine Daten, laufen in Node und im Browser.
const pad = (n) => String(n).padStart(2, '0');
export const UNIT_IDS = [
  ...Array.from({ length: 30 }, (_, i) => `j1-e${pad(i + 1)}`),
  ...Array.from({ length: 9 }, (_, i) => `j1-j${pad(i + 1)}`),
];
export const MODULE_IDS = Array.from({ length: 10 }, (_, i) => `j1-m${i}`);
export const UNIT_MODULE = Object.fromEntries([
  ...['j1-e01', 'j1-e02', 'j1-e03'].map((u) => [u, 'j1-m0']),
  ...['j1-e04', 'j1-e05', 'j1-e06'].map((u) => [u, 'j1-m1']),
  ...['j1-e07', 'j1-e08', 'j1-e09', 'j1-e10'].map((u) => [u, 'j1-m2']),
  ...['j1-e11', 'j1-e12', 'j1-e13', 'j1-e14', 'j1-e15'].map((u) => [u, 'j1-m3']),
  ...['j1-e16', 'j1-e17', 'j1-e18', 'j1-e19'].map((u) => [u, 'j1-m4']),
  ...['j1-e20', 'j1-e21', 'j1-e22', 'j1-e23'].map((u) => [u, 'j1-m5']),
  ...['j1-e24', 'j1-e25', 'j1-e26'].map((u) => [u, 'j1-m6']),
  ...['j1-e27', 'j1-e28'].map((u) => [u, 'j1-m7']),
  ['j1-e29', 'j1-m8'],
  ['j1-e30', 'j1-m9'],
]);
export const UNIT_STATES = ['gesperrt', 'kurz', 'offen', 'aktiv', 'fertig'];

export const EMOTIONS = ['freude', 'wut', 'angst', 'trauer', 'ekel', 'ueberraschung'];
export const TANKS = ['koerper', 'sicherheit', 'zugehoerigkeit', 'anerkennung', 'selbstbestimmung', 'spass'];
export const STREIT_STILE = ['hai', 'schildkroete', 'teddy', 'fuchs', 'eule'];
export const AMPEL_ZONEN = ['gruen', 'gelb', 'rot'];
export const MODES = ['entspannt', 'abenteuer', 'profi'];
export const ABILITIES = ['blick', 'teamgeist', 'schwimmen', 'klettern', 'segel', 'tauchen', 'ruhe', 'mut'];
export const UPGRADES = [
  'blick.faeden', 'blick.tanks', 'blick.koerper', 'blick.doppel', 'blick.grenzen', 'blick.streittiere', 'blick.masken',
  'segel.kombi',
  'ruhe.puls', 'ruhe.koerper', 'ruhe.sinne', 'ruhe.kopf', 'ruhe.ampel', 'ruhe.rucksack',
  'mut.zeichen', 'mut.klarklang', 'mut.stopp', 'mut.nein', 'mut.leiter',
  'teamgeist.ruf', 'teamgeist.hilfe', 'teamgeist.zweitesNein', 'teamgeist.zuschauer',
];
export const KOFFER_FAECHER = ['koerper', 'sinne', 'kopf', 'menschen', 'aktivitaeten'];
export const GADGET_USES = ['werfen', 'halten', 'tippen', 'gehen', 'sprint', 'jukebox', 'passiv', 'notfall'];

// Zonen (Schleier-Slots) und Regionen (Regionen = Zonen + Flecken mit eigenem Modul)
export const VEIL_ZONES = ['hafen', 'strand', 'dschungel', 'klippen', 'moor', 'markt', 'vulkan', 'leuchtturm'];
export const REGION_IDS = [...VEIL_ZONES, 'glimmer', 'quellen'];
export const SEASONS = ['spaetsommer', 'herbst', 'winter', 'tauwetter', 'fruehling', 'sommer', 'sommernacht'];

export const QUEST_TEMPLATES = ['wegTor', 'tragen', 'szene', 'ermitteln', 'treppe', 'befreunden', 'lotsen', 'boss', 'bauen', 'pruefung', 'nachtwache', 'erinnerung'];
export const BEFREUNDEN_RULES = ['nicht-rennen', 'linie-achten', 'still-sitzen', 'fangen', 'frisch-fuettern', 'stillstehen-umsehen'];
export const BOSS_WINS = ['hilfe-holen', 'zuschauer', 'lauschen', 'fakten'];
export const ERMITTELN_BOARDS = ['gericht', 'chronik', 'repost'];
export const LOTSEN_MODES = ['befehle', 'folgen'];

export const MINIGAME_TEMPLATES = ['rennen', 'rhythmus', 'satzbau', 'duell', 'verteidigung', 'lotsen', 'bauen', 'wuerfel'];
export const SATZBAU_RULESETS = ['klarklang', 'schmiede', 'kompliment', 'zusammenfassung', 'kommentar', 'nein-vorschlag'];
export const MEDALS = ['bronze', 'silber', 'gold', 'stern'];

export const GATE_TYPES = ['dornenwand', 'tauchring', 'klangtor', 'gezeitentuer', 'runentor', 'spalt', 'aufwindfaecher', 'fluesterstein', 'windschatten', 'kaeltefeld', 'heizring', 'orbfeld', 'bohle'];
export const CLIMB_KINDS = ['fels', 'liane', 'wurzel', 'turm', 'mangrove'];
export const ROOM_KITS = ['hoehle', 'tempel', 'turmetage', 'kugel', 'werkstatt', 'lichtkammer', 'unterwasser', 'baumhaus'];
export const ROOM_LIGHTS = ['biolumineszenz', 'laternen', 'tageslicht', 'glut', 'neon', 'daemmerung', 'dunkel', 'kerzen', 'sternenlicht'];

export const COSMETIC_SLOTS = ['kopf', 'oberteil', 'unterteil', 'schuhe', 'muster', 'farbset', 'segel', 'spur', 'glimm', 'maske', 'emote', 'moebel', 'jacke'];
export const COLLECTIBLE_TYPES = ['lichtsplitter', 'muschel', 'aussicht', 'knobel'];
export const CAMERA_MODES = ['follow', 'glide', 'climb', 'talk', 'photo'];
export const TELL_AMP_KEYS = MODES;

export const TEXT_LIMITS = { say: 12, glimm: 6, label: 5, tile: 6, caption: 12, back: 20, echteWelt: 14, intro: 12, name: 6 };
export const MAX_BUBBLES_BEFORE_CHOICE = 2;

// Verbotene Übungswörter (Gesetz 4: keine Übung aus der Stunde im Spiel). Vergleich in Kleinschrift, auch in Wortteilen.
export const FORBIDDEN_WORDS = [
  'einatmen', 'ausatmen', 'atemübung', 'atemuebung', 'atemübungen', 'bodyscan', 'body-scan', 'body scan',
  '5-4-3-2-1', '5 4 3 2 1', '54321', 'gedankenschiffchen', 'traumreise', '4-7-8', '4 7 8',
];
// Felder, die nur die Lehrkraft sieht (Lehrerheft): nicht auf Übungswörter geprüft
export const TEACHER_FIELDS = ['debrief', 'kursziele'];

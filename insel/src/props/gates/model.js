// Tore – reine Logik (WP35, DESIGN §11/§12), ohne Browser: Tor-Typen mit Standardbedingung, Symbol der nötigen Fähigkeit,
// Auswertung der Bedingung (Cond-DSL aus quests/dsl.js) und Zonen-Wirkung (Windschatten = Senke, Hitze/Orbs = Quelle).
//   GATE_META[type] → { label, icon, color, needs, blocks, zone, source?, shelter? }
//   symbolFor(cond) → { icon, color, label, kind, id }   (erste Fähigkeit/Stufe/Weg/Gadget/Feder/Einheit in der Bedingung)
//   needsFor(def) → Cond|null · isOpen(def, { evalCond, forced }) → boolean · gateSymbol(def) → Symbol
export const ABILITY_SYMBOL = {
  blick: { icon: 'blick', color: '#7ff0ff', label: 'Blick' },
  teamgeist: { icon: 'team', color: '#ffd166', label: 'Teamgeist' },
  ruhe: { icon: 'ruhe', color: '#9fe8b0', label: 'Ruhe' },
  mut: { icon: 'mut', color: '#ff8c8c', label: 'Mut' },
  segel: { icon: 'segel', color: '#ff5d8f', label: 'Gefühlssegel' },
  klettern: { icon: 'klettern', color: '#8fd18b', label: 'Klettern' },
  schwimmen: { icon: 'schwimmen', color: '#5ad8ff', label: 'Schwimmen' },
  tauchen: { icon: 'tropfen', color: '#3d7bff', label: 'Tauchen' },
};
export const UPGRADE_LABEL = {
  'blick.faeden': 'Fäden', 'blick.tanks': 'Tank-Blick', 'blick.koerper': 'Körper-Blick', 'blick.doppel': 'Doppel-Aura', 'blick.grenzen': 'Grenz-Blick', 'blick.streittiere': 'Streit-Tiere', 'blick.masken': 'Masken-Blick',
  'segel.kombi': 'Segel-Kombi', 'ruhe.puls': 'Puls', 'ruhe.koerper': 'Körper-Gadgets', 'ruhe.sinne': 'Sinnes-Gadgets', 'ruhe.kopf': 'Kopf-Gadgets', 'ruhe.ampel': 'Ampelplan', 'ruhe.rucksack': 'Rucksack',
  'mut.zeichen': 'Zeichen', 'mut.klarklang': 'Klarklang', 'mut.stopp': 'Stopp-Schild', 'mut.nein': 'Nein', 'mut.leiter': 'Zivilcourage', 'teamgeist.ruf': 'Crew-Ruf', 'teamgeist.hilfe': 'Hilfe holen', 'teamgeist.zweitesNein': 'Zweites Nein', 'teamgeist.zuschauer': 'Zuschauer-Wende',
};
export const FEATHER_SYMBOL = { freude: { icon: 'sonne', color: '#ffd23f', label: 'Freude-Feder' }, wut: { icon: 'flamme', color: '#ff4d4d', label: 'Wut-Feder' }, angst: { icon: 'zickzack', color: '#9b6bff', label: 'Angst-Feder' }, trauer: { icon: 'tropfen', color: '#4d8cff', label: 'Trauer-Feder' }, ekel: { icon: 'wirbel', color: '#5ad24f', label: 'Ekel-Feder' }, ueberraschung: { icon: 'stern', color: '#2de2c9', label: 'Überraschungs-Feder' } };
export const WEG_SYMBOL = {
  spalt: { icon: 'muschel', color: '#39d0c8', label: 'Jolies Spalten' }, aufwindfaecher: { icon: 'windrad', color: '#8fa3ff', label: 'Lucs Aufwind-Fächer' }, surfbrett: { icon: 'surfbrett', color: '#ff8c42', label: 'Tiagos Surfbrett' },
  bluetenbruecken: { icon: 'trommel', color: '#ff4f8b', label: 'Maëlles Blütenbrücken' }, moos: { icon: 'stein', color: '#6fae5a', label: 'Pits Moos-Abkürzung' }, farbmarken: { icon: 'spraydose', color: '#b06bff', label: 'Noors Farbmarken' },
  gartenpforte: { icon: 'giesskanne', color: '#6fae5a', label: 'Lucindas Gartenpforte' }, lavatunnel: { icon: 'flamme', color: '#ff6b3d', label: 'Mikas Lavatunnel' }, lichtschienen: { icon: 'stern', color: '#ff8ccf', label: 'Yaras Lichtschienen' },
  netzreise: { icon: 'chip', color: '#5ad8ff', label: 'Kims Netz-Schnellreise' }, schleichpfade: { icon: 'kompass', color: '#ffd166', label: 'Senaits Schleichpfade' }, werkstatt: { icon: 'anker', color: '#4d8cff', label: 'Ildas Werkstatt' }, daecher: { icon: 'kamera', color: '#ffd23f', label: 'Tuns Dächer' },
};
export const GADGET_SYMBOL = { kaeltekristall: { icon: 'kristall', color: '#bfe8ff', label: 'Kältekristall' }, klangmuschel: { icon: 'muschel', color: '#2de2c9', label: 'Klangmuschel' }, zaehllaterne: { icon: 'laterne', color: '#ffe9a8', label: 'Zähl-Laterne' }, abcrune: { icon: 'rune', color: '#c9bff0', label: 'ABC-Rune' }, ankerstein: { icon: 'anker', color: '#8fa3ff', label: 'Anker-Stein' } };

export const GATE_TYPES = ['dornenwand', 'tauchring', 'klangtor', 'gezeitentuer', 'runentor', 'spalt', 'aufwindfaecher', 'fluesterstein', 'windschatten', 'kaeltefeld', 'heizring', 'orbfeld', 'bohle'];
export const GATE_META = {
  dornenwand: { label: 'Dornenwand', needs: { feather: 'wut' }, blocks: true, zone: false, height: 4 },
  tauchring: { label: 'Tauchring', needs: { ability: 'tauchen' }, blocks: false, zone: false, height: 1.2 },
  klangtor: { label: 'Klangtor', needs: { any: [{ upgrade: 'mut.klarklang' }, { gadget: 'klangmuschel' }] }, blocks: true, zone: false, height: 4.6 },
  gezeitentuer: { label: 'Gezeitentür', needs: { ability: 'schwimmen' }, blocks: true, zone: false, height: 4 },
  runentor: { label: 'Runentor', needs: { upgrade: 'teamgeist.ruf' }, blocks: true, zone: false, height: 4.4 },
  spalt: { label: 'Spalt', needs: { weg: 'spalt' }, blocks: true, zone: false, height: 3.6 },
  aufwindfaecher: { label: 'Aufwind-Fächer', needs: { weg: 'aufwindfaecher' }, blocks: false, zone: false, height: 2.6 },
  fluesterstein: { label: 'Flüsterstein', needs: { unit: 'j1-e16' }, blocks: false, zone: true, source: { id: 'fluesterstein', rate: 2.5, cap: 60 }, height: 1.8 },
  windschatten: { label: 'Windschatten', needs: null, blocks: false, zone: true, shelter: true, height: 2.4 },
  kaeltefeld: { label: 'Sturmfeld', needs: { gadget: 'kaeltekristall' }, blocks: true, zone: true, source: { id: 'sturmfeld', rate: 4, cap: 80 }, height: 3 },
  heizring: { label: 'Hitze-Ring', needs: { upgrade: 'ruhe.ampel' }, blocks: true, zone: true, source: { id: 'vulkanhitze', rate: 4, cap: 85 }, height: 0.6 },
  orbfeld: { label: 'Orbfeld', needs: { upgrade: 'mut.stopp' }, blocks: true, zone: true, source: { id: 'glimmerkugeln', rate: 2, cap: 70 }, height: 3.2 },
  bohle: { label: 'Bohlensteg', needs: { unit: 'j1-e16' }, blocks: true, zone: false, height: 1.2 },
};
export const NONE_SYMBOL = { icon: 'offen', color: '#9fe8b0', label: 'frei', kind: 'frei', id: null };

// Erste Anforderung in einer Bedingung finden (all/any/not werden durchsucht)
export function symbolFor(cond) {
  if (!cond || typeof cond !== 'object') return NONE_SYMBOL;
  if (Array.isArray(cond)) { for (const c of cond) { const s = symbolFor(c); if (s.kind !== 'frei') return s; } return NONE_SYMBOL; }
  const k = Object.keys(cond)[0];
  const v = cond[k];
  switch (k) {
    case 'ability': return { ...(ABILITY_SYMBOL[v] || { icon: 'stern', color: '#ffd166', label: v }), kind: 'ability', id: v };
    case 'upgrade': { const base = String(v).split('.')[0]; const a = ABILITY_SYMBOL[base] || { icon: 'stern', color: '#ffd166' }; return { icon: a.icon, color: a.color, label: UPGRADE_LABEL[v] || v, kind: 'upgrade', id: v }; }
    case 'feather': return { ...(FEATHER_SYMBOL[v] || { icon: 'segel', color: '#ff5d8f', label: v }), kind: 'feather', id: v };
    case 'weg': return { ...(WEG_SYMBOL[v] || { icon: 'karte', color: '#ffd166', label: v }), kind: 'weg', id: v };
    case 'gadget': return { ...(GADGET_SYMBOL[v] || { icon: 'koffer', color: '#9fe8b0', label: v }), kind: 'gadget', id: v };
    case 'item': return { icon: 'koffer', color: '#ffd166', label: v, kind: 'item', id: v };
    case 'unit': case 'unitDone': return { icon: 'schluessel', color: '#ffd166', label: 'Code ' + String(v).replace('j1-', '').toUpperCase(), kind: 'unit', id: v };
    case 'flag': return { icon: 'schloss', color: '#c9bff0', label: 'Später', kind: 'flag', id: Array.isArray(v) ? v[0] : v };
    case 'bond': return { icon: 'herz', color: '#ff8ccf', label: 'Bindung', kind: 'bond', id: v[0] };
    case 'all': case 'any': return symbolFor(v);
    case 'not': return symbolFor(v);
    default: return NONE_SYMBOL;
  }
}
export function needsFor(def) {
  if (!def) return null;
  if (def.needs !== undefined) return def.needs;
  const m = GATE_META[def.type];
  return m ? m.needs : null;
}
export function gateSymbol(def) { return symbolFor(needsFor(def)); }
export function isOpen(def, { evalCond = () => false, forced = null } = {}) {
  if (forced === true) return true;
  if (forced === false) return false;
  const needs = needsFor(def);
  if (needs === null || needs === undefined) return true;
  return !!evalCond(needs);
}

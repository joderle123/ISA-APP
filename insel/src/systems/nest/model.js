// Nest (BAUPLAN §2.1 A5 + C2/C4) – reine Logik ohne Browser: Gläser je Figur (wie wichtig, wie voll), größte Lücke,
// Bauplätze im Bootshaus, Blitz-Motor mit Riss. REGEL: Nest-Werte ändern sich NUR durch Ereignisse (Bauen, Taten,
// Quest-Effekte), NIE durch Zeit. Es gibt hier absichtlich keine Funktion, die Uhrzeit, Tag oder Sekunden kennt.
//   Bedürfnisse: NEEDS · needById(id) · BED (content/beduerfnisse.js, die einzige Stelle für Namen)
//   Gläser:      luecke(wichtig, voll) · glassesOf(npcDef, nest) → [{ id, name, icon, color, wichtig, voll, echt, luecke, riss, gross }]
//                groessteLuecke(glasses) → id | null · setVoll(nest, npc, need, v, base) · addVoll(nest, npc, need, d, base)
//   Bauplätze:   SLOTS · slotState(nest, id, offen) → 'zu' | 'offen' | 'gebaut' · buildSlot(nest, id, offen) → { ok, nest, reason }
//                hangBild(nest, npc) (Fotowand) · setRoute(nest, id|null) (Jolies Karte)
//   Blitz-Motor: blitzmotor(nest, npcDef, { npc, need }) → { ok, nest } (Wunsch: Glas sofort voll, bekommt einen Riss)
//                startSession(nest) → { nest, ausgelaufen } (beim LADEN einer Sitzung: Riss läuft aus, Wunsch ist weg)
//   Zustand:     emptyNest() = { sitzung, glaeser:{npc:{need:0..1}}, gebaut:[], bilder:[], riss, route, deko:[] }
import BED from '../../content/beduerfnisse.js';

export { BED };
export const NEEDS = BED.liste.map((b) => b.id);
export const needById = (id) => BED.liste.find((b) => b.id === id) || null;
export const clamp01 = (v) => Math.max(0, Math.min(1, Number(v) || 0));
const round = (v) => Math.round(clamp01(v) * 1000) / 1000;
const clone = (o) => JSON.parse(JSON.stringify(o));

// Leerer Nest-Zustand (Spielstand-Feld state.nest)
export function emptyNest() {
  return { sitzung: 0, glaeser: {}, gebaut: [], bilder: [], riss: null, route: null, deko: [] };
}
export function normNest(n) {
  const e = emptyNest();
  if (!n || typeof n !== 'object') return e;
  return { ...e, ...clone(n), glaeser: { ...(n.glaeser || {}) }, gebaut: [...(n.gebaut || [])], bilder: [...(n.bilder || [])], deko: [...(n.deko || [])] };
}

// ---- Gläser ----
// Lücke = wichtig und leer (Rückseite des Aufnähers: „Wichtig und leer = größte Lücke.“)
export const luecke = (wichtig, voll) => Math.round(clamp01(wichtig) * (1 - clamp01(voll)) * 1000) / 1000;
// Echter Füllstand: Spielstand (nest.glaeser) vor Startwert der Figur (npcDef.glaeser.voll)
export function realVoll(npcDef, nest, need) {
  const npc = npcDef && npcDef.id;
  const own = nest && nest.glaeser && nest.glaeser[npc];
  if (own && typeof own[need] === 'number') return clamp01(own[need]);
  const g = npcDef && npcDef.glaeser;
  return clamp01(g && g.voll ? g.voll[need] : 0.5);
}
export function glassesOf(npcDef, nest = null) {
  const g = (npcDef && npcDef.glaeser) || {};
  const n = nest || emptyNest();
  const r = n.riss && n.riss.phase === 'leckt' && n.riss.npc === (npcDef && npcDef.id) ? n.riss : null;
  const list = BED.liste.map((b) => {
    const wichtig = clamp01(g.wichtig ? g.wichtig[b.id] : 0.5);
    const echt = realVoll(npcDef, n, b.id);
    const riss = !!(r && r.need === b.id);
    const voll = riss ? clamp01(echt + (r.schub || 0)) : echt;
    return { id: b.id, name: b.name, kurz: b.kurz, icon: b.icon, color: b.color, wichtig, voll, echt, luecke: luecke(wichtig, voll), riss, gross: false };
  });
  const big = groessteLuecke(list);
  for (const x of list) x.gross = x.id === big;
  return list;
}
// Größte Lücke: höchstes wichtig × (1 − voll); bei Gleichstand gilt die Reihenfolge des Blatts; unter 0,05 keine
export function groessteLuecke(glasses) {
  let best = null;
  for (const x of glasses || []) if (x && (!best || x.luecke > best.luecke + 1e-9)) best = x;
  return best && best.luecke >= 0.05 ? best.id : null;
}
export function setVoll(nest, npc, need, v, base = null) {
  if (!NEEDS.includes(need) || !npc) return { ok: false, nest };
  const n = normNest(nest);
  const prev = base ? realVoll(base, n, need) : clamp01(((n.glaeser[npc] || {})[need]) ?? 0.5);
  n.glaeser[npc] = { ...(n.glaeser[npc] || {}), [need]: round(v) };
  return { ok: true, nest: n, prev, voll: n.glaeser[npc][need] };
}
export function addVoll(nest, npc, need, delta, base = null) {
  const cur = base ? realVoll(base, normNest(nest), need) : clamp01(((normNest(nest).glaeser[npc] || {})[need]) ?? 0.5);
  return setVoll(nest, npc, need, cur + (Number(delta) || 0), base);
}

// Folge in der Welt (Blick zuerst): ab dieser Lücke zeigt sich das leere Glas an etwas, das nicht klappt (Winde klemmt …)
export const FOLGE_MIN = 0.35;
export function folgeAktiv(glasses) { return (glasses || []).some((g) => g.luecke >= FOLGE_MIN); }

// ---- Bauplätze im Nest (die Mission öffnet sie, Bauen schließt sie ab) ----
// at: lokale Raum-Koordinaten (systems/nest/plugin.js NEST_ROOM), kosten optional (Material aus dem Bergen)
export const SLOTS = [
  { id: 'fotowand', name: 'Fotowand', icon: 'bild', label: 'Bilder der Crew', kosten: {} },
  { id: 'dachboden', name: 'Dachboden-Ecke', icon: 'haengematte', label: 'Eine eigene Ecke', kosten: {} },
];
export const slotById = (id) => SLOTS.find((s) => s.id === id) || null;
export function slotState(nest, id, offen = false) {
  const n = normNest(nest);
  if (n.gebaut.includes(id)) return 'gebaut';
  return offen ? 'offen' : 'zu';
}
export function buildSlot(nest, id, offen = false) {
  if (!slotById(id)) return { ok: false, nest, reason: 'unbekannt' };
  const st = slotState(nest, id, offen);
  if (st === 'gebaut') return { ok: false, nest, reason: 'gebaut' };
  if (st !== 'offen') return { ok: false, nest, reason: 'zu' };
  const n = normNest(nest);
  n.gebaut.push(id);
  return { ok: true, nest: n };
}
export function hangBild(nest, npc) {
  const n = normNest(nest);
  if (!n.gebaut.includes('fotowand')) return { ok: false, nest, reason: 'keine-fotowand' };
  if (!npc || n.bilder.includes(npc)) return { ok: false, nest, reason: 'schon' };
  n.bilder.push(npc);
  return { ok: true, nest: n };
}
export function setRoute(nest, id) { const n = normNest(nest); n.route = id || null; return { ok: true, nest: n }; }

// ---- Blitz-Motor (Wunsch statt Bedürfnis): füllt das Glas sofort ganz, bekommt einen Riss und läuft bis zur
// nächsten Sitzung aus. Der echte Füllstand bleibt darunter unverändert; der Schub hängt nur am Riss.
export const BLITZ = { npc: 'tun', need: 'anerkennung' };
export function blitzmotor(nest, npcDef, { npc = BLITZ.npc, need = BLITZ.need } = {}) {
  const n = normNest(nest);
  if (n.riss && n.riss.phase === 'leckt') return { ok: false, nest, reason: 'leckt-schon' };
  const echt = realVoll(npcDef && npcDef.id === npc ? npcDef : { id: npc, glaeser: {} }, n, need);
  n.riss = { npc, need, schub: round(1 - echt), sitzung: n.sitzung, phase: 'leckt' };
  if (!n.deko.includes('blitzmotor')) n.deko.push('blitzmotor');
  return { ok: true, nest: n };
}
// Neue Sitzung (Spielstand geladen): Zähler +1; ein leckender Riss aus einer früheren Sitzung ist jetzt ausgelaufen
export function startSession(nest) {
  const n = normNest(nest);
  n.sitzung = (Number(n.sitzung) || 0) + 1;
  let ausgelaufen = null;
  if (n.riss && n.riss.phase === 'leckt' && n.riss.sitzung < n.sitzung) {
    n.riss = { ...n.riss, phase: 'aus', schub: 0 };
    ausgelaufen = { npc: n.riss.npc, need: n.riss.need };
  }
  return { nest: n, ausgelaufen };
}

// Nachtwache-Varianten (WP42, DESIGN §9): „Wer braucht heute jemanden?“ – nie „Wer ist schuld?“.
// Reine Logik: aus NpcDef und leerstem Tank entsteht eine NachtwacheDef (CONTENT-SCHEMA), wenn die Inhalte keine
// eigene liefern. Hilfen: dazusetzen, etwas bringen, zuhören, Laterne, Abstand und eine erwachsene Person holen, spielen.
// Jede Hilfe wird belohnt (fit → mehr), keine ist „falsch“.
import { TANKS } from '../../content/schema/consts.js';

export const HELPS = [
  { id: 'sitzen', label: 'Hinsetzen', icon: 'herz', fits: 'zugehoerigkeit', emote: 'sitzenNeben', seconds: 8 },
  { id: 'decke', label: 'Decke bringen', icon: 'haengematte', fits: 'koerper', seconds: 3 },
  { id: 'zuhoeren', label: 'Zuhören', icon: 'ohr', fits: 'anerkennung', seconds: 6 },
  { id: 'laterne', label: 'Laterne anzünden', icon: 'laterne', fits: 'sicherheit', seconds: 3 },
  { id: 'abstand', label: 'Abstand. Erwachsene holen.', icon: 'hilfe', fits: 'selbstbestimmung', seconds: 4, adult: true },
  { id: 'spiel', label: 'Zusammen spielen', icon: 'sonne', fits: 'spass', seconds: 6 },
];
export const NEED_INNER = { koerper: ['trauer', 6], sicherheit: ['angst', 7], zugehoerigkeit: ['trauer', 7], anerkennung: ['trauer', 6], selbstbestimmung: ['wut', 6], spass: ['trauer', 5] };
export const LINES = {
  koerper: { fit: 'Warm. Danke. Das hat gefehlt.', other: 'Nett von dir. Danke.' },
  sicherheit: { fit: 'Jetzt ist es hell. Danke.', other: 'Okay. Danke, dass du da warst.' },
  zugehoerigkeit: { fit: 'Danke, dass du da bist.', other: 'Nett von dir.' },
  anerkennung: { fit: 'Du hörst zu. Das ist selten.', other: 'Danke. Ehrlich.' },
  selbstbestimmung: { fit: 'Danke, dass du mich lässt.', other: 'Okay. Danke trotzdem.' },
  spass: { fit: 'Ich hab gelacht. Endlich.', other: 'Danke. Morgen wieder?' },
};
export const GLIMM_CLUE = (name) => `${name} ist weg. Komisch.`;

// Aus einer Figur und ihrem leersten Tank eine Nachtwache bauen
export function generateNachtwache(def, { need, day = 1, whereSite = null } = {}) {
  const n = TANKS.includes(need) ? need : 'zugehoerigkeit';
  const outerBase = def.emotion && def.emotion.base && def.emotion.base.primary ? def.emotion.base.primary : ['freude', 3];
  const outer = [outerBase[0] === 'wut' || outerBase[0] === 'angst' ? 'freude' : outerBase[0], Math.min(3, outerBase[1] || 3)];
  const inner = NEED_INNER[n];
  const fit = HELPS.find((h) => h.fits === n);
  // vier Hilfen: die passende und drei andere (rotierend nach Tag), Abstand/Erwachsene ist immer dabei
  const others = HELPS.filter((h) => h.id !== fit.id && h.id !== 'abstand');
  const rot = ((day + n.length) % others.length);
  const picked = [fit, others[rot], others[(rot + 1) % others.length], HELPS.find((h) => h.id === 'abstand')];
  const help = picked.sort((a, b) => ((a.id.length * 7 + day) % 5) - ((b.id.length * 7 + day) % 5)).map((h) => ({ id: h.id, label: h.label, fits: h.fits, emote: h.emote, seconds: h.seconds, icon: h.icon, adult: !!h.adult }));
  return {
    id: `nw-${def.id}-${n}`, npc: def.id, from: 'j1-e05', where: whereSite ? { site: whereSite } : null, generated: true,
    clue: { routineBreak: true, glimm: null, tracks: true },
    outer, inner, need: n, help,
    reward: { fit: [{ bond: [def.id, 1] }, { lichtsplitter: 2 }], other: [{ lichtsplitter: 1 }] },
    line: LINES[n],
  };
}
// Alle Varianten einer Figurenliste (Figuren × Tanks)
export function variantCount(defs) { return defs.filter((d) => !d.ambient && !d.noSpawn).length * TANKS.length; }

// Kandidatin oder Kandidat für heute Nacht: deterministisch je Tag; nur Figuren in freien Regionen, nicht zweimal in Folge
//   pickTonight({ candidates:[{ id, need, zoneFree, unlocked }], day, lastNpc }) → id | null
export function pickTonight({ candidates = [], day = 1, lastNpc = null } = {}) {
  const ok = candidates.filter((c) => c.zoneFree && c.unlocked !== false);
  if (!ok.length) return null;
  const pool = ok.length > 1 ? ok.filter((c) => c.id !== lastNpc) : ok;
  // Reihenfolge: leerster Tank zuerst, Gleichstand rotiert nach Tag
  const sorted = pool.slice().sort((a, b) => (a.needValue || 0) - (b.needValue || 0) || a.id.localeCompare(b.id));
  const top = sorted.filter((c) => (c.needValue || 0) <= (sorted[0].needValue || 0) + 10);
  return top[day % top.length].id;
}
// Nachtfenster (Inselzeit)
export const isNightHour = (h) => h >= 20.4 || h < 5.2;

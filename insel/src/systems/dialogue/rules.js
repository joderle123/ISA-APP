// Dialog-Regeln (WP32, DESIGN §6): reine Funktionen ohne Browser.
//   pulsZone(p) → gruen|gelb|rot            maxChoices(p) → 4 | 3 | 2   (sichtbare Wahlen je Puls)
//   DECKEL_AB = 70                          isDeckel(hitze, choice) → prallt diese Wahl ab? (tone ≠ 'handlung')
//   visibleChoices(choices, { puls, hitze, evalCond }) → Kacheln [{ index, choice, label, icon, tone, deckel, sign }]
//     requires-Bedingungen filtern, dann auf maxChoices(puls) kürzen (Reihenfolge der Inhalte bleibt).
//     Rückzug und Hilfe holen sind System-Wahlen der Kachel-Leiste und werden hier nie mitgezählt (Gesetz 8).
//   HILFE_PULS = -50 (Hilfe holen senkt den Puls), HILFE_HITZE = -30, DECKEL_HITZE = +5 (Abprallen heizt leicht)
export const DECKEL_AB = 70;
export const HILFE_PULS = -50;
export const HILFE_HITZE = -30;
export const DECKEL_HITZE = 5;
export const ANIM_EMOTION = { angry: ['wut', 8], sad: ['trauer', 7], happy: ['freude', 6], scared: ['angst', 7], disgusted: ['ekel', 6], surprised: ['ueberraschung', 6], calm: null, think: null };

export const pulsZone = (p) => (p < 30 ? 'gruen' : p < 70 ? 'gelb' : 'rot');
export const maxChoices = (p) => { const z = pulsZone(Number(p) || 0); return z === 'gruen' ? 4 : z === 'gelb' ? 3 : 2; };
export const textOf = (t) => (t && typeof t === 'object' ? t.t : t) || '';

export function isDeckel(hitze, choice) {
  if (!choice || choice.system) return false;
  return Number(hitze) > DECKEL_AB && choice.tone !== 'handlung';
}

export function visibleChoices(choices, { puls = 0, hitze = 0, evalCond = () => true } = {}) {
  const list = Array.isArray(choices) ? choices : [];
  const ok = list.map((c, i) => ({ c, i })).filter(({ c }) => !c.requires || evalCond(c.requires));
  return ok.slice(0, maxChoices(puls)).map(({ c, i }, k) => ({
    index: k, source: i, choice: c,
    id: c.id || 'w' + i,
    label: textOf(c.label) || textOf(c.say),
    tts: c.tts || (c.say && c.say.tts) || (c.label && c.label.tts) || undefined,
    icon: c.icon || (c.sign ? 'hand' : 'sprechblase'),
    tone: c.tone || null,
    sign: c.sign || null,
    deckel: isDeckel(hitze, c),
  }));
}

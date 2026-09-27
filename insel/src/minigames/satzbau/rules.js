// Satz-Bau (WP37), reine Regelsets (Node-testbar): Kacheln in Slots, ein Klang am Ende.
//   evaluate(def, picked) → { complete, clean, thorn, score (0..1), physics, text, per: { slotId: 'ok'|'dorn'|'fehlt'|… }, bonus }
//     picked = { slotId: tile | tile[] } (Slots mit multi:true nehmen mehrere Kacheln)
//   tileTone(def, tile) → 'konsonant' | 'dissonant'   (Ton-Vorschau beim Antippen)
//   RULESETS · SCHMIEDE_RULES · schmiedePhysics(tiles) → 'traegt' | 'glas' | 'spaet' | 'bricht'  (+ waechst)
// Regelsets:
//   klarklang       4 Slots (Gefühl, Kamera, Grund, Wunsch); tile.thorn = Dorn (Dissonanz), tile.ok === false = trägt nicht
//   schmiede        tile.rules { realistisch, aktiv, gegenwart, beeinflussbar, ohneNicht, wachstum } → Brettphysik:
//                   Glas bricht (unrealistisch), Zukunft zu spät (nicht Gegenwart), nicht/passiv/unbeeinflussbar trägt nicht,
//                   „Ich lerne …“ wächst (wachstum) – nur ein Brett, das trägt, ist sauber
//   kompliment      Slot lob: kind 'tat' fliegt, 'aussehen' fällt um, 'leer' trägt nicht; Slot antwort: ok (Danke) oder nicht (Ach, war nix)
//   zusammenfassung tile.kind 'kern' (alle nötig) | 'detail' (kostet Punkte) | 'urteil' (Dorn)
//   kommentar       tile.tone 'freundlich' | 'sachlich' | 'fies' (Dorn) | 'leer'
//   nein-vorschlag  Slot nein: tile.klar; Slot vorschlag: tile.konkret; tile.thorn = Dorn
export const RULESETS = ['klarklang', 'schmiede', 'kompliment', 'zusammenfassung', 'kommentar', 'nein-vorschlag'];
export const SCHMIEDE_RULES = ['realistisch', 'aktiv', 'gegenwart', 'beeinflussbar', 'ohneNicht', 'wachstum'];
export const PHYSICS_TEXT = { traegt: 'Das Brett trägt.', glas: 'Glas. Es bricht.', spaet: 'Zukunft. Zu spät.', bricht: 'Das trägt nicht.', waechst: 'Es wächst.' };

const textOf = (t) => (t && typeof t === 'object' ? t.t : t);
const list = (v) => (v === undefined || v === null ? [] : Array.isArray(v) ? v : [v]);
const clamp01 = (v) => Math.max(0, Math.min(1, v));

// Regel einer Kachel lesen: fehlende Regel = erfüllt (wachstum: fehlend = kein Bonus)
export const ruleOf = (tile, rule) => (tile && tile.rules && tile.rules[rule] !== undefined ? !!tile.rules[rule] : rule !== 'wachstum');

export function schmiedePhysics(tiles) {
  const all = (r) => tiles.every((t) => ruleOf(t, r));
  if (!all('realistisch')) return { physics: 'glas', waechst: false };
  if (!all('gegenwart')) return { physics: 'spaet', waechst: false };
  if (!all('aktiv') || !all('ohneNicht') || !all('beeinflussbar')) return { physics: 'bricht', waechst: false };
  return { physics: 'traegt', waechst: tiles.some((t) => ruleOf(t, 'wachstum')) };
}

export function tileTone(def, tile) {
  if (!tile) return 'konsonant';
  const rs = def && def.ruleset;
  if (tile.thorn || tile.ok === false) return 'dissonant';
  if (rs === 'schmiede') return schmiedePhysics([tile]).physics === 'traegt' ? 'konsonant' : 'dissonant';
  if (rs === 'kompliment') return tile.kind === 'aussehen' || tile.kind === 'leer' ? 'dissonant' : 'konsonant';
  if (rs === 'zusammenfassung') return tile.kind === 'urteil' ? 'dissonant' : 'konsonant';
  if (rs === 'kommentar') return tile.tone === 'fies' ? 'dissonant' : 'konsonant';
  if (rs === 'nein-vorschlag') return tile.klar === false || tile.konkret === false ? 'dissonant' : 'konsonant';
  return 'konsonant';
}

export function evaluate(def, picked = {}) {
  const slots = (def && def.slots) || [];
  const rs = def && def.ruleset;
  const per = {};
  const chosen = [];
  let complete = true;
  for (const s of slots) {
    const v = list(picked[s.id]);
    if (!v.length && !s.optional) { complete = false; per[s.id] = 'fehlt'; }
    for (const t of v) chosen.push({ slot: s, tile: t });
  }
  const R = { complete, clean: false, thorn: false, score: 0, physics: null, text: '', per, bonus: false, sentence: chosen.map((c) => textOf(c.tile.t || c.tile)).join(' ') };
  const mark = (slotId, v) => { if (per[slotId] !== 'fehlt') per[slotId] = v; };
  if (rs === 'schmiede') {
    const tiles = chosen.map((c) => c.tile);
    const { physics, waechst } = complete ? schmiedePhysics(tiles) : { physics: null, waechst: false };
    for (const c of chosen) mark(c.slot.id, schmiedePhysics([c.tile]).physics === 'traegt' ? 'ok' : 'dorn');
    R.physics = physics; R.bonus = waechst;
    R.clean = complete && physics === 'traegt';
    R.thorn = complete && physics !== 'traegt';
    const okRules = SCHMIEDE_RULES.filter((r) => r !== 'wachstum').filter((r) => tiles.every((t) => ruleOf(t, r))).length;
    R.score = complete ? clamp01(okRules / 5 * (R.clean ? 1 : 0.6) + (waechst ? 0.2 : 0)) : 0;
    if (R.clean && waechst) R.score = 1;
    R.text = physics ? (waechst ? PHYSICS_TEXT.traegt + ' ' + PHYSICS_TEXT.waechst : PHYSICS_TEXT[physics]) : 'Etwas fehlt.';
    return R;
  }
  if (rs === 'kompliment') {
    const lob = chosen.filter((c) => c.slot.id === 'lob' || c.slot.kind === 'lob').map((c) => c.tile);
    const antw = chosen.filter((c) => c.slot.id === 'antwort' || c.slot.kind === 'antwort').map((c) => c.tile);
    const tat = lob.length > 0 && lob.every((t) => t.kind === 'tat' || t.ok === true);
    const faellt = lob.some((t) => t.kind === 'aussehen' || t.thorn);
    for (const c of chosen) {
      if (c.slot.id === 'lob' || c.slot.kind === 'lob') mark(c.slot.id, c.tile.kind === 'tat' || c.tile.ok === true ? 'ok' : c.tile.kind === 'aussehen' ? 'dorn' : 'leer');
      else if (c.slot.id === 'antwort' || c.slot.kind === 'antwort') mark(c.slot.id, c.tile.ok === false ? 'sinkt' : 'ok');
      else mark(c.slot.id, c.tile.thorn || c.tile.ok === false ? 'dorn' : 'ok');
    }
    const danke = antw.length ? antw.every((t) => t.ok !== false) : true;
    R.thorn = faellt || chosen.some((c) => c.tile.thorn);
    R.clean = complete && tat && danke && !R.thorn;
    R.score = complete ? clamp01((tat ? 0.6 : lob.some((t) => t.kind === 'leer') ? 0.2 : 0) + (antw.length ? (danke ? 0.4 : 0) : 0.4)) : 0;
    R.physics = !complete ? null : faellt ? 'faellt' : tat ? 'fliegt' : 'sinkt';
    R.text = !complete ? 'Etwas fehlt.' : faellt ? 'Das kippt um.' : !tat ? 'Das trägt nicht.' : !danke ? 'Die Laterne sinkt.' : 'Die Laterne steigt.';
    return R;
  }
  if (rs === 'zusammenfassung') {
    const kernAll = slots.flatMap((s) => s.tiles || []).filter((t) => t.kind === 'kern');
    const tiles = chosen.map((c) => c.tile);
    const kern = tiles.filter((t) => t.kind === 'kern').length;
    const details = tiles.filter((t) => t.kind === 'detail').length;
    const urteil = tiles.some((t) => t.kind === 'urteil' || t.thorn);
    for (const c of chosen) mark(c.slot.id, c.tile.kind === 'urteil' || c.tile.thorn ? 'dorn' : c.tile.kind === 'detail' ? 'leer' : 'ok');
    R.thorn = urteil;
    R.clean = complete && !urteil && kern >= kernAll.length && kernAll.length > 0;
    R.score = complete ? clamp01((kernAll.length ? kern / kernAll.length : 1) - details * 0.15 - (urteil ? 0.5 : 0)) : 0;
    R.text = !complete ? 'Etwas fehlt.' : urteil ? 'Ein Urteil. Das prallt ab.' : kern < kernAll.length ? 'Der Kern fehlt noch.' : details ? 'Stimmt. Etwas lang.' : 'Genau das. Kurz und klar.';
    return R;
  }
  if (rs === 'kommentar') {
    const tiles = chosen.map((c) => c.tile);
    const fies = tiles.some((t) => t.tone === 'fies' || t.thorn);
    const gut = tiles.filter((t) => t.tone === 'freundlich' || t.tone === 'sachlich').length;
    for (const c of chosen) mark(c.slot.id, c.tile.tone === 'fies' || c.tile.thorn ? 'dorn' : c.tile.tone === 'leer' ? 'leer' : 'ok');
    R.thorn = fies;
    R.clean = complete && !fies && gut > 0;
    R.score = complete ? clamp01(fies ? 0 : gut / Math.max(1, tiles.length)) : 0;
    R.text = !complete ? 'Etwas fehlt.' : fies ? 'Fies. Das bleibt hängen.' : gut ? 'Das kann man so posten.' : 'Sagt nichts. Lampe bleibt aus.';
    return R;
  }
  if (rs === 'nein-vorschlag') {
    const nein = chosen.filter((c) => c.slot.id === 'nein' || c.slot.kind === 'nein').map((c) => c.tile);
    const vor = chosen.filter((c) => c.slot.id === 'vorschlag' || c.slot.kind === 'vorschlag').map((c) => c.tile);
    const klar = nein.length > 0 && nein.every((t) => t.klar !== false && !t.thorn);
    const konkret = vor.length > 0 && vor.every((t) => t.konkret !== false && !t.thorn);
    for (const c of chosen) {
      if (c.slot.id === 'nein' || c.slot.kind === 'nein') mark(c.slot.id, c.tile.thorn ? 'dorn' : c.tile.klar === false ? 'leer' : 'ok');
      else if (c.slot.id === 'vorschlag' || c.slot.kind === 'vorschlag') mark(c.slot.id, c.tile.thorn ? 'dorn' : c.tile.konkret === false ? 'leer' : 'ok');
      else mark(c.slot.id, c.tile.thorn || c.tile.ok === false ? 'dorn' : 'ok');
    }
    R.thorn = chosen.some((c) => c.tile.thorn);
    R.clean = complete && klar && konkret && !R.thorn;
    R.score = complete ? clamp01((klar ? 0.5 : 0) + (konkret ? 0.5 : 0) - (R.thorn ? 0.5 : 0)) : 0;
    R.text = !complete ? 'Etwas fehlt.' : R.thorn ? 'Schiefer Ton. Das prallt ab.' : !klar ? 'Ein Vielleicht. Kein Nein.' : !konkret ? 'Nein. Und dann?' : 'Nein, und ein Weg. Das trägt.';
    return R;
  }
  // klarklang (Standard): Dornen = Dissonanz, ok:false trägt nicht
  const thorn = chosen.some((c) => c.tile.thorn);
  const good = chosen.filter((c) => !c.tile.thorn && c.tile.ok !== false).length;
  for (const c of chosen) mark(c.slot.id, c.tile.thorn ? 'dorn' : c.tile.ok === false ? 'leer' : 'ok');
  R.thorn = thorn;
  R.clean = complete && !thorn && good === chosen.length && chosen.length > 0;
  R.score = complete ? clamp01(good / Math.max(1, chosen.length) - (thorn ? 0.3 : 0)) : 0;
  R.text = !complete ? 'Etwas fehlt.' : thorn ? 'Schiefer Ton. Das prallt ab.' : R.clean ? 'Klar. Das trägt.' : 'Fast. Etwas fehlt.';
  return R;
}

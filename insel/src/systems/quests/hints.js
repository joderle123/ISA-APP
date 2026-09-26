// Stille Hinweisleiter (WP31, DESIGN §9): bildet die Hilfestufen ab, ohne sie je anzuzeigen.
//   nach 2 Fehlschlägen: Rückenwind (Puls −20, ein Windschatten-Objekt erscheint, Glimm „Da drüben. Windstille.“)
//   nach 3: Glimm schaut hin (Hinweiszeile des Schritts)
//   nach 5: das Ziel leuchtet (Marker stärker)
//   nach 8: Überspringen wird angeboten („geht später nochmal“)
//   const h = createHintLadder({ onStage }); h.fail(stepId) → { fails, stage|null }; h.reset(stepId); h.stageOf(stepId)
//   HINT_STAGES = [{ at:2, id:'rueckenwind' }, { at:3, id:'glimm' }, { at:5, id:'leuchten' }, { at:8, id:'ueberspringen' }]
// Fehlschläge werden je Schritt gezählt (auch über Sitzungen, wenn der Zähler gespeichert wird).
export const HINT_STAGES = [
  { at: 2, id: 'rueckenwind', puls: -20 },
  { at: 3, id: 'glimm' },
  { at: 5, id: 'leuchten' },
  { at: 8, id: 'ueberspringen' },
];
export const RUECKENWIND_GLIMM = 'Da drüben. Windstille.';

export function createHintLadder({ onStage = null, counts = null } = {}) {
  const fails = counts || {};
  const fired = {};
  const api = {
    fail(stepId, { amount = 1 } = {}) {
      fails[stepId] = (fails[stepId] || 0) + amount;
      const n = fails[stepId];
      let stage = null;
      for (const s of HINT_STAGES) {
        const key = stepId + ':' + s.id;
        if (n >= s.at && !fired[key]) { fired[key] = true; stage = s; if (onStage) onStage(s, { step: stepId, fails: n }); }
      }
      return { fails: n, stage };
    },
    reset(stepId) { delete fails[stepId]; for (const k of Object.keys(fired)) if (k.startsWith(stepId + ':')) delete fired[k]; },
    resetAll() { for (const k of Object.keys(fails)) delete fails[k]; for (const k of Object.keys(fired)) delete fired[k]; },
    failsOf(stepId) { return fails[stepId] || 0; },
    stageOf(stepId) { const n = fails[stepId] || 0; let st = null; for (const s of HINT_STAGES) if (n >= s.at) st = s; return st; },
    get counts() { return { ...fails }; },
    // Zähler aus dem Spielstand übernehmen (gefeuerte Stufen gelten als gesehen)
    load(obj) { for (const [k, v] of Object.entries(obj || {})) { fails[k] = v; for (const s of HINT_STAGES) if (v >= s.at) fired[k + ':' + s.id] = true; } },
  };
  return api;
}

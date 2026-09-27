// Leine halten (Kostprobe B1), reine Logik (Node-testbar): Stille aushalten. Knopf halten = bleiben. Wendet sich die
// Figur ab, gibst du nach (loslassen); rückt sie wieder näher, hältst du. Test-Sätze der Figur sind ein „Zucken“ der
// Leine: weiter halten. Die Falle ist „Was sagen“: Die Figur sagt „Egal.“ und die Welle beginnt von vorn (kostet nur
// Sekunden, kein Abbruch).
//   const plan = buildLeine(params, { grace })   → { waves: [{ i, t0, t1, segs: [{ t0, t1, want, kind, text? }], geste }], end }
//   const L = createLeine(plan, { need, grace }) → { press(t), release(t), tick(t) → [Ereignis], sagen(t) → { text },
//        done(), result(), want(t), seg(t), waveAt(t), tension, strain, held, local(t), results }
//   Ereignisse aus tick: { type: 'welle', i, ok } · { type: 'seg', i, kind, text? } · { type: 'fertig' }
//   params (je Figur und Modus): { waves, pause, ab, abLen, nahLen, testLen, tests:[Satz], gesten:[name], need, grace }
//   Ergebnis: { hits (Anteil überstandener Wellen), score (mittlere Genauigkeit), survived, waves, gesagt, fails }

export const LEAD = 1.4;       // Sekunden bis zur ersten Welle (Hinsetzen)
export const GAP = 1.3;        // Atempause nach jeder Welle (Geste, Kamera rückt näher, Ton)
export const SAGEN_PAUSE = 1.2;   // nach „Egal.“ beginnt die Welle kurz darauf von vorn
export const SEG_NEED = 0.2;   // kürzere bewertete Stücke (nach der Schonzeit) zählen nicht

// Zeitplan aus den Rhythmus-Parametern einer Figur. Keine Zufälle: dieselben Parameter geben denselben Plan.
export function buildLeine(p = {}) {
  const n = Math.max(1, p.waves || 3);
  const pause = p.pause ?? 3;
  const abN = Math.max(0, p.ab ?? 1);
  const abLen = p.abLen ?? 1.6, nahLen = p.nahLen ?? 0.9, testLen = p.testLen ?? 1.4;
  const tests = p.tests || [];
  const gesten = p.gesten || [];
  const waves = [];
  let t = LEAD;
  for (let i = 0; i < n; i++) {
    const segs = [];
    let k = t;
    const push = (kind, len, want, text) => { segs.push({ t0: k, t1: k + len, kind, want, ...(text ? { text } : {}) }); k += len; };
    push('still', pause * 0.5, 'halten');
    if (tests[i]) { push('test', testLen, 'halten', tests[i]); push('still', 0.6, 'halten'); }
    for (let j = 0; j < abN; j++) { push('ab', abLen, 'locker'); push('nah', nahLen, 'halten'); push('still', 0.6, 'halten'); }
    push('still', pause * 0.5, 'halten');
    waves.push({ i, t0: t, t1: k, segs, geste: gesten[i] || null });
    t = k + GAP;
  }
  return { waves, end: t };
}

export function createLeine(plan, { need = 0.65, grace = 0.6 } = {}) {
  const waves = plan.waves;
  let shift = 0;            // Verschiebung durch „Was sagen“ (die Welle beginnt von vorn)
  let held = false;
  let lastT = null;
  let wi = 0;               // aktuelle (noch nicht bewertete) Welle
  let segKey = '';
  let acc = [];             // je Stück der aktuellen Welle: { good, total }
  const results = [];       // je Welle: 'hit' | 'miss'
  const accs = [];          // je Welle: mittlere Genauigkeit
  let gesagt = 0;
  let tension = 0.5;
  let finished = false;

  const local = (t) => t - shift;
  const waveAt = (t) => { const l = local(t); return waves.find((w) => l >= w.t0 && l < w.t1) || null; };
  const segAt = (t) => { const w = waveAt(t); if (!w) return null; const l = local(t); return w.segs.find((s) => l >= s.t0 && l < s.t1) || null; };
  const wantAt = (t) => { const s = segAt(t); return s ? s.want : null; };

  function resetWave() { acc = waves[wi] ? waves[wi].segs.map(() => ({ good: 0, total: 0 })) : []; }
  resetWave();

  // Genauigkeit einer Welle: jedes bewertete Stück muss ≥ need stimmen; Genauigkeit = Mittel der Stücke
  function judgeWave() {
    const parts = acc.filter((a) => a.total >= SEG_NEED).map((a) => a.good / a.total);
    const mean = parts.length ? parts.reduce((x, y) => x + y, 0) / parts.length : 1;
    const ok = parts.every((q) => q >= need);
    return { ok, mean };
  }

  function integrate(t0, t1) {
    // Zeit zwischen t0 und t1 (Spielzeit) in kleinen Schritten bewerten
    const step = 1 / 60;
    for (let t = t0; t < t1 - 1e-9; t += step) {
      const dt = Math.min(step, t1 - t);
      const w = waves[wi];
      if (!w) return;
      const l = local(t + dt * 0.5);
      if (l < w.t0 || l >= w.t1) continue;
      const si = w.segs.findIndex((s) => l >= s.t0 && l < s.t1);
      if (si < 0) continue;
      const s = w.segs[si];
      if (l - s.t0 < grace) continue;                     // Schonzeit nach jedem Wechsel
      acc[si].total += dt;
      if (held === (s.want === 'halten')) acc[si].good += dt;
    }
  }

  // Zeit bis t bewerten (ohne Ereignisse; die holt tick)
  function advance(t) {
    if (finished) return;
    if (lastT === null) lastT = t;
    if (t > lastT) {
      const dtAll = t - lastT;
      integrate(lastT, t);
      // Spannung der Leine (nur fürs Bild und den Ton): straff beim Halten, fast zum Reißen beim Festhalten gegen das Abwenden
      const want = wantAt(t);
      const target = held ? (want === 'locker' ? 1 : 0.62) : (want === 'halten' ? 0.05 : 0.3);
      tension += (target - tension) * Math.min(1, dtAll * 4);
    }
    lastT = t;
  }

  const api = {
    get held() { return held; },
    get tension() { return tension; },
    get strain() { const w = wantAt(lastT ?? 0); return held && w === 'locker'; },
    get results() { return results.slice(); },
    get wave() { return wi; },
    get gesagt() { return gesagt; },
    local, waveAt, want: wantAt, seg: segAt,
    press(t) { advance(t); held = true; },
    release(t) { advance(t); held = false; },
    // Zeit fortschreiben → Ereignisse (neue Stücke, fertige Wellen)
    tick(t) {
      const out = [];
      if (finished) return out;
      advance(t);
      const s = segAt(t);
      const key = s ? wi + ':' + s.t0 : '';
      if (key !== segKey) { segKey = key; if (s) out.push({ type: 'seg', i: wi, kind: s.kind, want: s.want, ...(s.text ? { text: s.text } : {}) }); }
      while (waves[wi] && local(t) >= waves[wi].t1) {
        const j = judgeWave();
        results.push(j.ok ? 'hit' : 'miss');
        accs.push(j.mean);
        out.push({ type: 'welle', i: wi, ok: j.ok, geste: waves[wi].geste });
        wi++;
        resetWave();
      }
      if (!waves[wi] && !finished) { finished = true; out.push({ type: 'fertig' }); }
      return out;
    },
    // Die Falle: „Was sagen“ → „Egal.“, die laufende (oder nächste) Welle beginnt kurz darauf von vorn
    sagen(t) {
      if (finished) return { text: null };
      advance(t);
      gesagt++;
      const w = waves[wi];
      if (w) {
        const target = w.t0 - SAGEN_PAUSE;
        if (local(t) > target) shift += local(t) - target;
        resetWave();
      }
      return { text: 'Egal.' };
    },
    done() { return finished; },
    result() {
      const survived = results.filter((r) => r === 'hit').length;
      const score = accs.length ? accs.reduce((a, b) => a + b, 0) / accs.length : 0;
      return { hits: +(survived / waves.length).toFixed(3), score: +score.toFixed(3), survived, waves: waves.length, gesagt, fails: gesagt, results: results.slice() };
    },
  };
  return api;
}

// Idealer Ablauf für Tests und auto(): halten, außer die Figur wendet sich ab. wrongWaves = Wellen, die bewusst
// falsch gespielt werden (immer festhalten); sagenAt = Welle, in der einmal „Was sagen“ gedrückt wird.
export function simulate(L, plan, { wrongWaves = [], sagenIn = -1, step = 1 / 30 } = {}) {
  let t = 0, said = false;
  const events = [];
  for (let guard = 0; guard < 100000 && !L.done(); guard++) {
    const w = L.waveAt(t);
    const want = L.want(t);
    const wrong = w && wrongWaves.includes(w.i);
    const hold = wrong ? true : want !== 'locker';
    if (hold !== L.held) (hold ? L.press(t) : L.release(t));
    if (!said && w && w.i === sagenIn && L.local(t) > w.t0 + 1) { said = true; events.push(L.sagen(t)); }
    events.push(...L.tick(t));
    t += step;
  }
  return { t, events };
}

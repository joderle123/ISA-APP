// Muschel-Mäxchen (WP39), reine Logik: Würfel-Bluffspiel gegen eine Figur mit Tell.
// Rangfolge: 31 < 32 < … < 65 < 11 < 22 < … < 66 < 21 (Mäxchen). Wer ansagt, muss höher ansagen als zuvor.
// „Zeig!“ deckt auf: Lüge → Ansager verliert eine Muschel, Wahrheit → Zweifler verliert eine. Mäxchen gezeigt → 2 Muscheln.
//   RANKS · rankOf(v) · valueOf(d1, d2) · higher(prev) → nächste Werte · announceOptions(actual, prev) → [{ value, truth }]
//   createMaexchen({ rng, tell:{ bluff, amp }, shells = 3, sharp = 0.5 }) → g
//     g.turn ('du'|'npc') · g.phase ('ansage'|'zweifel'|'ende') · g.roll() (deine Würfel) · g.announce(value)
//     g.npcDecide() → { call:boolean } · g.npcTurn() → { value, truth, tell } · g.believe() · g.call() → { truth, loser }
//     g.shells { du, npc } · g.done · g.winner · g.log
const ORDER = [];
for (let a = 1; a <= 6; a++) for (let b = 1; b < a; b++) ORDER.push(a * 10 + b);   // 21 fehlt noch: 31,32,41,42,43,…,65
const idx21 = ORDER.indexOf(21); if (idx21 >= 0) ORDER.splice(idx21, 1);
for (let a = 1; a <= 6; a++) ORDER.push(a * 11);                                   // Pasch
ORDER.push(21);                                                                     // Mäxchen
export const RANKS = ORDER;
export const MAEXCHEN = 21;
export const rankOf = (v) => RANKS.indexOf(v);
export const valueOf = (d1, d2) => (d1 === d2 ? d1 * 11 : Math.max(d1, d2) * 10 + Math.min(d1, d2));
export const higher = (prev) => (prev === null || prev === undefined ? RANKS.slice() : RANKS.slice(rankOf(prev) + 1));
export const TELL_LABEL = { 'grinst-einseitig': 'Grinst einseitig', 'blick-links-unten': 'Blick links unten', 'schulter-hoch': 'Schulter hoch', 'kratzt-nacken': 'Kratzt sich am Nacken', 'blinzelt': 'Blinzelt schnell', 'blick-weg': 'Schaut weg', 'zupft-aermel': 'Zupft am Ärmel', 'kaut-lippe': 'Kaut auf der Lippe' };

// Ansage-Optionen für die spielende Person: Wahrheit (falls erlaubt), leicht höher, deutlich höher, Mäxchen
export function announceOptions(actual, prev) {
  const legal = higher(prev);
  const out = [];
  if (legal.includes(actual)) out.push({ value: actual, truth: true });
  const start = legal.indexOf(actual) >= 0 ? legal.indexOf(actual) + 1 : 0;
  const pick = (k) => { const v = legal[Math.min(legal.length - 1, k)]; if (v !== undefined && !out.some((o) => o.value === v)) out.push({ value: v, truth: v === actual }); };
  pick(start); pick(start + 2);
  if (!out.some((o) => o.value === MAEXCHEN) && legal.includes(MAEXCHEN)) out.push({ value: MAEXCHEN, truth: actual === MAEXCHEN });
  return out.slice(0, 4);
}

export function createMaexchen({ rng, tell = { bluff: 'blick-weg', amp: 0.6 }, shells = 3, sharp = 0.5 } = {}) {
  const R = rng || { int: (a, b) => a + Math.floor(Math.random() * (b - a + 1)), next: () => Math.random(), chance: (p) => Math.random() < p };
  const g = {
    shells: { du: shells, npc: shells }, turn: 'du', phase: 'ansage', prev: null, dice: null, npcDice: null, announced: null, npcBluff: false, log: [], calls: { right: 0, wrong: 0 },
    get done() { return g.shells.du <= 0 || g.shells.npc <= 0; },
    get winner() { return !g.done ? null : g.shells.du > 0 ? 'du' : 'npc'; },
    roll() { g.dice = [R.int(1, 6), R.int(1, 6)]; g.phase = 'ansage'; return g.dice; },
    get actual() { return g.dice ? valueOf(g.dice[0], g.dice[1]) : null; },
    options() { return announceOptions(g.actual, g.prev); },
    // Du sagst an; danach entscheidet die Figur (Glauben oder Zeig!)
    announce(value) {
      if (g.turn !== 'du' || g.phase !== 'ansage') return null;
      g.announced = value; g.prev = value; g.phase = 'zweifel';
      g.log.push({ who: 'du', value, truth: value === g.actual });
      return value;
    },
    npcDecide() {
      // je höher die Ansage, desto misstrauischer; Profi (sharp hoch) liest mehr; bei Mäxchen fast immer Zeig!
      const r = rankOf(g.announced) / (RANKS.length - 1);
      const p = Math.min(0.95, 0.12 + r * r * 0.8 * (0.6 + sharp));
      const call = g.announced === MAEXCHEN ? R.chance(0.85) : R.chance(p);
      return { call };
    },
    resolveCall(challenger) {
      const truthVal = challenger === 'npc' ? g.actual : (g.npcDice ? valueOf(g.npcDice[0], g.npcDice[1]) : null);
      const truth = truthVal !== null && rankOf(truthVal) >= rankOf(g.announced);
      const announcer = challenger === 'npc' ? 'du' : 'npc';
      const loser = truth ? challenger : announcer;
      const cost = truth && g.announced === MAEXCHEN ? 2 : 1;
      g.shells[loser] = Math.max(0, g.shells[loser] - cost);
      if (challenger === 'du') { if (truth) g.calls.wrong++; else g.calls.right++; }
      g.log.push({ who: challenger, call: true, truth, loser, cost });
      g.prev = null; g.announced = null; g.npcDice = null; g.dice = null;
      g.phase = g.done ? 'ende' : 'ansage';
      g.turn = loser;   // wer verliert, fängt neu an
      return { truth, loser, cost, actual: truthVal };
    },
    // Figur glaubt dir und ist selbst dran
    npcTurn() {
      g.turn = 'npc';
      g.npcDice = [R.int(1, 6), R.int(1, 6)];
      const actual = valueOf(g.npcDice[0], g.npcDice[1]);
      const legal = higher(g.prev);
      let value, truth;
      if (legal.includes(actual) && R.chance(0.72)) { value = actual; truth = true; }
      else {
        // Bluff: knapp über der Vorgabe (Anfänger) oder frech hoch (Profi)
        const k = Math.min(legal.length - 1, R.int(0, Math.max(0, Math.round(2 + sharp * 4))));
        value = legal[k]; truth = value === actual;
        if (value === undefined) { value = MAEXCHEN; truth = actual === MAEXCHEN; }
      }
      g.npcBluff = !truth;
      g.announced = value; g.prev = value; g.phase = 'zweifel';
      g.log.push({ who: 'npc', value, truth });
      // Tell: nur beim Bluff, Stärke je Modus (Profi subtil)
      return { value, truth, tell: truth ? null : { bluff: tell.bluff, amp: tell.amp } };
    },
    believe() { if (g.turn !== 'npc' || g.phase !== 'zweifel') return null; g.turn = 'du'; g.phase = 'ansage'; g.log.push({ who: 'du', believe: true }); return true; },
    call() { if (g.turn !== 'npc' || g.phase !== 'zweifel') return null; return g.resolveCall('du'); },
  };
  return g;
}

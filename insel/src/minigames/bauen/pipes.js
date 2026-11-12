// Bauen (WP39), reine Logik: Tank-Leitungen und Kettenreaktion auf einem Raster. Jede Zelle ist ein Rohr-/Dominostück
// mit Öffnungen (Bitmaske N=1 E=2 S=4 W=8), das man durch Antippen dreht. Die Quelle sitzt links, die Tanks rechts.
//   generateBoard({ w, h, tanks, seed }) → { w, h, cells:[mask…], source:{x,y}, tanks:[{x,y,need}], solution:[mask…], par }
//     Ein Spannbaum verbindet Quelle und alle Zellen, Tanks liegen an Blättern; danach werden die Stücke verdreht.
//   rotate(mask) · rotateCell(board, x, y) · flow(board) → { reached:Set('x,y'), tanks:[bool], all }
//   solved(board) · minRotations(board) (Züge bis zur Lösung, für Par)
export const N = 1, E = 2, S = 4, W = 8;
const DIRS = [[0, -1, N, S], [1, 0, E, W], [0, 1, S, N], [-1, 0, W, E]];   // dx, dy, bit, gegenüber
export const rotate = (m) => ((m << 1) & 15) | (m >> 3);
export const rotations = (m) => { const out = [m]; let c = m; for (let i = 0; i < 3; i++) { c = rotate(c); if (!out.includes(c)) out.push(c); } return out; };
const key = (x, y) => x + ',' + y;

// kleiner, seedbarer Zufall (unabhängig vom Spielstand, damit Tafeln je Seed gleich bleiben)
function mulberry(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

export function generateBoard({ w = 5, h = 4, tanks = 3, seed = 1, needs = ['koerper', 'sicherheit', 'zugehoerigkeit', 'anerkennung', 'selbstbestimmung', 'spass'] } = {}) {
  const rnd = mulberry(seed * 7919 + w * 131 + h * 17 + tanks);
  const cells = new Array(w * h).fill(0);
  const source = { x: 0, y: Math.floor(h / 2) };
  // Spannbaum per zufälliger Tiefensuche von der Quelle aus
  const seen = new Set([key(source.x, source.y)]);
  const stack = [source];
  const order = [];
  while (stack.length) {
    const c = stack[stack.length - 1];
    const opts = DIRS.map(([dx, dy, bit, opp]) => ({ x: c.x + dx, y: c.y + dy, bit, opp })).filter((n) => n.x >= 0 && n.y >= 0 && n.x < w && n.y < h && !seen.has(key(n.x, n.y)));
    if (!opts.length) { stack.pop(); order.push(c); continue; }
    const n = opts[Math.floor(rnd() * opts.length)];
    cells[c.y * w + c.x] |= n.bit;
    cells[n.y * w + n.x] |= n.opp;
    seen.add(key(n.x, n.y));
    stack.push({ x: n.x, y: n.y });
  }
  // Tanks: Blätter (eine Öffnung), bevorzugt rechts; die Quelle bleibt frei
  const leaves = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const m = cells[y * w + x]; if (m && (m & (m - 1)) === 0 && !(x === source.x && y === source.y)) leaves.push({ x, y }); }
  leaves.sort((a, b) => b.x - a.x || (rnd() - 0.5));
  const tankList = leaves.slice(0, Math.min(tanks, leaves.length)).map((l, i) => ({ x: l.x, y: l.y, need: needs[i % needs.length] }));
  const solution = cells.slice();
  // Verdrehen: jede Zelle zufällig, aber das Brett darf nicht schon gelöst sein
  let scrambled, guard = 50;
  do {
    scrambled = solution.map((m) => { let c = m; const k = Math.floor(rnd() * 4); for (let i = 0; i < k; i++) c = rotate(c); return c; });
  } while (flow({ w, h, cells: scrambled, source, tanks: tankList }).all && guard-- > 0);
  const board = { w, h, cells: scrambled, source, tanks: tankList, solution, moves: 0 };
  board.par = minRotations(board);
  return board;
}

export function rotateCell(board, x, y) {
  if (x < 0 || y < 0 || x >= board.w || y >= board.h) return board;
  const i = y * board.w + x;
  if (!board.cells[i]) return board;
  board.cells[i] = rotate(board.cells[i]);
  board.moves = (board.moves || 0) + 1;
  return board;
}

// Fluss von der Quelle: verbunden sind Zellen, die sich gegenseitig öffnen
export function flow(board) {
  const { w, h, cells, source } = board;
  const reached = new Set();
  const q = [source];
  reached.add(key(source.x, source.y));
  while (q.length) {
    const c = q.shift();
    const m = cells[c.y * w + c.x];
    for (const [dx, dy, bit, opp] of DIRS) {
      if (!(m & bit)) continue;
      const nx = c.x + dx, ny = c.y + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      if (!(cells[ny * w + nx] & opp)) continue;
      const k = key(nx, ny);
      if (reached.has(k)) continue;
      reached.add(k); q.push({ x: nx, y: ny });
    }
  }
  const tanks = (board.tanks || []).map((t) => reached.has(key(t.x, t.y)));
  return { reached, tanks, all: tanks.length > 0 && tanks.every(Boolean), count: tanks.filter(Boolean).length };
}
export const solved = (board) => flow(board).all;

// Züge bis zur Lösung: je Zelle die kleinste Drehzahl auf ein lösendes Bild (Lösung oder symmetrisch gleiche Maske)
export function minRotations(board) {
  let n = 0;
  for (let i = 0; i < board.cells.length; i++) {
    const cur = board.cells[i], sol = board.solution ? board.solution[i] : cur;
    if (!cur) continue;
    let c = cur, k = 0;
    while (c !== sol && k < 4) { c = rotate(c); k++; }
    n += k === 4 ? 0 : k;
  }
  return n;
}

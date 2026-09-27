// Lotsen (WP38), reine Logik der Grotte: Symbolbefehle an eine Figur mit Stopp-Recht auf einem Raster im Dunkeln.
// Karte als Zeilen: '#' Wand · '.' Boden · '~' Wasser (gefährlich) · 'L' Laterne (unbeleuchtet) · 'S' Start · 'X' Ausgang
// Sichtbar ist, was neben der Figur liegt oder im Radius einer angezündeten Laterne. Die Figur schaut in eine Richtung.
//   createGrotto({ map, lanternRadius = 2 }) → g
//     g.command('vor'|'links'|'rechts'|'warten'|'laterne') → { ok, event, pos }
//       event: 'schritt' | 'gedreht' | 'wand' | 'unsicher' (Stopp-Recht: sie bleibt stehen) | 'draengeln' (Rückschritt)
//              | 'beruhigt' | 'laterne' | 'ziel'
//     g.pos {x,y} · g.dir (0 N,1 E,2 S,3 W) · g.unsure · g.visible(x,y) · g.lit(x,y) · g.done · g.steps · g.draengeln
//     g.optimal (Schrittzahl des kürzesten sicheren Wegs) · g.score → 0..1
//   Unsicher: der nächste Schritt führt neben Wasser, oder er ist unbeleuchtet und dahinter liegt Unbekanntes – sie bleibt stehen.
//   'warten' beruhigt sie (sie geht den nächsten Schritt mit), eine Laterne macht das Feld sicher.
//   Dasselbe Kommando noch einmal, ohne 'warten' oder Licht = Drängeln: sie weicht einen Schritt zurück.
export const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
export const CMDS = ['vor', 'links', 'rechts', 'warten', 'laterne'];

export function createGrotto({ map, lanternRadius = 2 } = {}) {
  const rows = map.map((r) => r.split(''));
  const h = rows.length, w = Math.max(...rows.map((r) => r.length));
  const at = (x, y) => (y < 0 || y >= h || x < 0 || x >= w ? '#' : (rows[y][x] || '#'));
  let start = { x: 1, y: 1 }, exit = null;
  const lanterns = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const c = at(x, y); if (c === 'S') start = { x, y }; if (c === 'X') exit = { x, y }; if (c === 'L') lanterns.push({ x, y, lit: false }); }
  const walkable = (x, y) => { const c = at(x, y); return c === '.' || c === 'S' || c === 'X' || c === 'L'; };
  const pos = { ...start };
  let dir = 1, unsure = false, trust = false, lastCmd = null, steps = 0, draengeln = 0, done = false, waits = 0;
  const near = (x, y, k) => Math.abs(x - k.x) + Math.abs(y - k.y);
  const lit = (x, y) => lanterns.some((l) => l.lit && Math.hypot(x - l.x, y - l.y) <= lanternRadius + 0.01);
  const visible = (x, y) => lit(x, y) || Math.max(Math.abs(x - pos.x), Math.abs(y - pos.y)) <= 1;
  // Unsicher: das nächste Feld liegt neben Wasser, oder es ist unbeleuchtet und sie sieht nicht, was dahinter kommt
  const beyondUnknown = (x, y) => { const [dx, dy] = DIRS[dir]; const bx = x + dx, by = y + dy; return walkable(bx, by) && !visible(bx, by); };
  const risky = (x, y) => DIRS.some(([dx, dy]) => at(x + dx, y + dy) === '~') || (!lit(x, y) && beyondUnknown(x, y));

  // kürzester Weg (BFS) über begehbare Felder
  function bfs(from) {
    const q = [{ ...from, d: 0 }]; const seen = new Set([from.x + ',' + from.y]);
    while (q.length) { const c = q.shift(); if (exit && c.x === exit.x && c.y === exit.y) return c.d; for (const [dx, dy] of DIRS) { const nx = c.x + dx, ny = c.y + dy, k = nx + ',' + ny; if (!walkable(nx, ny) || seen.has(k)) continue; seen.add(k); q.push({ x: nx, y: ny, d: c.d + 1 }); } }
    return Infinity;
  }
  const optimal = bfs(start);

  const g = {
    w, h, rows, start, exit, lanterns, optimal,
    get pos() { return { ...pos }; }, get dir() { return dir; }, get unsure() { return unsure; }, get trust() { return trust; }, get done() { return done; },
    get steps() { return steps; }, get draengeln() { return draengeln; }, get waits() { return waits; },
    at, walkable, lit, visible,
    cell(x, y) { return at(x, y); },
    ahead() { const [dx, dy] = DIRS[dir]; return { x: pos.x + dx, y: pos.y + dy }; },
    command(cmd) {
      if (done) return { ok: false, event: 'ziel', pos: g.pos };
      const prevCmd = lastCmd; lastCmd = cmd;
      if (cmd === 'links' || cmd === 'rechts') { dir = (dir + (cmd === 'links' ? 3 : 1)) % 4; unsure = false; trust = false; return { ok: true, event: 'gedreht', pos: g.pos, dir }; }
      // Warten beruhigt: nach einem Stopp geht sie den nächsten Schritt mit dir (Vertrauen)
      if (cmd === 'warten') { waits++; const was = unsure; unsure = false; trust = was; return { ok: true, event: was ? 'beruhigt' : 'gewartet', pos: g.pos }; }
      if (cmd === 'laterne') {
        const l = lanterns.find((k) => !k.lit && near(pos.x, pos.y, k) <= 1);
        if (!l) return { ok: false, event: 'keine-laterne', pos: g.pos };
        l.lit = true; unsure = false;
        return { ok: true, event: 'laterne', pos: g.pos, lantern: { x: l.x, y: l.y } };
      }
      // vor
      const n = g.ahead();
      if (!walkable(n.x, n.y)) { unsure = false; return { ok: false, event: at(n.x, n.y) === '~' ? 'wasser' : 'wand', pos: g.pos }; }
      if (unsure && prevCmd === 'vor') {
        // Drängeln: sie weicht zurück (wenn hinter ihr Platz ist)
        draengeln++;
        const [dx, dy] = DIRS[dir];
        if (walkable(pos.x - dx, pos.y - dy)) { pos.x -= dx; pos.y -= dy; }
        return { ok: false, event: 'draengeln', pos: g.pos };
      }
      if (!unsure && !trust && risky(n.x, n.y) && !(exit && n.x === exit.x && n.y === exit.y)) { unsure = true; return { ok: false, event: 'unsicher', pos: g.pos, next: n }; }
      pos.x = n.x; pos.y = n.y; steps++; unsure = false; trust = false;
      if (exit && pos.x === exit.x && pos.y === exit.y) { done = true; return { ok: true, event: 'ziel', pos: g.pos }; }
      return { ok: true, event: 'schritt', pos: g.pos };
    },
    get score() {
      const extra = Math.max(0, steps - optimal);
      return Math.max(0, Math.min(1, 1 - draengeln * 0.25 - extra * 0.03));
    },
  };
  return g;
}

export const DEFAULT_MAP = [
  '#########',
  '#S..L..~#',
  '#.~~..~~#',
  '#...L...#',
  '#~~..~..#',
  '#..L..~X#',
  '#########',
];

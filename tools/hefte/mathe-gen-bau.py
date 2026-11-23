"""Baut tools/hefte/mathe-gen.mjs aus den Aufgaben-Erzeugern des Klassenbuchs (Klassebuch/mathe-module.js, Block GEN).

Die Erzeuger würfeln Übungsaufgaben mit Lösung. Für die Hefte braucht es festen Zufall (jedes Mal dieselben Aufgaben),
darum wird Math.random() durch R() ersetzt. Eigene Erzeuger für die Lektionen ohne Erzeuger stehen in
tools/hefte/mathe-gen-extra.js und werden vor make() eingefügt.

Aufruf: python3 tools/hefte/mathe-gen-bau.py /pfad/zu/Klassebuch/mathe-module.js
"""
import re
import sys
from pathlib import Path

HIER = Path(__file__).resolve().parent
quelle = Path(sys.argv[1]).read_text(encoding="utf-8").split("\n")
start = next(i for i, z in enumerate(quelle) if z.startswith("  var GEN = (function () {"))
ende = next(i for i, z in enumerate(quelle) if i > start and z.startswith("    return { make: make, has:"))
block = "\n".join(quelle[start + 1 : ende])
block = block.replace("Math.random()", "R()")
assert "Math.random" not in block
extra = (HIER / "mathe-gen-extra.js").read_text(encoding="utf-8")
block = block.replace("    function make(spec, n, lvl) {", extra.rstrip() + "\n\n    function make(spec, n, lvl) {", 1)

kopf = '''// Aufgaben-Erzeuger für die Mathe-Modulhefte – GEN aus dem Klassenbuch (mathe-module.js), mit festem Zufall.
// Nicht von Hand ändern: neu bauen mit  python3 tools/hefte/mathe-gen-bau.py <Klassebuch>/mathe-module.js
// Eigene Erzeuger (Lektionen, für die das Klassenbuch keinen hat): tools/hefte/mathe-gen-extra.js
/* eslint-disable */
let R = zufall(1)
// mulberry32: kleiner, gut gemischter Zufall mit Startwert
function zufall(seed) { let a = (seed >>> 0) || 1; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }

const GEN = (function () {
'''
fuss = '''
    return { make: make, has: function (t) { return !!T[t]; } };
})();

/** n Aufgaben {a, l} zu einer Erzeuger-Angabe (aus mathe-programm.json „gen“), Niveau basis | kern | plus, fester Zufall */
export function erzeuge(spec, n, niveau, seed) { R = zufall(seed); return GEN.make(spec, n, niveau) }
export const hatErzeuger = (t) => GEN.has(t)
'''
(HIER / "mathe-gen.mjs").write_text(kopf + block + fuss, encoding="utf-8")
print("✓ tools/hefte/mathe-gen.mjs", len(block), "Zeichen")

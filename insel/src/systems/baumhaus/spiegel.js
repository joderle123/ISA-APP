// Spiegel im Baumhaus (QUELLE Schritt 9, BAUPLAN §2.1 C8, KONZEPT §8.4 und §15) – reine Logik ohne Browser.
// Freiwillig und privat: sechs Gläser mit den Kurs-Namen (content/beduerfnisse.js), je zwei Regler (wie wichtig, wie voll),
// die größte Lücke leuchtet, drei Schritt-Karten + „Keiner davon“ (voreingestellt), „Nicht heute“ gibt denselben Stich.
// DATENSCHUTZ (technisch erzwungen, Unit-Test tests/unit/spiegel.test.mjs):
//   · AUS, bis die Lehrkraft im Lehrer-Panel „Spiegel-Stationen“ einschaltet (Gerätespeicher lumo.teacher, Schlüssel 'spiegel').
//     Aus = keine Station, kein Öffnen, nichts wird angelegt (alle Schreib-Funktionen tun dann nichts).
//   · Werte liegen NUR unter state.private.spiegel (PRIVATE_PATHS: nie im Export-Code, nie im Lehrerheft).
//   · „Nicht merken“ (Standard, Datensparsamkeit) speichert NICHTS: Werte leben nur im Speicher dieser Sitzung;
//     private.spiegel wird dabei entfernt. „Merken (nur hier)“ legt { merken, werte, schritt } unter private.spiegel ab.
//   · „Neu anfangen“ (save.newGame) und Wipe löschen private.* mit; state:reset leert auch den Sitzungsspeicher.
//   · Zeigen = Vollbild-Karte mit NUR dem Ausgewählten; zeigen() rechnet nur, schreibt nichts.
//   · Der Stich ist ein Moment (Ereignis + Ton), kein Eintrag: Niemand kann ablesen, ob jemand die Station benutzt hat.
//   const S = createSpiegel({ state, device });   device = { get(key, fallback) } (Lehrer-Einstellungen des Geräts)
//   S.available() · S.values() → { need: { wichtig, voll } } · S.glasses() → Gläser mit luecke/gross · S.set(need, 'wichtig'|'voll', v)
//   S.schritte() → 3 Karten (größte Lücken zuerst) · S.waehle(id|'keiner') · S.schritt · S.merken · S.setMerken(bool)
//   S.fertig() / S.nichtHeute() → { stich: true } (gleich) · S.zeigen(auswahl) → { items } · S.forget()
import { BED, NEEDS, luecke, clamp01 } from '../nest/model.js';

export const SPIEGEL_DEVICE_KEY = 'spiegel';
export const SPIEGEL_PATH = 'private.spiegel';
export const STEPS = [0, 0.25, 0.5, 0.75, 1];
const start = () => Object.fromEntries(NEEDS.map((n) => [n, { wichtig: 0.5, voll: 0.5 }]));
const cleanValues = (w) => { const out = start(); for (const n of NEEDS) if (w && w[n]) out[n] = { wichtig: clamp01(w[n].wichtig), voll: clamp01(w[n].voll) }; return out; };

// Größte Lücke nur, wenn sie eindeutig vorn liegt (Startwerte alle gleich = nichts leuchtet)
export function spiegelLuecke(values) {
  const list = NEEDS.map((n) => ({ id: n, l: luecke(values[n].wichtig, values[n].voll) })).sort((a, b) => b.l - a.l);
  return list[0].l >= 0.05 && list[0].l - list[1].l >= 0.01 ? list[0].id : null;
}

export function createSpiegel({ state, device }) {
  let mem = null;   // Sitzungsspeicher bei „Nicht merken“ (nie im Spielstand)
  const available = () => !!(device && device.get(SPIEGEL_DEVICE_KEY, false));
  const stored = () => state.get(SPIEGEL_PATH);
  const merken = () => !!(stored() && stored().merken);
  const cur = () => {
    const s = stored();
    if (s && s.merken) return { werte: cleanValues(s.werte), schritt: s.schritt || 'keiner' };
    if (!mem) mem = { werte: start(), schritt: 'keiner' };
    return mem;
  };
  function commit(next) {
    if (merken()) state.set(SPIEGEL_PATH, { merken: true, werte: next.werte, schritt: next.schritt });
    else mem = next;
  }
  const S = {
    available,
    get merken() { return merken(); },
    get schritt() { return available() ? cur().schritt : 'keiner'; },
    values() { return available() ? JSON.parse(JSON.stringify(cur().werte)) : null; },
    glasses() {
      if (!available()) return [];
      const v = cur().werte;
      const big = spiegelLuecke(v);
      return BED.liste.map((b) => ({ id: b.id, name: b.name, kurz: b.kurz, icon: b.icon, color: b.color, wichtig: v[b.id].wichtig, voll: v[b.id].voll, luecke: luecke(v[b.id].wichtig, v[b.id].voll), gross: b.id === big, riss: false }));
    },
    luecke() { return available() ? spiegelLuecke(cur().werte) : null; },
    set(need, key, value) {
      if (!available() || !NEEDS.includes(need) || (key !== 'wichtig' && key !== 'voll')) return false;
      const c = cur();
      const next = { ...c, werte: { ...c.werte, [need]: { ...c.werte[need], [key]: clamp01(value) } } };
      commit(next);
      return true;
    },
    // Drei Schritt-Karten: zu den drei größten Lücken (bei Gleichstand in der Reihenfolge des Blatts)
    schritte() {
      if (!available()) return [];
      const v = cur().werte;
      return BED.liste.map((b, i) => ({ id: b.id, text: b.schritt, icon: b.icon, color: b.color, l: luecke(v[b.id].wichtig, v[b.id].voll), i }))
        .sort((a, b) => b.l - a.l || a.i - b.i).slice(0, 3).map(({ l, i, ...k }) => k);
    },
    waehle(id) {
      if (!available()) return false;
      const ok = id === 'keiner' || NEEDS.includes(id);
      if (!ok) return false;
      commit({ ...cur(), schritt: id });
      return true;
    },
    // Umschalten: Merken legt die aktuellen Werte privat ab; Nicht merken entfernt private.spiegel ganz
    setMerken(on) {
      if (!available()) return false;
      const c = JSON.parse(JSON.stringify(cur()));
      if (on) { state.set(SPIEGEL_PATH, { merken: true, werte: c.werte, schritt: c.schritt }); mem = null; }
      else { mem = c; if (state.has(SPIEGEL_PATH)) state.remove(SPIEGEL_PATH); }
      return true;
    },
    // Fertig oder „Nicht heute“: derselbe Stich, kein Eintrag
    fertig() { return available() ? { stich: true } : null; },
    nichtHeute() { return available() ? { stich: true } : null; },
    // Zeigen: nur das Ausgewählte, rein gerechnet (schreibt nichts)
    zeigen(auswahl = []) {
      if (!available()) return null;
      const sel = new Set(auswahl || []);
      const gl = S.glasses();
      const items = [];
      if (sel.has('luecke')) { const g = gl.find((x) => x.gross); if (g) items.push({ kind: 'luecke', ...g }); }
      for (const g of gl) if (sel.has(g.id) && !(sel.has('luecke') && g.gross)) items.push({ kind: 'glas', ...g });
      if (sel.has('schritt')) { const s = cur().schritt; const b = BED.liste.find((x) => x.id === s); if (b) items.push({ kind: 'schritt', id: b.id, text: b.schritt, icon: b.icon, color: b.color }); }
      return { items };
    },
    // Sitzungsspeicher vergessen (Neu anfangen, Laden, Pause-Ausblenden bleibt davon unberührt)
    forget() { mem = null; },
  };
  return S;
}
